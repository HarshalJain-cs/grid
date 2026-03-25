import { useState } from 'react';
import { useGame } from '@/store/gameStore';
import { useConvexLeaderboard } from '@/hooks/useConvexLeaderboard';
import { toast } from 'sonner';

interface VolunteerPanelProps {
  zone: 'zone1' | 'zone2' | 'zone3' | 'zone4' | 'trivia';
  maxScore?: number;
  scoreFromGuesses?: (guesses: number) => number;
  showGuesses?: boolean;
}

const PIN = 'ieeecs26';

export default function VolunteerPanel({ zone, maxScore = 100, scoreFromGuesses, showGuesses }: VolunteerPanelProps) {
  const [pin, setPin] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [vTeamId, setVTeamId] = useState('');
  const [score, setScore] = useState(0);
  const [guesses, setGuesses] = useState(0);
  const [notes, setNotes] = useState('');
  const { dispatch } = useGame();
  const { leaderboard, upsertEntry } = useConvexLeaderboard();

  const handleUnlock = () => {
    if (pin === PIN) setUnlocked(true);
    else toast.error('Incorrect PIN');
  };

  const computedScore = showGuesses && scoreFromGuesses ? scoreFromGuesses(guesses) : score;

  const handleSave = async () => {
    if (!vTeamId.trim()) { toast.error('Enter a Team ID'); return; }
    const teamId = vTeamId.trim();

    // Update local state
    dispatch({ type: 'SET_TEAM_ID', teamId });
    dispatch({ type: 'SET_ZONE_SCORE', zone, score: computedScore });
    dispatch({ type: 'COMPLETE_ZONE', zone });

    // Find existing entry or create new one
    const existing = leaderboard.find(e => e.teamId === teamId);
    const entry = {
      teamId,
      teamName: existing?.teamName || teamId,
      zone1: existing?.zone1 ?? 0,
      zone2: existing?.zone2 ?? 0,
      zone3: existing?.zone3 ?? 0,
      zone4: existing?.zone4 ?? 0,
      trivia: existing?.trivia ?? 0,
      total: 0,
      timestamp: Date.now(),
    };

    // Update the zone score
    if (zone === 'trivia') {
      entry.trivia = computedScore;
    } else {
      entry[zone] = computedScore;
    }
    entry.total = Math.min(entry.zone1 + entry.zone2 + entry.zone3 + entry.zone4 + entry.trivia, 500);

    await upsertEntry(entry);
    toast.success(`Score ${computedScore} saved for Team ${teamId} in ${zone}`);
    setVTeamId('');
    setScore(0);
    setGuesses(0);
    setNotes('');
  };

  if (!unlocked) {
    return (
      <div className="max-w-sm mx-auto text-center py-12">
        <p className="font-body text-ink mb-4">Enter Volunteer PIN</p>
        <input type="password" value={pin} onChange={e => setPin(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleUnlock()}
          className="w-full bg-white border border-cream-border rounded-xl px-4 py-3 font-mono text-ink text-center text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-leaf mb-4" placeholder="PIN" />
        <button onClick={handleUnlock} className="bg-leaf text-white font-body font-medium px-8 py-3 rounded-full">Unlock</button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto space-y-4 py-4">
      <div>
        <label className="font-mono text-[11px] text-ink-muted uppercase mb-1 block">Team ID</label>
        <input value={vTeamId} onChange={e => setVTeamId(e.target.value)}
          className="w-full bg-white border border-cream-border rounded-xl px-4 py-3 font-mono text-ink focus:outline-none focus:ring-2 focus:ring-leaf" />
      </div>
      {showGuesses ? (
        <div>
          <label className="font-mono text-[11px] text-ink-muted uppercase mb-1 block">Correct Guesses (0–20)</label>
          <input type="number" min={0} max={20} value={guesses} onChange={e => setGuesses(Number(e.target.value))}
            className="w-full bg-white border border-cream-border rounded-xl px-4 py-3 font-mono text-ink focus:outline-none focus:ring-2 focus:ring-leaf" />
          <p className="font-mono text-sm text-leaf mt-2">Calculated Score: {computedScore}</p>
        </div>
      ) : (
        <div>
          <label className="font-mono text-[11px] text-ink-muted uppercase mb-1 block">Score (0–{maxScore})</label>
          <input type="number" min={0} max={maxScore} value={score} onChange={e => setScore(Math.min(Number(e.target.value), maxScore))}
            className="w-full bg-white border border-cream-border rounded-xl px-4 py-3 font-mono text-ink focus:outline-none focus:ring-2 focus:ring-leaf" />
        </div>
      )}
      <div>
        <label className="font-mono text-[11px] text-ink-muted uppercase mb-1 block">Notes (optional)</label>
        <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={2}
          className="w-full bg-white border border-cream-border rounded-xl px-4 py-3 font-mono text-sm text-ink focus:outline-none focus:ring-2 focus:ring-leaf" />
      </div>
      <button onClick={handleSave} className="w-full bg-leaf text-white font-body font-medium py-3 rounded-full hover:bg-leaf/90 transition-colors">
        Save Score
      </button>
    </div>
  );
}
