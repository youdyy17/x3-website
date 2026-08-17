import { useEffect, useRef, useState } from 'react';
import youdy from '../assets/youdy.jpg';
import { useTheme } from '../theme/theme-context';

// Baked into the data URI, so the palette has to be passed in rather than read
// from CSS. Mirrors --solid / --on-solid for each theme.
const AVATAR_COLORS = {
  light: { bg: '#0f172a', fg: '#ffffff' },
  dark: { bg: '#e8ecf3', fg: '#0b0e14' },
} as const;

function initialsAvatar(name: string, theme: 'light' | 'dark') {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase();

  const { bg, fg } = AVATAR_COLORS[theme];

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256">
    <rect width="256" height="256" fill="${bg}" />
    <text x="128" y="128" text-anchor="middle" dominant-baseline="central" font-family="'Helvetica Neue', Arial, sans-serif" font-size="88" font-weight="700" fill="${fg}">${initials}</text>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

const team = [
  {
    name: 'ITH Youdy',
    role: 'Mobile App Developer',
    bio: 'Develops and maintains mobile applications, ensuring a high-quality user experience across platforms.',
    photo: youdy,
  },
  {
    name: 'CHUM Sothyrak',
    role: 'Full Stack Developer',
    bio: 'Architects scalable systems and leads the development team in delivering robust, high-performance software.',
    photo: ''
  },
  {
    name: 'NGOV Sengpovpanha',
    role: 'Backend Developer',
    bio: 'Crafts intuitive, elegant user experiences that balance functionality with beautiful design.',
    photo: ''
  }
];

export default function TeamSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="team" className="py-20 lg:py-28 px-5 sm:px-8 lg:px-16 xl:px-24 bg-surface" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="mb-4">
            <span className="text-xs font-bold tracking-[0.2em] text-fg-subtle uppercase">Our Team</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-fg mb-6">
            Meet the People Behind X3
          </h2>
          <p className="text-fg-muted max-w-2xl mx-auto text-lg leading-relaxed">
            A small, dedicated team combining leadership, engineering, and design to bring your ideas to life.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {team.map((member, index) => (
            <div
              key={member.name}
              className={`bg-surface border border-line shadow-card rounded-2xl p-8 flex flex-col items-center text-center hover:-translate-y-1 hover:shadow-md transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <img
                src={member.photo || initialsAvatar(member.name, theme)}
                alt={member.name}
                className="w-32 h-32 rounded-full object-cover object-top border-4 border-line-soft shadow-sm mb-6"
              />
              <h3 className="text-xl font-bold text-fg mb-1">{member.name}</h3>
              <span className="text-sm font-semibold text-fg-subtle uppercase tracking-wide mb-4">
                {member.role}
              </span>
              <p className="text-fg-muted leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
