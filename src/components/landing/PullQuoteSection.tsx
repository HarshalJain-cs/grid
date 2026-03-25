export default function PullQuoteSection() {
  return (
    <section className="bg-cream-alt py-20 md:py-28 px-6">
      <div className="max-w-[900px] mx-auto text-center">
        <span className="font-display text-6xl text-leaf/30">"</span>
        <p className="font-display italic text-2xl md:text-3xl text-ink leading-relaxed -mt-8 mb-6">
          GridQuest made us think about sustainability in ways we never had before. Every decision felt real. We lost track of time completely.
        </p>
        <span className="font-display text-6xl text-leaf/30">"</span>
        <div className="flex items-center justify-center gap-3 mt-4">
          <div className="w-10 h-10 rounded-full bg-leaf/20 flex items-center justify-center font-mono text-sm text-leaf font-bold">RK</div>
          <div className="text-left">
            <p className="font-body text-sm font-medium text-ink">Rohan Kumar</p>
            <p className="font-body text-xs text-ink-muted">Participant, GridQuest 2025</p>
          </div>
        </div>
      </div>
    </section>
  );
}
