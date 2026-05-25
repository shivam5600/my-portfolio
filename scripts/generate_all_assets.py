"""Generate hero mascot + 7 project UI images via FastRouter (gpt-image-2).

Usage:
    export FASTROUTER_API_KEY="sk-v1-..."
    python3 scripts/generate_all_assets.py

Each call is ~$0.05 and takes ~30-60s. 8 total = ~$0.40, ~5 minutes.
Backs up the previous portrait. Project images go to public/projects/<slug>.png.

To regenerate just one asset, pass its slug as an argument:
    python3 scripts/generate_all_assets.py prog-data-discovery
"""

from __future__ import annotations
import base64
import json
import os
import shutil
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]  # site/
PUBLIC = ROOT / "public"
PROJECTS_DIR = PUBLIC / "projects"
API_BASE = "https://api.fastrouter.ai/v1"
MODEL = "openai/gpt-image-2"
SIZE = "1024x1024"


HERO_PROMPT = (
    "Cute friendly stylized 3D robot mascot character — original design for a "
    "tech portfolio. Round white-and-chrome metallic head with subtle panel "
    "seams, two large expressive glowing soft-blue lens eyes, gentle confident "
    "happy expression with a small smile slot on the face panel, soft "
    "rubberized neck joint. Sleek modern Pixar-quality industrial design, "
    "matte and brushed metal textures. Head-and-shoulders composition, "
    "centred. Plain pure black background. Cinematic dark moody studio "
    "lighting with soft cool rim light, subtle magenta and teal accent "
    "reflections. Stylized 3D animation aesthetic. Professional editorial "
    "portrait quality. 1:1 square crop."
)


def proj(slug: str, prompt: str) -> dict:
    return {"slug": slug, "prompt": prompt}


PROJECT_IMAGES = [
    proj(
        "prog-data-discovery",
        "Sleek dark analytics dashboard for ad-tech bid-data discovery. Visible "
        "elements: large headline 'FIELD COVERAGE', four exchange tag chips reading "
        "'EBDA', 'ADX', 'PREBID', 'TAM' in a top row, a percentage-style coverage "
        "bar chart below with numbers like '100%', '94%', '88%', '76%', a side-by-"
        "side comparison table, and a side panel labelled 'PROG DATA DISCOVERY'. "
        "Electric purple and magenta accent colors on plain dark slate background. "
        "Modern devtool aesthetic, Octane render. 16:10 widescreen. Big legible "
        "text where shown.",
    ),
    proj(
        "user-journey",
        "Dark cohort analytics dashboard. Visible: large headline 'TIER-1 USER "
        "JOURNEY', stacked-bar user segmentation split into three columns labelled "
        "'PRE', 'D0', 'POST', a prominent KPI card reading '$3M / yr OPPORTUNITY', "
        "another callout reading '21% → 6% search-bidder share', '$4.91 RPM GAP' "
        "metric chip, behavioural segment donut chart with 7 wedges. Cool teal and "
        "cyan accents on dark background. Octane render. 16:10. Big legible text.",
    ),
    proj(
        "hermes",
        "Dark notebook scheduler tool interface labelled 'HERMES' in the top bar. "
        "Centre: DAG visual editor with connected rectangular pipeline nodes and "
        "curved edges. Sidebar lists 'PIPELINES' and 'RUN HISTORY' sections. A "
        "version badge reads 'v7.15'. Deep purple, slate, soft magenta highlights. "
        "Modern devtool look. Octane render, isometric perspective. 16:10. Big "
        "legible text on the visible labels.",
    ),
    proj(
        "overbidding",
        "Dark BI dashboard with revenue impact line chart trending up, anomaly "
        "callout badges over the spikes, A/B treatment-vs-control bar chart. "
        "Large headline KPI card reads '+$1.5M / YEAR'. Secondary callout reads "
        "'-35% OVERBIDDING'. A side panel shows '+$125K / MONTH'. Warm orange and "
        "gold accents on plain dark navy background. Octane render, modern "
        "fintech-style data-viz. 16:10. Big legible text on the visible labels.",
    ),
    proj(
        "mpl-churn",
        "Dark mobile gaming analytics dashboard. Visible: D7/D30 retention curves "
        "labelled, a 'LOSING STREAK' trigger panel with '4 CONSECUTIVE LOSSES' "
        "threshold slider, a large KPI card reading '+10% CM1', side panel labelled "
        "'NUDGE EXPERIMENT'. Emerald and teal accents on plain dark background. "
        "Modern game-ops aesthetic. Octane render. 16:10. Big legible text on the "
        "visible labels.",
    ),
    proj(
        "mpl-cost",
        "Dark cloud-infrastructure cost dashboard. Visible: 'AWS / DATABRICKS' "
        "cluster usage area chart, cost trend line falling steeply, large "
        "circular KPI reading '-61%' very prominently, '-$135K / MONTH' callout "
        "card, optimization recommendations side panel. Magenta and purple "
        "gradient accents on plain dark background. DevOps SRE aesthetic. Octane "
        "render. 16:10. Big legible text on the visible labels.",
    ),
    proj(
        "mpl-deposit",
        "Dark funnel conversion dashboard for first-deposit flow. Visible: large "
        "headline reads 'FIRST DEPOSIT CONVERSION', a 5-stage acquisition funnel "
        "chart, a giant before/after KPI card reading '3% → 8%', a '+5x LIFT' "
        "badge, a side panel labelled '24-HOUR INCENTIVE'. Emerald green accents "
        "on plain dark background. Modern fintech aesthetic. Octane render. 16:10. "
        "Big legible text on the visible labels.",
    ),
]


def require_key() -> str:
    key = os.environ.get("FASTROUTER_API_KEY")
    if not key:
        sys.exit("ERROR: FASTROUTER_API_KEY env var not set.")
    return key


def call_fastrouter(key: str, prompt: str, reference_image_b64: str | None = None) -> bytes:
    payload: dict = {
        "model": MODEL,
        "prompt": prompt,
        "n": 1,
        "size": SIZE,
    }
    if reference_image_b64:
        payload["image"] = reference_image_b64

    req = urllib.request.Request(
        f"{API_BASE}/images/generations",
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {key}",
            "Accept": "application/json",
        },
        method="POST",
    )
    t0 = time.time()
    try:
        with urllib.request.urlopen(req, timeout=240) as resp:
            body = json.loads(resp.read())
    except urllib.error.HTTPError as e:
        err = e.read().decode("utf-8", errors="replace")
        print(f"  HTTP {e.code} ({time.time() - t0:.1f}s): {err[:500]}", flush=True)
        raise
    elapsed = time.time() - t0
    print(f"  ↳ HTTP 200 in {elapsed:.1f}s", flush=True)

    # OpenAI image response shape: data: [{ b64_json: "..." }] or { url: "..." }
    items = body.get("data") or []
    if not items:
        raise RuntimeError(f"no data in response: {body}")
    first = items[0]
    if "b64_json" in first:
        return base64.b64decode(first["b64_json"])
    if "url" in first:
        with urllib.request.urlopen(first["url"], timeout=60) as r:
            return r.read()
    raise RuntimeError(f"no image bytes in: {first}")


def generate_hero(key: str) -> None:
    out = PUBLIC / "portrait-3d.png"
    if out.exists():
        shutil.copy2(out, PUBLIC / "portrait-3d.backup.png")
    print(f"[hero] generating tree-spirit mascot…", flush=True)
    img = call_fastrouter(key, HERO_PROMPT)
    out.write_bytes(img)
    print(f"[hero] wrote {out}  ({out.stat().st_size // 1024} KB)\n", flush=True)


def generate_project(key: str, p: dict) -> None:
    PROJECTS_DIR.mkdir(parents=True, exist_ok=True)
    out = PROJECTS_DIR / f"{p['slug']}.png"
    print(f"[{p['slug']}] generating…", flush=True)
    img = call_fastrouter(key, p["prompt"])
    out.write_bytes(img)
    print(f"[{p['slug']}] wrote {out}  ({out.stat().st_size // 1024} KB)\n", flush=True)


def main() -> None:
    key = require_key()
    args = sys.argv[1:]

    if not args:
        targets = ["hero"] + [p["slug"] for p in PROJECT_IMAGES]
    else:
        targets = args

    print(f"targets: {targets}\n", flush=True)
    for t in targets:
        try:
            if t == "hero":
                generate_hero(key)
            else:
                matched = next((p for p in PROJECT_IMAGES if p["slug"] == t), None)
                if not matched:
                    print(f"  skipping unknown slug: {t}", flush=True)
                    continue
                generate_project(key, matched)
        except Exception as e:
            print(f"  FAILED {t}: {e}\n", flush=True)
            continue


if __name__ == "__main__":
    main()
