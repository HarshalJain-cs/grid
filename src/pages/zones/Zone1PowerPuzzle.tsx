import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import VolunteerPanel from '@/components/shared/VolunteerPanel';

export default function Zone1PowerPuzzle() {
  return (
    <div className="pt-20 pb-12 px-4 md:px-6 max-w-3xl mx-auto">
      <div className="mb-6">
        <p className="font-mono text-[11px] text-zone-muted uppercase tracking-widest">Zone 01</p>
        <h1 className="font-display text-4xl md:text-5xl text-zone-fg">Power Puzzle</h1>
        <span className="inline-block font-mono text-[11px] bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full mt-3">PHYSICAL ROUND · 5 MINUTES</span>
      </div>

      <Tabs defaultValue="rules">
        <TabsList className="bg-zone-bg2 border border-zone-accent/10">
          <TabsTrigger value="rules" className="data-[state=active]:bg-zone-accent data-[state=active]:text-zone-bg font-mono text-xs">Participant Rules</TabsTrigger>
          <TabsTrigger value="volunteer" className="data-[state=active]:bg-zone-accent data-[state=active]:text-zone-bg font-mono text-xs">Volunteer Entry</TabsTrigger>
        </TabsList>

        <TabsContent value="rules" className="mt-6 space-y-6">
          <div className="border border-zone-accent/20 rounded-2xl p-6 bg-zone-bg2/50">
            <h3 className="font-display text-xl text-zone-fg mb-3">Mission</h3>
            <p className="font-body text-sm text-zone-muted leading-relaxed">
              You've received Energy Source Cards with Power, Cost, and Carbon values. Allocate them across 3 sectors to meet all demands.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[{ emoji: '🏠', label: 'Residential' }, { emoji: '🏢', label: 'Commercial' }, { emoji: '🏭', label: 'Industrial' }].map(s => (
              <div key={s.label} className="border border-zone-accent/20 rounded-xl p-4 text-center bg-zone-bg2/30">
                <span className="text-2xl">{s.emoji}</span>
                <p className="font-mono text-xs text-zone-fg mt-2">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <h3 className="font-display text-lg text-zone-fg">Rules</h3>
            {['Meet ALL sector energy demands', 'Stay within the given budget', "Satisfy your Constraint Card's special condition", 'Minimize total carbon output'].map((r, i) => (
              <p key={i} className="font-body text-sm text-zone-muted">
                <span className="font-mono text-zone-accent mr-2">{i + 1}.</span>{r}
              </p>
            ))}
            <p className="font-body text-xs text-amber-300 mt-3">⚠ Read your Constraint Card before planning. It changes one rule for your team.</p>
          </div>

          <div className="border border-zone-accent/20 rounded-xl overflow-hidden">
            <div className="bg-zone-bg2 px-4 py-2 font-mono text-[11px] text-zone-muted uppercase">Scoring</div>
            {[['All demands met', '30 pts'], ['Within budget', '20 pts'], ['Constraint satisfied', '20 pts'], ['Carbon minimized', 'up to 30 pts']].map(([l, p]) => (
              <div key={l} className="flex justify-between px-4 py-2.5 border-t border-zone-accent/10">
                <span className="font-body text-sm text-zone-fg">{l}</span>
                <span className="font-mono text-sm text-zone-accent font-bold">{p}</span>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="volunteer" className="mt-6">
          <VolunteerPanel zone="zone1" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
