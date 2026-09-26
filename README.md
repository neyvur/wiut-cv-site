# WIUT Hackathon 2026 — Traffic Event Detection & Accident Anticipation

Public team website for the **WIUT Hackathon 2026 — Computer Vision
Elimination Task**: *Toyota Traffic Event Detection and Accident
Anticipation from a Fixed Road Camera.*

Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and
Recharts. No experimental results, accuracy numbers, or team details are
hard-coded — every one of those lives behind a `[PLACEHOLDER]` until you
fill it in.

---

## 1. Project structure

```
src/
├── app/
│   ├── layout.tsx        # fonts, <html>/<body>, page metadata
│   ├── page.tsx           # assembles every section, in order
│   └── globals.css        # base styles, grid backdrop, scrollbar
├── components/
│   ├── Navbar.tsx, Hero.tsx, EventClasses.tsx, Pipeline.tsx,
│   │   AccidentAnticipation.tsx, EDA.tsx, SampleVideos.tsx,
│   │   TechnicalApproach.tsx, Evaluation.tsx, Team.tsx, TechStack.tsx,
│   │   Report.tsx, FailureAnalysis.tsx, GithubSection.tsx, Footer.tsx
│   ├── live-demo/
│   │   ├── LiveDemo.tsx       # upload → analyze → visualize workstation
│   │   ├── VideoPlayer.tsx    # <video> wrapper with imperative seek
│   │   ├── EventTimeline.tsx  # reusable timeline (click-to-jump)
│   │   ├── EventList.tsx
│   │   └── RiskChart.tsx      # Part B risk curve (Recharts)
│   └── ui/                     # Container, Panel, Pill, Accordion, EmptyState…
├── config/
│   └── site.ts             # ← THE FILE YOU EDIT. Team, links, event
│                              classes, pipeline steps, evaluation weights.
└── lib/
    ├── api.ts               # analyzeVideo(), getSampleResults() — the
    │                          only place that talks to a backend
    ├── mockData.ts           # local demo-mode data generator
    ├── types.ts
    └── format.ts
```

## 2. Install & run locally

Requires Node.js 18.18+ (Node 20/22 recommended).

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## 3. Production build

```bash
npm run build
npm start
```

`npm run build` runs type-checking and linting as part of the build —
if it fails, the terminal output tells you exactly which file and line.

## 4. Deploy to Vercel

**Option A — CLI**
```bash
npm install -g vercel
vercel        # first deploy, follow the prompts
vercel --prod # promote to production
```

**Option B — Git integration**
1. Push this repository to GitHub.
2. In Vercel: **New Project → Import Git Repository**, select the repo.
3. Framework preset "Next.js" is auto-detected — no config changes needed.
4. Deploy. Every push to the main branch redeploys automatically.

No environment variables are required to deploy — the site runs in
**demo mode** out of the box (see below).

---

## 5. Where to plug in real information

Almost everything below is edited in **`src/config/site.ts`** unless noted.

| What | Where |
|---|---|
| Team name | `TEAM_NAME` |
| Team members, roles, bios, links, contributions | `TEAM_MEMBERS` |
| GitHub repo URL | `LINKS.github` |
| Website domain | `LINKS.website` |
| Detector / tracker / accident model names | `TECH_STACK` |
| Datasets used | `DATASETS_NOTE` |

### Real videos
- **Hero graphic**: `src/components/Hero.tsx` — swap the illustrative
  `<svg>` scene for a real frame or short looping clip once footage is
  available.
- **Sample videos**: edit `getSampleResults()` in `src/lib/api.ts`. Drop
  clips into `/public/samples/` and return real `videoUrl`,
  `duration`, `resolution`, `fps`, and `events` for each one — the
  `SampleVideos` component renders whatever this function returns, so
  adding a 4th or 5th sample is just adding another entry to the array.

### Real model results / the live backend
- Set `LINKS.demoApi` in `src/config/site.ts` to your backend's base
  URL. As soon as it's not a `[PLACEHOLDER]`, `src/lib/api.ts`
  automatically stops generating mock data and calls:
  - `POST {demoApi}/api/analyze` — multipart `video` file in, JSON
    `{ events, risk, meta }` out (see `AnalyzeVideoResponse` in
    `src/lib/types.ts` for the exact shape).
  - `GET {demoApi}/api/samples` — same shape, one entry per sample video.
- Until then, the Live Demo clearly labels every result as **"Demo
  mode — mock results"** and shows a footer note that the numbers are
  not model output. Do not remove that labeling without a real backend
  behind it.

### EDA data
`src/components/EDA.tsx` — the metadata cards (`METADATA_CARDS`) and
chart panels currently render as `[DATA NEEDED]` empty states so the
site never shows invented numbers. Once you've analyzed the sample
videos, replace the placeholder cards with real values and swap the
empty-state chart panels for actual `recharts` charts (see
`RiskChart.tsx` for a working example of the same chart library).

### Failure analysis / report / evaluation results
- `src/components/FailureAnalysis.tsx` — replace each `[EXAMPLE
  NEEDED]` empty state with a real clip + explanation once you have
  failure cases from testing.
- `src/components/Report.tsx` — replace `PLACEHOLDER_BY_SECTION`
  entries with your actual write-up. This section is written to double
  as the short technical report the submission requires.
- `src/components/Evaluation.tsx` reads its formula weights from
  `EVALUATION` in `site.ts` — only change these if the organizers
  publish different weights. Do not add a results panel with real
  scores until you have them.

---

## 6. Design notes

- Palette, type scale, and the grid/HUD motifs live in
  `tailwind.config.ts` and `src/app/globals.css`.
- Fonts (Space Grotesk / Inter / JetBrains Mono) load via
  `next/font/google` in `src/app/layout.tsx` — this requires normal
  internet access at build time (Vercel has this by default).
- Event-class colors (critical / hazard / violation / behavior) are
  defined once in `TIER_META` in `site.ts` and reused by the timeline,
  event list, and class grid — change a color there and it updates
  everywhere.

## 7. Honesty checklist before you submit

- [ ] No accuracy/F1/AP numbers anywhere unless they're real
- [ ] Live Demo either connects to a real backend or still says "Demo mode"
- [ ] EDA charts show real data or the `[DATA NEEDED]` empty state — never both mixed silently
- [ ] Team section has real names, roles, and contributions
- [ ] GitHub link points at the actual public repository
