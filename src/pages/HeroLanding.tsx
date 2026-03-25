import { useNavigate } from 'react-router-dom';

const VIDEO_URL = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4';

export default function HeroLanding() {
  const navigate = useNavigate();

  return (
    <div className="hero-landing relative min-h-screen overflow-hidden">
      {/* Video background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src={VIDEO_URL} type="video/mp4" />
      </video>

      {/* Subtle overlay for text readability */}
      <div className="absolute inset-0 bg-black/30 z-[1]" />

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-6 md:px-8 py-6 max-w-7xl mx-auto">
        <span
          className="text-3xl tracking-tight text-white"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          GridQuest<sup className="text-xs">®</sup>
        </span>

        <div className="hidden md:flex items-center gap-8">
          {['Home', 'Zones', 'Leaderboard', 'About'].map((link, i) => (
            <button
              key={link}
              onClick={() => {
                if (link === 'Zones' || link === 'Home') navigate('/quest');
                else if (link === 'Leaderboard') navigate('/leaderboard');
              }}
              className={`text-sm transition-colors cursor-pointer ${
                i === 0 ? 'text-white' : 'text-white/60 hover:text-white'
              }`}
              style={{ fontFamily: "'Inter', var(--font-body)" }}
            >
              {link}
            </button>
          ))}
        </div>

        <button
          onClick={() => navigate('/quest')}
          className="liquid-glass rounded-full px-6 py-2.5 text-sm text-white hover:scale-[1.03] transition-transform cursor-pointer"
          style={{ fontFamily: "'Inter', var(--font-body)" }}
        >
          Begin Journey
        </button>
      </nav>

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-24 sm:pt-32 pb-40">
        <h1
          className="animate-fade-rise text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-[-2.46px] max-w-7xl font-normal text-white"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Solve the <em className="not-italic text-white/50">Grid,</em>
          <br />
          Save the <em className="not-italic text-white/50">Planet.</em>
        </h1>

        <p
          className="animate-fade-rise-2 text-white/60 text-base sm:text-lg max-w-2xl mt-8 leading-relaxed"
          style={{ fontFamily: "'Inter', var(--font-body)" }}
        >
          A multi-round sustainability challenge where teams tackle energy allocation,
          carbon tracking, climate decisions, and creative thinking — all under the clock.
          BMSCE · 2026.
        </p>

        <button
          onClick={() => navigate('/quest')}
          className="animate-fade-rise-3 liquid-glass rounded-full px-14 py-5 text-base text-white mt-12 hover:scale-[1.03] transition-transform cursor-pointer"
          style={{ fontFamily: "'Inter', var(--font-body)" }}
        >
          Enter the Quest →
        </button>

        {/* Stats row */}
        <div
          className="animate-fade-rise-4 flex flex-wrap justify-center gap-8 mt-16"
          style={{ fontFamily: "'Inter', var(--font-body)" }}
        >
          {[
            { label: 'Zones', value: '4' },
            { label: 'Max Score', value: '500' },
            { label: 'Team Size', value: '2' },
            { label: 'Minutes', value: '~35' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p
                className="text-3xl sm:text-4xl text-white font-normal"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                {stat.value}
              </p>
              <p className="text-xs text-white/40 uppercase tracking-widest mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
