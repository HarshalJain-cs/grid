export default function TickerBar() {
  const content = "⚡ Power Puzzle · 🌿 Carbon Quest · 🌡 Climate Decision Room · ✏️ Eco Shards · 💡 Tech Trivia · 🏆 Leaderboard · 👥 Teams of 2 · ⏱ 5 Min Per Zone · ";
  return (
    <div className="border-y border-cream-border py-4 overflow-hidden bg-cream">
      <div className="flex whitespace-nowrap animate-ticker">
        <span className="font-mono text-sm text-ink-muted px-4">{content}</span>
        <span className="font-mono text-sm text-ink-muted px-4">{content}</span>
        <span className="font-mono text-sm text-ink-muted px-4">{content}</span>
        <span className="font-mono text-sm text-ink-muted px-4">{content}</span>
      </div>
    </div>
  );
}
