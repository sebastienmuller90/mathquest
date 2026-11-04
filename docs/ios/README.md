# Finot Académie sur iOS (iPhone et iPad) — état et procédure restante sur Mac

Issue GitHub #69. Projet créé par la PR #79 (fusionnée dans `main`), vérifié statiquement le 04/11/2026 (voir ci-dessous).

## État réel (lire en premier)

**Aucun build iOS n'a été exécuté ni validé.** Tout ce qui exige Xcode, un simulateur ou un appareil est **non exécuté** :
compilation, résolution des paquets Swift, lancement, signature, archive, TestFlight, rendu des écrans, TTS sur appareil.
Ce qui a été fait sans Mac :

- `npm i @capacitor/ios@8.6.0 --save-dev --save-exact` (même version que `@capacitor/core`, `@capacitor/cli`, `@capacitor/android`).
- `npx cap add ios` a fonctionné tel quel sous Windows (Capacitor 8.6 utilise Swift Package Manager : pas de CocoaPods).
  Le gabarit officiel a ensuite été personnalisé à la main (voir ci-dessous). Rien n'a pu être ouvert dans Xcode.
- Test statique Node `tests/ios-config.test.js` (`npm run test:ios`), exécuté en CI : il vérifie la configuration versionnée
  uniquement ; il ne prouve pas que l'app compile.

### Ce qui a été changé par rapport au gabarit Capacitor

| Élément | Choix |
| --- | --- |
| Bundle id | `fr.finot.academie` (Debug et Release) |
| Nom affiché | « Finot Académie » (`CFBundleDisplayName`) |
| Appareils | iPhone + iPad (`TARGETED_DEVICE_FAMILY = "1,2"`) |
| iOS minimal | 15.0 (minimum de Capacitor 8 ; projet et `Package.swift` alignés) |
| Orientations | comme Android (libres) : iPhone portrait + deux paysages ; iPad les quatre |
| Version | `MARKETING_VERSION = 1.0.0` = `android/store-version.json` ; `CURRENT_PROJECT_VERSION = 1` (à incrémenter à la main pour chaque envoi TestFlight) |
| Signature | `DEVELOPMENT_TEAM` **vide** (aucun Team ID dans le dépôt) ; signature automatique, équipe choisie dans Xcode |
| Info.plist | minimal : aucune usage description, aucun schéma d'URL, aucune exception ATS, aucun mode d'arrière-plan, aucun entitlement ; `ITSAppUsesNonExemptEncryption = false` ; capacité requise `arm64` (le gabarit avait `armv7`) ; langue de développement `fr` |
| Confidentialité | `PrivacyInfo.xcprivacy` : pas de suivi, aucun domaine de suivi, aucune donnée collectée, aucune API « required reason » (voir plus bas) |
| Icône | `AppIcon.appiconset` : 1024×1024 RVB **sans canal alpha**, générée depuis `icon.png` (renard Finot sur fond blanc, agrandie de 512 à 1024 px : un export vectoriel natif serait plus net) |
| Démarrage | `LaunchScreen.storyboard` fond crème `#FFF6E8` + renard centré (même couleur que le splash Android) ; fixe, ne suit pas le mode sombre (comme Android) |
| `capacitor.config.json` | section `ios` : `contentInset: "never"` (les `env(safe-area-inset-*)` du CSS gèrent les zones sûres), `allowsLinkPreview: false`. Schéma iOS par défaut `capacitor://localhost` conservé |

### Vérifié statiquement ici (04/11/2026, sans Mac) et non exécuté faute de Mac

`node tools/ios-static-check.mjs` (90 vérifications, aucune dépendance, exécuté aussi par `tests/ios-config.test.js` en CI) lit les fichiers
versionnés et les recoupe avec `package.json`, `capacitor.config.json` et `node_modules`. **Vérifié statiquement** :

- `ios/` comparé au gabarit officiel `ios-spm-template` de `@capacitor/cli` 8.6.0 (extrait de `node_modules`) : seuls écarts, tous voulus :
  identité (bundle id, nom, région `fr`, version 1.0.0), `arm64`, `ITSAppUsesNonExemptEncryption`, `PrivacyInfo.xcprivacy` (+ son entrée de
  projet), fond crème du `LaunchScreen`, un seul `splash.png` à la place des trois exemplaires du gabarit, et `Package.swift` complété par
  les deux plugins locaux. Aucun fichier du gabarit ne manque.
- `project.pbxproj` : syntaxe du format plist ancien, identifiants à 24 hexadécimaux, aucune référence orpheline ni objet inatteignable, chaque
  `PBXBuildFile` vers un fichier existant, phases Sources / Frameworks / Resources, tous les `.swift` du dossier compilés, fichiers
  référencés présents sur disque, Debug/Release, `IPHONEOS_DEPLOYMENT_TARGET` = 15.0 dans les 4 configurations et dans `Package.swift`,
  `fr.finot.academie`, `MARKETING_VERSION` = `android/store-version.json`, `TARGETED_DEVICE_FAMILY = "1,2"`, `DEVELOPMENT_TEAM` vide.
- `Info.plist`, `PrivacyInfo.xcprivacy`, storyboards : XML bien formé (analyseur strict maison), clés attendues, aucune permission, scene
  manifest, `SceneDelegate.swift`, `AppDelegate.swift` et `Main.storyboard` (`CAPBridgeViewController`) cohérents entre eux, iPad = 4 orientations
  (obligatoire pour le multitâche tant que `UIRequiresFullScreen` est absent), `UIViewControllerBasedStatusBarAppearance = true` (requis par
  le plugin SystemBars de Capacitor 8).
- Assets : `Contents.json` valides, PNG intacts (CRC), icône 1024×1024 sans alpha, splash 2732×2732.
- SPM : `capacitor-swift-pm` `exact: "8.6.0"` = `@capacitor/core` = `@capacitor/ios` = `@capacitor/cli` ; le tag `8.6.0` existe sur GitHub
  et ses deux archives binaires (`Capacitor.xcframework.zip`, `Cordova.xcframework.zip`) se téléchargent, avec des SHA-256 identiques aux `checksum` de son `Package.swift` ; plugins `@capacitor/app` 8.1.2 et
  `@capacitor-community/text-to-speech` 8.0.2 (dernières versions du registre npm, exigent `capacitor-swift-pm from: 8.0.0` et iOS 15 au plus,
  dossiers de sources **et de tests** présents dans `node_modules`).
- `npm run ios:sync` : exécuté ; il régénère `Package.swift` à l'identique (même empreinte Git que `HEAD`) et crée seulement les fichiers
  ignorés `public/`, `config.xml`, `capacitor.config.json`. Sous Windows, Git affiche `Package.swift` « modifié » pour une simple différence de
  fin de ligne (LF/CRLF) : aucune différence de contenu.
- Aucune API « required reason » dans `@capacitor/ios` 8.6.0 (seul `.fileSizeKey`, non concerné), `@capacitor/app`, text-to-speech ni le code
  de l'app.

**Non exécuté faute de Mac** : tout ce qui suit reste à faire. Compilation Swift, résolution réelle des paquets, chargement des
`.xcframework`, signature, archive, export, validation App Store Connect, rendu des storyboards, lancement simulateur / appareil, TTS,
rotation, zones sûres, clavier, rapport de confidentialité.

### Points de vigilance (découverts pendant la vérification)

- **`npm ci` puis `npm run ios:sync` AVANT d'ouvrir Xcode** : `public/`, `config.xml` et `capacitor.config.json` sont référencés par le projet mais
  ignorés par Git (générés) ; sans eux Xcode affiche des fichiers rouges et le build échoue (« Build input file cannot be found »). Les
  chemins `../../../node_modules/...` de `Package.swift` exigent aussi `npm ci` à la racine.
- Ne jamais lancer deux `ios:sync` en même temps (observé : l'un des deux échoue avec `ENOENT` sur `www/data/...` pendant que l'autre vide `www/`).
  La copie de `www/` (≈ 1 900 fichiers, ≈ 59 Mo) a pris de 1 à 4 minutes sous Windows ; ce poids se retrouve dans l'IPA.
- À la première ouverture, Xcode peut proposer « Update to recommended settings » (`LastUpgradeCheck = 0920` hérité du gabarit) : ne pas
  l'accepter sans relire le diff ; si elle est acceptée, la committer à part et relancer `npm run test:ios` et `node tools/ios-static-check.mjs`.
- `ios/App/CapApp-SPM/Package.swift` est géré par Capacitor : ne pas l'éditer ; après `cap sync` il ne doit rien changer (vérifier `git status`).
- `server.androidScheme` et `plugins.SystemBars.insetsHandling` de `capacitor.config.json` ne concernent qu'Android (ignorés par iOS).
- Ne pas passer à Capacitor 9 (`next`, bêta) : rester sur 8.6.0 jusqu'à une montée de version volontaire, alignée sur les quatre paquets.
- `CURRENT_PROJECT_VERSION` doit rester identique en Debug et Release (le vérificateur l'exige) : incrémenter les deux ensemble.
- `CAPACITOR_DEBUG` n'est défini que par `debug.xcconfig` : il est vide en Release, comportement normal du gabarit.

### Points à confirmer par le responsable de l'app

- **Chiffrement** : `ITSAppUsesNonExemptEncryption = false` suppose que l'app n'utilise que le chiffrement fourni par iOS
  (HTTPS du système, suivi parent facultatif) et aucune bibliothèque de chiffrement propre. La déclaration d'export reste la
  responsabilité du titulaire du compte.
- **Compte et identité** : aucun Team ID, nom de société ni identifiant Apple n'est inventé dans le dépôt.
- **Stockage** : l'origine WebView iOS (`capacitor://localhost`) diffère de celle d'Android (`https://localhost`) et de la PWA.
  Les profils d'une autre plateforme ne sont **pas** repris automatiquement : passer par l'export / import manuel de
  l'espace parents. Ne jamais changer `iosScheme` ni le nom d'hôte après une publication (cela effacerait `localStorage`).
- **Liens sortants** : aucun fichier de l'appli web n'a été modifié (`js/`, `index.html`, `styles.css`, `sw.js`). La politique
  `js/link-policy.js` (aucun lien externe côté enfant) s'applique donc telle quelle ; à vérifier dans la recette.
- **Plateforme** : le comportement de `js/platform.js` sous iOS (détection de plateforme, service worker non enregistré) n'a pas
  été testé ; voir la recette.

### Manifeste de confidentialité : API « required reason »

Sources lues dans `node_modules` (non devinées) : `@capacitor/ios` 8.6.0 (`Capacitor`, `CapacitorCordova`), `@capacitor/app` 8.1.2 et
`@capacitor-community/text-to-speech` 8.0.2 (côté iOS), plus `AppDelegate.swift` / `SceneDelegate.swift`. Aucune n'appelle
`UserDefaults`, les API de dates de fichiers, `systemUptime`, l'espace disque ni `activeInputModes`. Les manifestes propres à Capacitor et
Cordova sont eux aussi vides. Le manifeste de l'app déclare donc `NSPrivacyAccessedAPITypes` vide ; en déclarer sans usage réel serait refusé.
`localStorage` est utilisé par la page web dans WKWebView, pas par du code natif de l'app. **À reconfirmer sur Mac** : Product > Archive,
puis Generate Privacy Report (non exécuté).

## Procédure minimale sur Mac (non exécutée)

Prérequis : Mac avec Xcode 26 ou plus récent (SDK iOS 26 ou plus récent, exigé par l'App Store), Node 22, un compte Apple Developer
payant et une fiche app créée dans App Store Connect avec le bundle id `fr.finot.academie`.

```bash
git clone https://github.com/sebastienmuller90/mathquest.git
cd mathquest
npm ci
npm run ios:sync                       # package www/ (même packaging qu'Android) puis cap sync ios
node tools/ios-static-check.mjs        # filet statique (90 vérifications) avant d'ouvrir Xcode
open ios/App/App.xcodeproj
```

### Commandes exactes depuis un Mac (toutes **non exécutées** ; racine du dépôt, après `npm ci` et `npm run ios:sync`)

```bash
# 0. Outils et résolution des paquets Swift (télécharge capacitor-swift-pm 8.6.0 et ses deux .xcframework)
xcodebuild -version
xcodebuild -list -project ios/App/App.xcodeproj                      # doit lister le schéma « App » (schéma implicite, celui de « cap build ios »)
xcodebuild -resolvePackageDependencies -project ios/App/App.xcodeproj -scheme App

# 1. Compilation pour simulateur (sans signature)
xcodebuild -project ios/App/App.xcodeproj -scheme App -configuration Debug \
  -destination 'generic/platform=iOS Simulator' -derivedDataPath build/DerivedData build CODE_SIGNING_ALLOWED=NO

# 2. Lancement sur un simulateur précis (le nom dépend de l'Xcode installé : voir « xcrun simctl list devices available »)
xcrun simctl boot "iPhone 16"          # exemple : adapter le nom ; refaire avec un simulateur iPad
xcrun simctl install booted build/DerivedData/Build/Products/Debug-iphonesimulator/App.app
xcrun simctl launch booted fr.finot.academie

# 3. Archive Release pour appareils (signature automatique ; l'équipe est passée en ligne de commande, JAMAIS écrite dans le dépôt)
xcodebuild -project ios/App/App.xcodeproj -scheme App -configuration Release \
  -destination 'generic/platform=iOS' -archivePath build/Finot.xcarchive \
  DEVELOPMENT_TEAM=<VOTRE_TEAM_ID> -allowProvisioningUpdates archive

# 4. Export de l'IPA (ExportOptions.plist LOCAL, non versionné : method app-store-connect, signingStyle automatic, teamID)
xcodebuild -exportArchive -archivePath build/Finot.xcarchive \
  -exportOptionsPlist build/ExportOptions.plist -exportPath build/export -allowProvisioningUpdates

# 5. Validation avant envoi : Xcode > Organizer > Distribute App > Validate App (méthode la plus sûre).
#    En ligne de commande : « xcrun altool --validate-app -f build/export/App.ipa -t ios ... » avec une clé API App Store Connect
#    (syntaxe exacte à confirmer avec « xcrun altool --help » : non vérifiée). Rapport de confidentialité : Organizer > archive > Generate Privacy Report.

# Équivalent « tout-en-un » fourni par Capacitor (archive + export dans ios/App/output, dossier ignoré par Git) :
npx cap build ios --scheme App --configuration Release --xcode-team-id <VOTRE_TEAM_ID> \
  --xcode-export-method app-store-connect --xcode-signing-type automatic
```

Ces commandes viennent de la documentation d'`xcodebuild` et du code de `@capacitor/cli` 8.6.0 (`dist/ios/build.js`, `dist/ios/run.js`),
pas d'une exécution. Si l'étape 1 échoue, relever le **premier** message d'erreur : causes probables (a) `ios:sync` non lancé,
(b) GitHub inaccessible pour les `.xcframework`, (c) Xcode antérieur à 26.

Dans Xcode :

1. Attendre la résolution des paquets Swift (`capacitor-swift-pm` 8.6.0 et les deux plugins locaux de `node_modules`).
   Si Xcode ne trouve pas les chemins `../../../node_modules/...`, c'est que `npm ci` n'a pas été exécuté à la racine.
2. Cible **App** > Signing & Capabilities : cocher « Automatically manage signing », choisir **votre équipe**.
   Ne pas committer l'identifiant d'équipe (`DEVELOPMENT_TEAM` doit rester vide dans le dépôt ; le test CI échoue sinon).
3. Général > Version `1.0.0`, Build : un entier supérieur à tout build déjà envoyé (`CURRENT_PROJECT_VERSION`).
4. Vérifier que les capacités restent vides (aucune ajoutée).
5. Lancer sur simulateur (iPhone et iPad) puis sur appareil réel : exécuter la recette ci-dessous.
6. Appareil cible « Any iOS Device (arm64) » > Product > Archive.
7. Organizer > Distribute App > App Store Connect > Upload (ou la ligne de commande de la section ci-dessus).
8. App Store Connect > TestFlight : attendre le traitement du build, répondre au questionnaire d'export (cohérent avec
   `ITSAppUsesNonExemptEncryption = false`), ajouter des testeurs internes.
9. App Store Connect > fiche de l'app : catégorie Éducation, déclaration de confidentialité (« données non collectées » si le suivi
   parent distant reste désactivé), choix de la catégorie Enfants avec le responsable (règles Apple supplémentaires : aucun lien
   sortant ni achat sans barrière parentale), URL de politique de confidentialité, captures iPhone et iPad.

Après toute modification de l'appli web : `npm run ios:sync` avant d'ouvrir ou d'archiver (`ios/App/App/public` est généré et ignoré par Git).

## Recette iPhone / iPad (à cocher sur appareil)

Chaque ligne est **non exécutée** à ce jour.

- [ ] Premier lancement : écran crème avec le renard puis l'app, sans flash blanc ; nom « Finot Académie » sous l'icône.
- [ ] Clavier : saisie dans le chat Finot, la dictée et les champs de profil restent visibles au-dessus du clavier (iPhone portrait et paysage, iPad).
- [ ] Zones sûres : encoche / Dynamic Island, barre d'accueil, coins arrondis : aucun contenu ni bouton masqué (portrait et paysage).
- [ ] Rotation : portrait et paysage sur iPhone, quatre sens sur iPad, sans perte d'état d'exercice.
- [ ] iPad : multitâche (Split View, Slide Over, redimensionnement de fenêtre) sans mise en page cassée.
- [ ] Mode sombre : bascule système pendant l'usage ; textes lisibles, pas de fond blanc résiduel.
- [ ] Dynamic Type / texte agrandi (Réglages > Accessibilité > Taille du texte) : barre d'onglets et boutons entiers et touchables.
- [ ] Synthèse vocale : français, anglais et italien (voix installées) ; comportement correct si une voix manque ; mode silencieux, AirPods, interruption par un appel.
- [ ] Hors ligne (mode avion) : lancement et parcours complet d'une leçon et d'un exercice.
- [ ] Persistance : fermer l'app depuis le sélecteur d'apps, relancer : profils, progression et réglages intacts.
- [ ] Suppression d'un profil : les copies locales sont purgées (comparer avec `tests/profile-delete-purge.test.js` côté web).
- [ ] Retour : le geste de retour depuis le bord de l'écran ne ferme pas l'app ni ne casse la navigation ; retour logique depuis chaque écran.
- [ ] Espace enfant : aucun lien ne sort de l'app ; espace parents : liens externes ouverts dans Safari, l'app reste intacte.
- [ ] Aucune demande d'autorisation (micro, reconnaissance vocale, caméra, localisation, suivi) n'apparaît.
- [ ] Désinstallation / réinstallation : l'app repart de zéro (aucune sauvegarde automatique ; l'export parent sert à transférer).
- [ ] Generate Privacy Report : cohérent avec le manifeste (aucune API « required reason »).

## Risques résiduels (levables uniquement avec Xcode et un appareil)

1. **Compilation** : aucun `swiftc` n'a vu `AppDelegate.swift`, `SceneDelegate.swift` ni les plugins ; ils sont identiques au gabarit 8.6.0 (hors configuration de scène),
   mais cela ne remplace pas un build.
2. **Résolution SPM** : le tag existe et les empreintes des archives binaires ont été recalculées ici (identiques), mais la résolution
   réelle par SPM (plugins locaux, conflits éventuels, téléchargement depuis le réseau de l'utilisateur) n'a pas été exécutée.
3. **Analyseur du `project.pbxproj`** : mon analyseur est strict mais n'est pas celui d'Xcode (qui peut réécrire le fichier à l'ouverture) ;
   un avertissement « project file is damaged » reste théoriquement possible.
4. **Signature et App Store Connect** : profils, identifiant d'app, questionnaire d'export, catégorie Enfants, rapport de confidentialité Apple
   (peut réclamer des déclarations non prévues), icône (Apple peut exiger un autre format selon l'Xcode) : tout reste à valider.
5. **Rendu** : zones sûres avec `contentInset: never`, clavier, Dynamic Type, rotation, Split View iPad, flash au lancement, fond du
   `LaunchScreen` sur grands écrans (image 1x mise à l'échelle), mode sombre.
6. **WebView** : origine `capacitor://localhost` (stockage séparé d'Android et de la PWA), comportement de `js/platform.js` et du service worker
   sous WKWebView, synthèse vocale réelle (voix manquantes, mode silencieux), liens sortants parents.
7. **Taille** : le poids d'environ 59 Mo de `public/` n'a pas été mesuré dans une vraie IPA.
8. **Exigences Apple datées** : version minimale d'Xcode / SDK exigée à la date de soumission, à relire sur developer.apple.com le jour J.

## Mise à jour du dossier `ios/`

Si Capacitor change de version : mettre à jour `@capacitor/ios` en même temps que `@capacitor/core`, `@capacitor/cli`, `@capacitor/android`,
puis `npx cap sync ios` (régénère `ios/App/CapApp-SPM/Package.swift`, à ne pas éditer à la main) et relancer `npm run test:ios`.
