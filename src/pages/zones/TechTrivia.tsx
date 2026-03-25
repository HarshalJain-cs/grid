import { useState, useCallback, useMemo } from 'react';
import { useGame } from '@/store/gameStore';
import { useConvexLeaderboard } from '@/hooks/useConvexLeaderboard';
import TimerBar from '@/components/shared/TimerBar';
import ZoneTransition from '@/components/shared/ZoneTransition';
import { triviaQuestions } from '@/data/techTrivia';

export default function TechTrivia() {
  const { state, dispatch } = useGame();
  const { syncZoneScore } = useConvexLeaderboard();
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [finished, setFinished] = useState(false);

  // Shuffle options once per mount — store shuffled index arrays per question
  const shuffledIndices = useMemo(() =>
    triviaQuestions.map(q => {
      const indices = q.options.map((_, i) => i);
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }
      return indices;
    }), []);

  const submitQuiz = useCallback(async () => {
    if (finished) return;
    setFinished(true);
    const correct = triviaQuestions.reduce(
      (sum, q, i) => (answers[i] === q.correctIndex ? sum + 1 : sum), 0
    );
    const score = correct * 5;
    dispatch({ type: 'SET_ZONE_SCORE', zone: 'trivia', score });
    dispatch({ type: 'COMPLETE_ZONE', zone: 'trivia' });
    dispatch({ type: 'SUBMIT_TO_LEADERBOARD' });
    // Sync to Convex backend
    await syncZoneScore(state.teamId, state.teamName || state.teamId, 'trivia', score);
  }, [answers, finished, state.teamId, state.teamName, dispatch, syncZoneScore]);

  const correctCount = triviaQuestions.reduce(
    (sum, q, i) => (answers[i] === q.correctIndex ? sum + 1 : sum), 0
  );
  const score = correctCount * 5;

  if (finished) {
    return (
      <ZoneTransition
        zoneName="Tech Trivia"
        score={score}
        maxScore={100}
        nextZonePath="/zone2"
        nextZoneLabel="Carbon Quest"
      >
        <p className="font-body text-sm text-ink-muted">{correctCount} of {triviaQuestions.length} correct</p>
      </ZoneTransition>
    );
  }

  const q = triviaQuestions[currentQ];
  const shuffled = shuffledIndices[currentQ];
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="pt-20 pb-12 px-4 md:px-6 max-w-3xl mx-auto">
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="font-mono text-[11px] text-ink-muted uppercase tracking-widest">Tech Trivia</p>
          <h1 className="font-display text-4xl text-ink">Quick Fire</h1>
        </div>
      </div>

      <TimerBar onExpire={submitQuiz} />

      <div className="mt-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-[11px] text-ink-muted">Question {currentQ + 1} of {triviaQuestions.length}</span>
          <span className="font-mono text-[11px] text-ink-muted">{answeredCount} of {triviaQuestions.length} answered</span>
        </div>
        <div className="h-1.5 bg-cream-border rounded-full overflow-hidden">
          <div className="h-full bg-leaf rounded-full transition-all" style={{ width: `${((currentQ + 1) / triviaQuestions.length) * 100}%` }} />
        </div>
      </div>

      <div className="border border-cream-border rounded-2xl p-6 bg-white mb-6">
        <p className="font-body text-lg text-ink">{q.question}</p>
      </div>

      <div className="space-y-3 mb-6">
        {shuffled.map((origIdx, displayIdx) => {
          const opt = q.options[origIdx];
          const isSelected = answers[currentQ] === origIdx;
          return (
            <button key={origIdx} onClick={() => setAnswers(prev => ({ ...prev, [currentQ]: origIdx }))}
              className={`w-full text-left p-4 rounded-xl border transition-all ${isSelected ? 'bg-leaf-bg border-leaf text-ink' : 'border-cream-border text-ink hover:border-leaf/50 bg-white'}`}>
              <span className="font-mono text-xs mr-2">{String.fromCharCode(65 + displayIdx)})</span>
              <span className="font-body text-sm">{opt}</span>
            </button>
          );
        })}
      </div>

      <div className="flex gap-3">
        <button
          disabled={currentQ === 0}
          onClick={() => setCurrentQ(prev => prev - 1)}
          className="flex-1 border border-cream-border text-ink font-body font-medium py-3 rounded-full disabled:opacity-40 hover:bg-cream-alt transition-colors"
        >
          Previous
        </button>
        {currentQ < triviaQuestions.length - 1 ? (
          <button
            onClick={() => setCurrentQ(prev => prev + 1)}
            className="flex-1 bg-leaf text-white font-body font-medium py-3 rounded-full hover:bg-leaf/90 transition-colors"
          >
            Next
          </button>
        ) : (
          <button
            onClick={submitQuiz}
            className="flex-1 bg-leaf text-white font-body font-medium py-3 rounded-full hover:bg-leaf/90 transition-colors"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
}
