# Finot Académie — État orchestration multi-store

Date : 2026-10-31

## Source de vérité actuelle

### `main` — production candidate (Release Candidate)

- SHA : `5de9b03bcc6f9db820a0ff12598cb7ec0833eaeb`.
- Commit de fusion de la PR #38 (« Android / Store hardening + validated multistore runtime »), dont les parents sont :
  - `3945e5c` : ancien `main`, avec le correctif CI Ubuntu 24.04 de la PR #37 ;
  - `69e93b9` : runtime intégré.
- Le runtime multistore Android/Store est **intégré dans `main`**.
- La CI post-merge sur `main@5de9b03` est verte :

  | Workflow | Résultat |
  |---|---|
  | MathQuest CI (regression, Chromium, Firefox, WebKit) | ✅ |
  | Finot Multistore Android (multistore-tests, android-build) | ✅ |
  | Primary special depth | ✅ |
  | Final product inventory | ✅ |
  | Pages build/deployment | ✅ |

Le runtime intégré contient :

- `claude/multistore-runtime` et `claude/android-store-hardening@8edfb1a` ;
- Capacitor 8.6 / Android ;
- le hardening enfants, privacy et parent gate ;
- un design Supabase non déployé ;
- la CI Android réelle ;
- les correctifs RC finaux (`docs/rc-hardening-evidence.md`) :
  - FileProvider limité au cache interne ;
  - `restorePurchases()` réservé à l'espace parents ;
  - suppression complète d'un profil local, sans copie cachée.

Aucun rebase ni force-push n'a été utilisé.

## PR

### #38 — runtime Android / Store : **FUSIONNÉE ✅**

- Source : `chatgpt/runtime-integration` @ `69e93b94988d2379de21aeb17df0ac8e1e913298`.
- Fusionnée dans `main` le 31/10/2026 (commit de fusion `5de9b03`).
- CI verte avant fusion (PR et push sur `69e93b9`) et après fusion (`main@5de9b03`).

### #35 — orchestration

- DRAFT ;
- documentation/orchestration uniquement ;
- `main@5de9b03` y a été fusionné normalement : pas de rebase, pas de réécriture.
- Le diff contre `main` ne contient que des documents de `docs/`.
- Ne pas fusionner sans accord explicite du propriétaire.

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

Le runtime intégré dans `main` :

- retire l'ancien endpoint Supabase mort ;
- désactive le suivi distant par défaut ;
- ne fait aucune requête lorsqu'aucun backend n'est configuré ;
- utilise un snapshot cloud minimal/allowlisté lorsqu'un backend fictif est activé en test ;
- exclut les données sensibles inutiles, notamment date de naissance complète, réponses libres, diagnostic, DYS et secrets ;
- contient un dossier `supabase/` de design/migrations/tests locaux, mais rien n'est déployé.

Le provisioning réel reste une décision ultérieure nécessitant accord explicite.

## Gates P0 actualisés

### Fermés côté code et CI (dans `main@5de9b03`)

- **Packaging et build Android** :
  - packaging `www/` reproductible ;
  - runtime Capacitor ;
  - Android SDK 36 ;
  - JDK 21 en CI ;
  - APK et AAB techniques générés.
- **Permissions Android minimales** : `INTERNET` seule, `RECORD_AUDIO` absent, `AD_ID` absent.
- **Sauvegarde Android** désactivée (`allowBackup=false` et `dataExtractionRules`).
- **FileProvider durci** : `cache-path` interne uniquement, aucun `external-path`.
- **Micro Android** : fermé par la désactivation de la reconnaissance vocale Android, avec l'alternative « écoute et répète ».
- **Liens externes** bloqués dans l'espace enfant, avec une garde globale.
- **Parent gate réel** (`MQParentGate`).
- **Analytics** : désactivées par défaut, consentement parent, valeurs sur liste fermée (`analytics-guard`).
- **Achats et restauration** réservés à l'espace parents, liste de produits fermée (`entitlements-guard`).
- **Synchronisation** :
  - payload distant minimal (liste blanche) ;
  - date de naissance hors cloud ;
  - suivi distant désactivé par défaut.
- **Suppression complète d'un profil local**, sans aucune copie cachée (`mathquest_profile_deleted_backup` n'est plus créée).
- **CI web** (Chromium, Firefox, WebKit) et **CI Android** vertes.

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

1. ~~terminer la revue de #38~~ — fait ;
2. ~~fusionner #38 après accord explicite~~ — fait (`main@5de9b03`) ;
3. ~~resynchroniser #35 sur le nouveau `main`~~ — fait (merge normal) ;
4. exécuter protocole Android physique, un test à la fois (`android-physical-validation-protocol.md`) ;
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
Tests appareil réel ██░░░░░░░░ 20 %  protocole prêt ; 0 test physique exécuté
```

Les pourcentages représentent le travail effectivement vérifié. Ils ne signifient pas que Finot est déjà publiable : les derniers points sont principalement physiques, administratifs, juridiques et Store.
