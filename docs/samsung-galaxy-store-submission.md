# Finot Académie — dossier Samsung Galaxy Store V1

Date de vérification : 2026-10-31

## Décision d'architecture

Finot n'aura **aucune deuxième codebase Android** pour Samsung. Galaxy Store doit partir du même projet Capacitor/Android que Google Play.

Le runtime intégré dans `main@5de9b03`, déjà construit en CI, cible Android API 36, minSdk 24, sans AD_ID, sans microphone Android V1, sans backup Android et avec trafic HTTP en clair interdit.

## Exigences Samsung vérifiées

Sources officielles :

- https://developer.samsung.com/galaxy-store/faq.html
- https://developer.samsung.com/galaxy-store/distribution-guide.html
- https://developer.samsung.com/galaxy-store/prepare.html
- https://developer.samsung.com/galaxy-store/launch.html

Samsung indique notamment :

- target API >= 33 ;
- au moins un binaire 64-bit ;
- AAB accepté ; Galaxy Store génère un APK universel depuis l'AAB ;
- aucune exigence de nombre minimum d'appareils supportés ;
- installation, lancement, arrêt et désinstallation doivent fonctionner sans erreur ;
- l'app ne doit pas initier ou supporter son propre mécanisme d'auto-update ;
- un compte Samsung + Seller Portal est nécessaire ;
- le statut commercial seller est requis pour distribuer une app Android ;
- lors d'un upload AAB, Galaxy Store doit gérer la clé de signature (clé fournie/existante ou clé Galaxy Store selon le parcours choisi).

La cible API 36 de Finot dépasse donc le minimum Samsung actuellement publié.

## Package name / mises à jour croisées

Samsung recommande d'éviter les mises à jour croisées entre stores. Si un package distinct Samsung est retenu, il devra être produit via une variante/product flavor du **même projet**, jamais via un fork.

Aucun package ID Samsung définitif ne doit être créé avant accord explicite.

## Binaire

À fournir ultérieurement :

- AAB de production signé selon le processus Samsung ;
- architecture 64-bit validée ;
- versionName/versionCode alignés avec la stratégie multi-store ;
- aucun binaire beta/trial soumis en production.

L'AAB actuel de CI est uniquement un artefact de validation technique et n'est pas un binaire de publication signé.

## Métadonnées

À préparer dans Seller Portal :

- Finot Académie ;
- catégorie Education ;
- description courte ;
- description complète ;
- français ;
- pays de distribution ;
- icon Store ;
- screenshots ;
- URL de support ;
- URL de politique de confidentialité ;
- email support ;
- classification d'âge ;
- déclarations données/permissions cohérentes avec le binaire réel.

## Confidentialité enfant

Avant soumission :

- politique de confidentialité publique ;
- aucun tracker publicitaire ;
- aucun AD_ID ;
- analytics désactivés par défaut et contrôlés côté parent ;
- achats futurs exclusivement depuis espace parent ;
- suivi distant désactivé si aucun backend validé ;
- aucune donnée enfant supplémentaire collectée pour Samsung.

## Auto-update

La PWA Web peut continuer d'utiliser son service worker.

Dans l'app native Samsung :

- aucun mécanisme de téléchargement/install d'APK ;
- aucune logique interne de contournement de Galaxy Store ;
- les mises à jour applicatives natives passent par Galaxy Store.

## Tests appareil Samsung obligatoires

Avant publication :

- installation depuis package Samsung/test ;
- lancement à froid ;
- hors ligne ;
- clavier Samsung ;
- bouton Retour ;
- rotation portrait/paysage ;
- thème sombre ;
- TalkBack ;
- TTS français/anglais/italien ;
- persistence profil après update ;
- absence de restauration Android automatique après désinstallation/réinstallation ;
- liens enfant bloqués ;
- liens parent ouverts dans navigateur.

## Gate V1 Samsung

Samsung ne doit être soumis qu'après :

1. runtime Google/Android stabilisé ;
2. P0 = 0 ;
3. tests réels Samsung réalisés ;
4. privacy finalisée ;
5. package ID/stratégie de signature approuvés ;
6. compte Seller Portal créé avec accord ;
7. aucune publication sans accord explicite.
