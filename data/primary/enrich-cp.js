/* MathQuest — CP : enrichissement V8.13 (variété des questions + activités hors écran).
   Programmes : français et mathématiques 2024 (BO n°41 du 31/10/2024) ; sciences, histoire-géographie et EPS 2026 ;
   EMC 2024 ; EVAR 2025 (BO n°6 du 06/02/2025) ; arts plastiques et éducation musicale 2020.
   Les activités « hors écran » ne sont pas évaluées par l'application : l'enfant les réalise avec un adulte et s'auto-évalue. */
(function(){
'use strict';
const MQ=window.MQPrimary;if(!MQ)return;const E=MQ.enrich;const T=(t,h)=>({t,h});
const HE=(icon,titre,{but,consigne,duree,materiel,securite,auto})=>T(`${icon} ${titre}`,`<p><b>Pourquoi ?</b> ${but}</p><p><b>Ce que tu fais :</b> ${consigne}</p><p><b>Durée :</b> ${duree}${materiel?` · <b>Matériel :</b> ${materiel}`:''}</p>${securite?`<p><b>Sécurité :</b> ${securite}</p>`:''}<p><b>Je me regarde faire :</b> ${auto}</p><p><small>Cette activité se fait sans écran, avec un adulte. L’application ne la note pas.</small></p>`);

/* ---------- Français ---------- */
E('cp-fr-phrase',{items:[
 ['Quelle phrase est bien écrite ?','Le chat dort.',['le chat dort.','Le chat dort','le chat dort'],'Une phrase commence par une majuscule et finit par un point.'],
 ['Quelle phrase pose une question ?','Où est mon sac ?',['Mon sac est là.','Quel beau sac !','Prends ton sac.'],'Une question finit par un point d’interrogation « ? ».'],
 ['Quel signe met-on à la fin de « Tu viens jouer » pour poser une question ?','?',['.','!',','],'On pose une question : on met « ? ».'],
 ['Quel signe met-on à la fin de « Bravo » pour montrer la joie ?','!',['?','.',','],'On s’exclame : on met « ! ».'],
 ['Combien de mots dans « Léo mange une pomme. » ?','4',['3','5','6'],'Léo / mange / une / pomme : 4 mots.'],
 ['Combien de mots dans « Le petit chien court. » ?','4',['3','5','2'],'Le / petit / chien / court : 4 mots.'],
 ['Quelle phrase a du sens ?','Maman lit un livre.',['Livre un lit maman.','Lit maman un livre.','Un maman livre lit.'],'Les mots sont dans le bon ordre : la phrase veut dire quelque chose.'],
 {o:['Le','chat','boit','du','lait.'],q:'Remets les mots dans l’ordre pour faire une phrase :',e:'Le chat boit du lait.'},
 {o:['Tom','joue','au','ballon.'],q:'Remets les mots dans l’ordre pour faire une phrase :',e:'Tom joue au ballon.'},
 {o:['La','fleur','est','rouge.'],q:'Remets les mots dans l’ordre pour faire une phrase :',e:'La fleur est rouge.'},
 ['Par quoi commence une phrase ?','une majuscule',['un point','une virgule','un chiffre'],'Une phrase commence toujours par une majuscule.'],
 ['Quel mot doit avoir une majuscule dans « nous allons à paris. » ?','paris (et nous, au début)',['allons','à','le point'],'Le nom d’une ville prend une majuscule : Paris. Le premier mot aussi : Nous.',2]]});

/* ---------- Mathématiques ---------- */
E('cp-ma-longueurs',{items:[
 ['Quel objet est le plus long ?','une règle de 30 cm',['une gomme','un trombone','une perle'],'La règle mesure 30 cm : c’est le plus long.'],
 ['Avec quoi mesure-t-on la longueur d’un trait ?','une règle',['une balance','une horloge','un thermomètre'],'La règle sert à mesurer les longueurs.'],
 ['Où place-t-on le 0 de la règle ?','au début du trait',['au milieu du trait','à la fin du trait','n’importe où'],'On met le 0 au début du trait, puis on lit à la fin.'],
 {n:'Un crayon mesure 12 cm, un autre 9 cm. Combien de centimètres de plus pour le premier ?',a:3,u:'cm',e:'12 − 9 = 3 cm.'},
 {n:'Un trait de 5 cm et un trait de 4 cm mis bout à bout : combien de centimètres en tout ?',a:9,u:'cm',e:'5 + 4 = 9 cm.'},
 {n:'Un ruban mesure 10 cm. On en coupe 3 cm. Combien reste-t-il ?',a:7,u:'cm',e:'10 − 3 = 7 cm.'},
 ['Quel est le plus court ?','un trait de 2 cm',['un trait de 8 cm','un trait de 5 cm','un trait de 10 cm'],'2 cm est la plus petite longueur.'],
 ['Pour comparer deux crayons, je les pose…','côte à côte, au même départ',['l’un sur l’autre en croix','loin l’un de l’autre','debout'],'On aligne les deux bouts du même côté pour comparer.']]});
E('cp-ma-masses',{items:[
 ['Qu’est-ce qui est le plus lourd ?','un cartable plein',['une plume','une feuille','un ballon de baudruche'],'Un cartable plein pèse beaucoup plus lourd.'],
 ['Qu’est-ce qui est le plus léger ?','une plume',['un livre','une bouteille d’eau','une chaise'],'La plume est très légère.'],
 ['Sur une balance, le plateau qui descend porte…','l’objet le plus lourd',['l’objet le plus léger','l’objet le plus grand','rien'],'Le plateau le plus bas porte le plus lourd.'],
 ['Les deux plateaux sont à la même hauteur. Les objets…','ont la même masse',['sont de la même couleur','sont de la même taille','sont cassés'],'Plateaux égaux : même masse.'],
 ['Avec quoi compare-t-on des masses ?','une balance',['une règle','un sablier','une loupe'],'La balance sert à peser.'],
 {tf:'Un gros ballon est toujours plus lourd qu’une petite bille en fer.',v:false,e:'Gros ne veut pas dire lourd : la bille en fer peut être plus lourde.'},
 {o:['une fourmi','une pomme','un chien'],q:'Range du plus léger au plus lourd :',e:'une fourmi &lt; une pomme &lt; un chien'},
 {o:['un crayon','un livre','un vélo'],q:'Range du plus léger au plus lourd :',e:'un crayon &lt; un livre &lt; un vélo'}]});
E('cp-ma-heure',{items:[
 ['La petite aiguille montre…','les heures',['les minutes','les jours','les secondes'],'La petite aiguille indique l’heure.'],
 ['La grande aiguille est sur le 12. Il est…','une heure pile',['une heure et demie','midi et quart','on ne sait pas'],'Grande aiguille sur 12 : heure pile.'],
 {n:'La petite aiguille est sur le 3 et la grande sur le 12. Quelle heure est-il ? (écris le nombre d’heures)',a:3,u:'h',e:'Il est 3 heures.'},
 {n:'La petite aiguille est sur le 8 et la grande sur le 12. Quelle heure est-il ?',a:8,u:'h',e:'Il est 8 heures.'},
 {n:'Il est 2 heures. Quelle heure sera-t-il dans 1 heure ?',a:3,u:'h',e:'2 + 1 = 3 heures.'},
 {n:'Il est 9 heures. Quelle heure était-il il y a 1 heure ?',a:8,u:'h',e:'9 − 1 = 8 heures.'},
 ['À quelle heure prend-on souvent le déjeuner à la cantine ?','vers midi',['vers minuit','vers 3 heures du matin','vers 6 heures du matin'],'On déjeune vers midi (12 heures).'],
 ['Combien d’heures dans une journée entière (jour et nuit) ?','24',['12','10','60'],'Une journée dure 24 heures.',2]]});
E('cp-ma-figures',{items:[
 ['Quelle figure a 3 côtés ?','le triangle',['le carré','le rectangle','le cercle'],'Le triangle a 3 côtés.'],
 ['Quelle figure n’a pas de côté droit ?','le cercle',['le carré','le triangle','le rectangle'],'Le cercle est tout rond.'],
 ['Quelle figure a 4 côtés de la même longueur ?','le carré',['le rectangle','le triangle','le cercle'],'Le carré a 4 côtés égaux.'],
 {n:'Combien de côtés a un rectangle ?',a:4,e:'Un rectangle a 4 côtés.'},
 {n:'Combien de sommets (coins) a un triangle ?',a:3,e:'Un triangle a 3 sommets.'},
 {n:'Combien de sommets a un carré ?',a:4,e:'Un carré a 4 sommets.'},
 ['Une roue a la forme d’un…','cercle',['carré','triangle','rectangle'],'Une roue est ronde.'],
 ['Une porte a souvent la forme d’un…','rectangle',['cercle','triangle','losange'],'La porte a 4 côtés : 2 longs et 2 courts.'],
 ['Une part de pizza ressemble souvent à un…','triangle',['carré','cercle','rectangle'],'Une part pointue ressemble à un triangle.'],
 ['Avec quel outil trace-t-on un trait bien droit ?','une règle',['une gomme','un compas','un taille-crayon'],'On trace un trait droit avec une règle.']]});
E('cp-ma-solides',{items:[
 ['Quel solide roule partout ?','la boule',['le cube','le pavé','la pyramide'],'La boule est ronde de tous les côtés.'],
 ['Un dé à jouer a la forme d’un…','cube',['boule','cylindre','cône'],'Le dé est un cube.'],
 ['Une boîte de conserve a la forme d’un…','cylindre',['cube','pavé','boule'],'Elle est ronde dessus et dessous : c’est un cylindre.'],
 ['Une boîte à chaussures a la forme d’un…','pavé',['boule','cône','cylindre'],'Ses faces sont des rectangles : c’est un pavé.'],
 ['Un cornet de glace a la forme d’un…','cône',['cube','pavé','cylindre'],'Le cornet est pointu : c’est un cône.'],
 {n:'Combien de faces a un cube ?',a:6,e:'Le cube a 6 faces carrées.'},
 ['Quel solide peut rouler d’un seul côté et tenir debout ?','le cylindre',['la boule','le cube','le pavé'],'Le cylindre roule sur le côté et tient debout sur sa face plate.'],
 ['Une figure (carré, cercle) est plate. Un solide…','a du volume, on peut le prendre en main',['est toujours rond','est dessiné sur une feuille','n’a pas de face'],'Un solide occupe de la place : on peut le toucher.'],
 ['Une balle de tennis a la forme d’une…','boule',['cube','cylindre','pyramide'],'Elle est ronde partout : c’est une boule.'],
 ['Quelle face voit-on sur un cube ?','un carré',['un cercle','un triangle','un rond'],'Chaque face du cube est un carré.']]});

/* ---------- Sciences ---------- */
E('cp-sc-environnement',{items:[
 ['Combien de pattes a une fourmi ?','6',['8','4','2'],'La fourmi est un insecte : 6 pattes.'],
 ['Combien de pattes a une araignée ?','8',['6','4','10'],'L’araignée a 8 pattes : ce n’est pas un insecte.'],
 ['Où vit le ver de terre ?','dans la terre',['dans les arbres','dans la mer','dans le ciel'],'Le ver de terre vit dans le sol.'],
 ['Où le poisson vit-il ?','dans l’eau',['dans la terre','dans un nid','dans un terrier'],'Le poisson vit dans l’eau.'],
 ['Lequel est un être vivant ?','un arbre',['un caillou','une chaise','un nuage'],'L’arbre naît, grandit, se nourrit : il est vivant.'],
 ['Lequel n’est pas vivant ?','un caillou',['un oiseau','une fleur','un escargot'],'Le caillou ne grandit pas et ne se nourrit pas.'],
 ['Où l’oiseau fait-il souvent son nid ?','dans un arbre',['sous l’eau','dans un trou de rocher sous la mer','dans le sable de la mer'],'Beaucoup d’oiseaux nichent dans les arbres.']]});
E('cp-sc-proteger',{items:[
 ['Pour économiser l’eau, je…','ferme le robinet pendant que je me brosse les dents',['laisse couler l’eau','prends des bains très longs','joue avec le tuyau'],'Fermer le robinet évite de gaspiller l’eau.'],
 ['Une bouteille en plastique vide va…','dans la poubelle de tri',['par terre','dans la rivière','dans le jardin'],'On la trie pour qu’elle soit recyclée.'],
 ['Pour économiser l’électricité, je…','éteins la lumière en sortant',['laisse tout allumé','ouvre le frigo longtemps','allume la télé sans la regarder'],'Éteindre la lumière économise l’électricité.'],
 ['Dans la forêt, je…','respecte les plantes et les animaux',['arrache les fleurs','fais du bruit pour faire fuir les animaux','jette mes papiers'],'On protège la nature.'],
 ['Les épluchures de légumes peuvent aller…','au compost',['dans la rivière','dans le jardin du voisin','dans la poubelle à verre'],'Le compost transforme les épluchures en terre.'],
 ['Un papier tombé par terre dans la cour, je…','le ramasse et le jette à la poubelle',['le laisse','le cache','le donne à un copain'],'On garde l’école propre.'],
 {tf:'On peut donner une seconde vie à un vieux jouet en le donnant.',v:true,e:'Donner ou réparer évite de jeter.'},
 ['Le verre (bocaux, bouteilles) va…','dans le conteneur à verre',['au compost','dans la nature','dans les toilettes'],'Le verre se recycle à l’infini.'],
 ['Pour aller à l’école, ce qui pollue le moins, c’est…','marcher ou faire du vélo',['prendre la voiture seul','prendre l’avion','prendre un camion'],'Marcher et pédaler ne polluent pas.']]});
E('cp-sc-eau-etats',{items:[
 ['La neige, c’est de l’eau…','solide',['liquide','qui coule','chaude'],'La neige est de l’eau solide.'],
 ['La pluie, c’est de l’eau…','liquide',['solide','en glaçon','en neige'],'La pluie coule : elle est liquide.'],
 ['Un glaçon au soleil…','fond et devient de l’eau liquide',['devient plus gros','reste toujours solide','devient du sable'],'La chaleur fait fondre la glace.'],
 ['De l’eau dans le congélateur…','devient de la glace',['devient chaude','disparaît','devient du lait'],'Au froid, l’eau gèle.'],
 ['La grêle, c’est…','de la glace qui tombe du ciel',['du sable','de la pluie chaude','de la fumée'],'La grêle est de l’eau solide.'],
 ['Où trouve-t-on de l’eau liquide ?','dans une rivière',['dans un glaçon','dans la neige','dans la grêle'],'L’eau de la rivière coule : elle est liquide.'],
 {tf:'La glace est de l’eau.',v:true,e:'La glace est de l’eau à l’état solide.'},
 ['L’eau liquide prend la forme…','du récipient',['d’un cube toujours','d’une boule toujours','d’une étoile'],'Un liquide prend la forme de ce qui le contient.']]});
E('cp-sc-masse-temperature',{items:[
 ['Avec quoi mesure-t-on la température ?','un thermomètre',['une balance','une règle','un sablier'],'Le thermomètre indique s’il fait chaud ou froid.'],
 ['Quand il fait chaud, le liquide du thermomètre…','monte',['descend','disparaît','change de couleur'],'Il monte quand il fait chaud.'],
 ['Quand il fait froid, le liquide du thermomètre…','descend',['monte','déborde','devient vert'],'Il descend quand il fait froid.'],
 ['La température se mesure en…','degrés',['centimètres','kilos','heures'],'On parle de degrés Celsius (°C).'],
 ['Il fait 30 degrés. Il fait…','chaud',['très froid','il neige','il gèle'],'30 °C, c’est chaud.'],
 ['Il fait 0 degré. L’eau peut…','geler',['bouillir','devenir chaude','s’évaporer d’un coup'],'À 0 °C, l’eau commence à geler.'],
 {n:'Hier il faisait 10 degrés, aujourd’hui 13 degrés. De combien la température a-t-elle monté ?',a:3,u:'°C',e:'13 − 10 = 3 degrés.',d:2},
 ['Pour savoir s’il fait chaud dehors, je regarde…','le thermomètre',['la balance','la règle','le calendrier'],'Le thermomètre mesure la température.']]});
E('cp-sc-corps',{items:[
 ['Comment s’appelle l’ensemble des os ?','le squelette',['les muscles','la peau','le cœur'],'Tous les os forment le squelette.'],
 ['Quelle articulation est au milieu du bras ?','le coude',['le genou','la cheville','le cou'],'Le coude plie le bras.'],
 ['Quelle articulation est au milieu de la jambe ?','le genou',['le coude','le poignet','l’épaule'],'Le genou plie la jambe.'],
 ['Quelle articulation relie la main au bras ?','le poignet',['la cheville','le genou','la hanche'],'Le poignet fait tourner la main.'],
 ['Quelle articulation relie le pied à la jambe ?','la cheville',['le poignet','le coude','l’épaule'],'La cheville fait bouger le pied.'],
 ['Qu’est-ce qui protège le cerveau ?','le crâne',['les côtes','le genou','les dents'],'Le crâne est un os qui protège le cerveau.'],
 ['Avec quels organes voit-on ?','les yeux',['les oreilles','le nez','la langue'],'On voit avec les yeux.'],
 ['Avec quels organes entend-on ?','les oreilles',['les yeux','les mains','les pieds'],'On entend avec les oreilles.']]});
E('cp-sc-hygiene',{items:[
 ['Quand faut-il se laver les mains ?','avant de manger et après les toilettes',['jamais','seulement le dimanche','seulement le soir'],'Les mains propres évitent les microbes.'],
 ['Combien de fois par jour se brosse-t-on les dents ?','au moins 2 fois',['jamais','une fois par semaine','une fois par mois'],'Matin et soir, au minimum.'],
 ['Pour être en forme, un enfant de CP a besoin de dormir…','environ 10 à 11 heures par nuit',['2 heures par nuit','pas du tout','5 minutes'],'Les enfants ont besoin de beaucoup de sommeil.'],
 ['Pour grandir en bonne santé, je mange…','varié : fruits, légumes, féculents…',['seulement des bonbons','seulement des frites','rien le matin'],'Manger varié apporte tout ce dont le corps a besoin.'],
 ['Quand je tousse, je mets…','mon coude devant ma bouche',['ma main sur mon voisin','rien','ma tête dans mon cartable'],'Tousser dans son coude évite de transmettre des microbes.'],
 ['Bouger chaque jour, c’est…','bon pour la santé',['dangereux','interdit','inutile'],'Courir, jouer, sauter aident le corps.'],
 ['Que boit-on le plus pour être en bonne santé ?','de l’eau',['du soda','du sirop pur','du jus très sucré'],'L’eau est la meilleure boisson.'],
 ['Avant de dormir, il vaut mieux…','éteindre les écrans',['jouer à la console','regarder des vidéos','téléphoner longtemps'],'Les écrans le soir empêchent de bien dormir.'],
 {tf:'Le savon aide à enlever les microbes des mains.',v:true,e:'On se lave les mains avec du savon pendant environ 30 secondes.'},
 ['Mes dents se lavent avec…','une brosse à dents et du dentifrice',['du savon pour les mains','du sable','du shampoing'],'Brosse à dents + dentifrice.']]});

/* ---------- Histoire-géographie ---------- */
E('cp-hg-jour-saisons',{items:[
 ['Quelle saison vient après l’hiver ?','le printemps',['l’été','l’automne','l’hiver'],'Hiver → printemps.'],
 ['En quelle saison les feuilles des arbres tombent-elles ?','en automne',['au printemps','en été','jamais'],'En automne, beaucoup d’arbres perdent leurs feuilles.'],
 ['En quelle saison fait-il le plus chaud ?','en été',['en hiver','en automne','au printemps toujours'],'L’été est la saison chaude.'],
 ['Quand le Soleil se couche, c’est…','le soir',['le matin','midi','l’après-midi au début'],'Le Soleil se couche le soir.'],
 ['Combien y a-t-il de saisons ?','4',['2','3','12'],'Printemps, été, automne, hiver.'],
 ['Le matin, le Soleil…','se lève',['se couche','disparaît pour toujours','tombe'],'Le Soleil se lève le matin.'],
 {o:['le matin','midi','l’après-midi','le soir'],q:'Range les moments de la journée :',e:'le matin → midi → l’après-midi → le soir'},
 ['En hiver, il peut…','neiger',['faire 40 degrés','y avoir des cerises sur les arbres','faire nuit toute la journée'],'En hiver, il fait froid et il peut neiger.']]});
E('cp-hg-mesurer-temps',{items:[
 ['Pour savoir quel jour on est, je regarde…','le calendrier',['la règle','la balance','le thermomètre'],'Le calendrier montre les jours et les mois.'],
 ['Pour savoir l’heure, je regarde…','une montre ou une horloge',['un calendrier','une règle','un livre'],'La montre indique l’heure.'],
 ['Un sablier sert à mesurer…','une petite durée',['la température','la longueur','le poids'],'Le sable coule pendant un temps court.'],
 {n:'Combien de jours dans une semaine ?',a:7,e:'Lundi, mardi, mercredi, jeudi, vendredi, samedi, dimanche : 7 jours.'},
 {n:'Combien de mois dans une année ?',a:12,e:'De janvier à décembre : 12 mois.'},
 ['Quel jour vient après lundi ?','mardi',['mercredi','dimanche','jeudi'],'Lundi → mardi.'],
 ['Quel jour vient avant samedi ?','vendredi',['dimanche','jeudi','lundi'],'Vendredi → samedi.'],
 ['Quel est le premier mois de l’année ?','janvier',['décembre','mars','septembre'],'L’année commence en janvier.'],
 ['Hier, aujourd’hui, demain : demain, c’est…','le jour d’après',['le jour d’avant','il y a longtemps','aujourd’hui'],'Demain est le jour qui suit.'],
 {o:['hier','aujourd’hui','demain'],q:'Range dans l’ordre :',e:'hier → aujourd’hui → demain'},
 ['L’anniversaire revient…','une fois par an',['chaque jour','chaque semaine','jamais'],'On fête son anniversaire chaque année.'],
 ['Une minute, c’est…','plus court qu’une heure',['plus long qu’une heure','plus long qu’un jour','aussi long qu’une semaine'],'Une heure contient 60 minutes.',2]]});
E('cp-hg-se-reperer',{items:[
 ['Un plan montre un lieu vu…','de dessus',['de côté','de dessous','de loin dans le ciel la nuit'],'Sur un plan, on regarde comme un oiseau.'],
 ['Où va-t-on pour manger à l’école ?','à la cantine',['à la bibliothèque','dans la cour','au bureau du directeur'],'On mange à la cantine.'],
 ['Où joue-t-on à la récréation ?','dans la cour',['dans la classe','à la cantine','dans le bureau'],'La récréation se passe dans la cour.'],
 ['Où emprunte-t-on des livres à l’école ?','à la bibliothèque',['dans la cour','au gymnase','aux toilettes'],'On emprunte des livres à la bibliothèque (BCD).'],
 ['Le tableau est devant la classe. Il est…','devant',['derrière','sous','dans'],'Il est devant les élèves.'],
 ['Ma main droite est la main…','avec laquelle beaucoup écrivent (à droite du corps)',['la plus haute','la plus petite','à gauche'],'Droite et gauche : repère-toi par rapport à ton corps.'],
 ['Le chat est sous la table : il est…','en dessous de la table',['au-dessus de la table','à côté de la table','loin de la table'],'Sous = en dessous.'],
 ['L’oiseau est sur le toit : il est…','au-dessus du toit',['sous le toit','dans la cave','derrière la maison'],'Sur = au-dessus.']]});
E('cp-hg-quartier',{items:[
 ['Où achète-t-on du pain ?','à la boulangerie',['à la pharmacie','à la poste','à la mairie'],'Le boulanger vend du pain.'],
 ['Où achète-t-on des médicaments ?','à la pharmacie',['à la boulangerie','à la librairie','à la gare'],'Le pharmacien vend des médicaments.'],
 ['Où envoie-t-on une lettre ?','à la poste',['à la boucherie','à la piscine','au parc'],'La poste envoie le courrier.'],
 ['Où travaille le maire ?','à la mairie',['à l’hôpital','à l’école','à la ferme'],'Le maire travaille à la mairie.'],
 ['Pour traverser la rue, j’utilise…','le passage piéton',['le milieu de la route','le trottoir d’en face sans regarder','la piste cyclable'],'On traverse sur le passage piéton, en regardant.'],
 ['Le chemin de la maison à l’école s’appelle…','le trajet',['la carte','le quartier','la ville'],'Le trajet est le chemin entre deux lieux.'],
 ['Le feu pour les piétons est vert. Je…','traverse en regardant',['reste sur place','cours sans regarder','joue sur la route'],'Vert : on peut traverser, en regardant.'],
 ['Où soigne-t-on les malades ?','à l’hôpital',['à la boulangerie','au cinéma','à la poste'],'Les médecins soignent à l’hôpital.'],
 ['Où prend-on le train ?','à la gare',['à la mairie','à la piscine','au parc'],'Le train part de la gare.'],
 ['Où peut-on emprunter des livres dans la ville ?','à la médiathèque',['à la boucherie','à la gare','au garage'],'La médiathèque prête des livres.']]});
E('cp-hg-monde',{items:[
 ['Le globe représente…','la Terre',['la Lune','le Soleil','une ville'],'Le globe est une maquette de la Terre.'],
 ['Sur un planisphère, l’eau est en…','bleu',['rouge','noir','jaune'],'Les océans et les mers sont en bleu.'],
 ['Sur quel continent se trouve la France ?','l’Europe',['l’Afrique','l’Asie','l’Océanie'],'La France est en Europe.'],
 ['Quel est un grand océan ?','l’océan Atlantique',['la Seine','le lac Léman','la Loire'],'L’Atlantique est un océan.'],
 {n:'Combien de grands océans apprend-on au CP ?',a:3,e:'Atlantique, Pacifique, Indien.'},
 ['Sur une carte, le Nord est souvent…','en haut',['en bas','à gauche','au milieu'],'Le Nord est en haut des cartes.'],
 ['Quel est le plus grand continent ?','l’Asie',['l’Europe','l’Océanie','l’Antarctique'],'L’Asie est le plus grand continent.',2],
 ['Le planisphère est une carte…','de toute la Terre à plat',['de mon école','de ma rue','du ciel'],'Le planisphère montre le monde entier à plat.']]});

/* ---------- EMC ---------- */
E('cp-emc-regles',{items:[
 ['Pour parler en classe, je…','lève le doigt',['crie','parle en même temps que les autres','tape sur la table'],'Lever le doigt permet à chacun de parler.'],
 ['Pourquoi y a-t-il des règles ?','pour bien vivre ensemble',['pour embêter les enfants','pour rien','pour punir toujours'],'Les règles protègent tout le monde.'],
 ['Les règles de la classe s’appliquent…','à tout le monde',['seulement aux filles','seulement aux garçons','seulement aux nouveaux'],'Tout le monde respecte les mêmes règles.'],
 ['Dans le couloir, je…','marche calmement',['cours','pousse les autres','crie'],'Marcher évite les accidents.'],
 ['Quand un camarade parle, je…','l’écoute',['lui coupe la parole','me moque','pars'],'Écouter, c’est respecter.']]});
E('cp-emc-droits-enfant',{items:[
 ['Tous les enfants ont le droit…','d’aller à l’école',['de ne jamais manger','de travailler à l’usine','d’être frappés'],'Le droit à l’éducation.'],
 ['Un enfant malade a le droit…','d’être soigné',['de rester seul','d’être grondé','de ne pas voir de médecin'],'Le droit à la santé.'],
 ['Les enfants ont le droit de…','jouer',['ne jamais jouer','travailler toute la journée','être tristes toujours'],'Le droit au jeu et aux loisirs.'],
 ['Un enfant a le droit d’avoir…','un nom',['aucun nom','un numéro seulement','le nom d’un autre'],'Chaque enfant a droit à une identité.'],
 ['Si un enfant est en danger, on peut appeler…','le 119',['le 17 pour une pizza','personne','une boutique'],'Le 119 aide les enfants en danger.',2]]});
E('cp-emc-intimite',{items:[
 ['Si quelqu’un veut toucher mon corps et que je ne veux pas, je peux…','dire non',['ne rien dire','avoir honte','me cacher pour toujours'],'Mon corps m’appartient : je peux dire non.'],
 ['Si quelque chose me fait peur ou me gêne, j’en parle à…','un adulte de confiance',['personne','un inconnu','mon doudou seulement'],'Un adulte de confiance peut m’aider.'],
 ['Pour aller aux toilettes, chacun a droit à…','l’intimité (porte fermée)',['être regardé','être filmé','la porte ouverte'],'On respecte l’intimité de chacun.'],
 ['Un secret qui fait mal ou qui fait peur…','doit être raconté à un adulte de confiance',['doit être gardé','n’est pas grave','doit être oublié'],'Un secret qui fait mal se dit.'],
 ['Avant de faire un câlin à un copain, je…','lui demande s’il est d’accord',['le serre très fort','le fais sans demander','le pousse'],'On demande avant de toucher quelqu’un.']]});
E('cp-emc-republique',{items:[
 ['Quelles sont les couleurs du drapeau français ?','bleu, blanc, rouge',['vert, blanc, rouge','bleu, jaune','noir, rouge, jaune'],'Le drapeau est bleu, blanc, rouge.'],
 ['Quelle est la devise de la France ?','Liberté, Égalité, Fraternité',['Un pour tous','Paix et joie','Toujours plus loin'],'La devise est écrite sur les mairies et les écoles.'],
 ['La fête nationale est le…','14 juillet',['25 décembre','1er janvier','11 novembre'],'Le 14 juillet.'],
 ['Comment s’appelle l’hymne national ?','la Marseillaise',['Frère Jacques','Au clair de la lune','Joyeux anniversaire'],'L’hymne national est la Marseillaise.'],
 ['Marianne représente…','la République',['une chanteuse','une reine','une maîtresse'],'Marianne est le symbole de la République.']]});

/* ---------- Arts, musique, EPS, EVAR : variété + activités hors écran ---------- */
E('cp-ap-couleurs',{items:[
 ['Jaune + bleu donne…','vert',['orange','violet','marron'],'Jaune et bleu mélangés font du vert.'],
 ['Rouge + jaune donne…','orange',['vert','violet','bleu'],'Rouge et jaune font de l’orange.'],
 ['Rouge + bleu donne…','violet',['vert','orange','jaune'],'Rouge et bleu font du violet.'],
 ['Pour éclaircir une couleur, j’ajoute du…','blanc',['noir','marron','violet'],'Le blanc rend la couleur plus claire.'],
 ['Pour foncer une couleur, j’ajoute un peu de…','noir',['blanc','jaune','eau seulement'],'Un peu de noir rend la couleur plus foncée.']],
 parts:[HE('🎨','Atelier hors écran : la palette des mélanges',{but:'voir les couleurs naître en les mélangeant.',consigne:'Avec de la gouache rouge, jaune et bleue, mélange deux couleurs à la fois sur une assiette. Peins une tache de chaque mélange et écris son nom à côté (vert, orange, violet).',duree:'20 minutes',materiel:'gouache rouge, jaune, bleue, pinceau, assiette, feuille, eau',auto:'J’ai obtenu les 3 couleurs (vert, orange, violet) ; je sais dire quelles couleurs j’ai mélangées.'})]});
E('cp-ap-outils-traces',{items:[
 ['Quel outil laisse une trace fine ?','un feutre fin',['une éponge','un rouleau','une grosse brosse'],'Le feutre fin fait des traits fins.'],
 ['Quel outil laisse une grosse trace ?','un rouleau',['un crayon à papier fin','un stylo','une aiguille'],'Le rouleau laisse une large trace.'],
 ['Avec de la pâte à modeler, je peux…','modeler une forme',['peindre une vitre','coller du papier','dessiner au crayon'],'On modèle avec les mains.'],
 ['Pour coller des papiers, j’utilise…','de la colle',['de l’eau','du sable','une gomme'],'La colle fait tenir les papiers.'],
 ['Une éponge trempée dans la peinture laisse…','des taches avec de petits trous',['un trait fin','un trait bien droit','rien'],'L’éponge fait des traces tachetées.']],
 parts:[HE('🎨','Atelier hors écran : le musée des traces',{but:'découvrir que chaque outil laisse une trace différente.',consigne:'Sur une grande feuille, fais une trace avec 5 outils différents (crayon, feutre, pinceau, éponge, doigt). Sous chaque trace, dessine l’outil utilisé.',duree:'20 minutes',materiel:'feuille, crayon, feutre, pinceau, éponge, peinture',auto:'J’ai fait 5 traces différentes et je sais dire quel outil a fait chaque trace.'})]});
E('cp-ap-oeuvres',{items:[
 ['Une œuvre en 3 dimensions qu’on peut regarder de tous les côtés est…','une sculpture',['une peinture','une photographie','un dessin'],'On tourne autour d’une sculpture.'],
 ['Où peut-on voir des œuvres d’art ?','dans un musée',['dans une boulangerie','dans un garage','dans une piscine'],'Les musées montrent des œuvres.'],
 ['Une image prise avec un appareil est…','une photographie',['une sculpture','un modelage','une poterie'],'L’appareil photo prend des photographies.'],
 ['Celui qui crée une œuvre est…','un artiste',['un boulanger','un pilote','un facteur'],'L’artiste crée des œuvres.'],
 ['Pour décrire un tableau, je dis d’abord…','ce que je vois (couleurs, personnages)',['si je l’aime ou non','son prix','rien'],'On commence par observer et décrire.']],
 parts:[HE('🖼️','Atelier hors écran : mon petit musée',{but:'regarder une œuvre et en parler.',consigne:'Avec un adulte, regarde une image d’œuvre (dans un livre ou au musée). Dis 3 choses que tu vois (couleurs, formes, personnages), puis dessine ta propre version.',duree:'15 minutes',materiel:'un livre d’art ou une carte postale, feuille, crayons',auto:'J’ai dit 3 choses que je vois et j’ai fait mon dessin.'})]});
E('cp-mu-sons',{items:[
 ['Le chant d’un petit oiseau est un son…','aigu',['grave','muet','lourd'],'Un petit oiseau chante aigu.'],
 ['Le son d’un gros tambour est…','grave',['aigu','muet','pointu'],'Un gros tambour fait un son grave.'],
 ['Un chuchotement est un son…','doux (faible)',['fort','très aigu toujours','grave toujours'],'Chuchoter, c’est parler doucement.'],
 ['Une sirène de pompiers est un son…','fort',['doux','silencieux','muet'],'La sirène est très forte.'],
 ['Un son qui dure longtemps est…','long',['court','aigu','grave'],'Long / court : c’est la durée.']],
 parts:[HE('🎵','Activité musicale hors écran : la chasse aux sons',{but:'écouter et décrire les sons qui nous entourent.',consigne:'Ferme les yeux une minute dans la maison ou dehors. Écoute. Puis dis 3 sons entendus et pour chacun : aigu ou grave ? fort ou doux ?',duree:'10 minutes',materiel:'aucun',auto:'J’ai trouvé 3 sons et je les ai décrits avec les bons mots.'})]});
E('cp-mu-instruments',{parts:[HE('🥁','Activité musicale hors écran : fabrique un instrument',{but:'découvrir comment on produit un son.',consigne:'Fabrique un instrument : un hochet (riz dans une bouteille fermée) ou un tambour (boîte en carton). Joue fort, puis doucement, puis lentement et vite.',duree:'20 minutes',materiel:'bouteille en plastique fermée, riz ou lentilles, boîte',securite:'bien fermer la bouteille.',auto:'Mon instrument fait du bruit ; je sais jouer fort et doucement.'})]});
E('cp-mu-rythme',{items:[
 ['La pulsation, c’est…','un battement régulier',['un cri','une chanson triste','un silence'],'Comme un cœur qui bat : régulier.'],
 ['Pour bien chanter, je me tiens…','droit',['courbé','couché','à l’envers'],'Debout et droit, on respire mieux.'],
 ['Le tempo, c’est…','la vitesse de la musique',['le volume','le nom d’un instrument','une note'],'Lent ou rapide : c’est le tempo.'],
 ['Avant de chanter, je…','respire calmement',['crie','cours','mange'],'On prend une bonne respiration.'],
 ['Taper dans les mains en même temps que la musique, c’est suivre…','la pulsation',['les paroles','le refrain seulement','le silence'],'On frappe la pulsation.']],
 parts:[HE('👏','Activité musicale hors écran : frappe la pulsation',{but:'sentir le battement régulier de la musique.',consigne:'Écoute une comptine que tu connais. Frappe dans tes mains à chaque battement, puis marche au même rythme. Recommence plus lentement, puis plus vite.',duree:'10 minutes',materiel:'une comptine chantée par un adulte',auto:'Je frappe en même temps que la musique, sans accélérer.'})]});
E('cp-eps-courir-sauter',{items:[
 ['Avant de courir, je…','m’échauffe',['mange beaucoup','dors','reste assis'],'L’échauffement prépare le corps.'],
 ['Pour courir longtemps, je cours…','à une allure régulière',['le plus vite possible dès le départ','en marchant à reculons','en sautant'],'Une allure régulière permet de tenir longtemps.'],
 ['Après l’effort, je…','bois de l’eau',['bois du soda','ne bois rien','mange des bonbons'],'L’eau hydrate le corps.'],
 ['Pour sauter loin, je…','prends de l’élan',['reste immobile','ferme les yeux','saute en arrière'],'L’élan aide à sauter loin.']],
 parts:[HE('🏃','Mission hors écran : le parcours d’athlète',{but:'courir, sauter et lancer en toute sécurité.',consigne:'Dans un jardin ou un parc : cours jusqu’à un arbre et reviens, saute par-dessus une corde posée au sol, lance une balle le plus loin possible. Fais-le 3 fois.',duree:'20 minutes',materiel:'une corde, une balle',securite:'un adulte surveille ; terrain sans obstacle ; boire de l’eau.',auto:'J’ai fait le parcours 3 fois ; j’ai respiré calmement à la fin.'})]});
E('cp-eps-jeux-collectifs',{items:[
 ['Les joueurs de mon équipe sont mes…','partenaires',['adversaires','arbitres','spectateurs'],'Partenaires = mon équipe.'],
 ['Les joueurs de l’autre équipe sont mes…','adversaires',['partenaires','amis toujours','arbitres'],'Adversaires = l’autre équipe.'],
 ['Quand je perds, je…','serre la main et je félicite',['boude','crie','triche la prochaine fois'],'Être fair-play, c’est respecter.'],
 ['L’arbitre…','fait respecter les règles',['joue avec une équipe','triche','ne sert à rien'],'On écoute l’arbitre.'],
 ['Pour recevoir le ballon, je me place…','loin des adversaires, là où je suis libre',['derrière un adversaire','dans un coin, caché','hors du terrain'],'Être libre permet de recevoir une passe.'],
 ['Mon partenaire a le ballon et je suis libre. Je…','l’appelle ou je lève la main',['me couche par terre','lui prends le ballon des mains','m’en vais'],'On se montre pour recevoir la passe.']],
 parts:[HE('⚽','Mission hors écran : le jeu de la balle au camp',{but:'jouer ensemble en respectant les règles.',consigne:'Avec d’autres enfants et un adulte, jouez à la balle au camp ou à l’épervier. Avant de commencer, redites les règles à voix haute.',duree:'20 à 30 minutes',materiel:'un ballon mou',securite:'ballon mou ; pas de tir dans la tête ; terrain dégagé.',auto:'J’ai respecté les règles et j’ai félicité les autres à la fin.'})]});
E('cp-eps-eau-securite',{items:[
 ['À la piscine, je…','marche au bord du bassin',['cours au bord du bassin','pousse les autres dans l’eau','plonge sans regarder'],'Le sol mouillé glisse : on marche.'],
 ['À vélo, je porte…','un casque',['une casquette seulement','rien','un bonnet'],'Le casque protège la tête.'],
 ['Je vais dans l’eau…','avec un adulte qui surveille',['tout seul','la nuit','quand personne ne regarde'],'Jamais dans l’eau sans adulte.'],
 ['Pour flotter sur le dos, je…','m’allonge et je reste calme',['m’agite très fort','me mets en boule','retiens les bras serrés'],'Calme et allongé, on flotte mieux.']],
 parts:[HE('🏊','Mission hors écran : la sécurité avant tout',{but:'connaître les règles avant d’aller dans l’eau ou de faire du vélo.',consigne:'Avec un adulte, prépare ton sac de piscine ou ton vélo : vérifie le casque (bien attaché), les freins, le bonnet de bain. Redis les 3 règles de sécurité de la piscine.',duree:'10 minutes',materiel:'casque, vélo, sac de piscine',securite:'toujours avec un adulte.',auto:'Je sais dire 3 règles de sécurité et j’attache mon casque tout seul.'})]});
E('cp-evar-corps',{items:[
 ['Mon corps…','m’appartient',['appartient à tout le monde','appartient à mes copains','n’est pas à moi'],'Mon corps est à moi.'],
 ['Quand je grandis, mon corps…','change',['ne change jamais','rapetisse','reste pareil toute la vie'],'Grandir fait changer le corps.'],
 ['Les parties du corps cachées par le maillot de bain sont…','intimes',['publiques','à montrer à tous','sans importance'],'Ce sont les parties intimes : on les respecte.']],
 parts:[HE('💛','Moment hors écran : je grandis',{but:'voir que son corps grandit et change.',consigne:'Avec un adulte, regarde une photo de toi bébé et une photo de maintenant. Dites ensemble 3 choses qui ont changé (taille, cheveux, dents…).',duree:'10 minutes',materiel:'deux photos',auto:'Je sais dire 3 choses qui ont changé en grandissant.'})]});
E('cp-evar-emotions',{items:[
 ['Quand je suis en colère, je peux…','respirer et dire ce que je ressens',['taper','casser des objets','crier sur tout le monde'],'Respirer et parler aide à se calmer.'],
 ['Mon copain pleure. Je peux…','lui demander ce qui ne va pas',['me moquer','partir en riant','le pousser'],'On aide un copain triste.'],
 ['La peur, la joie, la tristesse, la colère sont des…','émotions',['couleurs','jeux','nombres'],'Ce sont des émotions.']],
 parts:[HE('😊','Moment hors écran : la météo des émotions',{but:'reconnaître et nommer ses émotions.',consigne:'Dessine 4 visages : joyeux, triste, en colère, qui a peur. Montre à un adulte le visage qui ressemble à ce que tu ressens aujourd’hui et dis pourquoi.',duree:'15 minutes',materiel:'feuille, crayons',auto:'Je sais nommer 4 émotions et dire ce que je ressens.'})]});
E('cp-evar-famille',{items:[
 ['Il existe…','beaucoup de familles différentes',['une seule sorte de famille','des familles interdites','des familles sans importance'],'Chaque famille est différente.'],
 ['Les familles se respectent…','toutes',['seulement les grandes','seulement les petites','jamais'],'Toutes les familles méritent le respect.'],
 ['Dans une famille, on peut vivre avec…','un parent, deux parents, des grands-parents…',['personne','seulement des animaux','seulement des voisins'],'Il y a plein de façons de vivre en famille.'],
 ['Un camarade parle de sa famille, différente de la mienne. Je…','l’écoute avec respect',['me moque','dis qu’elle n’est pas une vraie famille','pars'],'On respecte toutes les familles.']],
 parts:[HE('🏡','Moment hors écran : mon arbre des personnes importantes',{but:'parler des personnes qui comptent pour soi.',consigne:'Dessine un arbre. Sur chaque branche, dessine une personne importante pour toi (famille, nounou, ami…). Présente ton arbre à un adulte.',duree:'15 minutes',materiel:'feuille, crayons',auto:'J’ai dessiné les personnes qui comptent pour moi et je les ai présentées.'})]});
})();
