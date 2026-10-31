# Finot Académie — Supabase Backend Blueprint

Statut : **DESIGN AVANT PROVISIONING**  
Date : 2026-10-31  
Décision confirmée : **aucun projet Supabase Finot n'est actuellement créé**.

Ce document remplace toute hypothèse antérieure selon laquelle Finot disposerait déjà d'un backend Supabase actif.

## 1. État réel

- Finot fonctionne actuellement avec son stockage local/PWA.
- Le frontend contient du code de synchronisation prévu pour Supabase, mais aucun projet Supabase Finot live n'est provisionné.
- Il n'existe donc actuellement aucune preuve de stockage serveur Finot, aucune RLS Finot active et aucune RPC Finot déployée.
- Les RPC nommées dans le frontend doivent être considérées comme une **interface prévue**, pas comme des fonctions serveur actuellement actives.
- Aucun projet Supabase ne doit être créé, configuré ou facturé sans accord explicite de Sébastien.

## 2. Conséquence sur les P0

Les anciens P0 sont reformulés ainsi :

### P0-SUPA-01 — Backend non provisionné

Le futur backend ne peut être activé qu'après validation de l'architecture de sécurité.

### P0-SUPA-02 — Payload cloud à minimiser avant activation

La fonction frontend de snapshot est actuellement trop large pour devenir un contrat cloud. Elle ne doit pas être branchée telle quelle sur un backend réel.

### P0-SUPA-03 — Isolation inter-familles à concevoir et tester avant production

Aucune famille ne doit pouvoir lire, écrire, acquitter ou supprimer les données d'une autre famille.

### P0-SUPA-04 — Suppression et rétention à implémenter avant toute donnée réelle

Le retrait du suivi distant doit supprimer ou rendre inaccessibles les données serveur selon une politique documentée.

### P0-SUPA-05 — Contrat Data Safety / Privacy à finaliser après implémentation réelle

Les déclarations Store devront être basées sur le backend effectivement déployé, pas sur le prototype frontend.

## 3. Principe d'architecture

Le backend Finot doit être construit selon le principe :

**local-first + cloud minimal + parent-controlled**.

La PWA reste fonctionnelle sans Supabase.

Le cloud sert uniquement aux fonctions qui nécessitent réellement une synchronisation distante, par exemple :

- suivi parent distant ;
- devoirs/actions parent synchronisés ;
- statistiques agrégées nécessaires à l'espace parent ;
- éventuellement restauration contrôlée, si décidée ultérieurement.

Le cloud ne devient jamais la source unique de vérité des données pédagogiques locales sans décision explicite ultérieure.

## 4. Données interdites dans le cloud V1

Sauf décision explicite et justification ultérieure :

- date de naissance complète ;
- PIN parent ;
- code de secours parent ;
- audio enfant ;
- transcription vocale ;
- texte libre enfant non nécessaire ;
- identifiant publicitaire ;
- fingerprint ;
- localisation ;
- contacts ;
- données appareil inutiles ;
- préférences UI purement locales ;
- toute donnée nouvellement ajoutée au profil qui n'est pas explicitement allowlistée.

## 5. Payload cloud allowlisté recommandé

Le client doit construire un objet serveur explicite. Exemple conceptuel :

```text
schemaVersion
profileAlias
schoolLevel
progressSummary
masterySummary
completedContentIds
reviewDueSummary
workTimeBuckets
parentAssignments
familyRewards
lastSyncAt
```

Aucun `clone(S)` ou équivalent n'est autorisé comme contrat serveur.

Le test de contrat doit échouer si un champ local non déclaré apparaît dans le payload cloud.

## 6. Identité et association familiale

Pour V1, éviter de créer un compte enfant classique si la fonctionnalité ne l'exige pas.

Le modèle actuel de deux secrets d'association peut être conservé conceptuellement à condition d'être durci :

- secret enfant aléatoire haute entropie ;
- secret parent aléatoire haute entropie ;
- jamais journalisés ;
- jamais stockés en clair côté serveur ;
- stockage serveur sous forme de hash cryptographique adapté ;
- rotation/révocation possible ;
- comparaison constante lorsque pertinente ;
- aucun secret réutilisé comme identifiant public.

Si Supabase Auth est introduit plus tard, l'autorisation devra utiliser des identifiants serveur sûrs (`auth.uid()` / app metadata), jamais `user_metadata` contrôlable par l'utilisateur.

## 7. Schéma conceptuel

Le schéma définitif sera produit sous forme de migration SQL avant création du projet.

Tables conceptuelles minimales :

### `families`

- id interne UUID ;
- hashes des secrets d'association ou références auth ;
- created_at ;
- revoked_at ;
- schema_version.

### `learner_snapshots`

- family_id ;
- payload JSONB allowlisté ;
- updated_at ;
- version monotone.

### `parent_actions`

- id UUID ;
- family_id ;
- type allowlisté ;
- payload validé ;
- created_at ;
- acknowledged_at ;
- idempotency_key.

Aucune table de données enfant ne doit être directement lisible par `anon` ou `authenticated` sans politique d'autorisation stricte.

## 8. Exposition Data API

Règle V1 : minimiser l'exposition.

- RLS activée sur toute table exposée.
- Aucun `GRANT` large inutile à `anon`/`authenticated`.
- Les tables internes devraient idéalement rester hors schéma exposé lorsque possible.
- Toute vue exposée doit respecter l'invocation de sécurité appropriée et ne pas contourner RLS.
- Aucun `service_role` dans le frontend.

## 9. RPC / fonctions

Les fonctions nécessaires seront spécifiées puis créées dans une migration revue.

Contrat fonctionnel prévu :

- register/link family ;
- push minimal learner snapshot ;
- fetch parent summary ;
- enqueue parent action ;
- acknowledge parent action ;
- revoke link ;
- delete family cloud data.

### Règles

- paramètres strictement typés ;
- taille maximale du JSON ;
- allowlist des types d'action ;
- validation des versions de schéma ;
- idempotence ;
- aucune fonction d'énumération globale ;
- aucun message d'erreur révélant l'existence d'une autre famille ;
- permissions `EXECUTE` minimales ;
- `SECURITY DEFINER` uniquement si réellement indispensable, avec revue spécifique et recherche_path fixé ;
- ne jamais utiliser `SECURITY DEFINER` comme simple solution à un problème de permission.

## 10. Tests d'isolation obligatoires avant activation

Créer au minimum deux familles fictives A et B.

Tests négatifs :

1. parent A ne lit jamais B ;
2. enfant A ne pousse jamais sur B ;
3. enfant A ne peut pas ack les actions B ;
4. parent A ne crée pas d'action chez B ;
5. token aléatoire invalide ne révèle aucune donnée ;
6. token révoqué ne fonctionne plus ;
7. suppression A n'affecte jamais B ;
8. aucune table sensible n'est directement listable ;
9. payload surdimensionné rejeté ;
10. champ non allowlisté rejeté/ignoré selon contrat ;
11. action inconnue rejetée ;
12. replay d'action idempotent ;
13. rate limiting/anti-abus documenté ;
14. logs sans payload enfant complet.

## 11. Suppression / droit d'effacement

Avant première donnée réelle, fournir :

- action parent explicite « Supprimer les données synchronisées » ;
- confirmation forte ;
- invalidation des secrets/lien ;
- suppression des snapshots ;
- suppression des actions parent en attente ;
- suppression des métadonnées non légalement nécessaires ;
- délai de purge documenté ;
- politique de backup/rétention documentée ;
- test automatisé post-suppression.

## 12. Logs

Interdire dans les logs applicatifs :

- prénom/pseudonyme lorsque non nécessaire ;
- date de naissance ;
- payload pédagogique complet ;
- réponses enfant ;
- erreurs détaillées contenant du contenu personnel ;
- tokens parent/enfant ;
- audio/transcriptions.

Conserver uniquement les métadonnées techniques minimales nécessaires au diagnostic.

## 13. Analytics

Le futur backend Supabase ne doit pas devenir implicitement un backend analytics.

Les analytics privacy-first sont un sous-système distinct et désactivé tant que :

- schéma d'événements non validé ;
- finalités non documentées ;
- durée de conservation non définie ;
- déclarations Store non alignées.

## 14. Ordre d'implémentation recommandé

1. figer le payload allowlisté ;
2. écrire tests de contrat frontend rouges ;
3. définir schéma SQL ;
4. définir RPC/RLS ;
5. revue sécurité ;
6. seulement alors créer le projet Supabase avec accord explicite ;
7. appliquer migrations ;
8. exécuter advisors sécurité/performance ;
9. exécuter tests d'isolation A/B ;
10. connecter un build de développement Finot ;
11. vérifier suppression/rétention ;
12. finaliser Privacy/Data Safety ;
13. seulement ensuite activer le suivi distant pour des tests réels.

## 15. Gate de création du projet

La création du projet Supabase est une décision administrative pouvant avoir un coût. Elle nécessite donc l'accord explicite de Sébastien.

Avant de demander cet accord, doivent être prêts :

- migration SQL initiale ;
- modèle RLS/RPC ;
- payload allowlisté ;
- tests TDD ;
- région recommandée ;
- estimation du coût ;
- politique de rétention/suppression ;
- plan rollback.

## 16. Conséquence immédiate pour la release

La publication Store peut avancer sur packaging, assets, QA et conformité, mais **le suivi distant Supabase ne doit pas être présenté comme une fonctionnalité opérationnelle** tant que le projet n'est pas créé et sécurisé.

Si la V1 Store devait sortir avant le backend, deux options sûres existent :

A. masquer/désactiver proprement le suivi distant ;
B. retarder la publication jusqu'à fermeture du backend P0.

Le choix produit sera fait plus tard ; aucune décision irréversible n'est prise ici.
