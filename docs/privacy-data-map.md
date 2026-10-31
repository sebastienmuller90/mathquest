# Finot Académie — cartographie confidentialité / données enfant

Référence : `main` @ `5de9b03bcc6f9db820a0ff12598cb7ec0833eaeb` (PR #38 fusionnée, runtime multistore intégré ; ancien HEAD runtime `69e93b9`)

Objectif : documenter ce que Finot collecte, conserve, traite localement et transmet éventuellement afin de sécuriser Google Play / Microsoft Store / Samsung / PWA.

## 1. Principe de minimisation

Finot cible des mineurs. La règle de V1 est :

- collecter le minimum strictement nécessaire ;
- conserver localement tout ce qui n'a pas besoin d'être distant ;
- ne jamais envoyer un champ enfant au serveur uniquement parce qu'il existe dans l'état global ;
- utiliser un payload distant explicite en liste blanche ;
- aucun identifiant publicitaire ;
- aucune publicité ciblée enfant ;
- aucune exploitation commerciale de la progression scolaire, des erreurs, XP ou streak ;
- achats futurs sous contrôle parent uniquement.

## 2. Données de profil créées lors de l'onboarding

Le profil local peut contenir :

- prénom ou pseudonyme ;
- genre déclaré ;
- date de naissance complète, facultative ;
- classe ;
- compagnon/avatar ;
- niveau ressenti ;
- confiance déclarée ;
- objectifs ;
- matières préférées ;
- matières difficiles ;
- rythme préféré ;
- style d'aide ;
- plan initial dérivé ;
- date de création du profil.

La date de naissance complète reste locale.

## 3. Données pédagogiques locales

Le stockage local peut contenir notamment :

- progression par chapitre ;
- cours terminés et scores ;
- maîtrise ;
- révisions espacées ;
- vocabulaire ;
- erreurs et carnet d'erreurs ;
- historique d'activité ;
- lecture / compréhension ;
- parcours adaptatif ;
- diagnostic ;
- temps de travail ;
- streak ;
- XP, pièces, badges, niveaux ;
- récompenses familiales ;
- devoirs/actions parent ;
- préférences audio / thème / accessibilité ;
- historique du parcours et activités récentes.

Le stockage principal reste local-first.

## 4. État réel du suivi distant

Aucun projet Supabase Finot n'est actuellement provisionné.

Le runtime candidat :

- retire l'ancien endpoint Supabase mort ;
- désactive la synchronisation distante par défaut ;
- ne fait aucune requête tant qu'aucun backend explicite n'est configuré ;
- expose un mécanisme de feature flag/configuration pour les tests et un futur backend.

Donc, aujourd'hui : **aucune donnée enfant Finot n'est envoyée à un backend Supabase de production**.

## 5. Payload distant V1 candidat

Le runtime hardened n'utilise plus un clone large de l'état local.

Le payload distant est construit explicitement à partir des informations nécessaires à l'espace parent.

Il doit conserver le principe suivant :

- pseudonyme/prénom affiché au parent seulement si réellement nécessaire ;
- classe ;
- métriques de progression utiles ;
- scores/maîtrise agrégés ;
- contenus terminés ;
- révisions dues ;
- temps de travail agrégé ;
- devoirs/actions parent nécessaires ;
- récompenses familiales nécessaires ;
- dernier instant de synchronisation ;
- identifiants de contenus non personnels.

## 6. Données explicitement exclues du cloud

Le hardening et ses tests visent à exclure :

- date de naissance complète ;
- PIN parent ;
- code de secours parent ;
- mode DYS ;
- profil comportemental/apprentissage non nécessaire ;
- diagnostic détaillé ;
- réponses libres tapées par l'enfant ;
- audio enfant ;
- transcription vocale ;
- secrets locaux ;
- préférences UI/TTS non nécessaires ;
- identifiant publicitaire ;
- fingerprint ;
- localisation ;
- contacts ;
- photos/vidéos ;
- données appareil inutiles.

## 7. Tests privacy/runtime déjà réalisés

Le hardening Claude rapporte :

- `sync-privacy` : PASS ;
- `remote-sync-flag` : PASS ;
- `analytics-guard` : PASS ;
- `entitlements-guard` : PASS ;
- `external-links` : PASS ;
- `android-backup` : PASS ;
- `speech-capability` : PASS ;
- `run-all.js` : `1605 PASS, 0 FAIL, 0 SKIP`.

La CI candidate ajoute :

- Chromium : PASS ;
- Firefox : PASS ;
- WebKit : PASS ;
- build Android réel : PASS ;
- audit manifest : PASS.

## 8. Microphone / reconnaissance vocale

### Web / PWA

Lorsque le navigateur Web supporte Web Speech, la reconnaissance peut rester disponible selon les capacités du navigateur.

Le traitement par le navigateur/OS ne doit pas être présenté comme garanti 100 % local sans preuve spécifique.

### Android V1

Décision actuelle : **aucune reconnaissance vocale Android**.

- `RECORD_AUDIO` absent ;
- aucun micro demandé ;
- aucune capture audio ;
- aucune transcription ;
- alternative pédagogique « écoute et répète ».

Cette décision réduit la surface privacy enfant de la V1 Android.

## 9. Synthèse vocale

La lecture utilise la synthèse vocale disponible sur la plateforme.

Dans Android, le runtime passe par la couche TTS native afin d'éviter des activités muettes dans la WebView.

À vérifier physiquement :

- voix FR ;
- voix EN ;
- voix IT ;
- comportement offline selon voix installées.

## 10. Backup / transfert Android

Décision : backup Android automatique désactivé.

- `allowBackup=false` ;
- règles Android 12+ empêchant transfert automatique ;
- les données enfant ne doivent pas migrer implicitement via le compte Google ;
- l'export/import parent reste la stratégie contrôlée.

## 11. Liens externes

Décision V1 :

- aucun lien externe actif dans l'espace enfant ;
- crédits pédagogiques pouvant rester en texte ;
- navigation externe réservée à l'espace parents réellement affiché ;
- garde globale contre l'ouverture externe hors parent gate.

## 12. Analytics

État réel :

- aucune provider analytics active ;
- analytics désactivés par défaut ;
- consentement parent requis ;
- valeurs filtrées/allowlistées ;
- prénoms/PII filtrés ;
- aucun identifiant publicitaire.

Événements futurs admis seulement s'ils restent agrégés et sans PII :

- `app_open` ;
- `onboarding_started/completed` ;
- `profile_created` ;
- `lesson_started/completed` ;
- `exercise_started/completed` ;
- `correction_viewed` ;
- `session_started/completed` ;
- `parent_mode_opened` ;
- `offline_session` ;
- `app_error` ;
- événements achat côté parent uniquement si monétisation réellement activée.

Interdit : prénom, nom, date de naissance, texte libre enfant, réponse exacte libre, contenu audio, transcription vocale, identifiant publicitaire, fingerprint, géolocalisation précise.

## 13. Entitlements / futurs achats

État V1 :

- aucune bibliothèque de paiement Store active ;
- aucun achat réel ;
- parent gate obligatoire ;
- liste fermée de produits ;
- seul le produit confirmé peut accorder un entitlement ;
- aucun contenu pédagogique de base actuellement verrouillé.

## 14. Supabase — design futur

Le runtime candidat contient un dossier `supabase/` de design local :

- migrations ;
- schéma privé ;
- RLS ;
- jetons hachés ;
- RPC ;
- anti-énumération ;
- suppression/rotation ;
- tests PostgreSQL locaux PGlite.

Aucun de ces éléments n'est déployé en production aujourd'hui.

## 14 bis. Suppression locale d'un profil — ✅ effacement complet

Décision intégrée dans `main@5de9b03` (minimisation des données enfant) :

- la suppression d'un profil, avec le code parent, retire ce profil de `mathquest_profiles_v2` ;
- les autres profils restent strictement intacts ;
- le profil actif ne change pas si le profil supprimé n'était pas actif ;
- **aucune copie cachée** n'est conservée : `mathquest_profile_deleted_backup` n'est plus créé, et une éventuelle ancienne clé est retirée lors d'une suppression autorisée ;
- aucune fonction de restauration n'en dépendait.

Preuves :
- `tests/release-profiles-e2e.test.js` ;
- `tests/release-profile-isolation.test.js` ;
- `docs/rc-hardening-evidence.md`.

## 15. Suppression et rétention cloud

Applicable seulement si le backend est activé.

Avant première donnée réelle :

- action parent explicite ;
- double confirmation ;
- suppression snapshots/actions/association ;
- invalidation tokens ;
- politique de rétention ;
- politique backups ;
- test réel post-suppression.

## 16. Première traduction Google Data Safety — état actuel

### Android sans backend distant

Le candidat actuel vise :

- aucune publicité ;
- aucun `AD_ID` ;
- aucun microphone ;
- aucune localisation ;
- aucune caméra ;
- aucun contact ;
- aucune donnée santé ;
- aucune donnée financière enfant ;
- analytics provider désactivée ;
- données pédagogiques principalement locales.

### Si le suivi parent cloud est activé plus tard

La déclaration devra refléter exactement les données allowlistées réellement envoyées et leur finalité.

## 17. Gates privacy avant publication

### Fermés côté code

- [x] payload cloud allowlisté ;
- [x] date naissance complète exclue du snapshot ;
- [x] micro Android supprimé ;
- [x] backup Android désactivé ;
- [x] liens externes enfant bloqués ;
- [x] analytics off par défaut ;
- [x] achats parent-only ;
- [x] aucun `AD_ID`.

### Restent à fermer

- [ ] privacy policy finale publique ;
- [ ] Data Safety finale sur build production ;
- [ ] tests physiques Android ;
- [ ] TTS physique ;
- [ ] TalkBack ;
- [ ] backend réel uniquement si cloud retenu ;
- [ ] rétention juridique si cloud retenu.
