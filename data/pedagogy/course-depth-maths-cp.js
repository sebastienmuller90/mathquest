/* Finot Académie — cours approfondis : mathématiques CP (lot 1, 21/10/2026).
   Demande de l'utilisateur (20/10/2026) : des cours beaucoup plus détaillés, pas à pas, pour les élèves en difficulté
   d'abord, avec de la culture pour les bons élèves. Ce fichier AJOUTE du contenu aux cours existants (rien n'est retiré) :
   - deep    : explications détaillées « Je comprends pas à pas » (affichées après les parties du cours) ;
   - try     : un petit défi « À toi » dont la réponse est cachée ;
   - adult   : un conseil pour l'adulte qui accompagne (activité concrète à la maison) ;
   - culture : un encadré « Pour aller plus loin » (faits vérifiables uniquement).
   Programme de référence : mathématiques cycle 2, programmes 2024 (BO n°41 du 31/10/2024), applicables depuis 2025-2026. */
(function(root){
'use strict';
const D=root.MQCourseDepth=root.MQCourseDepth||{version:'1',chapters:{},add(map,meta){for(const id of Object.keys(map))this.chapters[id]=Object.assign({},meta,map[id]);}};
D.add({
'cp-ma-nombres10':{
 deep:[{t:'Compter sans se tromper',h:`<p>Compter, ce n’est pas seulement réciter « un, deux, trois… » comme une chanson. Pour savoir <b>combien</b> il y a d’objets, il faut faire correspondre <b>un mot-nombre à un seul objet</b>.</p>
<p>Voici comment faire, pas à pas :</p>
<ol><li>Je pose mon doigt sur le premier objet et je dis « un ».</li><li>Je pousse cet objet sur le côté (ou je le barre) pour savoir qu’il est déjà compté.</li><li>Je touche l’objet suivant et je dis le nombre suivant : « deux ».</li><li>Je continue jusqu’au dernier objet.</li><li>Le <b>dernier nombre</b> que j’ai dit est la réponse : c’est le nombre d’objets.</li></ol>
<p>Si on compte les mêmes objets dans un autre ordre, on trouve toujours <b>le même nombre</b>. Si on trouve deux nombres différents, c’est qu’on a oublié un objet ou qu’on en a compté un deux fois : on recommence doucement.</p>`},
 {t:'Un nombre peut se cacher de plusieurs façons',h:`<p>Le nombre <b>5</b>, c’est les doigts d’une main. Mais 5, c’est aussi :</p>
<ul><li>4 et encore 1 (4 + 1) ;</li><li>3 et encore 2 (3 + 2) ;</li><li>2 et encore 3 (2 + 3).</li></ul>
<p>On dit qu’on <b>décompose</b> le nombre. Savoir que 7, c’est 5 et 2, permet de voir 7 très vite sur ses doigts : une main entière et deux doigts.</p>
<p>Le nombre <b>0</b> veut dire « rien du tout » : dans une boîte vide, il y a 0 bonbon.</p>`}],
 try:{q:'Combien de doigts lèves-tu pour montrer 8 avec tes deux mains ? Comment peux-tu le faire ?',a:'Une main entière (5) et 3 doigts de l’autre main : 5 + 3 = 8. On peut aussi faire 4 et 4.'},
 adult:'Comptez ensemble des objets du quotidien (cuillères, chaussettes, jouets) en les déplaçant un par un. Demandez ensuite : « Et si on recompte en commençant par l’autre bout, on trouvera combien ? »',
 culture:{t:'Pourquoi compte-t-on par dix ?',h:`<p>Nous avons <b>dix doigts</b> : c’est sans doute pour cela que, depuis très longtemps, les humains comptent par paquets de dix.</p><p>Le <b>zéro</b> est arrivé bien après les autres chiffres. Ce sont des savants de l’<b>Inde</b> qui l’ont utilisé comme un vrai nombre, il y a plus de 1 300 ans. Nos chiffres (0, 1, 2, 3…) viennent d’Inde et sont arrivés en Europe grâce aux savants arabes : c’est pour cela qu’on les appelle souvent les « chiffres arabes ».</p>`}},
'cp-ma-nombres20':{
 deep:[{t:'Une dizaine et des unités',h:`<p>Quand on a <b>10</b> objets, on peut les ranger dans une boîte : c’est <b>une dizaine</b>. Les objets qui restent dehors s’appellent les <b>unités</b>.</p>
<p>Prenons 13 jetons. Je remplis une boîte de 10, et il en reste 3 dehors. 13, c’est donc <b>une dizaine et 3 unités</b> : 10 + 3 = 13.</p>
<p>C’est la même chose pour tous les nombres de 11 à 19 : il y a toujours <b>une</b> dizaine, et le chiffre de droite dit combien d’unités il reste.</p>
<table class="ptable"><tr><th>Nombre</th><th>Dizaine</th><th>Unités</th></tr><tr><td>11</td><td>1</td><td>1</td></tr><tr><td>15</td><td>1</td><td>5</td></tr><tr><td>18</td><td>1</td><td>8</td></tr><tr><td>20</td><td>2</td><td>0</td></tr></table>`},
 {t:'Les noms qui ne disent pas « dix »',h:`<p>Attention, la langue française nous joue des tours : <b>onze, douze, treize, quatorze, quinze, seize</b> ne contiennent pas le mot « dix ». Il faut les apprendre par cœur.</p>
<p>À partir de 17, le nom redevient facile à comprendre : <b>dix-sept</b>, c’est « dix et sept », <b>dix-huit</b>, « dix et huit », <b>dix-neuf</b>, « dix et neuf ».</p>
<p>Une astuce : dis la comptine en tapant dans tes mains à chaque nombre, et en tapant plus fort sur dix et sur vingt.</p>`}],
 try:{q:'Dans 16, combien y a-t-il de dizaines et d’unités ?',a:'1 dizaine et 6 unités : 10 + 6 = 16 (seize).'},
 adult:'Avec des pâtes ou des boutons, faites des paquets de 10 dans un gobelet. Montrez 14 : un gobelet plein et 4 pâtes à côté. Inversez ensuite les rôles : l’enfant fabrique le nombre, vous le dites.',
 culture:{t:'Onze, douze… des mots très anciens',h:`<p>Les mots onze, douze, treize, quatorze, quinze et seize viennent du <b>latin</b>, la langue des Romains : par exemple, « seize » vient de <i>sedecim</i>, qui voulait dire « six et dix ». Avec le temps, le mot s’est raccourci et on n’entend plus le « dix ».</p><p>En anglais aussi, <i>eleven</i> (11) et <i>twelve</i> (12) ont des noms à part !</p>`}},
'cp-ma-dizaines':{
 deep:[{t:'Pourquoi faire des paquets de dix ?',h:`<p>Imagine que tu dois compter 47 billes une par une. C’est long, et on se trompe facilement ! Si tu ranges les billes par <b>paquets de 10</b>, tu n’as plus qu’à compter les paquets : 10, 20, 30, 40… puis les billes qui restent : 41, 42… 47.</p>
<p>Dans un nombre à deux chiffres, chaque chiffre a un rôle :</p>
<ul><li>le chiffre de <b>gauche</b> dit combien de paquets de 10 : ce sont les <b>dizaines</b> ;</li><li>le chiffre de <b>droite</b> dit combien d’objets seuls : ce sont les <b>unités</b>.</li></ul>
<p>Dans <b>47</b>, il y a 4 dizaines (4 paquets de 10, donc 40) et 7 unités : 47 = 40 + 7.</p>`},
 {t:'Quand il y a trop d’unités',h:`<p>Les unités ne peuvent pas dépasser 9. Si on a <b>10 unités ou plus</b>, on fabrique un nouveau paquet de 10.</p>
<p>Exemple : 2 dizaines et 13 unités. Avec 13 unités, je fais un paquet de 10 et il en reste 3. J’ai donc maintenant <b>3 dizaines et 3 unités</b>, c’est-à-dire 33.</p>
<p>Le <b>0</b> est très important : dans <b>40</b>, il dit « 4 dizaines et aucune unité ». Sans le 0, on lirait 4 !</p>`}],
 try:{q:'J’ai 3 paquets de 10 crayons et 12 crayons seuls. Combien ai-je de crayons ?',a:'Avec 12 crayons seuls, je fais encore un paquet de 10 et il en reste 2 : 4 dizaines et 2 unités, donc 42 crayons.'},
 adult:'Utilisez de la monnaie : des pièces de 10 centimes (les dizaines) et de 1 centime (les unités). Demandez de fabriquer 35 centimes, puis 53 centimes, et de dire ce qui change.',
 culture:{t:'Les nombres des Romains',h:`<p>Les Romains n’écrivaient pas les nombres avec nos chiffres, mais avec des <b>lettres</b> : I vaut 1, V vaut 5 et <b>X vaut 10</b>. Ainsi, XX voulait dire 20 et XII voulait dire 12.</p><p>On voit encore ces chiffres romains sur certaines horloges, dans les livres d’histoire (Louis XIV) ou pour numéroter les siècles.</p>`}},
'cp-ma-nombres100':{
 deep:[{t:'Lire un nombre en deux morceaux',h:`<p>Pour lire un nombre à deux chiffres, je le coupe en deux morceaux : d’abord <b>les dizaines</b>, ensuite <b>les unités</b>.</p>
<p>Exemple : <b>63</b>. Le 6 des dizaines se dit « soixante », le 3 des unités se dit « trois ». Je lis : <b>soixante-trois</b>.</p>
<p>Pour 21, 31, 41, 51 et 61, on ajoute « et » : <b>vingt-et-un</b>, trente-et-un, quarante-et-un, cinquante-et-un, soixante-et-un. (On peut aussi l’écrire « vingt et un », sans traits d’union : les deux sont acceptés.)</p>`},
 {t:'Les nombres de 70 à 99 : les plus difficiles',h:`<p>En France, il n’y a pas de mot spécial pour 70, 80 et 90. On les fabrique avec d’autres nombres :</p>
<ul><li><b>70</b> se dit soixante-dix : 60 + 10. Donc 71 = soixante-et-onze (60 + 11), 75 = soixante-quinze (60 + 15), 79 = soixante-dix-neuf (60 + 19).</li><li><b>80</b> se dit quatre-vingts : 4 fois 20. Donc 83 = quatre-vingt-trois.</li><li><b>90</b> se dit quatre-vingt-dix : 80 + 10. Donc 92 = quatre-vingt-douze (80 + 12), 97 = quatre-vingt-dix-sept (80 + 17).</li></ul>
<p>Astuce : pour écrire en chiffres « soixante-seize », je calcule 60 + 16 = <b>76</b>. Pour « quatre-vingt-quatorze », je calcule 80 + 14 = <b>94</b>.</p>`}],
 try:{q:'Écris en chiffres : quatre-vingt-dix-huit.',a:'Quatre-vingt-dix-huit = 80 + 18 = 98.'},
 adult:'Jouez au « nombre mystère » avec un calendrier ou une page de livre : vous dites un nombre à voix haute, l’enfant le montre ou l’écrit. Insistez sur les nombres de 70 à 99.',
 culture:{t:'Septante, huitante, nonante',h:`<p>En <b>Belgique</b> et en <b>Suisse</b>, on dit <b>septante</b> pour 70 et <b>nonante</b> pour 90. Dans certaines régions de Suisse, on dit même <b>huitante</b> pour 80 !</p><p>Notre « quatre-vingts » est un souvenir d’une très vieille façon de compter par paquets de <b>vingt</b>. À Paris, il existe un hôpital fondé il y a plus de 750 ans qui s’appelle les <b>Quinze-Vingts</b> : il pouvait accueillir 15 fois 20 personnes, c’est-à-dire 300.</p>`}},
'cp-ma-comparer':{
 deep:[{t:'Comparer pas à pas',h:`<p>Comparer deux nombres, c’est dire lequel est <b>le plus grand</b> et lequel est <b>le plus petit</b>.</p>
<ol><li>Je regarde d’abord <b>le nombre de chiffres</b> : un nombre à deux chiffres (comme 12) est toujours plus grand qu’un nombre à un chiffre (comme 9).</li><li>Si les deux nombres ont deux chiffres, je compare les <b>dizaines</b> : 52 et 38 → 5 dizaines, c’est plus que 3 dizaines, donc 52 est plus grand.</li><li>Si les dizaines sont pareilles, je compare les <b>unités</b> : 46 et 43 → même dizaine, 6 unités, c’est plus que 3 : 46 est plus grand.</li></ol>
<p>Les unités ne servent que si les dizaines sont égales : 29 est plus petit que 31, même si 9 est plus grand que 1 !</p>`},
 {t:'Bien écrire les signes &lt; et &gt;',h:`<p>Le signe s’ouvre toujours du côté du <b>plus grand</b> nombre et sa pointe montre le <b>plus petit</b>.</p>
<ul><li>12 <b>&lt;</b> 25 se lit « 12 est plus petit que 25 ».</li><li>40 <b>&gt;</b> 38 se lit « 40 est plus grand que 38 ».</li><li>15 <b>=</b> 15 se lit « 15 est égal à 15 ».</li></ul>
<p><b>Ranger dans l’ordre croissant</b>, c’est aller du plus petit au plus grand, comme quand on monte un escalier. <b>L’ordre décroissant</b>, c’est l’inverse : du plus grand au plus petit.</p>`}],
 try:{q:'Range dans l’ordre croissant : 34, 9, 43, 30.',a:'9 < 30 < 34 < 43. (9 n’a qu’un chiffre ; puis 30 et 34 ont 3 dizaines ; 43 en a 4.)'},
 adult:'Tirez deux cartes à jouer (de 1 à 10) pour fabriquer deux nombres à deux chiffres. L’enfant dit lequel est le plus grand et explique pourquoi en parlant de dizaines.',
 culture:{t:'Qui a inventé ces signes ?',h:`<p>Le signe <b>=</b> a été inventé en 1557 par un savant gallois, <b>Robert Recorde</b>. Il a choisi deux traits pareils parce que, disait-il, rien ne peut être plus égal que deux traits parallèles.</p><p>Les signes <b>&lt;</b> et <b>&gt;</b> ont été publiés en 1631, dans un livre de l’Anglais <b>Thomas Harriot</b>.</p>`}},
'cp-ma-droite':{
 deep:[{t:'Lire une droite graduée',h:`<p>Une droite graduée ressemble à une règle : les nombres sont rangés dans l’ordre, de gauche à droite, et les petits traits sont <b>tous à la même distance</b>.</p>
<p>Pour trouver le nombre qui correspond à un trait :</p>
<ol><li>je repère un nombre écrit juste avant (par exemple 30) ;</li><li>je compte les <b>pas</b> (les espaces entre deux traits) jusqu’au trait cherché ;</li><li>j’ajoute ce nombre de pas : si je fais 4 pas après 30, j’arrive à <b>34</b>.</li></ol>
<p>Attention : on compte les pas, pas les traits. Le trait de départ ne compte pas !</p>`},
 {t:'Les suites qui avancent toujours pareil',h:`<p>Dans une suite de nombres, on ajoute <b>toujours la même quantité</b> pour passer d’un nombre au suivant.</p>
<ul><li>De 2 en 2 : 2, 4, 6, 8, 10… (ce sont les nombres pairs).</li><li>De 5 en 5 : 5, 10, 15, 20, 25… (on termine toujours par 5 ou 0).</li><li>De 10 en 10 : 13, 23, 33, 43… (seul le chiffre des dizaines change).</li></ul>
<p>Pour trouver la règle, je calcule l’écart entre deux nombres qui se suivent, puis je vérifie avec les suivants.</p>`}],
 try:{q:'Complète la suite : 15, 20, 25, …, …',a:'On ajoute 5 à chaque fois : 30, puis 35.'},
 adult:'Dessinez une marelle numérotée de 0 à 20 à la craie ou avec du ruban adhésif. L’enfant saute de 2 en 2, puis de 5 en 5, en disant les nombres à voix haute.',
 culture:{t:'Des droites graduées partout',h:`<p>Une règle, un mètre de couturière ou un <b>thermomètre</b> sont des droites graduées. Sur un thermomètre, quand il fait très froid, la température descend même <b>en dessous de 0</b> : tu apprendras plus tard ces nombres-là.</p>`}},
'cp-ma-ordinaux':{
 deep:[{t:'Combien ou quelle place ?',h:`<p>Il y a deux sortes de questions avec les nombres :</p>
<ul><li><b>« Combien ? »</b> : on répond avec un nombre comme 3 (« il y a 3 enfants »).</li><li><b>« À quelle place ? »</b> : on répond avec un nombre ordinal comme <b>troisième</b> (« Lou est la troisième »).</li></ul>
<p>Pour fabriquer un ordinal, on ajoute <b>-ième</b> au nombre : quatre → quatrième, dix → dixième. On écrit en abrégé <b>4e</b> ou <b>10e</b>. Une seule exception : pour 1, on dit <b>premier</b> (ou première), qu’on écrit <b>1er</b> (ou 1re).</p>`},
 {t:'D’où part la file ?',h:`<p>Pour dire une place, il faut savoir <b>où commence la file</b> : par l’avant, par la gauche, par le haut… Dans une course, le premier est celui qui arrive avant tous les autres.</p>
<p>Si je suis <b>5e</b> dans une file, il y a <b>4</b> personnes devant moi : le 1er, le 2e, le 3e et le 4e. On peut le vérifier en dessinant la file avec des ronds.</p>`}],
 try:{q:'Dans une file de 8 enfants, Tom est le 6e. Combien d’enfants sont devant lui ? Et derrière ?',a:'Devant lui : 5 enfants (du 1er au 5e). Derrière lui : 2 enfants (le 7e et le 8e).'},
 adult:'Alignez des peluches ou des jouets. Demandez : « Quel est le troisième en partant de la gauche ? Et en partant de la droite ? » pour montrer que la place dépend du point de départ.',
 culture:{t:'Or, argent, bronze',h:`<p>Aux <b>Jeux olympiques</b>, le premier reçoit une médaille d’<b>or</b>, le deuxième une médaille d’<b>argent</b> et le troisième une médaille de <b>bronze</b>.</p><p>On peut aussi dire <b>second</b> à la place de deuxième : « arriver en seconde position ».</p>`}},
'cp-ma-tables-add':{
 deep:[{t:'Pourquoi apprendre les tables ?',h:`<p>Quand on connaît par cœur que <b>4 + 3 = 7</b>, on n’a plus besoin de compter sur ses doigts : le calcul devient rapide, et on peut garder ses forces pour comprendre les problèmes.</p>
<p>Bonne nouvelle : il y a moins de résultats à apprendre qu’on le croit, car <b>l’ordre ne compte pas</b> dans une addition. Si je sais 6 + 2 = 8, je sais aussi 2 + 6 = 8.</p>
<p>Pour ajouter un petit nombre, je pars toujours du <b>plus grand</b> : pour 2 + 7, je pars de 7 et j’avance de 2 : 8, 9. Résultat : 9.</p>`},
 {t:'Passer par 10, étape par étape',h:`<p>Pour <b>8 + 5</b> :</p>
<ol><li>Je me demande ce qu’il manque à 8 pour faire 10 : il manque <b>2</b>.</li><li>Je coupe 5 en deux morceaux : <b>2 et 3</b>.</li><li>8 + 2 = <b>10</b>, puis 10 + 3 = <b>13</b>.</li></ol>
<p>Cette astuce marche dès qu’on dépasse 10 : 9 + 4 = 9 + 1 + 3 = 13 ; 7 + 6 = 7 + 3 + 3 = 13.</p>
<p>Pour les <b>égalités à trou</b> comme 6 + … = 10, je pars de 6 et je compte jusqu’à 10 : 7, 8, 9, 10 → j’ai avancé de <b>4</b>.</p>`}],
 try:{q:'Calcule 9 + 6 en passant par 10.',a:'9 + 1 = 10, il reste 5 à ajouter (6 = 1 + 5) : 10 + 5 = 15.'},
 adult:'Jouez aux dés : lancez deux dés et additionnez. Au début, l’enfant peut compter les points ; petit à petit, encouragez-le à dire le résultat sans compter.',
 culture:{t:'Le petit Gauss et les nombres de 1 à 100',h:`<p>On raconte qu’un maître d’école allemand demanda un jour à ses élèves d’additionner tous les nombres de 1 à 100. Le petit <b>Carl Friedrich Gauss</b>, qui deviendra un très grand mathématicien, trouva la réponse en quelques instants.</p><p>Son astuce : 1 + 100 = 101, 2 + 99 = 101, 3 + 98 = 101… Il y a 50 paires qui font 101, donc le total est <b>5 050</b>.</p>`}},
'cp-ma-doubles':{
 deep:[{t:'Le double, c’est deux fois pareil',h:`<p>Le <b>double</b> d’un nombre, c’est ce nombre <b>ajouté à lui-même</b>. On peut le voir avec les deux mains : 3 doigts sur une main et 3 doigts sur l’autre, cela fait 6. Le double de 3 est <b>6</b>.</p>
<p>Les doubles se retiennent très bien, et ils aident à calculer d’autres additions : pour <b>6 + 7</b>, je pense « 6 + 6 = 12, et encore 1 » : <b>13</b>.</p>
<p>La <b>moitié</b> fait le chemin inverse : on partage en <b>deux parts égales</b>. La moitié de 12 est 6, parce que 6 + 6 = 12.</p>`},
 {t:'Les compléments à 10',h:`<p>Les compléments à 10 sont les paires de nombres qui font <b>10</b> ensemble. On les appelle parfois « les amoureux de 10 » :</p>
<table class="ptable"><tr><td>1 + 9</td><td>2 + 8</td><td>3 + 7</td><td>4 + 6</td><td>5 + 5</td></tr></table>
<p>Ils servent tout le temps : pour passer par 10 dans une addition, pour rendre la monnaie, ou pour trouver combien il manque pour arriver à la dizaine suivante. Par exemple, de 27 à 30, il manque <b>3</b>, car 7 + 3 = 10.</p>`}],
 try:{q:'Quelle est la moitié de 14 ? Comment le vérifier ?',a:'La moitié de 14 est 7. Vérification : 7 + 7 = 14, c’est bien le double de 7.'},
 adult:'Partagez équitablement des biscuits ou des cartes entre deux peluches : « Chacune en a autant ? » Essayez avec un nombre impair (7) pour voir qu’il en reste un.',
 culture:{t:'Pair ou impair ?',h:`<p>Un nombre qu’on peut partager en deux parts égales sans rien couper s’appelle un nombre <b>pair</b> : 2, 4, 6, 8, 10… Il se termine toujours par 0, 2, 4, 6 ou 8.</p><p>Les autres sont <b>impairs</b> : 1, 3, 5, 7, 9… Dans la nature, les ailes d’un papillon vont par deux, de chaque côté : chaque aile a son double de l’autre côté.</p>`}},
'cp-ma-calcul-mental':{
 deep:[{t:'Ajouter 10 : seules les dizaines bougent',h:`<p>Quand j’ajoute <b>10</b>, j’ajoute <b>une dizaine</b>. Le chiffre des dizaines augmente de 1, et le chiffre des unités ne change pas.</p>
<p>34 + 10 = <b>44</b> · 57 + 10 = <b>67</b> · 80 + 10 = <b>90</b>.</p>
<p>Pour ajouter 20, 30 ou 40, j’ajoute 2, 3 ou 4 dizaines : 25 + 30 = <b>55</b>. Sur un tableau des nombres de 1 à 100, ajouter 10, c’est descendre d’une ligne.</p>`},
 {t:'Ajouter 9 ou 11 : l’astuce du 10',h:`<p>Ajouter 9, c’est presque ajouter 10. Alors je fais plus simple :</p>
<ol><li>j’ajoute <b>10</b> : 26 + 10 = 36 ;</li><li>j’ai ajouté <b>1 de trop</b>, je l’enlève : 36 − 1 = <b>35</b>.</li></ol>
<p>Pour ajouter 11, c’est l’inverse : j’ajoute 10 puis encore 1. 42 + 11 = 52 + 1 = <b>53</b>.</p>
<p>Avant de répondre, je vérifie que mon résultat est <b>raisonnable</b> : 26 + 9 doit être un peu moins que 26 + 10 = 36.</p>`}],
 try:{q:'Calcule 47 + 9 dans ta tête.',a:'47 + 10 = 57, puis 57 − 1 = 56.'},
 adult:'Faites des « défis de voiture » ou de file d’attente : « 35 + 10 ? 35 + 9 ? » Demandez à l’enfant d’expliquer comment il a trouvé, plutôt que de seulement donner la réponse.',
 culture:{t:'Le boulier',h:`<p>Avant les calculatrices, on calculait avec un <b>boulier</b> : un cadre avec des tiges et des perles. Au Japon, on utilise encore un boulier appelé <b>soroban</b>, et certains enfants deviennent si rapides qu’ils finissent par calculer en imaginant le boulier dans leur tête !</p>`}},
'cp-ma-soustraction':{
 deep:[{t:'Les deux sens de la soustraction',h:`<p>La soustraction sert dans deux sortes de situations :</p>
<ul><li><b>Enlever</b> : j’ai 9 billes, j’en perds 4. Il m’en reste 9 − 4 = <b>5</b>.</li><li><b>Chercher l’écart</b> : j’ai 9 billes, mon frère en a 4. J’en ai combien de plus que lui ? Encore 9 − 4 = <b>5</b>.</li></ul>
<p>Dans une soustraction, on part toujours du <b>plus grand nombre</b> au CP. L’ordre compte : 9 − 4, ce n’est pas la même chose que 4 − 9.</p>`},
 {t:'Calculer en reculant ou en avançant',h:`<p><b>Reculer</b> : pour 12 − 3, je pars de 12 et je recule de 3 sur la file des nombres : 11, 10, <b>9</b>.</p>
<p><b>Passer par 10</b> : pour 13 − 5, je recule d’abord jusqu’à 10 (j’enlève 3), puis j’enlève les 2 qui restent : 10 − 2 = <b>8</b>.</p>
<p><b>Avancer</b> : quand les nombres sont proches, c’est plus rapide de compter de l’un à l’autre. Pour 15 − 12, je pars de 12 et je compte jusqu’à 15 : 13, 14, 15 → <b>3</b>.</p>
<p>Je vérifie toujours avec une addition : 13 − 5 = 8, car 8 + 5 = 13.</p>`}],
 try:{q:'Calcule 14 − 6 en passant par 10, puis vérifie.',a:'14 − 4 = 10, puis 10 − 2 = 8. Vérification : 8 + 6 = 14.'},
 adult:'Jouez à la marchande : l’enfant a 10 jetons, il « achète » un objet qui coûte 3 jetons. Combien lui en reste-t-il ? Faites-le vérifier en remettant les jetons.',
 culture:{t:'Les signes + et −',h:`<p>Les signes <b>+</b> et <b>−</b> sont apparus dans un livre imprimé en Allemagne en <b>1489</b>, écrit par Johannes Widmann. Avant, on écrivait les calculs avec des mots ! Le signe + viendrait d’une façon rapide d’écrire le mot latin <i>et</i>.</p>`}},
'cp-ma-addition-posee':{
 deep:[{t:'Poser une addition, colonne par colonne',h:`<p>Pour additionner de grands nombres, on les écrit <b>l’un sous l’autre</b>, en rangeant bien les chiffres :</p>
<ul><li>les <b>unités sous les unités</b> (colonne de droite) ;</li><li>les <b>dizaines sous les dizaines</b> (colonne de gauche).</li></ul>
<p>On calcule toujours en commençant par la <b>droite</b>, c’est-à-dire par les unités. Ensuite, on passe aux dizaines.</p>
<p>Exemple : 23 + 41. Unités : 3 + 1 = <b>4</b>. Dizaines : 2 + 4 = <b>6</b>. Résultat : <b>64</b>.</p>`},
 {t:'La retenue expliquée avec des paquets',h:`<p>Que faire quand les unités font <b>10 ou plus</b> ? Exemple : 28 + 15.</p>
<ol><li>Unités : 8 + 5 = <b>13</b>. 13 unités, c’est 1 paquet de 10 et 3 unités.</li><li>J’écris <b>3</b> dans la colonne des unités.</li><li>Le paquet de 10 va dans la colonne des dizaines : c’est <b>la retenue</b>. Je l’écris en petit, en haut de la colonne des dizaines.</li><li>Dizaines : 1 (la retenue) + 2 + 1 = <b>4</b>.</li><li>Résultat : <b>43</b>.</li></ol>
<p>Je vérifie si mon résultat est raisonnable : 28 + 15, c’est un peu plus que 28 + 10 = 38. 43, c’est cohérent.</p>`}],
 try:{q:'Pose et calcule 37 + 26.',a:'Unités : 7 + 6 = 13, j’écris 3 et je retiens 1. Dizaines : 1 + 3 + 2 = 6. Résultat : 63.'},
 adult:'Utilisez du papier quadrillé : un chiffre par carreau aide énormément à bien aligner les colonnes. Faites dire à voix haute « unités d’abord ».',
 culture:{t:'D’où vient le mot « retenue » ?',h:`<p>On dit « je retiens 1 » parce qu’autrefois, on gardait ce nombre <b>dans sa tête</b>, sans l’écrire. Aujourd’hui, on conseille de l’écrire en petit : c’est plus sûr !</p><p>Sur un boulier, c’est pareil : quand une tige des unités est pleine (10 perles), on la vide et on avance <b>une perle</b> sur la tige des dizaines.</p>`}},
'cp-ma-problemes':{
 deep:[{t:'Comprendre l’histoire avant de calculer',h:`<p>Un problème, c’est une petite histoire. Avant tout calcul, il faut bien la <b>comprendre</b> :</p>
<ol><li>Je lis (ou j’écoute) l’histoire en entier, deux fois si besoin.</li><li>Je me demande : <b>qu’est-ce qu’on cherche ?</b> Je peux le souligner.</li><li>Je repère les nombres utiles.</li><li>Je me demande : dans l’histoire, la quantité <b>augmente</b> (on gagne, on ajoute, on reçoit) ou <b>diminue</b> (on perd, on donne, on mange) ?</li></ol>
<p>Je peux <b>mimer</b> l’histoire avec des objets ou la <b>dessiner</b> avec des ronds : un dessin simple vaut mieux qu’un beau dessin.</p>`},
 {t:'Choisir le calcul et répondre',h:`<ul><li>Si la quantité <b>augmente</b>, je fais une <b>addition</b>.</li><li>Si la quantité <b>diminue</b>, je fais une <b>soustraction</b>.</li><li>Si on cherche <b>une partie</b> qui manque (« il en a 12, dont 5 rouges, combien de bleues ? »), je fais aussi une soustraction : 12 − 5 = 7.</li></ul>
<p>Je termine toujours par une <b>phrase réponse</b> qui reprend la question : « Sami a 14 billes. »</p>
<p>Enfin, je relis : ma réponse est-elle possible ? Si quelqu’un perd des billes et que j’en trouve plus qu’au départ, je me suis trompé.</p>`}],
 try:{q:'Dans une boîte, il y a 15 crayons : 9 sont rouges, les autres sont bleus. Combien de crayons bleus ?',a:'On cherche une partie : 15 − 9 = 6. Il y a 6 crayons bleus.'},
 adult:'Inventez des histoires avec les objets de la maison (« J’ai 7 pommes, j’en mange 2… »). Laissez l’enfant mimer avant d’écrire le calcul : c’est la compréhension qui compte.',
 culture:{t:'Des problèmes vieux de 3 500 ans',h:`<p>Les élèves de l’<b>Égypte ancienne</b> résolvaient déjà des problèmes : partager des pains, compter du grain… Un célèbre papyrus, le <b>papyrus Rhind</b>, écrit il y a plus de 3 500 ans, en contient plusieurs dizaines !</p>`}},
'cp-ma-multiplication':{
 deep:[{t:'Des groupes tous pareils',h:`<p>La multiplication sert à compter vite quand on a <b>plusieurs groupes qui ont le même nombre d’objets</b>.</p>
<p>Une boîte d’œufs a 2 rangées de 6 œufs. Au lieu de compter un par un, je dis : 2 rangées de 6, c’est <b>6 + 6 = 12</b>. On dit « <b>2 fois 6</b> » et on écrit <b>2 × 6 = 12</b>.</p>
<p>Le signe <b>×</b> se lit « fois ». Il remplace une addition répétée : 4 × 3, c’est 3 + 3 + 3 + 3 = <b>12</b>.</p>`},
 {t:'Comment savoir si c’est une multiplication ?',h:`<p>Je me pose deux questions :</p>
<ol><li>Est-ce qu’il y a <b>plusieurs groupes</b> ?</li><li>Est-ce que <b>tous les groupes ont le même nombre</b> d’objets ?</li></ol>
<p>Si je réponds oui aux deux, je peux utiliser une multiplication. Je compte le <b>nombre de groupes</b>, puis le <b>nombre d’objets dans chaque groupe</b>.</p>
<p>Si les groupes ne sont pas pareils (un sac de 3 billes et un sac de 5 billes), ce n’est pas une multiplication : j’additionne simplement 3 + 5.</p>`}],
 try:{q:'Un chat a 4 pattes. Combien de pattes ont 3 chats ?',a:'3 groupes de 4 : 4 + 4 + 4 = 12. 3 × 4 = 12 pattes.'},
 adult:'Cherchez des « groupes pareils » à la maison : paires de chaussettes, boîtes d’œufs, roues de vélos. Faites dire « 3 fois 2 » avant de compter.',
 culture:{t:'Le signe ×',h:`<p>Le signe <b>×</b> de la multiplication a été popularisé par un mathématicien anglais, <b>William Oughtred</b>, dans un livre publié en 1631.</p><p>Une <b>douzaine</b> d’œufs, c’est 12 œufs : 2 rangées de 6, ou 3 rangées de 4 !</p>`}},
'cp-ma-longueurs':{
 deep:[{t:'Comparer deux longueurs',h:`<p>Pour savoir quel objet est le plus long, je les place <b>côte à côte</b>, en les faisant partir <b>du même point</b> (la même ligne de départ). Celui qui dépasse est le plus long.</p>
<p>Quand on ne peut pas déplacer les objets (deux tables, deux portes), on utilise un <b>intermédiaire</b> : une ficelle, une bande de papier, ou des pas. Je mesure le premier objet avec la ficelle, puis je compare avec le second.</p>`},
 {t:'Mesurer avec la règle, sans erreur',h:`<ol><li>Je pose la règle <b>le long</b> du trait, bien à plat.</li><li>Je place le <b>0</b> de la règle exactement au début du trait. Attention : sur beaucoup de règles, le 0 n’est pas tout au bord !</li><li>Je regarde où s’arrête le trait et je lis le nombre : c’est la longueur.</li><li>J’écris le nombre <b>avec l’unité</b> : <b>cm</b> (centimètres).</li></ol>
<p>Un centimètre, c’est à peu près la largeur d’un ongle de petit doigt. Un crayon neuf mesure environ 17 à 18 cm.</p>`}],
 try:{q:'Un trait part du 0 et s’arrête au 9 de la règle. Combien mesure-t-il ?',a:'Il mesure 9 cm.'},
 adult:'Mesurez ensemble des objets de la maison avec une règle (cuillère, livre, chaussure). Faites d’abord deviner la longueur, puis vérifiez : estimer est une vraie compétence.',
 culture:{t:'Avant le mètre',h:`<p>Autrefois, on mesurait avec des parties du corps : le <b>pied</b>, le <b>pouce</b>, la <b>coudée</b>… Mais les pieds ne sont pas tous pareils, et les mesures changeaient d’une ville à l’autre !</p><p>Pendant la <b>Révolution française</b>, dans les années 1790, des savants ont créé le <b>mètre</b>, une mesure identique pour tout le monde. Un mètre, c’est 100 centimètres.</p>`}},
'cp-ma-masses':{
 deep:[{t:'Soupeser et comparer',h:`<p>La <b>masse</b> dit si un objet est <b>lourd</b> ou <b>léger</b>. Pour comparer deux objets, je peux les <b>soupeser</b> : un dans chaque main. Celui qui « tire » le plus vers le bas est le plus lourd.</p>
<p>Mais nos mains se trompent quand les objets ont presque la même masse. Pour être sûr, on utilise une <b>balance</b>.</p>
<p>Attention au piège : un objet <b>gros</b> n’est pas forcément <b>lourd</b>. Un gros ballon de baudruche est très léger ; une petite bille de fer est lourde pour sa taille.</p>`},
 {t:'Lire une balance à plateaux',h:`<ul><li>Le plateau qui <b>descend</b> porte l’objet le <b>plus lourd</b>.</li><li>Le plateau qui <b>monte</b> porte l’objet le <b>plus léger</b>.</li><li>Si les deux plateaux sont <b>à la même hauteur</b>, les deux objets ont <b>la même masse</b> : on dit que la balance est en équilibre.</li></ul>
<p>Pour ranger trois objets du plus léger au plus lourd, je les compare deux par deux avec la balance.</p>`}],
 try:{q:'Sur la balance, la pomme fait descendre son plateau face à la fraise. Laquelle est la plus légère ?',a:'La fraise est la plus légère : son plateau monte.'},
 adult:'Fabriquez une balance avec un cintre et deux sacs, ou soupesez des paquets de cuisine. Demandez de deviner, puis de vérifier.',
 culture:{t:'La balance de Roberval',h:`<p>La balance à deux plateaux posés <b>au-dessus</b> du fléau, qu’on voit encore sur les marchés, a été présentée en <b>1669</b> par un savant français, <b>Gilles Personne de Roberval</b>. On l’appelle la balance de Roberval.</p><p>Plus tard, tu mesureras les masses en <b>grammes</b> et en <b>kilogrammes</b>.</p>`}},
'cp-ma-monnaie':{
 deep:[{t:'Compter de l’argent',h:`<p>En France, l’argent se compte en <b>euros</b> (€). Ce qui compte, ce n’est pas le <b>nombre</b> de pièces, mais leur <b>valeur</b> : une seule pièce de 2 € vaut plus que… une pièce de 1 € !</p>
<p>Pour compter une somme :</p>
<ol><li>je range les billets et les pièces du <b>plus grand</b> au <b>plus petit</b> ;</li><li>je pars du plus grand et j’ajoute les autres un par un ;</li><li>j’écris le total avec le signe <b>€</b>.</li></ol>
<p>Exemple : 10 € + 5 € + 2 € + 1 € = <b>18 €</b>.</p>`},
 {t:'Faire une même somme de plusieurs façons',h:`<p>On peut payer 10 € de plusieurs façons :</p>
<ul><li>un billet de 10 € ;</li><li>deux billets de 5 € ;</li><li>cinq pièces de 2 € ;</li><li>un billet de 5 €, deux pièces de 2 € et une pièce de 1 €.</li></ul>
<p>C’est comme décomposer un nombre : 10 = 5 + 5 = 2 + 2 + 2 + 2 + 2 = 5 + 2 + 2 + 1.</p>`}],
 try:{q:'Trouve deux façons différentes de faire 7 € avec des pièces de 1 € et de 2 € et un billet de 5 €.',a:'Par exemple : 5 € + 2 € = 7 € ; ou 2 € + 2 € + 2 € + 1 € = 7 €.'},
 adult:'Jouez à la marchande avec de vraies pièces ou de la monnaie en carton. Fixez des prix simples (3 €, 7 €, 12 €) et laissez l’enfant composer la somme.',
 culture:{t:'L’euro et le franc',h:`<p>En France, on paie en euros depuis le <b>1er janvier 2002</b>. Avant, on utilisait le <b>franc</b>. Aujourd’hui, l’euro est utilisé dans une vingtaine de pays d’Europe.</p><p>Il existe aussi des pièces plus petites que 1 € : les <b>centimes</b>. 100 centimes font 1 euro.</p>`}},
'cp-ma-heure':{
 deep:[{t:'Les deux aiguilles',h:`<p>Une horloge a deux aiguilles qui n’ont pas le même travail :</p>
<ul><li>la <b>petite aiguille</b> indique les <b>heures</b> : elle avance lentement, elle fait le tour du cadran en 12 heures ;</li><li>la <b>grande aiguille</b> indique les <b>minutes</b> : elle fait un tour complet en une heure.</li></ul>
<p>Quand la grande aiguille est pointée sur le <b>12</b>, c’est une heure <b>pile</b> : on lit simplement le nombre montré par la petite aiguille.</p>`},
 {t:'Lire l’heure pile, étape par étape',h:`<ol><li>Je trouve la grande aiguille : est-elle sur le 12 ? Si oui, c’est une heure pile.</li><li>Je trouve la petite aiguille et je lis le nombre qu’elle montre, par exemple 7.</li><li>Je dis : « Il est <b>7 heures</b>. »</li></ol>
<p>Une journée compte <b>24 heures</b>. La petite aiguille fait donc deux tours par jour : 7 heures du matin (au réveil) et 7 heures du soir (19 heures, au dîner). On dit « du matin » ou « du soir » pour savoir de quel moment on parle.</p>`}],
 try:{q:'La grande aiguille est sur 12 et la petite sur 10. Quelle heure est-il ?',a:'Il est 10 heures pile.'},
 adult:'Associez des heures piles à la routine : « Le goûter, c’est à 4 heures. » Regardez l’horloge ensemble à ces moments-là et faites décrire la position des aiguilles.',
 culture:{t:'Le cadran solaire',h:`<p>Avant les horloges, on lisait l’heure avec l’ombre du soleil sur un <b>cadran solaire</b>. Les <b>Égyptiens</b> de l’Antiquité partageaient déjà le jour en 12 parties et la nuit en 12 parties : c’est de là que viennent nos <b>24 heures</b>.</p>`}},
'cp-ma-espace':{
 deep:[{t:'Les mots pour dire où',h:`<p>Pour expliquer où se trouve un objet, on le place <b>par rapport à un autre</b> objet, qu’on appelle le repère :</p>
<ul><li><b>sur / sous</b> : le chat est sur le lit, la balle est sous le lit ;</li><li><b>devant / derrière</b> : le vélo est devant la maison, le jardin est derrière ;</li><li><b>à gauche / à droite</b> : le verre est à droite de l’assiette ;</li><li><b>entre</b> : la banane est entre la pomme et la poire ;</li><li><b>au-dessus / en dessous</b> : l’oiseau vole au-dessus de l’arbre.</li></ul>`},
 {t:'Gauche et droite : le cas difficile',h:`<p>La gauche et la droite dépendent de <b>qui regarde</b>. Si un ami se tient en face de toi, sa main droite est du côté de ta main gauche !</p>
<p>Pour ne pas te tromper :</p>
<ol><li>repère ta propre main droite (un bracelet, une montre ou un point sur la main peut aider) ;</li><li>demande-toi : « Je regarde depuis quelle place ? » ;</li><li>sur une feuille ou un écran, la gauche et la droite sont celles de la personne qui regarde la feuille.</li></ol>`}],
 try:{q:'Sur une étagère : 📕 📗 📘. Quel livre est à droite du livre vert ?',a:'Le livre bleu 📘 est à droite du livre vert (en regardant l’étagère).'},
 adult:'Jouez au « robot » : l’enfant vous guide dans la pièce avec des consignes (« avance, tourne à gauche, mets la balle sous la chaise »). Inversez ensuite les rôles.',
 culture:{t:'Les points cardinaux',h:`<p>Les marins et les randonneurs ne disent pas « à gauche » ou « à droite », car cela dépend de la personne. Ils utilisent les <b>points cardinaux</b> : le <b>nord</b>, le <b>sud</b>, l’<b>est</b> et l’<b>ouest</b>, qui sont les mêmes pour tout le monde. Une <b>boussole</b> indique toujours le nord.</p>`}},
'cp-ma-figures':{
 deep:[{t:'Côtés et sommets',h:`<p>Pour reconnaître une figure, on regarde deux choses :</p>
<ul><li>ses <b>côtés</b> : ce sont les traits droits qui forment le bord ;</li><li>ses <b>sommets</b> : ce sont les « coins », là où deux côtés se rejoignent.</li></ul>
<p>Pour compter les côtés sans se tromper, je pose mon doigt sur un sommet, je fais le tour de la figure en comptant chaque côté, et je m’arrête quand je reviens au départ.</p>`},
 {t:'Bien distinguer carré et rectangle',h:`<ul><li>Le <b>triangle</b> a 3 côtés et 3 sommets.</li><li>Le <b>rectangle</b> a 4 côtés et 4 <b>angles droits</b> (des coins comme le coin d’une feuille). Ses côtés opposés ont la même longueur.</li><li>Le <b>carré</b> a 4 côtés <b>tous de la même longueur</b> et 4 angles droits.</li><li>Le <b>cercle</b> est rond : il n’a ni côté ni sommet.</li></ul>
<p>Le carré est donc un rectangle un peu spécial, dont tous les côtés sont égaux. Pour vérifier les angles droits, on utilise une <b>équerre</b> ou le coin d’une feuille.</p>`}],
 try:{q:'Une figure a 4 côtés, mais deux sont longs et deux sont courts, avec 4 angles droits. Comment s’appelle-t-elle ?',a:'C’est un rectangle (ce n’est pas un carré, car ses côtés ne sont pas tous égaux).'},
 adult:'Partez à la chasse aux formes dans la maison ou dans la rue : fenêtres, assiettes, panneaux. L’enfant nomme la forme et justifie (« 4 côtés égaux »).',
 culture:{t:'Des formes avec un message',h:`<p>Sur la route, la forme d’un panneau donne déjà une information : les panneaux en <b>triangle</b> signalent un <b>danger</b>, et beaucoup de panneaux <b>ronds</b> indiquent une <b>interdiction</b> ou une <b>obligation</b>.</p><p>Dans une ruche, les abeilles fabriquent des alvéoles à <b>6 côtés</b> : ce sont des hexagones.</p>`}},
'cp-ma-solides':{
 deep:[{t:'Figure ou solide ?',h:`<p>Une <b>figure</b> est dessinée à plat sur une feuille : on ne peut pas la prendre. Un <b>solide</b> a une épaisseur : on peut le tenir dans ses mains, le faire tourner, le poser.</p>
<p>Les surfaces plates d’un solide s’appellent des <b>faces</b>. On peut les reconnaître en posant le solide sur de la pâte à modeler : la trace laissée a la forme de la face (un carré pour un cube, un rond pour le dessous d’un cylindre).</p>`},
 {t:'Reconnaître les solides',h:`<ul><li>Le <b>cube</b> a 6 faces, toutes des <b>carrés</b> identiques : comme un dé.</li><li>Le <b>pavé</b> a 6 faces <b>rectangulaires</b> : comme une boîte à chaussures.</li><li>La <b>boule</b> n’a pas de face plate : elle roule dans tous les sens.</li><li>Le <b>cylindre</b> a deux faces rondes et une partie courbe : il roule tout droit.</li><li>Le <b>cône</b> a une face ronde et une pointe : comme un cornet de glace.</li><li>La <b>pyramide</b> a des faces en triangle qui se rejoignent en une pointe.</li></ul>
<p>Pour savoir si un solide roule, je regarde s’il a une partie <b>courbe</b>.</p>`}],
 try:{q:'Quel solide ressemble à une boîte de conserve ? Roule-t-il ?',a:'C’est un cylindre. Il roule, mais seulement tout droit (sur sa partie courbe).'},
 adult:'Rassemblez des emballages (boîte de céréales, conserve, balle, dé) et faites trier : « ceux qui roulent / ceux qui ne roulent pas », puis « faces carrées / faces rectangulaires ».',
 culture:{t:'Les pyramides d’Égypte',h:`<p>La grande pyramide de <b>Gizeh</b>, en Égypte, a été construite il y a environ <b>4 500 ans</b>. Elle a la forme d’une pyramide à base carrée et a longtemps été la plus haute construction du monde.</p><p>Le ballon de football classique n’est pas une vraie boule : il est fait de morceaux cousus, des <b>hexagones</b> (6 côtés) et des <b>pentagones</b> (5 côtés).</p>`}},
'cp-ma-donnees':{
 deep:[{t:'Lignes et colonnes',h:`<p>Un tableau range des informations dans des <b>cases</b>. Les cases alignées de gauche à droite forment une <b>ligne</b> ; les cases alignées de haut en bas forment une <b>colonne</b>.</p>
<p>La première ligne ou la première colonne contient souvent des <b>titres</b> : ils disent ce que l’on trouve dans le tableau.</p>`},
 {t:'Trouver une information, pas à pas',h:`<ol><li>Je lis les <b>titres</b> pour savoir de quoi parle le tableau.</li><li>Je cherche la <b>bonne ligne</b> (par exemple « fraise ») et je pose mon doigt dessus.</li><li>Je glisse mon doigt jusqu’à la <b>bonne colonne</b> (par exemple « nombre d’élèves »).</li><li>Je lis le nombre dans la case et je réponds par une phrase.</li></ol>
<p>Pour trouver le plus grand ou le plus petit, je compare tous les nombres d’une même colonne.</p>`},
 {t:'Fabriquer son propre tableau',h:`<p>Pour savoir quel est le jeu préféré de la classe, on peut poser la question à chaque élève et noter les réponses. Pour ne pas se perdre, on trace <b>un petit bâton</b> à chaque réponse, sur la ligne du jeu choisi.</p>
<p>Pour compter plus vite, on regroupe les bâtons <b>par 5</b> : quatre bâtons debout, et le cinquième qui les barre. Ensuite, on compte les paquets de 5, puis les bâtons qui restent.</p>
<p>Quand tout le monde a répondu, on écrit le nombre total dans la dernière colonne. On vérifie : le total de toutes les lignes doit être égal au nombre d’élèves interrogés.</p>`}],
 try:{q:'Dans le tableau du cours (pomme 6, banane 4, fraise 9), combien d’élèves en tout ont répondu ?',a:'6 + 4 + 9 = 19 élèves.'},
 adult:'Faites un petit sondage en famille (« Ton animal préféré ? ») et notez les réponses dans un tableau à deux colonnes. Posez ensuite des questions dessus.',
 culture:{t:'Des tableaux tous les jours',h:`<p>Les tableaux sont partout : l’<b>emploi du temps</b> de la classe, les horaires du bus, le classement d’un championnat de football, ou la météo de la semaine. Savoir les lire, c’est trouver une information très vite.</p>`}},
'cp-ma-suites':{
 deep:[{t:'Trouver le motif',h:`<p>Une suite à motif est faite d’un <b>morceau qui se répète</b> toujours de la même façon, comme un collier de perles.</p>
<p>Pour trouver le motif :</p>
<ol><li>je regarde le début de la suite ;</li><li>je cherche quand <b>le premier élément revient</b> ;</li><li>tout ce qu’il y a avant ce retour, c’est le motif. Je vérifie qu’il se répète bien ensuite.</li></ol>
<p>Dans 🔴🔵🔵🔴🔵🔵🔴…, le rouge revient après deux bleus : le motif est <b>🔴🔵🔵</b>, il a 3 éléments.</p>`},
 {t:'Continuer la suite sans se tromper',h:`<p>Pour continuer, je repère <b>où j’en suis dans le motif</b>. Je peux entourer chaque motif complet avec mon crayon. Le dernier morceau qui n’est pas entouré me dit ce qui doit venir après.</p>
<p>Les motifs existent aussi avec des <b>sons</b> (clap, clap, pied…), des <b>gestes</b> ou des <b>nombres</b> (1, 2, 3, 1, 2, 3…).</p>`},
 {t:'Retrouver l’élément qui manque',h:`<p>Parfois, un élément est caché au milieu de la suite : 🍎🍌🍐🍎❓🍐🍎🍌🍐.</p>
<ol><li>Je trouve d’abord le motif grâce aux morceaux complets : ici <b>🍎🍌🍐</b>.</li><li>Je regarde la place du point d’interrogation dans son motif : il est juste après 🍎.</li><li>Dans le motif, après 🍎 vient 🍌 : l’élément caché est donc <b>🍌</b>.</li></ol>
<p>Je vérifie en relisant toute la suite à voix haute : le motif doit se répéter sans erreur du début à la fin.</p>`}],
 try:{q:'Continue : ⭐⭐🌙⭐⭐🌙⭐ … Quels sont les deux éléments suivants ?',a:'Le motif est ⭐⭐🌙. Après ⭐ vient ⭐, puis 🌙.'},
 adult:'Enfilez des perles ou des pâtes de couleur selon un motif, ou inventez des rythmes en tapant des mains et des pieds. L’enfant doit continuer, puis inventer son propre motif.',
 culture:{t:'Frises et rythmes',h:`<p>Les artistes utilisent les motifs depuis des milliers d’années. Les <b>Grecs de l’Antiquité</b> décoraient les vases et les temples avec des <b>frises</b> : un même dessin répété tout autour.</p><p>En musique aussi, un <b>rythme</b> est un motif de sons qui se répète.</p>`}}
},{lot:'maths-cp',grade:'CP',subject:'maths',refs:['Mathématiques cycle 2 — programmes 2024 (BO n°41 du 31/10/2024)']});
})(typeof window!=='undefined'?window:globalThis);
