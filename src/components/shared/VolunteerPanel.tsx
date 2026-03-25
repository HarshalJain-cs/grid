import { useState } from 'react';
import { useGame } from '@/store/gameStore';
import { toast } from 'sonner';

interface VolunteerPanelProps {
  zone: 'zone1' | 'zone2' | 'zone3' | 'zone4' | 'trivia';
  maxScore?: number;
  scoreFromGuesses?: (guesses: number) => number;
  showGuesses?: boolean;
}

const PIN = '2604';

export default function VolunteerPanel({ zone, maxScore = 100, scoreFromGuesses, showGuesses }: VolunteerPanelProps) {
  const [pin, setPin] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [vTeamId, setVTeamId] = useState('');
  const [score, setScore] = useState(0);
  const [guesses, setGuesses] = useState(0);
  const [notes, setNotes] = useState('');
  const { dispatch } = useGame();

  const handleUnlock = () => {
    if (pin === PIN) setUnlocked(true);
    else toast.error('Incorrect PIN');
  };

  const computedScore = showGuesses && scoreFromGuesses ? scoreFromGuesses(guesses) : score;

  const handleSave = () => {
    if (!vTeamId.trim()) { toast.error('Enter a Team ID'); return; }
    // Update or add to leaderboard
    dispatch({ type: 'SET_TEAM_ID', teamId: vTeamId.trim() });
    dispatch({ type: 'SET_ZONE_SCORE', zone, score: computedScore });
    dispatch({ type: 'COMPLETE_ZONE', zone });
    dispatch({ type: 'SUBMIT_TO_LEADERBOARD' });
    toast.success(`Score ${computedScore} saved for Team ${vTeamId.trim()} in ${zone}`);
    setVTeamId('');
    setScore(0);
    setGuesses(0);
    setNotes('');
  };

  if (!unlocked) {
    return (
      <div className="max-w-sm mx-auto text-center py-12">
        <p className="font-body text-zone-fg mb-4">Enter Volunteer PIN</p>
        <input type="password" value={pin} onChange={e => setPin(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleUnlock()}
          className="w-full bg-zone-bg2 border border-zone-accent/20 rounded-xl px-4 py-3 font-mono text-zone-fg text-center text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-zone-accent mb-4" placeholder="PIN" />
        <button onClick={handleUnlock} className="bg-zone-accent text-zone-bg font-body font-medium px-8 py-3 rounded-full">Unlock</button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto space-y-4 py-4">
      <div>
        <label className="font-mono text-[11px] text-zone-muted uppercase mb-1 block">Team ID</label>
        <input value={vTeamId} onChange={e => setVTeamId(e.target.value)}
          className="w-full bg-zone-bg2 border border-zone-accent/20 rounded-xl px-4 py-3 font-mono text-zone-fg focus:outline-none focus:ring-2 focus:ring-zone-accent" />
      </div>
      {showGuesses ? (
        <div>
          <label className="font-mono text-[11px] text-zone-muted uppercase mb-1 block">Correct Guesses (0–20)</label>
          <input type="number" min={0} max={20} value={guesses} onChange={e => setGuesses(Number(e.target.value))}
            className="w-full bg-zone-bg2 border border-zone-accent/20 rounded-xl px-4 py-3 font-mono text-zone-fg focus:outline-none focus:ring-2 focus:ring-zone-accent" />
          <p className="font-mono text-sm text-zone-accent mt-2">Calculated Score: {computedScore}</p>
        </div>
      ) : (
        <div>
          <label className="font-mono text-[11px] text-zone-muted uppercase mb-1 block">Score (0–{maxScore})</label>
          <input type="number" min={0} max={maxScore} value={score} onChange={e => setScore(Math.min(Number(e.target.value), maxScore))}
            className="w-full bg-zone-bg2 border border-zone-accent/20 rounded-xl px-4 py-3 font-mono text-zone-fg focus:outline-none focus:ring-2 focus:ring-zone-accent" />
        </div>
      )}
      <div>
        <label className="font-mono text-[11px] text-zone-muted uppercase mb-1 block">Notes (optional)</label>
        <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={2}
          className="w-full bg-zone-bg2 border border-zone-accent/20 rounded-xl px-4 py-3 font-mono text-sm text-zone-fg focus:outline-none focus:ring-2 focus:ring-zone-accent" />
      </div>
      <button onClick={handleSave} className="w-full bg-zone-accent text-zone-bg font-body font-medium py-3 rounded-full hover:bg-zone-accent/90 transition-colors">
        Save Score
      </button>
    </div>
  );
}
