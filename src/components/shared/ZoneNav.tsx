import { useNavigate, useLocation } from 'react-router-dom';
import { useGame } from '@/store/gameStore';
import { ArrowLeft, Trophy } from 'lucide-react';

const zoneDots = [
  { key: 'trivia', label: 'T', path: '/trivia' },
  { key: 'zone2', label: '2', path: '/zone2' },
  { key: 'zone3', label: '3', path: '/zone3' },
  { key: 'zone1', label: '1', path: '/zone1' },
  { key: 'zone4', label: '4', path: '/zone4' },
];

export default function ZoneNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = useGame();
  const currentPath = location.pathname;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center px-3 md:px-6 bg-cream border-b border-cream-border">
      <button onClick={() => navigate('/')} className="text-ink-muted hover:text-ink transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center -ml-2">
        <ArrowLeft size={20} />
      </button>
      <span className="font-display text-lg text-leaf ml-1">GridQuest</span>

      {/* Zone dots — visible on ALL viewports */}
      <div className="flex items-center gap-0.5 mx-auto">
        {zoneDots.map((d, i) => {
          const completed = state.completedZones.includes(d.key);
          const isCurrent = currentPath === d.path;
          return (
            <div key={d.key} className="flex items-center">
              {i > 0 && <div className="w-3 md:w-6 h-px bg-cream-border" />}
              <button
                onClick={() => navigate(d.path)}
                className={`w-8 h-8 md:w-7 md:h-7 rounded-full flex items-center justify-center font-mono text-[11px] font-bold transition-all ${
                  completed ? 'bg-leaf text-white' :
                  isCurrent ? 'border-2 border-leaf text-leaf bg-leaf-bg' :
                  'border border-cream-border text-ink-muted'
                }`}
              >
                {d.label}
              </button>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-1 ml-auto">
        {state.teamId && (
          <span className="font-mono text-[10px] text-leaf bg-leaf-bg px-2 py-1 rounded-full hidden sm:inline">
            Team {state.teamId}
          </span>
        )}
        <button onClick={() => navigate('/leaderboard')} className="text-ink-muted hover:text-leaf transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center -mr-2">
          <Trophy size={20} />
        </button>
      </div>
    </nav>
  );
}
