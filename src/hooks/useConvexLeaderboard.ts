import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { LeaderboardEntry } from "@/types";

export function useConvexLeaderboard() {
  const data = useQuery(api.leaderboard.list);
  const upsert = useMutation(api.leaderboard.upsert);
  const updateTeam = useMutation(api.leaderboard.updateTeam);
  const deleteTeam = useMutation(api.leaderboard.deleteTeam);
  const resetAll = useMutation(api.leaderboard.resetAll);

  const leaderboard: LeaderboardEntry[] = (data ?? []).map((d) => ({
    teamId: d.teamId,
    teamName: d.teamName,
    zone1: d.zone1,
    zone2: d.zone2,
    zone3: d.zone3,
    zone4: d.zone4,
    trivia: d.trivia,
    total: d.total,
    timestamp: d.timestamp,
  }));

  return {
    leaderboard,
    isLoading: data === undefined,
    upsertEntry: async (entry: LeaderboardEntry) => {
      await upsert(entry);
    },
    updateEntry: async (teamId: string, data: Partial<Omit<LeaderboardEntry, 'teamId'>>) => {
      await updateTeam({ teamId, data });
    },
    deleteEntry: async (teamId: string) => {
      await deleteTeam({ teamId });
    },
    resetLeaderboard: async () => {
      await resetAll();
    },
  };
}
