# Finot Académie — Checklist des visuels Google Play

Aucun visuel n'est généré par ce chantier. État : **HUMAN ACTION** pour la création/validation des éléments marqués TODO.
Dimensions selon les consignes Play Console en vigueur au 01/11/2026 (à revérifier au moment du dépôt).

| Élément | Exigence | Quantité | État | Existant dans le dépôt |
|---|---|---|---|---|
| Icône de l'application (Play Store) | PNG 32 bits avec alpha, **512 × 512 px**, ≤ 1 Mo | 1 | TODO | `icon.png` : **512 × 512 px (vérifié), mais en RVB sans canal alpha** (type PNG 2) : à ré-exporter en PNG 32 bits avec alpha pour Play Console. Icônes launcher Android déjà générées (`mipmap-*`) |
| Image de présentation (feature graphic) | PNG ou JPEG 24 bits **sans alpha**, **1 024 × 500 px** | 1 (obligatoire) | TODO | non |
| Captures d'écran téléphone | PNG/JPEG, côté court ≥ 320 px, côté long ≤ 3,3 × côté court (ex. 1 080 × 1 920), format 16:9 ou 9:16 recommandé | **2 minimum, 8 maximum** (6–8 conseillées) | TODO | les captures de recette `artifacts/android-rc/validation/screenshots/` sont des **preuves de test** (avec profil fictif « AVD Test »), pas des visuels commerciaux |
| Captures tablette 7" | idem, 1 080–7 680 px | 4 conseillées (Google les recommande pour être mis en avant sur tablette) | TODO | captures AVD tablette disponibles comme base de composition |
| Captures tablette 10" | idem | 4 conseillées | TODO | idem |
| Vidéo promotionnelle | URL YouTube publique, non monétisée, sans restriction d'âge | 0 ou 1 (facultatif) | NON REQUIS | non |
| Textes | nom ≤ 30, description courte ≤ 80, longue ≤ 4 000 | 1 jeu en français | **READY** (brouillon) | `store-listing-fr.md` |
| Traductions | facultatives | 0 | NON REQUIS V1 | non |

## Écrans à capturer (cohérents avec la fiche)

1. Accueil élève avec progression et « 5 minutes intelligentes » ;
2. Choix des matières ;
3. Cours illustré ;
4. Exercice avec correction animée ;
5. Diagnostic / parcours personnalisé ;
6. Lecture ou dictée ;
7. Chat Finot ;
8. Espace parents (sans code réel visible).

## Règles pour les captures et visuels

- Profil **fictif** uniquement (surnom neutre) ; jamais de vraie donnée d'enfant.
- Pas de barre d'état avec notifications personnelles ; heure et batterie neutres.
- Pas de texte promotionnel mensonger, pas de prix, pas de classement, pas de logo officiel de l'Éducation nationale.
- Les captures doivent refléter l'application réellement installée (pas de maquettes qui promettent des fonctions absentes).
- Pour la Politique Familles : aucune capture ne doit suggérer de publicité ni d'achat.

## Pistes pour produire les captures automatiquement

Le banc local `artifacts/android-rc/validation/harness/avd-suite.mjs` sait lancer l'application sur AVD et prendre des captures
(téléphone et tablette). Un script dédié aux visuels commerciaux (profil fictif propre, états choisis) est un chantier séparé.
