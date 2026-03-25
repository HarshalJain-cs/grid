export interface GameState {
  teamId: string;
  teamName: string;
  isVolunteer: boolean;
  zone1Score: number;
  zone2Score: number;
  zone3Score: number;
  zone4Score: number;
  triviaScore: number;
  completedZones: string[];
  currentView: string;
  leaderboard: LeaderboardEntry[];
}

export interface LeaderboardEntry {
  teamId: string;
  teamName: string;
  zone1: number;
  zone2: number;
  zone3: number;
  zone4: number;
  trivia: number;
  total: number;
  timestamp: number;
}

export type GameAction =
  | { type: 'SET_TEAM_ID'; teamId: string; teamName?: string }
  | { type: 'SET_VOLUNTEER'; isVolunteer: boolean }
  | { type: 'SET_ZONE_SCORE'; zone: 'zone1' | 'zone2' | 'zone3' | 'zone4' | 'trivia'; score: number }
  | { type: 'COMPLETE_ZONE'; zone: string }
  | { type: 'SET_VIEW'; view: string }
  | { type: 'SUBMIT_TO_LEADERBOARD' }
  | { type: 'RESET_GAME' }
  | { type: 'LOAD_LEADERBOARD' }
  | { type: 'UPDATE_TEAM'; teamId: string; data: Partial<Omit<LeaderboardEntry, 'teamId'>> }
  | { type: 'DELETE_TEAM'; teamId: string }
  | { type: 'ADD_TEAM'; entry: LeaderboardEntry }
  | { type: 'RESET_LEADERBOARD' };

export interface TriviaQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

export interface LifestyleQuestion {
  id: string;
  label: string;
  options: { text: string; value: number }[];
}

export interface CampusUpgrade {
  name: string;
  cost: number;
  impact: number;
  emoji: string;
}

export interface ComboBonus {
  items: [string, string];
  bonus: number;
  label: string;
  emoji: string;
}

export interface Riddle {
  question: string;
  options: string[];
  correctIndex: number;
  points: number;
}

export interface ClimateScenario {
  title: string;
  description: string;
  options: {
    text: string;
    tags: string;
    score: number;
  }[];
}
