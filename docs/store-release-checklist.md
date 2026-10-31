# Finot Académie — checklist opérationnelle Google Play / Samsung Galaxy Store / Amazon Fire

État au 31/10/2026, branche `claude/android-store-hardening` (version 8.75.0).

Ce document est **lié au code**. Chaque case cochée renvoie à un test qui la prouve. La checklist générale (comptes, listing, gouvernance) est `docs/store-release-checklists.md` (branche `chatgpt/multistore-release-orchestration`) ; on ne la duplique pas ici.

Rien ne doit être publié, payé ou réservé sans l'accord explicite du propriétaire.

**Légende**
- ✅ fait et prouvé par un test du dépôt ;
- 🔧 préparé, mais à exécuter sur une vraie chaîne Android, un appareil ou une console ;
- ⏳ décision ou action du propriétaire ;
- ❌ non fait.

## 0. Commandes (une seule base, aucun fork)

```bash
npm ci                                   # dépendances épinglées
npm run android:sync                     # www/ déterministe → android/app/src/main/assets/public
cd android
./gradlew assembleDebug                  # APK de test (id fr.finot.academie.dev)
FINOT_UPLOAD_KEYSTORE=… FINOT_UPLOAD_KEYSTORE_PASSWORD=… FINOT_UPLOAD_KEY_ALIAS=… FINOT_UPLOAD_KEY_PASSWORD=… \
  ./gradlew bundleRelease -PfinotAppId=<ID DÉFINITIF>   # AAB Google Play (et Galaxy Store)
./gradlew assembleRelease -PfinotAppId=<ID DÉFINITIF>   # APK (Galaxy Store / Fire)
```

Prérequis : JDK 21, Android SDK platform 36 et build-tools 36. La CI Android est assurée par l'autre chantier.

## A. Google Play

### A1. Identité et version
- ⏳ **Package ID définitif** : à choisir (irréversible une fois publié). Le développement utilise `fr.finot.academie.dev`, la production passe par `-PfinotAppId`. Preuve : `tests/android-project.test.js`.
- ✅ `versionName` = X.Y.Z de `sw.js` et `versionCode` = X·10⁶ + Y·10³ + Z, monotone et lu dans le paquet embarqué. Preuve : `mobile-package`, `android-project`.
- ✅ Nom affiché « Finot Académie ».

### A2. Cible technique
- ✅ targetSdk 36 et compileSdk 36 (exigé depuis le 31/08/2026), minSdk 24.
- 🔧 **AAB** : `bundleRelease` est prêt mais n'a jamais été exécuté ici, faute de JDK ou SDK local.
- 🔧 64 bits : l'app ne contient pas de code natif propre, les bibliothèques sont celles de Capacitor. À vérifier sur l'AAB (`bundletool`).
- 🔧 **Manifeste fusionné** : la liste réelle des permissions est à relire après le premier build (`app/build/intermediates/merged_manifests`).
- ✅ **Permissions déclarées** :
  - `INTERNET` seule ;
  - `AD_ID` retiré ;
  - aucun micro, aucune facturation ;
  - HTTPS uniquement ;
  - aucun lien profond.

  Preuves : `android-project`, `entitlements-guard`.

### A3. Signature
- ✅ Signature uniquement par variables d'environnement `FINOT_UPLOAD_*` ; aucune clé ni mot de passe dans Git. Preuve : `android-project`.
- ⏳ **Play App Signing** : générer la clé d'import hors dépôt (coffre du propriétaire) et l'enregistrer dans la console.

### A4. Enfants, familles, Data Safety
- ✅ Aucune donnée ne quitte l'appareil par défaut :
  - suivi distant désactivé ;
  - statistiques inactives ;
  - aucun SDK tiers.

  Preuves : `remote-sync-flag`, `analytics-guard`.
- ✅ Matrice des données : `docs/store-data-safety.md`, réponses Data Safety préparées.
- ✅ Aucune sauvegarde Android ni aucun transfert d'appareil des données d'enfant. Preuve : `android-backup`.
- ✅ Aucun lien externe cliquable dans l'espace enfant ; garde globale. Preuve : `external-links`.
- ✅ Aucun achat, aucun paywall ; achats futurs réservés à l'espace parents affiché. Preuve : `entitlements-guard`.
- ⏳ Public cible (tranches d'âge), programme Familles, politique de confidentialité publique (brouillon de l'autre chantier), classification IARC.

### A5. Fiche Store
- ✅ L'icône source (`icon.png`, 512 px) et les icônes adaptatives Android sont générées (`scripts/android-assets.py`).
- ⏳ À produire (`docs/store-assets-spec.md`, autre chantier) :
  - feature graphic 1024×500 ;
  - captures téléphone et tablette ;
  - descriptions ;
  - adresses de support et de confidentialité.

### A6. Tests
- 🔧 **Test interne Play** :
  - installation depuis Play ;
  - premier lancement hors ligne ;
  - mise à jour N → N+1 sans perte de profil.
- ⏳ Test fermé de 12 testeurs pendant 14 jours si le type de compte l'exige.
- 🔧 Protocole appareil : voir § D.

## B. Samsung Galaxy Store

**Réutilisable tel quel depuis Google Play :**
- le même projet `android/` et le même code (aucun fork) ;
- les mêmes tests et la même version ;
- les mêmes permissions et la même politique de données ;
- `docs/store-data-safety.md` ;
- les mêmes captures et descriptions, à adapter au format Samsung.

**Ce qui diffère :**
- **Format** : Galaxy Store accepte l'AAB. L'APK `assembleRelease` reste disponible si le Seller Portal l'exige pour la catégorie Enfants. ⏳ À confirmer dans le Seller Portal.
- **Signature** : avec Play App Signing, Google re-signe l'app Play. L'APK ou l'AAB Galaxy est signé avec la clé d'import. Les signatures diffèrent : un utilisateur ne peut pas mettre à jour l'app d'un store avec celle de l'autre. C'est attendu. Garder le même `applicationId` est possible.
- **Métadonnées** :
  - questionnaire d'âge Samsung ;
  - pays de distribution ;
  - captures au format Samsung.
- **Intégrations Samsung facultatives** (Samsung IAP, etc.) : **aucune** en V1.
- ⏳ Compte Samsung Seller : gratuit, à créer par le propriétaire.

## C. Amazon Fire Tablet (compatibilité uniquement, aucun développement)

Contexte : Amazon n'accepte plus de nouvelles apps pour l'Appstore sur Android mobile (fermeture le 20/08/2025). L'Appstore reste disponible sur **Fire Tablet**.

| Point | État | Détail |
|---|---|---|
| Fire OS | 🔧 | Fire OS 8 = Android 11 (API 30), au-dessus du minSdk 24. Fire OS 7 = Android 9 (API 28), également au-dessus. |
| Services Google | ✅ | Aucune dépendance (pas de GMS, Firebase ni Play Billing) ; `google-services` retiré. |
| WebView | 🔧 | WebView Amazon basée sur Chromium, mise à jour via l'Appstore. Vérifier sa version (`chrome://version` équivalent, ou `navigator.userAgent` dans l'app) : l'app utilise du JS moderne (`?.`, `??`). |
| Synthèse vocale | 🔧 | TTS natif via `TextToSpeech`. **Vérifier la présence d'une voix française** (et anglaise, italienne) sur l'appareil ; sinon l'app affiche le texte à la place (comportement existant). |
| Reconnaissance vocale | ✅ | Indisponible par conception sur Android ; alternative « écoute et répète ». Preuve : `speech-capability`. |
| Navigation physique | 🔧 | Bouton Retour géré (`MQPlatform.back`). Vérifier la barre de navigation Fire. |
| Tailles d'écran | 🔧 | Orientation libre, mise en page responsive (`release-responsive`). Tester Fire HD 8 et HD 10, en portrait et en paysage. |
| Installation | 🔧 | APK `assembleRelease` signé ; installation par `adb install`, puis soumission dans l'Amazon Developer Console (format accepté à confirmer). |
| Catégorie Enfants / Amazon Kids | ⏳ | Exigences spécifiques à vérifier. |

**Verdict actuel : non validé.** Un test sur une **vraie tablette Fire HD** reste obligatoire.
- **GO** si les voix FR/EN/IT sont présentes, la WebView est récente et les écrans s'affichent correctement.
- **NO-GO** sinon.

Fire ne doit jamais retarder Google Play.

## D. Protocole appareil Android (à faire sur un vrai téléphone et une vraie tablette)

1. Installation de l'APK debug, puis premier lancement **hors ligne** : l'écran de démarrage Finot s'affiche, puis l'app.
2. Création de profil ; mission ; cours d'anglais du collège jusqu'à l'étape Prononciation : l'alternative « écoute et répète » apparaît, sans bouton micro, et aucune demande de permission micro n'est faite.
3. Bouton Retour :
   - depuis un écran secondaire, retour à l'accueil ;
   - depuis l'accueil, l'app passe en arrière-plan ;
   - avec le pavé numérique ouvert, le pavé se ferme.
4. Mise en arrière-plan, puis l'app est tuée dans les réglages : à la relance, la progression est intacte.
5. Rotation, clavier virtuel (champ de réponse visible), thème sombre système, mode DYS, TalkBack.
6. Voix : dictée CE1, phrase anglaise, phrase italienne.
7. Espace parents :
   - « Suivi à distance : non activé dans cette version » ;
   - liens des sources officielles ouverts dans le navigateur système.
8. Espace enfant : aucun lien ne quitte l'app (atlas, crédits).
9. Mise à jour par-dessus la version précédente : profils conservés.
10. Désinstallation : données supprimées. Réinstallation : aucune restauration automatique (sauvegarde désactivée).
