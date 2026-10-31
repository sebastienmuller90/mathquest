# Finot Académie — Spécification schéma / RPC / sécurité Supabase

Statut : **SPECIFICATION NON DÉPLOYÉE**  
Aucun projet Supabase Finot n'est actuellement créé.

Ce document décrit le contrat cible à implémenter avant provisioning. Il ne doit pas être exécuté tel quel sans revue, tests et migration dédiée.

## 1. Architecture retenue

Objectif : ne jamais exposer directement les tables contenant des données enfant.

Architecture proposée :

```text
Finot client
  ↓ clé Supabase publishable
schéma API minimal (`api` ou équivalent exposé)
  ↓ RPC explicitement autorisées
schéma interne non exposé (`private`)
  ├─ families
  ├─ learner_snapshots
  └─ parent_actions
```

Principes :

- tables sensibles hors schéma Data API exposé ;
- aucune lecture/écriture directe des tables par `anon` ;
- aucune table enfant dans `public` ;
- surface RPC minimale ;
- révocation des grants automatiques ;
- `EXECUTE` accordé fonction par fonction uniquement ;
- tout `SECURITY DEFINER` placé sous revue renforcée, `search_path` fixé et SQL pleinement qualifié ;
- aucun `service_role` dans le client.

## 2. Schémas

### `private`

Non exposé par la Data API.

Contient toutes les données persistantes sensibles.

### `api`

Schéma exposé uniquement si nécessaire pour les RPC appelées par le frontend.

Ne contient aucune table métier sensible.

Avant activation : vérifier dans les réglages Data API quels schémas sont réellement exposés.

## 3. Defaults de sécurité

Migration initiale à prévoir :

- révoquer les privilèges par défaut sur nouvelles tables/fonctions/séquences ;
- révoquer `EXECUTE` à `PUBLIC` sur les fonctions ;
- révoquer tout accès `anon`/`authenticated` au schéma `private` ;
- accorder uniquement `USAGE` sur le schéma API et `EXECUTE` sur les RPC strictement nécessaires.

Aucun objet n'est considéré sécurisé simplement parce qu'il est « non documenté ».

## 4. Table `private.families`

Champs conceptuels :

```text
id                    uuid PK
child_secret_hash     bytea/text unique not null
parent_secret_hash    bytea/text unique not null
schema_version        integer not null
created_at            timestamptz not null
updated_at            timestamptz not null
revoked_at            timestamptz null
delete_requested_at   timestamptz null
```

Interdictions :

- jamais de secret parent/enfant en clair ;
- jamais d'identifiant public dérivé directement du secret ;
- jamais de date de naissance enfant.

## 5. Table `private.learner_snapshots`

```text
family_id             uuid PK/FK
payload                jsonb not null
payload_version        integer not null
updated_at             timestamptz not null
```

Le payload est validé en allowlist avant écriture.

Taille maximale à fixer explicitement avant déploiement.

Le serveur doit refuser ou nettoyer les clés inconnues selon un comportement déterministe et testé.

## 6. Table `private.parent_actions`

```text
id                    uuid PK
family_id             uuid FK not null
action_type           text not null
payload                jsonb not null
idempotency_key       text/uuid not null
created_at             timestamptz not null
acknowledged_at        timestamptz null
expires_at             timestamptz null
```

Contraintes :

- `action_type` allowlisté ;
- unicité `family_id + idempotency_key` ;
- expiration des actions obsolètes ;
- payload borné en taille.

## 7. Secrets d'association

Le client génère deux secrets indépendants de forte entropie : enfant et parent.

Cible minimale : 128 bits d'entropie réelle, idéalement 192/256 bits.

Le serveur stocke uniquement un hash adapté à une vérification de token haute entropie.

Comme les tokens sont aléatoires et non choisis par un humain, un hash cryptographique rapide avec domaine séparé peut être envisagé ; le choix exact sera validé avant migration.

Règles :

- comparaison sans fuite observable ;
- jamais logguer le token ;
- jamais renvoyer le hash ;
- révocation possible ;
- rotation possible sans migration des données pédagogiques.

## 8. RPC cible

Noms définitifs à figer au moment de la migration. Les noms historiques du frontend peuvent être conservés pour limiter les modifications, mais leur contrat doit être réécrit.

### `register_family`

Entrées :

- secret enfant ;
- secret parent ;
- version de protocole.

Effets :

- vérifie format/longueur ;
- hash côté serveur ;
- crée association familiale ;
- ne crée aucune donnée enfant supplémentaire.

Sortie minimale : succès / version protocole.

### `push_snapshot`

Entrées :

- secret enfant ;
- payload allowlisté ;
- version payload.

Contrôles :

- famille active ;
- taille maximale ;
- version acceptée ;
- clés autorisées uniquement ;
- types stricts ;
- valeurs bornées ;
- aucune date de naissance complète ;
- aucun texte vocal/transcription.

Effet : upsert atomique du snapshot de cette famille uniquement.

### `get_parent_state`

Entrée : secret parent.

Sortie :

- snapshot minimal ;
- actions/états nécessaires ;
- aucune donnée d'une autre famille ;
- aucun secret.

### `enqueue_parent_action`

Entrées :

- secret parent ;
- type d'action allowlisté ;
- payload validé ;
- idempotency key.

Effet : crée une action pour cette famille uniquement.

### `ack_parent_actions`

Entrées :

- secret enfant ;
- liste bornée d'identifiants d'actions.

Effet : acknowledge uniquement les actions appartenant à la famille authentifiée par ce secret.

### `revoke_family_link`

Entrée : secret parent ou procédure parent équivalente.

Effet : rend immédiatement les secrets inutilisables.

### `delete_family_data`

Entrée : secret parent + confirmation de protocole.

Effet :

- marque/supprime l'association ;
- supprime snapshot ;
- supprime actions ;
- invalide tous secrets ;
- renvoie uniquement confirmation générique.

## 9. Fonctions privilégiées

Préférence : `SECURITY INVOKER` lorsque possible.

Si une RPC doit accéder aux tables `private` depuis `anon`, une fonction `SECURITY DEFINER` peut être nécessaire. Dans ce cas :

- elle est considérée comme endpoint public sensible ;
- `SET search_path = ''` ou équivalent sûr ;
- noms de tables/fonctions pleinement qualifiés ;
- validation stricte de tous paramètres ;
- aucune SQL dynamique non nécessaire ;
- aucune concaténation de SQL utilisateur ;
- `EXECUTE` révoqué de `PUBLIC`, puis accordé explicitement au seul rôle requis ;
- aucun accès générique à toutes les familles ;
- revue du propriétaire de la fonction ;
- advisors Supabase obligatoires après déploiement.

## 10. RLS

Même si les tables sont hors schéma exposé, activer RLS en défense en profondeur lorsqu'approprié.

Si Supabase Auth est introduit plus tard :

- politiques `TO authenticated` ;
- predicate d'ownership explicite ;
- `auth.uid()` seulement pour identité ;
- jamais `user_metadata` pour l'autorisation ;
- `UPDATE` avec `USING` + `WITH CHECK` ;
- indexer les colonnes utilisées dans les politiques.

Le modèle V1 à secrets d'association ne doit pas simuler un `auth.uid()` fictif.

## 11. Pas d'accès table direct

Tests obligatoires avec la clé publishable :

```text
SELECT private.*            → impossible
SELECT learner_snapshots    → impossible
INSERT learner_snapshots    → impossible
UPDATE learner_snapshots    → impossible
DELETE learner_snapshots    → impossible
```

Seules les RPC explicitement prévues sont accessibles.

## 12. Anti-énumération

Les erreurs publiques ne doivent pas distinguer :

- famille inexistante ;
- token invalide ;
- famille révoquée ;
- ressource d'une autre famille.

Réponse générique côté API lorsque cela ne nuit pas au diagnostic interne.

## 13. Bornes d'entrée

À définir dans la migration et tester :

- longueur token exacte ;
- taille payload snapshot ;
- nombre maximal d'actions en attente ;
- taille payload action ;
- nombre maximal d'IDs dans un ack ;
- types et enums ;
- profondeur JSON ;
- fréquence d'écriture raisonnable.

## 14. Rate limiting / anti-abus

La sécurité d'accès repose d'abord sur l'entropie des secrets et l'isolation serveur, mais un anti-abus reste nécessaire pour protéger la disponibilité.

À choisir avant production :

- Edge Function / gateway ;
- mécanisme Data API pré-request compatible ;
- limitation applicative côté DB ;
- ou combinaison adaptée.

Ne pas stocker durablement des IP à des fins analytics par défaut.

## 15. Logs

Logs serveur autorisés :

- type RPC ;
- statut ;
- latence ;
- code erreur normalisé ;
- version protocole.

Interdits :

- token ;
- hash token ;
- prénom enfant ;
- date naissance ;
- snapshot complet ;
- texte d'erreur scolaire ;
- réponse ;
- audio/transcription.

## 16. Rétention

À décider avant provisioning.

Valeur de travail recommandée :

- snapshot : tant que suivi distant actif ;
- actions acquittées : purge courte ;
- actions expirées : purge automatique ;
- données après suppression : suppression immédiate logique + purge physique selon politique documentée ;
- backups : durée Supabase réelle documentée dans la privacy policy avant activation.

Aucune durée n'est considérée définitive dans ce document.

## 17. Tests TDD avant création du projet réel

Préparer des tests SQL/pgTAP ou équivalents qui devront être rouges avant implémentation puis verts après migration :

1. table sensible inaccessible à `anon` ;
2. seules RPC allowlistées exécutables ;
3. token A ne lit jamais B ;
4. token A ne modifie jamais B ;
5. ack A ne touche jamais B ;
6. parent A ne crée pas d'action B ;
7. token invalide → aucun leak ;
8. token révoqué → refus ;
9. champ snapshot inconnu → rejet ;
10. date naissance → rejet ;
11. payload trop gros → rejet ;
12. action inconnue → rejet ;
13. replay idempotent ;
14. suppression A conserve B intact ;
15. ancien token après suppression → refus ;
16. aucune fonction privilégiée inattendue exécutable par `anon`/`authenticated`.

## 18. Advisors à exécuter après provisioning

Obligatoire avant tout test réel enfant :

- security advisors ;
- performance advisors ;
- revue spécifique des fonctions `SECURITY DEFINER` ;
- revue RLS manquante ;
- revue grants par défaut ;
- revue schémas exposés.

Aucun warning sécurité n'est ignoré sans justification documentée.

## 19. Ordre de livraison

```text
spec actuelle
→ tests DB
→ migration initiale
→ revue
→ estimation coût/région
→ accord Sébastien
→ création projet Supabase
→ application migration
→ advisors
→ tests A/B
→ intégration build dev
→ privacy/Data Safety finales
→ activation test distante
```

## 20. Références Supabase vérifiées

La conception est alignée sur la documentation Supabase actuelle concernant :

- RLS obligatoire sur les tables exposées ;
- distinction grants / RLS ;
- révocation des privilèges par défaut ;
- schéma API dédié ;
- risques des fonctions `SECURITY DEFINER` exposées ;
- tests RLS/pgTAP.

Les règles devront être revérifiées juste avant la création réelle du projet, Supabase évoluant régulièrement.
