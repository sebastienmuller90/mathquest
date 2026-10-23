/* Finot Académie — cours approfondis, vague 1 pédagogie finale (23/10/2026) : anglais 3e (fin de cycle 4, niveau A2 visé en LVA, A2 en LVB).
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
'en3a':{
 deep:[{t:'Former le present perfect et comprendre son rôle',h:`<p>Le <b>present perfect</b> se forme avec <b>have/has + participe passé</b> : <b>I have seen</b>, <b>she has finished</b>. Au quotidien, on contracte : <b>I’ve</b>, <b>she’s</b>, <b>haven’t</b>, <b>hasn’t</b>. Pour les verbes réguliers, le participe passé se termine par <b>-ed</b> (<b>worked</b>) ; pour les irréguliers, voir le chapitre dédié.</p>
<p>Il fait un <b>lien entre le passé et le présent</b>. On l’emploie pour :</p>
${tb([[`une <b>expérience</b> de vie`,`<b>Have you ever been to Scotland?</b> — <b>Yes, I have.</b> / <b>No, I’ve never been there.</b>`],[`un <b>résultat visible</b> maintenant`,`<b>I’ve lost my keys.</b> (je ne les ai toujours pas)`],[`une <b>action très récente</b>`,`<b>She has just left.</b>`],[`une <b>durée</b> qui continue`,`<b>I’ve lived here for five years.</b>`]])}
<p>Question : <b>Have you finished?</b> Négation : <b>I haven’t finished yet.</b></p>`},
 {t:'For, since, just, already, yet, ever, never',h:`<p>Ces petits mots accompagnent le present perfect :</p>
${tb([[`<b>for</b> + durée`,`<b>for three years</b>, <b>for two hours</b>`],[`<b>since</b> + point de départ`,`<b>since 2020</b>, <b>since Monday</b>`],[`<b>just</b>`,`il y a un instant : <b>I’ve just arrived.</b>`],[`<b>already</b>`,`déjà : <b>He has already finished.</b>`],[`<b>yet</b>`,`pas encore / déjà ? : <b>Have you eaten yet?</b>`],[`<b>ever</b> / <b>never</b>`,`déjà (question) / jamais`]])}
<p>Piège majeur : en français, « J’habite ici depuis cinq ans » se dit au présent. En anglais, on emploie le <b>present perfect</b> : <b>I’ve lived here for five years</b>. Dire « I live here for five years » est une erreur typique.</p>
<p>Autre piège : <b>have been to</b> et <b>have gone to</b>. <b>She has been to Rome</b> = elle y est allée et elle est revenue. <b>She has gone to Rome</b> = elle est partie, elle y est encore.</p>
<p>Exemple guidé : « Nous apprenons l’anglais depuis la 6e et nous sommes déjà allés deux fois à Londres. »</p>
${ol([`Durée qui continue → <b>have learnt</b> + <b>since</b> + point de départ (<b>since year 7</b>).`,`Expérience → <b>have been to London twice</b>.`])}
<p>Résultat : <b>We have learnt English since Year 7 and we have already been to London twice.</b> (On peut aussi dire <b>learned</b>.)</p>`}],
 try:{q:`Traduis : « Je connais Tom depuis 2019 et je n’ai jamais été à Dublin. »`,a:`I’ve known Tom since 2019 and I’ve never been to Dublin. (depuis + point de départ = since, avec le present perfect ; never s’utilise sans don’t.)`},
 adult:`Interrogez l’enfant avec des Have you ever…? (eaten sushi, been to London, seen a whale…). Il répond avec Yes, I have / No, I haven’t, puis donne des détails au prétérit. Insistez sur For/since avec le present perfect plutôt que le présent comme en français : How long have you studied English?`,
 culture:{t:`Le « I’ve » des chansons`,h:`<p>Beaucoup de titres de chansons utilisent le present perfect : <b>I’ve Got You Under My Skin</b>, <b>I Still Haven’t Found What I’m Looking For</b> (U2), <b>Have You Ever Seen the Rain?</b>. Le temps y exprime un lien entre le passé et le présent. Repère-le dans les paroles que tu écoutes : tu verras que <b>have/has</b> + participe passé revient très souvent.</p>`}},
'en3b':{
 deep:[{t:'Passé fini ou passé relié au présent ?',h:`<p>Le choix entre le <b>prétérit</b> et le <b>present perfect</b> dépend de la façon dont on voit le passé :</p>
${tb([[`<b>prétérit</b>`,`le passé est <b>terminé</b>, souvent daté : <b>I saw him yesterday.</b> <b>She lived in Paris in 2018.</b>`],[`<b>present perfect</b>`,`le passé est <b>relié au présent</b>, sans date précise : <b>I’ve seen this film.</b> <b>She has lived in Paris for years.</b> (elle y habite encore)`]])}
<p>Règle d’or : <b>si la phrase contient une date ou un repère de passé fini</b> (<b>yesterday</b>, <b>last week</b>, <b>in 2020</b>, <b>two days ago</b>, <b>when I was ten</b>), on emploie le <b>prétérit</b>, jamais le present perfect. « I have seen him yesterday » est faux.</p>
<p>La question <b>When did you…?</b> appelle toujours le prétérit : <b>When did you arrive? — I arrived at six.</b></p>`},
 {t:'Un pont entre les deux et exemple guidé',h:`<p>Une conversation courante commence au present perfect, puis passe au prétérit pour donner les détails :</p>
<p><b>— Have you ever been to London? — Yes, I have. — When did you go? — I went there last summer. — What did you see? — We saw Big Ben and we visited a museum.</b></p>
<p>Observe : la première question demande une expérience (present perfect) ; dès qu’on parle du moment ou des détails, on bascule au prétérit.</p>
<p>Avec <b>this week</b>, <b>today</b>, <b>this year</b>, qui sont des périodes qui ne sont pas terminées, on utilise plutôt le present perfect : <b>I’ve read two books this month.</b></p>
<p>Exemple guidé : « Ma tante a vécu à Rome pendant dix ans ; elle y est partie en 2005 et elle est revenue en 2015. »</p>
${ol([`Période terminée, avec des dates → prétérit.`,`Pas de lien avec le présent : elle n’y vit plus.`])}
<p>Résultat : <b>My aunt lived in Rome for ten years. She went there in 2005 and came back in 2015.</b></p>
<p>Si elle y habitait toujours, on dirait <b>My aunt has lived in Rome for ten years</b>.</p>`}],
 try:{q:`Choisis le bon temps : « I (to lose) my phone yesterday. / I (to lose) my phone, so I can’t call you. »`,a:`I lost my phone yesterday. / I’ve lost my phone, so I can’t call you. (yesterday = prétérit ; résultat présent = present perfect.)`},
 adult:`Demandez à l’enfant de raconter un voyage en deux temps : une phrase au present perfect (I’ve been to…) puis trois détails au prétérit. Surveillez la phrase interdite : yesterday, last week, ago + have. Faites-lui trouver trois indices de prétérit dans un petit texte.`,
 culture:{t:`Britanniques et Américains n’utilisent pas toujours le même temps`,h:`<p>En anglais américain, on dit parfois <b>Did you eat yet?</b> alors qu’un Britannique dirait <b>Have you eaten yet?</b>. Les deux versions existent et sont comprises. Ce détail montre que l’anglais évolue différemment selon les pays. À l’école, on t’apprend la règle britannique, qui reste la référence pour les examens.</p>`}},
'en3c':{
 deep:[{t:'Les participes passés irréguliers par familles',h:`<p>Pour former le <b>participe passé</b>, les verbes réguliers prennent <b>-ed</b>. Les verbes irréguliers sont à connaître, mais on peut les classer :</p>
${tb([[`même forme que le prétérit`,`<b>buy → bought → bought</b>, <b>make → made → made</b>, <b>have → had → had</b>, <b>say → said → said</b>, <b>find → found → found</b>`],[`participe en <b>-n</b> / <b>-en</b>`,`<b>see → saw → seen</b>, <b>eat → ate → eaten</b>, <b>take → took → taken</b>, <b>write → wrote → written</b>, <b>give → gave → given</b>`],[`participe en <b>-n</b> après une voyelle changée`,`<b>know → knew → known</b>, <b>grow → grew → grown</b>, <b>fly → flew → flown</b>, <b>draw → drew → drawn</b>`],[`<b>i → a → u</b>`,`<b>drink → drank → drunk</b>, <b>sing → sang → sung</b>, <b>swim → swam → swum</b>, <b>begin → began → begun</b>`],[`cas isolés`,`<b>go → went → gone</b>, <b>be → was/were → been</b>, <b>do → did → done</b>, <b>come → came → come</b>, <b>run → ran → run</b>`]])}`},
 {t:'Prononciation, confusions et mémorisation',h:`<p>Quelques pièges à l’oral :</p>
${ul([`<b>been</b> se dit « bîn » en forme forte (« bin » en forme faible, dans une phrase rapide) et <b>gone</b> « gonn ».`,`<b>done</b> se prononce « dane » (comme « done » dans « dunk ») et non « dône ».`,`<b>read</b> au participe passé s’écrit comme le présent mais se prononce « red ».`,`<b>written</b> : « riteune » avec deux t.`])}
<p>Erreurs typiques : utiliser le prétérit à la place du participe passé (« I have went », « I have saw », « she has ate »). Le participe passé a sa propre forme : <b>I have gone</b>, <b>I have seen</b>, <b>she has eaten</b>.</p>
<p>Méthode de mémorisation : apprends les verbes en trois colonnes (infinitif — prétérit — participe passé), récite-les à voix haute et mets-les ensuite dans une phrase au present perfect.</p>
<p>Exemple guidé : « Elle a écrit trois lettres et elle a pris une photo. » → <b>write → written</b>, <b>take → taken</b>. Résultat : <b>She has written three letters and she has taken a photo.</b></p>
<p>Américains et Britanniques diffèrent un peu : pour <b>get</b>, le participe est <b>got</b> au Royaume-Uni et <b>gotten</b> aux États-Unis.</p>`}],
 try:{q:`Écris les participes passés : « see, eat, write, drink, go, be »`,a:`seen, eaten, written, drunk, gone, been.`},
 adult:`Fabriquez un jeu de 15 cartes (infinitif au recto, trois formes au verso). L’enfant dit les trois formes à voix haute, puis fait une phrase au present perfect (I have eaten…). Repérez les confusions go/gone/been, et la prononciation de been, gone, done, read.`,
 culture:{t:`Trois formes pour un verbe : un héritage germanique`,h:`<p>Les verbes irréguliers anglais forment leurs trois temps de base en changeant la voyelle : <b>sing — sang — sung</b>. On retrouve le même système en allemand (<b>singen — sang — gesungen</b>) et en néerlandais. C’est un des signes de la parenté entre ces langues. Le français, lui, vient du latin et utilise d’autres mécanismes.</p>`}},
'en3d':{
 deep:[{t:'La condition réelle : IF + présent, WILL',h:`<p>Pour parler de quelque chose qui est <b>possible ou probable</b>, on construit : <b>If + présent simple, will + verbe de base</b>.</p>
${tb([[`<b>If it rains, we will stay at home.</b>`,`S’il pleut, nous resterons à la maison.`],[`<b>If you study, you’ll pass the test.</b>`,`Si tu étudies, tu réussiras.`],[`<b>She won’t come if she is tired.</b>`,`Elle ne viendra pas si elle est fatiguée.`]])}
<p>Piège majeur : en français, on dit « si + présent » (« s’il pleut »), mais on peut vouloir mettre « will » après if. En anglais, <b>jamais de will après if</b> : « If it will rain » est faux. Le futur est dans la proposition principale seulement.</p>
<p>La virgule est obligatoire quand la phrase commence par <b>if</b> : <b>If you help me, I’ll help you.</b> Elle disparaît quand <b>if</b> est au milieu : <b>I’ll help you if you help me.</b></p>`},
 {t:'Variantes : unless, when, impératif, can',h:`<p>Dans la proposition principale, on peut aussi trouver :</p>
${ul([`un <b>impératif</b> : <b>If you see Tom, tell him to call me.</b>`,`un verbe modal : <b>If you finish early, you can go home.</b> / <b>You should stay if you feel ill.</b>`])}
<p><b>Unless</b> signifie « à moins que » (= <b>if… not</b>) : <b>Unless you hurry, you’ll be late</b> = <b>If you don’t hurry, you’ll be late.</b> On n’ajoute pas de négation après <b>unless</b>.</p>
<p>Attention à ne pas confondre <b>if</b> (possible, incertain) et <b>when</b> (certain) : <b>When I get home, I’ll call you</b> (je rentrerai à coup sûr) ; <b>If I get home early, I’ll call you</b> (peut-être).</p>
<p>Exemple guidé : « Si tu ne fais pas tes devoirs, tu auras une mauvaise note. »</p>
${ol([`Condition → <b>if + présent simple négatif</b> : <b>if you don’t do your homework</b>.`,`Conséquence → <b>will + verbe de base</b> : <b>you will get a bad mark</b>.`])}
<p>Résultat : <b>If you don’t do your homework, you will get a bad mark.</b> Aussi : <b>Unless you do your homework, you will get a bad mark.</b></p>
<p>Prononciation : <b>won’t</b> « ouône », <b>unless</b> « anlès ».</p>`}],
 try:{q:`Corrige : « If it will be sunny tomorrow, we will go to the beach. » Puis traduis « À moins que tu ne partes maintenant, tu seras en retard. »`,a:`If it is sunny tomorrow, we will go to the beach. / Unless you leave now, you’ll be late. (pas de will après if ; unless remplace if… not.)`},
 adult:`Jouez au jeu de la chaîne : vous dites If you win the game… l’enfant continue avec une conséquence (…you’ll get a prize), puis il prend votre fin pour une nouvelle condition (If I get a prize…). Corrigez immédiatement les will placés après if.`,
 culture:{t:`If, le poème de Rudyard Kipling`,h:`<p>Le poème <b>If—</b>, publié en 1910 par l’écrivain britannique Rudyard Kipling, est construit presque entièrement sur des phrases conditionnelles : <b>If you can keep your head when all about you are losing theirs…</b> Il donne des conseils à un fils pour devenir un adulte. Tu y reconnais la structure <b>if + présent</b> qui ouvre toutes les phrases.</p>`}},
'en3e':{
 deep:[{t:'La condition imaginaire : IF + prétérit, WOULD',h:`<p>Pour parler de quelque chose d’<b>improbable, irréel ou imaginaire</b> dans le présent ou le futur, on construit : <b>If + prétérit, would + verbe de base</b>.</p>
${tb([[`<b>If I won the lottery, I would buy a house.</b>`,`Si je gagnais à la loterie, j’achèterais une maison.`],[`<b>If she had a car, she would drive to work.</b>`,`Si elle avait une voiture, elle irait au travail en voiture.`],[`<b>What would you do if you were invisible?</b>`,`Que ferais-tu si tu étais invisible ?`]])}
<p>Attention : le prétérit après <b>if</b> ne parle pas du passé ! Il marque l’irréel, comme l’imparfait en français (« si j’avais… je ferais »). Le français et l’anglais ont donc la même logique ici.</p>
<p>Pour le verbe <b>be</b>, on utilise souvent <b>were</b> à toutes les personnes : <b>If I were you</b>, <b>If he were here</b>. <b>Was</b> est toléré à l’oral, mais <b>were</b> est la forme correcte en classe.</p>`},
 {t:'Comparer le réel et l’irréel, conseils et prononciation',h:`<p>Deux conditions, deux ambiances :</p>
${tb([[`<b>If it rains, I’ll take an umbrella.</b>`,`probable (condition réelle)`],[`<b>If I were a bird, I would fly to the sea.</b>`,`imaginaire (condition irréelle)`]])}
<p>Une expression très utile pour donner un conseil : <b>If I were you, I would…</b> (« À ta place, je… »). <b>If I were you, I’d talk to your teacher.</b></p>
<p>Piège : en anglais, jamais de <b>would</b> après <b>if</b> : « If I would have time » est faux. <b>If I had time, I would help you.</b></p>
<p>Prononciation : <b>would</b> se dit « woud » avec le <b>l</b> muet ; la contraction <b>I’d</b> se prononce « aïd ». Ne confonds pas <b>I’d</b> = <b>I would</b> avec <b>I’d</b> = <b>I had</b> : le verbe qui suit t’aide à trancher.</p>
<p>Exemple guidé : « Si j’étais toi, je ne mangerais pas autant de sucre, parce que ce n’est pas bon pour la santé. »</p>
${ol([`Conseil : <b>If I were you</b>.`,`Conséquence : <b>I wouldn’t eat so much sugar</b> (négatif de would).`])}
<p>Résultat : <b>If I were you, I wouldn’t eat so much sugar, because it isn’t good for your health.</b></p>`}],
 try:{q:`Traduis : « Si nous avions plus de temps, nous visiterions le musée. »`,a:`If we had more time, we would visit the museum. (prétérit après if ; would + verbe de base dans la principale.)`},
 adult:`Lancez des questions du type What would you do if… ? (you were a teacher / you could fly / you had a million euros). L’enfant répond par I would… Surveillez le were après if, et l’absence de would dans la partie if. C’est un excellent exercice d’imagination en anglais.`,
 culture:{t:`If I Were a Rich Man`,h:`<p>La célèbre comédie musicale <b>Fiddler on the Roof</b> (« Un violon sur le toit ») contient la chanson <b>If I Were a Rich Man</b>. Le héros y imagine tout ce qu’il ferait s’il était riche. Le titre utilise <b>were</b> avec <b>I</b>, la forme de l’irréel à connaître. La chanson est un parfait exemple de phrase « if + prétérit » suivie d’une série de <b>would</b>.</p>`}},
'en3f':{
 deep:[{t:'Former le passif',h:`<p>À la voix active, le sujet fait l’action : <b>Shakespeare wrote Hamlet.</b> À la voix passive, c’est l’objet qui devient sujet : <b>Hamlet was written by Shakespeare.</b></p>
<p>Le passif se forme avec <b>be</b> (au temps voulu) + <b>participe passé</b> :</p>
${tb([[`présent`,`<b>English is spoken in many countries.</b>`],[`prétérit`,`<b>The window was broken yesterday.</b>`],[`present perfect`,`<b>The work has been done.</b>`],[`futur`,`<b>The match will be played on Sunday.</b>`],[`modal`,`<b>It can be seen from here.</b>`]])}
<p>Pour transformer une phrase active en phrase passive : 1) l’objet devient le sujet ; 2) on conjugue <b>be</b> au même temps que le verbe actif ; 3) on met le verbe au participe passé ; 4) l’ancien sujet devient un complément introduit par <b>by</b> (facultatif).</p>`},
 {t:'Quand utiliser le passif, et pièges',h:`<p>On préfère le passif quand :</p>
${ul([`on ne connaît pas l’auteur de l’action : <b>My bike was stolen.</b>`,`l’auteur n’est pas important : <b>Rice is grown in Asia.</b>`,`on veut mettre en avant le résultat : <b>The bridge was built in 1850.</b>`])}
<p>Le complément d’agent (<b>by</b> + personne) n’est utilisé que s’il apporte une information : <b>The Mona Lisa was painted by Leonardo da Vinci.</b></p>
<p>Pièges à éviter : seuls les verbes qui acceptent un complément d’objet peuvent passer au passif. On ne dit pas « It was happened » : <b>happen</b>, <b>arrive</b>, <b>go</b> n’ont pas de passif. Et « on » en français ne se traduit pas par un sujet : « On parle anglais ici » → <b>English is spoken here</b>.</p>
<p>Exemple guidé : « On a construit cette église au XVe siècle et on l’a rénovée l’année dernière. »</p>
${ol([`Sujet « on » inconnu → passif.`,`« a construit » → prétérit passif : <b>was built</b> ; « l’a rénovée » → <b>was renovated</b>.`])}
<p>Résultat : <b>This church was built in the 15th century and it was renovated last year.</b></p>
<p>Prononciation : le <b>-ed</b> de <b>renovated</b> se dit « id », celui de <b>built</b> n’existe pas (verbe irrégulier). N’oublie pas <b>be born</b> : <b>I was born in 2012</b> est déjà un passif !</p>`}],
 try:{q:`Mets au passif : « They built this bridge in 1900. » Puis : « Someone has stolen my bike. »`,a:`This bridge was built in 1900. / My bike has been stolen. (be au même temps + participe passé ; by someone est inutile.)`},
 adult:`Cherchez ensemble dans la maison des objets avec une étiquette « Made in… » et faites des phrases au passif : This shirt was made in Portugal. This phone was designed in California. Vérifiez que be est au bon temps (is/was) et que le verbe est au participe passé.`,
 culture:{t:`Le passif des titres de journaux`,h:`<p>Les gros titres de la presse britannique utilisent souvent le passif et suppriment même le verbe <b>be</b> : <b>Man arrested after robbery</b> pour <b>A man has been arrested after a robbery</b>. Cette écriture compacte te permet de reconnaître une information importante : ce qui est arrivé à quelqu’un, pas qui a agi.</p>`}},
'en3g':{
 deep:[{t:'WHO, WHICH, THAT, WHOSE : relier deux phrases',h:`<p>Les pronoms relatifs servent à relier deux phrases en ajoutant une information sur un nom :</p>
${tb([[`<b>who</b>`,`pour une personne : <b>The girl who lives next door is my friend.</b>`],[`<b>which</b>`,`pour une chose ou un animal : <b>The book which I read was great.</b>`],[`<b>that</b>`,`pour une personne ou une chose : <b>The film that we saw was funny.</b>`],[`<b>whose</b>`,`appartenance : <b>The boy whose bike was stolen is upset.</b>`],[`<b>where</b> / <b>when</b>`,`lieu / moment : <b>the town where I live</b>, <b>the day when we met</b>`]])}
<p>Piège : le pronom relatif <b>remplace déjà</b> le sujet ou l’objet. Il ne faut pas le répéter : « The man who he lives here » est faux. On dit <b>The man who lives here</b>.</p>
<p>Prononciation : <b>whose</b> se dit « houz », comme <b>who’s</b> (= who is). Ne les confonds pas à l’écrit.</p>`},
 {t:'Quand supprimer le pronom, et propositions avec virgules',h:`<p>Quand le pronom relatif est <b>complément d’objet</b> (il est suivi d’un sujet), on peut le supprimer : <b>The book (that) I read was great.</b> <b>The girl (who) I met is Spanish.</b> En revanche, quand il est <b>sujet</b>, il est obligatoire : <b>The girl who lives here is Spanish.</b></p>
<p>On distingue :</p>
${ul([`la relative qui <b>précise</b> de qui on parle (sans virgule) : <b>The boy who sits next to me is Tom.</b>`,`la relative qui <b>ajoute une information</b> (entre virgules) : <b>My brother, who lives in Lyon, is a doctor.</b> Ici, on n’emploie pas <b>that</b>.`])}
<p>Exemple guidé : « J’ai une amie dont le père est pilote ; elle habite dans la maison que vous voyez là-bas. »</p>
${ol([`« dont le père » = possession → <b>whose father</b>.`,`« la maison que vous voyez » → relatif objet, supprimable → <b>the house (that) you can see</b>.`])}
<p>Résultat : <b>I have a friend whose father is a pilot. She lives in the house (that) you can see over there.</b></p>
<p>Attention : le français « dont » a plusieurs traductions : <b>whose</b> (possession), <b>of which</b> (rare) ou la préposition en fin de phrase (<b>the film I told you about</b>).</p>`}],
 try:{q:`Relie les phrases : « I have a friend. She speaks Italian. » puis « This is the book. I bought it yesterday. »`,a:`I have a friend who speaks Italian. / This is the book (that) I bought yesterday. (who sujet obligatoire ; le relatif objet peut disparaître et « it » disparaît.)`},
 adult:`Faites décrire à l’enfant des personnes ou objets de la pièce sans les nommer : « It’s something that… » « It’s a person who… » ; vous devinez. Cela entraîne naturellement who/which/that. Corrigez les doublons (the man who he) et l’emploi de who pour une chose.`,
 culture:{t:`La maison que Jack a construite`,h:`<p>Une comptine anglaise célèbre, <b>This is the house that Jack built</b>, est entièrement construite avec des pronoms relatifs qui s’enchaînent : <b>This is the malt that lay in the house that Jack built</b>, puis <b>This is the rat that ate the malt…</b> Chaque couplet ajoute une proposition relative. Tu peux t’en servir pour t’entraîner à mémoriser <b>that</b> et <b>who</b>.</p>`}},
'en3h':{
 deep:[{t:'Donner un conseil',h:`<p>Pour conseiller, on a plusieurs outils, du plus doux au plus fort :</p>
${tb([[`<b>should / shouldn’t</b>`,`conseil courant : <b>You should drink more water.</b>`],[`<b>ought to</b>`,`conseil appuyé : <b>You ought to see a doctor.</b>`],[`<b>had better</b>`,`conseil urgent, avec menace : <b>You’d better hurry or you’ll miss the train.</b>`],[`<b>If I were you, I’d…</b>`,`<b>If I were you, I’d call him.</b>`],[`<b>Why don’t you…?</b>`,`<b>Why don’t you ask your teacher?</b>`]])}
<p>Règles : <b>should</b> ne prend pas de -s et est suivi du verbe de base sans <b>to</b> (<b>she should go</b>). <b>Ought</b> est suivi de <b>to</b> : <b>you ought to rest</b>. <b>Had better</b> est suivi du verbe de base : <b>I’d better go</b>.</p>
<p>Prononciation : <b>should</b> se dit « choud » (le <b>l</b> est muet), comme <b>would</b> et <b>could</b>.</p>`},
 {t:'Exprimer la possibilité et la déduction',h:`<p>Pour dire que quelque chose est possible, on emploie <b>may</b>, <b>might</b> ou <b>could</b> (plus ou moins sûr) suivis du verbe de base :</p>
${tb([[`<b>It may rain later.</b>`,`peut-être (possibilité réelle)`],[`<b>She might be at home.</b>`,`peut-être (moins sûr)`],[`<b>This could be the answer.</b>`,`c’est possible`]])}
<p>Pour une déduction (quelque chose dont on est sûr) : <b>must be</b> et <b>can’t be</b>. <b>He must be tired</b> (il doit être fatigué, j’en suis presque sûr). <b>That can’t be true!</b> (ce n’est pas possible !). Ne confonds pas <b>mustn’t</b> (interdiction) et <b>can’t</b> (impossibilité).</p>
<p>Pour la permission : <b>May I come in?</b> est poli ; <b>Can I come in?</b> est courant ; <b>Could I borrow your pen?</b> est très poli.</p>
<p>Exemple guidé : « Il est cinq heures du matin et mon frère dort encore : il doit être épuisé. Peut-être qu’il ne viendra pas. »</p>
${ol([`Déduction presque certaine → <b>must be</b>.`,`Possibilité → <b>might not come</b>.`])}
<p>Résultat : <b>It’s five a.m. and my brother is still asleep. He must be exhausted. He might not come.</b></p>`}],
 try:{q:`Traduis : « Tu devrais te reposer, tu as l’air fatigué. Peut-être qu’elle va appeler. »`,a:`You should rest; you look tired. She might call. (should + verbe de base ; might pour une possibilité.)`},
 adult:`Jouez à « Agony aunt » : vous présentez un petit problème (I can’t sleep, I have too much homework) ; l’enfant donne trois conseils avec should / shouldn’t / If I were you. Puis posez une devinette (Who’s at the door?) pour exercer might, must be et can’t be.`,
 culture:{t:`Le courrier des lecteurs`,h:`<p>Dans les journaux britanniques, une rubrique très ancienne s’appelle l’<b>agony column</b> : des lecteurs y exposent leurs soucis, et un journaliste leur répond par des conseils. Ces réponses utilisent beaucoup de <b>should</b>, <b>ought to</b> et <b>If I were you</b>. Sur Internet, les forums d’entraide fonctionnent de la même manière.</p>`}},
'en3i':{
 deep:[{t:'USED TO : ce qui a changé depuis',h:`<p><b>Used to</b> + verbe de base exprime une <b>habitude passée</b> ou un <b>état passé</b> qui n’existe plus : <b>I used to live in Nice.</b> (j’y habitais, mais plus maintenant) ; <b>She used to be shy.</b> (elle était timide, elle ne l’est plus).</p>
${tb([[`Affirmative`,`<b>We used to play football every day.</b>`],[`Négative`,`<b>He didn’t use to eat fish.</b>`],[`Question`,`<b>Did you use to have a dog?</b>`]])}
<p>Remarque : à la forme négative et à la question, <b>did</b> porte le prétérit, donc on écrit <b>use to</b> (sans d). Dans la langue courante, on voit aussi <b>didn’t used to</b>, mais en classe, on écrit <b>use to</b>.</p>
<p>Il n’y a qu’une forme pour toutes les personnes : <b>used to</b> ne prend pas de -s.</p>`},
 {t:'Le piège : be used to, get used to',h:`<p>Ne confonds pas <b>used to</b> + verbe de base avec <b>be used to</b> + nom ou verbe en <b>-ing</b>, qui signifie « être habitué à » :</p>
${tb([[`<b>I used to get up at six.</b>`,`avant, je me levais à six heures (habitude passée)`],[`<b>I am used to getting up at six.</b>`,`je suis habitué à me lever à six heures (aujourd’hui)`],[`<b>I’m getting used to the food.</b>`,`je m’habitue à la nourriture (processus)`]])}
<p>Après <b>be used to</b> et <b>get used to</b>, le <b>to</b> est une préposition : on met donc un verbe en <b>-ing</b>.</p>
<p>Pour parler d’une habitude passée, on peut aussi employer <b>would</b> : <b>When I was a child, we would go to the sea every summer.</b> Mais seulement pour des actions, pas pour des états : on ne dit pas « I would be shy ».</p>
<p>Prononciation : <b>used to</b> (habitude) se dit « youst tou » avec un <b>s</b> sourd, alors que le verbe <b>use</b> se dit « youz ». Ne dis pas « youzd tou ».</p>
<p>Exemple guidé : « Quand j’étais petit, je ne mangeais pas de légumes, mais maintenant je suis habitué à en manger tous les jours. »</p>
${ol([`Habitude passée → <b>I didn’t use to eat vegetables</b>.`,`Habitué aujourd’hui → <b>I’m used to eating</b> (verbe en -ing).`])}
<p>Résultat : <b>When I was little, I didn’t use to eat vegetables, but now I’m used to eating them every day.</b></p>`}],
 try:{q:`Traduis : « Il habitait à Marseille, mais il est maintenant habitué à vivre à Paris. »`,a:`He used to live in Marseille, but now he is used to living in Paris. (used to + base ; be used to + -ing.)`},
 adult:`Montrez à l’enfant une vieille photo de la famille et demandez-lui de comparer avec aujourd’hui : We used to live… / Dad used to have long hair. Puis demandez-lui ce à quoi il est habitué (I’m used to getting up early). Surveillez le -ing après be used to.`,
 culture:{t:`« They don’t make them like they used to »`,h:`<p>L’expression <b>used to</b> est omniprésente dans les chansons et les souvenirs d’enfance. Elle aide à raconter « le monde d’avant ». Les anglophones disent souvent <b>Things aren’t what they used to be</b> pour dire que les choses ont changé. Chaque génération trouve que c’était mieux avant, quel que soit le pays !</p>`}},
'en3j':{
 deep:[{t:'Relier ses idées : addition, opposition, cause, conséquence',h:`<p>Les mots de liaison rendent un texte clair. Voici les principaux, classés par fonction :</p>
${tb([[`addition`,`<b>and</b>, <b>also</b>, <b>too</b>, <b>as well</b>`],[`opposition`,`<b>but</b>, <b>however</b>, <b>although</b>, <b>whereas</b>, <b>on the other hand</b>`],[`cause`,`<b>because</b>, <b>since</b>, <b>because of</b> + nom`],[`conséquence`,`<b>so</b>, <b>therefore</b>, <b>as a result</b>`],[`ordre`,`<b>first</b>, <b>then</b>, <b>next</b>, <b>finally</b>`],[`exemple, conclusion`,`<b>for example</b>, <b>in conclusion</b>`]])}
<p>Piège : en français, on ne met pas « mais » après « bien que ». En anglais, de même : on dit <b>Although it was raining, we went out</b> ou <b>It was raining, but we went out</b>, jamais « Although… but ».</p>`},
 {t:'Les constructions à ne pas confondre',h:`<p>Certains mots de liaison demandent une construction précise :</p>
${tb([[`<b>because</b> + sujet + verbe`,`<b>I stayed home because I was ill.</b>`],[`<b>because of</b> + nom`,`<b>I stayed home because of the rain.</b>`],[`<b>although</b> + sujet + verbe`,`<b>Although he was tired, he came.</b>`],[`<b>despite / in spite of</b> + nom ou -ing`,`<b>Despite the rain / Despite being tired, he came.</b>`],[`<b>however</b>`,`début de phrase, suivi d’une virgule : <b>However, I disagree.</b>`]])}
<p>Autre distinction : <b>so</b> introduit la conséquence (<b>I was tired, so I went to bed</b>), <b>because</b> introduit la cause (<b>I went to bed because I was tired</b>). On ne met pas de virgule avant <b>because</b>, mais on en met souvent devant <b>so</b>.</p>
<p>Exemple guidé : « Je voulais sortir, mais il pleuvait. Pourtant, comme j’étais en retard, j’ai pris un parapluie et je suis parti. »</p>
${ol([`Opposition → <b>but</b> : <b>I wanted to go out, but it was raining</b>.`,`Contraste fort → <b>However</b>, suivi d’une virgule.`,`Cause → <b>because</b> : <b>because I was late</b>.`])}
<p>Résultat : <b>I wanted to go out, but it was raining. However, because I was late, I took an umbrella and left.</b></p>`}],
 try:{q:`Complète avec because, because of, although ou however : « ___ the snow, the train was late. / The test was difficult. ___, I passed. »`,a:`Because of the snow, the train was late. / The test was difficult. However, I passed. (because of + nom ; however + virgule.)`},
 adult:`Faites rédiger à l’enfant un petit paragraphe de cinq lignes sur un sujet de son choix (mon week-end idéal) en utilisant au moins cinq mots de liaison différents (first, then, but, because, finally). Lisez-le à voix haute avec lui : le texte doit sonner naturel, sans phrases coupées.`,
 culture:{t:`Le conseil de George Orwell`,h:`<p>Dans son essai <b>Politics and the English Language</b> (1946), l’écrivain britannique George Orwell donne plusieurs règles pour écrire clairement. L’une d’elles est : <b>Never use a long word where a short one will do</b> (n’emploie jamais un mot long quand un mot court suffit). Les mots de liaison simples, comme <b>but</b>, <b>so</b> ou <b>because</b>, appliquent bien ce conseil.</p>`}}
});
})(typeof window!=='undefined'?window:globalThis);
