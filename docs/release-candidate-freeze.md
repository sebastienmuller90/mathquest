# Finot Académie — politique de freeze Release Candidate V1

Date : 2026-10-31

## Statut : FREEZE DÉCLARÉ ✅ (31/10/2026)

`main@5de9b03bcc6f9db820a0ff12598cb7ec0833eaeb` est la **Release Candidate V1**. Il s'agit de la fusion de la PR #38, qui intègre le runtime multistore. Tous les critères ci-dessous sont remplis :
- sur le HEAD runtime `69e93b9` avant fusion ;
- puis sur `main@5de9b03` après fusion (CI post-merge verte).

Les seuls P0 restants sont physiques, administratifs ou juridiques (voir `multistore-release-gates.md`).

## Déclenchement

Le freeze pouvait être déclaré lorsque la PR runtime candidate satisfaisait simultanément :

- CI regression verte ;
- Chromium / Firefox / WebKit verts ;
- Finot Multistore Android vert ;
- APK debug et AAB de validation produits ;
- audit manifeste vert ;
- aucun P0 code/privacy ouvert ;
- P1 code identifiés traités ou explicitement acceptés avant publication.

## Après freeze

Aucune nouvelle fonctionnalité produit n'est ajoutée à la V1.

Changements autorisés :

1. correction P0/P1 ;
2. correction d'un défaut découvert lors d'un test physique ;
3. correction Store/compliance indispensable ;
4. métadonnées et assets Store ;
5. versioning/signature/package ID après décision explicite ;
6. documentation et preuves de release.

Tout changement fonctionnel non indispensable repart dans une branche post-V1.

## Interdictions pendant le freeze

- refactor large ;
- changement de framework ;
- modification pédagogique non liée à un bug bloquant ;
- ajout d'un SDK analytics/ads ;
- activation de monétisation réelle ;
- activation d'un backend non validé ;
- changement de stratégie de stockage ;
- dépendance majeure mise à jour sans nécessité de sécurité démontrée.

## Validation obligatoire après chaque correctif RC

- test rouge prouvant le défaut quand automatisable ;
- correction minimale ;
- test vert ;
- suites de non-régression concernées ;
- Android build si le fichier peut affecter le paquet natif ;
- nouvelle preuve physique si le défaut est appareil-dépendant.

## Version candidate

Le package ID Store définitif, la signature de production et les identifiants Store ne sont pas nécessaires pour déclarer un RC technique.

La candidate de validation conserve un identifiant `.dev` tant que la décision définitive n'a pas été autorisée.

## Sortie du freeze vers production

La publication reste bloquée tant que les points administratifs/physiques suivants ne sont pas fermés :

- package ID définitif approuvé ;
- signature production configurée hors Git ;
- compte Store / frais approuvés ;
- tests appareils réels requis ;
- politique de confidentialité publique ;
- déclarations Data Safety / Families finales ;
- backend distant soit sécurisé/provisionné, soit explicitement désactivé en V1 ;
- accord explicite de publication.

## Principe App Factory

Cette politique de freeze devient un pattern Factory Core : toute future application doit distinguer clairement « développement produit », « release candidate » et « publication », avec des gates reproductibles et vérifiables.
