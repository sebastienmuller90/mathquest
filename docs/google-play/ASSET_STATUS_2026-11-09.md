# État des livrables — version 8.75.18 (09/11/2026)

Version de l'application : `8.75.18` (service worker `8.75.18-calibration-note-sur-20-2026-11-09`), `versionName` commercial 1.0.0, `versionCode` **8075018**.
Branche : `claude/finalisation-2026-11-09`. Ce document décrit uniquement des faits relevés ; il ne déclare ni signature, ni téléversement, ni publication.

## Changements depuis `main` (43eb4cc)
- Correctif du bouton « Valider » qui sortait de la carte (tablette, police système ×2) : cause `.qbtns` en `flex-wrap:nowrap`, corrigée par `flex-wrap:wrap`. Test de non-régression `tests/valider-overflow.test.js` (22 formes d'exercice × 8 écrans × 3 échelles de police).
- « Calibrer mon niveau » : note sur 20 affichée à la fin (bonnes réponses sur 12 ramenées sur 20, appréciation, enregistrée dans `S.diagnostic.note20`). Aucun XP ni pièce modifié.
- Documentation : audit de conformité Google Play, procédure des 12 testeurs.

## Validation
| Contrôle | Résultat |
|---|---|
| `run-all` intégral, exécuté par lots de 12 suites, une suite à la fois | **111 suites sur 111, 1869 PASS, 0 FAIL** (journaux : `artifacts/android-rc/validation/logs/lots-8.75.18/`) |
| Suites ajoutées / retirées par rapport au dernier run complet | aucune (111 → 111) |
| API 35 (AVD `Finot_Large_API35_W` sur disque NTFS W:, 1344×2992, 480 dpi), suite principale | 34 PASS, 0 FAIL, 1 SKIP |
| API 35, suite réseau (lent, très lent, hors ligne, instable, reprise) | 24 PASS, 0 FAIL |
| E1 (police système ×2) sur API 35 | PASS (c'était l'échec avant le correctif) |
| E4 (clavier alternatif) | SKIP : un seul clavier installé sur l'image, non testable ici |

## APK debug (hors Git)
`android/app/build/outputs/apk/debug/app-debug.apk`, 61 223 259 octets, SHA-256 `97485577cbf719982c4ac9e963b1d5128a60d53e0c8929b5c36ef26cba990530`. Identifiant `fr.finot.academie.dev`, versionCode 8075018, targetSdk 36. Usage : tests uniquement.

## AAB release (hors Git)
- Chemin : `artifacts/google-play/finot-academie-1.0.0-8075018-NON-SIGNE.aab` ; copie `D:\UpFactory\Releases\Finot-Academie-8075018-non-signe.aab` (SHA-256 identique).
- 59 359 718 octets, SHA-256 `ec3f78849b96181dd3f71bd644d079eecb9f9eff95c7c608cf66239f413acffc`, construit depuis le commit `ed0b40f`, arbre de travail propre.
- Contrôles du script de release : `fr.finot.academie`, versionCode 8075018, versionName 1.0.0, targetSdk 36, non débogable, sauvegarde Android désactivée, trafic en clair interdit, aucun lien profond, 2358 entrées, aucun fichier de clé, débogage WebView désactivé.
- Permissions du manifeste fusionné : `INTERNET` et la permission interne `DYNAMIC_RECEIVER_NOT_EXPORTED_PERMISSION` (décision sur `INTERNET` : voir `AUDIT_CONFORMITE_2026-11-09.md`).
- **Signature : aucune.** `jarsigner -verify` répond « no manifest ». Cet AAB **ne peut pas être téléversé**. Les AAB `8075016` et antérieurs sont obsolètes.
- Pour signer : `D:\UpFactory\Releases\Signer-Finot-AAB-8075018.ps1` (valeurs par défaut réglées sur cet AAB ; l'éditeur saisit lui-même les mots de passe).

## Limites connues
- Aucun test sur appareil physique. Compte Play Console non confirmé. Aucune signature de production.
- API 35 : validée sur AVD (x86_64, Google APIs). API 34 et 36 ne sont pas présentées comme une validation API 35.
- Le disque E: est en FAT32 : un AVD y est tronqué ; utiliser un disque NTFS (W:).
