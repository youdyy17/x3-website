import { useEffect, useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 150);
    return () => clearTimeout(timer);
  }, []);

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
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-white border border-slate-200 border border-slate-200 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold tracking-wider uppercase text-slate-900">
              Building the Future of Software
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[4.25rem] font-bold text-slate-900 leading-[1.08] tracking-tight mb-6">
            We Build Software
            <br />
            That Drives Business{' '}
            <span className="text-slate-900 glow-subtle">
              Forward
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-lg text-slate-900/55 mb-10 max-w-xl leading-relaxed">
            X3 Software Solution crafts custom, scalable digital products —
            from enterprise platforms to mobile apps — that accelerate growth
            and transform the way you do business.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })}
              className="group inline-flex items-center gap-2 text-white px-7 py-3.5 rounded-xl font-semibold text-[15px] shadow-[0_4px_16px_rgba(0,0,0,0.3)] transition-all cursor-pointer"
              style={{ background: 'linear-gradient(to bottom, #2B2B2B, #101010)' }}
            >
              Start a Project
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 bg-transparent border border-slate-200 text-slate-700 px-7 py-3.5 rounded-xl font-semibold text-[15px] hover:bg-white border border-slate-200 transition-all cursor-pointer"
            >
              Explore Our Solutions
            </button>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex items-center gap-6 text-slate-900/30 text-sm">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-full border-2 border-[#121212] bg-white/40"
                  />
                ))}
              </div>
              <span>50+ Happy Clients</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-slate-50 border border-slate-200" />
            <span className="hidden sm:block">200+ Projects Delivered</span>
          </div>
        </div>

        {/* ─── Right: 3D Device Mockup ─── */}
        <div
          className={`relative flex items-center justify-center min-h-[360px] lg:min-h-[480px] transition-all duration-1000 delay-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
          }`}
          style={{ perspective: '1200px' }}
        >
          {/* Ambient glow behind devices */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[70%] h-[60%] bg-[rgba(120,50,255,0.03)] rounded-full blur-[80px]" />
          </div>

          {/* Laptop */}
          <div
            className="device-float relative"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div
              className="relative w-[300px] sm:w-[380px] lg:w-[440px]"
              style={{
                transform: 'rotateY(-12deg) rotateX(4deg)',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Screen */}
              <div className="relative bg-[#111119] rounded-t-xl border border-[#2a2a3e] overflow-hidden shadow-2xl">
                {/* Camera notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-[#1a1a2e] rounded-b-md z-10" />

                {/* Screen content */}
                <div className="aspect-[16/10] bg-[#0c0c18] p-3 sm:p-4 flex">
                  {/* Sidebar */}
                  <div className="w-[22%] border-r border-slate-200 pr-2 sm:pr-3 flex flex-col gap-3 py-1">
                    <div className="h-3.5 w-3/4 bg-white/15 rounded-full" />
                    <div className="mt-2 space-y-2.5">
                      {[0.9, 0.7, 0.8, 0.6, 0.75, 0.5].map((w, i) => (
                        <div
                          key={i}
                          className={`h-2 rounded-full ${
                            i === 0 ? 'bg-[rgba(120,50,255,0.6)]' : 'bg-white/[0.06]'
                          }`}
                          style={{ width: `${w * 100}%` }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Main content area */}
                  <div className="flex-1 pl-3 sm:pl-4 flex flex-col gap-3">
                    {/* Header bar */}
                    <div className="flex items-center justify-between">
                      <div className="h-3.5 w-1/4 bg-white/15 rounded-full" />
                      <div className="flex gap-2">
                        <div className="w-6 h-6 rounded-lg bg-[rgba(50,150,255,0.4)] opacity-80" />
                        <div className="w-6 h-6 rounded-full bg-slate-50 border border-slate-200" />
                      </div>
                    </div>

                    {/* Metric cards */}
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { color: 'rgba(120,50,255,1)', label: 0.5 },
                        { color: 'rgba(50,150,255,1)', label: 0.6 },
                        { color: 'rgba(200,50,150,1)', label: 0.45 },
                      ].map((card, i) => (
                        <div
                          key={i}
                          className="rounded-lg p-2 sm:p-2.5 border"
                          style={{
                            background: `rgba(${i === 0 ? '120,50,255' : i === 1 ? '50,150,255' : '200,50,150'}, 0.1)`,
                            borderColor: `rgba(${i === 0 ? '120,50,255' : i === 1 ? '50,150,255' : '200,50,150'}, 0.25)`,
                          }}
                        >
                          <div
                            className="h-1.5 rounded-full mb-2"
                            style={{ width: `${card.label * 100}%`, background: `rgba(${i === 0 ? '120,50,255' : i === 1 ? '50,150,255' : '200,50,150'}, 0.6)` }}
                          />
                          <div className="h-4 w-3/4 bg-white/80 rounded-sm" />
                        </div>
                      ))}
                    </div>

                    {/* Chart area */}
                    <div className="flex-1 bg-white/[0.02] rounded-lg border border-slate-200 p-3 flex items-end gap-[6px]">
                      {[35, 55, 40, 70, 50, 85, 60, 45, 75, 65].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-t-sm transition-all"
                          style={{
                            height: `${h}%`,
                            background: `linear-gradient(to top, rgba(120,50,255,${i % 2 === 0 ? '0.6' : '0.4'}), rgba(120,50,255,${i % 2 === 0 ? '0.3' : '0.2'}))`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Laptop base/keyboard */}
              <div className="relative">
                <div
                  className="h-3 sm:h-4 bg-[#1a1a2e] border border-t-0 border-[#2a2a3e] rounded-b-lg"
                  style={{
                    boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 8px 24px rgba(0,0,0,0.3)',
                  }}
                >
                  <div className="absolute left-1/2 -translate-x-1/2 top-0.5 w-12 h-1 bg-white/[0.06] rounded-full" />
                </div>
                {/* Reflection/surface */}
                <div className="absolute left-[5%] right-[5%] top-full h-[2px] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
              </div>
            </div>

            {/* Phone */}
            <div
              className="phone-float absolute -right-4 sm:right-0 lg:-right-6 bottom-4 sm:bottom-2 lg:bottom-0 w-[80px] sm:w-[100px] lg:w-[115px]"
              style={{
                transform: 'rotateY(-8deg) rotateX(3deg)',
                transformStyle: 'preserve-3d',
              }}
            >
              <div className="bg-[#111119] rounded-[16px] sm:rounded-[20px] border border-[#2a2a3e] overflow-hidden shadow-2xl">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-3 bg-[#111119] rounded-b-lg z-10 border-b border-x border-[#2a2a3e]" />

                <div className="aspect-[9/19] bg-[#0c0c18] p-2 flex flex-col gap-2">
                  {/* Status bar */}
                  <div className="h-4" />

                  {/* Hero card */}
                  <div className="h-14 sm:h-16 bg-[rgba(120,50,255,0.2)] rounded-lg border border-slate-200" />

                  {/* List items */}
                  <div className="flex-1 space-y-2">
                    {[0.85, 0.7, 0.8, 0.6].map((w, i) => (
                      <div
                        key={i}
                        className="bg-white border border-slate-200 rounded-lg p-2 flex items-center gap-2"
                      >
                        <div className="w-3 h-3 rounded bg-[rgba(120,50,255,0.3)] shrink-0" />
                        <div
                          className="h-2 bg-slate-50 border border-slate-200 rounded-full"
                          style={{ width: `${w * 100}%` }}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Bottom nav */}
                  <div className="flex justify-around py-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`w-2.5 h-2.5 rounded-full ${
                          i === 1 ? 'bg-[rgba(120,50,255,0.7)]' : 'bg-slate-50 border border-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 scroll-indicator">
        <span className="text-slate-900/30 text-[10px] font-bold tracking-[0.2em] uppercase">
          Scroll
        </span>
        <ChevronDown className="w-4 h-4 text-slate-900/30" />
      </div>
    </section>
  );
}
