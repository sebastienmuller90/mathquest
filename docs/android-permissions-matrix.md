# Finot Académie — matrice permissions Android V1

Référence runtime candidate : `chatgpt/runtime-integration` @ `69d959e2f1a57f15d6c543a3f3b654d81639c164`

## État réel validé

Le manifeste Android fusionné a été audité dans la CI réelle après `android:sync` et build Gradle.

Résultat V1 actuel :

| Permission / capacité | État réel | Décision V1 |
|---|---|---|
| `INTERNET` | PRÉSENTE | REQUISE |
| `ACCESS_NETWORK_STATE` | NON AJOUTÉE explicitement | ne pas ajouter sans besoin |
| `RECORD_AUDIO` | ABSENTE | INTERDITE V1 Android |
| `POST_NOTIFICATIONS` | ABSENTE | NON V1 |
| `AD_ID` | ABSENTE | INTERDITE |
| localisation fine/coarse | ABSENTE | INTERDITE V1 |
| caméra | ABSENTE | INTERDITE V1 |
| contacts | ABSENTE | INTERDITE |
| calendrier | ABSENTE | INTERDITE |
| SMS / téléphone | ABSENTE | INTERDITE |
| stockage externe large | ABSENTE | INTERDITE |
| fichiers/médias | ABSENTE | NON V1 |
| biométrie | ABSENTE | NON V1 |
| Bluetooth / nearby devices | ABSENTE | NON V1 |
| foreground service | ABSENTE | NON V1 |
| exact alarms | ABSENTE | NON V1 |

## Reconnaissance vocale Android

Décision prise et testée : **pas de reconnaissance vocale Android V1**.

Raisons :

- la WebView Android ne garantit pas la même disponibilité de Web Speech que le navigateur web ;
- Finot cible des mineurs ;
- ajouter une permission micro ou un SDK vocal tiers introduirait une surface privacy supplémentaire ;
- aucune fonctionnalité pédagogique obligatoire ne doit devenir inutilisable si le micro n'est pas disponible.

Comportement retenu :

- aucun bouton micro inopérant dans Android ;
- aucune permission `RECORD_AUDIO` ;
- aucune écoute en arrière-plan ;
- aucune capture audio ;
- aucune transcription ;
- l'étape de prononciation bascule sur une alternative « écoute le modèle puis répète à voix haute » ;
- le Web/PWA peut conserver la reconnaissance lorsque le navigateur la supporte.

## Backup Android

État : **désactivé**.

- `android:allowBackup="false"` ;
- règles Android 12+ configurées pour empêcher sauvegarde cloud et transfert automatique appareil-à-appareil ;
- les données enfant ne doivent pas être restaurées implicitement sur un autre appareil/compte ;
- transfert contrôlé éventuel via export/import parent.

## Contrôles CI réels

La CI Android candidate vérifie automatiquement :

- présence `INTERNET` ;
- `allowBackup=false` ;
- absence `RECORD_AUDIO` ;
- absence `AD_ID` ;
- génération APK ;
- génération AAB ;
- intégrité des artefacts.

Build validé :

- APK debug : `59 690 683` octets ;
- AAB de validation : `58 017 432` octets ;
- Android SDK / target 36 ;
- JDK 21 ;
- package technique `fr.finot.academie.dev`.

## Tests appareil réel encore nécessaires

Même avec le manifest correct, valider physiquement :

1. aucune demande de permission micro au premier lancement ;
2. alternative prononciation visible et utilisable ;
3. aucun écran bloqué par absence de SpeechRecognition ;
4. cold start offline ;
5. Retour Android ;
6. clavier virtuel ;
7. rotation ;
8. TalkBack ;
9. TTS FR/EN/IT réellement installé ;
10. mise à jour APK sans perte de profil ;
11. réinstallation sans restauration automatique des données enfant.

## Data Safety

Pour la version Android V1 candidate actuelle :

- Finot ne demande pas l'accès microphone ;
- Finot n'intègre pas d'identifiant publicitaire ;
- aucune localisation/caméra/contacts/SMS n'est demandée ;
- analytics fournisseur tiers absent et analytics internes off par défaut ;
- le suivi distant est off par défaut tant qu'aucun backend n'est provisionné.

La déclaration Google Play finale devra malgré tout être recalculée sur :

- le binaire de production signé ;
- le package ID final ;
- les SDK réellement intégrés au moment de la soumission ;
- la décision finale concernant le backend parent distant.

## Règle Factory

Tout futur plugin natif ajouté à Finot ou à une app de l'App Factory doit déclencher automatiquement une revue :

- permissions ajoutées ;
- données collectées ;
- données partagées ;
- enfants/âge cible ;
- consentement ;
- rétention ;
- impact Data Safety / Store.
