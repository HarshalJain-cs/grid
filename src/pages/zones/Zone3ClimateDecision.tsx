import { useState, useCallback } from 'react';
import { useGame } from '@/store/gameStore';
import { useConvexLeaderboard } from '@/hooks/useConvexLeaderboard';
import TimerBar from '@/components/shared/TimerBar';
import ZoneTransition from '@/components/shared/ZoneTransition';
import { climateScenarios } from '@/data/zone3Data';

export default function Zone3ClimateDecision() {
  const { state, dispatch } = useGame();
  const { syncZoneScore } = useConvexLeaderboard();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleSubmit = useCallback(async () => {
    if (showResults) return;
    const total = climateScenarios.reduce((sum, s, i) => {
      const chosen = answers[i];
      return sum + (chosen !== undefined ? s.options[chosen].score : 0);
    }, 0);
    const score = Math.min(total, 100);
    dispatch({ type: 'SET_ZONE_SCORE', zone: 'zone3', score });
    dispatch({ type: 'COMPLETE_ZONE', zone: 'zone3' });
    dispatch({ type: 'SUBMIT_TO_LEADERBOARD' });
    setShowResults(true);
    // Sync to Convex backend
    await syncZoneScore(state.teamId, state.teamName || state.teamId, 'zone3', score);
  }, [answers, showResults, state.teamId, state.teamName, dispatch, syncZoneScore]);

  const scenario = climateScenarios[currentIdx];

  if (showResults) {
    const total = climateScenarios.reduce((sum, s, i) => sum + (answers[i] !== undefined ? s.options[answers[i]].score : 0), 0);
    return (
      <ZoneTransition
        zoneName="Climate Decision"
        score={Math.min(total, 100)}
        maxScore={100}
        nextZonePath="/zone1"
        nextZoneLabel="Power Puzzle"
      >
        <div className="space-y-3 text-left">
          {climateScenarios.map((s, i) => (
            <div key={i} className="border border-cream-border rounded-xl p-4 bg-white">
              <p className="font-display text-base text-ink mb-1">{s.title}</p>
              <p className="font-body text-xs text-ink-muted">
                Your choice: {answers[i] !== undefined ? s.options[answers[i]].text : 'Not answered'}
              </p>
            </div>
          ))}
        </div>
      </ZoneTransition>
    );
  }

  return (
    <div className="pt-20 pb-12 px-4 md:px-6 max-w-3xl mx-auto">
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="font-mono text-[11px] text-ink-muted uppercase tracking-widest">Zone 03</p>
          <h1 className="font-display text-4xl text-ink">Climate Decision Room</h1>
        </div>
      </div>

      <TimerBar onExpire={handleSubmit} />

      <div className="mt-4 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-mono text-[11px] text-ink-muted">Scenario {currentIdx + 1} of 5</span>
        </div>
        <div className="h-1.5 bg-cream-border rounded-full overflow-hidden">
          <div className="h-full bg-leaf rounded-full transition-all" style={{ width: `${((currentIdx + 1) / 5) * 100}%` }} />
        </div>
      </div>

      <div className="border border-cream-border rounded-2xl p-6 bg-white mb-6">
        <h3 className="font-display text-xl text-ink mb-2">{scenario.title}</h3>
        <p className="font-body text-sm text-ink-muted leading-relaxed">{scenario.description}</p>
      </div>

      <div className="space-y-3 mb-6">
        {scenario.options.map((opt, j) => (
          <button key={j} onClick={() => setAnswers(p => ({ ...p, [currentIdx]: j }))}
            className={`w-full text-left p-4 rounded-xl border transition-all ${answers[currentIdx] === j ? 'bg-leaf-bg border-leaf' : 'border-cream-border hover:border-leaf/50 bg-white'}`}>
            <p className="font-body text-sm text-ink mb-1">{String.fromCharCode(65 + j)}) {opt.text}</p>
            <p className="font-mono text-[11px] text-ink-muted">{opt.tags}</p>
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          disabled={currentIdx === 0}
          onClick={() => setCurrentIdx(prev => prev - 1)}
          className="flex-1 border border-cream-border text-ink font-body font-medium py-3 rounded-full disabled:opacity-40 hover:bg-cream-alt transition-colors"
        >
          Previous
        </button>
        <button
          disabled={answers[currentIdx] === undefined}
          onClick={() => currentIdx < 4 ? setCurrentIdx(currentIdx + 1) : handleSubmit()}
          className="flex-1 bg-leaf text-white font-body font-medium py-3 rounded-full disabled:opacity-40 hover:bg-leaf/90 transition-colors"
        >
          {currentIdx < 4 ? 'Next' : 'Submit Zone 3'}
        </button>
      </div>
    </div>
  );
}
