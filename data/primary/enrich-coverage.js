/* Finot Académie — compléments issus de la matrice de couverture officielle 2026-2027 (PRIMARY-COVERAGE-2026-2027.md).
   Chaque bloc comble un attendu du programme qui n'était pas encore réellement entraîné (cours + questions) :
   niveaux de langue, ordre alphabétique et familles de mots (CP-CE2), sens propre / sens figuré (CE1),
   compréhension de l'oral (CE1, CE2, CM2), moitiés et rendu de monnaie (CE1), vocabulaire terme / somme / différence (CE2),
   environnement numérique (CE2), problèmes de dénombrement et d'optimisation (CM1), symétrie axiale (CM1),
   variations des déterminants (CM2), résultats en EPS (CP).
   Programmes : français et mathématiques 2024 (BO n°41 du 31/10/2024) et 2025 (BO n°16 du 17/04/2025) ;
   questionner le monde 2020 (BO n°31 du 30/07/2020) ; EPS 2026 (BO n°22 du 28/05/2026). */
(function(){
'use strict';
const MQ=window.MQPrimary;if(!MQ)return;const E=MQ.enrich;const H=MQ.H;const {R,P,ch,num,shuffle}=H;const T=(t,h)=>({t,h});
const FR={t:'',l:'fr-FR'};const say=t=>({...FR,t});
/* Écoute : le texte n'est pas affiché, il est lu par la synthèse vocale (bouton 🔊, lecture lente 🐢 disponible). */
const ECOUTE=(texte,question,bonne,mauvaises,expl)=>({f:()=>ch(`🎧 Écoute le texte (tu peux le réécouter), puis réponds : <b>${question}</b>`,bonne,mauvaises,{audio:say(texte),expl:`Le texte disait : « ${texte} » ${expl}`,hint:'Réécoute en entier avant de répondre.'})});

/* ===================== FRANÇAIS ===================== */
E('cp-fr-vocabulaire',{w:.4,
 parts:[T('On ne parle pas pareil à tout le monde',`<p>Entre copains, on peut dire <b>« Salut ! »</b> : c’est un mot <b>familier</b>. À la maîtresse, au médecin ou à une personne qu’on ne connaît pas, on dit <b>« Bonjour »</b> : c’est le langage <b>courant</b>, poli avec tout le monde.</p>`),
  T('Ranger les mots dans l’ordre alphabétique',`<p>Pour ranger des mots dans l’<b>ordre alphabétique</b>, on regarde leur <b>première lettre</b> et on suit l’ordre de l’alphabet : a, b, c, d… Exemple : <b>âne</b>, <b>bateau</b>, <b>chat</b>. C’est l’ordre des mots dans un dictionnaire.</p>`),
  T('Les mots qui vont ensemble',`<p>On peut ranger les mots par <b>thème</b> (les fruits, les animaux…) ou par <b>famille</b> : <i>dent</i>, <i>dentiste</i>, <i>dentifrice</i> sont de la même famille.</p>`)],
 r:['« Salut » est familier ; « Bonjour » est courant et poli.','Ordre alphabétique : on regarde la première lettre.'],
 items:[
 ['À qui peux-tu dire « Salut ! » ?','à un copain',['à la directrice','au médecin','à une dame que tu ne connais pas'],'« Salut » est un mot familier : on le dit aux copains.'],
 ['Tu entres chez le médecin. Que dis-tu ?','Bonjour, madame.',['Salut !','Coucou toi !','Yo !'],'Avec une personne qu’on connaît peu, on parle en langage courant et poli : « Bonjour ».'],
 ['Quel mot est familier ?','un bouquin',['un livre','un cahier','une page'],'« Bouquin » est familier ; en langage courant, on dit « un livre ».'],
 ['Quel mot est familier ?','la bagnole',['la voiture','le camion','le vélo'],'« Bagnole » est familier ; en langage courant, on dit « la voiture ».'],
 ['Comment dire « J’ai la trouille » en langage courant ?','J’ai peur.',['J’ai faim.','J’ai chaud.','Je suis content.'],'« Avoir la trouille » est familier ; « avoir peur » est courant.',2],
 ['Quelle lettre vient juste après « b » dans l’alphabet ?','c',['a','d','e'],'a, b, <b>c</b>, d… : dans l’ordre alphabétique, c suit b.'],
 ['Quelle lettre vient juste avant « f » dans l’alphabet ?','e',['g','d','h'],'…, <b>e</b>, f, g : dans l’ordre alphabétique, e est juste avant f.'],
 ['Quel mot vient en premier dans l’ordre alphabétique ?','arbre',['lune','soleil','vélo'],'« arbre » commence par a, la première lettre de l’alphabet.'],
 {o:['âne','bateau','chat'],q:'Range ces mots dans l’ordre alphabétique (regarde la première lettre) :',e:'a (âne), b (bateau), c (chat) : c’est l’ordre alphabétique.'},
 {o:['dent','lapin','moto'],q:'Range ces mots dans l’ordre alphabétique :',e:'d, l, m : on suit l’ordre de l’alphabet.',d:2},
 ['Quel mot est de la même famille que « dent » ?','dentiste',['dinde','danse','dans'],'Dentiste vient de dent : même famille.'],
 ['Quel mot est de la même famille que « jardin » ?','jardinier',['jaune','jambe','joli'],'Jardinier vient de jardin : même famille.'],
 ['Quel mot va avec « fourchette, cuillère » (même thème) ?','couteau',['ballon','nuage','chaussette'],'Fourchette, cuillère, couteau : ce sont des couverts, même thème.'],
 ['Quel mot ne va pas avec les autres : pomme, poire, banane, chaise ?','chaise',['pomme','poire','banane'],'Pomme, poire, banane sont des fruits ; la chaise est un meuble.']]});

E('ce1-fr-synonymes-contraires',{w:.35,
 parts:[T('Les niveaux de langue',`<p>On peut dire la même chose de plusieurs façons :</p><ul class="lst"><li><b>familier</b> (entre copains) : <i>une bagnole</i>, <i>j’ai la trouille</i> ;</li><li><b>courant</b> (avec tout le monde) : <i>une voiture</i>, <i>j’ai peur</i> ;</li><li><b>soutenu</b> (dans les livres, les discours) : <i>une automobile</i>, <i>je suis effrayé</i>.</li></ul>`),
  T('Sens propre et sens figuré',`<p>Au <b>sens propre</b>, un mot veut dire exactement ce qu’il dit : <i>une corde pour attacher le bateau</i>. Au <b>sens figuré</b>, il fait une image : <i>il pleut des cordes</i> = il pleut très fort.</p>`)],
 r:['Familier, courant, soutenu : trois niveaux de langue.','Sens figuré : le mot fait une image.'],
 items:[
 ['« Une bagnole » est un mot…','familier',['courant','soutenu'],'Bagnole (familier) = voiture (courant) = automobile (soutenu).'],
 ['« Une automobile » est un mot…','soutenu',['familier','courant'],'Automobile est le mot soutenu ; voiture est courant ; bagnole est familier.'],
 ['Quel mot est courant ?','une maison',['une baraque','une demeure'],'Baraque est familier, maison est courant, demeure est soutenu.'],
 ['Comment dire « J’ai la trouille » en langage courant ?','J’ai peur.',['J’ai faim.','Je suis fatigué.','J’ai chaud.'],'« La trouille » est familier ; « avoir peur » est courant.'],
 ['Dans une lettre au maire, quelle phrase choisis-tu ?','Madame la maire, je voudrais vous demander un conseil.',['Salut la maire, file-moi un coup de main !','Coucou, ça roule ?'],'Pour écrire à une personne importante, on utilise le langage courant ou soutenu, pas le familier.',2],
 ['Dans « Il pleut des cordes », le mot « cordes » est employé…','au sens figuré',['au sens propre'],'Il ne tombe pas de vraies cordes : cela veut dire qu’il pleut très fort.'],
 ['Dans « Le marin noue la corde du bateau », le mot « corde » est employé…','au sens propre',['au sens figuré'],'C’est une vraie corde : sens propre.'],
 ['« Avoir un cœur de pierre » veut dire…','être dur, ne pas avoir de pitié',['avoir mal au cœur','aimer les cailloux','être très fort'],'Sens figuré : le cœur n’est pas en pierre, la personne est insensible.'],
 ['Dans « Ce gâteau est une bombe ! », le mot « bombe » est employé…','au sens figuré',['au sens propre'],'Le gâteau n’explose pas : cela veut dire qu’il est délicieux (sens figuré, familier).',2],
 ['« Il a la tête dans les nuages » veut dire…','il rêve, il est distrait',['il est très grand','il vole en avion','il a froid'],'Sens figuré : il pense à autre chose.']]});

E('ce2-fr-polysemie',{w:.3,
 parts:[T('Choisir son niveau de langue',`<p>On adapte sa façon de parler à la situation : <b>familier</b> avec les copains, <b>courant</b> avec tout le monde, <b>soutenu</b> pour un discours ou une lettre officielle. Exemple : <i>Il s’est barré</i> (familier) → <i>Il est parti</i> (courant) → <i>Il s’en est allé</i> (soutenu).</p>`)],
 r:['On adapte le niveau de langue (familier, courant, soutenu) à la situation.'],
 items:[
 ['Quelle phrase est en langage soutenu ?','Il s’en est allé.',['Il s’est barré.','Il est parti.'],'Familier : il s’est barré ; courant : il est parti ; soutenu : il s’en est allé.'],
 ['Quelle phrase est en langage familier ?','J’ai pas de fric.',['Je n’ai pas d’argent.','Je ne dispose d’aucune somme.'],'« Fric » et l’oubli de « ne » sont familiers.'],
 ['Tu écris au directeur pour l’inviter à votre spectacle. Quelle formule choisis-tu ?','Nous serions heureux de vous accueillir.',['Viens voir notre truc, c’est trop bien !','Ramène-toi au spectacle !'],'Pour une invitation écrite à un adulte, on utilise un langage courant ou soutenu.'],
 ['« Je suis crevé » se dit en langage courant…','Je suis très fatigué.',['Je suis troué.','Je suis malade.','Je suis en colère.'],'« Crevé » est familier ; « très fatigué » est courant.'],
 ['Avec un copain dans la cour, on peut dire…','T’as vu ce but ?',['Avez-vous aperçu ce but remarquable ?','Veuillez constater ce but.'],'Entre copains, le langage familier ou courant convient.',2],
 ['Remplace le mot familier : « Prête-moi ton bouquin. »','livre',['crayon','manteau','vélo'],'Bouquin (familier) = livre (courant).']]});

E('ce1-fr-comprendre',{w:.3,items:[
 ECOUTE('Ce matin, Zoé a oublié son cartable dans le bus. Heureusement, le chauffeur l’a rapporté à l’école.','Qu’a oublié Zoé ?','son cartable',['son manteau','son goûter','son chien'],'Zoé a oublié son cartable.'),
 ECOUTE('Ce matin, Zoé a oublié son cartable dans le bus. Heureusement, le chauffeur l’a rapporté à l’école.','Qui a rapporté le cartable ?','le chauffeur du bus',['la maîtresse','la maman de Zoé','un policier'],'C’est le chauffeur qui l’a rapporté.'),
 ECOUTE('Pour faire la pâte à crêpes, Malik verse la farine, ajoute les œufs, puis mélange doucement avec le lait.','Que fait Malik en dernier ?','il mélange avec le lait',['il verse la farine','il ajoute les œufs','il mange les crêpes'],'L’ordre est : farine, œufs, puis lait en mélangeant.'),
 ECOUTE('Le chat de Lila s’est caché sous le lit pendant l’orage. Il tremblait de peur à chaque coup de tonnerre.','Pourquoi le chat tremblait-il ?','il avait peur de l’orage',['il avait froid','il était malade','il jouait'],'Il tremblait de peur à cause du tonnerre.'),
 ECOUTE('Demain, la classe ira au musée. Prenez un pique-nique et une casquette, le départ est à huit heures et demie.','À quelle heure est le départ ?','à huit heures et demie',['à huit heures','à neuf heures','à midi'],'Le départ est à huit heures et demie.'),
 ECOUTE('Demain, la classe ira au musée. Prenez un pique-nique et une casquette, le départ est à huit heures et demie.','Que faut-il emporter ?','un pique-nique et une casquette',['un maillot de bain','des patins','un parapluie et des bottes'],'Il faut un pique-nique et une casquette.')]});

E('ce2-fr-comprendre',{w:.25,items:[
 ECOUTE('Arthur voulait offrir des fleurs à sa grand-mère. Mais le fleuriste était fermé. Alors il cueillit des coquelicots au bord du chemin et lui fit un joli bouquet.','Pourquoi Arthur a-t-il cueilli des coquelicots ?','parce que le fleuriste était fermé',['parce qu’il n’aimait pas les roses','parce que sa grand-mère était fleuriste','parce qu’il pleuvait'],'Le fleuriste était fermé, alors il a cueilli des fleurs.'),
 ECOUTE('Arthur voulait offrir des fleurs à sa grand-mère. Mais le fleuriste était fermé. Alors il cueillit des coquelicots au bord du chemin et lui fit un joli bouquet.','Dans ce texte, « lui » désigne…','la grand-mère',['Arthur','le fleuriste','le chemin'],'Il fit un bouquet à sa grand-mère : « lui » reprend « sa grand-mère ».'),
 ECOUTE('Les hérissons dorment tout l’hiver. Avant, ils mangent beaucoup d’insectes et de vers pour faire des réserves de graisse.','Pourquoi les hérissons mangent-ils beaucoup avant l’hiver ?','pour faire des réserves',['parce qu’ils ont froid','pour grandir plus vite','pour nourrir les oiseaux'],'Ils font des réserves de graisse avant de dormir tout l’hiver.'),
 ECOUTE('Les hérissons dorment tout l’hiver. Avant, ils mangent beaucoup d’insectes et de vers pour faire des réserves de graisse.','Ce texte est…','un texte documentaire',['un conte','une recette','un poème'],'Il donne des informations vraies sur un animal : c’est un documentaire.'),
 ECOUTE('Mélanie ouvrit la porte du grenier. Une odeur de poussière la fit éternuer. Au fond, sous une couverture, quelque chose bougeait.','Comment se sent probablement Mélanie à la fin ?','inquiète, curieuse',['très en colère','endormie','triste d’avoir perdu'],'Quelque chose bouge dans le noir : on imagine qu’elle est inquiète et curieuse (information implicite).',2)]});

E('cm2-fr-comprendre',{w:.25,items:[
 ECOUTE('Bulletin météo : ce samedi, de fortes pluies sont attendues sur la Bretagne le matin. Le soleil reviendra l’après-midi, mais le vent restera fort sur les côtes.','Quel temps fera-t-il en Bretagne samedi matin ?','de fortes pluies',['un grand soleil','de la neige','un temps calme et sec'],'Le bulletin annonce de fortes pluies le matin.'),
 ECOUTE('Bulletin météo : ce samedi, de fortes pluies sont attendues sur la Bretagne le matin. Le soleil reviendra l’après-midi, mais le vent restera fort sur les côtes.','Que peut-on conseiller à des promeneurs sur la côte l’après-midi ?','se méfier du vent',['emporter des skis','rester au soleil sans risque','ne pas sortir de la journée à cause de la neige'],'Le soleil revient mais le vent reste fort sur les côtes : il faut s’en méfier (déduction).'),
 ECOUTE('Interview — « Pourquoi avez-vous choisi ce métier ? » — « Petite, je soignais déjà les animaux de la ferme de mes parents. Devenir vétérinaire, c’était une évidence. »','Quel métier exerce la personne interrogée ?','vétérinaire',['agricultrice','journaliste','médecin pour enfants'],'Elle dit : « Devenir vétérinaire, c’était une évidence ».'),
 ECOUTE('Interview — « Pourquoi avez-vous choisi ce métier ? » — « Petite, je soignais déjà les animaux de la ferme de mes parents. Devenir vétérinaire, c’était une évidence. »','Qui pose les questions dans une interview ?','le journaliste',['la personne interrogée','le public','personne'],'Dans une interview, un journaliste interroge une personne.'),
 ECOUTE('Message du répondeur : Bonjour, ici la médiathèque. Le livre que vous aviez réservé, « L’Île au trésor », est arrivé. Vous pouvez venir le chercher jusqu’à vendredi.','Jusqu’à quand peut-on aller chercher le livre ?','jusqu’à vendredi',['jusqu’à lundi','pendant un mois','seulement aujourd’hui'],'Le message dit : jusqu’à vendredi.'),
 ECOUTE('Le renard s’approcha du poulailler en silence. Mais le chien, qui ne dormait que d’un œil, aboya si fort que toute la ferme se réveilla.','Pourquoi le renard n’a-t-il pas réussi ?','le chien a donné l’alerte',['les poules se sont enfuies','le fermier l’attendait','il s’est endormi'],'Le chien a aboyé et a réveillé toute la ferme.'),
 ECOUTE('Le renard s’approcha du poulailler en silence. Mais le chien, qui ne dormait que d’un œil, aboya si fort que toute la ferme se réveilla.','« Ne dormir que d’un œil » signifie…','rester attentif en se reposant',['avoir un œil fermé à cause d’une blessure','dormir très profondément','ne jamais dormir'],'Expression au sens figuré : il se reposait tout en restant attentif.',2)]});

E('cm2-fr-accords',{w:.3,
 parts:[T('Les variations des déterminants',`<p>Le déterminant varie en <b>genre</b> et en <b>nombre</b> avec le nom :</p><ul class="lst"><li>démonstratif : <b>ce</b> livre, <b>cet</b> arbre (devant voyelle ou h muet), <b>cette</b> histoire, <b>ces</b> livres ;</li><li>possessif : <b>mon</b> frère, <b>ma</b> sœur, <b>mes</b> cousins — et <b>mon</b> amie devant une voyelle ;</li><li>article : <b>le</b>, <b>la</b>, <b>l’</b>, <b>les</b> ; <b>un</b>, <b>une</b>, <b>des</b>.</li></ul>`)],
 items:[
 ['Quel déterminant convient : « … arbre est centenaire. »','Cet',['Ce','Cette','Ces'],'Devant un nom masculin qui commence par une voyelle, le déterminant démonstratif est « cet ».'],
 ['Quel déterminant convient : « … histoire m’a fait peur. »','Cette',['Cet','Ce','Ces'],'Histoire est féminin singulier : déterminant démonstratif « cette ».'],
 ['Quel déterminant convient : « J’ai invité … amie Léa. »','mon',['ma','mes','ta amie'],'Devant un nom féminin commençant par une voyelle, on emploie le possessif « mon » : mon amie.'],
 ['Quel déterminant convient : « … hiboux hululent la nuit. »','Ces',['Ce','Cet','Cette'],'Nom au pluriel : déterminant démonstratif « ces ».'],
 ['Dans « leurs cahiers », quel est le déterminant et sa classe ?','leurs : déterminant possessif',['leurs : pronom personnel','cahiers : déterminant','leurs : article défini'],'« Leurs » accompagne le nom cahiers : c’est un déterminant possessif (pluriel).',2],
 ['Mets au pluriel : « cet oiseau »','ces oiseaux',['cets oiseaux','ces oiseau','cettes oiseaux'],'Cet → ces ; oiseau → oiseaux.'],
 ['Mets au féminin : « un voisin attentif »','une voisine attentive',['un voisine attentive','une voisin attentif','une voisine attentif'],'Toute la chaîne s’accorde : déterminant, nom et adjectif.']]});

/* ===================== MATHÉMATIQUES ===================== */
E('ce1-ma-calcul-mental',{w:.3,r:['La moitié d’un nombre pair : je partage en deux parts égales.'],items:[
 {f:d=>{const n=2*R(d===1?2:6,d===1?10:d===2?25:50);return num(`Quelle est la <b>moitié</b> de ${n} ?`,n/2,{expl:`${n/2} + ${n/2} = ${n}, donc la moitié de ${n} est <b>${n/2}</b>.`,hint:'Cherche le nombre qui, ajouté à lui-même, donne ce nombre.'});}},
 {f:d=>{const n=2*R(d===1?3:10,d===1?10:49);return num(`Le <b>double</b> de quel nombre est ${n} ?`,n/2,{expl:`${n/2} + ${n/2} = ${n} : c’est la moitié de ${n}.`,hint:'Cherche la moitié.'});}}]});

E('ce1-ma-monnaie',{w:.3,parts:[T('Rendre la monnaie',`<p>Quand on paie avec plus d’argent que le prix, le marchand <b>rend la monnaie</b> : c’est la différence entre ce qu’on donne et le prix. Exemple : je paie un livre de 7 € avec un billet de 10 € ; on me rend 10 − 7 = <b>3 €</b>.</p>`)],items:[
 {f:d=>{const B=P(d===1?[10]:[10,20,50]);const p=R(2,B-1);return num(`Tu paies avec un billet de <b>${B} €</b> un objet qui coûte <b>${p} €</b>. Combien le marchand te rend-il ?`,B-p,{unit:'€',expl:`${B} − ${p} = <b>${B-p} €</b>.`,hint:'Calcule la différence entre ce que tu donnes et le prix.'});}},
 {f:d=>{const a=R(2,9),b=R(2,9);const B=a+b<10?10:20;return num(`Tu achètes un cahier à <b>${a} €</b> et un stylo à <b>${b} €</b>. Tu paies avec un billet de <b>${B} €</b>. Combien te rend-on ?`,B-a-b,{unit:'€',expl:`Prix total : ${a} + ${b} = ${a+b} €. Monnaie : ${B} − ${a+b} = <b>${B-a-b} €</b>.`,hint:'Calcule d’abord le prix total.'});}}]});

E('ce2-ma-add-sous',{w:.25,parts:[T('Les mots du calcul',`<p>Dans <b>25 + 13 = 38</b>, 25 et 13 sont les <b>termes</b> et 38 est la <b>somme</b>. Dans <b>47 − 12 = 35</b>, 35 est la <b>différence</b> entre 47 et 12.</p>`)],r:['Somme : résultat d’une addition. Différence : résultat d’une soustraction.'],items:[
 ['Dans 25 + 13 = 38, comment s’appelle 38 ?','la somme',['la différence','un terme','le produit'],'Le résultat d’une addition est la somme.'],
 ['Dans 47 − 12 = 35, comment s’appelle 35 ?','la différence',['la somme','un terme','le produit'],'Le résultat d’une soustraction est la différence.'],
 ['Dans 25 + 13 = 38, comment s’appellent 25 et 13 ?','les termes',['les sommes','les différences','les facteurs'],'Les nombres qu’on additionne sont les termes.'],
 {f:d=>{const a=R(d===1?10:100,d===1?60:900),b=R(10,d===1?39:99);return num(`Calcule la <b>somme</b> de ${a} et de ${b}.`,a+b,{expl:`Somme = ${a} + ${b} = <b>${a+b}</b>.`,hint:'Somme : on additionne.'});}},
 {f:d=>{const a=R(d===1?40:200,d===1?99:999),b=R(10,Math.min(a-1,d===1?39:199));return num(`Calcule la <b>différence</b> entre ${a} et ${b}.`,a-b,{expl:`Différence = ${a} − ${b} = <b>${a-b}</b>.`,hint:'Différence : on soustrait le plus petit du plus grand.'});}}]});

E('cm1-ma-problemes',{w:.35,parts:[T('Dénombrer et optimiser',`<p><b>Dénombrer</b>, c’est compter toutes les possibilités sans en oublier : avec 3 hauts et 4 bas, on peut faire 3 × 4 = <b>12 tenues</b> (un arbre ou un tableau aide à les lister).</p><p><b>Optimiser</b>, c’est chercher la meilleure solution : le <b>minimum</b> de boîtes, le <b>maximum</b> d’objets achetés… Attention au reste : pour ranger 40 œufs dans des boîtes de 6, il faut <b>7 boîtes</b> au minimum (6 pleines et une de plus pour les 4 derniers).</p>`)],
 r:['Dénombrer : lister toutes les possibilités (tableau, arbre).','Optimiser : chercher le minimum ou le maximum en tenant compte du reste.'],
 items:[
 {f:d=>{const h=R(2,d===1?3:5),b=R(2,d===1?3:5);return num(`Tu as <b>${h}</b> tee-shirts et <b>${b}</b> pantalons. Combien de tenues différentes (un tee-shirt + un pantalon) peux-tu composer ?`,h*b,{expl:`Chaque tee-shirt va avec chacun des ${b} pantalons : ${h} × ${b} = <b>${h*b}</b> tenues.`,hint:'Fais un tableau : tee-shirts en lignes, pantalons en colonnes.'});}},
 {f:d=>{const e=R(2,4),p=R(2,4),s=d>=2?R(2,3):1;return num(`À la cantine, on choisit une entrée parmi ${e}, un plat parmi ${p}${s>1?` et un dessert parmi ${s}`:''}. Combien de menus différents sont possibles ?`,e*p*s,{expl:`${e} × ${p}${s>1?` × ${s}`:''} = <b>${e*p*s}</b> menus.`,hint:'Multiplie le nombre de choix à chaque étape.'});}},
 {f:d=>{const n=d===1?3:R(4,6);return num(`${n} amis se serrent la main, chacun une seule fois avec chacun des autres. Combien de poignées de main en tout ?`,n*(n-1)/2,{expl:`Chacun serre ${n-1} mains : ${n} × ${n-1} = ${n*(n-1)}, mais chaque poignée est comptée deux fois : ${n*(n-1)} ÷ 2 = <b>${n*(n-1)/2}</b>.`,hint:'Liste-les : A-B, A-C… sans compter deux fois la même.'});}},
 {f:()=>num('Combien de nombres de deux chiffres peut-on écrire avec les chiffres 1, 2 et 3, sans utiliser deux fois le même chiffre dans un nombre ?',6,{expl:'12, 13, 21, 23, 31, 32 : <b>6</b> nombres.',hint:'Choisis le chiffre des dizaines, puis celui des unités.'})},
 {f:d=>{const k=P([6,8,10,12]);const n=k*R(2,6)+R(1,k-1);const q=Math.ceil(n/k);return num(`On range <b>${n}</b> œufs dans des boîtes de <b>${k}</b>. Combien de boîtes faut-il <b>au minimum</b> ?`,q,{expl:`${n} = ${k} × ${q-1} + ${n-k*(q-1)} : ${q-1} boîtes pleines et il reste ${n-k*(q-1)} œufs, il faut donc une boîte de plus : <b>${q}</b> boîtes.`,hint:'N’oublie pas les œufs qui restent.'});}},
 {f:d=>{const pr=R(2,d===1?3:7),B=R(12,d===1?25:60);return num(`Un cahier coûte <b>${pr} €</b>. Tu as <b>${B} €</b>. Combien de cahiers peux-tu acheter <b>au maximum</b> ?`,Math.floor(B/pr),{expl:`${B} = ${pr} × ${Math.floor(B/pr)} + ${B%pr} : tu peux en acheter <b>${Math.floor(B/pr)}</b>${B%pr?` (il te reste ${B%pr} €, pas assez pour un de plus)`:''}.`,hint:'Combien de fois le prix dans ton argent ?'});}},
 {f:()=>{const pl=P([8,9,12]);const n=pl*R(3,6)+R(1,pl-1);const q=Math.ceil(n/pl);return num(`<b>${n}</b> enfants partent en sortie dans des minibus de <b>${pl}</b> places. Combien de minibus faut-il <b>au minimum</b> ?`,q,{expl:`${pl} × ${q-1} = ${pl*(q-1)} places, ce n’est pas assez ; avec ${q} minibus on a ${pl*q} places : il en faut <b>${q}</b>.`,hint:'Tous les enfants doivent avoir une place.'});}}]});

const AXES=[['un carré',4],['un rectangle (qui n’est pas un carré)',2],['un triangle équilatéral',3],['un triangle isocèle (non équilatéral)',1],['un losange (qui n’est pas un carré)',2]];
E('cm1-ma-geometrie',{w:.35,
 parts:[T('La symétrie axiale',`<p>Une figure a un <b>axe de symétrie</b> si, quand on la plie le long de cet axe, les deux parties se superposent exactement. Carré : 4 axes ; rectangle : 2 ; triangle équilatéral : 3 ; triangle isocèle : 1.</p><p>Sur un <b>quadrillage</b>, le symétrique d’un point par rapport à un axe vertical ou horizontal est <b>à la même distance de l’axe, de l’autre côté</b>, sur la même ligne (axe vertical) ou la même colonne (axe horizontal). On compte les carreaux !</p>`)],
 r:['Axe de symétrie : le pliage superpose les deux parties.','Symétrique sur quadrillage : même distance à l’axe, de l’autre côté.'],
 a:['Le symétrique n’est pas la figure « recopiée à côté » : elle est retournée comme dans un miroir.'],
 items:[
 {f:()=>{const [f,n]=P(AXES);return num(`Combien d’axes de symétrie a ${f} ?`,n,{expl:`${f.replace(/^un /,'Un ')} a <b>${n}</b> axe${n>1?'s':''} de symétrie.`,hint:'Imagine tous les pliages qui superposent les deux moitiés.'});}},
 {f:d=>{const k=R(1,d===1?4:7);const g=P(['gauche','droite']);const o=g==='gauche'?'droite':'gauche';return ch(`Sur un quadrillage, l’axe de symétrie est une droite <b>verticale</b>. Le point A est à <b>${k} carreau${k>1?'x':''} à ${g}</b> de l’axe. Où se trouve son symétrique A’ ?`,`à ${k} carreau${k>1?'x':''} à ${o} de l’axe, sur la même ligne`,[`à ${k} carreau${k>1?'x':''} à ${g} de l’axe`,`à ${k+1} carreaux à ${o} de l’axe`,`sur l’axe`],{expl:`Le symétrique est à la même distance de l’axe (${k} carreau${k>1?'x':''}), de l’autre côté : à ${o}.`,hint:'Même distance, autre côté.'});}},
 {f:d=>{const k=R(1,d===1?4:6);const g=P(['au-dessus','en dessous']);const o=g==='au-dessus'?'en dessous':'au-dessus';return ch(`Sur un quadrillage, l’axe de symétrie est une droite <b>horizontale</b>. Le point B est à <b>${k} carreau${k>1?'x':''} ${g}</b> de l’axe. Où se trouve son symétrique B’ ?`,`à ${k} carreau${k>1?'x':''} ${o} de l’axe, sur la même colonne`,[`à ${k} carreau${k>1?'x':''} ${g} de l’axe`,`à ${k*2} carreaux ${o} de l’axe`,`sur l’axe`],{expl:`Même distance à l’axe (${k}), de l’autre côté : ${o}.`,hint:'Compte les carreaux jusqu’à l’axe.'});}},
 {f:d=>{const ax=R(5,9),a=R(1,ax-1);return num(`Sur un quadrillage, les lignes verticales sont numérotées de 0 à 18. L’axe de symétrie est la ligne verticale n° <b>${ax}</b>. Le point C est sur la ligne verticale n° <b>${a}</b>. Sur quelle ligne verticale se trouve son symétrique ?`,2*ax-a,{expl:`C est à ${ax} − ${a} = ${ax-a} carreaux de l’axe ; son symétrique est à ${ax-a} carreaux de l’autre côté : ${ax} + ${ax-a} = <b>${2*ax-a}</b>.`,hint:'Distance à l’axe, puis la même de l’autre côté.'});}},
 {tf:'Le point qui est sur l’axe de symétrie est son propre symétrique.',v:true,e:'Un point de l’axe ne bouge pas quand on plie le long de l’axe.'},
 {tf:'Les diagonales d’un rectangle qui n’est pas un carré sont des axes de symétrie.',v:false,e:'Si on plie un rectangle le long d’une diagonale, les deux moitiés ne se superposent pas.'},
 ['Laquelle de ces lettres majuscules a un axe de symétrie vertical ?','A',['F','G','L'],'Si on plie le A le long d’une droite verticale au milieu, les deux moitiés se superposent.']]});

/* ===================== QUESTIONNER LE MONDE ===================== */
E('ce2-qm-objets',{w:.3,
 parts:[T('L’ordinateur et le numérique',`<p>Un ordinateur permet de <b>saisir</b> (clavier, souris, micro), de <b>traiter</b> (l’ordinateur calcule et range les informations) et de <b>restituer</b> (écran, imprimante, haut-parleurs). Un <b>moteur de recherche</b> aide à trouver des informations sur Internet ; on vérifie toujours la source et on ne donne jamais ses informations personnelles.</p>`)],
 r:['Saisir (clavier, souris), traiter (ordinateur), restituer (écran, imprimante).'],
 items:[
 ['Quel élément sert à écrire un texte sur l’ordinateur ?','le clavier',['l’écran','le haut-parleur','l’imprimante'],'Le clavier sert à saisir les lettres.'],
 ['Quel élément affiche les images et le texte ?','l’écran',['le clavier','la souris','le micro'],'L’écran restitue les images.'],
 ['À quoi sert la souris ?','à déplacer le pointeur et cliquer',['à imprimer','à faire du son','à recharger l’ordinateur'],'La souris déplace le pointeur sur l’écran.'],
 ['À quoi sert un moteur de recherche ?','à trouver des informations sur Internet',['à allumer l’ordinateur','à écrire au stylo','à imprimer des photos'],'On tape des mots-clés et il propose des pages.'],
 ['Quel appareil permet d’obtenir le texte sur une feuille de papier ?','l’imprimante',['le clavier','la souris','le micro'],'L’imprimante restitue le document sur papier.'],
 {tf:'Sur Internet, je peux donner mon adresse et mon mot de passe à quelqu’un que je ne connais pas.',v:false,e:'Jamais : ce sont des informations personnelles. On en parle à un adulte.'},
 ['Pour enregistrer ton texte et le retrouver plus tard, tu…','l’enregistres dans un fichier',['éteins l’écran','débranches le clavier','fermes sans enregistrer'],'On enregistre son travail dans un fichier.',2]]});

/* ===================== EPS (CP) ===================== */
E('cp-eps-courir-sauter',{w:.3,items:[
 {f:d=>{const a=R(4,9),b=a+R(1,5);return num(`Au premier essai, Sami lance le ballon à <b>${a} mètres</b>. Au deuxième essai, à <b>${b} mètres</b>. De combien de mètres a-t-il progressé ?`,b-a,{unit:'m',expl:`${b} − ${a} = <b>${b-a} mètres</b> de mieux : il a progressé !`,hint:'Calcule l’écart entre les deux essais.'});}},
 ['Course de vitesse : Léa met 12 secondes, Max met 15 secondes. Qui a couru le plus vite ?','Léa',['Max','ils sont à égalité'],'Le plus rapide met le moins de secondes : Léa (12 s).'],
 ['Saut en longueur : Inès saute 2 mètres, Tom saute 3 mètres. Qui a sauté le plus loin ?','Tom',['Inès','ils sont à égalité'],'3 mètres, c’est plus loin que 2 mètres.'],
 {tf:'Pour savoir si j’ai progressé, je compare mon résultat d’aujourd’hui avec mon résultat d’avant.',v:true,e:'On mesure ses progrès en comparant ses propres résultats.'}]});

/* ===================== QUESTIONNER LE MONDE (CE1) : premier environnement numérique ===================== */
E('ce1-qm-electricite',{w:.25,
 parts:[T('Découvrir l’ordinateur',`<p>L’ordinateur et la tablette fonctionnent avec l’électricité. Avec le <b>clavier</b> on écrit, avec la <b>souris</b> (ou le doigt sur la tablette) on montre et on clique, l’<b>écran</b> affiche. On demande toujours à un adulte avant d’aller sur Internet.</p>`)],
 items:[
 ['Avec quoi écris-tu des lettres sur l’ordinateur ?','le clavier',['l’écran','la prise','la lampe'],'Le clavier sert à écrire.'],
 ['Qu’est-ce qui affiche les images sur un ordinateur ?','l’écran',['le clavier','la souris','le câble'],'L’écran affiche les images et le texte.'],
 ['Sur une tablette, avec quoi touches-tu l’écran pour choisir ?','le doigt',['le pied','une fourchette','un crayon de couleur'],'L’écran tactile se touche avec le doigt.'],
 {tf:'Avant d’aller sur Internet, je demande à un adulte.',v:true,e:'Un adulte t’accompagne sur Internet.'}]});

/* ===================== LANGUES VIVANTES : suivre une petite histoire (CP, CM1) ===================== */
const EN=t=>({t,l:'en-GB'});const enS=t=>`<span lang="en">${t}</span>`;
const STORY=(texte,question,bonne,mauvaises,expl)=>({f:()=>ch(`🎧 Listen! Écoute la petite histoire en anglais, puis réponds : <b>${question}</b>`,bonne,mauvaises,{audio:EN(texte),expl:`L’histoire : ${enS('« '+texte+' »')} ${expl}`,hint:'Écoute les mots que tu connais.'})});
E('cp-en-animals',{w:.25,items:[
 STORY('Look! A little cat. The cat is hungry. The cat eats a fish. Yummy!','Que mange le chat ?','un poisson',['une souris','une pomme','un gâteau'],'« fish » = poisson.'),
 STORY('This is Ben the dog. Ben is big and brown. Ben likes to run in the garden.','De quelle couleur est le chien Ben ?','marron',['blanc','noir','rouge'],'« brown » = marron.'),
 STORY('Hello, I am a frog. I am green. I jump, jump, jump!','Quel animal parle ?','une grenouille',['un chat','un oiseau','un lapin'],'« frog » = grenouille.')]});
E('cm1-en-routine',{w:.25,items:[
 STORY('Every morning, Emma gets up at seven o’clock. She has breakfast with her brother, then she goes to school by bike.','Comment Emma va-t-elle à l’école ?','à vélo',['en bus','à pied','en voiture'],'« by bike » = à vélo.'),
 STORY('Every morning, Emma gets up at seven o’clock. She has breakfast with her brother, then she goes to school by bike.','À quelle heure Emma se lève-t-elle ?','à sept heures',['à huit heures','à six heures','à midi'],'« seven o’clock » = sept heures.'),
 STORY('On Saturday, Tom plays football with his friends. After the match, they eat pizza at Tom’s house.','Que font les amis après le match ?','ils mangent une pizza chez Tom',['ils regardent un film','ils vont nager','ils dorment'],'« they eat pizza at Tom’s house ».'),
 STORY('It is raining. Lucy can’t go to the park, so she reads a book and draws a picture of her cat.','Pourquoi Lucy ne va-t-elle pas au parc ?','parce qu’il pleut',['parce qu’elle est malade','parce que le parc est fermé','parce qu’il fait nuit'],'« It is raining » = il pleut.')]});
})();
