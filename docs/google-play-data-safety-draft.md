# Finot Académie — Google Play Data Safety / Families DRAFT

Date de vérification : 2026-10-31  
Runtime de référence : `chatgpt/runtime-integration` — candidat Android V1, suivi distant désactivé par défaut.

> **DRAFT de préparation Play Console.** Ne pas soumettre tel quel sans vérifier le binaire de production signé, le package ID final, les SDK réellement présents et la décision finale concernant le backend parent.

## 1. Base réglementaire actuelle vérifiée

Sources officielles Google Play :

- Data Safety : https://support.google.com/googleplay/android-developer/answer/10787469
- Families Policy : https://support.google.com/googleplay/android-developer/answer/9893335
- Data practices in Families apps : https://support.google.com/googleplay/android-developer/answer/11043825
- User Data policy : https://support.google.com/googleplay/android-developer/answer/10144311
- Target Audience and Content : https://support.google.com/googleplay/android-developer/answer/9867159
- Testing requirements for new personal accounts : https://support.google.com/googleplay/android-developer/answer/14151465

Google définit « collecte » comme la transmission de données utilisateur hors de l'appareil. Les données uniquement traitées localement et jamais envoyées hors appareil n'ont pas besoin d'être déclarées comme collectées dans Data Safety.

Toute application dont l'audience inclut des enfants doit répondre exactement aux sections Target Audience, Data Safety et IARC et respecter la Families Policy.

## 2. État Android V1 candidat réellement vérifié

### Permissions / système

- `INTERNET` : oui ;
- `RECORD_AUDIO` : non ;
- `AD_ID` : non ;
- localisation : non ;
- caméra : non ;
- contacts : non ;
- SMS/téléphone : non ;
- stockage externe large : non ;
- backup Android : désactivé ;
- transfert automatique appareil-à-appareil : désactivé.

### Réseau applicatif V1 par défaut

- aucun projet Supabase Finot actif ;
- ancien endpoint Supabase supprimé ;
- remote sync désactivé par défaut ;
- aucune provider analytics active ;
- aucun SDK publicitaire ;
- aucun identifiant publicitaire ;
- aucun fournisseur d'achat actif ;
- liens externes bloqués côté enfant ;
- liens parent peuvent ouvrir le navigateur externe à l'initiative du parent.

### Voix

- reconnaissance vocale Android désactivée ;
- aucune permission microphone ;
- synthèse vocale via moteur Android/plateforme ;
- à vérifier physiquement selon les voix installées et leur mode local/online ;
- aucune donnée audio enfant créée par Finot Android V1.

## 3. Réponse Data Safety candidate — V1 SANS backend distant

### « Does your app collect or share any of the required user data types? »

**Réponse candidate : NON**, sous les conditions cumulatives suivantes au moment de la soumission :

1. remote sync toujours désactivé dans le binaire Play ;
2. aucun backend Finot configuré ;
3. aucune provider analytics activée ;
4. aucun SDK/outil supplémentaire ne transmet de données utilisateur ;
5. aucun plugin futur n'ajoute de télémétrie ;
6. le comportement TTS final ne transmet pas de donnée personnelle créée par l'utilisateur sous le contrôle de Finot.

Raison : les profils, progression, scores et préférences sont actuellement traités localement et Google n'exige pas leur déclaration en tant que données « collectées » lorsqu'ils ne quittent jamais l'appareil.

**Cette réponse doit être recalculée sur l'AAB production signé.**

## 4. Données locales qui ne seraient pas « collectées » selon Data Safety tant qu'elles restent sur l'appareil

| Type Finot | Exemple | État candidat | Data Safety V1 sans cloud |
|---|---|---|---|
| Identité locale | prénom/pseudonyme | local uniquement | non collecté |
| Date de naissance | facultative | local uniquement | non collecté |
| Classe | CP → 3e | local uniquement | non collecté |
| Progression | chapitres/maîtrise | local uniquement | non collecté |
| Scores | exercices/cours | local uniquement | non collecté |
| Erreurs pédagogiques | carnet d'erreurs | local uniquement | non collecté |
| Diagnostic | niveau initial | local uniquement | non collecté |
| Préférences DYS | accessibilité | local uniquement | non collecté |
| XP/pièces/badges | gamification | local uniquement | non collecté |
| Devoirs parent locaux | consignes/récompenses | local uniquement | non collecté |

Cette qualification change immédiatement si l'un de ces éléments est transmis hors appareil.

## 5. Données explicitement absentes / non demandées Android V1

- AAID / Advertising ID ;
- Android ID utilisé comme identifiant applicatif ;
- IMEI ;
- IMSI ;
- MAC ;
- BSSID ;
- SSID ;
- numéro de téléphone ;
- localisation ;
- microphone ;
- caméra ;
- contacts ;
- SMS ;
- historique d'appels ;
- santé ;
- photos/vidéos ;
- fichiers utilisateur généraux ;
- données financières enfant ;
- données publicitaires.

## 6. Families Policy — réponses candidates

### Audience

Finot est explicitement conçu pour des élèves du CP à la 3e. L'audience inclut donc des enfants de moins de 13 ans.

Conséquence : **Families Policy applicable**.

### Ads

**Non** pour la V1 candidate.

- aucun SDK publicitaire ;
- aucune publicité personnalisée ;
- aucun AAID ;
- aucune permission `AD_ID`.

### Microphone

**Non demandé dans Android V1.**

Cela évite une catégorie de donnée sensible enfant explicitement citée par la Families Policy.

### Localisation

**Non demandée / non collectée.**

### Device identifiers

Ne pas transmettre les identifiants interdits pour les enfants : AAID, SIM serial, Build serial, BSSID, MAC, SSID, IMEI, IMSI.

Le runtime candidat n'en dépend pas.

### Liens externes

- espace enfant : bloqués ;
- espace parent : possibles après parent gate réel.

## 7. Compte utilisateur / suppression — qualification actuelle

Finot V1 utilise des **profils locaux**, pas des comptes en ligne authentifiés.

Google précise que les comptes créés et exploités uniquement hors ligne ne sont pas des « app accounts » au sens de l'exigence d'account deletion.

Donc, tant qu'aucun véritable compte serveur n'est créé :

- l'obligation Google d'un lien Web externe de suppression de compte ne devrait pas être déclenchée par les seuls profils locaux ;
- la suppression locale doit néanmoins être honnête et conforme à la politique de confidentialité.

### P1 connu

`mathquest_profile_deleted_backup` conserve actuellement une copie locale du dernier profil supprimé. Ce point est suivi séparément avant publication et doit être résolu/clarifié pour éviter qu'une action « supprimer » soit trompeuse.

## 8. Si le suivi parent Supabase est activé avant la V1

Le formulaire Data Safety doit être recalculé.

Les données éventuellement collectées pourraient alors inclure, selon le payload final :

| Catégorie Google probable | Données Finot | Finalité candidate |
|---|---|---|
| Personal info / Name | prénom ou pseudonyme enfant si conservé | suivi parent |
| App activity | progression / contenus terminés | fonctionnalité app / suivi parent |
| App activity / Other user-generated content ou autre catégorie pertinente | devoirs/actions parent selon qualification finale | fonctionnalité app |
| App info/performance | uniquement si télémétrie réellement activée | analytics/app functionality |

Avant activation cloud :

- confirmer chaque catégorie exacte Play Console ;
- collection facultative si l'app fonctionne entièrement sans cloud ;
- transmission chiffrée en transit ;
- suppression disponible ;
- politique de rétention ;
- aucune donnée sensible inutile ;
- aucune date de naissance complète ;
- aucune réponse libre enfant ;
- aucun diagnostic détaillé ;
- aucun DYS ;
- aucun audio/transcription ;
- aucun identifiant publicitaire.

## 9. Analytics

État V1 candidat :

- architecture présente ;
- aucune provider active ;
- désactivée par défaut ;
- parent gate requis ;
- données allowlistées ;
- PII filtrée.

**Si une provider est activée avant soumission, Data Safety doit être recalculée.** Même une donnée pseudonyme transmise hors appareil doit généralement être déclarée.

## 10. TTS Android — gate avant formulaire final

Le moteur natif Android peut dépendre de la voix installée sur l'appareil. Certaines voix peuvent fonctionner localement, d'autres peuvent utiliser un service réseau de la plateforme.

Avant de cocher définitivement « aucune collecte » :

- tester les voix réellement prévues FR/EN/IT ;
- confirmer que Finot n'envoie pas de texte libre enfant au TTS ;
- éviter autant que possible de transmettre une donnée personnelle dynamique (ex. prénom) à un moteur online ;
- documenter le rôle du moteur de plateforme dans la privacy policy si nécessaire.

## 11. Encryption in transit

Pour une V1 sans transmission de données utilisateur au backend Finot : non applicable aux données locales.

Si Supabase est activé : HTTPS/TLS obligatoire pour toute donnée utilisateur envoyée hors appareil.

## 12. Deletion

### V1 local-only

- suppression des profils locaux à finaliser de façon cohérente avec les backups locaux ;
- désinstallation supprime le stockage application, backup Android étant désactivé.

### Si backend activé

- suppression serveur depuis l'espace parents ;
- révocation association ;
- purge snapshots/actions ;
- rétention/backups documentés ;
- chemin de demande conforme aux règles applicables si un vrai compte applicatif est introduit.

## 13. Closed testing Google

Si le compte Play est un nouveau compte personnel soumis à l'exigence actuelle :

- au moins 12 testeurs ;
- inscrits en continu pendant au moins 14 jours ;
- un testeur qui sort puis revient doit recommencer la période continue ;
- production access seulement après satisfaction de cette exigence et questionnaire Google.

## 14. Checklist avant remplissage Play Console

- [ ] package ID production figé ;
- [ ] AAB signé production construit ;
- [ ] `apkanalyzer`/manifest final contrôlé ;
- [ ] liste exacte des SDK/dépendances vérifiée ;
- [ ] aucune provider analytics activée par erreur ;
- [ ] décision backend V1 prise ;
- [ ] comportement TTS physique contrôlé ;
- [ ] issue backup profil supprimé résolue ;
- [ ] privacy policy finale publique ;
- [ ] coordonnées éditeur/support ;
- [ ] Target Audience renseignée ;
- [ ] Ads = non confirmé ;
- [ ] IARC préparé ;
- [ ] Data Safety recalculée depuis le binaire final ;
- [ ] Families Policy revue une dernière fois ;
- [ ] closed testing planifié si applicable.

## 15. Conclusion candidate

La configuration Android V1 **sans backend distant et sans analytics provider** est actuellement la voie de publication la plus simple et la plus protectrice : données pédagogiques local-first, pas de micro, pas d'AD_ID, pas de publicité, backup Android désactivé et liens externes enfant bloqués.

La moindre activation d'un backend, d'analytics, d'un SDK Store/marketing supplémentaire ou d'une fonctionnalité réseau utilisant des données utilisateur doit déclencher une nouvelle revue Data Safety avant soumission.
