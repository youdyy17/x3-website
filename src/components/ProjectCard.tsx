import { ArrowRight, ExternalLink } from 'lucide-react';

export type Project = {
  title: string;
  description: string;
  tags: string[];
  category: string;
  gradient: string;
  mockupType: string;
  status: 'Live' | 'In Development';
  featured: boolean;
};

type Props = {
  project: Project;
  layout: 'grid' | 'list' | 'compact';
};

export default function ProjectCard({ project, layout }: Props) {
  const isList = layout === 'list';
  const isCompact = layout === 'compact';

  const Mockup = () => (
    <>
      {project.mockupType === 'dashboard' && (
        <div className="w-[85%] h-[80%] bg-[#0f0f13] rounded-xl border-4 border-gray-800 shadow-2xl flex overflow-hidden transform group-hover:scale-105 transition-transform duration-500">
          <div className="w-1/4 bg-gray-900 border-r border-gray-800 p-3 flex flex-col gap-3">
            <div className="h-3 w-1/2 bg-gray-700 rounded-full mb-2"></div>
            {[...Array(4)].map((_, i) => <div key={i} className="h-2 w-full bg-gray-800 rounded-full"></div>)}
          </div>
          <div className="flex-1 p-4 flex flex-col gap-3">
            <div className="flex justify-between"><div className="h-4 w-1/4 bg-gray-700 rounded-full"></div></div>
            <div className="flex gap-3 h-1/3">
              <div className="flex-1 bg-gray-800 rounded-lg"></div>
              <div className="flex-1 bg-gray-800 rounded-lg"></div>
            </div>
            <div className="flex-1 bg-gray-800 rounded-lg"></div>
          </div>
        </div>
      )}
      
      {project.mockupType === 'mobile' && (
        <div className="w-[120px] sm:w-[150px] aspect-[9/19] bg-[#0f0f13] rounded-[2rem] border-4 border-gray-800 shadow-2xl overflow-hidden p-2 transform group-hover:scale-110 transition-transform duration-500">
          <div className="w-1/2 h-4 bg-gray-900 rounded-b-xl mx-auto -mt-2 mb-2"></div>
          <div className="h-1/3 bg-gray-800 rounded-xl mb-3"></div>
          <div className="flex flex-col gap-2 p-1">
            {[...Array(3)].map((_, i) => <div key={i} className="h-10 w-full bg-gray-900 rounded-lg"></div>)}
          </div>
        </div>
      )}

      {(project.mockupType === 'store' || project.mockupType === 'analytics') && (
        <div className="w-[90%] h-[75%] bg-[#0f0f13] rounded-xl border-4 border-gray-800 shadow-2xl overflow-hidden flex flex-col transform group-hover:-translate-y-2 transition-transform duration-500">
          <div className="h-10 bg-gray-900 flex items-center px-4 gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <div className="h-4 w-1/2 bg-gray-800 rounded-full ml-4"></div>
          </div>
          <div className="flex-1 p-4 grid grid-cols-3 gap-3">
            {[...Array(6)].map((_, i) => <div key={i} className="bg-gray-800 rounded-lg"></div>)}
          </div>
        </div>
      )}
    </>
  );

  return (
    <div className={`group flex transition-all duration-500 bg-surface border border-line hover:border-line-strong hover:shadow-xl rounded-2xl overflow-hidden ${
      isList ? 'flex-col md:flex-row' : 'flex-col h-full'
    }`}>
      {/* Image Area */}
      <div className={`${
        isList ? 'w-full md:w-2/5 aspect-[16/10] md:aspect-auto' :
        isCompact ? 'w-full aspect-[16/9]' :
        'w-full aspect-[4/3]'
      } bg-gradient-to-br ${project.gradient} p-4 sm:p-8 flex items-center justify-center relative overflow-hidden flex-shrink-0`}>
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-0"></div>
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          <Mockup />
        </div>
      </div>

      {/* Content Area */}
      <div className={`flex flex-col flex-grow ${
        isList ? 'p-6 sm:p-8' : 
        isCompact ? 'p-5' : 
        'p-6 sm:p-8'
      }`}>
        <div className="flex items-center justify-between gap-3 mb-4">
          <span className={`font-semibold bg-surface-2 border border-line text-fg-secondary px-3 py-1 rounded-full ${
            isCompact ? 'text-[11px]' : 'text-xs'
          }`}>
            {project.category}
          </span>
          {project.status && (
            <span className={`text-[11px] font-semibold flex items-center gap-1.5 ${
              project.status === 'Live' ? 'text-emerald-600' : 'text-amber-600'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${
                project.status === 'Live' ? 'bg-emerald-500' : 'bg-amber-500'
              }`}></span>
              {project.status}
            </span>
          )}
        </div>
        
        <h3 className={`font-bold text-fg group-hover:text-fg-secondary transition-colors ${
          isCompact ? 'text-lg mb-2' : 'text-2xl mb-3'
        }`}>
          {project.title}
        </h3>
        
        <p className={`text-fg-muted leading-relaxed flex-grow ${
          isCompact ? 'text-sm mb-4 line-clamp-2' : 'mb-6 line-clamp-3'
        }`}>
          {project.description}
        </p>
        
        <div className={`flex flex-wrap gap-2 ${isCompact ? 'mb-4' : 'mb-6'}`}>
          {project.tags.map((tag, i) => (
            <span key={i} className={`font-medium text-fg-subtle ${isCompact ? 'text-xs' : 'text-sm'}`}>
              {tag}{i < project.tags.length - 1 ? ' •' : ''}
            </span>
          ))}
        </div>

        {!isCompact && (
          <div className="mt-auto pt-4 border-t border-line-soft flex items-center justify-between">
            <button className="flex items-center gap-2 text-sm font-semibold text-fg hover:text-fg-muted transition-colors cursor-pointer">
              View Case Study <ArrowRight className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 rounded-full bg-surface-2 flex items-center justify-center hover:bg-surface-3 transition-colors border border-line cursor-pointer">
              <ExternalLink className="w-3.5 h-3.5 text-fg-muted" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
