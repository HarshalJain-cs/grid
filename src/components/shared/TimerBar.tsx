import { useState, useEffect, useCallback } from 'react';

interface TimerBarProps {
  durationSeconds?: number;
  onExpire: () => void;
  paused?: boolean;
}

export default function TimerBar({ durationSeconds = 300, onExpire, paused = false }: TimerBarProps) {
  const [remaining, setRemaining] = useState(durationSeconds);

  useEffect(() => {
    if (paused || remaining <= 0) return;
    const id = setInterval(() => {
      setRemaining(prev => {
        if (prev <= 1) {
          clearInterval(id);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [paused, remaining]);

  const stableOnExpire = useCallback(onExpire, [onExpire]);

  useEffect(() => {
    if (remaining === 0) stableOnExpire();
  }, [remaining, stableOnExpire]);

  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  const pct = (remaining / durationSeconds) * 100;
  const isWarning = remaining <= 120 && remaining > 30;
  const isDanger = remaining <= 30;

  return (
    <div className="flex items-center gap-3">
      <span className={`font-mono text-2xl font-bold ${isDanger ? 'text-red-400 animate-pulse' : isWarning ? 'text-yellow-400' : 'text-zone-accent'}`}>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
      <div className="flex-1 h-1.5 bg-zone-muted/20 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ${isDanger ? 'bg-red-400' : isWarning ? 'bg-yellow-400' : 'bg-zone-accent'}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
