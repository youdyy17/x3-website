import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import logo from '../assets/x3.png';

const navItems = ['Services', 'Portfolio', 'Technologies', 'About', 'Contact'];

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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-transparent/80 backdrop-blur-xl border-b border-slate-200 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 xl:px-24 flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center gap-2.5 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <img src={logo} alt="X3 Logo" className="h-16 w-16 object-contain" />
          <span className="text-slate-900 font-bold text-lg tracking-tight">
            <span className="text-slate-600 font-medium ml-1.5 hidden sm:inline">Software Solution</span>
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item.toLowerCase())}
              className="text-slate-600 hover:text-slate-900 transition-colors text-sm font-medium px-4 py-2 rounded-lg hover:bg-white border border-slate-200 cursor-pointer"
            >
              {item}
            </button>
          ))}
          <button
            onClick={() => scrollTo('cta')}
            className="ml-3 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:shadow-[0_4px_16px_rgba(0,0,0,0.3)] transition-all cursor-pointer"
            style={{ background: 'linear-gradient(to bottom, #2B2B2B, #101010)' }}
          >
            Start a Project
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden relative z-50 w-10 h-10 rounded-lg bg-white/[0.06] backdrop-blur-md flex items-center justify-center text-slate-900 cursor-pointer border border-slate-200"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Drawer */}
      <div
        className={`fixed right-0 top-0 z-40 flex flex-col h-full w-72 bg-white shadow-2xl border-l border-slate-200 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col gap-1 px-5 pt-24">
          {navItems.map((item, index) => (
            <button
              key={item}
              onClick={() => scrollTo(item.toLowerCase())}
              className={`flex items-center rounded-xl px-4 py-3.5 text-base font-medium text-slate-700 hover:bg-slate-50 border border-slate-200 hover:text-slate-900 transition-all duration-500 cursor-pointer ${
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
            className="w-full text-white py-3.5 rounded-xl text-sm font-semibold cursor-pointer hover:shadow-[0_4px_16px_rgba(0,0,0,0.3)] transition-all"
            style={{ background: 'linear-gradient(to bottom, #2B2B2B, #101010)' }}
          >
            Start a Project
          </button>
        </div>
      </div>
    </nav>
  );
}
