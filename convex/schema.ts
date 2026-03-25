import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  teams: defineTable({
    teamId: v.string(),
    teamName: v.string(),
    registeredAt: v.number(),
  }).index("by_teamId", ["teamId"]),

  leaderboard: defineTable({
    teamId: v.string(),
    teamName: v.string(),
    zone1: v.number(),
    zone2: v.number(),
    zone3: v.number(),
    zone4: v.number(),
    trivia: v.number(),
    total: v.number(),
    timestamp: v.number(),
  }).index("by_teamId", ["teamId"]),
});
