import { Suspense, useRef, useState, useEffect, type RefObject } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Bounds, Center, ContactShadows, OrbitControls } from '@react-three/drei';
import { TOUCH, MathUtils } from 'three';
import type { Group } from 'three';
import { useTheme } from '../theme/theme-context';

const MODEL_URL = '/models/devices.glb';

// How far the model can turn from dead-center, in either direction —
// tune this one number to widen or narrow the range.
const AZIMUTH_LIMIT_DEG = 40;
const AZIMUTH_LIMIT_RAD = MathUtils.degToRad(AZIMUTH_LIMIT_DEG);
const IDLE_SWAY_SPEED = 0.6;

type Controls = React.ElementRef<typeof OrbitControls>;

// three.js's built-in autoRotate only ever spins one direction — left alone
// it drives into the azimuth clamp and just sits there. This flips its
// direction each time it reaches an edge, turning it into a back-and-forth sway.
function IdleSway({ controlsRef, active }: { controlsRef: RefObject<Controls | null>; active: boolean }) {
  const dir = useRef(1);
  useFrame(() => {
    const controls = controlsRef.current;
    if (!active || !controls) return;
    const az = controls.getAzimuthalAngle();
    const edge = AZIMUTH_LIMIT_RAD - 0.02;
    if (dir.current > 0 && az >= edge) dir.current = -1;
    else if (dir.current < 0 && az <= -edge) dir.current = 1;
    controls.autoRotateSpeed = IDLE_SWAY_SPEED * dir.current;
  });
  return null;
}

// Self-hosted decoder — avoids drei's default fetch to the Google CDN at runtime.
useGLTF.preload(MODEL_URL, '/draco/');

function Devices() {
  const group = useRef<Group>(null);
  const { scene } = useGLTF(MODEL_URL, '/draco/');

  useFrame((state) => {
    if (!group.current) return;
    // Subtle vertical bob only — rotation is owned by OrbitControls.
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.02;
  });

  return (
    <group ref={group}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
}

export default function DeviceModel() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [dragging, setDragging] = useState(false);
  const [idle, setIdle] = useState(true);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const controlsRef = useRef<Controls>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [reduceMotion, setReduceMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Stop the render loop entirely while the model is scrolled off-screen —
  // otherwise Canvas keeps rendering every frame forever, even when unseen.
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => () => clearTimeout(resumeTimer.current), []);

  const handleStart = () => {
    clearTimeout(resumeTimer.current);
    setDragging(true);
    setIdle(false);
  };

  const handleEnd = () => {
    setDragging(false);
    // Let the user's chosen angle sit for a moment before drifting again.
    resumeTimer.current = setTimeout(() => setIdle(true), 2500);
  };

  return (
    <div ref={containerRef} className="w-full h-full">
      <Canvas
        frameloop={visible ? 'always' : 'never'}
        camera={{ position: [0, 0.6, 4], fov: 35 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{
          background: 'transparent',
          cursor: dragging ? 'grabbing' : 'grab',
          // One-finger vertical scroll still belongs to the page on touch devices.
          touchAction: 'pan-y',
        }}
      >
        {/* Lighting is tuned per theme: on a dark canvas the ambient fill is
            dropped so the model doesn't read as a flat grey silhouette, and the
            rim lights come up to keep its edges defined. */}
        <ambientLight intensity={isDark ? 0.35 : 0.7} />
        <directionalLight position={[4, 6, 5]} intensity={isDark ? 1.8 : 2.2} />
        {/* Cool rim light picks out the edges against the page background */}
        <directionalLight position={[-5, 2, -4]} intensity={isDark ? 1.6 : 1.1} color="#7832ff" />
        <directionalLight position={[0, -3, 2]} intensity={isDark ? 0.7 : 0.4} color="#3296ff" />

        <Suspense fallback={null}>
          {/* No `observe`: the model's bounds are static, and watching them re-triggers
              Bounds' reset().fit() on every canvas resize — including the sub-pixel
              layout shifts the hero's typing animation causes next door, which snapped
              the camera back into its fit animation and read as a twitch. Fit once on mount. */}
          <Bounds fit clip margin={1.1}>
            <Devices />
          </Bounds>
          <ContactShadows
            key={theme}
            position={[0, -1.1, 0]}
            // A black contact shadow on a near-black canvas is just a smudge.
            opacity={isDark ? 0.12 : 0.35}
            scale={8}
            blur={2.6}
            far={3}
            // Defaults to Infinity, i.e. a second full render pass every frame.
            // The model only bobs 0.02 units, so the shadow is effectively static —
            // bake it over the first ~second (letting Center/Bounds settle first),
            // then stop. frames={1} would bake before layout settles.
            frames={60}
          />
        </Suspense>

        <OrbitControls
          ref={controlsRef}
          makeDefault
          // Zoom off: the wheel belongs to the page, not the model.
          enableZoom={false}
          enablePan={false}
          // Two fingers to rotate on touch, so one-finger scroll still works.
          touches={{ ONE: undefined as unknown as TOUCH, TWO: TOUCH.ROTATE }}
          enableDamping
          dampingFactor={0.08}
          rotateSpeed={1.5}
          // Short turn, not a full spin — drag is capped to ±40° either side of center.
          minAzimuthAngle={-AZIMUTH_LIMIT_RAD}
          maxAzimuthAngle={AZIMUTH_LIMIT_RAD}
          // Keep the devices upright — no flipping under the floor.
          minPolarAngle={Math.PI / 3.4}
          maxPolarAngle={Math.PI / 1.9}
          autoRotate={idle && !reduceMotion}
          onStart={handleStart}
          onEnd={handleEnd}
        />
        <IdleSway controlsRef={controlsRef} active={idle && !reduceMotion} />
      </Canvas>
    </div>
  );
}
