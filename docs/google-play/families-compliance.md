# Finot Académie — Audit Politique Familles / enfants (Google Play)

Audit de la base `main@4f9444d` pour une audience **incluant des enfants** (CP → 3e, soit environ 6 à 15 ans). Fondé sur le code,
le manifeste fusionné et la recette sur émulateurs, pas sur la seule documentation. Ce n'est pas un avis juridique : la déclaration
finale reste sous la responsabilité de l'éditeur.

Légende : **CONFORME** (vérifié dans le code), **À DÉCIDER** (décision de l'éditeur), **ATTENTION** (point à connaître).

## 1. Nature de l'application (point important pour la revue Google)

Finot **n'est pas** un navigateur vers un site distant. Vérifié :

- `capacitor.config.json` : `webDir: "www"`, **aucun** `server.url` ; origine figée `https://localhost` (assets locaux) ;
- le paquet web (`index.html`, `js/`, `data/`, `fonts/`, CSS) est copié dans `android/app/src/main/assets/public` par `cap sync`
  et embarqué dans l'AAB (`assets/public/…`, environ 1 900 fichiers) ;
- le seul appel réseau applicatif du dépôt est le suivi parent distant, **désactivé** (voir `data-safety-draft.md` §2) ;
- recette émulateur en **mode avion** : démarrage complet, profil et exercices fonctionnels (test « Démarrage hors ligne »).

Conséquence : fonctionnement **hors ligne par défaut**, contenu pédagogique embarqué.

## 2. Tableau de conformité

| Sujet | Constat vérifié | Statut |
|---|---|---|
| Contenu approprié | Programme scolaire français, ton éducatif ; aucun contenu violent, sexuel, de jeu d'argent ni de produit réglementé. Les pièces/XP sont des récompenses internes sans valeur monétaire. | CONFORME |
| Espace parent | Code parent (4 à 8 chiffres) créé au premier accès ; clé de récupération ; navigation protégée par `MQParentGate`. | CONFORME (voir ATTENTION 1) |
| Liens externes | Espace enfant : **aucun lien ne sort** (texte seul : libellé + domaine) ; garde globale `js/link-policy.js` bloque tout lien ou `window.open` externe hors espace parents ; espace parents : sources officielles `education.gouv.fr` / `eduscol.education.gouv.fr`, `rel="noopener noreferrer"`, navigateur du système. Test dédié `tests/external-links.test.js`. | CONFORME |
| Achats / abonnements | Aucun achat intégré, aucun SDK Billing. `js/entitlements.js` est une interface sans fournisseur branché. | CONFORME (V1 gratuite) |
| Publicité | Aucun SDK, aucune bannière, aucun identifiant publicitaire (`AD_ID` retiré du manifeste). | CONFORME |
| Analytics / plantages | Aucun fournisseur ; `js/analytics.js` ne transmet rien par défaut et exige un accord parent explicite. | CONFORME |
| Permissions | `INTERNET` seule. Pas de micro, caméra, localisation, contacts, stockage large, notifications. | CONFORME |
| Données personnelles | Rien ne quitte l'appareil (voir `data-safety-draft.md`). Sauvegarde Android et transfert d'appareil désactivés. | CONFORME |
| Communication entre utilisateurs | Aucune : pas de chat entre personnes, pas de réseau social, pas de partage public, pas de contenu généré par les utilisateurs visible par d'autres. | CONFORME |
| Assistant Finot (chat) | Réponses **locales** (aucun appel réseau, aucun modèle de langage distant) ; saisie libre limitée à l'appareil. | CONFORME |
| Aide aux devoirs | Moteur local de recherche dans les cours embarqués ; aucune requête réseau. | CONFORME |
| Dark patterns | Pas de compte à rebours d'achat, pas de culpabilisation pour inciter à payer ou à revenir ; accès libre à tous les cours (pas de déblocage séquentiel). | CONFORME (à reconfirmer si une monétisation est ajoutée) |
| Publicité agressive | Sans objet (aucune publicité). | CONFORME |
| Accessibilité | Mode dys, thème sombre, taille de police agrandie validés sur émulateurs (PR #45). | CONFORME |
| Suppression des données | Suppression d'un profil dans l'app ; désinstallation efface tout. | CONFORME (voir ATTENTION 2) |

## 3. Points d'attention

1. **ATTENTION 1 — Solidité du code parent.** Le code est stocké sous forme d'empreinte 32 bits non cryptographique
   (`hsh()` dans `js/app-actions.js`). C'est une barrière d'usage pour enfants, pas un mécanisme d'authentification. Sans transmission
   ni sauvegarde, le risque est limité à un accès physique à l'appareil. Ne pas le présenter comme « chiffré ». Renforcement possible
   dans un chantier ultérieur (hors périmètre de la préparation Google Play).
2. **Suppression d'un profil (corrigé dans la PR #46).** Supprimer un profil purge aussi ses copies locales
   (`mathquest_import_backup`, `mathquest_v1_backup`, copies brutes `mathquest_profiles_corrupt_backup_*`, mémoire de rotation des
   questions) ; test `tests/profile-delete-purge.test.js`. Les copies d'un autre profil restent intactes.
3. **ATTENTION 3 — Synthèse vocale.** Voix du système Android ; une voix « réseau » choisie par l'utilisateur peut contacter un
   service tiers, hors contrôle de Finot. À mentionner dans la politique de confidentialité.
4. **Suivi parent distant (futur).** S'il est activé un jour, il transmettra des données d'enfants à un serveur : la Politique Familles,
   la fiche Data Safety, la politique de confidentialité et un consentement parental explicite devront être revus avant publication.

## 4. Décisions à prendre par l'éditeur (À DÉCIDER AVANT PUBLICATION)

- **Public cible déclaré** : tranches d'âge à cocher dans Play Console (voir `play-console-answers-draft.md`). Cocher « moins de 13 ans »
  place l'application sous la Politique Familles ; programme **Designed for Families** : candidature facultative, à décider.
- **Monétisation** : aucune en V1. Toute publicité ou tout achat futur doit utiliser des SDK certifiés Familles et respecter la politique.
- **Page de politique de confidentialité** : URL publique HTTPS à fournir (voir `privacy-policy-draft.md` §« Mise en ligne »).

## 5. Preuves reproductibles

| Vérification | Où |
|---|---|
| Manifeste, permissions, backup, réseau | `tests/android-project.test.js` ; `docs/google-play/release-audit.md` §4 |
| Liens externes | `tests/external-links.test.js` |
| Absence de micro et prononciation sans micro | `tests/speech-capability.test.js` ; recette AVD (test « Prononciation sans faux micro ») |
| Aucun appel réseau hors suivi distant | `tests/remote-sync-flag.test.js`, `tests/analytics-guard.test.js`, `tests/entitlements-guard.test.js` |
| Hors ligne | recette émulateurs (mode avion) ; `tests/pwa-update.test.js` |
