/* ===== Finot Académie — Bibliothèque de lecture et compréhension (CP → 3e) =====
   Premier lot pilote : 1 support par niveau (+ 1 support documentaire supplémentaire en 4e pour
   démontrer la diversité des types de documents), choisi parmi les chapitres de Français déjà
   existants où un support de lecture s'intègre naturellement (jamais forcé dans un chapitre qui ne
   s'y prête pas). Voir docs/reading-system.md pour l'architecture complète et les règles de droit
   d'auteur appliquées ici.

   Droits d'auteur (voir docs/reading-system.md §Droits d'auteur) :
   - sourceType 'original_mathquest' : texte intégralement écrit pour Finot Académie, aucune restriction.
   - sourceType 'public_domain' : adaptation en français moderne, simplifiée pour le niveau visé, très
     librement inspirée d'une œuvre tombée dans le domaine public (auteur mort depuis plus de 70 ans) —
     jamais une citation verbatim d'une traduction existante encore protégée. Vérifié un par un :
     Homère (Antiquité), Chrétien de Troyes (XIIe s.), Maupassant (mort 1893) : tous indiscutablement
     du domaine public en France.
   Aucune œuvre encore protégée (ex. Tolkien, auteurs vivants) n'est utilisée ici. */
window.MQ_READING={
 version:'1.7-lot8-2026-10-18',
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
    'SOURCE — Affiche réalisée par une association de protection des oiseaux d’un parc naturel régional, distribuée dans les mairies (document fictif créé pour Finot Académie).'
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
  },

  // ===== Lot 3 (18/10/2026) : 3e support pour le primaire (rotation dans « Comprendre ») et nouveaux
  // chapitres du collège. Adaptations libres (Hésiode, Defoe, Hugo — tous dans le domaine public) et
  // texte original de Verlaine (mort en 1896).

  fr_cp_gouter_01:{
   id:'fr_cp_gouter_01',level:'CP',subject:'francais',type:'literary_text',documentType:'récit',
   title:'Le goûter de Sami',author:null,work:null,sourceType:'original_mathquest',
   chapterLinks:['cp-fr-comprendre'],
   competencies:['READ_EXPLICIT','READ_CHARACTER','READ_EMOTION_INTENTION','READ_INFERENCE'],
   difficulty:1,estimatedReadingMinutes:1,audioMode:'audioRecommended',sessionSize:5,
   paragraphs:[
    'Sami a une pomme et un gâteau.',
    'Son amie Zoé n’a pas de goûter.',
    'Sami coupe son gâteau en deux.',
    'Il donne une part à Zoé.',
    'Zoé dit : « Merci, Sami ! »'
   ],
   glossary:[{word:'goûter',definition:'Le petit repas de l’après-midi.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_EXPLICIT'],difficulty:1,prompt:'Qu’a Sami pour son goûter ?',choices:['Une pomme et un gâteau','Une banane','Du pain'],ans:0,evidenceParagraph:0,explanation:'« Sami a une pomme et un gâteau. »'},
    {id:'q2',type:'choice',competencies:['READ_CHARACTER'],difficulty:1,prompt:'Qui n’a pas de goûter ?',choices:['Zoé','Sami','La maîtresse'],ans:0,evidenceParagraph:1,explanation:'« Son amie Zoé n’a pas de goûter. »'},
    {id:'q3',type:'choice',competencies:['READ_EXPLICIT'],difficulty:1,prompt:'Que fait Sami avec son gâteau ?',choices:['Il le coupe en deux','Il le mange tout seul','Il le jette'],ans:0,evidenceParagraph:2,explanation:'« Sami coupe son gâteau en deux. »'},
    {id:'q4',type:'choice',competencies:['READ_INFERENCE','READ_EMOTION_INTENTION'],difficulty:2,prompt:'Pourquoi Sami coupe-t-il son gâteau ?',choices:['Pour partager avec Zoé','Parce qu’il est trop gros pour lui','Pour le garder pour demain'],ans:0,evidenceParagraph:3,explanation:'Juste après, « il donne une part à Zoé » : il partage.'},
    {id:'q5',type:'choice',competencies:['READ_EMOTION_INTENTION'],difficulty:2,prompt:'Comment se sent Zoé à la fin ?',choices:['Contente','Fâchée','Triste'],ans:0,evidenceParagraph:4,explanation:'Elle dit « Merci, Sami ! » : elle est contente.'},
    {id:'q6',type:'evidence',competencies:['READ_JUSTIFY'],difficulty:2,prompt:'Quelle phrase montre que Sami partage ?',evidenceParagraph:3,explanation:'« Il donne une part à Zoé. »'},
    {id:'q7',type:'order',competencies:['READ_SEQUENCE'],difficulty:2,prompt:'Remets l’histoire dans l’ordre.',tokens:['Sami coupe son gâteau','Il donne une part à Zoé','Zoé dit merci'],ans:'Sami coupe son gâteau Il donne une part à Zoé Zoé dit merci',explanation:'C’est l’ordre du texte.'}
   ]
  },

  fr_ce1_tortue_classe_01:{
   id:'fr_ce1_tortue_classe_01',level:'CE1',subject:'francais',type:'literary_text',documentType:'récit',
   title:'Où est passée Caramel ?',author:null,work:null,sourceType:'original_mathquest',
   chapterLinks:['ce1-fr-comprendre'],
   competencies:['READ_EXPLICIT','READ_PLACE','READ_INFERENCE','READ_SEQUENCE','READ_REFERENCE','READ_EMOTION_INTENTION'],
   difficulty:2,estimatedReadingMinutes:2,audioMode:'audioRecommended',sessionSize:7,
   paragraphs:[
    'Dans la classe de Mme Leroy, il y a une tortue qui s’appelle Caramel.',
    'Lundi matin, son bac est vide ! Les élèves sont inquiets.',
    'Ils cherchent partout : sous les tables, derrière les livres, près de la porte.',
    'Soudain, Léo entend un petit bruit dans le coin lecture.',
    'Caramel est là, cachée sous un coussin, en train de grignoter une feuille de salade tombée du sac de Léa.',
    'Tout le monde rit. Mme Leroy ajoute un couvercle au bac.'
   ],
   glossary:[{word:'inquiets',definition:'Qui ont peur qu’il soit arrivé quelque chose de grave.'},{word:'grignoter',definition:'Manger tout doucement, par petits morceaux.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_EXPLICIT'],difficulty:1,prompt:'Quel animal vit dans la classe ?',choices:['Une tortue','Un hamster','Un poisson'],ans:0,evidenceParagraph:0,explanation:'« ...il y a une tortue qui s’appelle Caramel. »'},
    {id:'q2',type:'choice',competencies:['READ_EMOTION_INTENTION'],difficulty:2,prompt:'Comment se sentent les élèves quand le bac est vide ?',choices:['Inquiets','Contents','Fâchés'],ans:0,evidenceParagraph:1,explanation:'« Les élèves sont inquiets. »'},
    {id:'q3',type:'choice',competencies:['READ_PLACE'],difficulty:2,prompt:'Où retrouve-t-on Caramel ?',choices:['Sous un coussin, dans le coin lecture','Dans le sac de Léa','Derrière la porte'],ans:0,evidenceParagraph:4,explanation:'« Caramel est là, cachée sous un coussin » dans le coin lecture.'},
    {id:'q4',type:'text',strict:false,acc:['Léo','Leo','léo'],competencies:['READ_CHARACTER'],difficulty:2,prompt:'Quel élève entend un petit bruit ?',evidenceParagraph:3,explanation:'« Soudain, Léo entend un petit bruit... »'},
    {id:'q5',type:'choice',competencies:['READ_INFERENCE'],difficulty:3,prompt:'Pourquoi Caramel est-elle allée dans le coin lecture ?',choices:['Pour manger la salade tombée du sac de Léa','Pour lire un livre','Parce qu’elle avait froid'],ans:0,evidenceParagraph:4,explanation:'Elle « grignote une feuille de salade tombée du sac de Léa » : c’est ce qui l’a attirée.'},
    {id:'q6',type:'choice',competencies:['READ_INFERENCE','READ_CAUSE_CONSEQUENCE'],difficulty:3,prompt:'Pourquoi la maîtresse ajoute-t-elle un couvercle au bac ?',choices:['Pour que Caramel ne s’échappe plus','Pour que Caramel ait chaud','Pour cacher Caramel'],ans:0,evidenceParagraph:5,explanation:'Caramel est sortie de son bac : le couvercle l’en empêchera.'},
    {id:'q7',type:'choice',competencies:['READ_REFERENCE'],difficulty:2,prompt:'Dans « Ils cherchent partout », qui est « Ils » ?',choices:['Les élèves','Les tortues','Les livres'],ans:0,evidenceParagraph:2,explanation:'« Ils » reprend « les élèves » de la phrase d’avant.'},
    {id:'q8',type:'order',competencies:['READ_SEQUENCE'],difficulty:2,prompt:'Remets l’histoire dans l’ordre.',tokens:['Le bac est vide','Les élèves cherchent partout','Léo entend un bruit','On retrouve Caramel'],ans:'Le bac est vide Les élèves cherchent partout Léo entend un bruit On retrouve Caramel',explanation:'C’est l’ordre du texte.'}
   ]
  },

  fr_ce2_neige_01:{
   id:'fr_ce2_neige_01',level:'CE2',subject:'francais',type:'literary_text',documentType:'récit',
   title:'La première neige',author:null,work:null,sourceType:'original_mathquest',
   chapterLinks:['ce2-fr-comprendre'],
   competencies:['READ_EXPLICIT','READ_TIME','READ_EMOTION_INTENTION','READ_INFERENCE','READ_VOCAB_CONTEXT','READ_CAUSE_CONSEQUENCE','READ_JUSTIFY'],
   difficulty:3,estimatedReadingMinutes:2,audioMode:'audioAllowed',sessionSize:7,
   paragraphs:[
    'Ce matin de décembre, Nora ouvrit les volets et resta bouche bée : le jardin avait disparu sous un épais manteau blanc.',
    'Elle enfila ses bottes en vitesse, oublia ses gants et courut dehors.',
    'La neige craquait sous ses pas. Nora forma une boule et la lança contre le vieux chêne.',
    'Au bout de quelques minutes, elle ne sentait plus ses doigts. Elle souffla dessus, mais rien n’y fit.',
    'Sa grand-mère l’appela depuis la cuisine : un chocolat chaud et une paire de gants l’attendaient sur la table.'
   ],
   glossary:[{word:'bouche bée',definition:'La bouche ouverte, très étonnée.'},{word:'volets',definition:'Panneaux de bois ou de métal qui ferment une fenêtre de l’extérieur.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_TIME'],difficulty:2,prompt:'À quel moment se passe l’histoire ?',choices:['Un matin de décembre','Un soir d’été','Un après-midi de printemps'],ans:0,evidenceParagraph:0,explanation:'« Ce matin de décembre... »'},
    {id:'q2',type:'choice',competencies:['READ_VOCAB_CONTEXT'],difficulty:3,prompt:'« Un épais manteau blanc » désigne...',choices:['La neige qui recouvre le jardin','Un vêtement de Nora','Un drap posé sur l’herbe'],ans:0,evidenceParagraph:0,explanation:'C’est une image : la neige recouvre le jardin comme un manteau.'},
    {id:'q3',type:'choice',competencies:['READ_EMOTION_INTENTION'],difficulty:2,prompt:'Que ressent Nora en ouvrant les volets ?',choices:['Une grande surprise','De la peur','De l’ennui'],ans:0,evidenceParagraph:0,explanation:'Elle « resta bouche bée » : elle est très surprise.'},
    {id:'q4',type:'choice',competencies:['READ_CAUSE_CONSEQUENCE','READ_INFERENCE'],difficulty:4,prompt:'Pourquoi Nora ne sent-elle plus ses doigts ?',choices:['Parce qu’elle a oublié ses gants et touche la neige','Parce qu’elle s’est cognée contre le chêne','Parce que ses bottes sont trop petites'],ans:0,evidenceParagraph:1,explanation:'Elle « oublia ses gants » puis joua avec la neige : ses doigts ont gelé.'},
    {id:'q5',type:'evidence',competencies:['READ_JUSTIFY'],difficulty:3,prompt:'Quelle phrase montre que Nora était très pressée de sortir ?',evidenceParagraph:1,explanation:'« Elle enfila ses bottes en vitesse, oublia ses gants et courut dehors. »'},
    {id:'q6',type:'choice',competencies:['READ_INFERENCE'],difficulty:4,prompt:'Qu’a compris la grand-mère ?',choices:['Que Nora avait froid aux mains','Que Nora avait faim de gâteaux','Que Nora voulait rentrer dormir'],ans:0,evidenceParagraph:4,explanation:'Elle prépare un chocolat chaud et des gants : elle a deviné que Nora avait froid.'},
    {id:'q7',type:'choice',competencies:['READ_EXPLICIT'],difficulty:2,prompt:'Contre quoi Nora lance-t-elle sa boule de neige ?',choices:['Le vieux chêne','La fenêtre','Sa grand-mère'],ans:0,evidenceParagraph:2,explanation:'« ...la lança contre le vieux chêne. »'}
   ]
  },

  fr_cm2_volcans_doc_01:{
   id:'fr_cm2_volcans_doc_01',level:'CM2',subject:'francais',type:'document',documentType:'texte documentaire',
   title:'Comment fonctionne un volcan ?',author:null,work:null,sourceType:'original_mathquest',
   chapterLinks:['cm2-fr-comprendre'],
   competencies:['READ_EXPLICIT','READ_VOCAB_CONTEXT','READ_CAUSE_CONSEQUENCE','READ_MAIN_IDEA','READ_STRUCTURE','READ_JUSTIFY','READ_INFERENCE'],
   difficulty:4,estimatedReadingMinutes:3,audioMode:'audioAllowed',sessionSize:8,
   paragraphs:[
    'Sous nos pieds, à plusieurs dizaines de kilomètres de profondeur, la chaleur est si forte que certaines roches fondent. Elles forment le magma.',
    'Plus léger que les roches qui l’entourent, le magma remonte lentement et s’accumule dans une poche appelée chambre magmatique.',
    'Quand la pression devient trop forte, le magma monte par une cheminée jusqu’à la surface : c’est l’éruption. Une fois sorti, le magma prend le nom de lave.',
    'Certains volcans laissent couler des rivières de lave : on parle d’éruptions effusives. D’autres explosent et projettent des cendres très haut dans le ciel : ce sont les éruptions explosives.',
    'En France, le piton de la Fournaise, sur l’île de La Réunion, est l’un des volcans les plus actifs du monde. Les scientifiques le surveillent jour et nuit pour prévenir la population.'
   ],
   glossary:[{word:'magma',definition:'Roche fondue, très chaude, qui se trouve sous la surface de la Terre.'},{word:'pression',definition:'Force qui pousse sur quelque chose.'},{word:'cheminée',definition:'Ici : le conduit par lequel le magma monte dans le volcan.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_MAIN_IDEA'],difficulty:3,prompt:'Quel est le sujet du texte ?',choices:['Le fonctionnement des volcans','La vie à La Réunion','Le métier de scientifique'],ans:0,explanation:'Le titre l’annonce et chaque paragraphe explique une étape ou un type d’éruption.'},
    {id:'q2',type:'choice',competencies:['READ_VOCAB_CONTEXT'],difficulty:3,prompt:'Quelle est la différence entre le magma et la lave ?',choices:['C’est la même roche fondue : magma sous terre, lave une fois sortie','La lave est froide, le magma est chaud','Le magma est un gaz'],ans:0,evidenceParagraph:2,explanation:'« Une fois sorti, le magma prend le nom de lave. »'},
    {id:'q3',type:'choice',competencies:['READ_CAUSE_CONSEQUENCE'],difficulty:4,prompt:'Pourquoi le magma remonte-t-il ?',choices:['Parce qu’il est plus léger que les roches autour','Parce que le vent l’aspire','Parce que la mer le pousse'],ans:0,evidenceParagraph:1,explanation:'« Plus léger que les roches qui l’entourent, le magma remonte... »'},
    {id:'q4',type:'choice',competencies:['READ_CAUSE_CONSEQUENCE'],difficulty:4,prompt:'Qu’est-ce qui déclenche l’éruption ?',choices:['Une pression trop forte dans la chambre magmatique','Un tremblement de la mer','L’arrivée de l’hiver'],ans:0,evidenceParagraph:2,explanation:'« Quand la pression devient trop forte, le magma monte [...] : c’est l’éruption. »'},
    {id:'q5',type:'order',competencies:['READ_SEQUENCE','READ_STRUCTURE'],difficulty:4,prompt:'Remets les étapes dans l’ordre.',tokens:['Les roches fondent','Le magma remonte','Il s’accumule dans la chambre magmatique','La pression monte','L’éruption a lieu'],ans:'Les roches fondent Le magma remonte Il s’accumule dans la chambre magmatique La pression monte L’éruption a lieu',explanation:'C’est l’ordre décrit par les trois premiers paragraphes.'},
    {id:'q6',type:'choice',competencies:['READ_EXPLICIT'],difficulty:3,prompt:'Une éruption qui projette des cendres très haut est dite...',choices:['Explosive','Effusive','Endormie'],ans:0,evidenceParagraph:3,explanation:'« D’autres explosent et projettent des cendres [...] : ce sont les éruptions explosives. »'},
    {id:'q7',type:'evidence',competencies:['READ_JUSTIFY'],difficulty:4,prompt:'Quel paragraphe explique pourquoi on surveille certains volcans ?',evidenceParagraph:4,explanation:'Les scientifiques surveillent le piton de la Fournaise « pour prévenir la population ».'},
    {id:'q8',type:'choice',competencies:['READ_INFERENCE'],difficulty:5,prompt:'À quoi sert de surveiller un volcan « jour et nuit » ?',choices:['À donner l’alerte à temps pour protéger les habitants','À empêcher l’éruption','À récupérer de la lave'],ans:0,evidenceParagraph:4,explanation:'On ne peut pas empêcher une éruption, mais on peut prévenir la population à temps.'}
   ]
  },

  fr_6e_pandore_01:{
   id:'fr_6e_pandore_01',level:'6e',subject:'francais',type:'literary_text',documentType:'récit mythologique',
   title:'La boîte de Pandore',author:'Hésiode',work:'Les Travaux et les Jours',
   sourceType:'public_domain',sourceReference:'Adaptation libre en français moderne pour la 6e, d’après le mythe raconté par Hésiode (VIIIe-VIIe siècle av. J.-C.), dans le domaine public. La curiosité de Pandore et l’interdiction d’ouvrir la jarre suivent la version la plus répandue du mythe, plus tardive que le texte d’Hésiode.',
   chapterLinks:['fr6d'],
   competencies:['READ_CHARACTER','READ_EXPLICIT','READ_CAUSE_CONSEQUENCE','READ_INFERENCE','READ_AUTHOR_INTENT','READ_JUSTIFY','READ_GENRE','READ_SEQUENCE'],
   difficulty:5,estimatedReadingMinutes:3,audioMode:'audioAllowed',sessionSize:8,
   paragraphs:[
    'Prométhée avait volé le feu aux dieux pour l’offrir aux hommes. Furieux, Zeus, le roi des dieux, décida de se venger.',
    'Il demanda aux dieux de fabriquer la première femme : Pandore. Chacun lui offrit un don : la beauté, l’habileté, la parole, mais aussi la ruse. Et elle était d’une immense curiosité.',
    'Zeus lui confia une jarre fermée, en lui interdisant de l’ouvrir. Puis il l’envoya sur la Terre, où elle épousa Épiméthée, le frère de Prométhée.',
    'Les jours passaient, et Pandore ne pensait plus qu’à la jarre. Un soir, elle souleva le couvercle.',
    'Aussitôt, tous les malheurs s’en échappèrent : la maladie, la vieillesse, la misère, la guerre. Ils se répandirent dans le monde entier.',
    'Pandore referma vite la jarre. Au fond, il ne restait qu’une seule chose : l’Espérance.'
   ],
   glossary:[{word:'jarre',definition:'Grand vase en terre cuite. (On parle souvent de « boîte de Pandore », mais le texte grec parle d’une jarre.)'},{word:'habileté',definition:'Le talent pour faire des choses avec adresse.'},{word:'Espérance',definition:'L’espoir que les choses iront mieux.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_CAUSE_CONSEQUENCE'],difficulty:4,prompt:'Pourquoi Zeus veut-il se venger ?',choices:['Parce que Prométhée a volé le feu des dieux pour les hommes','Parce que Pandore a désobéi','Parce que les hommes l’ont attaqué'],ans:0,evidenceParagraph:0,explanation:'Tout commence par le vol du feu par Prométhée.'},
    {id:'q2',type:'choice',competencies:['READ_INFERENCE'],difficulty:6,prompt:'Zeus confie une jarre interdite à une femme très curieuse. Qu’espère-t-il sans doute ?',choices:['Qu’elle finisse par l’ouvrir, ce qui servira sa vengeance','Qu’elle apprenne beaucoup de choses','Qu’elle soit protégée des malheurs'],ans:0,evidenceParagraph:2,explanation:'Interdire d’ouvrir la jarre à quelqu’un de très curieux, c’est tendre un piège : la vengeance de Zeus passe par cette curiosité.'},
    {id:'q3',type:'choice',competencies:['READ_EXPLICIT'],difficulty:3,prompt:'Que contenait la jarre ?',choices:['Tous les malheurs du monde, et l’Espérance','Le feu volé par Prométhée','De l’or et des bijoux'],ans:0,evidenceParagraph:4,explanation:'Les malheurs s’échappent ; il ne reste au fond que l’Espérance.'},
    {id:'q4',type:'evidence',competencies:['READ_JUSTIFY'],difficulty:4,prompt:'Quel paragraphe montre que Pandore n’arrive pas à résister à la tentation ?',evidenceParagraph:3,explanation:'« ...Pandore ne pensait plus qu’à la jarre. Un soir, elle souleva le couvercle. »'},
    {id:'q5',type:'choice',competencies:['READ_GENRE','READ_AUTHOR_INTENT'],difficulty:5,prompt:'Ce récit est un mythe. Que cherche-t-il à expliquer ?',choices:['L’origine des malheurs dans le monde','Comment fabriquer une jarre','Pourquoi Zeus est le roi des dieux'],ans:0,explanation:'Les récits des origines expliquent d’où vient quelque chose : ici, les malheurs des hommes.'},
    {id:'q6',type:'choice',competencies:['READ_INFERENCE','READ_AUTHOR_INTENT'],difficulty:7,prompt:'Pourquoi est-il important que l’Espérance reste dans la jarre ?',choices:['Malgré les malheurs, les hommes gardent l’espoir','Parce qu’elle est le pire des malheurs','Parce que Zeus l’a oubliée'],ans:0,evidenceParagraph:5,explanation:'Le mythe se termine sur une note d’espoir : même face aux malheurs, l’Espérance reste aux hommes. (C’est l’interprétation la plus courante.)'},
    {id:'q7',type:'choice',competencies:['READ_EXPLICIT'],difficulty:3,prompt:'Qui Pandore épouse-t-elle ?',choices:['Épiméthée, le frère de Prométhée','Prométhée','Hermès'],ans:0,evidenceParagraph:2,explanation:'« ...elle épousa Épiméthée, le frère de Prométhée. »'},
    {id:'q8',type:'order',competencies:['READ_SEQUENCE'],difficulty:4,prompt:'Remets le mythe dans l’ordre.',tokens:['Prométhée vole le feu','Les dieux créent Pandore','Pandore ouvre la jarre','Les malheurs se répandent'],ans:'Prométhée vole le feu Les dieux créent Pandore Pandore ouvre la jarre Les malheurs se répandent',explanation:'C’est l’ordre du récit.'}
   ]
  },

  fr_6e_robinson_01:{
   id:'fr_6e_robinson_01',level:'6e',subject:'francais',type:'literary_text',documentType:'roman d’aventure (extrait adapté)',
   title:'Robinson et l’empreinte de pas',author:'Daniel Defoe',work:'Robinson Crusoé (1719)',
   sourceType:'public_domain',sourceReference:'Adaptation libre en français moderne pour la 6e, d’après Daniel Defoe (mort en 1731), dans le domaine public — aucune traduction existante reprise.',
   chapterLinks:['fr6g'],
   competencies:['READ_NARRATOR_POV','READ_EMOTION_INTENTION','READ_INFERENCE','READ_EXPLICIT','READ_VOCAB_CONTEXT','READ_JUSTIFY','READ_CAUSE_CONSEQUENCE'],
   difficulty:5,estimatedReadingMinutes:3,audioMode:'audioAllowed',sessionSize:8,
   paragraphs:[
    'Cela faisait des années que je vivais seul sur mon île, depuis le naufrage de mon navire. J’avais construit une cabane, apprivoisé des chèvres et appris à cultiver le blé.',
    'Un midi, alors que je longeais le rivage pour rejoindre ma barque, je m’arrêtai net : dans le sable, il y avait l’empreinte d’un pied nu.',
    'Je restai immobile, comme frappé par la foudre. J’écoutai, je regardai autour de moi : rien. Je montai sur une petite hauteur pour voir plus loin : personne.',
    'Je revins vers l’empreinte. Elle était bien là, avec ses orteils, son talon, chaque détail. Je ne pouvais pas l’avoir rêvée.',
    'Je rentrai chez moi en courant, me retournant tous les deux ou trois pas, prenant chaque buisson pour un homme. Cette nuit-là, je ne fermai pas l’œil.'
   ],
   glossary:[{word:'naufrage',definition:'Quand un bateau coule ou se brise en mer.'},{word:'apprivoisé',definition:'Rendu moins sauvage, habitué à vivre près de l’homme.'},{word:'rivage',definition:'Le bord de la mer.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_NARRATOR_POV'],difficulty:3,prompt:'Qui raconte cette histoire ?',choices:['Robinson lui-même, qui dit « je »','Un narrateur extérieur','Un autre naufragé'],ans:0,evidenceParagraph:0,explanation:'« ...je vivais seul sur mon île » : le héros raconte sa propre histoire.'},
    {id:'q2',type:'choice',competencies:['READ_EXPLICIT'],difficulty:2,prompt:'Pourquoi Robinson vit-il sur cette île ?',choices:['Son navire a fait naufrage','Il l’a achetée','Il est venu en vacances'],ans:0,evidenceParagraph:0,explanation:'« ...depuis le naufrage de mon navire. »'},
    {id:'q3',type:'choice',competencies:['READ_INFERENCE'],difficulty:5,prompt:'Pourquoi l’empreinte bouleverse-t-elle autant Robinson ?',choices:['Elle prouve qu’il n’est peut-être plus seul sur l’île','Elle montre que la mer monte','Elle est la sienne'],ans:0,evidenceParagraph:1,explanation:'Après des années de solitude, un pied nu qui n’est pas le sien signifie qu’un autre humain est passé là.'},
    {id:'q4',type:'choice',competencies:['READ_VOCAB_CONTEXT'],difficulty:4,prompt:'« Comme frappé par la foudre » signifie que Robinson est...',choices:['Saisi d’un choc immense, incapable de bouger','Blessé par un orage','Brûlé par le soleil'],ans:0,evidenceParagraph:2,explanation:'C’est une comparaison : le choc est si fort qu’il le paralyse, comme un éclair.'},
    {id:'q5',type:'evidence',competencies:['READ_JUSTIFY','READ_EMOTION_INTENTION'],difficulty:5,prompt:'Quel paragraphe montre le mieux la peur de Robinson ?',evidenceParagraph:4,explanation:'Il court, se retourne sans cesse, prend « chaque buisson pour un homme » et ne dort pas.'},
    {id:'q6',type:'choice',competencies:['READ_CAUSE_CONSEQUENCE'],difficulty:4,prompt:'Pourquoi Robinson revient-il vers l’empreinte ?',choices:['Pour vérifier qu’il ne l’a pas rêvée','Pour l’effacer','Pour la mesurer avec son pied'],ans:0,evidenceParagraph:3,explanation:'« Je ne pouvais pas l’avoir rêvée » : il vérifie.'},
    {id:'q7',type:'choice',competencies:['READ_EMOTION_INTENTION','READ_INFERENCE'],difficulty:6,prompt:'« Prenant chaque buisson pour un homme » : que montre ce détail ?',choices:['Sa peur lui fait voir des dangers partout','Il a une mauvaise vue','Il cherche quelqu’un pour l’aider'],ans:0,evidenceParagraph:4,explanation:'La peur déforme ce qu’il voit : de simples buissons deviennent des menaces.'},
    {id:'q8',type:'choice',competencies:['READ_EXPLICIT'],difficulty:3,prompt:'Qu’a appris à faire Robinson sur son île ?',choices:['Cultiver le blé et apprivoiser des chèvres','Construire un navire','Parler aux oiseaux'],ans:0,evidenceParagraph:0,explanation:'« ...apprivoisé des chèvres et appris à cultiver le blé. »'}
   ]
  },

  fr_5e_match_01:{
   id:'fr_5e_match_01',level:'5e',subject:'francais',type:'literary_text',documentType:'récit',
   title:'Le dernier penalty',author:null,work:null,sourceType:'original_mathquest',
   chapterLinks:['fr5a'],
   competencies:['READ_INFERENCE','READ_EMOTION_INTENTION','READ_CHARACTER','READ_NARRATOR_POV','READ_JUSTIFY','READ_MAIN_IDEA','READ_VOCAB_CONTEXT'],
   difficulty:5,estimatedReadingMinutes:3,audioMode:'audioAllowed',sessionSize:8,
   paragraphs:[
    'Il restait un tir au but. Si Malik le marquait, son équipe gagnait le tournoi. Il posa le ballon, recula de trois pas et essuya ses mains sur son short.',
    'Dans les tribunes, il chercha le visage de son père. La place était vide. Comme d’habitude.',
    'Le gardien sautillait d’un poteau à l’autre. Malik prit son élan, frappa… et le ballon fila au-dessus de la barre.',
    'Le silence tomba sur le terrain. Malik resta les bras ballants. Puis il sentit une main sur son épaule : c’était Théo, le remplaçant qui n’avait pas joué une seule minute du tournoi.',
    '« Tu as eu le courage de tirer, dit Théo. Moi, je n’aurais pas osé. » Malik ne répondit rien, mais il releva la tête.'
   ],
   glossary:[{word:'tribunes',definition:'Les gradins où s’assoient les spectateurs.'},{word:'ballants',definition:'Qui pendent sans bouger, sans force.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_EMOTION_INTENTION','READ_INFERENCE'],difficulty:4,prompt:'« Il [...] essuya ses mains sur son short. » Que révèle ce geste ?',choices:['Malik est nerveux','Malik a mal aux mains','Malik veut se salir'],ans:0,evidenceParagraph:0,explanation:'Des mains moites sont un signe de stress : le narrateur montre l’émotion par un geste au lieu de la nommer.'},
    {id:'q2',type:'choice',competencies:['READ_INFERENCE'],difficulty:6,prompt:'« La place était vide. Comme d’habitude. » Que comprend-on ?',choices:['Le père de Malik ne vient jamais le voir jouer, et cela le blesse','Le stade est fermé','Le père de Malik joue aussi dans le match'],ans:0,evidenceParagraph:1,explanation:'« Comme d’habitude » indique que l’absence se répète. Le texte ne dit pas « il est triste », mais le fait qu’il cherche ce visage le montre.'},
    {id:'q3',type:'choice',competencies:['READ_EXPLICIT'],difficulty:2,prompt:'Que se passe-t-il quand Malik tire ?',choices:['Le ballon passe au-dessus de la barre','Il marque le but','Le gardien arrête le ballon'],ans:0,evidenceParagraph:2,explanation:'« ...le ballon fila au-dessus de la barre. »'},
    {id:'q4',type:'choice',competencies:['READ_CHARACTER','READ_INFERENCE'],difficulty:5,prompt:'Pourquoi est-il important que ce soit Théo qui console Malik ?',choices:['Théo n’a pas joué, il aurait pu être jaloux ou indifférent, mais il est généreux','Théo est le capitaine de l’équipe','Théo est le père de Malik'],ans:0,evidenceParagraph:3,explanation:'Le remplaçant « qui n’avait pas joué une seule minute » est le seul à venir : son geste n’en est que plus fort.'},
    {id:'q5',type:'evidence',competencies:['READ_JUSTIFY','READ_EMOTION_INTENTION'],difficulty:5,prompt:'Quel paragraphe montre que Malik commence à aller mieux ?',evidenceParagraph:4,explanation:'« ...il releva la tête » : un geste qui montre qu’il reprend courage.'},
    {id:'q6',type:'choice',competencies:['READ_VOCAB_CONTEXT'],difficulty:4,prompt:'« Le silence tomba sur le terrain. » Cette phrase signifie que...',choices:['Tout le monde se tut d’un coup','Il se mit à pleuvoir','Le terrain s’effondra'],ans:0,evidenceParagraph:3,explanation:'C’est une image : le silence arrive soudainement, comme quelque chose qui tombe.'},
    {id:'q7',type:'choice',competencies:['READ_MAIN_IDEA'],difficulty:6,prompt:'Quel est le vrai sujet de ce récit ?',choices:['Le soutien qu’on peut trouver après un échec','Les règles des tirs au but','Comment gagner un tournoi'],ans:0,explanation:'Le match n’est que le cadre : le texte parle d’échec, d’absence et d’amitié.'},
    {id:'q8',type:'choice',competencies:['READ_NARRATOR_POV'],difficulty:4,prompt:'Qui raconte cette histoire ?',choices:['Un narrateur extérieur, qui dit « il »','Malik, qui dit « je »','Théo, qui dit « je »'],ans:0,explanation:'Le récit est à la 3ᵉ personne (« Il posa le ballon ») mais suit de près ce que voit et ressent Malik.'}
   ]
  },

  fr_4e_verlaine_ciel_01:{
   id:'fr_4e_verlaine_ciel_01',level:'4e',subject:'francais',type:'literary_text',documentType:'poème',
   title:'Le ciel est, par-dessus le toit…',author:'Paul Verlaine',work:'Sagesse (1880)',
   sourceType:'public_domain',sourceReference:'Texte original de Paul Verlaine (mort en 1896), dans le domaine public.',
   chapterLinks:['fr4e'],verse:true,stanzas:[4,8,12],
   competencies:['READ_INFERENCE','READ_EMOTION_INTENTION','READ_STRUCTURE','READ_PLACE','READ_NARRATOR_POV','READ_JUSTIFY','READ_AUTHOR_INTENT','READ_GENRE'],
   difficulty:6,estimatedReadingMinutes:3,audioMode:'audioRecommended',sessionSize:8,
   paragraphs:[
    'Le ciel est, par-dessus le toit,',
    'Si bleu, si calme !',
    'Un arbre, par-dessus le toit,',
    'Berce sa palme.',
    'La cloche, dans le ciel qu’on voit,',
    'Doucement tinte.',
    'Un oiseau sur l’arbre qu’on voit',
    'Chante sa plainte.',
    'Mon Dieu, mon Dieu, la vie est là,',
    'Simple et tranquille.',
    'Cette paisible rumeur-là',
    'Vient de la ville.',
    '— Qu’as-tu fait, ô toi que voilà',
    'Pleurant sans cesse,',
    'Dis, qu’as-tu fait, toi que voilà,',
    'De ta jeunesse ?'
   ],
   glossary:[{word:'palme',definition:'Ici : la cime feuillue de l’arbre, qui bouge comme une main.'},{word:'tinte',definition:'Sonne doucement.'},{word:'rumeur',definition:'Ici : un bruit confus et lointain.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_PLACE','READ_INFERENCE'],difficulty:6,prompt:'D’où le poète semble-t-il regarder le monde ?',choices:['D’un lieu fermé, d’où il ne voit que le ciel et le haut d’un arbre','Du sommet d’une montagne','Du milieu d’une foule'],ans:0,evidenceParagraph:0,explanation:'Il ne voit que ce qui est « par-dessus le toit » et entend la ville de loin. Verlaine a écrit ce poème en prison, en 1873.'},
    {id:'q2',type:'choice',competencies:['READ_STRUCTURE'],difficulty:5,prompt:'Quelle reprise rythme les deux premières strophes ?',choices:['« par-dessus le toit » puis « qu’on voit »','« Mon Dieu, mon Dieu »','« toi que voilà »'],ans:0,evidenceParagraph:2,explanation:'Ces répétitions créent une musique douce, presque une berceuse.'},
    {id:'q3',type:'choice',competencies:['READ_EMOTION_INTENTION'],difficulty:5,prompt:'Comment le monde extérieur est-il décrit dans les trois premières strophes ?',choices:['Calme, simple et paisible','Bruyant et dangereux','Triste et sombre'],ans:0,evidenceParagraph:9,explanation:'« Si bleu, si calme », « simple et tranquille », « paisible rumeur ».'},
    {id:'q4',type:'evidence',competencies:['READ_JUSTIFY','READ_EMOTION_INTENTION'],difficulty:6,prompt:'Clique sur le vers où l’on comprend que le poète souffre.',evidenceParagraph:13,explanation:'« Pleurant sans cesse » : le contraste avec la paix du dehors est brutal.'},
    {id:'q5',type:'choice',competencies:['READ_NARRATOR_POV'],difficulty:7,prompt:'Dans la dernière strophe, à qui le poète s’adresse-t-il avec « toi » ?',choices:['À lui-même','À un oiseau','À la ville'],ans:0,evidenceParagraph:12,explanation:'Il se parle à lui-même, avec reproche : c’est un examen de conscience.'},
    {id:'q6',type:'choice',competencies:['READ_INFERENCE','READ_AUTHOR_INTENT'],difficulty:7,prompt:'Quel sentiment exprime la question finale « qu’as-tu fait [...] de ta jeunesse ? »',choices:['Le regret d’avoir gâché sa vie','La joie d’être jeune','La colère contre la ville'],ans:0,evidenceParagraph:15,explanation:'Il se reproche d’avoir perdu ses belles années, face à une vie simple qu’il ne peut plus toucher.'},
    {id:'q7',type:'choice',competencies:['READ_STRUCTURE','READ_AUTHOR_INTENT'],difficulty:7,prompt:'Quel effet produit l’opposition entre les trois premières strophes et la dernière ?',choices:['La paix du dehors rend plus forte la douleur de celui qui en est privé','Elle montre que la ville est dangereuse','Elle n’a aucun effet particulier'],ans:0,explanation:'Plus le monde extérieur est doux, plus l’enfermement et les regrets du poète paraissent cruels.'},
    {id:'q8',type:'choice',competencies:['READ_GENRE'],difficulty:5,prompt:'Comment sont organisés les vers de chaque strophe ?',choices:['Un vers long puis un vers court, en alternance','Tous les vers ont 12 syllabes','Il n’y a pas de rimes'],ans:0,explanation:'Vers de 8 syllabes et de 4 syllabes alternent, avec des rimes croisées (toit/calme/toit/palme).'}
   ]
  },

  fr_3e_cosette_01:{
   id:'fr_3e_cosette_01',level:'3e',subject:'francais',type:'literary_text',documentType:'roman (extrait adapté)',
   title:'Cosette dans la forêt',author:'Victor Hugo',work:'Les Misérables (1862)',
   sourceType:'public_domain',sourceReference:'Adaptation libre en français moderne pour la 3e, d’après Victor Hugo (mort en 1885), dans le domaine public.',
   chapterLinks:['fr3k'],
   competencies:['READ_INFERENCE','READ_EMOTION_INTENTION','READ_CHARACTER','READ_NARRATOR_POV','READ_VOCAB_CONTEXT','READ_JUSTIFY','READ_AUTHOR_INTENT','READ_ARGUMENT'],
   difficulty:7,estimatedReadingMinutes:4,audioMode:'audioOptional',sessionSize:9,
   paragraphs:[
    'Il faisait nuit noire. Les Thénardier, qui hébergeaient Cosette en échange d’une pension, l’avaient envoyée chercher de l’eau à la source, au fond du bois. Elle avait huit ans.',
    'Le seau était énorme pour ses petites mains. À mesure qu’elle s’enfonçait sous les arbres, les dernières lumières du village disparaissaient derrière elle.',
    'Elle aurait voulu rebrousser chemin, mais elle avait encore plus peur de la Thénardier que de la forêt. Alors elle continua, en comptant tout haut pour ne plus entendre le silence.',
    'À la source, elle remplit le seau. Il pesait si lourd qu’elle devait s’arrêter tous les dix pas, et l’eau glacée éclaboussait ses jambes nues.',
    'Soudain, le seau ne pesa plus rien. Une grande main venait de saisir l’anse. Cosette leva les yeux : un homme marchait à côté d’elle, sans rien dire. Étrangement, elle n’eut pas peur.'
   ],
   glossary:[{word:'pension',definition:'Ici : l’argent payé régulièrement pour qu’un enfant soit logé et nourri.'},{word:'rebrousser chemin',definition:'Faire demi-tour.'},{word:'anse',definition:'La poignée d’un seau.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_INFERENCE','READ_AUTHOR_INTENT'],difficulty:6,prompt:'Quelle précision du 1er paragraphe rend la situation particulièrement révoltante ?',choices:['« Elle avait huit ans. »','« Il faisait nuit noire. »','« au fond du bois »'],ans:0,evidenceParagraph:0,explanation:'La phrase courte, placée à la fin, frappe le lecteur : on envoie une enfant de huit ans seule dans la forêt la nuit.'},
    {id:'q2',type:'choice',competencies:['READ_INFERENCE','READ_CHARACTER'],difficulty:7,prompt:'Que révèle la phrase « elle avait encore plus peur de la Thénardier que de la forêt » ?',choices:['Cosette est maltraitée par les Thénardier','Cosette aime la forêt','La Thénardier est dans la forêt'],ans:0,evidenceParagraph:2,explanation:'Si une maison fait plus peur qu’une forêt la nuit, c’est que l’enfant y est maltraitée.'},
    {id:'q3',type:'choice',competencies:['READ_EMOTION_INTENTION'],difficulty:5,prompt:'Pourquoi Cosette compte-t-elle tout haut ?',choices:['Pour se rassurer et couvrir le silence qui l’effraie','Pour savoir combien de pas il reste','Pour appeler à l’aide'],ans:0,evidenceParagraph:2,explanation:'« ...pour ne plus entendre le silence » : sa propre voix la rassure.'},
    {id:'q4',type:'evidence',competencies:['READ_JUSTIFY'],difficulty:5,prompt:'Quel paragraphe montre que la tâche est trop dure physiquement pour Cosette ?',evidenceParagraph:3,explanation:'Elle doit « s’arrêter tous les dix pas » et l’eau glacée éclabousse ses jambes nues.'},
    {id:'q5',type:'choice',competencies:['READ_VOCAB_CONTEXT'],difficulty:5,prompt:'« Le seau ne pesa plus rien » : que s’est-il passé ?',choices:['Quelqu’un a pris le seau pour le porter','Le seau s’est vidé','Cosette est devenue plus forte'],ans:0,evidenceParagraph:4,explanation:'La phrase suivante l’explique : « Une grande main venait de saisir l’anse. »'},
    {id:'q6',type:'choice',competencies:['READ_INFERENCE'],difficulty:7,prompt:'Pourquoi le texte précise-t-il qu’« étrangement, elle n’eut pas peur » ?',choices:['Pour faire sentir que cet inconnu est bienveillant et va changer son destin','Parce que Cosette n’a jamais peur','Parce qu’elle connaît déjà l’homme'],ans:0,evidenceParagraph:4,explanation:'Après tant de peur, ce calme soudain annonce un sauveur. (Dans le roman, il s’agit de Jean Valjean.)'},
    {id:'q7',type:'choice',competencies:['READ_NARRATOR_POV'],difficulty:6,prompt:'Quel point de vue le narrateur adopte-t-il surtout ?',choices:['Il nous fait vivre la scène à travers les sensations et les peurs de Cosette','Il raconte comme un témoin qui ne sait rien de ce qu’elle ressent','C’est Cosette qui dit « je »'],ans:0,explanation:'Récit à la 3ᵉ personne, mais nous savons ce que Cosette ressent, entend et craint : point de vue interne.'},
    {id:'q8',type:'choice',competencies:['READ_ARGUMENT','READ_AUTHOR_INTENT'],difficulty:8,prompt:'Quelle dénonciation Victor Hugo fait-il à travers ce passage ?',choices:['La misère et l’exploitation des enfants','La dangerosité des forêts','La difficulté de trouver de l’eau'],ans:0,explanation:'Les Misérables dénoncent la misère sociale ; Cosette, enfant exploitée, en est l’un des symboles.'},
    {id:'q9',type:'order',competencies:['READ_SEQUENCE'],difficulty:4,prompt:'Remets les étapes du passage dans l’ordre.',tokens:['Cosette est envoyée à la source','Elle s’enfonce dans le bois','Elle remplit le seau','Un homme prend le seau'],ans:'Cosette est envoyée à la source Elle s’enfonce dans le bois Elle remplit le seau Un homme prend le seau',explanation:'C’est l’ordre du récit.'}
   ]
  },

  fr_3e_fausse_info_01:{
   id:'fr_3e_fausse_info_01',level:'3e',subject:'francais',type:'document',documentType:'publication de réseau social et vérification',
   title:'Une information trop belle pour être vraie',author:null,work:null,sourceType:'original_mathquest',
   chapterLinks:['fr3h'],
   competencies:['READ_DOCUMENT_SOURCE','READ_ARGUMENT','READ_INFERENCE','READ_JUSTIFY','READ_AUTHOR_INTENT','READ_COMPARE_DOCUMENTS','READ_MAIN_IDEA'],
   difficulty:6,estimatedReadingMinutes:3,audioMode:'audioOptional',sessionSize:8,
   paragraphs:[
    'DOCUMENT 1 — Publication partagée 48 000 fois : « INCROYABLE !!! À partir de lundi, les vacances d’été dureront 4 mois dans tous les collèges. Le ministère l’a confirmé. Partagez avant que ce soit supprimé !!! » (compte « InfosVraies2026 », créé il y a trois semaines, photo de profil absente).',
    'DOCUMENT 2 — Article d’un quotidien régional : « Contacté, le ministère de l’Éducation nationale dément formellement : aucune modification du calendrier scolaire n’est prévue. Le texte qui circule ne cite aucun document officiel. »',
    'DOCUMENT 3 — Page « Calendrier scolaire » du site officiel du ministère, mise à jour le mois dernier : les dates des vacances d’été sont inchangées.',
    'DOCUMENT 4 — Conseil d’un professeur documentaliste : « Avant de partager, posez trois questions : Qui parle ? Quelle est sa source ? D’autres médias fiables disent-ils la même chose ? »'
   ],
   glossary:[{word:'dément',definition:'Affirme que c’est faux.'},{word:'quotidien',definition:'Un journal qui paraît chaque jour.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_DOCUMENT_SOURCE'],difficulty:5,prompt:'Pourquoi le compte du document 1 est-il peu fiable ?',choices:['Il est très récent, anonyme et ne cite aucune source','Il a été partagé 48 000 fois','Il parle des vacances'],ans:0,evidenceParagraph:0,explanation:'Un compte créé il y a trois semaines, sans identité ni source, n’offre aucune garantie. Le nombre de partages ne prouve pas que c’est vrai.'},
    {id:'q2',type:'choice',competencies:['READ_INFERENCE','READ_AUTHOR_INTENT'],difficulty:6,prompt:'À quoi servent les majuscules, les « !!! » et « Partagez avant que ce soit supprimé » ?',choices:['À provoquer une émotion forte et pousser à partager sans réfléchir','À informer calmement','À citer le ministère'],ans:0,evidenceParagraph:0,explanation:'Urgence et émotion sont des procédés typiques des fausses informations : ils empêchent de vérifier.'},
    {id:'q3',type:'choice',competencies:['READ_COMPARE_DOCUMENTS'],difficulty:6,prompt:'Que montrent ensemble les documents 2 et 3 ?',choices:['L’information du document 1 est fausse','L’information du document 1 est vraie','Ils ne parlent pas du même sujet'],ans:0,explanation:'Un journal qui a contacté le ministère et le site officiel lui-même disent la même chose : rien ne change.'},
    {id:'q4',type:'evidence',competencies:['READ_JUSTIFY','READ_DOCUMENT_SOURCE'],difficulty:5,prompt:'Quel document est la source la plus directe pour vérifier le calendrier scolaire ?',evidenceParagraph:2,explanation:'Le site officiel du ministère est la source première : c’est lui qui fixe le calendrier.'},
    {id:'q5',type:'choice',competencies:['READ_ARGUMENT'],difficulty:7,prompt:'« Partagé 48 000 fois » : pourquoi cet argument ne prouve-t-il rien ?',choices:['Beaucoup de gens peuvent partager une information sans l’avoir vérifiée','Parce que 48 000 est un petit nombre','Parce que le compte a supprimé la publication'],ans:0,evidenceParagraph:0,explanation:'La popularité n’est pas une preuve : une rumeur peut se répandre très vite précisément parce qu’elle est surprenante.'},
    {id:'q6',type:'choice',competencies:['READ_DOCUMENT_SOURCE','READ_INFERENCE'],difficulty:6,prompt:'Le document 1 dit « Le ministère l’a confirmé ». Qu’est-ce qui rend cette affirmation douteuse ?',choices:['Aucun document officiel n’est cité, et le ministère dément','Le ministère ne parle jamais aux journaux','Le mot « ministère » est mal écrit'],ans:0,evidenceParagraph:1,explanation:'Citer une autorité sans source vérifiable est un procédé fréquent ; le document 2 montre le démenti.'},
    {id:'q7',type:'choice',competencies:['READ_MAIN_IDEA'],difficulty:5,prompt:'Quelle est la leçon principale de cet ensemble de documents ?',choices:['Vérifier qui parle et croiser les sources avant de partager','Ne jamais utiliser les réseaux sociaux','Toujours croire les journaux'],ans:0,evidenceParagraph:3,explanation:'Le document 4 résume la méthode ; les autres documents l’appliquent. « Toujours croire » ou « ne jamais utiliser » sont des positions extrêmes.'},
    {id:'q8',type:'order',competencies:['READ_STRUCTURE'],difficulty:4,prompt:'Remets dans l’ordre les trois questions conseillées par le professeur documentaliste.',tokens:['Qui parle ?','Quelle est sa source ?','D’autres médias fiables disent-ils la même chose ?'],ans:'Qui parle ? Quelle est sa source ? D’autres médias fiables disent-ils la même chose ?',explanation:'C’est l’ordre du document 4 : de l’auteur, à sa source, puis au croisement des sources.'}
   ]
  },

  // ===== Lot 4 (18/10/2026) : chapitres du collège encore sans texte (poésie, théâtre, argumentation,
  // autobiographie, médias). Textes originaux de Verlaine (mort en 1896), Du Bellay (1560) et Ronsard
  // (1585) ; adaptations libres de Molière, Marivaux, Voltaire, Rousseau, Verne et Sophocle (tous dans
  // le domaine public) ; deux documents originaux Finot Académie.

  fr_6e_chanson_automne_01:{
   id:'fr_6e_chanson_automne_01',level:'6e',subject:'francais',type:'literary_text',documentType:'poème',
   title:'Chanson d’automne',author:'Paul Verlaine',work:'Poèmes saturniens (1866)',
   sourceType:'public_domain',sourceReference:'Texte original de Paul Verlaine (mort en 1896), dans le domaine public.',
   chapterLinks:['fr6e'],verse:true,stanzas:[6,12],
   competencies:['READ_TIME','READ_EMOTION_INTENTION','READ_VOCAB_CONTEXT','READ_CAUSE_CONSEQUENCE','READ_JUSTIFY','READ_GENRE','READ_INFERENCE'],
   difficulty:5,estimatedReadingMinutes:2,audioMode:'audioRecommended',sessionSize:8,
   paragraphs:[
    'Les sanglots longs',
    'Des violons',
    'De l’automne',
    'Blessent mon cœur',
    'D’une langueur',
    'Monotone.',
    'Tout suffocant',
    'Et blême, quand',
    'Sonne l’heure,',
    'Je me souviens',
    'Des jours anciens',
    'Et je pleure ;',
    'Et je m’en vais',
    'Au vent mauvais',
    'Qui m’emporte',
    'Deçà, delà,',
    'Pareil à la',
    'Feuille morte.'
   ],
   glossary:[{word:'langueur',definition:'Une tristesse fatiguée, sans force.'},{word:'Monotone',definition:'Toujours pareil, sans changement.'},{word:'suffocant',definition:'Qui a du mal à respirer, comme étouffé par l’émotion.'},{word:'blême',definition:'Très pâle.'},{word:'Deçà',definition:'« Deçà, delà » : d’un côté puis de l’autre, au hasard.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_TIME'],difficulty:3,prompt:'À quelle saison le poème se passe-t-il ?',choices:['En automne','Au printemps','En été'],ans:0,evidenceParagraph:2,explanation:'« Les sanglots longs / Des violons / De l’automne » — c’est aussi le titre.'},
    {id:'q2',type:'choice',competencies:['READ_VOCAB_CONTEXT','READ_INFERENCE'],difficulty:5,prompt:'Que peuvent être les « violons de l’automne » ?',choices:['Une image : les sons de l’automne, comme le vent, ressemblent à des violons qui pleurent','Un vrai orchestre qui joue dans la rue','Des oiseaux qui chantent gaiement'],ans:0,evidenceParagraph:0,explanation:'Le poète compare les bruits de l’automne à des violons qui sanglotent : c’est une image.'},
    {id:'q3',type:'choice',competencies:['READ_EMOTION_INTENTION'],difficulty:4,prompt:'Quel sentiment le poète exprime-t-il ?',choices:['Une profonde tristesse','Une grande joie','De la colère'],ans:0,evidenceParagraph:11,explanation:'Les sanglots « blessent [son] cœur » et il finit par dire « je pleure ».'},
    {id:'q4',type:'choice',competencies:['READ_CAUSE_CONSEQUENCE'],difficulty:5,prompt:'Qu’est-ce qui fait pleurer le poète dans la deuxième strophe ?',choices:['Le souvenir des jours anciens','Une dispute avec un ami','Une blessure à la main'],ans:0,evidenceParagraph:10,explanation:'« Je me souviens / Des jours anciens / Et je pleure » : ce sont ses souvenirs qui le font pleurer.'},
    {id:'q5',type:'evidence',competencies:['READ_JUSTIFY'],difficulty:5,prompt:'Clique sur le vers où le poète se compare à une chose emportée par le vent.',evidenceParagraph:17,explanation:'« Pareil à la / Feuille morte » : comme une feuille morte, il se laisse emporter sans pouvoir résister.'},
    {id:'q6',type:'choice',competencies:['READ_INFERENCE'],difficulty:6,prompt:'Que nous fait comprendre la comparaison avec la « feuille morte » ?',choices:['Le poète se sent sans force, poussé au hasard par la vie','Le poète aime ramasser les feuilles','Le poète va bientôt planter un arbre'],ans:0,evidenceParagraph:16,explanation:'Une feuille morte ne choisit pas où elle va : le poète se sent pareil, triste et sans volonté.'},
    {id:'q7',type:'choice',competencies:['READ_GENRE'],difficulty:4,prompt:'Qu’est-ce qui donne à ce poème une musique de « chanson » ?',choices:['Des vers très courts et des sons qui se répètent','De très longues phrases sans rimes','Des dialogues entre personnages'],ans:0,explanation:'Les vers sont très courts et riment souvent (longs/violons, cœur/langueur) : on dirait une mélodie.'},
    {id:'q8',type:'choice',competencies:['READ_GENRE','READ_VOCAB_CONTEXT'],difficulty:5,prompt:'Quels mots riment entre eux ?',choices:['« automne » et « monotone »','« cœur » et « heure »','« violons » et « souviens »'],ans:0,evidenceParagraph:5,explanation:'« automne » (vers 3) rime avec « monotone » (vers 6).'}
   ]
  },

  fr_6e_scapin_galere_01:{
   id:'fr_6e_scapin_galere_01',level:'6e',subject:'francais',type:'literary_text',documentType:'comédie (extrait adapté)',
   title:'Que diable allait-il faire dans cette galère ?',author:'Molière',work:'Les Fourberies de Scapin (1671)',
   sourceType:'public_domain',sourceReference:'Adaptation libre et abrégée pour la 6e de l’acte II, scène 7, d’après Molière (mort en 1673), dans le domaine public. La réplique célèbre de Géronte est conservée.',
   chapterLinks:['fr6f'],
   competencies:['READ_EXPLICIT','READ_CHARACTER','READ_INFERENCE','READ_GENRE','READ_JUSTIFY','READ_AUTHOR_INTENT'],
   difficulty:5,estimatedReadingMinutes:3,audioMode:'audioAllowed',sessionSize:8,
   paragraphs:[
    'GÉRONTE. — Qu’y a-t-il, Scapin ? Tu as l’air tout bouleversé.',
    'SCAPIN. — Ah ! Monsieur, quel malheur ! Votre fils Léandre et moi, nous sommes montés visiter une galère turque sur le port. Pendant que nous goûtions des fruits, la galère a pris la mer !',
    'SCAPIN. — Le Turc m’a renvoyé à terre pour vous dire que, si vous ne lui envoyez pas tout de suite cinq cents écus, il emmène votre fils à Alger.',
    'GÉRONTE. — Comment, diantre ! cinq cents écus ? Que diable allait-il faire dans cette galère ?',
    'SCAPIN. — Il ne pensait pas à ce qui est arrivé. Vite, Monsieur, songez qu’on attend !',
    'GÉRONTE. — Va dire à ce Turc qu’il me renvoie mon fils, et que tu te mets à sa place en attendant que j’aie trouvé l’argent.',
    'SCAPIN. — Eh, Monsieur ! Le Turc ne prendra jamais un pauvre misérable comme moi à la place de votre fils.',
    'GÉRONTE. — Que diable allait-il faire dans cette galère ? (Il sort lentement sa bourse, la tend à Scapin, puis la retient.) Tiens, va racheter mon fils.',
    'SCAPIN. — Il faudrait d’abord, Monsieur, que vous lâchiez la bourse…',
    'GÉRONTE, lâchant enfin la bourse et sortant en grommelant. — Ah ! maudite galère ! Traître de Turc !',
    'SCAPIN, seul. — Voilà cinq cents écus qui vont tirer mon jeune maître d’embarras !'
   ],
   glossary:[{word:'galère',definition:'Grand navire de l’époque, qui avançait à la rame et à la voile.'},{word:'écus',definition:'Pièces de monnaie de l’époque. Cinq cents écus, c’est une très grosse somme.'},{word:'diantre',definition:'Juron ancien qui marque la surprise ou l’agacement.'},{word:'bourse',definition:'Petit sac où l’on mettait son argent.'},{word:'grommelant',definition:'En se plaignant à voix basse, de mauvaise humeur.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_EXPLICIT'],difficulty:3,prompt:'Selon Scapin, qu’est-il arrivé à Léandre ?',choices:['Il a été emmené en mer sur une galère turque','Il s’est perdu dans la forêt','Il est tombé malade'],ans:0,evidenceParagraph:1,explanation:'« ...nous sommes montés visiter une galère turque [...] la galère a pris la mer ! »'},
    {id:'q2',type:'choice',competencies:['READ_EXPLICIT'],difficulty:3,prompt:'Combien le Turc réclame-t-il ?',choices:['Cinq cents écus','Cinquante écus','Mille écus'],ans:0,evidenceParagraph:2,explanation:'« ...si vous ne lui envoyez pas tout de suite cinq cents écus... »'},
    {id:'q3',type:'choice',competencies:['READ_CHARACTER','READ_INFERENCE'],difficulty:5,prompt:'Quel défaut de Géronte cette scène montre-t-elle ?',choices:['Il est avare : il a du mal à donner son argent, même pour sauver son fils','Il est peureux : il a peur des Turcs','Il est paresseux'],ans:0,evidenceParagraph:7,explanation:'Il cherche d’autres solutions et retient sa bourse au moment de la donner : il tient trop à son argent.'},
    {id:'q4',type:'choice',competencies:['READ_GENRE'],difficulty:5,prompt:'Géronte répète plusieurs fois « Que diable allait-il faire dans cette galère ? ». Comment appelle-t-on ce procédé qui fait rire ?',choices:['Le comique de répétition','Une didascalie','Un monologue'],ans:0,evidenceParagraph:3,explanation:'La même réplique revient plusieurs fois : c’est le comique de répétition.'},
    {id:'q5',type:'evidence',competencies:['READ_JUSTIFY','READ_GENRE'],difficulty:5,prompt:'Clique sur la réplique qui contient une didascalie montrant que Géronte hésite à donner son argent.',evidenceParagraph:7,explanation:'« (Il sort lentement sa bourse, la tend à Scapin, puis la retient.) » : la didascalie indique les gestes de l’acteur.'},
    {id:'q6',type:'choice',competencies:['READ_INFERENCE'],difficulty:6,prompt:'Pourquoi Géronte propose-t-il que Scapin prenne la place de son fils ?',choices:['Pour gagner du temps et ne pas payer tout de suite','Parce qu’il veut se débarrasser de Scapin','Parce que Scapin le lui a demandé'],ans:0,evidenceParagraph:5,explanation:'Il cherche une solution « en attendant que j’aie trouvé l’argent » : il veut retarder le paiement.'},
    {id:'q7',type:'choice',competencies:['READ_INFERENCE','READ_JUSTIFY'],difficulty:6,prompt:'L’histoire de la galère est-elle vraie ?',choices:['Non, c’est une ruse de Scapin pour obtenir l’argent','Oui, Léandre est vraiment prisonnier','On ne peut pas le savoir'],ans:0,evidenceParagraph:10,explanation:'Seul, Scapin se réjouit : l’argent va « tirer [son] jeune maître d’embarras ». C’était une fourberie, comme l’annonce le titre de la pièce.'},
    {id:'q8',type:'choice',competencies:['READ_AUTHOR_INTENT','READ_GENRE'],difficulty:5,prompt:'Que cherche surtout Molière dans cette scène ?',choices:['Faire rire en se moquant de l’avarice','Faire peur aux spectateurs','Raconter un vrai fait divers'],ans:0,explanation:'C’est une comédie : Molière fait rire de l’avare qui préfère son argent à son fils.'}
   ]
  },

  fr_5e_ile_esclaves_01:{
   id:'fr_5e_ile_esclaves_01',level:'5e',subject:'francais',type:'literary_text',documentType:'comédie (extrait adapté)',
   title:'L’Île des esclaves',author:'Marivaux',work:'L’Île des esclaves (1725)',
   sourceType:'public_domain',sourceReference:'Adaptation libre et abrégée pour la 5e des scènes 1 et 2, d’après Marivaux (mort en 1763), dans le domaine public.',
   chapterLinks:['fr5f'],
   competencies:['READ_PLACE','READ_EXPLICIT','READ_EMOTION_INTENTION','READ_CHARACTER','READ_REFERENCE','READ_AUTHOR_INTENT','READ_INFERENCE','READ_GENRE','READ_CAUSE_CONSEQUENCE'],
   difficulty:6,estimatedReadingMinutes:3,audioMode:'audioAllowed',sessionSize:8,
   paragraphs:[
    '(Sur une île, juste après un naufrage. Iphicrate, un maître athénien, et Arlequin, son esclave.)',
    'IPHICRATE. — Ne perdons pas de temps, Arlequin : il faut quitter cette île au plus vite. Elle est habitée par des esclaves révoltés, et l’on dit qu’ils s’en prennent aux maîtres !',
    'ARLEQUIN, buvant tranquillement à sa gourde. — Eh bien, chacun son tour, mon cher patron. Moi, je trouve cette île tout à fait charmante.',
    'TRIVELIN, arrivant avec des habitants. — Rassurez-vous, on ne vous fera pas de mal. Mais nous avons une loi : ici, le maître devient l’esclave, et l’esclave devient le maître. Vous allez échanger vos noms et vos habits.',
    'IPHICRATE. — Quoi ! Moi, obéir à mon esclave ? C’est le monde à l’envers !',
    'TRIVELIN. — Ce n’est pas pour vous punir, c’est pour vous corriger. Vous avez été dur et méprisant : en vivant à sa place, vous sentirez ce que vous lui avez fait souffrir. Quand vous serez devenu humain et juste, vous pourrez rentrer à Athènes.',
    'ARLEQUIN, à Iphicrate. — Allons, Arlequin ! Car c’est maintenant ton nom. Et moi, je m’appelle Monsieur Iphicrate.'
   ],
   glossary:[{word:'naufrage',definition:'Accident d’un bateau qui coule.'},{word:'athénien',definition:'Qui vient d’Athènes, en Grèce.'},{word:'révoltés',definition:'Qui se sont soulevés contre ceux qui les commandaient.'},{word:'méprisant',definition:'Qui traite les autres comme s’ils ne valaient rien.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_PLACE'],difficulty:3,prompt:'Où se passe la scène ?',choices:['Sur une île, après un naufrage','Dans un palais à Athènes','Sur un bateau en pleine mer'],ans:0,evidenceParagraph:0,explanation:'La didascalie du début l’indique : « Sur une île, juste après un naufrage. »'},
    {id:'q2',type:'choice',competencies:['READ_EXPLICIT'],difficulty:4,prompt:'Quelle est la loi de l’île ?',choices:['Le maître devient l’esclave et l’esclave devient le maître','Les maîtres sont jetés à la mer','Tout le monde doit travailler aux champs'],ans:0,evidenceParagraph:3,explanation:'« ...ici, le maître devient l’esclave, et l’esclave devient le maître. »'},
    {id:'q3',type:'choice',competencies:['READ_EMOTION_INTENTION'],difficulty:4,prompt:'Comment réagit Iphicrate en apprenant cette loi ?',choices:['Il est indigné','Il est ravi','Il est indifférent'],ans:0,evidenceParagraph:4,explanation:'« Quoi ! Moi, obéir à mon esclave ? » : les exclamations montrent son indignation.'},
    {id:'q4',type:'choice',competencies:['READ_CHARACTER','READ_INFERENCE'],difficulty:5,prompt:'Que montre l’attitude d’Arlequin quand il boit tranquillement à sa gourde ?',choices:['Il n’a pas peur : il devine que la situation va tourner à son avantage','Il a très soif après le naufrage, rien de plus','Il veut s’enfuir au plus vite'],ans:0,evidenceParagraph:2,explanation:'Il reste calme et dit « chacun son tour » : il comprend que, sur cette île, c’est son maître qui risque quelque chose.'},
    {id:'q5',type:'choice',competencies:['READ_CAUSE_CONSEQUENCE','READ_EXPLICIT'],difficulty:5,prompt:'Selon Trivelin, à quoi sert l’échange des rôles ?',choices:['À corriger les maîtres en leur faisant vivre ce qu’ont subi leurs esclaves','À punir les maîtres pour toujours','À faire travailler les esclaves davantage'],ans:0,evidenceParagraph:5,explanation:'« Ce n’est pas pour vous punir, c’est pour vous corriger. »'},
    {id:'q6',type:'choice',competencies:['READ_REFERENCE'],difficulty:5,prompt:'À la fin, Arlequin dit « Allons, Arlequin ! ». À qui parle-t-il ?',choices:['À Iphicrate, qui porte désormais ce nom','À lui-même','À Trivelin'],ans:0,evidenceParagraph:6,explanation:'Les noms ont été échangés : Iphicrate s’appelle maintenant Arlequin.'},
    {id:'q7',type:'choice',competencies:['READ_GENRE','READ_INFERENCE'],difficulty:5,prompt:'Pourquoi peut-on dire que cette pièce met la société « sens dessus dessous » ?',choices:['Les rôles du maître et du serviteur sont inversés','Les personnages marchent sur la tête','La pièce se passe sous la mer'],ans:0,evidenceParagraph:4,explanation:'Iphicrate le dit lui-même : « C’est le monde à l’envers ! »'},
    {id:'q8',type:'choice',competencies:['READ_AUTHOR_INTENT'],difficulty:7,prompt:'Que veut faire réfléchir Marivaux à travers cette situation ?',choices:['À la façon dont les puissants traitent ceux qui les servent','Au danger des voyages en bateau','À la meilleure manière de construire une île'],ans:0,explanation:'En inversant les rôles, Marivaux invite les spectateurs à se demander si les maîtres sont justes et humains.'}
   ]
  },

  fr_5e_heureux_ulysse_01:{
   id:'fr_5e_heureux_ulysse_01',level:'5e',subject:'francais',type:'literary_text',documentType:'poème (sonnet)',
   title:'Heureux qui, comme Ulysse…',author:'Joachim du Bellay',work:'Les Regrets, sonnet XXXI (1558)',
   sourceType:'public_domain',sourceReference:'Texte original de Joachim du Bellay (mort en 1560), dans le domaine public, en orthographe modernisée.',
   chapterLinks:['fr5e'],verse:true,stanzas:[4,8,11],
   competencies:['READ_CHARACTER','READ_EMOTION_INTENTION','READ_VOCAB_CONTEXT','READ_STRUCTURE','READ_GENRE','READ_INFERENCE','READ_JUSTIFY','READ_PLACE'],
   difficulty:6,estimatedReadingMinutes:3,audioMode:'audioRecommended',sessionSize:8,
   paragraphs:[
    'Heureux qui, comme Ulysse, a fait un beau voyage,',
    'Ou comme cestuy-là qui conquit la toison,',
    'Et puis est retourné, plein d’usage et raison,',
    'Vivre entre ses parents le reste de son âge !',
    'Quand reverrai-je, hélas, de mon petit village',
    'Fumer la cheminée, et en quelle saison',
    'Reverrai-je le clos de ma pauvre maison,',
    'Qui m’est une province, et beaucoup davantage ?',
    'Plus me plaît le séjour qu’ont bâti mes aïeux,',
    'Que des palais romains le front audacieux,',
    'Plus que le marbre dur me plaît l’ardoise fine :',
    'Plus mon Loire gaulois, que le Tibre latin,',
    'Plus mon petit Liré, que le mont Palatin,',
    'Et plus que l’air marin la douceur angevine.'
   ],
   glossary:[{word:'cestuy-là',definition:'« Celui-là », en ancien français : ici, Jason, le héros qui conquit la Toison d’or.'},{word:'toison',definition:'Le pelage d’un mouton. La Toison d’or est un trésor de la mythologie grecque.'},{word:'usage',definition:'Ici : l’expérience de la vie.'},{word:'clos',definition:'Un terrain entouré d’une clôture ou d’un mur.'},{word:'aïeux',definition:'Les ancêtres.'},{word:'angevine',definition:'De l’Anjou, la région natale du poète.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_CHARACTER'],difficulty:5,prompt:'Qu’ont en commun Ulysse et « cestuy-là qui conquit la toison » ?',choices:['Ce sont des héros qui sont rentrés chez eux après un long voyage','Ce sont deux poètes romains','Ce sont des habitants de Liré'],ans:0,evidenceParagraph:2,explanation:'Ulysse et Jason ont voyagé, puis « [sont] retourné[s] » vivre chez eux : le poète les trouve « heureux ».'},
    {id:'q2',type:'choice',competencies:['READ_EMOTION_INTENTION'],difficulty:5,prompt:'Quel sentiment le poète exprime-t-il ?',choices:['La nostalgie : le regret de son pays natal','La joie de découvrir Rome','La peur de voyager'],ans:0,evidenceParagraph:4,explanation:'« Quand reverrai-je, hélas, de mon petit village... » : il souffre d’être loin de chez lui.'},
    {id:'q3',type:'choice',competencies:['READ_INFERENCE','READ_PLACE'],difficulty:6,prompt:'Où se trouve probablement le poète quand il écrit ?',choices:['Loin de chez lui, à Rome','Dans son village de Liré','Sur le bateau d’Ulysse'],ans:0,evidenceParagraph:9,explanation:'Il compare sans cesse son village aux « palais romains », au « Tibre » et au « mont Palatin », qu’il a sous les yeux. Du Bellay a vécu quatre ans à Rome.'},
    {id:'q4',type:'choice',competencies:['READ_STRUCTURE','READ_PLACE'],difficulty:6,prompt:'Dans les tercets, quels lieux le poète oppose-t-il ?',choices:['Rome et son Anjou natal','Paris et Londres','La mer et la montagne'],ans:0,evidenceParagraph:12,explanation:'« Plus mon petit Liré, que le mont Palatin » : chaque vers oppose un élément de son pays à un élément de Rome.'},
    {id:'q5',type:'choice',competencies:['READ_INFERENCE'],difficulty:7,prompt:'Pourquoi préfère-t-il « l’ardoise fine » au « marbre dur » ?',choices:['Ce qui est simple et familier compte plus pour lui que ce qui est grandiose','L’ardoise coûte plus cher que le marbre','Il n’a jamais vu de marbre'],ans:0,evidenceParagraph:10,explanation:'Le marbre des palais romains est impressionnant, mais l’ardoise des toits de chez lui lui est plus chère au cœur.'},
    {id:'q6',type:'choice',competencies:['READ_VOCAB_CONTEXT'],difficulty:5,prompt:'Dans « Vivre entre ses parents », que veut dire « parents » ?',choices:['Sa famille et ses proches','Seulement son père et sa mère','Ses amis de voyage'],ans:0,evidenceParagraph:3,explanation:'À l’époque, « parents » désignait toute la famille.'},
    {id:'q7',type:'choice',competencies:['READ_GENRE'],difficulty:5,prompt:'Ce poème de 14 vers, formé de deux strophes de 4 vers puis deux de 3 vers, est...',choices:['Un sonnet','Une fable','Une chanson'],ans:0,explanation:'Deux quatrains et deux tercets : c’est la forme du sonnet.'},
    {id:'q8',type:'evidence',competencies:['READ_JUSTIFY'],difficulty:6,prompt:'Clique sur le vers où le poète dit que sa maison compte plus pour lui qu’une région entière.',evidenceParagraph:7,explanation:'« Qui m’est une province, et beaucoup davantage ? »'}
   ]
  },

  fr_4e_mignonne_rose_01:{
   id:'fr_4e_mignonne_rose_01',level:'4e',subject:'francais',type:'literary_text',documentType:'poème (ode)',
   title:'Mignonne, allons voir si la rose…',author:'Pierre de Ronsard',work:'Odes, « À Cassandre »',
   sourceType:'public_domain',sourceReference:'Texte original de Pierre de Ronsard (mort en 1585), dans le domaine public, en orthographe modernisée.',
   chapterLinks:['fr4a'],verse:true,stanzas:[6,12],
   competencies:['READ_CHARACTER','READ_VOCAB_CONTEXT','READ_EXPLICIT','READ_AUTHOR_INTENT','READ_STRUCTURE','READ_SEQUENCE','READ_JUSTIFY','READ_INFERENCE'],
   difficulty:6,estimatedReadingMinutes:3,audioMode:'audioRecommended',sessionSize:8,
   paragraphs:[
    'Mignonne, allons voir si la rose',
    'Qui ce matin avait déclose',
    'Sa robe de pourpre au soleil,',
    'A point perdu cette vesprée',
    'Les plis de sa robe pourprée,',
    'Et son teint au vôtre pareil.',
    'Las ! voyez comme en peu d’espace,',
    'Mignonne, elle a dessus la place,',
    'Las, las ses beautés laissé choir !',
    'Ô vraiment marâtre Nature,',
    'Puisqu’une telle fleur ne dure',
    'Que du matin jusques au soir !',
    'Donc, si vous me croyez, mignonne,',
    'Tandis que votre âge fleuronne',
    'En sa plus verte nouveauté,',
    'Cueillez, cueillez votre jeunesse :',
    'Comme à cette fleur la vieillesse',
    'Fera ternir votre beauté.'
   ],
   glossary:[{word:'déclose',definition:'Ouverte, épanouie.'},{word:'pourpre',definition:'Rouge foncé.'},{word:'vesprée',definition:'Le soir.'},{word:'Las',definition:'Hélas.'},{word:'choir',definition:'Tomber.'},{word:'marâtre',definition:'Une belle-mère cruelle, comme dans les contes.'},{word:'fleuronne',definition:'Fleurit, est en pleine floraison.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_CHARACTER'],difficulty:4,prompt:'À qui le poète s’adresse-t-il ?',choices:['À une jeune femme qu’il appelle « Mignonne »','À une rose','À la Nature'],ans:0,evidenceParagraph:0,explanation:'Il s’adresse à « Mignonne », une jeune femme, et la vouvoie.'},
    {id:'q2',type:'choice',competencies:['READ_INFERENCE'],difficulty:5,prompt:'À quoi la jeune femme est-elle comparée ?',choices:['À la rose','Au soleil','À la nuit'],ans:0,evidenceParagraph:5,explanation:'Le teint de la rose est « au vôtre pareil » : la femme et la fleur se ressemblent.'},
    {id:'q3',type:'choice',competencies:['READ_EXPLICIT'],difficulty:4,prompt:'Qu’est-il arrivé à la rose le soir ?',choices:['Elle a perdu ses pétales et sa beauté','Elle s’est encore plus ouverte','Quelqu’un l’a cueillie'],ans:0,evidenceParagraph:8,explanation:'« ...ses beautés laissé choir ! » : ses pétales sont tombés en une seule journée.'},
    {id:'q4',type:'choice',competencies:['READ_VOCAB_CONTEXT'],difficulty:6,prompt:'Pourquoi le poète traite-t-il la Nature de « marâtre » ?',choices:['Parce qu’elle est cruelle : elle laisse la beauté mourir si vite','Parce qu’elle est la mère des fleurs','Parce qu’elle fait pousser les roses'],ans:0,evidenceParagraph:9,explanation:'Une marâtre est une belle-mère méchante : la Nature est cruelle, car une si belle fleur ne vit « que du matin jusques au soir ».'},
    {id:'q5',type:'evidence',competencies:['READ_JUSTIFY'],difficulty:5,prompt:'Clique sur le vers qui contient le conseil principal du poète.',evidenceParagraph:15,explanation:'« Cueillez, cueillez votre jeunesse » : l’impératif répété donne le conseil.'},
    {id:'q6',type:'choice',competencies:['READ_AUTHOR_INTENT'],difficulty:7,prompt:'Quel est le message du poème ?',choices:['La jeunesse passe vite : il faut en profiter sans attendre','Il faut planter beaucoup de roses','La vieillesse est le plus bel âge'],ans:0,evidenceParagraph:16,explanation:'Comme la rose, la beauté se fanera : profite du moment présent. On appelle ce thème le « carpe diem ».'},
    {id:'q7',type:'order',competencies:['READ_STRUCTURE','READ_SEQUENCE'],difficulty:6,prompt:'Remets dans l’ordre les trois étapes du poème.',tokens:['Une invitation à aller voir la rose','Le constat que la rose est déjà fanée','Le conseil de profiter de sa jeunesse'],ans:'Une invitation à aller voir la rose Le constat que la rose est déjà fanée Le conseil de profiter de sa jeunesse',explanation:'Chaque strophe correspond à une étape : invitation, constat, conseil (annoncé par « Donc »).'},
    {id:'q8',type:'choice',competencies:['READ_VOCAB_CONTEXT'],difficulty:5,prompt:'« Tandis que votre âge fleuronne / En sa plus verte nouveauté » signifie...',choices:['Pendant que vous êtes encore toute jeune','Pendant que vous jardinez','Quand vous serez vieille'],ans:0,evidenceParagraph:13,explanation:'L’âge qui « fleuronne » dans sa « plus verte nouveauté », c’est la pleine jeunesse.'}
   ]
  },

  fr_4e_candide_surinam_01:{
   id:'fr_4e_candide_surinam_01',level:'4e',subject:'francais',type:'literary_text',documentType:'conte philosophique (extrait adapté)',
   title:'Le prix du sucre',author:'Voltaire',work:'Candide ou l’Optimisme (1759), chapitre 19',
   sourceType:'public_domain',sourceReference:'Adaptation libre et abrégée pour la 4e, d’après Voltaire (mort en 1778), dans le domaine public. Les répliques principales sont conservées ; le vocabulaire de l’époque désignant l’homme réduit en esclavage a été remplacé.',
   chapterLinks:['fr4b'],
   competencies:['READ_PLACE','READ_CAUSE_CONSEQUENCE','READ_INFERENCE','READ_AUTHOR_INTENT','READ_VOCAB_CONTEXT','READ_EMOTION_INTENTION','READ_JUSTIFY','READ_ARGUMENT'],
   difficulty:7,estimatedReadingMinutes:3,audioMode:'audioAllowed',sessionSize:8,
   paragraphs:[
    'En approchant de la ville de Surinam, en Amérique du Sud, Candide et son valet Cacambo rencontrent un homme noir étendu par terre. Il ne porte plus qu’un caleçon de toile bleue ; il manque à ce pauvre homme la jambe gauche et la main droite.',
    '« Eh, mon Dieu ! lui dit Candide, que fais-tu là, mon ami, dans l’état horrible où je te vois ? » L’homme répond qu’il attend son maître, M. Vanderdendur, le fameux négociant.',
    '« Est-ce lui qui t’a traité ainsi ? — Oui, monsieur, c’est l’usage. Quand nous travaillons aux sucreries et que la meule nous attrape le doigt, on nous coupe la main ; quand nous voulons nous enfuir, on nous coupe la jambe. Je me suis trouvé dans les deux cas. C’est à ce prix que vous mangez du sucre en Europe. »',
    '« Ô Pangloss ! s’écrie Candide, tu n’avais pas deviné cette abomination ; c’en est fait, il faudra qu’enfin je renonce à ton optimisme.',
    '— Qu’est-ce qu’optimisme ? demande Cacambo. — Hélas ! répond Candide, c’est la rage de soutenir que tout est bien quand on est mal. »',
    'Et il versa des larmes en regardant le malheureux.'
   ],
   glossary:[{word:'négociant',definition:'Un riche commerçant.'},{word:'sucreries',definition:'Les ateliers où l’on fabrique le sucre à partir de la canne à sucre.'},{word:'meule',definition:'Grosse roue de pierre qui écrase la canne à sucre.'},{word:'abomination',definition:'Une chose horrible, révoltante.'},{word:'Pangloss',definition:'Le maître de Candide, qui lui répétait que « tout est au mieux » dans le monde.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_PLACE'],difficulty:4,prompt:'Où se passe cette scène ?',choices:['Près de Surinam, en Amérique du Sud','En Europe','En Afrique'],ans:0,evidenceParagraph:0,explanation:'« En approchant de la ville de Surinam, en Amérique du Sud... »'},
    {id:'q2',type:'choice',competencies:['READ_CAUSE_CONSEQUENCE'],difficulty:5,prompt:'Pourquoi a-t-on coupé la jambe de l’homme ?',choices:['Parce qu’il a essayé de s’enfuir','Parce qu’il a eu un accident à la meule','Parce qu’il était malade'],ans:0,evidenceParagraph:2,explanation:'« ...quand nous voulons nous enfuir, on nous coupe la jambe. » (La main, elle, a été coupée après l’accident à la meule.)'},
    {id:'q3',type:'choice',competencies:['READ_INFERENCE'],difficulty:7,prompt:'Que signifie « C’est à ce prix que vous mangez du sucre en Europe » ?',choices:['Le sucre des Européens est produit grâce à la souffrance des esclaves','Le sucre coûte très cher en Europe','Les esclaves achètent le sucre aux Européens'],ans:0,evidenceParagraph:2,explanation:'Le « prix » n’est pas de l’argent : c’est la main et la jambe de cet homme. Voltaire rend les lecteurs européens complices.'},
    {id:'q4',type:'choice',competencies:['READ_INFERENCE','READ_ARGUMENT'],difficulty:7,prompt:'L’homme dit « c’est l’usage ». Qu’est-ce que cela révèle ?',choices:['Ces violences sont si fréquentes qu’elles semblent normales','Il approuve ce qu’on lui a fait','C’est une règle de politesse'],ans:0,evidenceParagraph:2,explanation:'Ces mutilations sont devenues une habitude : c’est justement ce qui rend le système révoltant.'},
    {id:'q5',type:'choice',competencies:['READ_VOCAB_CONTEXT'],difficulty:5,prompt:'D’après Candide, qu’est-ce que l’optimisme ?',choices:['S’obstiner à dire que tout va bien quand tout va mal','Être toujours de bonne humeur','Croire que demain sera meilleur'],ans:0,evidenceParagraph:4,explanation:'« ...c’est la rage de soutenir que tout est bien quand on est mal. »'},
    {id:'q6',type:'choice',competencies:['READ_EMOTION_INTENTION'],difficulty:4,prompt:'Comment Candide réagit-il ?',choices:['Il est bouleversé et pleure','Il se moque de l’homme','Il ne remarque rien'],ans:0,evidenceParagraph:5,explanation:'« Et il versa des larmes en regardant le malheureux. »'},
    {id:'q7',type:'evidence',competencies:['READ_JUSTIFY'],difficulty:5,prompt:'Clique sur le paragraphe où Candide remet en cause ce que son maître lui a appris.',evidenceParagraph:3,explanation:'« ...il faudra qu’enfin je renonce à ton optimisme. »'},
    {id:'q8',type:'choice',competencies:['READ_AUTHOR_INTENT','READ_ARGUMENT'],difficulty:7,prompt:'Que veut dénoncer Voltaire dans ce passage ?',choices:['L’esclavage et la cruauté de ceux qui en profitent','Les dangers des voyages','La paresse des valets'],ans:0,explanation:'En montrant les mutilations et en citant le sucre que mangent les Européens, Voltaire dénonce l’esclavage.'}
   ]
  },

  fr_4e_photo_legende_01:{
   id:'fr_4e_photo_legende_01',level:'4e',subject:'francais',type:'document',documentType:'texte documentaire (éducation aux médias)',
   title:'Une photo, deux légendes',author:null,work:null,sourceType:'original_mathquest',
   sourceReference:'Document original Finot Académie. L’exemple de la photographie et des deux journaux est imaginé pour l’exercice.',
   chapterLinks:['fr4g'],
   competencies:['READ_MAIN_IDEA','READ_EXPLICIT','READ_COMPARE_DOCUMENTS','READ_VOCAB_CONTEXT','READ_INFERENCE','READ_DOCUMENT_SOURCE','READ_JUSTIFY'],
   difficulty:6,estimatedReadingMinutes:3,audioMode:'audioAllowed',sessionSize:8,
   paragraphs:[
    'Imaginons une photographie prise pendant une manifestation, sur la place d’une ville. On y voit, en gros plan, une trentaine de personnes serrées les unes contre les autres, qui brandissent des pancartes sous la pluie.',
    'Le journal A publie la photo avec cette légende : « Une foule immense envahit le centre-ville ». Le journal B choisit une autre légende : « Quelques dizaines de manifestants bravent la pluie ».',
    'Les deux journaux utilisent pourtant la même image. Mais la légende oriente notre regard : « foule immense » nous fait imaginer des milliers de personnes, alors que « quelques dizaines » souligne au contraire leur petit nombre.',
    'Le cadrage compte aussi. Un gros plan sur un groupe serré donne l’impression d’une foule nombreuse. Une photo prise de plus loin aurait peut-être montré une place presque vide autour des manifestants.',
    'Pour se faire une idée juste, il faut donc observer l’image elle-même, lire la légende avec un œil critique, et comparer plusieurs sources avant de se forger une opinion.'
   ],
   glossary:[{word:'légende',definition:'Ici : le court texte placé sous une photo pour dire ce qu’elle montre.'},{word:'bravent',definition:'Affrontent sans avoir peur.'},{word:'cadrage',definition:'Ce que le photographe choisit de faire entrer dans l’image, et ce qu’il laisse en dehors.'},{word:'gros plan',definition:'Une image prise de très près.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_MAIN_IDEA'],difficulty:5,prompt:'Quelle est l’idée principale du document ?',choices:['La légende et le cadrage peuvent changer ce qu’on croit voir sur une photo','Les manifestations ont toujours lieu sous la pluie','Le journal A est meilleur que le journal B'],ans:0,explanation:'Tout le texte montre comment une même image peut être présentée de façons différentes.'},
    {id:'q2',type:'choice',competencies:['READ_EXPLICIT'],difficulty:4,prompt:'Combien de personnes voit-on vraiment sur la photo ?',choices:['Une trentaine','Des milliers','Personne'],ans:0,evidenceParagraph:0,explanation:'« On y voit, en gros plan, une trentaine de personnes... »'},
    {id:'q3',type:'choice',competencies:['READ_COMPARE_DOCUMENTS'],difficulty:5,prompt:'Quelle légende exagère ce que montre la photo ?',choices:['Celle du journal A, « Une foule immense »','Celle du journal B','Aucune des deux'],ans:0,evidenceParagraph:2,explanation:'Une trentaine de personnes, ce n’est pas une « foule immense ».'},
    {id:'q4',type:'choice',competencies:['READ_COMPARE_DOCUMENTS'],difficulty:4,prompt:'Qu’ont en commun les deux articles ?',choices:['Ils utilisent la même photo','Ils ont la même légende','Ils ont été écrits par le même journaliste'],ans:0,evidenceParagraph:2,explanation:'« Les deux journaux utilisent pourtant la même image. »'},
    {id:'q5',type:'choice',competencies:['READ_VOCAB_CONTEXT'],difficulty:5,prompt:'Dans ce texte, le « cadrage » d’une photo, c’est...',choices:['Ce que le photographe choisit de montrer ou de laisser hors de l’image','Le cadre doré autour de la photo','Le nom du photographe'],ans:0,evidenceParagraph:3,explanation:'Le texte explique qu’un gros plan et une vue de loin ne montrent pas la même chose.'},
    {id:'q6',type:'evidence',competencies:['READ_JUSTIFY'],difficulty:5,prompt:'Clique sur le paragraphe qui explique comment un gros plan peut tromper.',evidenceParagraph:3,explanation:'« Un gros plan sur un groupe serré donne l’impression d’une foule nombreuse. »'},
    {id:'q7',type:'choice',competencies:['READ_INFERENCE','READ_DOCUMENT_SOURCE'],difficulty:7,prompt:'Pourquoi un journal pourrait-il choisir la légende « Une foule immense » ?',choices:['Pour donner plus d’importance à l’événement','Parce qu’il a compté les personnes une par une','Parce que la loi l’oblige'],ans:0,evidenceParagraph:2,explanation:'La légende oriente le regard : elle peut grossir un événement pour attirer l’attention ou soutenir une cause.'},
    {id:'q8',type:'choice',competencies:['READ_DOCUMENT_SOURCE'],difficulty:5,prompt:'Que conseille le texte pour se faire une idée juste ?',choices:['Observer l’image, lire la légende avec un œil critique et comparer plusieurs sources','Croire le premier journal que l’on lit','Ne jamais regarder de photos'],ans:0,evidenceParagraph:4,explanation:'C’est le conseil donné dans le dernier paragraphe.'}
   ]
  },

  fr_3e_peigne_casse_01:{
   id:'fr_3e_peigne_casse_01',level:'3e',subject:'francais',type:'literary_text',documentType:'autobiographie (extrait adapté)',
   title:'Le peigne cassé',author:'Jean-Jacques Rousseau',work:'Les Confessions, livre I',
   sourceType:'public_domain',sourceReference:'Adaptation libre et abrégée pour la 3e, d’après Jean-Jacques Rousseau (mort en 1778), dans le domaine public.',
   chapterLinks:['fr3a','fr3i'],
   competencies:['READ_NARRATOR_POV','READ_EXPLICIT','READ_CAUSE_CONSEQUENCE','READ_TIME','READ_EMOTION_INTENTION','READ_INFERENCE','READ_JUSTIFY','READ_GENRE','READ_STRUCTURE','READ_AUTHOR_INTENT'],
   difficulty:7,estimatedReadingMinutes:3,audioMode:'audioAllowed',sessionSize:8,
   paragraphs:[
    'J’étais alors un enfant, en pension chez le pasteur Lambercier et sa sœur, à Bossey, près de Genève. Un jour, j’apprenais seul ma leçon dans la chambre voisine de la cuisine.',
    'La servante avait mis à sécher sur le poêle les peignes de Mlle Lambercier. Quand elle revint les prendre, l’un d’eux avait toute une rangée de dents cassées.',
    'Personne d’autre que moi n’était entré dans la pièce. On m’interroge ; je nie avoir touché le peigne. On ne me croit pas. On me menace, on écrit à mon oncle, on me punit sévèrement.',
    'Je résistai à tout. Je préférais souffrir plutôt que d’avouer une faute que je n’avais pas commise.',
    'Il y a maintenant près de cinquante ans de cette aventure, et je déclare encore aujourd’hui que j’étais innocent. Ce fut ma première rencontre avec l’injustice, et ce jour-là prit fin la sérénité de mon enfance.'
   ],
   glossary:[{word:'pension',definition:'Ici : logé et nourri chez quelqu’un qui s’occupe aussi de son éducation.'},{word:'pasteur',definition:'Le responsable religieux d’une communauté protestante.'},{word:'poêle',definition:'Ici (au masculin) : un appareil de chauffage.'},{word:'sérénité',definition:'Le calme, la paix intérieure.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_NARRATOR_POV','READ_GENRE'],difficulty:6,prompt:'Qui raconte cette histoire ?',choices:['Rousseau lui-même, qui raconte sa propre enfance','Mlle Lambercier','Un narrateur extérieur qui ne participe pas à l’histoire'],ans:0,evidenceParagraph:0,explanation:'Le narrateur dit « je » et raconte sa vie : l’auteur, le narrateur et le personnage sont la même personne. C’est une autobiographie.'},
    {id:'q2',type:'choice',competencies:['READ_EXPLICIT'],difficulty:4,prompt:'Qu’est-ce qui a été abîmé ?',choices:['Un peigne de Mlle Lambercier','Un livre de leçons','Le poêle de la cuisine'],ans:0,evidenceParagraph:1,explanation:'« ...l’un d’eux avait toute une rangée de dents cassées. »'},
    {id:'q3',type:'choice',competencies:['READ_CAUSE_CONSEQUENCE'],difficulty:5,prompt:'Pourquoi accuse-t-on l’enfant ?',choices:['Parce qu’il était le seul à être entré dans la pièce','Parce qu’on l’a vu casser le peigne','Parce qu’il a avoué'],ans:0,evidenceParagraph:2,explanation:'« Personne d’autre que moi n’était entré dans la pièce. » Il n’y a aucune preuve, seulement une supposition.'},
    {id:'q4',type:'choice',competencies:['READ_TIME'],difficulty:6,prompt:'Combien de temps s’est écoulé entre l’événement et le moment où Rousseau l’écrit ?',choices:['Près de cinquante ans','Quelques jours','Un an'],ans:0,evidenceParagraph:4,explanation:'« Il y a maintenant près de cinquante ans de cette aventure... »'},
    {id:'q5',type:'choice',competencies:['READ_EMOTION_INTENTION','READ_INFERENCE'],difficulty:6,prompt:'Que montre le fait que Rousseau se déclare encore innocent cinquante ans plus tard ?',choices:['Cette injustice l’a profondément et durablement marqué','Il a oublié toute l’histoire','Il veut s’amuser de ce souvenir'],ans:0,evidenceParagraph:4,explanation:'Un demi-siècle après, il éprouve toujours le besoin de le dire : la blessure ne s’est pas refermée.'},
    {id:'q6',type:'evidence',competencies:['READ_JUSTIFY'],difficulty:6,prompt:'Clique sur le paragraphe qui montre la fermeté de l’enfant face à la punition.',evidenceParagraph:3,explanation:'« Je résistai à tout. Je préférais souffrir plutôt que d’avouer une faute que je n’avais pas commise. »'},
    {id:'q7',type:'choice',competencies:['READ_GENRE','READ_STRUCTURE'],difficulty:8,prompt:'Dans le troisième paragraphe, le récit passe au présent (« On m’interroge ; je nie »). Quel est l’effet produit ?',choices:['La scène semble se dérouler sous nos yeux, de manière vive et rapide','Cela montre que l’histoire se passe aujourd’hui','C’est une erreur de l’auteur'],ans:0,evidenceParagraph:2,explanation:'C’est le présent de narration : les phrases courtes au présent rendent l’accusation plus vivante et plus oppressante.'},
    {id:'q8',type:'choice',competencies:['READ_AUTHOR_INTENT'],difficulty:7,prompt:'Pourquoi Rousseau raconte-t-il cet épisode dans son autobiographie ?',choices:['Parce que c’est un moment qui a changé sa vie : sa première expérience de l’injustice','Pour donner une recette de nettoyage des peignes','Pour accuser la servante'],ans:0,evidenceParagraph:4,explanation:'« Ce fut ma première rencontre avec l’injustice, et ce jour-là prit fin la sérénité de mon enfance. »'}
   ]
  },

  fr_3e_antigone_01:{
   id:'fr_3e_antigone_01',level:'3e',subject:'francais',type:'literary_text',documentType:'tragédie (récit adapté)',
   title:'Antigone face à Créon',author:'Sophocle',work:'Antigone (Ve siècle av. J.-C.)',
   sourceType:'public_domain',sourceReference:'Adaptation libre et abrégée pour la 3e, d’après la tragédie de Sophocle (Ve siècle av. J.-C.), dans le domaine public — aucune traduction existante reprise.',
   chapterLinks:['fr3d'],
   competencies:['READ_CAUSE_CONSEQUENCE','READ_CHARACTER','READ_ARGUMENT','READ_JUSTIFY','READ_GENRE','READ_MAIN_IDEA','READ_INFERENCE'],
   difficulty:7,estimatedReadingMinutes:3,audioMode:'audioAllowed',sessionSize:8,
   paragraphs:[
    'À Thèbes, deux frères se sont entretués pour le pouvoir : Étéocle, qui défendait la ville, et Polynice, qui l’attaquait avec une armée étrangère. Leur oncle Créon, devenu roi, a fait proclamer un ordre : Étéocle aura des funérailles, mais le corps de Polynice, le traître, restera sans sépulture. Qui désobéira sera puni de mort.',
    'Antigone, leur sœur, ne peut accepter qu’on laisse son frère sans tombeau. Sa sœur Ismène refuse de l’aider : « Nous ne sommes que des femmes, nous ne pouvons pas lutter contre le roi. » Antigone y va seule et recouvre le corps d’une fine couche de poussière.',
    'Un garde la surprend et l’amène devant Créon. Le roi lui demande : « Connaissais-tu mon ordre ? » — « Je le connaissais. Comment l’ignorer ? Il était public. »',
    '« Et tu as osé l’enfreindre ? » — « Oui, car ce n’est pas Zeus qui l’avait proclamé. Ton ordre n’est qu’un ordre d’homme. Il ne peut pas l’emporter sur les lois non écrites des dieux, qui sont éternelles. »',
    'Créon s’emporte : « Si je laisse une jeune fille me désobéir sans la punir, ce n’est plus moi qui suis le roi, c’est elle ! Une cité ne tient debout que si l’on obéit à ses chefs. »',
    'Il la condamne à être enfermée vivante dans un tombeau creusé dans le roc.'
   ],
   glossary:[{word:'funérailles',definition:'La cérémonie pour enterrer un mort.'},{word:'sépulture',definition:'Le fait d’être enterré, ou le lieu où l’on est enterré.'},{word:'enfreindre',definition:'Ne pas respecter une loi, un ordre.'},{word:'cité',definition:'Dans la Grèce antique : une ville et son territoire, avec leurs lois.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_CAUSE_CONSEQUENCE'],difficulty:5,prompt:'Pourquoi Créon refuse-t-il une sépulture à Polynice ?',choices:['Parce que Polynice a attaqué Thèbes : Créon le considère comme un traître','Parce que Polynice était trop pauvre','Parce qu’Antigone le lui a demandé'],ans:0,evidenceParagraph:0,explanation:'Polynice « attaquait [la ville] avec une armée étrangère » : Créon le traite en traître.'},
    {id:'q2',type:'choice',competencies:['READ_CHARACTER'],difficulty:5,prompt:'Comment se comporte Ismène ?',choices:['Elle a peur et refuse de désobéir au roi','Elle aide Antigone à enterrer son frère','Elle dénonce Antigone au roi'],ans:0,evidenceParagraph:1,explanation:'« ...nous ne pouvons pas lutter contre le roi » : elle se soumet par crainte.'},
    {id:'q3',type:'choice',competencies:['READ_INFERENCE'],difficulty:6,prompt:'Antigone savait-elle qu’elle risquait la mort ?',choices:['Oui : l’ordre et la peine étaient publics, et elle les connaissait','Non : personne ne l’avait prévenue','Non : elle pensait que le roi l’épargnerait forcément'],ans:0,evidenceParagraph:2,explanation:'« Je le connaissais. Comment l’ignorer ? Il était public. » Et l’ordre précisait : « Qui désobéira sera puni de mort. »'},
    {id:'q4',type:'choice',competencies:['READ_ARGUMENT'],difficulty:7,prompt:'Quel argument Antigone oppose-t-elle à Créon ?',choices:['Les lois éternelles des dieux sont supérieures à l’ordre d’un homme','Elle ne savait pas que c’était interdit','Polynice n’était pas vraiment un traître'],ans:0,evidenceParagraph:3,explanation:'« Ton ordre n’est qu’un ordre d’homme. Il ne peut pas l’emporter sur les lois non écrites des dieux. »'},
    {id:'q5',type:'choice',competencies:['READ_ARGUMENT'],difficulty:7,prompt:'Quel argument Créon défend-il ?',choices:['L’ordre de la cité exige que chacun obéisse à ses chefs','Les dieux lui ont demandé de punir Antigone','Il veut se venger d’Ismène'],ans:0,evidenceParagraph:4,explanation:'« Une cité ne tient debout que si l’on obéit à ses chefs. »'},
    {id:'q6',type:'evidence',competencies:['READ_JUSTIFY'],difficulty:6,prompt:'Clique sur le paragraphe où Créon montre qu’il craint pour son autorité.',evidenceParagraph:4,explanation:'« ...ce n’est plus moi qui suis le roi, c’est elle ! »'},
    {id:'q7',type:'choice',competencies:['READ_MAIN_IDEA'],difficulty:7,prompt:'Quel conflit cette scène met-elle en scène ?',choices:['La conscience d’une personne face à la loi du pouvoir','Une dispute entre deux sœurs à propos d’un héritage','Une guerre entre deux cités'],ans:0,explanation:'Antigone obéit à sa conscience et aux dieux ; Créon défend la loi de l’État. Chacun a ses raisons.'},
    {id:'q8',type:'choice',competencies:['READ_GENRE'],difficulty:6,prompt:'Pourquoi cette histoire est-elle une tragédie ?',choices:['Les personnages sont pris dans un conflit sans issue qui mène à la mort','Elle se termine par un mariage joyeux','Elle fait rire le public'],ans:0,evidenceParagraph:5,explanation:'Ni Antigone ni Créon ne peuvent céder : le conflit conduit à la mort, c’est le propre de la tragédie.'}
   ]
  },

  fr_3e_nautilus_01:{
   id:'fr_3e_nautilus_01',level:'3e',subject:'francais',type:'literary_text',documentType:'roman d’anticipation (extrait adapté)',
   title:'L’âme du Nautilus',author:'Jules Verne',work:'Vingt mille lieues sous les mers (1870)',
   sourceType:'public_domain',sourceReference:'Adaptation libre et abrégée pour la 3e, d’après Jules Verne (mort en 1905), dans le domaine public.',
   chapterLinks:['fr3e'],
   competencies:['READ_NARRATOR_POV','READ_EXPLICIT','READ_REFERENCE','READ_TIME','READ_INFERENCE','READ_CHARACTER','READ_GENRE','READ_JUSTIFY'],
   difficulty:7,estimatedReadingMinutes:3,audioMode:'audioAllowed',sessionSize:8,
   paragraphs:[
    'Depuis quelques jours, j’étais l’hôte — ou plutôt le prisonnier — du capitaine Nemo, à bord du Nautilus. Ce jour-là, il accepta de m’expliquer comment fonctionnait son étonnant navire.',
    '« Professeur, me dit-il, il existe une force puissante, obéissante, rapide, qui se plie à tous les usages et règne en maître à mon bord. Tout se fait par elle. Elle m’éclaire, elle me chauffe, elle est l’âme de mes machines. Cette force, c’est l’électricité. »',
    'Je restai stupéfait. À notre époque, on ne savait utiliser l’électricité que pour de petites choses ; personne n’imaginait qu’elle pût faire avancer un navire aussi grand, à une telle vitesse.',
    '« Et comment la produisez-vous, en plein océan ? » demandai-je. Nemo sourit : « C’est la mer elle-même qui me fournit de quoi la fabriquer. Je ne dépends d’aucun pays de la Terre. »',
    'Il me fit ensuite visiter le grand salon, avec ses milliers de livres et ses immenses vitres, derrière lesquelles défilaient les poissons. Je compris que cet homme avait rompu tout lien avec le monde, et je me demandai quel secret le poussait à vivre ainsi sous les mers.'
   ],
   glossary:[{word:'hôte',definition:'Ici : celui qui est reçu chez quelqu’un, l’invité.'},{word:'stupéfait',definition:'Extrêmement étonné, au point de ne plus savoir quoi dire.'},{word:'rompu',definition:'Cassé, coupé.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_NARRATOR_POV'],difficulty:5,prompt:'Qui raconte l’histoire ?',choices:['Un professeur prisonnier à bord du Nautilus','Le capitaine Nemo','Un narrateur extérieur qui n’est pas à bord'],ans:0,evidenceParagraph:0,explanation:'Le narrateur dit « je » et Nemo l’appelle « Professeur » : c’est un personnage de l’histoire (le professeur Aronnax).'},
    {id:'q2',type:'choice',competencies:['READ_EXPLICIT'],difficulty:4,prompt:'Quelle énergie fait fonctionner le Nautilus ?',choices:['L’électricité','La vapeur','Le vent'],ans:0,evidenceParagraph:1,explanation:'« Cette force, c’est l’électricité. »'},
    {id:'q3',type:'choice',competencies:['READ_REFERENCE'],difficulty:5,prompt:'Dans « Elle m’éclaire, elle me chauffe », que désigne « elle » ?',choices:['L’électricité','La mer','La machine'],ans:0,evidenceParagraph:1,explanation:'« Elle » reprend « une force puissante », que Nemo nomme ensuite : l’électricité.'},
    {id:'q4',type:'choice',competencies:['READ_TIME','READ_INFERENCE'],difficulty:7,prompt:'Pourquoi le narrateur est-il « stupéfait » ?',choices:['Parce qu’à son époque on n’imaginait pas l’électricité assez puissante pour faire avancer un tel navire','Parce qu’il n’a jamais vu de bateau','Parce que Nemo lui a menti'],ans:0,evidenceParagraph:2,explanation:'« À notre époque, on ne savait utiliser l’électricité que pour de petites choses. » Le roman date de 1870.'},
    {id:'q5',type:'choice',competencies:['READ_CHARACTER','READ_INFERENCE'],difficulty:6,prompt:'Que révèle la phrase « Je ne dépends d’aucun pays de la Terre » sur Nemo ?',choices:['Il tient à sa liberté et vit à l’écart du monde','Il est perdu en mer','Il cherche un pays où s’installer'],ans:0,evidenceParagraph:3,explanation:'Nemo est fier d’être indépendant : le narrateur comprend qu’il « avait rompu tout lien avec le monde ».'},
    {id:'q6',type:'evidence',competencies:['READ_JUSTIFY'],difficulty:6,prompt:'Clique sur le paragraphe où le narrateur s’interroge sur le mystère de Nemo.',evidenceParagraph:4,explanation:'« ...je me demandai quel secret le poussait à vivre ainsi sous les mers. »'},
    {id:'q7',type:'choice',competencies:['READ_GENRE'],difficulty:6,prompt:'Pourquoi parle-t-on de « roman d’anticipation » ?',choices:['L’auteur imagine des techniques en avance sur son époque','Le roman raconte des faits historiques réels','Le roman se passe dans un passé très lointain'],ans:0,explanation:'En 1870, un grand sous-marin électrique relevait du rêve : Jules Verne anticipe les progrès de la science.'},
    {id:'q8',type:'choice',competencies:['READ_NARRATOR_POV','READ_INFERENCE'],difficulty:6,prompt:'Le narrateur se dit « l’hôte — ou plutôt le prisonnier » de Nemo. Que comprend-on ?',choices:['Il est bien traité, mais il ne peut pas quitter le navire','Il a été invité à une fête','Il est enfermé dans un cachot'],ans:0,evidenceParagraph:0,explanation:'Il est reçu comme un invité (on lui fait visiter le navire), mais il n’est pas libre de partir.'}
   ]
  },

  fr_3e_ecrans_soir_01:{
   id:'fr_3e_ecrans_soir_01',level:'3e',subject:'francais',type:'document',documentType:'texte argumentatif',
   title:'Faut-il éteindre les écrans le soir ?',author:null,work:null,sourceType:'original_mathquest',
   chapterLinks:['fr3g','fr3j'],
   competencies:['READ_ARGUMENT','READ_STRUCTURE','READ_AUTHOR_INTENT','READ_VOCAB_CONTEXT','READ_JUSTIFY','READ_MAIN_IDEA','READ_SEQUENCE'],
   difficulty:7,estimatedReadingMinutes:3,audioMode:'audioAllowed',sessionSize:8,
   paragraphs:[
    'Téléphone, tablette, console : les écrans occupent une grande place dans la vie des adolescents, souvent jusque tard le soir. Je pense pourtant qu’il faudrait les éteindre au moins une heure avant de dormir.',
    'D’abord, les écrans gênent le sommeil. Selon de nombreux spécialistes, leur lumière et les contenus qui nous tiennent en éveil retardent l’endormissement. Or un adolescent qui dort mal a plus de mal à se concentrer le lendemain en classe.',
    'Ensuite, cette heure sans écran laisse du temps pour autre chose : lire, discuter avec sa famille, préparer son sac. Par exemple, dix pages de roman chaque soir, cela fait plusieurs livres dans l’année.',
    'Certes, les écrans ne sont pas mauvais en eux-mêmes : ils permettent de garder le contact avec ses amis, de regarder un bon film ou même d’apprendre. Mais il ne s’agit pas de les interdire : il s’agit seulement de choisir le bon moment pour s’en servir.',
    'En conclusion, éteindre les écrans une heure avant de dormir est une habitude simple, qui permet de mieux dormir, de mieux apprendre et de profiter d’autres plaisirs.'
   ],
   glossary:[{word:'endormissement',definition:'Le moment où l’on s’endort.'},{word:'Certes',definition:'Mot qui sert à reconnaître qu’un argument adverse a du vrai, avant d’y répondre.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_ARGUMENT','READ_MAIN_IDEA'],difficulty:5,prompt:'Quelle est la thèse défendue par l’auteur ?',choices:['Il faudrait éteindre les écrans au moins une heure avant de dormir','Il faut interdire les écrans aux adolescents','Les écrans n’ont aucun effet sur le sommeil'],ans:0,evidenceParagraph:0,explanation:'« Je pense pourtant qu’il faudrait les éteindre au moins une heure avant de dormir. » (« Je pense » signale la thèse.)'},
    {id:'q2',type:'choice',competencies:['READ_ARGUMENT'],difficulty:5,prompt:'Quel est le premier argument ?',choices:['Les écrans gênent le sommeil','Les écrans coûtent cher','Les écrans abîment les yeux'],ans:0,evidenceParagraph:1,explanation:'« D’abord, les écrans gênent le sommeil. »'},
    {id:'q3',type:'choice',competencies:['READ_ARGUMENT','READ_STRUCTURE'],difficulty:6,prompt:'À quoi sert la phrase « dix pages de roman chaque soir, cela fait plusieurs livres dans l’année » ?',choices:['C’est un exemple qui illustre le deuxième argument','C’est la thèse de l’auteur','C’est un argument contre la thèse'],ans:0,evidenceParagraph:2,explanation:'Elle est introduite par « Par exemple » : elle rend concret l’argument du temps libéré.'},
    {id:'q4',type:'choice',competencies:['READ_ARGUMENT','READ_VOCAB_CONTEXT'],difficulty:7,prompt:'Que fait l’auteur au début du quatrième paragraphe, avec « Certes » ?',choices:['Il reconnaît que l’avis opposé a une part de vérité (une concession)','Il change complètement d’avis','Il donne sa conclusion'],ans:0,evidenceParagraph:3,explanation:'« Certes » introduit une concession : il admet que les écrans ont des qualités.'},
    {id:'q5',type:'evidence',competencies:['READ_JUSTIFY','READ_ARGUMENT'],difficulty:7,prompt:'Clique sur le paragraphe où l’auteur répond à une objection.',evidenceParagraph:3,explanation:'Après la concession, « Mais il ne s’agit pas de les interdire » réfute l’objection : l’auteur ne demande pas d’interdire les écrans.'},
    {id:'q6',type:'choice',competencies:['READ_VOCAB_CONTEXT','READ_ARGUMENT'],difficulty:7,prompt:'Dans le deuxième paragraphe, quel est le rôle du mot « Or » ?',choices:['Il ajoute une idée qui fait avancer le raisonnement : mal dormir nuit à la concentration','Il annonce un exemple','Il introduit la conclusion du texte'],ans:0,evidenceParagraph:1,explanation:'« Or » introduit une nouvelle donnée qui, reliée à la première, mène à une conséquence.'},
    {id:'q7',type:'order',competencies:['READ_STRUCTURE','READ_SEQUENCE'],difficulty:6,prompt:'Remets les étapes du texte dans l’ordre.',tokens:['La thèse','L’argument du sommeil','L’argument du temps libéré','La concession et la réfutation','La conclusion'],ans:'La thèse L’argument du sommeil L’argument du temps libéré La concession et la réfutation La conclusion',explanation:'Les connecteurs le montrent : « D’abord », « Ensuite », « Certes... Mais », « En conclusion ».'},
    {id:'q8',type:'choice',competencies:['READ_AUTHOR_INTENT'],difficulty:5,prompt:'Quel est le but de ce texte ?',choices:['Convaincre le lecteur d’adopter une habitude','Raconter une histoire inventée','Décrire le fonctionnement d’un téléphone'],ans:0,explanation:'C’est un texte argumentatif : il défend une thèse avec des arguments pour convaincre.'}
   ]
  },

  // ===== Lot 5 (18/10/2026) : renfort du primaire (2 supports de plus par classe, récits et
  // documentaires). Texte original de La Fontaine ; adaptations libres de Grimm, Perrault et Andersen
  // (tous dans le domaine public).

  fr_cp_chat_pluie_01:{
   id:'fr_cp_chat_pluie_01',level:'CP',subject:'francais',type:'literary_text',documentType:'récit',
   title:'Le chat sous la pluie',author:null,work:null,sourceType:'original_mathquest',
   chapterLinks:['cp-fr-comprendre'],
   competencies:['READ_EXPLICIT','READ_CHARACTER','READ_PLACE','READ_INFERENCE','READ_SEQUENCE'],
   difficulty:1,estimatedReadingMinutes:1,audioMode:'audioRecommended',sessionSize:5,
   paragraphs:[
    'Il pleut très fort.',
    'Le petit chat est dehors.',
    'Il miaule devant la porte.',
    'Lou ouvre la porte.',
    'Le chat se sèche près du feu.'
   ],
   glossary:[{word:'miaule',definition:'Fait le cri du chat : « miaou ».'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_EXPLICIT'],difficulty:1,prompt:'Quel temps fait-il ?',choices:['Il pleut','Il fait beau','Il neige'],ans:0,evidenceParagraph:0,explanation:'« Il pleut très fort. »'},
    {id:'q2',type:'choice',competencies:['READ_CHARACTER'],difficulty:1,prompt:'Qui est dehors ?',choices:['Le petit chat','Lou','Le chien'],ans:0,evidenceParagraph:1,explanation:'« Le petit chat est dehors. »'},
    {id:'q3',type:'choice',competencies:['READ_INFERENCE'],difficulty:2,prompt:'Pourquoi le chat miaule-t-il devant la porte ?',choices:['Il veut rentrer à l’abri','Il veut jouer dans la pluie','Il a vu une souris'],ans:0,evidenceParagraph:2,explanation:'Il pleut fort et il est dehors : il veut rentrer.'},
    {id:'q4',type:'choice',competencies:['READ_CHARACTER'],difficulty:1,prompt:'Qui ouvre la porte ?',choices:['Lou','Le chat','Personne'],ans:0,evidenceParagraph:3,explanation:'« Lou ouvre la porte. »'},
    {id:'q5',type:'choice',competencies:['READ_PLACE'],difficulty:2,prompt:'Où le chat se sèche-t-il ?',choices:['Près du feu','Sous la table','Dans le jardin'],ans:0,evidenceParagraph:4,explanation:'« Le chat se sèche près du feu. »'},
    {id:'q6',type:'order',competencies:['READ_SEQUENCE'],difficulty:2,prompt:'Remets l’histoire dans l’ordre.',tokens:['Le chat miaule','Lou ouvre la porte','Le chat se sèche'],ans:'Le chat miaule Lou ouvre la porte Le chat se sèche',explanation:'C’est l’ordre du texte.'}
   ]
  },

  fr_cp_poule_doc_01:{
   id:'fr_cp_poule_doc_01',level:'CP',subject:'francais',type:'document',documentType:'texte documentaire',
   title:'La poule et ses poussins',author:null,work:null,sourceType:'original_mathquest',
   chapterLinks:['cp-fr-comprendre'],
   competencies:['READ_EXPLICIT','READ_VOCAB_CONTEXT','READ_TIME','READ_SEQUENCE','READ_GENRE'],
   difficulty:1,estimatedReadingMinutes:1,audioMode:'audioRecommended',sessionSize:5,
   paragraphs:[
    'La poule est un oiseau.',
    'Elle pond des œufs.',
    'Elle s’assoit sur ses œufs pour les garder au chaud : elle les couve.',
    'Au bout de trois semaines, les poussins sortent de l’œuf.',
    'Le papa des poussins, c’est le coq.'
   ],
   glossary:[{word:'pond',definition:'Fait sortir un œuf de son corps.'},{word:'poussins',definition:'Les bébés de la poule.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_EXPLICIT'],difficulty:1,prompt:'La poule est...',choices:['Un oiseau','Un poisson','Un chat'],ans:0,evidenceParagraph:0,explanation:'« La poule est un oiseau. »'},
    {id:'q2',type:'choice',competencies:['READ_VOCAB_CONTEXT'],difficulty:2,prompt:'Que veut dire « couver » ?',choices:['S’asseoir sur ses œufs pour les garder au chaud','Manger des graines','Courir très vite'],ans:0,evidenceParagraph:2,explanation:'Le texte l’explique : « Elle s’assoit sur ses œufs pour les garder au chaud : elle les couve. »'},
    {id:'q3',type:'choice',competencies:['READ_TIME'],difficulty:2,prompt:'Au bout de combien de temps les poussins sortent-ils de l’œuf ?',choices:['Trois semaines','Trois jours','Trois mois'],ans:0,evidenceParagraph:3,explanation:'« Au bout de trois semaines, les poussins sortent de l’œuf. »'},
    {id:'q4',type:'choice',competencies:['READ_EXPLICIT'],difficulty:1,prompt:'Qui est le papa des poussins ?',choices:['Le coq','Le canard','Le lapin'],ans:0,evidenceParagraph:4,explanation:'« Le papa des poussins, c’est le coq. »'},
    {id:'q5',type:'order',competencies:['READ_SEQUENCE'],difficulty:2,prompt:'Remets dans l’ordre.',tokens:['La poule pond','Elle couve ses œufs','Les poussins sortent'],ans:'La poule pond Elle couve ses œufs Les poussins sortent',explanation:'D’abord l’œuf, puis la couvaison, enfin la naissance.'},
    {id:'q6',type:'choice',competencies:['READ_GENRE'],difficulty:2,prompt:'Ce texte...',choices:['Nous apprend des choses vraies sur la poule','Raconte une histoire inventée','Est une chanson'],ans:0,explanation:'C’est un texte documentaire : il donne des informations vraies.'}
   ]
  },

  fr_ce1_sept_chevreaux_01:{
   id:'fr_ce1_sept_chevreaux_01',level:'CE1',subject:'francais',type:'literary_text',documentType:'conte',
   title:'Le loup et les sept chevreaux',author:'Jacob et Wilhelm Grimm',work:'Contes de l’enfance et du foyer (1812)',
   sourceType:'public_domain',sourceReference:'Adaptation libre et abrégée pour le CE1, d’après le conte des frères Grimm (morts en 1859 et 1863), dans le domaine public.',
   chapterLinks:['ce1-fr-comprendre'],
   competencies:['READ_EXPLICIT','READ_CHARACTER','READ_CAUSE_CONSEQUENCE','READ_INFERENCE','READ_SEQUENCE','READ_JUSTIFY','READ_PLACE'],
   difficulty:2,estimatedReadingMinutes:2,audioMode:'audioRecommended',sessionSize:7,
   paragraphs:[
    'Une maman chèvre devait partir dans la forêt. Elle dit à ses sept chevreaux : « N’ouvrez à personne ! Le loup a une grosse voix et des pattes noires. »',
    'Bientôt, on frappa : « Ouvrez, mes enfants, c’est maman ! » Mais la voix était grosse. « Tu n’es pas notre maman, tu es le loup ! »',
    'Le loup mangea de la craie pour adoucir sa voix. Il revint, mais il posa sa patte noire sur la fenêtre. « Tu n’es pas notre maman ! »',
    'Alors le loup se fit mettre de la farine sur la patte. Il revint encore, avec une voix douce et une patte blanche. Cette fois, les chevreaux ouvrirent… et le loup entra !',
    'Heureusement, le plus petit s’était caché dans la grande horloge. Quand la maman rentra, il lui raconta tout, et ensemble ils partirent délivrer ses frères.'
   ],
   glossary:[{word:'chevreaux',definition:'Les petits de la chèvre.'},{word:'adoucir',definition:'Rendre plus doux.'},{word:'farine',definition:'Poudre blanche faite avec du blé, qui sert à faire le pain.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_EXPLICIT'],difficulty:1,prompt:'Combien de chevreaux la maman a-t-elle ?',choices:['Sept','Trois','Dix'],ans:0,evidenceParagraph:0,explanation:'« Elle dit à ses sept chevreaux... »'},
    {id:'q2',type:'choice',competencies:['READ_EXPLICIT'],difficulty:2,prompt:'À quoi peut-on reconnaître le loup, selon la maman ?',choices:['À sa grosse voix et à ses pattes noires','À ses grandes oreilles','À sa queue rouge'],ans:0,evidenceParagraph:0,explanation:'« Le loup a une grosse voix et des pattes noires. »'},
    {id:'q3',type:'choice',competencies:['READ_CAUSE_CONSEQUENCE'],difficulty:2,prompt:'Pourquoi le loup mange-t-il de la craie ?',choices:['Pour avoir une voix plus douce','Parce qu’il a faim','Pour blanchir ses dents'],ans:0,evidenceParagraph:2,explanation:'« Le loup mangea de la craie pour adoucir sa voix. »'},
    {id:'q4',type:'choice',competencies:['READ_INFERENCE'],difficulty:3,prompt:'Pourquoi le loup met-il de la farine sur sa patte ?',choices:['Pour que sa patte soit blanche comme celle de la maman','Pour faire un gâteau','Pour se réchauffer'],ans:0,evidenceParagraph:3,explanation:'Les chevreaux l’avaient reconnu à sa patte noire : avec la farine, elle devient blanche.'},
    {id:'q5',type:'evidence',competencies:['READ_JUSTIFY'],difficulty:3,prompt:'Quel paragraphe montre que les chevreaux se sont fait piéger ?',evidenceParagraph:3,explanation:'« Cette fois, les chevreaux ouvrirent… et le loup entra ! »'},
    {id:'q6',type:'choice',competencies:['READ_PLACE','READ_CHARACTER'],difficulty:2,prompt:'Où le plus petit chevreau s’est-il caché ?',choices:['Dans la grande horloge','Sous le lit','Dans la forêt'],ans:0,evidenceParagraph:4,explanation:'« ...le plus petit s’était caché dans la grande horloge. »'},
    {id:'q7',type:'order',competencies:['READ_SEQUENCE'],difficulty:3,prompt:'Remets l’histoire dans l’ordre.',tokens:['La maman part','Le loup mange de la craie','Le loup met de la farine','Les chevreaux ouvrent la porte'],ans:'La maman part Le loup mange de la craie Le loup met de la farine Les chevreaux ouvrent la porte',explanation:'C’est l’ordre du conte : le loup essaie trois fois avant de réussir.'}
   ]
  },

  fr_ce1_dents_doc_01:{
   id:'fr_ce1_dents_doc_01',level:'CE1',subject:'francais',type:'document',documentType:'texte documentaire',
   title:'Prendre soin de ses dents',author:null,work:null,sourceType:'original_mathquest',
   chapterLinks:['ce1-fr-comprendre'],
   competencies:['READ_EXPLICIT','READ_TIME','READ_CAUSE_CONSEQUENCE','READ_VOCAB_CONTEXT','READ_MAIN_IDEA','READ_AUTHOR_INTENT','READ_REFERENCE'],
   difficulty:2,estimatedReadingMinutes:2,audioMode:'audioRecommended',sessionSize:7,
   paragraphs:[
    'Dans ta bouche, il y a des dents de lait. Vers six ans, elles commencent à tomber, et des dents définitives poussent à leur place.',
    'Les dents définitives doivent durer toute la vie : il faut en prendre soin.',
    'Quand tu manges du sucre, de minuscules êtres vivants appelés bactéries se régalent sur tes dents. Elles fabriquent un acide qui peut faire des trous : ce sont les caries.',
    'Pour les éviter, brosse-toi les dents deux fois par jour, pendant deux minutes, surtout le soir avant de dormir.',
    'Et va voir le dentiste une fois par an, même si tu n’as pas mal !'
   ],
   glossary:[{word:'définitives',definition:'Qui restent pour toujours.'},{word:'bactéries',definition:'Êtres vivants si petits qu’on ne peut pas les voir sans microscope.'},{word:'caries',definition:'Trous dans les dents, qui peuvent faire mal.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_MAIN_IDEA'],difficulty:2,prompt:'De quoi parle ce texte ?',choices:['De la façon de prendre soin de ses dents','Des animaux de la mer','D’une histoire de dentiste'],ans:0,explanation:'Le titre et tous les paragraphes parlent des dents et de leur soin.'},
    {id:'q2',type:'choice',competencies:['READ_TIME'],difficulty:2,prompt:'Vers quel âge les dents de lait commencent-elles à tomber ?',choices:['Vers six ans','Vers deux ans','Vers douze ans'],ans:0,evidenceParagraph:0,explanation:'« Vers six ans, elles commencent à tomber... »'},
    {id:'q3',type:'choice',competencies:['READ_CAUSE_CONSEQUENCE'],difficulty:3,prompt:'Qu’est-ce qui provoque les caries ?',choices:['Les bactéries qui se nourrissent du sucre','Le brossage des dents','Le dentiste'],ans:0,evidenceParagraph:2,explanation:'Les bactéries se régalent du sucre et fabriquent un acide qui fait des trous.'},
    {id:'q4',type:'choice',competencies:['READ_EXPLICIT'],difficulty:2,prompt:'Combien de fois par jour faut-il se brosser les dents ?',choices:['Deux fois','Une fois par semaine','Dix fois'],ans:0,evidenceParagraph:3,explanation:'« ...brosse-toi les dents deux fois par jour, pendant deux minutes... »'},
    {id:'q5',type:'choice',competencies:['READ_REFERENCE'],difficulty:3,prompt:'Dans « Elles fabriquent un acide », qui est « Elles » ?',choices:['Les bactéries','Les dents','Les caries'],ans:0,evidenceParagraph:2,explanation:'« Elles » reprend « bactéries », le nom juste avant.'},
    {id:'q6',type:'choice',competencies:['READ_VOCAB_CONTEXT'],difficulty:2,prompt:'Les dents « définitives » sont des dents...',choices:['Qui doivent durer toute la vie','Qui tombent très vite','Qui sont en sucre'],ans:0,evidenceParagraph:1,explanation:'« Les dents définitives doivent durer toute la vie. »'},
    {id:'q7',type:'choice',competencies:['READ_AUTHOR_INTENT'],difficulty:3,prompt:'Pourquoi conseille-t-on d’aller chez le dentiste « même si tu n’as pas mal » ?',choices:['Pour repérer un problème avant qu’il fasse mal','Parce que c’est amusant','Pour manger des bonbons'],ans:0,evidenceParagraph:4,explanation:'Le dentiste peut trouver une carie tout au début, avant qu’elle ne devienne douloureuse.'}
   ]
  },

  fr_ce2_rat_ville_champs_01:{
   id:'fr_ce2_rat_ville_champs_01',level:'CE2',subject:'francais',type:'literary_text',documentType:'fable',
   title:'Le Rat de ville et le Rat des champs',author:'Jean de La Fontaine',work:'Fables, livre I (1668)',
   sourceType:'public_domain',sourceReference:'Texte original de Jean de La Fontaine (mort en 1695), dans le domaine public.',
   chapterLinks:['ce2-fr-comprendre'],verse:true,stanzas:[4,8,12,16,20,24],
   competencies:['READ_CHARACTER','READ_PLACE','READ_CAUSE_CONSEQUENCE','READ_VOCAB_CONTEXT','READ_REFERENCE','READ_MAIN_IDEA','READ_JUSTIFY','READ_GENRE'],
   difficulty:3,estimatedReadingMinutes:3,audioMode:'audioRecommended',sessionSize:8,
   paragraphs:[
    'Autrefois le Rat de ville',
    'Invita le Rat des champs,',
    'D’une façon fort civile,',
    'À des reliefs d’Ortolans.',
    'Sur un Tapis de Turquie',
    'Le couvert se trouva mis.',
    'Je laisse à penser la vie',
    'Que firent ces deux amis.',
    'Le régal fut fort honnête,',
    'Rien ne manquait au festin ;',
    'Mais quelqu’un troubla la fête',
    'Pendant qu’ils étaient en train.',
    'À la porte de la salle',
    'Ils entendirent du bruit :',
    'Le Rat de ville détale ;',
    'Son camarade le suit.',
    'Le bruit cesse, on se retire :',
    'Rats en campagne aussitôt ;',
    'Et le citadin de dire :',
    'Achevons tout notre rôt.',
    'C’est assez, dit le rustique ;',
    'Demain vous viendrez chez moi :',
    'Ce n’est pas que je me pique',
    'De tous vos festins de Roi ;',
    'Mais rien ne vient m’interrompre :',
    'Je mange tout à loisir.',
    'Adieu donc ; fi du plaisir',
    'Que la crainte peut corrompre.'
   ],
   glossary:[{word:'civile',definition:'Polie.'},{word:'reliefs',definition:'Les restes d’un repas.'},{word:'Ortolans',definition:'Petits oiseaux qu’on servait autrefois comme plat de luxe.'},{word:'festin',definition:'Un repas de fête, très riche.'},{word:'détale',definition:'S’enfuit en courant.'},{word:'citadin',definition:'Celui qui habite en ville.'},{word:'rôt',definition:'Le rôti, la viande du repas.'},{word:'rustique',definition:'Celui qui vit à la campagne.'},{word:'crainte',definition:'La peur.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_CHARACTER'],difficulty:2,prompt:'Qui invite qui ?',choices:['Le Rat de ville invite le Rat des champs','Le Rat des champs invite le Rat de ville','Le chat invite les rats'],ans:0,evidenceParagraph:1,explanation:'« Autrefois le Rat de ville / Invita le Rat des champs ».'},
    {id:'q2',type:'choice',competencies:['READ_PLACE'],difficulty:3,prompt:'Sur quoi le repas est-il servi ?',choices:['Sur un tapis de Turquie','Dans un champ','Sur une table de jardin'],ans:0,evidenceParagraph:4,explanation:'« Sur un Tapis de Turquie / Le couvert se trouva mis. »'},
    {id:'q3',type:'choice',competencies:['READ_CAUSE_CONSEQUENCE'],difficulty:3,prompt:'Qu’est-ce qui interrompt le repas ?',choices:['Un bruit à la porte de la salle','Un orage','Le Rat des champs qui a trop mangé'],ans:0,evidenceParagraph:13,explanation:'« À la porte de la salle / Ils entendirent du bruit ».'},
    {id:'q4',type:'choice',competencies:['READ_VOCAB_CONTEXT'],difficulty:3,prompt:'« Le Rat de ville détale » veut dire qu’il...',choices:['S’enfuit en courant','Se met à danser','Se cache sous le tapis sans bouger'],ans:0,evidenceParagraph:14,explanation:'Il a entendu du bruit : il s’enfuit, et « son camarade le suit ».'},
    {id:'q5',type:'choice',competencies:['READ_REFERENCE'],difficulty:4,prompt:'Qui est « le rustique » ?',choices:['Le Rat des champs','Le Rat de ville','Le maître de la maison'],ans:0,evidenceParagraph:20,explanation:'Le rustique, c’est celui qui vit à la campagne : le Rat des champs. (Le « citadin », c’est le Rat de ville.)'},
    {id:'q6',type:'evidence',competencies:['READ_JUSTIFY'],difficulty:4,prompt:'Clique sur le vers où le Rat des champs dit ce qu’il aime chez lui.',evidenceParagraph:25,explanation:'« Je mange tout à loisir » : chez lui, personne ne le dérange.'},
    {id:'q7',type:'choice',competencies:['READ_MAIN_IDEA'],difficulty:4,prompt:'Quelle est la morale de cette fable ?',choices:['Mieux vaut un repas simple dans le calme qu’un festin dans la peur','Il faut toujours manger le plus possible','Les rats des villes sont plus courageux'],ans:0,evidenceParagraph:27,explanation:'« ...fi du plaisir / Que la crainte peut corrompre » : un plaisir gâché par la peur ne vaut rien.'},
    {id:'q8',type:'choice',competencies:['READ_GENRE'],difficulty:3,prompt:'Ce texte est...',choices:['Une fable en vers','Un texte documentaire sur les rats','Une recette de cuisine'],ans:0,explanation:'Des animaux qui parlent, des vers, une leçon à la fin : c’est une fable.'}
   ]
  },

  fr_ce2_hirondelles_doc_01:{
   id:'fr_ce2_hirondelles_doc_01',level:'CE2',subject:'francais',type:'document',documentType:'texte documentaire',
   title:'Le grand voyage des hirondelles',author:null,work:null,sourceType:'original_mathquest',
   chapterLinks:['ce2-fr-comprendre'],
   competencies:['READ_EXPLICIT','READ_TIME','READ_CAUSE_CONSEQUENCE','READ_VOCAB_CONTEXT','READ_PLACE','READ_SEQUENCE','READ_MAIN_IDEA'],
   difficulty:3,estimatedReadingMinutes:2,audioMode:'audioAllowed',sessionSize:7,
   paragraphs:[
    'Au printemps, on voit revenir les hirondelles. Elles construisent leur nid avec de la boue, souvent sous un toit ou dans une grange.',
    'Les hirondelles se nourrissent d’insectes, qu’elles attrapent en plein vol.',
    'À la fin de l’été, quand il commence à faire froid, les insectes deviennent rares. Les hirondelles se rassemblent alors sur les fils électriques, puis s’envolent vers l’Afrique, où il fait chaud.',
    'Ce voyage dure plusieurs semaines et fait des milliers de kilomètres. On dit que ce sont des oiseaux migrateurs.',
    'Au printemps suivant, beaucoup reviennent au même endroit, parfois même dans le même nid !'
   ],
   glossary:[{word:'grange',definition:'Bâtiment de ferme où l’on range le foin et le matériel.'},{word:'rares',definition:'Peu nombreux, difficiles à trouver.'},{word:'migrateurs',definition:'Qui partent chaque année vers une autre région, puis reviennent.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_MAIN_IDEA'],difficulty:2,prompt:'De quoi parle surtout ce texte ?',choices:['Du voyage que font les hirondelles chaque année','De la vie dans une ferme','Des fils électriques'],ans:0,explanation:'Le titre et la plupart des paragraphes parlent de leur départ et de leur retour.'},
    {id:'q2',type:'choice',competencies:['READ_EXPLICIT'],difficulty:2,prompt:'Avec quoi les hirondelles construisent-elles leur nid ?',choices:['Avec de la boue','Avec des cailloux','Avec du papier'],ans:0,evidenceParagraph:0,explanation:'« Elles construisent leur nid avec de la boue... »'},
    {id:'q3',type:'choice',competencies:['READ_CAUSE_CONSEQUENCE'],difficulty:4,prompt:'Pourquoi les hirondelles partent-elles à la fin de l’été ?',choices:['Parce qu’il fait froid et qu’il n’y a plus assez d’insectes à manger','Parce que leur nid est cassé','Parce qu’elles s’ennuient'],ans:0,evidenceParagraph:2,explanation:'Elles mangent des insectes ; quand il fait froid, « les insectes deviennent rares ».'},
    {id:'q4',type:'choice',competencies:['READ_PLACE'],difficulty:2,prompt:'Où vont-elles passer l’hiver ?',choices:['En Afrique','Au pôle Nord','Dans la grange'],ans:0,evidenceParagraph:2,explanation:'« ...puis s’envolent vers l’Afrique, où il fait chaud. »'},
    {id:'q5',type:'choice',competencies:['READ_VOCAB_CONTEXT'],difficulty:3,prompt:'Un oiseau « migrateur », c’est un oiseau qui...',choices:['Part chaque année vers une autre région, puis revient','Ne vole jamais','Vit toujours au même endroit'],ans:0,evidenceParagraph:3,explanation:'Le texte vient de décrire ce long voyage aller et retour.'},
    {id:'q6',type:'choice',competencies:['READ_TIME'],difficulty:3,prompt:'Quand les hirondelles reviennent-elles ?',choices:['Au printemps','En hiver','À la fin de l’été'],ans:0,evidenceParagraph:4,explanation:'« Au printemps suivant, beaucoup reviennent au même endroit... »'},
    {id:'q7',type:'order',competencies:['READ_SEQUENCE'],difficulty:3,prompt:'Remets l’année des hirondelles dans l’ordre.',tokens:['Elles arrivent au printemps','Elles chassent les insectes tout l’été','Elles se rassemblent sur les fils','Elles s’envolent vers l’Afrique'],ans:'Elles arrivent au printemps Elles chassent les insectes tout l’été Elles se rassemblent sur les fils Elles s’envolent vers l’Afrique',explanation:'C’est l’ordre des saisons décrit dans le texte.'}
   ]
  },

  fr_cm1_petit_poucet_01:{
   id:'fr_cm1_petit_poucet_01',level:'CM1',subject:'francais',type:'literary_text',documentType:'conte',
   title:'Le Petit Poucet',author:'Charles Perrault',work:'Histoires ou contes du temps passé (1697)',
   sourceType:'public_domain',sourceReference:'Adaptation libre et abrégée pour le CM1 du début du conte, d’après Charles Perrault (mort en 1703), dans le domaine public.',
   chapterLinks:['cm1-fr-litterature'],
   competencies:['READ_CHARACTER','READ_CAUSE_CONSEQUENCE','READ_INFERENCE','READ_VOCAB_CONTEXT','READ_JUSTIFY','READ_SEQUENCE','READ_EMOTION_INTENTION'],
   difficulty:4,estimatedReadingMinutes:3,audioMode:'audioAllowed',sessionSize:8,
   paragraphs:[
    'Il était une fois un bûcheron et sa femme qui avaient sept garçons. Le plus jeune était si petit qu’à sa naissance, il n’était pas plus grand que le pouce : on l’appela le Petit Poucet.',
    'Une année, il y eut une terrible famine. Un soir, les parents, désespérés, décidèrent de perdre leurs enfants dans la forêt, car ils ne pouvaient plus les nourrir.',
    'Caché sous le tabouret de son père, le Petit Poucet entendit tout. Le lendemain matin, il alla au bord d’un ruisseau et remplit ses poches de petits cailloux blancs.',
    'Dans la forêt, il les jeta un à un le long du chemin. Quand les parents s’éclipsèrent, ses frères se mirent à pleurer, mais Poucet les ramena tous à la maison en suivant les cailloux.',
    'Quelque temps plus tard, les parents recommencèrent. Cette fois, la porte était fermée à double tour : Poucet ne put sortir chercher des cailloux. Il émietta donc son morceau de pain le long du chemin.',
    'Hélas ! les oiseaux mangèrent toutes les miettes. Les sept frères étaient perdus. Grimpé en haut d’un arbre, Poucet aperçut alors une petite lumière, très loin, au-delà de la forêt.'
   ],
   glossary:[{word:'bûcheron',definition:'Celui dont le métier est de couper des arbres.'},{word:'famine',definition:'Période où l’on manque gravement de nourriture.'},{word:'s’éclipsèrent',definition:'Partirent discrètement, sans être vus.'},{word:'émietta',definition:'Réduisit en miettes, en tout petits morceaux.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_CHARACTER'],difficulty:3,prompt:'Pourquoi le héros s’appelle-t-il le Petit Poucet ?',choices:['À sa naissance, il n’était pas plus grand qu’un pouce','Il suçait son pouce','Il avait un gros pouce'],ans:0,evidenceParagraph:0,explanation:'« ...il n’était pas plus grand que le pouce : on l’appela le Petit Poucet. »'},
    {id:'q2',type:'choice',competencies:['READ_CAUSE_CONSEQUENCE'],difficulty:4,prompt:'Pourquoi les parents veulent-ils perdre leurs enfants ?',choices:['À cause de la famine : ils ne peuvent plus les nourrir','Parce que les enfants sont méchants','Pour qu’ils apprennent à chasser'],ans:0,evidenceParagraph:1,explanation:'« ...car ils ne pouvaient plus les nourrir. »'},
    {id:'q3',type:'choice',competencies:['READ_INFERENCE'],difficulty:4,prompt:'Pourquoi Poucet remplit-il ses poches de cailloux blancs ?',choices:['Pour marquer le chemin et pouvoir revenir','Pour jouer avec ses frères','Pour les vendre'],ans:0,evidenceParagraph:2,explanation:'Il a entendu le projet de ses parents : il prépare un moyen de retrouver le chemin.'},
    {id:'q4',type:'choice',competencies:['READ_CAUSE_CONSEQUENCE'],difficulty:4,prompt:'Pourquoi Poucet utilise-t-il du pain la deuxième fois ?',choices:['La porte était fermée : il n’a pas pu aller chercher de cailloux','Le pain se voit mieux','Il n’aime pas le pain'],ans:0,evidenceParagraph:4,explanation:'« ...la porte était fermée à double tour : Poucet ne put sortir chercher des cailloux. »'},
    {id:'q5',type:'choice',competencies:['READ_CAUSE_CONSEQUENCE','READ_INFERENCE'],difficulty:5,prompt:'Pourquoi la ruse du pain échoue-t-elle, alors que celle des cailloux avait réussi ?',choices:['Les oiseaux mangent le pain, mais pas les cailloux','Le pain est trop lourd','Les frères ont ramassé le pain'],ans:0,evidenceParagraph:5,explanation:'« Hélas ! les oiseaux mangèrent toutes les miettes. »'},
    {id:'q6',type:'choice',competencies:['READ_EMOTION_INTENTION','READ_CHARACTER'],difficulty:4,prompt:'Quelle qualité montre Poucet dans ce conte ?',choices:['Il est malin et ne perd pas courage','Il est paresseux','Il est méchant avec ses frères'],ans:0,evidenceParagraph:3,explanation:'Il trouve des solutions et ramène ses frères, alors qu’eux pleurent.'},
    {id:'q7',type:'evidence',competencies:['READ_JUSTIFY'],difficulty:4,prompt:'Clique sur le paragraphe qui montre que Poucet sauve ses frères une première fois.',evidenceParagraph:3,explanation:'« ...Poucet les ramena tous à la maison en suivant les cailloux. »'},
    {id:'q8',type:'order',competencies:['READ_SEQUENCE'],difficulty:4,prompt:'Remets le conte dans l’ordre.',tokens:['Poucet entend ses parents','Il sème des cailloux blancs','Il sème des miettes de pain','Il aperçoit une lumière au loin'],ans:'Poucet entend ses parents Il sème des cailloux blancs Il sème des miettes de pain Il aperçoit une lumière au loin',explanation:'C’est l’ordre du récit.'},
    {id:'q9',type:'choice',competencies:['READ_VOCAB_CONTEXT'],difficulty:4,prompt:'« Quand les parents s’éclipsèrent » veut dire quand les parents...',choices:['Partirent discrètement','Se mirent à crier','S’endormirent'],ans:0,evidenceParagraph:3,explanation:'Juste après, les frères pleurent : ils se retrouvent seuls, leurs parents sont partis sans qu’ils les voient.'}
   ]
  },

  fr_cm1_bouteille_01:{
   id:'fr_cm1_bouteille_01',level:'CM1',subject:'francais',type:'literary_text',documentType:'récit',
   title:'Le message dans la bouteille',author:null,work:null,sourceType:'original_mathquest',
   chapterLinks:['cm1-fr-comprendre'],
   competencies:['READ_PLACE','READ_EXPLICIT','READ_CHARACTER','READ_REFERENCE','READ_CAUSE_CONSEQUENCE','READ_TIME','READ_INFERENCE','READ_EMOTION_INTENTION'],
   difficulty:4,estimatedReadingMinutes:2,audioMode:'audioAllowed',sessionSize:8,
   paragraphs:[
    'Pendant les vacances, Lina se promenait sur la plage avec son grand-père quand elle aperçut une bouteille coincée entre deux rochers.',
    'À l’intérieur, il y avait un papier roulé. Lina le déroula avec précaution : l’encre avait un peu coulé, mais on pouvait encore lire.',
    '« Je m’appelle Tom, j’ai dix ans. J’ai lancé cette bouteille depuis le bateau qui m’emmène en Irlande. Si tu la trouves, écris-moi ! » Suivait une adresse.',
    'Le grand-père examina le papier : « Regarde la date : il a été écrit il y a deux ans. Cette bouteille a fait un long voyage ! »',
    'Le soir même, Lina sortit son plus beau papier à lettres. Elle hésita longtemps sur la première phrase, puis écrivit : « Cher Tom, ta bouteille est arrivée… »'
   ],
   glossary:[{word:'coincée',definition:'Bloquée, qui ne peut plus bouger.'},{word:'précaution',definition:'Grande attention, pour ne rien abîmer.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_PLACE'],difficulty:2,prompt:'Où Lina trouve-t-elle la bouteille ?',choices:['Sur la plage, entre deux rochers','Dans le jardin','Sur un bateau'],ans:0,evidenceParagraph:0,explanation:'« ...une bouteille coincée entre deux rochers » sur la plage.'},
    {id:'q2',type:'choice',competencies:['READ_CHARACTER'],difficulty:3,prompt:'Qui a écrit le message ?',choices:['Tom, un garçon de dix ans','Le grand-père de Lina','Un capitaine de bateau'],ans:0,evidenceParagraph:2,explanation:'« Je m’appelle Tom, j’ai dix ans. »'},
    {id:'q3',type:'choice',competencies:['READ_REFERENCE'],difficulty:4,prompt:'Dans « Lina le déroula », que représente « le » ?',choices:['Le papier roulé','La bouteille','Le grand-père'],ans:0,evidenceParagraph:1,explanation:'« le » reprend « un papier roulé », juste avant.'},
    {id:'q4',type:'choice',competencies:['READ_CAUSE_CONSEQUENCE','READ_INFERENCE'],difficulty:4,prompt:'Pourquoi l’encre avait-elle un peu coulé ?',choices:['À cause de l’humidité de la mer pendant le voyage','Parce que Tom écrivait mal','Parce que Lina l’a mouillée exprès'],ans:0,evidenceParagraph:1,explanation:'La bouteille a passé longtemps en mer : un peu d’humidité a pu entrer.'},
    {id:'q5',type:'choice',competencies:['READ_TIME'],difficulty:3,prompt:'Quand le message a-t-il été écrit ?',choices:['Il y a deux ans','Hier','Il y a cent ans'],ans:0,evidenceParagraph:3,explanation:'« ...il a été écrit il y a deux ans. »'},
    {id:'q6',type:'choice',competencies:['READ_INFERENCE'],difficulty:5,prompt:'Pourquoi le grand-père dit-il que la bouteille « a fait un long voyage » ?',choices:['Elle a dérivé en mer pendant deux ans avant d’arriver','Elle est venue en avion','Il l’a transportée dans sa voiture'],ans:0,evidenceParagraph:3,explanation:'Écrite il y a deux ans, lancée d’un bateau : elle a flotté très longtemps.'},
    {id:'q7',type:'choice',competencies:['READ_EMOTION_INTENTION'],difficulty:4,prompt:'Pourquoi Lina hésite-t-elle longtemps sur la première phrase ?',choices:['Elle tient à écrire une belle lettre à Tom','Elle ne sait pas écrire','Elle ne veut pas répondre'],ans:0,evidenceParagraph:4,explanation:'Elle prend « son plus beau papier » : cette lettre compte beaucoup pour elle.'},
    {id:'q8',type:'choice',competencies:['READ_EXPLICIT'],difficulty:3,prompt:'Que demandait Tom dans son message ?',choices:['Que la personne qui trouve la bouteille lui écrive','Qu’on lui renvoie la bouteille','Qu’on vienne le chercher'],ans:0,evidenceParagraph:2,explanation:'« Si tu la trouves, écris-moi ! »'}
   ]
  },

  fr_cm2_habits_empereur_01:{
   id:'fr_cm2_habits_empereur_01',level:'CM2',subject:'francais',type:'literary_text',documentType:'conte',
   title:'Les Habits neufs de l’empereur',author:'Hans Christian Andersen',work:'Contes (1837)',
   sourceType:'public_domain',sourceReference:'Adaptation libre et abrégée pour le CM2, d’après Hans Christian Andersen (mort en 1875), dans le domaine public.',
   chapterLinks:['cm2-fr-litterature','cm2-fr-temps-recit'],
   competencies:['READ_CHARACTER','READ_EXPLICIT','READ_INFERENCE','READ_EMOTION_INTENTION','READ_AUTHOR_INTENT','READ_STRUCTURE','READ_JUSTIFY','READ_GENRE'],
   difficulty:4,estimatedReadingMinutes:3,audioMode:'audioAllowed',sessionSize:8,
   paragraphs:[
    'Il était une fois un empereur qui aimait tant les beaux habits qu’il dépensait tout son argent pour sa toilette.',
    'Un jour, deux escrocs arrivèrent en ville. Ils prétendirent savoir tisser une étoffe merveilleuse, qui avait une propriété étonnante : elle était invisible pour toute personne sotte ou incapable de faire son travail.',
    'L’empereur, ravi, leur donna beaucoup d’or et de soie. Les deux escrocs installèrent des métiers à tisser et firent semblant de travailler, mais il n’y avait rien du tout sur les métiers.',
    'L’empereur envoya son vieux ministre voir l’ouvrage. Le ministre ne vit rien. « Suis-je donc sot ? pensa-t-il. Personne ne doit le savoir ! » Et il fit de grands compliments sur l’étoffe.',
    'Le jour de la grande procession, l’empereur se déshabilla, et les escrocs firent semblant de lui passer ses nouveaux habits. Dans la rue, tout le monde s’écriait : « Quels habits magnifiques ! »',
    'Soudain, un petit enfant dit : « Mais il n’a rien sur lui ! » Le mot passa de bouche en bouche, et bientôt toute la foule criait la même chose.',
    'L’empereur frissonna, car il sentait qu’ils avaient raison. Mais il pensa : « Je dois tenir jusqu’au bout. » Et il continua sa marche, plus fièrement que jamais.'
   ],
   glossary:[{word:'escrocs',definition:'Des personnes qui trompent les autres pour leur prendre leur argent.'},{word:'étoffe',definition:'Un tissu.'},{word:'sotte',definition:'Bête, qui manque d’intelligence.'},{word:'procession',definition:'Un long défilé solennel dans les rues.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_CHARACTER'],difficulty:3,prompt:'Quel est le grand défaut de l’empereur ?',choices:['Il ne pense qu’à ses beaux habits','Il est trop généreux','Il a peur des enfants'],ans:0,evidenceParagraph:0,explanation:'« ...il dépensait tout son argent pour sa toilette. »'},
    {id:'q2',type:'choice',competencies:['READ_EXPLICIT'],difficulty:3,prompt:'Selon les escrocs, qui ne peut pas voir l’étoffe ?',choices:['Les personnes sottes ou incapables de faire leur travail','Les enfants','Les personnes qui ont mal aux yeux'],ans:0,evidenceParagraph:1,explanation:'« ...elle était invisible pour toute personne sotte ou incapable de faire son travail. »'},
    {id:'q3',type:'choice',competencies:['READ_INFERENCE'],difficulty:5,prompt:'Pourquoi le ministre fait-il des compliments sur une étoffe qu’il ne voit pas ?',choices:['Il a peur qu’on le croie sot','Il voit vraiment l’étoffe','Il veut acheter l’étoffe'],ans:0,evidenceParagraph:3,explanation:'« Suis-je donc sot ? [...] Personne ne doit le savoir ! » Il préfère mentir.'},
    {id:'q4',type:'choice',competencies:['READ_INFERENCE'],difficulty:5,prompt:'Pourquoi la foule s’écrie-t-elle « Quels habits magnifiques ! » ?',choices:['Personne n’ose avouer qu’il ne voit rien','Les habits sont vraiment magnifiques','Les escrocs les ont payés'],ans:0,evidenceParagraph:4,explanation:'Comme le ministre, chacun craint de passer pour sot s’il dit la vérité.'},
    {id:'q5',type:'evidence',competencies:['READ_JUSTIFY'],difficulty:4,prompt:'Clique sur le paragraphe où quelqu’un ose enfin dire la vérité.',evidenceParagraph:5,explanation:'« Mais il n’a rien sur lui ! », dit un petit enfant.'},
    {id:'q6',type:'choice',competencies:['READ_EMOTION_INTENTION'],difficulty:5,prompt:'Pourquoi l’empereur continue-t-il à marcher « plus fièrement que jamais » ?',choices:['Par orgueil : il ne veut pas reconnaître qu’il s’est fait tromper','Parce qu’il n’a rien entendu','Parce qu’il a chaud'],ans:0,evidenceParagraph:6,explanation:'Il « sentait qu’ils avaient raison », mais préfère faire semblant jusqu’au bout.'},
    {id:'q7',type:'choice',competencies:['READ_AUTHOR_INTENT'],difficulty:6,prompt:'Que veut nous faire comprendre ce conte ?',choices:['On ment parfois par peur du regard des autres, et il faut du courage pour dire la vérité','Il faut toujours acheter de beaux habits','Les enfants ne doivent pas parler aux empereurs'],ans:0,explanation:'Tout le monde ment pour ne pas paraître sot ; seul l’enfant, sincère, dit ce qu’il voit.'},
    {id:'q8',type:'choice',competencies:['READ_STRUCTURE','READ_GENRE'],difficulty:5,prompt:'Dans le premier paragraphe, l’imparfait (« aimait », « dépensait ») sert à...',choices:['Décrire la situation de départ, les habitudes de l’empereur','Raconter une action soudaine','Parler du futur'],ans:0,evidenceParagraph:0,explanation:'L’imparfait décrit le décor et les habitudes ; le passé simple (« arrivèrent », « dit ») raconte les actions qui font avancer l’histoire.'}
   ]
  },

  fr_cm2_cycle_eau_doc_01:{
   id:'fr_cm2_cycle_eau_doc_01',level:'CM2',subject:'francais',type:'document',documentType:'texte documentaire',
   title:'Le grand voyage de l’eau',author:null,work:null,sourceType:'original_mathquest',
   chapterLinks:['cm2-fr-comprendre'],
   competencies:['READ_MAIN_IDEA','READ_VOCAB_CONTEXT','READ_CAUSE_CONSEQUENCE','READ_SEQUENCE','READ_STRUCTURE','READ_EXPLICIT','READ_JUSTIFY','READ_INFERENCE'],
   difficulty:4,estimatedReadingMinutes:3,audioMode:'audioAllowed',sessionSize:8,
   paragraphs:[
    'L’eau de la Terre voyage sans cesse : elle passe de la mer au ciel, puis du ciel à la terre, avant de revenir à la mer. On appelle ce voyage le cycle de l’eau.',
    'Chauffée par le soleil, l’eau des océans, des lacs et des rivières s’évapore : elle se transforme en vapeur d’eau, un gaz invisible qui monte dans l’air.',
    'En altitude, l’air est plus froid. La vapeur se refroidit et se transforme en minuscules gouttelettes : c’est la condensation. Ces gouttelettes forment les nuages.',
    'Quand les gouttelettes grossissent et deviennent trop lourdes, elles tombent : ce sont les précipitations (pluie, neige ou grêle).',
    'Une partie de cette eau ruisselle jusqu’aux rivières, qui la ramènent à la mer ; une autre s’infiltre dans le sol et forme des nappes souterraines. Puis le voyage recommence.'
   ],
   glossary:[{word:'s’évapore',definition:'Se transforme en gaz sous l’effet de la chaleur.'},{word:'altitude',definition:'La hauteur au-dessus du niveau de la mer.'},{word:'ruisselle',definition:'Coule à la surface du sol.'},{word:'s’infiltre',definition:'Pénètre petit à petit à l’intérieur.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_MAIN_IDEA'],difficulty:3,prompt:'Quel est le sujet du texte ?',choices:['Le cycle de l’eau','La pêche en mer','La fabrication des nuages artificiels'],ans:0,evidenceParagraph:0,explanation:'« On appelle ce voyage le cycle de l’eau. »'},
    {id:'q2',type:'choice',competencies:['READ_CAUSE_CONSEQUENCE'],difficulty:4,prompt:'Qu’est-ce qui fait s’évaporer l’eau ?',choices:['La chaleur du soleil','Le vent froid','La pluie'],ans:0,evidenceParagraph:1,explanation:'« Chauffée par le soleil, l’eau [...] s’évapore. »'},
    {id:'q3',type:'choice',competencies:['READ_VOCAB_CONTEXT'],difficulty:4,prompt:'Qu’est-ce que la condensation ?',choices:['La vapeur qui se refroidit et devient de minuscules gouttelettes','L’eau qui coule dans les rivières','La neige qui fond'],ans:0,evidenceParagraph:2,explanation:'« La vapeur se refroidit et se transforme en minuscules gouttelettes : c’est la condensation. »'},
    {id:'q4',type:'choice',competencies:['READ_EXPLICIT'],difficulty:3,prompt:'De quoi sont faits les nuages ?',choices:['De minuscules gouttelettes d’eau','De fumée','De coton'],ans:0,evidenceParagraph:2,explanation:'« Ces gouttelettes forment les nuages. »'},
    {id:'q5',type:'order',competencies:['READ_SEQUENCE','READ_STRUCTURE'],difficulty:4,prompt:'Remets les étapes du cycle dans l’ordre.',tokens:['L’eau s’évapore','La vapeur se condense en nuages','Les précipitations tombent','L’eau rejoint les rivières et la mer'],ans:'L’eau s’évapore La vapeur se condense en nuages Les précipitations tombent L’eau rejoint les rivières et la mer',explanation:'Chaque paragraphe décrit une étape, dans cet ordre.'},
    {id:'q6',type:'choice',competencies:['READ_CAUSE_CONSEQUENCE'],difficulty:4,prompt:'Pourquoi les gouttelettes finissent-elles par tomber ?',choices:['Elles grossissent et deviennent trop lourdes','Le soleil les pousse','Les oiseaux les font tomber'],ans:0,evidenceParagraph:3,explanation:'« Quand les gouttelettes grossissent et deviennent trop lourdes, elles tombent. »'},
    {id:'q7',type:'evidence',competencies:['READ_JUSTIFY'],difficulty:4,prompt:'Clique sur le paragraphe qui explique d’où vient l’eau des nappes souterraines.',evidenceParagraph:4,explanation:'« ...une autre s’infiltre dans le sol et forme des nappes souterraines. »'},
    {id:'q8',type:'choice',competencies:['READ_INFERENCE','READ_STRUCTURE'],difficulty:5,prompt:'Pourquoi parle-t-on de « cycle » ?',choices:['Parce que le voyage de l’eau recommence sans fin','Parce qu’il faut un vélo','Parce qu’il ne se produit qu’une fois'],ans:0,evidenceParagraph:4,explanation:'« Puis le voyage recommence » : un cycle revient toujours à son point de départ.'}
   ]
  },

  // ===== Lot 6 (18/10/2026) : derniers chapitres de lecture du collège (lecture expressive,
  // versification, dénonciation, texte complexe, fantastique, argumentation) et renfort du primaire.
  // Textes originaux de La Fontaine, Baudelaire (mort en 1867) et Hugo ; adaptations libres de
  // Maupassant et Perrault (domaine public) ; documents et récits originaux Finot Académie.

  fr_6e_grenouille_boeuf_01:{
   id:'fr_6e_grenouille_boeuf_01',level:'6e',subject:'francais',type:'literary_text',documentType:'fable',
   title:'La Grenouille qui se veut faire aussi grosse que le Bœuf',author:'Jean de La Fontaine',work:'Fables, livre I (1668)',
   sourceType:'public_domain',sourceReference:'Texte original de Jean de La Fontaine (mort en 1695), dans le domaine public.',
   chapterLinks:['fr6a'],verse:true,stanzas:[10],
   competencies:['READ_CHARACTER','READ_EMOTION_INTENTION','READ_VOCAB_CONTEXT','READ_CAUSE_CONSEQUENCE','READ_STRUCTURE','READ_JUSTIFY','READ_MAIN_IDEA','READ_GENRE'],
   difficulty:5,estimatedReadingMinutes:2,audioMode:'audioRecommended',sessionSize:8,
   paragraphs:[
    'Une Grenouille vit un Bœuf',
    'Qui lui sembla de belle taille.',
    'Elle, qui n’était pas grosse en tout comme un œuf,',
    'Envieuse, s’étend, et s’enfle, et se travaille,',
    'Pour égaler l’animal en grosseur,',
    'Disant : Regardez bien, ma sœur ;',
    'Est-ce assez ? dites-moi ; n’y suis-je point encore ?',
    'Nenni. M’y voici donc ? Point du tout. M’y voilà ?',
    'Vous n’en approchez point. La chétive pécore',
    'S’enfla si bien qu’elle creva.',
    'Le monde est plein de gens qui ne sont pas plus sages :',
    'Tout bourgeois veut bâtir comme les grands seigneurs,',
    'Tout petit prince a des ambassadeurs,',
    'Tout marquis veut avoir des pages.'
   ],
   glossary:[{word:'Envieuse',definition:'Qui voudrait avoir ce qu’ont les autres.'},{word:'s’enfle',definition:'Se gonfle, devient plus grosse.'},{word:'Nenni',definition:'« Non », en ancien français.'},{word:'chétive',definition:'Petite et faible.'},{word:'pécore',definition:'Une sotte, une prétentieuse.'},{word:'pages',definition:'Jeunes garçons nobles au service d’un seigneur.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_EMOTION_INTENTION'],difficulty:4,prompt:'Quel sentiment pousse la Grenouille à se gonfler ?',choices:['L’envie : elle veut être aussi grosse que le Bœuf','La peur du Bœuf','La colère contre sa sœur'],ans:0,evidenceParagraph:3,explanation:'« Envieuse, s’étend, et s’enfle [...] / Pour égaler l’animal en grosseur ».'},
    {id:'q2',type:'choice',competencies:['READ_STRUCTURE'],difficulty:5,prompt:'Aux vers 6 à 9, comment le dialogue entre les deux grenouilles est-il construit ?',choices:['Des questions de la Grenouille et des réponses très courtes de sa sœur','Un long discours du Bœuf','Une seule réplique de la Grenouille'],ans:0,evidenceParagraph:7,explanation:'« M’y voici donc ? Point du tout. M’y voilà ? » : questions et réponses s’enchaînent très vite. À l’oral, il faut changer de voix à chaque réplique.'},
    {id:'q3',type:'choice',competencies:['READ_VOCAB_CONTEXT'],difficulty:4,prompt:'Que répond la sœur avec « Nenni » ?',choices:['Non','Oui','Peut-être'],ans:0,evidenceParagraph:7,explanation:'« Nenni » veut dire « non » : la Grenouille n’est pas encore aussi grosse que le Bœuf.'},
    {id:'q4',type:'choice',competencies:['READ_CAUSE_CONSEQUENCE'],difficulty:4,prompt:'Comment se termine l’histoire de la Grenouille ?',choices:['Elle s’enfle tant qu’elle éclate','Elle devient aussi grosse que le Bœuf','Elle renonce et rentre chez elle'],ans:0,evidenceParagraph:9,explanation:'« S’enfla si bien qu’elle creva. »'},
    {id:'q5',type:'evidence',competencies:['READ_JUSTIFY'],difficulty:5,prompt:'Clique sur le vers qui annonce la morale.',evidenceParagraph:10,explanation:'« Le monde est plein de gens qui ne sont pas plus sages » : La Fontaine passe des animaux aux hommes.'},
    {id:'q6',type:'choice',competencies:['READ_MAIN_IDEA'],difficulty:6,prompt:'Que dénonce la morale ?',choices:['Les gens qui veulent paraître plus importants qu’ils ne sont','Les gens qui mangent trop','Les animaux qui parlent'],ans:0,evidenceParagraph:11,explanation:'Le bourgeois qui imite les seigneurs, le petit prince qui veut des ambassadeurs : tous veulent jouer les grands, comme la Grenouille.'},
    {id:'q7',type:'choice',competencies:['READ_CHARACTER'],difficulty:4,prompt:'Pourquoi La Fontaine précise-t-il que la Grenouille n’était « pas grosse en tout comme un œuf » ?',choices:['Pour montrer combien son projet est impossible','Pour dire qu’elle a faim','Pour décrire sa couleur'],ans:0,evidenceParagraph:2,explanation:'Grosse comme un œuf face à un bœuf : la différence est immense, son ambition est ridicule.'},
    {id:'q8',type:'choice',competencies:['READ_GENRE'],difficulty:4,prompt:'Quelles sont les deux parties de cette fable ?',choices:['Un récit, puis une morale','Une question, puis une réponse','Une description, puis une recette'],ans:0,explanation:'Les dix premiers vers racontent ; les quatre derniers donnent la leçon.'}
   ]
  },

  fr_4e_albatros_01:{
   id:'fr_4e_albatros_01',level:'4e',subject:'francais',type:'literary_text',documentType:'poème',
   title:'L’Albatros',author:'Charles Baudelaire',work:'Les Fleurs du mal (1861)',
   sourceType:'public_domain',sourceReference:'Texte original de Charles Baudelaire (mort en 1867), dans le domaine public.',
   chapterLinks:['fr4w','fr4v'],verse:true,stanzas:[4,8,12],
   competencies:['READ_GENRE','READ_VOCAB_CONTEXT','READ_EMOTION_INTENTION','READ_INFERENCE','READ_JUSTIFY','READ_AUTHOR_INTENT','READ_STRUCTURE'],
   difficulty:7,estimatedReadingMinutes:3,audioMode:'audioRecommended',sessionSize:8,
   paragraphs:[
    'Souvent, pour s’amuser, les hommes d’équipage',
    'Prennent des albatros, vastes oiseaux des mers,',
    'Qui suivent, indolents compagnons de voyage,',
    'Le navire glissant sur les gouffres amers.',
    'À peine les ont-ils déposés sur les planches,',
    'Que ces rois de l’azur, maladroits et honteux,',
    'Laissent piteusement leurs grandes ailes blanches',
    'Comme des avirons traîner à côté d’eux.',
    'Ce voyageur ailé, comme il est gauche et veule !',
    'Lui, naguère si beau, qu’il est comique et laid !',
    'L’un agace son bec avec un brûle-gueule,',
    'L’autre mime, en boitant, l’infirme qui volait !',
    'Le Poète est semblable au prince des nuées',
    'Qui hante la tempête et se rit de l’archer ;',
    'Exilé sur le sol au milieu des huées,',
    'Ses ailes de géant l’empêchent de marcher.'
   ],
   glossary:[{word:'indolents',definition:'Tranquilles, qui se laissent porter sans effort.'},{word:'gouffres amers',definition:'Les profondeurs de la mer salée.'},{word:'azur',definition:'Le bleu du ciel.'},{word:'avirons',definition:'Les rames d’un bateau.'},{word:'veule',definition:'Mou, sans force.'},{word:'naguère',definition:'Il y a peu de temps.'},{word:'brûle-gueule',definition:'Une pipe à tuyau très court.'},{word:'huées',definition:'Les cris de moquerie d’une foule.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_GENRE','READ_STRUCTURE'],difficulty:6,prompt:'Combien de syllabes compte chaque vers de ce poème ?',choices:['Douze : ce sont des alexandrins','Huit : ce sont des octosyllabes','Le nombre change à chaque vers'],ans:0,explanation:'« Sou/vent/, pour/ s’a/mu/ser/, les/ hom/mes/ d’é/qui/page » : 12 syllabes (le e final de « équipage » ne compte pas). Ce sont des alexandrins, en quatre quatrains.'},
    {id:'q2',type:'choice',competencies:['READ_GENRE'],difficulty:6,prompt:'Dans la 1re strophe, « équipage / voyage » et « mers / amers » riment. Comment ces rimes sont-elles disposées ?',choices:['Croisées (ABAB)','Suivies (AABB)','Embrassées (ABBA)'],ans:0,evidenceParagraph:2,explanation:'Vers 1 et 3 (équipage/voyage), vers 2 et 4 (mers/amers) : les rimes alternent, elles sont croisées.'},
    {id:'q3',type:'choice',competencies:['READ_INFERENCE'],difficulty:6,prompt:'Quelle opposition le poème montre-t-il chez l’albatros ?',choices:['Majestueux dans le ciel, maladroit et ridicule sur le pont','Petit en mer, grand sur terre','Joyeux le jour, triste la nuit'],ans:0,evidenceParagraph:9,explanation:'« ces rois de l’azur » deviennent « maladroits et honteux » ; « naguère si beau, qu’il est comique et laid ! »'},
    {id:'q4',type:'choice',competencies:['READ_VOCAB_CONTEXT'],difficulty:6,prompt:'« Comme des avirons » : quelle figure de style est utilisée ?',choices:['Une comparaison','Une personnification','Une répétition'],ans:0,evidenceParagraph:7,explanation:'Les ailes sont comparées à des rames grâce à l’outil « comme » : c’est une comparaison.'},
    {id:'q5',type:'choice',competencies:['READ_EMOTION_INTENTION'],difficulty:6,prompt:'Comment se comportent les marins avec l’albatros ?',choices:['Ils se moquent de lui et le maltraitent','Ils le soignent','Ils l’admirent en silence'],ans:0,evidenceParagraph:11,explanation:'L’un lui agace le bec avec sa pipe, l’autre l’imite en boitant : ils sont cruels.'},
    {id:'q6',type:'evidence',competencies:['READ_JUSTIFY'],difficulty:7,prompt:'Clique sur le vers où Baudelaire compare directement le poète à l’albatros.',evidenceParagraph:12,explanation:'« Le Poète est semblable au prince des nuées » : le dernier quatrain révèle le sens du poème.'},
    {id:'q7',type:'choice',competencies:['READ_INFERENCE','READ_AUTHOR_INTENT'],difficulty:8,prompt:'Que signifie le dernier vers : « Ses ailes de géant l’empêchent de marcher » ?',choices:['Le talent qui rend le poète grand dans son art le rend maladroit et incompris parmi les hommes','Le poète a de vraies ailes','Le poète ne sait pas marcher depuis l’enfance'],ans:0,evidenceParagraph:15,explanation:'Comme l’albatros sur le pont, le poète, « exilé » parmi la foule qui le hue, est gêné par ce qui fait sa grandeur.'},
    {id:'q8',type:'choice',competencies:['READ_STRUCTURE','READ_AUTHOR_INTENT'],difficulty:7,prompt:'Pourquoi Baudelaire attend-il la dernière strophe pour parler du poète ?',choices:['Le récit de l’albatros prépare une comparaison qui donne tout son sens au poème','Il avait oublié d’en parler avant','Pour raconter une nouvelle histoire sans lien'],ans:0,explanation:'Les trois premières strophes forment une image ; la dernière en donne la clé : l’albatros, c’est le poète.'}
   ]
  },

  fr_3e_melancholia_01:{
   id:'fr_3e_melancholia_01',level:'3e',subject:'francais',type:'literary_text',documentType:'poème (extrait)',
   title:'Melancholia (extrait)',author:'Victor Hugo',work:'Les Contemplations (1856)',
   sourceType:'public_domain',sourceReference:'Extrait original de Victor Hugo (mort en 1885), dans le domaine public (dix premiers vers du passage sur le travail des enfants).',
   chapterLinks:['fr3b','fr3w'],verse:true,
   competencies:['READ_MAIN_IDEA','READ_VOCAB_CONTEXT','READ_INFERENCE','READ_AUTHOR_INTENT','READ_JUSTIFY','READ_STRUCTURE','READ_EMOTION_INTENTION','READ_GENRE'],
   difficulty:8,estimatedReadingMinutes:3,audioMode:'audioRecommended',sessionSize:8,
   paragraphs:[
    'Où vont tous ces enfants dont pas un seul ne rit ?',
    'Ces doux êtres pensifs que la fièvre maigrit ?',
    'Ces filles de huit ans qu’on voit cheminer seules ?',
    'Ils s’en vont travailler quinze heures sous des meules ;',
    'Ils vont, de l’aube au soir, faire éternellement',
    'Dans la même prison le même mouvement.',
    'Accroupis sous les dents d’une machine sombre,',
    'Monstre hideux qui mâche on ne sait quoi dans l’ombre,',
    'Innocents dans un bagne, anges dans un enfer,',
    'Ils travaillent. Tout est d’airain, tout est de fer.'
   ],
   glossary:[{word:'pensifs',definition:'Perdus dans leurs pensées, graves.'},{word:'cheminer',definition:'Marcher, faire route.'},{word:'meules',definition:'Ici : les lourdes roues des machines d’usine.'},{word:'bagne',definition:'Prison où les condamnés faisaient des travaux forcés.'},{word:'airain',definition:'Ancien nom du bronze : un métal dur.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_MAIN_IDEA'],difficulty:6,prompt:'Quel est le sujet de cet extrait ?',choices:['Le travail des enfants dans les usines','Les jeux des enfants à l’école','La vie à la campagne'],ans:0,evidenceParagraph:3,explanation:'« Ils s’en vont travailler quinze heures sous des meules. » Au XIXe siècle, de très jeunes enfants travaillaient dans les usines.'},
    {id:'q2',type:'choice',competencies:['READ_STRUCTURE','READ_GENRE'],difficulty:7,prompt:'Le poème commence par trois questions. Quel effet produisent-elles ?',choices:['Elles interpellent le lecteur et l’obligent à regarder ces enfants','Elles montrent que le poète ne connaît pas la réponse','Elles rendent le texte drôle'],ans:0,evidenceParagraph:0,explanation:'Ces questions oratoires attirent l’attention ; la réponse, terrible, arrive au vers 4.'},
    {id:'q3',type:'choice',competencies:['READ_VOCAB_CONTEXT'],difficulty:7,prompt:'La machine est appelée « Monstre hideux qui mâche ». Quelle figure de style est-ce ?',choices:['Une métaphore qui fait de la machine un monstre dévorant','Une comparaison avec « comme »','Une simple description technique'],ans:0,evidenceParagraph:7,explanation:'Sans outil de comparaison, la machine devient un monstre qui « mâche » : c’est une métaphore (et une personnification).'},
    {id:'q4',type:'choice',competencies:['READ_STRUCTURE'],difficulty:7,prompt:'Au vers 9, « Innocents dans un bagne, anges dans un enfer » oppose des mots de sens contraire. Quel est l’effet de cette opposition ?',choices:['Elle souligne l’injustice : des êtres purs sont traités comme des condamnés','Elle rend le vers plus joyeux','Elle décrit le paysage'],ans:0,evidenceParagraph:8,explanation:'Innocents/bagne, anges/enfer : ces antithèses montrent l’injustice faite aux enfants.'},
    {id:'q5',type:'evidence',competencies:['READ_JUSTIFY'],difficulty:7,prompt:'Clique sur le vers qui insiste sur la répétition épuisante du travail.',evidenceParagraph:5,explanation:'« Dans la même prison le même mouvement » : la répétition de « même » imite la monotonie du travail.'},
    {id:'q6',type:'choice',competencies:['READ_EMOTION_INTENTION','READ_INFERENCE'],difficulty:6,prompt:'Que révèle le premier vers, « dont pas un seul ne rit » ?',choices:['Ces enfants ont perdu la joie de l’enfance','Ces enfants sont punis pour avoir ri','Ces enfants n’aiment pas les blagues'],ans:0,evidenceParagraph:0,explanation:'Des enfants qui ne rient jamais : leur enfance leur a été volée.'},
    {id:'q7',type:'choice',competencies:['READ_INFERENCE'],difficulty:8,prompt:'Pourquoi le vers 10 commence-t-il par une phrase très courte : « Ils travaillent. » ?',choices:['Pour frapper le lecteur par un constat brutal','Parce que Hugo manquait de place','Pour annoncer une bonne nouvelle'],ans:0,evidenceParagraph:9,explanation:'Après les longues images, cette phrase sèche tombe comme un verdict.'},
    {id:'q8',type:'choice',competencies:['READ_AUTHOR_INTENT'],difficulty:7,prompt:'Quel est le but de Victor Hugo ?',choices:['Dénoncer le travail des enfants et émouvoir le lecteur','Décrire le fonctionnement d’une usine','Raconter ses souvenirs d’enfance'],ans:0,explanation:'Par les images et les oppositions, Hugo dénonce une injustice de son époque.'}
   ]
  },

  fr_3e_parure_01:{
   id:'fr_3e_parure_01',level:'3e',subject:'francais',type:'literary_text',documentType:'nouvelle réaliste (adaptation)',
   title:'La Parure',author:'Guy de Maupassant',work:'La Parure (1884)',
   sourceType:'public_domain',sourceReference:'Résumé-adaptation libre pour la 3e, d’après Guy de Maupassant (mort en 1893), dans le domaine public. La réplique finale est conservée.',
   chapterLinks:['fr3f'],
   competencies:['READ_CHARACTER','READ_CAUSE_CONSEQUENCE','READ_TIME','READ_INFERENCE','READ_EMOTION_INTENTION','READ_JUSTIFY','READ_STRUCTURE','READ_AUTHOR_INTENT'],
   difficulty:8,estimatedReadingMinutes:4,audioMode:'audioAllowed',sessionSize:8,
   paragraphs:[
    'Mathilde Loisel, mariée à un petit employé du ministère de l’Instruction publique, souffrait sans cesse de ne pas être riche. Elle rêvait de salons luxueux, de bijoux et de belles toilettes.',
    'Un soir, son mari rentra, tout fier, avec une invitation pour un grand bal au ministère. Mais Mathilde fondit en larmes : elle n’avait rien à se mettre. Son mari lui donna alors les quatre cents francs qu’il gardait pour s’acheter un fusil.',
    'La robe achetée, il manquait encore un bijou. Mathilde alla voir son amie Mme Forestier, qui lui prêta volontiers une superbe rivière de diamants.',
    'Au bal, Mathilde fut la plus belle. Tous les hommes voulaient danser avec elle. Mais en rentrant chez elle, au petit matin, elle s’aperçut avec horreur que le collier n’était plus à son cou.',
    'Les Loisel le cherchèrent partout, en vain. Ils achetèrent alors chez un bijoutier un collier semblable, pour trente-six mille francs, en empruntant de tous côtés, et le rendirent à Mme Forestier sans rien dire.',
    'Pendant dix ans, ils vécurent dans la misère pour rembourser leurs dettes. Mathilde fit le ménage, porta les seaux d’eau, marchanda chez l’épicier. Elle devint une femme forte, dure et rude.',
    'Un dimanche, elle croisa Mme Forestier, toujours jeune et belle, et lui raconta tout. Son amie, bouleversée, lui prit les mains : « Oh ! ma pauvre Mathilde ! Mais la mienne était fausse. Elle valait au plus cinq cents francs !… »'
   ],
   glossary:[{word:'toilettes',definition:'Ici : les robes, les tenues élégantes.'},{word:'rivière de diamants',definition:'Un collier formé d’une rangée de diamants.'},{word:'en vain',definition:'Sans résultat.'},{word:'marchanda',definition:'Discuta le prix pour payer moins cher.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_CHARACTER'],difficulty:6,prompt:'De quoi Mathilde souffre-t-elle au début ?',choices:['De ne pas être riche et de ne pas vivre dans le luxe','D’une maladie grave','D’être seule'],ans:0,evidenceParagraph:0,explanation:'« ...souffrait sans cesse de ne pas être riche. Elle rêvait de salons luxueux... »'},
    {id:'q2',type:'choice',competencies:['READ_INFERENCE','READ_CHARACTER'],difficulty:6,prompt:'Que montre le sacrifice des quatre cents francs sur le mari ?',choices:['Il aime sa femme et renonce à son propre plaisir pour elle','Il n’aime pas la chasse','Il est très riche'],ans:0,evidenceParagraph:1,explanation:'Il lui donne l’argent qu’il gardait « pour s’acheter un fusil » : il se sacrifie pour elle.'},
    {id:'q3',type:'choice',competencies:['READ_CAUSE_CONSEQUENCE'],difficulty:6,prompt:'Pourquoi les Loisel vivent-ils dix ans dans la misère ?',choices:['Pour rembourser le collier racheté trente-six mille francs','Parce que le mari a perdu son travail','Parce qu’ils ont acheté une maison'],ans:0,evidenceParagraph:5,explanation:'Ils ont emprunté pour remplacer le collier perdu et doivent rembourser leurs dettes.'},
    {id:'q4',type:'choice',competencies:['READ_TIME','READ_STRUCTURE'],difficulty:6,prompt:'Combien de temps sépare la perte du collier de la rencontre finale ?',choices:['Environ dix ans','Une semaine','Un an'],ans:0,evidenceParagraph:5,explanation:'« Pendant dix ans, ils vécurent dans la misère... » puis vient la rencontre « un dimanche ».'},
    {id:'q5',type:'choice',competencies:['READ_INFERENCE'],difficulty:8,prompt:'Pourquoi les Loisel ont-ils rendu le collier « sans rien dire » ?',choices:['Par honte et par orgueil : ils n’ont pas osé avouer la perte','Parce qu’ils ne savaient pas parler','Parce que Mme Forestier était absente'],ans:0,evidenceParagraph:4,explanation:'Avouer la perte aurait été humiliant : ce silence est la cause de dix ans de malheur, puisqu’un aveu leur aurait appris que le collier était faux.'},
    {id:'q6',type:'evidence',competencies:['READ_JUSTIFY'],difficulty:7,prompt:'Clique sur le paragraphe qui montre comment la misère a transformé Mathilde.',evidenceParagraph:5,explanation:'« Elle devint une femme forte, dure et rude. »'},
    {id:'q7',type:'choice',competencies:['READ_EMOTION_INTENTION','READ_STRUCTURE'],difficulty:8,prompt:'Quel est l’effet de la révélation finale de Mme Forestier ?',choices:['Elle rend tragique et absurde le sacrifice de dix années','Elle rassure le lecteur','Elle annonce un mariage'],ans:0,evidenceParagraph:6,explanation:'Le collier ne valait « au plus cinq cents francs » : dix ans de misère pour rien. C’est une chute, typique de la nouvelle.'},
    {id:'q8',type:'choice',competencies:['READ_AUTHOR_INTENT'],difficulty:8,prompt:'Que critique Maupassant à travers cette histoire ?',choices:['L’importance excessive accordée aux apparences et au paraître','Les bals au ministère','Le métier de bijoutier'],ans:0,explanation:'Le rêve de paraître riche, le faux collier qui trompe tout le monde, l’orgueil de ne rien avouer : tout repose sur les apparences.'}
   ]
  },

  fr_4e_horla_01:{
   id:'fr_4e_horla_01',level:'4e',subject:'francais',type:'literary_text',documentType:'nouvelle fantastique (adaptation)',
   title:'Le Horla',author:'Guy de Maupassant',work:'Le Horla (1887)',
   sourceType:'public_domain',sourceReference:'Adaptation libre et très abrégée pour la 4e, d’après Guy de Maupassant (mort en 1893), dans le domaine public. La forme du journal intime et les dates sont conservées.',
   chapterLinks:['fr4h'],
   competencies:['READ_GENRE','READ_NARRATOR_POV','READ_TIME','READ_EXPLICIT','READ_INFERENCE','READ_EMOTION_INTENTION','READ_JUSTIFY','READ_SEQUENCE'],
   difficulty:7,estimatedReadingMinutes:3,audioMode:'audioAllowed',sessionSize:8,
   paragraphs:[
    '8 mai. — Quelle journée admirable ! J’ai passé toute la matinée étendu sur l’herbe, devant ma maison, au bord de la Seine. Vers onze heures, un superbe trois-mâts brésilien, tout blanc, est passé devant chez moi. Je l’ai salué, je ne sais pourquoi.',
    '25 mai. — Je dors mal. J’ai l’impression, la nuit, que quelqu’un s’approche de moi, s’accroupit sur ma poitrine et m’étouffe. Je me réveille en sueur. Personne.',
    '5 juillet. — Ai-je perdu la raison ? Hier soir, j’avais posé une carafe pleine d’eau sur ma table de nuit. Ce matin, elle est vide. Les portes étaient fermées à clé. Qui a bu cette eau ? Moi, sans le savoir ? Ou quelqu’un d’autre ?',
    '6 août. — Cette fois, je ne suis pas fou. En plein jour, dans mon jardin, j’ai vu la tige d’une rose se plier, comme si une main invisible la cueillait. Puis la fleur s’est élevée en l’air, toute seule, et a disparu.',
    'Je suis certain, maintenant, qu’il existe près de moi un être invisible, qui boit mon eau et rôde autour de moi. À moins que… à moins que ce ne soit moi qui devienne fou.'
   ],
   glossary:[{word:'trois-mâts',definition:'Un grand voilier à trois mâts.'},{word:'carafe',definition:'Une bouteille à large base qui sert à servir l’eau.'},{word:'rôde',definition:'Tourne autour, de façon inquiétante.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_GENRE','READ_NARRATOR_POV'],difficulty:5,prompt:'Sous quelle forme ce récit est-il écrit ?',choices:['Un journal intime daté, écrit à la première personne','Une pièce de théâtre','Une lettre adressée à un ami'],ans:0,evidenceParagraph:0,explanation:'Chaque passage commence par une date et le narrateur dit « je » : c’est un journal intime.'},
    {id:'q2',type:'choice',competencies:['READ_EMOTION_INTENTION'],difficulty:4,prompt:'Dans quel état d’esprit est le narrateur le 8 mai ?',choices:['Heureux et serein','Terrifié','Malade'],ans:0,evidenceParagraph:0,explanation:'« Quelle journée admirable ! » : tout commence dans le calme.'},
    {id:'q3',type:'choice',competencies:['READ_EXPLICIT'],difficulty:4,prompt:'Qu’est-ce qui a disparu dans la nuit du 4 au 5 juillet ?',choices:['L’eau de la carafe','Une rose','Le trois-mâts'],ans:0,evidenceParagraph:2,explanation:'« ...j’avais posé une carafe pleine d’eau [...] Ce matin, elle est vide. »'},
    {id:'q4',type:'choice',competencies:['READ_GENRE','READ_INFERENCE'],difficulty:7,prompt:'Pourquoi ce récit est-il fantastique ?',choices:['On hésite entre une explication surnaturelle (un être invisible) et la folie du narrateur','Il se passe dans un monde imaginaire avec des fées','Il raconte des faits historiques'],ans:0,evidenceParagraph:4,explanation:'Le fantastique repose sur cette hésitation : « un être invisible » ou « moi qui devienne fou » ? Le récit ne tranche pas.'},
    {id:'q5',type:'evidence',competencies:['READ_JUSTIFY'],difficulty:6,prompt:'Clique sur le passage où le narrateur voit un phénomène inexplicable en plein jour.',evidenceParagraph:3,explanation:'Le 6 août, la rose est cueillie « comme si une main invisible la cueillait ».'},
    {id:'q6',type:'choice',competencies:['READ_INFERENCE'],difficulty:6,prompt:'Pourquoi le narrateur précise-t-il que « les portes étaient fermées à clé » ?',choices:['Pour montrer que personne n’a pu entrer, ce qui rend le mystère inexplicable','Pour dire qu’il a peur des voleurs','Pour expliquer qu’il a perdu ses clés'],ans:0,evidenceParagraph:2,explanation:'Si personne n’a pu entrer, qui a bu l’eau ? Ce détail élimine les explications ordinaires.'},
    {id:'q7',type:'choice',competencies:['READ_TIME','READ_SEQUENCE'],difficulty:5,prompt:'Comment évolue l’état du narrateur au fil des dates ?',choices:['Du calme à une angoisse de plus en plus forte','De l’angoisse au calme','Il ne change pas'],ans:0,evidenceParagraph:4,explanation:'Journée admirable (mai), puis cauchemars, puis doute (« Ai-je perdu la raison ? »), puis certitude inquiétante.'},
    {id:'q8',type:'order',competencies:['READ_SEQUENCE'],difficulty:5,prompt:'Remets les événements dans l’ordre.',tokens:['Le trois-mâts passe','Les cauchemars commencent','La carafe est vide','La rose est cueillie'],ans:'Le trois-mâts passe Les cauchemars commencent La carafe est vide La rose est cueillie',explanation:'C’est l’ordre des dates : 8 mai, 25 mai, 5 juillet, 6 août.'}
   ]
  },

  fr_4e_animal_classe_01:{
   id:'fr_4e_animal_classe_01',level:'4e',subject:'francais',type:'document',documentType:'texte argumentatif',
   title:'Faut-il un animal en classe ?',author:null,work:null,sourceType:'original_mathquest',
   chapterLinks:['fr4i','fr4j'],
   competencies:['READ_ARGUMENT','READ_STRUCTURE','READ_VOCAB_CONTEXT','READ_JUSTIFY','READ_AUTHOR_INTENT','READ_MAIN_IDEA'],
   difficulty:6,estimatedReadingMinutes:3,audioMode:'audioAllowed',sessionSize:8,
   paragraphs:[
    'Dans certaines classes, un poisson rouge, un hamster ou des phasmes vivent avec les élèves. À mon avis, c’est une excellente idée, à condition de bien s’y prendre.',
    'Premièrement, un animal rend les élèves responsables. Chacun, à tour de rôle, doit le nourrir, nettoyer son espace et vérifier qu’il va bien. Par exemple, dans la classe de ma cousine, un tableau indique qui s’occupe des phasmes chaque semaine.',
    'De plus, observer un animal permet d’apprendre. On découvre comment il se nourrit, grandit et se comporte, ce qui rend les leçons de sciences bien plus vivantes.',
    'On pourrait objecter que les animaux restent seuls pendant les vacances. C’est vrai, mais il suffit d’organiser un tour de garde : chaque famille volontaire peut l’accueillir quelques jours.',
    'Bien sûr, il faut choisir un animal adapté et vérifier qu’aucun élève n’est allergique. Avec ces précautions, un animal en classe apporte bien plus qu’il ne coûte.'
   ],
   glossary:[{word:'phasmes',definition:'Insectes qui ressemblent à des brindilles.'},{word:'objecter',definition:'Opposer un argument contraire.'},{word:'allergique',definition:'Dont le corps réagit mal (éternuements, boutons…) au contact de quelque chose.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_ARGUMENT','READ_MAIN_IDEA'],difficulty:5,prompt:'Quelle est la thèse de l’auteur ?',choices:['Avoir un animal en classe est une excellente idée, si l’on s’y prend bien','Les animaux doivent rester à la maison','Les phasmes sont les meilleurs animaux'],ans:0,evidenceParagraph:0,explanation:'« À mon avis, c’est une excellente idée, à condition de bien s’y prendre. »'},
    {id:'q2',type:'choice',competencies:['READ_ARGUMENT'],difficulty:5,prompt:'Quel est le premier argument ?',choices:['Un animal rend les élèves responsables','Un animal coûte peu cher','Un animal fait rire'],ans:0,evidenceParagraph:1,explanation:'« Premièrement, un animal rend les élèves responsables. »'},
    {id:'q3',type:'choice',competencies:['READ_ARGUMENT','READ_STRUCTURE'],difficulty:5,prompt:'À quoi sert l’exemple de la classe de la cousine ?',choices:['À illustrer concrètement le premier argument','À contredire la thèse','À conclure le texte'],ans:0,evidenceParagraph:1,explanation:'Introduit par « Par exemple », il montre comment la responsabilité est partagée en pratique.'},
    {id:'q4',type:'evidence',competencies:['READ_JUSTIFY','READ_ARGUMENT'],difficulty:6,prompt:'Clique sur le paragraphe où l’auteur répond à une objection.',evidenceParagraph:3,explanation:'« On pourrait objecter que... C’est vrai, mais... » : l’auteur cite l’argument adverse puis y répond.'},
    {id:'q5',type:'choice',competencies:['READ_ARGUMENT'],difficulty:6,prompt:'Quelle est l’objection citée par l’auteur ?',choices:['Les animaux restent seuls pendant les vacances','Les animaux sont trop bruyants','Les animaux coûtent trop cher'],ans:0,evidenceParagraph:3,explanation:'« On pourrait objecter que les animaux restent seuls pendant les vacances. »'},
    {id:'q6',type:'choice',competencies:['READ_VOCAB_CONTEXT','READ_STRUCTURE'],difficulty:6,prompt:'Quel est le rôle des mots « Premièrement » et « De plus » ?',choices:['Ils organisent les arguments et les ajoutent l’un à l’autre','Ils introduisent une opposition','Ils annoncent une conclusion'],ans:0,evidenceParagraph:2,explanation:'Ce sont des connecteurs d’énumération et d’addition.'},
    {id:'q7',type:'choice',competencies:['READ_ARGUMENT','READ_AUTHOR_INTENT'],difficulty:7,prompt:'Dans le dernier paragraphe, pourquoi l’auteur parle-t-il des allergies ?',choices:['Pour montrer qu’il a pensé aux limites, ce qui rend sa thèse plus crédible','Pour changer d’avis','Pour faire peur au lecteur'],ans:0,evidenceParagraph:4,explanation:'En reconnaissant les précautions nécessaires, il paraît raisonnable et convainc mieux.'},
    {id:'q8',type:'order',competencies:['READ_STRUCTURE'],difficulty:6,prompt:'Remets les étapes du texte dans l’ordre.',tokens:['La thèse','L’argument de la responsabilité','L’argument de l’apprentissage','L’objection et la réponse','Les précautions et la conclusion'],ans:'La thèse L’argument de la responsabilité L’argument de l’apprentissage L’objection et la réponse Les précautions et la conclusion',explanation:'C’est l’ordre des paragraphes.'}
   ]
  },

  fr_cp_velo_01:{
   id:'fr_cp_velo_01',level:'CP',subject:'francais',type:'literary_text',documentType:'récit',
   title:'Le vélo de Malo',author:null,work:null,sourceType:'original_mathquest',
   chapterLinks:['cp-fr-comprendre'],
   competencies:['READ_EXPLICIT','READ_CHARACTER','READ_EMOTION_INTENTION','READ_SEQUENCE'],
   difficulty:1,estimatedReadingMinutes:1,audioMode:'audioRecommended',sessionSize:5,
   paragraphs:[
    'Malo a un vélo rouge.',
    'Il tombe. Il a mal au genou.',
    'Papa lui dit : « Essaie encore ! »',
    'Malo remonte sur son vélo.',
    'Il roule tout seul ! Il est fier.'
   ],
   glossary:[{word:'fier',definition:'Content de ce qu’on a réussi.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_EXPLICIT'],difficulty:1,prompt:'De quelle couleur est le vélo ?',choices:['Rouge','Bleu','Vert'],ans:0,evidenceParagraph:0,explanation:'« Malo a un vélo rouge. »'},
    {id:'q2',type:'choice',competencies:['READ_EXPLICIT'],difficulty:1,prompt:'Où Malo a-t-il mal ?',choices:['Au genou','À la tête','Au bras'],ans:0,evidenceParagraph:1,explanation:'« Il a mal au genou. »'},
    {id:'q3',type:'choice',competencies:['READ_CHARACTER'],difficulty:1,prompt:'Qui encourage Malo ?',choices:['Papa','Maman','Sa sœur'],ans:0,evidenceParagraph:2,explanation:'« Papa lui dit : « Essaie encore ! » »'},
    {id:'q4',type:'choice',competencies:['READ_EMOTION_INTENTION'],difficulty:2,prompt:'Comment se sent Malo à la fin ?',choices:['Fier','Triste','Fâché'],ans:0,evidenceParagraph:4,explanation:'« Il roule tout seul ! Il est fier. »'},
    {id:'q5',type:'order',competencies:['READ_SEQUENCE'],difficulty:2,prompt:'Remets l’histoire dans l’ordre.',tokens:['Malo tombe','Papa dit d’essayer encore','Malo roule tout seul'],ans:'Malo tombe Papa dit d’essayer encore Malo roule tout seul',explanation:'C’est l’ordre du texte.'}
   ]
  },

  fr_ce1_grenouille_doc_01:{
   id:'fr_ce1_grenouille_doc_01',level:'CE1',subject:'francais',type:'document',documentType:'texte documentaire',
   title:'Du têtard à la grenouille',author:null,work:null,sourceType:'original_mathquest',
   chapterLinks:['ce1-fr-comprendre'],
   competencies:['READ_EXPLICIT','READ_SEQUENCE','READ_VOCAB_CONTEXT','READ_PLACE','READ_MAIN_IDEA'],
   difficulty:2,estimatedReadingMinutes:2,audioMode:'audioRecommended',sessionSize:7,
   paragraphs:[
    'Au printemps, la grenouille pond des centaines d’œufs dans l’eau d’une mare. Ils sont entourés d’une sorte de gelée.',
    'De chaque œuf sort un têtard. Il vit dans l’eau, il a une grosse tête et une longue queue pour nager, mais pas de pattes.',
    'Peu à peu, le têtard change. Les pattes arrière poussent d’abord, puis les pattes avant.',
    'Ensuite, sa queue raccourcit jusqu’à disparaître. Il peut maintenant sortir de l’eau et respirer l’air : c’est une petite grenouille.',
    'Ce grand changement s’appelle une métamorphose.'
   ],
   glossary:[{word:'mare',definition:'Une petite étendue d’eau qui ne coule pas.'},{word:'têtard',definition:'Le petit de la grenouille, qui vit dans l’eau.'},{word:'métamorphose',definition:'Un changement complet de forme.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_PLACE'],difficulty:1,prompt:'Où la grenouille pond-elle ses œufs ?',choices:['Dans l’eau d’une mare','Dans un arbre','Sous la terre'],ans:0,evidenceParagraph:0,explanation:'« ...dans l’eau d’une mare. »'},
    {id:'q2',type:'choice',competencies:['READ_EXPLICIT'],difficulty:2,prompt:'Que sort-il de chaque œuf ?',choices:['Un têtard','Une grenouille','Un poisson'],ans:0,evidenceParagraph:1,explanation:'« De chaque œuf sort un têtard. »'},
    {id:'q3',type:'choice',competencies:['READ_EXPLICIT'],difficulty:3,prompt:'Qu’est-ce que le têtard a, et que la grenouille adulte n’a plus ?',choices:['Une longue queue','Des pattes','Une tête'],ans:0,evidenceParagraph:3,explanation:'Le têtard a une longue queue ; elle « raccourcit jusqu’à disparaître ».'},
    {id:'q4',type:'choice',competencies:['READ_SEQUENCE'],difficulty:2,prompt:'Quelles pattes poussent en premier ?',choices:['Les pattes arrière','Les pattes avant','Toutes en même temps'],ans:0,evidenceParagraph:2,explanation:'« Les pattes arrière poussent d’abord, puis les pattes avant. »'},
    {id:'q5',type:'choice',competencies:['READ_VOCAB_CONTEXT'],difficulty:3,prompt:'Une « métamorphose », c’est...',choices:['Un grand changement de forme','Un voyage','Une maladie'],ans:0,evidenceParagraph:4,explanation:'« Ce grand changement s’appelle une métamorphose. »'},
    {id:'q6',type:'order',competencies:['READ_SEQUENCE'],difficulty:3,prompt:'Remets les étapes dans l’ordre.',tokens:['Les œufs','Le têtard','Les pattes poussent','La queue disparaît'],ans:'Les œufs Le têtard Les pattes poussent La queue disparaît',explanation:'C’est l’ordre de la métamorphose.'},
    {id:'q7',type:'choice',competencies:['READ_MAIN_IDEA'],difficulty:2,prompt:'Ce texte explique...',choices:['Comment un têtard devient une grenouille','Comment construire une mare','Pourquoi les grenouilles chantent'],ans:0,explanation:'C’est le titre et le sujet de tous les paragraphes.'}
   ]
  },

  fr_ce2_cabane_01:{
   id:'fr_ce2_cabane_01',level:'CE2',subject:'francais',type:'literary_text',documentType:'récit',
   title:'La cabane du fond du jardin',author:null,work:null,sourceType:'original_mathquest',
   chapterLinks:['ce2-fr-comprendre'],
   competencies:['READ_CHARACTER','READ_EXPLICIT','READ_EMOTION_INTENTION','READ_INFERENCE','READ_REFERENCE','READ_CAUSE_CONSEQUENCE','READ_JUSTIFY'],
   difficulty:3,estimatedReadingMinutes:2,audioMode:'audioAllowed',sessionSize:7,
   paragraphs:[
    'Samedi, Inès et son petit frère Hugo décidèrent de construire une cabane au fond du jardin.',
    'Inès voulait une cabane haute, avec un toit pointu. Hugo, lui, voulait une cabane basse, avec une porte secrète. Ils se disputèrent si fort que la voisine passa la tête par-dessus la haie.',
    'Vexé, Hugo partit bouder sur la balançoire. Inès commença seule, mais les planches tombaient sans cesse : il fallait quelqu’un pour les tenir.',
    'Elle alla trouver son frère : « Tu tiens les planches, et je te fais ta porte secrète. D’accord ? » Hugo sauta de la balançoire.',
    'Le soir, la cabane était debout : un peu de travers, avec un toit pointu et une minuscule porte secrète. Ils y mangèrent leur goûter, très fiers.'
   ],
   glossary:[{word:'Vexé',definition:'Blessé dans son amour-propre, froissé.'},{word:'bouder',definition:'Montrer qu’on est fâché en restant dans son coin.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_CHARACTER','READ_EXPLICIT'],difficulty:2,prompt:'Qui sont les deux personnages principaux ?',choices:['Inès et son petit frère Hugo','Inès et la voisine','Hugo et son père'],ans:0,evidenceParagraph:0,explanation:'« ...Inès et son petit frère Hugo décidèrent de construire une cabane... »'},
    {id:'q2',type:'choice',competencies:['READ_CAUSE_CONSEQUENCE'],difficulty:3,prompt:'Pourquoi Inès et Hugo se disputent-ils ?',choices:['Ils ne veulent pas la même cabane','Hugo a cassé une planche','Inès a mangé le goûter'],ans:0,evidenceParagraph:1,explanation:'Inès veut une cabane haute au toit pointu, Hugo une cabane basse avec une porte secrète.'},
    {id:'q3',type:'choice',competencies:['READ_INFERENCE'],difficulty:4,prompt:'Pourquoi la voisine passe-t-elle la tête par-dessus la haie ?',choices:['Elle a entendu les cris de la dispute','Elle veut aider à construire','Elle cherche son chat'],ans:0,evidenceParagraph:1,explanation:'« Ils se disputèrent si fort que la voisine passa la tête... » : le bruit l’a attirée.'},
    {id:'q4',type:'choice',competencies:['READ_CAUSE_CONSEQUENCE','READ_INFERENCE'],difficulty:4,prompt:'Pourquoi Inès va-t-elle chercher son frère ?',choices:['Seule, elle n’arrive pas à faire tenir les planches','Elle veut arrêter la cabane','Leur mère l’appelle'],ans:0,evidenceParagraph:2,explanation:'« ...les planches tombaient sans cesse : il fallait quelqu’un pour les tenir. »'},
    {id:'q5',type:'choice',competencies:['READ_EMOTION_INTENTION'],difficulty:3,prompt:'Que montre le fait qu’Hugo « sauta de la balançoire » ?',choices:['Il est content d’accepter la proposition','Il a peur de sa sœur','Il est tombé'],ans:0,evidenceParagraph:3,explanation:'Il bondit tout de suite : la proposition lui plaît.'},
    {id:'q6',type:'evidence',competencies:['READ_JUSTIFY'],difficulty:4,prompt:'Clique sur le paragraphe qui montre que chacun a obtenu ce qu’il voulait.',evidenceParagraph:4,explanation:'La cabane a « un toit pointu » (l’idée d’Inès) et « une minuscule porte secrète » (l’idée d’Hugo).'},
    {id:'q7',type:'choice',competencies:['READ_REFERENCE'],difficulty:3,prompt:'Dans « Ils y mangèrent leur goûter », où est « y » ?',choices:['Dans la cabane','Sur la balançoire','Chez la voisine'],ans:0,evidenceParagraph:4,explanation:'« y » remplace un lieu déjà cité : la cabane.'}
   ]
  },

  fr_cm1_chateau_fort_doc_01:{
   id:'fr_cm1_chateau_fort_doc_01',level:'CM1',subject:'francais',type:'document',documentType:'texte documentaire',
   title:'Le château fort au Moyen Âge',author:null,work:null,sourceType:'original_mathquest',
   chapterLinks:['cm1-fr-documentaire'],
   competencies:['READ_MAIN_IDEA','READ_EXPLICIT','READ_VOCAB_CONTEXT','READ_CAUSE_CONSEQUENCE','READ_STRUCTURE','READ_JUSTIFY','READ_INFERENCE'],
   difficulty:4,estimatedReadingMinutes:3,audioMode:'audioAllowed',sessionSize:8,
   paragraphs:[
    'Au Moyen Âge, les seigneurs font construire des châteaux forts pour protéger leurs terres et les gens qui y vivent. Les premiers sont en bois ; à partir du XIe siècle, on les bâtit de plus en plus souvent en pierre, plus solide et qui ne brûle pas.',
    'Le château est souvent entouré de fossés remplis d’eau, les douves. Pour entrer, il faut franchir le pont-levis, que l’on relève en cas d’attaque.',
    'De hautes murailles, les remparts, entourent la cour. En haut, les créneaux permettent aux soldats de tirer tout en se cachant. Dans les murs, de fines ouvertures, les meurtrières, servent à tirer des flèches.',
    'Au centre se dresse le donjon, la tour la plus haute et la plus solide. C’est là que vit souvent le seigneur, et c’est le dernier refuge si l’ennemi entre dans le château.',
    'En cas de danger, les paysans des environs viennent s’abriter derrière les remparts.'
   ],
   glossary:[{word:'seigneurs',definition:'Au Moyen Âge, nobles qui possédaient des terres et commandaient ceux qui y vivaient.'},{word:'douves',definition:'Fossés remplis d’eau autour d’un château.'},{word:'remparts',definition:'Hautes murailles qui protègent un château ou une ville.'},{word:'donjon',definition:'La tour principale d’un château fort.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_MAIN_IDEA'],difficulty:3,prompt:'À quoi sert un château fort ?',choices:['À protéger le seigneur, ses terres et ses habitants','À organiser des fêtes','À stocker du blé seulement'],ans:0,evidenceParagraph:0,explanation:'« ...pour protéger leurs terres et les gens qui y vivent. »'},
    {id:'q2',type:'choice',competencies:['READ_CAUSE_CONSEQUENCE'],difficulty:4,prompt:'Pourquoi construit-on de plus en plus de châteaux en pierre ?',choices:['La pierre est plus solide et ne brûle pas','La pierre est plus légère','Le bois coûte trop cher'],ans:0,evidenceParagraph:0,explanation:'« ...en pierre, plus solide et qui ne brûle pas. »'},
    {id:'q3',type:'choice',competencies:['READ_VOCAB_CONTEXT'],difficulty:3,prompt:'Que sont les douves ?',choices:['Des fossés remplis d’eau autour du château','Des tours de garde','Des portes secrètes'],ans:0,evidenceParagraph:1,explanation:'« ...entouré de fossés remplis d’eau, les douves. »'},
    {id:'q4',type:'choice',competencies:['READ_INFERENCE'],difficulty:5,prompt:'Pourquoi relève-t-on le pont-levis en cas d’attaque ?',choices:['Pour que les ennemis ne puissent plus franchir les douves','Pour le réparer','Pour laisser passer les bateaux'],ans:0,evidenceParagraph:1,explanation:'Une fois relevé, il n’y a plus de passage au-dessus de l’eau.'},
    {id:'q5',type:'choice',competencies:['READ_EXPLICIT'],difficulty:4,prompt:'À quoi servent les meurtrières ?',choices:['À tirer des flèches','À faire entrer la lumière','À évacuer la fumée'],ans:0,evidenceParagraph:2,explanation:'« ...les meurtrières, servent à tirer des flèches. »'},
    {id:'q6',type:'evidence',competencies:['READ_JUSTIFY'],difficulty:4,prompt:'Clique sur le paragraphe qui parle du dernier refuge en cas d’attaque.',evidenceParagraph:3,explanation:'Le donjon est « le dernier refuge si l’ennemi entre dans le château ».'},
    {id:'q7',type:'choice',competencies:['READ_STRUCTURE'],difficulty:4,prompt:'Comment ce texte est-il organisé ?',choices:['De l’extérieur du château vers son centre','Du plus récent au plus ancien','Par ordre alphabétique'],ans:0,explanation:'Douves et pont-levis, puis remparts, puis donjon au centre : on entre peu à peu dans le château.'},
    {id:'q8',type:'choice',competencies:['READ_INFERENCE'],difficulty:5,prompt:'Pourquoi les paysans viennent-ils au château en cas de danger ?',choices:['Les remparts les protègent mieux que leurs maisons','Pour faire la fête','Pour vendre leurs récoltes'],ans:0,evidenceParagraph:4,explanation:'Leurs villages ne sont pas fortifiés : derrière les remparts, ils sont à l’abri.'}
   ]
  },

  fr_cm2_chat_botte_01:{
   id:'fr_cm2_chat_botte_01',level:'CM2',subject:'francais',type:'literary_text',documentType:'conte',
   title:'Le Maître chat ou le Chat botté',author:'Charles Perrault',work:'Histoires ou contes du temps passé (1697)',
   sourceType:'public_domain',sourceReference:'Adaptation libre et abrégée pour le CM2, d’après Charles Perrault (mort en 1703), dans le domaine public.',
   chapterLinks:['cm2-fr-litterature'],
   competencies:['READ_CHARACTER','READ_CAUSE_CONSEQUENCE','READ_INFERENCE','READ_EXPLICIT','READ_EMOTION_INTENTION','READ_JUSTIFY','READ_SEQUENCE','READ_AUTHOR_INTENT'],
   difficulty:4,estimatedReadingMinutes:3,audioMode:'audioAllowed',sessionSize:8,
   paragraphs:[
    'Un meunier mourut en laissant pour tout héritage son moulin, son âne et son chat. L’aîné eut le moulin, le deuxième l’âne, et le plus jeune n’eut que le chat. Il se désolait : « Que vais-je faire d’un chat ? »',
    'Mais le chat lui dit : « Ne vous inquiétez pas, mon maître. Donnez-moi seulement un sac et une paire de bottes, et vous verrez que vous n’êtes pas si mal partagé. »',
    'Avec son sac, le chat attrapa des lapins et des perdrix qu’il alla offrir au roi, de la part de « Monsieur le marquis de Carabas » : c’était le nom qu’il avait inventé pour son maître.',
    'Un jour, apprenant que le roi passerait au bord de la rivière avec sa fille, le chat dit à son maître d’aller s’y baigner. Quand le carrosse arriva, il cria : « Au secours ! Des voleurs ont pris les habits de Monsieur le marquis de Carabas ! » Le roi lui fit apporter de magnifiques vêtements.',
    'Le chat courut alors jusqu’au château d’un ogre très riche. Il le flatta et le mit au défi de se changer en souris. L’ogre, vexé, se transforma… et le chat le mangea aussitôt.',
    'Quand le roi arriva, le chat l’accueillit : « Bienvenue au château de Monsieur le marquis de Carabas ! » Émerveillé, le roi donna sa fille en mariage au fils du meunier.'
   ],
   glossary:[{word:'héritage',definition:'Ce qu’une personne laisse à sa famille après sa mort.'},{word:'perdrix',definition:'Oiseau sauvage que l’on chassait.'},{word:'marquis',definition:'Un titre de noblesse.'},{word:'carrosse',definition:'Une voiture luxueuse tirée par des chevaux.'},{word:'flatta',definition:'Fit des compliments exagérés pour plaire.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_EXPLICIT'],difficulty:3,prompt:'Qu’hérite le plus jeune fils ?',choices:['Le chat','Le moulin','L’âne'],ans:0,evidenceParagraph:0,explanation:'« ...le plus jeune n’eut que le chat. »'},
    {id:'q2',type:'choice',competencies:['READ_EMOTION_INTENTION'],difficulty:3,prompt:'Comment se sent le jeune homme au début ?',choices:['Désolé, découragé','Ravi','En colère contre le chat'],ans:0,evidenceParagraph:0,explanation:'« Il se désolait : « Que vais-je faire d’un chat ? » »'},
    {id:'q3',type:'choice',competencies:['READ_INFERENCE'],difficulty:5,prompt:'Pourquoi le chat offre-t-il du gibier au roi au nom du « marquis de Carabas » ?',choices:['Pour que le roi croie que son maître est un riche seigneur','Parce que le roi a faim','Pour se débarrasser du gibier'],ans:0,evidenceParagraph:2,explanation:'Il invente un titre de noblesse et fait des cadeaux : le roi se fait une haute idée de ce « marquis ».'},
    {id:'q4',type:'choice',competencies:['READ_CAUSE_CONSEQUENCE'],difficulty:4,prompt:'Pourquoi le chat crie-t-il que des voleurs ont pris les habits de son maître ?',choices:['Pour que le roi lui offre de beaux vêtements et le remarque','Parce que c’est vrai','Pour faire arrêter des voleurs'],ans:0,evidenceParagraph:3,explanation:'Résultat : « Le roi lui fit apporter de magnifiques vêtements. » Le fils du meunier ressemble enfin à un marquis.'},
    {id:'q5',type:'choice',competencies:['READ_CHARACTER','READ_INFERENCE'],difficulty:5,prompt:'Comment le chat réussit-il à vaincre l’ogre ?',choices:['Par la ruse : il le pousse à se changer en souris','Par la force, en le combattant','En appelant les soldats du roi'],ans:0,evidenceParagraph:4,explanation:'Il le flatte et le met au défi : l’ogre, vexé, se transforme en souris… une proie facile.'},
    {id:'q6',type:'evidence',competencies:['READ_JUSTIFY'],difficulty:4,prompt:'Clique sur le paragraphe où le chat explique ce dont il a besoin.',evidenceParagraph:1,explanation:'« Donnez-moi seulement un sac et une paire de bottes... »'},
    {id:'q7',type:'order',competencies:['READ_SEQUENCE'],difficulty:4,prompt:'Remets les ruses du chat dans l’ordre.',tokens:['Il offre du gibier au roi','Il invente le vol des habits','Il piège l’ogre','Il accueille le roi au château'],ans:'Il offre du gibier au roi Il invente le vol des habits Il piège l’ogre Il accueille le roi au château',explanation:'C’est l’ordre du conte.'},
    {id:'q8',type:'choice',competencies:['READ_AUTHOR_INTENT'],difficulty:6,prompt:'Quelle qualité ce conte met-il en avant ?',choices:['L’intelligence et l’habileté valent mieux qu’un riche héritage','Il faut toujours dire la vérité','Les ogres sont gentils'],ans:0,explanation:'Le plus pauvre des trois frères, grâce à l’adresse de son chat, finit par épouser la princesse.'}
   ]
  },

  // ===== Lot 7 (18/10/2026) : 2e support pour plusieurs chapitres du collège, rotation au primaire.
  // Textes originaux de Rimbaud (mort en 1891) et Verlaine ; adaptations libres de la mythologie
  // grecque (Plutarque, Ovide), du Roman de Renart, de Molière, Verne, Zola et Grimm (domaine public).

  fr_6e_minotaure_01:{
   id:'fr_6e_minotaure_01',level:'6e',subject:'francais',type:'literary_text',documentType:'récit mythologique',
   title:'Thésée et le Minotaure',author:null,work:'Mythologie grecque',
   sourceType:'public_domain',sourceReference:'Adaptation libre pour la 6e du mythe grec, notamment d’après Plutarque (Vie de Thésée), dans le domaine public.',
   chapterLinks:['fr6h'],
   competencies:['READ_CHARACTER','READ_PLACE','READ_CAUSE_CONSEQUENCE','READ_INFERENCE','READ_SEQUENCE','READ_JUSTIFY','READ_GENRE','READ_EMOTION_INTENTION'],
   difficulty:5,estimatedReadingMinutes:3,audioMode:'audioAllowed',sessionSize:8,
   paragraphs:[
    'En Crète régnait le roi Minos. Dans un immense labyrinthe construit par l’architecte Dédale, il gardait enfermé un monstre terrible : le Minotaure, mi-homme, mi-taureau.',
    'Vaincue par Minos, la ville d’Athènes devait lui envoyer régulièrement sept jeunes gens et sept jeunes filles, qui étaient livrés au Minotaure.',
    'Thésée, le fils du roi d’Athènes Égée, décida de partir avec eux pour tuer le monstre. Son père lui fit une promesse : « Si tu reviens vivant, remplace la voile noire de ton navire par une voile blanche. »',
    'En Crète, Ariane, la fille de Minos, tomba amoureuse de Thésée. Elle lui donna une pelote de fil : en le déroulant derrière lui, il pourrait retrouver la sortie du labyrinthe.',
    'Thésée s’enfonça dans les couloirs, affronta le Minotaure et le tua. Puis, en suivant le fil, il ressortit sain et sauf avec ses compagnons.',
    'Mais sur le chemin du retour, Thésée oublia de changer la voile. Du haut d’une falaise, Égée vit approcher le navire à la voile noire. Croyant son fils mort, il se jeta dans la mer, qui porte depuis son nom : la mer Égée.'
   ],
   glossary:[{word:'labyrinthe',definition:'Un ensemble de couloirs si compliqué qu’on s’y perd.'},{word:'pelote',definition:'Une boule de fil enroulé.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_CHARACTER'],difficulty:3,prompt:'Qu’est-ce que le Minotaure ?',choices:['Un monstre mi-homme, mi-taureau','Un roi de Crète','Un architecte'],ans:0,evidenceParagraph:0,explanation:'« ...le Minotaure, mi-homme, mi-taureau. »'},
    {id:'q2',type:'choice',competencies:['READ_PLACE'],difficulty:3,prompt:'Où le Minotaure est-il enfermé ?',choices:['Dans un labyrinthe, en Crète','Dans une prison d’Athènes','Au fond de la mer'],ans:0,evidenceParagraph:0,explanation:'« Dans un immense labyrinthe construit par l’architecte Dédale... »'},
    {id:'q3',type:'choice',competencies:['READ_EMOTION_INTENTION','READ_CHARACTER'],difficulty:4,prompt:'Que montre la décision de Thésée de partir avec les jeunes Athéniens ?',choices:['Son courage : il veut libérer sa ville','Son envie de voyager','Sa peur du Minotaure'],ans:0,evidenceParagraph:2,explanation:'Fils du roi, il pourrait rester à l’abri, mais il part « pour tuer le monstre ».'},
    {id:'q4',type:'choice',competencies:['READ_CAUSE_CONSEQUENCE'],difficulty:4,prompt:'À quoi sert le fil d’Ariane ?',choices:['À retrouver la sortie du labyrinthe','À attacher le Minotaure','À recoudre la voile'],ans:0,evidenceParagraph:3,explanation:'« ...en le déroulant derrière lui, il pourrait retrouver la sortie du labyrinthe. »'},
    {id:'q5',type:'choice',competencies:['READ_CAUSE_CONSEQUENCE','READ_INFERENCE'],difficulty:5,prompt:'Pourquoi Égée se jette-t-il dans la mer ?',choices:['La voile noire lui fait croire que son fils est mort','Il veut rejoindre Thésée à la nage','Il est poursuivi par Minos'],ans:0,evidenceParagraph:5,explanation:'Thésée a oublié de hisser la voile blanche promise : son père croit qu’il a été tué.'},
    {id:'q6',type:'evidence',competencies:['READ_JUSTIFY'],difficulty:4,prompt:'Clique sur le paragraphe qui explique la promesse de la voile.',evidenceParagraph:2,explanation:'« Si tu reviens vivant, remplace la voile noire [...] par une voile blanche. »'},
    {id:'q7',type:'choice',competencies:['READ_GENRE'],difficulty:5,prompt:'Que cherche aussi à expliquer la fin de ce mythe ?',choices:['L’origine du nom de la mer Égée','La fabrication des voiles','La naissance de la Crète'],ans:0,evidenceParagraph:5,explanation:'Comme beaucoup de mythes, il explique une origine : ici, le nom d’une mer.'},
    {id:'q8',type:'order',competencies:['READ_SEQUENCE'],difficulty:4,prompt:'Remets le mythe dans l’ordre.',tokens:['Thésée part pour la Crète','Ariane lui donne un fil','Thésée tue le Minotaure','Égée voit la voile noire'],ans:'Thésée part pour la Crète Ariane lui donne un fil Thésée tue le Minotaure Égée voit la voile noire',explanation:'C’est l’ordre du récit.'}
   ]
  },

  fr_6e_tour_du_monde_01:{
   id:'fr_6e_tour_du_monde_01',level:'6e',subject:'francais',type:'literary_text',documentType:'roman d’aventure (extrait adapté)',
   title:'Le pari de Phileas Fogg',author:'Jules Verne',work:'Le Tour du monde en quatre-vingts jours (1872)',
   sourceType:'public_domain',sourceReference:'Adaptation libre et abrégée pour la 6e, d’après Jules Verne (mort en 1905), dans le domaine public.',
   chapterLinks:['fr6g'],
   competencies:['READ_CHARACTER','READ_EXPLICIT','READ_PLACE','READ_TIME','READ_INFERENCE','READ_CAUSE_CONSEQUENCE','READ_JUSTIFY','READ_VOCAB_CONTEXT'],
   difficulty:5,estimatedReadingMinutes:3,audioMode:'audioAllowed',sessionSize:8,
   paragraphs:[
    'En 1872, à Londres, vivait un gentleman nommé Phileas Fogg. C’était un homme d’une précision extraordinaire : chaque jour, il faisait exactement les mêmes gestes, aux mêmes heures, à la seconde près.',
    'Un soir, au Reform Club, ses amis lisaient un journal qui affirmait qu’on pouvait désormais faire le tour du monde en quatre-vingts jours, grâce aux trains et aux bateaux à vapeur.',
    '« En théorie, peut-être, dit l’un d’eux. Mais en pratique, avec les retards et les tempêtes, c’est impossible ! » Fogg répondit calmement : « Je parie vingt mille livres que je le ferai. »',
    'Le pari fut accepté. Le soir même, Fogg partait avec son nouveau domestique, un Français nommé Passepartout, qui venait justement d’entrer à son service en espérant une vie tranquille.',
    'Il devait être de retour au Reform Club le samedi 21 décembre, à 8 heures 45 du soir. Sinon, il perdait tout.'
   ],
   glossary:[{word:'gentleman',definition:'Un homme distingué et bien élevé, en Angleterre.'},{word:'livres',definition:'Ici : la monnaie anglaise (livres sterling).'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_CHARACTER'],difficulty:4,prompt:'Quel est le trait de caractère principal de Phileas Fogg ?',choices:['Il est d’une précision extraordinaire','Il est très bavard','Il est toujours en retard'],ans:0,evidenceParagraph:0,explanation:'« ...chaque jour, il faisait exactement les mêmes gestes, aux mêmes heures, à la seconde près. »'},
    {id:'q2',type:'choice',competencies:['READ_PLACE','READ_TIME'],difficulty:3,prompt:'Où et quand commence l’histoire ?',choices:['À Londres, en 1872','À Paris, en 1900','À New York, aujourd’hui'],ans:0,evidenceParagraph:0,explanation:'« En 1872, à Londres... »'},
    {id:'q3',type:'choice',competencies:['READ_EXPLICIT'],difficulty:4,prompt:'Quel est l’objet du pari ?',choices:['Faire le tour du monde en quatre-vingts jours','Traverser la Manche à la nage','Construire un bateau à vapeur'],ans:0,evidenceParagraph:2,explanation:'Fogg parie qu’il fera ce tour du monde en quatre-vingts jours.'},
    {id:'q4',type:'choice',competencies:['READ_CAUSE_CONSEQUENCE'],difficulty:5,prompt:'Pourquoi le journal pense-t-il ce voyage possible ?',choices:['Grâce aux trains et aux bateaux à vapeur','Grâce aux avions','Grâce aux chevaux les plus rapides'],ans:0,evidenceParagraph:1,explanation:'« ...grâce aux trains et aux bateaux à vapeur. » En 1872, il n’y avait pas encore d’avions.'},
    {id:'q5',type:'choice',competencies:['READ_INFERENCE'],difficulty:6,prompt:'Pourquoi est-il amusant que Passepartout ait espéré « une vie tranquille » ?',choices:['Il se retrouve aussitôt embarqué dans un voyage plein d’aventures','Parce que Fogg est très calme','Parce qu’il aime les voyages'],ans:0,evidenceParagraph:3,explanation:'Le soir même de son arrivée, il part faire le tour du monde : c’est tout le contraire de ce qu’il espérait.'},
    {id:'q6',type:'evidence',competencies:['READ_JUSTIFY'],difficulty:5,prompt:'Clique sur le paragraphe qui précise ce qui arrivera si Fogg échoue.',evidenceParagraph:4,explanation:'« Sinon, il perdait tout. »'},
    {id:'q7',type:'choice',competencies:['READ_VOCAB_CONTEXT'],difficulty:5,prompt:'« En théorie, peut-être [...] mais en pratique, c’est impossible ». Que veut dire l’ami de Fogg ?',choices:['Sur le papier, c’est possible, mais dans la réalité, il y aura trop d’imprévus','C’est possible dans tous les cas','Il faut d’abord étudier la théorie'],ans:0,evidenceParagraph:2,explanation:'« ...avec les retards et les tempêtes » : la réalité est moins simple que le calcul.'},
    {id:'q8',type:'choice',competencies:['READ_INFERENCE','READ_CHARACTER'],difficulty:5,prompt:'Pourquoi le caractère de Fogg le rend-il capable de tenter ce pari ?',choices:['Il calcule tout avec exactitude et garde son calme','Il aime prendre des risques sans réfléchir','Il connaît déjà tous les pays'],ans:0,evidenceParagraph:2,explanation:'Il répond « calmement » : cet homme précis compte sur un horaire parfaitement organisé.'}
   ]
  },

  fr_6e_deucalion_01:{
   id:'fr_6e_deucalion_01',level:'6e',subject:'francais',type:'literary_text',documentType:'récit mythologique',
   title:'Deucalion et Pyrrha',author:'Ovide',work:'Les Métamorphoses, livre I',
   sourceType:'public_domain',sourceReference:'Adaptation libre pour la 6e, d’après Ovide (mort vers 17-18 apr. J.-C.), dans le domaine public — aucune traduction existante reprise. Ovide utilise les noms romains (Jupiter, Thémis) ; on a gardé ici le nom grec de Zeus.',
   chapterLinks:['fr6d'],
   competencies:['READ_CAUSE_CONSEQUENCE','READ_CHARACTER','READ_INFERENCE','READ_VOCAB_CONTEXT','READ_GENRE','READ_JUSTIFY','READ_SEQUENCE'],
   difficulty:6,estimatedReadingMinutes:3,audioMode:'audioAllowed',sessionSize:8,
   paragraphs:[
    'Autrefois, les hommes étaient devenus si cruels et si malhonnêtes que Zeus décida de les faire disparaître. Il fit tomber une pluie terrible, qui dura des jours et des nuits. Les eaux recouvrirent toute la Terre.',
    'Seuls survécurent Deucalion et sa femme Pyrrha, deux êtres justes et respectueux des dieux. Leur petite barque s’échoua au sommet du mont Parnasse.',
    'Quand les eaux se retirèrent, ils se retrouvèrent seuls dans un monde vide et silencieux. En larmes, ils allèrent demander conseil à la déesse Thémis.',
    'La déesse leur répondit : « Voilez-vous la tête et jetez derrière vous les os de votre grande mère. » Pyrrha fut horrifiée : jamais elle ne ferait une chose pareille !',
    'Deucalion réfléchit longuement, puis comprit : « Notre grande mère, c’est la Terre ; ses os, ce sont les pierres ! »',
    'Ils lancèrent des pierres derrière eux. Peu à peu, elles s’amollirent et prirent forme humaine : celles de Deucalion devinrent des hommes, celles de Pyrrha des femmes. Ainsi la Terre fut de nouveau peuplée.'
   ],
   glossary:[{word:'s’échoua',definition:'Se posa et resta bloquée (pour un bateau).'},{word:'Voilez-vous',definition:'Couvrez-vous d’un voile.'},{word:'s’amollirent',definition:'Devinrent molles.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_CAUSE_CONSEQUENCE'],difficulty:4,prompt:'Pourquoi Zeus provoque-t-il le déluge ?',choices:['Parce que les hommes sont devenus cruels et malhonnêtes','Parce que la Terre manque d’eau','Pour punir Deucalion'],ans:0,evidenceParagraph:0,explanation:'« ...les hommes étaient devenus si cruels et si malhonnêtes que Zeus décida de les faire disparaître. »'},
    {id:'q2',type:'choice',competencies:['READ_CHARACTER','READ_INFERENCE'],difficulty:5,prompt:'Pourquoi Deucalion et Pyrrha sont-ils épargnés ?',choices:['Ce sont des êtres justes et respectueux des dieux','Ils savent très bien nager','Ils se sont cachés dans une grotte'],ans:0,evidenceParagraph:1,explanation:'Contrairement aux autres hommes, ils sont « justes et respectueux des dieux ».'},
    {id:'q3',type:'choice',competencies:['READ_VOCAB_CONTEXT','READ_INFERENCE'],difficulty:6,prompt:'Pourquoi Pyrrha est-elle horrifiée par la réponse de la déesse ?',choices:['Elle comprend qu’il faudrait jeter les os de sa vraie mère','Elle a peur de l’eau','Elle ne veut pas se voiler'],ans:0,evidenceParagraph:3,explanation:'Elle prend les mots au sens propre : jeter les os d’une mère morte serait sacrilège.'},
    {id:'q4',type:'choice',competencies:['READ_VOCAB_CONTEXT'],difficulty:6,prompt:'Comment Deucalion comprend-il l’oracle ?',choices:['La « grande mère » est la Terre, et ses « os » sont les pierres','Il faut aller chercher leur grand-mère','Il faut construire une nouvelle barque'],ans:0,evidenceParagraph:4,explanation:'Il comprend le sens figuré de la phrase : c’est une énigme.'},
    {id:'q5',type:'evidence',competencies:['READ_JUSTIFY'],difficulty:5,prompt:'Clique sur le paragraphe où les pierres se transforment.',evidenceParagraph:5,explanation:'« ...elles s’amollirent et prirent forme humaine. »'},
    {id:'q6',type:'choice',competencies:['READ_GENRE'],difficulty:5,prompt:'Ce mythe raconte...',choices:['Comment l’humanité aurait été recréée après un déluge','La construction d’un temple','La vie quotidienne en Grèce'],ans:0,explanation:'C’est un récit des origines : il explique d’où viendraient les hommes après la destruction du monde.'},
    {id:'q7',type:'order',competencies:['READ_SEQUENCE'],difficulty:4,prompt:'Remets le mythe dans l’ordre.',tokens:['Le déluge recouvre la Terre','La barque s’échoue sur le Parnasse','Thémis donne sa réponse','Les pierres deviennent des humains'],ans:'Le déluge recouvre la Terre La barque s’échoue sur le Parnasse Thémis donne sa réponse Les pierres deviennent des humains',explanation:'C’est l’ordre du récit.'},
    {id:'q8',type:'choice',competencies:['READ_INFERENCE'],difficulty:6,prompt:'Pourquoi peut-on dire que ce récit fait partie des « Métamorphoses » ?',choices:['Des pierres se transforment en êtres humains','Les personnages voyagent beaucoup','Il y a beaucoup de dialogues'],ans:0,evidenceParagraph:5,explanation:'Une métamorphose est une transformation : ici, des pierres deviennent des hommes et des femmes.'}
   ]
  },

  fr_6e_medecin_malgre_lui_01:{
   id:'fr_6e_medecin_malgre_lui_01',level:'6e',subject:'francais',type:'literary_text',documentType:'comédie (extrait adapté)',
   title:'Le Médecin malgré lui',author:'Molière',work:'Le Médecin malgré lui (1666)',
   sourceType:'public_domain',sourceReference:'Adaptation libre et abrégée pour la 6e de l’acte I (scènes 4 et 5), d’après Molière (mort en 1673), dans le domaine public.',
   chapterLinks:['fr6f'],
   competencies:['READ_CHARACTER','READ_CAUSE_CONSEQUENCE','READ_INFERENCE','READ_EMOTION_INTENTION','READ_GENRE','READ_JUSTIFY','READ_EXPLICIT'],
   difficulty:5,estimatedReadingMinutes:3,audioMode:'audioAllowed',sessionSize:8,
   paragraphs:[
    '(Martine vient d’être battue par son mari, Sganarelle, un bûcheron. Elle cherche à se venger. Arrivent Valère et Lucas, deux serviteurs.)',
    'VALÈRE. — Notre maître a une fille qui a perdu la parole. Nous cherchons un médecin assez habile pour la guérir.',
    'MARTINE, à part. — Voici l’occasion de me venger ! (Haut.) Messieurs, vous avez de la chance : il y a ici un homme merveilleux, qui guérit tous les malades. Mais il a une étrange folie.',
    'LUCAS. — Laquelle ?',
    'MARTINE. — Il cache son talent. Il ne veut jamais avouer qu’il est médecin… sauf si on lui donne des coups de bâton. Vous le trouverez là-bas, en train de couper du bois.',
    '(Valère et Lucas vont trouver Sganarelle.) VALÈRE. — Monsieur, n’êtes-vous pas médecin ? — SGANARELLE. — Moi ? Je suis fagotier ! (Ils prennent des bâtons et le frappent.)',
    'SGANARELLE. — Aïe ! Aïe ! Arrêtez ! Je suis médecin, je suis tout ce que vous voudrez !'
   ],
   glossary:[{word:'habile',definition:'Adroit, compétent.'},{word:'fagotier',definition:'Celui qui fait des fagots, des paquets de petit bois.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_EMOTION_INTENTION','READ_CAUSE_CONSEQUENCE'],difficulty:4,prompt:'Pourquoi Martine veut-elle se venger de Sganarelle ?',choices:['Il vient de la battre','Il a perdu son argent','Il refuse de travailler'],ans:0,evidenceParagraph:0,explanation:'La didascalie l’indique : « Martine vient d’être battue par son mari. »'},
    {id:'q2',type:'choice',competencies:['READ_EXPLICIT'],difficulty:3,prompt:'Que cherchent Valère et Lucas ?',choices:['Un médecin pour la fille de leur maître','Un bûcheron','Un voleur'],ans:0,evidenceParagraph:1,explanation:'« Nous cherchons un médecin assez habile pour la guérir. »'},
    {id:'q3',type:'choice',competencies:['READ_GENRE'],difficulty:5,prompt:'Que signifie l’indication « à part » avant la réplique de Martine ?',choices:['Elle parle pour elle-même : les autres personnages ne l’entendent pas, seul le public l’entend','Elle sort de scène','Elle crie très fort'],ans:0,evidenceParagraph:2,explanation:'Un aparté met le public dans la confidence : nous savons que c’est une vengeance.'},
    {id:'q4',type:'choice',competencies:['READ_INFERENCE'],difficulty:5,prompt:'Pourquoi Martine invente-t-elle que Sganarelle n’avoue qu’après des coups de bâton ?',choices:['Pour qu’il soit battu à son tour : c’est sa vengeance','Parce que c’est vrai','Pour protéger son mari'],ans:0,evidenceParagraph:4,explanation:'Battu par son mari, elle le fait battre par d’autres : la ruse retourne la situation.'},
    {id:'q5',type:'evidence',competencies:['READ_JUSTIFY'],difficulty:4,prompt:'Clique sur le paragraphe où Martine décide de profiter de la situation.',evidenceParagraph:2,explanation:'« Voici l’occasion de me venger ! »'},
    {id:'q6',type:'choice',competencies:['READ_CHARACTER','READ_INFERENCE'],difficulty:5,prompt:'Pourquoi Sganarelle finit-il par dire « Je suis médecin » ?',choices:['Pour que les coups s’arrêtent','Parce qu’il a fait des études de médecine','Parce qu’il veut aider la jeune fille'],ans:0,evidenceParagraph:6,explanation:'« Arrêtez ! Je suis médecin, je suis tout ce que vous voudrez ! » : il dirait n’importe quoi pour ne plus être battu.'},
    {id:'q7',type:'choice',competencies:['READ_GENRE'],difficulty:5,prompt:'Pourquoi le titre est-il « Le Médecin malgré lui » ?',choices:['Sganarelle devient médecin sans l’avoir voulu','Le médecin ne veut pas soigner','Le médecin est malade'],ans:0,explanation:'On l’oblige, à coups de bâton, à se dire médecin : il l’est « malgré lui ».'},
    {id:'q8',type:'choice',competencies:['READ_GENRE'],difficulty:4,prompt:'Les coups de bâton font partie d’un type de comique. Lequel ?',choices:['Le comique de gestes','Le comique de répétition','Le comique de caractère'],ans:0,evidenceParagraph:5,explanation:'Les coups, les chutes, les grimaces : c’est le comique de gestes, très présent chez Molière.'}
   ]
  },

  fr_5e_renart_anguilles_01:{
   id:'fr_5e_renart_anguilles_01',level:'5e',subject:'francais',type:'literary_text',documentType:'récit médiéval (adaptation)',
   title:'Renart et les anguilles',author:null,work:'Le Roman de Renart (XIIe-XIIIe siècles)',
   sourceType:'public_domain',sourceReference:'Adaptation libre en français moderne pour la 5e, d’après Le Roman de Renart (textes anonymes du Moyen Âge), dans le domaine public.',
   chapterLinks:['fr5g'],
   competencies:['READ_CHARACTER','READ_TIME','READ_CAUSE_CONSEQUENCE','READ_INFERENCE','READ_EMOTION_INTENTION','READ_JUSTIFY','READ_GENRE','READ_SEQUENCE'],
   difficulty:5,estimatedReadingMinutes:3,audioMode:'audioAllowed',sessionSize:8,
   paragraphs:[
    'C’était l’hiver. Les provisions de Renart le goupil étaient épuisées, et sa famille mourait de faim. Il partit chercher à manger.',
    'Au bord d’un chemin, il aperçut une charrette de marchands chargée de poissons : des harengs et des anguilles. Il eut aussitôt une idée.',
    'Il se coucha au milieu du chemin, les yeux fermés, la langue pendante, et fit le mort. Les marchands arrivèrent : « Un renard ! Sa fourrure nous rapportera de l’argent ! » Ils le jetèrent sur leur charrette.',
    'Pendant que les marchands avançaient sans se méfier, Renart dévora les harengs. Puis il passa autour de son cou plusieurs colliers d’anguilles et sauta de la charrette.',
    '« Merci pour les anguilles, mes amis ! leur cria-t-il en s’enfuyant. Gardez le reste ! » Les marchands, furieux, ne purent le rattraper. Renart rentra chez lui, où l’on fit un grand festin.'
   ],
   glossary:[{word:'goupil',definition:'Ancien nom du renard. Le nom propre « Renart » est devenu le nom commun « renard ».'},{word:'anguilles',definition:'Poissons très longs, en forme de serpent.'},{word:'épuisées',definition:'Ici : complètement finies.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_TIME','READ_CAUSE_CONSEQUENCE'],difficulty:4,prompt:'Pourquoi Renart part-il chercher à manger ?',choices:['C’est l’hiver et sa famille meurt de faim','Il veut faire une farce aux marchands','Il s’ennuie'],ans:0,evidenceParagraph:0,explanation:'« C’était l’hiver. Les provisions [...] étaient épuisées, et sa famille mourait de faim. »'},
    {id:'q2',type:'choice',competencies:['READ_CHARACTER'],difficulty:4,prompt:'Quelle ruse Renart utilise-t-il ?',choices:['Il fait le mort au milieu du chemin','Il se déguise en marchand','Il creuse un piège'],ans:0,evidenceParagraph:2,explanation:'« Il se coucha au milieu du chemin, les yeux fermés, la langue pendante, et fit le mort. »'},
    {id:'q3',type:'choice',competencies:['READ_INFERENCE'],difficulty:5,prompt:'Pourquoi les marchands mettent-ils Renart sur leur charrette ?',choices:['Ils veulent vendre sa fourrure','Ils veulent le soigner','Ils veulent l’enterrer'],ans:0,evidenceParagraph:2,explanation:'« Sa fourrure nous rapportera de l’argent ! » : leur avidité les rend imprudents.'},
    {id:'q4',type:'choice',competencies:['READ_EMOTION_INTENTION'],difficulty:5,prompt:'Quel ton Renart prend-il en criant « Merci pour les anguilles » ?',choices:['Moqueur','Désolé','Effrayé'],ans:0,evidenceParagraph:4,explanation:'Il remercie ceux qu’il vient de voler : il se moque d’eux.'},
    {id:'q5',type:'evidence',competencies:['READ_JUSTIFY'],difficulty:5,prompt:'Clique sur le paragraphe où Renart profite de l’inattention des marchands.',evidenceParagraph:3,explanation:'« Pendant que les marchands avançaient sans se méfier, Renart dévora les harengs. »'},
    {id:'q6',type:'choice',competencies:['READ_GENRE'],difficulty:5,prompt:'Pourquoi peut-on rapprocher ce récit d’une fable ?',choices:['Un animal rusé, qui ressemble à un homme, trompe des naïfs','Il est écrit en vers avec une morale finale','Il raconte des faits historiques'],ans:0,explanation:'Comme dans les fables, l’animal a des comportements humains et le plus malin l’emporte.'},
    {id:'q7',type:'choice',competencies:['READ_INFERENCE','READ_CHARACTER'],difficulty:6,prompt:'Que reproche implicitement le récit aux marchands ?',choices:['Leur avidité les a rendus imprudents','Leur méchanceté envers les animaux','Leur paresse'],ans:0,evidenceParagraph:2,explanation:'Ils ne pensent qu’à l’argent de la fourrure et ne surveillent pas leur « marchandise » : ils sont punis par où ils ont péché.'},
    {id:'q8',type:'order',competencies:['READ_SEQUENCE'],difficulty:4,prompt:'Remets l’histoire dans l’ordre.',tokens:['Renart voit la charrette','Il fait le mort','Il mange les harengs','Il s’enfuit avec les anguilles'],ans:'Renart voit la charrette Il fait le mort Il mange les harengs Il s’enfuit avec les anguilles',explanation:'C’est l’ordre du récit.'}
   ]
  },

  fr_5e_sensation_01:{
   id:'fr_5e_sensation_01',level:'5e',subject:'francais',type:'literary_text',documentType:'poème',
   title:'Sensation',author:'Arthur Rimbaud',work:'Poésies (1870)',
   sourceType:'public_domain',sourceReference:'Texte original d’Arthur Rimbaud (mort en 1891), dans le domaine public.',
   chapterLinks:['fr5e'],verse:true,stanzas:[4],
   competencies:['READ_TIME','READ_EMOTION_INTENTION','READ_VOCAB_CONTEXT','READ_GENRE','READ_INFERENCE','READ_JUSTIFY','READ_NARRATOR_POV'],
   difficulty:6,estimatedReadingMinutes:2,audioMode:'audioRecommended',sessionSize:7,
   paragraphs:[
    'Par les soirs bleus d’été, j’irai dans les sentiers,',
    'Picoté par les blés, fouler l’herbe menue :',
    'Rêveur, j’en sentirai la fraîcheur à mes pieds.',
    'Je laisserai le vent baigner ma tête nue.',
    'Je ne parlerai pas, je ne penserai rien :',
    'Mais l’amour infini me montera dans l’âme,',
    'Et j’irai loin, bien loin, comme un bohémien,',
    'Par la Nature, — heureux comme avec une femme.'
   ],
   glossary:[{word:'fouler',definition:'Marcher sur.'},{word:'menue',definition:'Fine, délicate.'},{word:'bohémien',definition:'Ici : un voyageur sans attaches, qui va librement de lieu en lieu.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_TIME'],difficulty:4,prompt:'À quel moment le poète imagine-t-il sa promenade ?',choices:['Les soirs d’été','Les matins d’hiver','Une nuit d’orage'],ans:0,evidenceParagraph:0,explanation:'« Par les soirs bleus d’été... »'},
    {id:'q2',type:'choice',competencies:['READ_GENRE'],difficulty:5,prompt:'À quel temps sont la plupart des verbes (« j’irai », « je sentirai ») ?',choices:['Au futur : le poète imagine un voyage à venir','Au passé simple : il raconte un souvenir','Au présent : il décrit ce qu’il fait'],ans:0,evidenceParagraph:2,explanation:'Le futur montre un projet, un rêve de voyage.'},
    {id:'q3',type:'choice',competencies:['READ_VOCAB_CONTEXT','READ_GENRE'],difficulty:6,prompt:'Quels sens sont surtout sollicités dans le premier quatrain ?',choices:['Le toucher et la vue','L’ouïe et le goût','Aucun sens'],ans:0,evidenceParagraph:1,explanation:'« Picoté par les blés », « la fraîcheur à mes pieds », « le vent baigner ma tête », « soirs bleus » : le poème s’appelle d’ailleurs « Sensation ».'},
    {id:'q4',type:'choice',competencies:['READ_EMOTION_INTENTION'],difficulty:5,prompt:'Quel sentiment domine le poème ?',choices:['Le bonheur et la liberté','La peur de se perdre','La tristesse de partir'],ans:0,evidenceParagraph:7,explanation:'« ...heureux comme avec une femme » ; « j’irai loin, bien loin » : liberté et bonheur.'},
    {id:'q5',type:'evidence',competencies:['READ_JUSTIFY'],difficulty:5,prompt:'Clique sur le vers où le poète dit qu’il ne veut ni parler ni réfléchir.',evidenceParagraph:4,explanation:'« Je ne parlerai pas, je ne penserai rien » : il veut seulement ressentir.'},
    {id:'q6',type:'choice',competencies:['READ_INFERENCE'],difficulty:6,prompt:'Que signifie « comme un bohémien » ?',choices:['Le poète veut voyager librement, sans but précis','Il veut devenir musicien','Il veut rester chez lui'],ans:0,evidenceParagraph:6,explanation:'Le bohémien va de lieu en lieu, librement : c’est l’image du voyage sans contrainte.'},
    {id:'q7',type:'choice',competencies:['READ_NARRATOR_POV'],difficulty:4,prompt:'Qui s’exprime dans le poème ?',choices:['Le poète lui-même, avec « je »','Un narrateur qui raconte la vie d’un autre','La Nature'],ans:0,evidenceParagraph:0,explanation:'« j’irai », « je laisserai » : le poète exprime ses propres sensations. Rimbaud avait quinze ans quand il l’a écrit.'}
   ]
  },

  fr_4e_il_pleure_01:{
   id:'fr_4e_il_pleure_01',level:'4e',subject:'francais',type:'literary_text',documentType:'poème',
   title:'Il pleure dans mon cœur…',author:'Paul Verlaine',work:'Romances sans paroles (1874)',
   sourceType:'public_domain',sourceReference:'Texte original de Paul Verlaine (mort en 1896), dans le domaine public.',
   chapterLinks:['fr4w'],verse:true,stanzas:[4,8,12],
   competencies:['READ_GENRE','READ_STRUCTURE','READ_EMOTION_INTENTION','READ_VOCAB_CONTEXT','READ_INFERENCE','READ_JUSTIFY'],
   difficulty:6,estimatedReadingMinutes:2,audioMode:'audioRecommended',sessionSize:7,
   paragraphs:[
    'Il pleure dans mon cœur',
    'Comme il pleut sur la ville ;',
    'Quelle est cette langueur',
    'Qui pénètre mon cœur ?',
    'Ô bruit doux de la pluie',
    'Par terre et sur les toits !',
    'Pour un cœur qui s’ennuie,',
    'Ô le chant de la pluie !',
    'Il pleure sans raison',
    'Dans ce cœur qui s’écœure.',
    'Quoi ! nulle trahison ?…',
    'Ce deuil est sans raison.',
    'C’est bien la pire peine',
    'De ne savoir pourquoi',
    'Sans amour et sans haine',
    'Mon cœur a tant de peine !'
   ],
   glossary:[{word:'langueur',definition:'Une tristesse fatiguée, sans force.'},{word:'s’écœure',definition:'Se dégoûte, se décourage.'},{word:'deuil',definition:'Ici : une grande tristesse.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_VOCAB_CONTEXT','READ_INFERENCE'],difficulty:6,prompt:'« Il pleure dans mon cœur / Comme il pleut sur la ville » : que fait le poète ?',choices:['Il compare sa tristesse à la pluie','Il raconte qu’il est sorti sous la pluie','Il explique d’où vient la pluie'],ans:0,evidenceParagraph:1,explanation:'Grâce à « comme », la tristesse intérieure est comparée à la pluie qui tombe sur la ville.'},
    {id:'q2',type:'choice',competencies:['READ_GENRE','READ_STRUCTURE'],difficulty:6,prompt:'Combien de syllabes compte chaque vers ?',choices:['Six','Huit','Douze'],ans:0,explanation:'« Il/ pleu/re/ dans/ mon/ cœur » : 6 syllabes (le e de « pleure » se prononce devant une consonne). Ce sont des hexasyllabes, des vers courts et musicaux.'},
    {id:'q3',type:'choice',competencies:['READ_STRUCTURE'],difficulty:6,prompt:'Quel mot revient le plus souvent dans le poème ?',choices:['« cœur »','« ville »','« toits »'],ans:0,evidenceParagraph:0,explanation:'« cœur » revient dans chaque strophe : le poème parle d’un état intérieur.'},
    {id:'q4',type:'choice',competencies:['READ_EMOTION_INTENTION'],difficulty:6,prompt:'Qu’est-ce qui rend la peine du poète si difficile à supporter ?',choices:['Il ne sait pas pourquoi il est triste','Il a été trahi','Il a perdu quelqu’un'],ans:0,evidenceParagraph:13,explanation:'« C’est bien la pire peine / De ne savoir pourquoi » ; il précise : « nulle trahison ».'},
    {id:'q5',type:'evidence',competencies:['READ_JUSTIFY'],difficulty:6,prompt:'Clique sur le vers où le poète affirme que sa tristesse n’a pas de cause.',evidenceParagraph:11,explanation:'« Ce deuil est sans raison. »'},
    {id:'q6',type:'choice',competencies:['READ_GENRE'],difficulty:7,prompt:'Dans la 1re strophe, les vers 1, 3 et 4 riment (cœur, langueur, cœur). Quel effet crée ce retour du même son ?',choices:['Une musique insistante, comme le bruit régulier de la pluie','Un effet comique','Aucun effet'],ans:0,evidenceParagraph:3,explanation:'Les sons qui reviennent imitent la pluie monotone et la tristesse qui s’installe.'},
    {id:'q7',type:'choice',competencies:['READ_INFERENCE'],difficulty:6,prompt:'Dans la 2e strophe, comment le poète perçoit-il le bruit de la pluie ?',choices:['Comme un chant doux qui accompagne son ennui','Comme un bruit insupportable','Il ne l’entend pas'],ans:0,evidenceParagraph:4,explanation:'« Ô bruit doux de la pluie », « Ô le chant de la pluie ! » : la pluie berce sa mélancolie.'}
   ]
  },

  fr_4e_bonheur_dames_01:{
   id:'fr_4e_bonheur_dames_01',level:'4e',subject:'francais',type:'literary_text',documentType:'roman réaliste (extrait adapté)',
   title:'Denise arrive à Paris',author:'Émile Zola',work:'Au Bonheur des Dames (1883)',
   sourceType:'public_domain',sourceReference:'Adaptation libre et abrégée pour la 4e du chapitre 1, d’après Émile Zola (mort en 1902), dans le domaine public.',
   chapterLinks:['fr4e'],
   competencies:['READ_CHARACTER','READ_PLACE','READ_EMOTION_INTENTION','READ_INFERENCE','READ_VOCAB_CONTEXT','READ_JUSTIFY','READ_GENRE','READ_AUTHOR_INTENT'],
   difficulty:6,estimatedReadingMinutes:3,audioMode:'audioAllowed',sessionSize:8,
   paragraphs:[
    'Denise était venue à pied de la gare Saint-Lazare, avec ses deux frères, Jean et le petit Pépé. Arrivés de Valognes, en Normandie, après une nuit de train, ils cherchaient la boutique de leur oncle Baudu.',
    'Au coin d’une rue, elle s’arrêta net. En face d’elle se dressait un immense magasin de nouveautés : « Au Bonheur des Dames ». Jamais elle n’avait vu un bâtiment pareil.',
    'Derrière les grandes vitrines, les étoffes ruisselaient en cascades : soies, velours, dentelles, aux couleurs éclatantes. Des mannequins portaient des manteaux luxueux. Une foule de clientes entrait et sortait sans cesse.',
    '« Oh ! Jean, regarde ! » murmura Denise, éblouie. Les trois enfants restaient là, serrés les uns contre les autres, perdus dans le bruit de la grande ville.',
    'En face, la petite boutique de l’oncle, « Le Vieil Elbeuf », paraissait sombre et triste, comme écrasée par son puissant voisin.'
   ],
   glossary:[{word:'magasin de nouveautés',definition:'Au XIXe siècle, un grand magasin qui vend des tissus et des vêtements à la mode.'},{word:'étoffes',definition:'Des tissus.'},{word:'éblouie',definition:'Émerveillée, comme aveuglée par trop de beauté.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_CHARACTER','READ_PLACE'],difficulty:4,prompt:'D’où viennent Denise et ses frères ?',choices:['De Valognes, en Normandie','De Paris','De Marseille'],ans:0,evidenceParagraph:0,explanation:'« Arrivés de Valognes, en Normandie... »'},
    {id:'q2',type:'choice',competencies:['READ_EMOTION_INTENTION'],difficulty:4,prompt:'Que ressent Denise devant le grand magasin ?',choices:['De l’éblouissement','De l’ennui','De la colère'],ans:0,evidenceParagraph:3,explanation:'« ...murmura Denise, éblouie. »'},
    {id:'q3',type:'choice',competencies:['READ_VOCAB_CONTEXT'],difficulty:6,prompt:'« Les étoffes ruisselaient en cascades » : quelle image le romancier utilise-t-il ?',choices:['Les tissus sont comparés à de l’eau qui coule en abondance','Il pleut sur la vitrine','Les tissus sont mouillés'],ans:0,evidenceParagraph:2,explanation:'Le vocabulaire de l’eau (ruisseler, cascades) donne une impression d’abondance et de mouvement.'},
    {id:'q4',type:'choice',competencies:['READ_INFERENCE'],difficulty:6,prompt:'Que suggère la phrase « Les trois enfants restaient là, serrés les uns contre les autres » ?',choices:['Ils se sentent petits et un peu perdus dans la grande ville','Ils ont froid','Ils se disputent'],ans:0,evidenceParagraph:3,explanation:'Ils sont « perdus dans le bruit de la grande ville » : ils se serrent pour se rassurer.'},
    {id:'q5',type:'evidence',competencies:['READ_JUSTIFY'],difficulty:6,prompt:'Clique sur le paragraphe qui oppose la boutique de l’oncle au grand magasin.',evidenceParagraph:4,explanation:'« ...paraissait sombre et triste, comme écrasée par son puissant voisin. »'},
    {id:'q6',type:'choice',competencies:['READ_INFERENCE','READ_AUTHOR_INTENT'],difficulty:7,prompt:'Que laisse prévoir l’image de la petite boutique « écrasée » par le grand magasin ?',choices:['Les petits commerces vont souffrir de la concurrence des grands magasins','La boutique va s’agrandir','L’oncle va acheter le grand magasin'],ans:0,evidenceParagraph:4,explanation:'Le roman raconte en effet comment les grands magasins ruinent peu à peu les petites boutiques du quartier.'},
    {id:'q7',type:'choice',competencies:['READ_GENRE'],difficulty:6,prompt:'Pourquoi ce roman est-il dit « réaliste » ?',choices:['Il décrit avec précision la société et les lieux d’une époque réelle','Il contient de la magie','Il se passe dans le futur'],ans:0,explanation:'Zola s’est longuement documenté sur les vrais grands magasins de Paris pour écrire ce roman.'},
    {id:'q8',type:'choice',competencies:['READ_PLACE'],difficulty:4,prompt:'Comment s’appelle la boutique de l’oncle ?',choices:['Le Vieil Elbeuf','Au Bonheur des Dames','La Gare Saint-Lazare'],ans:0,evidenceParagraph:4,explanation:'« ...la petite boutique de l’oncle, « Le Vieil Elbeuf »... »'}
   ]
  },

  fr_3e_dormeur_val_01:{
   id:'fr_3e_dormeur_val_01',level:'3e',subject:'francais',type:'literary_text',documentType:'poème (sonnet)',
   title:'Le Dormeur du val',author:'Arthur Rimbaud',work:'Poésies (1870)',
   sourceType:'public_domain',sourceReference:'Texte original d’Arthur Rimbaud (mort en 1891), dans le domaine public.',
   chapterLinks:['fr3c','fr3w'],verse:true,stanzas:[4,8,11],
   competencies:['READ_PLACE','READ_CHARACTER','READ_INFERENCE','READ_STRUCTURE','READ_GENRE','READ_JUSTIFY','READ_AUTHOR_INTENT','READ_VOCAB_CONTEXT'],
   difficulty:8,estimatedReadingMinutes:3,audioMode:'audioRecommended',sessionSize:8,
   paragraphs:[
    'C’est un trou de verdure où chante une rivière,',
    'Accrochant follement aux herbes des haillons',
    'D’argent ; où le soleil, de la montagne fière,',
    'Luit : c’est un petit val qui mousse de rayons.',
    'Un soldat jeune, bouche ouverte, tête nue,',
    'Et la nuque baignant dans le frais cresson bleu,',
    'Dort ; il est étendu dans l’herbe, sous la nue,',
    'Pâle dans son lit vert où la lumière pleut.',
    'Les pieds dans les glaïeuls, il dort. Souriant comme',
    'Sourirait un enfant malade, il fait un somme :',
    'Nature, berce-le chaudement : il a froid.',
    'Les parfums ne font pas frissonner sa narine ;',
    'Il dort dans le soleil, la main sur sa poitrine,',
    'Tranquille. Il a deux trous rouges au côté droit.'
   ],
   glossary:[{word:'val',definition:'Une petite vallée.'},{word:'haillons',definition:'Des vêtements en lambeaux ; ici, les reflets de l’eau accrochés aux herbes.'},{word:'nue',definition:'Ici : les nuages, le ciel.'},{word:'glaïeuls',definition:'Des fleurs à longues tiges.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_PLACE'],difficulty:5,prompt:'Comment le paysage est-il présenté dans le premier quatrain ?',choices:['Lumineux, vivant et paisible','Sombre et menaçant','Glacé et désert'],ans:0,evidenceParagraph:3,explanation:'Une rivière qui « chante », le soleil qui « luit », un val qui « mousse de rayons ».'},
    {id:'q2',type:'choice',competencies:['READ_CHARACTER'],difficulty:5,prompt:'Qui se trouve dans ce val ?',choices:['Un jeune soldat étendu dans l’herbe','Un enfant qui joue','Un paysan au travail'],ans:0,evidenceParagraph:4,explanation:'« Un soldat jeune, bouche ouverte, tête nue... »'},
    {id:'q3',type:'choice',competencies:['READ_STRUCTURE'],difficulty:7,prompt:'Quel verbe est répété pour décrire le soldat ?',choices:['« dort »','« chante »','« pleut »'],ans:0,evidenceParagraph:8,explanation:'« Dort », « il dort », « Il dort dans le soleil » : l’insistance finit par paraître étrange.'},
    {id:'q4',type:'choice',competencies:['READ_INFERENCE'],difficulty:7,prompt:'Quels indices, avant le dernier vers, peuvent faire douter que le soldat dorme vraiment ?',choices:['Il est « pâle », sourit « comme un enfant malade », « il a froid » et ne sent pas les parfums','Il ronfle bruyamment','Il parle en dormant'],ans:0,evidenceParagraph:11,explanation:'Ces détails sont inquiétants : un dormeur au soleil n’a pas froid et sentirait les parfums.'},
    {id:'q5',type:'evidence',competencies:['READ_JUSTIFY'],difficulty:7,prompt:'Clique sur le vers qui révèle la vérité.',evidenceParagraph:13,explanation:'« Il a deux trous rouges au côté droit » : deux blessures par balle. Le soldat est mort.'},
    {id:'q6',type:'choice',competencies:['READ_STRUCTURE','READ_GENRE'],difficulty:8,prompt:'Quel est l’effet de la révélation placée à la toute fin du sonnet ?',choices:['Une chute brutale qui bouleverse le lecteur','Une fin joyeuse','Une transition vers un autre poème'],ans:0,evidenceParagraph:13,explanation:'Après toute cette douceur, la mort apparaît d’un coup : le choc rend la dénonciation plus forte.'},
    {id:'q7',type:'choice',competencies:['READ_AUTHOR_INTENT'],difficulty:8,prompt:'Que dénonce Rimbaud dans ce poème écrit en 1870 ?',choices:['L’absurdité de la guerre, qui tue des jeunes gens au milieu d’une nature pleine de vie','La pollution des rivières','La paresse des soldats'],ans:0,explanation:'Écrit pendant la guerre franco-prussienne, le poème oppose la vie de la nature à la mort d’un jeune soldat.'},
    {id:'q8',type:'choice',competencies:['READ_VOCAB_CONTEXT','READ_GENRE'],difficulty:7,prompt:'« Nature, berce-le chaudement » : quelle figure de style est employée ?',choices:['Une personnification : le poète s’adresse à la Nature comme à une mère','Une comparaison avec « comme »','Une énumération'],ans:0,evidenceParagraph:10,explanation:'La Nature est traitée comme une personne qui pourrait bercer un enfant.'}
   ]
  },

  fr_cp_lettre_mamie_01:{
   id:'fr_cp_lettre_mamie_01',level:'CP',subject:'francais',type:'literary_text',documentType:'récit',
   title:'Une lettre pour Mamie',author:null,work:null,sourceType:'original_mathquest',
   chapterLinks:['cp-fr-comprendre'],
   competencies:['READ_EXPLICIT','READ_CHARACTER','READ_INFERENCE','READ_SEQUENCE'],
   difficulty:1,estimatedReadingMinutes:1,audioMode:'audioRecommended',sessionSize:5,
   paragraphs:[
    'Nina écrit une lettre à Mamie.',
    'Elle dessine un soleil et une fleur.',
    'Papa met la lettre dans une enveloppe.',
    'Nina la poste.',
    'Trois jours plus tard, Mamie téléphone : « Merci pour ta jolie lettre ! »'
   ],
   glossary:[{word:'enveloppe',definition:'Une pochette en papier dans laquelle on met une lettre.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_CHARACTER'],difficulty:1,prompt:'À qui Nina écrit-elle ?',choices:['À Mamie','À son papa','À la maîtresse'],ans:0,evidenceParagraph:0,explanation:'« Nina écrit une lettre à Mamie. »'},
    {id:'q2',type:'choice',competencies:['READ_EXPLICIT'],difficulty:1,prompt:'Que dessine Nina ?',choices:['Un soleil et une fleur','Une maison','Un chat'],ans:0,evidenceParagraph:1,explanation:'« Elle dessine un soleil et une fleur. »'},
    {id:'q3',type:'choice',competencies:['READ_EXPLICIT'],difficulty:2,prompt:'Où Papa met-il la lettre ?',choices:['Dans une enveloppe','Dans un sac','Sur la table'],ans:0,evidenceParagraph:2,explanation:'« Papa met la lettre dans une enveloppe. »'},
    {id:'q4',type:'choice',competencies:['READ_INFERENCE'],difficulty:2,prompt:'Pourquoi Mamie téléphone-t-elle ?',choices:['Elle a reçu la lettre et dit merci','Elle est malade','Elle a perdu ses clés'],ans:0,evidenceParagraph:4,explanation:'« Merci pour ta jolie lettre ! » : la lettre est bien arrivée.'},
    {id:'q5',type:'order',competencies:['READ_SEQUENCE'],difficulty:2,prompt:'Remets l’histoire dans l’ordre.',tokens:['Nina écrit','Nina poste la lettre','Mamie téléphone'],ans:'Nina écrit Nina poste la lettre Mamie téléphone',explanation:'C’est l’ordre du texte.'}
   ]
  },

  fr_ce1_doudou_01:{
   id:'fr_ce1_doudou_01',level:'CE1',subject:'francais',type:'literary_text',documentType:'récit',
   title:'Le doudou perdu',author:null,work:null,sourceType:'original_mathquest',
   chapterLinks:['ce1-fr-comprendre'],
   competencies:['READ_EXPLICIT','READ_EMOTION_INTENTION','READ_PLACE','READ_INFERENCE','READ_REFERENCE','READ_SEQUENCE','READ_JUSTIFY'],
   difficulty:2,estimatedReadingMinutes:2,audioMode:'audioRecommended',sessionSize:7,
   paragraphs:[
    'Le soir, au moment de se coucher, Tim ne trouve plus son doudou, un petit lapin gris.',
    'Il fouille sa chambre, le salon et la salle de bain. Rien ! Tim a les larmes aux yeux.',
    'Sa grande sœur Léa réfléchit : « Où es-tu allé aujourd’hui ? » Tim se souvient : « Au parc, avec Papi ! »',
    'Papi prend sa lampe de poche, et ils retournent au parc tous les trois.',
    'Sous le toboggan, quelque chose de gris dépasse. C’est le lapin ! Tim le serre très fort contre lui.'
   ],
   glossary:[{word:'fouille',definition:'Cherche partout avec soin.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_EXPLICIT'],difficulty:1,prompt:'Quel est le doudou de Tim ?',choices:['Un petit lapin gris','Un ours brun','Un chien blanc'],ans:0,evidenceParagraph:0,explanation:'« ...son doudou, un petit lapin gris. »'},
    {id:'q2',type:'choice',competencies:['READ_EMOTION_INTENTION'],difficulty:2,prompt:'Comment se sent Tim quand il ne trouve rien ?',choices:['Triste','Joyeux','Fâché contre Léa'],ans:0,evidenceParagraph:1,explanation:'« Tim a les larmes aux yeux. »'},
    {id:'q3',type:'choice',competencies:['READ_INFERENCE'],difficulty:3,prompt:'Pourquoi Léa demande-t-elle où Tim est allé ?',choices:['Pour deviner où il a pu oublier son doudou','Pour le gronder','Pour aller jouer au parc'],ans:0,evidenceParagraph:2,explanation:'Si le doudou n’est pas à la maison, il est peut-être resté là où Tim est allé.'},
    {id:'q4',type:'choice',competencies:['READ_INFERENCE'],difficulty:3,prompt:'Pourquoi Papi prend-il une lampe de poche ?',choices:['Parce qu’il fait nuit','Pour jouer','Parce que le parc est fermé'],ans:0,evidenceParagraph:3,explanation:'C’est le soir, au moment de se coucher : dehors, il fait sombre.'},
    {id:'q5',type:'choice',competencies:['READ_PLACE'],difficulty:2,prompt:'Où retrouvent-ils le doudou ?',choices:['Sous le toboggan','Dans la salle de bain','Dans le lit'],ans:0,evidenceParagraph:4,explanation:'« Sous le toboggan, quelque chose de gris dépasse. »'},
    {id:'q6',type:'choice',competencies:['READ_REFERENCE'],difficulty:3,prompt:'Dans « Tim le serre très fort », que remplace « le » ?',choices:['Le lapin','Le toboggan','Papi'],ans:0,evidenceParagraph:4,explanation:'« le » reprend « le lapin », juste avant.'},
    {id:'q7',type:'order',competencies:['READ_SEQUENCE','READ_JUSTIFY'],difficulty:2,prompt:'Remets l’histoire dans l’ordre.',tokens:['Tim cherche dans la maison','Léa lui pose une question','Ils retournent au parc','Tim retrouve son lapin'],ans:'Tim cherche dans la maison Léa lui pose une question Ils retournent au parc Tim retrouve son lapin',explanation:'C’est l’ordre du texte.'}
   ]
  },

  fr_ce2_dinosaures_doc_01:{
   id:'fr_ce2_dinosaures_doc_01',level:'CE2',subject:'francais',type:'document',documentType:'texte documentaire',
   title:'Sur la piste des dinosaures',author:null,work:null,sourceType:'original_mathquest',
   chapterLinks:['ce2-fr-comprendre'],
   competencies:['READ_MAIN_IDEA','READ_EXPLICIT','READ_TIME','READ_VOCAB_CONTEXT','READ_CAUSE_CONSEQUENCE','READ_INFERENCE','READ_JUSTIFY'],
   difficulty:3,estimatedReadingMinutes:2,audioMode:'audioAllowed',sessionSize:7,
   paragraphs:[
    'Les dinosaures ont vécu sur la Terre pendant très longtemps, bien avant l’apparition des humains.',
    'Certains étaient gigantesques et mangeaient des plantes : ce sont des herbivores. D’autres, comme le tyrannosaure, chassaient les autres animaux : ce sont des carnivores.',
    'Il y a environ 66 millions d’années, la plupart des dinosaures ont disparu. Selon les scientifiques, la cause principale serait la chute d’une énorme météorite, qui a bouleversé le climat.',
    'Comment le sait-on ? Grâce aux fossiles : des os, des dents ou des empreintes transformés en pierre au fil du temps. Les scientifiques qui les étudient s’appellent des paléontologues.',
    'Et les oiseaux ? Les scientifiques ont découvert qu’ils descendent de petits dinosaures. Le moineau de ton jardin est donc un lointain cousin du tyrannosaure !'
   ],
   glossary:[{word:'herbivores',definition:'Animaux qui mangent des plantes.'},{word:'carnivores',definition:'Animaux qui mangent de la viande.'},{word:'météorite',definition:'Un morceau de roche venu de l’espace qui tombe sur une planète.'},{word:'fossiles',definition:'Restes d’êtres vivants très anciens, conservés dans la pierre.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_MAIN_IDEA'],difficulty:2,prompt:'De quoi parle ce texte ?',choices:['Des dinosaures et de ce que l’on sait d’eux','Des oiseaux du jardin','Des volcans'],ans:0,explanation:'Tous les paragraphes parlent des dinosaures.'},
    {id:'q2',type:'choice',competencies:['READ_VOCAB_CONTEXT'],difficulty:3,prompt:'Un dinosaure qui mange des plantes est...',choices:['Herbivore','Carnivore','Paléontologue'],ans:0,evidenceParagraph:1,explanation:'« ...mangeaient des plantes : ce sont des herbivores. »'},
    {id:'q3',type:'choice',competencies:['READ_TIME'],difficulty:3,prompt:'Quand la plupart des dinosaures ont-ils disparu ?',choices:['Il y a environ 66 millions d’années','Il y a 100 ans','L’année dernière'],ans:0,evidenceParagraph:2,explanation:'« Il y a environ 66 millions d’années... »'},
    {id:'q4',type:'choice',competencies:['READ_CAUSE_CONSEQUENCE'],difficulty:4,prompt:'Quelle serait la cause principale de leur disparition ?',choices:['La chute d’une énorme météorite','Les humains qui les chassaient','Le manque de plantes au printemps'],ans:0,evidenceParagraph:2,explanation:'« ...la chute d’une énorme météorite, qui a bouleversé le climat. » Les humains n’existaient pas encore.'},
    {id:'q5',type:'evidence',competencies:['READ_JUSTIFY'],difficulty:3,prompt:'Clique sur le paragraphe qui explique comment on connaît les dinosaures.',evidenceParagraph:3,explanation:'« Grâce aux fossiles... »'},
    {id:'q6',type:'choice',competencies:['READ_EXPLICIT'],difficulty:3,prompt:'Comment s’appellent les scientifiques qui étudient les fossiles ?',choices:['Des paléontologues','Des astronautes','Des vétérinaires'],ans:0,evidenceParagraph:3,explanation:'« Les scientifiques qui les étudient s’appellent des paléontologues. »'},
    {id:'q7',type:'choice',competencies:['READ_INFERENCE'],difficulty:4,prompt:'Pourquoi le texte dit-il que le moineau est un « cousin » du tyrannosaure ?',choices:['Parce que les oiseaux descendent de petits dinosaures','Parce que le moineau est très grand','Parce qu’ils vivent au même endroit'],ans:0,evidenceParagraph:4,explanation:'Les oiseaux descendent de dinosaures : ils font partie de la même grande famille.'}
   ]
  },

  fr_cm1_musiciens_breme_01:{
   id:'fr_cm1_musiciens_breme_01',level:'CM1',subject:'francais',type:'literary_text',documentType:'conte',
   title:'Les Musiciens de Brême',author:'Jacob et Wilhelm Grimm',work:'Contes de l’enfance et du foyer',
   sourceType:'public_domain',sourceReference:'Adaptation libre et abrégée pour le CM1, d’après le conte des frères Grimm (morts en 1859 et 1863), dans le domaine public.',
   chapterLinks:['cm1-fr-litterature'],
   competencies:['READ_CHARACTER','READ_CAUSE_CONSEQUENCE','READ_PLACE','READ_INFERENCE','READ_EMOTION_INTENTION','READ_SEQUENCE','READ_JUSTIFY','READ_AUTHOR_INTENT'],
   difficulty:4,estimatedReadingMinutes:3,audioMode:'audioAllowed',sessionSize:8,
   paragraphs:[
    'Un âne avait porté des sacs toute sa vie. Devenu vieux et faible, son maître voulut se débarrasser de lui. L’âne s’enfuit et prit la route de Brême : là-bas, pensait-il, il pourrait devenir musicien.',
    'En chemin, il rencontra un vieux chien trop lent pour la chasse, un chat qui n’attrapait plus les souris et un coq qu’on voulait mettre à la casserole. Tous avaient été chassés. « Venez avec moi à Brême ! » leur dit l’âne.',
    'Le soir, dans la forêt, ils aperçurent une maison éclairée. Par la fenêtre, l’âne vit des brigands attablés devant un repas magnifique.',
    'Les animaux eurent une idée : le chien grimpa sur le dos de l’âne, le chat sur le chien, et le coq sur la tête du chat. Puis ils se mirent tous à « chanter » en même temps : l’âne braya, le chien aboya, le chat miaula, le coq cria.',
    'Terrifiés par ce vacarme, les brigands crurent qu’un monstre les attaquait et s’enfuirent dans la forêt. Les quatre compagnons se régalèrent, puis s’installèrent dans la maison, où ils vécurent heureux. Ils n’arrivèrent jamais à Brême.'
   ],
   glossary:[{word:'brigands',definition:'Des voleurs qui attaquent les gens.'},{word:'braya',definition:'Poussa le cri de l’âne.'},{word:'vacarme',definition:'Un bruit très fort.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_CAUSE_CONSEQUENCE'],difficulty:3,prompt:'Pourquoi l’âne s’enfuit-il ?',choices:['Son maître veut se débarrasser de lui car il est vieux','Il veut voir la mer','Il a peur des brigands'],ans:0,evidenceParagraph:0,explanation:'« Devenu vieux et faible, son maître voulut se débarrasser de lui. »'},
    {id:'q2',type:'choice',competencies:['READ_CHARACTER','READ_INFERENCE'],difficulty:4,prompt:'Qu’ont en commun les quatre animaux ?',choices:['Ils sont vieux ou menacés, et ont été chassés par leurs maîtres','Ils sont tous musiciens','Ils vivent tous à Brême'],ans:0,evidenceParagraph:1,explanation:'« Tous avaient été chassés. »'},
    {id:'q3',type:'choice',competencies:['READ_PLACE'],difficulty:3,prompt:'Où les animaux trouvent-ils les brigands ?',choices:['Dans une maison éclairée au milieu de la forêt','À Brême','Dans une grange'],ans:0,evidenceParagraph:2,explanation:'« Le soir, dans la forêt, ils aperçurent une maison éclairée. »'},
    {id:'q4',type:'choice',competencies:['READ_CAUSE_CONSEQUENCE'],difficulty:4,prompt:'Pourquoi les brigands s’enfuient-ils ?',choices:['Ils croient qu’un monstre les attaque','La police arrive','Leur repas est brûlé'],ans:0,evidenceParagraph:4,explanation:'« ...les brigands crurent qu’un monstre les attaquait. »'},
    {id:'q5',type:'evidence',competencies:['READ_JUSTIFY'],difficulty:4,prompt:'Clique sur le paragraphe qui décrit la ruse des animaux.',evidenceParagraph:3,explanation:'Ils montent les uns sur les autres et crient tous ensemble.'},
    {id:'q6',type:'choice',competencies:['READ_INFERENCE'],difficulty:5,prompt:'Pourquoi le mot « chanter » est-il entre guillemets ?',choices:['Parce que leurs cris ne sont pas vraiment de la musique','Parce que c’est une citation d’un livre','Parce que les animaux chantent très bien'],ans:0,evidenceParagraph:3,explanation:'Braire, aboyer, miauler et crier en même temps : c’est un vacarme, pas un vrai chant. Les guillemets marquent l’ironie.'},
    {id:'q7',type:'choice',competencies:['READ_AUTHOR_INTENT','READ_EMOTION_INTENTION'],difficulty:5,prompt:'Que montre ce conte ?',choices:['Ensemble, même les plus faibles peuvent réussir','Il faut toujours obéir à son maître','Les brigands sont courageux'],ans:0,explanation:'Seuls, ces animaux étaient rejetés ; ensemble, ils triomphent des brigands.'},
    {id:'q8',type:'order',competencies:['READ_SEQUENCE'],difficulty:4,prompt:'Remets le conte dans l’ordre.',tokens:['L’âne part pour Brême','Il rencontre le chien, le chat et le coq','Ils voient les brigands','Ils font fuir les brigands'],ans:'L’âne part pour Brême Il rencontre le chien, le chat et le coq Ils voient les brigands Ils font fuir les brigands',explanation:'C’est l’ordre du conte.'}
   ]
  },

  fr_cm2_systeme_solaire_doc_01:{
   id:'fr_cm2_systeme_solaire_doc_01',level:'CM2',subject:'francais',type:'document',documentType:'texte documentaire',
   title:'Notre système solaire',author:null,work:null,sourceType:'original_mathquest',
   chapterLinks:['cm2-fr-comprendre'],
   competencies:['READ_MAIN_IDEA','READ_EXPLICIT','READ_VOCAB_CONTEXT','READ_CAUSE_CONSEQUENCE','READ_STRUCTURE','READ_JUSTIFY','READ_INFERENCE'],
   difficulty:4,estimatedReadingMinutes:3,audioMode:'audioAllowed',sessionSize:8,
   paragraphs:[
    'Au centre du système solaire se trouve le Soleil. C’est une étoile : une gigantesque boule de gaz très chauds qui produit de la lumière et de la chaleur.',
    'Huit planètes tournent autour du Soleil. Dans l’ordre, en partant du Soleil : Mercure, Vénus, la Terre, Mars, Jupiter, Saturne, Uranus et Neptune.',
    'Les quatre premières sont des planètes rocheuses. Les quatre suivantes sont des géantes gazeuses ; Jupiter est la plus grosse de toutes.',
    'La Terre fait le tour du Soleil en un peu plus de 365 jours : c’est une année. En même temps, elle tourne sur elle-même en 24 heures, ce qui provoque l’alternance du jour et de la nuit.',
    'Pluton a longtemps été considérée comme la neuvième planète. Mais en 2006, les astronomes l’ont classée parmi les planètes naines, car elle est beaucoup plus petite.'
   ],
   glossary:[{word:'étoile',definition:'Un astre qui produit sa propre lumière.'},{word:'rocheuses',definition:'Faites de roches, avec un sol solide.'},{word:'astronomes',definition:'Les scientifiques qui étudient les astres.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_EXPLICIT'],difficulty:3,prompt:'Qu’est-ce que le Soleil ?',choices:['Une étoile','Une planète','Un satellite'],ans:0,evidenceParagraph:0,explanation:'« C’est une étoile... »'},
    {id:'q2',type:'choice',competencies:['READ_EXPLICIT'],difficulty:3,prompt:'Combien de planètes tournent autour du Soleil ?',choices:['Huit','Neuf','Douze'],ans:0,evidenceParagraph:1,explanation:'« Huit planètes tournent autour du Soleil. »'},
    {id:'q3',type:'choice',competencies:['READ_INFERENCE'],difficulty:4,prompt:'Quelle est la place de la Terre en partant du Soleil ?',choices:['Troisième','Première','Huitième'],ans:0,evidenceParagraph:1,explanation:'Mercure, Vénus, puis la Terre : elle est troisième.'},
    {id:'q4',type:'choice',competencies:['READ_CAUSE_CONSEQUENCE'],difficulty:4,prompt:'Qu’est-ce qui provoque l’alternance du jour et de la nuit ?',choices:['La rotation de la Terre sur elle-même en 24 heures','Le tour de la Terre autour du Soleil','Les nuages'],ans:0,evidenceParagraph:3,explanation:'« ...elle tourne sur elle-même en 24 heures, ce qui provoque l’alternance du jour et de la nuit. »'},
    {id:'q5',type:'choice',competencies:['READ_VOCAB_CONTEXT'],difficulty:4,prompt:'D’après le texte, une « année » correspond...',choices:['Au temps que met la Terre pour faire le tour du Soleil','Au temps que met la Terre pour tourner sur elle-même','À la durée d’une saison'],ans:0,evidenceParagraph:3,explanation:'« La Terre fait le tour du Soleil en un peu plus de 365 jours : c’est une année. »'},
    {id:'q6',type:'evidence',competencies:['READ_JUSTIFY'],difficulty:4,prompt:'Clique sur le paragraphe qui explique pourquoi Pluton n’est plus une planète.',evidenceParagraph:4,explanation:'« ...en 2006, les astronomes l’ont classée parmi les planètes naines... »'},
    {id:'q7',type:'choice',competencies:['READ_EXPLICIT'],difficulty:3,prompt:'Quelle est la plus grosse planète ?',choices:['Jupiter','La Terre','Mars'],ans:0,evidenceParagraph:2,explanation:'« ...Jupiter est la plus grosse de toutes. »'},
    {id:'q8',type:'choice',competencies:['READ_MAIN_IDEA','READ_STRUCTURE'],difficulty:4,prompt:'Quel serait le meilleur résumé de ce texte ?',choices:['Le Soleil, une étoile, est entouré de huit planètes, dont la Terre','La Terre est la plus grosse planète','Pluton est la planète la plus chaude'],ans:0,explanation:'Ce résumé reprend l’idée principale sans s’arrêter sur un seul détail.'}
   ]
  },

  // ===== Lot 8 (18/10/2026) : derniers renforts pour atteindre ~90 supports. Texte original de
  // Rimbaud ; adaptations libres de Chrétien de Troyes, Voltaire, Maupassant, Hugo et Perrault
  // (domaine public) ; récits et documents originaux Finot Académie.

  fr_cm1_panne_01:{
   id:'fr_cm1_panne_01',level:'CM1',subject:'francais',type:'literary_text',documentType:'récit',
   title:'La panne de courant',author:null,work:null,sourceType:'original_mathquest',
   chapterLinks:['cm1-fr-comprendre'],
   competencies:['READ_TIME','READ_EXPLICIT','READ_CAUSE_CONSEQUENCE','READ_EMOTION_INTENTION','READ_INFERENCE','READ_REFERENCE','READ_JUSTIFY','READ_SEQUENCE'],
   difficulty:4,estimatedReadingMinutes:2,audioMode:'audioAllowed',sessionSize:8,
   paragraphs:[
    'Ce soir-là, un violent orage éclata au-dessus de la ville. Soudain, toutes les lumières de l’appartement s’éteignirent. Même la télévision se tut.',
    'Malik, qui avait horreur du noir, se blottit contre sa mère. Sa petite sœur Inaya, elle, applaudit : « Une aventure ! »',
    'Maman alluma des bougies et les posa sur la table. Leurs flammes dansaient et faisaient bouger des ombres immenses sur les murs.',
    'Papa eut une idée : avec ses mains, il fit apparaître sur le mur l’ombre d’un lapin, puis celle d’un loup. Malik oublia sa peur et se mit à rire.',
    'Quand la lumière revint, une heure plus tard, les deux enfants protestèrent : « Oh non ! On peut éteindre encore un peu ? »'
   ],
   glossary:[{word:'se blottit',definition:'Se serra tout contre quelqu’un, pour être protégé.'},{word:'protestèrent',definition:'Dirent qu’ils n’étaient pas d’accord.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_CAUSE_CONSEQUENCE'],difficulty:3,prompt:'Qu’est-ce qui provoque la panne ?',choices:['Un violent orage','Une erreur de Papa','Une tempête de neige'],ans:0,evidenceParagraph:0,explanation:'Un « violent orage éclata », puis les lumières s’éteignirent.'},
    {id:'q2',type:'choice',competencies:['READ_EMOTION_INTENTION'],difficulty:3,prompt:'Comment réagissent les deux enfants au début ?',choices:['Malik a peur, Inaya est ravie','Ils ont peur tous les deux','Ils sont ravis tous les deux'],ans:0,evidenceParagraph:1,explanation:'Malik « avait horreur du noir » ; Inaya « applaudit : « Une aventure ! » ».'},
    {id:'q3',type:'choice',competencies:['READ_INFERENCE'],difficulty:4,prompt:'Pourquoi Papa fait-il des ombres sur le mur ?',choices:['Pour rassurer Malik et l’amuser','Pour réparer la panne','Pour faire peur aux enfants'],ans:0,evidenceParagraph:3,explanation:'Résultat : « Malik oublia sa peur et se mit à rire. »'},
    {id:'q4',type:'choice',competencies:['READ_TIME','READ_EXPLICIT'],difficulty:3,prompt:'Combien de temps dure la panne ?',choices:['Une heure','Une nuit entière','Deux minutes'],ans:0,evidenceParagraph:4,explanation:'« Quand la lumière revint, une heure plus tard... »'},
    {id:'q5',type:'choice',competencies:['READ_REFERENCE'],difficulty:4,prompt:'Dans « Leurs flammes dansaient », de quoi parle « Leurs » ?',choices:['Des bougies','Des enfants','Des murs'],ans:0,evidenceParagraph:2,explanation:'Ce sont les flammes des bougies, citées juste avant.'},
    {id:'q6',type:'choice',competencies:['READ_INFERENCE','READ_EMOTION_INTENTION'],difficulty:5,prompt:'Que montre la réaction des enfants à la fin ?',choices:['Ils ont fini par aimer ce moment passé ensemble dans le noir','Ils ont toujours peur','Ils veulent regarder la télévision'],ans:0,evidenceParagraph:4,explanation:'Ils demandent à « éteindre encore un peu » : la soirée est devenue un bon souvenir.'},
    {id:'q7',type:'evidence',competencies:['READ_JUSTIFY'],difficulty:4,prompt:'Clique sur le paragraphe où Malik n’a plus peur.',evidenceParagraph:3,explanation:'« Malik oublia sa peur et se mit à rire. »'},
    {id:'q8',type:'order',competencies:['READ_SEQUENCE'],difficulty:3,prompt:'Remets l’histoire dans l’ordre.',tokens:['Les lumières s’éteignent','Maman allume des bougies','Papa fait des ombres','La lumière revient'],ans:'Les lumières s’éteignent Maman allume des bougies Papa fait des ombres La lumière revient',explanation:'C’est l’ordre du texte.'}
   ]
  },

  fr_cm1_coeur_doc_01:{
   id:'fr_cm1_coeur_doc_01',level:'CM1',subject:'francais',type:'document',documentType:'texte documentaire',
   title:'Le cœur, une pompe infatigable',author:null,work:null,sourceType:'original_mathquest',
   chapterLinks:['cm1-fr-documentaire'],
   competencies:['READ_MAIN_IDEA','READ_EXPLICIT','READ_VOCAB_CONTEXT','READ_CAUSE_CONSEQUENCE','READ_INFERENCE','READ_JUSTIFY','READ_STRUCTURE'],
   difficulty:4,estimatedReadingMinutes:2,audioMode:'audioAllowed',sessionSize:7,
   paragraphs:[
    'Le cœur est un muscle, à peu près de la taille de ton poing. Il se trouve dans ta poitrine, entre les deux poumons.',
    'Son rôle est de pomper le sang et de l’envoyer dans tout le corps, à travers des tuyaux appelés vaisseaux sanguins.',
    'Le sang transporte l’oxygène et les nutriments dont chaque partie du corps a besoin pour fonctionner.',
    'Au repos, le cœur d’un adulte bat environ soixante à cent fois par minute. Quand tu cours, il bat plus vite, car tes muscles ont besoin de plus d’oxygène.',
    'Pour garder un cœur en bonne santé, il est conseillé de bouger chaque jour et de manger de façon équilibrée.'
   ],
   glossary:[{word:'vaisseaux sanguins',definition:'Les tuyaux dans lesquels circule le sang.'},{word:'oxygène',definition:'Un gaz de l’air, indispensable à la vie.'},{word:'nutriments',definition:'Les éléments utiles tirés des aliments.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_MAIN_IDEA'],difficulty:3,prompt:'Quel est le sujet du texte ?',choices:['Le cœur et son rôle','Les poumons','La course à pied'],ans:0,explanation:'Le titre et tous les paragraphes parlent du cœur.'},
    {id:'q2',type:'choice',competencies:['READ_EXPLICIT'],difficulty:3,prompt:'Quelle est la taille du cœur ?',choices:['À peu près celle de ton poing','Celle d’un ballon de football','Celle d’un petit pois'],ans:0,evidenceParagraph:0,explanation:'« ...à peu près de la taille de ton poing. »'},
    {id:'q3',type:'choice',competencies:['READ_VOCAB_CONTEXT'],difficulty:3,prompt:'Que sont les « vaisseaux sanguins » ?',choices:['Les tuyaux dans lesquels circule le sang','Des bateaux','Des muscles du bras'],ans:0,evidenceParagraph:1,explanation:'« ...à travers des tuyaux appelés vaisseaux sanguins. »'},
    {id:'q4',type:'choice',competencies:['READ_CAUSE_CONSEQUENCE'],difficulty:4,prompt:'Pourquoi le cœur bat-il plus vite quand tu cours ?',choices:['Tes muscles ont besoin de plus d’oxygène','Tu as peur','Le sang devient plus lourd'],ans:0,evidenceParagraph:3,explanation:'« ...car tes muscles ont besoin de plus d’oxygène. »'},
    {id:'q5',type:'choice',competencies:['READ_INFERENCE'],difficulty:5,prompt:'Pourquoi peut-on dire que le cœur est « infatigable » ?',choices:['Il bat sans jamais s’arrêter, jour et nuit','Il ne bat que quand on court','Il dort la nuit'],ans:0,evidenceParagraph:3,explanation:'Soixante à cent battements par minute, à chaque minute de la vie : il ne s’arrête jamais.'},
    {id:'q6',type:'evidence',competencies:['READ_JUSTIFY'],difficulty:4,prompt:'Clique sur le paragraphe qui donne des conseils de santé.',evidenceParagraph:4,explanation:'« ...bouger chaque jour et manger de façon équilibrée. »'},
    {id:'q7',type:'choice',competencies:['READ_STRUCTURE'],difficulty:4,prompt:'Dans quel ordre le texte est-il organisé ?',choices:['Ce qu’est le cœur, son rôle, son fonctionnement, puis des conseils','Des conseils, puis une histoire','Une liste de maladies'],ans:0,explanation:'On va de la description du cœur jusqu’aux conseils pour en prendre soin.'}
   ]
  },

  fr_cm2_les_fees_01:{
   id:'fr_cm2_les_fees_01',level:'CM2',subject:'francais',type:'literary_text',documentType:'conte',
   title:'Les Fées',author:'Charles Perrault',work:'Histoires ou contes du temps passé (1697)',
   sourceType:'public_domain',sourceReference:'Adaptation libre et abrégée pour le CM2, d’après Charles Perrault (mort en 1703), dans le domaine public.',
   chapterLinks:['cm2-fr-temps-recit','cm2-fr-litterature'],
   competencies:['READ_CHARACTER','READ_CAUSE_CONSEQUENCE','READ_INFERENCE','READ_STRUCTURE','READ_JUSTIFY','READ_AUTHOR_INTENT','READ_EXPLICIT'],
   difficulty:4,estimatedReadingMinutes:3,audioMode:'audioAllowed',sessionSize:8,
   paragraphs:[
    'Il était une fois une veuve qui avait deux filles. L’aînée lui ressemblait : elle était orgueilleuse et désagréable. La cadette était douce et polie. La mère préférait l’aînée et obligeait la cadette à travailler sans cesse.',
    'Chaque jour, la cadette allait chercher de l’eau à une fontaine, loin de la maison. Un jour, une pauvre femme lui demanda à boire. La jeune fille lui offrit de l’eau de bon cœur.',
    'C’était une fée. « Vous êtes si bonne, dit-elle, qu’à chaque parole que vous direz, il vous sortira de la bouche une fleur ou une pierre précieuse. »',
    'Voyant ce prodige, la mère envoya l’aînée à la fontaine. Cette fois, la fée apparut sous l’aspect d’une princesse magnifiquement vêtue et lui demanda à boire. L’aînée répondit avec insolence : « Servez-vous vous-même ! »',
    'La fée lui dit : « Puisque vous êtes si peu aimable, à chaque parole, il vous sortira de la bouche un serpent ou un crapaud. »',
    'La cadette, chassée par sa mère, rencontra un prince qui l’épousa. L’aînée, détestée de tous, finit seule au fond d’un bois.'
   ],
   glossary:[{word:'veuve',definition:'Une femme dont le mari est mort.'},{word:'cadette',definition:'La plus jeune des enfants.'},{word:'prodige',definition:'Un phénomène extraordinaire.'},{word:'insolence',definition:'Un manque de respect.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_CHARACTER'],difficulty:3,prompt:'Comment est la cadette ?',choices:['Douce et polie','Orgueilleuse','Paresseuse'],ans:0,evidenceParagraph:0,explanation:'« La cadette était douce et polie. »'},
    {id:'q2',type:'choice',competencies:['READ_CAUSE_CONSEQUENCE'],difficulty:4,prompt:'Pourquoi la fée fait-elle un don merveilleux à la cadette ?',choices:['Parce qu’elle lui a donné à boire avec gentillesse','Parce qu’elle est la plus belle','Parce que sa mère l’a demandé'],ans:0,evidenceParagraph:2,explanation:'« Vous êtes si bonne... » : la fée récompense sa bonté.'},
    {id:'q3',type:'choice',competencies:['READ_INFERENCE'],difficulty:5,prompt:'Pourquoi la fée apparaît-elle en princesse devant l’aînée, et non en pauvre femme ?',choices:['Pour voir si l’aînée serait polie même avec quelqu’un d’important','Parce qu’elle a changé de métier','Pour la récompenser'],ans:0,evidenceParagraph:3,explanation:'Même face à une princesse, l’aînée est insolente : la fée vérifie son vrai caractère.'},
    {id:'q4',type:'choice',competencies:['READ_EXPLICIT'],difficulty:3,prompt:'Que sort-il de la bouche de l’aînée quand elle parle ?',choices:['Des serpents ou des crapauds','Des fleurs','Des pierres précieuses'],ans:0,evidenceParagraph:4,explanation:'« ...il vous sortira de la bouche un serpent ou un crapaud. »'},
    {id:'q5',type:'choice',competencies:['READ_STRUCTURE'],difficulty:5,prompt:'Comment le conte est-il construit ?',choices:['La même scène se répète avec les deux sœurs, et chacune est jugée selon son comportement','Les deux sœurs vivent des aventures sans rapport','On ne suit qu’une seule sœur'],ans:0,explanation:'Fontaine, demande à boire, don de la fée : la scène est répétée pour opposer les deux sœurs.'},
    {id:'q6',type:'evidence',competencies:['READ_JUSTIFY'],difficulty:4,prompt:'Clique sur le paragraphe où l’aînée manque de respect à la fée.',evidenceParagraph:3,explanation:'« Servez-vous vous-même ! »'},
    {id:'q7',type:'choice',competencies:['READ_STRUCTURE'],difficulty:5,prompt:'Dans le premier paragraphe, pourquoi trouve-t-on surtout l’imparfait (« avait », « était ») ?',choices:['Pour présenter les personnages et la situation de départ','Pour raconter une action soudaine','Pour parler de l’avenir'],ans:0,evidenceParagraph:0,explanation:'L’imparfait décrit ; le passé simple (« demanda », « offrit ») raconte les actions qui font avancer le conte.'},
    {id:'q8',type:'choice',competencies:['READ_AUTHOR_INTENT'],difficulty:5,prompt:'Quelle est la morale du conte ?',choices:['La gentillesse et la politesse finissent par être récompensées','Il faut toujours obéir à sa mère','Les fées sont dangereuses'],ans:0,explanation:'Les paroles aimables se changent en trésors, les paroles méchantes en serpents.'}
   ]
  },

  fr_6e_gateau_disparu_01:{
   id:'fr_6e_gateau_disparu_01',level:'6e',subject:'francais',type:'literary_text',documentType:'récit',
   title:'Le gâteau disparu',author:null,work:null,sourceType:'original_mathquest',
   chapterLinks:['fr6b'],
   competencies:['READ_EXPLICIT','READ_INFERENCE','READ_JUSTIFY','READ_CHARACTER','READ_EMOTION_INTENTION','READ_REFERENCE'],
   difficulty:5,estimatedReadingMinutes:2,audioMode:'audioAllowed',sessionSize:7,
   paragraphs:[
    'Mamie avait laissé refroidir son gâteau au chocolat sur le rebord de la fenêtre de la cuisine, puis elle était allée au jardin.',
    'Quand elle revint, l’assiette était vide. Sur le carrelage, elle remarqua des miettes brunes et de petites traces de pattes qui menaient vers le salon.',
    'Dans le salon, Lucas lisait tranquillement une bande dessinée. « Ce n’est pas moi ! » dit-il aussitôt, avant même qu’on lui pose la question.',
    'Sous le canapé, on entendait un drôle de bruit, comme quelqu’un qui se lèche les babines. Le chien, Biscuit, avait le museau tout marron.',
    'Mamie éclata de rire. Lucas, lui, eut l’air soulagé… mais il rougit un peu en essuyant discrètement le coin de sa bouche.'
   ],
   glossary:[{word:'babines',definition:'Les lèvres d’un animal.'},{word:'soulagé',definition:'Libéré d’une inquiétude.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_EXPLICIT'],difficulty:3,prompt:'Où Mamie avait-elle posé le gâteau ?',choices:['Sur le rebord de la fenêtre de la cuisine','Dans le réfrigérateur','Sur la table du jardin'],ans:0,evidenceParagraph:0,explanation:'« ...sur le rebord de la fenêtre de la cuisine. »'},
    {id:'q2',type:'choice',competencies:['READ_INFERENCE'],difficulty:5,prompt:'Quels indices accusent le chien ?',choices:['Les traces de pattes, le bruit sous le canapé et son museau marron','Ses aboiements','Il dort dans la cuisine'],ans:0,evidenceParagraph:3,explanation:'Traces de pattes vers le salon, bruit de babines, museau « tout marron » comme du chocolat.'},
    {id:'q3',type:'choice',competencies:['READ_INFERENCE','READ_CHARACTER'],difficulty:6,prompt:'Pourquoi est-il suspect que Lucas dise « Ce n’est pas moi ! » si vite ?',choices:['Il se défend avant même d’être accusé : il a peut-être quelque chose à cacher','Il est poli','Il ne sait pas parler'],ans:0,evidenceParagraph:2,explanation:'Se justifier « avant même qu’on lui pose la question » est un indice : il se sent coupable de quelque chose.'},
    {id:'q4',type:'choice',competencies:['READ_INFERENCE'],difficulty:7,prompt:'Que suggère la dernière phrase ?',choices:['Lucas a sans doute mangé lui aussi un morceau de gâteau','Lucas a froid','Lucas est malade'],ans:0,evidenceParagraph:4,explanation:'Il rougit et s’essuie discrètement la bouche : le texte ne le dit pas, mais tout le laisse penser. C’est de l’implicite.'},
    {id:'q5',type:'evidence',competencies:['READ_JUSTIFY'],difficulty:6,prompt:'Clique sur le paragraphe qui laisse deviner que Lucas n’est pas tout à fait innocent.',evidenceParagraph:4,explanation:'« ...il rougit un peu en essuyant discrètement le coin de sa bouche. »'},
    {id:'q6',type:'choice',competencies:['READ_EMOTION_INTENTION'],difficulty:4,prompt:'Comment réagit Mamie en découvrant le coupable ?',choices:['Elle éclate de rire','Elle se met en colère','Elle pleure'],ans:0,evidenceParagraph:4,explanation:'« Mamie éclata de rire. »'},
    {id:'q7',type:'choice',competencies:['READ_REFERENCE'],difficulty:4,prompt:'Dans « elle remarqua des miettes », qui est « elle » ?',choices:['Mamie','L’assiette','La cuisine'],ans:0,evidenceParagraph:1,explanation:'C’est Mamie, qui revient du jardin.'}
   ]
  },

  fr_6e_visite_chateau_doc_01:{
   id:'fr_6e_visite_chateau_doc_01',level:'6e',subject:'francais',type:'document',documentType:'document pratique (dépliant)',
   title:'Visiter le château de Montclair',author:null,work:null,sourceType:'original_mathquest',
   sourceReference:'Document original Finot Académie : le château de Montclair et ses informations pratiques sont imaginaires.',
   chapterLinks:['fr6c'],
   competencies:['READ_EXPLICIT','READ_STRUCTURE','READ_INFERENCE','READ_DOCUMENT_SOURCE','READ_TIME','READ_JUSTIFY'],
   difficulty:5,estimatedReadingMinutes:3,audioMode:'audioAllowed',sessionSize:7,
   paragraphs:[
    'CHÂTEAU DE MONTCLAIR — Venez découvrir une forteresse du XIIIe siècle et son jardin médiéval !',
    'HORAIRES : du 1er avril au 31 octobre, tous les jours de 10 h à 18 h. Du 1er novembre au 31 mars, uniquement le week-end, de 14 h à 17 h. Fermé le 25 décembre et le 1er janvier.',
    'TARIFS : adulte, 9 € ; de 7 à 17 ans, 5 € ; gratuit pour les moins de 7 ans. Billet famille (2 adultes et 2 enfants) : 24 €.',
    'À NE PAS MANQUER : la visite du donjon (à partir de 8 ans, 120 marches) et le spectacle de chevalerie, chaque dimanche à 15 h en juillet et en août.',
    'Accès : parking gratuit à 300 mètres. Les chiens tenus en laisse sont acceptés dans le jardin, mais pas dans le château.'
   ],
   glossary:[{word:'forteresse',definition:'Un lieu fortifié pour se défendre.'},{word:'médiéval',definition:'Du Moyen Âge.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_DOCUMENT_SOURCE','READ_STRUCTURE'],difficulty:4,prompt:'Quel type de document est-ce ?',choices:['Un dépliant d’informations pratiques pour les visiteurs','Un roman de chevalerie','Un article scientifique'],ans:0,explanation:'Horaires, tarifs, accès : il sert à préparer une visite.'},
    {id:'q2',type:'choice',competencies:['READ_STRUCTURE'],difficulty:4,prompt:'À quoi servent les mots en majuscules (HORAIRES, TARIFS…) ?',choices:['À repérer vite chaque rubrique','À crier','À décorer le texte'],ans:0,evidenceParagraph:1,explanation:'Ce sont des intertitres : ils permettent de trouver une information sans tout lire.'},
    {id:'q3',type:'choice',competencies:['READ_TIME','READ_EXPLICIT'],difficulty:5,prompt:'Un mercredi de janvier, le château est-il ouvert ?',choices:['Non, en hiver il n’ouvre que le week-end','Oui, de 10 h à 18 h','Oui, de 14 h à 17 h'],ans:0,evidenceParagraph:1,explanation:'Du 1er novembre au 31 mars, il est ouvert « uniquement le week-end ».'},
    {id:'q4',type:'choice',competencies:['READ_INFERENCE'],difficulty:6,prompt:'Une famille de 2 adultes et 2 enfants de 10 et 12 ans : quel est le tarif le plus avantageux ?',choices:['Le billet famille à 24 €','Les billets séparés à 28 €','La visite est gratuite'],ans:0,evidenceParagraph:2,explanation:'Billets séparés : 9 + 9 + 5 + 5 = 28 € ; le billet famille coûte 24 €, soit 4 € de moins.'},
    {id:'q5',type:'choice',competencies:['READ_INFERENCE'],difficulty:5,prompt:'Léo a 6 ans. Que ne pourra-t-il pas faire ?',choices:['Monter dans le donjon','Entrer gratuitement','Voir le jardin'],ans:0,evidenceParagraph:3,explanation:'Le donjon se visite « à partir de 8 ans ». (Il entrera, en revanche, gratuitement.)'},
    {id:'q6',type:'evidence',competencies:['READ_JUSTIFY'],difficulty:4,prompt:'Clique sur la rubrique qui dit si l’on peut venir avec son chien.',evidenceParagraph:4,explanation:'« Les chiens tenus en laisse sont acceptés dans le jardin, mais pas dans le château. »'},
    {id:'q7',type:'choice',competencies:['READ_TIME'],difficulty:4,prompt:'Quand a lieu le spectacle de chevalerie ?',choices:['Le dimanche à 15 h, en juillet et en août','Tous les jours à 10 h','Le 25 décembre'],ans:0,evidenceParagraph:3,explanation:'« ...chaque dimanche à 15 h en juillet et en août. »'}
   ]
  },

  fr_6e_ma_boheme_01:{
   id:'fr_6e_ma_boheme_01',level:'6e',subject:'francais',type:'literary_text',documentType:'poème (sonnet)',
   title:'Ma Bohème',author:'Arthur Rimbaud',work:'Poésies (1870)',
   sourceType:'public_domain',sourceReference:'Texte original d’Arthur Rimbaud (mort en 1891), dans le domaine public.',
   chapterLinks:['fr6e'],verse:true,stanzas:[4,8,11],
   competencies:['READ_NARRATOR_POV','READ_EMOTION_INTENTION','READ_VOCAB_CONTEXT','READ_INFERENCE','READ_GENRE','READ_JUSTIFY','READ_PLACE'],
   difficulty:6,estimatedReadingMinutes:3,audioMode:'audioRecommended',sessionSize:7,
   paragraphs:[
    'Je m’en allais, les poings dans mes poches crevées ;',
    'Mon paletot aussi devenait idéal ;',
    'J’allais sous le ciel, Muse ! et j’étais ton féal ;',
    'Oh ! là ! là ! que d’amours splendides j’ai rêvées !',
    'Mon unique culotte avait un large trou.',
    '— Petit-Poucet rêveur, j’égrenais dans ma course',
    'Des rimes. Mon auberge était à la Grande-Ourse.',
    '— Mes étoiles au ciel avaient un doux frou-frou',
    'Et je les écoutais, assis au bord des routes,',
    'Ces bons soirs de septembre où je sentais des gouttes',
    'De rosée à mon front, comme un vin de vigueur ;',
    'Où, rimant au milieu des ombres fantastiques,',
    'Comme des lyres, je tirais les élastiques',
    'De mes souliers blessés, un pied près de mon cœur !'
   ],
   glossary:[{word:'paletot',definition:'Un manteau court.'},{word:'Muse',definition:'Divinité qui inspire les poètes.'},{word:'féal',definition:'Fidèle serviteur.'},{word:'égrenais',definition:'Laissais tomber un à un, comme des grains.'},{word:'lyres',definition:'Instruments de musique à cordes de l’Antiquité.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_NARRATOR_POV'],difficulty:4,prompt:'Qui parle dans ce poème ?',choices:['Le poète, qui raconte ses propres errances','Le Petit Poucet','Une étoile'],ans:0,evidenceParagraph:0,explanation:'« Je m’en allais... » : le poète parle de lui-même.'},
    {id:'q2',type:'choice',competencies:['READ_INFERENCE'],difficulty:5,prompt:'Que nous apprennent les « poches crevées » et l’« unique culotte » avec « un large trou » ?',choices:['Le poète est pauvre, mais cela ne l’empêche pas d’être heureux','Le poète est très riche','Le poète est un couturier'],ans:0,evidenceParagraph:4,explanation:'Ses vêtements sont usés, mais le ton reste joyeux (« Oh ! là ! là ! »).'},
    {id:'q3',type:'choice',competencies:['READ_PLACE','READ_VOCAB_CONTEXT'],difficulty:6,prompt:'« Mon auberge était à la Grande-Ourse » : que veut dire le poète ?',choices:['Il dort à la belle étoile, sous le ciel','Il dort dans un hôtel de luxe','Il habite chez un ours'],ans:0,evidenceParagraph:6,explanation:'La Grande Ourse est une constellation : son « auberge », c’est le ciel étoilé.'},
    {id:'q4',type:'choice',competencies:['READ_INFERENCE'],difficulty:6,prompt:'Pourquoi le poète se compare-t-il au « Petit-Poucet » ?',choices:['Comme Poucet semait des cailloux, il sème des rimes sur son chemin','Parce qu’il est très petit','Parce qu’il est perdu dans la forêt'],ans:0,evidenceParagraph:5,explanation:'« ...j’égrenais dans ma course / Des rimes » : au lieu de cailloux, ce sont des vers.'},
    {id:'q5',type:'choice',competencies:['READ_EMOTION_INTENTION'],difficulty:5,prompt:'Quel sentiment domine ce poème ?',choices:['Le bonheur d’une vie libre et vagabonde','La peur de la nuit','La colère contre la pauvreté'],ans:0,evidenceParagraph:3,explanation:'« Oh ! là ! là ! que d’amours splendides j’ai rêvées ! » : il est heureux de vagabonder.'},
    {id:'q6',type:'evidence',competencies:['READ_JUSTIFY'],difficulty:6,prompt:'Clique sur le vers qui transforme des lacets de chaussures en instrument de musique.',evidenceParagraph:12,explanation:'« Comme des lyres, je tirais les élastiques / De mes souliers » : même ses souliers abîmés deviennent poésie.'},
    {id:'q7',type:'choice',competencies:['READ_GENRE'],difficulty:5,prompt:'Ce poème de 14 vers (deux quatrains et deux tercets) est...',choices:['Un sonnet','Une fable','Une chanson à refrain'],ans:0,explanation:'Deux quatrains puis deux tercets : c’est la forme du sonnet.'}
   ]
  },

  fr_5e_carnet_croquis_01:{
   id:'fr_5e_carnet_croquis_01',level:'5e',subject:'francais',type:'literary_text',documentType:'récit',
   title:'Le carnet de croquis',author:null,work:null,sourceType:'original_mathquest',
   chapterLinks:['fr5a'],
   competencies:['READ_CHARACTER','READ_EMOTION_INTENTION','READ_INFERENCE','READ_NARRATOR_POV','READ_CAUSE_CONSEQUENCE','READ_JUSTIFY','READ_MAIN_IDEA'],
   difficulty:6,estimatedReadingMinutes:3,audioMode:'audioAllowed',sessionSize:7,
   paragraphs:[
    'Depuis la rentrée, Yanis ne parlait à personne. Au fond de la classe, il dessinait sans relâche dans un vieux carnet à la couverture bleue.',
    'Un matin, en rangeant les tables, je trouvai le carnet par terre. Je n’aurais pas dû l’ouvrir. Je l’ouvris quand même.',
    'Chaque page montrait l’un d’entre nous, croqué en quelques traits : Chloé en train de rire, le professeur avec ses lunettes sur le front, moi-même, penché sur mon cahier. Tout était si juste que j’en restai bouche bée.',
    'Je rendis le carnet à Yanis à la récréation. Il devint écarlate et murmura : « Tu l’as regardé ? » Je hochai la tête : « Tu as un talent fou. »',
    'Pour la première fois, je le vis sourire. Le lendemain, il s’assit à côté de moi à la cantine.'
   ],
   glossary:[{word:'croqué',definition:'Dessiné rapidement, en quelques traits.'},{word:'écarlate',definition:'Rouge vif.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_NARRATOR_POV'],difficulty:5,prompt:'Qui raconte l’histoire ?',choices:['Un élève de la classe, qui dit « je »','Yanis','Le professeur'],ans:0,evidenceParagraph:1,explanation:'« ...je trouvai le carnet... » : le narrateur est un camarade de Yanis.'},
    {id:'q2',type:'choice',competencies:['READ_CHARACTER'],difficulty:4,prompt:'Comment Yanis se comporte-t-il au début ?',choices:['Il est solitaire et ne parle à personne','Il est bavard','Il est le chef de la classe'],ans:0,evidenceParagraph:0,explanation:'« Depuis la rentrée, Yanis ne parlait à personne. »'},
    {id:'q3',type:'choice',competencies:['READ_EMOTION_INTENTION'],difficulty:5,prompt:'« Je n’aurais pas dû l’ouvrir. Je l’ouvris quand même. » Que montrent ces phrases ?',choices:['Le narrateur sait qu’il ne devrait pas, mais sa curiosité est plus forte','Le narrateur n’a pas de curiosité','Le narrateur est fier de lui'],ans:0,evidenceParagraph:1,explanation:'Les deux phrases courtes opposées montrent son hésitation, puis sa curiosité.'},
    {id:'q4',type:'choice',competencies:['READ_INFERENCE','READ_EMOTION_INTENTION'],difficulty:6,prompt:'Pourquoi Yanis devient-il « écarlate » ?',choices:['Il est gêné qu’on ait découvert ses dessins','Il a trop couru','Il est en colère contre Chloé'],ans:0,evidenceParagraph:3,explanation:'Son carnet était secret : il rougit d’embarras en apprenant qu’on l’a regardé.'},
    {id:'q5',type:'evidence',competencies:['READ_JUSTIFY'],difficulty:5,prompt:'Clique sur le paragraphe qui décrit le contenu du carnet.',evidenceParagraph:2,explanation:'« Chaque page montrait l’un d’entre nous, croqué en quelques traits... »'},
    {id:'q6',type:'choice',competencies:['READ_CAUSE_CONSEQUENCE','READ_INFERENCE'],difficulty:6,prompt:'Pourquoi Yanis s’assoit-il à côté du narrateur le lendemain ?',choices:['Le compliment sincère lui a donné confiance : une amitié commence','Il n’y avait plus d’autre place','Il veut récupérer un dessin'],ans:0,evidenceParagraph:4,explanation:'« Pour la première fois, je le vis sourire » : le compliment a créé un lien.'},
    {id:'q7',type:'choice',competencies:['READ_MAIN_IDEA'],difficulty:6,prompt:'Quel est le thème principal de ce récit ?',choices:['Une rencontre qui brise la solitude','Un vol de carnet','Un concours de dessin'],ans:0,explanation:'Un élève isolé, un talent caché, un compliment sincère : le récit raconte la naissance d’une amitié.'}
   ]
  },

  fr_5e_yvain_lion_01:{
   id:'fr_5e_yvain_lion_01',level:'5e',subject:'francais',type:'literary_text',documentType:'roman de chevalerie (adaptation)',
   title:'Yvain et le lion',author:'Chrétien de Troyes',work:'Yvain ou le Chevalier au lion (vers 1177-1181)',
   sourceType:'public_domain',sourceReference:'Adaptation libre en français moderne pour la 5e, d’après Chrétien de Troyes (XIIe siècle), dans le domaine public — aucune traduction existante reprise.',
   chapterLinks:['fr5d'],
   competencies:['READ_CHARACTER','READ_EXPLICIT','READ_CAUSE_CONSEQUENCE','READ_INFERENCE','READ_EMOTION_INTENTION','READ_JUSTIFY','READ_GENRE','READ_SEQUENCE'],
   difficulty:6,estimatedReadingMinutes:3,audioMode:'audioAllowed',sessionSize:8,
   paragraphs:[
    'Yvain chevauchait seul dans une forêt profonde quand il entendit un cri terrible. Il se dirigea vers le bruit et découvrit, dans une clairière, un lion aux prises avec un serpent.',
    'Le serpent tenait le lion par la queue et lui brûlait les flancs de son souffle de feu. Yvain hésita : lequel des deux devait-il aider ?',
    'Il se décida vite : le serpent était une bête venimeuse et perfide, tandis que le lion était un animal noble. Il tira son épée et attaqua le serpent.',
    'Il le trancha en deux, puis dut couper un petit bout de la queue du lion, que le monstre tenait encore serrée entre ses mâchoires.',
    'Yvain s’attendait à ce que le lion se jette sur lui. Mais l’animal s’agenouilla devant lui, les yeux pleins de larmes, comme pour le remercier. Dès lors, il ne le quitta plus et le suivit dans toutes ses aventures.'
   ],
   glossary:[{word:'clairière',definition:'Un endroit sans arbres au milieu d’une forêt.'},{word:'venimeuse',definition:'Qui a du venin, un poison.'},{word:'perfide',definition:'Traître, sournois.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_EXPLICIT','READ_CHARACTER'],difficulty:3,prompt:'Que découvre Yvain dans la clairière ?',choices:['Un lion attaqué par un serpent','Un dragon endormi','Un chevalier blessé'],ans:0,evidenceParagraph:0,explanation:'« ...un lion aux prises avec un serpent. »'},
    {id:'q2',type:'choice',competencies:['READ_CAUSE_CONSEQUENCE'],difficulty:5,prompt:'Pourquoi Yvain choisit-il d’aider le lion ?',choices:['Le lion est un animal noble, le serpent une bête venimeuse et perfide','Le lion est plus petit','Le serpent l’a attaqué en premier'],ans:0,evidenceParagraph:2,explanation:'Pour un chevalier, il faut défendre ce qui est noble contre ce qui est perfide.'},
    {id:'q3',type:'choice',competencies:['READ_INFERENCE'],difficulty:5,prompt:'Pourquoi Yvain coupe-t-il un bout de la queue du lion ?',choices:['Pour le libérer des mâchoires du serpent mort','Pour le punir','Par maladresse'],ans:0,evidenceParagraph:3,explanation:'Le serpent tenait encore la queue « serrée entre ses mâchoires » : c’était le seul moyen de libérer le lion.'},
    {id:'q4',type:'choice',competencies:['READ_EMOTION_INTENTION'],difficulty:5,prompt:'Que montre le geste du lion qui s’agenouille ?',choices:['Sa reconnaissance envers Yvain','Sa peur','Sa fatigue'],ans:0,evidenceParagraph:4,explanation:'« ...les yeux pleins de larmes, comme pour le remercier. »'},
    {id:'q5',type:'evidence',competencies:['READ_JUSTIFY'],difficulty:5,prompt:'Clique sur le paragraphe où Yvain hésite.',evidenceParagraph:1,explanation:'« Yvain hésita : lequel des deux devait-il aider ? »'},
    {id:'q6',type:'choice',competencies:['READ_GENRE','READ_CHARACTER'],difficulty:6,prompt:'Quelles qualités du chevalier ce passage met-il en valeur ?',choices:['Le courage et le sens de la justice','La ruse et le mensonge','La richesse'],ans:0,explanation:'Yvain affronte un monstre et défend le plus noble : ce sont des valeurs de la chevalerie.'},
    {id:'q7',type:'choice',competencies:['READ_GENRE','READ_INFERENCE'],difficulty:6,prompt:'Pourquoi le roman s’appelle-t-il « le Chevalier au lion » ?',choices:['Le lion devient le fidèle compagnon d’Yvain dans ses aventures','Yvain est roi d’un pays de lions','Yvain se transforme en lion'],ans:0,evidenceParagraph:4,explanation:'« Dès lors, il ne le quitta plus et le suivit dans toutes ses aventures. »'},
    {id:'q8',type:'order',competencies:['READ_SEQUENCE'],difficulty:4,prompt:'Remets l’épisode dans l’ordre.',tokens:['Yvain entend un cri','Il hésite','Il tue le serpent','Le lion s’agenouille'],ans:'Yvain entend un cri Il hésite Il tue le serpent Le lion s’agenouille',explanation:'C’est l’ordre du récit.'}
   ]
  },

  fr_4e_micromegas_01:{
   id:'fr_4e_micromegas_01',level:'4e',subject:'francais',type:'literary_text',documentType:'conte philosophique (adaptation)',
   title:'Micromégas sur la Terre',author:'Voltaire',work:'Micromégas (1752)',
   sourceType:'public_domain',sourceReference:'Adaptation libre et abrégée pour la 4e, d’après Voltaire (mort en 1778), dans le domaine public.',
   chapterLinks:['fr4c'],
   competencies:['READ_CHARACTER','READ_INFERENCE','READ_AUTHOR_INTENT','READ_VOCAB_CONTEXT','READ_JUSTIFY','READ_GENRE','READ_ARGUMENT'],
   difficulty:7,estimatedReadingMinutes:3,audioMode:'audioAllowed',sessionSize:7,
   paragraphs:[
    'Micromégas, un géant venu d’une planète tournant autour de l’étoile Sirius, mesurait plus de trente kilomètres de haut. Avec un compagnon de voyage, habitant de Saturne, il arriva un jour sur la Terre.',
    'D’abord, ils crurent la planète vide : les hommes étaient bien trop petits pour être vus. Puis, à l’aide d’un diamant qui servait de loupe, Micromégas aperçut un navire, qu’il prit délicatement sur son ongle.',
    'Il découvrit avec stupeur que ces « atomes » savaient parler et penser. Ils lui expliquèrent qu’au même moment, des milliers d’hommes se massacraient pour un morceau de terre.',
    '« Pour quoi se battent-ils ? demanda le géant. — Pour un petit tas de boue grand comme votre talon, lui répondit-on. Et la plupart de ceux qui se battent ne savent même pas pourquoi. »',
    'Micromégas fut saisi d’indignation : « Malheureux ! On devrait écraser d’un coup de pied tous ces ridicules assassins ! » Puis il se calma, mais il garda une profonde pitié pour ces petits êtres si fiers et si cruels.'
   ],
   glossary:[{word:'Sirius',definition:'L’étoile la plus brillante du ciel nocturne.'},{word:'stupeur',definition:'Un étonnement extrême.'},{word:'indignation',definition:'Une colère causée par une injustice.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_CHARACTER'],difficulty:4,prompt:'Qui est Micromégas ?',choices:['Un géant venu d’une planète de l’étoile Sirius','Un savant de la Terre','Un capitaine de navire'],ans:0,evidenceParagraph:0,explanation:'« Micromégas, un géant venu d’une planète tournant autour de l’étoile Sirius... »'},
    {id:'q2',type:'choice',competencies:['READ_INFERENCE'],difficulty:5,prompt:'Pourquoi les voyageurs croient-ils d’abord la Terre inhabitée ?',choices:['Les hommes sont beaucoup trop petits pour qu’ils les voient','La Terre est couverte de nuages','Les hommes se cachent'],ans:0,evidenceParagraph:1,explanation:'« ...les hommes étaient bien trop petits pour être vus. »'},
    {id:'q3',type:'choice',competencies:['READ_VOCAB_CONTEXT','READ_INFERENCE'],difficulty:6,prompt:'Pourquoi Voltaire appelle-t-il les hommes des « atomes » ?',choices:['Pour montrer à quel point ils sont minuscules aux yeux du géant','Parce que ce sont des scientifiques','Parce qu’ils sont invisibles même entre eux'],ans:0,evidenceParagraph:2,explanation:'Vus par un géant, les hommes sont aussi petits que des atomes : c’est un changement de point de vue.'},
    {id:'q4',type:'choice',competencies:['READ_ARGUMENT','READ_INFERENCE'],difficulty:7,prompt:'Qu’est-ce que l’expression « un petit tas de boue grand comme votre talon » fait comprendre ?',choices:['Les guerres des hommes sont absurdes, car l’enjeu est minuscule','Les hommes cultivent la boue','Le géant a les pieds sales'],ans:0,evidenceParagraph:3,explanation:'Vu de loin, le territoire disputé est dérisoire : les guerres paraissent ridicules.'},
    {id:'q5',type:'evidence',competencies:['READ_JUSTIFY'],difficulty:6,prompt:'Clique sur le paragraphe où le géant exprime sa colère.',evidenceParagraph:4,explanation:'« Micromégas fut saisi d’indignation... »'},
    {id:'q6',type:'choice',competencies:['READ_GENRE','READ_AUTHOR_INTENT'],difficulty:7,prompt:'Pourquoi Voltaire fait-il observer les hommes par un géant venu d’ailleurs ?',choices:['Le regard extérieur permet de critiquer plus librement les défauts humains','Pour écrire un roman de science-fiction sans message','Pour décrire la vie sur Sirius'],ans:0,explanation:'Ce regard naïf et lointain fait apparaître l’absurdité de nos guerres : c’est le procédé du conte philosophique.'},
    {id:'q7',type:'choice',competencies:['READ_AUTHOR_INTENT'],difficulty:7,prompt:'Que dénonce surtout ce passage ?',choices:['La guerre et l’orgueil des hommes','L’exploration spatiale','La pêche en mer'],ans:0,explanation:'Des êtres minuscules qui s’entretuent pour un « tas de boue » tout en se croyant importants : c’est une critique de la guerre et de l’orgueil.'}
   ]
  },

  fr_4e_fait_opinion_doc_01:{
   id:'fr_4e_fait_opinion_doc_01',level:'4e',subject:'francais',type:'document',documentType:'texte documentaire (éducation aux médias)',
   title:'Fait ou opinion ?',author:null,work:null,sourceType:'original_mathquest',
   sourceReference:'Document original Finot Académie. Le parc et les chiffres cités sont imaginaires, inventés pour l’exercice.',
   chapterLinks:['fr4d'],
   competencies:['READ_MAIN_IDEA','READ_VOCAB_CONTEXT','READ_ARGUMENT','READ_DOCUMENT_SOURCE','READ_JUSTIFY','READ_INFERENCE'],
   difficulty:6,estimatedReadingMinutes:3,audioMode:'audioAllowed',sessionSize:7,
   paragraphs:[
    'Un fait est une information que l’on peut vérifier : une date, un chiffre, un événement. Par exemple : « Le nouveau parc de la ville a ouvert le 3 mai et compte 200 arbres. »',
    'Une opinion est un avis personnel, avec lequel on peut être d’accord ou non. Par exemple : « Ce parc est le plus beau de la région. »',
    'Les opinions se repèrent souvent grâce à certains mots : des adjectifs qui jugent (« magnifique », « décevant »), des verbes comme « je pense », « je trouve », ou des expressions comme « à mon avis ».',
    'Un bon article d’information présente d’abord les faits. S’il donne des opinions, il doit les attribuer clairement à quelqu’un : « Selon le maire, ce parc est une réussite. »',
    'Avant de partager une information, pose-toi la question : est-ce un fait vérifiable, ou l’avis de quelqu’un ?'
   ],
   glossary:[{word:'vérifier',definition:'Contrôler que quelque chose est vrai.'},{word:'attribuer',definition:'Ici : indiquer qui a dit quelque chose.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_MAIN_IDEA'],difficulty:5,prompt:'Quel est le but de ce document ?',choices:['Apprendre à distinguer un fait d’une opinion','Présenter le nouveau parc de la ville','Donner l’avis du maire'],ans:0,explanation:'Le titre et les paragraphes expliquent la différence entre fait et opinion.'},
    {id:'q2',type:'choice',competencies:['READ_VOCAB_CONTEXT'],difficulty:5,prompt:'Qu’est-ce qu’un fait ?',choices:['Une information que l’on peut vérifier','Un avis personnel','Une rumeur'],ans:0,evidenceParagraph:0,explanation:'« Un fait est une information que l’on peut vérifier. »'},
    {id:'q3',type:'choice',competencies:['READ_ARGUMENT'],difficulty:6,prompt:'« Le match a été un spectacle décevant. » Est-ce un fait ou une opinion ?',choices:['Une opinion : « décevant » est un jugement','Un fait : on peut le vérifier','Ni l’un ni l’autre'],ans:0,evidenceParagraph:2,explanation:'L’adjectif « décevant » exprime un jugement personnel.'},
    {id:'q4',type:'choice',competencies:['READ_ARGUMENT'],difficulty:6,prompt:'« Le match s’est terminé sur le score de 2 à 1. » Est-ce un fait ou une opinion ?',choices:['Un fait : le score se vérifie','Une opinion','Une rumeur'],ans:0,evidenceParagraph:0,explanation:'Un score est un chiffre vérifiable : c’est un fait.'},
    {id:'q5',type:'evidence',competencies:['READ_JUSTIFY'],difficulty:5,prompt:'Clique sur le paragraphe qui donne des indices pour repérer une opinion.',evidenceParagraph:2,explanation:'Adjectifs qui jugent, « je pense », « à mon avis »…'},
    {id:'q6',type:'choice',competencies:['READ_DOCUMENT_SOURCE','READ_INFERENCE'],difficulty:7,prompt:'Pourquoi un article doit-il écrire « Selon le maire, ce parc est une réussite » plutôt que « Ce parc est une réussite » ?',choices:['Pour montrer que c’est l’opinion d’une personne et non un fait établi','Pour faire plaisir au maire','Parce que c’est plus court'],ans:0,evidenceParagraph:3,explanation:'En citant la source de l’opinion, l’article reste honnête : le lecteur sait qui pense quoi.'},
    {id:'q7',type:'choice',competencies:['READ_ARGUMENT'],difficulty:6,prompt:'Lequel de ces deux exemples du texte est un fait ?',choices:['« Le parc a ouvert le 3 mai et compte 200 arbres »','« Ce parc est le plus beau de la région »','Les deux'],ans:0,evidenceParagraph:1,explanation:'La date et le nombre d’arbres se vérifient ; « le plus beau » est un avis.'}
   ]
  },

  fr_4e_aux_champs_01:{
   id:'fr_4e_aux_champs_01',level:'4e',subject:'francais',type:'literary_text',documentType:'nouvelle réaliste (adaptation)',
   title:'Aux champs',author:'Guy de Maupassant',work:'Aux champs (1882)',
   sourceType:'public_domain',sourceReference:'Résumé-adaptation libre pour la 4e, d’après Guy de Maupassant (mort en 1893), dans le domaine public.',
   chapterLinks:['fr4f'],
   competencies:['READ_CHARACTER','READ_EXPLICIT','READ_CAUSE_CONSEQUENCE','READ_TIME','READ_INFERENCE','READ_EMOTION_INTENTION','READ_JUSTIFY','READ_AUTHOR_INTENT','READ_STRUCTURE'],
   difficulty:7,estimatedReadingMinutes:3,audioMode:'audioAllowed',sessionSize:8,
   paragraphs:[
    'Deux familles de paysans très pauvres, les Tuvache et les Vallin, vivaient côte à côte dans deux chaumières. Chacune avait quatre enfants, qui grandissaient ensemble devant les portes.',
    'Un jour, une riche dame, Mme d’Hubières, qui n’avait pas d’enfant, s’arrêta devant les maisons. Elle proposa aux Tuvache de leur prendre leur petit Charlot pour l’élever comme son fils, contre une rente de cent francs par mois.',
    'La mère Tuvache refusa, indignée : « Vendre son enfant ! Ah, non ! » Alors Mme d’Hubières alla chez les Vallin, qui, après avoir discuté le prix, acceptèrent de lui donner leur fils Jean.',
    'Pendant des années, la mère Tuvache méprisa ses voisins et répéta partout qu’elle, au moins, n’avait pas vendu son enfant. Les Vallin, eux, vivaient désormais à l’aise grâce à la rente.',
    'Bien des années plus tard, quand les enfants furent devenus de jeunes hommes, une belle voiture s’arrêta devant les chaumières : Jean Vallin, devenu un élégant jeune homme, revenait voir ses parents. Charlot Tuvache, resté pauvre, le regarda passer et lança à ses parents : « Faut-il être bête pour ne pas avoir voulu ! » Puis il partit pour toujours.'
   ],
   glossary:[{word:'chaumières',definition:'Petites maisons de paysans au toit de chaume (paille).'},{word:'rente',definition:'Une somme d’argent versée régulièrement.'},{word:'indignée',definition:'Révoltée par ce qui lui paraît injuste ou honteux.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_CHARACTER'],difficulty:4,prompt:'Qui sont les Tuvache et les Vallin ?',choices:['Deux familles de paysans pauvres et voisines','Deux familles riches','Deux familles de commerçants en ville'],ans:0,evidenceParagraph:0,explanation:'« Deux familles de paysans très pauvres [...] vivaient côte à côte. »'},
    {id:'q2',type:'choice',competencies:['READ_EXPLICIT','READ_CAUSE_CONSEQUENCE'],difficulty:5,prompt:'Que propose Mme d’Hubières ?',choices:['D’élever un de leurs enfants comme son fils, contre une rente','D’acheter leurs chaumières','De leur donner du travail'],ans:0,evidenceParagraph:1,explanation:'Elle veut « l’élever comme son fils, contre une rente de cent francs par mois ».'},
    {id:'q3',type:'choice',competencies:['READ_EMOTION_INTENTION'],difficulty:5,prompt:'Pourquoi la mère Tuvache refuse-t-elle ?',choices:['Elle trouve honteux de « vendre » son enfant','Elle trouve la rente trop faible','Elle n’aime pas Mme d’Hubières'],ans:0,evidenceParagraph:2,explanation:'« Vendre son enfant ! Ah, non ! »'},
    {id:'q4',type:'choice',competencies:['READ_TIME','READ_STRUCTURE'],difficulty:5,prompt:'Combien de temps s’écoule avant le retour de Jean ?',choices:['Bien des années : les enfants sont devenus de jeunes hommes','Quelques jours','Un mois'],ans:0,evidenceParagraph:4,explanation:'« Bien des années plus tard... » : une ellipse fait passer d’un coup de nombreuses années.'},
    {id:'q5',type:'choice',competencies:['READ_INFERENCE'],difficulty:7,prompt:'Que reproche Charlot à ses parents ?',choices:['De l’avoir gardé dans la misère au lieu de le laisser partir vers une vie riche','De l’avoir donné à Mme d’Hubières','De ne pas l’avoir laissé aller à l’école'],ans:0,evidenceParagraph:4,explanation:'« Faut-il être bête pour ne pas avoir voulu ! » : il pense que ses parents l’ont privé de la richesse.'},
    {id:'q6',type:'evidence',competencies:['READ_JUSTIFY'],difficulty:6,prompt:'Clique sur le paragraphe qui montre l’orgueil de la mère Tuvache.',evidenceParagraph:3,explanation:'« ...répéta partout qu’elle, au moins, n’avait pas vendu son enfant. »'},
    {id:'q7',type:'choice',competencies:['READ_AUTHOR_INTENT','READ_STRUCTURE'],difficulty:8,prompt:'Qu’y a-t-il d’ironique dans la fin de la nouvelle ?',choices:['La mère qui a refusé par amour est rejetée par son propre fils','Les Vallin deviennent pauvres','Mme d’Hubières rend Jean'],ans:0,evidenceParagraph:4,explanation:'La décision dont la mère Tuvache était si fière se retourne contre elle : c’est une chute ironique.'},
    {id:'q8',type:'choice',competencies:['READ_AUTHOR_INTENT'],difficulty:8,prompt:'Quelle question la nouvelle pose-t-elle au lecteur, sans donner de réponse simple ?',choices:['L’argent peut-il compter plus que les liens familiaux quand on est très pauvre ?','Faut-il habiter à la campagne ?','Comment construire une chaumière ?'],ans:0,explanation:'Maupassant ne juge pas ouvertement : il montre comment la misère pousse à des choix déchirants.'}
   ]
  },

  fr_3e_image_virale_doc_01:{
   id:'fr_3e_image_virale_doc_01',level:'3e',subject:'francais',type:'document',documentType:'texte documentaire (éducation aux médias)',
   title:'Vérifier une image avant de la partager',author:null,work:null,sourceType:'original_mathquest',
   sourceReference:'Document original Finot Académie. L’exemple de la photo du requin est imaginaire, inventé pour l’exercice.',
   chapterLinks:['fr3h'],
   competencies:['READ_MAIN_IDEA','READ_DOCUMENT_SOURCE','READ_SEQUENCE','READ_INFERENCE','READ_JUSTIFY','READ_STRUCTURE','READ_ARGUMENT'],
   difficulty:7,estimatedReadingMinutes:3,audioMode:'audioAllowed',sessionSize:7,
   paragraphs:[
    'Une photo montre un requin nageant dans une rue inondée, après une tempête. Elle a été partagée des milliers de fois en quelques heures, avec le message : « Incroyable ! Ça se passe en ce moment ! »',
    'Avant de la partager à ton tour, commence par chercher l’origine de l’image. Une recherche d’image inversée, proposée par plusieurs moteurs de recherche, permet de retrouver où et quand elle a été publiée pour la première fois.',
    'Si l’on découvre que la même photo circulait déjà des années plus tôt, à propos d’une autre tempête, le message « en ce moment » est faux.',
    'Observe aussi les détails : une ombre incohérente, un contour flou autour de l’animal ou une taille étrange peuvent révéler un montage.',
    'Enfin, cherche si des médias reconnus ou des services de vérification en parlent. Une image vraiment exceptionnelle serait reprise et vérifiée par des journalistes.'
   ],
   glossary:[{word:'inversée',definition:'Ici : on part de l’image pour retrouver les pages où elle apparaît.'},{word:'incohérente',definition:'Qui ne correspond pas avec le reste, illogique.'},{word:'montage',definition:'Une image fabriquée en assemblant plusieurs images.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_MAIN_IDEA'],difficulty:5,prompt:'Quel est le but de ce document ?',choices:['Donner une méthode pour vérifier une image avant de la partager','Raconter une tempête','Expliquer la vie des requins'],ans:0,explanation:'Le titre l’annonce, et chaque paragraphe donne une étape de vérification.'},
    {id:'q2',type:'choice',competencies:['READ_DOCUMENT_SOURCE'],difficulty:6,prompt:'À quoi sert une recherche d’image inversée ?',choices:['À retrouver où et quand l’image a été publiée pour la première fois','À retourner l’image à l’envers','À effacer l’image'],ans:0,evidenceParagraph:1,explanation:'« ...permet de retrouver où et quand elle a été publiée pour la première fois. »'},
    {id:'q3',type:'choice',competencies:['READ_INFERENCE'],difficulty:7,prompt:'Si la photo circulait déjà il y a plusieurs années, que peut-on conclure ?',choices:['Le message « en ce moment » est faux, même si la photo est vraie','La photo est forcément vraie','Le requin est très vieux'],ans:0,evidenceParagraph:2,explanation:'Une image ancienne présentée comme récente trompe sur la date : c’est une fausse information.'},
    {id:'q4',type:'choice',competencies:['READ_INFERENCE'],difficulty:6,prompt:'Quel indice peut révéler un montage ?',choices:['Une ombre incohérente ou un contour flou','Une photo en couleur','Une photo partagée par un ami'],ans:0,evidenceParagraph:3,explanation:'« ...une ombre incohérente, un contour flou autour de l’animal ou une taille étrange... »'},
    {id:'q5',type:'evidence',competencies:['READ_JUSTIFY'],difficulty:6,prompt:'Clique sur le paragraphe qui conseille de consulter des médias reconnus.',evidenceParagraph:4,explanation:'« ...cherche si des médias reconnus ou des services de vérification en parlent. »'},
    {id:'q6',type:'order',competencies:['READ_SEQUENCE','READ_STRUCTURE'],difficulty:6,prompt:'Remets les étapes de vérification dans l’ordre du texte.',tokens:['Chercher l’origine de l’image','Vérifier la date','Observer les détails','Consulter des médias reconnus'],ans:'Chercher l’origine de l’image Vérifier la date Observer les détails Consulter des médias reconnus',explanation:'C’est l’ordre des paragraphes 2 à 5.'},
    {id:'q7',type:'choice',competencies:['READ_ARGUMENT','READ_INFERENCE'],difficulty:7,prompt:'Pourquoi le fait qu’une image soit partagée « des milliers de fois » ne prouve-t-il pas qu’elle est vraie ?',choices:['Beaucoup de gens la partagent sans l’avoir vérifiée','Parce que les partages sont toujours faux','Parce que les requins n’existent pas'],ans:0,evidenceParagraph:0,explanation:'Le nombre de partages mesure la popularité, pas la vérité.'}
   ]
  },

  fr_3e_gavroche_01:{
   id:'fr_3e_gavroche_01',level:'3e',subject:'francais',type:'literary_text',documentType:'roman (extrait adapté)',
   title:'La mort de Gavroche',author:'Victor Hugo',work:'Les Misérables (1862), cinquième partie',
   sourceType:'public_domain',sourceReference:'Adaptation libre et abrégée pour la 3e, d’après Victor Hugo (mort en 1885), dans le domaine public. Les couplets chantés par Gavroche sont cités d’après l’original.',
   chapterLinks:['fr3k'],
   competencies:['READ_CHARACTER','READ_PLACE','READ_INFERENCE','READ_EMOTION_INTENTION','READ_STRUCTURE','READ_JUSTIFY','READ_AUTHOR_INTENT','READ_CAUSE_CONSEQUENCE'],
   difficulty:8,estimatedReadingMinutes:3,audioMode:'audioAllowed',sessionSize:8,
   paragraphs:[
    'Paris, juin 1832. Derrière une barricade, les insurgés manquaient de munitions. Gavroche, un gamin des rues d’une douzaine d’années, eut une idée : de l’autre côté, dans la rue, des soldats morts gisaient avec leurs cartouchières pleines.',
    'Il sortit, un panier à la main, et se mit à ramasser les cartouches, en rampant d’un corps à l’autre. Une fumée épaisse le cachait d’abord aux soldats.',
    'Mais la fumée se dissipa. Une balle frappa le cadavre près de lui. Gavroche se redressa, les cheveux au vent, et se mit à chanter : « Je suis tombé par terre, / C’est la faute à Voltaire, / Le nez dans le ruisseau, / C’est la faute à Rousseau. »',
    'Les balles pleuvaient autour de lui ; il les esquivait, continuait de remplir son panier, et chantait de plus belle. C’était un spectacle épouvantable et charmant : on aurait dit un moineau qui se moquait des chasseurs.',
    'Soudain, une balle l’atteignit. Il chancela, puis s’affaissa. Il commença à chanter un dernier couplet, mais une seconde balle l’arrêta net. Cette petite grande âme venait de s’envoler.'
   ],
   glossary:[{word:'barricade',definition:'Un amas d’objets dressé en travers d’une rue pour se protéger pendant un combat.'},{word:'insurgés',definition:'Des personnes qui se révoltent contre le pouvoir.'},{word:'cartouchières',definition:'Des ceintures où les soldats rangent leurs cartouches.'},{word:'esquivait',definition:'Évitait d’un mouvement rapide.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_PLACE'],difficulty:5,prompt:'Où et quand se passe la scène ?',choices:['À Paris, en juin 1832, sur une barricade','À Londres, en 1900','À la campagne, au Moyen Âge'],ans:0,evidenceParagraph:0,explanation:'« Paris, juin 1832. Derrière une barricade... »'},
    {id:'q2',type:'choice',competencies:['READ_CAUSE_CONSEQUENCE'],difficulty:5,prompt:'Pourquoi Gavroche sort-il de la barricade ?',choices:['Pour ramasser les cartouches des soldats morts, car les insurgés en manquent','Pour s’enfuir','Pour aller chercher à manger'],ans:0,evidenceParagraph:0,explanation:'Les insurgés « manquaient de munitions » : il va en chercher.'},
    {id:'q3',type:'choice',competencies:['READ_CHARACTER','READ_EMOTION_INTENTION'],difficulty:6,prompt:'Que montre le fait que Gavroche chante sous les balles ?',choices:['Son audace et sa manière de se moquer du danger','Qu’il ne comprend pas le danger','Qu’il veut attirer l’attention de ses amis'],ans:0,evidenceParagraph:3,explanation:'Il chante « de plus belle » : c’est un défi lancé aux soldats.'},
    {id:'q4',type:'choice',competencies:['READ_INFERENCE'],difficulty:7,prompt:'Pourquoi la chanson de Gavroche accuse-t-elle « Voltaire » et « Rousseau » ?',choices:['C’est une chanson moqueuse de l’époque, qui rendait ces philosophes responsables de tout','Ce sont ses amis','Ce sont les soldats qui tirent'],ans:0,evidenceParagraph:2,explanation:'Les adversaires des idées de liberté accusaient ces philosophes de tous les maux ; Gavroche reprend cette rengaine pour s’en moquer.'},
    {id:'q5',type:'choice',competencies:['READ_STRUCTURE'],difficulty:7,prompt:'« Un spectacle épouvantable et charmant » : quelle figure de style rapproche deux mots presque opposés ?',choices:['Une antithèse','Une répétition','Une énumération'],ans:0,evidenceParagraph:3,explanation:'« Épouvantable » et « charmant » s’opposent : la scène est à la fois terrible et gracieuse.'},
    {id:'q6',type:'evidence',competencies:['READ_JUSTIFY'],difficulty:6,prompt:'Clique sur le paragraphe où Gavroche est comparé à un oiseau.',evidenceParagraph:3,explanation:'« ...on aurait dit un moineau qui se moquait des chasseurs. »'},
    {id:'q7',type:'choice',competencies:['READ_EMOTION_INTENTION','READ_AUTHOR_INTENT'],difficulty:7,prompt:'Que veut faire ressentir Hugo avec l’expression « cette petite grande âme » ?',choices:['L’admiration et l’émotion devant un enfant héroïque','Le mépris pour Gavroche','L’indifférence'],ans:0,evidenceParagraph:4,explanation:'« Petite » (un enfant) et « grande » (son courage) s’opposent : Hugo rend hommage à son héroïsme.'},
    {id:'q8',type:'choice',competencies:['READ_AUTHOR_INTENT'],difficulty:8,prompt:'Que dénonce Hugo à travers la mort de Gavroche ?',choices:['La misère et la violence qui frappent même les enfants','Le courage inutile des soldats','La vie à la campagne'],ans:0,explanation:'Un enfant des rues, abandonné, meurt dans un combat d’adultes : c’est l’une des « misères » du titre.'}
   ]
  }

 }
};
