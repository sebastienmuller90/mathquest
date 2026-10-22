/* Finot Académie — cours approfondis : anglais CE2 (lot 11, 21/10/2026).
   Même format que course-depth-maths-cp.js (deep / try / adult / culture), affiché par js/course-depth.js.
   Rien n'est retiré des cours existants. Explications en français, mots anglais en gras avec leur traduction,
   aide à la prononciation « à la française » entre parenthèses (simple et approximative).
   Programme de référence : langues vivantes étrangères cycles 2 et 3 (BO n°31 du 30 juillet 2020).
   Faits culturels vérifiables uniquement. */
(function(root){
'use strict';
const D=root.MQCourseDepth=root.MQCourseDepth||{version:'1',chapters:{},add(map,meta){for(const id of Object.keys(map))this.chapters[id]=Object.assign({},meta,map[id]);}};
D.add({
'ce2-en-alphabet':{
 deep:[{t:'Les lettres qui changent de son',h:`<p>Les 26 lettres sont les mêmes qu’en français, mais beaucoup se prononcent autrement. Voici les plus piégeuses :</p>
<table class="ptable"><tr><td><b>A</b></td><td>« éï »</td></tr><tr><td><b>E</b></td><td>« i »</td></tr><tr><td><b>I</b></td><td>« aï »</td></tr><tr><td><b>G</b></td><td>« dji »</td></tr><tr><td><b>J</b></td><td>« djéï »</td></tr><tr><td><b>H</b></td><td>« éïtch »</td></tr><tr><td><b>R</b></td><td>« âr »</td></tr><tr><td><b>W</b></td><td>« double-iou »</td></tr><tr><td><b>Y</b></td><td>« waï »</td></tr></table>
<p>Le plus grand piège : la lettre <b>E</b> se dit « i », et la lettre <b>I</b> se dit « aï ». Les deux sons semblent avoir été échangés ! Pour <b>I</b>, pense à <b>I like</b> (aï laïk) : c’est le même son.</p>
<p>Même chose pour <b>G</b> et <b>J</b> : en français, G se dit « jé » et J se dit « ji ». En anglais, c’est presque l’inverse : G « dji », J « djéï ».</p>
<p>Le <b>W</b> est un « double U » en anglais (double-iou), alors qu’en français c’est un « double V ».</p>`},
 {t:'Épeler son prénom',h:`<p>Épeler, c’est dire un mot lettre par lettre. Pour te demander d’épeler, on dit <b>How do you spell it?</b> (haou dou iou spèl it) = Comment ça s’écrit ?</p>
<ol><li>J’écoute la question.</li><li>Je pense à chaque lettre de mon prénom.</li><li>Je dis les lettres une par une, avec leur son anglais.</li></ol>
<p>Exemple : <b>What’s your name?</b> – Hugo. <b>How do you spell it?</b> – H-U-G-O, c’est-à-dire « éïtch, iou, dji, ô ».</p>
<p>Quand une lettre est répétée, les Anglais disent souvent <b>double</b> : Anna s’épelle « éï, double èn, éï ».</p>
<p>Et la dernière lettre, Z ? Au Royaume-Uni, on dit « zèd » ; aux États-Unis, on dit « zii ».</p>`}],
 try:{q:'Comment épelles-tu le prénom JADE en anglais ?',a:'J se dit « djéï », A se dit « éï », D se dit « di » et E se dit « i ». J’épelle : « djéï, éï, di, i ».'},
 adult:'Écrivez sur une feuille les lettres pièges (A, E, I, G, J, H, R, W, Y) avec leur son anglais, et affichez-la. Demandez ensuite à l’enfant d’épeler son prénom, puis ceux de la famille. Si vous ne connaissez pas la prononciation, écoutez les lettres dans l’appli : c’est l’enfant qui peut devenir votre professeur.',
 culture:{t:'Une phrase avec toutes les lettres',h:`<p>Les Anglais connaissent une phrase célèbre qui utilise les 26 lettres de l’alphabet : <b>The quick brown fox jumps over the lazy dog.</b> Elle veut dire « Le rapide renard brun saute par-dessus le chien paresseux ».</p><p>On s’en sert depuis longtemps pour essayer une machine à écrire ou montrer à quoi ressemble une police d’écriture. Une phrase qui contient toutes les lettres s’appelle un <b>pangramme</b>. Cherche le z, le x et le q : ils y sont !</p>`}},
'ce2-en-numbers100':{
 deep:[{t:'Les dizaines et les nombres composés',h:`<table class="ptable"><tr><td>20</td><td><b>twenty</b> (twènti)</td></tr><tr><td>30</td><td><b>thirty</b> (theurti)</td></tr><tr><td>40</td><td><b>forty</b> (forti)</td></tr><tr><td>50</td><td><b>fifty</b> (fifti)</td></tr><tr><td>60</td><td><b>sixty</b> (siksti)</td></tr><tr><td>70</td><td><b>seventy</b> (sèvnti)</td></tr><tr><td>80</td><td><b>eighty</b> (éïti)</td></tr><tr><td>90</td><td><b>ninety</b> (naïnti)</td></tr><tr><td>100</td><td><b>one hundred</b></td></tr></table>
<p>Les dizaines finissent toutes par <b>-ty</b>. Pour les autres nombres, on dit la dizaine, puis l’unité, reliées par un tiret : 45 = <b>forty-five</b>, 72 = <b>seventy-two</b>.</p>
<p>Bonne nouvelle : 70, 80 et 90 sont aussi simples que les autres. Pas besoin de calcul comme « soixante-dix » ou « quatre-vingts ».</p>
<p>Attention à l’orthographe : on écrit <b>forty</b> sans u, même si on écrit <b>four</b> avec un u.</p>`},
 {t:'-teen ou -ty ? Et l’heure pile',h:`<p>Ne confonds pas 13 et 30, 14 et 40… Écoute où la voix appuie :</p>
<table class="ptable"><tr><td>13 <b>thirTEEN</b></td><td>30 <b>THIRty</b></td></tr><tr><td>14 <b>fourTEEN</b></td><td>40 <b>FORty</b></td></tr><tr><td>15 <b>fifTEEN</b></td><td>50 <b>FIFty</b></td></tr></table>
<p>Avec <b>-teen</b>, on appuie sur la fin, longue (tiine). Avec <b>-ty</b>, on appuie sur le début, et la fin est courte (ti).</p>
<p>Pour l’heure pile, on demande <b>What time is it?</b> = Quelle heure est-il ? On répond <b>It’s</b>, le nombre, puis <b>o’clock</b> (o-klok) : <b>It’s seven o’clock.</b> = Il est 7 heures.</p>
<ol><li>Je vérifie que la grande aiguille est sur le 12.</li><li>Je lis le nombre montré par la petite aiguille.</li><li>Je dis <b>It’s…</b>, le nombre, puis <b>o’clock</b>.</li></ol>`}],
 try:{q:'Comment dit-on 68 ? Et « Il est 10 heures » ?',a:'68, c’est 60 + 8 : sixty-eight, avec un tiret. Pour 10 heures pile : « It’s ten o’clock. »'},
 adult:'Jouez au loto des nombres : écrivez des nombres de 20 à 100 sur une grille, annoncez-les en anglais et l’enfant les coche. Si vous ne connaissez pas la prononciation, lisez-les dans l’appli ou laissez l’enfant annoncer. À chaque heure pile de la journée, demandez « What time is it? ».',
 culture:{t:'D’où vient « o’clock » ?',h:`<p><b>o’clock</b> est la forme courte de <b>of the clock</b>, « de l’horloge ». <b>It’s seven o’clock</b>, c’est donc « il est sept heures de l’horloge ».</p><p>Les anglophones comptent souvent les heures de 1 à 12. Pour savoir si c’est le matin ou l’après-midi, ils écrivent <b>a.m.</b> ou <b>p.m.</b> : ce sont deux expressions latines, « ante meridiem » (avant midi) et « post meridiem » (après midi). 7 a.m., c’est 7 heures du matin ; 7 p.m., c’est 19 heures.</p>`}},
'ce2-en-house':{
 deep:[{t:'Les pièces de la maison',h:`<table class="ptable"><tr><td><b>kitchen</b> (kitchèn)</td><td>cuisine</td></tr><tr><td><b>bedroom</b> (bèdroum)</td><td>chambre</td></tr><tr><td><b>bathroom</b> (bathroum)</td><td>salle de bains</td></tr><tr><td><b>living room</b> (liviing roum)</td><td>salon</td></tr><tr><td><b>garden</b> (gardn)</td><td>jardin</td></tr></table>
<p>Le mot <b>room</b> veut dire « pièce ». Regarde comme les noms sont bien faits :</p>
<ul><li><b>bed</b> (lit) + <b>room</b> : la pièce du lit, la chambre ;</li><li><b>bath</b> (bain) + <b>room</b> : la pièce du bain ;</li><li><b>living</b> (vivre) + <b>room</b> : la pièce où l’on vit, le salon.</li></ul>
<p>Aux États-Unis, le jardin derrière la maison s’appelle souvent <b>the backyard</b>.</p>
<p>Pour demander où est quelque chose, on dit <b>Where is…?</b> (wèr iz) = Où est… ?</p>`},
 {t:'Dans, sur, sous',h:`<table class="ptable"><tr><td><b>in</b> (inn)</td><td>dans</td></tr><tr><td><b>on</b> (onn)</td><td>sur</td></tr><tr><td><b>under</b> (eunndeur)</td><td>sous</td></tr></table>
<p>Piège : le mot anglais <b>on</b> ressemble au « on » français, mais il veut dire <b>sur</b>. Et <b>in</b> veut dire <b>dans</b>. Pour t’en souvenir : <b>in</b>, c’est « à l’intérieur ».</p>
<p>Pour répondre, on dit <b>It’s</b>, la préposition, puis le lieu : <b>Where is the cat? – It’s under the table.</b> = Où est le chat ? – Il est sous la table. Le mot <b>it</b> remplace un objet ou un animal.</p>
<ol><li>Je repère l’objet.</li><li>Je choisis la préposition : <b>in</b>, <b>on</b> ou <b>under</b>.</li><li>Je fais la phrase : <b>The ball is in the box.</b> = Le ballon est dans la boîte.</li></ol>`}],
 try:{q:'Le chat est dans le jardin. Comment le dis-tu en anglais ?',a:'Dans se dit in et jardin se dit garden. Je dis : « The cat is in the garden. »'},
 adult:'Jouez à cache-cache avec une peluche : cachez-la, puis demandez « Where is teddy? ». L’enfant la cherche et répond avec in, on ou under : « It’s under the bed! ». Vous pouvez aussi coller de petites étiquettes en anglais sur les portes des pièces (kitchen, bathroom…).',
 culture:{t:'La maison au numéro 10',h:`<p>À Londres, une maison est célèbre dans le monde entier : le <b>10 Downing Street</b>. Avec sa porte noire marquée du chiffre 10, c’est la maison et le bureau du Premier ministre britannique depuis le XVIIIe siècle.</p><p>Depuis longtemps, un chat y vit souvent. Il porte un titre officiel très sérieux : <b>Chief Mouser</b>, le « chef chasseur de souris » ! On pourrait donc demander : <b>Where is the cat?</b> – <b>It’s in Downing Street!</b></p>`}},
'ce2-en-food':{
 deep:[{t:'Les aliments',h:`<table class="ptable"><tr><td><b>bread</b> (brèd)</td><td>pain</td></tr><tr><td><b>cheese</b> (tchiiz)</td><td>fromage</td></tr><tr><td><b>chicken</b> (tchikèn)</td><td>poulet</td></tr><tr><td><b>fish</b> (fich)</td><td>poisson</td></tr><tr><td><b>rice</b> (raïss)</td><td>riz</td></tr><tr><td><b>pasta</b> (pasta)</td><td>pâtes</td></tr><tr><td><b>orange juice</b> (orinndj djouss)</td><td>jus d’orange</td></tr><tr><td><b>water</b> (woteur)</td><td>eau</td></tr><tr><td><b>ice cream</b> (aïss kriim)</td><td>glace</td></tr></table>
<p>Regarde <b>orange juice</b> : le mot qui précise (orange) vient avant, comme la couleur dans <b>a red hat</b>. En français, c’est l’inverse : jus d’orange.</p>
<p>Pour dire ce qu’on aime, il y a une échelle : <b>I love</b> (j’adore), <b>I like</b> (j’aime), <b>I don’t like</b> (je n’aime pas), <b>I hate</b> (je déteste). <b>I love pizza! I hate broccoli.</b></p>`},
 {t:'Demander poliment',h:`<p>Pour demander quelque chose, on dit <b>Can I have…, please?</b> (kann aï hav… pliz) = Puis-je avoir…, s’il te plaît ?</p>
<p>Devant une chose qu’on ne compte pas (l’eau, le pain), on met <b>some</b> (seum) = du, de la : <b>Can I have some water, please?</b></p>
<p>Devant une chose qu’on compte, on met <b>a</b> = un, une : <b>a banana</b>. Mais devant un mot qui commence par un son de voyelle, on dit <b>an</b>, plus facile à prononcer : <b>an apple</b>, <b>an orange</b>, <b>an ice cream</b>.</p>
<table class="ptable"><tr><td><b>Can I have some bread, please?</b></td><td>Je demande.</td></tr><tr><td><b>Here you are.</b></td><td>On me le donne.</td></tr><tr><td><b>Thank you!</b></td><td>Je remercie.</td></tr></table>
<p>N’oublie jamais <b>please</b> : sans lui, la demande paraît impolie.</p>`}],
 try:{q:'Comment demandes-tu poliment une glace ?',a:'Puis-je avoir se dit Can I have et glace se dit ice cream. Ice commence par un son de voyelle (aïss), donc on dit an et pas a. Sans oublier please : « Can I have an ice cream, please? »'},
 adult:'Au goûter, jouez au café : l’enfant ne reçoit son pain ou son eau que s’il le demande avec « Can I have…, please? ». Vous répondez « Here you are! » en le lui tendant, et il dit « Thank you! ». Vous pouvez aussi classer ensemble des aliments sur l’échelle I love, I like, I don’t like, I hate.',
 culture:{t:'Chips, crisps ou fries ?',h:`<p>Attention, les mots changent selon les pays ! Au Royaume-Uni, nos frites s’appellent des <b>chips</b>, et nos chips s’appellent des <b>crisps</b> (krisps), « les croustillants ».</p><p>Aux États-Unis, c’est encore différent : les frites sont des <b>French fries</b> (ou <b>fries</b>), et les chips sont des <b>chips</b>. Un plat très connu au Royaume-Uni, depuis plus de 150 ans, est le <b>fish and chips</b> : du poisson frit avec des frites.</p>`}},
'ce2-en-animals-can':{
 deep:[{t:'Des verbes pour bouger',h:`<table class="ptable"><tr><td><b>swim</b> (souim)</td><td>nager</td></tr><tr><td><b>fly</b> (flaï)</td><td>voler</td></tr><tr><td><b>run</b> (reunn)</td><td>courir</td></tr><tr><td><b>jump</b> (djeump)</td><td>sauter</td></tr><tr><td><b>climb</b> (klaïm)</td><td>grimper</td></tr><tr><td><b>sing</b> (sinng)</td><td>chanter</td></tr></table>
<p>Dans <b>climb</b>, le b final ne se prononce pas : on dit « klaïm ».</p>
<p>Quelques animaux en plus : <b>a monkey</b> (meunki) = un singe, <b>an elephant</b> (èlèfeunt) = un éléphant, <b>a penguin</b> (pènngouinn) = un pingouin, comme dans le cours. Les scientifiques français appellent plutôt « manchot » cet oiseau qui ne vole pas.</p>`},
 {t:'can et can’t',h:`<table class="ptable"><tr><td><b>I can swim.</b> (kann)</td><td>Je sais nager.</td></tr><tr><td><b>I can’t fly.</b> (kânt)</td><td>Je ne sais pas voler.</td></tr></table>
<p><b>can</b> veut dire « je sais » ou « je peux ». <b>can’t</b> est la forme courte de <b>cannot</b> : « je ne sais pas » ou « je ne peux pas ». Au Royaume-Uni, on dit « kânt » ; aux États-Unis, plutôt « kannt ».</p>
<p>Deux règles faciles :</p>
<ul><li>Après <b>can</b>, on met le verbe tout seul, sans <b>to</b> : <b>I can swim</b>, pas « I can to swim ».</li><li><b>can</b> ne change jamais : <b>I can</b>, <b>a bird can</b>, <b>an elephant can’t</b>.</li></ul>
<ol><li>Je choisis l’animal.</li><li>Je choisis le verbe.</li><li>J’utilise <b>can</b> ou <b>can’t</b> : <b>A fish can swim. An elephant can’t jump.</b></li></ol>
<p>Pour demander, on dit <b>Can you swim?</b> et on répond <b>Yes, I can.</b> ou <b>No, I can’t.</b></p>`}],
 try:{q:'Comment dis-tu « Un singe sait grimper, mais un poisson ne sait pas courir » ?',a:'Singe = monkey, grimper = climb, poisson = fish, courir = run. On met le verbe juste après can ou can’t, sans to : « A monkey can climb, but a fish can’t run. »'},
 adult:'Jouez au jeu des animaux : vous dites « A bird can… » et l’enfant mime puis complète avec fly. Inversez ensuite : il vous pose la question « Can you climb? » et vous répondez « Yes, I can » ou « No, I can’t » en faisant le geste. Le bouton d’écoute de l’appli donne les bons sons.',
 culture:{t:'Le kangourou, champion du saut',h:`<p>En Australie vit un animal qui sait très bien sauter : le <b>kangaroo</b>. <b>A kangaroo can jump!</b> Il se déplace par grands bonds sur ses pattes arrière, avec sa grosse queue pour garder l’équilibre. Il peut franchir plusieurs mètres d’un seul saut.</p><p>Le bébé kangourou s’appelle <b>a joey</b>. Il grandit bien au chaud dans la poche du ventre de sa maman. Le kangourou figure, avec l’émeu (un grand oiseau qui ne vole pas), sur les armoiries de l’Australie.</p>`}},
'ce2-en-daily':{
 deep:[{t:'Les actions de ma journée',h:`<table class="ptable"><tr><td><b>I get up</b> (aï guèt eup)</td><td>je me lève</td></tr><tr><td><b>I have breakfast</b> (brèkfeust)</td><td>je prends mon petit-déjeuner</td></tr><tr><td><b>I go to school</b> (skoul)</td><td>je vais à l’école</td></tr><tr><td><b>I have lunch</b> (leuntch)</td><td>je déjeune</td></tr><tr><td><b>I play</b> (pléï)</td><td>je joue</td></tr><tr><td><b>I go to bed</b> (bèd)</td><td>je me couche</td></tr></table>
<p>Pour les repas, l’anglais utilise <b>have</b> (avoir, prendre) : <b>I have breakfast</b>, <b>I have lunch</b>.</p>
<p>Pour se coucher, on dit mot à mot « aller au lit » : <b>I go to bed</b>. Et pour <b>I get up</b>, pense à <b>up</b> (en haut, déjà vu avec <b>Stand up!</b>) : on se lève vers le haut.</p>
<p>Pour raconter dans l’ordre, tu peux dire <b>First</b> (d’abord), puis <b>Then</b> (ensuite).</p>`},
 {t:'at pour l’heure, on pour le jour',h:`<table class="ptable"><tr><td><b>at seven o’clock</b></td><td>à 7 heures</td></tr><tr><td><b>on Monday</b></td><td>le lundi</td></tr></table>
<p>Devant une heure, on met <b>at</b> : <b>I get up at seven o’clock.</b> = Je me lève à 7 heures.</p>
<p>Devant un jour, on met <b>on</b> : <b>On Monday, I go to school.</b> = Le lundi, je vais à l’école. On ne dit pas « the Monday ». Et n’oublie pas la majuscule du jour !</p>
<ol><li>Je choisis l’action.</li><li>J’ajoute l’heure avec <b>at</b>, ou le jour avec <b>on</b>.</li><li>Je raconte dans l’ordre de la journée.</li></ol>
<p>Exemple : <b>First, I get up at seven o’clock. Then, I have breakfast. I go to bed at eight o’clock.</b></p>`}],
 try:{q:'Comment dis-tu « Le samedi, je joue » ? Et « Je prends mon petit-déjeuner à 8 heures » ?',a:'Pour un jour, on met on avec une majuscule : « On Saturday, I play. » Pour une heure, on met at : « I have breakfast at eight o’clock. »'},
 adult:'Dessinez ensemble la journée de l’enfant en quatre ou cinq cases (le réveil, le petit-déjeuner, l’école, le coucher). Il raconte chaque case en anglais avec I get up, I go to school… Vérifiez simplement le petit mot devant l’heure (at) et devant le jour (on). Le bouton d’écoute de l’appli donne le bon modèle.',
 culture:{t:'Pourquoi « breakfast » ?',h:`<p>Le mot <b>breakfast</b> est fait de deux mots : <b>break</b> (casser, rompre) et <b>fast</b>, qui veut dire ici « le jeûne », c’est-à-dire le temps où l’on ne mange pas. Pendant la nuit, on ne mange rien : le matin, on « casse le jeûne » !</p><p>Le français a eu exactement la même idée : « déjeuner » vient d’un mot latin qui voulait dire « rompre le jeûne ». Autrefois, le déjeuner était d’ailleurs le repas du matin.</p>`}},
'ce2-en-describe':{
 deep:[{t:'Les mots pour décrire',h:`<table class="ptable"><tr><td><b>tall</b> (tôl)</td><td>grand</td></tr><tr><td><b>short</b> (chort)</td><td>petit</td></tr><tr><td><b>long hair</b> (lonng hèr)</td><td>cheveux longs</td></tr><tr><td><b>short hair</b></td><td>cheveux courts</td></tr><tr><td><b>blond</b> (blonnd)</td><td>blond</td></tr><tr><td><b>brown eyes</b> (braoun aïz)</td><td>yeux marron</td></tr><tr><td><b>glasses</b> (glassiz)</td><td>lunettes</td></tr></table>
<p>Le mot <b>short</b> a deux sens : <b>petit</b> pour une personne (<b>She is short.</b>) et <b>court</b> pour des cheveux (<b>short hair</b>).</p>
<p>Piège : <b>hair</b> (les cheveux) ne prend jamais de s. On dit <b>long hair</b>, pas « long hairs ».</p>`},
 {t:'is ou has got ?',h:`<p>On commence par <b>he</b> (hi) = il, ou <b>she</b> (chi) = elle. Puis on choisit :</p>
<table class="ptable"><tr><td><b>is</b> : la taille</td><td><b>He is tall.</b></td></tr><tr><td><b>has got</b> : yeux, cheveux, lunettes</td><td><b>She has got blue eyes.</b></td></tr></table>
<p><b>He is tall.</b> = Il est grand. <b>She has got blue eyes.</b> = Elle a les yeux bleus. Avec he et she, on dit <b>has got</b>, et non <b>have got</b>.</p>
<p>Comme pour les vêtements, l’adjectif se place <b>avant</b> le nom et ne prend pas de s : <b>blue eyes</b>, <b>long hair</b>.</p>
<ol><li>Je choisis <b>he</b> ou <b>she</b>.</li><li>J’utilise <b>is</b> pour la taille, <b>has got</b> pour les yeux, les cheveux, les lunettes.</li><li>Je place l’adjectif avant le nom.</li></ol>
<p>Exemple : <b>She is short. She has got long blond hair and brown eyes.</b></p>`}],
 try:{q:'Décris Paul en anglais : il est grand et il a des lunettes.',a:'Pour la taille, j’utilise is : « He is tall. » Pour les lunettes, j’utilise has got : « He has got glasses. » Donc : « Paul is tall. He has got glasses. »'},
 adult:'Jouez aux devinettes avec des photos de famille ou des personnages d’un livre : vous décrivez une personne (« She has got long hair. She is tall. ») et l’enfant devine qui c’est. Puis c’est à son tour de décrire. Les mots du cours et le bouton d’écoute vous aident si l’anglais ne vous est pas familier.',
 culture:{t:'L’homme le plus grand de l’histoire',h:`<p>L’homme le plus grand dont on ait mesuré la taille s’appelait <b>Robert Wadlow</b>. Il était américain et mesurait 2,72 m ! Pour le décrire en anglais, on dirait : <b>He is very, very tall!</b></p><p>Il est mort en 1940, à 22 ans. Ses chaussures étaient si grandes qu’il fallait les fabriquer spécialement pour lui. Pour une personne, grand se dit <b>tall</b> ; pour une maison ou un objet, on dit souvent <b>big</b>.</p>`}}
},{lot:'anglais-ce2',grade:'CE2',subject:'anglais',refs:['Langues vivantes étrangères cycles 2 et 3 — programmes en vigueur (BO n°31 du 30 juillet 2020)']});
})(typeof window!=='undefined'?window:globalThis);
