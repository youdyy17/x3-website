import { useEffect, useRef, useState } from 'react';

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
    <section id="cta" className="py-24 lg:py-32 px-5 sm:px-8 lg:px-16 xl:px-24 relative overflow-hidden" ref={ref}>
      {/* Background with geometric pattern/gradient */}
      <div className="absolute inset-0 bg-transparent">
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(120,50,255,0.03)_0%,transparent_70%)]"></div>
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      <div className={`max-w-4xl mx-auto text-center relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-8">
          Ready to Build Something <span className="text-slate-900">Great?</span>
        </h2>
        <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
          Let's discuss your next project and explore how X3 can help transform your business with cutting-edge technology.
        </p>
        <div className="flex flex-col sm:flex-row gap-5 justify-center">
          <button 
            className="text-white px-10 py-4 rounded-xl text-lg font-bold hover:opacity-90 transition-opacity shadow-[0_4px_16px_rgba(0,0,0,0.3)]"
            style={{ background: 'linear-gradient(to bottom, #2B2B2B, #101010)' }}
          >
            Start a Project
          </button>
          <button className="bg-transparent border border-slate-200 text-slate-900 px-10 py-4 rounded-xl text-lg font-bold hover:bg-white shadow-sm border border-slate-200 transition-colors">
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
}
