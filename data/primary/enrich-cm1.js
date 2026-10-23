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

/* ---------- Vague 1 pédagogie (23/10/2026) : variété des exercices d'EMC et d'histoire-géographie en CM1 ---------- */
E('cm1-emc-civisme',{w:.85,items:[
 ['Le civisme, c’est…','respecter les règles de la vie commune et penser à l’intérêt de tous',['faire ce qu’on veut','ne penser qu’à soi','gagner à tout prix'],'Le civisme sert l’intérêt général.'],
 ['Quel comportement est une incivilité ?','laisser son chien salir le trottoir sans ramasser',['trier ses déchets','aider une personne âgée','tenir la porte'],'Cela gêne les autres et salit l’espace public.'],
 ['Quel geste est civique ?','respecter la file d’attente',['doubler tout le monde','crier dans le bus','taguer un abribus'],'On respecte les autres.'],
 ['Écouter de la musique très fort la nuit est…','une incivilité (le tapage nocturne est même puni)',['un geste civique','une obligation','un droit absolu'],'Le bruit gêne le voisinage.',2],
 ['Pourquoi dit-on qu’une petite incivilité répétée par beaucoup de personnes est grave ?','les effets s’additionnent',['parce qu’elle est très rare','parce qu’elle est amusante','parce qu’elle ne coûte rien'],'Mille papiers jetés salissent toute une rue.',2],
 ['Qui paie souvent le nettoyage d’un mur tagué ?','la collectivité, donc les habitants par leurs impôts',['personne','le mur lui-même','les oiseaux'],'Les dégradations coûtent à tous.',2],
 ['Un mot qui désigne la politesse et les bonnes manières est…','la civilité',['l’incivilité','la rapidité','la timidité'],'Civilité : dire bonjour, merci, céder sa place.',2],
 {tf:'Le civisme se pratique seulement quand un adulte nous regarde.',v:false,e:'Être civique, c’est agir correctement même sans témoin.'},
 {tf:'Trier ses déchets est un geste civique.',v:true,e:'Il protège l’environnement et profite à tous.'},
 {tf:'Une incivilité n’a jamais de conséquence.',v:false,e:'Elle gêne, coûte de l’argent et peut être sanctionnée.'},
 {t:'Complète : un comportement qui nuit à la vie en commun est une … (un mot)',a:['incivilité','incivilite'],e:'Une incivilité.',d:2},
 {o:['Je constate un problème dans le parc','J’en parle à un adulte ou à la mairie','On propose une action utile','Le parc redevient agréable'],q:'Remets dans l’ordre une action citoyenne :',e:'Constater, alerter, agir, profiter du résultat.',d:3},
 ['Pour une dégradation grave d’un bien public, la personne peut devoir…','payer une amende ou réparer',['recevoir un cadeau','gagner un prix','être félicitée'],'Les infractions sont sanctionnées.',3]]});

E('cm1-emc-democratie',{w:.85,items:[
 ['Le mot « démocratie » vient du grec « dêmos », qui signifie…','le peuple',['le roi','l’armée','la loi'],'Démocratie = pouvoir du peuple.',2],
 ['En France, on peut voter aux élections nationales à partir de…','18 ans',['10 ans','14 ans','21 ans'],'La majorité civique est à 18 ans.'],
 ['Pour voter, il faut aussi être…','inscrit sur les listes électorales',['membre d’un club','professeur','propriétaire'],'L’inscription est nécessaire.',2],
 ['Dans un bureau de vote, l’isoloir sert à…','voter en secret',['se reposer','discuter','compter les voix'],'Le vote est secret.'],
 ['Une personne élue pour défendre les intérêts des citoyens est…','un représentant',['un juge','un touriste','un arbitre'],'Les élus représentent les citoyens.',2],
 ['Un référendum, c’est quand…','tous les citoyens répondent directement à une question',['on tire au sort un maire','le président choisit seul','les enfants votent à l’école uniquement'],'La réponse est généralement « oui » ou « non ».',3],
 ['La décision prise par plus de la moitié des voix s’appelle…','la majorité absolue',['l’unanimité','la minorité','l’abstention'],'Plus de la moitié des votes.',3],
 ['Dans un débat, un bon argument…','donne une raison à son avis',['répète plus fort','insulte l’autre','coupe la parole'],'« Je pense que… parce que… ».'],
 {tf:'Le vote est personnel : on ne peut pas voter à la place de quelqu’un sans règle précise.',v:true,e:'Le vote est libre, secret et personnel.'},
 {tf:'En démocratie, la minorité n’a plus aucun droit.',v:false,e:'La minorité doit être respectée.'},
 {tf:'Les femmes votent en France depuis 1944-1945.',v:true,e:'Elles ont voté pour la première fois en 1945.',d:3},
 {n:'À quel âge peut-on voter en France ?',a:18,u:'ans',e:'À 18 ans.'},
 {t:'Complète : le vote est libre, personnel et … (un mot)',a:['secret'],e:'Le vote est secret.',d:2},
 {o:['Je m’informe','Je débats avec des arguments','Je vote','J’accepte le résultat'],q:'Remets dans l’ordre le parcours d’un citoyen avant et après un vote :',e:'On s’informe, on débat, on vote, on respecte le résultat.',d:3}]});

E('cm1-emc-egalite',{w:.85,items:[
 ['La dignité, c’est…','la valeur de toute personne, qui mérite le respect',['la richesse','la célébrité','la force'],'Tous les êtres humains ont la même dignité.'],
 ['Traiter quelqu’un moins bien à cause de sa couleur de peau est…','une discrimination, interdite par la loi',['normal','un jeu','un droit'],'Le racisme est puni par la loi.'],
 ['Un préjugé est…','un jugement porté avant de connaître la personne',['une preuve','une loi','un diplôme'],'Il peut mener à des discriminations.'],
 ['Une rampe d’accès pour un fauteuil roulant permet…','l’égalité d’accès',['la discrimination','le bruit','le gaspillage'],'Elle aide à rendre l’accès possible pour tous.'],
 ['Qui peut aider une personne victime de discrimination ?','le Défenseur des droits',['un arbitre','un commerçant','un chauffeur de bus'],'C’est une autorité indépendante.',2],
 ['Dire « les filles ne savent pas jouer au foot » est…','un stéréotype',['un fait scientifique','une loi','un compliment'],'Un stéréotype est une idée toute faite sur un groupe.',2],
 ['L’article 1 de la Déclaration de 1789 dit que les hommes naissent…','libres et égaux en droits',['riches et puissants','seuls et différents','rois et sujets'],'« Les hommes naissent et demeurent libres et égaux en droits ».',3],
 ['Quelle est la bonne réaction si l’on voit un camarade moqué à cause de son apparence ?','le soutenir et prévenir un adulte',['rire avec les autres','filmer et partager','ne rien dire jamais'],'Il faut aider et alerter.',2],
 {tf:'Traiter tout le monde pareil, c’est toujours assurer l’égalité.',v:false,e:'Parfois il faut adapter (une rampe, du temps en plus) pour que chacun ait les mêmes chances.',d:3},
 {tf:'Refuser un enfant dans un club à cause de son handicap est une discrimination.',v:true,e:'Le handicap est un critère interdit de discrimination.'},
 {tf:'La Déclaration universelle des droits de l’homme date de 1948.',v:true,e:'Adoptée par l’ONU le 10 décembre 1948.',d:3},
 {t:'Complète : traiter quelqu’un plus mal à cause de ce qu’il est s’appelle une … (un mot)',a:['discrimination'],e:'Une discrimination.',d:2},
 {n:'En quelle année Rosa Parks refuse-t-elle de céder sa place dans un bus (1er décembre) ?',a:1955,e:'En 1955, à Montgomery.',d:3}]});

E('cm1-emc-fraternite',{w:.85,items:[
 ['L’empathie permet de…','comprendre ce que l’autre ressent',['gagner un débat','éviter les gens','donner des ordres'],'Se mettre à la place de l’autre.'],
 ['Être tolérant, c’est…','accepter que d’autres pensent ou vivent différemment',['être d’accord avec tout','se taire toujours','imposer son avis'],'La tolérance a des limites : pas de violence.'],
 ['Pour dire son désaccord sans blesser, on peut dire…','« Je ne suis pas d’accord parce que… »',['« Tu es nul ! »','« Tais-toi ! »','rien et bouder'],'On argumente avec respect.'],
 ['La fraternité est…','le troisième mot de la devise de la République',['un jeu de société','un monument','un impôt'],'Liberté, Égalité, Fraternité.'],
 ['Quel geste est fraternel ?','accueillir un nouvel élève',['se moquer de lui','l’ignorer','le pousser'],'La fraternité, c’est l’entraide et l’accueil.'],
 ['Que faire quand un conflit éclate dans la cour ?','se calmer, expliquer ce qu’on ressent, chercher une solution',['se battre','insulter','partir en riant'],'On parle, on écoute, on cherche ensemble.',2],
 ['Un message en « je » est par exemple…','« J’ai été vexé quand tu as pris mon stylo. »',['« Tu es un voleur ! »','« Tu m’énerves ! »','« Tout est de ta faute ! »'],'Parler de soi évite d’accuser.',3],
 ['Tolérer, c’est aussi accepter…','un camarade qui a d’autres goûts',['la violence','le harcèlement','le vol'],'On tolère les différences, jamais la violence.',2],
 {tf:'La tolérance oblige à accepter le harcèlement.',v:false,e:'Le harcèlement est interdit et ne se tolère jamais.'},
 {tf:'Participer à une collecte est un acte de solidarité.',v:true,e:'On aide ceux qui en ont besoin.'},
 {tf:'Être empathique, c’est donner raison à tout le monde.',v:false,e:'On comprend l’autre sans forcément être d’accord.',d:2},
 {t:'Complète : se mettre à la place de l’autre, c’est l’… (un mot)',a:['empathie'],e:'L’empathie.',d:2},
 {o:['Je me calme','Je décris le fait','J’exprime ce que je ressens','On cherche une solution'],q:'Remets dans l’ordre les étapes pour régler un désaccord :',e:'Se calmer, décrire, dire ce qu’on ressent, trouver une solution.',d:3},
 ['Le 16 novembre est la Journée internationale de…','la tolérance',['la musique','la neige','la cuisine'],'Une journée créée par l’ONU après la Déclaration de l’UNESCO de 1995.',3]]});

E('cm1-emc-numerique',{w:.85,items:[
 ['Les données d’Internet sont conservées dans…','des centres de données remplis de serveurs',['le ciel','les montagnes','des cahiers'],'Ce sont des bâtiments qui consomment de l’électricité.'],
 ['Quel geste réduit l’impact du numérique ?','garder et réparer ses appareils',['changer de téléphone chaque année','laisser tout en veille','regarder des vidéos en continu'],'La fabrication est la phase qui pèse le plus.'],
 ['Pourquoi éteindre un appareil plutôt que le laisser en veille ?','pour économiser de l’électricité',['pour l’user','pour le fatiguer','pour gagner des points'],'La veille consomme encore un peu d’énergie.'],
 ['Un temps d’écran trop long peut…','fatiguer les yeux et perturber le sommeil',['faire grandir','améliorer la vue','donner plus de force'],'Il faut faire des pauses.'],
 ['Il vaut mieux ne pas utiliser d’écran juste avant…','de dormir',['de manger une pomme','de jouer dehors','de faire du vélo'],'Les écrans perturbent l’endormissement.',2],
 ['Les mots de passe doivent être…','gardés secrets',['partagés avec les amis','écrits sur l’appareil','identiques partout et connus de tous'],'Un mot de passe est personnel.',2],
 ['Publier la photo d’un camarade sans son accord est…','à éviter : on doit respecter son droit à l’image',['obligatoire','toujours autorisé','une règle de politesse'],'Chaque personne a un droit sur son image.',3],
 ['Quel élément d’un appareil demande des métaux rares ?','les composants électroniques',['le sac de rangement','le chiffon','la boîte en carton'],'Un téléphone contient plusieurs dizaines de métaux.',3],
 {tf:'Envoyer un message ne consomme aucune énergie.',v:false,e:'Il passe par des réseaux et des serveurs qui consomment de l’électricité.'},
 {tf:'Supprimer des fichiers inutiles peut aider à réduire un peu la consommation de stockage.',v:true,e:'Moins de stockage, moins de serveurs sollicités.',d:2},
 {tf:'Il est prudent de donner son adresse à un inconnu en ligne.',v:false,e:'On ne donne jamais ses informations personnelles à un inconnu.'},
 {t:'Complète : utiliser peu d’écrans et d’énergie, c’est la … numérique (un mot)',a:['sobriété','sobriete'],e:'La sobriété numérique.',d:3},
 {n:'En quelle année le premier courriel entre deux machines d’un réseau est-il envoyé (Ray Tomlinson) ?',a:1971,e:'En 1971.',d:3}]});

E('cm1-hg-eglise-villes',{w:.85,items:[
 ['Dans une abbaye vivent…','des moines',['des soldats','des marins','des marchands uniquement'],'Les moines prient, travaillent et recopient des livres.'],
 ['La dîme est…','une part de la récolte versée à l’Église',['une danse','un château','une monnaie des villes'],'Les paysans la versaient à l’Église.'],
 ['La salle où les moines recopient les livres s’appelle…','le scriptorium',['le donjon','la nef','le cloître des enfants'],'Les livres étaient recopiés à la main.',3],
 ['Quel style d’église a de grands vitraux et des voûtes en ogive ?','le gothique',['le roman','le préhistorique','le moderne'],'Les arcs-boutants soutiennent des murs plus fins.',2],
 ['Quel style d’église a des murs épais et de petites fenêtres ?','le roman',['le gothique','le futuriste','le baroque'],'Les murs épais portent la voûte arrondie.',2],
 ['Pourquoi les églises romanes sont-elles sombres ?','les murs épais ne permettent que de petites fenêtres',['elles n’ont pas de toit','elles sont enterrées','leurs murs sont en verre'],'Les murs portent la voûte.',3],
 ['Une ville du Moyen Âge est entourée de…','remparts',['jardins publics','autoroutes','aéroports'],'Ils la protègent.'],
 ['Où les marchands vendent-ils leurs produits dans la ville ?','sur la place du marché',['dans le cloître','à l’abbaye','dans les remparts uniquement'],'Le marché anime la ville.'],
 ['Les foires attirent des marchands de…','toute l’Europe',['la Lune','l’Amérique du Sud uniquement','aucun pays'],'Comme les foires de Champagne.',3],
 {tf:'Au Moyen Âge, presque tout le monde sait lire et écrire.',v:false,e:'Peu de personnes savent lire ; l’Église enseigne.'},
 {tf:'Notre-Dame de Paris est une cathédrale gothique.',v:true,e:'Sa construction commence vers 1163.'},
 {tf:'Les moines vivent seuls dans la forêt, sans règle.',v:false,e:'Ils suivent une règle, par exemple celle de saint Benoît.',d:2},
 {n:'En quelle année la construction de Notre-Dame de Paris commence-t-elle environ ?',a:1163,e:'Vers 1163.',d:3},
 {o:['Art roman','Art gothique'],q:'Remets dans l’ordre d’apparition les deux styles :',e:'Le roman (XIe-XIIe siècles) précède le gothique (XIIe-XVe siècles).',d:2}]});

E('cm1-hg-inegalites',{w:.85,items:[
 ['Le « niveau de vie » désigne…','ce que les habitants peuvent se procurer et auquel ils ont accès',['la taille des habitants','la température','la hauteur des montagnes'],'Eau, santé, éducation, logement…'],
 ['Une eau potable est une eau…','qu’on peut boire sans danger',['bleue','chaude','salée'],'Elle ne rend pas malade.'],
 ['Quelle conséquence peut avoir le manque d’eau potable ?','des maladies et de l’absentéisme à l’école',['plus de vacances','plus d’électricité','moins de maladies'],'Les enfants tombent malades ou doivent aller chercher l’eau.',2],
 ['Combien de personnes environ n’ont pas d’eau potable sûre à domicile ?','environ 2 milliards',['environ 2 000','environ 2 millions','toute la population'],'Selon l’ONU et l’OMS.',2],
 ['Pourquoi des enfants ne vont-ils pas à l’école dans certaines régions ?','pauvreté, éloignement, guerre, travail',['parce qu’ils n’aiment pas apprendre','parce que l’école est interdite à tous','parce qu’il fait trop beau'],'Plusieurs causes se cumulent.',2],
 ['Que signifie ODD ?','objectifs de développement durable',['organisation de défense','offre de droits','ordre des décisions'],'17 objectifs fixés par l’ONU en 2015 pour 2030.',3],
 ['La Journée mondiale de l’eau est le…','22 mars',['1er janvier','14 juillet','25 décembre'],'Une journée de l’ONU.',3],
 ['Dire « tous les habitants d’un continent vivent de la même façon » est…','une généralisation fausse',['une vérité','une loi','une carte'],'Les situations varient beaucoup d’un pays à l’autre.',3],
 {tf:'Les inégalités existent aussi à l’intérieur d’un même pays.',v:true,e:'Par exemple entre une grande ville et une zone isolée.'},
 {tf:'Tous les enfants du monde ont accès à l’école.',v:false,e:'Environ 250 millions d’enfants et de jeunes ne sont pas scolarisés.',d:2},
 {tf:'Partout dans le monde, l’eau coule au robinet.',v:false,e:'Beaucoup de foyers n’ont pas d’eau potable à domicile.'},
 {t:'Complète : le droit d’aller à l’… est l’un des droits de l’enfant (un mot)',a:['école','ecole'],e:'L’école.',d:2},
 {n:'En quelle année l’ONU a-t-elle adopté les 17 objectifs de développement durable ?',a:2015,e:'En 2015.',d:3}]});

E('cm1-hg-internet',{w:.85,items:[
 ['Les câbles sous-marins servent à…','relier les continents pour transporter les données',['pêcher des poissons','alimenter les sous-marins','chauffer l’océan'],'Ils transportent la quasi-totalité des échanges entre continents.'],
 ['Qu’est-ce qu’un satellite de communication ?','un appareil qui relaie des signaux depuis l’espace',['un bateau','une antenne de télévision sur le toit','un câble sous-terrain'],'Il complète les câbles.'],
 ['Le Web (les sites) est…','une des choses qui circulent sur Internet',['le nom de l’océan','une machine à laver','un câble'],'Internet est le réseau ; le Web, un de ses usages.',3],
 ['Où sont stockées de nombreuses données du Web ?','dans des centres de données',['dans des nuages','dans les fils électriques','dans des livres'],'Des bâtiments remplis de serveurs.'],
 ['Pourquoi dit-on que des zones sont « mal couvertes » ?','elles reçoivent peu ou pas de réseau',['elles ont trop de pluie','elles sont recouvertes de neige','elles n’ont pas de maisons'],'Réseau mobile ou fibre insuffisants.',2],
 ['Quelle région a un accès à Internet souvent plus faible ?','certaines régions d’Afrique subsaharienne',['l’Europe du Nord','l’Amérique du Nord','le Japon'],'Mais la situation varie beaucoup d’un pays à l’autre.',3],
 ['Que faire avant de partager une information vue en ligne ?','vérifier la source',['la partager vite','la modifier','l’ignorer toujours'],'Qui, quand, preuve ?',2],
 ['Pour protéger sa vie privée en ligne, on ne communique pas…','son adresse ni son numéro à un inconnu',['sa couleur préférée','le nom d’un dessin animé','l’heure'],'Ce sont des données personnelles.'],
 {tf:'Internet passe surtout par le ciel.',v:false,e:'La plus grande partie du trafic passe par des câbles.'},
 {tf:'Un message envoyé de Lyon vers Montréal peut traverser l’Atlantique par un câble sous-marin.',v:true,e:'Les câbles relient les continents.'},
 {tf:'En France, tout le territoire est parfaitement couvert partout.',v:false,e:'Il reste des zones moins bien couvertes.',d:2},
 {t:'Complète : les signaux voyagent dans des fibres de … (un mot)',a:['verre'],e:'Les fibres optiques sont en verre et transportent de la lumière.',d:3},
 {o:['Ma tablette','La box','Le réseau de l’opérateur','Un câble sous-marin'],q:'Remets dans l’ordre le début du trajet d’un message vers un autre continent :',e:'De l’appareil à la box, puis au réseau, puis au câble sous-marin.',d:3}]});

/* ---------- Lot 2 vague 1 pédagogie (23/10/2026) : variété des exercices d'histoire-géographie au CM1 ---------- */
E('cm1-hg-moyen-age',{w:.85,items:[
 ['Selon le programme, le Moyen Âge va de…','476 à 1492',['1492 à 1789','1000 à 1100','1789 à 1914'],'De la chute de l’Empire romain d’Occident à la découverte de l’Amérique.'],
 ['Les redevances sont…','une part de la récolte donnée au seigneur',['des cadeaux à l’Église','des impôts du roi','des pièces d’or'],'Les paysans les devaient au seigneur.',2],
 ['Un château fort servait à…','protéger et loger le seigneur',['stocker des livres','accueillir des touristes','abriter une école'],'C’était aussi un symbole de puissance.'],
 ['Le travail des paysans suit…','les saisons',['les jours fériés','les vacances','la télévision'],'Labours, semailles, moissons, vendanges.'],
 ['Que mangent surtout les paysans ?','du pain et de la soupe',['des pizzas','des plats surgelés','des glaces'],'Une alimentation simple.'],
 ['Une seigneurie est…','un territoire dominé par un seigneur',['un jardin public','une rivière','un marché'],'Le seigneur protège et juge.'],
 ['Les moissons ont lieu en…','été',['hiver','automne uniquement','printemps'],'On récolte le blé en été.',2],
 {tf:'La plupart des gens au Moyen Âge sont des paysans.',v:true,e:'Environ 9 personnes sur 10.'},
 {tf:'Les corvées sont des jours de travail payés.',v:false,e:'Ce sont des jours de travail gratuit pour le seigneur.'},
 {tf:'Le Moyen Âge dure environ mille ans.',v:true,e:'De 476 à 1492 environ.',d:2},
 {n:'En quelle année prend fin le Moyen Âge selon le programme ?',a:1492,e:'1492.',d:2},
 {o:['Labours','Semailles','Moissons','Vendanges'],q:'Remets dans l’ordre quelques travaux de l’année agricole :',e:'Labours, semailles, moissons, vendanges.',d:3}]});

E('cm1-hg-monarchie',{w:.85,items:[
 ['Quel roi est appelé le Roi-Soleil ?','Louis XIV',['François Ier','Henri IV','Louis XVI'],'Il règne de 1643 à 1715.'],
 ['Quel roi accueille Léonard de Vinci en France ?','François Ier',['Henri IV','Louis XIV','Charlemagne'],'Léonard arrive vers 1516.',2],
 ['Quel roi signe l’édit de Nantes en 1598 ?','Henri IV',['Louis XIV','François Ier','Napoléon'],'Il met fin aux guerres de religion.'],
 ['Où Louis XIV s’installe-t-il avec sa cour ?','à Versailles',['à Chambord','à Lyon','à Marseille'],'Le château de Versailles symbolise son pouvoir.'],
 ['Un monarque absolu est un roi qui…','concentre presque tous les pouvoirs',['partage le pouvoir avec le peuple','n’a aucun pouvoir','est élu'],'Louis XIV est un roi absolu.',2],
 ['Les trois ordres de la société sont…','le clergé, la noblesse, le tiers état',['les rois, les reines, les princes','les paysans, les marins, les soldats','les riches, les pauvres, les enfants'],'La société d’ordres.',2],
 ['Le tiers état comprend…','tous ceux qui travaillent, la majorité de la population',['seulement les nobles','seulement les prêtres','seulement le roi'],'Paysans, artisans, bourgeois.',2],
 ['Le château de Chambord est lié à…','François Ier',['Henri IV','Louis XIV','Louis XVI'],'Un château de la Renaissance.',3],
 {tf:'Louis XIV est le premier roi de France.',v:false,e:'Il y a eu des rois bien avant lui.'},
 {tf:'L’édit de Nantes accorde des droits aux protestants.',v:true,e:'Il ramène la paix religieuse.',d:2},
 {tf:'La noblesse faisait partie du tiers état.',v:false,e:'La noblesse est le deuxième ordre.',d:2},
 {n:'En quelle année Henri IV signe-t-il l’édit de Nantes ?',a:1598,e:'1598.',d:3},
 {o:['François Ier','Henri IV','Louis XIV'],q:'Place ces rois dans l’ordre de leur règne :',e:'François Ier (1515), Henri IV (1589), Louis XIV (1643).',d:2}]});

E('cm1-hg-explorations',{w:.85,items:[
 ['En 1492, Christophe Colomb atteint…','l’Amérique',['l’Australie','l’Antarctique','l’Inde par l’est'],'Il croyait atteindre l’Asie.'],
 ['La caravelle est…','un navire rapide et maniable',['un avion','un train','un char'],'Elle permet de naviguer au grand large.'],
 ['La boussole sert à…','s’orienter',['pêcher','calculer la dette','repérer les orages'],'Son aiguille montre le Nord.'],
 ['Le premier tour du monde est réalisé grâce à l’expédition de…','Magellan',['Napoléon','Louis XIV','Jules César'],'De 1519 à 1522.',2],
 ['Quel aliment a été rapporté d’Amérique ?','la pomme de terre',['la pomme','le riz','le raisin'],'Elle est d’abord cultivée en Amérique.',2],
 ['Le commerce triangulaire relie…','l’Europe, l’Afrique et l’Amérique',['la France, l’Italie et l’Espagne','la Terre, la Lune et le Soleil','Paris, Lyon et Marseille'],'Il est lié à la traite des esclaves.',3],
 ['La traite des esclaves, c’est…','la déportation d’Africains réduits en esclavage',['un échange de cadeaux','un voyage de vacances','un marché de fruits'],'Un crime contre l’humanité.',2],
 ['Les populations amérindiennes ont été touchées par…','des guerres et des maladies venues d’Europe',['seulement des fêtes','une grande prospérité','des voyages en avion'],'Elles ont été décimées.',3],
 {tf:'Christophe Colomb explore l’Amérique pour le compte de la couronne d’Espagne.',v:true,e:'Il part d’Espagne en 1492.',d:2},
 {tf:'La tomate est un légume venu d’Amérique.',v:true,e:'Elle a été rapportée d’Amérique.'},
 {tf:'Les explorations ont eu lieu uniquement au XXe siècle.',v:false,e:'Elles commencent au XVe siècle.'},
 {n:'En quelle année Colomb atteint-il l’Amérique ?',a:1492,e:'1492.'},
 {o:['1492','1519','1685'],q:'Place dans l’ordre : Colomb, début du tour du monde de Magellan, Code noir :',e:'1492, 1519, 1685.',d:3}]});

E('cm1-hg-1789',{w:.85,items:[
 ['Le 14 juillet 1789, les Parisiens prennent…','la Bastille',['le Louvre','Versailles','la tour Eiffel'],'La Bastille est une prison-forteresse.'],
 ['Les cahiers de doléances servent à…','noter les plaintes et les demandes du peuple',['écrire des recettes','compter les soldats','calculer les impôts'],'Rédigés au printemps 1789.',2],
 ['La nuit du 4 août 1789…','les privilèges sont abolis',['le roi s’enfuit','la guerre commence','Napoléon est couronné'],'Fin des privilèges.',2],
 ['La Déclaration des droits de l’homme et du citoyen est adoptée le…','26 août 1789',['14 juillet 1789','4 août 1789','5 mai 1789'],'Elle proclame les droits.'],
 ['Les États généraux réunissent…','les trois ordres',['seulement les nobles','seulement le roi','seulement les villes'],'Clergé, noblesse, tiers état.',2],
 ['Qui sont les philosophes des Lumières ?','Voltaire, Rousseau, Montesquieu, Diderot',['Louis XIV, Colbert, Vauban','Napoléon, Murat, Ney','Pasteur, Curie, Edison'],'Ils défendent la raison et la liberté.',2],
 ['Pourquoi le peuple est-il mécontent en 1789 ?','le pain est cher et les impôts pèsent sur le tiers état',['il y a trop de fêtes','les routes sont trop larges','l’école est gratuite'],'Les privilégiés ne paient pas les mêmes impôts.',2],
 {tf:'Le 14 juillet 1789 correspond à la prise de la Bastille.',v:true,e:'Symbole de la fin de l’arbitraire.'},
 {tf:'La Révolution de 1789 renforce la monarchie absolue.',v:false,e:'Elle met fin à la monarchie absolue et à la société d’ordres.'},
 {tf:'Le premier article de la DDHC parle d’égalité en droits.',v:true,e:'« Les hommes naissent et demeurent libres et égaux en droits ».',d:2},
 {n:'En quelle année éclate la Révolution française ?',a:1789,e:'En 1789.'},
 {o:['5 mai : États généraux','14 juillet : prise de la Bastille','4 août : abolition des privilèges','26 août : DDHC'],q:'Remets ces événements de 1789 dans l’ordre :',e:'5 mai, 14 juillet, 4 août, 26 août.',d:3}]});

E('cm1-hg-se-nourrir',{w:.85,items:[
 ['Un produit agricole est…','un produit qui sort directement de la ferme',['un produit de l’usine','un produit chimique','un jouet'],'Lait, blé, pomme.'],
 ['Un yaourt est…','un produit transformé',['un produit agricole','un fruit','un légume'],'Fabriqué à partir du lait.'],
 ['La sous-nutrition, c’est…','ne pas manger assez',['manger trop sucré','manger trop de légumes','manger trop vite'],'Manque de nourriture.'],
 ['La malnutrition, c’est…','une alimentation déséquilibrée',['ne rien boire','manger des légumes','faire du sport'],'Trop ou pas assez de certains aliments.',2],
 ['Dans quel ordre passe le lait pour devenir du yaourt ?','vache, lait, laiterie, magasin',['magasin, vache, laiterie','laiterie, vache, magasin','lait, magasin, vache'],'Chaîne de production.',2],
 ['Quel aliment de base est très consommé en Asie ?','le riz',['la pomme de terre uniquement','le fromage','le chocolat'],'Beaucoup de peuples en Asie en consomment tous les jours.',2],
 ['Pourquoi dit-on que la répartition de la nourriture est inégale ?','certains mangent trop, d’autres pas assez',['tout le monde mange pareil','personne ne mange','tous mangent à la cantine'],'Il y a des inégalités.',2],
 {tf:'Le biscuit est un produit agricole.',v:false,e:'Il est fabriqué en usine à partir de produits agricoles.'},
 {tf:'La malnutrition existe aussi dans les pays riches.',v:true,e:'Trop de sucre ou de gras est aussi un déséquilibre.',d:2},
 {tf:'Le blé est utilisé pour fabriquer la farine.',v:true,e:'Puis le pain.'},
 {t:'Complète : le blé permet de fabriquer la … (un mot)',a:['farine'],e:'La farine.',d:2},
 {o:['Le blé est récolté','Il devient farine','La boulangerie fait le pain','Je mange du pain'],q:'Remets dans l’ordre du champ à l’assiette :',e:'Récolte, farine, pain, repas.',d:3}]});

E('cm1-hg-se-deplacer',{w:.85,items:[
 ['L’avion a besoin d’…','un aéroport',['une gare','un port','une station de métro'],'L’aéroport est l’infrastructure de l’avion.'],
 ['Le bateau a besoin d’…','un port',['un aéroport','une gare','une station'],'Le port accueille les bateaux.'],
 ['Le train a besoin d’…','une gare et de voies ferrées',['un port','un stade','une piscine'],'Les rails guident le train.'],
 ['Pour une très longue distance, vers un autre continent, on choisit souvent…','l’avion',['la marche','le vélo','la trottinette'],'Il est rapide sur de longues distances.'],
 ['Pour aller à l’école à 300 m, le plus simple est…','la marche',['l’avion','le bateau','le TGV'],'La marche est adaptée aux courtes distances.'],
 ['Une voie cyclable est faite pour…','les vélos',['les camions','les avions','les trains'],'Elle protège les cyclistes.'],
 ['Le temps de trajet dépend…','du mode de transport choisi',['seulement de la couleur du véhicule','du poids de ton sac','de ton prénom'],'Même distance, durées différentes.',2],
 ['Paris-Marseille par la route fait environ…','775 km',['7 km','77 km','7 750 km'],'La distance ne change pas selon le véhicule.',3],
 {tf:'La distance en kilomètres change selon que l’on va en train ou en avion.',v:false,e:'La distance est la même environ ; c’est la durée qui change.',d:2},
 {tf:'Le métro est un transport urbain.',v:true,e:'Il circule dans les grandes villes.'},
 {tf:'Le port est l’infrastructure du train.',v:false,e:'C’est la gare.'},
 {n:'Combien de kilomètres environ séparent Paris et Marseille par la route ?',a:775,u:'km',e:'775 km environ.',d:3},
 {o:['Je choisis un mode de transport','Je rejoins la gare ou l’aéroport','Je voyage','J’arrive à destination'],q:'Remets dans l’ordre les étapes d’un voyage :',e:'Choisir, rejoindre, voyager, arriver.',d:2}]});

/* ---------- Lot 2 vague 1 pédagogie (23/10/2026) : variété des exercices de français en CM1 ---------- */
{
const TXT=(t,q)=>`<div class="trad">${t}</div>${q}`;
const V1='Tous les soirs, Inès regardait par la fenêtre. Le facteur passait devant chez elle sans s’arrêter. Elle avait écrit à son grand-père trois semaines plus tôt. Ce matin-là, une enveloppe bleue dépassait de la boîte aux lettres. Inès dévala l’escalier sans prendre le temps d’enfiler ses chaussons.';
const V2='Le petit renard n’osait pas quitter le terrier. Dehors, le vent faisait claquer les branches et la nuit semblait remplie de bruits inquiétants. « Viens, dit sa mère doucement. Je serai juste derrière toi. » Alors il posa une patte, puis l’autre, et le monde lui parut soudain moins effrayant.';
E('cm1-fr-comprendre',{w:.85,items:[
 [TXT(V1,'Qu’attend Inès chaque soir ?'),'la réponse de son grand-père',['une visite du facteur pour un colis','un cadeau d’anniversaire','le retour de ses parents'],'Elle lui avait écrit : elle attend sa réponse (implicite).',2],
 [TXT(V1,'Pourquoi descend-elle l’escalier sans enfiler ses chaussons ?'),'elle est impatiente',['elle a froid','elle est fâchée','elle est fatiguée'],'Elle se précipite : on déduit son impatience.',2],
 [TXT(V1,'Depuis combien de temps Inès a-t-elle écrit à son grand-père ?'),'trois semaines',['trois jours','trois mois','un an'],'Information explicite : « trois semaines plus tôt ».'],
 [TXT(V1,'De quelle couleur est l’enveloppe ?'),'bleue',['rouge','verte','jaune'],'Information explicite.'],
 [TXT(V1,'Dans le texte, « elle » désigne…'),'Inès',['le facteur','la fenêtre','l’enveloppe'],'Le pronom reprend le personnage.'],
 [TXT(V2,'Pourquoi le petit renard n’ose-t-il pas sortir ?'),'il a peur de ce qu’il y a dehors',['il est malade','il veut dormir','il n’a pas de mère'],'Vent, nuit, bruits inquiétants.'],
 [TXT(V2,'Qui prononce la phrase « Viens » ?'),'la mère du renard',['le petit renard','le narrateur','le vent'],'Les guillemets indiquent la parole ; « dit sa mère » donne le locuteur.'],
 [TXT(V2,'À quoi servent les paroles de la mère ?'),'à rassurer son petit',['à le gronder','à le punir','à le faire fuir'],'« Je serai juste derrière toi. »',2],
 [TXT(V2,'Comment se sent le renard à la fin du texte ?'),'rassuré',['en colère','jaloux','affamé'],'Le monde lui parut moins effrayant.',2],
 {o:['Situation initiale','Élément perturbateur','Péripéties','Résolution','Situation finale'],q:'Remets dans l’ordre les étapes du schéma d’un récit :',e:'Situation initiale, élément perturbateur, péripéties, résolution, situation finale.',d:3},
 {tf:'Une information implicite est écrite mot pour mot dans le texte.',v:false,e:'Une information implicite se déduit des indices.'},
 {tf:'Pour justifier une réponse, on s’appuie sur des indices du texte.',v:true,e:'On cite le texte.'}]});

E('cm1-fr-documentaire',{w:.85,items:[
 [TXT('La baleine bleue est le plus grand animal connu. Elle mesure jusqu’à 30 mètres et peut peser jusqu’à 150 tonnes. Elle se nourrit de krill, de minuscules animaux qui ressemblent à de petites crevettes.','De quoi se nourrit la baleine bleue ?'),'de krill',['de poissons géants','d’algues','de requins'],'Information explicite.'],
 [TXT('La baleine bleue est le plus grand animal connu. Elle mesure jusqu’à 30 mètres et peut peser jusqu’à 150 tonnes. Elle se nourrit de krill, de minuscules animaux qui ressemblent à de petites crevettes.','Combien mesure au maximum la baleine bleue ?'),'30 mètres',['3 mètres','150 mètres','15 mètres'],'Information explicite du texte.'],
 ['Un texte documentaire sert à…','donner des informations vraies sur un sujet',['raconter une histoire inventée','faire rire','faire rimer des mots'],'Il informe.'],
 ['Quel élément explique une image ?','la légende',['le titre','le sommaire','l’index'],'Elle se place près de l’image.'],
 ['Quel élément explique les mots difficiles à la fin d’un livre ?','le glossaire',['la légende','l’intertitre','le titre'],'Glossaire : mini-dictionnaire du livre.'],
 ['Pour trouver rapidement la page d’un mot précis (« koala »), on utilise…','l’index',['la légende','le titre','la préface'],'Index : mots classés par ordre alphabétique avec les pages.',2],
 ['Le sommaire d’un livre indique…','les grandes parties et leurs pages',['les mots difficiles','le résumé de l’histoire','l’auteur uniquement'],'Il est au début ou à la fin du livre.'],
 ['Un intertitre sert à…','annoncer le sujet d’une partie du texte',['donner le nom de l’auteur','remplacer le texte','faire une image'],'Il découpe le texte en parties.'],
 ['Dans un texte documentaire, un tableau permet de…','comparer des informations',['raconter une histoire','faire des rimes','inventer des personnages'],'Il présente des données organisées.',2],
 {tf:'Un schéma peut illustrer un phénomène dans un documentaire.',v:true,e:'Il aide à comprendre.'},
 {tf:'Un documentaire raconte toujours une histoire inventée.',v:false,e:'Il informe sur la réalité.'},
 {tf:'Le titre annonce le sujet du texte.',v:true,e:'C’est sa fonction.'},
 {t:'Complète : le mini-dictionnaire à la fin d’un livre s’appelle le … (un mot)',a:['glossaire'],e:'Le glossaire.',d:2}]});

E('cm1-fr-litterature',{w:.85,items:[
 ['Qui a écrit Le Corbeau et le Renard ?','Jean de La Fontaine',['Charles Perrault','Victor Hugo','Molière'],'Fables du XVIIe siècle.'],
 ['Qui a écrit Le Petit Chaperon rouge dans sa version française classique ?','Charles Perrault',['La Fontaine','Jules Verne','Molière'],'Contes de Perrault, 1697.',2],
 ['Qui a écrit Blanche-Neige (version célèbre) ?','les frères Grimm',['La Fontaine','Perrault','Molière'],'Contes allemands.',2],
 ['Une fable se termine souvent par…','une morale',['un dessin','une recette','un tableau'],'Elle donne une leçon.'],
 ['Un poème est écrit en…','vers',['chapitres','scènes','paragraphes'],'Chaque ligne est un vers.'],
 ['Un groupe de vers s’appelle…','une strophe',['un chapitre','un acte','une scène'],'Strophes séparées par un blanc.'],
 ['Deux mots riment quand…','ils se terminent par le même son',['ils ont le même sens','ils ont la même première lettre','ils sont très courts'],'Exemple : chat et rat.'],
 ['« Il était une fois… » commence souvent…','un conte',['une fable seulement','un documentaire','un article de journal'],'Début typique du conte.'],
 ['Les animaux qui parlent et se comportent comme des humains, on les trouve dans…','les fables',['les documentaires','les modes d’emploi','les journaux'],'La Fontaine.',2],
 ['« Rien ne sert de courir ; il faut partir à point » est la morale de…','Le Lièvre et la Tortue',['Le Corbeau et le Renard','La Cigale et la Fourmi','Le Loup et l’Agneau'],'Il faut s’y prendre à temps.',2],
 {tf:'Un poème doit toujours rimer.',v:false,e:'Il peut être en vers libres, sans rimes.'},
 {tf:'Un conte merveilleux comporte des éléments magiques.',v:true,e:'Fées, objets enchantés.'},
 {tf:'La Fontaine a vécu au XVIIe siècle.',v:true,e:'1621-1695.',d:3},
 {t:'Complète : un groupe de vers dans un poème s’appelle une … (un mot)',a:['strophe'],e:'Une strophe.',d:2}]});

E('cm1-fr-lexique-derivation',{w:.85,items:[
 ['Quel mot est de la famille de « terre » ?','terrain',['terrible','terminer','tonnerre'],'Le radical terr-.',2],
 ['Quel mot est de la famille de « mer » ?','marin',['mercredi','merci','merle'],'Radical mar-/mer- : marin, marée.',2],
 ['Quel mot est de la famille de « fleur » ?','fleuriste',['fleuve','flou','flotte'],'Fleur, fleurir, fleuriste.',2],
 ['Quel est l’intrus dans la famille de « lait » ?','laid',['laitier','laitage','allaiter'],'Laid n’a pas de rapport avec lait.',2],
 ['Que signifie le préfixe « anti- » ?','contre',['avant','de nouveau','sur'],'Antivol : contre le vol.'],
 ['Que signifie le préfixe « sur- » dans « surcharger » ?','trop, au-dessus',['de nouveau','contre','petit'],'Charger trop.'],
 ['Que signifie le suffixe « -able » ?','qu’on peut',['qui est petit','celui qui','de nouveau'],'Lavable : qu’on peut laver.'],
 ['Que signifie le suffixe « -ier » dans « pommier » ?','l’arbre qui donne des pommes',['la pomme','le jus de pomme','le marchand'],'Nom d’arbre.',2],
 ['Le contraire de « lisible » est…','illisible',['inlisible','dilisible','relisible'],'Devant l, in- devient il-.'],
 ['Le contraire de « réel » est…','irréel',['inréel','imréel','dyréel'],'Devant r, in- devient ir-.',2],
 ['Le contraire de « mortel » (qui peut mourir) est…','immortel',['inmortel','dymortel','remortel'],'Devant m, in- devient im-.',3],
 {t:'Écris le contraire avec un préfixe : possible → …',a:['impossible'],e:'Devant p : im-.',d:2},
 {t:'Écris le mot : « qu’on peut manger » → mang…',a:['mangeable'],e:'Mangeable : on garde le e devant -able.',d:3},
 {tf:'Un mot de la même famille partage le même radical.',v:true,e:'Les mots de la famille ont un sens lié.'},
 {tf:'Dans « relire », le préfixe est « lire ».',v:false,e:'Le préfixe est re- ; le radical est lire.'}]});

E('cm1-fr-types-formes',{w:.85,items:[
 ['Quelle phrase est à la forme négative ?','Il ne mange jamais de poisson.',['Il mange du poisson.','Mange-t-il du poisson ?','Mange du poisson.'],'ne … jamais encadre le verbe.'],
 ['Transforme avec « Est-ce que » : « Tu viens. »','Est-ce que tu viens ?',['Tu viens ?!','Viens-tu est-ce que.','Est-ce tu viens.'],'On ajoute Est-ce que devant la phrase.'],
 ['Transforme avec inversion : « Elle chante. »','Chante-t-elle ?',['Chante elle ?','Elle chante-t-elle ?','Est chante-t-elle ?'],'Le t euphonique évite le hiatus entre deux voyelles.',3],
 ['Mets à la forme négative : « Tom a vu le film. »','Tom n’a pas vu le film.',['Tom a pas vu le film.','Tom n’a vu pas le film.','Tom ne a pas vu le film.'],'Au passé composé, la négation encadre l’auxiliaire.',2],
 ['Quelle phrase est impérative ?','Prends ton manteau.',['Tu prends ton manteau.','Prends-tu ton manteau ?','Il prend son manteau.'],'Elle exprime un ordre.'],
 ['Quel mot de négation signifie « aucune personne » ?','personne',['rien','jamais','plus'],'ne … personne.',2],
 ['Quel mot de négation signifie « aucune chose » ?','rien',['personne','jamais','plus'],'ne … rien.',2],
 ['Quelle forme exprime la surprise ou l’émotion ?','la forme exclamative',['la forme négative','la forme interrogative','le type impératif'],'Elle se termine par un point d’exclamation.'],
 ['Dans « Quelle belle journée ! », la phrase est…','exclamative',['interrogative','impérative','négative'],'Elle exprime l’admiration.'],
 {tf:'Le « t » de « mange-t-il » est un t euphonique.',v:true,e:'Il évite que deux voyelles se heurtent.',d:3},
 {tf:'« Il a pas faim » est correct à l’écrit.',v:false,e:'On écrit « Il n’a pas faim » : ne est obligatoire.'},
 {tf:'Une phrase interrogative peut se construire avec intonation, Est-ce que ou inversion.',v:true,e:'Trois façons d’interroger.'},
 {t:'Écris le mot de la négation qui manque : Elle ne sort … le soir. (jamais / pas)',a:['jamais'],e:'ne … jamais.',d:2},
 {t:'Complète : Va-… -elle au parc ? (une lettre)',a:['t'],e:'Va-t-elle : t euphonique.',d:3}]});

E('cm1-fr-complements',{w:.85,items:[
 ['Dans « Nous regardons un film », « un film » est…','COD',['COI','CC de lieu','sujet'],'Nous regardons quoi ? un film.'],
 ['Dans « Il parle à sa sœur », « à sa sœur » est…','COI',['COD','CC de temps','sujet'],'Il parle à qui ? à sa sœur.'],
 ['Dans « Samedi, nous visitons le musée », « samedi » est…','CC de temps',['COD','COI','sujet'],'On peut le supprimer et le déplacer.'],
 ['Dans « Il habite à Lyon », « à Lyon » est…','CC de lieu',['COD','COI','sujet'],'Où habite-t-il ? à Lyon.',3],
 ['Dans « Elle chante joyeusement », « joyeusement » est…','CC de manière',['COD','COI','sujet'],'Comment chante-t-elle ?'],
 ['Dans « Le boulanger vend du pain », « du pain » est…','COD',['COI','CC de lieu','CC de temps'],'Vend quoi ? du pain.'],
 ['Dans « Il obéit à ses parents », « à ses parents » est…','COI',['COD','CC de temps','CC de lieu'],'Obéit à qui ? à ses parents.',2],
 ['Un complément circonstanciel peut être…','supprimé ou déplacé',['jamais supprimé','toujours obligatoire','le verbe'],'Test de suppression et de déplacement.'],
 ['Quelle question permet de trouver un COD ?','Qui ? Quoi ?',['Où ?','Quand ?','Comment ?'],'Verbe + qui ? / quoi ?'],
 ['Quelle question permet de trouver un CC de temps ?','Quand ?',['Qui ?','Quoi ?','Où ?'],'Quand + verbe ?'],
 {tf:'Un COI est introduit par une préposition (à, de).',v:true,e:'Parler à, se souvenir de.'},
 {tf:'On peut déplacer un COD comme un complément circonstanciel.',v:false,e:'Le COD complète le verbe et se place derrière lui.',d:2},
 {tf:'« Ce matin » est un complément circonstanciel de temps.',v:true,e:'Il répond à la question quand ?'},
 {t:'Écris le sigle du complément qui répond à « quoi ? » après le verbe (3 lettres)',a:['cod'],e:'COD.',d:2}]});

E('cm1-fr-nature-fonction',{w:.85,items:[
 ['Dans « Les élèves lisent un livre », « les élèves » a pour fonction…','sujet',['COD','COI','attribut'],'Qui est-ce qui lit ? les élèves.'],
 ['Dans « Les élèves lisent un livre », « un livre » a pour fonction…','COD',['sujet','COI','CC de lieu'],'Lisent quoi ? un livre.'],
 ['Dans « Les élèves lisent un livre », la nature de « lisent » est…','verbe',['nom','adjectif','adverbe'],'C’est le verbe conjugué.'],
 ['La nature de « rapidement » est…','adverbe',['adjectif','nom','verbe'],'Terminaison -ment.'],
 ['La nature de « petit » dans « un petit chat » est…','adjectif',['nom','verbe','déterminant'],'Il décrit le nom.'],
 ['La nature de « il » est…','pronom',['nom','verbe','adjectif'],'Il remplace un nom.'],
 ['Dans « Chaque jour, Léa court », « chaque jour » a pour fonction…','complément circonstanciel de temps',['sujet','COD','attribut'],'Il est supprimable et déplaçable.',2],
 ['« Sujet » est…','une fonction',['une nature','un nom','un adverbe'],'Elle dépend de la phrase.'],
 ['« Adjectif » est…','une nature',['une fonction','un sujet','un complément'],'Elle ne change pas.'],
 {tf:'La nature d’un mot change selon la phrase.',v:false,e:'La nature reste la même ; c’est la fonction qui change.'},
 {tf:'Un groupe nominal peut être sujet ou COD.',v:true,e:'Sa nature est la même, sa fonction change.'},
 {tf:'Le mot « chat » est toujours un nom.',v:true,e:'Sa nature est nom.',d:2},
 {t:'Écris la fonction de « Léa » dans « Léa chante » (un mot)',a:['sujet'],e:'Sujet.',d:2}]});

E('cm1-fr-determinants',{w:.85,items:[
 ['« mes » est un déterminant…','possessif',['démonstratif','article défini','article indéfini'],'Il indique à qui appartient le nom.'],
 ['« cette » est un déterminant…','démonstratif',['possessif','article défini','article indéfini'],'Il montre.'],
 ['« une » est un article…','indéfini',['défini','possessif','démonstratif'],'Un, une, des.'],
 ['« les » est un article…','défini',['indéfini','possessif','démonstratif'],'Le, la, l’, les.'],
 ['Complète : « … oiseau chante. » (démonstratif)','Cet',['Ce','Cette','Ces'],'Cet devant voyelle ou h muet : cet oiseau.',2],
 ['Complète : « … amie arrive. » (possessif féminin)','Mon',['Ma','Mes','Me'],'Devant une voyelle : mon amie.',3],
 ['Complète : « Il range … livres. » (les siens)','ses',['ces','c’est','s’est'],'Les siens : ses.'],
 ['Complète : « Regarde … nuages ! » (démonstratif)','ces',['ses','c’est','s’est'],'Montrer : ces.',2],
 ['Où se place le déterminant ?','devant le nom',['derrière le verbe','à la fin de la phrase','devant le sujet seulement'],'Il accompagne le nom.'],
 ['Le déterminant indique…','le genre et le nombre du nom',['seulement la couleur','la fonction du nom','le temps du verbe'],'Masculin/féminin, singulier/pluriel.',2],
 ['Quel mot est un déterminant possessif ?','notre',['cet','un','ces'],'Notre maison.'],
 {tf:'« leurs » est un déterminant possessif.',v:true,e:'Il s’accorde avec le nom pluriel.',d:2},
 {tf:'« ces » est un déterminant possessif.',v:false,e:'C’est un démonstratif.'},
 {t:'Écris le déterminant manquant : « … maison est grande. » (possessif de « moi », féminin)',a:['ma'],e:'Ma maison.',d:2}]});

E('cm1-fr-gn',{w:.85,items:[
 ['Dans « le grand arbre vert », le nom noyau est…','arbre',['grand','vert','le'],'C’est le mot principal.'],
 ['Dans « une jolie petite robe », les épithètes sont…','jolie et petite',['robe et une','une et jolie','petite et robe'],'Les adjectifs collés au nom.',2],
 ['Dans « la robe est rouge », « rouge » est…','attribut du sujet',['épithète','déterminant','COD'],'Il est après le verbe être.',3],
 ['Un GN contient obligatoirement…','un nom noyau',['un adjectif','un verbe','un adverbe'],'Le nom est le noyau.'],
 ['Dans « mes amis », « mes » est…','le déterminant',['le nom','l’épithète','le verbe'],'Il précède le nom.'],
 ['Dans « des fleurs rouges », l’épithète est…','rouges',['des','fleurs','des fleurs'],'Elle s’accorde au féminin pluriel.'],
 ['L’épithète s’accorde avec…','le nom qu’elle complète',['le verbe','le sujet seulement','le pronom'],'Genre et nombre.'],
 ['Quel GN contient une épithète ?','un chat noir',['un chat','le chat','mon chat'],'Noir est l’épithète.'],
 ['Quel est le noyau du GN « les vieilles maisons blanches » ?','maisons',['vieilles','blanches','les'],'Mot principal.'],
 {tf:'Un adjectif épithète est séparé du nom par un verbe.',v:false,e:'Il est collé au nom (ou à un déterminant).'},
 {tf:'On peut supprimer l’épithète sans changer la fonction du GN.',v:true,e:'Elle donne seulement une précision.',d:2},
 {tf:'Le GN « le petit chat » contient un adjectif placé avant le nom.',v:true,e:'Petit est épithète.'},
 {t:'Écris le nom noyau : « une magnifique fleur rouge »',a:['fleur'],e:'Fleur.',d:2}]});

E('cm1-fr-homophones',{w:.85,items:[
 ['Complète : « Léa … Tom jouent. »','et',['est'],'Et = et puis (on peut dire « et puis »).'],
 ['Complète : « Le ciel … bleu. »','est',['et'],'Était bleu : est.'],
 ['Complète : « Elle va … la piscine. »','à',['a'],'À est une préposition (on ne peut pas dire avait).'],
 ['Complète : « Il … faim. »','a',['à'],'Avait faim : a.'],
 ['Complète : « … habites-tu ? » (lieu)','Où',['Ou'],'Où indique le lieu.'],
 ['Complète : « Thé … café ? »','ou',['où'],'Ou bien.'],
 ['Complète : « Il … cache derrière l’arbre. »','se',['ce'],'Se devant un verbe.'],
 ['Complète : « … soir, nous sortons. »','Ce',['Se'],'Ce soir : ce devant un nom.'],
 ['Complète : « Les enfants … amusent. »','s’',['c’'],'S’amusent : verbe pronominal.',3],
 ['Complète : « Marie range … jouets. » (les siens)','ses',['ces'],'Les siens : ses.'],
 ['Complète : « Regarde … oiseaux ! » (ceux-là)','ces',['ses'],'Montrer : ces.'],
 {t:'Écris le mot : « Il … pris son vélo. » (a / à)',a:['a'],e:'Il avait pris : a.'},
 {t:'Écris le mot : « Où / Ou ? … vas-tu ? »',a:['où'],e:'Où indique le lieu.',d:2},
 {tf:'On écrit « Il a mal à la tête » avec a puis à.',v:true,e:'Il a (avait) ; à la tête (préposition).',d:2},
 {tf:'« Où » prend un accent quand il indique le lieu.',v:true,e:'Il remplace « à quel endroit ».'}]});
}

/* ---------- Lot 2 vague 1 pédagogie (23/10/2026) : variété des exercices de sciences en CM1 ---------- */
E('cm1-sc-lumiere-ombres',{w:.85,items:[
 ['La lumière se propage…','en ligne droite',['en zigzag','en cercle uniquement','de façon aléatoire'],'C’est pourquoi les ombres ont des bords nets.'],
 ['Une source de lumière est…','un objet qui produit de la lumière',['un objet qui la reflète seulement','un objet noir','un miroir'],'Le Soleil, une lampe, une bougie.'],
 ['Quelle est une source de lumière ?','le Soleil',['la Lune','un miroir','un mur blanc'],'La Lune réfléchit la lumière du Soleil.'],
 ['Quel matériau est transparent ?','le verre',['le bois','le carton','la pierre'],'Il laisse passer la lumière.'],
 ['Quel matériau est opaque ?','le carton',['le verre','l’eau pure','la vitre'],'Il arrête la lumière.'],
 ['Le papier calque est…','translucide',['opaque','transparent','lumineux'],'Il laisse passer une partie de la lumière.'],
 ['À midi, l’ombre d’un arbre est…','courte',['très longue','absente','plus longue que le matin'],'Le Soleil est haut dans le ciel.'],
 ['Le matin, le Soleil est du côté de l’est ; l’ombre d’un poteau est vers…','l’ouest',['l’est','le haut','le sud toujours'],'L’ombre est à l’opposé de la source.'],
 ['L’ombre propre d’un objet est…','la partie de l’objet qui n’est pas éclairée',['l’ombre sur le sol','la lumière sur le mur','la couleur de l’objet'],'L’ombre portée est celle projetée sur le sol.',3],
 ['Si je rapproche une lampe d’un objet, son ombre devient…','plus grande',['plus petite','inexistante','verte'],'Plus la source est proche, plus l’ombre grandit.',3],
 {tf:'Un objet transparent fait une ombre très marquée.',v:false,e:'Il laisse passer la lumière et fait peu d’ombre.'},
 {tf:'L’ombre se forme du côté opposé à la source de lumière.',v:true,e:'Derrière l’objet.'},
 {tf:'La lumière du Soleil met environ 8 minutes pour atteindre la Terre.',v:true,e:'Environ 8 minutes.',d:3},
 {o:['Source de lumière','Objet opaque','Ombre'],q:'Remets dans l’ordre de la lumière à l’ombre :',e:'La lumière rencontre l’objet opaque, derrière lui il y a l’ombre.',d:2}]});

E('cm1-sc-lune',{w:.85,items:[
 ['La Lune est…','un satellite naturel de la Terre',['une étoile','une planète','une comète'],'Elle tourne autour de la Terre.'],
 ['La Lune brille car…','elle reflète la lumière du Soleil',['elle produit de la lumière','elle est chaude','elle est une étoile'],'Elle est éclairée par le Soleil.'],
 ['Lors d’une pleine lune, nous voyons…','toute la face éclairée de la Lune',['aucune partie','un croissant','la face cachée seulement'],'La face éclairée est tournée vers nous.'],
 ['La phase où la Lune est invisible s’appelle…','la nouvelle lune',['la pleine lune','le premier quartier','le dernier quartier'],'Sa face éclairée est tournée vers le Soleil.'],
 ['Un cycle complet des phases dure environ…','29,5 jours',['7 jours','1 jour','365 jours'],'Un mois lunaire.'],
 ['Pourquoi voit-on toujours la même face de la Lune ?','elle tourne sur elle-même en même temps qu’autour de la Terre',['l’autre face est détruite','l’autre face est éteinte','elle ne bouge pas'],'Sa rotation est synchronisée.',3],
 ['Une éclipse de Lune se produit quand…','la Terre se place entre le Soleil et la Lune',['la Lune se place entre le Soleil et la Terre','le Soleil s’éteint','la Terre disparaît'],'La Lune passe dans l’ombre de la Terre.',3],
 ['Une éclipse de Soleil se produit quand…','la Lune se place entre le Soleil et la Terre',['la Terre se place entre le Soleil et la Lune','le Soleil devient plus petit','la Lune s’éteint'],'L’ombre de la Lune tombe sur la Terre.',3],
 ['Quelle phase vient juste après la nouvelle lune ?','le premier croissant',['la pleine lune','le dernier quartier','le dernier croissant'],'La Lune devient visible.',2],
 {tf:'Les phases de la Lune sont dues à l’ombre de la Terre.',v:false,e:'Ce sont les éclipses qui sont dues à l’ombre ; les phases dépendent de ce que nous voyons de la face éclairée.',d:2},
 {tf:'La Lune tourne autour de la Terre.',v:true,e:'C’est son satellite naturel.'},
 {tf:'La Lune produit sa propre lumière.',v:false,e:'Elle réfléchit celle du Soleil.'},
 {o:['la nouvelle lune','le premier quartier','la pleine lune','le dernier quartier'],q:'Remets ces phases dans l’ordre du cycle :',e:'Nouvelle lune, premier quartier, pleine lune, dernier quartier.',d:2}]});

E('cm1-sc-classification',{w:.85,items:[
 ['Les vertébrés sont des animaux qui ont…','un squelette interne avec une colonne vertébrale',['une carapace externe','six pattes','huit pattes'],'Mammifères, oiseaux, poissons, reptiles, amphibiens.'],
 ['Un insecte a…','six pattes',['quatre pattes','huit pattes','dix pattes'],'Un insecte a six pattes et trois parties au corps.'],
 ['Une araignée a…','huit pattes',['six pattes','quatre pattes','deux pattes'],'Ce n’est pas un insecte.'],
 ['Un mammifère se reconnaît à…','ses poils et ses mamelles',['ses plumes','ses écailles et ses nageoires','sa carapace'],'Il allaite ses petits.'],
 ['Un oiseau se reconnaît à…','ses plumes et son bec',['ses poils','ses écailles','ses mamelles'],'Il pond des œufs.'],
 ['Dans quel groupe ranges-tu le dauphin ?','les mammifères',['les poissons','les oiseaux','les insectes'],'Il respire de l’air et allaite ses petits.',2],
 ['Dans quel groupe ranges-tu l’autruche ?','les oiseaux',['les mammifères','les insectes','les poissons'],'Elle a des plumes, même si elle ne vole pas.',2],
 ['Dans quel groupe ranges-tu le requin ?','les poissons',['les mammifères','les oiseaux','les insectes'],'Il a des branchies et des nageoires.',2],
 ['Une espèce est un ensemble d’individus qui…','se ressemblent et peuvent se reproduire entre eux',['vivent au même endroit','ont la même couleur','sont tous des adultes'],'Les descendants sont fertiles.',2],
 ['Une clé de détermination sert à…','identifier un être vivant en répondant à des questions',['soigner un animal','ouvrir une cage','fabriquer une carte'],'Questions successives.'],
 {tf:'Une chauve-souris est un oiseau.',v:false,e:'C’est un mammifère : elle a des poils et allaite ses petits.',d:2},
 {tf:'Un papillon est un insecte.',v:true,e:'Six pattes, trois parties.'},
 {tf:'On classe les êtres vivants d’après ce qu’ils mangent.',v:false,e:'On classe d’après les attributs qu’ils possèdent.',d:2},
 {o:['Vertébrés','Tétrapodes','Mammifères'],q:'Remets dans l’ordre du groupe le plus large au plus précis :',e:'Vertébrés, tétrapodes, mammifères.',d:3}]});

E('cm1-sc-developpement',{w:.85,items:[
 ['La fécondation est la rencontre…','d’un spermatozoïde et d’un ovule',['de deux œufs','de deux ovules','d’un œuf et d’un nid'],'Elle donne la première cellule d’un nouvel être.'],
 ['Un animal ovipare est un animal qui…','pond des œufs',['met au monde des petits vivants','ne se reproduit pas','vit seulement dans l’eau'],'La poule est ovipare.'],
 ['Un animal vivipare est un animal qui…','met au monde des petits vivants',['pond des œufs','ne se reproduit pas','vit seulement dans l’eau'],'Le chat est vivipare.',2],
 ['Chez le chat, la fécondation est…','interne',['externe','impossible','sans spermatozoïde'],'Elle a lieu dans le corps de la femelle.'],
 ['Chez la grenouille, la fécondation est…','externe',['interne','impossible','dans un arbre'],'Elle a lieu dans l’eau.'],
 ['Un têtard devient…','une grenouille',['un poisson','un crabe','un serpent'],'Métamorphose.'],
 ['Une chenille devient…','un papillon',['un ver','une araignée','un oiseau'],'Elle passe par la chrysalide.'],
 ['Chez un animal à développement direct, le jeune…','ressemble à l’adulte',['est très différent de l’adulte','n’existe pas','est une larve'],'Chaton → chat.'],
 ['Un mammifère se distingue des autres animaux car la femelle…','allaite ses petits',['pond toujours des œufs','pond dans l’eau','abandonne ses petits'],'Elle les nourrit de lait.'],
 {tf:'Chez les oiseaux, la fécondation est externe.',v:false,e:'Elle est interne, même si l’œuf est pondu ensuite.'},
 {tf:'Un papillon traverse plusieurs stades avant de devenir adulte.',v:true,e:'Œuf, chenille, chrysalide, papillon.'},
 {o:['l’œuf','la chenille','la chrysalide','le papillon'],q:'Remets dans l’ordre les stades du papillon :',e:'Œuf, chenille, chrysalide, papillon.'},
 {o:['l’œuf','le têtard','la grenouille'],q:'Remets dans l’ordre les stades de la grenouille :',e:'Œuf, têtard, grenouille.',d:2}]});

E('cm1-sc-meteo-climat',{w:.85,items:[
 ['Quel instrument mesure la température ?','le thermomètre',['le pluviomètre','l’anémomètre','le baromètre'],'En degrés Celsius.'],
 ['Quel instrument mesure la quantité de pluie ?','le pluviomètre',['le thermomètre','la girouette','l’anémomètre'],'En millimètres.'],
 ['Quel instrument montre la direction du vent ?','la girouette',['l’anémomètre','le baromètre','le thermomètre'],'Elle tourne dans le sens du vent.'],
 ['Quel instrument mesure la vitesse du vent ?','l’anémomètre',['la girouette','le thermomètre','le pluviomètre'],'En km/h.'],
 ['Un vent d’ouest vient…','de l’ouest',['de l’est','du nord','du sud'],'On donne la direction d’où il vient.',2],
 ['Un climat s’observe sur…','au moins 30 ans',['un jour','une semaine','un mois'],'C’est une moyenne.'],
 ['« Il fait 20 °C cet après-midi à Nantes. » C’est…','la météo',['le climat','un graphique','un relief'],'Un moment précis.'],
 ['« Les étés sont chauds et secs dans le Sud de la France. » C’est…','le climat',['la météo','un orage','un thermomètre'],'Une caractéristique durable.'],
 ['Le changement climatique est lié surtout à…','l’augmentation des gaz à effet de serre',['la Lune','le vent','les marées'],'Activités humaines : transports, industrie, chauffage.',2],
 {tf:'Un hiver froid prouve que le climat ne se réchauffe pas.',v:false,e:'Le climat est une moyenne sur de longues périodes.',d:2},
 {tf:'Le pluviomètre se mesure en millimètres.',v:true,e:'Un millimètre = 1 litre par mètre carré.',d:3},
 {tf:'La météo concerne un moment et un lieu précis.',v:true,e:'Contrairement au climat.'},
 {n:'Au minimum, sur combien d’années calcule-t-on un climat ?',a:30,u:'ans',e:'Au moins 30 ans.',d:3}]});

E('cm1-sc-cerveau',{w:.85,items:[
 ['Quel organe commande les mouvements ?','le cerveau',['l’estomac','le cœur','les poumons'],'Il envoie des messages aux muscles.'],
 ['Les messages vers le cerveau circulent grâce aux…','nerfs',['veines','os','poumons'],'Réseau de communication du corps.'],
 ['Quel organe des sens sert à voir ?','l’œil',['l’oreille','le nez','la langue'],'La vue.'],
 ['Quel organe des sens permet d’entendre ?','l’oreille',['l’œil','le nez','la peau'],'L’ouïe.'],
 ['Quel sens utilise la peau ?','le toucher',['la vue','l’odorat','le goût'],'On sent le chaud, le froid, la douleur.'],
 ['Le nez sert à…','sentir les odeurs',['voir','entendre','toucher'],'L’odorat.'],
 ['Le cerveau est protégé par…','le crâne',['les côtes','le sternum','le bassin'],'Os de la tête.'],
 ['Une illusion d’optique montre que…','le cerveau peut interpréter les informations de façon trompeuse',['les yeux sont cassés','la lumière disparaît','l’image est fausse sur le papier'],'Le cerveau interprète.',2],
 ['Pour protéger son cerveau à vélo, on porte…','un casque',['un bonnet','des lunettes','des gants'],'Pour protéger la tête.'],
 ['Pour mieux mémoriser une leçon, il faut…','dormir suffisamment',['dormir très peu','regarder un écran jusqu’à tard','ne jamais relire'],'Le sommeil aide la mémoire.'],
 {tf:'Ce sont les yeux qui « voient » : le cerveau n’intervient pas.',v:false,e:'Le cerveau interprète les messages reçus des yeux.',d:2},
 {tf:'Il y a cinq sens.',v:true,e:'Vue, ouïe, odorat, goût, toucher.'},
 {tf:'Trop de distractions rendent l’attention plus difficile.',v:true,e:'Écrans, bruit.'},
 {o:['Les yeux voient une balle','Un nerf transmet l’information','Le cerveau l’analyse','Les muscles se contractent'],q:'Remets dans l’ordre :',e:'Organe des sens, nerf, cerveau, muscles.',d:3}]});

E('cm1-sc-puberte',{w:.85,items:[
 ['La puberté, c’est…','la période où le corps se transforme en corps d’adulte',['une maladie','une punition','un jeu'],'C’est une étape normale.'],
 ['La puberté débute à un âge…','différent selon chacun',['identique pour tous','toujours à 8 ans','toujours à 14 ans'],'Souvent entre 8 et 14 ans.'],
 ['Pendant la puberté, on observe chez tout le monde…','une forte croissance et une transpiration plus forte',['une perte de la taille','une perte de poids toujours','une disparition du sommeil'],'Poils, transpiration, croissance.'],
 ['Chez les garçons, la voix…','devient plus grave',['devient plus aiguë','disparaît','reste identique'],'On parle de mue.'],
 ['Chez les filles, on observe notamment…','l’apparition des règles',['la mue de la voix','la barbe','la perte des cheveux'],'Les règles sont un signe de la puberté.',2],
 ['Pour se sentir bien pendant la puberté, il est important…','de se laver régulièrement',['de ne jamais se laver','de cacher ses changements','de se moquer des autres'],'La transpiration augmente.'],
 ['Si j’ai une question sur mon corps, je peux…','demander à un adulte de confiance',['me taire toujours','croire n’importe quelle rumeur','demander à un inconnu en ligne'],'Parents, infirmière, médecin.'],
 {tf:'On peut se moquer des changements du corps de ses camarades.',v:false,e:'Chacun change à son rythme : on respecte les autres.'},
 {tf:'La puberté est une maladie.',v:false,e:'C’est une étape normale.'},
 {tf:'Deux camarades du même âge peuvent être à des étapes différentes de la puberté.',v:true,e:'Chaque corps a son rythme.'},
 {tf:'L’acné peut apparaître pendant la puberté.',v:true,e:'Elle est fréquente et peut être soignée.',d:2},
 {t:'Complète : on parle de la … de la voix chez les garçons (un mot)',a:['mue'],e:'La mue.',d:3}]});

E('cm1-sc-objets-techniques',{w:.85,items:[
 ['Un objet technique est créé pour…','répondre à un besoin',['décorer seulement','être caché','être cassé'],'Il a une utilité.'],
 ['Dans un stylo à bille, la pièce qui contient l’encre est…','le réservoir',['la bille','le capuchon','le corps'],'Le tube contient l’encre.',2],
 ['Dans une lampe de poche, quelle pièce commande l’éclairage ?','l’interrupteur',['la pile','l’ampoule','le boîtier'],'Il ferme ou ouvre le circuit.',2],
 ['La fonction du capuchon d’un stylo est…','protéger la pointe',['écrire','contenir l’encre','éclairer'],'Fonction : protéger.'],
 ['Un smartphone est apparu après…','le téléphone portable à touches',['le téléphone à manivelle','la lampe à huile','le télégraphe'],'Évolution technique.',2],
 ['Quel matériau est un bon isolant électrique ?','le plastique',['le cuivre','le fer','l’aluminium'],'Il ne laisse pas passer le courant.',3],
 ['Quel matériau est un bon conducteur électrique ?','le cuivre',['le plastique','le bois','le verre'],'On l’utilise pour les fils.',3],
 ['Une fonction technique est…','ce que l’objet doit faire',['une pièce de l’objet','la couleur de l’objet','le prix de l’objet'],'Exemple : éclairer.',2],
 ['Une solution technique est…','la pièce ou le procédé qui réalise la fonction',['le besoin','la couleur','le marketing'],'Exemple : l’ampoule éclaire.',2],
 {tf:'« Éclairer » est une pièce de la lampe.',v:false,e:'Éclairer est une fonction.'},
 {tf:'Les objets techniques évoluent avec les progrès techniques.',v:true,e:'Matériaux, énergie, fonctions.'},
 {tf:'Un même besoin peut être satisfait par plusieurs objets.',v:true,e:'Pour se déplacer : vélo, voiture, train.',d:2},
 {o:['Besoin','Fonctions','Solutions techniques'],q:'Remets l’analyse d’un objet dans l’ordre :',e:'On part du besoin, puis des fonctions, puis des solutions.',d:2}]});

E('cm1-sc-programmer-robot',{w:.85,items:[
 ['Un robot qui exécute les instructions dans l’ordre suit…','un programme',['un jeu','un câble','une recette de cuisine'],'Une suite ordonnée d’instructions.'],
 ['Un programme : répéter 3 fois [avancer de 2]. Combien de cases parcourt le robot ?','6 cases',['3 cases','2 cases','5 cases'],'3 × 2 = 6.',2],
 ['Un programme : avancer de 2, reculer de 2. Où est le robot ?','à son point de départ',['2 cases devant','2 cases derrière','4 cases devant'],'Il revient là où il était.',2],
 ['Pour dessiner un carré avec un robot, on peut utiliser…','répéter 4 fois [avancer, tourner d’un quart de tour]',['avancer une seule fois','tourner sans avancer','reculer seulement'],'Quatre côtés égaux et quatre angles droits.',3],
 ['À quoi sert une boucle ?','répéter des instructions',['arrêter le robot','éteindre l’écran','changer la pile'],'Elle évite de réécrire.'],
 ['À quoi sert une condition ?','faire une action seulement si quelque chose se produit',['répéter toujours','effacer le programme','accélérer le robot'],'Si obstacle alors tourner.',2],
 ['Un capteur permet au robot de…','détecter des informations (distance, lumière)',['avancer','tourner','se recharger'],'Il perçoit l’environnement.',2],
 ['Déboguer un programme, c’est…','chercher et corriger les erreurs',['supprimer le robot','changer la pile','le copier'],'Tester puis corriger.'],
 {tf:'L’ordre des instructions n’a pas d’importance.',v:false,e:'Tourner puis avancer ≠ avancer puis tourner.'},
 {tf:'Une boucle permet de raccourcir un programme.',v:true,e:'Répéter 4 fois au lieu d’écrire 4 fois.'},
 {n:'Un robot avance de 3 cases, répète cette action 4 fois. Combien de cases parcourt-il en tout ?',a:12,u:'cases',e:'4 × 3 = 12.',d:2},
 {n:'Répéter 5 fois [avancer de 2]. Combien de cases ?',a:10,u:'cases',e:'5 × 2 = 10.'},
 {o:['J’observe le trajet','J’écris le programme','Je teste','Je corrige les erreurs'],q:'Remets dans l’ordre la démarche de programmation :',e:'Observer, écrire, tester, corriger.',d:2}]});

/* ---------- Lot 2 vague 1 pédagogie (23/10/2026) : variété des exercices de mathématiques en CM1 ---------- */
{
const TAB=(rows,head=['',''])=>`<table class="ptable"><tr><td><b>${head[0]}</b></td><td><b>${head[1]}</b></td></tr>${rows.map(([a,b])=>`<tr><td>${a}</td><td>${b}</td></tr>`).join('')}</table>`;
const FR=[['pommes',12],['poires',8],['bananes',15],['oranges',10]];
const TP=[['lundi',8],['mardi',11],['mercredi',9],['jeudi',14],['vendredi',12]];
const SP=[['football',9],['danse',6],['natation',7],['judo',5]];
E('cm1-ma-aires',{w:.85,items:[
 ['L’aire d’une figure mesure…','sa surface',['son contour','sa hauteur','son poids'],'Unité : cm², m²…'],
 ['Le périmètre d’une figure mesure…','la longueur de son contour',['sa surface','son volume','son angle'],'Unité : cm, m…'],
 ['Pour mesurer l’aire d’une salle de classe, on utilise plutôt…','le mètre carré (m²)',['le centimètre (cm)','le litre','le gramme'],'Grande surface.'],
 ['Pour mesurer l’aire d’une page de cahier, on utilise plutôt…','le centimètre carré (cm²)',['le kilomètre','le litre','le kilogramme'],'Petite surface.'],
 ['Un carré de 1 m de côté a une aire de…','1 m²',['1 m','4 m','2 m²'],'C’est l’unité d’aire.',2],
 ['Un rectangle a une longueur de 8 cm et une largeur de 3 cm. Son aire est…','24 cm²',['22 cm²','11 cm²','24 cm'],'8 × 3 = 24.'],
 ['Un rectangle a une aire de 24 cm² et une largeur de 4 cm. Sa longueur est…','6 cm',['20 cm','28 cm','96 cm'],'24 ÷ 4 = 6.',3],
 ['Deux figures de même aire ont-elles forcément le même périmètre ?','non',['oui, toujours'],'Un rectangle 4×3 et un rectangle 6×2 ont la même aire (12 cm²) mais pas le même périmètre.',3],
 {n:'Un carré a 6 cm de côté. Quelle est son aire (en cm²) ?',a:36,u:'cm²',e:'6 × 6 = 36.'},
 {n:'Un rectangle mesure 7 cm sur 5 cm. Quelle est son aire (en cm²) ?',a:35,u:'cm²',e:'7 × 5 = 35.'},
 {n:'Un rectangle mesure 8 cm sur 3 cm. Quel est son périmètre (en cm) ?',a:22,u:'cm',e:'2 × (8 + 3) = 22.',d:2},
 {n:'Combien de carreaux de 1 cm² faut-il pour couvrir un rectangle de 6 cm sur 3 cm ?',a:18,e:'6 × 3 = 18.'},
 {n:'Un carrelage carré de 20 cm de côté a une aire de combien de cm² ?',a:400,u:'cm²',e:'20 × 20 = 400.',d:3},
 {tf:'L’aire s’exprime en cm.',v:false,e:'L’aire s’exprime en cm² ; cm est une unité de longueur.'},
 {tf:'Un rectangle 5 cm × 2 cm a un périmètre de 14 cm.',v:true,e:'2 × (5 + 2) = 14.'},
 {tf:'Un rectangle 5 cm × 2 cm a une aire de 14 cm².',v:false,e:'L’aire est 5 × 2 = 10 cm².'}]});

E('cm1-ma-angles',{w:.85,items:[
 ['Un angle droit se vérifie avec…','une équerre',['une règle seule','un compas seulement','une balance'],'On place le coin de l’équerre.'],
 ['Le coin d’une feuille de papier forme un angle…','droit',['aigu','obtus','plat'],'Le coin d’une feuille standard est droit.'],
 ['Un angle plus petit qu’un angle droit est…','aigu',['obtus','droit','plat'],'Aigu = pointu.'],
 ['Un angle plus grand qu’un angle droit, mais plus petit qu’un angle plat, est…','obtus',['aigu','droit','nul'],'Obtus.'],
 ['Quand les aiguilles d’une horloge indiquent 3 h pile, elles forment un angle…','droit',['aigu','plat','obtus'],'Un quart de tour.',2],
 ['Quand les aiguilles d’une horloge indiquent 6 h pile, elles forment un angle…','plat',['droit','aigu','obtus'],'Elles sont alignées.',3],
 ['Dans l’angle ABC, le sommet est…','B',['A','C','le milieu de [AC]'],'La lettre du milieu.'],
 ['Combien d’angles droits a un carré ?','4',['2','3','1'],'Un carré a 4 angles droits.'],
 ['Combien d’angles droits a un triangle rectangle ?','1',['2','3','0'],'Un seul.',2],
 ['Combien d’angles droits a un rectangle ?','4',['2','3','1'],'Quatre angles droits.'],
 ['Un angle plat est égal à…','deux angles droits',['un angle droit','trois angles droits','un angle aigu'],'Il forme une ligne droite.',3],
 {tf:'Un triangle peut avoir un angle obtus.',v:true,e:'Oui, par exemple un triangle très « aplati ».',d:2},
 {tf:'La taille d’un angle dépend de la longueur de ses côtés.',v:false,e:'Elle dépend de l’écart entre les deux demi-droites.'},
 {tf:'Un angle droit est plus grand qu’un angle obtus.',v:false,e:'Un angle obtus est plus grand qu’un angle droit.'},
 {n:'Combien d’angles droits a un carré ?',a:4,e:'4.'}]});

E('cm1-ma-solides',{w:.85,items:[
 ['Combien de faces a un pavé droit ?','6',['4','8','12'],'6 rectangles.'],
 ['Combien de sommets a un pavé droit ?','8',['6','12','4'],'8 sommets.'],
 ['Combien d’arêtes a un pavé droit ?','12',['6','8','10'],'12 arêtes.'],
 ['Combien d’arêtes a une pyramide à base carrée ?','8',['5','12','4'],'4 à la base et 4 qui montent au sommet.',2],
 ['Combien de sommets a une pyramide à base carrée ?','5',['4','8','6'],'4 à la base et 1 au sommet.',2],
 ['Combien de faces a une pyramide à base triangulaire ?','4',['3','5','6'],'4 triangles.',2],
 ['Combien d’arêtes a une pyramide à base triangulaire ?','6',['4','8','9'],'3 à la base et 3 vers le sommet.',3],
 ['Combien de faces rectangulaires a un prisme droit à base triangulaire ?','3',['2','4','5'],'Une par côté du triangle.',2],
 ['Un cône a…','une base en forme de disque et un sommet',['deux bases carrées','six faces','douze arêtes'],'Sa surface latérale est courbe.',2],
 ['Un cylindre a…','deux bases en forme de disque',['quatre faces carrées','un sommet','six arêtes'],'Et une face latérale courbe.'],
 ['Le patron d’un pavé droit est formé de…','6 rectangles',['6 carrés toujours','4 triangles','2 disques'],'Les faces opposées sont identiques.',2],
 ['Un cube est un pavé droit dont toutes les faces sont…','des carrés',['des triangles','des disques','des losanges'],'Cas particulier.',2],
 {tf:'Un cylindre est un prisme.',v:false,e:'Ses bases sont des disques et sa face latérale est courbe.',d:3},
 {n:'Combien de faces a un cube ?',a:6,e:'6.'},
 {n:'Combien de sommets a un prisme droit à base carrée ?',a:8,e:'4 en haut, 4 en bas.',d:2}]});

E('cm1-ma-donnees',{w:.85,items:[
 [`Voici les ventes de fruits d’une semaine.${TAB(FR,['Fruit','Nombre vendu'])}Quel fruit a été le plus vendu ?`,'les bananes',['les pommes','les poires','les oranges'],'15 est le plus grand nombre.'],
 [`Voici les ventes de fruits d’une semaine.${TAB(FR,['Fruit','Nombre vendu'])}Quel fruit a été le moins vendu ?`,'les poires',['les pommes','les bananes','les oranges'],'8 est le plus petit nombre.'],
 [`Voici les ventes de fruits d’une semaine.${TAB(FR,['Fruit','Nombre vendu'])}Combien de pommes ont été vendues de plus que de poires ?`,'4',['3','20','12'],'12 − 8 = 4.',2],
 [`${TAB(TP,['Jour','Température (°C)'])}Quel jour a-t-il fait le plus chaud ?`,'jeudi',['lundi','mardi','vendredi'],'14 °C est la valeur la plus élevée.'],
 [`${TAB(TP,['Jour','Température (°C)'])}Quel jour a-t-il fait le plus froid ?`,'lundi',['mardi','jeudi','vendredi'],'8 °C est la valeur la plus basse.'],
 [`${TAB(SP,['Sport','Nombre d’élèves'])}Quel sport compte le plus d’élèves ?`,'le football',['la danse','la natation','le judo'],'9 est le plus grand nombre.'],
 [`${TAB(SP,['Sport','Nombre d’élèves'])}Combien d’élèves font de la danse ou du judo ?`,'11',['6','5','15'],'6 + 5 = 11.',2],
 ['Pour montrer l’évolution de la température au cours d’une journée, on utilise plutôt…','une courbe',['un tableau de prénoms','un calendrier','une carte'],'La courbe montre une évolution dans le temps.'],
 ['Pour comparer des quantités entre catégories, on utilise souvent…','un diagramme en barres',['une courbe','un patron','un plan'],'Chaque barre représente une catégorie.'],
 ['Dans un diagramme en barres, la hauteur d’une barre représente…','la valeur de la catégorie',['son nom','sa couleur','son rang'],'Plus la barre est haute, plus la valeur est grande.'],
 ['Avant de lire un graphique, il faut regarder…','le titre et les axes',['uniquement la couleur','seulement la dernière barre','rien'],'Le titre et les axes donnent le sens.'],
 {n:`Combien de fruits ont été vendus en tout (pommes, poires, bananes, oranges : 12, 8, 15 et 10) ?`,a:45,e:'12 + 8 + 15 + 10 = 45.',d:2},
 {n:'Lundi : 8 °C ; jeudi : 14 °C. De combien de degrés la température a-t-elle augmenté entre lundi et jeudi ?',a:6,u:'°C',e:'14 − 8 = 6.'},
 {n:'Dans un groupe, 9 élèves font du football, 6 de la danse, 7 de la natation et 5 du judo. Combien d’élèves en tout ?',a:27,e:'9 + 6 + 7 + 5 = 27.',d:2},
 {tf:'Une courbe est adaptée pour représenter une évolution dans le temps.',v:true,e:'Par exemple la température.'}]});

E('cm1-ma-probabilites',{w:.85,items:[
 ['Un sac contient 9 billes rouges et 1 bille bleue. Tirer une bille bleue est…','peu probable',['certain','impossible','une chance sur deux'],'Il n’y a qu’une seule bille bleue sur 10.'],
 ['Un sac contient 9 billes rouges et 1 bille bleue. Tirer une bille rouge est…','probable',['impossible','peu probable','certain'],'Il y a beaucoup plus de rouges, mais ce n’est pas certain.'],
 ['Un sac contient seulement des billes rouges. Tirer une bille rouge est…','certain',['impossible','probable','une chance sur deux'],'Il n’y a que des rouges.'],
 ['Un sac contient seulement des billes rouges. Tirer une bille verte est…','impossible',['certain','probable','une chance sur deux'],'Il n’y a aucune verte.'],
 ['Un sac contient 5 billes rouges et 5 billes bleues. Tirer une bille rouge est…','une chance sur deux',['certain','impossible','peu probable'],'Autant de rouges que de bleues.'],
 ['Avec un dé à 6 faces, obtenir 7 est…','impossible',['certain','probable','une chance sur deux'],'Il n’y a pas de face 7.'],
 ['Avec un dé à 6 faces, obtenir un nombre pair est…','une chance sur deux',['certain','impossible','peu probable'],'3 pairs (2, 4, 6) sur 6.'],
 ['Avec un dé à 6 faces, obtenir un nombre entre 1 et 6 est…','certain',['impossible','peu probable','une chance sur deux'],'Toutes les issues sont entre 1 et 6.'],
 ['Avec un dé à 6 faces, obtenir 6 est…','peu probable',['certain','impossible','probable'],'Une face sur six.',2],
 ['Avec un dé à 6 faces, obtenir un nombre inférieur à 5 est…','probable',['impossible','peu probable','certain'],'1, 2, 3, 4 : quatre issues sur six.',2],
 ['Quand on lance une pièce, le nombre d’issues possibles est…','2 (pile ou face)',['1','3','6'],'Pile ou face.'],
 ['Un événement dont on ne peut pas prévoir le résultat est…','aléatoire',['certain','impossible','régulier'],'Comme le lancer d’un dé.'],
 {n:'Combien d’issues possibles pour un dé à 6 faces ?',a:6,e:'1, 2, 3, 4, 5, 6.'},
 {n:'Combien d’issues possibles pour un dé à 8 faces numérotées de 1 à 8 ?',a:8,e:'8.'},
 {tf:'Si on obtient pile trois fois de suite, le prochain lancer a plus de chances de donner face.',v:false,e:'La pièce n’a pas de mémoire : une chance sur deux à chaque lancer.',d:2},
 {tf:'Deux issues possibles signifient toujours une chance sur deux.',v:false,e:'Il faut que les deux issues aient la même chance.',d:3}]});
}

/* ---------- Lot 3 vague 1 pédagogie (23/10/2026) : anglais CM1 (phrases simples, sans audio) ---------- */
E('cm1-en-introduce',{w:.6,items:[
 ['Comment dire « Je m’appelle Léa » ?','My name is Léa.',['I have Léa.','Léa my name.','Me Léa.'],'My name is…'],
 ['Comment dire « J’ai dix ans » ?','I’m ten.',['I have ten.','I’m ten years.','I am have ten.'],'On utilise I’m + âge.'],
 ['Comment dire « J’habite à Paris » ?','I live in Paris.',['I live at Paris.','I living in Paris.','I lives in Paris.'],'I live in + ville.'],
 ['Comment dire « Je viens de France » ?','I come from France.',['I come to France.','I am coming France.','I from France come.'],'I come from…'],
 ['Comment dire « Je suis français(e) » ?','I’m French.',['I have French.','I’m France.','I French am.'],'I’m + nationalité.'],
 ['Comment demander l’âge ?','How old are you?',['What’s your name?','Where do you live?','How are you?'],'How old…?'],
 ['Comment demander où quelqu’un habite ?','Where do you live?',['How old are you?','What’s your name?','Who are you?'],'Where…?'],
 ['« My birthday is in May. » veut dire…','Mon anniversaire est en mai.',['Je suis né en mai prochain.','J’aime le mois de mai.','Mai est mon prénom.'],'Birthday = anniversaire.',2],
 {tf:'On dit « I have ten years » pour dire son âge.',v:false,e:'On dit « I’m ten ».'},
 {tf:'« I’m French » veut dire « Je suis français(e) ».',v:true,e:'French = français.'},
 {tf:'« Where do you live? » demande où tu habites.',v:true,e:'Where = où.'},
 {t:'Complète : My ... is Tom. (prénom)',a:['name'],e:'My name is Tom.',d:2}]});

E('cm1-en-family',{w:.6,items:[
 ['« Aunt » veut dire…','tante',['oncle','cousin','grand-mère'],'Aunt = tante.'],
 ['« Uncle » veut dire…','oncle',['tante','cousin','grand-père'],'Uncle = oncle.'],
 ['« Cousin » veut dire…','cousin ou cousine',['neveu','voisin','frère'],'Cousin.'],
 ['« Grandmother » veut dire…','grand-mère',['mère','tante','sœur'],'Grandmother.'],
 ['« Grandfather » veut dire…','grand-père',['père','oncle','frère'],'Grandfather.'],
 ['« Tom’s sister » veut dire…','la sœur de Tom',['Tom est une sœur','Tom et sa sœur','la sœur à Tom ici'],'’s marque la possession.'],
 ['Comment dire « la voiture de mon père » ?','my father’s car',['my car father','the car of my father’s','my fathers car'],'Possesseur + ’s + objet.',2],
 ['Comment dire « J’ai un frère et deux sœurs » ?','I have got one brother and two sisters.',['I am one brother and two sisters.','I got one brother two sisters have.','I have one brother and two sister.'],'I have got + nombre.',2],
 ['Pour « Il a » on dit…','He has got',['He have got','He haves got','He is got'],'Troisième personne : has.'],
 ['« Funny » veut dire…','drôle',['triste','grand','gentil'],'Funny = drôle.'],
 ['« Kind » veut dire…','gentil',['drôle','méchant','petit'],'Kind = gentil.'],
 {tf:'On écrit « He have got glasses ».',v:false,e:'He has got glasses.',d:2},
 {tf:'« Parents » veut dire « parents » (père et mère).',v:true,e:'Parents = mother and father. Attention : en anglais, parents ne veut pas dire « proches ».',d:2}]});

E('cm1-en-routine',{w:.6,items:[
 ['« It’s three o’clock » veut dire…','Il est trois heures pile.',['Il est trois heures et demie.','Il est trois heures et quart.','Il est trois heures moins le quart.'],'O’clock = heure pile.'],
 ['« It’s half past four » veut dire…','Il est quatre heures et demie.',['Il est quatre heures pile.','Il est quatre heures et quart.','Il est cinq heures moins le quart.'],'Half past = et demie.'],
 ['« It’s quarter past five » veut dire…','Il est cinq heures et quart.',['Il est cinq heures et demie.','Il est cinq heures moins le quart.','Il est six heures et quart.'],'Quarter past = et quart.'],
 ['« It’s quarter to six » veut dire…','Il est six heures moins le quart.',['Il est six heures et quart.','Il est six heures et demie.','Il est six heures pile.'],'Quarter to = moins le quart.',2],
 ['Comment dire 7 h 30 ?','It’s half past seven.',['It’s quarter past seven.','It’s seven o’clock.','It’s quarter to eight.'],'Half past seven.'],
 ['Comment dire 9 h 15 ?','It’s quarter past nine.',['It’s half past nine.','It’s quarter to ten.','It’s nine o’clock.'],'Quarter past nine.'],
 ['Comment dire 8 h 45 ?','It’s quarter to nine.',['It’s quarter past eight.','It’s half past eight.','It’s eight o’clock.'],'Quarter to nine.',2],
 ['« I do my homework » veut dire…','je fais mes devoirs',['je regarde la télé','je prends mon petit-déjeuner','je me couche'],'Homework = devoirs.'],
 ['« I get dressed » veut dire…','je m’habille',['je me lève','je me lave','je me couche'],'Get dressed = s’habiller.',2],
 {tf:'« Quarter to five » signifie 4 h 45.',v:true,e:'Cinq heures moins le quart.',d:2},
 {o:['I get up','I get dressed','I have breakfast','I go to school'],q:'Remets ces actions dans l’ordre du matin :',e:'Get up, get dressed, breakfast, school.',d:2},
 {tf:'« Half past two » signifie 2 h 15.',v:false,e:'Half past two = 2 h 30.'}]});

E('cm1-en-school',{w:.6,items:[
 ['« Maths » veut dire…','mathématiques',['musique','histoire','sport'],'Maths = mathématiques.'],
 ['« History » veut dire…','histoire',['géographie','musique','art'],'History = histoire.'],
 ['« Science » veut dire…','sciences',['arts','sport','français'],'Science = sciences.'],
 ['« Art » veut dire…','arts plastiques',['musique','sport','histoire'],'Art.'],
 ['« Music » veut dire…','musique',['maths','art','histoire'],'Music = musique.'],
 ['« P.E. » veut dire…','éducation physique (sport)',['physique-chimie','poésie','piano'],'Physical Education.',2],
 ['« Timetable » veut dire…','emploi du temps',['calendrier','horloge','carnet'],'Timetable.',2],
 ['Comment dire « Ma matière préférée est l’art » ?','My favourite subject is Art.',['My favourite subject Art is.','I favourite Art.','Art is my subject favourite.'],'Favourite subject.'],
 ['Comment demander « Quelle est ta matière préférée ? » ?','What’s your favourite subject?',['What’s your name?','How old are you?','Where do you live?'],'Favourite = préféré.'],
 ['Comment dire « Le lundi, j’ai maths » ?','On Monday, I have Maths.',['At Monday, I have Maths.','In Monday, I have Maths.','Monday I am Maths.'],'On + jour.',2],
 {tf:'Les matières prennent souvent une majuscule en anglais.',v:true,e:'Maths, English, Art…'},
 {tf:'« French » désigne la matière « français » et aussi la nationalité.',v:true,e:'French = français (langue ou nationalité).',d:2}]});

E('cm1-en-food',{w:.6,items:[
 ['« Breakfast » veut dire…','petit-déjeuner',['déjeuner','dîner','goûter'],'Breakfast.'],
 ['« Lunch » veut dire…','déjeuner',['petit-déjeuner','dîner','goûter'],'Lunch.'],
 ['« Dinner » veut dire…','dîner',['petit-déjeuner','déjeuner','goûter'],'Dinner.'],
 ['Comment demander poliment un sandwich ?','I’d like a sandwich, please.',['Give me a sandwich.','Sandwich now.','I want sandwich.'],'I’d like… please.'],
 ['Comment demander le prix ?','How much is it?',['How old is it?','How many is it?','What is it for?'],'How much…?'],
 ['« Here you are » veut dire…','voilà (en donnant quelque chose)',['où êtes-vous ?','au revoir','j’ai faim'],'Here you are.',2],
 ['La monnaie du Royaume-Uni est…','la livre sterling (£)',['l’euro','le dollar','le yen'],'Pound.'],
 ['1 livre sterling vaut…','100 pence',['10 pence','50 pence','1 000 pence'],'1 £ = 100 p.',2],
 ['« I’d like » est…','plus poli que « I want »',['moins poli','impoli','un mot français'],'Politesse.'],
 {tf:'« Thank you » se dit après avoir été servi.',v:true,e:'Politesse.'},
 {tf:'On paie en euros à Londres.',v:false,e:'Au Royaume-Uni, la monnaie est la livre sterling.'},
 {t:'Complète : How ... is it? (combien)',a:['much'],e:'How much is it?',d:2}]});

E('cm1-en-hobbies',{w:.6,items:[
 ['« I like swimming » veut dire…','J’aime nager.',['Je sais nager.','Je ne nage pas.','Il nage.'],'Like + -ing.'],
 ['« I love reading » veut dire…','J’adore lire.',['Je déteste lire.','Je sais lire.','Je lis un livre.'],'Love = adorer.'],
 ['« Can you swim? » veut dire…','Sais-tu nager ?',['Aimes-tu nager ?','Nages-tu vite ?','Où nages-tu ?'],'Can you…?'],
 ['Comment répondre « oui » à « Can you swim? » ?','Yes, I can.',['Yes, I do can.','Yes, I swim can.','Yes, I am.'],'Yes, I can.'],
 ['Comment répondre « non » à « Can you swim? » ?','No, I can’t.',['No, I don’t can.','No, I not.','No, I am not.'],'No, I can’t.'],
 ['On dit « play » devant…','football',['read','swim','dance'],'Play football.'],
 ['On dit « play the » devant…','piano',['football','tennis','chess'],'Play the piano.',3],
 ['« Ride a bike » veut dire…','faire du vélo',['faire du cheval','conduire une voiture','pousser un vélo'],'Ride = monter / rouler.',2],
 ['« Dance » veut dire…','danser',['dessiner','lire','nager'],'Dance = danser.'],
 {tf:'Après « like », on met souvent le verbe en -ing.',v:true,e:'I like dancing.'},
 {tf:'On dit « I like to swimming ».',v:false,e:'On dit « I like swimming ».',d:2},
 {tf:'« Draw » veut dire « dessiner ».',v:true,e:'Draw = dessiner.'}]});

E('cm1-en-uk',{w:.6,items:[
 ['La capitale du Royaume-Uni est…','Londres (London)',['Paris','Dublin','Édimbourg'],'London.'],
 ['La capitale de l’Écosse est…','Édimbourg (Edinburgh)',['Cardiff','Belfast','Londres'],'Edinburgh.'],
 ['La capitale du Pays de Galles est…','Cardiff',['Édimbourg','Belfast','Dublin'],'Cardiff.',2],
 ['La capitale de l’Irlande du Nord est…','Belfast',['Cardiff','Édimbourg','Dublin'],'Belfast.',2],
 ['Combien de nations forment le Royaume-Uni ?','4',['2','3','6'],'Angleterre, Écosse, Pays de Galles, Irlande du Nord.'],
 ['Big Ben se trouve à…','Londres',['Paris','Rome','Dublin'],'Londres.'],
 ['Le fleuve qui traverse Londres est…','la Tamise (Thames)',['la Seine','le Rhin','la Loire'],'Thames.'],
 ['Bonfire Night a lieu le…','5 novembre',['31 octobre','25 décembre','14 juillet'],'Feux d’artifice.',2],
 ['Halloween a lieu le…','31 octobre',['5 novembre','25 décembre','1er janvier'],'Halloween.'],
 {tf:'L’Irlande du Nord fait partie du Royaume-Uni.',v:true,e:'Capitale : Belfast.',d:2},
 {tf:'L’Angleterre est tout le Royaume-Uni.',v:false,e:'Elle n’en est qu’une partie.'},
 {tf:'Dublin est la capitale du Royaume-Uni.',v:false,e:'Dublin est la capitale de l’Irlande ; celle du Royaume-Uni est Londres.',d:2}]});
})();
