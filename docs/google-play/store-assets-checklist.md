# Finot Académie — Checklist des visuels Google Play

État vérifié le **02/11/2026** après fusion des PR #47 et #49. Les exigences externes ci-dessous ont été contrôlées contre la documentation officielle Google Play le même jour.

| Élément | Exigence | Quantité | État | Situation Finot Académie |
|---|---|---:|---|---|
| Icône launcher Android couleur | ressources adaptatives/héritées dans l'APK/AAB | — | **READY** | PR #47 fusionnée : Finot orange sur fond blanc, ressources `mipmap-*` mises à jour |
| Icône monochrome Android 13+ | couche monochrome d'adaptive icon | — | **READY** | PR #49 fusionnée ; générateur reproductible `tools/make-monochrome-icon.ps1` ; test dédié |
| Icône Play Store | PNG **32 bits**, **512×512 px**, ≤ **1 024 Ko**, carré plein ; ne pas pré-arrondir ni ajouter d'ombre externe | 1 | **READY HORS DÉPÔT** | `finot_academie_google_play_icon_512_FINAL.png` : 512×512 RGBA, fond `#FFFFFF`, 237 935 octets, SHA-256 `00182733bb4460ff86521a7fb7f4215ea1d8d6f80bbb3ab397aa0fd1a1402f1a` |
| Image de présentation (feature graphic) | JPEG ou PNG **24 bits sans alpha**, **1 024×500 px** | 1 | **TODO** | à créer/valider ; éviter de simplement dupliquer l'icône |
| Captures téléphone | JPEG ou PNG 24 bits sans alpha ; 320–3 840 px ; dimension longue ≤ 2× dimension courte | 2 minimum globalement, jusqu'à 8 par type d'appareil | **OUTIL READY / PNG À EXPORTER** | outil reproductible AVD ; 11 écrans disponibles avec profil fictif « Léo » |
| Captures tablette | mêmes contraintes de fichier/dimensions ; série dédiée recommandée | jusqu'à 8 par type d'appareil | **OUTIL READY / PNG À EXPORTER** | même outil, sortie tablette dédiée |
| Vidéo promotionnelle | URL YouTube publique, facultative | 0 ou 1 | NON REQUIS V1 | non prévue |
| Textes Store FR | nom ≤ 30, courte ≤ 80, longue ≤ 4 000 | 1 jeu | **READY** | `store-listing-fr.md` |
| Notes de version FR | texte correspondant exactement au binaire soumis | 1 | **READY** | `release-notes-fr.md` |
| Traductions | facultatives | 0 | NON REQUIS V1 | français uniquement pour la première soumission |

## Règles spécifiques de l'icône Play Store

Google Play traite l'icône Store séparément de l'icône launcher Android :

- taille finale **512×512** ;
- **PNG 32 bits** ;
- taille maximale **1 024 Ko** ;
- asset **carré plein** : ne pas arrondir les coins ;
- aucune ombre portée externe : Google Play ajoute son propre traitement ;
- pas de badge, classement, prix, mention « n°1 », catégorie Play ou autre élément susceptible d'induire en erreur ;
- pour une illustration comme Finot, utiliser suffisamment l'espace disponible pour que le personnage reste lisible à petite taille.

Le fond blanc validé pour Finot reste opaque ; le fichier est RGBA mais son canal alpha est entièrement opaque. Les quatre coins sont exactement `#FFFFFF`.

## Règles spécifiques de la feature graphic

- **1 024×500 px** exactement ;
- JPEG ou PNG 24 bits **sans alpha** ;
- montrer l'univers/valeur de l'application plutôt qu'une simple copie agrandie de l'icône ;
- garder les éléments importants vers le centre ;
- éviter les détails fins et le texte minuscule ;
- aucun prix, classement, promesse invérifiable ni logo officiel de l'Éducation nationale.

## Captures générées par la PR #49

Le script `tools/store-screenshots.mjs` produit, pour téléphone et tablette, les écrans suivants :

1. accueil élève ;
2. matières ;
3. cours illustré ;
4. exercice ;
5. correction ;
6. parcours personnalisé ;
7. lecture ;
8. dictée ;
9. chat Finot ;
10. progression ;
11. espace parents.

Sortie locale : `artifacts/google-play/store-screens/{phone,tablet}/` avec `manifest.json`. Les images lourdes restent non versionnées ; le script, les attentes produit et les tests sont versionnés.

Règles respectées :

- profil **100 % fictif** « Léo », CM1 ;
- aucune vraie donnée d'enfant ;
- barre système en mode démonstration ;
- écrans obtenus via les vraies actions de l'application, pas via une maquette ;
- contrôle automatisé de présence des écrans + test Chromium téléphone/tablette ;
- aucune publication ni envoi réseau ajouté par l'outil.

## Sélection recommandée V1

Priorité téléphone :

1. accueil ;
2. matières ;
3. cours illustré ;
4. exercice/correction ;
5. parcours personnalisé ;
6. lecture ou dictée ;
7. progression ;
8. espace parents.

Le chat Finot ne doit être retenu que lorsque la bulle d'accueil n'est plus coupée en haut sur téléphone.

Pour tablette, retenir la même narration lorsque le rendu tablette apporte une vraie valeur visuelle ; ne pas multiplier des captures presque identiques uniquement pour remplir les huit emplacements.

## Références officielles vérifiées le 02/11/2026

- Play Console Help — **Add preview assets to showcase your app** : icône 512×512 PNG 32 bits ; feature graphic 1024×500 JPEG/PNG 24 bits sans alpha ; captures JPEG/PNG 24 bits sans alpha, 320–3 840 px.
- Play Console Help — **Best practices for your store listing** : cohérence visuelle, texte minimal, éléments importants centrés, aucune revendication de classement/prix non vérifiable.

Revalider les contraintes dans Play Console au moment du dépôt final.
