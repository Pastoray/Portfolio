# Data-driven developer portfolio

Next.js (App Router) · Tailwind CSS · Lucide · Web3Forms Serverless Mailing.

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
        └── lib/data.js     → upserts the same data into PostgreSQL

app/
  layout.jsx                shared shell: ambient blobs, floating nav, top bar, footer
  template.jsx              per-navigation entrance animation
  page.jsx · about/ · work/ · blog/ · gallery/   routes (ISR, revalidate = 60s)
  (No local API routes required. Form entries route directly to Web3Forms external API gateway)

lib/
  format.js                 Array utility maps, text validators, and localized clock layout utilities
  sections.js · stats.js    Data-derived nav structures and dynamic stats indicators

components/                 Typewriter · Reveal · CountUp · SpotlightProvider · Hero · Stats · TechStack · …
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
npm run dev
```

