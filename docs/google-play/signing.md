# Finot Académie — Signature Google Play (Play App Signing + clé d'import)

Aucun secret n'est stocké dans ce dépôt. Ce document décrit l'architecture et les commandes Windows exactes.

## 1. Architecture

| Clé | Qui la détient | Rôle |
|---|---|---|
| **Clé de signature de l'application** | **Google** (Play App Signing) | signe les APK distribués aux utilisateurs ; jamais sur votre PC |
| **Clé d'import (« upload key »)** | **Vous**, fichier local hors dépôt | prouve que l'AAB téléversé vient de vous |

Pour une nouvelle application, Play App Signing est obligatoire (on téléverse un AAB signé de la clé d'import ; Google re-signe).
Avantage : si la clé d'import est perdue ou compromise, Google peut la réinitialiser sans perdre l'application.

Côté code : `android/app/build.gradle` lit **uniquement l'environnement**. Sans variables, `bundleRelease` produit un AAB **non signé**
(utile pour vérifier, impossible à téléverser).

| Variable d'environnement | Contenu |
|---|---|
| `FINOT_UPLOAD_KEYSTORE` | chemin du fichier keystore (hors dépôt) |
| `FINOT_UPLOAD_KEYSTORE_PASSWORD` | mot de passe du keystore |
| `FINOT_UPLOAD_KEY_ALIAS` | alias de la clé (par défaut proposé : `finot-upload`) |
| `FINOT_UPLOAD_KEY_PASSWORD` | mot de passe de la clé |

Ces noms sont ceux déjà utilisés par `app/build.gradle` et ses tests : ils ont été conservés.

## 2. Générer la clé d'import (une seule fois)

Dans **CMD** ou **PowerShell**, depuis la racine du dépôt :

```
tools\create-upload-key.cmd
```

- crée `%USERPROFILE%\.finot\finot-upload.jks` (ou le chemin passé en argument, **hors du dépôt** : le script refuse sinon) ;
- `keytool` vous demande lui-même les mots de passe et votre identité ; ils ne passent par aucun fichier ni aucun script de Finot ;
- n'écrase jamais un keystore existant ;
- affiche les empreintes SHA-1/SHA-256 (non secrètes).

**Sauvegardez** le `.jks` et les deux mots de passe (gestionnaire de mots de passe + copie hors ligne).

## 3. Construire l'AAB signé

**CMD :**

```
set FINOT_UPLOAD_KEYSTORE=%USERPROFILE%\.finot\finot-upload.jks
set FINOT_UPLOAD_KEY_ALIAS=finot-upload
set FINOT_UPLOAD_KEYSTORE_PASSWORD=<mot de passe du keystore>
set FINOT_UPLOAD_KEY_PASSWORD=<mot de passe de la clé>
tools\build-google-play-release.cmd --sign
```

**PowerShell :**

```
$env:FINOT_UPLOAD_KEYSTORE = "$env:USERPROFILE\.finot\finot-upload.jks"
$env:FINOT_UPLOAD_KEY_ALIAS = "finot-upload"
$env:FINOT_UPLOAD_KEYSTORE_PASSWORD = Read-Host "Mot de passe du keystore"
$env:FINOT_UPLOAD_KEY_PASSWORD = Read-Host "Mot de passe de la clé"
tools\build-google-play-release.cmd --sign
```

Les variables n'existent que dans cette fenêtre de terminal. Ne jamais les mettre dans un fichier du dépôt (un fichier nommé
`finot-release.env*` est de toute façon ignoré par Git).

Le script s'arrête sans rien produire si : une variable manque, le keystore est introuvable ou **dans le dépôt**, un test est rouge,
la base Git est incorrecte, l'arbre est modifié, le `versionCode` a déjà été téléversé, une permission non prévue apparaît, ou la
signature n'est pas vérifiée (`jarsigner -verify`).

Résultat : `artifacts\google-play\finot-academie-<versionName>-<versionCode>.aab`, résumé `release-summary.json` (SHA-256, HEAD,
permissions). Le dossier `artifacts\` n'est pas versionné.

## 4. Après le téléversement (action humaine)

1. Téléverser l'AAB dans Play Console (piste **Test interne** d'abord).
2. Enregistrer le `versionCode` pour qu'il ne soit jamais réutilisé :
   ```
   tools\build-google-play-release.cmd --record interne
   ```
   puis valider `docs/google-play/version-ledger.json` dans Git.

## 5. Vérifier une signature à la main (facultatif)

```
"%JAVA_HOME%\bin\jarsigner" -verify artifacts\google-play\finot-academie-1.0.0-8075006.aab
```

## 6. Ce qu'il ne faut jamais faire

- committer un `.jks`, `.keystore`, `.p12`, `.pem`, `keystore.properties` (ignorés par `.gitignore` et refusés par
  `tests/google-play-release.test.js`) ;
- coller un mot de passe dans un message de commit, une PR, un ticket ou un fichier ;
- téléverser un AAB construit avec `--allow-dirty` ou `--skip-tests`.
