/* Finot Académie — bibliothèque de lecture, vague 2 (collège, 24/10/2026). S'ajoute à window.MQ_READING.resources
   (data/reading/resources.js) sans rien retirer. Format et règles : docs/reading-system.md.
   Les helpers ci-dessous (K, ch, tx, od, ev, R) ne servent qu'à écrire les données de façon compacte : ils
   produisent exactement les objets décrits dans la documentation (champs choice/text/order/evidence). */
(function(){
'use strict';
if(!window.MQ_READING||!window.MQ_READING.resources)return;
var res=window.MQ_READING.resources;
var K={EX:'READ_EXPLICIT',CH:'READ_CHARACTER',PL:'READ_PLACE',TI:'READ_TIME',SQ:'READ_SEQUENCE',CC:'READ_CAUSE_CONSEQUENCE',
 VO:'READ_VOCAB_CONTEXT',RF:'READ_REFERENCE',IN:'READ_INFERENCE',EM:'READ_EMOTION_INTENTION',NP:'READ_NARRATOR_POV',
 MI:'READ_MAIN_IDEA',AI:'READ_AUTHOR_INTENT',JU:'READ_JUSTIFY',DS:'READ_DOCUMENT_SOURCE',AR:'READ_ARGUMENT',
 ST:'READ_STRUCTURE',GE:'READ_GENRE',CMP:'READ_COMPARE_DOCUMENTS'};
function ks(s){return String(s).split(',').map(function(x){return K[x];});}
function ch(id,k,d,prompt,choices,ans,e,exp){return {id:id,type:'choice',competencies:ks(k),difficulty:d,prompt:prompt,choices:choices,ans:ans,evidenceParagraph:e,explanation:exp};}
function tx(id,k,d,prompt,acc,e,exp){return {id:id,type:'text',competencies:ks(k),difficulty:d,prompt:prompt,acc:acc,evidenceParagraph:e,explanation:exp};}
function od(id,k,d,prompt,tokens,exp){return {id:id,type:'order',competencies:ks(k),difficulty:d,prompt:prompt,tokens:tokens,ans:tokens.join(' '),explanation:exp};}
function ev(id,k,d,prompt,e,exp){return {id:id,type:'evidence',competencies:ks(k),difficulty:d,prompt:prompt,evidenceParagraph:e,explanation:exp};}
/* Répartition déterministe de la bonne réponse des QCM à ≥ 3 choix : on fait pivoter les choix (ordre relatif
   conservé) pour que l'index de la bonne réponse varie d'une question à l'autre. Le moteur mélange de toute façon
   les choix à chaque session (MQReading.prepare) ; ceci garantit seulement une banque non dégénérée. */
function spread(o){
 var seed=0,n=0,i;for(i=0;i<o.id.length;i++)seed+=o.id.charCodeAt(i);
 o.questions.forEach(function(q){
  if(q.type!=='choice'||q.choices.length<3)return;
  var len=q.choices.length,tgt=(n++*2+seed)%len,r=(tgt-q.ans+len)%len,c=[];
  q.choices.forEach(function(x,j){c[(j+r)%len]=x;});
  q.choices=c;q.ans=tgt;
 });
}
function R(o){
 spread(o);
 var set={};o.questions.forEach(function(q){q.competencies.forEach(function(c){set[c]=1;});});
 var r={id:o.id,level:o.level,subject:'francais',type:o.type||'literary_text',documentType:o.documentType,
  title:o.title,author:o.author||null,work:o.work||null,sourceType:o.sourceType,chapterLinks:o.chapterLinks,
  competencies:Object.keys(set),difficulty:o.difficulty,estimatedReadingMinutes:o.minutes||3,
  audioMode:o.audioMode||'audioAllowed',sessionSize:o.sessionSize||8,paragraphs:o.paragraphs,glossary:o.glossary,
  questions:o.questions,sourceReference:o.sourceReference};
 if(o.teacherNotes)r.teacherNotes=o.teacherNotes;
 if(o.verse){r.verse=true;r.stanzas=o.stanzas;}
 res[o.id]=r;
}

/* ===== 6e ===== */

R({id:'fr_6e_velo_pronoms_01',level:'6e',documentType:'récit',title:'Le vélo de Sacha',sourceType:'original_mathquest',
 chapterLinks:['fr6m'],difficulty:4,minutes:3,
 sourceReference:'Texte original Finot Académie.',
 paragraphs:[
  'Sacha avait reçu un vélo rouge pour son anniversaire. Il l’avait attendu pendant des mois et il le rangeait chaque soir dans le garage avec soin.',
  'Un samedi, sa cousine Nora vint lui rendre visite. Elle lui demanda s’il voulait bien la laisser essayer le vélo.',
  'Sacha hésita. Il aimait beaucoup Nora, mais il craignait qu’elle ne le rende abîmé. « Je te le prête, dit-il enfin, à condition que tu fasses attention aux freins. Ils sont neufs et ils réagissent vite. »',
  'Nora promit. Elle enfila le casque de son cousin, qui lui allait un peu grand, et elle démarra prudemment dans l’allée. Sacha la regarda s’éloigner, les poings serrés dans les poches.',
  'Soudain, le vélo dérapa sur des gravillons et Nora tomba doucement dans l’herbe. Elle se releva en riant : elle n’avait aucun mal. Le garde-boue, lui, était tordu.',
  'Sacha courut vers elle. Il l’aida à se relever, puis il se pencha sur la roue avant. Il la redressa à la main, sans rien dire, et la fit tourner. Elle ne frottait plus.',
  '« Tu n’es pas fâché ? demanda Nora. — Non, répondit-il. Ce sont des choses qui arrivent. Mais la prochaine fois, je t’apprendrai à les éviter. »'
 ],
 glossary:[{word:'gravillons',definition:'De tout petits cailloux, comme ceux qui recouvrent une allée.'},{word:'dérapa',definition:'Glissa de côté sans pouvoir se contrôler.'},{word:'prudemment',definition:'Avec attention, en évitant les risques.'}],
 questions:[
  ch('q1','RF',3,'Dans « Il l’avait attendu pendant des mois », à quoi renvoie « l’ » ?',['Le garage','Le vélo rouge','L’anniversaire'],1,0,'« L’ » remplace « le vélo » : c’est le vélo que Sacha avait attendu. Le pronom est au masculin singulier, comme « vélo ».'),
  ch('q2','RF',3,'Dans « Elle lui demanda s’il voulait bien la laisser essayer le vélo », qui est « lui » ?',['Nora','Le vélo','Sacha'],2,1,'Nora (« elle ») parle à Sacha : « lui » désigne celui à qui elle s’adresse. « La » désigne Nora, celle qu’on laisse essayer.'),
  ch('q3','RF',4,'Dans « Je te le prête », « te » et « le » désignent, dans cet ordre :',['Nora puis le vélo','Le vélo puis Nora','Sacha puis le vélo'],0,2,'Sacha parle à Nora (« te ») et prête le vélo (« le »). On prête quelque chose à quelqu’un : « te » est la personne, « le » est l’objet.'),
  ch('q4','RF',4,'Dans « Ils sont neufs et ils réagissent vite », que remplace « Ils » ?',['Les freins','Les pneus','Sacha et Nora'],0,2,'La phrase d’avant parle des freins. Les freins sont neufs : le pronom « ils » reprend ce groupe nominal pluriel.'),
  ch('q5','RF',5,'Dans « le casque de son cousin, qui lui allait un peu grand », qui est « lui » ?',['Sacha','Le vélo','Nora'],2,3,'Le casque est celui de Sacha, mais c’est Nora qui l’enfile : il lui allait grand, à elle. Il faut relire toute la phrase pour savoir qui porte le casque.'),
  ev('q6','JU,IN',5,'Quel paragraphe montre que Nora n’est pas blessée par sa chute ?',4,'Le paragraphe 5 dit qu’elle se relève en riant et qu’elle « n’avait aucun mal ».'),
  tx('q7','EX',3,'Quel élément du vélo est tordu après la chute ? (deux mots)',['garde-boue','le garde-boue','garde boue','le garde boue'],4,'La dernière phrase du paragraphe 5 précise : « Le garde-boue, lui, était tordu. »'),
  ch('q8','IN,EM',5,'Pourquoi Sacha serre-t-il les poings dans ses poches quand Nora s’éloigne ?',['Il a froid','Il est inquiet pour son vélo','Il est en colère contre Nora'],1,3,'Il avait hésité à prêter son vélo et craignait qu’il soit abîmé. Ses poings serrés montrent son inquiétude, pas de la colère : il aime Nora.'),
  od('q9','SQ',3,'Remets les événements dans l’ordre.',['Sacha prête son vélo à Nora','Nora démarre dans l’allée','Le vélo dérape sur les gravillons','Sacha redresse la roue'],'L’ordre suit le récit : prêt, départ, chute, puis réparation de la roue.'),
  ch('q10','RF',6,'Dans « Il la redressa à la main… Elle ne frottait plus », qui est « Elle » dans la dernière phrase ?',['Nora','La roue','La main'],1,5,'Sacha redresse la roue puis la fait tourner : c’est la roue qui frottait avant et qui ne frotte plus. « Elle » reprend « la roue ».'),
  ch('q11','EM,IN',4,'Que montre la dernière réplique de Sacha ?',['Il lui pardonne et propose son aide','Il regrette de lui avoir prêté le vélo','Il ne lui prêtera plus jamais rien'],0,6,'Il répond « Non » à la question de Nora, accepte l’accident (« Ce sont des choses qui arrivent ») et promet de l’aider la prochaine fois.'),
  ch('q12','VO',3,'Dans « elle démarra prudemment », que signifie « prudemment » ?',['Très vite, sans regarder devant soi','En riant, comme pour s’amuser','Avec attention, sans prendre de risques'],2,3,'Prudemment vient de « prudent » : on avance en faisant attention. D’ailleurs Nora démarre « dans l’allée », doucement.')
 ]});

R({id:'fr_6e_petit_poucet_01',level:'6e',documentType:'conte',title:'Le Petit Poucet et les cailloux blancs',author:'Charles Perrault',work:'Histoires ou contes du temps passé (1697)',sourceType:'public_domain',
 chapterLinks:['fr6t'],difficulty:5,minutes:3,
 sourceReference:'Adaptation libre et abrégée pour la 6e du début du conte, d’après Charles Perrault (mort en 1703), dans le domaine public.',
 teacherNotes:'Texte propice à observer le passé simple (actions qui font avancer le récit) et l’imparfait (décors, portraits, habitudes).',
 paragraphs:[
  'Il était une fois un bûcheron et une bûcheronne qui avaient sept garçons. Le plus jeune, à peine plus grand qu’un pouce, était si petit qu’on l’appela le Petit Poucet. Il parlait peu, mais il écoutait tout.',
  'Une année, la récolte fut si mauvaise que la famille n’eut plus de quoi manger. Un soir, les parents, désespérés, décidèrent d’abandonner leurs enfants dans la forêt. Le Petit Poucet, caché sous un tabouret, entendit tout.',
  'Il passa la nuit à réfléchir. Le lendemain, il alla au bord d’un ruisseau et remplit ses poches de petits cailloux blancs.',
  'Quand le bûcheron entraîna les enfants dans la forêt, Poucet laissa tomber les cailloux, un à un, derrière lui. Le soir, les frères restèrent seuls, et la peur les saisit. Mais Poucet les rassura : les cailloux brillaient sous la lune et dessinaient le chemin.',
  'Ils rentrèrent à la maison au milieu de la nuit. Les parents, qui regrettaient déjà leur geste, les accueillirent avec joie.',
  'Mais la misère revint. Cette fois, Poucet ne put pas aller au ruisseau, car la porte était fermée à clé. Il émietta alors son pain et en sema les miettes sur le chemin.',
  'Hélas ! les oiseaux de la forêt mangèrent toutes les miettes. Les enfants se perdirent et marchèrent longtemps, puis ils finirent par apercevoir une petite lumière au loin.'
 ],
 glossary:[{word:'bûcheron',definition:'Homme dont le métier est de couper des arbres.'},{word:'récolte',definition:'Ce que l’on cueille ou que l’on ramasse dans les champs : blé, fruits, légumes.'},{word:'émietta',definition:'Réduisit en petits morceaux, en miettes.'}],
 questions:[
  ch('q1','EX,CH',2,'Combien de garçons ont le bûcheron et la bûcheronne ?',['Cinq','Sept','Douze'],1,0,'Le début du conte dit qu’ils avaient « sept garçons ».'),
  ch('q2','VO,CH',3,'Pourquoi appelle-t-on le plus jeune frère « le Petit Poucet » ?',['Parce qu’il portait toujours un chapeau pointu et rouge','Parce qu’il était le plus âgé et le plus fort des frères','Parce qu’il était à peine plus grand qu’un pouce'],2,0,'Le texte explique son surnom : il est « si petit » qu’on l’appelle ainsi.'),
  ch('q3','CC',3,'Pourquoi les parents décident-ils d’abandonner leurs enfants ?',['Parce qu’ils n’ont plus de quoi manger','Parce que les enfants ont désobéi à leur père','Parce qu’ils veulent déménager dans une autre ville'],0,1,'Ils sont « désespérés » par la misère : la mauvaise récolte les prive de nourriture.'),
  ch('q4','IN,CH',4,'Comment le Petit Poucet connaît-il le projet de ses parents ?',['Un voisin de passage le lui raconte','Il les écoute, caché sous un tabouret','Il le lit dans une lettre laissée sur la table'],1,1,'Il est « caché sous un tabouret » et « entendit tout ». Cela confirme que « il écoutait tout », annoncé dès le début.'),
  od('q5','SQ',3,'Remets les événements dans l’ordre du conte.',['Poucet entend ses parents','Poucet remplit ses poches de cailloux','Les enfants retrouvent la maison','Poucet sème des miettes de pain'],'Poucet entend d’abord le projet, ramasse les cailloux, retrouve la maison grâce à eux, puis sème des miettes la fois suivante.'),
  ch('q6','ST,GE',4,'Dans ce récit, à quoi servent surtout les verbes au passé simple (« il alla », « il remplit », « les oiseaux mangèrent ») ?',['À décrire le décor et les personnages','À raconter les actions qui se suivent','À exprimer des souhaits ou des regrets'],1,2,'Le passé simple présente des actions terminées, qui se suivent. L’imparfait, lui, décrit (« était si petit », « brillaient »).'),
  ch('q7','GE,VO',4,'Dans « Il parlait peu, mais il écoutait tout », l’imparfait sert à :',['Décrire une habitude du personnage','Raconter une action brève et terminée','Annoncer ce qui va arriver plus tard'],0,0,'Poucet est ainsi en général : l’imparfait décrit un trait de caractère, une habitude, pas un événement précis.'),
  ch('q8','CC',5,'Pourquoi les miettes de pain ne permettent-elles pas aux enfants de rentrer ?',['Elles étaient trop petites pour être vues','Les oiseaux les ont mangées','Le vent les a emportées'],1,6,'Le texte le dit : « les oiseaux de la forêt mangèrent toutes les miettes ». Les cailloux, eux, ne pouvaient pas être mangés.'),
  ev('q9','JU,CC',4,'Quel paragraphe explique pourquoi Poucet ne peut pas aller chercher des cailloux la seconde fois ?',5,'Le paragraphe 6 explique que « la porte était fermée à clé » : il utilise alors son pain.'),
  tx('q10','EX',3,'Quels petits objets blancs Poucet laisse-t-il tomber derrière lui la première fois ? (un mot)',['cailloux','des cailloux','les cailloux','cailloux blancs','petits cailloux'],3,'Il laisse tomber les cailloux blancs ramassés au bord du ruisseau, un à un.'),
  ch('q11','CH,IN',5,'Quel mot décrit le mieux le caractère du Petit Poucet ?',['Paresseux et très bavard','Peureux et très colérique','Ingénieux et attentif'],2,3,'Il écoute, réfléchit toute la nuit, trouve une ruse et rassure ses frères : il est inventif et attentif.'),
  ch('q12','VO',3,'Que signifie « désespérés » dans « les parents, désespérés » ?',['Très en colère contre leurs voisins','Qui ont perdu tout espoir','Très fatigués par le travail'],1,1,'« Dés-espérés » : ils n’espèrent plus rien. C’est leur détresse devant la misère qui les pousse à cette décision cruelle.')
 ]});

R({id:'fr_6e_nichoir_notice_01',level:'6e',type:'document',documentType:'document pratique (notice de fabrication)',title:'Fabriquer un nichoir pour les mésanges',sourceType:'original_mathquest',
 chapterLinks:['fr6u'],difficulty:4,minutes:3,audioMode:'audioOptional',
 sourceReference:'Document original Finot Académie. Cette fiche de club nature est imaginaire, écrite pour l’exercice.',
 paragraphs:[
  'Matériel : une planche de bois non traité de 15 mm d’épaisseur, une scie, de la colle à bois, une dizaine de petites vis, un tournevis et du papier de verre. Prévois un adulte pour utiliser la scie.',
  'Étape 1. Découpe six pièces dans la planche : un fond, deux côtés, une façade, un arrière et un toit plus large que le reste. Ponce chaque pièce pour enlever les bords rugueux.',
  'Étape 2. Perce un trou rond de 28 mm de diamètre dans la façade, à environ 12 cm du fond. Ce diamètre convient aux mésanges et empêche les oiseaux plus gros d’entrer. Ne mets surtout pas de perchoir : il aiderait les prédateurs.',
  'Étape 3. Assemble le fond, les côtés, la façade et l’arrière avec la colle, puis fixe-les avec les vis. Visse le toit en dernier, sans le coller, pour pouvoir ouvrir le nichoir et le nettoyer à l’automne.',
  'Étape 4. Accroche le nichoir à trois mètres de hauteur au moins, sur un tronc ou un mur, de préférence tourné vers l’est ou le sud-est. Évite le plein soleil de l’après-midi et les vents dominants.',
  'Conseils. Installe-le avant la fin de l’hiver. Ne le déplace jamais lorsqu’il est occupé. Ne mets ni graines ni nourriture dans le nichoir : les parents s’en chargent. Ne regarde pas dans le trou trop souvent : les oiseaux risqueraient d’abandonner leurs œufs.'
 ],
 glossary:[{word:'Ponce',definition:'Poncer, c’est frotter le bois avec du papier de verre pour le rendre lisse.'},{word:'diamètre',definition:'Largeur d’un cercle, mesurée en passant par son centre.'},{word:'prédateurs',definition:'Animaux qui chassent d’autres animaux pour s’en nourrir.'}],
 questions:[
  ch('q1','EX',2,'Pour quelle tâche faut-il l’aide d’un adulte ?',['Pour percer le trou de la façade','Pour utiliser la scie','Pour visser le toit du nichoir'],1,0,'La liste du matériel précise : « Prévois un adulte pour utiliser la scie. »'),
  tx('q2','EX',2,'Quel diamètre doit avoir le trou de la façade ? (un nombre)',['28','28 mm','28 millimètres'],2,'L’étape 2 demande « un trou rond de 28 mm de diamètre ».'),
  ch('q3','CC',4,'Pourquoi le trou ne doit-il mesurer que 28 mm ?',['Pour laisser entrer plus de lumière à l’intérieur','Pour que seuls les petits oiseaux puissent entrer','Pour que l’air circule mieux dans le nichoir'],1,2,'Le texte le dit : ce diamètre « convient aux mésanges et empêche les oiseaux plus gros d’entrer ».'),
  ch('q4','CC',4,'Pourquoi ne faut-il pas mettre de perchoir devant le trou ?',['Il rendrait le nichoir trop lourd','Il gênerait la pose du toit','Il aiderait les prédateurs'],2,2,'La consigne est justifiée par la fin de la phrase : un perchoir « aiderait les prédateurs » à approcher des oisillons.'),
  ch('q5','CC',4,'Pourquoi le toit est-il vissé sans être collé ?',['Pour pouvoir l’ouvrir et le nettoyer','Pour économiser de la colle et du temps','Pour que l’eau de pluie puisse s’évacuer'],0,3,'Il faut pouvoir nettoyer le nichoir « à l’automne » : un toit collé ne s’ouvrirait pas.'),
  od('q6','SQ',3,'Remets les opérations dans l’ordre de la notice.',['Poncer les pièces','Percer le trou de la façade','Assembler et visser','Accrocher le nichoir'],'La notice suit les étapes 1 à 4 : découper et poncer, percer, assembler, installer.'),
  ch('q7','GE,AI',3,'Quel est le but de ce document ?',['Raconter la vie des mésanges au fil des saisons','Expliquer comment fabriquer un nichoir','Convaincre les lecteurs de ne plus couper d’arbres'],1,0,'C’est une notice : elle liste le matériel, donne des étapes et des conseils pour réaliser un objet.'),
  ev('q8','JU,EX',4,'Quel paragraphe indique comment orienter le nichoir ?',4,'L’orientation (est ou sud-est) et la hauteur sont donnés à l’étape 4, au paragraphe 5.'),
  ch('q9','CC,IN',5,'Pourquoi ne faut-il pas regarder trop souvent dans le trou ?',['Le trou deviendrait trop large avec le temps','Les oiseaux pourraient abandonner leurs œufs','Le bois du nichoir finirait par s’user vite'],1,5,'Les dérangements répétés peuvent effrayer les parents. Le conditionnel « risqueraient » exprime ce danger possible.'),
  ch('q10','VO',3,'Que signifie « rugueux » dans « les bords rugueux » ?',['Très pointus et dangereux','Trop humides après la pluie','Pas lisses, qui accrochent'],2,1,'Si on doit poncer, c’est pour supprimer ce qui accroche : les bords bruts de la planche sont rugueux.'),
  ch('q11','GE',4,'Pourquoi les verbes « découpe », « perce », « assemble » sont-ils à l’impératif ?',['Pour donner des consignes','Pour raconter ce qui s’est passé','Pour décrire un paysage de campagne'],0,1,'Dans une notice, l’impératif sert à demander d’agir, étape après étape.'),
  ch('q12','IN',5,'Que peut-on déduire de « Ne mets ni graines ni nourriture dans le nichoir : les parents s’en chargent » ?',['Les parents nourrissent leurs petits','Il faut nourrir les oiseaux chaque jour','Les mésanges mangent le bois du nichoir'],0,5,'Les « parents » s’occupent de la nourriture des petits : le lecteur n’a pas à le faire à leur place.')
 ]});

R({id:'fr_6e_marche_description_01',level:'6e',documentType:'description',title:'Le marché du samedi',sourceType:'original_mathquest',
 chapterLinks:['fr6l','fr6x'],difficulty:4,minutes:3,
 sourceReference:'Texte original Finot Académie.',
 paragraphs:[
  'Le samedi matin, la place du village se transforme. Dès huit heures, des camionnettes blanches aux portières rouillées se rangent le long de la fontaine, et les marchands déploient leurs grandes bâches rayées.',
  'Les odeurs arrivent avant les couleurs. Celle du pain chaud flotte près du camion du boulanger, mêlée au parfum sucré des melons mûrs et à l’odeur piquante des oignons nouveaux.',
  'Sur l’étal de Mme Lopez, les tomates rondes et luisantes forment des pyramides parfaites. À côté, des bottes de radis rose vif sont posées sur un lit de feuilles humides.',
  'Plus loin, un vieux fromager à la moustache blanche tend une fine tranche de fromage aux clients qui hésitent. Il crie, d’une voix grave et rieuse : « Goûtez, goûtez, ça ne coûte rien ! »',
  'Dans la foule, les paniers en osier se frôlent. Une petite fille tire sa grand-mère par la manche pour lui montrer un stand de bonbons multicolores.',
  'Vers midi, les marchands rangent leurs cagettes vides, balaient les épluchures et plient lentement les bâches. La place retrouve son calme, et il ne reste de la fête que l’odeur des fruits écrasés.'
 ],
 glossary:[{word:'étal',definition:'Table ou comptoir sur lequel un marchand présente ses produits.'},{word:'bâches',definition:'Grandes toiles imperméables qui servent de toit.'},{word:'osier',definition:'Branche souple d’un arbre, qui sert à tresser des paniers.'},{word:'cagettes',definition:'Petites caisses légères, en bois ou en plastique, pour transporter des fruits et légumes.'}],
 questions:[
  tx('q1','EX,TI',2,'À quelle heure les camionnettes arrivent-elles sur la place ? (nombre et mot « heures »)',['huit heures','8 heures','8h','8 h','dès huit heures'],0,'Le texte précise : « Dès huit heures ».'),
  ch('q2','ST',4,'Comment cette description est-elle organisée ?',['Elle compare le marché à une grande école de village','Elle raconte une dispute entre deux clients mécontents','Elle suit la matinée, du début au rangement'],2,5,'Le début montre l’installation, le milieu l’animation, la fin le rangement vers midi : l’ordre est celui du temps.'),
  ch('q3','EX,ST',3,'Quel sens le paragraphe 2 mobilise-t-il d’abord ?',['La vue','L’odorat','Le toucher'],1,1,'Il est question d’« odeurs » : pain chaud, melons mûrs, oignons. L’auteur fait sentir le marché avant de le montrer.'),
  ch('q4','EX',3,'Comment sont décrites les tomates de Mme Lopez ?',['Rondes et luisantes','Vertes et un peu molles','Petites et très abîmées'],0,2,'Le texte écrit « les tomates rondes et luisantes » : deux adjectifs qui enrichissent le groupe nominal.'),
  ch('q5','ST,VO',4,'Dans « un vieux fromager à la moustache blanche », à quoi sert « à la moustache blanche » ?',['À indiquer le lieu où se trouve le fromager','À préciser et à faire voir le fromager','À raconter l’action que fait le fromager'],1,3,'Ce complément du nom apporte un détail visuel : il aide à imaginer le personnage.'),
  ev('q6','JU,EX',4,'Quel paragraphe fait entendre la voix d’un marchand ?',3,'Au paragraphe 4, le fromager crie : « Goûtez, goûtez, ça ne coûte rien ! »'),
  ch('q7','AI,IN',5,'Quel est le but principal de l’auteur ?',['Faire voir, sentir et entendre le marché','Convaincre le lecteur d’acheter des tomates','Raconter une dispute entre deux marchands'],0,1,'Le texte multiplie les sensations (odeurs, couleurs, voix) pour faire vivre la scène au lecteur.'),
  ch('q8','IN,EM',5,'Quelle ambiance se dégage du marché ?',['Triste et silencieuse','Animée et chaleureuse','Tendue et dangereuse'],1,4,'La foule, les voix rieuses, les bonbons multicolores et le mot « fête » montrent une ambiance joyeuse.'),
  ch('q9','IN,AI',6,'Pourquoi l’auteur parle-t-il de « fête » dans la dernière phrase ?',['Les marchands y fêtent chacun leur anniversaire','Le marché est un moment joyeux pour le village','La fête du village a été interdite par la mairie'],1,5,'« Il ne reste de la fête… » est une façon imagée de dire que le marché était un moment de plaisir partagé.'),
  ch('q10','VO',3,'Que signifie « étal » dans « Sur l’étal de Mme Lopez » ?',['Un camion qui livre les produits au marché','Un panier en osier que l’on porte au bras','Une table où l’on présente les produits'],2,2,'Les tomates y forment des pyramides : c’est donc le support de présentation.'),
  ch('q11','VO',4,'Que veut dire « se frôlent » dans « les paniers en osier se frôlent » ?',['Ils se touchent à peine','Ils se heurtent violemment','Ils tombent par terre'],0,4,'La foule est dense : on passe tout près des autres, on se touche à peine.'),
  od('q12','SQ',3,'Remets ces moments dans l’ordre du texte.',['Les marchands installent leurs bâches','Les odeurs se répandent sur la place','Le fromager offre une tranche','Les marchands rangent leurs cagettes'],'Le texte suit la matinée : installation, odeurs, animation, puis rangement vers midi.')
 ]});

R({id:'fr_6e_castors_resume_01',level:'6e',type:'document',documentType:'texte documentaire',title:'Le castor, bâtisseur de rivières',sourceType:'original_mathquest',
 chapterLinks:['fr6y'],difficulty:5,minutes:3,
 sourceReference:'Texte documentaire original Finot Académie.',
 paragraphs:[
  'Le castor d’Europe est le plus gros rongeur du continent : adulte, il pèse une vingtaine de kilos. Il vit près des rivières calmes, où il mange surtout des écorces, des feuilles et des plantes aquatiques.',
  'Ses quatre dents de devant, les incisives, ne cessent jamais de pousser. Pour les user, il ronge sans cesse du bois. En quelques nuits, un castor peut abattre un jeune arbre en le grignotant tout autour du tronc.',
  'Avec ces troncs et ces branches, la famille construit un barrage en travers du ruisseau. Derrière lui, l’eau monte et forme un étang. Le niveau reste ainsi à peu près stable, même en été.',
  'Au bord de l’étang, les castors aménagent une hutte dont l’entrée est cachée sous l’eau. Les prédateurs, comme le loup, ont ainsi beaucoup de mal à y pénétrer.',
  'Cet étang profite à de nombreuses espèces. Des grenouilles, des libellules, des poissons et des oiseaux d’eau y trouvent un abri ou de la nourriture. C’est pourquoi on dit parfois que le castor « fabrique » de la biodiversité.',
  'Mais son travail n’est pas toujours bien accueilli. Un barrage peut inonder des champs voisins, et les arbres abattus gênent certains propriétaires. Dans plusieurs régions, on cherche donc des solutions pour que les humains et les castors puissent cohabiter.'
 ],
 glossary:[{word:'rongeur',definition:'Mammifère aux dents de devant très solides, qui servent à ronger, comme le rat ou l’écureuil.'},{word:'incisives',definition:'Dents plates de devant, qui servent à couper.'},{word:'barrage',definition:'Construction qui arrête l’eau d’un cours d’eau.'},{word:'biodiversité',definition:'Variété des êtres vivants (animaux, plantes…) dans un milieu.'}],
 questions:[
  ch('q1','MI',4,'Quelle est l’idée principale du texte ?',['Le castor est le plus gros animal d’Europe et il vit dans l’eau','Le castor mange uniquement du bois et détruit toutes les forêts','Le castor transforme son milieu : c’est utile, mais cela peut gêner'],2,5,'Le texte montre ce que construit le castor (barrage, étang, hutte), ses bénéfices pour d’autres espèces, puis les difficultés avec les humains.'),
  ch('q2','EX',2,'De quoi le castor se nourrit-il surtout ?',['De petits poissons pêchés dans la rivière','D’insectes et de vers trouvés dans la terre','D’écorces, de feuilles et de plantes'],2,0,'La fin du premier paragraphe énumère son alimentation.'),
  ch('q3','CC',4,'Pourquoi le castor ronge-t-il du bois sans cesse ?',['Pour user ses incisives qui poussent toujours','Pour récupérer du bois afin de fabriquer du papier','Parce qu’il a toujours très faim d’écorce fraîche'],0,1,'« Ses quatre dents de devant ne cessent jamais de pousser » : ronger les use et les garde à bonne longueur.'),
  ch('q4','CC',4,'À quoi sert le barrage construit par les castors ?',['À pêcher plus facilement les poissons','À faire monter l’eau et former un étang','À traverser la rivière sans se mouiller'],1,2,'« Derrière lui, l’eau monte et forme un étang. » Le niveau reste stable, même en été.'),
  ch('q5','CC,IN',5,'Pourquoi l’entrée de la hutte est-elle cachée sous l’eau ?',['Pour protéger la famille des prédateurs','Pour garder la hutte au chaud en hiver','Pour mieux voir passer les poissons'],0,3,'Les prédateurs « ont beaucoup de mal à y pénétrer » : l’entrée immergée protège la famille.'),
  ev('q6','JU,MI',4,'Quel paragraphe présente les problèmes causés par les castors ?',5,'Le dernier paragraphe commence par « Mais » et évoque les champs inondés et les arbres abattus.'),
  ch('q7','MI',5,'Quel est le meilleur résumé du paragraphe 5 ?',['Le castor mange des grenouilles, des libellules et des poissons','L’étang du castor nourrit et abrite beaucoup d’espèces','Les oiseaux d’eau construisent eux-mêmes de grands étangs'],1,4,'Un bon résumé garde l’idée essentielle (l’étang profite à d’autres espèces) sans la liste complète des animaux.'),
  ch('q8','MI,ST',6,'Quel résumé de tout le texte est le meilleur ?',['Le castor construit des barrages qui créent des étangs utiles à beaucoup d’espèces, mais qui peuvent gêner les humains.','Le castor ronge du bois pour user ses dents, qui ne cessent jamais de pousser, et il abat des arbres.','Les castors habitent dans les rivières d’Europe, mangent des plantes et vivent en famille dans une hutte.'],0,5,'Les deux autres résumés sont trop partiels. Le bon résumé relie les constructions, leurs bienfaits et leurs inconvénients.'),
  tx('q9','EX',3,'Comment s’appellent les quatre dents de devant du castor ?',['incisives','les incisives'],1,'Le paragraphe 2 les nomme : « les incisives ».'),
  ch('q10','ST',5,'Comment le texte est-il organisé ?',['Il raconte une journée de castor, de l’aube au coucher du soleil','Il oppose le castor à d’autres rongeurs, du plus petit au plus gros','Il présente l’animal, ses constructions, puis leurs effets'],2,0,'On passe de la présentation du castor à ses constructions, aux espèces qui en profitent, puis aux problèmes.'),
  ch('q11','VO',3,'Que signifie « cohabiter » dans la dernière phrase ?',['Se battre pour partager un territoire','Vivre ensemble au même endroit','Se déplacer ensemble sur de longues distances'],1,5,'Le préfixe « co- » indique « avec » : humains et castors doivent partager les mêmes espaces.'),
  ch('q12','AI',5,'Quelle est l’intention de l’auteur ?',['Convaincre les lecteurs de chasser les castors','Amuser les lecteurs avec une histoire drôle','Informer en montrant le pour et le contre'],2,5,'Le ton est neutre : il décrit, explique et présente les deux côtés (« Mais… »), sans prendre parti.'),
  ch('q13','RF',4,'Dans « Pour les user, il ronge sans cesse du bois », que remplace « les » ?',['Les incisives','Les arbres du bord de l’étang','Les branches du barrage'],0,1,'On use ses dents : « les » reprend « les incisives », qui viennent d’être citées.')
 ]});

R({id:'fr_6e_debat_cantine_01',level:'6e',type:'document',documentType:'transcription de débat (imaginaire)',title:'Débat en classe : peser les restes à la cantine ?',sourceType:'original_mathquest',
 chapterLinks:['fr6z'],difficulty:5,minutes:3,
 sourceReference:'Document original Finot Académie. Le débat, les élèves et les chiffres cités sont imaginaires, inventés pour l’exercice.',
 paragraphs:[
  'Débat de la classe de 6eB — sujet : « Faut-il peser les restes de la cantine pour lutter contre le gaspillage ? » Anaïs mène le débat. Chacun parle à son tour, sans interrompre.',
  'Samir (pour). — Je pense qu’il faut peser les restes. Pour commencer, on verrait enfin combien de nourriture part à la poubelle. Ensuite, quand on voit un chiffre, on fait plus attention. Par exemple, la semaine dernière, notre classe a jeté trois kilos de pain.',
  'Léna (contre). — Je ne suis pas d’accord avec Samir. Peser, c’est bien, mais on risque d’embarrasser ceux qui n’ont pas faim. Quelqu’un qui laisse un yaourt peut se sentir montré du doigt.',
  'Samir. — Je comprends ton inquiétude, Léna, mais on ne donnerait que le poids de toute la classe, pas celui de chaque élève. Personne ne serait nommé.',
  'Anaïs (animatrice). — Merci. Ahmed, tu voulais ajouter quelque chose ?',
  'Ahmed (pour). — Oui. Je propose une solution : chacun se sert lui-même, en petite quantité, avec le droit de se resservir. Comme cela, on prend moins de nourriture au départ et on garde le plaisir de choisir.',
  'Léna. — Cette idée me plaît davantage. Je suis prête à accepter la pesée si on ne montre que le total de la classe.',
  'Anaïs. — Nous avons donc un accord : peser les restes de la classe entière et laisser chacun se resservir. Êtes-vous tous d’accord avec ce résumé ?'
 ],
 glossary:[{word:'gaspillage',definition:'Fait de jeter ou de perdre ce qui aurait pu servir.'},{word:'embarrasser',definition:'Mettre mal à l’aise, gêner.'},{word:'animatrice',definition:'Personne qui dirige un échange et donne la parole.'}],
 questions:[
  ch('q1','EX,CH',2,'Qui anime le débat ?',['Léna','Ahmed','Anaïs'],2,0,'Le premier paragraphe dit : « Anaïs mène le débat. »'),
  ch('q2','AR,CH',3,'Quelle est la position de Samir au début du débat ?',['Il est pour la pesée','Il est contre la pesée des restes','Il n’a pas encore d’avis sur le sujet'],0,1,'Samir est indiqué « pour » et commence par « Je pense qu’il faut peser les restes ».'),
  ch('q3','AR',4,'Quel argument Léna oppose-t-elle à la pesée ?',['Elle coûte trop cher pour le budget du collège','Elle peut mettre des élèves mal à l’aise','Elle prend trop de temps pendant le repas'],1,2,'Elle craint qu’un élève qui laisse un yaourt « se sente montré du doigt ».'),
  ch('q4','AR,EX',4,'Quel exemple Samir donne-t-il pour appuyer son idée ?',['Dix repas gaspillés chaque jour dans le collège','Un yaourt laissé par Léna au dernier repas','Trois kilos de pain jetés en une semaine'],2,1,'Il dit : « la semaine dernière, notre classe a jeté trois kilos de pain. » Un exemple chiffré rend l’argument plus fort.'),
  ch('q5','AR,ST',5,'Dans la première prise de parole de Samir, « Pour commencer », « Ensuite », « Par exemple » servent à :',['Insulter les autres élèves','Poser une question au public','Organiser les arguments'],2,1,'Ces connecteurs structurent le discours : un premier argument, un deuxième, puis une illustration.'),
  ch('q6','AR,EM',5,'Comment Samir répond-il à l’objection de Léna ?',['Il propose de ne donner que le poids de toute la classe','Il refuse de l’écouter','Il change de sujet'],0,3,'Il prend en compte la crainte de Léna et ajuste sa proposition : « Personne ne serait nommé. »'),
  ch('q7','EM,AR',4,'Pourquoi Samir commence-t-il par « Je comprends ton inquiétude » ?',['Pour se moquer gentiment de Léna','Pour couper la parole à Anaïs','Pour montrer qu’il l’écoute'],2,3,'Reconnaître le point de vue de l’autre rend le débat plus respectueux et la réponse plus convaincante.'),
  ev('q8','JU,AR',4,'Quel paragraphe contient la proposition d’Ahmed ?',5,'Ahmed propose que chacun se serve lui-même et puisse se resservir, au paragraphe 6.'),
  ch('q9','IN,CC',5,'Pourquoi Léna accepte-t-elle finalement la pesée ?',['Parce qu’elle a hâte de passer à table','Parce que Samir a fini par la menacer','Parce que seul le total sera montré'],2,6,'Sa crainte était d’exposer un élève ; avec un total pour toute la classe, ce problème disparaît.'),
  ch('q10','MI',5,'Quel est l’accord trouvé à la fin ?',['Peser le plateau de chaque élève séparément','Supprimer la cantine pour limiter le gaspillage','Peser les restes de la classe et se resservir'],2,7,'Anaïs résume l’accord : pesée collective et possibilité de se resservir.'),
  od('q11','SQ,ST',3,'Remets les prises de parole dans l’ordre.',['Samir donne son avis','Léna fait une objection','Ahmed propose une solution','Anaïs résume l’accord'],'Le débat suit un chemin classique : avis, objection, solution, puis conclusion de l’animatrice.'),
  ch('q12','DS,GE',3,'Quelle règle de prise de parole est rappelée au début ?',['Parler à son tour, sans interrompre','Parler le plus fort possible pour être entendu','Ne jamais contredire un camarade du groupe'],0,0,'La première phrase du texte la donne : « Chacun parle à son tour, sans interrompre. »'),
  ch('q13','VO',4,'Que signifie « embarrasser » dans « embarrasser ceux qui n’ont pas faim » ?',['Féliciter devant toute la classe','Mettre mal à l’aise','Aider à finir son assiette'],1,2,'Léna craint que ceux qui laissent leur assiette soient gênés d’être remarqués.')
 ]});

R({id:'fr_6e_racines_mots_01',level:'6e',type:'document',documentType:'texte documentaire',title:'Quand les mots racontent leur histoire',sourceType:'original_mathquest',
 chapterLinks:['fr6v'],difficulty:5,minutes:3,
 sourceReference:'Texte documentaire original Finot Académie.',
 paragraphs:[
  'Beaucoup de mots français ont une histoire. Ils sont construits à partir de racines, c’est-à-dire de petits morceaux venus du latin ou du grec qui gardent leur sens d’origine.',
  'Prenons « télévision ». Le morceau « télé » vient du grec et signifie « loin » ; « vision » vient du latin et signifie « action de voir ». Une télévision, c’est donc, à l’origine, un appareil pour voir de loin.',
  'Même méthode avec « thermomètre » : « thermo » vient du grec et signifie « chaleur », tandis que « mètre » signifie « mesure ». Un thermomètre mesure donc la chaleur, ou plus exactement la température. On retrouve « thermo » dans « thermique ».',
  'Les préfixes et les suffixes changent aussi le sens. Avec « re- », on exprime la répétition : refaire, relire. Avec « in- » ou « im- », on exprime le contraire : impossible, inutile. Le suffixe « -eur » désigne souvent la personne qui agit : un chanteur, un coiffeur.',
  'Connaître ces morceaux est utile pour deviner un mot nouveau. Si tu lis « aquarium », tu peux penser à « aqua », l’eau en latin, comme dans « aquatique ». Mais attention : cette méthode ne fonctionne pas toujours, car certains mots ont changé de sens avec le temps. Vérifie alors dans un dictionnaire.',
  'Les mots de la même famille partagent une racine : « terre », « terrain », « territoire », « enterrer ». Les repérer aide aussi à mieux écrire : ils s’écrivent avec la même base, comme « terre » et « terrasse », qui gardent leurs deux « r ».'
 ],
 glossary:[{word:'racines',definition:'Dans un mot, petits morceaux venus du latin ou du grec qui gardent leur sens d’origine.'},{word:'préfixes',definition:'Petits morceaux placés avant le mot de base (re-, in-…).'},{word:'suffixes',definition:'Petits morceaux placés après le mot de base (-eur, -tion…).'},{word:'dictionnaire',definition:'Livre qui explique le sens des mots et leur orthographe.'}],
 questions:[
  ch('q1','MI',4,'Quelle est l’idée principale du texte ?',['Connaître la construction des mots aide à les comprendre','Le latin est une langue plus utile que le grec','Les dictionnaires contiennent toujours des erreurs'],0,0,'Le texte explique les racines, les préfixes et les suffixes puis montre à quoi cela sert : deviner un mot et mieux l’écrire.'),
  tx('q2','EX',2,'Que signifie le morceau « télé » ? (un mot)',['loin'],1,'Le texte dit : « télé » vient du grec et signifie « loin ».'),
  ch('q3','EX',2,'Que signifie « thermo » ?',['Mesure','Froid','Chaleur'],2,2,'« Thermo » signifie « chaleur » ; « mètre » signifie « mesure ».'),
  ch('q4','EX',3,'Quel préfixe exprime la répétition ?',['in-','re-','-eur'],1,3,'Avec « re- », on refait, on relit : on répète l’action. « in- » exprime le contraire, « -eur » désigne une personne.'),
  ch('q5','IN',5,'D’après le texte, que signifie probablement « imbuvable » ?',['Qu’on ne peut pas boire','Qu’on boit sans cesse','Qui boit beaucoup d’eau'],0,3,'Avant un mot commençant par b, « in- » devient « im- » et exprime le contraire : imbuvable, c’est « qu’on ne peut pas boire ».'),
  ch('q6','IN',4,'Un « nageur » est probablement :',['Un lieu où l’on nage','Une personne qui nage','Un objet qui sert à nager'],1,3,'Le suffixe « -eur » désigne souvent la personne qui fait l’action : chanteur, coiffeur, nageur.'),
  ch('q7','CC,IN',5,'Pourquoi le texte conseille-t-il de vérifier dans un dictionnaire ?',['Parce que le latin est interdit à l’école','Parce que certains mots ont changé de sens','Parce que les racines sont souvent fausses'],1,4,'Deviner par les racines est une bonne méthode, mais le sens actuel d’un mot peut avoir évolué : on vérifie.'),
  ch('q8','RF',4,'Dans « ils s’écrivent avec la même base », que remplace « ils » ?',['Les élèves de la classe','Les dictionnaires de la classe','Les mots de la famille'],2,5,'La phrase précédente parle des mots de la même famille, qui partagent une racine.'),
  ch('q9','ST,GE',4,'À quoi servent les guillemets autour de « télévision » ou « thermo » ?',['À marquer un dialogue entre deux personnes','À montrer qu’on parle du mot','À se moquer de celui qui parle'],1,1,'Quand on parle d’un mot ou d’un morceau de mot, on le met entre guillemets pour le distinguer du reste de la phrase.'),
  ev('q10','JU,ST',4,'Quel paragraphe donne l’exemple d’une famille de mots ?',5,'Le dernier paragraphe cite terre, terrain, territoire, enterrer, terrasse.'),
  od('q11','SQ,ST',3,'Remets ces parties du texte dans l’ordre.',['Définition des racines','Le mot télévision','Le mot thermomètre','Les préfixes et suffixes'],'Le texte commence par définir les racines, puis donne deux exemples, avant de passer aux préfixes et suffixes.'),
  ch('q12','VO',3,'Dans ce texte, que désigne le mot « racines » ?',['La partie d’une plante qui est sous la terre','Des morceaux de mots qui gardent un sens','Les ancêtres d’une grande famille de rois'],1,0,'Le texte donne lui-même la définition : « c’est-à-dire de petits morceaux venus du latin ou du grec ». C’est un sens figuré.'),
  ch('q13','IN',5,'En t’appuyant sur « aqua », que peut signifier « aquatique » ?',['Qui concerne le feu','Qui concerne l’air','Qui concerne l’eau'],2,4,'« Aqua » veut dire « eau » en latin : un animal aquatique vit dans l’eau.')
 ]});

R({id:'fr_6e_musiciens_breme_01',level:'6e',documentType:'conte',title:'Les musiciens de Brême',author:'Frères Grimm',work:'Contes de l’enfance et du foyer (1812)',sourceType:'public_domain',
 chapterLinks:['fr6x'],difficulty:5,minutes:3,
 sourceReference:'Adaptation libre et abrégée pour la 6e, d’après le conte des frères Grimm (morts en 1859 et 1863), dans le domaine public — aucune traduction existante reprise.',
 teacherNotes:'Modèle de récit à structure claire (situation initiale, élément déclencheur, péripéties, dénouement) à imiter pour écrire un récit.',
 paragraphs:[
  'Un âne avait travaillé toute sa vie pour un meunier, mais, devenu vieux, il n’avait plus la force de porter les sacs. Son maître songea à s’en débarrasser. L’âne devina ses intentions et partit un matin vers la ville de Brême, où il comptait devenir musicien.',
  'Sur la route, il croisa un chien de chasse qui geignait au bord du chemin. « Que t’arrive-t-il ? demanda l’âne. — Je suis trop vieux pour courir après le gibier, répondit le chien, et mon maître veut me faire disparaître. Je me suis enfui. — Viens avec moi à Brême, proposa l’âne. Tu battras du tambour et moi, je jouerai du luth. »',
  'Un peu plus loin, ils rencontrèrent un chat à la mine triste. Trop âgé pour attraper les souris, il avait été chassé de chez lui. Il accepta de les suivre, car il savait chanter la nuit. Enfin, dans une cour de ferme, ils virent un coq qui criait de toutes ses forces : la fermière comptait le mettre à la soupe pour le dîner du dimanche.',
  'Les quatre compagnons marchèrent jusqu’au soir. Comme la ville était encore loin, ils s’arrêtèrent dans la forêt. Du haut d’un arbre, le coq aperçut une lumière. C’était une maison où des voleurs, attablés devant un grand repas, comptaient leur butin.',
  'Les animaux tinrent conseil. Ils se montèrent les uns sur les autres sous la fenêtre : l’âne en bas, le chien sur son dos, le chat sur celui du chien et le coq tout en haut. Au signal, tous chantèrent ensemble : l’âne brailla, le chien aboya, le chat miaula, le coq chanta.',
  'Les voleurs, terrifiés par ce vacarme, crurent à un fantôme et s’enfuirent dans la forêt. Les quatre amis s’installèrent à table et mangèrent à leur faim. Ils n’allèrent jamais à Brême : ils avaient trouvé mieux que la gloire, une maison où vivre ensemble.'
 ],
 glossary:[{word:'meunier',definition:'Personne qui transforme le grain en farine dans un moulin.'},{word:'geignait',definition:'Se plaignait d’une voix faible et plaintive.'},{word:'butin',definition:'Ce qu’on a volé ou pris de force.'},{word:'brailla',definition:'Cria très fort et sans grâce (se dit de l’âne ou d’une personne).'},{word:'vacarme',definition:'Grand bruit désagréable.'}],
 questions:[
  ch('q1','CC,CH',2,'Pourquoi l’âne quitte-t-il son maître ?',['Parce que son maître veut se débarrasser de lui','Parce qu’il a gagné une grosse somme au jeu','Parce qu’il veut enfin voir la mer de près'],0,0,'Devenu vieux, l’âne ne peut plus porter les sacs ; il devine que son maître veut se débarrasser de lui.'),
  od('q2','SQ',3,'Remets dans l’ordre ce qui arrive aux compagnons.',['L’âne rencontre le chien','Le chat se joint à eux','Ils rencontrent le coq','Les quatre voient une lumière dans la forêt'],'Le récit suit l’ordre des rencontres : chien, chat, coq, puis la lumière dans la forêt le soir.'),
  ch('q3','CC',3,'Pourquoi le chien s’est-il enfui ?',['Il avait trop faim et cherchait de la viande','Il était trop vieux pour chasser','Il avait volé un os dans la cuisine'],1,1,'Il dit : « Je suis trop vieux pour courir après le gibier, et mon maître veut me faire disparaître. »'),
  ch('q4','CC',3,'Pourquoi le chat a-t-il été chassé de chez lui ?',['Il ne savait plus attraper les souris','Il avait mangé le poisson du dîner','Il griffait les enfants de la maison'],0,2,'Le texte dit : « Trop âgé pour attraper les souris, il avait été chassé de chez lui. »'),
  ch('q5','CC,EM',4,'Pourquoi le coq crie-t-il de toutes ses forces ?',['Il aime chanter à tue-tête le matin','Il sait qu’on veut le mettre à la soupe','Il appelle l’âne pour qu’il vienne l’aider'],1,2,'Il crie de peur : la fermière « comptait le mettre à la soupe pour le dîner du dimanche ».'),
  ch('q6','PL',2,'Où les quatre compagnons s’arrêtent-ils pour la nuit ?',['Dans la ville de Brême','Au bord de la mer','Dans la forêt'],2,3,'La ville était loin : « ils s’arrêtèrent dans la forêt ».'),
  ev('q7','JU,SQ',4,'Quel paragraphe explique comment les animaux se placent pour effrayer les voleurs ?',4,'Au paragraphe 5, ils se montent les uns sur les autres sous la fenêtre.'),
  ch('q8','CC',4,'Pourquoi les voleurs s’enfuient-ils ?',['Ils croient entendre un fantôme','Ils voient arriver des policiers armés','Ils ont terminé leur grand repas'],0,5,'« Terrifiés par ce vacarme, [ils] crurent à un fantôme. » Leur peur vient de ce qu’ils ne voient pas qui crie.'),
  ch('q9','IN,AI',6,'Que signifie « ils avaient trouvé mieux que la gloire, une maison où vivre ensemble » ?',['Ils détestent la musique et préfèrent se reposer','Ils regrettent d’avoir quitté leurs anciens maîtres','Vivre ensemble leur convient mieux que la célébrité'],2,5,'Les animaux, rejetés à cause de leur âge, trouvent un foyer et des amis : cela compte plus qu’un succès à Brême.'),
  ch('q10','NP',4,'Qui raconte l’histoire ?',['Un narrateur extérieur à l’histoire','L’âne, qui raconte son voyage à la 1ʳᵉ personne','Le coq, qui se souvient de ses compagnons'],0,0,'Le récit dit « il », « ils » : le narrateur n’est pas un personnage de l’histoire.'),
  ch('q11','VO',3,'Que signifie « vacarme » ?',['Un grand bruit désagréable','Un silence profond et inquiétant','Une odeur forte de cuisine'],0,5,'Le vacarme est produit par les cris de l’âne, du chien, du chat et du coq réunis.'),
  ch('q12','MI,AI',6,'Quelle leçon peut-on tirer de ce conte ?',['Il faut toujours partir très loin en voyage','L’union fait la force, même entre faibles','Les voleurs sont toujours les plus stupides'],1,4,'Séparés, les animaux sont vieux et fragiles ; ensemble, ils font fuir des voleurs et trouvent une maison.')
 ]});

/* ===== 5e ===== */

R({id:'fr_5e_carnet_lecture_01',level:'5e',documentType:'journal de lecture (récit)',title:'Le carnet de lecture de Maya',sourceType:'original_mathquest',
 chapterLinks:['fr5b'],difficulty:5,minutes:3,
 sourceReference:'Texte original Finot Académie. Le roman « Le Phare des brumes », son extrait et ses personnages sont imaginaires, inventés pour l’exercice.',
 paragraphs:[
  'Mardi 12 novembre. J’ai commencé « Le Phare des brumes », le roman que Mme Aubry nous a conseillé. Dès la première page, un détail m’a frappée : le gardien, Anselme, ne parle jamais de sa famille, alors qu’il regarde souvent une photo qu’il cache dans sa poche.',
  'Extrait copié dans mon carnet : « Anselme alluma la lampe comme chaque soir. Puis il se tint longtemps devant la fenêtre, à écouter le bruit de la mer, comme si quelqu’un allait lui répondre. » Je trouve cette phrase très belle, parce qu’elle fait sentir la solitude sans jamais prononcer le mot.',
  'Mon hypothèse. Je pense que la photo montre quelqu’un qu’Anselme a perdu, peut-être son fils parti en mer. Mais l’auteur ne le dit pas encore : c’est à moi de deviner, et cela me donne envie de continuer.',
  'Ce que j’ai aimé : le rythme lent, les descriptions de la tempête, et le fait que les personnages ne disent pas tout. Ce que j’ai moins aimé : les premiers chapitres sont longs, et j’ai failli abandonner à la page 30.',
  'Mes questions pour la suite. Pourquoi Anselme refuse-t-il d’aller au village ? Qui lui envoie des lettres sans jamais recevoir de réponse ? Je noterai mes réponses dans quelques jours pour voir si je m’étais trompée.',
  'Samedi 16 novembre. Mon hypothèse était à moitié juste : la photo montre bien un fils, mais il n’est pas mort. Il est parti vivre loin après une dispute. Je retiens que, pour lire un roman, il faut accepter de ne pas tout comprendre tout de suite.'
 ],
 glossary:[{word:'hypothèse',definition:'Idée que l’on propose pour expliquer quelque chose, sans être sûr qu’elle soit vraie.'},{word:'solitude',definition:'Situation de quelqu’un qui est seul, parfois avec un sentiment de tristesse.'},{word:'rythme',definition:'Façon dont une histoire avance : vite ou lentement.'}],
 questions:[
  ch('q1','EX',2,'Quel est le titre du roman que Maya lit ?',['Le Gardien de la tempête','Le Phare des brumes','Les Lettres sans réponse'],1,0,'Le premier paragraphe donne le titre : « Le Phare des brumes ».'),
  ch('q2','EX',2,'Qui a conseillé ce roman à la classe ?',['Un libraire du quartier','Mme Aubry','Une amie de la classe'],1,0,'Maya écrit : « le roman que Mme Aubry nous a conseillé ».'),
  ch('q3','EX,IN',3,'Quel détail intrigue Maya dès la première page ?',['Anselme cache une photo et ne parle jamais de sa famille','Anselme déteste la mer et refuse même de la regarder','Anselme reçoit chaque jour la visite de son voisin'],0,0,'Maya remarque que le gardien regarde une photo cachée dans sa poche alors qu’il ne parle jamais de sa famille.'),
  ch('q4','AI,IN',5,'Comment l’auteur du roman fait-il sentir la solitude d’Anselme, selon Maya ?',['En répétant plusieurs fois le mot « solitude » dans la page','En expliquant que le village est vide depuis des années','Par un geste : il écoute comme si on allait lui répondre'],2,1,'Maya le dit elle-même : la phrase fait sentir la solitude « sans jamais prononcer le mot ». C’est un geste qui la suggère.'),
  ev('q5','JU',4,'Quel paragraphe contient l’hypothèse de Maya sur la photo ?',2,'Le paragraphe 3 commence par « Mon hypothèse » et évoque un fils parti en mer.'),
  ch('q6','IN,JU',5,'Que fait Maya quand elle écrit « Je pense que la photo montre… peut-être son fils » ?',['Elle fait une supposition qu’elle pourra vérifier','Elle donne une certitude venue de la quatrième de couverture','Elle résume tout le roman pour son professeur'],0,2,'Les mots « Je pense » et « peut-être » montrent une supposition, pas une certitude. Elle la vérifiera en lisant la suite.'),
  ch('q7','EX',3,'Parmi ces éléments, lequel Maya a-t-elle moins aimé ?',['Les descriptions de la tempête, trop courtes','Les premiers chapitres, qu’elle trouve longs','Le fait que les personnages ne disent pas tout'],1,3,'Les deux autres éléments font partie de ce qu’elle a aimé. Ce qui la gêne, ce sont les premiers chapitres, trop longs.'),
  od('q8','SQ,ST',3,'Remets dans l’ordre ce que fait Maya dans son carnet.',['Elle copie une citation','Elle fait une hypothèse','Elle note ses goûts','Elle vérifie son hypothèse'],'L’ordre du carnet suit le texte : citation, hypothèse, goûts, puis vérification quelques jours plus tard.'),
  ch('q9','CC,EX',5,'Pourquoi Maya dit-elle que son hypothèse était « à moitié juste » ?',['Le fils est mort en mer, mais pas dans la tempête','Il y a bien un fils sur la photo, mais il n’est pas mort','Il n’y a pas de photo, mais il y a des lettres'],1,5,'Elle avait imaginé un fils perdu : le fils existe, mais il est parti après une dispute. La moitié de l’idée était fausse.'),
  ch('q10','MI,AI',5,'Quelle leçon de lecture Maya retient-elle à la fin ?',['Il faut toujours lire la dernière page avant de se lancer','Un roman se lit en acceptant de ne pas tout comprendre tout de suite','Il faut abandonner un livre dès que les chapitres s’allongent'],1,5,'La dernière phrase le dit : « il faut accepter de ne pas tout comprendre tout de suite ».'),
  ch('q11','GE,AI',4,'Quel type de texte est celui de Maya ?',['Un résumé neutre du roman, sans aucune opinion personnelle','Un article de presse destiné à tous les lecteurs du journal','Un journal de lecture : ses réactions et ses hypothèses'],2,0,'Le texte est daté, écrit à la 1ʳᵉ personne, et mêle citations, avis et suppositions : c’est un carnet de lecteur.'),
  ch('q12','VO',4,'Que signifie « hypothèse » dans ce texte ?',['Une idée proposée sans certitude','Une preuve certaine donnée par l’auteur','Une erreur faite en recopiant une phrase'],0,2,'Maya annonce « Je pense que… peut-être », puis vérifie plus tard : une hypothèse est une idée à confirmer ou à corriger.')
 ]});

R({id:'fr_5e_expose_oral_01',level:'5e',documentType:'récit',title:'L’exposé de Noé',sourceType:'original_mathquest',
 chapterLinks:['fr5c'],difficulty:4,minutes:3,
 sourceReference:'Texte original Finot Académie. Le personnage de Noé et sa classe sont imaginaires ; le fait cité sur le mont Saint Helens (éruption de 1980) est réel.',
 paragraphs:[
  'Noé avait préparé son exposé sur les volcans pendant deux semaines. Pourtant, ce lundi-là, en attendant son tour, il sentait ses mains devenir moites et son cœur battre à toute vitesse.',
  'Quand Mme Girard l’appela, il se leva, tenant ses fiches serrées contre lui. Il commença à lire d’une voix si basse que ceux du dernier rang se mirent à bavarder.',
  'Il leva les yeux, croisa le regard de sa voisine Inès qui lui souriait, et se souvint des conseils de sa grand-mère : respirer, parler lentement, regarder quelqu’un. Il posa ses fiches sur la table et reprit à voix haute.',
  '« Savez-vous, dit-il, qu’en 1980 le mont Saint Helens a perdu environ quatre cents mètres de hauteur en quelques minutes ? » Le silence se fit aussitôt. Noé sentit que la classe l’écoutait.',
  'Il montra ensuite un schéma qu’il avait dessiné au tableau, expliqua comment le magma remonte dans la cheminée du volcan, et s’arrêta de temps en temps pour demander : « Est-ce que c’est clair ? » Personne ne détourna plus les yeux.',
  'À la fin, la classe applaudit. Mme Girard lui dit : « Tu as commencé en lisant tes fiches ; tu as fini en parlant à tes camarades. C’est exactement cela, prendre la parole. » Noé rangea ses feuilles, un peu rouge, mais fier.'
 ],
 glossary:[{word:'moites',definition:'Légèrement mouillées, humides de sueur.'},{word:'magma',definition:'Roche fondue, très chaude, qui se trouve sous un volcan.'},{word:'schéma',definition:'Dessin simplifié qui explique comment fonctionne quelque chose.'}],
 questions:[
  tx('q1','EX',2,'Sur quel sujet porte l’exposé de Noé ? (deux mots)',['les volcans','volcans','des volcans','sur les volcans'],0,'La première phrase dit : « son exposé sur les volcans ».'),
  ch('q2','EM,EX',3,'Que ressent Noé en attendant son tour ?',['De l’ennui, car il connaît déjà tout','De la colère contre sa voisine Inès','Du stress : des mains moites'],2,0,'Ses mains deviennent moites, son cœur bat à toute vitesse : ce sont des signes de nervosité.'),
  ch('q3','CC',3,'Pourquoi les élèves du dernier rang se mettent-ils à bavarder ?',['Noé lit d’une voix trop basse','Noé parle trop vite et se trompe souvent','Noé a oublié le sujet de son exposé'],0,1,'Le texte relie les deux faits : il lit « d’une voix si basse » que le dernier rang n’écoute plus.'),
  ch('q4','EX',3,'Quels conseils de sa grand-mère Noé se rappelle-t-il ?',['Écrire plus gros et lire encore plus vite','Respirer, parler lentement, regarder','Fermer les yeux et tout réciter par cœur'],1,2,'Le paragraphe 3 les énumère : respirer, parler lentement, regarder quelqu’un.'),
  ev('q5','JU,CC',4,'Quel paragraphe montre le moment où la classe commence vraiment à l’écouter ?',3,'Au paragraphe 4, après la question de Noé, « le silence se fit aussitôt ».'),
  ch('q6','AI,IN',5,'Pourquoi Noé commence-t-il cette partie de son exposé par une question ?',['Pour éveiller la curiosité','Pour gagner du temps en attendant la sonnerie','Pour vérifier si Mme Girard a bien écouté'],0,3,'Une question étonnante (« Savez-vous qu’… ? ») pousse les auditeurs à se demander la réponse : elle capte l’attention.'),
  od('q7','SQ',3,'Remets les événements dans l’ordre.',['Noé lit ses fiches à voix basse','Il croise le regard d’Inès','Il pose ses fiches et parle à voix haute','La classe applaudit'],'Noé lit d’abord, puis se reprend grâce au regard d’Inès, parle sans ses fiches et termine sous les applaudissements.'),
  ch('q8','IN,EM',5,'Que veut dire Mme Girard par « tu as fini en parlant à tes camarades » ?',['Il a changé de sujet en cours de route, sans prévenir','Il a cessé de lire pour parler à son public','Il a oublié ses fiches et a dû improviser sans elles'],1,5,'Au début il lisait ; à la fin il regardait la classe et dialoguait avec elle. C’est cela, « prendre la parole ».'),
  ch('q9','AI,CC',4,'À quoi servent les questions « Est-ce que c’est clair ? » ?',['À garder le lien avec les auditeurs','À ralentir l’exposé pour finir après la sonnerie','À critiquer le travail de ses camarades de classe'],0,4,'En interrogeant la classe, Noé s’assure qu’on le suit. Après cela, « personne ne détourna plus les yeux ».'),
  ch('q10','NP',3,'Comment ce récit est-il raconté ?',['À la 1ʳᵉ personne, par Noé qui se souvient de son exposé','À la 3ᵉ personne, par un narrateur extérieur','Par Inès, qui observe Noé depuis le premier rang'],1,0,'Le texte parle de « Noé » et de « il » : le narrateur n’est pas un personnage, mais il connaît les sensations de Noé.'),
  ch('q11','VO',3,'Que signifie « moites » dans « ses mains devenir moites » ?',['Très froides et tremblantes','Un peu mouillées de sueur','Tachées d’encre bleue à cause des fiches'],1,0,'Le stress fait transpirer : les mains deviennent humides.'),
  ch('q12','MI,AI',5,'Quelle idée générale ce récit illustre-t-il ?',['Un bon exposé s’adresse à un public','Il faut apprendre ses fiches par cœur sans les regarder','Les volcans sont toujours le meilleur sujet d’exposé'],0,5,'Noé progresse en regardant ses camarades, en variant le ton et en les interrogeant : il passe de la lecture à la parole.')
 ]});

R({id:'fr_5e_registres_trois_01',level:'5e',type:'document',documentType:'texte documentaire',title:'Trois façons de dire la même chose',sourceType:'original_mathquest',
 chapterLinks:['fr5i'],difficulty:5,minutes:3,
 sourceReference:'Texte documentaire original Finot Académie. Les phrases citées en exemple sont inventées pour l’exercice.',
 paragraphs:[
  'Une même situation peut se dire de plusieurs façons, selon la personne à qui l’on parle et le lieu où l’on se trouve. On appelle ces façons de parler des registres de langue. En voici trois, à propos d’un retard.',
  'Registre familier, entre amis : « Désolé, j’suis à la bourre ! Mon bus est tombé en panne, c’était la galère. » Les phrases sont courtes, certains mots sont avalés (« j’suis »), le vocabulaire est très relâché et parfois argotique (« la galère »).',
  'Registre courant, avec un professeur ou un commerçant : « Pardon pour mon retard. Mon bus est tombé en panne, et j’ai dû venir à pied. » Les phrases sont complètes et le vocabulaire est neutre, compris de tous.',
  'Registre soutenu, dans une lettre officielle : « Je vous prie de bien vouloir excuser mon retard, dû à une défaillance du véhicule qui devait me conduire jusqu’à vous. » Le vocabulaire est précis et recherché (« défaillance ») et la syntaxe est plus élaborée.',
  'Aucun registre n’est meilleur que les autres : le bon choix dépend de la situation. Parler familièrement à son directeur, ou de façon très soutenue à sa petite sœur, serait surprenant, voire comique. Les écrivains jouent d’ailleurs avec ces écarts pour faire rire ou pour caractériser un personnage.',
  'Pour reconnaître un registre, on peut se poser trois questions : à qui parle-t-on ? dans quelle situation ? quels mots et quelle construction de phrase sont employés ? Souvent, c’est la combinaison des indices qui permet de trancher.'
 ],
 glossary:[{word:'registres',definition:'Niveaux de langue : façons de parler plus ou moins relâchées ou soignées.'},{word:'argotique',definition:'Qui appartient à l’argot, un vocabulaire très familier et imagé.'},{word:'syntaxe',definition:'Façon d’organiser les mots dans la phrase.'},{word:'défaillance',definition:'Panne ou faiblesse qui empêche de fonctionner normalement.'}],
 questions:[
  ch('q1','MI',4,'Quelle est l’idée principale du texte ?',['Il faut toujours parler en registre soutenu à l’école','Le registre doit s’adapter à la situation','Le registre familier est toujours une erreur de langage'],1,4,'Le texte montre trois registres et conclut qu’aucun n’est « meilleur » : tout dépend de la situation.'),
  tx('q2','EX',2,'Combien de registres de langue le texte présente-t-il ? (un nombre)',['3','trois'],0,'La fin du premier paragraphe annonce « trois » registres, détaillés ensuite.'),
  ch('q3','GE,EX',3,'Dans quel registre se trouvent les expressions « à la bourre » et « la galère » ?',['Registre familier','Registre courant','Registre soutenu'],0,1,'Ces mots relâchés et imagés, utilisés entre amis, relèvent du registre familier.'),
  tx('q4','VO,EX',3,'Quel mot du registre soutenu remplace « panne » ? (un mot)',['défaillance','une défaillance'],3,'Dans la lettre officielle, « panne » devient « défaillance du véhicule ».'),
  ch('q5','CC,IN',5,'Pourquoi le texte dit-il qu’aucun registre n’est meilleur que les autres ?',['Parce que tous les registres sont à peu près identiques','Parce que le bon choix dépend de la situation','Parce que les professeurs les acceptent tous en classe'],1,4,'Chaque registre est adapté à un contexte : un registre peut être juste dans un cas et déplacé dans un autre.'),
  ch('q6','IN',5,'Que se passerait-il si l’on écrivait « j’suis à la bourre » dans une lettre à un directeur ?',['Ce serait trop familier pour la situation','Ce serait très bien reçu par le directeur','Ce serait trop soutenu pour la situation'],0,4,'Le texte explique qu’employer le mauvais registre « serait surprenant, voire comique ».'),
  ev('q7','JU,ST',4,'Quel paragraphe donne trois questions pour reconnaître un registre ?',5,'Le dernier paragraphe pose les trois questions : à qui, dans quelle situation, avec quels mots et quelle construction.'),
  ch('q8','AI,IN',5,'Pourquoi les écrivains jouent-ils avec les registres ?',['Pour faire rire ou décrire un personnage','Pour que leurs livres soient beaucoup plus courts','Pour éviter que les élèves ne les comprennent'],0,4,'Un personnage qui parle de façon soutenue ou très familière se dévoile : cela peut créer du comique ou un portrait.'),
  ch('q9','RF',4,'Dans « On appelle ces façons de parler des registres de langue », que désigne « ces façons de parler » ?',['Les différentes manières de dire la même chose','Les langues étrangères apprises au collège','Les accents régionaux des différentes villes'],0,0,'Le paragraphe vient de dire qu’une même situation peut se dire de plusieurs façons : ce sont ces façons que l’on nomme registres.'),
  ch('q10','IN,GE',4,'Pourquoi la phrase « Pardon pour mon retard. Mon bus est tombé en panne » est-elle du registre courant ?',['Parce qu’elle utilise un vocabulaire d’argot très imagé','Parce que les phrases sont complètes et neutres','Parce qu’elle est écrite dans une lettre officielle'],1,2,'Pas d’argot, pas de mot recherché : phrases complètes, vocabulaire compris de tous, d’où « courant ».'),
  od('q11','ST,SQ',3,'Remets les parties du texte dans l’ordre.',['Définition des registres','Le registre familier','Le registre courant','Le registre soutenu'],'Le texte définit les registres, puis les présente du plus relâché au plus soigné.'),
  ch('q12','VO',4,'Dans « un vocabulaire précis et recherché », que veut dire « recherché » ?',['Que l’on a perdu et que l’on cherche','Choisi avec soin, peu courant','Écrit trop vite'],1,3,'Un mot « recherché » est choisi pour son élégance ou sa précision, comme « défaillance » à la place de « panne ».')
 ]});

R({id:'fr_5e_port_aube_01',level:'5e',documentType:'description',title:'Le port au petit matin',sourceType:'original_mathquest',
 chapterLinks:['fr5h'],difficulty:5,minutes:3,
 sourceReference:'Texte original Finot Académie.',
 paragraphs:[
  'À l’aube, le port s’éveille doucement. Les bateaux de pêche, amarrés le long du quai, se balancent sur l’eau grise. Leurs coques, éraflées par les vagues, portent encore l’odeur du sel et du poisson.',
  'Des marins, vêtus de cirés jaunes, vérifient les filets étalés sur le ponton. L’un d’eux, un homme robuste à la barbe rousse, déroule un cordage avec des gestes lents, précis, presque tendres.',
  'Au loin, un chalutier vient d’entrer dans la rade. Sa sirène retentit, et les mouettes, qui tournoyaient au-dessus des mâts, plongent aussitôt vers l’eau pour guetter les restes de la pêche.',
  'Sur le quai, les mareyeurs attendent déjà. Ils discutent à voix basse en soufflant dans leurs mains, car le vent du large est frais. Les caisses de glace s’empilent, prêtes à recevoir les poissons.',
  'Peu à peu, le soleil perce les nuages et dore la surface de l’eau. Les cris des mouettes, le cliquetis des chaînes et le moteur du chalutier forment un concert confus, que le port connaît par cœur.'
 ],
 glossary:[{word:'amarrés',definition:'Attachés avec des cordes (des amarres) pour ne pas bouger.'},{word:'cirés',definition:'Vêtements imperméables que portent les marins.'},{word:'rade',definition:'Grande étendue d’eau abritée, près d’un port, où les bateaux peuvent s’arrêter.'},{word:'chalutier',definition:'Bateau de pêche qui traîne un grand filet derrière lui.'},{word:'mareyeurs',definition:'Commerçants qui achètent le poisson frais aux pêcheurs pour le revendre.'}],
 questions:[
  tx('q1','TI,EX',2,'À quel moment de la journée se passe la scène ? (un ou deux mots)',['aube','l’aube','à l’aube','petit matin','le petit matin','le matin'],0,'Le texte commence par « À l’aube, le port s’éveille » et le titre dit « au petit matin ».'),
  ch('q2','ST,GE',4,'Quel champ lexical domine le texte ?',['Celui de la ville et de ses commerces','Celui du port et de la pêche','Celui de l’école et du travail'],1,0,'Bateaux, quai, filets, cordage, chalutier, mareyeurs, poissons : tous ces mots appartiennent au monde du port et de la pêche.'),
  ch('q3','VO',4,'Quelle liste ne contient que des mots du vocabulaire maritime du texte ?',['tableau, craie, cahier, classe','quai, ponton, rade, mâts','pain, farine, four, boulanger'],1,1,'Quai, ponton, rade et mâts viennent du texte et du monde des bateaux ; les autres listes relèvent de l’école ou de la boulangerie.'),
  ch('q4','VO',4,'Quel mot pourrait remplacer « robuste » sans changer le sens de la phrase ?',['Maigre','Solide','Timide'],1,1,'Un homme robuste est fort et résistant : « solide » est un synonyme. « Maigre » et « timide » ne disent pas la même chose.'),
  ch('q5','VO',5,'Dans « les mouettes qui tournoyaient », que font les mouettes ?',['Elles volent en cercles','Elles dorment tranquillement sur les mâts','Elles pêchent en plongeant sous l’eau'],0,2,'« Tournoyer » vient de « tourner » : elles décrivent des cercles dans le ciel avant de plonger.'),
  ch('q6','IN,EM',5,'Que montrent les « gestes lents, précis, presque tendres » du marin ?',['Qu’il est très fatigué et pressé d’en finir','Qu’il aime son métier et le connaît bien','Qu’il a peur de se blesser avec les cordages'],1,1,'Des gestes précis et tendres montrent l’habitude et l’attachement à son travail.'),
  ev('q7','JU,ST',4,'Quel paragraphe fait surtout entendre les bruits du port ?',4,'Le dernier paragraphe cite les cris des mouettes, le cliquetis des chaînes et le moteur du chalutier.'),
  ch('q8','CC',4,'Pourquoi les mouettes plongent-elles vers l’eau quand le chalutier arrive ?',['Pour guetter les restes','Pour échapper au bruit de la sirène','Pour rejoindre leur nid sur les mâts'],0,2,'Elles viennent guetter « les restes de la pêche » : les bateaux de pêche attirent les oiseaux.'),
  ch('q9','RF',4,'Dans « Ils discutent à voix basse en soufflant dans leurs mains », qui est « Ils » ?',['Les marins pêcheurs','Les mareyeurs','Les mouettes du quai'],1,3,'La phrase d’avant parle des mareyeurs qui attendent sur le quai : c’est à eux que renvoie « Ils ».'),
  od('q10','SQ',3,'Remets les moments dans l’ordre du texte.',['Le port s’éveille','Les marins vérifient les filets','Un chalutier entre dans la rade','Le soleil dore l’eau'],'Le texte suit le lever du jour, de l’aube jusqu’au soleil qui perce.'),
  ch('q11','VO,AI',5,'Que signifie l’expression « un concert confus » ?',['Un vrai concert organisé par la mairie sur le quai','Un mélange de bruits comme une musique désordonnée','Un silence pesant qui fait peur à tous les marins'],1,4,'C’est une image : les bruits du port (cris, chaînes, moteur) se mêlent comme une musique sans chef d’orchestre.'),
  ch('q12','ST,AI',5,'Comment le regard du narrateur se déplace-t-il ?',['Du port entier vers des détails, puis vers l’ambiance','Toujours du plus petit détail au plus grand bateau','Il reste fixé sur un seul marin pendant tout le texte'],0,4,'On part du port qui s’éveille, on zoome sur les marins, le chalutier, les mareyeurs, puis on revient à l’atmosphère d’ensemble.')
 ]});

R({id:'fr_5e_chat_botte_01',level:'5e',documentType:'conte',title:'Le Chat botté et le marquis de Carabas',author:'Charles Perrault',work:'Histoires ou contes du temps passé (1697)',sourceType:'public_domain',
 chapterLinks:['fr5o'],difficulty:5,minutes:3,
 sourceReference:'Adaptation libre et abrégée pour la 5e, d’après Charles Perrault (mort en 1703), dans le domaine public.',
 teacherNotes:'Texte propice à repérer le discours direct (guillemets, incises) et indirect (verbes de parole + que / de + infinitif), et à passer de l’un à l’autre.',
 paragraphs:[
  'Un meunier mourut en laissant à ses trois fils un moulin, un âne et un chat. Le plus jeune, qui n’avait reçu que le chat, se lamentait : « Que vais-je devenir ? Je n’ai plus qu’à le manger et à me faire un manchon de sa peau ! »',
  'Le chat, qui avait tout entendu, lui dit d’un air sérieux de ne pas s’inquiéter. Il lui demanda seulement un sac et une paire de bottes, et promit qu’il ne regretterait pas son choix.',
  'Une fois botté, le chat mit du son et des laitues dans son sac et s’étendit comme mort. Bientôt un jeune lapin, tout étourdi, entra dans le sac, et le chat tira les cordons.',
  'Il alla porter le lapin au roi. « Sire, dit-il, voici un lapin de garenne que mon maître, le marquis de Carabas, m’a chargé de vous offrir. » Le roi accepta le présent avec plaisir et répondit qu’il remerciait le marquis.',
  'Pendant plusieurs mois, le chat apporta ainsi du gibier au roi. Un jour, apprenant que le roi allait se promener au bord de la rivière avec sa fille, il conseilla à son maître de se baigner à tel endroit en lui disant : « Laisse-moi faire. »',
  'Pendant que le jeune homme se baignait, le chat cacha ses habits sous une grosse pierre. Quand le carrosse passa, il se mit à crier : « Au secours ! Mon maître, le marquis de Carabas, se noie ! » Le roi, qui reconnaissait le chat, fit aussitôt secourir le jeune homme.'
 ],
 glossary:[{word:'se lamentait',definition:'Se plaignait en gémissant, très malheureux.'},{word:'manchon',definition:'Fourrure cylindrique dans laquelle on glissait les mains pour les protéger du froid.'},{word:'garenne',definition:'Endroit où vivent les lapins sauvages.'},{word:'gibier',definition:'Animaux sauvages que l’on chasse pour les manger.'},{word:'carrosse',definition:'Grande voiture à chevaux, richement décorée.'}],
 questions:[
  ch('q1','EX,CH',2,'Qu’a reçu le plus jeune fils du meunier ?',['Le moulin','L’âne','Le chat'],2,0,'Le texte précise que le plus jeune « n’avait reçu que le chat ».'),
  ch('q2','EM,CC',3,'Pourquoi le plus jeune fils se lamente-t-il ?',['Il est désespéré d’avoir si peu','Il est furieux contre ses deux frères','Il a perdu son chat dans la forêt'],0,0,'Il ne voit plus qu’une solution : manger le chat et faire un manchon avec sa peau. Sa plainte montre son désespoir.'),
  ch('q3','ST,GE',4,'Dans « Le chat lui dit de ne pas s’inquiéter », comment les paroles sont-elles rapportées ?',['Au discours direct, entre guillemets et tirets','Au discours indirect, sans guillemets','Comme une simple pensée du narrateur'],1,1,'Il n’y a ni guillemets ni paroles exactes : le narrateur rapporte l’idée avec un verbe de parole (« lui dit de ») au discours indirect.'),
  ch('q4','ST,GE',4,'Dans « Sire, dit-il, voici un lapin… », à quoi sert « dit-il » ?',['À indiquer qui parle','À exprimer une pensée secrète du roi','À donner le titre du conte'],0,3,'Placé au milieu de la réplique, « dit-il » précise qui parle : on l’appelle une incise.'),
  ch('q5','RF',3,'Dans « mon maître, le marquis de Carabas », qui désigne « mon maître » ?',['Le roi du pays tout entier','Le plus jeune fils','Le meunier, mort au début du conte'],1,3,'C’est le chat qui parle : son maître est le jeune homme qui l’a hérité. Le « marquis de Carabas » est un titre inventé pour lui.'),
  ch('q6','IN,AI',5,'Pourquoi le chat présente-t-il son maître comme « marquis de Carabas » ?',['Parce que c’est le vrai nom de son maître','Pour faire croire au roi qu’il est noble','Parce que le roi le lui a demandé la veille'],1,3,'Le fils d’un meunier est pauvre. En inventant un titre de marquis, le chat veut impressionner le roi et obtenir sa faveur.'),
  ev('q7','JU,CC',4,'Quel paragraphe montre la ruse du chat pour capturer le lapin ?',2,'Au paragraphe 3, le chat fait le mort dans le sac rempli de nourriture et attend que le lapin y entre.'),
  od('q8','SQ',3,'Remets les actions du chat dans l’ordre.',['Le chat demande un sac et des bottes','Il attrape un lapin','Il offre le lapin au roi','Il cache les habits de son maître'],'L’ordre suit le conte : préparation, capture, cadeau au roi, puis mise en scène près de la rivière.'),
  ch('q9','IN,CC',5,'Pourquoi le chat cache-t-il les habits de son maître sous une pierre ?',['Pour que son maître semble en danger','Pour les laver dans l’eau de la rivière','Pour les offrir en cadeau à la princesse'],0,5,'Sans habits, le jeune homme semble victime d’un accident. Le chat peut crier au secours et attirer l’attention du roi.'),
  ch('q10','IN,GE',5,'Que montre le cri « Au secours ! Mon maître… se noie ! » ?',['Le chat est réellement paniqué par le danger','Le chat joue la comédie','Le jeune homme est vraiment en train de se noyer'],1,5,'Le jeune homme ne se noie pas : il se baigne simplement. Le chat invente un danger pour déclencher une scène avec le roi.'),
  ch('q11','VO',3,'Que signifie « étourdi » dans « un jeune lapin, tout étourdi » ?',['Qui n’est pas attentif','Qui est très rapide et agile','Qui a très faim depuis des jours'],0,2,'Un étourdi ne se méfie pas : le lapin entre dans le sac sans voir le piège.'),
  ch('q12','ST',5,'Comment écrire au discours direct « le roi répondit qu’il remerciait le marquis » ?',['« Remerciez le marquis », répondit le roi.','« Je remercie le marquis », répondit le roi.','« Il remercie le marquis », répondit le roi.'],1,3,'En passant au discours direct, « il » (le roi) devient « je » : c’est lui qui parle. On ajoute les guillemets et une incise.')
 ]});

R({id:'fr_5e_vilain_canard_01',level:'5e',documentType:'conte',title:'Le Vilain Petit Canard',author:'Hans Christian Andersen',work:'Le Vilain Petit Canard (1843)',sourceType:'public_domain',
 chapterLinks:['fr5q'],difficulty:5,minutes:3,
 sourceReference:'Adaptation libre et abrégée pour la 5e, d’après Hans Christian Andersen (mort en 1875), dans le domaine public — aucune traduction existante reprise.',
 teacherNotes:'Texte propice à comparer passé simple (actions), imparfait (états, décors) et plus-que-parfait (action antérieure).',
 paragraphs:[
  'C’était l’été à la campagne. Dans une vieille ferme entourée d’un fossé, une cane couvait ses œufs. Un par un, les œufs s’ouvrirent et les petits canetons sortirent en piaillant. Un seul, plus gros que les autres, restait à éclore.',
  'Il finit par naître. Il était gris, maladroit, et il ne ressemblait à aucun de ses frères. Dès le premier jour, les autres canards le moquèrent, les poules le picorèrent et la servante de la basse-cour le bouscula. « Quel vilain canard ! » disait-on.',
  'Le pauvre caneton, qui n’avait connu que des moqueries, s’enfuit un matin. Il traversa le fossé, gagna un marais et y vécut plusieurs semaines parmi des oies sauvages. Mais des chasseurs arrivèrent et tirèrent sur le marais ; il s’échappa de justesse.',
  'L’hiver fut terrible. Le caneton, qui avait perdu ses forces, resta pris dans la glace d’un étang. Un paysan le découvrit, brisa la glace et l’emporta chez lui. Mais le caneton prit peur des enfants de la maison et s’enfuit de nouveau.',
  'Le printemps revint enfin. Un jour, il vit de grands oiseaux blancs glisser sur un lac. Fasciné, il s’approcha, certain qu’ils le chasseraient. Mais, en baissant la tête, il aperçut son reflet dans l’eau : il n’était plus un caneton gris, il était un cygne.',
  'Les autres cygnes l’entourèrent et le saluèrent comme l’un des leurs. Le vilain petit canard, qui avait tant souffert, comprit qu’il n’était pas laid : il n’avait simplement pas grandi au bon endroit.'
 ],
 glossary:[{word:'piaillant',definition:'Poussant de petits cris aigus, comme le font les jeunes oiseaux.'},{word:'éclore',definition:'Sortir de l’œuf.'},{word:'basse-cour',definition:'Partie de la ferme où l’on élève les volailles.'},{word:'marais',definition:'Terrain couvert d’eau peu profonde et de plantes.'},{word:'fasciné',definition:'Attiré et émerveillé au point de ne plus pouvoir détourner les yeux.'}],
 questions:[
  ch('q1','CC,EX',3,'Pourquoi le dernier caneton est-il maltraité dès son premier jour ?',['Il est très malade et ne mange plus rien','Il est gris et ne ressemble à personne','Il a désobéi à sa mère dès sa naissance'],1,1,'Il était gris, maladroit, différent : les autres se moquent de lui à cause de son apparence.'),
  ch('q2','ST,GE',5,'Dans « qui n’avait connu que des moqueries », que marque le plus-que-parfait ?',['Une action antérieure à la fuite','Une action qui se passera plus tard dans le conte','Une action qui se déroule en même temps que la fuite'],0,2,'Avant de s’enfuir, le caneton avait déjà subi des moqueries. Le plus-que-parfait indique cette action passée et achevée avant une autre.'),
  od('q3','SQ',3,'Remets les événements dans l’ordre.',['Le caneton naît','Il s’enfuit vers le marais','Il reste pris dans la glace','Il aperçoit son reflet de cygne'],'Le récit suit les saisons : naissance en été, fuite, hiver dans la glace, puis printemps et découverte du reflet.'),
  ch('q4','PL,EX',3,'Où le caneton reste-t-il prisonnier pendant l’hiver ?',['Dans une grange fermée à clé','Dans la glace d’un étang','Au fond du marais, sous les roseaux'],1,3,'Le texte dit qu’il « resta pris dans la glace d’un étang » avant que le paysan ne le sauve.'),
  ch('q5','CC',4,'Pourquoi le caneton s’enfuit-il de chez le paysan ?',['Il a peur des enfants','Il veut retrouver sa mère à la ferme','Il n’a pas assez à manger chez le paysan'],0,3,'Le paysan le sauve, mais les enfants l’effraient : « le caneton prit peur des enfants ».'),
  ch('q6','IN,EM',5,'Pourquoi le caneton s’approche-t-il des cygnes « certain qu’ils le chasseraient » ?',['Parce que les cygnes lui ont déjà fait du mal avant','Parce qu’il s’attend à être rejeté encore','Parce que les cygnes sont de grands oiseaux blancs'],1,4,'Toutes ses rencontres ont mal fini : il s’attend à être chassé, d’où l’effet de surprise quand les cygnes l’accueillent.'),
  ev('q7','JU,SQ',4,'Quel paragraphe raconte la découverte de sa véritable identité ?',4,'Au paragraphe 5, il aperçoit son reflet dans l’eau et comprend qu’il est un cygne.'),
  ch('q8','ST,GE',4,'Dans « Il était gris, maladroit », que fait l’imparfait ?',['Il raconte une action soudaine','Il décrit le caneton, son état','Il annonce une action future'],1,1,'L’imparfait décrit : il donne l’aspect du caneton, sans faire avancer l’action comme le passé simple.'),
  ch('q9','MI,AI',6,'Que signifie la phrase « il n’avait simplement pas grandi au bon endroit » ?',['On ne vaut pas ce que les autres disent','Il faut toujours déménager pour réussir','Les canards sont moins beaux que les cygnes'],0,5,'Le caneton n’était pas laid : il appartenait à une autre famille. La morale invite à ne pas juger sur les apparences.'),
  ch('q10','AI,EM',6,'Quelle émotion le lecteur éprouve-t-il le plus probablement pour le caneton ?',['De la moquerie envers le pauvre caneton','De la compassion, puis de la joie','De la peur des chasseurs jusqu’à la fin'],1,5,'On suit ses épreuves avec compassion ; la fin heureuse apporte un soulagement.'),
  ch('q11','VO',4,'Que veut dire « fasciné » ?',['Émerveillé, sans pouvoir détourner les yeux','Furieux et jaloux de leur beauté et de leur liberté','Fatigué et affamé après un long voyage d’hiver'],0,4,'Les grands oiseaux blancs le captivent : il s’approche sans pouvoir s’en empêcher.'),
  ch('q12','RF',4,'Dans « certain qu’ils le chasseraient », que désigne « ils » ?',['Les chasseurs du grand marais','Les grands oiseaux blancs','Les enfants du paysan'],1,4,'La phrase précédente parle des « grands oiseaux blancs » : ce sont eux qu’il craint de voir le chasser.')
 ]});

R({id:'fr_5e_verne_sneffels_01',level:'5e',documentType:'roman d’aventure (extrait adapté)',title:'Au bord du cratère',author:'Jules Verne',work:'Voyage au centre de la Terre (1864)',sourceType:'public_domain',
 chapterLinks:['fr5w'],difficulty:5,minutes:3,
 sourceReference:'Adaptation libre et abrégée pour la 5e, d’après Jules Verne (mort en 1905), dans le domaine public.',
 paragraphs:[
  'Un matin de juin, nous arrivâmes au pied du Sneffels, un volcan d’Islande éteint depuis des siècles. Mon oncle, le professeur Lidenbrock, marchait en tête, le nez en l’air, comme s’il voulait grimper d’un seul bond jusqu’au sommet. Moi, je traînais derrière, rongé par l’inquiétude.',
  'Notre guide islandais, Hans, avançait sans un mot, d’un pas régulier. Il portait à lui seul la plus grande partie de nos bagages et ne paraissait jamais fatigué. Je le regardais avec envie.',
  'Après plusieurs heures de marche, nous atteignîmes le cratère. C’était un immense entonnoir dont le fond se perdait dans l’obscurité. Trois cheminées s’ouvraient dans ce fond, noires comme des bouches de puits. Je me penchai : un frisson me parcourut tout entier.',
  'Mon oncle consulta le vieux parchemin qui nous avait menés jusque-là. Il disait de descendre par la cheminée que l’ombre d’une montagne voisine, le Scartaris, venait effleurer avant la fin du mois de juin. Mon oncle attendit plusieurs jours, guettant le soleil.',
  'Enfin, un matin, le soleil perça les nuages et l’ombre du Scartaris vint toucher le bord de l’une des trois ouvertures. « Voilà le chemin ! s’écria mon oncle, triomphant. En avant, mes amis, vers le centre de la Terre ! » Moi, je n’osai pas répondre.',
  'Nous attachâmes des cordes à un rocher, vérifiâmes nos lampes, et nous glissâmes l’un après l’autre dans le puits. Au-dessus de ma tête, le cercle de ciel devenait de plus en plus petit. Je compris alors qu’il n’y aurait plus de retour en arrière.'
 ],
 glossary:[{word:'cratère',definition:'Grande cavité en forme d’entonnoir au sommet d’un volcan.'},{word:'parchemin',definition:'Ancienne feuille de peau préparée, sur laquelle on écrivait.'},{word:'guettant',definition:'Surveillant attentivement en attendant quelque chose.'},{word:'triomphant',definition:'Qui exprime la joie d’avoir réussi ou d’avoir raison.'}],
 questions:[
  ch('q1','NP',4,'Qui raconte l’histoire ?',['Le professeur Lidenbrock lui-même','Hans, le guide islandais','Le neveu du professeur'],2,0,'Le narrateur parle de « mon oncle » et dit « je » : c’est le neveu du professeur, personnage de l’histoire.'),
  ch('q2','CH,IN',4,'Comment le narrateur se distingue-t-il de son oncle ?',['Il est inquiet, son oncle est enthousiaste','Il est beaucoup plus pressé que son oncle d’arriver','Il connaît bien mieux le volcan que son oncle'],0,0,'L’oncle marche en tête, le nez en l’air ; le narrateur traîne derrière, « rongé par l’inquiétude ».'),
  ch('q3','CH,EX',3,'Quel trait de caractère ressort de la description de Hans ?',['Il parle sans cesse pour encourager','Il est calme et endurant','Il est peureux et très lent à marcher'],1,1,'Il avance sans un mot, d’un pas régulier, et ne paraît jamais fatigué.'),
  ch('q4','PL,EX',3,'Combien de cheminées s’ouvrent au fond du cratère ?',['Une seule','Deux','Trois'],2,2,'Le texte le dit : « Trois cheminées s’ouvraient dans ce fond ».'),
  ev('q5','JU,PL',4,'Quel paragraphe décrit l’aspect du cratère ?',2,'Le paragraphe 3 le compare à un entonnoir et décrit les cheminées noires comme des bouches de puits.'),
  ch('q6','CC,IN',5,'Pourquoi le professeur attend-il plusieurs jours avant de descendre ?',['Il attend que l’ombre indique la bonne cheminée','Il est trop fatigué pour continuer la descente','Il attend l’arrivée de renforts venus du village'],0,3,'Le parchemin indique la cheminée par l’ombre du Scartaris : il faut attendre que le soleil la révèle.'),
  od('q7','SQ',3,'Remets les étapes dans l’ordre.',['Les voyageurs arrivent au pied du volcan','Ils atteignent le cratère','L’ombre du Scartaris désigne une cheminée','Ils descendent dans le puits'],'Le récit suit la progression : approche, cratère, attente de l’ombre, descente.'),
  ch('q8','GE,ST',4,'Quel paragraphe est surtout descriptif ?',['Le paragraphe 3 (le cratère)','Le paragraphe 5 (le cri triomphant de l’oncle)','Le paragraphe 6 (la descente dans le puits)'],0,2,'Le paragraphe 3 décrit le lieu : forme, couleurs, profondeur. Les autres font avancer l’action.'),
  ch('q9','EM,IN',5,'Que ressent le narrateur lorsque son oncle crie « Voilà le chemin ! » ?',['De la joie sans mélange, comme son oncle','De l’angoisse, il n’ose pas répondre','De l’indifférence totale devant l’annonce'],1,4,'Son silence (« je n’osai pas répondre ») s’oppose à l’enthousiasme de l’oncle : il a peur de ce qui l’attend.'),
  ch('q10','IN,AI',6,'Que suggère « le cercle de ciel devenait de plus en plus petit » ?',['Qu’il commence à pleuvoir sur le volcan','Qu’ils s’éloignent du monde extérieur','Que la nuit tombe peu à peu sur le puits'],1,5,'Plus ils descendent, moins on voit le ciel. L’image annonce un voyage sans retour, ce que le narrateur formule ensuite.'),
  ch('q11','VO',3,'Que signifie « guettant » dans « guettant le soleil » ?',['Évitant avec soin de regarder','Surveillant avec attention','Maudissant le soleil qui tarde'],1,3,'Guetter, c’est observer avec attention en attendant que quelque chose se produise.'),
  ch('q12','AI,GE',6,'Quel effet l’auteur cherche-t-il à produire par le contraste entre l’oncle et le neveu ?',['Rendre l’aventure à la fois excitante et risquée','Montrer que le voyage est sans aucun danger','Raconter une longue dispute entre deux parents'],0,4,'L’enthousiasme de l’un et la peur de l’autre rendent le voyage plus vivant et plus inquiétant pour le lecteur.')
 ]});

R({id:'fr_5e_phare_poeme_01',level:'5e',documentType:'poème (vers libres, texte original)',title:'Le gardien des vagues',sourceType:'original_mathquest',
 chapterLinks:['fr5x'],difficulty:6,minutes:3,audioMode:'audioRecommended',verse:true,stanzas:[0,4,8],
 sourceReference:'Poème original Finot Académie.',
 paragraphs:[
  'Au bout de la terre, il s’élève,',
  'Seul, droit, sur son rocher mouillé ;',
  'Les vagues le frappent sans trêve,',
  'Mais il ne s’est jamais penché.',
  'Quand la nuit tombe sur la plage,',
  'Il ouvre un grand œil de lumière ;',
  'Il parle aux bateaux sans visage',
  'Comme on parle à des fils, à des frères.',
  'Il ne demande ni salaire',
  'Ni couronne, ni souvenir :',
  'Que la nuit passe, que la mer',
  'Rende ceux qu’elle a fait partir.'
 ],
 glossary:[{word:'trêve',definition:'Arrêt, repos : « sans trêve » veut dire sans s’arrêter.'},{word:'salaire',definition:'Somme d’argent reçue en échange d’un travail.'}],
 questions:[
  ch('q1','MI',5,'De quoi parle ce poème ?',['D’un phare qui protège les marins','D’un naufrage qui détruit un bateau en pleine nuit','D’un pêcheur qui rentre au port après la pêche'],0,0,'Le phare est le sujet : il résiste aux vagues, guide les bateaux la nuit et se montre désintéressé.'),
  ch('q2','VO,GE',5,'Dans « Il ouvre un grand œil de lumière », que désigne l’« œil » ?',['Le faisceau du phare','Une lune pleine au-dessus de la mer','Un animal marin aux yeux brillants'],0,5,'C’est une métaphore : le faisceau qui s’allume ressemble à un œil qui s’ouvre dans la nuit.'),
  ev('q3','JU,IN',5,'Quel vers montre que le phare résiste aux tempêtes ?',3,'« Mais il ne s’est jamais penché » : malgré les vagues, il reste droit.'),
  ev('q4','JU,GE',6,'Quel vers compare les bateaux à des membres de la famille ?',7,'« Comme on parle à des fils, à des frères » rapproche les marins d’êtres chers à qui le phare s’adresse.'),
  ch('q5','RF,IN',4,'Qui sont « ceux qu’elle a fait partir » dans le dernier vers ?',['Les marins partis en mer','Les vagues qui quittent le rivage','Les gardiens du phare et leurs familles'],0,11,'La mer « a fait partir » des marins ; le phare espère qu’elle les rendra, c’est-à-dire qu’ils reviendront sains et saufs.'),
  ch('q6','GE,AI',6,'Pourquoi le poète parle-t-il du phare comme d’un être humain (il parle, il veille, il ne demande rien) ?',['Pour le faire admirer comme un protecteur','Pour faire croire qu’un phare est vraiment vivant','Pour se moquer gentiment des marins fragiles'],0,4,'Cette personnification donne au phare des qualités humaines (courage, générosité) et pousse le lecteur à l’admirer.'),
  ch('q7','ST',3,'Combien de strophes compte le poème ?',['Deux','Trois','Quatre'],1,0,'Le poème compte douze vers regroupés en trois quatrains.'),
  ch('q8','RF',3,'Qui désigne le pronom « Il » dans tout le poème ?',['Le gardien','Un marin','Le phare'],2,0,'Le sujet est le phare : « Au bout de la terre, il s’élève », « il ouvre un grand œil de lumière ».'),
  ch('q9','VO',4,'Que signifie « sans trêve » dans « Les vagues le frappent sans trêve » ?',['Sans s’arrêter','Sans faire de bruit','Sans aucune force'],0,2,'Une trêve est une pause. Sans trêve, les vagues frappent continuellement.'),
  tx('q10','ST,EX',4,'Quel mot rime avec « élève » à la fin du vers 3 ? (un mot)',['trêve','sans trêve'],2,'Les vers 1 et 3 riment : « s’élève » et « trêve ».'),
  ch('q11','ST,MI',6,'Comment sont organisées les trois strophes ?',['Résistance ; guide de nuit ; désintéressement','L’aube sur la mer ; le midi au port ; le soir en ville','Le phare ; la plage ; la ville ; les bateaux'],0,4,'Strophe 1 : il résiste. Strophe 2 : il guide les bateaux. Strophe 3 : il ne demande aucune récompense.'),
  ch('q12','AI,EM',7,'Quel sentiment le poète veut-il surtout faire naître ?',['Une admiration reconnaissante','De la peur de la mer et de ses tempêtes','De l’ennui devant le quotidien des marins'],0,8,'La dernière strophe insiste sur le don de soi : il ne demande ni salaire ni gloire, seulement le retour des marins.'),
  ch('q13','JU,AR',7,'Quelle citation justifie le mieux que le phare est désintéressé ?',['« Il ne demande ni salaire / Ni couronne, ni souvenir »','« Les vagues le frappent sans trêve, / Mais il ne s’est jamais penché »','« Quand la nuit tombe sur la plage, / Il ouvre un grand œil de lumière »'],0,8,'Le phare refuse toute récompense : ces deux vers sont la preuve la plus directe de son désintéressement.')
 ]});

R({id:'fr_5e_don_quichotte_01',level:'5e',documentType:'roman (extrait adapté)',title:'Don Quichotte et les moulins à vent',author:'Miguel de Cervantès',work:'Don Quichotte de la Manche (1605)',sourceType:'public_domain',
 chapterLinks:['fr5z'],difficulty:6,minutes:3,
 sourceReference:'Adaptation libre et abrégée pour la 5e de l’épisode des moulins, d’après Cervantès (mort en 1616), dans le domaine public — rédigée directement en français, aucune traduction existante reprise.',
 teacherNotes:'Œuvre de culture générale : l’expression « se battre contre des moulins à vent » vient de cet épisode.',
 paragraphs:[
  'Dans un village de la Manche, en Espagne, vivait un gentilhomme qui avait tant lu de romans de chevalerie qu’il en perdit la raison. Il se crut chevalier errant, se fit appeler Don Quichotte, enfila une vieille armure et monta sur son cheval maigre, Rossinante.',
  'Il prit pour écuyer un paysan simple et bavard, Sancho Panza, et les deux hommes partirent à l’aventure. Don Quichotte voyait partout des exploits à accomplir ; Sancho, lui, voyait surtout les repas qu’il manquait.',
  'Un matin, ils aperçurent dans la plaine une trentaine de grands moulins à vent. « Quelle chance ! s’écria Don Quichotte. Regarde ces géants démesurés : je vais les combattre et les anéantir. » Sancho eut beau protester : « Ce ne sont pas des géants, ce sont des moulins ! »',
  'Mais le chevalier ne l’écoutait plus. Il baissa sa lance, éperonna Rossinante et chargea le premier moulin. Au même instant, le vent se leva et fit tourner les grandes ailes. La lance se brisa net, et le cheval et son cavalier furent projetés au sol.',
  'Sancho accourut. « Ne vous l’avais-je pas dit ? gémit-il. C’étaient bien des moulins. » Don Quichotte se releva, couvert de poussière, mais sans perdre sa foi. « Un enchanteur jaloux les a transformés en moulins pour me priver de ma victoire », déclara-t-il gravement.',
  'Cette scène a rendu l’œuvre célèbre. Aujourd’hui encore, on dit « se battre contre des moulins à vent » pour parler d’un combat inutile contre des ennemis imaginaires.'
 ],
 glossary:[{word:'chevalier errant',definition:'Chevalier qui voyage seul pour chercher des aventures et défendre les faibles.'},{word:'écuyer',definition:'Jeune homme ou serviteur qui accompagne un chevalier.'},{word:'anéantir',definition:'Détruire complètement.'},{word:'éperonna',definition:'Piqua son cheval avec les éperons pour le faire avancer plus vite.'},{word:'enchanteur',definition:'Magicien qui peut jeter des sorts.'}],
 questions:[
  ch('q1','CH,CC',4,'Pourquoi le gentilhomme se prend-il pour un chevalier ?',['Il a trop lu de romans de chevalerie','Il a hérité d’une armure ancienne de son père','Le roi d’Espagne lui a donné ce titre'],0,0,'Le texte l’explique dès le début : ses lectures l’ont rendu fou. Il croit vivre dans les récits qu’il aime.'),
  ch('q2','CH,IN',4,'Quelle différence principale oppose Don Quichotte à Sancho Panza ?',['L’un rêve d’exploits, l’autre pense à ses repas','Don Quichotte est paysan alors que Sancho est chevalier','Don Quichotte est prudent alors que Sancho est téméraire'],0,1,'« Don Quichotte voyait partout des exploits à accomplir ; Sancho, lui, voyait surtout les repas qu’il manquait. » Ils se complètent et s’opposent.'),
  ch('q3','IN,AI',5,'Que voit réellement Don Quichotte quand il regarde la plaine ?',['De vrais géants menaçants qui l’attendent','Des moulins qu’il prend pour des géants','Une armée ennemie rangée en bataille'],1,2,'Il transforme les moulins en géants. Sancho, lui, voit la réalité : « ce sont des moulins ».'),
  ev('q4','JU,SQ',4,'Quel paragraphe raconte la chute de Don Quichotte ?',3,'Au paragraphe 4, le vent fait tourner les ailes, la lance se brise et le cavalier est projeté au sol.'),
  ch('q5','CC',4,'Pourquoi la lance de Don Quichotte se brise-t-elle ?',['Elle était déjà fendue avant le combat','Le vent fait tourner les ailes du moulin','Sancho la lui arrache des mains pour l’arrêter'],1,3,'Don Quichotte frappe le moulin, mais le vent met les ailes en mouvement et la lance se brise.'),
  ch('q6','EM,AI',5,'Quel effet produit l’explication de Don Quichotte (« un enchanteur jaloux… ») ?',['Elle fait sourire : il ne veut pas reconnaître son erreur','Elle prouve qu’il a raison','Elle fait pleurer Sancho'],0,4,'Il invente une excuse magique pour ne pas admettre qu’il s’est trompé : c’est comique et révèle sa folie.'),
  ch('q7','NP',4,'À quelle personne le récit est-il raconté ?',['À la 1ʳᵉ personne, par Sancho Panza lui-même','À la 3ᵉ personne, par un narrateur','À la 2ᵉ personne, en s’adressant au lecteur'],1,0,'Le récit parle de « il » et de « Don Quichotte » : le narrateur est extérieur à l’histoire.'),
  ch('q8','VO',4,'Que signifie « anéantir » dans « les combattre et les anéantir » ?',['Détruire complètement','Féliciter chaleureusement','Effrayer légèrement'],0,2,'Don Quichotte veut non seulement battre les « géants », mais les détruire entièrement.'),
  od('q9','SQ',3,'Remets les moments de l’épisode dans l’ordre.',['Don Quichotte aperçoit les moulins','Sancho proteste','Don Quichotte charge le premier moulin','Il accuse un enchanteur'],'L’épisode suit une progression : vision, protestation, charge, chute puis excuse.'),
  ch('q10','MI,AI',6,'Que signifie l’expression « se battre contre des moulins à vent » ?',['Lutter inutilement contre un ennemi imaginaire','Combattre un adversaire beaucoup trop fort pour soi','Travailler toute sa vie dans un moulin à vent'],0,5,'Le texte explique lui-même l’expression : un combat inutile contre des ennemis qui n’existent que dans l’imagination.'),
  ch('q11','AI,GE',6,'Quelle est l’intention principale de Cervantès dans cet épisode ?',['Faire rire en opposant rêve et réalité','Enseigner comment fabriquer un moulin à vent','Faire peur aux enfants avec des géants'],0,4,'Le décalage entre ce que voit Don Quichotte et la réalité provoque le rire, tout en faisant réfléchir sur l’imagination et la folie.'),
  ch('q12','RF',4,'Dans « Ne vous l’avais-je pas dit ? », que remplace « l’ » ?',['Que ce sont des moulins','La lance qui s’est brisée','Le cheval qui est tombé'],0,4,'Sancho rappelle ce qu’il avait annoncé : ce ne sont pas des géants, mais des moulins.')
 ]});

//@@MORE@@

})();
