import { useEffect, useRef, useState } from 'react';
import { Shield, Zap, Users, Award } from 'lucide-react';

const differentiators = [
  {
    icon: Shield,
    title: "Reliable & Secure",
    description: "Enterprise-grade security practices and reliable delivery you can count on."
  },
  {
    icon: Zap,
    title: "Fast & Agile",
    description: "Rapid development cycles with agile methodology for quick time-to-market."
  },
  {
    icon: Users,
    title: "Client-Focused",
    description: "Your success is our priority. We work as an extension of your team."
  },
  {
    icon: Award,
    title: "Proven Excellence",
    description: "A track record of delivering high-quality solutions across industries."
  }
];

export default function WhyUsSection() {
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
    <section id="why-us" className="py-20 lg:py-28 px-5 sm:px-8 lg:px-16 xl:px-24 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="mb-4">
            <span className="text-xs font-bold tracking-[0.2em] text-slate-500 uppercase">Why Choose Us</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
            What Sets X3 Apart
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {differentiators.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index}
                className={`bg-white shadow-sm border border-slate-200 border border-slate-200 rounded-2xl p-8 lg:p-10 backdrop-blur-sm flex flex-col sm:flex-row gap-6 items-start hover:bg-slate-50 border border-slate-200 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="w-16 h-16 shrink-0 rounded-2xl bg-slate-50 border border-slate-200 border border-slate-200 flex items-center justify-center">
                  <Icon className="text-slate-900 w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-lg">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
