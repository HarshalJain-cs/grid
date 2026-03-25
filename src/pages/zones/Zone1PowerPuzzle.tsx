import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import VolunteerPanel from '@/components/shared/VolunteerPanel';

export default function Zone1PowerPuzzle() {
  return (
    <div className="pt-20 pb-12 px-4 md:px-6 max-w-3xl mx-auto">
      <div className="mb-6">
        <p className="font-mono text-[11px] text-ink-muted uppercase tracking-widest">Zone 01</p>
        <h1 className="font-display text-4xl md:text-5xl text-ink">Power Puzzle</h1>
        <span className="inline-block font-mono text-[11px] bg-amber-100 text-amber-700 px-3 py-1 rounded-full mt-3">PHYSICAL ROUND · 5 MINUTES</span>
      </div>

      <Tabs defaultValue="rules">
        <TabsList className="bg-cream-alt border border-cream-border">
          <TabsTrigger value="rules" className="data-[state=active]:bg-leaf data-[state=active]:text-white font-mono text-xs">Participant Rules</TabsTrigger>
          <TabsTrigger value="volunteer" className="data-[state=active]:bg-leaf data-[state=active]:text-white font-mono text-xs">Volunteer Entry</TabsTrigger>
        </TabsList>

        <TabsContent value="rules" className="mt-6 space-y-6">
          <div className="border border-cream-border rounded-2xl p-6 bg-white">
            <h3 className="font-display text-xl text-ink mb-3">Mission</h3>
            <p className="font-body text-sm text-ink-muted leading-relaxed">
              You've received Energy Source Cards with Power, Cost, and Carbon values. Allocate them across 3 sectors to meet all demands.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[{ emoji: '🏠', label: 'Residential' }, { emoji: '🏢', label: 'Commercial' }, { emoji: '🏭', label: 'Industrial' }].map(s => (
              <div key={s.label} className="border border-cream-border rounded-xl p-4 text-center bg-white">
                <span className="text-2xl">{s.emoji}</span>
                <p className="font-mono text-xs text-ink mt-2">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <h3 className="font-display text-lg text-ink">Rules</h3>
            {['Meet ALL sector energy demands', 'Stay within the given budget', "Satisfy your Constraint Card's special condition", 'Minimize total carbon output'].map((r, i) => (
              <p key={i} className="font-body text-sm text-ink-muted">
                <span className="font-mono text-leaf mr-2">{i + 1}.</span>{r}
              </p>
            ))}
            <p className="font-body text-xs text-amber-600 mt-3">⚠ Read your Constraint Card before planning. It changes one rule for your team.</p>
          </div>

          <div className="border border-cream-border rounded-xl overflow-hidden">
            <div className="bg-cream-alt px-4 py-2 font-mono text-[11px] text-ink-muted uppercase">Scoring</div>
            {[['All demands met', '30 pts'], ['Within budget', '20 pts'], ['Constraint satisfied', '20 pts'], ['Carbon minimized', 'up to 30 pts']].map(([l, p]) => (
              <div key={l} className="flex justify-between px-4 py-2.5 border-t border-cream-border">
                <span className="font-body text-sm text-ink">{l}</span>
                <span className="font-mono text-sm text-leaf font-bold">{p}</span>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="volunteer" className="mt-6">
          <VolunteerPanel zone="zone1" judgingCriteria={[
            { label: 'All demands met', points: '30 pts' },
            { label: 'Within budget', points: '20 pts' },
            { label: 'Constraint satisfied', points: '20 pts' },
            { label: 'Carbon minimized', points: 'up to 30 pts' },
          ]} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
