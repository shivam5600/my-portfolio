"""Process IMG_7518.jpg into a stylized cinematic portrait suitable as a placeholder.

Steps:
  1. Load source.
  2. Tilak removal — mask the red dot on the forehead (R-high, G/B-low, upper-center
     region) and inpaint with skin tone sampled from the band just above it.
  3. Square-crop biased upward so head + shoulders fit.
  4. Resize to 1024x1024.
  5. Cinematic colour grade (slight desaturation, contrast boost, brightness drop,
     teal-magenta lift in shadows + warm lift in highlights).
  6. Radial alpha vignette so the portrait fades into the page background.
  7. Save as PNG with alpha at site/public/portrait-3d.png.

Run from site/ root:
    python3 scripts/make_portrait.py
"""

from __future__ import annotations
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageEnhance, ImageFilter

ROOT = Path(__file__).resolve().parents[2]  # my portfolio/
SOURCE = ROOT / "photo" / "IMG_7518.jpg"
OUT = ROOT / "site" / "public" / "portrait-3d.png"


def remove_tilak(arr: np.ndarray) -> np.ndarray:
    """Find the brightest concentrated red blob in the upper-centre forehead and
    inpaint with a small local skin sample. Strict thresholds + connected-blob size
    filtering so we don't smear across the pink temple wall or the lips."""
    h, w, _ = arr.shape
    r = arr[:, :, 0].astype(int)
    g = arr[:, :, 1].astype(int)
    b = arr[:, :, 2].astype(int)

    # Tilak on this photo measures around R=203 G=138 B=142 (warm brown-red),
    # not pure red, so R-G/R-B thresholds need to be modest. Region constraint
    # (tight forehead band) does the heavy lifting against false positives.
    mask = (r > 175) & (r - g > 45) & (r - b > 35) & (g - b < 25)

    # Tight forehead band: vertical 4-14% from top, horizontal 36-62%.
    region = np.zeros_like(mask, dtype=bool)
    region[int(h * 0.04) : int(h * 0.16), int(w * 0.36) : int(w * 0.62)] = True
    mask &= region

    if not mask.any():
        return arr

    # Keep only the largest connected component (drop scattered noise).
    label_img = np.zeros_like(mask, dtype=int)
    next_label = 0
    stack: list[tuple[int, int]] = []
    sizes: dict[int, int] = {}
    for sy in range(mask.shape[0]):
        for sx in range(mask.shape[1]):
            if mask[sy, sx] and label_img[sy, sx] == 0:
                next_label += 1
                stack.append((sy, sx))
                size = 0
                while stack:
                    cy, cx = stack.pop()
                    if (
                        0 <= cy < mask.shape[0]
                        and 0 <= cx < mask.shape[1]
                        and mask[cy, cx]
                        and label_img[cy, cx] == 0
                    ):
                        label_img[cy, cx] = next_label
                        size += 1
                        stack.extend([(cy + 1, cx), (cy - 1, cx), (cy, cx + 1), (cy, cx - 1)])
                sizes[next_label] = size

    if not sizes:
        return arr
    biggest = max(sizes, key=lambda k: sizes[k])
    if sizes[biggest] < 30:  # tilak should be at least 30 px; if not, leave alone
        return arr
    mask = label_img == biggest

    # Tight bounding box.
    ys, xs = np.where(mask)
    y_min, y_max = ys.min(), ys.max()
    x_min, x_max = xs.min(), xs.max()

    # Sample skin tone from a small band JUST ABOVE the blob — that's clean forehead.
    band_y_end = max(0, y_min - 4)
    band_y_start = max(0, band_y_end - 12)
    band = arr[band_y_start:band_y_end, x_min : x_max + 1]
    if band.size:
        skin = np.median(band.reshape(-1, 3), axis=0)
    else:
        skin = np.array([195, 155, 125], dtype=float)

    # Tiny dilation so seam is hidden; tight blur so smear stays localized.
    expanded = Image.fromarray((mask * 255).astype(np.uint8))
    expanded = expanded.filter(ImageFilter.MaxFilter(size=3))
    expanded = expanded.filter(ImageFilter.GaussianBlur(radius=2))
    blend = np.asarray(expanded).astype(float) / 255.0

    out = arr.astype(float)
    for c in range(3):
        out[:, :, c] = out[:, :, c] * (1 - blend) + skin[c] * blend
    return np.clip(out, 0, 255).astype(np.uint8)


def square_crop_to_head(img: Image.Image) -> Image.Image:
    w, h = img.size
    side = min(w, h)
    crop_top = max(0, (h - side) // 3)  # bias up so the head stays visible
    crop_left = (w - side) // 2
    return img.crop((crop_left, crop_top, crop_left + side, crop_top + side))


def grade(img: Image.Image) -> Image.Image:
    img = ImageEnhance.Color(img).enhance(0.82)
    img = ImageEnhance.Contrast(img).enhance(1.18)
    img = ImageEnhance.Brightness(img).enhance(0.90)

    arr = np.asarray(img).astype(float)
    lum = 0.299 * arr[:, :, 0] + 0.587 * arr[:, :, 1] + 0.114 * arr[:, :, 2]
    lum_norm = lum / 255.0

    shadow = (1 - lum_norm) ** 1.5
    arr[:, :, 0] -= shadow * 12  # cool the shadows (less red)
    arr[:, :, 2] += shadow * 14  # add blue in shadows

    highlight = lum_norm ** 1.5
    arr[:, :, 0] += highlight * 8  # warm the highlights
    arr[:, :, 1] += highlight * 4

    return Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8))


def radial_alpha(size: int) -> Image.Image:
    y, x = np.ogrid[:size, :size]
    cy = cx = size / 2
    dist = np.sqrt((x - cx) ** 2 + (y - cy) ** 2) / (size / 2)
    falloff = np.clip(1.0 - np.maximum(0.0, dist - 0.55) / 0.45, 0.0, 1.0)
    return Image.fromarray((falloff * 255).astype(np.uint8), mode="L")


def main() -> None:
    if not SOURCE.exists():
        print(f"source not found: {SOURCE}", file=sys.stderr)
        sys.exit(1)

    OUT.parent.mkdir(parents=True, exist_ok=True)

    img = Image.open(SOURCE).convert("RGB")
    # NOTE: tilak removal is disabled by default. In RGB the tilak and the
    # surrounding skin are too close (delta R-G ~ 60 in both), so naive
    # thresholding smears across the face. If you need it gone, do it
    # manually in Photopea (https://www.photopea.com) → spot-heal brush
    # over the dot → export PNG → drop into public/portrait-3d.png.
    # To re-enable here, set REMOVE_TILAK = True and tune thresholds in
    # remove_tilak() against your specific source photo.
    REMOVE_TILAK = False
    if REMOVE_TILAK:
        img = Image.fromarray(remove_tilak(np.asarray(img)))

    img = square_crop_to_head(img)
    img = img.resize((1024, 1024), Image.LANCZOS)
    img = grade(img)

    rgba = img.convert("RGBA")
    rgba.putalpha(radial_alpha(1024))
    rgba.save(OUT, "PNG", optimize=True)
    print(f"wrote {OUT}  ({OUT.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
