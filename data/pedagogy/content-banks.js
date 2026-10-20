/* MathQuest — banques pédagogiques transversales.
   Elles servent à fabriquer des ateliers de document, situations de transfert et remédiations
   sans modifier les réponses des générateurs existants. */
(function(){
'use strict';
const realLife={
 maths:['un ticket de caisse','une recette de cuisine','un trajet en transports','un plan de pièce','un budget de sortie','un tableau de résultats sportifs','une facture simplifiée','un emploi du temps'],
 francais:['une affiche scolaire','un message écrit','un court récit','une consigne','une lettre','un dialogue','un article documentaire','une description'],
 anglais:['une conversation','un menu','un panneau','un message','un emploi du temps','une carte postale','une réservation','une présentation'],
 italien:['une conversation','un menu','un panneau','un message','un emploi du temps','une carte postale','une réservation','une présentation'],
 hg:['une frise','une carte','un témoignage','un tableau de population','un document d’époque','une photographie légendée','un croquis','une courte source'],
 emc:['une situation de classe','un règlement','un message sur un réseau social','un débat','une affiche de prévention','un cas de droit ou de responsabilité'],
 svt:['une observation','un schéma d’organisme','un tableau de mesures','une expérience','une courbe','un protocole','un résultat d’enquête'],
 pc:['un protocole','un tableau de mesures','une courbe','un montage','une expérience','un relevé d’unités','une situation énergétique'],
 tech:['un cahier des charges','un objet technique','un schéma fonctionnel','un comparatif de solutions','un plan','une chaîne d’information'],
 pix:['un fichier','un tableau de données','un message numérique','une recherche web','un réglage de confidentialité','une situation de sécurité'],
 ia:['une réponse d’IA','une consigne donnée à une IA','un tableau de comparaison','une situation de vérification','un cas de données personnelles'],
 emi:['un article','une publication sociale','une image légendée','deux sources contradictoires','une publicité','un titre d’actualité'],
 arts:['une œuvre fictive décrite','un croquis','une composition','un choix de matériaux','une affiche culturelle'],
 hda:['une œuvre fictive replacée dans son époque','un cartel de musée','deux œuvres à comparer','une chronologie artistique'],
 musique:['une courte description d’écoute','une partition simplifiée','un tableau d’instruments','une structure musicale','un programme de concert'],
 eps:['un tableau de performances','une situation de jeu','un plan de terrain','une règle de sécurité','un programme d’échauffement'],
 orientation:['une fiche métier','un parcours de formation','un tableau de compétences','un mini-questionnaire d’intérêts'],
 evars:['une situation relationnelle','un dialogue','une règle de respect','une décision à prendre en sécurité'],
 autre:['une situation concrète','un tableau','une courte observation','un exemple de la vie courante']
};
const prompts={
 maths:['Quelles sont les données réellement utiles ?','Quelle opération, propriété ou représentation choisirais-tu ?','Comment vérifier que le résultat obtenu est plausible ?'],
 francais:['Quel indice précis du document soutient ta réponse ?','Quelle règle de langue ou quel procédé reconnais-tu ?','Comment reformulerais-tu l’idée avec tes propres mots ?'],
 anglais:['Quel est le sens global avant de traduire mot à mot ?','Quels mots ou structures t’aident le plus ?','Produis une phrase nouvelle adaptée à la situation.'],
 italien:['Quel est le sens global avant de traduire mot à mot ?','Quels mots ou structures t’aident le plus ?','Produis une phrase nouvelle adaptée à la situation.'],
 hg:['Situe le document : où et quand ?','Quelle information importante apporte-t-il ?','Quelle cause, conséquence ou relation spatiale peux-tu justifier ?'],
 emc:['Quels faits sont certains dans cette situation ?','Quel droit, devoir, principe ou valeur est en jeu ?','Quelle décision peux-tu justifier en respectant chacun ?'],
 svt:['Que peux-tu observer sans encore interpréter ?','Quelle hypothèse expliquerait ces résultats ?','Quelle donnée permet de soutenir ou de réfuter ton hypothèse ?'],
 pc:['Quelles grandeurs et unités sont présentes ?','Que prévois-tu avant de lire le résultat ?','Quelle conclusion les mesures permettent-elles de justifier ?'],
 tech:['Quel besoin doit être satisfait ?','Quelle fonction ou contrainte est la plus importante ?','Quelle solution choisirais-tu et pourquoi ?'],
 pix:['Quel est l’objectif numérique à atteindre ?','Quelle procédure est la plus sûre et la plus efficace ?','Quel risque de sécurité, de confidentialité ou de fiabilité faut-il vérifier ?'],
 ia:['Qu’est-ce qui peut être utile dans cette réponse ?','Quelle information doit être vérifiée par un humain ?','Quelle consigne ou précaution améliorerait le résultat ?'],
 emi:['Qui produit ce contenu et dans quel but ?','Quels indices permettent d’évaluer sa fiabilité ?','Quelle vérification ferais-tu avant de le partager ?'],
 arts:['Décris précisément avant d’interpréter.','Quels choix de formes, couleurs, matières ou composition remarques-tu ?','Quel effet ou quelle intention peux-tu justifier ?'],
 hda:['Que peux-tu observer précisément ?','Quel élément permet de relier l’œuvre à un contexte ?','Quelle comparaison argumentée peux-tu faire ?'],
 musique:['Quels éléments sonores peux-tu identifier ?','Comment le rythme, le timbre ou l’intensité organisent-ils l’écoute ?','Quel effet musical peux-tu justifier ?'],
 eps:['Quel est l’objectif moteur ou tactique ?','Quel critère de réussite peux-tu observer ?','Quelle adaptation permettrait de progresser en sécurité ?'],
 orientation:['Quelles compétences ou préférences apparaissent ?','Quelles informations faut-il encore vérifier ?','Quelle prochaine étape concrète peux-tu choisir ?'],
 evars:['Quels sont les besoins et limites de chacun ?','Quelle règle de respect, de consentement ou de sécurité s’applique ?','À quel adulte de confiance demander de l’aide si nécessaire ?'],
 autre:['Qu’observes-tu ?','Quelle idée du cours peut t’aider ?','Comment justifierais-tu ta conclusion ?']
};
const misconceptions={
 maths:[
  ['Je calcule trop vite sans identifier ce qui est demandé.','Entoure mentalement la question, liste les données utiles puis choisis l’opération.'],
  ['Je confonds une règle avec une autre qui lui ressemble.','Teste la règle sur un exemple très simple avant de l’utiliser.'],
  ['Je trouve un nombre mais j’oublie de vérifier l’unité ou l’ordre de grandeur.','Relis le résultat comme une phrase : est-il possible dans la situation ?']
 ],
 francais:[
  ['Je reconnais un mot mais pas sa fonction dans la phrase.','Observe les relations avec les autres mots et pose la question adaptée.'],
  ['J’applique une règle sans regarder le sens de la phrase.','Lis d’abord la phrase entière puis vérifie la règle.'],
  ['Je réponds sans citer d’indice du texte.','Cherche un mot ou une expression qui prouve ta réponse.']
 ],
 anglais:[['Je traduis mot à mot.','Cherche d’abord le sens global et la situation.'],['Je reconnais le vocabulaire mais oublie la structure de phrase.','Repère sujet, verbe, temps et ordre des mots.']],
 italien:[['Je traduis mot à mot.','Cherche d’abord le sens global et la situation.'],['Je reconnais le vocabulaire mais oublie accords ou structure.','Repère genre, nombre, personne et ordre des mots.']],
 hg:[['Je récite un fait sans le situer.','Commence par où ? quand ? qui ? puis relie cause et conséquence.'],['Je décris un document sans expliquer ce qu’il montre.','Après chaque observation, ajoute : « cela montre que… ».']],
 emc:[['Je donne seulement mon opinion.','Appuie ta réponse sur un droit, une règle, une valeur ou un fait.'],['Je confonds liberté et absence de règles.','Cherche les droits des autres et les responsabilités associées.']],
 svt:[['Je confonds observation et explication.','Écris d’abord ce qui est visible ou mesuré, puis seulement ton interprétation.'],['Je donne une conclusion sans preuve.','Relie ta conclusion à une donnée précise.']],
 pc:[['Je calcule sans vérifier les unités.','Écris l’unité à chaque étape importante.'],['Je conclus avant d’observer les résultats.','Compare la prévision aux mesures puis conclus.']],
 tech:[['Je choisis une solution avant d’avoir défini le besoin.','Commence par le besoin, les fonctions et les contraintes.']],
 pix:[['Je clique au hasard jusqu’à ce que ça marche.','Décris la procédure en étapes reproductibles et vérifie la sécurité.']],
 ia:[['Je crois une réponse parce qu’elle paraît convaincante.','Vérifie les faits importants avec une source fiable et garde les données privées.']],
 emi:[['Je partage une information parce qu’elle confirme ce que je pensais.','Cherche la source originale, la date et une deuxième source indépendante.']],
 arts:[['J’interprète avant de décrire.','Commence par trois observations précises puis propose une interprétation.']],
 hda:[['Je donne un avis sans élément précis.','Appuie ton interprétation sur un détail de l’œuvre et son contexte.']],
 musique:[['Je dis seulement « j’aime / je n’aime pas ».','Décris d’abord rythme, timbre, intensité ou structure.']],
 eps:[['Je cherche seulement la performance.','Observe aussi technique, stratégie, sécurité et régularité.']],
 orientation:[['Je pense qu’un seul métier doit être choisi tout de suite.','Explore plusieurs pistes et transforme-les en petites expériences à tester.']],
 evars:[['Je cherche qui a tort plutôt que ce qui protège chacun.','Repars du respect, du consentement, de la sécurité et des limites.']],
 autre:[['Je réponds trop vite.','Reformule la consigne, choisis une idée du cours puis vérifie avec un exemple.']]
};
window.MQPedagogyBanks={version:'1.0',realLife,prompts,misconceptions};
})();
