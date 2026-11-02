# Finot Académie — Fiche Google Play (français)

Brouillon de textes, **non soumis**. Chaque affirmation a été vérifiée dans la version Android V1 (`main@4f9444d`). Limites Google Play :
nom 30 caractères, description courte 80, description longue 4 000.

## 1. Nom de l'application

`Finot Académie` (15 caractères)

## 2. Description courte (80 caractères maximum)

```
Cours, exercices et révisions du CP à la 3e, sans pub, même hors connexion.
```

(74 caractères.)

## 3. Description longue

```
Finot Académie accompagne les élèves du CP à la 3e avec des cours détaillés, des exercices interactifs et des révisions qui s'adaptent à leur niveau. Finot, le renard compagnon, les guide pas à pas.

POUR LES ÉLÈVES
• Des cours expliqués simplement, avec des exemples et des illustrations
• Des exercices corrigés pas à pas : indices progressifs, correction animée des opérations posées
• Un diagnostic de départ pour trouver le bon niveau
• Des révisions personnalisées (« 5 minutes intelligentes ») qui reviennent sur les erreurs
• Lecture, dictée et langues vivantes avec lecture à voix haute
• Mathématiques, français, anglais, italien, histoire-géographie et d'autres matières
• Des récompenses (XP, badges) pour encourager la régularité, sans aucun achat
• Un mode adapté aux élèves dys, un thème sombre, la taille de texte du téléphone respectée

POUR LES PARENTS
• Un espace parents protégé par un code : suivi de la progression, réglages, notions travaillées
• Export et import manuels de la progression
• Aucun compte à créer

VOTRE VIE PRIVÉE
• Fonctionne hors connexion : les cours et les exercices sont dans l'application
• Les informations de votre enfant restent sur l'appareil et ne sont pas envoyées
• Aucune publicité, aucun traceur, aucun achat intégré
• Aucune demande d'accès au micro, à la caméra, à la position ni aux contacts

Finot Académie s'appuie sur les programmes de l'école et du collège en France. Application indépendante : elle n'est ni éditée ni cautionnée par le ministère de l'Éducation nationale.
```

(≈ 1 700 caractères.)

## 4. Proposition de valeur (usage interne, pour les visuels)

« Un tuteur patient dans la poche : il explique, fait s'entraîner et revient sur ce qui n'est pas encore acquis — sans compte, sans pub,
sans connexion obligatoire. »

## 5. Vérifications de véracité (à garder pour la revue)

| Affirmation de la fiche | Preuve |
|---|---|
| Hors connexion | paquet web embarqué dans l'AAB ; recette émulateur en mode avion (PASS sur 3 AVD) |
| Aucune publicité / traceur / achat | aucun SDK ; `AD_ID` retiré ; `js/entitlements.js` sans fournisseur |
| Aucun accès micro/caméra/position/contacts | manifeste fusionné : `INTERNET` seule |
| Les informations restent sur l'appareil | seul `fetch` applicatif = suivi parent distant, désactivé |
| Espace parents protégé par un code | `MQParentGate`, test PIN en recette |
| Export / import manuels | actions `export` / `import` de l'espace parents |
| Mode dys, thème sombre, police du téléphone | `mq-dys-*`, `prefers-color-scheme`, PR #45 (police 200 %) |
| Lecture à voix haute | moteur TTS du système (FR/EN/IT validés sur émulateurs) |
| « Pas de suivi parent en ligne » | volontairement **non annoncé** : désactivé dans cette version |
| Indépendance vis-à-vis de l'Éducation nationale | mention explicite, pas de logo officiel |

## 6. À ne PAS écrire (promesses interdites ou non vérifiées)

- « Suivi à distance », « synchronisation », « compte » : non disponibles en V1.
- « Conforme au programme officiel » sans nuance : écrire « s'appuie sur ».
- « Prix », « n°1 », « gratuit pour toujours », « meilleur » : pas de claim non prouvable.
- « Adopté par les enseignants », « validé par l'Éducation nationale » : faux.
- Toute mention de reconnaissance vocale / micro : absente sur Android.

## 7. Catégorie et coordonnées (Play Console)

- Catégorie : **Éducation**. Étiquettes suggérées : éducation, apprentissage, école primaire, collège.
- Coordonnées : `[À COMPLÉTER : e-mail de contact public]` (obligatoire), site web et téléphone facultatifs.
- Politique de confidentialité : `[À COMPLÉTER : URL HTTPS]` (voir `privacy-policy-draft.md`).
