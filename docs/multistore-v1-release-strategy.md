# Finot Académie — stratégie multi-store V1

Référence produit stable : `main` @ `3945e5c18bf82058d92e9ee7238e1afcbca85d13`  
Runtime candidat : `chatgpt/runtime-integration` @ `69d959e2f1a57f15d6c543a3f3b654d81639c164`  
PR runtime : `#38` (DRAFT, non fusionnée)  
PR orchestration : `#35` (DRAFT, documentation)

## Principes

- Conserver l'application PWA HTML/CSS/JavaScript existante.
- Aucun passage automatique à React.
- Aucun fork fonctionnel Android/Windows/Samsung.
- Apple App Store exclu de la V1.
- Budget initial de publication : 25 USD maximum.
- Aucun paiement, publication, package ID définitif ou décision irréversible sans accord explicite.
- Confidentialité enfant et isolation des familles restent des gates de release.

## Ordre V1

1. Google Play
2. Microsoft Store
3. Web / PWA
4. Samsung Galaxy Store
5. Amazon Fire Tablet : étude secondaire uniquement

## État runtime désormais prouvé

La branche `chatgpt/runtime-integration` intègre le hardening Android/Store et a été validée par CI réelle.

Preuves :

- Regression : PASS ;
- Chromium : PASS ;
- Firefox : PASS ;
- WebKit : PASS ;
- Primary special depth : PASS ;
- Final product inventory : PASS ;
- Multistore tests : PASS ;
- Android build : PASS.

Build réel :

- APK debug : `59 690 683` octets ;
- AAB release validation : `58 017 432` octets ;
- package technique : `fr.finot.academie.dev` ;
- aucun secret/signature release ;
- target/API 36 ;
- JDK 21 ;
- manifest fusionné audité.

Permissions/privacité Android :

- `INTERNET` présent ;
- `RECORD_AUDIO` absent ;
- `AD_ID` absent ;
- backup Android désactivé ;
- aucune localisation/caméra/contacts/SMS/stockage large.

## Matrice V1 actualisée

| Canal | Artefact | État technique | Principal reste à faire | Décision |
|---|---|---|---|---|
| Google Play | AAB Android | AAB validation réel généré | tests appareil, package ID, signature, privacy/Data Safety, closed testing | GO après derniers gates |
| Microsoft Store | PWA packagée/MSIX | PWA stable et automatisée | packaging Windows + tests installation/offline/update | GO après tests |
| Web / PWA | site installable | CI multi-browser verte | physique mobile/accessibilité + privacy publique | GO après gates |
| Samsung Galaxy Store | AAB même base | projet Android mutualisé validé | appareil Samsung + listing | GO après Google stabilisé |
| Amazon Fire Tablet | APK/AAB éventuel | architecture favorable | vraie Fire HD + validation WebView/TTS | NO-GO V1 prioritaire |

## Google Play — état

### Fermé techniquement

- base Android/Capacitor ;
- target/API 36 ;
- AAB de validation ;
- manifest minimal ;
- aucune permission micro ;
- aucun `AD_ID` ;
- backup désactivé ;
- remote sync off par défaut ;
- analytics provider off ;
- parent gate pour achats/liens ;
- build reproductible via GitHub Actions.

### Encore ouvert

- package ID production définitif ;
- versionName/versionCode production ;
- signature / Play App Signing ;
- téléphone Android réel ;
- privacy policy publique ;
- Data Safety finale ;
- Target Audience/Families/IARC ;
- assets Store ;
- compte développeur ;
- closed testing si le compte l'exige ;
- publication finale avec accord.

## Microsoft Store — stratégie

Voie retenue : conserver la PWA et la packager via l'écosystème Microsoft/PWABuilder sans fork Windows.

Déjà prouvé côté produit :

- PWA existante ;
- service worker ;
- offline/update couverts par tests ;
- Chromium/Firefox/WebKit verts ;
- desktop et navigation déjà largement testés.

Reste :

- manifest Store-quality ;
- analyse PWABuilder ;
- package Windows ;
- installation Windows réelle ;
- tests offline/update/stockage ;
- captures desktop ;
- listing/privacy.

## Samsung Galaxy Store

Même base Android que Google.

Déjà fermé :

- pas de second projet source ;
- target/API 36 ;
- AAB réel ;
- aucune auto-update native ;
- privacy/minimisation Android hardened.

Reste :

- appareil Samsung réel ;
- décision éventuelle sur package distinct/product flavor ;
- listing/captures ;
- politique enfants/privacy finale.

## Web / PWA

Doit rester installable, offline, responsive, desktop/mobile, sécurisée et rapide.

Automatisation candidate verte :

- PWA update ;
- offline ;
- responsive ;
- stockage/migrations ;
- dark mode ;
- DYS ;
- audio/dictée web ;
- Chromium/Firefox/WebKit.

Reste surtout la validation physique et l'enrichissement manifest/store metadata.

## Amazon

NO-GO V1 prioritaire.

Points favorables :

- pas de dépendance Google Services obligatoire identifiée ;
- pas de micro Android requis ;
- même APK envisageable.

Mais aucune validation Fire ne doit être revendiquée sans tablette Fire HD réelle.

## Supabase

Aucun projet Finot n'est provisionné.

Le runtime candidat :

- retire l'ancien endpoint mort ;
- remote sync off par défaut ;
- snapshot client minimisé ;
- dossier `supabase/` de design/migrations/tests locaux.

Deux stratégies V1 restent possibles :

### Option A — V1 sans cloud parent

- remote sync reste désactivé ;
- backend Supabase non bloquant pour publication ;
- privacy/Data Safety plus simples.

### Option B — V1 avec suivi parent distant

Avant activation :

- provisionner Supabase après accord ;
- migrations/RLS/RPC ;
- rate limiting ;
- tests A/B ;
- suppression réelle ;
- rétention/backups ;
- Security Advisors ;
- privacy/Data Safety mises à jour.

Aucune décision irréversible n'est prise ici.

## P0/P1 restants

### P0 publication

- privacy policy finale publique ;
- Data Safety finale ;
- tests physiques Android critiques ;
- confirmation de non-régression physique enfant/parent.

### P1

- package ID production ;
- signature/AAB signé ;
- assets Store ;
- Google closed testing si requis ;
- Microsoft package/tests ;
- Samsung appareil réel ;
- support/contact publics ;
- versioning RC final.

## Coordination Git

### #38

PR runtime candidate. Ne pas fusionner sans accord explicite.

### #35

PR documentation/orchestration. Elle reste volontairement séparée et sera resynchronisée sur le futur `main` après décision sur #38.

## Factory Blueprint

### Factory Core

App shell, navigation, onboarding, settings, stockage/migrations, offline, thème, dark mode, accessibilité, analytics consent, privacy, erreurs, parental gate, entitlements, notifications éventuelles, CI, tests, packaging Android, publication, versioning, store metadata, release checklist.

### Factory Patterns optionnels

Profils, XP, niveaux, badges, streak, objectifs, progression, statistiques, dashboard, historique, parcours, recommandations, challenges, récompenses.

### Finot uniquement

CP→3e, matières, programmes scolaires, cours, exercices, compétences, dictées, lecture, diagnostics, devoirs, évaluations, pédagogie et moteur adaptatif scolaire.

La Factory doit réutiliser les patterns, pas copier l'architecture historique à nombreux scripts globaux dépendants de leur ordre de chargement.
