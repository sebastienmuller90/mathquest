# Finot Académie — statut des assets Store au 02/11/2026

Ce fichier distingue les assets **dans Git** des fichiers binaires préparés hors dépôt.

## Icône Android launcher couleur

- **READY dans `main`** via PR #47.
- Ressources adaptatives + héritées intégrées.

## Icône Android monochrome

- **READY dans la Draft PR #49**, HEAD `a74323bcc9e21ef0d3505a58957749442fe8a89a`.
- Cinq densités `ic_launcher_monochrome.png` + déclaration `<monochrome>` dans les adaptive icons.
- Générateur reproductible : `tools/make-monochrome-icon.ps1`.
- L'avertissement lint `MonochromeLauncherIcon` a disparu.
- Reste à observer le rendu thématique sur un vrai Pixel avec « icônes thématiques » activé.

## Icône Google Play

- **READY hors dépôt** : export technique exact préparé le 02/11/2026.
- Nom : `finot_academie_google_play_icon_512.png`.
- Spécifications contrôlées : 512×512, PNG RGBA/32 bits, 340 971 octets, inférieur à 1 024 Ko.
- Fond blanc conservé ; aucun coin arrondi ajouté ; Google Play applique son masque.
- Ce binaire n'est pas versionné dans cette branche documentaire.

## Feature graphic

- **TODO** : 1 024×500, JPEG ou PNG 24 bits sans alpha.
- Validation créative propriétaire requise avant usage.

## Captures Store

- **OUTIL READY dans la Draft PR #49** : `tools/store-screenshots.mjs` + `tools/android-cdp.mjs`.
- **11 captures téléphone + 11 captures tablette générables** avec le profil fictif « Léo » CM1.
- Sortie : `artifacts/google-play/store-screens/{phone,tablet}/`, avec `manifest.json`.
- Les PNG restent hors Git ; l'outil et son test sont versionnés.
- Test dédié : `tests/store-screenshots.test.js`, 38/38 local et CI verte après correction du cas Chromium sans synthèse vocale.
- Une capture chat téléphone mérite une nouvelle composition avant sélection commerciale finale (bulle d'accueil partiellement coupée en haut).

## AAB RC

- **READY non signé dans la Draft PR #49**.
- `fr.finot.academie`, `versionName 1.0.0`, `versionCode 8075006`, `targetSdk 36`.
- 58 242 317 octets.
- SHA-256 : `7c66820146e354c8ac2335c0b62e7abab5d6b562314799d782c207c76b2c0e96`.
- Hash identique sur deux builds : reproductibilité confirmée sur le pipeline local de la PR.

## Confidentialité

- Modèle HTML statique ajouté : `privacy-policy-public.html`.
- **BLOCKED** pour publication tant que l'identité éditeur, l'adresse, l'e-mail, la date et l'URL HTTPS finale ne sont pas fournis.
