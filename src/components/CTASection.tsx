import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="cta" className="py-32 lg:py-40 px-5 sm:px-8 lg:px-16 xl:px-24 bg-slate-50 relative overflow-hidden" ref={ref}>
      {/* Background ambient glow matching Hero */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[80%] h-[80%] bg-[rgba(120,50,255,0.02)] rounded-full blur-[100px]" />
      </div>

      <div className={`max-w-4xl mx-auto text-center relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 leading-[1.08] tracking-tight mb-8">
          Ready to Build Something <br className="hidden sm:block"/>
          <span className="text-slate-900 glow-subtle">Great?</span>
        </h2>
        <p className="text-xl text-slate-900/60 mb-12 max-w-2xl mx-auto leading-relaxed">
          Let's discuss your next project and explore how X3 can help transform your business with cutting-edge technology.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <button 
            className="group inline-flex items-center gap-2 text-white px-8 py-4 rounded-xl font-semibold text-[15px] shadow-[0_4px_16px_rgba(0,0,0,0.3)] transition-all cursor-pointer"
            style={{ background: 'linear-gradient(to bottom, #2B2B2B, #101010)' }}
          >
            Start a Project
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
          <button className="inline-flex items-center gap-2 bg-transparent border border-slate-300 text-slate-800 px-8 py-4 rounded-xl font-semibold text-[15px] hover:bg-white hover:border-slate-400 transition-all cursor-pointer">
            Contact Sales
          </button>
        </div>
      </div>
    </section>
  );
}
