/* Finot Académie — bibliothèque de lecture, vague 2 (primaire, 24/10/2026). S'ajoute à window.MQ_READING.resources
   (data/reading/resources.js) sans rien retirer. Format et règles : docs/reading-system.md.
   30 supports originaux (sourceType 'original_mathquest') pour CP, CE1, CE2, CM1 et CM2, reliés à des chapitres
   de français de langue (vocabulaire, phrase, grammaire, écrit) où un texte apporte réellement quelque chose.
   Les petits constructeurs ci-dessous (C, T, O, E, R) produisent exactement les mêmes objets que le format
   documenté : choice, text (strict, accents tolérés), order, evidence. */
(function(){
'use strict';
if(!window.MQ_READING||!window.MQ_READING.resources)return;
var K=function(s){return s.split(',').map(function(x){return 'READ_'+x;});};
var C=function(id,k,d,p,ch,a,x,ev){var q={id:id,type:'choice',competencies:K(k),difficulty:d,prompt:p,choices:ch,ans:a,explanation:x};if(ev!=null)q.evidenceParagraph=ev;return q;};
var noAcc=function(s){return s.normalize('NFD').replace(/[\u0300-\u036f]/g,'');};
var T=function(id,k,d,p,acc,x,ev){var all=[];acc.forEach(function(a){[a,noAcc(a)].forEach(function(v){if(all.indexOf(v)<0)all.push(v);});});var q={id:id,type:'text',strict:true,acc:all,competencies:K(k),difficulty:d,prompt:p,explanation:x};if(ev!=null)q.evidenceParagraph=ev;return q;};
var O=function(id,k,d,p,tk,x){return {id:id,type:'order',competencies:K(k),difficulty:d,prompt:p,tokens:tk,ans:tk.join(' '),explanation:x};};
var E=function(id,k,d,p,ev,x){return {id:id,type:'evidence',competencies:K(k),difficulty:d,prompt:p,evidenceParagraph:ev,explanation:x};};
var R=function(o){
 var comp=[];o.questions.forEach(function(q){q.competencies.forEach(function(c){if(comp.indexOf(c)<0)comp.push(c);});});
 var r={id:o.id,level:o.level,subject:'francais',type:o.doc?'document':'literary_text',documentType:o.dt,title:o.title,author:null,work:null,sourceType:'original_mathquest'};
 if(o.src)r.sourceReference=o.src;
 r.chapterLinks=o.links;r.competencies=comp;r.difficulty=o.diff;r.estimatedReadingMinutes=o.min||2;
 r.audioMode=o.audio||'audioAllowed';r.sessionSize=o.sess;
 if(o.verse){r.verse=true;r.stanzas=o.stanzas;}
 r.paragraphs=o.p;r.glossary=o.g.map(function(g){return {word:g[0],definition:g[1]};});r.questions=o.questions;return r;};
var LIST=[];

/* ===== CP ===== */
LIST.push(R({id:'fr_cp_marche_01',level:'CP',dt:'récit',title:'Au marché avec Maman',links:['cp-fr-lire-mots','cp-fr-mots-outils'],diff:1,min:1,audio:'audioRecommended',sess:5,
 p:['Maman va au marché avec Samir.','Elle achète des pommes rouges.','Samir prend une salade et du pain.','Le marchand donne une fraise à Samir.','Samir dit : « Merci ! »','Ils rentrent à la maison avec le panier plein.'],
 g:[['marchand','La personne qui vend des fruits, des légumes ou du pain.'],['panier','Un objet qui sert à porter les courses.']],
 questions:[
  C('q1','CHARACTER',1,'Qui va au marché avec Maman ?',['Papa','Samir','Le marchand'],1,'La 1ʳᵉ phrase dit : « Maman va au marché avec Samir. »',0),
  C('q2','EXPLICIT',1,'Que Maman achète-t-elle ?',['Des pommes rouges','Des poires vertes','Des cerises'],0,'Le texte dit : « Elle achète des pommes rouges. »',1),
  C('q3','EXPLICIT',1,'Que prend Samir ?',['Du lait et un œuf','Des fleurs','Une salade et du pain'],2,'Le texte dit : « Samir prend une salade et du pain. »',2),
  T('q4','EXPLICIT',1,'Que dit Samir au marchand ?',['merci'],'Samir dit « Merci ! » quand le marchand lui donne une fraise.',4),
  C('q5','EXPLICIT',1,'Que donne le marchand à Samir ?',['Du pain','Une fraise','Un panier'],1,'Le texte dit : « Le marchand donne une fraise à Samir. »',3),
  C('q6','EXPLICIT',1,'Vrai ou faux : Samir reste seul à la maison.',['Vrai','Faux'],1,'Samir va au marché avec Maman : il ne reste pas à la maison.',0),
  O('q7','SEQUENCE',2,'Remets les phrases dans l’ordre de l’histoire.',['Maman va au marché','Samir dit merci','Ils rentrent à la maison'],'On commence par aller au marché, puis Samir remercie le marchand, et on rentre à la fin.'),
  C('q8','VOCAB_CONTEXT',2,'Dans le texte, un « marchand » est…',['une personne qui vend des choses','un enfant qui joue','un fruit rouge'],0,'Le marchand donne une fraise : c’est la personne qui vend des fruits au marché.',3),
  E('q9','JUSTIFY,EMOTION_INTENTION',2,'Quelle phrase montre que Samir est poli ?',4,'Samir dit « Merci ! » : un enfant poli remercie quand on lui fait un cadeau.'),
  C('q10','INFERENCE,CAUSE_CONSEQUENCE',3,'Pourquoi le panier est-il plein à la fin ?',['Parce qu’il pleut','Parce que Samir dort','Parce qu’ils ont acheté de bonnes choses'],2,'Maman et Samir ont acheté des pommes, une salade et du pain : le panier se remplit.',5)
 ]}));

LIST.push(R({id:'fr_cp_matin_zoe_01',level:'CP',dt:'récit',title:'Le matin de Zoé',links:['cp-fr-phrase'],diff:1,min:1,audio:'audioRecommended',sess:5,
 p:['Le matin, Zoé se lève.','Elle met sa robe bleue.','Elle boit du lait chaud.','Puis elle prend son sac.','Zoé part à l’école.','Au portail, elle voit son amie Inès.'],
 g:[['portail','Une grande porte qui ferme la cour ou le jardin.'],['sac','Un objet que l’on porte sur le dos pour ranger ses affaires.']],
 questions:[
  C('q1','CHARACTER',1,'Qui se lève le matin ?',['Inès','Zoé','Maman'],1,'La 1ʳᵉ phrase dit : « Le matin, Zoé se lève. »',0),
  C('q2','EXPLICIT',1,'De quelle couleur est la robe de Zoé ?',['Bleue','Rouge','Verte'],0,'Le texte dit : « Elle met sa robe bleue. »',1),
  C('q3','EXPLICIT',1,'Que boit Zoé ?',['Du jus d’orange','De l’eau','Du lait chaud'],2,'Le texte dit : « Elle boit du lait chaud. »',2),
  T('q4','CHARACTER',1,'Qui Zoé voit-elle au portail ?',['Inès'],'La dernière phrase dit : « Au portail, elle voit son amie Inès. »',5),
  C('q5','PLACE',1,'Où va Zoé ?',['À l’école','Au parc','Chez le docteur'],0,'Le texte dit : « Zoé part à l’école. »',4),
  C('q6','STRUCTURE',2,'Par quoi commence chaque phrase du texte ?',['Par un point','Par une lettre majuscule','Par un dessin'],1,'Chaque phrase commence par une majuscule : Le, Elle, Puis, Zoé, Au.',0),
  C('q7','STRUCTURE',2,'Par quoi finit chaque phrase du texte ?',['Par une virgule','Par un point','Par une lettre muette'],1,'Chaque phrase se termine par un point, qui dit : « La phrase est finie. »',1),
  O('q8','SEQUENCE',2,'Remets les phrases dans l’ordre de l’histoire.',['Zoé se lève','Zoé boit du lait','Zoé part à l’école'],'Zoé se lève d’abord, elle boit son lait, puis elle part à l’école.'),
  C('q9','INFERENCE,CAUSE_CONSEQUENCE',3,'Pourquoi Zoé prend-elle son sac ?',['Parce qu’elle va dormir','Parce qu’elle a faim','Parce qu’elle part à l’école'],2,'Zoé prend son sac juste avant de partir à l’école : elle y range ses affaires.',3),
  E('q10','JUSTIFY',2,'Quelle phrase montre que Zoé a une amie ?',5,'« Elle voit son amie Inès » : le mot « amie » le dit.'),
  C('q11','EXPLICIT',1,'Vrai ou faux : Zoé boit du lait chaud.',['Vrai','Faux'],0,'La 3ᵉ phrase dit : « Elle boit du lait chaud. »',2)
 ]}));

LIST.push(R({id:'fr_cp_contraires_01',level:'CP',dt:'poème',title:'Les contraires',links:['cp-fr-vocabulaire'],diff:1,min:1,audio:'audioRecommended',sess:5,verse:true,stanzas:[2,4,6],
 p:['Le soleil est chaud,','La glace est froide.','L’éléphant est grand,','La souris est petite.','L’escargot est lent,','Le lièvre est rapide.','Et moi, je suis content :','Je connais les contraires !'],
 g:[['contraires','Des mots qui disent le contraire l’un de l’autre : chaud et froid.'],['content','Heureux, joyeux.']],
 questions:[
  T('q1','EXPLICIT,VOCAB_CONTEXT',1,'Dans le poème, quel est le contraire de « chaud » ?',['froid','froide'],'Le soleil est chaud, la glace est froide : froid est le contraire de chaud.',1),
  C('q2','EXPLICIT',1,'Quel animal est grand ?',['La souris','L’éléphant','Le lièvre'],1,'Le poème dit : « L’éléphant est grand. »',2),
  C('q3','EXPLICIT',1,'Quel animal est lent ?',['L’escargot','Le lièvre','L’éléphant'],0,'Le poème dit : « L’escargot est lent. »',4),
  C('q4','VOCAB_CONTEXT',2,'Le contraire de « lent » est…',['petit','froid','rapide'],2,'Le poème dit que l’escargot est lent et que le lièvre est rapide.',5),
  C('q5','EXPLICIT',1,'Qui est froide ?',['Le soleil','La glace','La souris'],1,'Le poème dit : « La glace est froide. »',1),
  C('q6','EXPLICIT',1,'Vrai ou faux : la souris est grande.',['Vrai','Faux'],1,'Le poème dit : « La souris est petite. »',3),
  C('q7','EMOTION_INTENTION,INFERENCE',3,'Pourquoi l’enfant est-il content ?',['Il mange une glace','Il connaît les contraires','Il a vu un escargot'],1,'À la fin, l’enfant dit : « Je connais les contraires ! » C’est pour cela qu’il est content.',7),
  C('q8','VOCAB_CONTEXT',2,'Le mot « content » veut dire…',['triste','fâché','heureux'],2,'Content veut dire heureux. L’enfant est fier de connaître les contraires.',6),
  O('q9','SEQUENCE',2,'Remets ces vers dans l’ordre du poème.',['Le soleil est chaud','L’éléphant est grand','L’escargot est lent'],'On lit d’abord le soleil, puis l’éléphant, puis l’escargot.'),
  E('q10','JUSTIFY',2,'Quel vers parle d’un animal très petit ?',3,'« La souris est petite » : le mot « petite » le dit.'),
  C('q11','GENRE',2,'Ce texte est…',['une recette','un poème','une lettre'],1,'Les lignes courtes qui se répondent forment un poème : on peut le dire à voix haute.')
 ]}));

LIST.push(R({id:'fr_cp_cour_recre_01',level:'CP',dt:'récit',title:'Dans la cour',links:['cp-fr-classes-mots'],diff:2,min:1,audio:'audioRecommended',sess:5,
 p:['Dans la cour, un petit garçon saute.','Une grande fille court vite.','Le ballon rouge roule sous le banc.','Un chien noir aboie près du portail.','La maîtresse sourit : la récréation est joyeuse !'],
 g:[['récréation','Le moment de jeu à l’école.'],['banc','Un siège long où l’on peut s’asseoir à plusieurs.']],
 questions:[
  C('q1','CHARACTER',1,'Qui saute dans la cour ?',['Une grande fille','Un petit garçon','Un chien noir'],1,'Le texte dit : « un petit garçon saute ».',0),
  T('q2','EXPLICIT',1,'Comment court la grande fille ?',['vite'],'Le texte dit : « Une grande fille court vite. »',1),
  C('q3','EXPLICIT',1,'De quelle couleur est le ballon ?',['Rouge','Noir','Bleu'],0,'Le texte dit : « Le ballon rouge ».',2),
  C('q4','PLACE',1,'Où roule le ballon ?',['Dans le sac','Sous le banc','Près du portail'],1,'Le texte dit : « roule sous le banc ».',2),
  T('q5','EXPLICIT',1,'De quelle couleur est le chien ?',['noir'],'Le texte dit : « Un chien noir aboie ».',3),
  C('q6','VOCAB_CONTEXT',2,'Dans « Le chien aboie », quel mot dit ce que fait le chien (le verbe) ?',['Le','chien','aboie'],2,'Le verbe dit ce que l’on fait : le chien aboie.',3),
  C('q7','VOCAB_CONTEXT',2,'Dans « un petit garçon », quel mot dit comment est le garçon (l’adjectif) ?',['petit','garçon','un'],0,'L’adjectif dit comment est quelqu’un : il est petit.',0),
  C('q8','VOCAB_CONTEXT',2,'Dans « un chien noir », quel mot est le nom ?',['noir','un','chien'],2,'Le nom dit qui ou quoi : ici, c’est un chien. « Noir » dit comment il est.',3),
  C('q9','EXPLICIT',1,'Vrai ou faux : la maîtresse pleure.',['Vrai','Faux'],1,'La maîtresse sourit : elle ne pleure pas.',4),
  C('q10','EMOTION_INTENTION',2,'Comment est la récréation ?',['Triste','Ennuyeuse','Joyeuse'],2,'Le texte dit : « la récréation est joyeuse ». La maîtresse sourit.',4),
  O('q12','SEQUENCE',2,'Remets ces phrases dans l’ordre du texte.',['Un petit garçon saute','Le ballon roule sous le banc','La maîtresse sourit'],'On lit d’abord le garçon, puis le ballon, puis la maîtresse.'),
  E('q11','JUSTIFY',2,'Quelle phrase parle d’un animal ?',3,'« Un chien noir aboie » : le chien est un animal.')
 ]}));

LIST.push(R({id:'fr_cp_anniversaire_lea_01',level:'CP',dt:'récit',title:'L’anniversaire de Léa',links:['cp-fr-etre-avoir'],diff:2,min:1,audio:'audioRecommended',sess:5,
 p:['Aujourd’hui, Léa a six ans.','Elle est très contente.','Ses amis sont dans le jardin.','Tom a un cadeau bleu.','Nina a une boîte de crayons.','« Nous avons faim ! » dit Tom.','Léa a un grand gâteau. Ils mangent tous ensemble.'],
 g:[['cadeau','Un objet que l’on offre à quelqu’un.'],['ensemble','Les uns avec les autres, au même moment.']],
 questions:[
  T('q1','EXPLICIT',1,'Quel âge a Léa ?',['six ans','6 ans','six','6'],'La 1ʳᵉ phrase dit : « Léa a six ans. »',0),
  C('q2','EMOTION_INTENTION',1,'Comment est Léa ?',['Très contente','Fâchée','Fatiguée'],0,'Le texte dit : « Elle est très contente. »',1),
  C('q3','PLACE',1,'Où sont les amis de Léa ?',['Dans la cuisine','Dans le jardin','Dans la rue'],1,'Le texte dit : « Ses amis sont dans le jardin. »',2),
  C('q4','CHARACTER',1,'Qui a un cadeau bleu ?',['Nina','Léa','Tom'],2,'Le texte dit : « Tom a un cadeau bleu. »',3),
  C('q5','EXPLICIT',1,'Qu’a Nina ?',['Une boîte de crayons','Un ballon','Un livre'],0,'Le texte dit : « Nina a une boîte de crayons. »',4),
  C('q6','VOCAB_CONTEXT',2,'Dans « Léa a six ans », quel mot est le verbe avoir ?',['six','a','ans'],1,'Le verbe est « a » : Léa a six ans. C’est le verbe avoir.',0),
  C('q7','VOCAB_CONTEXT',2,'Pour finir la phrase : Ses amis ___ dans le jardin.',['est','ont','sont'],2,'Avec « ses amis » (plusieurs personnes), on écrit « sont » : c’est le verbe être.',2),
  C('q8','VOCAB_CONTEXT',2,'Pour finir la phrase : Tom ___ un cadeau bleu.',['est','a','sont'],1,'Tom possède un cadeau : on écrit « a », le verbe avoir.',3),
  C('q9','CAUSE_CONSEQUENCE,INFERENCE',3,'Pourquoi Tom dit-il « Nous avons faim » ?',['Parce qu’il pleut','Parce qu’il est triste','Parce qu’il a envie de manger'],2,'Quand on a faim, on a envie de manger : c’est l’heure du gâteau.',5),
  O('q10','SEQUENCE',2,'Remets les phrases dans l’ordre de l’histoire.',['Léa a six ans','Tom dit qu’il a faim','Ils mangent le gâteau'],'On commence par l’âge de Léa, puis Tom a faim, et à la fin on mange.'),
  E('q11','JUSTIFY',2,'Quelle phrase montre que Léa est heureuse ?',1,'« Elle est très contente » : contente veut dire heureuse.')
 ]}));

LIST.push(R({id:'fr_cp_ferme_01',level:'CP',dt:'texte documentaire',title:'À la ferme',doc:true,links:['cp-fr-genre','cp-fr-nombre'],diff:2,min:1,audio:'audioRecommended',sess:5,
 p:['À la ferme, il y a un coq et une poule.','Il y a aussi un canard et une cane.','Les poules picorent des graines.','Les canards nagent dans la mare.','Un chat dort sur la paille.','Des poussins suivent leur maman.'],
 g:[['mare','Un petit lac peu profond.'],['paille','Les tiges sèches du blé, qui servent de lit aux animaux.'],['picorent','Mangent en donnant de petits coups de bec.']],
 questions:[
  C('q1','EXPLICIT',1,'Quel animal est le mâle de la poule ?',['Le canard','Le coq','Le chat'],1,'Le texte dit : « un coq et une poule » : le coq est le mâle.',0),
  T('q2','EXPLICIT',1,'Comment s’appelle la femelle du canard ?',['la cane','une cane','cane'],'Le texte dit : « un canard et une cane ».',1),
  C('q3','EXPLICIT',1,'Que picorent les poules ?',['Des graines','De la paille','Du pain'],0,'Le texte dit : « Les poules picorent des graines. »',2),
  C('q4','PLACE',1,'Où nagent les canards ?',['Sur la paille','Dans la mare','Dans la cour'],1,'Le texte dit : « Les canards nagent dans la mare. »',3),
  C('q5','PLACE',1,'Où dort le chat ?',['Dans la mare','Dans la cour','Sur la paille'],2,'Le texte dit : « Un chat dort sur la paille. »',4),
  C('q6','CHARACTER',1,'Qui suit sa maman ?',['Le chat','Les poussins','Le coq'],1,'Le texte dit : « Des poussins suivent leur maman. »',5),
  C('q7','VOCAB_CONTEXT',3,'Pourquoi écrit-on « un coq » mais « une poule » ?',['Parce que le coq est plus grand','Parce que la poule est jaune','Parce que « coq » est masculin et « poule » féminin'],2,'Les mots sont masculins ou féminins : on dit un coq (masculin) et une poule (féminin).',0),
  C('q8','VOCAB_CONTEXT',2,'Quel groupe de mots parle de plusieurs animaux ?',['un canard','les canards','une cane'],1,'« Les canards » est au pluriel : il y a plusieurs canards. Le s à la fin le montre.',3),
  C('q9','EXPLICIT',2,'Vrai ou faux : il y a un seul chat dans le texte.',['Vrai','Faux'],0,'Le texte dit « Un chat dort » : il n’y en a qu’un.',4),
  O('q10','SEQUENCE',2,'Remets ces phrases dans l’ordre du texte.',['Il y a un coq et une poule','Les poules picorent des graines','Un chat dort sur la paille'],'On lit d’abord le coq et la poule, puis les graines, puis le chat.'),
  E('q11','JUSTIFY',2,'Quelle phrase parle des bébés animaux ?',5,'« Des poussins suivent leur maman » : les poussins sont les petits de la poule.')
 ]}));

/* ===== CE1 ===== */
LIST.push(R({id:'fr_ce1_cabane_nour_01',level:'CE1',dt:'récit',title:'La cabane de Nour',links:['ce1-fr-synonymes-contraires'],diff:3,min:2,audio:'audioRecommended',sess:6,
 p:['Ce matin, Nour est heureuse : papa lui a construit une cabane dans le jardin.','La cabane est minuscule, mais elle est solide. Nour la trouve belle, presque magnifique !','Son frère Adam arrive en courant. Il veut entrer, lui aussi, mais la porte est trop étroite.','« Ta cabane est trop petite pour moi ! » dit-il, un peu fâché. « Et ta porte n’est pas assez large ! »','Nour sourit : « Alors installe-toi dehors, sur le banc. Moi, je reste à l’intérieur, au chaud. »','Adam n’est plus fâché. Il apporte deux coussins et un livre, et ils lisent chacun de leur côté.'],
 g:[['minuscule','Très, très petit.'],['étroite','Pas large : on y passe difficilement.'],['coussins','Des sacs mous, remplis de plumes ou de mousse, sur lesquels on s’assoit ou on s’appuie.']],
 questions:[
  C('q1','CHARACTER',1,'Qui a construit la cabane ?',['Adam','Papa','Nour'],1,'La 1ʳᵉ phrase dit : « papa lui a construit une cabane ».',0),
  C('q2','VOCAB_CONTEXT',3,'Le mot « minuscule » veut dire presque la même chose que…',['très petite','très haute','très vieille'],0,'La cabane est « minuscule » et Adam la trouve « trop petite » : minuscule veut dire très petit.',1),
  C('q3','VOCAB_CONTEXT',2,'Le mot « heureuse » est proche du mot…',['fâchée','fatiguée','contente'],2,'Heureuse et contente sont des synonymes : ils veulent dire presque la même chose.',0),
  T('q4','VOCAB_CONTEXT',3,'Dans la phrase d’Adam, quel mot est le contraire d’« étroite » ?',['large'],'Une porte étroite n’est pas large : étroit et large sont des contraires.',3),
  T('q5','VOCAB_CONTEXT',3,'Quel mot du texte est le contraire de « dehors » ?',['intérieur','l’intérieur','dedans'],'Nour reste à l’intérieur de la cabane, Adam s’installe dehors : dehors et intérieur sont des contraires.',4),
  C('q6','CAUSE_CONSEQUENCE',2,'Pourquoi Adam ne peut-il pas entrer dans la cabane ?',['Parce que Nour ferme à clé','Parce que la cabane est cassée','Parce que la porte est trop étroite'],2,'Le texte dit : « la porte est trop étroite ».',2),
  C('q7','EXPLICIT,INFERENCE',3,'Vrai ou faux : la cabane est fragile.',['Vrai','Faux'],1,'Le texte dit qu’elle est « solide », le contraire de fragile.',1),
  C('q8','VOCAB_CONTEXT',3,'Le mot « magnifique » veut dire presque la même chose que…',['très laid','très bruyant','très beau'],2,'Nour trouve la cabane « belle, presque magnifique » : magnifique est un synonyme de très beau.',1),
  O('q9','SEQUENCE',2,'Remets les événements dans l’ordre de l’histoire.',['Papa construit la cabane','Adam veut entrer','Adam apporte des coussins'],'Papa construit d’abord la cabane, Adam arrive ensuite, et il apporte les coussins à la fin.'),
  E('q10','JUSTIFY,EMOTION_INTENTION',3,'Quelle phrase montre que Nour est fière de sa cabane ?',1,'Nour la trouve « belle, presque magnifique » : elle est fière de ce que papa a construit.'),
  C('q11','MAIN_IDEA',3,'Quel titre résume le mieux l’histoire ?',['Un voyage en bateau','Une cabane trop petite pour Adam','La tempête dans le jardin'],1,'Tout le récit tourne autour de la cabane, trop petite pour qu’Adam entre dedans.'),
  C('q12','INFERENCE,EMOTION_INTENTION',4,'Pourquoi Adam n’est-il plus fâché à la fin ?',['Parce qu’il a trouvé une solution : lire dehors avec sa sœur','Parce que la cabane est devenue plus grande','Parce que papa le gronde'],0,'Nour propose une solution : Adam s’installe sur le banc avec des coussins et un livre. Ils sont ensemble, donc il n’est plus fâché.',5)
 ]}));

LIST.push(R({id:'fr_ce1_mer_marins_01',level:'CE1',dt:'texte documentaire',title:'La mer et les marins',doc:true,links:['ce1-fr-familles'],diff:3,min:2,audio:'audioRecommended',sess:6,
 p:['La mer couvre une grande partie de la Terre. Quand on la regarde, on voit de l’eau salée à perte de vue.','Les marins travaillent sur la mer. Un marin peut naviguer sur un grand navire ou sur un petit bateau de pêche.','Deux fois par jour, la marée monte, puis elle descend. À marée haute, l’eau arrive près des dunes. À marée basse, on peut ramasser des coquillages sur le sable.','Dans la mer vivent beaucoup d’animaux marins : des poissons, des crabes et des étoiles de mer.','Certains animaux, comme les baleines, sont même très grands.'],
 g:[['navire','Un très grand bateau.'],['marée','Le mouvement de la mer qui monte, puis qui descend.'],['dunes','Des collines de sable au bord de la mer.']],
 questions:[
  C('q1','MAIN_IDEA',2,'De quoi parle ce texte ?',['D’un voyage sur la Lune','De la mer et de ce qu’on y trouve','D’un gâteau au chocolat'],1,'Tous les paragraphes donnent des informations sur la mer : l’eau, les marins, la marée, les animaux.'),
  C('q2','EXPLICIT',1,'Comment est l’eau de la mer ?',['Sucrée','Gelée','Salée'],2,'Le texte dit : « de l’eau salée à perte de vue ».',0),
  C('q3','EXPLICIT',1,'Où travaille un marin ?',['Sur la mer, à bord d’un bateau','Dans une forêt','Dans une école'],0,'Le texte dit : « Les marins travaillent sur la mer ».',1),
  T('q4','EXPLICIT',2,'Combien de fois par jour la marée monte-t-elle ?',['deux fois','2 fois','deux','2'],'Le texte dit : « Deux fois par jour, la marée monte ».',2),
  C('q5','EXPLICIT,TIME',2,'Quand peut-on ramasser des coquillages sur le sable ?',['À marée haute','À marée basse','Pendant la nuit seulement'],1,'Le texte dit : « À marée basse, on peut ramasser des coquillages ».',2),
  C('q6','VOCAB_CONTEXT',3,'Quels mots sont de la même famille que « mer » ?',['mardi, marteau','mère, merci','marin, marée'],2,'Marin et marée contiennent le même radical « mar- », qui vient de mer, et parlent de la mer.',1),
  C('q7','VOCAB_CONTEXT',3,'Quel mot n’est PAS de la famille de « mer » ?',['marteau','marée','marin'],0,'Un marteau est un outil : il n’a aucun lien de sens avec la mer. Marin et marée parlent de la mer.'),
  C('q8','EXPLICIT',2,'Vrai ou faux : à marée basse, l’eau arrive près des dunes.',['Vrai','Faux'],1,'C’est à marée haute que l’eau arrive près des dunes.',2),
  T('q9','EXPLICIT',2,'Cite un animal marin que le texte nomme.',['poisson','poissons','crabe','crabes','étoile de mer','étoiles de mer','baleine','baleines','les poissons','les crabes','les baleines'],'Le texte nomme des poissons, des crabes, des étoiles de mer et des baleines.',3),
  O('q13','SEQUENCE',3,'Remets ces informations dans l’ordre du texte.',['L’eau de la mer est salée','Les marins travaillent sur un navire','La marée monte puis descend'],'Le texte parle d’abord de l’eau, puis des marins, puis de la marée.'),
  E('q10','JUSTIFY',3,'Quelle phrase explique ce que fait la marée ?',2,'« la marée monte, puis elle descend » : c’est la définition de la marée.'),
  C('q11','VOCAB_CONTEXT',2,'Dans ce texte, un « navire » est…',['une plage','un grand bateau','un poisson'],1,'Le texte dit : « un grand navire ou un petit bateau de pêche » : le navire est un bateau.',1),
  C('q12','INFERENCE',4,'À marée basse, où se trouve l’eau ?',['Près des dunes','Plus loin des dunes','Sur les dunes'],1,'À marée haute l’eau arrive près des dunes, donc à marée basse elle s’éloigne et laisse le sable à découvert.',2)
 ]}));

LIST.push(R({id:'fr_ce1_bibliothecaire_01',level:'CE1',dt:'récit',title:'Le livre des dragons',links:['ce1-fr-types-phrases'],diff:3,min:2,audio:'audioRecommended',sess:6,
 p:['Lou est la bibliothécaire de la classe. Ce matin, elle range les livres sur les étagères.','Max s’approche et lui demande : « Qu’est-ce que tu cherches ? »','« Je voudrais relire le livre des dragons, mais je ne le trouve pas. » répond Lou.','« Regarde sur l’étagère du haut ! » conseille Max.','Lou grimpe sur le petit escabeau et attrape le livre. « Le voilà ! Quelle chance ! » s’écrie-t-elle.','« Tu me le prêtes ? » demande Max.','« Oui, mais rapporte-le vendredi », dit Lou en souriant.'],
 g:[['bibliothécaire','La personne qui s’occupe des livres.'],['escabeau','Un petit escalier mobile pour atteindre un endroit haut.'],['étagère','Une planche fixée au mur pour poser des livres ou des objets.']],
 questions:[
  C('q1','CHARACTER',1,'Qui est la bibliothécaire de la classe ?',['Max','Lou','La maîtresse'],1,'La 1ʳᵉ phrase dit : « Lou est la bibliothécaire de la classe. »',0),
  C('q2','EXPLICIT',1,'Que fait Lou ce matin ?',['Elle écrit une lettre','Elle prépare un gâteau','Elle range les livres'],2,'Le texte dit : « elle range les livres sur les étagères ».',0),
  C('q3','EXPLICIT',1,'Quel livre Lou voudrait-elle relire ?',['Le livre des dragons','Le livre des pirates','Le livre des fées'],0,'Le texte dit : « le livre des dragons ».',2),
  C('q4','PLACE',2,'Où se trouve le livre des dragons ?',['Sous la table','Sur l’étagère du haut','Dans le sac de Max'],1,'Max dit : « Regarde sur l’étagère du haut ! » et Lou y attrape le livre.',3),
  C('q5','STRUCTURE',2,'Quelle phrase est une question ?',['Regarde sur l’étagère du haut !','Tu me le prêtes ?','Le voilà !'],1,'Une question demande quelque chose et finit par un point d’interrogation : « Tu me le prêtes ? »',5),
  C('q6','STRUCTURE',2,'Quelle phrase donne un conseil ou un ordre ?',['Qu’est-ce que tu cherches ?','Quelle chance !','Regarde sur l’étagère du haut !'],2,'Le verbe « regarde » donne un conseil : c’est une phrase impérative.',3),
  C('q7','STRUCTURE',3,'Quelle phrase exprime la joie ou la surprise (phrase exclamative) ?',['Quelle chance !','Tu me le prêtes ?','Oui, mais rapporte-le vendredi.'],0,'« Quelle chance ! » exprime la joie de Lou, avec un point d’exclamation.',4),
  C('q8','STRUCTURE',3,'Dans « Je ne le trouve pas », quelle est la forme de la phrase ?',['Affirmative','Négative','Interrogative'],1,'Les mots « ne… pas » entourent le verbe : c’est la forme négative.',2),
  T('q9','EXPLICIT,TIME',2,'Quel jour Max doit-il rapporter le livre ?',['vendredi','le vendredi'],'Lou dit : « rapporte-le vendredi ».',6),
  O('q10','SEQUENCE',2,'Remets les événements dans l’ordre.',['Lou cherche le livre des dragons','Lou grimpe sur l’escabeau','Max demande à emprunter le livre'],'Lou cherche d’abord le livre, elle le trouve en haut, puis Max le lui demande.'),
  C('q11','CAUSE_CONSEQUENCE',3,'Pourquoi Lou grimpe-t-elle sur l’escabeau ?',['Pour jouer','Pour ranger les chaussures','Pour attraper le livre posé en haut'],2,'L’étagère est en haut : sans escabeau, Lou ne peut pas atteindre le livre.',4),
  E('q12','JUSTIFY,EMOTION_INTENTION',3,'Quelle phrase montre que Lou est contente de retrouver son livre ?',4,'« Le voilà ! Quelle chance ! » : ces exclamations montrent sa joie.')
 ]}));

LIST.push(R({id:'fr_ce1_biscotte_01',level:'CE1',dt:'récit',title:'Biscotte et l’écureuil',links:['ce1-fr-sujet-verbe','ce1-fr-accord-sv'],diff:3,min:2,audio:'audioRecommended',sess:6,
 p:['Chaque matin, Mme Roux promène son chien Biscotte dans le parc.','Biscotte court après les pigeons. Les pigeons s’envolent en battant des ailes.','Un jour, Biscotte aperçoit un écureuil. L’écureuil grimpe dans un grand chêne.','Le chien aboie, saute, gratte l’écorce, mais il ne peut pas monter.','Mme Roux rit et appelle : « Viens, Biscotte ! »','Le chien revient, la queue basse. Il reçoit un biscuit.'],
 g:[['aperçoit','Voit tout à coup.'],['écorce','La peau dure d’un arbre.'],['chêne','Un grand arbre qui donne des glands.']],
 questions:[
  C('q1','CHARACTER',1,'Qui promène Biscotte ?',['Un voisin','Mme Roux','Un écureuil'],1,'La 1ʳᵉ phrase dit : « Mme Roux promène son chien Biscotte ».',0),
  C('q2','PLACE',1,'Où se promènent Mme Roux et son chien ?',['Dans le parc','À la plage','Dans un magasin'],0,'Le texte dit : « dans le parc ».',0),
  C('q3','CAUSE_CONSEQUENCE',2,'Que font les pigeons quand Biscotte court vers eux ?',['Ils dorment','Ils aboient','Ils s’envolent'],2,'Le texte dit : « Les pigeons s’envolent en battant des ailes ».',1),
  C('q4','CHARACTER',1,'Qui grimpe dans le grand chêne ?',['Biscotte','L’écureuil','Mme Roux'],1,'Le texte dit : « L’écureuil grimpe dans un grand chêne ».',2),
  C('q5','REFERENCE,VOCAB_CONTEXT',2,'Dans « L’écureuil grimpe dans un grand chêne », quel mot est le verbe ?',['grimpe','chêne','grand'],0,'Le verbe dit ce que fait l’écureuil : il grimpe.',2),
  C('q6','REFERENCE',2,'Dans « Biscotte court après les pigeons », qui court ?',['Biscotte','Les pigeons','Mme Roux'],0,'Pour trouver le sujet, on pose la question « Qui est-ce qui court ? » : c’est Biscotte.',1),
  C('q7','VOCAB_CONTEXT',3,'Combien y a-t-il de verbes dans « Le chien aboie, saute, gratte l’écorce » ?',['Un','Deux','Trois'],2,'Le chien fait trois actions : il aboie, il saute, il gratte. Chaque action est un verbe.',3),
  C('q8','VOCAB_CONTEXT',3,'Pourquoi écrit-on « les pigeons s’envolent » avec -nt ?',['Parce que c’est le matin','Parce qu’il y a plusieurs pigeons','Parce que le chien court'],1,'Le sujet « les pigeons » est pluriel : le verbe s’accorde et prend -nt.',1),
  C('q9','INFERENCE,EMOTION_INTENTION',4,'Pourquoi Biscotte revient-il la queue basse ?',['Il est content','Il a très faim','Il est déçu de ne pas avoir attrapé l’écureuil'],2,'Il a essayé de monter dans l’arbre sans y arriver : la queue basse montre sa déception.',5),
  O('q10','SEQUENCE',2,'Remets les événements dans l’ordre.',['Biscotte court après les pigeons','Biscotte aperçoit un écureuil','Biscotte reçoit un biscuit'],'Biscotte chasse d’abord les pigeons, puis il aperçoit l’écureuil, et il reçoit un biscuit à la fin.'),
  E('q11','JUSTIFY',3,'Quelle phrase montre que Biscotte obéit à Mme Roux ?',5,'Mme Roux appelle et « le chien revient » : il obéit.'),
  T('q12','CHARACTER,EXPLICIT',2,'Quel animal Biscotte aperçoit-il un jour ?',['un écureuil','écureuil','l’écureuil'],'Le texte dit : « Biscotte aperçoit un écureuil ».',2)
 ]}));

LIST.push(R({id:'fr_ce1_dictionnaire_page_01',level:'CE1',dt:'document pratique (extrait de dictionnaire)',title:'Une page de dictionnaire',doc:true,src:'Document original Finot Académie : cette page de dictionnaire est imaginaire ; les définitions et les exemples sont écrits pour l’exercice.',links:['ce1-fr-alphabet'],diff:3,min:2,audio:'audioAllowed',sess:6,
 p:['DICTIONNAIRE DES PETITS — page 42 — de « lac » à « lapin »','lac (nom masculin) : grande étendue d’eau entourée de terre. Exemple : Nous nageons dans le lac.','laine (nom féminin) : poil du mouton, avec lequel on fabrique des pulls. Exemple : Ce pull est en laine.','laisser (verbe) : ne pas emporter, ne pas prendre. Exemple : Je laisse mon manteau à l’école.','lait (nom masculin) : liquide blanc que boivent les bébés et que donnent la vache ou la chèvre. Exemple : Je bois du lait chaud.','lampe (nom féminin) : objet qui éclaire. Exemple : Allume la lampe, il fait nuit.'],
 g:[['étendue','Une grande surface.'],['éclaire','Donne de la lumière.'],['chèvre','Un animal à cornes qui donne du lait.']],
 questions:[
  C('q1','STRUCTURE,INFERENCE',4,'Quel mot pourrait se trouver sur cette page ?',['lit','lame','loup'],1,'« lame » commence par « lam », entre « lac » et « lapin » dans l’alphabet. « lit » et « loup » viennent après « lapin ».',0),
  C('q2','STRUCTURE',3,'Quel mot vient juste après « laine » sur la page ?',['laisser','lac','lait'],0,'Après « laine » vient « laisser » : n vient avant s dans l’alphabet.',3),
  O('q3','STRUCTURE',3,'Range ces mots dans l’ordre alphabétique.',['lac','lait','lampe'],'« lac », puis « lait » (c avant i), puis « lampe » (i avant m).'),
  C('q4','VOCAB_CONTEXT',2,'Quel mot est un verbe ?',['laine','laisser','lampe'],1,'Le dictionnaire écrit « verbe » après « laisser ».',3),
  C('q5','EXPLICIT',2,'Que veut dire « laine » ?',['Un liquide blanc','Un objet qui éclaire','Le poil du mouton'],2,'La définition dit : « poil du mouton, avec lequel on fabrique des pulls ».',2),
  T('q6','EXPLICIT',2,'Quel mot désigne un objet qui éclaire ?',['lampe','la lampe'],'La définition de « lampe » est : « objet qui éclaire ».',5),
  C('q7','STRUCTURE,VOCAB_CONTEXT',4,'Pourquoi écrit-on « nom masculin » après « lac » ?',['Pour dire que le lac est froid','Pour dire que le lac est grand','Pour dire qu’on emploie « un » : un lac'],2,'Un nom masculin s’emploie avec « un » ou « le » : on dit un lac. « nom féminin » veut dire « une » ou « la ».',1),
  C('q8','STRUCTURE',3,'Que montrent les mots « lac » et « lapin » en haut de la page ?',['Que tous les mots commencent par p','Que les mots de la page vont de « lac » à « lapin » dans l’ordre alphabétique','Que la page parle de lapins'],1,'Ces mots repères montrent le premier et le dernier mot possible de la page. Ils aident à savoir si le mot cherché est là.',0),
  C('q9','VOCAB_CONTEXT',2,'Vrai ou faux : « lait » est un verbe.',['Vrai','Faux'],1,'Le dictionnaire écrit « nom masculin » : lait est un nom.',4),
  E('q10','JUSTIFY',3,'Dans quelle entrée trouve-t-on un exemple qui parle de la nuit ?',5,'« Allume la lampe, il fait nuit. » : c’est l’exemple de lampe.'),
  T('q11','EXPLICIT',2,'Complète l’exemple de « laisser » : Je laisse mon manteau à ___.',['l’école','école'],'L’exemple dit : « Je laisse mon manteau à l’école. »',3),
  C('q12','STRUCTURE',4,'Pourquoi « laine » est-il avant « lait » dans le dictionnaire ?',['Parce que « n » vient avant « t » dans l’alphabet','Parce que « laine » est plus long','Parce que « lait » est un verbe'],0,'Les deux mots commencent par « lai- ». On regarde la lettre suivante : n vient avant t.',2)
 ]}));

LIST.push(R({id:'fr_ce1_gateau_yaourt_01',level:'CE1',dt:'recette',title:'Le gâteau au yaourt',doc:true,src:'Document original Finot Académie : recette simplifiée écrite pour l’exercice ; on utilise toujours le four avec un adulte.',links:['ce1-fr-infinitif'],diff:3,min:2,audio:'audioAllowed',sess:6,
 p:['GÂTEAU AU YAOURT — pour 6 personnes. Préparation : 10 minutes. Cuisson : 30 minutes.','Ingrédients : un pot de yaourt nature, trois pots de farine, deux pots de sucre, un demi-pot d’huile, trois œufs, un sachet de levure.','Étape 1 : allumer le four à 180 degrés.','Étape 2 : verser le yaourt dans un saladier, puis ajouter le sucre et les œufs.','Étape 3 : mélanger avec une cuillère, puis ajouter la farine, la levure et l’huile.','Étape 4 : verser la pâte dans un moule et laisser cuire pendant 30 minutes.','Attention ! Demander à un adulte pour allumer le four et pour sortir le gâteau.'],
 g:[['levure','Une poudre qui fait gonfler le gâteau.'],['pâte','Le mélange mou qui devient un gâteau en cuisant.'],['saladier','Un grand bol creux pour mélanger.']],
 questions:[
  C('q1','EXPLICIT',1,'Pour combien de personnes est cette recette ?',['Pour 4 personnes','Pour 6 personnes','Pour 10 personnes'],1,'Le titre dit : « pour 6 personnes ».',0),
  T('q2','EXPLICIT',2,'Combien de temps le gâteau cuit-il ?',['30 minutes','trente minutes','30 min','30','trente'],'La recette dit : « Cuisson : 30 minutes ».',0),
  C('q3','EXPLICIT',2,'Combien de pots de farine faut-il ?',['Trois','Deux','Six'],0,'La liste des ingrédients dit : « trois pots de farine ».',1),
  C('q4','EXPLICIT',2,'Combien d’œufs faut-il ?',['Deux','Un','Trois'],2,'La liste des ingrédients dit : « trois œufs ».',1),
  C('q5','EXPLICIT,SEQUENCE',2,'Que fait-on à l’étape 3 ?',['On allume le four','On mélange puis on ajoute la farine','On sort le gâteau'],1,'À l’étape 3 : « mélanger avec une cuillère, puis ajouter la farine, la levure et l’huile ».',4),
  O('q6','SEQUENCE',3,'Remets les actions dans l’ordre de la recette.',['Allumer le four','Verser le yaourt dans un saladier','Mélanger avec une cuillère','Laisser cuire le gâteau'],'On suit les étapes 1, 2, 3 puis 4 : le four, le yaourt, le mélange, la cuisson.'),
  C('q7','VOCAB_CONTEXT',3,'Quel mot est un verbe à l’infinitif ?',['Pâte','Moule','Mélanger'],2,'« Mélanger » est un verbe : il se termine par -er et dit une action. Pâte et moule sont des noms.',4),
  C('q8','INFERENCE,CAUSE_CONSEQUENCE',3,'Pourquoi faut-il demander à un adulte pour le four ?',['Parce que le four est très chaud et peut brûler','Parce que le gâteau est trop lourd','Parce que le four fait du bruit'],0,'Un four allumé est brûlant : un enfant ne doit pas s’en servir seul.',6),
  E('q9','JUSTIFY,STRUCTURE',3,'Quelle phrase donne un conseil de sécurité ?',6,'La phrase qui commence par « Attention ! » protège l’enfant : il faut un adulte pour le four.'),
  C('q10','GENRE',2,'Ce texte est…',['un conte','une recette de cuisine','une lettre'],1,'Il donne la liste des ingrédients et les étapes pour faire un gâteau : c’est une recette.'),
  C('q11','EXPLICIT',2,'Vrai ou faux : il faut du chocolat pour ce gâteau.',['Vrai','Faux'],1,'Le chocolat n’est pas dans la liste des ingrédients.',1),
  C('q12','INFERENCE',4,'À quoi sert le pot de yaourt vide dans cette recette ?',['À mesurer la température du four','À mesurer le temps de cuisson','À mesurer les quantités des autres ingrédients'],2,'La recette compte en « pots » : on utilise le pot de yaourt comme mesure pour la farine, le sucre et l’huile.',1)
 ]}));

/* ===== CE2 ===== */
LIST.push(R({id:'fr_ce2_dictionnaire_extrait_01',level:'CE2',dt:'document pratique (extrait de dictionnaire)',title:'Une page de dictionnaire : de valise à vase',doc:true,src:'Document original Finot Académie : cette page de dictionnaire est imaginaire ; les définitions et les exemples sont écrits pour l’exercice.',links:['ce2-fr-dictionnaire'],diff:3,min:2,audio:'audioAllowed',sess:7,
 p:['DICTIONNAIRE DES JEUNES LECTEURS — extrait de la page 118, de « valise » à « vase »','Abréviations : n. m. = nom masculin ; n. f. = nom féminin ; v. = verbe.','valise n. f. Sac rigide dans lequel on range ses vêtements pour voyager. Ex. : Elle ferme sa valise avant de partir.','vallée n. f. Espace creux entre deux montagnes ou deux collines. Souvent, une rivière y coule. Ex. : Le village est au fond de la vallée.','vapeur n. f. 1. Nuage très fin d’eau chaude. Ex. : De la vapeur sort de la casserole. 2. Cuire à la vapeur : cuire des aliments au-dessus de l’eau bouillante, sans les plonger dedans.','vase 1. n. m. Récipient pour mettre des fleurs. Ex. : Elle met des tulipes dans un vase. 2. n. f. Boue du fond d’un lac ou d’une rivière. Ex. : Le pêcheur a de la vase sur ses bottes.'],
 g:[['rigide','Dur, qui ne se plie pas.'],['récipient','Un objet creux qui peut contenir quelque chose.'],['boue','De la terre mélangée avec de l’eau.']],
 questions:[
  C('q1','VOCAB_CONTEXT,STRUCTURE',2,'Que veut dire « n. f. » dans ce dictionnaire ?',['nom féminin','nom fragile','nouveau film'],0,'La ligne des abréviations dit : « n. f. = nom féminin ».',1),
  C('q2','VOCAB_CONTEXT',3,'Dans quelle phrase le mot « vase » veut-il dire « boue » ?',['Elle met des tulipes dans un vase.','Le pêcheur a de la vase sur ses bottes.','Le vase est tombé de la table.'],1,'Le sens 2 de « vase » est « boue du fond d’un lac ». Seul le pêcheur a de la boue sur ses bottes.',5),
  C('q3','EXPLICIT',2,'Quelle est la définition de « vallée » ?',['Un sac pour voyager','Un espace creux entre deux montagnes','Un nuage d’eau chaude'],1,'Le dictionnaire dit : « Espace creux entre deux montagnes ou deux collines ».',3),
  O('q4','STRUCTURE',3,'Range ces mots dans l’ordre du dictionnaire.',['valise','vapeur','vase'],'« valise » (l), « vapeur » (p) puis « vase » (s) : on compare la 3ᵉ lettre, l puis p puis s.'),
  C('q5','VOCAB_CONTEXT,EXPLICIT',3,'Que veut dire « cuire à la vapeur » ?',['Cuire dans de l’huile','Cuire au four sans eau','Cuire au-dessus de l’eau bouillante, sans plonger les aliments dedans'],2,'Le sens 2 de « vapeur » explique : au-dessus de l’eau bouillante, sans plonger les aliments dedans.',4),
  C('q6','STRUCTURE',3,'Pourquoi « vase » a-t-il deux numéros (1 et 2) ?',['Parce que le mot a deux sens différents','Parce que le mot est très long','Parce que c’est une faute'],0,'Un même mot peut avoir plusieurs sens : le dictionnaire les numérote. Ici : le récipient (1) et la boue (2).',5),
  T('q7','EXPLICIT,JUSTIFY',3,'Dans quelle entrée lit-on « une rivière y coule » ?',['vallée','la vallée'],'C’est dans l’entrée « vallée » : « Souvent, une rivière y coule. »',3),
  C('q8','VOCAB_CONTEXT',3,'Vrai ou faux : « vase » est toujours un nom masculin.',['Vrai','Faux'],1,'Pour le récipient, c’est « n. m. » (un vase), mais pour la boue, c’est « n. f. » (la vase).',5),
  E('q9','STRUCTURE,JUSTIFY',3,'Quelle ligne explique ce que veulent dire les abréviations ?',1,'La ligne « Abréviations : n. m. = nom masculin… » donne la clé pour lire les entrées.'),
  C('q10','STRUCTURE,INFERENCE',5,'Où se placerait le mot « vanille » dans ce dictionnaire ?',['Avant « valise »','Entre « vallée » et « vapeur »','Après « vase »'],1,'« vanille » : v-a-n. La 3ᵉ lettre n vient après l (vallée) et avant p (vapeur).'),
  T('q11','EXPLICIT',2,'Complète l’exemple de « valise » : Elle ferme sa valise avant de ___.',['partir'],'L’exemple dit : « Elle ferme sa valise avant de partir. »',2)
 ]}));

LIST.push(R({id:'fr_ce2_gaspard_mots_01',level:'CE2',dt:'récit',title:'Gaspard et les mots à double sens',links:['ce2-fr-polysemie'],diff:3,min:3,audio:'audioAllowed',sess:7,
 p:['Samedi, Gaspard s’assoit au pied d’un grand chêne. Autour de lui, le sol est couvert de feuilles brunes.','Il sort une feuille de papier et il écrit à sa grand-mère. Puis il se frotte le pied : une fourmi vient de le piquer !','De retour à la maison, il allume l’ordinateur de son père. Il déplace la souris et clique sur un jeu.','Soudain, sa petite sœur crie : « Une souris dans la cuisine ! » Gaspard bondit, mais ce n’est qu’un jouet du chat.','Pour se calmer, il mange une glace à la fraise. Puis il se regarde dans la glace de l’entrée : il a le nez tout rose !'],
 g:[['bondit','Saute brusquement.'],['brunes','De couleur marron.'],['fourmi','Un tout petit insecte qui vit en colonie.']],
 questions:[
  C('q1','VOCAB_CONTEXT',2,'Dans « le sol est couvert de feuilles brunes », que sont les feuilles ?',['Des feuilles d’arbre tombées','Des feuilles de papier','Des feuilles de salade'],0,'Le texte parle du sol sous un chêne : ce sont des feuilles d’arbre.',0),
  C('q2','VOCAB_CONTEXT',2,'Dans « une feuille de papier », le mot « feuille » désigne…',['Une partie d’un arbre','Un morceau de papier fin','Une salade'],1,'Gaspard écrit sur cette feuille : c’est du papier, pas une feuille d’arbre.',1),
  C('q3','VOCAB_CONTEXT',2,'Dans « au pied d’un grand chêne », le mot « pied » désigne…',['Une partie du corps','Un meuble','Le bas de l’arbre'],2,'Le pied d’un arbre, c’est le bas du tronc, là où il touche le sol.',0),
  C('q4','VOCAB_CONTEXT',2,'Dans « il se frotte le pied », le mot « pied » désigne…',['Le bas de l’arbre','Une partie du corps','Un morceau de papier'],1,'Gaspard se frotte le pied parce qu’une fourmi l’a piqué : c’est son pied de garçon.',1),
  C('q5','VOCAB_CONTEXT',3,'Au paragraphe 3 (« Il déplace la souris et clique sur un jeu »), la souris est…',['un animal','l’objet de l’ordinateur','un jouet pour le chat'],1,'On déplace et on clique : c’est la souris de l’ordinateur.',2),
  C('q6','VOCAB_CONTEXT,INFERENCE',3,'Au paragraphe 4, que se révèle être la « souris » de la cuisine ?',['Un vrai animal','L’objet de l’ordinateur','Un jouet du chat'],2,'Le texte dit : « ce n’est qu’un jouet du chat ». Le mot « souris » a ici encore un autre sens.',3),
  C('q7','VOCAB_CONTEXT',2,'Dans « une glace à la fraise », le mot « glace » désigne…',['Un miroir','De l’eau gelée','Un dessert froid'],2,'Gaspard la mange : c’est un dessert glacé.',4),
  C('q8','VOCAB_CONTEXT',2,'Dans « la glace de l’entrée », le mot « glace » désigne…',['Un miroir','Un dessert','Un glaçon'],0,'Gaspard « se regarde dans la glace » : c’est un miroir.',4),
  C('q9','CAUSE_CONSEQUENCE',3,'Pourquoi Gaspard bondit-il au paragraphe 4 ?',['Il a mal au pied','Il croit qu’une vraie souris est dans la cuisine','Il gagne au jeu'],1,'Sa sœur crie « Une souris dans la cuisine ! » et Gaspard pense qu’il s’agit d’un animal.',3),
  O('q10','SEQUENCE',2,'Remets ces événements dans l’ordre.',['Gaspard s’assoit au pied du chêne','Gaspard clique avec la souris','Gaspard mange une glace'],'Il est d’abord dehors, puis devant l’ordinateur, et il mange sa glace à la fin.'),
  C('q11','MAIN_IDEA',4,'Qu’est-ce qui montre que le mot « souris » a plusieurs sens ?',['Il est écrit avec un s','Il désigne un animal et aussi un objet d’ordinateur','Il est toujours au pluriel'],1,'Selon le contexte, « souris » veut dire un animal ou l’objet de l’ordinateur. C’est ce qu’on appelle un mot polysémique.',2),
  E('q12','JUSTIFY',3,'Dans quel paragraphe le mot « souris » désigne-t-il l’objet de l’ordinateur ?',2,'« Il déplace la souris et clique » : on ne clique pas sur un animal !')
 ]}));

LIST.push(R({id:'fr_ce2_atelier_velo_01',level:'CE2',dt:'récit',title:'L’atelier de Marc',links:['ce2-fr-prefixes-suffixes'],diff:3,min:2,audio:'audioAllowed',sess:7,
 p:['Marc est réparateur de vélos. Chaque matin, il ouvre son atelier au coin de la rue.','Un jour, Inès arrive avec un vélo inutilisable : la roue est tordue et la chaîne est détachée.','« Impossible de rouler avec ça ! » soupire-t-elle.','Marc ne s’inquiète pas. Il démonte la roue, puis il la redresse doucement. Ensuite, il remonte la chaîne.','Le soir, Inès revient. Elle reprend son vélo : la roue est droite et la chaîne est bien attachée.','« Merci ! Il est comme neuf ! » dit-elle, ravie.'],
 g:[['tordue','Qui n’est plus droite.'],['redresse','Remet droit.'],['atelier','Le lieu où travaille un artisan.']],
 questions:[
  C('q1','CHARACTER',1,'Quel est le métier de Marc ?',['Réparateur de vélos','Marchand de glaces','Maître d’école'],0,'La 1ʳᵉ phrase dit : « Marc est réparateur de vélos ».',0),
  C('q2','EXPLICIT',2,'Qu’est-ce qui ne va pas sur le vélo d’Inès ?',['Les freins sont rouges','La roue est tordue et la chaîne est détachée','Le guidon est trop haut'],1,'Le texte dit : « la roue est tordue et la chaîne est détachée ».',1),
  C('q3','VOCAB_CONTEXT',3,'Dans « détachée », quel est le préfixe ?',['-ée','tach-','dé-'],2,'Le préfixe est au début du mot : dé- + attachée. Il indique le contraire.',1),
  C('q4','VOCAB_CONTEXT',3,'Dans « réparateur », quel est le suffixe ?',['ré-','répar-','-ateur'],2,'Le suffixe se place à la fin du mot : répar- + -ateur. Il désigne celui qui fait l’action.',0),
  C('q5','VOCAB_CONTEXT',3,'Que veut dire le préfixe « re- » dans « remonter » ?',['Jamais','De nouveau','Pas du tout'],1,'Remonter la chaîne, c’est la monter de nouveau : re- indique que l’action recommence.',3),
  C('q6','VOCAB_CONTEXT',3,'Que veut dire « inutilisable » ?',['Qui est très utile','Qui est tout neuf','Qui ne peut pas être utilisé'],2,'Le préfixe in- veut dire « pas » et le suffixe -able veut dire « qu’on peut » : on ne peut pas l’utiliser.',1),
  C('q7','VOCAB_CONTEXT',4,'Le préfixe « dé- » dans « démonte » indique…',['une action contraire à monter : on défait, on enlève','que l’action recommence','que c’est impossible'],0,'Démonter, c’est le contraire de monter : on retire les pièces.',3),
  T('q8','VOCAB_CONTEXT',3,'Quel préfixe de « impossible » veut dire « pas » ?',['im','im-'],'Dans « impossible », le préfixe « im- » a le même sens que « pas » : pas possible.',2),
  C('q9','VOCAB_CONTEXT',3,'Quel mot du texte contient le préfixe « re- » ?',['rouler','roue','redresse'],2,'Redresse = re- + dresse : on remet droit.',3),
  O('q10','SEQUENCE',2,'Remets les événements dans l’ordre.',['Inès arrive avec un vélo cassé','Marc redresse la roue','Inès reprend son vélo réparé'],'Le vélo arrive cassé, Marc le répare, puis Inès le reprend.'),
  C('q11','CAUSE_CONSEQUENCE',3,'Pourquoi Inès est-elle ravie à la fin ?',['Parce que Marc a gardé le vélo','Parce que le vélo est comme neuf','Parce que la roue est tordue'],1,'La roue est droite et la chaîne attachée : elle dit « Il est comme neuf ! ».',5),
  E('q12','JUSTIFY,EMOTION_INTENTION',3,'Quelle phrase montre que Marc reste calme ?',3,'« Marc ne s’inquiète pas » : il sait qu’il peut réparer le vélo.')
 ]}));

LIST.push(R({id:'fr_ce2_boulangerie_dialogue_01',level:'CE2',dt:'récit',title:'Devant la boulangerie',links:['ce2-fr-phrase'],diff:3,min:2,audio:'audioAllowed',sess:7,
 p:['Lundi matin, Théo et sa sœur Zoé attendent devant la boulangerie.','— Qu’est-ce que tu vas acheter ? demande Zoé.','— Je ne sais pas encore, répond Théo. Un pain au chocolat, peut-être.','— Quelle bonne idée ! s’exclame Zoé. Prends-en deux !','La boulangère les accueille avec un grand sourire :','— Bonjour, les enfants ! Que désirez-vous ?','— Deux pains au chocolat, s’il vous plaît, dit Théo.'],
 g:[['accueille','Reçoit quelqu’un quand il arrive.'],['s’exclame','Dit en s’écriant, avec force.'],['boulangère','La personne qui fait et vend le pain.']],
 questions:[
  C('q1','CHARACTER',2,'Combien de personnes parlent dans ce texte ?',['Deux','Trois','Quatre'],1,'Zoé, Théo et la boulangère prennent la parole : trois personnes.'),
  C('q2','EXPLICIT',1,'Que va acheter Théo, peut-être ?',['Un pain au chocolat','Une baguette','Un gâteau'],0,'Théo répond : « Un pain au chocolat, peut-être. »',2),
  C('q3','STRUCTURE',3,'Quel signe montre qu’une nouvelle personne se met à parler ?',['Le point-virgule','Les points de suspension','Le tiret (—) au début de la ligne'],2,'Dans un dialogue, un tiret au début de la ligne annonce que quelqu’un d’autre parle.',1),
  C('q4','STRUCTURE',3,'Quelle phrase est interrogative (une question) ?',['Quelle bonne idée !','Qu’est-ce que tu vas acheter ?','Prends-en deux !'],1,'Elle pose une question et se termine par un point d’interrogation.',1),
  C('q5','STRUCTURE',3,'Quelle phrase est exclamative ?',['Je ne sais pas encore.','Que désirez-vous ?','Quelle bonne idée !'],2,'« Quelle bonne idée ! » exprime l’enthousiasme de Zoé.',3),
  C('q6','STRUCTURE',3,'Quelle phrase donne un conseil ou un ordre (phrase impérative) ?',['Prends-en deux !','Bonjour, les enfants !','Que désirez-vous ?'],0,'Le verbe « prends » est à l’impératif : Zoé conseille à son frère.',3),
  C('q7','STRUCTURE',4,'La phrase « Je ne sais pas encore » est de forme…',['affirmative','interrogative','négative'],2,'Le verbe est entouré de « ne… pas » : c’est la forme négative.',2),
  T('q8','STRUCTURE',3,'Dans « — Qu’est-ce que tu vas acheter ? demande Zoé », quel verbe indique qui parle ?',['demande'],'Le verbe « demande » dit que Zoé parle et qu’elle pose une question.',1),
  C('q9','VOCAB_CONTEXT',3,'Que veut dire « s’exclame » ?',['Se tait','Dit en s’écriant, avec force','Chante doucement'],1,'Zoé est enthousiaste : elle parle fort, elle s’écrie.',3),
  E('q10','JUSTIFY,CHARACTER',3,'Quelle réplique est dite par la boulangère ?',5,'Elle dit « Bonjour, les enfants ! Que désirez-vous ? » : le paragraphe 4 l’annonçait en disant qu’elle les accueille.'),
  C('q11','INFERENCE,EMOTION_INTENTION',4,'Pourquoi Zoé dit-elle « Prends-en deux ! » ?',['Elle est fâchée','Elle trouve l’idée bonne et encourage son frère','Elle n’a pas faim'],1,'Elle vient de dire « Quelle bonne idée ! » : elle encourage son frère à en prendre davantage.',3),
  O('q12','SEQUENCE',2,'Remets les événements dans l’ordre.',['Les enfants attendent devant la boulangerie','Théo parle de son pain au chocolat','Théo commande deux pains au chocolat'],'Ils attendent, ils discutent, puis Théo commande.')
 ]}));

LIST.push(R({id:'fr_ce2_tempete_port_01',level:'CE2',dt:'récit',title:'La tempête sur le port',links:['ce2-fr-constituants'],diff:4,min:2,audio:'audioAllowed',sess:7,
 p:['Ce matin, une forte tempête arrive sur la côte.','Les vagues grossissent et frappent violemment les rochers.','Dans le port, les pêcheurs attachent leurs bateaux avec de grosses cordes.','Le gardien du phare allume la lumière pour guider les navires.','Les enfants du village regardent la mer depuis la fenêtre de l’école.','Le soir, le vent se calme et le soleil réapparaît.'],
 g:[['phare','Une haute tour au bord de la mer qui envoie de la lumière aux bateaux.'],['côte','Le bord de la mer.'],['guider','Montrer le chemin.']],
 questions:[
  C('q1','PLACE',1,'Où arrive la tempête ?',['Sur la côte','Dans une forêt','En montagne'],0,'La 1ʳᵉ phrase dit : « une forte tempête arrive sur la côte ».',0),
  C('q2','EXPLICIT',2,'Que font les vagues ?',['Elles disparaissent','Elles grossissent et frappent violemment les rochers','Elles chantent'],1,'Le texte dit : « Les vagues grossissent et frappent violemment les rochers ».',1),
  C('q3','EXPLICIT',2,'Avec quoi les pêcheurs attachent-ils leurs bateaux ?',['Avec des rubans','Avec des chaînes d’or','Avec de grosses cordes'],2,'Le texte dit : « avec de grosses cordes ».',2),
  C('q4','CHARACTER',2,'Qui allume la lumière du phare ?',['Les enfants','Le gardien du phare','Les pêcheurs'],1,'Le texte dit : « Le gardien du phare allume la lumière ».',3),
  C('q5','VOCAB_CONTEXT',3,'Dans « Les vagues grossissent », quel est le sujet du verbe « grossissent » ?',['les rochers','la tempête','Les vagues'],2,'On pose la question « Qui est-ce qui grossit ? » : ce sont les vagues.',1),
  C('q6','VOCAB_CONTEXT',4,'Dans « Le gardien du phare allume la lumière », qu’allume-t-il ?',['les navires','la lumière','le phare'],1,'« la lumière » répond à la question « il allume quoi ? » : c’est le complément d’objet.',3),
  C('q7','VOCAB_CONTEXT',4,'Dans « Dans le port, les pêcheurs attachent leurs bateaux », « Dans le port » indique…',['le moment','la manière','le lieu'],2,'« Dans le port » répond à la question « où ? » : c’est un complément de lieu.',2),
  C('q8','VOCAB_CONTEXT',4,'Dans « Le soir, le vent se calme », « Le soir » indique…',['le lieu','le moment','la manière'],1,'« Le soir » répond à la question « quand ? » : c’est un complément de temps.',5),
  T('q9','VOCAB_CONTEXT',4,'Quel mot du deuxième paragraphe dit comment les vagues frappent les rochers ?',['violemment'],'« violemment » répond à la question « comment ? » : il décrit la force des vagues.',1),
  C('q10','CAUSE_CONSEQUENCE',3,'Pourquoi le gardien allume-t-il la lumière du phare ?',['Pour décorer le port','Pour guider les navires','Pour dormir'],1,'Le texte donne la raison : « pour guider les navires ».',3),
  O('q11','SEQUENCE',2,'Remets les événements dans l’ordre.',['La tempête arrive','Les pêcheurs attachent leurs bateaux','Le vent se calme'],'La tempête arrive, on protège les bateaux, puis le vent se calme le soir.'),
  E('q12','JUSTIFY',3,'Quelle phrase montre que la tempête se termine ?',5,'« le vent se calme et le soleil réapparaît » : le beau temps revient.')
 ]}));

LIST.push(R({id:'fr_ce2_cirque_adverbes_01',level:'CE2',dt:'récit',title:'Le cirque est arrivé',links:['ce2-fr-classes'],diff:3,min:2,audio:'audioAllowed',sess:7,
 p:['Hier soir, le cirque est arrivé près de l’école.','Les ouvriers ont monté la grande tente très rapidement.','Le clown marche lentement sur la piste. Il trébuche souvent, mais il se relève toujours en riant.','La jongleuse lance doucement ses balles, puis de plus en plus vite.','Le public applaudit bruyamment. Les enfants ne veulent jamais partir !'],
 g:[['jongleuse','Une artiste qui lance et rattrape des balles.'],['trébuche','Perd l’équilibre et manque de tomber.'],['ouvriers','Les personnes qui travaillent de leurs mains sur un chantier.']],
 questions:[
  C('q1','TIME',1,'Quand le cirque est-il arrivé ?',['Ce matin','Hier soir','Demain'],1,'La 1ʳᵉ phrase dit : « Hier soir, le cirque est arrivé ».',0),
  C('q2','EXPLICIT',2,'Comment les ouvriers ont-ils monté la tente ?',['Très rapidement','Très lentement','En silence'],0,'Le texte dit : « très rapidement ».',1),
  C('q3','EXPLICIT',2,'Comment le clown marche-t-il sur la piste ?',['Sur les mains','Rapidement','Lentement'],2,'Le texte dit : « Le clown marche lentement ».',2),
  C('q4','VOCAB_CONTEXT',3,'Dans « Le clown marche lentement », quel mot est un adverbe ?',['lentement','marche','piste'],0,'Un adverbe précise le verbe et ne change pas : « lentement » dit comment le clown marche.',2),
  C('q5','VOCAB_CONTEXT',4,'Dans « Il trébuche souvent », le mot « souvent » dit…',['où il trébuche','à quelle fréquence il trébuche','qui trébuche'],1,'« souvent » répond à la question « à quelle fréquence ? » : c’est un adverbe de temps.',2),
  C('q6','VOCAB_CONTEXT',3,'Quel adverbe du texte est le contraire de « lentement » ?',['Doucement','Bruyamment','Rapidement'],2,'Lentement et rapidement sont des contraires : on va soit lentement, soit rapidement.',1),
  C('q7','VOCAB_CONTEXT',4,'Dans « très rapidement », le mot « rapidement »…',['prend un s au pluriel','s’accorde avec « ouvriers »','ne change jamais (il est invariable)'],2,'Les adverbes sont invariables : ils ne s’accordent pas, même avec « les ouvriers ».',1),
  C('q8','EXPLICIT',2,'Vrai ou faux : le clown trébuche souvent.',['Vrai','Faux'],0,'Le texte dit : « Il trébuche souvent ».',2),
  C('q9','INFERENCE',4,'Dans « Les enfants ne veulent jamais partir », on comprend que les enfants…',['veulent partir vite','veulent rester jusqu’au bout','ont peur'],1,'« ne… jamais partir » veut dire qu’ils ne veulent pas s’en aller : ils adorent le spectacle.',4),
  E('q10','JUSTIFY,EMOTION_INTENTION',3,'Quelle phrase montre que le public aime le spectacle ?',4,'« Le public applaudit bruyamment » : on applaudit fort quand on est content.'),
  C('q11','EXPLICIT',3,'Comment la jongleuse lance-t-elle ses balles au début ?',['Violemment','Bruyamment','Doucement'],2,'Le texte dit : « lance doucement ses balles, puis de plus en plus vite ».',3),
  O('q12','SEQUENCE',2,'Remets les événements dans l’ordre.',['Le cirque arrive près de l’école','Les ouvriers montent la tente','Le public applaudit'],'Le cirque arrive, on monte la tente, puis le spectacle commence et le public applaudit.')
 ]}));

/* ===== CM1 ===== */
LIST.push(R({id:'fr_cm1_jardin_partage_01',level:'CM1',dt:'récit',title:'Le jardin partagé d’Hélène',links:['cm1-fr-lexique-derivation'],diff:4,min:3,audio:'audioAllowed',sess:7,
 p:['Chaque matin, Hélène se rend au jardin partagé de son quartier. Elle est jardinière en ville : elle plante, arrose et surveille les cultures avec les habitants.','Le jardinage demande de la patience. Il faut d’abord préparer la terre, puis semer des graines et, enfin, attendre que les jeunes pousses sortent du sol.','Un jour, un voisin trouve un arbuste fragile au bord du chemin. Il le replante dans le jardin, et Hélène le protège avec un petit grillage.','Quelques mois plus tard, l’arbuste fleurit. Les habitants du quartier sont émerveillés par cette floraison inattendue.'],
 g:[['arbuste','Un petit arbre.'],['grillage','Une clôture faite de fils de fer.'],['pousses','Les toutes jeunes tiges qui sortent de terre.']],
 questions:[
  C('q1','EXPLICIT',1,'Que fait Hélène chaque matin ?',['Elle se rend au jardin partagé','Elle part en voyage','Elle vend des fleurs'],0,'Le texte dit : « Chaque matin, Hélène se rend au jardin partagé ».',0),
  C('q2','VOCAB_CONTEXT',3,'Dans « jardinière », quel est le radical (la base du mot) ?',['ière','jardin','nier'],1,'« jardin » est le radical : on y ajoute le suffixe -ière pour former « jardinière ».',0),
  C('q3','VOCAB_CONTEXT',3,'Quel suffixe permet de former « jardinier » à partir de « jardin » ?',['jar-','-in','-ier'],2,'Le suffixe -ier se place à la fin du radical et désigne la personne qui s’occupe du jardin. Au féminin : -ière.',0),
  C('q4','VOCAB_CONTEXT',3,'Que veut dire « jardinage » ?',['L’activité qui consiste à s’occuper d’un jardin','Un petit jardin','Une personne qui cultive'],0,'Le suffixe -age sert à former des noms d’activités : le jardinage, c’est l’activité du jardin.',1),
  C('q5','VOCAB_CONTEXT',3,'Que signifie « replanter » ?',['Ne pas planter','Planter de nouveau','Planter très vite'],1,'Le préfixe re- indique que l’action recommence : replanter, c’est planter une seconde fois.',2),
  T('q6','VOCAB_CONTEXT',3,'Quel mot du dernier paragraphe est de la même famille que « fleur » ?',['fleurit','floraison'],'« fleurit » et « floraison » viennent de « fleur ». Ils partagent le radical « flor- » / « fleur- ».',3),
  C('q7','VOCAB_CONTEXT',4,'Que veut dire « inattendue » ?',['Qui est très grande','Qui est trop courte','Qu’on n’attendait pas'],2,'Le préfixe in- veut dire « pas » : une floraison inattendue, c’est une floraison qu’on n’attendait pas.',3),
  C('q8','VOCAB_CONTEXT',3,'Quel mot n’est PAS de la famille de « jardin » ?',['jarret','jardinière','jardinage'],0,'Un jarret est une partie de la jambe. Il ne contient pas le radical « jardin ».'),
  C('q9','INFERENCE,CAUSE_CONSEQUENCE',4,'Pourquoi Hélène protège-t-elle l’arbuste avec un grillage ?',['Parce qu’il est énorme','Parce qu’il est fragile','Parce qu’il est déjà fleuri'],1,'Le texte dit que l’arbuste est « fragile » : le grillage le protège.',2),
  O('q10','SEQUENCE',2,'Remets les événements dans l’ordre.',['Le voisin trouve un arbuste','Hélène protège l’arbuste','L’arbuste fleurit'],'On trouve d’abord l’arbuste, on le protège, et il fleurit quelques mois plus tard.'),
  E('q11','JUSTIFY',3,'Quelle phrase montre que le jardinage demande du temps ?',1,'« Le jardinage demande de la patience » : attendre fait partie du travail.'),
  C('q12','CAUSE_CONSEQUENCE,EMOTION_INTENTION',4,'Pourquoi les habitants sont-ils émerveillés ?',['Parce qu’il a plu','Parce qu’Hélène a déménagé','Parce que l’arbuste fragile a donné de belles fleurs'],2,'Ils ne s’y attendaient pas : cette floraison est une belle surprise.',3)
 ]}));

LIST.push(R({id:'fr_cm1_tempete_mer_01',level:'CM1',dt:'poème',title:'Tempête et retour au port',links:['cm1-fr-lexique-sens'],diff:4,min:2,audio:'audioAllowed',sess:7,verse:true,stanzas:[4,8],
 p:['La mer se fâche ce soir,','Elle gronde comme un orage.','Les vagues géantes et noires','Frappent le flanc du navire.','Les marins serrent les cordes,','Le capitaine reste calme.','Le vent hurle dans les voiles,','L’écume vole en nuages.','Puis, au lever du jour,','La mer s’apaise enfin.','Le soleil dore les flots,','Le navire entre au port.'],
 g:[['écume','La mousse blanche des vagues.'],['s’apaise','Devient calme.'],['flanc','Le côté d’un bateau.']],
 questions:[
  C('q1','EXPLICIT',2,'Que fait la mer au début du poème ?',['Elle se fâche et gronde','Elle dort','Elle disparaît'],0,'Le poème dit : « La mer se fâche ce soir, elle gronde comme un orage ».',0),
  C('q2','VOCAB_CONTEXT',3,'Quel est le contraire de « calme » ?',['tranquille','doux','agité'],2,'Le capitaine reste calme alors que la mer est agitée : calme et agité sont des antonymes.',5),
  C('q3','VOCAB_CONTEXT',3,'Quel mot est un synonyme de « s’apaise » ?',['grossit','se calme','gronde'],1,'S’apaiser et se calmer veulent dire presque la même chose.',9),
  C('q4','VOCAB_CONTEXT',3,'Quel mot appartient au champ lexical de la mer ?',['fourchette','crayon','écume'],2,'L’écume est la mousse des vagues : elle appartient au monde de la mer, comme navire, marins et flots.',7),
  C('q5','VOCAB_CONTEXT',3,'Quel mot n’appartient PAS au champ lexical de la tempête ?',['tartine','orage','vent'],0,'Orage et vent font partie de la tempête. Une tartine n’a aucun rapport.'),
  T('q6','VOCAB_CONTEXT',4,'Quel mot du poème est un synonyme de « vagues » ?',['flots','les flots'],'Au dernier couplet, le soleil dore « les flots » : ce sont les vagues, l’eau de la mer.',10),
  C('q7','INFERENCE,AUTHOR_INTENT',4,'Que veut dire « La mer se fâche » ?',['La mer devient plus chaude','La mer devient violente, comme une personne en colère','La mer est devenue rouge'],1,'Le poète compare la mer à une personne qui se met en colère : c’est une personnification.',0),
  C('q8','INFERENCE,EMOTION_INTENTION',4,'Pourquoi le poème dit-il que le capitaine « reste calme » ?',['Pour dire qu’il dort','Pour dire qu’il n’y a aucun danger','Pour montrer qu’il garde son sang-froid malgré le danger'],2,'La tempête est dangereuse : rester calme, c’est garder son sang-froid et rassurer l’équipage.',5),
  C('q9','STRUCTURE',4,'Comment le poème est-il organisé ?',['La tempête, puis le retour au calme','Le calme, puis la tempête','Une seule action du début à la fin'],0,'Les deux premiers couplets décrivent la tempête, le dernier le retour au calme au lever du jour.'),
  E('q10','JUSTIFY',3,'Quel vers annonce le retour au calme ?',9,'« La mer s’apaise enfin » : c’est le moment où la tempête s’arrête.'),
  O('q11','SEQUENCE',2,'Remets ces vers dans l’ordre du poème.',['La mer se fâche','Les marins serrent les cordes','Le navire entre au port'],'La tempête commence, les marins travaillent, puis le navire arrive au port.'),
  C('q12','INFERENCE',4,'Que montre le dernier vers ?',['Que le navire est revenu sain et sauf','Que le navire est perdu','Que la tempête recommence'],0,'Le navire entre au port après la tempête : il est en sécurité.',11)
 ]}));

LIST.push(R({id:'fr_cm1_soupe_orties_01',level:'CM1',dt:'scène de théâtre',title:'La soupe aux orties',links:['cm1-fr-types-formes'],diff:4,min:2,audio:'audioAllowed',sess:7,
 p:['SCÈNE : Dans la cuisine du château. Le cuisinier remue une grande marmite. La princesse Adèle entre en courant.','ADÈLE (essoufflée). — Cuisinier, que prépares-tu ?','LE CUISINIER. — Une soupe aux orties, Altesse. Pourquoi cette question ?','ADÈLE. — Je n’aime pas les orties ! Remets-les dans le jardin !','LE CUISINIER (en souriant). — Goûtez d’abord, Altesse. Ensuite, vous déciderez.','ADÈLE (elle goûte). — Quel délice ! Je n’y croyais pas. Donne-m’en un grand bol.'],
 g:[['marmite','Une grande casserole.'],['orties','Des plantes qui piquent, mais que l’on peut manger en soupe.'],['essoufflée','Qui a du mal à respirer après avoir couru.']],
 questions:[
  C('q1','PLACE',1,'Où se passe la scène ?',['Dans la cuisine du château','Dans le jardin','Dans la salle du trône'],0,'La première ligne dit : « Dans la cuisine du château ».',0),
  C('q2','EXPLICIT',2,'Que prépare le cuisinier ?',['Un gâteau aux noix','Une soupe aux orties','Une tarte aux pommes'],1,'Il répond : « Une soupe aux orties ».',2),
  C('q3','STRUCTURE,GENRE',4,'À quoi servent les mots entre parenthèses, comme « (essoufflée) » ?',['À compter les syllabes','À donner la réponse','À indiquer comment le comédien doit parler ou bouger'],2,'Ce sont des didascalies : elles guident le jeu des comédiens (ton, gestes, émotions).',1),
  C('q4','VOCAB_CONTEXT',3,'Que veut dire « Altesse » ?',['Un plat de cuisine','Un titre respectueux pour parler à un prince ou une princesse','Un chapeau de roi'],1,'Le cuisinier s’adresse poliment à Adèle, qui est une princesse : « Altesse » est un titre de respect.',2),
  C('q5','STRUCTURE',3,'Quelle phrase est interrogative ?',['Quel délice !','Je n’aime pas les orties !','Pourquoi cette question ?'],2,'« Pourquoi cette question ? » pose une question et se termine par un point d’interrogation.',2),
  C('q6','STRUCTURE',4,'Dans « Je n’aime pas les orties ! », la forme de la phrase est…',['affirmative','interrogative','négative'],2,'Le verbe « aime » est entouré de « n’… pas » : c’est la forme négative. Le point d’exclamation montre la colère.',3),
  C('q7','STRUCTURE',3,'Quelle phrase est à l’impératif (ordre ou conseil poli) ?',['Goûtez d’abord, Altesse.','Je n’y croyais pas.','Quel délice !'],0,'« Goûtez » est un verbe à l’impératif : le cuisinier donne un conseil.',4),
  C('q8','CHARACTER,EMOTION_INTENTION',3,'Comment Adèle change-t-elle d’avis ?',['Elle aime les orties au début, puis elle les déteste','Elle déteste les orties, puis elle adore la soupe','Elle ne change pas d’avis'],1,'Elle refuse d’abord les orties, puis, après avoir goûté, elle s’exclame « Quel délice ! ».',5),
  E('q9','JUSTIFY',3,'Quelle réplique montre qu’Adèle est conquise par la soupe ?',5,'« Quel délice ! Je n’y croyais pas. Donne-m’en un grand bol. » : elle en redemande.'),
  C('q10','INFERENCE,EMOTION_INTENTION',4,'Pourquoi le cuisinier dit-il « Goûtez d’abord » ?',['Parce que la soupe est brûlante','Parce qu’il est fâché contre elle','Parce qu’il veut qu’Adèle juge par elle-même'],2,'Il est sûr que la soupe est bonne : il laisse Adèle goûter avant de décider.',4),
  C('q11','GENRE',3,'Ce texte est…',['un poème','un article de presse','une scène de théâtre'],2,'Les noms des personnages suivis de leurs répliques et les didascalies sont les marques d’un texte de théâtre.',0),
  O('q12','SEQUENCE',2,'Remets les événements dans l’ordre.',['Adèle entre en courant dans la cuisine','Adèle dit qu’elle n’aime pas les orties','Adèle demande un grand bol de soupe'],'Adèle entre, refuse les orties, puis goûte et en redemande.')
 ]}));

LIST.push(R({id:'fr_cm1_sortie_foret_01',level:'CM1',dt:'récit',title:'Sortie en forêt',links:['cm1-fr-complements','cm1-fr-nature-fonction'],diff:4,min:2,audio:'audioAllowed',sess:7,
 p:['Le mercredi matin, la classe de CM1 part en forêt avec la maîtresse.','Les élèves suivent un sentier étroit pendant une heure.','Près d’un ruisseau, Karim découvre des empreintes dans la boue.','Il appelle ses camarades avec enthousiasme. Tous observent attentivement les traces.','La maîtresse explique : « Un sanglier est passé ici cette nuit. »','Après la pause, les enfants rentrent à l’école, fatigués mais ravis.'],
 g:[['empreintes','Les marques laissées dans le sol par un pied ou une patte.'],['sentier','Un petit chemin étroit.'],['sanglier','Un animal sauvage de la forêt, qui ressemble à un gros cochon.']],
 questions:[
  C('q1','TIME',1,'Quand la classe part-elle en forêt ?',['Le mercredi matin','Le samedi soir','Pendant les vacances'],0,'Le texte dit : « Le mercredi matin ».',0),
  C('q2','EXPLICIT',2,'Que découvre Karim ?',['Des champignons','Des empreintes dans la boue','Un nid d’oiseau'],1,'Le texte dit : « Karim découvre des empreintes dans la boue ».',2),
  C('q3','VOCAB_CONTEXT',4,'Dans « Karim découvre des empreintes », quel est le complément d’objet direct ?',['Karim','près d’un ruisseau','des empreintes'],2,'On pose la question « Karim découvre quoi ? » : des empreintes.',2),
  C('q4','VOCAB_CONTEXT',4,'« Près d’un ruisseau » est un complément circonstanciel de…',['temps','lieu','manière'],1,'Il répond à la question « où ? ».',2),
  C('q5','VOCAB_CONTEXT',4,'« Le mercredi matin » est un complément circonstanciel de…',['lieu','cause','temps'],2,'Il répond à la question « quand ? ».',0),
  C('q6','VOCAB_CONTEXT',4,'Dans « Il appelle ses camarades avec enthousiasme », « avec enthousiasme » indique…',['la manière','le lieu','le temps'],0,'Il répond à la question « comment ? ».',3),
  C('q7','VOCAB_CONTEXT',5,'Quel groupe de mots peut être déplacé ou supprimé sans que la phrase perde son sens principal ?',['Les élèves','Des empreintes','Près d’un ruisseau'],2,'Les compléments circonstanciels sont facultatifs et mobiles : on peut dire « Karim découvre des empreintes » seul.',2),
  C('q8','INFERENCE,CHARACTER',4,'À qui appartiennent les empreintes ?',['À un sanglier','À un enfant','À un chien'],0,'La maîtresse explique : « Un sanglier est passé ici cette nuit. »',4),
  C('q9','INFERENCE',4,'Quel indice permet de savoir qu’un animal est passé ?',['Le bruit du ruisseau','Les empreintes dans la boue','Le sentier étroit'],1,'Les empreintes dans la boue sont la trace d’un animal.',2),
  E('q10','JUSTIFY,EMOTION_INTENTION',3,'Quelle phrase montre que les élèves ont aimé la sortie ?',5,'« fatigués mais ravis » : ils sont fatigués, mais ils ont passé un bon moment.'),
  O('q11','SEQUENCE',2,'Remets les événements dans l’ordre.',['La classe suit un sentier','Karim découvre des empreintes','Les enfants rentrent à l’école'],'Ils marchent, Karim trouve des traces, puis ils rentrent.'),
  C('q12','VOCAB_CONTEXT',3,'Que signifie « fatigués mais ravis » ?',['Tristes et ennuyés','Fatigués, mais très contents','Fâchés et malades'],1,'« Ravis » veut dire très contents. « Mais » oppose la fatigue à la joie.',5)
 ]}));

LIST.push(R({id:'fr_cm1_grand_pere_leon_01',level:'CM1',dt:'portrait',title:'Mon grand-père Léon',links:['cm1-fr-gn','cm1-fr-accords-gn'],diff:4,min:3,audio:'audioAllowed',sess:7,
 p:['Mon grand-père Léon est un petit homme au visage ridé. Ses yeux bleus et pétillants regardent toujours le monde avec curiosité.','Il porte une vieille casquette grise et un gilet de laine tricoté par ma grand-mère. Ses grandes mains calleuses sentent le bois coupé.','Léon est menuisier. Dans son atelier encombré, il fabrique de solides chaises et des tables rondes que les voisins admirent.','Quand il me parle de son métier, sa voix grave devient douce. Je crois qu’il aime plus que tout transmettre ses précieux secrets.'],
 g:[['menuisier','Un artisan qui travaille le bois.'],['encombré','Rempli d’objets, où l’on circule difficilement.'],['pétillants','Brillants et vifs.'],['calleuses','Durcies et épaissies par le travail.']],
 questions:[
  C('q1','CHARACTER',1,'Quel est le métier de Léon ?',['Menuisier','Tricoteur','Instituteur'],0,'Le texte dit : « Léon est menuisier ».',2),
  C('q2','EXPLICIT',1,'De quelle couleur sont les yeux de Léon ?',['Marron','Bleus','Verts'],1,'Le texte dit : « Ses yeux bleus et pétillants ».',0),
  C('q3','VOCAB_CONTEXT',3,'Dans « un petit homme au visage ridé », quel mot est un adjectif épithète du nom « homme » ?',['visage','ridé','petit'],2,'« petit » est collé au nom « homme » et dit comment il est. « ridé » complète « visage ».',0),
  C('q4','VOCAB_CONTEXT',3,'Dans « une vieille casquette grise », combien d’adjectifs accompagnent « casquette » ?',['Un','Deux','Trois'],1,'« vieille » et « grise » : deux adjectifs épithètes.',1),
  C('q5','VOCAB_CONTEXT',4,'Pourquoi écrit-on « ses grandes mains calleuses » avec un s à « calleuses » ?',['Parce que Léon est vieux','Parce que « mains » est féminin pluriel et l’adjectif s’accorde avec lui','Parce que « calleuses » est un verbe'],1,'Un adjectif s’accorde en genre et en nombre avec le nom : mains est féminin pluriel, donc calleuses.',1),
  C('q6','NARRATOR_POV',3,'Qui raconte (« mon grand-père », « il me parle ») ?',['Léon lui-même','Un voisin','Son petit-enfant'],2,'On lit « mon grand-père » : celui qui parle est le petit-enfant de Léon. Le texte est écrit avec « je ».',0),
  C('q7','VOCAB_CONTEXT',3,'Que veut dire « calleuses » ?',['Durcies par le travail','Très propres','Très petites'],0,'Des mains calleuses sont des mains rendues dures par un travail manuel.',1),
  C('q8','AUTHOR_INTENT,INFERENCE',5,'Quelle impression l’auteur veut-il donner de Léon avec tous ces adjectifs ?',['Celle d’un homme triste et fatigué','Celle d’un homme pressé et nerveux','Celle d’un homme chaleureux, passionné par son métier'],2,'Yeux pétillants, voix devenue douce, « précieux secrets » : les détails montrent la chaleur et la passion de Léon.'),
  O('q13','SEQUENCE',3,'Remets ces informations dans l’ordre où le texte les donne.',['Le portrait physique de Léon','Le métier de Léon','La voix de Léon quand il parle de son métier'],'Le texte décrit d’abord l’apparence de Léon, puis son métier, puis sa voix.'),
  E('q9','JUSTIFY,EMOTION_INTENTION',4,'Quelle phrase montre que Léon est passionné par son métier ?',3,'Sa voix devient douce quand il parle de son métier et il aime « transmettre ses précieux secrets ».'),
  C('q10','CAUSE_CONSEQUENCE,INFERENCE',4,'Pourquoi la voix de Léon devient-elle « douce » ?',['Parce qu’il est fatigué','Parce qu’il aime parler de son métier','Parce qu’il a froid'],1,'Le texte dit : « Quand il me parle de son métier, sa voix grave devient douce ».',3),
  T('q11','EXPLICIT',3,'Quel adjectif décrit la voix de Léon quand il commence à parler ?',['grave'],'Le texte dit : « sa voix grave devient douce ».',3),
  C('q12','EXPLICIT',2,'Que fabrique Léon dans son atelier ?',['Des chaises et des tables','Des vélos','Des chapeaux'],0,'Le texte dit : « il fabrique de solides chaises et des tables rondes ».',2)
 ]}));

LIST.push(R({id:'fr_cm1_lac_canards_01',level:'CM1',dt:'récit',title:'Les canards du lac',links:['cm1-fr-verbe-sujet'],diff:4,min:3,audio:'audioAllowed',sess:7,
 p:['Au bord du lac, parmi les roseaux, vivent trois familles de canards.','Chaque soir, les enfants du village et leurs parents viennent leur apporter du pain.','Les canetons, impatients, s’agitent dans l’eau. Leur mère, elle, reste prudente et observe les promeneurs.','Soudain, derrière un buisson, apparaît un renard roux.','Aussitôt, les canards, effrayés, s’envolent dans un grand bruit d’ailes.','Le renard repart, déçu, et les enfants retrouvent leur calme.'],
 g:[['roseaux','Des plantes à longues tiges qui poussent au bord de l’eau.'],['canetons','Les petits du canard.'],['effrayés','Qui ont très peur.']],
 questions:[
  C('q1','PLACE',1,'Où vivent les canards ?',['Au bord du lac, parmi les roseaux','Dans une ferme','Sur un toit'],0,'La 1ʳᵉ phrase dit : « Au bord du lac, parmi les roseaux, vivent trois familles de canards ».',0),
  C('q2','EXPLICIT',2,'Que font les villageois chaque soir ?',['Ils pêchent des poissons','Ils apportent du pain aux canards','Ils nettoient le lac'],1,'Le texte dit qu’ils viennent « leur apporter du pain ».',1),
  C('q3','VOCAB_CONTEXT',4,'Dans « Au bord du lac, parmi les roseaux, vivent trois familles de canards », quel est le sujet de « vivent » ?',['les roseaux','le lac','trois familles de canards'],2,'On demande « Qui est-ce qui vit ? » : trois familles de canards. Le sujet est placé après le verbe (sujet inversé).',0),
  C('q4','VOCAB_CONTEXT',4,'Pourquoi « vivent » s’écrit-il avec -nt ?',['Parce que son sujet « trois familles de canards » est pluriel','Parce que le lac est grand','Parce que la phrase est longue'],0,'Le verbe s’accorde avec son sujet, même quand le sujet est placé après lui.',0),
  C('q5','VOCAB_CONTEXT',4,'Dans « Soudain, derrière un buisson, apparaît un renard roux », quel est le sujet de « apparaît » ?',['un buisson','un renard roux','Soudain'],1,'Qui est-ce qui apparaît ? Un renard roux. Le sujet est placé après le verbe.',3),
  C('q6','VOCAB_CONTEXT',4,'Quel groupe est le sujet de « viennent » dans la phrase du paragraphe 2 ?',['le pain','chaque soir','les enfants du village et leurs parents'],2,'Qui est-ce qui vient ? Les enfants et leurs parents : deux groupes réunis par « et », donc un sujet pluriel.',1),
  C('q7','REFERENCE',4,'Dans « Leur mère, elle, reste prudente », quel mot reprend « leur mère » ?',['reste','elle','prudente'],1,'Le pronom « elle » reprend « leur mère » pour insister sur elle.',2),
  C('q8','CAUSE_CONSEQUENCE',3,'Pourquoi les canards s’envolent-ils ?',['Parce qu’il pleut','Parce que les enfants crient','Parce qu’un renard roux apparaît'],2,'L’apparition du renard fait peur aux canards : c’est la cause de leur envol.',3),
  C('q9','CHARACTER,INFERENCE',3,'Comment est la mère des canetons ?',['Impatiente','Prudente','Fatiguée'],1,'Le texte dit : « Leur mère, elle, reste prudente » : les canetons sont impatients, elle non.',2),
  C('q10','VOCAB_CONTEXT',3,'Dans « Aussitôt, les canards, effrayés, s’envolent », quel est le sujet de « s’envolent » ?',['les canards','effrayés','Aussitôt'],0,'Qui est-ce qui s’envole ? Les canards. « effrayés » les décrit.',4),
  O('q11','SEQUENCE',2,'Remets les événements dans l’ordre.',['Des enfants apportent du pain','Un renard apparaît','Les canards s’envolent'],'Les enfants viennent, le renard surgit, puis les canards s’envolent.'),
  E('q12','JUSTIFY,EMOTION_INTENTION',3,'Quelle phrase montre que le renard n’a rien attrapé ?',5,'« Le renard repart, déçu » : il s’en va sans proie.')
 ]}));

/* ===== CM2 ===== */
LIST.push(R({id:'fr_cm2_registres_01',level:'CM2',dt:'récit',title:'Deux façons de parler',links:['cm2-fr-registres'],diff:5,min:3,audio:'audioAllowed',sess:8,
 p:['Mardi, à la sortie de l’école, Nathan retrouve son ami Yanis dans la cour.','« Salut, mec ! T’as vu le maître tout à l’heure ? Il était trop énervé, il nous a passé un savon à toute la classe ! » lance Nathan.','« Ouais, grave ! J’ai flippé, j’ai cru qu’on allait tous être collés ! » répond Yanis en rigolant.','Soudain, la directrice, Mme Perrot, apparaît derrière eux. « Bonjour, les garçons. Pouvez-vous m’expliquer pourquoi vous êtes encore dans la cour ? »','« Bonjour, madame. Excusez-nous, nous parlions de la leçon de mathématiques. Nous partons immédiatement », répond poliment Nathan.','Quand la directrice s’éloigne, Yanis éclate de rire : « Franchement, tu parles comme un livre quand tu veux ! »'],
 g:[['directrice','La personne qui dirige l’école.'],['immédiatement','Tout de suite.'],['s’éloigne','Va plus loin, part.']],
 questions:[
  C('q1','CHARACTER',2,'Qui interrompt la conversation des deux amis ?',['La directrice, Mme Perrot','Le maître','La mère de Yanis'],0,'Le texte dit : « la directrice, Mme Perrot, apparaît derrière eux ».',3),
  C('q2','GENRE',3,'Quel registre de langue Nathan utilise-t-il avec Yanis ?',['Soutenu','Scientifique','Familier'],2,'Il parle comme on le fait entre amis : « Salut, mec ! », « T’as vu », « trop énervé ». C’est le registre familier.',1),
  C('q3','GENRE,VOCAB_CONTEXT',3,'Quel mot du premier échange est typique du registre familier ?',['« classe »','« mec »','« maître »'],1,'« mec » est un mot familier pour dire « garçon » ou « ami ». « classe » et « maître » sont courants.',1),
  C('q4','VOCAB_CONTEXT',4,'Que veut dire « il nous a passé un savon » ?',['Il nous a lavé les mains','Il nous a grondés sévèrement','Il nous a offert un cadeau'],1,'C’est une expression familière au sens figuré : on ne donne pas de vrai savon, on fait des reproches.',1),
  C('q5','VOCAB_CONTEXT',3,'Que veut dire « J’ai flippé » ?',['J’ai ri aux éclats','J’ai dormi','J’ai eu très peur'],2,'« Flipper » est un mot familier qui veut dire avoir peur : Yanis craignait d’être puni.',2),
  C('q6','GENRE',3,'Quel registre la directrice emploie-t-elle ?',['Familier','Courant, poli','Argotique'],1,'Elle dit « Bonjour, les garçons » et « Pouvez-vous m’expliquer » : une langue correcte et polie.',3),
  C('q7','INFERENCE,AUTHOR_INTENT',5,'Pourquoi Nathan change-t-il de façon de parler avec la directrice ?',['Il adapte son langage à la personne et à la situation','Il a oublié ses mots','Il est fâché'],0,'On ne parle pas à une directrice comme à un copain : on choisit son registre selon la situation et l’interlocuteur.',4),
  T('q8','EXPLICIT,VOCAB_CONTEXT',3,'Quel mot de politesse Nathan emploie-t-il pour saluer la directrice ?',['bonjour'],'Nathan ne dit plus « Salut » mais « Bonjour, madame » : le salut change de registre.',4),
  C('q9','VOCAB_CONTEXT',4,'Comment dire dans un registre courant « Il était trop énervé » ?',['Il pétait un câble','Il était vénère','Il était très en colère'],2,'« très en colère » est du français courant ; « pétait un câble » et « vénère » sont familiers.',1),
  C('q10','INFERENCE,AUTHOR_INTENT',5,'Pourquoi Yanis dit-il « tu parles comme un livre » ?',['Parce que Nathan crie','Parce que Nathan a employé un langage très soigné','Parce que Nathan lit un livre'],1,'C’est une expression imagée : parler comme un livre, c’est parler avec un langage très correct, presque trop.',5),
  E('q11','JUSTIFY,GENRE',4,'Quelle réplique de Nathan est écrite dans un registre adapté à la directrice ?',4,'« Bonjour, madame. Excusez-nous… » : politesse, phrases construites, vocabulaire courant.'),
  O('q12','SEQUENCE',2,'Remets les événements dans l’ordre.',['Nathan parle avec Yanis','La directrice apparaît','Yanis éclate de rire'],'Les amis discutent, la directrice arrive, puis Yanis rit une fois qu’elle est partie.')
 ]}));

LIST.push(R({id:'fr_cm2_expressions_odile_01',level:'CM2',dt:'récit',title:'Mamie Odile et les expressions',links:['cm2-fr-sens'],diff:5,min:3,audio:'audioAllowed',sess:8,
 p:['Mamie Odile adore les expressions imagées. Ce dimanche, toute la famille est réunie chez elle pour le déjeuner.','« Quand j’étais petite, j’avais une mémoire d’éléphant », dit-elle en servant le café.','Son petit-fils Hugo, huit ans, la regarde, intrigué : « Mamie, tu avais vraiment un éléphant dans la tête ? »','Tout le monde éclate de rire. Papa explique : « Non, Hugo, c’est une façon de parler. Elle veut dire qu’elle se souvenait de tout. »','Plus tard, Mamie félicite Hugo : « Tu as un cœur d’or ! Tu as aidé tout le monde à mettre la table. »','Hugo réfléchit, puis il sourit : « Alors, si j’ai une faim de loup, ça ne veut pas dire que je vais manger un loup ! » Mamie éclate de rire : « Tu as tout compris, mon grand ! »'],
 g:[['intrigué','Surpris et curieux de comprendre.'],['expressions imagées','Des façons de parler qui utilisent des images.'],['félicite','Dit bravo, complimente.']],
 questions:[
  C('q1','EXPLICIT',2,'Quelle expression Mamie utilise-t-elle pour parler de sa mémoire ?',['« une mémoire de poisson rouge »','« une mémoire d’éléphant »','« une tête de linotte »'],1,'Elle dit : « j’avais une mémoire d’éléphant ».',1),
  C('q2','CAUSE_CONSEQUENCE,INFERENCE',4,'Pourquoi Hugo est-il intrigué ?',['Il comprend l’expression au sens propre : un éléphant dans la tête','Il n’a pas faim','Il ne connaît pas Mamie'],0,'Hugo prend les mots à la lettre : il imagine un vrai éléphant dans la tête de Mamie.',2),
  C('q3','VOCAB_CONTEXT',4,'Que veut dire « une mémoire d’éléphant » au sens figuré ?',['Une mémoire d’animal','Une mémoire énorme et lourde','Une excellente mémoire : on se souvient de tout'],2,'Papa l’explique : elle veut dire que Mamie se souvenait de tout.',3),
  C('q4','VOCAB_CONTEXT',4,'Dans « Tu as un cœur d’or », le mot « cœur » est employé…',['au sens propre (l’organe du corps)','au sens figuré (la générosité)','au sens de « milieu »'],1,'Hugo n’a pas un organe en or : l’expression veut dire qu’il est très généreux.',4),
  C('q5','CAUSE_CONSEQUENCE',3,'Pourquoi Mamie dit-elle à Hugo « Tu as un cœur d’or » ?',['Parce qu’il porte un bijou en or','Parce qu’il est malade du cœur','Parce qu’il est généreux : il a aidé tout le monde'],2,'Elle le félicite parce qu’il a aidé à mettre la table.',4),
  C('q6','VOCAB_CONTEXT',3,'Que veut dire « avoir une faim de loup » ?',['Avoir très faim','Manger des loups','Avoir peur des loups'],0,'C’est une expression au sens figuré : on a aussi faim qu’un loup, c’est-à-dire très faim.',5),
  T('q7','EXPLICIT,VOCAB_CONTEXT',3,'Complète la phrase de Papa : « c’est une façon de ___ ».',['parler'],'Papa dit que l’expression est « une façon de parler » : elle ne se prend pas au pied de la lettre.',3),
  C('q8','AUTHOR_INTENT',6,'Pourquoi l’auteur fait-il réagir Hugo au sens propre ?',['Pour décrire la maison','Pour faire comprendre la différence entre sens propre et sens figuré','Pour raconter un voyage'],1,'La réaction naïve de Hugo fait rire et montre qu’un même mot peut être pris au sens propre ou au sens figuré.',2),
  E('q9','JUSTIFY,INFERENCE',4,'Quelle réplique montre que Hugo a compris le sens figuré ?',5,'« Si j’ai une faim de loup, ça ne veut pas dire que je vais manger un loup ! » : il explique l’image.'),
  C('q10','VOCAB_CONTEXT',3,'Que veut dire « intrigué » ?',['Très en colère','Endormi','Surpris et curieux de comprendre'],2,'Hugo ne comprend pas l’expression et veut en savoir plus.',2),
  O('q11','SEQUENCE',2,'Remets les événements dans l’ordre.',['Mamie parle de sa mémoire d’éléphant','Papa explique l’expression','Hugo comprend le sens figuré'],'Mamie lance l’expression, Papa l’explique, puis Hugo la réutilise à la fin.'),
  C('q12','VOCAB_CONTEXT',4,'Quelle phrase est employée au sens propre, sans image ?',['Hugo a une faim de loup.','Mamie a un cœur d’or.','Mamie sert le café à la famille.'],2,'Servir le café, c’est verser du vrai café : il n’y a aucune image. Les deux autres phrases sont des expressions imagées.',1)
 ]}));

LIST.push(R({id:'fr_cm2_message_bouteille_01',level:'CM2',dt:'récit',title:'Le message dans la bouteille',links:['cm2-fr-ecrire'],diff:5,min:3,audio:'audioAllowed',sess:8,
 p:['Un matin d’automne, Léa se promenait sur la plage quand elle aperçut une bouteille coincée entre deux rochers.','La jeune fille la saisit aussitôt. À l’intérieur, un papier roulé attendait, couvert d’une écriture fine.','« Si quelqu’un trouve ce message, qu’il vienne au phare dimanche à midi », disait le papier.','Léa hésita, car le phare était fermé depuis des années. Pourtant, la curiosité fut la plus forte.','Dimanche, elle grimpa donc les marches usées. Au sommet, un vieux marin l’attendait avec un sourire : « J’espérais que quelqu’un viendrait ! »','Il lui raconta ensuite ses voyages, et la fillette repartit au coucher du soleil, des étoiles plein la tête.'],
 g:[['coincée','Bloquée, qu’on ne peut pas bouger facilement.'],['phare','Une haute tour au bord de la mer qui éclaire les bateaux.'],['saisit','Prend vivement.']],
 questions:[
  C('q1','PLACE',1,'Où Léa trouve-t-elle la bouteille ?',['Coincée entre deux rochers','Dans un filet de pêche','Sur un bateau'],0,'Le texte dit : « une bouteille coincée entre deux rochers ».',0),
  C('q2','EXPLICIT',2,'Que contient la bouteille ?',['Une clé','Un papier roulé avec un message','Des pièces de monnaie'],1,'Le texte dit : « un papier roulé attendait, couvert d’une écriture fine ».',1),
  C('q3','REFERENCE',3,'Dans « La jeune fille la saisit aussitôt », qui désigne « La jeune fille » ?',['Une inconnue','La fille du gardien','Léa'],2,'Pour éviter de répéter « Léa », l’auteur emploie un autre groupe de mots : c’est une reprise.',1),
  C('q4','STRUCTURE,CAUSE_CONSEQUENCE',4,'Dans « Léa hésita, car le phare était fermé », qu’exprime « car » ?',['Le temps','L’opposition','La cause'],2,'« car » explique pourquoi Léa hésite : il introduit la cause.',3),
  C('q5','STRUCTURE',5,'Que marque « Pourtant » dans « Pourtant, la curiosité fut la plus forte » ?',['Une cause','Une opposition : malgré les raisons d’hésiter, Léa décide d’y aller','Un lieu'],1,'« Pourtant » oppose la décision de Léa à ses raisons d’hésiter.',3),
  C('q6','STRUCTURE',4,'Dans « elle grimpa donc les marches », qu’exprime « donc » ?',['Une opposition','Un souhait','Une conséquence'],2,'Léa veut aller au rendez-vous : « donc » introduit la conséquence de sa décision.',4),
  C('q7','REFERENCE',4,'Dans « Il lui raconta ensuite ses voyages », qui désigne « Il » ?',['Léa','Le vieux marin','Un pêcheur'],1,'Le seul homme présent est le vieux marin du phare.',5),
  C('q8','STRUCTURE',5,'Quel nom donne-t-on, dans un récit, à l’événement qui lance l’histoire (ici, la découverte de la bouteille) ?',['La morale','L’élément déclencheur','La conclusion'],1,'L’élément déclencheur est l’événement qui rompt la situation de départ et met l’histoire en marche.',1),
  C('q9','CAUSE_CONSEQUENCE',3,'Pourquoi Léa hésite-t-elle ?',['Parce que le phare est fermé depuis des années','Parce qu’elle a peur de la mer','Parce que le papier est mouillé'],0,'Le texte donne la raison juste après la virgule : « car le phare était fermé depuis des années ».',3),
  C('q10','TIME,STRUCTURE',4,'Quels mots du dernier paragraphe font avancer le temps ?',['« car » et « pourtant »','« Dimanche » seulement','« ensuite » et « au coucher du soleil »'],2,'« ensuite » et « au coucher du soleil » sont des repères qui font avancer le récit.',5),
  E('q11','JUSTIFY,INFERENCE',4,'Quelle phrase montre que le vieux marin attendait Léa ?',4,'« J’espérais que quelqu’un viendrait ! » : c’est lui qui a lancé la bouteille.'),
  O('q12','SEQUENCE',2,'Remets les événements dans l’ordre.',['Léa trouve une bouteille','Léa lit le message','Léa rencontre le vieux marin'],'Elle trouve la bouteille, lit le message, puis se rend au phare où elle rencontre le marin.')
 ]}));

LIST.push(R({id:'fr_cm2_potager_ecole_01',level:'CM2',dt:'article de presse',title:'Un potager pour l’école des Tilleuls',doc:true,src:'Article original Finot Académie : l’école des Tilleuls, la maîtresse, la directrice et le potager sont imaginaires.',links:['cm2-fr-phrase-complexe','cm2-fr-classes'],diff:5,min:3,audio:'audioAllowed',sess:8,
 p:['Depuis la rentrée, les élèves de l’école des Tilleuls cultivent un potager dans un coin de la cour, qui était resté vide pendant des années.','Les enfants ont d’abord retiré les cailloux ; ensuite, ils ont apporté de la terre fraîche et semé des radis, des salades et des carottes.','« Quand nous avons planté les premières graines, personne ne pensait que tout pousserait aussi vite », raconte la maîtresse, Mme Aubry.','Comme il n’a pas plu depuis dix jours, les élèves arrosent chaque matin, mais ils utilisent l’eau d’un récupérateur pour ne pas gaspiller.','La directrice annonce que la récolte sera partagée à la cantine et que les élèves prépareront une soupe de légumes pour toute l’école.'],
 g:[['potager','Un jardin où l’on fait pousser des légumes.'],['récupérateur','Un grand bidon qui garde l’eau de pluie.'],['récolte','Les légumes que l’on cueille quand ils sont mûrs.']],
 questions:[
  C('q2','EXPLICIT,SEQUENCE',3,'Que les enfants ont-ils fait en premier ?',['Semer des radis','Retirer les cailloux','Arroser les plantes'],1,'Le texte dit : « Les enfants ont d’abord retiré les cailloux ».',1),
  C('q3','STRUCTURE',5,'Dans « Les enfants ont d’abord retiré les cailloux ; ensuite, ils ont apporté de la terre… », comment les deux propositions sont-elles reliées ?',['Par « que »','Par « parce que »','Par un point-virgule : elles sont juxtaposées'],2,'Aucun mot de liaison ne les relie : un point-virgule les sépare. On dit qu’elles sont juxtaposées.',1),
  C('q4','STRUCTURE,CAUSE_CONSEQUENCE',4,'Dans « Comme il n’a pas plu depuis dix jours, les élèves arrosent », que marque « comme » ?',['Le lieu','La cause','La comparaison'],1,'« Comme » explique pourquoi les élèves arrosent : il introduit la cause.',3),
  C('q5','STRUCTURE',5,'Quel mot est une conjonction de coordination dans « …arrosent chaque matin, mais ils utilisent l’eau d’un récupérateur » ?',['comme','pour','mais'],2,'« mais » relie deux propositions de même rang et exprime une opposition. « comme » est une conjonction de subordination ; « pour » est une préposition.',3),
  C('q6','STRUCTURE',5,'Dans « La directrice annonce que la récolte sera partagée », « que » introduit…',['une cause','ce qui est annoncé (une proposition subordonnée)','un lieu'],1,'« que » introduit ce que la directrice annonce : une proposition subordonnée complément du verbe.',4),
  C('q7','STRUCTURE',5,'Quelle phrase est une phrase simple (un seul verbe conjugué) ?',['Quand nous avons planté, personne ne pensait que tout pousserait vite.','Comme il n’a pas plu, les élèves arrosent.','Les élèves arrosent chaque matin.'],2,'« Les élèves arrosent chaque matin » n’a qu’un seul verbe conjugué. Les deux autres phrases en ont plusieurs.',3),
  C('q8','CAUSE_CONSEQUENCE',3,'Pourquoi les élèves utilisent-ils l’eau d’un récupérateur ?',['Pour ne pas gaspiller l’eau','Pour que les légumes soient plus gros','Parce que le robinet est cassé'],0,'Le texte donne le but : « pour ne pas gaspiller ».',3),
  C('q9','REFERENCE,DOCUMENT_SOURCE',4,'Qui explique comment le potager a poussé ?',['La directrice','Les élèves','Mme Aubry, la maîtresse'],2,'C’est la maîtresse qui parle entre guillemets : « raconte la maîtresse, Mme Aubry ».',2),
  C('q10','DOCUMENT_SOURCE,GENRE',3,'Ce texte est…',['un conte','un article de presse sur un projet d’école','un poème'],1,'Il rapporte des faits (le potager), cite des témoins et répond à « qui, quoi, quand, où ».'),
  C('q11','EXPLICIT',2,'Que va-t-il arriver à la récolte ?',['Elle sera vendue au marché','Elle sera partagée à la cantine','Elle sera jetée'],1,'Le texte dit : « la récolte sera partagée à la cantine ».',4),
  E('q12','JUSTIFY,DOCUMENT_SOURCE',4,'Quelle phrase donne la parole à la maîtresse ?',2,'La phrase entre guillemets est une citation : c’est la maîtresse qui parle.'),
  O('q13','SEQUENCE',3,'Remets ces actions dans l’ordre.',['Les enfants retirent les cailloux','Les enfants sèment des radis et des carottes','Les élèves arrosent chaque matin'],'On prépare d’abord le sol, on sème, puis on arrose.')
 ]}));

LIST.push(R({id:'fr_cm2_port_saint_aubin_01',level:'CM2',dt:'description',title:'Le port de Saint-Aubin au petit matin',src:'Texte original Finot Académie : le port de Saint-Aubin et ses habitants sont imaginaires.',links:['cm2-fr-expansions'],diff:5,min:3,audio:'audioAllowed',sess:8,
 p:['Le petit port de Saint-Aubin s’éveille tôt. Dès l’aube, les bateaux de pêche aux coques bleues quittent le quai, que la brume enveloppe encore.','Sur le quai, les mouettes, qui guettent les restes de poisson, crient à tue-tête.','Au fond du port, la boulangerie de Mme Lemoine ouvre ses volets de bois. Une odeur de pain chaud flotte jusqu’aux bateaux amarrés.','Plus loin, un vieux pêcheur à la barbe blanche répare un filet déchiré. Il fredonne une chanson que son père lui chantait autrefois.'],
 g:[['brume','Un léger brouillard.'],['guettent','Surveillent en attendant le bon moment.'],['fredonne','Chante doucement, presque sans paroles.']],
 questions:[
  C('q1','EXPLICIT',1,'Que fait le vieux pêcheur ?',['Il vend du poisson','Il répare un filet déchiré','Il conduit un bateau'],1,'Le texte dit : « un vieux pêcheur… répare un filet déchiré ».',3),
  C('q2','VOCAB_CONTEXT',4,'Dans « les bateaux de pêche », « de pêche » est…',['un sujet','un verbe','un complément du nom'],2,'« de pêche » précise le nom « bateaux » : c’est un complément du nom.',0),
  C('q3','VOCAB_CONTEXT',5,'Dans « les mouettes, qui guettent les restes de poisson », « qui guettent les restes de poisson » est…',['un complément de lieu','une proposition relative qui complète « les mouettes »','un verbe seul'],1,'Cette proposition commence par le pronom relatif « qui » et apporte une précision sur le nom « mouettes ».',1),
  C('q4','VOCAB_CONTEXT',3,'Dans « le petit port », quel mot est un adjectif épithète ?',['petit','port','le'],0,'« petit » est collé au nom « port » et dit comment il est.',0),
  C('q5','VOCAB_CONTEXT',6,'Dans « un vieux pêcheur à la barbe blanche », quelles expansions complètent « pêcheur » ?',['répare et filet','plus loin et autrefois','« vieux » et « à la barbe blanche »'],2,'« vieux » est un adjectif épithète et « à la barbe blanche » est un complément du nom : tous deux précisent « pêcheur ».',3),
  C('q6','VOCAB_CONTEXT',5,'Que complète la proposition « que la brume enveloppe encore » ?',['les bateaux','le quai','l’aube'],1,'Le pronom relatif « que » reprend « le quai » : c’est le quai que la brume enveloppe.',0),
  C('q7','AUTHOR_INTENT',5,'Quelle atmosphère l’auteur crée-t-il avec la brume et l’odeur de pain chaud ?',['Une atmosphère paisible et accueillante, au petit matin','Une atmosphère inquiétante','Une atmosphère de fête'],0,'La brume légère, le pain chaud et la chanson donnent une impression de calme et de douceur.',2),
  C('q8','VOCAB_CONTEXT',3,'Que veut dire « crient à tue-tête » ?',['Se taisent','Crient très fort','Chantent doucement'],1,'« À tue-tête » signifie le plus fort possible.',1),
  C('q9','VOCAB_CONTEXT',4,'Que veut dire « des bateaux amarrés » ?',['En train de couler','Très rapides','Attachés au quai'],2,'Un bateau amarré est attaché avec des cordes : ici, au quai du port.',2),
  E('q10','JUSTIFY',3,'Quelle phrase évoque une odeur ?',2,'« Une odeur de pain chaud flotte… » : le mot « odeur » le dit.'),
  C('q11','EXPLICIT,INFERENCE',3,'Que fredonne le vieux pêcheur ?',['Une chanson que son père lui chantait','Une chanson de la radio','Un air inventé hier'],0,'Le texte dit : « une chanson que son père lui chantait autrefois ».',3),
  O('q12','SEQUENCE',3,'Remets ces éléments dans l’ordre où le texte les présente.',['Les bateaux quittent le quai','Les mouettes crient','La boulangerie ouvre ses volets'],'Le texte présente d’abord les bateaux, puis les mouettes, puis la boulangerie.')
 ]}));

LIST.push(R({id:'fr_cm2_reglement_mediatheque_01',level:'CM2',dt:'affiche / règlement',title:'Le règlement de la médiathèque',doc:true,src:'Document original Finot Académie : la médiathèque de Valcourt et son règlement sont imaginaires.',links:['cm2-fr-imperatif'],diff:5,min:3,audio:'audioAllowed',sess:8,
 p:['MÉDIATHÈQUE DE VALCOURT — RÈGLEMENT À LIRE ET À RESPECTER','Chers lecteurs, pour que chacun profite des lieux, merci de respecter ces règles simples.','1. Parlez doucement : les autres lecteurs travaillent et lisent.','2. Rangez vos livres consultés sur les chariots ; ne les remettez pas vous-mêmes sur les étagères.','3. Prenez soin des documents : n’écrivez pas dessus, ne pliez pas les pages.','4. Rendez vos emprunts avant la date indiquée au dos du livre, ou venez prolonger le prêt à l’accueil.','Vous pouvez emprunter jusqu’à six livres pour trois semaines. Merci de votre aide !'],
 g:[['médiathèque','Un lieu où l’on peut lire, emprunter des livres, des films ou de la musique.'],['consultés','Regardés ou lus sur place.'],['emprunts','Les documents que l’on emporte chez soi pour un temps.']],
 questions:[
  C('q1','DOCUMENT_SOURCE,STRUCTURE',3,'À qui s’adresse ce règlement ?',['Aux bibliothécaires de la médiathèque','Aux lecteurs de la médiathèque','Aux livres et aux étagères'],1,'Le texte commence par « Chers lecteurs » : il s’adresse aux personnes qui viennent lire ou emprunter.',1),
  C('q2','EXPLICIT',2,'Combien de livres peut-on emprunter au maximum ?',['Trois','Dix','Six'],2,'Le texte dit : « jusqu’à six livres ».',6),
  C('q3','EXPLICIT',2,'Pendant combien de temps peut-on garder les livres ?',['Trois semaines','Six jours','Un mois'],0,'Le texte dit : « pour trois semaines ».',6),
  C('q4','CAUSE_CONSEQUENCE',3,'Pourquoi demande-t-on de parler doucement ?',['Parce que les livres sont fragiles et abîmés','Parce que la médiathèque est fermée le dimanche','Parce que les autres lecteurs travaillent et lisent'],2,'Le règlement donne la raison après les deux points.',2),
  C('q5','EXPLICIT',2,'Où doit-on poser les livres qu’on a consultés ?',['Sur les étagères','Sur les chariots','Dans son sac'],1,'Le texte dit : « Rangez vos livres consultés sur les chariots ».',3),
  T('q6','VOCAB_CONTEXT',4,'Écris le verbe « parler » à l’impératif présent, 2ᵉ personne du singulier (tu).',['parle'],'Pour les verbes en -er, on enlève le s à la 2ᵉ personne du singulier de l’impératif : « Parle ! »',2),
  C('q7','VOCAB_CONTEXT',4,'Dans « Rangez vos livres », le verbe à l’impératif est à…',['la 2ᵉ personne du singulier (tu)','la 1ʳᵉ personne du pluriel (nous)','la 2ᵉ personne du pluriel (vous)'],2,'La terminaison -ez indique la 2ᵉ personne du pluriel : le règlement s’adresse à tous les lecteurs.',3),
  C('q8','REFERENCE',4,'Dans « ne les remettez pas vous-mêmes », que remplace « les » ?',['Les livres que l’on a consultés','Les chariots de la salle','Les lecteurs du quartier'],0,'« les » reprend « vos livres consultés », que l’on ne doit pas replacer soi-même.',3),
  C('q9','VOCAB_CONTEXT,STRUCTURE',4,'Quelle règle exprime une interdiction ?',['Parlez doucement dans la salle','Rendez vos emprunts à l’accueil','N’écrivez pas dessus, ne pliez pas les pages'],2,'La forme négative « ne… pas » à l’impératif exprime une interdiction.',4),
  C('q10','INFERENCE,EXPLICIT',4,'Que peut-on faire si l’on ne peut pas rendre un livre à temps ?',['Le garder sans rien dire','Venir prolonger le prêt à l’accueil','Le donner à un ami'],1,'La règle 4 prévoit de « venir prolonger le prêt à l’accueil ».',5),
  O('q13','SEQUENCE',3,'Remets ces règles dans l’ordre du règlement.',['Parler doucement','Ranger les livres sur les chariots','Rendre les emprunts à temps'],'Le règlement commence par le silence, puis le rangement, puis le retour des emprunts.'),
  E('q11','JUSTIFY,STRUCTURE',3,'Quelle règle explique comment prendre soin des documents ?',4,'La règle 3 dit de prendre soin des documents et précise les interdictions.'),
  C('q12','AUTHOR_INTENT,GENRE',5,'Quel est le ton de ce règlement ?',['Menaçant','Poli et clair : il explique et remercie','Moqueur'],1,'« Chers lecteurs », « merci de » et « Merci de votre aide ! » rendent le règlement poli. Les raisons sont données.',1)
 ]}));

var OUT={};LIST.forEach(function(r){OUT[r.id]=r;});
Object.assign(window.MQ_READING.resources,OUT);
})();
