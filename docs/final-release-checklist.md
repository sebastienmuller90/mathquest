# Finot Académie — checklist de release finale

Cette checklist définit la condition « application finie à 100 % » pour la release finale. Elle complète les tests automatiques : une CI verte ne remplace pas les validations réelles sur appareil et avec utilisateurs.

## A. Base technique — automatique

- [x] `main` de départ stable : PR #23 fusionnée, CI #666 verte, Pages #56 vertes.
- [x] Inventaire automatique CP → 3e disponible.
- [x] 1 129 chapitres actifs recensés.
- [x] 0 erreur de générateur sur l’échantillonnage de l’inventaire.
- [x] L’inventaire compte `COURS + MQCourseDepth` et ne produit plus les faux positifs des cours primaires déjà approfondis.
- [x] Wave 1 pédagogique Claude (#25) intégrée après validation complète et accord de Sébastien.
- [x] PR d’audit/durcissement (#24) rebasée sur le `main` incluant la Wave 1.
- [ ] `tests/final-product-inventory.mjs` : 0 erreur.
- [ ] `tests/release-readiness.mjs` : 0 erreur bloquante.
- [ ] `tests/full-content-audit-v2.mjs` : 0 erreur.
- [ ] Chromium : PASS.
- [ ] Firefox : PASS.
- [ ] WebKit : PASS.
- [ ] test PWA N → N+1 : PASS.
- [ ] vrai démarrage hors ligne : PASS.
- [ ] aucun fichier `course-depth-*` présent mais non chargé.
- [ ] aucun approfondissement orphelin.
- [ ] aucun asset local obligatoire manquant.
- [ ] aucune référence runtime morte dans `index.html`, `parent.html`, CSS ou manifeste.
- [ ] version `sw.js` incrémentée pour la release candidate.

## B. Pédagogie — contenu

- [ ] 104 cours réellement sous seuil sur le baseline du 23/10/2026 traités ou justifiés pédagogiquement.
- [ ] HG/EMC primaire : CE2, CM1, CM2 approfondis.
- [ ] Anglais collège : 6e, 5e, 4e, 3e approfondis.
- [ ] Italien collège : 5e, 4e, 3e approfondis.
- [ ] dictée : retours progressifs et pédagogiques validés.
- [ ] audio/oral : lettres, phonèmes, syllabes, mots, phrases et langues vérifiés.
- [ ] cohérence cours → exercices → évaluation vérifiée sur les chapitres modifiés.
- [ ] variété d’exercices suffisante : pas d’apprentissage par mémorisation d’un petit pool.
- [ ] textes/documents ajoutés clairement étiquetés `source`, `creation`, `reconstitution`, `synthese` ou `simulation` selon le standard pédagogique.
- [ ] aucune œuvre moderne protégée copiée dans les ressources de compréhension.

## C. Données et compatibilité

- [ ] aucun ID de chapitre existant cassé.
- [ ] migrations nécessaires présentes pour tout changement de clé persistée.
- [ ] ancien profil migré testé.
- [ ] stockage corrompu testé.
- [ ] multi-profils testé après mise à niveau.
- [ ] progression, maîtrise, erreurs, devoirs et économie conservés après mise à niveau.

## D. Validation réelle sur appareils

À réaliser hors CI sur appareils physiques.

- [ ] iPhone + Chrome : installation PWA / ouverture / reprise.
- [ ] iPhone portrait 390 px environ : aucun débordement ou contrôle masqué.
- [ ] iPhone paysage : navigation et clavier virtuel utilisables.
- [ ] rotation portrait ↔ paysage pendant une séance.
- [ ] fermeture complète puis reprise de l’app.
- [ ] mise hors ligne réelle après installation puis démarrage à froid.
- [ ] retour en ligne et mise à jour d’une nouvelle version.
- [ ] lecture audio réelle sur iPhone.
- [ ] saisie de dictée avec clavier iOS.
- [ ] taille de texte agrandie / mode DYS sur appareil réel.
- [ ] VoiceOver : navigation minimale des écrans principaux.

## E. Validation réelle utilisateur

- [ ] CP/CE1 : comprend seul une consigne et utilise l’audio sans aide adulte.
- [ ] CM1/CM2 : réalise une séance complète de manière autonome.
- [ ] 6e : comprend navigation, progression et corrections.
- [ ] 3e : niveau de présentation suffisamment mature, non infantilisant.
- [ ] un enfant en difficulté reçoit des aides progressives utiles.
- [ ] un enfant à l’aise ne reste pas bloqué par un guidage excessif.
- [ ] Finot aide sans donner immédiatement la réponse.
- [ ] les erreurs courantes sont expliquées de manière compréhensible.

## F. Espace parent

- [ ] création d’un vrai devoir.
- [ ] enfant marque le devoir terminé sans récompense immédiate.
- [ ] validation parentale déclenche la récompense une seule fois.
- [ ] renvoi « à refaire » testé.
- [ ] bilan hebdomadaire vide testé.
- [ ] bilan hebdomadaire avec activité testé.
- [ ] programme et suivi utilisables sur téléphone réel.
- [ ] changement de profil ne mélange jamais les données de deux enfants.

## G. Performance et poids

À refaire après intégration des banques d’images finales.

- [ ] démarrage acceptable sur iPhone non récent.
- [ ] pas de blocage visible lors du changement de profil.
- [ ] images du dictionnaire compressées et dimensionnées correctement.
- [ ] images pédagogiques lourdes chargées à la demande lorsque possible.
- [ ] cache PWA ne tente pas de précharger inutilement toutes les grandes images de leçons/atlas.
- [ ] aucune croissance anormale du stockage après plusieurs séances.

## H. GitHub / release

- [x] PR #25 Claude prête, tests complets verts, revue terminée.
- [x] accord explicite de Sébastien avant fusion #25.
- [ ] `main` vert après fusion #25.
- [x] PR #24 mise à jour sur ce nouveau `main`.
- [ ] PR #24 verte et prête.
- [x] accord explicite de Sébastien avant fusion #24.
- [ ] `main` vert après fusion #24.
- [ ] anciennes branches devenues inutiles supprimées ou archivées.
- [ ] aucun ancien ticket « à faire » déjà résolu encore ouvert.
- [ ] protection de `main` activée si les permissions GitHub le permettent : PR + CI obligatoire, pas de push direct.
- [ ] release candidate figée : aucun ajout fonctionnel de dernière minute.
- [ ] changelog final écrit.
- [ ] numéro de version final décidé et appliqué.

## I. Critère de sortie

Finot Académie peut être déclaré « fini à 100 % » uniquement lorsque :

1. les deux PR de fin de chantier ont été intégrées proprement ;
2. la CI complète est verte sur `main` ;
3. aucun P1/P2 connu n’est ouvert ;
4. les 104 lacunes pédagogiques du baseline sont traitées ou explicitement justifiées ;
5. la PWA a été validée hors ligne sur appareil réel ;
6. audio, dictée, DYS et espace parent ont été essayés sur appareil réel ;
7. au moins un parcours enfant primaire et un parcours collège ont été testés de bout en bout ;
8. Sébastien donne l’accord final de release.
