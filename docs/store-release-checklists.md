# Finot Académie — checklists exécutables de publication V1

Référence : 2026-10-31  
Runtime : `main` @ `5de9b03bcc6f9db820a0ff12598cb7ec0833eaeb` (PR #38 fusionnée, runtime multistore intégré ; ancien HEAD runtime `69e93b9`)

Ces checklists ne constituent pas une autorisation de publication. Toute création définitive d'identifiant Store, dépense, activation commerciale ou publication nécessite l'accord explicite de Sébastien.

---

# A. Google Play

## A1 — Compte / accès

- [ ] confirmer le type de compte développeur : personnel / organisation ;
- [ ] confirmer si le compte personnel est soumis à l'exigence de test fermé ;
- [ ] si concerné : préparer au moins 12 testeurs continus pendant 14 jours ;
- [ ] ne payer les 25 USD qu'après accord explicite ;
- [ ] coordonnées développeur/support prêtes.

## A2 — Identité application

- [x] nom commercial : Finot Académie ;
- [ ] package ID définitif approuvé ;
- [ ] `versionName` production défini ;
- [ ] `versionCode` production monotone ;
- [ ] clé de signature / Play App Signing décidé ;
- [x] aucun secret de signature commité dans Git.

## Scénarios V1 (à choisir avant les déclarations Store)

| Scénario | Description | Conséquence Store |
|---|---|---|
| **V1 local-only** (par défaut, état de `main@5de9b03`) | Suivi distant **non activé** : aucune donnée enfant n'est envoyée à un serveur Finot. | Data Safety : aucune donnée « collectée » au sens Google pour le suivi. La suppression de compte serveur ne s'applique pas. |
| **V1 avec cloud** (plus tard, optionnel) | Suivi parent distant activé. | Seulement après provisioning sécurisé (UE), migration appliquée, audit (Security Advisors, tests A/B, suppression, rétention) et accord explicite. Il faut alors recalculer Data Safety, la privacy policy et les fiches. |

## A3 — Android technique

- [x] même base PWA conservée ;
- [x] runtime Capacitor/Android construit ;
- [x] targetSdk/API 36 dans le projet candidat ;
- [x] package `www/` reproductible ;
- [x] Capacitor sync en CI ;
- [x] APK debug généré réellement ;
- [x] AAB release de validation généré réellement ;
- [x] manifest fusionné audité ;
- [x] aucune permission inutile constatée ;
- [x] `AD_ID` absent ;
- [x] `RECORD_AUDIO` absent ;
- [x] backup Android désactivé ;
- [x] FileProvider durci : `cache-path` interne uniquement, aucun `external-path` ;
- [x] suivi distant désactivé par défaut ;
- [x] aucune logique de self-update native ajoutée ;
- [x] CI Android verte sur `main@5de9b03` après la fusion de #38 ;
- [ ] AAB production signé ;
- [ ] installation propre sur au moins un téléphone Android réel ;
- [ ] cold start offline réel ;
- [ ] mise à jour APK sans perte localStorage/profil ;
- [ ] rotation / clavier virtuel / reprise après fermeture validés ;
- [ ] TalkBack validé ;
- [ ] TTS FR/EN/IT validé sur appareil réel.

### Preuves CI Android

- JDK 21 : PASS ;
- Android SDK 36 : PASS ;
- multistore-tests : PASS ;
- android-build : PASS ;
- APK debug : `59 690 683` octets ;
- AAB validation : `58 017 432` octets ;
- package technique : `fr.finot.academie.dev`.

## A4 — Enfants / confidentialité

- [x] aucun tracker publicitaire ;
- [x] aucun `AD_ID` ;
- [x] analytics off par défaut ;
- [x] consentement parent exigé par l'architecture analytics ;
- [x] liens externes bloqués côté enfant ;
- [x] achats futurs **et restauration des achats** gardés par l'espace parents ;
- [x] suppression d'un profil local = effacement complet (aucune copie cachée `mathquest_profile_deleted_backup`) ;
- [x] snapshot distant réduit/allowlisté côté client ;
- [x] date de naissance complète hors snapshot cloud ;
- [x] reconnaissance vocale Android désactivée V1 ;
- [ ] Target Audience exact ;
- [ ] déclaration Families finale ;
- [ ] privacy policy publique ;
- [ ] Data Safety finale ;
- [ ] suppression cloud réelle si backend activé ;
- [ ] rétention documentée si backend activé ;
- [ ] aucune pression commerciale liée aux XP/streak/erreurs scolaires confirmée lors de la monétisation réelle.

## A5 — Store listing

- [ ] titre ;
- [ ] description courte ;
- [ ] description longue ;
- [ ] catégorie Education ;
- [ ] icon Store ;
- [ ] feature graphic ;
- [ ] captures téléphone ;
- [ ] captures tablette si distribution tablette ;
- [ ] URL privacy ;
- [ ] URL support ;
- [ ] email support ;
- [ ] classification IARC ;
- [ ] déclarations Ads = non, sauf changement futur validé ;
- [ ] déclarations App access / login exactes.

## A6 — Tests Play

- [ ] internal testing ;
- [ ] installation depuis Play ;
- [ ] crash-free ;
- [ ] test fermé si requis ;
- [ ] 12 testeurs continus / 14 jours si compte concerné ;
- [ ] retours réels collectés ;
- [ ] aucun P0 applicable ouvert ;
- [ ] production access demandé seulement après validation.

---

# B. Microsoft Store

## B1 — Compte / réservation

- [ ] compte Microsoft personnel éligible Windows Developer Program ;
- [ ] inscription Partner Center ;
- [ ] nom Finot Académie disponible/réservé après accord ;
- [ ] aucune dépense non autorisée.

## B2 — PWA

- [x] HTTPS sur canal Web actuel ;
- [x] manifest PWA existant ;
- [x] `display: standalone` ;
- [x] service worker existant ;
- [x] offline couvert par tests historiques ;
- [x] aucune dépendance au runtime Android pour la PWA ;
- [ ] manifest enrichi Store-quality (`id`, `scope`, screenshots/icons selon besoin) ;
- [ ] package Windows réel ;
- [ ] installation Windows réelle ;
- [ ] mise à jour Windows sans perte données ;
- [ ] navigation clavier finale ;
- [ ] dark/DYS/accessibilité validés dans le package Store.

## B3 — Packaging

- [ ] analyse PWABuilder ;
- [ ] aucun warning bloquant ;
- [ ] package Windows généré ;
- [ ] signature/association Partner Center ;
- [ ] installation Windows réelle ;
- [ ] lancement menu Démarrer ;
- [ ] fenêtre redimensionnable ;
- [ ] offline ;
- [ ] update.

## B4 — Listing Microsoft

- [ ] nom ;
- [ ] description ;
- [ ] catégorie Education ;
- [ ] captures desktop ;
- [ ] icons/tuiles requis ;
- [ ] privacy URL ;
- [ ] support ;
- [ ] tranche d'âge / rating ;
- [ ] déclaration de capacités cohérente avec le package.

---

# C. Samsung Galaxy Store

## C1 — Mutualisation

- [x] même projet Android que Google ;
- [x] aucun second projet source ;
- [x] mêmes tests produit/hardening ;
- [ ] stratégie package name Store décidée seulement si nécessaire ;
- [ ] éventuel product flavor réalisé uniquement après décision.

## C2 — Technique

- [x] target API 36 ;
- [x] projet Android réel construit en CI ;
- [x] AAB généré ;
- [x] aucune auto-update native parallèle ;
- [ ] installation sur appareil Samsung réel ;
- [ ] clavier Samsung ;
- [ ] rotation ;
- [ ] mode économie batterie ;
- [ ] reprise ;
- [ ] offline ;
- [ ] TTS installé ;
- [ ] navigation parent/externe.

## C3 — Listing

- [ ] nom ;
- [ ] description ;
- [ ] icon ;
- [ ] captures ;
- [ ] catégorie ;
- [ ] privacy URL ;
- [ ] rating ;
- [ ] pays/langues ;
- [ ] déclaration de permissions/données ;
- [ ] politique enfants vérifiée.

---

# D. Web / PWA

## D1 — Fonctionnel automatisé

- [x] profils/migrations couverts par CI ;
- [x] offline/update couverts par CI ;
- [x] responsive automatisé ;
- [x] dark mode automatisé ;
- [x] DYS automatisé ;
- [x] audio/dictée web automatisés ;
- [x] Chromium complet vert ;
- [x] Firefox vert ;
- [x] WebKit vert ;
- [ ] protocole physique mobile final ;
- [ ] installation PWA physique finale ;
- [ ] VoiceOver/TalkBack physique final.

## D2 — Manifest premium

- [ ] `id` stable ;
- [ ] `scope` explicite ;
- [ ] icons multiples ;
- [ ] maskable dédié ;
- [ ] screenshots PWA ;
- [ ] categories ;
- [ ] description ;
- [ ] shortcuts uniquement si utiles ;
- [ ] aucun changement cassant les installations existantes.

## D3 — Sécurité / conformité

- [x] aucun secret serveur évident trouvé dans le dépôt ;
- [x] aucun tracker publicitaire ;
- [x] ancien endpoint Supabase retiré du runtime candidat ;
- [x] remote sync off par défaut ;
- [ ] privacy policy publique ;
- [ ] CSP / headers à auditer sur hébergement final ;
- [ ] backend cloud audité uniquement s'il est activé.

---

# E. Amazon Fire Tablet

Statut V1 : **NO-GO prioritaire** tant que A/B/C/D ne sont pas stabilisés.

Points déjà favorables :

- même APK Android envisageable ;
- aucune dépendance Google Play Services obligatoire identifiée dans l'architecture actuelle ;
- pas de micro Android requis.

Restent obligatoires avant GO :

- [ ] Fire HD réelle ;
- [ ] WebView compatible ;
- [ ] TTS français ;
- [ ] offline ;
- [ ] UI tablette ;
- [ ] navigation physique ;
- [ ] absence de dépendance Store Google implicite.

---

# F. Gate commun de release

Aucun canal ne passe en production si :

- P0 applicable > 0 ;
- CI rouge ;
- tests physiques critiques non faits ;
- privacy/Data Safety incohérentes avec le build ;
- package production non signé ;
- secrets présents ;
- package ID non approuvé ;
- données enfant non minimisées ;
- suppression cloud absente alors que le cloud est activé ;
- accord final de Sébastien absent.
