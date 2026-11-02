# Finot Académie — Réponses probables Play Console (BROUILLON)

À reporter dans Play Console par l'éditeur. Les réponses vérifiées dans le code sont données ; toute réponse qui dépend d'une décision
commerciale, juridique ou de public reste marquée **À DÉCIDER AVANT PUBLICATION**. Rien n'est soumis par ce document.

## 1. Application

| Question | Réponse |
|---|---|
| Nom | Finot Académie |
| Application ou jeu | **Application** |
| Gratuite ou payante | **Gratuite** — ⚠ choix **définitif** : une application gratuite ne peut plus devenir payante. À DÉCIDER AVANT PUBLICATION |
| Identifiant | `fr.finot.academie` — définitif une fois publié. À DÉCIDER AVANT PUBLICATION (confirmer) |
| Catégorie | Éducation |
| Coordonnées | `[À COMPLÉTER : e-mail public]` |
| Politique de confidentialité | `[À COMPLÉTER : URL HTTPS]` — voir `privacy-policy-draft.md` |

## 2. Public cible et contenu

| Question | Réponse proposée |
|---|---|
| Tranches d'âge cibles | CP → 3e ≈ 6 à 15 ans. Cocher les tranches **6-8, 9-12, 13-15** ; ajouter « 5 ans et moins » seulement si le contenu est réellement conçu pour eux (non). À DÉCIDER AVANT PUBLICATION |
| L'appli est-elle destinée aux enfants ? | **Oui** (audience incluant des enfants de moins de 13 ans) → Politique Familles applicable : voir `families-compliance.md` |
| Programme « Designed for Families » | Candidature facultative. À DÉCIDER AVANT PUBLICATION |
| Attire-t-elle involontairement les enfants ? | Sans objet (ciblée) |
| Contenu publicitaire destiné aux enfants | **Aucun** |
| Détails du contenu (public) | Contenu éducatif ; aucune violence, sexualité, jeu d'argent, drogue, langage cru |

## 3. Questionnaire de classification du contenu (IARC)

Catégorie : « Référence, actualités ou éducation ». Réponses attendues : **Non** à violence, sexe, langage grossier, substances,
jeux d'argent, contenu généré par les utilisateurs partagé, partage de localisation, achats numériques. Classification attendue :
tous publics (PEGI 3 / ESRB Everyone). À confirmer en remplissant le questionnaire officiel au moment du dépôt.

## 4. Déclarations de l'application

| Rubrique | Réponse | Preuve |
|---|---|---|
| Accès à l'application (App access) | **Toutes les fonctions sont accessibles sans identifiant** ni compte ; pas d'instructions de connexion | aucune connexion dans le code |
| Publicités | **Non, l'application ne contient pas de publicités** | aucun SDK ; `AD_ID` retiré |
| Achats intégrés / abonnements | **Aucun** (V1). Si une monétisation est décidée plus tard : À DÉCIDER AVANT PUBLICATION | `js/entitlements.js` sans fournisseur |
| Identifiant publicitaire (Advertising ID) | **Non utilisé** (permission absente) ; déclarer « non » | manifeste |
| Applications d'actualités / santé / finance / gouvernement | **Non** | — |
| Fonctionnalités de réseau social / chat entre utilisateurs | **Aucune** | pas de communication entre utilisateurs |
| Contenu généré par l'utilisateur | **Aucun** partagé (les saisies restent locales) | pas de partage |
| Accès à Internet | Permission `INTERNET` déclarée (fonctionnalité de suivi parent distant désactivée) ; l'appli est utilisable hors ligne | manifeste |
| Sécurité des données (Data Safety) | voir `data-safety-draft.md` : **aucune donnée collectée ni partagée** | audit du code |
| Autorisations sensibles / SMS / appels / accessibilité / VPN / exact alarms | **Aucune** | manifeste |
| Services de premier plan (foreground service) | **Aucun** | manifeste |
| Applications de santé, COVID, pharmacie | **Non** | — |
| Appareils cibles | téléphones et tablettes ; `minSdk` 24 (Android 7.0) ; orientation libre | manifeste |
| Pays / régions | À DÉCIDER AVANT PUBLICATION (France seule ou plus large ; le contenu est en français) |
| Prix | gratuit (voir §1) |
| Distribution (Google Play Pass, programmes) | Non applicable en V1. À DÉCIDER AVANT PUBLICATION |
| Conformité export / lois américaines | cocher selon réalité (aucun chiffrement propriétaire : HTTPS standard uniquement) |
| Code de conduite Familles (cases à cocher) | **À cocher** après relecture de `families-compliance.md` |
| Conformité « Child Safety Standards / CSAE » (si demandée par Play Console) | pas de contenu généré par les utilisateurs ni de communication ; à confirmer selon l'écran affiché. À DÉCIDER AVANT PUBLICATION |

## 5. Pistes de test et prérequis de production

| Sujet | Information |
|---|---|
| Compte développeur | **HUMAN ACTION** : inscription (frais unique), vérification d'identité, nom de développeur public |
| Tests obligatoires avant production | Les **comptes développeur personnels créés après le 13/11/2023** doivent mener un **test fermé** (12 testeurs minimum pendant 14 jours consécutifs) avant de demander l'accès à la production ; les comptes **organisation** en sont dispensés. À confirmer dans Play Console au moment de l'inscription (règle susceptible d'évoluer). |
| Piste conseillée | Test interne → test fermé → production |

## 6. Ce qui NE doit PAS être déclaré (il n'existe pas)

Publicité, achats, abonnements, suivi distant, comptes, reconnaissance vocale / micro, localisation, caméra, notifications.
Toute évolution vers l'une de ces fonctions déclenche : mise à jour Data Safety, politique de confidentialité, déclarations ci-dessus
et, pour les enfants, revue Politique Familles.
