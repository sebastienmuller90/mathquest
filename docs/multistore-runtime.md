# Finot Académie — socle technique multi-store (branche `claude/multistore-runtime`)

État au 31/10/2026, base `main` = `05b4c0c` (version 8.73.2). Version de la branche : `8.74.0-multistore-runtime-2026-10-31`.
Ce document décrit le travail du runtime ; la documentation de release, la conformité, les métadonnées store et la CI multi-store
relèvent de l'autre agent (`chatgpt/multistore-release-orchestration`).

## 1. Architecture : une seule base, aucune divergence

```
SOURCE (racine du dépôt, zéro build)
  ├── PWA web / Microsoft Store : servie telle quelle (GitHub Pages), service worker inchangé
  └── scripts/package-www.mjs → www/ (copie déterministe, liste blanche + fichiers suivis par Git)
        └── npx cap sync android → android/ (Capacitor 8.6)
              ├── Google Play (AAB)
              ├── Samsung Galaxy Store (même AAB ou APK, même code)
              └── Fire Tablet (même APK, après validation physique)
```

- **Couche plateforme** : `js/platform.js` (`MQPlatform`). En web, elle ne change rien. En natif :
  - pas de service worker (fichiers embarqués) ;
  - lien de suivi parent vers le site public ;
  - bouton Retour Android ;
  - sauvegarde à la pause ;
  - évènements `platform:pause`, `platform:resume` et `platform:network`.
- **Voix** : `js/platform-tts.js`. La WebView Android n'a pas `speechSynthesis`. Le module la fournit au-dessus du TTS
  Android (plugin `@capacitor-community/text-to-speech`), sans modifier `js/audio-engine.js`.
- **Confidentialité** : `js/sync-snapshot.js` définit le snapshot minimal envoyé au suivi parent (détail en §5).
- **Interfaces dormantes** (aucun fournisseur, rien de verrouillé) :
  - `js/analytics.js` (`MQAnalytics.track`) ;
  - `js/entitlements.js` (`MQEntitlements`).

## 2. Commandes reproductibles (pour la CI multi-store)

Prérequis : Node 24 et `npm ci`. Navigateurs de test : `npx playwright install chromium`, comme la CI actuelle.
Build Android : **JDK 21** (Capacitor 8) et **Android SDK** (platform 36, build-tools 36).

| Étape | Commande | Sortie |
|---|---|---|
| Paquet web déterministe | `npm run package:www` | `www/` + `www/finot-package.json` (version, versionCode, SHA-256, empreinte) |
| Test du paquet | `npm run test:package` | 19 contrôles |
| Couche plateforme (Android simulé) | `npm run test:runtime` | 26 contrôles |
| Projet Android statique + sync réelle | `npm run test:android` | 28 contrôles (sans SDK) |
| Confidentialité du snapshot | `node tests/sync-privacy.test.js` | 18 contrôles |
| Statistiques / droits | `node tests/analytics-entitlements.test.js` | 20 contrôles |
| Synchronisation Android | `npm run android:sync` | `android/app/src/main/assets/public` = `www/` |
| APK debug | `cd android && ./gradlew assembleDebug` | `app/build/outputs/apk/debug/app-debug.apk` (id `fr.finot.academie.dev`) |
| AAB release (Google Play) | `cd android && ./gradlew bundleRelease -PfinotAppId=<id de production>` | `app/build/outputs/bundle/release/app-release.aab` |
| APK release (Galaxy / Fire) | `cd android && ./gradlew assembleRelease -PfinotAppId=<id>` | `app/build/outputs/apk/release/` |

- **Signature** : uniquement par variables d'environnement, jamais dans Git :
  - `FINOT_UPLOAD_KEYSTORE` (chemin) ;
  - `FINOT_UPLOAD_KEYSTORE_PASSWORD` ;
  - `FINOT_UPLOAD_KEY_ALIAS` ;
  - `FINOT_UPLOAD_KEY_PASSWORD`.

  Sans elles, les artefacts release ne sont pas signés.
- **Google Play** : utiliser *Play App Signing*. La clé ci-dessus est la clé d'import (upload key).
- **Version** :
  - `versionName` = X.Y.Z de `VERSION` dans `sw.js` ;
  - `versionCode` = X×1 000 000 + Y×1 000 + Z (8.74.0 → 8074000) ;
  - les deux sont lus dans `finot-package.json` embarqué ;
  - chaque bump de `sw.js` produit donc un `versionCode` strictement croissant.

## 3. Identifiants

- `applicationId` :
  - **`fr.finot.academie.dev` par défaut** ;
  - la production passe par `-PfinotAppId=…` ou `FINOT_APP_ID` ;
  - le format est validé par Gradle.
- Namespace de code stable : `fr.finot.academie`.
- **L'identifiant de production Google Play est définitif une fois publié** : décision à prendre par le propriétaire. Rien n'est réservé.
- **Origine WebView figée** (`https`, `localhost`) : la changer effacerait `localStorage`, donc tous les profils. Un test la verrouille.

## 4. Android : configuration vérifiée

- **SDK** :
  - minSdk 24 ;
  - compileSdk 36 ;
  - **targetSdk 36** (exigé par Google Play pour toute nouvelle app ou mise à jour depuis le 31/08/2026).
- **Permissions** : `INTERNET` seule.
  - Elle sert au suivi parent facultatif.
  - Les plugins Capacitor, App et TextToSpeech n'en ajoutent aucune ; TextToSpeech déclare seulement une requête de visibilité `TTS_SERVICE`.
  - `AD_ID` est retiré explicitement (`tools:node="remove"`).
  - Le manifeste fusionné final reste à contrôler au premier build Gradle réel (`app/build/intermediates/merged_manifests`).
- **Réseau** :
  - HTTPS uniquement (`network_security_config`), autorités système ;
  - pas de lien profond ;
  - pas d'intent exporté hors du lanceur.
- **Activité** :
  - rotation, clavier et thème sombre sans redémarrage (`configChanges`) ;
  - orientation libre (téléphones et tablettes) ;
  - `launchMode=singleTask`.
- **Identité visuelle** :
  - icône adaptative : fond #7C3AED + Finot à 92 % ;
  - icônes classiques et rondes ;
  - écran de démarrage Android 12+ sur fond #F4F1FF ;
  - tout est généré depuis `icon.png` par `scripts/android-assets.py` (Pillow).
- **Zones sûres** : `SystemBars.insetsHandling = native`. Les `env(safe-area-inset-*)` existants suffisent, aucun CSS n'a été modifié.
- **Supprimés** : Firebase/google-services, logo Capacitor du modèle, tests d'exemple du modèle (mauvais package).
- **Wrapper Gradle** : JAR vérifié identique au binaire officiel 8.14.3 et empreinte de la distribution épinglée.
- **`npm audit`** : 4 alertes modérées (glob/minimatch via `@capacitor/cli`). Elles concernent l'outil en ligne de commande, rien n'est embarqué dans l'app. Pas de `--force` (rétrograderait la CLI en v4).
- **Sauvegarde Android** : **désactivée** depuis `claude/android-store-hardening` : `allowBackup=false`, `fullBackupContent=false`, `dataExtractionRules` excluant tout (cloud et transfert d'appareil). Le parent garde l'export / import manuel. Preuve : `tests/android-backup.test.js`.

### À vérifier sur appareil réel (non faisable ici : pas de JDK/SDK, pas d'appareil)

1. Build Gradle debug et release, puis AAB.
2. Manifeste fusionné et liste réelle des permissions.
3. Démarrage à froid.
4. Clavier virtuel : la saisie reste visible en bord à bord.
5. Retour Android.
6. Rotation.
7. Persistance des profils après mise à jour de l'APK.
8. Voix TTS françaises, anglaises et italiennes réellement installées.
9. TalkBack.
10. Thème sombre.
11. Mode DYS.
12. Espace parent.
13. Version de la WebView.

La reconnaissance vocale est **indisponible par conception** dans l'app Android V1 (`js/speech-capability.js`) : alternative « écoute et répète », aucune permission micro, aucune reconnaissance simulée (`tests/speech-capability.test.js`). L'affichage sur un vrai appareil reste à constater (§4).

## 5. Confidentialité enfant (P0 traité côté client)

- **Avant** : `snapshot()` envoyait tout l'état moins `pin`, `rec` et `sync`, c'est-à-dire :
  - date de naissance ;
  - genre et compagnon ;
  - profil d'apprentissage et diagnostic ;
  - mode DYS ;
  - énoncés des erreurs ;
  - aide aux devoirs ;
  - réponses tapées aux interrogations ;
  - messages destinés à l'enfant ;
  - économie et réglages.
- **Après** : seuls les champs affichés par la page parent distante sont envoyés :
  - `name` (40 caractères maximum), `avatar`, `grade` ;
  - `xp`, `totalQ`, `totalOk`, `time`, `streak`, `daily`, `dailyGoal` ;
  - `chap`, `lessons`, `merit` (sans `notes`) ;
  - `readingMastery`, `readingProgress`, `competencies` ;
  - `activityLog`, `studyLog` ;
  - `answerLog` (date, chapitre, juste/faux, source, durée) ;
  - `interrogations` (états et scores, sans questions ni réponses) ;
  - `path`, `pathHist`, `lastSeen` et `syncSchema: 1`.
- **Taille** : environ 3 fois moins de données.
- **Vérification** : affichage parent identique sur les 3 onglets (test).
- **Profil local** : non modifié, donc aucune migration de stockage nécessaire.
- **Nouveaux stockages** : `finot_analytics_v1` et `finot_entitlements_v1`. Ils sont versionnés, séparés des profils et jamais synchronisés.
- **Seul flux réseau de l'app** : `rpc()` de `js/app-state.js`, plus `finot-package.json` en local dans l'app native. Aucune autre requête sortante (testé : démarrage natif à froid sans réseau, zéro requête externe).

## 6. Supabase : audit honnête

**Ce qui n'a PAS pu être audité :** aucune définition SQL (tables, RLS, fonctions `mq_*`, `SECURITY DEFINER`, `search_path`) n'existe dans le
dépôt ni dans son historique. **Aucune règle RLS n'a été lue ; aucune affirmation sur l'isolation serveur n'est faite ici.**

**Constat du 31/10/2026 :** `nctmxxixugoxairmtjsa.supabase.co` → **NXDOMAIN** (résolveurs local et 8.8.8.8).
- Le projet Supabase semble supprimé ou indisponible.
- Le suivi parent à distance est donc **hors service en production**. L'app affiche « Connexion impossible » ; rien d'autre n'est cassé.

**Contrat client observé (boîte noire) :**

| RPC | Appelant | Arguments | Remarques |
|---|---|---|---|
| `mq_register` | enfant | `p_child` (28 car.), `p_parent` (32 car.) | Codes aléatoires `crypto.getRandomValues`, alphabet de 55 symboles (≈ 162 et 185 bits). |
| `mq_push` | enfant | `p_child`, `p_data` (snapshot) | Renvoie les actions parent en attente. Toute personne connaissant le code enfant peut écraser les données et lire les actions. |
| `mq_ack` | enfant | `p_child`, `p_ids` | |
| `mq_get` | parent | `p_parent` | Renvoie `{data, pending, updated_at}`. Le code parent est un jeton porteur ; il est dans le fragment d'URL (`#`), donc non envoyé aux serveurs web. |
| `mq_act` | parent | `p_parent`, `p_kind`, `p_payload` | |

**Clé** : `sb_publishable_…` est publique par conception. Le vrai risque est côté serveur.

**À exiger avant toute remise en service (P0 serveur) :**
1. Tables en RLS **activée sans politique** pour `anon`, accès uniquement par les RPC.
2. RPC `SECURITY DEFINER` avec `search_path` fixé.
3. Contrôle de longueur et de format des codes.
4. Taille maximale de `p_data`.
5. Limitation de débit.
6. Validation des `p_kind` et `p_payload` (liste fermée).
7. Purge des anciens snapshots complets déjà stockés (date de naissance, etc.).
8. Durée de conservation.
9. Procédure de suppression sur demande d'un parent.
10. SQL versionné dans le dépôt, avec tests (sinon l'audit reste impossible).

**Mise à jour (`claude/android-store-hardening`)** : le suivi à distance est désactivé tant qu'aucun backend validé n'est configuré (`js/remote-sync-config.js`). Une conception complète et testée dans PostgreSQL 18 local est proposée dans `supabase/` (59 tests), sans aucun déploiement.

**Décision P0 restante :** provisionner ce backend après revue, ou garder le suivi désactivé en V1.

Dans le second cas, `INTERNET` reste utile uniquement si une autre fonction réseau existe ; aujourd'hui aucune.

## 7. Samsung Galaxy Store

- Même projet et même code, aucun fork.
- Galaxy Store accepte les AAB ; l'APK `assembleRelease` est aussi disponible.
- Différences limitées aux métadonnées et à la signature.
- Avec Play App Signing, la signature Play diffère de la signature de l'APK Galaxy (clé d'import). Les mises à jour croisées entre stores sont donc impossibles, ce qui est normal ; même `applicationId` possible.
- **À confirmer dans le Seller Portal** : format accepté, exigences de cible SDK, catégorie Enfants.

## 8. Amazon Fire Tablet : analyse (aucun développement)

- Amazon n'accepte plus de nouvelles apps Android **mobiles** depuis le 20/02/2025 (fermeture le 20/08/2025). L'Appstore reste maintenu sur **Fire Tablet**.
- **Compatibilité attendue** :
  - Fire OS 8 = Android 11 (API 30), au-dessus de minSdk 24 ;
  - aucune dépendance aux services Google (pas de GMS ni Firebase) ;
  - permission unique ;
  - même APK.
- **Risques** :
  - version de la WebView Amazon (fonctionnalités JS et CSS récentes) ;
  - présence d'une voix TTS française sur Fire ;
  - catégorie Enfants et exigences Amazon Kids.
- **Verdict : GO conditionnel** (adaptation estimée faible, aucun code prévu), après un test physique sur une tablette Fire HD (Fire OS 8). **NO-GO** si la voix française manque ou si la WebView est trop ancienne. Ne retarde pas Google Play.

## 9. Microsoft Store / PWA

- Aucune modification du manifeste, du service worker ni de la logique de cache.
- Le service worker est toujours enregistré en web (test).
- Les modules ajoutés sont inertes en web, sauf `MQPlatform`, qui ne fait qu'exposer des informations.
- Aucune dépendance Android chargée par les pages web : `window.Capacitor` est absent en web.

## 10. Factory (classement, sans extraction)

| Catégorie | Éléments génériques identifiés |
|---|---|
| **CORE** | `scripts/package-www.mjs` (paquet déterministe) ; `js/platform.js` (plateforme, Retour, cycle de vie, réseau) ; `js/platform-tts.js` (TTS natif) ; `js/sync-snapshot.js` (motif de liste blanche) ; `js/analytics.js` ; `js/entitlements.js` ; configuration Android (identifiant configurable, version issue du paquet, signature par environnement, permissions minimales) ; `scripts/android-assets.py` ; tests `mobile-*`, `android-project`, `sync-privacy`, `analytics-entitlements` |
| **PATTERNS** | profils multiples (`mathquest_profiles_v2`), progression (`chap`, `lessons`, `mastery`), XP et niveaux, badges, séries, économie anti-triche, statistiques parent, historique (`answerLog`, `activityLog`) |
| **FINOT** | programmes CP→3e, matières, cours, exercices, dictées, compétences, moteur adaptatif scolaire, diagnostic, Finot (compagnon) |

## 11. Restes

- **P0** :
  - décision sur le backend du suivi parent (§6) ;
  - premier build Gradle réel : installer JDK 21 et Android SDK 36, ou lancer le build en CI ;
  - choix de l'`applicationId` de production.
- **P1** :
  - validation sur appareil (§4) ;
  - reconnaissance vocale en WebView ;
  - `allowBackup` ;
  - liens externes (`window.open`) à placer derrière l'espace parents si la catégorie Enfants l'exige ;
  - formulaire Data safety, à remplir d'après §5.
- **Pour l'autre agent** :
  - intégrer les commandes du §2 en CI, avec un job Android sur ubuntu-latest + JDK 21 et un job web inchangé ;
  - intégrer les 5 nouvelles suites de tests ;
  - fiches store et Data safety (§5, §6) ;
  - protocole physique Android (§4) ;
  - Fire (§8).
