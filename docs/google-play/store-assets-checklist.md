# Finot Académie — Checklist des visuels Google Play

État revérifié le **02/11/2026** après fusion de #63, avec contrôle des fichiers réellement disponibles dans le dossier de travail et des exigences officielles Google Play.

| Élément | Exigence | Quantité | État | Situation Finot Académie |
|---|---|---:|---|---|
| Icône launcher Android couleur | ressources adaptatives/héritées dans l'APK/AAB | — | **READY** | PR #47 fusionnée : Finot orange sur fond blanc |
| Icône monochrome Android 13+ | couche monochrome d'adaptive icon | — | **READY** | PR #49 fusionnée ; générateur reproductible `tools/make-monochrome-icon.ps1` |
| Icône Play Store | PNG 32 bits, 512×512 px, ≤ 1 024 Ko, carré plein | 1 | **READY HORS DÉPÔT** | `finot_academie_google_play_icon_512.png`, 512×512 RGBA opaque, **340 971 octets**, SHA-256 `0bd18a668a71dabefd079cf47db78fa6008effa994c587b41f7e2eb0f2288be2` |
| Image de présentation | JPEG ou PNG 24 bits sans alpha, 1 024×500 px | 1 | **CANDIDATE TECHNIQUE À OPTIMISER/VALIDER** | `finot_academie_feature_graphic_1024x500.png`, 1024×500 RGB, **226 297 octets**, SHA-256 `38d9e4f4547b100d0b3aafd90436fb8db334da1668f1660d440f1e5ef8401f7a` ; texte principal proche du bord gauche, donc revoir la safe zone avant asset final |
| Captures téléphone | JPEG ou PNG ; 320–3 840 px ; jusqu'à 8 par type | jusqu'à 8 | **OUTIL READY / PNG FINAUX À RÉGÉNÉRER** | 11 scénarios réels disponibles avec profil fictif « Léo » ; set de 8 défini dans `store-screenshot-selection.md` |
| Captures tablette | mêmes contraintes ; série dédiée recommandée | jusqu'à 8 | **OUTIL READY / PNG FINAUX À RÉGÉNÉRER** | même set de 8 et même narration que téléphone |
| Vidéo promotionnelle | URL YouTube publique, facultative | 0 ou 1 | NON REQUIS V1 | non prévue |
| Textes Store FR | nom ≤ 30, courte ≤ 80, longue ≤ 4 000 | 1 jeu | **READY** | `store-listing-fr.md` |
| Notes de version FR | texte correspondant exactement au binaire soumis | 1 | **READY** | `release-notes-fr.md` |
| Traductions | facultatives | 0 | NON REQUIS V1 | français uniquement pour la première soumission |

## Icône Play Store — source de vérité

Le fichier actuellement validé et disponible est :

`finot_google_play_assets/finot_academie_google_play_icon_512.png`

Contrôle :

- 512×512 ;
- PNG RGBA 8 bits/canal, donc 32 bits ;
- 340 971 octets ;
- canal alpha opaque / fond blanc ;
- aucun coin pré-arrondi ;
- SHA-256 `0bd18a668a71dabefd079cf47db78fa6008effa994c587b41f7e2eb0f2288be2`.

Une ancienne documentation citait `finot_academie_google_play_icon_512_FINAL.png`, 237 935 octets et un autre hash. Ce fichier n'est plus la source de vérité du dossier de travail actuel et ne doit pas être utilisé par erreur.

## Feature Graphic — candidate contrôlée

Fichier actuellement disponible :

`finot_academie_feature_graphic_1024x500.png`

Contrôle technique :

- 1024×500 exact ;
- PNG RGB 8 bits/canal = PNG 24 bits ;
- **aucun canal alpha** ;
- 226 297 octets ;
- SHA-256 `38d9e4f4547b100d0b3aafd90436fb8db334da1668f1660d440f1e5ef8401f7a`.

Contrôle visuel :

- palette crème/orange cohérente avec Finot Académie ;
- Finot canonique lisible ;
- proposition de valeur claire ;
- aucun prix, classement, badge Store ou logo institutionnel ;
- **point à optimiser avant validation finale :** le bloc `Finot Académie` est proche du bord gauche. Google recommande de garder les éléments importants — nom, slogan, visuel principal — vers le centre pour éviter les zones de recadrage selon le format d'affichage.

Conclusion : **fichier techniquement téléversable, mais ne pas le figer comme Feature Graphic finale tant que la composition safe-zone n'a pas été validée/optimisée**.

## Captures Store

Le script `tools/store-screenshots.mjs` produit 11 scénarios pour téléphone et tablette :

1. accueil ;
2. matières ;
3. cours ;
4. exercice ;
5. correction ;
6. parcours ;
7. lecture ;
8. dictée ;
9. chat Finot ;
10. progression ;
11. espace Parents.

Sortie locale : `artifacts/google-play/store-screens/{phone,tablet}/` avec `manifest.json`.

Le set commercial final est défini dans `store-screenshot-selection.md` : huit scénarios par type d'appareil. Les PNG doivent être régénérés depuis le **même `main` consolidé que la release candidate finale**, après résolution de #54 et fin du chantier PWA.

Règles :

- profil fictif « Léo », CM1 ;
- aucune donnée réelle d'enfant ;
- vraies vues de l'application ;
- aucune fonction future simulée ;
- vérifier cadrage, palette finale, absence de clavier/toast/debug ;
- conserver `manifest.json` et le commit source pour la provenance.

## Références officielles revérifiées le 02/11/2026

- Google Play Console Help — **Add preview assets to showcase your app** : feature graphic 1024×500, JPEG ou PNG 24 bits sans alpha, éléments importants vers le centre et hors zones de coupure.
- Google Play Console Help — **Best practices for your store listing** : cohérence visuelle, texte limité, aucun classement/prix/promesse non vérifiable, éléments importants centrés.

Revalider les contraintes dans Play Console au moment du dépôt final.
