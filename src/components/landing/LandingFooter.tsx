import { useNavigate } from 'react-router-dom';

export default function LandingFooter() {
  const navigate = useNavigate();
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-cream-border py-16 px-6 bg-cream">
      <div className="max-w-[1200px] mx-auto grid md:grid-cols-3 gap-12 mb-12">
        <div>
          <span className="font-display text-2xl text-ink">Grid<span className="text-leaf">Quest</span></span>
          <p className="font-body text-sm text-ink-muted mt-3">A sustainability challenge by BMS College of Engineering.</p>
        </div>
        <div>
          <h4 className="font-mono text-[11px] uppercase tracking-widest text-ink-muted mb-4">Menu</h4>
          <div className="flex flex-col gap-2">
            {['#overview', '#zones', '#organizer', '#faq', '#register'].map(h => (
              <button key={h} onClick={() => scrollTo(h)} className="font-body text-sm text-ink-muted hover:text-ink text-left">{h.replace('#', '').charAt(0).toUpperCase() + h.slice(2)}</button>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-mono text-[11px] uppercase tracking-widest text-ink-muted mb-4">Jump In</h4>
          <div className="flex flex-col gap-2">
            {[
              { label: 'Zone 1', path: '/zone1' },
              { label: 'Zone 2', path: '/zone2' },
              { label: 'Zone 3', path: '/zone3' },
              { label: 'Zone 4', path: '/zone4' },
              { label: 'Tech Trivia', path: '/trivia' },
              { label: 'Leaderboard', path: '/leaderboard' },
            ].map(l => (
              <button key={l.path} onClick={() => navigate(l.path)} className="font-body text-sm text-ink-muted hover:text-ink text-left">{l.label}</button>
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-[1200px] mx-auto flex flex-wrap items-center justify-between border-t border-cream-border pt-6">
        <p className="font-mono text-[11px] text-ink-muted">© 2026 GridQuest · BMS College of Engineering</p>
        <p className="font-mono text-[11px] text-ink-muted">Built for sustainability ⚡</p>
      </div>
    </footer>
  );
}
