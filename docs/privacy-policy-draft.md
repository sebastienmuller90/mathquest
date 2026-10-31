# Finot Académie — politique de confidentialité (DRAFT)

**Statut : brouillon de travail — ne pas publier en l’état.**  
Ce texte doit être finalisé après audit Supabase, définition de la rétention, identité du responsable de traitement, adresse de contact et validation du runtime Android final.

Dernière base technique auditée : `main` @ `05b4c0ce21bd78a9027367d1219e660ec86f7bda`.

---

## 1. Objet

Finot Académie est une application éducative destinée aux élèves du CP à la 3e. Elle propose des cours, exercices, révisions, activités de lecture, dictée, langues et outils de suivi de progression.

La protection des données des enfants est une priorité. Finot Académie vise à collecter et transmettre uniquement les données nécessaires à son fonctionnement.

## 2. Responsable du traitement

**À compléter avant publication :**

- Nom / entité : `[À COMPLÉTER]`
- Adresse : `[À COMPLÉTER]`
- Email confidentialité : `[À COMPLÉTER]`
- Email support : `[À COMPLÉTER]`

Aucune publication Store ne doit avoir lieu tant que ces informations ne sont pas exactes.

## 3. Données utilisées localement sur l’appareil

Finot Académie peut conserver localement sur l’appareil :

- prénom ou pseudonyme de l’élève ;
- classe ;
- genre déclaré ;
- date de naissance facultative ;
- choix de compagnon et préférences d’interface ;
- objectifs et préférences d’apprentissage ;
- progression ;
- résultats aux exercices ;
- cours terminés ;
- niveaux de maîtrise ;
- erreurs et révisions ;
- statistiques de travail ;
- progression en lecture ;
- XP, badges et autres éléments de progression ludique ;
- paramètres de son, thème et accessibilité ;
- devoirs et récompenses familiales lorsqu’ils sont utilisés.

Ces données permettent de personnaliser le parcours pédagogique et de reprendre le travail après fermeture de l’application.

## 4. Date de naissance

La date de naissance est facultative.

Dans la version auditée, elle sert notamment à calculer l’âge localement et à personnaliser certains messages, comme l’anniversaire.

**Décision de release :** la date de naissance complète ne doit pas être transmise au serveur dans la version Store finale si une information moins précise suffit.

## 5. Suivi parent à distance

Finot Académie peut proposer un suivi parent à distance facultatif.

Cette fonction n’est activée que volontairement depuis l’espace parent de l’application.

Lorsqu’elle est activée, certaines informations de progression peuvent être synchronisées avec un service distant afin que le parent puisse consulter le suivi et envoyer certaines actions à l’application de l’enfant.

### Données prévues pour la version finale

Le payload distant final doit être limité aux informations nécessaires au suivi parent, par exemple :

- pseudonyme/prénom affiché ;
- classe ;
- progression utile ;
- cours terminés ;
- scores et maîtrise agrégés ;
- révisions dues ;
- temps de travail agrégé ;
- devoirs et actions parent nécessaires ;
- éléments de récompense familiale nécessaires ;
- date/heure de dernière synchronisation.

### Données qui ne doivent pas être transmises inutilement

- date de naissance complète ;
- secrets/PIN ;
- recovery code ;
- préférences purement visuelles ;
- enregistrements audio ;
- transcription vocale brute ;
- identifiant publicitaire ;
- localisation ;
- contacts ;
- photos ou vidéos personnelles.

## 6. Hébergement et Supabase

La version auditée utilise Supabase pour le suivi parent à distance.

**À compléter avant publication :**

- région d’hébergement effective ;
- sous-traitant juridique exact ;
- DPA applicable ;
- transferts éventuels hors UE ;
- durée de conservation ;
- politiques RLS/RPC auditées ;
- mécanisme de suppression définitive ;
- gestion des sauvegardes et logs.

Le frontend utilise une clé Supabase `publishable`. Cette clé n’est pas considérée comme un secret serveur ; la sécurité doit reposer sur les contrôles d’accès côté backend.

## 7. Microphone et reconnaissance vocale

Certaines activités de langues peuvent proposer une fonction de prononciation utilisant le microphone.

Cette fonction :

- démarre uniquement après une action explicite de l’utilisateur ;
- n’écoute pas en arrière-plan ;
- utilise la reconnaissance vocale fournie par le navigateur ou le système ;
- récupère une transcription afin de comparer la prononciation avec une phrase cible ;
- affiche temporairement la transcription reconnue et un score pédagogique.

Dans le code audité, Finot Académie ne stocke pas explicitement l’enregistrement audio et ne transmet pas explicitement la transcription à Supabase.

Cependant, le moteur de reconnaissance vocale de la plateforme peut traiter la voix via des services du fournisseur du navigateur ou du système. Le comportement exact doit être vérifié pour chaque runtime distribué.

Si ce traitement ne peut pas être documenté de façon conforme pour la version Android finale, la fonction de reconnaissance vocale devra être désactivée dans cette version plutôt que de collecter des données enfant de manière incertaine.

## 8. Synthèse vocale

Finot Académie utilise la synthèse vocale du navigateur ou du système pour lire des contenus pédagogiques.

Selon l’appareil, certaines voix peuvent être locales et d’autres peuvent dépendre d’un service en ligne fourni par la plateforme.

Finot Académie ne crée pas d’enregistrement de la voix de l’enfant pour cette fonction de simple lecture.

## 9. Publicité

Finot Académie V1 ne prévoit :

- aucune publicité ciblée enfant ;
- aucun SDK publicitaire ;
- aucun identifiant publicitaire ;
- aucun profilage publicitaire.

Toute évolution future sur ce point nécessiterait une nouvelle analyse de conformité avant activation.

## 10. Analytics

La version auditée ne possède pas encore de couche analytics produit validée pour la V1 Store.

Si des analytics sont ajoutés, ils devront être privacy-first et exclure notamment :

- prénom/nom ;
- date de naissance ;
- texte libre enfant ;
- réponses scolaires brutes ;
- contenu audio ;
- transcription vocale ;
- identifiant publicitaire ;
- fingerprint ;
- localisation précise.

Les événements privilégiés seront des événements techniques ou agrégés : version, plateforme, langue, niveau scolaire, identifiant de contenu non personnel, durée/score par tranche, online/offline.

## 11. Achats et monétisation

La V1 ne doit pas utiliser les erreurs scolaires, XP, badges, séries ou frustration comme mécanisme de pression à l’achat.

Tout achat futur devra être contrôlé côté parent.

La progression pédagogique et la monétisation doivent rester techniquement et fonctionnellement séparées.

## 12. Conservation

**À définir avant publication.**

La politique finale doit préciser séparément :

- durée de conservation locale ;
- durée de conservation serveur ;
- durée des actions parent ;
- durée des logs techniques ;
- délai de suppression ;
- comportement des sauvegardes backend.

Principe : aucune donnée enfant ne doit être conservée plus longtemps que nécessaire.

## 13. Suppression des données

L’utilisateur doit disposer d’un moyen clair de supprimer :

1. les données locales ;
2. les données du suivi parent distant lorsqu’il a été activé.

**P0 actuel :** la suppression distante complète n’est pas encore prouvée dans la base auditée. Une release Store ne doit pas déclarer une suppression cloud tant que le mécanisme backend n’existe pas et n’est pas testé.

La version finale devra permettre au parent de demander la suppression sans devoir contacter manuellement le développeur lorsque cela est techniquement raisonnable.

## 14. Export / transfert

Finot Académie propose actuellement un mécanisme d’export/import de progression locale.

Les secrets parent et éléments de synchronisation doivent rester exclus de l’export lorsque cela est prévu par le produit.

## 15. Sécurité

Les mesures attendues pour la V1 incluent :

- accès backend par jetons aléatoires suffisamment longs ;
- isolation stricte entre familles ;
- contrôles serveur ;
- validation des payloads ;
- limitation des données envoyées ;
- protection contre la lecture/écriture croisée ;
- absence de secret serveur dans l’application ;
- mécanisme de suppression ;
- tests de sécurité automatisés.

## 16. Droits et demandes

**À finaliser selon l’entité responsable et la juridiction de publication.**

La politique finale devra expliquer comment le parent peut demander :

- accès ;
- rectification ;
- suppression ;
- limitation ;
- export lorsque applicable ;
- retrait d’un consentement lorsque applicable.

Contact : `[À COMPLÉTER]`

## 17. Enfants

Finot Académie est conçue spécifiquement pour un usage scolaire par des mineurs.

Les réglages sensibles, synchronisation distante et futurs achats doivent être placés sous contrôle parent lorsque nécessaire.

Aucune donnée enfant ne doit être utilisée à des fins de publicité comportementale.

## 18. Modifications de cette politique

La date de dernière mise à jour sera indiquée dans la version publiée.

Toute modification importante concernant les données enfant, le backend, les analytics, les achats ou la publicité doit déclencher :

- une nouvelle revue privacy ;
- une mise à jour Data Safety si nécessaire ;
- une mise à jour de cette politique ;
- les notifications nécessaires selon les Stores et la réglementation applicable.

---

## Blocages avant publication de ce document

- [ ] identité juridique / responsable renseigné ;
- [ ] email privacy/support ;
- [ ] région Supabase confirmée ;
- [ ] backend RLS/RPC audité ;
- [ ] rétention définie ;
- [ ] suppression serveur implémentée/testée ;
- [ ] payload cloud minimisé ;
- [ ] date de naissance exclue du payload ;
- [ ] comportement micro Android vérifié ;
- [ ] Data Safety alignée ;
- [ ] URL publique définitive créée.
