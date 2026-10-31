# App Factory #001 — extraction fichier par fichier (Finot Académie)

Périmètre : tous les fichiers ajoutés ou modifiés depuis `main` @ `05b4c0c` par les branches `claude/multistore-runtime` et `claude/android-store-hardening` (31/10/2026).

Rien n'est extrait aujourd'hui : **Finot reste stable**. Ce document dit ce qui pourra devenir une brique de la Factory et ce qu'il faudra paramétrer. Il complète `docs/factory-blueprint.md` (autre chantier), qui fixe la cible d'architecture.

**Légende**
- **A — Générique** : réutilisable tel quel dans toute app. Seule une configuration change (nom, identifiants, couleurs, URL publique).
- **B — Pattern** : architecture réutilisable ; le contenu (liste de champs, écrans, règles) est à réécrire pour chaque app.
- **C — Spécifique Finot** : dépend du personnage Finot, de la pédagogie, des profils enfants, du suivi scolaire, de l'XP, des matières ou du programme.

## A. Génériques

| Fichier | Rôle | Paramètres à extraire |
|---|---|---|
| `scripts/package-www.mjs` | Paquet web déterministe (liste blanche + fichiers suivis par Git, vérification des références, manifeste SHA-256, versionCode) | `ROOT_FILES`, `DIRS`, `ESSENTIAL`, source de version (`sw.js`) |
| `tests/mobile-package.test.js` | Contrat du paquet (interdits, reproductibilité, échec franc) | Liste des fichiers racine autorisés |
| `capacitor.config.json` | Coque Capacitor : origine figée `https://localhost`, débogage coupé, pas de contenu mixte, `SystemBars` natif | `appId`, `appName` |
| `android/` : `build.gradle`, `app/build.gradle`, `variables.gradle`, `settings.gradle`, `capacitor.settings.gradle`, `gradle.properties`, `gradle/wrapper/*`, `gradlew*`, `proguard-rules.pro`, `.gitignore` | Build Android :<br>• identifiant configurable (`-PfinotAppId`) ;<br>• version issue du paquet ;<br>• signature par environnement ;<br>• SDK 36 ;<br>• empreinte Gradle épinglée ;<br>• pas de Firebase | Préfixe des propriétés (`finot*` vers `app*`), namespace |
| `android/app/src/main/AndroidManifest.xml` | Manifeste minimal :<br>• `INTERNET` seule ;<br>• `AD_ID` retiré ;<br>• sauvegarde coupée ;<br>• HTTPS seul ;<br>• aucun lien profond | Libellés |
| `android/app/src/main/res/xml/network_security_config.xml` | HTTPS uniquement, autorités système | — |
| `android/app/src/main/res/xml/data_extraction_rules.xml` | Aucune sauvegarde cloud ni transfert d'appareil | Domaines exclus |
| `android/app/src/main/res/xml/file_paths.xml`, `layout/activity_main.xml`, `MainActivity.java` | Modèle Capacitor standard | Package Java |
| `scripts/android-assets.py` | Icônes adaptatives, rondes, classiques et splash depuis une image source | Couleurs (#7C3AED / #F4F1FF), échelle 92 % |
| `js/platform.js` (`MQPlatform`) | Détection web/natif, service worker réservé au web, Retour Android, pause/reprise, réseau, URL publique | `PUBLIC_BASE`, sélecteurs de navigation (`.bar`, `data-pob`) |
| `js/platform-tts.js` | `speechSynthesis` au-dessus du TTS Android (WebView sans synthèse vocale) | — |
| `js/speech-capability.js` (`MQSpeechCapability`) | Capacité de reconnaissance vocale : web compatible, web incompatible, natif indisponible | Politique native (V1 : indisponible) |
| `js/parent-gate.js` (`MQParentGate`) | Garde « espace adulte réellement affiché » | Sélecteur du marqueur (`data-a^="ptab:"`), nom du drapeau |
| `js/link-policy.js` (`MQLinks`) | Liens externes : texte côté enfant, cliquables côté adulte, garde globale clic et `window.open` | Classe CSS, message |
| `js/analytics.js` (`MQAnalytics`) | Statistiques : désactivées par défaut, accord adulte, listes fermées, sans identifiant, prénoms filtrés | `EVENTS`, `VALUES`, source des prénoms |
| `js/entitlements.js` (`MQEntitlements`) | Droits : liste fermée de produits, interface PurchaseProvider, achat réservé à l'adulte, état versionné | `PRODUCTS`, clé de stockage |
| `js/remote-sync-config.js` (`MQRemoteSync`) | Feature flag de backend : désactivé sans configuration validée (https, clé publishable seulement) | Motifs d'URL et de clé, schéma |
| `tests/mobile-runtime.test.js` | Faux pont Capacitor (App, TTS), WebView sans `speechSynthesis`, hors ligne natif, redémarrage | Sélecteurs d'écrans |
| `tests/android-project.test.js`, `tests/android-backup.test.js` | Contrôles statiques Android (SDK, permissions, signature, icônes, secrets, sauvegarde, sync réelle) | Couleurs, identifiants |
| `tests/external-links.test.js` | Audit des domaines + garde des liens | Table des domaines (propre à chaque app) |
| `tests/analytics-guard.test.js`, `tests/entitlements-guard.test.js`, `tests/analytics-entitlements.test.js` | Invariants statistiques et achats | Évènements, produits |
| `tests/speech-capability.test.js` | Trois situations de reconnaissance vocale, aucune simulation | Écran de l'activité orale |
| `docs/store-release-checklist.md`, `docs/store-data-safety.md` (structure) | Checklists Google, Samsung et Fire ; matrice des données | Contenu par app |

## B. Patterns réutilisables (à adapter)

| Fichier | Pattern | Ce qui change d'une app à l'autre |
|---|---|---|
| `js/sync-snapshot.js` (`MQSyncSnapshot`) | **Liste blanche** du payload distant : seul ce que l'écran distant affiche part ; sous-objets réduits | La liste des champs (ici : prénom, classe, progression…) |
| `tests/sync-privacy.test.js` | Interception réseau + rendu distant **identique** avec le payload réduit + profil local intact | Écran distant, champs |
| `supabase/migrations/…_finot_parent_sync.sql` | Backend « jetons porteurs hachés » :<br>• schéma privé non exposé ;<br>• RLS forcée ;<br>• RPC `SECURITY DEFINER` à `search_path` vide ;<br>• validation serveur du payload ;<br>• anti-énumération ;<br>• suppression, rotation, débit, rétention | Tables métier, liste blanche, types d'actions |
| `supabase/tests/run.mjs`, `tests/supabase-design.test.js` | Tests PostgreSQL réels en local (PGlite) + cohérence client/serveur | Scénarios métier |
| `parent.html` (partie `rpc`/`remoteOff`) | Page « adulte distant » qui lit le même flag | Rendu métier |
| `js/app-actions.js` (`syncBody`, `syncdelete`) | Écran d'activation ou désactivation, suppression serveur à double confirmation | Libellés |
| `js/app-pwa.js` (branche native) | Version lue dans le manifeste du paquet en natif, service worker en web | — |
| `js/app-state.js` (`rpc`, `remoteSyncOn`) | Client RPC désactivable, aucune requête sans backend | Nom des RPC |
| `docs/multistore-runtime.md` | Rapport technique de mise en store | — |

## C. Spécifique Finot

| Fichier | Pourquoi |
|---|---|
| `js/app-lesson.js` (étape Prononciation, `pronself`) | Pédagogie des langues vivantes (cours, phrases cibles, seuil de 74 %) |
| `js/pedagogy-upgrade.js` (micro de Finot) | Personnage Finot, aide de l'enfant |
| `js/audio-engine.js` (`Rec`) | Moteur audio pédagogique (dictées, locales FR/EN/IT) |
| `js/reading-aloud-poc.js` | POC de lecture à voix haute (école primaire) |
| `js/app-atlas.js` (crédit Vikidia) | Contenu atlas et licences des textes |
| `js/app-actions.js` (sources du programme, Éduscol) | Programme scolaire français |
| `index.html` (ordre des scripts) | Assemblage Finot (zéro build, ordre des globales) |
| `sw.js` (`VERSION`) | Versionnement de la PWA Finot |
| `android/app/src/main/res/**` (icônes, splash, `strings.xml`, couleurs) | Identité visuelle de Finot |
| `tests/hooks.test.js` (configuration de test du suivi) | Économie des bons points et récompenses parentales |
| Champs du snapshot (`name`, `grade`, `chap`, `merit`, `competencies`, `answerLog`, `interrogations`…) | Profils enfants, suivi scolaire, XP, bons points, compétences |
| Types d'actions parent (`accept`, `refuse`, `bonus`, `rewards`, `rules`, `interrogation*`) | Récompenses et interrogations Finot |

## Ordre d'extraction conseillé (après la V1 Store, pas avant)

1. Paquet et Android :
   - `package-www.mjs` ;
   - modèle `android/` avec propriétés renommées ;
   - `android-assets.py` ;
   - tests statiques.
2. Couche plateforme : `platform.js`, `platform-tts.js`, `speech-capability.js` et leurs tests.
3. Gardes adulte et enfant : `parent-gate.js`, `link-policy.js`, `analytics.js`, `entitlements.js` et leurs tests.
4. Backend à jetons hachés : migration paramétrable, liste blanche générée depuis un schéma commun client/serveur, tests PGlite.

**Règle** : une brique n'entre dans la Factory qu'avec ses tests, et seulement une fois validée sur Finot en production.
