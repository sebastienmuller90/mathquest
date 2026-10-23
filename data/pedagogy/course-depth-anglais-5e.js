/* Finot Académie — cours approfondis, vague 1 pédagogie finale (23/10/2026) : anglais 5e (cycle 4, niveau A1 vers A2).
   Même format que course-depth-maths-cm1.js (deep / try / adult / culture), affiché par js/course-depth.js.
   Rien n'est retiré des cours existants. Explications en français, exemples en anglais, pièges propres aux francophones.
   Programme de référence : langues vivantes étrangères, cycle 4 (BO n°31 du 30 juillet 2020). Faits culturels vérifiables uniquement. */
(function(root){
'use strict';
const D=root.MQCourseDepth=root.MQCourseDepth||{version:'1',chapters:{},add(map,meta){for(const id of Object.keys(map))this.chapters[id]=Object.assign({},meta,map[id]);}};
const tb=r=>'<table class="ptable">'+r.map(x=>'<tr>'+x.map(c=>'<td>'+c+'</td>').join('')+'</tr>').join('')+'</table>';
const ul=a=>'<ul>'+a.map(x=>'<li>'+x+'</li>').join('')+'</ul>';
const ol=a=>'<ol>'+a.map(x=>'<li>'+x+'</li>').join('')+'</ol>';
D.add({
'en5a':{
 deep:[{t:'Les emplois du présent simple',h:`<p>Tu connais déjà la forme du <b>présent simple</b> (voir le cours de 6e) : verbe de base, plus <b>-s</b> à he/she/it. En 5e, on précise <b>quand</b> l’employer. Il sert à dire :</p>
${tb([[`une <b>habitude</b>`,`<b>I walk to school every day.</b>`],[`une <b>vérité générale</b>`,`<b>Water boils at 100 degrees.</b>`],[`un <b>emploi du temps fixe</b>`,`<b>The train leaves at 8.15.</b>`],[`un <b>état durable</b>`,`<b>My cousin lives in Dublin.</b>`]])}
<p>Il s’accompagne de repères de temps : <b>every day</b>, <b>on Mondays</b>, <b>at the weekend</b>, <b>twice a week</b>, <b>in winter</b>. Dès que tu vois un de ces repères, pense au présent simple.</p>
<p>Orthographe de la 3e personne : <b>-es</b> après s, x, ch, sh, o (<b>watches</b>, <b>goes</b>) ; <b>y → ies</b> après une consonne (<b>study → studies</b>) ; <b>have → has</b>. Le <b>s</b> se prononce « s » (<b>works</b>), « z » (<b>lives</b>) ou « iz » (<b>watches</b>).</p>`},
 {t:'Verbes d’état, faux ami et exemple guidé',h:`<p>Certains verbes expriment un état, pas une action, et s’emploient presque toujours au présent simple : <b>like, love, hate, want, know, understand, need, believe</b>. On dit <b>I know the answer</b>, jamais « I am knowing ».</p>
<p>Un faux ami fréquent à l’oral : <b>actually</b> signifie « en fait, à vrai dire », pas « actuellement » (qui se dit <b>at the moment</b> ou <b>currently</b>). <b>Actually, I don’t like pizza</b> = « En fait, je n’aime pas la pizza ».</p>
<p>Exemple guidé : « Chaque matin, ma sœur se lève à six heures, prend une douche et étudie l’anglais. »</p>
${ol([`Repère de temps : <b>every morning</b> → présent simple.`,`Sujet <b>my sister</b> = she, donc s à chaque verbe.`,`Trois verbes : <b>get up</b> → <b>gets up</b>, <b>have a shower</b> → <b>has a shower</b>, <b>study</b> → <b>studies</b>.`])}
<p>Résultat : <b>Every morning, my sister gets up at six, has a shower and studies English.</b> Un seul sujet, un seul s sur chaque verbe, et le s ne se met pas sur l’article ou le nom.</p>`}],
 try:{q:`Traduis : « Mon père travaille à Paris et il rentre à dix-huit heures chaque soir. »`,a:`My father works in Paris and he comes home at six every evening. (works, comes : s à he ; every evening : repère du présent simple.)`},
 adult:`Demandez à l’enfant de décrire le week-end habituel d’un proche en six phrases au présent simple, en utilisant des repères de temps (every Sunday, twice a week). Vérifiez trois points seulement : le s à he/she/it, les verbes en -es ou -ies, et l’absence de -ing avec know/like/want. Corrigez en reformulant plutôt qu’en soulignant la faute.`,
 culture:{t:`Un temps qui ne parle pas de maintenant`,h:`<p>Dans « The Sun rises in the east », le présent simple ne parle pas de l’instant présent, mais d’un fait toujours vrai. En grammaire anglaise, on dit qu’il exprime ce qui est « permanent ». Cela explique pourquoi le bulletin météo d’un journaliste (<b>It rains a lot in Wales</b>) et une recette de cuisine (<b>You add the eggs</b>) utilisent le même temps.</p>`}},
'en5b':{
 deep:[{t:'Do, does, don’t, doesn’t : l’auxiliaire',h:`<p>Au présent simple, on forme la négation et la question avec l’auxiliaire <b>do</b>. Le verbe principal reste <b>à la forme de base</b>, à toutes les personnes.</p>
${tb([[`<b>I / you / we / they</b>`,`<b>don’t play</b> — <b>Do</b> I… ?`],[`<b>he / she / it</b>`,`<b>doesn’t play</b> — <b>Does</b> he… ?`]])}
<p>Erreurs à éviter : « Does he plays? », « She doesn’t likes », « Do you can swim? » (<b>can</b> est un modal : <b>Can you swim?</b>), et « He don’t ». Le s se place <b>une seule fois</b> : sur <b>does</b>.</p>
<p>Réponses courtes : <b>Do you live here? — Yes, I do. / No, I don’t.</b> On répète seulement l’auxiliaire, pas le verbe principal.</p>`},
 {t:'Les questions avec mot interrogatif',h:`<p>Avec un mot interrogatif, l’ordre est : <b>mot interrogatif + do/does + sujet + verbe de base</b>.</p>
${tb([[`<b>Where do you live?</b>`,`Où habites-tu ?`],[`<b>What time does the film start?</b>`,`À quelle heure le film commence-t-il ?`],[`<b>Why does she like London?</b>`,`Pourquoi aime-t-elle Londres ?`],[`<b>How often do they play?</b>`,`À quelle fréquence jouent-ils ?`]])}
<p>Exception importante : quand le mot interrogatif <b>est le sujet</b>, on n’utilise pas do. <b>Who lives here?</b> (qui habite ici ?), <b>What happens next?</b> (que se passe-t-il ensuite ?). Le verbe prend le <b>-s</b> : <b>Who likes pizza? — Tom does.</b></p>
<p>Exemple guidé : « Pourquoi ton frère ne mange pas de viande ? » → c’est une question avec <b>why</b>, au présent, négative : <b>Why doesn’t your brother eat meat?</b> Mot interrogatif, auxiliaire à la forme négative <b>doesn’t</b>, sujet, verbe de base sans s.</p>
<p>Prononciation : dans une question rapide, <b>do you</b> devient « dyou » et <b>does he</b> « dozi ». Écoute des dialogues pour t’habituer à ces formes réduites.</p>`}],
 try:{q:`Pose les deux questions : « Where / your cousin / live ? » et « Who / play / the piano ? »`,a:`Where does your cousin live? Who plays the piano? (la 2e question n’a pas de do : who est le sujet, donc plays prend le s.)`},
 adult:`Jouez à « Twenty questions » : vous pensez à un animal, l’enfant pose des questions fermées (Does it live in water? Can it fly?) auxquelles vous répondez par une réponse courte. Contrôlez l’ordre auxiliaire-sujet-verbe et l’absence de s sur le verbe principal.`,
 culture:{t:`« Do » : un petit mot apparu tard`,h:`<p>Il y a quelques siècles encore, les Anglais posaient des questions comme en français actuel, en inversant sujet et verbe : « Speak you English? ». Cette forme est devenue rare. Aujourd’hui, on utilise l’auxiliaire <b>do</b>, qui s’est imposé à l’époque de Shakespeare. Dans ses pièces, on trouve encore des deux formes.</p>`}},
'en5c':{
 deep:[{t:'Former le présent en BE + -ING',h:`<p>Pour parler de ce qui se passe <b>en ce moment</b>, on utilise <b>be</b> au présent + le verbe en <b>-ing</b> : <b>I’m reading</b>, <b>she’s cooking</b>, <b>they’re playing</b>. Le présent en -ing se traduit par « être en train de » ou par un simple présent.</p>
${tb([[`Affirmative`,`<b>He is working.</b>`],[`Négative`,`<b>He isn’t working.</b>`],[`Question`,`<b>Is he working?</b> — <b>Yes, he is.</b>`],[`Question avec mot interrogatif`,`<b>What is he doing?</b>`]])}
<p>Orthographe du -ing : en général on ajoute <b>-ing</b> (<b>play → playing</b>). Si le verbe se termine par un <b>e</b> muet, il disparaît (<b>make → making</b>). Si le verbe est court avec voyelle + consonne, on double la consonne (<b>run → running</b>, <b>sit → sitting</b>). <b>Lie → lying</b>, <b>die → dying</b>.</p>
<p>Prononciation : le <b>-ing</b> se prononce « ing » nasal, sans faire entendre le « g » à la française : on n’entend pas « ingue ».</p>`},
 {t:'Les repères de temps et le piège de « rester »',h:`<p>Les mots qui accompagnent souvent le présent en -ing : <b>now</b>, <b>at the moment</b>, <b>today</b>, <b>this week</b>, et les ordres <b>Look!</b> <b>Listen!</b> : <b>Look! It’s snowing!</b></p>
<p>Il peut aussi exprimer une situation temporaire, même si l’action n’est pas visible à l’instant même : <b>I’m reading a good book at the moment.</b> <b>My cousin is staying with us this week.</b></p>
<p>Exemple guidé : « Regarde ! Les enfants jouent dans le jardin et leur père prépare le déjeuner. »</p>
${ol([`<b>Look!</b> annonce une action en cours.`,`Premier sujet : <b>the children</b> = they → <b>are playing</b>.`,`Second sujet : <b>their father</b> = he → <b>is making lunch</b> (ou <b>is cooking</b>).`])}
<p>Résultat : <b>Look! The children are playing in the garden and their father is making lunch.</b> N’oublie pas l’auxiliaire <b>be</b> devant le verbe en -ing : « The children playing » est incorrect.</p>
<p>Pour dire « je viens de » ou « il y a », ce temps n’est pas utilisé. Il sert à l’action en cours, pas au passé.</p>`}],
 try:{q:`Mets au présent en -ing : « Tom (to run) in the park and Léa (to write) a letter. »`,a:`Tom is running in the park and Léa is writing a letter. (run → running, doublement du n ; write → writing, le e disparaît.)`},
 adult:`Faites un « mime et devine » : l’enfant mime une action, vous demandez « What am I doing? / What is he doing? » et il répond « You’re… ». Vérifiez l’auxiliaire be (jamais oublié) et l’orthographe des formes en -ing sur quelques verbes (run, make, sit, write).`,
 culture:{t:`Le « g » qui ne se prononce pas`,h:`<p>Dans la langue parlée, de nombreux anglophones disent « runnin’ » plutôt que « running », surtout dans le sud des États-Unis ou dans l’anglais familier. On l’écrit <b>-in’</b> dans les chansons et les textes populaires (« Dancin’ in the Street »). Ce n’est pas une faute de langage grave, mais en classe, on prononce le -ing en entier.</p>`}},
'en5d':{
 deep:[{t:'Habitude ou action en cours ?',h:`<p>Pour choisir entre le présent simple et le présent en -ing, pose-toi une question : <b>est-ce que je parle de ce qui se passe toujours, ou de ce qui se passe maintenant ?</b></p>
${tb([[`<b>I play football on Saturdays.</b>`,`habitude → présent simple`],[`<b>I’m playing football.</b>`,`en ce moment → présent en -ing`],[`<b>She lives in Lyon.</b>`,`situation stable → présent simple`],[`<b>She’s living with her aunt this month.</b>`,`situation temporaire → présent en -ing`]])}
<p>Repères pour le présent simple : <b>always</b>, <b>usually</b>, <b>every day</b>, <b>on Mondays</b>. Repères pour le présent en -ing : <b>now</b>, <b>at the moment</b>, <b>today</b>, <b>Look!</b></p>`},
 {t:'Les verbes d’état et le piège « What do you do ? »',h:`<p>Certains verbes ne s’emploient presque jamais en -ing : <b>like, love, hate, want, need, know, understand, believe, have</b> (au sens de posséder). On dit <b>I understand</b>, <b>she wants a drink</b>, <b>I have a bike</b>.</p>
<p>Attention aux deux questions qui se ressemblent :</p>
${tb([[`<b>What do you do?</b>`,`Quel est ton métier ? (habitude / profession)`],[`<b>What are you doing?</b>`,`Que fais-tu en ce moment ?`]])}
<p>Beaucoup de francophones répondent « I’m a teacher » à la seconde, ce qui est amusant mais faux. À <b>What do you do?</b>, on dit <b>I’m a teacher.</b> À <b>What are you doing?</b>, on dit <b>I’m reading a book.</b></p>
<p>Exemple guidé : « Mon frère aime la musique, mais en ce moment, il écoute un podcast. » → deux idées : un goût (état) et une action en cours. Résultat : <b>My brother likes music, but at the moment he is listening to a podcast.</b> Le verbe <b>like</b> reste au présent simple.</p>
<p>Le verbe <b>have</b> peut aussi se mettre en -ing, mais seulement avec un autre sens : <b>I’m having lunch</b> (je suis en train de déjeuner), <b>she’s having a shower</b>.</p>`}],
 try:{q:`Choisis la bonne forme : « Look! It (to snow). / My mother (to work) in a bank. »`,a:`Look! It’s snowing. / My mother works in a bank. (Look ! = action en cours ; la profession est une situation stable.)`},
 adult:`Montrez une photo de rue animée et demandez « What are they doing? », puis « What do they usually do on Saturdays? ». Observez si l’enfant bascule bien d’un temps à l’autre. Surveillez « I am knowing » et la confusion What do you do? / What are you doing?`,
 culture:{t:`Un temps qui change le sens`,h:`<p>Comparer <b>He is silly</b> (il est idiot, c’est son caractère) et <b>He is being silly</b> (il fait l’idiot en ce moment) montre à quel point l’aspect compte en anglais. Ces nuances n’existent pas toujours en français, et c’est pourquoi un même verbe change de temps en anglais selon l’intention de celui qui parle.</p>`}},
'en5e':{
 deep:[{t:'L’échelle de fréquence',h:`<p>Les adverbes de fréquence répondent à <b>How often…?</b> (à quelle fréquence).</p>
${tb([[`<b>always</b>`,`toujours (100 %)`],[`<b>usually</b>`,`d’habitude`],[`<b>often</b>`,`souvent`],[`<b>sometimes</b>`,`parfois`],[`<b>rarely</b> / <b>hardly ever</b>`,`rarement`],[`<b>never</b>`,`jamais (0 %)`]])}
<p>On peut aussi exprimer la fréquence par une expression : <b>once a week</b> (une fois par semaine), <b>twice a month</b>, <b>three times a year</b>, <b>every day</b>. Elles se placent à la fin de la phrase : <b>I go swimming twice a week.</b></p>
<p>Prononciation : <b>often</b> se dit souvent sans « t » (« ofn »), bien que « ofteun » soit aussi admis. <b>Always</b> se dit « ôlouèïz ».</p>`},
 {t:'La place de l’adverbe dans la phrase',h:`<p>La règle de position est la suivante :</p>
${ul([`<b>Après</b> le verbe <b>be</b> : <b>She is always late.</b> <b>I am never hungry at breakfast.</b>`,`<b>Avant</b> les autres verbes : <b>He usually walks to school.</b> <b>We often eat pizza.</b>`,`Avec une négation ou un auxiliaire : <b>I don’t often watch TV.</b> <b>Do you usually get up early?</b>`,`<b>Sometimes</b> peut aussi se placer en début de phrase : <b>Sometimes I play chess.</b>`])}
<p>Piège : <b>never</b> est déjà négatif. On dit <b>I never eat fish</b>, jamais « I don’t never eat fish ». Une phrase anglaise n’a qu’une seule négation.</p>
<p>Exemple guidé : « Mon père est toujours en retard, mais il ne rate jamais le train. »</p>
${ol([`Verbe <b>être</b> + toujours → après be : <b>is always late</b>.`,`« ne rate jamais » → <b>never misses</b> (verbe avec s, adverbe avant).`])}
<p>Résultat : <b>My father is always late, but he never misses the train.</b></p>`}],
 try:{q:`Place l’adverbe : « My sister goes to bed late. (sometimes) / He is on time. (always) »`,a:`My sister sometimes goes to bed late. / He is always on time. (avant le verbe normal ; après be.)`},
 adult:`Faites un sondage sur la fréquence des activités de la famille (How often do you read? watch TV? play sport?). L’enfant note les réponses avec always/usually/often/sometimes/never et formule des phrases. Vérifiez la place de l’adverbe et l’absence de double négation avec never.`,
 culture:{t:`Once in a blue moon`,h:`<p>L’expression <b>once in a blue moon</b> signifie « presque jamais ». Une « lune bleue » désigne en astronomie la seconde pleine lune d’un même mois, un événement qui arrive environ tous les deux ou trois ans. La lune n’est pas vraiment bleue : le mot sert à dire que c’est rare. Cette expression est un bon exemple de langage imagé en anglais.</p>`}},
'en5f':{
 deep:[{t:'Les lieux de la ville',h:`<p>Voici les lieux à connaître : <b>a bank, a post office, a library, a supermarket, a chemist’s</b> (pharmacie, ou <b>pharmacy</b>), <b>a town hall, a station, a park, a museum, a cinema, a swimming pool, a bakery</b>.</p>
<p>Faux amis : une <b>library</b> est une bibliothèque, pas une librairie (<b>bookshop</b>). Un <b>college</b> n’est pas un collège français. Un <b>cinema</b> au Royaume-Uni est un cinéma ; aux États-Unis, on dit <b>movie theater</b>.</p>
<p>Pour dire ce qu’il y a dans une ville : <b>There is a library in my town. There are two supermarkets.</b> Pour demander : <b>Is there a park near here?</b> — <b>Yes, there is. / No, there isn’t.</b></p>
<p>Avec un pluriel ou un indénombrable : <b>There are some shops</b>, <b>There aren’t any museums</b>, <b>Are there any cafés?</b> (<b>some</b> dans l’affirmative, <b>any</b> dans la négative et la question).</p>`},
 {t:'Demander et donner son chemin',h:`<p>Pour demander : <b>Excuse me, where is the station?</b> ou <b>Is there a bank near here?</b></p>
<p>Pour répondre, on utilise l’impératif :</p>
${tb([[`<b>Go straight on.</b>`,`Continuez tout droit.`],[`<b>Turn left / right.</b>`,`Tournez à gauche / à droite.`],[`<b>Take the first road on the left.</b>`,`Prenez la première rue à gauche.`],[`<b>It’s opposite the park.</b>`,`C’est en face du parc.`],[`<b>It’s on the corner.</b>`,`C’est au coin.`],[`<b>It’s at the end of the street.</b>`,`C’est au bout de la rue.`]])}
<p>Exemple guidé : « Pardon, où est la poste ? — Tournez à droite, continuez tout droit, c’est à côté de la banque. » → <b>Excuse me, where is the post office? — Turn right, go straight on. It’s next to the bank.</b></p>
<p>Prononciation : <b>library</b> « laïbrèri » (trois syllabes, ne dis pas « laïbri »), <b>museum</b> « miouziameum ». N’oublie pas <b>please</b> et <b>thank you</b>.</p>`}],
 try:{q:`Traduis : « Il y a une pharmacie en face du parc. Tourne à gauche, puis continue tout droit. »`,a:`There is a chemist’s opposite the park. Turn left, then go straight on. (« there is » pour présenter ; deux impératifs.)`},
 adult:`Dessinez ensemble le plan simplifié d’un quartier. L’un demande le chemin, l’autre répond avec Turn left, Go straight on, It’s next to… Un bon indice de progrès : l’enfant utilise correctement opposite, next to et between sans repasser par le français.`,
 culture:{t:`Le passage « zébré »`,h:`<p>Un passage piéton s’appelle <b>zebra crossing</b> au Royaume-Uni, à cause de ses bandes noires et blanches, comme la robe d’un zèbre. Les premiers passages de ce genre ont été installés à Londres au début des années 1950. Les voitures doivent s’arrêter pour laisser passer les piétons. Au Royaume-Uni, on roule à gauche, donc les piétons doivent regarder à droite avant de traverser.</p>`}},
'en5g':{
 deep:[{t:'Dénombrable ou indénombrable ?',h:`<p>En anglais, les noms se rangent en deux familles. Les noms <b>dénombrables</b> se comptent (<b>an apple, two apples</b>). Les noms <b>indénombrables</b> ne se comptent pas directement (<b>water, bread, milk, rice, cheese, butter, sugar</b>) : pas de <b>a</b>, pas de pluriel.</p>
<p>Pour les mesurer, on utilise un contenant ou une quantité : <b>a bottle of water</b>, <b>a slice of bread</b>, <b>a carton of milk</b>, <b>a packet of biscuits</b>, <b>a tin of beans</b> (<b>a can</b> en américain).</p>
<p>Piège : en français, « des conseils », « des informations » se comptent. En anglais, <b>advice</b>, <b>information</b>, <b>news</b>, <b>fruit</b>, <b>homework</b> sont indénombrables : on dit <b>some advice</b>, <b>a piece of information</b>, <b>The news is good</b>.</p>
<p>Faux ami alimentaire : <b>preservatives</b> signifie « conservateurs » dans une liste d’ingrédients, et non « préservatifs ».</p>`},
 {t:'Some, any, much, many, a lot of',h:`<p>Choisir le bon mot de quantité dépend de la phrase et du type de nom :</p>
${tb([[`<b>some</b>`,`phrases affirmatives, et offres ou demandes : <b>Would you like some tea?</b>`],[`<b>any</b>`,`négation et question : <b>I haven’t got any milk. Have you got any?</b>`],[`<b>much</b> / <b>many</b>`,`surtout en négation et en question : <b>How much milk?</b> / <b>How many eggs?</b>`],[`<b>a lot of</b>`,`partout, avec les deux types de noms`]])}
<p>Exemple guidé : « Il n’y a pas de lait mais il y a beaucoup d’œufs dans le réfrigérateur. »</p>
${ol([`« pas de lait » : négation, indénombrable → <b>there isn’t any milk</b>.`,`« beaucoup d’œufs » : affirmation, dénombrable → <b>there are a lot of eggs</b>.`])}
<p>Résultat : <b>There isn’t any milk, but there are a lot of eggs in the fridge.</b></p>
<p>Prononciation : <b>fruit</b> « froute », <b>biscuit</b> « biskit » (le u est muet), <b>vegetable</b> « vèdj-tébeul ».</p>`}],
 try:{q:`Complète avec some, any, much ou many : « Would you like ___ juice? / We haven’t got ___ bread. / How ___ eggs do you need? »`,a:`Would you like some juice? / We haven’t got any bread. / How many eggs do you need? (offre → some ; négation → any ; œufs dénombrables → many.)`},
 adult:`Ouvrez le placard ou le réfrigérateur avec l’enfant : il dit ce qu’il y a et ce qui manque (There is some cheese, There aren’t any apples, How many yogurts are there?). Rappelez que bread, milk, information, advice, fruit ne se comptent pas directement.`,
 culture:{t:`Le thé et son nuage de lait`,h:`<p>Au Royaume-Uni, une grande partie de la population boit du thé noir, souvent avec un peu de lait. Une discussion célèbre divise le pays : faut-il verser le lait avant ou après le thé ? Le mot <b>tea</b> désigne aussi le repas du soir dans certaines familles, ce qui explique les invitations <b>Come for tea</b>.</p>`}},
'en5h':{
 deep:[{t:'Compléter la panoplie des mots interrogatifs',h:`<p>En plus de <b>what, where, who, when, why, how</b>, un collégien doit connaître :</p>
${tb([[`<b>which</b>`,`lequel / quel (choix limité) : <b>Which colour do you prefer?</b>`],[`<b>whose</b>`,`à qui : <b>Whose bag is this?</b>`],[`<b>what time</b>`,`à quelle heure : <b>What time is it?</b>`],[`<b>how long</b>`,`combien de temps / quelle longueur`],[`<b>how far</b>`,`à quelle distance`],[`<b>how often</b>`,`à quelle fréquence`],[`<b>what kind of</b>`,`quel genre de : <b>What kind of music do you like?</b>`]])}
<p><b>What</b> s’emploie pour un choix ouvert (<b>What do you want?</b>), <b>which</b> pour un choix dans un groupe connu (<b>Which of these books?</b>).</p>`},
 {t:'Le trio piège : like, be like, do you like',h:`<p>Trois questions qui se ressemblent mais ont des sens différents :</p>
${tb([[`<b>What does she like?</b>`,`Qu’est-ce qu’elle aime ? (ses goûts) — <b>She likes tennis.</b>`],[`<b>What’s she like?</b>`,`Comment est-elle ? (son caractère) — <b>She’s kind and funny.</b>`],[`<b>How is she?</b>`,`Comment va-t-elle ? (santé) — <b>She’s fine, thanks.</b>`]])}
<p>Une autre particularité : en anglais, la préposition peut finir la phrase. On dit <b>Who are you talking to?</b> et <b>Where do you come from?</b> (la forme plus formelle <b>To whom are you talking?</b> existe mais est rare).</p>
<p>Exemple guidé : « À quelle heure ton cousin arrive-t-il, et d’où vient-il ? »</p>
${ol([`Heure : <b>What time does your cousin arrive?</b>`,`Origine : <b>Where does he come from?</b> (la préposition <b>from</b> reste en fin de phrase).`])}
<p>Prononciation : <b>which</b> et <b>witch</b> (sorcière) se prononcent pareil ; <b>whose</b> et <b>who’s</b> (= who is) aussi : « houze ».</p>`}],
 try:{q:`Traduis : « Comment est ton professeur ? » puis « Qu’est-ce que ton professeur aime ? »`,a:`What’s your teacher like? What does your teacher like? (be like → description ; like → goûts.)`},
 adult:`Faites un jeu de portraits : vous décrivez un personnage célèbre à l’aide des questions What’s he like? What does he like? How old is he? Where does he come from? L’enfant doit utiliser le bon mot interrogatif pour interroger à son tour. Le piège like / be like mérite à lui seul plusieurs essais.`,
 culture:{t:`Whom : un mot qui disparaît`,h:`<p>Les grammairiens anglais distinguent <b>who</b> (sujet) et <b>whom</b> (complément). Dans la langue de tous les jours, <b>whom</b> a presque disparu. Au lieu de « To whom did you give it? », on dit « Who did you give it to? ». On retrouve encore <b>whom</b> dans les écrits très soignés et dans des expressions figées.</p>`}},
'en5i':{
 deep:[{t:'Les pronoms possessifs : mine, yours, his, hers, ours, theirs',h:`<p>Un <b>adjectif possessif</b> accompagne un nom (<b>my bag</b>). Un <b>pronom possessif</b> remplace le groupe « possessif + nom » (<b>mine</b> = my bag).</p>
${tb([[`<b>my</b> bag`,`The bag is <b>mine</b>.`],[`<b>your</b> bag`,`The bag is <b>yours</b>.`],[`<b>his</b> bag`,`The bag is <b>his</b>.`],[`<b>her</b> bag`,`The bag is <b>hers</b>.`],[`<b>our</b> bag`,`The bag is <b>ours</b>.`],[`<b>their</b> bag`,`The bag is <b>theirs</b>.`]])}
<p>Règles importantes : on n’ajoute <b>jamais d’article</b> (« the mine » est faux) ; on n’ajoute <b>pas d’apostrophe</b> (<b>yours</b>, pas « your’s ») ; et le nom disparaît : on ne dit pas « This is mine bag ».</p>
<p>Exemple : <b>Is this your pen? — No, it isn’t mine. It’s his.</b></p>`},
 {t:'Whose ? et la construction « a friend of mine »',h:`<p>Pour demander à qui appartient un objet : <b>Whose is this?</b> ou <b>Whose book is this?</b> — <b>It’s mine</b> / <b>It’s Tom’s.</b> Avec le génitif, on peut omettre le nom : <b>It’s Tom’s</b> (= Tom’s book).</p>
<p>Ne confonds pas <b>whose</b> (à qui) avec <b>who’s</b> (= who is ou who has) : ils se prononcent pareil. <b>Who’s that? — It’s my sister.</b> mais <b>Whose is that? — It’s my sister’s.</b></p>
<p>Pour dire « un de mes amis », l’anglais utilise un possessif après <b>of</b> : <b>a friend of mine</b>, <b>a cousin of hers</b>. On ne dit pas « a friend of my ».</p>
<p>Exemple guidé : « Cette trousse est à moi et ces crayons sont à elle. » → <b>This pencil case is mine and these pencils are hers.</b> On vérifie : pas d’article, pas de nom après le pronom possessif, accord <b>is/are</b> avec le nom du sujet.</p>
<p>Prononciation : <b>hers</b> « heurz », <b>yours</b> « iôrz », <b>ours</b> « aouerz » (ou « arz »).</p>`}],
 try:{q:`Réponds en utilisant un pronom possessif : « Whose is this bike? » (elle appartient à ma sœur)`,a:`It’s hers. (la personne est une fille ; pas d’article ni de nom après hers.)`},
 adult:`Mettez ensemble dix objets sur la table (stylos, clés, livres) et jouez à « Whose is it? ». L’enfant répond par It’s mine / yours / his / hers / Tom’s. Vérifiez qu’il ne dit pas « the mine » ou « my’s », et distinguez whose de who’s à l’écrit.`,
 culture:{t:`Yours sincerely, Yours faithfully`,h:`<p>Dans une lettre britannique, la formule finale dépend du début. Si tu commences par <b>Dear Mr Smith</b> (un nom connu), tu termines par <b>Yours sincerely</b>. Si tu commences par <b>Dear Sir or Madam</b>, tu termines par <b>Yours faithfully</b>. Le <b>yours</b> de ces formules est le pronom possessif que tu viens d’étudier : « (je suis) à vous, sincèrement ».</p>`}},
'en5j':{
 deep:[{t:'L’heure, les horaires et la durée',h:`<p>Tu connais <b>o’clock</b>, <b>past</b>, <b>to</b>, <b>half past</b> et <b>quarter</b>. En 5e, on ajoute des mots pour parler d’horaires :</p>
${tb([[`<b>from… to…</b>`,`de… à… : <b>from nine to ten</b>`],[`<b>at about</b>`,`vers : <b>at about six</b>`],[`<b>in the morning / afternoon / evening</b>`,`le matin / l’après-midi / le soir`],[`<b>noon / midnight</b>`,`midi / minuit`],[`<b>for + durée</b>`,`pendant : <b>for two hours</b>`],[`<b>It takes… to…</b>`,`il faut… pour… : <b>It takes twenty minutes to walk to school.</b>`]])}
<p>Pour demander la durée : <b>How long does it take?</b> ou <b>How long is the film?</b>. Pour demander à quelle heure : <b>What time does it start?</b></p>
<p>Les horaires de transport utilisent souvent le système 24 h : <b>The train leaves at 14.35</b> se lit <b>fourteen thirty-five</b>. Avec 12 h, on précise <b>a.m.</b> ou <b>p.m.</b></p>`},
 {t:'Être à l’heure, en avance, en retard',h:`<p>Voici les expressions à ne pas confondre :</p>
${ul([`<b>on time</b> : à l’heure prévue (<b>The bus is on time</b>).`,`<b>in time</b> : à temps, avant qu’il soit trop tard (<b>We arrived in time for the film</b>).`,`<b>early</b> / <b>late</b> : en avance / en retard.`,`<b>ago</b> : il y a (<b>two hours ago</b>) ; il se place après la durée.`])}
<p>Piège : on dit <b>It’s ten past nine</b> pour 9 h 10, mais <b>It’s ten to nine</b> pour 8 h 50. L’expression familière britannique <b>half seven</b> veut dire 7 h 30 (et non 6 h 30), mais il vaut mieux dire <b>half past seven</b> à l’écrit.</p>
<p>Exemple guidé : « Le film commence à dix-neuf heures quinze et dure deux heures. À quelle heure finit-il ? »</p>
${ol([`Début : <b>7.15 p.m.</b> (<b>quarter past seven</b>).`,`Durée : <b>two hours</b>.`,`Fin : 9 h 15 → <b>quarter past nine</b>.`])}
<p>Résultat : <b>The film starts at quarter past seven and finishes at quarter past nine. It lasts two hours.</b></p>`}],
 try:{q:`Réponds en anglais : « Le train part à 14 h 40 et le trajet dure une heure et demie. À quelle heure arrive-t-il ? »`,a:`The train leaves at twenty to three and the journey takes an hour and a half, so it arrives at ten past four. (14 h 40 = twenty to three ; 16 h 10 = ten past four.)`},
 adult:`Utilisez un vrai horaire de bus ou de cinéma : demandez What time does it start? How long does it take? Vous pouvez aussi inventer un voyage à Londres avec trois étapes. Surveillez past/to (jamais l’inverse), et la distinction on time / in time.`,
 culture:{t:`Greenwich et les fuseaux horaires`,h:`<p>Le méridien d’origine, qui sépare l’est de l’ouest du globe, passe par l’observatoire royal de <b>Greenwich</b> à Londres. Le <b>GMT</b> (Greenwich Mean Time) a longtemps servi de base à l’heure mondiale. Les trains britanniques ont été parmi les premiers à imposer une heure unique, parce que les horaires de chemin de fer devenaient impossibles à suivre avec des heures locales différentes.</p>`}}
});
})(typeof window!=='undefined'?window:globalThis);
