# Finot Académie — statut des assets Store au 02/11/2026

Référence de cette mise à jour : `main@03b2f1cb4b8c235c374c5be249472d310ca96525` après fusion de la PR #63.

Ce fichier distingue les éléments intégrés au dépôt, les binaires préparés hors Git et les actions qui doivent encore être réalisées sur le `main` final consolidé.

## Icône Android launcher couleur

- **READY dans `main`** depuis la PR #47.
- Ressources adaptatives + héritées intégrées.

## Icône Android monochrome

- **READY dans `main`** depuis la PR #49.
- Cinq densités `ic_launcher_monochrome.png` + déclaration `<monochrome>` dans les adaptive icons.
- Générateur reproductible : `tools/make-monochrome-icon.ps1`.
- Reste uniquement l'observation du rendu thématique sur un vrai appareil Android compatible.

## Icône Google Play

- **READY hors dépôt** : `finot_academie_google_play_icon_512.png`.
- Contrôlée : 512×512, PNG RGBA/32 bits, 340 971 octets, fond blanc, sans coins pré-arrondis.
- Ce binaire n'est pas versionné dans Git ; conserver l'original validé pour le téléversement Play Console.

## Feature graphic

- Brief final : `docs/google-play/feature-graphic-brief.md`.
- Format attendu : 1 024×500, JPEG ou PNG 24 bits sans alpha.
- Une éventuelle candidate préparée hors dépôt n'est pas auditable depuis Git : **ne pas la considérer comme asset final tant que le fichier exact n'a pas été contrôlé visuellement et techniquement**.
- Action restante : choisir/valider le fichier final, contrôler dimensions/mode couleur/absence d'alpha, puis l'archiver avec les autres assets de publication.

## Captures Google Play

- **OUTIL READY dans `main`** : `tools/store-screenshots.mjs` + `tools/android-cdp.mjs`.
- 11 scénarios réels téléphone + 11 tablette sont générables avec le profil fictif « Léo » CM1.
- Sortie hors Git : `artifacts/google-play/store-screens/{phone,tablet}/` avec `manifest.json`.
- Le cadrage spécifique aux captures Store a été corrigé par la PR #60.
- Le défaut produit général de la première bulle du chat sur petit portrait reste suivi par #54 ; sa cause et le correctif `6rem → 9rem` sont déjà reproduits dans la Draft PR #64.
- **Ne pas figer les PNG commerciaux avant fusion du correctif #54 et fin du chantier PWA de Claude**, afin que les captures proviennent du même `main` final que l'AAB de publication.
- Sélection commerciale recommandée : `docs/google-play/store-screenshot-selection.md`.

## Build Android de validation

Le workflow post-fusion `main@03b2f1c…` a construit avec succès les artefacts Android de validation et audité le manifeste. Ce workflow Multistore utilise l'identifiant de validation `fr.finot.academie.dev` et **ne remplace pas** l'AAB production signé à téléverser sur Google Play.

Pour la publication :

- identifiant production attendu : `fr.finot.academie` ;
- créer/utiliser la vraie clé d'upload hors dépôt ;
- reconstruire l'AAB production depuis le `main` final consolidé ;
- vérifier signature, version, manifeste et reproductibilité ;
- archiver le SHA-256 exact du fichier réellement téléversé.

## Confidentialité

Après PR #63 :

- nom public développeur : **UpFactory Apps** ;
- contact public : **upfactory.apps@gmail.com** ;
- URL technique prévue : `https://sebastienmuller90.github.io/mathquest/docs/google-play/privacy-policy-public.html` ;
- l'adresse personnelle/légale n'est pas un champ à publier dans cette page uniquement parce que Google la demande dans Payments/Play Console.

Restent avant de déclarer la privacy comme définitive :

1. renseigner l'identité légale exacte du titulaire ;
2. fixer la date de publication ;
3. laisser GitHub Pages publier le `main` final ;
4. ouvrir l'URL publique sans authentification et contrôler son rendu ;
5. ajouter cette même URL dans l'espace Parents et dans Play Console.

## Ordre restant recommandé

1. terminer le chantier PWA de Claude ;
2. finaliser et fusionner #54 ;
3. attendre une CI complète verte sur le `main` consolidé ;
4. régénérer les captures téléphone/tablette ;
5. sélectionner les 8 visuels Store ;
6. valider la Feature Graphic finale ;
7. finaliser/publier la privacy ;
8. effectuer la recette sur vrai appareil ;
9. créer la clé d'upload et l'AAB production signé ;
10. reporter le SHA-256 final et soumettre dans Play Console.
