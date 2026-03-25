import type { LifestyleQuestion, CampusUpgrade, ComboBonus, Riddle } from '@/types';

export const lifestyleQuestions: LifestyleQuestion[] = [
  {
    id: 'travel', label: 'Mode of Travel',
    options: [
      { text: 'Walk/Cycle', value: 1 }, { text: 'Bus', value: 2 }, { text: 'Bike', value: 3 },
      { text: 'Auto', value: 4 }, { text: 'Carpool', value: 5 }, { text: 'Personal Car', value: 6 },
    ],
  },
  {
    id: 'ac', label: 'AC Usage',
    options: [
      { text: '1–2 hrs', value: 1 }, { text: '3–4 hrs', value: 2 }, { text: '5–6 hrs', value: 3 },
      { text: '7–8 hrs', value: 4 }, { text: '8+ hrs', value: 5 },
    ],
  },
  {
    id: 'devices', label: 'Devices Charged per Day',
    options: [
      { text: '1–2', value: 1 }, { text: '3–4', value: 2 }, { text: '5–6', value: 3 }, { text: '7–8', value: 4 },
    ],
  },
  {
    id: 'food', label: 'Food Habit',
    options: [
      { text: 'Strict Vegetarian', value: 1 }, { text: 'Mostly Vegetarian', value: 2 },
      { text: 'Balanced', value: 3 }, { text: 'Mostly Non-Veg', value: 4 }, { text: 'Daily Non-Veg', value: 5 },
    ],
  },
  {
    id: 'screen', label: 'Screen Time',
    options: [
      { text: '<1 hr', value: 1 }, { text: '1–2 hrs', value: 2 }, { text: '3–4 hrs', value: 3 },
      { text: '5–6 hrs', value: 4 }, { text: '6+ hrs', value: 5 },
    ],
  },
  {
    id: 'laundry', label: 'Laundry Frequency (per week)',
    options: [
      { text: 'Once', value: 1 }, { text: 'Twice', value: 2 }, { text: '3–4 times', value: 3 }, { text: 'Daily', value: 4 },
    ],
  },
  {
    id: 'gadget', label: 'Gadget Usage Pattern',
    options: [
      { text: 'Minimal (essentials only)', value: 1 }, { text: 'Moderate', value: 2 },
      { text: 'Heavy usage', value: 3 }, { text: 'Always-on devices', value: 4 },
    ],
  },
  {
    id: 'eating_out', label: 'Eating Out Frequency',
    options: [
      { text: 'Rarely', value: 1 }, { text: '1–2 times/week', value: 2 },
      { text: '3–4 times/week', value: 3 }, { text: 'Daily', value: 4 },
    ],
  },
  {
    id: 'charging', label: 'Charging Behavior',
    options: [
      { text: 'Charge only when needed', value: 1 }, { text: 'Charge overnight regularly', value: 2 },
      { text: 'Devices plugged in often', value: 3 }, { text: 'Always charging', value: 4 },
    ],
  },
];

export const campusUpgrades: CampusUpgrade[] = [
  { name: 'Install solar panels on rooftop', cost: 40, impact: 25, emoji: '☀️' },
  { name: 'Replace AC with inverter models', cost: 30, impact: 18, emoji: '❄️' },
  { name: 'Add rainwater harvesting', cost: 25, impact: 20, emoji: '🌧️' },
  { name: 'Plant trees in open spaces', cost: 10, impact: 12, emoji: '🌳' },
  { name: 'Install EV charging stations', cost: 35, impact: 15, emoji: '⚡' },
  { name: 'Switch to LED lighting', cost: 15, impact: 14, emoji: '💡' },
  { name: 'Add bicycle parking + repair', cost: 5, impact: 8, emoji: '🚲' },
  { name: 'Install smart energy meters', cost: 20, impact: 16, emoji: '📊' },
  { name: 'Organic waste composting', cost: 8, impact: 10, emoji: '🍃' },
  { name: 'Green roof on one building', cost: 30, impact: 17, emoji: '🌿' },
];

export const comboBonuses: ComboBonus[] = [
  { items: ['Install solar panels on rooftop', 'Install smart energy meters'], bonus: 3, label: 'Solar + Smart Meters', emoji: '☀️ + ⚡' },
  { items: ['Add rainwater harvesting', 'Organic waste composting'], bonus: 3, label: 'Rainwater + Composting', emoji: '🌧️ + 🍃' },
  { items: ['Switch to LED lighting', 'Replace AC with inverter models'], bonus: 3, label: 'LED + Inverter AC', emoji: '💡 + ❄️' },
];

export const riddles: Riddle[] = [
  {
    question: "I'm invisible yet cause the most damage. I'm released when you drive, fly, or leave lights on. Industries produce me. Activists fight me. What am I?",
    options: ['Carbon Dioxide', 'Oxygen', 'Nitrogen', 'Water Vapour'],
    correctIndex: 0,
    points: 10,
  },
  {
    question: "I take 450 years to break down. Oceans are full of me. I wrap your food, bottles, and bags. 400 million tonnes of me are made every year. What am I?",
    options: ['Glass', 'Plastic', 'Rubber', 'Aluminium'],
    correctIndex: 1,
    points: 10,
  },
  {
    question: "I power homes when sun doesn't shine and wind doesn't blow. I store what's generated. EVs run on me. I get cheaper every year. What am I?",
    options: ['Hydrogen fuel', 'Coal', 'Battery storage', 'Nuclear energy'],
    correctIndex: 2,
    points: 10,
  },
];
