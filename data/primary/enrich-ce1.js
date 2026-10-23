/* Finot Académie — CE1 : enrichissement V8.13 (variété des questions + activités hors écran).
   Programmes : français et mathématiques 2024 (BO n°41 du 31/10/2024) ; questionner le monde 2020 ; EMC 2024 ; EVAR 2025 ;
   arts plastiques, éducation musicale, EPS 2020. Les activités « hors écran » ne sont pas évaluées par l'application. */
(function(){
'use strict';
const MQ=window.MQPrimary;if(!MQ)return;const E=MQ.enrich;const T=(t,h)=>({t,h});
const HE=(icon,titre,{but,consigne,duree,materiel,securite,auto})=>T(`${icon} ${titre}`,`<p><b>Pourquoi ?</b> ${but}</p><p><b>Ce que tu fais :</b> ${consigne}</p><p><b>Durée :</b> ${duree}${materiel?` · <b>Matériel :</b> ${materiel}`:''}</p>${securite?`<p><b>Sécurité :</b> ${securite}</p>`:''}<p><b>Je m’auto-évalue :</b> ${auto}</p><p><small>Activité à faire sans écran, avec un adulte. L’application ne la note pas.</small></p>`);

/* ---------- Français ---------- */
E('ce1-fr-lettres-muettes',{items:[
 ['Quelle est la lettre muette de « chat » ?','t',['c','h','a'],'On l’entend dans « chatte » : chat.'],
 ['Quelle est la lettre muette de « grand » ?','d',['g','r','n'],'On l’entend dans « grande ».'],
 ['Quelle est la lettre muette de « blanc » ?','c',['b','l','n'],'On l’entend dans « blanche ».'],
 ['Quelle est la lettre muette de « gris » ?','s',['g','r','i'],'On l’entend dans « grise ».'],
 ['Quelle est la lettre muette de « long » ?','g',['l','o','n'],'On l’entend dans « longue ».'],
 ['Quelle est la lettre muette de « petit » ?','t',['p','e','i'],'On l’entend dans « petite ».'],
 ['Quelle est la lettre muette de « bavard » ?','d',['b','v','r'],'On l’entend dans « bavarder ».'],
 ['Quelle est la lettre muette de « tapis » ?','s',['t','p','i'],'On l’entend dans « tapisser ».'],
 ['Quelle est la lettre muette de « sport » ?','t',['s','p','r'],'On l’entend dans « sportif ».'],
 ['Quelle est la lettre muette de « dent » ?','t',['d','e','n'],'On l’entend dans « dentiste ».'],
 ['Quel mot permet de trouver la lettre muette de « lait » ?','laitier',['lapin','laver','lame'],'Lait → laitier : on entend le t.',2],
 ['Quel mot permet de trouver la lettre muette de « rang » ?','ranger',['ramer','rater','râper'],'Rang → ranger : on entend le g.',2],
 {t:'Complète avec la lettre muette : un ban… (on dit « banquette »)',a:['banc'],e:'banc → banquette.',d:3},
 {t:'Complète avec la lettre muette : le fusi… (on dit « fusiller »)',a:['fusil'],e:'fusil → fusiller : la lettre muette est l.',d:3}]});
E('ce1-fr-comprendre',{items:[
 ['« Léo met son manteau et son bonnet avant de sortir. » Quel temps fait-il probablement ?','il fait froid',['il fait très chaud','il pleut des bonbons','c’est la nuit d’été'],'Manteau et bonnet : il fait froid.'],
 ['« Lina a les yeux qui brillent : elle ouvre son cadeau. » Que ressent Lina ?','de la joie',['de la peur','de la colère','de l’ennui'],'Les yeux qui brillent et le cadeau montrent la joie.'],
 ['« Le soir, Tom range ses jouets puis se brosse les dents. » Que va faire Tom ensuite ?','aller se coucher',['aller à l’école','déjeuner','partir en vacances'],'Le soir, après les dents, on va dormir.'],
 ['« Dans la forêt, le loup guettait le petit lapin. » Qui guettait ?','le loup',['le petit lapin','la forêt','le chasseur'],'C’est le loup qui guettait.'],
 ['« Dans la forêt, le loup guettait le petit lapin. » Où se passe l’histoire ?','dans la forêt',['à la mer','en ville','à l’école'],'Le texte dit : dans la forêt.']]});
E('ce1-fr-familles',{items:[
 ['Quel mot est de la famille de « dent » ?','dentiste',['danse','dinde','tente'],'Dentiste a le même radical « dent ».'],
 ['Quel mot est de la famille de « fleur » ?','fleuriste',['flèche','flûte','fleuve'],'Fleuriste : fleur.'],
 ['Quel mot est de la famille de « jardin » ?','jardinier',['jaune','jambe','jarre'],'Jardinier : jardin.'],
 ['Quel mot est de la famille de « lait » ?','laitier',['laid','laisser','lame'],'Laitier : lait.'],
 ['Quel mot est de la famille de « terre » ?','terrain',['tirer','terrible','tarte'],'Terrain : terre.'],
 ['Quel mot est de la famille de « chant » ?','chanteur',['champ','chaton','chance'],'Chanteur : chant.'],
 ['Quel mot n’est pas de la famille de « mer » ?','merci',['marin','maritime','marée'],'« merci » n’a rien à voir avec la mer.',2],
 ['Que veut dire « re- » dans « relire » ?','de nouveau',['le contraire','petit','avant'],'Relire = lire de nouveau.'],
 ['Que veut dire « -ette » dans « maisonnette » ?','petit',['grand','de nouveau','le contraire'],'Une maisonnette est une petite maison.'],
 ['Quel mot veut dire « une petite fille » ?','une fillette',['une filleule','une filiale','une fille'],'-ette = petit.'],
 ['Quel mot veut dire « monter de nouveau » ?','remonter',['démonter','monteur','montagne'],'re- = de nouveau.',2],
 ['Quel est le mot de base de « boulangerie » ?','boulanger',['boule','bouger','bouillir'],'La boulangerie est le magasin du boulanger.',2],
 {t:'Écris le nom du métier de la famille de « pain » : le …',a:['boulanger'],e:'Celui qui fait le pain est le boulanger.',d:3},
 {t:'Écris le nom du métier de la famille de « coiffer » : le …',a:['coiffeur'],e:'coiffer → coiffeur.',d:3}]});
E('ce1-fr-types-phrases',{items:[
 ['Quelle phrase donne un ordre ?','Range ta chambre.',['Tu ranges ta chambre ?','Ta chambre est rangée.','Quelle belle chambre !'],'Elle donne un ordre : phrase impérative.'],
 ['Quelle phrase est à la forme négative ?','Je ne joue pas.',['Je joue.','Joues-tu ?','Joue !'],'ne … pas : forme négative.'],
 ['Mets à la forme négative : « Il pleut. »','Il ne pleut pas.',['Il pleut pas.','Il ne pleut.','Ne il pleut pas.'],'ne … pas entoure le verbe.'],
 ['Quel signe termine une phrase interrogative ?','?',['.','!',','],'Une question se termine par « ? ».'],
 ['« Comme il est grand ! » est une phrase…','exclamative',['interrogative','négative','impérative'],'Elle exprime un sentiment avec « ! ».'],
 ['Transforme en question : « Tu viens. »','Tu viens ?',['Tu viens.','Viens !','Tu ne viens pas.'],'À l’écrit, on ajoute « ? ».']]});
E('ce1-fr-pronoms',{items:[
 ['Quel pronom remplace « Lucas » ?','il',['elle','nous','ils'],'Lucas → il.'],
 ['Quel pronom remplace « Emma » ?','elle',['il','vous','elles'],'Emma → elle.'],
 ['Quel pronom remplace « les garçons » ?','ils',['elles','il','nous'],'Les garçons → ils.'],
 ['Quel pronom remplace « les filles » ?','elles',['ils','elle','vous'],'Les filles → elles.'],
 ['Quel pronom remplace « Léa et moi » ?','nous',['vous','ils','elles'],'X et moi → nous.'],
 ['Quel pronom remplace « toi et Paul » ?','vous',['nous','ils','tu'],'Toi et Paul → vous.'],
 ['Quel pronom remplace « Tom et Lisa » ?','ils',['elles','nous','il'],'Un garçon et une fille → ils.'],
 ['Quel pronom remplace « le chien » ?','il',['elle','ils','on'],'Le chien → il.'],
 ['Quel pronom remplace « la voiture » ?','elle',['il','ils','vous'],'La voiture → elle.'],
 ['Complète : « … chantons ensemble. »','Nous',['Vous','Ils','Je'],'chantons va avec nous.'],
 ['Complète : « … avez faim ? »','Vous',['Nous','Tu','Ils'],'avez va avec vous.'],
 ['Complète : « … suis content. »','Je',['Tu','Il','Nous'],'suis va avec je.',2],
 ['Pourquoi utilise-t-on un pronom ?','pour éviter de répéter un nom',['pour faire une faute','pour finir la phrase','pour poser une question'],'Le pronom remplace le nom.']]});
const DICT=w=>({f:()=>MQ.H.txt('🎧 Écoute et écris la phrase :',[w],{audio:{t:w,l:'fr-FR'},strict:true,lang:'fr',chips:['é','è','à','ç'],hint:'Écoute, écris, puis relis les accords.',expl:`On écrit : <b>${w}</b>`})});
E('ce1-fr-dictee',{items:[DICT('Les enfants jouent dans la cour.'),DICT('Ma sœur a un petit chat gris.'),DICT('Nous allons à la piscine.'),DICT('Le vent souffle très fort.'),DICT('Mes amis mangent des pommes.'),DICT('Il fait beau ce matin.')],w:.4});
E('ce1-ma-figures',{items:[
 ['Avec quel outil vérifie-t-on un angle droit ?','l’équerre',['le compas','la gomme','le taille-crayon'],'L’équerre a un angle droit.'],
 ['Avec quel outil trace-t-on un cercle ?','le compas',['l’équerre','la règle seule','le crayon seul'],'Le compas trace des cercles.'],
 ['Un carré a combien d’angles droits ?','4',['2','3','0'],'Le carré a 4 angles droits.'],
 ['Un rectangle a combien d’angles droits ?','4',['1','2','3'],'Le rectangle a 4 angles droits.'],
 ['Quelle figure a 4 côtés égaux et 4 angles droits ?','le carré',['le rectangle','le triangle','le cercle'],'C’est la définition du carré.'],
 ['Quelle figure a 4 angles droits et des côtés opposés égaux deux à deux ?','le rectangle',['le triangle','le cercle','le losange quelconque'],'C’est le rectangle.']]});
E('ce1-ma-solides',{items:[
 {n:'Combien de faces a un cube ?',a:6,e:'6 faces carrées.'},{n:'Combien d’arêtes a un cube ?',a:12,e:'12 arêtes.'},{n:'Combien de sommets a un cube ?',a:8,e:'8 sommets.'},
 {n:'Combien de faces a un pavé ?',a:6,e:'6 faces rectangulaires.'},{n:'Combien de sommets a un pavé ?',a:8,e:'8 sommets.'},{n:'Combien d’arêtes a un pavé ?',a:12,e:'12 arêtes.'},
 ['Une arête, c’est…','le bord où deux faces se rencontrent',['une face plate','un coin pointu','le dessous du solide'],'Une arête est un segment entre deux faces.'],
 ['Un sommet, c’est…','un coin où se rejoignent des arêtes',['une face','le centre du solide','une ligne courbe'],'Le sommet est un coin.'],
 ['Les faces d’un cube sont des…','carrés',['triangles','cercles','rectangles allongés'],'Toutes les faces du cube sont des carrés.'],
 ['Les faces d’un pavé sont des…','rectangles',['cercles','triangles','losanges'],'Le pavé a 6 faces rectangulaires.'],
 ['Quel solide n’a ni face plate ni arête ?','la boule',['le cube','le pavé','le cylindre'],'La boule est toute ronde.'],
 ['Un dé est un…','cube',['pavé','cylindre','cône'],'Le dé est un cube.'],
 ['Une brique de lait a souvent la forme d’un…','pavé',['cube parfait','cône','boule'],'Ses faces sont des rectangles.',2]]});

/* ---------- Questionner le monde ---------- */
E('ce1-qm-plantes',{items:[
 ['De quoi une plante a-t-elle besoin pour vivre ?','d’eau, de lumière, d’air et de sels minéraux',['seulement de musique','de bonbons','de rien'],'Ce sont les besoins des plantes.'],
 ['Quelle partie de la plante est sous la terre ?','la racine',['la fleur','la feuille','le fruit'],'Les racines puisent l’eau dans le sol.'],
 ['Quelle partie de la plante donne le fruit ?','la fleur',['la racine','la tige','la terre'],'La fleur devient un fruit.'],
 ['Dans le fruit, il y a…','des graines',['des racines','des feuilles','des cailloux'],'Les graines sont dans le fruit.'],
 ['Une graine qui commence à pousser…','germe',['fond','gèle','s’envole toujours'],'C’est la germination.'],
 ['Une plante sans lumière…','jaunit et dépérit',['grandit plus vite','devient bleue','reste toujours pareille'],'La lumière est indispensable.'],
 ['La tige sert à…','porter les feuilles et transporter l’eau',['respirer sous l’eau','faire des graines','marcher'],'La tige soutient et transporte.'],
 {o:['la graine','la germination','la jeune plante','la plante en fleur'],q:'Range les étapes de la vie d’une plante :',e:'graine → germination → jeune plante → plante en fleur'}]});
E('ce1-qm-sante',{items:[
 ['Les premières dents d’un enfant s’appellent…','les dents de lait',['les dents de sagesse','les crocs','les défenses'],'Puis viennent les dents définitives.'],
 ['Vers 6 ans, les dents de lait…','tombent et sont remplacées',['deviennent noires','grandissent pour toujours','disparaissent sans être remplacées'],'Les dents définitives poussent.'],
 ['Combien de temps doit durer un brossage de dents ?','2 minutes environ',['5 secondes','1 heure','une journée'],'2 minutes, matin et soir.'],
 ['Un repas équilibré contient…','un peu de tout',['seulement des pâtes','seulement des gâteaux','seulement de la viande'],'On varie les aliments.'],
 ['Quel aliment est un fruit ?','une pomme',['une frite','un gâteau','un fromage'],'La pomme est un fruit.'],
 ['Les produits laitiers, comme le yaourt, apportent du…','calcium pour les os',['sucre seulement','sable','rien'],'Le calcium rend les os solides.'],
 ['Combien d’heures dort environ un enfant de 7 ans ?','environ 10 heures',['2 heures','5 heures','20 heures'],'Il a besoin de beaucoup de sommeil.'],
 ['Les aliments très sucrés, on en mange…','peu',['beaucoup, à tous les repas','à la place de l’eau','à chaque récré'],'Le sucre abîme les dents.'],
 ['Avant de manger, je…','me lave les mains',['joue dans la terre','caresse le chat sans me laver','rien'],'Mains propres = moins de microbes.'],
 ['Quelle boisson choisir à table ?','de l’eau',['du soda','du sirop pur','du café'],'L’eau est la boisson indispensable.']]});
E('ce1-qm-eau',{items:[
 ['La glace qui devient de l’eau liquide, c’est…','la fusion',['la solidification','l’évaporation','la condensation'],'Fondre = fusion.'],
 ['L’eau qui devient de la glace, c’est…','la solidification',['la fusion','l’évaporation','la condensation'],'Geler = solidification.'],
 ['Le linge qui sèche au soleil : l’eau…','s’évapore',['gèle','fond','devient du sable'],'L’eau devient vapeur.'],
 ['La buée sur un miroir froid, c’est…','la condensation',['la fusion','l’évaporation','la solidification'],'La vapeur redevient de petites gouttes.'],
 ['À quelle température la glace fond-elle ?','0 °C',['100 °C','50 °C','10 °C'],'La glace fond à 0 °C.'],
 ['La vapeur d’eau est de l’eau…','gazeuse',['solide','liquide','en poudre'],'La vapeur est un gaz.']]});
E('ce1-qm-electricite',{items:[
 ['Pour que l’ampoule s’allume, le circuit doit être…','fermé',['ouvert','cassé','mouillé'],'Le courant passe dans un circuit fermé.'],
 ['Une pile sert à…','fournir l’électricité',['éclairer toute seule','refroidir','mesurer'],'La pile est la source d’électricité.'],
 ['Que faut-il JAMAIS faire avec une prise électrique ?','y mettre un objet ou les doigts',['brancher un appareil avec un adulte','la regarder','passer à côté'],'C’est très dangereux.'],
 ['Pourquoi éloigne-t-on l’eau des appareils électriques ?','l’eau et l’électricité ensemble sont dangereuses',['l’eau les fait mieux marcher','ce n’est pas grave','pour les décorer'],'Risque d’électrocution.'],
 ['L’interrupteur sert à…','allumer et éteindre',['donner de l’eau','faire de la musique','couper du papier'],'Il ouvre ou ferme le circuit.'],
 ['Lequel fonctionne avec l’électricité ?','une lampe',['un vélo','un crayon','une cuillère'],'La lampe a besoin d’électricité.'],
 ['Lequel fonctionne avec une pile ?','une lampe de poche',['un frigo','un four','une machine à laver'],'La lampe de poche a une pile.'],
 ['Un fil électrique abîmé, je…','ne le touche pas et je préviens un adulte',['le touche','le coupe moi-même','le mets dans l’eau'],'Danger : on prévient un adulte.'],
 ['Pour qu’un circuit simple marche, il faut…','une pile, des fils et une ampoule reliés en boucle',['seulement une ampoule','seulement des fils','une pile toute seule'],'La boucle doit être fermée.'],
 {tf:'Les piles de 4,5 V utilisées en classe sont sans danger, mais la prise de la maison est dangereuse.',v:true,e:'Le courant des prises (230 V) peut tuer.',d:2},
 ['Dans un circuit, si on enlève l’ampoule, les autres éléments…','ne fonctionnent plus : le circuit est ouvert',['marchent mieux','deviennent chauds','s’allument tout seuls'],'Le circuit est coupé : le courant ne passe plus.'],
 ['Quel objet n’a pas besoin d’électricité ?','une trottinette sans moteur',['une télévision','un aspirateur','un ordinateur'],'La trottinette avance grâce à tes jambes.'],
 ['Pour débrancher un appareil, je tire…','sur la prise, pas sur le fil',['sur le fil','avec les pieds','avec les mains mouillées'],'Tirer sur le fil peut l’abîmer.',2]]});
E('ce1-qm-temps',{items:[
 {n:'Combien d’années dans un siècle ?',a:100,e:'1 siècle = 100 ans.'},{n:'Combien d’années dans une décennie ?',a:10,e:'1 décennie = 10 ans.'},{n:'Combien d’années dans un millénaire ?',a:1000,e:'1 millénaire = 1 000 ans.'},
 ['En quel siècle sommes-nous ?','le XXIe siècle',['le XXe siècle','le XIXe siècle','le Ier siècle'],'Les années 2001 à 2100 forment le XXIe siècle.'],
 ['Autrefois, sans électricité, on s’éclairait avec…','des bougies et des lampes à huile',['des écrans','des ampoules LED','des téléphones'],'L’éclairage électrique est récent.'],
 ['Avant les voitures, on voyageait souvent…','à cheval ou en calèche',['en avion','en fusée','en trottinette électrique'],'Le cheval était un moyen de transport.'],
 ['Pour savoir comment vivaient nos grands-parents, on peut…','les interroger et regarder de vieilles photos',['regarder la météo','lire un livre de cuisine','compter les étoiles'],'Les témoignages et les photos racontent le passé.'],
 {o:['mes grands-parents enfants','mes parents enfants','moi enfant'],q:'Range du plus ancien au plus récent :',e:'grands-parents → parents → moi'}]});
E('ce1-qm-paysages',{items:[
 ['Un paysage avec beaucoup d’immeubles est…','une ville',['une campagne','une montagne','un littoral'],'Beaucoup de bâtiments : c’est la ville.'],
 ['Un paysage avec des champs et des fermes est…','une campagne',['une ville','un littoral','une montagne'],'Champs et fermes : la campagne.'],
 ['Un paysage au bord de la mer est…','un littoral',['une montagne','une campagne','un désert'],'Le littoral, c’est le bord de mer.'],
 ['La légende d’une carte sert à…','expliquer les couleurs et les symboles',['faire joli','dire l’heure','donner la météo'],'Elle explique la carte.']]});
E('ce1-qm-france',{items:[
 ['Quelle est la capitale de la France ?','Paris',['Lyon','Marseille','Lille'],'Paris est la capitale.'],
 ['Quel fleuve traverse Paris ?','la Seine',['la Loire','le Rhône','la Garonne'],'La Seine traverse Paris.'],
 ['Quelle mer se trouve au sud de la France ?','la mer Méditerranée',['la Manche','la mer du Nord','la mer Baltique'],'La Méditerranée borde le sud.'],
 ['Quel océan borde l’ouest de la France ?','l’océan Atlantique',['l’océan Pacifique','l’océan Indien','la mer Rouge'],'L’Atlantique est à l’ouest.'],
 ['Quelle mer sépare la France de l’Angleterre ?','la Manche',['la Méditerranée','la mer Noire','la mer Rouge'],'La Manche est au nord-ouest.'],
 ['Quel est le plus long fleuve de France ?','la Loire',['la Seine','la Garonne','le Rhône'],'La Loire est le plus long fleuve de France.'],
 ['Quelle chaîne de montagnes se trouve entre la France et l’Espagne ?','les Pyrénées',['les Alpes','le Jura','les Vosges'],'Les Pyrénées.'],
 ['Où se trouve le mont Blanc ?','dans les Alpes',['dans les Pyrénées','en Bretagne','à Paris'],'Le mont Blanc est dans les Alpes.'],
 ['Sur quel continent se trouve la France ?','l’Europe',['l’Asie','l’Afrique','l’Amérique'],'La France est en Europe.'],
 ['Quel fleuve passe à Lyon ?','le Rhône',['la Seine','la Loire','la Garonne'],'Le Rhône (et la Saône) passent à Lyon.',2],
 ['Quel fleuve passe à Bordeaux ?','la Garonne',['la Seine','le Rhône','la Loire'],'La Garonne passe à Bordeaux.',2],
 ['Quelle grande ville se trouve au bord de la Méditerranée ?','Marseille',['Lille','Strasbourg','Brest'],'Marseille est un grand port de la Méditerranée.'],
 ['Quelle chaîne de montagnes est à l’est, près de la Suisse et de l’Italie ?','les Alpes',['les Pyrénées','le Massif central','les Vosges'],'Les Alpes sont à l’est.'],
 ['La France a la forme d’un…','hexagone (6 côtés)',['cercle','triangle','carré parfait'],'On appelle la France métropolitaine l’Hexagone.']]});

/* ---------- EMC ---------- */
E('ce1-emc-differences',{items:[
 ['« Les filles ne savent pas jouer au foot. » C’est…','un stéréotype',['une vérité','une règle','une loi'],'C’est une idée toute faite, fausse.'],
 ['Un camarade a un handicap. Je…','le respecte et je l’aide s’il le demande',['me moque','l’exclus du jeu','l’imite'],'On respecte chacun.'],
 ['Nous sommes tous…','différents et égaux en dignité',['pareils','plus ou moins importants','classés par taille'],'Chacun a la même valeur.']]});
E('ce1-emc-harcelement',{items:[
 ['Le numéro gratuit contre le harcèlement est…','le 3018',['le 15','le 12','le 3615'],'Le 3018 aide les victimes de harcèlement.'],
 ['Un témoin de harcèlement peut…','prévenir un adulte',['rire','filmer','encourager'],'Le témoin aide en alertant.'],
 ['Le harcèlement, ce sont des violences…','répétées',['qui arrivent une seule fois par erreur','toujours gentilles','imaginaires'],'C’est répété contre une même personne.']]});
E('ce1-emc-civilite',{items:[
 ['En arrivant à l’école, je dis…','bonjour',['rien','au revoir','tais-toi'],'On salue les personnes.'],
 ['Quand on me donne quelque chose, je dis…','merci',['non','pardon','bonjour'],'Merci exprime la reconnaissance.'],
 ['Pour demander quelque chose poliment, je dis…','s’il te plaît',['donne !','vite !','tout de suite !'],'S’il te plaît rend la demande polie.']]});
E('ce1-emc-republique',{items:[
 ['L’école publique est laïque : elle…','accueille tous les enfants, quelle que soit leur religion',['n’accepte qu’une religion','est réservée à certains','est payante'],'La laïcité permet de vivre ensemble.'],
 ['Que signifie « Égalité » dans la devise ?','tout le monde a les mêmes droits',['tout le monde a la même taille','tout le monde pense pareil','tout le monde a le même prénom'],'Les mêmes droits pour tous.'],
 ['Que signifie « Fraternité » ?','être solidaire, s’entraider',['être frère et sœur seulement','se disputer','être seul'],'C’est l’entraide entre tous.']]});

/* ---------- Arts, musique, EPS, EVAR ---------- */
E('ce1-ap-lignes-formes',{items:[
 ['Une ligne qui forme des vagues est…','ondulée',['droite','brisée','pointillée'],'Ondulée = comme des vagues.'],
 ['Une ligne en zigzag est…','brisée',['courbe','droite','ondulée'],'Brisée = des angles.'],
 ['Une ligne qui tourne autour d’un centre en s’éloignant est…','une spirale',['une droite','un point','une croix'],'Comme un escargot.']],
 parts:[HE('🎨','Atelier hors écran : le tableau des lignes',{but:'utiliser différentes lignes pour créer un motif.',consigne:'Partage une feuille en 4 cases. Dans chaque case, remplis avec un seul type de ligne : droites, courbes, brisées, spirales. Puis invente un motif qui se répète sur une bande de papier.',duree:'25 minutes',materiel:'feuille, feutres',auto:'Mes 4 cases utilisent 4 lignes différentes ; mon motif se répète au moins 5 fois.'})]});
E('ce1-ap-chaud-froid',{parts:[HE('🎨','Atelier hors écran : chaud ou froid ?',{but:'sentir l’effet des couleurs chaudes et froides.',consigne:'Peins le même dessin deux fois : une fois avec des couleurs chaudes (rouge, orange, jaune), une fois avec des couleurs froides (bleu, vert, violet). Dis à un adulte ce que chaque dessin te fait ressentir.',duree:'30 minutes',materiel:'peinture ou crayons de couleur, 2 feuilles',auto:'J’ai utilisé seulement des couleurs chaudes, puis seulement des froides, et j’ai expliqué la différence.'})]});
E('ce1-ap-genres',{parts:[HE('🖼️','Atelier hors écran : mon autoportrait',{but:'réaliser un portrait en observant.',consigne:'Regarde-toi dans un miroir. Dessine ton visage : forme, yeux, nez, bouche, cheveux. Ajoute un objet que tu aimes. C’est ton autoportrait !',duree:'25 minutes',materiel:'miroir, feuille, crayons',auto:'Mon dessin montre les parties du visage à la bonne place.'})]});
E('ce1-mu-parametres',{items:[
 ['Reconnaître une flûte d’un violon grâce à leur « couleur » de son, c’est le…','timbre',['tempo','volume','silence'],'Le timbre permet de reconnaître le son.'],
 ['Un son fort ou doux, c’est…','l’intensité',['la hauteur','la durée','le timbre'],'Fort / doux = intensité.'],
 ['Un son aigu ou grave, c’est…','la hauteur',['l’intensité','la durée','le timbre'],'Aigu / grave = hauteur.'],
 ['Un son long ou court, c’est…','la durée',['la hauteur','l’intensité','le timbre'],'Long / court = durée.']],
 parts:[HE('🎵','Activité musicale hors écran : le jeu des quatre familles du son',{but:'reconnaître hauteur, intensité, durée et timbre.',consigne:'Un adulte produit des sons (voix, verre tapé avec une cuillère, porte, papier froissé). Toi, les yeux fermés, tu dis : aigu ou grave ? fort ou doux ? long ou court ? Quel objet ?',duree:'15 minutes',materiel:'objets de la maison',auto:'J’ai reconnu au moins 3 objets et décrit chaque son avec les bons mots.'})]});
E('ce1-mu-chanter',{items:[
 ['La partie d’une chanson qui revient avec les mêmes paroles est…','le refrain',['le couplet','le titre','le silence'],'Le refrain se répète.'],
 ['Les parties d’une chanson dont les paroles changent sont…','les couplets',['les refrains','les silences','les titres'],'Chaque couplet a ses paroles.'],
 ['Chanter tous ensemble, c’est chanter en…','chœur',['solo','silence','canon toujours'],'Le chœur chante ensemble.']],
 parts:[HE('🎤','Activité musicale hors écran : la chorale de la maison',{but:'chanter juste et ensemble.',consigne:'Apprends une chanson avec un adulte. Chante les couplets seul et le refrain ensemble. Tenez-vous droits et respirez avant chaque phrase.',duree:'15 minutes',materiel:'une chanson connue',auto:'Je connais le refrain par cœur et je chante en même temps que l’autre.'})]});
E('ce1-mu-oeuvres',{parts:[HE('🎧','Activité musicale hors écran : écoute active',{but:'reconnaître des instruments dans une œuvre.',consigne:'Écoute avec un adulte un extrait de « Pierre et le loup » (Prokofiev). Lève la main quand tu entends l’oiseau (flûte), le canard (hautbois), le chat (clarinette), le loup (cors).',duree:'15 minutes',materiel:'un enregistrement de l’œuvre',auto:'J’ai reconnu au moins 2 personnages grâce à leur instrument.'})]});
E('ce1-eps-orientation',{items:[
 ['Avant de partir, j’oriente mon plan, c’est-à-dire…','je le tourne pour qu’il soit dans le même sens que le lieu',['je le plie','je le colorie','je le retourne'],'Le plan et le lieu doivent correspondre.'],
 ['Pour me repérer, j’utilise des éléments…','fixes (arbre, banc, bâtiment)',['qui bougent (chien, voiture)','imaginaires','dans le ciel seulement'],'Les repères fixes ne bougent pas.'],
 ['Sur un plan, une balise est représentée souvent par…','un rond',['un carré noir','une étoile filante','un smiley'],'Le rond marque une balise.']],
 parts:[HE('🧭','Mission hors écran : la chasse au trésor',{but:'lire un plan pour trouver des objets cachés.',consigne:'Un adulte dessine le plan d’une pièce ou du jardin et y marque 3 croix. Il cache un objet à chaque croix. Oriente le plan et trouve les 3 objets.',duree:'20 minutes',materiel:'papier, crayon, 3 petits objets',securite:'jouer dans un lieu sûr, sans traverser de rue.',auto:'J’ai trouvé les 3 objets en m’aidant seulement du plan.'})]});
E('ce1-eps-gym',{items:[
 ['Pour faire une roulade avant, je mets…','le menton sur la poitrine',['la tête en arrière','les bras dans le dos','les yeux fermés'],'Menton rentré pour protéger le cou.'],
 ['On fait la roulade…','sur un tapis',['sur le carrelage','sur une table','dans l’escalier'],'Le tapis protège.'],
 ['Pour tenir en équilibre sur un pied, je…','fixe un point devant moi',['ferme les yeux','tourne la tête vite','saute sans arrêt'],'Fixer un point aide l’équilibre.']],
 parts:[HE('🤸','Mission hors écran : les statues d’équilibre',{but:'travailler l’équilibre en sécurité.',consigne:'Tiens 5 secondes sur un pied, puis sur l’autre. Fais la statue de la cigogne, de l’avion (bras écartés, une jambe en arrière). Compte les secondes.',duree:'10 minutes',materiel:'un sol dégagé, un tapis si possible',securite:'loin des meubles ; un adulte surveille.',auto:'Je tiens 5 secondes sur chaque pied sans poser l’autre.'})]});
E('ce1-eps-opposition',{items:[
 ['Au début d’un jeu d’opposition, je…','salue mon partenaire',['le pousse','tourne le dos','crie'],'Le salut montre le respect.'],
 ['Quand l’adulte dit « stop », je…','m’arrête tout de suite',['continue','tire plus fort','pars'],'On s’arrête au signal.'],
 ['Il est interdit de viser…','la tête et le cou',['le tapis','le sol','rien'],'On ne touche jamais la tête ni le cou.']],
 parts:[HE('🤼','Mission hors écran : le jeu des déménageurs',{but:'lutter en respectant l’autre.',consigne:'Sur un tapis, avec un adulte : l’un est à quatre pattes, l’autre essaie doucement de le retourner sur le dos en 10 secondes. On se salue avant et après.',duree:'10 minutes',materiel:'un tapis ou un matelas',securite:'pas de coup, pas de tête ni de cou, arrêt immédiat au signal.',auto:'J’ai salué, respecté les règles et arrêté au signal.'})]});
E('ce1-evar-grandir',{items:[
 ['Chaque corps est…','unique',['identique aux autres','à comparer','à cacher'],'Chaque corps est différent.'],
 ['Avoir confiance en soi, c’est savoir que…','j’ai de la valeur',['je suis meilleur que tout le monde','je ne dois rien apprendre','je dois être parfait'],'J’ai de la valeur comme je suis.'],
 ['Si quelqu’un veut me montrer des images qui me gênent, je…','refuse et j’en parle à un adulte de confiance',['regarde en secret','garde le secret','les montre aux autres'],'On protège son intimité.']],
 parts:[HE('💛','Moment hors écran : mes fiertés',{but:'prendre confiance en soi.',consigne:'Écris ou dessine 3 choses que tu sais bien faire et 1 chose que tu as apprise récemment. Partage-les avec un adulte.',duree:'10 minutes',materiel:'feuille, crayons',auto:'J’ai trouvé 3 fiertés et je les ai dites à voix haute.'})]});
E('ce1-evar-relations',{items:[
 ['Un bon ami…','m’écoute et me respecte',['se moque de moi','m’oblige à faire des choses','me laisse seul quand j’ai besoin'],'L’amitié repose sur le respect.'],
 ['Filles et garçons peuvent-ils être amis ?','oui',['non','seulement le week-end','seulement à la maison'],'Bien sûr !'],
 ['Pour régler une dispute, je…','parle calmement et j’écoute l’autre',['tape','boude pour toujours','crie plus fort'],'On se parle pour se comprendre.']],
 parts:[HE('🤝','Moment hors écran : la recette de l’amitié',{but:'réfléchir à ce qui fait une bonne relation.',consigne:'Avec un adulte, écris « la recette d’un bon ami » : 3 ingrédients (ex. écoute, partage, respect) et 1 chose à ne jamais mettre (ex. moquerie).',duree:'10 minutes',materiel:'feuille, crayon',auto:'Ma recette contient 3 qualités et j’explique pourquoi elles sont importantes.'})]});
E('ce1-evar-stereotypes',{items:[
 ['« Le rose, c’est pour les filles. » C’est…','un stéréotype',['une règle','une loi','une vérité scientifique'],'Chacun peut aimer la couleur qu’il veut.'],
 ['Un garçon peut-il faire de la danse ?','oui',['non','seulement en secret','seulement s’il est grand'],'Toutes les activités sont pour tous.'],
 ['Une fille peut-elle devenir pilote d’avion ?','oui',['non','seulement en rêve','seulement si elle est grande'],'Tous les métiers sont ouverts à tous.']],
 parts:[HE('⚖️','Moment hors écran : métiers pour tous',{but:'repérer et dépasser les stéréotypes.',consigne:'Avec un adulte, cherchez dans un livre ou un magazine 2 personnes qui font un métier « inattendu » (une pompière, un sage-femme…). Dessine-les.',duree:'15 minutes',materiel:'livres ou magazines, feuille',auto:'J’ai trouvé 2 exemples et j’explique pourquoi c’est possible pour tout le monde.'})]});

/* ---------- Lot 2 vague 1 pédagogie (23/10/2026) : variété des exercices d'EMC au CE1 ---------- */
E('ce1-emc-alerter',{w:.85,items:[
 ['Pour une urgence médicale, on appelle le…','15',['17','18','119'],'Le 15, c’est le SAMU.'],
 ['Pour la police ou la gendarmerie, on appelle le…','17',['15','18','112'],'Le 17.'],
 ['Pour un incendie, on appelle le…','18',['15','17','119'],'Le 18, les pompiers.'],
 ['Le numéro d’urgence valable dans toute l’Europe est le…','112',['110','122','911'],'Le 112.'],
 ['Pour un enfant en danger, on peut appeler le…','119',['18','15','17'],'Allô Enfance en danger, gratuit.'],
 ['Que veut dire « protéger, alerter, secourir » ?','les trois gestes à faire en cas d’accident',['trois jeux','trois repas','trois fêtes'],'D’abord éviter un nouvel accident, puis appeler, puis aider.',2],
 ['Dans un message d’alerte, il faut donner…','son adresse et ce qui s’est passé',['sa couleur préférée','le menu du repas','son film préféré'],'Les secours doivent savoir où aller.'],
 ['Quand on appelle les secours, on raccroche…','quand on nous le dit',['tout de suite','avant de donner l’adresse','sans rien dire'],'On attend les consignes.',2],
 {tf:'On peut appeler le 18 pour s’amuser.',v:false,e:'Cela peut empêcher de sauver quelqu’un.'},
 {tf:'Les appels aux numéros d’urgence sont gratuits.',v:true,e:'On peut les appeler sans payer.',d:2},
 {n:'Quel numéro appelle-t-on pour les pompiers ?',a:18,e:'Le 18.'},
 {o:['Je protège','J’alerte','Je secours'],q:'Remets les trois gestes dans l’ordre :',e:'Protéger, alerter, secourir.',d:2}]});

E('ce1-emc-civilite',{w:.85,items:[
 ['Quand on reçoit un cadeau, on dit…','merci',['rien','non','bof'],'Remercier est poli.'],
 ['Pour demander quelque chose poliment, on dit…','s’il vous plaît',['donne-moi','vite','tout de suite'],'La politesse rend la vie agréable.'],
 ['Dans une file d’attente, on…','attend son tour',['double tout le monde','pousse','crie'],'Chacun son tour.'],
 ['Dans le bus, on laisse sa place à…','une personne âgée ou fatiguée',['un ami qui joue','personne','le plus fort'],'C’est un geste de civilité.'],
 ['Pour entrer chez quelqu’un, on…','frappe ou on sonne avant',['entre sans rien dire','casse la porte','crie'],'On respecte les lieux et les personnes.'],
 ['Parler à un adulte comme à un copain est…','à éviter : on adapte sa façon de parler',['obligatoire','toujours très poli','un jeu'],'On adapte son langage.',2],
 ['Quand on se trompe et que l’on gêne quelqu’un, on dit…','pardon, excuse-moi',['c’est pas moi','tant pis','tu l’as mérité'],'S’excuser est poli.'],
 {tf:'Dire bonjour fait partie de la civilité.',v:true,e:'Saluer, c’est respecter.'},
 {tf:'Jeter ses papiers par terre est une marque de civilité.',v:false,e:'C’est un manque de respect pour le lieu.'},
 {tf:'On peut refuser poliment quelque chose.',v:true,e:'Politesse ne veut pas dire se laisser faire.',d:2},
 {o:['Je frappe à la porte','J’attends la réponse','J’entre','Je dis bonjour'],q:'Remets dans l’ordre pour entrer poliment dans une pièce :',e:'On frappe, on attend, on entre, on salue.',d:3}]});

E('ce1-emc-differences',{w:.85,items:[
 ['Nous sommes tous différents mais nous avons tous…','les mêmes droits',['le même âge','les mêmes goûts','la même taille'],'Égaux en droits.'],
 ['Une idée toute faite comme « les garçons ne savent pas danser » est…','un stéréotype',['une loi','une vérité','un jeu'],'Un stéréotype est une idée simplifiée.',2],
 ['Si un camarade en fauteuil roulant ne peut pas monter les marches, on…','cherche un moyen de l’aider à accéder aux lieux',['le laisse dehors','se moque','le cache'],'On cherche l’égalité d’accès.',2],
 ['Se moquer d’une différence peut…','blesser et devenir de la discrimination',['faire rire tout le monde sans mal','être un jeu','être autorisé'],'La moquerie fait du mal.'],
 ['Un camarade parle une autre langue à la maison. Tu…','l’accueilles avec respect',['t’en moques','l’ignores','le critiques'],'Les différences sont une richesse.'],
 ['La dignité, c’est…','le respect dû à chaque personne',['la richesse','la force','la vitesse'],'Tout le monde mérite le respect.',2],
 {tf:'Être différent veut dire ne pas avoir les mêmes droits.',v:false,e:'On est différent et égal en droits.'},
 {tf:'Une blague qui fait mal à quelqu’un n’est pas drôle.',v:true,e:'Elle blesse.'},
 {tf:'Les filles et les garçons peuvent faire les mêmes sports.',v:true,e:'Il n’y a pas de sport réservé aux garçons ou aux filles.'},
 {tf:'Chacun mérite le respect, même s’il est différent.',v:true,e:'C’est le principe de dignité.'},
 ['Si un camarade est moqué, que peux-tu faire ?','l’aider et prévenir un adulte',['rire avec les autres','filmer','ne rien dire jamais'],'On ne laisse pas faire.']]});

E('ce1-emc-harcelement',{w:.85,items:[
 ['Le harcèlement, c’est quand…','une personne est attaquée de façon répétée',['on se dispute une seule fois','on joue ensemble','on gagne un jeu'],'Répété, contre la même personne.'],
 ['Dans une situation de harcèlement, un témoin est…','quelqu’un qui voit ce qui se passe',['celui qui frappe','celui qui est attaqué','le directeur seulement'],'Il peut agir en prévenant un adulte.',2],
 ['Si je suis victime de harcèlement, je dois…','en parler à un adulte de confiance',['me taire','faire pareil à un autre','ne plus aller à l’école'],'On ne reste pas seul.'],
 ['Le numéro contre le harcèlement est le…','3018 (cyber) ou 3020',['18','15','17'],'Ce sont des numéros d’aide.',3],
 ['Si je vois un camarade moqué, je…','ne rigole pas et je préviens un adulte',['rigole avec les autres','filme','change de sujet'],'Rire encourage le harcèlement.'],
 ['Qui a la responsabilité d’arrêter le harcèlement ?','les adultes et chacun d’entre nous',['seulement la victime','seulement le plus petit','personne'],'C’est l’affaire de tous.',2],
 {tf:'Le harcèlement peut avoir lieu par message ou en ligne.',v:true,e:'On parle de cyberharcèlement.',d:2},
 {tf:'Il faut garder le secret si on est harcelé.',v:false,e:'On en parle à un adulte.'},
 {tf:'Un harcèlement est interdit par la loi.',v:true,e:'Il est puni.',d:3},
 ['Le mot « cible » désigne…','la personne attaquée',['celui qui prévient','l’adulte','le directeur'],'On l’appelle aussi la victime.',2]]});

E('ce1-emc-republique',{w:.85,items:[
 ['Dans la devise « Liberté, Égalité, Fraternité », « Fraternité » veut dire…','s’entraider',['se battre','gagner seul','obéir'],'Fraternité : solidarité.'],
 ['La laïcité garantit…','la liberté de croire ou de ne pas croire',['une seule religion','aucune liberté','le silence'],'Chacun est libre.'],
 ['L’école publique accueille…','tous les enfants',['seulement une religion','seulement les riches','seulement les garçons'],'Elle est ouverte à tous.'],
 ['L’hymne national s’appelle…','La Marseillaise',['Frère Jacques','Joyeux Noël','Au clair de la lune'],'On la chante lors des cérémonies.'],
 ['La fête nationale est le…','14 juillet',['25 décembre','1er janvier','11 novembre'],'En souvenir de 1789 et 1790.'],
 ['Marianne symbolise…','la République',['un roi','un animal','un sport'],'On la voit dans les mairies.'],
 {tf:'L’égalité veut dire que tous ont les mêmes droits.',v:true,e:'Égalité des droits.'},
 {tf:'La laïcité interdit de croire en une religion.',v:false,e:'Elle protège la liberté de croire ou non.'},
 {tf:'Le drapeau est bleu, blanc, rouge.',v:true,e:'Les trois couleurs.'},
 {o:['Liberté','Égalité','Fraternité'],q:'Remets les mots de la devise dans l’ordre :',e:'Liberté, Égalité, Fraternité.'},
 ['La liberté s’arrête…','là où commence celle des autres',['jamais','à la maison','au portail'],'On respecte les autres.',2]]});
})();
