/* Vague 1 (23/10/2026) : préparation du texte oral (lettre seule, blancs, abréviations, numéros, dates, signe moins, fractions)
   et compléments du lexique de prononciation. Moteur seul (vm, voix simulées) : aucune synthèse réelle, aucun réseau. */
const vm=require('vm'),fs=require('fs'),path=require('path');const {ROOT}=require('./lib');
function mk(){const ctx={console,Math,Date,JSON,String,Number,Array,Object,Set,Map,Error,RegExp,Promise,setTimeout,clearTimeout,parseInt,parseFloat,isFinite,isNaN,Intl};ctx.window=ctx;ctx.globalThis=ctx;vm.createContext(ctx);
  for(const f of ['data/pronunciation-lexicon.js','js/audio-engine.js'])vm.runInContext(fs.readFileSync(path.join(ROOT,f),'utf8'),ctx,{filename:f});return ctx;}
async function run(){const R=[];const T=(name,ok,detail='')=>R.push({name,ok:!!ok,detail:String(detail).slice(0,500)});
 const c=mk(),A=c.MQAudio,P=t=>A.prepareFR(t);
 // Lettre seule : nom de la lettre, jamais lue comme un mot ; dans une phrase, rien ne change
 const names={a:'a',b:'bé',c:'cé',h:'ache',j:'ji',k:'ka',l:'elle',q:'ku',w:'double vé',x:'ixe',y:'i grec',z:'zède'};
 for(const [l,n] of Object.entries(names))T(`Lettre seule « ${l} » : lue par son nom (« ${n} »)`,P(l)===n&&P(l.toUpperCase())===n,P(l));
 T('Lettre seule entre guillemets ou suivie d’un point : même nom',P('« y »')==='i grec'&&P('l.')==='elle'&&P('(b)')==='bé');
 T('Une lettre dans une phrase n’est pas transformée',P('La lettre y est dans « pyjama ».')==='La lettre y est dans « pyjama ».'&&P('Le b et le d')==='Le b et le d');
 T('Un mot court (« a », « et », « ou ») reste un mot quand il est seul avec une lettre accentuée ou plusieurs lettres',P('et')==='et'&&P('ou')==='ou'&&P('à')==='à'&&P('é')==='é');
 T('Le lexique CP reste prioritaire (type « lettre » → « B. La lettre B… »)',/La lettre B/.test(A.spokenFor('b','lettre','fr')));
 // Blancs
 T('Blanc « ___ » d’un exercice : une pause, jamais « tiret bas »',P('Il faut que nous ___ (être) à l’heure.')==="Il faut que nous … (être) à l'heure."&&!/_/.test(P('Complète : un ______ .')));
 T('Blanc dans une langue étrangère : comportement existant conservé',!/_/.test(A.prepare('I ___ a pen.','en')));
 // Abréviations
 T('Civilités : Mme, Mlle, M. + nom, Dr + nom',P('Mme Durand et Mlle Roux')==='madame Durand et mademoiselle Roux'&&P('M. Martin')==='monsieur Martin'&&P('Dr Petit')==='docteur Petit');
 T('« M » isolé ou unité non confondus avec « M. »',P('5 m')==='5 mètres'&&P('Les M. majuscules')!==undefined&&P('3 cm')==='3 centimètres');
 T('Numéros : « n° 3 », « N°12 » → numéro',P('la ligne verticale n° 3')==='la ligne verticale numéro 3'&&P('N°12')==='numéro 12');
 T('Références : p. 12, pp. 4, Fig. 2, cf., etc.',P('p. 12')==='page 12'&&P('pp. 4')==='pages 4'&&P('Fig. 2')==='figure 2'&&/^voir /.test(P('cf. la leçon'))&&/et cetera/.test(P('pommes, poires, etc.')));
 T('Siècle : « Ier siècle » → premier siècle (et XIXe inchangé)',P('le Ier siècle')==='le premier siècle'&&P('le XIXe siècle')==='le 19ème siècle');
 // Dates
 T('Dates jj/mm/aaaa lues avec le nom du mois, 1er pour le premier',P('le 12/10/2026')==='le 12 octobre 2026'&&P('le 01/05/1789')==='le premier mai 1789',P('le 01/05/1789'));
 T('Une fraction n’est pas prise pour une date',P('3/4 des élèves')==='3 quarts des élèves'&&P('le 12/10')!=='le 12 octobre');
 // Signe moins
 T('Température négative : « -5 °C » → moins 5 degrés Celsius',P('Il fait -5 °C')==='Il fait moins 5 degrés Celsius');
 T('Soustraction écrite avec un tiret : « 8 - 3 = 5 » → 8 moins 3 égale 5',P('8 - 3 = 5')==='8 moins 3 égale 5');
 T('Un intervalle sans égalité n’est pas transformé en soustraction',P('pages 5 - 8')==='pages 5 - 8'&&P('de 10-12 ans')==='de 10-12 ans');
 // Fractions
 T('« un 1/4 de tour » : un seul « un »',P('un 1/4 de tour')==='un quart de tour'&&P('1/4 de tour')==='un quart de tour');
 T('Fractions d’heure : 1/2 h, 1/4 h, 3/4 h',P('1/2 h')==='une demi-heure'&&P('1/4 h')==="un quart d'heure"&&P('3/4 h')==="trois quarts d'heure");
 T('Heures inchangées : 8 h 30, 9 h',P('8 h 30')==='8 heures 30'&&P('9 h')==='9 heures');
 T('Exposant après parenthèse : (a + b)² → au carré',P('(a + b)²')==='(a plus b) au carré');
 // Langues étrangères : aucune règle française
 T('Anglais et italien : aucune règle française appliquée (Mme, n°, dates, lettre seule)',A.prepare('Mme','en')==='Mme'&&A.prepare('n° 3','en')==='n° 3'&&A.prepare('b','en')==='b'&&A.prepare('12/10/2026','it')==='12/10/2026');
 // Lexique : compléments
 const L=c.MQ_PRONUNCIATION;
 T('Lexique : nouveaux sons (am, em, im, om, um, ui, tion, oy, eur, oir) avec exemple prononcé',['am','em','im','om','um','ui','tion','oy','eur','oir'].every(g=>L.graphemes[g]&&L.graphemes[g].say&&L.graphemes[g].exemple));
 T('Lexique : « tion » dit « sion » et ne se lit plus lettre à lettre',/sion/.test(A.spokenFor('tion','graphème','fr')));
 T('Lexique : lettres accentuées (à â î ô û ù ï ë) et « œ » ont un texte oral',['à','â','î','ô','û','ù','ï','ë','œ'].every(k=>L.letters[k]&&L.letters[k].say&&L.letters[k].exemple));
 T('Lexique : entrées d’origine inchangées',L.graphemes.ou.say==='OU. Le son ou, comme dans loup.'&&L.letters.a.say==='A. La lettre A. A comme avion.'&&L.syllables.ma.say==='ma. Comme au début de maman.');
 return R;}
if(require.main===module)require('./lib').main(run);
module.exports=run;
