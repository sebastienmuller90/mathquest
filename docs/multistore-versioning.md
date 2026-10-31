# Finot Académie — stratégie de versioning multi-store

Référence produit actuelle : `8.73.2-physical-fixes-2026-10-25`

## 1. Objectif

Séparer clairement :

- la version produit visible ;
- la version de cache/service worker PWA ;
- la version Android Store ;
- la version Microsoft Store ;
- les variantes éventuelles Samsung ;
- les versions de schéma/migration de données.

Aucune plateforme ne doit obliger à casser les données ou réécrire la versioning historique de Finot.

## 2. Version produit

La version produit humaine reste la référence fonctionnelle commune à tous les canaux.

Format recommandé V1 après figement :

`8.74.0`

ou, si l’équipe souhaite conserver la trace de la release candidate actuelle jusqu’à stabilisation :

`8.73.3-multistore-rc.1`

La version finale publique ne doit plus contenir de date ou de libellé de chantier interne si cela gêne les Store listings.

Aucun numéro final n’est décidé ici : ce choix doit être pris au moment de geler le premier release candidate multi-store.

## 3. PWA / Service Worker

Le cache PWA conserve son identifiant propre, distinct de `versionCode` Android.

Règles :

- changement de fichiers précachés ou logique SW → incrément cache/version SW ;
- mise à jour N→N+1 doit préserver `localStorage` et profils ;
- anciens caches supprimés seulement après activation correcte ;
- ne jamais utiliser un changement de cache comme migration de données ;
- le numéro SW peut contenir un suffixe technique interne si nécessaire.

## 4. Android Google Play

### `versionName`

Version lisible par l’utilisateur, idéalement alignée sur la version produit :

`8.74.0`

### `versionCode`

Entier strictement croissant. Il ne redescend jamais, même si le `versionName` change.

Schéma recommandé pour l’App Factory :

`MMmmppbb`

avec :

- `MM` = major sur 2 chiffres ;
- `mm` = minor sur 2 chiffres ;
- `pp` = patch sur 2 chiffres ;
- `bb` = build/release sur 2 chiffres.

Exemple pour 8.74.0 build 1 : `08740001`.

Avant adoption, vérifier les contraintes numériques du runtime/build Android final ; si le projet préfère un compteur simple monotone (`1`, `2`, `3`…), le compteur simple est acceptable et plus robuste.

Recommandation V1 : **compteur simple monotone** pour éviter toute dette de conversion. Exemple :

- internal 1 → `versionCode 1`
- internal 2 → `versionCode 2`
- closed 1 → `versionCode 3`
- production 1 → `versionCode 4`

## 5. Samsung Galaxy Store

Même version produit que Google.

Si Samsung utilise un package variant distinct :

- même `versionName` ;
- `versionCode` géré par la même politique monotone ;
- pas de divergence fonctionnelle silencieuse ;
- tout hotfix Samsung doit aussi être évalué pour Google et PWA.

## 6. Microsoft Store

La version package Windows possède son propre schéma de package, généralement quatre composants numériques.

Mapping recommandé :

`major.minor.patch.build`

Exemple :

`8.74.0.1`

Le numéro package Windows est distinct du service worker et du `versionCode` Android, mais doit être traçable vers le même commit Git/release produit.

## 7. Git / tags

Chaque release candidate Store doit être traçable par :

- commit Git exact ;
- branche ;
- version produit ;
- build Android ;
- package Windows ;
- version SW ;
- SHA de l’artefact si disponible.

Tags proposés après validation finale uniquement :

- `finot-v8.74.0-rc.1`
- `finot-v8.74.0`

Ne pas créer de tag release tant que la release n’est pas approuvée.

## 8. Matrice de traçabilité

Pour chaque build candidat, conserver un tableau :

| Champ | Exemple |
|---|---|
| Git SHA | `abcdef1...` |
| Version produit | `8.74.0` |
| PWA/SW | `8.74.0` ou identifiant cache associé |
| Android versionName | `8.74.0` |
| Android versionCode | `4` |
| Samsung versionName | `8.74.0` |
| Samsung versionCode | `4` ou compteur propre variant si requis |
| Microsoft package | `8.74.0.1` |
| Canal | internal / closed / production |
| Date build | ISO 8601 |
| Tests | lien run CI |

## 9. Migrations de données

Les migrations `localStorage`/profil sont versionnées indépendamment.

Règles :

- ne jamais coupler une migration destructive à une simple hausse de version Store ;
- migration idempotente ;
- sauvegarde/rollback ou conservation de la donnée brute quand possible ;
- tests ancien stockage → nouvelle version ;
- test multi-profils ;
- aucune perte silencieuse.

## 10. Factory Blueprint

Ce modèle devient un composant Factory Core :

- `productVersion` ;
- `webCacheVersion` ;
- `androidVersionName` ;
- `androidVersionCode` ;
- `windowsPackageVersion` ;
- `schemaVersion` ;
- `gitSha` ;
- `releaseChannel`.

La Factory devra générer automatiquement une matrice de traçabilité par build et refuser une release si un compteur Store régresse.
