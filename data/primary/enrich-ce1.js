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

/* ---------- Lot 3 vague 1 pédagogie (23/10/2026) : variété des exercices au CE1 (français, maths, QLM, EMC) ---------- */
E('ce1-fr-alphabet',{w:.6,items:[
 ['Combien de lettres y a-t-il dans l’alphabet ?','26',['24','20','30'],'De a à z.'],
 ['Quelle lettre vient juste après « m » ?','n',['l','o','k'],'…, l, m, n, o…'],
 ['Quelle lettre vient juste avant « r » ?','q',['s','p','t'],'…, p, q, r, s…'],
 ['Quel mot vient en premier dans le dictionnaire ?','arbre',['lune','table','zèbre'],'a est la première lettre.'],
 ['Quel mot vient en dernier dans le dictionnaire ?','zèbre',['arbre','lune','table'],'z est la dernière lettre.'],
 ['Entre « bateau » et « bonbon », quel mot vient en premier ?','bateau',['bonbon'],'Même première lettre b ; on compare la deuxième : a avant o.'],
 ['Dans un dictionnaire, « v. » veut dire…','verbe',['village','vite','voiture'],'v. = verbe.'],
 ['Dans un dictionnaire, « n. » veut dire…','nom',['nombre','nuit','non'],'n. = nom.',2],
 ['Dans un dictionnaire, « adj. » veut dire…','adjectif',['adverbe','article','adresse'],'adj. = adjectif.',2],
 {o:['chat','lapin','souris'],q:'Range ces mots dans l’ordre alphabétique :',e:'c, l, s.'},
 {o:['poire','pomme','prune'],q:'Range ces mots dans l’ordre alphabétique (compare la 2e et la 3e lettre) :',e:'poire (poi), pomme (pom), prune (pr).',d:2},
 {tf:'On range les mots selon leur longueur dans un dictionnaire.',v:false,e:'On suit l’ordre alphabétique.'},
 {t:'Écris la lettre qui vient juste après « c » :',a:['d'],e:'a, b, c, d.'}]});

E('ce1-fr-familles',{w:.6,items:[
 ['Quel mot est de la même famille que « jardin » ?','jardinier',['jaune','jambe','jeu'],'Le radical jardin.'],
 ['Quel mot est de la même famille que « dent » ?','dentiste',['dindon','danse','dans'],'Le radical dent.'],
 ['Quel mot est de la même famille que « terre » ?','terrain',['terrible','tarte','tente'],'Le radical terr.',2],
 ['Quel mot est de la même famille que « chant » ?','chanteur',['champ','chat','chaud'],'Il chante.',2],
 ['Quel mot est de la même famille que « fleur » ?','fleuriste',['fleuve','flou','flotte'],'Le radical fleur.',2],
 ['Quel mot est l’intrus dans la famille de « lait » ?','laid',['laitier','laitage','allaiter'],'Laid n’a pas de lien de sens avec lait.',2],
 ['Que veut dire « re- » dans « refaire » ?','de nouveau',['contre','avant','sans'],'Refaire : faire de nouveau.'],
 ['Que veut dire « -ette » dans « maisonnette » ?','petite',['grande','vieille','nouvelle'],'Une petite maison.',2],
 ['Le contraire de « faire » avec le préfixe « dé- » est…','défaire',['refaire','préfaire','surfaire'],'Défaire.'],
 {tf:'« Pomme » et « pompier » sont de la même famille.',v:false,e:'Ils commencent pareil mais le sens n’est pas lié.'},
 {tf:'« Chanter » et « chanteur » sont de la même famille.',v:true,e:'Même radical chant.'}]});

E('ce1-fr-types-phrases',{w:.6,items:[
 ['Quelle phrase est déclarative ?','Le soleil brille.',['Le soleil brille-t-il ?','Brille, soleil !','Quel beau soleil !'],'Elle raconte un fait.'],
 ['Quelle phrase est interrogative ?','Où vas-tu ?',['Va vite !','Je vais au parc.','Quel beau parc !'],'Elle pose une question.'],
 ['Quelle phrase est impérative ?','Range ta chambre.',['Tu ranges ta chambre.','Ranges-tu ta chambre ?','Elle range sa chambre.'],'Elle donne un ordre.'],
 ['Quelle phrase est négative ?','Il ne pleut pas.',['Il pleut.','Pleut-il ?','Quelle pluie !'],'ne … pas encadre le verbe.'],
 ['Quel signe termine une phrase interrogative ?','le point d’interrogation',['le point','la virgule','les deux-points'],'?'],
 ['Mets à la forme négative : « Tom dort. »','Tom ne dort pas.',['Tom dort pas.','Tom ne dort.','Tom pas dort.'],'On encadre le verbe.'],
 ['Mets à la forme négative : « Elle chante. »','Elle ne chante pas.',['Elle chante pas.','Elle ne chante.','Elle pas chante.'],'ne … pas.'],
 ['Transforme en question avec « Est-ce que » : « Tu viens. »','Est-ce que tu viens ?',['Tu viens est-ce que ?','Est-ce tu viens.','Viens est-ce que tu ?'],'Est-ce que + phrase.',2],
 {tf:'Une phrase impérative sert à donner un ordre.',v:true,e:'Range ! Viens !'},
 {tf:'Une phrase exclamative se termine par un point d’exclamation.',v:true,e:'Quel beau chien !'},
 {tf:'Dans « Il ne mange pas », le verbe est encadré par ne … pas.',v:true,e:'ne mange pas.'},
 {t:'Écris le mot qui manque : Il ne joue … (négation)',a:['pas'],e:'ne … pas.'}]});

E('ce1-fr-sujet-verbe',{w:.6,items:[
 ['Dans « Le chat dort. », le verbe est…','dort',['chat','le','Le chat'],'Il dit ce que fait le chat.'],
 ['Dans « Léa chante. », le sujet est…','Léa',['chante','Léa chante','la chanson'],'Qui est-ce qui chante ? Léa.'],
 ['Pour trouver le sujet, je pose la question…','Qui est-ce qui … ?',['Où … ?','Quand … ?','Combien … ?'],'Qui est-ce qui + verbe.'],
 ['Dans « Les oiseaux chantent. », le sujet est…','les oiseaux',['chantent','oiseaux chantent','le matin'],'Qui est-ce qui chante ?'],
 ['Dans « Mon frère mange une pomme. », le verbe est…','mange',['frère','pomme','mon'],'Il dit l’action.'],
 ['Dans « Nous jouons. », le sujet est…','nous',['jouons','jouer','joues'],'Un pronom sujet.'],
 ['Pour trouver le verbe, je change…','le temps (hier, demain)',['la couleur','la taille','le nom'],'Le verbe change avec le temps.'],
 ['Quelle phrase a le mot « je » comme sujet ?','Je lis un livre.',['Lis ce livre.','Le livre est beau.','Un livre ici.'],'Le sujet est « je ».'],
 {tf:'Le verbe peut être encadré par ne … pas.',v:true,e:'Il ne dort pas.'},
 {tf:'Le sujet est toujours un nom propre.',v:false,e:'Ce peut être un nom, un groupe nominal ou un pronom.',d:2},
 {t:'Écris le verbe : « Le chien aboie. »',a:['aboie'],e:'Aboie.'},
 {t:'Écris le sujet : « Maman cuisine. »',a:['maman','Maman'],e:'Maman.'}]});

E('ce1-fr-pronoms',{w:.6,items:[
 ['Remplace le sujet : « Marie mange. »','Elle mange.',['Il mange.','Ils mangent.','Elles mangent.'],'Marie : féminin singulier.'],
 ['Remplace le sujet : « Paul court. »','Il court.',['Elle court.','Ils courent.','Elles courent.'],'Paul : masculin singulier.'],
 ['Remplace le sujet : « Les garçons jouent. »','Ils jouent.',['Elles jouent.','Il joue.','Elle joue.'],'Masculin pluriel.'],
 ['Remplace le sujet : « Les filles chantent. »','Elles chantent.',['Ils chantent.','Il chante.','Elle chante.'],'Féminin pluriel.'],
 ['Remplace le sujet : « Paul et Léa dansent. »','Ils dansent.',['Elles dansent.','Elle danse.','Il danse.'],'Un garçon au moins : ils.',2],
 ['Remplace le sujet : « Moi et toi » :','nous',['vous','ils','elles'],'Toi et moi : nous.',2],
 ['Le pronom de la 2e personne du singulier est…','tu',['vous','il','nous'],'Je, tu, il…'],
 ['Un pronom remplace…','un nom',['un verbe','une lettre','un point'],'Pour éviter les répétitions.'],
 {tf:'« Elles » remplace un groupe de filles.',v:true,e:'Féminin pluriel.'},
 {tf:'« Il » peut remplacer « la maîtresse ».',v:false,e:'On dit « elle ».'},
 {t:'Écris le pronom : « Mes sœurs rient. » → … rient.',a:['elles','Elles'],e:'Elles.',d:2}]});

E('ce1-ma-fractions',{w:.6,items:[
 ['Une pizza est partagée en 2 parts égales. Chaque part est…','un demi (1/2)',['un quart','un tiers','un huitième'],'Deux parts égales : un demi.'],
 ['Une pizza est partagée en 4 parts égales. Chaque part est…','un quart (1/4)',['un demi','un tiers','un huitième'],'Quatre parts égales : un quart.'],
 ['Une pizza est partagée en 3 parts égales. Chaque part est…','un tiers (1/3)',['un demi','un quart','un cinquième'],'Trois parts égales : un tiers.'],
 ['Dans la fraction 3/8, le nombre 8 est…','le nombre de parts égales du tout',['le nombre de parts coloriées','le résultat','le numérateur'],'8 est le dénominateur.',2],
 ['Dans la fraction 3/8, le nombre 3 est…','le nombre de parts coloriées',['le nombre de parts du tout','le dénominateur','un nombre au hasard'],'3 est le numérateur.',2],
 ['Quelle fraction est la plus grande : 1/2 ou 1/4 ?','1/2',['1/4','elles sont égales'],'Un demi est plus grand qu’un quart.',2],
 ['Pour parler de fraction, les parts doivent être…','égales',['de couleurs différentes','de tailles différentes','numérotées'],'Parts égales.'],
 ['Une tablette de 10 carrés : Lina en mange 3. Elle mange…','3/10',['10/3','3 dixièmes de moins','7/10'],'3 parts sur 10.',2],
 {n:'Le demi de 10 est…',a:5,e:'10 ÷ 2 = 5.',d:2},
 {n:'Le quart de 8 est…',a:2,e:'8 ÷ 4 = 2.',d:2},
 {n:'Le tiers de 9 est…',a:3,e:'9 ÷ 3 = 3.',d:2},
 {tf:'1/2 s’écrit « un demi ».',v:true,e:'1/2 = un demi.'},
 {tf:'Si les parts ne sont pas égales, c’est une fraction.',v:false,e:'Les parts doivent être égales.'}]});

E('ce1-ma-masses',{w:.6,items:[
 ['1 kg est égal à…','1 000 g',['100 g','10 g','10 000 g'],'1 kg = 1 000 g.'],
 ['2 kg est égal à…','2 000 g',['200 g','20 g','2 g'],'2 × 1 000.'],
 ['Pour peser une plume, on utilise plutôt…','le gramme',['le kilogramme','le litre','le mètre'],'Une plume est légère.'],
 ['Pour peser un enfant, on utilise plutôt…','le kilogramme',['le gramme','le centimètre','le litre'],'Un enfant est plus lourd.'],
 ['Quel objet pèse environ 1 kg ?','un paquet de sucre',['un trombone','une plume','une feuille'],'Un paquet de sucre.'],
 ['Quel objet pèse environ 1 g ?','un trombone',['un paquet de sucre','une baguette','un enfant'],'Un trombone est léger.'],
 ['Qui est le plus lourd ?','1 kg de plomb et 1 kg de plumes pèsent pareil',['le plomb est plus lourd','les plumes sont plus lourdes','on ne sait pas'],'Même masse : 1 kg.',3],
 ['Un demi-kilogramme est égal à…','500 g',['50 g','5 g','5 000 g'],'1 000 ÷ 2.',2],
 {n:'3 kg = … g',a:3000,u:'g',e:'3 × 1 000.',d:2},
 {n:'4 000 g = … kg',a:4,u:'kg',e:'4 000 ÷ 1 000.',d:2},
 {tf:'On mesure les masses avec une balance.',v:true,e:'Balance.'},
 {tf:'1 g est plus grand que 1 kg.',v:false,e:'1 kg = 1 000 g.'}]});

E('ce1-ma-heure',{w:.6,items:[
 ['La grande aiguille sur le 6 : c’est…','la demie',['le quart','l’heure pile','moins le quart'],'30 minutes.'],
 ['La grande aiguille sur le 3 : c’est…','et quart',['et demie','moins le quart','heure pile'],'15 minutes.'],
 ['La grande aiguille sur le 9 : c’est…','moins le quart',['et quart','et demie','heure pile'],'45 minutes.'],
 ['Il est 3 h 30. On dit aussi…','trois heures et demie',['trois heures et quart','quatre heures moins le quart','trois heures pile'],'30 minutes après 3 h.'],
 ['Il est 3 h 45. On dit aussi…','quatre heures moins le quart',['trois heures et quart','trois heures et demie','quatre heures et quart'],'Il manque un quart d’heure pour 4 h.',2],
 ['Une heure dure…','60 minutes',['10 minutes','100 minutes','24 minutes'],'1 h = 60 min.'],
 ['Il est 13 h. On dit aussi…','une heure de l’après-midi',['une heure du matin','treize minutes','midi'],'13 h = 1 h de l’après-midi.',2],
 ['Combien de temps entre 8 h et 10 h ?','2 heures',['1 heure','3 heures','10 heures'],'10 − 8 = 2.'],
 ['Combien de temps entre 9 h 30 et 10 h 30 ?','1 heure',['30 minutes','2 heures','10 minutes'],'Une heure pile.',2],
 {tf:'À midi, la petite aiguille est sur le 12.',v:true,e:'12 heures.'},
 {n:'Une demi-heure dure combien de minutes ?',a:30,u:'min',e:'60 ÷ 2 = 30.'}]});

E('ce1-ma-figures',{w:.6,items:[
 ['Un angle droit ressemble à…','un coin de feuille',['une pointe très pointue','un trait droit','un cercle'],'Le coin de la feuille est droit.'],
 ['Pour vérifier un angle droit, on utilise…','une équerre',['une règle seule','un compas','un rapporteur'],'L’équerre.'],
 ['Pour tracer un cercle, on utilise…','un compas',['une équerre','une règle graduée','une gomme'],'Le compas trace des cercles.'],
 ['Un carré a…','4 côtés égaux et 4 angles droits',['3 côtés','4 côtés différents','aucun angle droit'],'Définition du carré.'],
 ['Un rectangle a…','4 angles droits et des côtés opposés égaux',['3 angles droits','5 côtés','des côtés tous inégaux'],'Rectangle.'],
 ['Un triangle rectangle a…','3 côtés et un angle droit',['4 côtés','2 angles droits','aucun angle'],'Il a un angle droit.'],
 ['Combien d’angles droits a un carré ?','4',['2','3','1'],'Quatre.'],
 ['Un losange a 4 côtés égaux mais pas d’angle droit. Est-ce un carré ?','non',['oui'],'Il faut 4 angles droits.',3],
 {tf:'La règle permet de tracer un angle droit.',v:false,e:'C’est l’équerre qui trace ou vérifie un angle droit.'},
 {tf:'Tous les points d’un cercle sont à la même distance du centre.',v:true,e:'Définition du cercle.',d:2},
 {n:'Combien de côtés a un triangle ?',a:3,e:'Trois.'},
 {n:'Combien d’angles droits a un rectangle ?',a:4,e:'Quatre.'}]});

E('ce1-ma-solides',{w:.6,items:[
 ['Les faces d’un cube sont…','des carrés',['des triangles','des cercles','des losanges'],'6 faces carrées.'],
 ['Les faces d’un pavé droit sont…','des rectangles',['des triangles','des cercles','des pentagones'],'6 rectangles.'],
 ['Une pyramide à base carrée a…','1 carré et 4 triangles',['6 carrés','4 carrés','2 triangles'],'5 faces.',2],
 ['Une arête est…','le bord où deux faces se rejoignent',['une face','un angle plat','un trou'],'Le bord.'],
 ['Un sommet est…','une pointe où plusieurs arêtes se rejoignent',['une face','un bord','un trou'],'Un coin.'],
 ['Une boule a…','aucune arête et aucun sommet',['12 arêtes','8 sommets','6 faces'],'Elle est toute ronde.',2],
 ['Un cylindre a…','2 faces planes en forme de disque',['6 faces carrées','4 sommets','12 arêtes'],'Et une surface courbe.',2],
 {n:'Combien d’arêtes a un cube ?',a:12,e:'12 arêtes.'},
 {n:'Combien de sommets a un pavé droit ?',a:8,e:'8 sommets.'},
 {n:'Combien de faces a une pyramide à base carrée ?',a:5,e:'1 carré + 4 triangles.',d:2},
 {tf:'Un cube et un pavé droit ont 6 faces.',v:true,e:'Les faces du cube sont toutes des carrés.'},
 {tf:'Une pyramide à base carrée a 4 sommets.',v:false,e:'Elle a 5 sommets : 4 à la base et 1 au sommet.',d:2}]});

E('ce1-qm-cycle-vie',{w:.6,items:[
 ['Un animal qui pond des œufs est…','ovipare',['vivipare','herbivore','carnivore'],'Ovipare.'],
 ['Un animal dont les petits se développent dans le ventre de la mère est…','vivipare',['ovipare','herbivore','omnivore'],'Vivipare.'],
 ['Le chat est…','vivipare',['ovipare','insecte','poisson'],'Il met au monde des chatons.'],
 ['La poule est…','ovipare',['vivipare','mammifère','insecte'],'Elle pond des œufs.'],
 ['Un têtard devient…','une grenouille',['un poisson','un serpent','un crabe'],'Métamorphose.'],
 ['Une chenille devient…','un papillon',['une araignée','un escargot','un ver'],'Elle passe par la chrysalide.'],
 ['Un poussin sort de…','l’œuf',['la graine','le nid vide','la mare'],'Il éclot.'],
 ['Qu’est-ce qui vient en premier dans la vie d’une grenouille ?','l’œuf',['la grenouille adulte','le têtard avec des pattes','le saut'],'Œuf, têtard, grenouille.'],
 {o:['l’œuf','le poussin','la poule'],q:'Remets les étapes dans l’ordre :',e:'Œuf, poussin, poule.'},
 {o:['l’œuf','la chenille','la chrysalide','le papillon'],q:'Remets les étapes de la vie du papillon dans l’ordre :',e:'Œuf, chenille, chrysalide, papillon.',d:2},
 {tf:'Le chiot boit le lait de sa mère.',v:true,e:'Les mammifères allaitent leurs petits.'},
 {tf:'Tous les animaux pondent des œufs.',v:false,e:'Les mammifères sont vivipares.',d:2}]});

E('ce1-qm-regimes',{w:.6,items:[
 ['Le lapin mange des végétaux. Il est…','herbivore',['carnivore','omnivore','insecte'],'Herbivore.'],
 ['Le lion mange d’autres animaux. Il est…','carnivore',['herbivore','omnivore','végétarien'],'Carnivore.'],
 ['L’ours mange des fruits et des poissons. Il est…','omnivore',['herbivore','carnivore','insecte'],'Les deux.'],
 ['La vache est…','herbivore',['carnivore','omnivore','insecte'],'Elle mange de l’herbe.'],
 ['Le loup est…','carnivore',['herbivore','omnivore','végétarien'],'Il mange d’autres animaux.'],
 ['Au début d’une chaîne alimentaire, il y a toujours…','un végétal',['un animal carnivore','un humain','un caillou'],'Une plante.'],
 ['Dans « herbe → lapin → renard », la flèche signifie…','est mangé par',['mange','devient','pousse'],'L’herbe est mangée par le lapin.',2],
 ['Dans « herbe → lapin → renard », qui est le dernier maillon ?','le renard',['l’herbe','le lapin','la terre'],'Il mange le lapin.'],
 {tf:'Un carnivore mange seulement des végétaux.',v:false,e:'Il mange d’autres animaux.'},
 {tf:'L’être humain est omnivore.',v:true,e:'Il mange des végétaux et des animaux.'},
 {o:['l’herbe','la sauterelle','la grenouille','le héron'],q:'Remets dans l’ordre cette chaîne alimentaire :',e:'L’herbe est mangée par la sauterelle, puis la grenouille, puis le héron.',d:3}]});

E('ce1-qm-plantes',{w:.6,items:[
 ['Une plante a besoin de…','eau, lumière, air',['bruit','sucre','bonbons'],'Besoins des plantes.'],
 ['Les racines servent à…','puiser l’eau dans la terre',['faire des fleurs','capter la lumière','voler'],'Les racines boivent.'],
 ['Les feuilles servent à…','capter la lumière',['puiser l’eau','tenir la plante','faire des racines'],'Les feuilles reçoivent la lumière.'],
 ['La fleur donne…','le fruit qui contient les graines',['la racine','la tige','la terre'],'Après la fleur, le fruit.',2],
 ['Une graine plantée et arrosée…','germe',['fond','brûle','disparaît'],'Une petite plante sort.'],
 ['Une plante laissée sans eau…','se dessèche',['grandit mieux','devient un animal','devient une pierre'],'Elle a besoin d’eau.'],
 ['Une plante laissée sans lumière…','jaunit',['verdit','fleurit toujours','grossit'],'Elle manque de lumière.'],
 ['La tige…','transporte l’eau',['mange les insectes','produit les graines','sert de racine'],'Elle relie les racines et les feuilles.',2],
 {tf:'Une plante est un être vivant.',v:true,e:'Elle naît, grandit et se reproduit.'},
 {tf:'Une graine a besoin de beaucoup de lumière pour germer.',v:false,e:'Elle germe avec de l’eau ; la jeune plante a ensuite besoin de lumière.',d:3}]});

E('ce1-qm-sante',{w:.6,items:[
 ['Les dents de lait tombent vers…','6 ans',['2 ans','20 ans','50 ans'],'Elles sont remplacées par les définitives.'],
 ['Pour protéger ses dents, on se brosse les dents…','matin et soir',['jamais','une fois par mois','seulement le dimanche'],'Deux fois par jour.'],
 ['Trop de sucre favorise…','les caries',['la croissance des cheveux','les muscles','le sommeil'],'Le sucre abîme les dents.'],
 ['Un repas équilibré contient…','un peu de chaque famille d’aliments',['seulement des frites','seulement des bonbons','seulement du pain'],'Équilibre.'],
 ['Pour grandir en bonne santé, il faut aussi…','dormir et bouger',['rester tout le temps devant la télé','ne jamais jouer dehors','sauter les repas'],'Sommeil et sport.'],
 ['Pour s’hydrater, la meilleure boisson est…','l’eau',['le soda','le sirop très sucré','le jus de fruit uniquement'],'L’eau.'],
 ['Le dentiste est un médecin pour…','les dents',['les yeux','les oreilles','les pieds'],'Il soigne les dents.'],
 {tf:'Les dents définitives repoussent si elles tombent.',v:false,e:'Il faut en prendre soin.',d:2},
 {tf:'Il est bon de grignoter des bonbons toute la journée.',v:false,e:'Le sucre abîme les dents.'},
 {tf:'On peut manger varié pour être en bonne santé.',v:true,e:'Fruits, légumes, féculents…'}]});

E('ce1-qm-eau',{w:.6,items:[
 ['La glace qui devient de l’eau liquide : c’est…','la fusion',['la condensation','la solidification','l’évaporation'],'La glace fond.'],
 ['L’eau qui devient de la glace : c’est…','la solidification',['la fusion','l’évaporation','la condensation'],'L’eau gèle.'],
 ['L’eau qui devient de la vapeur : c’est…','l’évaporation',['la fusion','la solidification','la condensation'],'Le linge sèche.'],
 ['De la buée sur une vitre froide : c’est…','la condensation',['la fusion','l’évaporation','la solidification'],'La vapeur devient gouttes.',2],
 ['L’eau gèle à…','0 °C',['10 °C','100 °C','−100 °C'],'À 0 °C.'],
 ['La glace fond à…','0 °C',['10 °C','100 °C','−10 °C'],'À 0 °C.'],
 ['La vapeur d’eau est…','un gaz invisible',['une glace','un liquide coloré','une pierre'],'On ne la voit pas.',2],
 ['L’eau qui bout à 100 °C se transforme en…','vapeur',['glace','neige','sable'],'Ébullition.',2],
 {tf:'Le linge mouillé sèche parce que l’eau s’évapore.',v:true,e:'Elle part dans l’air.'},
 {tf:'L’eau de la mer gèle à 100 °C.',v:false,e:'L’eau gèle vers 0 °C.',d:2},
 {tf:'L’eau existe sous trois états : solide, liquide, gaz.',v:true,e:'Glace, eau, vapeur.'}]});

E('ce1-qm-electricite',{w:.6,items:[
 ['Pour allumer une ampoule avec une pile, il faut un circuit…','fermé',['ouvert','cassé','vide'],'Une boucle sans coupure.'],
 ['Un interrupteur ouvert…','coupe le courant',['allume l’ampoule','charge la pile','fait un court-circuit'],'Le courant ne passe plus.'],
 ['La pile a deux bornes : on les appelle…','plus et moins (+ et −)',['haut et bas','rouge et bleu','gauche et droite'],'+ et −.'],
 ['Il est dangereux de…','mettre ses doigts dans une prise',['allumer une lampe','changer une ampoule éteinte avec un adulte','utiliser une pile'],'Le courant de la prise est très dangereux.'],
 ['On ne touche pas un appareil électrique avec…','les mains mouillées',['les mains sèches','un gant','du papier'],'L’eau conduit le courant.'],
 ['Un fil détaché dans le circuit fait que l’ampoule…','reste éteinte',['brille plus fort','chauffe','change de couleur'],'Le circuit est ouvert.'],
 ['Quel objet permet de relier une pile et une ampoule ?','un fil électrique',['un morceau de bois','un caillou','un bout de laine'],'Un fil conducteur.',2],
 {tf:'Le courant fait le tour du circuit.',v:true,e:'Pile, fil, ampoule, fil, pile.'},
 {tf:'On peut jouer avec les prises.',v:false,e:'Jamais : c’est dangereux.'},
 {tf:'Une pile sert à produire du courant.',v:true,e:'Elle fournit l’énergie électrique.',d:2}]});

E('ce1-qm-temps',{w:.6,items:[
 ['Une décennie, c’est…','10 ans',['100 ans','1 000 ans','1 an'],'Dix ans.'],
 ['Un siècle, c’est…','100 ans',['10 ans','1 000 ans','12 ans'],'Cent ans.'],
 ['Un millénaire, c’est…','1 000 ans',['100 ans','10 ans','10 000 ans'],'Mille ans.'],
 ['Nous sommes au…','XXIe siècle',['XIXe siècle','XVe siècle','Xe siècle'],'Il a commencé en 2001.'],
 ['Il y a 100 ans, il n’y avait pas…','de télévision à la maison',['de pain','de rivières','de maisons'],'La télévision s’est répandue plus tard.'],
 ['Pour savoir comment vivaient les gens autrefois, on peut interroger…','les grands-parents',['les nuages','un caillou','une plante'],'Les témoins.'],
 ['Une photo ancienne est une…','trace du passé',['invention du futur','météo','recette'],'Elle garde un souvenir.'],
 ['Autrefois, on écrivait avec…','une plume et de l’encre',['un ordinateur','un téléphone','une tablette'],'Autrefois.'],
 {n:'Combien de décennies dans un siècle ?',a:10,e:'100 ÷ 10 = 10.',d:2},
 {n:'Combien d’années dans 2 décennies ?',a:20,u:'ans',e:'2 × 10 = 20.',d:2},
 {tf:'Un siècle est plus long qu’une décennie.',v:true,e:'100 ans contre 10 ans.'},
 {o:['une décennie','un siècle','un millénaire'],q:'Range ces durées de la plus courte à la plus longue :',e:'10 ans, 100 ans, 1 000 ans.'}]});

E('ce1-qm-paysages',{w:.6,items:[
 ['Un paysage avec la mer, une plage et un port est un…','paysage du littoral',['paysage de montagne','paysage de ville','paysage de désert'],'Le littoral, c’est le bord de mer.'],
 ['Un paysage avec des sommets et de la neige est un…','paysage de montagne',['paysage de littoral','paysage de ville','paysage de campagne'],'Montagne.'],
 ['Un paysage avec beaucoup d’immeubles et de rues est un…','paysage de ville',['paysage de campagne','paysage de montagne','paysage de littoral'],'Ville.'],
 ['Un paysage avec des champs et une ferme est un…','paysage de campagne',['paysage de ville','paysage de montagne','paysage de littoral'],'Campagne.'],
 ['Un plan représente…','un petit espace, comme le quartier',['la Terre entière','une planète','tout un continent'],'Le plan est détaillé.'],
 ['Une carte représente…','un grand espace, comme la France',['une chambre','le plan de la classe','un cahier'],'La carte montre de grands espaces.'],
 ['La légende d’une carte sert à…','expliquer les couleurs et les signes',['dessiner la carte','écrire une histoire','colorier'],'Elle donne le sens des symboles.'],
 {tf:'Un village est plus petit qu’une ville.',v:true,e:'Moins d’habitants.'},
 {tf:'Dans un paysage de montagne, on voit des pentes et des sommets.',v:true,e:'Parfois de la neige.'},
 {tf:'Un paysage de littoral est loin de la mer.',v:false,e:'Le littoral est au bord de la mer.'}]});

E('ce1-qm-france',{w:.6,items:[
 ['La capitale de la France est…','Paris',['Lyon','Marseille','Lille'],'Paris.'],
 ['Quel fleuve traverse Paris ?','la Seine',['la Loire','le Rhône','la Garonne'],'La Seine.'],
 ['La France hexagonale a la forme d’un…','hexagone',['carré','cercle','triangle'],'Six côtés.'],
 ['Quelle mer est au sud de la France ?','la Méditerranée',['la Manche','la mer du Nord','l’océan Indien'],'Au sud.',2],
 ['Quel océan borde l’ouest de la France ?','l’océan Atlantique',['l’océan Pacifique','l’océan Indien','la mer Rouge'],'À l’ouest.'],
 ['Quelle montagne se trouve entre la France et l’Espagne ?','les Pyrénées',['les Alpes','les Vosges','le Jura'],'Au sud-ouest.',2],
 ['Le mont Blanc se trouve dans…','les Alpes',['les Pyrénées','le Massif central','les Vosges'],'Plus haut sommet d’Europe de l’Ouest.',2],
 ['La Guadeloupe est…','un territoire français d’outre-mer',['un pays voisin','une ville de Bretagne','un fleuve'],'Dans les Antilles.',2],
 {tf:'La France est un pays d’Europe.',v:true,e:'En Europe.'},
 {tf:'La Loire est une montagne.',v:false,e:'La Loire est un fleuve.'},
 {tf:'La Garonne est un fleuve français.',v:true,e:'Elle traverse Toulouse et Bordeaux.',d:2}]});

E('ce1-emc-alerter',{w:.5,items:[
 ['Il y a un blessé. Je dois d’abord…','me protéger et protéger les autres',['partir en courant','jouer','crier sans rien faire'],'Protéger, alerter, secourir.'],
 ['Pour appeler les secours, je dis…','mon nom, où je suis et ce qui se passe',['mon plat préféré','mon âge uniquement','rien'],'Un message clair.'],
 ['Les numéros d’urgence sont…','gratuits',['payants','réservés aux adultes','interdits aux enfants'],'Appel gratuit.'],
 ['Pour une personne sourde ou malentendante, on peut utiliser le…','114 par SMS',['17','18','112 par téléphone fixe'],'Le 114.',3],
 ['Appeler le 18 pour s’amuser est…','interdit : ça empêche d’aider de vraies personnes',['drôle','permis','utile'],'Les secours doivent être libres.'],
 {tf:'Je raccroche avant qu’on me le dise.',v:false,e:'On attend les consignes.'},
 {tf:'Je donne mon adresse quand j’appelle les secours.',v:true,e:'Ils doivent savoir où aller.'},
 {tf:'Le 112 fonctionne dans toute l’Europe.',v:true,e:'Numéro européen.'}]});

E('ce1-emc-civilite',{w:.5,items:[
 ['En quittant quelqu’un, je dis…','au revoir',['non','rien','va-t’en'],'Poli.'],
 ['Quand j’ai besoin d’aide, je demande…','s’il vous plaît',['donne-moi','vite','tout de suite'],'Politesse.'],
 ['Quand quelqu’un m’aide, je dis…','merci',['rien','non','bof'],'Remercier.'],
 ['Pour passer devant quelqu’un, je dis…','pardon, excusez-moi',['pousse-toi','dégage','rien'],'Poli.'],
 ['À la cantine, je…','attends mon tour',['double les autres','crie','jette la nourriture'],'Respect des autres.'],
 {tf:'Il faut respecter le matériel de la classe.',v:true,e:'Il sert à tous.'},
 {tf:'Je peux crier dans les couloirs de l’école.',v:false,e:'On parle calmement.'},
 {tf:'Je tiens la porte à la personne qui arrive derrière moi.',v:true,e:'C’est un geste de civilité.'}]});

E('ce1-emc-differences',{w:.5,items:[
 ['Nous sommes tous différents : c’est…','normal',['interdit','une erreur','un problème'],'Chacun est différent.'],
 ['Un camarade parle mal le français. Je…','l’aide gentiment',['me moque','l’ignore','le critique'],'On respecte.'],
 ['Un camarade porte des lunettes. Je…','le traite comme les autres',['me moque','l’exclus','le critique'],'Chacun est respecté.'],
 ['Se moquer de l’apparence de quelqu’un, c’est…','blessant',['drôle','une bonne blague','utile'],'Cela fait mal.'],
 ['Les garçons et les filles ont…','les mêmes droits',['des droits différents','aucun droit','tous les droits'],'Égalité.'],
 {tf:'Se moquer de la différence de quelqu’un est une discrimination possible.',v:true,e:'Cela peut devenir de la discrimination.',d:2},
 {tf:'Tout le monde doit être comme moi.',v:false,e:'On est tous différents.'},
 {tf:'Chacun mérite le respect.',v:true,e:'La dignité.'}]});

E('ce1-emc-harcelement',{w:.5,items:[
 ['Le harcèlement, c’est quand…','on fait du mal à quelqu’un plusieurs fois',['on joue ensemble','on se dispute une seule fois','on gagne un jeu'],'Répété.'],
 ['Si je suis harcelé, je…','le dis à un adulte de confiance',['me tais','me bats','reste seul'],'On demande de l’aide.'],
 ['Si je vois un camarade harcelé, je…','prévient un adulte',['ris avec les autres','filme','m’en vais sans rien dire'],'Je ne laisse pas faire.'],
 ['Le numéro national contre le harcèlement est le…','3018 (cyber) ou 3020 (école)',['18','17','15'],'Numéros d’aide.',3],
 ['Parmi ces mots, lequel désigne celui qui est attaqué ?','la victime (la cible)',['le témoin','le gentil','le chef'],'La cible.',2],
 {tf:'Se moquer tous les jours du même élève peut être du harcèlement.',v:true,e:'Répété contre la même personne.'},
 {tf:'On peut rire avec ceux qui se moquent.',v:false,e:'Cela encourage le harcèlement.'},
 {tf:'On peut en parler à un adulte de confiance.',v:true,e:'Parents, maîtresse…'}]});

E('ce1-emc-republique',{w:.5,items:[
 ['Quel mot est dans la devise de la République ?','Liberté',['Pouvoir','Argent','Victoire'],'Liberté, Égalité, Fraternité.'],
 ['Qui accueille l’école publique ?','tous les enfants',['seulement les garçons','seulement ceux d’une religion','seulement les riches'],'L’école est laïque.'],
 ['Les symboles de la République sont…','le drapeau, la Marseillaise, Marianne',['le sapin, le gâteau, les cadeaux','la pluie, le vent, le soleil','le foot, le tennis, le judo'],'Symboles.'],
 ['La fête nationale est le…','14 juillet',['25 décembre','1er janvier','1er mai'],'Fête nationale.'],
 ['La laïcité permet à chacun de…','croire ou ne pas croire',['obéir à une seule religion','ne jamais parler','se cacher'],'Liberté de conscience.'],
 {tf:'La Marseillaise est l’hymne national.',v:true,e:'On la chante lors des cérémonies.'},
 {tf:'Il y a une religion obligatoire à l’école publique.',v:false,e:'L’école publique est laïque.'},
 {o:['Liberté','Égalité','Fraternité'],q:'Remets la devise dans l’ordre :',e:'Liberté, Égalité, Fraternité.'}]});

/* ---------- Lot 3 vague 1 pédagogie (23/10/2026) : anglais CE1 (nombres, météo ; sans audio) ---------- */
E('ce1-en-numbers',{w:.6,items:[
 ['« Thirteen » veut dire…','treize',['trente','trois','dix-huit'],'13.'],
 ['« Fifteen » veut dire…','quinze',['cinquante','cinq','seize'],'15.'],
 ['« Sixteen » veut dire…','seize',['six','soixante','quinze'],'16.',2],
 ['« Eighteen » veut dire…','dix-huit',['huit','quatre-vingts','dix-neuf'],'18.',2],
 ['« Twenty » veut dire…','vingt',['douze','deux','trente'],'20.'],
 ['Comment dit-on « quatorze » en anglais ?','fourteen',['forty','four','fifteen'],'14.',2],
 ['Comment dit-on « dix-sept » en anglais ?','seventeen',['seventy','seven','sixteen'],'17.',2],
 ['Comment dit-on « dix-neuf » en anglais ?','nineteen',['ninety','nine','eighteen'],'19.',3],
 ['Les nombres de 13 à 19 finissent par…','-teen',['-ty','-ten','-ing'],'Thirteen, fourteen…'],
 ['Pour dire « J’ai neuf ans », je dis…','I’m nine.',['I have nine.','I like nine.','I am nine years.'],'On dit I’m + nombre.'],
 {n:'Écris le nombre : « twelve ».',a:12,e:'Twelve = 12.'},
 {n:'Écris le nombre : « eighteen ».',a:18,e:'Eighteen = 18.',d:2},
 {n:'Écris le nombre : « fifteen ».',a:15,e:'Fifteen = 15.',d:2},
 {tf:'« Eleven » veut dire « onze ».',v:true,e:'Eleven = 11.'},
 {tf:'« Fifteen » s’écrit 50.',v:false,e:'Fifteen = 15 ; fifty = 50.',d:3}]});

E('ce1-en-weather',{w:.6,items:[
 ['« It’s sunny. » veut dire…','Il fait soleil.',['Il pleut.','Il neige.','Il y a du vent.'],'Sunny = ensoleillé.'],
 ['« It’s rainy. » veut dire…','Il pleut.',['Il neige.','Il fait chaud.','Il fait froid.'],'Rainy = pluvieux.'],
 ['« It’s cloudy. » veut dire…','Le ciel est nuageux.',['Il y a du soleil.','Il pleut.','Il neige.'],'Cloudy = nuageux.'],
 ['« It’s windy. » veut dire…','Il y a du vent.',['Il pleut.','Il neige.','Il fait chaud.'],'Windy = venteux.'],
 ['« It’s snowy. » veut dire…','Il neige.',['Il pleut.','Il y a du soleil.','Il fait chaud.'],'Snowy = neigeux.'],
 ['« It’s hot. » veut dire…','Il fait chaud.',['Il fait froid.','Il neige.','Il pleut.'],'Hot = chaud.'],
 ['« It’s cold. » veut dire…','Il fait froid.',['Il fait chaud.','Il y a du soleil.','Il y a du vent.'],'Cold = froid.'],
 ['Comment dire « Il fait chaud » en anglais ?','It’s hot.',['It’s cold.','It’s rainy.','It’s snowy.'],'Hot.'],
 ['Comment demander « Quel temps fait-il ? » ?','What’s the weather like?',['How old are you?','Where do you live?','What’s your name?'],'La question sur la météo.',2],
 ['« Summer » veut dire…','été',['hiver','printemps','automne'],'Summer = été.'],
 ['« Winter » veut dire…','hiver',['été','printemps','automne'],'Winter = hiver.'],
 ['« Autumn » veut dire…','automne',['printemps','été','hiver'],'Autumn = automne.',2],
 ['« Spring » veut dire…','printemps',['automne','été','hiver'],'Spring = printemps.',2],
 {tf:'En hiver, il fait souvent froid : It’s cold.',v:true,e:'Winter, cold.'},
 {tf:'« It’s snowy » signifie « Il fait chaud ».',v:false,e:'It’s snowy = il neige.'}]});
/* ---------- Vague 2 (24/10/2026) : pools plus larges, français ---------- */
E('ce1-fr-graphemes',{w:.65,items:[
 ['Quel animal s’écrit avec « ph » ?','le phoque',['le lion','le singe','le zèbre'],'Dans « phoque », les lettres « ph » se lisent [f].'],
 ['Quel mot s’écrit avec « ph » ?','un éléphant',['un chameau','un cheval','un poney'],'Dans « éléphant », les lettres « ph » se lisent [f].'],
 ['Quel mot s’écrit avec « ph » ?','une photo',['une pomme','une porte','une plume'],'Dans « photo », les lettres « ph » se lisent [f].'],
 ['Dans « phare », le son [f] s’écrit…','ph',['gn','ll','tt'],'Les deux lettres « ph » font le même son que la lettre f.'],
 {tf:'Les lettres « ph » peuvent faire le même son que la lettre « f ».',v:true,e:'Dans « photo » ou « éléphant », « ph » se dit [f].'},
 {tf:'Dans « montagne », « gn » est un seul son.',v:true,e:'Les lettres g et n forment ensemble un seul son : on ne dit pas « g » puis « n ».'},
 ['Quel mot contient le son « gn » ?','une araignée',['une abeille','une fourmi','une mouche'],'« araignée » contient « gn ». Les autres mots n’en contiennent pas.'],
 ['Quel mot contient le son « gn » ?','un oignon',['un melon','un citron','un poireau'],'« oignon » s’écrit avec « gn ».'],
 ['Quel mot contient le son « gn » ?','une vigne',['une ville','une vague','une voile'],'« vigne » s’écrit avec « gn ».'],
 ['Complète : une monta…e','gn',['ng','nn','mn'],'« montagne » s’écrit avec « gn », puis un e muet à la fin.'],
 ['Complète : une li…e (un trait)','gn',['ng','nn','ll'],'« ligne » s’écrit avec « gn ».'],
 ['Complète : un épouvant…','ail',['aille','eil','euil'],'Un nom masculin : « un épouvantail » finit par « ail ».',2],
 ['Complète : un évent…','ail',['aille','eil','euil'],'« un éventail » est masculin : « ail », comme « travail ».',2],
 ['Complète : du cor…','ail',['aille','eil','euil'],'« du corail » est masculin et finit par « ail ».',2],
 ['Complète : une mur…','aille',['ail','eil','euil'],'« une muraille » est féminin : il y a deux l et un e à la fin.',2],
 ['Complète : une bat…','aille',['ail','eil','euil'],'« une bataille » est féminin : « aille ».',2],
 ['Complète : de la vol…','aille',['ail','eil','euil'],'« la volaille » est féminin : « aille ».',2],
 ['Complète : un cons…','eil',['ail','euil','ille'],'« un conseil » est masculin : « eil ».',2],
 ['Complète : le somm…','eil',['ail','euil','ille'],'« le sommeil » est masculin : « eil ».',2],
 ['Complète : un appar…','eil',['ail','euil','ille'],'« un appareil » est masculin : « eil ».',2],
 ['Complète : un écur…','euil',['eil','ail','ille'],'« un écureuil » est masculin : « euil ».',2],
 ['Complète : un chevr…','euil',['eil','ail','ille'],'« un chevreuil » est masculin : « euil ».',2],
 ['Complète : une boute…','ille',['aille','eil','euil'],'« une bouteille » est féminin : « eille », donc on écrit « ille » après la lettre e.',2],
 ['Complète : une corbe…','ille',['aille','eil','euil'],'« une corbeille » est féminin : « eille ».',2],
 ['Complète : une grenou…','ille',['aille','eil','ail'],'« une grenouille » est féminin : « ouille ».',2],
 ['Complète : une fam…','ille',['aille','eil','ail'],'« une famille » est féminin : « ille ».']]});
E('ce1-fr-s-z',{w:.65,items:[
 ['Dans « visage », la lettre s fait le son…','[z]',['[s]'],'Le s est entre deux voyelles (i et a) : il se dit [z].'],
 ['Dans « cuisine », la lettre s fait le son…','[z]',['[s]'],'Le s est entre deux voyelles (i et i) : il se dit [z].'],
 ['Dans « fraise », la lettre s fait le son…','[z]',['[s]'],'Le s est entre deux voyelles (i et e) : il se dit [z].'],
 ['Dans « musique », la lettre s fait le son…','[z]',['[s]'],'Le s est entre deux voyelles (u et i) : il se dit [z].'],
 ['Dans « chaise », la lettre s fait le son…','[z]',['[s]'],'Le s est entre deux voyelles (i et e) : il se dit [z].'],
 ['Dans « classe », les lettres ss font le son…','[s]',['[z]'],'Deux s côte à côte se disent [s].'],
 ['Dans « dessin », les lettres ss font le son…','[s]',['[z]'],'Deux s côte à côte se disent [s].'],
 ['Dans « poussin », les lettres ss font le son…','[s]',['[z]'],'Deux s côte à côte se disent [s].'],
 ['Dans « sac », la lettre s fait le son…','[s]',['[z]'],'Au début d’un mot, la lettre s se dit [s].'],
 ['Dans « soleil », la lettre s fait le son…','[s]',['[z]'],'Au début d’un mot, la lettre s se dit [s].'],
 ['Entre deux voyelles, la lettre s fait le son…','[z]',['[s]'],'« rose », « maison », « vase » : le s entre deux voyelles se dit [z].'],
 ['Au début d’un mot, la lettre s fait le son…','[s]',['[z]'],'« sac », « salade », « soleil » : le s au début se dit [s].'],
 ['Pour garder le son [s] entre deux voyelles, on écrit…','ss',['s','z'],'Un seul s se dirait [z] : on double le s pour garder le son [s], comme dans « tasse ».'],
 ['Complète pour avoir le son [s] : une chau…ette','ss',['s','z'],'« chaussette » : le son [s] entre deux voyelles s’écrit « ss ».',2],
 ['Complète pour avoir le son [s] : un pou…in','ss',['s','z'],'« poussin » : le son [s] entre deux voyelles s’écrit « ss ».'],
 ['Complète pour avoir le son [s] : un de…in','ss',['s','z'],'« dessin » : le son [s] entre deux voyelles s’écrit « ss ».'],
 ['Complète pour avoir le son [s] : la cla…e','ss',['s','z'],'« classe » : le son [s] entre deux voyelles s’écrit « ss ».'],
 ['Complète pour avoir le son [z] : une fra…e','s',['ss','c'],'« fraise » : le son [z] entre deux voyelles s’écrit avec un seul s.'],
 ['Complète pour avoir le son [z] : une cui…ine','s',['ss','c'],'« cuisine » : le son [z] entre deux voyelles s’écrit avec un seul s.'],
 ['Complète pour avoir le son [z] : un vi…age','s',['ss','c'],'« visage » : le son [z] entre deux voyelles s’écrit avec un seul s.'],
 ['Complète pour avoir le son [z] : une mu…ique','s',['ss','c'],'« musique » : le son [z] entre deux voyelles s’écrit avec un seul s.'],
 {tf:'Dans « poison » et « poisson », la lettre s fait le même son.',v:false,e:'« poison » se dit avec [z] ; « poisson » se dit avec [s] (ss).'},
 {tf:'Dans « rose » et « vase », la lettre s fait le même son.',v:true,e:'Dans les deux mots, le s est entre deux voyelles et se dit [z].'},
 ['Quel mot se dit avec le son [z] ?','cousin',['coussin','dessin','poussin'],'« cousin » a un seul s entre deux voyelles : [z]. Les autres ont « ss » : [s].'],
 ['Quel mot se dit avec le son [s] ?','dessin',['cousin','visage','cuisine'],'« dessin » a « ss » : [s]. Les autres ont un s entre deux voyelles : [z].']]});
E('ce1-fr-lettres-muettes',{w:.65,items:[
 ['Quelle est la lettre muette de « froid » ?','d',['f','r','o'],'On l’entend dans « froide ».'],
 ['Quelle est la lettre muette de « lourd » ?','d',['l','o','r'],'On l’entend dans « lourde ».'],
 ['Quelle est la lettre muette de « content » ?','t',['c','o','n'],'On l’entend dans « contente ».'],
 ['Quelle est la lettre muette de « plat » ?','t',['p','l','a'],'On l’entend dans « plate ».'],
 ['Quelle est la lettre muette de « gentil » ?','l',['g','e','t'],'On l’entend dans « gentille ».'],
 ['Quelle est la lettre muette de « mauvais » ?','s',['m','a','v'],'On l’entend dans « mauvaise ».'],
 ['Quelle est la lettre muette de « français » ?','s',['f','r','a'],'On l’entend dans « française ».',2],
 ['Quelle est la lettre muette de « un renard » ?','d',['r','e','n'],'On l’entend dans « renarde ».'],
 ['Quelle est la lettre muette de « un regard » ?','d',['r','e','g'],'On l’entend dans « regarder ».'],
 ['Quelle est la lettre muette de « un saut » ?','t',['s','a','u'],'On l’entend dans « sauter ».'],
 ['Quelle est la lettre muette de « un chant » ?','t',['c','h','a'],'On l’entend dans « chanter ».'],
 ['Quelle est la lettre muette de « un dos » ?','s',['d','o','u'],'On l’entend dans « dossier ».'],
 ['Quelle est la lettre muette de « un bord » ?','d',['b','o','r'],'On l’entend dans « border ».'],
 ['Quelle est la lettre muette de « un tricot » ?','t',['r','i','c'],'On l’entend dans « tricoter ».'],
 ['Quel mot aide à trouver la lettre muette de « chant » ?','chanter',['changer','chauffer','chasser'],'Dans « chanter », on entend le t : il faut écrire « chant ».'],
 ['Quel mot aide à trouver la lettre muette de « froid » ?','froide',['frais','frotter','front'],'Dans « froide », on entend le d : il faut écrire « froid ».'],
 {tf:'Une lettre muette ne s’entend pas, mais elle s’écrit.',v:true,e:'On ne la dit pas, mais on doit l’écrire.'}]});

/* ---------- Vague 2 (24/10/2026) : pools plus larges, EPS, EVAR, arts, musique ---------- */
E('ce1-mu-chanter',{w:.65,items:[
 ['Dans un canon, les chanteurs…','commencent l’un après l’autre',['chantent tous exactement en même temps','ne chantent pas','chantent chacun une chanson différente'],'Dans un canon, chaque groupe commence plus tard avec les mêmes paroles.'],
 ['« Frère Jacques » peut se chanter en…','canon',['solo uniquement','silence','duo avec une trompette'],'Cette chanson est un exemple connu de canon.'],
 ['Un solo est chanté par…','une seule personne',['un grand chœur','deux personnes','tout l’orchestre'],'Solo veut dire seul.'],
 ['Un duo est chanté par…','deux personnes',['une seule personne','dix personnes','personne'],'Duo veut dire deux.'],
 ['Avant de chanter, je prends…','une bonne respiration',['un bonbon','une grosse bouchée','un cri'],'Respirer calmement prépare la voix.'],
 ['Pour chanter en chœur, je regarde…','le chef de chœur',['mon cartable','la porte','mes chaussures'],'Le chef de chœur donne le départ et la vitesse.'],
 ['Les couplets d’une chanson ont…','des paroles différentes',['toujours les mêmes paroles','pas de paroles','le même titre'],'Ce sont les couplets qui changent ; le refrain revient.'],
 ['Les paroles d’une chanson, c’est…','le texte que l’on chante',['les instruments','le titre seulement','la partition de piano'],'Les paroles sont les mots de la chanson.'],
 ['Dans un chœur, je dois…','écouter mes voisins pour chanter ensemble',['chanter plus fort que tous','chanter plus vite','chanter sans écouter'],'Un chœur sonne bien quand tout le monde s’écoute.'],
 {tf:'Dans un chœur, chacun doit chanter plus fort que les autres.',v:false,e:'On chante ensemble, à la même force, sans couvrir les voisins.'},
 {tf:'Boire un peu d’eau peut aider la voix.',v:true,e:'Une voix hydratée est plus à l’aise.'},
 ['Chanter juste, c’est…','chanter les bonnes notes',['chanter le plus fort possible','chanter très vite','chanter sans paroles'],'Chanter juste, c’est suivre la bonne mélodie.'],
 ['Je chante avec une voix…','claire, sans crier',['qui crie','toujours très basse','cassée à force de forcer'],'Crier fatigue la voix.']]});
E('ce1-evar-grandir',{w:.65,items:[
 ['Si je me sens mal dans mon corps, je peux en parler à…','un adulte de confiance',['personne','un inconnu dans la rue','un camarade méchant'],'Un adulte de confiance peut m’écouter et m’aider.'],
 {tf:'Un secret qui me met mal à l’aise doit toujours être gardé.',v:false,e:'Un secret qui me fait peur ou me met mal à l’aise, je peux le dire à un adulte de confiance.'},
 ['Je peux dire « non » quand…','un geste ou un mot me met mal à l’aise',['on me demande de ranger ma chambre','je n’ai pas envie de manger de dessert','la maîtresse me demande de lire'],'Mon corps et mes limites sont à respecter.'],
 ['Pour grandir en bonne santé, j’ai besoin de…','bien manger, bien dormir et bouger',['rester devant un écran','manger seulement des bonbons','ne pas me laver'],'Une bonne alimentation, du sommeil et du mouvement aident à grandir.'],
 ['Quand je réussis un défi, cela me donne…','plus de confiance en moi',['plus de peur','moins d’amis','moins de force'],'Réussir donne confiance.'],
 ['Faire une erreur, c’est…','normal : on apprend en se trompant',['une honte','toujours grave','impossible'],'Se tromper fait partie de l’apprentissage.'],
 {tf:'On peut avoir des qualités différentes de celles de son voisin.',v:true,e:'Chacun est unique, avec ses points forts.'},
 {tf:'Tous les enfants de la classe ont la même taille.',v:false,e:'Chacun grandit à son rythme.'},
 ['Prendre soin de moi, c’est…','me laver et me reposer',['m’énerver','manger sans arrêt','ne jamais bouger'],'Hygiène et repos font partie du soin de soi.'],
 ['Mon intimité, c’est…','ce qui est privé, et que je choisis de partager ou non',['tout ce que je fais à l’école','ce que je montre à tout le monde','mon prénom'],'Mon corps et mes pensées privées font partie de mon intimité.'],
 ['Quelqu’un dit une phrase méchante sur mon corps. Je…','en parle à un adulte',['la crois','me moque de moi','me cache'],'Les moqueries sont blessantes : je peux demander de l’aide.'],
 ['Mes qualités, ce sont…','mes points forts, ce que je fais bien',['mes défauts','mes erreurs','mes peurs'],'Chacun a des qualités à reconnaître.']]});
E('ce1-ap-chaud-froid',{w:.65,items:[
 ['« le marron » est une…','couleur chaude',['couleur froide'],'Le marron rappelle la terre et le bois chauffés par le soleil : on le classe parmi les couleurs chaudes.'],
 ['« le jaune citron » est une…','couleur chaude',['couleur froide'],'Le jaune est lumineux comme le soleil : couleur chaude.'],
 ['« le bleu clair » est une…','couleur froide',['couleur chaude'],'Le bleu fait penser à l’eau et à la glace : couleur froide.'],
 ['« le vert foncé » est une…','couleur froide',['couleur chaude'],'Le vert fait partie des couleurs froides.'],
 ['« le rouge brique » est une…','couleur chaude',['couleur froide'],'Le rouge est une couleur chaude, comme le feu.'],
 ['« le bleu marine » est une…','couleur froide',['couleur chaude'],'Le bleu marine est un bleu foncé : couleur froide.'],
 ['Pour peindre la neige et la glace, je choisis surtout…','des couleurs froides',['des couleurs chaudes'],'Le bleu et le blanc rappellent le froid.'],
 ['Pour peindre un feu de camp, je choisis surtout…','des couleurs chaudes',['des couleurs froides'],'Le rouge, l’orange et le jaune rappellent les flammes.'],
 ['Un tableau avec surtout du bleu et du vert donne une impression de…','fraîcheur',['chaleur','colère','fête'],'Les couleurs froides rafraîchissent le regard.'],
 ['Un tableau avec surtout du rouge et de l’orange donne une impression de…','chaleur',['fraîcheur','tristesse','froid'],'Les couleurs chaudes donnent une impression de chaleur.'],
 {tf:'Mélanger du blanc à un bleu donne un bleu plus clair.',v:true,e:'Le blanc éclaircit une couleur.'},
 ['Un camaïeu, c’est…','plusieurs nuances d’une même couleur',['des couleurs toutes différentes','du noir et du blanc','un dessin sans couleur'],'Par exemple : bleu clair, bleu moyen, bleu foncé.'],
 ['Pour obtenir un bleu plus foncé, j’ajoute un peu de…','noir',['blanc','jaune','rose'],'Le noir fonce une couleur.']]});
E('ce1-ap-lignes-formes',{w:.65,items:[
 ['Une ligne droite qui monte en pente est…','oblique',['verticale','horizontale','ondulée'],'Ni couchée, ni debout : elle est penchée, donc oblique.'],
 ['Une ligne qui va de haut en bas comme un mât est…','verticale',['horizontale','oblique','ondulée'],'Verticale veut dire debout, de haut en bas.'],
 ['Une ligne couchée comme la ligne d’horizon est…','horizontale',['verticale','oblique','brisée'],'Horizontale veut dire couchée.'],
 ['Des rayures sont souvent des lignes…','parallèles',['qui se croisent toutes','en spirale','brisées'],'Des lignes parallèles gardent toujours le même écart.'],
 ['Des lignes parallèles sont des lignes qui…','ne se croisent jamais',['se croisent toujours','forment un cercle','n’ont pas de fin'],'Elles gardent le même écart et ne se rencontrent pas.'],
 ['Une grille de carrés de deux couleurs alternées crée…','un damier',['une spirale','un portrait','une montagne'],'Un damier alterne deux couleurs en carrés.'],
 ['Un motif répété régulièrement crée…','un rythme visuel',['un bruit','un parfum','un goût'],'La répétition donne un effet de rythme.'],
 {tf:'Un zigzag est une ligne brisée.',v:true,e:'Il est fait de segments droits qui changent de direction.'},
 ['Un cercle est formé par une ligne…','courbe et fermée',['droite','brisée','ouverte'],'Le tour d’un cercle est une courbe fermée.'],
 ['Pour dessiner les rayons du soleil, j’utilise des lignes…','droites qui partent du centre',['en spirale','ondulées sans fin','verticales uniquement'],'Les rayons partent du soleil dans toutes les directions.'],
 ['Plusieurs points proches les uns des autres peuvent former…','une ligne ou une forme',['un son','une odeur','un mot'],'Les points alignés suggèrent une ligne.'],
 ['Une ligne qui monte et qui descend comme des vagues est…','ondulée',['droite','verticale','brisée'],'Ondulée comme les vagues.']]});
E('ce1-ap-genres',{w:.65,items:[
 ['« des poires dans un panier » : quel genre de tableau ?','nature morte',['paysage','portrait'],'Des objets immobiles posés : c’est une nature morte.'],
 ['« une rue de village sous la neige » : quel genre de tableau ?','paysage',['portrait','nature morte'],'Un lieu en extérieur : c’est un paysage.'],
 ['« un enfant qui pose dans son fauteuil » : quel genre de tableau ?','portrait',['paysage','nature morte'],'Le sujet est une personne : c’est un portrait.'],
 ['« des vagues et un phare » : quel genre de tableau ?','paysage',['portrait','nature morte'],'Un paysage de bord de mer.'],
 ['« un violon posé sur une table à côté de livres » : quel genre de tableau ?','nature morte',['paysage','portrait'],'Des objets immobiles composent une nature morte.'],
 ['« le visage souriant d’un enfant » : quel genre de tableau ?','portrait',['paysage','nature morte'],'Le visage d’une personne : portrait.'],
 ['Une nature morte représente…','des objets immobiles',['un lieu en extérieur','une personne en mouvement','un dessin animé'],'Fruits, fleurs, bouteilles… posés sur une table.'],
 ['Un paysage montre…','un lieu (campagne, mer, ville)',['uniquement un visage','uniquement des objets sur une table','uniquement un animal'],'Un paysage représente un lieu.'],
 ['Un portrait montre…','une personne, souvent son visage',['un paysage','une nature morte','un objet seul'],'Le portrait est centré sur une personne.'],
 ['Claude Monet a peint…','des nymphéas (nénuphars)',['La Joconde','des tournesols','le plafond de la chapelle Sixtine'],'Monet a peint les nymphéas de son jardin à Giverny.'],
 ['Qui a peint « La Nuit étoilée » ?','Vincent van Gogh',['Claude Monet','Léonard de Vinci','Pablo Picasso'],'La Nuit étoilée est un tableau de Van Gogh.'],
 ['Le musée du Louvre se trouve à…','Paris',['Marseille','Lyon','Bordeaux'],'Le Louvre est un grand musée parisien.']]});
E('ce1-mu-parametres',{w:.65,items:[
 ['« une note longue ou une note brève » : de quelle caractéristique parle-t-on ?','la durée',['la hauteur','l’intensité','le timbre'],'Longue ou brève : la durée du son.'],
 ['« un piano ou une guitare » : de quelle caractéristique parle-t-on ?','le timbre',['la hauteur','l’intensité','la durée'],'On reconnaît l’instrument à son timbre.'],
 ['« un son qui monte ou qui descend » : de quelle caractéristique parle-t-on ?','la hauteur',['la durée','l’intensité','le timbre'],'Monter ou descendre : la hauteur.'],
 ['« de plus en plus fort » : de quelle caractéristique parle-t-on ?','l’intensité',['la hauteur','la durée','le timbre'],'Plus ou moins fort : l’intensité.'],
 ['En musique, « pianissimo » veut dire…','très doux',['très fort','très lent','très aigu'],'Pianissimo = très doux.'],
 ['En musique, « fortissimo » veut dire…','très fort',['très doux','très lent','très grave'],'Fortissimo = très fort.'],
 ['Deux instruments jouent la même note, mais on les reconnaît. C’est grâce au…','timbre',['tempo','refrain','couplet'],'Le timbre est la couleur du son.'],
 ['Le tuba joue des sons plutôt…','graves',['aigus','toujours doux','toujours courts'],'Le tuba est un gros instrument aux sons graves.'],
 ['La petite flûte (piccolo) joue des sons très…','aigus',['graves','lents','mous'],'Le piccolo est une petite flûte aux sons aigus.'],
 ['Une note tenue longtemps a une durée…','longue',['courte','forte','grave'],'La durée mesure combien de temps dure le son.'],
 {tf:'L’intensité d’un son, c’est sa force.',v:true,e:'Un son peut être doux ou fort.'},
 {tf:'La hauteur d’un son dit s’il est long ou court.',v:false,e:'Long ou court : la durée. La hauteur : aigu ou grave.'}]});
E('ce1-eps-orientation',{w:.65,items:[
 ['Sur un plan, la légende sert à…','comprendre les symboles',['colorier le plan','compter les pas','chanter'],'La légende explique ce que représente chaque signe.'],
 ['Un plan est dessiné comme si on regardait…','d’en haut',['de côté','de très loin sous l’eau','de dos'],'Un plan montre le terrain vu du dessus.'],
 ['Pour retrouver mon chemin, je repère…','des éléments connus : un arbre, un banc, un mur',['la couleur de mes chaussures','la météo uniquement','un nuage'],'Les éléments fixes servent de repères.'],
 ['En course d’orientation, je reste…','avec mon groupe',['seul très loin','caché','dans un buisson'],'Pour ma sécurité, on ne s’éloigne pas du groupe.'],
 ['Le but d’une course d’orientation est de…','trouver les balises en choisissant un bon chemin',['courir le plus vite possible sans plan','éviter les balises','se cacher'],'On lit le plan pour trouver chaque balise.'],
 ['Si je ne retrouve plus la balise, je…','reviens à un point connu',['continue au hasard','crie et pars','retire mon plan'],'Revenir à un repère connu aide à se repérer.'],
 {tf:'Dans une course d’orientation, on peut ignorer le plan.',v:false,e:'Le plan est l’outil principal pour se repérer.'},
 ['Une balise est…','un repère à trouver sur le terrain',['un ballon','un animal','un sifflet'],'Les balises servent à vérifier le parcours.'],
 ['Pour savoir où est le Nord, je peux utiliser…','une boussole',['une règle','une balance','un sablier'],'L’aiguille de la boussole indique le Nord.'],
 ['Sur un plan de la cour, un rond rouge peut représenter…','une balise',['un animal','le soleil','un nuage'],'Les symboles sont expliqués dans la légende.'],
 ['Avant de partir, je regarde mon plan et je repère…','le départ et l’arrivée',['la fin de l’année','la couleur du ciel','les prénoms des élèves'],'Savoir d’où je pars et où je vais est le début de tout parcours.'],
 ['Un parcours d’orientation dans le gymnase se fait avec…','un plan de la salle',['une carte du monde','un horaire','un calendrier'],'On utilise le plan du lieu où l’on se trouve.']]});
E('ce1-eps-gym',{w:.65,items:[
 ['Avant une séance de gym, je dois…','m’échauffer',['m’allonger','manger','dormir'],'L’échauffement prépare les muscles et évite les blessures.'],
 ['Pour une bonne réception, mes genoux sont…','pliés',['bloqués','tendus','en l’air'],'Plier les jambes amortit le choc.'],
 ['Pour tenir en équilibre sur une poutre, je regarde…','devant moi',['mes pieds tout le temps','le plafond','derrière moi'],'Regarder devant aide à garder l’équilibre.'],
 ['Pour la gym, je retire…','mes bijoux et accessoires qui peuvent blesser',['mes chaussettes','mon prénom','mon tee-shirt'],'Un bijou peut s’accrocher et blesser.'],
 ['Pendant qu’un camarade passe, je…','attends mon tour et je regarde',['cours dans la salle','pousse le matériel','m’assieds sur le tapis'],'On attend sans gêner celui qui passe.'],
 ['Pendant une roulade avant, mon dos est…','arrondi',['plat et raide','cambré','tendu en arrière'],'Un dos arrondi roule bien et évite de se faire mal.'],
 ['Pendant une roulade, mes mains…','se posent sur le tapis',['restent dans les poches','sont derrière le dos','tirent mes cheveux'],'Les mains au sol aident à rouler.'],
 {tf:'On peut sauter du praticable sans regarder où l’on atterrit.',v:false,e:'On regarde toujours où l’on se réceptionne.'},
 {tf:'S’étirer à la fin de la séance aide le corps à récupérer.',v:true,e:'Les étirements calment les muscles.'},
 ['Un enchaînement, c’est…','plusieurs mouvements qui se suivent',['un seul mouvement','un jeu avec un ballon','une pause'],'On relie plusieurs figures entre elles.'],
 ['Le tapis sert à…','amortir les chutes',['mesurer la salle','faire du bruit','décorer le mur'],'Un tapis épais adoucit la réception.'],
 ['À la fin d’une figure, je…','me stabilise quelques secondes',['m’effondre','cours partout','pars sans regarder'],'Rester immobile montre que l’on contrôle son mouvement.']]});
E('ce1-eps-opposition',{w:.65,items:[
 {tf:'Dans un jeu d’opposition, je peux serrer le cou de mon partenaire.',v:false,e:'Le cou est interdit : on ne fait jamais mal à l’autre.'},
 {tf:'On peut mordre pour gagner.',v:false,e:'Mordre est interdit et blesse.'},
 ['Mon partenaire est plus petit que moi. Je…','adapte ma force',['utilise toute ma force','le pousse fort','le soulève sans le prévenir'],'On adapte son action à la taille de son partenaire.'],
 ['Le but d’un jeu d’opposition est de…','gagner en respectant les règles',['faire mal','crier le plus fort','gagner à tout prix'],'Gagner n’a de valeur qu’en respectant les règles.'],
 ['Après avoir perdu, je…','accepte la défaite et je félicite',['boude','me fâche','pleure fort pour que tout le monde le sache'],'Savoir perdre fait partie du jeu.'],
 ['Avant de commencer une séance de judo, je retire…','mes chaussures et mes bijoux',['mon sourire','mon prénom','mes lunettes de soleil uniquement'],'On évite de blesser son partenaire et d’abîmer le tatami.'],
 ['Au judo, le sol sur lequel on lutte s’appelle…','le tatami',['le parquet','le terrain','le filet'],'Le tatami est un tapis qui amortit les chutes.'],
 ['Au judo, le vêtement s’appelle…','le judogi',['le pyjama de plage','le maillot de foot','la salopette'],'Le judogi est le vêtement blanc des judokas.'],
 ['Au judo, on salue…','son partenaire',['le plafond','personne','seulement le professeur sans son partenaire'],'Le salut marque le respect.'],
 ['Les coups de pied et de poing sont…','interdits dans nos jeux de lutte',['autorisés','encouragés','obligatoires'],'Dans les jeux d’opposition, on ne frappe pas.'],
 ['Pour garder mon équilibre, je…','garde les pieds écartés et les genoux souples',['reste sur la pointe des pieds','ferme les yeux','joins les pieds très serrés'],'Une base large aide à rester stable.'],
 ['Mon partenaire me dit « stop ». Je…','m’arrête tout de suite',['continue','lui tords le bras','me moque de lui'],'Le mot stop arrête toujours le jeu.']]});
E('ce1-evar-relations',{w:.65,items:[
 ['Un secret me fait peur. Je…','en parle à un adulte de confiance',['le garde pour toujours','l’écris sur un mur','le dis à des inconnus'],'Un secret qui fait peur doit être partagé avec un adulte.'],
 ['Un ami est triste. Je peux…','l’écouter et lui demander comment l’aider',['rire de lui','l’ignorer','changer de place'],'Écouter montre qu’on tient à lui.'],
 ['Dire « merci » montre…','de la politesse et du respect',['de la peur','de la colère','de la honte'],'Merci est un mot qui fait plaisir et reconnaît ce qu’on a reçu.'],
 ['Je ne suis pas d’accord avec mon ami. Je…','dis ce que je pense avec des mots gentils',['le tape','pars en criant','casse son jouet'],'On peut exprimer son désaccord sans blesser.'],
 {tf:'Se moquer de quelqu’un est une marque d’amitié.',v:false,e:'Les moqueries blessent : un ami respecte l’autre.'},
 {tf:'Tout le monde a le droit de dire non.',v:true,e:'On peut refuser ce qui nous gêne.'},
 ['Pour garder un ami, il faut…','être honnête et tenir ses promesses',['mentir souvent','le contrôler','cacher la vérité'],'La confiance repose sur l’honnêteté.'],
 ['La confiance, c’est savoir que l’autre…','ne me fera pas de mal et tient sa parole',['fait toujours comme moi','pense comme moi','a les mêmes goûts que moi'],'Avoir confiance, c’est se sentir en sécurité avec quelqu’un.'],
 ['Un camarade ne veut pas jouer avec moi aujourd’hui. Je…','respecte son choix',['le force','le menace','le suis partout'],'Chacun a le droit de choisir ses jeux.'],
 ['Quand on partage un jeu, chacun…','a son tour',['joue seul','prend tout','crie'],'Partager, c’est donner la même place à chacun.'],
 ['Pour faire des excuses, je dis…','« je suis désolé » et j’essaie de réparer',['rien','que ce n’est pas ma faute','que c’est le problème de l’autre'],'Des excuses sincères montrent qu’on a compris.'],
 ['Un bon ami…','respecte mes choix',['décide à ma place','me menace','me ment'],'L’amitié se fonde sur le respect.']]});
E('ce1-evar-stereotypes',{w:.65,items:[
 ['« Les garçons ne pleurent pas. » C’est…','un stéréotype',['une règle de la loi','une vérité','un proverbe scientifique'],'Tout le monde peut pleurer quand il est triste.'],
 ['« Les filles ne savent pas jouer au foot. » C’est…','faux : c’est un stéréotype',['vrai pour toutes','une règle du football','un fait scientifique'],'Les filles et les garçons peuvent jouer au foot.'],
 {tf:'Un garçon peut être infirmier.',v:true,e:'Tous les métiers sont ouverts aux filles et aux garçons.'},
 {tf:'Une fille peut être mécanicienne.',v:true,e:'Tous les métiers sont ouverts aux filles et aux garçons.'},
 {tf:'Un papa peut faire la cuisine.',v:true,e:'Les tâches de la maison peuvent être partagées.'},
 {tf:'Toutes les filles aiment la danse.',v:false,e:'Chacun a ses goûts : généraliser est un stéréotype.'},
 ['Les métiers sont ouverts…','aux filles comme aux garçons',['aux garçons uniquement','aux filles uniquement','aux adultes de plus de 100 ans'],'L’égalité, c’est les mêmes chances pour tous.'],
 ['Pour choisir un jouet, je regarde…','ce que j’aime vraiment',['la couleur de l’emballage seulement','ce que mes voisins pensent','si c’est pour filles ou garçons'],'On choisit selon ses goûts, pas selon un stéréotype.'],
 ['L’égalité entre filles et garçons veut dire…','mêmes droits et mêmes chances',['mêmes vêtements pour tous','mêmes goûts pour tous','mêmes jeux obligatoires'],'L’égalité, ce n’est pas être identiques, c’est avoir les mêmes droits.'],
 ['Dire « tu pleures comme une fille » est…','blessant et stéréotypé',['gentil','drôle pour tout le monde','un compliment'],'Cela rabaisse les filles et les garçons à la fois.'],
 ['Chacun a le droit de choisir ses activités…','selon ses goûts',['selon son prénom','selon sa taille','selon ce que disent les autres'],'Les activités ne sont pas réservées aux filles ou aux garçons.'],
 ['Une publicité montre toujours les filles avec des poupées. Je peux me dire…','que chacun peut choisir ses jouets',['que ce n’est pas autorisé de jouer autrement','que tous les garçons détestent les poupées','que je n’ai pas le droit de choisir'],'Une publicité peut utiliser des stéréotypes : on peut les remettre en question.']]});
E('ce1-mu-oeuvres',{w:.65,items:[
 ['Dans Pierre et le loup, qui raconte l’histoire ?','un narrateur',['le loup','le canard','le chat'],'Un narrateur raconte et la musique joue les personnages.'],
 ['Dans Pierre et le loup, les coups de fusil des chasseurs sont joués par…','la grosse caisse et les timbales',['la flûte','le violon','la harpe'],'Les percussions imitent les coups de feu.'],
 ['Pierre et le loup raconte l’histoire…','d’un garçon qui capture un loup',['d’un voyage en mer','d’un fantôme','d’un robot'],'Pierre, aidé de ses amis, capture le loup.'],
 ['Dans Le Carnaval des animaux, le cygne est joué par…','le violoncelle',['la trompette','le tambour','la flûte à bec'],'Le Cygne est une mélodie douce du violoncelle.'],
 ['Dans « Tortues », la musique est…','très lente',['très rapide','très aiguë','très bruyante'],'La musique est ralentie pour imiter la lenteur des tortues.'],
 ['Dans « Le coucou au fond des bois », l’animal est évoqué par…','la clarinette',['la grosse caisse','le tuba','le triangle'],'La clarinette imite le chant du coucou.'],
 ['Camille Saint-Saëns est…','un compositeur français',['un peintre','un cuisinier','un sculpteur'],'Il a composé Le Carnaval des animaux.'],
 ['Sergueï Prokofiev est…','un compositeur russe',['un peintre italien','un cuisinier français','un joueur de foot'],'Il a composé Pierre et le loup.'],
 ['Un compositeur…','écrit la musique',['construit des instruments','dessine des tableaux','fait la cuisine'],'Le compositeur invente et écrit les œuvres musicales.'],
 ['Un orchestre est dirigé par…','un chef d’orchestre',['un clown','un facteur','un maçon'],'Le chef d’orchestre donne les départs et le tempo.'],
 ['Pour mieux écouter une œuvre, je…','fais silence et j’écoute avec attention',['bavarde avec mon voisin','crie','joue à autre chose'],'L’écoute demande de l’attention.'],
 ['Une œuvre pour orchestre est jouée par…','beaucoup d’instruments',['un seul instrument','aucun instrument','un seul chanteur'],'Un orchestre rassemble de nombreux musiciens.']]});

/* ---------- Vague 2 (24/10/2026) : pools plus larges, fractions et anglais ---------- */
E('ce1-ma-fractions',{w:.6,items:[
 ['Comment lit-on 3/4 ?','trois quarts',['un quart','trois demis','quatre tiers'],'3/4 se lit « trois quarts » : 3 parts sur 4.'],
 ['Comment lit-on 2/3 ?','deux tiers',['trois demis','un tiers','deux quarts'],'2/3 se lit « deux tiers » : 2 parts sur 3.'],
 ['Comment lit-on 1/7 ?','un septième',['un huitième','un sixième','un neuvième'],'Le dénominateur 7 donne « septième ».'],
 ['Comment lit-on 1/9 ?','un neuvième',['un huitième','un septième','un dixième'],'Le dénominateur 9 donne « neuvième ».'],
 {n:'Le demi de 16 est…',a:8,e:'16 partagé en 2 parts égales : 8.'},
 {n:'Le quart de 12 est…',a:3,e:'12 partagé en 4 parts égales : 3.'},
 {n:'Le tiers de 12 est…',a:4,e:'12 partagé en 3 parts égales : 4.'},
 {n:'Le cinquième de 10 est…',a:2,e:'10 partagé en 5 parts égales : 2.'},
 {n:'Le quart de 20 est…',a:5,e:'20 partagé en 4 parts égales : 5.'},
 {n:'Le dixième de 30 est…',a:3,e:'30 partagé en 10 parts égales : 3.'},
 ['Quelle fraction est la plus grande : 1/3 ou 1/5 ?','1/3',['1/5','elles sont égales'],'Quand on partage en moins de parts, chaque part est plus grande : 1/3 > 1/5.'],
 ['Une tablette a 8 carrés. J’en mange 2. J’ai mangé…','2/8',['8/2','2/10','6/8'],'2 carrés mangés sur 8 : 2/8.'],
 ['Si je mange les 4 quarts d’une pizza, j’ai mangé…','toute la pizza',['la moitié','un quart','rien'],'4 quarts forment un entier.']]});
E('ce1-en-school',{w:.6,items:[
 ['Comment dit-on « cahier » en anglais ?','<span lang="en">notebook</span>',['<span lang="en">pencil</span>','<span lang="en">ruler</span>','<span lang="en">scissors</span>'],'« cahier » se dit notebook.'],
 ['Comment dit-on « trousse » en anglais ?','<span lang="en">pencil case</span>',['<span lang="en">school bag</span>','<span lang="en">book</span>','<span lang="en">rubber</span>'],'« trousse » se dit pencil case.'],
 ['Comment dit-on « chaise » en anglais ?','<span lang="en">chair</span>',['<span lang="en">desk</span>','<span lang="en">board</span>','<span lang="en">book</span>'],'« chaise » se dit chair.'],
 ['Comment dit-on « table d’école, bureau » en anglais ?','<span lang="en">desk</span>',['<span lang="en">chair</span>','<span lang="en">pen</span>','<span lang="en">ruler</span>'],'« bureau d’élève » se dit desk.'],
 ['Comment dit-on « maître / maîtresse » en anglais ?','<span lang="en">teacher</span>',['<span lang="en">book</span>','<span lang="en">desk</span>','<span lang="en">pencil</span>'],'« maître, maîtresse » se dit teacher.'],
 ['Comment dit-on « tableau » (de la classe) en anglais ?','<span lang="en">board</span>',['<span lang="en">chair</span>','<span lang="en">rubber</span>','<span lang="en">glue stick</span>'],'« tableau » se dit board.'],
 ['Que veut dire <span lang="en">notebook</span> ?','cahier',['crayon','règle','gomme'],'notebook = cahier.'],
 ['Que veut dire <span lang="en">pencil case</span> ?','trousse',['cartable','livre','stylo'],'pencil case = trousse.'],
 ['Que veut dire <span lang="en">chair</span> ?','chaise',['table','tableau','cahier'],'chair = chaise.'],
 ['Que veut dire <span lang="en">teacher</span> ?','maître ou maîtresse',['élève','directeur','cartable'],'teacher = maître, maîtresse.']]});

})();
