# Finot Académie — Réponses App Store Connect V1

État préparatoire au **03/11/2026**. À recopier dans App Store Connect après inscription Apple Developer et création de la fiche app.

## Identité

| Champ | Valeur préparée |
|---|---|
| Nom | Finot Académie |
| Bundle ID | `fr.finot.academie` |
| SKU | `finot-academie-ios-v1` |
| Langue principale | Français (France) |
| Catégorie principale | Éducation |
| Version initiale | 1.0.0 |
| Éditeur public | UpFactory Apps |
| Support | `upfactory.apps@gmail.com` |

Le nom légal, le téléphone de vérification, l'adresse et les informations fiscales/bancaires appartiennent au compte Apple Developer et ne doivent jamais être inventés ni versionnés dans le dépôt.

## Confidentialité

- Privacy Policy URL : `https://sebastienmuller90.github.io/mathquest/docs/google-play/privacy-policy-public.html` ;
- réponse App Privacy prévue pour la V1, sous réserve de revalidation du binaire iOS final : **No, we do not collect data from this app** ;
- aucune publicité ;
- aucun SDK analytics tiers ;
- aucun compte cloud ;
- aucune synchronisation serveur ;
- stockage de la progression sur l'appareil ;
- TTS via les capacités du système.

Avant soumission, revalider ces réponses contre le binaire réellement archivé et les SDK inclus par CocoaPods/SPM.

## Public / âge

Finot Académie couvre le CP à la 3e. Répondre honnêtement au questionnaire d'âge Apple 2026 à partir du contenu réel du build.

Stratégie V1 :

- catégorie principale **Éducation** ;
- ne pas cocher automatiquement `Made for Kids` avant de voir le questionnaire réel, car les bandes Kids Apple s'arrêtent à 9–11 ans alors que le produit couvre aussi 12–15 ans ;
- conserver néanmoins les protections enfants : aucune pub/analytics tiers, liens externes derrière l'espace Parents, aucune transmission de données enfant à l'éditeur dans la V1.

## App Review

- connexion requise : **Non** ;
- compte de démonstration : **Non applicable** ;
- toutes les fonctions principales sont accessibles localement ;
- noter pour l'équipe Review que l'espace Parents est protégé par un code créé localement ;
- fournir dans les notes la procédure courte permettant d'ouvrir l'espace Parents si nécessaire ;
- expliquer que l'application peut être testée hors connexion après installation ;
- préciser que le chat Finot est un assistant local et non un service de messagerie entre utilisateurs.

## Build / plateforme

- iPhone : Oui ;
- iPad : Oui, cible souhaitée ;
- bundle ID : `fr.finot.academie` ;
- build App Store : Xcode 26 ou plus récent avec SDK iOS/iPadOS 26 ou plus récent ;
- cible iOS minimale : à fixer dans le projet Capacitor en respectant le minimum supporté par Capacitor 8 et les besoins du produit ; Apple impose au minimum iOS 13 pour les uploads actuels, mais le projet doit choisir une cible réellement testée.

## Prix et monétisation V1

La V1 actuelle ne contient aucun achat intégré ni abonnement. Pour sortir rapidement sans modifier le binaire :

- prix proposé au lancement : **gratuit** ;
- aucun In-App Purchase ;
- aucune publicité.

Toute monétisation future devra passer par une nouvelle version et, pour les biens/fonctions numériques, respecter les règles Apple In-App Purchase applicables.

## Distribution

Les pays/régions restent une décision de compte au moment de la création de la fiche. Recommandation de lancement technique : France en premier, puis extension après validation de la V1 et de ses textes localisés.

## Informations encore obligatoirement humaines

- inscription Apple Developer ;
- identité légale et vérification du titulaire ;
- coordonnées App Review réelles ;
- éventuels contrats/taxes/banking si une version payante est activée plus tard ;
- sélection finale des territoires dans App Store Connect.
