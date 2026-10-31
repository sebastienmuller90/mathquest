# Finot Académie — audit sécurité du dépôt public

Date : 2026-10-31  
Référence produit : `main` @ `05b4c0ce21bd78a9027367d1219e660ec86f7bda`

## 1. Constat

Le dépôt `sebastienmuller90/mathquest` est actuellement public.

Le caractère public du dépôt n’est pas, à lui seul, une vulnérabilité. Le risque dépend de ce que contient réellement le dépôt et de la robustesse des autorisations côté backend.

## 2. Recherches effectuées

Recherche ciblée dans le dépôt pour :

- clé Supabase `service_role` ;
- variables `SUPABASE_SERVICE_ROLE` ;
- clés privées / `PRIVATE KEY` ;
- secrets serveur évidents ;
- présence d’une clé Supabase frontend publishable.

## 3. Résultat

### Aucun secret serveur évident trouvé

Aucune occurrence de :

- `service_role` ;
- `SUPABASE_SERVICE_ROLE` ;
- clé privée ;
- secret de signature Store ;
- token serveur volontairement exposé.

### Clé Supabase publishable trouvée

Une clé Supabase publishable est intégrée au frontend, ce qui est cohérent avec l’architecture d’un client public Supabase.

Cette clé ne doit jamais être considérée comme une barrière de sécurité.

La sécurité doit être fournie par :

- RLS ;
- permissions SQL ;
- RPC correctement cloisonnées ;
- validation serveur ;
- impossibilité d’accéder directement aux tables enfant ;
- secrets famille suffisamment entropiques ;
- suppression/rétention contrôlées.

## 4. Risque principal réel

Le risque P0 n’est pas que quelqu’un voie l’URL Supabase ou la publishable key dans GitHub.

Le risque P0 serait qu’un utilisateur disposant de cette clé publique puisse :

- lire des données d’une autre famille ;
- écrire sur le profil d’une autre famille ;
- énumérer des familles ;
- appeler une RPC avec des paramètres forgés ;
- lire directement une table contenant des données enfant ;
- exploiter une fonction `SECURITY DEFINER` trop permissive.

Ce point reste non prouvé tant que les définitions SQL/RLS/RPC Supabase n’ont pas été auditées.

## 5. Données sensibles dans Git

Le dépôt contient le code qui décrit la structure des profils enfant et les flux de synchronisation. Cela facilite l’audit, mais augmente l’importance d’un backend réellement sécurisé.

Ne jamais commiter :

- service role Supabase ;
- mot de passe de base de données ;
- clés de signature Android ;
- keystore ;
- mots de passe de keystore ;
- credentials Play Console ;
- credentials Microsoft Partner Center ;
- credentials Samsung Seller Portal ;
- tokens GitHub ;
- fichiers `.env` contenant secrets ;
- certificats privés.

## 6. Actions recommandées avant publication

### P0

- [ ] obtenir/exporter les fonctions SQL RPC ;
- [ ] auditer RLS ;
- [ ] tester isolation famille A/B ;
- [ ] vérifier privilèges du rôle anon/publishable ;
- [ ] vérifier qu’aucune table sensible n’est directement lisible ;
- [ ] implémenter suppression cloud ;
- [ ] limiter payload enfant ;
- [ ] définir rétention.

### P1

- [ ] ajouter/maintenir une règle `.gitignore` stricte pour keystores et secrets ;
- [ ] activer une solution de secret scanning GitHub si disponible sur le plan du dépôt ;
- [ ] vérifier les artefacts CI pour éviter qu’ils ne publient captures/logs contenant des données réelles ;
- [ ] utiliser uniquement des profils fictifs pour screenshots Store et tests publics.

## 7. Visibilité du dépôt

Changer le dépôt en privé est une décision administrative/visibilité qui nécessite l’accord explicite du propriétaire.

La publication Store n’exige pas que le code source soit public.

Décision recommandée : ne pas traiter le passage privé comme substitut à la sécurité backend. Même en privé, le frontend distribué révèle nécessairement l’URL Supabase, les RPC et la clé publishable. Les contrôles RLS/RPC restent donc obligatoires.

## 8. Gate de release

La visibilité actuelle du dépôt n’est pas classée P0 en elle-même.

En revanche :

- backend non cloisonné = P0 ;
- secret serveur commité = P0 ;
- artefact CI contenant données enfant réelles = P0 ;
- absence de secret scanning/branch protection = P1 d’industrialisation.
