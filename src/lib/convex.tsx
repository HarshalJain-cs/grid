import { ConvexProvider, ConvexReactClient } from "convex/react";
import type { ReactNode } from "react";

const rawUrl = import.meta.env.VITE_CONVEX_URL as string;
const convexUrl = rawUrl?.trim();

let convex: ConvexReactClient | null = null;
try {
  if (convexUrl) {
    convex = new ConvexReactClient(convexUrl);
  }
} catch (e) {
  console.warn("Failed to initialize Convex client:", e);
}

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  if (!convex) return <>{children}</>;
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
