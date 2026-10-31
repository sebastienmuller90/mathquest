# Finot Académie — handoff P0 runtime / Claude Code

Branche cible Claude : `claude/multistore-runtime`  
Base commune attendue : `main` @ `05b4c0ce21bd78a9027367d1219e660ec86f7bda`

Ce document définit les corrections runtime/backend nécessaires à la publication multi-store. Il ne donne aucune autorisation de merge vers `main`.

## 1. P0-01 — payload cloud en allowlist

### Problème

`snapshot()` clone actuellement l’état complet `S` puis retire seulement `pin`, `rec` et `sync`.

### Attendu

Créer un constructeur de payload distant explicite, par exemple `remoteSnapshot()` ou équivalent, qui ne contient que les champs nécessaires au suivi parent.

Aucun nouveau champ local ne doit devenir automatiquement un champ cloud.

### TDD obligatoire

RED : ajouter un champ sentinelle local `secretFutureField` et démontrer que l’ancien comportement l’envoie.

GREEN : prouver que l’allowlist ne l’envoie pas.

Tests minimum :
- absence `birthdate` ;
- absence `pin` ;
- absence `rec` ;
- absence `sync` ;
- absence préférences TTS/UI non nécessaires ;
- absence champ inconnu ;
- présence des métriques réellement utilisées par `parent.html`.

## 2. P0-02 — date de naissance complète locale uniquement

### Attendu

La date de naissance complète reste dans le profil local pour le calcul d’âge/anniversaire, mais ne part pas dans le suivi distant.

Si le parent distant a besoin d’une tranche d’âge, utiliser une valeur dérivée minimale uniquement si réellement nécessaire et validée.

### TDD

- profil avec date complète ;
- sync active ;
- inspecter payload RPC ;
- `birthdate` absent.

## 3. P0-03 — suppression cloud

### Attendu backend

Créer une opération de suppression autorisée uniquement par le secret parent/enfant approprié, par exemple RPC dédiée à définir proprement.

La suppression doit retirer :
- association famille ;
- snapshot enfant ;
- actions parent en attente ;
- données auxiliaires liées.

Après suppression :
- ancien lien parent invalide ;
- ancien child token ne peut plus pousser ;
- aucune donnée restituée.

### UI

Le parent doit disposer d’une action explicite distincte de la simple désactivation locale.

Prévoir confirmation forte et texte clair.

### TDD/backend

- register → push → get = données présentes ;
- delete ;
- get = aucune donnée ;
- push ancien token = rejet ;
- act ancien token parent = rejet ;
- second delete = comportement idempotent ou erreur contrôlée.

## 4. P0-04 — audit RPC/RLS Supabase

Fournir dans la PR ou dans un dossier de migration auditable :

- schéma des tables ;
- SQL des fonctions `mq_register`, `mq_push`, `mq_get`, `mq_act`, `mq_ack` ;
- nouvelle fonction de suppression ;
- grants/revokes ;
- RLS policies ;
- rôles d’exécution ;
- usage éventuel `SECURITY DEFINER` avec `search_path` fixé ;
- contraintes de taille/type ;
- rétention.

### Tests sécurité obligatoires

Famille A / famille B :
- parent A ne lit jamais B ;
- parent A n’agit jamais sur B ;
- enfant A ne pousse jamais sur B ;
- enfant A n’ack jamais B ;
- token aléatoire invalide = aucun accès ;
- impossible d’énumérer les familles.

### Défense payload

- rejet payload trop volumineux ;
- rejet type inattendu ;
- action inconnue rejetée ;
- replay action idempotent ;
- aucun secret service-role frontend.

## 5. P0-05 — rétention

Proposer une politique technique minimale, sans la figer juridiquement sans validation produit :

- snapshot courant : tant que suivi actif + période de grâce courte définie ;
- actions consommées : suppression rapide ;
- actions expirées : purge ;
- logs : pas de payload enfant en clair si non nécessaire ;
- suppression parent : purge logique immédiate, backups selon politique documentée.

Documenter ce qui est réellement possible dans Supabase et fournir la mécanique de purge.

## 6. P0-06 — microphone Android

### Constat Web

La prononciation interactive utilise `SpeechRecognition` / `webkitSpeechRecognition` sur action explicite.

### Attendu runtime Android

Vérifier :
- permission Android réellement demandée ;
- moteur utilisé dans WebView/Capacitor ;
- comportement sur appareil physique ;
- traitement local ou distant ;
- comportement offline ;
- aucune écoute arrière-plan ;
- aucune persistance audio ;
- aucune persistance transcription ;
- aucune sync Supabase de transcript.

### Décision

Si le traitement ne peut pas être caractérisé proprement pour une app enfant, désactiver cette fonction sur le wrapper Android V1 via feature flag/platform capability, sans casser le Web/PWA.

### Tests

- refus permission → app reste utilisable ;
- permission accordée → seulement après clic utilisateur ;
- fin activité → micro arrêté ;
- changement écran → micro arrêté ;
- background/sleep → micro arrêté ;
- aucune permission demandée au lancement.

## 7. Permissions Android — principe

Manifest final : permissions minimales uniquement.

Attendu probable :
- INTERNET ;
- RECORD_AUDIO seulement si prononciation Android conservée et justifiée.

Ne pas ajouter sans besoin prouvé :
- AD_ID ;
- localisation ;
- contacts ;
- caméra ;
- stockage large ;
- SMS ;
- téléphone.

Fournir l’inventaire exact du manifest final.

## 8. Android / Google Play runtime

- Capacitor ou wrapper retenu sans réécriture du produit ;
- target API conforme à l’exigence Play actuelle ;
- 64-bit ;
- AAB release ;
- signature configurée sans secret commité ;
- versionCode monotone ;
- versionName produit ;
- deep links uniquement si nécessaires ;
- aucune logique de self-update native qui contourne le Store.

## 9. Samsung

Même projet Android.

Si package distinct recommandé/retenu : product flavor/variant, pas seconde app.

Aucune divergence fonctionnelle sauf contraintes Store nécessaires et documentées.

## 10. Service worker dans wrapper natif

Ne pas casser la PWA Web.

Décider explicitement si le wrapper natif charge :
- assets empaquetés localement ; ou
- URL distante.

Le comportement update natif doit rester compatible avec politiques Store. Le SW Web peut continuer à gérer la PWA Web, mais ne doit pas créer un mécanisme de mise à jour native hors Store.

## 11. Analytics

Ne pas intégrer de SDK analytics/ads dans cette branche sans validation.

Si instrumentation technique nécessaire pour tests, elle doit être local-only ou supprimée avant release.

## 12. Critère de livraison Claude

La branche peut être proposée à la comparaison lorsque :

- P0 runtime ci-dessus couverts par tests ;
- SQL/backend auditable fourni ;
- suite Finot complète verte ;
- build Android debug/installable vert ;
- build AAB release reproductible ;
- liste des fichiers modifiés fournie ;
- aucune fusion `main` ;
- aucun package ID définitif créé sans accord ;
- aucun achat/publication effectué.

## 13. Rapport attendu

- SHA base ;
- SHA head ;
- branche ;
- fichiers modifiés ;
- migrations SQL ;
- tests ajoutés ;
- tests PASS/FAIL/SKIP ;
- permissions Android ;
- target/compile/min SDK ;
- package ID temporaire ou candidat, clairement signalé ;
- AAB généré ou non ;
- taille AAB ;
- état micro ;
- état P0-01 à P0-06 ;
- points restant bloquants.
