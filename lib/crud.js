import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { prisma } from "./prisma";
import { isAdmin, unauthorized } from "./auth";

export const respond = (data, status = 200) => NextResponse.json(data, { status });

export function handleError(err) {
  if (err instanceof ZodError) return respond({ error: "Validation failed", issues: err.flatten() }, 422);
  if (err instanceof SyntaxError) return respond({ error: "Invalid JSON body" }, 400);
  if (err?.code === "P2025") return respond({ error: "Not found" }, 404);
  if (err?.code === "P2002") return respond({ error: "Already exists (unique constraint)" }, 409);
  if (!process.env.DATABASE_URL || err?.name === "PrismaClientInitializationError") {
    return respond({ error: "Database not configured or unavailable" }, 503);
  }
  console.error(err);
  return respond({ error: "Internal server error" }, 500);
}

/**
 * Builds collection + item route handlers for a Prisma model.
 *
 *  collection: GET (public, filtered)   POST (admin)
 *  item:       GET (public)   PATCH / DELETE (admin)
 *
 * Adding a new content type = one model + one schema + two 3-line route files.
 *
 * @param {object} opts
 * @param {string} opts.model        Prisma delegate name, e.g. "project"
 * @param {import('zod').ZodObject} opts.schema
 * @param {object|object[]} opts.orderBy
 * @param {object} [opts.publicWhere] filter applied to non-admin reads
 * @param {Record<string,'string'|'boolean'>} [opts.filters] allowed query-string filters
 */
export function createCrud({ model, schema, orderBy, publicWhere = {}, filters = {} }) {
  const db = () => prisma[model];
  const coerce = (v, kind) => (kind === "boolean" ? v === "true" : v);

  const collection = {
    async GET(req) {
      try {
        const sp = new URL(req.url).searchParams;
        const where = isAdmin(req) && sp.get("all") === "1" ? {} : { ...publicWhere };
        for (const [key, kind] of Object.entries(filters)) {
          const v = sp.get(key);
          if (v !== null) where[key] = coerce(v, kind);
        }
        const take = Math.min(Math.max(Number(sp.get("limit")) || 50, 1), 100);
        const skip = Math.max(Number(sp.get("offset")) || 0, 0);
        const [items, total] = await Promise.all([
          db().findMany({ where, orderBy, take, skip }),
          db().count({ where }),
        ]);
        return respond({ items, total });
      } catch (err) {
        return handleError(err);
      }
    },
    async POST(req) {
      if (!isAdmin(req)) return unauthorized();
      try {
        const data = schema.parse(await req.json());
        return respond(await db().create({ data }), 201);
      } catch (err) {
        return handleError(err);
      }
    },
  };

  const item = {
    async GET(req, ctx) {
      try {
        const { id } = await ctx.params;
        const row = await db().findFirst({ where: { id, ...(isAdmin(req) ? {} : publicWhere) } });
        return row ? respond(row) : respond({ error: "Not found" }, 404);
      } catch (err) {
        return handleError(err);
      }
    },
    async PATCH(req, ctx) {
      if (!isAdmin(req)) return unauthorized();
      try {
        const { id } = await ctx.params;
        const data = schema.partial().parse(await req.json());
        return respond(await db().update({ where: { id }, data }));
      } catch (err) {
        return handleError(err);
      }
    },
    async DELETE(req, ctx) {
      if (!isAdmin(req)) return unauthorized();
      try {
        const { id } = await ctx.params;
        await db().delete({ where: { id } });
        return respond({ ok: true });
      } catch (err) {
        return handleError(err);
      }
    },
  };

  return { collection, item };
}
