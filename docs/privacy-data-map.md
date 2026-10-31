# Finot Académie — cartographie confidentialité / données enfant

Référence auditée : `main` @ `05b4c0ce21bd78a9027367d1219e660ec86f7bda`  
Branche : `chatgpt/multistore-release-orchestration`

> **État Supabase corrigé — 2026-10-31** : aucun projet Supabase Finot n'est actuellement créé. Les éléments Supabase présents dans le frontend constituent un client/prototype de synchronisation prévu, pas un backend actif. Toute formulation ci-dessous sur des données « envoyées à Supabase » doit être lue comme **données qui seraient envoyées si le client actuel était connecté tel quel à un futur backend**. Le document `docs/supabase-backend-blueprint.md` est la référence pour le futur provisioning.

Objectif : documenter ce que Finot collecte, conserve, traite localement et pourrait transmettre ultérieurement afin de sécuriser Google Play / Microsoft Store / Samsung / PWA.

## 1. Principe de minimisation

Finot cible des mineurs. La règle de V1 est :

- collecter le minimum strictement nécessaire ;
- conserver localement tout ce qui n’a pas besoin d’être distant ;
- ne jamais envoyer un champ enfant au serveur uniquement parce qu’il existe dans l’état global ;
- utiliser un payload distant explicite en liste blanche ;
- aucun identifiant publicitaire ;
- aucune publicité ciblée enfant ;
- aucune exploitation commerciale de la progression scolaire, des erreurs, XP ou streak ;
- achats futurs sous contrôle parent uniquement.

## 2. Données de profil créées lors de l’onboarding

Le wizard moderne peut enregistrer dans le profil local :

- prénom ou pseudonyme ;
- genre déclaré (`girl` / `boy`) ;
- date de naissance complète, facultative ;
- classe ;
- compagnon/avatar ;
- niveau ressenti ;
- confiance déclarée ;
- objectifs ;
- matières préférées ;
- matières difficiles ;
- rythme préféré ;
- style d’aide ;
- plan initial dérivé ;
- date de création du profil.

La date de naissance sert à calculer l’âge localement et au message d’anniversaire. La classe reste la référence pédagogique principale.

## 3. Données pédagogiques locales

L’état élève contient ou peut contenir notamment :

- progression par chapitre ;
- cours terminés et scores ;
- maîtrise ;
- révisions espacées ;
- vocabulaire ;
- erreurs et carnet d’erreurs ;
- réponses agrégées et historique horodaté ;
- lecture / compréhension ;
- parcours adaptatif ;
- diagnostic ;
- temps de travail ;
- streak ;
- XP, pièces, badges, niveaux ;
- récompenses familiales ;
- devoirs / actions parent ;
- préférences audio / thème / accessibilité ;
- historique du parcours et activités récentes.

Le stockage principal est `localStorage`, notamment `mathquest_profiles_v2`, avec compatibilité/migrations historiques.

## 4. Données explicitement exclues du snapshot distant prototype

La fonction `snapshot()` clone actuellement l’état actif puis retire :

- `pin` ;
- `rec` ;
- `sync`.

C’est une blacklist, pas une liste blanche.

Conséquence : si ce client était relié tel quel à un backend, tout autre champ de `S`, y compris de nouveaux champs ajoutés plus tard, pourrait être envoyé automatiquement.

### Décision d’architecture P0

Avant création/activation d'un backend Store, remplacer conceptuellement cette approche par un **payload distant explicitement allowlisté**, avec test de contrat garantissant qu’un nouveau champ local ne devient jamais automatiquement un champ cloud.

## 5. Données potentiellement transmissibles si le prototype actuel était activé

Puisque `snapshot()` clone presque tout le profil, pourraient notamment partir au serveur :

### Identité / profil

- prénom ou pseudonyme ;
- genre ;
- date de naissance complète ;
- classe ;
- avatar/compagnon ;
- profil d’apprentissage déclaré ;
- préférences et objectifs.

### Données scolaires

- progression ;
- scores ;
- maîtrise ;
- réponses agrégées ;
- historique de réponses ;
- erreurs et parfois texte de question/réponse dans le carnet d’erreurs ;
- lecture ;
- révisions ;
- activités et parcours ;
- temps de travail.

### Gamification / parent

- XP ;
- pièces ;
- badges ;
- streak ;
- récompenses ;
- historiques de mérite ;
- demandes parentales.

### Technique

- `lastSeen` ajouté au snapshot ;
- identifiant secret enfant `sync.child` prévu comme argument RPC mais retiré du payload lui-même.

## 6. Données qui doivent rester locales dans la V1

Sauf justification contraire validée :

- date de naissance complète ;
- genre, s’il n’est pas nécessaire à l’écran parent distant ;
- préférences de voix TTS ;
- thème / détails purement UI ;
- champs de personnalisation non nécessaires au suivi parent ;
- texte libre non nécessaire ;
- données brutes détaillées d’erreur si un agrégat suffit ;
- tout secret parent / PIN / recovery code ;
- données vocales et transcription de prononciation.

## 7. Payload distant minimal recommandé

Le suivi parent distant devrait transmettre uniquement les données nécessaires à la fonctionnalité affichée, par exemple :

- pseudonyme/prénom affiché au parent ;
- classe ;
- métriques de progression utiles ;
- scores/maîtrise agrégés ;
- cours terminés ;
- révisions dues ;
- temps de travail agrégé ;
- devoirs/actions parent nécessaires ;
- récompenses familiales nécessaires ;
- dernier instant de synchronisation ;
- identifiants de contenus non personnels.

À éviter dans le payload : date de naissance complète, texte vocal, identifiants publicitaires, identifiants appareil, localisation, contacts, photos, fichiers, données financières.

## 8. Supabase — interface frontend prévue

Aucun projet Supabase Finot live n'est actuellement provisionné.

Le frontend contient néanmoins une interface prévue utilisant une clé publishable et les RPC suivantes :

- `mq_register(p_child, p_parent)` ;
- `mq_push(p_child, p_data)` ;
- `mq_ack(p_child, p_ids)` ;
- `mq_get(p_parent)` ;
- `mq_act(p_parent, p_kind, p_payload)`.

Le frontend génère des clés aléatoires fortes pour le lien enfant/parent.

### P0 de conception avant provisioning

Les définitions SQL, politiques RLS, rôles, permissions `EXECUTE`, validation de taille/type et isolation des familles doivent être conçues, revues et testées **avant création du projet réel**.

Conditions minimales à prouver :

1. une clé parent A ne peut jamais lire le profil B ;
2. une clé enfant A ne peut jamais pousser/acknowledger sur B ;
3. aucune fonction RPC ne permet d’énumérer les familles ;
4. aucune table contenant des données enfant n’est lisible directement via la clé publishable ;
5. validation serveur des payloads ;
6. limites de taille et anti-abus ;
7. rétention définie ;
8. suppression complète et vérifiable ;
9. journaux Supabase ne doivent pas contenir inutilement les payloads enfant ;
10. aucun secret `service_role` dans frontend/repo.

## 9. Suppression et désactivation du suivi

Le comportement frontend prototype efface localement `sync.child` et `sync.parent`.

Comme aucun backend Finot n'existe aujourd'hui, aucune suppression serveur n'est actuellement requise en production. En revanche, elle devient une **gate P0 avant activation du futur backend**.

Avant activation :

- RPC ou mécanisme serveur de suppression ;
- action parent explicite ;
- confirmation côté UI ;
- suppression du snapshot, actions en attente et associations ;
- rétention/backups documentés ;
- test automatisé prouvant qu’après suppression `mq_get`/équivalent ne restitue plus les données.

## 10. Microphone / reconnaissance vocale

Finot utilise `SpeechRecognition` / `webkitSpeechRecognition` pour la prononciation interactive en langues.

Flux observé :

1. l’enfant appuie sur le bouton micro ;
2. le navigateur/OS demande ou utilise l’autorisation microphone ;
3. une transcription est renvoyée par l’API Web Speech ;
4. Finot compare la transcription à la phrase cible ;
5. la transcription reconnue est affichée temporairement à l’écran ;
6. le score est utilisé pour décider si la prononciation est réussie.

Dans le chemin de code audité, aucune persistance de la transcription reconnue ni envoi cloud explicite de cette transcription n’a été trouvé.

### Risque à traiter

Le traitement de la reconnaissance vocale peut dépendre du navigateur/OS et éventuellement d’un service distant du fournisseur de plateforme. Finot ne doit pas prétendre que le traitement est « 100 % local » tant que cela n’est pas prouvé pour chaque runtime distribué.

Pour Google Play, les données microphone des enfants sont explicitement considérées comme personnelles/sensibles dans la politique Families. La permission microphone et le traitement associé doivent être déclarés fidèlement.

### Décision V1 recommandée

- Microphone uniquement à l’initiative explicite de l’utilisateur ;
- aucune écoute en arrière-plan ;
- aucune conservation audio par Finot ;
- aucune conservation de transcription par Finot ;
- explication claire dans la privacy policy ;
- vérifier le comportement exact du runtime Android Capacitor avant Data Safety final ;
- si le runtime Android ne permet pas de garantir un traitement conforme, désactiver la reconnaissance vocale native V1 plutôt que prendre un risque enfant.

## 11. Synthèse vocale

La lecture utilise la synthèse vocale de l’appareil/navigateur. Le moteur peut choisir des voix locales ou des voix marquées online selon la plateforme ; les voix online sont évitées hors connexion.

La politique de confidentialité doit distinguer :

- texte pédagogique fourni par Finot au moteur TTS de plateforme ;
- absence d’enregistrement audio utilisateur pour la simple lecture ;
- traitement par le fournisseur de la plateforme lorsque la voix choisie est un service en ligne.

## 12. Analytics

Aucune couche analytics produit dédiée n’est validée dans la V1 auditée.

Référence détaillée : `docs/analytics-privacy-first.md`.

## 13. Première traduction Google Data Safety

Cette section reste **DRAFT** tant que le backend et le runtime Android ne sont pas finalisés.

### Aujourd'hui

Avec aucun backend Supabase Finot créé et aucun analytics dédié activé, les données pédagogiques principales restent locales à la PWA/appareil, sous réserve des services de plateforme utilisés pour synthèse/reconnaissance vocale.

### Si le suivi distant est activé plus tard

La Data Safety devra déclarer exactement le payload réellement déployé, après minimisation et tests.

### Audio

Si reconnaissance vocale Android réellement active : microphone/voix doit être déclaré selon le traitement réel du runtime et du fournisseur de reconnaissance.

### Non prévus

- localisation ;
- contacts ;
- SMS ;
- photos/vidéos ;
- calendrier ;
- santé ;
- données financières enfant ;
- identifiant publicitaire ;
- publicité ciblée.

## 14. Exigences Store confirmées à intégrer

### Google Play

- toute collecte d’information personnelle/sensible des enfants doit être divulguée ;
- les données microphone/caméra font partie des données sensibles enfant ;
- Data Safety doit refléter APIs et SDK réellement appelés ;
- aucune transmission d’identifiants publicitaires interdits pour enfant.

### Microsoft Store

Une politique de confidentialité est nécessaire si le produit accède/collecte/transmet des informations personnelles ; elle doit décrire accès, utilisation, stockage, sécurité, destinataires et mécanisme de retrait du consentement. Les règles enfants applicables doivent être respectées.

### Samsung Galaxy Store

La privacy policy doit notamment contenir les types de données, finalités, tiers, données partagées, rétention, suppression, notification de changement et droits utilisateur. La minimisation des permissions est explicitement requise.

## 15. Gates privacy avant release

### P0 avant activation du cloud

- [ ] payload distant en allowlist ;
- [ ] date de naissance complète exclue du cloud ;
- [ ] SQL/RPC/RLS conçus et audités ;
- [ ] isolation inter-familles prouvée par tests négatifs ;
- [ ] suppression cloud réelle ;
- [ ] rétention définie.

### P0 Store

- [ ] Privacy policy publique et accessible dans l’app ;
- [ ] Data Safety cohérente avec runtime final ;
- [ ] flux microphone Android vérifié et correctement déclaré ou désactivé.

### P1

- [ ] mécanisme parent clair pour gérer/retirer le consentement aux fonctions cloud ;
- [ ] écran privacy/permissions compréhensible ;
- [ ] tests de non-régression privacy ;
- [ ] inventaire des permissions Android final ;
- [ ] aucun SDK analytics/ads non validé.

## 16. Tests de sécurité à exiger du futur backend

- clé parent aléatoire invalide → aucune donnée ;
- clé enfant aléatoire invalide → aucune écriture ;
- clé d’une autre famille → aucune lecture/écriture/ack ;
- payload surdimensionné → rejet ;
- champs inattendus → rejet/ignorés ;
- injection JSON / clés prototypes → rejet ;
- action parent inconnue → rejet ;
- replay d’action → idempotent ;
- suppression → irréversible côté API utilisateur ;
- ancien lien parent après suppression → invalide ;
- rate limiting / anti-abus documenté.
