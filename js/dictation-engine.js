/* Finot Académie — Moteur de dictée (V8.13, étendu en vague 1 pédagogie finale le 23/10/2026).
   Une seule phrase de référence exacte ; la réponse de l'élève est alignée mot à mot et chaque écart est classé :
   mot manquant, mot ajouté, orthographe, accent, majuscule, ponctuation, accord, terminaison verbale, homophone, lettre muette, apostrophe.
   Chaque écart reçoit en plus un « kind » fin (lettre manquante, lettre ajoutée, accent oublié, accord du pluriel oublié, mot incorrect…)
   et sa position (mot n° k de la phrase de l'élève), ce qui permet une rétroaction en étapes SANS donner toute la réponse
   (hints, coach, feedback(..., {progressive:true})).
   Différences purement typographiques tolérées sans pénalité : espaces multiples, espace final, espaces insécables, apostrophe droite/typographique,
   guillemets droits « " » ou « “ ” » pour « « » », trois points pour « … », tirets de dialogue, espace avant la ponctuation,
   casse en dehors de la majuscule de début de phrase (sauf option evalCase), accents saisis en deux caractères (NFD).
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
/* Guillemets : « “ ” » et les guillemets droits sont ramenés à « » (les droits alternent ouvrant / fermant). */
function normQuotes(s){let open=true;return String(s).replace(/[“„]/g,'«').replace(/”/g,'»').replace(/"/g,()=>{const q=open?'«':'»';open=!open;return q;});}
/* Normalisation typographique (tolérée) */
function typo(s){return normQuotes(String(s??'').normalize('NFC').replace(/[​­﻿]/g,'').replace(/\.{3,}/g,'…').replace(/[–―]/g,'—'))
  .replace(/[   \t\r\n]/g,' ').replace(/['‘`´]/g,'’').replace(/\s+([,.;:!?…»)])/g,'$1').replace(/([«(])\s+/g,'$1').replace(/\s+/g,' ').trim();}
const PUNCT=/[,.;:!?…«»()"—–-]/;
function tokenize(s){const t=typo(s);const out=[];const re=/[\p{L}\p{N}]+(?:[’\-][\p{L}\p{N}]+)*’?|[,.;:!?…«»()"—–]/gu;let m;while((m=re.exec(t)))out.push({t:m[0],p:PUNCT.test(m[0])&&!/[\p{L}\p{N}]/u.test(m[0])});return out;}
function lev(a,b){const A=[...a],B=[...b];const d=Array(B.length+1).fill(0).map((_,j)=>j);for(let i=1;i<=A.length;i++){let prev=d[0];d[0]=i;for(let j=1;j<=B.length;j++){const old=d[j];d[j]=Math.min(d[j]+1,d[j-1]+1,prev+(A[i-1]===B[j-1]?0:1));prev=old;}}return d[B.length];}
const LIG=s=>s.replace(/œ/g,'oe').replace(/Œ/g,'Oe').replace(/æ/g,'ae').replace(/Æ/g,'Ae');
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
  if(ACC(LIG(R))===ACC(A)||ACC(R)===ACC(LIG(A)))return 'accent';   // œ / oe, æ / ae : variante de saisie, faute légère
  return 'orthographe';}
/* Nature précise de l'écart (même type, plus de détail) : sert à expliquer SANS donner la réponse. */
const nDiacritics=s=>(s.normalize('NFD').match(/[̀-ͯ]/g)||[]).length;
function kindOf(r,a,type){const R0=lower(r),A0=lower(a);
  if(type==='majuscule')return /^\p{Lu}/u.test(a)&&!/^\p{Lu}/u.test(r)?'majuscule en trop':'majuscule manquante';
  if(type==='accent'){if((/[œæ]/i.test(r)&&!/[œæ]/i.test(a))||(/[œæ]/i.test(a)&&!/[œæ]/i.test(r)))return 'ligature';
    const dr=nDiacritics(R0),da=nDiacritics(A0);return da<dr?'accent oublié':da>dr?'accent en trop':'accent erroné';}
  if(type==='apostrophe')return /’/.test(a)?'apostrophe en trop':'apostrophe oubliée';
  if(type==='accord'){const longer=R0.length>=A0.length?R0:A0,shorter=R0.length>=A0.length?A0:R0,end=longer.slice(shorter.length);
    const nat=end==='es'?'féminin pluriel':end==='e'?'féminin':'pluriel';return `accord ${nat} ${R0.length>=A0.length?'oublié':'en trop'}`;}
  if(type==='terminaison')return 'terminaison du verbe';
  if(type==='lettre muette')return R0.length>A0.length?'lettre muette oubliée':'lettre muette';
  if(type==='homophone')return 'homophone';
  if(type==='orthographe'){const R=ACC(R0).replace(/’/g,''),A=ACC(A0).replace(/’/g,'');const diff=R.length-A.length,d=lev(R,A);
    if(R.replace(/(.)\1/g,'$1')===A.replace(/(.)\1/g,'$1')&&diff!==0)return 'consonne double';
    if(d===1)return diff>0?'lettre manquante':diff<0?'lettre ajoutée':'lettre erronée';
    if(d===2&&diff===0){for(let i=0;i<R.length-1;i++){if(R[i]===A[i+1]&&R[i+1]===A[i]&&R.slice(0,i)===A.slice(0,i)&&R.slice(i+2)===A.slice(i+2))return 'lettres inversées';}}
    if(d===Math.abs(diff))return diff>0?'lettres manquantes':'lettres ajoutées';
    if(R.length>2&&phon(r)===phon(a))return 'graphie phonétique';
    if(d>Math.max(2,Math.floor(R.length/2)))return 'mot incorrect';
    return 'lettres à revoir';}
  return LABEL[type]||type;}
/* Clé phonétique simplifiée du français : deux graphies qui se prononcent pareil (« maison » / « mézon », « bateau » / « bato »)
   sont reconnues comme le même mot mal orthographié, et non comme un mot oublié suivi d'un mot ajouté. */
function phon(w){let s=ACC(lower(w).replace(/ç/g,'s')).replace(/’/g,'');
  s=s.replace(/^h/,'').replace(/ph/g,'f').replace(/ch/g,'S').replace(/qu/g,'k').replace(/gu(?=[eiy])/g,'g').replace(/ge(?=[aou])/g,'j').replace(/g(?=[eiy])/g,'j').replace(/c(?=[eiy])/g,'s').replace(/ck|c/g,'k')
   .replace(/eau|au/g,'o').replace(/ai|ei/g,'e').replace(/(er|ez|et)$/,'e').replace(/([aeiouy])s(?=[aeiouy])/g,'$1z').replace(/ss/g,'s')
   .replace(/(an|en|am|em)(?![aeiouyn])/g,'A').replace(/(ain|ein|in|im|un|um)(?![aeiouyn])/g,'I').replace(/(on|om)(?![aeiouyn])/g,'O')
   .replace(/ou/g,'U').replace(/oi/g,'W').replace(/y/g,'i').replace(/h/g,'').replace(/(.)\1+/g,'$1').replace(/[stdxp]$/,'').replace(/e$/,'');
  return s;}
function swapped(R,A){if(R.length!==A.length)return false;for(let i=0;i<R.length-1;i++){if(R[i]===A[i+1]&&R[i+1]===A[i]&&R.slice(0,i)===A.slice(0,i)&&R.slice(i+2)===A.slice(i+2))return true;}return false;}
function similar(r,a){const R=ACC(LIG(lower(r))).replace(/’/g,''),A=ACC(LIG(lower(a))).replace(/’/g,'');if(R===A)return true;if(R.length>2&&phon(r)===phon(a))return true;const d=lev(R,A);return d<=Math.max(1,Math.floor(Math.max(R.length,A.length)/3))||R.startsWith(A)||A.startsWith(R)||(R.length>2&&swapped(R,A));}
/* Alignement mot à mot (programmation dynamique) */
function align(ref,ans){const n=ref.length,m=ans.length;const D=Array.from({length:n+1},()=>Array(m+1).fill(0)),B=Array.from({length:n+1},()=>Array(m+1).fill(''));
  for(let i=1;i<=n;i++){D[i][0]=i;B[i][0]='d';}for(let j=1;j<=m;j++){D[0][j]=j*.9;B[0][j]='i';}
  for(let i=1;i<=n;i++)for(let j=1;j<=m;j++){const r=ref[i-1],a=ans[j-1];const same=r===a?0:lower(r)===lower(a)?.05:similar(r,a)?.6:2.2;
    const opts=[[D[i-1][j-1]+same,'s'],[D[i-1][j]+1,'d'],[D[i][j-1]+.9,'i']];opts.sort((x,y)=>x[0]-y[0]);D[i][j]=opts[0][0];B[i][j]=opts[0][1];}
  const out=[];let i=n,j=m;while(i>0||j>0){const b=B[i][j];if(b==='s'){out.push({r:ref[i-1],a:ans[j-1],ri:i-1});i--;j--;}else if(b==='d'){out.push({r:ref[i-1],a:null,ri:i-1});i--;}else{out.push({r:null,a:ans[j-1],ri:i});j--;}}
  return out.reverse();}
function levelOf(score){for(const [min,k,label] of LEVELS)if(score>=min)return {k,label};return {k:'reprendre',label:LEVELS[4][2]};}
/* Position de chaque signe de ponctuation : nombre de mots qui le précèdent, par signe. */
function punctPositions(str){const t=typo(str),re=/[\p{L}\p{N}]+(?:[’\-][\p{L}\p{N}]+)*’?|[,.;:!?…«»()"—–]/gu,o={};let m,w=0;while((m=re.exec(t))){if(/^[,.;:!?…«»()"—–]$/u.test(m[0]))(o[m[0]]||(o[m[0]]=[])).push(w);else w++;}return o;}
/* Variantes typographiques acceptées (réponse juste, mais écrite autrement que la référence). */
function variants(reference,answer){const r=String(reference??'').trim(),a=String(answer??'').trim(),v=[];if(r===a)return v;
  const pick=(s,re)=>(s.match(re)||[]).join('');
  if(pick(r,/['‘`´’]/g)!==pick(a,/['‘`´’]/g))v.push('apostrophe');
  if(pick(r,/[“”„"«»]/g)!==pick(a,/[“”„"«»]/g))v.push('guillemets');
  if(/[   ]/.test(a)!==/[   ]/.test(r)||/\s{2,}/.test(a)||/\s[,.;:!?…»)]/.test(a)!==/\s[,.;:!?…»)]/.test(r)||/[«(]\s/.test(a)!==/[«(]\s/.test(r))v.push('espaces');
  if(pick(r,/[…]|\.{3}/g)!==pick(a,/[…]|\.{3}/g))v.push('points de suspension');
  if(pick(r,/[—–―]/g)!==pick(a,/[—–―]/g))v.push('tirets');
  if(a!==a.normalize('NFC'))v.push('accents saisis en deux caractères');
  if(!v.length&&lower(r.replace(/\s+/g,' '))===lower(a.replace(/\s+/g,' '))&&r!==a)v.push('majuscules');
  return v;}
/* Analyse principale. opts : {evalCase:false, punctuation:true} */
function analyze(reference,answer,opts={}){const o={evalCase:false,punctuation:true,...opts};
  const rt=tokenize(reference),at=tokenize(answer);const rw=rt.filter(x=>!x.p).map(x=>x.t),aw=at.filter(x=>!x.p).map(x=>x.t);
  const rp=rt.filter(x=>x.p).map(x=>x.t),ap=at.filter(x=>x.p).map(x=>x.t);
  const al=align(rw,aw);const errors=[];const tokens=[];let gi=0;
  for(let alignIndex=0;alignIndex<al.length;alignIndex++){const x=al[alignIndex];
    if(x.r!=null&&x.a!=null){gi++;const type=classify(x.r,x.a,{sentenceStart:x.ri===0,evalCase:o.evalCase});if(type)errors.push({type,ref:x.r,got:x.a,kind:kindOf(x.r,x.a,type),pos:x.ri+1,apos:gi,alignIndex});tokens.push({status:type?'bad':'ok',ref:x.r,got:x.a,type});}
    else if(x.r!=null){errors.push({type:'missing',ref:x.r,got:'',kind:'mot manquant',pos:x.ri+1,apos:gi,alignIndex});tokens.push({status:'missing',ref:x.r,got:''});}
    else{gi++;errors.push({type:'extra',ref:'',got:x.a,kind:'mot en trop',pos:x.ri,apos:gi,alignIndex});tokens.push({status:'extra',ref:'',got:x.a});}}
  // Un mot oublié juste à côté d'un mot en trop = un mot remplacé par un autre (« mot incorrect »). Le barème ne change pas.
  for(let i=0;i<errors.length-1;i++){const a=errors[i],b=errors[i+1];
    if(((a.type==='missing'&&b.type==='extra')||(a.type==='extra'&&b.type==='missing'))&&!a.pair&&!b.pair&&Math.abs((a.alignIndex??-99)-(b.alignIndex??-99))===1){a.pair=1;b.pair=2;a.kind=b.kind='mot incorrect';const ex=a.type==='extra'?a:b,mi=a.type==='missing'?a:b;ex.replaces=mi.ref;mi.replacedBy=ex.got;i++;}}
  if(o.punctuation){const cnt=a=>a.reduce((m,p)=>(m[p]=(m[p]||0)+1,m),{});const cr=cnt(rp),ca=cnt(ap);
    for(const p of new Set([...rp,...ap])){const d=(cr[p]||0)-(ca[p]||0);for(let k=0;k<Math.abs(d);k++)errors.push({type:'ponctuation',ref:d>0?p:'',got:d<0?p:'',kind:d>0?'ponctuation manquante':'ponctuation en trop'});}}
  // Ponctuation déplacée (même signe, mais pas après le même mot) : comptée comme une erreur de ponctuation.
  if(o.punctuation){const A=punctPositions(reference),B=punctPositions(answer);for(const p of new Set([...Object.keys(A),...Object.keys(B)])){const x=A[p]||[],y=B[p]||[];for(let i=0;i<Math.min(x.length,y.length);i++)if(x[i]!==y[i])errors.push({type:'ponctuation',ref:p,got:p,position:true,kind:'ponctuation déplacée',apos:y[i]});}}
  const denom=rw.length+(o.punctuation?.25*rp.length:0)||1;const pen=errors.reduce((s,e)=>s+(W[e.type]||1),0);
  const score=errors.length?Math.max(0,Math.min(99,Math.round((1-pen/denom)*100))):100;
  const variant=errors.length?[]:variants(reference,answer);
  const important=errors.filter(e=>e.pair===1||(e.type==='missing'&&!e.pair));   // mot incorrect ou mot oublié : à reprendre en priorité
  return {reference:typo(reference),answer:typo(answer),score,level:levelOf(score),errors,tokens,
    words:rw.length,missing:errors.filter(e=>e.type==='missing').length,extra:errors.filter(e=>e.type==='extra').length,
    allWordsFound:!errors.some(e=>e.type==='missing'||e.type==='extra'||e.type==='orthographe'),perfect:!errors.length,
    exact:String(reference??'').trim()===String(answer??'').trim(),variant,important};}
/* Meilleure analyse parmi plusieurs réponses acceptées */
function best(refs,answer,opts){const list=(Array.isArray(refs)?refs:[refs]).map(r=>analyze(r,answer,opts));return list.sort((a,b)=>b.score-a.score)[0];}
/* Effet sur la progression : la maîtrise finale (quiz de validation) exige 100 %. */
function outcome(res,{final=false}={}){const s=res.score;return {ok:final?s===100:s>=90,fragile:s<100&&s>=90,partial:s>=75&&s<90,toReview:s<100,credit:s/100};}
/* Rétroaction pédagogique adaptée à la classe */
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const SIGN={'.':'un point',',':'une virgule','?':'un point d’interrogation','!':'un point d’exclamation',':':'les deux-points',';':'un point-virgule','…':'des points de suspension','«':'un guillemet','»':'un guillemet','(':'une parenthèse',')':'une parenthèse','—':'un tiret'};
/* Pistes : ce qu'il faut corriger et OÙ, sans écrire le mot attendu. « reveal » donne l'étape suivante (la correction du mot). */
function hintText(e,young){const n=e.apos?`Mot n° ${e.apos}`:'Un mot';
  switch(e.kind){
    case 'accent oublié':return `${n} : il manque un accent.`;
    case 'accent en trop':return `${n} : il y a un accent en trop.`;
    case 'accent erroné':return `${n} : l’accent n’est pas le bon.`;
    case 'ligature':return `${n} : regarde les lettres « œ » ou « æ » (deux lettres collées).`;
    case 'lettre manquante':return `${n} : il manque une lettre.`;
    case 'lettres manquantes':return `${n} : il manque plusieurs lettres.`;
    case 'lettre ajoutée':return `${n} : il y a une lettre en trop.`;
    case 'lettres ajoutées':return `${n} : il y a plusieurs lettres en trop.`;
    case 'lettre erronée':return `${n} : une lettre n’est pas la bonne.`;
    case 'lettres inversées':return `${n} : deux lettres sont dans le mauvais ordre.`;
    case 'consonne double':return `${n} : regarde les lettres doubles.`;
    case 'graphie phonétique':return `${n} : le mot se dit bien, mais il ne s’écrit pas comme ça.`;
    case 'lettres à revoir':return `${n} : plusieurs lettres sont à revoir.`;
    case 'mot incorrect':return `${n} : ce n’est pas le bon mot.`;
    case 'lettre muette oubliée':return `${n} : il manque une lettre qu’on n’entend pas.`;
    case 'lettre muette':return `${n} : il y a une lettre muette en trop.`;
    case 'terminaison du verbe':return `${n} : regarde la terminaison du verbe${young?'':' (sujet, temps)'}.`;
    case 'homophone':return `${n} : ce mot se dit pareil qu’un autre, mais ce n’est pas le bon. Pense à ce qu’il veut dire.`;
    case 'apostrophe oubliée':return `${n} : il manque une apostrophe.`;
    case 'apostrophe en trop':return `${n} : l’apostrophe est en trop.`;
    case 'majuscule manquante':return `${n} : il faut une majuscule.`;
    case 'majuscule en trop':return `${n} : pas de majuscule ici.`;
    case 'mot manquant':return e.apos?`Il manque un mot après le mot n° ${e.apos}.`:'Il manque un mot au début de la phrase.';
    case 'mot en trop':return `${n} : ce mot est en trop.`;
    case 'ponctuation manquante':return e.ref&&SIGN[e.ref]?`Il manque ${SIGN[e.ref]}.`:'Il manque un signe de ponctuation.';
    case 'ponctuation en trop':return e.got&&SIGN[e.got]?`Tu as écrit ${SIGN[e.got]} en trop.`:'Il y a un signe de ponctuation en trop.';
    case 'ponctuation déplacée':return e.got&&SIGN[e.got]?`Vérifie la place de ${SIGN[e.got]} (après quel mot ?).`:'Vérifie la place de la ponctuation.';
    default:
      if(/^accord /.test(e.kind||'')){const nat=/féminin pluriel/.test(e.kind)?'féminin et pluriel':/féminin/.test(e.kind)?'féminin':'pluriel';return /oublié/.test(e.kind)?`${n} : regarde l’accord (${nat}) : il manque la marque.`:`${n} : regarde l’accord (${nat}) : il y a une marque en trop.`;}
      return `${n} : à revoir.`;}}
function hints(res,{young=false,max=Infinity}={}){const out=[];
  const list=res.errors.filter(e=>e.pair!==2).slice().sort((a,b)=>(a.type==='ponctuation')-(b.type==='ponctuation')||(a.apos||0)-(b.apos||0));
  for(const e of list){const reveal=e.pair===1||e.kind==='mot incorrect'?(e.type==='missing'?`${e.replacedBy||''} → ${e.ref}`:`${e.got} → ${e.replaces||''}`):e.type==='missing'?e.ref:e.type==='extra'?`${e.got} (à supprimer)`:e.type==='ponctuation'?(e.ref||e.got):`${e.got} → ${e.ref}`;
    out.push({n:out.length+1,type:e.type,kind:e.kind,apos:e.apos||0,pos:e.pos||0,text:hintText(e,young),reveal});if(out.length>=max)break;}
  return out;}
/* Résumé sans réponse : combien d'écarts et de quelle sorte. */
function summary(res){if(res.perfect)return 'Parfait : aucune erreur.';const c={};for(const e of res.errors){if(e.pair===2)continue;const k=e.kind==='mot incorrect'?'mot incorrect':(LABEL[e.type]||e.type);c[k]=(c[k]||0)+1;}
  const n=Object.values(c).reduce((s,x)=>s+x,0);const parts=Object.entries(c).map(([k,v])=>`${v} ${k}`);
  return `Il y a ${n} point${n>1?'s':''} à corriger (${parts.join(', ')}). Relis ta phrase mot par mot.`;}
/* Accompagnement en étapes : 0 = résumé, 1..N = une piste par écart (sans la réponse), N+1 = la phrase correcte. */
function coach(reference,answer,step=0,opts={}){const res=Array.isArray(reference)?best(reference,answer,opts):analyze(reference,answer,opts);const hs=hints(res,{young:!!opts.young});
  if(res.perfect)return {step:0,total:0,done:true,text:'Parfait : aucune erreur.',result:res};
  const total=hs.length+1;if(step<=0)return {step:0,total,done:false,text:summary(res),result:res};
  if(step<=hs.length)return {step,total,done:false,text:hs[step-1].text,reveal:hs[step-1].reveal,result:res};
  return {step:total,total,done:true,text:`La phrase correcte est : ${res.reference}`,result:res};}
function feedback(res,{young=false,progressive=false}={}){const lines=[];
  if(res.perfect){lines.push(young?'Bravo, c’est parfait ! ⭐':'Parfait : aucune erreur.');
    if(res.variant&&res.variant.length)lines.push(`Ta ponctuation ou tes espaces sont écrits autrement (${res.variant.join(', ')}), mais c’est accepté.`);
    return {title:res.level.label,lines,correct:res.reference,hints:[]};}
  const hs=hints(res,{young,max:young?3:8});
  if(progressive){lines.push(summary(res));for(const h of hs)lines.push(h.text);
    if(hs.length<res.errors.filter(e=>e.pair!==2).length)lines.push('Et d’autres points à revoir.');
    return {title:res.level.label,lines,correct:res.reference,hints:hs,progressive:true};}
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
  return {title:res.level.label,lines,correct:res.reference,hints:hs};}
function diffHTML(res){return res.tokens.map(t=>t.status==='ok'?`<span class="dw ok">${esc(t.got)}</span>`:t.status==='missing'?`<span class="dw miss" title="mot oublié">${esc(t.ref)}</span>`:t.status==='extra'?`<s class="dw extra" title="mot en trop">${esc(t.got)}</s>`:`<span class="dw bad" title="${esc(LABEL[t.type]||'')}"><mark>${esc(t.got)}</mark><small>${esc(t.ref)}</small></span>`).join(' ');}
function feedbackHTML(res,{young=false,progressive=false}={}){const f=feedback(res,{young,progressive});
  if(progressive&&!res.perfect)return `<div class="dict-fb"><div class="dict-score"><b>${res.score} %</b> · ${esc(f.title)}</div><ul class="dict-lines">${f.lines.map(l=>`<li>${esc(l)}</li>`).join('')}</ul><details class="dict-reveal"><summary>Voir la correction</summary><div class="dict-diff">${diffHTML(res)}</div><p class="dict-correct">La phrase correcte est : <b>${esc(f.correct)}</b></p></details></div>`;
  const pistes=res.perfect||!f.hints.length?'':`<div class="dict-hints"><b>Où corriger :</b><ul>${f.hints.map(h=>`<li>${esc(h.text)}</li>`).join('')}</ul></div>`;
  return `<div class="dict-fb"><div class="dict-score"><b>${res.score} %</b> · ${esc(f.title)}</div>${res.perfect?'':`<div class="dict-diff">${diffHTML(res)}</div>`}<ul class="dict-lines">${f.lines.map(l=>`<li>${esc(l)}</li>`).join('')}</ul>${res.perfect?'':`<p class="dict-correct">La phrase correcte est : <b>${esc(f.correct)}</b></p>`}${pistes}</div>`;}
root.MQDictation={version:'8.14',WEIGHTS:W,LABEL,LEVELS,typo,tokenize,classify,kindOf,align,phon,analyze,best,outcome,feedback,feedbackHTML,diffHTML,levelOf,hints,summary,coach,variants};
})(typeof window!=='undefined'?window:globalThis);
