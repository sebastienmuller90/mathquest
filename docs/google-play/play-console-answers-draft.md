# Finot Académie — Réponses probables Play Console (BROUILLON)

À reporter dans Play Console par l'éditeur. État vérifié le **02/11/2026** contre `main@03b2f1cb4b8c235c374c5be249472d310ca96525` et les exigences Google Play publiques disponibles ce jour-là.

Toute réponse dépendant encore d'une décision commerciale, juridique ou d'identité reste marquée **À DÉCIDER AVANT PUBLICATION**. Rien n'est soumis par ce document.

## 1. Application

| Question | Réponse |
|---|---|
| Nom | **Finot Académie** |
| Application ou jeu | **Application** |
| Gratuite ou payante | proposition V1 : **gratuite** — À DÉCIDER AVANT PUBLICATION |
| Identifiant | `fr.finot.academie` — conserver cet identifiant lors de la création dans Play Console |
| Catégorie | **Éducation** |
| Nom public éditeur | **UpFactory Apps** |
| Coordonnées | **upfactory.apps@gmail.com** |
| Politique de confidentialité | URL technique prévue `https://sebastienmuller90.github.io/mathquest/docs/google-play/privacy-policy-public.html` — à déclarer seulement après finalisation juridique de la page |

## 2. Public cible et contenu

| Question | Réponse proposée |
|---|---|
| Tranches d'âge cibles | **6–8 ans, 9–12 ans et 13–15 ans**, correspondant réellement au produit CP → 3e |
| Destinée aux enfants ? | **Oui** : l'audience inclut des enfants ; la Politique Familles est donc à traiter explicitement |
| Programme Designed for Families | candidature distincte/facultative selon les options proposées au compte — À DÉCIDER AVANT PUBLICATION |
| Publicité destinée aux enfants | **Aucune publicité** |
| Contenu | éducatif ; pas de violence explicite, sexualité, jeu d'argent, drogue ou contenu social partagé |

## 3. Classification du contenu (IARC)

Catégorie attendue : éducation/référence selon le questionnaire affiché.

Le binaire V1 ne contient pas de violence explicite, sexualité, langage grossier, drogues, jeu d'argent, achats numériques, partage public de contenu utilisateur, réseau social ni partage de localisation.

La classification finale doit être obtenue en répondant au questionnaire officiel ; ne pas pré-déclarer une classification comme acquise avant validation de Play Console.

## 4. Déclarations de l'application

| Rubrique | Réponse | Preuve |
|---|---|---|
| App access | **Toutes les fonctions sont accessibles sans compte utilisateur** | aucun système de connexion V1 |
| Publicités | **Non** | aucun SDK publicitaire ; `AD_ID` absent |
| Achats intégrés / abonnements | **Aucun en V1** | aucun fournisseur de paiement actif |
| Advertising ID | **Non utilisé** | permission absente |
| Réseau social / chat entre utilisateurs | **Aucun** | le chat Finot est un assistant local, pas une communication entre utilisateurs |
| Contenu généré par l'utilisateur partagé | **Aucun** | les saisies/progrès restent locaux |
| Accès Internet | permission `INTERNET` présente ; application utilisable hors connexion | manifeste + recettes Android |
| Data Safety | V1 actuelle : **aucune donnée collectée ni partagée par l'éditeur** | `data-safety-draft.md` + audit code |
| Permissions sensibles | **Aucune** pour micro, caméra, localisation, contacts, SMS/appels | manifeste |
| Foreground service | **Aucun** | manifeste |
| Appareils cibles | téléphones et tablettes Android ; `minSdk` 24 ; `targetSdk` 36 | configuration Android |
| Target API Google Play | **API 36 — conforme à l'exigence applicable depuis le 31/08/2026** | configuration + build release |
| Pays / régions | `[À DÉCIDER AVANT PUBLICATION]` |
| Prix | proposition V1 : gratuit — `[À DÉCIDER AVANT PUBLICATION]` |
| Familles | relire et appliquer `families-compliance.md` lors de la saisie réelle |

## 5. Tests et accès production

| Sujet | Information vérifiée le 02/11/2026 |
|---|---|
| Test interne | disponible sans exigence de testeurs minimum ; recommandé pour vérifier le premier AAB signé |
| Nouveau compte développeur **personnel** créé après le 13/11/2023 | avant accès production, Google exige un **test fermé avec au moins 12 testeurs inscrits en continu pendant au moins 14 jours** |
| Continuité | un testeur qui se désinscrit avant la fin ne compte pas ; une réinscription redémarre sa période continue |
| Demande d'accès production | après satisfaction des critères applicables, répondre dans Play Console aux questions sur le test, l'application et sa préparation |
| Compte non concerné par cette règle précise | vérifier l'écran réel du compte ; ne pas appliquer mécaniquement la règle 12/14 si Play Console indique un autre parcours |

Plan recommandé : **test interne → test fermé si applicable → demande d'accès production → production**.

## 6. Assets Store nécessaires

- icône Store : **512×512, PNG 32 bits, sRGB, ≤ 1 024 Ko**, carré plein ; Google Play applique son masque/ombre ;
- feature graphic : **1 024×500**, JPEG ou PNG 24 bits sans alpha ;
- captures téléphone et tablette reflétant le vrai produit avec profil fictif ;
- aucune capture ne doit contenir de donnée réelle d'enfant ;
- set commercial recommandé : `store-screenshot-selection.md`.

Voir `store-assets-checklist.md` et `ASSET_STATUS_2026-11-02.md`.

## 7. Ce qui NE doit PAS être déclaré en V1

Publicité, achats, abonnements, compte cloud, suivi parent distant actif, synchronisation cloud active, reconnaissance vocale/micro, localisation, caméra, notifications push ou fonctions sociales.

Toute évolution vers l'une de ces fonctions impose une nouvelle revue des déclarations Play Console, Data Safety, politique de confidentialité et, puisque l'application vise des enfants, conformité Familles **avant** mise en production.

## 8. Références externes à revalider au dépôt

- Google Play Console Help — exigences de test des nouveaux comptes développeur personnels.
- Android Developers — exigence du niveau d'API cible Google Play.
- Google Play Console Help / Android Developers — spécifications des assets Store.

Les politiques Google peuvent évoluer : la Play Console affichée au compte de l'éditeur reste l'autorité finale au moment de la soumission.
