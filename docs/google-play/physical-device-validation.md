# Finot Académie — recette finale sur appareil Android réel

Objectif : exécuter une dernière validation physique avant signature/téléversement Google Play. Aucun secret ni clé de signature n'est nécessaire pour cette recette ; utiliser l'APK de validation construit depuis le `main` final.

## 1. Préparer ADB

Depuis CMD Windows :

```cmd
adb kill-server
adb start-server
adb devices -l
```

Le téléphone doit apparaître avec l'état `device`. Si plusieurs appareils sont connectés, définir :

```cmd
set SERIAL=REMPLACER_PAR_LE_SERIAL
adb -s %SERIAL% shell getprop ro.product.manufacturer
adb -s %SERIAL% shell getprop ro.product.model
adb -s %SERIAL% shell getprop ro.build.version.release
adb -s %SERIAL% shell getprop ro.build.version.sdk
```

Conserver ces quatre informations dans le compte rendu de recette.

## 2. Installation propre

L'APK debug utilise `fr.finot.academie.dev` et peut cohabiter avec une future production.

```cmd
adb -s %SERIAL% uninstall fr.finot.academie.dev
adb -s %SERIAL% install -r CHEMIN\VERS\app-debug.apk
adb -s %SERIAL% shell monkey -p fr.finot.academie.dev -c android.intent.category.LAUNCHER 1
```

Vérifier visuellement :

- nom **Finot Académie** ;
- icône Finot, fond blanc ;
- splash cohérent ;
- aucun ancien violet dans l'icône launcher Android.

## 3. Logs propres

```cmd
adb -s %SERIAL% logcat -c
adb -s %SERIAL% logcat > finot-device-log.txt
```

Effectuer les scénarios ci-dessous, puis arrêter `logcat` avec `Ctrl+C`.

Rechercher ensuite les erreurs évidentes :

```cmd
findstr /I /C:"FATAL EXCEPTION" /C:"AndroidRuntime" /C:"chromium" /C:"crash" finot-device-log.txt
```

Ne pas considérer chaque ligne Chromium comme un bug ; vérifier le contexte avant conclusion.

## 4. Parcours fonctionnel minimum

Créer uniquement un **profil fictif**.

Valider :

1. création profil ;
2. accueil ;
3. navigation matières ;
4. ouverture cours ;
5. exercice + correction ;
6. parcours personnalisé / révision ;
7. lecture ;
8. dictée ;
9. chat Finot ;
10. progression ;
11. espace Parents + code ;
12. suppression du profil fictif si un second profil est présent.

Aucune donnée réelle d'enfant ne doit apparaître dans les captures ou journaux conservés.

## 5. Clavier réel

Dans les écrans de saisie :

- clavier ouvert : champ et bouton d'action restent visibles ;
- suggestions du chat restent utilisables/défilables ;
- conversation conserve une zone lisible ;
- portrait puis paysage ;
- touche Entrée : comportement attendu, pas de double envoi ;
- si possible refaire avec Gboard puis un second clavier (Samsung Keyboard ou SwiftKey).

## 6. Synthèse vocale

Vérifier avec la voix réellement installée sur le téléphone :

- français ;
- anglais ;
- italien ;
- lecture d'une consigne ;
- dictée ;
- voix de Finot en fin d'exercice.

Le test critique de #50 : aucune fermeture/erreur si Android/Chromium refuse une voix TTS sélectionnée ; l'application doit continuer avec la voix moteur disponible.

## 7. Icône thématique Android 13+

Si Android >= 13 et le launcher le permet :

1. activer les icônes thématiques dans les réglages du launcher ;
2. revenir à l'écran d'accueil ;
3. vérifier que Finot reste identifiable et que la couche monochrome est utilisée proprement ;
4. désactiver/réactiver l'option une fois pour vérifier les deux rendus.

## 8. Taille de police / affichage

Depuis les Réglages Android, tester au moins :

- police normale ;
- police maximale ou proche de 200 % ;
- taille d'affichage agrandie.

Contrôler navigation, boutons, cartes, espace Parents et chat Finot.

## 9. Rotation

```cmd
adb -s %SERIAL% shell settings put system accelerometer_rotation 0
adb -s %SERIAL% shell settings put system user_rotation 0
```

Tester portrait, puis faire la rotation manuellement en autorisant l'orientation automatique si nécessaire. À la fin :

```cmd
adb -s %SERIAL% shell settings put system accelerometer_rotation 1
```

Ne pas imposer les réglages ADB si la surcouche constructeur les bloque ; le test visuel manuel suffit.

## 10. Hors connexion / réseau instable

Méthode la plus fiable : couper Wi-Fi et données mobiles depuis le téléphone, puis :

- fermer complètement Finot Académie ;
- relancer hors connexion ;
- ouvrir cours/exercices ;
- progresser dans une activité ;
- réactiver le réseau ;
- vérifier qu'aucune erreur ou perte de progression n'apparaît.

Ne pas utiliser une commande ADB qui modifierait durablement l'abonnement ou l'APN du téléphone.

## 11. Kill / reprise

Après avoir créé de la progression :

```cmd
adb -s %SERIAL% shell am force-stop fr.finot.academie.dev
adb -s %SERIAL% shell monkey -p fr.finot.academie.dev -c android.intent.category.LAUNCHER 1
```

Vérifier :

- profil conservé ;
- code Parents conservé ;
- progression conservée ;
- reprise cohérente ;
- aucune boucle de splash.

## 12. Redémarrage du téléphone

Redémarrer normalement le téléphone, puis rouvrir Finot Académie. Vérifier à nouveau profil, progression, espace Parents et lancement hors erreur.

## 13. Économie d'énergie

Activer le mode économie d'énergie du téléphone, refaire :

- lancement ;
- TTS ;
- exercice ;
- kill/reprise.

L'objectif est de détecter une dépendance accidentelle à un processus en arrière-plan.

## 14. Critères de validation

La recette physique est **PASS** seulement si :

- aucun crash ;
- aucune perte de données locale ;
- aucun écran bloquant ;
- saisie visible avec clavier ;
- TTS fonctionnelle ou repli propre lorsque la voix choisie est indisponible ;
- fonctionnement hors connexion ;
- launcher et icône thématique cohérents ;
- interface utilisable avec grosse police ;
- aucun défaut P0/P1/P2 découvert.

Un défaut cosmétique Store doit être consigné séparément et corrigé avant de retenir la capture correspondante.

## 15. Compte rendu minimal

```text
Appareil :
Constructeur / modèle :
Android / API :
Clavier(s) :
Moteur TTS :
Version Finot / commit :
APK SHA-256 :

Parcours principal : PASS/FAIL
Clavier portrait : PASS/FAIL
Clavier paysage : PASS/FAIL
TTS FR/EN/IT : PASS/FAIL
Icône standard : PASS/FAIL
Icône thématique : PASS/FAIL/N/A
Police agrandie : PASS/FAIL
Hors connexion : PASS/FAIL
Kill/reprise : PASS/FAIL
Redémarrage : PASS/FAIL
Économie d'énergie : PASS/FAIL

Défauts :
Conclusion : PASS/FAIL
```
