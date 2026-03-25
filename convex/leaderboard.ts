import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

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
