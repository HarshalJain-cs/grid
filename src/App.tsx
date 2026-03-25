import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { GameProvider } from "@/store/gameStore";
import { ConvexClientProvider } from "@/lib/convex";
import { AnimatePresence, motion } from "framer-motion";
import HeroLanding from "./pages/HeroLanding";
import LandingPage from "./pages/LandingPage";
import Zone1PowerPuzzle from "./pages/zones/Zone1PowerPuzzle";
import Zone2CarbonQuest from "./pages/zones/Zone2CarbonQuest";
import Zone3ClimateDecision from "./pages/zones/Zone3ClimateDecision";
import Zone4GreenSketch from "./pages/zones/Zone4GreenSketch";
import TechTrivia from "./pages/zones/TechTrivia";
import Leaderboard from "./pages/Leaderboard";
import ZoneNav from "./components/shared/ZoneNav";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function ZoneShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <ZoneNav />
      {children}
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/trivia" element={<ZoneShell><motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}><TechTrivia /></motion.div></ZoneShell>} />
        <Route path="/zone2" element={<ZoneShell><motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}><Zone2CarbonQuest /></motion.div></ZoneShell>} />
        <Route path="/zone3" element={<ZoneShell><motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}><Zone3ClimateDecision /></motion.div></ZoneShell>} />
        <Route path="/zone1" element={<ZoneShell><motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}><Zone1PowerPuzzle /></motion.div></ZoneShell>} />
        <Route path="/zone4" element={<ZoneShell><motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}><Zone4GreenSketch /></motion.div></ZoneShell>} />
        <Route path="/leaderboard" element={<ZoneShell><motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}><Leaderboard /></motion.div></ZoneShell>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

const App = () => (
  <ConvexClientProvider>
    <QueryClientProvider client={queryClient}>
      <GameProvider>
        <TooltipProvider>
          <Sonner />
          <HashRouter>
            <AnimatedRoutes />
          </HashRouter>
        </TooltipProvider>
      </GameProvider>
    </QueryClientProvider>
  </ConvexClientProvider>
);

export default App;
