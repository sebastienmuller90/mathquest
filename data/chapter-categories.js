/* Classement des chapitres en catégories et sous-catégories (19/10/2026), pour rendre lisibles les mondes très
   fournis (maths, français, langues, histoire-géographie, sciences). Affichage seulement : aucun chapitre n'est
   ajouté, retiré, renommé ni verrouillé, l'ordre du programme est conservé à l'intérieur de chaque groupe.
   Les catégories reprennent les domaines des programmes officiels (BO cycles 2, 3 et 4) : par exemple
   « Nombres et calculs », « Espace et géométrie », « Grandeurs et mesures », « Étude de la langue »…
   cats : [clé, pictogramme, nom, {sous-clé: nom de sous-catégorie}] dans l'ordre d'affichage.
   map : identifiant de chapitre (ou, au primaire, suffixe après « cp-ma- », « ce1-fr- »…) → 'Clé' ou 'Clé.sous-clé'.
   Les mondes de moins de 9 chapitres restent en liste simple (voir MIN). */
window.MQ_CHCATS=(function(){
const MATHS={cats:[
 ['N','🔢','Nombres et calculs',{ent:'Entiers et décimaux',op:'Opérations et calcul',ari:'Multiples et diviseurs',fr:'Fractions',rel:'Nombres relatifs',pui:'Puissances et racines'}],
 ['A','🔤','Algèbre',{lit:'Calcul littéral',eq:'Équations'}],
 ['G','📐','Espace et géométrie',{fig:'Figures planes',tr:'Transformations',th:'Théorèmes et démonstration',sol:'Solides et espace',rep:'Repérage'}],
 ['M','📏','Grandeurs et mesures',{la:'Longueurs, périmètres et aires',vol:'Volumes',dur:'Durées',comp:'Vitesses, échelles et grandeurs composées'}],
 ['D','📊','Données, proportionnalité et fonctions',{pro:'Proportionnalité et pourcentages',st:'Statistiques',pb:'Probabilités',fo:'Fonctions'}],
 ['P','🧩','Résoudre des problèmes',{}],
 ['X','💻','Algorithmique et programmation',{}]],
 map:{'6a':'N.ent','6b':'N.ent','6c':'N.op','6d':'N.op','6e':'N.op','6f':'N.ari','6g':'N.fr','6h':'N.fr','6i':'N.fr','6j':'A.lit','6k':'A.lit','6l':'P','6m':'M.la','6n':'M.la','6o':'M.vol','6p':'M.dur','6q':'G.fig','6r':'G.fig','6s':'G.fig','6t':'G.sol','6u':'D.st','6v':'D.pb','6w':'D.pro','6x':'X',
  '5a':'N.op','5b':'N.rel','5c':'N.rel','5d':'N.fr','5e':'N.pui','5f':'A.lit','5g':'A.lit','5h':'A.eq','5i':'G.rep','5j':'G.sol','5k':'G.tr','5l':'G.fig','5m':'G.fig','5n':'G.fig','5o':'G.fig','5p':'M.la','5q':'D.st','5r':'D.st','5s':'D.pb','5t':'D.pro','5u':'D.fo','5v':'X',
  '4a':'N.rel','4b':'N.fr','4c':'N.pui','4d':'N.pui','4e':'A.lit','4f':'A.eq','4g':'D.pro','4h':'M.comp','4i':'D.fo','4j':'D.st','4k':'D.st','4l':'D.pb','4m':'G.rep','4n':'G.tr','4o':'G.sol','4p':'G.th','4q':'G.th','4r':'G.th','4s':'G.th','4t':'X',
  '3a':'N.ari','3b':'N.pui','3c':'N.pui','3d':'A.lit','3e':'A.eq','3f':'A.eq','3g':'D.fo','3h':'D.fo','3i':'D.fo','3j':'D.pro','3k':'D.st','3l':'D.pb','3m':'G.tr','3n':'G.sol','3o':'G.th','3p':'G.th','3q':'G.th','3r':'M.comp','3s':'X','3t':'P','3u':'D.st'}};
const FRANCAIS={cats:[
 ['L','📚','Lire et comprendre',{lec:'Lecture et compréhension',lit:'Littérature et œuvres'}],
 ['G','🧱','Grammaire',{ph:'La phrase',mo:'Classes et fonctions des mots',di:'Discours rapporté et voix'}],
 ['C','⏳','Conjugaison',{}],
 ['O','✏️','Orthographe',{acc:'Accords',lex:'Orthographe lexicale et dictée'}],
 ['V','💬','Vocabulaire',{}],
 ['E','✍️','Écrire et s’exprimer',{ec:'Écrire',arg:'Argumenter',or:'S’exprimer à l’oral'}],
 ['B','🎯','Préparer le brevet',{}]],
 map:{fr6a:'L.lec',fr6b:'L.lec',fr6c:'L.lec',fr6d:'L.lit',fr6e:'L.lit',fr6f:'L.lit',fr6g:'L.lit',fr6h:'L.lit',fr6i:'G.ph',fr6j:'G.mo',fr6k:'G.mo',fr6l:'G.mo',fr6m:'G.mo',fr6n:'G.ph',fr6o:'G.ph',fr6p:'O.acc',fr6q:'O.acc',fr6r:'C',fr6s:'C',fr6t:'C',fr6u:'C',fr6v:'V',fr6w:'O.lex',fr6x:'E.ec',fr6y:'E.ec',fr6z:'E.or',
  fr5a:'L.lec',fr5b:'E.ec',fr5c:'E.or',fr5d:'L.lit',fr5e:'L.lit',fr5f:'L.lit',fr5g:'L.lit',fr5h:'V',fr5i:'V',fr5j:'G.ph',fr5k:'G.mo',fr5l:'G.mo',fr5m:'G.mo',fr5n:'G.ph',fr5o:'G.di',fr5p:'C',fr5q:'C',fr5r:'C',fr5s:'O.acc',fr5t:'O.acc',fr5u:'O.acc',fr5v:'O.lex',fr5w:'E.ec',fr5x:'E.ec',fr5y:'E.ec',fr5z:'L.lit',
  fr4a:'L.lit',fr4b:'L.lit',fr4c:'L.lit',fr4d:'L.lit',fr4e:'L.lit',fr4f:'L.lec',fr4g:'L.lec',fr4h:'E.ec',fr4i:'E.arg',fr4j:'E.arg',fr4k:'G.ph',fr4l:'G.ph',fr4m:'G.ph',fr4n:'G.mo',fr4o:'G.di',fr4p:'V',fr4q:'C',fr4r:'C',fr4s:'C',fr4t:'G.di',fr4u:'O.acc',fr4v:'V',fr4w:'L.lit',fr4x:'O.lex',fr4y:'E.arg',fr4z:'E.ec',
  fr3a:'L.lit',fr3b:'L.lit',fr3c:'L.lit',fr3d:'L.lit',fr3e:'L.lit',fr3f:'L.lec',fr3g:'E.arg',fr3h:'L.lec',fr3i:'E.ec',fr3j:'E.arg',fr3k:'B',fr3l:'B',fr3m:'G.ph',fr3n:'G.ph',fr3o:'G.di',fr3p:'G.di',fr3q:'C',fr3r:'C',fr3s:'C',fr3t:'O.acc',fr3u:'O.acc',fr3v:'V',fr3w:'V',fr3x:'V',fr3y:'E.or',fr3z:'O.lex'}};
const LANG_CATS=[
 ['C','👋','Communiquer',{pr:'Se présenter',tps:'L’heure, les dates et la météo',quo:'La vie quotidienne',q:'Poser des questions'}],
 ['V','📚','Vocabulaire',{}],
 ['G','🧱','Grammaire',{vb:'Verbes et temps',mo:'Mots et structures',qn:'Questions et négation'}],
 ['K','🌍','Cultures et monde',{}]];
const ANGLAIS={cats:LANG_CATS,map:{en6a:'C.pr',en6b:'C.pr',en6c:'V',en6d:'V',en6e:'G.vb',en6f:'G.vb',en6g:'C.tps',en6h:'G.mo',en6i:'G.mo',en6j:'G.vb',en6k:'G.mo',en6l:'G.mo',en6m:'G.mo',en6n:'G.mo',en6o:'G.mo',en6p:'G.mo',en6q:'G.vb',en6r:'G.vb',en6s:'C.quo',en6t:'C.tps',en6u:'C.tps',en6v:'V',en6w:'V',en6x:'V',en6y:'V',en6z:'V',en6aa:'V',en6ab:'V',en6ac:'C.quo',en6ad:'C.q',en6ae:'K',en6af:'K',en6ag:'K',en6ah:'K',en6ai:'K',
  en5a:'G.vb',en5b:'G.qn',en5c:'G.vb',en5d:'G.vb',en5e:'G.mo',en5f:'G.mo',en5g:'V',en5h:'G.qn',en5i:'G.mo',en5j:'C.tps',en5k:'K',en5l:'K',en5m:'K',en5n:'K',en5o:'K',en5p:'K',
  en4a:'G.vb',en4b:'G.vb',en4c:'G.vb',en4d:'G.qn',en4e:'G.mo',en4f:'G.vb',en4g:'G.vb',en4h:'G.vb',en4i:'G.mo',en4j:'V',en4k:'K',en4l:'K',en4m:'K',en4n:'K',
  en3a:'G.vb',en3b:'G.vb',en3c:'G.vb',en3d:'G.vb',en3e:'G.vb',en3f:'G.vb',en3g:'G.mo',en3h:'G.vb',en3i:'G.vb',en3j:'G.mo',en3k:'K',en3l:'K',en3m:'K',en3n:'K'}};
const ITALIEN={cats:LANG_CATS,map:{it5a:'C.pr',it5b:'C.pr',it5c:'G.mo',it5d:'G.vb',it5e:'G.vb',it5f:'V',it5g:'V',it5h:'C.tps',it5i:'K',it5j:'K',it5k:'K',it5l:'K',it5m:'K',it5n:'K',
  it4a:'G.vb',it4b:'G.vb',it4c:'G.mo',it4d:'G.mo',it4e:'G.mo',it4f:'G.vb',it4g:'C.tps',it4h:'V',it4i:'K',it4j:'K',it4k:'K',it4l:'K',
  it3a:'G.vb',it3b:'G.vb',it3c:'G.vb',it3d:'G.vb',it3e:'G.mo',it3f:'G.vb',it3g:'G.vb',it3h:'G.mo',it3i:'K',it3j:'K',it3k:'K',it3l:'K'}};
// Histoire-géographie : sous-catégories = thèmes du programme officiel de chaque niveau (BO n°31 du 30 juillet 2020)
const HG={cats:[
 ['H','🏛️','Histoire',{h61:'La longue histoire de l’humanité et des migrations',h62:'Récits fondateurs, croyances et citoyenneté en Méditerranée antique',h63:'L’Empire romain dans le monde antique',
   h51:'Chrétientés et islam (VIe-XIIIe siècles)',h52:'Société, Église et pouvoir dans l’Occident féodal',h53:'Transformations de l’Europe et ouverture sur le monde (XVIe-XVIIe siècles)',
   h41:'Le XVIIIe siècle : expansions, Lumières et révolutions',h42:'L’Europe et le monde au XIXe siècle',h43:'Société, culture et politique dans la France du XIXe siècle',
   h31:'L’Europe, théâtre majeur des guerres totales (1914-1945)',h32:'Le monde depuis 1945',h33:'Françaises et Français dans une République repensée'}],
 ['G','🌍','Géographie',{g6:'Habiter le monde',g51:'La question démographique et l’inégal développement',g52:'Des ressources limitées, à gérer et à renouveler',g53:'Prévenir les risques, s’adapter au changement global',
   g41:'L’urbanisation du monde',g42:'Les mobilités humaines transnationales',g43:'Des espaces transformés par la mondialisation',
   g31:'Dynamiques territoriales de la France contemporaine',g32:'Pourquoi et comment aménager le territoire ?',g33:'La France et l’Union européenne'}],
 ['M','🧭','Méthode',{}]],
 map:{hg6a:'H.h61',hg6o:'H.h61',hg6b:'H.h61',hg6c:'H.h62',hg6d:'H.h62',hg6e:'H.h62',hg6p:'H.h62',hg6f:'H.h63',hg6n:'H.h63',hg6q:'H.h63',hg6r:'H.h63',hg6g:'G.g6',hg6h:'G.g6',hg6i:'G.g6',hg6j:'G.g6',hg6s:'G.g6',hg6t:'M',
  hg5a:'H.h51',hg5b:'H.h51',hg5n:'H.h51',hg5c:'H.h52',hg5d:'H.h52',hg5o:'H.h52',hg5e:'H.h53',hg5f:'H.h53',hg5g:'H.h53',hg5m:'H.h53',hg5p:'H.h53',hg5h:'G.g51',hg5i:'G.g52',hg5q:'G.g52',hg5j:'G.g53',hg5r:'G.g53',hg5s:'M',
  hg4a:'H.h41',hg4b:'H.h41',hg4c:'H.h41',hg4n:'H.h41',hg4d:'H.h42',hg4e:'H.h42',hg4m:'H.h42',hg4o:'H.h42',hg4f:'H.h43',hg4g:'H.h43',hg4h:'G.g41',hg4r:'G.g41',hg4i:'G.g42',hg4q:'G.g42',hg4j:'G.g43',hg4p:'G.g43',hg4s:'M',
  hg3a:'H.h31',hg3b:'H.h31',hg3c:'H.h31',hg3d:'H.h31',hg3e:'H.h32',hg3f:'H.h32',hg3g:'H.h32',hg3r:'H.h32',hg3s:'H.h32',hg3t:'H.h32',hg3u:'H.h32',hg3h:'H.h33',hg3i:'H.h33',hg3j:'G.g31',hg3k:'G.g31',hg3l:'G.g32',hg3m:'G.g33',hg3v:'G.g33',hg3w:'M'}};
// Physique-chimie : les quatre thèmes du cycle 4
const PC={cats:[['M','⚗️','Matière et transformations',{}],['F','🚀','Mouvements, forces et Univers',{}],['E','⚡','Énergie et électricité',{}],['S','💡','Signaux : lumière et son',{}],['D','🔬','Démarche scientifique',{}]],
 map:{pc6a:'M',pc6b:'M',pc6c:'M',pc6d:'E',pc6e:'F',pc6f:'F',pc6g:'F',pc6h:'E',pc6i:'E',pc6j:'S',pc6k:'S',pc6l:'D',
  pc5a:'M',pc5b:'M',pc5c:'M',pc5d:'M',pc5e:'F',pc5f:'F',pc5g:'E',pc5h:'E',pc5i:'S',pc5j:'S',
  pc4a:'M',pc4b:'M',pc4c:'M',pc4d:'M',pc4e:'M',pc4f:'F',pc4g:'F',pc4h:'E',pc4i:'E',pc4j:'E',pc4k:'S',
  pc3a:'M',pc3b:'M',pc3c:'M',pc3d:'E',pc3e:'E',pc3f:'F',pc3g:'F',pc3h:'E',pc3i:'S',pc3j:'S',pc3k:'S',pc3l:'F'}};
// Primaire : clés = suffixe du chapitre, communes à toutes les classes
const PMATHS={cats:[
 ['N','🔢','Nombres',{ent:'Nombres entiers',fr:'Fractions et décimaux',ari:'Multiples et diviseurs'}],
 ['C','➕','Calculer',{men:'Calcul mental et tables',op:'Opérations'}],
 ['P','🧩','Résoudre des problèmes',{}],
 ['A','🔤','Suites et algèbre',{}],
 ['M','📏','Grandeurs et mesures',{la:'Longueurs, périmètres et aires',mc:'Masses, contenances et volumes',mon:'La monnaie',dur:'L’heure et les durées'}],
 ['G','📐','Espace et géométrie',{rep:'Se repérer',fig:'Figures, angles et symétrie',sol:'Solides'}],
 ['D','📊','Proportionnalité, données et hasard',{pro:'Proportionnalité',don:'Données',pb:'Probabilités'}],
 ['X','💻','Programmation',{}]],
 map:{nombres10:'N.ent',nombres20:'N.ent',dizaines:'N.ent',nombres100:'N.ent',nombres1000:'N.ent','lire-ecrire':'N.ent',nombres10000:'N.ent','grands-nombres':'N.ent',comparer:'N.ent',droite:'N.ent',ordinaux:'N.ent',arrondir:'N.ent',
  fractions:'N.fr','fractions-calcul':'N.fr','fractions-egales':'N.fr','fractions-longueur':'N.fr','fractions-decimales':'N.fr',decimaux:'N.fr',pourcentages:'N.fr',multiples:'N.ari',diviseurs:'N.ari',
  'tables-add':'C.men',doubles:'C.men','calcul-mental':'C.men','tables-mult':'C.men',tables:'C.men',
  soustraction:'C.op','addition-posee':'C.op','soustraction-posee':'C.op','add-sous':'C.op','multiplication-posee':'C.op','add-sous-dec':'C.op',multiplication:'C.op',division:'C.op',partage:'C.op',operations:'C.op',parentheses:'C.op',priorites:'C.op',
  problemes:'P',suites:'A',algebre:'A',
  longueurs:'M.la',perimetre:'M.la',aires:'M.la',masses:'M.mc','masses-contenances':'M.mc',volumes:'M.mc',monnaie:'M.mon',heure:'M.dur',durees:'M.dur',
  espace:'G.rep',quadrillage:'G.rep',reperage:'G.rep',figures:'G.fig',geometrie:'G.fig',angles:'G.fig',symetrie:'G.fig',solides:'G.sol',
  proportionnalite:'D.pro',donnees:'D.don',probabilites:'D.pb',programmation:'X'}};
const PFRANCAIS={cats:[
 ['S','🔤','Les sons et le code',{}],
 ['L','📚','Lire et comprendre',{}],
 ['V','💬','Vocabulaire',{}],
 ['G','🧱','Grammaire',{ph:'La phrase',mo:'Les mots et leurs fonctions'}],
 ['C','⏳','Conjugaison',{}],
 ['O','✏️','Orthographe',{son:'Écrire les sons',acc:'Accords',hom:'Homophones',dic:'Mots à savoir et dictée'}],
 ['E','✍️','Écrire',{}]],
 map:{voyelles:'S','consonnes-longues':'S','consonnes-courtes':'S',syllabes:'S','ou-on':'S','an-in':'S','oi-eau':'S','e-accents':'S','lire-mots':'S','c-g':'S','s-z':'S',graphemes:'S','lettres-muettes':'S',
  comprendre:'L',documentaire:'L',litterature:'L',
  vocabulaire:'V','synonymes-contraires':'V',familles:'V',alphabet:'V',dictionnaire:'V',polysemie:'V','prefixes-suffixes':'V','lexique-derivation':'V','lexique-sens':'V',registres:'V',sens:'V',
  phrase:'G.ph','types-phrases':'G.ph','types-formes':'G.ph','phrase-complexe':'G.ph',
  genre:'G.mo',nombre:'G.mo','classes-mots':'G.mo',classes:'G.mo','sujet-verbe':'G.mo',constituants:'G.mo','verbe-sujet':'G.mo',complements:'G.mo','nature-fonction':'G.mo',determinants:'G.mo',pronoms:'G.mo',gn:'G.mo',sujet:'G.mo',attribut:'G.mo',cc:'G.mo',expansions:'G.mo','adverbes-ment':'G.mo',
  'etre-avoir':'C',infinitif:'C',present:'C',imparfait:'C',futur:'C','passe-compose':'C','imparfait-futur':'C','radical-variable':'C','passe-simple':'C','plus-que-parfait':'C','temps-recit':'C',imperatif:'C',
  'son-s':'O.son','m-mbp':'O.son',accents:'O.son','accords-gn':'O.acc','accord-sv':'O.acc','pluriels-feminins':'O.acc','pp-etre':'O.acc',accords:'O.acc','participe-passe':'O.acc',
  homophones:'O.hom','homophones-a-et':'O.hom','homophones-son-on':'O.hom',dictee:'O.dic','mots-outils':'O.dic',ecrire:'E'}};
const PSCIENCES={cats:[['V','🌱','Le vivant',{}],['C','🫀','Le corps et la santé',{}],['M','💧','La matière',{}],['E','⚡','Énergie, mouvement et lumière',{}],['T','🌍','La Terre, le ciel et l’environnement',{}],['O','🛠️','Objets techniques et robots',{}]],
 map:{vivant:'V',environnement:'V',classification:'V',developpement:'V',ecosystemes:'V',biodiversite:'V',aliments:'C',corps:'C',hygiene:'C',cerveau:'C',puberte:'C',digestion:'C',respiration:'C',reproduction:'C',
  'eau-etats':'M','masse-temperature':'M',melanges:'M','masse-volume':'M',etats:'M',mouvements:'E',mouvement:'E',energie:'E',electricite:'E','lumiere-ombres':'E',
  lune:'T','meteo-climat':'T','systeme-solaire':'T','terre-active':'T',proteger:'T',objets:'O','objets-techniques':'O','programmer-robot':'O'},
 // « environnement » désigne deux chapitres différents selon la classe
 byId:{'cm2-sc-environnement':'T'}};
const PHG={cats:[['H','🏛️','Histoire',{}],['G','🌍','Géographie',{}],['T','⏰','Se repérer dans le temps',{}],['E','🧭','Se repérer dans l’espace',{}]],
 map:{'moyen-age':'H','eglise-villes':'H',monarchie:'H',explorations:'H','1789':'H',republique:'H',ecole:'H',industrie:'H','guerre-14':'H','guerre-39':'H',europe:'H',frise:'H',
  'se-nourrir':'G',inegalites:'G','se-deplacer':'G',internet:'G',deplacer:'G',habiter:'G',
  'jour-saisons':'T',calendrier:'T','mesurer-temps':'T','avant-apres':'T','se-reperer':'E',quartier:'E',monde:'E'}};
const PQLM={cats:[['V','🌱','Le vivant',{}],['C','🫀','Le corps et la santé',{}],['M','💧','Matière et objets',{}],['T','⏰','Le temps',{}],['E','🗺️','L’espace',{}]],
 map:{'cycle-vie':'V',regimes:'V',plantes:'V','classer-vivant':'V',reproduction:'V',chaines:'V',sante:'C','corps-mouvement':'C',eau:'M',electricite:'M',matiere:'M',objets:'M',temps:'T',periodes:'T','modes-vie':'T',paysages:'E',france:'E','france-europe':'E'}};
return {MIN:9,subjects:{maths:MATHS,francais:FRANCAIS,anglais:ANGLAIS,italien:ITALIEN,hg:HG,pc:PC,'p-maths':PMATHS,'p-francais':PFRANCAIS,'p-sciences':PSCIENCES,'p-hg':PHG,'p-qlm':PQLM}};
})();
