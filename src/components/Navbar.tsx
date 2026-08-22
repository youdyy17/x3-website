import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';

const navItems = ['About', 'Technologies', 'Services', 'Portfolio', 'Team', 'Contact'];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
    <nav
      className={`fixed z-50 left-3 right-3 sm:left-4 sm:right-4 lg:left-6 lg:right-6 rounded-full bg-[var(--nav-bg)] backdrop-blur-xl backdrop-saturate-150 border border-[var(--nav-line)] shadow-[var(--nav-shadow)] transition-all duration-300 ${
        isScrolled ? 'top-2 py-2.5' : 'top-4 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 xl:px-24 flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center gap-2.5 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <Logo className="text-4xl" />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item.toLowerCase())}
              className="text-fg-muted hover:text-fg transition-colors text-sm font-medium px-4 py-2 rounded-lg hover:bg-surface-2 cursor-pointer"
            >
              {item}
            </button>
          ))}
          <ThemeToggle className="ml-2" />
          <button
            onClick={() => scrollTo('cta')}
            className="btn-solid ml-3 px-5 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer"
          >
            Start a Project
          </button>
        </div>

        {/* Mobile Controls — the toggle stays above the drawer so it works while open */}
        <div className="lg:hidden relative z-50 flex items-center gap-2">
          <ThemeToggle />
          <button
            className="w-10 h-10 rounded-lg bg-[var(--nav-bg)] backdrop-blur-md backdrop-saturate-150 flex items-center justify-center text-fg cursor-pointer border border-[var(--nav-line)] shadow-sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            <Menu
              className={`absolute h-5 w-5 transition-all duration-300 ${
                mobileMenuOpen ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
              }`}
            />
            <X
              className={`absolute h-5 w-5 transition-all duration-300 ${
                mobileMenuOpen ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
              }`}
            />
          </button>
        </div>
      </div>
    </nav>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[var(--overlay)] backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Drawer */}
      <div
        className={`fixed right-0 top-0 z-40 flex flex-col h-full w-72 bg-[var(--drawer-bg)] backdrop-blur-2xl backdrop-saturate-150 shadow-2xl border-l border-[var(--drawer-line)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col gap-1 px-5 pt-24">
          {navItems.map((item, index) => (
            <button
              key={item}
              onClick={() => scrollTo(item.toLowerCase())}
              className={`flex items-center rounded-xl px-4 py-3.5 text-base font-medium text-fg-secondary hover:bg-surface-2 hover:text-fg transition-all duration-500 cursor-pointer ${
                mobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'
              }`}
              style={{ transitionDelay: mobileMenuOpen ? `${(index + 1) * 60}ms` : '0ms' }}
            >
              {item}
            </button>
          ))}
        </div>
        <div
          className={`mt-auto px-5 pb-8 transition-all duration-400 ${
            mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: mobileMenuOpen ? '350ms' : '0ms' }}
        >
          <button
            onClick={() => scrollTo('cta')}
            className="btn-solid w-full py-3.5 rounded-xl text-sm font-semibold cursor-pointer transition-all"
          >
            Start a Project
          </button>
        </div>
      </div>
    </>
  );
}
