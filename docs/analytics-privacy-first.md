# Finot Académie — Analytics privacy-first

Statut : DESIGN, aucun SDK analytics activé.

## Objectif

Mesurer l'usage réel de Finot sans collecter d'identité enfant, sans publicité, sans fingerprint et sans coupler l'analytics à la monétisation pédagogique.

## Principes

- aucun prénom, nom, date de naissance, email enfant ;
- aucun texte libre enfant ;
- aucune réponse vocale ni transcription ;
- aucun contenu audio ;
- aucun identifiant publicitaire ;
- aucun fingerprint ;
- aucune géolocalisation ;
- aucun identifiant appareil persistant non nécessaire ;
- aucune donnée brute permettant de reconstruire la trajectoire détaillée d'un enfant ;
- privilégier l'agrégation et les catégories ;
- analytics désactivé tant que le fournisseur, la rétention et les déclarations Store ne sont pas validés.

## Événements autorisés envisagés

- `app_open`
- `onboarding_started`
- `onboarding_completed`
- `profile_created`
- `lesson_started`
- `lesson_completed`
- `exercise_started`
- `exercise_completed`
- `correction_viewed`
- `session_started`
- `session_completed`
- `parent_mode_opened`
- `paywall_viewed`
- `purchase_started`
- `purchase_completed`
- `purchase_restored`
- `offline_session`
- `app_error`

## Propriétés autorisées envisagées

- version application ;
- plateforme ;
- canal de distribution ;
- langue UI ;
- niveau scolaire ;
- matière ;
- identifiant contenu non personnel ;
- durée sous forme de tranche ;
- score sous forme de tranche ;
- online/offline ;
- type d'erreur technique normalisé ;
- type d'entrée parent/enfant, sans identifiant utilisateur.

## Propriétés interdites

- prénom/pseudonyme ;
- date de naissance ;
- genre, sauf justification ultérieure explicite ;
- contenu de réponse ;
- texte d'une erreur scolaire ;
- contenu de dictée saisi ;
- transcription microphone ;
- token parent/enfant ;
- code de récupération ;
- IP stockée à des fins analytics si évitable ;
- user-agent brut si un groupe de plateforme suffit ;
- identifiant publicitaire ;
- device ID ;
- fingerprint.

## Granularité recommandée

Exemple :

- `duration_bucket`: `0_2m`, `2_5m`, `5_10m`, `10_20m`, `20m_plus`
- `score_bucket`: `0_39`, `40_59`, `60_79`, `80_100`
- `school_level`: `cp`, `ce1`, `ce2`, `cm1`, `cm2`, `6e`, `5e`, `4e`, `3e`

Ne jamais envoyer le détail réponse par réponse simplement parce qu'il existe localement.

## Séparation enfant / parent

Les événements commerciaux doivent provenir uniquement du parcours parent :

- `paywall_viewed`
- `purchase_started`
- `purchase_completed`
- `purchase_restored`

Aucun événement commercial ne doit être déclenché par l'enfant à la suite d'un échec scolaire, d'une perte de streak, d'un manque de pièces ou d'un score faible.

## Identité analytics

V1 recommandée : aucune identité utilisateur cross-device nécessaire.

Si une mesure de session est indispensable :

- identifiant de session éphémère ;
- rotation fréquente ;
- aucune association directe avec le profil enfant ;
- aucune utilisation publicitaire.

## Offline

Les événements offline peuvent être :

A. comptés localement puis agrégés avant envoi ; ou
B. ignorés si leur envoi augmente la sensibilité des données.

Ne jamais stocker un journal complet des actions enfant juste pour le réexpédier plus tard.

## Rétention

À décider avant activation.

Principe : conserver les données agrégées le moins longtemps possible, puis supprimer/anonymiser.

Aucune rétention illimitée par défaut.

## Choix fournisseur

Aucun fournisseur n'est validé à ce stade.

Critères obligatoires :

- compatible application destinée aux enfants ;
- pas de publicité ;
- pas de profilage ;
- configuration EU si nécessaire ;
- rétention contrôlable ;
- export/suppression possible ;
- Data Safety documentable ;
- SDK sans permissions inutiles ;
- possibilité de désactiver les identifiants publicitaires et le fingerprint.

## Tests avant activation

- intercepter toutes les requêtes analytics ;
- vérifier l'absence de PII ;
- vérifier l'absence d'identifiant publicitaire ;
- vérifier que le texte libre est impossible ;
- vérifier que les événements achat ne partent que depuis le parent ;
- vérifier offline/online ;
- vérifier opt-out si retenu ;
- vérifier la rétention côté serveur.

## Factory Core

Cette couche doit devenir réutilisable :

```text
analytics.track(event, safeProperties)
analytics.setEnabled(boolean)
analytics.flush()
```

avec validation de schéma stricte avant envoi.

La validation doit rejeter toute propriété inconnue afin qu'une future application ne puisse pas ajouter silencieusement de la PII.

## Gate activation

Aucun analytics réel avant :

- fournisseur approuvé ;
- schéma d'événements validé ;
- privacy policy mise à jour ;
- Google Data Safety mise à jour ;
- Samsung/Microsoft déclarations alignées ;
- tests réseau verts ;
- accord produit explicite si la collecte modifie substantiellement la confidentialité.
