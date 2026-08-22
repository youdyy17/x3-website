import { useEffect, useRef, useState } from 'react';
import { Code2, Globe, Smartphone, Palette, Cloud, Lightbulb } from 'lucide-react';
import SectionHeading from './SectionHeading';

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
          <SectionHeading eyebrow="What We Do" title="Technology Services & Solutions" titleSpacing="none" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div 
                key={index}
                className={`bg-surface-2 border border-line rounded-2xl p-8 group hover:-translate-y-2 hover:bg-surface-3 hover:border-line transition-all duration-500 delay-[${index * 100}ms] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-xl bg-surface-2 border border-line flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="text-fg w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-fg mb-4">{service.title}</h3>
                <p className="text-fg-muted mb-8 leading-relaxed">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {service.tags.map((tag, i) => (
                    <span key={i} className="text-xs font-medium text-fg-subtle bg-surface border border-line shadow-card px-3 py-1 rounded-full">
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
