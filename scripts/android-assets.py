#!/usr/bin/env python3
"""Finot Académie — icônes et écran de démarrage Android générés depuis icon.png (31/10/2026).

Reproductible : mêmes sources → mêmes fichiers. Requiert Pillow (pip install pillow). À relancer seulement si icon.png change ;
les fichiers produits sont versionnés dans android/app/src/main/res (la CI n'a pas besoin de Python).

- Icône adaptative (Android 8+) : fond uni #7c3aed (couleur de l'icône et theme_color du manifeste web) + premier plan =
  icon.png réduite à 92 % du carré de 108 dp, si bien que le cercle de Finot reste entier dans la zone visible (72 dp) quel
  que soit le masque du fabricant (cercle, carré arrondi, goutte).
- Icônes classiques (Android 7) : carré arrondi et rond.
- Écran de démarrage (Android 7 à 11 ; Android 12+ utilise l'API SplashScreen avec le même fond et l'icône adaptative) :
  icon.png au centre sur le fond clair du manifeste (#f4f1ff).

Usage : python scripts/android-assets.py
"""
from pathlib import Path
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "icon.png"
RES = ROOT / "android" / "app" / "src" / "main" / "res"
ICON_BG = (0x7C, 0x3A, 0xED)
SPLASH_BG = (0xF4, 0xF1, 0xFF)
DENSITIES = {"mdpi": 1, "hdpi": 1.5, "xhdpi": 2, "xxhdpi": 3, "xxxhdpi": 4}
SPLASH = {  # tailles du modèle Capacitor (portrait ; paysage = inversé)
    "mdpi": (320, 480), "hdpi": (480, 800), "xhdpi": (720, 1280), "xxhdpi": (960, 1600), "xxxhdpi": (1280, 1920)}
RESAMPLE = Image.Resampling.LANCZOS


def save(img, path):
    path.parent.mkdir(parents=True, exist_ok=True)
    img.save(path, format="PNG", optimize=True)


def rounded_mask(size, radius_ratio):
    m = Image.new("L", (size, size), 0)
    ImageDraw.Draw(m).rounded_rectangle((0, 0, size - 1, size - 1), radius=int(size * radius_ratio), fill=255)
    return m


def main():
    src = Image.open(SRC).convert("RGBA")
    for name, k in DENSITIES.items():
        # Premier plan adaptatif : 108 dp, icône à 92 % centrée sur fond transparent.
        fg_size = round(108 * k)
        inner = round(fg_size * 0.92)
        fg = Image.new("RGBA", (fg_size, fg_size), (0, 0, 0, 0))
        off = (fg_size - inner) // 2
        fg.paste(src.resize((inner, inner), RESAMPLE), (off, off))
        save(fg, RES / f"mipmap-{name}" / "ic_launcher_foreground.png")
        # Icônes classiques : 48 dp.
        size = round(48 * k)
        icon = src.resize((size, size), RESAMPLE)
        sq = Image.new("RGBA", (size, size), (0, 0, 0, 0))
        sq.paste(icon, (0, 0), rounded_mask(size, 0.18))
        save(sq, RES / f"mipmap-{name}" / "ic_launcher.png")
        rd = Image.new("RGBA", (size, size), (0, 0, 0, 0))
        circle = Image.new("L", (size, size), 0)
        ImageDraw.Draw(circle).ellipse((0, 0, size - 1, size - 1), fill=255)
        rd.paste(icon, (0, 0), circle)
        save(rd, RES / f"mipmap-{name}" / "ic_launcher_round.png")
    for name, (w, h) in SPLASH.items():
        for orient, (W, H) in (("port", (w, h)), ("land", (h, w))):
            img = Image.new("RGB", (W, H), SPLASH_BG)
            s = round(min(W, H) * 0.42)
            img.paste(src.resize((s, s), RESAMPLE).convert("RGB"), ((W - s) // 2, (H - s) // 2))
            save(img, RES / f"drawable-{orient}-{name}" / "splash.png")
    base = Image.new("RGB", (480, 320), SPLASH_BG)
    s = round(320 * 0.42)
    base.paste(src.resize((s, s), RESAMPLE).convert("RGB"), ((480 - s) // 2, (320 - s) // 2))
    save(base, RES / "drawable" / "splash.png")
    print("Icônes et écrans de démarrage Android générés dans", RES)


if __name__ == "__main__":
    main()
