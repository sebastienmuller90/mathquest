# Finot Académie — analytics privacy-first V1

Date : 2026-10-31  
Statut : spécification, aucune collecte active créée par ce document.

## 1. Objectif

Mesurer la qualité produit et les parcours sans construire un profil marketing de l’enfant.

L’analytics doit être strictement séparé :

- de la progression pédagogique ;
- de la monétisation ;
- des récompenses/XP/streak ;
- de la publicité ;
- de l’identité réelle de l’enfant.

## 2. Principes

- aucun prénom/nom/pseudo dans les événements ;
- aucune date de naissance ;
- aucun texte libre ;
- aucune réponse scolaire brute ;
- aucun contenu audio ;
- aucune transcription vocale ;
- aucune localisation précise ;
- aucun identifiant publicitaire ;
- aucun fingerprint ;
- aucun croisement avec publicité ciblée ;
- pas de profil comportemental commercial enfant ;
- pas de SDK analytics avant audit privacy/Data Safety ;
- pas de collecte avant définition du consentement applicable.

## 3. Identité analytics

### Interdit

- `child_id` durable global ;
- email ;
- téléphone ;
- device advertising id ;
- hash de prénom/date de naissance ;
- IP conservée comme identifiant métier.

### Recommandé

Si une corrélation de session est nécessaire :

- identifiant de session aléatoire et éphémère ;
- rotation à chaque nouvelle session ou période courte ;
- aucune possibilité de remonter à l’identité enfant ;
- identifiant famille durable uniquement si indispensable et si validé juridiquement/privacy, sinon absent.

## 4. Événements autorisés V1

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
- `offline_session`
- `app_error`

Événements commerciaux futurs, uniquement côté parent :

- `paywall_viewed`
- `purchase_started`
- `purchase_completed`
- `purchase_restored`

## 5. Propriétés autorisées

- version application ;
- plateforme (`web`, `android`, `windows`, `samsung`) ;
- langue UI ;
- niveau scolaire ;
- matière ;
- identifiant de contenu interne non personnel ;
- durée par tranche (`<1m`, `1-5m`, `5-15m`, `15m+`) ;
- score par tranche (`0-24`, `25-49`, `50-74`, `75-89`, `90-100`) ;
- online/offline ;
- type de session ;
- résultat technique (`success`, `cancel`, `error`) ;
- catégorie d’erreur technique contrôlée.

## 6. Propriétés interdites

- prénom/pseudo ;
- date de naissance/âge exact ;
- genre si non strictement nécessaire ;
- réponse exacte de l’enfant ;
- question exacte si elle peut contenir du texte libre ;
- texte de dictée saisi ;
- transcription micro ;
- enregistrement audio ;
- notes parent ;
- devoir texte libre ;
- récompense familiale personnalisée ;
- contenu du carnet d’erreurs ;
- token Supabase ;
- clé parent/enfant ;
- IP comme propriété envoyée volontairement ;
- user agent complet si une propriété plateforme simplifiée suffit.

## 7. Agrégation pédagogique

Pour mesurer l’efficacité sans stocker la réponse :

Exemple autorisé :

```json
{
  "event": "exercise_completed",
  "grade": "CE2",
  "subject": "maths",
  "content_id": "p-num-10000",
  "score_bucket": "75-89",
  "duration_bucket": "1-5m",
  "offline": false
}
```

Exemple interdit :

```json
{
  "name": "Léna",
  "birthdate": "2017-03-14",
  "question": "Dans 4219...",
  "answer": "0"
}
```

## 8. Erreurs techniques

`app_error` peut contenir :

- code d’erreur interne contrôlé ;
- module ;
- plateforme ;
- version ;
- écran logique ;
- online/offline.

Ne jamais envoyer automatiquement :

- stack contenant données utilisateur ;
- DOM complet ;
- localStorage ;
- URL avec token ;
- payload RPC ;
- saisie utilisateur.

## 9. Rétention proposée

À valider avant activation :

- événements bruts : rétention courte ;
- agrégats produit : rétention plus longue sans identifiant utilisateur ;
- suppression automatique ;
- aucune conservation indéfinie par défaut.

La durée finale doit apparaître dans la politique de confidentialité.

## 10. Consentement / contrôle parent

Avant activation d’un analytics distant :

- déterminer si consentement explicite est requis selon le ciblage mineur et la juridiction ;
- privilégier un contrôle parent ;
- permettre le retrait ;
- analytics optionnel ne doit jamais bloquer l’apprentissage ;
- aucun dark pattern.

## 11. Fournisseur analytics

Aucun fournisseur n’est choisi dans cette spécification.

Critères obligatoires :

- compatible enfants/familles ;
- Data Processing Agreement disponible ;
- localisation/région des données configurable si nécessaire ;
- pas de publicité ;
- pas de reciblage ;
- pas de partage cross-product ;
- suppression/rétention configurables ;
- SDK minimal ;
- fonctionnement web + Android + Windows si possible.

Option préférée pour V1 : **aucun analytics distant tant que les P0 privacy/backend ne sont pas fermés**.

## 12. Factory Core

La Factory doit exposer une interface abstraite :

```text
analytics.track(eventName, safeProperties)
```

avec :

- validation stricte du schéma ;
- liste blanche des événements ;
- liste blanche des propriétés ;
- no-op par défaut ;
- adaptateur fournisseur séparé ;
- test automatique refusant PII/champs interdits ;
- possibilité d’effacer/remplacer le fournisseur sans toucher au produit.

## 13. Tests obligatoires avant activation

- événement avec `name` → rejeté ;
- événement avec `birthdate` → rejeté ;
- événement avec `answer` texte → rejeté ;
- événement avec audio/transcript → rejeté ;
- événement inconnu → rejeté ;
- propriété inconnue → rejetée ;
- analytics désactivé → zéro requête ;
- offline → mise en file uniquement si approuvé, sinon aucun envoi ;
- retrait consentement → arrêt immédiat des nouveaux événements.

## 14. Gate de release

Pour la V1, Finot peut sortir **sans analytics distant**.

Analytics distant ne devient GO que lorsque :

- P0 privacy = 0 ;
- fournisseur validé ;
- Data Safety mise à jour ;
- privacy policy mise à jour ;
- consentement/contrôle parent défini ;
- tests de schéma au vert ;
- aucune donnée enfant interdite observée en trafic réseau.
