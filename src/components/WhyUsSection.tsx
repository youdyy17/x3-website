import { useEffect, useRef, useState } from 'react';
import { Shield, Zap, Users, Award } from 'lucide-react';

const differentiators = [
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-grade security practices, rigorous compliance standards, and reliable infrastructure you can count on."
  },
  {
    icon: Zap,
    title: "Rapid Delivery",
    description: "Accelerated development cycles using agile methodologies, ensuring quick time-to-market without compromising quality."
  },
  {
    icon: Users,
    title: "Dedicated Teams",
    description: "We don't just build software; we integrate as an extension of your team, aligning closely with your business goals."
  },
  {
    icon: Award,
    title: "Proven Excellence",
    description: "A decade-long track record of delivering high-impact, scalable digital solutions across global industries."
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
    <section id="why-us" className="py-24 lg:py-32 px-5 sm:px-8 lg:px-16 xl:px-24 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-slate-50 border border-slate-200">
            <span className="text-xs font-semibold tracking-wider uppercase text-slate-900">
              Why Choose X3
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-[1.08] tracking-tight mb-6">
            The X3 Advantage
          </h2>
          <p className="text-lg text-slate-900/60 leading-relaxed max-w-2xl mx-auto">
            We combine deep technical expertise with a relentless focus on client success to deliver software that truly moves the needle.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {differentiators.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index}
                className={`bg-white border border-slate-200/60 rounded-2xl p-8 lg:p-10 flex flex-col sm:flex-row gap-6 items-start hover:shadow-xl hover:-translate-y-1 hover:border-slate-300 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 shrink-0 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center">
                  <Icon className="text-slate-900 w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-lg text-slate-900/60 leading-relaxed">
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
