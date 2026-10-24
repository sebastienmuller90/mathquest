/* Finot Académie — finition release : profondeur réelle des dictées CP / CE1.
   Objectif : augmenter les contenus réellement dictés sans varier artificiellement la consigne
   ni modifier le moteur de correction progressive. */
(function(){
'use strict';
const MQ=window.MQPrimary;if(!MQ)return;
const {P,txt}=MQ.H;
const say=t=>({t,l:'fr-FR'});

const CP={
  1:[
    'moto','vélo','lama','judo','café','bébé','radis','kiwi','lune','tulipe',
    'domino','ami','lavabo','salade','numéro','tomate','pirate','mardi','samedi','papa',
    'maman','dodo','robot','cabane','banane','canari','limonade','parasol','animal','minute'
  ],
  2:[
    'lapin','mouton','ballon','poisson','maison','bateau','cadeau','sapin','chocolat','souris',
    'chapeau','jardin','poussin','cheval','poule','vache','fraise','orange','citron','bonbon',
    'étoile','fusée','forêt','école','rivière','fenêtre','cahier','crayon','cartable','dimanche'
  ],
  3:[
    'le chat dort','la lune brille','un vélo rouge','une jolie fleur','le lapin saute',
    'maman lit','papa cuisine','le chien court','une pomme rouge','un petit bateau',
    'le soleil brille','la poule picore','un ballon bleu','le bébé dort','le robot avance',
    'une grande maison','le poisson nage','la souris court','le jardin est joli','le train arrive',
    'la tortue avance','le pirate rame','une étoile brille','le cheval galope','la grenouille saute',
    'mon ami joue','la cloche sonne','le gâteau est bon','le canard nage','le vent souffle'
  ]
};

const CE1={
  1:[
    'Le chat dort.','La lune brille.','Un vélo rouge roule.','Une jolie fleur pousse.','Le lapin saute.',
    'Maman lit un livre.','Papa prépare le repas.','Le chien court vite.','Une pomme tombe.','Le bateau avance.',
    'Le soleil se lève.','La poule picore.','Un ballon bleu roule.','Le bébé dort bien.','Le robot avance.',
    'Le poisson nage.','La souris se cache.','Le train arrive.','Le vent souffle.','La cloche sonne.',
    'Mon ami joue.','La tortue avance.','Le canard nage.','Le gâteau refroidit.','La pluie tombe.'
  ],
  2:[
    'Les chats jouent dans la cour.','Des pommes vertes tombent.','Nous sommes très contents.','Mes amis chantent ensemble.','Ils ont un petit chien.',
    'Les fleurs sont belles.','Les enfants rangent leurs cahiers.','Ma sœur dessine un château.','Les oiseaux volent au-dessus du jardin.','Nous préparons une salade.',
    'Le maître ouvre la fenêtre.','Les élèves lisent en silence.','Deux lapins mangent une carotte.','La pluie mouille les chemins.','Mon frère porte son cartable.',
    'Les voitures roulent lentement.','Une abeille visite les fleurs.','Nous jouons après l’école.','Les poissons nagent dans l’eau.','Mes parents arrivent ce soir.',
    'Les feuilles tombent en automne.','Le boulanger prépare le pain.','La maîtresse écrit au tableau.','Les enfants lavent leurs mains.','Le soleil chauffe la cour.'
  ],
  3:[
    'Les enfants regardent les oiseaux.','Mes petites sœurs dessinent.','Nous avons mangé une tarte.','Ils jouaient dans le jardin.','Les élèves terminent leur travail.',
    'Hier, la pluie est tombée longtemps.','Demain, nous visiterons le musée.','Les grands arbres protègent la maison.','Mon voisin a retrouvé son chat.','Les enfants ont préparé un gâteau.',
    'La maîtresse explique la nouvelle leçon.','Nous rangeons soigneusement nos affaires.','Les hirondelles reviennent au printemps.','Mon frère et moi faisons du vélo.','Les petits chiens couraient dans le parc.',
    'Cette histoire commence dans une forêt.','Les élèves écouteront une chanson demain.','Ma grand-mère prépare une soupe chaude.','Les oiseaux construisent leur nid en hauteur.','Après la récréation, nous reprenons le travail.',
    'Le jardinier arrose les jeunes plantes.','Les enfants ont oublié leurs manteaux.','Une lumière brillait derrière la fenêtre.','Nous avons observé les étoiles hier soir.','Les voyageurs attendent le prochain train.'
  ]
};

function cpQuestion(d){
  const level=d<=1?1:d===2?2:3,answer=P(CP[level]);
  const phrase=answer.includes(' ');
  return txt(phrase?'🎧 Écoute et écris la petite phrase :':'🎧 Écoute et écris le mot :',[answer],{
    audio:say(answer),strict:true,lang:'fr',chips:['é','è','ê','à','ç'],
    hint:phrase?`La phrase contient ${answer.trim().split(/\s+/).length} mots. Relis chaque mot.`:`Le mot a ${answer.length} lettres. Dis-le lentement.`,
    expl:`On écrit : <b>${answer}</b>`
  });
}
function ce1Question(d){
  const level=d<=1?1:d===2?2:3,answer=P(CE1[level]);
  return txt('🎧 Écoute et écris la phrase :',[answer],{
    audio:say(answer),strict:true,lang:'fr',chips:['é','è','ê','à','ç','ù'],
    hint:`La phrase contient ${answer.trim().split(/\s+/).length} mots. Pense à la majuscule, au point et aux accords.`,
    expl:`On écrit : <b>${answer}</b>`
  });
}

MQ.enrich('cp-fr-dictee',{items:[cpQuestion],w:.72,
  r:['La dictée change souvent : j’écoute vraiment le mot ou la phrase au lieu de mémoriser une série.']});
MQ.enrich('ce1-fr-dictee',{items:[ce1Question],w:.72,
  r:['Je m’entraîne sur des phrases variées : j’écoute, j’écris, puis je vérifie les accords et la ponctuation.']});
})();
