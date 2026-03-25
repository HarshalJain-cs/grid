import { testimonials } from '@/data/testimonials';

export default function TestimonialsSection() {
  return (
    <section className="py-20 md:py-28 px-6">
      <div className="max-w-[1200px] mx-auto">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-4">PARTICIPANTS SAY</p>
        <h2 className="font-display text-4xl md:text-5xl text-ink mb-12">"What teams experienced."</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map(t => (
            <div key={t.initials} className="border border-cream-border rounded-2xl p-6 bg-white/40">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-leaf/20 flex items-center justify-center font-mono text-sm text-leaf font-bold">{t.initials}</div>
                <div>
                  <p className="font-body text-sm font-medium text-ink">{t.name}</p>
                  <p className="font-body text-xs text-ink-muted">{t.role}</p>
                </div>
              </div>
              <p className="font-body text-sm text-ink-muted leading-relaxed italic mb-4">"{t.quote}"</p>
              <div className="flex gap-0.5 text-amber-400">
                {'★★★★★'.split('').map((s, i) => <span key={i}>{s}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
