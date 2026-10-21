/* Finot Académie — cours approfondis : mathématiques CE1 (lot 2, 21/10/2026).
   Même format que course-depth-maths-cp.js (deep / try / adult / culture), affiché par js/course-depth.js.
   Rien n'est retiré des cours existants. Programme de référence : mathématiques cycle 2, programmes 2024
   (BO n°41 du 31/10/2024), applicables depuis 2025-2026. Faits culturels vérifiables uniquement. */
(function(root){
'use strict';
const D=root.MQCourseDepth=root.MQCourseDepth||{version:'1',chapters:{},add(map,meta){for(const id of Object.keys(map))this.chapters[id]=Object.assign({},meta,map[id]);}};
D.add({
'ce1-ma-nombres1000':{
 deep:[{t:'Le grand échange : 10 contre 1',h:`<p>Toute notre façon d’écrire les nombres repose sur une seule règle : <b>quand on a 10 objets d’une sorte, on les échange contre 1 objet de la sorte suivante</b>.</p>
<ul><li>10 unités s’échangent contre <b>1 dizaine</b> ;</li><li>10 dizaines s’échangent contre <b>1 centaine</b> ;</li><li>10 centaines s’échangent contre <b>1 millier</b>.</li></ul>
<p>Avec du matériel, une unité est un petit cube, une dizaine est une barre de 10 cubes, une centaine est une plaque de 10 barres (100 cubes). Dans <b>247</b>, il y a 2 plaques, 4 barres et 7 cubes.</p>`},
 {t:'Le rôle de chaque chiffre',h:`<p>Dans un nombre à trois chiffres, on lit les rangs de <b>droite à gauche</b> : les unités, puis les dizaines, puis les centaines. Chaque chiffre vaut <b>dix fois plus</b> que s’il était une place plus à droite.</p>
<p>Dans <b>555</b>, les trois chiffres sont pareils, mais ils ne valent pas la même chose : le premier 5 vaut <b>500</b>, le deuxième vaut <b>50</b> et le dernier vaut <b>5</b>. 555 = 500 + 50 + 5.</p>
<p>Le <b>0</b> garde une place vide : dans <b>308</b>, il dit qu’il n’y a aucune dizaine. Sans lui, on lirait 38, un nombre bien plus petit.</p>`}],
 try:{q:'Combien de dizaines y a-t-il en tout dans 350 ?',a:'350 = 3 centaines et 5 dizaines. Une centaine vaut 10 dizaines, donc 30 + 5 = 35 dizaines.'},
 adult:'Avec des pièces de 1 €, des billets de 10 € et de 100 € (jouets ou dessinés), faites « fabriquer » des nombres comme 245 ou 302. Puis échangez 10 pièces contre un billet de 10 € pour faire vivre la règle de l’échange.',
 culture:{t:'Les nombres des Égyptiens',h:`<p>Les Égyptiens de l’Antiquité avaient un dessin pour chaque rang : un trait pour 1, une sorte d’anse pour 10, une <b>corde enroulée</b> pour 100 et une <b>fleur de lotus</b> pour 1 000. Pour écrire 300, ils dessinaient trois cordes enroulées.</p><p>Notre système est plus pratique : avec seulement dix chiffres, la <b>place</b> du chiffre suffit à dire ce qu’il vaut.</p>`}},
'ce1-ma-lire-ecrire':{
 deep:[{t:'Lire un nombre à trois chiffres',h:`<p>Pour lire <b>347</b>, je le découpe en deux morceaux :</p>
<ol><li>le chiffre des centaines : 3 → « trois-cents » ;</li><li>le reste, lu comme un nombre à deux chiffres : 47 → « quarante-sept ».</li></ol>
<p>J’assemble : <b>trois-cent-quarante-sept</b>. Pour écrire en chiffres, je fais l’inverse : « cinq-cent-six » → 5 centaines, <b>0</b> dizaine, 6 unités → <b>506</b>.</p>
<p>Astuce : je vérifie toujours que mon nombre a bien <b>trois chiffres</b> quand il y a le mot « cent ».</p>`},
 {t:'Les règles d’orthographe des nombres',h:`<ul><li><b>Les traits d’union</b> : on relie tous les mots du nombre (orthographe recommandée depuis 1990) : deux-cent-vingt-et-un.</li><li><b>Cent</b> prend un <b>s</b> quand il est multiplié et que <b>rien ne le suit</b> : deux-cents, cinq-cents. Mais : deux-cent-trois, cinq-cent-dix.</li><li><b>Vingt</b> suit la même règle dans quatre-vingts : quatre-vingts, mais quatre-vingt-un.</li><li><b>Mille</b> ne prend jamais de s : deux-mille.</li></ul>`}],
 try:{q:'Écris en lettres : 280, puis 208.',a:'280 : deux-cent-quatre-vingts. 208 : deux-cent-huit.'},
 adult:'Dictez des nombres à l’enfant en alternant « avec zéro » et « sans zéro » (507 / 570 / 57). Faites-lui ensuite lire à voix haute des nombres trouvés sur des tickets de caisse ou des panneaux.',
 culture:{t:'Le mille-pattes a-t-il mille pattes ?',h:`<p>Non ! La plupart des mille-pattes ont beaucoup moins de mille pattes. Mais en 2021, des scientifiques ont découvert en Australie une espèce qui en possède plus de <b>1 300</b> : c’est le premier mille-pattes connu qui mérite vraiment son nom.</p>`}},
'ce1-ma-comparer':{
 deep:[{t:'Comparer rang par rang',h:`<p>Pour comparer deux nombres, on fait comme pour trouver un mot dans le dictionnaire : on regarde la <b>première</b> différence en partant de la gauche.</p>
<ol><li>Si les deux nombres n’ont pas le même nombre de chiffres, celui qui en a le plus est le plus grand : 102 &gt; 99.</li><li>Sinon, je compare les <b>centaines</b> : 512 &gt; 498, car 5 centaines &gt; 4 centaines.</li><li>Si les centaines sont égales, je compare les <b>dizaines</b>, puis si besoin les <b>unités</b>.</li></ol>
<p>Dès qu’un rang est différent, c’est fini : les chiffres suivants ne comptent plus.</p>`},
 {t:'Encadrer un nombre',h:`<p>Encadrer, c’est dire entre quels nombres « ronds » se trouve un nombre.</p>
<ul><li><b>À la centaine</b> : 347 est entre 300 et 400 → 300 &lt; 347 &lt; 400.</li><li><b>À la dizaine</b> : 347 est entre 340 et 350 → 340 &lt; 347 &lt; 350.</li></ul>
<p>Pour trouver la centaine d’avant, je garde le chiffre des centaines et je mets des zéros. Pour la centaine d’après, j’ajoute 1 au chiffre des centaines.</p>
<p>Encadrer sert à <b>estimer</b> : avant un calcul, savoir que le résultat sera « entre 300 et 400 » aide à repérer une erreur.</p>`}],
 try:{q:'Range dans l’ordre décroissant : 309, 390, 93, 339.',a:'390 > 339 > 309 > 93.'},
 adult:'Comparez des prix dans un catalogue (« Lequel est le plus cher ? De combien ? ») et faites encadrer des nombres lus dans la vie courante (numéros de maisons, pages d’un livre).',
 culture:{t:'La tour Eiffel entre deux centaines',h:`<p>La <b>tour Eiffel</b>, à Paris, mesure environ <b>330 mètres</b> avec ses antennes : elle est donc entre 300 et 400 mètres. Quand elle a été construite, pour l’Exposition universelle de <b>1889</b>, c’était le monument le plus haut du monde.</p>`}},
'ce1-ma-droite':{
 deep:[{t:'Trouver la valeur d’un pas',h:`<p>Sur une droite graduée, tous les petits pas ont la même valeur, mais cette valeur n’est <b>pas toujours 1</b>. Il faut la trouver avant de lire quoi que ce soit.</p>
<ol><li>Je repère <b>deux nombres écrits</b>, par exemple 200 et 300.</li><li>Je calcule leur <b>écart</b> : 300 − 200 = 100.</li><li>Je compte les <b>intervalles</b> (les espaces) entre eux : 10.</li><li>100 partagé en 10 pas égaux : chaque pas vaut <b>10</b>.</li></ol>
<p>Ensuite, je compte de 10 en 10 depuis 200 : 210, 220, 230…</p>`},
 {t:'Placer un nombre',h:`<p>Pour placer 260 sur une droite graduée de 10 en 10 qui commence à 200 :</p>
<ol><li>je pars de 200 ;</li><li>260 − 200 = 60, et 60, c’est 6 pas de 10 ;</li><li>j’avance de 6 intervalles et je place une flèche sur ce trait.</li></ol>
<p>Si le nombre n’est pas sur un trait (par exemple 265 avec des pas de 10), je le place <b>entre deux traits</b>, au milieu entre 260 et 270.</p>`}],
 try:{q:'Sur une droite, 0 et 100 sont écrits, avec 5 intervalles entre eux. Que vaut un pas ?',a:'100 partagé en 5 intervalles : chaque pas vaut 20 (0, 20, 40, 60, 80, 100).'},
 adult:'Tracez une ligne au sol avec du ruban adhésif, écrivez 0 et 100 aux bouts et placez ensemble des objets à 50, 25, 75. Une règle ou un mètre ruban sont aussi de bonnes droites graduées.',
 culture:{t:'La frise chronologique',h:`<p>En histoire, on utilise une <b>frise chronologique</b> : c’est une droite graduée où chaque pas représente un nombre d’années (10 ans, 100 ans…). On y place les grands événements, comme la construction des pyramides ou la naissance de tes grands-parents.</p>`}},
'ce1-ma-fractions':{
 deep:[{t:'Des parts vraiment égales',h:`<p>Une fraction n’existe que si le tout est partagé en <b>parts égales</b>. Couper un gâteau en 4 morceaux de tailles différentes ne donne pas des quarts !</p>
<p>Une fraction s’écrit avec deux nombres séparés par un trait :</p>
<ul><li>en bas, le <b>dénominateur</b> dit en combien de parts égales le tout est partagé (il « dénomme », il donne le nom : des quarts, des cinquièmes…) ;</li><li>en haut, le <b>numérateur</b> dit combien de parts on prend (il « numérote », il compte).</li></ul>
<p>3/4 se lit « trois quarts » : le tout est coupé en 4 parts égales et on en prend 3.</p>`},
 {t:'Bien lire les fractions',h:`<p>Pour lire une fraction, on dit le numérateur, puis le nom des parts :</p>
<table class="ptable"><tr><td>1/2</td><td>un demi</td></tr><tr><td>2/3</td><td>deux tiers</td></tr><tr><td>3/4</td><td>trois quarts</td></tr><tr><td>4/5</td><td>quatre cinquièmes</td></tr><tr><td>7/10</td><td>sept dixièmes</td></tr></table>
<p>Après 4, le nom des parts se fabrique avec <b>-ième</b> : cinquième, sixième, huitième, dixième. Quand on prend <b>toutes</b> les parts (4/4, 10/10), on a le tout entier : cela vaut <b>1</b>.</p>`}],
 try:{q:'Une pizza est coupée en 6 parts égales. Tom en mange 1, Léa en mange 2. Quelle fraction de la pizza ont-ils mangée en tout ?',a:'1 + 2 = 3 parts sur 6 : 3/6 (trois sixièmes), c’est la moitié de la pizza.'},
 adult:'Pliez des feuilles de papier en 2, en 4, en 8 et coloriez des parts. Au moment du goûter, partagez une tablette ou une pomme et demandez « Quelle fraction as-tu ? ».',
 culture:{t:'Des fractions en musique',h:`<p>En musique, les notes ont des durées qui sont des fractions les unes des autres : une <b>blanche</b> dure autant que deux <b>noires</b>, et une <b>ronde</b> autant que quatre noires. Une noire est donc la moitié d’une blanche et le quart d’une ronde.</p>`}},
'ce1-ma-fractions-calcul':{
 deep:[{t:'Comparer des fractions du même tout',h:`<p><b>Même dénominateur</b> : les parts ont la même taille, je compare simplement le nombre de parts. 5/8 &gt; 3/8, car 5 parts, c’est plus que 3 parts de même taille.</p>
<p><b>Même numérateur</b> (par exemple 1/4 et 1/8) : on a le même nombre de parts, mais pas de la même taille. Plus on partage en beaucoup de parts, plus chaque part est <b>petite</b>. Une pizza coupée en 8 donne des parts plus petites qu’une pizza coupée en 4 : 1/8 &lt; 1/4.</p>
<p>C’est un piège fréquent : un dénominateur plus grand ne veut pas dire une fraction plus grande !</p>`},
 {t:'Additionner et compléter',h:`<p>Quand les dénominateurs sont égaux, on additionne des parts de même taille : 2 cinquièmes + 1 cinquième = 3 cinquièmes. On écrit <b>2/5 + 1/5 = 3/5</b>. Le dénominateur ne change pas, car la taille des parts ne change pas.</p>
<p>Pour trouver ce qui manque pour faire le tout, je pars du tout : 1 = 5/5. Si 3/5 sont coloriés, il reste 5/5 − 3/5 = <b>2/5</b>.</p>`}],
 try:{q:'Range du plus petit au plus grand : 1/2, 1/10, 1/4.',a:'1/10 < 1/4 < 1/2 : plus on partage en beaucoup de parts, plus chaque part est petite.'},
 adult:'Avec deux feuilles de même taille, pliez l’une en 4 et l’autre en 8. Découpez une part de chaque et superposez-les : l’enfant voit que 1/8 est plus petit que 1/4.',
 culture:{t:'Les fractions des Égyptiens',h:`<p>Les scribes de l’Égypte ancienne utilisaient surtout des fractions dont le numérateur est <b>1</b> (1/2, 1/3, 1/4…). Pour écrire 3/4, ils écrivaient <b>1/2 + 1/4</b>. On retrouve ces calculs dans le papyrus Rhind, vieux de plus de 3 500 ans.</p>`}},
'ce1-ma-calcul-mental':{
 deep:[{t:'Ajouter des dizaines ou des centaines',h:`<p>Quand j’ajoute un nombre « rond », un seul chiffre change :</p>
<ul><li>+ 30, c’est + 3 dizaines : 356 + 30 = 3<b>8</b>6 (le chiffre des dizaines passe de 5 à 8) ;</li><li>+ 200, c’est + 2 centaines : 356 + 200 = <b>5</b>56.</li></ul>
<p>Attention quand on dépasse 9 dizaines : 380 + 40 = 420, car 8 dizaines + 4 dizaines = 12 dizaines, c’est-à-dire 1 centaine et 2 dizaines.</p>`},
 {t:'Les astuces du presque rond',h:`<p>Ajouter 9, 19 ou 29, c’est presque ajouter 10, 20 ou 30 :</p>
<ul><li>47 + 19 → 47 + 20 = 67, puis j’enlève le 1 ajouté en trop : <b>66</b>.</li><li>83 − 9 → 83 − 10 = 73, mais j’ai enlevé 1 de trop, je le rajoute : <b>74</b>.</li></ul>
<p>Pour ne pas se tromper de sens, on se demande : « J’ai ajouté (ou enlevé) <b>trop</b> ou <b>pas assez</b> ? »</p>
<p><b>Multiplier par 10</b> : chaque chiffre avance d’un rang vers la gauche et un 0 prend la place des unités : 34 × 10 = 340.</p>`}],
 try:{q:'Calcule de tête : 65 + 29, puis 72 − 19.',a:'65 + 30 = 95, moins 1 → 94. 72 − 20 = 52, plus 1 → 53.'},
 adult:'Proposez 3 calculs par jour, par exemple pendant un trajet. Demandez toujours « Comment as-tu fait ? » : expliquer sa méthode compte autant que la réponse.',
 culture:{t:'Une calculatrice humaine',h:`<p>En 1980, l’Indienne <b>Shakuntala Devi</b> a multiplié de tête deux nombres de 13 chiffres en 28 secondes. Cet exploit a été inscrit au Livre Guinness des records. Elle disait que le calcul mental est d’abord une affaire d’entraînement et d’astuces.</p>`}},
'ce1-ma-addition-posee':{
 deep:[{t:'Bien poser avant de calculer',h:`<p>La moitié des erreurs vient d’une addition <b>mal posée</b>. Pour bien poser :</p>
<ol><li>j’écris les nombres l’un sous l’autre en alignant les chiffres <b>à droite</b> : unités sous unités, dizaines sous dizaines, centaines sous centaines ;</li><li>j’écris le signe + à gauche et je trace un trait ;</li><li>si un nombre a moins de chiffres (278 + 56), il a des cases vides à gauche : je ne décale pas !</li></ol>
<p>Le papier quadrillé aide beaucoup : <b>un chiffre par carreau</b>.</p>`},
 {t:'Les retenues, pas à pas',h:`<p>Exemple : 365 + 247.</p>
<ol><li><b>Unités</b> : 5 + 7 = 12. J’écris 2 et je retiens 1 dizaine (je l’écris en haut de la colonne des dizaines).</li><li><b>Dizaines</b> : 1 + 6 + 4 = 11 dizaines. J’écris 1 et je retiens 1 centaine.</li><li><b>Centaines</b> : 1 + 3 + 2 = 6.</li></ol>
<p>Résultat : <b>612</b>. Je contrôle avec un <b>ordre de grandeur</b> : 365 est proche de 400 et 247 proche de 200 ; 400 + 200 = 600. 612 est proche de 600 : c’est cohérent.</p>`}],
 try:{q:'Pose et calcule 489 + 136.',a:'Unités : 9 + 6 = 15, j’écris 5, retenue 1. Dizaines : 1 + 8 + 3 = 12, j’écris 2, retenue 1. Centaines : 1 + 4 + 1 = 6. Résultat : 625.'},
 adult:'Faites additionner les prix de deux ou trois articles sur un ticket de caisse, puis vérifiez avec le total du ticket : un vrai contrôle par la réalité.',
 culture:{t:'Le voyage de nos chiffres',h:`<p>Poser une addition en colonnes n’est possible que parce que chaque chiffre a une <b>place</b>. Ce système vient d’Inde. En 1202, un mathématicien italien, <b>Fibonacci</b>, l’a fait connaître en Europe dans un livre de calcul. Avant, beaucoup d’Européens comptaient avec des jetons ou en chiffres romains.</p>`}},
'ce1-ma-soustraction-posee':{
 deep:[{t:'Quand le chiffre du haut est trop petit',h:`<p>Dans 52 − 27, aux unités, 2 − 7 est impossible : on ne peut pas enlever 7 objets à 2 objets. Il faut aller chercher des unités en plus.</p>
<p><b>Je casse une dizaine</b> : je prends 1 des 5 dizaines du haut et je la transforme en 10 unités.</p>
<ul><li>Il reste <b>4</b> dizaines en haut (je barre le 5 et j’écris 4).</li><li>J’ai maintenant <b>12</b> unités (j’écris un petit 1 devant le 2).</li><li>Unités : 12 − 7 = <b>5</b>. Dizaines : 4 − 2 = <b>2</b>.</li></ul>
<p>Résultat : <b>25</b>.</p>`},
 {t:'Toujours vérifier',h:`<p>La soustraction a une alliée : l’<b>addition</b>. Si 52 − 27 = 25, alors 25 + 27 doit redonner 52. C’est le cas : le calcul est juste.</p>
<p>Deux règles pour ne pas se tromper :</p>
<ul><li>le <b>plus grand</b> nombre se pose <b>en haut</b> ;</li><li>dans chaque colonne, on fait toujours <b>haut − bas</b>, jamais l’inverse, même si le chiffre du bas est plus grand.</li></ul>
<p>Il existe une autre méthode, avec des retenues ajoutées en haut et en bas (méthode par compensation). Les deux donnent le même résultat : on suit celle de sa classe.</p>`}],
 try:{q:'Pose et calcule 74 − 38, puis vérifie avec une addition.',a:'4 − 8 impossible : je casse une dizaine → 14 − 8 = 6 ; 6 − 3 = 3. Résultat : 36. Vérification : 36 + 38 = 74.'},
 adult:'Utilisez la monnaie : « Tu as 52 €, tu dépenses 27 €. » Faites échanger un billet de 10 € contre dix pièces de 1 € pour montrer concrètement ce que veut dire « casser une dizaine ».',
 culture:{t:'Plusieurs façons de soustraire',h:`<p>Selon les pays et les époques, on n’apprend pas la même technique pour poser une soustraction : en « cassant » une dizaine, ou en ajoutant 10 en haut et 1 en bas. Toutes ces méthodes sont justes, car elles reposent sur la même règle : 10 unités valent 1 dizaine.</p>`}},
'ce1-ma-tables-mult':{
 deep:[{t:'Comprendre avant de réciter',h:`<p>Une table de multiplication n’est pas une poésie mystérieuse : chaque résultat est une <b>addition répétée</b>. 4 × 3, c’est 4 fois le nombre 3 : 3 + 3 + 3 + 3 = 12.</p>
<p>Dans la table de 5, on avance de 5 en 5 : 5, 10, 15, 20… Dans la table de 2, de 2 en 2. Si on oublie un résultat, on peut le <b>retrouver</b> à partir d’un résultat connu : si je sais que 5 × 3 = 15, alors 6 × 3 = 15 + 3 = 18.</p>`},
 {t:'Des astuces pour retenir',h:`<ul><li><b>× 2</b> : c’est le <b>double</b>. 2 × 8 = 16.</li><li><b>× 4</b> : c’est le <b>double du double</b>. 4 × 6 : double de 6 = 12, double de 12 = 24.</li><li><b>× 10</b> : on écrit un <b>0</b> à droite. 10 × 7 = 70.</li><li><b>× 5</b> : c’est la <b>moitié de × 10</b>. 5 × 8 : 10 × 8 = 80, la moitié = 40. Les résultats finissent toujours par 0 ou 5.</li><li><b>On peut retourner</b> : 3 × 7 = 7 × 3. Connaître la table de 3 aide pour toutes les autres !</li></ul>`}],
 try:{q:'Calcule 4 × 9 avec l’astuce du double du double.',a:'Double de 9 = 18 ; double de 18 = 36. Donc 4 × 9 = 36.'},
 adult:'Quelques minutes par jour suffisent : récitez une table « en désordre », jouez au jeu de cartes de la bataille où l’on multiplie les deux cartes, ou affichez une table près du lavabo.',
 culture:{t:'La table de Pythagore',h:`<p>Le grand tableau où toutes les tables sont rangées en lignes et en colonnes s’appelle la <b>table de Pythagore</b>, du nom d’un savant grec de l’Antiquité. En réalité, on ne sait pas si c’est vraiment lui qui l’a inventée !</p>`}},
'ce1-ma-multiplication':{
 deep:[{t:'Repérer des groupes égaux',h:`<p>La multiplication est utile dès qu’il y a <b>plusieurs groupes qui ont tous le même nombre d’objets</b> : des boîtes d’œufs, des rangées de chaises, des paquets de cartes…</p>
<p>Pour écrire la multiplication, je réponds à deux questions : <b>combien de groupes ?</b> et <b>combien dans chaque groupe ?</b> 4 boîtes de 6 œufs : 4 × 6 = 24. Le résultat s’appelle le <b>produit</b>.</p>
<p>Un <b>quadrillage</b> est très pratique : 3 lignes de 5 cases contiennent 3 × 5 = 15 cases. Et si je tourne la feuille, j’ai 5 lignes de 3 cases : toujours 15 !</p>`},
 {t:'Pairs, impairs et multiples',h:`<p>Les résultats de la table de 2 (2, 4, 6, 8, 10, 12…) s’appellent les <b>multiples de 2</b> : ce sont les nombres <b>pairs</b>. On les reconnaît à leur dernier chiffre : 0, 2, 4, 6 ou 8.</p>
<p>Un nombre pair peut toujours être partagé en deux parts égales sans rien couper. Un nombre <b>impair</b> (1, 3, 5, 7, 9 à la fin) laisse toujours <b>un objet de reste</b>.</p>
<p>De la même façon, les multiples de 5 se terminent par 0 ou 5, et les multiples de 10 par 0.</p>`}],
 try:{q:'Dans une salle, il y a 6 rangées de 5 chaises. Combien de chaises ? Le nombre trouvé est-il pair ?',a:'6 × 5 = 30 chaises. 30 se termine par 0 : c’est un nombre pair.'},
 adult:'Cherchez des multiplications cachées autour de vous : fenêtres d’un immeuble, carreaux de chocolat, bouteilles dans un pack. Faites dire « 3 rangées de 4 » avant de calculer.',
 culture:{t:'Multiplier comme les Égyptiens',h:`<p>Les Égyptiens de l’Antiquité multipliaient en faisant des <b>doubles</b>. Pour 13 × 6, ils calculaient 1 × 6 = 6, 2 × 6 = 12, 4 × 6 = 24, 8 × 6 = 48, puis ajoutaient les lignes qui font 13 (1 + 4 + 8) : 6 + 24 + 48 = <b>78</b>.</p>`}},
'ce1-ma-partage':{
 deep:[{t:'Deux sortes de partages',h:`<p>Avec 12 bonbons, on peut se poser deux questions différentes :</p>
<ul><li><b>Combien chacun ?</b> Je partage entre 3 enfants. Je distribue un bonbon à chacun, puis encore un, jusqu’à ce qu’il n’en reste plus : chacun en a <b>4</b>.</li><li><b>Combien de paquets ?</b> Je fais des paquets de 3 bonbons. Je compte combien de paquets je peux faire : <b>4</b> paquets.</li></ul>
<p>Dans les deux cas, on utilise la même multiplication : 3 × 4 = 12. C’est le début de la <b>division</b>, que tu étudieras plus tard.</p>`},
 {t:'Utiliser les tables et le reste',h:`<p>Pour partager 20 billes entre 4 enfants, je cherche dans la table de 4 : « 4 fois combien font 20 ? ». 4 × 5 = 20 : chacun reçoit <b>5</b> billes.</p>
<p>Parfois, le partage ne tombe pas juste : 13 bonbons pour 4 enfants. 4 × 3 = 12, et 4 × 4 = 16, c’est trop. Chacun reçoit <b>3</b> bonbons et il en <b>reste 1</b>, qu’on ne peut pas partager équitablement.</p>
<p>Je vérifie toujours : (nombre de parts × valeur d’une part) + reste = total. 4 × 3 + 1 = 13. ✔️</p>`}],
 try:{q:'On range 17 livres sur des étagères de 5 livres. Combien d’étagères pleines ? Combien de livres restent ?',a:'5 × 3 = 15 et 5 × 4 = 20 (trop). 3 étagères pleines, et il reste 2 livres (15 + 2 = 17).'},
 adult:'Faites partager de vrais objets (cartes, pâtes, petits gâteaux) entre des peluches, en distribuant un par un. Choisissez parfois un nombre qui ne tombe pas juste pour parler du reste.',
 culture:{t:'Le signe de la division',h:`<p>Le signe <b>÷</b> a été utilisé pour la division dans un livre publié en <b>1659</b> par un mathématicien suisse, <b>Johann Rahn</b>. On le trouve aujourd’hui sur la touche de division de la plupart des calculatrices.</p>`}},
'ce1-ma-problemes':{
 deep:[{t:'Les problèmes de comparaison',h:`<p>Certains problèmes comparent deux quantités. Il faut bien lire <b>ce qu’on cherche</b> :</p>
<ul><li>« Mia a 12 billes <b>de plus</b> que Léo, qui en a 35. Combien Mia en a-t-elle ? » → on cherche une quantité plus grande : 35 + 12 = <b>47</b>.</li><li>« Mia a 47 billes, Léo en a 35. Combien Mia en a-t-elle <b>de plus</b> ? » → on cherche l’<b>écart</b> : 47 − 35 = <b>12</b>.</li></ul>
<p>Les deux phrases contiennent « de plus », mais la question n’est pas la même : c’est la question qui décide du calcul, pas un mot isolé.</p>`},
 {t:'Les problèmes en deux étapes',h:`<p>Parfois, il faut trouver une <b>réponse intermédiaire</b> avant la réponse finale.</p>
<p>« J’ai 50 €. J’achète un livre à 12 € et un jeu à 25 €. Combien me reste-t-il ? »</p>
<ol><li>Je calcule d’abord ce que je dépense : 12 + 25 = 37 €.</li><li>Puis ce qui reste : 50 − 37 = <b>13 €</b>.</li></ol>
<p>Un <b>schéma en barre</b> aide beaucoup : je dessine une longue barre pour le tout (50 €) et je la découpe en morceaux pour chaque partie. La partie inconnue devient visible.</p>`}],
 try:{q:'Un fermier a 34 poules. Il en achète 15, puis en vend 20. Combien de poules a-t-il maintenant ?',a:'34 + 15 = 49, puis 49 − 20 = 29. Il a 29 poules.'},
 adult:'Avant de calculer, demandez à l’enfant de raconter le problème avec ses mots et de dire ce qu’on cherche. Un petit dessin en barres vaut mieux que de deviner l’opération.',
 culture:{t:'Quatre étapes pour résoudre',h:`<p>Un mathématicien hongrois, <b>George Pólya</b>, a écrit en 1945 un livre célèbre sur la façon de résoudre les problèmes. Il conseillait quatre étapes : <b>comprendre</b> le problème, <b>imaginer un plan</b>, <b>appliquer</b> le plan, puis <b>vérifier</b> la réponse.</p>`}},
'ce1-ma-longueurs':{
 deep:[{t:'Choisir la bonne unité',h:`<p>On choisit l’unité selon la taille de ce qu’on mesure. Des repères aident à se faire une idée :</p>
<ul><li><b>1 cm</b> : la largeur d’un ongle. On mesure en cm un crayon, un livre, une main.</li><li><b>1 m</b> : un grand pas d’adulte, ou la hauteur d’une poignée de porte. On mesure en m une pièce, une piscine, un arbre.</li><li><b>1 km</b> : environ un quart d’heure de marche. On mesure en km un trajet entre deux villes.</li></ul>
<p>Avant de répondre, je me demande si mon résultat est <b>possible</b> : une table de 80 km, ce serait absurde !</p>`},
 {t:'Convertir sans se tromper',h:`<p>Deux égalités à connaître par cœur : <b>1 m = 100 cm</b> et <b>1 km = 1 000 m</b>.</p>
<ul><li>3 m = 3 × 100 cm = <b>300 cm</b>.</li><li>2 m 30 cm = 200 cm + 30 cm = <b>230 cm</b>.</li><li>2 km = <b>2 000 m</b>.</li></ul>
<p>Pour mesurer une grande longueur, on peut utiliser un <b>mètre ruban</b> ou compter des pas. Pour un trait, on utilise la règle, en plaçant bien le 0 au début.</p>`}],
 try:{q:'Quelle longueur est la plus grande : 150 cm ou 2 m ?',a:'2 m = 200 cm. 200 cm > 150 cm, donc 2 m est plus long.'},
 adult:'Mesurez la taille de l’enfant et de chaque membre de la famille avec un mètre ruban, puis comparez. Sur un trajet en voiture, regardez les panneaux qui indiquent les kilomètres.',
 culture:{t:'Comment le mètre a été mesuré',h:`<p>À la fin du XVIIIe siècle, deux savants français, <b>Delambre</b> et <b>Méchain</b>, ont mesuré pendant des années la distance entre <b>Dunkerque</b> et <b>Barcelone</b>. Ces mesures ont servi à fixer la longueur du mètre, qui devait être la même pour tout le monde.</p>`}},
'ce1-ma-masses':{
 deep:[{t:'Des repères pour imaginer une masse',h:`<p>Pour savoir si une masse est raisonnable, on la compare à des objets connus :</p>
<ul><li>un <b>trombone</b> pèse environ <b>1 g</b> ;</li><li>une <b>tablette de chocolat</b> pèse souvent <b>100 g</b> ;</li><li>un <b>paquet de sucre</b> pèse <b>1 kg</b> ;</li><li>un <b>enfant de 7 ans</b> pèse en général entre 20 et 30 kg.</li></ul>
<p>Les petites masses (un bonbon, une lettre) se mesurent en <b>grammes</b> ; les grandes (un sac de pommes, une personne) en <b>kilogrammes</b>.</p>`},
 {t:'Convertir et lire une balance',h:`<p>À retenir : <b>1 kg = 1 000 g</b>. Donc 2 kg = 2 000 g, et 500 g, c’est la moitié d’un kilogramme.</p>
<p>Sur une balance à aiguille, je lis d’abord la valeur des graduations, comme sur une droite graduée. Sur une balance électronique, je lis le nombre et <b>l’unité affichée</b> (g ou kg).</p>
<p>Attention : le volume ne dit pas la masse. Un grand sac de plumes peut être plus léger qu’un petit sac de sable.</p>`}],
 try:{q:'Un panier contient 1 kg de pommes et 500 g de raisin. Combien de grammes en tout ?',a:'1 kg = 1 000 g. 1 000 g + 500 g = 1 500 g.'},
 adult:'En cuisine, lisez ensemble les masses sur les paquets (250 g de beurre, 1 kg de farine) et pesez des ingrédients. Faites deviner une masse avant de la vérifier sur la balance.',
 culture:{t:'Le kilogramme de Sèvres',h:`<p>Pendant 130 ans, depuis 1889, le kilogramme de référence était un petit <b>cylindre de métal</b> gardé à <b>Sèvres</b>, près de Paris. Toutes les balances du monde étaient réglées par rapport à lui. Depuis 2019, le kilogramme est défini autrement, grâce à un nombre de la physique qui ne change jamais.</p>`}},
'ce1-ma-monnaie':{
 deep:[{t:'Euros et centimes',h:`<p>Un euro se partage en <b>100 centimes</b>, comme un mètre se partage en 100 centimètres. Dans un prix écrit avec une virgule :</p>
<ul><li>le nombre <b>avant</b> la virgule compte les <b>euros</b> ;</li><li>le nombre <b>après</b> la virgule compte les <b>centimes</b> (toujours avec deux chiffres).</li></ul>
<p><b>3,50 €</b> = 3 euros et 50 centimes. <b>3,05 €</b> = 3 euros et 5 centimes. Ce n’est pas la même chose !</p>
<p>Pour compter une somme, je compte d’abord les euros, puis les centimes. Si les centimes dépassent 100, j’échange 100 centimes contre 1 euro.</p>`},
 {t:'Rendre la monnaie',h:`<p>Quand on paie avec plus d’argent que le prix, le marchand rend la <b>différence</b>. Pour la calculer, on peut <b>compléter</b> comme le font les commerçants :</p>
<p>Un livre coûte 7 €, je donne un billet de 10 €. Le marchand compte à partir de 7 : « 8, 9, 10 » en donnant une pièce de 1 € à chaque fois → il me rend <b>3 €</b>.</p>
<p>On peut aussi faire une soustraction : 10 − 7 = 3. Les deux méthodes donnent le même résultat.</p>`}],
 try:{q:'Un jus coûte 1,50 €. Je paie avec une pièce de 2 €. Combien me rend-on ?',a:'De 1,50 € à 2 €, il manque 50 centimes. On me rend 50 centimes (0,50 €).'},
 adult:'Laissez l’enfant payer une petite course et vérifier la monnaie rendue. À la maison, un jeu de marchande avec des étiquettes de prix (1,20 €, 2,50 €) est très efficace.',
 culture:{t:'Une pièce, deux faces',h:`<p>Les pièces en euros ont une face commune à tous les pays et une face <b>nationale</b>. Sur les pièces françaises, on voit un <b>arbre</b> (1 € et 2 €), la <b>Semeuse</b> (10, 20 et 50 centimes) et <b>Marianne</b> (1, 2 et 5 centimes). Une pièce française peut servir pour payer dans tous les pays qui utilisent l’euro.</p>`}},
'ce1-ma-heure':{
 deep:[{t:'Lire les minutes',h:`<p>La grande aiguille fait le tour du cadran en <b>60 minutes</b>. Entre deux chiffres du cadran, il y a <b>5 minutes</b>. Pour lire les minutes, je compte de 5 en 5 à partir du 12 :</p>
<ul><li>grande aiguille sur le <b>3</b> → 15 minutes (le <b>quart</b>) ;</li><li>sur le <b>6</b> → 30 minutes (la <b>demie</b>) ;</li><li>sur le <b>9</b> → 45 minutes.</li></ul>
<p>La petite aiguille avance doucement : à 4 h 30, elle est <b>au milieu</b>, entre le 4 et le 5. L’heure, c’est le chiffre qu’elle a <b>déjà dépassé</b> : ici, 4.</p>`},
 {t:'Dire l’heure de deux façons',h:`<p>On peut dire la même heure de deux manières :</p>
<table class="ptable"><tr><th>Écrite</th><th>Dite</th></tr><tr><td>3 h 15</td><td>trois heures et quart</td></tr><tr><td>3 h 30</td><td>trois heures et demie</td></tr><tr><td>3 h 45</td><td>quatre heures moins le quart</td></tr><tr><td>15 h 00</td><td>trois heures de l’après-midi</td></tr></table>
<p>Après midi, on peut continuer à compter : 13 h, 14 h, 15 h… jusqu’à 24 h. C’est ainsi que s’écrivent les horaires de train ou de télévision.</p>`}],
 try:{q:'La petite aiguille est entre le 9 et le 10, la grande est sur le 6. Quelle heure est-il ?',a:'Il est 9 h 30 (neuf heures et demie).'},
 adult:'Donnez une montre à aiguilles à l’enfant ou demandez-lui régulièrement l’heure sur l’horloge de la cuisine. Faites aussi calculer des durées simples : « Le film commence à 14 h et dure 1 h 30. »',
 culture:{t:'Pourquoi 60 minutes ?',h:`<p>Les <b>Babyloniens</b>, qui vivaient il y a environ 4 000 ans dans l’actuel Irak, comptaient par paquets de <b>60</b>. C’est de leur façon de compter que viennent nos 60 minutes dans une heure et nos 60 secondes dans une minute.</p>`}},
'ce1-ma-figures':{
 deep:[{t:'L’angle droit',h:`<p>Un <b>angle droit</b> a la forme du coin d’une feuille de papier. Pour savoir si un angle est droit, on ne se fie pas à ses yeux : on utilise une <b>équerre</b>.</p>
<ol><li>je place le sommet de l’angle droit de l’équerre sur le sommet de l’angle à vérifier ;</li><li>je pose un côté de l’équerre le long d’un côté de la figure ;</li><li>si l’autre côté de l’équerre suit exactement l’autre côté de la figure, l’angle est droit.</li></ol>
<p>On peut aussi fabriquer un « gabarit » d’angle droit en pliant deux fois une feuille.</p>`},
 {t:'Reconnaître les quadrilatères',h:`<p>Un <b>quadrilatère</b> est une figure à 4 côtés. Pour savoir lequel c’est, je vérifie les angles et les longueurs :</p>
<ul><li>4 angles droits → c’est un <b>rectangle</b> (ses côtés opposés ont la même longueur) ;</li><li>4 angles droits <b>et</b> 4 côtés égaux → c’est un <b>carré</b> ;</li><li>4 côtés égaux <b>sans</b> angle droit → c’est un <b>losange</b>.</li></ul>
<p>Un carré tourné « sur la pointe » reste un carré : la position de la figure ne change pas sa nature.</p>`}],
 try:{q:'Un triangle a un angle droit. Comment l’appelle-t-on ?',a:'C’est un triangle rectangle.'},
 adult:'Faites chercher des angles droits dans la maison avec une équerre ou une feuille pliée (coins de table, de porte, de livre), et des angles qui ne sont pas droits (pointe d’une part de pizza).',
 culture:{t:'La corde à nœuds',h:`<p>On raconte que les arpenteurs de l’Égypte ancienne utilisaient une <b>corde à 13 nœuds</b> régulièrement espacés. En la tendant pour former un triangle de 3, 4 et 5 intervalles, ils obtenaient un <b>angle droit</b>, utile pour tracer les champs et les bâtiments.</p>`}},
'ce1-ma-solides':{
 deep:[{t:'Faces, arêtes, sommets',h:`<p>Pour décrire un solide, on compte trois sortes d’éléments :</p>
<ul><li>les <b>faces</b> : les surfaces plates (on peut poser le solide dessus) ;</li><li>les <b>arêtes</b> : les bords, là où deux faces se touchent (on peut glisser le doigt le long) ;</li><li>les <b>sommets</b> : les pointes, là où plusieurs arêtes se rejoignent.</li></ul>
<p>Pour compter sans se tromper, on peut coller une gommette sur chaque face déjà comptée, ou compter <b>en haut</b>, puis <b>en bas</b>, puis <b>sur les côtés</b>.</p>`},
 {t:'Cube, pavé, pyramide',h:`<table class="ptable"><tr><th>Solide</th><th>Faces</th><th>Arêtes</th><th>Sommets</th></tr><tr><td>Cube</td><td>6 carrés</td><td>12</td><td>8</td></tr><tr><td>Pavé droit</td><td>6 rectangles</td><td>12</td><td>8</td></tr><tr><td>Pyramide à base carrée</td><td>5 (1 carré + 4 triangles)</td><td>8</td><td>5</td></tr></table>
<p>Le cube et le pavé ont le même nombre de faces, d’arêtes et de sommets. Ce qui les distingue, c’est la forme des faces : <b>toutes des carrés identiques</b> pour le cube.</p>`}],
 try:{q:'Combien d’arêtes a une pyramide à base carrée ?',a:'4 arêtes autour de la base carrée et 4 qui montent vers la pointe : 8 arêtes.'},
 adult:'Construisez un cube avec des cure-dents et de la pâte à modeler : les cure-dents sont les arêtes (12), les boules de pâte les sommets (8). L’enfant comprend en fabriquant.',
 culture:{t:'Une formule magique',h:`<p>Au XVIIIe siècle, le mathématicien suisse <b>Leonhard Euler</b> a remarqué que pour beaucoup de solides : faces + sommets − arêtes = <b>2</b>. Vérifie avec le cube : 6 + 8 − 12 = 2. Et avec la pyramide : 5 + 5 − 8 = 2. Ça marche !</p>`}},
'ce1-ma-quadrillage':{
 deep:[{t:'Lire les coordonnées d’une case',h:`<p>Sur un quadrillage, chaque case a une « adresse » faite de deux informations :</p>
<ol><li>la <b>lettre</b> de sa colonne (écrite en haut) ;</li><li>le <b>chiffre</b> de sa ligne (écrit à gauche).</li></ol>
<p>Pour trouver la case <b>C2</b>, je pose un doigt sur la colonne C, un autre sur la ligne 2, et je les fais glisser jusqu’à ce qu’ils se rencontrent. On écrit toujours <b>la lettre d’abord</b>, puis le chiffre.</p>`},
 {t:'Coder et suivre un déplacement',h:`<p>Un déplacement se code avec des flèches, chacune valant <b>une case</b> :</p>
<ul><li>→ une case à droite ; ← une case à gauche ;</li><li>↑ une case vers le haut ; ↓ une case vers le bas.</li></ul>
<p>Pour suivre un chemin, je pose mon crayon sur la case de départ et j’avance flèche par flèche, en barrant chaque flèche déjà faite. Pour vérifier, je peux refaire le chemin à l’envers, en inversant les flèches.</p>`}],
 try:{q:'Je pars de B1 et je fais ↓ ↓ →. Où suis-je ?',a:'↓ ↓ : je descends de 2 lignes (B3), puis → : une colonne à droite. J’arrive en C3.'},
 adult:'Jouez à la bataille navale ou à un jeu de plateau avec des cases repérées. Vous pouvez aussi guider l’enfant sur un plan de ville avec des cases lettre-chiffre.',
 culture:{t:'Lettres et chiffres aux échecs',h:`<p>Aux <b>échecs</b>, chaque case de l’échiquier a aussi une adresse : une lettre de <b>a</b> à <b>h</b> et un chiffre de <b>1</b> à <b>8</b>. Grâce à ces coordonnées, les joueurs du monde entier peuvent noter et rejouer les parties des champions.</p>`}},
'ce1-ma-donnees':{
 deep:[{t:'Lire un diagramme en barres',h:`<p>Un diagramme en barres transforme des nombres en <b>barres</b> : plus la barre est haute, plus la quantité est grande. Pour le lire :</p>
<ol><li>je lis le <b>titre</b> : de quoi parle le diagramme ?</li><li>je lis les <b>étiquettes</b> sous les barres (foot, danse, judo…) ;</li><li>je regarde l’<b>axe gradué</b> sur le côté et je trouve la valeur d’une graduation (1, 2, 5, 10…) ;</li><li>pour chaque barre, je suis le haut de la barre jusqu’à l’axe avec une règle et je lis la valeur.</li></ol>`},
 {t:'Comparer et calculer',h:`<p>Un diagramme permet de comparer d’un seul coup d’œil : la plus haute barre montre le plus grand nombre. Mais pour savoir <b>de combien</b> une quantité dépasse l’autre, il faut lire les valeurs et calculer l’<b>écart</b>.</p>
<p>Si le foot a 8 élèves et la danse 5, l’écart est 8 − 5 = <b>3</b>. Pour connaître le total, j’additionne toutes les barres.</p>
<p>Attention : si une graduation vaut 2, une barre qui monte à la 4e graduation vaut <b>8</b>, pas 4.</p>`}],
 try:{q:'Sur un diagramme, chaque graduation vaut 5. La barre « vélo » monte jusqu’à la 3e graduation. Combien d’élèves ont choisi le vélo ?',a:'3 graduations de 5 : 5 + 5 + 5 = 15 élèves.'},
 adult:'Faites un sondage familial (fruit préféré, couleur préférée) puis dessinez ensemble le diagramme sur du papier quadrillé : une case par réponse.',
 culture:{t:'L’inventeur du diagramme en barres',h:`<p>Le diagramme en barres a été popularisé en <b>1786</b> par un Écossais, <b>William Playfair</b>, dans un livre qui montrait le commerce de l’Écosse avec d’autres pays. Aujourd’hui, on le retrouve partout : à la météo, dans les journaux et dans les livres de sciences.</p>`}}
},{lot:'maths-ce1',grade:'CE1',subject:'maths',refs:['Mathématiques cycle 2 — programmes 2024 (BO n°41 du 31/10/2024)']});
})(typeof window!=='undefined'?window:globalThis);
