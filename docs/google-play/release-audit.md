# Finot Académie — Audit technique Google Play (release)

Base : `main@4f9444d`. Mesures faites le 01/11/2026 sur le build réel (`clean assembleDebug lintRelease bundleRelease`, JDK 21), pas
sur la documentation. Les chiffres cités proviennent du manifeste fusionné release
(`android/app/build/intermediates/merged_manifests/release/processReleaseManifest/AndroidManifest.xml`), de `aapt2 dump badging`
(APK debug), de l'AAB (`app-release.aab`) et du rapport `lint-results-release.xml`.

## 1. Fiche technique

| Élément | Valeur vérifiée | Source |
|---|---|---|
| `applicationId` **release** | `fr.finot.academie` | manifeste fusionné release, `capacitor.config.json` embarqué dans l'AAB |
| `applicationId` **debug** | `fr.finot.academie.dev` (suffixe `.dev`) | `aapt2 dump badging` de l'APK debug |
| `namespace` (code Java/R) | `fr.finot.academie` (inchangé) | `android/app/build.gradle` |
| `minSdk` / `targetSdk` / `compileSdk` | 24 / **36** / 36 | manifeste fusionné ; exigence Google Play « targetSdk ≥ 36 » **respectée** |
| Capacitor | 8.6.0 (`@capacitor/android`, `/core`, `/cli`) | `package.json` |
| Plugins natifs | `@capacitor/app` 8.1.2, `@capacitor-community/text-to-speech` 8.0.2 | `android/app/capacitor.build.gradle` |
| Android Gradle Plugin / Gradle | 8.13.0 / 8.14.3 | `android/build.gradle`, `gradle-wrapper.properties` |
| JDK de build | 21 (Temurin) ; JBR 25 fait échouer Gradle | essais de build |
| `versionName` / `versionCode` | `1.0.0` / `8075006` | manifeste fusionné (voir §3) |
| Débogable | **non** (release) ; oui en debug (normal) | pas de `android:debuggable` dans le manifeste release + `debuggable false` explicite |
| Sauvegarde | `allowBackup="false"`, `fullBackupContent="false"`, `dataExtractionRules` excluant cloud **et** transfert d'appareil | manifeste |
| Trafic en clair | interdit (`cleartextTrafficPermitted="false"`) ; aucun `usesCleartextTraffic` | `network_security_config.xml` |
| Orientation | libre (aucun `screenOrientation`) ; `configChanges` couvre rotation, clavier, thème, densité | manifeste |
| Liens profonds | **aucun** (un seul `intent-filter` : MAIN/LAUNCHER) | manifeste |
| Nom / icône | « Finot Académie », icône adaptative + ronde, splash portrait/paysage | ressources |
| WebView | contenu local `https://localhost`, pas de contenu mixte, `webContentsDebuggingEnabled:false` | `capacitor.config.json` |
| Taille de l'AAB | 58,0 Mo (non signé) | `app-release.aab` |

## 2. Identifiant de production : analyse d'impact et migration

Décision préparée dans cette branche : **`fr.finot.academie`** devient l'identifiant par défaut des builds release ; le debug reste
`fr.finot.academie.dev` pour s'installer à côté d'une version de production sans l'écraser.

| Zone | Impact | Action faite |
|---|---|---|
| `android/app/build.gradle` | `applicationId` par défaut passé de `.dev` à `fr.finot.academie` ; `debug { applicationIdSuffix '.dev' }` appliqué seulement si aucun identifiant explicite n'est donné ; `release { debuggable false }` | modifié |
| Identifiant explicite (`-PfinotAppId` / `FINOT_APP_ID`) | reste prioritaire et sans suffixe | inchangé : la CI `multistore-android.yml` passe toujours `-PfinotAppId=fr.finot.academie.dev` (APK + AAB de validation), son comportement est identique |
| `namespace` | **non modifié** : il n'a rien à voir avec l'identifiant publié, le changer imposerait de déplacer `MainActivity.java` et de réécrire les `R` sans bénéfice | inchangé (conforme à la consigne) |
| Code Java | un seul fichier (`MainActivity.java`, package `fr.finot.academie`), aucune référence en dur à l'identifiant | aucun |
| `FileProvider` | `authorities="${applicationId}.fileprovider"` : suit l'identifiant automatiquement (`fr.finot.academie.fileprovider` en release) | vérifié dans le manifeste fusionné |
| Permission interne AndroidX | `…DYNAMIC_RECEIVER_NOT_EXPORTED_PERMISSION` suit aussi l'identifiant | prise en compte dans la liste autorisée du script |
| `capacitor.config.json` | `appId` passé à `fr.finot.academie` (valeur informative écrite dans l'AAB) | modifié ; test `tests/android-project.test.js` mis à jour |
| Origine web / données | **aucune relation** : l'origine reste `https://localhost`, donc `localStorage` et les profils ne dépendent pas de l'identifiant | vérifié |
| Mise à jour d'une installation `.dev` | impossible (identifiants différents) : la production est une nouvelle application ; aucun utilisateur n'a installé `.dev` hors développement | à savoir |
| Documentation | `docs/multistore-*.md`, `docs/store-release-checklist*.md`, `docs/android-permissions-matrix.md` citent encore `.dev` comme « package technique » : historiques, laissés intacts ; le présent dossier fait foi pour Google Play | noté |
| Irréversibilité | **un identifiant publié sur Google Play est définitif** : à confirmer avant la première création de l'application dans Play Console | HUMAN ACTION |

## 3. Version de première release (versionName commercial découplé)

Deux nombres, deux sources, qui ne dépendent plus l'un de l'autre :

| Nombre | Rôle | Source de vérité | Valeur actuelle |
|---|---|---|---|
| `versionName` | version **commerciale**, visible dans Google Play | `android/store-version.json` (champ `versionName`, format `X.Y.Z`) | **1.0.0** |
| `versionCode` | compteur **interne**, strictement croissant, jamais affiché | dérivé de `VERSION` dans `sw.js` : `major × 1 000 000 + minor × 1 000 + patch` (règle inchangée) | **8 075 006** |

Chaîne : `scripts/package-www.mjs` lit les deux sources → `www/finot-package.json` → `app/build.gradle` (lecture seule, rien en dur) →
manifeste Android. Tests : `tests/mobile-package.test.js`, `tests/android-project.test.js`, `tests/google-play-release.test.js`.

Pourquoi le `versionCode` n'est pas remis à 1 : il reste dérivé de `VERSION`, qui doit déjà augmenter à chaque changement de fichier mis
en cache (règle de `CLAUDE.md`). Il ne peut donc pas régresser, sans compteur manuel supplémentaire. Limite Google Play :
2 100 000 000, soit la version interne majeure 2099. Le `versionName` peut changer librement (1.0.1, 1.1.0, 2.0.0…) sans toucher au compteur.

**Procédure pour une nouvelle release Google Play** (les deux gestes sont obligatoires) :
1. incrémenter le **numéro** de `VERSION` dans `sw.js` (ex. `8.75.6-…` → `8.75.7-…`) : le `versionCode` augmente ;
2. modifier `versionName` dans `android/store-version.json` (ex. `1.0.0` → `1.0.1`).

| Release | versionName (store-version.json) | VERSION (sw.js) | versionCode |
|---|---|---|---|
| première (état actuel) | 1.0.0 | `8.75.6-…` | 8075006 |
| correctif | 1.0.1 | `8.75.7-…` | 8075007 |
| nouvelle fonctionnalité | 1.1.0 | `8.76.0-…` | 8076000 |
| version majeure | 2.0.0 | `9.0.0-…` | 9000000 |

Mécanisme anti-réutilisation : `docs/google-play/version-ledger.json` liste les versions réellement téléversées. Le script de
release **refuse** un `versionCode` déjà présent ou inférieur au dernier, et un `versionName` déjà publié ou non supérieur au
dernier ; après un téléversement manuel, `tools\build-google-play-release.cmd --record <piste>` l'enregistre.

Note : le suffixe de `VERSION` (description, date) change le cache du service worker sans changer le `versionCode` ; c'est ce qui permet de
corriger du code avant le premier téléversement en gardant 8 075 006. Après un téléversement, tout nouveau téléversement exige un
nouveau numéro.

## 4. Manifeste fusionné release — contrôle

| Contrôle | Résultat |
|---|---|
| Permissions | `android.permission.INTERNET` ; `fr.finot.academie.DYNAMIC_RECEIVER_NOT_EXPORTED_PERMISSION` (permission **propre à l'app**, de niveau signature, ajoutée par AndroidX ; sans effet pour l'utilisateur) |
| `RECORD_AUDIO` | **absent** |
| `AD_ID` | **absent** (retiré explicitement par `tools:node="remove"`) |
| Localisation, caméra, contacts, stockage, notifications | absents |
| Composants exportés | `MainActivity` (lanceur) ; `androidx.profileinstaller.ProfileInstallReceiver` (AndroidX, protégé par la permission `android.permission.DUMP`, réservée au système) |
| Fournisseurs | `FileProvider` (non exporté, cache interne seulement, aucun `external-path`) ; `androidx.startup` (non exporté) |
| `<queries>` | `android.intent.action.TTS_SERVICE` (visibilité du moteur vocal installé) |
| Lien profond / `android:scheme` | aucun |

Le script de release applique ce contrôle **automatiquement** (liste blanche de permissions et de composants exportés).

## 5. Build release et lint

| Étape | Résultat |
|---|---|
| `npm run android:sync` | paquet web `www/` copié dans `assets/public` (≈ 1 900 fichiers) |
| `assembleDebug` | OK, 59,7 Mo |
| `lintRelease` | **0 erreur, 0 fatal, 10 avertissements** non bloquants : ordre `uses-permission`/`application` dans le manifeste, 4 ressources inutilisées du modèle Capacitor, icône monochrome absente (icônes thématiques Android 13+), `splash.png` en dossier sans densité |
| `bundleRelease` | OK, AAB non signé (aucune variable de signature) |
| R8 / ProGuard | `minifyEnabled false`, choix conservé : le code Java se limite à `MainActivity` et à deux plugins ; le produit est le paquet web. Activer R8 sans recette sur appareil risquerait de casser les plugins par réflexion, pour un gain de taille négligeable |
| Secrets dans l'AAB | aucun `.jks/.keystore/.p12/.pem`, aucun `google-services.json`, aucune clé |

## 6. Dépendances susceptibles de collecter des données

Aucune. Pas de Google Play services, Firebase, AdMob, Billing, RevenueCat, Sentry, Crashlytics, Analytics (voir
`data-safety-draft.md` §4). Le seul code réseau applicatif est le suivi parent distant, **désactivé** dans le binaire.

## 7. Suppression des données

| Action | Effet vérifié dans le code |
|---|---|
| Supprimer un profil (confirmation + code parent) | `deleteProfile()` (`js/app-state.js`) retire le profil de `PDB`, enregistre, puis appelle `purgeProfileCopies()` ; impossible de supprimer le dernier profil |
| Désinstaller l'application | le stockage privé de l'app (WebView `localStorage`) est supprimé par Android |
| Effacer les données (Réglages Android → Stockage) | idem |
| Réinstallation | repart à zéro : **aucune restauration automatique** (`allowBackup=false`, transfert désactivé) |
| Suivi distant | désactivé ; s'il l'était un jour, `syncdelete` supprime côté serveur (à retester avant activation) |

Les copies locales du profil sont purgées avec lui (corrigé dans cette PR, test `tests/profile-delete-purge.test.js`) : `mathquest_import_backup`, `mathquest_v1_backup`, copies brutes `mathquest_profiles_corrupt_backup_*` et mémoire de rotation des questions (`mathquest_question_rotation_v1`). Les copies d'un autre profil sont conservées ; une copie illisible est supprimée par prudence. `mathquest_v1` (miroir du profil actif) est réécrit avec le profil actif restant.

Architecture : **local-first, sans compte serveur**. Aucun système de compte cloud n'est créé pour Google Play ; l'exigence
« suppression de compte » ne s'applique pas (pas de compte).

## 8. Monétisation — état réel

| Sujet | État dans le code |
|---|---|
| Premium / droits | `js/entitlements.js` : interface préparée, **aucun fournisseur branché**, aucun appel réseau |
| Publicités | **absentes** (aucun SDK, `AD_ID` retiré) |
| Achats intégrés | **absents** (aucun SDK Billing) |
| Abonnements | **absents** |
| Paiement | **absent** |

La V1 Google Play n'est bloquée par aucune fonctionnalité commerciale. Toute monétisation future exige : SDK certifié Familles,
mise à jour de Data Safety, politique, déclaration « Publicités » et « Achats ».

## 9. Dépôt public

Les docs de ce dossier sont versionnés (liste blanche `.gitignore`). Aucune donnée personnelle ni secret : l'éditeur, le contact et
l'adresse sont des **placeholders** à compléter avant toute publication.
