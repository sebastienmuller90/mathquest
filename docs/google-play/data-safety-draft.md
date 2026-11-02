# Finot Académie — Brouillon Data Safety (Google Play)

Brouillon de réponses à reporter dans Play Console → Contenu de l'application → Sécurité des données.
Basé sur le **code réellement présent à la base `main@4f9444d`** et sur le manifeste Android fusionné du build release, pas sur la
documentation seule. Ce document remplace `docs/google-play-data-safety-draft.md` (plus ancien) pour la soumission Google Play.

> Règle : si le binaire à publier change (nouvelle dépendance native, activation du suivi distant, analytics, publicité,
> achats), ce document doit être recalculé avant soumission. Voir « Conditions qui invalident ce brouillon » en bas.

## 1. Définition Google à garder en tête

Pour Google, une donnée est **« collectée »** lorsqu'elle est **transmise hors de l'appareil** (vers le développeur ou un tiers).
Une donnée qui reste sur l'appareil, sans jamais être envoyée, n'est **pas** « collectée » au sens de Data Safety. C'est le cas de
tout ce que Finot Académie V1 mémorise.

## 2. Ce que le code fait réellement (vérifié)

| Domaine | Constat | Statut |
|---|---|---|
| Appels réseau de l'application | Un seul `fetch` applicatif dans tout `js/` : le suivi parent distant (`js/app-state.js`, appel RPC Supabase). Le service worker ne fait que recharger les fichiers de l'app sur sa propre origine. | voir ligne suivante |
| Suivi parent distant | **Désactivé dans le binaire** : `MQRemoteSync.configured()` exige un objet `window.FINOT_REMOTE_SYNC` activé, une URL `*.supabase.co` et une clé publiable. Aucun fichier du dépôt ne définit cet objet (`index.html`, `parent.html`, `js/remote-sync-config.js` : valeurs par défaut vides). L'écran parent affiche « Suivi à distance : non activé dans cette version ». | OPTIONNEL / DÉSACTIVÉ |
| Statistiques d'usage | `js/analytics.js` : aucun fournisseur branché, aucun accord parent par défaut, aucun `fetch`/`sendBeacon`. | NON UTILISÉ (aucun envoi) |
| Achats / droits Premium | `js/entitlements.js` : interface abstraite, aucun fournisseur de paiement branché, aucun `fetch`. | NON UTILISÉ |
| Publicité | Aucun SDK, aucun code publicitaire. `AD_ID` retiré explicitement du manifeste. | NON UTILISÉ |
| Rapport de plantage | Aucun SDK (ni Firebase, ni Crashlytics, ni Sentry). | NON UTILISÉ |
| Cookies | Aucun `document.cookie`. | NON UTILISÉ |
| Polices, images, scripts externes | Tout est embarqué (`fonts/`, `data/`, `js/`). Aucune URL externe chargée par `index.html`, `parent.html` ni les CSS. | LOCAL UNIQUEMENT |
| Liens externes | Espace enfant : aucun lien ne sort de l'app (texte seulement). Espace parents : liens vers des sources officielles (`education.gouv.fr`, `eduscol.education.gouv.fr`) ouverts dans le navigateur du système. | voir §5 |
| Micro / reconnaissance vocale | `RECORD_AUDIO` absent du manifeste. Sur Android, `MQSpeechCapability` renvoie `native-unavailable` : aucun bouton micro. | NON UTILISÉ |
| Synthèse vocale | Moteur TTS **du système Android** (plugin `@capacitor-community/text-to-speech`). Le texte lu est envoyé au moteur de l'appareil ; si l'utilisateur a installé une voix « réseau », c'est le moteur système (et non Finot) qui peut contacter un service. | voir §5 |
| Sauvegarde Android | `allowBackup=false`, règles `data_extraction_rules` excluant sauvegarde cloud **et** transfert d'appareil à appareil. | LOCAL UNIQUEMENT |

Données mémorisées localement (`localStorage` de la WebView, origine `https://localhost`) :
prénom saisi par l'utilisateur, genre (choix d'assistant), niveau scolaire, compagnon choisi, réponses d'onboarding (niveau déclaré,
confiance, aide souhaitée, objectif, rythme), progression, scores, erreurs, historique d'activités, préférences (thème, son,
mode dys), code parent (haché localement) et clé de récupération, réglages. Aucune donnée n'est lue sur l'appareil (pas de
contacts, photos, localisation, identifiants).

## 3. Réponses à saisir dans Play Console

### 3.1 Collecte et partage de données

| Question Play Console | Réponse | Justification |
|---|---|---|
| Votre application collecte-t-elle ou partage-t-elle l'un des types de données utilisateur requis ? | **Non** | Aucune donnée ne quitte l'appareil dans le binaire V1 (voir §2). |
| Toutes les données de l'application sont-elles chiffrées en transit ? | Sans objet (aucune transmission) ; si la question est posée : **Oui** (HTTPS seul, trafic en clair interdit par `network_security_config`) | `cleartextTrafficPermitted="false"` |
| Proposez-vous aux utilisateurs un moyen de demander la suppression de leurs données ? | Sans objet (aucune donnée collectée). Réponse prudente si demandée : **Oui** — suppression d'un profil dans l'app, ou désinstallation | voir `release-audit.md` §7 et `privacy-policy-draft.md` |

### 3.2 Types de données (tableau demandé : collecté / partagé / obligatoire / finalité / traitement / chiffrement / suppression)

Tous les types ci-dessous sont **non collectés** et **non partagés** ; ils sont listés pour répondre à l'exigence de traçabilité.

| Type de données Google | Collecté | Partagé | Obligatoire / facultatif | Finalité | Traitement | Chiffrement | Suppression |
|---|---|---|---|---|---|---|---|
| Nom (prénom saisi) | Non | Non | Facultatif de fait (surnom libre) | Personnaliser l'app | Local uniquement | Stockage privé de l'app (sandbox Android) ; pas de chiffrement applicatif | Suppression du profil / désinstallation |
| Informations personnelles : âge, genre | Non | Non | Facultatif | Adapter le niveau | Local | idem | idem |
| Activité dans l'application (progression, scores, historique) | Non | Non | Obligatoire au fonctionnement | Pédagogie, révisions | Local | idem | idem |
| Identifiants (appareil, publicitaire, compte) | Non | Non | — | — | Aucun lu | — | — |
| Localisation, contacts, photos, fichiers, audio, SMS, calendrier | Non | Non | — | — | Aucun lu | — | — |
| Historique de navigation, recherches | Non | Non | — | — | Aucun | — | — |
| Informations financières | Non | Non | — | — | Aucune | — | — |
| Santé et forme | Non | Non | — | — | Aucune | — | — |
| Plantages / diagnostics | Non | Non | — | — | Aucun | — | — |

### 3.3 Pratiques de sécurité à cocher

- Données chiffrées en transit : sans objet (aucune transmission) — ne cocher que si Play Console l'impose.
- Possibilité de demander la suppression : voir §3.1 (réponse prudente « oui »).
- Conforme à la politique Familles : **à cocher** (audience incluant des enfants), voir `families-compliance.md`.
- Examen de sécurité indépendant : **non** (aucun audit tiers à ce jour).

## 4. SDK tiers (vérifié dans le build)

| Composant | Version | Données | Verdict |
|---|---|---|---|
| Capacitor Android | 8.6.0 | aucune collecte | OK |
| `@capacitor/app` | 8.1.2 | événements de cycle de vie, bouton Retour (local) | OK |
| `@capacitor-community/text-to-speech` | 8.0.2 | appelle le TTS système (local) | OK |
| Cordova framework (pont Capacitor) | 14.0.1 | aucune | OK |
| AndroidX (appcompat, coordinatorlayout, core-splashscreen) | voir `variables.gradle` | aucune | OK |
| Google Play services, Firebase, AdMob, Billing, RevenueCat | **absents** | — | OK |

La liste est confirmée par le fichier généré `android/app/capacitor.build.gradle` et par le manifeste fusionné release
(voir `release-audit.md` §4).

## 5. Points d'attention à connaître avant de répondre

1. **Liens externes dans l'espace parents** : l'ouverture d'un site officiel dans le navigateur n'envoie aucune donnée de Finot ;
   la page visitée relève de son éditeur. Cela ne constitue pas une collecte par Finot.
2. **Synthèse vocale** : un moteur TTS système peut, selon la voix choisie par l'utilisateur dans Android, utiliser un service réseau.
   Ce traitement n'est pas effectué par un SDK de Finot et n'est pas contrôlable par l'application. À mentionner dans la politique
   de confidentialité (voir `privacy-policy-draft.md`).
3. **Code parent** : stocké localement sous forme d'empreinte non cryptographique (32 bits, `hsh()` dans `js/app-actions.js`). C'est
   une barrière d'usage pour enfants, pas une authentification. Aucune transmission ; la sauvegarde Android est désactivée. Ne pas
   décrire ce code comme « chiffré » dans la fiche ou la politique.
4. **Suppression d'un profil = suppression des copies locales** (vérifié par `tests/profile-delete-purge.test.js`) : en plus du profil,
   `deleteProfile()` purge les copies de sécurité qui le contiennent (`mathquest_import_backup`, `mathquest_v1_backup`, copies brutes
   `mathquest_profiles_corrupt_backup_*`) et sa mémoire de rotation des questions. Les copies d'un autre profil sont conservées. En
   cas de doute (copie illisible), elle est supprimée. Le miroir `mathquest_v1` du profil actif est réécrit avec le nouveau profil actif.

## 6. Conditions qui invalident ce brouillon

À refaire **avant** de publier si l'un de ces points change :

- activation du suivi parent distant (Supabase) → des données (progression, prénom, codes de liaison) seraient transmises : il faudra
  déclarer *Activité dans l'application*, *Informations personnelles*, *Identifiants*, finalité « fonctionnalité de l'application »,
  chiffrement en transit, et fournir un moyen de suppression ;
- branchement d'un fournisseur d'analytics, de plantages ou de publicité ;
- ajout d'un SDK de paiement (Billing) ;
- ajout d'une permission Android (micro, notifications, etc.) ;
- changement de l'identifiant d'application (la déclaration est liée à l'application publiée).
