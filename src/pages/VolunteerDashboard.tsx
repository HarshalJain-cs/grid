import { useNavigate } from 'react-router-dom';
import { useConvexLeaderboard } from '@/hooks/useConvexLeaderboard';
import { Shield, Zap, Leaf, Cloud, Palette, Brain, Trophy } from 'lucide-react';

const zones = [
  { path: '/zone1', label: 'Zone 1 — Power Puzzle', icon: Zap, type: 'Physical', desc: 'Enter scores for the energy card allocation round' },
  { path: '/zone4', label: 'Zone 4 — GreenSketch', icon: Palette, type: 'Physical', desc: 'Enter guess counts for the drawing/acting round' },
  { path: '/zone2', label: 'Zone 2 — Carbon Quest', icon: Leaf, type: 'Digital', desc: 'Auto-scored — players submit on their devices' },
  { path: '/zone3', label: 'Zone 3 — Climate Decision', icon: Cloud, type: 'Digital', desc: 'Auto-scored — players submit on their devices' },
  { path: '/trivia', label: 'Tech Trivia', icon: Brain, type: 'Digital', desc: 'Auto-scored — players submit on their devices' },
];

export default function VolunteerDashboard() {
  const navigate = useNavigate();
  const { leaderboard, isLoading } = useConvexLeaderboard();

  const teamsCount = leaderboard.length;
  const completedTeams = leaderboard.filter(e => e.zone1 > 0 && e.zone2 > 0 && e.zone3 > 0 && e.zone4 > 0 && e.trivia > 0).length;

  return (
    <div className="pt-20 pb-12 px-4 md:px-6 max-w-3xl mx-auto">
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Shield size={16} className="text-leaf" />
            <p className="font-mono text-[11px] text-leaf uppercase tracking-widest">Volunteer Mode</p>
          </div>
          <h1 className="font-display text-3xl md:text-4xl text-ink">Dashboard</h1>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-8">
        <div className="border border-cream-border rounded-xl p-4 bg-white text-center">
          <p className="font-display text-2xl text-ink">{isLoading ? '...' : teamsCount}</p>
          <p className="font-mono text-[11px] text-ink-muted uppercase">Teams Registered</p>
        </div>
        <div className="border border-cream-border rounded-xl p-4 bg-white text-center">
          <p className="font-display text-2xl text-ink">{isLoading ? '...' : completedTeams}</p>
          <p className="font-mono text-[11px] text-ink-muted uppercase">Fully Completed</p>
        </div>
      </div>

      <h2 className="font-mono text-[11px] text-ink-muted uppercase tracking-widest mb-3">Zone Management</h2>
      <div className="space-y-3 mb-8">
        {zones.map(z => {
          const Icon = z.icon;
          const isPhysical = z.type === 'Physical';
          return (
            <button
              key={z.path}
              onClick={() => navigate(z.path)}
              className="w-full text-left border border-cream-border rounded-xl p-4 bg-white hover:border-leaf/50 transition-all flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-leaf-bg flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon size={18} className="text-leaf" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="font-display text-base text-ink">{z.label}</p>
                  <span className={`font-mono text-[10px] px-2 py-0.5 rounded-full ${isPhysical ? 'bg-amber-100 text-amber-700' : 'bg-blue-50 text-blue-600'}`}>
                    {z.type}
                  </span>
                </div>
                <p className="font-body text-xs text-ink-muted">{z.desc}</p>
              </div>
            </button>
          );
        })}
      </div>

      <button
        onClick={() => navigate('/leaderboard')}
        className="w-full border border-cream-border rounded-xl p-4 bg-white hover:border-leaf/50 transition-all flex items-center gap-4"
      >
        <div className="w-10 h-10 rounded-full bg-leaf-bg flex items-center justify-center flex-shrink-0">
          <Trophy size={18} className="text-leaf" />
        </div>
        <div>
          <p className="font-display text-base text-ink">Leaderboard</p>
          <p className="font-body text-xs text-ink-muted">View rankings and admin controls</p>
        </div>
      </button>
    </div>
  );
}
