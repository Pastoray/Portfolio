# Data-driven developer portfolio

Next.js (App Router) · Tailwind CSS · Lucide · Prisma + PostgreSQL/Supabase.

## Routes

| Route | Content |
| --- | --- |
| `/` | Hero (typed/backspaced words), stats, tech-stack marquee, featured work, latest posts, contact |
| `/about` | Profile, stats, experience & education timelines, skills by category, contact |
| `/work`, `/work/[slug]` | All projects, project detail |
| `/blog`, `/blog/[slug]` | All articles (newest is featured), article detail |
| `/gallery` | Masonry image gallery |

The floating nav and footer are derived from the data (`lib/sections.js`): a route with no content
disappears from the nav, and visiting it directly shows an empty state instead of breaking.

## Architecture

```
data/portfolioConfig.js     ← single source of truth (profile, page copy, work, education, projects, posts, gallery, skills)
        │
        ├── prisma/seed.js  → upserts the same data into PostgreSQL
        └── lib/data.js     → site reads the DB if DATABASE_URL is set, else this file (cached per request)

app/
  layout.jsx                shared shell: ambient blobs, floating nav, top bar, footer
  template.jsx              per-navigation entrance animation
  page.jsx · about/ · work/ · blog/ · gallery/   routes (ISR, revalidate = 60s)
  api/
    profile/                GET · PUT (admin, upsert)
    experiences/ [id]/      CRUD   (?type=WORK|EDUCATION)
    projects/    [id]/      CRUD   (?featured=true)
    posts/       [id]/      CRUD
    gallery/     [id]/      CRUD
    skills/      [id]/      CRUD   (?category=…)
    messages/    [id]/      POST (public, honeypot + rate limit) · GET/PATCH/DELETE (admin)

lib/
  crud.js                   createCrud() factory → collection + item handlers for any Prisma model
  resources.js              one declarative entry per content type
  validators.js             zod schemas (shared by POST and PATCH)
  auth.js                   x-api-key admin check (constant-time)
  sections.js · stats.js    data-derived nav and headline numbers

components/                 Typewriter · Reveal · CountUp · SpotlightProvider · Hero · Stats · TechStack · …
supabase/schema.sql         raw SQL equivalent of the Prisma schema (+ RLS policies)
```

## Motion

- **Typewriter**: each hero word is typed, held, backspaced character by character, then the next is typed.
  Server render shows the first word complete; `prefers-reduced-motion` keeps it static.
- Scroll-reveal on sections and cards, count-up stats, cursor-following spotlight on cards,
  slow drifting background blobs, two-row opposing marquee, per-route entrance animation.
  All of it respects `prefers-reduced-motion`.

## Run

```bash
npm install
cp .env.example .env          # optional: leave DATABASE_URL blank to run from the config file
npm run dev
```

With a database:

```bash
npm run db:push               # or paste supabase/schema.sql into the Supabase SQL editor
npm run db:seed               # loads data/portfolioConfig.js
```

## Updating content

- **Config only:** edit `data/portfolioConfig.js`. Order is irrelevant; items are sorted newest-first.
  Page headings/subtitles live in the `pages` object (config-only, not stored in the DB).
- **Database:** call the API with `x-api-key: $ADMIN_API_KEY`, e.g.

```bash
curl -X POST localhost:3000/api/posts \
  -H "x-api-key: $ADMIN_API_KEY" -H "content-type: application/json" \
  -d '{"slug":"my-post","title":"My Post","excerpt":"Teaser","content":"First paragraph.\n\nSecond paragraph.","publishedAt":"2026-03-01"}'
```

It appears within 60 seconds and sorts itself by date via the `(visible, publishedAt desc)` index.
Body text (`description`, `content`) uses blank lines to separate paragraphs.

## Adding a new content type

1. Add a Prisma model (+ index on its sort field) and the matching table in `supabase/schema.sql`.
2. Add a zod schema in `lib/validators.js`.
3. Add `createCrud({...})` in `lib/resources.js` and two 3-line route files under `app/api/`.
4. Load it in `lib/data.js`, add a route under `app/`, and list it in `lib/sections.js`.
