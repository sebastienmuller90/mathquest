# Finot Académie — Microsoft Store submission draft

Date de vérification officielle : 2026-10-31  
Canal : PWA existante → PWABuilder → Microsoft Store  
Statut : préparation uniquement, aucune réservation de nom ni création de compte effectuée.

## 1. Voie de distribution retenue

Microsoft documente la PWA comme le chemin le plus rapide lorsqu'une application repose principalement sur des technologies Web.

Pour Finot :

```text
PWA existante
→ audit manifest / service worker
→ PWABuilder report card
→ réservation produit Partner Center
→ identité Microsoft Store
→ package Windows généré par PWABuilder
→ tests Windows réels
→ soumission Microsoft Store
```

Aucun fork Windows du moteur pédagogique n'est prévu.

## 2. Coût compte développeur

État officiel actuel : le nouveau parcours d'inscription Microsoft Store pour les développeurs individuels est sans frais d'inscription.

Le nouveau flux doit être commencé depuis :

`https://storedeveloper.microsoft.com`

Microsoft indique notamment :

- compte individuel gratuit ;
- vérification d'identité avec pièce d'identité + selfie ;
- MFA ;
- accès Partner Center après vérification.

Cette étape est administrative : ne pas la lancer sans accord explicite.

## 3. Compte / identité Store

Avant génération du package Store :

- disposer d'un compte Microsoft personnel inscrit au Windows Developer Program ;
- réserver le nom produit dans Partner Center ;
- récupérer :
  - Package ID ;
  - Publisher ID ;
  - Publisher Display Name.

Ces identifiants sont nécessaires pour générer le package Windows Store final via PWABuilder.

Ne pas inventer ces valeurs dans le dépôt.

## 4. Packaging PWA

Microsoft indique qu'aucune modification applicative intrinsèque n'est requise pour publier une PWA lorsque celle-ci est déjà conforme.

PWABuilder :

1. analyser l'URL publique Finot ;
2. corriger les Action Items éventuels ;
3. choisir `Package For Stores` ;
4. choisir Windows ;
5. saisir Package ID / Publisher Display Name / Publisher ID ;
6. générer le package ;
7. télécharger l'archive.

La documentation Microsoft indique que l'archive générée peut contenir notamment :

- `.msixbundle` ;
- `.classic.appxbundle`.

Le package est ensuite fourni à Partner Center.

## 5. Signature

Avantage de la voie Microsoft Store PWA :

- pas d'achat de certificat de signature de code nécessaire pour ce chemin ;
- le Microsoft Store assure la signature/distribution selon son processus.

Finot ne doit donc pas créer une infrastructure de signature Windows indépendante sans nécessité.

## 6. Manifest PWA actuel — travail restant

Le manifest Finot actuel fonctionne mais reste minimal pour une qualité Store premium.

À évaluer avant PWABuilder :

- `id` stable ;
- `scope` explicite ;
- `name` ;
- `short_name` ;
- `description` ;
- `start_url` ;
- `display: standalone` ;
- `theme_color` ;
- `background_color` ;
- icons multiples ;
- icon maskable dédiée ;
- screenshots ;
- categories ;
- shortcuts uniquement si réellement utiles.

Tout changement de `id`, `scope` ou `start_url` doit être vérifié contre les installations PWA existantes pour éviter une régression de mise à jour/identité.

## 7. Service worker / offline

Déjà largement couvert par la CI Finot :

- service worker existant ;
- offline ;
- update N→N+1 ;
- stockage/migrations ;
- multi-browser Chromium/Firefox/WebKit.

Reste à tester dans le package Windows Store réel :

- premier lancement ;
- lancement offline ;
- retour online ;
- mise à jour ;
- conservation localStorage ;
- plusieurs profils ;
- redimensionnement fenêtre ;
- dark mode ;
- DYS ;
- clavier ;
- accessibilité.

## 8. Screenshots Microsoft

Exigence actuelle :

- au moins 1 screenshot pour la soumission ;
- jusqu'à 10 screenshots desktop ;
- Microsoft recommande plusieurs visuels de qualité pour montrer les principaux scénarios.

Stratégie Finot recommandée : 6 screenshots desktop réels, sans donnée enfant réelle.

### Capture 1 — Accueil

Montrer :

- Finot ;
- navigation matières ;
- progression générale.

### Capture 2 — Cours

Montrer :

- contenu pédagogique riche ;
- mise en page desktop ;
- lecture/audio si visuellement représentable.

### Capture 3 — Exercice

Montrer :

- question ;
- réponse ;
- feedback Finot.

### Capture 4 — Progression

Montrer :

- maîtrise ;
- révisions ;
- progression.

### Capture 5 — Espace parents

Utiliser un profil fictif uniquement.

Montrer :

- devoirs ;
- bilan ;
- paramètres parent.

### Capture 6 — Accessibilité

Montrer éventuellement :

- mode sombre ;
- DYS / lecture facilitée ;
- interface desktop responsive.

## 9. Promotional art Microsoft

Formats documentés :

- Branded key art : `584 × 800` ;
- Titled hero art : `1920 × 1080` ;
- Featured Promotional Square : `1080 × 1080`.

Ces éléments ne sont pas tous nécessairement requis pour une première soumission, mais doivent être préparés dans le kit Factory Store si leur usage améliore le listing.

## 10. Listing draft

### Nom

`Finot Académie`

### Catégorie

`Education`

### Proposition courte

> Du CP à la 3e, Finot accompagne chaque élève avec des cours, exercices, corrections et révisions personnalisées.

### Description de travail

Finot Académie est un compagnon pédagogique du CP à la 3e conçu pour aider l'élève à apprendre, s'entraîner et progresser à son rythme.

L'application regroupe cours, exercices, corrections, révisions et suivi de progression dans une interface adaptée à l'âge de l'élève.

Fonctionnalités :

- programmes du CP à la 3e ;
- mathématiques, français, langues et autres matières ;
- cours et exercices interactifs ;
- corrections pédagogiques ;
- progression et maîtrise ;
- révisions intelligentes ;
- mode parents ;
- profils multiples ;
- accessibilité et mode lecture facilitée ;
- fonctionnement hors connexion selon les contenus déjà installés.

La version Windows repose sur la même PWA Finot que le Web : aucune seconde application indépendante n'est maintenue.

## 11. Privacy / mineurs

Avant soumission Microsoft :

- privacy policy publique ;
- données enfant décrites exactement ;
- remote sync off par défaut tant qu'aucun backend n'est provisionné ;
- aucun tracker publicitaire ;
- aucun achat enfant ;
- aucun lien externe enfant ;
- gestion/suppression des données locales cohérente ;
- issue privacy #39 résolue ou explicitement traitée.

## 12. Âge / certification

La tranche d'âge et les réponses de certification devront correspondre au public réel CP→3e et au contenu réellement présent.

Ne pas choisir un âge uniquement pour réduire les contraintes Store.

## 13. Test Windows physique obligatoire

Avant soumission :

1. installer le package issu de PWABuilder ;
2. démarrer depuis le menu Démarrer ;
3. créer/ouvrir un profil fictif ;
4. lancer cours/exercice ;
5. tester clavier complet ;
6. redimensionner la fenêtre ;
7. tester écran étroit ;
8. tester dark mode ;
9. tester DYS ;
10. couper Internet et relancer ;
11. revenir online ;
12. mettre à jour le package ;
13. vérifier conservation des profils ;
14. désinstaller/réinstaller selon le comportement Store attendu ;
15. vérifier liens externes parent ;
16. vérifier qu'aucun lien externe enfant ne s'ouvre.

## 14. Gates Microsoft

### Déjà fermés

- [x] PWA existante ;
- [x] CI multi-browser ;
- [x] offline/update automatisés ;
- [x] architecture local-first ;
- [x] pas de fork Windows ;
- [x] coût d'inscription individuel actuel = 0 via nouveau flux.

### À fermer

- [ ] accord création compte Microsoft Store ;
- [ ] identité développeur vérifiée ;
- [ ] réservation `Finot Académie` ;
- [ ] manifest enrichi et PWABuilder report card ;
- [ ] package Windows réel ;
- [ ] tests Windows physiques ;
- [ ] privacy URL finale ;
- [ ] screenshots réels ;
- [ ] listing final ;
- [ ] rating/certification ;
- [ ] accord explicite de soumission.

## 15. Sources officielles vérifiées

- Free developer registration for individual developers : `https://learn.microsoft.com/windows/apps/publish/whats-new-individual-developer`
- Publish a PWA to the Microsoft Store : `https://learn.microsoft.com/microsoft-edge/progressive-web-apps/how-to/microsoft-store`
- Choose a Windows distribution path : `https://learn.microsoft.com/windows/apps/package-and-deploy/choose-distribution-path`
- PWA screenshots/images : `https://learn.microsoft.com/windows/apps/publish/publish-your-app/pwa/screenshots-and-images`

## 16. Décisions utilisateur encore nécessaires

Seulement au moment approprié :

- type/identité du compte développeur ;
- création effective du compte ;
- réservation du nom ;
- coordonnées légales/support ;
- publication finale.

Aucune de ces actions n'est effectuée dans ce document.
