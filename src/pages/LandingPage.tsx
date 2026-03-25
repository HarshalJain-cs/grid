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

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <LandingNav />
      <HeroSection />
      <PullQuoteSection />
      <OrganizerSection />
      <WhatYoullTackle />
      <ZoneBreakdown />
      <TestimonialsSection />
      <TickerBar />
      <FAQSection />
      <RegistrationSection />
      <LandingFooter />
    </div>
  );
}
