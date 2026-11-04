# Finot Académie — Architecture de monétisation V1.1 (conception, aucun code)

Statut : **CONCEPTION UNIQUEMENT**, rédigée le 04/11/2026. Aucun code, aucun service payant, aucun compte, aucune souscription.
La **V1 reste gratuite, sans publicité, sans achat intégré.** Ce document complète `docs/monetization-parent-safe.md` (principes). Il ne modifie ni l'appli ni les tests.
Les faits datés viennent des pages officielles consultées le 04/11/2026 (liste en §12) ; les montants sont à revalider dans les consoles.

## 1. Contraintes permanentes (non négociables)

1. **Accès libre aux cours** : aucun déblocage séquentiel façon Duolingo. La monétisation ne verrouille **jamais** les cours de base ni leur ordre.
2. Pas de publicité, ciblée ou non ; pas d'analytique tierce ; aucun identifiant publicitaire.
3. Aucune pression commerciale sur l'enfant : pas de paywall après une erreur, une perte de série, ni de compte à rebours ; pas de conversion XP/pièces → argent.
4. Tout acte d'achat se déclenche **uniquement depuis l'espace Parents, derrière le code parental**. L'espace enfant ne montre ni prix, ni bouton d'achat, ni lien.
5. Fonctionnement **hors ligne par défaut** conservé : l'absence de réseau ne doit jamais bloquer l'apprentissage.
6. Séparation stricte entre progression pédagogique et droits commerciaux (`js/entitlements.js` est déjà une interface sans fournisseur).

## 2. Ce qui peut être payant (compatible avec le §1)

Le « Pack Famille » ne vend **pas** l'accès au programme. Il vend du confort et du suivi pour l'adulte, par exemple :

- profils supplémentaires au-delà d'un seuil gratuit, sauvegarde/export enrichis, rapports parents détaillés (PDF), planning de révision pour le parent ;
- suivi parent à distance **si et seulement si** le backend est validé un jour (voir §8 : cela change tout côté données) ;
- fonctions de confort (thèmes, voix supplémentaires hors ligne si les droits le permettent).

À écarter : fonctionnalités pédagogiques essentielles, nouvelles notions du programme, correction des exercices, accès aux niveaux.

Deux formes possibles, à choisir selon les critères du §10 :
- **Achat unique « Famille »** (non consommable) : simple, lisible, sans renouvellement ;
- **Abonnement annuel « Famille »** : n'est défendable (Apple 3.1.2) que s'il apporte une valeur continue (mises à jour, suivi à distance). Sans service continu, privilégier l'achat unique.

## 3. Exigences des stores applicables

| Sujet | Google Play | Apple |
|---|---|---|
| Facturation obligatoire pour biens numériques | Oui, Google Play Billing (https://support.google.com/googleplay/android-developer/answer/10281818) | Oui, achat intégré (guideline 3.1.1) ; restauration obligatoire |
| Apps pour enfants | Politique Familles : respect de COPPA/RGPD, pas d'AAID, pratiques de vente non manipulatrices (https://support.google.com/googleplay/android-developer/answer/9893335) | Catégorie Enfants (1.3) : achats seulement derrière barrière parentale ; si l'app n'est pas dans la catégorie, la barrière reste une bonne pratique |
| Abonnement | Essais et offres via la Console ; informations de prix claires | ≥ 7 jours, valeur continue, essai gratuit via App Store Connect (3.1.2) |
| Contrôles familiaux de la plateforme | Approbations d'achat Google Family (https://support.google.com/googleplay/answer/7039872) : s'appliquent aux achats passés par Google Play Billing | « Ask to Buy » (https://developer.apple.com/app-store/kids-apps/) |
| Compte marchand | Profil de paiement / compte marchand Google | Accord « Apps payantes » (page officielle non confirmée le 04/11/2026), coordonnées bancaires et fiscales |

Bénéfice du passage par les facturations natives : les contrôles parentaux de la plateforme (approbation d'achat) fonctionnent. Un paiement externe (lien web, carte saisie dans l'app) est **à proscrire** : hors politique, hors contrôle parental, et lourd côté données financières.

## 4. Où placer l'achat dans l'application

- Écran « Pack Famille » **uniquement dans l'espace Parents** (`MQParentGate`), après saisie du code parent. Aucun point d'entrée depuis un écran enfant.
- Les liens vers les conditions de vente, la politique de confidentialité et la page « gérer l'abonnement » du store restent dans l'espace Parents (déjà autorisés par `js/link-policy.js`).
- **Renforcement préalable obligatoire** : le code parent est aujourd'hui une empreinte 32 bits non cryptographique (`families-compliance.md`, ATTENTION 1). Avant d'y adosser un achat, prévoir : barrière « tâche d'adulte » (par exemple un calcul ou la ressaisie du code) **plus** la confirmation native du store (biométrie, mot de passe du compte). Les deux s'ajoutent, ne se substituent pas.
- Libellés neutres, prix et durée affichés avant l'achat, bouton d'annulation évident, aucune formulation culpabilisante.

## 5. Options techniques comparées (aucune n'est branchée)

| Critère | A. Natif direct (Play Billing + StoreKit) | B. RevenueCat (SDK + service) | C. Natif + vérification serveur maison |
|---|---|---|---|
| Intégration dans une appli Capacitor sans build web | Deux plugins natifs (ou ponts maison) à maintenir ; code Android Java/Kotlin et Swift | Un SDK multi-plateforme avec plugin Capacitor ; moins de code | Option A + backend à écrire et sécuriser |
| Coût | Commission du store uniquement (Google : 15 % sur le premier million de dollars annuel et selon les régions une grille évolutive, https://support.google.com/googleplay/android-developer/answer/112622 ; Apple : 15 % si programme Petites entreprises, https://developer.apple.com/app-store/small-business-program/) | Commission du store **plus** RevenueCat : gratuit jusqu'à 2 500 $ de revenu suivi par mois, puis 1 % (https://www.revenuecat.com/pricing/) | Commission du store plus hébergement et maintenance du serveur |
| Données envoyées à un tiers | Aucune vers un tiers (seulement le store) | **Oui** : un identifiant d'utilisateur anonyme et des reçus vont vers RevenueCat : impact direct sur Sécurité des données / App Privacy / politique Familles / Catégorie Enfants | Données vers le serveur de l'éditeur (à déclarer) |
| Restauration d'achat | À implémenter (requête des achats existants) | Fournie | À implémenter |
| Hors ligne | Les droits sont mis en cache localement ; la validation se fait à la reconnexion | Cache local du SDK, même principe | Idem, plus dépendance au serveur |
| Sécurité (antifraude, remboursements) | Faible sans serveur : un achat unique peut se contenter de la validation du store | Bonne (notifications, remboursements) | Bonne mais coûteuse à tenir |
| Cohérence avec « zéro tiers » de la V1 | **Forte** | Faible : introduit un SDK tiers dans une app pour enfants | Moyenne |

**Recommandation de conception (à confirmer par les critères du §10)** : pour un achat unique « Famille » sans compte ni backend, choisir **A (natif direct)** : c'est la seule option qui garde l'appli sans SDK tiers ni transmission de données autre que le store. Réserver **B** à un abonnement multiplateforme avec suivi à distance, et seulement après audit « Families Self-Certified » / Catégorie Enfants du SDK concerné (aucune certification n'a été vérifiée dans cette mission).

## 6. Impact sur Sécurité des données, App Privacy, politique de confidentialité

- Les achats passés par le store ne font pas de l'éditeur un collecteur des données de paiement, mais **les déclarations doivent être rejouées** : la Sécurité des données (Google) et App Privacy (Apple) doivent refléter « Achats » et tout identifiant éventuel. Sous option A sans serveur : probablement aucun nouveau type collecté par l'éditeur, **à confirmer** dans les consoles au moment de la soumission.
- Sous option B : déclarer l'identifiant d'utilisateur RevenueCat et l'historique d'achats transmis ; vérifier que le SDK n'accède pas à l'AAID/IDFA (interdit par Familles) ; fournir le manifeste de confidentialité Apple du SDK.
- Mettre à jour `docs/google-play/data-safety-draft.md`, `families-compliance.md` (ligne « Achats / abonnements » aujourd'hui « CONFORME (V1 gratuite) »), la politique publique et la fiche Store. Mettre à jour `AndroidManifest.xml` si une permission `com.android.vending.BILLING` est ajoutée par la bibliothèque.
- Le brouillon actuel affirme « Achats intégrés : aucun » : il devient faux dès l'activation, d'où l'exigence de nouvelle passe de conformité avant publication.

## 7. Impact sur le mode hors ligne

- L'achat lui-même **exige** le réseau (store). Tout le reste non.
- Les droits acquis sont mis en cache localement (`js/entitlements.js` reste l'interface) et relus au lancement ; l'absence de réseau ne retire jamais un droit déjà acquis (période de grâce en cas d'abonnement).
- Les fonctions gratuites ne dépendent jamais de la vérification des droits ; un échec de vérification dégrade vers « gratuit » sans message alarmiste pour l'enfant.
- Les clés de stockage historiques (`mathquest_v1`, `mathquest_profiles_v2`…) ne sont pas touchées : les droits sont dans un espace distinct, pour ne casser aucune sauvegarde.

## 8. Essai gratuit, restauration, protection de l'enfant

- **Essai gratuit** : uniquement pour un abonnement, via les offres natives du store ; durée et date de fin de l'essai affichées au parent ; aucune carte demandée dans l'app (le store gère).
- **Restauration** : bouton « Restaurer mes achats » dans l'espace Parents (obligatoire sur Apple, utile sur Android pour un changement d'appareil).
- **Achat accidentel** : confirmation native + code parent + information sur le remboursement du store.
- **Aucune publicité ciblée**, aucun écran de promotion visible par l'enfant, aucune notification commerciale.
- **Suivi parent à distance** : s'il est lié à l'offre, il faudra d'abord valider le backend (aujourd'hui désactivé, `js/remote-sync-config.js`), un consentement parental explicite et une revue complète Familles / RGPD ; ce chantier est **indépendant** et ne doit pas être mélangé à la première monétisation.

## 9. Points juridiques à faire valider (par un professionnel, aucun avis ici)

1. **Identité du vendeur** : le compte est personnel ou professionnel ? Vendre régulièrement peut impliquer un statut d'entrepreneur (micro-entreprise ou autre) ; l'éditeur public est « UpFactory Apps » (`final-human-inputs.md`) mais le nom légal du titulaire doit apparaître là où il est exigé.
2. **TVA** : le store est généralement le vendeur de référence pour la TVA sur ses ventes ; confirmer le traitement avec le comptable (statut franchise en base, déclaration des revenus des stores).
3. **CGV / conditions d'utilisation** : rédiger des conditions claires, accessibles dans l'espace Parents.
4. **Droit de rétractation** : régime européen des contenus numériques et des abonnements ; la renonciation et l'information dépendent du flux du store ; à valider.
5. **RGPD et protection des mineurs** : minimisation, base légale, information des parents, âge du consentement numérique en France ; mise à jour de la politique et des mentions pour toute donnée nouvelle.
6. **Statut de « trader » (DSA)** pour l'affichage public des coordonnées dans l'UE.
7. **Pratiques commerciales** : absence de pratiques trompeuses visant les enfants, affichage des prix TTC, renouvellement et résiliation.

## 10. Critères de décision (avant de lancer le moindre développement)

À réunir **tous** pour passer de la conception à la réalisation :

- V1 publiée, stable, avec retours de testeurs réels (test fermé terminé) ;
- demande réelle de fonctions parent payantes (mesurée par retours, sans analytique tierce) ;
- avis juridique obtenu sur les points du §9 ;
- comptes marchands prêts (§11) et statut fiscal du vendeur clarifié ;
- code parent renforcé (§4) et test de non-régression sur l'accès libre aux cours ;
- choix technique justifié : achat unique + natif direct par défaut ; RevenueCat seulement si abonnement multiplateforme avec serveur.
Critère d'arrêt : si la monétisation impose de collecter des données d'enfants ou de dégrader l'accès libre aux cours, on n'y va pas.

## 11. Prérequis de comptes (aucun n'est ouvert par ce document)

- **Google Play** : compte développeur actif, profil de paiement / compte marchand, informations fiscales, produits créés dans la Console (achat unique ou abonnement avec offres), testeurs de licence pour tester sans payer.
- **Apple** : programme Apple Developer, acceptation de l'accord « Apps payantes », coordonnées bancaires et fiscales, produits dans App Store Connect, comptes de test Sandbox ; inscription au programme Petites entreprises (commission réduite).
- **RevenueCat** (si retenu) : compte et clés de projet côté service ; le fonctionnement hors ligne et la déclaration des données restent à auditer.

## 12. Plan de migration (lorsque la décision sera prise)

1. **Phase 0 (maintenant)** : cette conception, avis juridique, renforcement du code parent (chantier séparé avec tests).
2. **Phase 1** : brancher un fournisseur derrière `js/entitlements.js` (interface existante) sur Android uniquement, en test interne, avec produit de test ; les tests `entitlements-guard` et `analytics-guard` sont adaptés explicitement (et non contournés).
3. **Phase 2** : revue Familles, Sécurité des données et politique de confidentialité ; test fermé avec parents ; vérification de l'accès libre aux cours (test automatisé : tous les cours accessibles sans achat).
4. **Phase 3** : publication d'une mise à jour (incrémenter la `VERSION` de `sw.js`), surveillance des remboursements et retours.
5. **Phase 4 (optionnelle)** : équivalent iOS si la décision de viser Apple est prise (Xcode 26+, manifeste de confidentialité, restauration, questionnaire d'âge).
6. Annulation possible à chaque phase : la V1 gratuite reste intacte, les sauvegardes existantes ne sont jamais touchées.

## 13. Risques

| Risque | Gravité | Atténuation |
|---|---|---|
| Rejet ou retrait pour pratique commerciale visant les enfants | Élevée | Achat uniquement côté parent, aucun prix côté enfant, revue Familles avant mise en ligne |
| Achat accidentel par l'enfant (code parent faible) | Élevée | Renforcer le code, doubler par la confirmation native, rappeler le remboursement |
| SDK tiers non conforme (RevenueCat ou autre) | Élevée | Préférer le natif direct ; sinon audit complet avant intégration |
| Déclarations de données devenues fausses | Moyenne | Rejouer Sécurité des données / App Privacy / politique à chaque changement |
| Perte de confiance si le gratuit semble dégradé | Élevée | Test automatisé de l'accès libre aux cours ; aucun verrou sur le programme |
| Statut juridique / fiscal du vendeur mal cadré | Moyenne | Avis professionnel avant ouverture des ventes |
| Commissions et règles de frais qui changent | Moyenne | Revalider les grilles dans les consoles à la décision |
| Complexité de maintenance pour un projet solo | Moyenne | Un seul fournisseur, un seul produit au départ |

## 14. Sources consultées le 04/11/2026

- Politique de paiement Google Play : https://support.google.com/googleplay/android-developer/answer/10281818
- Frais de service Google Play : https://support.google.com/googleplay/android-developer/answer/112622
- Politique Familles : https://support.google.com/googleplay/android-developer/answer/9893335
- Approbations d'achat Google Family : https://support.google.com/googleplay/answer/7039872
- Play Billing : https://developer.android.com/google/play/billing
- Guidelines App Store (1.3, 3.1.1, 3.1.2, 5.1.4) : https://developer.apple.com/app-store/review/guidelines/
- Catégorie Enfants Apple : https://developer.apple.com/app-store/kids-apps/
- Programme Petites entreprises Apple : https://developer.apple.com/app-store/small-business-program/
- Tarifs RevenueCat : https://www.revenuecat.com/pricing/
- La page Apple « Accord Apps payantes » n'a pas pu être consultée (404) : source non confirmée.
