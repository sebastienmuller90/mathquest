# Finot Académie — stratégie multi-store V1

Référence auditée : `main` @ `05b4c0ce21bd78a9027367d1219e660ec86f7bda`  
Branche ChatGPT : `chatgpt/multistore-release-orchestration`  
Version PWA constatée : `8.73.2-physical-fixes-2026-10-25`

## Principes

- Conserver l’application PWA HTML/CSS/JavaScript existante.
- Aucun passage automatique à React.
- Aucun fork fonctionnel Android/Windows/Samsung.
- Apple App Store exclu de la V1.
- Budget initial de publication : 25 USD maximum.
- Aucun paiement, publication, package ID définitif ou décision irréversible sans accord explicite.
- Confidentialité enfant et isolation inter-familles = gates P0.

## Ordre V1

1. Google Play
2. Microsoft Store
3. Web / PWA
4. Samsung Galaxy Store
5. Amazon Fire Tablet : étude secondaire uniquement

## Matrice

| Canal | Artefact | Mutualisation | Gate principal | Décision |
|---|---|---|---|---|
| Google Play | AAB Android | base Capacitor/Android commune | API cible actuelle, tests Android, Families, Data Safety, privacy | GO après P0 |
| Microsoft Store | PWA packagée/MSIX | PWA existante | manifest enrichi, packaging, offline Windows | GO après P0 |
| Web / PWA | site installable | base actuelle | offline, update, privacy publique | GO après P0 |
| Samsung Galaxy Store | AAB dérivé du même projet Android | même codebase | metadata, compatibilité Galaxy, politique Samsung | GO après Google |
| Amazon Fire Tablet | APK/AAB éventuel | même projet Android | compatibilité Fire OS réelle | NO-GO V1 par défaut |

## P0 identifiés

1. **Isolation Supabase non prouvée** : les RPC `mq_register`, `mq_push`, `mq_get`, `mq_act`, `mq_ack` sont utilisées côté frontend, mais les policies/RLS/fonctions SQL n’ont pas encore été auditées.
2. **Minimisation enfant insuffisante** : `snapshot()` clone le profil et retire uniquement `pin`, `rec` et `sync`; la date de naissance complète peut donc partir vers Supabase quand la synchronisation distante est active.
3. **Suppression cloud non démontrée** : `syncoff` retire les clés locales mais aucune suppression serveur n’a encore été trouvée côté frontend.
4. **Politique de confidentialité publique non trouvée** dans la base auditée.
5. **Data Safety non finalisable** tant que le flux Supabase réel n’est pas fermé et documenté.

## P1 identifiés

- AAB Android production et tests appareil réel.
- Manifest PWA enrichi pour Store quality.
- Assets Store : icons, splash, screenshots, feature graphic.
- Validation physique finale encore incomplète selon la checklist existante.
- Versioning multi-canal et changelog final.
- Analytics privacy-first : rester no-op tant que consentement/collecte serveur ne sont pas validés.
- Vérifier/activer une protection adaptée de `main` avant industrialisation, sans réécrire l’historique.

## Google Play

À préparer :

- package ID final à proposer, sans le réserver avant accord ;
- `versionName` / `versionCode` ;
- AAB signé ;
- icon/splash ;
- screenshots ;
- description courte/longue ;
- catégorie Education ;
- IARC ;
- tranche d’âge ;
- Families ;
- politique de confidentialité ;
- Data Safety ;
- permissions Android minimales ;
- suppression données cloud ;
- test fermé si le compte développeur personnel est soumis à l’exigence actuelle Google.

## Microsoft Store

Voie retenue : PWA existante → validation → packaging PWABuilder/Partner Center → Store. Aucun fork Windows.

À préparer : manifest enrichi, icons, captures desktop, description Store, privacy URL, package, tests installation/offline/update/stockage/navigation desktop.

## Samsung Galaxy Store

Même base Android que Google. Aucun second projet Android.

Si un package name distinct est nécessaire pour éviter les mises à jour croisées entre stores, utiliser une variante/product flavor dans le même projet après accord, jamais une duplication de codebase.

## Web / PWA

Doit rester installable, offline, responsive, desktop/mobile, sécurisée et rapide. Le service worker existant et les migrations de stockage ne doivent pas régresser pour permettre Android.

## Amazon

NO-GO V1 par défaut. Reconsidérer uniquement Fire Tablet après stabilisation Google/Microsoft/Samsung/PWA.

## Coordination Claude Code

Claude est propriétaire de `claude/multistore-runtime` : Capacitor, Android, build AAB, runtime natif, permissions, sécurité runtime, tests Android.

ChatGPT est propriétaire de `chatgpt/multistore-release-orchestration` : conformité, privacy/Data Safety, QA/release gates, metadata Store, Factory Blueprint, coordination.

Tant que la branche Claude n’est pas visible/comparée, ChatGPT évite de modifier `js/app-state.js`, `js/app-actions.js`, `sw.js`, `manifest.webmanifest` et tout fichier Android/Capacitor.

## Gate avant fusion future

1. pousser/rendre visible la branche Claude ;
2. comparer les deux branches à `main` ;
3. identifier les fichiers communs ;
4. vérifier les P0 ;
5. exécuter la suite complète ;
6. revue privacy/security ;
7. intégrer uniquement après validation explicite.

## Factory Blueprint — extraction cible

### Factory Core
App shell, navigation, onboarding, settings, stockage/migrations, offline, thème, dark mode, accessibilité, analytics privacy-first, privacy, erreurs, parental gate, entitlements/IAP, notifications, review, CI, tests, packaging, publication, versioning, store metadata, release checklist.

### Factory Patterns optionnels
Profils, XP, niveaux, badges, streak, objectifs, progression, statistiques, dashboard, historique, parcours, recommandations, challenges, récompenses.

### Finot uniquement
CP→3e, matières, programmes scolaires, cours, exercices, compétences, dictées, lecture, diagnostics, devoirs, évaluations, pédagogie et moteur adaptatif scolaire.

La future Factory doit réutiliser les patterns, pas l’architecture actuelle à nombreux scripts globaux dépendants de leur ordre de chargement.
