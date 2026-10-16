import { createHash, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";

const digest = (s) => createHash("sha256").update(s).digest();

/** Write endpoints require header `x-api-key: $ADMIN_API_KEY`. Swap for real auth (Supabase Auth, NextAuth) when needed. */
export function isAdmin(req) {
  const expected = process.env.ADMIN_API_KEY;
  const provided = req.headers.get("x-api-key");
  if (!expected || !provided) return false;
  return timingSafeEqual(digest(expected), digest(provided));
}

export const unauthorized = () => NextResponse.json({ error: "Unauthorized" }, { status: 401 });
