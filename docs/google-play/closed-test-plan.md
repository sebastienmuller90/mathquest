# Finot Académie — plan de test fermé Google Play (12 / 14)

Ce plan s'applique **uniquement si** le compte Play Console est un compte développeur personnel créé après le 13/11/2023 et que la Console exige ce parcours. Règle Google revalidée le **02/11/2026** : au moins **12 testeurs doivent rester inscrits en continu pendant au moins 14 jours** avant la demande d'accès production.

## 1. Objectif opérationnel

Ne pas viser exactement 12 invitations. Prévoir **15 à 18 testeurs fiables** afin d'absorber un désistement, tout en vérifiant que le compteur Play Console atteint bien au moins 12 inscrits continus.

Le critère important est l'**opt-in continu**, pas seulement l'installation de l'application.

## 2. Profil de testeurs recommandé

Priorité à des adultes de confiance capables de suivre la procédure et de donner un retour exploitable :

- parents d'enfants scolarisés ;
- proches ;
- collègues ;
- enseignants/connaissances du milieu scolaire si disponibles ;
- utilisateurs Android de marques et versions différentes.

Il n'est pas nécessaire de publier de vraies données d'enfant : demander aux testeurs d'utiliser un **prénom/profil fictif** pour tout retour ou capture partagé avec l'éditeur.

## 3. Avant le jour J

- [ ] application Play Console complètement configurée pour permettre le test fermé ;
- [ ] AAB signé de test téléversé ;
- [ ] politique de confidentialité publique accessible ;
- [ ] fiche Store suffisamment complète pour la piste de test ;
- [ ] liste/groupe de testeurs préparé ;
- [ ] canal de retour défini (e-mail ou groupe privé) ;
- [ ] procédure d'inscription envoyée aux testeurs ;
- [ ] leur rappeler de **ne pas se désinscrire pendant 14 jours**.

## 4. Jour 0 — inscription

Pour chaque testeur :

1. utiliser le compte Google qui servira réellement sur le Play Store ;
2. ouvrir le lien officiel d'inscription au test fermé ;
3. accepter de devenir testeur ;
4. installer Finot Académie depuis Google Play ;
5. ouvrir l'application au moins une fois ;
6. confirmer à l'éditeur : `INSCRIT + INSTALLÉ`.

Tenir un tableau privé de suivi :

| Testeur | Opt-in confirmé | Installation | Android / modèle | Jour 7 | Jour 14 | Retour reçu |
|---|---|---|---|---|---|---|
| T01 | ☐ | ☐ | | ☐ | ☐ | ☐ |
| … | | | | | | |
| T18 | ☐ | ☐ | | ☐ | ☐ | ☐ |

Ne pas versionner dans Git les noms/e-mails réels des testeurs.

## 5. Parcours demandé aux testeurs

### Séance 1 — découverte

- créer un profil fictif ;
- parcourir l'accueil ;
- ouvrir plusieurs matières ;
- lancer un cours et un exercice ;
- vérifier une correction ;
- ouvrir le chat Finot ;
- tester lecture/dictée si disponible pour le niveau choisi.

### Séance 2 — persistance

- reprendre l'application un autre jour ;
- vérifier que profil/progression sont conservés ;
- tester mode sombre ou mode DYS ;
- tester l'espace Parents.

### Séance 3 — robustesse

- lancer une fois sans Wi-Fi/données mobiles ;
- fermer/réouvrir l'application ;
- essayer une taille de texte Android augmentée ;
- signaler tout écran coupé, bouton inaccessible, crash ou texte incohérent.

## 6. Questions de feedback

Demander des réponses très courtes :

1. Avez-vous rencontré un crash ou un blocage ?
2. Avez-vous trouvé un bouton/texte difficile à lire ou à toucher ?
3. Le parcours pour commencer un exercice est-il compréhensible ?
4. Les explications/corrections sont-elles claires ?
5. Finot apporte-t-il une aide utile ou gêne-t-il ?
6. Avez-vous utilisé l'application hors connexion ? Résultat ?
7. Modèle du téléphone + version Android ?
8. Le principal point à améliorer avant publication ?

Aucune capture contenant une vraie donnée d'enfant ne doit être envoyée.

## 7. Surveillance quotidienne

Pendant les 14 jours :

- contrôler régulièrement le nombre d'inscrits affiché par Play Console ;
- conserver au moins 12 testeurs inscrits en continu ;
- ne pas demander à un testeur de se désinscrire/réinscrire ;
- une réinscription après désinscription redémarre sa période continue ;
- corriger les défauts importants via de nouvelles versions sur la piste fermée sans interrompre le test, si Play Console le permet ;
- archiver les retours utiles et les bugs GitHub sans données personnelles.

## 8. Jour 14+

Avant la demande d'accès production :

- [ ] Play Console confirme au moins 12 testeurs continus sur la durée requise ;
- [ ] aucun P0/P1/P2 ouvert ;
- [ ] principaux retours utilisateurs traités ou explicitement évalués ;
- [ ] version finale de production reconstruite depuis un `main` vert ;
- [ ] Data Safety / Families / privacy cohérents avec cette version ;
- [ ] captures et fiche Store finales ;
- [ ] réponses à la demande d'accès production préparées à partir des vrais résultats du test.

## 9. Preuves à conserver hors Git si elles contiennent des données personnelles

- liste réelle des testeurs ;
- dates d'inscription ;
- captures éventuelles de la Console montrant le compteur ;
- retours individuels comportant noms/e-mails.

Dans GitHub, ne conserver que des synthèses anonymisées : nombre de testeurs, appareils, bugs, résultats et décisions.

## Référence officielle

Google Play Console Help — **App testing requirements for new personal developer accounts**, revalidé le 02/11/2026 : comptes personnels créés après le 13/11/2023, test fermé avec au moins 12 testeurs inscrits en continu pendant au moins 14 jours avant la demande d'accès production.
