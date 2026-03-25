const items = [
  { num: '01', title: 'Energy Allocation', desc: 'Distribute power sources across residential, commercial, and industrial sectors while staying within budget and minimizing carbon.' },
  { num: '02', title: 'Carbon Footprinting', desc: 'Track your real lifestyle emissions, then make realistic optimizations. Extreme changes are penalized — think practically.' },
  { num: '03', title: 'Climate Decision Making', desc: 'Face real-world crises: heatwaves, EV grid overloads, flood risk zones. Pick the most balanced solution, not just the greenest one.' },
  { num: '04', title: 'Creative Communication', desc: 'Draw or act out sustainability concepts without speaking or spelling. Guess as many as possible in 5 minutes.' },
  { num: '05', title: 'Technology Awareness', desc: '20 rapid-fire questions on AI, EVs, semiconductors, global tech policy, and digital infrastructure.' },
  { num: '06', title: 'Team Strategy', desc: 'All zones are solved together. Time pressure is real. Your combined thinking determines your final ranking.' },
];

export default function WhatYoullTackle() {
  return (
    <section id="overview" className="py-20 md:py-28 px-6">
      <div className="max-w-[1200px] mx-auto">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-4">WHAT YOU'LL TACKLE</p>
        <h2 className="font-display text-4xl md:text-5xl text-ink mb-12">Five challenges. One team.<br />Unlimited thinking.</h2>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-0">
          <div className="space-y-0">
            {items.map(item => (
              <div key={item.num} className="py-6 border-b border-cream-border">
                <div className="flex gap-4">
                  <span className="font-mono text-sm text-leaf font-bold">{item.num}</span>
                  <div>
                    <h3 className="font-display text-xl text-ink mb-1">{item.title}</h3>
                    <p className="font-body text-sm text-ink-muted leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="hidden md:flex flex-col justify-center">
            <div className="border border-cream-border rounded-2xl p-8 bg-cream-alt/50">
              <p className="font-body text-sm text-ink-muted leading-relaxed italic">
                "Our team designed every zone to simulate real-world sustainability challenges you'll face as professionals. Power allocation, carbon tracking, climate policy decisions, and creative problem solving — these aren't hypotheticals. They're tomorrow's reality."
              </p>
              <p className="font-body text-sm text-ink-muted leading-relaxed italic mt-4">
                "We believe the most powerful way to learn about sustainability is to experience the pressure of real decisions under real constraints. That's what GridQuest is built for."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
