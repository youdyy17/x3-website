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
    <section id="about" className="py-20 lg:py-28 px-5 sm:px-8 lg:px-16 xl:px-24 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className={`grid lg:grid-cols-2 gap-16 items-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          
          {/* Text Content */}
          <div>
            <div className="mb-4">
              <span className="text-xs font-bold tracking-[0.2em] text-slate-500 uppercase">Who We Are</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              About <span className="text-slate-900">X3</span>
            </h2>
            <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
              <p>
                X3 Software Solution is a premier technology company founded on the principle that exceptional software can transform businesses. We specialize in designing, developing, and deploying custom software solutions that address complex challenges.
              </p>
              <p>
                Our team brings together technical expertise, innovative thinking, and a commitment to reliability. From enterprise applications to scalable cloud infrastructure, we build technology that scales with your ambition and drives tangible results.
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white shadow-sm border border-slate-200 border border-slate-200 rounded-2xl p-8 backdrop-blur-sm transition-transform hover:-translate-y-1">
              <div className="text-4xl sm:text-5xl font-bold font-silkscreen text-slate-900 mb-2">{years}+</div>
              <div className="text-slate-600 font-medium">Years Experience</div>
            </div>
            <div className="bg-white shadow-sm border border-slate-200 border border-slate-200 rounded-2xl p-8 backdrop-blur-sm transition-transform hover:-translate-y-1">
              <div className="text-4xl sm:text-5xl font-bold font-silkscreen text-slate-900 mb-2">{projects}+</div>
              <div className="text-slate-600 font-medium">Projects Delivered</div>
            </div>
            <div className="bg-white shadow-sm border border-slate-200 border border-slate-200 rounded-2xl p-8 backdrop-blur-sm transition-transform hover:-translate-y-1">
              <div className="text-4xl sm:text-5xl font-bold font-silkscreen text-slate-900 mb-2">{clients}+</div>
              <div className="text-slate-600 font-medium">Happy Clients</div>
            </div>
            <div className="bg-white shadow-sm border border-slate-200 border border-slate-200 rounded-2xl p-8 backdrop-blur-sm transition-transform hover:-translate-y-1">
              <div className="text-4xl sm:text-5xl font-bold font-silkscreen text-slate-900 mb-2">{team}+</div>
              <div className="text-slate-600 font-medium">Team Members</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
