# Finot Académie — Checklist App Store V1

## A. Projet iOS

- [ ] Ajouter `@capacitor/ios` à la même version majeure/mineure que Capacitor Core/CLI.
- [ ] Générer `ios/` depuis le paquet web reproductible.
- [ ] Vérifier le bundle ID `fr.finot.academie`.
- [ ] Activer iPhone + iPad.
- [ ] Fixer la cible iOS réellement supportée et testée.
- [ ] Vérifier qu'aucune permission/capability inutile n'est ajoutée.
- [ ] Vérifier ATS / trafic sécurisé.
- [ ] Vérifier le privacy manifest et les Required Reason APIs des dépendances finales.

## B. Identité visuelle iOS

- [ ] App Icon conforme, dérivée de l'icône Finot validée.
- [ ] Launch Screen crème/orange cohérent avec Android/PWA.
- [ ] Safe areas iPhone Dynamic Island / home indicator.
- [ ] iPad portrait/paysage.
- [ ] thème clair/sombre.
- [ ] taille de texte/accessibilité.
- [ ] clavier virtuel : saisie du chat toujours visible.

## C. Fonctions à tester sur iOS

- [ ] onboarding et profils ;
- [ ] cours/exercices/corrections ;
- [ ] progression et persistance ;
- [ ] suppression complète d'un profil ;
- [ ] espace Parents + code ;
- [ ] export/import manuel ;
- [ ] fonctionnement hors connexion ;
- [ ] TTS FR/EN/IT avec voix système ;
- [ ] reprise après fermeture forcée ;
- [ ] rotation ;
- [ ] mode sombre ;
- [ ] grandes tailles de texte ;
- [ ] liens externes uniquement depuis l'espace Parents ;
- [ ] privacy accessible dans l'app.

## D. Build / CI

- [ ] Build avec Xcode 26+ et SDK iOS/iPadOS 26+.
- [ ] Simulateur iPhone récent.
- [ ] Simulateur iPad 13 pouces.
- [ ] Tests WebKit/Playwright existants verts.
- [ ] Archive Release sans erreur.
- [ ] Vérifier bundle final : permissions, frameworks, SDK tiers, privacy manifests.
- [ ] Export/Upload TestFlight avec signature Apple après inscription.

## E. App Store Connect

- [x] Nom : Finot Académie.
- [x] Bundle ID prévu : `fr.finot.academie`.
- [x] catégorie : Éducation.
- [x] fiche FR préparée.
- [x] mots-clés FR préparés sous 100 octets.
- [x] privacy URL définie.
- [x] support URL préparée.
- [ ] créer l'app dans App Store Connect ;
- [ ] remplir questionnaire d'âge 2026 ;
- [ ] décider `Made for Kids` uniquement à partir du questionnaire réel ;
- [ ] App Privacy : revalider puis déclarer aucune collecte si le binaire final reste local-only ;
- [ ] Accessibility Nutrition Label : déclarer uniquement les fonctions réellement vérifiées ;
- [ ] captures iPhone ;
- [ ] captures iPad 13 pouces ;
- [ ] informations App Review réelles ;
- [ ] sélectionner build TestFlight ;
- [ ] test interne TestFlight ;
- [ ] soumettre à App Review.

## F. Critères GO

La V1 iOS ne passe en soumission que si :

1. aucune régression bloquante n'est ouverte ;
2. privacy et support sont accessibles publiquement ;
3. la privacy est accessible dans l'app ;
4. le build iOS final a été testé sur simulateur et au moins un appareil physique si disponible ;
5. les captures correspondent au build soumis ;
6. toutes les déclarations App Privacy correspondent aux SDK réellement inclus ;
7. aucun placeholder ni secret n'est présent dans les métadonnées ou le dépôt.

## Exigences Apple de référence au 03/11/2026

- uploads App Store Connect : Xcode 26+ et SDK iOS/iPadOS 26+ ;
- cible minimale des apps uploadées : iOS/iPadOS 13+ ;
- privacy URL obligatoire et lien privacy également accessible dans l'app ;
- captures requises au minimum pour iPhone Dynamic Island et iPad 13 pouces si iPad pris en charge ;
- nouvelles questions de classement d'âge applicables en 2026.
