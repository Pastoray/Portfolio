import { prisma } from "@/lib/prisma";
import { isAdmin, unauthorized } from "@/lib/auth";
import { messageSchema } from "@/lib/validators";
import { respond, handleError } from "@/lib/crud";

export const dynamic = "force-dynamic";

// Naive in-memory limiter (per server instance). Use Upstash/Redis for multi-instance deployments.
const hits = new Map();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;

function limited(ip) {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || entry.reset < now) {
    hits.set(ip, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_HITS;
}

/** Public: contact form submissions. */
export async function POST(req) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    if (limited(ip)) return respond({ error: "Too many messages, try again later." }, 429);

    const { website, ...data } = messageSchema.parse(await req.json());
    await prisma.message.create({ data });
    return respond({ ok: true }, 201);
  } catch (err) {
    return handleError(err);
  }
}

/** Admin: inbox, newest first. ?unread=true to filter. */
export async function GET(req) {
  if (!isAdmin(req)) return unauthorized();
  try {
    const unread = new URL(req.url).searchParams.get("unread") === "true";
    const items = await prisma.message.findMany({
      where: unread ? { read: false } : {},
      orderBy: { createdAt: "desc" },
      take: 100,
    });
    return respond({ items });
  } catch (err) {
    return handleError(err);
  }
}
