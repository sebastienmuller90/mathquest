/* MathQuest — Moteur de l'école primaire (CP → CM2), année scolaire 2026-2027.
   Ce fichier ne contient aucun contenu de chapitre : il fournit
   - le référentiel des classes et des matières du primaire ;
   - des aides de génération d'exercices (choix sans doublon, nombres, textes, ordre) ;
   - des générateurs réutilisables (banques de questions, associations, classements, suites) ;
   - des outils de français (conjugaison, nombres en lettres) et des visuels SVG ;
   - la mise en forme des chapitres pour le moteur commun de MathQuest (index.html) ;
   - les messages du prof particulier adaptés à l'âge.
   Les chapitres sont déclarés dans data/primary/<classe>.js via MQPrimary.add(). */
(function(){
'use strict';
const GRADES=['CP','CE1','CE2','CM1','CM2'];
const COLLEGE=['6e','5e','4e','3e'];
const GKEY={CP:'cp',CE1:'ce1',CE2:'ce2',CM1:'cm1',CM2:'cm2'};
const STAGES={
  primaire:{id:'primaire',label:'École primaire',emoji:'🎒',grades:GRADES},
  college:{id:'college',label:'Collège',emoji:'🎓',grades:COLLEGE}
};
const stageOf=g=>GRADES.includes(g)?'primaire':'college';
// Accepte aussi les écritures en minuscules (cp, ce1…) pour la robustesse des imports.
function normGrade(g){if(g==null)return null;const s=String(g).trim();const u=s.toUpperCase();if(GRADES.includes(u))return u;const l=s.toLowerCase();if(COLLEGE.includes(l))return l;return null;}

/* Matières du primaire. `short` sert à construire les identifiants de mondes et de chapitres.
   `pair` relie la matière à son équivalent collège pour le passage CM2 → 6e. */
const SUBJ={
  'p-francais':{name:'Français',emoji:'✒️',img:'data/images/icons/icon-francais.png',short:'fr',col:'#be185d',pair:'francais'},
  'p-maths':{name:'Maths',emoji:'🧮',img:'data/images/icons/icon-maths.png',short:'ma',col:'#0ea5e9',pair:'maths'},
  'p-anglais':{name:'Anglais',emoji:'🇬🇧',img:'data/images/icons/icon-anglais.png',short:'en',col:'#dc2626',pair:'anglais',lang:'en'},
  'p-sciences':{name:'Sciences et technologie',emoji:'🔬',img:'data/images/icons/icon-sciences-tech.png',short:'sc',col:'#16a34a',pair:'svt'},
  'p-qlm':{name:'Questionner le monde',emoji:'🔎',img:'data/images/icons/icon-questionner-monde.png',short:'qm',col:'#0d9488',pair:'svt'},
  'p-hg':{name:'Histoire-géographie',emoji:'🌍',img:'data/images/icons/icon-hg.png',short:'hg',col:'#b45309',pair:'hg'},
  'p-emc':{name:'EMC',emoji:'⚖️',img:'data/images/icons/icon-emc.png',short:'emc',col:'#0f766e',pair:'emc'},
  'p-arts':{name:'Arts plastiques',emoji:'🎨',img:'data/images/icons/icon-arts.png',short:'ap',col:'#db2777',pair:'arts'},
  'p-musique':{name:'Éducation musicale',emoji:'🎵',img:'data/images/icons/icon-musique.png',short:'mu',col:'#7c3aed',pair:'musique'},
  'p-eps':{name:'EPS',emoji:'🏃',img:'data/images/icons/icon-eps.png',short:'eps',col:'#ea580c',pair:'eps'},
  'p-evar':{name:'Vivre ensemble et grandir (EVAR)',emoji:'💛',img:'data/images/icons/icon-evar-primaire.png',short:'evar',col:'#ca8a04',pair:'evars'}
};
const SUBJ_ORDER=['p-francais','p-maths','p-anglais','p-sciences','p-qlm','p-hg','p-emc','p-arts','p-musique','p-eps','p-evar'];

/* ===== Aides génériques ===== */
const R=(a,b)=>Math.floor(Math.random()*(b-a+1))+a;
const P=a=>a[Math.floor(Math.random()*a.length)];
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
const pickN=(a,n)=>shuffle(a).slice(0,n);
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const plain=h=>String(h==null?'':h).replace(/<[^>]*>/g,'').replace(/&nbsp;| | /g,' ').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&#39;/g,"'").replace(/&quot;/g,'"').replace(/\s+/g,' ').trim().toLowerCase();
const nf=n=>{const s=String(Math.abs(n));const parts=s.split('.');parts[0]=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g,' ');return (n<0?'−':'')+parts.join(',');};
const dec=(x,k=2)=>{const v=Math.round(x*10**k)/10**k;return nf(v);};
const gcd=(a,b)=>{a=Math.abs(a);b=Math.abs(b);while(b)[a,b]=[b,a%b];return a;};

/* Constructeurs de questions compatibles avec la correction de MathQuest (index.html : check/answerText). */
function ch(q,good,bad,o={}){
  // Clé sensible à la casse et à la ponctuation : « le chat dort » et « Le chat dort. » sont deux réponses différentes.
  const key=x=>String(x==null?'':x).replace(/<[^>]*>/g,'').replace(/&nbsp;|\u00a0|\u202f/g,' ').replace(/\s+/g,' ').trim();const gk=key(good);const seen=new Set([gk]);const uniq=[];
  for(const b of (bad||[])){const k=key(b);if(!k||seen.has(k))continue;seen.add(k);uniq.push(b);}
  const nb=o.n||3;const c=shuffle([good,...uniq.slice(0,nb)]);
  if(c.length<2)throw new Error('Question à choix sans distracteur : '+plain(q));
  const r={type:'choice',q,choices:c,ans:c.indexOf(good),...o};delete r.n;return r;
}
const num=(q,ans,o={})=>({type:'num',q,ans:Math.round(ans*1e6)/1e6,...o});
const txt=(q,acc,o={})=>({type:'text',q,acc:Array.isArray(acc)?acc:[acc],...o});
const frac=(q,n,d,o={})=>({type:'frac',q,ans:[n,d],...o});
// Remettre dans l'ordre : `tokens` dans le bon ordre ; les jetons identiques sont interdits (réponse ambiguë).
function order(q,tokens,o={}){
  const low=tokens.map(t=>String(t).toLowerCase());if(new Set(low).size!==low.length)throw new Error('Jetons en double : '+tokens.join('|'));
  let sh=shuffle(tokens),k=0;while(sh.join('\u0001')===tokens.join('\u0001')&&tokens.length>1&&k++<30)sh=shuffle(tokens);
  return {type:'order',q,tokens:sh,ans:tokens.join(' '),...o};
}
const tf=(statement,v,expl,o={})=>ch(`Vrai ou faux ? <b>${statement}</b>`,v?'Vrai':'Faux',[v?'Faux':'Vrai'],{expl,...o});

/* ===== Générateurs réutilisables ===== */
// Choisit un élément de difficulté adaptée : on privilégie la difficulté demandée, sinon la plus proche en dessous.
function byLevel(items,d){
  const lv=x=>x&&typeof x==='object'&&!Array.isArray(x)&&x.d?x.d:(Array.isArray(x)&&typeof x[4]==='number'?x[4]:1);
  const ok=items.filter(x=>lv(x)<=d);const exact=ok.filter(x=>lv(x)===d);
  if(exact.length&&Math.random()<.6)return P(exact);return P(ok.length?ok:items);
}
/* Banque de questions. Formats acceptés :
   ['Question ?','bonne réponse',['distracteur',...],'explication',difficulté]
   {tf:'Affirmation',v:true,e:'explication'}           → vrai/faux
   {n:'Question ?',a:12,u:'cm',e:'…'}                  → réponse numérique
   {t:'Question ?',a:['réponse',...],e:'…'}             → réponse écrite (orthographe exacte, sans tenir compte des majuscules)
   {o:['premier','deuxième',...],q:'Range…',e:'…'}      → remettre dans l'ordre
   {f:d=>question}                                      → question calculée */
function fromItem(it,d,o={}){
  if(typeof it==='function')return it(d);
  if(Array.isArray(it)){const [q,a,bad,e]=it;return ch(q,a,bad,{expl:e||`La bonne réponse est : ${a}.`,hint:o.hint,...(o.audio?{audio:o.audio}:{})});}
  if(it.f)return it.f(d);
  if('tf' in it)return tf(it.tf,it.v,it.e||'',{hint:it.h||o.hint});
  if('n' in it)return num(it.n,it.a,{unit:it.u||'',expl:it.e||'',hint:it.h||o.hint||'Relis bien la question.'});
  if('t' in it)return txt(it.t,it.a,{strict:true,lang:'fr',expl:it.e||'',hint:it.h||o.hint||'Fais attention à l’orthographe.',chips:it.chips||['é','è','ê','à','ç']});
  if('o' in it)return order(it.q||'Remets dans l’ordre :',it.o,{expl:it.e||it.o.join(' → '),hint:it.h||'Commence par le premier élément.'});
  throw new Error('Format de question inconnu');
}
const bank=(items,o={})=>d=>fromItem(byLevel(items,d),d,o);
/* Élisions et contractions après insertion d'un terme dans un modèle de question :
   « de le cube » → « du cube », « à les élèves » → « aux élèves », « que une » → « qu’une », « de arêtes » → « d’arêtes ». */
const V='aeiouyéèêëàâîïôûœæ';
function fr(t){return String(t)
  .replace(/(^|[\s'’(«>])de le (?=[^\s])/g,(m,a)=>a+'du ').replace(/(^|[\s'’(«>])de les /g,(m,a)=>a+'des ')
  .replace(/(^|[\s'’(«>])à le (?=[^\s])/g,(m,a)=>a+'au ').replace(/(^|[\s'’(«>])à les /g,(m,a)=>a+'aux ')
  .replace(/(^|[\s'’(«>])(qu|lorsqu|puisqu|jusqu)e (une?|il|ils|elle|elles|on)\b/gi,(m,a,b,c)=>a+b+'’'+c)
  .replace(new RegExp(`(^|[\\s(«>])(de|ne|je|me|te|se|que) (?=[${V}](?!h))`,'gi'),(m,a,b)=>a+b.slice(0,-1)+'’')
  .replace(/(^|[\s'’(«>])du (?=[aeiouyéèêàâîïôûœ])/g,(m,a)=>a+'de l’').replace(/(^|[\s'’(«>])au (?=[aeiouyéèêàâîïôûœ])/g,(m,a)=>a+'à l’');}
/* Associations : pairs=[[terme,définition],…] — questions dans les deux sens. */
function pairs(list,o={}){
  const qa=o.q||'Que veut dire « %s » ?',qb=o.rq||'Quel mot correspond à : « %s » ?';
  return d=>{
    const [a,b]=P(list);const others=list.filter(x=>x[0]!==a&&x[1]!==b);
    const rev=o.oneWay?false:Math.random()<(o.rev??.5);
    if(!rev)return ch(fr(qa.replace('%s',a)),b,pickN(others.map(x=>x[1]),3),{expl:fr(o.e?o.e(a,b):`« ${a} » : ${b}.`),hint:o.hint});
    return ch(fr(qb.replace('%s',b)),a,pickN(others.map(x=>x[0]),3),{expl:fr(o.e?o.e(a,b):`« ${b} » : c’est ${a}.`),hint:o.hint});
  };
}
/* Classement : cats={'Catégorie':['élément',…]} — l'élève range un élément dans sa catégorie. */
function sort(cats,o={}){
  const names=Object.keys(cats);
  return d=>{const c=P(names),x=P(cats[c]);
    const q=fr((o.q||'Dans quelle catégorie ranges-tu « %s » ?').replace('%s',x));
    return ch(q,c,names.filter(n=>n!==c),{n:Math.min(3,names.length-1),expl:o.e?o.e(x,c):`« ${x} » appartient à la catégorie : ${c}.`,hint:o.hint});};
}
/* Suite ordonnée (jours, étapes, chronologie…) */
function seq(items,o={}){
  return d=>{const r=Math.random();const label=o.label||'élément';
    if(d>=2&&r<.35&&items.length>=3){const n=Math.min(items.length,d===2?3:4),start=R(0,items.length-n);const part=items.slice(start,start+n);return order(o.oq||'Remets dans le bon ordre :',part,{expl:part.join(' → '),hint:o.hint||'Pense à ce qui vient en premier.'});}
    const i=R(0,items.length-2),next=items[i+1];
    if(r<.7)return ch(fr((o.nq||'Qu’est-ce qui vient juste après « %s » ?').replace('%s',items[i])),next,pickN(items.filter(x=>x!==next&&x!==items[i]),3),{expl:`Dans l’ordre : ${items[i]} → ${next}.`,hint:o.hint});
    const prev=items[i];return ch(fr((o.pq||'Qu’est-ce qui vient juste avant « %s » ?').replace('%s',next)),prev,pickN(items.filter(x=>x!==prev&&x!==next),3),{expl:`Dans l’ordre : ${prev} → ${next}.`,hint:o.hint});};
}
// Mélange de plusieurs générateurs (avec poids optionnel : [gen, poids]).
function mix(...gens){const list=gens.map(g=>Array.isArray(g)?g:[g,1]);const tot=list.reduce((s,x)=>s+x[1],0);
  return d=>{let r=Math.random()*tot;for(const [g,w] of list){if((r-=w)<=0)return g(d);}return list[0][0](d);};}

/* ===== Nombres en lettres (orthographe rectifiée de 1990 : traits d'union partout) ===== */
const U=['zéro','un','deux','trois','quatre','cinq','six','sept','huit','neuf','dix','onze','douze','treize','quatorze','quinze','seize','dix-sept','dix-huit','dix-neuf'];
const T={2:'vingt',3:'trente',4:'quarante',5:'cinquante',6:'soixante'};
function lt100(n){if(n<20)return U[n];const d=Math.floor(n/10),u=n%10;
  if(d===7)return n===71?'soixante-et-onze':'soixante-'+U[10+u];
  if(d===8)return u===0?'quatre-vingts':'quatre-vingt-'+U[u];
  if(d===9)return 'quatre-vingt-'+U[10+u];
  return T[d]+(u===0?'':u===1?'-et-un':'-'+U[u]);}
function lt1000(n){const c=Math.floor(n/100),r=n%100;let s='';if(c){s=c===1?'cent':U[c]+'-cent'+(r===0&&c>1?'s':'');}if(r){const w=lt100(r);s=s?s+'-'+w:w;}return s||'zéro';}
function enLettres(n){if(n===0)return 'zéro';let s='';const m=Math.floor(n/1e6),k=Math.floor(n%1e6/1000),r=n%1000;
  if(m)s+=(m===1?'un-million':lt1000(m)+'-millions');
  if(k){let w=k===1?'mille':lt1000(k).replace(/cents$/,'cent')+'-mille';s=s?s+'-'+w:w;}
  if(r){const w=lt1000(r);s=s?s+'-'+w:w;}return s;}
// Variante traditionnelle (avant 1990) acceptée en saisie : traits d'union seulement sous cent, « et » sans trait.
function enLettresTrad(n){return enLettres(n).replace(/-et-/g,' et ').replace(/-(cent|cents|mille|million|millions)\b/g,' $1').replace(/\b(cent|cents|mille|million|millions)-/g,'$1 ');}

/* ===== Conjugaison ===== */
const PRON=['je','tu','il','nous','vous','ils'];
const VOW=/^[aeiouyéèêàâîïôûh]/i;
const subj=(i,form,label)=>{const p=label||PRON[i];return p==='je'&&VOW.test(form)?'j’'+form:p+' '+form;};
// Verbes irréguliers (présent, imparfait, futur, passé simple), participe passé et auxiliaire.
const IRR={
 'être':{pr:['suis','es','est','sommes','êtes','sont'],imp:'ét',fut:'ser',ps:['fus','fus','fut','fûmes','fûtes','furent'],pp:'été',aux:'avoir'},
 'avoir':{pr:['ai','as','a','avons','avez','ont'],imp:'av',fut:'aur',ps:['eus','eus','eut','eûmes','eûtes','eurent'],pp:'eu',aux:'avoir'},
 'aller':{pr:['vais','vas','va','allons','allez','vont'],imp:'all',fut:'ir',ps:['allai','allas','alla','allâmes','allâtes','allèrent'],pp:'allé',aux:'être'},
 'faire':{pr:['fais','fais','fait','faisons','faites','font'],imp:'fais',fut:'fer',ps:['fis','fis','fit','fîmes','fîtes','firent'],pp:'fait',aux:'avoir'},
 'dire':{pr:['dis','dis','dit','disons','dites','disent'],imp:'dis',fut:'dir',ps:['dis','dis','dit','dîmes','dîtes','dirent'],pp:'dit',aux:'avoir'},
 'venir':{pr:['viens','viens','vient','venons','venez','viennent'],imp:'ven',fut:'viendr',ps:['vins','vins','vint','vînmes','vîntes','vinrent'],pp:'venu',aux:'être'},
 'pouvoir':{pr:['peux','peux','peut','pouvons','pouvez','peuvent'],imp:'pouv',fut:'pourr',ps:['pus','pus','put','pûmes','pûtes','purent'],pp:'pu',aux:'avoir'},
 'voir':{pr:['vois','vois','voit','voyons','voyez','voient'],imp:'voy',fut:'verr',ps:['vis','vis','vit','vîmes','vîtes','virent'],pp:'vu',aux:'avoir'},
 'vouloir':{pr:['veux','veux','veut','voulons','voulez','veulent'],imp:'voul',fut:'voudr',ps:['voulus','voulus','voulut','voulûmes','voulûtes','voulurent'],pp:'voulu',aux:'avoir'},
 'prendre':{pr:['prends','prends','prend','prenons','prenez','prennent'],imp:'pren',fut:'prendr',ps:['pris','pris','prit','prîmes','prîtes','prirent'],pp:'pris',aux:'avoir'}
};
// Verbes du 1er groupe sans particularité orthographique (pas de -ger, -cer, -eler, -eter, -yer, e/é avant-dernière syllabe).
const ER=['parler','chanter','jouer','danser','marcher','regarder','aimer','écouter','sauter','porter','donner','trouver','dessiner','habiter','travailler','raconter','fermer','préparer','arriver','tomber','rentrer','rester','entrer','monter','demander','apporter','cuisiner','grimper','nager','bavarder'];
const ER_ETRE=['arriver','tomber','rentrer','rester','entrer','monter'];
const IR2=['finir','grandir','choisir','réussir','remplir','obéir','rougir','bâtir'];
function group(v){if(IRR[v])return 3;if(IR2.includes(v))return 2;return 1;}
function present(v){if(IRR[v])return IRR[v].pr.slice();if(IR2.includes(v)){const r=v.slice(0,-2);return [r+'is',r+'is',r+'it',r+'issons',r+'issez',r+'issent'];}
  let r=v.slice(0,-2);if(v==='nager'){return ['nage','nages','nage','nageons','nagez','nagent'];}return [r+'e',r+'es',r+'e',r+'ons',r+'ez',r+'ent'];}
function imparfait(v){let r;if(IRR[v])r=IRR[v].imp;else if(IR2.includes(v))r=v.slice(0,-2)+'iss';else if(v==='nager')r='nage';else r=v.slice(0,-2);
  const e=['ais','ais','ait','ions','iez','aient'];return e.map((x,i)=>(v==='nager'&&(i===3||i===4))?'nag'+x:r+x);}
function futur(v){const r=IRR[v]?IRR[v].fut:(v.endsWith('re')?v.slice(0,-1):v);return ['ai','as','a','ons','ez','ont'].map(x=>r+x);}
function passeSimple(v){if(IRR[v])return IRR[v].ps.slice();if(IR2.includes(v)){const r=v.slice(0,-2);return [r+'is',r+'is',r+'it',r+'îmes',r+'îtes',r+'irent'];}
  const r=v.slice(0,-2);if(v==='nager')return ['nageai','nageas','nagea','nageâmes','nageâtes','nagèrent'];return [r+'ai',r+'as',r+'a',r+'âmes',r+'âtes',r+'èrent'];}
function participe(v){if(IRR[v])return IRR[v].pp;if(IR2.includes(v))return v.slice(0,-1);return v.slice(0,-2)+'é';}
function auxOf(v){if(IRR[v])return IRR[v].aux;return ER_ETRE.includes(v)?'être':'avoir';}
// Temps composés : g = 'm'|'f' (genre du sujet) pour l'accord avec être.
function compose(v,t,i,g='m'){const aux=auxOf(v),pp=participe(v);const A=t==='pc'?(aux==='être'?IRR['être'].pr:IRR['avoir'].pr):(aux==='être'?imparfait('être'):imparfait('avoir'));
  let p=pp;if(aux==='être'){if(g==='f')p+='e';if(i>=3)p+='s';}return A[i]+' '+p;}
const TENSES={pr:'présent',imp:'imparfait',fut:'futur',pc:'passé composé',ps:'passé simple',pqp:'plus-que-parfait'};
// « au présent » mais « à l’imparfait »
const auT=(t,b=true)=>{const n=TENSES[t]||t;return (/^[aeiouéèêh]/i.test(n)?'à l’':'au ')+(b?'<b>'+n+'</b>':n);};
function conj(v,t,i,g){if(t==='pr')return present(v)[i];if(t==='imp')return imparfait(v)[i];if(t==='fut')return futur(v)[i];if(t==='ps')return passeSimple(v)[i];return compose(v,t,i,g);}
// Sujets explicites (genre connu) pour éviter toute ambiguïté d'accord.
const SUBJECTS3=[[2,'il','m'],[2,'elle','f'],[5,'ils','m'],[5,'elles','f'],[2,'Léa','f'],[2,'Tom','m'],[5,'Les enfants','m'],[5,'Mes sœurs','f']];
/* Générateur de conjugaison.
   verbs : liste d'infinitifs ; tenses : codes de temps ; o.text : proportion de réponses à écrire. */
function conjGen(verbs,tenses,o={}){
  return d=>{const v=P(verbs),t=P(tenses);const useComp=t==='pc'||t==='pqp';
    let i,label,g='m';
    if(useComp&&auxOf(v)==='être'||Math.random()<.35){const s=P(SUBJECTS3);i=s[0];label=s[1];g=s[2];}else{i=R(0,5);label=PRON[i];}
    const good=conj(v,t,i,g);const name=TENSES[t];
    const pron=label==='je'&&VOW.test(good)?'j’':label+' ';
    const write=d>=(o.textFrom||3)&&Math.random()<(o.text??.5);
    const expl=`${v} ${auT(t,false)} : ${pron}<b>${good}</b>.`+(o.rule?` ${o.rule(v,t,i)}`:'')+(useComp?` (auxiliaire ${auxOf(v)} + participe passé « ${participe(v)} »)`:'');
    if(write){const acc=[good];if(useComp&&auxOf(v)==='être'&&(label==='je'||label==='tu'||label==='nous'||label==='vous')){acc.push(compose(v,t,i,'f'));}
      return txt(`Conjugue <b>${v}</b> ${auT(t)} :<br>${pron}<span class="gap">…</span>`,acc,{strict:true,lang:'fr',expl,hint:`Le verbe est ${auT(t,false)}. Pense à la terminaison avec « ${label} ».`,chips:['é','è','ê','â','î','û','ç']});}
    const bad=new Set();const all=[0,1,2,3,4,5].map(k=>conj(v,t,k,g));all.forEach(x=>{if(x!==good)bad.add(x);});
    if(!o.sameTense){if(t!=='pr')bad.add(present(v)[i]);if(t!=='imp')bad.add(imparfait(v)[i]);if(t!=='fut')bad.add(futur(v)[i]);}
    const bads=[...bad].filter(x=>x!==good);
    return ch(`Complète avec <b>${v}</b> ${auT(t)} :<br>${pron}<span class="gap">…</span>`,good,pickN(bads,3),{expl,hint:`Repère qui fait l’action (${label}) et le temps (${name}).`});};
}

/* ===== Visuels SVG (décoratifs : le texte de la question reste suffisant) ===== */
const SVG={
  // Dizaines (barres) et unités (cubes)
  blocks(t,u,h=0){let x=8,out='';for(let i=0;i<h;i++){out+=`<rect x="${x}" y="6" width="44" height="44" rx="3" class="blk h"/>`;x+=50;}
    for(let i=0;i<t;i++){out+=`<rect x="${x}" y="6" width="11" height="100" rx="2" class="blk t"/>`;x+=16;}
    x+=6;for(let i=0;i<u;i++){const r=Math.floor(i/5),c=i%5;out+=`<rect x="${x+c*14}" y="${94-r*14}" width="11" height="11" rx="2" class="blk u"/>`;}
    const w=Math.max(120,x+80);return `<svg class="fig pfig" viewBox="0 0 ${w} 112" role="img" aria-label="${h?h+' centaines, ':''}${t} dizaines et ${u} unités">${out}</svg>`;},
  dots(n,emoji){return `<div class="pdots" role="img" aria-label="${n} objets">${Array.from({length:n},()=>`<span>${emoji||'●'}</span>`).join('')}</div>`;},
  clock(h,m){const ha=((h%12)+m/60)*30*Math.PI/180,ma=m*6*Math.PI/180;const hx=60+28*Math.sin(ha),hy=60-28*Math.cos(ha),mx=60+40*Math.sin(ma),my=60-40*Math.cos(ma);
    let ticks='';for(let i=1;i<=12;i++){const a=i*30*Math.PI/180;ticks+=`<text x="${(60+44*Math.sin(a)).toFixed(1)}" y="${(64-44*Math.cos(a)).toFixed(1)}" text-anchor="middle" class="ck">${i}</text>`;}
    return `<svg class="fig pfig clock" viewBox="0 0 120 120" role="img" aria-label="Horloge"><circle cx="60" cy="60" r="56" class="sh"/>${ticks}<line x1="60" y1="60" x2="${hx.toFixed(1)}" y2="${hy.toFixed(1)}" class="hand h"/><line x1="60" y1="60" x2="${mx.toFixed(1)}" y2="${my.toFixed(1)}" class="hand m"/><circle cx="60" cy="60" r="3.5" class="dot"/></svg>`;},
  bar(n,d){let s='';const w=240/d;for(let i=0;i<d;i++)s+=`<rect x="${10+i*w}" y="10" width="${w}" height="34" class="${i<n?'fon':'foff'}"/>`;return `<svg class="fig pfig" viewBox="0 0 260 54" role="img" aria-label="${n} parts coloriées sur ${d}">${s}</svg>`;},
  pie(n,d){if(d===1)return `<svg class="fig pfig" viewBox="0 0 120 120"><circle cx="60" cy="60" r="50" class="${n?'fon':'foff'}"/></svg>`;let s='';for(let i=0;i<d;i++){const a0=i/d*2*Math.PI-Math.PI/2,a1=(i+1)/d*2*Math.PI-Math.PI/2;const x0=60+50*Math.cos(a0),y0=60+50*Math.sin(a0),x1=60+50*Math.cos(a1),y1=60+50*Math.sin(a1);s+=`<path d="M60 60 L${x0.toFixed(1)} ${y0.toFixed(1)} A50 50 0 ${1/d>.5?1:0} 1 ${x1.toFixed(1)} ${y1.toFixed(1)} Z" class="${i<n?'fon':'foff'}"/>`;}return `<svg class="fig pfig" viewBox="0 0 120 120" role="img" aria-label="${n} parts coloriées sur ${d}">${s}</svg>`;},
  line(min,max,step,mark,labels){const n=Math.round((max-min)/step);const W=280,x=i=>14+i*(W-28)/n;let s=`<line x1="10" y1="40" x2="${W-6}" y2="40" class="ray"/>`;
    for(let i=0;i<=n;i++){const v=Math.round((min+i*step)*1e6)/1e6;s+=`<line x1="${x(i)}" y1="33" x2="${x(i)}" y2="47" class="ln"/>`;if(labels==='all'||(Array.isArray(labels)&&labels.some(l=>Math.abs(l-v)<1e-9)))s+=`<text x="${x(i)}" y="66" text-anchor="middle" class="ck">${nf(v)}</text>`;}
    if(mark!=null){const i=Math.round((mark-min)/step);s+=`<path d="M${x(i)} 30 l-7 -12 h14 Z" class="mark"/>`;}
    return `<svg class="fig pfig" viewBox="0 0 ${W} 74" role="img" aria-label="Droite graduée">${s}</svg>`;},
  shape(k){const m={carré:'<rect x="30" y="20" width="80" height="80" class="sh"/>',rectangle:'<rect x="15" y="30" width="110" height="60" class="sh"/>',triangle:'<path d="M70 15 L125 105 L15 105 Z" class="sh"/>',cercle:'<circle cx="70" cy="60" r="45" class="sh"/>',losange:'<path d="M70 10 L120 60 L70 110 L20 60 Z" class="sh"/>',hexagone:'<path d="M45 15 L95 15 L120 60 L95 105 L45 105 L20 60 Z" class="sh"/>','triangle rectangle':'<path d="M25 105 L120 105 L25 25 Z" class="sh"/><path d="M25 92 L38 92 L38 105" class="ln"/>'};return `<svg class="fig pfig" viewBox="0 0 140 120" role="img" aria-label="Figure">${m[k]||''}</svg>`;},
  thermo(t){const y=110-t*1.6;return `<svg class="fig pfig" viewBox="0 0 90 130" role="img" aria-label="Thermomètre à ${t} degrés"><rect x="38" y="8" width="14" height="106" rx="7" class="sh"/><circle cx="45" cy="116" r="11" class="therm"/><rect x="41" y="${y.toFixed(1)}" width="8" height="${(114-y).toFixed(1)}" class="therm"/>${[0,10,20,30,40,50,60].map(v=>`<line x1="54" y1="${110-v*1.6}" x2="62" y2="${110-v*1.6}" class="ln"/><text x="66" y="${114-v*1.6}" class="ck">${v}</text>`).join('')}</svg>`;},
  money(list){return `<div class="pmoney" role="img" aria-label="Pièces et billets">${list.map(v=>v>=5?`<span class="bill">${v} €</span>`:v>=1?`<span class="coin c${v}">${v} €</span>`:`<span class="coin cc">${Math.round(v*100)} c</span>`).join('')}</div>`;}
};

/* ===== Registre et mise en forme ===== */
const REG={grades:{},chapters:[],byId:{}};
const H={fr,R,P,shuffle,pickN,esc,nf,dec,gcd,ch,num,txt,frac,order,tf,bank,pairs,sort,seq,mix,fromItem,enLettres,enLettresTrad,conj,conjGen,present,imparfait,futur,passeSimple,participe,auxOf,compose,IRR,ER,ER_ETRE,IR2,PRON,TENSES,SVG,subj,auT};
const listHTML=a=>`<ul class="lst">${(a||[]).map(x=>`<li>${x}</li>`).join('')}</ul>`;
/* Déclare les chapitres d'une classe.
   data = { 'p-maths': [chapitre, …], … }
   chapitre = { id, name, icon, domain, c:{d,u,ex,m,a,r}, g:(d)=>question, tip } */
function add(grade,data){
  if(!GRADES.includes(grade))throw new Error('Classe inconnue : '+grade);
  const G=REG.grades[grade]||(REG.grades[grade]={});
  for(const [sid,list] of Object.entries(data)){
    if(!SUBJ[sid])throw new Error('Matière inconnue : '+sid);
    const arr=G[sid]||(G[sid]=[]);
    for(const c of list){
      if(REG.byId[c.id])throw new Error('Identifiant de chapitre en double : '+c.id);
      const full={...c,grade,subject:sid};REG.byId[c.id]=full;arr.push(full);REG.chapters.push(full);
    }
  }
}
/* Enrichissement d'un chapitre existant (fichiers data/primary/enrich-*.js, V8.13) :
   o.items : banque de questions supplémentaires (même format que bank) mêlée au générateur d'origine (proportion o.w, défaut 0,45) ;
   o.parts : parties de cours ajoutées (ex. « Activité hors écran ») ; o.r / o.a / o.m : « je retiens », erreurs fréquentes, méthode ajoutés. */
function enrich(id,o){const c=REG.byId[id];if(!c)throw new Error('Enrichissement : chapitre inconnu '+id);
  if(o.items&&o.items.length){const g0=c.g,gb=bank(o.items),w=o.w??.45;c.g=d=>Math.random()<w?gb(d):g0(d);}
  const C=c.c||(c.c={});if(o.parts)C.u=(C.u||[]).concat(o.parts);if(o.r)C.r=(C.r||[]).concat(o.r);if(o.a)C.a=(C.a||[]).concat(o.a);if(o.m)C.m=(C.m||[]).concat(o.m);
  c.enriched=true;return c;}
function worldId(grade,sid){return GKEY[grade]+'-'+SUBJ[sid].short;}
function worldName(grade,sid){return SUBJ[sid].name+' '+grade;}
/* Construit le cours au format du moteur commun (COURS[id]). */
function course(c){const C=c.c||{};const u=(C.u||[]).map((x,i)=>typeof x==='string'?{t:i===0?'Je comprends':'Je comprends (suite)',h:x}:x);
  const ex=(C.ex||[]).map(e=>({q:e.q,s:e.s}));
  return {primary:true,grade:c.grade,subject:c.subject,domain:c.domain||'',official:true,
    hook:C.d||'',discover:C.d||'',parts:u,ex:ex[0]||{q:'Exemple',s:['Observe bien.']},examples:ex,
    method:C.m||[],traps:C.a||[],piege:(C.a||[]).map(x=>`<p>${x}</p>`).join(''),retenir:C.r||[],objectives:C.obj||C.r||[],
    tip:c.tip||'',audio:!!c.audio};}
function chapter(c){const C=c.c||{};return {id:c.id,name:c.name,icon:c.icon||'📘',domain:c.domain||'',official:true,primary:true,grade:c.grade,subject:c.subject,
  f:{t:c.name,l:(C.r||[]).slice(0,4),ex:(C.ex&&C.ex[0]&&C.ex[0].q)||''},g:c.g};}
function build(){const subjects=[],worlds={},cours={},chapters={};
  for(const sid of SUBJ_ORDER){const S=SUBJ[sid];const w=[];
    for(const g of GRADES){const list=REG.grades[g]&&REG.grades[g][sid];if(!list||!list.length)continue;
      const wid=worldId(g,sid);w.push({id:wid,lvl:g,name:worldName(g,sid),emoji:S.emoji,col:S.col,stage:'primaire'});
      chapters[wid]=list.map(chapter);list.forEach(c=>{cours[c.id]=course(c);});}
    if(w.length)subjects.push({id:sid,name:S.name,emoji:S.emoji,img:S.img,worlds:w,stage:'primaire',lang:S.lang||null,pair:S.pair||null});}
  return {subjects,chapters,cours};}
function subjectsForGrade(g){return SUBJ_ORDER.filter(sid=>REG.grades[g]&&REG.grades[g][sid]&&REG.grades[g][sid].length);}

/* ===== Prof particulier adapté à l'âge ===== */
const young=g=>g==='CP'||g==='CE1';
function coach(ctx,ok){
  const g=ctx.grade,m=ctx.mastery||0,tip=ctx.tip,meth=(ctx.method&&ctx.method[0])||'';
  if(young(g)){
    if(ok)return m>=85?'Bravo ! Tu sais très bien faire. ⭐':m>=50?'Bravo ! Tu progresses. 👍':'Bien joué ! On continue doucement. 🙂';
    return 'Ce n’est pas grave, on apprend en se trompant. Regarde la correction'+(tip?' : '+tip:'.')+' La prochaine question sera un peu plus facile.';
  }
  if(g==='CE2'){
    if(ok)return m>=85?'Très bien ! Essaie maintenant d’expliquer comment tu as fait.':'Bonne réponse ! Refais la même méthode à la prochaine question.';
    return 'Compare ta réponse avec la correction pour trouver l’étape qui a coincé.'+(tip?' Astuce : '+tip:'')+(ctx.mistakes>2?' Tu as déjà fait quelques erreurs ici : relis la partie « Je retiens » du cours.':'');
  }
  if(ok)return m>=85?'Excellent. Tu maîtrises : vérifie que tu sais justifier chaque étape.':m>=60?'Bonne réponse. Garde la même méthode et vérifie ton résultat.':'Bonne réponse. Continue à appliquer la méthode pas à pas pour la fixer.';
  return 'Analyse la correction et repère l’étape exacte de l’erreur.'+(meth?' Méthode : '+meth:'')+(tip?' Astuce : '+tip:'')+(ctx.due?' Ce chapitre est d’ailleurs à réviser aujourd’hui.':'');
}
function tutorIntro(ctx){const g=ctx.grade,n=ctx.name||'';
  if(young(g))return `Bonjour ${n} ! Aujourd’hui, on découvre : <b>${ctx.chapter}</b>. On va doucement, une chose à la fois.`;
  if(g==='CE2')return `Bonjour ${n} ! Dans ce cours de ${ctx.subject.toLowerCase()}, tu vas apprendre : <b>${ctx.chapter}</b>. Lis chaque étape, puis entraîne-toi.`;
  return `Bonjour ${n} ! Objectif du jour en ${ctx.subject.toLowerCase()} : <b>${ctx.chapter}</b>. Comprends d’abord, applique la méthode, puis vérifie avec le quiz.`;}

/* ===== Référentiel officiel 2026-2027 du primaire (vérifié le 06/10/2026) ===== */
const BO={
  FRMA_C2_2024:{label:'BO n°41 du 31 octobre 2024',title:'Français et mathématiques du cycle 2 (applicables en CP, CE1, CE2 depuis 2025-2026)',url:'https://www.education.gouv.fr/bo/2024/Hebdo41/MENE2415135A'},
  FRMA_C3_2025:{label:'BO n°16 du 17 avril 2025',title:'Français et mathématiques du cycle 3 (CM1 depuis 2025-2026, CM2 à la rentrée 2026)',url:'https://www.education.gouv.fr/bo/2025/Hebdo16/MENE2504620A'},
  SCI_2026:{label:'BO n°24 du 11 juin 2026',title:'Sciences et technologie cycles 2 et 3 (CP et CM1 à la rentrée 2026)',url:'https://www.education.gouv.fr/sites/default/files/document/bulletin-officiel-ndeg-24-du-11-juin-2026-519026.pdf'},
  HGEPS_2026:{label:'BO n°22 du 28 mai 2026',title:'Histoire-géographie et EPS cycles 2 et 3 (CP et CM1 à la rentrée 2026)',url:'https://www.education.gouv.fr/bo/2026/Hebdo22/MENE2608631A'},
  LV_2026:{label:'BO n°12 du 19 mars 2026',title:'Langues vivantes étrangères et régionales à l’école élémentaire (CP et CM1 à la rentrée 2026)',url:'https://www.education.gouv.fr/bo/2026/Hebdo12/MENE2602911A'},
  EMC_2024:{label:'BO n°24 du 13 juin 2024',title:'Enseignement moral et civique (CP, CM1 en 2024 ; CE1, CM2 en 2025 ; CE2 en 2026)',url:'https://www.education.gouv.fr/bo/2024/Hebdo24/MENE2413934A'},
  EVAR_2025:{label:'BO n°6 du 6 février 2025',title:'Programme d’éducation à la vie affective et relationnelle (école)',url:'https://www.education.gouv.fr/bo/2025/Hebdo6/MENE2503064A'},
  SCI_C3_2023:{label:'BO n°25 du 22 juin 2023',title:'Sciences et technologie du cycle 3 (programme de 2023, encore applicable en CM2 et en 6e en 2026-2027)',url:'https://www.education.gouv.fr/bo/2023/Hebdo25/MENE2314101A'},
  C2C3_2020:{label:'BO n°31 du 30 juillet 2020',title:'Programmes des cycles 2 et 3 (version consolidée) — encore applicables pour les disciplines non encore basculées',url:'https://www.education.gouv.fr/bo/20/Hebdo31/MENE2018714A.htm'},
  CAL:{label:'Calendrier officiel des nouveaux programmes (Éduscol, 07.2026)',title:'Mise en œuvre des nouveaux programmes 2024-2028',url:'https://eduscol.education.gouv.fr/sites/default/files/document/calendriernouveauxprogrammes-129025.pdf'}
};
// Référence applicable par matière et par classe en 2026-2027.
const REF={
  'p-francais':{CP:'FRMA_C2_2024',CE1:'FRMA_C2_2024',CE2:'FRMA_C2_2024',CM1:'FRMA_C3_2025',CM2:'FRMA_C3_2025'},
  'p-maths':{CP:'FRMA_C2_2024',CE1:'FRMA_C2_2024',CE2:'FRMA_C2_2024',CM1:'FRMA_C3_2025',CM2:'FRMA_C3_2025'},
  'p-anglais':{CP:'LV_2026',CE1:'C2C3_2020',CE2:'C2C3_2020',CM1:'LV_2026',CM2:'C2C3_2020'},
  'p-sciences':{CP:'SCI_2026',CM1:'SCI_2026',CM2:'SCI_C3_2023'},
  'p-qlm':{CE1:'C2C3_2020',CE2:'C2C3_2020'},
  'p-hg':{CP:'HGEPS_2026',CM1:'HGEPS_2026',CM2:'C2C3_2020'},
  'p-emc':{CP:'EMC_2024',CE1:'EMC_2024',CE2:'EMC_2024',CM1:'EMC_2024',CM2:'EMC_2024'},
  'p-arts':{CP:'C2C3_2020',CE1:'C2C3_2020',CE2:'C2C3_2020',CM1:'C2C3_2020',CM2:'C2C3_2020'},
  'p-musique':{CP:'C2C3_2020',CE1:'C2C3_2020',CE2:'C2C3_2020',CM1:'C2C3_2020',CM2:'C2C3_2020'},
  'p-eps':{CP:'HGEPS_2026',CE1:'C2C3_2020',CE2:'C2C3_2020',CM1:'HGEPS_2026',CM2:'C2C3_2020'},
  'p-evar':{CP:'EVAR_2025',CE1:'EVAR_2025',CE2:'EVAR_2025',CM1:'EVAR_2025',CM2:'EVAR_2025'}
};
const NOTES={
  'p-qlm':'En CE1 et CE2, « Questionner le monde » (programme 2020) reste applicable en 2026-2027 : les nouveaux programmes de sciences et d’histoire-géographie n’y entrent en vigueur qu’en 2027-2028.',
  'p-sciences':'Nouveau programme de sciences et technologie en CP et CM1 (2026-2027) ; le CM2 suit encore le programme de sciences et technologie du cycle 3 de 2023 (BO n°25 du 22 juin 2023).',
  'p-hg':'Nouveau programme d’histoire-géographie en CP et CM1 (2026-2027) ; le CM2 suit encore le programme de 2020.',
  'p-anglais':'Nouveau programme de langues vivantes en CP et CM1 (2026-2027) ; CE1, CE2 et CM2 suivent encore le programme 2020.',
  'p-eps':'Nouveau programme d’EPS en CP et CM1 (2026-2027) ; CE1, CE2 et CM2 suivent encore le programme 2020. MathQuest ne travaille que les connaissances (règles, sécurité, vocabulaire) : la pratique physique reste indispensable.',
  'p-evar':'Programme d’éducation à la vie affective et relationnelle applicable depuis 2025-2026 à l’école.',
  'p-francais':'CP, CE1, CE2 : programme 2024 applicable depuis 2025-2026. CM1 : programme 2025 applicable depuis 2025-2026. CM2 : nouveau programme applicable en 2026-2027.',
  'p-maths':'CP, CE1, CE2 : programme 2024 applicable depuis 2025-2026. CM1 : programme 2025 applicable depuis 2025-2026. CM2 : nouveau programme applicable en 2026-2027.'
};
function source(sid,g){const k=REF[sid]&&REF[sid][g];return k?BO[k]:null;}

window.MQPrimary={version:'2026-2027.1',GRADES,COLLEGE,GKEY,STAGES,SUBJ,SUBJ_ORDER,stageOf,normGrade,H,add,enrich,build,subjectsForGrade,worldId,coach,tutorIntro,young,BO,REF,NOTES,source,_reg:REG};
})();
