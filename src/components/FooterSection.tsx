import { Mail, Phone, MapPin } from 'lucide-react';
import Logo from './Logo';

/* Inline SVG social icons since lucide-react doesn't ship brand icons */
function TwitterIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

const socialLinks = [
  { icon: TwitterIcon, href: '#', label: 'Twitter' },
  { icon: LinkedInIcon, href: '#', label: 'LinkedIn' },
  { icon: GithubIcon, href: '#', label: 'GitHub' },
];

const serviceLinks = [
  'Custom Software',
  'Web Applications',
  'Mobile Development',
  'UI/UX Design',
  'Cloud & DevOps',
  'Tech Consulting',
];

const companyLinks = [
  { label: 'About Us', id: 'about' },
  { label: 'Portfolio', id: 'portfolio' },
  { label: 'Our Process', id: 'process' },
  { label: 'Technologies', id: 'technologies' },
  { label: 'Careers', id: null },
];

export default function FooterSection() {
  const currentYear = new Date().getFullYear();

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer
      id="contact"
      className="bg-transparent border-t border-line pt-20 pb-10 px-5 sm:px-8 lg:px-16 xl:px-24 relative z-10"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Column 1: Brand */}
          <div className="lg:pr-8">
            <div className="flex items-center gap-2.5 mb-6">
              <Logo className="text-xl" />
            </div>
            <p className="text-fg-subtle mb-8 leading-relaxed text-sm">
              Transforming businesses through innovative custom software
              solutions. We build technology that scales with your ambition.
            </p>
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-surface border border-line flex items-center justify-center text-fg-subtle hover:text-fg hover:bg-surface-2 hover:border-line-strong transition-all"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h4 className="text-fg font-semibold text-sm uppercase tracking-wider mb-6">
              Services
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollTo('services')}
                    className="text-fg-subtle hover:text-fg text-sm transition-colors cursor-pointer"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="text-fg font-semibold text-sm uppercase tracking-wider mb-6">
              Company
            </h4>
            <ul className="space-y-3">
              {companyLinks.map(({ label, id }) => (
                <li key={label}>
                  {id ? (
                    <button
                      onClick={() => scrollTo(id)}
                      className="text-fg-subtle hover:text-fg text-sm transition-colors cursor-pointer"
                    >
                      {label}
                    </button>
                  ) : (
                    <a
                      href="#"
                      className="text-fg-subtle hover:text-fg text-sm transition-colors"
                    >
                      {label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="text-fg font-semibold text-sm uppercase tracking-wider mb-6">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-fg-subtle text-sm">
                <Mail size={16} className="text-fg-subtle shrink-0" />
                <a
                  href="mailto:hello@x3solutions.com"
                  className="hover:text-fg transition-colors"
                >
                  hello@x3solutions.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-fg-subtle text-sm">
                <Phone size={16} className="text-fg-subtle shrink-0" />
                <span>+1 (555) 000-0000</span>
              </li>
              <li className="flex items-start gap-3 text-fg-subtle text-sm">
                <MapPin size={16} className="text-fg-subtle shrink-0 mt-0.5" />
                <span>
                  San Francisco, CA
                  <br />
                  United States
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-line flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-fg-subtle text-xs">
            © {currentYear} CodeX3 Digital. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-fg-subtle text-xs hover:text-fg-muted transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-fg-subtle text-xs hover:text-fg-muted transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
