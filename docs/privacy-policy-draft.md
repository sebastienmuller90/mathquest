# Finot Académie — politique de confidentialité (DRAFT)

> **Statut : DRAFT non publiable tel quel.** Les coordonnées légales, l'URL publique finale, la durée de conservation définitive et la décision backend V1 doivent encore être validées.

Dernière mise à jour technique : 2026-10-31  
Référence runtime : `chatgpt/runtime-integration` @ `69d959e2f1a57f15d6c543a3f3b654d81639c164`

## 1. Objet

Finot Académie est une application éducative destinée aux élèves du CP à la 3e. Elle permet de créer des profils locaux, suivre une progression pédagogique, réaliser des cours/exercices et utiliser un espace parents.

La conception V1 suit un principe **local-first** et de minimisation des données, particulièrement parce que l'application est destinée à des mineurs.

## 2. Responsable du traitement

À compléter avant publication :

- nom / entité ;
- adresse ou informations légales nécessaires ;
- email confidentialité ;
- email support ;
- URL officielle de cette politique.

Aucune publication Store ne doit avoir lieu tant que ces informations ne sont pas exactes.

## 3. Données enregistrées localement

Selon les fonctions utilisées, Finot peut stocker sur l'appareil :

- prénom ou pseudonyme ;
- classe ;
- date de naissance facultative ;
- préférences de profil ;
- progression ;
- scores ;
- maîtrise ;
- historique pédagogique ;
- erreurs et révisions ;
- devoirs/actions parent ;
- XP, pièces, badges et récompenses ;
- préférences d'accessibilité et d'affichage ;
- paramètres nécessaires au fonctionnement de l'application.

Ces données servent à personnaliser l'apprentissage et à conserver la progression.

## 4. Suivi parent à distance

### État V1 actuel

Aucun backend Supabase Finot n'est actuellement provisionné.

Le suivi parent distant est **désactivé par défaut** dans le runtime candidat. Lorsqu'aucun backend valide n'est configuré, Finot ne tente pas d'envoyer les données enfant à un service Supabase.

### Si le suivi distant est activé ultérieurement

Seules les informations strictement nécessaires à la fonctionnalité parent distante devront être envoyées selon une liste blanche explicite.

Les éléments suivants ne doivent pas être transmis dans le payload distant V1 :

- date de naissance complète ;
- PIN/code de secours parent ;
- diagnostic détaillé ;
- mode DYS ;
- réponses libres tapées par l'enfant ;
- données vocales ;
- transcription vocale ;
- secrets techniques locaux ;
- identifiant publicitaire ;
- localisation ;
- contacts ;
- photos/vidéos.

L'activation d'un backend réel nécessitera une mise à jour de cette politique avant utilisation réelle.

## 5. Microphone et reconnaissance vocale

### Android V1

L'application Android candidate ne demande pas la permission microphone et n'utilise pas la reconnaissance vocale.

Les activités de prononciation utilisent une alternative pédagogique « écoute et répète » lorsque la reconnaissance vocale n'est pas disponible.

Finot Android V1 ne conserve donc aucun enregistrement audio ni transcription vocale.

### Web / PWA

Sur certains navigateurs compatibles, une fonction de reconnaissance vocale peut être proposée par l'API Web Speech de la plateforme.

Dans ce cas :

- elle est déclenchée uniquement par l'utilisateur ;
- Finot ne doit pas conserver l'audio ;
- Finot ne doit pas synchroniser la transcription avec un backend ;
- le traitement exact peut dépendre du navigateur/OS/fournisseur de la plateforme.

## 6. Synthèse vocale

Finot utilise la synthèse vocale de la plateforme pour lire certains contenus pédagogiques.

Sur Android, la version native utilise le moteur TTS disponible sur l'appareil. Certaines voix peuvent nécessiter un téléchargement ou un service fourni par le système d'exploitation.

Finot n'enregistre pas la voix de l'enfant pour cette fonction de lecture.

## 7. Sauvegarde Android

La sauvegarde Android automatique des données de l'application est désactivée dans le runtime candidat.

Le transfert automatique des données enfant entre appareils est également désactivé pour la V1.

L'export/import contrôlé via l'espace parents reste la méthode privilégiée pour un transfert volontaire lorsque cette fonction est utilisée.

## 8. Liens externes

Dans l'espace enfant, Finot bloque les ouvertures de liens externes.

Les liens externes nécessaires sont réservés à l'espace parents réellement affiché.

Cette règle vise à éviter qu'un enfant sorte involontairement de l'environnement éducatif contrôlé.

## 9. Analytics

Aucun fournisseur analytics tiers n'est actif dans la V1 candidate.

L'architecture analytics est désactivée par défaut et nécessite l'accord d'un parent avant toute activation future.

Les analytics futurs ne doivent jamais contenir :

- prénom/nom ;
- date de naissance ;
- texte libre enfant ;
- audio ;
- transcription ;
- identifiant publicitaire ;
- fingerprint ;
- géolocalisation précise.

## 10. Publicité

Finot Académie V1 ne contient pas de publicité ciblée enfant et n'utilise pas d'identifiant publicitaire Android (`AD_ID`).

Aucun tracker publicitaire n'est intégré au runtime candidat.

## 11. Achats et monétisation

Aucun achat réel n'est activé dans le runtime candidat.

L'architecture prévue impose que les futurs achats soient initiés et contrôlés depuis l'espace parents.

Les mécanismes pédagogiques (XP, badges, progression, erreurs, séries) ne doivent pas être utilisés pour pousser l'enfant à acheter.

## 12. Permissions Android

Le manifest fusionné de la version candidate a été audité automatiquement.

État actuel :

- accès réseau `INTERNET` : présent ;
- microphone : absent ;
- `AD_ID` : absent ;
- localisation : absente ;
- caméra : absente ;
- contacts : absents ;
- SMS/téléphone : absents ;
- stockage externe large : absent ;
- backup Android : désactivé.

## 13. Sécurité

Les données pédagogiques restent principalement stockées localement dans la V1 actuelle.

Le dépôt ne doit contenir aucune clé serveur secrète, clé privée ou `service_role` Supabase.

Si un backend est activé ultérieurement, il devra notamment utiliser :

- isolation entre familles ;
- jetons non stockés en clair ;
- RLS / surface API minimale ;
- suppression contrôlée ;
- rétention définie ;
- tests d'accès croisés ;
- limitation des logs sensibles.

## 14. Suppression des données

### Données locales

Les données locales peuvent être supprimées selon les fonctions de gestion de profil/application disponibles.

### Données cloud

Aucun backend Finot n'est actif aujourd'hui.

Si un backend de suivi parent est activé, Finot devra proposer une action parent permettant la suppression des données synchronisées, avec confirmation explicite, et documenter la rétention effective des sauvegardes serveur.

## 15. Conservation

La majorité des données de la V1 candidate restent sur l'appareil tant que le profil/application les conserve.

Les durées serveur ne sont pas applicables tant qu'aucun backend Finot n'est provisionné.

Une politique de rétention serveur devra être validée avant toute première donnée cloud réelle.

## 16. Enfants

Finot Académie est conçu pour un public comprenant des mineurs.

Principes appliqués :

- minimisation ;
- pas de publicité ciblée ;
- pas d'ID publicitaire ;
- pas de liens externes côté enfant ;
- achats réservés au parent ;
- pas de micro Android V1 ;
- backup Android enfant désactivé ;
- cloud off par défaut ;
- données scolaires non utilisées comme levier commercial.

## 17. Droits et demandes

À finaliser selon l'entité responsable et la juridiction de publication.

La version finale devra expliquer comment le parent peut demander :

- accès ;
- rectification ;
- suppression ;
- limitation ;
- export lorsque applicable ;
- retrait d'un consentement lorsque applicable.

## 18. Modifications de cette politique

Toute modification substantielle des catégories de données, du backend, des analytics, des achats ou des permissions doit entraîner :

1. mise à jour de la présente politique ;
2. revue Data Safety / Store ;
3. revue enfant/privacy ;
4. nouveau contrôle des tests et permissions.

## 19. Éléments encore requis avant publication

- [ ] identité légale de l'éditeur ;
- [ ] email support/privacy ;
- [ ] URL publique permanente ;
- [ ] validation juridique adaptée au marché visé ;
- [ ] décision finale sur backend distant V1 ;
- [ ] Data Safety finale ;
- [ ] politique de rétention si cloud activé ;
- [ ] alignement avec le package production signé.
