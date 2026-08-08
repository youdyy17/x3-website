import { useEffect, useRef, useState } from 'react';
import { Code2, Globe, Smartphone, Palette, Cloud, Lightbulb } from 'lucide-react';

const services = [
  {
    icon: Code2,
    title: 'Custom Software',
    description: 'Tailored software solutions designed to solve your unique business challenges and streamline operations.',
    tags: ['Python', 'Java', 'Go']
  },
  {
    icon: Globe,
    title: 'Web Applications',
    description: 'Modern, responsive web applications built with cutting-edge frameworks and best practices.',
    tags: ['React', 'Next.js', 'Node.js']
  },
  {
    icon: Smartphone,
    title: 'Mobile Development',
    description: 'Native and cross-platform mobile applications that deliver exceptional user experiences.',
    tags: ['React Native', 'iOS', 'Android']
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'User-centered design that combines aesthetics with functionality to create intuitive interfaces.',
    tags: ['Figma', 'Prototyping', 'Wireframing']
  },
  {
    icon: Cloud,
    title: 'Cloud & DevOps',
    description: 'Scalable cloud infrastructure and DevOps practices for reliable, high-performance systems.',
    tags: ['AWS', 'Docker', 'CI/CD']
  },
  {
    icon: Lightbulb,
    title: 'Tech Consulting',
    description: 'Strategic technology guidance to help you make informed decisions and drive digital transformation.',
    tags: ['Strategy', 'Architecture', 'Audits']
  }
];

export default function ServicesSection() {
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
    <section id="services" className="py-20 lg:py-28 px-5 sm:px-8 lg:px-16 xl:px-24" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="mb-4">
            <span className="text-xs font-bold tracking-[0.2em] text-slate-500 uppercase">What We Do</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
            Technology Services & Solutions
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div 
                key={index}
                className={`bg-slate-50 border border-slate-200 border border-slate-200 rounded-2xl p-8 backdrop-blur-sm group hover:-translate-y-2 hover:bg-slate-100 hover:border-slate-200 transition-all duration-500 delay-[${index * 100}ms] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-xl bg-slate-50 border border-slate-200 border border-slate-200 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="text-slate-900 w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{service.title}</h3>
                <p className="text-slate-600 mb-8 leading-relaxed">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {service.tags.map((tag, i) => (
                    <span key={i} className="text-xs font-medium text-slate-500 bg-white shadow-sm border border-slate-200 px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
