import { useNavigate } from 'react-router-dom';

export default function HeroSection() {
  const navigate = useNavigate();
  const zones = [
    { emoji: '💡', name: 'Tech Trivia', type: 'Digital' },
    { emoji: '🌿', name: 'Carbon Quest', type: 'Digital' },
    { emoji: '🌡', name: 'Climate Decision', type: 'Digital' },
    { emoji: '⚡', name: 'Power Puzzle', type: 'Physical' },
    { emoji: '✏️', name: 'GreenSketch', type: 'Offline' },
  ];

  return (
    <section className="py-20 md:py-32 px-6">
      <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-12 items-start">
        <div className="animate-fade-rise">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-6">
            ⚡ TEAM CHALLENGE · BMSCE
          </p>
          <h1 className="font-display text-6xl md:text-7xl lg:text-8xl text-ink leading-[0.95] mb-4">
            GridQuest
          </h1>
          <h2 className="font-display text-3xl md:text-4xl text-ink italic mb-8">
            Solve the Grid, Save the Planet.
          </h2>
          <div className="flex flex-wrap gap-3 mb-8">
            {['📅 2026 · BMSCE', '👥 Teams of 2', '🏆 4 Zones · 500 pts'].map(chip => (
              <span key={chip} className="font-mono text-xs bg-cream-alt border border-cream-border px-3 py-1.5 rounded-full text-ink-muted">
                {chip}
              </span>
            ))}
          </div>
          <p className="font-body text-base text-ink-muted leading-relaxed mb-8 max-w-lg">
            A multi-round sustainability challenge where teams tackle energy allocation, carbon tracking, climate decisions, and creative thinking — all under the clock.
          </p>
          <div className="flex flex-wrap gap-4">
            <button onClick={() => navigate('/trivia')} className="bg-leaf text-white font-body font-medium px-6 py-3 rounded-full hover:bg-leaf/90 transition-colors min-h-[48px]">
              Enter the Quest →
            </button>
            <button onClick={() => navigate('/leaderboard')} className="border border-cream-border text-ink font-body font-medium px-6 py-3 rounded-full hover:bg-cream-alt transition-colors">
              View Leaderboard
            </button>
          </div>
        </div>

        <div className="animate-fade-rise-2">
          <div className="border border-cream-border rounded-2xl p-6 bg-white/60">
            <div className="flex items-baseline justify-between mb-1">
              <span className="font-display text-xl text-ink">Max Score</span>
              <span className="font-display text-4xl text-leaf">500 <span className="text-lg text-ink-muted">pts</span></span>
            </div>
            <p className="text-xs font-mono text-ink-muted mb-6">/ across all 5 zones</p>
            <div className="space-y-3">
              {zones.map(z => (
                <div key={z.name} className="flex items-center justify-between py-2 border-b border-cream-border last:border-0">
                  <span className="font-body text-sm text-ink">
                    {z.emoji} {z.name} <span className="text-ink-muted">| {z.type}</span>
                  </span>
                  <span className="font-mono text-sm text-leaf font-bold">100 pts</span>
                </div>
              ))}
            </div>
            <button onClick={() => navigate('/trivia')} className="w-full mt-6 bg-leaf text-white font-body font-medium py-3 rounded-full hover:bg-leaf/90 transition-colors">
              Enter the Quest →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
