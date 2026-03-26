import { useState } from 'react';
import { useGame } from '@/store/gameStore';
import { useConvexLeaderboard } from '@/hooks/useConvexLeaderboard';
import { toast } from 'sonner';

interface JudgingCriterion {
  label: string;
  points: string;
}

interface VolunteerPanelProps {
  zone: 'zone1' | 'zone2' | 'zone3' | 'zone4' | 'trivia';
  maxScore?: number;
  scoreFromGuesses?: (guesses: number) => number;
  showGuesses?: boolean;
  judgingCriteria?: JudgingCriterion[];
}

const PIN = 'ieeecs26';

export default function VolunteerPanel({ zone, maxScore = 100, scoreFromGuesses, showGuesses, judgingCriteria }: VolunteerPanelProps) {
  const [pin, setPin] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [vTeamId, setVTeamId] = useState('');
  const [vTeamName, setVTeamName] = useState('');
  const [score, setScore] = useState(0);
  const [guesses, setGuesses] = useState(0);
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const { dispatch } = useGame();
  const { leaderboard, syncZoneScore } = useConvexLeaderboard();

  const handleUnlock = () => {
    if (pin === PIN) setUnlocked(true);
    else toast.error('Incorrect PIN');
  };

  const computedScore = showGuesses && scoreFromGuesses ? scoreFromGuesses(guesses) : score;

  const handleSave = async () => {
    if (!vTeamId.trim()) { toast.error('Enter a Team ID'); return; }
    const finalScore = Number(computedScore);
    if (isNaN(finalScore) || finalScore < 0) { toast.error('Enter a valid score'); return; }
    if (saving) return;
    setSaving(true);
    const teamId = vTeamId.trim();
    const teamName = vTeamName.trim() || teamId;

    try {
      // Sync to Convex backend
      await syncZoneScore(teamId, teamName, zone, finalScore);

      // Update local state only after successful save
      dispatch({ type: 'SET_ZONE_SCORE', zone, score: finalScore });

      toast.success(`Score ${finalScore} saved for Team ${teamId} in ${zone}`);
      setVTeamId('');
      setVTeamName('');
      setScore(0);
      setGuesses(0);
      setNotes('');
    } catch (err) {
      console.error('Failed to save score to Convex:', err);
      toast.error(`Failed to save: ${err instanceof Error ? err.message : 'Check console for details'}`);
    } finally {
      setSaving(false);
    }
  };

  // Get teams that already have a score for this zone
  const zoneKey = zone === 'trivia' ? 'trivia' : zone;
  const scoredTeams = leaderboard
    .filter(e => e[zoneKey] > 0)
    .sort((a, b) => b[zoneKey] - a[zoneKey]);

  if (!unlocked) {
    return (
      <div className="max-w-sm mx-auto text-center py-12">
        <p className="font-body text-ink mb-4">Enter Volunteer PIN</p>
        <input type="password" value={pin} onChange={e => setPin(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleUnlock()}
          className="w-full bg-white border border-cream-border rounded-xl px-4 py-3 font-mono text-ink text-center text-base sm:text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-leaf mb-4 min-h-[48px]" placeholder="PIN" />
        <button onClick={handleUnlock} className="bg-leaf text-white font-body font-medium px-8 py-3 rounded-full">Unlock</button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto space-y-4 py-4 px-1">
      {/* Judging criteria reference card */}
      {judgingCriteria && judgingCriteria.length > 0 && (
        <div className="border border-cream-border rounded-xl overflow-hidden mb-2">
          <div className="bg-cream-alt px-4 py-2 font-mono text-[11px] text-ink-muted uppercase">Scoring Reference</div>
          {judgingCriteria.map(c => (
            <div key={c.label} className="flex justify-between px-4 py-2 border-t border-cream-border">
              <span className="font-body text-sm text-ink">{c.label}</span>
              <span className="font-mono text-sm text-leaf font-bold">{c.points}</span>
            </div>
          ))}
        </div>
      )}

      {/* Score entry form */}
      <div>
        <label className="font-mono text-[11px] text-ink-muted uppercase mb-1 block">Team ID *</label>
        <input type="number" inputMode="numeric" value={vTeamId} onChange={e => setVTeamId(e.target.value.replace(/\D/g, ''))}
          placeholder="e.g. 1"
          className="w-full bg-white border border-cream-border rounded-xl px-4 py-3 font-mono text-ink focus:outline-none focus:ring-2 focus:ring-leaf min-h-[48px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
      </div>
      <div>
        <label className="font-mono text-[11px] text-ink-muted uppercase mb-1 block">Team Name (optional)</label>
        <input value={vTeamName} onChange={e => setVTeamName(e.target.value)}
          placeholder="e.g. Green Warriors"
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
        <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3}
          className="w-full bg-white border border-cream-border rounded-xl px-4 py-3 font-mono text-sm text-ink focus:outline-none focus:ring-2 focus:ring-leaf" />
      </div>
      <button onClick={handleSave} disabled={saving} className="w-full bg-leaf text-white font-body font-medium py-3 rounded-full hover:bg-leaf/90 transition-colors disabled:opacity-50">
        {saving ? 'Saving...' : 'Save Score'}
      </button>

      {/* Scored teams list */}
      {scoredTeams.length > 0 && (
        <div className="mt-6">
          <h3 className="font-mono text-[11px] text-ink-muted uppercase tracking-widest mb-2">
            Scored Teams ({scoredTeams.length})
          </h3>
          <div className="border border-cream-border rounded-xl overflow-hidden">
            <div className="grid grid-cols-3 bg-cream-alt px-3 sm:px-4 py-2">
              <span className="font-mono text-[10px] text-ink-muted uppercase">Team</span>
              <span className="font-mono text-[10px] text-ink-muted uppercase text-center">Name</span>
              <span className="font-mono text-[10px] text-ink-muted uppercase text-right">Score</span>
            </div>
            {scoredTeams.map(t => (
              <div key={t.teamId} className="grid grid-cols-3 px-3 sm:px-4 py-2 border-t border-cream-border">
                <span className="font-mono text-sm text-ink">{t.teamId}</span>
                <span className="font-body text-sm text-ink-muted text-center truncate">{t.teamName}</span>
                <span className="font-mono text-sm text-leaf font-bold text-right">{t[zoneKey]}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
