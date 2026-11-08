# Finot Académie — Politique de confidentialité (source de référence)

> **Statut : contenu finalisé pour la V1 Android.**
> Vérifié le **03/11/2026** contre le comportement local-only de la V1 et les exigences Google Play publiques applicables.
> Le nom public éditeur et l'e-mail de contact sont confirmés. L'identité légale et l'adresse demandées pour la vérification du compte développeur restent renseignées directement dans Google Payments / Play Console et ne sont pas des champs nécessaires de cette page publique.

La version HTML publique correspondante est `privacy-policy-public.html`.

---

## Politique de confidentialité de Finot Académie

Dernière mise à jour : **4 novembre 2026**

### 1. Qui sommes-nous ?

Finot Académie est une application éducative du CP à la 3e publiée sous le nom public **UpFactory Apps**.

- **Application** : Finot Académie
- **Nom public éditeur** : UpFactory Apps
- **Contact confidentialité / support** : `upfactory.apps@gmail.com`

### 2. L'essentiel

- Finot Académie fonctionne **sans compte utilisateur** et peut être utilisée **hors connexion**.
- Les informations saisies dans l'application (prénom ou surnom, genre, date de naissance facultative, niveau, progression, réglages) restent sur l'appareil dans la V1 Android actuelle et ne sont pas envoyées à l'éditeur.
- L'application ne contient **aucune publicité**, **aucun traceur**, **aucun achat intégré** dans cette version.
- L'application ne demande pas l'accès au **micro**, à la **caméra**, à la **localisation** ni aux **contacts**.

### 3. Données utilisées localement

| Donnée | Pourquoi | Où | Envoyée hors de l'appareil ? |
|---|---|---|---|
| Prénom ou surnom (demandé à la création d'un profil), avatar ou compagnon choisi, niveau scolaire, réglages de profil | personnaliser l'application | stockage privé de l'application | **Non** |
| Genre (choix proposé à la création d'un profil) | adapter les formulations de l'application | stockage privé de l'application | **Non** |
| Date de naissance (**facultative**) | adapter les explications à l'âge et afficher un message le jour de l'anniversaire | stockage privé de l'application | **Non** |
| Réponses d'accueil (niveau ressenti, objectifs, rythme) | adapter les activités | stockage privé de l'application | **Non** |
| Progression, scores, erreurs, historique d'activités | proposer des révisions et un suivi local | stockage privé de l'application | **Non** |
| Préférences (thème, son, mode dys, police) | confort et accessibilité | stockage privé de l'application | **Non** |
| Code parent et clé de récupération | protéger l'espace parents | stockage local sous forme adaptée à la vérification | **Non** |

L'application ne lit pas les contacts, photos, position, identifiant publicitaire ou autres données personnelles de l'appareil nécessaires à aucune fonction V1.

### 4. Enfants

Finot Académie s'adresse notamment à des enfants. Un prénom ou surnom peut être utilisé pour personnaliser l'expérience ; nous recommandons aux parents d'utiliser un surnom plutôt qu'un nom complet.

Aucune donnée d'enfant n'est transmise à l'éditeur dans la version décrite ici. Les liens externes éventuels sont réservés à l'espace parents protégé par un code.

### 5. Services tiers

- Aucun service tiers de publicité, analytics, paiement ou synchronisation cloud de production n'est intégré à la V1 Android décrite ici.
- La lecture à voix haute utilise le moteur de synthèse vocale installé sur l'appareil. Selon le moteur choisi dans les réglages Android, ce moteur peut lui-même utiliser un service en ligne régi par ses propres conditions.
- Les liens externes réservés à l'espace parents ouvrent des sites relevant de leurs éditeurs respectifs.

### 6. Conservation et suppression

- Les données sont conservées localement tant que l'application et le profil concerné existent sur l'appareil.
- Supprimer un profil supprime également les copies locales associées prévues par l'application, sans supprimer les autres profils.
- Désinstaller l'application ou effacer ses données depuis les réglages Android supprime le stockage local de Finot Académie.
- La sauvegarde cloud automatique et le transfert automatique des données de l'application sont désactivés.
- Le parent peut utiliser volontairement les fonctions manuelles d'export/import proposées dans l'espace parents.

### 7. Sécurité

Les données restent dans l'espace privé de l'application géré par Android. Le trafic réseau éventuellement autorisé est limité aux connexions sécurisées. L'espace parents est protégé par un code de 4 à 8 chiffres destiné à séparer l'usage enfant/parent : la création du premier code est précédée d'un petit calcul réservé aux adultes, le code est identique pour tous les profils de l'appareil et les essais successifs sont ralentis après plusieurs erreurs. Ce code reste une barrière d'usage, non un secret fort ; il ne constitue pas une protection cryptographique contre une personne disposant d'un accès complet à l'appareil.

### 8. Vos droits

Dans la version décrite ici, l'éditeur ne reçoit pas de copie des données de progression de l'enfant. Les données locales peuvent être corrigées ou supprimées depuis l'application, ou supprimées en désinstallant l'application / en effaçant ses données.

Pour toute question relative à la confidentialité ou à l'exercice de vos droits : `upfactory.apps@gmail.com`.

En France, vous pouvez également introduire une réclamation auprès de la Commission nationale de l'informatique et des libertés (CNIL).

### 9. Évolutions futures

Si une version future activait une fonction transmettant des données (par exemple synchronisation ou suivi parent en ligne), cette politique, les déclarations Google Play et les mécanismes de consentement seraient revus **avant** l'activation en production.

### 10. Modifications de cette politique

Toute modification sera publiée à la même adresse avec une nouvelle date de mise à jour.

---

## Mise en ligne — contrôles restants

1. Laisser GitHub Pages redéployer `main` après fusion.
2. Ouvrir sans authentification : `https://sebastienmuller90.github.io/mathquest/docs/google-play/privacy-policy-public.html`.
3. Vérifier le rendu mobile et l'absence de placeholder.
4. Reporter exactement cette URL dans Play Console.
5. Ajouter la même URL dans l'espace Parents de l'application avant le build final.
6. Revalider `data-safety-draft.md` contre l'AAB signé final.

URL finale prévue : `https://sebastienmuller90.github.io/mathquest/docs/google-play/privacy-policy-public.html`
