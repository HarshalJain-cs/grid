import LandingNav from '@/components/landing/LandingNav';
import HeroSection from '@/components/landing/HeroSection';
import PullQuoteSection from '@/components/landing/PullQuoteSection';
import OrganizerSection from '@/components/landing/OrganizerSection';
import WhatYoullTackle from '@/components/landing/WhatYoullTackle';
import ZoneBreakdown from '@/components/landing/ZoneBreakdown';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import TickerBar from '@/components/landing/TickerBar';
import FAQSection from '@/components/landing/FAQSection';
import RegistrationSection from '@/components/landing/RegistrationSection';
import LandingFooter from '@/components/landing/LandingFooter';
import ScrollReveal from '@/components/shared/ScrollReveal';

export default function LandingPage() {
  return (
    <div className="min-h-screen min-h-[100dvh] bg-cream text-ink overflow-x-hidden">
      <LandingNav />
      <ScrollReveal duration={0.8}>
        <HeroSection />
      </ScrollReveal>
      <ScrollReveal delay={100} direction="up">
        <PullQuoteSection />
      </ScrollReveal>
      <ScrollReveal delay={80} direction="left">
        <OrganizerSection />
      </ScrollReveal>
      <ScrollReveal delay={60} direction="up">
        <WhatYoullTackle />
      </ScrollReveal>
      <ScrollReveal delay={80} direction="right">
        <ZoneBreakdown />
      </ScrollReveal>
      <ScrollReveal delay={60} direction="up">
        <TestimonialsSection />
      </ScrollReveal>
      <TickerBar />
      <ScrollReveal delay={80} direction="up">
        <FAQSection />
      </ScrollReveal>
      <ScrollReveal delay={100} direction="up">
        <RegistrationSection />
      </ScrollReveal>
      <ScrollReveal delay={60} direction="up" distance={20}>
        <LandingFooter />
      </ScrollReveal>
    </div>
  );
}
