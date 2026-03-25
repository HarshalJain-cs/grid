import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '@/store/gameStore';
import TimerBar from '@/components/shared/TimerBar';
import { triviaQuestions } from '@/data/techTrivia';

export default function TechTrivia() {
  const navigate = useNavigate();
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
        // Will finish with updated correctCount via the effect
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
      <div className="pt-20 pb-12 px-4 md:px-6 max-w-3xl mx-auto text-center">
        <h2 className="font-display text-4xl text-zone-fg mb-4">Tech Trivia Complete!</h2>
        <p className="font-mono text-5xl text-zone-accent font-bold mb-2">{score}/100</p>
        <p className="font-display text-2xl text-zone-fg mb-8">{tier}</p>
        <p className="font-body text-sm text-zone-muted mb-8">{correctCount} of {triviaQuestions.length} correct</p>
        <button onClick={() => navigate('/leaderboard')} className="bg-zone-accent text-zone-bg font-body font-medium px-8 py-3 rounded-full">
          View Leaderboard →
        </button>
      </div>
    );
  }

  const q = triviaQuestions[currentQ];

  return (
    <div className="pt-20 pb-12 px-4 md:px-6 max-w-3xl mx-auto">
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="font-mono text-[11px] text-zone-muted uppercase tracking-widest">Tech Trivia</p>
          <h1 className="font-display text-4xl text-zone-fg">Quick Fire</h1>
        </div>
      </div>

      <TimerBar onExpire={finishGame} />

      <div className="mt-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-[11px] text-zone-muted">Question {currentQ + 1} of {triviaQuestions.length}</span>
          <span className="font-mono text-[11px] text-zone-accent">{correctCount} correct</span>
        </div>
        <div className="h-1.5 bg-zone-muted/20 rounded-full overflow-hidden">
          <div className="h-full bg-zone-accent rounded-full transition-all" style={{ width: `${((currentQ + 1) / triviaQuestions.length) * 100}%` }} />
        </div>
      </div>

      <div className="border border-zone-accent/20 rounded-2xl p-6 bg-zone-bg2/50 mb-6">
        <p className="font-body text-lg text-zone-fg">{q.question}</p>
      </div>

      <div className="space-y-3">
        {q.options.map((opt, j) => {
          let cls = 'border-zone-accent/20 text-zone-fg hover:border-zone-accent/50';
          if (showFeedback) {
            if (j === q.correctIndex) cls = 'bg-green-500/20 border-green-500 text-green-300';
            else if (j === selected) cls = 'bg-red-500/20 border-red-500 text-red-300';
          } else if (selected === j) {
            cls = 'bg-zone-accent/10 border-zone-accent';
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
