/* Finot Académie — banques de situations pédagogiques combinables avec les générateurs procéduraux. */
(function(){
'use strict';
const common={
 context:[
  'Mission : trouve la réponse, puis vérifie qu’elle répond exactement à la consigne.',
  'Défi méthode : avant de répondre, repère l’information vraiment utile.',
  'Mode expert : réponds, puis demande-toi comment tu pourrais vérifier sans refaire exactement la même chose.',
  'Enquête : cherche l’indice décisif dans la question avant de choisir ta réponse.'
 ],
 reflect:[
  'Explique en une phrase la règle ou l’idée que tu viens d’utiliser.',
  'Quelle erreur fréquente pourrait conduire à une mauvaise réponse ici ?',
  'Comment vérifierais-tu ta réponse si Finot ne te donnait pas la correction ?',
  'Donne un autre exemple qui utiliserait la même méthode.'
 ]
};
const bySubject={
 maths:{
  context:['Problème express : identifie d’abord les données, puis l’opération ou la propriété utile.','Défi de raisonnement : ne calcule pas immédiatement ; prévois d’abord l’ordre de grandeur du résultat.','Mission architecte : organise ton calcul proprement et garde les unités jusqu’à la fin.','Défi logique : cherche une deuxième façon de contrôler ton résultat.'],
  reflect:['Pourquoi cette opération ou cette propriété est-elle adaptée ?','Ton résultat est-il plausible ? Explique pourquoi.','Peux-tu résoudre le même type de problème avec une autre représentation ?','Quelle étape de ton raisonnement est la plus importante ?']},
 francais:{
  context:['Mission détective : trouve dans la phrase ou le texte l’indice qui prouve ta réponse.','Défi langue : donne le nom de la notion, mais surtout explique son rôle ici.','Atelier d’écriture : observe la forme et le sens avant de répondre.','Lecture attentive : distingue ce que le texte dit de ce que tu en déduis.'],
  reflect:['Quel mot ou groupe de mots justifie ta réponse ?','Que changerait la phrase si cette forme était différente ?','Invente un exemple correct utilisant la même règle.','Quelle erreur d’orthographe ou d’analyse faut-il éviter ici ?']},
 anglais:{context:['Communication : cherche le sens global avant de traduire mot à mot.','Mission vocabulaire : utilise le contexte pour choisir le mot le plus naturel.','Défi grammaire : repère qui fait l’action et quand elle se passe.','Situation réelle : imagine que tu utilises cette phrase avec quelqu’un.'],reflect:['Redis la phrase avec un autre mot que tu connais.','Quelle règle grammaticale viens-tu d’utiliser ?','Peux-tu produire une nouvelle phrase du même type ?','Quel indice t’a permis de comprendre le sens ?']},
 italien:{context:['Comunicazione : cherche d’abord le sens global.','Mission vocabulaire : appuie-toi sur le contexte.','Défi grammaire : repère la personne, le genre, le nombre ou le temps utile.','Situation réelle : imagine la phrase dans une conversation.'],reflect:['Produis une autre phrase du même type.','Quelle règle italienne viens-tu d’utiliser ?','Quel mot t’a aidé à comprendre ?','Peux-tu dire la même idée autrement ?']},
 hg:{context:['Enquête historique : situe d’abord l’époque, les acteurs et le lieu.','Mission géographe : observe l’échelle, le territoire et les relations entre espaces.','Analyse de document : demande-toi qui produit l’information, quand et pourquoi.','Défi causalité : distingue une cause, un événement et une conséquence.'],reflect:['Quel repère chronologique ou spatial est essentiel ?','Quelle preuve soutient ta réponse ?','Quelle cause ou conséquence peux-tu relier à cette notion ?','Comment résumerais-tu cette idée à quelqu’un en 20 secondes ?']},
 emc:{context:['Cas citoyen : identifie le droit, la règle, la valeur ou la responsabilité en jeu.','Débat raisonné : sépare les faits des opinions.','Situation concrète : cherche une réponse compatible avec les droits de chacun.','Esprit critique : justifie ton choix par un principe précis.'],reflect:['Quel principe justifie ta réponse ?','Un autre point de vue peut-il être défendu ?','Qu’est-ce qui relève d’un fait et qu’est-ce qui relève d’une opinion ?','Que ferais-tu dans une situation proche ?']},
 svt:{context:['Mission scientifique : observe, formule une hypothèse puis confronte-la aux données.','Enquête du vivant : relie structure, fonction et environnement.','Analyse scientifique : distingue observation et interprétation.','Défi système : cherche les liens entre plusieurs éléments plutôt qu’un fait isolé.'],reflect:['Quelle observation appuie ta conclusion ?','Quelle hypothèse pourrait-on tester ?','Quelle relation de cause à effet vois-tu ?','Comment représenterais-tu cette idée par un schéma ?']},
 pc:{context:['Mission laboratoire : identifie les grandeurs, unités et données mesurables.','Défi expérimental : prévois le résultat avant de regarder la réponse.','Analyse physique : vérifie les unités et l’ordre de grandeur.','Enquête chimique : relie les observations au modèle étudié.'],reflect:['Quelle mesure ou observation serait utile pour vérifier ?','Pourquoi l’unité est-elle importante ici ?','Quelle expérience pourrait tester cette idée ?','Ton résultat est-il cohérent avec la situation physique ?']},
 tech:{context:['Mission ingénieur : identifie le besoin avant de choisir une solution.','Défi conception : compare plusieurs solutions selon des critères précis.','Analyse d’objet : relie fonction, composant et contrainte.','Mission sécurité : cherche la solution efficace mais aussi sûre et responsable.'],reflect:['Quel critère permet de choisir entre deux solutions ?','Quelle fonction assure ce composant ?','Quelle contrainte faut-il absolument respecter ?','Comment améliorerais-tu la solution proposée ?']},
 pix:{context:['Mission numérique : choisis l’outil adapté au besoin, pas seulement celui que tu connais.','Défi données : organise l’information avant de la traiter.','Esprit critique numérique : vérifie source, confidentialité et sécurité.','Mission efficacité : cherche une procédure reproductible.'],reflect:['Pourquoi cet outil est-il adapté ?','Quel risque numérique faut-il surveiller ?','Comment vérifier la fiabilité de l’information ?','Quelle étape pourrait être automatisée ou simplifiée ?']},
 ia:{context:['Mission IA : distingue ce que le système peut faire de ce qu’il faut vérifier.','Esprit critique : une réponse plausible n’est pas forcément vraie.','Usage responsable : pense aux données personnelles et au droit d’auteur.','Défi prompt : formule précisément le besoin avant d’évaluer la réponse.'],reflect:['Quelle partie doit être vérifiée par un humain ?','Quelle donnée ne faudrait-il pas partager ?','Comment améliorerais-tu la demande faite à l’IA ?','Quel biais ou quelle limite pourrait affecter la réponse ?']},
 emi:{context:['Enquête média : identifie auteur, source, date et objectif.','Défi info : cherche une deuxième source indépendante.','Esprit critique : distingue information, commentaire, publicité et opinion.','Mission publication : pense aux conséquences avant de partager.'],reflect:['Quel indice rend cette source plus ou moins fiable ?','Comment vérifier cette information ?','Quel est l’objectif probable de ce contenu ?','Que faudrait-il vérifier avant de partager ?']}
};
window.MQQuestionBanks={version:'1.0',common,bySubject};
})();

/* Errata Wave 2 — revue humaine du 24/10/2026.
   Les IDs restent inchangés ; seules une consigne CE1 et trois références/formulations de lecture sont corrigées. */
(function(){
'use strict';
if(window.MQPrimary&&window.MQPrimary._reg&&window.MQPrimary._reg.byId){
  const chapter=window.MQPrimary._reg.byId['ce1-fr-s-z'];
  if(chapter&&typeof chapter.g==='function'&&!chapter.__wave2ContentErrata){
    const originalGenerator=chapter.g;
    chapter.g=function(d){
      const q=originalGenerator(d);
      if(q&&typeof q.q==='string')q.q=q.q.replace('une fra…e','une frai…e');
      return q;
    };
    chapter.__wave2ContentErrata=true;
  }
}
if(window.MQ_READING&&window.MQ_READING.resources){
  const res=window.MQ_READING.resources;
  const breme=res.fr_6e_musiciens_breme_01;
  if(breme){
    breme.work='Contes de l’enfance et du foyer — 2e édition (1819)';
    breme.sourceReference='Adaptation libre et abrégée pour la 6e, d’après le conte des frères Grimm, publié pour la première fois dans la 2e édition des Contes de l’enfance et du foyer en 1819. Les frères Grimm (morts en 1859 et 1863) sont dans le domaine public — aucune traduction existante reprise.';
  }
  const sneffels=res.fr_5e_verne_sneffels_01;
  if(sneffels&&Array.isArray(sneffels.paragraphs)&&sneffels.paragraphs[0]){
    sneffels.paragraphs[0]=sneffels.paragraphs[0].replace('un volcan d’Islande éteint depuis des siècles','un volcan d’Islande que les personnages considèrent comme éteint depuis des siècles');
    sneffels.sourceReference='Adaptation libre et abrégée pour la 5e, d’après Jules Verne (mort en 1905), dans le domaine public. La qualification du volcan comme « éteint » est présentée comme le point de vue des personnages du roman ; le Snæfellsjökull est aujourd’hui classé comme volcan actif au sens géologique.';
  }
  const seguin=res.fr_4e_chevre_seguin_01;
  if(seguin){
    seguin.work='Lettres de mon moulin (recueil 1869 ; première publication du conte en 1866)';
    seguin.sourceReference='Adaptation libre et abrégée pour la 4e, d’après Alphonse Daudet (mort en 1897), dans le domaine public. « La Chèvre de monsieur Seguin » paraît d’abord dans L’Événement le 14 septembre 1866, puis est intégrée au recueil Lettres de mon moulin en 1869.';
  }
}
})();
