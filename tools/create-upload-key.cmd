@echo off
rem Finot Académie — création de la clé d'IMPORT (« upload key ») pour Google Play.
rem
rem À lancer UNE SEULE FOIS, par le propriétaire, sur son PC. Ce script ne connaît AUCUN mot de passe :
rem keytool les demande lui-même, en direct, et ils ne sont ni affichés ni enregistrés par Finot ni par Git.
rem
rem   tools\create-upload-key.cmd                         crée %USERPROFILE%\.finot\finot-upload.jks
rem   tools\create-upload-key.cmd D:\coffre\finot.jks      chemin choisi (HORS du dépôt)
rem
rem Avec Play App Signing, Google garde la clé de signature finale ; cette clé ne sert qu'à prouver que le téléversement
rem vient de vous. Sauvegardez le fichier ET les mots de passe (gestionnaire de mots de passe) : en cas de perte, une
rem réinitialisation de la clé d'import est possible via le support Play Console, mais lente.
setlocal
cd /d "%~dp0\.."

if not defined JAVA_HOME if exist "%LOCALAPPDATA%\jdk21" (
  for /d %%D in ("%LOCALAPPDATA%\jdk21\jdk-21*") do set "JAVA_HOME=%%~fD"
)
if defined JAVA_HOME set "PATH=%JAVA_HOME%\bin;%PATH%"
where keytool >nul 2>nul
if errorlevel 1 (
  echo ECHEC : keytool introuvable ^(installer un JDK 21 ou definir JAVA_HOME^).
  exit /b 1
)

set "KS=%~1"
if "%KS%"=="" set "KS=%USERPROFILE%\.finot\finot-upload.jks"

rem Refuse un keystore place dans le depot
set "REPO=%CD%"
echo "%KS%" | findstr /i /c:"%REPO%" >nul
if not errorlevel 1 (
  echo ECHEC : le keystore ne doit jamais etre dans le depot ^(%REPO%^). Choisissez un autre chemin.
  exit /b 1
)
if exist "%KS%" (
  echo ECHEC : %KS% existe deja. Rien n'a ete modifie ^(une cle d'import ne s'ecrase jamais^).
  exit /b 1
)
for %%I in ("%KS%") do if not exist "%%~dpI" mkdir "%%~dpI"

echo.
echo Creation de la cle d'import : %KS%
echo keytool va vous demander : mot de passe du keystore, mot de passe de la cle, puis votre identite.
echo Utilisez des mots de passe longs et uniques ; ne les tapez nulle part ailleurs que dans keytool.
echo.
keytool -genkeypair -v -keystore "%KS%" -alias finot-upload -keyalg RSA -keysize 4096 -validity 9125
if errorlevel 1 (
  echo ECHEC de keytool.
  exit /b 1
)

echo.
echo Cle creee. Pour construire l'AAB signe, definir dans CE terminal (jamais dans un fichier du depot) :
echo   set FINOT_UPLOAD_KEYSTORE=%KS%
echo   set FINOT_UPLOAD_KEY_ALIAS=finot-upload
echo   set FINOT_UPLOAD_KEYSTORE_PASSWORD=^<mot de passe du keystore^>
echo   set FINOT_UPLOAD_KEY_PASSWORD=^<mot de passe de la cle^>
echo puis : tools\build-google-play-release.cmd --sign
echo.
echo Empreintes a conserver ^(elles ne sont pas secretes^) :
keytool -list -v -keystore "%KS%" -alias finot-upload | findstr /i "SHA1 SHA256"
exit /b 0
