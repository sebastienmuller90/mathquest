# Finot Académie — Plan de tests sécurité Supabase

Statut : **pré-provisioning**. Aucun projet Supabase Finot n'est créé.

Objectif : disposer des tests avant l'implémentation afin de respecter TDD : tests rouges → migration minimale → tests verts.

## 1. Suites prévues

### A. Surface API

- aucune table `private` accessible avec la clé publishable ;
- aucune table enfant directement accessible ;
- seules les RPC explicitement allowlistées sont exécutables ;
- aucune fonction privilégiée inattendue exécutable par `anon`, `authenticated` ou `PUBLIC`.

### B. Isolation famille A/B

Créer deux familles de test totalement distinctes.

- parent A lit A ;
- parent A ne lit jamais B ;
- enfant A pousse A ;
- enfant A ne pousse jamais B ;
- enfant A n'acquitte que les actions A ;
- parent A crée uniquement des actions A ;
- suppression A ne modifie aucune ligne B.

### C. Tokens

- token invalide → refus générique ;
- token tronqué → refus ;
- token surdimensionné → refus ;
- token parent utilisé comme token enfant → refus ;
- token enfant utilisé comme token parent → refus ;
- token révoqué → refus ;
- token supprimé → refus ;
- aucun secret en clair retourné par les RPC.

### D. Payload snapshot

- payload valide minimal accepté ;
- champ non allowlisté rejeté ;
- date de naissance complète rejetée ;
- propriété `pin` rejetée ;
- propriété `rec`/recovery rejetée ;
- propriété `sync` brute rejetée ;
- transcription/audio rejeté ;
- objet trop gros rejeté ;
- profondeur JSON excessive rejetée ;
- mauvais type rejeté ;
- version de schéma inconnue rejetée.

### E. Actions parent

- type autorisé accepté ;
- type inconnu rejeté ;
- payload trop gros rejeté ;
- idempotency key dupliquée ne crée pas deux actions ;
- action expirée non livrée ;
- ack d'une action étrangère impossible ;
- ack répété idempotent.

### F. Suppression

Après `delete_family_data(A)` :

- snapshot A absent ;
- actions A absentes ;
- tokens A invalides ;
- `get_parent_state(A)` ne renvoie aucune donnée ;
- famille B intacte ;
- aucun secret A dans les logs applicatifs ;
- comportement backup/rétention documenté séparément.

## 2. Tests RLS/grants

Si des tables sont exposées ultérieurement :

- RLS activée ;
- policy ownership correcte ;
- `UPDATE` possède `USING` + `WITH CHECK` ;
- rôle explicitement spécifié ;
- index sur clés utilisées dans les policies.

Pour l'architecture cible actuelle, les tables sensibles restent hors schéma exposé et sans grants directs client.

## 3. SECURITY DEFINER

Pour chaque fonction privilégiée :

- fonction volontairement privilégiée ;
- propriétaire inspecté ;
- `search_path` sûr ;
- tables pleinement qualifiées ;
- `EXECUTE` révoqué de `PUBLIC` ;
- `EXECUTE` accordé uniquement au rôle prévu ;
- entrée validée ;
- aucun SQL dynamique non nécessaire ;
- aucun accès cross-family possible.

## 4. pgTAP / test helpers

Préparer des tests transactionnels rollbackables.

Organisation proposée :

```text
000-setup.sql
010-surface-api.sql
020-family-isolation.sql
030-token-security.sql
040-snapshot-contract.sql
050-parent-actions.sql
060-delete-family.sql
070-security-definer.sql
```

Chaque fichier :

```text
BEGIN
→ arrange
→ authenticate/simulate role
→ assertions
→ finish
→ ROLLBACK
```

## 5. Tests réseau client

Après intégration du build dev :

- aucune requête cloud avant activation volontaire du suivi distant ;
- aucune date naissance dans les requêtes ;
- aucun PIN/recovery ;
- aucun audio/transcription ;
- aucune requête publicitaire ;
- aucun analytics non approuvé ;
- retry borné ;
- offline ne vide pas la progression locale.

## 6. Tests d'abus

- appels rapides répétés ;
- payload maximum ;
- JSON malformé ;
- champs inattendus ;
- action replay ;
- IDs d'action fabriqués ;
- token aléatoire ;
- token d'une autre famille ;
- version protocole future/passée.

Objectif : aucun leak de données, aucune corruption, réponses génériques et comportement borné.

## 7. Advisors

Après création du futur projet et application de la migration :

- Supabase Security Advisors ;
- Supabase Performance Advisors ;
- aucun warning RLS non expliqué ;
- aucun `SECURITY DEFINER` exposé involontaire ;
- aucun grant automatique inattendu.

## 8. Gate de succès

Le backend ne peut être activé pour des données réelles que si :

```text
Isolation A/B             PASS
Table access direct        DENIED
Payload contract           PASS
Delete family              PASS
Tokens/revocation          PASS
Security advisors          0 blocker
Performance advisors       revus
Frontend privacy network   PASS
```

FAIL = 0 sur les tests sécurité critiques.
