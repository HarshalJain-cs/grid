import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '@/store/gameStore';
import { useConvexLeaderboard } from '@/hooks/useConvexLeaderboard';
import { Users, Shield, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

const VOLUNTEER_PIN = 'ieeecs26';

export default function EntryGate() {
  const navigate = useNavigate();
  const { dispatch } = useGame();
  const { registerTeam, syncZoneScore } = useConvexLeaderboard();
  const [mode, setMode] = useState<'select' | 'participant' | 'volunteer'>('select');
  const [teamId, setTeamId] = useState('');
  const [teamName, setTeamName] = useState('');
  const [pin, setPin] = useState('');

  const handleParticipantStart = async () => {
    if (!teamId.trim()) {
      toast.error('Please enter your Team ID');
      return;
    }
    const id = teamId.trim();
    const name = teamName.trim() || id;
    dispatch({ type: 'SET_TEAM_ID', teamId: id, teamName: name });
    // Register team in Convex backend
    await registerTeam(id, name);
    navigate('/trivia');
  };

  const handleVolunteerUnlock = () => {
    if (pin === VOLUNTEER_PIN) {
      dispatch({ type: 'SET_VOLUNTEER', isVolunteer: true });
      navigate('/volunteer');
    } else {
      toast.error('Incorrect PIN');
    }
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center px-6 py-12">
      {mode !== 'select' && (
        <button
          onClick={() => setMode('select')}
          className="absolute top-6 left-6 text-ink-muted hover:text-ink transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
        >
          <ArrowLeft size={20} />
        </button>
      )}

      <h1 className="font-display text-4xl md:text-5xl text-ink mb-2 text-center">GridQuest</h1>
      <p className="font-mono text-xs text-ink-muted uppercase tracking-widest mb-10">Choose your role</p>

      {mode === 'select' && (
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-lg">
          <button
            onClick={() => setMode('participant')}
            className="flex-1 border border-cream-border rounded-2xl p-6 bg-white/60 hover:border-leaf hover:bg-leaf-bg transition-all text-center group"
          >
            <div className="w-14 h-14 rounded-full bg-leaf-bg flex items-center justify-center mx-auto mb-4 group-hover:bg-leaf/20 transition-colors">
              <Users size={24} className="text-leaf" />
            </div>
            <h2 className="font-display text-xl text-ink mb-1">Participant</h2>
            <p className="font-body text-sm text-ink-muted">Join with your team and start the quest</p>
          </button>

          <button
            onClick={() => setMode('volunteer')}
            className="flex-1 border border-cream-border rounded-2xl p-6 bg-white/60 hover:border-leaf hover:bg-leaf-bg transition-all text-center group"
          >
            <div className="w-14 h-14 rounded-full bg-leaf-bg flex items-center justify-center mx-auto mb-4 group-hover:bg-leaf/20 transition-colors">
              <Shield size={24} className="text-leaf" />
            </div>
            <h2 className="font-display text-xl text-ink mb-1">Volunteer</h2>
            <p className="font-body text-sm text-ink-muted">Enter scores and manage zones</p>
          </button>
        </div>
      )}

      {mode === 'participant' && (
        <div className="w-full max-w-sm space-y-4">
          <div>
            <label className="font-mono text-[11px] text-ink-muted uppercase mb-1 block">Team ID *</label>
            <input
              type="number"
              inputMode="numeric"
              value={teamId}
              onChange={e => setTeamId(e.target.value.replace(/\D/g, ''))}
              onKeyDown={e => e.key === 'Enter' && handleParticipantStart()}
              placeholder="e.g. 1"
              className="w-full bg-white border border-cream-border rounded-xl px-4 py-3 font-mono text-ink focus:outline-none focus:ring-2 focus:ring-leaf [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>
          <div>
            <label className="font-mono text-[11px] text-ink-muted uppercase mb-1 block">Team Name (optional)</label>
            <input
              value={teamName}
              onChange={e => setTeamName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleParticipantStart()}
              placeholder="e.g. Green Warriors"
              className="w-full bg-white border border-cream-border rounded-xl px-4 py-3 font-mono text-ink focus:outline-none focus:ring-2 focus:ring-leaf"
            />
          </div>
          <button
            onClick={handleParticipantStart}
            className="w-full bg-leaf text-white font-body font-medium py-3 rounded-full hover:bg-leaf/90 transition-colors mt-2"
          >
            Start Quest →
          </button>
        </div>
      )}

      {mode === 'volunteer' && (
        <div className="w-full max-w-sm space-y-4">
          <div>
            <label className="font-mono text-[11px] text-ink-muted uppercase mb-1 block">Volunteer PIN</label>
            <input
              type="password"
              value={pin}
              onChange={e => setPin(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleVolunteerUnlock()}
              placeholder="Enter PIN"
              className="w-full bg-white border border-cream-border rounded-xl px-4 py-3 font-mono text-ink text-center text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-leaf"
            />
          </div>
          <button
            onClick={handleVolunteerUnlock}
            className="w-full bg-leaf text-white font-body font-medium py-3 rounded-full hover:bg-leaf/90 transition-colors"
          >
            Unlock
          </button>
        </div>
      )}

      <button
        onClick={() => navigate('/')}
        className="mt-8 font-body text-sm text-ink-muted hover:text-ink transition-colors"
      >
        ← Back to home
      </button>
    </div>
  );
}
