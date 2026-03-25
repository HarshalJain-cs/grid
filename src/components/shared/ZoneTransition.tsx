import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ArrowRight, Trophy } from 'lucide-react';

interface ZoneTransitionProps {
  zoneName: string;
  score: number;
  maxScore: number;
  nextZonePath: string | null;
  nextZoneLabel: string;
  children?: React.ReactNode;
}

const ZONE_FLOW = [
  { key: 'trivia', label: 'Tech Trivia', path: '/trivia' },
  { key: 'zone2', label: 'Carbon Quest', path: '/zone2' },
  { key: 'zone3', label: 'Climate Decision', path: '/zone3' },
  { key: 'zone1', label: 'Power Puzzle', path: '/zone1' },
  { key: 'zone4', label: 'Eco Shards', path: '/zone4' },
];

export default function ZoneTransition({
  zoneName,
  score,
  maxScore,
  nextZonePath,
  nextZoneLabel,
  children,
}: ZoneTransitionProps) {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<'score' | 'ready'>('score');
  const [countedScore, setCountedScore] = useState(0);

  // Animate score counting up
  useEffect(() => {
    if (score === 0) {
      setCountedScore(0);
      return;
    }
    const duration = 1200;
    const steps = 30;
    const increment = score / steps;
    let current = 0;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      current = Math.min(Math.round(increment * step), score);
      setCountedScore(current);
      if (step >= steps) clearInterval(timer);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [score]);

  // Auto-advance to ready phase
  useEffect(() => {
    const t = setTimeout(() => setPhase('ready'), 2000);
    return () => clearTimeout(t);
  }, []);

  const tier =
    score >= 90 ? { label: 'Outstanding!', emoji: '🏆', color: 'text-yellow-500' } :
    score >= 70 ? { label: 'Great Job!', emoji: '⚡', color: 'text-leaf' } :
    score >= 50 ? { label: 'Well Done!', emoji: '💡', color: 'text-blue-500' } :
    { label: 'Keep Going!', emoji: '📚', color: 'text-ink-muted' };

  const currentIdx = ZONE_FLOW.findIndex(z => z.path === (nextZonePath ? undefined : ''));
  const completedCount = ZONE_FLOW.findIndex(z => z.path === nextZonePath);

  return (
    <div className="pt-20 pb-12 px-4 md:px-6 max-w-lg mx-auto text-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={phase}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          {/* Completion checkmark */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
            className="mb-6"
          >
            <div className="w-20 h-20 rounded-full bg-leaf/10 flex items-center justify-center mx-auto">
              <CheckCircle size={40} className="text-leaf" />
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="font-display text-3xl md:text-4xl text-ink mb-2"
          >
            {zoneName} Complete!
          </motion.h2>

          {/* Score display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, type: 'spring', stiffness: 150 }}
            className="mb-2"
          >
            <span className="font-mono text-5xl md:text-6xl text-leaf font-bold">
              {countedScore}
            </span>
            <span className="font-mono text-xl text-ink-muted">/{maxScore}</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className={`font-display text-xl ${tier.color} mb-6`}
          >
            {tier.emoji} {tier.label}
          </motion.p>

          {/* Extra details (breakdown etc.) */}
          {children && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mb-8"
            >
              {children}
            </motion.div>
          )}

          {/* Progress dots */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex items-center justify-center gap-1 mb-8"
          >
            {ZONE_FLOW.map((z, i) => {
              const isDone = nextZonePath ? i < ZONE_FLOW.findIndex(f => f.path === nextZonePath) : true;
              const isNext = z.path === nextZonePath;
              return (
                <div key={z.key} className="flex items-center">
                  {i > 0 && <div className="w-4 h-px bg-cream-border mx-0.5" />}
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono font-bold transition-all ${
                      isDone ? 'bg-leaf text-white' :
                      isNext ? 'border-2 border-leaf text-leaf animate-pulse' :
                      'border border-cream-border text-ink-muted'
                    }`}
                    title={z.label}
                  >
                    {isDone ? '✓' : z.label[0]}
                  </div>
                </div>
              );
            })}
          </motion.div>

          {/* Next zone button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
          >
            {nextZonePath ? (
              <button
                onClick={() => navigate(nextZonePath)}
                className="group bg-leaf text-white font-body font-medium px-8 py-3.5 rounded-full hover:bg-leaf/90 transition-all inline-flex items-center gap-2"
              >
                Next: {nextZoneLabel}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            ) : (
              <button
                onClick={() => navigate('/leaderboard')}
                className="group bg-leaf text-white font-body font-medium px-8 py-3.5 rounded-full hover:bg-leaf/90 transition-all inline-flex items-center gap-2"
              >
                <Trophy size={18} />
                View Leaderboard
              </button>
            )}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
