"""Generate a 3D-rendered portrait via FastRouter (openai/gpt-image-2 — true img2img).

Usage:
    export FASTROUTER_API_KEY="sk-v1-..."          # never commit this
    python3 scripts/generate_3d_portrait_fastrouter.py
    # → writes site/public/portrait-3d.png

Cost:
    openai/gpt-image-2 is ~$0.04–$0.10 per 1024x1024 image (medium quality).
    On a $20 budget you can comfortably try 100+ rolls.

How it works:
    1. Loads photo/IMG_7518.jpg, base64-encodes it.
    2. Calls FastRouter /v1/chat/completions with gpt-image-2 + image_url + prompt.
    3. Parses the response for a generated image (handles base64 inline and URL forms).
    4. Saves to public/portrait-3d.png. Backs up the existing file first.
"""

from __future__ import annotations
import base64
import json
import os
import shutil
import sys
import time
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]  # my portfolio/
SOURCE = ROOT / "photo" / "IMG_7518.jpg"
OUT = ROOT / "site" / "public" / "portrait-3d.png"
BACKUP = ROOT / "site" / "public" / "portrait-3d.backup.png"

API_BASE = "https://api.fastrouter.ai/v1"
MODEL = "openai/gpt-image-2"

PROMPT = (
    "Generate a photorealistic 3D rendered character portrait based on the "
    "reference image. Preserve face likeness exactly — same eyes, nose, beard, "
    "moustache, and hair. Style: cinematic dark moody studio lighting, soft cool "
    "rim light, slight teal-magenta shadow accents, plain pure black background "
    "(#0C0C0C). Octane render look, ultra-detailed skin shading. The subject "
    "wears the same square-frame yellow eyeglasses with subtle blue-tinted lenses, "
    "now styled into a clean neutral dark sweater. Head-and-shoulders composition, "
    "centred, 1:1 square crop. Remove any tilak/forehead mark; clean forehead skin "
    "only. Editorial portrait quality."
)


def require_key() -> str:
    key = os.environ.get("FASTROUTER_API_KEY")
    if not key:
        sys.stderr.write(
            "ERROR: FASTROUTER_API_KEY env var is not set.\n"
            "Run:  export FASTROUTER_API_KEY=\"sk-v1-...\"\n"
            "then re-run this script.\n"
        )
        sys.exit(1)
    return key


def b64_data_url(path: Path) -> str:
    mime = "image/jpeg" if path.suffix.lower() in {".jpg", ".jpeg"} else "image/png"
    data = base64.b64encode(path.read_bytes()).decode("ascii")
    return f"data:{mime};base64,{data}"


def _post_json(key: str, path: str, payload: dict) -> dict:
    req = urllib.request.Request(
        f"{API_BASE}{path}",
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {key}",
            "Accept": "application/json",
        },
        method="POST",
    )
    print(f"→ POST {API_BASE}{path}  model={payload.get('model')}", flush=True)
    t0 = time.time()
    try:
        with urllib.request.urlopen(req, timeout=180) as resp:
            body = resp.read().decode("utf-8")
        print(f"  HTTP {resp.status}  {time.time() - t0:.1f}s  {len(body)} bytes", flush=True)
        return json.loads(body)
    except urllib.error.HTTPError as e:
        err_body = e.read().decode("utf-8", errors="replace")
        print(f"  HTTP {e.code}  {time.time() - t0:.1f}s", flush=True)
        print(f"  body: {err_body[:2000]}", flush=True)
        raise


def call_fastrouter(key: str, image_data_url: str, prompt: str) -> dict:
    """Try the OpenAI-style image endpoints in order until one returns success."""
    # Strip the "data:image/...;base64," prefix to get raw base64.
    raw_b64 = image_data_url.split(",", 1)[1]

    attempts = [
        # 1. Standard /v1/images/generations with `image` input (newer OpenAI shape).
        (
            "/images/generations",
            {
                "model": MODEL,
                "prompt": prompt,
                "n": 1,
                "size": "1024x1024",
                "image": raw_b64,
            },
        ),
        # 2. Same endpoint with image as array (some providers).
        (
            "/images/generations",
            {
                "model": MODEL,
                "prompt": prompt,
                "n": 1,
                "size": "1024x1024",
                "image": [raw_b64],
            },
        ),
        # 3. /v1/responses (the newest OpenAI multimodal endpoint).
        (
            "/responses",
            {
                "model": MODEL,
                "input": [
                    {
                        "role": "user",
                        "content": [
                            {"type": "input_image", "image_url": image_data_url},
                            {"type": "input_text", "text": prompt},
                        ],
                    }
                ],
            },
        ),
        # 4. Text-only fallback on /v1/images/generations (loses likeness but at
        #    least returns SOMETHING if input_image flows are all rejected).
        (
            "/images/generations",
            {
                "model": MODEL,
                "prompt": prompt,
                "n": 1,
                "size": "1024x1024",
            },
        ),
    ]

    last_err = None
    for path, payload in attempts:
        try:
            return _post_json(key, path, payload)
        except urllib.error.HTTPError as e:
            last_err = e
            # Try the next attempt
            print(f"  → trying next shape…\n", flush=True)
    raise RuntimeError(f"all attempts failed; last HTTP error: {last_err}")


def extract_image_bytes(response: dict) -> bytes:
    """Pull the generated image out of an OpenAI-style response, accepting several
    shapes that the various image-output endpoints use in the wild."""
    # 1. Modern: choices[0].message.content is a list of parts; an image part
    #    looks like {"type": "image_url", "image_url": {"url": "data:..."}}.
    try:
        content = response["choices"][0]["message"]["content"]
    except (KeyError, IndexError, TypeError):
        content = None

    candidates: list[str] = []

    def walk(node):
        if isinstance(node, dict):
            for k, v in node.items():
                if k in {"url", "b64_json", "image"} and isinstance(v, str):
                    candidates.append(v)
                else:
                    walk(v)
        elif isinstance(node, list):
            for it in node:
                walk(it)
        elif isinstance(node, str) and (
            node.startswith("data:image/") or len(node) > 500
        ):
            candidates.append(node)

    walk(response)
    if content:
        walk(content)

    for cand in candidates:
        # Data URL
        if cand.startswith("data:image/"):
            _, b64 = cand.split(",", 1)
            return base64.b64decode(b64)
        # Raw base64 (long string, no spaces, fits b64 alphabet)
        if len(cand) > 500 and " " not in cand and not cand.startswith("http"):
            try:
                return base64.b64decode(cand)
            except Exception:
                continue
        # HTTP URL — download
        if cand.startswith("http"):
            print(f"  downloading {cand[:60]}…", flush=True)
            with urllib.request.urlopen(cand, timeout=60) as r:
                return r.read()

    raise RuntimeError(
        "No image found in response. Raw response preview:\n"
        + json.dumps(response, indent=2)[:1500]
    )


def main() -> None:
    if not SOURCE.exists():
        sys.exit(f"source not found: {SOURCE}")
    key = require_key()

    if OUT.exists():
        shutil.copy2(OUT, BACKUP)
        print(f"backed up existing portrait → {BACKUP.name}")

    print(f"source: {SOURCE.name}  ({SOURCE.stat().st_size // 1024} KB)")
    image_url = b64_data_url(SOURCE)
    print(f"prompt: {PROMPT[:120]}…")

    response = call_fastrouter(key, image_url, PROMPT)

    try:
        img_bytes = extract_image_bytes(response)
    except RuntimeError as e:
        sys.exit(str(e))

    OUT.write_bytes(img_bytes)
    print(f"wrote {OUT}  ({OUT.stat().st_size // 1024} KB)")
    print("\nDone. Open the file in any image viewer to inspect.")
    print(f"If the result isn't good, just re-run the script — each call generates a new variant.")


if __name__ == "__main__":
    main()
