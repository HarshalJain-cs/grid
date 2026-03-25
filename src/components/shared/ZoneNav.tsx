import { useNavigate, useLocation } from 'react-router-dom';
import { useGame } from '@/store/gameStore';
import { ArrowLeft, Trophy } from 'lucide-react';

const zoneDots = [
  { key: 'zone1', label: 'Z1', path: '/zone1' },
  { key: 'zone2', label: 'Z2', path: '/zone2' },
  { key: 'zone3', label: 'Z3', path: '/zone3' },
  { key: 'zone4', label: 'Z4', path: '/zone4' },
  { key: 'trivia', label: 'T', path: '/trivia' },
];

export default function ZoneNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = useGame();
  const currentPath = location.pathname;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center px-4 md:px-6" style={{ background: 'rgba(10,26,15,0.92)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(168,224,99,0.12)' }}>
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/')} className="text-zone-muted hover:text-zone-fg transition-colors"><ArrowLeft size={18} /></button>
        <span className="font-display text-xl text-zone-accent">GridQuest</span>
      </div>

      <div className="hidden md:flex items-center gap-1 mx-auto">
        {zoneDots.map((d, i) => {
          const completed = state.completedZones.includes(d.key);
          const isCurrent = currentPath === d.path;
          return (
            <div key={d.key} className="flex items-center">
              {i > 0 && <div className="w-6 h-px bg-zone-muted/30" />}
              <button
                onClick={() => navigate(d.path)}
                className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-[10px] font-bold transition-all ${
                  completed ? 'bg-zone-accent text-zone-bg' :
                  isCurrent ? 'border-2 border-zone-accent text-zone-accent animate-pulse-glow' :
                  'border border-zone-muted/40 text-zone-muted/60'
                }`}
              >
                {d.label}
              </button>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-3 ml-auto">
        {state.teamId && (
          <span className="font-mono text-[11px] text-zone-accent bg-zone-accent/10 px-3 py-1 rounded-full">
            Team {state.teamId}
          </span>
        )}
        <button onClick={() => navigate('/leaderboard')} className="text-zone-muted hover:text-zone-accent transition-colors">
          <Trophy size={18} />
        </button>
      </div>
    </nav>
  );
}
