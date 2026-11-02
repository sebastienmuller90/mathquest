# Finot Académie — provenance des AAB de validation (02/11/2026)

Ce document distingue les preuves de reproductibilité **locale** et **GitHub Actions**. Un hash identique n'est attendu qu'entre builds exécutés dans un environnement et avec des entrées équivalentes ; un AAB produit localement et un AAB produit par GitHub Actions peuvent différer byte à byte sans que leur contenu fonctionnel diffère.

## Builds locaux rapportés pendant la PR #49

Sur le commit `9659e5db03aea51d1f7c2e17b8f4f171ffbbec09`, deux exécutions locales consécutives du pipeline ont produit :

- taille : **58 242 317 octets** ;
- SHA-256 : `7c66820146e354c8ac2335c0b62e7abab5d6b562314799d782c207c76b2c0e96`.

Ces deux builds locaux étaient donc reproductibles entre eux.

## Builds GitHub Actions vérifiés indépendamment

Artefact `Finot Multistore Android` du commit `9659e5db03aea51d1f7c2e17b8f4f171ffbbec09` :

- artifact ID GitHub : `13117668262` ;
- AAB : `bundle/release/app-release.aab` ;
- taille : **58 237 420 octets** ;
- SHA-256 : `26e24387ecc22620f1acce8010dd3e9d8c3e84d27ec5e73423f9b7de5afeb133`.

Artefact `Finot Multistore Android` du commit `a74323bcc9e21ef0d3505a58957749442fe8a89a` :

- artifact ID GitHub : `13118631642` ;
- AAB : `bundle/release/app-release.aab` ;
- taille : **58 237 420 octets** ;
- SHA-256 : `26e24387ecc22620f1acce8010dd3e9d8c3e84d27ec5e73423f9b7de5afeb133`.

Les deux AAB CI sont donc **strictement identiques entre eux**, y compris après le dernier commit de #49 qui ne modifiait que l'outil/test de captures.

## Interprétation

- reproductibilité locale : **confirmée sur deux builds locaux**, d'après le relevé de #49 ;
- reproductibilité GitHub Actions : **confirmée sur deux commits CI consécutifs** avec un AAB identique ;
- identité byte à byte entre environnement local et GitHub Actions : **non confirmée** ; les hashes et tailles diffèrent.

La preuve de release doit donc toujours indiquer l'environnement auquel appartient le hash cité. Pour le téléversement final Google Play, calculer et archiver le SHA-256 de **l'AAB signé réellement téléversé**, plutôt que de réutiliser l'un des hashes de validation ci-dessus.
