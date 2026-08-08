import { useEffect, useRef, useState } from 'react';
import { Code2, Globe, Smartphone, Palette, Cloud, Lightbulb, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: Code2,
    title: 'Custom Software',
    description: 'Tailored software solutions designed to solve your unique business challenges and streamline operations.',
    tags: ['Python', 'Java', 'Go', 'Enterprise']
  },
  {
    icon: Globe,
    title: 'Web Platforms',
    description: 'Modern, highly responsive web applications built with cutting-edge frameworks and scalable architectures.',
    tags: ['React', 'Next.js', 'Node.js', 'TypeScript']
  },
  {
    icon: Smartphone,
    title: 'Mobile Applications',
    description: 'Native and cross-platform mobile apps that deliver exceptional, fluid user experiences across all devices.',
    tags: ['React Native', 'iOS', 'Android', 'Flutter']
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'User-centered design that combines stunning aesthetics with seamless functionality to create intuitive interfaces.',
    tags: ['Figma', 'Prototyping', 'Wireframing', 'Design Systems']
  },
  {
    icon: Cloud,
    title: 'Cloud & DevOps',
    description: 'Resilient cloud infrastructure and automated DevOps practices for reliable, high-performance, and secure systems.',
    tags: ['AWS', 'Docker', 'Kubernetes', 'CI/CD']
  },
  {
    icon: Lightbulb,
    title: 'Tech Consulting',
    description: 'Strategic technology guidance to help you navigate digital transformation and build future-proof products.',
    tags: ['Strategy', 'Architecture', 'Audits', 'Agile']
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
    <section id="services" className="py-24 lg:py-32 px-5 sm:px-8 lg:px-16 xl:px-24 bg-slate-50" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className={`grid lg:grid-cols-12 gap-16 lg:gap-24 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          
          {/* Left Column (Sticky Header) */}
          <div className="lg:col-span-5 relative">
            <div className="sticky top-32">
              <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-white border border-slate-200">
                <span className="text-xs font-semibold tracking-wider uppercase text-slate-900">
                  What We Do
                </span>
              </div>
              
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-[1.08] tracking-tight mb-8">
                End-to-End Technical Solutions
              </h2>
              
              <p className="text-lg text-slate-900/60 leading-relaxed mb-10 max-w-lg">
                From initial concept and architectural design to full-stack development and cloud deployment, we provide comprehensive software engineering services tailored to your exact business needs.
              </p>
              
              <button
                onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
                className="group inline-flex items-center gap-2 text-white px-7 py-3.5 rounded-xl font-semibold text-[15px] shadow-[0_4px_16px_rgba(0,0,0,0.3)] transition-all cursor-pointer"
                style={{ background: 'linear-gradient(to bottom, #2B2B2B, #101010)' }}
              >
                View Our Portfolio
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Right Column (Services Stack) */}
          <div className="lg:col-span-7 flex flex-col">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div 
                  key={index}
                  className="group py-10 border-b border-slate-200 last:border-0 flex flex-col sm:flex-row gap-6 sm:gap-8 items-start transition-all duration-500 hover:bg-white hover:px-6 hover:-mx-6 rounded-2xl"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="w-16 h-16 shrink-0 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <Icon className="text-slate-900 w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-slate-700 transition-colors">{service.title}</h3>
                    <p className="text-slate-600 mb-6 leading-relaxed max-w-xl text-lg">
                      {service.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {service.tags.map((tag, i) => (
                        <span key={i} className="text-xs font-semibold text-slate-600 bg-slate-100/50 border border-slate-200 px-3 py-1.5 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
        </div>
      </div>
    </section>
  );
}
