import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import VolunteerPanel from '@/components/shared/VolunteerPanel';
import { greenSketchWords } from '@/data/zone4Words';

function scoreFromGuesses(guesses: number): number {
  if (guesses >= 10) return 100;
  if (guesses >= 7) return 65;
  if (guesses >= 4) return 40;
  if (guesses >= 1) return 20;
  return 0;
}

export default function Zone4GreenSketch() {
  const [revealed, setRevealed] = useState(false);
  const [usedWords, setUsedWords] = useState<Set<string>>(new Set());

  return (
    <div className="pt-20 pb-12 px-4 md:px-6 max-w-3xl mx-auto">
      <div className="mb-6">
        <p className="font-mono text-[11px] text-zone-muted uppercase tracking-widest">Zone 04</p>
        <h1 className="font-display text-4xl md:text-5xl text-zone-fg">GreenSketch</h1>
        <span className="inline-block font-mono text-[11px] bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full mt-3">PHYSICAL ROUND · 5 MINUTES</span>
      </div>

      <Tabs defaultValue="rules">
        <TabsList className="bg-zone-bg2 border border-zone-accent/10">
          <TabsTrigger value="rules" className="data-[state=active]:bg-zone-accent data-[state=active]:text-zone-bg font-mono text-xs">Rules</TabsTrigger>
          <TabsTrigger value="words" className="data-[state=active]:bg-zone-accent data-[state=active]:text-zone-bg font-mono text-xs">Word Cards</TabsTrigger>
          <TabsTrigger value="volunteer" className="data-[state=active]:bg-zone-accent data-[state=active]:text-zone-bg font-mono text-xs">Volunteer</TabsTrigger>
        </TabsList>

        <TabsContent value="rules" className="mt-6 space-y-6">
          <div className="space-y-2">
            {['One teammate draws or acts — other guesses', 'No speaking, spelling, or pointing at letters', 'Pass a word = lose it permanently', 'Maximize correct guesses in 5 minutes'].map((r, i) => (
              <p key={i} className="font-body text-sm text-zone-muted">
                <span className="font-mono text-zone-accent mr-2">{i + 1}.</span>{r}
              </p>
            ))}
          </div>
          <div className="border border-zone-accent/20 rounded-xl overflow-hidden">
            <div className="bg-zone-bg2 px-4 py-2 font-mono text-[11px] text-zone-muted uppercase">Scoring</div>
            {[['1–3 correct', '20 pts'], ['4–6 correct', '40 pts'], ['7–9 correct', '65 pts'], ['10+ correct', '100 pts']].map(([l, p]) => (
              <div key={l} className="flex justify-between px-4 py-2.5 border-t border-zone-accent/10">
                <span className="font-body text-sm text-zone-fg">{l}</span>
                <span className="font-mono text-sm text-zone-accent font-bold">{p}</span>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="words" className="mt-6">
          {!revealed ? (
            <div className="text-center py-12">
              <button onClick={() => setRevealed(true)} className="bg-zone-accent text-zone-bg font-body font-medium px-8 py-3 rounded-full">
                Reveal Words
              </button>
            </div>
          ) : (
            <>
              <div className="flex flex-wrap gap-2 mb-6">
                {greenSketchWords.map(w => (
                  <button key={w} onClick={() => setUsedWords(prev => { const n = new Set(prev); n.has(w) ? n.delete(w) : n.add(w); return n; })}
                    className={`px-4 py-2.5 rounded-xl font-mono text-[13px] border border-zone-accent/20 transition-all ${usedWords.has(w) ? 'opacity-40 line-through' : 'text-zone-fg'}`}>
                    {w}
                  </button>
                ))}
              </div>
              <button onClick={() => setUsedWords(new Set())} className="font-mono text-xs text-zone-muted hover:text-zone-accent">Reset All</button>
            </>
          )}
        </TabsContent>

        <TabsContent value="volunteer" className="mt-6">
          <VolunteerPanel zone="zone4" showGuesses scoreFromGuesses={scoreFromGuesses} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
