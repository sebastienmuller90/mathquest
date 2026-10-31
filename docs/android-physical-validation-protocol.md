# Finot Académie — protocole de validation physique Android V1

Date : 2026-10-31

Ce protocole ne remplace pas la CI. Il valide uniquement ce qu'un émulateur/runner GitHub ne peut pas prouver : rendu réel, clavier, voix installées, TalkBack, persistance appareil et comportement de mise à jour.

## Règle d'exécution

- Un seul test à la fois.
- Ne pas enchaîner au test suivant tant que le précédent n'est pas marqué PASS ou diagnostiqué.
- Pour chaque anomalie : appareil, version Android, navigateur/WebView, build, orientation, étapes exactes, attendu/obtenu.
- Ne jamais réinitialiser les données entre deux tests sauf si le protocole le demande explicitement.

## Pré-requis

- APK debug/candidate issu de la CI `Finot Multistore Android`.
- Package de validation utilisant l'identifiant de développement, pas le package ID Store définitif.
- Téléphone Android réel connecté au Wi-Fi.
- Volume média audible.
- Aucun compte enfant réel nécessaire : utiliser uniquement des profils fictifs.

## Test A1 — installation APK

Action : installer l'APK de validation sur un téléphone Android qui ne possède pas Finot.

PASS :
- installation terminée sans avertissement technique propre à l'application ;
- icône Finot correcte ;
- nom affiché `Finot Académie`.

## Test A2 — premier lancement

Action : ouvrir l'application depuis le launcher.

PASS :
- splash Finot ;
- aucun écran blanc ;
- aucune erreur WebView ;
- onboarding chargé ;
- pas de permission microphone demandée ;
- pas de permission publicitaire/localisation/fichiers demandée.

## Test A3 — création d'un profil fictif

Action : créer un profil élève fictif depuis le clavier Android.

PASS :
- prénom/date/classe saisissables ;
- focus stable ;
- clavier ne masque pas définitivement l'action principale ;
- profil créé et écran d'accueil utilisable.

## Test A4 — fermeture et reprise

Action : fermer complètement l'application puis la rouvrir.

PASS :
- même profil actif ;
- progression/données conservées ;
- aucun onboarding recommencé.

## Test A5 — démarrage à froid hors ligne

Action : ouvrir une première fois en ligne, fermer complètement, activer mode avion, relancer.

PASS :
- application démarre ;
- accueil disponible ;
- contenu embarqué accessible ;
- aucun écran blanc/boucle de chargement ;
- données du profil conservées.

## Test A6 — retour en ligne

Action : depuis l'app lancée hors ligne, réactiver Internet.

PASS :
- aucune boucle de reload ;
- navigation normale ;
- aucune tentative de sync distante si aucun backend n'est configuré.

## Test A7 — bouton Retour Android

Action : ouvrir matière → cours/exercice puis utiliser plusieurs fois le bouton/gesture Retour système.

PASS :
- navigation cohérente ;
- aucune fermeture brutale depuis un sous-écran ;
- aucun état pédagogique corrompu.

## Test A8 — rotation

Action : accueil, cours puis exercice ; passer portrait ↔ paysage.

PASS :
- pas de redémarrage de l'activité ;
- état courant conservé ;
- aucune action importante inaccessible ;
- pas de contenu coupé durablement.

## Test A9 — clavier virtuel

Action : tester champ texte, réponse numérique, devoir parent et champ long.

PASS :
- saisie complète ;
- action de validation atteignable ;
- scroll manuel possible jusqu'aux boutons ;
- aucune perte de focus anormale.

## Test A10 — prononciation Android sans reconnaissance vocale

Action : ouvrir une activité qui utilise normalement la prononciation sur le Web.

PASS :
- aucun faux bouton microphone ;
- aucune demande RECORD_AUDIO ;
- alternative claire de type « écoute le modèle puis répète à voix haute » ;
- activité terminable sans reconnaissance automatique.

## Test A11 — TTS français

Action : déclencher une lecture française.

PASS : voix française intelligible et fonctionnelle sur l'appareil.

## Test A12 — TTS anglais

Action : déclencher une lecture anglaise.

PASS : voix/langue anglaise correcte ; pas de lecture française d'un contenu anglais.

## Test A13 — TTS italien

Action : déclencher une lecture italienne.

PASS : voix/langue italienne correcte ; absence de blocage si plusieurs moteurs sont installés.

## Test A14 — liens côté enfant

Action : parcourir les crédits/ressources visibles depuis un écran enfant et tenter d'ouvrir un lien externe disponible.

PASS : aucune navigation externe non autorisée depuis l'espace enfant.

## Test A15 — liens côté parent

Action : entrer réellement dans l'espace parents puis ouvrir un lien externe autorisé.

PASS : ouverture contrôlée dans le navigateur externe ; le parent gate doit être réellement actif/visible.

## Test A16 — thème sombre

Action : activer le thème sombre et parcourir accueil, cours, exercice, correction, parent.

PASS : lisibilité et contrastes corrects ; aucun écran illisible.

## Test A17 — TalkBack

Action : activer TalkBack et parcourir accueil → matière → cours → question → réponse, puis espace parent.

PASS :
- actions principales nommées ;
- ordre de focus utilisable ;
- boutons sans contexte évités ;
- champs parent compréhensibles.

## Test A18 — mise à jour APK

Préparer deux builds de validation avec versionCode croissant.

Action : installer N, créer/modifier un profil, puis installer N+1 par-dessus sans désinstaller.

PASS :
- installation de mise à jour réussie ;
- profil/progression/XP/pièces/devoirs conservés ;
- nouvelle version active.

## Test A19 — suppression de profil

Action : depuis un jeu de plusieurs profils fictifs, supprimer un profil selon le parcours prévu.

PASS :
- profil disparu ;
- autres profils intacts ;
- aucune restauration involontaire ;
- aucune copie cachée non documentée du profil supprimé.

## Test A20 — absence de restauration Android automatique

Action : avec données fictives, désinstaller complètement puis réinstaller le même package.

PASS :
- les anciennes données enfant ne réapparaissent pas automatiquement via Android Backup/device transfer ;
- une éventuelle restauration future doit passer uniquement par le mécanisme parent explicite de Finot.

## Test A21 — tablette Android

Action : répéter lancement, rotation, clavier, cours et exercice sur une vraie tablette Android.

PASS : responsive utilisable et aucune action inaccessible.

## Test A22 — Samsung réel

Action : exécuter au minimum A1, A5, A8, A9, A11-A13, A17-A20 sur un appareil Samsung.

PASS : aucun comportement spécifique Samsung bloquant.

## Test A23 — Fire HD (après Google/Samsung)

Statut : différé.

Action future : sideload du même APK sur Fire Tablet compatible.

Vérifier WebView, TTS FR/EN/IT, offline, clavier, rotation, stockage/persistance et absence de dépendance Google obligatoire.

Ce test détermine le GO/NO-GO Amazon Fire ; aucune validation Fire ne doit être déclarée sans appareil réel.

## Gate physique V1

La candidate Store est considérée physiquement validée uniquement si :

- aucun P0/P1 appareil ouvert ;
- A1→A20 PASS sur au moins un téléphone Android réel ;
- A21 PASS sur tablette si distribution tablette activée ;
- A22 PASS avant Samsung Galaxy Store ;
- A23 uniquement avant une éventuelle publication Amazon Fire.
