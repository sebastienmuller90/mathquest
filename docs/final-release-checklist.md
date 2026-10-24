# Finot Académie — checklist de release finale

État de référence : `main` au commit `a2cb7292948a73be39a9c9468543d151790ac643` (fusion PR #30, 24/10/2026).

Cette checklist distingue volontairement trois niveaux de preuve :

- ✅ **Automatisé / prouvé** : vérifié par la CI sur le `main` de référence.
- 📱 **Appareil réel** : doit être essayé physiquement ; une simulation navigateur ne suffit pas.
- 👤 **Validation utilisateur** : nécessite un vrai usage par un enfant ou le parent.

Une CI verte ne remplace jamais les validations 📱 et 👤.

## A. Base technique — ✅ automatisée

- [x] `main` post-PR #30 stable.
- [x] `tests/final-product-inventory.mjs` : PASS sur `main` (run Final product inventory #37).
- [x] `tests/release-readiness.mjs` : PASS sur `main` (run Final product inventory #37).
- [x] `tests/full-content-audit-v2.mjs` : PASS dans MathQuest CI #797.
- [x] Chromium : PASS dans MathQuest CI #797.
- [x] Firefox : PASS dans MathQuest CI #797.
- [x] WebKit : PASS dans MathQuest CI #797.
- [x] test PWA N → N+1 : PASS automatisé.
- [x] vrai démarrage hors ligne avec serveur arrêté : PASS automatisé.
- [x] onboarding intermédiaire / saisie clavier de date : PASS sur `main` (Onboarding layout regression #13).
- [x] Primary special depth : PASS sur `main` (#60).
- [x] 1 129 chapitres actifs recensés, du CP à la 3e.
- [x] 29 matières recensées.
- [x] 499 chapitres approfondis.
- [x] 0 cours sous le seuil après application des approfondissements (`thinCourses: 0`).
- [x] 0 erreur de générateur.
- [x] 114 chapitres reliés à des supports de lecture.
- [x] 413 chapitres documentaires.
- [x] 882 chapitres avec indice audio.
- [x] 23/23 fichiers `course-depth-*` présents sur disque chargés au runtime.
- [x] aucun approfondissement orphelin détecté par `release-readiness`.
- [x] aucun asset local obligatoire / référence runtime bloquante détecté par `release-readiness`.
- [x] 0 erreur de release readiness.
- [x] 0 warning de release readiness.
- [x] 0 marqueur de dette détecté.
- [x] version PWA de référence : `8.72.1-birthdate-keyboard-2026-10-24`.

## B. Pédagogie et contenus — ✅ automatisée / 📱 à écouter

- [x] anciens cours sous seuil du baseline traités par approfondissements : `thinCourses: 0` après profondeur.
- [x] HG / EMC primaire CE2 → CM2 approfondis.
- [x] anglais collège 6e → 3e approfondi.
- [x] italien collège 5e → 3e approfondi.
- [x] dictée : correction progressive, second essai et pistes pédagogiques couverts par tests.
- [x] profondeur des dictées : 90 contenus CP et 75 CE1 au dernier audit dédié.
- [x] pools CP/CE1 : variété / générateurs / présence audio couverts par la CI.
- [x] lecture primaire : intégrité et parcours réel couverts par la CI.
- [x] lecture collège : intégrité, droits et parcours réel couverts par la CI.
- [x] lecture à voix haute : lettres, abréviations, nombres et dates couverts automatiquement.
- [x] cohérence des cours approfondis et absence de retrait de contenu couverte par la CI.
- [x] aucun cours actif sous le seuil final après approfondissement.
- [ ] 📱 écouter réellement les lettres, phonèmes, syllabes, mots, phrases, anglais et italien sur appareil.
- [ ] 📱 vérifier la qualité réelle de la synthèse vocale / prononciation sur iPhone.

## C. Données, profils et compatibilité — ✅ automatisée

- [x] scénarios migration / stockage corrompu / profils / rechargements / parcours : PASS Chromium.
- [x] ancien stockage et migrations de progression couverts par les tests de scénario.
- [x] multi-profils couverts par les scénarios navigateur.
- [x] économie anti-triche couverte.
- [x] devoirs parent-validés couverts.
- [x] exercices : reprise exacte et sécurité des instantanés couvertes.
- [x] calendrier civil / changements d’heure Europe/Paris couverts.
- [x] lexique sans doublons et migration de progression couverts.
- [x] carnet d’erreurs et détection prudente des erreurs-types couverts.
- [x] diagnostic, transferts et UI par âge couverts.
- [ ] 📱 confirmer sur une installation réelle mise à jour que les profils existants restent intacts.

## D. Inscription / onboarding — ✅ automatisée, 📱 à confirmer

- [x] onboarding premium complet couvert en Chromium.
- [x] onboarding historique de secours couvert en Chromium.
- [x] portrait / paysage / desktop couverts automatiquement.
- [x] largeurs 900 / 1024 / 1440 px : grille lisible, sans débordement.
- [x] saisie clavier de la date de naissance : le champ n’est plus recréé, le focus reste stable.
- [x] absence d’erreur JavaScript dans le test dédié.
- [ ] 📱 refaire une inscription complète sur un PC réel avec saisie manuelle de la date.
- [ ] 📱 refaire une inscription complète sur iPhone avec clavier virtuel.

## E. Interface et accessibilité — ✅ automatisée / 📱 partielle

- [x] mise en page mobile réelle simulée sur 5 tailles : PASS Chromium / Firefox / WebKit.
- [x] interface premium : débordements, navigation, contrastes par thème, symboles et jetons par âge : PASS.
- [x] contraste premium sur profils clair / sombre : PASS Chromium.
- [x] mode sombre lisible : PASS Chromium.
- [x] mode DYS / lecture facilitée : PASS Chromium.
- [x] accessibilité clavier et noms accessibles : PASS Chromium.
- [x] Finot flottant : visibilité / absence de recouvrement couverte.
- [ ] 📱 taille de texte agrandie sur iPhone réel.
- [ ] 📱 VoiceOver : navigation minimale des écrans principaux.
- [ ] 📱 rotation portrait ↔ paysage pendant une vraie séance.

## F. Espace parent — ✅ automatisé / 📱 à confirmer

- [x] devoirs scolaires parent-validés : PASS Chromium.
- [x] aide aux devoirs : PASS Chromium.
- [x] bilan hebdomadaire parent : PASS Chromium.
- [x] finition parent V2 (programme, bilan, devoirs) : PASS Chromium.
- [x] audit interrogation parent et statistiques : PASS sur les trois moteurs où exécuté.
- [x] espace parent — devoirs, bilan, profils, accessibilité : PASS Chromium.
- [x] protections contre double récompense et incohérences validées par tests précédents.
- [ ] 📱 création d’un vrai devoir depuis téléphone réel.
- [ ] 📱 enfant marque le devoir terminé puis parent valide sur appareil réel.
- [ ] 📱 vérifier visuellement bilan hebdo / programme / graphiques sur téléphone.
- [ ] 📱 changer plusieurs fois de profil et confirmer visuellement l’absence de mélange.

## G. PWA et appareil réel — 📱 obligatoire avant 100 %

Les tests navigateur automatisés sont verts, mais les points suivants restent physiques :

- [ ] 📱 iPhone + Chrome : installation / ouverture / reprise de la PWA.
- [ ] 📱 iPhone portrait ~390 px : aucun contrôle masqué.
- [ ] 📱 iPhone paysage : navigation et clavier virtuel utilisables.
- [ ] 📱 fermeture complète puis reprise.
- [ ] 📱 démarrage à froid réellement hors ligne sur l’appareil.
- [ ] 📱 retour en ligne et réception d’une mise à jour.
- [ ] 📱 lecture audio réelle.
- [ ] 📱 dictée avec clavier iOS.
- [ ] 📱 mode DYS / taille de texte augmentée.
- [ ] 📱 VoiceOver.

## H. Validation utilisateur — 👤 obligatoire avant 100 %

- [ ] 👤 CP/CE1 : comprend seul une consigne et sait utiliser l’audio.
- [ ] 👤 CM1/CM2 : réalise une séance complète de manière autonome.
- [ ] 👤 6e : comprend navigation, progression et corrections.
- [ ] 👤 3e : présentation suffisamment mature, non infantilisante.
- [ ] 👤 enfant en difficulté : aides progressives réellement utiles.
- [ ] 👤 enfant à l’aise : pas de guidage excessif.
- [ ] 👤 Finot aide sans donner immédiatement la réponse.
- [ ] 👤 corrections comprises par l’enfant.

## I. Performance et poids — ✅ partiel / 📱 restant

- [x] cache PWA ne précharge pas toutes les grandes images de leçons / atlas : architecture à la demande en place.
- [x] audits navigateur sans erreur bloquante sur le `main` de référence.
- [ ] 📱 démarrage acceptable sur un iPhone non récent.
- [ ] 📱 absence de blocage perceptible au changement de profil.
- [ ] contrôler le poids final des banques d’images lorsque tous les visuels finaux seront intégrés.
- [ ] vérifier qu’aucune croissance anormale du stockage n’apparaît après plusieurs vraies séances.

## J. GitHub / release candidate

- [x] PR #24, #25, #26, #27, #28, #29 et #30 intégrées.
- [x] aucun ticket GitHub ouvert au moment de la recette du 24/10/2026.
- [x] `main` post-#30 : inventaire final vert.
- [x] `main` post-#30 : Primary special depth vert.
- [x] `main` post-#30 : onboarding regression vert.
- [x] `main` post-#30 : MathQuest CI #797 verte sur Regression + Chromium + Firefox + WebKit.
- [ ] protection de `main` : actuellement non activée ; à décider avant release finale.
- [ ] anciennes branches de chantier devenues inutiles à nettoyer / archiver après la release.
- [ ] attendre le résultat de l’audit parallèle final avant de figer définitivement le code.
- [ ] écrire le changelog final.
- [ ] décider et appliquer le numéro de version final.
- [ ] créer le tag / release final si souhaité.

## K. Critère de sortie

Finot Académie peut être déclaré **fini à 100 %** uniquement lorsque :

1. la CI complète reste verte sur le commit candidat final ;
2. aucun P1/P2 connu n’est ouvert ;
3. les audits parallèles de fin de chantier ne trouvent plus de défaut bloquant ;
4. la PWA est validée hors ligne sur un appareil physique ;
5. audio, dictée, DYS et espace parent sont essayés sur appareil réel ;
6. au moins un parcours primaire et un parcours collège sont réellement testés de bout en bout ;
7. les validations utilisateur essentielles sont réalisées ;
8. le changelog et le numéro de version final sont figés ;
9. Sébastien donne l’accord final de release.

## Preuves de la recette automatique actuelle

Référence `main` : `a2cb7292948a73be39a9c9468543d151790ac643`.

- MathQuest CI #797 : Regression ✅, Chromium ✅, Firefox ✅, WebKit ✅.
- Final product inventory #37 : ✅.
- Primary special depth #60 : ✅.
- Onboarding layout regression #13 : ✅.
- Inventaire : 1 129 chapitres, 29 matières, 499 approfondissements, 0 cours sous seuil après profondeur, 0 erreur générateur.
- Release readiness : 23/23 fichiers depth chargés, 0 erreur, 0 warning, 0 dette.
