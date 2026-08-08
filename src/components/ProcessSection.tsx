import { useEffect, useRef, useState } from 'react';
import { Lightbulb, PenTool, Code2, TestTube, Rocket, HeartHandshake } from 'lucide-react';

const steps = [
  {
    title: "Idea & Discovery",
    description: "We analyze your business goals, target audience, and technical requirements to define a clear project roadmap.",
    icon: Lightbulb,
    tags: ["Market Research", "Requirement Analysis", "Project Scope"]
  },
  {
    title: "UX/UI Design",
    description: "Our designers craft intuitive, engaging interfaces focusing on user experience, accessibility, and brand alignment.",
    icon: PenTool,
    tags: ["Wireframing", "Prototyping", "Design System"]
  },
  {
    title: "Development",
    description: "We build scalable, secure architecture and write clean, maintainable code using the latest modern frameworks.",
    icon: Code2,
    tags: ["Frontend", "Backend", "API Integration"]
  },
  {
    title: "Testing & QA",
    description: "Rigorous automated and manual testing ensures your product is bug-free, fast, and secure under load.",
    icon: TestTube,
    tags: ["Unit Testing", "Performance", "Security Audits"]
  },
  {
    title: "Deployment",
    description: "Smooth, zero-downtime deployment to cloud infrastructure with complete CI/CD pipeline automation.",
    icon: Rocket,
    tags: ["Cloud Hosting", "CI/CD", "Monitoring Setup"]
  },
  {
    title: "Ongoing Support",
    description: "We provide proactive maintenance, feature updates, and continuous performance optimization post-launch.",
    icon: HeartHandshake,
    tags: ["Maintenance", "SLA Support", "Analytics"]
  }
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const stepElements = document.querySelectorAll('.process-step');
      let currentStep = 0;
      
      stepElements.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        // If the top of the element is above the middle of the screen
        if (rect.top < window.innerHeight * 0.6) {
          currentStep = index;
        }
      });
      setActiveStep(currentStep);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Trigger once on mount
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="process" className="py-24 lg:py-32 px-5 sm:px-8 lg:px-16 xl:px-24 bg-white overflow-hidden" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-white border border-slate-200">
            <span className="text-xs font-semibold tracking-wider uppercase text-slate-900">
              How We Work
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-[1.08] tracking-tight mb-6">
            Our Development Process
          </h2>
          <p className="text-lg text-slate-900/60 max-w-2xl mx-auto leading-relaxed">
            A proven, transparent methodology designed to deliver premium digital solutions on time and beyond expectations.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Central Line */}
          <div className="absolute left-[28px] lg:left-1/2 top-0 bottom-0 w-[2px] bg-slate-100 -translate-x-1/2 z-0">
            {/* Animated Fill Line */}
            <div 
              className="absolute top-0 left-0 w-full bg-slate-900 transition-all duration-700 ease-out"
              style={{ height: `${((activeStep) / (steps.length - 1)) * 100}%` }}
            ></div>
          </div>

          <div className="flex flex-col gap-4 lg:gap-6 relative z-10">
            {steps.map((step, index) => {
              const isActive = index <= activeStep;
              const isEven = index % 2 === 0;
              const Icon = step.icon;

              return (
                <div 
                  key={index} 
                  className={`process-step flex w-full transition-all duration-1000 relative ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Left Side (Desktop Only, Even items) */}
                  <div className={`hidden lg:flex w-1/2 items-center justify-end pr-16 ${!isEven && 'invisible'}`}>
                    <div className={`text-right transition-all duration-700 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-40 -translate-x-4'}`}>
                      <span className="text-sm font-bold text-slate-400 mb-2 block uppercase tracking-wider">Phase 0{index + 1}</span>
                      <h3 className="text-2xl font-bold text-slate-900 mb-3">{step.title}</h3>
                      <p className="text-slate-600 leading-relaxed mb-6 max-w-md ml-auto">
                        {step.description}
                      </p>
                      <div className="flex flex-wrap gap-2 justify-end">
                        {step.tags.map((tag, i) => (
                          <span key={i} className="text-xs font-semibold bg-slate-50 border border-slate-200 text-slate-600 px-3 py-1.5 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Center Node */}
                  <div 
                    className="absolute left-[28px] lg:left-1/2 top-0 w-16 h-16 shrink-0 rounded-full border-4 flex items-center justify-center transition-all duration-500 z-10 bg-white" 
                    style={{
                      borderColor: isActive ? '#0f172a' : '#e2e8f0',
                      boxShadow: isActive ? '0 0 20px rgba(0,0,0,0.1)' : 'none',
                      transform: `translateX(-50%) ${isActive ? 'scale(1.1)' : 'scale(1)'}`
                    }}
                  >
                    <Icon className={`w-6 h-6 transition-colors duration-500 ${isActive ? 'text-slate-900' : 'text-slate-400'}`} />
                  </div>

                  {/* Right Side (Mobile ALWAYS, Desktop Odd items) */}
                  <div className={`w-full lg:w-1/2 pl-24 lg:pl-16 flex flex-col justify-center min-h-[64px] ${isEven ? 'lg:hidden' : 'lg:flex'}`}>
                    <div className={`transition-all duration-700 ${isActive ? 'opacity-100 lg:translate-x-0' : 'opacity-40 lg:translate-x-4'}`}>
                      <span className="text-sm font-bold text-slate-400 mb-2 block uppercase tracking-wider">Phase 0{index + 1}</span>
                      <h3 className="text-2xl font-bold text-slate-900 mb-3">{step.title}</h3>
                      <p className="text-slate-600 leading-relaxed mb-6 max-w-md">
                        {step.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {step.tags.map((tag, i) => (
                          <span key={i} className="text-xs font-semibold bg-slate-50 border border-slate-200 text-slate-600 px-3 py-1.5 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
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
