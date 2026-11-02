# Finot Académie — Checklist des visuels Google Play

État vérifié le **02/11/2026** après fusion de la PR #47 et revue de la Draft PR #49 (`a74323bcc9e21ef0d3505a58957749442fe8a89a`). Les exigences externes ci-dessous ont été contrôlées contre la documentation officielle Google Play le même jour.

| Élément | Exigence | Quantité | État | Situation Finot Académie |
|---|---|---:|---|---|
| Icône launcher Android couleur | ressources adaptatives/héritées dans l'APK/AAB | — | **READY** | PR #47 fusionnée : Finot orange sur fond blanc, ressources `mipmap-*` mises à jour |
| Icône monochrome Android 13+ | couche monochrome d'adaptive icon | — | **READY DANS PR #49** | ajoutée sans toucher à la couleur ; générateur reproductible `tools/make-monochrome-icon.ps1` ; test dédié |
| Icône Play Store | PNG **32 bits**, canal alpha, **512×512 px**, sRGB, ≤ **1 024 Ko**, carré plein ; ne pas pré-arrondir ni ajouter d'ombre externe | 1 | **READY HORS DÉPÔT** | `finot_academie_google_play_icon_512.png` : 512×512 RGBA, 340 971 octets |
| Image de présentation (feature graphic) | JPEG ou PNG **24 bits sans alpha**, **1 024×500 px** | 1 | **TODO** | à créer/valider ; éviter de simplement dupliquer l'icône |
| Captures téléphone | PNG/JPEG conforme Play Console ; viser 9:16 cohérent | 2 minimum, 8 maximum | **READY DANS PR #49 / PNG hors Git** | outil reproductible AVD ; 11 écrans disponibles avec profil fictif « Léo » |
| Captures tablette | PNG/JPEG conforme Play Console | série recommandée | **READY DANS PR #49 / PNG hors Git** | même outil, sortie tablette dédiée |
| Vidéo promotionnelle | URL YouTube publique, facultative | 0 ou 1 | NON REQUIS V1 | non prévue |
| Textes Store FR | nom ≤ 30, courte ≤ 80, longue ≤ 4 000 | 1 jeu | **READY** (brouillon) | `store-listing-fr.md` |
| Traductions | facultatives | 0 | NON REQUIS V1 | français uniquement pour la première soumission |

## Règles spécifiques de l'icône Play Store

Google Play traite l'icône Store séparément de l'icône launcher Android :

- taille finale **512×512** ;
- **PNG 32 bits** ;
- espace couleur **sRGB** ;
- taille maximale **1 024 Ko** ;
- asset **carré plein** : ne pas arrondir les coins ;
- aucune ombre portée externe : Google Play ajoute son propre traitement ;
- pas de badge, classement, prix, mention « n°1 », catégorie Play ou autre élément susceptible d'induire en erreur ;
- pour une illustration comme Finot, utiliser suffisamment l'espace disponible pour que le visage reste lisible à petite taille.

Le fond blanc validé pour Finot peut rester opaque : la contrainte « PNG 32 bits avec canal alpha » concerne le format du fichier ; elle n'impose pas de rendre le fond transparent.

## Règles spécifiques de la feature graphic

- **1 024×500 px** exactement ;
- JPEG ou PNG 24 bits **sans alpha** ;
- montrer l'univers/valeur de l'application plutôt qu'une simple copie agrandie de l'icône ;
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

Sortie : `artifacts/google-play/store-screens/{phone,tablet}/` avec `manifest.json`. Les images lourdes restent non versionnées ; le script, les attentes produit et les tests sont versionnés.

Règles respectées :

- profil **100 % fictif** « Léo », CM1 ;
- aucune vraie donnée d'enfant ;
- barre système en mode démonstration (heure neutre, batterie pleine, pas de notification) ;
- écrans obtenus via les vraies actions de l'application, pas via une maquette ;
- contrôle automatisé de présence des écrans + test Chromium téléphone/tablette ;
- aucune publication ni envoi réseau ajouté par l'outil.

## Point visuel à revoir avant sélection finale

La capture téléphone du chat Finot montre encore la bulle d'accueil partiellement coupée en haut. Le produit reste utilisable et la CI est verte, mais cette capture ne doit pas être retenue telle quelle comme visuel Store si une meilleure composition peut être obtenue sans modifier le produit.

## Références officielles vérifiées le 02/11/2026

- Android Developers — Google Play icon design specifications.
- Play Console Help — Add preview assets to showcase your app.

Revalider les contraintes dans Play Console au moment du dépôt final.
