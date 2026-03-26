import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { GameProvider } from "@/store/gameStore";
import { ConvexClientProvider } from "@/lib/convex";
import { AnimatePresence, motion } from "framer-motion";
import { Analytics } from "@vercel/analytics/react";
import HeroLanding from "./pages/HeroLanding";
import LandingPage from "./pages/LandingPage";
import EntryGate from "./pages/EntryGate";
import Zone1PowerPuzzle from "./pages/zones/Zone1PowerPuzzle";
import Zone2CarbonQuest from "./pages/zones/Zone2CarbonQuest";
import Zone3ClimateDecision from "./pages/zones/Zone3ClimateDecision";
import Zone4GreenSketch from "./pages/zones/Zone4GreenSketch";
import TechTrivia from "./pages/zones/TechTrivia";
import Leaderboard from "./pages/Leaderboard";
import ZoneNav from "./components/shared/ZoneNav";
import VolunteerDashboard from "./pages/VolunteerDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-cream flex flex-col items-center justify-center px-6 text-center">
          <h1 className="font-display text-3xl text-ink mb-4">Something went wrong</h1>
          <p className="font-body text-ink-muted mb-6">Please refresh the page to try again.</p>
          <button onClick={() => { this.setState({ hasError: false }); window.location.hash = '/'; window.location.reload(); }}
            className="bg-leaf text-white font-body font-medium px-6 py-3 rounded-full">
            Refresh
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function ZoneShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen min-h-[100dvh] bg-cream text-ink">
      <ZoneNav />
      {children}
    </div>
  );
}

const pageTransition = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -12 }, transition: { duration: 0.25 } };

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname} {...pageTransition}>
        <Routes location={location}>
          <Route path="/" element={<HeroLanding />} />
          <Route path="/quest" element={<LandingPage />} />
          <Route path="/entry" element={<EntryGate />} />
          <Route path="/trivia" element={<ZoneShell><TechTrivia /></ZoneShell>} />
          <Route path="/zone2" element={<ZoneShell><Zone2CarbonQuest /></ZoneShell>} />
          <Route path="/zone3" element={<ZoneShell><Zone3ClimateDecision /></ZoneShell>} />
          <Route path="/zone1" element={<ZoneShell><Zone1PowerPuzzle /></ZoneShell>} />
          <Route path="/zone4" element={<ZoneShell><Zone4GreenSketch /></ZoneShell>} />
          <Route path="/volunteer" element={<ZoneShell><VolunteerDashboard /></ZoneShell>} />
          <Route path="/leaderboard" element={<ZoneShell><Leaderboard /></ZoneShell>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

const App = () => (
  <ErrorBoundary>
    <ConvexClientProvider>
      <QueryClientProvider client={queryClient}>
        <GameProvider>
          <TooltipProvider>
            <Sonner />
            <Analytics />
            <HashRouter>
              <AnimatedRoutes />
            </HashRouter>
          </TooltipProvider>
        </GameProvider>
      </QueryClientProvider>
    </ConvexClientProvider>
  </ErrorBoundary>
);

export default App;
