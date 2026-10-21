/* Finot Académie — situations de transfert : relier une notion à un contexte nouveau sans modifier la réponse de l'exercice. */
(function(){
'use strict';
const common=[
 'Explique cette idée avec un exemple différent de celui de la question.',
 'Invente une petite situation de la vie quotidienne où cette notion pourrait être utile.',
 'Transforme la question en un exemple que tu pourrais poser à un camarade.',
 'Trouve une situation où la même méthode fonctionnerait encore, avec d’autres données.',
 'Donne un contre-exemple ou une erreur fréquente qui montre pourquoi la règle est importante.',
 'Explique en 20 secondes ce que tu viens d’apprendre, sans relire la correction.'
];
const bySubject={
 maths:[
  'Budget : imagine que les nombres représentent des euros. La méthode resterait-elle la même ?',
  'Cuisine : transforme la notion en problème de quantités, de parts ou de proportions.',
  'Trajet : imagine une situation de distance, durée ou vitesse utilisant la même idée.',
  'Bricolage : comment cette méthode pourrait-elle servir pour mesurer, découper ou construire ?',
  'Sport : invente un score, une moyenne ou une mesure qui se traiterait de la même façon.',
  'Plan : représente la même idée avec un dessin, un tableau ou un schéma.',
  'Horaires : peux-tu créer un exemple avec des heures ou des durées ?',
  'Données : transforme la notion en tableau ou graphique simple puis explique ce que tu lirais.',
  'Jeu : invente une règle de jeu où ce calcul ou ce raisonnement serait utile.',
  'Vérification : trouve une deuxième méthode pour confirmer le résultat.'
 ],
 francais:[
  'Écriture : invente une nouvelle phrase qui utilise exactement la même règle.',
  'Lecture : trouve quel indice du texte permettrait de prouver la même réponse.',
  'Correction : écris volontairement une phrase fausse puis corrige-la.',
  'Sens : modifie un mot ou un temps et explique ce que cela change.',
  'Dialogue : utilise la notion dans une courte phrase qu’un personnage pourrait dire.',
  'Réécriture : transforme la phrase au singulier/pluriel ou à un autre temps si c’est pertinent.',
  'Justification : donne la règle et un indice précis qui prouve ta réponse.',
  'Vocabulaire : remplace un mot par un synonyme et observe ce qui change ou non.'
 ],
 anglais:[
  'Conversation : imagine que tu dois utiliser cette phrase pour parler à quelqu’un.',
  'Voyage : crée une phrase du même type dans une gare, un hôtel ou un magasin.',
  'Présentation : réutilise la structure pour parler de toi.',
  'Question-réponse : invente une question puis une réponse avec le même vocabulaire.',
  'Variation : change le sujet, le lieu ou le moment en gardant la même structure.'
 ],
 italien:[
  'Conversazione : réutilise la structure dans une situation réelle.',
  'Viaggio : imagine la même phrase dans une gare, un restaurant ou un magasin.',
  'Presentazione : crée une phrase du même type pour parler de toi.',
  'Domanda-risposta : invente une question et sa réponse.',
  'Variazione : change la personne ou le contexte en gardant la règle.'
 ],
 hg:[
  'Chronologie : place cette notion entre un « avant » et un « après ».',
  'Carte : indique quel lieu ou territoire serait utile à situer.',
  'Cause-conséquence : donne une cause et une conséquence liées à cette notion.',
  'Document : quel type de source permettrait de vérifier cette information ?',
  'Comparaison : rapproche cette situation d’une autre période ou d’un autre espace.',
  'Acteurs : nomme qui agit, pourquoi et avec quelles conséquences.'
 ],
 emc:[
  'Situation réelle : imagine un cas proche dans la cour, en classe ou sur Internet.',
  'Droit et devoir : quel droit, devoir ou principe serait concerné ?',
  'Débat : formule un argument puis un contre-argument respectueux.',
  'Décision : quelle solution protégerait au mieux les droits de chacun ?',
  'Esprit critique : sépare les faits, les opinions et les jugements.'
 ],
 svt:[
  'Observation : quelle donnée concrète faudrait-il observer pour vérifier cette idée ?',
  'Hypothèse : formule une hypothèse testable liée à cette notion.',
  'Schéma : dessine mentalement les éléments et leurs relations.',
  'Santé/environnement : trouve une situation réelle où cette notion peut aider à comprendre un phénomène.',
  'Cause-effet : quelle modification pourrait changer le résultat observé ?'
 ],
 pc:[
  'Laboratoire : quelle mesure ou expérience permettrait de vérifier le résultat ?',
  'Maison : trouve une situation quotidienne liée à l’énergie, au mouvement ou à la matière.',
  'Unités : change d’unité puis vérifie si la grandeur reste cohérente.',
  'Prévision : annonce ce que tu t’attends à observer avant une expérience.',
  'Sécurité : quelle précaution serait importante dans une situation réelle ?'
 ],
 tech:[
  'Objet réel : trouve un appareil qui utilise la même fonction.',
  'Conception : propose une autre solution technique au même besoin.',
  'Contraintes : ajoute une contrainte de coût, de sécurité ou d’environnement.',
  'Amélioration : comment rendrais-tu la solution plus simple ou plus efficace ?'
 ],
 pix:[
  'Situation numérique réelle : dans quel logiciel ou service cette compétence serait-elle utile ?',
  'Sécurité : quel risque faut-il éviter avant de cliquer, partager ou publier ?',
  'Efficacité : imagine une procédure plus rapide mais toujours fiable.',
  'Vérification : comment contrôlerais-tu que le résultat numérique est correct ?'
 ],
 ia:[
  'Vérification humaine : quelle partie d’une réponse d’IA faudrait-il contrôler en priorité ?',
  'Données : quelles informations ne faudrait-il pas partager ?',
  'Prompt : reformule la demande pour la rendre plus précise et vérifiable.',
  'Limites : invente un cas où une IA pourrait donner une réponse plausible mais fausse.'
 ],
 emi:[
  'Source : quelle deuxième source indépendante chercherais-tu ?',
  'Publication : qu’est-ce qu’il faudrait vérifier avant de partager ?',
  'Intention : quel pourrait être l’objectif de l’auteur ou du média ?',
  'Preuve : quel indice rendrait l’information plus fiable ?'
 ]
};
const young=[
 'Dessine ou mime un exemple qui utilise la même idée.',
 'Explique la règle avec tes mots comme si tu la racontais à Finot.',
 'Trouve un exemple avec des objets que tu connais à la maison ou à l’école.'
];
window.MQTransferScenarios={version:'1.0',common,bySubject,young};
})();