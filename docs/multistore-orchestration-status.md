# Finot Académie — État orchestration multi-store

Date : 2026-10-31

## Source de vérité actuelle

### `main`

- SHA : `3945e5c18bf82058d92e9ee7238e1afcbca85d13`.
- La correction CI Ubuntu 24.04 de la PR #37 est fusionnée.
- La CI post-merge de `main` est verte.

### Runtime candidat

Branche : `chatgpt/runtime-integration`  
HEAD : `69d959e2f1a57f15d6c543a3f3b654d81639c164`

Cette branche intègre :

- `main@3945e5c` ;
- `claude/android-store-hardening@8edfb1a` ;
- Capacitor/Android ;
- hardening enfants/privacy/parent gate ;
- design Supabase non déployé ;
- CI Android réelle ;
- deux adaptations de tests historiques pour le nouveau comportement sécurisé « remote sync désactivé par défaut ».

Aucun rebase ni force-push n'a été utilisé.

## PR

### #38 — runtime Android / Store

- DRAFT ;
- source : `chatgpt/runtime-integration` ;
- cible : `main` ;
- HEAD : `69d959e` ;
- ne pas fusionner sans validation explicite.

Validation déjà obtenue sur le HEAD candidat :

- Regression : PASS ;
- Chromium : PASS ;
- Firefox : PASS ;
- WebKit : PASS ;
- Primary special depth : PASS ;
- Final product inventory : PASS ;
- Finot Multistore Android / multistore-tests : PASS ;
- Finot Multistore Android / android-build : PASS.

### #35 — orchestration

- DRAFT ;
- documentation/orchestration uniquement ;
- branche historique plus ancienne que le runtime candidat ;
- à garder séparée jusqu'à décision sur #38 ;
- documents en cours d'actualisation à partir des preuves réelles du runtime.

## Build Android réel

La chaîne GitHub Actions a réellement exécuté :

- Ubuntu 24.04 ;
- Node 24 ;
- JDK 21 Temurin ;
- Android SDK platform 36 ;
- build-tools 36.0.0 ;
- packaging `www/` ;
- Capacitor sync ;
- Gradle `assembleDebug` ;
- Gradle `bundleRelease` ;
- audit du manifeste fusionné ;
- upload des artefacts.

Artefacts validés :

- APK debug : `59 690 683` octets ;
- AAB release de validation : `58 017 432` octets ;
- AAB non signé, volontairement ;
- package technique : `fr.finot.academie.dev` ;
- aucun package ID production créé.

Contrôles du manifeste :

- `INTERNET` présent ;
- `allowBackup=false` ;
- règles de transfert/sauvegarde Android désactivées ;
- `RECORD_AUDIO` absent ;
- `AD_ID` absent ;
- pas de localisation/caméra/contacts/SMS/stockage large.

## Hardening runtime désormais prouvé côté code/CI

### Voix Android

- Pas de reconnaissance vocale Android V1.
- Aucun faux bouton micro.
- Aucun `RECORD_AUDIO`.
- Les étapes de prononciation Android utilisent une alternative pédagogique « écoute et répète ».
- Le Web/PWA compatible conserve son comportement existant.

### Backup Android

- Backup cloud Android désactivé.
- Transfert appareil-à-appareil désactivé via règles Android 12+.
- Export/import parent reste la voie contrôlée de transfert.

### Liens externes

- Les liens externes sont bloqués dans l'espace enfant.
- Les crédits pédagogiques peuvent rester visibles comme texte.
- Les ouvertures externes sont réservées à l'espace parents réellement affiché.

### Analytics

- Aucun fournisseur analytics actif.
- Analytics désactivés par défaut.
- Consentement parent requis.
- Valeurs allowlistées ; PII/prénoms filtrés.

### Entitlements / futurs achats

- Aucun fournisseur Store actif.
- Aucun contenu pédagogique actuellement verrouillé.
- Achat impossible depuis l'espace enfant.
- Liste de produits fermée.
- Seul le produit réellement confirmé peut accorder un entitlement.

## Supabase

État réel : aucun projet Supabase Finot n'est provisionné.

Le runtime candidat :

- retire l'ancien endpoint Supabase mort ;
- désactive le suivi distant par défaut ;
- ne fait aucune requête lorsqu'aucun backend n'est configuré ;
- utilise un snapshot cloud minimal/allowlisté lorsqu'un backend fictif est activé en test ;
- exclut les données sensibles inutiles, notamment date de naissance complète, réponses libres, diagnostic, DYS et secrets ;
- contient un dossier `supabase/` de design/migrations/tests locaux, mais rien n'est déployé.

Le provisioning réel reste une décision ultérieure nécessitant accord explicite.

## Gates P0 actualisés

### Fermés côté code/runtime candidat

- payload distant trop large : fermé côté client ;
- date de naissance complète dans le cloud : fermée côté client ;
- micro Android non caractérisé : fermé par désactivation de la reconnaissance vocale Android ;
- permissions Android excessives : fermé ;
- liens externes enfant : fermé ;
- analytics sans consentement : fermé ;
- achats hors parent gate : fermé ;
- backup Android enfant : fermé.

### Restent ouverts avant publication réelle

- privacy policy finale publique ;
- Data Safety finalisée sur build de production/signature finale ;
- tests physiques Android réels ;
- package ID production définitif ;
- signature release / Play App Signing ;
- assets Store finaux ;
- comptes Store et closed testing si applicable ;
- politique juridique de rétention ;
- backend Supabase réel uniquement si le suivi distant est activé en V1.

## Gates backend, seulement si Supabase est activé

- provisionner projet UE après accord ;
- appliquer migrations versionnées ;
- exposer uniquement la surface API prévue ;
- exécuter Security Advisors ;
- limitation de débit/réseau ;
- tests famille A/B ;
- suppression réelle ;
- rétention/backups réels ;
- monitoring sans payload enfant sensible.

## Tests encore réellement nécessaires

### Android physique

- installation APK ;
- cold start offline ;
- alternative « écoute et répète » ;
- Retour Android ;
- clavier virtuel ;
- portrait/paysage ;
- dark mode ;
- TalkBack ;
- TTS FR/EN/IT disponible sur appareil ;
- liens parent vers navigateur ;
- mise à jour APK sans perte de profils ;
- réinstallation sans restauration automatique.

### Windows / Microsoft Store

- package PWA/MSIX réel ;
- installation Windows ;
- offline ;
- update ;
- clavier/accessibilité ;
- conservation du stockage.

### Samsung

- même base Android ;
- test appareil Samsung réel ;
- listing Galaxy Store ;
- vérification des règles spécifiques Store.

### Amazon Fire

Toujours NO-GO V1 prioritaire. Test Fire HD réel uniquement après stabilisation Google/Microsoft/Samsung/PWA.

## Ordre d'exécution recommandé

1. terminer la revue de #38 ;
2. ne fusionner #38 qu'après accord explicite ;
3. resynchroniser ensuite #35 sur le nouveau `main` ;
4. exécuter protocole Android physique, un test à la fois ;
5. figer package ID production ;
6. préparer signature release sans secret dans Git ;
7. produire AAB signé de release ;
8. finaliser privacy/Data Safety ;
9. produire assets Store définitifs ;
10. Google internal/closed testing ;
11. Microsoft packaging/tests ;
12. Samsung validation ;
13. backend Supabase uniquement si suivi distant retenu V1 ;
14. décision Fire Tablet plus tard.

## Progression vérifiée

```text
GLOBAL              █████████░ 90 %
Audit réel          █████████░ 92 %
Privacy             █████████░ 94 %
Google Play         ████████░░ 82 %
Microsoft           ███████░░░ 70 %
Samsung             ███████░░░ 68 %
PWA/Web             ███████░░░ 72 %
Security            █████████░ 94 %
Factory             █████████░ 93 %
Supabase design     █████████░ 92 %
CI infra            ██████████ 100 %
Runtime Android     ██████████ 100 % code/CI
Build APK/AAB       ██████████ 100 % validation non signée
Tests appareil réel ██░░░░░░░░ 20 %
```

Les pourcentages représentent le travail effectivement vérifié. Ils ne signifient pas que Finot est déjà publiable : les derniers points sont principalement physiques, administratifs, juridiques et Store.
