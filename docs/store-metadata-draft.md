# Finot Académie — métadonnées Store V1 (draft)

Référence auditée : `main` @ `05b4c0ce21bd78a9027367d1219e660ec86f7bda` (audit initial) ; socle actuel `main` @ `5de9b03` (PR #38 fusionnée)  
Statut : DRAFT — aucun Store ID/package ID n’est créé par ce document.

## 1. Identité produit commune

Nom commercial : **Finot Académie**

Positionnement : application éducative française du CP à la 3e, avec cours, exercices, diagnostics, révisions, lecture, dictée, langues, progression adaptative et espace parent.

Catégorie principale proposée : **Éducation / Education**.

Public : enfants scolarisés du CP à la 3e, sous contrôle parental pour les réglages sensibles et futurs achats.

## 2. Google Play

### Limites officielles vérifiées

- Nom application : 30 caractères max.
- Description courte : 80 caractères max.
- Description longue : 4 000 caractères max.
- Icône Store : PNG 32 bits avec alpha, 512 × 512 px, max 1 024 KB.
- Feature graphic : JPEG ou PNG 24 bits sans alpha, 1 024 × 500 px.
- Jusqu’à 8 screenshots par type d’appareil pris en charge.
- Pour tablettes/Chromebook : Google recommande au moins 4 captures ; dimensions entre 1 080 et 7 680 px, ratio 16:9 paysage ou 9:16 portrait.

Sources officielles :
- https://support.google.com/googleplay/android-developer/answer/9859152
- https://support.google.com/googleplay/android-developer/answer/9866151
- https://support.google.com/googleplay/android-developer/answer/13393723

### Nom

`Finot Académie`

### Description courte — proposition V1

`Cours, exercices et révisions du CP à la 3e avec un parcours personnalisé.`

Cette phrase reste sous la limite de 80 caractères et ne promet aucune fonctionnalité non existante.

### Description longue — proposition V1

Finot Académie accompagne les élèves du CP à la 3e avec des cours, exercices et révisions adaptés à leur niveau scolaire.

L’application propose notamment :

- des parcours couvrant les matières du primaire et du collège ;
- des cours détaillés et des exercices interactifs ;
- un diagnostic de départ pour ajuster le niveau de travail ;
- des révisions intelligentes et un suivi de progression ;
- des activités de lecture, dictée et langues ;
- des indices et corrections progressives ;
- un espace parent pour suivre le travail et gérer certains réglages ;
- un fonctionnement installable et une partie des contenus disponible hors connexion.

Finot Académie utilise une progression ludique avec XP, badges et récompenses virtuelles pour encourager la régularité. Ces éléments pédagogiques ne sont pas liés à des achats.

La progression reste sur l’appareil. La confidentialité des données enfant est traitée comme une priorité : aucune publicité, aucun tracker publicitaire, aucun achat intégré actif.

> Note interne : en V1 local-only (état de `main@5de9b03`), le suivi à distance n’est **pas disponible** et ne doit donc pas être annoncé dans la fiche. Une phrase du type « suivi à distance facultatif, activé volontairement par le parent » ne pourra être ajoutée qu’après provisioning et audit du backend (scénario « V1 avec cloud »).

### Captures Google recommandées

Téléphone portrait :
1. Accueil élève avec progression.
2. Choix des matières.
3. Cours illustré.
4. Exercice et correction.
5. Diagnostic / parcours personnalisé.
6. Lecture ou dictée.
7. Révision intelligente.
8. Espace parent.

Tablette : reprendre 4 à 8 écrans clés avec mise en page réellement obtenue sur tablette Android.

### Feature graphic — direction créative

- Finot au centre ;
- univers scolaire premium ;
- quelques cartes de matières en arrière-plan ;
- texte minimal ;
- pas de prix, classement, badge Store ou claim « n°1 » ;
- aucun élément qui pourrait être interprété comme affiliation officielle à l’Éducation nationale.

## 3. Microsoft Store

### Exigences officielles vérifiées

- Une description texte est obligatoire.
- Au moins une capture est obligatoire.
- Description : jusqu’à 10 000 caractères.
- « Nouveautés » : jusqu’à 1 500 caractères, vide pour première soumission.
- Jusqu’à 20 fonctionnalités, 200 caractères max chacune.
- Jusqu’à 10 screenshots desktop ; Microsoft recommande plusieurs captures, au moins 4 idéalement.
- Desktop : 1 366 × 768 px ou plus ; 4K supporté.
- Icon Store recommandée : 300 × 300 px.

Sources officielles :
- https://learn.microsoft.com/windows/apps/publish/publish-your-app/pwa/create-app-store-listing
- https://learn.microsoft.com/windows/apps/publish/publish-your-app/pwa/screenshots-and-images

### Description Microsoft — base

Finot Académie est une application éducative du CP à la 3e conçue pour accompagner les élèves dans leurs cours, exercices et révisions.

Elle regroupe des parcours par matière, des cours détaillés, des exercices interactifs, un diagnostic de départ, des révisions intelligentes, des outils de lecture et dictée, ainsi qu’un espace parent.

L’application fonctionne comme une PWA installable et conserve la progression localement sur l’appareil.

### Fonctionnalités Microsoft proposées

1. Programmes du CP à la 3e.
2. Cours et exercices interactifs.
3. Diagnostic de départ.
4. Révisions intelligentes.
5. Lecture et compréhension.
6. Dictées avec correction progressive.
7. Anglais et italien.
8. Progression multi-profils.
9. Espace parent.
10. Mode sombre et lecture facilitée.
11. Fonctionnement hors ligne sur les contenus mis en cache.
12. Installation PWA Windows.

### Screenshots Microsoft recommandés

Préparer 6 captures desktop 16:9 à partir d’un vrai Windows :
1. Accueil.
2. Monde/matières.
3. Cours.
4. Exercice avec correction.
5. Tableau parent.
6. Progression/révisions.

Pas de maquette marketing qui ne correspond pas au produit réel.

## 4. Samsung Galaxy Store

### Exigences publiques vérifiées

- Icon Android : PNG 512 × 512 px, max 1 024 KB.
- Description longue : max 4 000 bytes dans l’API Content Publish.
- Screenshots : JPG ou PNG, dimension 320–3 840 px, ratio max 2:1.
- 4 à 8 screenshots doivent être enregistrés.
- Les métadonnées doivent représenter exactement l’application.
- Si plusieurs pays de distribution sont choisis, l’anglais doit être supporté comme langue par défaut des métadonnées selon la documentation Samsung.

Sources officielles :
- https://developer.samsung.com/galaxy-store/galaxy-store-developer-api/content-publish-api/reference.html
- https://developer.samsung.com/galaxy-store/distribution-guide.html
- https://developer.samsung.com/galaxy-store/self-check-list-galaxy.html

### Description Samsung — base FR

Finot Académie accompagne les élèves du CP à la 3e avec des cours, exercices, révisions, lecture, dictée et langues. L’application propose un diagnostic de départ, un parcours personnalisé, une progression ludique et un espace parent.

La base Android Samsung doit rester issue du même projet que Google Play.

### Screenshots Samsung

Prévoir 6 captures Android réelles :
1. Accueil.
2. Matières.
3. Cours.
4. Exercice.
5. Révision.
6. Espace parent.

## 5. Assets mutualisés

Créer une source graphique maîtresse puis exporter :

- icon master carrée haute résolution ;
- Google icon 512 × 512 ;
- Samsung icon 512 × 512 ;
- Microsoft tile 300 × 300 ;
- Google feature graphic 1 024 × 500 ;
- screenshots téléphone 9:16 ;
- screenshots tablette 16:9 ou 9:16 selon interface ;
- screenshots Windows ≥1 366 × 768.

Ne pas recréer l’identité visuelle séparément pour chaque Store.

## 6. Package ID — non décidé

Aucun package ID n’est réservé ici.

Candidats à évaluer avant accord final :
- `fr.finot.academie`
- `com.finotacademie.app`

Critères : disponibilité, cohérence future App Factory, variantes Samsung, futur iOS, nom de domaine éventuel.

## 7. Assets encore manquants / P1

- icon launcher Android adaptive ;
- splash Android ;
- Google feature graphic ;
- captures téléphone réelles ;
- captures tablette réelles ;
- captures Windows réelles ;
- privacy URL ;
- support URL/contact ;
- éventuels textes anglais si distribution multi-pays Samsung ;
- questionnaire IARC Google ;
- Data Safety final.

## 8. Règle de vérité marketing

Toute description Store doit correspondre exactement au binaire soumis. Ne jamais annoncer :

- synchronisation cloud générale si seul le suivi parent est synchronisé ;
- reconnaissance vocale offline si elle dépend de la plateforme ;
- contenu 100 % offline si des assets ne sont mis en cache qu’à la demande ;
- affiliation officielle avec un ministère, une école ou une marque tierce ;
- fonctionnalités premium/achats tant qu’ils ne sont pas réellement disponibles.
