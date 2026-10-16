import { prisma } from "@/lib/prisma";
import { isAdmin, unauthorized } from "@/lib/auth";
import { respond, handleError } from "@/lib/crud";

export const dynamic = "force-dynamic";

export async function PATCH(req, ctx) {
  if (!isAdmin(req)) return unauthorized();
  try {
    const { id } = await ctx.params;
    const { read = true } = await req.json().catch(() => ({}));
    return respond(await prisma.message.update({ where: { id }, data: { read: Boolean(read) } }));
  } catch (err) {
    return handleError(err);
  }
}

export async function DELETE(req, ctx) {
  if (!isAdmin(req)) return unauthorized();
  try {
    const { id } = await ctx.params;
    await prisma.message.delete({ where: { id } });
    return respond({ ok: true });
  } catch (err) {
    return handleError(err);
  }
}
