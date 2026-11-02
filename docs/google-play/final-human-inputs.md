# Finot Académie — Données éditeur encore nécessaires avant publication

Ce fichier regroupe uniquement les informations qui ne peuvent pas être déduites du code ni inventées par un agent.

## 1. Identité publique de l'éditeur

À renseigner avant publication de la politique de confidentialité :

- nom complet ou raison sociale officielle ;
- adresse postale publique de l'éditeur ;
- e-mail public de support / confidentialité ;
- pays de l'éditeur si demandé par Play Console.

Ces données doivent remplacer les placeholders de :

- `docs/google-play/privacy-policy-public.html` ;
- `docs/google-play/privacy-policy-draft.md` ;
- `docs/google-play/store-listing-fr.md` ;
- `docs/google-play/play-console-answers-draft.md` si nécessaire.

## 2. Politique de confidentialité

Après remplacement des placeholders :

- publier la page sur une URL HTTPS stable ;
- vérifier cette URL sans authentification ;
- reporter exactement la même URL dans Play Console ;
- ajouter cette URL dans l'espace Parents de l'application.

Ne jamais publier la page avec des éléments entre crochets.

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

## 6. Assets Store restant à valider

- icône Google Play finale 512×512 ;
- Feature Graphic 1024×500 ;
- sélection finale des captures téléphone ;
- sélection finale des captures tablette.

Le générateur de captures reproductibles existe déjà dans le dépôt après la PR #49.

## 7. Source de suivi

Le suivi global de la release est centralisé dans l'issue GitHub `#51` : **Release Google Play — checklist finale Finot Académie**.
