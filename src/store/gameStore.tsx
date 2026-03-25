import React, { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import type { GameState, GameAction, LeaderboardEntry } from '@/types';

const STORAGE_KEY = 'gq_leaderboard';

const loadLeaderboard = (): LeaderboardEntry[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveLeaderboard = (lb: LeaderboardEntry[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lb));
};

const initialState: GameState = {
  teamId: '',
  teamName: '',
  zone1Score: 0,
  zone2Score: 0,
  zone3Score: 0,
  zone4Score: 0,
  triviaScore: 0,
  completedZones: [],
  currentView: 'landing',
  leaderboard: loadLeaderboard(),
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'SET_TEAM_ID':
      return { ...state, teamId: action.teamId, teamName: action.teamName || action.teamId };
    case 'SET_ZONE_SCORE': {
      const key = action.zone === 'trivia' ? 'triviaScore' : `${action.zone}Score` as keyof GameState;
      return { ...state, [key]: action.score };
    }
    case 'COMPLETE_ZONE':
      if (state.completedZones.includes(action.zone)) return state;
      return { ...state, completedZones: [...state.completedZones, action.zone] };
    case 'SET_VIEW':
      return { ...state, currentView: action.view };
    case 'SUBMIT_TO_LEADERBOARD': {
      const total = state.zone1Score + state.zone2Score + state.zone3Score + state.zone4Score + state.triviaScore;
      const entry: LeaderboardEntry = {
        teamId: state.teamId,
        teamName: state.teamName || state.teamId,
        zone1: state.zone1Score,
        zone2: state.zone2Score,
        zone3: state.zone3Score,
        zone4: state.zone4Score,
        trivia: state.triviaScore,
        total: Math.min(total, 500),
        timestamp: Date.now(),
      };
      const existingIdx = state.leaderboard.findIndex(e => e.teamId === state.teamId);
      let newLb: LeaderboardEntry[];
      if (existingIdx >= 0) {
        newLb = [...state.leaderboard];
        newLb[existingIdx] = entry;
      } else {
        newLb = [...state.leaderboard, entry];
      }
      saveLeaderboard(newLb);
      return { ...state, leaderboard: newLb };
    }
    case 'RESET_GAME':
      return { ...initialState, leaderboard: state.leaderboard };
    case 'LOAD_LEADERBOARD':
      return { ...state, leaderboard: loadLeaderboard() };
    case 'UPDATE_TEAM': {
      const newLb = state.leaderboard.map(e => {
        if (e.teamId === action.teamId) {
          const updated = { ...e, ...action.data };
          updated.total = updated.zone1 + updated.zone2 + updated.zone3 + updated.zone4 + updated.trivia;
          return updated;
        }
        return e;
      });
      saveLeaderboard(newLb);
      return { ...state, leaderboard: newLb };
    }
    case 'DELETE_TEAM': {
      const newLb = state.leaderboard.filter(e => e.teamId !== action.teamId);
      saveLeaderboard(newLb);
      return { ...state, leaderboard: newLb };
    }
    case 'ADD_TEAM': {
      const entry = { ...action.entry, total: action.entry.zone1 + action.entry.zone2 + action.entry.zone3 + action.entry.zone4 + action.entry.trivia };
      const newLb = [...state.leaderboard, entry];
      saveLeaderboard(newLb);
      return { ...state, leaderboard: newLb };
    }
    case 'RESET_LEADERBOARD': {
      saveLeaderboard([]);
      return { ...state, leaderboard: [] };
    }
    default:
      return state;
  }
}

const GameContext = createContext<{ state: GameState; dispatch: React.Dispatch<GameAction> } | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  useEffect(() => {
    dispatch({ type: 'LOAD_LEADERBOARD' });
  }, []);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}
