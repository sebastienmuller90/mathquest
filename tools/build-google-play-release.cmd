@echo off
rem Finot Académie — build de l'AAB Google Play (AUCUNE publication).
rem
rem   tools\build-google-play-release.cmd            AAB NON signé : vérification technique seulement
rem   tools\build-google-play-release.cmd --sign     AAB signé (variables FINOT_UPLOAD_* exigées, voir docs\google-play\signing.md)
rem   tools\build-google-play-release.cmd --record interne   après téléversement manuel : note le versionCode dans le registre
rem
rem Ce fichier ne contient et ne demande AUCUN secret : la signature passe uniquement par des variables d'environnement.
setlocal
cd /d "%~dp0\.."

if not defined JAVA_HOME if exist "%LOCALAPPDATA%\jdk21" (
  for /d %%D in ("%LOCALAPPDATA%\jdk21\jdk-21*") do set "JAVA_HOME=%%~fD"
)
if not defined ANDROID_HOME if exist "%LOCALAPPDATA%\Android\Sdk" set "ANDROID_HOME=%LOCALAPPDATA%\Android\Sdk"
if defined JAVA_HOME set "PATH=%JAVA_HOME%\bin;%PATH%"

where node >nul 2>nul
if errorlevel 1 (
  echo ECHEC : Node.js introuvable dans le PATH.
  exit /b 1
)

node tools\google-play-release.mjs %*
set "RC=%ERRORLEVEL%"
if not "%RC%"=="0" echo.& echo Release interrompue ^(code %RC%^) : rien n'a ete publie.
exit /b %RC%
