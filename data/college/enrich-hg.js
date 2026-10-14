/* MathQuest — Histoire-géographie collège : enrichissement V8.13 des chapitres historiques (variété ≥ 20 questions distinctes).
   Programmes d'histoire-géographie du cycle 3 (6e) et du cycle 4 (5e-3e), BO n°31 du 30/07/2020, toujours applicables au collège
   en 2026-2027. Les questions s'ajoutent au générateur d'origine (mélange) ; chacune a une explication. */
(function(){
'use strict';
const MQ=window.MQCollege;if(!MQ)return;const E=(id,items)=>MQ.enrich(id,{items,w:.45});
/* ---------- 6e ---------- */
E('hg6n',[
 ['Dans quelle province de l’Empire romain Jésus vit-il ?','la Judée',['la Gaule','l’Égypte','la Grèce'],'Jésus vit en Judée (Palestine), province romaine, au Ier siècle.'],
 ['Quels textes racontent la vie et l’enseignement de Jésus ?','les Évangiles',['la Torah','le Coran','l’Iliade'],'Les Évangiles font partie du Nouveau Testament.'],
 ['Quel apôtre voyage beaucoup pour diffuser le christianisme dans l’Empire ?','Paul',['Auguste','Périclès','Constantin'],'Paul de Tarse fonde des communautés chrétiennes autour de la Méditerranée.'],
 ['Pourquoi les chrétiens sont-ils parfois persécutés dans l’Empire romain ?','ils refusent de rendre un culte à l’empereur',['ils refusent de payer l’impôt','ils parlent grec','ils sont tous esclaves'],'Le refus du culte impérial est vu comme une menace pour l’ordre romain.'],
 ['Comment appelle-t-on la religion des chrétiens qui croient en un seul Dieu ?','un monothéisme',['un polythéisme','une philosophie','une mythologie'],'Comme le judaïsme, le christianisme est un monothéisme.'],
 ['Quel empereur fait du christianisme la religion officielle de l’Empire, à la fin du IVe siècle ?','Théodose',['Constantin','Auguste','Néron'],'En 380, Théodose fait du christianisme la religion officielle de l’Empire, puis interdit les cultes païens en 392.',2],
 {tf:'L’édit de Milan (313) interdit le christianisme.',v:false,e:'Au contraire, il accorde la liberté de culte aux chrétiens.'},
 ['Le christianisme est né de quelle religion ?','du judaïsme',['de l’islam','de la religion grecque','du bouddhisme'],'Jésus et ses premiers disciples sont juifs.',2]]);
E('hg6o',[
 ['Vers quelle date approximative apparaît l’agriculture au Proche-Orient ?','vers 10 000 avant J.-C.',['vers 1 000 avant J.-C.','vers l’an 0','vers 100 000 avant J.-C.'],'La néolithisation commence vers 10 000 av. J.-C. dans le Croissant fertile.'],
 ['Comment appelle-t-on la région du Proche-Orient où l’agriculture apparaît d’abord ?','le Croissant fertile',['le Sahara','la Gaule','la Sibérie'],'Le Croissant fertile s’étend de la Mésopotamie au Levant.'],
 ['Quel mode de vie remplace progressivement celui des chasseurs-cueilleurs nomades ?','la vie sédentaire de cultivateurs-éleveurs',['la vie en ville industrielle','le nomadisme maritime','la vie de chevalier'],'Au Néolithique, les humains se sédentarisent dans des villages.'],
 ['Quel animal fait partie des premiers animaux domestiqués pour l’élevage ?','le mouton',['le cheval de course','le lion','le mammouth'],'Moutons, chèvres, bœufs et porcs sont domestiqués au Néolithique.'],
 ['Quelle invention permet de conserver les récoltes au Néolithique ?','la poterie',['l’imprimerie','la boussole','la machine à vapeur'],'Les poteries en terre cuite servent à stocker grains et liquides.'],
 {tf:'L’agriculture est apparue à plusieurs endroits du monde, de façon indépendante.',v:true,e:'Proche-Orient, Chine, Amérique, Afrique… : plusieurs foyers.'},
 ['Que signifie « Néolithique » ?','âge de la pierre nouvelle (polie)',['âge du fer','âge des métaux précieux','âge des villes'],'Néo = nouveau, lithos = pierre : on polit la pierre.',2],
 ['Quel changement social accompagne la sédentarisation ?','l’apparition de villages et de réserves de nourriture',['la fin de toute inégalité','l’invention d’Internet','la disparition des outils'],'Les surplus permettent des réserves… et parfois des inégalités.',2]]);
E('hg6p',[
 ['Comment s’appelle l’assemblée des citoyens à Athènes ?','l’Ecclésia',['le Sénat','le Parlement','le Forum'],'L’Ecclésia vote les lois et décide de la guerre et de la paix.'],
 ['Qui peut être citoyen à Athènes au Ve siècle av. J.-C. ?','un homme libre, né de parents athéniens',['toute personne vivant à Athènes','les femmes et les esclaves','les étrangers riches'],'Les femmes, les esclaves et les métèques sont exclus.'],
 ['Comment s’appelle un étranger libre installé à Athènes ?','un métèque',['un citoyen','un hilote','un sénateur'],'Les métèques ne sont pas citoyens.'],
 ['Sur quelle colline se réunit l’Ecclésia ?','la Pnyx',['l’Acropole','le Capitole','l’Olympe'],'L’assemblée siège sur la colline de la Pnyx.'],
 ['Que signifie « démocratie » ?','le pouvoir du peuple',['le pouvoir d’un seul','le pouvoir des riches','le pouvoir des dieux'],'Dêmos = peuple, kratos = pouvoir.'],
 ['Quel monument dédié à Athéna domine l’Acropole ?','le Parthénon',['le Colisée','la pyramide de Khéops','le Panthéon de Rome'],'Le Parthénon est construit au Ve siècle av. J.-C.'],
 {tf:'À Athènes, les femmes votent à l’assemblée.',v:false,e:'Les femmes ne sont pas citoyennes et ne votent pas.'},
 ['Quelle est une limite de la démocratie athénienne ?','une minorité seulement de la population est citoyenne',['les lois sont écrites par un roi','il n’y a pas de vote','les citoyens sont tirés au sort pour devenir esclaves'],'Environ un habitant sur dix est citoyen.',2],
 ['Comment certains magistrats athéniens sont-ils désignés ?','par tirage au sort',['par héritage','par le pharaon','par concours sportif'],'Beaucoup de charges sont tirées au sort parmi les citoyens.',2]]);
E('hg6q',[
 ['Qui devient le premier empereur romain en 27 av. J.-C. ?','Auguste',['Jules César','Constantin','Néron'],'Octave reçoit le titre d’Auguste en 27 av. J.-C.'],
 ['Que signifie « Pax Romana » ?','la paix romaine',['la guerre romaine','le pain romain','la route romaine'],'Longue période de paix relative dans l’Empire (Ier-IIe siècles).'],
 ['Comment appelle-t-on la diffusion du mode de vie romain dans les provinces ?','la romanisation',['la colonisation grecque','la mondialisation','la christianisation'],'Villes, routes, langue latine, droit romain se diffusent.'],
 ['Quel monument romain sert aux spectacles de gladiateurs ?','l’amphithéâtre',['l’aqueduc','le temple','les thermes'],'Exemple : le Colisée à Rome, les arènes de Nîmes.'],
 ['À quoi sert un aqueduc ?','à amener l’eau jusqu’à la ville',['à défendre la frontière','à organiser des courses de chars','à prier les dieux'],'Exemple : le pont du Gard.'],
 ['Quelle langue se diffuse dans la partie occidentale de l’Empire ?','le latin',['le grec','l’arabe','le français'],'Le latin est la langue de l’administration en Occident.'],
 ['En 212, que fait l’édit de Caracalla ?','il donne la citoyenneté romaine à presque tous les hommes libres de l’Empire',['il interdit le christianisme','il partage l’Empire en deux','il fonde Rome'],'Les hommes libres de l’Empire deviennent citoyens romains.',2],
 {tf:'Le limes est la frontière fortifiée de l’Empire romain.',v:true,e:'Le limes protège l’Empire des peuples extérieurs.',d:2}]);
E('hg6r',[
 ['Quelle dynastie gouverne la Chine en même temps que l’Empire romain ?','la dynastie Han',['les Capétiens','les Ptolémées','les Mérovingiens'],'Les Han règnent de 206 av. J.-C. à 220 apr. J.-C.'],
 ['Quel produit précieux la Chine exporte-t-elle vers l’Occident ?','la soie',['le maïs','le café','le chocolat'],'La soie donne son nom aux « routes de la soie ».'],
 ['Que reçoit la Chine en échange, en particulier ?','de l’or, de l’argent et du verre',['du pétrole','des pommes de terre','des voitures'],'Les Romains paient en métaux précieux et en produits comme le verre.'],
 ['Comment les marchandises voyagent-elles sur les routes de la soie ?','de proche en proche, par de nombreux intermédiaires',['en un seul voyage direct Rome-Chine','par avion','uniquement par chemin de fer'],'Caravanes et marchands se relaient : Parthes, Indiens, etc.'],
 ['Quelle grande construction défensive les Han renforcent-ils au nord ?','la Grande Muraille',['le limes du Rhin','le mur d’Hadrien','les pyramides'],'Elle protège la Chine des peuples nomades du nord.'],
 ['Quelle invention chinoise date de l’époque des Han ?','le papier',['l’imprimerie à caractères mobiles en Europe','la machine à vapeur','la poudre à canon moderne'],'Le papier est mis au point vers le IIe siècle.',2],
 {tf:'Les Romains et les Chinois se connaissaient très bien et voyageaient directement les uns chez les autres.',v:false,e:'Ils se connaissent mal : les échanges passent par des intermédiaires.'},
 ['Quel animal est indispensable aux caravanes des routes de la soie ?','le chameau',['l’éléphant','le cheval de trait','le renne'],'Chameaux et dromadaires traversent déserts et steppes.',2]]);
E('hg6s',[
 ['Qu’est-ce qu’un milieu aride ?','un milieu où il pleut très peu',['un milieu très humide','une grande ville','une forêt tropicale'],'Les déserts sont des milieux arides.'],
 ['Quel est un exemple d’espace à fortes contraintes liées au froid ?','le Grand Nord canadien',['la plaine de la Beauce','le bassin parisien','la Côte d’Azur'],'Froid extrême, nuit polaire, sol gelé (pergélisol).'],
 ['Qu’est-ce qu’une oasis ?','un lieu du désert où l’eau permet de cultiver',['une montagne enneigée','un port de pêche','une île tropicale'],'L’eau souterraine permet l’agriculture dans le désert.'],
 ['Quelle contrainte rencontre-t-on en haute montagne ?','la pente et le froid',['la sécheresse permanente','la chaleur tropicale','l’absence totale de relief'],'Pentes, altitude, froid et enneigement.'],
 ['Quel aménagement permet de cultiver sur des pentes fortes ?','les terrasses',['les polders','les canaux de navigation','les autoroutes'],'Les terrasses créent des surfaces planes cultivables.'],
 ['Pourquoi des humains s’installent-ils dans un milieu difficile ?','pour ses ressources (minerais, tourisme, pétrole…)',['parce qu’il y fait toujours bon','parce qu’il n’y a aucune contrainte','par hasard uniquement'],'Les ressources peuvent attirer malgré les contraintes.',2],
 {tf:'Les espaces à fortes contraintes sont souvent faiblement peuplés.',v:true,e:'Déserts, hautes montagnes et régions polaires ont de faibles densités.'},
 ['Qu’est-ce qu’une densité de population ?','le nombre moyen d’habitants par km²',['le nombre total d’habitants d’un pays','la superficie d’un pays','le nombre de villes'],'Densité = population ÷ superficie.',2]]);
E('hg6t',[
 ['À quoi sert l’échelle d’une carte ?','à mesurer les distances réelles',['à connaître la date du document','à donner le titre','à indiquer la météo'],'L’échelle relie une distance sur la carte à la distance réelle.'],
 ['Sur une carte, où se trouve en général le nord ?','en haut',['en bas','à gauche','au centre'],'La rose des vents ou une flèche N indique le nord, en général en haut.'],
 ['Qu’est-ce qu’une frise chronologique ?','une ligne du temps où l’on place des événements',['une carte du relief','un tableau de chiffres','un dessin de monument'],'On y place dates et périodes dans l’ordre.'],
 ['Que faut-il identifier d’abord dans un document historique ?','sa nature, son auteur et sa date',['la couleur du papier','le nombre de mots','le prix du document'],'Présenter un document : nature, auteur, date, source.'],
 ['Dans le calendrier chrétien, quelle année suit directement l’an 1 av. J.-C. ?','l’an 1 apr. J.-C.',['l’an 0','l’an 2 av. J.-C.','l’an 10 apr. J.-C.'],'Il n’y a pas d’an 0 : on passe de 1 av. J.-C. à 1 apr. J.-C.',2],
 ['Le IIIe siècle av. J.-C. correspond aux années…','de 300 à 201 av. J.-C.',['de 201 à 300 av. J.-C.','de 300 à 399 av. J.-C.','de 200 à 101 av. J.-C.'],'Avant J.-C., on compte à rebours : le IIIe siècle va de 300 à 201.',3],
 {tf:'La légende d’une carte explique la signification des couleurs et des symboles.',v:true,e:'Sans légende, on ne peut pas lire la carte.'},
 ['Sur une carte au 1/100 000, 1 cm représente…','1 km',['100 m','10 km','100 km'],'100 000 cm = 1 000 m = 1 km.',2]]);
/* ---------- 5e ---------- */
E('hg5m',[
 ['Qui peint « La Joconde » ?','Léonard de Vinci',['Michel-Ange','Raphaël','Botticelli'],'Léonard de Vinci, vers 1503-1519.'],
 ['Qui peint le plafond de la chapelle Sixtine ?','Michel-Ange',['Léonard de Vinci','Dürer','Rembrandt'],'Michel-Ange réalise le plafond entre 1508 et 1512.'],
 ['Dans quel pays la Renaissance artistique commence-t-elle ?','en Italie',['en Angleterre','en Espagne','en Russie'],'Florence est un grand foyer de la Renaissance (XVe siècle).'],
 ['Quelle technique permet de donner l’illusion de la profondeur dans un tableau ?','la perspective',['la mosaïque','l’enluminure','le vitrail'],'Les peintres de la Renaissance maîtrisent la perspective.'],
 ['Qui invente l’imprimerie à caractères mobiles en Europe, vers 1450 ?','Gutenberg',['Galilée','Érasme','Luther'],'L’imprimerie diffuse plus vite les livres et les idées.'],
 ['Comment appelle-t-on les savants de la Renaissance qui étudient les textes antiques et placent l’homme au centre ?','les humanistes',['les croisés','les moines copistes','les conquistadors'],'Exemple : Érasme.'],
 ['Quel roi de France fait venir Léonard de Vinci en France ?','François Ier',['Louis XIV','Henri IV','Philippe Auguste'],'Léonard finit sa vie à Amboise, invité par François Ier.',2],
 ['De quelle époque les artistes de la Renaissance s’inspirent-ils ?','de l’Antiquité grecque et romaine',['de la Préhistoire','de l’époque contemporaine','du Japon médiéval'],'« Renaissance » : renouveau des modèles antiques.',2]]);
E('hg5n',[
 ['En quelle année débute la première croisade ?','1096',['1492','800','1789'],'Le pape Urbain II l’appelle en 1095 ; elle part en 1096.'],
 ['Quelle ville sainte les croisés prennent-ils en 1099 ?','Jérusalem',['Rome','La Mecque','Constantinople'],'Jérusalem est prise en 1099.'],
 ['Quelle région de l’Espagne est longtemps sous domination musulmane ?','al-Andalus',['la Castille entière dès l’an 1000','la Catalogne romaine','la Galice'],'Al-Andalus désigne l’Espagne musulmane.'],
 ['Comment appelle-t-on la reconquête chrétienne de la péninsule Ibérique ?','la Reconquista',['la Renaissance','la Réforme','la croisade des Albigeois'],'Elle s’achève en 1492 avec la prise de Grenade.'],
 ['Quelle ville est la capitale de l’Empire byzantin ?','Constantinople',['Bagdad','Cordoue','Venise'],'Constantinople (aujourd’hui Istanbul).'],
 ['Quelles villes italiennes s’enrichissent par le commerce en Méditerranée ?','Venise et Gênes',['Paris et Londres','Lyon et Lille','Madrid et Lisbonne'],'Elles commercent avec l’Orient.'],
 ['Que transmettent notamment les savants arabes à l’Occident ?','des savoirs scientifiques (chiffres, médecine, astronomie)',['l’imprimerie','la boussole européenne','la démocratie athénienne'],'Les chiffres dits arabes et de nombreux textes passent par le monde musulman.',2],
 ['En quelle année Constantinople est-elle prise par les Ottomans ?','1453',['1099','1204','1789'],'La prise de 1453 met fin à l’Empire byzantin.',2]]);
E('hg5o',[
 ['Comment s’appelle le paysan qui dépend d’un seigneur et lui doit des taxes et des corvées ?','un serf ou un vilain',['un chevalier','un évêque','un bourgeois'],'Les paysans dépendent du seigneur dans la seigneurie.'],
 ['Qu’est-ce que la corvée ?','un travail gratuit dû au seigneur',['une fête religieuse','un impôt royal moderne','un tournoi'],'Les paysans travaillent gratuitement sur les terres du seigneur.'],
 ['Quel bâtiment est le symbole du pouvoir du seigneur ?','le château fort',['la cathédrale','la mairie','l’usine'],'Le château protège et domine la seigneurie.'],
 ['Qu’est-ce que la dîme ?','un impôt versé à l’Église',['un impôt versé au roi','une taxe sur les ponts','une récompense de chevalier'],'Environ un dixième des récoltes, pour l’Église.'],
 ['Comment appelle-t-on les habitants des villes au Moyen Âge ?','les bourgeois',['les serfs','les moines','les vassaux'],'Bourgeois vient de « bourg », la ville.'],
 ['Quel grand style d’architecture religieuse apparaît au XIIe siècle avec de hautes voûtes et de grands vitraux ?','le gothique',['le roman','le baroque','le classique'],'Exemple : Notre-Dame de Paris, Chartres.'],
 ['Qu’est-ce qu’une charte de franchise ?','un document qui accorde des libertés à une ville',['un contrat de mariage','une carte maritime','un traité de paix'],'Les villes obtiennent des droits du seigneur.',2],
 {tf:'Au Moyen Âge, l’Église encadre la vie des fidèles de la naissance à la mort.',v:true,e:'Baptême, messe, mariage, sacrements, fêtes religieuses…'}]);
E('hg5p',[
 ['En quelle année Christophe Colomb atteint-il l’Amérique ?','1492',['1453','1515','1789'],'Il pense atteindre les Indes.'],
 ['Quel navigateur ouvre la route des Indes par le sud de l’Afrique en 1498 ?','Vasco de Gama',['Magellan','Colomb','Cartier'],'Il contourne l’Afrique et atteint l’Inde.'],
 ['Quelle expédition réalise le premier tour du monde (1519-1522) ?','celle de Magellan',['celle de Colomb','celle de Marco Polo','celle de Cook'],'Magellan meurt en route ; Elcano termine le voyage.'],
 ['Quel navire, rapide et maniable, permet les grandes découvertes ?','la caravelle',['la galère romaine','le paquebot','le drakkar'],'La caravelle navigue bien en haute mer.'],
 ['Quel empire Hernán Cortés détruit-il au Mexique ?','l’Empire aztèque',['l’Empire inca','l’Empire byzantin','l’Empire mongol'],'Cortés conquiert l’Empire aztèque (1519-1521).'],
 ['Quel empire Pizarro conquiert-il dans les Andes ?','l’Empire inca',['l’Empire aztèque','l’Empire ottoman','l’Empire maya'],'Pizarro s’empare de l’Empire inca (années 1530).'],
 ['Quelle est une cause majeure de l’effondrement de la population amérindienne ?','les maladies apportées par les Européens',['le froid','une guerre entre Incas et Chinois','la famine en Europe'],'Variole et autres épidémies déciment les populations.',2],
 ['Qu’est-ce que la traite atlantique ?','le commerce d’esclaves africains vers l’Amérique',['le commerce du blé en Europe','la vente d’épices en Asie','la pêche à la morue'],'Des millions d’Africains sont déportés vers l’Amérique.',2]]);
E('hg5q',[
 ['Qu’est-ce qu’une ressource renouvelable ?','une ressource qui se reconstitue naturellement',['une ressource qui disparaît après usage','une ressource uniquement minérale','une ressource artificielle'],'Exemples : vent, soleil, eau, forêt bien gérée.'],
 ['Quel est un exemple d’énergie non renouvelable ?','le pétrole',['le vent','le soleil','la marée'],'Les énergies fossiles mettent des millions d’années à se former.'],
 ['Qu’est-ce que la sécurité alimentaire ?','l’accès de tous à une nourriture suffisante et saine',['la protection des cuisines','la vente d’aliments en conserve','l’interdiction des engrais'],'Elle n’est pas assurée partout dans le monde.'],
 ['Quel aménagement permet d’irriguer de grandes surfaces agricoles ?','un barrage avec des canaux',['un aéroport','une autoroute','une centrale à charbon'],'Les barrages stockent l’eau pour l’irrigation.'],
 ['Qu’est-ce que le développement durable ?','un développement qui répond aux besoins d’aujourd’hui sans compromettre ceux des générations futures',['une croissance la plus rapide possible','l’arrêt de toute industrie','la construction de grandes villes'],'Il associe économie, social et environnement.'],
 ['Quelle région du monde souffre particulièrement du manque d’eau ?','le Moyen-Orient et l’Afrique du Nord',['l’Europe du Nord','l’Amazonie','le Canada'],'Faibles pluies et forte demande : stress hydrique.',2],
 {tf:'Le gaz naturel est une énergie renouvelable.',v:false,e:'C’est une énergie fossile, non renouvelable à l’échelle humaine.'},
 ['Comment appelle-t-on la transformation de l’eau de mer en eau douce ?','le dessalement',['l’irrigation','l’évaporation agricole','le recyclage du papier'],'Utilisé par exemple dans les pays du Golfe.',2]]);
E('hg5r',[
 ['Qu’est-ce que la vulnérabilité ?','la fragilité d’une population face à un aléa',['la force d’un séisme','la hauteur d’une vague','la date d’une catastrophe'],'Elle dépend de la richesse, de la préparation, des constructions.'],
 ['Qu’est-ce qu’un risque ?','la rencontre d’un aléa et d’enjeux exposés (populations, biens)',['un séisme dans un désert vide','une simple météo','une loi de protection'],'Risque = aléa × vulnérabilité des enjeux.'],
 ['Quelle est une conséquence du réchauffement climatique ?','la montée du niveau des mers',['la baisse des températures moyennes','la disparition des océans','l’arrêt des saisons'],'Fonte des glaces et dilatation de l’eau font monter la mer.'],
 ['Quel gaz contribue fortement à l’effet de serre ?','le dioxyde de carbone (CO₂)',['l’oxygène','l’azote','l’hélium'],'Il est émis surtout par la combustion des énergies fossiles.'],
 ['Que signifie « prévention » face à un risque ?','prendre des mesures avant la catastrophe',['réparer après la catastrophe seulement','ignorer le danger','déménager tous les habitants de France'],'Exemples : normes parasismiques, plans d’évacuation, alertes.'],
 ['Pourquoi un même séisme fait-il souvent plus de victimes dans un pays pauvre ?','les constructions et les secours y sont moins solides et moins organisés',['les séismes y sont toujours plus forts','il n’y a pas de séisme dans les pays riches','les habitants ne connaissent pas les séismes'],'La vulnérabilité est plus forte.',2],
 {tf:'Un aléa sans aucune population exposée ne crée pas de risque pour les humains.',v:true,e:'Sans enjeux humains, il n’y a pas de risque pour la population.',d:2},
 ['Quel organisme scientifique international évalue le changement climatique ?','le GIEC',['l’ONU-Sport','l’OTAN','la FIFA'],'Le Groupe d’experts intergouvernemental sur l’évolution du climat.',2]]);
E('hg5s',[
 ['Qu’est-ce qu’une étude de cas en géographie ?','l’étude précise d’un exemple réel pour comprendre un thème',['un résumé du manuel','une liste de dates','un dessin libre'],'On part d’un lieu précis puis on généralise.'],
 ['Que doit contenir un croquis ?','un titre, une légende organisée et une orientation',['uniquement des dessins de personnages','un texte rédigé de 2 pages','une photographie'],'Le croquis se lit grâce à sa légende.'],
 ['Après une étude de cas, il faut…','la mettre en perspective à l’échelle mondiale',['l’oublier','la recopier mot pour mot','changer de sujet'],'On compare avec d’autres exemples dans le monde.'],
 ['Dans une légende, on regroupe les figurés…','par grandes idées (parties)',['par ordre alphabétique','par couleur préférée','au hasard'],'La légende organisée montre un raisonnement.'],
 ['Quel figuré représente le mieux une ville ?','un point ou un cercle',['une flèche','une grande surface hachurée','une ligne pointillée'],'Figuré ponctuel pour les villes.'],
 ['Quel figuré représente un flux (déplacement) ?','une flèche',['un carré','un point','une couleur de fond'],'Les flèches montrent mouvements et échanges.'],
 ['Quel figuré représente une zone (région agricole, désert…) ?','un figuré de surface (aplat de couleur ou hachures)',['une flèche','un point','un trait fin'],'Figuré zonal.',2],
 {tf:'Un croquis doit être simplifié et ne garder que l’essentiel.',v:true,e:'Il ne faut pas surcharger : on sélectionne les informations utiles.'}]);
/* ---------- 4e ---------- */
E('hg4n',[
 ['En quelle année les colonies anglaises d’Amérique déclarent-elles leur indépendance ?','1776',['1789','1492','1815'],'Déclaration d’indépendance du 4 juillet 1776.'],
 ['Qui rédige principalement la Déclaration d’indépendance américaine ?','Thomas Jefferson',['George Washington','Louis XVI','Napoléon'],'Jefferson en est le principal rédacteur.'],
 ['Qui commande l’armée américaine et devient le premier président des États-Unis ?','George Washington',['Benjamin Franklin','La Fayette','Abraham Lincoln'],'Washington est président de 1789 à 1797.'],
 ['Quel Français combat aux côtés des insurgés américains ?','La Fayette',['Robespierre','Colbert','Voltaire'],'Le marquis de La Fayette aide les Américains.'],
 ['Quel philosophe des Lumières défend la séparation des pouvoirs ?','Montesquieu',['Rousseau','Louis XIV','Napoléon'],'Dans « De l’esprit des lois » (1748).'],
 ['Quel ouvrage des Lumières, dirigé par Diderot et d’Alembert, rassemble les connaissances ?','l’Encyclopédie',['la Bible','le Code civil','Le Prince'],'Publiée de 1751 à 1772.'],
 ['En quelle année la Constitution des États-Unis est-elle rédigée ?','1787',['1776','1789','1804'],'Elle est encore en vigueur aujourd’hui (avec des amendements).',2],
 ['Quel traité reconnaît l’indépendance des États-Unis en 1783 ?','le traité de Paris',['le traité de Versailles de 1919','le traité de Vienne','l’édit de Nantes'],'Signé en 1783 avec la Grande-Bretagne.',2]]);
E('hg4o',[
 ['Quelle source d’énergie est au cœur de la première industrialisation ?','le charbon',['le pétrole','l’électricité nucléaire','le solaire'],'Le charbon alimente les machines à vapeur.'],
 ['Qui améliore la machine à vapeur à la fin du XVIIIe siècle ?','James Watt',['Thomas Edison','Louis Pasteur','Gutenberg'],'Sa machine est plus efficace.'],
 ['Dans quel pays la révolution industrielle commence-t-elle ?','au Royaume-Uni',['en France','en Russie','au Japon'],'Dès la fin du XVIIIe siècle.'],
 ['Comment appelle-t-on le départ des habitants des campagnes vers les villes ?','l’exode rural',['l’émigration','le tourisme','la colonisation'],'Les usines attirent les paysans vers les villes.'],
 ['Quel nouveau moyen de transport se développe au XIXe siècle ?','le chemin de fer',['l’avion','l’automobile électrique','le TGV'],'Les lignes de chemin de fer se multiplient.'],
 ['Qui possède les usines et les capitaux ?','la bourgeoisie industrielle',['les ouvriers','les paysans','le clergé'],'Les patrons investissent leurs capitaux.'],
 ['Quel moyen les ouvriers utilisent-ils pour défendre leurs droits ?','la grève et les syndicats',['le tirage au sort','le service militaire','les croisades'],'Les syndicats sont autorisés en France en 1884.',2],
 ['Quel écrivain décrit la vie des mineurs dans « Germinal » (1885) ?','Émile Zola',['Victor Hugo','Molière','Voltaire'],'Zola montre la dureté du travail à la mine.',2]]);
E('hg4p',[
 ['Quel moyen de transport assure l’essentiel du commerce mondial de marchandises ?','le transport maritime',['l’avion','le train','le camion'],'Environ 80 à 90 % des marchandises voyagent par mer.'],
 ['Qu’est-ce qu’un conteneur ?','une grande boîte métallique standard pour transporter des marchandises',['un bateau de pêche','une plateforme pétrolière','un port de plaisance'],'La conteneurisation a facilité les échanges.'],
 ['Quel canal relie la mer Méditerranée à la mer Rouge ?','le canal de Suez',['le canal de Panama','le canal du Midi','la Manche'],'Ouvert en 1869.'],
 ['Quel canal relie l’océan Atlantique à l’océan Pacifique ?','le canal de Panama',['le canal de Suez','le détroit de Gibraltar','le Bosphore'],'Ouvert en 1914.'],
 ['Qu’est-ce qu’un détroit ?','un passage maritime étroit entre deux terres',['une île','un grand port','une plaine côtière'],'Exemples : Gibraltar, Ormuz, Malacca.'],
 ['Quel grand port européen est l’un des premiers d’Europe ?','Rotterdam',['Lyon','Madrid','Prague'],'Rotterdam (Pays-Bas) est un port majeur de la Northern Range.'],
 ['Qu’est-ce qu’une ZEE ?','une zone économique exclusive où un État exploite les ressources',['une zone d’échange européenne','une zone sans aucune loi','une zone de pêche interdite à tous'],'Elle s’étend jusqu’à 200 milles marins des côtes.',2],
 ['Quelle région concentre aujourd’hui les plus grands ports à conteneurs du monde ?','l’Asie de l’Est',['l’Afrique centrale','l’Amérique du Sud','l’Europe du Nord seulement'],'Shanghai, Singapour, Ningbo… en tête.',2]]);
E('hg4q',[
 ['Qu’est-ce qu’un migrant international ?','une personne qui vit dans un autre pays que celui de sa naissance',['un touriste en week-end','une personne qui déménage dans sa ville','un pays qui accueille'],'Il change de pays pour une longue durée.'],
 ['Quelle est une raison fréquente de migrer ?','trouver du travail',['visiter un musée','voir un match','faire une sieste'],'Raisons économiques, politiques, familiales, climatiques…'],
 ['Comment appelle-t-on une personne qui fuit la guerre ou les persécutions et obtient une protection ?','un réfugié',['un touriste','un expatrié volontaire','un travailleur saisonnier'],'Le statut est défini par la convention de Genève (1951).'],
 ['Quel pays est le plus visité par les touristes internationaux ?','la France',['le Canada','le Brésil','l’Australie'],'La France est en tête du nombre d’arrivées de touristes internationaux.'],
 ['Que sont les remises (ou « transferts de fonds ») des migrants ?','l’argent envoyé à leur famille restée au pays',['les impôts payés au pays d’accueil','les billets d’avion','les salaires des touristes'],'Elles comptent beaucoup pour certains pays.',2],
 ['Quel est un effet du tourisme sur un territoire ?','des emplois, mais aussi des pressions sur l’environnement',['aucun effet','la disparition des villes','la fin des transports'],'Le tourisme a des effets positifs et négatifs.'],
 {tf:'La plupart des migrations internationales se font entre pays voisins ou d’une même région du monde.',v:true,e:'Beaucoup de migrations sont régionales (Sud-Sud par exemple).',d:2},
 ['Comment appelle-t-on l’envoi de travailleurs qualifiés vers les pays riches, au détriment de leur pays d’origine ?','la fuite des cerveaux',['l’exode rural','le tourisme d’affaires','la délocalisation'],'Des médecins, ingénieurs… partent travailler à l’étranger.',3]]);
E('hg4r',[
 ['Qu’est-ce qu’une métropole ?','une grande ville qui concentre des pouvoirs et des fonctions de commandement',['un petit village','une ville sans habitants','une région agricole'],'Exemples : New York, Londres, Tokyo, Paris.'],
 ['Qu’est-ce que l’étalement urbain ?','l’extension de la ville sur les espaces ruraux voisins',['la destruction des villes','la réduction du nombre d’habitants','la construction de gratte-ciel uniquement'],'Lotissements et zones commerciales gagnent sur la campagne.'],
 ['Comment s’appelle un quartier très pauvre aux habitations précaires, dans les villes du Sud ?','un bidonville',['un quartier d’affaires','une banlieue résidentielle aisée','un centre historique'],'Exemples : favelas au Brésil.'],
 ['Qu’est-ce qu’un CBD ?','un quartier central des affaires',['un quartier pavillonnaire','une zone agricole','un port de pêche'],'Central Business District : bureaux, sièges sociaux, gratte-ciel.'],
 ['Qu’est-ce qu’une « gated community » ?','un quartier résidentiel fermé et surveillé',['un parc public','un bidonville','une gare'],'Elle illustre la fragmentation urbaine.'],
 ['Qu’est-ce que la gentrification ?','l’installation de populations aisées dans un quartier populaire',['la construction d’usines','la fuite des habitants vers la campagne','la destruction d’un quartier'],'Les prix augmentent et les habitants modestes partent.',2],
 ['Qu’est-ce qu’une mégapole ?','une ville de plus de 10 millions d’habitants',['une ville de 10 000 habitants','une ville sans transports','une capitale obligatoirement'],'Exemples : Tokyo, Delhi, Shanghai, São Paulo.',2],
 {tf:'Les métropoles sont reliées entre elles par des réseaux (transports, Internet, finance).',v:true,e:'Elles forment un archipel mondial connecté.'}]);
E('hg4s',[
 ['Que faut-il faire d’abord face à un document ?','le présenter : nature, auteur, date, source',['donner son opinion','le recopier','répondre sans le lire'],'La présentation permet de comprendre le contexte.'],
 ['Pourquoi faut-il critiquer un document ?','pour évaluer son point de vue et ses limites',['pour le jeter','pour en compter les mots','pour le colorier'],'Un document peut être partial ou incomplet.'],
 ['Qu’est-ce qu’une source primaire ?','un document produit à l’époque étudiée',['un manuel scolaire récent','un résumé de cours','un film de fiction moderne'],'Exemples : une lettre de 1916, une affiche de l’époque.',2],
 ['À quoi sert la légende organisée d’un croquis ?','à montrer le raisonnement en parties',['à décorer la feuille','à donner la date du jour','à indiquer le nom de l’élève'],'Chaque partie répond à une idée.'],
 ['Pour citer un document dans une réponse, on…','met le passage entre guillemets',['le recopie en entier','le résume en un mot','n’utilise jamais le texte'],'Les guillemets montrent qu’on cite.'],
 ['Que signifie « contextualiser » un document ?','le replacer dans son époque et sa situation',['le traduire','le colorier','l’apprendre par cœur'],'On explique les circonstances de sa production.'],
 {tf:'Une caricature exprime toujours un point de vue.',v:true,e:'Elle exagère pour critiquer ou défendre une idée.'},
 ['Quel est le rôle de l’orientation (rose des vents) sur un croquis ?','indiquer le nord',['indiquer l’échelle','indiquer le titre','indiquer la date'],'Elle permet de se repérer.',2]]);
/* ---------- 3e ---------- */
E('hg3r',[
 ['Où la Charte des Nations unies est-elle signée en 1945 ?','à San Francisco',['à Paris','à Genève','à Moscou'],'Signée le 26 juin 1945 à San Francisco.'],
 ['Quel est le but principal de l’ONU ?','maintenir la paix et la sécurité internationales',['organiser les Jeux olympiques','diriger l’économie européenne','remplacer les gouvernements'],'Elle cherche à éviter une nouvelle guerre mondiale.'],
 ['Combien de membres permanents compte le Conseil de sécurité de l’ONU ?','5',['3','10','15'],'États-Unis, Royaume-Uni, France, URSS (Russie), Chine.'],
 ['Quel droit possèdent les membres permanents du Conseil de sécurité ?','le droit de veto',['le droit de vote unique','le droit de guerre','le droit de nommer les présidents'],'Ils peuvent bloquer une décision.'],
 ['Quel procès juge les grands criminels nazis en 1945-1946 ?','le procès de Nuremberg',['le procès de Riom','le procès de Versailles','le procès Dreyfus'],'Il introduit la notion de crime contre l’humanité.'],
 ['Quel texte est adopté par l’ONU en 1948 ?','la Déclaration universelle des droits de l’homme',['la Déclaration des droits de l’homme et du citoyen','le traité de Rome','le Code civil'],'Adoptée à Paris le 10 décembre 1948.'],
 ['Quel plan américain aide l’Europe à se reconstruire à partir de 1947 ?','le plan Marshall',['le plan Schuman','le plan Monnet seulement','le New Deal'],'Aide financière massive des États-Unis.',2],
 ['Où se trouve le siège de l’ONU ?','à New York',['à Bruxelles','à Londres','à Strasbourg'],'Le siège est à New York.',2]]);
E('hg3s',[
 ['Qu’est-ce que la décolonisation ?','l’accès à l’indépendance des colonies',['la conquête de nouvelles colonies','la reconstruction de l’Europe','la guerre froide'],'Elle se produit surtout entre 1945 et les années 1970.'],
 ['Quel dirigeant mène l’Inde vers l’indépendance par la non-violence ?','Gandhi',['Hô Chi Minh','Nehru seul','Mandela'],'Gandhi prône la désobéissance civile non violente.'],
 ['En quelle année l’Algérie devient-elle indépendante ?','1962',['1947','1954','1945'],'Après la guerre d’Algérie (1954-1962) et les accords d’Évian.'],
 ['Quelle guerre oppose la France au Viêt-minh de 1946 à 1954 ?','la guerre d’Indochine',['la guerre d’Algérie','la guerre de Corée','la guerre du Golfe'],'Elle s’achève après la défaite de Diên Biên Phu (1954).'],
 ['Quelle conférence de 1955 réunit des pays d’Asie et d’Afrique nouvellement indépendants ?','la conférence de Bandung',['la conférence de Yalta','la conférence de Potsdam','le traité de Rome'],'Naissance du « tiers-monde » sur la scène internationale.'],
 ['Comment appelle-t-on les pays qui refusent de s’aligner sur les États-Unis ou l’URSS ?','les non-alignés',['les alliés','les satellites','les membres de l’OTAN'],'Mouvement des non-alignés (1961).',2],
 ['En quelle année le Ghana devient-il indépendant, premier pays d’Afrique subsaharienne ?','1957',['1962','1947','1990'],'Le Ghana, ancienne Gold Coast britannique, en 1957.',2],
 {tf:'La décolonisation s’est toujours faite pacifiquement.',v:false,e:'Certaines indépendances sont obtenues après des guerres (Indochine, Algérie…).'}]);
E('hg3u',[
 ['En quelle année le mur de Berlin tombe-t-il ?','1989',['1991','1961','1945'],'Le 9 novembre 1989.'],
 ['Que se passe-t-il le 11 septembre 2001 ?','des attentats terroristes frappent les États-Unis',['la chute du mur de Berlin','la fin de l’URSS','la création de l’euro'],'Attentats d’al-Qaïda à New York et Washington.'],
 ['En quelle année l’Allemagne est-elle réunifiée ?','1990',['1989','1945','2001'],'La réunification a lieu le 3 octobre 1990.'],
 ['Quel type de conflit se multiplie après 1991 ?','des guerres civiles et des conflits régionaux',['uniquement des guerres mondiales','aucun conflit','des guerres entre l’URSS et les États-Unis'],'Ex-Yougoslavie, Rwanda, Syrie…'],
 ['Quel génocide frappe les Tutsi en 1994 ?','le génocide au Rwanda',['le génocide des Arméniens','la Shoah','le massacre de Srebrenica'],'Environ 800 000 victimes en quelques mois.'],
 ['Quel pays devient la seule superpuissance après la disparition de l’URSS ?','les États-Unis',['la Chine','le Royaume-Uni','la France'],'Les années 1990 voient l’hyperpuissance américaine.',2],
 ['Quel pays envahit l’Ukraine en février 2022 ?','la Russie',['la Pologne','la Turquie','la Chine'],'Invasion à grande échelle le 24 février 2022.',2],
 {tf:'Le terrorisme est une forme de violence qui vise à frapper les esprits en touchant des civils.',v:true,e:'Il cherche à terroriser les populations.'}]);
E('hg3v',[
 ['Combien d’États membres compte l’Union européenne depuis le départ du Royaume-Uni (2020) ?','27',['28','25','15'],'L’UE compte 27 États membres.'],
 ['Quelle est la monnaie commune de nombreux pays de l’UE ?','l’euro',['le franc','la livre','le dollar'],'Mise en circulation en pièces et billets en 2002.'],
 ['Dans quelle ville siège le Parlement européen (sessions plénières) ?','Strasbourg',['Paris','Rome','Londres'],'Il siège aussi à Bruxelles.'],
 ['Combien de régions ultrapériphériques de l’Union européenne sont françaises ?','6 (Guadeloupe, Guyane, Martinique, Mayotte, La Réunion, Saint-Martin)',['2','10','aucune'],'Ces territoires font pleinement partie de l’Union européenne.',2],
 ['Grâce à ses territoires d’outre-mer, la France possède…','la deuxième zone économique exclusive du monde',['le plus grand désert du monde','la plus grande forêt d’Europe seulement','aucun espace maritime'],'Sa ZEE couvre environ 10 millions de km².',2],
 ['La France est membre permanent du…','Conseil de sécurité de l’ONU',['G2','Mercosur','Commonwealth'],'Elle dispose d’un droit de veto.'],
 ['Qu’est-ce que l’espace Schengen ?','un espace de libre circulation des personnes',['une zone militaire','une monnaie','une région française'],'Les contrôles aux frontières intérieures sont supprimés.'],
 ['Quel traité fonde la Communauté économique européenne en 1957 ?','le traité de Rome',['le traité de Maastricht','le traité de Versailles','le traité de Lisbonne'],'Signé par 6 pays fondateurs.',2]]);
E('hg3w',[
 ['Que demande la consigne « décrire » ?','dire ce que l’on voit ou ce que dit le document, avec précision',['donner son avis','inventer une suite','recopier la consigne'],'On reste fidèle au document.'],
 ['Que demande la consigne « expliquer » ?','donner les causes ou le sens d’un fait, en utilisant ses connaissances',['recopier le document','donner une date seulement','dessiner'],'On répond à « pourquoi ? » et « comment ? ».'],
 ['Qu’est-ce qu’un développement construit ?','un texte organisé en paragraphes qui répond à une question',['une liste de mots','un tableau de chiffres','un schéma sans texte'],'Introduction, paragraphes argumentés, conclusion.'],
 ['Que doit contenir chaque paragraphe d’un développement construit ?','une idée, des connaissances précises et un exemple',['uniquement des dates','des opinions personnelles','une citation du sujet'],'Idée + arguments + exemples.'],
 ['Dans l’introduction, on…','présente le sujet et le problème posé',['donne la conclusion','raconte sa journée','recopie tout le cours'],'On situe le sujet dans le temps et l’espace.'],
 ['Que signifie « situer » un événement ?','le placer dans le temps et dans l’espace',['le juger','le dessiner','l’oublier'],'Dates, lieux, contexte.'],
 ['Quel mot de liaison introduit une conséquence ?','donc',['mais','or','car'],'« donc » marque la conséquence ; « car » la cause.',2],
 {tf:'Au brevet, on peut s’appuyer sur ses connaissances pour expliquer un document.',v:true,e:'Il faut croiser document et connaissances.'}]);
})();
