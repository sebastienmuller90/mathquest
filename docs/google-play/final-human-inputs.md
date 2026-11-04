# Finot Académie — Données éditeur encore nécessaires avant publication

Ce fichier regroupe uniquement les informations qui ne peuvent pas être déduites du code ni inventées par un agent.

## 1. Identité du compte développeur

Informations publiques désormais **confirmées** :

- nom public développeur / marque : **UpFactory Apps** ;
- e-mail public de support / confidentialité : **upfactory.apps@gmail.com**.

Informations personnelles à fournir **uniquement lors de l'inscription/vérification Play Console** :

- identité légale du titulaire du compte développeur personnel ;
- adresse légale correspondante dans Google Payments / Play Console ;
- coordonnées de vérification demandées par Google ;
- pays du compte.

Ne jamais remplacer ces éléments par « UpFactory Apps » si un champ demande explicitement un **nom légal** ou une **adresse légale**.

Ces informations de vérification du compte ne sont pas un prérequis au contenu de la politique de confidentialité publique. La privacy identifie déjà l'application, l'éditeur public et le point de contact `upfactory.apps@gmail.com`.

## 2. Politique de confidentialité

GitHub Pages est **déjà actif** pour le dépôt. URL publique de base :

`https://sebastienmuller90.github.io/mathquest/`

URL finale prévue pour la politique :

`https://sebastienmuller90.github.io/mathquest/docs/google-play/privacy-policy-public.html`

Contenu de la politique : **finalisé et daté du 3 novembre 2026**.

Il reste seulement à :

- laisser GitHub Pages redéployer `main` après fusion ;
- ouvrir l'URL sans authentification ;
- vérifier le rendu sur mobile ;
- reporter exactement cette URL dans Play Console ;
- ajouter la même URL dans l'espace Parents de l'application.

## 3. Distribution

Décisions **déjà fixées** :

- tranches d'âge Play Console : **6–8 ans, 9–12 ans et 13–15 ans** ;
- application validée techniquement sur téléphone et tablette Android.

Actions qui restent dans Play Console :

- choisir les pays/régions de distribution au lancement ;
- exécuter le test fermé **12 testeurs / 14 jours continus** si le nouveau compte personnel est soumis à cette exigence.

## 4. Signature

Actions à réaliser hors Git, après création du compte développeur :

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

## 6. Assets Store restant à figer

- icône Google Play finale 512×512 : **techniquement prête** ;
- Feature Graphic 1024×500 : candidat technique prêt, validation visuelle finale à faire ;
- sélection commerciale : **8 captures téléphone + 8 captures tablette déjà définies** ;
- régénérer ces captures depuis le `main` consolidé puis figer les PNG réellement téléversés.

Le générateur de captures reproductibles existe déjà dans le dépôt après la PR #49.

## 7. Source de suivi

Le suivi global de la release est centralisé dans l'issue GitHub `#51` : **Release Google Play — checklist finale Finot Académie**.

## 8. Compléments ajoutés le 04/11/2026

Décisions encore manquantes, à ne jamais inventer (voir `play-console-checklist-ordonnee.md`) :

- type de compte développeur (personnel ou organisation) : détermine l'application du test fermé 12/14 ;
- statut « trader » (Digital Services Act) et affichage public éventuel de l'adresse ;
- vérification des développeurs Android / enregistrement du nom de paquet `fr.finot.academie` ;
- pays/régions de distribution ;
- tags du Store (liste fermée de la Console) ;
- téléphone et site web publics (facultatifs) ;
- candidature facultative au programme « Designed for Families » ;
- validation visuelle humaine de la Feature Graphic et relecture des textes anglais (`store-listing-en.md`, `release-notes-en.md`).
