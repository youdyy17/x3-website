import { useEffect, useState, lazy, Suspense } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

// Loaded on demand so three.js stays out of the initial bundle.
const DeviceModel = lazy(() => import('./DeviceModel'));

function ModelFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-40 h-24 rounded-xl border border-line bg-surface-2 animate-pulse" />
    </div>
  );
}

const TYPED_WORDS = [
  { text: 'Forward', color: '#6c3aed' },
  { text: 'Growth', color: '#10b981' },
  { text: 'Success', color: '#3b82f6' },
  { text: 'Innovation', color: '#f59e0b' },
];

const TYPE_SPEED = 110;
const DELETE_SPEED = 60;
const INITIAL_DELAY = 900;
const PAUSE_AFTER_TYPE = 1400;
const PAUSE_AFTER_DELETE = 300;

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [started, setStarted] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [phase, setPhase] = useState<'typing' | 'deleting'>('typing');

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 150);
    return () => clearTimeout(timer);
  }, []);

  // Kicks off the typing loop once the entrance animation has settled.
  useEffect(() => {
    if (!isVisible) return;
    const timer = setTimeout(() => setStarted(true), INITIAL_DELAY);
    return () => clearTimeout(timer);
  }, [isVisible]);

  // Types the current word, pauses, deletes it, then advances to the next
  // word in the list — looping forever.
  useEffect(() => {
    if (!started) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCharCount(TYPED_WORDS[0].text.length);
      return;
    }

    const currentWord = TYPED_WORDS[wordIndex].text;
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === 'typing') {
      if (charCount < currentWord.length) {
        timeout = setTimeout(() => setCharCount((c) => c + 1), TYPE_SPEED);
      } else {
        timeout = setTimeout(() => setPhase('deleting'), PAUSE_AFTER_TYPE);
      }
    } else {
      if (charCount > 0) {
        timeout = setTimeout(() => setCharCount((c) => c - 1), DELETE_SPEED);
      } else {
        timeout = setTimeout(() => {
          setWordIndex((i) => (i + 1) % TYPED_WORDS.length);
          setPhase('typing');
        }, PAUSE_AFTER_DELETE);
      }
    }
    return () => clearTimeout(timeout);
  }, [started, charCount, phase, wordIndex]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center pt-24 pb-16 lg:pt-32 lg:pb-24 px-5 sm:px-8 lg:px-16 xl:px-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-8 items-center relative z-10">
        {/* ─── Left: Text Content ─── */}
        <div
          className={`transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-surface border border-line">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold tracking-wider uppercase text-fg">
              Building the Future of Software
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[4.25rem] font-bold text-fg leading-[1.08] tracking-tight mb-6">
            We Build Software
            <br />
            That Drives Business
            <br />
            <span
              className="glow-subtle transition-colors duration-300"
              style={{ color: TYPED_WORDS[wordIndex].color }}
            >
              {TYPED_WORDS[wordIndex].text.slice(0, charCount)}
              <span className="typing-cursor" aria-hidden="true" />
            </span>
            <span className="sr-only">{TYPED_WORDS[wordIndex].text}</span>
          </h1>

          {/* Subtext */}
          <p className="text-lg text-fg-muted mb-10 max-w-xl leading-relaxed">
            X3 Software Solution crafts custom, scalable digital products —
            from enterprise platforms to mobile apps — that accelerate growth
            and transform the way you do business.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-solid group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-[15px] transition-all cursor-pointer"
            >
              Start a Project
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 bg-transparent border border-line text-fg-secondary px-7 py-3.5 rounded-xl font-semibold text-[15px] hover:bg-surface-2 transition-all cursor-pointer"
            >
              Explore Our Solutions
            </button>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex items-center gap-6 text-fg-subtle text-sm">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-full border-2 border-canvas bg-surface-3"
                  />
                ))}
              </div>
              <span>50+ Happy Clients</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-line" />
            <span className="hidden sm:block">200+ Projects Delivered</span>
          </div>
        </div>

        {/* ─── Right: 3D Device Mockup ─── */}
        <div
          className={`relative flex items-center justify-center min-h-[360px] lg:min-h-[480px] transition-all duration-1000 delay-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
          }`}
        >
          {/* Ambient glow behind devices */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[70%] h-[60%] bg-[rgba(120,50,255,0.03)] rounded-full blur-[80px]" />
          </div>

          <div className="relative w-full h-[360px] lg:h-[480px]">
            <Suspense fallback={<ModelFallback />}>
              <DeviceModel />
            </Suspense>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 scroll-indicator">
        <span className="text-fg-faint text-[10px] font-bold tracking-[0.2em] uppercase">
          Scroll
        </span>
        <ChevronDown className="w-4 h-4 text-fg-faint" />
      </div>
    </section>
  );
}
