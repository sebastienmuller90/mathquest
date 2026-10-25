# Finot Académie — checklist de release finale

État de référence : `main` au commit `7fa724c1cd0e66827c18931a19a069f2d0caf1c2` (fusion PR #32, 25/10/2026).
Version PWA de référence : `8.73.1-release-audit-2-2026-10-25`.

Historique : la recette précédente portait sur le `main` post-PR #30 ; la PR #32 (audit de release parallèle) y a ajouté 11 suites de bout en bout et les corrections finales listées en section L.

Cette checklist distingue volontairement trois niveaux de preuve :

- ✅ **Automatisé / prouvé** : vérifié par la CI sur le `main` de référence.
- 📱 **Appareil réel** : doit être essayé physiquement ; une simulation navigateur ne suffit pas.
- 👤 **Validation utilisateur** : nécessite un vrai usage par un enfant ou le parent.

Une CI verte ne remplace jamais les validations 📱 et 👤.

## A. Base technique — ✅ automatisée

- [x] `main` post-PR #32 stable (`run-all.js` local : 1388 PASS, 0 FAIL, 83 suites).
- [x] `tests/final-product-inventory.mjs` : PASS sur `main` (run Final product inventory #40).
- [x] `tests/release-readiness.mjs` : PASS sur `main` (run Final product inventory #40) — 0 erreur, 0 avertissement, 0 dette.
- [x] `tests/full-content-audit-v2.mjs` : PASS dans MathQuest CI #807.
- [x] Chromium : PASS dans MathQuest CI #807.
- [x] Firefox : PASS dans MathQuest CI #807.
- [x] WebKit : PASS dans MathQuest CI #807.
- [x] test PWA N → N+1 : PASS automatisé (pwa-update + suite Release PWA : anciens caches supprimés, localStorage intact, aucune boucle, mise à jour cassée sans perte).
- [x] vrai démarrage hors ligne avec serveur arrêté : PASS automatisé.
- [x] onboarding intermédiaire / saisie clavier de date : PASS sur `main` (Onboarding layout regression #16) ; onboarding moderne PASS, onboarding historique (legacy) PASS.
- [x] Primary special depth : PASS sur `main` (#70).
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
- [x] version PWA de référence : `8.73.1-release-audit-2-2026-10-25`.

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
- [x] migrations durcies : V1, V2/V3, JSON tronqué ou invalide, profils `{}` / tableau, profil actif nul ou inexistant, entrées invalides — 27 tests, deux redémarrages par scénario, aucun double gain.
- [x] isolation multi-profils : CP+CM2, CE1+6e, 3 profils, changements rapides, suppression, profil actif supprimé — 16 tests.
- [x] parcours élèves de bout en bout (inscription réelle CP, CE1, CM2, 6e, 3e, 15 changements de profil, redémarrages) — 9 tests ; parcours pédagogique CE2 + 5e (diagnostic → cours → exercice → indice → correction → maîtrise → erreurs → révision → reprise) — 58 tests.
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
- [x] suite Release clavier / focus / accessibilité : 37 tests (vraie frappe, curseur stable, Tab, focus visible, noms stricts, aria, contraste des écrans non couverts).
- [x] suite Release responsive géométrique : 9 tests sur 15 tailles d’écran (portrait, paysage, sombre, texte agrandi).
- [x] suite Release audio / dictée : 26 tests (texte et langue envoyés à la synthèse, aucune réponse révélée ; le son réel reste à écouter).
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
- [x] parcours parent de bout en bout par l’interface (16 tests) et toast de validation des devoirs (9 tests) : gain réel affiché, récompense versée une seule fois, y compris après rechargement.
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
- [x] suite Release technique / performance (28 tests) : aucune erreur console, aucune ressource 404, aucun script en double, aucune image > 400 Ko, pas de fuite d’écouteurs ni de minuteries, stockage ≈ 318 Ko après 400 réponses.
- [ ] 📱 démarrage acceptable sur un iPhone non récent.
- [ ] 📱 absence de blocage perceptible au changement de profil.
- [ ] contrôler le poids final des banques d’images lorsque tous les visuels finaux seront intégrés.
- [ ] 📱 vérifier qu’aucune croissance anormale du stockage n’apparaît après plusieurs vraies séances (croissance simulée contrôlée : voir suite Release technique).

## J. GitHub / release candidate

- [x] PR #24, #25, #26, #27, #28, #29, #30 et #32 intégrées (#31 : cette recette documentaire).
- [x] aucun ticket GitHub ouvert au moment de la recette du 24/10/2026.
- [x] `main` post-#32 : inventaire final vert (#40).
- [x] `main` post-#32 : Primary special depth vert (#70).
- [x] `main` post-#32 : onboarding regression vert (#16).
- [x] `main` post-#32 : MathQuest CI #807 verte sur Regression + Chromium + Firefox + WebKit.
- [ ] protection de `main` : actuellement non activée ; à décider avant release finale.
- [ ] anciennes branches de chantier devenues inutiles à nettoyer / archiver après la release.
- [x] audit parallèle final terminé et intégré (PR #32) : aucun P1/P2 automatisé ouvert.
- [ ] écrire le changelog final.
- [ ] décider et appliquer le numéro de version final.
- [ ] créer le tag / release final si souhaité.

## K. Critère de sortie

Finot Académie peut être déclaré **fini à 100 %** uniquement lorsque :

1. la CI complète reste verte sur le commit candidat final ;
2. aucun P1/P2 connu n’est ouvert ;
3. les audits parallèles de fin de chantier ne trouvent plus de défaut bloquant (✅ PR #32) ;
4. la PWA est validée hors ligne sur un appareil physique ;
5. audio, dictée, DYS et espace parent sont essayés sur appareil réel ;
6. au moins un parcours primaire et un parcours collège sont réellement testés de bout en bout ;
7. les validations utilisateur essentielles sont réalisées ;
8. le changelog et le numéro de version final sont figés ;
9. Sébastien donne l’accord final de release.

## L. Corrections finales intégrées par la PR #32

1. Migration : un profil actif nul, absent ou inexistant bascule sur le premier profil **exploitable** (avant : un profil vide remplaçait l’entrée et masquait le vrai profil).
2. Aucune perte : les entrées invalides restent telles quelles dans le stockage, jamais purgées ; une sauvegarde V2 sans profil exploitable laisse la V1 prendre le relais, avec copie de secours de la donnée brute.
3. Récompenses des devoirs : le toast annonce le gain réel (dont les bons points de la journée d’étude qualifiée) ; économie inchangée.
4. Puces d’accent (dictée, réponses texte) : retour à la ligne, plus de débordement à 320–390 px.
5. Noms accessibles : champs du code parent, du code de secours, d’import / export, de la raison du bonus, champ de réponse, puce apostrophe, bouton Écouter du lexique.
6. Audio : la réponse n’est plus lue à voix haute dans les questions d’anglais « Comment dit-on… / Écris en anglais… » (CP → CM2, 40 cas) ; balayage de 27 096 questions sans autre réponse révélée.
7. Responsive : bouton « Recalculer » à 320 px, icônes du mini-parcours, onboarding en paysage étroit, onglet Matières à 561–599 px.
8. Migrations durcies et couvertes (27 scénarios, deux redémarrages chacun).
9. PWA : cache, mise à jour N → N+1, anciens caches et ancien service worker couverts (14 tests).
10. Isolation multi-profils couverte sur tous les domaines de données (16 tests).

Anomalies connues **non bloquantes**, volontairement non modifiées : une entrée de profil nulle peut interrompre la migration de vocabulaire des profils suivants (`js/lexicon-cleanup-migration.js`), chaque profil restant migré à son activation ; le message de suppression de profil peut compter les entrées invalides (garde-fou sans perte).

## Preuves de la recette automatique actuelle

Référence `main` : `7fa724c1cd0e66827c18931a19a069f2d0caf1c2` · version PWA `8.73.1-release-audit-2-2026-10-25`.

- MathQuest CI #807 : Regression ✅, Chromium ✅, Firefox ✅, WebKit ✅.
- Final product inventory #40 : ✅.
- Primary special depth #70 : ✅.
- Onboarding layout regression #16 : ✅.
- `run-all.js` local : 1388 PASS, 0 FAIL, 83 suites (l’ancien « FAIL connu » de `selftest` est supprimé).
- 11 suites Release (Chromium, exécutées en CI) : profils E2E 9 · migrations 27 · parent E2E 16 · parcours pédagogique 58 · responsive 9 · clavier / focus / accessibilité 37 · audio / dictée 26 · technique / performance 28 · toast devoir 9 · isolation profils 16 · PWA 14.
- Audits : inventaire PASS ; release-readiness 0 erreur, 0 avertissement, 0 dette ; full-content-audit-v2 PASS ; onboarding moderne PASS ; legacy onboarding PASS ; onboarding intermediate layout PASS.
- Inventaire : 1 129 chapitres, 29 matières, 499 approfondissements, 0 cours sous seuil après profondeur, 0 erreur générateur.
- Release readiness : 23/23 fichiers depth chargés, 0 erreur, 0 warning, 0 dette.
