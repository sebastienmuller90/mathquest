# Checklist de l'organisateur (éditeur) — test interne puis test fermé

Rédigée le 09/11/2026. À cocher dans l'ordre. Complète [play-console-checklist-ordonnee.md](../play-console-checklist-ordonnee.md) (champs détaillés) et [closed-test-plan.md](../closed-test-plan.md) (plan 12/14 jours).

## Ce que Claude ne peut PAS faire

- Créer, vérifier ou activer le compte Play Console (identité, paiement, statut, type de compte).
- Cliquer dans la Play Console, téléverser l'AAB, publier une version, envoyer des invitations.
- Détenir ou utiliser la clé d'import : la **signature** se fait sur votre PC, avec vos mots de passe.
- Inventer des adresses e-mail de testeurs ou affirmer que des testeurs sont inscrits.
- Remplacer un test sur appareil physique.

## A. Prérequis

- [ ] Compte Play Console actif et vérifié (type personnel/organisation noté : ______ ; date de création : ______).
- [ ] Clé d'import créée et sauvegardée ([signing.md](../signing.md), §2).
- [ ] Politique de confidentialité publique accessible sans authentification.
- [ ] Au moins un passage sur appareil physique ([physical-device-validation.md](../physical-device-validation.md)).

## B. AAB à signer — version 8075016 uniquement

- [ ] Partir de `Finot-Academie-8075016-non-signe.aab` (copie : `D:\UpFactory\Releases\`). Les AAB **8075012 et 8075014 sont obsolètes** : ne pas les signer ni les téléverser.
- [ ] Signer avec `D:\UpFactory\Releases\Signer-Finot-AAB.ps1` (procédure : [signing.md](../signing.md), §3).
- [ ] Vérifier la signature et archiver le SHA-256 (hors Git).
- [ ] **Ne jamais téléverser un AAB non signé.**

## C. Créer l'application et les déclarations

- [ ] Créer l'application (nom `Finot Académie`, fr-FR, Application, gratuite, paquet `fr.finot.academie`).
- [ ] Déclarations obligatoires du tableau de bord : politique de confidentialité, accès à l'appli, publicités, classification du contenu, public cible et contenu, sécurité des données, Families le cas échéant. Valeurs de référence : [play-console-answers-draft.md](../play-console-answers-draft.md), [data-safety-draft.md](../data-safety-draft.md), [families-compliance.md](../families-compliance.md).
- [ ] Fiche Store minimale ([store-listing-fr.md](../store-listing-fr.md)).

## D. Piste de test interne (recommandée d'abord)

- [ ] Créer la piste, ajouter quelques comptes (vous-même, 1 à 2 proches).
- [ ] Importer l'AAB **signé** 8075016, notes de version ([release-notes-fr.md](../release-notes-fr.md)).
- [ ] Publier, installer depuis le Play Store, vérifier l'ouverture et le numéro de version (onglet **Plus**).

## E. Piste de test fermé

- [ ] Choisir la méthode : liste e-mail (≤ 2 000 par liste) ou Google Group (chaque testeur doit **rejoindre le groupe avant** le test).
- [ ] Remplir [05-suivi-12-testeurs.csv](05-suivi-12-testeurs.csv) avec les adresses Google **réelles et consenties** des testeurs ; **ne pas le versionner** une fois rempli.
- [ ] Créer la piste fermée, rattacher la liste ou le groupe, importer l'AAB signé 8075016, renseigner l'e-mail de retour `upfactory.apps@gmail.com`.
- [ ] Envoyer la version en revue et **attendre le statut « Publiée »** (sans cela, pas de lien d'opt-in).
- [ ] Copier le lien d'opt-in et l'insérer dans [02-message-aux-testeurs.md](02-message-aux-testeurs.md).
- [ ] Envoyer le message ; noter la date d'invitation dans le tableau.

## F. Suivi pendant 14 jours

- [ ] Vérifier chaque jour le nombre d'inscrits dans la Console (objectif : au moins 12 en continu ; prévoir 15 à 18 invités).
- [ ] Relancer à J+3 et J+7 ; rappeler de ne pas se désinscrire.
- [ ] Collecter les retours via [04-recueil-anomalies.md](04-recueil-anomalies.md).
- [ ] Toute correction : nouvel AAB signé avec un `versionCode` supérieur, mis sur la piste sans interrompre le test.

## G. Clôture

- [ ] Critères de sortie atteints (voir [04-recueil-anomalies.md](04-recueil-anomalies.md), §5, **propositions**).
- [ ] Si le compte est concerné : « Demander l'accès à la production » et rédiger les réponses à partir des **résultats réels**.
