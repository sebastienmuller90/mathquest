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
  ch('q13','RF',4,'Dans « Pour les user, il ronge sans cesse du bois », que remplace « les » ?',['Les incisives','Les arbres du bord de l’étang','Les branches du barrage'],0,1,'On use ses dents : « les » reprend « les incisives », qui viennent d’être citées.'),
  od('q14','ST,SQ',3,'Remets dans l’ordre les sujets abordés par le texte.',['Le castor et son alimentation','Ses dents et le bois','Le barrage et l’étang','Les difficultés avec les humains'],'Le texte présente d’abord l’animal, puis ses dents, ses constructions, leurs bienfaits et enfin les conflits avec les humains.')
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
 chapterLinks:['fr5h','fr5m'],difficulty:5,minutes:3,
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
  ch('q13','JU,AR',7,'Quelle citation justifie le mieux que le phare est désintéressé ?',['« Il ne demande ni salaire / Ni couronne, ni souvenir »','« Les vagues le frappent sans trêve, / Mais il ne s’est jamais penché »','« Quand la nuit tombe sur la plage, / Il ouvre un grand œil de lumière »'],0,8,'Le phare refuse toute récompense : ces deux vers sont la preuve la plus directe de son désintéressement.'),
  od('q14','ST,SQ',4,'Remets dans l’ordre les idées développées par les trois strophes.',['Le phare résiste aux vagues','Il guide les bateaux la nuit','Il ne demande aucune récompense'],'Strophe 1 : sa résistance. Strophe 2 : son rôle de guide dans la nuit. Strophe 3 : son désintéressement.')
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

/* ===== 4e ===== */

R({id:'fr_4e_deposition_police_01',level:'4e',documentType:'récit policier',title:'La déposition de Mme Pellerin',sourceType:'original_mathquest',
 chapterLinks:['fr4o'],difficulty:5,minutes:3,
 sourceReference:'Texte original Finot Académie. Les personnages et l’enquête sont imaginaires.',
 teacherNotes:'Texte propice à comparer discours direct (guillemets, verbes de parole) et discours indirect (que, si, changement de pronoms et de temps).',
 paragraphs:[
  'Le commissaire Vasseur ouvrit son carnet. Devant lui, Mme Pellerin, la boulangère, se tordait les mains. « Racontez-moi simplement ce que vous avez vu, dit-il. »',
  'Elle expliqua qu’elle avait fermé la boutique à dix-neuf heures, comme chaque soir. Elle ajouta qu’elle avait entendu un bruit de verre brisé du côté de la cour, et qu’elle s’était approchée sans allumer la lumière.',
  '« J’ai vu un homme escalader le mur, murmura-t-elle. Il portait une casquette sombre. Il s’est retourné et j’ai cru que mon cœur s’arrêtait. »',
  'Le commissaire lui demanda si elle pourrait le reconnaître. Elle hésita, puis répondit qu’elle n’en était pas sûre : il faisait nuit, et l’homme avait le visage caché par son col relevé.',
  '« Rien d’autre ? insista Vasseur. — Si, une odeur, dit-elle. Une odeur de peinture fraîche. » Le commissaire sourit : il se rappelait que M. Loiseau, le voisin, repeignait sa clôture en vert ce soir-là.'
 ],
 glossary:[{word:'commissaire',definition:'Policier chargé de diriger une enquête.'},{word:'escalader',definition:'Grimper par-dessus un obstacle, comme un mur.'},{word:'col',definition:'Partie d’un vêtement qui entoure le cou.'}],
 questions:[
  ch('q1','EX,CH',2,'Quel est le métier de Mme Pellerin ?',['Elle est couturière dans le quartier','Elle est boulangère','Elle est infirmière à l’hôpital'],1,0,'Le texte la présente comme « Mme Pellerin, la boulangère ». Elle ferme sa boutique chaque soir à dix-neuf heures.'),
  ev('q2','ST,JU',4,'Quel paragraphe est entièrement au discours direct ?',2,'Le paragraphe 3 ne contient que les paroles de Mme Pellerin entre guillemets, avec une incise (« murmura-t-elle »).'),
  ch('q3','ST,GE',4,'Dans « Elle ajouta qu’elle avait entendu un bruit de verre brisé », qu’est-ce qui montre le discours indirect ?',['Les guillemets placés autour de la phrase entière','Le verbe de parole « ajouta » suivi de « que »','Le point d’exclamation final de la phrase'],1,1,'Au discours indirect, il n’y a pas de guillemets : un verbe de parole est suivi de « que », et la phrase devient une subordonnée.'),
  ch('q4','ST',5,'Comment rapporter au discours indirect : « J’ai cru que mon cœur s’arrêtait » (elle murmura) ?',['Elle murmura qu’elle avait cru que son cœur s’arrêtait.','Elle murmura que j’ai cru que mon cœur s’arrêtait vraiment.','Elle murmura : qu’elle a cru que son cœur s’arrête toujours.'],0,2,'« Je » devient « elle », « mon » devient « son », et le passé composé se transforme en plus-que-parfait après un verbe introducteur au passé.'),
  ch('q5','IN,CC',5,'Pourquoi Mme Pellerin n’est-elle pas sûre de pouvoir reconnaître l’homme ?',['Il faisait nuit et son col cachait son visage','Elle l’a déjà vu plusieurs fois dans le quartier','Elle avait perdu ses lunettes en fermant la boutique'],0,3,'Le texte donne deux raisons : « il faisait nuit » et le visage était caché par un col relevé.'),
  ch('q6','EM,IN',4,'Que montre le geste de Mme Pellerin, qui « se tordait les mains » ?',['Qu’elle est nerveuse et inquiète','Qu’elle a froid dans le bureau','Qu’elle est en colère contre le commissaire'],0,0,'Se tordre les mains est un geste d’anxiété : le témoin revit une scène qui lui a fait peur.'),
  ch('q7','AI,GE',5,'Quel effet produit le discours direct au paragraphe 3 ?',['Il ralentit le récit pour expliquer la loi','Il rend le témoignage plus vivant','Il résume toute l’enquête en une seule phrase'],1,2,'En citant ses paroles exactes, l’auteur fait entendre la voix du témoin et la peur ressentie.'),
  ev('q8','JU,CC',4,'Quel paragraphe montre le commissaire qui insiste pour obtenir un détail de plus ?',4,'Au paragraphe 5, il demande « Rien d’autre ? » : cette insistance révèle l’odeur de peinture.'),
  tx('q9','EX,IN',3,'De quelle couleur M. Loiseau repeignait-il sa clôture ? (un mot)',['vert','en vert','verte'],4,'Le commissaire se rappelle que le voisin « repeignait sa clôture en vert ce soir-là ».'),
  ch('q10','IN,AI',6,'Pourquoi le commissaire sourit-il à la fin ?',['Il voit un lien possible avec le voisin','Il est sûr que Mme Pellerin ment depuis le début','Il est heureux que l’affaire soit enfin terminée ce soir'],0,4,'L’odeur de peinture fraîche rappelle la clôture repeinte : le commissaire tient une piste, sans pour autant avoir de preuve.'),
  od('q11','SQ',3,'Remets les faits dans l’ordre où Mme Pellerin les a vécus.',['Elle ferme la boutique','Elle entend du verre brisé','Elle voit un homme escalader le mur','Elle sent une odeur de peinture'],'Le récit de Mme Pellerin suit l’ordre : fermeture, bruit, vision de l’homme, puis le détail de l’odeur.'),
  ch('q12','ST,VO',5,'Dans « Le commissaire lui demanda si elle pourrait le reconnaître », quelle est la forme de la question rapportée ?',['Une question directe avec point d’interrogation','Une interrogative indirecte avec « si »','Une phrase exclamative qui exprime la surprise'],1,3,'La question n’est pas posée telle quelle : elle est rapportée après « demanda » avec « si », sans point d’interrogation.')
 ]});

R({id:'fr_4e_livreur_registres_01',level:'4e',documentType:'scène de théâtre (comédie originale)',title:'Le colis de Mme Ducasse',sourceType:'original_mathquest',
 chapterLinks:['fr4p'],difficulty:5,minutes:3,
 sourceReference:'Dialogue de théâtre original Finot Académie. Les personnages sont imaginaires.',
 paragraphs:[
  'Scène 1. Le salon de Mme Ducasse, une dame élégante. On sonne. Elle ouvre la porte à un livreur pressé.',
  'LE LIVREUR. — Salut m’dame ! J’ai un colis pour vous, mais c’est lourd, j’vous préviens, j’me suis pété le dos pour monter vos cinq étages !',
  'MME DUCASSE. — Je vous prie de bien vouloir modérer votre langage, Monsieur. Je ne me souviens pas d’avoir commandé un colis aussi encombrant.',
  'LE LIVREUR. — Ben, c’est écrit là : « Ducasse, étage cinq ». Pas de souci, hein, j’vous le pose là et on n’en parle plus.',
  'MME DUCASSE, ouvrant le carton. — Mon Dieu ! Un buste en plâtre de Napoléon ! Il y a manifestement une méprise : cet objet est destiné à ma voisine, Mme Ducasse-Martin, qui demeure au sixième étage.',
  'LE LIVREUR. — Oh là là, la galère ! Faut que j’remonte avec ça ? Mince alors, j’vais finir par y laisser mes vertèbres !',
  'MME DUCASSE. — Rassurez-vous, mon ami. Je vais vous prêter un chariot, et je vous offrirai un rafraîchissement pour votre peine.',
  'LE LIVREUR. — Ça, c’est sympa ! Merci, m’dame, vous êtes une perle !',
  'MME DUCASSE, souriant malgré elle. — C’est à moi de vous remercier, Monsieur : vous m’avez fait rire, ce qui est rare un lundi matin.'
 ],
 glossary:[{word:'modérer',definition:'Rendre moins fort ou moins excessif.'},{word:'encombrant',definition:'Qui prend beaucoup de place et gêne.'},{word:'méprise',definition:'Erreur qui consiste à prendre une chose ou une personne pour une autre.'},{word:'rafraîchissement',definition:'Boisson fraîche que l’on offre à quelqu’un.'}],
 questions:[
  ch('q1','GE,CH',3,'Quel registre de langue le livreur emploie-t-il ?',['Familier','Soutenu','Courant et neutre'],0,1,'« Salut m’dame », « j’me suis pété le dos », « la galère » : mots familiers et phrases abrégées.'),
  ch('q2','GE,CH',3,'Quel registre de langue Mme Ducasse emploie-t-elle ?',['Familier, comme entre jeunes amis','Soutenu, avec des formules polies','Argotique, avec des mots inventés par elle'],1,2,'« Je vous prie de bien vouloir modérer votre langage » est une formule polie et soignée, caractéristique du registre soutenu.'),
  ev('q3','JU,GE',4,'Quelle réplique du livreur contient l’expression familière « la galère » ?',5,'La réplique du paragraphe 6 contient « la galère » et « mince alors ».'),
  ch('q4','VO,GE',4,'Quelle phrase de Mme Ducasse pourrait remplacer « Il y a une erreur » en registre soutenu ?',['« Y a eu un petit bug, quoi, c’est tout ! »','« Il y a manifestement une méprise. »','« Ouais, c’est pas le bon colis, c’est tout ! »'],1,4,'« Une méprise » est un mot soutenu pour « une erreur », et « manifestement » ajoute une nuance élégante.'),
  ch('q5','CC,IN',4,'Quelle est la cause de la confusion ?',['Le livreur s’est trompé de rue dans la ville','Le colis est pour une voisine au nom proche','Mme Ducasse a oublié qu’elle avait commandé'],1,4,'Le colis est pour Mme Ducasse-Martin, au sixième étage : le nom ressemble à celui de Mme Ducasse, au cinquième.'),
  ch('q6','AI,GE',5,'Où se trouve le comique dans cette scène ?',['Dans le contraste entre deux langages','Dans une longue course-poursuite sur la scène','Dans les déguisements ridicules des personnages'],0,1,'Le comique naît du décalage entre le langage relâché du livreur et la politesse très soignée de Mme Ducasse.'),
  ch('q7','EM,IN',5,'Comment Mme Ducasse réagit-elle quand le livreur proteste ?',['Elle le renvoie sèchement hors de chez elle','Elle est aimable et propose son aide','Elle porte elle-même le buste jusqu’au sixième'],1,6,'Elle le rassure (« Rassurez-vous, mon ami »), lui prête un chariot et lui offre à boire : elle est aimable malgré ses manières.'),
  ch('q8','IN,AI',6,'Que montre la dernière réplique de Mme Ducasse ?',['Que le registre soutenu empêche toujours d’être aimable avec les autres','Qu’une relation chaleureuse peut naître malgré les différences','Qu’elle se moque du livreur jusqu’à la fin de la scène'],1,8,'Elle remercie le livreur et reconnaît qu’il l’a fait rire : les deux personnages se rapprochent malgré leurs différences.'),
  od('q9','SQ',3,'Remets les événements de la scène dans l’ordre.',['Le livreur sonne à la porte','Mme Ducasse découvre un buste de Napoléon','Elle comprend qu’il y a une erreur','Elle prête un chariot au livreur'],'La scène va de l’arrivée du livreur à la découverte du buste, puis à l’explication, enfin à la solution proposée.'),
  ch('q10','VO',4,'Que signifie « encombrant » dans « un colis aussi encombrant » ?',['Très précieux et très fragile, à manipuler avec soin','Qui prend beaucoup de place et gêne','Très ancien, fabriqué il y a bien longtemps'],1,2,'Un colis encombrant est volumineux et difficile à manipuler, ce que confirme le livreur en parlant de dos et de vertèbres.'),
  ch('q11','GE,ST',5,'Pourquoi un auteur de théâtre donne-t-il à ses personnages des façons de parler différentes ?',['Pour caractériser chaque personnage','Pour rendre le texte plus facile à apprendre','Pour économiser des mots et raccourcir la pièce'],0,1,'Le registre de langue est un moyen de portrait : on comprend d’emblée qui est le livreur et qui est la dame élégante.'),
  ch('q12','GE,VO',5,'Dans « j’vous le pose là », quelle caractéristique du registre familier observe-t-on ?',['Des mots avalés (« j’vous »)','Un vocabulaire scientifique et très précis','Des phrases très longues et très construites'],0,3,'À l’oral familier, certaines lettres ou syllabes disparaissent : « je vous » devient « j’vous ».')
 ]});

R({id:'fr_4e_chevre_seguin_01',level:'4e',documentType:'conte (adaptation)',title:'La chèvre de M. Seguin',author:'Alphonse Daudet',work:'Lettres de mon moulin (1869)',sourceType:'public_domain',
 chapterLinks:['fr4q'],difficulty:6,minutes:3,
 sourceReference:'Adaptation libre et abrégée pour la 4e, d’après Alphonse Daudet (mort en 1897), dans le domaine public.',
 teacherNotes:'Texte propice à observer les valeurs de l’imparfait (habitude, description), du passé simple (actions), du plus-que-parfait (antériorité) et du présent de vérité générale (« aucune chèvre ne bat le loup »).',
 paragraphs:[
  'M. Seguin n’avait jamais eu de chance avec ses chèvres. Il les perdait toutes de la même manière : un beau matin, elles rompaient leur corde et s’en allaient dans la montagne, où le loup les mangeait.',
  'Il avait déjà perdu six chèvres quand il en acheta une septième, Blanquette, toute jeune pour mieux la dresser. Elle était la plus jolie : des yeux doux, une barbiche noire, des sabots rayés et de longs poils blancs.',
  'Mais bientôt, Blanquette s’ennuya. Elle regardait la montagne et soupirait : « Que l’air doit être bon là-haut ! » M. Seguin voulut la guérir de cette envie : il l’enferma dans l’étable. Elle sortit par la fenêtre.',
  'Dans la montagne, ce fut une fête. Elle goûta l’herbe fine, sauta par-dessus les rochers, but à la source. Jamais elle n’avait été aussi libre. Quand le soir tomba, la montagne devint violette et le froid la fit frissonner.',
  'Soudain, un bruit dans les broussailles : c’était le loup. Il ne se pressait pas, car il savait que la petite chèvre était à lui. Blanquette décida de se battre, non pour gagner — aucune chèvre ne bat le loup — mais pour tenir jusqu’à l’aube.',
  'Toute la nuit, elle lutta. Quand les premières lueurs du jour parurent, un coq chanta dans la vallée. « Enfin ! » dit la pauvre bête, qui attendait l’aube pour mourir. Elle s’allongea, son beau pelage taché de sang. Alors le loup la mangea.'
 ],
 glossary:[{word:'barbiche',definition:'Petite touffe de poils sous le menton d’une chèvre ou d’un homme.'},{word:'étable',definition:'Bâtiment où l’on abrite les animaux d’élevage.'},{word:'broussailles',definition:'Buissons et plantes sauvages qui poussent serrés.'},{word:'lueurs',definition:'Lumières faibles ou qui commencent à apparaître.'}],
 questions:[
  ch('q1','ST,GE',5,'Dans « elles rompaient leur corde et s’en allaient », que marque l’imparfait ?',['Une action brève et soudaine','Une habitude qui se répète','Une action qui se produira plus tard'],1,0,'L’imparfait d’habitude montre que le même scénario se répétait pour toutes les chèvres de M. Seguin.'),
  ch('q2','ST,GE',5,'Dans « Il avait déjà perdu six chèvres quand il en acheta une septième », pourquoi le plus-que-parfait ?',['Pour marquer une action antérieure à l’achat','Pour décrire en détail l’aspect de Blanquette','Pour annoncer un événement qui se produira plus tard'],0,1,'Le plus-que-parfait exprime une action passée accomplie avant une autre action passée (l’achat, au passé simple).'),
  ch('q3','CH,EX',3,'Comment est Blanquette ?',['Une chèvre âgée, grise, fatiguée et sans énergie','La plus jolie, aux yeux doux et aux longs poils','Une chèvre sauvage, agressive et très méfiante'],1,1,'Le texte la décrit à l’imparfait : « des yeux doux, une barbiche noire, des sabots rayés et de longs poils blancs ».'),
  ch('q4','CC',4,'Pourquoi Blanquette s’ennuie-t-elle ?',['Elle est malade depuis quelques jours','Elle rêve de la montagne et de sa liberté','Elle manque d’herbe fraîche dans son enclos'],1,2,'Elle regarde la montagne et soupire : elle a envie d’air pur et de liberté.'),
  ch('q5','ST,GE',5,'Dans « Dans la montagne, ce fut une fête », que fait le passé simple ?',['Il décrit un décor immobile et sans action','Il présente un événement achevé','Il exprime une vérité générale valable toujours'],1,3,'Le passé simple raconte les événements qui s’enchaînent : la fuite, la fête, l’arrivée du loup.'),
  ch('q6','ST,GE',6,'Dans « aucune chèvre ne bat le loup », quelle valeur a le présent ?',['Une action en train de se produire maintenant','Une vérité générale, valable en tout temps','Un souvenir du passé'],1,4,'Le narrateur sort du récit pour énoncer une règle valable toujours : ce présent « de vérité générale » prépare le dénouement.'),
  ev('q7','JU,SQ',4,'Quel paragraphe raconte l’arrivée du loup ?',4,'Le paragraphe 5 commence par « Soudain, un bruit dans les broussailles : c’était le loup. »'),
  ch('q8','EM,IN',5,'Pourquoi Blanquette se bat-elle toute la nuit, sachant qu’elle ne peut pas gagner ?',['Elle veut tenir jusqu’à l’aube','Elle croit pouvoir vaincre le loup','Elle attend que M. Seguin vienne la chercher'],0,4,'Elle décide de se battre « non pour gagner mais pour tenir jusqu’à l’aube » : elle choisit le courage plutôt que la fuite.'),
  ch('q9','IN,AI',6,'Quel dilemme le conte met-il en scène ?',['Entre sécurité et liberté','Entre travail le jour et repos la nuit','Entre ville animée et campagne tranquille'],0,2,'Blanquette a la sécurité de l’étable, mais veut la liberté de la montagne, où le danger existe.'),
  ch('q10','AI,MI',6,'Quelle lecture du conte est la plus juste ?',['Il condamne uniquement le loup, cause de tout','Il montre le prix de la liberté sans juger','Il enseigne qu’il faut toujours obéir à son maître'],1,5,'Le narrateur raconte la fin tragique sans blâmer Blanquette, dont le courage est admirable : le conte laisse le lecteur réfléchir.'),
  od('q11','SQ',3,'Remets les étapes dans l’ordre.',['M. Seguin achète Blanquette','Blanquette s’échappe par la fenêtre','Le loup apparaît au soir','Le coq chante dans la vallée'],'Achat, ennui, fuite, rencontre avec le loup au soir, puis combat jusqu’à l’aube.'),
  ch('q12','VO',4,'Que signifie « lueurs » dans « les premières lueurs du jour » ?',['De faibles clartés du matin','Des nuages sombres qui annoncent la pluie','Des cris d’oiseaux qui annoncent le jour'],0,5,'Les lueurs sont des clartés faibles : elles annoncent l’aube, que Blanquette attendait.')
 ]});

R({id:'fr_4e_lettre_maire_01',level:'4e',type:'document',documentType:'lettre argumentative (imaginaire)',title:'Une lettre à Madame le Maire',sourceType:'original_mathquest',
 chapterLinks:['fr4r'],difficulty:5,minutes:3,audioMode:'audioOptional',
 sourceReference:'Document original Finot Académie. La lettre, la commune, le collège et l’élève sont imaginaires, inventés pour l’exercice.',
 paragraphs:[
  'Madame le Maire,',
  'Je suis élève de 4e au collège des Tilleuls et je vous écris au sujet de la rue qui mène à notre établissement. Chaque matin, des dizaines de voitures s’y croisent au moment où nous arrivons à pied ou à vélo.',
  'Si cette rue devenait piétonne entre 8 heures et 8 h 30, nous serions plus en sécurité. Les parents qui déposent leurs enfants pourraient se garer sur le parking de la mairie, à deux minutes à pied.',
  'On pourrait objecter que les commerçants perdraient des clients. Mais si les trottoirs étaient plus calmes, les passants s’arrêteraient peut-être plus volontiers devant les vitrines. Je ne sais pas si les résultats seraient identiques chez nous, mais un essai de trois mois permettrait de le vérifier.',
  'Si vous acceptiez cet essai, notre classe serait prête à compter les voitures avant et après, pour mesurer l’effet réel. Nous vous présenterions les résultats lors d’un conseil municipal.',
  'Dans l’attente de votre réponse, je vous prie d’agréer, Madame le Maire, l’expression de mes respectueuses salutations. — Jade Morel, classe de 4eC'
 ],
 glossary:[{word:'piétonne',definition:'Réservée aux piétons, sans circulation de voitures.'},{word:'objecter',definition:'Opposer un argument contraire à ce qui vient d’être dit.'},{word:'établissement',definition:'Ici, école ou collège.'},{word:'essai',definition:'Expérience de courte durée pour voir si une idée fonctionne.'}],
 questions:[
  ch('q1','DS,GE',3,'À qui la lettre est-elle adressée, et pourquoi ?',['À la directrice du collège, pour demander un congé','À la maire, pour proposer une rue piétonne','Aux parents d’élèves, pour les informer d’une réunion'],1,0,'La lettre s’ouvre sur « Madame le Maire » et propose de fermer la rue du collège aux voitures à certaines heures.'),
  ch('q2','MI,AR',4,'Quelle est la proposition de Jade ?',['Interdire toutes les voitures dans toute la ville','Rendre la rue piétonne de 8 h à 8 h 30','Construire un nouveau parking près du collège'],1,2,'Elle demande que la rue soit piétonne « entre 8 heures et 8 h 30 », au moment de l’arrivée des élèves.'),
  ch('q3','AR,CC',4,'Quel est le premier argument de Jade ?',['La sécurité des élèves','Le prix des places de parking','L’esthétique de la rue et des trottoirs'],0,2,'« Nous serions plus en sécurité » : la sécurité est le premier bénéfice annoncé.'),
  ch('q4','ST,GE',5,'Dans « Si cette rue devenait piétonne, nous serions plus en sécurité », quels temps sont employés ?',['Imparfait puis conditionnel présent','Présent dans les deux propositions de la phrase','Futur dans la subordonnée, imparfait dans la principale'],0,2,'Pour une hypothèse peu probable ou à examiner : « si + imparfait » (devenait), puis conditionnel présent (serions).'),
  ch('q5','AR,ST',5,'Quelle objection Jade prévoit-elle ?',['Les commerçants perdraient des clients','Les voitures pollueraient encore davantage la rue','Les élèves arriveraient souvent en retard'],0,3,'« On pourrait objecter que les commerçants perdraient des clients » : elle devance une critique pour y répondre.'),
  ch('q6','AR,IN',6,'Comment Jade répond-elle à cette objection ?',['Elle l’ignore complètement et change de sujet','Elle propose un essai de trois mois','Elle accuse les commerçants de mauvaise foi'],1,3,'Elle reconnaît qu’elle ne sait pas si les résultats seraient identiques, et propose une vérification par un essai : c’est une réponse honnête et mesurée.'),
  ev('q7','JU,AR',4,'Quel paragraphe montre que les élèves sont prêts à s’engager ?',4,'Au paragraphe 5, la classe propose de compter les voitures avant et après l’essai, et de présenter les résultats.'),
  ch('q8','GE,AI',4,'À quoi sert la dernière phrase (« je vous prie d’agréer… ») ?',['À donner un argument supplémentaire','À terminer la lettre poliment','À poser une question à la maire'],1,5,'C’est la formule de politesse finale, conforme à une lettre adressée à une autorité.'),
  ch('q9','ST,GE',5,'Pourquoi le conditionnel convient-il dans cette lettre ?',['Parce que les actions ne sont pas encore réalisées','Parce que Jade raconte des souvenirs de sa petite enfance','Parce que Jade donne des ordres précis à la maire et aux élus'],0,2,'Le conditionnel exprime ici une action seulement possible, qui dépend de la décision de la maire. Il rend aussi le ton plus poli.'),
  ch('q10','AI,AR',6,'Quelle est l’intention principale de Jade ?',['Convaincre la maire d’essayer','Se plaindre du bruit des voisins','Raconter son trajet du matin à vélo'],0,4,'Elle expose un problème, propose une solution, prévoit une objection et offre de mesurer les effets : sa démarche est argumentée et constructive.'),
  ch('q11','VO',4,'Que signifie « piétonne » dans « devenait piétonne » ?',['Réservée aux piétons','Réservée aux seuls vélos','Fermée définitivement à tous'],0,2,'Une rue piétonne est réservée à ceux qui marchent : les voitures n’y circulent pas.'),
  od('q12','ST,SQ',3,'Remets les parties de la lettre dans l’ordre.',['Présentation du problème','Proposition (la rue piétonne)','Réponse à une objection','Formule de politesse'],'La lettre suit un plan clair : problème, solution, objection prévue, puis salutations finales.')
 ]});

R({id:'fr_4e_passerelle_passif_01',level:'4e',documentType:'article de presse (imaginaire)',title:'La passerelle du Moulin est rouverte',sourceType:'original_mathquest',
 chapterLinks:['fr4t'],difficulty:5,minutes:3,type:'document',
 sourceReference:'Document original Finot Académie. L’article, la commune, la passerelle et les chiffres cités sont imaginaires, inventés pour l’exercice.',
 teacherNotes:'Texte propice à observer la voix passive (sujet = ce qui subit l’action) et la possibilité de taire ou de préciser l’agent (complément d’agent avec « par »).',
 paragraphs:[
  'La passerelle du Moulin, fermée depuis deux ans, a été rouverte samedi au public. Construite en 1932 par des ouvriers de la commune, elle avait été jugée dangereuse après une inspection.',
  'Les travaux ont été confiés à une entreprise locale. Les poutres rongées par l’humidité ont été remplacées, et un nouveau garde-corps a été installé par les apprentis du lycée professionnel.',
  'Lors de l’inauguration, le maire a été applaudi par une centaine d’habitants. Il a rappelé que le projet avait été voté à l’unanimité par le conseil municipal, après une pétition signée par plus de quatre cents personnes.',
  'Certains riverains regrettent cependant que le chantier ait duré plus longtemps que prévu. « Nous avons été privés de notre raccourci pendant un hiver entier », déplore un habitant.',
  'La passerelle sera éclairée le soir par des lampes solaires. Une plaque rappellera aussi les noms des ouvriers qui l’ont construite.'
 ],
 glossary:[{word:'passerelle',definition:'Petit pont réservé aux piétons.'},{word:'garde-corps',definition:'Barrière qui protège de la chute, sur un pont ou un balcon.'},{word:'inauguration',definition:'Cérémonie pour ouvrir officiellement un lieu ou un équipement.'},{word:'pétition',definition:'Texte signé par de nombreuses personnes pour demander quelque chose aux autorités.'},{word:'riverains',definition:'Personnes qui habitent à proximité d’un lieu.'}],
 questions:[
  ch('q1','MI,EX',3,'De quoi parle principalement l’article ?',['De la réouverture d’une passerelle','De la construction d’un nouveau stade','D’une inondation dans tout le village'],0,0,'Le titre et la première phrase annoncent que la passerelle du Moulin est rouverte après réparation.'),
  ch('q2','TI,EX',3,'Depuis combien de temps la passerelle était-elle fermée ?',['Depuis deux ans','Depuis dix ans','Depuis une semaine'],0,0,'La première phrase dit : « fermée depuis deux ans ».'),
  ch('q3','ST,GE',4,'Quelle phrase est à la voix passive ?',['Une entreprise locale a repeint toutes les poutres usées.','Les travaux ont été confiés à une entreprise locale.','Le maire a rappelé le projet voté par le conseil.'],1,1,'« Ont été confiés » = auxiliaire être + participe passé : le sujet « les travaux » subit l’action.'),
  ch('q4','ST,GE',5,'Dans « un nouveau garde-corps a été installé par les apprentis », quel est le complément d’agent ?',['Un nouveau garde-corps pour la passerelle du Moulin','Par les apprentis du lycée professionnel','A été installé il y a quelques jours déjà'],1,1,'Le complément d’agent, introduit par « par », indique qui fait l’action : les apprentis.'),
  ch('q5','ST,AI',5,'Dans « Les travaux ont été confiés à une entreprise locale », pourquoi le journaliste n’a-t-il pas écrit qui a donné cet ordre ?',['L’agent est inconnu ou peu important','Il a simplement oublié de le préciser','Il veut cacher une information interdite'],0,1,'Le passif permet de ne pas nommer l’auteur de l’action quand l’important est le résultat (ici, les travaux).'),
  ch('q6','CC,EX',4,'Pourquoi la passerelle avait-elle été fermée ?',['Elle avait été jugée dangereuse','Elle était devenue beaucoup trop petite','Elle avait été détruite par un incendie'],0,0,'Le texte dit : « elle avait été jugée dangereuse après une inspection ».'),
  ev('q7','JU,AR',5,'Quel paragraphe exprime une critique de certains habitants ?',3,'Le paragraphe 4 rapporte les regrets des riverains : le chantier a duré plus longtemps que prévu.'),
  ch('q8','AI,DS',5,'Pourquoi l’article cite-t-il un habitant entre guillemets ?',['Pour donner la parole à un témoin','Pour inventer un fait intéressant à raconter','Pour allonger l’article de quelques lignes'],0,3,'Une citation donne un point de vue extérieur à celui du journaliste : elle apporte de la nuance et de la vérité à l’information.'),
  tx('q9','EX',3,'En quelle année la passerelle a-t-elle été construite ? (un nombre)',['1932'],0,'Le texte précise : « Construite en 1932 par des ouvriers de la commune ».'),
  ch('q10','ST,GE',5,'Dans « La passerelle sera éclairée le soir par des lampes solaires », à quel temps et à quelle voix est le verbe ?',['Futur simple, voix passive','Présent de l’indicatif, voix active','Imparfait de l’indicatif, voix passive'],0,4,'« Sera éclairée » = verbe être au futur + participe passé : c’est un passif au futur simple.'),
  od('q11','SQ',3,'Remets ces événements dans l’ordre chronologique.',['La passerelle est construite','La passerelle est jugée dangereuse','Les poutres sont remplacées','La passerelle est rouverte'],'Construction (1932), inspection, travaux, puis réouverture au public.'),
  ch('q12','VO',4,'Que signifie « riverains » dans « Certains riverains regrettent » ?',['Des habitants proches de la passerelle','Des ouvriers qui travaillent sur la rivière et la berge','Des élèves du lycée qui ont réparé la passerelle'],0,3,'Les riverains vivent le long ou à proximité d’un lieu et sont directement concernés par les travaux.')
 ]});

R({id:'fr_4e_devoirs_argument_01',level:'4e',type:'document',documentType:'texte argumentatif',title:'Faut-il supprimer les devoirs à la maison ?',sourceType:'original_mathquest',
 chapterLinks:['fr4y'],difficulty:6,minutes:3,
 sourceReference:'Texte argumentatif original Finot Académie.',
 paragraphs:[
  'Faut-il supprimer les devoirs à la maison ? Beaucoup d’élèves en rêvent, et certains enseignants s’interrogent. Pourtant, je soutiens qu’il faut les conserver, à condition de les alléger.',
  'Premier argument : les devoirs aident à retenir. Une leçon vue en classe s’oublie en quelques jours si on ne la revoit pas. Relire le soir ce qu’on a appris le matin, c’est comme arroser une plante : sans eau, elle se dessèche.',
  'Deuxième argument : ils apprennent à s’organiser. Planifier son travail, estimer le temps nécessaire, choisir par quoi commencer sont des compétences utiles bien au-delà de l’école. Un élève qui n’a jamais appris à le faire seul découvrira tard cette difficulté.',
  'On objecte souvent que les devoirs creusent les inégalités : tous les élèves ne disposent pas d’un endroit calme ni d’un adulte pour les aider. Cette objection est juste, mais elle ne conduit pas à supprimer les devoirs : elle invite à les faire en partie au collège, dans des salles d’étude encadrées.',
  'Enfin, rien n’oblige à ce que les devoirs soient longs. Vingt minutes bien choisies valent mieux que deux heures de recopiage.',
  'En conclusion, supprimer les devoirs serait une solution trop radicale. Mieux vaut les réduire, les rendre plus utiles et permettre à tous de les faire dans de bonnes conditions.'
 ],
 glossary:[{word:'planifier',definition:'Organiser à l’avance ce qu’on doit faire et quand.'},{word:'objecte',definition:'Oppose un argument contraire (verbe objecter).'},{word:'inégalités',definition:'Différences injustes entre des personnes, par exemple dans leurs conditions de travail.'},{word:'radicale',definition:'Très forte, qui change tout d’un coup.'},{word:'encadrées',definition:'Surveillées et aidées par des adultes.'}],
 questions:[
  ch('q1','AR,MI',4,'Quelle est la thèse de l’auteur ?',['Il faut supprimer tous les devoirs de la semaine','Conserver les devoirs, en les allégeant','Les devoirs doivent être plus longs qu’aujourd’hui'],1,0,'La thèse est énoncée dès l’introduction : « je soutiens qu’il faut les conserver, à condition de les alléger ».'),
  ch('q2','AR',4,'Quel est le premier argument ?',['Les devoirs aident à retenir','Les devoirs sont toujours agréables','Les devoirs rapportent toujours des points'],0,1,'« Premier argument : les devoirs aident à retenir. » Il est suivi d’une explication et d’une comparaison.'),
  ch('q3','AR,ST',5,'Que compare l’auteur à « arroser une plante » ?',['La relecture d’une leçon','Le travail en équipe des élèves','L’achat de fournitures scolaires'],0,1,'Comme une plante a besoin d’eau régulièrement, une leçon a besoin d’être revue pour ne pas se dessécher, c’est-à-dire s’oublier.'),
  ch('q4','AR',4,'Quel est le deuxième argument ?',['Les devoirs apprennent à s’organiser','Les devoirs remplacent la classe entière','Les devoirs amusent beaucoup les élèves'],0,2,'Le paragraphe 3 annonce : « Deuxième argument : ils apprennent à s’organiser ».'),
  ev('q5','JU,AR',5,'Quel paragraphe présente l’objection que l’auteur va réfuter ?',3,'Le paragraphe 4 commence par « On objecte souvent… » et expose le problème des inégalités.'),
  ch('q6','AR,IN',6,'Comment l’auteur réfute-t-il l’objection des inégalités ?',['Il nie que les inégalités existent entre les élèves','Il l’admet mais propose des salles d’étude','Il propose d’augmenter la quantité de devoirs à la maison'],1,3,'Il admet la valeur de l’objection (« Cette objection est juste »), mais propose une solution plutôt que la suppression.'),
  ch('q7','ST,AR',5,'À quoi servent « Premier argument », « Deuxième argument », « Enfin » ?',['À organiser les arguments','À annoncer la conclusion du texte','À poser des questions au lecteur'],0,1,'Ces mots structurent le raisonnement et guident le lecteur de l’un à l’autre.'),
  ch('q8','AR,AI',6,'Quel est le rôle de la phrase « Vingt minutes bien choisies valent mieux que deux heures de recopiage » ?',['Montrer que la qualité prime','Raconter une anecdote personnelle','Critiquer durement les enseignants'],0,4,'Elle appuie la thèse « alléger » : mieux vaut peu de devoirs utiles que beaucoup de devoirs mécaniques.'),
  ch('q9','MI,ST',5,'Que fait l’auteur dans la conclusion ?',['Il reprend sa thèse et conclut','Il change complètement d’avis','Il pose une nouvelle objection au lecteur'],0,5,'Il redit que supprimer les devoirs serait « radical » et propose : les réduire, les rendre utiles, aider tous les élèves.'),
  ch('q10','VO',4,'Que signifie « radicale » dans « une solution trop radicale » ?',['Très brutale, qui supprime tout','Très économique pour toutes les familles','Très ancienne, venue d’un autre siècle'],0,5,'Le mot s’oppose à la solution mesurée proposée : alléger, plutôt que tout supprimer.'),
  ch('q11','AI,AR',6,'L’auteur est-il pour ou contre la suppression des devoirs ?',['Contre la suppression, pour une réforme','Pour la suppression immédiate de tous les devoirs','Sans avis précis sur toute la question des devoirs'],0,5,'Sa position est nuancée : il refuse la suppression, mais veut changer le contenu et la quantité des devoirs.'),
  od('q12','ST,SQ',3,'Remets les parties du texte dans l’ordre.',['Question posée et thèse','Premier argument','Objection et réfutation','Conclusion'],'Le plan classique : thèse, arguments, objection réfutée, puis conclusion.')
 ]});

R({id:'fr_4e_brouillon_revision_01',level:'4e',type:'document',documentType:'brouillon et version corrigée (document imaginaire)',title:'Du premier jet à la version finale',sourceType:'original_mathquest',
 chapterLinks:['fr4z'],difficulty:6,minutes:3,audioMode:'audioOptional',
 sourceReference:'Document original Finot Académie. Camille, son brouillon et la remarque de la professeure sont imaginaires, inventés pour l’exercice.',
 paragraphs:[
  'Consigne : décrire en quelques lignes un lieu que l’on aime. Voici le premier jet de Camille, puis sa version réécrite.',
  'Premier jet. — Mon grenier est un endroit super. Il y a plein de trucs dedans. C’est grand et c’est vieux. J’aime y aller parce que c’est sympa et on y est tranquille. Il y a une fenêtre et on voit des choses.',
  'Remarques de la professeure. — Vocabulaire trop vague (« super », « trucs », « sympa », « choses »). Pas de sensations. Répétitions de « il y a » et de « c’est ». Précise ce que l’on voit, entend, sent.',
  'Version réécrite. — Mon grenier sent la poussière chaude et le vieux bois. Sous la charpente s’entassent des malles cabossées, un manège de chevaux en carton et les cartes postales de mon arrière-grand-père. Quand le vent souffle, les tuiles craquent comme des os.',
  'Par la lucarne, je distingue les toits de l’école et, au loin, la colline couverte de pins. Je m’y réfugie quand j’ai besoin de silence : ici, personne ne me cherche, et le temps semble ralentir.',
  'Ce que Camille a changé. — Elle a remplacé les mots vagues par des mots précis, ajouté des sensations (odeur, bruit, vue), varié ses débuts de phrase et expliqué pourquoi le lieu compte pour elle.'
 ],
 glossary:[{word:'charpente',definition:'Ensemble des poutres qui soutiennent le toit.'},{word:'cabossées',definition:'Abîmées, couvertes de bosses.'},{word:'lucarne',definition:'Petite fenêtre percée dans un toit.'},{word:'réfugie',definition:'Se met à l’abri (verbe se réfugier).'}],
 questions:[
  ch('q1','MI,DS',3,'Quel est le but de ce document ?',['Montrer comment améliorer un texte','Raconter l’histoire d’un grenier hanté','Comparer deux maisons de campagne anciennes'],0,0,'Le document met côte à côte un premier jet, les remarques d’une professeure et une version améliorée.'),
  ch('q2','CMP,VO',4,'Quels mots du premier jet la professeure juge-t-elle trop vagues ?',['« grenier », « fenêtre », « grand » et « vieux »','« super », « trucs », « sympa » et « choses »','« grand », « vieux », « tranquille » et « fenêtre »'],1,2,'Ces mots ne disent pas précisément ce qu’on voit ou ressent. La professeure les cite dans ses remarques.'),
  ch('q3','CMP,VO',5,'Par quoi Camille remplace-t-elle « plein de trucs » dans la version réécrite ?',['Par des objets précis, malles et cartes postales','Par « beaucoup de choses » dans un grand désordre','Par un long point d’exclamation et des majuscules'],0,3,'Elle nomme des objets concrets : « des malles cabossées, un manège de chevaux en carton et les cartes postales ».'),
  ev('q4','JU,CMP',4,'Quel paragraphe contient les remarques de la professeure ?',2,'Le paragraphe 3, intitulé « Remarques de la professeure », liste les défauts du premier jet.'),
  ch('q5','CMP,IN',5,'Quelles sensations Camille ajoute-t-elle ?',['L’odorat et l’ouïe, ajoutés par Camille','Uniquement le goût des aliments du grenier','Uniquement le toucher des objets anciens'],0,3,'Elle fait sentir la poussière et le bois, et entendre les tuiles qui craquent : deux sens absents du premier jet.'),
  ch('q6','GE,VO',6,'Que signifie la comparaison « les tuiles craquent comme des os » ?',['Les tuiles du grenier sont faites d’os de bêtes','Le bruit des tuiles ressemble à celui d’os','Les tuiles sont blanches comme des os, très pâles'],1,3,'La comparaison relie deux éléments par « comme » : elle fait entendre un bruit sec, un peu inquiétant, et donne de l’atmosphère au lieu.'),
  ch('q7','CMP,ST',5,'Quelle répétition la professeure critique-t-elle dans le premier jet ?',['« il y a » et « c’est »','« grenier » et « vent »','« poussière » et « bois »'],0,2,'Ces tournures reviennent trop souvent et appauvrissent le style ; la version finale emploie des verbes plus variés (sent, s’entassent, craquent).'),
  ch('q8','EM,IN',5,'Pourquoi Camille aime-t-elle se réfugier dans son grenier ?',['Elle y trouve du silence','Elle y retrouve tous ses amis du collège','Elle y fait toujours ses devoirs en silence'],0,4,'Elle écrit : « j’ai besoin de silence : ici, personne ne me cherche, et le temps semble ralentir ».'),
  ch('q9','CMP,AI',6,'Qu’apporte la dernière partie de la version finale (« Je m’y réfugie… ») ?',['Une dimension personnelle sur le lieu','Une description technique de la charpente du toit','Une liste de consignes pour les élèves'],0,4,'Le premier jet disait seulement « J’aime y aller parce que c’est sympa ». La version finale explique le sentiment.'),
  od('q10','SQ,ST',3,'Remets ces étapes du travail d’écriture dans l’ordre.',['Écrire un premier jet','Relire avec les remarques','Réécrire avec des mots précis','Vérifier la version finale'],'On écrit, on relit avec un regard critique, on réécrit, puis on vérifie : c’est la démarche de la révision.'),
  ch('q11','VO',4,'Que signifie « cabossées » dans « des malles cabossées » ?',['Abîmées, couvertes de bosses','Très lourdes à porter jusqu’au grenier','Remplies de jouets et de vieux livres'],0,3,'Une malle cabossée a reçu des chocs et porte des bosses : elle suggère le temps passé.'),
  ch('q12','MI,AI',6,'Quelle idée générale illustre ce document ?',['Réécrire rend un texte plus précis et vivant','Il vaut mieux ne jamais corriger un premier jet','Un texte court est toujours meilleur qu’un texte long'],0,5,'La dernière partie résume les changements : mots précis, sensations, variété, explication du sentiment.')
 ]});

R({id:'fr_4e_pauvres_gens_01',level:'4e',documentType:'récit (adaptation d’un poème narratif)',title:'Les pauvres gens',author:'Victor Hugo',work:'La Légende des siècles (1859)',sourceType:'public_domain',
 chapterLinks:['fr4b'],difficulty:6,minutes:3,
 sourceReference:'Adaptation libre en prose et abrégée pour la 4e, d’après le poème de Victor Hugo (mort en 1885), dans le domaine public.',
 paragraphs:[
  'Une nuit d’hiver, la tempête hurlait sur la côte. Jeannie, la femme d’un pêcheur, veillait au chevet de ses cinq enfants endormis. Son mari était en mer, par ce temps terrible, et elle priait pour son retour.',
  'Vers minuit, elle prit une lanterne et un manteau : sa voisine, une veuve malade, vivait seule non loin de là avec deux petits, et Jeannie voulait lui porter un peu de soupe. Elle marcha dans le vent, le cœur serré.',
  'La porte de la cabane de la voisine était entrouverte. Dans la pièce glacée, la pauvre femme gisait sur son lit, morte, le visage calme. Près d’elle, deux jeunes enfants dormaient, ignorant tout.',
  'Jeannie hésita longtemps. Elle pensa à son mari qui rentrerait épuisé, aux cinq bouches à nourrir, à la misère de leur maison. Puis, sans un mot, elle enveloppa les deux enfants dans son manteau et les emporta.',
  'Chez elle, elle les coucha dans son propre lit et tira les rideaux. Puis elle s’assit, tremblante : « Que dira mon homme ? Nous étions déjà si pauvres ! Il sera peut-être en colère. Mais je ne pouvais pas les laisser là. »',
  'Au petit jour, le pêcheur rentra, trempé, les mains vides : la mer ne lui avait rien donné. Jeannie lui dit en baissant la tête qu’elle avait recueilli les orphelins. Il resta silencieux, puis dit d’une voix douce : « Tu as bien fait. Ils sont à nous maintenant. » Elle écarta alors le rideau.'
 ],
 glossary:[{word:'veuve',definition:'Femme dont le mari est mort.'},{word:'gisait',definition:'Était étendue sans bouger (verbe gésir).'},{word:'recueilli',definition:'Accueilli chez soi par charité (verbe recueillir).'},{word:'orphelins',definition:'Enfants dont les parents sont morts.'}],
 questions:[
  ch('q1','CH,EX',2,'Qui est Jeannie ?',['La femme d’un pêcheur','Une riche commerçante de la ville','Une infirmière du petit village'],0,0,'Le premier paragraphe la présente comme « la femme d’un pêcheur » qui veille sur ses cinq enfants.'),
  ch('q2','CC,IN',4,'Pourquoi Jeannie sort-elle en pleine nuit ?',['Pour porter de la soupe à sa voisine','Pour aller chercher son mari qui rentre du port','Pour fuir la tempête qui menace la maison'],0,1,'Le texte dit qu’elle « voulait lui porter un peu de soupe » : la voisine est veuve et malade.'),
  ev('q3','JU,SQ',4,'Quel paragraphe révèle ce que Jeannie découvre chez sa voisine ?',2,'Au paragraphe 3, elle trouve la voisine morte et ses deux enfants endormis.'),
  ch('q4','EM,IN',5,'À quoi Jeannie pense-t-elle pendant qu’elle hésite ?',['À sa pauvreté et aux bouches à nourrir','À un long voyage qu’elle rêve de faire un jour','À la couleur de la lanterne qu’elle porte'],0,3,'Elle pense à son mari fatigué, aux cinq bouches à nourrir, à la misère : chaque enfant en plus est une charge.'),
  ch('q5','CH,IN',6,'Que montre sa décision d’emporter les enfants ?',['Une grande générosité','De l’égoïsme et de l’indifférence','Une envie de voyager loin de chez elle'],0,3,'Elle ne parle pas de sacrifice : elle agit, malgré la peur de manquer.'),
  ch('q6','EM,IN',5,'Pourquoi Jeannie est-elle « tremblante » en attendant son mari ?',['Elle craint sa réaction','Elle a trop chaud près du feu','Elle est furieuse contre lui depuis longtemps'],0,4,'Elle imagine que son mari pourrait être en colère : « Nous étions déjà si pauvres ! »'),
  ch('q7','IN,AI',6,'Que révèle la réaction du pêcheur (« Tu as bien fait ») ?',['Qu’il partage sa générosité','Qu’il n’a rien compris à la situation','Qu’il veut punir sa femme sévèrement'],0,5,'Malgré sa propre misère (il rentre « les mains vides »), il accepte aussitôt d’accueillir les orphelins.'),
  ch('q8','AI,GE',6,'Que veut montrer Hugo par ce récit ?',['Que les plus pauvres sont généreux','Que la tempête est très dangereuse sur la côte','Que la pêche est un beau métier mais difficile'],0,5,'Le titre « Les pauvres gens » prend un sens ironique et plein de respect : ceux qui ont le moins donnent le plus.'),
  od('q9','SQ',3,'Remets les événements dans l’ordre.',['La tempête gronde sur la côte','Jeannie découvre la voisine morte','Elle emporte les deux enfants chez elle','Son mari rentre au petit jour'],'Le récit va de la veillée à la visite chez la voisine, au retour avec les orphelins puis au dénouement.'),
  ch('q10','VO',4,'Que signifie « gisait » dans « la pauvre femme gisait sur son lit » ?',['Était étendue sans bouger','Chantait doucement près du lit','Se levait péniblement à minuit'],0,2,'« Gésir » se dit de quelqu’un d’allongé, immobile : ici, la voisine est morte.'),
  ch('q11','AI,IN',6,'Quelle atmosphère la tempête installe-t-elle au début ?',['Une atmosphère de danger','Une atmosphère joyeuse et chaleureuse','Une atmosphère indifférente et froide'],0,0,'La tempête « hurlait » et le mari est en mer : tout fait craindre un malheur, ce qui prépare la tension du récit.'),
  ch('q12','NP,GE',5,'À quelle personne ce récit est-il raconté ?',['À la 3ᵉ personne, par un narrateur','À la 1ʳᵉ personne, par Jeannie elle-même','À la 2ᵉ personne, en s’adressant au lecteur'],0,0,'Le texte dit « Jeannie », « elle », « il » : un narrateur extérieur rapporte les faits et les pensées de l’héroïne.')
 ]});

/* ===== 3e ===== */

R({id:'fr_3e_bovary_indirect_libre_01',level:'3e',documentType:'roman réaliste (extrait adapté)',title:'Emma s’ennuie à Tostes',author:'Gustave Flaubert',work:'Madame Bovary (1857)',sourceType:'public_domain',
 chapterLinks:['fr3p'],difficulty:7,minutes:3,
 sourceReference:'Adaptation libre et abrégée pour la 3e, d’après Gustave Flaubert (mort en 1880), dans le domaine public — scène réécrite pour illustrer le discours indirect libre.',
 teacherNotes:'Texte propice à repérer le discours indirect libre : pensées d’Emma rapportées sans verbe introducteur ni guillemets, avec questions et exclamations à la 3ᵉ personne et à l’imparfait.',
 paragraphs:[
  'Emma regardait la pluie tomber sur les toits de Tostes. Charles venait de partir faire ses visites, et la maison retrouvait son silence. Elle avait pourtant tout ce qu’une jeune femme de campagne pouvait souhaiter : un mari doux, une maison propre, un jardin.',
  'Mais était-ce donc cela, la vie ? Les jours se ressemblaient tous. Charles était bon, certes, mais sa conversation était plate comme un trottoir, et ses idées défilaient sans émotion ni surprise. Il ne rêvait de rien, il n’avait jamais rien désiré.',
  'Elle repensait au bal du château, quelques semaines plus tôt. Quel éclat ! Quelles robes, quelles lumières, quels hommes aux manières si polies ! Pourquoi n’était-elle pas née dans ce monde-là ? Pourquoi le destin l’avait-il placée dans cette maison grise où il ne se passait jamais rien ?',
  'Le soir, Charles rentra fatigué. Il lui raconta sa journée en mangeant sa soupe : un enfant malade, une jambe cassée, un fermier avare. Emma répondit à peine. Elle regardait sa main tenir la cuiller et pensait que ce n’était pas celle d’un homme capable de la sauver de l’ennui.',
  '« Tu ne dis rien ? demanda-t-il doucement. — Je suis fatiguée », répondit-elle. Il sourit, rassuré, et reprit sa soupe. Elle se leva, ouvrit la fenêtre et regarda la route vide. Quelqu’un viendrait-il, un jour, la chercher ?'
 ],
 glossary:[{word:'avare',definition:'Qui aime trop l’argent et déteste le dépenser.'},{word:'éclat',definition:'Ici, brillant, luxe qui attire le regard.'},{word:'destin',definition:'Ensemble des événements qui semblent décidés à l’avance pour une vie.'},{word:'ennui',definition:'Sentiment de vide et de lassitude quand rien ne nous intéresse.'}],
 questions:[
  ch('q1','CH,EM',4,'Quel sentiment domine chez Emma au début du texte ?',['La joie de vivre paisiblement à la campagne','Un ennui profond malgré le confort','La colère contre ses voisins du village'],1,0,'Elle a « tout ce qu’une jeune femme de campagne pouvait souhaiter », mais la maison silencieuse et la pluie traduisent son vide intérieur.'),
  ch('q2','ST,GE',6,'« Mais était-ce donc cela, la vie ? » : comment ces paroles sont-elles rapportées ?',['Au discours indirect libre : sans verbe introducteur','Au discours direct, entre guillemets, avec des tirets','Au discours indirect, avec le verbe « elle se demandait si »'],0,1,'La pensée d’Emma apparaît directement dans la narration, à la 3ᵉ personne, sans « elle pensa que ». C’est le discours indirect libre.'),
  ev('q3','JU,ST',6,'Quel paragraphe contient plusieurs questions qui expriment ce qu’Emma ressent sans l’annoncer ?',2,'Le paragraphe 3 enchaîne exclamations et questions (« Quel éclat ! », « Pourquoi n’était-elle pas née… ? ») : on entend sa pensée.'),
  ch('q4','AI,EM',7,'Quel est l’effet du discours indirect libre ?',['Il met le personnage à distance du lecteur et de l’auteur','Il fait entendre les pensées d’Emma dans la voix du narrateur','Il rend le texte beaucoup plus rapide à lire'],1,1,'Le lecteur partage les pensées du personnage, tout en gardant l’ironie ou la distance du narrateur, qui reste présent.'),
  ch('q5','CH,IN',6,'Que révèle la comparaison « plate comme un trottoir » ?',['Que Charles est drôle et très original à ses yeux','Que Charles manque de relief, aux yeux d’Emma','Que Charles aime les longues promenades en ville'],1,1,'Un trottoir est plat, uniforme : la conversation de Charles lui semble sans relief. La comparaison est ici le jugement sévère d’Emma.'),
  ch('q6','IN,EM',7,'Pourquoi Emma regrette-t-elle de ne pas être née « dans ce monde-là » ?',['Elle rêve du luxe entrevu au bal','Elle déteste les robes et les lumières des fêtes','Elle veut quitter définitivement son mari pour toujours'],0,2,'Le bal lui a montré une vie brillante qu’elle compare à sa maison grise, où « il ne se passait jamais rien ».'),
  ch('q7','NP,GE',6,'Quel regard le narrateur porte-t-il sur Emma ?',['Il partage entièrement ses rêves, sans aucun recul','Il garde une distance qui laisse voir ses illusions','Il se moque ouvertement d’elle et de son mari'],1,3,'Le narrateur rapporte ses pensées, mais laisse deviner le décalage entre ses attentes irréalistes et la réalité : c’est le réalisme de Flaubert.'),
  ch('q8','EX,CH',3,'Que raconte Charles pendant le dîner ?',['Sa journée de médecin','Un long voyage qu’il a fait à Paris','Les projets de sa femme pour l’été prochain'],0,3,'Il parle d’« un enfant malade, une jambe cassée, un fermier avare » : ce sont les visites d’un médecin de campagne.'),
  ch('q9','IN,EM',6,'Que montre la réponse « Je suis fatiguée » ?',['Qu’elle cache ce qu’elle ressent','Qu’elle est vraiment malade depuis plusieurs jours','Qu’elle a très faim après cette journée'],0,4,'Elle ne dit pas son ennui : Charles se satisfait de cette excuse. Entre eux, la communication est faible.'),
  ch('q10','IN,AI',7,'Que suggère la dernière question (« Quelqu’un viendrait-il… la chercher ? ») ?',['Elle attend que quelqu’un change sa vie','Elle attend impatiemment le retour de Charles','Elle veut prévenir ses parents de sa venue'],0,4,'Cette interrogation, rapportée au style indirect libre, montre son espoir d’être sauvée de l’ennui par quelqu’un d’extérieur.'),
  od('q11','SQ',3,'Remets les moments dans l’ordre.',['Emma regarde la pluie','Elle se souvient du bal','Charles rentre et dîne','Elle ouvre la fenêtre'],'Le texte va de la matinée de pluie au souvenir du bal, puis au dîner et à la fenêtre ouverte.'),
  ch('q12','VO',5,'Que signifie « avare » dans « un fermier avare » ?',['Qui aime trop l’argent','Qui est très généreux avec tout le monde','Qui est très malade depuis longtemps'],0,3,'Un avare garde son argent à tout prix. Le mot est péjoratif : le médecin le décrit sans sympathie.')
 ]});

R({id:'fr_3e_ficelle_temps_01',level:'3e',documentType:'nouvelle réaliste (adaptation)',title:'La Ficelle',author:'Guy de Maupassant',work:'La Ficelle (1883)',sourceType:'public_domain',
 chapterLinks:['fr3q'],difficulty:7,minutes:3,
 sourceReference:'Adaptation libre et très abrégée pour la 3e, d’après Guy de Maupassant (mort en 1893), dans le domaine public.',
 teacherNotes:'Texte propice à observer la concordance des temps : imparfait (circonstances), passé simple (actions), plus-que-parfait (antériorité), conditionnel et futur du passé dans le discours rapporté.',
 paragraphs:[
  'C’était jour de marché à Goderville. Maître Hauchecorne, un paysan normand, arrivait sur la place quand il aperçut à terre un petit bout de ficelle. Économe comme tous les gens de la campagne, il le ramassa soigneusement.',
  'Mais il remarqua alors que Maître Malandain, le bourrelier, avec qui il s’était brouillé autrefois, le regardait de sa porte. Honteux d’être surpris à ramasser une ficelle, il la cacha dans sa poche, puis fit semblant de chercher encore par terre.',
  'Vers midi, le crieur public annonça qu’un portefeuille contenant cinq cents francs avait été perdu sur la place. Peu après, Malandain, qui avait vu Hauchecorne, alla trouver le maire et lui dit que le paysan avait ramassé quelque chose.',
  'Le maire fit venir Hauchecorne et l’interrogea. Le paysan protesta : il n’avait trouvé qu’une ficelle. Il la sortit de sa poche, mais personne ne le crut. On se moqua de lui et l’on murmura sur son passage.',
  'Le lendemain, un valet de ferme rapporta le portefeuille, qu’il avait trouvé sur la route. Hauchecorne, soulagé, raconta partout son innocence. Mais plus il se défendait, moins on le croyait : on pensait qu’il avait fait rapporter le portefeuille par un complice.',
  'Il en tomba malade. Peu à peu, il s’affaiblit. À son lit de mort, il répétait encore : « Une toute petite ficelle… Une petite ficelle, la voilà, monsieur le maire. »'
 ],
 glossary:[{word:'bourrelier',definition:'Artisan qui fabrique des harnais et des objets en cuir pour les chevaux.'},{word:'brouillé',definition:'Devenu ennemi de quelqu’un après une dispute (se brouiller).'},{word:'crieur public',definition:'Personne chargée d’annoncer à voix haute les nouvelles dans un village.'},{word:'complice',definition:'Personne qui aide quelqu’un à commettre une faute ou un délit.'}],
 questions:[
  ch('q1','ST,GE',6,'Dans « C’était jour de marché », quelle est la valeur de l’imparfait ?',['Il décrit le cadre dans lequel l’histoire commence','Il raconte une action brève et déjà totalement terminée','Il exprime une vérité générale valable toujours'],0,0,'L’imparfait installe le cadre (le moment, le lieu) avant que les actions (au passé simple) ne démarrent.'),
  ch('q2','ST,GE',6,'Dans « il aperçut à terre un petit bout de ficelle », que marque le passé simple ?',['Une action brève qui fait avancer le récit','Une habitude du personnage au marché','Un événement qui se passera bien plus tard'],0,0,'« Aperçut » est une action brève, qui lance l’intrigue : on passe de la situation initiale à l’événement.'),
  ch('q3','ST,GE',7,'Dans « avec qui il s’était brouillé autrefois », que marque le plus-que-parfait ?',['Une action antérieure : la dispute est plus ancienne','Une action qui se déroule en même temps','Une action qui n’a pas encore eu lieu'],0,1,'La brouille précède le moment où Malandain le regarde : le plus-que-parfait la place dans un passé plus lointain.'),
  ch('q4','CC,IN',6,'Pourquoi Hauchecorne cache-t-il la ficelle ?',['Il a honte d’être vu ramassant un si petit objet','Il l’a volée à un autre paysan du marché','Il veut la vendre plus tard au bourrelier'],0,1,'Il est « honteux d’être surpris à ramasser une ficelle » devant son ancien ennemi : l’orgueil le pousse à se cacher.'),
  ch('q5','ST,GE',7,'Dans « le crieur public annonça qu’un portefeuille avait été perdu », pourquoi le plus-que-parfait (« avait été perdu ») ?',['La perte est antérieure à l’annonce','L’annonce est antérieure à la perte du portefeuille','Les deux événements sont exactement simultanés'],0,2,'Le portefeuille a été perdu avant que le crieur ne l’annonce. Après un verbe au passé, on emploie le plus-que-parfait pour une action antérieure.'),
  ev('q6','JU,CC',6,'Quel paragraphe montre que Malandain accuse Hauchecorne ?',2,'Au paragraphe 3, Malandain va trouver le maire pour lui dire que le paysan a ramassé quelque chose.'),
  ch('q7','IN,AI',7,'Pourquoi plus Hauchecorne se défend-il, moins on le croit ?',['Parce que son insistance paraît suspecte','Parce qu’il finit par avouer le vol au maire','Parce que le maire refuse de l’écouter encore'],0,4,'Les villageois pensent qu’il a fait rapporter le portefeuille par un complice. Son insistance prouve, à leurs yeux, sa culpabilité.'),
  ch('q8','EM,IN',6,'Que montre la phrase « Il en tomba malade » ?',['Une souffrance morale qui le détruit','Une maladie contagieuse venue du marché','Un simple rhume sans gravité'],0,5,'L’injustice et la honte le minent : c’est le poids de la réputation qui le tue, plus que la maladie.'),
  ch('q9','AI,MI',7,'Quelle est la leçon de la nouvelle ?',['Une rumeur peut détruire un innocent','Il faut toujours ramasser ce qui traîne par terre','Les maires sont toujours beaucoup trop sévères'],0,4,'Maupassant montre que l’opinion publique peut condamner sans preuve, et qu’une petite chose (une ficelle) peut devenir fatale.'),
  ch('q10','AI,GE',7,'Pourquoi les dernières paroles de Hauchecorne sont-elles tragiques ?',['Il se défend jusqu’à sa mort pour un objet dérisoire','Parce qu’il avoue enfin sa faute au maire du village','Parce qu’il pardonne enfin à Malandain avant de mourir'],0,5,'Le contraste entre la futilité de l’objet (« une toute petite ficelle ») et la gravité de la mort donne à la scène sa force ironique et tragique.'),
  od('q11','SQ',3,'Remets les événements dans l’ordre.',['Hauchecorne ramasse une ficelle','Le crieur annonce la perte d’un portefeuille','Le maire interroge Hauchecorne','Un valet rapporte le portefeuille'],'Le récit suit l’ordre chronologique : ficelle, annonce, interrogatoire, retour du portefeuille.'),
  ch('q12','VO',5,'Que signifie « complice » dans « un complice » ?',['Quelqu’un qui aide à commettre une faute','Quelqu’un qui enquête sur une affaire criminelle','Quelqu’un qui juge les accusés au tribunal'],0,4,'Les villageois soupçonnent que le paysan a fait rapporter le portefeuille par un complice pour échapper aux soupçons.')
 ]});

R({id:'fr_3e_tresor_conditionnel_01',level:'3e',type:'document',documentType:'article de presse (imaginaire)',title:'Un trésor découvert dans un champ ?',sourceType:'original_mathquest',
 chapterLinks:['fr3s'],difficulty:7,minutes:3,
 sourceReference:'Document original Finot Académie. L’article, le village de Saint-Aubrac, le trésor, le maire et les services cités sont imaginaires, inventés pour l’exercice.',
 teacherNotes:'Texte propice à observer le conditionnel journalistique (information non confirmée) et le conditionnel d’hypothèse (« si… était avérée, … devrait »).',
 paragraphs:[
  'Un trésor médiéval aurait été découvert la semaine dernière dans un champ près de Saint-Aubrac, selon plusieurs habitants du village. Un agriculteur, qui souhaite rester anonyme, aurait mis au jour un coffre contenant des pièces d’argent et des bijoux.',
  'Selon une source proche du dossier, la valeur de l’ensemble s’élèverait à plusieurs centaines de milliers d’euros. Les pièces dateraient du XIVe siècle, mais aucun expert n’a encore pu les examiner.',
  'Contactée par notre rédaction, la mairie ne confirme ni ne dément. « Nous avons été informés de rumeurs, indique le maire, mais aucun élément officiel ne nous a été transmis. » Le service régional d’archéologie affirme pour sa part n’avoir reçu aucune déclaration de découverte.',
  'La loi impose pourtant de déclarer toute trouvaille archéologique. Si la découverte était avérée, l’agriculteur devrait la signaler sans délai, faute de quoi il s’exposerait à des sanctions.',
  'Plusieurs habitants affirment avoir vu des camionnettes inconnues sur le chemin la nuit dernière. Mais rien ne prouve, à ce stade, qu’il s’agisse du trésor : la prudence s’impose.',
  'Notre rédaction publiera de nouvelles informations dès que celles-ci auront été vérifiées auprès de sources officielles.'
 ],
 glossary:[{word:'anonyme',definition:'Dont on ne connaît pas ou dont on ne donne pas le nom.'},{word:'dément',definition:'Affirme que quelque chose est faux (verbe démentir).'},{word:'archéologie',definition:'Science qui étudie les civilisations anciennes à partir des objets et des vestiges retrouvés.'},{word:'avérée',definition:'Confirmée, reconnue comme vraie.'}],
 questions:[
  ch('q1','MI,AI',5,'Quelle information principale l’article rapporte-t-il ?',['Une découverte possible, non confirmée','La confirmation officielle d’un trésor médiéval','Un vol d’objets précieux dans un musée'],0,0,'Le premier mot du journal est « aurait été découvert » : l’information est présentée comme une rumeur.'),
  ch('q2','ST,GE',6,'Que signifie le conditionnel dans « aurait été découvert » ?',['Une hypothèse : le fait n’est pas confirmé','Un fait certain, vérifié par plusieurs experts','Un souhait personnel du journaliste'],0,0,'Le conditionnel journalistique signale que le journaliste rapporte une information sans pouvoir la garantir.'),
  ch('q3','DS,CC',6,'D’où viennent les informations de l’article ?',['D’habitants et d’une source non vérifiée','D’un rapport officiel signé par les archéologues','D’un communiqué de la police locale et du maire'],0,1,'Le texte cite « plusieurs habitants » et « une source proche du dossier », mais aucune source officielle.'),
  ev('q4','JU,DS',6,'Quel paragraphe montre que les autorités ne confirment pas la rumeur ?',2,'Au paragraphe 3, la mairie ne confirme ni ne dément et le service d’archéologie dit n’avoir reçu aucune déclaration.'),
  ch('q5','ST,GE',7,'Dans « Si la découverte était avérée, l’agriculteur devrait la signaler », que marque le conditionnel ?',['La conséquence d’une hypothèse','Un fait passé tout à fait certain','Un ordre direct donné à l’agriculteur'],0,3,'Après « si + imparfait », le conditionnel présent exprime ce qui se passerait si l’hypothèse était vraie : elle ne l’est pas encore.'),
  ch('q6','AI,ST',7,'Pourquoi le journaliste conclut-il par « la prudence s’impose » ?',['Pour inviter à ne pas prendre la rumeur pour un fait','Pour annoncer un danger imminent aux habitants','Pour donner un conseil de sécurité aux promeneurs'],0,4,'Il rappelle qu’aucune preuve n’est apportée : un bon journaliste distingue ce qui est vérifié de ce qui ne l’est pas.'),
  ch('q7','DS,AR',7,'Quel est l’intérêt d’interroger la mairie et le service d’archéologie ?',['Recouper l’information avec des sources officielles','Embellir l’histoire pour attirer plus de lecteurs','Faire peur aux habitants du village'],0,2,'Interroger plusieurs sources permet de vérifier : ici, aucune ne confirme, ce qui conduit à la prudence.'),
  ch('q8','IN,AI',7,'Que peut-on déduire de l’absence de déclaration au service d’archéologie ?',['Soit rien n’a eu lieu, soit rien n’a été déclaré','Que le trésor a déjà été retrouvé par les experts','Que le maire cache volontairement la vérité à tous'],0,2,'Deux hypothèses restent ouvertes : l’article ne tranche pas, et le lecteur doit rester prudent.'),
  ch('q9','ST,VO',6,'Dans « les pièces dateraient du XIVe siècle », que montre le conditionnel ?',['La datation n’est pas encore vérifiée','Le XIVe siècle est un siècle qui n’est pas encore arrivé','Le journaliste donne un ordre aux archéologues'],0,1,'Aucun expert n’a examiné les pièces : la datation est une supposition.'),
    ch('q10','DS,AR',7,'Laquelle de ces phrases relève de la rumeur, et non du fait vérifié ?',['« Un agriculteur aurait mis au jour un coffre. »','« La loi impose de déclarer toute trouvaille archéologique. »','« La mairie ne confirme ni ne dément. »'],0,0,'Le conditionnel « aurait mis au jour » signale une information non confirmée. Les deux autres phrases décrivent des faits vérifiables : une obligation légale et la position de la mairie.'),
  od('q11','SQ,ST',3,'Remets les parties de l’article dans l’ordre.',['Annonce de la rumeur','Valeur supposée et datation','Réactions de la mairie et de l’archéologie','Appel à la prudence'],'L’article suit un plan : rumeur, détails non confirmés, vérifications, conclusion prudente.'),
  ch('q12','VO',5,'Que veut dire « avérée » dans « Si la découverte était avérée » ?',['Confirmée comme vraie','Inventée de toutes pièces','Très ancienne, du Moyen Âge'],0,3,'Une information avérée est établie par des preuves. Ici, l’hypothèse n’est pas prouvée.')
 ]});

R({id:'fr_3e_vote_obligatoire_01',level:'3e',type:'document',documentType:'texte argumentatif',title:'Faut-il rendre le vote obligatoire ?',sourceType:'original_mathquest',
 chapterLinks:['fr3v','fr3m'],difficulty:8,minutes:4,
 sourceReference:'Texte argumentatif original Finot Académie.',
 teacherNotes:'Texte propice à travailler les connecteurs logiques (cause, conséquence, opposition, concession) et le lexique de l’argumentation.',
 paragraphs:[
  'En France, le vote n’est pas obligatoire : chaque citoyen décide d’aller voter ou de rester chez lui. Or, lors de certaines élections, plus d’un électeur sur deux ne se déplace pas. Faut-il alors rendre le vote obligatoire ? Je soutiens que non, bien que cette idée ait de sérieux défenseurs.',
  'Les partisans de l’obligation avancent d’abord que voter est un devoir civique. En effet, une démocratie fonctionne mieux lorsque le plus grand nombre participe aux décisions. Par conséquent, imposer le vote garantirait des résultats plus représentatifs.',
  'Cet argument est sérieux, mais il présente une faille. Car obliger à voter ne revient pas à donner envie de voter. Certains citoyens, contraints de se déplacer, voteraient blanc ou au hasard, ce qui ne rendrait pas le résultat plus juste. Autrement dit, la participation augmenterait, mais pas forcément la qualité du choix.',
  'De plus, la liberté de s’abstenir est elle-même une façon de s’exprimer. Un électeur qui reste chez lui envoie parfois un message de défiance. Sanctionner ce silence reviendrait donc à faire taire une opinion.',
  'Cependant, refuser l’obligation ne signifie pas se résigner à l’abstention. Il existe d’autres moyens d’encourager la participation : faciliter les procurations, expliquer davantage les enjeux dès le collège, rendre les bureaux de vote plus accessibles. Ces solutions respectent la liberté tout en réduisant l’indifférence.',
  'En conclusion, rendre le vote obligatoire serait une réponse trop simple à un problème complexe. Il vaut mieux convaincre que contraindre.'
 ],
 glossary:[{word:'civique',definition:'Qui concerne les droits et les devoirs d’un citoyen.'},{word:'représentatifs',definition:'Qui reflètent fidèlement l’opinion de l’ensemble des citoyens.'},{word:'abstenir',definition:'Ne pas participer à un vote (s’abstenir).'},{word:'défiance',definition:'Manque de confiance envers quelqu’un ou une institution.'},{word:'procurations',definition:'Autorisations données à quelqu’un de voter à sa place.'}],
 questions:[
  ch('q1','AR,MI',5,'Quelle est la thèse de l’auteur ?',['Le vote ne doit pas être rendu obligatoire','Le vote doit être obligatoire pour tous','Le vote doit être réservé à certains citoyens'],0,0,'« Je soutiens que non » : il refuse l’obligation de voter, tout en reconnaissant que l’idée a des défenseurs.'),
  ch('q2','AR',5,'Quel est le principal argument des partisans de l’obligation ?',['Voter est un devoir qui rend les résultats représentatifs','Voter coûte moins cher qu’un autre mode de désignation','Voter est un plaisir que tous les citoyens partagent'],0,1,'« Une démocratie fonctionne mieux lorsque le plus grand nombre participe » : l’obligation rendrait les résultats plus représentatifs.'),
  ch('q3','AR,ST',6,'Que signifie le connecteur « Par conséquent » au paragraphe 2 ?',['Il introduit une conséquence','Il introduit une opposition','Il introduit un exemple concret'],0,1,'« Par conséquent » relie une cause (le devoir civique) à son résultat (des résultats plus représentatifs).'),
  ch('q4','AR,ST',6,'Dans « Cet argument est sérieux, mais il présente une faille », que fait l’auteur ?',['Il reconnaît une part de vérité avant de réfuter','Il approuve complètement cet argument des partisans','Il change brusquement de sujet de discussion'],0,2,'C’est une concession : il admet que l’argument est sérieux, puis introduit son objection avec « mais ».'),
  ev('q5','JU,AR',6,'Quel paragraphe défend la liberté de s’abstenir ?',3,'Le paragraphe 4 soutient que l’abstention est une façon de s’exprimer.'),
  ch('q6','AR,IN',7,'Pourquoi l’auteur dit-il que sanctionner l’abstention reviendrait à « faire taire une opinion » ?',['Parce que s’abstenir peut exprimer de la défiance','Parce que les abstentionnistes sont toujours d’accord','Parce que la loi interdit de voter blanc'],0,3,'Selon lui, ne pas voter peut être un message. Punir ce silence reviendrait à punir une opinion.'),
  ch('q7','AR,VO',6,'Quel connecteur de ce texte marque l’opposition ?',['« Cependant »','« Par conséquent »','« De plus »'],0,4,'« Cependant » introduit une idée qui s’oppose à ce qui précède : refuser l’obligation ne veut pas dire accepter l’abstention.'),
  ch('q8','AR,VO',6,'À quoi sert le connecteur « De plus » ?',['À ajouter un argument','À conclure le texte entier','À poser une question au lecteur'],0,3,'« De plus » est un connecteur d’addition : il empile les arguments dans le même sens.'),
  ch('q9','AR,ST',7,'Dans « bien que cette idée ait de sérieux défenseurs », quel mode suit « bien que » ?',['Le subjonctif','L’indicatif','Le conditionnel'],0,0,'« Bien que » exprime la concession et se construit avec le subjonctif : « ait ».'),
  ch('q10','AR,AI',8,'Quelle est la stratégie de l’auteur dans le paragraphe 5 ?',['Il propose des solutions qui respectent la liberté','Il abandonne sa thèse pour rejoindre ses adversaires','Il attaque personnellement ses adversaires politiques'],0,4,'Refuser l’obligation ne suffit pas : il propose des solutions concrètes pour encourager la participation.'),
  ch('q11','MI,ST',7,'Quelle phrase résume le mieux la conclusion ?',['Convaincre vaut mieux que contraindre','Il faut contraindre pour mieux convaincre','Il ne faut absolument rien changer ici'],0,5,'La dernière phrase condense la thèse : encourager plutôt qu’obliger.'),
  od('q12','ST,SQ',4,'Remets les étapes du raisonnement dans l’ordre.',['Question et thèse','Argument des adversaires','Réfutation par l’auteur','Solutions de rechange et conclusion'],'Le plan : thèse, argument adverse, réfutation, solutions puis conclusion.'),
  ch('q13','VO',6,'Que signifie « défiance » dans « un message de défiance » ?',['Un manque de confiance','Une grande joie collective','Une colère violente et soudaine'],0,3,'La défiance est le contraire de la confiance : l’électeur qui s’abstient peut vouloir montrer qu’il ne croit plus aux responsables.')
 ]});

R({id:'fr_3e_connotation_mots_01',level:'3e',type:'document',documentType:'texte documentaire',title:'Maison, demeure, taudis : ce que les mots suggèrent',sourceType:'original_mathquest',
 chapterLinks:['fr3x'],difficulty:7,minutes:3,
 sourceReference:'Texte documentaire original Finot Académie.',
 paragraphs:[
  'Deux mots peuvent désigner la même réalité et produire pourtant des effets très différents. Ces effets viennent de la connotation : l’ensemble des sens secondaires, des sentiments et des images qu’un mot évoque en plus de sa définition. La définition, elle, s’appelle la dénotation.',
  'Prenons les mots « maison », « demeure », « taudis » et « chez-moi ». Tous désignent un lieu où l’on habite. Mais « maison » est neutre ; « demeure » évoque un lieu noble, parfois ancien et impressionnant ; « taudis » signale un logement misérable et insalubre ; « chez-moi » suggère l’intimité et l’attachement affectif.',
  'Le choix du mot n’est donc jamais innocent. Un journaliste qui écrit « un groupe de manifestants » ou « une horde de manifestants » ne donne pas la même image des mêmes personnes : le deuxième terme rappelle des animaux et suggère le désordre ou la violence.',
  'Les publicités jouent aussi avec ces nuances. Un vendeur qui appelle un appartement « cosy » ou « atypique » cherche à valoriser ce qui pourrait paraître petit ou étrange : « cosy » est plus chaleureux que « minuscule ».',
  'Pour repérer la connotation, on peut se demander : quels sentiments ce mot éveille-t-il ? Quelles images, quelles valeurs ? Existe-t-il d’autres mots plus neutres qui désigneraient la même chose ? La comparaison avec ces mots met en évidence le choix de l’auteur.',
  'Enfin, la connotation dépend aussi du contexte et du lecteur : le mot « pays » ne suscite pas les mêmes émotions chez quelqu’un qui l’a quitté et chez quelqu’un qui y a toujours vécu. Savoir lire les nuances, c’est mieux comprendre ce que l’on vous dit… et ce que l’on cherche à obtenir de vous.'
 ],
 glossary:[{word:'connotation',definition:'Sens secondaire, sentiment ou image qu’un mot évoque en plus de sa définition.'},{word:'dénotation',definition:'Sens précis d’un mot, tel qu’il est donné par le dictionnaire.'},{word:'insalubre',definition:'Malsain, qui peut nuire à la santé.'},{word:'atypique',definition:'Qui sort de l’ordinaire.'},{word:'horde',definition:'Groupe nombreux et désordonné, qui évoque des animaux ou des envahisseurs.'}],
 questions:[
  ch('q1','MI',5,'Quelle est l’idée principale du texte ?',['Le choix d’un mot influence l’image donnée','Tous les synonymes sont toujours interchangeables','Il faut éviter tous les mots à connotation'],0,2,'Le texte montre que des mots proches par le sens (dénotation) n’ont pas le même effet (connotation).'),
  ch('q2','VO,EX',5,'Quelle est la différence entre dénotation et connotation ?',['Sens précis d’un côté, sentiments et images ajoutés de l’autre','La dénotation est un mot rare, la connotation un mot courant','Aucune différence : ce sont deux synonymes parfaits'],0,0,'La dénotation est la définition ; la connotation est ce que le mot suggère en plus.'),
  ch('q3','VO,EX',5,'Parmi ces mots, lequel est neutre ?',['« Maison »','« Taudis »','« Demeure »'],0,1,'Le texte précise : « “maison” est neutre » ; les autres ajoutent un jugement.'),
  ch('q4','VO,IN',6,'Que suggère le mot « demeure » ?',['Un lieu noble et impressionnant','Un logement misérable et sale','Un endroit intime et chaleureux'],0,1,'« Demeure » évoque la grandeur, souvent un château ou une grande maison ancienne.'),
  ch('q5','IN,AI',7,'Pourquoi « horde de manifestants » n’a-t-il pas le même effet que « groupe de manifestants » ?',['« Horde » évoque des animaux et la violence','« Horde » est un mot plus court et plus simple','« Horde » est un mot plus précis et plus neutre'],0,2,'Le journaliste oriente l’opinion du lecteur : « horde » connote la menace, alors que « groupe » reste neutre.'),
  ev('q6','JU,DS',6,'Quel paragraphe prend l’exemple de la publicité ?',3,'Le paragraphe 4 explique comment « cosy » valorise un appartement qui pourrait sembler petit.'),
  ch('q7','AI,ST',6,'Pourquoi un vendeur dit-il « cosy » plutôt que « minuscule » ?',['Pour valoriser un défaut','Pour être plus honnête avec les clients','Pour parler plus simplement aux acheteurs'],0,3,'« Cosy » connote le confort et la chaleur ; « minuscule » insiste sur la petitesse.'),
  ch('q8','ST,AR',7,'Quelle question le texte conseille-t-il de se poser pour repérer une connotation ?',['Quels sentiments ce mot éveille-t-il ?','Combien de lettres et de syllabes ce mot a-t-il ?','Quel est l’âge exact de l’auteur du texte ?'],0,4,'La méthode consiste à observer les émotions et valeurs associées, puis à comparer avec des mots plus neutres.'),
  ch('q9','IN,AI',7,'Que montre l’exemple du mot « pays » dans le dernier paragraphe ?',['La connotation varie selon le lecteur','Le mot « pays » est toujours neutre pour tous','Un mot produit toujours le même effet sur tous'],0,5,'Celui qui a quitté son pays et celui qui n’en est jamais parti ne ressentent pas la même chose en lisant le mot.'),
  ch('q10','VO',6,'Que signifie « insalubre » dans « un logement misérable et insalubre » ?',['Malsain, mauvais pour la santé','Très cher et très luxueux pour la ville','Très lumineux et très bien chauffé en hiver'],0,1,'Un logement insalubre est humide, sale ou dangereux pour ses habitants. Le mot est très fortement péjoratif.'),
  ch('q11','AI,GE',8,'Quel est l’intérêt de savoir lire les connotations ?',['Comprendre comment on cherche à nous influencer','Écrire plus vite des textes beaucoup plus courts','Éviter d’avoir à utiliser un dictionnaire'],0,5,'La dernière phrase le dit : comprendre les nuances, c’est aussi repérer ce que l’on cherche à obtenir de nous.'),
  od('q12','ST,SQ',4,'Remets les étapes du texte dans l’ordre.',['Définition de la connotation','Exemple des mots désignant un logement','Exemples dans la presse et la publicité','Méthode et limites'],'Le texte définit, illustre avec des mots, élargit aux médias et à la publicité, puis donne une méthode.')
 ]});

R({id:'fr_3e_oral_oeuvre_01',level:'3e',type:'document',documentType:'transcription d’un oral (simulation)',title:'Présenter une œuvre à l’oral : la prestation de Lina',sourceType:'original_mathquest',
 chapterLinks:['fr3y'],difficulty:6,minutes:4,
 sourceReference:'Document original Finot Académie : simulation d’une épreuve orale. Lina et le jury sont imaginaires. Le vers cité est de Jean de La Fontaine (mort en 1695), dans le domaine public.',
 paragraphs:[
  'Épreuve orale de 3e (simulation) — Lina présente une œuvre étudiée en classe : les Fables de La Fontaine. Elle dispose de cinq minutes, puis répond aux questions du jury.',
  'Introduction de Lina. — Bonjour. Je vais vous présenter les Fables de La Fontaine, recueil publié au XVIIe siècle. Je vous parlerai d’abord de la structure de ces textes, ensuite de leur message, enfin de ce qu’ils m’ont apporté.',
  'Développement. — Une fable comprend un récit et une morale. Dans « Le Loup et l’Agneau », le loup, plus fort, invente des prétextes pour dévorer l’agneau. Selon moi, La Fontaine ne se contente pas de raconter : il dénonce l’injustice de la loi du plus fort. D’ailleurs, la morale arrive dès le premier vers : « La raison du plus fort est toujours la meilleure. »',
  'Conclusion. — Ces fables m’ont appris à lire entre les lignes : derrière des animaux, on découvre des hommes. J’ai particulièrement aimé cette fable parce qu’elle m’a fait réfléchir à ma propre façon de réagir face à l’injustice. Je vous remercie de votre attention.',
  'Questions du jury. — Le jury demande à Lina pourquoi La Fontaine a choisi des animaux plutôt que des personnes. Elle réfléchit, puis répond que les animaux permettent de critiquer sans attaquer directement : au XVIIe siècle, dénoncer des puissants aurait été dangereux.',
  'Bilan du jury. — Le jury félicite Lina pour son plan clair, son vocabulaire précis et sa capacité à donner un avis personnel justifié. Il lui conseille de lever davantage les yeux de ses notes et de ralentir un peu son débit.'
 ],
 glossary:[{word:'recueil',definition:'Livre qui rassemble plusieurs textes de même nature.'},{word:'morale',definition:'Leçon que l’on tire d’une fable ou d’un récit.'},{word:'prétextes',definition:'Fausses raisons que l’on donne pour justifier une action.'},{word:'débit',definition:'Rapidité avec laquelle on parle.'},{word:'jury',definition:'Groupe de personnes chargées d’évaluer une prestation.'}],
 questions:[
  ch('q1','DS,MI',3,'Quelle œuvre Lina présente-t-elle ?',['Les Fables de La Fontaine','Les Misérables de Victor Hugo','Candide de Voltaire'],0,0,'Le premier paragraphe indique qu’elle présente « les Fables de La Fontaine ».'),
  ch('q2','ST,JU',5,'Comment Lina annonce-t-elle son plan dans l’introduction ?',['Par « d’abord », « ensuite », « enfin »','En posant d’abord une question au jury','En lisant seulement le titre de l’œuvre'],0,1,'Ces mots annoncent l’organisation de son exposé : structure, message, apport personnel.'),
  ch('q3','CC,EX',5,'Quel contenu Lina développe-t-elle sur « Le Loup et l’Agneau » ?',['Le loup invente des prétextes pour dévorer','L’agneau réussit à tromper le loup affamé','Le loup protège l’agneau contre le danger'],0,2,'Elle résume le récit, puis en tire une interprétation : la fable dénonce l’injustice.'),
  ev('q4','JU,AR',6,'Quel paragraphe contient l’avis personnel de Lina sur l’intérêt de la fable ?',3,'Au paragraphe 4, elle explique ce que la fable lui a apporté et en quoi elle l’a fait réfléchir.'),
  ch('q5','AI,AR',6,'Pourquoi Lina cite-t-elle le premier vers de la fable ?',['Pour appuyer son analyse par une preuve','Pour remplir son temps de parole sans effort','Pour changer de sujet sans prévenir le jury'],0,2,'Citer un passage précis du texte justifie son analyse : c’est une pratique attendue à l’oral comme à l’écrit.'),
  ch('q6','IN,AR',7,'Selon Lina, pourquoi La Fontaine met-il en scène des animaux ?',['Pour critiquer sans viser directement les puissants','Parce qu’il adorait vivre entouré de nombreux animaux','Parce que les animaux parlaient au XVIIe siècle'],0,4,'Le détour par les animaux permettait de dénoncer les abus sans s’exposer à des représailles.'),
  ch('q7','ST,GE',6,'Dans « dénoncer des puissants aurait été dangereux », que marque le conditionnel passé ?',['Une hypothèse sur le passé','Un ordre donné au jury','Un souhait de La Fontaine pour l’avenir'],0,4,'Le conditionnel passé (« aurait été ») exprime ce qui se serait produit à l’époque si La Fontaine avait attaqué directement.'),
  ch('q8','DS,AI',5,'Quelles qualités le jury apprécie-t-il chez Lina ?',['Un plan clair, un vocabulaire précis, un avis justifié','Une voix très forte tout au long de la prestation','Une lecture entière sans aucune note, sans regarder le jury'],0,5,'Le bilan énumère : plan clair, vocabulaire précis, avis personnel justifié.'),
  ch('q9','DS,IN',5,'Quels conseils le jury donne-t-il à Lina ?',['Lever les yeux et ralentir son débit','Parler plus vite pour tout dire en cinq minutes','Éviter toutes les citations dans son exposé'],0,5,'Ce sont des conseils d’oral : regarder le jury et laisser le temps d’écouter.'),
  ch('q10','VO',5,'Que signifie « débit » dans « ralentir un peu son débit » ?',['La vitesse à laquelle on parle','Le volume sonore de sa voix pendant l’oral','Le nombre de feuilles de notes qu’on a sous les yeux'],0,5,'Le débit est le rythme de la parole : trop rapide, il rend le discours difficile à suivre.'),
  od('q11','SQ,ST',3,'Remets les étapes de la prestation dans l’ordre.',['Introduction avec annonce du plan','Développement avec exemple et citation','Conclusion avec avis personnel','Questions et bilan du jury'],'La prestation suit le déroulement classique d’un oral : plan, développement, conclusion, puis échange avec le jury.'),
  ch('q12','MI,AI',7,'Que montre ce document sur une bonne présentation d’œuvre ?',['Un plan, une analyse appuyée sur le texte, un avis justifié','Il faut réciter par cœur tout le livre étudié','Il faut éviter de donner son avis personnel à l’oral'],0,5,'Les qualités soulignées par le jury résument les attendus : structure, analyse, avis argumenté.')
 ]});

R({id:'fr_3e_lamartine_lac_01',level:'3e',documentType:'poème (extraits)',title:'Le Lac (extraits)',author:'Alphonse de Lamartine',work:'Méditations poétiques (1820)',sourceType:'public_domain',
 chapterLinks:['fr3c','fr3w'],difficulty:8,minutes:3,audioMode:'audioRecommended',verse:true,stanzas:[0,4,8],
 sourceReference:'Extraits du texte original d’Alphonse de Lamartine (mort en 1869), dans le domaine public : première et deuxième strophes, puis une strophe du milieu du poème.',
 teacherNotes:'Dans le poème complet, la strophe entre guillemets est prononcée par la femme aimée du poète. Les deux premières strophes sont des quatrains de trois alexandrins suivis d’un hexasyllabe.',
 paragraphs:[
  'Ainsi, toujours poussés vers de nouveaux rivages,',
  'Dans la nuit éternelle emportés sans retour,',
  'Ne pourrons-nous jamais sur l’océan des âges',
  'Jeter l’ancre un seul jour ?',
  'Ô lac ! l’année à peine a fini sa carrière,',
  'Et près des flots chéris qu’elle devait revoir,',
  'Regarde ! je viens seul m’asseoir sur cette pierre',
  'Où tu la vis s’asseoir !',
  '« Ô temps ! suspends ton vol, et vous, heures propices !',
  'Suspendez votre cours :',
  'Laissez-nous savourer les rapides délices',
  'Des plus beaux de nos jours ! »'
 ],
 glossary:[{word:'rivages',definition:'Bords de la mer ou d’un grand lac.'},{word:'carrière',definition:'Ici, parcours, course (celle de l’année qui s’achève).'},{word:'propices',definition:'Favorables, heureuses.'},{word:'délices',definition:'Plaisirs très vifs et très doux.'}],
 questions:[
  ch('q1','MI',6,'Quel est le thème principal de ces strophes ?',['Le temps qui passe et le désir de le retenir','La joie de la pêche et des promenades en barque','La description détaillée d’un paysage de montagne'],0,0,'Le poète parle des « âges », de l’année qui s’achève et supplie le temps de « suspendre son vol ».'),
  ch('q2','GE,VO',7,'À qui le poète s’adresse-t-il au vers 5 (« Ô lac ! ») ?',['Au lac, qu’il personnifie','À un ami d’enfance disparu depuis longtemps','À son lecteur, qu’il veut convaincre'],0,4,'C’est une apostrophe : il s’adresse directement au lac, comme à un être capable d’écouter et de se souvenir.'),
  ch('q3','GE,ST',8,'Quelle figure de style trouve-t-on dans « Ô temps ! suspends ton vol » ?',['Une personnification du temps','Une comparaison introduite par « comme »','Une énumération de plusieurs éléments'],0,8,'Le temps est traité comme un être qui vole et qu’on peut prier de s’arrêter : le poète lui donne des traits humains ou animaux.'),
  ch('q4','GE,IN',8,'Quelle métaphore compare la vie à un voyage dans « sur l’océan des âges / Jeter l’ancre un seul jour » ?',['La vie ressemble à un navire emporté','La vie est une fête qui ne finit jamais','La vie est un livre que l’on écrit chaque jour'],0,2,'Les « rivages », l’« océan » et l’« ancre » forment un champ lexical de la navigation : l’humanité est un navire emporté par le temps.'),
  ev('q5','JU,AR',7,'Quel vers exprime que l’homme voudrait arrêter le temps un instant ?',3,'« Jeter l’ancre un seul jour » : l’ancre immobilise un navire, comme le poète voudrait immobiliser le temps.'),
  ch('q6','EM,IN',7,'Quel sentiment domine la deuxième strophe ?',['La nostalgie d’un bonheur passé','La colère contre le lac et les flots','L’impatience de repartir bientôt ailleurs'],0,6,'Le poète vient « seul » sur la pierre où quelqu’un d’autre s’asseyait avec lui : son absence est douloureuse. Dans le poème entier, c’est la femme aimée qui manque : le ton est celui de la nostalgie.'),
  ch('q7','ST,GE',7,'Dans « Regarde ! je viens seul m’asseoir sur cette pierre », que marque l’impératif « Regarde » ?',['Un appel au lac pour le prendre à témoin','Un ordre adressé à un domestique','Une question posée à un autre promeneur'],0,6,'Le poète veut que le lac « voie » sa solitude : l’impératif renforce l’apostrophe et le côté émouvant de la scène.'),
  ch('q8','GE,VO',8,'Qu’exprime l’exclamation « Ô » répétée dans le poème ?',['Une émotion intense et un appel','Un rire joyeux de grande surprise','Une moquerie légère envers le lac'],0,8,'« Ô » est une interjection d’appel et d’émotion typique du lyrisme romantique.'),
  ch('q9','ST,GE',8,'Dans les deux premières strophes, que remarque-t-on sur le dernier vers ?',['Il est plus court que les trois autres','Il est plus long que les trois autres','Il rime avec le premier vers de la strophe'],0,3,'« Jeter l’ancre un seul jour ? » et « Où tu la vis s’asseoir ! » ont six syllabes, contre douze pour les trois autres vers : ce vers bref ralentit et met en relief la dernière idée.'),
  ch('q10','AI,AR',8,'Que demandent au temps les vers entre guillemets de la dernière strophe ?',['De ralentir pour laisser savourer le bonheur','De s’accélérer pour passer plus vite à la suite','De revenir en arrière pour recommencer la vie'],0,8,'« Suspendez votre cours » est une prière : dans le poème, ces mots sont prononcés par la femme aimée. Elle sait que le temps ne s’arrêtera pas, mais elle voudrait prolonger les « rapides délices ».'),
  ch('q11','VO',7,'Que signifie « propices » dans « heures propices » ?',['Favorables, heureuses','Lointaines et presque oubliées','Pénibles et sans fin'],0,8,'Les « heures propices » sont celles où l’on est heureux : le poète voudrait les prolonger.'),
  ch('q12','ST,MI',8,'Comment peut-on résumer l’enchaînement de ces trois strophes ?',['Constat, retour solitaire au lac, prière au temps','Description d’un voyage en bateau jusqu’à l’île','Dialogue avec un ami disparu depuis plusieurs années'],0,0,'On passe d’une réflexion générale (strophe 1) à une scène précise (strophe 2) puis à la prière (strophe 3).'),
  od('q13','ST,SQ',6,'Remets dans l’ordre les mouvements du poème.',['La fuite du temps','Le retour solitaire près du lac','La prière adressée au temps'],'Le poème passe d’une réflexion générale sur le temps à une scène précise au bord du lac, puis à une prière pour retenir le bonheur.')
 ]});

R({id:'fr_3e_jaccuse_zola_01',level:'3e',documentType:'lettre ouverte (texte historique adapté)',title:'Zola : « J’accuse…! »',author:'Émile Zola',work:'J’accuse…! (1898)',sourceType:'public_domain',
 chapterLinks:['fr3d','fr3g'],difficulty:8,minutes:4,
 sourceReference:'Présentation et adaptation libre pour la 3e de la lettre ouverte d’Émile Zola (mort en 1902), dans le domaine public. Le passage entre guillemets est une reformulation, et non une citation exacte.',
 teacherNotes:'L’affaire Dreyfus est un sujet d’histoire (3e) : le texte relie lecture, argumentation et engagement de l’écrivain.',
 paragraphs:[
  'Le 13 janvier 1898, le journal L’Aurore publie à sa une une lettre ouverte d’Émile Zola, adressée au président de la République, Félix Faure. Le titre, en gros caractères, est devenu célèbre : « J’accuse…! »',
  'Quatre ans plus tôt, un officier, le capitaine Alfred Dreyfus, a été condamné pour trahison et envoyé au bagne. Zola est convaincu qu’il est innocent. Il vient d’apprendre que le commandant Esterhazy, soupçonné d’être le véritable auteur des documents secrets, a été acquitté par un conseil de guerre. Pour lui, c’est le moment de parler.',
  'Adaptation de la lettre : « Je ne veux pas être complice de cette injustice. Si je me taisais, mes nuits seraient hantées par l’image d’un innocent qui souffre, là-bas, pour un crime qu’il n’a pas commis. C’est à vous, monsieur le Président, que je crie cette vérité, de toute la force de ma révolte d’honnête homme. »',
  'Zola accuse ensuite, une par une, plusieurs personnalités de l’armée. À chaque fois, il répète le même mot : « J’accuse… » Cette répétition, appelée anaphore, donne à son texte la force d’un réquisitoire, c’est-à-dire d’un acte d’accusation.',
  'Zola sait qu’il prend un grand risque : il écrit en toutes lettres ce que la justice lui interdit de dire. Il espère être poursuivi, afin que l’affaire soit rouverte devant un tribunal. Il sera en effet condamné pour diffamation, puis contraint de s’exiler quelque temps en Angleterre.',
  'Sa lettre a profondément divisé la France. Pour les uns, Zola était un héros de la vérité ; pour d’autres, un traître à l’armée. Dreyfus sera finalement réhabilité en 1906. Cet épisode montre comment un écrivain peut utiliser sa notoriété et ses mots pour défendre la justice.'
 ],
 glossary:[{word:'lettre ouverte',definition:'Lettre destinée à une personne, mais publiée pour que tout le monde puisse la lire.'},{word:'acquitté',definition:'Déclaré non coupable par un tribunal.'},{word:'réquisitoire',definition:'Discours qui accuse quelqu’un de façon argumentée et sévère.'},{word:'diffamation',definition:'Fait d’accuser publiquement quelqu’un de façon à nuire à sa réputation.'},{word:'anaphore',definition:'Répétition du même mot ou de la même expression au début de plusieurs phrases.'}],
 questions:[
  ch('q1','DS,EX',4,'Dans quel journal la lettre de Zola paraît-elle ?',['L’Aurore','Le Figaro','La Gazette de Brest'],0,0,'Le premier paragraphe dit : « le journal L’Aurore publie à sa une une lettre ouverte ».'),
  ch('q2','DS,AI',5,'À qui Zola s’adresse-t-il officiellement ?',['Au président Félix Faure','Au capitaine Dreyfus, au bagne','Aux journalistes de L’Aurore'],0,0,'La lettre est « adressée au président de la République », mais elle est lue par tout le public.'),
  ch('q3','CC,IN',6,'Pourquoi Zola décide-t-il de publier sa lettre à ce moment ?',['Le véritable suspect vient d’être acquitté','Dreyfus vient d’être libéré par la justice','Le président a démissionné la veille'],0,1,'L’acquittement d’Esterhazy lui montre que la justice militaire refuse de reconnaître son erreur : « c’est le moment de parler ».'),
  ev('q4','JU,AR',6,'Quel paragraphe rapporte, de façon reformulée, les paroles de Zola sur sa conscience ?',2,'Le paragraphe 3 reformule ses raisons morales : il refuse d’être complice d’une injustice.'),
  ch('q5','GE,AR',7,'Qu’est-ce qu’une anaphore, comme dans « J’accuse… » répété ?',['La répétition d’un mot pour insister','Une comparaison introduite par « comme »','Un mot de sens contraire placé à la fin'],0,3,'L’anaphore martèle l’accusation et rend le texte solennel, comme un réquisitoire.'),
  ch('q6','AR,IN',7,'Pourquoi Zola espère-t-il être poursuivi en justice ?',['Pour que l’affaire soit rouverte et jugée','Pour devenir plus célèbre qu’avant','Pour pouvoir quitter la France ensuite'],0,4,'Un procès contre lui obligerait à examiner les preuves : c’est une stratégie risquée mais voulue.'),
  ch('q7','AI,MI',8,'Quelle est l’intention de Zola ?',['Dénoncer une injustice et obliger à réagir','Divertir ses lecteurs avec une belle lettre','Se faire élire président de la République'],0,2,'Il écrit pour réparer une erreur judiciaire, en mobilisant l’opinion publique par un acte courageux.'),
  ch('q8','EM,AR',8,'Que montre l’expression « révolte d’honnête homme » ?',['Une indignation morale et sincère','Une colère passagère et sans importance','Une envie de se venger de l’armée'],0,2,'Zola met en avant sa conscience et son honnêteté : il est révolté par l’injustice, et non motivé par un intérêt personnel.'),
  ch('q9','CC,IN',7,'Quelles furent les conséquences pour Zola ?',['Une condamnation puis un exil en Angleterre','Une décoration officielle de la République','Un poste de ministre de la Justice'],0,4,'Le texte indique qu’il sera condamné puis contraint de s’exiler. Son courage a un prix.'),
  ch('q10','AI,AR',8,'Quelle idée le dernier paragraphe illustre-t-il ?',['Un écrivain peut défendre la justice avec ses mots','Les écrivains ne doivent jamais s’occuper de politique','Les armées ne se trompent jamais dans leurs jugements'],0,5,'La conclusion présente Zola comme un écrivain engagé, dont la lettre change le cours de l’Affaire.'),
  od('q11','SQ,TI',4,'Remets ces faits dans l’ordre chronologique.',['Dreyfus est condamné','Esterhazy est acquitté','Zola publie sa lettre','Dreyfus est réhabilité'],'La condamnation de Dreyfus (1894) précède l’acquittement d’Esterhazy et la lettre de Zola (janvier 1898) ; la réhabilitation vient en 1906.'),
  ch('q12','VO',7,'Que signifie « réquisitoire » ?',['Un discours d’accusation sévère','Un discours de remerciement solennel','Un poème amoureux et très romantique'],0,3,'Un réquisitoire énumère des accusations pour obtenir une condamnation. Zola utilise ce ton pour accuser les responsables de l’injustice.')
 ]});

//@@MORE@@



})();
