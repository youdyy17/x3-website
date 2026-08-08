import { useEffect, useRef, useState } from 'react';

const technologies = {
  Frontend: [
    { name: 'React', icon: 'react' },
    { name: 'Next.js', icon: 'nextdotjs' },
    { name: 'Vue.js', icon: 'vuedotjs' },
    { name: 'Angular', icon: 'angular' },
    { name: 'TypeScript', icon: 'typescript' },
    { name: 'Tailwind CSS', icon: 'tailwindcss' }
  ],
  Backend: [
    { name: 'Node.js', icon: 'nodedotjs' },
    { name: 'Python', icon: 'python' },
    { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
    { name: 'Go', icon: 'go' },
    { name: '.NET', icon: 'dotnet' },
    { name: 'GraphQL', icon: 'graphql' }
  ],
  Mobile: [
    { name: 'React Native', icon: 'react' },
    { name: 'Flutter', icon: 'flutter' },
    { name: 'Swift', icon: 'swift' },
    { name: 'Kotlin', icon: 'kotlin' }
  ],
  Database: [
    { name: 'PostgreSQL', icon: 'postgresql' },
    { name: 'MongoDB', icon: 'mongodb' },
    { name: 'Redis', icon: 'redis' },
    { name: 'MySQL', icon: 'mysql' }
  ],
  'Cloud & DevOps': [
    { name: 'AWS', icon: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg' },
    { name: 'Google Cloud', icon: 'googlecloud' },
    { name: 'Docker', icon: 'docker' },
    { name: 'Kubernetes', icon: 'kubernetes' },
    { name: 'CI/CD', icon: 'githubactions' }
  ],
  Design: [
    { name: 'Figma', icon: 'figma' },
    { name: 'Adobe XD', icon: 'https://upload.wikimedia.org/wikipedia/commons/c/c2/Adobe_XD_CC_icon.svg' },
    { name: 'Sketch', icon: 'sketch' },
    { name: 'Prototyping', icon: 'framer' }
  ]
};

export default function TechStackSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('Frontend');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="technologies" className="py-24 lg:py-32 px-5 sm:px-8 lg:px-16 xl:px-24 bg-slate-50 overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm">
            <span className="text-xs font-semibold tracking-wider uppercase text-slate-900">
              Technology Stack
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-[1.08] tracking-tight mb-6">
            Powered by Modern Tech
          </h2>
          <p className="text-lg text-slate-900/60 leading-relaxed max-w-2xl mx-auto">
            We leverage industry-leading tools and frameworks to build scalable, high-performance solutions.
          </p>
        </div>

        <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12">
            {Object.keys(technologies).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={activeTab === tab ? { background: 'linear-gradient(to bottom, #2B2B2B, #101010)' } : undefined}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === tab 
                    ? 'text-white shadow-[0_4px_16px_rgba(0,0,0,0.3)]' 
                    : 'bg-white shadow-sm border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tech Grid */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 min-h-[200px] max-w-5xl mx-auto">
            {technologies[activeTab as keyof typeof technologies].map((tech, index) => (
              <div 
                key={`${activeTab}-${tech.name}`}
                className="group bg-white shadow-sm border border-slate-200 rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-center gap-3 hover:shadow-md hover:border-slate-300 hover:-translate-y-1 transition-all duration-300 animate-[fadeIn_0.5s_ease-out_forwards] w-36 h-36 sm:w-40 sm:h-40"
                style={{ animationDelay: `${index * 50}ms`, opacity: 0 }}
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center flex-shrink-0 mb-1">
                  <img 
                    src={tech.icon.startsWith('http') ? tech.icon : `https://cdn.simpleicons.org/${tech.icon}`} 
                    alt={`${tech.name} logo`} 
                    className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300" 
                  />
                </div>
                <span className="text-slate-900 font-semibold text-sm sm:text-[15px] text-center px-1 line-clamp-2 leading-tight w-full break-words">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
