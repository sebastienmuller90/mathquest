# Finot Académie — protocole de validation physique finale

Ce protocole complète la checklist de release. Il ne remplace pas la CI : il couvre uniquement les comportements qu’un navigateur automatisé ne peut pas valider de façon fiable sur un appareil réel.

## 1. iPhone — installation et reprise PWA

Appareil cible prioritaire : iPhone avec Google Chrome.

- [ ] Ouvrir l’application en ligne depuis Chrome.
- [ ] Vérifier qu’aucun écran blanc, chargement bloqué ou erreur visible n’apparaît.
- [ ] Installer / ajouter la PWA selon le parcours iOS disponible.
- [ ] Ouvrir la PWA installée et vérifier que l’accueil s’affiche correctement.
- [ ] Fermer complètement l’application puis la rouvrir.
- [ ] Vérifier que le profil actif et la progression sont conservés.
- [ ] Effectuer un changement de profil, fermer complètement, rouvrir et confirmer que le bon profil reste actif.

## 2. iPhone — vrai démarrage hors ligne

- [ ] Ouvrir l’application une première fois en ligne et attendre la fin du chargement.
- [ ] Fermer complètement l’application.
- [ ] Activer le mode avion / couper Wi-Fi et données cellulaires.
- [ ] Relancer l’application à froid.
- [ ] Vérifier que l’accueil s’ouvre sans page blanche.
- [ ] Ouvrir au moins une matière, un cours déjà mis en cache et un exercice disponible hors ligne.
- [ ] Vérifier qu’aucune donnée locale n’est perdue.
- [ ] Revenir en ligne et vérifier que l’application reprend normalement sans boucle de rechargement.

## 3. Mise à jour PWA réelle

À exécuter lorsqu’une version N+1 est disponible.

- [ ] Ouvrir la version N sur l’iPhone avec un profil existant.
- [ ] Noter le profil actif, XP, pièces, mérite et au moins un devoir / état de progression.
- [ ] Déployer ou rendre disponible la version N+1.
- [ ] Revenir dans l’application et provoquer la mise à jour normale.
- [ ] Fermer puis rouvrir.
- [ ] Vérifier que l’application utilise bien N+1.
- [ ] Vérifier que profil, XP, pièces, mérite, devoirs et progression sont inchangés.
- [ ] Vérifier qu’aucun ancien cache ne provoque un mélange de scripts / interface entre versions.

## 4. Responsive réel — portrait et paysage

### Portrait

- [ ] Accueil : aucun bouton ou texte masqué.
- [ ] Matières : aucune carte coupée.
- [ ] Cours : texte lisible sans débordement horizontal.
- [ ] Exercices : question, réponses et bouton de validation visibles.
- [ ] Correction : explication et bouton suivant accessibles.
- [ ] Espace parent : formulaires et boutons visibles.
- [ ] Récompenses / boutique / paramètres : aucun contrôle hors écran.

### Paysage

- [ ] Tourner l’iPhone pendant l’accueil.
- [ ] Tourner l’iPhone pendant un cours.
- [ ] Tourner l’iPhone pendant un exercice.
- [ ] Tourner l’iPhone lorsqu’un champ de saisie est actif.
- [ ] Vérifier qu’aucun bouton important ne disparaît.
- [ ] Vérifier qu’aucune modale ne devient inaccessible.

## 5. Clavier virtuel iOS

- [ ] Créer un profil et saisir manuellement la date de naissance.
- [ ] Vérifier que le focus reste dans le champ pendant toute la saisie.
- [ ] Vérifier que le clavier ne masque pas le bouton principal de l’étape.
- [ ] Tester une question à réponse texte.
- [ ] Tester une question numérique.
- [ ] Tester un formulaire de devoir parent.
- [ ] Tester une zone de texte longue / note.
- [ ] Vérifier qu’un scroll manuel permet toujours d’atteindre les actions principales.

## 6. Audio réel

Avec le volume de l’iPhone audible :

- [ ] Lettre isolée.
- [ ] Phonème.
- [ ] Syllabe.
- [ ] Mot français.
- [ ] Phrase française.
- [ ] Consigne audio d’anglais primaire.
- [ ] Anglais collège.
- [ ] Italien collège.
- [ ] Dictée.
- [ ] Vérifier qu’une question demandant de traduire / écrire une réponse ne prononce pas directement cette réponse.
- [ ] Vérifier que la langue / voix utilisée correspond bien au contenu.

## 7. Dictée iOS

- [ ] Lancer une dictée.
- [ ] Utiliser le clavier iOS normalement.
- [ ] Tester aussi la dictée vocale iOS si disponible.
- [ ] Faire une erreur légère et vérifier la correction progressive.
- [ ] Faire une réponse correcte au second essai si le parcours le permet.
- [ ] Vérifier qu’aucune correction n’est appliquée deux fois.
- [ ] Vérifier que le clavier peut être fermé et rouvert sans bloquer l’exercice.

## 8. Accessibilité et taille du texte

### Taille du texte

- [ ] Augmenter la taille du texte dans les réglages iOS.
- [ ] Vérifier accueil, cours, exercice, correction, parent et paramètres.
- [ ] Aucun bouton essentiel ne doit devenir inaccessible.

### VoiceOver

- [ ] Activer VoiceOver.
- [ ] Naviguer dans l’accueil.
- [ ] Identifier une matière.
- [ ] Ouvrir un cours.
- [ ] Parcourir une question et ses réponses.
- [ ] Vérifier qu’un bouton important annonce une action compréhensible.
- [ ] Vérifier les champs du code parent et les formulaires de devoirs.
- [ ] Vérifier qu’aucun contrôle principal n’est annoncé uniquement comme « bouton » sans contexte.

## 9. Mode DYS / lecture facilitée

- [ ] Activer le mode DYS / lecture facilitée.
- [ ] Vérifier un cours long.
- [ ] Vérifier un exercice.
- [ ] Vérifier une correction.
- [ ] Vérifier le carnet d’erreurs.
- [ ] Vérifier l’espace parent.
- [ ] Confirmer que le mode reste actif après fermeture / réouverture.

## 10. Parcours enfant réel — primaire

Effectuer au minimum un parcours CP/CE1 et un parcours CM1/CM2.

- [ ] L’enfant comprend seul comment démarrer.
- [ ] Il sait lancer l’audio quand nécessaire.
- [ ] Il sait sélectionner une matière / activité.
- [ ] Il comprend la validation d’une réponse.
- [ ] Il comprend une correction après erreur.
- [ ] Les aides n’offrent pas directement la réponse.
- [ ] Une séance complète peut être terminée sans intervention technique d’un adulte.

## 11. Parcours enfant réel — collège

Effectuer au minimum un parcours 6e et un parcours 3e.

- [ ] Navigation claire.
- [ ] Niveau de langage adapté.
- [ ] Présentation pas trop infantile en 3e.
- [ ] Compréhension de la progression / maîtrise.
- [ ] Compréhension des corrections.
- [ ] Exercices suffisamment variés pour ne pas donner l’impression d’une répétition immédiate.

## 12. Parcours parent réel

- [ ] Ouvrir l’espace parent depuis un profil enfant.
- [ ] Créer / saisir le code parent.
- [ ] Créer un devoir.
- [ ] Fermer l’espace parent.
- [ ] Depuis le mode enfant, marquer le devoir comme terminé.
- [ ] Revenir dans l’espace parent et valider le devoir.
- [ ] Vérifier visuellement le gain réel affiché.
- [ ] Revenir ensuite sur le même devoir et confirmer qu’aucune double récompense n’est possible.
- [ ] Basculer sur un second enfant : le devoir du premier ne doit pas apparaître.
- [ ] Vérifier le bilan hebdomadaire de chaque enfant.
- [ ] Faire plusieurs allers-retours entre profils et confirmer l’absence de mélange de données.

## 13. Contrôle visuel PC réel

À faire au minimum sur un écran desktop courant.

- [ ] Onboarding complet avec saisie clavier.
- [ ] Accueil / matières / cours / exercices.
- [ ] Fenêtres et cartes correctement centrées.
- [ ] Aucun élément excessivement étiré sur grande largeur.
- [ ] Navigation clavier Tab utilisable.
- [ ] Focus visible.
- [ ] Espace parent lisible.
- [ ] Mode sombre lisible.
- [ ] Mode DYS lisible.

## 14. Critère de réussite physique

La validation physique est considérée réussie uniquement si :

1. aucun P1 ou P2 n’est trouvé ;
2. aucune perte de progression ou de profil n’est observée ;
3. la PWA démarre réellement hors ligne sur l’iPhone ;
4. une mise à jour conserve toutes les données existantes ;
5. audio et dictée sont réellement utilisables ;
6. clavier virtuel, portrait et paysage restent utilisables ;
7. VoiceOver permet les actions principales ;
8. un parcours primaire, un parcours collège et un parcours parent sont terminés avec succès.

Toute anomalie trouvée doit être notée avec : appareil, version iOS, navigateur / mode PWA, écran concerné, étapes de reproduction, résultat obtenu et résultat attendu.
