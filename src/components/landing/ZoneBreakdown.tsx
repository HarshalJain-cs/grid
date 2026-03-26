import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { zonesData } from '@/data/zones';

export default function ZoneBreakdown() {
  return (
    <section id="zones" className="py-20 md:py-28 px-6 bg-cream-alt">
      <div className="max-w-[1200px] mx-auto">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-4">THE ZONES</p>
        <h2 className="font-display text-4xl md:text-5xl text-ink mb-12">What's inside GridQuest?</h2>
        <p className="font-body text-base text-ink-muted mb-12">5 zones, 5 minutes each. Here's exactly what to expect.</p>

        <div className="grid md:grid-cols-[1fr_340px] gap-6 md:gap-10">
          <Accordion type="single" collapsible className="space-y-0">
            {zonesData.map(z => (
              <AccordionItem key={z.number} value={`z${z.number}`} className="border-b border-cream-border">
                <AccordionTrigger className="py-5 hover:no-underline">
                  <div className="flex items-center gap-4 text-left">
                    <span className="w-8 h-8 rounded-full bg-leaf/10 flex items-center justify-center font-mono text-sm text-leaf font-bold">{z.number}</span>
                    <span className="font-display text-lg text-ink">{z.name}</span>
                    <span className={`font-mono text-[10px] px-2 py-0.5 rounded-full ${z.type === 'PHYSICAL' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>
                      {z.type}
                    </span>
                    <span className="font-mono text-[11px] text-ink-muted">{z.duration}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="font-body text-sm text-ink-muted leading-relaxed mb-4">{z.description}</p>
                  <div className="border border-cream-border rounded-lg overflow-hidden">
                    <div className="bg-cream px-4 py-2 font-mono text-[11px] text-ink-muted uppercase">Scoring preview</div>
                    {z.scoring.map((s, i) => (
                      <div key={i} className="flex justify-between px-4 py-2 border-t border-cream-border">
                        <span className="font-body text-sm text-ink">{s.label}</span>
                        <span className="font-mono text-sm text-leaf font-bold">{s.points}</span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="hidden md:block">
            <div className="sticky top-24 border border-cream-border rounded-2xl p-6 bg-white/60">
              <h3 className="font-display text-lg text-ink mb-4">Event at a glance</h3>
              <div className="space-y-3 font-body text-sm text-ink-muted">
                <p>📍 BMSCE, Bengaluru</p>
                <p>👥 Teams of 2 participants</p>
                <p>⏱ 5 minutes per zone · ~35 min total</p>
                <p>🔄 4 batches</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
