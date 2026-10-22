/* Finot Académie — cours approfondis : mathématiques CE2 (lot 3, 21/10/2026).
   Même format que course-depth-maths-cp.js (deep / try / adult / culture), affiché par js/course-depth.js.
   Rien n'est retiré des cours existants. Programme de référence : mathématiques cycle 2, programmes 2024
   (BO n°41 du 31/10/2024), applicables depuis 2025-2026. Faits culturels vérifiables uniquement. */
(function(root){
'use strict';
const D=root.MQCourseDepth=root.MQCourseDepth||{version:'1',chapters:{},add(map,meta){for(const id of Object.keys(map))this.chapters[id]=Object.assign({},meta,map[id]);}};
D.add({
'ce2-ma-nombres10000':{
 deep:[{t:'Le millier, un nouveau rang',h:`<p>Tu connais déjà la règle de l’échange : <b>10 unités font 1 dizaine</b>, <b>10 dizaines font 1 centaine</b>. Au CE2, on va une marche plus haut : <b>10 centaines font 1 millier</b>.</p>
<p>Avec du matériel, une unité est un petit cube, une dizaine une barre de 10 cubes, une centaine une plaque de 100 cubes, et un millier un <b>gros cube</b> fait de 10 plaques empilées, soit 1 000 petits cubes.</p>
<p>Dans <b>3 254</b>, il y a 3 gros cubes, 2 plaques, 5 barres et 4 petits cubes. Et si l’on réunit 10 gros cubes, on obtient <b>10 000</b> (dix-mille), le premier nombre à cinq chiffres.</p>`},
 {t:'Lire, écrire et décomposer',h:`<p>Pour lire un nombre à quatre chiffres, je le coupe en deux tranches, grâce au petit espace :</p>
<ol><li>la tranche des milliers : 4 527 → « quatre-mille » ;</li><li>le reste, lu comme un nombre à trois chiffres : « cinq-cent-vingt-sept ».</li></ol>
<p>Pour écrire « sept-mille-quarante », je remplis chaque rang : 7 milliers, <b>0</b> centaine, 4 dizaines, <b>0</b> unité → <b>7 040</b>. Chaque rang vide reçoit un 0.</p>
<p>Un même nombre peut se décomposer de plusieurs façons : 4 527 = 4 000 + 500 + 20 + 7, mais aussi <b>45 centaines</b> et 27 unités. Pour savoir combien de centaines il y a <b>en tout</b>, je lis tous les chiffres à gauche des dizaines : 45.</p>`}],
 try:{q:'Écris en chiffres « trois-mille-six ». Combien y a-t-il de dizaines en tout dans ce nombre ?',a:'3 006. Il y a 300 dizaines en tout (3 000 = 300 dizaines), et 6 unités de plus.'},
 adult:'Cherchez ensemble des nombres à quatre chiffres autour de vous : années de naissance, prix d’un vélo dans un catalogue, altitude d’une montagne. Faites-les lire à voix haute, puis demandez « Combien de milliers ? Combien de centaines en tout ? ».',
 culture:{t:'« Kilo » veut dire mille',h:`<p>Le mot <b>kilo</b> vient du grec ancien et signifie « mille ». On le retrouve dans les mesures : un <b>kilomètre</b>, c’est 1 000 mètres, et un <b>kilogramme</b>, 1 000 grammes.</p><p>Quand on demande « un kilo de pommes » au marché, on veut dire un kilogramme, c’est-à-dire 1 000 grammes de pommes.</p>`}},
'ce2-ma-comparer':{
 deep:[{t:'Comparer deux grands nombres, étape par étape',h:`<ol><li><b>Je compte les chiffres.</b> Celui qui en a le plus est le plus grand : 1 250 &gt; 987, car 1 250 a quatre chiffres et 987 seulement trois. Attention : ce n’est pas le premier chiffre qui décide ici !</li><li><b>S’ils ont autant de chiffres</b>, je compare de gauche à droite : d’abord les milliers, puis les centaines, les dizaines et enfin les unités.</li><li><b>Je m’arrête à la première différence.</b> Pour 7 482 et 7 428 : milliers égaux (7), centaines égales (4), dizaines 8 &gt; 2. Donc 7 482 &gt; 7 428, même si 2 unités &lt; 8 unités.</li></ol>
<p>Pour bien écrire le signe, sa <b>pointe</b> est toujours tournée vers le plus petit nombre.</p>`},
 {t:'Encadrer et trouver le nombre rond le plus proche',h:`<p>Encadrer 6 381, c’est dire entre quels nombres « ronds » il se trouve :</p>
<ul><li>au millier : 6 000 &lt; 6 381 &lt; 7 000 ;</li><li>à la centaine : 6 300 &lt; 6 381 &lt; 6 400 ;</li><li>à la dizaine : 6 380 &lt; 6 381 &lt; 6 390.</li></ul>
<p>Ensuite, je regarde de quel côté il est le plus proche : de 6 300 à 6 381, il y a 81 ; de 6 381 à 6 400, seulement 19. La centaine la plus proche est donc <b>6 400</b>.</p>
<p>Cela sert à <b>estimer</b> : 2 987 + 4 012, c’est à peu près 3 000 + 4 000 = 7 000. Si mon calcul posé donne 70 000 ou 700, je sais qu’il y a une erreur.</p>`}],
 try:{q:'Range dans l’ordre croissant : 5 099 ; 5 909 ; 5 990 ; 5 009.',a:'5 009 < 5 099 < 5 909 < 5 990.'},
 adult:'Comparez les prix de deux vélos ou les distances entre villes sur une carte routière, et faites écrire le bon signe. Demandez aussi « Entre quels milliers se trouve ce nombre ? De quelle centaine est-il le plus proche ? ».',
 culture:{t:'Deux géants de pierre',h:`<p>Le <b>mont Blanc</b>, le plus haut sommet des Alpes, mesure environ <b>4 800 mètres</b>. L’<b>Everest</b>, le plus haut sommet du monde, en Asie, mesure <b>8 849 mètres</b> d’après la mesure officielle annoncée en 2020.</p><p>Les deux nombres ont quatre chiffres : on compare les milliers, 8 &gt; 4, donc l’Everest est bien plus haut, presque deux fois plus.</p>`}},
'ce2-ma-droite':{
 deep:[{t:'Des pas de 10, de 100… ou d’autre chose',h:`<p>Sur une droite graduée, tous les pas ont la même valeur, mais ce n’est pas forcément 1, ni 10 ! Je dois toujours la calculer :</p>
<ol><li>je choisis <b>deux nombres écrits</b> sur la droite ;</li><li>je calcule leur <b>écart</b> ;</li><li>je le partage par le nombre d’<b>intervalles</b> (les espaces entre les traits, pas les traits eux-mêmes).</li></ol>
<ul><li>De 0 à 1 000 avec 10 intervalles : 1 000 ÷ 10 = <b>100</b>.</li><li>De 3 000 à 4 000 avec 5 intervalles : 1 000 ÷ 5 = <b>200</b>.</li><li>De 1 000 à 2 000 avec 4 intervalles : chaque pas vaut <b>250</b> (1 250, 1 500, 1 750, 2 000).</li></ul>`},
 {t:'Placer un nombre ou lire une flèche',h:`<p><b>Pour placer 2 700</b> sur une droite qui va de 2 000 à 3 000 par pas de 100 : 2 700 − 2 000 = 700, et 700, c’est 7 pas de 100. Je pars de 2 000 et j’avance de 7 intervalles.</p>
<p><b>Pour lire une flèche</b>, je pars du nombre écrit juste à sa gauche et je compte les pas jusqu’à elle, en disant les nombres à voix haute : 2 100, 2 200, 2 300…</p>
<p>Si la flèche tombe <b>entre deux traits</b>, je ne peux pas donner le nombre exact : je dis entre quels nombres il se trouve, par exemple « entre 2 400 et 2 500, à peu près 2 450 s’il est au milieu ».</p>`}],
 try:{q:'Sur une droite, 4 000 et 5 000 sont écrits, avec 5 intervalles entre eux. Quel nombre correspond au 3e trait après 4 000 ?',a:'Un pas vaut 1 000 ÷ 5 = 200. Trois pas font 600 : 4 000 + 600 = 4 600.'},
 adult:'Sortez un mètre ruban de bricolage : les petits traits valent 1 mm et les traits plus longs marquent les centimètres. Demandez ensuite de trouver la valeur d’un pas sur une balance de cuisine à aiguille ou sur un thermomètre.',
 culture:{t:'Les bornes kilométriques',h:`<p>Au bord de nombreuses routes de France, de petites <b>bornes</b> indiquent un nombre de kilomètres. La route devient alors une immense droite graduée : entre la borne 12 et la borne 13, il y a un kilomètre.</p><p>Les canaux et les voies ferrées ont aussi leurs repères, ce qui permet de dire précisément où se trouve un bateau ou un train.</p>`}},
'ce2-ma-fractions-egales':{
 deep:[{t:'Pourquoi 1/2 = 2/4 = 4/8 ?',h:`<p>Prends une bande de papier. Plie-la en 2 et colorie une moitié : tu as colorié <b>1/2</b> de la bande.</p>
<p>Replie-la en 2, puis encore en 2. En la dépliant, tu vois maintenant 4 parts égales, dont 2 coloriées : c’est <b>2/4</b>. Recommence une fois : 8 parts, dont 4 coloriées, soit <b>4/8</b>.</p>
<p>La partie coloriée n’a <b>pas changé</b> de taille : seul le découpage a changé. Quand on coupe chaque part en 2, il y a deux fois plus de parts en tout (le dénominateur est multiplié par 2) et deux fois plus de parts coloriées (le numérateur est multiplié par 2).</p>`},
 {t:'Fabriquer des fractions égales',h:`<p>La règle : pour obtenir une fraction égale, je <b>multiplie</b> le numérateur et le dénominateur par le <b>même nombre</b>.</p>
<ul><li>1/3 = 2/6 = 3/9 (× 2, puis × 3) ;</li><li>2/5 = 4/10 (× 2).</li></ul>
<p>Attention : on multiplie, on n’ajoute pas ! En ajoutant 1 en haut et en bas à 1/2, on obtient 2/3, qui n’est <b>pas</b> égal : 1/2, c’est la moitié, alors que 2/3, c’est plus que la moitié.</p>
<p>Enfin, quand le numérateur est égal au dénominateur (3/3, 10/10), on a pris toutes les parts : la fraction vaut <b>1</b>, le tout entier.</p>`}],
 try:{q:'Complète : 3/5 = …/10.',a:'Pour passer de 5 à 10, on multiplie par 2. On multiplie aussi le numérateur : 3 × 2 = 6. Donc 3/5 = 6/10.'},
 adult:'Pliez une feuille en 2 et coloriez la moitié, puis repliez-la en 4 et en 8 : faites constater que la part coloriée ne change pas, mais que son nom change (1/2, 2/4, 4/8). Une tablette de chocolat permet le même jeu.',
 culture:{t:'Des fractions en Chine, il y a 2 000 ans',h:`<p>Un célèbre livre chinois, <b>Les Neuf Chapitres sur l’art mathématique</b>, rassemble des problèmes écrits il y a environ <b>2 000 ans</b>. On y trouve déjà une méthode pour <b>simplifier une fraction</b>, c’est-à-dire trouver la fraction égale la plus simple : par exemple, 4/8 se simplifie en 1/2.</p>`}},
'ce2-ma-fractions-longueur':{
 deep:[{t:'Mesurer avec une unité partagée',h:`<p>Choisissons une bande comme <b>unité</b> de longueur, notée u. Si on la partage en 4 parts égales, chaque part mesure <b>1/4 u</b> (un quart d’unité).</p>
<p>Un segment qui mesure trois de ces parts mesure <b>3/4 u</b>. S’il en mesure quatre, il mesure 4/4 u, c’est-à-dire exactement 1 u.</p>
<p>On peut aussi graduer une droite en huitièmes : 0, 1/8, 2/8, 3/8… jusqu’à 8/8 = 1. Pour placer 5/8, je pars de 0 et j’avance de 5 petits pas. Plus le dénominateur est grand, plus les petits pas sont courts.</p>`},
 {t:'Comparer et additionner sans se tromper',h:`<ul><li><b>Même dénominateur</b> : les parts ont la même taille, je compare donc leur nombre. 5/8 &gt; 3/8.</li><li><b>Même numérateur</b> : on a le même nombre de parts, mais un gâteau partagé entre 6 donne des parts plus petites qu’un gâteau partagé entre 3. Donc 1/6 &lt; 1/3 et 5/8 &lt; 5/6.</li></ul>
<p>Pour additionner des dixièmes, je les compte comme des objets : 3 dixièmes + 4 dixièmes = 7 dixièmes, donc 3/10 + 4/10 = 7/10. Le dénominateur ne change pas : c’est le <b>nom</b> des parts.</p>
<p>Si les parts n’ont pas le même nom, je transforme d’abord : 1/4 = 2/8, donc 1/4 + 3/8 = 2/8 + 3/8 = 5/8.</p>`}],
 try:{q:'Qui a la plus grande part : Léo, qui a 2/3 d’une tarte, ou Zoé, qui a 2/5 de la même tarte ?',a:'Même numérateur (2). Un tiers est plus grand qu’un cinquième, donc 2/3 > 2/5 : c’est Léo.'},
 adult:'Découpez une bande de papier qui servira d’unité, pliez-la en 2, en 4 et en 8, et mesurez ensemble des objets de la maison avec elle : « Le crayon mesure environ 3/4 de la bande ».',
 culture:{t:'Une fraction, c’est un morceau cassé',h:`<p>Le mot <b>fraction</b> vient du latin <i>frangere</i>, qui veut dire « briser, casser ». Une fraction, c’est donc un morceau d’un tout qu’on a cassé en parts.</p><p>Le même mot latin a donné d’autres mots français : une <b>fracture</b> (un os cassé) et l’adjectif <b>fragile</b> (qui se casse facilement).</p>`}},
'ce2-ma-add-sous':{
 deep:[{t:'Poser une addition de grands nombres',h:`<p>Pour calculer 3 458 + 765, je pose les nombres en <b>alignant les unités</b> à droite, même s’ils n’ont pas le même nombre de chiffres.</p>
<ol><li>Unités : 8 + 5 = 13 → j’écris 3, je retiens 1.</li><li>Dizaines : 1 + 5 + 6 = 12 → j’écris 2, je retiens 1.</li><li>Centaines : 1 + 4 + 7 = 12 → j’écris 2, je retiens 1.</li><li>Milliers : 1 + 3 = 4.</li></ol>
<p>Résultat : <b>4 223</b>. Je vérifie avec un ordre de grandeur : 3 500 + 800 = 4 300, c’est proche. Mon résultat est vraisemblable.</p>`},
 {t:'Soustraire avec retenues… et vérifier',h:`<p>Calculons 5 203 − 1 468 par la méthode « par compensation » :</p>
<ol><li>Unités : 3 − 8, impossible. J’ajoute 10 unités en haut (13 − 8 = 5) et 1 dizaine en bas (6 + 1 = 7).</li><li>Dizaines : 0 − 7, impossible. 10 − 7 = 3, et j’ajoute 1 centaine en bas (4 + 1 = 5).</li><li>Centaines : 2 − 5, impossible. 12 − 5 = 7, et j’ajoute 1 millier en bas (1 + 1 = 2).</li><li>Milliers : 5 − 2 = 3.</li></ol>
<p>Résultat : <b>3 735</b>. Pourquoi ça marche ? Si j’ajoute la même quantité aux deux nombres, leur <b>écart</b> ne change pas (de 15 à 20, il y a 5 ; de 25 à 30 aussi). Vérification : 3 735 + 1 468 = 5 203.</p>`}],
 try:{q:'Calcule 6 000 − 2 375, puis vérifie ton résultat avec une addition.',a:'6 000 − 2 375 = 3 625. Vérification : 3 625 + 2 375 = 6 000.'},
 adult:'Avant chaque calcul posé, demandez un ordre de grandeur (« À peu près combien ? »). Après, faites vérifier chaque soustraction par une addition : l’enfant apprend ainsi à se corriger seul.',
 culture:{t:'Le nombre mystère 6 174',h:`<p>Prends un nombre à quatre chiffres qui ne sont pas tous pareils, par exemple 3 524. Range ses chiffres du plus grand au plus petit (5 432), puis du plus petit au plus grand (2 345), et soustrais : 5 432 − 2 345 = 3 087.</p><p>Recommence avec 3 087 : 8 730 − 0 378 = 8 352. Puis 8 532 − 2 358 = <b>6 174</b>. Et 7 641 − 1 467 = 6 174 encore ! On finit toujours par tomber sur 6 174, en sept étapes au plus. C’est le mathématicien indien <b>D. R. Kaprekar</b> qui a découvert cette curiosité, au XXe siècle.</p>`}},
'ce2-ma-tables':{
 deep:[{t:'Moins de résultats à apprendre qu’on ne croit',h:`<p>Les tables de 2 à 10 semblent contenir beaucoup de résultats, mais deux idées allègent le travail :</p>
<ul><li><b>L’ordre ne compte pas</b> : 7&nbsp;×&nbsp;8&nbsp;=&nbsp;8&nbsp;×&nbsp;7. Si je connais l’un, je connais l’autre.</li><li>Les tables de <b>2, 3, 4, 5 et 10</b> sont souvent déjà sûres.</li></ul>
<p>Il reste alors seulement <b>dix produits</b> difficiles, à travailler en priorité :</p>
<table class="ptable"><tr><td>6&nbsp;×&nbsp;6&nbsp;=&nbsp;36</td><td>6&nbsp;×&nbsp;7&nbsp;=&nbsp;42</td></tr><tr><td>6&nbsp;×&nbsp;8&nbsp;=&nbsp;48</td><td>6&nbsp;×&nbsp;9&nbsp;=&nbsp;54</td></tr><tr><td>7&nbsp;×&nbsp;7&nbsp;=&nbsp;49</td><td>7&nbsp;×&nbsp;8&nbsp;=&nbsp;56</td></tr><tr><td>7&nbsp;×&nbsp;9&nbsp;=&nbsp;63</td><td>8&nbsp;×&nbsp;8&nbsp;=&nbsp;64</td></tr><tr><td>8&nbsp;×&nbsp;9&nbsp;=&nbsp;72</td><td>9&nbsp;×&nbsp;9&nbsp;=&nbsp;81</td></tr></table>`},
 {t:'Retrouver un résultat oublié',h:`<p>Si j’hésite, je peux reconstruire le résultat à partir d’un résultat que je connais :</p>
<ul><li><b>en ajoutant un groupe</b> : 7 × 8 = 7 × 7 + 7 = 49 + 7 = 56 ;</li><li><b>avec un double</b> : 6 × 8 = le double de 3 × 8 = le double de 24 = 48 ;</li><li><b>avec la table de 10</b> : 9 × 6 = 10 × 6 − 6 = 60 − 6 = 54, et 5 × 8 = la moitié de 10 × 8 = 40.</li></ul>
<p>Il faut aussi savoir lire les tables <b>à l’envers</b> : si 6 × 7 = 42, alors dans 42 il y a 7 fois 6, et 42 partagé en 6 donne 7. C’est ce qui servira pour la division.</p>`}],
 try:{q:'Complète : 7 × … = 63 et … × 8 = 48.',a:'7 × 9 = 63 et 6 × 8 = 48.'},
 adult:'Dix minutes chaque jour valent mieux qu’une heure le dimanche. Fabriquez des cartes (la multiplication d’un côté, le résultat de l’autre), mettez de côté celles qui sont sues et revenez surtout sur les dix produits difficiles.',
 culture:{t:'La table de 9 sur les doigts',h:`<p>Pose tes dix doigts devant toi. Pour calculer 9 × 4, plie le <b>4e doigt</b> en partant de la gauche. Il reste 3 doigts à gauche du doigt plié (3 dizaines) et 6 doigts à droite (6 unités) : 9 × 4 = <b>36</b>.</p><p>Essaie avec 9 × 7 : plie le 7e doigt, il reste 6 doigts à gauche et 3 à droite, donc 63. L’astuce marche de 9 × 1 à 9 × 10.</p>`}},
'ce2-ma-multiplication-posee':{
 deep:[{t:'Ce que cache la multiplication posée',h:`<p>147 × 3, c’est 3 fois 147. On peut le calculer en décomposant 147 :</p>
<ul><li>3 × 100 = 300 ;</li><li>3 × 40 = 120 ;</li><li>3 × 7 = 21.</li></ul>
<p>300 + 120 + 21 = <b>441</b>. La multiplication posée fait exactement les mêmes calculs, mais en commençant par les <b>unités</b> : ainsi, quand 3 × 7 donne 21, j’écris 1 unité et je garde les 2 dizaines en <b>retenue</b> pour le rang suivant.</p>
<p>La retenue s’ajoute <b>après</b> la multiplication du rang suivant : 3 × 4 = 12, puis 12 + 2 = 14.</p>`},
 {t:'Multiplier par un nombre à deux chiffres',h:`<p>Pour 36 × 24, je décompose 24 en 20 + 4 :</p>
<ol><li>première ligne, <b>36 × 4</b> = 144 ;</li><li>deuxième ligne, <b>36 × 20</b> : je calcule 36 × 2 = 72, puis × 10 = 720. En colonnes, j’écris d’abord un <b>0</b> aux unités, puis 72 ;</li><li>j’additionne les deux lignes : 144 + 720 = <b>864</b>.</li></ol>
<p>Je vérifie avec un ordre de grandeur : 36 est proche de 40 et 24 proche de 20 ; 40 × 20 = 800. Mon résultat, 864, est cohérent.</p>`}],
 try:{q:'Calcule 208 × 4.',a:'4 × 8 = 32 : j’écris 2, je retiens 3. 4 × 0 = 0, plus 3 = 3. 4 × 2 = 8. Résultat : 832.'},
 adult:'Faites d’abord estimer le résultat (« 208 × 4, c’est un peu plus que 200 × 4 = 800 »), puis poser le calcul. Si les tables ne sont pas encore sûres, laissez une table de Pythagore à côté : l’objectif ici est la technique.',
 culture:{t:'Multiplier dans une grille',h:`<p>En Italie, au Moyen Âge et à la Renaissance, on posait parfois les multiplications dans une <b>grille</b> de cases coupées en diagonale. Chaque case recevait le produit de deux chiffres, puis on additionnait le long des diagonales.</p><p>On l’appelait la multiplication « <b>par jalousie</b> », parce que la grille ressemblait aux treillis de bois placés devant les fenêtres, qu’on appelait des jalousies.</p>`}},
'ce2-ma-calcul-mental':{
 deep:[{t:'× 10, × 100 : chaque chiffre change de rang',h:`<p>Multiplier par 10, ce n’est pas « coller un zéro » par magie. Dans 45, il y a 4 dizaines et 5 unités. Dix fois plus, cela donne 4 <b>centaines</b> et 5 <b>dizaines</b> : chaque chiffre avance d’un rang vers la gauche, et un 0 vient garder la place des unités. 45 × 10 = 450.</p>
<p>Multiplier par 100 fait avancer chaque chiffre de deux rangs : 45 × 100 = 4 500.</p>
<p>Pour × 30, je fais × 3 puis × 10 : 6 × 30 = 18 × 10 = 180. Pour × 5, je fais × 10 puis la moitié : 18 × 5 = 180 ÷ 2 = 90.</p>`},
 {t:'Passer par un nombre rond',h:`<p>Ajouter 38, c’est presque ajouter 40. J’ajoute 40, puis j’enlève les 2 de trop : 67 + 38 = 67 + 40 − 2 = 107 − 2 = <b>105</b>.</p>
<p>Enlever 29, c’est presque enlever 30. J’enlève 30, mais j’ai enlevé 1 de trop, donc je le rends : 83 − 29 = 83 − 30 + 1 = 53 + 1 = <b>54</b>.</p>
<p>Pour × 4, je prends le double du double : 17 × 4 → 34 → <b>68</b>.</p>
<p>Le plus important : savoir <b>dans quel sens corriger</b>. Je me demande toujours : « Ai-je ajouté (ou enlevé) trop, ou pas assez ? ».</p>`}],
 try:{q:'Calcule de tête : 145 + 99, puis 72 − 19.',a:'145 + 100 − 1 = 244. 72 − 20 + 1 = 53.'},
 adult:'En voiture ou en cuisine, proposez un petit calcul par jour à faire de tête, et demandez surtout « Comment as-tu fait ? » : il existe plusieurs bonnes façons, et les expliquer aide à les retenir.',
 culture:{t:'Le compte est bon',h:`<p>Dans « <b>Des chiffres et des lettres</b> », l’une des plus anciennes émissions de la télévision française, le jeu « <b>Le compte est bon</b> » demande d’atteindre un nombre à trois chiffres en combinant six nombres tirés au hasard, avec +, −, × et ÷. Chaque nombre ne peut servir qu’une fois.</p><p>À toi : obtiens 120 avec 5, 6 et 4. (Indice : commence par 6 × 5.)</p>`}},
'ce2-ma-division':{
 deep:[{t:'Deux histoires, une seule division',h:`<p>La même division 24 ÷ 6 peut raconter deux histoires :</p>
<ul><li><b>Partager</b> : 24 billes partagées entre 6 enfants. Combien chacun en reçoit-il ? → 4 billes.</li><li><b>Grouper</b> : 24 billes rangées par sachets de 6. Combien de sachets ? → 4 sachets.</li></ul>
<p>Dans les deux cas, je cherche le nombre qui, multiplié par 6, donne 24 : 6 × 4 = 24.</p>
<p>Les mots de la division : 24 est le <b>dividende</b> (ce qu’on divise), 6 est le <b>diviseur</b>, 4 est le <b>quotient</b> (le résultat).</p>`},
 {t:'Quand ça ne tombe pas juste',h:`<p>Avec 38 gâteaux, combien de boîtes de 5 peut-on remplir ? Je parcours la table de 5 : 5 × 7 = 35, 5 × 8 = 40 (trop). On remplit <b>7 boîtes</b> et il reste 38 − 35 = <b>3 gâteaux</b>. On l’écrit : 38 = 5 × 7 + 3.</p>
<p>Le reste est toujours <b>plus petit que le diviseur</b> : s’il restait 5 gâteaux ou plus, on pourrait remplir une boîte de plus !</p>
<p>Je lis bien la question : « Combien de boîtes pleines ? » → 7. Mais « Combien de boîtes faut-il pour ranger tous les gâteaux ? » → 8, car les 3 derniers ont besoin d’une boîte, même incomplète.</p>`}],
 try:{q:'Un fleuriste a 47 roses. Il fait des bouquets de 6 roses. Combien de bouquets complets peut-il faire ? Combien de roses reste-t-il ?',a:'6 × 7 = 42 et 6 × 8 = 48 (trop). Il fait 7 bouquets et il reste 47 − 42 = 5 roses. Vérification : 6 × 7 + 5 = 47.'},
 adult:'Faites partager pour de vrai : des cartes entre les joueurs, des bonbons dans des sachets. Demandez toujours « Est-ce que ça tombe juste ? Combien en reste-t-il ? », puis faites écrire l’égalité, par exemple 38 = 5 × 7 + 3.',
 culture:{t:'Les années bissextiles',h:`<p>Une année <b>bissextile</b> compte 366 jours au lieu de 365 : le mois de février a alors 29 jours.</p><p>En général, une année est bissextile quand son nombre se divise par 4 <b>sans reste</b> : 2024 ÷ 4 = 506, reste 0, donc 2024 était bissextile. Mais 2026 = 4 × 506 + 2 : il reste 2, donc 2026 ne l’est pas. La prochaine sera 2028. Il existe quelques exceptions pour les années qui se terminent par 00.</p>`}},
'ce2-ma-problemes':{
 deep:[{t:'Découper un problème en étapes',h:`<p>Exemple : « Sam a 50 €. Il achète 3 livres à 12 € chacun. Combien d’argent lui reste-t-il ? »</p>
<ol><li><b>Je lis</b> le problème jusqu’au bout et je le redis avec mes mots.</li><li><b>Je cherche la question finale</b> : ce qui reste à Sam.</li><li><b>Je repère ce qui me manque</b> pour y répondre : le prix des 3 livres. C’est une <b>question cachée</b>.</li><li><b>Je calcule étape par étape</b> : 3 × 12 = 36 € pour les livres, puis 50 − 36 = 14 €.</li><li><b>Je réponds par une phrase</b> : « Il reste 14 € à Sam. »</li></ol>
<p>Un petit schéma (une barre pour les 50 €, coupée en « livres » et « reste ») aide souvent à voir les étapes.</p>`},
 {t:'« Fois plus » ou « de plus » ?',h:`<p>Léo a 12 billes. Trois phrases qui se ressemblent, mais qui disent des choses très différentes :</p>
<ul><li>« Mia en a <b>3 de plus</b> » → 12 + 3 = 15 billes ;</li><li>« Mia en a <b>3 fois plus</b> » → 12 × 3 = 36 billes ;</li><li>« Mia en a <b>3 fois moins</b> » → 12 ÷ 3 = 4 billes.</li></ul>
<p>Pour les <b>combinaisons</b>, un tableau aide à ne rien oublier : avec 3 hauts (lignes) et 2 pantalons (colonnes), chaque case est une tenue. Il y a 3 × 2 = 6 cases, donc 6 tenues.</p>`}],
 try:{q:'Une place de cinéma coûte 8 €. Une famille achète 4 places et paie avec un billet de 50 €. Combien lui rend-on ?',a:'Les 4 places : 4 × 8 = 32 €. Monnaie rendue : 50 − 32 = 18 €.'},
 adult:'Demandez à l’enfant de raconter le problème avec ses mots avant de calculer, puis de dire quelle question « cachée » il faut résoudre d’abord. Un dessin ou un schéma en barres vaut souvent mieux qu’un long calcul.',
 culture:{t:'Le loup, la chèvre et le chou',h:`<p>Un passeur doit faire traverser une rivière à un loup, une chèvre et un chou. Sa barque ne peut emporter qu’un seul des trois avec lui. Mais s’ils restent seuls, le loup mange la chèvre, et la chèvre mange le chou !</p><p>Ce casse-tête figure dans un recueil de problèmes attribué à <b>Alcuin</b>, un savant de la cour de Charlemagne, il y a plus de 1 200 ans. Indice : la chèvre peut faire plusieurs voyages.</p>`}},
'ce2-ma-longueurs':{
 deep:[{t:'Le tableau de conversion, pas à pas',h:`<p>Dans le tableau des longueurs, chaque unité vaut <b>10 fois</b> celle qui est à sa droite : 1 m = 10 dm, 1 dm = 10 cm, 1 cm = 10 mm.</p>
<p>Pour convertir 2 m 5 cm en centimètres :</p>
<ol><li>je place 2 dans la colonne des m ;</li><li>il n’y a pas de dm : j’écris <b>0</b> dans la colonne des dm ;</li><li>je place 5 dans la colonne des cm.</li></ol>
<p>Je lis jusqu’à la colonne des cm : <b>205 cm</b> (et non 25 cm !). Pour les kilomètres, 1 km = 1 000 m : 3 km 250 m = 3 250 m.</p>`},
 {t:'Choisir la bonne unité et estimer',h:`<p>Avoir des repères aide à choisir l’unité et à repérer une réponse absurde :</p>
<ul><li><b>1 mm</b> : l’écart entre deux petits traits de la règle ;</li><li><b>1 cm</b> : à peu près la largeur d’un ongle d’enfant ;</li><li><b>1 m</b> : à peu près un grand pas d’adulte ;</li><li><b>1 km</b> : environ un quart d’heure de marche.</li></ul>
<p>On mesure une fourmi en mm, un cahier en cm, une salle de classe en m et le trajet entre deux villes en km. Si je trouve qu’une porte mesure 2 km, je sais que je me suis trompé d’unité.</p>`}],
 try:{q:'Range ces longueurs de la plus courte à la plus longue : 1 m 2 cm ; 120 cm ; 1 050 mm.',a:'Tout en cm : 1 m 2 cm = 102 cm ; 1 050 mm = 105 cm ; 120 cm. Donc 1 m 2 cm < 1 050 mm < 120 cm.'},
 adult:'Mesurez ensemble avec un mètre ruban : la longueur d’une table, la hauteur d’une porte, la taille de chacun. Faites d’abord estimer (« À ton avis, combien ? »), puis comparez avec la mesure.',
 culture:{t:'Des mètres en marbre dans Paris',h:`<p>Peu après la création du mètre, en 1796 et 1797, des <b>mètres étalons</b> gravés dans le marbre ont été installés dans les rues de Paris, pour que chacun puisse vérifier ses propres règles.</p><p>Deux d’entre eux sont encore visibles aujourd’hui : l’un rue de Vaugirard, en face du Sénat, l’autre place Vendôme.</p>`}},
'ce2-ma-perimetre':{
 deep:[{t:'Faire le tour de la figure',h:`<p>Imagine une fourmi qui marche sur le bord d’une figure et revient à son point de départ : la distance qu’elle a parcourue est le <b>périmètre</b>.</p>
<ol><li>Je marque un point de départ sur un coin.</li><li>Je suis le contour et j’écris la longueur de <b>chaque</b> côté, sans en sauter.</li><li>J’additionne et je n’oublie pas l’unité.</li></ol>
<p>Pour un rectangle, il y a 2 longueurs et 2 largeurs : 6 cm et 4 cm donnent 6 + 4 = 10, et 10 × 2 = 20 cm.</p>
<p>Attention, tous les côtés doivent être dans la <b>même unité</b> : pour un rectangle de 1 m sur 40 cm, je convertis d’abord, 100 + 40 + 100 + 40 = 280 cm.</p>`},
 {t:'Le contour, pas l’intérieur',h:`<p>Le périmètre mesure le <b>bord</b>, pas ce qu’il y a dedans : pour un jardin, c’est la longueur de la clôture, pas la pelouse.</p>
<p>Deux figures très différentes peuvent avoir le même périmètre : un rectangle de 6 cm sur 2 cm (6 + 2 + 6 + 2 = 16 cm) et un carré de 4 cm de côté (4 × 4 = 16 cm).</p>
<p>On peut aussi faire le chemin inverse : si un carré a un périmètre de 24 cm, ses 4 côtés égaux mesurent chacun 24 ÷ 4 = <b>6 cm</b>.</p>`}],
 try:{q:'Un jardin rectangulaire mesure 12 m de long et 7 m de large. Quelle longueur de grillage faut-il pour en faire le tour ?',a:'12 + 7 + 12 + 7 = 38 m de grillage.'},
 adult:'Avec une ficelle, faites le tour d’un livre, d’une assiette ou d’une table, puis mesurez la ficelle tendue : c’est le périmètre. Comparez ensuite avec le calcul (somme des côtés).',
 culture:{t:'Mesurer le tour de la Terre',h:`<p>Il y a plus de 2 200 ans, le savant grec <b>Ératosthène</b> a estimé le tour de la Terre en comparant les ombres du Soleil dans deux villes d’Égypte, Syène et Alexandrie.</p><p>Son estimation était assez proche de la vraie valeur, qui est d’environ <b>40 000 kilomètres</b>. Il n’avait ni avion ni satellite : seulement des ombres, des distances et des calculs !</p>`}},
'ce2-ma-masses-contenances':{
 deep:[{t:'Masse ou contenance ?',h:`<p>Ce sont deux questions différentes :</p>
<ul><li>la <b>masse</b> dit si un objet est lourd ; on la mesure avec une balance, en grammes (g), kilogrammes (kg) ou tonnes (t) ;</li><li>la <b>contenance</b> dit combien de liquide un récipient peut contenir ; on la mesure avec un verre doseur, en litres (L), décilitres (dL) ou centilitres (cL).</li></ul>
<p>Pour convertir, j’utilise les égalités : 2 kg 300 g = 2 000 g + 300 g = <b>2 300 g</b> ; 1 L = 10 dL = 100 cL, et 1 dL = 10 cL, donc 3 dL = <b>30 cL</b>.</p>`},
 {t:'Des repères pour estimer',h:`<ul><li><b>1 g</b> : à peu près la masse d’un trombone.</li><li><b>100 g</b> : une tablette de chocolat.</li><li><b>1 kg</b> : à peu près la masse d’une bouteille de 1 L remplie d’eau.</li><li><b>1 t</b> : à peu près une petite voiture.</li></ul>
<p>Un objet gros n’est pas forcément lourd : un gros ballon de baudruche est plus léger qu’une petite bille de fer. Il faut peser pour savoir.</p>
<p>Pour comparer deux masses, je les écris dans la même unité : 1 kg 50 g = 1 050 g, c’est moins que 1 500 g.</p>`}],
 try:{q:'Maman achète 2 kg de pommes et 750 g de raisin. Quelle masse de fruits rapporte-t-elle ?',a:'2 kg = 2 000 g. 2 000 + 750 = 2 750 g, soit 2 kg 750 g.'},
 adult:'En cuisine, faites peser la farine sur la balance et mesurer le lait dans un verre doseur. Lisez ensemble les étiquettes des produits : 500 g, 1 kg, 33 cL, 1,5 L…',
 culture:{t:'Le poids lourd des océans',h:`<p>La <b>baleine bleue</b> est souvent présentée comme le plus gros animal ayant jamais vécu sur Terre. Elle peut dépasser <b>100 tonnes</b>, c’est-à-dire plus de 100 000 kilogrammes.</p><p>Comme un éléphant pèse environ 5 tonnes, une seule baleine bleue peut peser autant qu’une vingtaine d’éléphants !</p>`}},
'ce2-ma-monnaie':{
 deep:[{t:'La virgule sépare les euros des centimes',h:`<p>Dans un prix, ce qui est <b>avant la virgule</b> compte les euros, ce qui est <b>après</b> compte les centimes, toujours avec deux chiffres :</p>
<ul><li>4,75 € = 4 euros et 75 centimes ;</li><li>0,05 € = 5 centimes ;</li><li>2,5 € = 2,50 € = 2 euros et 50 centimes.</li></ul>
<p>Comme 1 € = 100 centimes, je peux tout écrire en centimes : 4,75 € = 475 centimes.</p>
<p>Pour comparer deux prix, je compare d’abord les euros, puis les centimes : 3,09 € &lt; 3,90 €, car 9 centimes &lt; 90 centimes.</p>`},
 {t:'Rendre la monnaie comme un marchand',h:`<p>Le marchand ne pose pas de soustraction : il <b>complète</b> jusqu’à la somme donnée, par étapes.</p>
<p>Un livre coûte 13,75 € et je paie avec un billet de 20 € :</p>
<ol><li>de 13,75 € à 14 €, il manque 0,25 € ;</li><li>de 14 € à 20 €, il manque 6 € ;</li><li>on me rend 6 € + 0,25 € = <b>6,25 €</b>.</li></ol>
<p>Je vérifie : 13,75 € + 6,25 € = 20 €.</p>`}],
 try:{q:'Tu achètes un livre à 7,35 € et tu paies avec un billet de 10 €. Combien doit-on te rendre ?',a:'De 7,35 € à 8 € : 0,65 €. De 8 € à 10 € : 2 €. On te rend 2,65 €.'},
 adult:'Jouez à la marchande avec de vraies pièces ou des pièces imprimées. À la boulangerie, laissez l’enfant préparer la somme exacte, puis vérifier la monnaie rendue.',
 culture:{t:'Les premières pièces de monnaie',h:`<p>Avant les pièces, on échangeait directement des objets : c’est le <b>troc</b>. Les plus anciennes pièces connues ont été fabriquées il y a environ <b>2 600 ans</b> en <b>Lydie</b>, un royaume situé dans l’actuelle Turquie.</p><p>Elles étaient faites d’électrum, un mélange naturel d’or et d’argent.</p>`}},
'ce2-ma-heure':{
 deep:[{t:'Lire l’heure à la minute près',h:`<p>Sur une horloge à aiguilles, la <b>petite aiguille</b> montre les heures et la <b>grande aiguille</b> les minutes.</p>
<ul><li>Pour la grande aiguille, chaque nombre du cadran vaut <b>5 minutes</b> : 1 → 5 min, 3 → 15 min, 6 → 30 min, 9 → 45 min.</li><li>Les petits traits entre deux nombres comptent chacun <b>1 minute</b>. Si la grande aiguille est 2 traits après le 7, cela fait 35 + 2 = 37 minutes.</li></ul>
<p>L’après-midi, on ajoute 12 aux heures : 3 heures de l’après-midi, c’est <b>15 h</b>.</p>`},
 {t:'Calculer une durée sans se tromper',h:`<p>Je dessine une <b>ligne du temps</b> et je fais des bonds jusqu’aux heures pleines.</p>
<p>De 8 h 50 à 10 h 15 :</p>
<ol><li>de 8 h 50 à 9 h : 10 min ;</li><li>de 9 h à 10 h : 1 h ;</li><li>de 10 h à 10 h 15 : 15 min.</li></ol>
<p>Total : 1 h + 10 min + 15 min = <b>1 h 25 min</b>.</p>
<p>Quand les minutes dépassent 60, je les transforme : 45 min + 30 min = 75 min = <b>1 h 15 min</b>. Et dans l’autre sens : 2 h = 120 min.</p>`}],
 try:{q:'Le goûter commence à 16 h 35 et finit à 17 h 10. Combien de temps dure-t-il ?',a:'De 16 h 35 à 17 h : 25 min. De 17 h à 17 h 10 : 10 min. Total : 35 minutes.'},
 adult:'Notez ensemble les heures de début et de fin d’activités réelles (dessin animé, trajet, bain) et faites calculer leur durée. Une horloge à aiguilles dans la maison aide beaucoup.',
 culture:{t:'Les horloges atomiques',h:`<p>Depuis <b>1967</b>, la seconde est définie grâce aux atomes de <b>césium</b>. Les horloges atomiques sont si précises que les meilleures ne prendraient qu’environ une seconde d’avance ou de retard en plusieurs millions d’années.</p><p>Les satellites du GPS emportent des horloges atomiques : c’est grâce à leur précision qu’un téléphone peut savoir où il se trouve.</p>`}},
'ce2-ma-geometrie':{
 deep:[{t:'Reconnaître un quadrilatère avec ses outils',h:`<p>On ne reconnaît pas une figure « à l’œil » : on vérifie avec des outils.</p>
<ul><li>Avec l’<b>équerre</b>, je cherche les angles droits.</li><li>Avec la <b>règle</b>, je mesure les côtés.</li></ul>
<table class="ptable"><tr><td>Rectangle</td><td>4 angles droits</td></tr><tr><td>Losange</td><td>4 côtés de même longueur</td></tr><tr><td>Carré</td><td>4 angles droits et 4 côtés de même longueur</td></tr></table>
<p>Le carré a donc les propriétés du rectangle <b>et</b> celles du losange. Un triangle rectangle, lui, a un seul angle droit.</p>`},
 {t:'Tracer un cercle au compas',h:`<ol><li>Je marque le <b>centre</b> d’un point.</li><li>J’écarte le compas sur la règle de la longueur du <b>rayon</b> (de 0 à 3 cm pour un rayon de 3 cm).</li><li>Je plante la pointe sur le centre et je tourne en tenant le compas par le haut, sans appuyer sur la mine.</li></ol>
<p>Tous les points du cercle sont à la <b>même distance</b> du centre : cette distance, c’est le rayon.</p>
<p>Le <b>diamètre</b> traverse le cercle en passant par le centre : il est fait de deux rayons, donc diamètre = 2 × rayon.</p>`}],
 try:{q:'Un cercle a un rayon de 4 cm. Quel est son diamètre ? De combien dois-tu écarter le compas pour le tracer ?',a:'Diamètre = 2 × 4 = 8 cm. On écarte le compas de 4 cm : c’est le rayon.'},
 adult:'Cherchez des angles droits dans la maison avec une équerre (ou le coin d’une feuille) : livre, porte, carrelage. Pour le compas, tracez ensemble des rosaces : c’est un excellent entraînement.',
 culture:{t:'Euclide, la règle et le compas',h:`<p>Il y a environ <b>2 300 ans</b>, le savant grec <b>Euclide</b> a écrit les <i>Éléments</i>, un livre de géométrie où les figures sont construites avec seulement une règle et un compas.</p><p>Ce livre a servi à enseigner la géométrie pendant plus de 2 000 ans, ce qui en fait l’un des livres de mathématiques les plus célèbres de l’histoire.</p>`}},
'ce2-ma-symetrie':{
 deep:[{t:'Le test du pliage',h:`<p>Pour savoir si une ligne est un <b>axe de symétrie</b>, j’imagine (ou je fais vraiment) le pliage le long de cette ligne :</p>
<ul><li>si les deux moitiés se superposent <b>exactement</b>, c’est un axe de symétrie ;</li><li>s’il reste un morceau qui dépasse, ce n’en est pas un.</li></ul>
<p>Avec du papier calque, on peut décalquer la moitié d’une figure, retourner le calque le long de l’axe et vérifier que le dessin tombe pile sur l’autre moitié.</p>
<p>Une figure symétrique est comme son reflet dans un miroir posé sur l’axe : la gauche et la droite sont inversées.</p>`},
 {t:'Compléter une figure sur un quadrillage',h:`<p>Sur un quadrillage, je compte les carreaux :</p>
<ol><li>je choisis un point de la figure ;</li><li>je compte à combien de carreaux il est de l’axe : par exemple 3 carreaux à gauche d’un axe vertical ;</li><li>je place son symétrique à <b>3 carreaux à droite</b>, sur la même ligne du quadrillage ;</li><li>je recommence pour chaque coin, puis je relie les points dans le même ordre.</li></ol>
<p>Si l’axe est horizontal, je compte vers le haut et vers le bas. Un point situé <b>sur</b> l’axe ne bouge pas.</p>`}],
 try:{q:'Un point est à 5 carreaux à gauche d’un axe vertical. Où se trouve son symétrique ?',a:'À 5 carreaux à droite de l’axe, sur la même ligne du quadrillage.'},
 adult:'Faites des taches de peinture sur une feuille, pliez-la puis dépliez-la : on obtient un papillon symétrique. Cherchez aussi des axes de symétrie dans les logos, les feuilles d’arbres ou les façades.',
 culture:{t:'La symétrie des flocons de neige',h:`<p>Les flocons de neige sont des cristaux de glace qui poussent avec <b>six branches</b>. Un flocon bien formé possède souvent <b>six axes de symétrie</b>.</p><p>C’est la façon dont les minuscules particules d’eau s’empilent en formant de la glace qui donne cette forme à six côtés, qu’on appelle un hexagone.</p>`}},
'ce2-ma-solides':{
 deep:[{t:'Faces, arêtes, sommets',h:`<ul><li>Une <b>face</b> est une surface plate du solide.</li><li>Une <b>arête</b> est un segment où deux faces se rejoignent.</li><li>Un <b>sommet</b> est un point où plusieurs arêtes se rejoignent.</li></ul>
<p>Pour compter sans se tromper sur un cube, je m’organise : 4 arêtes en haut, 4 en bas et 4 debout, soit <b>12 arêtes</b> ; 4 sommets en haut et 4 en bas, soit <b>8 sommets</b>.</p>
<p>Pour une pyramide à base carrée : 1 base + 4 triangles = 5 faces ; 4 arêtes autour de la base + 4 qui montent vers la pointe = 8 arêtes ; 4 sommets en bas + 1 en haut = 5 sommets.</p>`},
 {t:'Reconnaître un patron de cube',h:`<p>Un patron de cube contient toujours <b>6 carrés</b>, mais six carrés ne font pas toujours un patron !</p>
<ul><li>La « croix » (une colonne de 4 carrés, avec un carré à gauche et un à droite du deuxième) se replie en cube.</li><li>Un rectangle de 2 rangées de 3 carrés ne marche pas : en pliant, des carrés se superposent et il manque des faces.</li><li>Cinq carrés alignés ne marchent jamais, même avec le sixième accroché ailleurs : un patron de cube n’a jamais plus de 4 carrés en ligne.</li></ul>
<p>Pour vérifier, j’imagine qu’un carré est le fond de la boîte et je replie les autres un par un. Il existe en tout <b>11 patrons</b> différents du cube.</p>`}],
 try:{q:'Combien d’arêtes et de sommets a un pavé droit, comme une boîte à chaussures ?',a:'12 arêtes (4 en haut, 4 en bas, 4 debout) et 8 sommets (4 en haut, 4 en bas).'},
 adult:'Découpez une boîte en carton (céréales, dentifrice) le long de certaines arêtes pour l’ouvrir à plat : vous obtenez son patron. Faites ensuite compter faces, arêtes et sommets sur une boîte entière.',
 culture:{t:'Les solides de Platon',h:`<p>Il existe exactement <b>cinq solides</b> dont toutes les faces sont des polygones réguliers identiques et dont tous les sommets se ressemblent. On les appelle les <b>solides de Platon</b>, du nom d’un philosophe grec de l’Antiquité. Le cube en fait partie.</p><p>On les retrouve dans certains jeux : il existe des dés à 4, 6, 8, 12 et 20 faces, un pour chacun de ces solides.</p>`}},
'ce2-ma-donnees':{
 deep:[{t:'Lire un tableau à double entrée',h:`<p>Dans un tableau à double entrée, chaque case est au croisement d’une <b>ligne</b> et d’une <b>colonne</b>. Je lis toujours les titres avant les nombres.</p>
<p>Avec le tableau du cours (filles et garçons de CE1 et de CE2) :</p>
<ul><li>total d’une <b>ligne</b> : élèves de CE1 = 12 + 10 = 22 ;</li><li>total d’une <b>colonne</b> : filles = 12 + 11 = 23 ;</li><li>total de <b>toutes les cases</b> : 12 + 10 + 11 + 14 = 47 élèves.</li></ul>
<p>Je vérifie : 23 filles + 24 garçons = 47. Les deux façons de compter donnent le même total.</p>`},
 {t:'Lire un diagramme en barres',h:`<p>Dans un diagramme en barres, la <b>hauteur</b> de chaque barre montre une quantité.</p>
<ol><li>Je lis le titre et ce que représente chaque barre.</li><li>Je regarde la graduation de l’axe : elle peut aller de 1 en 1, de 2 en 2 ou de 5 en 5.</li><li>Je suis le haut de la barre jusqu’à l’axe pour lire sa valeur.</li></ol>
<p>D’un coup d’œil, la barre la plus haute montre la plus grande quantité. Pour savoir « combien de plus », je calcule l’écart : 8 pommes et 5 bananes, c’est 3 pommes de plus. Le tableau donne des valeurs exactes ; le diagramme permet de comparer vite.</p>`}],
 try:{q:'Dans le tableau du cours, combien y a-t-il de garçons en tout (CE1 et CE2) ? Y a-t-il plus de filles ou de garçons ?',a:'Garçons : 10 + 14 = 24. Filles : 12 + 11 = 23. Il y a un garçon de plus que de filles.'},
 adult:'Relevez pendant une semaine la météo ou le temps passé à lire, notez-le dans un tableau, puis tracez ensemble un diagramme en barres sur du papier quadrillé.',
 culture:{t:'L’infirmière qui dessinait des diagrammes',h:`<p>En <b>1858</b>, l’infirmière anglaise <b>Florence Nightingale</b> a utilisé des diagrammes pour montrer que, pendant la guerre de Crimée, bien plus de soldats mouraient de maladies qu’on aurait pu éviter que de leurs blessures.</p><p>Ses graphiques ont aidé à convaincre qu’il fallait des hôpitaux plus propres. Un bon diagramme peut changer les choses !</p>`}}
},{lot:'maths-ce2',grade:'CE2',subject:'maths',refs:['Mathématiques cycle 2 — programmes 2024 (BO n°41 du 31/10/2024)']});
})(typeof window!=='undefined'?window:globalThis);
