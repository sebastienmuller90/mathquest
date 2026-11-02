# Finot Académie — Checklist de publication Google Play

Statuts : **READY** (vérifié, rien à faire), **READY HORS DÉPÔT** (asset produit mais non versionné), **TODO** (faisable par le code/l'agent), **BLOCKED** (dépend d'un autre point), **HUMAN ACTION** (seul l'éditeur peut le faire).

Mise à jour : **02/11/2026** — base vérifiée `main@ecc99323915bfe17ff4267e8ea0d2bfbf0f88b78` après fusion de la PR #47.

## A. Technique et Store

| # | Élément | Statut | Détail |
|---|---|---|---|
| 1 | App ID (`fr.finot.academie`) | **READY** / **HUMAN ACTION** pour confirmer dans Play Console | défaut des builds release ; debug `.dev` ; identifiant à conserver lors de la création de l'application |
| 2 | Version (`1.0.0` / `8075006`) | **READY** | `versionName` dans `android/store-version.json` ; `versionCode` dérivé de `sw.js` ; registre `version-ledger.json` |
| 3 | `targetSdk` / `compileSdk` 36 | **READY** | API 36. Depuis le 31/08/2026, Google Play exige Android 16 / API 36 ou plus pour les nouvelles applications et mises à jour Android standard |
| 4 | AAB release | **READY** (non signé) | construit et audité ; l'AAB final signé sera produit uniquement après création de la clé d'upload |
| 5 | Permissions minimales | **READY** | `INTERNET` seule ; pas de micro, caméra, localisation, contacts ni `AD_ID` |
| 6 | Backup désactivé, trafic en clair interdit | **READY** | manifeste + `network_security_config` |
| 7 | Release non débogable, sans secret | **READY** | contrôlé par le script de release |
| 8 | Script de build reproductible | **READY** | `tools\build-google-play-release.cmd` |
| 9 | Recette multi-AVD | **READY** sur état pré-#47 ; **nouvelle passe RC en cours côté Claude** | téléphone ancien/API 30, Pixel/API 36 et tablette/API 36 ; la passe finale doit inclure l'icône #47 |
| 10 | Signature Gradle / script de clé | **READY** côté outillage | `signing.md` ; aucune clé réelle dans Git |
| 11 | Data Safety | **READY** (brouillon) | `data-safety-draft.md` ; V1 locale sans collecte ni partage |
| 12 | Audit Familles | **READY** (brouillon) | `families-compliance.md` |
| 13 | Politique de confidentialité | **READY** côté contenu / **HUMAN ACTION** pour identité + publication | `privacy-policy-draft.md` + modèle HTML public ; URL HTTPS finale encore à créer |
| 14 | Fiche Store FR | **READY** (brouillon) | `store-listing-fr.md` |
| 15 | Lien politique dans l'application | **BLOCKED** par l'URL publique | petit changement de code après création de l'URL ; ne pas inventer d'URL temporaire |
| 16 | Icône launcher Android | **READY** | PR #47 fusionnée : Finot sur fond blanc, icônes adaptatives + héritées |
| 17 | Icône Play Store | **READY HORS DÉPÔT** après export technique final | exigence : PNG 32 bits avec canal alpha, 512×512, ≤ 1 024 Ko ; distincte des ressources launcher |
| 18 | Feature graphic | **TODO** / **HUMAN ACTION** validation créative | 1 024×500 ; JPEG ou PNG 24 bits sans alpha |
| 19 | Captures téléphone + tablette | **EN COURS côté Claude** | génération automatisée depuis AVD, profil fictif uniquement |
| 20 | Icône monochrome Android 13+ | **EN COURS côté Claude** (facultatif Store mais utile launcher thématique) | ne doit pas remplacer l'icône couleur validée |
| 21 | Purge après suppression de profil | **READY** | `tests/profile-delete-purge.test.js` |

## B. Compte et Play Console — actions éditeur

| # | Élément | Statut | Détail |
|---|---|---|---|
| 22 | Compte développeur Google Play | **HUMAN ACTION** | inscription et vérification d'identité |
| 23 | Nom développeur public, e-mail, adresse/contact requis | **HUMAN ACTION** | à fournir ; aucun placeholder ne doit être publié tel quel |
| 24 | Créer l'application dans Play Console | **HUMAN ACTION** | conserver `fr.finot.academie`, application, français |
| 25 | Générer la clé d'upload réelle | **HUMAN ACTION** | `tools\create-upload-key.cmd` ; sauvegarde hors Git + mots de passe hors dépôt |
| 26 | Play App Signing | **HUMAN ACTION** | à configurer lors du premier téléversement |
| 27 | Héberger la politique de confidentialité | **HUMAN ACTION** | URL HTTPS publique, accessible sans compte et non géobloquée |
| 28 | Déclarations Play Console | **HUMAN ACTION** | Data Safety, audience, contenu, publicités, App access, Familles selon les écrans réels |
| 29 | Décisions commerciales/distribution | **HUMAN ACTION** | gratuité, pays/régions, éventuelle candidature Designed for Families |
| 30 | Classification du contenu (IARC) | **HUMAN ACTION** | questionnaire officiel Play Console |

## C. Validation et pistes

| # | Élément | Statut | Détail |
|---|---|---|---|
| 31 | Tests sur appareils Android réels | **HUMAN ACTION + agent local** | installation, TTS réellement entendu, claviers réels, rotation, reprise, réseau instable, surcouche constructeur |
| 32 | AAB signé + test interne | **HUMAN ACTION** | `tools\build-google-play-release.cmd --sign`, puis enregistrement dans le registre de versions ; aucun upload automatique |
| 33 | Test fermé obligatoire si compte personnel concerné | **HUMAN ACTION** | pour un compte personnel créé après le 13/11/2023 : au moins **12 testeurs inscrits en continu pendant 14 jours** avant demande d'accès production |
| 34 | Rapport avant lancement | **HUMAN ACTION** | examiner les alertes et compatibilités dans Play Console |
| 35 | Demande d'accès production | **HUMAN ACTION** | après satisfaction des conditions applicables et réponse au questionnaire de préparation |
| 36 | Publication production | **BLOCKED** | uniquement après validation technique, administrative et politique |

## D. Commandes Windows

```cmd
tools\build-google-play-release.cmd
tools\build-google-play-release.cmd --sign
```

La première commande vérifie et construit sans publier. La seconde nécessite les variables de signature privées et produit l'AAB signé ; elle ne doit jamais écrire les secrets dans Git.

## E. Références Google vérifiées le 02/11/2026

- Android Developers — exigence de niveau d'API cible : API 36 à partir du 31/08/2026 pour les nouvelles applications/mises à jour Android standard.
- Play Console Help — assets de prévisualisation : icône 512×512 PNG 32 bits avec alpha ; feature graphic 1 024×500 JPEG/PNG 24 bits sans alpha.
- Play Console Help — nouveaux comptes personnels : test fermé avec au moins 12 testeurs inscrits continûment pendant 14 jours avant demande d'accès production.

Toujours revalider ces règles dans Play Console juste avant soumission : les politiques externes peuvent évoluer indépendamment du code du dépôt.
