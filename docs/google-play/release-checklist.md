# Finot Académie — Checklist de publication Google Play

Statuts : **READY** (vérifié, rien à faire), **TODO** (faisable par le code/l'agent), **BLOCKED** (dépend d'un autre point),
**HUMAN ACTION** (seul l'éditeur peut le faire). Mise à jour : 01/11/2026, base `main@4f9444d`.

## A. Technique (agent)

| # | Élément | Statut | Détail |
|---|---|---|---|
| 1 | App ID (`fr.finot.academie`) | **READY** (dans la PR) / **HUMAN ACTION** pour confirmer | défaut des builds release ; debug `.dev` ; définitif une fois créé dans Play Console — `release-audit.md` §2 |
| 2 | Version (`8.75.6` / `8075006`) | **READY** | convention existante conservée ; registre `version-ledger.json` + refus de réutilisation — §3 |
| 3 | `targetSdk` ≥ 36 | **READY** | 36 vérifié dans le manifeste fusionné |
| 4 | AAB release | **READY** (non signé) | construit, 56,7 Mo, 0 erreur lint |
| 5 | Permissions minimales | **READY** | `INTERNET` seule ; pas de micro, pas d'`AD_ID` |
| 6 | Backup désactivé, trafic en clair interdit | **READY** | manifeste + `network_security_config` |
| 7 | Release non débogable, sans secret | **READY** | contrôlé par le script à chaque build |
| 8 | Script de build reproductible | **READY** | `tools\build-google-play-release.cmd` |
| 9 | Recette multi-AVD (téléphone ancien, Pixel, tablette) | **READY** | PRs #44 et #45 |
| 10 | Signature (Gradle par variables, script de clé) | **READY** | `signing.md` |
| 11 | Data Safety (brouillon) | **READY** (brouillon) | `data-safety-draft.md` |
| 12 | Audit Familles | **READY** (brouillon) | `families-compliance.md` |
| 13 | Politique de confidentialité (brouillon) | **READY** (brouillon) / **HUMAN ACTION** pour les placeholders | `privacy-policy-draft.md` |
| 14 | Fiche Store en français | **READY** (brouillon) | `store-listing-fr.md` |
| 15 | Lien vers la politique dans l'application (espace parents) | **BLOCKED** (attend l'URL) | petit changement de code à faire après le choix de l'URL |
| 16 | Icône 512 px avec alpha | **TODO** | `icon.png` est en RVB sans alpha |
| 17 | Feature graphic 1 024 × 500 | **TODO** / **HUMAN ACTION** (validation créative) | `store-assets-checklist.md` |
| 18 | Captures téléphone (≥ 2) et tablette | **TODO** / **HUMAN ACTION** | profil fictif, écrans listés |
| 19 | Purge des copies internes après suppression de profil | **TODO** (facultatif) | écart local connu, non bloquant |
| 20 | Icône monochrome (Android 13+) | **TODO** (facultatif) | avertissement lint |

## B. Compte et Play Console (humain)

| # | Élément | Statut | Détail |
|---|---|---|---|
| 21 | Compte développeur Google Play | **HUMAN ACTION** | inscription payante, vérification d'identité (pas fait par l'agent) |
| 22 | Nom de développeur public, e-mail et adresse de contact | **HUMAN ACTION** | à fournir ; placeholders dans les docs |
| 23 | Créer l'application dans Play Console | **HUMAN ACTION** | confirmer l'ID `fr.finot.academie`, gratuite, français |
| 24 | Générer la clé d'import | **HUMAN ACTION** | `tools\create-upload-key.cmd` ; sauvegarder fichier + mots de passe |
| 25 | Play App Signing | **HUMAN ACTION** | accepter lors du premier téléversement (obligatoire pour une nouvelle application) |
| 26 | Hébergement de la politique de confidentialité (URL HTTPS publique) | **HUMAN ACTION** | `privacy-policy-draft.md` §« Mise en ligne » |
| 27 | Déclarations : Data Safety, Public cible, Contenu, Publicités, App access | **HUMAN ACTION** | à copier depuis `data-safety-draft.md` et `play-console-answers-draft.md` |
| 28 | Décisions « À DÉCIDER AVANT PUBLICATION » | **HUMAN ACTION** | gratuité, pays, public, Designed for Families, nom de version |
| 29 | Classification du contenu (IARC) | **HUMAN ACTION** | questionnaire dans Play Console |

## C. Validation sur appareils et pistes

| # | Élément | Statut | Détail |
|---|---|---|---|
| 30 | Tests sur appareils réels | **HUMAN ACTION** | vrai micro (refus), voix TTS installées, claviers Samsung/SwiftKey, surcouches (One UI, MIUI), économiseur de batterie, réseau instable — `docs/android-physical-validation-protocol.md` |
| 31 | AAB signé + téléversement en test interne | **HUMAN ACTION** | `tools\build-google-play-release.cmd --sign`, puis `--record interne` |
| 32 | Test fermé (si exigé : 12 testeurs, 14 jours) | **HUMAN ACTION** | règle des comptes personnels récents ; à confirmer dans Play Console |
| 33 | Rapport avant lancement (Play Console) | **HUMAN ACTION** | examiner les alertes automatiques |
| 34 | Demande d'accès à la production + revue Google | **HUMAN ACTION** | aucune soumission faite |
| 35 | Publication en production | **BLOCKED** | aucune action avant les points 21 à 34 |

## D. Commande principale (Windows)

```
tools\build-google-play-release.cmd            :: vérification (AAB non signé)
tools\build-google-play-release.cmd --sign     :: AAB signé (variables FINOT_UPLOAD_* définies)
```

Rien n'est publié automatiquement : le script s'arrête avec le fichier `.aab` dans `artifacts\google-play\`.
