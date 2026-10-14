/* MathQuest — CM2 : enrichissement V8.13 (variété des questions + activités hors écran).
   Programmes : français et mathématiques 2025 (BO n°16 du 17/04/2025) ; sciences, histoire-géographie, langues, EPS, arts,
   musique : cycle 3 2020 (BO n°31 du 30/07/2020) ; EMC 2024 ; EVAR 2025. Les activités « hors écran » ne sont pas évaluées. */
(function(){
'use strict';
const MQ=window.MQPrimary;if(!MQ)return;const E=MQ.enrich;const T=(t,h)=>({t,h});
const HE=(icon,titre,{but,consigne,duree,materiel,securite,auto})=>T(`${icon} ${titre}`,`<p><b>Objectif :</b> ${but}</p><p><b>Consigne :</b> ${consigne}</p><p><b>Durée :</b> ${duree}${materiel?` · <b>Matériel :</b> ${materiel}`:''}</p>${securite?`<p><b>Sécurité :</b> ${securite}</p>`:''}<p><b>Auto-évaluation :</b> ${auto}</p><p><small>Activité à réaliser sans écran. L’application ne la note pas.</small></p>`);
const DICT=w=>({f:()=>MQ.H.txt('🎧 Écoute et écris la phrase :',[w],{audio:{t:w,l:'fr-FR'},strict:true,lang:'fr',chips:['é','è','ê','à','ç','ù','’'],hint:'Relis : sujets, participes passés, homophones.',expl:`On écrit : <b>${w}</b>`})});
const TXT=(t,q)=>`<div class="trad">${t}</div>${q}`;
const sous=s=>s; // le groupe souligné est déjà balisé avec <u>

/* ---------- Français ---------- */
const A1='Depuis des semaines, Hugo s’entraînait en cachette. Le jour de la course, il prit le départ sous les rires de ses camarades. Une heure plus tard, c’est lui qui franchit la ligne le premier, le visage rouge et le sourire jusqu’aux oreilles.';
const A2='La vieille horloge du salon s’était arrêtée à minuit. Personne n’osait la remonter depuis la disparition de grand-père. Ce soir-là pourtant, Lina tourna doucement la clé.';
E('cm2-fr-comprendre',{items:[
 [TXT(A1,'Pourquoi les camarades rient-ils au départ ?'),'ils ne croient pas en la victoire d’Hugo',['Hugo leur raconte une blague','la course est annulée','ils ont gagné'],'Ils se moquent : ils pensent qu’il va perdre.'],
 [TXT(A1,'Que ressent Hugo à l’arrivée ?'),'de la fierté et de la joie',['de la honte','de la tristesse','de la peur'],'« le sourire jusqu’aux oreilles ».'],
 [TXT(A1,'Pourquoi Hugo s’entraînait-il « en cachette » ?'),'pour surprendre les autres',['parce que c’était interdit','parce qu’il était malade','parce qu’il n’aimait pas courir'],'Il voulait créer la surprise.'],
 [TXT(A1,'Quelle est la morale implicite du texte ?'),'le travail régulier permet de réussir',['il ne faut jamais courir','il faut se moquer des autres','gagner ne sert à rien'],'Les semaines d’entraînement paient.',2],
 [TXT(A2,'Pourquoi personne n’osait remonter l’horloge ?'),'elle rappelait le grand-père disparu',['elle était cassée','elle faisait trop de bruit','elle était trop haute'],'Elle s’est arrêtée depuis sa disparition.'],
 [TXT(A2,'Que suggère le geste de Lina ?'),'elle accepte peu à peu la disparition et veut continuer à vivre',['elle veut casser l’horloge','elle a peur de l’heure','elle se trompe de clé'],'Remettre l’horloge en marche, c’est relancer le temps.',3],
 [TXT(A2,'À quel moment se passe la scène ?'),'un soir',['un matin','à midi','on ne sait pas'],'« Ce soir-là ».'],
 [TXT(A2,'Qui raconte cette histoire ?'),'un narrateur extérieur (il/elle)',['Lina (je)','le grand-père (je)','l’horloge'],'Le texte utilise la 3e personne.']]});
E('cm2-fr-litterature',{items:[
 ['Dans une pièce de théâtre, une scène est…','une partie d’un acte',['un chapitre de roman','une strophe','une illustration'],'Un acte est divisé en scènes.'],
 ['« Les Misérables » est un roman de…','Victor Hugo',['Molière','Jules Verne','La Fontaine'],'Publié en 1862.'],
 ['Phileas Fogg est le héros du…','Tour du monde en 80 jours',['Petit Prince','Lièvre et la Tortue','Malade imaginaire'],'Roman de Jules Verne.'],
 ['Le Petit Prince vient…','d’un astéroïde (B 612)',['de Paris','de la Lune','de la mer'],'Roman de Saint-Exupéry.'],
 ['Un récit qui raconte la vie de son auteur est…','une autobiographie',['une fable','un conte','une pièce de théâtre'],'Auto = soi-même.',2]]});
E('cm2-fr-sens',{items:[
 ['« Il pleut des cordes » signifie…','il pleut très fort',['des cordes tombent','il fait beau','il neige'],'Sens figuré.'],
 ['« Coûter les yeux de la tête » signifie…','coûter très cher',['avoir mal aux yeux','être gratuit','coûter peu'],'Expression figurée.']]});
E('cm2-fr-sujet',{items:[
 ['Sujet de : « Sous le pont coule une rivière. »','une rivière',['le pont','coule','sous'],'Qu’est-ce qui coule ? une rivière.'],
 ['Sujet de : « Lire et écrire demandent de l’entraînement. »','lire et écrire',['l’entraînement','demandent','de'],'Deux infinitifs sujets → verbe au pluriel.',2],
 ['Sujet de : « Que fait ton frère ce soir ? »','ton frère',['que','ce soir','fait'],'Qui est-ce qui fait ? ton frère.',2],
 ['Sujet de : « Ma cousine et mon oncle arrivent demain. »','ma cousine et mon oncle',['demain','arrivent','mon oncle seulement'],'Deux noms sujets → pluriel.'],
 ['Sujet de : « Les feuilles que le vent emporte sont jaunes. » (verbe « sont »)','les feuilles',['le vent','jaunes','que'],'Qu’est-ce qui est jaune ? les feuilles.',3],
 ['Complète : « Dans la cage (dormir) deux lions. » (présent)','dorment',['dort','dors','dormons'],'Sujet inversé pluriel : dorment.',2],
 ['Complète : « Où (aller) les oiseaux en hiver ? » (présent)','vont',['va','vas','allons'],'Sujet : les oiseaux → vont.',2],
 ['Sujet de : « Chanter me rend heureux. »','chanter',['me','heureux','rend'],'Un infinitif sujet.'],
 ['Sujet de : « « Attention ! » cria le gardien. »','le gardien',['attention','cria','on'],'Après une parole rapportée, le sujet est inversé.'],
 ['Sujet de : « Au bout du chemin apparut une cabane. »','une cabane',['le chemin','le bout','apparut'],'Sujet inversé.']]});
E('cm2-fr-attribut',{items:[
 ['« Ce chien semble affamé. » Fonction de « affamé » ?','attribut du sujet',['COD','épithète','COI'],'Après « semble », verbe d’état.'],
 ['« Mon père répare le vélo. » Fonction de « le vélo » ?','COD',['attribut du sujet','COI','CC'],'Il répare quoi ? le vélo.'],
 ['« Elles sont devenues championnes. » Fonction de « championnes » ?','attribut du sujet',['COD','COI','épithète'],'Après « devenir », verbe d’état.'],
 ['« Nous parlons à la directrice. » Fonction de « à la directrice » ?','COI',['COD','attribut','CC de lieu'],'Parler à quelqu’un.'],
 ['Quel verbe est un verbe d’état ?','paraître',['manger','courir','écrire'],'Être, paraître, sembler, devenir, rester…'],
 ['« Le gâteau reste chaud. » Fonction de « chaud » ?','attribut du sujet',['épithète','COD','CC de manière'],'« rester » est un verbe d’état.'],
 ['Accorde : « Les fenêtres sont (ouvert). »','ouvertes',['ouvert','ouverts','ouverte'],'Attribut accordé avec « fenêtres » (féminin pluriel).',2],
 ['« Il a l’air fatigué. » Fonction de « fatigué » ?','attribut du sujet',['COD','COI','épithète'],'« avoir l’air » fonctionne comme un verbe d’état.',3]]});
E('cm2-fr-cc',{items:[
 ['« Pendant les vacances, nous irons au ski. » Quel est le CC de temps ?','pendant les vacances',['au ski','nous','irons'],'Il répond à « quand ? ».'],
 ['« Il crie de joie. » « de joie » est un CC de…','cause',['lieu','temps','manière'],'Pourquoi crie-t-il ? de joie.',2],
 ['« Elle répond avec gentillesse. » « avec gentillesse » est un CC de…','manière',['cause','lieu','temps'],'Comment répond-elle ?'],
 ['« Sur la plage, les enfants jouent. » « Sur la plage » est un CC de…','lieu',['temps','cause','manière'],'Où ?'],
 ['Quel groupe peut-on supprimer dans « Ce matin, Léa lit un livre » ?','ce matin',['Léa','lit','un livre'],'Le CC est supprimable.'],
 ['« Il est resté chez lui car il était malade. » La cause est…','car il était malade',['chez lui','il est resté','il'],'Elle répond à « pourquoi ? ».',2],
 ['« Demain » est un adverbe qui peut être CC de…','temps',['lieu','manière','cause'],'Il indique quand.'],
 ['« Ici » est un adverbe qui peut être CC de…','lieu',['temps','cause','manière'],'Il indique où.']]});
E('cm2-fr-classes',{items:[
 ['« pendant » est…','une préposition',['un adverbe','une conjonction de coordination','un verbe'],'Il introduit un complément : pendant la nuit.'],
 ['« ni » est…','une conjonction de coordination',['une préposition','un adverbe','un pronom'],'Les conjonctions de coordination sont : mais, ou, et, or, ni, car.']]});
E('cm2-fr-expansions',{items:[
 ['« une maison <u>en briques</u> » : l’expansion est…','un complément du nom',['un adjectif épithète','une proposition relative','un COD'],'Préposition + nom.'],
 ['« le garçon <u>qui chante</u> » : l’expansion est…','une proposition relative',['un complément du nom','un adjectif épithète','un CC'],'Pronom relatif + verbe.'],
 ['« un <u>immense</u> château » : l’expansion est…','un adjectif épithète',['un complément du nom','une proposition relative','un attribut'],'Adjectif collé au nom.'],
 ['Quel pronom relatif complète : « le livre … je lis » ?','que',['qui','dont','où'],'Je lis le livre → que (COD).',2],
 ['Quel pronom relatif complète : « la ville … j’habite » ?','où',['que','qui','dont'],'J’habite dans la ville → où.',2],
 ['Quel pronom relatif complète : « l’ami … je t’ai parlé » ?','dont',['que','qui','où'],'Parler de l’ami → dont.',3],
 ['Quel pronom relatif complète : « le chat … dort » ?','qui',['que','dont','où'],'Le chat dort → qui (sujet).'],
 ['« une tasse <u>de chocolat chaud</u> » : l’expansion est…','un complément du nom',['une proposition relative','un adjectif épithète','un COD'],'Préposition « de » + groupe nominal.']]});
E('cm2-fr-phrase-complexe',{items:[
 {n:'Combien de propositions : « Je pense qu’il viendra demain. » ?',a:2,e:'pense, viendra.'},{n:'Combien de propositions : « Mange ta soupe, elle va refroidir. » ?',a:2,e:'mange, va refroidir (un seul verbe conjugué : va).',d:2},
 {n:'Combien de propositions : « Le soleil brille. » ?',a:1,e:'Un seul verbe conjugué.'},{n:'Combien de propositions : « Il court, saute, plonge et nage. » ?',a:4,e:'court, saute, plonge, nage.',d:2},
 ['« Il pleut mais il fait chaud. » Les propositions sont…','coordonnées',['juxtaposées','une principale et une subordonnée'],'Reliées par « mais ».'],
 ['« Si tu travailles, tu réussiras. » Les propositions sont…','une principale et une subordonnée',['juxtaposées','coordonnées'],'« si » introduit une subordonnée.'],
 ['« Il fait nuit : les étoiles brillent. » Les propositions sont…','juxtaposées',['coordonnées','une principale et une subordonnée'],'Séparées par deux-points.']]});
E('cm2-fr-accords',{items:[
 ['Accorde : « Les tartes sont (délicieux). »','délicieuses',['délicieux','délicieuse','délicieuxes'],'Attribut : tartes, féminin pluriel.'],
 ['Accorde : « Mon frère et ma sœur sont (blond). »','blonds',['blondes','blond','blonde'],'Masculin + féminin → masculin pluriel.'],
 ['Accorde : « Les montagnes paraissent (bleu). »','bleues',['bleus','bleu','bleue'],'Féminin pluriel.'],
 ['Accorde : « Ces chevaux semblent (calme). »','calmes',['calme','calmms','calmée'],'Pluriel (calme a déjà un e).'],
 ['Accorde le verbe : « Le chat et la souris (jouer, présent). »','jouent',['joue','joues','jouons'],'Deux sujets → pluriel.'],
 ['Accorde le verbe : « Toi et moi (être, présent) amis. »','sommes',['sont','êtes','est'],'Toi et moi = nous.'],
 ['Accorde le verbe : « Toi et Léo (venir, futur). »','viendrez',['viendront','viendrons','viendra'],'Toi et Léo = vous.'],
 ['Accorde : « La porte et le volet sont (fermé). »','fermés',['fermées','fermé','fermée'],'Masculin + féminin → masculin pluriel.',2],
 ['Accorde : « Ces fleurs restent (frais) longtemps. »','fraîches',['frais','fraîche','fraises'],'frais → fraîche au féminin.',3],
 ['Accorde : « Les nuits deviennent (long). »','longues',['longs','longue','long'],'long → longue au féminin.',2],
 ['Accorde le verbe : « La plupart des élèves (aimer, présent) le sport. »','aiment',['aime','aimes','aimons'],'« La plupart des » entraîne le pluriel.',3]]});
E('cm2-fr-participe-passe',{items:[
 ['« Les invités sont (arriver) tard. »','arrivés',['arrivé','arrivées','arrivée'],'Être : accord avec « invités ».'],
 ['« Ma sœur a (faire) un gâteau. »','fait',['faite','faits','faites'],'Avoir, COD après : pas d’accord.'],
 ['« Les filles sont (descendre) en courant. »','descendues',['descendu','descendus','descendue'],'Être : féminin pluriel.'],
 ['« Nous avons (voir) un film. »','vu',['vus','vues','vue'],'Avoir, COD après.'],
 ['« La lettre que j’ai (recevoir) est longue. »','reçue',['reçu','reçus','reçues'],'COD « que » = la lettre, placé avant.',3],
 ['« Ces pommes, je les ai (manger). »','mangées',['mangé','mangés','mangée'],'COD « les » placé avant.',3],
 ['« Ils ont (prendre) le train. »','pris',['prise','prises','prit'],'Avoir, COD après.'],
 ['« Elle est (rester) chez elle. »','restée',['resté','restés','restées'],'Être : féminin singulier.'],
 ['« Les livres que tu as (lire) sont rangés. »','lus',['lu','lues','lue'],'COD « que » = les livres, avant.',3],
 ['« Mes parents sont (partir) en voyage. »','partis',['parti','parties','partie'],'Être : masculin pluriel.']]});
E('cm2-fr-temps-recit',{items:[
 ['« Le vent (souffler) depuis le matin. »','soufflait',['souffla'],'Action qui dure : imparfait.'],
 ['« Brusquement, la porte (s’ouvrir). »','s’ouvrit',['s’ouvrait'],'Action soudaine : passé simple.'],
 ['« Chaque été, la famille (partir) à la mer. »','partait',['partit'],'Habitude : imparfait.'],
 ['« Le roi (être) vieux et fatigué. »','était',['fut'],'Description : imparfait.'],
 ['« Il (saisir) son épée et (s’élancer). »','saisit … s’élança',['saisissait … s’élançait','saisit … s’élançait','saisissait … s’élança'],'Actions successives : passé simple.',2],
 ['« Pendant qu’elle (lire), le téléphone (sonner). »','lisait … sonna',['lut … sonnait','lisait … sonnait','lut … sonna'],'Action en cours (imparfait) interrompue (passé simple).',3],
 ['« La maison (être) silencieuse quand le chat (sauter) sur la table. »','était … sauta',['fut … sautait','était … sautait','fut … sauta'],'Décor + action brève.',3],
 ['Les mots « soudain », « tout à coup » annoncent souvent…','le passé simple',['l’imparfait','le futur','le présent de vérité générale'],'Ils introduisent une action brève.'],
 ['Le décor d’un récit au passé est généralement à…','l’imparfait',['au passé simple','au futur','au conditionnel'],'Arrière-plan = imparfait.'],
 ['« Les enfants (jouer) dans la neige. » (décor)','jouaient',['jouèrent'],'Description d’arrière-plan : imparfait.']]});
E('cm2-fr-homophones',{items:[
 ['Complète : « … leur faute. » (cela est)','C’est',['S’est','Ses','Ces'],'C’est = cela est.'],
 ['Complète : « Elle … trompée de chemin. »','s’est',['c’est','ses','ces'],'Devant un participe : s’est.'],
 ['Complète : « Je … ai donné … cahiers. »','leur … leurs',['leurs … leur','leur … leur','leurs … leurs'],'leur + verbe ; leurs + nom pluriel.',2],
 ['Complète : « … filles chantent bien ! »','Quelles',['Qu’elles','Quel','Quels'],'Devant un nom féminin pluriel.',2],
 ['Complète : « Il a … de temps. »','peu',['peut','peux'],'peu = pas beaucoup.'],
 ['Complète : « Il ne … pas venir. »','peut',['peu','peux'],'pouvait → peut.']]});
E('cm2-fr-ecrire',{items:[
 ['Quel connecteur exprime la cause ?','car',['donc','pourtant','ensuite'],'car = parce que.'],
 ['Quel connecteur sert à conclure ?','finalement',['d’abord','soudain','car'],'finalement / enfin.'],
 ['Pour reprendre « la sorcière » sans répétition, on peut écrire…','la vieille femme',['le chevalier','la forêt','le chaudron'],'Un groupe nominal qui désigne le même personnage.'],
 ['Un verbe de parole qui exprime une réponse :','répondit',['marcha','dormit','mangea'],'répondre introduit une réponse.']]});
E('cm2-fr-dictee',{items:[DICT('Les enfants que nous avons rencontrés étaient joyeux.'),DICT('Elle s’est levée tôt pour voir le soleil.'),DICT('Quand la cloche sonna, tous les élèves sortirent.'),DICT('Mes cousines sont arrivées hier soir.'),DICT('Ils parlent couramment deux langues.'),DICT('Où avez-vous rangé vos nouveaux cahiers ?')],w:.45});

/* ---------- Mathématiques ---------- */
E('cm2-ma-solides',{items:[
 {f:()=>{const n=MQ.H.R(3,8);const k=MQ.H.P(['faces','arêtes','sommets']);const v={faces:n+2,arêtes:3*n,sommets:2*n}[k];return MQ.H.num(`Combien ${k==='arêtes'?'d’':'de '}<b>${k}</b> a un prisme droit dont la base a ${n} côtés ?`,v,{expl:`Prisme, base à ${n} côtés : ${n+2} faces, ${3*n} arêtes, ${2*n} sommets → <b>${v}</b>.`});}},
 {f:()=>{const n=MQ.H.R(3,8);const k=MQ.H.P(['faces','arêtes','sommets']);const v={faces:n+1,arêtes:2*n,sommets:n+1}[k];return MQ.H.num(`Combien ${k==='arêtes'?'d’':'de '}<b>${k}</b> a une pyramide dont la base a ${n} côtés ?`,v,{expl:`Pyramide, base à ${n} côtés : ${n+1} faces, ${2*n} arêtes, ${n+1} sommets → <b>${v}</b>.`});}},
 {f:()=>{const L=MQ.H.R(2,9),l=MQ.H.R(1,L),h=MQ.H.R(1,6);return MQ.H.num(`Quelle est la somme des longueurs de toutes les arêtes d’un pavé de ${L} cm × ${l} cm × ${h} cm ?`,4*(L+l+h),{unit:'cm',expl:`4 × (${L} + ${l} + ${h}) = <b>${4*(L+l+h)} cm</b> (12 arêtes, 4 de chaque longueur).`});}}],w:.5});

/* ---------- Sciences ---------- */
E('cm2-sc-etats',{items:[
 ['Le passage de l’état gazeux à l’état liquide s’appelle…','la condensation (liquéfaction)',['la fusion','la solidification','la vaporisation'],'Ex. : la buée.'],
 ['Le passage de l’état liquide à l’état gazeux s’appelle…','la vaporisation',['la condensation','la fusion','la solidification'],'Ex. : l’eau qui bout.']]});
E('cm2-sc-energie',{items:[
 ['Un panneau solaire transforme la lumière en…','électricité',['eau','pétrole','charbon'],'Panneau photovoltaïque.'],
 ['Le vent fait tourner…','une éolienne',['un barrage','un panneau solaire','une centrale à charbon'],'L’éolienne produit de l’électricité.'],
 ['Le pétrole est une énergie…','fossile non renouvelable',['renouvelable','inépuisable','solaire'],'Formé en des millions d’années.'],
 ['Brûler du charbon rejette…','du dioxyde de carbone',['de l’oxygène pur','de l’eau potable','rien'],'Il renforce l’effet de serre.'],
 ['Une énergie renouvelable…','se renouvelle naturellement et rapidement',['s’épuise définitivement','est toujours polluante','n’existe pas'],'Soleil, vent, eau…'],
 ['L’énergie de la chaleur de la Terre s’appelle…','la géothermie',['l’éolien','le nucléaire','la biomasse'],'Géo = Terre ; thermie = chaleur.',2],
 ['Le bois utilisé pour se chauffer est une énergie issue de…','la biomasse',['la géothermie','l’uranium','le pétrole'],'La biomasse = matière vivante.',2],
 ['Pour économiser l’énergie à la maison, on peut…','baisser un peu le chauffage et isoler',['laisser les fenêtres ouvertes en hiver','laisser les lumières allumées','chauffer dehors'],'Isolation et sobriété.']]});
E('cm2-sc-biodiversite',{items:[
 ['Une espèce menacée de disparition est dite…','en danger',['éteinte','envahissante','domestique'],'Elle risque de disparaître.'],
 ['Le mammouth est une espèce…','éteinte',['en danger','vivant en Afrique','domestique'],'Il a disparu il y a environ 4 000 ans.',2],
 ['Les fossiles se trouvent surtout…','dans les roches sédimentaires',['dans l’air','dans les nuages','dans le feu'],'Les sédiments ont recouvert les restes.',3],
 ['Protéger une zone naturelle peut se faire en créant…','une réserve naturelle',['un parking','une autoroute','une usine'],'Pour préserver les espèces.'],
 ['La biodiversité désigne…','la variété des êtres vivants et des milieux',['le nombre de villes','les températures','les volcans'],'Bio = vie, diversité = variété.'],
 ['Le dodo, oiseau de l’île Maurice, a disparu à cause…','des activités humaines (chasse, animaux introduits)',['d’un volcan','du froid','de la Lune'],'Il a disparu au XVIIe siècle.',3],
 ['Les abeilles sont importantes car elles…','pollinisent les fleurs',['mangent les moustiques','produisent de l’électricité','creusent des terriers'],'Sans pollinisation, moins de fruits.'],
 ['Une espèce introduite qui prolifère et menace les autres est dite…','envahissante (invasive)',['protégée','éteinte','fossile'],'Ex. : le frelon asiatique.',2],
 ['Les dinosaures non aviens ont-ils côtoyé les humains ?','non',['oui'],'Des dizaines de millions d’années les séparent.'],
 ['Le cœlacanthe, poisson connu par des fossiles, est…','toujours vivant aujourd’hui',['éteint depuis 66 millions d’années','un dinosaure','une plante'],'On l’a redécouvert en 1938.',3]]});
E('cm2-sc-digestion',{items:[
 ['L’estomac…','brasse les aliments avec des sucs digestifs',['fabrique le sang','sert à respirer','stocke l’air'],'Il malaxe et commence la digestion.'],
 ['La salive est produite dans…','la bouche',['l’estomac','les poumons','le cœur'],'Les glandes salivaires.'],
 ['L’intestin grêle mesure environ…','6 à 7 mètres',['10 centimètres','1 kilomètre','50 centimètres'],'Il est très long et replié.',2]]});
E('cm2-sc-respiration',{items:[
 ['Inspirer, c’est…','faire entrer l’air dans les poumons',['rejeter l’air','avaler la nourriture','dormir'],'Inspiration.'],
 ['Expirer, c’est…','rejeter l’air des poumons',['faire entrer l’air','boire','manger'],'Expiration.'],
 ['Le muscle sous les poumons qui aide à respirer s’appelle…','le diaphragme',['le biceps','le cœur','l’estomac'],'Il se contracte à chaque inspiration.',2],
 ['Le sang chargé de dioxygène part des poumons vers…','le cœur, puis tout le corps',['l’estomac seulement','les cheveux','les ongles'],'Le cœur le propulse dans le corps.',2],
 {n:'Si tu respires 15 fois par minute, combien de fois respires-tu en une heure ?',a:900,e:'15 × 60 = 900.',d:2},
 ['Le rythme respiratoire pendant un effort…','augmente',['diminue','s’arrête','ne change pas'],'Les muscles ont besoin de plus de dioxygène.'],
 ['Les globules rouges transportent…','le dioxygène',['la nourriture solide','les os','l’urine'],'Ils fixent le dioxygène.',3],
 ['Un fumeur abîme surtout…','ses poumons',['ses cheveux seulement','ses ongles','ses oreilles'],'Le tabac détruit les alvéoles.'],
 ['Le pouls se prend souvent…','au poignet ou au cou',['au genou','au coude','au pied'],'On sent le sang battre dans les artères.'],
 ['L’air que l’on expire contient plus de … que l’air inspiré.','dioxyde de carbone',['dioxygène','azote pur','hélium'],'Le corps rejette du CO₂.',2]]});
E('cm2-sc-reproduction',{items:[
 ['La rencontre d’un ovule et d’un spermatozoïde donne…','une cellule-œuf',['un bébé tout formé','un embryon de poisson','un fœtus immédiatement'],'C’est la première cellule du futur bébé.'],
 ['Le placenta permet…','les échanges entre la mère et le fœtus',['de respirer de l’air','de digérer les aliments du bébé','rien'],'Nutriments et dioxygène passent par le placenta et le cordon.',2]]});
E('cm2-sc-terre-active',{items:[
 ['Un volcan qui n’est plus entré en éruption depuis très longtemps mais peut se réveiller est dit…','endormi',['éteint pour toujours','actif tous les jours','artificiel'],'Comme ceux de la Chaîne des Puys.',2],
 ['Le lieu en profondeur où se produit un séisme s’appelle…','le foyer',['le cratère','la lave','la cheminée'],'Au-dessus, en surface : l’épicentre.',3],
 ['Le point en surface situé au-dessus du foyer d’un séisme s’appelle…','l’épicentre',['le cratère','le magma','le sommet'],'C’est là que le séisme est le plus fort.',3],
 ['La Montagne Pelée se trouve…','en Martinique',['en Corse','en Alsace','en Bretagne'],'Éruption meurtrière de 1902.',2],
 ['Une éruption explosive projette…','des cendres et des blocs',['seulement de l’eau','de la neige','des fleurs'],'Les éruptions explosives sont dangereuses.'],
 ['Un tsunami peut être provoqué par…','un séisme sous la mer',['la pluie','le vent seul','la Lune seulement'],'Le sol marin bouge et soulève l’eau.'],
 ['Pour réduire les risques, on construit…','des bâtiments parasismiques',['des maisons en papier','des tours sans fondations','rien'],'Ils résistent mieux aux secousses.',2]]});
E('cm2-sc-environnement',{items:[
 ['Un composteur transforme…','les déchets organiques en terreau',['le plastique en verre','le métal en bois','l’eau en pétrole'],'Épluchures, marc de café…'],
 ['Réutiliser un bocal pour ranger des crayons, c’est…','réutiliser',['recycler','jeter','polluer'],'On donne une nouvelle vie à l’objet.'],
 ['L’eau potable du robinet vient d’…','une usine de traitement de l’eau',['une usine de pétrole','la mer directement sans traitement','la pluie qui tombe dans le tuyau'],'L’eau est captée, traitée, distribuée.',2],
 ['Un appareil électrique en veille…','consomme encore de l’électricité',['ne consomme rien','produit de l’électricité','recharge la maison'],'Mieux vaut l’éteindre.'],
 ['Les déchets plastiques dans la mer…','menacent les animaux marins',['nourrissent les poissons','disparaissent en un jour','sont sans effet'],'Les animaux les avalent.'],
 ['Le gaspillage alimentaire, c’est…','jeter de la nourriture encore mangeable',['manger tout son repas','cuisiner les restes','faire ses courses'],'On peut le réduire.'],
 ['Acheter des produits locaux et de saison permet…','de réduire le transport et la pollution',['de polluer plus','de gaspiller','de payer plus d’impôts'],'Moins de kilomètres parcourus.',2]]});
E('cm2-sc-electricite',{items:[
 ['Deux lampes en série : si l’une grille…','l’autre s’éteint aussi',['l’autre brille plus fort','rien ne change','les deux brillent'],'Le circuit en série est coupé.',2],
 ['Deux lampes en dérivation : si l’une grille…','l’autre reste allumée',['l’autre s’éteint','la pile explose','tout s’éteint'],'Chaque lampe a sa propre boucle.',3],
 ['Un court-circuit, c’est quand le courant…','passe par un chemin sans résistance (fil direct)',['ne passe plus du tout','passe par une lampe','passe par un isolant'],'C’est dangereux : la pile chauffe.',3],
 ['Les prises de la maison délivrent une tension d’environ…','230 volts',['4,5 volts','1,5 volt','10 000 volts'],'Dangereuse pour l’homme.',2],
 ['Une pile plate de classe a une tension de…','4,5 volts',['230 volts','100 volts','0 volt'],'Sans danger.']]});

/* ---------- Histoire-géographie ---------- */
E('cm2-hg-republique',{items:[
 ['Qui a fait abolir l’esclavage en 1848 ?','Victor Schœlcher',['Jules Ferry','Napoléon','Louis XIV'],'Le décret du 27 avril 1848.',2],
 ['La IIIe République dure de 1870 à…','1940',['1789','2000','1815'],'Elle prend fin pendant la Seconde Guerre mondiale.',3],
 ['Le 14 juillet devient fête nationale en…','1880',['1789','1905','1944'],'Sous la IIIe République.',2],
 ['La Marseillaise devient hymne national en…','1879',['1792','1958','1918'],'Écrite en 1792 par Rouget de Lisle.',3],
 ['Les femmes votent pour la première fois en France en…','1945',['1848','1905','1789'],'Droit de vote accordé en 1944.',2]]});
E('cm2-hg-ecole',{items:[
 ['La loi qui rend l’école gratuite date de…','1881',['1789','1945','2000'],'Loi Ferry de 1881.'],
 ['La loi qui rend l’école obligatoire et laïque date de…','1882',['1881','1905','1958'],'Loi Ferry de 1882.'],
 ['Dans l’école de 1900, filles et garçons étaient souvent…','séparés',['toujours mélangés','dans la même équipe de foot','absents'],'Écoles ou classes séparées.'],
 ['L’instituteur de la IIIe République était surnommé…','le hussard noir',['le chevalier blanc','le pompier','le docteur'],'À cause de son costume sombre.',3],
 ['Le tableau noir s’écrivait…','à la craie',['au feutre','au stylo','au clavier'],'Avec une craie blanche.'],
 ['Les bons élèves pouvaient recevoir…','des bons points et des images',['des téléphones','des voitures','de l’argent'],'Récompenses de l’école d’autrefois.'],
 ['La morale et l’instruction civique enseignaient…','les devoirs du citoyen',['la cuisine','la chasse','le jardinage seulement'],'Former des citoyens.',2],
 ['Aujourd’hui, l’école publique reste…','gratuite et laïque',['payante','religieuse','réservée aux garçons'],'Principes toujours en vigueur.'],
 ['Le certificat d’études primaires a été supprimé en…','1989',['1882','1900','2026'],'Il a existé plus d’un siècle.',3],
 ['Le cartable de 1900 contenait souvent…','une ardoise, un porte-plume et des cahiers',['une tablette','une calculatrice','un téléphone'],'Matériel d’autrefois.']]});
E('cm2-hg-industrie',{items:[
 ['La première ligne de chemin de fer en France relie, en 1827, Saint-Étienne à…','Andrézieux',['Paris','Marseille','Lille'],'Pour transporter le charbon.',3],
 ['L’inventeur qui a perfectionné la machine à vapeur est…','James Watt',['Louis Pasteur','Jules Verne','Victor Hugo'],'Au XVIIIe siècle.',2],
 ['Pendant l’âge industriel, beaucoup de paysans partent vers les villes : c’est…','l’exode rural',['la migration des oiseaux','la colonisation','la Révolution'],'Ils cherchent du travail à l’usine.',2],
 ['Les mineurs extrayaient…','du charbon',['du blé','du sel de mer','du lait'],'Le charbon alimente les machines.'],
 ['La loi de 1841 limite…','le travail des enfants',['la vitesse des trains','le prix du pain','le nombre d’écoles'],'Interdit avant 8 ans dans les grandes usines.',3],
 ['« Germinal » d’Émile Zola raconte la vie…','des mineurs',['des rois','des chevaliers','des astronautes'],'Roman de 1885.',3],
 ['L’ampoule électrique se diffuse à la fin du…','XIXe siècle',['XVIe siècle','Moyen Âge','XXIe siècle'],'Edison, 1879.',2],
 ['Une usine est…','un lieu où l’on fabrique des objets en grande quantité',['une ferme','une église','un château'],'Production industrielle.'],
 ['La Tour Eiffel, construite en 1889, est en…','fer',['bois','pierre','verre'],'Symbole de l’âge industriel.'],
 ['Au XIXe siècle, les villes industrielles se couvrent de…','cheminées d’usines',['éoliennes','panneaux solaires','châteaux forts'],'Le charbon fait fumer les usines.']]});
E('cm2-hg-guerre-14',{items:[
 ['La Première Guerre mondiale commence en…','1914',['1939','1870','1918'],'Été 1914.'],
 ['Un « poilu » est…','un soldat français de 14-18',['un chien','un général allemand','un aviateur anglais'],'Surnom des soldats français.'],
 ['La bataille de Verdun a lieu en…','1916',['1914','1918','1940'],'De février à décembre 1916.'],
 ['L’armistice met fin aux combats le…','11 novembre 1918',['8 mai 1945','14 juillet 1789','1er janvier 1919'],'Commémoré chaque année.'],
 ['Les tranchées sont…','des fossés où vivent les soldats au front',['des châteaux','des usines','des hôpitaux'],'Boue, rats, froid.'],
 ['Le traité qui met fin à la guerre avec l’Allemagne est signé en 1919 à…','Versailles',['Rome','Londres','Berlin'],'Traité de Versailles.',2],
 ['Les infirmières soignaient les blessés…','à l’arrière, dans des hôpitaux',['dans les tranchées seulement','en Amérique','à l’école'],'Rôle des femmes.'],
 ['Le monument aux morts porte…','les noms des soldats morts de la commune',['les noms des rois','les résultats sportifs','des publicités'],'Mémoire de la guerre.'],
 ['Les « gueules cassées » sont…','des soldats blessés au visage',['des statues','des chiens de guerre','des avions'],'Blessures terribles.',3],
 ['Pendant la guerre, des enfants écrivaient aux soldats des…','lettres',['SMS','e-mails','vidéos'],'Le courrier reliait l’arrière et le front.']]});
E('cm2-hg-guerre-39',{items:[
 ['La Seconde Guerre mondiale commence en…','1939',['1914','1945','1918'],'Septembre 1939.'],
 ['La France est battue et occupée en…','1940',['1945','1918','1950'],'Défaite de juin 1940.'],
 ['Un résistant est une personne qui…','lutte contre l’occupant',['collabore avec l’occupant','reste neutre','vit en Amérique'],'La Résistance.'],
 ['Les camps d’extermination nazis ont servi à…','assassiner des millions de personnes, surtout des Juifs',['soigner les blessés','loger les soldats','fabriquer des avions'],'La Shoah.',2],
 ['La guerre en Europe se termine le…','8 mai 1945',['11 novembre 1918','14 juillet 1789','6 juin 1944'],'Capitulation allemande.'],
 ['Anne Frank est connue pour…','son journal écrit pendant qu’elle se cachait',['une victoire militaire','un roman d’aventures','une chanson'],'Jeune fille juive morte en déportation.',2],
 ['Paris est libérée en…','août 1944',['mai 1940','novembre 1918','juin 1950'],'Fin août 1944.',3],
 ['L’ONU est créée en 1945 pour…','maintenir la paix dans le monde',['faire la guerre','vendre du pétrole','organiser les Jeux olympiques'],'Organisation des Nations unies.',2]]});
E('cm2-hg-europe',{items:[
 ['Le traité de Rome a créé en 1957…','la Communauté économique européenne',['l’ONU','l’euro','la République'],'6 pays fondateurs.'],
 ['Les 6 pays fondateurs comprennent…','la France, l’Allemagne, l’Italie, la Belgique, les Pays-Bas, le Luxembourg',['la France, l’Espagne, le Portugal, la Grèce, l’Irlande, la Suède','le Royaume-Uni et les États-Unis','la Chine et le Japon'],'Les 6 de 1957.',2],
 ['Les élections européennes permettent d’élire…','les députés européens',['le président français','le maire','les juges'],'Le Parlement européen.',2],
 ['Combien de pays utilisent l’euro (zone euro) en 2026 ?','21',['27','6','50'],'La Bulgarie a rejoint la zone euro le 1er janvier 2026.',3],
 ['Le Royaume-Uni a quitté l’Union européenne en…','2020',['1957','2002','1992'],'C’est le Brexit.',2],
 ['L’Union européenne a reçu le prix Nobel de la paix en…','2012',['1957','1945','2002'],'Pour son rôle dans la paix en Europe.',3],
 ['Les étoiles du drapeau européen sont…','dorées sur fond bleu',['rouges sur fond blanc','vertes sur fond jaune','noires sur fond rouge'],'12 étoiles d’or.'],
 ['La capitale de la Belgique, Bruxelles, accueille…','la Commission européenne',['la tour Eiffel','le Parlement français','l’ONU'],'Siège d’institutions européennes.',2]]});
E('cm2-hg-deplacer',{items:[
 ['Un aéroport international relie une ville…','au monde entier',['seulement à son quartier','à la mer uniquement','à rien'],'Vols internationaux.'],
 ['Le RER circule surtout…','en Île-de-France',['en Bretagne seulement','entre la France et le Japon','sur la mer'],'Réseau express régional.',2],
 ['Une autoroute permet…','des trajets rapides entre grandes villes',['de traverser les océans','de se promener à pied','d’aller sur la Lune'],'Axe routier rapide.'],
 ['Les embouteillages se produisent surtout…','aux heures de pointe dans les grandes villes',['à minuit en campagne','en pleine mer','sur les pistes de ski'],'Trajets domicile-travail.'],
 ['Le métro est un transport…','urbain',['rural','maritime','aérien'],'Il circule dans les villes.'],
 ['Un vélo en libre-service permet…','de louer un vélo pour un trajet en ville',['de voler','d’aller en Amérique','de transporter des tonnes'],'Mobilité douce.'],
 ['Le port du Havre est surtout un port…','de marchandises',['de pêche uniquement','de plaisance seulement','fluvial de montagne'],'Grand port maritime.',3],
 ['Lille, Paris et Londres sont reliées par…','le train Eurostar',['un pont routier','un téléphérique','une ligne de bus seulement'],'Via le tunnel sous la Manche.',2]]});
E('cm2-hg-internet',{items:[
 ['Le « cloud » (nuage informatique), c’est…','le stockage de données sur des serveurs distants',['un vrai nuage','une pluie de données','un antivirus'],'Les fichiers sont stockés dans des centres de données.',2],
 ['Une visioconférence permet…','de se voir et se parler à distance',['de cuisiner','d’envoyer un colis','d’imprimer'],'Usage d’Internet.'],
 ['Pour réduire la fracture numérique, on peut…','former les personnes et installer la fibre',['supprimer Internet','interdire les ordinateurs','fermer les écoles'],'Accès et formation.'],
 ['Un moteur de recherche sert à…','trouver des informations sur Internet',['faire avancer une voiture','calculer seul','dessiner'],'Ex. : Qwant, Google.'],
 ['L’ENT (espace numérique de travail) de l’école permet…','de consulter devoirs et ressources',['de jouer à des jeux vidéo','de regarder des films','d’acheter en ligne'],'Outil scolaire.',2],
 ['Un câble sous-marin relie…','des continents',['deux maisons voisines','deux salles de classe','la Lune et la Terre'],'Il traverse les océans.'],
 ['L’accès à Internet est plus difficile…','dans certaines zones rurales et pays pauvres',['dans toutes les grandes villes','nulle part','uniquement en Europe'],'Inégalités d’accès.'],
 ['Les données personnelles doivent être…','protégées',['partagées avec tout le monde','vendues','affichées en public'],'Le RGPD protège les données.',2],
 ['Un site d’actualité fiable indique…','l’auteur et la date de l’information',['aucune source','seulement des publicités','des rumeurs'],'On vérifie la source.'],
 ['Les centres de données consomment beaucoup…','d’électricité',['de lait','de sable','de papier'],'Ils doivent être refroidis.']]});
E('cm2-hg-habiter',{items:[
 ['Les espaces verts en ville permettent…','de rafraîchir l’air et d’accueillir la biodiversité',['de polluer plus','d’augmenter le bruit','de supprimer les oiseaux'],'Nature en ville.'],
 ['Un bâtiment à énergie positive…','produit plus d’énergie qu’il n’en consomme',['consomme beaucoup','n’a pas de fenêtres','fonctionne au charbon'],'Grâce aux panneaux solaires et à l’isolation.',3],
 ['Les « îlots de chaleur » en ville sont…','des zones où il fait plus chaud à cause du béton',['des îles tropicales','des piscines','des parcs'],'Le béton et le goudron stockent la chaleur.',2],
 ['Un potager urbain permet…','de cultiver des légumes en ville',['de garer des voitures','de construire des tours','d’élever des lions'],'Agriculture urbaine.'],
 ['Les pistes cyclables favorisent…','les déplacements à vélo',['les embouteillages','la pollution','les trajets en avion'],'Mobilité douce.'],
 ['Habiter un écoquartier, c’est vivre dans un quartier…','qui limite son impact sur l’environnement',['sans électricité','sans habitants','sans école'],'Écoquartier.'],
 ['Trier ses déchets permet…','de les recycler',['de les cacher','de les brûler partout','de polluer'],'Le tri facilite le recyclage.'],
 ['Pour mieux habiter, une commune peut créer…','des zones piétonnes',['plus de routes en ville seulement','des usines au centre','des décharges'],'Moins de voitures, plus de calme.']]});

/* ---------- EMC ---------- */
E('cm2-emc-droits',{items:[
 ['La CIDE a été ratifiée par la France en…','1990',['1789','1945','2010'],'Un an après son adoption.',3],
 ['Le Défenseur des droits peut aider…','les enfants dont les droits ne sont pas respectés',['à faire ses devoirs','à gagner un match','à acheter un jouet'],'Une autorité indépendante.',2],
 ['Le droit d’être protégé contre toute forme de violence est…','un droit de l’enfant',['un privilège','une option','une obligation religieuse'],'Inscrit dans la CIDE.']]});
E('cm2-emc-symboles',{items:[
 ['Le coq est…','un symbole non officiel de la France',['l’hymne national','la devise','la fête nationale'],'Il est souvent associé au sport.',2],
 ['La devise est inscrite sur…','les mairies et les écoles',['les voitures','les arbres','les pièces de monnaie seulement'],'Sur les bâtiments publics.'],
 ['La laïcité signifie notamment que…','l’État ne reconnaît ni ne finance aucun culte',['une seule religion est autorisée','les religions sont interdites','le président choisit la religion'],'Loi de 1905.',2]]});
E('cm2-en-world',{items:[
 ['Quelle est la capitale de l’Écosse ?','Édimbourg',['Londres','Dublin','Cardiff'],'Edinburgh.'],
 ['Quelle est la capitale du pays de Galles ?','Cardiff',['Belfast','Londres','Édimbourg'],'Cardiff.'],
 ['L’Afrique du Sud fait partie des pays où l’on parle…','anglais (parmi plusieurs langues officielles)',['seulement français','seulement allemand','seulement japonais'],'Elle a 12 langues officielles dont l’anglais.',3]]});

/* ---------- Arts, musique, EPS, EVAR ---------- */
E('cm2-ap-perspective',{items:[
 ['Dans une perspective, les rails d’un train dessinés…','se rapprochent vers le point de fuite',['s’écartent vers l’horizon','restent toujours parallèles sur le dessin','disparaissent au premier plan'],'Ils convergent.'],
 ['La ligne d’horizon est souvent placée…','à la hauteur des yeux de celui qui regarde',['en bas du cadre toujours','sur le bord gauche','au premier plan'],'Elle correspond au niveau du regard.',2]],
 parts:[HE('🖼️','Atelier hors écran : la rue en perspective',{but:'dessiner une rue avec un point de fuite.',consigne:'Trace une ligne d’horizon et un point de fuite au milieu. Dessine une rue dont les bords partent vers le point de fuite, puis des maisons et des arbres qui rapetissent en s’éloignant.',duree:'40 minutes',materiel:'feuille, règle, crayon',auto:'Toutes mes lignes de profondeur vont vers le point de fuite.'})]});
E('cm2-ap-photo',{parts:[HE('📷','Atelier hors écran : un objet, trois photos',{but:'voir comment le cadrage change le sens d’une image.',consigne:'Avec un adulte et un appareil, photographie le même objet en plongée, en contre-plongée et en gros plan. Compare : quelle photo rend l’objet impressionnant ? fragile ?',duree:'20 minutes',materiel:'appareil photo ou téléphone d’un adulte',auto:'J’ai réalisé les 3 cadrages et j’explique l’effet de chacun.'})]});
E('cm2-ap-contemporain',{items:[
 ['Une œuvre créée pour un lieu précis est dite…','in situ',['portable','abstraite','miniature'],'Elle dépend du lieu où elle est installée.',2],
 ['Marcel Duchamp a exposé en 1917 un urinoir intitulé…','Fontaine',['La Joconde','Le Cri','Guernica'],'Un « ready-made ».',3]],
 parts:[HE('🗿','Atelier hors écran : mon installation',{but:'créer une œuvre qui transforme un lieu.',consigne:'Avec des objets du quotidien (bouteilles, rubans, feuilles), crée une petite installation dans un coin de ta chambre ou du jardin. Photographie-la (avec un adulte) et donne-lui un titre.',duree:'40 minutes',materiel:'objets de récupération',auto:'Mon installation occupe un espace et porte un titre qui l’explique.'})]});
E('cm2-mu-orchestre',{parts:[HE('🎻','Activité musicale hors écran : le chef d’orchestre',{but:'comprendre le rôle du chef et des familles d’instruments.',consigne:'Écoute « Pierre et le Loup » ou une ouverture d’orchestre. Joue le chef : bats la pulsation avec la main, fais signe aux cordes, aux bois, aux cuivres quand tu les entends.',duree:'15 minutes',materiel:'enregistrement',auto:'Mes gestes suivent la pulsation et je repère 3 familles.'})]});
E('cm2-mu-parametres',{parts:[HE('🔊','Activité musicale hors écran : crescendo !',{but:'jouer avec l’intensité et le tempo.',consigne:'Chante une chanson connue en commençant piano et en faisant un crescendo jusqu’au forte, puis chante-la allegro puis lento.',duree:'10 minutes',materiel:'aucun',securite:'ne pas crier : forte ne veut pas dire hurler.',auto:'On entend clairement la différence de nuance et de tempo.'})]});
E('cm2-mu-styles',{parts:[HE('🌍','Activité musicale hors écran : la carte des musiques',{but:'situer des styles musicaux dans le monde.',consigne:'Écoute un extrait de jazz, de reggae, de samba et de flamenco. Place chacun sur une carte du monde dessinée et note un instrument entendu.',duree:'30 minutes',materiel:'enregistrements, carte du monde',auto:'Les 4 styles sont au bon endroit, avec un instrument pour chacun.'})]});
E('cm2-eps-natation',{items:[
 ['Pour aider quelqu’un en difficulté dans l’eau sans se mettre en danger, on…','lui tend un objet (perche, bouée) et on appelle à l’aide',['saute toujours pour le chercher','s’en va','attend sans rien dire'],'Ne pas se mettre en danger.'],
 ['Le numéro d’urgence européen est le…','112',['118','3018','119'],'Il fonctionne partout en Europe.',2],
 ['Se baigner après un long moment au soleil, il faut…','entrer progressivement dans l’eau',['plonger d’un coup','courir dans l’eau','rester au soleil'],'Éviter le choc thermique.']],
 parts:[HE('🏊','Mission hors écran : le test du savoir-nager',{but:'s’entraîner aux compétences du savoir-nager en sécurité.',consigne:'À la piscine, avec un maître-nageur ou un adulte : entre dans l’eau en sautant, nage 15 m, fais une surface pour passer sous un obstacle, fais la planche 5 secondes, puis regagne le bord.',duree:'séance de piscine',materiel:'maillot, bonnet',securite:'uniquement en piscine surveillée.',auto:'J’ai réussi chaque étape sans m’accrocher au bord.'})]});
E('cm2-eps-orientation',{parts:[HE('🧭','Mission hors écran : course d’orientation au parc',{but:'lire une carte et se déplacer vers des balises.',consigne:'Un adulte dessine le plan d’un parc avec 5 balises (rubans accrochés). Oriente ta carte, trouve les balises dans l’ordre et note le code de chacune.',duree:'30 minutes',materiel:'plan, rubans, crayon, boussole si possible',securite:'rester dans le parc, en groupe, avec un adulte.',auto:'J’ai trouvé les 5 balises dans l’ordre en orientant ma carte.'})]});
E('cm2-eps-sante',{items:[
 ['La fréquence cardiaque au repos d’un enfant est d’environ…','70 à 100 battements par minute',['5 battements par minute','300 battements par minute','1 battement par heure'],'Elle augmente à l’effort.',2],
 {f:()=>{const p=MQ.H.R(18,35);return MQ.H.num(`Après l’effort, tu comptes ${p} battements en 15 secondes. Combien de battements par minute ?`,p*4,{expl:`${p} × 4 = <b>${p*4}</b> battements par minute.`});}},
 ['S’étirer après l’effort, c’est…','faire des étirements doux, sans douleur',['tirer très fort jusqu’à avoir mal','courir encore plus vite','rester immobile sans boire'],'Doucement et sans douleur.']],
 parts:[HE('❤️','Mission hors écran : mon cœur à l’effort',{but:'observer l’effet de l’effort sur le cœur.',consigne:'Compte tes battements de cœur pendant 15 secondes au repos (au poignet), multiplie par 4. Fais 1 minute de sauts sur place, recompte. Repose-toi 2 minutes et recompte.',duree:'10 minutes',materiel:'montre ou chronomètre',securite:'arrêter en cas de malaise, boire de l’eau.',auto:'J’ai noté 3 mesures et j’explique pourquoi le cœur accélère puis ralentit.'})]});
E('cm2-evar-corps',{items:[
 ['Personne n’a le droit de prendre une photo de moi…','sans mon accord',['jamais, même avec mon accord','sauf mes amis','sauf sur Internet'],'Le droit à l’image et à l’intimité.'],
 ['Si un adulte me demande de garder un secret sur des gestes qui me gênent, je…','en parle à un autre adulte de confiance ou au 119',['garde le secret','me sens fautif','oublie'],'Ce n’est jamais un bon secret.'],
 ['Chacun a le droit de refuser un câlin ou un bisou…','même de la part d’un proche',['jamais','seulement des inconnus','seulement le dimanche'],'Le consentement s’applique à tous.']],
 parts:[HE('🌱','Moment hors écran : mon cercle de confiance',{but:'identifier les adultes à qui parler.',consigne:'Dessine trois cercles autour de ton prénom : au centre les personnes à qui tu peux tout dire, puis celles à qui tu peux demander de l’aide. Ajoute le 119 dans un coin.',duree:'10 minutes',materiel:'feuille, crayons',auto:'Je connais au moins 2 adultes de confiance et le 119.'})]});
E('cm2-evar-relations',{items:[
 ['Dans une relation respectueuse, on…','écoute l’autre et accepte ses refus',['oblige l’autre','se moque','surveille son téléphone'],'Respect et consentement.'],
 ['Insister après un refus, c’est…','ne pas respecter le consentement',['être gentil','normal','une preuve d’amitié'],'Non veut dire non.'],
 ['Un message ou une image intime reçus sans l’avoir demandé…','doivent être signalés à un adulte',['peuvent être partagés','sont sans importance','doivent être gardés secrets'],'Ce n’est pas normal : on en parle.',2]],
 parts:[HE('🤝','Moment hors écran : les phrases du respect',{but:'s’entraîner à exprimer et respecter un refus.',consigne:'Avec un adulte, écrivez 3 façons de dire non poliment mais fermement, et 3 façons de bien réagir quand quelqu’un nous dit non.',duree:'10 minutes',materiel:'feuille',auto:'J’ai trouvé mes phrases et je sais réagir à un refus.'})]});
E('cm2-evar-numerique',{parts:[HE('🛡️','Moment hors écran : mon passeport numérique',{but:'adopter de bons réflexes en ligne.',consigne:'Avec un adulte, écris 5 règles de sécurité en ligne (mot de passe secret, pas d’adresse aux inconnus, demander avant de publier une photo, signaler, 3018). Affiche-les près de l’ordinateur.',duree:'15 minutes',materiel:'feuille, feutres',auto:'Mes 5 règles sont claires et je les applique.'})]});

/* ---------- Compléments de variété ---------- */
E('cm2-fr-classes',{items:[
 ['« souvent » est…','un adverbe',['une préposition','une conjonction de coordination','un nom'],'Il modifie le verbe : il vient souvent.'],
 ['« donc » est, selon la terminologie officielle,…','un adverbe (de liaison)',['une conjonction de coordination','une préposition','un déterminant'],'« Donc » exprime la conséquence ; c’est un adverbe : on peut le déplacer (« il est donc parti »).',2],
 ['« sans » est…','une préposition',['une conjonction de coordination','un adverbe','un pronom'],'Il introduit un complément : sans sucre.'],
 ['Dans « Il court très vite », « très » modifie…','l’adverbe « vite »',['le verbe « court »','le sujet « il »','rien'],'Un adverbe peut modifier un autre adverbe.',3]]});
E('cm2-fr-dictee',{items:[DICT('Les feuilles tombèrent toute la nuit.'),DICT('Nous sommes allés voir nos grands-parents.'),DICT('Les lettres qu’elle a écrites sont arrivées.')],w:.3});
E('cm2-hg-guerre-39',{items:[
 ['Le débarquement de Normandie a lieu le…','6 juin 1944',['8 mai 1945','11 novembre 1918','18 juin 1940'],'Jour J.'],
 ['L’appel du 18 juin 1940 est lancé depuis…','Londres',['Paris','Berlin','Vichy'],'Par le général de Gaulle, à la radio (BBC).',2],
 ['Le régime de Vichy est dirigé par…','le maréchal Pétain',['le général de Gaulle','Jean Moulin','Jules Ferry'],'Il collabore avec l’Allemagne nazie.',2]]});
E('cm2-hg-europe',{items:[
 ['L’euro est la monnaie de…','plusieurs pays de l’Union européenne',['tous les pays du monde','seulement la France','les États-Unis'],'La zone euro.'],
 ['Le Parlement européen est élu…','au suffrage universel direct par les citoyens européens',['par le président français seul','par tirage au sort','par les maires'],'Tous les 5 ans.',2],
 ['La journée de l’Europe, le 9 mai, rappelle la déclaration de…','Robert Schuman (1950)',['Napoléon (1804)','Jules Ferry (1882)','Victor Hugo (1862)'],'Point de départ de la construction européenne.',3]]});
E('cm2-hg-deplacer',{items:[
 ['Le covoiturage permet…','de partager une voiture et de réduire la pollution',['de rouler plus vite','de ne jamais payer l’essence','d’avoir plus de voitures'],'Moins de voitures sur la route.'],
 ['Le tramway circule…','sur des rails dans les rues de la ville',['dans les airs','sous la mer','sur l’autoroute'],'Transport urbain électrique.'],
 ['Un péage est…','un endroit où l’on paie pour utiliser l’autoroute',['un parking gratuit','un aéroport','une gare'],'Beaucoup d’autoroutes sont payantes.',2]]});
E('cm2-hg-habiter',{items:[
 ['Le recyclage du verre permet de…','fabriquer de nouvelles bouteilles',['produire du pétrole','faire pousser des arbres','chauffer les maisons'],'Le verre se recycle à l’infini.'],
 ['Une « ville du quart d’heure » vise à…','avoir commerces, écoles et services à 15 minutes à pied ou à vélo',['construire des tours de 15 étages','limiter les trajets à 15 km en voiture','fermer les rues 15 minutes par jour'],'Réduire les déplacements.',3],
 ['Les toits végétalisés aident à…','isoler les bâtiments et retenir l’eau de pluie',['augmenter la chaleur','attirer les voitures','faire du bruit'],'Ils rafraîchissent et isolent.',2]]});
})();
