import { useEffect, useRef, useState } from 'react';
import SectionHeading from './SectionHeading';

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
         <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--grid-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-line)_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      <div className={`max-w-4xl mx-auto text-center relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <SectionHeading
          title={<>Ready to Build Something <span className="text-fg">Great?</span></>}
          description="Let's discuss your next project and explore how CodeX3 can help transform your business with cutting-edge technology."
          size="large"
          titleSpacing="loose"
          descriptionSpacing="loose"
        />
        <div className="flex flex-col sm:flex-row gap-5 justify-center">
          <button 
            className="btn-solid px-10 py-4 rounded-xl text-lg font-bold hover:opacity-90 cursor-pointer"
          >
            Start a Project
          </button>
          <button className="bg-transparent border border-line text-fg px-10 py-4 rounded-xl text-lg font-bold hover:bg-surface-2 hover:border-line-strong transition-colors cursor-pointer">
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
}
