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
 version:'1.0-pilote-2026-10-18',
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
    {id:'q5',type:'choice',competencies:['READ_VOCAB_CONTEXT'],difficulty:2,prompt:'Dans le texte, « déçu » veut dire...',choices:['Un peu triste','Très content','Fatigué'],ans:0,evidenceParagraph:6,explanation:'Voir le glossaire.'},
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
    {id:'q10',type:'choice',competencies:['READ_VOCAB_CONTEXT'],difficulty:2,prompt:'Dans le texte, « oser » signifie avoir...',choices:['Le courage de faire quelque chose','Peur de faire quelque chose','Le temps de faire quelque chose'],ans:0,explanation:'Voir le glossaire.'}
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
    {id:'q5',type:'choice',competencies:['READ_VOCAB_CONTEXT'],difficulty:2,prompt:'Dans le texte, « intriguée » veut dire...',choices:['Curieuse, qui veut comprendre','Fâchée','Fatiguée'],ans:0,explanation:'Voir le glossaire.'},
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
    {id:'q2',type:'choice',competencies:['READ_EXPLICIT'],difficulty:1,prompt:'Qu’est-ce que le Cyclope ?',choices:['Un géant à un seul œil','Un petit lutin','Un serpent géant'],ans:0,evidenceParagraph:3,explanation:'Voir le glossaire et le texte.'},
    {id:'q3',type:'choice',competencies:['READ_EXPLICIT'],difficulty:2,prompt:'Comment le Cyclope empêche-t-il Ulysse et ses hommes de sortir ?',choices:['Il roule un énorme rocher devant l’entrée','Il ferme une porte en bois','Il les attache avec des cordes'],ans:0,evidenceParagraph:3,explanation:'« ...roula un énorme rocher devant l’entrée, les enfermant à l’intérieur. »'},
    {id:'q4',type:'choice',competencies:['READ_CAUSE_CONSEQUENCE'],difficulty:4,prompt:'Pourquoi Ulysse choisit-il la ruse plutôt que la force contre le Cyclope ?',choices:['Parce que le Cyclope est bien plus fort et grand que lui','Parce qu’Ulysse n’a aucune arme','Parce qu’il veut devenir ami avec le Cyclope'],ans:0,evidenceParagraph:5,explanation:'Un géant ne peut pas être vaincu par la force : il faut la ruse.'},
    {id:'q5',type:'choice',competencies:['READ_INFERENCE'],difficulty:5,prompt:'Pourquoi Ulysse offre-t-il du vin très fort au Cyclope ?',choices:['Pour l’endormir et pouvoir agir sans qu’il résiste','Parce que c’est un cadeau de politesse','Parce qu’il n’a rien d’autre à lui offrir'],ans:0,evidenceParagraph:6,explanation:'Le texte enchaîne : « une fois le Cyclope endormi et ivre... »'},
    {id:'q6',type:'choice',competencies:['READ_EXPLICIT'],difficulty:2,prompt:'Comment Ulysse et ses hommes blessent-ils le Cyclope ?',choices:['Ils lui crèvent son unique œil avec un pieu','Ils lui coupent la main','Ils l’attachent à un rocher'],ans:0,evidenceParagraph:6,explanation:'« ...lui crevèrent son unique œil avec un pieu de bois durci au feu. »'},
    {id:'q7',type:'choice',competencies:['READ_INFERENCE'],difficulty:6,prompt:'Comment Ulysse et ses hommes sortent-ils de la grotte sans être vus ?',choices:['Ils se cachent sous le ventre des moutons','Ils creusent un tunnel','Le Cyclope les laisse partir'],ans:0,evidenceParagraph:7,explanation:'« ...fit sortir ses hommes cachés sous le ventre des moutons... »'},
    {id:'q8',type:'evidence',competencies:['READ_JUSTIFY'],difficulty:5,prompt:'Quelle phrase montre que le Cyclope est un vrai danger pour les compagnons d’Ulysse ?',evidenceParagraph:4,explanation:'« Le Cyclope dévora deux des compagnons d’Ulysse... »'},
    {id:'q9',type:'choice',competencies:['READ_AUTHOR_INTENT'],difficulty:7,prompt:'Qu’est-ce que ce récit cherche surtout à montrer chez Ulysse ?',choices:['Que l’intelligence et la ruse peuvent triompher de la force brute','Qu’il faut toujours être le plus fort pour gagner','Qu’il vaut mieux abandonner face à un ennemi puissant'],ans:0,explanation:'Ulysse gagne par la ruse, jamais par la force physique.'},
    {id:'q10',type:'order',competencies:['READ_SEQUENCE'],difficulty:3,prompt:'Remets les événements dans l’ordre.',tokens:['Ulysse et ses hommes entrent dans la grotte','Le Cyclope les enferme à l’intérieur','Le Cyclope dévore deux compagnons','Ulysse crève l’œil du Cyclope endormi','Les Grecs s’échappent cachés sous les moutons'],ans:'Ulysse et ses hommes entrent dans la grotte Le Cyclope les enferme à l’intérieur Le Cyclope dévore deux compagnons Ulysse crève l’œil du Cyclope endormi Les Grecs s’échappent cachés sous les moutons',explanation:'C’est l’ordre exact du récit.'},
    {id:'q11',type:'choice',competencies:['READ_VOCAB_CONTEXT'],difficulty:2,prompt:'Dans le texte, que veut dire « ivre » ?',choices:['Avoir trop bu et ne plus bien se contrôler','Être très fatigué','Être en colère'],ans:0,explanation:'Voir le glossaire.'},
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
    {id:'q5',type:'choice',competencies:['READ_VOCAB_CONTEXT'],difficulty:2,prompt:'Dans le texte, « resplendissants » veut dire...',choices:['Qui brillent avec beaucoup d’éclat','Qui font beaucoup de bruit','Qui sont très grands'],ans:0,explanation:'Voir le glossaire.'},
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
    {id:'q6',type:'choice',competencies:['READ_VOCAB_CONTEXT'],difficulty:2,prompt:'Dans le texte, une « terreur glaciale » désigne...',choices:['Une peur très intense et froide','Une maladie grave','Une tempête de neige'],ans:0,explanation:'Voir le glossaire.'},
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
   glossary:[{word:'chapeau',definition:'Dans un article, le court texte qui résume l’information juste après le titre.'},{word:'initiative',definition:'Une action nouvelle que l’on décide de mettre en place soi-même.'}],
   questions:[
    {id:'q1',type:'choice',competencies:['READ_EXPLICIT'],difficulty:1,prompt:'Quel établissement est concerné par cet article ?',choices:['Le collège Jean-Moulin','L’école primaire Jean-Moulin','Le lycée Jean-Moulin'],ans:0,evidenceParagraph:0,explanation:'« Au collège Jean-Moulin... »'},
    {id:'q2',type:'choice',competencies:['READ_EXPLICIT'],difficulty:1,prompt:'Qui a mis en place ce projet de recyclage ?',choices:['Le club environnement des élèves','La mairie de la ville','Une entreprise privée'],ans:0,evidenceParagraph:0,explanation:'« ...un nouveau projet porté par le club environnement. »'},
    {id:'q3',type:'choice',competencies:['READ_DOCUMENT_SOURCE'],difficulty:3,prompt:'Dans cet article, qui est cité directement entre guillemets ?',choices:['Une élève (Léna) et le principal du collège','Seulement le principal','Seulement des chiffres officiels'],ans:0,evidenceParagraph:2,explanation:'Léna puis le principal sont cités chacun entre guillemets.'},
    {id:'q4',type:'choice',competencies:['READ_EXPLICIT'],difficulty:1,prompt:'Quelle quantité de papier a été collectée en trois mois ?',choices:['Plus de 200 kilogrammes','20 kilogrammes','2 tonnes'],ans:0,evidenceParagraph:2,explanation:'« ...nous avons déjà collecté plus de 200 kilogrammes de papier. »'},
    {id:'q5',type:'choice',competencies:['READ_CAUSE_CONSEQUENCE'],difficulty:4,prompt:'Que devient le papier collecté ?',choices:['Il est recyclé puis revient sous forme de cahiers de brouillon','Il est simplement jeté à la déchetterie','Il est vendu à d’autres écoles'],ans:0,evidenceParagraph:3,explanation:'« ...transformé en nouvelles feuilles... avant de revenir au collège sous forme de cahiers de brouillon. »'},
    {id:'q6',type:'choice',competencies:['READ_AUTHOR_INTENT'],difficulty:6,prompt:'Quel est le but principal de cet article ?',choices:['Informer sur une initiative écologique positive menée par des élèves','Dénoncer un problème de pollution au collège','Faire de la publicité pour une entreprise'],ans:0,explanation:'L’article présente un projet positif de façon informative.'},
    {id:'q7',type:'choice',competencies:['READ_VOCAB_CONTEXT'],difficulty:2,prompt:'Dans un article de presse, à quoi sert le « chapeau » (le texte juste après le titre) ?',choices:['À résumer rapidement l’information principale','À donner le nom du journaliste','À citer une source officielle'],ans:0,explanation:'Voir le glossaire.'},
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
    {id:'q8',type:'choice',competencies:['READ_VOCAB_CONTEXT'],difficulty:2,prompt:'Dans le texte, une « calèche » est...',choices:['Une voiture ancienne tirée par des chevaux, pour les gens aisés','Un type de soupe','Un vêtement d’hiver'],ans:0,explanation:'Voir le glossaire.'},
    {id:'q9',type:'choice',competencies:['READ_MAIN_IDEA'],difficulty:6,prompt:'Quel est le thème principal de ce texte ?',choices:['La misère sociale et les inégalités au XIXe siècle','Un conte merveilleux','Une aventure en mer'],ans:0,explanation:'C’est l’idée générale de tout le texte.'},
    {id:'q10',type:'order',competencies:['READ_SEQUENCE'],difficulty:3,prompt:'Remets les événements dans l’ordre.',tokens:['Marguerite fait la queue avec ses enfants','Un homme riche passe sans les regarder','Marguerite reçoit deux bols de soupe','Elle donne la soupe à ses enfants'],ans:'Marguerite fait la queue avec ses enfants Un homme riche passe sans les regarder Marguerite reçoit deux bols de soupe Elle donne la soupe à ses enfants',explanation:'C’est l’ordre exact du récit.'},
    {id:'q11',type:'evidence',competencies:['READ_JUSTIFY'],difficulty:6,prompt:'Quelle phrase montre concrètement la pauvreté de la famille de Marguerite ?',evidenceParagraph:4,explanation:'« ...cousait des journées entières pour un salaire qui ne suffisait jamais à nourrir trois bouches. »'},
    {id:'q12',type:'choice',competencies:['READ_ARGUMENT'],difficulty:7,prompt:'Pour dénoncer les inégalités sociales, quel argument peut-on tirer de l’épisode de la calèche ?',choices:['L’indifférence des plus riches aggrave la détresse des plus pauvres, qu’ils ne voient même plus','Les gens riches travaillent plus dur que les gens pauvres','Il faudrait interdire les calèches en ville'],ans:0,explanation:'Le texte met en scène cette indifférence comme un rouage de l’injustice sociale.'}
   ]
  }

 }
};
