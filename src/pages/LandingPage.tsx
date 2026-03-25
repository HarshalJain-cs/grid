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
    <div className="min-h-screen bg-cream text-ink">
      <LandingNav />
      <ScrollReveal>
        <HeroSection />
      </ScrollReveal>
      <ScrollReveal delay={80}>
        <PullQuoteSection />
      </ScrollReveal>
      <ScrollReveal delay={60}>
        <OrganizerSection />
      </ScrollReveal>
      <ScrollReveal delay={60}>
        <WhatYoullTackle />
      </ScrollReveal>
      <ScrollReveal delay={60}>
        <ZoneBreakdown />
      </ScrollReveal>
      <ScrollReveal delay={60}>
        <TestimonialsSection />
      </ScrollReveal>
      <TickerBar />
      <ScrollReveal delay={60}>
        <FAQSection />
      </ScrollReveal>
      <ScrollReveal delay={60}>
        <RegistrationSection />
      </ScrollReveal>
      <ScrollReveal>
        <LandingFooter />
      </ScrollReveal>
    </div>
  );
}
