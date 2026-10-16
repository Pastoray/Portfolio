import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;

function getClient() {
  if (!globalForPrisma.__prisma) {
    globalForPrisma.__prisma = new PrismaClient({
      log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
    });
  }
  return globalForPrisma.__prisma;
}

/**
 * Lazily instantiated so the site can run purely from data/portfolioConfig.js
 * (no DATABASE_URL) without ever touching the Prisma engine.
 */
export const prisma = new Proxy(
  {},
  {
    get: (_, prop) => getClient()[prop],
  }
);

export const hasDatabase = () => Boolean(process.env.DATABASE_URL);
