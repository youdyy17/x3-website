import { useEffect, useRef, useState } from 'react';
import { LayoutGrid, List as ListIcon, Grid as GridIcon } from 'lucide-react';
import ProjectCard, { type Project } from './ProjectCard';

const projects: Project[] = [
  {
    title: "FinTrack Pro",
    description: "Enterprise financial management platform with real-time analytics, reporting, and advanced predictive modeling.",
    tags: ["React", "Node.js", "PostgreSQL", "AWS"],
    category: "Web Platform",
    gradient: "from-[#6C3AED] to-[#3B82F6]",
    mockupType: "dashboard",
    status: 'Live',
    featured: true
  },
  {
    title: "MediConnect",
    description: "Healthcare appointment and patient management mobile application with secure messaging and telehealth capabilities.",
    tags: ["React Native", "Firebase", "TypeScript"],
    category: "Mobile App",
    gradient: "from-[#3B82F6] to-[#06b6d4]",
    mockupType: "mobile",
    status: 'Live',
    featured: true
  },
  {
    title: "ShopFlow",
    description: "E-commerce platform with AI-powered product recommendations, automated inventory, and multi-channel fulfillment.",
    tags: ["Next.js", "Python", "MongoDB", "GCP"],
    category: "E-Commerce",
    gradient: "from-[#8b5cf6] to-[#ec4899]",
    mockupType: "store",
    status: 'In Development',
    featured: false
  },
  {
    title: "DataVault",
    description: "Cloud-based data analytics dashboard for business intelligence, featuring custom drag-and-drop report builders.",
    tags: ["Vue.js", "Django", "Docker", "K8s"],
    category: "Dashboard",
    gradient: "from-[#10b981] to-[#3b82f6]",
    mockupType: "analytics",
    status: 'Live',
    featured: false
  },
  {
    title: "EcoSmart Home",
    description: "IoT control center for managing smart home devices, optimizing energy consumption, and tracking carbon footprint.",
    tags: ["React", "Go", "AWS IoT", "Redis"],
    category: "Web Platform",
    gradient: "from-[#f59e0b] to-[#ef4444]",
    mockupType: "dashboard",
    status: 'Live',
    featured: false
  },
  {
    title: "FitLife Tracker",
    description: "Comprehensive fitness tracking mobile app with personalized workout plans and social challenges.",
    tags: ["Flutter", "Node.js", "PostgreSQL"],
    category: "Mobile App",
    gradient: "from-[#ec4899] to-[#f43f5e]",
    mockupType: "mobile",
    status: 'In Development',
    featured: false
  }
];

const categories = ['All', 'Web Platform', 'Mobile App', 'E-Commerce', 'Dashboard'];

export default function PortfolioSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [layout, setLayout] = useState<'grid' | 'list' | 'compact'>('grid');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const filteredProjects = projects.filter(p => activeCategory === 'All' || p.category === activeCategory);

  return (
    <section id="portfolio" className="py-24 lg:py-32 px-5 sm:px-8 lg:px-16 xl:px-24 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-white border border-slate-200">
            <span className="text-xs font-semibold tracking-wider uppercase text-slate-900">
              Our Work
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-[1.08] tracking-tight mb-6">
            Featured Projects
          </h2>
          <p className="text-lg text-slate-900/60 leading-relaxed max-w-2xl mx-auto">
            Explore our latest digital solutions and see how we help businesses transform and grow through innovative technology.
          </p>
        </div>

        {/* Control Bar */}
        <div className={`flex flex-col md:flex-row justify-between items-center gap-6 mb-12 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center md:justify-start gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                  activeCategory === category
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Layout Switcher */}
          <div className="flex bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
            <button 
              onClick={() => setLayout('grid')}
              className={`p-2.5 rounded-lg transition-all duration-300 cursor-pointer ${layout === 'grid' ? 'bg-slate-100 text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
              title="Grid View"
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setLayout('list')}
              className={`p-2.5 rounded-lg transition-all duration-300 cursor-pointer ${layout === 'list' ? 'bg-slate-100 text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
              title="List View"
            >
              <ListIcon className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setLayout('compact')}
              className={`p-2.5 rounded-lg transition-all duration-300 cursor-pointer ${layout === 'compact' ? 'bg-slate-100 text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
              title="Compact View"
            >
              <GridIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Projects Display */}
        <div 
          className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'} ${
            layout === 'grid' ? 'grid md:grid-cols-2 gap-8' :
            layout === 'list' ? 'flex flex-col gap-8' :
            'grid sm:grid-cols-2 lg:grid-cols-3 gap-6'
          }`}
        >
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <div 
                key={`${project.title}-${layout}`}
                className="animate-[fadeIn_0.5s_ease-out_forwards]"
                style={{ animationDelay: `${index * 100}ms`, opacity: 0 }}
              >
                <ProjectCard project={project} layout={layout} />
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-slate-500">
              No projects found in this category.
            </div>
          )}
        </div>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
