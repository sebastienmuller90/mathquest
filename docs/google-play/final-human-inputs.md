# Finot Académie — Données éditeur encore nécessaires avant publication

Ce fichier regroupe uniquement les informations qui ne peuvent pas être déduites du code ni inventées par un agent.

## 1. Identité publique de l'éditeur

Informations maintenant confirmées :

- nom public éditeur : **UpFactory Apps** ;
- e-mail public de support / confidentialité : **upfactory.apps@gmail.com**.

Informations encore à renseigner avant publication définitive de la politique de confidentialité :

- identité légale / nom complet ou raison sociale officielle du responsable ;
- adresse postale publique de l'éditeur ;
- pays de l'éditeur si demandé par Play Console.

Ces données doivent être cohérentes dans :

- `docs/google-play/privacy-policy-public.html` ;
- `docs/google-play/privacy-policy-draft.md` ;
- `docs/google-play/store-listing-fr.md` ;
- `docs/google-play/play-console-answers-draft.md`.

## 2. Politique de confidentialité

GitHub Pages est **déjà actif** pour le dépôt. Le déploiement du commit `be3fb622ba2328a797529917ba9e79445aee06e2` a confirmé l'URL publique de base :

`https://sebastienmuller90.github.io/mathquest/`

Le fichier actuel `docs/google-play/privacy-policy-public.html` contient déjà le nom public **UpFactory Apps** et l'adresse **upfactory.apps@gmail.com**. Il ne doit toutefois pas encore être déclaré comme politique définitive dans Play Console tant que l'identité légale, l'adresse postale et la date de publication ne sont pas complétées.

URL technique prévue :

`https://sebastienmuller90.github.io/mathquest/docs/google-play/privacy-policy-public.html`

Avant utilisation dans Play Console :

- compléter les derniers placeholders juridiques ;
- renseigner la date de publication ;
- laisser GitHub Pages redéployer `main` ;
- ouvrir l'URL sans authentification ;
- vérifier le rendu sur mobile ;
- reporter exactement cette URL dans Play Console ;
- ajouter la même URL dans l'espace Parents de l'application.

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
- Feature Graphic 1024×500 : candidat produit, validation visuelle finale à faire ;
- sélection finale des captures téléphone ;
- sélection finale des captures tablette.

Le générateur de captures reproductibles existe déjà dans le dépôt après la PR #49.

## 7. Source de suivi

Le suivi global de la release est centralisé dans l'issue GitHub `#51` : **Release Google Play — checklist finale Finot Académie**.
