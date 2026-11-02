# Finot Académie — Données éditeur encore nécessaires avant publication

Ce fichier regroupe uniquement les informations qui ne peuvent pas être déduites du code ni inventées par un agent.

## 1. Identité publique de l'éditeur

Informations publiques désormais **confirmées** :

- nom public développeur / marque : **UpFactory Apps** ;
- e-mail public de support / confidentialité : **upfactory.apps@gmail.com**.

Informations juridiques qui restent à renseigner :

- identité légale du titulaire du compte développeur personnel ;
- adresse légale correspondante **dans Google Payments / Play Console** ;
- pays de l'éditeur si demandé par Play Console.

Ne jamais remplacer ces éléments par « UpFactory Apps » si un champ demande explicitement un **nom légal**, une **raison sociale** ou une **adresse légale**.

L'adresse légale est nécessaire à la vérification du compte Google Play personnel mais n'est pas ajoutée à la politique de confidentialité publique uniquement pour cette raison. La privacy publique conserve un point de contact dédié : `upfactory.apps@gmail.com`.

Les informations confirmées sont reportées dans :

- `docs/google-play/privacy-policy-public.html` ;
- `docs/google-play/privacy-policy-draft.md` ;
- `docs/google-play/store-listing-fr.md` ;
- `docs/google-play/play-console-answers-draft.md`.

## 2. Politique de confidentialité

GitHub Pages est **déjà actif** pour le dépôt. URL publique de base :

`https://sebastienmuller90.github.io/mathquest/`

URL technique prévue pour la politique finale :

`https://sebastienmuller90.github.io/mathquest/docs/google-play/privacy-policy-public.html`

Il reste avant utilisation dans Play Console :

- renseigner l'identité légale du responsable dans la privacy ;
- fixer la date de publication au jour de la mise en ligne définitive ;
- laisser GitHub Pages redéployer `main` ;
- ouvrir l'URL sans authentification ;
- vérifier le rendu sur mobile ;
- reporter exactement cette URL dans Play Console ;
- ajouter la même URL dans l'espace Parents de l'application.

Ne jamais déclarer la page comme politique finale avec des éléments entre crochets.

## 3. Distribution

Décisions éditeur à confirmer dans Play Console :

- pays/régions de distribution au lancement ;
- tranches d'âge exactes sélectionnées ;
- disponibilité téléphone/tablette ;
- test fermé 12 testeurs / 14 jours si le compte personnel est soumis à cette exigence.

## 4. Signature

Actions à réaliser hors Git :

- créer la clé d'upload Android ;
- choisir et conserver son mot de passe ;
- sauvegarder la clé dans au moins deux emplacements sécurisés ;
- ne jamais committer `.jks`, `.keystore`, mots de passe ou secrets ;
- générer ensuite l'AAB signé final à partir du `main` validé.

## 5. Validation physique finale

À effectuer sur au moins un vrai téléphone Android avant production :

- icône standard et, si disponible, icône thématique ;
- clavier système et au moins un clavier tiers si possible ;
- synthèse vocale réellement installée ;
- réseau coupé / instable ;
- reprise après fermeture forcée ;
- mode économie d'énergie ;
- rotation et taille de police agrandie ;
- parcours enfant + espace Parents.

La procédure détaillée CMD/ADB est dans `physical-device-validation.md`.

## 6. Assets Store restant à valider

- icône Google Play finale 512×512 : **techniquement prête** ;
- Feature Graphic 1024×500 : candidat technique prêt, validation visuelle finale à faire ;
- sélection finale des captures téléphone ;
- sélection finale des captures tablette.

Le générateur de captures reproductibles existe déjà dans le dépôt après la PR #49.

## 7. Source de suivi

Le suivi global de la release est centralisé dans l'issue GitHub `#51` : **Release Google Play — checklist finale Finot Académie**.
