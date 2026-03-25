

# GridQuest × FastCourse — Detailed Phased Implementation Plan

---

## Phase 1: Foundation (Design System + State + Routing)

### Step 1.1 — Design System Setup
- Install `framer-motion` dependency
- Replace `index.css` with full GridQuest design system:
  - Google Fonts import (Instrument Serif, DM Sans, Space Mono)
  - CSS variables for landing palette (`--lp-bg: #F7F8F2`, `--lp-fg: #111110`, `--lp-accent: #5A9A1F`, etc.)
  - CSS variables for zone palette (`--z-bg: #0a1a0f`, `--z-fg: #f0f7e8`, `--z-accent: #a8e063`, etc.)
  - Font variables (`--font-display`, `--font-body`, `--font-mono`)
  - `.liquid-glass` utility class with backdrop blur + gradient border pseudo-element
  - Keyframes: `fade-rise`, `ticker`, `pulse-glow`, `count-up`
  - Staggered animation classes (`.animate-fade-rise`, `-2`, `-3`, `-4`)
- Extend `tailwind.config.ts` with custom font families (`display`, `body`, `mono`), color tokens (`cream`, `ink`, `leaf`, `zone`), and animation utilities

### Step 1.2 — TypeScript Types
- Create `src/types/index.ts` with:
  - `GameState` interface (teamId, zone scores, completedZones, currentView, leaderboard)
  - `LeaderboardEntry` interface (teamId, zone1-4 scores, trivia, total, timestamp, teamName)
  - `GameAction` union type for all reducer actions
  - Zone data types (scenario options, trivia questions, upgrade items, riddles)

### Step 1.3 — Global State (React Context + useReducer)
- Create `src/store/gameStore.tsx`:
  - `GameProvider` wrapping app with context
  - `useGame` hook returning state + dispatch
  - Reducer handling: `SET_TEAM_ID`, `SET_ZONE_SCORE`, `COMPLETE_ZONE`, `SET_VIEW`, `SUBMIT_TO_LEADERBOARD`, `RESET_GAME`, `LOAD_LEADERBOARD`, `UPDATE_TEAM`, `DELETE_TEAM`, `ADD_TEAM`
  - localStorage persistence under key `gq_leaderboard`
  - Load leaderboard from localStorage on init
  - Total score computed as sum of all 5 zones (max 500)
  - Upsert logic on submit (update existing teamId, don't duplicate)

### Step 1.4 — Static Data Files
- `src/data/faq.ts` — 8 FAQ entries (exact Q&A from spec)
- `src/data/testimonials.ts` — 4 testimonial objects (Shreya, Arjun, Priya, Rahul with initials, name, role, quote)
- `src/data/zones.ts` — Zone metadata (name, type, duration, maxScore, description, scoring breakdown)
- `src/data/techTrivia.ts` — 20 questions with 4 options each, correct answer index, exact order from spec
- `src/data/zone2Data.ts` — 9 lifestyle questions with options/carbon values, 10 campus upgrades with cost/impact, 3 combo bonuses, 3 riddles
- `src/data/zone3Data.ts` — 5 climate scenarios with 4 options each, tags (cost/sustainability/reliability), and hidden scores
- `src/data/zone4Words.ts` — 25 sustainability words array

### Step 1.5 — Routing & App Shell
- Update `App.tsx` with HashRouter (replace BrowserRouter)
- Wrap app in `GameProvider`
- Define routes:
  - `/` → `LandingPage` (cream background shell)
  - `/zone1` → `Zone1PowerPuzzle` (dark zone shell)
  - `/zone2` → `Zone2CarbonQuest` (dark zone shell)
  - `/zone3` → `Zone3ClimateDecision` (dark zone shell)
  - `/zone4` → `Zone4GreenSketch` (dark zone shell)
  - `/trivia` → `TechTrivia` (dark zone shell)
  - `/leaderboard` → `Leaderboard` (dark zone shell)
- Create `ZoneShell` layout wrapper: dark bg, fixed `ZoneNav`, framer-motion `AnimatePresence` page transitions
- Create `src/components/shared/ZoneNav.tsx`:
  - Fixed top bar, dark semi-transparent bg with backdrop-blur
  - Left: back arrow + "GridQuest" logo in accent
  - Center (desktop): 5 zone progress dots (Z1-Z4, T) — completed=solid green, current=pulsing, locked=dim with connecting lines
  - Right: Team ID chip (if set) + Leaderboard link icon

---

## Phase 2: Landing Page (11 Sections)

All sections use cream bg (`--lp-bg`), dark text (`--lp-fg`), max-width 1200px centered, generous padding (120px desktop / 60px mobile).

### Step 2.1 — LandingNav
- Sticky top, z-50, cream bg, 1px bottom border
- On scroll >50px: add subtle shadow
- Left: "Grid Quest" wordmark in font-display + "BMS CE · 2026" badge in font-mono
- Center: anchor links (Overview, Zones, Organizer, FAQ, Register) — smooth scroll, active state underline
- Right: "Enter the Quest →" CTA button (bg leaf green, white text, rounded-full)
- Mobile: hamburger menu → full-screen overlay with links

### Step 2.2 — HeroSection
- Superlabel: "TEAM CHALLENGE · BMS COLLEGE OF ENGINEERING" in font-mono uppercase tracking-widest
- Main headline: "GridQuest" in font-display text-7xl + subline "Solve the Grid, Save the Planet."
- 3 detail chips: "2026 · BMS CE" / "Teams of 2" / "4 Zones · 500 pts"
- Description paragraph in font-body
- Two CTAs: "Enter the Quest →" (primary green) + "View Leaderboard" (outline)
- Right column: Score preview card showing "Max Score 500 pts / across all 5 zones" with 5 zone rows (name + "100 pts" each)
- Below card: "Enter the Quest →" button

### Step 2.3 — PullQuoteSection
- Alt cream bg (`--lp-bg-alt`)
- Large opening/closing quotation marks
- Quote text in font-display italic text-3xl
- Attribution: avatar initials circle + name + role

### Step 2.4 — OrganizerSection
- id="organizer"
- Left column: photo placeholder (gray rounded rectangle) + 3 stat cards below (4 Zones, 2h Duration, 500 Max Points) with count-up animation on scroll
- Right column: "YOUR ORGANIZER" label + "Meet the team behind GridQuest." heading + description paragraphs
- Skill tags row: Sustainability, Energy Systems, Climate Policy, Team Strategy, Design Thinking

### Step 2.5 — WhatYoullTackle
- id="overview"
- Section label + heading: "Five challenges. One team. Unlimited thinking."
- 6-item grid (3×2 desktop, 1 col mobile), each card:
  - Number + title + 2-line description
  - Content: Energy Allocation, Carbon Footprinting, Climate Decision Making, Creative Communication, Technology Awareness, Team Strategy
- Right-side quote block with organizer perspective text

### Step 2.6 — ZoneBreakdown (Accordion)
- id="zones"
- "THE ZONES" label + "What's inside GridQuest?" heading
- 2-column layout: left = Radix accordion, right = sticky summary card
- 5 accordion items (one per zone):
  - Trigger: zone number circle + zone name + type badge (PHYSICAL/DIGITAL) + duration
  - Content: full description paragraph + scoring preview table (exact values from spec)
- Sticky summary card: "Event at a glance" with location, team size, time per zone, batch info

### Step 2.7 — TestimonialsSection
- "PARTICIPANTS SAY" label + heading
- 4 cards in 2×2 grid (single col mobile)
- Each card: initials avatar, name, role, quote text, 5-star rating row
- Cards: Shreya Kapoor (CSE), Arjun Mehta (ECE), Priya Lakshmi (Mech), Rahul Tiwari (ISE)

### Step 2.8 — TickerBar
- Full-width band between testimonials and FAQ
- Border-y, cream bg
- Infinite horizontal scroll (22s linear loop)
- Content duplicated for seamless wrap: zone names with emoji prefixes

### Step 2.9 — FAQSection
- id="faq"
- "Questions" heading + subtitle
- 8 Radix accordion items with exact Q&A from spec
- Clean borders, font-body answers

### Step 2.10 — RegistrationSection
- id="register"
- 2-column layout:
  - Left: heading + Team ID input field + "Set Team ID & Enter the Quest →" button (sets teamId in global state, navigates to `/zone1`)
  - Quick links below: "Already have a Team ID?" with direct zone links
  - Right: "What's included" pricing-style card — "5 Zones included" header, "100 pts / per zone", 5 checkmark feature rows, CTA button, "Free to participate · BMS CE students only" note

### Step 2.11 — LandingFooter
- 3-column layout: brand column (logo + tagline + social icons), Menu column (anchor links), Jump In column (zone route links)
- Bottom bar: "© 2026 GridQuest · BMS College of Engineering" + "Built for sustainability ⚡"

---

## Phase 3: Shared Zone Components

### Step 3.1 — Reusable Components
- `TimerBar.tsx` — 5-minute countdown (MM:SS in font-mono), depleting progress bar, yellow at 2min, red+pulse at 30s, calls `onExpire` callback on zero
- `QuizOption.tsx` — Radio option card with label, optional tags, selected/correct/wrong states with color feedback
- `ZoneHeader.tsx` — Zone number (font-mono), zone name (font-display), optional section progress dots
- `ScoreCard.tsx` — Score summary card with zone breakdown table, total score, and optional "Next Zone" CTA
- `CompletionModal.tsx` — Framer-motion modal showing zone score, message, and navigation button
- `VolunteerPanel.tsx` — PIN-gated panel (PIN: 2604): team ID input, score input (slider or number), notes field, save button with toast feedback

---

## Phase 4: Zone Pages (Interactive Game Logic)

### Step 4.1 — Zone 1: Power Puzzle (Physical)
- Two tabs: "Participant Rules" | "Volunteer Entry"
- **Participant tab**: Zone header, "PHYSICAL ROUND · 5 MINUTES" badge, mission card explaining energy allocation, 3 sector cards (Residential/Commercial/Industrial), numbered rules list, scoring table
- **Volunteer tab**: PIN gate (2604) → team ID input, score number input (0-100), notes field, save button → dispatches `SET_ZONE_SCORE('zone1', score)` + `COMPLETE_ZONE('zone1')`

### Step 4.2 — Zone 2: Carbon Quest (Digital) — Most Complex Zone
- Zone header with section progress (1 of 3 → 2 of 3 → 3 of 3)
- Global 5-minute timer (shared across all 3 sections, auto-submits on expiry)

**Section 1A — Current Lifestyle**: 9 radio-group questions (Travel, AC, Devices, Food, Screen Time, Laundry, Gadget Usage, Eating Out, Charging), each with carbon score values. Live running total displayed. "Next: Optimize →" button (disabled until all 9 answered).

**Section 1B — Optimized Lifestyle**: Same 9 questions pre-filled with 1A answers. User adjusts to lower values. Warning about >2 step changes triggering penalty. Live carbon reduction preview. Scoring logic:
- reduction <= 0: 0 pts
- 1-3: 10 pts
- 4-7: 20 pts
- 8-12: 30 pts
- >= 13: 15 pts (unrealistic penalty)

**Section 2 — Campus Upgrade**: 10 upgrade items with cost/impact values displayed as selectable cards. Live budget counter (₹XX/₹100, red if over). Live impact score. 3 combo bonus cards that highlight when both items selected. Scoring: over budget = 0, else min(impact + combos + exact-budget-bonus, 45).

**Section 3 — Riddles**: 3 MCQ riddles (CO2, Plastic, Battery storage). Results shown after section submit.

**Final**: zone2Total = section1 + section2 + section3, capped at 100. Score summary card → navigate to `/zone3`.

### Step 4.3 — Zone 3: Climate Decision Room (Digital)
- 5 scenarios shown one at a time, progress bar "Scenario X of 5"
- 5-minute timer, auto-submit on expiry
- Each scenario: title, situation description, 4 radio options with tag chips (Cost/Sustainability/Reliability)
- Scores hidden during play
- Exact scenarios: City Heatwave (best=C:20), EV Grid (best=B:20), Coastal Flood (best=B:20), Solar vs Forest (best option from spec), Water Crisis (best=B:20)
- Post-round: reveal all scenarios with chosen answers and scores
- zone3Score = sum (max 100), dispatch + navigate to `/zone4`

### Step 4.4 — Zone 4: GreenSketch (Physical)
- Three tabs: "Participant Rules" | "Word Cards" | "Volunteer Entry"
- **Rules tab**: Zone header, physical round badge, 4 rules, scoring table (1-3=20, 4-6=40, 7-9=65, 10+=100)
- **Word Cards tab**: "Reveal Words" button → shows 25 word chips in a grid. Tap to toggle "Used" (opacity-40 + line-through). "Reset All" button.
- **Volunteer tab**: PIN gate (2604) → team ID, correct guesses number input (0-20), auto-calculated score display, save button

### Step 4.5 — Tech Trivia (Digital)
- 20 MCQs shown one at a time, 5-minute timer
- Progress: "Question X of 20" + progress bar
- 4 option buttons per question
- On select: instant green/red flash feedback. Wrong = show correct answer highlighted. Auto-advance after 1.5s. No going back.
- Final screen: score + tier message (Tech Genius/Savvy/Getting There/Keep Learning)
- Dispatch score + "View Leaderboard →" button

---

## Phase 5: Leaderboard & Admin Panel

### Step 5.1 — Team Score Lookup
- Team ID input → shows team's score breakdown table (Z1-Z4 + Trivia, status icons ✅/⏳, total XX/500)

### Step 5.2 — Animated Podium
- Top 3 teams displayed as podium blocks (Gold center tall, Silver left, Bronze right)
- Each: team ID + total score, animated entrance

### Step 5.3 — Global Rankings Table
- All teams sorted by total score descending
- Columns: Rank, Team ID, Z1, Z2, Z3, Z4, Trivia, Total
- Alternating row shading, highlight current team

### Step 5.4 — Admin Panel (PIN: 2604)
- PIN input to unlock
- **Team management**: Add new team (name + ID), edit any team's name/scores per zone, delete team
- **Bulk actions**: "Reset Leaderboard" (with confirmation dialog), "Export CSV" (downloads all team data)
- All changes persist to localStorage immediately
- Support for 12+ teams (no hardcoded limit)

---

## Phase 6: Polish & Responsiveness

### Step 6.1 — Animations
- Framer-motion page transitions on all zone routes (fade + slide)
- Scroll-triggered fade-rise animations on landing page sections (using Intersection Observer)
- Podium entrance animations on leaderboard
- Timer pulse-glow effect at 30s remaining

### Step 6.2 — Mobile Responsiveness
- All grids collapse to single column below 768px
- Landing nav → hamburger menu
- Zone nav → simplified (hide progress dots, keep back + team chip)
- Touch-friendly quiz option cards (min 44px tap targets)
- Sticky summary card becomes inline on mobile

### Step 6.3 — Final QA Checks
- Landing page cream bg on ALL sections
- Zone pages dark bg consistently
- Nav sticky behavior correct
- Accordion open/close smooth
- Registration sets teamId + navigates
- Leaderboard loads from localStorage on mount
- All timers auto-submit on expiry
- Volunteer PIN gates work
- CSV export includes all fields

---

### File Creation Summary

```text
NEW FILES (~30):
src/types/index.ts
src/store/gameStore.tsx
src/data/faq.ts
src/data/testimonials.ts
src/data/zones.ts
src/data/techTrivia.ts
src/data/zone2Data.ts
src/data/zone3Data.ts
src/data/zone4Words.ts
src/components/landing/LandingNav.tsx
src/components/landing/HeroSection.tsx
src/components/landing/PullQuoteSection.tsx
src/components/landing/OrganizerSection.tsx
src/components/landing/WhatYoullTackle.tsx
src/components/landing/ZoneBreakdown.tsx
src/components/landing/TestimonialsSection.tsx
src/components/landing/TickerBar.tsx
src/components/landing/FAQSection.tsx
src/components/landing/RegistrationSection.tsx
src/components/landing/LandingFooter.tsx
src/components/shared/ZoneNav.tsx
src/components/shared/TimerBar.tsx
src/components/shared/QuizOption.tsx
src/components/shared/ZoneHeader.tsx
src/components/shared/ScoreCard.tsx
src/components/shared/CompletionModal.tsx
src/components/shared/VolunteerPanel.tsx
src/pages/LandingPage.tsx
src/pages/zones/Zone1PowerPuzzle.tsx
src/pages/zones/Zone2CarbonQuest.tsx
src/pages/zones/Zone3ClimateDecision.tsx
src/pages/zones/Zone4GreenSketch.tsx
src/pages/zones/TechTrivia.tsx
src/pages/Leaderboard.tsx

MODIFIED FILES:
src/index.css
tailwind.config.ts
src/App.tsx
package.json
```

