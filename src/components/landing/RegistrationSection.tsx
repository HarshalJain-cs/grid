import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '@/store/gameStore';
import { Check } from 'lucide-react';

export default function RegistrationSection() {
  const [teamId, setTeamId] = useState('');
  const { dispatch } = useGame();
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!teamId.trim()) return;
    dispatch({ type: 'SET_TEAM_ID', teamId: teamId.trim() });
    navigate('/entry');
  };

  const features = [
    'Physical challenge: energy card allocation puzzle',
    'Digital lifestyle tracker with carbon scoring',
    'Real-world climate crisis scenarios',
    'Sustainability draw-and-guess game',
    '20-question tech trivia rapid-fire',
  ];

  return (
    <section id="register" className="py-20 md:py-28 px-6 bg-cream-alt">
      <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-6 md:gap-12">
        <div>
          <h2 className="font-display text-4xl md:text-5xl text-ink mb-4">Ready to play?</h2>
          <p className="font-body text-base text-ink-muted mb-8">
            Enter your Team ID to get started. You'll use this across all zones. Make sure both teammates remember it.
          </p>
          <div className="flex gap-3 mb-6">
            <input
              type="text"
              placeholder="Team ID"
              value={teamId}
              onChange={e => setTeamId(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              className="flex-1 bg-white border border-cream-border rounded-xl px-4 py-3 font-mono text-sm text-ink placeholder:text-ink-muted/50 focus:outline-none focus:ring-2 focus:ring-leaf"
            />
          </div>
          <button onClick={handleSubmit} className="w-full bg-leaf text-white font-body font-medium py-3 rounded-full hover:bg-leaf/90 transition-colors mb-8">
            Set Team ID & Enter the Quest →
          </button>
          <p className="font-body text-xs text-ink-muted">
            Already have a Team ID? →{' '}
            {['Zone 1', 'Zone 2', 'Zone 3', 'Zone 4', 'Trivia'].map((z, i) => (
              <span key={z}>
                <button onClick={() => navigate(`/${i < 4 ? `zone${i + 1}` : 'trivia'}`)} className="underline hover:text-ink">{z}</button>
                {i < 4 && ' · '}
              </span>
            ))}
          </p>
        </div>

        <div className="border border-cream-border rounded-2xl p-6 bg-white/60">
          <h3 className="font-display text-xl text-ink mb-1">What's included</h3>
          <p className="font-mono text-sm text-leaf mb-6">5 Zones included</p>
          <div className="flex items-baseline gap-2 mb-6">
            <span className="font-display text-4xl text-ink">100</span>
            <span className="font-body text-sm text-ink-muted">pts / per zone</span>
          </div>
          <div className="space-y-3 mb-8">
            {features.map(f => (
              <div key={f} className="flex items-start gap-3">
                <Check size={16} className="text-leaf mt-0.5 shrink-0" />
                <span className="font-body text-sm text-ink-muted">{f}</span>
              </div>
            ))}
          </div>
          <button onClick={handleSubmit} className="w-full bg-leaf text-white font-body font-medium py-3 rounded-full hover:bg-leaf/90 transition-colors mb-3">
            Enter the Quest →
          </button>
          <p className="font-mono text-[11px] text-ink-muted text-center">Free to participate · BMSCE students only</p>
        </div>
      </div>
    </section>
  );
}
