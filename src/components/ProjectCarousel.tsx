import { useCallback, useEffect, useRef, useState } from 'react';
import ProjectCard, { type Project } from './ProjectCard';

type Props = {
  projects: Project[];
};

/** Which project is centred on load. Clamped for short/filtered lists. */
const INITIAL_INDEX = 1;

/**
 * Layout 4 — Horizontal center-focused carousel.
 *
 * Wraps the existing ProjectCard (rendered in its `grid` form) in scroll-snap
 * slides. The card itself is untouched; scaling and emphasis live on the slide
 * wrapper, so layouts 1-3 are unaffected.
 */
export default function ProjectCarousel({ projects }: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduceMotion(query.matches);
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  // The slide whose centre sits closest to the scroller's centre is active.
  const measureActive = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const scrollerRect = scroller.getBoundingClientRect();
    const viewportCenter = scrollerRect.left + scrollerRect.width / 2;

    let nearest = 0;
    let nearestDistance = Infinity;

    slideRefs.current.forEach((slide, index) => {
      if (!slide) return;
      const rect = slide.getBoundingClientRect();
      const distance = Math.abs(rect.left + rect.width / 2 - viewportCenter);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearest = index;
      }
    });

    setActiveIndex((previous) => (previous === nearest ? previous : nearest));
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    let frame = 0;
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measureActive);
    };

    scroller.addEventListener('scroll', schedule, { passive: true });
    const resizeObserver = new ResizeObserver(schedule);
    resizeObserver.observe(scroller);
    measureActive();

    return () => {
      cancelAnimationFrame(frame);
      scroller.removeEventListener('scroll', schedule);
      resizeObserver.disconnect();
    };
  }, [measureActive]);

  // Scrolls `index` to dead centre. Centres are unaffected by the slide's scale
  // transform, so this stays accurate for shrunken side cards.
  const centerOn = useCallback((index: number, behavior: ScrollBehavior) => {
    const scroller = scrollerRef.current;
    const slide = slideRefs.current[index];
    if (!scroller || !slide) return;

    const scrollerRect = scroller.getBoundingClientRect();
    const slideRect = slide.getBoundingClientRect();
    const delta =
      slideRect.left + slideRect.width / 2 - (scrollerRect.left + scrollerRect.width / 2);

    if (behavior === 'instant') {
      // Direct assignment lands synchronously. scrollBy() queues through the
      // scroll-animation machinery even when instant, which can double-apply
      // when this runs twice in a frame (StrictMode re-runs effects in dev).
      scroller.scrollLeft += delta;
    } else {
      scroller.scrollBy({ left: delta, behavior });
    }
  }, []);

  // Re-centre on the starting project whenever the filtered set changes.
  // 'instant' matters here: the app sets a global `scroll-behavior: smooth`,
  // so anything else would visibly animate the jump on first paint.
  useEffect(() => {
    slideRefs.current.length = projects.length;
    const startIndex = Math.max(0, Math.min(INITIAL_INDEX, projects.length - 1));
    centerOn(startIndex, 'instant');
    setActiveIndex(startIndex);
  }, [projects, centerOn]);

  const scrollToIndex = useCallback(
    (index: number) => centerOn(index, reduceMotion ? 'instant' : 'smooth'),
    [centerOn, reduceMotion]
  );

  return (
    <div className="relative">
      <style>{`
        .x3-carousel {
          /* Mobile: one card plus a sliver of its neighbours. The gap has to
             stay under the side padding or the neighbours fall off-screen. */
          --x3-card-w: 66vw;
          gap: 0.75rem;
          padding-inline: max(0px, calc(50% - var(--x3-card-w) / 2));
          scroll-snap-type: x mandatory;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .x3-carousel::-webkit-scrollbar { display: none; }
        .x3-carousel-slide {
          flex: 0 0 var(--x3-card-w);
          scroll-snap-align: center;
        }
        @media (min-width: 640px) {
          .x3-carousel { --x3-card-w: 46vw; gap: 1.5rem; }
        }
        @media (min-width: 1024px) {
          .x3-carousel { --x3-card-w: min(30vw, 400px); }
        }
      `}</style>

      <div
        ref={scrollerRef}
        role="region"
        aria-label="Projects carousel"
        aria-roledescription="carousel"
        className="x3-carousel flex items-stretch overflow-x-auto overscroll-x-contain py-6"
      >
        {projects.map((project, index) => {
          const isActive = index === activeIndex;

          return (
            <div
              key={project.title}
              ref={(node) => {
                slideRefs.current[index] = node;
              }}
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${projects.length}`}
              className="x3-carousel-slide"
            >
              {/* The scale lives here, not on the snap target above: a snap area
                  is the element's *transformed* border box, so animating scale
                  on the snap target makes mandatory snapping re-snap mid-transition. */}
              <div
                className={`group/slide relative h-full transition-transform duration-500 ease-out motion-reduce:transition-none ${
                  isActive ? 'scale-100' : 'scale-[0.88]'
                }`}
              >
                <div
                  className={`h-full transition-opacity duration-500 ease-out motion-reduce:transition-none ${
                    isActive ? 'opacity-100 drop-shadow-xl' : 'opacity-60 group-hover/slide:opacity-85'
                  }`}
                >
                  <ProjectCard project={project} layout="grid" />
                </div>

                {/* Side cards centre themselves on click instead of firing the card's own actions. */}
                {!isActive && (
                  <button
                    type="button"
                    onClick={() => scrollToIndex(index)}
                    aria-label={`Show ${project.title}`}
                    className="absolute inset-0 z-20 rounded-2xl cursor-pointer"
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
