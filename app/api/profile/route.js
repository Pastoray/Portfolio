import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { isAdmin, unauthorized } from "@/lib/auth";
import { profileSchema } from "@/lib/validators";
import { respond, handleError } from "@/lib/crud";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const row = await prisma.profileInfo.findFirst({ orderBy: { updatedAt: "desc" } });
    return row ? respond(row) : respond({ error: "Not found" }, 404);
  } catch (err) {
    return handleError(err);
  }
}

/** Upserts the single profile row. */
export async function PUT(req) {
  if (!isAdmin(req)) return unauthorized();
  try {
    const data = profileSchema.parse(await req.json());
    const existing = await prisma.profileInfo.findFirst();
    const row = existing
      ? await prisma.profileInfo.update({ where: { id: existing.id }, data })
      : await prisma.profileInfo.create({ data });
    revalidatePath("/");
    return respond(row);
  } catch (err) {
    return handleError(err);
  }
}
