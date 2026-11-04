# Finot Académie — Checklist unique Play Console (ordre des écrans)

Rédigée le **04/11/2026**. Rien n'est soumis. Chaque champ porte soit une valeur **À SAISIR** (copier/coller), soit **DÉCISION HUMAINE**. Aucune identité légale, adresse ni numéro n'est inventé : ces champs sont toujours « décision humaine ».

Réserve : l'ordre des écrans reproduit le tableau de bord « Configurer votre application » tel que documenté par Google ; la Play Console du compte reste l'autorité (l'interface n'a pas pu être consultée sans compte). Les valeurs de référence viennent de `play-console-answers-draft.md`, `data-safety-draft.md`, `families-compliance.md`, `store-listing-fr.md`, `store-listing-en.md` et `docs/stores/verification-conformite-2026-11.md`.

## 0. Avant la création de l'application

| Élément | Valeur |
|---|---|
| Compte développeur (personnel ou organisation) | **DÉCISION HUMAINE** — conditionne le test fermé (§13) |
| Nom légal, adresse légale, téléphone de vérification, pays du compte | **DÉCISION HUMAINE** (jamais « UpFactory Apps » si le champ demande un nom légal) |
| Statut « trader » (DSA, UE) et affichage public de l'adresse | **DÉCISION HUMAINE** (source Google non confirmée, G14) |
| Vérification des développeurs Android / nom de paquet | À contrôler en Console (G13) |
| AAB signé final + SHA-256 archivé, clé d'upload sauvegardée | Voir `signing.md`, `final-human-inputs.md` §4 |

## 1. Créer l'application

| Champ | Valeur |
|---|---|
| Nom de l'application (≤ 30) | `Finot Académie` (14) |
| Langue par défaut | `Français – fr-FR` |
| Application ou jeu | **Application** |
| Gratuite ou payante | **Gratuite** (V1 sans achat). À confirmer avant de valider : le passage gratuit → payant est généralement impossible ensuite (à vérifier à l'écran) |
| Déclarations (règles du programme, lois américaines d'exportation) | Cocher après lecture : **DÉCISION HUMAINE** |
| Identifiant de paquet (fixé par l'AAB) | `fr.finot.academie` |

## 2. Politique de confidentialité

| Champ | Valeur |
|---|---|
| URL | `https://sebastienmuller90.github.io/mathquest/docs/google-play/privacy-policy-public.html` |

Cohérence vérifiée le 04/11/2026 : cette URL est la seule présente dans le dépôt (13 occurrences, aucune variante). **Avant saisie** : ouvrir l'URL sans authentification (GitHub Pages après fusion de `main`) — non démontré par le dépôt.

## 3. Accès à l'application (App access)

**Toutes les fonctions sont accessibles sans identifiant** (aucun compte, aucune connexion). Le code Parents est local et se crée dans l'application. Aucune instruction d'identifiants à fournir.

## 4. Publicités

**Non**, l'application ne contient pas de publicité (aucun SDK ; `AD_ID` retiré par `tools:node="remove"`).

## 5. Classification du contenu (IARC)

Catégorie du questionnaire : **Référence, actualités ou éducation** (libellé exact à lire à l'écran). E-mail demandé : `upfactory.apps@gmail.com`.

Réponses attendues, justifiées par le contenu réel :

| Thème | Réponse | Justification |
|---|---|---|
| Violence | Non | Contenu scolaire. L'histoire peut évoquer les guerres de façon pédagogique : si le questionnaire interroge le contenu historique/documentaire, lire l'écran, **DÉCISION HUMAINE** |
| Sexualité / nudité | Non | Aucun contenu explicite. Une matière « EVARS » (éducation à la vie affective) existe au collège : lire l'écran, **DÉCISION HUMAINE** |
| Langage grossier | Non | — |
| Substances (drogue, alcool, tabac) | Non | Prévention santé possible en SVT/EMC : lire l'écran |
| Jeux d'argent | Non | — |
| Achats numériques | Non | Aucun fournisseur de paiement |
| Interaction entre utilisateurs / contenu partagé | Non | Le chat Finot est un assistant local |
| Partage de localisation | Non | — |
| Navigation Internet libre | Non | Liens externes réservés à l'espace Parents protégé, ouverts dans le navigateur du système |

La classification finale est celle que renvoie Google : ne pas l'annoncer d'avance.

## 6. Public cible et contenu

| Champ | Valeur |
|---|---|
| Tranches d'âge | **6–8 ans, 9–12 ans, 13–15 ans** (ne pas cocher « 5 ans et moins » ni « 16 et plus » pour élargir artificiellement) |
| Destinée aux enfants | **Oui, l'audience inclut des enfants** → Politique Familles applicable (G7/G8 de `docs/stores/verification-conformite-2026-11.md`, `families-compliance.md`) |
| Programme « Designed for Families » | **DÉCISION HUMAINE** (candidature facultative) |
| Publicité | Aucune |

## 7. Sécurité des données (Data safety)

Source : `data-safety-draft.md` (à rejouer sur le binaire signé final).

| Question | Valeur |
|---|---|
| Collecte ou partage de données utilisateur requises ? | **Non** |
| Chiffrement en transit / suppression | Sans objet (aucune transmission) ; si demandé : HTTPS seul autorisé ; suppression d'un profil dans l'application ou désinstallation |
| Lien de politique de confidentialité | URL du §2 |

Cohérence avec la permission `INTERNET` : elle est déclarée (manifeste) mais **aucune requête sortante vers un serveur distant n'est active en V1**. Vérifié le 04/11/2026 par recherche dans le code : le seul appel distant est le RPC de suivi parent (`js/app-state.js`, dupliqué dans `parent.html`), inactif tant que `window.FINOT_REMOTE_SYNC` n'est pas défini (`js/remote-sync-config.js` : `enabled` faux par défaut, URL `*.supabase.co` exigée) ; les autres `fetch` sont de même origine (`js/app-pwa.js`, `sw.js`) ; aucune URL externe dans `index.html` ni `sw.js`. Point à signaler : la synthèse vocale système peut utiliser une voix réseau choisie par l'utilisateur (traitée par le moteur Android, pas par Finot ; mentionnée dans la politique §5). Retirer `INTERNET` est une option produit non retenue ici.

## 8. ID publicitaire

**Non** : l'application n'utilise pas l'identifiant publicitaire ; permission `AD_ID` absente. Contrôler le manifeste fusionné de l'AAB final.

## 9. Autres déclarations du tableau de bord

Applications gouvernementales : **Non**. Fonctionnalités financières : **Aucune**. Applications de santé : **Non** (contenu pédagogique ; lire l'écran). Toute question imprévue : **DÉCISION HUMAINE**.

## 10. Catégorie, tags, coordonnées

| Champ | Valeur |
|---|---|
| Catégorie | **Éducation** |
| Tags | **DÉCISION HUMAINE** : liste fermée de la Console ; choisir uniquement des tags éducatifs réellement vrais |
| E-mail de support (public) | `upfactory.apps@gmail.com` |
| Téléphone | **DÉCISION HUMAINE** (facultatif ; ne rien inventer) |
| Site web | **DÉCISION HUMAINE** (facultatif ; l'URL de base GitHub Pages existe mais n'est pas une page d'accueil dédiée) |

## 11. Fiche principale

Français (langue par défaut), à copier depuis `store-listing-fr.md` : nom (14/30), description courte (75/80), description longue (1 564/4 000).

Traduction anglaise, à copier depuis `store-listing-en.md` : nom (14/30), description courte (69/80), description longue (1 530/4 000).

Visuels (spécifications Google relues le 04/11/2026, answer/9866151) :

| Asset | Spécification | Statut |
|---|---|---|
| Icône | 512×512, PNG 32 bits, ≤ 1 024 Ko | techniquement prête (`ASSET_STATUS_2026-11-04.md`) |
| Image de présentation | 1024×500, JPEG ou PNG 24 bits sans alpha | validation visuelle humaine |
| Captures | JPEG/PNG sans alpha, côtés 320 à 3 840 px, grand côté ≤ 2× le petit, ≥ 2 au total (≥ 4 à 1 080 px recommandées) | 8 téléphone + 8 tablette à régénérer depuis le `main` final (`store-screenshot-selection.md`) |
| Vidéo YouTube | facultative | **DÉCISION HUMAINE** |

## 12. Pays / régions

**DÉCISION HUMAINE** (lancement). Si l'UE est retenue : voir statut trader (§0).

## 13. Pistes de test et production

| Étape | Valeur |
|---|---|
| Test interne | AAB signé ; sans minimum de testeurs ; vérifier installation, signature Play App Signing, assets |
| Test fermé | Si le compte est **personnel créé après le 13/11/2023** : **12 testeurs inscrits en continu pendant 14 jours** minimum avant la demande d'accès production (Google, answer/14151465, G4 de `docs/stores/verification-conformite-2026-11.md`, relu le 04/11/2026) ; inviter 15 à 18 testeurs (`closed-test-plan.md`). Compte organisation : règle à vérifier à l'écran |
| Notes de version | `release-notes-fr.md` (`<fr-FR>`, 275/500) et `release-notes-en.md` (`<en-US>`, 264/500) |
| Production | après test fermé (si applicable), CI verte, recette appareil réel PASS, privacy accessible |

## Exigences non vérifiables sans compte

Libellé exact des écrans, limite de 500 caractères des notes de version (confirmée seulement par des sources secondaires le 04/11/2026), disponibilité de Designed for Families, choix des tags, applicabilité de la règle 12/14 : à confirmer à l'écran de la Console.
