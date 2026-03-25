import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '@/store/gameStore';
import TimerBar from '@/components/shared/TimerBar';
import { lifestyleQuestions, campusUpgrades, comboBonuses, riddles } from '@/data/zone2Data';

type Section = 'lifestyle' | 'optimize' | 'campus' | 'riddles' | 'results';

export default function Zone2CarbonQuest() {
  const navigate = useNavigate();
  const { dispatch } = useGame();
  const [section, setSection] = useState<Section>('lifestyle');
  const [initialAnswers, setInitialAnswers] = useState<Record<string, number>>({});
  const [optimizedAnswers, setOptimizedAnswers] = useState<Record<string, number>>({});
  const [selectedUpgrades, setSelectedUpgrades] = useState<Set<string>>(new Set());
  const [riddleAnswers, setRiddleAnswers] = useState<Record<number, number>>({});
  const [scores, setScores] = useState({ s1: 0, s2: 0, s3: 0 });
  const [submitted, setSubmitted] = useState(false);

  const allInitialAnswered = lifestyleQuestions.every(q => initialAnswers[q.id] !== undefined);
  const initialTotal = Object.values(initialAnswers).reduce((a, b) => a + b, 0);
  const optimizedTotal = Object.values(optimizedAnswers).reduce((a, b) => a + b, 0);
  const reduction = initialTotal - optimizedTotal;

  const calcSection1 = () => {
    if (reduction <= 0) return 0;
    if (reduction <= 3) return 10;
    if (reduction <= 7) return 20;
    if (reduction <= 12) return 30;
    return 15; // unrealistic penalty
  };

  const totalCost = Array.from(selectedUpgrades).reduce((sum, name) => {
    const u = campusUpgrades.find(x => x.name === name);
    return sum + (u?.cost || 0);
  }, 0);

  const totalImpact = Array.from(selectedUpgrades).reduce((sum, name) => {
    const u = campusUpgrades.find(x => x.name === name);
    return sum + (u?.impact || 0);
  }, 0);

  const activeComboBonus = comboBonuses.reduce((sum, cb) => {
    return cb.items.every(item => selectedUpgrades.has(item)) ? sum + cb.bonus : sum;
  }, 0);

  const calcSection2 = () => {
    if (totalCost > 100) return 0;
    const exactBonus = totalCost === 100 ? 5 : 0;
    return Math.min(totalImpact + activeComboBonus + exactBonus, 45);
  };

  const calcSection3 = () => riddles.reduce((sum, r, i) => riddleAnswers[i] === r.correctIndex ? sum + r.points : sum, 0);

  const handleSubmit = useCallback(() => {
    if (submitted) return;
    setSubmitted(true);
    const s1 = calcSection1();
    const s2 = calcSection2();
    const s3 = calcSection3();
    const total = Math.min(s1 + s2 + s3, 100);
    setScores({ s1, s2, s3 });
    dispatch({ type: 'SET_ZONE_SCORE', zone: 'zone2', score: total });
    dispatch({ type: 'COMPLETE_ZONE', zone: 'zone2' });
    dispatch({ type: 'SUBMIT_TO_LEADERBOARD' });
    setSection('results');
  }, [submitted, initialAnswers, optimizedAnswers, selectedUpgrades, riddleAnswers]);

  const sectionIdx = { lifestyle: 1, optimize: 1, campus: 2, riddles: 3, results: 3 }[section];

  return (
    <div className="pt-20 pb-12 px-4 md:px-6 max-w-3xl mx-auto">
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="font-mono text-[11px] text-zone-muted uppercase tracking-widest">Zone 02</p>
          <h1 className="font-display text-4xl text-zone-fg">Carbon Quest</h1>
          <div className="flex gap-2 mt-2">
            {[1, 2, 3].map(i => (
              <div key={i} className={`w-2 h-2 rounded-full ${i < sectionIdx ? 'bg-zone-accent' : i === sectionIdx ? 'bg-zone-accent animate-pulse-glow' : 'bg-zone-muted/30'}`} />
            ))}
            <span className="font-mono text-[11px] text-zone-muted ml-1">Section {sectionIdx} of 3</span>
          </div>
        </div>
      </div>

      {section !== 'results' && <TimerBar onExpire={handleSubmit} />}

      {section === 'lifestyle' && (
        <div className="mt-6 space-y-6">
          <div className="bg-zone-accent/10 border border-zone-accent/20 rounded-xl p-4">
            <p className="font-display text-lg text-zone-fg mb-1">Section 1: Track & Reduce Your Footprint</p>
            <p className="font-body text-sm text-zone-muted">Select options that best represent your CURRENT lifestyle.</p>
            <p className="font-body text-xs text-amber-300 mt-2">⚠ Think practically, not ideally. Extreme improvements will reduce your score.</p>
          </div>
          {lifestyleQuestions.map(q => (
            <div key={q.id}>
              <p className="font-body text-sm text-zone-fg mb-2">{q.label}</p>
              <div className="flex flex-wrap gap-2">
                {q.options.map(o => (
                  <button key={o.value} onClick={() => setInitialAnswers(p => ({ ...p, [q.id]: o.value }))}
                    className={`px-3 py-2 rounded-xl font-mono text-xs border transition-all ${initialAnswers[q.id] === o.value ? 'bg-zone-accent text-zone-bg border-zone-accent' : 'border-zone-accent/20 text-zone-muted hover:border-zone-accent/50'}`}>
                    {o.text}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <p className="font-mono text-sm text-zone-accent">Current footprint score: {initialTotal} / 40</p>
          <button disabled={!allInitialAnswered} onClick={() => { setOptimizedAnswers({ ...initialAnswers }); setSection('optimize'); }}
            className="w-full bg-zone-accent text-zone-bg font-body font-medium py-3 rounded-full disabled:opacity-40">Next: Optimize →</button>
        </div>
      )}

      {section === 'optimize' && (
        <div className="mt-6 space-y-6">
          <div className="bg-zone-accent/10 border border-zone-accent/20 rounded-xl p-4">
            <p className="font-display text-lg text-zone-fg mb-1">Now — how would you realistically improve?</p>
            <p className="font-body text-xs text-amber-300">⚠ Changing more than 2 steps on any single question triggers a penalty.</p>
          </div>
          {lifestyleQuestions.map(q => (
            <div key={q.id}>
              <p className="font-body text-sm text-zone-fg mb-2">{q.label}</p>
              <div className="flex flex-wrap gap-2">
                {q.options.map(o => (
                  <button key={o.value} onClick={() => setOptimizedAnswers(p => ({ ...p, [q.id]: o.value }))}
                    className={`px-3 py-2 rounded-xl font-mono text-xs border transition-all ${optimizedAnswers[q.id] === o.value ? 'bg-zone-accent text-zone-bg border-zone-accent' : 'border-zone-accent/20 text-zone-muted hover:border-zone-accent/50'}`}>
                    {o.text}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <p className="font-mono text-sm text-zone-accent">Carbon Reduction: -{reduction > 0 ? reduction : 0} pts</p>
          <button onClick={() => setSection('campus')} className="w-full bg-zone-accent text-zone-bg font-body font-medium py-3 rounded-full">Next: Campus Upgrade →</button>
        </div>
      )}

      {section === 'campus' && (
        <div className="mt-6 space-y-6">
          <div className="bg-zone-accent/10 border border-zone-accent/20 rounded-xl p-4">
            <p className="font-display text-lg text-zone-fg mb-1">Section 2: Upgrade the Campus</p>
            <p className="font-body text-sm text-zone-muted">Budget: ₹100. Select upgrades.</p>
            <p className="font-body text-xs text-amber-300 mt-1">⚠ Choosing too many reduces overall efficiency.</p>
          </div>
          <div className="flex gap-6 font-mono text-sm">
            <span className={totalCost > 100 ? 'text-red-400' : 'text-zone-accent'}>Budget: ₹{totalCost}/₹100</span>
            <span className="text-zone-accent">Impact: {totalImpact} pts</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {campusUpgrades.map(u => {
              const selected = selectedUpgrades.has(u.name);
              return (
                <button key={u.name} onClick={() => setSelectedUpgrades(prev => { const n = new Set(prev); n.has(u.name) ? n.delete(u.name) : n.add(u.name); return n; })}
                  className={`text-left p-4 rounded-xl border transition-all ${selected ? 'bg-zone-accent/10 border-zone-accent' : 'border-zone-accent/20 hover:border-zone-accent/50'}`}>
                  <p className="font-body text-sm text-zone-fg">{u.emoji} {u.name}</p>
                  <p className="font-mono text-xs text-zone-muted mt-1">₹{u.cost} · {u.impact} pts</p>
                </button>
              );
            })}
          </div>
          <div className="space-y-2">
            <p className="font-mono text-[11px] text-zone-muted uppercase">Combo Bonuses</p>
            {comboBonuses.map(cb => {
              const active = cb.items.every(item => selectedUpgrades.has(item));
              return (
                <div key={cb.label} className={`p-3 rounded-xl border ${active ? 'bg-zone-accent/10 border-zone-accent' : 'border-zone-accent/10'}`}>
                  <p className="font-mono text-xs text-zone-fg">{cb.emoji} {cb.label} = +{cb.bonus} pts</p>
                </div>
              );
            })}
          </div>
          <button onClick={() => setSection('riddles')} className="w-full bg-zone-accent text-zone-bg font-body font-medium py-3 rounded-full">Next: Riddles →</button>
        </div>
      )}

      {section === 'riddles' && (
        <div className="mt-6 space-y-6">
          <div className="bg-zone-accent/10 border border-zone-accent/20 rounded-xl p-4">
            <p className="font-display text-lg text-zone-fg mb-1">Section 3: Sustainability Riddles</p>
            <p className="font-body text-sm text-zone-muted">3 riddles. Think carefully.</p>
          </div>
          {riddles.map((r, i) => (
            <div key={i} className="space-y-2">
              <p className="font-body text-sm text-zone-fg italic">"{r.question}"</p>
              <div className="flex flex-wrap gap-2">
                {r.options.map((o, j) => (
                  <button key={j} onClick={() => setRiddleAnswers(p => ({ ...p, [i]: j }))}
                    className={`px-3 py-2 rounded-xl font-mono text-xs border transition-all ${riddleAnswers[i] === j ? 'bg-zone-accent text-zone-bg border-zone-accent' : 'border-zone-accent/20 text-zone-muted hover:border-zone-accent/50'}`}>
                    {o}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <button onClick={handleSubmit} className="w-full bg-zone-accent text-zone-bg font-body font-medium py-3 rounded-full">Submit Zone 2 →</button>
        </div>
      )}

      {section === 'results' && (
        <div className="mt-6 text-center space-y-6">
          <h2 className="font-display text-3xl text-zone-fg">Zone 2 Complete!</h2>
          <div className="border border-zone-accent/20 rounded-2xl p-6 bg-zone-bg2/50 space-y-3">
            {[['Lifestyle', scores.s1, 30], ['Campus', scores.s2, 45], ['Riddles', scores.s3, 30]].map(([label, score, max]) => (
              <div key={String(label)} className="flex justify-between">
                <span className="font-body text-sm text-zone-muted">{String(label)}</span>
                <span className="font-mono text-sm text-zone-accent">{String(score)}/{String(max)}</span>
              </div>
            ))}
            <div className="border-t border-zone-accent/20 pt-3 flex justify-between">
              <span className="font-body text-base text-zone-fg font-medium">Total</span>
              <span className="font-mono text-lg text-zone-accent font-bold">{Math.min(scores.s1 + scores.s2 + scores.s3, 100)}/100</span>
            </div>
          </div>
          <button onClick={() => navigate('/zone3')} className="bg-zone-accent text-zone-bg font-body font-medium px-8 py-3 rounded-full">
            Next: Zone 3 →
          </button>
        </div>
      )}
    </div>
  );
}
