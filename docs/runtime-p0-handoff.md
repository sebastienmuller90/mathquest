# Finot Académie — rapport de fermeture P0 runtime

Ancien rôle de ce document : handoff des P0 runtime à Claude Code.  
Nouveau rôle : consigner ce qui a réellement été livré et validé pour éviter de refaire le même travail.

Référence candidate : `chatgpt/runtime-integration` @ `69d959e2f1a57f15d6c543a3f3b654d81639c164`

## 1. Payload cloud allowlisté — FERMÉ côté client

État : ✅

Le runtime n'envoie plus un clone large de l'état enfant.

Le snapshot distant est réduit aux données réellement nécessaires à l'espace parent.

Tests dédiés vérifient notamment l'absence des champs sensibles/non nécessaires.

## 2. Date de naissance complète hors cloud — FERMÉ côté client

État : ✅

La date de naissance complète reste locale pour les besoins pédagogiques/UI mais n'appartient pas au snapshot distant V1.

Les tests privacy valident son absence côté synchronisation.

## 3. Suppression cloud — FERMÉ côté UI/contrat, CONDITIONNEL côté backend réel

État : 🟠

Le runtime contient une action de suppression des données distantes depuis l'espace parents avec confirmation renforcée.

Mais aucun backend Finot n'est aujourd'hui provisionné.

La fermeture complète du flux serveur exige, seulement si le cloud est activé :

- backend réel ;
- migration appliquée ;
- tests de suppression ;
- ancien token invalidé ;
- rétention/backups réels documentés.

## 4. Schéma/RPC/RLS Supabase — DESIGN LIVRÉ, PAS DÉPLOYÉ

État : 🟠 conditionnel

Un dossier `supabase/` existe dans le runtime candidat avec :

- migration SQL ;
- schéma privé ;
- RLS ;
- fonctions/RPC prévues ;
- jetons hachés ;
- anti-énumération ;
- suppression/rotation ;
- tests locaux PostgreSQL via PGlite.

59 tests PostgreSQL locaux ont été rapportés verts dans le chantier hardening.

Aucun projet Supabase Finot n'est créé. Il n'existe donc aucune RLS de production à valider aujourd'hui.

## 5. Rétention backend — RESTE JURIDIQUE/PRODUCTION

État : 🔴 si cloud activé

Le design technique existe mais la durée finale doit encore être validée avant production.

À décider :

- durée snapshots ;
- durée actions consommées ;
- délai de purge ;
- logs ;
- backups ;
- délai post-suppression.

## 6. Microphone Android — FERMÉ V1

État : ✅

Décision V1 : aucune reconnaissance vocale Android.

Preuves :

- `RECORD_AUDIO` absent du manifest fusionné ;
- alternative pédagogique « écoute et répète » ;
- aucun bouton micro Android inopérant ;
- aucune permission micro demandée ;
- aucun SDK vocal tiers introduit.

Le Web/PWA peut continuer à utiliser Web Speech lorsque le navigateur le permet.

## 7. Permissions Android — FERMÉ côté build

État : ✅

Manifest CI validé :

- `INTERNET` présent ;
- `RECORD_AUDIO` absent ;
- `AD_ID` absent ;
- backup désactivé ;
- pas de permissions larges inutiles.

## 8. Backup Android — FERMÉ

État : ✅

- `allowBackup=false` ;
- transfert appareil/appareil automatique désactivé ;
- données enfant non restaurées implicitement ;
- export/import parent reste la stratégie contrôlée.

## 9. Liens externes enfant — FERMÉ

État : ✅

- liens externes interdits dans espace enfant ;
- garde globale ;
- crédits externes convertibles en texte ;
- navigation externe réservée à l'espace parents réellement affiché.

## 10. Analytics — FERMÉ côté architecture V1

État : ✅

- aucune provider active ;
- analytics off par défaut ;
- consentement parent requis ;
- PII/prénoms filtrés ;
- allowlists de valeurs ;
- retrait du consentement prévu.

## 11. Entitlements / achats futurs — FERMÉ côté architecture V1

État : ✅

- aucune intégration de paiement réelle ;
- espace enfant ne peut pas acheter ;
- parent gate réel ;
- allowlist de produits ;
- seul le produit confirmé peut créer un entitlement ;
- aucun contenu pédagogique actuellement verrouillé.

## 12. Android / Google Play runtime — VALIDÉ TECHNIQUEMENT

État : ✅ pour build technique

Réellement validé en CI :

- Capacitor Android ;
- JDK 21 ;
- Android SDK / target 36 ;
- package `www/` reproductible ;
- `android:sync` ;
- Gradle `assembleDebug` ;
- Gradle `bundleRelease` ;
- APK debug ;
- AAB de validation ;
- manifest audit.

Artefacts :

- APK : `59 690 683` octets ;
- AAB : `58 017 432` octets.

Reste volontairement hors scope :

- package ID production ;
- signature release ;
- Play App Signing ;
- publication.

## 13. Samsung — ARCHITECTURE MUTUALISÉE

État : ✅ côté architecture, 🔴 côté appareil/Store

Même projet Android que Google.

Aucun fork fonctionnel nécessaire.

Reste :

- test appareil Samsung ;
- listing Galaxy Store ;
- éventuelle variante de package seulement si décision Store l'exige.

## 14. Service worker / wrapper natif — VALIDÉ ARCHITECTURALEMENT

La PWA Web conserve son service worker.

Le wrapper Android embarque une copie `www/` locale issue de la même base source.

Le runtime natif n'introduit pas de mécanisme d'auto-update contournant les Stores.

## 15. Tests de référence

Hardening Claude :

- `1605 PASS`
- `0 FAIL`
- `0 SKIP`
- 96 suites.

CI candidate `69d959e` :

- Regression : PASS ;
- Chromium : PASS ;
- Firefox : PASS ;
- WebKit : PASS ;
- Primary special depth : PASS ;
- Final product inventory : PASS ;
- Multistore tests : PASS ;
- Android build : PASS.

## 16. P0/P1 encore réellement ouverts

### P0 publication

- privacy policy finale publique ;
- Data Safety finale ;
- tests physiques Android critiques ;
- aucune régression physique enfant/parent.

### P0 conditionnels cloud

Seulement si Supabase est activé :

- provisioning ;
- tests A/B réels ;
- suppression réelle ;
- rate limiting ;
- rétention/backups ;
- advisors sécurité.

### P1

- package ID production ;
- signature release ;
- AAB signé ;
- assets finaux ;
- Google closed testing si requis ;
- Microsoft package/tests ;
- Samsung appareil réel ;
- TalkBack/TTS/rotation/update sur vrai Android.

## 17. Règle pour les futurs agents

Ne pas réouvrir les P0 déjà fermés ci-dessus sans preuve de régression.

Toute évolution future doit partir de la branche candidate ou de son merge dans `main`, jamais de l'ancien état `8.73.x`.
