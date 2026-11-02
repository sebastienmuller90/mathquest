# Finot Académie — Fiche Google Play (français)

Brouillon de textes, **non soumis**. Vérifié le **02/11/2026** contre la version Android V1 `main@ecc99323915bfe17ff4267e8ea0d2bfbf0f88b78`.

Limites Google Play utilisées : nom 30 caractères, description courte 80, description longue 4 000.

## 1. Nom de l'application

`Finot Académie`

## 2. Description courte

```text
Cours, exercices et révisions du CP à la 3e, sans pub, même hors connexion.
```

74 caractères.

## 3. Description longue

```text
Finot Académie accompagne les élèves du CP à la 3e avec des cours détaillés, des exercices interactifs et des révisions qui s'adaptent à leur niveau. Finot, le renard compagnon, les guide pas à pas.

POUR LES ÉLÈVES
• Des cours expliqués simplement, avec des exemples et des illustrations
• Des exercices corrigés pas à pas : indices progressifs et corrections détaillées
• Un diagnostic de départ pour trouver le bon niveau
• Des révisions personnalisées (« 5 minutes intelligentes ») qui reviennent sur les erreurs
• Lecture, dictée et langues vivantes avec lecture à voix haute
• Mathématiques, français, anglais, italien, histoire-géographie et d'autres matières
• Des récompenses (XP, badges) pour encourager la régularité, sans achat intégré
• Un mode adapté aux élèves dys, un thème sombre et la taille de texte du téléphone respectée

POUR LES PARENTS
• Un espace parents protégé par un code : suivi de la progression, réglages et notions travaillées
• Export et import manuels de la progression
• Aucun compte à créer

VOTRE VIE PRIVÉE
• Fonctionne hors connexion : les cours et les exercices sont intégrés à l'application
• Les informations de votre enfant restent sur l'appareil et ne sont pas envoyées à l'éditeur
• Aucune publicité, aucun traceur et aucun achat intégré dans cette version
• Aucune demande d'accès au micro, à la caméra, à la position ni aux contacts

Finot Académie s'appuie sur les programmes de l'école et du collège en France. Application indépendante : elle n'est ni éditée ni cautionnée par le ministère de l'Éducation nationale.
```

## 4. Proposition de valeur pour les visuels

> Un tuteur patient dans la poche : il explique, fait s'entraîner et revient sur ce qui n'est pas encore acquis — sans compte, sans pub, sans connexion obligatoire.

Cette phrase est destinée au travail créatif interne. Toute insertion dans un asset Store devra rester lisible et refléter exactement les fonctions de la V1.

## 5. Positionnement ASO V1

Familles de termes pertinentes à intégrer naturellement dans la fiche, sans bourrage de mots-clés :

- révisions scolaires ;
- exercices scolaires ;
- cours CP, CE1, CE2, CM1, CM2 ;
- collège 6e, 5e, 4e, 3e ;
- maths et français ;
- anglais / italien ;
- aide aux devoirs ;
- apprentissage enfant ;
- révisions hors connexion.

Le titre reste **Finot Académie** : ne pas ajouter de suite de mots-clés au nom de l'application.

## 6. Vérifications de véracité

| Affirmation | Preuve produit |
|---|---|
| Hors connexion | paquet web embarqué dans l'AAB ; recettes Android hors ligne |
| Aucune publicité / traceur / achat intégré V1 | aucun SDK publicitaire/analytics/paiement actif ; `AD_ID` absent |
| Aucun accès micro/caméra/position/contacts | manifeste fusionné : permission applicative `INTERNET` uniquement |
| Informations enfant non envoyées | suivi parent distant désactivé par défaut et aucun backend V1 de production |
| Espace parents protégé | `MQParentGate` + tests/recettes Android |
| Export / import manuels | fonctions de l'espace parents |
| Mode dys, thème sombre, police système | fonctionnalités et tests responsive/accessibilité |
| Lecture à voix haute | moteur TTS du système, FR/EN/IT validés en recette émulateur |
| Indépendance vis-à-vis de l'Éducation nationale | mention explicite, aucun logo officiel |

## 7. À ne pas écrire

- « Suivi à distance », « synchronisation cloud », « compte en ligne » : non disponibles dans la V1 publiée.
- « Conforme au programme officiel » : préférer « s'appuie sur les programmes ».
- « gratuit pour toujours », « n°1 », « meilleur », classement ou récompense non prouvée.
- « validé par l'Éducation nationale » ou « adopté par les enseignants » sans preuve.
- reconnaissance vocale / micro sur Android : absents de cette V1.
- toute fonction prévue mais non encore intégrée au binaire soumis.

## 8. Catégorie et coordonnées

- Catégorie : **Éducation**.
- Public : enfants scolarisés du CP à la 3e et leurs parents ; sélection exacte des tranches à confirmer dans Play Console.
- Coordonnées : `[À COMPLÉTER : E-MAIL PUBLIC ÉDITEUR]`.
- Politique de confidentialité : `[À COMPLÉTER : URL HTTPS PUBLIQUE]`.
- Pays/régions : `[À DÉCIDER AVANT PUBLICATION]`.
