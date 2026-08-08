import { useEffect, useRef, useState } from 'react';

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  // States for animated counters
  const [years, setYears] = useState(0);
  const [projects, setProjects] = useState(0);
  const [clients, setClients] = useState(0);
  const [team, setTeam] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { 
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    
    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;
    
    let currentStep = 0;
    
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      
      setYears(Math.floor(8 * easeOutQuart));
      setProjects(Math.floor(200 * easeOutQuart));
      setClients(Math.floor(50 * easeOutQuart));
      setTeam(Math.floor(15 * easeOutQuart));
      
      if (currentStep >= steps) clearInterval(timer);
    }, stepTime);
    
    return () => clearInterval(timer);
  }, [isVisible]);

  return (
    <section id="about" className="py-24 lg:py-32 px-5 sm:px-8 lg:px-16 xl:px-24 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className={`grid lg:grid-cols-2 gap-16 lg:gap-24 items-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          
          {/* Text Content */}
          <div>
            <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-white border border-slate-200">
              <span className="text-xs font-semibold tracking-wider uppercase text-slate-900">
                Who We Are
              </span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-[1.08] tracking-tight mb-8">
              Engineering the Next Generation of Software
            </h2>
            
            <div className="space-y-6 text-slate-900/60 text-lg leading-relaxed">
              <p>
                X3 Software Solution is a premier technology company founded on the principle that exceptional software can transform businesses. We specialize in designing, developing, and deploying custom software solutions that address complex challenges.
              </p>
              <p>
                Our team brings together technical expertise, innovative thinking, and a commitment to reliability. From enterprise applications to scalable cloud infrastructure, we build technology that scales with your ambition and drives tangible results.
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-16 pl-0 lg:pl-12 border-l-0 lg:border-l border-slate-100">
            <div className="flex flex-col gap-3">
              <div className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 tracking-tighter">{years}+</div>
              <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Years Experience</div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 tracking-tighter">{projects}+</div>
              <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Projects Delivered</div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 tracking-tighter">{clients}+</div>
              <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Happy Clients</div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 tracking-tighter">{team}+</div>
              <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Team Members</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
