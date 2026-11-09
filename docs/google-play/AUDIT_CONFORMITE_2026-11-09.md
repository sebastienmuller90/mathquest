# Finot Académie — Audit factuel de préparation Google Play (09/11/2026)

Base du dépôt : `main@43eb4cc`. AAB audité : `finot-academie-1.0.0-8075016-NON-SIGNE.aab` (hors Git).
Ce document confronte l'AAB réel, le code, les documents du dépôt et les pages officielles Google. Ce n'est pas un avis juridique.
Aucune conformité n'est supposée : chaque ligne porte un des trois statuts suivants.

- **DÉMONTRÉ** : preuve citée (mesure sur l'AAB, fichier du dépôt ou page officielle consultée).
- **PRÉPARÉ** : texte ou réglage prêt dans le dépôt, mais à saisir ou à confirmer par l'éditeur (Play Console, juridique, appareil réel).
- **MANQUANT** : information ou décision absente du dépôt, que personne ne peut inventer.

Méthode : l'AAB a été extrait dans un dossier temporaire (hors dépôt). Le manifeste, qui est en format protobuf, a été décodé avec un petit script local (aapt2 36.0.0 ne lit pas les AAB). Le SHA-256 recalculé de l'AAB est `c029eb0beaa55cf29016cdb462b90900ee0994b2a72f08cfe1352e9696119700` : identique à celui attendu et à `release-summary.json`. La copie `D:\UpFactory\Releases\Finot-Academie-8075016-non-signe.aab` a le même SHA-256. Aucun secret n'a été lu ni affiché.

## 1. Valeurs réelles relevées dans l'AAB 8075016

| Élément | Valeur relevée | Preuve |
|---|---|---|
| applicationId (`package`) | `fr.finot.academie` | manifeste de l'AAB |
| versionCode / versionName | `8075016` / `1.0.0` | manifeste ; `finot-package.json` interne (`8.75.16-parents-garde-2026-11-08`) |
| minSdk / targetSdk / compileSdk | 24 / **36** / 36 | manifeste (`uses-sdk`, `compileSdkVersion`) ; `android/variables.gradle` |
| Outils | AGP 8.13.0 ; bundletool 1.18.1 | `app-metadata.properties`, `BundleConfig.pb` |
| Permissions | `android.permission.INTERNET` ; `fr.finot.academie.DYNAMIC_RECEIVER_NOT_EXPORTED_PERMISSION` (niveau `signature`, ajoutée par AndroidX, sans effet pour l'utilisateur) | manifeste |
| `AD_ID` | **absente** (retirée par `tools:node="remove"`) | manifeste fusionné |
| `queries` | une intention `android.intent.action.TTS_SERVICE` (synthèse vocale) | manifeste |
| `allowBackup` / `fullBackupContent` | `false` / `false` ; `dataExtractionRules` présent (cloud-backup et device-transfer excluent tout) | manifeste ; `res/xml/data_extraction_rules.xml` |
| `debuggable` | non présent dans le manifeste (valeur par défaut : faux) ; `debuggable false` en release | manifeste ; `android/app/build.gradle` |
| Trafic en clair | `cleartextTrafficPermitted="false"`, autorités système seules ; Capacitor : `allowMixedContent=false`, `webContentsDebuggingEnabled=false`, schéma `https`, hôte `localhost`, aucun `server.url` | `network_security_config.xml` de l'AAB ; `capacitor.config.json` de l'AAB |
| Composants exportés | `MainActivity` (exportée, seul filtre MAIN/LAUNCHER) ; `ProfileInstallReceiver` (exporté, protégé par la permission système `android.permission.DUMP`, composant AndroidX standard). Non exportés : `FileProvider`, `InitializationProvider` | manifeste |
| Liens profonds | **aucun** (aucun filtre VIEW/BROWSABLE ni `data scheme`). `custom_url_scheme` existe dans `strings.xml` mais n'est référencé par aucun filtre | manifeste |
| Icônes | icône adaptative (arrière-plan, premier plan, **monochrome**) en `mipmap-anydpi-v26` pour `ic_launcher` et `ic_launcher_round` ; densités hdpi à xxxhdpi | `res/mipmap-*` de l'AAB |
| Écran de démarrage | API SplashScreen AndroidX (`Theme.SplashScreen`, fond `finot_splash_background`) + `splash.png` portrait/paysage | `styles.xml`, `res/drawable-*` |
| Nom affiché | `Finot Académie` (`app_name`) | `resources.pb` |
| Signature | **non signée** (aucun fichier sous `META-INF/` à la racine de l'AAB) | liste de l'archive (2358 entrées) |
| Taille | 59 359 434 octets (≈ 56,6 Mio) ; contenu web ≈ 64 Mo non compressés (`base/assets/public`, 1910 fichiers) | mesure |
| ABI | **aucune bibliothèque native** (aucun `.so`, aucun dossier `lib/`) : pas de contrainte 64 bits, bundle neutre vis-à-vis des ABI | liste de l'archive |
| Modules | un seul module `base` ; pas de module de fonctionnalité | arborescence |
| Fichiers sensibles dans l'AAB | **aucun** : pas de `.jks`/`.keystore`/`.p12`/`.pem`, pas de `.env`, pas de `google-services`, pas de `.map`, pas de dossier `tests`, pas de `.md`/`.ps1`/`.log`. Une seule correspondance du motif « secret » : un commentaire d'exemple (`sb_publishable_…`) dans `js/remote-sync-config.js`, sans valeur réelle | recherche sur l'AAB extrait |
| Fichiers sensibles dans le dépôt | **aucun suivi par Git** : aucun `.jks/.keystore/.p12/.pem/.env/.map/keystore.properties/google-services` dans `git ls-files` (2222 fichiers) ; aucune clé privée ni secret hors `docs/` et `tests/` ; `.gitignore` bloque `*.jks`, `*.keystore`, `*.p12`, `*.pem`, `keystore.properties`, `finot-release.env*` | `git ls-files`, `git grep` (sorties non affichées) |
| Suivi parent distant | **désactivé** : `window.FINOT_REMOTE_SYNC` n'est défini nulle part dans l'AAB ; `MQRemoteSync.configured()` renvoie faux ; seule occurrence = le commentaire d'exemple | `js/remote-sync-config.js` de l'AAB |
| URL externes dans le code livré | uniquement des liens de crédits/sources (Wikimedia Commons, Vikidia, Met Museum, NASA, education.gouv.fr) et des exemples de faux sites de phishing cités comme texte pédagogique ; aucune ressource chargée à distance | recherche sur l'AAB extrait |

## 2. Exigences : statut, preuve, action, responsable

Responsable : **Éditeur** = le titulaire du compte (seul à pouvoir décider ou saisir) ; **Dépôt** = modification du code ou des docs ; **Console** = saisie dans Play Console.

### 2.1 Binaire

| # | Exigence | Statut | Preuve ou source (consultée le 09/11/2026) | Action restante | Qui |
|---|---|---|---|---|---|
| B1 | Niveau d'API cible : applications mobiles standard ciblant **API 36 (Android 16) ou plus** pour toute nouvelle app ou mise à jour à partir du 31/08/2026 (prolongation possible jusqu'au 01/11/2026, échue) | **DÉMONTRÉ** | `targetSdk=36` dans l'AAB ; https://support.google.com/googleplay/android-developer/answer/11926878 | Revérifier à chaque mise à jour (la barre monte chaque année) | Dépôt |
| B2 | Format AAB | **DÉMONTRÉ** | fichier `.aab`, bundletool 1.18.1 | Aucune | — |
| B3 | Aucune permission sensible ; pas d'`AD_ID` pour une app qui vise des enfants | **DÉMONTRÉ** | manifeste (INTERNET seule) | Répondre « Non » à l'ID publicitaire en Console | Éditeur |
| B4 | Permission `INTERNET` justifiée | **PRÉPARÉ** | Sert au suivi parent futur, qui est désactivé. L'app charge ses fichiers localement (`https://localhost`) et les liens externes s'ouvrent dans le navigateur du système ; elle ne semble donc pas en avoir besoin en V1. Non testée sans la permission | Décision produit : la retirer en V1 (réduit la surface et simplifie l'argumentaire Familles/Sécurité des données) ou la garder pour l'avenir. Si retrait : tester sur appareil, refaire l'AAB et le manifeste | Éditeur (décision), Dépôt |
| B5 | Pas de sauvegarde automatique des données d'enfants | **DÉMONTRÉ** | `allowBackup=false`, `dataExtractionRules` | Aucune | — |
| B6 | Build non débogable, sans traces de test | **DÉMONTRÉ** | voir §1 | Aucune | — |
| B7 | `minifyEnabled false` (pas d'obfuscation/shrink) | **DÉMONTRÉ** (constat) | `android/app/build.gradle` | Facultatif : sans effet sur la conformité. Aucun fichier de symboles à téléverser car il n'y a pas de code natif | — |
| B8 | Validation sur appareil physique | **MANQUANT** | `final-human-inputs.md` §5, `physical-device-validation.md` : seuls des émulateurs (API 30, 36 ; le grand téléphone API 35 n'a pas pu démarrer) ont été utilisés | Dérouler le protocole sur au moins un vrai téléphone ; rejouer le grand téléphone API 35 après libération d'espace sur C: ; investiguer le débordement du bouton « Valider » vu une fois (police 2×) | Éditeur |
| B9 | Test de mise à niveau (installation d'une version supérieure par-dessus) | **MANQUANT** | `version-ledger.json` : `uploaded: []`, aucune version publiée. Le `versionCode` ne doit jamais redescendre | Après le premier téléversement, enregistrer le code (`--record`) | Éditeur |

### 2.2 Signature

| # | Exigence | Statut | Preuve ou source | Action restante | Qui |
|---|---|---|---|---|---|
| S1 | AAB signé avec une clé d'**upload** ; Play App Signing | **PRÉPARÉ** | https://support.google.com/googleplay/android-developer/answer/9842756 (cité par `verification-conformite-2026-11.md`) ; `docs/google-play/signing.md` | Voir §4 : signer le 8075016 puis l'enrôler dans Play App Signing au premier téléversement | Éditeur |
| S2 | Clé d'upload existante | **DÉMONTRÉ (existence)** | Un fichier `C:\Users\sebas\.finot\finot-upload.jks` (4452 octets, 02/11/2026) existe. Le certificat de l'AAB 8075009 (signé) indique RSA 4096, SHA384withRSA, validité jusqu'au 27/10/2051, organisation « UpFactory Apps », empreinte SHA-256 `70:9C:46:CB:EE:7C:0C:6B:7C:B3:C9:F3:59:1D:25:77:9A:02:54:DE:86:71:35:C5:C2:6A:81:68:A5:2D:74:5C`. Le fichier n'a pas été ouvert | Confirmer que c'est bien la clé retenue, et que ses mots de passe sont notés dans un gestionnaire | Éditeur |
| S3 | Sauvegarde de la clé d'upload (au moins deux emplacements) | **MANQUANT** | Aucune preuve d'une copie hors du PC (`signing.md` §2 la demande) | Copier le `.jks` sur deux supports distincts ; consigner les mots de passe | Éditeur |
| S4 | Le script `Signer-Finot-AAB.ps1` correspond au bon AAB | **À CORRIGER** | Ses valeurs par défaut visent l'AAB **8075014** (SHA-256 `f8e2321c…7899`, obsolète) et refusent donc le 8075016 | Lancer avec `-InputAab`, `-OutputAab` et `-ExpectedSha` du 8075016 ; ou mettre à jour les défauts (fichier hors dépôt, non modifié ici) | Éditeur / Dépôt |

### 2.3 Documents, vie privée, cohérence

| # | Exigence | Statut | Preuve ou source | Action restante | Qui |
|---|---|---|---|---|---|
| P1 | Politique de confidentialité en ligne, publique, sans authentification, sans PDF | **DÉMONTRÉ** | HTTP 200, `text/html`, le 09/11/2026 : https://sebastienmuller90.github.io/mathquest/docs/google-play/privacy-policy-public.html ; le texte publié porte la date « 4 novembre 2026 », comme le fichier du dépôt | Reporter l'URL exacte dans la Console | Éditeur |
| P2 | Lien vers la politique dans l'app | **DÉMONTRÉ (code)** | `PRIVACY_URL` dans `js/app-actions.js` ; test `tests/parent-privacy-link.test.js` | Vérifier à l'écran sur appareil | Éditeur |
| P3 | Cohérence politique / données réelles | **DÉMONTRÉ** | Les données listées (prénom, avatar, niveau, genre, date de naissance facultative, réponses d'accueil, progression, préférences, code parent) correspondent à `data-safety-draft.md` §2 et au code (localStorage `mathquest_v1`, `mathquest_profiles_v2`). Aucun compte, aucun SDK, aucun envoi : confirmé par l'AAB (suivi distant inactif) | Aucune | — |
| P4 | Politique : identification de l'éditeur | **PRÉPARÉ** | Nom public « UpFactory Apps » et courriel `upfactory.apps@gmail.com`, sans nom légal ni adresse postale | Décider si un nom légal/adresse doivent y figurer (dépend du statut trader, voir D3) | Éditeur |
| P5 | Section **Sécurité des données** remplie (obligatoire même sans collecte) | **PRÉPARÉ** | https://support.google.com/googleplay/android-developer/answer/10787469 : « collecter » = transmettre hors de l'appareil ; formulaire obligatoire avec lien vers la politique ; badge « Politique Familles » optionnel. Brouillon : `data-safety-draft.md` (aucune collecte, aucun partage) | Saisir en Console ; rejouer si le binaire change | Éditeur |
| P6 | Voix de synthèse réseau | **PRÉPARÉ** | Mentionnée dans la politique §5 et le brouillon (moteur système ; hors contrôle de l'app) | Aucune | — |
| P7 | Crédits, licences d'images, cartes, polices | **PRÉPARÉ** | Polices Fredoka/Nunito : SIL OFL 1.1, `fonts/LICENSES.txt`. Qrcode-generator : MIT. Images de leçons : auteur + licence + source par image dans `data/lesson-images.js`, affichés dans l'écran « Crédits des images » de l'app. Cartes : `data/licence-cartes.html` (FDL 1.2 pour 5 cartes). Atlas : Wikidata (CC0), Vikidia (CC BY-SA) avec lien par fiche. Aucune licence « non commerciale » déclarée | Voir D8 : la source/licence des drapeaux et des autres cartes de l'atlas n'est pas détaillée hors du champ `cred` de `atlas.js` ; l'exigence CC BY-SA/FDL (mention, lien vers la licence) n'a pas été vérifiée image par image | Éditeur / Dépôt |
| P8 | Contradiction entre documents | **CORRIGÉ** | `play-console-answers-draft.md` annonçait la politique « datée du 03/11/2026 » alors que le fichier et la version publiée sont datés du 4 novembre 2026. Ligne corrigée | — | Dépôt (fait) |
| P9 | Mentions légales publiques | **MANQUANT** | Aucune page « mentions légales » trouvée dans le dépôt (`git ls-files`). Pour une application distribuée en France, l'identité de l'éditeur (ou de l'hébergeur) est attendue ; dépend du statut (particulier ou professionnel) | Décider avec D3 si une page est nécessaire et ce qu'elle indique | Éditeur |
| P10 | Anciennes versions dans les docs | **À SIGNALER** | `release-audit.md`, `release-checklist.md`, `signing.md` (exemple) citent encore le `versionCode 8075006` ; `ASSET_STATUS_2026-11-08.md` fait foi pour le 8075016 | Mise à jour documentaire non faite ici (hors périmètre « contradiction triviale ») | Dépôt |
| P11 | Documents internes qui décrivent un suivi à distance | **À SIGNALER** | `docs/store-data-safety.md` et `docs/privacy-policy-draft.md` décrivent le suivi parent comme « futur/désactivé » : cohérent avec l'AAB, mais ces documents ne sont pas ceux à publier | À relire avant toute activation du suivi | Dépôt |

### 2.4 Familles, public cible, contenu

| # | Exigence | Statut | Preuve ou source | Action restante | Qui |
|---|---|---|---|---|---|
| F1 | Public cible déclaré honnêtement ; toute tranche < 13 ans impose la politique Familles | **PRÉPARÉ** | https://support.google.com/googleplay/android-developer/answer/9893335. Tranches prévues : 6–8, 9–12, 13–15 (`final-human-inputs.md` §3). Les deux premières sont des enfants | Cocher ces tranches à la saisie ; ne pas ajouter de tranche pour élargir la diffusion | Éditeur |
| F2 | Pas d'identifiant publicitaire ni SDK publicitaire | **DÉMONTRÉ** | Manifeste et dépendances (`dependencies.pb`, `META-INF/*.version` : AndroidX, Kotlin, Capacitor ; aucun Firebase/Play Services/AdMob/Billing) | Aucune | — |
| F3 | Publicités déclarées « Non » | **PRÉPARÉ** | `play-console-answers-draft.md` §4 | Saisir en Console | Éditeur |
| F4 | Programme « Designed for Families » (facultatif) | **MANQUANT (décision)** | `families-compliance.md` §4 le laisse ouvert. Google (09/11/2026) accepte de nouveaux candidats au programme de SDK publicitaires auto-certifiés ; sans objet ici | Décider d'une candidature éventuelle | Éditeur |
| F5 | Classification de contenu (IARC) | **PRÉPARÉ** | `play-console-answers-draft.md` §3 (questionnaire à remplir) | Voir D6 : le contenu de cours évoque la Shoah, un génocide, l'esclavage, la Seconde Guerre mondiale, alcool/tabac (prévention), reproduction humaine (SVT). `families-compliance.md` écrit « aucun contenu violent, sexuel… » : à nuancer en « contenu éducatif et historique » et à répondre fidèlement au questionnaire | Éditeur |
| F6 | Aucun contenu partagé entre utilisateurs, aucun chat humain | **DÉMONTRÉ (code/doc)** | `families-compliance.md` §2 ; assistant Finot local | Aucune | — |
| F7 | Liens externes réservés aux adultes | **DÉMONTRÉ (code)** | `js/link-policy.js`, `tests/external-links.test.js` | Aucune | — |
| F8 | Dossier d'accès : « App access » (toutes les fonctions accessibles sans compte) | **PRÉPARÉ** | `play-console-answers-draft.md` §4 | Saisir | Éditeur |
| F9 | Déclarations d'application complémentaires (annonces, achats, finances, santé, actualités, etc.) | **PRÉPARÉ** | Brouillon : aucune annonce, aucun achat, aucun contenu financier ou de santé | Saisir ; vérifier à l'écran la liste réelle des formulaires de la Console | Éditeur |

### 2.5 Compte, tests, publication

| # | Exigence | Statut | Preuve ou source | Action restante | Qui |
|---|---|---|---|---|---|
| C1 | Compte personnel créé après le 13/11/2023 : test fermé avec **au moins 12 testeurs inscrits en continu pendant au moins 14 jours** avant la demande d'accès à la production | **DÉMONTRÉ (règle)** / **MANQUANT (type de compte)** | https://support.google.com/googleplay/android-developer/answer/14151465 (chiffres 12 et 14 confirmés le 09/11/2026 ; un testeur qui se retire et revient repart à zéro). Plan : `closed-test-plan.md` (15 à 18 testeurs) | Dire si le compte est personnel ou organisation ; recruter les testeurs | Éditeur |
| C2 | Création du compte : nom légal, adresse, courriel, téléphone ; vérification d'identité avant publication ; un compte d'organisation exige un numéro D-U-N-S | **MANQUANT** | https://support.google.com/googleplay/android-developer/answer/13628312 | Créer et vérifier le compte | Éditeur |
| C3 | Déclaration « trader » (DSA) : tous les comptes doivent déclarer s'ils sont ou non « trader » ; **avant le 01/02/2027** pour les comptes existants, **dès la création** pour un nouveau compte ; confirmation à faire aussi pour chaque application ; affichage public de coordonnées dès le 01/03/2027 pour un trader | **MANQUANT (décision)** | https://support.google.com/googleplay/android-developer/answer/17594752 (consultée le 09/11/2026 ; la page indique des conséquences pouvant aller jusqu'à la suppression de la liste des applications) | Trancher (voir D3) | Éditeur |
| C4 | Vérification des développeurs Android : protections dès le 30/09/2026 (Brésil, Indonésie, Singapour, Thaïlande) ; extension mondiale prévue en 2027 ; Google Play enregistre automatiquement 99 % des applications ; enregistrement manuel dans la Play Console pour les autres | **MANQUANT** | https://developer.android.com/developer-verification (09/11/2026). Distribuer uniquement par Google Play ne passe pas par l'Android Developer Console | Après création du compte, contrôler que `fr.finot.academie` est bien enregistré avec la clé d'upload/signature | Éditeur |
| C5 | Fiche : titre ≤ 30, description courte ≤ 80, description longue ≤ 4000 caractères (largeur pleine ou demie comptées pareil) | **DÉMONTRÉ** | https://support.google.com/googleplay/android-developer/answer/9859152 ; longueurs réelles mesurées (points de code) : FR titre 14, courte **75**, longue **1564** ; EN titre 14, courte **69**, longue **1530** ; notes de version FR 275 et 193, EN 264 et 179 (limite 500) | Aucune | — |
| C6 | Visuels : icône 512×512 PNG 32 bits ≤ 1024 Ko ; Feature Graphic 1024×500 JPEG/PNG 24 bits sans alpha ; ≥ 2 captures (320–3840 px) ; recommandé : ≥ 4 captures 1080 px min en 16:9 ou 9:16 ; tablettes : 4 captures par type, 1080–7680 px | **PRÉPARÉ** | https://support.google.com/googleplay/android-developer/answer/9866151 (09/11/2026). Fichiers listés avec SHA-256 dans `ASSET_STATUS_2026-11-08.md` : icône, Feature Graphic, 11 captures téléphone (1080×2400), 11 tablette. Les fichiers n'ont pas été rouverts dans cet audit | Contrôler dimensions et absence d'alpha avant le téléversement ; valider visuellement la Feature Graphic | Éditeur |
| C7 | Pays/régions, tags, contacts publics | **MANQUANT** | `final-human-inputs.md` §8 | Choisir | Éditeur |
| C8 | Prix : gratuit, sans achat intégré | **PRÉPARÉ** | `js/entitlements.js` sans fournisseur ; aucun SDK Billing. Une application gratuite ne peut pas devenir payante ensuite | Confirmer le choix « gratuit » (irréversible côté Google Play) | Éditeur |
| C9 | Nouveautés de politique Google du 29/10/2026 | **DÉMONTRÉ (sans objet)** | https://support.google.com/googleplay/android-developer/answer/18100766 : réseau local, contacts, localisation, AppFunctions, abonnements : aucune fonction concernée dans l'AAB (aucune de ces permissions) | Aucune | — |

## 3. Cohérence des déclarations

| Sujet | Verdict |
|---|---|
| Politique de confidentialité ↔ données réellement stockées | Cohérent (voir P3). La politique mentionne le genre et la date de naissance facultative, présents dans le code. |
| Politique ↔ Sécurité des données ↔ manifeste | Cohérent : aucune collecte, aucun partage, `INTERNET` seule, aucune sauvegarde. Tant que le suivi distant reste désactivé. |
| Fiche Store ↔ produit | Cohérent : « hors connexion », « aucune publicité », « aucun accès micro/caméra/position/contacts » sont tous confirmés par l'AAB. |
| Public cible ↔ contenu | Une tranche 13–15 ans est déclarée avec 6–12 ans : l'app est donc « mixte » (enfants et adolescents) et relève de la politique Familles en entier. Cohérent avec les documents. |
| `families-compliance.md` « aucun contenu violent, sexuel » ↔ contenu des cours | **Écart de formulation** : le programme de collège traite de sujets historiques durs et de biologie. À formuler comme contenu éducatif lors de l'IARC (D6). |
| Documents ↔ numéros de build | Plusieurs documents citent encore 8075006 (P10). |

## 4. Signature : procédure sécurisée

Architecture : l'éditeur détient une clé d'**upload** (RSA 4096, créée localement) ; Google détient la clé de signature finale (Play App Signing). Rien de secret n'entre dans Git, le chat ou un fichier de configuration.

1. **Clé** : elle existe déjà (S2) : `C:\Users\sebas\.finot\finot-upload.jks`, hors dépôt. Ne pas la recréer : `tools\create-upload-key.cmd` refuse d'écraser un keystore existant et refuse un chemin dans le dépôt. Si l'éditeur préfère repartir de zéro, il doit le faire lui-même, en tapant les mots de passe dans `keytool` (jamais en argument de ligne de commande).
2. **Mots de passe** : saisis uniquement par l'éditeur, dans son terminal. `Signer-Finot-AAB.ps1` les lit en saisie masquée (ou dans `FINOT_UPLOAD_KEYSTORE_PASSWORD` / `FINOT_UPLOAD_KEY_PASSWORD` s'ils existent déjà), les passe à `jarsigner`/`keytool` par variables d'environnement du processus, et les efface. Ils ne doivent jamais apparaître dans Git, un message de commit, une PR ou une conversation.
3. **Sauvegardes** : deux copies du `.jks` sur des supports distincts, et les mots de passe dans un gestionnaire. En cas de perte, Google peut réinitialiser la clé d'upload, mais cela impose une demande via la Console.
4. **Signature du 8075016** : revue de `D:\UpFactory\Releases\Signer-Finot-AAB.ps1` (lecture seule).
   - Points corrects : JDK 21 (`%LOCALAPPDATA%\jdk21\jdk-21.0.13+9`), vérification du SHA-256 d'entrée, alias `finot-upload` et chemin par défaut identiques à `create-upload-key.cmd`, AAB d'origine jamais modifié, signature dans un dossier temporaire, refus d'écraser une sortie existante, double contrôle (`jarsigner -verify` et empreinte du certificat), rien n'est téléversé, `SHA-256` comme condensé.
   - **Écart (S4)** : les paramètres par défaut visent le 8075014. Pour le 8075016 : `-InputAab 'D:\UpFactory\Releases\Finot-Academie-8075016-non-signe.aab' -OutputAab 'D:\UpFactory\Releases\Finot-Academie-8075016-signe.aab' -ExpectedSha 'c029eb0beaa55cf29016cdb462b90900ee0994b2a72f08cfe1352e9696119700'`.
   - Remarque : `jarsigner` signe par défaut en `SHA384withRSA` pour une clé RSA 4096 (constaté sur le 8075009) ; c'est accepté par Google Play.
5. **Après signature** : comparer l'empreinte SHA-256 du certificat affichée par le script à celle du §2.2 (S2) ; téléverser dans la piste **Test interne**, activer Play App Signing, puis enregistrer le code (`tools\build-google-play-release.cmd --record interne`) et valider `version-ledger.json`.
6. **Interdits** : committer `.jks`, `.keystore`, `.p12`, `.pem`, `keystore.properties` ; téléverser un AAB construit avec `--allow-dirty` ou `--skip-tests` ; coller un mot de passe quelque part.

**Conclusion : clé de production (clé d'upload) : EXISTANTE, chemin `C:\Users\sebas\.finot\finot-upload.jks`.** Recherche de noms de fichiers `*.jks`, `*.keystore`, `*.p12`, `*.pfx` limitée à ce dossier, Documents, Bureau, Téléchargements et `D:\UpFactory` (sans ouverture) : seuls deux fichiers trouvés : la clé d'upload ci-dessus et `D:\UpFactory\Android\User\debug.keystore` (clé de débogage Android, sans lien avec la publication). Son statut d'enrôlement chez Google (aucun compte Play Console confirmé), sa sauvegarde et la conservation des mots de passe ne sont **pas démontrés**.

## 5. Informations et décisions manquantes

### 5.1 Bloquant la publication

| Réf. | Élément | Pourquoi |
|---|---|---|
| D1 | **Compte développeur Google Play** : type (personnel ou organisation), nom légal, adresse, téléphone, vérification d'identité (et D-U-N-S si organisation) | Rien ne peut être téléversé sans compte vérifié. Le type décide de l'application du test fermé 12 testeurs / 14 jours |
| D2 | **AAB signé** : exécuter la signature du 8075016 avec la clé d'upload (S4) ; sauvegarder la clé (S3) | L'AAB audité est non signé et donc non téléversable |
| D3 | **Statut trader (DSA)** : trader ou non-trader, pour le compte puis pour l'application | Obligatoire dès la création du compte (nouveau compte), sous peine de blocage. Un trader verra ses coordonnées publiées. Question juridique : un éditeur qui publie sous un nom commercial (« UpFactory Apps ») doit apprécier s'il agit dans un cadre professionnel. Je ne tranche pas |
| D4 | **Saisie des formulaires** : public cible, contenu (IARC), Sécurité des données, ID publicitaire, annonces, accès à l'app, pays | Obligatoires avant toute publication |
| D5 | **Test fermé** (si compte personnel récent) : 12 testeurs minimum, 14 jours continus (viser 15 à 18) | Condition d'accès à la production. Aucun testeur n'est recruté à ce jour |
| D6 | **Réponses IARC et public cible** à valider par l'éditeur au vu du contenu réel (histoire dure, prévention santé, SVT) | Une réponse inexacte expose au retrait (politique Familles). Les documents du dépôt sont trop affirmatifs |

### 5.2 À confirmer

| Réf. | Élément | Pourquoi |
|---|---|---|
| D7 | **Retrait ou conservation de la permission `INTERNET`** (B4) | Peut simplifier la fiche ; à tester sur appareil avant de décider |
| D8 | **Licences des drapeaux et des cartes de l'atlas** : source/licence par fichier et respect des conditions (CC BY-SA, FDL 1.2 : mention de l'auteur, lien vers la licence) | `licence-cartes.html` ne couvre que 5 cartes. À vérifier avant une publication destinée à des enfants et hébergée dans un magasin |
| D9 | **Test sur appareil réel** (B8) et reprise du grand téléphone API 35 | Les émulateurs ne remplacent pas un appareil physique |
| D10 | **Mentions légales / identité publique de l'éditeur** (P4, P9) | Dépend de D3 |
| D11 | **Programme « Designed for Families »** : candidature oui/non (F4) | Facultatif |
| D12 | **Sauvegarde et mots de passe de la clé d'upload** (S3) | Une perte rend les mises à jour difficiles |
| D13 | **Prix gratuit définitif** (C8) | Irréversible côté Google Play |
| D14 | **Pays/régions, tags, contacts publics** (C7) | Saisie de Console |
| D15 | **Validation visuelle de la Feature Graphic** et relecture humaine des textes anglais | Qualité de la fiche |
| D16 | **Vérification des développeurs Android** : contrôler l'enregistrement du paquet | Applicable surtout aux régions concernées dès 2026 |

### 5.3 Mineur

| Réf. | Élément |
|---|---|
| D17 | Documents citant encore `8075006` (P10) ; défauts du script de signature (S4) |
| D18 | `minifyEnabled false` (B7) : sans effet sur la conformité |
| D19 | La politique est servie en HTML simple ; vérifier le rendu mobile (déjà demandé dans `final-human-inputs.md` §2) |
| D20 | Les copies locales d'AAB obsolètes (`8075009` signé, `8075012`, `8075014`) dans `artifacts/` et `D:\UpFactory\Releases` : risque de téléverser le mauvais fichier ; à archiver ou supprimer par l'éditeur |

## 6. Limites de cet audit

- Les pages Google ont été lues avec un outil de récupération qui résume le contenu ; leur texte peut évoluer. La Play Console affichée au compte reste l'autorité au moment de la saisie.
- Les captures et les visuels n'ont pas été rouverts ; leurs SHA-256 viennent de `ASSET_STATUS_2026-11-08.md`.
- Le comportement sur appareil physique n'est pas démontré.
- Seul le fichier de ce document et une ligne de date de `play-console-answers-draft.md` ont été modifiés. Aucune modification d'`android/` ni du code applicatif.
