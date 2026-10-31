# Finot Académie — Factory Blueprint v0.1

Référence : `main` @ `05b4c0ce21bd78a9027367d1219e660ec86f7bda` (audit initial) ; socle actuel `main` @ `5de9b03` (PR #38 fusionnée)  
Objectif : extraire de Finot les briques réutilisables pour l’APP FACTORY sans recopier sa dette technique.

## 1. Règle générale

Finot est l’application pilote #001.

On réutilise :
- les comportements éprouvés ;
- les contrats de données ;
- les patterns UX ;
- les checklists ;
- les tests ;
- les pipelines de release ;
- les règles privacy/security.

On ne réutilise pas automatiquement :
- l’architecture globale à nombreux scripts chargés dans un ordre précis ;
- les dépendances implicites entre variables globales ;
- les noms historiques MathQuest/MadQuest ;
- les moteurs pédagogiques spécifiques à Finot.

## 2. FACTORY CORE

### 2.1 App Shell

Responsabilités :
- bootstrap ;
- routing/navigation ;
- lifecycle ;
- détection online/offline ;
- gestion d’erreurs globale ;
- version affichable ;
- feature flags ;
- surface PWA/native commune.

Contrat attendu : aucune feature métier ne doit dépendre de variables globales implicites.

### 2.2 Storage Core

Doit fournir :
- stockage local versionné ;
- migrations explicites ;
- sauvegarde atomique ;
- backup avant migration destructive ;
- détection corruption ;
- restauration ;
- isolation profils lorsque le produit utilise plusieurs profils ;
- export/import sécurisé si activé ;
- tests migration N→N+1.

Leçons Finot à conserver :
- ne jamais purger silencieusement une donnée invalide ;
- conserver une copie récupérable avant reconstruction ;
- dissocier le schéma local du schéma cloud.

### 2.3 Offline / PWA Core

Doit fournir :
- manifest ;
- service worker ;
- cache versionné ;
- stratégie assets lourds à la demande ;
- cohérence HTML/scripts ;
- démarrage à froid hors ligne ;
- update N→N+1 ;
- conservation des données locales pendant update ;
- bannière d’update non intrusive.

### 2.4 Settings Core

- thème ;
- dark mode ;
- accessibilité ;
- taille texte ;
- son ;
- préférences de langue ;
- privacy ;
- permissions ;
- support ;
- version.

### 2.5 Accessibility Core

- navigation clavier ;
- focus visible ;
- accessible names ;
- contraste ;
- lecteurs d’écran ;
- tailles mobiles ;
- texte agrandi ;
- réduction de mouvement si pertinent ;
- tests Playwright dédiés.

### 2.6 Privacy Core

- data map versionné ;
- allowlist des données cloud ;
- pas de collecte automatique de l’état global ;
- consentement lorsque nécessaire ;
- suppression ;
- rétention ;
- export ;
- privacy policy ;
- Data Safety/store disclosures ;
- interdiction des identifiants publicitaires pour apps enfant ;
- aucun tracker publicitaire enfant.

### 2.7 Analytics Core

Événements structurés, sans PII par défaut.

Propriétés autorisées par défaut :
- app_version ;
- platform ;
- locale ;
- feature_id ;
- content_id non personnel ;
- online/offline ;
- durée bucketisée ;
- score bucketisé.

Interdit par défaut :
- nom/prénom ;
- date de naissance ;
- texte libre ;
- réponse brute enfant ;
- audio ;
- transcription ;
- advertising ID ;
- fingerprint ;
- localisation précise.

### 2.8 Error / Diagnostics Core

- journal technique local minimal ;
- aucune PII dans logs ;
- code erreur stable ;
- export diagnostic volontaire ;
- crash/error events agrégés ;
- fallback offline.

### 2.9 Parental Gate Core

Optionnel selon produit, mais standardisé :
- zone parent protégée ;
- achats parent-only ;
- privacy/consent parent ;
- suppression/export ;
- réglages sensibles ;
- aucune récompense enfant ne doit déclencher directement un achat.

### 2.10 Monetization Core

Séparation stricte :
- progression produit ;
- entitlements ;
- paywall ;
- achats/restauration ;
- analytics commerce.

Jamais de liaison directe entre :
- erreur utilisateur ;
- frustration ;
- perte de streak ;
- XP ;
- récompense pédagogique

et pression à l’achat.

### 2.11 Release Core

- version produit ;
- version native ;
- version cache PWA ;
- changelog ;
- release candidate ;
- CI ;
- tests multi-browser ;
- tests appareil réel ;
- store metadata ;
- screenshots ;
- privacy gate ;
- security gate ;
- approval humain final.

### 2.12 Packaging Core

Une source produit, plusieurs wrappers/canaux :
- Web/PWA ;
- Android Google Play ;
- variante Samsung du même projet si nécessaire ;
- Windows/PWA packaging ;
- iOS futur possible.

Aucune duplication complète d’application par Store.

## 3. FACTORY PATTERNS OPTIONNELS

### Profils

- profil unique ou multiple ;
- isolation stricte ;
- switch ;
- suppression ;
- migration ;
- sauvegarde indépendante.

### Progression

- objectifs ;
- niveaux ;
- historique ;
- mastery ;
- statistiques ;
- recommandations ;
- reprise de session.

### Gamification

- XP ;
- badges ;
- streak ;
- challenges ;
- objets cosmétiques ;
- récompenses.

Règle Factory : gamification configurable et totalement indépendante de la monétisation.

### Dashboard

- KPI ;
- historique ;
- progression ;
- recommandations ;
- alertes ;
- filtres.

### Assistant contextuel

- aide ;
- explications ;
- suggestions ;
- recommandations.

Doit rester explicable et ne jamais masquer une décision critique.

## 4. FINOT UNIQUEMENT

Ne pas déplacer dans le Core :

- programmes scolaires CP→3e ;
- matières ;
- chapitres ;
- générateurs de questions ;
- diagnostics scolaires ;
- maîtrise par compétence ;
- carnet d’erreurs pédagogique ;
- répétition espacée scolaire ;
- dictée ;
- lecture ;
- prononciation ;
- devoirs scolaires ;
- bilans parent scolaires ;
- moteur adaptatif scolaire ;
- Finot/Momo/Léo ;
- contenus nationaux 2026-2027.

## 5. Architecture cible de la future Factory

La Factory ne doit pas imposer React, mais doit imposer des frontières claires.

Couche recommandée :

1. `core/` — shell, storage, privacy, analytics, errors, update, settings.
2. `platform/` — web, android, windows, ios futur.
3. `patterns/` — profiles, progression, gamification, dashboard, parental.
4. `product/` — logique métier propre à chaque app.
5. `tests/` — contrats Core + tests produit.
6. `release/` — store metadata, assets, compliance, versioning.

Le framework concret sera choisi application par application ; la Factory standardise les interfaces et les preuves, pas une technologie unique.

## 6. Contrats obligatoires de toute app Factory

Avant publication, chaque app doit fournir :

- `DATA_MAP.md` ;
- `PRIVACY.md` ;
- `PERMISSIONS.md` ;
- `STORE_MATRIX.md` ;
- `RELEASE_CHECKLIST.md` ;
- `VERSIONING.md` ;
- `CHANGELOG.md` ;
- tests smoke ;
- tests offline si applicable ;
- tests migration si données persistantes ;
- preuve de suppression cloud si backend ;
- preuve CI verte ;
- preuve appareil réel minimale.

## 7. Gates standardisés

### P0

- fuite de données ;
- isolation tenant/famille cassée ;
- secret exposé ;
- suppression impossible ;
- privacy/store declarations fausses ;
- paiement/publication non autorisé ;
- perte de données ;
- crash bloquant lancement.

### P1

- bug majeur parcours principal ;
- offline/update cassé ;
- accessibilité critique ;
- permission excessive ;
- packaging non reproductible ;
- store metadata incomplète.

### P2

- UX secondaire ;
- wording ;
- optimisation ;
- analytics avancés.

### P3

- fonctionnalités futures ;
- enrichissements ;
- nouveaux canaux.

## 8. Pipeline industriel cible

```text
IDEA
→ brief produit
→ scaffold Factory
→ feature development
→ tests TDD
→ audit privacy/security
→ RC
→ packaging
→ internal testing
→ closed testing si requis
→ store submission
→ production
→ analytics privacy-first
→ backlog d’amélioration
→ extraction des nouveaux patterns utiles
```

## 9. Ce que Finot doit encore prouver avant d’être le Blueprint #001 validé

- backend Supabase sécurisé et audité ;
- suppression cloud ;
- data minimization ;
- Android production ;
- Google closed testing ;
- Microsoft package ;
- Samsung variant ;
- validation physique complète ;
- metadata Store ;
- privacy policy ;
- Data Safety ;
- release multi-store réussie.

Une fois ces points terminés, Finot devient la référence de validation du Factory Core v1.
