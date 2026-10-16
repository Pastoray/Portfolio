import { z } from "zod";

const text = (max = 200) => z.string().trim().min(1).max(max);
const optText = (max = 2000) => z.string().trim().max(max).nullish();
const url = z.string().trim().url().max(500);
const optUrl = url.nullish().or(z.literal("").transform(() => null));
// Image/asset URLs may be absolute (https://…) or site-relative (/images/x.jpg).
const asset = z
  .string()
  .trim()
  .min(1)
  .max(500)
  .refine((v) => /^(https?:\/\/|\/)/.test(v), "must be an http(s) URL or a /path");
const optAsset = asset.nullish().or(z.literal("").transform(() => null));
const list = z.array(z.string().trim().min(1).max(100)).max(50).default([]);
const slug = z
  .string()
  .trim()
  .min(1)
  .max(100)
  .regex(/^[a-z0-9-]+$/, "lowercase letters, numbers and dashes only");

export const experienceSchema = z.object({
  seedKey: z.string().max(100).nullish(),
  type: z.enum(["WORK", "EDUCATION"]),
  title: text(),
  organization: text(),
  location: optText(200),
  description: optText(),
  highlights: list,
  technologies: list,
  startDate: z.coerce.date(),
  endDate: z.coerce.date().nullish(),
});

export const projectSchema = z.object({
  slug,
  title: text(),
  summary: text(500),
  description: optText(20000),
  imageUrl: optAsset,
  liveUrl: optUrl,
  repoUrl: optUrl,
  technologies: list,
  featured: z.boolean().default(false),
  visible: z.boolean().default(true),
  publishedAt: z.coerce.date().optional(),
});

export const postSchema = z.object({
  slug,
  title: text(),
  excerpt: text(500),
  content: z.string().max(50000).default(""),
  coverUrl: optAsset,
  tags: list,
  visible: z.boolean().default(true),
  publishedAt: z.coerce.date().optional(),
});

export const gallerySchema = z.object({
  seedKey: z.string().max(100).nullish(),
  title: optText(200),
  caption: optText(500),
  imageUrl: asset,
  visible: z.boolean().default(true),
  takenAt: z.coerce.date().optional(),
});

export const skillSchema = z.object({
  name: text(80),
  category: text(80).default("General"),
  iconSlug: z.string().trim().max(60).nullish(),
  level: z.number().int().min(1).max(100).nullish(),
  sortOrder: z.number().int().default(0),
  visible: z.boolean().default(true),
});

export const profileSchema = z.object({
  fullName: text(120),
  headline: text(300),
  intro: z
    .object({
      prefix: z.string().max(200).default(""),
      emphasis: z.string().max(200).default(""),
      suffix: z.string().max(300).default(""),
    })
    .default({}),
  bio: text(4000),
  heroWords: list,
  location: optText(200),
  timezone: z.string().max(60).default("UTC"),
  avatarUrl: optAsset,
  availability: optText(200),
  languages: list,
  email: z.string().email().nullish(),
  resumeUrl: optAsset,
  socials: z
    .array(z.object({ type: z.enum(["github", "linkedin", "email", "twitter", "website"]), label: text(60), url: text(500) }))
    .max(12)
    .default([]),
});

export const messageSchema = z.object({
  name: text(120),
  email: z.string().trim().email().max(200),
  subject: optText(200),
  body: text(5000),
  website: z.string().max(0).optional(), // honeypot: must stay empty
});
