/* Vague 1 (23/10/2026) : dictée pédagogique non binaire — tolérances typographiques, nature précise de chaque écart,
   pistes sans la réponse (hints / coach / feedback progressif), compatibilité du barème. Moteur seul (vm, sans navigateur). */
const vm=require('vm'),fs=require('fs'),path=require('path');const {ROOT}=require('./lib');
async function run(){const R=[];const T=(name,ok,detail='')=>R.push({name,ok:!!ok,detail:String(detail).slice(0,500)});
 const ctx={console,Math,JSON,String,Number,Array,Object,Set,Map,RegExp,Error};ctx.window=ctx;ctx.globalThis=ctx;vm.createContext(ctx);
 vm.runInContext(fs.readFileSync(path.join(ROOT,'js/dictation-engine.js'),'utf8'),ctx);const D=ctx.MQDictation;
 const A=(r,a,o)=>D.analyze(r,a,o);const kinds=x=>x.errors.map(e=>e.kind).join('|');
 // 1. Phrase exacte et variantes typographiques acceptables
 {const x=A('Léa dit : « bonjour ».','Léa dit : « bonjour ».');T('Phrase exacte : 100 %, exact, aucune variante',x.score===100&&x.exact&&!x.variant.length,JSON.stringify(x.variant));}
 for(const [lab,a] of [['guillemets droits','Léa dit : "bonjour".'],['guillemets anglais','Léa dit : “bonjour”.'],['guillemets sans espaces','Léa dit :«bonjour».'],['espace insécable avant :','Léa dit : « bonjour ».'],['espace fine insécable','Léa dit : « bonjour ».']]){const x=A('Léa dit : « bonjour ».',a);T(`Variante typographique acceptée sans pénalité : ${lab}`,x.score===100&&!x.exact,x.score+' '+kinds(x));}
 {const x=A('L’élève écrit…','L\'élève écrit...');T('Apostrophe droite et trois points acceptés',x.score===100&&x.variant.includes('apostrophe')&&x.variant.includes('points de suspension'),JSON.stringify(x.variant));}
 {const x=A('Le café est prêt.','Le café est prêt.');T('Accents saisis en deux caractères (NFD) acceptés',x.score===100,x.score+' '+kinds(x));}
 {const x=A('— Bonjour, dit-il.','– Bonjour, dit-il.');T('Tiret de dialogue : demi-cadratin accepté',x.score===100,x.score+' '+kinds(x));}
 // 2. Nature précise des écarts (type inchangé, kind nouveau)
 const K=[['Il mange une pomme.','Il mange une pome.','orthographe','consonne double'],
  ['Le chat dort.','Le chta dort.','orthographe','lettres inversées'],['Le chat dort.','Le cht dort.','orthographe','lettre manquante'],['Le chat dort.','Le chiat dort.','orthographe','lettre ajoutée'],['Le chat dort.','Le chet dort.','orthographe','lettre erronée'],
  ['La fête est finie.','La fete est finie.','accent','accent oublié'],['Il a mangé.','Il a mangè.','accent','accent erroné'],['L’élève.','L’eleve.','accent','accent oublié'],
  ['Les petits chats.','Les petit chats.','accord','accord pluriel oublié'],['Une petite fille.','Une petit fille.','accord','accord féminin oublié'],
  ['Mon cœur bat.','Mon coeur bat.','accent','ligature'],['Le grand chien.','Le gran chien.','lettre muette','lettre muette oubliée'],
  ['Ils jouent.','Ils joue.','terminaison','terminaison du verbe'],['Il a faim.','Il à faim.','homophone','homophone'],['L’école est là.','Lécole est là.','apostrophe','apostrophe oubliée']];
 for(const [r,a,t,k] of K){const x=A(r,a);const e=x.errors[0]||{};T(`Écart « ${a} » : type ${t}, nature « ${k} »`,e.type===t&&e.kind===k&&x.score<100,`${e.type}/${e.kind} ${x.score}`);}
 {const x=A('Le chat dort.','Le chien dort.');T('Mot remplacé par un mot sans rapport : « mot incorrect » (une seule piste), barème inchangé (manquant + en trop)',x.errors.length===2&&x.errors.every(e=>e.kind==='mot incorrect')&&x.missing===1&&x.extra===1&&D.hints(x).length===1,kinds(x)+' '+x.score);}
 {const x=A('Nous mangeons des cerises.','Nous mangeons cerises.');T('Mot manquant avec sa position',x.errors[0].kind==='mot manquant'&&D.hints(x)[0].text==='Il manque un mot après le mot n° 2.',D.hints(x)[0].text);}
 {const x=A('Le chat dort.','Le gros chat dort.');T('Mot en trop avec sa position (n° dans la phrase de l’élève)',x.errors[0].kind==='mot en trop'&&/Mot n° 2 : ce mot est en trop/.test(D.hints(x)[0].text),D.hints(x)[0].text);}
 {const x=A('Où vas-tu ?','Où vas-tu');T('Ponctuation oubliée : piste sans la phrase',/point d’interrogation/.test(D.hints(x)[0].text),D.hints(x)[0].text);}
 {const x=A('Le chat dort.','le chat dort.');T('Majuscule manquante signalée',x.errors[0].kind==='majuscule manquante'&&/majuscule/.test(D.hints(x)[0].text));}
 // 3. Pistes sans la réponse
 {const x=A('La fête est finie.','La fete est finie.');const h=D.hints(x)[0];T('Piste « il manque un accent dans le 2e mot » : position et nature, jamais le mot attendu',h.text==='Mot n° 2 : il manque un accent.'&&!/fête/.test(h.text)&&h.reveal==='fete → fête',h.text+' | '+h.reveal);}
 {const x=A('Les petits chats jouent dehors.','Les petit chat joue dehor.');const hs=D.hints(x);const txt=hs.map(h=>h.text).join(' ');
  T('Pistes multiples ordonnées par position, sans aucun mot attendu',hs.length===x.errors.length&&hs.map(h=>h.apos).join()===hs.map(h=>h.apos).slice().sort((a,b)=>a-b).join()&&!/petits|chats|jouent|dehors/.test(txt),txt);}
 {const x=A('Les petits chats jouent dehors.','Les petit chat joue dehor.');const f=D.feedback(x,{progressive:true});
  T('Rétroaction progressive : résumé + pistes, la phrase correcte n’est pas dans les lignes mais fournie à part',f.progressive&&/points? à corriger/.test(f.lines[0])&&!f.lines.join(' ').includes(x.reference)&&f.correct===x.reference,f.lines.join(' / '));
  const html=D.feedbackHTML(x,{progressive:true});T('HTML progressif : correction repliée dans <details>, pas en clair avant',/<details class="dict-reveal">/.test(html)&&html.indexOf('<details')<html.indexOf('La phrase correcte'),html.slice(0,160));}
 {const x=A('Le chat dort.','<img src=x onerror=alert(1)> dort.');const h=D.feedbackHTML(x,{progressive:true})+D.feedbackHTML(x);T('Échappement HTML conservé (modes classique et progressif)',!/<img/i.test(h));}
 // 4. Accompagnement en étapes
 {const r='Les petits chats jouent.',a='Les petit chat joue.';const c0=D.coach(r,a,0);const n=c0.total;const last=D.coach(r,a,n);const mid=D.coach(r,a,1);
  T('Coach : étape 0 = résumé, étapes suivantes = pistes (révélation à la demande), dernière = phrase correcte',c0.step===0&&/3 points à corriger/.test(c0.text)&&n===4&&mid.text&&mid.reveal&&!/petits/.test(mid.text)&&last.done&&/La phrase correcte est : Les petits chats jouent\./.test(last.text),c0.text+' | '+mid.text+' | '+last.text);
  T('Coach : une phrase parfaite est terminée tout de suite',D.coach(r,r,0).done===true);}
 // 5. Barème et API existants inchangés
 T('Barème inchangé : un accent oublié reste une faute légère (≥ 90 % sur 5 mots)',A('La fête est très jolie.','La fete est très jolie.').score>=90);
 T('API existante conservée (analyze, best, outcome, feedback, feedbackHTML, diffHTML, typo, tokenize, classify, align, phon, levelOf)',['analyze','best','outcome','feedback','feedbackHTML','diffHTML','typo','tokenize','classify','align','phon','levelOf','LABEL','WEIGHTS','LEVELS'].every(k=>D[k]));
 T('Espaces invisibles : zéro largeur et trait d’union conditionnel ignorés',A('Le chat dort.','Le​ chat­ dort.').score===100);
 return R;}
if(require.main===module)require('./lib').main(run);
module.exports=run;
