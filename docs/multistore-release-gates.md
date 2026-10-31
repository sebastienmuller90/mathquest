# Finot Académie — gates de release multi-store

Référence runtime candidate : `chatgpt/runtime-integration` @ `69d959e2f1a57f15d6c543a3f3b654d81639c164`

## 1. Règle de décision

Aucune publication Store tant qu'un P0 applicable au canal reste ouvert.

Une CI verte ne remplace pas :

- les tests sur appareils réels ;
- les décisions administratives ;
- les preuves backend si le cloud est activé ;
- la validation juridique finale.

## 2. P0 — état actualisé

| ID | Sujet | État | Preuve actuelle |
|---|---|---|---|
| P0-01 | Payload cloud trop large | ✅ FERMÉ côté client | snapshot distant allowlisté + tests `sync-privacy`/hardening |
| P0-02 | Date de naissance complète envoyable au cloud | ✅ FERMÉ côté client | tests prouvant son absence du payload distant |
| P0-03 | Micro Android non caractérisé | ✅ FERMÉ V1 | reconnaissance vocale désactivée dans Android, `RECORD_AUDIO` absent |
| P0-04 | Permissions Android excessives | ✅ FERMÉ | manifest fusionné audité ; uniquement capacité réseau attendue |
| P0-05 | Sauvegarde automatique Android enfant | ✅ FERMÉ | `allowBackup=false` + règles de transfert Android 12+ |
| P0-06 | Liens externes côté enfant | ✅ FERMÉ | garde globale + parent gate + tests |
| P0-07 | Analytics sans consentement parent | ✅ FERMÉ côté architecture | analytics off par défaut, aucune provider active, garde parent |
| P0-08 | Achats accessibles depuis enfant | ✅ FERMÉ côté architecture | entitlements gardés par parent gate + allowlist produit |
| P0-09 | Privacy policy finale publique | 🔴 OUVERT | texte final + identité/contact + URL publique nécessaires |
| P0-10 | Data Safety finale | 🔴 OUVERT | finaliser sur package ID/signature/backend réellement retenus |
| P0-11 | Validation physique Android critique | 🔴 OUVERT | installation/offline/update/TTS/TalkBack/etc. à exécuter |
| P0-12 | Isolation Supabase inter-familles | ⚪ CONDITIONNEL | applicable seulement si suivi distant activé en V1 |
| P0-13 | Suppression/rétention cloud réelle | ⚪ CONDITIONNEL | applicable seulement après provisioning backend |

## 3. P1 — avant V1 production

| ID | Sujet | État | Critère de fermeture |
|---|---|---|---|
| P1-01 | AAB technique Android | ✅ FERMÉ | AAB validation réel généré en CI |
| P1-02 | target API Google actuel | ✅ FERMÉ techniquement | SDK/target 36 validé par projet et build |
| P1-03 | permissions Android minimales | ✅ FERMÉ | audit manifest CI |
| P1-04 | tests Android réels | 🔴 OUVERT | téléphone réel : install/offline/update/UI/TTS/TalkBack |
| P1-05 | package ID production | 🔴 OUVERT | choix explicite irréversible avant publication |
| P1-06 | signature release | 🔴 OUVERT | keystore/Play App Signing configuré hors Git |
| P1-07 | manifest PWA Store-quality | 🟠 PARTIEL | enrichir sans casser installations existantes |
| P1-08 | assets Google | 🔴 OUVERT | icon, feature graphic, screenshots réels |
| P1-09 | assets Microsoft | 🔴 OUVERT | desktop screenshots + package assets |
| P1-10 | assets Samsung | 🔴 OUVERT | icon + screenshots appareil |
| P1-11 | validation physique Finot finale | 🔴 OUVERT | protocole complété |
| P1-12 | changelog/versioning production | 🟠 PARTIEL | RC finale à figer |
| P1-13 | closed testing Google si applicable | 🔴 ADMIN | 12 testeurs/14 jours selon type de compte |
| P1-14 | support/contact publics | 🔴 OUVERT | email/URL fonctionnels |
| P1-15 | Windows package réel | 🔴 OUVERT | PWABuilder/Partner Center + tests Windows |
| P1-16 | Samsung appareil réel | 🔴 OUVERT | installation et comportement Galaxy vérifiés |

## 4. Preuves CI du candidat runtime

Sur `69d959e` :

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
- AAB volontairement non signé ;
- package technique `fr.finot.academie.dev`.

Manifest validé :

- `INTERNET` : présent ;
- `allowBackup=false` ;
- `RECORD_AUDIO` : absent ;
- `AD_ID` : absent.

## 5. Gates par canal

### Google Play

GO uniquement si :

- P0 applicables tous fermés ;
- package ID production approuvé ;
- AAB release signé ;
- target API conforme ;
- Data Safety finale ;
- Families/Target Audience/IARC complétés ;
- privacy URL publique ;
- assets prêts ;
- tests appareils réels réussis ;
- closed testing terminé si requis ;
- accord explicite de publication.

### Microsoft Store

GO uniquement si :

- P0 applicables fermés ;
- PWA packaging validé ;
- install/update/offline Windows testés ;
- listing/assets/privacy prêts ;
- aucun fork fonctionnel Windows ;
- accord explicite de publication.

### Samsung Galaxy Store

GO uniquement si :

- base Android Google stabilisée ;
- même projet source Android ;
- aucune divergence fonctionnelle non justifiée ;
- test Galaxy réel ;
- metadata/screenshots exacts ;
- privacy prête ;
- accord explicite de publication.

### Web / PWA

GO release stable uniquement si :

- P0 applicables fermés ;
- offline/update verts ;
- stockage/migrations verts ;
- validation physique minimale ;
- privacy accessible.

### Amazon Fire

NO-GO V1 prioritaire. Réévaluation après stabilisation des quatre canaux principaux.

## 6. Backend Supabase — gate conditionnel

Aucun projet Supabase Finot n'est actuellement provisionné.

Si le suivi distant reste désactivé en V1, les points backend ne bloquent pas la publication du produit local-first.

Si le suivi distant est activé, alors avant toute donnée réelle :

1. provisionner un projet après accord ;
2. appliquer les migrations versionnées ;
3. exécuter tests A/B ;
4. vérifier anti-énumération ;
5. vérifier suppression réelle ;
6. définir rétention/backups ;
7. ajouter limitation de débit ;
8. exécuter Security Advisors ;
9. aligner Privacy/Data Safety.

## 7. Gate de fusion #38

Avant fusion de `chatgpt/runtime-integration` vers `main` :

1. HEAD exact confirmé ;
2. branche 0 commit derrière `main` ;
3. CI navigateur complète verte ;
4. CI Android complète verte ;
5. aucun secret/signature/package ID production ;
6. revue diff ;
7. accord explicite de Sébastien.

Aucune fusion automatique de #38 n'est autorisée par ce document.

## 8. Gate documentaire #35

La PR #35 reste documentation/orchestration uniquement.

Elle ne doit pas être fusionnée avant :

- stabilisation/choix sur #38 ;
- resynchronisation propre avec le futur `main` ;
- suppression des informations devenues obsolètes ;
- cohérence avec le runtime réellement livré.

## 9. Definition of Done — Application #001

Finot Académie devient officiellement Blueprint #001 de l'App Factory lorsque :

- pipeline Android reproductible validé ;
- Google Play prêt ou publié après accord ;
- Microsoft Store prêt ou publié après accord ;
- Samsung prêt depuis la même base Android ;
- PWA reste stable ;
- P0 = 0 pour le périmètre V1 choisi ;
- privacy/data map stables ;
- Factory Core v1 extrait ;
- protocoles physiques terminés ;
- leçons de publication documentées pour l'app #002.
