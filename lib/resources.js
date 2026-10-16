import { createCrud } from "./crud";
import { experienceSchema, projectSchema, postSchema, gallerySchema, skillSchema } from "./validators";

// One declarative entry per content type. Routes just re-export these handlers.

export const experiences = createCrud({
  model: "experience",
  schema: experienceSchema,
  orderBy: { startDate: "desc" }, // newest first, served by the (type, startDate desc) index
  filters: { type: "string" }, // ?type=WORK | EDUCATION
});

export const projects = createCrud({
  model: "project",
  schema: projectSchema,
  orderBy: { publishedAt: "desc" },
  publicWhere: { visible: true },
  filters: { featured: "boolean" },
});

export const posts = createCrud({
  model: "post",
  schema: postSchema,
  orderBy: { publishedAt: "desc" },
  publicWhere: { visible: true },
});

export const gallery = createCrud({
  model: "galleryItem",
  schema: gallerySchema,
  orderBy: { takenAt: "desc" },
  publicWhere: { visible: true },
});

export const skills = createCrud({
  model: "skill",
  schema: skillSchema,
  orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  publicWhere: { visible: true },
  filters: { category: "string" },
});
