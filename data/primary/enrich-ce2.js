/* Finot Académie — CE2 : enrichissement V8.13 (variété des questions + activités hors écran).
   Programmes : français et mathématiques 2024 (BO n°41 du 31/10/2024) ; questionner le monde 2020 ; EMC 2024 ; EVAR 2025 ;
   arts plastiques, éducation musicale, EPS 2020. Les activités « hors écran » ne sont pas évaluées par l'application. */
(function(){
'use strict';
const MQ=window.MQPrimary;if(!MQ)return;const E=MQ.enrich;const T=(t,h)=>({t,h});
const HE=(icon,titre,{but,consigne,duree,materiel,securite,auto})=>T(`${icon} ${titre}`,`<p><b>Pourquoi ?</b> ${but}</p><p><b>Ce que tu fais :</b> ${consigne}</p><p><b>Durée :</b> ${duree}${materiel?` · <b>Matériel :</b> ${materiel}`:''}</p>${securite?`<p><b>Sécurité :</b> ${securite}</p>`:''}<p><b>Je m’auto-évalue :</b> ${auto}</p><p><small>Activité à faire sans écran, avec un adulte. L’application ne la note pas.</small></p>`);
const DICT=w=>({f:()=>MQ.H.txt('🎧 Écoute et écris la phrase :',[w],{audio:{t:w,l:'fr-FR'},strict:true,lang:'fr',chips:['é','è','ê','à','ç'],hint:'Écoute, écris, puis relis : accords, homophones, ponctuation.',expl:`On écrit : <b>${w}</b>`})});

/* ---------- Français ---------- */
E('ce2-fr-m-mbp',{items:[
 ['Complète : une la…pe','m',['n'],'Devant p, on écrit m : lampe.'],['Complète : une o…bre','m',['n'],'Devant b, on écrit m : ombre.'],['Complète : un po…pier','m',['n'],'Devant p : pompier.'],['Complète : le ta…bour','m',['n'],'Devant b : tambour.'],['Complète : une cha…bre','m',['n'],'Devant b : chambre.'],
 ['Complète : un ga…t','n',['m'],'Devant t, on écrit n : gant.'],['Complète : un e…fant','n',['m'],'Devant f, on écrit n : enfant.'],['Complète : la mo…tagne','n',['m'],'Devant t : montagne.'],
 ['Complète : un bo…bon','n',['m'],'Exception : bonbon s’écrit avec n devant b.',2],['Complète : un e…ballage','m',['n'],'Devant b : emballage.',2],['Complète : la te…pête','m',['n'],'Devant p : tempête.'],['Complète : un ja…bon','m',['n'],'Devant b : jambon.']]});
E('ce2-fr-homophones-a-et',{items:[
 ['Complète : « Léa … un vélo rouge. »','a',['à'],'On peut dire « Léa avait un vélo » : a.'],['Complète : « Je vais … l’école. »','à',['a'],'On ne peut pas dire « avait l’école » : à.'],
 ['Complète : « Il … faim. »','a',['à'],'Il avait faim : a.'],['Complète : « Nous jouons … cache-cache. »','à',['a'],'On ne peut pas dire « avait cache-cache » : à.'],
 ['Complète : « Le ciel … bleu. »','est',['et'],'Le ciel était bleu : est.'],['Complète : « Paul … Léa jouent. »','et',['est'],'Paul et puis Léa : et.'],
 ['Complète : « Mon chien … gentil. »','est',['et'],'Mon chien était gentil : est.'],['Complète : « J’aime les pommes … les poires. »','et',['est'],'Les pommes et puis les poires : et.'],
 ['Complète : « Elle … partie … Paris. »','est … à',['et … a','est … a','et … à'],'Elle était partie ; on ne peut pas dire « avait Paris ».',2],
 ['Complète : « Tom … un frère … une sœur. »','a … et',['à … est','a … est','à … et'],'Tom avait un frère ; un frère et puis une sœur.',2],
 ['Complète : « Le gâteau … chaud … délicieux. »','est … et',['et … est','est … est','et … et'],'Il était chaud ; chaud et puis délicieux.',3],
 ['Complète : « Il y … un oiseau … la fenêtre. »','a … à',['à … a','a … a','à … à'],'Il y avait un oiseau ; « avait la fenêtre » est impossible.',3]]});
E('ce2-fr-homophones-son-on',{items:[
 ['Complète : « Les enfants … dans la cour. »','sont',['son'],'Les enfants étaient dans la cour : sont.'],['Complète : « Léo range … cartable. »','son',['sont'],'Léo range mon cartable → son cartable.'],
 ['Complète : « Mes amis … gentils. »','sont',['son'],'Mes amis étaient gentils : sont.'],['Complète : « Elle promène … chien. »','son',['sont'],'Elle promène mon chien → son chien.'],
 ['Complète : « … joue au ballon. »','On',['Ont'],'Il joue au ballon → on.'],['Complète : « Ils … faim. »','ont',['on'],'Ils avaient faim : ont.'],
 ['Complète : « Les élèves … fini leur travail. »','ont',['on'],'Les élèves avaient fini : ont.'],['Complète : « … va à la plage ? »','On',['Ont'],'Il va à la plage → on.'],
 ['Complète : « Mes cousins … un chat qui … gentils ? » — choisis le premier mot','ont',['on','sont','son'],'Mes cousins avaient un chat : ont.',2],
 ['Complète : « … frère et sa sœur … là. »','Son … sont',['Sont … son','Son … son','Sont … sont'],'Mon frère → son ; ils étaient là → sont.',2],
 ['Complète : « … dit que les enfants … gagné. »','On … ont',['Ont … on','On … on','Ont … ont'],'Il dit → on ; ils avaient gagné → ont.',3],
 ['Complète : « Ils … partis avec … chien. »','sont … leur',['son … leur','sont … son','son … sont'],'Ils étaient partis : sont ; leur chien (à eux).',3]]});
E('ce2-fr-comprendre',{items:[
 ['« D’abord, Max ouvre la boîte. Ensuite, il découvre une clé. Enfin, il ouvre la porte. » Que fait Max en premier ?','il ouvre la boîte',['il découvre une clé','il ouvre la porte','il perd la clé'],'« D’abord » indique la première action.'],
 ['Dans un récit, le « problème » arrive…','après la situation de départ',['à la toute fin','avant le titre','jamais'],'Situation de départ → problème → actions → fin.'],
 ['« Enfin » sert à indiquer…','la dernière étape',['la première étape','une question','un lieu'],'Enfin = à la fin.'],
 ['« Le soleil se couchait sur le village silencieux. » Quel moment de la journée ?','le soir',['le matin','midi','la récréation'],'Le soleil qui se couche : c’est le soir.'],
 ['« Zoé serrait son doudou en entendant l’orage. » Que ressent Zoé ?','de la peur',['de la joie','de la colère','de la fierté'],'Serrer son doudou pendant l’orage montre la peur.'],
 ['« Le renard rusé fit tomber le fromage du corbeau. » Qui est rusé ?','le renard',['le corbeau','le fromage','l’arbre'],'L’adjectif « rusé » décrit le renard.'],
 ['La fin d’une histoire s’appelle…','la situation finale',['la situation initiale','le titre','le personnage'],'Elle montre comment tout se termine.'],
 ['Quel connecteur indique une action qui arrive brusquement ?','soudain',['d’abord','enfin','ensuite'],'Soudain = tout à coup.']]});
E('ce2-fr-dictionnaire',{items:[
 ['Quel mot vient en premier dans le dictionnaire ?','avion',['bateau','chat','zèbre'],'a vient avant b, c, z.'],['Quel mot vient en premier : « mouton » ou « montagne » ?','montagne',['mouton'],'mo-n avant mo-u : n vient avant u.',2],
 ['Pour chercher « mangeaient », je cherche…','manger',['mangeaient','mange','mangeoire'],'Un verbe se cherche à l’infinitif.'],['Pour chercher « chevaux », je cherche…','cheval',['chevaux','chevalier','cheveu'],'Un nom se cherche au singulier.'],
 ['Pour chercher « belles », je cherche…','beau',['belles','belle','bel'],'Un adjectif se cherche au masculin singulier.'],['L’abréviation « v. » signifie…','verbe',['voir','ville','voyelle'],'v. = verbe.'],
 ['L’abréviation « adj. » signifie…','adjectif',['adverbe','article','adulte'],'adj. = adjectif.']]});
E('ce2-fr-polysemie',{items:[
 ['« La souris de l’ordinateur » : le mot souris désigne…','un objet pour cliquer',['un petit animal','un fromage','un sourire'],'Le contexte (ordinateur) donne le sens.'],
 ['« Il a une faim de loup » veut dire…','il a très faim',['il mange un loup','il a peur','il est méchant'],'C’est un sens figuré.'],
 ['« La tête d’un clou » : c’est…','le bout plat du clou',['le visage du clou','le chef du clou','un chapeau'],'Le mot « tête » a plusieurs sens.'],
 ['« Avoir un cœur d’or » veut dire…','être très gentil',['avoir un cœur en métal','être riche','être malade'],'Sens figuré.'],
 ['Dans « une feuille de papier », feuille veut dire…','un morceau de papier',['une partie d’arbre','une salade','une page de livre de plantes'],'Contexte : papier.']]});
E('ce2-fr-phrase',{items:[
 ['Mets à la forme négative : « Il mange encore. »','Il ne mange plus.',['Il ne mange pas encore.','Il mange plus.','Il ne mange jamais encore.'],'encore → ne … plus.'],
 ['Mets à la forme négative : « Elle va toujours au parc. »','Elle ne va jamais au parc.',['Elle va jamais au parc.','Elle ne va pas toujours au parc.','Elle ne va toujours au parc.'],'toujours → ne … jamais.'],
 ['Dans un dialogue, quel signe indique qu’un nouveau personnage parle ?','le tiret',['le point','la virgule','le point-virgule'],'Le tiret marque le changement de personne.'],
 ['Les paroles d’un personnage sont souvent placées entre…','des guillemets « »',['des parenthèses','des crochets','des étoiles'],'Les guillemets encadrent le dialogue.'],
 ['« Viens ici ! » est une phrase…','impérative',['interrogative','déclarative','négative'],'Elle donne un ordre.']]});
E('ce2-fr-constituants',{items:[
 ['Quel est le sujet de « Les oiseaux chantent le matin. » ?','Les oiseaux',['chantent','le matin','matin'],'Ce sont les oiseaux qui chantent.'],
 ['Quel est le verbe de « Mon père répare la voiture. » ?','répare',['père','voiture','la'],'« répare » change avec le temps.'],
 ['Quel pronom peut remplacer le sujet « Ma tante et ma mère » ?','elles',['ils','nous','elle'],'Deux femmes → elles.'],
 ['Dans « Le matin, Tom boit du lait », « le matin » est…','un complément de phrase (on peut le déplacer)',['le sujet','le verbe','un pronom'],'On peut le déplacer ou le supprimer.']]});
E('ce2-fr-dictee',{items:[DICT('Les enfants regardent les étoiles.'),DICT('Mon frère est parti à la mer.'),DICT('Ils ont mangé des fraises sucrées.'),DICT('Le chat et le chien dorment.'),DICT('On entend les oiseaux chanter.'),DICT('Ma tante a deux petits chiens.')],w:.4});

/* ---------- Mathématiques ---------- */
E('ce2-ma-symetrie',{items:[
 {n:'Combien d’axes de symétrie a un carré ?',a:4,e:'2 médianes + 2 diagonales.'},{n:'Combien d’axes de symétrie a un rectangle (non carré) ?',a:2,e:'Les deux médianes.'},
 ['Combien d’axes de symétrie a un cercle ?','une infinité',['1','2','4'],'Tout diamètre est un axe.'],{n:'Combien d’axes de symétrie a un triangle équilatéral ?',a:3,e:'Un par sommet.',d:2},
 ['Quelle lettre a un axe de symétrie vertical ?','A',['F','G','R'],'A se plie en deux moitiés identiques.'],['Quelle lettre n’a aucun axe de symétrie ?','F',['A','H','O'],'F ne se superpose pas en pliant.'],
 ['Un axe de symétrie, c’est…','une ligne de pliage qui superpose les deux moitiés',['un côté du carré','un angle droit','une diagonale toujours'],'Les deux parties se superposent.'],
 ['Un papillon a souvent…','un axe de symétrie',['aucun axe','4 axes','une infinité d’axes'],'Ses ailes sont symétriques.'],
 ['Quelle lettre a deux axes de symétrie ?','H',['A','L','P'],'H a un axe vertical et un horizontal.',2],['Le symétrique d’un point est…','à la même distance de l’axe, de l’autre côté',['sur l’axe toujours','deux fois plus loin','du même côté'],'Il est à égale distance de l’axe.',3]]});
E('ce2-ma-solides',{items:[
 ['Un patron de cube est formé de…','6 carrés',['4 carrés','8 carrés','6 triangles'],'Le cube a 6 faces carrées.'],['Un patron, c’est…','une figure plane qui se plie pour former un solide',['un solide coupé','le dessin d’une face','un plan de maison'],'On découpe et on plie.'],
 {n:'Combien de faces a une pyramide à base carrée ?',a:5,e:'1 carré + 4 triangles.'},{n:'Combien de sommets a un cube ?',a:8,e:'8 sommets.'},{n:'Combien d’arêtes a un cube ?',a:12,e:'12 arêtes.'},
 ['Un cylindre a…','2 faces planes en forme de disque',['6 faces carrées','des faces triangulaires','aucune face plane'],'Les deux bases sont des disques.'],
 ['Six carrés en ligne forment-ils un patron de cube ?','non',['oui'],'En pliant, des faces se superposent.',2],['Les faces d’une pyramide (sauf la base) sont des…','triangles',['carrés','cercles','rectangles'],'Elles se rejoignent au sommet.'],
 ['Un dé est un…','cube',['pavé quelconque','cylindre','prisme triangulaire'],'Le dé est un cube.'],['Une boîte de céréales a la forme d’un…','pavé',['cube parfait','cylindre','cône'],'Faces rectangulaires.']]});


E('ce2-ma-symetrie',{items:[
 {f:()=>{const L=[['A','oui (vertical)'],['B','oui (horizontal)'],['C','oui (horizontal)'],['D','oui (horizontal)'],['E','oui (horizontal)'],['M','oui (vertical)'],['T','oui (vertical)'],['U','oui (vertical)'],['V','oui (vertical)'],['W','oui (vertical)'],['Y','oui (vertical)'],['F','non'],['G','non'],['J','non'],['L','non'],['P','non'],['R','non'],['N','non'],['S','non'],['Z','non']];const [l,a]=L[Math.floor(Math.random()*L.length)];
   return MQ.H.ch(`La lettre majuscule <b>${l}</b> (écrite en capitale d’imprimerie) a-t-elle un axe de symétrie ?`,a,['oui (vertical)','oui (horizontal)','non'].filter(x=>x!==a),{expl:a==='non'?`${l} ne se superpose pas en pliant : aucun axe.`:`${l} se plie en deux moitiés identiques : axe ${a.slice(5,-1)}.`});}},
 {f:()=>{const F=[['un carré','4'],['un rectangle (non carré)','2'],['un triangle équilatéral','3'],['un losange (non carré)','2'],['un triangle isocèle (non équilatéral)','1'],['un hexagone régulier','6'],['un cercle','une infinité']];const [f,a]=F[Math.floor(Math.random()*F.length)];
   return MQ.H.ch(`Combien d’axes de symétrie a <b>${f}</b> ?`,a,['1','2','3','4','6','une infinité'].filter(x=>x!==a).sort(()=>Math.random()-.5).slice(0,3),{expl:`${f} a ${a} axe${a==='1'?'':'s'} de symétrie.`});}}],w:.4});

/* ---------- Questionner le monde ---------- */
E('ce2-qm-reproduction',{items:[
 ['Un animal qui pond des œufs est…','ovipare',['vivipare','herbivore','carnivore'],'Ovipare = pond des œufs.'],['Un animal dont le petit naît dans le ventre de la mère est…','vivipare',['ovipare','insecte','plante'],'Vivipare.'],
 ['La poule est…','ovipare',['vivipare'],'Elle pond des œufs.'],['La vache est…','vivipare',['ovipare'],'Le veau naît du ventre de la vache.'],
 ['Le transport du pollen d’une fleur à une autre s’appelle…','la pollinisation',['la germination','la digestion','la respiration'],'Souvent grâce aux abeilles.'],
 ['Après la pollinisation, la fleur devient…','un fruit',['une racine','une tige','une feuille'],'Le fruit contient les graines.'],{o:['la fleur','la pollinisation','le fruit','les graines'],q:'Range les étapes :',e:'fleur → pollinisation → fruit → graines'}]});
E('ce2-qm-chaines',{items:[
 ['Dans la chaîne « herbe → lapin → renard », qui est le producteur ?','l’herbe',['le lapin','le renard','le soleil'],'Les végétaux produisent leur matière.'],
 ['Dans « herbe → lapin → renard », que mange le lapin ?','de l’herbe',['le renard','rien','de la viande'],'La flèche veut dire « est mangé par ».'],
 ['Un animal qui mange des plantes est…','herbivore',['carnivore','omnivore','producteur'],'Herbivore.'],['Un animal qui mange d’autres animaux est…','carnivore',['herbivore','végétal','producteur'],'Carnivore.'],
 ['Un animal qui mange de tout est…','omnivore',['herbivore','carnivore','ovipare'],'Omnivore (comme l’être humain).'],['Si tous les lapins disparaissent, les renards…','manquent de nourriture',['ont plus à manger','deviennent herbivores','ne changent pas'],'Toute la chaîne est touchée.',2],
 {o:['les feuilles','la chenille','la mésange','l’épervier'],q:'Range la chaîne alimentaire :',e:'feuilles → chenille → mésange → épervier'}]});
E('ce2-qm-corps-mouvement',{items:[
 ['Qu’est-ce qui permet de plier le bras ?','le coude (une articulation)',['l’os seul','la peau','le cœur'],'Les articulations permettent de plier.'],
 ['Les muscles permettent…','de faire bouger les os',['de penser','de voir','de digérer seulement'],'Le muscle se contracte et tire l’os.'],
 ['Que protègent les côtes ?','le cœur et les poumons',['le cerveau','les pieds','l’estomac seulement'],'La cage thoracique protège ces organes.'],
 ['Que protège le crâne ?','le cerveau',['le cœur','les poumons','les dents'],'Le crâne est une boîte osseuse.'],
 ['La colonne vertébrale est formée de…','vertèbres',['côtes','dents','muscles'],'Elle est faite de petits os : les vertèbres.'],
 ['Combien d’os environ dans le squelette d’un adulte ?','environ 200 (206)',['10','50','1 000'],'Un adulte a 206 os.',2],
 ['Quand le biceps se contracte, le bras…','se plie',['se tend','tombe','gèle'],'Le biceps plie le bras.',2],['Pour garder des os solides, on mange des aliments riches en…','calcium',['sucre','sel','huile'],'Le calcium se trouve dans les produits laitiers.'],
 ['Avant le sport, on s’échauffe pour…','préparer les muscles et éviter les blessures',['se fatiguer','grandir','dormir'],'L’échauffement protège.'],['L’endroit où deux os se rejoignent s’appelle…','une articulation',['un muscle','une veine','un tendon'],'Coude, genou, épaule…'],['Quel os forme le haut de la jambe ?','le fémur',['le crâne','la côte','la vertèbre'],'Le fémur est l’os de la cuisse, le plus long du corps.',2],['Le cœur est…','un muscle',['un os','une articulation','une dent'],'Le cœur est un muscle qui ne s’arrête jamais.',2]]});
E('ce2-qm-matiere',{items:[
 ['Un ballon gonflé est plus lourd qu’un ballon dégonflé car…','l’air a une masse',['le ballon grandit','il est mouillé','il est plus rond'],'L’air est de la matière.'],
 ['Le sucre dans l’eau…','se dissout',['flotte toujours','coule et reste en morceaux','devient du sel'],'Il se dissout : on ne le voit plus.'],
 ['L’huile dans l’eau…','ne se mélange pas',['se dissout','devient de l’eau','disparaît'],'L’huile reste au-dessus.'],
 ['Le sable dans l’eau…','ne se dissout pas',['se dissout','devient du sucre','s’évapore'],'Le sable se dépose au fond.'],
 ['Un mélange eau + sable se sépare en…','filtrant (filtre)',['le secouant','le chauffant au four','le congelant'],'Le filtre retient le sable.',2],['L’air est…','invisible mais bien présent',['inexistant','toujours visible','un liquide'],'On ne le voit pas, mais on le sent (vent).'],['Le sel dans l’eau…','se dissout',['flotte','reste en grains au fond pour toujours','devient du sucre'],'L’eau devient salée : le sel est dissous.'],['Pour récupérer le sel d’une eau salée, on peut…','laisser l’eau s’évaporer',['filtrer','secouer','congeler'],'L’eau part en vapeur, le sel reste.',2]]});
E('ce2-qm-objets',{items:[
 ['Le métal laisse passer l’électricité : c’est un…','conducteur',['isolant'],'Les métaux conduisent l’électricité.'],['Le plastique ne laisse pas passer l’électricité : c’est un…','isolant',['conducteur'],'Le plastique isole.'],
 ['Quel objet est conducteur ?','une cuillère en métal',['une règle en plastique','un crayon en bois','une gomme'],'Le métal conduit.'],['Quel objet est isolant ?','une gomme',['un clou','une pièce de monnaie','un trombone'],'Le caoutchouc est isolant.'],
 ['Pourquoi les fils électriques sont-ils entourés de plastique ?','pour isoler et protéger',['pour faire joli','pour aller plus vite','pour les rendre lourds'],'Le plastique isole le fil.'],['Un objet technique répond à…','un besoin',['rien','la météo','un rêve'],'On fabrique un objet pour répondre à un besoin.'],['Quel objet est conducteur : un clou ou un bouchon en liège ?','un clou',['un bouchon en liège'],'Le clou est en métal : il conduit l’électricité.'],['Une paire de ciseaux sert à…','couper',['coller','mesurer','éclairer'],'Fonction d’usage : couper.'],['Quel matériau est transparent ?','le verre',['le bois','le métal','le carton'],'Le verre laisse passer la lumière.',2]]});
E('ce2-qm-modes-vie',{items:[
 ['Avant le téléphone portable, on téléphonait avec…','un téléphone fixe',['une tablette','une montre connectée','une fusée'],'Le téléphone fixe était branché au mur.'],
 ['Avant l’électricité, on s’éclairait avec…','des bougies',['des écrans','des LED','des smartphones'],'Bougies et lampes à pétrole.'],
 ['Autrefois, pour laver le linge, on allait souvent…','au lavoir',['au supermarché','à la piscine','au cinéma'],'Le lavoir servait à laver le linge à la main.'],['Avant les voitures, on se déplaçait souvent…','à pied ou à cheval',['en trottinette électrique','en avion','en métro partout'],'La voiture s’est répandue au XXe siècle.'],['Avant l’ordinateur, on écrivait les lettres…','à la main ou à la machine à écrire',['avec un téléphone','sur une tablette','avec une imprimante 3D'],'La machine à écrire a précédé l’ordinateur.',2]]});
E('ce2-qm-france-europe',{items:[
 ['Quel pays est voisin de la France ?','l’Espagne',['le Japon','le Brésil','l’Australie'],'L’Espagne est au sud-ouest.'],['Quelle est la capitale de l’Italie ?','Rome',['Madrid','Berlin','Londres'],'Rome.'],
 ['Quelle est la capitale de l’Allemagne ?','Berlin',['Paris','Vienne','Rome'],'Berlin.'],['Quelle est la capitale de l’Espagne ?','Madrid',['Barcelone','Lisbonne','Rome'],'Madrid.']]});

/* ---------- EMC ---------- */
E('ce2-emc-bien-commun',{items:[
 ['Un parc public est…','un bien commun',['un bien privé','à une seule personne','interdit à tous'],'Il appartient à tous.'],['Abîmer un banc public, c’est…','nuire à tout le monde',['sans conséquence','autorisé','une bonne idée'],'Tout le monde en souffre.'],
 ['Ramasser un papier dans la rue, c’est agir pour…','l’intérêt général',['soi seulement','personne','embêter les autres'],'C’est bon pour tous.']]});
E('ce2-emc-commune',{items:[
 ['Qui dirige la commune ?','le maire',['le président','le directeur d’école','le boulanger'],'Le maire est élu.'],['Le maire est élu pour…','6 ans',['1 an','20 ans','toute sa vie'],'Les élections municipales ont lieu tous les 6 ans.'],
 ['Les conseillers municipaux sont…','élus par les habitants',['choisis au hasard','nommés par le roi','des enfants'],'Ils sont élus.']]});
E('ce2-emc-engagement',{items:[
 ['Le délégué de classe…','représente les élèves',['punit les élèves','remplace la maîtresse','fait les devoirs des autres'],'Il porte la parole de la classe.'],
 ['Un bénévole…','aide sans être payé',['est payé très cher','travaille pour lui seul','est obligé'],'Le bénévolat est volontaire.'],['Une association…','rassemble des personnes pour un projet commun',['est un magasin','est une école','est une ville'],'Ex. : club de sport, aide aux animaux.']]});
E('ce2-emc-valeurs',{items:[
 ['La laïcité à l’école permet…','d’accueillir tous les élèves, quelles que soient leurs croyances',['d’imposer une religion','d’interdire les fêtes','de séparer filles et garçons'],'L’école est neutre et ouverte à tous.'],
 ['« Liberté » veut dire qu’on peut…','agir et penser librement en respectant les autres et la loi',['faire tout ce qu’on veut sans règles','ne jamais aller à l’école','ignorer les autres'],'La liberté a des limites : les droits des autres.'],
 ['Quelles sont les trois valeurs de la devise ?','Liberté, Égalité, Fraternité',['Paix, Joie, Amour','Force, Honneur, Travail','Unité, Courage, Respect'],'C’est la devise de la République.']]});

/* ---------- Arts, musique, EPS, EVAR ---------- */
E('ce2-ap-perspective',{items:[
 ['Ce qui est proche dans une image est au…','premier plan',['arrière-plan','ciel','bord du cadre'],'Premier plan = proche.'],['Ce qui est loin est à l’…','arrière-plan',['premier plan','avant-plan','centre toujours'],'Arrière-plan = loin.'],
 ['Un objet lointain est dessiné…','plus petit',['plus grand','de la même taille','en rouge'],'Plus c’est loin, plus c’est petit.']],
 parts:[HE('🎨','Atelier hors écran : le paysage en profondeur',{but:'créer l’illusion de la profondeur.',consigne:'Dessine un paysage avec 3 arbres : un grand en bas (premier plan), un moyen, un tout petit en haut (arrière-plan). Ajoute un chemin qui se rétrécit vers le fond.',duree:'25 minutes',materiel:'feuille, crayons',auto:'Mes arbres rapetissent vers le fond et mon chemin se rétrécit.'})]});
E('ce2-ap-materiaux',{items:[
 ['Modeler l’argile, c’est…','ajouter et façonner la matière',['enlever de la matière','peindre','photographier'],'On modèle en ajoutant.'],['Tailler une pierre, c’est…','enlever de la matière',['ajouter de la matière','peindre','coller'],'On enlève.'],
 ['Assembler des boîtes et des bouchons, c’est faire…','un assemblage',['une aquarelle','une photo','un dessin au crayon'],'On réunit des objets.']],
 parts:[HE('🗿','Atelier hors écran : ma sculpture d’objets',{but:'créer un volume en assemblant.',consigne:'Avec des objets de récupération (boîtes, bouchons, rouleaux), construis un animal ou un robot. Colle ou attache les éléments, puis donne un titre à ta sculpture.',duree:'30 minutes',materiel:'objets de récupération, colle, ruban adhésif',securite:'ciseaux à bouts ronds.',auto:'Ma sculpture tient debout et je peux expliquer comment je l’ai construite.'})]});
E('ce2-ap-artistes',{parts:[HE('🖼️','Atelier hors écran : à la manière de…',{but:'reconnaître et imiter le style d’un artiste.',consigne:'Choisis un artiste (Matisse : papiers découpés ; Van Gogh : tourbillons ; Monet : taches de lumière). Fais une petite œuvre « à la manière de » cet artiste.',duree:'30 minutes',materiel:'papiers de couleur, ciseaux, colle, ou peinture',auto:'Un adulte reconnaît l’artiste qui m’a inspiré.'})]});
E('ce2-mu-orchestre',{parts:[HE('🎻','Activité musicale hors écran : l’orchestre de la maison',{but:'reconnaître les familles d’instruments.',consigne:'Écoute un morceau d’orchestre avec un adulte. Lève la main droite pour les cordes, la main gauche pour les cuivres, tape des pieds pour les percussions.',duree:'15 minutes',materiel:'un enregistrement d’orchestre',auto:'J’ai reconnu au moins 2 familles d’instruments.'})]});
E('ce2-mu-ecriture',{parts:[HE('🎼','Activité musicale hors écran : je frappe les durées',{but:'lire et jouer des rythmes simples.',consigne:'Un adulte écrit une suite de notes (noires, blanches, croches). Frappe dans tes mains : une noire = 1 temps, une blanche = 2 temps (tu laisses les mains jointes), deux croches = 1 temps.',duree:'15 minutes',materiel:'papier, crayon',auto:'Je frappe la suite sans me tromper et sans accélérer.'})]});
E('ce2-mu-styles',{parts:[HE('🌍','Activité musicale hors écran : voyage musical',{but:'découvrir des musiques du monde.',consigne:'Écoute avec un adulte trois musiques de styles différents (classique, jazz, musique traditionnelle d’un pays). Pour chacune, dis : rapide ou lente ? quels instruments ? ce que tu ressens.',duree:'20 minutes',materiel:'des enregistrements',auto:'Je décris chaque musique avec au moins 2 mots justes.'})]});
E('ce2-eps-natation',{items:[
 ['Drapeau rouge sur la plage :','baignade interdite',['baignade surveillée sans danger','baignade conseillée','plage fermée aux adultes seulement'],'Rouge = interdit.'],
 ['Drapeau vert :','baignade surveillée',['baignade interdite','tempête','requins'],'Vert = baignade surveillée.'],['Pour se reposer dans l’eau, on peut…','faire la planche',['s’agiter','crier','plonger au fond'],'Flotter sur le dos permet de se reposer.']],
 parts:[HE('🏊','Mission hors écran : prêt pour la piscine',{but:'connaître les règles avant d’aller dans l’eau.',consigne:'Avec un adulte, prépare ton sac et répète les règles : je ne cours pas, je ne pousse pas, je ne vais jamais dans l’eau sans adulte. À la piscine, entraîne-toi à faire la planche 5 secondes.',duree:'variable',materiel:'maillot, bonnet, serviette',securite:'toujours sous la surveillance d’un adulte ou d’un maître-nageur.',auto:'Je redis les 3 règles et je fais la planche 5 secondes.'})]});
E('ce2-eps-athletisme',{items:[
 ['Pour courir longtemps, il faut…','une allure régulière',['partir le plus vite possible','s’arrêter souvent','courir à reculons'],'L’endurance demande une allure régulière.'],
 ['Pour un sprint, le départ doit être…','rapide',['lent','en marchant','en sautant'],'Le départ rapide compte beaucoup.'],['Pour progresser, je…','mesure ma performance et je la compare à la précédente',['me compare seulement aux plus grands','ne mesure jamais','abandonne'],'On se compare à soi-même.']],
 parts:[HE('🏃','Mission hors écran : mon record',{but:'mesurer sa performance et progresser.',consigne:'Avec un adulte, mesure ton saut en longueur (pieds joints) 3 fois. Note le meilleur. Une semaine plus tard, recommence et compare.',duree:'15 minutes',materiel:'mètre ruban, craie',securite:'sol non glissant ; s’échauffer avant.',auto:'J’ai noté mon record et j’ai essayé de le battre.'})]});
E('ce2-eps-danse',{items:[
 ['En danse, on utilise son corps, l’espace, le temps et…','l’énergie',['la balance','le calendrier','la règle'],'Corps, espace, temps, énergie.'],['Quand un camarade danse, le public…','regarde avec respect',['se moque','parle fort','part'],'On respecte celui qui danse.'],
 ['Danser lentement puis vite, c’est jouer avec…','le temps',['l’espace','la couleur','la taille'],'Vitesse = temps.']],
 parts:[HE('💃','Mission hors écran : la danse des animaux',{but:'s’exprimer avec son corps.',consigne:'Sur une musique, invente une petite danse : marche comme un éléphant (lent, lourd), puis comme un oiseau (léger, rapide). Termine par une pose figée de 3 secondes. Présente-la à un adulte.',duree:'15 minutes',materiel:'une musique',securite:'espace dégagé.',auto:'Ma danse a un début, des mouvements différents et une fin.'})]});
E('ce2-evar-soin',{items:[
 ['Pour être en bonne santé, il faut…','bien dormir, bien manger, bouger et se laver',['regarder des écrans toute la nuit','manger seulement des sucreries','ne jamais se laver'],'Ce sont les 4 piliers.'],
 ['Si j’ai mal ou si quelque chose ne va pas, je…','en parle à un adulte',['le garde pour moi','attends que ça passe sans rien dire','me cache'],'Un adulte peut aider.'],['Écouter son corps, c’est…','faire attention à la fatigue, la faim, la douleur',['ignorer ses besoins','toujours manger','ne jamais dormir'],'Le corps envoie des signaux.']],
 parts:[HE('💛','Moment hors écran : ma journée en forme',{but:'organiser une journée bonne pour la santé.',consigne:'Avec un adulte, dessine ta journée idéale : heure du coucher, repas variés, moment de jeu dehors, temps d’écran limité, toilette.',duree:'15 minutes',materiel:'feuille, crayons',auto:'Ma journée contient sommeil, repas variés, activité physique et hygiène.'})]});
E('ce2-evar-consentement',{items:[
 ['Le consentement, c’est…','être d’accord librement',['être obligé','ne rien dire','faire plaisir à tout prix'],'Un accord libre.'],['Si mon copain hésite, cela veut dire…','ce n’est pas un oui',['oui','peut-être oui, donc j’y vais','il faut insister'],'Une hésitation n’est pas un oui.'],
 ['J’ai le droit de dire non…','même à quelqu’un que j’aime bien',['jamais','seulement aux inconnus','seulement le dimanche'],'On peut dire non à tout le monde.']],
 parts:[HE('🤝','Moment hors écran : le jeu du « Je peux ? »',{but:'apprendre à demander et à respecter la réponse.',consigne:'Avec un adulte, jouez des petites scènes : emprunter un crayon, faire un câlin, prendre une photo. À chaque fois, on demande « Je peux ? » et on respecte la réponse, même si c’est non.',duree:'10 minutes',materiel:'aucun',auto:'J’ai demandé à chaque fois et j’ai accepté les « non ».'})]});
E('ce2-evar-droits',{items:[
 ['La Convention internationale des droits de l’enfant date de…','1989',['1789','1945','2020'],'Adoptée le 20 novembre 1989.'],['Le 119 permet…','d’aider les enfants en danger',['de commander une pizza','d’appeler les pompiers seulement','de réserver un voyage'],'Allô Enfance en danger.'],
 ['Le droit à l’éducation, c’est le droit…','d’aller à l’école',['de ne rien apprendre','de travailler à l’usine','de jouer toute la journée'],'Tous les enfants ont droit à l’école.']],
 parts:[HE('📜','Moment hors écran : l’affiche de mes droits',{but:'connaître ses droits.',consigne:'Fais une affiche avec 4 droits de l’enfant (identité, santé, éducation, protection) : un dessin et une phrase pour chacun. Ajoute le numéro 119.',duree:'25 minutes',materiel:'grande feuille, feutres',auto:'Mon affiche montre 4 droits et le 119.'})]});

/* ---------- Vague 1 pédagogie (23/10/2026) : variété des exercices d'EMC en CE2 (formulations, vrai/faux, réponses écrites, ordre) ---------- */
E('ce2-emc-commune',{w:.85,items:[
 ['Le territoire où tu habites, village ou ville, s’appelle…','une commune',['un continent','un océan','une planète'],'La commune est le plus petit territoire administré par des élus.'],
 ['Dans ta commune, qui élit le maire ?','le conseil municipal, élu par les habitants',['le président de la République','le directeur de l’école','le roi'],'Les habitants élisent le conseil municipal, qui choisit le maire.',2],
 ['Qui aide le maire à diriger la commune ?','les adjoints',['les pompiers','les enseignants','les facteurs'],'Le maire est aidé par des adjoints, élus du conseil municipal.',2],
 ['La cantine d’une école primaire est organisée par…','la commune',['le ministère de la Santé','l’armée','une radio'],'La commune s’occupe des écoles du primaire et de la cantine.'],
 ['Pour déclarer la naissance d’un bébé, on va à…','la mairie',['la boulangerie','la gare','le cinéma'],'La mairie tient l’état civil : naissances, mariages.'],
 ['Si un lampadaire de ta rue est cassé, qui doit le réparer ?','la commune',['les élèves de CE2','le directeur d’école','le président de la République'],'La commune entretient les rues et l’éclairage.'],
 {tf:'Il y a un maire dans chaque commune, même dans un très petit village.',v:true,e:'Toute commune a un maire et un conseil municipal.'},
 {tf:'Les enseignants sont payés par la mairie.',v:false,e:'Ils dépendent de l’État. La commune s’occupe des bâtiments et de la cantine.'},
 {tf:'Le conseil municipal vote le budget de la commune.',v:true,e:'Il décide comment dépenser l’argent de la commune.',d:2},
 {t:'Complète : le maire travaille à la … (un seul mot)',a:['mairie'],e:'Le maire travaille à la mairie.'},
 {t:'Complète : les habitants élisent le conseil … (un seul mot)',a:['municipal'],e:'Le conseil municipal est élu par les habitants.',d:2},
 {n:'Tous les combien d’années élit-on le conseil municipal ?',a:6,u:'ans',e:'Les élections municipales ont lieu tous les 6 ans.',d:2},
 {o:['Les habitants votent','Le conseil municipal est élu','Le conseil élit le maire','Le maire dirige avec ses adjoints'],q:'Remets dans l’ordre comment on obtient un maire :',e:'D’abord le vote des habitants, puis l’élection du maire par le conseil.',d:3},
 ['Quel service ne dépend pas de la commune ?','la justice',['le ramassage des déchets','l’état civil','les parcs de la ville'],'La justice dépend de l’État, pas de la commune.',3]]});

E('ce2-emc-engagement',{w:.85,items:[
 ['Un délégué de classe est choisi…','par un vote des élèves',['par le hasard','par le plus fort','sans consulter personne'],'Le délégué est élu par ses camarades.'],
 ['Un délégué parle au nom…','de sa classe',['de lui seul','du maire','de sa famille'],'Il représente la classe.'],
 ['Une personne qui aide dans une association sans être payée est…','bénévole',['salariée','directrice','touriste'],'Un bénévole donne son temps gratuitement.'],
 ['Une association réunit des personnes qui…','veulent agir ensemble pour un but commun',['veulent gagner de l’argent à tout prix','se disputent','ne font rien ensemble'],'Une association a un projet commun, sans profit pour ses membres.',2],
 ['Pour aider à protéger la nature dans l’école, tu peux être…','éco-délégué',['gardien de but','capitaine de bateau','chef de gare'],'L’éco-délégué agit pour l’environnement de l’école.'],
 ['Quel geste montre un engagement pour les autres ?','participer à une collecte de vêtements',['garder un jouet pour soi','arriver en retard','copier sur son voisin'],'Aider les autres est un engagement.'],
 ['Les Restos du cœur aident surtout…','les personnes qui ont du mal à se nourrir',['les champions sportifs','les touristes','les chefs cuisiniers'],'Ils distribuent des repas et de l’aide.'],
 {tf:'Un délégué peut prendre toutes les décisions à la place de sa classe.',v:false,e:'Il transmet les idées de la classe, il ne décide pas seul.'},
 {tf:'On peut s’engager pour les autres même à 8 ans.',v:true,e:'Délégué, collecte, club : les enfants aussi peuvent agir.'},
 {tf:'Une association est toujours une entreprise qui vend des produits.',v:false,e:'Une association rassemble des personnes pour une cause ou une activité.',d:2},
 {t:'Complète : celui qui aide sans être payé s’appelle un … (un mot)',a:['bénévole','benevole'],e:'Un bénévole aide gratuitement.'},
 {o:['Je repère un problème','J’en parle aux camarades','Le délégué transmet l’idée','On essaie la solution'],q:'Remets dans l’ordre les étapes d’un projet de classe :',e:'On repère, on discute, on transmet, puis on agit.',d:3},
 ['Après un vote pour élire le délégué, on accepte le résultat. C’est…','respecter la décision de la majorité',['tricher','refuser de jouer','se moquer du gagnant'],'On respecte le vote.',2],
 ['Qui peut créer une association ?','deux personnes ou plus qui ont un projet commun',['seulement le maire','seulement les riches','seulement les personnes très âgées'],'La loi de 1901 permet de s’associer librement.',3]]});

E('ce2-emc-services-publics',{w:.85,items:[
 ['Appeler le 18, c’est appeler…','les pompiers',['la police','le SAMU','la mairie'],'Le 18 : sapeurs-pompiers.'],
 ['Appeler le 15, c’est appeler…','le SAMU, pour une urgence médicale',['la poste','le maire','la bibliothèque'],'Le 15 : urgences médicales.',2],
 ['Appeler le 17, c’est appeler…','la police ou la gendarmerie',['les pompiers','l’hôpital','l’école'],'Le 17 : police et gendarmerie.',2],
 ['Le numéro d’urgence européen est le…','112',['123','200','999'],'Le 112 fonctionne dans toute l’Union européenne.',2],
 ['Qui organise le ramassage des déchets de ta commune ?','un service public',['une famille voisine','les élèves','le facteur'],'Le ramassage des déchets est organisé pour tous.'],
 ['Une bibliothèque municipale est un service public car…','elle est ouverte à tous',['elle appartient à une seule personne','elle est réservée aux enfants riches','elle vend des livres chers'],'Elle sert tous les habitants.'],
 ['La police et la gendarmerie servent à…','protéger les habitants et faire respecter la loi',['vendre des produits','soigner les malades','enseigner les maths'],'Ce sont des services publics de sécurité.'],
 ['Qui paie les services publics ?','tous les habitants, par les impôts',['seulement les enfants','personne','les pompiers eux-mêmes'],'Les impôts financent les services publics.'],
 {tf:'Un service public traite tous les habitants de la même façon.',v:true,e:'C’est le principe d’égalité.'},
 {tf:'Un magasin de jouets est un service public.',v:false,e:'C’est une entreprise privée qui vend.'},
 {tf:'On peut appeler le 18 pour s’amuser.',v:false,e:'Les numéros d’urgence sont réservés aux vraies urgences.'},
 {t:'Complète : l’argent des services publics vient des … (un mot)',a:['impôts','impots'],e:'Les impôts financent les services publics.',d:2},
 {n:'Quel numéro appelle-t-on pour les pompiers ?',a:18,e:'Le 18.'},
 ['En cas d’appel d’urgence, il faut surtout…','rester calme et donner son adresse',['raccrocher tout de suite','crier sans expliquer','donner son plat préféré'],'Les secours doivent savoir où aller.',2]]});

E('ce2-emc-valeurs',{w:.85,items:[
 ['Les trois mots de la devise de la République sont…','Liberté, Égalité, Fraternité',['Force, Argent, Pouvoir','Travail, Famille, Patrie','Courage, Victoire, Gloire'],'La devise de la République : Liberté, Égalité, Fraternité.'],
 ['« Égalité » veut dire…','avoir les mêmes droits',['être tous identiques','avoir tous le même âge','penser tous la même chose'],'L’égalité, ce sont les mêmes droits, pas l’uniformité.'],
 ['« Liberté » veut dire…','pouvoir choisir, penser et s’exprimer en respectant les autres',['faire tout ce qu’on veut sans limite','ne jamais obéir','décider pour les autres'],'Ma liberté s’arrête où commence celle des autres.',2],
 ['La laïcité garantit…','la liberté de croire ou de ne pas croire',['une seule religion obligatoire','l’interdiction de toutes les religions','le droit de se moquer'],'Chacun est libre de sa croyance.'],
 ['Pourquoi l’école publique est-elle laïque ?','pour accueillir tous les élèves de la même façon',['pour interdire de réfléchir','pour séparer les élèves','pour punir'],'Elle ne favorise aucune religion.',2],
 ['Où voit-on souvent la devise de la République ?','sur les mairies et les écoles',['sur les voitures','sur les nuages','sur les paquets de gâteaux'],'Elle est inscrite sur les bâtiments publics.'],
 ['Un personnage qui symbolise la République est…','Marianne',['le Père Noël','Astérix','la fée Clochette'],'Marianne figure sur les mairies et les timbres.',2],
 {tf:'Une fille et un garçon ont les mêmes droits à l’école.',v:true,e:'C’est l’égalité.'},
 {tf:'Se moquer de la religion d’un camarade est permis.',v:false,e:'On respecte les croyances de chacun.'},
 {tf:'La laïcité interdit à quelqu’un d’avoir une religion.',v:false,e:'Elle protège la liberté de croire ou non.'},
 {t:'Complète : « Liberté, …, Fraternité » (un mot avec accent)',a:['égalité','egalite'],e:'Liberté, Égalité, Fraternité.',d:2},
 ['Aider un camarade qui est tombé, c’est un exemple de…','fraternité',['laïcité','égoïsme','discrimination'],'La fraternité, c’est l’entraide.'],
 ['La Charte de la laïcité est affichée…','dans les écoles',['sur la Lune','dans les forêts','dans les stades uniquement'],'Elle explique les règles de la laïcité à l’école.'],
 {o:['Liberté','Égalité','Fraternité'],q:'Remets dans l’ordre les mots de la devise :',e:'Liberté, Égalité, Fraternité.'}]});

/* ---------- Lot 2 vague 1 pédagogie (23/10/2026) : variété des exercices d'EMC au CE2 (bien commun) ---------- */
E('ce2-emc-bien-commun',{w:.85,items:[
 ['Quel est un bien commun ?','un parc public',['ta trousse','la chambre d’un camarade','ton goûter'],'Un bien commun appartient à tous.'],
 ['L’intérêt général, c’est…','ce qui est bon pour tout le monde',['ce qui est bon pour moi seul','ce que veut le plus fort','ce qu’on achète'],'Pas seulement pour soi.'],
 ['Jouer au ballon à tour de rôle dans la cour, c’est penser à…','l’intérêt général',['l’intérêt particulier seulement','la punition','l’ennui'],'Chacun a sa chance.',2],
 ['Pourquoi ne faut-il pas abîmer les livres de la bibliothèque ?','ils servent à tous',['ils sont à moi','ils ne coûtent rien','ils sont inutiles'],'Un bien commun se respecte.'],
 ['Prendre soin du bien commun, c’est…','le respecter et l’entretenir',['le casser','le cacher','le vendre'],'Tout le monde en profite.'],
 ['Ramasser un papier dans la cour est un geste…','pour le bien commun',['inutile','interdit','réservé aux adultes'],'On garde l’espace agréable.'],
 ['Qui doit respecter le bien commun ?','tout le monde',['seulement les enfants','seulement le maire','personne'],'C’est l’affaire de tous.'],
 ['L’eau potable de la commune est…','un bien précieux à ne pas gaspiller',['sans limite','sans valeur','réservée aux riches'],'On l’économise.',2],
 {tf:'Un banc dans un parc appartient à tous.',v:true,e:'C’est un bien commun.'},
 {tf:'Ce qui est « à tout le monde » n’est « à personne ».',v:false,e:'Chacun doit le respecter.',d:2},
 {tf:'L’intérêt particulier et l’intérêt général sont toujours identiques.',v:false,e:'Parfois, il faut renoncer à un avantage pour le bien de tous.',d:3},
 {t:'Complète : un parc, une école, une bibliothèque forment le bien … (un mot)',a:['commun'],e:'Le bien commun.'},
 {o:['Je vois un banc abîmé','J’en parle à un adulte','La commune le répare','Tout le monde peut s’asseoir'],q:'Remets dans l’ordre :',e:'On constate, on prévient, on répare, tous en profitent.',d:3}]});

/* ---------- Lot 2 vague 1 pédagogie (23/10/2026) : variété des exercices de français en CE2 ---------- */
E('ce2-fr-son-s',{w:.85,items:[
 ['Complète : un gar…on','ç',['c','s','ss'],'Devant o, on écrit ç : garçon.'],
 ['Complète : une for…e (la puissance)','c',['ç','ss','t'],'Devant e, c fait [s] : force.'],
 ['Complète : la ré…ussite','ss',['s','c','ç'],'Entre deux voyelles : ss pour le son [s] : réussite.'],
 ['Complète : une pa…erelle','ss',['s','c','ç'],'Passerelle : ss entre deux voyelles.'],
 ['Complète : le gla…on (de glace)','ç',['c','ss','s'],'Devant o : glaçon.'],
 {t:'Écris le mot : un animal qui vit dans l’eau, il a des écailles : un poi…on (avec le son [s])',a:['poisson'],e:'Poisson : ss entre deux voyelles.',d:2},
 {t:'Écris le mot : 3 + 4, c’est une … (un mot en -tion)',a:['addition'],e:'Addition : -tion se lit [sion].',d:3},
 {tf:'Entre deux voyelles, un seul s se prononce [z] (poison).',v:true,e:'Pour le son [s], on double : poisson.'},
 {tf:'On écrit ç devant e et i.',v:false,e:'ç s’écrit devant a, o, u. Devant e et i, on écrit c.'},
 {tf:'Dans « question », le t se prononce [s].',v:false,e:'Après un s, le t de -tion se prononce [t] : question.',d:2},
 ['Le mot « cirque » commence par…','c devant i : c',['ç','ss','s'],'Devant i : c.',2],
 ['Quel mot s’écrit avec un ç ?','façade',['facile','facette','face'],'Devant a : façade.',2]]});

E('ce2-fr-homophones-son-on',{w:.85,items:[
 ['Complète : « Mes sœurs … fatiguées. »','sont',['son','ont','on'],'On peut dire « étaient fatiguées » : sont.'],
 ['Complète : « Théo a perdu … stylo. »','son',['sont','ont','on'],'On peut dire « mon stylo » : son.'],
 ['Complète : « Ils … un chat. »','ont',['on','son','sont'],'On peut dire « ils avaient » : ont.'],
 ['Complète : « … mange à la cantine. »','On',['Ont','Son','Sont'],'On peut dire « il mange » : on.'],
 ['Complète : « Les enfants … de la chance. »','ont',['on','sont','son'],'Avaient de la chance : ont (avoir).'],
 ['Complète : « Elles … parties tôt. »','sont',['son','ont','on'],'Étaient parties : sont.'],
 ['Complète : « Léo prend … goûter. »','son',['sont','ont','on'],'Mon goûter : son.'],
 {t:'Écris le bon mot : « Ils … faim. » (ont / on)',a:['ont'],e:'Ils avaient faim : ont.'},
 {t:'Écris le bon mot : « … joue au ballon. » (on / ont)',a:['on'],e:'Il joue au ballon : on.'},
 {tf:'« Ils son contents » est correct.',v:false,e:'On écrit « Ils sont contents » (étaient contents).'},
 {tf:'« On peut remplacer ont par avaient. »',v:true,e:'C’est le test pour le verbe avoir.'},
 {tf:'« On » peut être remplacé par « il ».',v:true,e:'Test de on : « On joue » → « il joue ».'},
 {tf:'« Sont » est une forme du verbe avoir.',v:false,e:'Sont est une forme du verbe être.',d:2},
 ['Quel test permet de reconnaître « son » ?','remplacer par mon',['remplacer par avaient','remplacer par il','remplacer par étaient'],'Son vélo → mon vélo.',2],
 ['Quel test permet de reconnaître « ont » ?','remplacer par avaient',['remplacer par mon','remplacer par il','remplacer par étaient'],'Ils ont → ils avaient.',2]]});

E('ce2-fr-prefixes-suffixes',{w:.85,items:[
 ['Dans « refaire », le préfixe est…','re-',['fai-','-aire','-faire'],'re- signifie de nouveau.'],
 ['Dans « danseur », le suffixe est…','-eur',['dan-','-anse','-seur'],'Il désigne celui qui fait.'],
 ['Dans « impossible », le préfixe im- signifie…','pas, le contraire',['de nouveau','avant','petit'],'Impossible : pas possible.'],
 ['Que signifie le préfixe « pré- » dans « préhistoire » ?','avant',['après','pas','de nouveau'],'Avant l’histoire.',2],
 ['Que signifie le suffixe « -ette » dans « fillette » ?','petit',['grand','celui qui fait','l’action'],'Une petite fille.'],
 ['Quel mot contient le préfixe « dé- » (le contraire) ?','défaire',['dessert','dîner','dentiste'],'Le contraire de faire.',2],
 ['Quel mot est formé avec le suffixe « -age » (action) ?','lavage',['visage','village','courage'],'Lavage : action de laver.',3],
 ['Le contraire de « utile » est…','inutile',['imutile','dutile','unutile'],'On ajoute le préfixe in-.'],
 ['Le contraire de « possible » est…','impossible',['inpossible','dépossible','repossible'],'Devant p, in- devient im-.',2],
 ['Le radical du mot « lentement » est…','lent',['lentem','lenti','ment'],'On ajoute le suffixe -ment.',3],
 {t:'Écris le mot : le contraire de « poli » avec le préfixe im- ou in- : … (écris le mot)',a:['impoli'],e:'Impoli : im- devant p.',d:2},
 {t:'Écris le mot : « celui qui chante » avec le suffixe -eur ou -euse : une … (femme)',a:['chanteuse'],e:'Chanteuse.',d:2},
 {tf:'Le préfixe se place avant le radical.',v:true,e:'Le suffixe se place après.'},
 {tf:'Le suffixe se place au début du mot.',v:false,e:'Le suffixe se place à la fin.'},
 {tf:'« Redire » signifie dire de nouveau.',v:true,e:'re- = de nouveau.'}]});

E('ce2-fr-phrase',{w:.85,items:[
 ['Quelle phrase est interrogative ?','Viens-tu au parc ?',['Viens au parc.','Je viens au parc.','Viens vite au parc !'],'Elle pose une question.'],
 ['Quelle phrase est impérative ?','Range ta chambre.',['Tu ranges ta chambre.','Ranges-tu ta chambre ?','Elle range sa chambre.'],'Elle donne un ordre.'],
 ['Quelle phrase est déclarative ?','Le chat dort sur le canapé.',['Où dort le chat ?','Dors, petit chat !','Le chat dort-il ?'],'Elle donne une information.'],
 ['Quelle phrase est à la forme négative ?','Il ne pleut pas.',['Il pleut.','Pleut-il ?','Il pleut beaucoup.'],'ne … pas encadre le verbe.'],
 ['Mets à la forme négative : « Tom aime les épinards. »','Tom n’aime pas les épinards.',['Tom aime pas les épinards.','Tom ne aime pas les épinards.','Tom pas aime les épinards.'],'Devant une voyelle, ne devient n’.',2],
 ['Quel signe de ponctuation termine une phrase interrogative ?','le point d’interrogation',['le point','le point d’exclamation','la virgule'],'?'],
 ['Dans un dialogue, le tiret sert à…','montrer qu’une autre personne parle',['terminer la phrase','poser une question','faire une liste'],'Un tiret = un nouveau locuteur.'],
 ['Dans « « Viens ! » cria Léa. », « cria Léa » est…','l’incise (qui parle)',['la phrase de Léa','une question','un titre'],'On indique qui parle.',3],
 ['Quel mot ne s’oublie jamais dans une négation écrite ?','ne',['pas','jamais','plus'],'On écrit toujours le ne (ou n’).',2],
 {tf:'« Ne cours pas ! » est une phrase impérative négative.',v:true,e:'C’est un ordre à la forme négative.'},
 {tf:'Une phrase impérative se termine toujours par un point d’interrogation.',v:false,e:'Elle se termine par un point ou un point d’exclamation.'},
 {tf:'« Est-ce que tu viens ? » est une phrase interrogative.',v:true,e:'On pose une question.'},
 {t:'Écris le mot qui manque : Il ne mange … de pain. (négation : ne … pas)',a:['pas'],e:'Il ne mange pas de pain.'},
 {t:'Écris le mot qui manque dans la négation : Il … joue plus.',a:['ne'],e:'ne … plus.',d:2}]});

E('ce2-fr-constituants',{w:.85,items:[
 ['Dans « Léa chante », le sujet est…','Léa',['chante','Léa chante','il'],'Qui est-ce qui chante ? Léa.'],
 ['Dans « Le chien aboie », le verbe est…','aboie',['chien','le','le chien'],'Le verbe indique l’action.'],
 ['Dans « Hier, Tom a mangé une pomme. », quel groupe peut être déplacé ?','Hier',['Tom','a mangé','une pomme obligatoirement'],'Le complément de phrase peut être déplacé : Tom a mangé une pomme hier.',2],
 ['Pour trouver le sujet, je pose la question…','Qui est-ce qui … ?',['Où … ?','Quand … ?','Pourquoi … ?'],'Qui est-ce qui + verbe ?'],
 ['Le sujet peut être remplacé par…','un pronom (il, elle, ils, elles)',['un adjectif','un adverbe','un nombre'],'Le chat → il.'],
 ['Le verbe est le mot qui…','change quand on change de temps',['ne change jamais','désigne un objet','est toujours un nom'],'Hier, il mangeait ; demain, il mangera.',2],
 ['Dans « Les enfants jouent dans le jardin. », « dans le jardin » est…','un complément qu’on peut supprimer',['le sujet','le verbe','obligatoire'],'Les enfants jouent. La phrase reste correcte.',2],
 {tf:'Le sujet est toujours le premier mot de la phrase.',v:false,e:'Il peut venir après un complément de phrase.',d:2},
 {tf:'On peut remplacer « les enfants » par « ils ».',v:true,e:'C’est un pronom sujet.'},
 {tf:'Le verbe se supprime sans changer la phrase.',v:false,e:'Le verbe est indispensable.'},
 {tf:'« Chaque matin » peut être déplacé dans la phrase.',v:true,e:'Chaque matin, Léo prend le bus / Léo prend le bus chaque matin.',d:2},
 {t:'Écris le sujet : « Au zoo, les enfants observent les girafes. » (2 mots)',a:['les enfants','Les enfants'],e:'Qui est-ce qui observe ? Les enfants.',d:2},
 {t:'Écris le verbe : « Mon frère mange une orange. »',a:['mange'],e:'Le verbe est mange.'}]});

E('ce2-fr-pluriels-feminins',{w:.85,items:[
 ['Pluriel de « un animal »','des animaux',['des animals','des animales','des animeaux'],'-al devient -aux.'],
 ['Pluriel de « un bateau »','des bateaux',['des bateaus','des batals','des bateau'],'-eau prend un x.'],
 ['Pluriel de « un neveu »','des neveux',['des neveus','des nevaux','des neveuxs'],'-eu prend généralement un x.',2],
 ['Pluriel de « un bijou »','des bijoux',['des bijous','des bijoues','des bijoos'],'Un des sept mots en -ou qui prennent x.',2],
 ['Pluriel de « un clou »','des clous',['des cloux','des clouxs','des cloues'],'Clou prend un s.',2],
 ['Pluriel de « un pneu »','des pneus',['des pneux','des pneuxs','des pneaux'],'Exception : pneu prend un s.',3],
 ['Féminin de « un danseur »','une danseuse',['une danseure','une danseuxe','une danseur'],'-eur → -euse.'],
 ['Féminin de « un acteur »','une actrice',['une acteuse','une acteure','une actère'],'-teur → -trice.',2],
 ['Féminin de « un boulanger »','une boulangère',['une boulangeuse','une boulanger','une boulangerie'],'-er → -ère.',2],
 ['Féminin de « joyeux »','joyeuse',['joyeuxe','joyeure','joyeuze'],'-eux → -euse.'],
 ['Féminin de « sportif »','sportive',['sportife','sportiveuse','sportif'],'-f → -ve.',2],
 {t:'Écris le pluriel : un cheval → des …',a:['chevaux'],e:'-al → -aux.',d:2},
 {t:'Écris le pluriel : un gâteau → des …',a:['gâteaux','gateaux'],e:'-eau → -eaux.'},
 {tf:'Le pluriel de « un festival » est « des festivals ».',v:true,e:'Exception : festival, bal, carnaval prennent un s.',d:3},
 {tf:'Le pluriel de « un cheval » est « des chevals ».',v:false,e:'Des chevaux.'}]});

/* ---------- Lot 2 vague 1 pédagogie (23/10/2026) : variété des exercices de mathématiques en CE2 ---------- */
E('ce2-ma-solides',{w:.85,items:[
 ['Une face d’un solide est…','une surface plane de ce solide',['un coin du solide','un segment du solide','un trou'],'Un cube a 6 faces.'],
 ['Une arête est…','le segment où deux faces se rejoignent',['un coin','une face','un angle droit'],'Un cube a 12 arêtes.'],
 ['Un sommet est…','le point où se rejoignent plusieurs arêtes',['une face','un côté','un segment'],'Un cube a 8 sommets.'],
 ['Un cube a…','6 faces carrées',['4 faces carrées','8 faces carrées','6 faces triangulaires'],'Toutes ses faces sont des carrés égaux.'],
 ['Les faces d’un pavé droit sont des…','rectangles',['triangles','cercles','losanges'],'Un pavé a 6 faces rectangulaires.'],
 ['Un cube est un pavé droit particulier car…','toutes ses faces sont des carrés',['il a plus de faces','il a des faces triangulaires','il est rond'],'Un cube est un pavé dont les 6 faces sont des carrés.',3],
 ['La boule a…','aucune arête et aucun sommet',['12 arêtes','8 sommets','6 faces carrées'],'Elle n’a qu’une surface courbe.',2],
 ['Un cône a…','un sommet et une face plane en forme de disque',['6 faces','12 arêtes','8 sommets'],'Il a une surface courbe.',2],
 ['Une boîte de mouchoirs a souvent la forme…','d’un pavé droit',['d’une boule','d’un cône','d’un cylindre'],'Boîte rectangulaire.'],
 ['Un ballon de football est assimilé à…','une boule',['un cube','une pyramide','un cylindre'],'Solide sans arête.'],
 ['Un chapeau de clown a la forme d’un…','cône',['cylindre','cube','pavé'],'Pointu avec une base ronde.'],
 {n:'Combien de sommets a un cube ?',a:8,e:'8 sommets.'},
 {n:'Combien de faces triangulaires a une pyramide à base carrée ?',a:4,e:'4 triangles et 1 carré.',d:2},
 {n:'Combien de faces a une pyramide à base carrée ?',a:5,e:'4 triangles et 1 carré.',d:2},
 {tf:'Un cylindre a deux faces planes en forme de disques.',v:true,e:'Et une surface courbe.'},
 {tf:'Un pavé droit a 6 faces carrées obligatoirement.',v:false,e:'Ses faces sont des rectangles, pas forcément des carrés.',d:2},
 {tf:'Un patron de cube est formé de 6 carrés identiques correctement assemblés.',v:true,e:'La disposition compte.',d:2}]});

/* ---------- Lot 3 vague 1 pédagogie (23/10/2026) : variété des exercices de Questionner le monde au CE2 ---------- */
E('ce2-qm-classer-vivant',{w:.6,items:[
 ['Un vertébré est un animal qui a…','une colonne vertébrale',['six pattes','une coquille seulement','huit pattes'],'Squelette interne.'],
 ['Un invertébré est un animal qui…','n’a pas de colonne vertébrale',['a des plumes','a des poils','a des écailles'],'Insectes, araignées, escargots…'],
 ['Le chien est…','un mammifère',['un oiseau','un poisson','un insecte'],'Poils et mamelles.'],
 ['L’aigle est…','un oiseau',['un mammifère','un reptile','un insecte'],'Plumes et bec.'],
 ['Le saumon est…','un poisson',['un mammifère','un oiseau','un reptile'],'Écailles et nageoires.'],
 ['Le serpent est…','un reptile',['un amphibien','un mammifère','un oiseau'],'Peau couverte d’écailles.',2],
 ['La grenouille est…','un amphibien',['un reptile','un poisson','un mammifère'],'Peau nue, métamorphose.',2],
 ['Le papillon est…','un insecte',['un oiseau','une araignée','un mammifère'],'Six pattes.'],
 ['Le dauphin est…','un mammifère',['un poisson','un reptile','un oiseau'],'Il respire de l’air et allaite ses petits.',2],
 {tf:'Une araignée est un insecte.',v:false,e:'Elle a 8 pattes.'},
 {tf:'La chauve-souris est un mammifère.',v:true,e:'Poils et allaitement.',d:2},
 {tf:'Un animal qui vole est forcément un oiseau.',v:false,e:'Une chauve-souris et un insecte volent aussi.',d:2},
 {n:'Combien de pattes a un insecte ?',a:6,e:'Six.'}]});

E('ce2-qm-reproduction',{w:.6,items:[
 ['Les abeilles transportent…','le pollen',['les fruits','les racines','les feuilles'],'Pollinisation.'],
 ['La fleur se transforme en…','fruit',['racine','feuille','tige'],'Le fruit contient les graines.'],
 ['Les graines peuvent être dispersées par…','le vent, l’eau ou les animaux',['la Lune','les nuages','les pierres'],'Dispersion.'],
 ['Le fraisier peut se reproduire grâce à…','un stolon',['un œuf','un cône','une feuille morte'],'Sans graines.',3],
 ['La tulipe se reproduit aussi grâce à…','un bulbe',['un œuf','un stolon','une tige creuse'],'Sans graines.',3],
 ['Un animal ovipare…','pond des œufs',['met au monde des petits vivants','ne se reproduit pas','vit toujours dans l’eau'],'Ovipare.'],
 ['Un animal vivipare…','met au monde des petits vivants',['pond des œufs','ne se reproduit pas','vit dans un nid'],'Vivipare.'],
 ['Pour se reproduire, les animaux ont besoin…','d’un mâle et d’une femelle',['d’une graine','d’un pot','de pollen'],'Reproduction sexuée.'],
 {o:['la graine','la plante','la fleur','le fruit'],q:'Remets le cycle d’une plante à fleurs dans l’ordre :',e:'Graine, plante, fleur, fruit.'},
 {tf:'Le fruit contient les graines.',v:true,e:'Souvent.'},
 {tf:'Le chat pond des œufs.',v:false,e:'Le chat est vivipare.'},
 {tf:'Les poules sont ovipares.',v:true,e:'Elles pondent des œufs.'}]});

E('ce2-qm-chaines',{w:.6,items:[
 ['Les végétaux sont des producteurs car ils…','fabriquent leur nourriture avec la lumière',['mangent des animaux','chassent','dorment'],'Ils sont à la base de la chaîne.'],
 ['Les animaux sont des…','consommateurs',['producteurs','décorations','pierres'],'Ils mangent d’autres êtres vivants.'],
 ['Une chaîne alimentaire commence par…','un végétal',['un carnivore','un champignon seulement','un humain'],'Toujours un végétal.'],
 ['Dans « algue → têtard → libellule », la libellule…','mange le têtard',['est mangée par le têtard','mange l’algue','ne mange rien'],'La flèche veut dire « est mangé par ».',2],
 ['Si on supprime les herbivores d’un milieu, les carnivores…','manquent de nourriture',['mangent plus','grossissent','disparaissent de la photo'],'Le maillon manque.',2],
 ['Un milieu de vie est…','l’endroit où vit un être vivant',['un jouet','un vêtement','un repas'],'Forêt, mare, prairie.'],
 ['Qui vit dans une mare ?','la grenouille',['le chameau','le lion','le renne'],'Milieu aquatique.'],
 ['Qui vit dans la forêt ?','le sanglier',['le dauphin','le requin','le pingouin'],'Il vit dans les bois.',2],
 {tf:'La flèche d’une chaîne alimentaire signifie « mange ».',v:false,e:'Elle signifie « est mangé par ».'},
 {tf:'Si un maillon disparaît, la chaîne est perturbée.',v:true,e:'Tous les maillons dépendent les uns des autres.'},
 {o:['l’herbe','le lapin','le renard'],q:'Remets la chaîne alimentaire dans l’ordre :',e:'L’herbe est mangée par le lapin, puis par le renard.'}]});

E('ce2-qm-corps-mouvement',{w:.6,items:[
 ['Pour bouger, le corps utilise…','les os, les muscles et les articulations',['seulement les cheveux','seulement la peau','seulement le sang'],'Trois éléments.'],
 ['Les muscles…','se contractent pour tirer sur les os',['poussent les os','sont des os','sont des nerfs'],'Ils tirent, ils ne poussent pas.'],
 ['Le crâne protège…','le cerveau',['le cœur','les poumons','l’estomac'],'Dans la tête.'],
 ['Les côtes protègent…','le cœur et les poumons',['le cerveau','les genoux','les mains'],'Dans le thorax.'],
 ['Quand je plie le bras, le biceps…','se contracte',['se relâche toujours','disparaît','devient un os'],'Le muscle devant gonfle.',2],
 ['Le coude est…','une articulation',['un muscle','un os long','un nerf'],'Il plie le bras.'],
 ['Le squelette sert à…','tenir le corps et protéger des organes',['digérer','respirer','voir'],'Les os.'],
 {tf:'Les muscles poussent sur les os.',v:false,e:'Ils tirent.'},
 {tf:'Une articulation permet de plier ou de tourner un os.',v:true,e:'Coude, genou, épaule…'},
 {tf:'Sans muscles, les os bougent seuls.',v:false,e:'Ils ont besoin des muscles pour bouger.',d:2}]});

E('ce2-qm-matiere',{w:.6,items:[
 ['L’air est de la matière car il…','occupe de la place et a une masse',['est invisible','est froid','est bleu'],'On peut le montrer.'],
 ['Un ballon gonflé est plus lourd qu’un ballon dégonflé car…','l’air a une masse',['le ballon change de couleur','il est plus beau','l’air est léger comme le vide'],'L’air pèse un peu.',2],
 ['Le vent est…','de l’air en mouvement',['de l’eau','de la lumière','de la poussière seulement'],'L’air peut pousser.'],
 ['Le sucre dans l’eau…','se dissout',['reste en morceaux','devient une pierre','flotte toujours'],'On ne le voit plus.'],
 ['Le sable dans l’eau…','ne se dissout pas',['se dissout','disparaît','devient liquide'],'Il se dépose.'],
 ['L’huile dans l’eau…','ne se mélange pas',['se dissout','disparaît','devient du sel'],'Elle flotte.'],
 ['Pour séparer du sable et de l’eau, on peut…','filtrer',['chauffer l’air','secouer le sable','refroidir le sable'],'Filtre.'],
 ['Un verre retourné dans l’eau ne se remplit pas car…','il contient de l’air',['l’eau est trop lourde','le verre est interdit','le verre est vide'],'L’air prend la place.',2],
 {tf:'Le sel se dissout dans l’eau.',v:true,e:'On ne le voit plus.'},
 {tf:'L’air n’existe pas parce qu’on ne le voit pas.',v:false,e:'L’air est invisible mais bien réel.'},
 {tf:'L’air pousse les voiles d’un bateau.',v:true,e:'Le vent est de l’air en mouvement.'}]});

E('ce2-qm-periodes',{w:.6,items:[
 ['La Préhistoire va des premiers humains jusqu’à…','l’invention de l’écriture',['la Révolution','Napoléon','la voiture'],'Vers 3 000 av. J.-C.'],
 ['L’Antiquité se termine en…','476',['1492','1789','1914'],'Fin de l’Empire romain d’Occident.'],
 ['Le Moyen Âge commence en…','476',['1492','1789','3000 av. J.-C.'],'476.'],
 ['Les Temps modernes vont de…','1492 à 1789',['476 à 1492','1789 à aujourd’hui','3000 av. J.-C. à 476'],'Colomb à la Révolution.'],
 ['L’époque contemporaine commence en…','1789',['476','1492','1914'],'Révolution française.'],
 ['L’an 1515 est au…','XVIe siècle',['XVe siècle','XIVe siècle','XVIIe siècle'],'1501 à 1600.',2],
 ['Le Ier siècle va de…','l’an 1 à l’an 100',['l’an 100 à l’an 200','l’an 0 à l’an 10','1000 à 1100'],'Premier siècle.',2],
 ['Un château fort avec des chevaliers appartient à…','le Moyen Âge',['la Préhistoire','l’Antiquité','l’époque contemporaine'],'Moyen Âge.'],
 ['Les pyramides d’Égypte appartiennent à…','l’Antiquité',['la Préhistoire','le Moyen Âge','l’époque contemporaine'],'Antiquité.',2],
 {tf:'La Révolution française est un événement de 1789.',v:true,e:'1789.'},
 {tf:'Les dinosaures vivaient pendant la Préhistoire.',v:false,e:'Ils ont disparu bien avant l’apparition de l’humain.',d:3},
 {o:['La Préhistoire','L’Antiquité','Le Moyen Âge','Les Temps modernes'],q:'Remets les périodes dans l’ordre :',e:'Préhistoire, Antiquité, Moyen Âge, Temps modernes.'}]});

E('ce2-qm-modes-vie',{w:.6,items:[
 ['Avant la voiture, on se déplaçait en…','diligence ou à cheval',['avion','fusée','tram électrique'],'Autrefois.'],
 ['Pour s’éclairer autrefois, on utilisait…','une bougie ou une lampe à pétrole',['une ampoule LED','un smartphone','un lampadaire électrique'],'Avant l’électricité.'],
 ['L’ordre de la communication à distance est…','lettre, télégraphe, téléphone, Internet',['Internet, téléphone, télégraphe, lettre','téléphone, lettre, Internet, télégraphe','télégraphe, Internet, lettre, téléphone'],'Du plus ancien au plus récent.',2],
 ['À l’école d’autrefois, on écrivait avec…','une plume et de l’encre',['un ordinateur','une tablette','un clavier'],'Plume et encrier.'],
 ['Aujourd’hui, on peut communiquer rapidement grâce à…','Internet',['la plume','la diligence','la lampe à pétrole'],'Messages instantanés.'],
 ['Le train à vapeur est apparu…','avant l’avion',['après l’avion','en même temps que la voiture électrique','avant la roue'],'XIXe siècle.',2],
 {tf:'Autrefois, tout le monde avait un téléphone portable.',v:false,e:'Les portables sont récents.'},
 {tf:'Les modes de vie changent avec le temps.',v:true,e:'Logement, transport, communication.'},
 {tf:'Autrefois n’était pas forcément moins bien en tout.',v:true,e:'Il y avait d’autres avantages et d’autres difficultés.',d:3},
 {o:['bougie','lampe à pétrole','ampoule électrique'],q:'Remets ces moyens d’éclairage dans l’ordre du plus ancien au plus récent :',e:'Bougie, lampe à pétrole, ampoule électrique.'}]});

E('ce2-qm-france-europe',{w:.6,items:[
 ['Quel pays est voisin de la France ?','l’Espagne',['le Japon','le Brésil','l’Australie'],'Au sud-ouest.'],
 ['Quel pays est voisin de la France ?','la Belgique',['la Pologne','la Grèce','la Norvège'],'Au nord.'],
 ['Quel pays est voisin de la France ?','l’Italie',['la Suède','le Portugal','l’Autriche'],'Au sud-est.',2],
 ['Quel fleuve passe à Nantes ?','la Loire',['la Seine','le Rhône','la Garonne'],'Loire.'],
 ['Quel fleuve passe à Bordeaux ?','la Garonne',['la Loire','la Seine','le Rhône'],'Garonne.',2],
 ['Quel fleuve passe à Lyon ?','le Rhône',['la Loire','la Seine','la Garonne'],'Rhône (et la Saône).',2],
 ['Quel fleuve passe à Strasbourg ?','le Rhin',['la Seine','la Loire','la Garonne'],'Rhin.',3],
 ['Quelle mer sépare la France du Royaume-Uni ?','la Manche',['la Méditerranée','l’océan Indien','la mer Rouge'],'La Manche.'],
 ['Le tunnel sous la Manche relie la France…','au Royaume-Uni',['à l’Espagne','à l’Italie','à l’Allemagne'],'Il passe sous la Manche.'],
 {tf:'La France fait partie de l’Europe.',v:true,e:'Continent européen.'},
 {tf:'Paris est en Italie.',v:false,e:'Paris est la capitale de la France.'},
 {tf:'La Suisse est voisine de la France.',v:true,e:'Elle est à l’est.',d:2}]});
})();
