# Portfolio site — context

Single source of truth for the Kumar Shivam portfolio at
`/Applications/VsCode Works/0. MY explore/my portfolio/site/`.

## Live state

- **URL** — https://kumarshivam.vercel.app (clean alias).
- **Hosted on** — Vercel, project `kumarshivamiitbhu-7050s-projects/site`.
  The auto-generated long URLs (`site-xxxx-*.vercel.app`) are the canonical
  deployment URLs. The clean alias is repointed after every `vercel --prod`.
- **GitHub** — https://github.com/shivam5600/my-portfolio, branch `main`.
  Every commit on `main` is a candidate for production; deploy is a separate
  `vercel --prod` call (not auto-deploy from GitHub yet).
- **Deployment Protection** — Vercel SSO wall must be set to **Disabled** at
  https://vercel.com/kumarshivamiitbhu-7050s-projects/site/settings/deployment-protection
  for the site to be publicly viewable. Toggle it once; it's per-project, not
  per-deploy.

## What the site is

A dark-themed, motion-rich single-page portfolio modelled on the
motionsites.ai "Hi, I'm Jack" template, adapted for Kumar Shivam (Lead Product
Analyst at media.net, IIT BHU '23).

Sections in order:

1. **Navbar** (fixed top) — KUMAR SHIVAM · About · Journey · Projects ·
   Contact · Resume↓ distributed across the row. Mobile collapses to
   wordmark + hamburger overlay.
2. **Hero** — char-by-char animated "Hi, I'm Kumar" + role subline + Pixar
   floating-head portrait with spring-physics magnet + ambient figure-8
   drift + 8 Lucide icons + 16 skill chips (Claude, GPT-5, Python, SQL,
   pandas, A/B Testing, Product Analytics, LightGBM, Databricks, etc.) +
   subline + Contact Me + mobile-only ScrollHint.
3. **Marquee** — two rows of glass-tile skill tags, continuous slow CSS
   marquee (28s loop, opposite directions). Mobile shows ~3 tiles/row.
4. **About** — gradient "About me" heading + 4 decor corner images +
   `AnimatedText` paragraph (word-by-word `whileInView` entrance with
   blur/y/scale, fires at `amount: 0.1`) + Contact button.
5. **Journey** — 6 milestones (2019 IIT BHU → Aug 2021 Apna → Jan 2022 MPL →
   Nov 2023 media.net Senior → Jan 2025 media.net Lead → 2026 still Lead).
   Clearbit-CDN logos with initials fallback (`IIT`, `APNA`, `MPL`, `MNET`).
   Scroll-progress line completes by ~70% section scroll.
6. **Services** — white-background "What I do" with 5 numbered items
   (AI Builder · Experimentation · Product Analytics · Forecasting/RCA ·
   Roadmapping). Framed for APM/PM/DS-PA hiring screens.
7. **Projects** — sticky-stacking cards with personalised gpt-image-2 UI
   images. Click `Case Study →` for a modal with **Problem / What I did /
   Impact** structure + ESC close + `data-lenis-prevent` so the modal
   scrolls natively. 7 projects ordered: Prog Discovery → User Journey →
   Hermes → Overbidding → MPL Churn → MPL Cost → MPL Deposit.
8. **Contact** — email / phone / LinkedIn / GitHub rows + Resume download
   + Email-me gradient button.
9. **Footer** — `© 2026 Kumar Shivam · All rights reserved.` + links.

## File layout

```
site/
├── CONTEXT.md                          THIS FILE
├── README.md                           user-facing setup/run docs
├── package.json                        Vite + React + TS + Tailwind + Framer + Lenis
├── vite.config.ts, tsconfig*.json, tailwind.config.ts, postcss.config.js
├── index.html                          <title>, meta, font preconnect, root div
│
├── public/
│   ├── favicon.svg                     KS monogram, gradient on dark
│   ├── Kumar_Shivam_Resume.pdf         linked from nav, hamburger, contact, footer
│   ├── portrait-3d.png                 Pixar floating head, chroma-keyed RGBA
│   └── projects/                       gpt-image-2 dashboard renders, one per slug
│       ├── prog-data-discovery.png
│       ├── user-journey.png
│       ├── hermes.png
│       ├── overbidding.png
│       ├── mpl-churn.png
│       ├── mpl-cost.png
│       └── mpl-deposit.png
│
├── scripts/                            asset generation (Python, FastRouter)
│   ├── generate_all_assets.py          batch portrait + 7 project images
│   ├── chroma_key_portrait.py          alpha-keys near-black bg of portrait
│   └── make_portrait.py                older PIL-only stylizer (placeholder path)
│
└── src/
    ├── App.tsx                         composes SmoothScroll + bg + sections
    ├── main.tsx                        React entry
    ├── index.css                       Tailwind + .hero-heading gradient +
    │                                     orb keyframes + marquee keyframes +
    │                                     scroll-progress bar + portrait mask
    ├── data/                           ALL content lives here, never in components
    │   ├── timeline.ts                 6 milestones + Clearbit logos + initials
    │   ├── tools.ts                    2 marquee rows of tool tags
    │   ├── services.ts                 5 "What I do" items
    │   └── projects.ts                 7 projects: problem/whatIDid/impact +
    │                                     image path + 3 gradient signatures
    ├── components/
    │   ├── ui/                         reusable primitives
    │   │   ├── FadeIn.tsx              whileInView opacity+translate wrapper
    │   │   ├── Magnet.tsx              spring-physics mouse-follow
    │   │   ├── ContactButton.tsx       gradient pill (magenta→orange)
    │   │   ├── OutlinePill.tsx         ghost outline pill (Case Study, etc.)
    │   │   ├── AnimatedText.tsx        word-by-word entrance, whileInView
    │   │   ├── CursorGlow.tsx          spring-tracked radial-gradient glow
    │   │   ├── SmoothScroll.tsx        Lenis wrapper (reduced-motion respected)
    │   │   ├── ScrollProgress.tsx      thin gradient top bar
    │   │   ├── AnimatedBackground.tsx  3 drifting orbs + dot-grid + vignette
    │   │   ├── HeroDecor.tsx           8 Lucide icons + 16 floating skill chips
    │   │   └── ScrollHint.tsx          mobile-only bottom "SCROLL ↓" hint
    │   └── sections/
    │       ├── Navbar.tsx
    │       ├── Hero.tsx
    │       ├── Marquee.tsx
    │       ├── About.tsx
    │       ├── Journey.tsx
    │       ├── Services.tsx
    │       ├── Projects.tsx
    │       ├── Contact.tsx
    │       └── Footer.tsx
    └── vite-env.d.ts
```

## Where to edit common things

| Want to change… | Edit… |
|---|---|
| Timeline milestone (year, role, blurb, logo) | `src/data/timeline.ts` |
| Marquee tool tag | `src/data/tools.ts` (row 1 or row 2) |
| "What I do" entry | `src/data/services.ts` |
| Project name / problem / whatIDid / impact | `src/data/projects.ts` |
| Hero heading | `HEADING` const at top of `Hero.tsx` |
| Hero role subline | `Lead Product Analyst · IIT BHU Grad` inside `Hero.tsx` |
| Hero 3-line subline | `<p>` inside the bottom bar of `Hero.tsx` |
| Skill chips / Lucide icons in hero | `decors[]` array in `HeroDecor.tsx` |
| Marquee speed | `.marquee-left` / `.marquee-right` duration in `index.css` |
| Portrait drift range / speed | `<motion.div animate={{ x, y }}>` in `Hero.tsx` |
| Magnet feel | `Magnet.tsx` (`stiffness`, `damping`, `mass`) + `padding`/`strength` |
| Page background orbs | `.orb-1` / `.orb-2` / `.orb-3` in `index.css` |
| Contact email / LinkedIn / GitHub URL | `rows[]` in `Contact.tsx` |
| Resume PDF | replace `public/Kumar_Shivam_Resume.pdf` |
| Favicon | `public/favicon.svg` |

## Asset generation (FastRouter `openai/gpt-image-2`)

The portrait and project images are generated by Python scripts that call
FastRouter's image API. Auto tilak-removal is not used (RGB thresholding
smeared on this specific photo); the active workflow is gpt-image-2 with a
chroma-key post-process for the portrait.

### Re-generate the hero portrait

```bash
export FASTROUTER_API_KEY="sk-v1-..."          # never commit; rotate after use
cd "/Applications/VsCode Works/0. MY explore/my portfolio/site"
python3 scripts/generate_all_assets.py hero
python3 scripts/chroma_key_portrait.py          # alpha-key bg → transparent
```

The prompt lives in `HERO_PROMPT` near the top of `generate_all_assets.py`.
Modify and re-run. Each call is ~$0.05 and ~60s.

### Re-generate one or more project images

```bash
export FASTROUTER_API_KEY="sk-v1-..."
python3 scripts/generate_all_assets.py overbidding mpl-churn
# or all 7:
python3 scripts/generate_all_assets.py prog-data-discovery user-journey hermes overbidding mpl-churn mpl-cost mpl-deposit
```

Prompts live in `PROJECT_IMAGES[]` array. Each carries real numbers ($1.5M /
yr, -61%, 3% → 8%, etc.) so the renders are personalised, not generic
dashboards.

## Style / copy conventions (decided over many iterations)

- **No em-dashes** in any user-facing string (`—`, `–`). They read AI-written.
  Use commas, colons, periods, or parentheses instead. Em-dashes in code
  comments are fine; they never render.
- **Middle-dot (·)** is OK and used as a separator in subline, footer, meta.
- **"Vibe coding"** dropped from footer; replaced with "All rights reserved.".
- **Footer** is `© 2026 Kumar Shivam · All rights reserved.` exact wording.
- **Modal** drops the project image; title + Problem / What I did / Impact
  only. The card on the page already shows the visual.

## Motion rules (decided)

- **Scroll-driven motion** (Journey gradient line, dot brightness) must
  complete by ~70 % section scroll. `useScroll` offset:
  `['start 0.95', '0.7 0.15']`. Don't make viewers scroll past the section
  to see motion finish.
- **Entrance motion** (`whileInView`) fires at `amount: 0.1` so it kicks
  off as soon as the section starts to appear. `once: true` always — never
  re-trigger on re-scroll.
- **Continuous motion** (marquee, orbs, ScrollHint chevron) respects
  `prefers-reduced-motion: reduce` and stops.
- **Lenis smooth scroll** is gated on `prefers-reduced-motion` too. Modal
  scroll containers must carry `data-lenis-prevent` so wheel events reach
  the native overflow.

## Common workflows

### Local dev

```bash
cd "/Applications/VsCode Works/0. MY explore/my portfolio/site"
npm install                                    # one-time
npm run dev                                    # http://localhost:5173
```

If `npm install` hits ECONNREFUSED, that's the sandbox shell; run it from
a normal terminal. The build doesn't need anything local — Vercel installs
its own deps during deploy.

### Deploy

```bash
cd "/Applications/VsCode Works/0. MY explore/my portfolio/site"
git push origin main                           # push code first
vercel --prod --yes                            # build + ship to vercel
# Note the new Production URL it prints, then:
vercel alias set <new-prod-url> kumarshivam.vercel.app
```

The clean alias does NOT auto-follow new deployments. Always re-point it
after `vercel --prod`, or new commits will be live on the random URL but
`kumarshivam.vercel.app` will still serve the previous build.

### Add a new project

1. Append to `projects[]` in `src/data/projects.ts` with a unique `slug`.
2. Either:
   - Add the slug + prompt to `PROJECT_IMAGES[]` in
     `scripts/generate_all_assets.py` and run
     `python3 scripts/generate_all_assets.py <slug>`, OR
   - Drop a PNG at `public/projects/<slug>.png` manually.
3. The Projects card auto-renders the image; the modal renders the 3
   labelled sections.
4. Commit, push, redeploy.

## Security

- The FastRouter API key is **never** committed. Scripts read from
  `$FASTROUTER_API_KEY` env. Verify with `git grep` before any push.
- `.vercel/` is gitignored.
- Portrait backups (`public/portrait-3d.backup.png`,
  `public/portrait-3d.opaque.backup.png`) are gitignored — they're local
  rollback safety, not for the repo.
- The deployed bundle ships no secrets: there are no `VITE_*` env reads
  in `src/`.
- Resume PDF is in `public/` and intentionally world-readable.

## Cost log (FastRouter)

| Round | Calls | Cost (~) |
|---|---|---|
| Initial hero (Kumar realistic) | 1 | $0.05 |
| First project batch | 7 | $0.35 |
| Hero retries (tree-spirit → robot) | 2 | $0.10 |
| Project image regen (personalised numbers) | 7 | $0.35 |
| Hero (cartoon Kumar) | 1 | $0.05 |
| Hero (floating-head Kumar) | 1 | $0.05 |
| **Total** | **~19 calls** | **~$0.95 of $20** |

~$19 of the FastRouter budget remains. Rotate the key in the FastRouter
dashboard after every external sharing — the value was pasted in chat
during initial setup and is treated as compromised.

## Open follow-ups (none blocking)

- **Custom domain** — point a real domain (e.g. `kumarshivam.com`) at this
  Vercel project via Domains tab. The site keeps working at the
  `*.vercel.app` URL regardless.
- **GitHub Pages style auto-deploy** — connecting the GitHub repo to the
  Vercel project (Settings → Git) would make every `git push origin main`
  auto-deploy. Currently deploys are manual via `vercel --prod`.
- **README** still mentions the older portrait-tool workflow at length.
  Trim it down so it focuses on dev/build/deploy and points here for the
  deeper context.
