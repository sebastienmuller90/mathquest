#!/usr/bin/env python3
"""Génère uniquement les splash Android de Finot Académie.

Source canonique : premiers plans Android déjà validés (PR #47+), jamais l'ancienne iconographie.
Ne touche à aucune icône launcher. Requiert Pillow.
"""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
RES = ROOT / "android" / "app" / "src" / "main" / "res"
BG = (0xFF, 0xF6, 0xE8)
SPLASH = {
    "mdpi": (320, 480),
    "hdpi": (480, 800),
    "xhdpi": (720, 1280),
    "xxhdpi": (960, 1600),
    "xxxhdpi": (1280, 1920),
}
RESAMPLE = Image.Resampling.LANCZOS


def subject_for(density: str) -> Image.Image:
    src = Image.open(RES / f"mipmap-{density}" / "ic_launcher_foreground.png").convert("RGBA")
    alpha = src.getchannel("A")
    box = alpha.getbbox()
    if not box:
        raise RuntimeError(f"Premier plan vide : {density}")
    return src.crop(box)


def compose(subject: Image.Image, size: tuple[int, int]) -> Image.Image:
    w, h = size
    target = round(min(w, h) * 0.42)
    ratio = min(target / subject.width, target / subject.height)
    rw, rh = max(1, round(subject.width * ratio)), max(1, round(subject.height * ratio))
    fg = subject.resize((rw, rh), RESAMPLE)
    out = Image.new("RGBA", (w, h), (*BG, 255))
    out.alpha_composite(fg, ((w - rw) // 2, (h - rh) // 2))
    return out.convert("RGB")


def save(img: Image.Image, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    img.save(path, "PNG", optimize=True)


def main() -> None:
    for density, (w, h) in SPLASH.items():
        subject = subject_for(density)
        save(compose(subject, (w, h)), RES / f"drawable-port-{density}" / "splash.png")
        save(compose(subject, (h, w)), RES / f"drawable-land-{density}" / "splash.png")
    save(compose(subject_for("mdpi"), (480, 320)), RES / "drawable" / "splash.png")
    print("Splash Android Finot générés sur fond #FFF6E8 ; icônes launcher inchangées.")


if __name__ == "__main__":
    main()
