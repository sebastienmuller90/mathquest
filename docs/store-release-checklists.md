# Finot Académie — checklists exécutables de publication V1

Référence : 2026-10-31  
Base produit : `main` @ `05b4c0ce21bd78a9027367d1219e660ec86f7bda`

Ces checklists ne constituent pas une autorisation de publication. Toute création définitive d’identifiant Store, dépense, activation commerciale ou publication nécessite l’accord explicite de Sébastien.

---

# A. Google Play

## A1 — Compte / accès

- [ ] confirmer le type de compte développeur : personnel / organisation ;
- [ ] confirmer si le compte personnel est soumis à l’exigence de test fermé ;
- [ ] si concerné : préparer au moins 12 testeurs continus pendant 14 jours ;
- [ ] ne payer les 25 USD qu’après accord explicite ;
- [ ] coordonnées développeur/support prêtes.

## A2 — Identité application

- [ ] nom commercial : Finot Académie ;
- [ ] package ID définitif approuvé ;
- [ ] `versionName` défini ;
- [ ] `versionCode` monotone ;
- [ ] clé de signature / Play App Signing décidé ;
- [ ] aucun secret de signature commité dans Git.

## A3 — Android technique

- [ ] même base PWA conservée ;
- [ ] runtime Capacitor/Android stable ;
- [ ] targetSdk >= API 36 pour nouvelle soumission 2026 ;
- [ ] minSdk documenté ;
- [ ] AAB release généré ;
- [ ] support 64-bit ;
- [ ] manifest fusionné audité ;
- [ ] aucune permission inutile ;
- [ ] `AD_ID` absent ;
- [ ] microphone conditionnel uniquement si fonction vocale conservée ;
- [ ] aucune mise à jour applicative parallèle au Store ;
- [ ] installation propre sur au moins un téléphone Android réel ;
- [ ] mise à jour depuis build précédent sans perte localStorage/profil ;
- [ ] offline validé dans le runtime natif ;
- [ ] retour online validé ;
- [ ] rotation / clavier virtuel / reprise après fermeture validés.

## A4 — Enfants / confidentialité

- [ ] Target Audience exact ;
- [ ] déclaration Families vérifiée ;
- [ ] privacy policy publique ;
- [ ] Data Safety complétée depuis le binaire réel ;
- [ ] payload cloud allowlisté ;
- [ ] date de naissance complète hors cloud ;
- [ ] isolation inter-familles prouvée ;
- [ ] suppression cloud disponible ;
- [ ] rétention documentée ;
- [ ] aucune publicité ciblée ;
- [ ] aucun tracker publicitaire ;
- [ ] achats futurs exclusivement sous contrôle parent ;
- [ ] aucune pression commerciale liée aux XP/streak/erreurs scolaires.

## A5 — Store listing

- [ ] titre ;
- [ ] description courte ;
- [ ] description longue ;
- [ ] catégorie Education ;
- [ ] icon Store ;
- [ ] feature graphic ;
- [ ] captures téléphone ;
- [ ] captures tablette si distribution tablette ;
- [ ] URL privacy ;
- [ ] URL support ;
- [ ] email support ;
- [ ] classification IARC ;
- [ ] déclarations Ads = non, sauf changement futur validé ;
- [ ] déclarations App access / login exactes.

## A6 — Tests Play

- [ ] internal testing ;
- [ ] installation depuis Play ;
- [ ] crash-free ;
- [ ] test fermé si requis ;
- [ ] 12 testeurs continus / 14 jours si compte concerné ;
- [ ] retours réels collectés ;
- [ ] aucun P0/P1 ouvert ;
- [ ] production access demandé seulement après validation.

---

# B. Microsoft Store

## B1 — Compte / réservation

- [ ] compte Microsoft personnel éligible Windows Developer Program ;
- [ ] inscription Partner Center ;
- [ ] nom Finot Académie disponible/réservé après accord ;
- [ ] aucune dépense non autorisée.

## B2 — PWA

- [ ] HTTPS ;
- [ ] manifest valide ;
- [ ] `name` / `short_name` ;
- [ ] `start_url` ;
- [ ] `display: standalone` ;
- [ ] `theme_color` / `background_color` ;
- [ ] icons suffisants ;
- [ ] scope/id à ajouter si utile au packaging ;
- [ ] service worker stable ;
- [ ] offline réel ;
- [ ] mise à jour sans perte données ;
- [ ] aucune dépendance au runtime Android.

## B3 — Packaging

- [ ] analyse PWABuilder ;
- [ ] aucun warning bloquant ;
- [ ] package Windows généré ;
- [ ] package signé selon Partner Center ;
- [ ] installation Windows réelle ;
- [ ] désinstallation/réinstallation testée selon politique de données ;
- [ ] lancement depuis menu Démarrer ;
- [ ] fenêtre redimensionnable ;
- [ ] navigation clavier complète ;
- [ ] mode sombre ;
- [ ] mode DYS ;
- [ ] offline ;
- [ ] mise à jour.

## B4 — Listing Microsoft

- [ ] nom ;
- [ ] description ;
- [ ] catégorie Education ;
- [ ] captures desktop ;
- [ ] icons/tuiles requis par package ;
- [ ] privacy URL ;
- [ ] support ;
- [ ] tranche d’âge / rating ;
- [ ] déclaration de capacités cohérente avec le package.

---

# C. Samsung Galaxy Store

## C1 — Mutualisation

- [ ] partir du même projet Android que Google ;
- [ ] aucun second projet source ;
- [ ] si package name distinct retenu : product flavor/variant uniquement ;
- [ ] mêmes tests unitaires/E2E produit ;
- [ ] aucune divergence fonctionnelle non justifiée.

## C2 — Technique

- [ ] target API compatible Galaxy Store (la cible Google API 36 doit couvrir le minimum Samsung actuel >=33) ;
- [ ] au moins un binaire 64-bit ;
- [ ] AAB accepté/généré ;
- [ ] installation sur appareil Samsung réel ;
- [ ] clavier Samsung ;
- [ ] rotation ;
- [ ] mode économie batterie ;
- [ ] reprise ;
- [ ] offline ;
- [ ] microphone si activé ;
- [ ] aucune logique d’auto-update applicative native contournant Galaxy Store.

## C3 — Listing

- [ ] nom ;
- [ ] description ;
- [ ] icon ;
- [ ] captures ;
- [ ] catégorie ;
- [ ] privacy URL ;
- [ ] rating ;
- [ ] pays/langues ;
- [ ] déclaration de permissions/données ;
- [ ] Kids/category policy vérifiée si applicable.

---

# D. Web / PWA

## D1 — Fonctionnel

- [ ] installation navigateur supporté ;
- [ ] lancement standalone ;
- [ ] portrait ;
- [ ] paysage ;
- [ ] desktop ;
- [ ] fermeture/reprise ;
- [ ] offline à froid ;
- [ ] retour online ;
- [ ] update N→N+1 ;
- [ ] profils conservés ;
- [ ] aucun mélange multi-profils ;
- [ ] audio réel ;
- [ ] dictée ;
- [ ] accessibilité ;
- [ ] DYS ;
- [ ] texte agrandi.

## D2 — Manifest premium

- [ ] `id` stable ;
- [ ] `scope` explicite ;
- [ ] icons multiples ;
- [ ] maskable dédié ;
- [ ] screenshots PWA ;
- [ ] categories ;
- [ ] description ;
- [ ] shortcuts uniquement si utiles ;
- [ ] aucun changement cassant les installations existantes.

## D3 — Sécurité / conformité

- [ ] privacy policy publique ;
- [ ] suppression données cloud accessible ;
- [ ] Supabase P0 fermés ;
- [ ] CSP / headers à auditer sur l’hébergement final ;
- [ ] aucune clé secrète côté frontend ;
- [ ] clé Supabase limitée au rôle publishable ;
- [ ] aucun tracker non approuvé.

---

# E. Amazon Fire Tablet

Statut V1 : **NO-GO** tant que A/B/C/D ne sont pas stabilisés.

Critères de réouverture :

- [ ] Google production stable ;
- [ ] runtime Android sans dépendance Google Play Services obligatoire ;
- [ ] UX tablette pertinente ;
- [ ] compatibilité Fire OS testable ;
- [ ] coût opérationnel acceptable ;
- [ ] pas de fork fonctionnel ;
- [ ] décision GO explicite.

---

# F. Release gate commun

Aucun canal ne passe en production si :

- P0 > 0 ;
- CI rouge ;
- tests physiques critiques non faits ;
- privacy/Data Safety incohérentes avec le build ;
- package non signé ou non reproductible ;
- secrets présents ;
- données enfant non minimisées ;
- suppression cloud absente ;
- accord final de Sébastien absent.
