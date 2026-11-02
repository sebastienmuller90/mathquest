# Finot Académie — ordre de saisie Play Console

Vérifié le **02/11/2026** contre l'aide officielle Google Play Console relative à **Cible et contenu**, aux **Règles pour les contenus familiaux** et aux exigences de test des nouveaux comptes personnels.

Objectif : éviter de remplir les écrans Play Console dans le mauvais ordre ou de déclarer une audience incompatible avec le produit réel.

## Ordre recommandé

### 1. Créer l'application dans Play Console

Conserver :

- nom : **Finot Académie** ;
- identifiant Android : `fr.finot.academie` ;
- catégorie : **Éducation** ;
- nom public développeur : **UpFactory Apps** ;
- e-mail public support/confidentialité : **upfactory.apps@gmail.com**.

Ne téléverser l'AAB signé final qu'après validation du `main` final et archivage de son SHA-256.

### 2. Finaliser la politique de confidentialité

URL technique prévue :

`https://sebastienmuller90.github.io/mathquest/docs/google-play/privacy-policy-public.html`

Avant de la déclarer comme politique définitive dans Play Console :

- renseigner l'identité légale exacte du titulaire ;
- fixer la date de publication ;
- laisser GitHub Pages publier le `main` final ;
- ouvrir l'URL sans authentification et vérifier son rendu mobile ;
- ajouter ensuite la même URL dans l'espace Parents.

L'adresse légale du compte personnel doit être renseignée dans Google Payments / Play Console lorsque Google la demande, mais elle n'est pas publiée dans la privacy uniquement pour cette raison.

Voir `final-human-inputs.md`.

### 3. Déclarer Publicités

V1 actuelle : **Non**.

Preuves : aucun SDK publicitaire et `AD_ID` absent.

Si de la publicité est ajoutée plus tard, refaire l'audit Familles et Data Safety avant publication de cette version.

### 4. Renseigner App access

V1 actuelle : **toutes les fonctions sont accessibles sans compte utilisateur**.

Le code Parents local ne constitue pas un compte distant et n'empêche pas l'équipe de revue d'accéder au parcours enfant principal.

### 5. Cible et contenu

Finot Académie est conçue pour des élèves du **CP à la 3e**.

Sélection recommandée dans Play Console :

- **6–8 ans** ;
- **9–12 ans** ;
- **13–15 ans**.

Ne pas sélectionner de tranche adulte ou plus jeune uniquement pour élargir artificiellement la disponibilité.

### 6. Règles Familles

Puisque les tranches cibles incluent des enfants, les **Règles pour les contenus familiaux Google Play** s'appliquent.

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

Le set commercial recommandé des captures est défini dans `store-screenshot-selection.md`.

### 10. Test interne

Téléverser d'abord l'AAB signé sur la piste interne et vérifier :

- installation depuis Google Play ;
- signature / Play App Signing ;
- lancement ;
- assets Store ;
- aucune différence fonctionnelle par rapport au RC validé.

### 11. Test fermé si le compte l'exige

Pour un compte développeur **personnel créé après le 13/11/2023**, Google exige actuellement un test fermé avec au moins **12 testeurs inscrits en continu pendant au moins 14 jours** avant de pouvoir demander l'accès production.

Suivre `closed-test-plan.md` et garder idéalement 15 à 18 testeurs fiables invités pour absorber les désistements. L'écran Play Console du compte au moment de la soumission reste l'autorité finale.

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
- Google Play Console Help — **App testing requirements for new personal developer accounts**.

Les écrans et politiques Google peuvent évoluer ; l'interface Play Console du compte éditeur au moment du dépôt reste l'autorité finale.
