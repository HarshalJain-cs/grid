import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import VolunteerPanel from '@/components/shared/VolunteerPanel';
import { Timer, Zap, DollarSign, Leaf, ShieldAlert } from 'lucide-react';

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
          {/* Timer badge */}
          <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
            <Timer size={16} className="text-amber-600" />
            <p className="font-mono text-xs text-amber-700">Time Limit: 5 minutes — plan quickly, allocate wisely</p>
          </div>

          {/* Mission */}
          <div className="border border-cream-border rounded-2xl p-6 bg-white">
            <h3 className="font-display text-xl text-ink mb-3">Mission</h3>
            <p className="font-body text-sm text-ink-muted leading-relaxed">
              You will be provided with energy cards including <strong>Solar</strong>, <strong>Wind</strong>, <strong>Hydro</strong>, and <strong>Thermal</strong>, with three cards available for each type. You can combine these in any way to build your solution.
            </p>
          </div>

          {/* Energy Cards */}
          <div className="grid grid-cols-4 gap-2">
            {[
              { emoji: '☀️', label: 'Solar', count: 3 },
              { emoji: '💨', label: 'Wind', count: 3 },
              { emoji: '💧', label: 'Hydro', count: 3 },
              { emoji: '🔥', label: 'Thermal', count: 3 },
            ].map(c => (
              <div key={c.label} className="border border-cream-border rounded-xl p-3 text-center bg-white">
                <span className="text-2xl">{c.emoji}</span>
                <p className="font-mono text-xs text-ink mt-1">{c.label}</p>
                <p className="font-mono text-[10px] text-ink-muted">×{c.count}</p>
              </div>
            ))}
          </div>

          {/* Objective */}
          <div className="border border-cream-border rounded-2xl p-6 bg-white">
            <h3 className="font-display text-xl text-ink mb-3">Objective</h3>
            <p className="font-body text-sm text-ink-muted leading-relaxed mb-3">
              Your objective is to meet the required power demand while staying within the given budget and maintaining a low carbon score.
            </p>
            <p className="font-body text-sm text-ink-muted leading-relaxed">
              Once you satisfy all the base constraints, you must select one additional <strong>Constraint Card</strong> that introduces a new challenge. Successfully completing this will earn you extra points.
            </p>
          </div>

          {/* Sectors */}
          <div className="grid grid-cols-3 gap-3">
            {[{ emoji: '🏠', label: 'Residential' }, { emoji: '🏢', label: 'Commercial' }, { emoji: '🏭', label: 'Industrial' }].map(s => (
              <div key={s.label} className="border border-cream-border rounded-xl p-4 text-center bg-white">
                <span className="text-2xl">{s.emoji}</span>
                <p className="font-mono text-xs text-ink mt-2">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Rules */}
          <div className="space-y-3">
            <h3 className="font-display text-lg text-ink">Rules</h3>
            {[
              { icon: Zap, text: 'Meet ALL sector energy demands (Residential, Commercial, Industrial)' },
              { icon: DollarSign, text: 'Stay within the given budget — no overspending' },
              { icon: ShieldAlert, text: 'Satisfy your Constraint Card\'s special condition for bonus points' },
              { icon: Leaf, text: 'Minimize total carbon output — lower carbon = more points' },
            ].map((r, i) => (
              <div key={i} className="flex items-start gap-3 p-3 border border-cream-border rounded-xl bg-white">
                <div className="w-8 h-8 rounded-full bg-leaf-bg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <r.icon size={14} className="text-leaf" />
                </div>
                <p className="font-body text-sm text-ink-muted leading-relaxed">{r.text}</p>
              </div>
            ))}
            <p className="font-body text-xs text-amber-600 mt-3">⚠ Read your Constraint Card before planning. It changes one rule for your team.</p>
          </div>

          {/* Scoring */}
          <div className="border border-cream-border rounded-xl overflow-hidden">
            <div className="bg-cream-alt px-4 py-2 font-mono text-[11px] text-ink-muted uppercase">Scoring</div>
            {[['All demands met', '30 pts'], ['Within budget', '20 pts'], ['Constraint satisfied', '20 pts'], ['Carbon minimized', 'up to 30 pts']].map(([l, p]) => (
              <div key={l} className="flex justify-between px-4 py-2.5 border-t border-cream-border">
                <span className="font-body text-sm text-ink">{l}</span>
                <span className="font-mono text-sm text-leaf font-bold">{p}</span>
              </div>
            ))}
          </div>

          {/* Tips */}
          <div className="bg-leaf-bg border border-leaf/20 rounded-xl p-5">
            <h3 className="font-display text-lg text-ink mb-3">Tips & Strategy</h3>
            <div className="space-y-2">
              {[
                'Start by calculating the total demand across all 3 sectors',
                'Solar and Wind have zero carbon — prioritize them when possible',
                'Thermal is cheap but has high carbon — use sparingly',
                'Read your Constraint Card FIRST — it may change your entire strategy',
                'Don\'t forget: meeting all demands is worth the most points (30)',
                'Leftover budget doesn\'t earn extra — spend it wisely on low-carbon options',
              ].map((tip, i) => (
                <p key={i} className="font-body text-sm text-ink-muted">
                  <span className="font-mono text-leaf mr-2">→</span>{tip}
                </p>
              ))}
            </div>
          </div>

          {/* Motivation */}
          <div className="text-center py-6">
            <p className="font-display text-2xl text-ink mb-2">Power up. Stay green.</p>
            <p className="font-body text-sm text-ink-muted">Balance is everything — meet demand, stay on budget, and keep carbon low!</p>
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
