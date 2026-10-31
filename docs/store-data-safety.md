# Finot Académie — matrice des données (Data Safety / confidentialité enfant)

Établie le 31/10/2026 **à partir du code** de la branche `claude/android-store-hardening` (version 8.75.0) :
- `js/app-state.js` (`DEF`, `snapshot`, `rpc`) ;
- `js/sync-snapshot.js` ;
- `js/remote-sync-config.js` ;
- `js/analytics.js` et `js/entitlements.js` ;
- `js/speech-capability.js` ;
- les modules qui écrivent dans `S` ou dans `localStorage` ;
- `android/` (manifeste, sauvegarde).

Toute évolution de ces fichiers doit mettre à jour ce document. Les tests de référence sont :
- `tests/sync-privacy.test.js` ;
- `tests/remote-sync-flag.test.js` ;
- `tests/analytics-entitlements.test.js` ;
- `tests/analytics-guard.test.js` ;
- `tests/android-backup.test.js` ;
- `supabase/tests/run.mjs`.

## État de la V1 Store (configuration par défaut)

- **Aucune donnée ne quitte l'appareil.**
  - Le suivi parent à distance est désactivé (aucun backend validé). Sans configuration, l'app ne fait aucune requête réseau : c'est vérifié.
  - Les statistiques sont inactives : aucun fournisseur, aucun accord parental.
  - Aucun achat, aucun SDK publicitaire, aucun service Google (GMS, Firebase).
- Le micro n'est jamais demandé dans l'app Android : aucune permission `RECORD_AUDIO`, reconnaissance vocale indisponible par conception.
- Aucune sauvegarde Android automatique ni aucun transfert d'appareil à appareil (`allowBackup=false` + `dataExtractionRules`).
- **Seule permission : `INTERNET`.** Elle ne sert qu'au suivi à distance futur et aux liens externes de l'espace parents (ouverts dans le navigateur du système).

## Matrice

Légende :
- « Envoyée serveur » = uniquement si un parent active le suivi à distance **et** qu'un backend validé est configuré (aujourd'hui : jamais).
- « Analytics » = uniquement après accord parental et branchement d'un fournisseur (aujourd'hui : jamais).

| Donnée | Où / clé | Stockée localement | Envoyée serveur (si suivi activé) | Analytics | Nécessaire à quoi | Suppression |
|---|---|---|---|---|---|---|
| Prénom ou pseudo de l'enfant | `S.name` | Oui | Oui, 40 caractères au plus (affiché au parent) | Non (propriété refusée) | Personnalisation, choix du profil, page parent | Suppression du profil (espace parents) ; serveur : `mq_delete` |
| Date de naissance complète | `S.birthdate` (facultative) | Oui | **Non** (refusée aussi par le serveur) | Non | Âge et anniversaire, calculés sur l'appareil | Profil |
| Année d'anniversaire fêtée | `S.lastBirthdayYear` | Oui | Non | Non | Éviter une double fête | Profil |
| Genre, compagnon, avatar | `S.gender`, `S.companion`, `S.avatar` | Oui | Avatar seulement (emoji) | Non | Accords grammaticaux, mascotte | Profil |
| Classe | `S.grade` | Oui | Oui | Possible : propriété `grade` (après accord) | Programme adapté | Profil |
| Progression : XP, niveaux, étoiles, chapitres, cours | `S.xp`, `S.chap`, `S.lessons`, `S.totalQ`, `S.totalOk`, `S.time`, `S.streak`, `S.daily` | Oui | Oui | Possible : `stars`, `score`, `count` agrégés | Progression, suivi parent | Profil ; serveur : `mq_delete` ou purge à 180 jours |
| Notes et compétences | `S.competencies`, `S.mastery`, `S.readingMastery` | Oui | Compétences et lecture : oui ; `mastery` : non | Non | Suivi des acquis | Profil |
| Historique des réponses | `S.answerLog` (2 500 au plus : date, chapitre, juste/faux, source, durée) | Oui | Oui, sans aucun texte | Non | Filtres de période du suivi parent | Profil ; serveur |
| Historique d'activité et d'étude | `S.activityLog`, `S.studyLog`, `S.path`, `S.pathHist` | Oui | Oui | Non | Rapport parent, parcours du jour | Profil ; serveur |
| Erreurs (énoncés et réponses attendues) | `S.mistakes`, `S.errorRepair`, `S.errorPatterns` | Oui | **Non** | Non | Carnet d'erreurs, révision | Profil |
| Réponses tapées par l'enfant | interrogations (`answers[].your`), aide aux devoirs (`S.homeworkHelp`), devoirs (`S.homework`) | Oui | **Non** : seuls les scores et l'avancement des interrogations sont envoyés | Non | Correction, aide | Profil |
| Audio / voix | Aucun stockage | **Non** (jamais enregistré) | **Non** | Non | Web : reconnaissance du navigateur, sur action explicite. Android V1 : indisponible | — |
| Synthèse vocale (TTS) | Moteur de l'appareil | Préférences seulement (`S.tts`) | Non | Non | Dictées, langues | Profil |
| Diagnostic de départ et profil d'apprentissage | `S.diagnostic`, `S.learnerProfile`, `S.confidence`, `S.adaptive` | Oui | **Non** | Non | Adaptation des exercices | Profil |
| Paramètres DYS | `S.dys` | Oui | **Non** | Non | Lecture facilitée | Profil |
| Préférences (son, thème, objectif) | `S.sound`, `S.theme`, `S.dailyGoal`, `S.subj` | Oui | `dailyGoal` seulement | Non | Confort | Profil |
| Économie de jeu (pièces, boutique, badges) | `S.coins`, `S.own`, `S.economy`, `S.badges` | Oui | Non | Non | Motivation | Profil |
| Bons points, récompenses, règles du parent | `S.merit` | Oui | Oui, sauf `merit.notes` (messages destinés à l'enfant) | Non | Récompenses validées à distance | Profil ; serveur |
| Code parent (PIN) et code de secours | `S.pin`, `S.rec` (empreintes) | Oui (empreinte) | **Non** | Non | Verrou de l'espace parents | Réinitialisation du code |
| Codes de suivi à distance | `S.sync.child`, `S.sync.parent` | Oui | Le serveur ne stocke que leur empreinte SHA-256 | Non | Liaison enfant ↔ parent | « Désactiver » (local) ; « Supprimer les données du serveur » |
| Clé du lien parent sur le téléphone du parent | `localStorage.mq_parent_key` (page parent) | Oui (téléphone du parent) | Envoyée comme jeton à chaque lecture | Non | Ouvrir le suivi | Effacer les données du navigateur du parent |
| Statistiques d'usage | `finot_analytics_v1` (accord seulement) | Accord du parent uniquement | Non | **Désactivées** ; si activées : évènements de la liste blanche, sans identifiant, heure arrondie | Améliorer l'app (futur) | Retrait de l'accord dans l'espace parents |
| Achats futurs | `finot_entitlements_v1` (produits possédés) | Oui (cache) | Non (le store fait foi) | Non | Futur premium (aucun aujourd'hui) | Désinstallation ; restauration via le store |
| Identifiant d'appareil technique | `mq_exercise_resume_device_v1` (aléatoire, local) | Oui | **Non** | Non | Reprise exacte d'un exercice sur le même appareil | Désinstallation, effacement des données |
| Rotation des questions | `mathquest_question_rotation_v1` | Oui | Non | Non | Éviter les répétitions | Désinstallation |
| Journal d'erreurs techniques | `mathquest_debug_v1` (30 entrées : message, fichier, ligne) | Oui | **Non** | Non | Diagnostic local | Automatique (tampon tournant) |
| Copies de secours locales | `mathquest_profile_deleted_backup`, `mathquest_import_backup`, `mathquest_profiles_corrupt_backup_*`, `mathquest_v1_backup` | Oui | Non | Non | Récupération après erreur | Désinstallation, effacement des données |
| Identifiant publicitaire | — | Non | Non | Non | — | `AD_ID` retiré du manifeste |
| Adresse IP | — | Non | Vue par l'hébergeur lors d'une requête (suivi activé seulement), jamais stockée par Finot | Non | — | — |

## Réponses préparées pour la Data Safety Google Play (V1, suivi à distance désactivé)

- Collecte de données : **aucune** donnée collectée ni partagée. L'app fonctionne sans compte, tout reste sur l'appareil.
- Chiffrement en transit : sans objet en V1 ; si le suivi est activé plus tard, HTTPS uniquement (`network_security_config`).
- Suppression : désinstaller l'app supprime toutes les données. L'espace parents permet de supprimer un profil.
- **Si le suivi à distance est activé plus tard**, il faudra déclarer :
  - « Infos personnelles : prénom » ;
  - « Activité dans l'app : progression scolaire ».

  Ces données sont collectées sur choix du parent, sans partage, chiffrées en transit, et supprimables (`mq_delete`). La politique de confidentialité doit être mise à jour en même temps.

## Points ouverts

- **Suivi à distance**, avant activation :
  - provisionnement du backend (`supabase/README.md`) ;
  - durée de conservation validée juridiquement ;
  - région UE.
- **Copies de secours locales** : elles conservent un profil supprimé jusqu'à la prochaine suppression. Le comportement est voulu (récupération), mais il doit figurer dans la politique de confidentialité.
- **Le PIN parent est stocké sous forme d'empreinte locale.** Un code de 4 à 8 chiffres reste devinable par quelqu'un qui a accès à l'appareil déverrouillé : c'est un verrou anti-enfant, pas une protection forte.
