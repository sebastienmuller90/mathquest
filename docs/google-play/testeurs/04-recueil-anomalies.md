# Recueil des anomalies

Rédigé le 09/11/2026.

## 1. Canal de retour

Envoyer la fiche par e-mail à **upfactory.apps@gmail.com**, un e-mail par anomalie (objet : `[Test Finot] titre court`). Ne jamais y mettre de vraie donnée d'enfant ; utiliser un profil fictif.

## 2. Trouver le numéro de version de l'appli

Ouvrir l'onglet **Plus** de la barre du bas : une ligne « **Version …** » est affichée (elle apparaît aussi dans l'Espace parents). Si elle indique « Version de développement », le numéro n'est pas disponible : le signaler. Android : le numéro de l'appli figure aussi dans Paramètres > Applications > Finot Académie > Informations sur l'appli.

## 3. Fiche d'anomalie (modèle à copier)

```
Titre court :
Testeur (prénom ou pseudo) :
Date et heure :
Scénario concerné (ex. S07) :

Appareil (marque, modèle) :
Version d'Android :
Version de l'appli (onglet Plus) :
Taille de police / mode sombre / DYS activés ? :
Connexion (Wi-Fi, mobile, avion) :

Étapes pour reproduire :
1.
2.
3.

Résultat attendu :
Résultat obtenu :
Reproductible ? (toujours / parfois / une seule fois) :
Gravité (bloquant / majeur / mineur / cosmétique) :
Capture d'écran ou vidéo jointe ? (sans donnée réelle d'enfant) :
Remarques :
```

## 4. Grille de gravité

| Gravité | Définition | Exemples |
|---|---|---|
| **Bloquant** | Empêche d'utiliser l'appli ou fait perdre des données | plantage au lancement, profil effacé, écran blanc, impossible d'installer |
| **Majeur** | Fonction importante inutilisable ou erreur pédagogique | exercice impossible à valider, correction fausse, Espace parents inaccessible |
| **Mineur** | Gêne réelle mais contournable | bouton difficile à atteindre, texte tronqué sur petit écran |
| **Cosmétique** | Sans effet sur l'usage | faute de frappe, alignement, icône |

## 5. Critères d'acceptation proposés (à valider par l'éditeur)

> **Propositions** : ces seuils ne viennent d'aucune règle Google ; ils sont à décider par l'éditeur.

- [ ] 0 anomalie **bloquante** ouverte.
- [ ] 0 anomalie **majeure** ouverte (ou chacune explicitement évaluée et acceptée par écrit).
- [ ] Les anomalies mineures restantes sont listées et planifiées.
- [ ] Au moins 10 des testeurs ont terminé les scénarios S01 à S14.
- [ ] Au moins 3 marques/modèles d'appareils et 3 versions d'Android différentes testés, dont un petit écran et une tablette si possible.
- [ ] S16 (mode avion), S17 (fermeture forcée) et S18 (mise à jour) validés sur au moins 2 appareils.
- [ ] Aucune perte de données constatée lors d'une mise à jour.
- [ ] Le décompte Play Console confirme au moins 12 testeurs inscrits en continu pendant 14 jours (condition Google, voir [README.md](README.md)).
- [ ] AAB de production signé, reconstruit depuis un `main` vert (voir [01-checklist-organisateur.md](01-checklist-organisateur.md)).
