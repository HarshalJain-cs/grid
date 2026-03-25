import { useEffect, useRef, useState } from 'react';

const stats = [
  { value: 4, label: 'Zones' },
  { value: 2, suffix: 'h', label: 'Duration' },
  { value: 500, label: 'Max Points' },
];

export default function OrganizerSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="organizer" className="py-20 md:py-28 px-6">
      <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-12 items-start">
        <div>
          <div className="bg-cream-alt rounded-2xl aspect-[4/3] flex items-center justify-center mb-8">
            <span className="font-mono text-sm text-ink-muted">Organizer Photo</span>
          </div>
          <div ref={ref} className="grid grid-cols-3 gap-4">
            {stats.map((s, i) => (
              <div key={s.label} className={`text-center p-4 border border-cream-border rounded-xl ${visible ? 'animate-fade-rise' : 'opacity-0'}`} style={{ animationDelay: `${i * 0.15}s` }}>
                <p className="font-display text-3xl text-leaf">{s.value}{s.suffix || ''}</p>
                <p className="font-mono text-[11px] text-ink-muted uppercase">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="animate-fade-rise-2">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-4">YOUR ORGANIZER</p>
          <h2 className="font-display text-4xl md:text-5xl text-ink mb-6">Meet the team behind GridQuest.</h2>
          <p className="font-body text-base text-ink-muted leading-relaxed mb-4">
            GridQuest is organized by the Energy Club at BMS College of Engineering — a student-led initiative bringing together future engineers, designers, and changemakers passionate about sustainable technology.
          </p>
          <div className="flex flex-wrap gap-2 mt-6">
            {['Sustainability', 'Energy Systems', 'Climate Policy', 'Team Strategy', 'Design Thinking'].map(tag => (
              <span key={tag} className="font-mono text-[11px] bg-leaf-bg text-leaf px-3 py-1 rounded-full">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
