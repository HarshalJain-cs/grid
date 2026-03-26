import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// --- Teams ---

export const registerTeam = mutation({
  args: {
    teamId: v.string(),
    teamName: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("teams")
      .withIndex("by_teamId", (q) => q.eq("teamId", args.teamId))
      .first();
    if (existing) return;
    await ctx.db.insert("teams", {
      teamId: args.teamId,
      teamName: args.teamName || args.teamId,
      registeredAt: Date.now(),
    });
  },
});

export const getTeam = query({
  args: { teamId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("teams")
      .withIndex("by_teamId", (q) => q.eq("teamId", args.teamId))
      .first();
  },
});

export const listTeams = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("teams").collect();
  },
});

// --- Leaderboard ---

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("leaderboard").collect();
  },
});

export const upsert = mutation({
  args: {
    teamId: v.string(),
    teamName: v.string(),
    zone1: v.number(),
    zone2: v.number(),
    zone3: v.number(),
    zone4: v.number(),
    trivia: v.number(),
    total: v.number(),
    timestamp: v.number(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("leaderboard")
      .withIndex("by_teamId", (q) => q.eq("teamId", args.teamId))
      .first();
    if (existing) {
      await ctx.db.patch(existing._id, args);
    } else {
      await ctx.db.insert("leaderboard", args);
    }
  },
});

export const updateZoneScore = mutation({
  args: {
    teamId: v.string(),
    teamName: v.string(),
    zone: v.string(),
    score: v.number(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("leaderboard")
      .withIndex("by_teamId", (q) => q.eq("teamId", args.teamId))
      .first();

    if (existing) {
      const update: Record<string, number | string> = {
        [args.zone]: args.score,
        timestamp: Date.now(),
      };
      const updated = { ...existing, ...update };
      const total = (updated.zone1 as number) + (updated.zone2 as number) +
        (updated.zone3 as number) + (updated.zone4 as number) + (updated.trivia as number);
      update.total = Math.min(total, 380);
      await ctx.db.patch(existing._id, update);
    } else {
      const entry: Record<string, number | string> = {
        teamId: args.teamId,
        teamName: args.teamName,
        zone1: 0,
        zone2: 0,
        zone3: 0,
        zone4: 0,
        trivia: 0,
        total: 0,
        timestamp: Date.now(),
      };
      entry[args.zone] = args.score;
      entry.total = Math.min(args.score, 380);
      await ctx.db.insert("leaderboard", entry as any);
    }
  },
});

export const updateTeam = mutation({
  args: {
    teamId: v.string(),
    data: v.object({
      teamName: v.optional(v.string()),
      zone1: v.optional(v.number()),
      zone2: v.optional(v.number()),
      zone3: v.optional(v.number()),
      zone4: v.optional(v.number()),
      trivia: v.optional(v.number()),
    }),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("leaderboard")
      .withIndex("by_teamId", (q) => q.eq("teamId", args.teamId))
      .first();
    if (!existing) return;
    const updated = { ...existing, ...args.data };
    updated.total = (updated.zone1 ?? 0) + (updated.zone2 ?? 0) + (updated.zone3 ?? 0) + (updated.zone4 ?? 0) + (updated.trivia ?? 0);
    await ctx.db.patch(existing._id, { ...args.data, total: updated.total });
  },
});

export const deleteTeam = mutation({
  args: { teamId: v.string() },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("leaderboard")
      .withIndex("by_teamId", (q) => q.eq("teamId", args.teamId))
      .first();
    if (existing) {
      await ctx.db.delete(existing._id);
    }
  },
});

export const resetAll = mutation({
  args: {},
  handler: async (ctx) => {
    const all = await ctx.db.query("leaderboard").collect();
    for (const entry of all) {
      await ctx.db.delete(entry._id);
    }
  },
});
