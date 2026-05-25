"""Chroma-key the dark background of portrait-3d.png to alpha=0 so the
character floats cleanly against any dark page background.

The AI render has a pure-black background; the page background is #0C0C0C.
That ~3% luminance gap is enough to make the image visibly a rectangle.

Usage:
    python3 scripts/chroma_key_portrait.py
    # in-place rewrite of public/portrait-3d.png

Backs up to portrait-3d.opaque.backup.png first.
"""

from __future__ import annotations
import shutil
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "public" / "portrait-3d.png"
BACKUP = ROOT / "public" / "portrait-3d.opaque.backup.png"

# Pixels darker than this average luminance become transparent.
# Bumped low enough that the robot's dark shadows survive but the studio
# backdrop disappears.
BG_LUMA_THRESHOLD = 22

# How aggressively to soften the alpha edge. Bigger = blurrier transition.
EDGE_BLUR_RADIUS = 1.2


def main() -> None:
    if not SOURCE.exists():
        raise SystemExit(f"missing: {SOURCE}")

    shutil.copy2(SOURCE, BACKUP)

    img = Image.open(SOURCE).convert("RGB")
    arr = np.asarray(img)
    luminance = arr.astype(int).mean(axis=2)  # H x W

    # Hard alpha mask: dark = transparent (0), bright = opaque (255).
    alpha = np.where(luminance < BG_LUMA_THRESHOLD, 0, 255).astype(np.uint8)

    # Optionally smooth a small ring around the mask boundary so the cutout
    # isn't aliased on character edges.
    alpha_img = Image.fromarray(alpha, mode="L")
    if EDGE_BLUR_RADIUS > 0:
        alpha_img = alpha_img.filter(ImageFilter.GaussianBlur(radius=EDGE_BLUR_RADIUS))

    rgba = img.convert("RGBA")
    rgba.putalpha(alpha_img)
    rgba.save(SOURCE, "PNG", optimize=True)
    print(f"chroma-keyed {SOURCE.name}  ({SOURCE.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
