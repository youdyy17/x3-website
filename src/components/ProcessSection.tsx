import { useEffect, useRef, useState } from 'react';
import { Lightbulb, PenTool, Code2, TestTube, Rocket, HeartHandshake } from 'lucide-react';
import SectionHeading from './SectionHeading';

const steps = [
  {
    title: "Idea & Discovery",
    description: "We analyze your business goals, target audience, and technical requirements to define a clear project roadmap.",
    icon: Lightbulb,
    tags: ["Market Research", "Requirement Analysis", "Project Scope"]
  },
  {
    title: "UX/UI Design",
    description: "Our designers craft intuitive, engaging interfaces focusing on user experience, accessibility, and brand alignment.",
    icon: PenTool,
    tags: ["Wireframing", "Prototyping", "Design System"]
  },
  {
    title: "Development",
    description: "We build scalable, secure architecture and write clean, maintainable code using the latest modern frameworks.",
    icon: Code2,
    tags: ["Frontend", "Backend", "API Integration"]
  },
  {
    title: "Testing & QA",
    description: "Rigorous automated and manual testing ensures your product is bug-free, fast, and secure under load.",
    icon: TestTube,
    tags: ["Unit Testing", "Performance", "Security Audits"]
  },
  {
    title: "Deployment",
    description: "Smooth, zero-downtime deployment to cloud infrastructure with complete CI/CD pipeline automation.",
    icon: Rocket,
    tags: ["Cloud Hosting", "CI/CD", "Monitoring Setup"]
  },
  {
    title: "Ongoing Support",
    description: "We provide proactive maintenance, feature updates, and continuous performance optimization post-launch.",
    icon: HeartHandshake,
    tags: ["Maintenance", "SLA Support", "Analytics"]
  }
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<() => void>(() => {});
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  // Step 0 is the start of the line, so it has no incoming segment to light up.
  const hoverSegment = hovered !== null && hovered > 0 ? hovered : null;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsVisible(true);
        measureRef.current();
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);


  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;

    const measure = () => {
      frame = 0;
      const trackRect = track.getBoundingClientRect();
      if (!trackRect.width) return;
      let current = 0;
      track.querySelectorAll('.process-step').forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        // Measured off the real cards rather than their width as a constant,
        // so this stays correct if the card size changes.
        const nodeCenter = rect.left + rect.width / 2;
        if (nodeCenter < trackRect.right) current = index;
      });
      setActiveStep(current);
    };

    const schedule = () => {
      // Scrolling slides the cards beneath the cursor without reliably firing
      // pointerenter/leave, which strands the highlight on a card that has since
      // moved away. Drop it here; onPointerMove re-establishes it on the card
      // actually under the cursor as soon as the mouse moves again.
      setHovered(null);
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };
    measureRef.current = schedule;

    track.addEventListener('scroll', schedule, { passive: true });
    // Which cards fit on screen changes with the viewport.
    window.addEventListener('resize', schedule);
    measure();
    return () => {
      track.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section id="process" className="py-24 lg:py-32 px-5 sm:px-8 lg:px-16 xl:px-24 bg-surface overflow-hidden" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <SectionHeading
            eyebrow="How We Work"
            title="From first call to production."
            description="A proven, transparent methodology designed to deliver premium digital solutions on time and beyond expectations."
            size="large"
          />
        </div>

        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          {/* The scroll viewport. Focusable so the timeline is reachable with
              arrow keys — page scroll used to drive it when this was vertical,
              and a trackpad-only horizontal scroller would be a regression. */}
          <div
            ref={trackRef}
            tabIndex={0}
            role="region"
            aria-label="Our process, step by step"
            className="overflow-x-auto overflow-y-clip snap-x snap-mandatory pb-5 rounded-2xl"
          >
            {/* The rail lives in here, alongside the cards, so it scrolls with
                them instead of hanging fixed across the viewport. `--step-w` is
                the single source of truth for card width, and `--node-pad` for
                the headroom above the nodes: the rail's inset and vertical
                position are derived from them, so they can't drift apart.
                The padding is what keeps a hovered node's scale + ring from
                being clipped — `overflow-x-auto` forces overflow-y to clip too. */}
            <div className="relative flex w-max gap-6 pt-[var(--node-pad)] [--node-pad:24px] [--step-w:300px]">
              {/* Rail, inset by half a card at each end so it starts and ends on
                  a node's center instead of running off both outer edges. That
                  span is what makes the fill percentage below line up with the
                  nodes it's supposed to connect. 2rem = half the node's height. */}
              <div className="absolute top-[calc(var(--node-pad)+2rem)] left-[calc(var(--step-w)/2)] right-[calc(var(--step-w)/2)] h-[2px] -translate-y-1/2 bg-surface-3 z-0">
                {/* Scroll-driven fill */}
                <div
                  className="absolute inset-y-0 left-0 bg-solid transition-all duration-700 ease-out"
                  style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
                />
                {/* Hover highlight: the single segment feeding into the hovered
                    node. Kept separate from the fill above so the two drivers
                    never fight over one width, and so this can run at hover
                    speed while the fill keeps its slower scroll timing.
                    `--solid` and `--fg` are the same value in both themes, so over
                    an already-filled stretch this would otherwise be a 1px thickness
                    change and read as nothing — the doubled height and soft halo are
                    what actually make it register. */}
                <div
                  className="absolute top-1/2 h-[4px] -translate-y-1/2 rounded-full bg-fg transition-all duration-250 ease-out"
                  style={{
                    left: `${(Math.max((hoverSegment ?? 1) - 1, 0) / (steps.length - 1)) * 100}%`,
                    width: hoverSegment === null ? '0%' : `${(1 / (steps.length - 1)) * 100}%`,
                    opacity: hoverSegment === null ? 0 : 1,
                    boxShadow: '0 0 10px color-mix(in srgb, var(--fg) 30%, transparent)',
                  }}
                />
              </div>

              {steps.map((step, index) => {
                const isActive = index <= activeStep;
                const isHovered = hovered === index;
                const receded = hovered !== null && !isHovered;
                const Icon = step.icon;
                const lit = isHovered || isActive;

                return (
                  <div
                    key={index}
                    className="process-step w-[var(--step-w)] shrink-0 snap-start flex flex-col relative z-10"
                    // Pointer type is checked because on touch, `mouseenter` fires
                    // on tap and never gets a matching leave — a swipe through this
                    // carousel would strand one card scaled and dim every other one.
                    onPointerEnter={(e) => { if (e.pointerType === 'mouse') setHovered(index); }}
                    // Re-arms the highlight after a scroll cleared it: the cursor can
                    // already be sitting inside this card, and moving within an element
                    // fires only pointermove, never another pointerenter.
                    onPointerMove={(e) => {
                      if (e.pointerType === 'mouse' && hovered !== index) setHovered(index);
                    }}
                    onPointerLeave={() => setHovered((h) => (h === index ? null : h))}
                  >
                    {/* Node. The pop lives on this wrapper and the active/hover
                        scale on the element inside it, so the entrance animation
                        and the interactive scale compose instead of one winning
                        the cascade. Keeping the stagger delay off the inner
                        element also stops hover from feeling ~500ms late on the
                        last node. Opacities multiply the same way. */}
                    <div
                      className={`w-16 h-16 mx-auto ${isVisible ? 'node-pop' : ''}`}
                      // Hidden by visibility, not opacity: the node must never
                      // render part-transparent, so it goes straight from unpainted
                      // to fully opaque when the pop takes over.
                      style={{
                        visibility: isVisible ? undefined : 'hidden',
                        animationDelay: `${index * 100}ms`,
                      }}
                    >
                      <div
                        className="w-full h-full rounded-full border-4 flex items-center justify-center bg-surface transition-all duration-250 ease-out"
                        style={{
                          borderColor: lit ? 'var(--fg)' : 'var(--line)',
                          boxShadow: isHovered
                            ? '0 0 0 6px var(--divider), 0 0 16px var(--divider)'
                            : isActive
                              ? '0 0 20px var(--divider)'
                              : 'none',
                          transform: `scale(${isHovered ? 1.25 : isActive ? 1.1 : 1})`,
                        }}
                      >
                        <Icon className={`w-6 h-6 transition-colors duration-250 ease-out ${lit ? 'text-fg' : 'text-fg-faint'}`} />
                      </div>
                    </div>

                    {/* Same split as the node: entrance outside, hover inside. */}
                    <div
                      className={`mt-8 flex-1 flex transition-all duration-700 ${
                        isVisible ? 'translate-y-0' : 'translate-y-12'
                      }`}
                      style={{
                        opacity: isVisible ? 1 : 0,
                        transitionDelay: `${index * 100}ms`,
                      }}
                    >
                      <div
                        className="flex-1 rounded-2xl border border-line bg-surface-2 p-6 transition-all duration-250 ease-out"
                        style={{
                          // Scroll progress and hover both want this; resolved to one
                          // value so neither can clobber the other. A hovered card is
                          // always fully lit, and receding never brightens a card that
                          // the timeline hasn't reached yet — hence the min().
                          opacity: isHovered ? 1 : Math.min(isActive ? 1 : 0.5, receded ? 0.6 : 1),
                          transform: isHovered ? 'translateY(-10px)' : 'translateY(0)',
                          boxShadow: isHovered ? 'var(--shadow-card-hover)' : 'none',
                        }}
                      >
                        <span className="text-sm font-bold text-fg-faint mb-2 block uppercase tracking-wider">Phase 0{index + 1}</span>
                        <h3 className="text-xl font-bold text-fg mb-3">{step.title}</h3>
                        <p className="text-fg-muted leading-relaxed mb-6">
                          {step.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {step.tags.map((tag, i) => (
                            <span key={i} className="text-xs font-semibold bg-surface border border-line text-fg-muted px-3 py-1.5 rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <p className="mt-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-fg-faint">
            Scroll to explore &rarr;
          </p>
        </div>
      </div>
    </section>
  );
}
