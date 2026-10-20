/* Finot Académie — CM1 : enrichissement V8.13 (variété des questions + activités hors écran).
   Programmes : français et mathématiques 2025 (BO n°16 du 17/04/2025) ; sciences et technologie 2026 (BO n°24 du 11/06/2026) ;
   histoire-géographie et EPS 2026 (BO n°22 de 2026) ; EMC 2024 ; EVAR 2025 ; arts plastiques et éducation musicale 2020.
   Les activités « hors écran » ne sont pas évaluées par l'application. */
(function(){
'use strict';
const MQ=window.MQPrimary;if(!MQ)return;const E=MQ.enrich;const T=(t,h)=>({t,h});
const HE=(icon,titre,{but,consigne,duree,materiel,securite,auto})=>T(`${icon} ${titre}`,`<p><b>Objectif :</b> ${but}</p><p><b>Consigne :</b> ${consigne}</p><p><b>Durée :</b> ${duree}${materiel?` · <b>Matériel :</b> ${materiel}`:''}</p>${securite?`<p><b>Sécurité :</b> ${securite}</p>`:''}<p><b>Auto-évaluation :</b> ${auto}</p><p><small>Activité à réaliser sans écran. L’application ne la note pas.</small></p>`);
const DICT=w=>({f:()=>MQ.H.txt('🎧 Écoute et écris la phrase :',[w],{audio:{t:w,l:'fr-FR'},strict:true,lang:'fr',chips:['é','è','ê','à','ç','ù'],hint:'Relis : accords, verbes, homophones.',expl:`On écrit : <b>${w}</b>`})});
const TXT=(t,q)=>`<div class="trad">${t}</div>${q}`;

/* ---------- Français ---------- */
const R1='Le marchand regarda la pluie tomber sur le marché désert. Il rangea lentement ses cagettes de pommes, puis compta les quelques pièces de sa journée en soupirant.';
const R2='Quand Nora vit la lettre posée sur son bureau, son cœur se mit à battre. Elle reconnut tout de suite l’écriture penchée de son grand-père.';
E('cm1-fr-comprendre',{items:[
 [TXT(R1,'Pourquoi le marché est-il désert ?'),'à cause de la pluie',['parce que c’est la nuit','parce que le marchand est malade','parce que les pommes sont pourries'],'La pluie tombe : les clients ne sont pas venus.'],
 [TXT(R1,'La journée du marchand a-t-elle été bonne ?'),'non, il a peu gagné',['oui, il a tout vendu','on ne peut pas savoir','oui, il est riche'],'« quelques pièces » et « en soupirant » montrent une mauvaise journée.'],
 [TXT(R1,'Que ressent probablement le marchand ?'),'de la déception',['de la joie','de la colère contre ses clients','de la peur'],'Il soupire : il est déçu.'],
 [TXT(R1,'Que vend le marchand ?'),'des pommes',['des poissons','des livres','des fleurs'],'Il range ses cagettes de pommes.'],
 [TXT(R2,'Que ressent Nora en voyant la lettre ?'),'une forte émotion',['de l’ennui','de la colère','de la fatigue'],'Son cœur se met à battre.'],
 [TXT(R2,'Qui a probablement écrit la lettre ?'),'son grand-père',['Nora','sa maîtresse','le facteur'],'Elle reconnaît l’écriture de son grand-père.'],
 [TXT(R2,'Dans « Elle reconnut », qui est « Elle » ?'),'Nora',['la lettre','l’écriture','la grand-mère'],'Le pronom « elle » reprend Nora.'],
 [TXT(R2,'Le mot « penchée » décrit…'),'l’écriture du grand-père',['Nora','le bureau','la lettre posée'],'Il complète « écriture ».']]});
E('cm1-fr-documentaire',{items:[
 ['Dans un documentaire, à quoi sert l’index en fin de livre ?','à trouver la page d’un mot précis',['à raconter l’histoire','à décorer','à résumer la fin'],'L’index renvoie aux pages.'],
 ['Un texte documentaire sert surtout à…','informer',['faire rire','raconter une histoire inventée','faire peur'],'Il donne des informations vraies.'],
 ['Une photo dans un documentaire est accompagnée d’…','une légende',['un refrain','une morale','un dialogue'],'La légende explique l’image.'],
 ['Pour vérifier une information, je peux…','la comparer avec une autre source',['la croire tout de suite','l’inventer','demander à un inconnu sur Internet'],'Croiser les sources.'],
 ['Un schéma avec des flèches et des noms sert à…','montrer les parties ou le fonctionnement de quelque chose',['raconter une blague','faire une recette','donner la météo'],'Le schéma explique.']]});
E('cm1-fr-litterature',{items:[
 ['Qui a écrit « Le Lièvre et la Tortue » ?','Jean de La Fontaine',['Charles Perrault','Victor Hugo','Jules Verne'],'C’est une fable de La Fontaine.'],
 ['Qui a écrit « Cendrillon » (version française de 1697) ?','Charles Perrault',['La Fontaine','Molière','Hugo'],'Perrault, Contes de ma mère l’Oye.'],
 ['Les frères Grimm ont recueilli…','des contes allemands',['des fables','des romans de science-fiction','des poèmes anglais'],'Blanche-Neige, Hansel et Gretel…'],
 ['Dans une fable, la morale est souvent placée…','au début ou à la fin',['au milieu du titre','dans la couverture','nulle part'],'La morale ouvre ou ferme la fable.'],
 ['Dans un conte, un objet magique peut être…','une baguette ou des bottes de sept lieues',['un téléphone','une voiture','un ordinateur'],'Le merveilleux est typique du conte.'],
 ['Un poème est composé de…','vers et de strophes',['chapitres et paragraphes','scènes et actes','titres seulement'],'Vers et strophes.'],
 ['« Maître Corbeau, sur un arbre perché » : qui parle ensuite pour flatter le corbeau ?','le renard',['le loup','la cigale','la tortue'],'Le renard flatte le corbeau.'],
 ['Les personnages d’une fable sont souvent…','des animaux',['des robots','des extraterrestres','des objets électroniques'],'Ils représentent des défauts humains.']]});
E('cm1-fr-types-formes',{items:[
 ['Mets à la forme négative : « Je vois quelque chose. »','Je ne vois rien.',['Je ne vois pas quelque chose.','Je vois rien.','Je ne vois personne.'],'quelque chose → ne … rien.'],
 ['Mets à la forme négative : « Il a encore faim. »','Il n’a plus faim.',['Il a plus faim.','Il n’a pas encore faim.','Il ne a plus faim.'],'encore → ne … plus.'],
 ['Quelle question est correcte avec l’inversion ?','Viendra-t-il demain ?',['Viendra-il demain ?','Il viendra-t-il demain ?','Viendrat il demain ?'],'On ajoute un t entre deux voyelles.'],
 ['Transforme avec « est-ce que » : « Elle aime le sport. »','Est-ce qu’elle aime le sport ?',['Est-ce que elle aime le sport ?','Aime-t-elle le sport.','Elle aime-t-elle le sport ?'],'Que devient qu’ devant elle.']]});
E('cm1-fr-verbe-sujet',{items:[
 ['Sujet de : « Dans le pré broutent des vaches. »','des vaches',['le pré','broutent','dans'],'Qu’est-ce qui broute ? des vaches (sujet inversé).'],
 ['Sujet de : « Courir me fatigue. »','courir',['me','fatigue','me fatigue'],'Un verbe à l’infinitif peut être sujet.'],
 ['Verbe conjugué de : « Les élèves de CM1 préparent une exposition. »','préparent',['élèves','exposition','CM1'],'Il change avec le temps : préparaient.']]});
E('cm1-fr-complements',{items:[
 ['« Elle offre un livre à son frère. » Quelle est la fonction de « un livre » ?','COD',['COI','CC','sujet'],'Elle offre quoi ? un livre.'],
 ['« Elle offre un livre à son frère. » Quelle est la fonction de « à son frère » ?','COI',['COD','CC','sujet'],'Elle offre à qui ? à son frère.'],
 ['« Le soir, nous lisons au lit. » Quelle est la fonction de « le soir » ?','complément circonstanciel de temps',['COD','sujet','COI'],'Il indique quand et peut être déplacé.'],
 ['« Il parle de ses vacances. » Quelle est la fonction de « de ses vacances » ?','COI',['COD','CC de lieu','sujet'],'Il parle de quoi ? Introduit par « de ».'],
 ['« Il marche lentement. » Quelle est la fonction de « lentement » ?','complément circonstanciel de manière',['COD','COI','sujet'],'Il indique comment.'],
 ['« Les pompiers éteignent l’incendie. » Quelle est la fonction de « l’incendie » ?','COD',['COI','sujet','CC'],'Ils éteignent quoi ?'],
 ['Un complément circonstanciel peut souvent être…','déplacé ou supprimé',['jamais supprimé','toujours au début','un verbe'],'C’est le test du CC.'],
 ['« Il va à Lyon. » « à Lyon » répond à la question…','où ?',['quoi ?','à qui ?','quand ?'],'Il indique le lieu.',2]]});
E('cm1-fr-nature-fonction',{items:[
 ['Dans « Le chat noir dort », quelle est la nature de « noir » ?','adjectif',['nom','verbe','déterminant'],'noir décrit le chat : adjectif.'],
 ['Dans « Le chat noir dort », quelle est la fonction de « noir » ?','épithète du nom chat',['sujet','COD','attribut'],'Il est collé au nom.'],
 ['Dans « Mon frère lit », quelle est la nature de « Mon » ?','déterminant possessif',['pronom','adjectif','nom'],'Mon est un déterminant.'],
 ['Dans « Elle chante », quelle est la nature de « Elle » ?','pronom personnel',['nom','déterminant','verbe'],'Elle remplace un nom.'],
 ['Dans « Elle chante », quelle est la fonction de « Elle » ?','sujet',['COD','COI','épithète'],'Qui est-ce qui chante ? Elle.']]});
E('cm1-fr-pronoms',{items:[
 ['Remplace le COD : « Je prends les clés. »','Je les prends.',['Je leur prends.','Je lui prends.','Je la prends les.'],'les clés → les.'],
 ['Remplace le COI : « Tu parles à ta mère. »','Tu lui parles.',['Tu la parles.','Tu leur parles.','Tu le parles.'],'à ta mère → lui.'],
 ['Remplace le COI : « Nous écrivons aux élèves. »','Nous leur écrivons.',['Nous les écrivons.','Nous leurs écrivons.','Nous lui écrivons.'],'aux élèves → leur (sans s).'],
 ['Remplace le COD : « Il regarde la lune. »','Il la regarde.',['Il lui regarde.','Il le regarde.','Il leur regarde.'],'la lune → la.'],
 ['Remplace le sujet : « Paul et toi venez. »','Vous venez.',['Nous venez.','Ils venez.','Eux venez.'],'Paul et toi → vous.'],
 ['Remplace le COD : « Elle aime son chien. »','Elle l’aime.',['Elle lui aime.','Elle le aime.','Elle leur aime.'],'le devient l’ devant une voyelle.'],
 ['Remplace les deux compléments : « Je donne le livre à Marie. »','Je le lui donne.',['Je lui le donne.','Je la lui donne.','Je le leur donne.'],'le livre → le ; à Marie → lui.',3],
 ['Dans « Nous te voyons », « te » est un pronom…','complément',['sujet','déterminant','adjectif'],'te complète le verbe.'],
 ['Remplace le COI : « Il obéit à ses parents. »','Il leur obéit.',['Il les obéit.','Il leurs obéit.','Il lui obéit.'],'à ses parents → leur.',2],
 ['Où place-t-on le pronom COD à l’impératif affirmatif ? « Prends-… ! »','après le verbe, avec un trait d’union : Prends-le !',['avant le verbe : Le prends !','à la fin de la phrase seulement','on ne peut pas'],'À l’impératif affirmatif, le pronom suit le verbe.',3]]});
E('cm1-fr-gn',{items:[
 ['Nom noyau de « une jolie maison blanche » ?','maison',['jolie','blanche','une'],'Le mot principal est maison.'],
 ['Nom noyau de « le vieux pont de pierre » ?','pont',['vieux','pierre','le'],'« de pierre » complète pont.'],
 ['Dans « un ballon rouge », « rouge » est…','un adjectif épithète',['un nom noyau','un déterminant','un verbe'],'Il est collé au nom.']]});
E('cm1-fr-homophones',{items:[
 ['Complète : « Il … réveille tôt. »','se',['ce'],'se devant un verbe pronominal.'],
 ['Complète : « … matin, il pleut. »','Ce',['Se'],'ce devant un nom.'],
 ['Complète : « Où as-tu mis … chaussures ? » (les tiennes) — choisis','tes',['t’es','taie','thé'],'tes = déterminant possessif.'],
 ['Complète : « Les oiseaux … envolés. »','se sont',['ce sont','se son','ce son'],'Ils s’étaient envolés : se sont.'],
 ['Complète : « Tu viens … tu restes ? »','ou',['où'],'ou bien.'],
 ['Complète : « La ville … je suis né est grande. »','où',['ou'],'où = lieu.'],
 ['Complète : « Il … promène … chien. »','se … son',['ce … sont','se … sont','ce … son'],'se + verbe ; mon chien → son.',2],
 ['Complète : « … livres sont à Léa : ce sont … livres. »','Ces … ses',['Ses … ces','Ces … ces','Ses … ses'],'Ces = ceux-là ; ses = les siens.',3],
 ['Complète : « Nos voisins … un jardin. »','ont',['on'],'Ils avaient un jardin : ont.'],
 ['Complète : « … a gagné le match ! »','On',['Ont'],'Il a gagné → on.']]});
E('cm1-fr-dictee',{items:[DICT('Les feuilles mortes tombent dans le jardin.'),DICT('Nous commençons un nouveau livre.'),DICT('Mes cousines sont parties à la mer.'),DICT('Il appelle ses amis chaque soir.'),DICT('Ces élèves ont fini leurs exercices.'),DICT('Où as-tu rangé ton cahier rouge ?')],w:.45});

/* ---------- Mathématiques ---------- */
E('cm1-ma-angles',{items:[
 {f:()=>{const v=[20,35,45,60,75,89,90,91,110,120,135,150,170][Math.floor(Math.random()*13)];const t=v<90?'aigu':v===90?'droit':'obtus';return MQ.H.ch(`Un angle mesure <b>${v}°</b>. Il est…`,t,['aigu','droit','obtus'].filter(x=>x!==t),{expl:`${v}° ${v<90?'&lt; 90°':v===90?'= 90°':'&gt; 90°'} : angle ${t}.`});}},
 ['Un angle droit mesure…','90°',['45°','180°','100°'],'L’angle droit mesure 90 degrés.'],['L’angle formé par les aiguilles à 3 h est…','droit',['aigu','obtus','plat'],'À 3 h, les aiguilles forment un angle droit.'],
 ['L’angle formé par les aiguilles à 1 h est…','aigu',['droit','obtus','plat'],'Il est plus petit qu’un angle droit.'],['L’angle formé par les aiguilles à 5 h est…','obtus',['aigu','droit','nul'],'Il est plus grand qu’un angle droit.']]});
E('cm1-ma-geometrie',{items:[
 ['Un quadrilatère avec 4 angles droits est…','un rectangle',['un losange quelconque','un triangle','un trapèze quelconque'],'Le rectangle a 4 angles droits.'],
 ['Un triangle avec 3 angles égaux est…','équilatéral',['rectangle','isocèle seulement','quelconque'],'Le triangle équilatéral a 3 angles égaux (60°).',2],
 ['Les diagonales d’un carré sont…','perpendiculaires et de même longueur',['parallèles','de longueurs différentes','courbes'],'Propriété du carré.',2],
 ['Pour tracer une droite parallèle, on peut utiliser…','la règle et l’équerre',['le compas seul','la gomme','le rapporteur seul'],'On glisse l’équerre le long de la règle.'],
 ['Combien de côtés a un hexagone ?','6',['5','8','7'],'Hexa = 6.'],['Combien de côtés a un pentagone ?','5',['6','4','8'],'Penta = 5.'],
 ['Combien de côtés a un octogone ?','8',['6','10','5'],'Octo = 8 (comme un panneau STOP).'],['Un losange a…','4 côtés de même longueur',['4 angles droits obligatoirement','3 côtés','des côtés courbes'],'Le losange a 4 côtés égaux.'],
 ['Deux droites perpendiculaires forment…','4 angles droits',['2 angles aigus','aucun angle','des angles obtus seulement'],'Elles se coupent à angle droit.'],['Le segment qui joue le rôle de « bord » d’un polygone s’appelle…','un côté',['un sommet','un angle','un centre'],'Les côtés se rejoignent aux sommets.']]});
E('cm1-ma-solides',{items:[
 {n:'Combien de faces a un prisme droit à base hexagonale ?',a:8,e:'2 bases + 6 faces latérales.',d:2},{n:'Combien de sommets a une pyramide à base carrée ?',a:5,e:'4 sommets de la base + le sommet principal.'},
 {n:'Combien d’arêtes a une pyramide à base carrée ?',a:8,e:'4 arêtes de base + 4 arêtes latérales.',d:2},{n:'Combien de faces a un pavé droit ?',a:6,e:'6 faces rectangulaires.'},
 ['Quel solide a une seule face plane en forme de disque et un sommet ?','le cône',['le cylindre','la boule','le cube'],'Le cône.'],['Une boîte de Toblerone a la forme…','d’un prisme à base triangulaire',['d’un cube','d’un cylindre','d’une boule'],'Base triangulaire.'],
 ['Un patron de pyramide à base carrée contient…','1 carré et 4 triangles',['6 carrés','2 triangles','5 carrés'],'Base + faces latérales.'],['Un ballon de football a une forme proche…','d’une boule',['d’un cube','d’un pavé','d’un cylindre'],'Il est rond.'],
 ['La face sur laquelle repose une pyramide s’appelle…','la base',['le sommet','l’arête','le patron'],'La base.'],['Un cylindre peut rouler car il a…','une surface courbe',['8 sommets','6 faces carrées','des arêtes droites partout'],'Sa face latérale est courbe.']]});
E('cm1-ma-probabilites',{items:[
 ['Tirer une boule rouge dans un sac qui ne contient que des boules rouges est…','certain',['impossible','peu probable','une chance sur deux'],'Toutes les boules sont rouges.'],
 ['Obtenir un nombre supérieur à 10 avec un dé à 6 faces est…','impossible',['certain','probable','une chance sur deux'],'Le dé va de 1 à 6.'],
 ['Avec une pièce, obtenir « face » a…','une chance sur deux',['une chance sur six','aucune chance','toutes les chances'],'2 issues équiprobables.'],
 {n:'Combien d’issues possibles en tirant une carte parmi les 4 as d’un jeu ?',a:4,e:'4 cartes possibles.'},
 ['Un sac contient 1 boule verte et 9 boules jaunes. Tirer la verte est…','peu probable',['probable','certain','impossible'],'1 chance sur 10.'],
 ['On a obtenu 6 trois fois de suite. Au lancer suivant, obtenir 6 est…','aussi probable qu’avant',['impossible','certain','beaucoup moins probable'],'Le dé n’a pas de mémoire.',2],
 ['Quelle roue donne le plus de chances de tomber sur rouge : 1 secteur rouge sur 4, ou 3 secteurs rouges sur 4 ?','3 secteurs rouges sur 4',['1 secteur rouge sur 4','c’est pareil','on ne peut pas savoir'],'Plus de secteurs rouges = plus de chances.',2],
 ['Une expérience dont on ne peut pas prévoir le résultat est…','aléatoire',['certaine','impossible','régulière'],'Elle dépend du hasard.']]});

/* ---------- Sciences et technologie ---------- */
E('cm1-sc-melanges',{items:[
 ['L’eau boueuse est un mélange…','hétérogène',['homogène'],'On voit la terre dans l’eau.'],['L’eau salée est un mélange…','homogène',['hétérogène'],'On ne distingue plus le sel.'],
 ['Pour séparer l’huile de l’eau, on laisse reposer puis on…','récupère le liquide du dessus',['filtre','tamise','chauffe très fort'],'L’huile reste au-dessus (décantation).',2],
 ['Le sucre qui disparaît dans le thé est…','dissous',['évaporé','détruit','gelé'],'Il est toujours là : le thé est sucré.'],
 ['Quel outil sépare du gravier et du sable ?','un tamis',['un filtre à café','un thermomètre','une balance'],'Le tamis retient les gros grains.'],
 ['Le jus d’orange avec pulpe est un mélange…','hétérogène',['homogène'],'On voit la pulpe.'],
 ['Pour obtenir du sel à partir d’eau de mer, on utilise…','l’évaporation',['la filtration','le tamisage','la décantation'],'Marais salants.'],
 ['Une eau qui ne peut plus dissoudre de sel est…','saturée',['pure','gelée','filtrée'],'La solution est saturée.']]});
E('cm1-sc-lumiere-ombres',{items:[
 ['Le Soleil est à l’ouest (le soir). L’ombre d’un arbre est vers…','l’est',['l’ouest','le sud toujours','nulle part'],'L’ombre est à l’opposé de la source.'],
 ['Plus la source de lumière est proche d’un objet, plus l’ombre portée est…','grande',['petite','transparente','colorée'],'L’ombre grandit quand la lampe s’approche.',2],
 ['Une source de lumière qui produit sa propre lumière est…','une source primaire (Soleil, lampe)',['un miroir','la Lune','un mur blanc'],'La Lune, elle, renvoie la lumière du Soleil.',2],
 ['La lumière se propage…','en ligne droite',['en zigzag','en cercle','seulement vers le bas'],'C’est pourquoi l’ombre se forme.'],
 ['Un objet translucide…','laisse passer une partie de la lumière',['arrête toute la lumière','laisse passer toute la lumière','produit de la lumière'],'Ex. : papier calque.'],
 ['Pour se protéger les yeux du Soleil, on ne le regarde jamais…','directement',['à travers un nuage épais','sur une photo','dans un livre'],'Regarder le Soleil abîme les yeux.']]});
E('cm1-sc-lune',{items:[
 ['La nouvelle lune est…','invisible',['entièrement éclairée','à moitié éclairée','rouge'],'Sa face éclairée n’est pas tournée vers nous.'],
 ['Au premier quartier, on voit…','la moitié de la Lune éclairée',['rien','toute la Lune','un fin croissant toujours'],'Premier quartier : une moitié.'],
 ['Après la pleine lune, la partie éclairée…','diminue',['augmente','reste pareille','disparaît le lendemain'],'On va vers le dernier quartier.'],
 ['La Lune met environ … pour faire le tour de la Terre.','un mois (environ 27 à 29 jours)',['24 heures','un an','une semaine'],'Le cycle des phases dure environ 29,5 jours.'],
 ['La Lune est…','le satellite naturel de la Terre',['une planète','une étoile','un astéroïde géant du Soleil'],'Elle tourne autour de la Terre.'],
 {o:['la nouvelle lune','le premier croissant','le premier quartier','la pleine lune'],q:'Range ces phases dans l’ordre :',e:'nouvelle lune → premier croissant → premier quartier → pleine lune'}]});
E('cm1-sc-ecosystemes',{items:[
 ['Dans une mare, la libellule mange des insectes : elle est…','consommatrice',['productrice','décomposeuse','minérale'],'Elle mange d’autres êtres vivants.'],
 ['Les algues d’une mare sont…','productrices',['consommatrices','carnivores','décomposeuses'],'Elles fabriquent leur matière grâce à la lumière.'],
 ['Les feuilles mortes sont transformées en terre fertile par…','les décomposeurs',['les producteurs','les carnivores','le vent seulement'],'Champignons, bactéries, vers de terre.'],
 ['Planter une haie permet…','d’abriter des oiseaux et des insectes',['de faire disparaître les animaux','de polluer','d’assécher les sols'],'La haie favorise la biodiversité.'],
 ['Si on supprime les producteurs d’un écosystème…','tous les consommateurs finissent par manquer de nourriture',['rien ne change','les animaux grandissent','les décomposeurs disparaissent seuls'],'Toute la chaîne dépend des producteurs.',2],
 ['Le frelon asiatique, introduit par l’être humain, menace…','les abeilles',['les poissons','les arbres','les nuages'],'Il chasse les abeilles.',2]]});
E('cm1-sc-meteo-climat',{items:[
 ['La quantité de pluie se mesure en…','millimètres',['degrés','kilomètres heure','litres par personne'],'Le pluviomètre indique des mm.'],
 ['Le vent vient de l’ouest : la girouette pointe…','vers l’ouest (d’où vient le vent)',['vers l’est toujours','vers le sol','vers le ciel'],'La girouette indique d’où vient le vent.',3],
 ['Le climat de la Bretagne est plutôt…','doux et humide',['très chaud et sec','glacial toute l’année','désertique'],'Climat océanique.'],
 ['Le réchauffement climatique est surtout dû…','aux gaz rejetés par les activités humaines',['aux éclipses','à la Lune','aux volcans uniquement'],'Transports, industries, chauffage.'],
 ['Un bulletin météo prévoit le temps…','des prochains jours',['des 30 dernières années','du siècle prochain','du Moyen Âge'],'La météo concerne le court terme.']]});
E('cm1-sc-cerveau',{items:[
 ['Les messages nerveux voyagent…','par les nerfs',['par le sang seulement','par les os','par l’air'],'Les nerfs transmettent les messages.'],
 ['Retirer vite sa main d’une plaque chaude est…','un réflexe',['un rêve','une décision lente','une maladie'],'Le réflexe est très rapide.',2],
 ['Pour mieux apprendre, il vaut mieux…','revoir plusieurs fois, en faisant des pauses',['tout lire une seule fois très tard','ne jamais dormir','regarder la télé en même temps'],'La répétition espacée aide la mémoire.',2],
 ['Le cerveau a besoin de…','sommeil, d’oxygène et d’une alimentation équilibrée',['seulement de sucre','de bruit','d’écrans'],'Il consomme beaucoup d’énergie.']]});
E('cm1-sc-puberte',{items:[
 ['La puberté commence en général entre…','8 et 14 ans environ',['2 et 4 ans','20 et 30 ans','60 et 70 ans'],'L’âge varie selon chacun.'],
 ['Pendant la puberté, chez tous, on observe…','une forte croissance et l’apparition de poils',['la chute des dents définitives','l’arrêt de la croissance','la perte de la voix'],'Changements communs aux filles et aux garçons.'],
 ['Les changements de la puberté sont provoqués par…','des hormones fabriquées par le corps',['les écrans','la nourriture uniquement','le froid'],'Les hormones agissent comme des messagers.',3],
 ['Pour une question sur son corps, le plus fiable est de demander à…','un adulte de confiance, l’infirmière ou le médecin',['un inconnu en ligne','personne','un jeu vidéo'],'Des personnes compétentes répondent.']]});
E('cm1-sc-programmer-robot',{items:[
 {f:()=>{const n=MQ.H.R(2,6),s=MQ.H.R(1,4);return MQ.H.num(`Un robot exécute : « répéter ${n} fois [avancer de ${s} case${s>1?'s':''}] ». De combien de cases avance-t-il ?`,n*s,{expl:`${n} × ${s} = <b>${n*s}</b> cases.`});}},
 {f:()=>{const k=MQ.H.R(1,4);const dir=['nord','est','sud','ouest'];const fin=dir[k%4];return MQ.H.ch(`Un robot regarde vers le nord et exécute « répéter ${k} fois [tourner à droite d’un quart de tour] ». Vers où regarde-t-il ?`,fin,dir.filter(x=>x!==fin),{expl:`${k} quart(s) de tour à droite depuis le nord : <b>${fin}</b>.`});}},
 ['Un capteur de distance permet au robot de…','détecter un obstacle',['avancer','s’éclairer','se recharger'],'Le capteur mesure la distance.'],
 ['« Si obstacle alors reculer, sinon avancer » est…','une condition',['une boucle','une variable','un moteur'],'Si … alors … sinon.']]});

/* ---------- Histoire-géographie ---------- */
E('cm1-hg-moyen-age',{items:[
 ['Les redevances des paysans étaient…','une part des récoltes ou de l’argent donnés au seigneur',['des cadeaux à l’école','des impôts au roi uniquement','des jeux'],'Les paysans devaient des redevances.'],
 ['Le donjon est…','la tour principale du château fort',['un pont','une église','un champ'],'Le seigneur y habitait et s’y réfugiait.'],
 ['Le moulin et le four du seigneur étaient…','banaux : les paysans devaient payer pour les utiliser',['gratuits','interdits','réservés aux moines'],'Ce sont les banalités.',3],
 ['Les moissons ont lieu…','en été',['en hiver','au printemps','la nuit seulement'],'On récolte le blé en été.'],
 ['Un chevalier était…','un guerrier noble, à cheval',['un paysan','un marchand','un moine'],'Il servait un seigneur.'],
 ['Au Moyen Âge, la plupart des gens vivaient…','à la campagne',['en ville','sur la mer','dans des châteaux'],'Environ 9 personnes sur 10 étaient paysans.'],
 ['Les douves sont…','des fossés remplis d’eau autour du château',['des tours','des chambres','des chevaux'],'Elles protègent le château.'],
 ['Le seigneur rendait…','la justice sur ses terres',['la monnaie aux paysans','des devoirs','les impôts au pape'],'Il jugeait les conflits.']]});
E('cm1-hg-eglise-villes',{items:[
 ['Les bourgeois du Moyen Âge sont…','les habitants des villes (bourgs)',['les nobles','les moines','les paysans'],'Bourg → bourgeois.'],
 ['Les vitraux des cathédrales gothiques…','laissent entrer la lumière colorée',['bloquent la lumière','sont en bois','sont souterrains'],'Ils illustrent des scènes religieuses.'],
 ['Un artisan qui travaille le fer est…','un forgeron',['un boulanger','un tisserand','un meunier'],'Le forgeron forge le métal.'],
 ['Les moines recopiaient les livres…','à la main',['à l’imprimante','à l’ordinateur','à la machine à écrire'],'L’imprimerie n’existait pas encore en Europe.'],
 ['Le style roman date surtout…','des XIe et XIIe siècles',['du XXe siècle','de l’Antiquité','du XVIIIe siècle'],'Puis vient le gothique.']]});
E('cm1-hg-monarchie',{items:[
 ['François Ier a fait construire le château de…','Chambord',['Versailles','Buckingham','Neuschwanstein'],'Chambord, Renaissance.'],
 ['La Joconde a été peinte par…','Léonard de Vinci',['Michel-Ange','Picasso','Monet'],'François Ier l’a accueilli en France.'],
 ['Les guerres de religion opposaient…','catholiques et protestants',['Français et Anglais','paysans et seigneurs','Romains et Gaulois'],'Henri IV y met fin.'],
 ['Louis XIV a régné…','72 ans (1643-1715)',['5 ans','10 ans','100 ans'],'Le plus long règne de l’histoire de France.',2]]});
E('cm1-hg-explorations',{items:[
 ['Vasco de Gama atteint l’Inde par la mer en…','1498',['1789','1515','1945'],'Il contourne l’Afrique.',3],
 ['Les épices (poivre, cannelle) venaient surtout…','d’Asie',['d’Europe du Nord','d’Antarctique','de France'],'On cherchait une route maritime vers l’Asie.'],
 ['Les Amérindiens ont été décimés notamment par…','des maladies apportées d’Europe',['le froid','des volcans','les épices'],'Les maladies et les guerres.'],
 ['L’astrolabe servait à…','se repérer grâce aux étoiles',['peser l’or','faire la cuisine','tirer au canon'],'Instrument de navigation.'],
 ['Le commerce triangulaire reliait…','l’Europe, l’Afrique et l’Amérique',['la France et l’Italie seulement','l’Asie et l’Océanie','l’Europe et l’Antarctique'],'C’est le circuit de la traite.',2]]});
E('cm1-hg-inegalites',{items:[
 ['Le Maroc fait partie de l’aire régionale…','du Maghreb',['de l’Afrique subsaharienne','de l’Asie du Sud-Est','de l’Océanie'],'Maroc, Algérie, Tunisie.'],
 ['Le Sénégal fait partie de…','l’Afrique subsaharienne',['du Maghreb','de l’Europe','de l’Amérique du Sud'],'Au sud du Sahara.'],
 ['Les États-Unis font partie de…','l’Amérique du Nord',['l’Amérique du Sud','l’Europe','l’Océanie'],'Amérique du Nord.']]});
E('cm1-hg-se-deplacer',{items:[
 ['Le TGV relie Paris à Lyon en environ…','2 heures',['20 minutes','2 jours','10 heures'],'La ligne à grande vitesse.',2],
 ['Les marchandises traversent les océans surtout…','en porte-conteneurs',['en train','à vélo','en hélicoptère'],'Le transport maritime est le plus utilisé.',2],
 ['Une gare où l’on peut changer de train, de bus et de métro est…','un pôle d’échanges',['un aéroport seulement','une impasse','un parking'],'Plusieurs transports s’y croisent.',3],
 ['Pour aller de France en Amérique, on utilise surtout…','l’avion',['le vélo','le train','la voiture'],'Il faut traverser l’océan.']]});
E('cm1-hg-internet',{items:[
 ['Un centre de données (data center) sert à…','stocker et traiter les données d’Internet',['fabriquer des téléphones','faire pousser des plantes','produire du pétrole'],'Il contient des milliers d’ordinateurs.'],
 ['La fibre optique transporte les données grâce à…','la lumière',['l’eau','le vent','le son'],'Les données voyagent sous forme de lumière.',2],
 ['Un réseau social permet…','de partager des messages et des images',['de cuisiner','de jardiner','de nager'],'Attention : interdit avant un certain âge.']]});

/* ---------- EMC ---------- */
E('cm1-emc-civisme',{items:[
 ['Voter quand on est adulte, c’est…','un acte civique',['une incivilité','interdit','inutile'],'Le vote est un droit et un devoir civique.'],
 ['Laisser sa place à une femme enceinte dans le bus, c’est…','un geste civique',['une incivilité','un vol','un jeu'],'C’est respecter les autres.'],
 ['Un tag sur un monument est…','une dégradation',['une décoration autorisée','un geste civique','une œuvre protégée'],'C’est interdit et sanctionné.']]});
E('cm1-emc-numerique',{items:[
 ['Éteindre la box Internet la nuit permet…','d’économiser de l’énergie',['d’avoir plus de vidéos','de recharger les piles','de ranger sa chambre'],'Elle consomme même la nuit.'],
 ['Avant de jeter un vieux téléphone, on peut…','le faire réparer, le donner ou le recycler',['le jeter dans la nature','le brûler','le cacher'],'Il contient des métaux à recycler.'],
 ['Regarder un écran juste avant de dormir…','gêne l’endormissement',['aide à dormir','fait grandir','n’a aucun effet'],'La lumière des écrans perturbe le sommeil.']]});
E('cm1-emc-democratie',{items:[
 ['Le délégué de classe est…','élu par les élèves',['choisi par la maîtresse seule','tiré au sort chaque jour','le plus grand'],'Il est élu.'],
 ['Ne pas aller voter s’appelle…','l’abstention',['l’unanimité','la majorité','la monarchie'],'L’abstention.',2],
 ['Le vote blanc, c’est…','voter sans choisir de candidat',['voter deux fois','voter pour le plus âgé','ne pas avoir le droit de voter'],'On met une enveloppe vide ou un bulletin blanc.',3]]});
E('cm1-emc-egalite',{items:[
 ['Refuser un emploi à quelqu’un à cause de son origine est…','une discrimination interdite',['autorisé','un droit','un conseil'],'La loi l’interdit.'],
 ['Les mêmes règles pour tous à l’école, c’est…','l’égalité',['l’injustice','la discrimination','un privilège'],'Égalité de traitement.'],
 ['Un ascenseur pour les personnes en fauteuil roulant permet…','l’égalité d’accès',['une discrimination','un privilège injuste','rien'],'Chacun peut accéder aux lieux.']]});
E('cm1-emc-fraternite',{items:[
 ['Aider un camarade qui ne comprend pas l’exercice, c’est…','de l’entraide',['de la triche toujours','de la moquerie','interdit'],'L’entraide est une forme de fraternité.'],
 ['Les Restos du cœur sont…','une association d’aide alimentaire',['un restaurant de luxe','une école','un club de sport'],'Ils aident les personnes dans le besoin.'],
 ['Écouter quelqu’un qui a une opinion différente, c’est…','faire preuve de tolérance',['perdre','être faible','tricher'],'La tolérance.']]});

/* ---------- Arts, musique, EPS, EVAR ---------- */
E('cm1-ap-bd',{items:[
 ['Le texte placé dans un encadré en haut de la case, qui raconte, s’appelle…','le récitatif',['la bulle','l’onomatopée','la planche'],'Le récitatif donne la voix du narrateur.'],
 ['« Splash ! » est…','une onomatopée',['une bulle de pensée','un récitatif','un titre'],'Elle imite un bruit d’eau.'],
 ['La partie de la bulle qui pointe vers le personnage s’appelle…','l’appendice (la queue de la bulle)',['la case','la planche','le récitatif'],'Elle montre qui parle.',2]],
 parts:[HE('💬','Atelier hors écran : ma planche de BD',{but:'utiliser les codes de la bande dessinée.',consigne:'Invente une histoire en 4 cases : une situation, un problème, une action, une fin. Utilise au moins une bulle de parole, une bulle de pensée et une onomatopée.',duree:'40 minutes',materiel:'feuille partagée en 4 cases, crayons',auto:'Mes 4 cases se suivent, j’ai utilisé les 3 codes demandés.'})]});
E('cm1-ap-couleurs',{items:[
 ['Le vert est la complémentaire du…','rouge',['bleu','jaune','orange'],'Rouge et vert sont face à face.'],
 ['Les couleurs secondaires sont…','orange, vert, violet',['rouge, jaune, bleu','noir, blanc, gris','rose, marron, beige'],'Elles s’obtiennent en mélangeant deux primaires.'],
 ['Van Gogh aimait associer le jaune et le…','violet',['jaune','orange','marron'],'Deux complémentaires qui se renforcent.',2]],
 parts:[HE('🎨','Atelier hors écran : le cercle chromatique',{but:'construire le cercle des couleurs.',consigne:'Dessine un cercle partagé en 6 parts. Peins les 3 primaires (rouge, jaune, bleu) une part sur deux, puis entre elles les secondaires obtenues par mélange. Relie par un trait les couleurs complémentaires.',duree:'40 minutes',materiel:'gouache, pinceau, compas ou assiette',auto:'Mes 6 couleurs sont à la bonne place et je nomme les 3 paires de complémentaires.'})]});
E('cm1-ap-patrimoine',{items:[
 ['Le Mont-Saint-Michel est surtout…','une abbaye médiévale',['un château de la Renaissance','une tour du XIXe siècle','un musée moderne'],'Abbaye du Moyen Âge sur un îlot.'],
 ['Le pont du Gard a été construit par…','les Romains',['les Gaulois du XIXe siècle','Louis XIV','les Vikings'],'Un aqueduc romain.',2],
 ['Visiter des monuments habituellement fermés est possible lors…','des Journées européennes du patrimoine',['de la fête de la musique','du 14 juillet seulement','du jour de l’an'],'En septembre chaque année.']],
 parts:[HE('🏛️','Atelier hors écran : mon monument',{but:'observer et décrire un élément de patrimoine proche.',consigne:'Avec un adulte, choisis un monument de ta ville ou de ta région (église, château, pont, mairie). Dessine sa façade, note son époque et un détail d’architecture (arc, tour, vitrail…).',duree:'variable',materiel:'carnet, crayon',auto:'Mon croquis montre la forme générale et un détail ; je sais dire l’époque.'})]});
E('cm1-mu-formes',{items:[
 ['Une chanson en forme couplet / refrain alterne…','des couplets différents et un refrain répété',['deux refrains seulement','trois silences','un seul couplet'],'C’est la forme la plus courante.'],
 ['Dans un canon, les voix chantent…','la même mélodie en décalé',['des mélodies différentes en même temps','sans musique','à l’envers'],'Le canon.'],
 ['Un rondo répète un refrain A entre des couplets différents : A-B-A-C-A. Combien de fois entend-on A ?','3',['2','4','1'],'A revient 3 fois.',2]],
 parts:[HE('🔁','Activité musicale hors écran : chanter en canon',{but:'tenir sa voix pendant que les autres chantent.',consigne:'Avec deux autres personnes, chantez « Frère Jacques » en canon : chacun démarre deux mesures après le précédent. Recommencez en changeant l’ordre.',duree:'15 minutes',materiel:'aucun',auto:'J’ai tenu ma partie jusqu’au bout sans suivre les autres.'})]});
E('cm1-mu-epoques',{items:[
 ['Le chant grégorien est chanté par…','des moines',['un groupe de rock','un orchestre symphonique','des rappeurs'],'Au Moyen Âge, dans les monastères.'],
 ['Mozart a vécu au…','XVIIIe siècle',['Moyen Âge','XXe siècle','XXIe siècle'],'1756-1791.'],
 ['Vivaldi était un compositeur…','italien',['français','anglais','américain'],'Il était vénitien.',2]],
 parts:[HE('🎻','Activité musicale hors écran : frise sonore',{but:'situer des musiques dans le temps.',consigne:'Écoute avec un adulte un extrait de chant grégorien, des « Quatre Saisons » de Vivaldi et d’une œuvre de Mozart. Place-les sur une frise dessinée et note un mot pour décrire chacune.',duree:'25 minutes',materiel:'enregistrements, feuille',auto:'Mes 3 musiques sont dans le bon ordre et décrites par un mot juste.'})]});
E('cm1-mu-voix',{parts:[HE('🎤','Activité musicale hors écran : ma voix et celles des autres',{but:'reconnaître des tessitures de voix.',consigne:'Écoute des chanteurs (chorale, opéra, chanson). Pour chacun, dis si la voix est aiguë ou grave. Chante ensuite une note très grave puis très aiguë sans forcer.',duree:'15 minutes',materiel:'enregistrements',securite:'ne jamais forcer sur la voix.',auto:'Je classe 3 voix de la plus aiguë à la plus grave.'})]});
E('cm1-eps-performance',{items:[
 ['Le chronométreur…','mesure le temps de course',['court à la place de l’athlète','encourage seulement','mesure la longueur du saut'],'Il déclenche et arrête le chronomètre.'],
 ['Pour un lancer plus loin, on utilise…','une course d’élan et tout le corps',['seulement le poignet','les yeux fermés','une position assise'],'Tout le corps participe.'],
 {f:()=>{const a=MQ.H.R(25,40)/10,b=Math.round((a-MQ.H.R(1,6)/10)*10)/10;return MQ.H.num(`Ton premier saut mesure ${MQ.H.dec(b,1)} m, le second ${MQ.H.dec(a,1)} m. De combien de centimètres as-tu progressé ?`,Math.round((a-b)*100),{unit:'cm',expl:`${MQ.H.dec(a,1)} − ${MQ.H.dec(b,1)} = ${MQ.H.dec(a-b,1)} m = <b>${Math.round((a-b)*100)} cm</b>.`});}}],
 parts:[HE('🏃','Mission hors écran : mon carnet d’athlète',{but:'mesurer ses performances et se fixer un objectif.',consigne:'Sur 3 séances, mesure : ton temps sur 30 m, ton saut à pieds joints, ton lancer de balle. Note tout dans un tableau et fixe un objectif réaliste pour la 3e séance.',duree:'3 × 20 minutes',materiel:'chronomètre, mètre ruban, balle',securite:'échauffement, terrain dégagé, boire de l’eau.',auto:'J’ai noté mes 3 mesures à chaque séance et je compare mes progrès.'})]});
E('cm1-eps-collectifs',{items:[
 ['Au basket, marcher avec le ballon sans dribbler est…','une faute (marcher)',['autorisé','un panier','une passe'],'On doit dribbler en se déplaçant.'],
 ['Au handball, la zone devant le but est réservée…','au gardien',['aux attaquants','à l’arbitre','au public'],'Les joueurs de champ n’y entrent pas.',2],
 ['Après un match, on…','serre la main des adversaires et de l’arbitre',['part sans rien dire','se moque des perdants','conteste toutes les décisions'],'Le fair-play.']],
 parts:[HE('🏀','Mission hors écran : le match à 10 passes',{but:'coopérer pour garder le ballon.',consigne:'En deux équipes, réussissez 10 passes de suite sans que l’autre équipe touche le ballon. Le porteur ne marche pas avec le ballon. Changez d’arbitre à chaque partie.',duree:'20 minutes',materiel:'un ballon, des chasubles',securite:'pas de contact, terrain dégagé.',auto:'Je me suis démarqué pour recevoir et j’ai fait des passes précises.'})]});
E('cm1-eps-velo',{items:[
 ['Le panneau rond rouge avec une barre blanche signifie…','sens interdit',['stop','parking','piste cyclable'],'On ne doit pas s’y engager.'],
 ['Le panneau rond bleu avec un vélo blanc indique…','une piste cyclable obligatoire',['interdit aux vélos','un garage à vélos','une course de vélos'],'Les cyclistes doivent l’emprunter.',2],
 ['La nuit, à vélo, il est obligatoire d’avoir…','un éclairage avant et arrière',['des lunettes de soleil','un klaxon de voiture','des gants'],'Pour voir et être vu.']],
 parts:[HE('🚲','Mission hors écran : le contrôle technique de mon vélo',{but:'vérifier son vélo et rouler en sécurité.',consigne:'Avec un adulte, vérifie : freins, sonnette, lumières, pneus gonflés, casque bien réglé. Puis, dans un lieu sans voitures, entraîne-toi à tendre le bras avant de tourner.',duree:'30 minutes',materiel:'vélo, casque',securite:'lieu sans circulation, casque attaché, adulte présent.',auto:'Mon vélo est vérifié et je signale mes changements de direction.'})]});
E('cm1-evar-changements',{items:[
 ['Pendant la puberté, le sommeil…','reste très important',['devient inutile','doit être supprimé','n’a aucun effet'],'Le corps grandit pendant le sommeil.'],
 ['Se doucher chaque jour pendant la puberté, c’est…','une bonne habitude d’hygiène',['inutile','dangereux','interdit'],'La transpiration augmente.'],
 ['Les changements du corps à la puberté sont…','normaux et différents pour chacun',['une maladie','identiques pour tous','honteux'],'Chacun son rythme.']],
 parts:[HE('🌱','Moment hors écran : ma boîte à questions',{but:'oser poser ses questions sur la puberté.',consigne:'Écris sur des papiers les questions que tu te poses sur ton corps qui grandit. Choisis un adulte de confiance (parent, infirmière scolaire) pour en parler.',duree:'10 minutes',materiel:'papier, une boîte',auto:'J’ai trouvé à qui poser mes questions.'})]});
E('cm1-evar-harcelement',{items:[
 ['Le harcèlement peut se faire…','à l’école et sur Internet',['seulement à la maison','seulement le week-end','seulement entre adultes'],'Il existe aussi en ligne (cyberharcèlement).'],
 ['Pour aider un camarade harcelé, je peux…','rester à ses côtés et alerter un adulte',['l’éviter','rire avec les autres','partager les messages'],'Le soutien et l’alerte aident.'],
 ['Le 3018 est…','gratuit et anonyme',['payant','réservé aux adultes','une application de jeux'],'Numéro national contre le harcèlement.']],
 parts:[HE('🤲','Moment hors écran : la chaîne de soutien',{but:'savoir réagir face au harcèlement.',consigne:'Avec un adulte, imaginez une situation de harcèlement. Écrivez 3 réactions possibles pour le témoin (soutenir, refuser de participer, alerter) et à qui s’adresser (adulte, 3018).',duree:'15 minutes',materiel:'feuille',auto:'Je connais 3 façons d’aider et le 3018.'})]});
E('cm1-evar-egalite',{items:[
 ['« Les filles sont nulles en maths » est…','un stéréotype faux',['une vérité','une règle','une loi'],'Les capacités ne dépendent pas du sexe.'],
 ['Dans une équipe, filles et garçons…','peuvent jouer ensemble à égalité',['doivent être séparés','n’ont pas les mêmes règles','ne peuvent pas jouer'],'L’égalité.'],
 ['Une publicité qui montre seulement des filles avec des poupées…','renforce un stéréotype',['est neutre','lutte contre les stéréotypes','est interdite par la loi'],'Elle associe un jouet à un sexe.',2]],
 parts:[HE('⚖️','Moment hors écran : chasse aux stéréotypes',{but:'repérer les stéréotypes dans les images.',consigne:'Feuillette un catalogue de jouets ou des publicités. Relève 2 images qui associent un jouet ou un métier à un seul sexe, et invente une version égalitaire.',duree:'20 minutes',materiel:'catalogue, crayons',auto:'J’ai trouvé 2 stéréotypes et proposé une image égalitaire.'})]});

/* ---------- Compléments de variété ---------- */
E('cm1-fr-types-formes',{items:[
 ['Mets à la forme négative : « Quelqu’un frappe à la porte. »','Personne ne frappe à la porte.',['Quelqu’un ne frappe pas à la porte.','Personne frappe à la porte.','Ne personne frappe à la porte.'],'quelqu’un → personne ne…',2],
 ['Mets à la forme négative : « Tu as déjà vu la mer. »','Tu n’as jamais vu la mer.',['Tu as jamais vu la mer.','Tu n’as pas déjà vu la mer.','Tu ne as jamais vu la mer.'],'déjà → ne … jamais.'],
 ['« Quelle magnifique vue ! » est une phrase de forme…','exclamative',['négative','interrogative','impérative'],'Elle exprime l’admiration avec « ! ».'],
 ['« Ne cours pas dans le couloir. » est une phrase…','impérative et négative',['interrogative et négative','déclarative et affirmative','exclamative et affirmative'],'Un ordre à la forme négative.',2],
 ['Pose la question avec l’inversion : « Vous aimez le chocolat. »','Aimez-vous le chocolat ?',['Vous aimez-vous le chocolat ?','Aimez vous le chocolat.','Est-ce vous aimez le chocolat ?'],'Verbe-sujet avec un trait d’union.'],
 ['Pose la question avec l’inversion : « Il a terminé. »','A-t-il terminé ?',['A-il terminé ?','Il a-t-il terminé ?','Est-il terminé ?'],'On ajoute -t- entre deux voyelles.',2],
 ['Quel mot interrogatif demande le lieu ?','où',['quand','pourquoi','combien'],'Où ? = le lieu.'],
 ['Quel mot interrogatif demande la cause ?','pourquoi',['comment','où','qui'],'Pourquoi ? = la cause.']]});
E('cm1-fr-dictee',{items:[DICT('Les enfants jouaient dans le parc.'),DICT('Ma grand-mère a cueilli des cerises.'),DICT('Nous mangeons une soupe chaude.'),DICT('Les oiseaux se sont envolés.')],w:.3});
E('cm1-sc-cerveau',{items:[
 ['Les yeux transforment la lumière en messages envoyés au cerveau par…','le nerf optique',['les oreilles','le cœur','les muscles'],'Le nerf optique relie l’œil au cerveau.',2],
 ['Le cerveau se trouve…','dans la boîte crânienne',['dans le ventre','dans la poitrine','dans la jambe'],'Il est protégé par le crâne.'],
 ['Pour se concentrer en faisant ses devoirs, il vaut mieux…','ranger son téléphone et faire une chose à la fois',['regarder une série en même temps','discuter en ligne','écouter la musique très fort'],'L’attention se concentre sur une seule tâche.'],
 ['Le cerveau commande les muscles grâce…','aux nerfs',['au sang seulement','aux os','à la peau'],'Les nerfs transmettent les ordres.'],
 ['Un casque de vélo protège surtout…','le cerveau',['les pieds','l’estomac','les dents'],'Un choc à la tête peut abîmer le cerveau.'],
 ['Apprendre une leçon en plusieurs petites fois, sur plusieurs jours, permet de…','mieux s’en souvenir',['l’oublier plus vite','perdre son temps','fatiguer ses yeux'],'C’est la révision espacée.',2],
 ['Le goût est perçu par…','la langue',['le nez seulement','les oreilles','les yeux'],'La langue capte les saveurs.']]});
E('cm1-sc-puberte',{items:[
 ['À la puberté, la peau peut devenir…','plus grasse (boutons)',['transparente','bleue','plus fine que du papier'],'L’acné est fréquente.'],
 ['Chez les garçons, le changement de voix s’appelle…','la mue',['la chute','la fonte','la germination'],'La voix devient plus grave.'],
 ['Les poils apparaissent notamment…','sous les bras et au pubis',['sur les ongles','sur les dents','sur la langue'],'Chez les filles et les garçons.'],
 ['À la puberté, les filles commencent à avoir…','leurs règles',['une moustache obligatoire','la voix qui mue','des dents de lait'],'Les règles sont un signe de la puberté.'],
 ['Les changements de la puberté rendent le corps capable…','d’avoir plus tard des enfants',['de voler','de ne plus grandir','de ne plus dormir'],'C’est la fonction de la puberté.',2],
 ['Une copine se sent gênée par ses changements. Je…','la respecte et je ne me moque pas',['me moque','en parle à tout le monde','la prends en photo'],'Respect.'],
 ['Pendant la puberté, on grandit parfois de…','plusieurs centimètres par an',['un mètre par mois','rien du tout','un millimètre par an'],'La croissance est rapide.',2]]});
E('cm1-hg-moyen-age',{items:[
 ['Le seigneur vivait des revenus de…','sa seigneurie (terres et paysans)',['son salaire d’ouvrier','ses ventes en ligne','l’école'],'Il vivait de ses terres.'],
 ['Les paysans qui n’étaient pas libres s’appelaient des…','serfs',['chevaliers','abbés','rois'],'Les serfs étaient attachés à la terre du seigneur.',3],
 ['Un village se regroupait souvent autour…','de l’église et du château',['d’une usine','d’une gare','d’un aéroport'],'L’église et le château structuraient le village.']]});
E('cm1-hg-eglise-villes',{items:[
 ['Une foire est…','un grand marché régulier où viennent des marchands de loin',['une fête religieuse seulement','un château','une école'],'Les foires de Champagne étaient célèbres.',2],
 ['Les artisans d’un même métier se regroupaient en…','corporations',['armées','abbayes','seigneuries'],'Les corporations organisaient les métiers.',3],
 ['La cathédrale de Chartres est de style…','gothique',['roman','moderne','antique'],'Elle est célèbre pour ses vitraux.']]});
E('cm1-hg-inegalites',{items:[
 ['L’espérance de vie, c’est…','le nombre moyen d’années que vivent les habitants',['l’âge du président','la taille moyenne','le nombre d’écoles'],'Elle mesure la santé d’une population.',2],
 ['Pour réduire les inégalités d’accès à l’eau, on peut…','construire des puits et des réseaux d’eau potable',['interdire l’eau','vider les rivières','rien faire'],'Les infrastructures donnent accès à l’eau.'],
 ['Dans quelle aire régionale se trouve l’Inde ?','l’Asie du Sud',['l’Europe','le Maghreb','l’Océanie'],'L’Inde est en Asie du Sud.',2],
 ['Dans quelle aire régionale se trouve le Canada ?','l’Amérique du Nord',['l’Amérique du Sud','l’Europe','l’Asie'],'Amérique du Nord.'],
 ['Un enfant qui doit marcher des heures pour aller chercher de l’eau…','a moins de temps pour aller à l’école',['n’est pas concerné par les inégalités','a plus de loisirs','habite forcément en ville'],'Les inégalités se cumulent.',2],
 ['Une ONG (organisation non gouvernementale) comme la Croix-Rouge…','aide les populations en difficulté',['vend des voitures','dirige un pays','fabrique des jeux vidéo'],'Elle agit pour la santé, l’eau, l’éducation.'],
 ['Dans quelle aire régionale se trouve l’Argentine ?','l’Amérique du Sud',['l’Amérique du Nord','l’Afrique subsaharienne','l’Europe'],'Amérique du Sud.']]});
E('cm1-hg-internet',{items:[
 ['Le Wi-Fi permet…','de se connecter à Internet sans fil',['de recharger une pile','de cuisiner','de voler'],'Connexion sans câble.'],
 ['Une adresse de site Internet sécurisée commence par…','https://',['@','#','€'],'Le « s » de https indique une connexion chiffrée.',2],
 ['Un satellite de communication se trouve…','en orbite autour de la Terre',['au fond de la mer','dans une cave','sur la Lune'],'Il tourne autour de la Terre.'],
 ['Le télétravail, c’est…','travailler depuis chez soi grâce à Internet',['travailler la nuit','voyager en train','regarder la télé'],'Un usage d’Internet.'],
 ['Une « zone blanche » est un endroit où…','il n’y a pas ou presque pas de réseau',['il neige toujours','il n’y a pas d’habitants','tout est blanc'],'Pas de couverture mobile ou Internet.'],
 ['Envoyer un message à l’autre bout du monde prend…','quelques secondes',['plusieurs mois','une année','un siècle'],'Internet est presque instantané.'],
 ['Pour protéger sa vie privée sur Internet, on évite de partager…','son adresse et son numéro de téléphone',['son plat préféré','sa couleur préférée','le nom de son animal imaginaire'],'Ce sont des données personnelles.']]});
})();
