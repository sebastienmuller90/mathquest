/* ===== MathQuest — Bibliothèque de lecture et compréhension (CP → 3e) =====
   Premier lot pilote : 1 support par niveau (+ 1 support documentaire supplémentaire en 4e pour
   démontrer la diversité des types de documents), choisi parmi les chapitres de Français déjà
   existants où un support de lecture s'intègre naturellement (jamais forcé dans un chapitre qui ne
   s'y prête pas). Voir docs/reading-system.md pour l'architecture complète et les règles de droit
   d'auteur appliquées ici.

   Droits d'auteur (voir docs/reading-system.md §Droits d'auteur) :
   - sourceType 'original_mathquest' : texte intégralement écrit pour MathQuest, aucune restriction.
   - sourceType 'public_domain' : adaptation en français moderne, simplifiée pour le niveau visé, très
     librement inspirée d'une œuvre tombée dans le domaine public (auteur mort depuis plus de 70 ans) —
     jamais une citation verbatim d'une traduction existante encore protégée. Vérifié un par un :
     Homère (Antiquité), Chrétien de Troyes (XIIe s.), Maupassant (mort 1893) : tous indiscutablement
     du domaine public en France.
   Aucune œuvre encore protégée (ex. Tolkien, auteurs vivants) n'est utilisée ici. */
window.MQ_READING={
 version:'1.1-lot2-2026-10-18',
 resources:{

  fr_cp_lila_chat_01:{
   id:'fr_cp_lila_chat_01',level:'CP',subject:'francais',type:'literary_text',documentType:'récit',
   title:'Lila et Plume',author:null,work:null,sourceType:'original_mathquest',
   chapterLinks:['cp-fr-comprendre'],
   competencies:['READ_EXPLICIT','READ_CHARACTER','READ_PLACE'],
   difficulty:1,estimatedReadingMinutes:1,audioMode:'audioRecommended',sessionSize:5,
   paragraphs:[
    'Lila a un chat.',
    'Le chat s’appelle Plume.',
    'Plume dort sur le canapé.',
    'Lila pose une couverture sur lui.'
   ],
   glossary:[{word:'couverture',definition:'Un tissu épais qui tient chaud.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_CHARACTER'],difficulty:1,prompt:'Qui a un chat ?',choices:['Lila','Le chat','La maîtresse'],ans:0,evidenceParagraph:0,explanation:'La 1ʳᵉ phrase dit : « Lila a un chat. »'},
    {id:'q2',type:'text',strict:true,acc:['Plume'],competencies:['READ_EXPLICIT'],difficulty:1,prompt:'Comment s’appelle le chat ?',evidenceParagraph:1,explanation:'Le texte dit : « Le chat s’appelle Plume. »'},
    {id:'q3',type:'choice',competencies:['READ_EXPLICIT','READ_PLACE'],difficulty:1,prompt:'Où dort Plume ?',choices:['Sur le canapé','Sous le lit','Dans le jardin'],ans:0,evidenceParagraph:2,explanation:'Le texte dit : « Plume dort sur le canapé. »'},
    {id:'q4',type:'choice',competencies:['READ_EXPLICIT'],difficulty:1,prompt:'Que pose Lila sur Plume ?',choices:['Une couverture','Un livre','Un jouet'],ans:0,evidenceParagraph:3,explanation:'La dernière phrase dit : « Lila pose une couverture sur lui. »'},
    {id:'q5',type:'choice',competencies:['READ_EXPLICIT'],difficulty:1,prompt:'Vrai ou faux : Plume est un chien.',choices:['Vrai','Faux'],ans:1,evidenceParagraph:1,explanation:'Le texte dit que Plume est un chat, pas un chien.'},
    {id:'q6',type:'order',competencies:['READ_SEQUENCE'],difficulty:2,prompt:'Remets les phrases dans l’ordre de l’histoire.',tokens:['Lila a un chat','Plume dort sur le canapé','Lila pose une couverture'],ans:'Lila a un chat Plume dort sur le canapé Lila pose une couverture',explanation:'C’est l’ordre exact du texte.'},
    {id:'q7',type:'evidence',competencies:['READ_JUSTIFY','READ_EMOTION_INTENTION'],difficulty:2,prompt:'Quelle phrase montre que Lila prend bien soin de Plume ?',evidenceParagraph:3,explanation:'« Lila pose une couverture sur lui » montre qu’elle veille sur son confort.'}
   ]
  },

  fr_ce1_renard_poules_01:{
   id:'fr_ce1_renard_poules_01',level:'CE1',subject:'francais',type:'literary_text',documentType:'récit',
   title:'Le renard et le chien de garde',author:null,work:null,sourceType:'original_mathquest',
   chapterLinks:['ce1-fr-comprendre'],
   competencies:['READ_EXPLICIT','READ_CHARACTER','READ_PLACE','READ_SEQUENCE','READ_CAUSE_CONSEQUENCE','READ_VOCAB_CONTEXT'],
   difficulty:2,estimatedReadingMinutes:2,audioMode:'audioRecommended',sessionSize:7,
   paragraphs:[
    'Dans une ferme, trois poules vivaient près d’un grand pommier.',
    'Un soir, un renard roux s’approcha du poulailler.',
    'Il voulait manger les poules pour son dîner.',
    'Mais le chien de la ferme entendit du bruit et aboya très fort.',
    'Le renard eut peur et s’enfuit dans la forêt.',
    'Les poules étaient sauvées grâce au chien.'
   ],
   glossary:[{word:'poulailler',definition:'Une petite maison en bois pour les poules.'},{word:'aboya',definition:'A crié comme un chien.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_PLACE'],difficulty:1,prompt:'Où vivaient les poules ?',choices:['Dans une ferme','Dans la forêt','Dans un jardin'],ans:0,evidenceParagraph:0,explanation:'« Dans une ferme, trois poules vivaient... »'},
    {id:'q2',type:'text',strict:true,acc:['renard','le renard','un renard'],competencies:['READ_CHARACTER'],difficulty:1,prompt:'Qui s’approche du poulailler le soir ?',evidenceParagraph:1,explanation:'« Un soir, un renard roux s’approcha du poulailler. »'},
    {id:'q3',type:'choice',competencies:['READ_EXPLICIT'],difficulty:1,prompt:'Que voulait faire le renard ?',choices:['Manger les poules','Jouer avec les poules','Dormir dans le poulailler'],ans:0,evidenceParagraph:2,explanation:'« Il voulait manger les poules pour son dîner. »'},
    {id:'q4',type:'choice',competencies:['READ_CHARACTER'],difficulty:1,prompt:'Qui fait fuir le renard ?',choices:['Le chien','Le fermier','Une autre poule'],ans:0,evidenceParagraph:3,explanation:'« ...le chien de la ferme entendit du bruit et aboya très fort. »'},
    {id:'q5',type:'choice',competencies:['READ_EXPLICIT'],difficulty:1,prompt:'Vrai ou faux : le renard a réussi à manger les poules.',choices:['Vrai','Faux'],ans:1,evidenceParagraph:4,explanation:'Le renard « eut peur et s’enfuit » : il n’a rien mangé.'},
    {id:'q6',type:'choice',competencies:['READ_CAUSE_CONSEQUENCE'],difficulty:3,prompt:'Pourquoi le renard s’enfuit-il ?',choices:['Parce qu’il a peur du chien qui aboie','Parce qu’il n’aime pas les poules','Parce qu’il est fatigué'],ans:0,evidenceParagraph:4,explanation:'Le chien aboie fort, ce qui fait peur au renard.'},
    {id:'q7',type:'order',competencies:['READ_SEQUENCE'],difficulty:2,prompt:'Remets l’histoire dans l’ordre.',tokens:['Le renard s’approche du poulailler','Le chien aboie très fort','Le renard s’enfuit dans la forêt'],ans:'Le renard s’approche du poulailler Le chien aboie très fort Le renard s’enfuit dans la forêt',explanation:'C’est l’ordre exact des événements.'},
    {id:'q8',type:'evidence',competencies:['READ_JUSTIFY'],difficulty:2,prompt:'Quelle phrase montre que le chien a sauvé les poules ?',evidenceParagraph:5,explanation:'« Les poules étaient sauvées grâce au chien. »'},
    {id:'q9',type:'choice',competencies:['READ_VOCAB_CONTEXT'],difficulty:2,prompt:'Dans le texte, un « poulailler » est...',choices:['La maison des poules','La maison du fermier','Un arbre du jardin'],ans:0,evidenceParagraph:1,explanation:'Voir le glossaire : un poulailler est une petite maison pour les poules.'}
   ]
  },

  fr_ce2_pique_nique_orage_01:{
   id:'fr_ce2_pique_nique_orage_01',level:'CE2',subject:'francais',type:'literary_text',documentType:'récit',
   title:'Le pique-nique dans le salon',author:null,work:null,sourceType:'original_mathquest',
   chapterLinks:['ce2-fr-comprendre'],
   competencies:['READ_EXPLICIT','READ_CAUSE_CONSEQUENCE','READ_INFERENCE','READ_VOCAB_CONTEXT','READ_SEQUENCE','READ_EMOTION_INTENTION','READ_MAIN_IDEA'],
   difficulty:2,estimatedReadingMinutes:2,audioMode:'audioRecommended',sessionSize:8,
   paragraphs:[
    'Samedi matin, Noah et sa sœur Inès préparèrent un pique-nique pour aller au parc.',
    'Ils emportèrent des sandwichs, des fruits et une grande couverture à carreaux.',
    'Au moment de partir, le ciel devint soudain tout gris.',
    'De gros nuages noirs s’amoncelaient au-dessus des arbres.',
    'Leur maman regarda par la fenêtre et dit : « Je crois que nous allons rester à la maison. »',
    'Quelques minutes plus tard, la pluie se mit à tomber très fort.',
    'Noah fut un peu déçu, mais Inès proposa de pique-niquer... dans le salon !',
    'Ils étalèrent la couverture sur le tapis et mangèrent leurs sandwichs en riant.'
   ],
   glossary:[{word:'s’amoncelaient',definition:'S’entassaient, se regroupaient en grande quantité.'},{word:'déçu',definition:'Triste parce que quelque chose ne s’est pas passé comme prévu.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_CHARACTER'],difficulty:1,prompt:'Qui prépare le pique-nique ?',choices:['Noah et Inès','Seulement Noah','Leur maman'],ans:0,evidenceParagraph:0,explanation:'« Noah et sa sœur Inès préparèrent un pique-nique... »'},
    {id:'q2',type:'choice',competencies:['READ_EXPLICIT'],difficulty:1,prompt:'Où voulaient-ils aller au départ ?',choices:['Au parc','À la piscine','Chez leurs grands-parents'],ans:0,evidenceParagraph:0,explanation:'« ...pour aller au parc. »'},
    {id:'q3',type:'choice',competencies:['READ_CAUSE_CONSEQUENCE'],difficulty:3,prompt:'Pourquoi la maman dit-elle qu’ils vont rester à la maison ?',choices:['Parce que le ciel devient gris et menaçant','Parce qu’elle est fatiguée','Parce qu’il n’y a plus de sandwichs'],ans:0,evidenceParagraph:3,explanation:'Les nuages noirs s’amoncellent juste avant sa remarque.'},
    {id:'q4',type:'choice',competencies:['READ_INFERENCE'],difficulty:4,prompt:'Avant même que la pluie tombe, qu’est-ce qui annonce qu’il va pleuvoir ?',choices:['Les nuages noirs qui s’amoncellent','Le bruit du tonnerre','Le vent très fort'],ans:0,evidenceParagraph:3,explanation:'Le texte ne dit jamais « il va pleuvoir » : on le déduit des nuages noirs.'},
    {id:'q5',type:'choice',competencies:['READ_VOCAB_CONTEXT'],difficulty:2,prompt:'Dans le texte, « déçu » veut dire...',choices:['Un peu triste','Très content','Fatigué'],ans:0,evidenceParagraph:6,explanation:'Être « déçu », c’est être un peu triste parce que ce qu’on espérait n’est pas arrivé.'},
    {id:'q6',type:'order',competencies:['READ_SEQUENCE'],difficulty:3,prompt:'Remets l’histoire dans l’ordre.',tokens:['Noah et Inès préparent le pique-nique','Le ciel devient gris','La pluie tombe','Ils pique-niquent dans le salon'],ans:'Noah et Inès préparent le pique-nique Le ciel devient gris La pluie tombe Ils pique-niquent dans le salon',explanation:'C’est l’ordre exact des événements du texte.'},
    {id:'q7',type:'choice',competencies:['READ_EMOTION_INTENTION'],difficulty:3,prompt:'Comment se sent Noah quand il apprend qu’ils ne sortent pas ?',choices:['Un peu déçu','Très content','En colère'],ans:0,evidenceParagraph:6,explanation:'« Noah fut un peu déçu... »'},
    {id:'q8',type:'evidence',competencies:['READ_JUSTIFY'],difficulty:3,prompt:'Quelle phrase montre qu’Inès trouve une solution pour que la journée reste agréable ?',evidenceParagraph:6,explanation:'« ...Inès proposa de pique-niquer... dans le salon ! »'},
    {id:'q9',type:'choice',competencies:['READ_MAIN_IDEA'],difficulty:4,prompt:'Quelle phrase résume le mieux cette histoire ?',choices:['Un pique-nique au parc est remplacé par un pique-nique à la maison à cause de la pluie','Noah et Inès se disputent à propos du repas','La maman interdit les pique-niques toute l’année'],ans:0,explanation:'C’est l’idée générale de tout le texte.'},
    {id:'q10',type:'choice',competencies:['READ_EXPLICIT'],difficulty:1,prompt:'Que mettent-ils sur le tapis du salon ?',choices:['La couverture à carreaux','Une nappe blanche','Rien du tout'],ans:0,evidenceParagraph:7,explanation:'« Ils étalèrent la couverture sur le tapis... »'}
   ]
  },

  fr_cm1_nouvel_eleve_01:{
   id:'fr_cm1_nouvel_eleve_01',level:'CM1',subject:'francais',type:'literary_text',documentType:'récit',
   title:'Le nouvel élève',author:null,work:null,sourceType:'original_mathquest',
   chapterLinks:['cm1-fr-comprendre'],
   competencies:['READ_CHARACTER','READ_EMOTION_INTENTION','READ_REFERENCE','READ_CAUSE_CONSEQUENCE','READ_INFERENCE','READ_SEQUENCE','READ_MAIN_IDEA','READ_JUSTIFY','READ_VOCAB_CONTEXT'],
   difficulty:3,estimatedReadingMinutes:3,audioMode:'audioAllowed',sessionSize:8,
   paragraphs:[
    'Ce matin-là, un nouvel élève entra dans la classe de CM1. Il s’appelait Yanis et il venait d’une autre ville.',
    'Il resta debout près de la porte, les yeux baissés, sans oser avancer.',
    'La maîtresse lui sourit et l’invita à s’asseoir à côté de Léa.',
    'Pendant la récréation, Léa remarqua que Yanis restait seul dans un coin de la cour.',
    'Elle s’approcha de lui et lui proposa de jouer au ballon avec ses amis.',
    'Le visage de Yanis s’éclaira aussitôt d’un grand sourire.',
    'À la fin de la journée, il rentra chez lui en pensant qu’il allait peut-être se faire des amis, finalement.'
   ],
   glossary:[{word:'oser',definition:'Avoir le courage de faire quelque chose.'},{word:'s’éclaira',definition:'Est devenu joyeux, lumineux.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_CHARACTER'],difficulty:1,prompt:'Qui est le nouvel élève ?',choices:['Yanis','Léa','La maîtresse'],ans:0,evidenceParagraph:0,explanation:'« Il s’appelait Yanis... »'},
    {id:'q2',type:'choice',competencies:['READ_EMOTION_INTENTION'],difficulty:3,prompt:'Comment se sent Yanis en entrant dans la classe ?',choices:['Timide et mal à l’aise','Très content','En colère'],ans:0,evidenceParagraph:1,explanation:'« ...les yeux baissés, sans oser avancer » : des indices de timidité.'},
    {id:'q3',type:'choice',competencies:['READ_REFERENCE'],difficulty:3,prompt:'Dans « Elle s’approcha de lui », qui désigne « lui » ?',choices:['Yanis','La maîtresse','Le ballon'],ans:0,evidenceParagraph:4,explanation:'« lui » reprend Yanis, dont on parle juste avant.'},
    {id:'q4',type:'choice',competencies:['READ_REFERENCE'],difficulty:3,prompt:'Et dans cette même phrase, qui désigne « Elle » ?',choices:['Léa','La maîtresse','Une amie de Yanis'],ans:0,evidenceParagraph:4,explanation:'C’est Léa qui s’approche de Yanis.'},
    {id:'q5',type:'choice',competencies:['READ_CAUSE_CONSEQUENCE'],difficulty:4,prompt:'Pourquoi le visage de Yanis s’éclaire-t-il ?',choices:['Parce que Léa lui propose de jouer avec elle','Parce que la récréation est finie','Parce qu’il a eu une bonne note'],ans:0,evidenceParagraph:5,explanation:'Le sourire vient juste après la proposition de Léa.'},
    {id:'q6',type:'choice',competencies:['READ_INFERENCE'],difficulty:4,prompt:'D’après le texte, que ressentait sans doute Yanis avant que Léa vienne lui parler ?',choices:['De la solitude','De la joie','De la fierté'],ans:0,evidenceParagraph:3,explanation:'« Yanis restait seul dans un coin de la cour » le suggère sans le dire directement.'},
    {id:'q7',type:'order',competencies:['READ_SEQUENCE'],difficulty:3,prompt:'Remets l’histoire dans l’ordre.',tokens:['Yanis entre dans la classe','La maîtresse l’installe à côté de Léa','Léa le voit seul dans la cour','Léa lui propose de jouer'],ans:'Yanis entre dans la classe La maîtresse l’installe à côté de Léa Léa le voit seul dans la cour Léa lui propose de jouer',explanation:'C’est l’ordre exact des événements.'},
    {id:'q8',type:'choice',competencies:['READ_MAIN_IDEA'],difficulty:5,prompt:'Quel est le thème principal de ce texte ?',choices:['L’arrivée d’un nouvel élève qui finit par se faire un ami','Une dispute entre deux élèves','Une leçon de mathématiques'],ans:0,explanation:'C’est l’idée générale de toute l’histoire.'},
    {id:'q9',type:'evidence',competencies:['READ_JUSTIFY'],difficulty:5,prompt:'Quelle phrase montre que Léa est attentive aux autres ?',evidenceParagraph:3,explanation:'« Léa remarqua que Yanis restait seul... » montre qu’elle observe et se soucie de lui.'},
    {id:'q10',type:'choice',competencies:['READ_VOCAB_CONTEXT'],difficulty:2,prompt:'Dans le texte, « oser » signifie avoir...',choices:['Le courage de faire quelque chose','Peur de faire quelque chose','Le temps de faire quelque chose'],ans:0,explanation:'« Oser », c’est avoir le courage de faire quelque chose qui fait un peu peur.'}
   ]
  },

  fr_cm2_colis_mysterieux_01:{
   id:'fr_cm2_colis_mysterieux_01',level:'CM2',subject:'francais',type:'literary_text',documentType:'récit',
   title:'Le colis mystérieux',author:null,work:null,sourceType:'original_mathquest',
   chapterLinks:['cm2-fr-comprendre'],
   competencies:['READ_EXPLICIT','READ_INFERENCE','READ_REFERENCE','READ_VOCAB_CONTEXT','READ_MAIN_IDEA','READ_EMOTION_INTENTION','READ_SEQUENCE','READ_JUSTIFY','READ_NARRATOR_POV'],
   difficulty:4,estimatedReadingMinutes:3,audioMode:'audioAllowed',sessionSize:9,
   paragraphs:[
    'Quand Camille rentra de l’école, un petit colis l’attendait sur le pas de la porte.',
    'Aucune étiquette n’indiquait l’expéditeur, seulement son prénom écrit à l’encre bleue.',
    'Intriguée, elle le porta dans sa chambre et l’ouvrit avec précaution.',
    'À l’intérieur se trouvait un carnet à la couverture usée et une courte lettre.',
    'La lettre disait seulement : « Pour continuer ce que nous avions commencé ensemble. »',
    'Camille reconnut aussitôt l’écriture penchée de son grand-père, qui lui apprenait à dessiner des oiseaux avant son déménagement l’année dernière.',
    'Elle feuilleta le carnet et découvrit des dizaines de croquis d’oiseaux, page après page.',
    'Sur la dernière page, une phrase était griffonnée : « À ton tour de remplir les pages qui restent. »',
    'Camille sourit, attrapa un crayon, et commença aussitôt son premier dessin.'
   ],
   glossary:[{word:'expéditeur',definition:'La personne qui envoie quelque chose.'},{word:'intriguée',definition:'Curieuse, qui veut comprendre un mystère.'},{word:'griffonnée',definition:'Écrite rapidement, pas très soigneusement.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_EXPLICIT'],difficulty:1,prompt:'Que trouve Camille sur le pas de la porte ?',choices:['Un petit colis','Une lettre de l’école','Un bouquet de fleurs'],ans:0,evidenceParagraph:0,explanation:'« ...un petit colis l’attendait sur le pas de la porte. »'},
    {id:'q2',type:'choice',competencies:['READ_INFERENCE'],difficulty:4,prompt:'Pourquoi Camille est-elle intriguée par le colis ?',choices:['Parce qu’il n’y a pas de nom d’expéditeur','Parce que le colis est très lourd','Parce qu’il est arrivé en retard'],ans:0,evidenceParagraph:1,explanation:'« Aucune étiquette n’indiquait l’expéditeur. »'},
    {id:'q3',type:'choice',competencies:['READ_INFERENCE'],difficulty:5,prompt:'Qui a très probablement envoyé le colis à Camille ?',choices:['Son grand-père','Sa maîtresse','Une amie de l’école'],ans:0,evidenceParagraph:5,explanation:'Rien ne le dit directement, mais Camille reconnaît l’écriture de son grand-père.'},
    {id:'q4',type:'choice',competencies:['READ_REFERENCE'],difficulty:3,prompt:'Dans « Elle le porta dans sa chambre », que désigne « le » ?',choices:['Le colis','Le carnet','Le crayon'],ans:0,evidenceParagraph:2,explanation:'C’est le colis dont on parle juste avant.'},
    {id:'q5',type:'choice',competencies:['READ_VOCAB_CONTEXT'],difficulty:2,prompt:'Dans le texte, « intriguée » veut dire...',choices:['Curieuse, qui veut comprendre','Fâchée','Fatiguée'],ans:0,explanation:'« Intriguée » : elle est curieuse, elle veut comprendre quelque chose d’étrange.'},
    {id:'q6',type:'choice',competencies:['READ_INFERENCE'],difficulty:5,prompt:'Comment Camille sait-elle que le carnet vient de son grand-père, alors que rien ne le dit au début ?',choices:['Elle reconnaît son écriture penchée','Le nom de son grand-père est écrit sur le colis','Sa maman le lui a dit'],ans:0,evidenceParagraph:5,explanation:'« Camille reconnut aussitôt l’écriture penchée de son grand-père. »'},
    {id:'q7',type:'choice',competencies:['READ_EXPLICIT'],difficulty:1,prompt:'Que contient le colis ?',choices:['Un carnet et une lettre','Un livre et un stylo','Des photos de famille'],ans:0,evidenceParagraph:3,explanation:'« À l’intérieur se trouvait un carnet... et une courte lettre. »'},
    {id:'q8',type:'choice',competencies:['READ_MAIN_IDEA'],difficulty:5,prompt:'Que signifie la phrase « À ton tour de remplir les pages qui restent » ?',choices:['Camille doit continuer à dessiner des oiseaux dans le carnet','Camille doit écrire une lettre à son grand-père','Camille doit rendre le carnet à l’école'],ans:0,evidenceParagraph:7,explanation:'Le grand-père lui transmet le carnet pour qu’elle continue les dessins.'},
    {id:'q9',type:'choice',competencies:['READ_EMOTION_INTENTION'],difficulty:4,prompt:'Que ressent sans doute Camille à la toute fin du texte ?',choices:['De la joie et l’envie de dessiner','De la tristesse','De la peur'],ans:0,evidenceParagraph:8,explanation:'« Camille sourit, attrapa un crayon, et commença aussitôt son premier dessin. »'},
    {id:'q10',type:'order',competencies:['READ_SEQUENCE'],difficulty:3,prompt:'Remets l’histoire dans l’ordre.',tokens:['Camille trouve le colis','Elle ouvre le colis dans sa chambre','Elle reconnaît l’écriture de son grand-père','Elle commence son premier dessin'],ans:'Camille trouve le colis Elle ouvre le colis dans sa chambre Elle reconnaît l’écriture de son grand-père Elle commence son premier dessin',explanation:'C’est l’ordre exact des événements.'},
    {id:'q11',type:'evidence',competencies:['READ_JUSTIFY'],difficulty:5,prompt:'Quelle phrase montre que le grand-père et Camille partageaient une activité avant son déménagement ?',evidenceParagraph:5,explanation:'« ...qui lui apprenait à dessiner des oiseaux avant son déménagement l’année dernière. »'},
    {id:'q12',type:'choice',competencies:['READ_NARRATOR_POV'],difficulty:4,prompt:'Qui raconte cette histoire ?',choices:['Un narrateur extérieur, qui connaît les pensées de Camille','Camille elle-même, qui dit « je »','Le grand-père de Camille'],ans:0,explanation:'Le texte utilise « elle », pas « je » : c’est un narrateur extérieur.'}
   ]
  },

  fr_6e_odyssee_cyclope_01:{
   id:'fr_6e_odyssee_cyclope_01',level:'6e',subject:'francais',type:'literary_text',documentType:'récit mythologique',
   title:'Ulysse et le Cyclope',author:'Homère',work:'L’Odyssée',
   sourceType:'public_domain',sourceReference:'Adaptation en français moderne, simplifiée pour le niveau 6e — libre reformulation du chant IX, Homère étant dans le domaine public depuis l’Antiquité.',
   chapterLinks:['fr6h'],
   competencies:['READ_CHARACTER','READ_EXPLICIT','READ_CAUSE_CONSEQUENCE','READ_INFERENCE','READ_JUSTIFY','READ_AUTHOR_INTENT','READ_SEQUENCE','READ_VOCAB_CONTEXT','READ_MAIN_IDEA'],
   difficulty:4,estimatedReadingMinutes:4,audioMode:'audioAllowed',sessionSize:9,
   paragraphs:[
    'Après la guerre de Troie, le rusé Ulysse naviguait vers son royaume d’Ithaque avec ses compagnons.',
    'Un jour, ils abordèrent une île inconnue et découvrirent une immense grotte remplie de fromages et de troupeaux de moutons.',
    'Ulysse et douze de ses hommes y entrèrent pour se reposer et attendre le maître des lieux.',
    'Bientôt, un géant à un seul œil nommé Polyphème, un Cyclope, rentra avec son troupeau et roula un énorme rocher devant l’entrée, les enfermant à l’intérieur.',
    'Le Cyclope dévora deux des compagnons d’Ulysse sous ses yeux horrifiés.',
    'Ulysse comprit qu’il devait être rusé plutôt que courageux pour sauver ses hommes restants.',
    'Il offrit au géant un vin très fort ; une fois le Cyclope endormi et ivre, Ulysse et ses compagnons lui crevèrent son unique œil avec un pieu de bois durci au feu.',
    'Le lendemain, Ulysse fit sortir ses hommes cachés sous le ventre des moutons, trompant le Cyclope devenu aveugle, et ils purent enfin s’échapper vers leur navire.'
   ],
   glossary:[{word:'Cyclope',definition:'Dans la mythologie grecque, un géant à un seul œil.'},{word:'ivre',definition:'Qui a trop bu de vin et ne contrôle plus bien ses gestes.'},{word:'pieu',definition:'Un grand bâton pointu et solide.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_CHARACTER'],difficulty:1,prompt:'Qui est le héros de cette histoire ?',choices:['Ulysse','Polyphème','Un dieu grec'],ans:0,evidenceParagraph:0,explanation:'Le texte s’ouvre sur « le rusé Ulysse ».'},
    {id:'q2',type:'choice',competencies:['READ_EXPLICIT'],difficulty:1,prompt:'Qu’est-ce que le Cyclope ?',choices:['Un géant à un seul œil','Un petit lutin','Un serpent géant'],ans:0,evidenceParagraph:3,explanation:'Le texte le dit : « un géant à un seul œil nommé Polyphème, un Cyclope ».'},
    {id:'q3',type:'choice',competencies:['READ_EXPLICIT'],difficulty:2,prompt:'Comment le Cyclope empêche-t-il Ulysse et ses hommes de sortir ?',choices:['Il roule un énorme rocher devant l’entrée','Il ferme une porte en bois','Il les attache avec des cordes'],ans:0,evidenceParagraph:3,explanation:'« ...roula un énorme rocher devant l’entrée, les enfermant à l’intérieur. »'},
    {id:'q4',type:'choice',competencies:['READ_CAUSE_CONSEQUENCE'],difficulty:4,prompt:'Pourquoi Ulysse choisit-il la ruse plutôt que la force contre le Cyclope ?',choices:['Parce que le Cyclope est bien plus fort et grand que lui','Parce qu’Ulysse n’a aucune arme','Parce qu’il veut devenir ami avec le Cyclope'],ans:0,evidenceParagraph:5,explanation:'Un géant ne peut pas être vaincu par la force : il faut la ruse.'},
    {id:'q5',type:'choice',competencies:['READ_INFERENCE'],difficulty:5,prompt:'Pourquoi Ulysse offre-t-il du vin très fort au Cyclope ?',choices:['Pour l’endormir et pouvoir agir sans qu’il résiste','Parce que c’est un cadeau de politesse','Parce qu’il n’a rien d’autre à lui offrir'],ans:0,evidenceParagraph:6,explanation:'Le texte enchaîne : « une fois le Cyclope endormi et ivre... »'},
    {id:'q6',type:'choice',competencies:['READ_EXPLICIT'],difficulty:2,prompt:'Comment Ulysse et ses hommes blessent-ils le Cyclope ?',choices:['Ils lui crèvent son unique œil avec un pieu','Ils lui coupent la main','Ils l’attachent à un rocher'],ans:0,evidenceParagraph:6,explanation:'« ...lui crevèrent son unique œil avec un pieu de bois durci au feu. »'},
    {id:'q7',type:'choice',competencies:['READ_INFERENCE'],difficulty:6,prompt:'Comment Ulysse et ses hommes sortent-ils de la grotte sans être vus ?',choices:['Ils se cachent sous le ventre des moutons','Ils creusent un tunnel','Le Cyclope les laisse partir'],ans:0,evidenceParagraph:7,explanation:'« ...fit sortir ses hommes cachés sous le ventre des moutons... »'},
    {id:'q8',type:'evidence',competencies:['READ_JUSTIFY'],difficulty:5,prompt:'Quelle phrase montre que le Cyclope est un vrai danger pour les compagnons d’Ulysse ?',evidenceParagraph:4,explanation:'« Le Cyclope dévora deux des compagnons d’Ulysse... »'},
    {id:'q9',type:'choice',competencies:['READ_AUTHOR_INTENT'],difficulty:7,prompt:'Qu’est-ce que ce récit cherche surtout à montrer chez Ulysse ?',choices:['Que l’intelligence et la ruse peuvent triompher de la force brute','Qu’il faut toujours être le plus fort pour gagner','Qu’il vaut mieux abandonner face à un ennemi puissant'],ans:0,explanation:'Ulysse gagne par la ruse, jamais par la force physique.'},
    {id:'q10',type:'order',competencies:['READ_SEQUENCE'],difficulty:3,prompt:'Remets les événements dans l’ordre.',tokens:['Ulysse et ses hommes entrent dans la grotte','Le Cyclope les enferme à l’intérieur','Le Cyclope dévore deux compagnons','Ulysse crève l’œil du Cyclope endormi','Les Grecs s’échappent cachés sous les moutons'],ans:'Ulysse et ses hommes entrent dans la grotte Le Cyclope les enferme à l’intérieur Le Cyclope dévore deux compagnons Ulysse crève l’œil du Cyclope endormi Les Grecs s’échappent cachés sous les moutons',explanation:'C’est l’ordre exact du récit.'},
    {id:'q11',type:'choice',competencies:['READ_VOCAB_CONTEXT'],difficulty:2,prompt:'Dans le texte, que veut dire « ivre » ?',choices:['Avoir trop bu et ne plus bien se contrôler','Être très fatigué','Être en colère'],ans:0,explanation:'Être « ivre », c’est avoir trop bu d’alcool : on ne contrôle plus bien ses gestes. C’est pour cela que la ruse d’Ulysse fonctionne.'},
    {id:'q12',type:'choice',competencies:['READ_MAIN_IDEA'],difficulty:6,prompt:'Quel est le thème principal de ce passage de L’Odyssée ?',choices:['Une rencontre dangereuse avec un monstre, surmontée par la ruse','Une bataille entre deux armées','Un voyage tranquille sans obstacle'],ans:0,explanation:'C’est l’idée générale de tout le texte.'}
   ]
  },

  fr_5e_perceval_chevaliers_01:{
   id:'fr_5e_perceval_chevaliers_01',level:'5e',subject:'francais',type:'literary_text',documentType:'récit médiéval',
   title:'Perceval découvre les chevaliers',author:'Chrétien de Troyes',work:'Perceval ou le Conte du Graal',
   sourceType:'public_domain',sourceReference:'Adaptation en français moderne, simplifiée pour le niveau 5e — libre reformulation de l’épisode d’ouverture, Chrétien de Troyes (XIIe siècle) étant dans le domaine public.',
   chapterLinks:['fr5d'],
   competencies:['READ_CHARACTER','READ_CAUSE_CONSEQUENCE','READ_EXPLICIT','READ_INFERENCE','READ_VOCAB_CONTEXT','READ_EMOTION_INTENTION','READ_JUSTIFY','READ_MAIN_IDEA','READ_AUTHOR_INTENT','READ_REFERENCE'],
   difficulty:4,estimatedReadingMinutes:4,audioMode:'audioAllowed',sessionSize:9,
   paragraphs:[
    'Perceval avait grandi seul avec sa mère, au cœur d’une forêt isolée, loin de tout.',
    'Sa mère lui avait toujours caché l’existence des chevaliers, car son père et ses frères étaient morts au combat, et elle voulait protéger son dernier fils de ce destin.',
    'Un jour, alors qu’il chassait dans la forêt, Perceval entendit un bruit étrange : un cliquetis de métal et un galop de chevaux.',
    'Il vit alors apparaître des hommes couverts d’armures étincelantes, montés sur de magnifiques chevaux.',
    'N’ayant jamais rien vu de tel, Perceval crut d’abord que ces hommes resplendissants étaient des anges, ou peut-être Dieu lui-même.',
    'Le chef du groupe s’approcha et lui expliqua qu’ils étaient des chevaliers du roi Arthur, partis à la recherche d’aventures.',
    'Perceval fut immédiatement émerveillé : il n’avait jamais imaginé qu’une vie si glorieuse pouvait exister.',
    'Dès cet instant, il décida de tout quitter pour devenir chevalier à son tour, malgré les larmes de sa mère qui tentait de le retenir.'
   ],
   glossary:[{word:'cliquetis',definition:'Un bruit léger et répété, comme des objets en métal qui s’entrechoquent.'},{word:'resplendissants',definition:'Qui brillent avec beaucoup d’éclat.'},{word:'émerveillé',definition:'Rempli d’admiration et de surprise joyeuse.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_CHARACTER'],difficulty:1,prompt:'Avec qui Perceval a-t-il grandi ?',choices:['Avec sa mère, seul en forêt','Avec son père, à la cour du roi','Avec des chevaliers'],ans:0,evidenceParagraph:0,explanation:'« Perceval avait grandi seul avec sa mère... »'},
    {id:'q2',type:'choice',competencies:['READ_CAUSE_CONSEQUENCE'],difficulty:4,prompt:'Pourquoi la mère de Perceval lui a-t-elle caché l’existence des chevaliers ?',choices:['Parce que son mari et ses autres fils sont morts au combat','Parce qu’elle déteste les chevaliers','Parce que c’est interdit par le roi'],ans:0,evidenceParagraph:1,explanation:'Elle veut protéger son dernier fils de ce destin tragique.'},
    {id:'q3',type:'choice',competencies:['READ_EXPLICIT'],difficulty:1,prompt:'Que voit apparaître Perceval dans la forêt ?',choices:['Des hommes en armures sur des chevaux','Des animaux sauvages','Un village'],ans:0,evidenceParagraph:3,explanation:'« ...des hommes couverts d’armures étincelantes, montés sur de magnifiques chevaux. »'},
    {id:'q4',type:'choice',competencies:['READ_INFERENCE'],difficulty:5,prompt:'Pourquoi Perceval croit-il d’abord voir des anges ou Dieu ?',choices:['Il n’a jamais rien vu de semblable aux armures étincelantes','Les chevaliers le lui ont dit eux-mêmes','Sa mère le lui avait annoncé'],ans:0,evidenceParagraph:4,explanation:'« N’ayant jamais rien vu de tel... »'},
    {id:'q5',type:'choice',competencies:['READ_VOCAB_CONTEXT'],difficulty:2,prompt:'Dans le texte, « resplendissants » veut dire...',choices:['Qui brillent avec beaucoup d’éclat','Qui font beaucoup de bruit','Qui sont très grands'],ans:0,explanation:'« Resplendissants » vient de « resplendir » : briller d’un vif éclat.'},
    {id:'q6',type:'choice',competencies:['READ_EMOTION_INTENTION'],difficulty:3,prompt:'Que ressent Perceval en découvrant la vie des chevaliers ?',choices:['De l’émerveillement et de l’admiration','De la peur','De l’indifférence'],ans:0,evidenceParagraph:6,explanation:'« Perceval fut immédiatement émerveillé... »'},
    {id:'q7',type:'choice',competencies:['READ_INFERENCE'],difficulty:5,prompt:'Qu’est-ce que cette rencontre va changer dans la vie de Perceval ?',choices:['Il va quitter sa mère pour devenir chevalier','Il va rester vivre dans la forêt pour toujours','Il va devenir ami avec les animaux de la forêt'],ans:0,evidenceParagraph:7,explanation:'« Dès cet instant, il décida de tout quitter pour devenir chevalier... »'},
    {id:'q8',type:'evidence',competencies:['READ_JUSTIFY'],difficulty:5,prompt:'Quelle phrase montre que la mère de Perceval essaie de l’empêcher de partir ?',evidenceParagraph:7,explanation:'« ...malgré les larmes de sa mère qui tentait de le retenir. »'},
    {id:'q9',type:'choice',competencies:['READ_MAIN_IDEA'],difficulty:6,prompt:'Quel est le thème principal de ce texte ?',choices:['La découverte d’un destin héroïque qui bouleverse une vie protégée','Une bataille entre deux chevaliers','Un voyage vers un pays lointain'],ans:0,explanation:'C’est l’idée générale de tout le texte.'},
    {id:'q10',type:'order',competencies:['READ_SEQUENCE'],difficulty:3,prompt:'Remets les événements dans l’ordre.',tokens:['Perceval grandit isolé avec sa mère','Il entend un bruit étrange en chassant','Il croit voir des anges','Il apprend que ce sont des chevaliers','Il décide de devenir chevalier'],ans:'Perceval grandit isolé avec sa mère Il entend un bruit étrange en chassant Il croit voir des anges Il apprend que ce sont des chevaliers Il décide de devenir chevalier',explanation:'C’est l’ordre exact du récit.'},
    {id:'q11',type:'choice',competencies:['READ_AUTHOR_INTENT'],difficulty:7,prompt:'Pourquoi l’auteur montre-t-il Perceval complètement ignorant de ce qu’est un chevalier ?',choices:['Pour souligner, par contraste, son émerveillement et sa naïveté','Parce que les chevaliers étaient réellement inconnus à cette époque','Pour rendre l’histoire plus courte'],ans:0,explanation:'Ce contraste entre ignorance et émerveillement est un ressort classique du récit.'},
    {id:'q12',type:'choice',competencies:['READ_REFERENCE'],difficulty:3,prompt:'Dans « il décida de tout quitter pour devenir chevalier à son tour », qui désigne « il » ?',choices:['Perceval','Le chef des chevaliers','Le roi Arthur'],ans:0,evidenceParagraph:7,explanation:'C’est Perceval, sujet de toute la phrase précédente.'}
   ]
  },

  fr_4e_horla_etrange_01:{
   id:'fr_4e_horla_etrange_01',level:'4e',subject:'francais',type:'literary_text',documentType:'récit fantastique',
   title:'Une présence invisible',author:'Guy de Maupassant',work:'Le Horla',
   sourceType:'public_domain',sourceReference:'Adaptation en français moderne, simplifiée pour le niveau 4e — libre reformulation du motif central de la nouvelle, Maupassant (mort en 1893) étant dans le domaine public.',
   chapterLinks:['fr4c'],
   competencies:['READ_EXPLICIT','READ_NARRATOR_POV','READ_INFERENCE','READ_VOCAB_CONTEXT','READ_MAIN_IDEA','READ_JUSTIFY','READ_AUTHOR_INTENT','READ_SEQUENCE','READ_REFERENCE','READ_CAUSE_CONSEQUENCE'],
   difficulty:5,estimatedReadingMinutes:4,audioMode:'audioAllowed',sessionSize:9,
   paragraphs:[
    'Depuis quelques semaines, je me sens étrangement observé, même lorsque je suis seul chez moi.',
    'Chaque matin, je remarque que l’eau de ma carafe a diminué pendant la nuit, alors que personne n’est entré dans ma chambre.',
    'Je commence à douter de ma propre raison : suis-je en train de devenir fou, ou bien une présence invisible partage-t-elle vraiment mon existence ?',
    'Une nuit, je décide de faire une expérience : je recouvre la carafe d’un linge et je marque le niveau de l’eau avec un trait de crayon.',
    'Au matin, malgré le linge parfaitement en place, le niveau de l’eau a de nouveau baissé.',
    'Je suis saisi d’une terreur glaciale : aucune explication raisonnable ne me vient à l’esprit.',
    'Je commence alors à appeler cette présence invisible « le Horla », sans savoir s’il s’agit d’un être réel ou du fruit de mon imagination malade.'
   ],
   glossary:[{word:'carafe',definition:'Un récipient en verre pour servir de l’eau ou une boisson.'},{word:'glaciale',definition:'Ici : extrêmement froide, pour décrire une peur intense.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_EXPLICIT'],difficulty:1,prompt:'Que remarque le narrateur chaque matin ?',choices:['L’eau de sa carafe a diminué pendant la nuit','Sa fenêtre est ouverte','Ses livres sont déplacés'],ans:0,evidenceParagraph:1,explanation:'« ...l’eau de ma carafe a diminué pendant la nuit... »'},
    {id:'q2',type:'choice',competencies:['READ_NARRATOR_POV'],difficulty:4,prompt:'Comment cette histoire est-elle racontée ?',choices:['À la première personne, par le narrateur qui dit « je »','Par un narrateur extérieur qui dit « il »','Sous forme de dialogue entre deux personnages'],ans:0,evidenceParagraph:0,explanation:'Tout le texte utilise « je ».'},
    {id:'q3',type:'choice',competencies:['READ_EXPLICIT'],difficulty:2,prompt:'Quelle expérience le narrateur fait-il une nuit ?',choices:['Il recouvre la carafe d’un linge et marque le niveau de l’eau','Il installe une caméra dans sa chambre','Il demande à un ami de dormir chez lui'],ans:0,evidenceParagraph:3,explanation:'« ...je recouvre la carafe d’un linge et je marque le niveau de l’eau... »'},
    {id:'q4',type:'choice',competencies:['READ_INFERENCE'],difficulty:5,prompt:'Pourquoi cette expérience terrifie-t-elle le narrateur ?',choices:['Parce que l’eau baisse encore malgré le linge en place, ce qui est inexplicable','Parce que le linge a disparu','Parce qu’il a vu une ombre bouger'],ans:0,evidenceParagraph:4,explanation:'Le résultat de l’expérience ne peut pas s’expliquer normalement.'},
    {id:'q5',type:'choice',competencies:['READ_INFERENCE'],difficulty:3,prompt:'Le texte donne-t-il une explication sûre et certaine à ce phénomène ?',choices:['Non, le narrateur lui-même n’en a pas','Oui, c’est un courant d’air','Oui, c’est un animal'],ans:0,evidenceParagraph:5,explanation:'« ...aucune explication raisonnable ne me vient à l’esprit. »'},
    {id:'q6',type:'choice',competencies:['READ_VOCAB_CONTEXT'],difficulty:2,prompt:'Dans le texte, une « terreur glaciale » désigne...',choices:['Une peur très intense et froide','Une maladie grave','Une tempête de neige'],ans:0,explanation:'« Glaciale » ajoute l’idée de froid : une peur si forte qu’elle glace, qu’elle paralyse.'},
    {id:'q7',type:'choice',competencies:['READ_MAIN_IDEA'],difficulty:6,prompt:'Quel est le genre de ce texte ?',choices:['Un récit fantastique, où le réel et le surnaturel se mêlent sans certitude','Un documentaire scientifique','Un conte merveilleux avec une fée'],ans:0,explanation:'Le doute entre explication rationnelle et surnaturelle est le cœur du fantastique.'},
    {id:'q8',type:'evidence',competencies:['READ_JUSTIFY'],difficulty:5,prompt:'Quelle phrase montre que le narrateur doute de sa propre santé mentale ?',evidenceParagraph:2,explanation:'« Je commence à douter de ma propre raison... »'},
    {id:'q9',type:'choice',competencies:['READ_AUTHOR_INTENT'],difficulty:7,prompt:'Pourquoi l’auteur laisse-t-il planer le doute entre explication réelle et surnaturelle, sans jamais trancher ?',choices:['C’est le principe même du registre fantastique : installer une hésitation chez le lecteur','C’est un oubli de l’auteur','Parce que l’histoire n’est pas terminée'],ans:0,explanation:'Le fantastique repose sur cette hésitation, contrairement au merveilleux ou à la science-fiction.'},
    {id:'q10',type:'order',competencies:['READ_SEQUENCE'],difficulty:3,prompt:'Remets les événements dans l’ordre.',tokens:['Le narrateur se sent observé','Il remarque que l’eau baisse chaque nuit','Il fait l’expérience du linge et du crayon','L’eau baisse malgré tout','Il nomme la présence le Horla'],ans:'Le narrateur se sent observé Il remarque que l’eau baisse chaque nuit Il fait l’expérience du linge et du crayon L’eau baisse malgré tout Il nomme la présence le Horla',explanation:'C’est l’ordre exact du récit.'},
    {id:'q11',type:'choice',competencies:['READ_REFERENCE'],difficulty:3,prompt:'Dans la dernière phrase, à quoi renvoie « le Horla » pour le narrateur, à ce stade du récit ?',choices:['Une présence invisible dont il ignore la nature réelle','Un ami imaginaire d’enfance','Un personnage de roman qu’il lit'],ans:0,evidenceParagraph:6,explanation:'C’est le nom qu’il choisit de donner à ce qu’il ne comprend pas.'},
    {id:'q12',type:'choice',competencies:['READ_CAUSE_CONSEQUENCE'],difficulty:4,prompt:'Pourquoi le narrateur choisit-il de nommer cette présence « le Horla » ?',choices:['Pour pouvoir désigner ce qu’il ne comprend pas','Parce que c’est le nom d’un ami','Parce qu’un médecin le lui a conseillé'],ans:0,evidenceParagraph:6,explanation:'Nommer l’inconnu est une façon de se repérer face à l’inexplicable.'}
   ]
  },

  fr_4e_article_recyclage_01:{
   id:'fr_4e_article_recyclage_01',level:'4e',subject:'francais',type:'document',documentType:'article de presse',
   title:'Au collège Jean-Moulin, les élèves donnent une seconde vie au papier',author:null,work:null,
   sourceType:'original_mathquest',chapterLinks:['fr4d'],
   competencies:['READ_EXPLICIT','READ_DOCUMENT_SOURCE','READ_CAUSE_CONSEQUENCE','READ_AUTHOR_INTENT','READ_ARGUMENT','READ_JUSTIFY','READ_MAIN_IDEA','READ_VOCAB_CONTEXT'],
   difficulty:4,estimatedReadingMinutes:3,audioMode:'audioAllowed',sessionSize:8,
   paragraphs:[
    'Depuis la rentrée de septembre, les élèves du collège Jean-Moulin trient et recyclent le papier de leurs salles de classe, dans le cadre d’un nouveau projet porté par le club environnement.',
    'Chaque salle dispose désormais d’un bac dédié au papier usagé, vidé chaque vendredi par des élèves volontaires du club.',
    '« En trois mois, nous avons déjà collecté plus de 200 kilogrammes de papier », explique Léna, élève de 4e et membre du club environnement.',
    'Le papier collecté est ensuite transformé en nouvelles feuilles par une entreprise locale de recyclage, avant de revenir au collège sous forme de cahiers de brouillon.',
    'Le principal du collège se félicite de cette initiative : « C’est un projet qui vient des élèves eux-mêmes, et c’est ce qui le rend si fort. »',
    'Le club environnement espère maintenant étendre le tri à d’autres matières comme le plastique et les piles usagées.'
   ],
   glossary:[{word:'initiative',definition:'Une action nouvelle que l’on décide de mettre en place soi-même.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_EXPLICIT'],difficulty:1,prompt:'Quel établissement est concerné par cet article ?',choices:['Le collège Jean-Moulin','L’école primaire Jean-Moulin','Le lycée Jean-Moulin'],ans:0,evidenceParagraph:0,explanation:'« Au collège Jean-Moulin... »'},
    {id:'q2',type:'choice',competencies:['READ_EXPLICIT'],difficulty:1,prompt:'Qui a mis en place ce projet de recyclage ?',choices:['Le club environnement des élèves','La mairie de la ville','Une entreprise privée'],ans:0,evidenceParagraph:0,explanation:'« ...un nouveau projet porté par le club environnement. »'},
    {id:'q3',type:'choice',competencies:['READ_DOCUMENT_SOURCE'],difficulty:3,prompt:'Dans cet article, qui est cité directement entre guillemets ?',choices:['Une élève (Léna) et le principal du collège','Seulement le principal','Seulement des chiffres officiels'],ans:0,evidenceParagraph:2,explanation:'Léna puis le principal sont cités chacun entre guillemets.'},
    {id:'q4',type:'choice',competencies:['READ_EXPLICIT'],difficulty:1,prompt:'Quelle quantité de papier a été collectée en trois mois ?',choices:['Plus de 200 kilogrammes','20 kilogrammes','2 tonnes'],ans:0,evidenceParagraph:2,explanation:'« ...nous avons déjà collecté plus de 200 kilogrammes de papier. »'},
    {id:'q5',type:'choice',competencies:['READ_CAUSE_CONSEQUENCE'],difficulty:4,prompt:'Que devient le papier collecté ?',choices:['Il est recyclé puis revient sous forme de cahiers de brouillon','Il est simplement jeté à la déchetterie','Il est vendu à d’autres écoles'],ans:0,evidenceParagraph:3,explanation:'« ...transformé en nouvelles feuilles... avant de revenir au collège sous forme de cahiers de brouillon. »'},
    {id:'q6',type:'choice',competencies:['READ_AUTHOR_INTENT'],difficulty:6,prompt:'Quel est le but principal de cet article ?',choices:['Informer sur une initiative écologique positive menée par des élèves','Dénoncer un problème de pollution au collège','Faire de la publicité pour une entreprise'],ans:0,explanation:'L’article présente un projet positif de façon informative.'},
    {id:'q7',type:'choice',competencies:['READ_VOCAB_CONTEXT'],difficulty:2,prompt:'Dans un article de presse, à quoi sert le « chapeau » (le texte juste après le titre) ?',choices:['À résumer rapidement l’information principale','À donner le nom du journaliste','À citer une source officielle'],ans:0,explanation:'Le chapeau est le court texte placé juste après le titre : il résume l’essentiel pour donner envie de lire la suite. Ici, le 1er paragraphe joue ce rôle (qui ? quoi ? depuis quand ?).'},
    {id:'q8',type:'choice',competencies:['READ_ARGUMENT'],difficulty:5,prompt:'Pourquoi le principal trouve-t-il ce projet particulièrement réussi ?',choices:['Parce qu’il vient directement des élèves eux-mêmes','Parce qu’il coûte très cher','Parce que c’est obligatoire dans tous les collèges'],ans:0,evidenceParagraph:4,explanation:'« C’est un projet qui vient des élèves eux-mêmes, et c’est ce qui le rend si fort. »'},
    {id:'q9',type:'evidence',competencies:['READ_JUSTIFY'],difficulty:4,prompt:'Quelle phrase montre que le projet pourrait encore s’agrandir à l’avenir ?',evidenceParagraph:5,explanation:'« Le club environnement espère maintenant étendre le tri à d’autres matières... »'},
    {id:'q10',type:'choice',competencies:['READ_MAIN_IDEA'],difficulty:4,prompt:'Quel titre résume le mieux cet article ?',choices:['Un collège recycle le papier de ses salles de classe grâce à ses élèves','Un collège interdit le papier','Une entreprise ferme à cause du recyclage'],ans:0,explanation:'C’est le sujet central de tout l’article.'}
   ]
  },

  fr_3e_misere_injustice_01:{
   id:'fr_3e_misere_injustice_01',level:'3e',subject:'francais',type:'literary_text',documentType:'récit social',
   title:'La soupe populaire',author:null,work:null,sourceType:'original_mathquest',
   teacherNotes:'À mettre en regard, pour la culture littéraire, avec Les Misérables de Victor Hugo ou L’Assommoir d’Émile Zola (tous deux dans le domaine public) : même ancrage XIXe siècle, mêmes thèmes de la misère et de l’indifférence sociale.',
   chapterLinks:['fr3b'],
   competencies:['READ_EXPLICIT','READ_CHARACTER','READ_INFERENCE','READ_AUTHOR_INTENT','READ_EMOTION_INTENTION','READ_VOCAB_CONTEXT','READ_MAIN_IDEA','READ_SEQUENCE','READ_JUSTIFY','READ_ARGUMENT'],
   difficulty:5,estimatedReadingMinutes:4,audioMode:'audioAllowed',sessionSize:9,
   paragraphs:[
    'En ce mois de janvier 1848, le froid s’abattait sur les quartiers pauvres de Paris avec une cruauté qui ne distinguait ni les vieillards ni les enfants.',
    'Devant la soupe populaire de la rue Saint-Antoine, une longue file silencieuse s’étirait depuis l’aube, des ombres emmitouflées dans des vêtements trop fins pour l’hiver.',
    'Parmi elles se trouvait Marguerite, une veuve de trente ans, serrant contre elle ses deux enfants affamés.',
    'Son mari, ouvrier dans une filature, était mort l’année précédente d’un accident que son patron n’avait jamais jugé utile de dédommager.',
    'Depuis, Marguerite cousait des journées entières pour un salaire qui ne suffisait jamais à nourrir trois bouches.',
    'Un homme bien habillé passa en calèche devant la file d’attente, sans même tourner la tête vers ces visages creusés par la faim.',
    'Marguerite ne lui en voulut pas : elle avait depuis longtemps cessé d’attendre quoi que ce soit de ceux qui ne connaissaient pas la faim.',
    'Quand vint enfin son tour, elle reçut deux bols de soupe tiède qu’elle tendit aussitôt à ses enfants, gardant pour elle-même le fond, à peine de quoi tromper son propre estomac.'
   ],
   glossary:[{word:'filature',definition:'Une usine où l’on fabrique du fil de coton ou de laine.'},{word:'emmitouflées',definition:'Habillées chaudement, enveloppées dans plusieurs vêtements.'},{word:'calèche',definition:'Une voiture ancienne tirée par des chevaux, utilisée par les gens riches.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_EXPLICIT'],difficulty:1,prompt:'Où se déroule cette scène ?',choices:['Devant une soupe populaire, rue Saint-Antoine','Dans une usine','Dans un palais'],ans:0,evidenceParagraph:1,explanation:'« Devant la soupe populaire de la rue Saint-Antoine... »'},
    {id:'q2',type:'choice',competencies:['READ_CHARACTER'],difficulty:1,prompt:'Qui est Marguerite ?',choices:['Une veuve pauvre avec deux enfants','Une riche propriétaire','La patronne de la filature'],ans:0,evidenceParagraph:2,explanation:'« ...une veuve de trente ans, serrant contre elle ses deux enfants. »'},
    {id:'q3',type:'choice',competencies:['READ_EXPLICIT'],difficulty:2,prompt:'Comment le mari de Marguerite est-il mort ?',choices:['Dans un accident à la filature où il travaillait','À la guerre','De maladie'],ans:0,evidenceParagraph:3,explanation:'« Son mari, ouvrier dans une filature, était mort... d’un accident... »'},
    {id:'q4',type:'choice',competencies:['READ_INFERENCE'],difficulty:5,prompt:'Que suggère « un accident que son patron n’avait jamais jugé utile de dédommager » ?',choices:['Que le patron n’a montré aucune responsabilité envers la famille','Que le patron a généreusement aidé la famille','Que l’accident n’était la faute de personne'],ans:0,evidenceParagraph:3,explanation:'Le patron n’a rien fait pour la veuve et ses enfants.'},
    {id:'q5',type:'choice',competencies:['READ_AUTHOR_INTENT'],difficulty:6,prompt:'Pourquoi le texte mentionne-t-il l’homme en calèche qui ne regarde pas la file d’attente ?',choices:['Pour souligner, par contraste, l’indifférence des plus riches envers les plus pauvres','Pour montrer que cet homme est pressé','Parce que ce personnage va aider Marguerite plus tard'],ans:0,evidenceParagraph:5,explanation:'Ce contraste riche/pauvre est un procédé classique du récit social.'},
    {id:'q6',type:'choice',competencies:['READ_EMOTION_INTENTION'],difficulty:5,prompt:'Quel sentiment Marguerite éprouve-t-elle envers l’homme en calèche ?',choices:['Une résignation sans colère, car elle n’attend plus rien des riches','Une haine violente','Une grande admiration'],ans:0,evidenceParagraph:6,explanation:'« ...elle avait depuis longtemps cessé d’attendre quoi que ce soit... »'},
    {id:'q7',type:'choice',competencies:['READ_INFERENCE'],difficulty:6,prompt:'Que montre le fait que Marguerite donne la soupe à ses enfants et garde seulement « le fond » pour elle ?',choices:['Qu’elle se sacrifie pour nourrir ses enfants avant elle-même','Qu’elle n’a pas très faim','Qu’elle n’aime pas la soupe'],ans:0,evidenceParagraph:7,explanation:'Elle se prive pour que ses enfants mangent davantage.'},
    {id:'q8',type:'choice',competencies:['READ_VOCAB_CONTEXT'],difficulty:2,prompt:'Dans le texte, une « calèche » est...',choices:['Une voiture ancienne tirée par des chevaux, pour les gens aisés','Un type de soupe','Un vêtement d’hiver'],ans:0,explanation:'Une calèche est une voiture ancienne tirée par des chevaux réservée aux gens aisés, ce qui souligne l’écart avec les pauvres de la soupe populaire.'},
    {id:'q9',type:'choice',competencies:['READ_MAIN_IDEA'],difficulty:6,prompt:'Quel est le thème principal de ce texte ?',choices:['La misère sociale et les inégalités au XIXe siècle','Un conte merveilleux','Une aventure en mer'],ans:0,explanation:'C’est l’idée générale de tout le texte.'},
    {id:'q10',type:'order',competencies:['READ_SEQUENCE'],difficulty:3,prompt:'Remets les événements dans l’ordre.',tokens:['Marguerite fait la queue avec ses enfants','Un homme riche passe sans les regarder','Marguerite reçoit deux bols de soupe','Elle donne la soupe à ses enfants'],ans:'Marguerite fait la queue avec ses enfants Un homme riche passe sans les regarder Marguerite reçoit deux bols de soupe Elle donne la soupe à ses enfants',explanation:'C’est l’ordre exact du récit.'},
    {id:'q11',type:'evidence',competencies:['READ_JUSTIFY'],difficulty:6,prompt:'Quelle phrase montre concrètement la pauvreté de la famille de Marguerite ?',evidenceParagraph:4,explanation:'« ...cousait des journées entières pour un salaire qui ne suffisait jamais à nourrir trois bouches. »'},
    {id:'q12',type:'choice',competencies:['READ_ARGUMENT'],difficulty:7,prompt:'Pour dénoncer les inégalités sociales, quel argument peut-on tirer de l’épisode de la calèche ?',choices:['L’indifférence des plus riches aggrave la détresse des plus pauvres, qu’ils ne voient même plus','Les gens riches travaillent plus dur que les gens pauvres','Il faudrait interdire les calèches en ville'],ans:0,explanation:'Le texte met en scène cette indifférence comme un rouage de l’injustice sociale.'}
   ]
  },

  // ===== Lot 2 (18/10/2026) : un 2e support pour chaque niveau, en variant les genres (documentaire,
  // fable, poésie) et en couvrant de nouveaux chapitres. Les fables de La Fontaine (mort en 1695) et le
  // poème de Victor Hugo (mort en 1885) sont cités dans leur texte original, du domaine public.

  fr_cp_ballon_01:{
   id:'fr_cp_ballon_01',level:'CP',subject:'francais',type:'literary_text',documentType:'récit',
   title:'Le ballon de Tom',author:null,work:null,sourceType:'original_mathquest',
   chapterLinks:['cp-fr-comprendre'],
   competencies:['READ_EXPLICIT','READ_CHARACTER','READ_EMOTION_INTENTION','READ_SEQUENCE'],
   difficulty:1,estimatedReadingMinutes:1,audioMode:'audioRecommended',sessionSize:5,
   paragraphs:[
    'Tom a un ballon rouge.',
    'Le vent souffle fort.',
    'Le ballon s’envole dans le ciel.',
    'Tom est triste.',
    'Papa lui donne un ballon bleu. Tom sourit.'
   ],
   glossary:[{word:'souffle',definition:'Quand le vent souffle, l’air bouge et pousse les choses.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_EXPLICIT'],difficulty:1,prompt:'De quelle couleur est le premier ballon de Tom ?',choices:['Rouge','Bleu','Vert'],ans:0,evidenceParagraph:0,explanation:'La 1ʳᵉ phrase dit : « Tom a un ballon rouge. »'},
    {id:'q2',type:'choice',competencies:['READ_CAUSE_CONSEQUENCE'],difficulty:2,prompt:'Pourquoi le ballon s’envole-t-il ?',choices:['Parce que le vent souffle fort','Parce que Tom le lance','Parce qu’un oiseau l’emporte'],ans:0,evidenceParagraph:1,explanation:'Juste avant, le texte dit : « Le vent souffle fort. »'},
    {id:'q3',type:'choice',competencies:['READ_EMOTION_INTENTION'],difficulty:1,prompt:'Comment se sent Tom quand son ballon s’envole ?',choices:['Triste','Content','Fâché contre Papa'],ans:0,evidenceParagraph:3,explanation:'Le texte dit : « Tom est triste. »'},
    {id:'q4',type:'text',strict:true,acc:['Papa','papa','son papa','Son papa'],competencies:['READ_CHARACTER'],difficulty:1,prompt:'Qui donne un autre ballon à Tom ?',evidenceParagraph:4,explanation:'« Papa lui donne un ballon bleu. »'},
    {id:'q5',type:'choice',competencies:['READ_EXPLICIT'],difficulty:1,prompt:'Vrai ou faux : à la fin, Tom sourit.',choices:['Vrai','Faux'],ans:0,evidenceParagraph:4,explanation:'La dernière phrase dit : « Tom sourit. »'},
    {id:'q6',type:'order',competencies:['READ_SEQUENCE'],difficulty:2,prompt:'Remets l’histoire dans l’ordre.',tokens:['Le ballon s’envole','Tom est triste','Papa donne un ballon bleu'],ans:'Le ballon s’envole Tom est triste Papa donne un ballon bleu',explanation:'C’est l’ordre du texte.'},
    {id:'q7',type:'evidence',competencies:['READ_JUSTIFY','READ_EMOTION_INTENTION'],difficulty:2,prompt:'Quelle phrase montre que Tom n’est plus triste à la fin ?',evidenceParagraph:4,explanation:'« Tom sourit » : il est de nouveau content.'}
   ]
  },

  fr_ce1_escargot_doc_01:{
   id:'fr_ce1_escargot_doc_01',level:'CE1',subject:'francais',type:'document',documentType:'texte documentaire',
   title:'L’escargot',author:null,work:null,sourceType:'original_mathquest',
   chapterLinks:['ce1-fr-comprendre'],
   competencies:['READ_EXPLICIT','READ_VOCAB_CONTEXT','READ_CAUSE_CONSEQUENCE','READ_MAIN_IDEA','READ_JUSTIFY'],
   difficulty:2,estimatedReadingMinutes:2,audioMode:'audioRecommended',sessionSize:7,
   paragraphs:[
    'L’escargot est un petit animal au corps mou. Il porte sur son dos une coquille qui le protège.',
    'Sur sa tête, il a quatre tentacules. Les deux plus grandes ont des yeux au bout.',
    'L’escargot avance très lentement. Il glisse sur un liquide gluant appelé la bave.',
    'Il mange surtout des feuilles et des salades. C’est pour cela que les jardiniers ne l’aiment pas beaucoup !',
    'Quand il fait trop sec, l’escargot rentre dans sa coquille et ferme l’entrée. Il attend la pluie pour ressortir.'
   ],
   glossary:[{word:'coquille',definition:'Une maison dure que l’escargot porte sur son dos.'},{word:'tentacules',definition:'Des sortes de petites cornes molles sur la tête.'},{word:'gluant',definition:'Qui colle aux doigts.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_MAIN_IDEA'],difficulty:2,prompt:'De quoi parle ce texte ?',choices:['De l’escargot et de sa vie','D’un jardinier','D’une histoire de pluie'],ans:0,explanation:'Chaque paragraphe donne une information sur l’escargot : c’est un texte documentaire.'},
    {id:'q2',type:'choice',competencies:['READ_EXPLICIT'],difficulty:1,prompt:'À quoi sert la coquille de l’escargot ?',choices:['À le protéger','À manger','À nager'],ans:0,evidenceParagraph:0,explanation:'« ...une coquille qui le protège. »'},
    {id:'q3',type:'text',strict:true,acc:['4','quatre'],competencies:['READ_EXPLICIT'],difficulty:1,prompt:'Combien de tentacules l’escargot a-t-il sur la tête ? (écris le nombre)',evidenceParagraph:1,explanation:'« Sur sa tête, il a quatre tentacules. »'},
    {id:'q4',type:'choice',competencies:['READ_EXPLICIT'],difficulty:2,prompt:'Où sont les yeux de l’escargot ?',choices:['Au bout des deux grandes tentacules','Sur sa coquille','Sous son corps'],ans:0,evidenceParagraph:1,explanation:'« Les deux plus grandes ont des yeux au bout. »'},
    {id:'q5',type:'choice',competencies:['READ_VOCAB_CONTEXT'],difficulty:2,prompt:'Dans le texte, la « bave » est...',choices:['Un liquide gluant sur lequel il glisse','Sa nourriture préférée','Le nom de sa maison'],ans:0,evidenceParagraph:2,explanation:'« ...un liquide gluant appelé la bave. »'},
    {id:'q6',type:'choice',competencies:['READ_CAUSE_CONSEQUENCE'],difficulty:3,prompt:'Pourquoi les jardiniers n’aiment-ils pas beaucoup l’escargot ?',choices:['Parce qu’il mange leurs feuilles et leurs salades','Parce qu’il fait du bruit','Parce qu’il pique'],ans:0,evidenceParagraph:3,explanation:'« C’est pour cela » renvoie à la phrase d’avant : il mange les salades.'},
    {id:'q7',type:'choice',competencies:['READ_EXPLICIT'],difficulty:2,prompt:'Que fait l’escargot quand il fait trop sec ?',choices:['Il rentre dans sa coquille et attend la pluie','Il court se cacher sous l’eau','Il change de coquille'],ans:0,evidenceParagraph:4,explanation:'« ...l’escargot rentre dans sa coquille et ferme l’entrée. »'},
    {id:'q8',type:'evidence',competencies:['READ_JUSTIFY'],difficulty:2,prompt:'Quel paragraphe dit que l’escargot n’est pas rapide ?',evidenceParagraph:2,explanation:'« L’escargot avance très lentement. »'}
   ]
  },

  fr_ce2_herisson_doc_01:{
   id:'fr_ce2_herisson_doc_01',level:'CE2',subject:'francais',type:'document',documentType:'texte documentaire',
   title:'Le hérisson, un ami du jardin',author:null,work:null,sourceType:'original_mathquest',
   chapterLinks:['ce2-fr-comprendre'],
   competencies:['READ_EXPLICIT','READ_VOCAB_CONTEXT','READ_CAUSE_CONSEQUENCE','READ_MAIN_IDEA','READ_INFERENCE','READ_JUSTIFY','READ_STRUCTURE'],
   difficulty:3,estimatedReadingMinutes:3,audioMode:'audioAllowed',sessionSize:7,
   paragraphs:[
    'Le hérisson est un petit mammifère qui vit dans les haies, les bois et les jardins. Son dos est couvert de milliers de piquants.',
    'Quand il a peur, il se roule en boule. Ses piquants se dressent et le protègent des renards ou des chiens.',
    'Le hérisson est un animal nocturne : il dort le jour et part chercher sa nourriture la nuit. Il mange des limaces, des vers et des insectes.',
    'En hiver, la nourriture devient rare. Le hérisson se fabrique alors un nid de feuilles et hiberne jusqu’au printemps.',
    'Les jardiniers aiment le hérisson, car il les débarrasse des limaces qui abîment les légumes.'
   ],
   glossary:[{word:'mammifère',definition:'Un animal dont la maman nourrit ses petits avec son lait.'},{word:'nocturne',definition:'Qui vit surtout la nuit.'},{word:'hiberne',definition:'Dort pendant tout l’hiver sans presque bouger.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_MAIN_IDEA','READ_STRUCTURE'],difficulty:3,prompt:'Ce texte est...',choices:['Un texte documentaire qui informe sur un animal','Un conte avec un héros','Une recette'],ans:0,explanation:'Il donne des informations vraies sur le hérisson, sans histoire ni personnage.'},
    {id:'q2',type:'choice',competencies:['READ_EXPLICIT'],difficulty:1,prompt:'Que fait le hérisson quand il a peur ?',choices:['Il se roule en boule','Il court très vite','Il grimpe dans un arbre'],ans:0,evidenceParagraph:1,explanation:'« Quand il a peur, il se roule en boule. »'},
    {id:'q3',type:'choice',competencies:['READ_VOCAB_CONTEXT'],difficulty:3,prompt:'Le hérisson est « nocturne ». Cela veut dire que...',choices:['Il cherche sa nourriture la nuit','Il ne dort jamais','Il vit sous l’eau'],ans:0,evidenceParagraph:2,explanation:'Le texte l’explique juste après les deux-points : « il dort le jour et part chercher sa nourriture la nuit ».'},
    {id:'q4',type:'text',strict:false,acc:['des limaces','limaces','les limaces'],competencies:['READ_EXPLICIT'],difficulty:2,prompt:'Cite un animal que mange le hérisson.',evidenceParagraph:2,explanation:'Il mange « des limaces, des vers et des insectes ». (Le texte accepte ici la réponse « limaces ».)'},
    {id:'q5',type:'choice',competencies:['READ_CAUSE_CONSEQUENCE'],difficulty:4,prompt:'Pourquoi le hérisson hiberne-t-il ?',choices:['Parce qu’en hiver la nourriture devient rare','Parce qu’il a peur de la neige','Parce que les jardiniers le chassent'],ans:0,evidenceParagraph:3,explanation:'« En hiver, la nourriture devient rare. » Dormir lui permet de passer l’hiver sans manger.'},
    {id:'q6',type:'choice',competencies:['READ_INFERENCE'],difficulty:4,prompt:'Pourquoi un jardinier a-t-il intérêt à laisser un hérisson dans son jardin ?',choices:['Parce que le hérisson protège ses légumes en mangeant les limaces','Parce que le hérisson arrose les plantes','Parce que le hérisson fait fuir les oiseaux'],ans:0,evidenceParagraph:4,explanation:'Les limaces abîment les légumes ; le hérisson les mange.'},
    {id:'q7',type:'evidence',competencies:['READ_JUSTIFY'],difficulty:3,prompt:'Quel paragraphe explique comment le hérisson se défend ?',evidenceParagraph:1,explanation:'Le 2ᵉ paragraphe : ses piquants se dressent et le protègent.'},
    {id:'q8',type:'choice',competencies:['READ_EXPLICIT'],difficulty:2,prompt:'Avec quoi le hérisson fabrique-t-il son nid d’hiver ?',choices:['Des feuilles','De la terre et de l’eau','Des plumes'],ans:0,evidenceParagraph:3,explanation:'« ...se fabrique alors un nid de feuilles... »'}
   ]
  },

  fr_cm1_abeilles_doc_01:{
   id:'fr_cm1_abeilles_doc_01',level:'CM1',subject:'francais',type:'document',documentType:'texte documentaire',
   title:'La vie des abeilles',author:null,work:null,sourceType:'original_mathquest',
   chapterLinks:['cm1-fr-documentaire'],
   competencies:['READ_EXPLICIT','READ_VOCAB_CONTEXT','READ_CAUSE_CONSEQUENCE','READ_MAIN_IDEA','READ_STRUCTURE','READ_JUSTIFY','READ_INFERENCE'],
   difficulty:4,estimatedReadingMinutes:3,audioMode:'audioAllowed',sessionSize:8,
   paragraphs:[
    'Les abeilles vivent en colonies de plusieurs dizaines de milliers d’individus, dans une ruche. Chaque abeille y a un rôle précis.',
    'La reine est la seule à pondre des œufs : jusqu’à 2 000 par jour au printemps. Les mâles, appelés faux bourdons, servent uniquement à la reproduction.',
    'Les ouvrières font tout le reste : elles nettoient la ruche, nourrissent les larves, fabriquent la cire et partent butiner les fleurs.',
    'En butinant, l’abeille récolte le nectar, un liquide sucré qu’elle transforme en miel. Elle transporte aussi du pollen d’une fleur à l’autre, ce qui permet aux plantes de produire des fruits.',
    'Aujourd’hui, les abeilles sont menacées par certains pesticides, par des maladies et par la disparition des fleurs sauvages. Or, sans elles, beaucoup de fruits et de légumes deviendraient rares.'
   ],
   glossary:[{word:'colonies',definition:'Groupes d’animaux de la même espèce qui vivent ensemble.'},{word:'butiner',definition:'Aller de fleur en fleur pour récolter le nectar et le pollen.'},{word:'pesticides',definition:'Produits chimiques utilisés pour tuer les insectes ou les plantes jugés nuisibles.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_MAIN_IDEA'],difficulty:3,prompt:'Quelle est l’idée principale du texte ?',choices:['Les abeilles vivent en société organisée et sont utiles aux plantes','Le miel est bon pour la santé','Les faux bourdons sont dangereux'],ans:0,explanation:'Le texte décrit l’organisation de la ruche puis le rôle des abeilles pour les plantes.'},
    {id:'q2',type:'choice',competencies:['READ_EXPLICIT'],difficulty:2,prompt:'Qui pond les œufs dans la ruche ?',choices:['La reine','Les ouvrières','Les faux bourdons'],ans:0,evidenceParagraph:1,explanation:'« La reine est la seule à pondre des œufs. »'},
    {id:'q3',type:'choice',competencies:['READ_EXPLICIT'],difficulty:2,prompt:'Laquelle de ces tâches n’est PAS faite par les ouvrières ?',choices:['Pondre des œufs','Nettoyer la ruche','Fabriquer la cire'],ans:0,evidenceParagraph:2,explanation:'Pondre est le rôle de la reine ; les ouvrières font « tout le reste ».'},
    {id:'q4',type:'choice',competencies:['READ_VOCAB_CONTEXT'],difficulty:3,prompt:'Le « nectar » est...',choices:['Un liquide sucré que l’abeille transforme en miel','Une poudre jaune','Le nom de la reine'],ans:0,evidenceParagraph:3,explanation:'Le texte le définit : « le nectar, un liquide sucré qu’elle transforme en miel ».'},
    {id:'q5',type:'choice',competencies:['READ_CAUSE_CONSEQUENCE'],difficulty:4,prompt:'Grâce au pollen transporté par les abeilles, les plantes peuvent...',choices:['Produire des fruits','Pousser sans eau','Changer de couleur'],ans:0,evidenceParagraph:3,explanation:'« ...ce qui permet aux plantes de produire des fruits. »'},
    {id:'q6',type:'order',competencies:['READ_STRUCTURE'],difficulty:4,prompt:'Remets les sujets des paragraphes dans l’ordre du texte.',tokens:['la ruche','la reine et les mâles','les ouvrières','le butinage','les menaces'],ans:'la ruche la reine et les mâles les ouvrières le butinage les menaces',explanation:'Le texte part de la ruche, présente chaque rôle, puis le butinage et enfin les dangers.'},
    {id:'q7',type:'evidence',competencies:['READ_JUSTIFY'],difficulty:4,prompt:'Quel paragraphe explique pourquoi la disparition des abeilles serait grave pour nous ?',evidenceParagraph:4,explanation:'« ...sans elles, beaucoup de fruits et de légumes deviendraient rares. »'},
    {id:'q8',type:'choice',competencies:['READ_INFERENCE'],difficulty:5,prompt:'Que pourrait-on faire pour aider les abeilles, d’après le texte ?',choices:['Planter des fleurs sauvages et éviter certains pesticides','Construire des ruches sans reine','Manger moins de miel'],ans:0,evidenceParagraph:4,explanation:'Le texte cite les pesticides et la disparition des fleurs sauvages parmi les menaces : on peut agir sur ces deux points.'},
    {id:'q9',type:'text',strict:false,acc:['faux bourdons','les faux bourdons','faux-bourdons','des faux bourdons'],competencies:['READ_EXPLICIT','READ_VOCAB_CONTEXT'],difficulty:3,prompt:'Comment appelle-t-on les abeilles mâles ?',evidenceParagraph:1,explanation:'« Les mâles, appelés faux bourdons... »'}
   ]
  },

  fr_cm1_corbeau_renard_01:{
   id:'fr_cm1_corbeau_renard_01',level:'CM1',subject:'francais',type:'literary_text',documentType:'fable',
   title:'Le Corbeau et le Renard',author:'Jean de La Fontaine',work:'Fables, livre I (1668)',
   sourceType:'public_domain',sourceReference:'Texte original de La Fontaine (mort en 1695), dans le domaine public.',
   chapterLinks:['cm1-fr-litterature'],verse:true,
   competencies:['READ_CHARACTER','READ_EXPLICIT','READ_VOCAB_CONTEXT','READ_INFERENCE','READ_EMOTION_INTENTION','READ_AUTHOR_INTENT','READ_JUSTIFY','READ_GENRE'],
   difficulty:4,estimatedReadingMinutes:3,audioMode:'audioRecommended',sessionSize:8,
   paragraphs:[
    'Maître Corbeau, sur un arbre perché,',
    'Tenait en son bec un fromage.',
    'Maître Renard, par l’odeur alléché,',
    'Lui tint à peu près ce langage :',
    '« Hé ! bonjour, Monsieur du Corbeau.',
    'Que vous êtes joli ! que vous me semblez beau !',
    'Sans mentir, si votre ramage',
    'Se rapporte à votre plumage,',
    'Vous êtes le Phénix des hôtes de ces bois. »',
    'À ces mots le Corbeau ne se sent pas de joie ;',
    'Et pour montrer sa belle voix,',
    'Il ouvre un large bec, laisse tomber sa proie.',
    'Le Renard s’en saisit, et dit : « Mon bon Monsieur,',
    'Apprenez que tout flatteur',
    'Vit aux dépens de celui qui l’écoute :',
    'Cette leçon vaut bien un fromage, sans doute. »',
    'Le Corbeau, honteux et confus,',
    'Jura, mais un peu tard, qu’on ne l’y prendrait plus.'
   ],
   glossary:[{word:'alléché',definition:'Attiré par quelque chose d’appétissant.'},{word:'ramage',definition:'Le chant d’un oiseau.'},{word:'plumage',definition:'L’ensemble des plumes d’un oiseau.'},{word:'Phénix',definition:'Oiseau merveilleux des légendes ; ici : le plus admirable de tous.'},{word:'flatteur',definition:'Quelqu’un qui fait des compliments exagérés pour obtenir quelque chose.'},{word:'confus',definition:'Gêné, embarrassé.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_GENRE'],difficulty:3,prompt:'Ce texte est...',choices:['Une fable en vers','Un article de journal','Une recette'],ans:0,explanation:'C’est une fable de La Fontaine : un court récit en vers, avec des animaux, qui donne une leçon (la morale).'},
    {id:'q2',type:'choice',competencies:['READ_EXPLICIT'],difficulty:1,prompt:'Que tient le Corbeau dans son bec ?',choices:['Un fromage','Un ver','Une noix'],ans:0,evidenceParagraph:1,explanation:'« Tenait en son bec un fromage. »'},
    {id:'q3',type:'choice',competencies:['READ_EMOTION_INTENTION','READ_INFERENCE'],difficulty:4,prompt:'Pourquoi le Renard fait-il des compliments au Corbeau ?',choices:['Pour lui faire ouvrir le bec et prendre le fromage','Parce qu’il veut devenir son ami','Parce qu’il aime vraiment son chant'],ans:0,evidenceParagraph:2,explanation:'Il est « par l’odeur alléché » : il veut le fromage, pas l’amitié du Corbeau.'},
    {id:'q4',type:'choice',competencies:['READ_VOCAB_CONTEXT'],difficulty:4,prompt:'« Si votre ramage se rapporte à votre plumage » veut dire :',choices:['Si votre chant est aussi beau que vos plumes','Si vous chantez en volant','Si vos plumes sont mouillées'],ans:0,evidenceParagraph:6,explanation:'Ramage = chant ; plumage = plumes. Le Renard compare les deux pour pousser le Corbeau à chanter.'},
    {id:'q5',type:'choice',competencies:['READ_CAUSE_CONSEQUENCE'],difficulty:3,prompt:'Pourquoi le Corbeau laisse-t-il tomber le fromage ?',choices:['Il ouvre le bec pour montrer sa belle voix','Le Renard le fait tomber de l’arbre','Il n’aime pas le fromage'],ans:0,evidenceParagraph:11,explanation:'« Et pour montrer sa belle voix, / Il ouvre un large bec, laisse tomber sa proie. »'},
    {id:'q6',type:'evidence',competencies:['READ_JUSTIFY','READ_AUTHOR_INTENT'],difficulty:5,prompt:'Clique sur le vers qui commence la morale de la fable.',evidenceParagraph:13,explanation:'« Apprenez que tout flatteur / Vit aux dépens de celui qui l’écoute » : c’est la leçon.'},
    {id:'q7',type:'choice',competencies:['READ_AUTHOR_INTENT'],difficulty:5,prompt:'Quelle est la leçon de cette fable ?',choices:['Il faut se méfier de ceux qui nous flattent','Il faut toujours partager sa nourriture','Les renards sont plus forts que les corbeaux'],ans:0,evidenceParagraph:14,explanation:'Le flatteur profite (« vit aux dépens ») de celui qui croit ses compliments.'},
    {id:'q8',type:'choice',competencies:['READ_EMOTION_INTENTION'],difficulty:3,prompt:'Comment se sent le Corbeau à la fin ?',choices:['Honteux','Fier','Joyeux'],ans:0,evidenceParagraph:16,explanation:'« Le Corbeau, honteux et confus... »'},
    {id:'q9',type:'order',competencies:['READ_SEQUENCE'],difficulty:3,prompt:'Remets les étapes de la fable dans l’ordre.',tokens:['Le Renard flatte le Corbeau','Le Corbeau ouvre le bec','Le Renard prend le fromage','Le Corbeau a honte'],ans:'Le Renard flatte le Corbeau Le Corbeau ouvre le bec Le Renard prend le fromage Le Corbeau a honte',explanation:'C’est l’ordre du récit.'}
   ]
  },

  fr_cm2_cigale_fourmi_01:{
   id:'fr_cm2_cigale_fourmi_01',level:'CM2',subject:'francais',type:'literary_text',documentType:'fable',
   title:'La Cigale et la Fourmi',author:'Jean de La Fontaine',work:'Fables, livre I (1668)',
   sourceType:'public_domain',sourceReference:'Texte original de La Fontaine (mort en 1695), dans le domaine public.',
   chapterLinks:['cm2-fr-litterature'],verse:true,
   competencies:['READ_CHARACTER','READ_EXPLICIT','READ_VOCAB_CONTEXT','READ_INFERENCE','READ_EMOTION_INTENTION','READ_AUTHOR_INTENT','READ_JUSTIFY','READ_TIME'],
   difficulty:5,estimatedReadingMinutes:3,audioMode:'audioRecommended',sessionSize:8,
   paragraphs:[
    'La Cigale, ayant chanté',
    'Tout l’été,',
    'Se trouva fort dépourvue',
    'Quand la bise fut venue :',
    'Pas un seul petit morceau',
    'De mouche ou de vermisseau.',
    'Elle alla crier famine',
    'Chez la Fourmi sa voisine,',
    'La priant de lui prêter',
    'Quelque grain pour subsister',
    'Jusqu’à la saison nouvelle.',
    '« Je vous paierai, lui dit-elle,',
    'Avant l’Oût, foi d’animal,',
    'Intérêt et principal. »',
    'La Fourmi n’est pas prêteuse :',
    'C’est là son moindre défaut.',
    '« Que faisiez-vous au temps chaud ?',
    'Dit-elle à cette emprunteuse.',
    '— Nuit et jour à tout venant',
    'Je chantais, ne vous déplaise.',
    '— Vous chantiez ? j’en suis fort aise.',
    'Eh bien ! dansez maintenant. »'
   ],
   glossary:[{word:'dépourvue',definition:'Qui n’a plus rien, privée du nécessaire.'},{word:'bise',definition:'Vent froid du nord ; ici, l’hiver.'},{word:'vermisseau',definition:'Petit ver.'},{word:'subsister',definition:'Survivre, continuer à vivre.'},{word:'Oût',definition:'Ancienne orthographe d’« août » : le mois de la moisson.'},{word:'aise',definition:'Content (ici, dit avec ironie).'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_EXPLICIT'],difficulty:2,prompt:'Qu’a fait la Cigale pendant tout l’été ?',choices:['Elle a chanté','Elle a fait des réserves','Elle a dormi'],ans:0,evidenceParagraph:0,explanation:'« La Cigale, ayant chanté / Tout l’été... »'},
    {id:'q2',type:'choice',competencies:['READ_TIME','READ_VOCAB_CONTEXT'],difficulty:4,prompt:'« Quand la bise fut venue » : à quel moment de l’année sommes-nous ?',choices:['En hiver','Au printemps','En plein été'],ans:0,evidenceParagraph:3,explanation:'La bise est un vent froid : l’hiver est arrivé.'},
    {id:'q3',type:'choice',competencies:['READ_EXPLICIT'],difficulty:2,prompt:'Que demande la Cigale à la Fourmi ?',choices:['De lui prêter un peu de grain','De lui apprendre à chanter','De l’héberger pour l’été'],ans:0,evidenceParagraph:8,explanation:'« La priant de lui prêter / Quelque grain pour subsister. »'},
    {id:'q4',type:'choice',competencies:['READ_CHARACTER'],difficulty:4,prompt:'« La Fourmi n’est pas prêteuse : / C’est là son moindre défaut. » Que nous apprend ce vers sur la Fourmi ?',choices:['Elle n’aime pas prêter, et elle a sans doute d’autres défauts','Elle est très généreuse','Elle n’a aucun défaut'],ans:0,evidenceParagraph:15,explanation:'« Son moindre défaut » = son plus petit défaut : le fabuliste laisse entendre qu’elle en a d’autres.'},
    {id:'q5',type:'choice',competencies:['READ_EMOTION_INTENTION','READ_INFERENCE'],difficulty:6,prompt:'« Vous chantiez ? j’en suis fort aise. / Eh bien ! dansez maintenant. » Sur quel ton la Fourmi répond-elle ?',choices:['Moqueur : elle refuse d’aider la Cigale','Joyeux : elle invite la Cigale à danser','Triste : elle regrette de ne pas pouvoir aider'],ans:0,evidenceParagraph:21,explanation:'C’est de l’ironie : « dansez maintenant » veut dire « débrouillez-vous », elle ne prêtera rien.'},
    {id:'q6',type:'evidence',competencies:['READ_JUSTIFY'],difficulty:4,prompt:'Clique sur le vers qui montre que la Cigale n’a plus rien à manger.',evidenceParagraph:4,explanation:'« Pas un seul petit morceau / De mouche ou de vermisseau. »'},
    {id:'q7',type:'choice',competencies:['READ_AUTHOR_INTENT'],difficulty:6,prompt:'Quelle leçon peut-on tirer de cette fable ?',choices:['Il faut penser à l’avenir et prévoir','Il ne faut jamais chanter','Il faut toujours prêter ce qu’on a'],ans:0,explanation:'La Cigale n’a pas prévu l’hiver. La fable invite à prévoir — tout en montrant une Fourmi peu sympathique : la morale n’est pas dite, le lecteur la devine.'},
    {id:'q8',type:'text',strict:false,acc:['la Fourmi','Fourmi','la fourmi','fourmi'],competencies:['READ_CHARACTER'],difficulty:2,prompt:'Chez qui la Cigale va-t-elle demander de l’aide ?',evidenceParagraph:7,explanation:'« Chez la Fourmi sa voisine. »'}
   ]
  },

  fr_6e_lettre_cachee_01:{
   id:'fr_6e_lettre_cachee_01',level:'6e',subject:'francais',type:'literary_text',documentType:'récit',
   title:'La lettre sous le paillasson',author:null,work:null,sourceType:'original_mathquest',
   chapterLinks:['fr6b'],
   competencies:['READ_INFERENCE','READ_EXPLICIT','READ_EMOTION_INTENTION','READ_REFERENCE','READ_CHARACTER','READ_JUSTIFY','READ_CAUSE_CONSEQUENCE'],
   difficulty:5,estimatedReadingMinutes:3,audioMode:'audioAllowed',sessionSize:8,
   paragraphs:[
    'Ce matin-là, Inès trouva une enveloppe glissée sous le paillasson. Il n’y avait ni timbre ni adresse, seulement son prénom écrit à l’encre verte.',
    'Elle reconnut aussitôt cette écriture penchée : c’était la même que sur la carte d’anniversaire qu’elle avait reçue en mars, signée « ton voisin du dessus ».',
    'À l’intérieur, un seul mot : « Merci ». Et, collé au papier, un petit trèfle à quatre feuilles.',
    'Inès repensa à la semaine précédente. Elle avait monté les courses de M. Ferrand, qui marchait avec une canne depuis sa chute dans l’escalier.',
    'Elle sourit, rangea le trèfle dans son agenda et monta d’un étage. Cette fois, c’est elle qui sonna.'
   ],
   glossary:[{word:'paillasson',definition:'Petit tapis devant une porte pour s’essuyer les pieds.'},{word:'agenda',definition:'Carnet où l’on note ses rendez-vous et ses devoirs.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_INFERENCE'],difficulty:5,prompt:'Qui a très probablement déposé l’enveloppe ?',choices:['M. Ferrand, le voisin du dessus','La factrice','Une camarade de classe d’Inès'],ans:0,explanation:'Rien n’est dit directement, mais plusieurs indices convergent : l’écriture du « voisin du dessus », l’aide aux courses, et Inès qui monte d’un étage.'},
    {id:'q2',type:'evidence',competencies:['READ_JUSTIFY','READ_INFERENCE'],difficulty:5,prompt:'Quel paragraphe contient l’indice qui permet de reconnaître l’auteur de la lettre ?',evidenceParagraph:1,explanation:'L’écriture penchée est la même que sur la carte signée « ton voisin du dessus ».'},
    {id:'q3',type:'choice',competencies:['READ_EXPLICIT'],difficulty:2,prompt:'Qu’y a-t-il dans l’enveloppe ?',choices:['Le mot « Merci » et un trèfle à quatre feuilles','Une carte d’anniversaire','Une invitation'],ans:0,evidenceParagraph:2,explanation:'« ...un seul mot : “Merci”. Et [...] un petit trèfle à quatre feuilles. »'},
    {id:'q4',type:'choice',competencies:['READ_CAUSE_CONSEQUENCE','READ_INFERENCE'],difficulty:5,prompt:'Pourquoi M. Ferrand remercie-t-il Inès ?',choices:['Parce qu’elle a monté ses courses','Parce qu’elle lui a offert un trèfle','Parce qu’elle lui a souhaité son anniversaire'],ans:0,evidenceParagraph:3,explanation:'Inès « repensa » à ce qu’elle avait fait : elle l’avait aidé à monter ses courses.'},
    {id:'q5',type:'choice',competencies:['READ_INFERENCE'],difficulty:6,prompt:'Pourquoi M. Ferrand n’a-t-il sans doute pas sonné chez Inès pour la remercier ?',choices:['Il est peut-être timide ou se déplace difficilement','Il est fâché contre elle','Il ne connaît pas son prénom'],ans:0,evidenceParagraph:3,explanation:'Il marche avec une canne ; le texte ne dit rien de plus — c’est une hypothèse raisonnable. Il connaît son prénom (il l’a écrit), donc la 3ᵉ réponse est fausse.'},
    {id:'q6',type:'choice',competencies:['READ_EMOTION_INTENTION'],difficulty:4,prompt:'Que ressent Inès en lisant le message ?',choices:['De la joie et de la tendresse','De la peur','De la colère'],ans:0,evidenceParagraph:4,explanation:'« Elle sourit » et garde précieusement le trèfle.'},
    {id:'q7',type:'choice',competencies:['READ_INFERENCE','READ_EMOTION_INTENTION'],difficulty:6,prompt:'« Cette fois, c’est elle qui sonna. » Que va probablement faire Inès ?',choices:['Rendre visite à M. Ferrand pour le remercier à son tour','Rendre l’enveloppe à la factrice','Se plaindre du bruit'],ans:0,evidenceParagraph:4,explanation:'Elle monte « d’un étage » (chez le voisin du dessus) : elle répond à sa gentillesse.'},
    {id:'q8',type:'choice',competencies:['READ_REFERENCE'],difficulty:3,prompt:'Dans « Elle reconnut aussitôt cette écriture », qui est « Elle » ?',choices:['Inès','L’enveloppe','La carte d’anniversaire'],ans:0,evidenceParagraph:1,explanation:'Le pronom « Elle » reprend Inès, le personnage qui trouve la lettre.'}
   ]
  },

  fr_6e_chouette_doc_01:{
   id:'fr_6e_chouette_doc_01',level:'6e',subject:'francais',type:'document',documentType:'document informatif avec source',
   title:'Une affiche pour protéger les chouettes',author:null,work:null,sourceType:'original_mathquest',
   chapterLinks:['fr6c'],
   competencies:['READ_DOCUMENT_SOURCE','READ_EXPLICIT','READ_MAIN_IDEA','READ_AUTHOR_INTENT','READ_STRUCTURE','READ_JUSTIFY','READ_INFERENCE'],
   difficulty:5,estimatedReadingMinutes:3,audioMode:'audioAllowed',sessionSize:8,
   paragraphs:[
    'TITRE — « La nuit, ralentissez : les chouettes traversent ! »',
    'TEXTE — Chaque année, de nombreuses chouettes sont percutées par des voitures. Elles chassent les souris au bord des routes, où l’herbe est rase, et volent très bas.',
    'CONSEIL — Entre la tombée de la nuit et l’aube, roulez moins vite près des champs et des bois.',
    'IMAGE — Une chouette blanche, ailes ouvertes, éclairée par les phares d’une voiture.',
    'SOURCE — Affiche réalisée par une association de protection des oiseaux d’un parc naturel régional, distribuée dans les mairies (document fictif créé pour MathQuest).'
   ],
   glossary:[{word:'percutées',definition:'Heurtées violemment.'},{word:'aube',definition:'Le tout début du jour, quand il commence à faire clair.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_AUTHOR_INTENT'],difficulty:4,prompt:'Quel est le but principal de cette affiche ?',choices:['Convaincre les conducteurs de ralentir la nuit','Vendre des voitures','Raconter l’histoire d’une chouette'],ans:0,explanation:'Le titre et le conseil s’adressent aux conducteurs : c’est une affiche de prévention.'},
    {id:'q2',type:'choice',competencies:['READ_DOCUMENT_SOURCE'],difficulty:4,prompt:'Qui a réalisé ce document ?',choices:['Une association de protection des oiseaux','Un constructeur automobile','Un élève de 6e'],ans:0,evidenceParagraph:4,explanation:'La source l’indique. Toujours chercher qui a écrit un document aide à comprendre son but.'},
    {id:'q3',type:'choice',competencies:['READ_EXPLICIT','READ_CAUSE_CONSEQUENCE'],difficulty:3,prompt:'Pourquoi les chouettes se trouvent-elles au bord des routes ?',choices:['Elles y chassent les souris','Elles y font leur nid','Elles aiment la lumière des phares'],ans:0,evidenceParagraph:1,explanation:'« Elles chassent les souris au bord des routes, où l’herbe est rase. »'},
    {id:'q4',type:'evidence',competencies:['READ_JUSTIFY','READ_DOCUMENT_SOURCE'],difficulty:4,prompt:'Quelle partie de l’affiche permet de savoir si le document est fiable ?',evidenceParagraph:4,explanation:'La source dit qui a fait le document et où il est diffusé.'},
    {id:'q5',type:'choice',competencies:['READ_STRUCTURE'],difficulty:4,prompt:'À quoi sert l’image dans cette affiche ?',choices:['À montrer le danger et attirer l’attention','À indiquer l’auteur','À donner une date'],ans:0,evidenceParagraph:3,explanation:'L’image montre la chouette prise dans les phares : elle rend le danger concret et frappe le regard.'},
    {id:'q6',type:'choice',competencies:['READ_EXPLICIT'],difficulty:3,prompt:'À quel moment faut-il surtout ralentir ?',choices:['Entre la tombée de la nuit et l’aube','À midi','Seulement en hiver'],ans:0,evidenceParagraph:2,explanation:'« Entre la tombée de la nuit et l’aube... »'},
    {id:'q7',type:'choice',competencies:['READ_INFERENCE'],difficulty:5,prompt:'Pourquoi le fait que les chouettes « volent très bas » augmente-t-il le danger ?',choices:['Elles passent à la hauteur des voitures','Elles ne voient rien','Elles volent plus vite'],ans:0,evidenceParagraph:1,explanation:'En volant bas, elles traversent la route juste à hauteur des véhicules.'},
    {id:'q8',type:'choice',competencies:['READ_MAIN_IDEA'],difficulty:4,prompt:'Résume le message de l’affiche en une phrase.',choices:['En roulant moins vite la nuit, on peut sauver des chouettes','Les chouettes mangent toutes les souris','Il ne faut jamais rouler la nuit'],ans:0,explanation:'Le titre et le conseil le disent ; « jamais rouler » est exagéré : l’affiche demande de ralentir, pas d’arrêter.'}
   ]
  },

  fr_5e_lion_rat_01:{
   id:'fr_5e_lion_rat_01',level:'5e',subject:'francais',type:'literary_text',documentType:'fable',
   title:'Le Lion et le Rat',author:'Jean de La Fontaine',work:'Fables, livre II (1668)',
   sourceType:'public_domain',sourceReference:'Texte original de La Fontaine (mort en 1695), dans le domaine public.',
   chapterLinks:['fr5g'],verse:true,stanzas:[4],
   competencies:['READ_AUTHOR_INTENT','READ_STRUCTURE','READ_VOCAB_CONTEXT','READ_CAUSE_CONSEQUENCE','READ_INFERENCE','READ_JUSTIFY','READ_CHARACTER','READ_GENRE'],
   difficulty:6,estimatedReadingMinutes:3,audioMode:'audioAllowed',sessionSize:8,
   paragraphs:[
    'Il faut, autant qu’on peut, obliger tout le monde :',
    'On a souvent besoin d’un plus petit que soi.',
    'De cette vérité deux fables feront foi,',
    'Tant la chose en preuves abonde.',
    'Entre les pattes d’un Lion',
    'Un Rat sortit de terre assez à l’étourdie.',
    'Le Roi des animaux, en cette occasion,',
    'Montra ce qu’il était, et lui donna la vie.',
    'Ce bienfait ne fut pas perdu.',
    'Quelqu’un aurait-il jamais cru',
    'Qu’un Lion d’un Rat eût affaire ?',
    'Cependant il advint qu’au sortir des forêts',
    'Ce Lion fut pris dans des rets,',
    'Dont ses rugissements ne le purent défaire.',
    'Sire Rat accourut, et fit tant par ses dents',
    'Qu’une maille rongée emporta tout l’ouvrage.',
    'Patience et longueur de temps',
    'Font plus que force ni que rage.'
   ],
   glossary:[{word:'obliger',definition:'Ici : rendre service, faire du bien à quelqu’un.'},{word:'feront foi',definition:'Serviront de preuve.'},{word:'à l’étourdie',definition:'Sans faire attention, étourdiment.'},{word:'bienfait',definition:'Un acte généreux, un service rendu.'},{word:'rets',definition:'Un filet pour capturer les animaux.'},{word:'maille',definition:'Une boucle du filet.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_STRUCTURE','READ_GENRE'],difficulty:5,prompt:'Où se trouve la morale principale de cette fable ?',choices:['Au début, dans les deux premiers vers','Uniquement au milieu','Elle n’est jamais écrite'],ans:0,evidenceParagraph:1,explanation:'Ici, La Fontaine place la morale avant le récit : « On a souvent besoin d’un plus petit que soi. » Une seconde leçon conclut la fable.'},
    {id:'q2',type:'choice',competencies:['READ_VOCAB_CONTEXT'],difficulty:5,prompt:'Dans le 1er vers, « obliger tout le monde » signifie :',choices:['Rendre service à tout le monde','Forcer tout le monde à obéir','Punir tout le monde'],ans:0,evidenceParagraph:0,explanation:'Au XVIIᵉ siècle, « obliger » veut dire rendre service — sens encore présent dans « je vous suis obligé ».'},
    {id:'q3',type:'choice',competencies:['READ_EXPLICIT','READ_CHARACTER'],difficulty:3,prompt:'Que fait le Lion quand le Rat sort entre ses pattes ?',choices:['Il lui laisse la vie','Il le mange','Il le chasse de la forêt'],ans:0,evidenceParagraph:7,explanation:'« ...et lui donna la vie » : il l’épargne.'},
    {id:'q4',type:'choice',competencies:['READ_CAUSE_CONSEQUENCE'],difficulty:4,prompt:'Pourquoi le Lion ne parvient-il pas à se libérer seul ?',choices:['Ses rugissements ne suffisent pas à défaire le filet','Il est endormi','Le Rat l’a attaché'],ans:0,evidenceParagraph:13,explanation:'« Dont ses rugissements ne le purent défaire » : la force et la colère sont inutiles contre le filet.'},
    {id:'q5',type:'evidence',competencies:['READ_JUSTIFY'],difficulty:5,prompt:'Clique sur le vers qui montre comment le Rat sauve le Lion.',evidenceParagraph:14,explanation:'« Sire Rat accourut, et fit tant par ses dents... » : il ronge le filet.'},
    {id:'q6',type:'choice',competencies:['READ_INFERENCE','READ_AUTHOR_INTENT'],difficulty:6,prompt:'« Ce bienfait ne fut pas perdu. » Que veut dire ce vers ?',choices:['La bonté du Lion sera récompensée plus tard','Le Lion a perdu quelque chose','Le Rat a oublié le Lion'],ans:0,evidenceParagraph:8,explanation:'Le service rendu par le Lion lui sera rendu : c’est l’annonce de la suite.'},
    {id:'q7',type:'choice',competencies:['READ_AUTHOR_INTENT'],difficulty:7,prompt:'« Patience et longueur de temps / Font plus que force ni que rage. » Quelle leçon ces derniers vers ajoutent-ils ?',choices:['La patience réussit là où la force échoue','Il faut toujours se mettre en colère','Les petits animaux sont plus forts que les grands'],ans:0,evidenceParagraph:16,explanation:'Le Rat, maille après maille, réussit là où les rugissements du Lion ont échoué.'},
    {id:'q8',type:'order',competencies:['READ_SEQUENCE'],difficulty:4,prompt:'Remets le récit dans l’ordre.',tokens:['Le Lion épargne le Rat','Le Lion est pris dans un filet','Le Rat ronge une maille','Le Lion est libéré'],ans:'Le Lion épargne le Rat Le Lion est pris dans un filet Le Rat ronge une maille Le Lion est libéré',explanation:'C’est l’ordre du récit.'}
   ]
  },

  fr_4e_ascenseur_01:{
   id:'fr_4e_ascenseur_01',level:'4e',subject:'francais',type:'literary_text',documentType:'nouvelle (extrait)',
   title:'Panne au quatorzième',author:null,work:null,sourceType:'original_mathquest',
   chapterLinks:['fr4f'],
   competencies:['READ_NARRATOR_POV','READ_INFERENCE','READ_EMOTION_INTENTION','READ_CHARACTER','READ_VOCAB_CONTEXT','READ_JUSTIFY','READ_MAIN_IDEA','READ_AUTHOR_INTENT'],
   difficulty:6,estimatedReadingMinutes:4,audioMode:'audioOptional',sessionSize:8,
   paragraphs:[
    'L’ascenseur s’immobilisa entre le quatorzième et le quinzième étage avec un hoquet métallique. La lumière clignota, puis se stabilisa, plus pâle.',
    'Nous étions trois : une dame en manteau gris qui serrait un bouquet de tulipes, un livreur au casque encore sur la tête, et moi, qui avais, une fois de plus, préféré l’ascenseur aux escaliers.',
    'Le livreur appuya sur le bouton d’alarme, deux fois, trois fois. Une voix grésillante promit « une intervention dans les meilleurs délais ». Personne ne sut quoi faire de cette promesse.',
    'Au bout de dix minutes, la dame tendit une tulipe au livreur, puis une à moi. « Elles étaient pour ma sœur, dit-elle. Mais ma sœur attendra bien un peu. »',
    'Le livreur ôta enfin son casque. Il avait vingt ans à peine et des yeux fatigués. Il nous raconta ses journées de quarante kilomètres à vélo, et nous rîmes, pour la première fois, de notre étrange salle d’attente.',
    'Quand les portes s’ouvrirent enfin, nous sortîmes sans un mot, chacun une tulipe à la main. Je pris l’escalier pour redescendre. Je ne sais toujours pas pourquoi.'
   ],
   glossary:[{word:'hoquet',definition:'Ici : une secousse brusque, comme un sursaut.'},{word:'grésillante',definition:'Qui produit un petit crépitement, comme une radio mal réglée.'},{word:'dans les meilleurs délais',definition:'Le plus vite possible (formule administrative souvent vague).'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_NARRATOR_POV'],difficulty:4,prompt:'Qui raconte cette histoire ?',choices:['Un des trois passagers, qui dit « je »','Un narrateur extérieur qui n’est pas dans l’ascenseur','Le livreur'],ans:0,evidenceParagraph:1,explanation:'« Nous étions trois [...] et moi » : le narrateur est un personnage de l’histoire (récit à la 1ʳᵉ personne).'},
    {id:'q2',type:'choice',competencies:['READ_INFERENCE'],difficulty:6,prompt:'« Personne ne sut quoi faire de cette promesse. » Que comprend-on ?',choices:['Les passagers doutent que l’aide arrive vite','Les passagers sont rassurés','Les passagers n’ont pas entendu la voix'],ans:0,evidenceParagraph:2,explanation:'La formule « dans les meilleurs délais » est vague : elle ne dit pas quand l’aide viendra.'},
    {id:'q3',type:'choice',competencies:['READ_EMOTION_INTENTION','READ_CHARACTER'],difficulty:5,prompt:'Pourquoi la dame offre-t-elle des tulipes ?',choices:['Pour créer un lien et détendre l’atmosphère','Parce que les fleurs sont fanées','Parce que le livreur les lui demande'],ans:0,evidenceParagraph:3,explanation:'Rien ne l’y oblige : c’est un geste de partage dans une situation tendue.'},
    {id:'q4',type:'choice',competencies:['READ_INFERENCE','READ_CHARACTER'],difficulty:6,prompt:'Que symbolise le moment où le livreur « ôta enfin son casque » ?',choices:['Il se détend et s’ouvre aux autres','Il a trop chaud','Il s’apprête à partir'],ans:0,evidenceParagraph:4,explanation:'Juste après, il parle de sa vie : le casque retiré marque le passage d’inconnu à personne.'},
    {id:'q5',type:'choice',competencies:['READ_VOCAB_CONTEXT'],difficulty:5,prompt:'Pourquoi le narrateur parle-t-il d’une « étrange salle d’attente » ?',choices:['Parce que l’ascenseur en panne est devenu un lieu où l’on attend ensemble','Parce qu’ils sont chez le médecin','Parce que l’ascenseur a des chaises'],ans:0,evidenceParagraph:4,explanation:'C’est une image (une métaphore) : la cabine bloquée devient une salle d’attente improvisée.'},
    {id:'q6',type:'evidence',competencies:['READ_JUSTIFY','READ_EMOTION_INTENTION'],difficulty:6,prompt:'Clique sur le paragraphe où l’ambiance change, de la gêne à la complicité.',evidenceParagraph:4,explanation:'« ...et nous rîmes, pour la première fois... » : c’est le tournant.'},
    {id:'q7',type:'choice',competencies:['READ_INFERENCE','READ_AUTHOR_INTENT'],difficulty:7,prompt:'À la fin, le narrateur prend l’escalier « sans savoir pourquoi ». Quelle interprétation est la plus juste ?',choices:['L’expérience l’a changé, même s’il ne sait pas l’expliquer','Il a peur des escaliers','Il a oublié l’ascenseur'],ans:0,evidenceParagraph:5,explanation:'Au début, il préférait « une fois de plus » l’ascenseur ; le changement final montre que cette rencontre l’a marqué. La fin reste ouverte.'},
    {id:'q8',type:'choice',competencies:['READ_MAIN_IDEA'],difficulty:6,prompt:'Quel est le thème principal de ce récit ?',choices:['Une rencontre inattendue entre inconnus','Les dangers des ascenseurs','La vie d’un livreur à vélo'],ans:0,explanation:'La panne n’est qu’un prétexte : le récit parle de trois inconnus qui se rapprochent.'}
   ]
  },

  fr_3e_demain_des_laube_01:{
   id:'fr_3e_demain_des_laube_01',level:'3e',subject:'francais',type:'literary_text',documentType:'poème',
   title:'Demain, dès l’aube',author:'Victor Hugo',work:'Les Contemplations (1856)',
   sourceType:'public_domain',sourceReference:'Texte original de Victor Hugo (mort en 1885), dans le domaine public.',
   chapterLinks:['fr3c'],verse:true,stanzas:[4,8],
   competencies:['READ_INFERENCE','READ_EMOTION_INTENTION','READ_NARRATOR_POV','READ_STRUCTURE','READ_VOCAB_CONTEXT','READ_JUSTIFY','READ_AUTHOR_INTENT','READ_GENRE'],
   difficulty:7,estimatedReadingMinutes:3,audioMode:'audioRecommended',sessionSize:8,
   paragraphs:[
    'Demain, dès l’aube, à l’heure où blanchit la campagne,',
    'Je partirai. Vois-tu, je sais que tu m’attends.',
    'J’irai par la forêt, j’irai par la montagne.',
    'Je ne puis demeurer loin de toi plus longtemps.',
    'Je marcherai les yeux fixés sur mes pensées,',
    'Sans rien voir au dehors, sans entendre aucun bruit,',
    'Seul, inconnu, le dos courbé, les mains croisées,',
    'Triste, et le jour pour moi sera comme la nuit.',
    'Je ne regarderai ni l’or du soir qui tombe,',
    'Ni les voiles au loin descendant vers Harfleur,',
    'Et quand j’arriverai, je mettrai sur ta tombe',
    'Un bouquet de houx vert et de bruyère en fleur.'
   ],
   glossary:[{word:'aube',definition:'Le tout début du jour.'},{word:'Harfleur',definition:'Port de Normandie, près de l’estuaire de la Seine.'},{word:'houx',definition:'Arbuste aux feuilles piquantes, toujours vert.'},{word:'bruyère',definition:'Petite plante à fleurs violettes ou roses.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_INFERENCE','READ_STRUCTURE'],difficulty:7,prompt:'À la première lecture, à quoi le début du poème fait-il penser ?',choices:['À un rendez-vous avec une personne vivante, peut-être aimée','À un voyage d’affaires','À une promenade sans but'],ans:0,evidenceParagraph:1,explanation:'« Je sais que tu m’attends » laisse croire à un rendez-vous : le poème joue sur cette attente jusqu’au dernier vers.'},
    {id:'q2',type:'evidence',competencies:['READ_JUSTIFY','READ_STRUCTURE'],difficulty:6,prompt:'Clique sur le vers qui révèle que la personne attendue est morte.',evidenceParagraph:10,explanation:'« ...je mettrai sur ta tombe » : la révélation arrive à l’avant-dernier vers, ce qui bouleverse toute la lecture.'},
    {id:'q3',type:'choice',competencies:['READ_EMOTION_INTENTION'],difficulty:5,prompt:'Quel sentiment domine la 2ᵉ strophe ?',choices:['La tristesse et le repli sur soi','La joie','La colère'],ans:0,evidenceParagraph:7,explanation:'« Seul, [...] le dos courbé [...] Triste, et le jour pour moi sera comme la nuit. »'},
    {id:'q4',type:'choice',competencies:['READ_VOCAB_CONTEXT','READ_INFERENCE'],difficulty:7,prompt:'« Le jour pour moi sera comme la nuit » signifie surtout que...',choices:['Le chagrin empêche le poète de voir la beauté du monde','Le poète marchera de nuit','Le poète a perdu la vue'],ans:0,evidenceParagraph:7,explanation:'C’est une image : plongé dans sa douleur, il ne voit plus la lumière, au sens propre comme au sens figuré.'},
    {id:'q5',type:'choice',competencies:['READ_STRUCTURE'],difficulty:6,prompt:'Dans la 3ᵉ strophe, le poète refuse de regarder « l’or du soir » et « les voiles ». Pourquoi ce refus est-il frappant ?',choices:['Il écarte des paysages très beaux, ce qui montre l’intensité de son deuil','Il n’aime pas la mer','Il est pressé de rentrer'],ans:0,evidenceParagraph:8,explanation:'Ces images sont belles, mais il ne veut pas les voir : seule compte la personne qu’il va rejoindre.'},
    {id:'q6',type:'choice',competencies:['READ_NARRATOR_POV'],difficulty:5,prompt:'À qui s’adresse le poète avec « tu » ?',choices:['À la personne disparue','Au lecteur','À un ami qui marche avec lui'],ans:0,evidenceParagraph:10,explanation:'Le « tu » de « je sais que tu m’attends » est le même que celui de « ta tombe ». Hugo l’a écrit pour sa fille Léopoldine, morte noyée en 1843.'},
    {id:'q7',type:'choice',competencies:['READ_GENRE'],difficulty:5,prompt:'Combien de syllabes compte chaque vers de ce poème ?',choices:['12 (ce sont des alexandrins)','8 (octosyllabes)','10 (décasyllabes)'],ans:0,explanation:'Par exemple : « Je / ne / puis / de/meu/rer / loin / de / toi / plus / long/temps » = 12 syllabes.'},
    {id:'q8',type:'choice',competencies:['READ_AUTHOR_INTENT'],difficulty:8,prompt:'Que montre le bouquet de « houx vert » et de « bruyère en fleur » à la fin ?',choices:['Un hommage fidèle et vivant, qui contraste avec la mort','Que le poète est jardinier','Que c’est le printemps'],ans:0,evidenceParagraph:11,explanation:'Le houx reste vert toute l’année (fidélité, permanence) et la bruyère est en fleur : la vie et le souvenir s’opposent à la tombe.'}
   ]
  }

 }
};
