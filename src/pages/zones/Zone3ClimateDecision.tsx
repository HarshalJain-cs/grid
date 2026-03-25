import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '@/store/gameStore';
import TimerBar from '@/components/shared/TimerBar';
import { climateScenarios } from '@/data/zone3Data';

export default function Zone3ClimateDecision() {
  const navigate = useNavigate();
  const { dispatch } = useGame();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleSubmit = useCallback(() => {
    if (showResults) return;
    const total = climateScenarios.reduce((sum, s, i) => {
      const chosen = answers[i];
      return sum + (chosen !== undefined ? s.options[chosen].score : 0);
    }, 0);
    dispatch({ type: 'SET_ZONE_SCORE', zone: 'zone3', score: Math.min(total, 100) });
    dispatch({ type: 'COMPLETE_ZONE', zone: 'zone3' });
    dispatch({ type: 'SUBMIT_TO_LEADERBOARD' });
    setShowResults(true);
  }, [answers, showResults]);

  const scenario = climateScenarios[currentIdx];

  if (showResults) {
    const total = climateScenarios.reduce((sum, s, i) => sum + (answers[i] !== undefined ? s.options[answers[i]].score : 0), 0);
    return (
      <div className="pt-20 pb-12 px-4 md:px-6 max-w-3xl mx-auto">
        <h2 className="font-display text-3xl text-ink mb-6 text-center">Zone 3 Complete!</h2>
        <div className="space-y-4 mb-8">
          {climateScenarios.map((s, i) => (
            <div key={i} className="border border-cream-border rounded-xl p-4 bg-white">
              <p className="font-display text-base text-ink mb-1">{s.title}</p>
              <p className="font-body text-xs text-ink-muted mb-2">
                Your choice: {answers[i] !== undefined ? s.options[answers[i]].text : 'Not answered'}
              </p>
              <p className="font-mono text-sm text-leaf">{answers[i] !== undefined ? s.options[answers[i]].score : 0}/20 pts</p>
            </div>
          ))}
        </div>
        <div className="text-center space-y-4">
          <p className="font-mono text-2xl text-leaf font-bold">{Math.min(total, 100)}/100</p>
          <button onClick={() => navigate('/zone1')} className="bg-leaf text-white font-body font-medium px-8 py-3 rounded-full">
            Next: Zone 1 →
          </button>
        </div>
      </div>
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

      <button
        disabled={answers[currentIdx] === undefined}
        onClick={() => currentIdx < 4 ? setCurrentIdx(currentIdx + 1) : handleSubmit()}
        className="w-full bg-leaf text-white font-body font-medium py-3 rounded-full disabled:opacity-40">
        {currentIdx < 4 ? 'Next Scenario →' : 'Submit Zone 3 →'}
      </button>
    </div>
  );
}
