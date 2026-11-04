# Finot Académie sur iOS (iPhone et iPad) — état et procédure restante sur Mac

Issue GitHub #69. Branche `claude/ios-capacitor`.

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
git checkout claude/ios-capacitor      # ou main une fois fusionnée
npm ci
npm run ios:sync                       # package www/ (même packaging qu'Android) puis cap sync ios
open ios/App/App.xcodeproj
```

Dans Xcode :

1. Attendre la résolution des paquets Swift (`capacitor-swift-pm` 8.6.0 et les deux plugins locaux de `node_modules`).
   Si Xcode ne trouve pas les chemins `../../../node_modules/...`, c'est que `npm ci` n'a pas été exécuté à la racine.
2. Cible **App** > Signing & Capabilities : cocher « Automatically manage signing », choisir **votre équipe**.
   Ne pas committer l'identifiant d'équipe (`DEVELOPMENT_TEAM` doit rester vide dans le dépôt ; le test CI échoue sinon).
3. Général > Version `1.0.0`, Build : un entier supérieur à tout build déjà envoyé (`CURRENT_PROJECT_VERSION`).
4. Vérifier que les capacités restent vides (aucune ajoutée).
5. Lancer sur simulateur (iPhone et iPad) puis sur appareil réel : exécuter la recette ci-dessous.
6. Appareil cible « Any iOS Device (arm64) » > Product > Archive.
7. Organizer > Distribute App > App Store Connect > Upload. En ligne de commande :
   `xcodebuild -project ios/App/App.xcodeproj -scheme App -configuration Release -destination 'generic/platform=iOS' -archivePath build/Finot.xcarchive archive`
   puis `xcodebuild -exportArchive -archivePath build/Finot.xcarchive -exportOptionsPlist <ExportOptions.plist LOCAL non versionné> -exportPath build/export`.
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

## Mise à jour du dossier `ios/`

Si Capacitor change de version : mettre à jour `@capacitor/ios` en même temps que `@capacitor/core`, `@capacitor/cli`, `@capacitor/android`,
puis `npx cap sync ios` (régénère `ios/App/CapApp-SPM/Package.swift`, à ne pas éditer à la main) et relancer `npm run test:ios`.
