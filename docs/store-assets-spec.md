# Finot Académie — spécification des assets Store V1

Référence : 2026-10-31

Objectif : produire un seul kit visuel cohérent, décliné par Store, sans fabriquer des assets indépendants par plateforme.

## 1. Direction visuelle commune

- nom affiché : **Finot Académie** ;
- univers éducatif premium, rassurant, moderne ;
- Finot peut servir de personnage de marque, sans surcharger les visuels ;
- captures réelles de l’application, pas de maquettes trompeuses ;
- aucune promesse non présente dans le produit ;
- aucune mention de classement, récompense non obtenue, “#1”, “meilleure app”, etc. ;
- aucune publicité ciblée enfant ;
- textes marketing courts ;
- cohérence forte entre icon, screenshots, feature graphic et app réelle.

## 2. Google Play

### Assets principaux

- App icon Store : préparer une source carrée haute définition, puis exporter selon l’exigence Play Console au moment de l’upload.
- Feature graphic : **1024 × 500 px**, JPEG ou PNG 24-bit sans alpha.
- Screenshots : produire au minimum 6 captures téléphone propres et cohérentes ; ajouter tablette si la distribution tablette est activée.

### Séquence de captures recommandée

1. Accueil / profil enfant avec progression.
2. Monde des matières / choix d’une matière.
3. Cours détaillé avec Finot et contenu pédagogique.
4. Exercice avec indice/correction pédagogique.
5. Lecture / langues / audio selon profil ciblé.
6. Espace parent / progression et suivi.
7. Mode sombre ou Lecture facilitée, optionnel.
8. Offline / reprise ou devoir parent, optionnel.

### Feature graphic

Composition recommandée :

- Finot à gauche ou au centre ;
- aperçu discret de l’interface ;
- slogan court, si utilisé ;
- pas de duplication visuelle massive de l’icône ;
- pas de petits textes illisibles ;
- aucune donnée réelle d’enfant.

## 3. Microsoft Store

### Screenshots

- minimum de soumission : 1 ;
- objectif Finot : **5 à 8 captures desktop** ;
- desktop : **1366 × 768 px ou plus** ;
- PNG ;
- conserver les éléments importants dans les 3/4 supérieurs si possible.

Séquence proposée :

1. Accueil desktop Finot Académie.
2. Matières / niveaux CP→3e.
3. Cours complet.
4. Exercice et correction.
5. Tableau parent.
6. Lecture / langues.
7. Mode sombre.
8. Lecture facilitée / accessibilité.

### Store icon

- préparer une version **300 × 300 px** dédiée Store ;
- conserver également la source vectorielle/haute définition pour les packages Windows.

### Assets promotionnels optionnels

- Super hero art : **1920 × 1080** si retenu ;
- ne pas rendre ces assets indispensables à la V1.

## 4. Samsung Galaxy Store

### Icon

- Android Galaxy Store : **PNG 512 × 512 px**, <= 1024 KB.

### Screenshots

- **4 à 8 captures obligatoires/recommandées dans le flux Galaxy Store** ;
- JPG ou PNG ;
- dimension comprise entre 320 et 3840 px ;
- ratio maximal 2:1 ;
- produire de préférence des captures Android réelles 1080p cohérentes avec Google Play.

### Séquence proposée

Réutiliser les mêmes scénarios que Google, mais capturés sur un appareil Samsung réel si possible :

1. accueil ;
2. matières ;
3. cours ;
4. exercice ;
5. correction ;
6. parent ;
7. mode sombre ;
8. prononciation/audio si conservée.

## 5. PWA / Web

Le manifest PWA final devrait pouvoir référencer :

- icon standard ;
- icon maskable dédiée ;
- screenshots mobile ;
- screenshots desktop ;
- description ;
- catégories.

Ne pas ajouter ces références avant d’avoir validé que cela ne perturbe pas les installations PWA existantes.

## 6. Source master à créer

Créer un dossier source unique hors runtime ou dans un répertoire assets/store clairement isolé :

```text
store-assets/
  source/
    finot-icon-master.*
    feature-master.*
  google-play/
  microsoft-store/
  samsung-galaxy/
  pwa/
  screenshots/
    android-phone/
    android-tablet/
    windows-desktop/
```

Les exports finaux peuvent être régénérés depuis les masters ; ne jamais retoucher manuellement chaque variante sans source commune.

## 7. Données fictives pour captures

Tous les screenshots Store doivent utiliser un profil fictif dédié.

Profil recommandé :

- prénom/pseudo : **Lina** ;
- classe : **CE2** ;
- données artificielles ;
- aucune donnée familiale réelle ;
- aucune date de naissance réelle ;
- aucune clé Supabase réelle affichée ;
- aucun code parent réel ;
- aucune notification personnelle.

Préparer également un profil collège fictif si une capture mature est nécessaire :

- prénom/pseudo : **Alex** ;
- classe : **5e**.

## 8. Règles QA avant export

Pour chaque capture :

- version finale visible ;
- aucun texte coupé ;
- aucune barre de debug ;
- aucune erreur console visible ;
- aucun clavier ouvert sauf capture volontaire ;
- aucune donnée réelle ;
- heure/batterie cohérentes si barre système incluse ;
- pas de watermark ;
- pas de faux bouton Store ;
- pas de fonctionnalité non disponible ;
- cohérence clair/sombre ;
- orthographe vérifiée.

## 9. Checklist production

- [ ] icon master validé ;
- [ ] icon Google exporté ;
- [ ] feature graphic Google 1024×500 ;
- [ ] 6–8 screenshots Android ;
- [ ] icon Microsoft 300×300 ;
- [ ] 5–8 screenshots Windows >=1366×768 ;
- [ ] icon Samsung 512×512 ;
- [ ] 4–8 screenshots Samsung ;
- [ ] screenshots PWA mobile/desktop ;
- [ ] profils fictifs uniquement ;
- [ ] revue visuelle ;
- [ ] revue conformité ;
- [ ] revue finale de correspondance avec le build soumis.
