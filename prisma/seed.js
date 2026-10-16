import { PrismaClient } from "@prisma/client";
import { profile, workExperience, education, projects, posts, gallery, skills } from "../data/portfolioConfig.js";

const prisma = new PrismaClient();
const date = (v) => (v ? new Date(v) : null);

async function main() {
  // Profile: single row.
  const existing = await prisma.profileInfo.findFirst();
  if (existing) await prisma.profileInfo.update({ where: { id: existing.id }, data: profile });
  else await prisma.profileInfo.create({ data: profile });

  // Experiences (work + education) – upsert by stable key.
  const rows = [
    ...workExperience.map((e) => ({ ...e, type: "WORK" })),
    ...education.map((e) => ({ ...e, type: "EDUCATION" })),
  ];
  for (const { key, startDate, endDate, ...e } of rows) {
    const data = { ...e, startDate: date(startDate), endDate: date(endDate) };
    await prisma.experience.upsert({ where: { seedKey: key }, create: { seedKey: key, ...data }, update: data });
  }

  for (const { slug, publishedAt, ...p } of projects) {
    const data = { ...p, publishedAt: date(publishedAt) ?? new Date() };
    await prisma.project.upsert({ where: { slug }, create: { slug, ...data }, update: data });
  }

  for (const { slug, publishedAt, ...p } of posts) {
    const data = { ...p, publishedAt: date(publishedAt) ?? new Date() };
    await prisma.post.upsert({ where: { slug }, create: { slug, ...data }, update: data });
  }

  for (const { key, takenAt, ...g } of gallery) {
    const data = { ...g, takenAt: date(takenAt) ?? new Date() };
    await prisma.galleryItem.upsert({ where: { seedKey: key }, create: { seedKey: key, ...data }, update: data });
  }

  for (const { name, ...s } of skills) {
    await prisma.skill.upsert({ where: { name }, create: { name, ...s }, update: s });
  }

  console.log(
    `Seeded: ${rows.length} experiences, ${projects.length} projects, ${posts.length} posts, ${gallery.length} gallery items, ${skills.length} skills.`
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
