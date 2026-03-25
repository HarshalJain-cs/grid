import { useState, useEffect, useCallback } from 'react';
import { useGame } from '@/store/gameStore';
import TimerBar from '@/components/shared/TimerBar';
import ZoneTransition from '@/components/shared/ZoneTransition';
import { triviaQuestions } from '@/data/techTrivia';
import { triviaQuestions } from '@/data/techTrivia';

export default function TechTrivia() {
  const { dispatch } = useGame();
  const [currentQ, setCurrentQ] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [finished, setFinished] = useState(false);

  const finishGame = useCallback(() => {
    if (finished) return;
    setFinished(true);
    const score = correctCount * 5;
    dispatch({ type: 'SET_ZONE_SCORE', zone: 'trivia', score });
    dispatch({ type: 'COMPLETE_ZONE', zone: 'trivia' });
    dispatch({ type: 'SUBMIT_TO_LEADERBOARD' });
  }, [correctCount, finished]);

  const handleSelect = (idx: number) => {
    if (showFeedback) return;
    setSelected(idx);
    setShowFeedback(true);
    const isCorrect = idx === triviaQuestions[currentQ].correctIndex;
    if (isCorrect) setCorrectCount(prev => prev + 1);

    setTimeout(() => {
      if (currentQ < triviaQuestions.length - 1) {
        setCurrentQ(prev => prev + 1);
        setSelected(null);
        setShowFeedback(false);
      } else {
        setFinished(true);
      }
    }, 1500);
  };

  useEffect(() => {
    if (finished) {
      const score = correctCount * 5;
      dispatch({ type: 'SET_ZONE_SCORE', zone: 'trivia', score });
      dispatch({ type: 'COMPLETE_ZONE', zone: 'trivia' });
      dispatch({ type: 'SUBMIT_TO_LEADERBOARD' });
    }
  }, [finished]);

  const score = correctCount * 5;
  const tier = score >= 90 ? 'Tech Genius! 🏆' : score >= 70 ? 'Tech Savvy! ⚡' : score >= 50 ? 'Getting There 💡' : 'Keep Learning 📚';

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

  return (
    <div className="pt-20 pb-12 px-4 md:px-6 max-w-3xl mx-auto">
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="font-mono text-[11px] text-ink-muted uppercase tracking-widest">Tech Trivia</p>
          <h1 className="font-display text-4xl text-ink">Quick Fire</h1>
        </div>
      </div>

      <TimerBar onExpire={finishGame} />

      <div className="mt-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-[11px] text-ink-muted">Question {currentQ + 1} of {triviaQuestions.length}</span>
          <span className="font-mono text-[11px] text-leaf">{correctCount} correct</span>
        </div>
        <div className="h-1.5 bg-cream-border rounded-full overflow-hidden">
          <div className="h-full bg-leaf rounded-full transition-all" style={{ width: `${((currentQ + 1) / triviaQuestions.length) * 100}%` }} />
        </div>
      </div>

      <div className="border border-cream-border rounded-2xl p-6 bg-white mb-6">
        <p className="font-body text-lg text-ink">{q.question}</p>
      </div>

      <div className="space-y-3">
        {q.options.map((opt, j) => {
          let cls = 'border-cream-border text-ink hover:border-leaf/50 bg-white';
          if (showFeedback) {
            if (j === q.correctIndex) cls = 'bg-green-50 border-green-500 text-green-800';
            else if (j === selected) cls = 'bg-red-50 border-red-500 text-red-800';
          } else if (selected === j) {
            cls = 'bg-leaf-bg border-leaf text-ink';
          }
          return (
            <button key={j} onClick={() => handleSelect(j)} disabled={showFeedback}
              className={`w-full text-left p-4 rounded-xl border transition-all ${cls}`}>
              <span className="font-mono text-xs mr-2">{String.fromCharCode(65 + j)})</span>
              <span className="font-body text-sm">{opt}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
