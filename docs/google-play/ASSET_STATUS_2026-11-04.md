# État des assets et de la validation Android — 04/11/2026

Base : `main` = `1e7bbd0a143cfeb4bf1bd06f9609b1f7e53fe56d` (CI verte). Version de l'application : `8.75.12` (service worker), `versionName` commercial 1.0.0, `versionCode` 8075012, package `fr.finot.academie`.

> Ce document distingue ce qui est **démontré** (preuve ci-dessous) de ce qui **reste à faire par l'éditeur**. Aucune publication n'a été réalisée.

## 1. AAB de vérification (non signé)

- Fichier local `artifacts/google-play/finot-academie-1.0.0-8075012-NON-SIGNE.aab` (hors Git), 59 345 128 octets.
- SHA-256 : `09ab5ed90dd20569346db34b0c6d227dd098d57cbaba6563f927d7707ce93c94`.
- **Reproductibilité démontrée** : deux builds successifs (`tools/build-google-play-release.cmd`) donnent exactement le même SHA-256.
- Audit intégré : non débogable, `targetSdk` 36, `allowBackup=false`, permission `INTERNET` seule (plus la permission interne de récepteur dynamique du paquet), aucun lien profond, 13 tests intégrés verts, `lintRelease` vert.
- **Cet AAB ne peut pas être téléversé** (non signé). La signature exige la clé d'upload légitime de l'éditeur (voir `signing.md` et `final-human-inputs.md`).

## 2. Visuels définitifs

| Visuel | Fichier local (hors Git) | SHA-256 |
| --- | --- | --- |
| Icône Play 512×512 | `artifacts/google-play/icon/finot-play-icon-512.png` | `95cd92ac19b8c3a4da15a4a4f56e01b2084b8a204a1210b4b5b90903c5c4b51c` |
| Feature Graphic 1024×500 | `artifacts/google-play/final/finot-feature-graphic-1024x500.png` | `146b9a5b01f9adf2e0e80989c1046fe5c190690538581c4d726f00fa633db8a1` |

## 3. Captures finales (régénérées depuis `main` final)

Source : `tools/store-screenshots.mjs`, APK debug construit depuis `1e7bbd0`, profil entièrement fictif « Léo » CM1, barre d'état Android en mode démonstration. Téléphone : AVD Pixel API 36, 1080×2400. Tablette : AVD Pixel Tablet API 36, 2560×1600. 11 écrans par format, aucune capture en double (22 empreintes distinctes), contrôle visuel du chat Finot et de l'espace Parents sur les deux formats.

Capture du chat Finot : la réponse est désormais affichée en entier (correctif du défilement dans le script de capture).

| Fichier | SHA-256 |
| --- | --- |
| `phone/01-accueil.png` | `1405db25d3dcd95c677ef93fa50fa90eb2fb67629620e429b50cda7c0e97a539` |
| `phone/02-matieres.png` | `5bba7d5ae272b4caeb47d7eb121fdc4b98a8cfb880148619261cd7f112d6e378` |
| `phone/03-cours.png` | `55e0ab5f2f583aa79cba22ccc3a382f2378802aee8e8fa28651acb66a533c39d` |
| `phone/04-exercice.png` | `4a8aba20152b767a1a6d4af684e424d6c8480c21d869c632f9a5855133096597` |
| `phone/05-correction.png` | `4942b085a4aff3282e691b20282edcbe457b350464f9ce2e5e812fca9b2a3ed5` |
| `phone/06-parcours.png` | `cafd6ba18170083735863716e68892852a4dd694b342fc1fc4f846b4764d4bad` |
| `phone/07-lecture.png` | `99f823399df0e6f37d2c05cd343a3afb27e1f1c44d321f7b00ab7bf93f941001` |
| `phone/08-dictee.png` | `5a279bce97448a517410cd74013f4f4127c097d4c8a4f95b11a6f3e5c47363f2` |
| `phone/09-finot-chat.png` | `e2dba281fb1bd453fd9711dc70b380cd1e456b807166630c697808debe6a77c4` |
| `phone/10-progression.png` | `b60e528f96bfdf1022eb837e6878e6e7d5eda493cc2ae7c03a8b3e250aa8f661` |
| `phone/11-espace-parents.png` | `b0fbe9490db9b2c73f818604a7041e94324eb441e04247635dfa3a1945768af6` |
| `tablet/01-tablet-accueil.png` | `15cb74c8911536bb583880a3f8a18670e760a14f042fdc535ee071df7c3c200c` |
| `tablet/02-tablet-matieres.png` | `8344a0e2cc538ca0754d3daf537be5d95963da3978259f17e249e2e6a77ac94d` |
| `tablet/03-tablet-cours.png` | `a3286af81e1b4b065506af8b1edeeacaf11fc57619b77bb6057295236dcebf9f` |
| `tablet/04-tablet-exercice.png` | `a66ac878f28fce964c01122ef451345b3e1110b186fd5d48ec19afa10b9a9432` |
| `tablet/05-tablet-correction.png` | `9d3032e800f2ec7f0dda0a55d40c9c6f235ecf7fdaebd5f978874c7614acafbd` |
| `tablet/06-tablet-parcours.png` | `53e0a98c3f52125135ebf64d99e0db85adb7194d6ca59d7664cf2987643a8152` |
| `tablet/07-tablet-lecture.png` | `59e0b7ca27649e017278e2dd67c6bfdf489c79c26d3211457c62b2fd794ff11f` |
| `tablet/08-tablet-dictee.png` | `0bc85d3aa4cbc74279191ef13b6f8deea50981cd8769a6add2801be9e8943baa` |
| `tablet/09-tablet-finot-chat.png` | `fa78b19d138845e278f373956cbc2123992dd1ef5bcc63587fe1d685af38d349` |
| `tablet/10-tablet-progression.png` | `764c2def032251c6981628b5b45238c57d41d749d6953f3810fd3931788e8394` |
| `tablet/11-tablet-espace-parents.png` | `be6a361d7fb457ebe26bbb811fa017b04728cc7657ba7851d291db553923fd60` |

Les PNG ne sont pas versionnés (exclus par la liste blanche) : à régénérer avec `node tools/store-screenshots.mjs --serial <émulateur> --kind phone|tablet` si besoin.

## 4. Recette sur émulateur (APK construit depuis `main`)

| AVD | Résultat | Remarque |
| --- | --- | --- |
| Pixel API 36 (téléphone) | 34 PASS, 0 FAIL, 1 SKIP | SKIP : un seul clavier installé |
| Pixel Tablet API 36 | 34 PASS, 0 FAIL, 1 SKIP (seconde exécution) | La **première** exécution a donné 4 FAIL (retour pendant le diagnostic, saisie en exercice, chat Finot portrait et paysage : saisie non reçue, clavier virtuel masqué) juste après un démarrage à froid sans instantané ; rejouée sur un démarrage normal, elle passe intégralement. Cause non établie avec certitude (état du premier démarrage de l'AVD) ; à recouper sur appareil physique. |

La recette couvre : installation, premier lancement, profil, clavier, retour Android, arrêt forcé puis reprise, hors ligne, rotation, TTS fr/en/it, mode sombre, polices et affichage agrandis (2,0×), navigation 3 boutons, refus du micro, redémarrage de l'AVD, suppression de profil, absence d'erreur JavaScript.

## 5. Non réalisé / à faire par l'éditeur

- **Appareil physique** : aucun appareil connecté, tests physiques non réalisés (voir `physical-device-validation.md`).
- **Signature de production** et téléversement : nécessitent la clé d'upload et le compte Play Console.
- **Déclarations Play Console** : à saisir par le titulaire du compte (identité légale, adresse, etc.).
