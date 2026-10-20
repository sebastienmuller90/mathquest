/* MathQuest — Moteur de dictée (V8.13).
   Une seule phrase de référence exacte ; la réponse de l'élève est alignée mot à mot et chaque écart est classé :
   mot manquant, mot ajouté, orthographe, accent, majuscule, ponctuation, accord, terminaison verbale, homophone, lettre muette, apostrophe.
   Différences purement typographiques tolérées sans pénalité : espaces multiples, espace final, apostrophe droite/typographique,
   espace avant la ponctuation, casse en dehors de la majuscule de début de phrase (sauf option evalCase).
   Score pédagogique pondéré (pas une simple distance de caractères) :
     100 parfait · 90-99 quasi parfait · 75-89 quelques erreurs · 50-74 à retravailler · < 50 reprendre progressivement. */
(function(root){
'use strict';
const W={missing:1,extra:.5,orthographe:1,homophone:.75,terminaison:.5,accord:.5,'lettre muette':.5,accent:.34,apostrophe:.34,majuscule:.25,ponctuation:.25};
const LABEL={missing:'mot manquant',extra:'mot en trop',orthographe:'orthographe',homophone:'homophone',terminaison:'terminaison du verbe',accord:'accord',
  'lettre muette':'lettre muette',accent:'accent',apostrophe:'apostrophe',majuscule:'majuscule',ponctuation:'ponctuation'};
const LEVELS=[[100,'parfait','Parfait'],[90,'quasi-parfait','Quasi parfait'],[75,'quelques-erreurs','Quelques erreurs'],[50,'a-retravailler','À retravailler'],[0,'reprendre','À reprendre progressivement']];
const HOMO=[['a','à'],['et','est'],['son','sont'],['on','ont'],['ces','ses'],['ce','se'],['ou','où'],['la','là'],['leur','leurs'],['mes','mais'],['c’est','s’est'],['c’est','ses'],['peu','peut'],['sans','s’en'],['dans','d’en'],['quel','qu’elle'],['quelle','qu’elle'],['ni','n’y'],['si','s’y'],['ta','t’a'],['ma','m’a'],['sa','ça'],['l’a','la'],['l’a','là'],['ont','on'],['cet','cette'],['ce','ceux']];
const ACC=s=>s.normalize('NFD').replace(/[̀-ͯ]/g,'');
const lower=s=>s.toLocaleLowerCase('fr');
/* Normalisation typographique (tolérée) */
function typo(s){return String(s??'').replace(/[  \t\r\n]/g,' ').replace(/['‘`´]/g,'’').replace(/\s+([,.;:!?…»)])/g,'$1').replace(/([«(])\s+/g,'$1').replace(/\s+/g,' ').trim();}
const PUNCT=/[,.;:!?…«»()"—–-]/;
function tokenize(s){const t=typo(s);const out=[];const re=/[\p{L}\p{N}]+(?:[’\-][\p{L}\p{N}]+)*’?|[,.;:!?…«»()"—–]/gu;let m;while((m=re.exec(t)))out.push({t:m[0],p:PUNCT.test(m[0])&&!/[\p{L}\p{N}]/u.test(m[0])});return out;}
function lev(a,b){const A=[...a],B=[...b];const d=Array(B.length+1).fill(0).map((_,j)=>j);for(let i=1;i<=A.length;i++){let prev=d[0];d[0]=i;for(let j=1;j<=B.length;j++){const old=d[j];d[j]=Math.min(d[j]+1,d[j-1]+1,prev+(A[i-1]===B[j-1]?0:1));prev=old;}}return d[B.length];}
/* Classe un écart entre le mot attendu r et le mot écrit a (même position). */
function classify(r,a,{sentenceStart=false,evalCase=false}={}){
  if(r===a)return null;const R=lower(r),A=lower(a);
  if(R===A)return (evalCase||sentenceStart)?'majuscule':null;
  if(HOMO.some(([x,y])=>(R===x&&A===y)||(R===y&&A===x)))return 'homophone';
  if(R.replace(/’/g,'')===A.replace(/’/g,''))return 'apostrophe';
  if(ACC(R)===ACC(A))return 'accent';
  const plus=(x,y,ends)=>ends.some(e=>x===y+e);
  // terminaisons verbales fréquentes
  const VERB=[['ent','e'],['ent','es'],['ent',''],['ent','ts'],['ait','ais'],['ais','ait'],['aient','ait'],['aient','ais'],['ai','ais'],['ai','é'],['é','er'],['er','é'],['ez','é'],['ez','er'],['é','ez'],['er','ez'],['ez','e'],['t','s'],['s','t'],['ra','ras'],['ras','ra'],['rai','rais'],['rais','rai']];
  for(const [x,y] of VERB){if(R.endsWith(x)&&A===R.slice(0,R.length-x.length)+y&&R.length-x.length>=2)return 'terminaison';}
  if(plus(R,A,['s','x','e','es'])||plus(A,R,['s','x','e','es']))return 'accord';
  if(R.length>A.length&&/[dtpcgxs]$/.test(R)&&A===R.slice(0,-1))return 'lettre muette';
  if(R.replace(/h/g,'')===A.replace(/h/g,'')&&R!==A)return 'lettre muette';
  if(ACC(R).replace(/’/g,'')===ACC(A).replace(/’/g,''))return 'accent';
  return 'orthographe';}
/* Clé phonétique simplifiée du français : deux graphies qui se prononcent pareil (« maison » / « mézon », « bateau » / « bato »)
   sont reconnues comme le même mot mal orthographié, et non comme un mot oublié suivi d'un mot ajouté. */
function phon(w){let s=ACC(lower(w).replace(/ç/g,'s')).replace(/’/g,'');
  s=s.replace(/^h/,'').replace(/ph/g,'f').replace(/ch/g,'S').replace(/qu/g,'k').replace(/gu(?=[eiy])/g,'g').replace(/ge(?=[aou])/g,'j').replace(/g(?=[eiy])/g,'j').replace(/c(?=[eiy])/g,'s').replace(/ck|c/g,'k')
   .replace(/eau|au/g,'o').replace(/ai|ei/g,'e').replace(/(er|ez|et)$/,'e').replace(/([aeiouy])s(?=[aeiouy])/g,'$1z').replace(/ss/g,'s')
   .replace(/(an|en|am|em)(?![aeiouyn])/g,'A').replace(/(ain|ein|in|im|un|um)(?![aeiouyn])/g,'I').replace(/(on|om)(?![aeiouyn])/g,'O')
   .replace(/ou/g,'U').replace(/oi/g,'W').replace(/y/g,'i').replace(/h/g,'').replace(/(.)\1+/g,'$1').replace(/[stdxp]$/,'').replace(/e$/,'');
  return s;}
function similar(r,a){const R=ACC(lower(r)).replace(/’/g,''),A=ACC(lower(a)).replace(/’/g,'');if(R===A)return true;if(R.length>2&&phon(r)===phon(a))return true;const d=lev(R,A);return d<=Math.max(1,Math.floor(Math.max(R.length,A.length)/3))||R.startsWith(A)||A.startsWith(R);}
/* Alignement mot à mot (programmation dynamique) */
function align(ref,ans){const n=ref.length,m=ans.length;const D=Array.from({length:n+1},()=>Array(m+1).fill(0)),B=Array.from({length:n+1},()=>Array(m+1).fill(''));
  for(let i=1;i<=n;i++){D[i][0]=i;B[i][0]='d';}for(let j=1;j<=m;j++){D[0][j]=j*.9;B[0][j]='i';}
  for(let i=1;i<=n;i++)for(let j=1;j<=m;j++){const r=ref[i-1],a=ans[j-1];const same=r===a?0:lower(r)===lower(a)?.05:similar(r,a)?.6:2.2;
    const opts=[[D[i-1][j-1]+same,'s'],[D[i-1][j]+1,'d'],[D[i][j-1]+.9,'i']];opts.sort((x,y)=>x[0]-y[0]);D[i][j]=opts[0][0];B[i][j]=opts[0][1];}
  const out=[];let i=n,j=m;while(i>0||j>0){const b=B[i][j];if(b==='s'){out.push({r:ref[i-1],a:ans[j-1],ri:i-1});i--;j--;}else if(b==='d'){out.push({r:ref[i-1],a:null,ri:i-1});i--;}else{out.push({r:null,a:ans[j-1],ri:i});j--;}}
  return out.reverse();}
function levelOf(score){for(const [min,k,label] of LEVELS)if(score>=min)return {k,label};return {k:'reprendre',label:LEVELS[4][2]};}
/* Position de chaque signe de ponctuation : nombre de mots qui le précèdent, par signe. */
function punctPositions(str){const t=String(str??'').replace(/[\u00a0\u202f\t\r\n]/g,' ').replace(/['‘`´]/g,'’').replace(/\s+/g,' ').trim(),re=/[\p{L}\p{N}]+(?:[’\-][\p{L}\p{N}]+)*’?|[,.;:!?…«»()"—–]/gu,o={};let m,w=0;while((m=re.exec(t))){if(/^[,.;:!?…«»()"—–]$/u.test(m[0]))(o[m[0]]||(o[m[0]]=[])).push(w);else w++;}return o;}
/* Analyse principale. opts : {evalCase:false, punctuation:true} */
function analyze(reference,answer,opts={}){const o={evalCase:false,punctuation:true,...opts};
  const rt=tokenize(reference),at=tokenize(answer);const rw=rt.filter(x=>!x.p).map(x=>x.t),aw=at.filter(x=>!x.p).map(x=>x.t);
  const rp=rt.filter(x=>x.p).map(x=>x.t),ap=at.filter(x=>x.p).map(x=>x.t);
  const al=align(rw,aw);const errors=[];const tokens=[];
  for(const x of al){
    if(x.r!=null&&x.a!=null){const type=classify(x.r,x.a,{sentenceStart:x.ri===0,evalCase:o.evalCase});if(type)errors.push({type,ref:x.r,got:x.a});tokens.push({status:type?'bad':'ok',ref:x.r,got:x.a,type});}
    else if(x.r!=null){errors.push({type:'missing',ref:x.r,got:''});tokens.push({status:'missing',ref:x.r,got:''});}
    else{errors.push({type:'extra',ref:'',got:x.a});tokens.push({status:'extra',ref:'',got:x.a});}}
  if(o.punctuation){const cnt=a=>a.reduce((m,p)=>(m[p]=(m[p]||0)+1,m),{});const cr=cnt(rp),ca=cnt(ap);
    for(const p of new Set([...rp,...ap])){const d=(cr[p]||0)-(ca[p]||0);for(let k=0;k<Math.abs(d);k++)errors.push({type:'ponctuation',ref:d>0?p:'',got:d<0?p:''});}}
  // Ponctuation déplacée (même signe, mais pas après le même mot) : comptée comme une erreur de ponctuation.
  if(o.punctuation){const A=punctPositions(reference),B=punctPositions(answer);for(const p of new Set([...Object.keys(A),...Object.keys(B)])){const x=A[p]||[],y=B[p]||[];for(let i=0;i<Math.min(x.length,y.length);i++)if(x[i]!==y[i])errors.push({type:'ponctuation',ref:p,got:p,position:true});}}
  const denom=rw.length+(o.punctuation?.25*rp.length:0)||1;const pen=errors.reduce((s,e)=>s+(W[e.type]||1),0);
  const score=errors.length?Math.max(0,Math.min(99,Math.round((1-pen/denom)*100))):100;
  return {reference:typo(reference),answer:typo(answer),score,level:levelOf(score),errors,tokens,
    words:rw.length,missing:errors.filter(e=>e.type==='missing').length,extra:errors.filter(e=>e.type==='extra').length,
    allWordsFound:!errors.some(e=>e.type==='missing'||e.type==='extra'||e.type==='orthographe'),perfect:!errors.length};}
/* Meilleure analyse parmi plusieurs réponses acceptées */
function best(refs,answer,opts){const list=(Array.isArray(refs)?refs:[refs]).map(r=>analyze(r,answer,opts));return list.sort((a,b)=>b.score-a.score)[0];}
/* Effet sur la progression : la maîtrise finale (quiz de validation) exige 100 %. */
function outcome(res,{final=false}={}){const s=res.score;return {ok:final?s===100:s>=90,fragile:s<100&&s>=90,partial:s>=75&&s<90,toReview:s<100,credit:s/100};}
/* Rétroaction pédagogique adaptée à la classe */
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function feedback(res,{young=false}={}){const lines=[];
  if(res.perfect){lines.push(young?'Bravo, c’est parfait ! ⭐':'Parfait : aucune erreur.');return {title:res.level.label,lines,correct:res.reference};}
  if(res.allWordsFound)lines.push('Tu as bien retrouvé tous les mots 👍');
  else{if(res.missing)lines.push(res.missing>1?`Il manque ${res.missing} mots.`:'Il manque un mot.');if(res.extra)lines.push(res.extra>1?`Tu as écrit ${res.extra} mots en trop.`:'Tu as écrit un mot en trop.');}
  const groups=[['accord',young?'Regarde la fin des mots :':'Regarde les accords :'],['terminaison',young?'Regarde la fin des verbes :':'Regarde les terminaisons des verbes :'],['homophone',young?'Mots qui se disent pareil :':'Attention aux homophones :'],
    ['accent','Attention aux accents :'],['lettre muette',young?'N’oublie pas les lettres qu’on n’entend pas :':'Attention aux lettres muettes :'],['apostrophe','Attention à l’apostrophe :'],['orthographe',young?'Regarde ces mots :':'Orthographe à revoir :'],['missing','Mots oubliés :'],['majuscule',young?'Une phrase commence par une majuscule :':'Majuscules :']];
  // CP-CE1 : au plus 2 familles d'erreurs et 2 exemples chacune, pour rester lisible.
  const max=young?2:6;let shown=0,hidden=0;
  for(const [k,title] of groups){const es=res.errors.filter(e=>e.type===k);if(!es.length)continue;if(young&&shown>=2){hidden+=es.length;continue;}shown++;
    const items=es.slice(0,max).map(e=>k==='missing'?e.ref:`${e.got} → ${e.ref}`);lines.push(`${title} ${items.join(' ; ')}${es.length>max?' …':''}`);}
  if(hidden)lines.push('Et d’autres mots à revoir.');
  const pu=res.errors.filter(e=>e.type==='ponctuation');if(pu.length){const miss=pu.filter(e=>e.ref).map(e=>`« ${e.ref} »`),add=pu.filter(e=>e.got).map(e=>`« ${e.got} »`);
    if(miss.length)lines.push(young&&miss.includes('« . »')?'N’oublie pas le point final.':`Ponctuation oubliée : ${miss.join(' ')}`);if(add.length&&!young)lines.push(`Ponctuation en trop : ${add.join(' ')}`);}
  return {title:res.level.label,lines,correct:res.reference};}
function diffHTML(res){return res.tokens.map(t=>t.status==='ok'?`<span class="dw ok">${esc(t.got)}</span>`:t.status==='missing'?`<span class="dw miss" title="mot oublié">${esc(t.ref)}</span>`:t.status==='extra'?`<s class="dw extra" title="mot en trop">${esc(t.got)}</s>`:`<span class="dw bad" title="${esc(LABEL[t.type]||'')}"><mark>${esc(t.got)}</mark><small>${esc(t.ref)}</small></span>`).join(' ');}
function feedbackHTML(res,{young=false}={}){const f=feedback(res,{young});
  return `<div class="dict-fb"><div class="dict-score"><b>${res.score} %</b> · ${esc(f.title)}</div>${res.perfect?'':`<div class="dict-diff">${diffHTML(res)}</div>`}<ul class="dict-lines">${f.lines.map(l=>`<li>${esc(l)}</li>`).join('')}</ul>${res.perfect?'':`<p class="dict-correct">La phrase correcte est : <b>${esc(f.correct)}</b></p>`}</div>`;}
root.MQDictation={version:'8.13',WEIGHTS:W,LABEL,LEVELS,typo,tokenize,classify,align,phon,analyze,best,outcome,feedback,feedbackHTML,diffHTML,levelOf};
})(typeof window!=='undefined'?window:globalThis);
