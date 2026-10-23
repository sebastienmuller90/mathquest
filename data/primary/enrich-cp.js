/* Finot Académie — CP : enrichissement V8.13 (variété des questions + activités hors écran).
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

/* ---------- Lot 2 vague 1 pédagogie (23/10/2026) : variété des exercices d'HG et d'EMC au CP ---------- */
E('cp-hg-avant-apres',{w:.85,items:[
 ['Hier, c’est…','le passé',['le futur','le présent','le jour de demain'],'Hier est déjà arrivé.'],
 ['Demain, c’est…','le futur',['le passé','le présent','il y a longtemps'],'Demain n’est pas encore arrivé.'],
 ['Aujourd’hui, c’est…','le présent',['le passé','le futur','autrefois'],'Aujourd’hui, c’est maintenant.'],
 ['Qui est né le plus tôt dans une famille ?','le grand-père',['le bébé','le petit-fils','la petite sœur'],'Les grands-parents sont nés avant les parents et les enfants.'],
 ['Quel mot parle du futur ?','demain',['hier','avant-hier','autrefois'],'Demain n’est pas encore arrivé.'],
 ['Quel mot parle du passé ?','autrefois',['demain','après-demain','bientôt'],'Autrefois, c’est avant maintenant.'],
 ['Sur une frise du temps, où met-on l’événement le plus ancien ?','à gauche',['à droite','au milieu','en haut'],'On lit la frise de gauche à droite.'],
 {tf:'Le temps passé peut revenir.',v:false,e:'Le temps passé ne revient jamais.'},
 {tf:'« Avant-hier » est plus ancien qu’« hier ».',v:true,e:'Avant-hier vient avant hier.'},
 {tf:'Les parents sont nés avant les grands-parents.',v:false,e:'Ce sont les grands-parents qui sont nés les premiers.'},
 {o:['Je suis bébé','J’apprends à marcher','J’entre au CP'],q:'Remets ces moments de ta vie dans l’ordre :',e:'Bébé, premiers pas, puis CP.'},
 {o:['avant-hier','hier','aujourd’hui','demain'],q:'Remets ces mots du temps dans l’ordre :',e:'Avant-hier, hier, aujourd’hui, demain.',d:2}]});

E('cp-hg-se-reperer',{w:.85,items:[
 ['Pour jouer dehors à l’école, on va dans…','la cour',['le réfectoire','la bibliothèque','la classe'],'La cour sert à jouer pendant la récréation.'],
 ['Pour emprunter un livre, on va à…','la bibliothèque',['la cour','le portail','les sanitaires'],'La bibliothèque prête des livres.'],
 ['Pour entrer dans l’école, on passe par…','le portail',['le tableau','la cantine','le plan'],'Le portail est l’entrée.'],
 ['Un plan est dessiné…','vu de dessus',['de côté','de très loin','à l’envers'],'On regarde comme un oiseau qui vole au-dessus.'],
 ['Si la porte est à ma droite, elle est du côté de…','ma main droite',['ma main gauche','mon dos','mon nez'],'Droite : du côté de la main qui écrit pour la plupart des enfants.',2],
 ['Le tableau est devant moi. Où est le mur du fond ?','derrière moi',['devant moi','à ma droite uniquement','sous mes pieds'],'Derrière, c’est le côté opposé à devant.'],
 ['Sur un plan, le petit carré dessiné peut représenter…','une table',['un nuage','un poisson','un arbre du jardin'],'Les objets sont dessinés vus de dessus.'],
 {tf:'On mange au réfectoire.',v:true,e:'Le réfectoire est la cantine.'},
 {tf:'Sur un plan, on voit les pieds des tables.',v:false,e:'On voit la classe de dessus.'},
 {tf:'Les sanitaires servent à se laver les mains.',v:true,e:'Ils servent aussi à aller aux toilettes.'},
 ['Quel mot est un mot de position ?','à côté',['rouge','joyeux','demain'],'À côté dit où se trouve un objet.'],
 ['Pour décrire la place d’un cartable, je dis qu’il est…','sous la table',['bleu et rond','lourd hier','joyeux'],'Sous donne la position.',2]]});

E('cp-hg-monde',{w:.85,items:[
 ['Le globe représente la Terre sous la forme…','d’une boule',['d’un carré','d’un triangle','d’une feuille plate'],'La Terre est ronde.'],
 ['Le planisphère est…','une carte plate du monde',['une boule','un océan','un continent'],'On aplatit la Terre sur une carte.'],
 ['Combien y a-t-il de continents ?','6',['2','12','20'],'Europe, Afrique, Asie, Amérique, Océanie, Antarctique.',2],
 ['Quel continent est couvert de glace ?','l’Antarctique',['l’Europe','l’Asie','l’Afrique'],'Il est tout au sud de la Terre.',2],
 ['Quel est un océan ?','le Pacifique',['l’Europe','la Marne','le Mont Blanc'],'Océans : Atlantique, Pacifique, Indien.'],
 ['Sur une carte, le Nord est…','en haut',['en bas','à gauche','à droite'],'Le Nord est en haut, le Sud en bas.'],
 ['Sur une carte, l’Est est…','à droite',['à gauche','en haut','en bas'],'L’Est est à droite.',2],
 ['Où y a-t-il plus d’eau sur la Terre ?','dans les océans et les mers',['dans les parcs','dans les jardins','dans les verres'],'Il y a plus d’eau que de terres.',2],
 {tf:'La Guadeloupe fait partie de la France.',v:true,e:'C’est un territoire français d’outre-mer, dans les Antilles.',d:2},
 {tf:'La France hexagonale se trouve en Asie.',v:false,e:'Elle est en Europe.'},
 {tf:'Sur une carte, le bleu montre souvent l’eau.',v:true,e:'Le bleu représente les mers et les océans.'},
 {n:'Combien y a-t-il de points cardinaux (Nord, Sud, Est, Ouest) ?',a:4,e:'Nord, Sud, Est, Ouest.'}]});

E('cp-hg-jour-saisons',{w:.85,items:[
 ['Quand notre côté de la Terre est tourné vers le Soleil, il fait…','jour',['nuit','hiver','nuageux'],'Le côté éclairé a le jour.'],
 ['En combien de temps la Terre fait-elle un tour sur elle-même ?','24 heures',['1 heure','1 mois','1 an'],'Une journée dure 24 heures.',2],
 ['Combien y a-t-il de saisons ?','4',['2','6','12'],'Printemps, été, automne, hiver.'],
 ['En quelle saison les feuilles des arbres tombent-elles ?','en automne',['au printemps','en été','en hiver seulement'],'Les arbres perdent leurs feuilles en automne.'],
 ['En quelle saison les jours sont-ils les plus longs en France ?','en été',['en hiver','en automne','à Noël'],'Il fait jour longtemps.',2],
 ['Quelle saison est la plus froide en France hexagonale ?','l’hiver',['l’été','le printemps','l’automne'],'C’est la saison du froid.'],
 ['Quelle saison vient entre l’hiver et l’été ?','le printemps',['l’automne','le matin','la nuit'],'Hiver, printemps, été, automne.'],
 {tf:'C’est le Soleil qui tourne autour de la Terre en un jour.',v:false,e:'C’est la Terre qui tourne sur elle-même.',d:2},
 {tf:'La nuit, notre côté de la Terre est dans l’ombre.',v:true,e:'Il est tourné à l’opposé du Soleil.'},
 {o:['printemps','été','automne','hiver'],q:'Remets les saisons dans l’ordre en commençant par le printemps :',e:'Printemps, été, automne, hiver.'},
 {o:['le matin','le midi','le soir','la nuit'],q:'Remets les moments de la journée dans l’ordre :',e:'Matin, midi, soir, nuit.'}]});

E('cp-hg-mesurer-temps',{w:.85,items:[
 ['Pour savoir l’heure, je regarde…','une montre',['un sablier','un calendrier','une carte'],'La montre donne l’heure.'],
 ['Pour savoir le jour du mois, je regarde…','un calendrier',['une montre','un sablier','un plan'],'Le calendrier donne les dates.'],
 ['Un sablier sert à mesurer…','une courte durée',['la date de ton anniversaire','la météo','la taille'],'Le sable met un temps limité à couler.'],
 ['Un réveil sert à…','sonner à une heure choisie',['dire la date','mesurer la distance','montrer le plan'],'On règle l’heure de la sonnerie.'],
 ['L’emploi du temps de la classe montre…','ce qu’on fait pendant la journée',['la météo','les continents','les saisons'],'Il organise les activités.',2],
 ['Combien d’heures y a-t-il dans une journée ?','24',['12 seulement','7','60'],'Une journée a 24 heures.',2],
 {tf:'Le sablier donne l’heure exacte.',v:false,e:'Il mesure une durée, pas l’heure.'},
 {tf:'Le calendrier permet de repérer les jours et les mois.',v:true,e:'On y voit les dates de l’année.'},
 {n:'Combien y a-t-il de minutes dans une heure ?',a:60,e:'Une heure dure 60 minutes.',d:2},
 ['Pour me brosser les dents pendant 3 minutes, j’utilise…','un sablier de 3 minutes',['un calendrier','un plan','un globe'],'Il mesure une courte durée.'],
 ['Un événement qui a lieu chaque année à la même date est…','un anniversaire',['une récréation','un sablier','un trajet'],'Il revient chaque année.',2]]});

E('cp-emc-emotions',{w:.85,items:[
 ['Quand on a très peur, on ressent…','de la peur',['de la joie','de la fierté','de l’ennui'],'La peur fait battre le cœur plus vite.'],
 ['Quand on a une bonne surprise, on est…','content et surpris',['triste','en colère','endormi'],'La surprise peut être joyeuse.'],
 ['Que faire si une colère est très forte ?','respirer lentement et s’éloigner un peu',['frapper un camarade','casser un objet','crier sur tout le monde'],'On se calme sans faire de mal.'],
 ['Que dire si on est triste ?','« Je suis triste » à un adulte de confiance',['rien du tout jamais','« Tu es méchant »','« Je m’en fiche »'],'Dire ce qu’on ressent aide.'],
 ['Quelle émotion ressent-on quand un ami est parti ?','de la tristesse',['de la joie','de la fierté','du dégoût'],'Être séparé d’un ami rend triste.'],
 ['Un camarade pleure. Que fais-tu ?','je lui demande ce qui se passe et je le console',['je me moque','je pars en courant','je dis qu’il exagère'],'On aide, on est gentil.'],
 {tf:'Toutes les émotions sont normales.',v:true,e:'Ce qui compte, c’est ce qu’on en fait.'},
 {tf:'Quand on est en colère, on a le droit de faire mal aux autres.',v:false,e:'On a le droit d’être en colère, pas de faire mal.'},
 {tf:'Dire ce qu’on ressent avec des mots aide à se sentir mieux.',v:true,e:'Les mots remplacent les coups ou les cris.'},
 ['Quel visage montre la joie ?','😀',['😢','😡','😨'],'Le visage souriant.'],
 ['Le dégoût, c’est ce qu’on ressent quand…','on sent quelque chose de très mauvais',['on reçoit un cadeau','on gagne un jeu','on retrouve un ami'],'Le dégoût protège de ce qui est mauvais.',2]]});

E('cp-emc-regles',{w:.85,items:[
 ['Pourquoi range-t-on son matériel ?','pour garder la classe agréable et ne rien perdre',['pour embêter les autres','pour faire du bruit','pour rien'],'Ranger aide tout le monde.'],
 ['Quand quelqu’un parle, je…','l’écoute',['crie plus fort','fais du bruit','pars'],'Écouter, c’est respecter.'],
 ['Si j’abîme le livre d’un camarade, je dois…','m’excuser et réparer ou remplacer',['le cacher','accuser un autre','rire'],'Réparer est une conséquence juste.'],
 ['Les règles s’appliquent…','à tout le monde',['seulement aux filles','seulement aux plus petits','seulement au maître'],'Tous respectent les règles.',2],
 ['Pour demander la parole, je…','lève le doigt',['tape du pied','crie','m’en vais'],'Chacun parle à son tour.'],
 ['Quand on se met en rang calmement, on évite…','les bousculades',['d’avancer','de marcher','de respirer'],'Le rang protège chacun.',2],
 {tf:'Une règle est faite pour protéger tout le monde.',v:true,e:'Elle permet de vivre ensemble.'},
 {tf:'Je peux ne pas respecter la règle si le maître ne regarde pas.',v:false,e:'On respecte les règles même sans surveillance.',d:2},
 {tf:'Il faut respecter le matériel de l’école.',v:true,e:'Il sert à tous les élèves.'},
 ['Quelle règle aide à bien écouter ?','ne pas parler en même temps',['courir en classe','crier','jeter ses affaires'],'Un à la fois.'],
 {o:['Je lève le doigt','Le maître me donne la parole','Je parle','J’écoute la suite'],q:'Remets dans l’ordre pour prendre la parole :',e:'Lever le doigt, attendre la parole, parler, écouter.',d:2}]});

E('cp-emc-droits-enfant',{w:.85,items:[
 ['Le droit d’être soigné, c’est le droit…','à la santé',['au chocolat','à la télévision','de choisir sa maîtresse'],'Un enfant malade doit être soigné.'],
 ['Aller à l’école est…','un droit de l’enfant',['une punition','un jeu interdit','un caprice'],'Tous les enfants ont droit à l’éducation.'],
 ['Avoir un nom, c’est le droit à…','une identité',['la télévision','un animal','un vélo'],'Chaque enfant a un nom et une nationalité.',2],
 ['Un enfant a le droit de…','jouer et se reposer',['travailler à l’usine','conduire','être frappé'],'Jouer est un droit.'],
 ['Un adulte frappe un enfant. Que doit faire l’enfant ?','en parler à un adulte de confiance',['garder le secret','frapper aussi','se cacher toujours'],'Un enfant a droit à la protection.'],
 ['Le numéro à appeler si un enfant est en danger est le…','119',['3','50','777'],'Le 119 est gratuit.',2],
 {tf:'Les enfants ont des droits mais aussi des devoirs.',v:true,e:'Par exemple écouter et respecter les autres.'},
 {tf:'Seuls les enfants d’un pays ont des droits.',v:false,e:'Tous les enfants du monde ont les mêmes droits.'},
 {tf:'Avoir des droits veut dire faire ce qu’on veut.',v:false,e:'Il y a aussi des limites : les droits des autres.',d:2},
 ['Le droit de donner son avis veut dire…','je peux dire ce que je pense, poliment',['je peux crier','je peux insulter','je dois me taire'],'On s’exprime en respectant les autres.'],
 ['En quelle année la Convention des droits de l’enfant a-t-elle été adoptée ?','1989',['1889','2020','1500'],'Adoptée par l’ONU en 1989.',3]]});

E('cp-emc-intimite',{w:.85,items:[
 ['Pour être propre, je…','me lave tous les jours',['ne me lave jamais','me lave une fois par an','me lave seulement pour fêter Noël'],'L’hygiène protège la santé.'],
 ['Après être allé aux toilettes, je…','me lave les mains',['mange tout de suite','reste sale','mets mes mains dans la bouche'],'Les mains sales transportent des microbes.'],
 ['Qui décide si on peut toucher mon corps ?','moi : mon corps m’appartient',['tout le monde','le plus fort','celui qui a un cadeau'],'Je peux toujours dire non.',2],
 ['Si quelqu’un me demande de garder un secret qui me fait peur, je…','le dis à un adulte de confiance',['le garde toujours','me tais','le dis à un inconnu'],'Un secret qui fait peur ne se garde pas.'],
 ['Quel adulte de confiance puis-je choisir ?','un parent ou mon enseignant',['un inconnu','une personne qui me menace','personne'],'Il peut m’aider.'],
 ['Je ferme la porte des toilettes parce que…','c’est mon intimité',['j’ai froid','je suis puni','je cherche un jeu'],'On respecte l’intimité de chacun.'],
 {tf:'Je peux dire non si un geste me met mal à l’aise.',v:true,e:'Mon corps m’appartient.'},
 {tf:'On doit toujours laisser les autres nous toucher pour être poli.',v:false,e:'Je peux dire non, même à quelqu’un que je connais.'},
 {tf:'Le brossage des dents se fait au moins deux fois par jour.',v:true,e:'Matin et soir.',d:2},
 ['Pour être poli avec l’intimité des autres, je…','frappe avant d’entrer dans la salle de bain',['entre sans frapper','regarde par la serrure','ouvre sans demander'],'Je respecte l’intimité des autres.',2],
 {n:'Combien de fois par jour doit-on se brosser les dents (au minimum) ?',a:2,e:'Matin et soir.',d:2}]});

E('cp-emc-republique',{w:.85,items:[
 ['La première couleur du drapeau français (près du mât) est…','le bleu',['le rouge','le vert','le jaune'],'Bleu, blanc, rouge.'],
 ['La devise de la République commence par…','Liberté',['Égalité','Fraternité','Laïcité'],'Liberté, Égalité, Fraternité.'],
 ['Qui est Marianne ?','le visage qui symbolise la République',['une chanteuse actuelle','une écolière de CP','une reine'],'On la voit dans les mairies.'],
 ['Le 14 juillet, la France fête…','la fête nationale',['Noël','Pâques','la rentrée'],'La fête nationale est le 14 juillet.'],
 ['La Marseillaise est…','l’hymne national',['une berceuse','un jeu','un menu'],'On la chante lors des cérémonies.'],
 ['Où voit-on le drapeau français à l’école ?','sur la façade ou à l’entrée',['dans la cuisine','sous la table','dans le ciel seulement'],'Il est sur les bâtiments publics.',2],
 {tf:'Le drapeau français est bleu, blanc, rouge.',v:true,e:'Trois bandes verticales.'},
 {tf:'Le drapeau français est vert et jaune.',v:false,e:'Il est bleu, blanc, rouge.'},
 {tf:'La devise de la République contient le mot « Fraternité ».',v:true,e:'Liberté, Égalité, Fraternité.'},
 {o:['Liberté','Égalité','Fraternité'],q:'Remets la devise dans l’ordre :',e:'Liberté, Égalité, Fraternité.'},
 ['Le mot « République » vient de…','« chose publique », ce qui appartient à tous',['« roi »','« château »','« boulangerie »'],'Latin : res publica.',3]]});

/* ---------- Lot 3 vague 1 pédagogie (23/10/2026) : variété des exercices au CP (français, maths, sciences, HG, EMC) ---------- */
E('cp-fr-phrase',{w:.6,items:[
 ['Une phrase commence par…','une majuscule',['un point','un chiffre','une virgule'],'Le premier mot commence par une grande lettre.'],
 ['Une phrase finit par…','un point',['une majuscule','un tiret','une lettre'],'Le point termine la phrase.'],
 ['Quelle phrase est bien écrite ?','Le chien court.',['le chien court','Le chien court','chien le court.'],'Majuscule au début, point à la fin.'],
 ['Quel signe pose une question ?','?',['.','!',','],'Le point d’interrogation.'],
 ['Quel signe montre la surprise ou la joie ?','!',['.','?',','],'Le point d’exclamation.'],
 ['Quelle phrase pose une question ?','Où est mon chat ?',['Mon chat dort.','Quel beau chat !','Viens, mon chat.'],'Elle finit par un point d’interrogation.'],
 ['Quel groupe de mots est une phrase ?','Léa mange une pomme.',['pomme Léa une','mange mange','Léa le'],'Les mots sont dans l’ordre et ça veut dire quelque chose.'],
 ['Dans « Le chat dort. », qui dort ?','le chat',['la maison','le lit','la nuit'],'Le chat fait l’action.'],
 {tf:'Une phrase finit toujours par une majuscule.',v:false,e:'Elle commence par une majuscule et finit par un point.'},
 {tf:'Dans une phrase, les mots ne sont pas dans n’importe quel ordre.',v:true,e:'« Le chat dort. » mais pas « Dort chat le. »'},
 {o:['Le','chat','dort.'],q:'Remets les mots dans l’ordre pour faire une phrase :',e:'Le chat dort.'},
 {o:['Mon','frère','joue.'],q:'Remets les mots dans l’ordre :',e:'Mon frère joue.'},
 {o:['La','maîtresse','lit','une','histoire.'],q:'Remets les mots dans l’ordre :',e:'La maîtresse lit une histoire.',d:2}]});

E('cp-fr-nombre',{w:.6,items:[
 ['Un seul chat : on dit…','un chat',['des chats','les chats','trois chats'],'Un seul : singulier.'],
 ['Plusieurs chats : on écrit…','des chats',['un chat','le chats','une chats'],'Pluriel : on ajoute un s.'],
 ['Complète : « deux … » (lapin)','lapins',['lapin','lapine','lapinss'],'Deux : plusieurs, donc un s.'],
 ['Complète : « un … » (ballon)','ballon',['ballons','ballonss','ballonne'],'Un seul : pas de s.'],
 ['Quel petit mot annonce un pluriel ?','les',['un','le','la'],'Les chats.'],
 ['Quel petit mot annonce un singulier ?','une',['les','des','mes'],'Une seule.'],
 ['Quel mot est au pluriel ?','des fleurs',['une fleur','la fleur','ma fleur'],'Des : plusieurs.'],
 ['Quel mot est au singulier ?','mon sac',['mes sacs','les sacs','des sacs'],'Mon : un seul.'],
 {tf:'On entend toujours le s du pluriel.',v:false,e:'Le s du pluriel ne s’entend pas : il faut l’écrire.'},
 {tf:'« Trois voitures » est au pluriel.',v:true,e:'Trois veut dire plusieurs.'},
 {tf:'« Des pomme » est bien écrit.',v:false,e:'On écrit « des pommes ».'},
 {t:'Écris au pluriel : une fleur → des …',a:['fleurs'],e:'Des fleurs.',d:2}]});

E('cp-fr-mots-outils',{w:.6,items:[
 ['Complète : « Le chat … sur le lit. » (verbe être)','est',['et','es','ai'],'Si je peux dire « était », j’écris est.'],
 ['Complète : « Un chat … un chien. » (relie deux mots)','et',['est','es','e'],'Et relie deux mots.'],
 ['Complète : « Le chat dort … la maison. »','dans',['sur','sous','avec'],'Le chat est à l’intérieur.'],
 ['Complète : « La balle est … la table. » (en dessous)','sous',['sur','dans','et'],'Sous : en dessous.'],
 ['Complète : « Le livre est … la table. » (dessus)','sur',['sous','dans','et'],'Sur : dessus.'],
 ['Complète : « Je joue … mon frère. » (ensemble)','avec',['sans','sur','sous'],'Avec : ensemble.'],
 ['Complète : « … est grand. » (un garçon)','Il',['Elle','Une','La'],'Il pour un garçon ou un animal masculin.'],
 ['Complète : « … est petite. » (une fille)','Elle',['Il','Un','Le'],'Elle pour une fille.'],
 ['Complète : « Je veux jouer, … il pleut. »','mais',['et','est','sur'],'Mais montre une difficulté.',2],
 ['Complète : « Un cadeau … toi. »','pour',['sur','sous','mais'],'Pour : à destination de.',2],
 {tf:'« Et » peut se remplacer par « était ».',v:false,e:'C’est « est » qu’on peut remplacer par « était ».'},
 {t:'Écris le mot : « Le chat … sous le lit. » (verbe être : est / et)',a:['est'],e:'Le chat est sous le lit.'},
 {t:'Écris le mot : « Pierre … Marie » (relie deux prénoms : et / est)',a:['et'],e:'Pierre et Marie.'}]});

E('cp-ma-longueurs',{w:.6,items:[
 ['Un crayon est plus long qu’une gomme. La gomme est…','plus courte',['plus longue','aussi longue','plus lourde'],'Court est le contraire de long.'],
 ['Pour mesurer un trait, on utilise…','une règle',['une balance','un thermomètre','une horloge'],'On mesure avec une règle.'],
 ['On place le début du trait sur…','le 0 de la règle',['le 1 de la règle','le 10 de la règle','le bord de la table'],'Le 0 est le départ.'],
 ['La longueur se mesure en…','centimètres (cm)',['kilogrammes','heures','litres'],'cm.'],
 ['Pour comparer deux bandes, je les place…','côte à côte, en partant du même point',['l’une sur l’autre au hasard','loin l’une de l’autre','sans les regarder'],'On compare en alignant le début.'],
 ['Quel objet est le plus long ?','un train',['un crayon','une gomme','un bouton'],'Le train est très long.'],
 ['Quel objet est le plus court ?','un bouton',['un train','une table','un lit'],'Un bouton est tout petit.'],
 {n:'Un trait commence à 0 et finit à 8 sur la règle. Combien de cm ?',a:8,u:'cm',e:'Il mesure 8 cm.'},
 {n:'Un trait mesure 5 cm. Un autre trait mesure 3 cm de plus. Combien mesure le deuxième trait ?',a:8,u:'cm',e:'5 + 3 = 8.',d:2},
 {tf:'On commence à mesurer au 1 de la règle.',v:false,e:'On commence au 0.'},
 {tf:'Un trait de 9 cm est plus long qu’un trait de 6 cm.',v:true,e:'9 est plus grand que 6.'},
 {tf:'Un crayon de 12 cm est plus court qu’un crayon de 15 cm.',v:true,e:'12 est plus petit que 15.'}]});

E('cp-ma-masses',{w:.6,items:[
 ['Une plume est…','légère',['lourde','très lourde','en métal'],'Une plume pèse très peu.'],
 ['Un éléphant est plus lourd qu’une souris. La souris est…','plus légère',['plus lourde','aussi lourde','plus grosse'],'Elle est légère.'],
 ['Sur une balance à plateaux, le plateau qui descend porte…','l’objet le plus lourd',['l’objet le plus léger','l’objet le plus long','l’objet le plus rouge'],'Le plus lourd fait descendre le plateau.'],
 ['Si les deux plateaux sont à la même hauteur, les objets ont…','la même masse',['des masses très différentes','des tailles différentes','des couleurs différentes'],'Ils s’équilibrent.'],
 ['Un ballon de baudruche est gros mais…','léger',['lourd','en pierre','très dur'],'Gros ne veut pas dire lourd.'],
 ['Quel objet est le plus lourd ?','une pierre',['une plume','une feuille','un ballon de baudruche'],'La pierre est lourde.'],
 ['Quel objet est le plus léger ?','une plume',['une pierre','un livre','un seau plein d’eau'],'La plume est légère.'],
 ['Pour savoir lequel est le plus lourd, je peux…','les soupeser ou utiliser une balance',['les regarder de loin','compter les lettres','les ranger par couleur'],'On compare les masses.'],
 {tf:'Un objet gros est toujours lourd.',v:false,e:'Un gros ballon de baudruche est léger.'},
 {tf:'Le plateau le plus haut porte l’objet le plus léger.',v:true,e:'Le plateau qui monte est le plus léger.'},
 {tf:'Une balance sert à comparer des masses.',v:true,e:'Elle dit lequel est plus lourd.'}]});

E('cp-ma-heure',{w:.6,items:[
 ['La petite aiguille montre…','les heures',['les minutes','les jours','les mois'],'La petite : les heures.'],
 ['La grande aiguille sur le 12 : c’est une heure…','pile',['demie','passée','moins le quart'],'12 = heure pile.'],
 ['La petite aiguille est sur 6, la grande sur 12. Il est…','6 heures',['12 heures','1 heure','3 heures'],'La petite montre 6.'],
 ['La petite aiguille est sur 2, la grande sur 12. Il est…','2 heures',['12 heures','1 heure','4 heures'],'La petite montre 2.'],
 ['La petite aiguille est sur 10, la grande sur 12. Il est…','10 heures',['12 heures','2 heures','1 heure'],'La petite montre 10.'],
 ['À midi, les deux aiguilles sont sur…','le 12',['le 6','le 3','le 9'],'Il est 12 heures.',2],
 ['Combien d’heures y a-t-il dans une journée ?','24 heures',['12 jours','7 heures','60 heures'],'Une journée dure 24 heures.',2],
 ['Il est 4 heures. Dans 1 heure, il sera…','5 heures',['3 heures','4 heures','6 heures'],'On avance d’une heure.',2],
 ['Il est 7 heures. Il y a 1 heure, il était…','6 heures',['8 heures','7 heures','5 heures'],'On recule d’une heure.',2],
 {tf:'La grande aiguille montre les heures.',v:false,e:'C’est la petite aiguille.'},
 {tf:'Un réveil peut sonner à une heure choisie.',v:true,e:'On règle l’heure de la sonnerie.'},
 {n:'Il est 3 heures. Quelle heure sera-t-il dans 2 heures ?',a:5,u:'heures',e:'3 + 2 = 5.',d:2}]});

E('cp-ma-figures',{w:.6,items:[
 ['Une assiette a la forme d’un…','cercle',['carré','triangle','rectangle'],'Elle est toute ronde.'],
 ['Une fenêtre a souvent la forme d’un…','rectangle',['cercle','triangle','rond'],'Quatre côtés et quatre coins.'],
 ['Le toit d’une maison dessinée est souvent un…','triangle',['cercle','carré','rectangle'],'Trois côtés.',2],
 ['Un carré a…','4 côtés de même longueur',['3 côtés','2 côtés','5 côtés'],'Quatre côtés égaux.'],
 ['Un triangle a…','3 côtés',['4 côtés','2 côtés','5 côtés'],'Trois côtés et trois sommets.'],
 ['Un cercle a…','aucun côté droit',['4 côtés','3 côtés','2 côtés'],'Il est tout rond.'],
 ['Un rectangle a…','4 côtés et 4 coins droits',['3 côtés','aucun coin','5 côtés'],'Ses côtés en face sont égaux.'],
 ['Combien de sommets a un triangle ?','3',['2','4','5'],'Trois pointes.'],
 ['Quelle figure a 4 côtés égaux ?','le carré',['le triangle','le cercle','le rond'],'C’est le carré.'],
 {tf:'Un carré est un cercle.',v:false,e:'Le carré a des côtés droits, le cercle est rond.'},
 {tf:'Un triangle a 3 côtés.',v:true,e:'Trois côtés.'},
 {n:'Combien de côtés a un rectangle ?',a:4,e:'Quatre côtés.'},
 {n:'Combien de côtés a un triangle ?',a:3,e:'Trois côtés.'}]});

E('cp-ma-solides',{w:.6,items:[
 ['Un ballon a la forme d’une…','boule',['pyramide','boîte','pierre carrée'],'Il roule partout.'],
 ['Un dé a la forme d’un…','cube',['cône','cylindre','pavé long'],'Six faces carrées.'],
 ['Une boîte de conserve a la forme d’un…','cylindre',['cube','cône','pyramide'],'Il roule d’un seul côté.'],
 ['Un cornet de glace a la forme d’un…','cône',['cube','cylindre','pavé'],'Une pointe et un disque.'],
 ['Une boîte à chaussures a la forme d’un…','pavé',['cube','cône','boule'],'Six faces rectangulaires.'],
 ['Quel solide roule dans toutes les directions ?','la boule',['le cube','le pavé','la pyramide'],'Elle est toute ronde.'],
 ['Quel solide a des faces triangulaires qui se rejoignent en pointe ?','la pyramide',['le cube','la boule','le cylindre'],'La pyramide.'],
 ['Un cube a combien de faces ?','6',['4','8','2'],'Six faces carrées.'],
 {tf:'Un cylindre peut rouler.',v:true,e:'Sur sa face courbe.'},
 {tf:'Un cube roule comme une boule.',v:false,e:'Un cube a des faces plates : il ne roule pas.'},
 {n:'Combien de faces a un dé ?',a:6,e:'Un dé est un cube : 6 faces.'}]});

E('cp-sc-vivant',{w:.6,items:[
 ['Qui est vivant ?','un chat',['une pierre','un ballon','une chaise'],'Il naît, grandit et mange.'],
 ['Qui n’est pas vivant ?','une pierre',['une plante','un oiseau','un poisson'],'Elle ne grandit pas.'],
 ['Un être vivant a besoin de…','se nourrir',['rester immobile','ne jamais grandir','rien'],'Il mange ou boit.'],
 ['Un nid est fabriqué par…','un oiseau',['la pluie','le vent','une pierre'],'Le nid n’est pas vivant mais il est fabriqué par un être vivant.',2],
 ['Le lait vient…','de la vache (ou d’un autre animal)',['d’un arbre','d’une pierre','d’un nuage'],'Le lait est produit par les animaux.'],
 ['Une graine plantée et arrosée…','peut grandir et devenir une plante',['reste toujours pareille','devient une pierre','se transforme en animal'],'La graine est vivante.'],
 ['Un être vivant peut…','avoir des petits',['rester pareil pour toujours','voler sans respirer','devenir un jouet'],'Se reproduire.'],
 {tf:'Une plante est vivante.',v:true,e:'Elle pousse et a besoin d’eau.'},
 {tf:'Une voiture est vivante parce qu’elle bouge.',v:false,e:'Elle n’est pas vivante : elle ne naît pas et ne grandit pas.'},
 {tf:'Tous les êtres vivants meurent un jour.',v:true,e:'Ils naissent, grandissent et meurent.',d:2}]});

E('cp-sc-environnement',{w:.6,items:[
 ['Un insecte a…','6 pattes',['4 pattes','8 pattes','2 pattes'],'Six pattes.'],
 ['Une araignée a…','8 pattes',['6 pattes','4 pattes','2 pattes'],'Huit pattes.'],
 ['Qui vit dans la mare ?','la grenouille',['l’écureuil','la fourmi','le moineau'],'La grenouille aime l’eau.'],
 ['Qui vit dans un arbre ?','l’écureuil',['le poisson','le ver de terre','le têtard'],'Il grimpe aux arbres.'],
 ['Qui vit dans le sol ?','le ver de terre',['l’abeille','le papillon','le moineau'],'Il creuse la terre.'],
 ['Les oiseaux ont…','des plumes',['des poils','des écailles','une carapace'],'Des plumes et un bec.'],
 ['Les abeilles se posent sur…','les fleurs',['les poissons','les pierres','les vers'],'Elles butinent.'],
 ['Un papillon est un…','insecte',['mammifère','oiseau','poisson'],'Il a 6 pattes.',2],
 {tf:'Une araignée est un insecte.',v:false,e:'Elle a 8 pattes ; les insectes en ont 6.'},
 {tf:'Une fourmi a six pattes.',v:true,e:'C’est un insecte.'},
 {n:'Combien de pattes a un insecte ?',a:6,e:'Six.'}]});

E('cp-sc-proteger',{w:.6,items:[
 ['Quel geste économise l’eau ?','fermer le robinet pendant le brossage des dents',['laisser couler l’eau','remplir la baignoire sans raison','laver la voiture tous les jours'],'On ne gaspille pas l’eau.'],
 ['Quel geste économise l’électricité ?','éteindre la lumière en sortant',['laisser toutes les lampes allumées','laisser la télé allumée','ouvrir le frigo longtemps'],'On éteint ce qu’on n’utilise pas.'],
 ['Où jette-t-on un papier ?','dans une poubelle',['par terre','dans la mare','dans un arbre'],'On garde la nature propre.'],
 ['Que faire d’un journal usagé ?','le mettre dans la poubelle de tri',['le brûler dans la cour','le jeter dans la rivière','le laisser dans la rue'],'Le papier se recycle.',2],
 ['Les piles usagées…','vont dans un bac spécial au magasin',['vont dans la poubelle normale','vont dans la rivière','vont dans le jardin'],'Elles sont dangereuses pour la nature.',2],
 ['Pour protéger les plantes, je ne dois pas…','les arracher',['les arroser','les regarder','les respecter'],'Les plantes sont vivantes.'],
 {tf:'Jeter un papier par terre protège la nature.',v:false,e:'Cela salit la nature.'},
 {tf:'Trier ses déchets aide à protéger l’environnement.',v:true,e:'On peut les recycler.'},
 {tf:'On peut laisser couler l’eau quand on se brosse les dents.',v:false,e:'On ferme le robinet.'},
 ['Je ramasse un papier tombé dans la cour. C’est un geste…','pour la nature',['dangereux','inutile','interdit'],'Chaque petit geste compte.']]});

E('cp-sc-eau-etats',{w:.6,items:[
 ['La pluie est de l’eau…','liquide',['solide','en pierre','en sable'],'Elle coule.'],
 ['Un glaçon est de l’eau…','solide',['liquide','en gaz','en sable'],'Il garde sa forme.'],
 ['La neige est de l’eau…','solide',['liquide','dorée','sèche'],'Elle garde sa forme.'],
 ['Quand un glaçon fond, il devient…','de l’eau liquide',['de la neige','de la pierre','du sable'],'Il redevient liquide.'],
 ['Quand il fait très froid, l’eau liquide devient…','de la glace',['du sable','du lait','du jus'],'L’eau gèle.'],
 ['L’eau du robinet est…','liquide',['solide','en cube','en poudre'],'Elle coule.'],
 ['La mer est faite d’eau…','liquide',['solide','de glace tous les jours','en poudre'],'L’eau de mer coule.'],
 {tf:'La glace est de l’eau solide.',v:true,e:'Quand il gèle.'},
 {tf:'L’eau liquide garde sa forme dans la main.',v:false,e:'Elle coule entre les doigts.'},
 {tf:'Un glaçon fond quand il fait chaud.',v:true,e:'Il redevient liquide.'}]});

E('cp-sc-masse-temperature',{w:.6,items:[
 ['Un thermomètre sert à mesurer…','la température',['la longueur','la masse','le temps'],'Il dit s’il fait chaud ou froid.'],
 ['La température se dit en…','degrés Celsius (°C)',['centimètres','kilogrammes','litres'],'°C.'],
 ['Quand il fait chaud, le liquide du thermomètre…','monte',['descend','disparaît','change de couleur'],'Plus il fait chaud, plus il monte.'],
 ['Quand il fait froid, le liquide du thermomètre…','descend',['monte','disparaît','reste pareil'],'Il descend.'],
 ['Quelle température correspond à une journée très chaude ?','35 °C',['5 °C','0 °C','−5 °C'],'35 °C : très chaud.'],
 ['Quelle température correspond à un jour de neige ?','−2 °C',['25 °C','35 °C','40 °C'],'Sous 0 °C, il gèle.',2],
 ['Pour lire le thermomètre, je regarde…','le haut du liquide',['le bas du tube','la couleur du mur','la forme du thermomètre'],'On lit le nombre en face du haut du liquide.'],
 {tf:'Plus le liquide est haut, plus il fait chaud.',v:true,e:'Le liquide monte avec la chaleur.'},
 {tf:'Le plateau qui descend porte l’objet le plus léger.',v:false,e:'Le plateau qui descend porte l’objet le plus lourd.'},
 {n:'Le thermomètre montre 25. Quelle température (en °C) ?',a:25,u:'°C',e:'25 °C.'}]});

E('cp-sc-aliments',{w:.6,items:[
 ['Le yaourt est un…','produit laitier',['féculent','fruit','légume'],'Il est fait avec du lait.'],
 ['Les pâtes sont des…','féculents',['fruits','produits laitiers','légumes'],'Féculents et céréales.'],
 ['La carotte est un…','légume',['fruit','produit laitier','féculent'],'Un légume.'],
 ['La pomme est un…','fruit',['légume','produit laitier','féculent'],'Un fruit.'],
 ['L’œuf fait partie de la famille…','viandes, poissons, œufs',['fruits et légumes','produits laitiers','boissons'],'Une protéine.'],
 ['Le pain est fait avec de la…','farine',['viande','confiture','glace'],'Farine de blé.',2],
 ['La seule boisson indispensable est…','l’eau',['le soda','le sirop','le jus sucré'],'On boit de l’eau.'],
 ['Le lait vient d’un animal. C’est un aliment d’origine…','animale',['végétale','minérale','mécanique'],'Animal.',2],
 ['Le riz est un aliment d’origine…','végétale',['animale','minérale','magique'],'Il vient d’une plante.',2],
 {tf:'Il faut manger un peu de chaque famille d’aliments.',v:true,e:'Pour être en bonne santé.'},
 {tf:'Les bonbons sont à manger en grande quantité.',v:false,e:'Ils sont très sucrés.'}]});

E('cp-sc-corps',{w:.6,items:[
 ['Le coude est une…','articulation du bras',['partie de la jambe','partie du pied','partie de la tête'],'Il plie le bras.'],
 ['Le genou est une…','articulation de la jambe',['partie du bras','partie de la tête','partie de la main'],'Il plie la jambe.'],
 ['Les os forment…','le squelette',['la peau','les muscles','les cheveux'],'Le squelette tient le corps debout.'],
 ['Le crâne protège…','le cerveau',['le cœur','l’estomac','les poumons'],'Dans la tête.',2],
 ['Que permet une articulation ?','bouger les os',['faire grandir les cheveux','manger','dormir'],'Plier ou tourner.'],
 ['Qui a deux bras et deux jambes ?','le corps humain',['la voiture','le poisson','la chaise'],'Notre corps.'],
 ['Le poignet est entre…','la main et l’avant-bras',['le genou et le pied','la tête et le cou','le ventre et la jambe'],'Il fait tourner la main.',2],
 ['La cheville est entre…','le pied et la jambe',['la main et le bras','la tête et le cou','le coude et l’épaule'],'Elle permet de tourner le pied.',2],
 {tf:'On a un squelette à l’intérieur du corps.',v:true,e:'Les os le tiennent debout.'},
 {tf:'Le genou est dans le bras.',v:false,e:'Le genou est dans la jambe.'},
 {n:'Combien de bras avons-nous ?',a:2,e:'Deux bras.'}]});

E('cp-sc-hygiene',{w:.6,items:[
 ['Quand faut-il se laver les mains ?','avant de manger',['jamais','seulement le dimanche','quand on a envie'],'Pour enlever les microbes.'],
 ['Combien de fois par jour se brosse-t-on les dents ?','2 fois (matin et soir)',['0 fois','1 fois par semaine','10 fois'],'Matin et soir.'],
 ['Pour être en forme, je dors…','beaucoup la nuit',['très peu','pas du tout','seulement le jour'],'Environ 10 à 11 heures à ton âge.'],
 ['Pour être en forme, je…','bouge tous les jours',['reste toujours assis','ne joue jamais','regarde un écran toute la journée'],'Le sport est bon pour la santé.'],
 ['Avant de dormir, il vaut mieux…','éviter les écrans',['regarder la télé','jouer sur la tablette','regarder un téléphone'],'Les écrans gênent le sommeil.'],
 ['On se lave les mains aussi…','après les toilettes',['jamais','avant d’aller au lit seulement','une fois par an'],'Pour éviter les microbes.'],
 ['Un repas équilibré, c’est…','un peu de tout',['seulement des bonbons','seulement des frites','rien du tout'],'Manger varié.'],
 {tf:'Les microbes sont invisibles à l’œil nu.',v:true,e:'On ne les voit pas, mais ils existent.'},
 {tf:'Se brosser les dents protège les dents.',v:true,e:'Cela évite les caries.'},
 {tf:'On peut regarder la télévision tard le soir sans problème.',v:false,e:'Le sommeil est important.'}]});

E('cp-hg-jour-saisons',{w:.5,items:[
 ['Quand il fait nuit, la Lune et les étoiles se voient…','dans le ciel',['sous la terre','dans la mer','dans la maison'],'On les voit la nuit.'],
 ['En été, il fait en général…','chaud',['froid','très froid','de la neige'],'Les jours sont longs.'],
 ['En hiver, il fait en général…','froid',['chaud','très chaud','sec'],'Les jours sont courts.'],
 ['Au printemps, les fleurs…','commencent à pousser',['tombent','gèlent','disparaissent'],'Il fait plus doux.'],
 ['En automne, les feuilles…','tombent des arbres',['poussent','gèlent','brillent'],'Les feuilles changent de couleur.'],
 {tf:'Le Soleil se couche parce que la Terre tourne.',v:true,e:'C’est la Terre qui tourne.',d:2},
 {tf:'Il y a 4 saisons dans une année.',v:true,e:'Printemps, été, automne, hiver.'},
 {tf:'On voit le Soleil la nuit.',v:false,e:'La nuit, notre côté de la Terre est dans l’ombre.'},
 ['Quelle saison commence l’année en France ?','l’hiver',['l’été','le printemps','l’automne'],'L’année commence en hiver.',2]]});

E('cp-hg-mesurer-temps',{w:.5,items:[
 ['Pour savoir l’heure, je regarde…','une horloge ou une montre',['un sablier','un calendrier','un globe'],'Elle donne l’heure.'],
 ['Pour savoir quel jour on est, je regarde…','le calendrier',['la montre','le sablier','la règle'],'Il donne les dates.'],
 ['Pour mesurer 1 minute, je peux utiliser…','un sablier ou un chronomètre',['un calendrier','une carte','un livre'],'Courte durée.'],
 ['Un réveil sonne…','à l’heure qu’on a choisie',['quand il veut','jamais','tous les jours à midi'],'On le règle.'],
 {tf:'Le sablier donne la date.',v:false,e:'Il mesure une durée.'},
 {tf:'Le calendrier permet de savoir quel jour on est.',v:true,e:'Jours, mois, année.'},
 {tf:'L’emploi du temps montre ce qu’on fait pendant la journée à l’école.',v:true,e:'Les activités du jour.'},
 ['Combien de jours dans une semaine ?','7',['5','10','12'],'Lundi à dimanche.'],
 {n:'Combien de mois dans une année ?',a:12,e:'De janvier à décembre.'}]});

E('cp-hg-avant-apres',{w:.5,items:[
 ['Quand je suis né, c’était…','dans le passé',['dans le futur','dans le présent','demain'],'C’est déjà arrivé.'],
 ['L’année prochaine, c’est…','dans le futur',['dans le passé','hier','avant-hier'],'Ce n’est pas encore arrivé.'],
 ['Hier, j’ai mangé. C’est…','le passé',['le futur','le présent','demain'],'Hier est passé.'],
 ['Demain, j’irai à l’école. C’est…','le futur',['le passé','le présent','hier'],'Demain n’est pas arrivé.'],
 ['Sur une frise, ce qui est arrivé le plus récemment est…','à droite',['à gauche','en haut','en bas'],'On lit de gauche à droite.'],
 ['Le bébé a grandi. Qu’est-ce qui vient d’abord ?','il est bébé',['il est adulte','il est grand-père','il est un enfant de 10 ans'],'On est bébé avant d’être grand.'],
 {tf:'Aujourd’hui, c’est le présent.',v:true,e:'Maintenant.'},
 {tf:'Mon grand-père est plus jeune que moi.',v:false,e:'Il est né avant moi.'},
 {o:['bébé','enfant','adulte','grand-parent'],q:'Remets dans l’ordre d’une vie :',e:'Bébé, enfant, adulte, grand-parent.',d:2}]});

E('cp-hg-se-reperer',{w:.5,items:[
 ['Pour aller aux toilettes, je me rends…','aux sanitaires',['dans la bibliothèque','dans la cour de récréation','au portail'],'Les sanitaires.'],
 ['À droite de moi veut dire…','du côté de ma main droite',['du côté de ma main gauche','derrière moi','au plafond'],'Ma main droite.'],
 ['Derrière moi, c’est…','dans mon dos',['devant moi','à ma gauche','au plafond'],'À l’opposé de devant.'],
 ['Sur le plan de la classe, la porte est…','une ouverture dans le mur',['une table','un livre','un élève'],'On la voit sur le plan.',2],
 {tf:'Le plan est dessiné vu de côté.',v:false,e:'Il est vu de dessus.'},
 {tf:'La cantine sert à manger.',v:true,e:'On y mange à midi.'},
 ['Je veux jouer. Je vais dans…','la cour de récréation',['la classe pendant la leçon','le couloir seul','les sanitaires'],'Pour jouer.'],
 ['Quel mot dit où est le tableau ?','devant',['demain','vite','content'],'Mot de position.']]});

E('cp-hg-monde',{w:.5,items:[
 ['La planète où nous vivons s’appelle…','la Terre',['la Lune','le Soleil','Mars'],'La Terre.'],
 ['Sur la Terre, il y a plus…','d’eau que de terre',['de terre que d’eau','de glace','de sable'],'Les océans couvrent beaucoup de place.'],
 ['Quel est un océan ?','l’Atlantique',['l’Europe','l’Asie','la Seine'],'Atlantique, Pacifique, Indien.'],
 ['Quel est un continent ?','l’Afrique',['le Pacifique','l’Atlantique','la Loire'],'Six continents.'],
 ['La France est en…','Europe',['Afrique','Asie','Océanie'],'En Europe.'],
 ['Sur une carte, le Sud est…','en bas',['en haut','à droite','à gauche'],'Nord en haut, Sud en bas.'],
 ['Sur une carte, l’Ouest est…','à gauche',['à droite','en haut','en bas'],'Ouest à gauche.',2],
 {tf:'Il y a 6 continents.',v:true,e:'Europe, Afrique, Asie, Amérique, Océanie, Antarctique.'},
 {tf:'Le globe est plat.',v:false,e:'Le globe est une boule ; le planisphère est plat.'}]});

E('cp-emc-emotions',{w:.5,items:[
 ['Quand je suis content, je ressens…','de la joie',['de la peur','de la colère','de la tristesse'],'Je souris.'],
 ['Quand j’ai peur du noir, je peux…','le dire à un adulte',['crier seul','me cacher sans rien dire','frapper quelqu’un'],'On en parle.'],
 ['Quand je suis en colère, je peux…','respirer et dire ce que je ressens',['taper un camarade','crier très fort','casser un jouet'],'Je me calme avec des mots.'],
 ['Mon ami est triste. Je peux…','lui parler gentiment',['me moquer','l’ignorer','partir en courant'],'Je suis gentil.'],
 ['Quelle émotion montre ce visage : 😮 ?','la surprise',['la tristesse','la colère','la joie'],'La bouche ouverte.'],
 ['Quelle émotion montre ce visage : 😢 ?','la tristesse',['la joie','la colère','la surprise'],'Des larmes.'],
 {tf:'On peut dire « je suis en colère » avec des mots.',v:true,e:'Les mots aident.'},
 {tf:'Être triste est interdit.',v:false,e:'Toutes les émotions sont normales.'},
 {tf:'Quand j’ai peur, j’en parle à un adulte de confiance.',v:true,e:'Il peut m’aider.'}]});

E('cp-emc-regles',{w:.5,items:[
 ['Quand le maître parle, je…','l’écoute',['crie','cours','joue avec mes voisins'],'J’écoute pour apprendre.'],
 ['Pour sortir de la classe en rang, je…','reste calme',['pousse mes camarades','crie','cours'],'En rang, calmement.'],
 ['Dans la cour, je ne dois pas…','faire mal aux autres',['jouer','courir','rire'],'On respecte les autres.'],
 ['Dans la classe, je range mes affaires pour…','que tout soit en ordre',['faire du bruit','perdre mes affaires','embêter mes voisins'],'Ranger aide tout le monde.'],
 ['Pour jouer avec les autres, je…','respecte les règles du jeu',['triche','pousse','change les règles tout seul'],'Un jeu a des règles.'],
 {tf:'Les règles sont les mêmes pour tout le monde.',v:true,e:'Tous les respectent.'},
 {tf:'Je peux crier en classe si j’en ai envie.',v:false,e:'On respecte les autres.'},
 {tf:'Si je casse un objet, je dois en parler.',v:true,e:'Je m’excuse et j’aide à réparer.'}]});

E('cp-emc-droits-enfant',{w:.5,items:[
 ['Tous les enfants ont le droit d’être…','soignés quand ils sont malades',['punis sans raison','laissés seuls','privés d’école'],'Le droit à la santé.'],
 ['Tous les enfants ont le droit d’avoir…','un nom',['un téléphone','un vélo','un chien'],'Le droit à l’identité.'],
 ['Tous les enfants ont le droit de…','jouer et se reposer',['travailler à l’usine','conduire','rester seuls dehors la nuit'],'Le jeu est un droit.'],
 ['Tous les enfants ont le droit de…','donner leur avis',['frapper','mentir','voler'],'On les écoute.'],
 ['Si un adulte me fait du mal, je dois…','en parler à un adulte de confiance',['me taire','faire pareil','partir seul'],'On a le droit d’être protégé.'],
 {tf:'Les filles et les garçons ont les mêmes droits.',v:true,e:'Tous les enfants sont égaux.'},
 {tf:'Les enfants n’ont pas le droit d’aller à l’école.',v:false,e:'Tous les enfants ont droit à l’éducation.'},
 {tf:'Les droits de l’enfant sont écrits dans un texte de l’ONU.',v:true,e:'La Convention de 1989.',d:2}]});

E('cp-emc-intimite',{w:.5,items:[
 ['Mon corps…','m’appartient',['appartient aux autres','est à celui qui veut','appartient à la classe'],'Je décide de mon corps.'],
 ['Si on me demande de garder un secret qui me fait peur, je…','le dis à un adulte de confiance',['le garde','le crie dans la rue','le garde pour toujours'],'Un secret qui fait peur ne se garde pas.'],
 ['Pour être propre, je me lave…','avec de l’eau et du savon',['avec du sable','avec du jus','avec de la boue'],'Le savon enlève les microbes.'],
 ['Les toilettes, c’est un lieu…','privé',['public','pour jouer','pour manger'],'On ferme la porte.'],
 ['Quand je suis mal à l’aise, je peux…','dire non et partir',['sourire','rester','obéir'],'Je peux dire non.'],
 {tf:'Je peux dire non si un geste me gêne.',v:true,e:'Mon corps m’appartient.'},
 {tf:'On doit montrer son corps à tout le monde.',v:false,e:'Mon intimité est protégée.'},
 {tf:'Un adulte de confiance peut m’aider.',v:true,e:'Parents, enseignant, infirmière…'}]});

E('cp-emc-republique',{w:.5,items:[
 ['Le drapeau français a…','trois couleurs',['une couleur','deux couleurs','cinq couleurs'],'Bleu, blanc, rouge.'],
 ['La Marseillaise est…','un chant national',['un menu','un jeu','un dessin animé'],'On la chante dans les cérémonies.'],
 ['Où voit-on souvent le drapeau ?','sur la mairie',['dans le frigo','sous le lit','dans le sable'],'Sur les bâtiments publics.'],
 ['Le 14 juillet, c’est…','la fête nationale',['Noël','Pâques','la rentrée'],'On fait des défilés et des feux d’artifice.'],
 ['Marianne est un symbole de…','la République',['la météo','la cuisine','le sport'],'Son buste est dans les mairies.'],
 {tf:'La devise de la République est « Liberté, Égalité, Fraternité ».',v:true,e:'Trois mots.'},
 {tf:'Le drapeau français est rouge et noir.',v:false,e:'Il est bleu, blanc, rouge.'},
 {o:['bleu','blanc','rouge'],q:'Remets les couleurs du drapeau dans l’ordre :',e:'Bleu, blanc, rouge.'}]});

/* ---------- Lot 3 vague 1 pédagogie (23/10/2026) : anglais CP (vocabulaire et phrases simples, sans audio) ---------- */
E('cp-en-hello',{w:.6,items:[
 ['Que veut dire « Hello » ?','bonjour',['au revoir','merci','bonne nuit'],'Hello = bonjour.'],
 ['Que veut dire « Goodbye » ?','au revoir',['bonjour','merci','s’il te plaît'],'Goodbye = au revoir.'],
 ['Comment dire « bonjour » en anglais ?','Hello',['Goodbye','Sorry','Please'],'Hello.'],
 ['Comment dire « au revoir » en anglais ?','Goodbye',['Hello','Good morning','Hi'],'Goodbye.'],
 ['« My name is Tom. » veut dire…','Je m’appelle Tom.',['J’ai Tom ans.','Voici Tom.','Tom est ici.'],'My name is… = Je m’appelle…'],
 ['« What’s your name? » veut dire…','Comment t’appelles-tu ?',['Quel âge as-tu ?','Où habites-tu ?','Comment vas-tu ?'],'Question sur le prénom.'],
 ['« How are you? » veut dire…','Comment vas-tu ?',['Comment t’appelles-tu ?','Quel âge as-tu ?','Où es-tu ?'],'How are you?'],
 ['Que répondre à « How are you? » ?','I’m fine, thank you.',['My name is Léa.','I’m six.','Goodbye.'],'Je vais bien, merci.'],
 ['« Good morning » se dit…','le matin',['le soir','la nuit','à midi'],'Good morning = bonjour (le matin).',2],
 {tf:'« Hi » veut dire « salut ».',v:true,e:'Hi = salut.'},
 {tf:'« Goodbye » veut dire « bonjour ».',v:false,e:'Goodbye = au revoir.'},
 {tf:'« Thank you » veut dire « merci ».',v:true,e:'Thank you = merci.'}]});

E('cp-en-colours',{w:.6,items:[
 ['« Red » veut dire…','rouge',['bleu','vert','jaune'],'Red = rouge.'],
 ['« Blue » veut dire…','bleu',['rouge','vert','jaune'],'Blue = bleu.'],
 ['« Green » veut dire…','vert',['bleu','rouge','blanc'],'Green = vert.'],
 ['« Yellow » veut dire…','jaune',['vert','rouge','noir'],'Yellow = jaune.'],
 ['« Black » veut dire…','noir',['blanc','rose','marron'],'Black = noir.'],
 ['« White » veut dire…','blanc',['noir','rose','violet'],'White = blanc.'],
 ['« Pink » veut dire…','rose',['rouge','orange','marron'],'Pink = rose.',2],
 ['« Brown » veut dire…','marron',['noir','gris','violet'],'Brown = marron.',2],
 ['Comment dit-on « vert » en anglais ?','green',['red','blue','black'],'Green.'],
 ['Comment dit-on « jaune » en anglais ?','yellow',['blue','white','brown'],'Yellow.'],
 ['Une banane est…','yellow',['blue','black','pink'],'A banana is yellow.'],
 ['Le ciel est souvent…','blue',['red','brown','black'],'The sky is blue.'],
 {tf:'« It’s red » veut dire « C’est rouge ».',v:true,e:'It’s red = c’est rouge.'},
 {tf:'« Orange » est une couleur en anglais.',v:true,e:'Orange est aussi une couleur.',d:2}]});

E('cp-en-numbers',{w:.6,items:[
 ['« Three » veut dire…','trois',['deux','quatre','cinq'],'Three = 3.'],
 ['« Five » veut dire…','cinq',['quatre','six','sept'],'Five = 5.'],
 ['« Seven » veut dire…','sept',['six','huit','neuf'],'Seven = 7.'],
 ['« Ten » veut dire…','dix',['neuf','onze','douze'],'Ten = 10.'],
 ['Comment dit-on « deux » en anglais ?','two',['one','three','four'],'Two.'],
 ['Comment dit-on « huit » en anglais ?','eight',['six','seven','nine'],'Eight.'],
 ['Comment dit-on « douze » en anglais ?','twelve',['eleven','ten','twenty'],'Twelve.',2],
 ['Quel nombre vient après « four » ?','five',['three','six','two'],'1, 2, 3, 4, 5.'],
 ['Quel nombre vient avant « nine » ?','eight',['ten','seven','six'],'8, 9.'],
 ['Comment dire « J’ai six ans » ?','I’m six.',['I’m five.','I like six.','My name is six.'],'I’m + âge.'],
 {n:'Combien font « two + one » ? (écris le nombre)',a:3,e:'2 + 1 = 3 : three.'},
 {tf:'« One » veut dire « un ».',v:true,e:'One = 1.'},
 {tf:'« Eleven » veut dire « onze ».',v:true,e:'Eleven = 11.',d:2}]});

E('cp-en-animals',{w:.6,items:[
 ['« Dog » veut dire…','chien',['chat','cheval','vache'],'Dog = chien.'],
 ['« Cat » veut dire…','chat',['chien','oiseau','lapin'],'Cat = chat.'],
 ['« Bird » veut dire…','oiseau',['poisson','grenouille','cochon'],'Bird = oiseau.'],
 ['« Fish » veut dire…','poisson',['oiseau','lapin','cheval'],'Fish = poisson.'],
 ['« Horse » veut dire…','cheval',['vache','cochon','ours'],'Horse = cheval.'],
 ['« Pig » veut dire…','cochon',['vache','cheval','chat'],'Pig = cochon.',2],
 ['« Frog » veut dire…','grenouille',['poisson','oiseau','lapin'],'Frog = grenouille.',2],
 ['Comment dit-on « vache » en anglais ?','cow',['pig','dog','cat'],'Cow.'],
 ['Comment dit-on « lapin » en anglais ?','rabbit',['bear','bird','horse'],'Rabbit.'],
 ['Comment dit-on « ours » en anglais ?','bear',['bird','cow','pig'],'Bear.',2],
 {tf:'Au pluriel, on ajoute souvent un s : two dogs.',v:true,e:'One dog, two dogs.'},
 {tf:'« Cat » veut dire « chien ».',v:false,e:'Cat = chat.'},
 ['« It’s a dog. » veut dire…','C’est un chien.',['C’est un chat.','C’est une vache.','C’est un oiseau.'],'It’s a dog.']]});

E('cp-en-family',{w:.6,items:[
 ['« Mum » veut dire…','maman',['papa','sœur','frère'],'Mum = maman.'],
 ['« Dad » veut dire…','papa',['maman','sœur','bébé'],'Dad = papa.'],
 ['« Brother » veut dire…','frère',['sœur','papa','maman'],'Brother = frère.'],
 ['« Sister » veut dire…','sœur',['frère','maman','mamie'],'Sister = sœur.'],
 ['« Grandma » veut dire…','mamie',['papi','maman','bébé'],'Grandma = mamie.',2],
 ['« Grandpa » veut dire…','papi',['mamie','papa','frère'],'Grandpa = papi.',2],
 ['« Baby » veut dire…','bébé',['frère','mamie','papa'],'Baby = bébé.'],
 ['Comment dit-on « papa » en anglais ?','dad',['mum','sister','baby'],'Dad.'],
 ['Comment dire « Voici ma sœur » ?','This is my sister.',['This is my brother.','This is my mum.','This is my dad.'],'This is my sister.'],
 ['« I have got a brother. » veut dire…','J’ai un frère.',['J’ai une sœur.','Je suis un frère.','J’aime mon frère.'],'I have got = j’ai.',2],
 {tf:'« This is my mum » veut dire « Voici ma maman ».',v:true,e:'This is my… = Voici mon/ma…'},
 {tf:'« Sister » veut dire « frère ».',v:false,e:'Sister = sœur.'}]});

E('cp-en-days-food',{w:.6,items:[
 ['« Monday » veut dire…','lundi',['mardi','dimanche','samedi'],'Monday = lundi.'],
 ['« Friday » veut dire…','vendredi',['jeudi','samedi','lundi'],'Friday = vendredi.'],
 ['« Sunday » veut dire…','dimanche',['samedi','lundi','jeudi'],'Sunday = dimanche.'],
 ['Quel jour vient après « Monday » ?','Tuesday',['Sunday','Wednesday','Friday'],'Monday, Tuesday.'],
 ['Quel jour vient après « Friday » ?','Saturday',['Thursday','Sunday','Monday'],'Friday, Saturday.',2],
 ['Les jours en anglais s’écrivent avec…','une majuscule',['un chiffre','un accent','un tiret'],'Monday, Tuesday…'],
 ['« Apple » veut dire…','pomme',['banane','gâteau','lait'],'Apple = pomme.'],
 ['« Banana » veut dire…','banane',['pomme','carotte','chocolat'],'Banana = banane.'],
 ['« Milk » veut dire…','lait',['gâteau','chocolat','carotte'],'Milk = lait.'],
 ['« I like apples. » veut dire…','J’aime les pommes.',['Je n’aime pas les pommes.','Je mange une pomme.','Je vois des pommes.'],'I like = j’aime.'],
 ['« I don’t like milk. » veut dire…','Je n’aime pas le lait.',['J’aime le lait.','Je bois du lait.','Je vois du lait.'],'I don’t like = je n’aime pas.'],
 {tf:'« Carrot » veut dire « chocolat ».',v:false,e:'Carrot = carotte.'},
 {o:['Monday','Tuesday','Wednesday'],q:'Remets ces jours dans l’ordre :',e:'Monday, Tuesday, Wednesday.'}]});

E('cp-en-classroom',{w:.6,items:[
 ['« Listen! » veut dire…','Écoute !',['Regarde !','Répète !','Assieds-toi !'],'Listen = écoute.'],
 ['« Look! » veut dire…','Regarde !',['Écoute !','Répète !','Lève-toi !'],'Look = regarde.'],
 ['« Repeat! » veut dire…','Répète !',['Écoute !','Regarde !','Silence !'],'Repeat = répète.'],
 ['« Sit down! » veut dire…','Assieds-toi !',['Lève-toi !','Écoute !','Répète !'],'Sit down = assieds-toi.'],
 ['« Stand up! » veut dire…','Lève-toi !',['Assieds-toi !','Regarde !','Écoute !'],'Stand up = lève-toi.'],
 ['« Be quiet! » veut dire…','Silence !',['Répète !','Regarde !','Écoute !'],'Be quiet = silence.'],
 ['« Open your book! » veut dire…','Ouvre ton livre !',['Ferme ton livre !','Regarde le tableau !','Écoute !'],'Open = ouvre.',2],
 ['Le maître dit « Sit down! ». Je…','m’assois',['me lève','chante','sors'],'Sit down.'],
 ['Le maître dit « Stand up! ». Je…','me lève',['m’assois','dors','chante'],'Stand up.'],
 {tf:'« Sit down » et « Stand up » sont des contraires.',v:true,e:'S’asseoir / se lever.'},
 {tf:'« Listen! » veut dire « Regarde ! ».',v:false,e:'Listen = écoute.'}]});
})();
