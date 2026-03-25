import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Overview', href: '#overview' },
  { label: 'Zones', href: '#zones' },
  { label: 'Organizer', href: '#organizer' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Register', href: '#register' },
];

export default function LandingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const scrollTo = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`sticky top-0 z-50 bg-cream border-b border-cream-border transition-shadow ${scrolled ? 'shadow-md' : ''}`}>
      <div className="max-w-[1200px] mx-auto flex items-center justify-between px-6 h-16">
        <div className="flex items-center gap-3">
          <span className="font-display text-2xl text-ink">Grid<span className="text-leaf">Quest</span></span>
          <span className="hidden sm:inline font-mono text-[11px] text-ink-muted bg-cream-alt px-2 py-0.5 rounded-full">BMSCE · 2026</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(l => (
            <button key={l.href} onClick={() => scrollTo(l.href)} className="font-body text-sm text-ink-muted hover:text-ink transition-colors">
              {l.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/entry')} className="hidden sm:inline-flex bg-leaf text-white font-body text-sm font-medium px-5 py-2 rounded-full hover:bg-leaf/90 transition-colors">
            Enter the Quest →
          </button>
          <button className="md:hidden" onClick={() => setOpen(!open)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden fixed inset-0 top-16 bg-cream z-40 flex flex-col items-center pt-12 gap-6">
          {navLinks.map(l => (
            <button key={l.href} onClick={() => scrollTo(l.href)} className="font-body text-lg text-ink">
              {l.label}
            </button>
          ))}
          <button onClick={() => { setOpen(false); navigate('/trivia'); }} className="bg-leaf text-white font-body text-base font-medium px-8 py-3 rounded-full mt-4 min-h-[48px]">
            Enter the Quest →
          </button>
        </div>
      )}
    </nav>
  );
}
