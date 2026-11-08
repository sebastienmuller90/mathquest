# État des assets et de la validation Android — 08/11/2026

Base : `main` = `924e0b9` (CI verte). Version de l'application : `8.75.16` (service worker), `versionName` commercial 1.0.0, `versionCode` **8075016**, package `fr.finot.academie`.

> Ce document remplace `ASSET_STATUS_2026-11-04.md` (base `1e7bbd0`, versionCode 8075012, empreintes périmées). Il distingue ce qui est **démontré** (preuve ci-dessous) de ce qui **reste à faire par l'éditeur**. Aucune publication n'a été réalisée.

## 1. AAB de vérification (non signé)

- Fichier local `artifacts/google-play/finot-academie-1.0.0-8075016-NON-SIGNE.aab` (hors Git), 59 359 434 octets. Copie : `D:\UpFactory\Releases\Finot-Academie-8075016-non-signe.aab`.
- SHA-256 : `c029eb0beaa55cf29016cdb462b90900ee0994b2a72f08cfe1352e9696119700`.
- Il remplace les AAB `8075012` et `8075014`, **obsolètes** : ne signer et ne téléverser que le `8075016`.
- **Cet AAB ne peut pas être téléversé** (non signé). La signature exige la clé d'upload légitime de l'éditeur (voir `signing.md` et `final-human-inputs.md`). Script de signature local : `D:\UpFactory\Releases\Signer-Finot-AAB.ps1` (l'éditeur tape lui-même les mots de passe ; arrêt si l'empreinte ne correspond pas ; rien n'est téléversé).

## 2. APK de test (débogable, jamais à publier)

- `android/app/build/outputs/apk/debug/app-debug.apk`, construit depuis le code final : SHA-256 `c154a09c1d8fce92faaed3a4608ad992e4c8adde439b165fd1014540abcfd91f`.
- L'APK de recette `finot-academie-recette-debug-8075012.apk` (`9325049a…0441`) est **périmé**.

## 3. Visuels définitifs

| Visuel | Fichier local (hors Git) | SHA-256 |
| --- | --- | --- |
| Icône Play 512×512 | `artifacts/google-play/icon/finot-play-icon-512.png` | `95cd92ac19b8c3a4da15a4a4f56e01b2084b8a204a1210b4b5b90903c5c4b51c` |
| Feature Graphic 1024×500 | `artifacts/google-play/final/finot-feature-graphic-1024x500.png` | `146b9a5b01f9adf2e0e80989c1046fe5c190690538581c4d726f00fa633db8a1` |

## 4. Captures finales (régénérées depuis le code final)

Dossier `artifacts/google-play/store-screens-final2/` (hors Git), produit par `tools/store-screenshots.mjs` : APK debug du code final, profil entièrement fictif « Léo » CM1, barre d'état Android en mode démonstration. Téléphone : AVD Pixel API 36, 1080×2400. Tablette : AVD Tablet API 36. Sur téléphone, l'écran 09 (chat Finot) n'est plus rogné : la réponse s'affiche en entier.

| Fichier | SHA-256 |
| --- | --- |
| `phone/01-accueil.png` | `763e34d1b9172a7455500ed13a489459b4936770f9ae0dd96bf3e0b954a0e60d` |
| `phone/02-matieres.png` | `0eea699ccf2bb730fb0c087957e6efb39aa22498eea2c4c64e35d30616a37e2a` |
| `phone/03-cours.png` | `55e0ab5f2f583aa79cba22ccc3a382f2378802aee8e8fa28651acb66a533c39d` |
| `phone/04-exercice.png` | `b8f155e493ecaa3803fdd58f96a7107228ec8e3bf10214f5ac29de13a55d8e23` |
| `phone/05-correction.png` | `3830ae124ce19b336bb88eca349a30162a84c686aeff90ce9ee0e7e8e3b5e34f` |
| `phone/06-parcours.png` | `9921a257320c7fb537693efd9722983f6ba0e02e21fd34914738629e3514ecc6` |
| `phone/07-lecture.png` | `99f823399df0e6f37d2c05cd343a3afb27e1f1c44d321f7b00ab7bf93f941001` |
| `phone/08-dictee.png` | `9fae973eb07e6a20b0ff048ac1a0ca6ccb9a26c3bd4cea44c942442ed6f90132` |
| `phone/09-finot-chat.png` | `9024a9a5348e44afb81f6e3af7032ef82d87ba7fe78aa2d19d904d0a0495599a` |
| `phone/10-progression.png` | `e2643047777e4f70faa826e692923eab4941ebcc44f23c3c3c1246aaecb38500` |
| `phone/11-espace-parents.png` | `6e1169a8f3b1398fcb472198043e46c051dd0fd16764ab57433247608f4e6a8d` |
| `tablet/01-tablet-accueil.png` | `dee4df726cc2a2c7fd337538dd168e552d2afd5488ad9592dbb55fd284dcfd8e` |
| `tablet/02-tablet-matieres.png` | `9de78f94f9ac9127c3cb0aed449bcb4c94ac90007788101a537c90a307c907dc` |
| `tablet/03-tablet-cours.png` | `2a48fbf7046f8d6bac50cd0a571eb190c3e5aa19140eb5859787e062b31c2808` |
| `tablet/04-tablet-exercice.png` | `16e9a07890f6f9c116c965ee0d851bcac12b9f6bf0408b66d457e4ef0b8707e9` |
| `tablet/05-tablet-correction.png` | `0b24ea76c5393e36ad229a1e88c932e60fe4a631c9b15f0c99af878e7a6704fa` |
| `tablet/06-tablet-parcours.png` | `d560bf2a4137a079c0b430a38d01ba8ec219f6a2341a852efaa2f9938b131609` |
| `tablet/07-tablet-lecture.png` | `113bff8d9458ac0eab81df6d56f71ebc2345a14167eb6bc7dfafe22154d08f8f` |
| `tablet/08-tablet-dictee.png` | `a4aac9dbfa8cb0bb1a9d34e1595e62f729ea967bd9ee7fd52cecc2327e10f9a4` |
| `tablet/09-tablet-finot-chat.png` | `25a29483bbd2c452f69a5dafbf6bfaf23ee4f542b4712cad6bb9bdeb72834873` |
| `tablet/10-tablet-progression.png` | `03300088fa5fdb6e1b89f675c7fe33662460dd0c3744de03d91c0f99583f7654` |
| `tablet/11-tablet-espace-parents.png` | `e9fc8ce4f3dd36b82603f0cead90506e95b975da4d107f75fa3657952a04e162` |

## 5. Validation sur émulateurs (campagne du 08/11/2026)

Les émulateurs ne prouvent **pas** le comportement sur appareil réel. Banc local (hors Git) : `avd-suite` (34 contrôles : parcours, parents, sauvegarde, police 2×, affichage agrandi, clavier, rotation, arrêt forcé, redémarrage, mise à jour PWA, changement de profil) et `net-suite` (24 contrôles : réseau lent, très lent, hors ligne, instable, relance hors ligne).

| Émulateur | API | Format | Résultat suite appli | Résultat suite réseau |
| --- | --- | --- | --- | --- |
| Finot_Tablet_API36 | 36 | tablette | 34 PASS / 0 FAIL / 1 SKIP | 24 PASS / 0 FAIL |
| Finot_Pixel_API36 | 36 | téléphone standard | 34 PASS / 0 FAIL / 1 SKIP | 24 PASS / 0 FAIL |
| Finot_Small_API30 | 30 | petit téléphone | 34 PASS / 0 FAIL / 1 SKIP | 24 PASS / 0 FAIL |
| Finot_Large_API35 | 35 | grand téléphone | **non testé** | **non testé** |

Le grand téléphone API 35 n'a pas pu démarrer sur cette machine : le disque C: n'avait que ~3 Go libres pour ~12 Go nécessaires, et une copie sur E: démarre sans jamais terminer son amorçage (hors ligne plus de 8 minutes, même avec 4 Go de RAM). C'est une limite d'infrastructure, non un défaut de l'appli ; à rejouer après avoir libéré ≥ 12 Go sur C:.

Point ouvert, non résolu : un débordement du bouton « Valider » a été observé une fois sur tablette à police 2× avec affichage agrandi, puis non reproduit sur trois exécutions suivantes (dépend de l'exercice tiré au hasard). Cause non établie.

## 6. Ce qui reste à faire par l'éditeur

Voir `docs/google-play/final-human-inputs.md` : clé d'upload et signature de l'AAB `8075016`, test sur appareil physique, compte Play Console (identité, statut « trader »), déclarations (sécurité des données, public cible, contenu), republication de la politique de confidentialité publique, téléversement.
