# Scénarios de test

Rédigés le 09/11/2026 à partir des écrans et libellés du code (`index.html`, `js/`). Si un libellé réel diffère légèrement sur votre appareil, notez-le en remarque : ce n'est pas une erreur de votre part.

Pour chaque scénario, cochez **OK**, **KO** (comportement différent de l'attendu) ou notez une **Remarque**. En cas de KO, remplissez une fiche ([04-recueil-anomalies.md](04-recueil-anomalies.md)). Utilisez un **profil fictif** (prénom ou pseudonyme inventé).

Navigation principale (barre du bas) : **Accueil**, **Matières**, **Progrès**, **Plus**.

| ID | Objectif | Étapes | Résultat attendu | OK / KO / Remarque |
|---|---|---|---|---|
| S01 | Première ouverture et profil enfant | Ouvrir l'appli après installation. Parcourir l'assistant « Créons ton profil » (7 étapes, « Étape 1 sur 7 »…) : prénom ou pseudo, fille/garçon, date de naissance (facultative), école primaire ou collège puis classe, compagnon, ressenti, objectifs et rythme. Terminer par « Créer mon parcours ». | « Continuer » reste grisé tant que l'étape est incomplète ; un message de bienvenue apparaît ; l'appli ne demande ni compte ni mot de passe. | ☐ OK ☐ KO — |
| S02 | Choix de niveau / classe | À l'étape « Où en es-tu cette année ? », choisir « École primaire » (CP à CM2) ou « Collège » (6e à 3e), puis une classe. Observer le « Diagnostic de départ » proposé ensuite. | Seules les matières de la classe choisie apparaissent ; le diagnostic se lance et se termine. | ☐ OK ☐ KO — |
| S03 | Porte adulte et création du code parent | Onglet **Plus**, ouvrir l'Espace parents. Résoudre le calcul (« Un adulte est-il présent ? »), puis créer un code de 4 à 8 chiffres et le confirmer. Noter le code de secours affiché. | Le code est refusé s'il est mal confirmé ; le code de secours s'affiche une fois (« C'est noté, continuer ») ; l'Espace parents s'ouvre. | ☐ OK ☐ KO — |
| S04 | Code parent erroné / verrou | Quitter l'Espace parents, y revenir et saisir un mauvais code plusieurs fois. | Message « Code parent incorrect » ; après plusieurs échecs, un message de verrouillage temporaire apparaît. | ☐ OK ☐ KO — |
| S05 | Cours | Onglet **Matières**, choisir une matière puis un chapitre, ouvrir le cours. Lire, utiliser « Écouter » si présent. | Le cours est lisible, complet, sans texte coupé ni caractères étranges. | ☐ OK ☐ KO — |
| S06 | Exercices : bonne réponse | Lancer un exercice, répondre correctement. | Feedback positif, passage à la question suivante, points/étoiles comptabilisés. | ☐ OK ☐ KO — |
| S07 | Exercices : mauvaise réponse | Répondre faux volontairement. | La correction est expliquée clairement ; aucune pénalité incohérente ; la question est comprise. | ☐ OK ☐ KO — |
| S08 | Indices | Dans un exercice, appuyer sur « Indice ». | Un indice guide sans donner la réponse ; mention indiquant que les XP sont divisés par 2 pour cette question. | ☐ OK ☐ KO — |
| S09 | Dictée | Lancer une dictée (français). Écouter la phrase (🔊), l'écrire, valider. | Le score est analysé mot à mot (accents, accords) ; le résultat est compréhensible. Noter si le son ne se déclenche pas. | ☐ OK ☐ KO — |
| S10 | Lecture à voix haute | Dans un cours ou une question, utiliser « Écouter » / 🔊 (voix de l'appareil). | La voix lit le texte en français, peut être relancée, sans blocage. | ☐ OK ☐ KO — |
| S11 | Finot (chat) | Ouvrir « Parler à Finot » ; poser une question dans « Pose ta question… » (ex. une règle de grammaire, « dictée »). | Réponse en français, adaptée à la question, sans réponse hors sujet inquiétante. Aucune saisie de donnée personnelle demandée. | ☐ OK ☐ KO — |
| S12 | Progression et récompenses | Après quelques exercices, ouvrir **Progrès**, les badges, « Mes récompenses » (bons points). | Les compteurs reflètent le travail réalisé ; la liste des récompenses s'affiche ; rien n'est incohérent. | ☐ OK ☐ KO — |
| S13 | Espace Parents | Déverrouiller l'Espace parents avec le code. Parcourir les onglets **Suivi**, **Programme**, **Récompenses**, **Réglages**. | Les onglets s'affichent ; les informations correspondent au profil testé ; les réglages se modifient. | ☐ OK ☐ KO — |
| S14 | Changement de profil | Créer un second profil (« Nouveau profil » via « Profils enfants » ou « Changer d'enfant »), basculer entre les deux. | Chaque profil garde sa propre progression ; aucun mélange de données. | ☐ OK ☐ KO — |
| S15 | Rotation d'écran | Faire pivoter l'appareil en plein exercice (si l'appareil l'autorise). | La mise en page s'adapte, la réponse saisie n'est pas perdue. | ☐ OK ☐ KO — |
| S16 | Mode avion | Activer le mode avion, ouvrir l'appli, parcourir un cours et un exercice. | L'appli fonctionne hors connexion pour le contenu déjà installé ; aucun message d'erreur bloquant. | ☐ OK ☐ KO — |
| S17 | Reprise après fermeture forcée | En plein exercice, fermer l'appli depuis le gestionnaire d'applications, puis la rouvrir. | Profil et progression conservés ; l'appli redémarre sans plantage. | ☐ OK ☐ KO — |
| S18 | Mise à jour de l'appli | Quand une nouvelle version est publiée sur la piste de test, mettre à jour via le Play Store ; observer l'éventuel bandeau « Nouvelle version disponible ». | Le profil et la progression sont conservés après mise à jour ; le numéro de version change (Plus). | ☐ OK ☐ KO ☐ Non testé |
| S19 | Petit écran / tablette | Tester sur un petit téléphone et/ou une tablette. | Aucun bouton coupé ou inaccessible ; la barre de navigation reste utilisable. | ☐ OK ☐ KO — |
| S20 | Grande police | Android : Réglages > Affichage > Taille de la police (maximale). Rouvrir l'appli. | Les textes restent lisibles, les libellés de la barre du bas ne se chevauchent pas. | ☐ OK ☐ KO — |
| S21 | Mode DYS / confort de lecture | Activer le mode de confort de lecture (réglage par profil, voir « Plus » ou Espace parents > Réglages). | Le texte devient plus lisible ; l'option se désactive correctement. | ☐ OK ☐ KO ☐ Introuvable |
| S22 | Accessibilité : TalkBack basique | Activer TalkBack, parcourir l'accueil et un exercice. | Les boutons principaux sont annoncés de façon compréhensible ; on peut valider une réponse. | ☐ OK ☐ KO — |
| S23 | Accessibilité : contraste | Observer les écrans en plein jour / luminosité basse. | Textes et boutons restent distinguables. | ☐ OK ☐ KO — |
| S24 | Performance perçue | Noter le temps de démarrage à froid, la fluidité du défilement et le passage entre écrans. | Démarrage et navigation sans attente anormale ; indiquer le modèle de l'appareil. | ☐ OK ☐ KO — |
| S25 | Version visible | Onglet **Plus** : repérer la ligne « Version … ». | Un numéro de version est affiché ; notez-le dans toute fiche d'anomalie. | ☐ OK ☐ KO — |

## Rythme conseillé

- **Séance 1** (jour 1) : S01 à S08, S25.
- **Séance 2** (autour du jour 4 à 7) : S09 à S14, S21.
- **Séance 3** (autour du jour 10 à 14) : S15 à S20, S22 à S24 ; S18 dès qu'une mise à jour est proposée.
