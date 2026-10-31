# Finot Académie — matrice permissions Android V1

Référence produit : `main` @ `05b4c0ce21bd78a9027367d1219e660ec86f7bda`  
Branche orchestration : `chatgpt/multistore-release-orchestration`

Objectif : limiter strictement les permissions Android du runtime natif tout en conservant les fonctions de la PWA.

## Principe

Aucune permission sensible ne doit être demandée au démarrage de l’application. Toute permission sensible doit être demandée uniquement au moment où l’utilisateur déclenche la fonction correspondante, avec possibilité de refuser sans bloquer l’application.

## Matrice V1

| Permission / capacité | Statut V1 | Justification | Règle |
|---|---|---|---|
| `INTERNET` | REQUISE | chargement réseau, Supabase optionnel, ressources web si nécessaires | permission normale ; pas de demande runtime |
| `ACCESS_NETWORK_STATE` | OPTIONNELLE | utile uniquement si le runtime natif l’emploie réellement pour état réseau | ne pas ajouter si Capacitor/WebView fonctionne sans |
| `RECORD_AUDIO` | CONDITIONNELLE | prononciation interactive en langues | demander seulement au clic micro ; permission dangereuse ; refus = fonction désactivée proprement |
| `POST_NOTIFICATIONS` | NON V1 | aucune notification push native nécessaire actuellement | ne pas déclarer tant qu’un vrai besoin produit n’est pas validé |
| `AD_ID` | INTERDITE | aucun tracking publicitaire ; application enfant | ne pas inclure ; vérifier les dépendances transitives |
| localisation fine/coarse | INTERDITE V1 | aucun besoin fonctionnel | ne pas déclarer |
| caméra | INTERDITE V1 | aucun besoin fonctionnel | ne pas déclarer |
| contacts | INTERDITE | aucun besoin | ne pas déclarer |
| calendrier | INTERDITE | aucun besoin | ne pas déclarer |
| SMS / téléphone | INTERDITE | aucun besoin | ne pas déclarer |
| stockage externe large | INTERDITE | PWA/localStorage et stockage privé suffisent | éviter `READ/WRITE_EXTERNAL_STORAGE`, `MANAGE_EXTERNAL_STORAGE` |
| fichiers/médias | NON V1 | aucun besoin de galerie utilisateur | ne pas demander |
| biométrie | NON V1 | aucun besoin | ne pas demander |
| Bluetooth / nearby devices | NON V1 | aucun besoin | ne pas demander |
| foreground service | NON V1 | aucun traitement arrière-plan justifié | ne pas déclarer |
| exact alarms | NON V1 | aucun besoin | ne pas déclarer |

## Microphone — contrat runtime

La fonctionnalité actuelle utilise `SpeechRecognition` / `webkitSpeechRecognition` pour évaluer la prononciation dans certains cours de langues.

Si le runtime Android natif conserve cette fonction :

1. déclarer `android.permission.RECORD_AUDIO` seulement si réellement nécessaire ;
2. ne demander la permission qu’après clic sur « Dire la phrase » / bouton micro ;
3. afficher une explication claire avant ou au moment de la demande ;
4. si refus : conserver tout le reste de l’application fonctionnel ;
5. aucune écoute en arrière-plan ;
6. aucun foreground service microphone ;
7. aucune conservation audio par Finot ;
8. aucune persistance de transcription vocale ;
9. aucun envoi Supabase du contenu vocal/transcrit ;
10. tester sur appareil réel Android, l’émulateur ne suffisant pas pour valider le flux micro.

Si Web Speech n’est pas fiable/conforme dans le WebView final, la V1 doit désactiver proprement la prononciation interactive Android plutôt que d’ajouter une pile vocale complexe ou un SDK tiers non audité.

## Contrôles de build obligatoires

À exécuter sur l’AAB/APK final :

- inspecter `AndroidManifest.xml` fusionné ;
- lister toutes les permissions réellement présentes ;
- vérifier qu’aucune dépendance n’ajoute `AD_ID` ;
- vérifier absence de localisation/caméra/contacts/SMS/stockage large ;
- vérifier que `RECORD_AUDIO`, si présent, correspond exactement à la fonction prononciation ;
- vérifier le comportement permission refusée ;
- vérifier le comportement permission révoquée après installation ;
- vérifier aucun accès micro tant que l’utilisateur n’a pas déclenché la fonction.

## Data Safety / Store

La déclaration Google Play doit être construite à partir du manifeste fusionné et du comportement réel du binaire, pas uniquement du code source PWA.

Tout SDK natif ou plugin Capacitor ajouté ultérieurement doit faire l’objet d’un mini-audit avant intégration : permissions, données collectées, données partagées, rétention, identifiants et politique enfants.
