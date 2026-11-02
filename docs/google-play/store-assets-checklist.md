# Finot Académie — Checklist des visuels Google Play

État vérifié le **02/11/2026** après fusion de la PR #47. Les exigences externes ci-dessous ont été contrôlées contre la documentation officielle Google Play le même jour.

| Élément | Exigence | Quantité | État | Situation Finot Académie |
|---|---|---:|---|---|
| Icône launcher Android | ressources adaptatives/héritées dans l'APK/AAB | — | **READY** | PR #47 fusionnée : Finot orange sur fond blanc, ressources `mipmap-*` mises à jour |
| Icône Play Store | PNG **32 bits**, canal alpha, **512×512 px**, sRGB, ≤ **1 024 Ko**, carré plein ; ne pas pré-arrondir ni ajouter d'ombre externe | 1 | **READY HORS DÉPÔT** après export technique final | distincte de l'icône launcher ; Google Play applique lui-même masque arrondi et ombre |
| Image de présentation (feature graphic) | JPEG ou PNG **24 bits sans alpha**, **1 024×500 px** | 1 | **TODO** | à créer/valider ; éviter de simplement dupliquer l'icône |
| Captures téléphone | PNG/JPEG conforme Play Console ; viser 9:16 cohérent | 2 minimum, 8 maximum | **EN COURS côté Claude** | génération automatisée depuis AVD avec profil fictif |
| Captures tablette | PNG/JPEG conforme Play Console | série recommandée | **EN COURS côté Claude** | génération automatisée depuis AVD tablette |
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

## Écrans à capturer

Ordre recommandé pour la série commerciale :

1. Accueil élève avec progression et « 5 minutes intelligentes » ;
2. Choix des matières ;
3. Cours illustré ;
4. Exercice avec correction ;
5. Diagnostic / parcours personnalisé ;
6. Lecture ou dictée ;
7. Chat Finot ;
8. Espace parents (sans code réel visible).

## Règles pour les captures

- profil **100 % fictif** ;
- aucune vraie donnée d'enfant ;
- aucune notification personnelle ;
- heure/batterie neutres si la barre système est visible ;
- pas de fonction inventée ou de maquette trompeuse : les écrans doivent provenir de l'application réellement installée ;
- aucune publicité ni achat suggéré ;
- cohérence graphique entre téléphone et tablette ;
- privilégier une progression visuelle : découverte → apprentissage → exercice → accompagnement → suivi parent.

## Production automatisée

Le banc Android du dépôt peut piloter les AVD et réaliser des captures. Claude travaille sur un script Store reproductible séparé des preuves de recette afin d'obtenir des visuels propres, avec état fictif déterministe.

Les fichiers commerciaux lourds peuvent rester hors Git ; le **script reproductible**, les conventions de nommage et la liste des écrans doivent être versionnés.

## Références officielles vérifiées le 02/11/2026

- Android Developers — Google Play icon design specifications.
- Play Console Help — Add preview assets to showcase your app.

Revalider les contraintes dans Play Console au moment du dépôt final.
