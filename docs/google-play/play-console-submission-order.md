# Finot Académie — ordre de saisie Play Console

Vérifié le **02/11/2026** contre l'aide officielle Google Play Console relative à **Cible et contenu** et aux **Règles pour les contenus familiaux**.

Objectif : éviter de remplir les écrans Play Console dans le mauvais ordre ou de déclarer une audience incompatible avec le produit réel.

## Ordre recommandé

### 1. Créer l'application dans Play Console

Conserver :

- nom : **Finot Académie** ;
- identifiant Android : `fr.finot.academie` ;
- catégorie : **Éducation**.

Ne téléverser l'AAB signé final qu'après validation du `main` final et archivage de son SHA-256.

### 2. Renseigner les coordonnées éditeur et la politique de confidentialité

Avant la section **Cible et contenu**, Google demande notamment que les déclarations préalables nécessaires soient renseignées, dont la politique de confidentialité.

Bloqué tant que les valeurs publiques suivantes ne sont pas confirmées :

- nom/raison sociale ;
- adresse postale publique ;
- e-mail public de support/confidentialité ;
- URL HTTPS publique de la politique de confidentialité.

Voir `final-human-inputs.md`.

### 3. Déclarer Publicités

V1 actuelle : **Non**.

Preuves : aucun SDK publicitaire et `AD_ID` absent.

Si de la publicité est ajoutée plus tard, refaire l'audit Familles et Data Safety avant publication de cette version.

### 4. Renseigner App access

V1 actuelle : **toutes les fonctions sont accessibles sans compte utilisateur**.

Le code Parents local ne constitue pas un compte distant et n'empêche pas l'équipe de revue d'accéder au parcours enfant principal.

### 5. Cible et contenu

Finot Académie est conçue pour des élèves du **CP à la 3e**, donc l'audience réelle inclut des enfants.

Règle Google : ne sélectionner plusieurs tranches d'âge que si l'application a réellement été conçue et rendue appropriée pour chacune d'elles. Ne pas sélectionner des tranches adultes uniquement pour élargir artificiellement la disponibilité.

La sélection exacte doit être faite dans l'interface réelle de Play Console en fonction des tranches proposées au moment de la soumission.

### 6. Règles Familles

Dès qu'au moins une tranche d'âge cible inclut des enfants, les **Règles pour les contenus familiaux Google Play** s'appliquent.

Pour la V1 Finot :

- contenu scolaire adapté : oui ;
- publicité : aucune ;
- achat intégré : aucun ;
- interaction directe entre utilisateurs : aucune ;
- partage public de contenu : aucun ;
- données envoyées par l'application : aucune dans la V1 actuelle ;
- liens externes enfant : bloqués ;
- liens externes parents : sources officielles dans le navigateur système ;
- WebView : contenu applicatif embarqué, pas simple wrapper d'un site distant.

Voir `families-compliance.md`.

### 7. Data Safety

Utiliser `data-safety-draft.md`, mais refaire un contrôle du **binaire signé final** juste avant validation de la fiche.

Toute activation ultérieure de Supabase, analytics, crash reporting, publicité, paiement, micro ou autre transmission invalide le brouillon actuel.

### 8. Classification du contenu

Répondre au questionnaire IARC sur la base du produit réel. Ne pas déclarer à l'avance une classification comme acquise.

### 9. Fiche Store et assets

Importer :

- titre / descriptions : `store-listing-fr.md` ;
- icône Store 512×512 finale ;
- feature graphic 1024×500 finale ;
- captures téléphone ;
- captures tablette retenues ;
- notes de version : `release-notes-fr.md`.

### 10. Test interne

Téléverser d'abord l'AAB signé sur la piste interne et vérifier :

- installation depuis Google Play ;
- signature / Play App Signing ;
- lancement ;
- assets Store ;
- aucune différence fonctionnelle par rapport au RC validé.

### 11. Test fermé si le compte l'exige

Si Play Console impose au compte développeur personnel le parcours de test fermé, suivre exactement les critères affichés au compte. La documentation de préparation actuelle prévoit le cas **12 testeurs inscrits en continu pendant 14 jours**, mais l'écran Play Console au moment de la soumission reste l'autorité finale.

### 12. Demande production / production

Ne demander l'accès production qu'après :

- CI finale verte ;
- recette appareil réel PASS ;
- privacy publique accessible ;
- formulaires Play cohérents ;
- AAB signé final archivé avec son hash ;
- tests de distribution requis terminés.

## Références officielles revalidées le 02/11/2026

- Google Play Console Help — **Gérer les paramètres concernant l'audience cible et le contenu de l'application**.
- Google Play Console Help — **Règles Google Play pour les contenus familiaux**.

Les écrans et politiques Google peuvent évoluer ; l'interface Play Console du compte éditeur au moment du dépôt reste l'autorité finale.
