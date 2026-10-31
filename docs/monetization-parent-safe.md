# Finot Académie — Monétisation parent-safe

Statut : DESIGN. Aucun achat réel, paywall actif ou abonnement n'est activé par ce chantier.

## Objectif

Permettre une monétisation future sans transformer les mécanismes pédagogiques ou de gamification en pression commerciale sur l'enfant.

## Principes non négociables

- l'application gratuite doit rester réellement utilisable ;
- pas d'abonnement obligatoire en V1 ;
- pas de publicité ciblée enfant ;
- pas de publicité comportementale ;
- pas de dark pattern ;
- pas de paywall après une erreur scolaire ;
- pas de paywall lié à une perte de streak ;
- pas de conversion directe XP/pièces → achat réel ;
- pas de vente de progression, note ou réussite ;
- achats uniquement dans l'espace parent ou derrière un parental gate ;
- prix et bénéfices exprimés clairement au parent ;
- restauration des achats supportée si la plateforme l'exige ;
- progression pédagogique et entitlement commercial restent deux systèmes séparés.

## Scénarios compatibles à étudier

### Option A — Gratuit + achat unique Premium

Exemple : accès permanent à des fonctions parent avancées, rapports enrichis ou outils supplémentaires non indispensables au parcours pédagogique de base.

Avantages : simple, lisible, pas d'abonnement forcé.

### Option B — Freemium

Le socle pédagogique reste utilisable. Le Premium peut ajouter des fonctions de confort ou de suivi parent.

Le découpage exact reste à définir après mesure produit réelle.

### Option C — Abonnement optionnel futur

Hors priorité V1. Ne doit être étudié qu'après preuve de valeur récurrente réelle et sans retirer rétroactivement un achat permanent déjà vendu.

## Fonctions qui ne doivent pas être monétisées par pression

- correction d'une erreur scolaire ;
- droit de poursuivre après un échec ;
- maintien d'un streak ;
- récupération de pièces ;
- accès à une réponse correcte après frustration artificielle ;
- droit de terminer un devoir ;
- fonctions essentielles d'accessibilité ;
- sécurité/confidentialité ;
- suppression de données ;
- restauration de données nécessaires à la continuité de service si promise comme fonctionnalité de base.

## Parental Gate

Tout accès achat doit :

1. quitter le contexte enfant ;
2. demander une action parent non triviale adaptée à l'âge cible ;
3. afficher clairement le prix ;
4. expliquer si l'achat est unique ou récurrent ;
5. permettre annulation sans pénalité ;
6. ne jamais déclencher automatiquement l'achat après le gate.

## Entitlements

Le futur Factory Core doit séparer :

```text
PedagogyState
RewardState
EntitlementState
```

`EntitlementState` ne doit jamais modifier artificiellement le score pédagogique.

## Événements analytics commerciaux autorisés

Uniquement côté parent :

- `paywall_viewed`
- `purchase_started`
- `purchase_completed`
- `purchase_restored`

Ne jamais joindre : prénom enfant, date de naissance, erreurs scolaires, réponses, audio ou historique détaillé.

## Google Play

Si des biens numériques sont vendus dans l'application Android distribuée via Google Play, utiliser le système de paiement exigé par la politique Google applicable au moment de l'activation.

Aucune configuration IAP n'est créée tant que :

- le package ID final n'est pas approuvé ;
- le modèle économique n'est pas approuvé ;
- les produits/prix ne sont pas approuvés ;
- les règles Families et paiement ont été revérifiées.

## Samsung

Même principe : ne pas créer une économie commerciale séparée. La logique d'entitlement doit être mutualisée ; seul l'adaptateur Store/IAP peut varier.

## Microsoft

La PWA/Store Windows doit conserver la même notion d'entitlement. Aucun fork fonctionnel Premium spécifique Windows.

## Web/PWA

Aucun paiement Web n'est implémenté en V1 tant que la stratégie de coexistence avec les règles des stores mobiles n'est pas définie et validée.

## Prix

Aucun prix réel n'est choisi dans ce document.

Les tests UX pourront utiliser des prix fictifs clairement identifiés comme maquettes, jamais publiés.

## Tests avant activation

- enfant ne peut pas atteindre directement un achat ;
- échec scolaire ne déclenche jamais de paywall ;
- XP/streak/pièces ne changent pas en fonction d'un achat ;
- restauration achat fonctionne ;
- achat annulé conserve la progression scolaire ;
- perte d'entitlement conserve les données et la progression ;
- multi-profils : entitlement familial défini sans mélanger les données scolaires ;
- offline : comportement Premium documenté ;
- changement de Store : pas de double interprétation automatique d'un entitlement sans règle explicite.

## Factory Blueprint

Interface conceptuelle réutilisable :

```text
entitlements.get()
entitlements.has(feature)
purchases.listProducts()
purchases.purchase(product)
purchases.restore()
```

Le moteur pédagogique ne dépend pas directement du SDK Store.

## Gate d'activation commerciale

Nécessite l'accord explicite de Sébastien avant :

- création de produits IAP ;
- fixation des prix ;
- activation d'un paywall réel ;
- publication d'une offre Premium ;
- abonnement ;
- achat de service tiers payant ;
- modification commerciale irréversible.
