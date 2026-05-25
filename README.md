# Kumar Shivam — Portfolio

A dark, motion-rich portfolio site for **Kumar Shivam** — Lead Product Analyst at media.net, IIT BHU '23.

Built with Vite · React · TypeScript · Tailwind CSS · Framer Motion · Lenis · Lucide.

---

## Quick start

```bash
cd site
npm install
npm run dev
```

Open http://localhost:5173 — the dev server has Hot Module Reload.

### Production build

```bash
npm run build
npm run preview      # local preview of the built bundle
```

The build output goes to `dist/` — that's what gets deployed to Vercel.

---

## Replace the placeholder portrait with your real 3D image

The hero shows `/public/portrait-3d.png`. The current file was produced by `scripts/make_portrait.py` — a cinematic-graded, alpha-vignetted version of `photo/IMG_7518.jpg`. It looks decent on the dark background but isn't a true 3D render.

### Option A — Generate a real 3D render via a free AI tool (recommended)

Higgs.ai (the source of the original motionsite portraits) is paid. **Free** image-to-image alternatives that preserve likeness:

| Tool | Free tier | Image-reference? |
|---|---|---|
| **Leonardo.ai** | 150 credits/day | Yes (Image Guidance) |
| **Krea.ai** | Daily generation budget | Yes |
| **Hugging Face Spaces** | Unlimited (slow) | Yes — search "photo to 3D portrait" |
| **Adobe Firefly** | 25 generations/month | Yes |
| **Bing Image Creator** | Free, unlimited | No (text-only) |

Workflow on Leonardo.ai (fastest free path):

1. Sign up at **https://leonardo.ai** (free).
2. New generation → enable **Image Guidance** → upload `photo/IMG_7518.jpg`.
3. Paste this prompt:

   > Photorealistic 3D rendered character portrait of an Indian man in his late 20s, short dark hair with natural texture, well-groomed short beard and moustache, square-frame yellow eyeglasses with subtle blue-tinted lenses, calm confident expression, head-and-shoulders composition, centred, cinematic dark moody studio lighting with soft cool rim light, slight teal-magenta shadow accents, plain pure black background (#0C0C0C), Octane render, ultra-detailed skin shading, neutral dark sweater, professional editorial look. Preserve face likeness from reference. 1:1 square crop.

4. Style: `3D Render` / `Cinematic`. Aspect: `1:1`.
5. Generate, download the best result (1024×1024 PNG).
6. If the background isn't pure black/transparent, run it through **https://remove.bg** (free).
7. Save to **`site/public/portrait-3d.png`** (overwrite).

### Option B — Manual fix on the existing placeholder (no AI tool)

The current placeholder has a small red tilak on the forehead. To remove without regenerating:

1. Open **https://www.photopea.com** (free Photoshop clone in the browser).
2. Open `photo/IMG_7518.jpg`.
3. Spot Heal brush over the tilak → it'll auto-replace with surrounding skin.
4. Export as `portrait-3d.png`, save into `site/public/`.
5. Or run `python3 scripts/make_portrait.py` to apply the cinematic grade + vignette on top.

### Option C — Just regenerate via the included script

Already shipped. Run from the site root:

```bash
python3 scripts/make_portrait.py
```

It reads `../photo/IMG_7518.jpg` (your selfie), squares + crops to head-and-shoulders, applies cinematic colour grade (slight desaturation, contrast boost, teal-lift in shadows + warm-lift in highlights), and adds a radial alpha vignette so the edges fade into the dark background. Writes to `public/portrait-3d.png`.

Auto tilak-removal is disabled in the script (the tilak's RGB values are too close to surrounding skin for naive thresholding — it smeared across the face on first attempt). Re-enable via `REMOVE_TILAK = True` in `main()` if you want to experiment.

---

## What's where

```
site/
├── public/
│   ├── favicon.svg                       KS monogram on dark
│   ├── portrait-3d.png                   placeholder = IMG_7518; replace with AI render
│   └── Kumar_Shivam_Resume.pdf           resume, accessible from Nav + Contact + Footer
├── src/
│   ├── App.tsx                           composes everything
│   ├── main.tsx                          React entry
│   ├── index.css                         Tailwind + .hero-heading gradient + portrait mask
│   ├── data/                             content (one file per concern)
│   │   ├── timeline.ts                   IIT → Apna → MPL → media.net journey nodes
│   │   ├── tools.ts                      marquee tiles
│   │   ├── services.ts                   "What I do" — 5 items
│   │   └── projects.ts                   7 projects, ordered #1 Prog Discovery → #7 USA Deposit
│   └── components/
│       ├── ui/                           reusable primitives
│       │   ├── FadeIn.tsx                Framer Motion whileInView wrapper
│       │   ├── Magnet.tsx                mouse-following magnetic effect (hero portrait)
│       │   ├── ContactButton.tsx         gradient pill — magenta→purple→orange
│       │   ├── OutlinePill.tsx           ghost outline pill — Case Study buttons
│       │   ├── AnimatedText.tsx          char-by-char opacity reveal on scroll
│       │   ├── CursorGlow.tsx            spring-physics mouse-tracking radial glow
│       │   ├── SmoothScroll.tsx          Lenis wrapper for buttery scroll
│       │   └── ScrollProgress.tsx        thin gradient progress bar at top
│       └── sections/
│           ├── Navbar.tsx                fixed top — About / Journey / Projects / Contact + Resume
│           ├── Hero.tsx                  "Hi, i'm Kumar" + portrait + subline + Contact
│           ├── Marquee.tsx               two scroll-driven rows of tool tiles
│           ├── About.tsx                 decor corners + AnimatedText paragraph
│           ├── Journey.tsx               4-milestone timeline with scroll-progress line
│           ├── Services.tsx              white bg, "What I do" — 5 numbered items
│           ├── Projects.tsx              sticky-stacking cards (7) + Case Study modal
│           ├── Contact.tsx               email / phone / LinkedIn / GitHub / Resume rows
│           └── Footer.tsx                copyright + links
└── ...config files
```

---

## Customising content

All content lives in `src/data/*.ts`. Editing copy never requires touching component code.

- **Timeline** → `data/timeline.ts`
- **Tools marquee** → `data/tools.ts`
- **What I do** items → `data/services.ts`
- **Projects** (categories, names, blurbs, highlights, card-art gradients) → `data/projects.ts`

Resume PDF lives at `public/Kumar_Shivam_Resume.pdf`. Replace it directly to update.

---

## Deploy to Vercel

1. Push this repo to **https://github.com/shivam5600/my-portfolio**:

   ```bash
   cd site
   git init
   git add .
   git commit -m "first commit"
   git branch -M main
   git remote add origin https://github.com/shivam5600/my-portfolio.git
   git push -u origin main
   ```

2. Go to **https://vercel.com/new** → import `shivam5600/my-portfolio` → framework preset **Vite** (or "Other Framework"). Build command: `npm run build`. Output dir: `dist`.

3. Click Deploy. Site is live at `<repo>.vercel.app` in ~60s. Custom domain in Vercel project settings whenever you want.

Auto-deploys on every `git push` to `main`.

---

## Motion & UX features

- **Smooth scroll** — Lenis ease curve, momentum-aware on trackpads and touch.
- **Cursor glow** — spring-physics radial-gradient follows the mouse (desktop only).
- **Scroll progress bar** — thin gradient ribbon at the top, fills as you scroll.
- **Massive hero heading** — fluid `clamp()` typography from mobile to ultra-wide.
- **Magnetic portrait** — pulls toward cursor within a 150px radius.
- **Scroll-driven marquee** — two tool rows scroll opposite directions on page scroll.
- **Char-by-char text reveal** — About paragraph reveals letter-by-letter on scroll.
- **Scroll-progress timeline** — Journey line fills from start to end as you scroll.
- **Sticky-stacking project cards** — each card scales down as the next stacks over it.
- **Case-Study modal** — click any card; backdrop blur + spring drop-in; ESC closes.
- **`reduced-motion` users** — Framer Motion respects `prefers-reduced-motion` out of the box.

---

## Tech notes

- React 18, TypeScript 5.6, Vite 5.
- Tailwind 3 with custom `ink` / `haze` / `steel` / `mist` palette + Kanit font.
- Framer Motion 11 for all animations.
- Lenis 1.1 for smooth scroll.
- Lucide React for icons.
- Decor images (moon / lego / 3D shapes) load from the original figma.site CDN; replace with self-hosted PNGs in `public/decor/` if you want offline independence.

---

© 2026 Kumar Shivam · Built with vibe coding.
