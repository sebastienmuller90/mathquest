/* Finot Académie — cours approfondis, vague 1 pédagogie finale (23/10/2026) : anglais 4e (cycle 4, niveau A2 visé en fin de 4e/3e en LVA).
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
'en4a':{
 deep:[{t:'Was et were : le passé du verbe BE',h:`<p>Le verbe <b>be</b> a deux formes au prétérit (le passé simple de l’anglais) : <b>was</b> et <b>were</b>.</p>
${tb([[`<b>I / he / she / it</b>`,`<b>was</b>`],[`<b>you / we / they</b>`,`<b>were</b>`]])}
<p>La négation s’obtient avec <b>not</b> : <b>wasn’t</b>, <b>weren’t</b>. Pour poser une question, on inverse : <b>Was she at home?</b> — <b>Yes, she was. / No, she wasn’t.</b> Aucun <b>did</b> avec ce verbe : <b>Did you were…?</b> est faux.</p>
<p>Le prétérit s’emploie avec des repères de temps révolus : <b>yesterday</b>, <b>last week</b>, <b>two days ago</b>, <b>in 2020</b>, <b>when I was a child</b>.</p>
<p>Prononciation : <b>was</b> se dit « ouoz » en forme forte, mais « euz » dans une phrase rapide. <b>Were</b> se dit « oueur » ou « euh ». Dans <b>I wasn’t there</b>, on entend « waznt ».</p>`},
 {t:'There was, there were, et « I was born »',h:`<p>Pour dire « il y avait », on utilise <b>there was</b> (singulier) ou <b>there were</b> (pluriel) : <b>There was a big storm last night. There were two cats in the garden.</b> La négation : <b>there wasn’t</b> / <b>there weren’t any…</b></p>
<p>Piège : pour dire où et quand on est né, on emploie le <b>prétérit</b> de be : <b>I was born in 2013. Where were you born?</b> On ne dit pas « I am born ».</p>
<p>Autre piège : en français, on dit « Il était une fois » pour un conte ; en anglais, <b>Once upon a time, there was a king</b>.</p>
<p>Exemple guidé : « Hier, mes amis n’étaient pas à l’école parce qu’ils étaient malades. »</p>
${ol([`Repère de temps passé : <b>yesterday</b> → prétérit.`,`Sujet <b>my friends</b> = they → <b>were</b>, négation <b>weren’t</b>.`,`Cause : <b>because they were ill</b>.`])}
<p>Résultat : <b>Yesterday my friends weren’t at school because they were ill.</b></p>`}],
 try:{q:`Traduis : « Où étiez-vous hier soir ? Nous étions au cinéma, il y avait beaucoup de monde. »`,a:`Where were you last night? We were at the cinema; there were a lot of people. (were avec you/we ; there were + pluriel.)`},
 adult:`Faites raconter à l’enfant sa journée d’hier en commençant par Yesterday I was at… ; puis posez-lui des questions fermées (Was it cold? Were your friends there?). Surveillez was/were selon le sujet, et corrigez doucement « I am born ». Un dialogue style alibi est amusant : Where were you at eight o’clock?`,
 culture:{t:`If I were you…`,h:`<p>Dans l’expression <b>If I were you…</b> (« à ta place… »), on emploie <b>were</b> avec <b>I</b>, alors que la règle voudrait <b>was</b>. C’est une trace d’un ancien subjonctif. On rencontre aussi cette forme dans la chanson de comédie musicale « If I Were a Rich Man », où <b>were</b> exprime un souhait irréel. Tu retrouveras cette règle dans les phrases conditionnelles de 3e.</p>`}},
'en4b':{
 deep:[{t:'Former le prétérit des verbes réguliers',h:`<p>Les verbes réguliers forment leur prétérit en ajoutant <b>-ed</b>. Il n’y a qu’une forme pour <b>toutes les personnes</b> : <b>I worked</b>, <b>she worked</b>, <b>they worked</b>. Plus de -s à la 3e personne !</p>
${tb([[`cas général`,`<b>work → worked</b>, <b>play → played</b>`],[`verbe en <b>-e</b>`,`on ajoute seulement <b>-d</b> : <b>live → lived</b>, <b>love → loved</b>`],[`consonne + <b>y</b>`,`<b>y → ied</b> : <b>study → studied</b>, <b>cry → cried</b>`],[`court : voyelle + consonne`,`on double la consonne : <b>stop → stopped</b>, <b>plan → planned</b>`]])}
<p>Mais voyelle + <b>y</b> reste simple : <b>play → played</b>, <b>enjoy → enjoyed</b>.</p>
<p>Le prétérit exprime une action terminée à un moment du passé : <b>I visited London last summer.</b></p>`},
 {t:'Les trois prononciations de -ed',h:`<p>L’orthographe est identique, mais la prononciation de <b>-ed</b> varie. Voici la règle :</p>
${tb([[`après un son sourd (p, k, f, s, ch, sh)`,`« t » : <b>worked</b> (ouôrkt), <b>watched</b> (ouotcht), <b>helped</b>`],[`après un son sonore ou une voyelle`,`« d » : <b>played</b> (plèïd), <b>lived</b>, <b>opened</b>`],[`après <b>t</b> ou <b>d</b>`,`« id » : <b>wanted</b> (ouontid), <b>needed</b>, <b>decided</b>`]])}
<p>Piège francophone : prononcer <b>-ed</b> comme « èd » à chaque fois. <b>Walked</b> ne se dit pas « ouok-èd », mais « ouôkt ». Et le <b>e</b> de <b>-ed</b> est muet, sauf après t et d.</p>
<p>Exemple guidé : « Ma sœur a étudié, puis elle a regardé un film et a préparé le dîner. »</p>
${ol([`<b>study</b> : consonne + y → <b>studied</b> (« stadid »).`,`<b>watch</b> → <b>watched</b> (« ouotcht »).`,`<b>prepare</b> : se termine par e → <b>prepared</b>.`])}
<p>Résultat : <b>My sister studied, then she watched a film and prepared dinner.</b> Aucune marque spéciale pour « elle » : la forme est la même pour toutes les personnes.</p>`}],
 try:{q:`Mets au prétérit : « He stops, he plays, he studies. » Puis classe les terminaisons -ed de « stopped, played, wanted » (t, d ou id).`,a:`He stopped, he played, he studied. stopped → « t » ; played → « d » ; wanted → « id ».`},
 adult:`Faites lire à voix haute dix verbes au prétérit (worked, played, wanted, needed, watched, lived, stopped, opened, decided, helped) et demandez à l’enfant de dire quel son final il entend (t, d ou id). Vérifiez surtout qu’il ne prononce pas le e muet. Pour l’écrit, sensibilisez aux doublements de consonne (stop → stopped).`,
 culture:{t:`Les nouveaux verbes sont tous réguliers`,h:`<p>Chaque fois qu’on invente un nouveau verbe en anglais, il se met automatiquement au prétérit avec <b>-ed</b> : <b>to google → googled</b>, <b>to text → texted</b>, <b>to email → emailed</b>. Les verbes irréguliers sont de très vieux verbes : <b>go, be, have, do</b> font partie des plus anciens et des plus fréquents. Plus un verbe est ancien et courant, plus il a de chances d’être irrégulier.</p>`}},
'en4c':{
 deep:[{t:'Apprendre les irréguliers par familles',h:`<p>Les verbes irréguliers n’ont pas de -ed. Plutôt que d’apprendre 100 verbes dans le désordre, regroupe-les par familles qui se ressemblent :</p>
${tb([[`la forme ne change pas`,`<b>cut, put, hit, let, read</b>`],[`<b>-ought / -aught</b>`,`<b>buy → bought</b>, <b>think → thought</b>, <b>bring → brought</b>, <b>catch → caught</b>, <b>teach → taught</b>`],[`<b>i → a</b>`,`<b>drink → drank</b>, <b>swim → swam</b>, <b>sing → sang</b>, <b>begin → began</b>, <b>run → ran</b>`],[`<b>-ew</b>`,`<b>know → knew</b>, <b>grow → grew</b>, <b>draw → drew</b>, <b>throw → threw</b>, <b>fly → flew</b>`],[`cas isolés à connaître`,`<b>go → went</b>, <b>see → saw</b>, <b>eat → ate</b>, <b>take → took</b>, <b>make → made</b>, <b>have → had</b>, <b>do → did</b>`]])}
<p>Une même forme sert à toutes les personnes : <b>she went</b>, <b>they went</b>. Seul <b>be</b> garde deux formes (<b>was/were</b>).</p>`},
 {t:'Les pièges de prononciation et de formation',h:`<p>Certaines formes se prononcent de façon surprenante :</p>
${ul([`<b>read</b> s’écrit pareil au présent et au passé, mais le passé se prononce « red » (comme la couleur).`,`<b>said</b> se prononce « sèd », <b>bought</b> « bôt », <b>thought</b> « thôt » : le <b>gh</b> est muet.`,`<b>ate</b> se prononce « ète » (ou « èïte » en américain).`,`<b>was</b> « ouoz », <b>did</b> « did ».`])}
<p>Erreurs typiques d’un francophone : ajouter un <b>-ed</b> à un irrégulier (« I goed », « he buyed », « she teached »). L’anglais connaît le mécanisme, mais ces verbes sont figés : <b>went</b>, <b>bought</b>, <b>taught</b>.</p>
<p>Exemple guidé : « Hier, j’ai pris le bus, j’ai vu un ami, nous avons mangé une pizza et nous sommes allés au cinéma. »</p>
${ol([`<b>take</b> → <b>took</b>, <b>see</b> → <b>saw</b>.`,`<b>eat</b> → <b>ate</b>, <b>go</b> → <b>went</b>.`])}
<p>Résultat : <b>Yesterday I took the bus, I saw a friend, we ate a pizza and we went to the cinema.</b> Cinq verbes irréguliers, une seule forme par verbe.</p>
<p>Astuce de mémorisation : apprends 5 verbes par jour, récite-les à voix haute (présent, prétérit) et utilise-les dans une phrase.</p>`}],
 try:{q:`Mets au prétérit : « We buy bread, we eat it and we go home. »`,a:`We bought bread, we ate it and we went home. (buy → bought, eat → ate, go → went.)`},
 adult:`Fabriquez dix cartes avec un verbe irrégulier au recto et son prétérit au verso (la famille -ought d’abord). Jouez à la bataille : l’enfant doit dire le prétérit puis l’utiliser dans une phrase. Faites remarquer qu’on ne dit jamais goed ni buyed, et vérifiez la prononciation de read (« red »), said, bought.`,
 culture:{t:`Pourquoi tant d’irréguliers ?`,h:`<p>La plupart des verbes irréguliers anglais viennent du vieil anglais, où le passé se formait en changeant la voyelle du verbe (<b>sing → sang → sung</b>). C’est un héritage des langues germaniques, que l’on retrouve en allemand (<b>singen → sang</b>). Les verbes réguliers en <b>-ed</b> se sont ensuite développés. Aujourd’hui, les verbes très fréquents ont conservé leur forme ancienne.</p>`}},
'en4d':{
 deep:[{t:'DID et DIDN’T : un seul auxiliaire pour toutes les personnes',h:`<p>Au prétérit, la négation et la question se forment avec <b>did</b>, quelle que soit la personne. Le verbe principal revient à la forme de base : <b>le passé est déjà porté par did</b>.</p>
${tb([[`<b>I didn’t go to school.</b>`,`Je ne suis pas allé à l’école.`],[`<b>She didn’t see the film.</b>`,`Elle n’a pas vu le film.`],[`<b>Did you eat breakfast?</b>`,`As-tu pris ton petit-déjeuner ?`],[`<b>Yes, I did. / No, I didn’t.</b>`,`Réponses courtes.`]])}
<p>Erreurs à éviter : « I didn’t went », « Did you saw? », « He didn’t played ». Une fois que <b>did</b> a marqué le passé, le verbe ne le marque plus.</p>
<p>Exception : avec <b>be</b> (was/were), on n’emploie pas <b>did</b> : <b>I wasn’t there</b>, <b>Were you tired?</b></p>`},
 {t:'Les questions avec mot interrogatif et les questions sur le sujet',h:`<p>Avec un mot interrogatif, l’ordre est : <b>mot interrogatif + did + sujet + verbe de base</b>.</p>
${tb([[`<b>Where did you go?</b>`,`Où es-tu allé ?`],[`<b>What did he buy?</b>`,`Qu’a-t-il acheté ?`],[`<b>Why did they leave?</b>`,`Pourquoi sont-ils partis ?`],[`<b>How did she get there?</b>`,`Comment y est-elle allée ?`]])}
<p>Exception, comme au présent : quand le mot interrogatif est le sujet de la phrase, on n’emploie pas <b>did</b> et le verbe se met au prétérit. <b>Who broke the window?</b> (Qui a cassé la vitre ?) — <b>Tom did.</b></p>
<p>Exemple guidé : « Qu’as-tu mangé hier soir ? Je n’ai rien mangé de spécial. »</p>
${ol([`Question : <b>What did you eat last night?</b> (did + eat, forme de base).`,`Réponse négative : <b>I didn’t eat anything special.</b>`])}
<p>Prononciation : <b>didn’t</b> se dit « didnt » en deux syllabes brèves, avec un <b>n</b> très léger. Entraîne-toi sur <b>I didn’t know</b>.</p>`}],
 try:{q:`Pose la question puis mets la réponse à la forme négative : « You saw Tom yesterday. (Where?) » et « He bought a bike. »`,a:`Where did you see Tom yesterday? / He didn’t buy a bike. (did + verbe de base : see, buy.)`},
 adult:`Menez une « enquête » : posez à l’enfant dix questions sur sa journée d’hier avec Did you… ? et Where / What / Why did you… ? Il répond avec une réponse courte, puis une phrase complète. Surveillez surtout les formes didn’t went / did you saw, qui signalent la même confusion.`,
 culture:{t:`Les enquêtes de Sherlock Holmes`,h:`<p>Dans les romans policiers, les enquêteurs posent beaucoup de questions au prétérit : <b>Where were you at nine o’clock? What did you see? Did you hear anything?</b> Les histoires de Sherlock Holmes, écrites par Arthur Conan Doyle à la fin du XIXe siècle, en sont un bon exemple. Elles sont écrites au prétérit, comme beaucoup de récits en anglais.</p>`}},
'en4e':{
 deep:[{t:'Le comparatif : -er ou more ?',h:`<p>Pour comparer deux éléments, on utilise le comparatif, suivi de <b>than</b> (« que »).</p>
${tb([[`adjectif court (1 syllabe)`,`<b>-er</b> : <b>tall → taller than</b>, <b>fast → faster than</b>`],[`terminé par <b>-y</b>`,`<b>y → ier</b> : <b>happy → happier</b>, <b>easy → easier</b>`],[`voyelle + consonne`,`on double : <b>big → bigger</b>, <b>hot → hotter</b>`],[`adjectif long (2 syllabes ou plus)`,`<b>more</b> + adjectif : <b>more interesting</b>, <b>more expensive</b>`]])}
<p>Erreurs fréquentes : « more tall », « more easier » (double marque). Ne confonds pas <b>than</b> (comparaison) et <b>then</b> (ensuite) : <b>She is older than me</b>, mais <b>First read, then answer</b>.</p>
<p>Prononciation : <b>than</b> se dit « dhân » en forme faible, avec un son /ð/ ; <b>taller</b> « tôleu ».</p>`},
 {t:'Le superlatif, les irréguliers et l’égalité',h:`<p>Le superlatif exprime le plus haut degré, avec <b>the</b> : <b>the tallest</b>, <b>the happiest</b>, <b>the most interesting</b>. On ajoute souvent <b>in</b> ou <b>of</b> : <b>the biggest city in the country</b>.</p>
<p>Trois adjectifs irréguliers à retenir :</p>
${tb([[`<b>good</b>`,`<b>better</b>`,`<b>the best</b>`],[`<b>bad</b>`,`<b>worse</b>`,`<b>the worst</b>`],[`<b>far</b>`,`<b>farther / further</b>`,`<b>the farthest / furthest</b>`]])}
<p>Pour exprimer l’égalité : <b>as… as</b> : <b>Tom is as tall as Léa</b>. Pour l’infériorité : <b>not as… as</b> ou <b>less… than</b> : <b>This book isn’t as good as the film.</b></p>
<p>Exemple guidé : « Londres est plus grande que Paris, mais Paris est plus belle, à mon avis. »</p>
${ol([`<b>big</b> : adjectif court avec doublement → <b>bigger than</b>.`,`<b>beautiful</b> : adjectif long → <b>more beautiful than</b>.`])}
<p>Résultat : <b>London is bigger than Paris, but Paris is more beautiful, in my opinion.</b></p>`}],
 try:{q:`Complète : « My brother is (tall) ___ than me. / This film is (interesting) ___ than that one. / It is (good) ___ restaurant in town. »`,a:`taller / more interesting / the best. (tall est court ; interesting est long ; good est irrégulier.)`},
 adult:`Choisissez trois objets, animaux ou lieux et demandez à l’enfant de les comparer en anglais (taller, faster, more dangerous…). Puis cherchez « the biggest, the oldest, the most expensive » dans la maison. Contrôlez l’emploi de than et l’absence de la double marque more… -er.`,
 culture:{t:`Le plus haut sommet du Royaume-Uni`,h:`<p>Le point culminant du Royaume-Uni est <b>Ben Nevis</b>, en Écosse, à environ 1 345 mètres d’altitude. Le plus haut sommet d’Angleterre est <b>Scafell Pike</b>, dans le Lake District. Comparés aux Alpes, ces sommets sont modestes, mais ils sont connus pour leur climat changeant. C’est un bon exemple pour t’entraîner : <b>Ben Nevis is the highest mountain in the UK</b>.</p>`}},
'en4f':{
 deep:[{t:'WILL : décisions, promesses, prévisions',h:`<p>Le futur avec <b>will</b> se construit avec <b>will + verbe de base</b>, à toutes les personnes. Contraction : <b>I’ll</b>, <b>she’ll</b>, <b>won’t</b> (= will not).</p>
${ul([`décision prise sur le moment : <b>The phone is ringing. I’ll answer it.</b>`,`promesse : <b>I’ll help you tomorrow.</b>`,`prévision, opinion sur l’avenir : <b>I think it will rain tomorrow.</b>`,`offre : <b>I’ll carry your bag.</b>`])}
<p>Négation : <b>She won’t come</b>. Question : <b>Will you be there?</b> — <b>Yes, I will. / No, I won’t.</b></p>
<p>Repères : <b>tomorrow</b>, <b>next week</b>, <b>soon</b>, <b>in 2030</b>, <b>one day</b>. Prononciation : <b>won’t</b> se prononce « ouôounte » et <b>will</b> « ouil » : le contraste « I will » / « I won’t » doit s’entendre.</p>`},
 {t:'BE GOING TO : projets et preuves',h:`<p>On emploie <b>be going to + verbe de base</b> pour un <b>projet</b> décidé avant de parler, ou pour une <b>prévision fondée sur une preuve visible</b>.</p>
${tb([[`<b>I’m going to visit London in July.</b>`,`projet déjà décidé`],[`<b>Look at those clouds! It’s going to rain.</b>`,`on voit des indices`],[`<b>Are you going to play tomorrow?</b>`,`question sur un projet`]])}
<p>Comparaison. Phrases possibles avec <b>will</b> : <b>I think I’ll buy a cake</b> (décision à l’instant). Avec <b>going to</b> : <b>I’m going to buy a cake for Mum’s birthday</b> (déjà prévu).</p>
<p>Piège : en français, on emploie le présent après « quand » et « si ». En anglais, après <b>when</b> ou <b>if</b>, on n’utilise pas will : <b>When I arrive, I’ll call you.</b> (voir le chapitre sur la condition en 3e).</p>
<p>Exemple guidé : « Demain, nous allons visiter un musée, et ce soir je prépare un gâteau : je te promets que ça va être bon ! »</p>
${ol([`Projet déjà décidé → <b>we’re going to visit a museum</b>.`,`Promesse → <b>I promise it will be delicious</b>.`])}
<p>Résultat : <b>Tomorrow we’re going to visit a museum, and I promise it will be delicious.</b></p>
<p>À l’oral, <b>going to</b> est souvent réduit à « gonna » (<b>I’m gonna go</b>), mais on ne l’écrit pas en classe.</p>`}],
 try:{q:`Choisis will ou be going to : « Look! The baby ___ fall! / I’m hungry. I think I ___ make a sandwich. »`,a:`Look! The baby is going to fall! (preuve visible) / I think I’ll make a sandwich. (décision sur le moment.)`},
 adult:`Demandez à l’enfant de parler de ses projets pour les vacances avec I’m going to… puis de faire trois promesses avec I’ll… Exercez-le ensuite à regarder le ciel ou une image et à prédire avec It’s going to… Surveillez will + verbe de base, sans to ni -s.`,
 culture:{t:`Gonna et wanna`,h:`<p>À l’oral, <b>going to</b> devient <b>gonna</b> et <b>want to</b> devient <b>wanna</b>. On les rencontre dans les chansons, les films et les sous-titres. Ces formes sont normales dans une conversation entre amis, mais on les évite à l’écrit formel. Les connaître t’aide à comprendre ce qu’on entend vraiment dans les séries en version originale.</p>`}},
'en4g':{
 deep:[{t:'MUST, HAVE TO, MUSTN’T : trois sens à bien distinguer',h:`<p>Les deux verbes expriment l’obligation, mais pas de la même façon :</p>
${tb([[`<b>must</b>`,`obligation personnelle, forte : <b>I must study for the test.</b>`],[`<b>have to</b>`,`obligation extérieure (règle, loi, horaire) : <b>You have to wear a uniform.</b>`]])}
<p>Piège majeur à la négation :</p>
${tb([[`<b>mustn’t</b>`,`<b>interdiction</b> : <b>You mustn’t run in the corridor.</b> (Tu ne dois pas / il est interdit de…)`],[`<b>don’t have to</b>`,`<b>absence d’obligation</b> : <b>You don’t have to come.</b> (Tu n’es pas obligé de…)`]])}
<p>Beaucoup de francophones confondent ces deux sens, qui ne sont pas du tout proches. <b>Mustn’t</b> interdit, <b>don’t have to</b> laisse le choix.</p>`},
 {t:'Construction, passé et exemple guidé',h:`<p><b>Must</b> est un modal : pas de -s, pas de <b>to</b>, pas de <b>do</b> : <b>She must go</b>, <b>Must I stay?</b>. <b>Have to</b> est un verbe ordinaire : <b>she has to go</b>, <b>Does he have to wait?</b>, <b>I don’t have to</b>.</p>
<p><b>Must</b> n’a pas de passé : on utilise <b>had to</b> : <b>Yesterday I had to stay at home.</b> Pour le futur : <b>will have to</b>. Pour un conseil moins fort, on emploie <b>should</b> : <b>You should drink water.</b></p>
<p>Prononciation : <b>have to</b> se dit « haf tou » ; <b>has to</b> « has tou ». Le <b>v</b> devient un « f » devant le t.</p>
<p>Exemple guidé : « Dans mon collège, on doit porter une carte, mais on n’est pas obligé de manger à la cantine, et il est interdit de courir. »</p>
${ol([`obligation extérieure → <b>we have to carry a card</b>.`,`pas d’obligation → <b>we don’t have to eat at the canteen</b>.`,`interdiction → <b>we mustn’t run</b>.`])}
<p>Résultat : <b>At my school, we have to carry a card, we don’t have to eat at the canteen and we mustn’t run.</b></p>`}],
 try:{q:`Traduis : « Tu n’es pas obligé de venir, mais tu ne dois pas être en retard. »`,a:`You don’t have to come, but you mustn’t be late. (don’t have to = pas obligé ; mustn’t = interdit.)`},
 adult:`Faites établir à l’enfant le règlement de la maison en anglais, en trois colonnes : You must… / You mustn’t… / You don’t have to… Il doit justifier ses choix. Le contraste mustn’t / don’t have to demande plusieurs essais : relisez-le avec lui avec des exemples concrets.`,
 culture:{t:`Des panneaux qui parlent anglais`,h:`<p>Dans les lieux publics britanniques, tu vois souvent des panneaux comme <b>No smoking</b>, <b>Keep off the grass</b> ou <b>Mind the gap</b>, une annonce célèbre du métro de Londres qui prévient du vide entre le quai et la rame. Ces consignes utilisent l’impératif et des interdictions : un bon moyen de repérer <b>must</b>, <b>mustn’t</b> et <b>have to</b> dans la vraie vie.</p>`}},
'en4h':{
 deep:[{t:'Former le prétérit en BE + -ING',h:`<p>Le prétérit en -ing se construit avec <b>was/were + verbe en -ing</b>. Il décrit une action <b>en cours dans le passé</b>, comme un décor.</p>
${tb([[`Affirmative`,`<b>I was reading.</b> / <b>They were playing.</b>`],[`Négative`,`<b>She wasn’t sleeping.</b> / <b>We weren’t working.</b>`],[`Question`,`<b>Was he listening?</b> / <b>What were you doing?</b>`]])}
<p>Question type de détective : <b>What were you doing at nine o’clock last night?</b> — <b>I was watching TV.</b></p>
<p>Orthographe du -ing identique à celle du présent : <b>run → running</b>, <b>make → making</b>.</p>
<p>Les verbes d’état (<b>know, like, want</b>) ne se mettent pas en -ing : <b>I knew the answer</b>, pas « I was knowing ».</p>`},
 {t:'When et while : une action en interrompt une autre',h:`<p>Ce temps s’emploie souvent avec le prétérit simple pour raconter une scène : l’action longue (en -ing) est interrompue par une action courte (au prétérit simple).</p>
<p><b>I was walking in the park when it started to rain.</b></p>
${ul([`<b>was walking</b> : l’action longue, en cours (le décor).`,`<b>started</b> : l’action courte, qui arrive (l’événement).`])}
<p>On utilise <b>when</b> devant l’action courte, <b>while</b> devant l’action longue : <b>While I was walking, it started to rain.</b></p>
<p>Deux actions longues qui se passent en même temps : <b>While Mum was cooking, I was doing my homework.</b></p>
<p>Exemple guidé : « Pendant que mon frère faisait ses devoirs, j’ai entendu un bruit. »</p>
${ol([`Action longue : <b>my brother was doing his homework</b> → introduite par <b>while</b>.`,`Action courte : <b>I heard a noise</b> → prétérit simple.`])}
<p>Résultat : <b>While my brother was doing his homework, I heard a noise.</b></p>`}],
 try:{q:`Complète avec le bon temps : « I (to watch) TV when the phone (to ring). »`,a:`I was watching TV when the phone rang. (action longue en -ing ; action courte au prétérit simple.)`},
 adult:`Racontez ensemble une histoire à deux voix : vous donnez le décor (It was raining. People were walking fast…), l’enfant ajoute l’événement (Suddenly, a dog ran…). Corrigez l’oubli de was/were devant un verbe en -ing et la confusion entre when et while.`,
 culture:{t:`Les alibis dans les romans policiers`,h:`<p>Dans les romans d’Agatha Christie, on demande souvent aux suspects ce qu’ils faisaient à l’heure du crime : <b>What were you doing at ten o’clock?</b> C’est la question typique du prétérit en -ing. Agatha Christie, auteure britannique du XXe siècle, a écrit plus de soixante romans policiers, dont <b>Murder on the Orient Express</b> et <b>Death on the Nile</b>.</p>`}},
'en4i':{
 deep:[{t:'Les pronoms compléments',h:`<p>Après un verbe ou une préposition, on utilise le pronom <b>complément</b> :</p>
${tb([[`<b>I → me</b>`,`<b>we → us</b>`],[`<b>you → you</b>`,`<b>you → you</b>`],[`<b>he → him</b>, <b>she → her</b>, <b>it → it</b>`,`<b>they → them</b>`]])}
<p>Exemples : <b>Call me!</b>, <b>I love them</b>, <b>She told us a story</b>, <b>Look at him</b>, <b>Come with us</b>. Après une préposition (<b>with, for, to, at, about</b>), on ne met jamais le pronom sujet : « with I » est faux, <b>with me</b> est correct.</p>
<p>Attention à <b>her</b> : c’est à la fois le pronom complément (« elle, la, lui ») et l’adjectif possessif (« son, sa »). Le contexte aide : <b>I know her</b> (pronom) et <b>I know her brother</b> (adjectif).</p>`},
 {t:'La place des pronoms et les expressions piégeuses',h:`<p>Pour donner quelque chose à quelqu’un, deux constructions sont possibles :</p>
${tb([[`<b>Give me the book.</b>`,`personne puis objet (sans <b>to</b>)`],[`<b>Give the book to me.</b>`,`objet puis <b>to</b> + personne`],[`<b>Give it to me.</b>`,`si l’objet est un pronom, on utilise <b>to</b>`]])}
<p>On ne dit pas « Give me it ». Autre règle : avec un verbe à particule (<b>pick up, turn on, put on</b>), le pronom se place <b>entre</b> les deux mots : <b>Pick it up</b>, <b>Turn it off</b>, <b>Put them on</b>. « Pick up it » est une erreur.</p>
<p>Pour parler de soi avec un ami : on dit <b>my friend and I</b> comme sujet (<b>My friend and I are late</b>), mais <b>with my friend and me</b> comme complément. À l’oral, <b>It’s me</b> est normal.</p>
<p>Exemple guidé : « Mon frère m’a prêté son livre et je le lui rends demain. » → <b>My brother lent me his book, and I’ll give it back to him tomorrow.</b> Le pronom <b>it</b> est avant la particule <b>back</b> ; <b>him</b> est après <b>to</b>.</p>`}],
 try:{q:`Remplace les mots soulignés par un pronom : « I saw Léa and Tom (…) yesterday. I gave the keys (…) to Léa (…). »`,a:`I saw them yesterday. I gave them to her. (Léa and Tom → them ; the keys → them ; Léa → her.)`},
 adult:`Jouez à « Pass it! » : donnez des consignes avec des pronoms à l’enfant (Give it to me. Put them on the table. Pick it up.). Il exécute et vous en donne à son tour. Corrigez les pronoms sujets utilisés après une préposition (with he, for I).`,
 culture:{t:`« It is I » ou « It’s me » ?`,h:`<p>Les grammairiens traditionnels disaient qu’il fallait écrire <b>It is I</b>, avec le pronom sujet. Mais les anglophones disent presque tous <b>It’s me</b> à l’oral, y compris à l’école et à la radio. L’usage a rendu cette forme acceptable. Dans un texte très soigné, on pourra encore trouver <b>It is I</b>, comme une trace de la grammaire latine.</p>`}},
'en4j':{
 deep:[{t:'PLAY, DO ou GO ? Le bon verbe pour chaque activité',h:`<p>En anglais, on ne « fait » pas du sport avec un seul verbe. On choisit entre trois verbes :</p>
${tb([[`<b>play</b>`,`jeux et sports d’équipe ou de balle : <b>play football</b>, <b>play tennis</b>, <b>play chess</b>, <b>play cards</b>`],[`<b>do</b>`,`activités sans balle, souvent individuelles : <b>do judo</b>, <b>do gymnastics</b>, <b>do yoga</b>, <b>do athletics</b>`],[`<b>go</b> + <b>-ing</b>`,`activités qui se terminent en -ing : <b>go swimming</b>, <b>go cycling</b>, <b>go running</b>, <b>go fishing</b>, <b>go skiing</b>`]])}
<p>Avec les instruments de musique, on met <b>the</b> : <b>play the guitar</b>, <b>play the piano</b>. Avec les sports, pas d’article : <b>play basketball</b>. Pour le verbe « pratiquer » (s’entraîner), l’orthographe britannique est <b>practise</b> (verbe) et <b>practice</b> (nom) : <b>I practise the piano every day</b>.</p>`},
 {t:'Donner son avis sur ses loisirs',h:`<p>Pour parler de ce qu’on aime, voici des tournures à connaître. Elles sont suivies d’un nom ou d’un verbe en <b>-ing</b> :</p>
${ul([`<b>I’m keen on</b> swimming. / <b>I’m into</b> music. (je suis passionné)`,`<b>I’m good at</b> drawing. / <b>I’m bad at</b> maths. (je suis bon/mauvais en)`,`<b>I’m interested in</b> history. (je m’intéresse à)`,`<b>I’m fond of</b> animals. / <b>I enjoy</b> cooking.`])}
<p>Règle importante : après une préposition (<b>at, in, on, of</b>), le verbe est toujours en <b>-ing</b> : <b>I’m good at playing chess</b>, jamais « good at play ».</p>
<p>Exemple guidé : « Mon frère joue au basket, il fait du judo le mardi et il adore faire de la natation. »</p>
${ol([`<b>play</b> + sport de balle → <b>plays basketball</b>.`,`<b>do</b> + sport sans balle → <b>does judo</b> (s après does).`,`<b>go</b> + -ing → <b>loves going swimming</b>.`])}
<p>Résultat : <b>My brother plays basketball, he does judo on Tuesdays and he loves going swimming.</b></p>
<p>Prononciation : <b>judo</b> « djoudo », <b>cycling</b> « saïkling », <b>athletics</b> « athlètiks » avec le th de la langue entre les dents.</p>`}],
 try:{q:`Complète avec play, do ou go : « I ___ tennis. / She ___ yoga. / They ___ cycling on Sundays. »`,a:`I play tennis. / She does yoga. / They go cycling on Sundays. (play : balle ; do : sans balle ; go + -ing.)`},
 adult:`Faites faire à l’enfant un sondage éclair dans la famille : What sport do you play? What do you enjoy? Il note les réponses en phrases complètes avec play, do, go et le verbe en -ing après une préposition. Contrôlez I’m good at + -ing et l’emploi de the avec les instruments seulement.`,
 culture:{t:`Football ou soccer ?`,h:`<p>Le football moderne a été codifié en Angleterre : la <b>Football Association</b> a été fondée à Londres en 1863 et a fixé les premières règles communes. Aux États-Unis, on appelle ce sport <b>soccer</b>, un mot dérivé de <b>association football</b>, tandis que le <b>football</b> américain est un sport différent. Au Royaume-Uni, le cricket et le rugby sont aussi des sports très populaires.</p>`}},
'en4k':{
 deep:[{t:'Qui parle, à qui, pourquoi ?',h:`<p>Un message (affiche, publicité, article, SMS, vidéo) a toujours un <b>émetteur</b> (<b>sender</b>), un <b>destinataire</b> (<b>audience</b>) et un <b>but</b> (<b>purpose</b>). Pour analyser un document, pose-toi ces questions : <b>Who made it? Who is it for? What does it want?</b></p>
${tb([[`<b>to inform</b>`,`informer : un article, un journal télévisé`],[`<b>to persuade</b>`,`convaincre : une publicité, une affiche`],[`<b>to entertain</b>`,`divertir : un film, une bande dessinée`],[`<b>to ask for action</b>`,`faire agir : <b>Recycle!</b> <b>Join us!</b>`]])}
<p>Une affiche ou une publicité emploie souvent l’<b>impératif</b> (<b>Buy now!</b>, <b>Don’t miss it!</b>), des slogans courts et des images fortes. Pour décrire : <b>This poster wants people to recycle.</b> <b>The picture shows…</b> <b>The slogan says…</b></p>`},
 {t:'Adapter son message : registre familier ou formel',h:`<p>On n’écrit pas de la même façon à un ami et à un directeur d’établissement. Comparer :</p>
${tb([[`<b>familier</b>`,`<b>Hi Sam, thanks for your message! See you on Friday. Bye!</b>`],[`<b>formel</b>`,`<b>Dear Mr Brown, Thank you for your email. I look forward to meeting you on Friday. Yours sincerely, Emma Martin</b>`]])}
<p>Dans un message formel : <b>Dear</b> + nom, des phrases complètes, pas de contractions excessives, <b>Yours sincerely</b> si tu connais le nom (<b>Yours faithfully</b> si tu écris <b>Dear Sir or Madam</b>). Dans un message familier, les abréviations de SMS sont courantes : <b>BTW</b> (by the way), <b>thx</b> (thanks), <b>u</b> (you) ; on ne les utilise pas dans un devoir.</p>
<p>Exemple guidé : « Cette affiche veut inciter les gens à utiliser leur vélo parce que c’est bon pour la santé. »</p>
${ol([`Verbe : <b>want somebody to do</b> → <b>wants people to use</b>.`,`Cause : <b>because it is good for your health</b>.`])}
<p>Résultat : <b>This poster wants people to use their bike because it is good for their health.</b></p>
<p>Prononciation : <b>audience</b> « ôdiens », <b>persuade</b> « peuswèïd », <b>message</b> « mèssidj ».</p>`}],
 try:{q:`Traduis : « Cette publicité veut convaincre les jeunes d’acheter un téléphone. » et indique son but.`,a:`This advert wants to persuade young people to buy a phone. Purpose: to persuade. (want somebody to do, persuade.)`},
 adult:`Montrez à l’enfant une affiche ou une publicité (papier ou en ligne) et demandez-lui en anglais : Who is it for? What does it want? How do you know? Puis faites-lui écrire deux courtes réponses à un même message, l’une à un ami, l’autre à un professeur.`,
 culture:{t:`« Keep calm and carry on »`,h:`<p>L’affiche <b>Keep Calm and Carry On</b> a été conçue en 1939 par le gouvernement britannique avant la Seconde Guerre mondiale pour encourager la population en cas de guerre ; elle n’a presque pas été diffusée à l’époque. Redécouverte au début des années 2000, elle est devenue un slogan célèbre, très repris et parodié, qui montre à quel point un message court peut marquer les esprits.</p>`}},
'en4l':{
 deep:[{t:'Règles, droits et responsabilités',h:`<p>Pour parler des règles de l’école et de la société, on utilise les modaux que tu connais :</p>
${tb([[`<b>must</b> / <b>have to</b>`,`obligation : <b>Students must wear a badge.</b> <b>We have to be on time.</b>`],[`<b>mustn’t</b>`,`interdiction : <b>You mustn’t use your phone in class.</b>`],[`<b>don’t have to</b>`,`pas obligé : <b>You don’t have to buy the book.</b>`],[`<b>should</b>`,`conseil : <b>We should listen before speaking.</b>`],[`<b>can</b>`,`permission, possibilité : <b>You can join the club.</b>`]])}
<p>Vocabulaire : <b>a rule</b>, <b>a right</b> (droit), <b>a duty / a responsibility</b>, <b>respect</b>, <b>a council</b>, <b>to vote</b>, <b>a project</b>. Faux ami : <b>a right</b> signifie aussi « droite » ou « correct » selon le contexte : <b>You have the right to learn</b> / <b>Turn right</b> / <b>That’s right</b>.</p>`},
 {t:'Proposer un projet collectif',h:`<p>Pour proposer et discuter une idée en groupe : <b>Why don’t we…?</b> (Pourquoi ne pas…), <b>We could…</b> (On pourrait…), <b>Let’s…</b> (Faisons…), <b>I think we should…</b>, <b>I agree / I don’t agree</b>, <b>That’s a good idea</b>.</p>
<p>Exemple guidé : « Au conseil des élèves, nous pensons qu’il faut recycler le papier et que chacun doit respecter les règles. »</p>
${ol([`Opinion collective : <b>We think that</b>…`,`Conseil : <b>we should recycle paper</b>.`,`Obligation : <b>everybody must respect the rules</b>.`])}
<p>Résultat : <b>At the student council, we think we should recycle paper and everybody must respect the rules.</b></p>
<p>Prononciation : <b>responsibility</b> avec l’accent sur <b>-bil-</b> (« rispansibiliti »), <b>council</b> « kaounsil » (ne le confonds pas avec <b>counsel</b>, « conseil, avis », qui se prononce presque pareil).</p>`}],
 try:{q:`Complète : « You ___ run in the corridor (interdit). You ___ bring a snack (pas obligé). We ___ help each other (conseil). »`,a:`You mustn’t run in the corridor. You don’t have to bring a snack. We should help each other.`},
 adult:`Faites rédiger à l’enfant cinq règles de la maison ou de la classe en anglais : trois obligations, une interdiction, un conseil. Faites-lui proposer ensuite un projet collectif avec Why don’t we…? Surveillez mustn’t / don’t have to.`,
 culture:{t:`Le conseil des élèves`,h:`<p>Dans beaucoup d’établissements britanniques et américains, il existe un <b>school council</b>, où des élèves élus représentent leurs camarades auprès de la direction. Ils débattent de sujets concrets : la cantine, l’environnement, les clubs. C’est une manière d’apprendre la vie démocratique en pratique : voter, proposer, argumenter.</p>`}},
'en4m':{
 deep:[{t:'Raconter un voyage au prétérit',h:`<p>Pour raconter les étapes d’un voyage passé, on utilise le prétérit, avec des repères de temps et des mots d’ordre : <b>first</b>, <b>then</b>, <b>after that</b>, <b>finally</b>, <b>two days later</b>, <b>in 2018</b>.</p>
<p><b>They left their town in 2018. The journey lasted three days. They arrived in London in the evening.</b> Pour la durée : <b>lasted</b> + durée ; <b>for three days</b>. Verbes de déplacement : <b>leave → left</b>, <b>go → went</b>, <b>arrive</b> (arrive <b>in</b> une ville, <b>at</b> un lieu précis), <b>travel</b>, <b>cross</b> (traverser), <b>move</b> (déménager).</p>
<p>Moyens de transport : <b>by plane / train / boat / bus</b>. Piège : <b>arrive in Paris</b>, <b>arrive at the station</b> ; on ne dit pas « arrive to ».</p>`},
 {t:'Comprendre un récit de migration',h:`<p>Une migration est un déplacement pour s’installer ailleurs. Pour comprendre un récit, repère quatre moments : <b>departure</b> (le départ), <b>journey</b> (le trajet), <b>arrival</b> (l’arrivée), <b>reasons</b> (les raisons). Raisons fréquentes : <b>work</b>, <b>study</b>, <b>family</b>, <b>war</b>, <b>safety</b> (la sécurité). Faux ami : <b>to migrate</b> est le déplacement ; <b>an immigrant</b> arrive dans un pays, <b>an emigrant</b> le quitte.</p>
<p>Exemple guidé : « Sa famille a quitté son pays en 2015 pour trouver du travail. Le voyage a duré une semaine. »</p>
${ol([`Prétérit : <b>left</b>.`,`But : <b>to find work</b> (to + verbe).`,`Durée : <b>lasted a week</b>.`])}
<p>Résultat : <b>Her family left their country in 2015 to find work. The journey lasted a week.</b></p>
<p>Prononciation : <b>journey</b> « djeurni », <b>immigrant</b> avec l’accent sur le début, <b>arrived</b> « eraïvd ».</p>`}],
 try:{q:`Traduis : « Ils ont pris le train, puis ils ont traversé la mer en bateau et sont arrivés à Londres. »`,a:`They took the train, then they crossed the sea by boat and arrived in London. (took, crossed, arrived ; by boat ; arrive in + ville.)`},
 adult:`Demandez à l’enfant de raconter un voyage réel de la famille en quatre phrases au prétérit (départ, trajet, arrivée, impression). Pour la migration, lisez ensemble un témoignage simple et faites repérer departure / journey / arrival / reasons.`,
 culture:{t:`Ellis Island et le Windrush`,h:`<p>Entre 1892 et 1954, des millions de migrants européens sont arrivés aux États-Unis en passant par <b>Ellis Island</b>, près de New York, où leurs papiers étaient contrôlés. Au Royaume-Uni, le navire <b>Empire Windrush</b> est arrivé à Tilbury en juin 1948 avec des passagers venus des Caraïbes, qui venaient s’installer et travailler. Ces deux événements sont des symboles de l’histoire des migrations.</p>`}},
'en4n':{
 deep:[{t:'Comparer des cultures sans juger',h:`<p>Comparer deux cultures, c’est décrire des pratiques avec précision, sans dire qu’une est meilleure. Pour cela, on utilise des outils de comparaison :</p>
${tb([[`<b>both… and…</b>`,`<b>Both traditions bring people together.</b>`],[`<b>whereas / while</b>`,`<b>In France, people greet with a kiss, whereas in the UK they often shake hands.</b>`],[`<b>unlike</b>`,`<b>Unlike Christmas, Diwali is a festival of light.</b>`],[`<b>similar to / different from</b>`,`<b>This celebration is similar to ours.</b>`],[`<b>too / also</b>`,`ajout`]])}
<p>Éviter les stéréotypes : plutôt que « The British always drink tea », dis <b>Many British people drink tea</b> ou <b>Some people… / Often… / In some families…</b>. Les mots <b>always</b> et <b>never</b> sont presque toujours trop absolus quand on parle d’un groupe.</p>`},
 {t:'Fêtes et traditions : quelques repères',h:`<p>Vocabulaire des fêtes : <b>a festival</b>, <b>a celebration</b>, <b>a tradition</b>, <b>a custom</b> (une coutume), <b>a parade</b>, <b>fireworks</b> (feux d’artifice), <b>to celebrate</b>. Faux ami : <b>a custom</b> est une coutume, alors que <b>customs</b> (au pluriel, sans article) est la douane.</p>
<p>Quelques exemples : <b>Bonfire Night</b> (5 novembre) au Royaume-Uni, avec des feux d’artifice ; <b>Thanksgiving</b>, le quatrième jeudi de novembre aux États-Unis ; <b>Diwali</b>, la fête des lumières de l’hindouisme, fêtée dans de nombreux pays, dont le Royaume-Uni.</p>
<p>Exemple guidé : « Les deux fêtes rassemblent les familles, mais l’une a lieu en automne alors que l’autre a lieu en hiver. »</p>
${ol([`Ressemblance : <b>Both festivals bring families together</b>.`,`Contraste : <b>but one takes place in autumn whereas the other takes place in winter</b>.`])}
<p>Résultat : <b>Both festivals bring families together, but one takes place in autumn whereas the other takes place in winter.</b></p>`}],
 try:{q:`Reformule sans stéréotype : « Americans always eat burgers. » Puis traduis « Les deux fêtes sont différentes mais intéressantes. »`,a:`Many Americans eat burgers (ou Some Americans…). Both festivals are different but interesting.`},
 adult:`Choisissez avec l’enfant deux fêtes (une française, une anglophone) et faites-le comparer en cinq phrases avec both, whereas, unlike. Faites remplacer chaque always / never par some, many ou often, pour éviter les généralisations.`,
 culture:{t:`Bonfire Night`,h:`<p>Le 5 novembre, les Britanniques fêtent <b>Bonfire Night</b> : des feux de joie et des feux d’artifice rappellent l’échec de la <b>conspiration des poudres</b> de 1605, lorsque Guy Fawkes avait tenté de faire exploser le Parlement. La coutume date de plus de quatre siècles. C’est un exemple de tradition qui garde la mémoire d’un événement historique.</p>`}}
});
})(typeof window!=='undefined'?window:globalThis);
