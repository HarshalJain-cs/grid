import type { ClimateScenario } from '@/types';

export const climateScenarios: ClimateScenario[] = [
  {
    title: "City Heatwave Emergency",
    description: "A city of 2 million faces 5 days at 47°C. Power grids are at 98% capacity. The mayor must act immediately.",
    options: [
      { text: "Implement rotating 2-hour blackouts per area", tags: "💰 Low · 🌿 Moderate · ⚡ Moderate", score: 15 },
      { text: "Import emergency power from neighbouring state at 3× cost", tags: "💰 Very High · 🌿 Low · ⚡ High", score: 10 },
      { text: "Open all government buildings as cooling centres + mandate commercial AC reduction", tags: "💰 Low · 🌿 High · ⚡ High", score: 20 },
      { text: "Shut down all non-essential businesses for 5 days", tags: "💰 Medium · 🌿 Moderate · ⚡ High", score: 8 },
    ],
  },
  {
    title: "EV Surge: Grid Overload",
    description: "A smart city with 60% EV adoption faces dangerous grid spikes every evening 6–9 PM when 80,000 EVs charge simultaneously.",
    options: [
      { text: "Ban EV charging 6–9 PM by law", tags: "💰 Low · 🌿 Moderate · ⚡ High", score: 12 },
      { text: "Dynamic pricing: 3× cost 6–9 PM, free midnight–6 AM", tags: "💰 Low · 🌿 High · ⚡ High", score: 20 },
      { text: "Build 3 new power plants to handle peak load", tags: "💰 Very High · 🌿 Low · ⚡ Very High", score: 5 },
      { text: "Install V2G tech — EVs feed power back to grid during peak", tags: "💰 High · 🌿 Very High · ⚡ High", score: 18 },
    ],
  },
  {
    title: "Coastal Flood Risk",
    description: "A city plans a new industrial zone on low-lying land. Scientists predict 70% chance of severe flooding in 20 years. Developers are ready to invest ₹4,000 Cr.",
    options: [
      { text: "Approve with mandatory flood barriers", tags: "💰 High · 🌿 Low · ⚡ Moderate", score: 8 },
      { text: "Reject and rezone as green buffer wetlands", tags: "💰 Low · 🌿 Very High · ⚡ High", score: 20 },
      { text: "Approve with elevated construction standards (+30% cost)", tags: "💰 Very High · 🌿 Moderate · ⚡ Moderate", score: 10 },
      { text: "Delay 5 years for more climate studies", tags: "💰 Very Low · 🌿 Moderate · ⚡ Low", score: 6 },
    ],
  },
  {
    title: "Solar Farm vs Forest",
    description: "A company proposes clearing 800 hectares of secondary forest to build a solar farm powering 200,000 homes. Activists and energy advocates are divided.",
    options: [
      { text: "Approve — clean energy benefits outweigh forest loss", tags: "💰 High ROI · 🌿 Mixed · ⚡ High", score: 8 },
      { text: "Reject — forest conservation is non-negotiable", tags: "💰 Low · 🌿 Very High · ⚡ Low", score: 12 },
      { text: "Approve on degraded land nearby instead (higher cost)", tags: "💰 Very High · 🌿 High · ⚡ High", score: 20 },
      { text: "Build half the farm, preserve half the forest", tags: "💰 Medium · 🌿 Moderate · ⚡ Moderate", score: 15 },
    ],
  },
  {
    title: "Agricultural Water Crisis",
    description: "3 consecutive drought years. 40,000 farmers face crop failure. River at 25% capacity. Government must act.",
    options: [
      { text: "Divert water from neighbouring river (affects another district)", tags: "💰 Low · 🌿 Low · ⚡ High", score: 5 },
      { text: "Subsidise drip irrigation conversion for all 40,000 farms over 2 years", tags: "💰 High upfront · 🌿 Very High · ⚡ High", score: 20 },
      { text: "Advise farmers to shift to drought-resistant crops + provide seeds", tags: "💰 Low · 🌿 High · ⚡ Moderate", score: 15 },
      { text: "Build desalination plant (coastal district 200km away)", tags: "💰 Very High · 🌿 Moderate · ⚡ Moderate", score: 8 },
    ],
  },
];
