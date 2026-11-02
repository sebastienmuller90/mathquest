# Finot Académie — Politique de confidentialité (BROUILLON, non publié)

> **Statut : brouillon à relire par l'éditeur (idéalement avec un conseil juridique) avant toute publication.**
> Les éléments entre crochets `[À COMPLÉTER …]` sont des informations personnelles ou juridiques que **seul l'éditeur peut fournir**.
> Aucune société, adresse ou e-mail n'a été inventé. Ce texte décrit le comportement **réel** de la version Android V1 à la date du
> 01/11/2026 (vérifié dans le code, voir `data-safety-draft.md`). Il doit être recalculé si ce comportement change.

---

## Politique de confidentialité de Finot Académie

Dernière mise à jour : `[À COMPLÉTER : DATE DE PUBLICATION]`

### 1. Qui sommes-nous ?

Finot Académie est une application éducative (du CP à la 3e) éditée par :

- **Éditeur** : `[À COMPLÉTER : ÉDITEUR — nom ou raison sociale]`
- **Adresse** : `[À COMPLÉTER : ADRESSE POSTALE]`
- **Contact confidentialité** : `[À COMPLÉTER : CONTACT CONFIDENTIALITÉ — adresse e-mail]`

### 2. L'essentiel

- Finot Académie **fonctionne sans compte** et **sans connexion à Internet**.
- Les informations saisies dans l'application (prénom ou surnom, niveau, progression, réglages) **restent sur l'appareil**.
  Elles ne sont **pas envoyées** à l'éditeur ni à un tiers.
- L'application ne contient **aucune publicité**, **aucun traceur**, **aucun achat**, et n'utilise **ni micro, ni caméra, ni
  localisation, ni contacts**.

### 3. Les données et ce qu'elles deviennent

| Donnée | Pourquoi | Où | Envoyée hors de l'appareil ? |
|---|---|---|---|
| Prénom ou surnom, genre de l'assistant, niveau scolaire, compagnon choisi | personnaliser l'application | mémoire privée de l'application, sur l'appareil | **Non** |
| Réponses d'accueil (niveau ressenti, objectifs, rythme) | adapter les exercices | idem | **Non** |
| Progression, scores, erreurs, historique d'activités | proposer des révisions | idem | **Non** |
| Préférences (thème, son, mode dys, police) | confort de lecture | idem | **Non** |
| Code parent et clé de récupération | protéger l'espace parents | idem (sous forme d'empreinte) | **Non** |

L'application **ne lit** aucune autre donnée de l'appareil (pas de contacts, photos, fichiers, position, identifiant publicitaire,
identifiant d'appareil).

### 4. Enfants

Finot Académie s'adresse à des enfants. Aucune information n'est demandée à l'enfant au-delà d'un prénom ou surnom (il peut être
fictif). Aucune donnée d'enfant n'est transmise. Les liens vers des sites extérieurs sont **uniquement accessibles dans l'espace
parents**, protégé par un code ; l'espace enfant n'en contient aucun.

Nous recommandons aux parents de choisir un surnom plutôt qu'un nom complet.

### 5. Services tiers

- **Aucun service tiers** de statistiques, de publicité, de plantage ou de paiement n'est intégré.
- **Synthèse vocale** : la lecture à voix haute utilise le moteur vocal installé sur l'appareil Android (par exemple celui de
  Google). Selon la voix que vous choisissez dans les réglages d'Android, ce moteur peut utiliser un service en ligne ; ce
  traitement dépend de ce moteur et de ses propres conditions, pas de Finot Académie.
- **Liens externes** (espace parents) : sources officielles (par exemple education.gouv.fr). Leur contenu relève de leurs éditeurs.

### 6. Conservation et suppression

- Les données sont conservées **uniquement sur l'appareil**, tant que l'application est installée.
- **Supprimer un profil** : espace de choix des profils → supprimer (confirmation et code parent demandés). Cela supprime le profil
  **et les copies locales qui lui sont associées** (progression, copies de sécurité créées lors d'un import ou d'une migration,
  mémoire des questions déjà proposées). Les autres profils ne sont pas touchés.
- **Tout effacer** : désinstaller l'application, ou Réglages Android → Applications → Finot Académie → Stockage → Effacer les données.
- Finot Académie n'effectue **aucune sauvegarde cloud** et n'autorise pas le transfert automatique vers un autre appareil ;
  une réinstallation repart de zéro. Le parent peut exporter / importer volontairement une progression depuis l'espace parents.

### 7. Sécurité

Les données restent dans l'espace privé de l'application, protégé par le système Android. Le trafic réseau éventuel est limité au
HTTPS. L'espace parents est protégé par un code ; il s'agit d'une barrière d'usage pour les enfants, pas d'une protection
cryptographique contre une personne ayant un accès complet à l'appareil.

### 8. Vos droits

Les données n'étant pas transmises à l'éditeur, celui-ci n'en détient aucune copie : vous exercez directement vos droits d'accès,
de rectification et d'effacement dans l'application ou en la désinstallant. Pour toute question : `[À COMPLÉTER : CONTACT
CONFIDENTIALITÉ — adresse e-mail]`. Vous pouvez aussi saisir l'autorité de protection des données de votre pays (en France : la CNIL,
cnil.fr).

### 9. Évolutions futures

Si une fonction transmettait un jour des données (par exemple un suivi parent en ligne), elle serait **désactivée par défaut**,
activée **uniquement par un parent** après information claire, et cette politique serait mise à jour **avant** sa mise en service.

### 10. Modifications de cette politique

Toute modification sera publiée à la même adresse, avec une nouvelle date de mise à jour.

---

## Mise en ligne (à faire par l'éditeur — non fait)

Google Play exige une URL de politique de confidentialité :

| Exigence | Comment la satisfaire |
|---|---|
| URL **HTTPS publique** | héberger la version finale sur une page stable (site de l'éditeur ou page GitHub Pages du dépôt public) ; saisir l'URL dans Play Console → Contenu de l'application → Politique de confidentialité |
| Accessible **sans connexion** | page statique, sans compte ni mur d'inscription |
| **Non géobloquée** | ne pas restreindre par pays ; tester depuis un autre réseau |
| Même contenu en **français**, nom de l'application et de l'éditeur visibles | reprendre le titre et l'identité ci-dessus |
| **Accessible depuis l'application** | ajouter dans l'espace parents un lien vers cette URL (le module `js/link-policy.js` autorise déjà les liens externes dans l'espace parents) — **changement de code à traiter dans un chantier séparé, après choix de l'URL** |
| Cohérente avec Data Safety | relire `data-safety-draft.md` en même temps |

URL finale : `[À COMPLÉTER : URL HTTPS DE LA POLITIQUE]`

**Ce brouillon n'a pas été publié.**
