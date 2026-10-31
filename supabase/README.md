# Finot Académie — backend du suivi parent (conception, NON DÉPLOYÉ)

**Statut : proposition exécutable et testée en local uniquement.**
- Aucun projet Supabase n'est créé ou connecté.
- Aucune URL, aucune clé, aucun secret.
- L'app a le suivi à distance **désactivé** (`js/remote-sync-config.js`) tant que ce backend n'est pas validé et provisionné.

Ce dossier met en œuvre les spécifications de l'autre chantier : `docs/supabase-schema-rpc-spec.md` et `docs/supabase-security-test-plan.md` (branche `chatgpt/multistore-release-orchestration`).

## Contenu

| Fichier | Rôle |
|---|---|
| `migrations/20261031000100_finot_parent_sync.sql` | Schémas, tables, index, RLS, fonctions, droits, rétention |
| `tests/run.mjs` | 59 tests de sécurité exécutés dans **PostgreSQL 18 réel** (PGlite, WebAssembly, sans réseau) |
| `package.json` | Dépendance de test isolée (PGlite) : n'affecte ni l'app ni le `package.json` racine |

```bash
cd supabase && npm ci && npm test        # 59 PASS attendus
node tests/supabase-design.test.js       # depuis tests/ : cohérence client ↔ SQL + exécution des 59 tests
```

## Architecture

```
App (clé publishable, rôle anon)
  └─ schéma api (exposé) : 7 RPC SECURITY DEFINER, search_path vide
        mq_register · mq_push · mq_ack · mq_get · mq_act · mq_delete · mq_rotate_parent
  └─ schéma private (JAMAIS exposé, aucun droit pour anon / authenticated / PUBLIC, RLS activée et forcée)
        families (empreintes des jetons) · snapshots (snapshot minimal) · parent_actions (actions en attente)
```

- **Noms historiques des RPC conservés** : l'app et la page parent n'ont changé que d'en-tête (`Content-Profile: api`).
- **Ajouts** : `mq_delete` (suppression) et `mq_rotate_parent` (rotation du lien parent).

## Données strictement nécessaires

Le serveur accepte uniquement le snapshot de `js/sync-snapshot.js`, et le vérifie lui-même :
- liste blanche des clés de premier niveau (test : identique au client) ;
- clés interdites **à toute profondeur** : `birthdate`, `lastBirthdayYear`, `gender`, `pin`, `rec`, `sync`, `dys`, `diagnostic`, `learnerProfile`, `homeworkHelp`, `homework`, `mistakes`, `your` (réponses tapées), `notes`, `transcript`, `audio`, `economy`, `tts` ;
- `syncSchema = 1` ; prénom de 40 caractères au plus ;
- journaux de 2 500 entrées au plus ; snapshot de 512 Ko au plus ;
- actions : 7 types autorisés, 8 Ko au plus, 50 en attente au plus.

Rien n'est stocké en dehors : ni adresse IP, ni appareil, ni compte. La table `families` ne contient que deux empreintes et des horodatages.

## Jetons, énumération, rotation, suppression

- **Jetons porteurs générés par l'appareil** (`rndCode`, `crypto.getRandomValues`) :
  - enfant : 28 caractères ;
  - parent : 32 caractères ;
  - alphabet de 55 symboles, soit environ 162 et 185 bits d'entropie.
- Le serveur ne stocke que `SHA-256("finot:<domaine>:v1:" || jeton)` :
  - domaines séparés enfant / parent ;
  - un jeton parent n'est jamais valable comme jeton enfant ;
  - le format est vérifié avant tout calcul.
- **Anti-énumération** : jeton inconnu, invalide, tronqué, révoqué, supprimé ou appartenant à une autre famille → même refus `finot: request refused` (ou `null` en lecture). Aucune RPC ne renvoie un jeton ni une empreinte.
- **Rotation** : `mq_rotate_parent(ancien, nouveau)`. L'ancien lien cesse immédiatement de fonctionner.
- **Suppression** : `mq_delete(lien parent, 'SUPPRIMER')`.
  - Effet : famille, snapshot et actions effacés (cascade).
  - Les anciens jetons deviennent invalides.
  - L'opération est idempotente et ne divulgue aucune information.
  - L'app la propose dans Réglages (double confirmation), puis oublie les codes sur l'appareil, sans toucher à la progression locale.
- **Limite de débit** : 30 envois par minute et par famille.
  - L'anti-abus par IP (inscriptions massives, déni de service) relève d'une passerelle (Edge Function, WAF). **À décider avant production.**

## Rétention

`private.purge_expired(interval '180 days')` est une tâche planifiée côté serveur, jamais exposée. Elle supprime :
- les familles inactives depuis 180 jours ;
- les actions acquittées depuis plus de 7 jours ;
- les actions expirées (30 jours).

Planification proposée, après revue : `select cron.schedule('finot-purge','17 3 * * *',$$select private.purge_expired()$$);`.
Les durées sont des **valeurs de travail** : elles restent à valider juridiquement et produit.

Les sauvegardes automatiques Supabase (PITR) conservent les données supprimées pendant leur fenêtre de rétention. Cette fenêtre doit être indiquée dans la politique de confidentialité.

## Ce qui reste impossible à vérifier ici

- Les réglages réels d'un projet :
  - schémas exposés par la Data API (seul `api` doit l'être) ;
  - propriétaire des fonctions ;
  - politique de journalisation de PostgREST et de la passerelle ;
  - Security Advisors et Performance Advisors.
- La limitation de débit réseau et la protection anti-robot à l'inscription.
- Les sauvegardes (PITR) et la localisation des données (région UE recommandée).

## Activation (décision du propriétaire, non faite)

1. Créer un projet (région UE), exposer **uniquement** le schéma `api`, appliquer la migration.
2. Rejouer `npm test` sur une copie locale, puis passer les Advisors Supabase (aucun bloquant).
3. Ajouter un fichier de configuration d'environnement définissant `window.FINOT_REMOTE_SYNC` (URL https `*.supabase.co`, clé `sb_publishable_…`, `schema:'api'`) **avant** `js/remote-sync-config.js`.
4. Mettre à jour la politique de confidentialité et la déclaration Data Safety (`docs/store-data-safety.md`).
