# Finot Académie — distribution à 12 testeurs (documents préparatoires)

Rédigé le **09/11/2026**. Ces documents **préparent** le test ; rien n'est lancé.

> **État réel à cette date** : compte Play Console non confirmé actif, aucun testeur inscrit, aucun test sur appareil physique, pas de signature de production, AAB `8075016` **non signé**. Aucun document ci-dessous ne doit être lu comme une preuve du contraire.

## Contenu

| Fichier | Usage |
|---|---|
| [01-checklist-organisateur.md](01-checklist-organisateur.md) | Étapes à cocher par l'éditeur dans la Play Console |
| [02-message-aux-testeurs.md](02-message-aux-testeurs.md) | Message d'invitation (version standard et « parent + enfant ») |
| [03-scenarios-de-test.md](03-scenarios-de-test.md) | Scénarios numérotés à exécuter par les testeurs |
| [04-recueil-anomalies.md](04-recueil-anomalies.md) | Fiche d'anomalie, gravités, critères d'acceptation proposés |
| [05-suivi-12-testeurs.csv](05-suivi-12-testeurs.csv) | Tableau de suivi vierge (à garder **hors Git** une fois rempli) |

Documents existants à ne pas dupliquer : [closed-test-plan.md](../closed-test-plan.md) (plan 12/14 jours), [play-console-checklist-ordonnee.md](../play-console-checklist-ordonnee.md), [signing.md](../signing.md), [physical-device-validation.md](../physical-device-validation.md), [final-human-inputs.md](../final-human-inputs.md).

## Les pistes de test Google Play

| Piste | Testeurs | Particularités |
|---|---|---|
| **Interne** | jusqu'à 100 testeurs par appli | Rapide à diffuser ; les tests internes peuvent ne pas subir la revue de règles habituelle ; pas de minimum de testeurs ni de durée. Utile pour vérifier l'installation et la signature avant le test fermé. |
| **Fermé** | listes e-mail (jusqu'à 2 000 testeurs par liste, 50 listes par piste) ou Google Groups (sans limite de taille) | Nécessite une appli entièrement configurée. C'est cette piste qui compte pour la règle « 12 testeurs / 14 jours ». Les avis des testeurs n'affectent pas la note publique. |
| **Ouvert** | illimité par défaut | Visible publiquement ; d'après la page Google consultée, accessible seulement après l'obtention de l'accès production pour les comptes concernés. |
| **Production** | public | Pour un compte soumis à la règle : après un test fermé conforme et une demande d'accès. |

Le lien d'inscription (opt-in) n'apparaît que lorsque la version est au statut « Publiée » ; en « Brouillon » ou « En attente de publication », il n'existe pas. Avec un Google Group, chaque testeur doit **d'abord rejoindre le groupe**, puis accepter le test.

## Accès à la production pour un nouveau compte développeur

Source officielle principale : <https://support.google.com/googleplay/android-developer/answer/14151465?hl=en> — consultée le **09/11/2026**.

- **Comptes concernés** : comptes développeur **personnels créés après le 13 novembre 2023**.
- **Condition** : un test fermé avec **au moins 12 testeurs** inscrits **en continu pendant au moins 14 jours**. Un testeur qui s'inscrit puis se désinscrit avant 14 jours ne compte pas.
- **Ensuite** : bouton « Demander l'accès à la production » (« Apply for production ») du tableau de bord, avec trois sections : « À propos de votre test fermé », « À propos de votre appli », « À propos de la préparation à la production ». Délai indiqué par Google : en général 7 jours ou moins, parfois plus.
- **Comptes organisation** : la page consultée ne vise que les comptes personnels ; des sources secondaires indiquent que les comptes organisation sont exemptés, mais **cela n'est pas confirmé par une source officielle lue intégralement** : à vérifier dans la Console du compte. Le type de compte reste une **décision humaine** (voir [play-console-checklist-ordonnee.md](../play-console-checklist-ordonnee.md), §0).

Seconde source officielle : <https://support.google.com/googleplay/android-developer/answer/9845334?hl=en> (limites par piste, opt-in), consultée le **09/11/2026**.

### Non confirmé

- Type (personnel/organisation) et date de création du compte d'UpFactory Apps : inconnus.
- Libellés exacts des écrans de la Console (non consultée, faute de compte) : à lire à l'écran.
- Durée de revue d'une première version en test fermé ou interne : non précisée par les pages lues.

## Recommandation

Viser **15 à 18 invitations** pour absorber les désistements, même si 12 testeurs sont prévus (cf. [closed-test-plan.md](../closed-test-plan.md)). Avec exactement 12, un seul désistement avant 14 jours fait perdre le décompte.
