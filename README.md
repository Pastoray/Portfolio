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

## Where content lives

| Content | Source | How to change it |
| --- | --- | --- |
| Projects, blog posts, gallery | **Sanity** (`../studio-portfolio`) | Write and publish in the Studio; live within ~1 minute, no redeploy |
| Profile, skills, work history, education, page headings | `data/portfolioConfig.js` | Edit the file and redeploy |

If Sanity is not configured (no `NEXT_PUBLIC_SANITY_PROJECT_ID`) or can't be reached, the site falls back to the
`projects`, `posts` and `gallery` arrays in `data/portfolioConfig.js` and logs a `[getPortfolioData]` message.
Once your content is in Sanity those arrays are only an offline fallback; you can empty them.

## Architecture

```
data/portfolioConfig.js     ← profile, page copy, work, education, skills (+ fallback projects/posts/gallery)
Sanity (content lake)       ← projects, posts, gallery
        │
        └── lib/data.js     → merges both into one shape (cached per request)
              lib/sanity/   → env · client · image URL builder · GROQ queries
              components/RichText.jsx  → renders Sanity Portable Text (headings, lists, links, code, images)

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

Needs Node 22.12 or newer.

```bash
npm install
cp .env.example .env.local    # Sanity project id + dataset (public values) and your Web3Forms key
npm run dev
```

## Sanity

- **Environment variables** (also add these in Vercel under Settings → Environment Variables, then redeploy):
  `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET`. Both are public values, not secrets.
- **Studio:** lives in `../studio-portfolio` and stays standalone (not embedded in this app). See its README.
- **No CORS setup is needed:** the site reads Sanity on the server, never from the browser.
- **Images** come from Sanity's CDN with the hotspot/crop you set in the Studio. No `next.config` change is needed.
- **Posts or projects not showing?** Check the build/server logs for a `[getPortfolioData]` line. It says whether
  Sanity is unconfigured or the request failed, and the site is showing the config fallback.
- **Adding a new content type:** add its schema in the Studio, a GROQ query in `lib/sanity/queries.js`,
  a mapper in `lib/data.js`, and a route that renders it.
- **Upgrading to Next.js 16:** you can then switch to `next-sanity` for Live Content and Visual Editing.
  It isn't used today because its current releases require Next 16.

