/* Finot Académie — corrections pédagogiques pas à pas.
   Moteur extensible : chaque famille de questions fournit un adaptateur {match, build}.
   Une animation n'est affichée que si l'opération est identifiable sans ambiguïté ET si le résultat recalculé
   correspond à la réponse attendue. Sinon la correction historique reste seule, sans explication inventée. */
(function(){
'use strict';
if(typeof window==='undefined'||typeof document==='undefined'||typeof ACT!=='object')return;

const ADAPTERS=[];
const INST=new Map();
let SEQ=0;

const escC=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const plain=s=>String(s??'')
 .replace(/<[^>]*>/g,' ')
 .replace(/&nbsp;|&#160;/gi,' ')
 .replace(/&minus;|&#8722;/gi,'−')
 .replace(/&times;|&#215;/gi,'×')
 .replace(/&divide;|&#247;/gi,'÷')
 .replace(/&lt;/gi,'<').replace(/&gt;/gi,'>')
 .replace(/\s+/g,' ').trim();
const posName=(i,n)=>{const p=n-1-i;return ['unités','dizaines','centaines','milliers','dizaines de milliers','centaines de milliers'][p]||`colonne ${p+1}`;};
const digits=(n,len)=>String(Math.trunc(Math.abs(n))).padStart(len,'0').split('').map(Number);
const hidePad=(arr,n)=>{const keep=Math.max(1,String(Math.trunc(Math.abs(n))).length),cut=Math.max(0,arr.length-keep);return arr.map((v,i)=>i<cut?'':v);};
const grouped=n=>Number(n).toLocaleString('fr-FR');
const gcd=(a,b)=>{a=Math.abs(Math.trunc(a));b=Math.abs(Math.trunc(b));while(b)[a,b]=[b,a%b];return a||1;};
const close=(a,b)=>Number.isFinite(+a)&&Number.isFinite(+b)&&Math.abs(+a-(+b))<1e-9;
const decimalValue=s=>Number(String(s).replace(/[   ]/g,'').replace(',','.'));
const decimalPlaces=s=>{const m=String(s).replace(',','.').match(/\.(\d+)/);return m?m[1].length:0;};
const frNumber=n=>Number(n).toLocaleString('fr-FR',{maximumFractionDigits:6,useGrouping:false});

function parseIntegerOperation(q){
 if(!q||q.type!=='num'||!Number.isInteger(+q.ans))return null;
 const t=plain(q.q).replace(/[  ]/g,' '),m=t.match(/(?:calcule|calculer|effectue|résous|resous|=|:)?.*?\b(\d[\d ]{0,12})\s*([+−-])\s*(\d[\d ]{0,12})\b/i);
 if(!m)return null;
 const a=+m[1].replace(/\s/g,''),b=+m[3].replace(/\s/g,''),op=m[2]==='+'?'+':'−',expected=op==='+'?a+b:a-b;
 if(!Number.isSafeInteger(a)||!Number.isSafeInteger(b)||a<0||b<0||expected<0||expected!==+q.ans)return null;
 return {a,b,op,answer:expected};
}

function parseMultiplication(q){
 if(!q||q.type!=='num'||!Number.isInteger(+q.ans))return null;
 const t=plain(q.q).replace(/[  ]/g,' '),m=t.match(/\b(\d[\d ]{0,12})\s*[×x*]\s*(\d[\d ]{0,5})\b/i);
 if(!m)return null;
 const a=+m[1].replace(/\s/g,''),b=+m[2].replace(/\s/g,''),answer=a*b;
 if(!Number.isSafeInteger(a)||!Number.isSafeInteger(b)||a<0||b<=0||b>99||answer!==+q.ans)return null;
 return {a,b,op:'×',answer};
}

function parseDecimalMultiplication(q){
 if(!q||q.type!=='num'||!Number.isFinite(+q.ans))return null;
 const t=plain(q.q),m=t.match(/\b(\d+(?:[,.]\d{1,3}))\s*[×x*]\s*(\d{1,2})\b/i);
 if(!m)return null;
 const raw=m[1],a=decimalValue(raw),b=+m[2],scale=decimalPlaces(raw),factor=10**scale,scaled=Math.round(a*factor),product=scaled*b,answer=product/factor;
 if(!Number.isSafeInteger(scaled)||!Number.isSafeInteger(b)||a<0||b<=0||b>99||scale<1||scale>3||!close(answer,q.ans))return null;
 return {a,b,raw,scale,factor,scaled,product,answer:+q.ans,op:'×'};
}

function parseDivision(q){
 if(!q||q.type!=='num'||!Number.isInteger(+q.ans))return null;
 const t=plain(q.q).replace(/[  ]/g,' '),m=t.match(/division(?:\s+euclidienne)?\s+(?:de\s+)?(\d[\d ]*)\s+par\s+(\d[\d ]*).*?\b(quotient|reste)\b/i);
 if(!m)return null;
 const n=+m[1].replace(/\s/g,''),b=+m[2].replace(/\s/g,'');
 if(!Number.isSafeInteger(n)||!Number.isSafeInteger(b)||n<0||b<=0||b>99)return null;
 const ask=m[3].toLowerCase(),quotient=Math.floor(n/b),remainder=n%b,expected=ask==='reste'?remainder:quotient;
 if(expected!==+q.ans)return null;
 return {n,b,ask,quotient,remainder,answer:expected,op:'÷'};
}

function parseDecimalDivision(q){
 if(!q||q.type!=='num'||!Number.isFinite(+q.ans))return null;
 const t=plain(q.q),m=t.match(/quotient\s+d[ée]cimal[^:]*:\s*(\d+)\s*÷\s*(\d+)/i);
 if(!m)return null;
 const n=+m[1],b=+m[2];
 if(!Number.isSafeInteger(n)||!Number.isSafeInteger(b)||n<0||b<=0||b>99)return null;
 const answer=n/b;
 if(Number.isInteger(answer)||!close(answer,q.ans))return null;
 const scaled=Math.round(answer*1000);
 if(!close(scaled/1000,answer))return null;
 return {n,b,answer:+q.ans,quotientInt:Math.floor(n/b),remainder:n%b,op:'÷'};
}

function parseFractionOperation(q){
 if(!q||q.type!=='frac'||!Array.isArray(q.ans)||q.ans.length!==2)return null;
 const an=+q.ans[0],ad=+q.ans[1];
 if(!Number.isInteger(an)||!Number.isInteger(ad)||ad<=0)return null;
 const t=plain(q.q),m=t.match(/\b(\d+)\s*\/\s*(\d+)\s*([+−-])\s*(\d+)\s*\/\s*(\d+)\b/);
 if(!m)return null;
 const a=+m[1],b=+m[2],op=m[3]==='+'?'+':'−',c=+m[4],d=+m[5];
 if(b<=0||d<=0)return null;
 const den=b/gcd(b,d)*d,n1=a*(den/b),n2=c*(den/d),num=op==='+'?n1+n2:n1-n2;
 if(num<0||num*ad!==an*den)return null;
 return {a,b,c,d,op,common:den,n1,n2,num,answerN:an,answerD:ad};
}

function parseIntegerFractionMultiplication(q){
 if(!q||q.type!=='frac'||!Array.isArray(q.ans)||q.ans.length!==2)return null;
 const an=+q.ans[0],ad=+q.ans[1],t=plain(q.q),m=t.match(/\b(\d+)\s*[×x*]\s*(\d+)\s*\/\s*(\d+)\b/i);
 if(!m||!Number.isInteger(an)||!Number.isInteger(ad)||ad<=0)return null;
 const n=+m[1],a=+m[2],b=+m[3],num=n*a;
 if(n<0||a<0||b<=0||num*ad!==an*b)return null;
 return {n,a,b,num,answerN:an,answerD:ad,op:'×'};
}

function additionModel(x){
 const len=Math.max(String(x.a).length,String(x.b).length,String(x.answer).length),A=digits(x.a,len),B=digits(x.b,len),res=Array(len).fill(''),carry=Array(len).fill(''),steps=[];let c=0;
 for(let i=len-1;i>=0;i--){
  const cin=c,total=A[i]+B[i]+cin,d=total%10;res[i]=String(d);c=Math.floor(total/10);
  const carr=[...carry];if(c&&i>0)carr[i-1]=String(c);carry.splice(0,carry.length,...carr);
  const add=cin?` + ${cin} de retenue`:'';let text=`${posName(i,len)} : ${A[i]} + ${B[i]}${add} = ${total}. `;
  text+=c&&i>0?`J’écris <b>${d}</b> et je retiens <b>${c}</b> dans la colonne suivante.`:`J’écris <b>${d}</b>.`;
  steps.push({focus:i,result:[...res],carries:[...carry],displayA:[...A],text});
 }
 steps.push({focus:-1,result:digits(x.answer,len).map(String),carries:[...carry],displayA:[...A],done:true,text:`Vérification : <b>${x.a} + ${x.b} = ${x.answer}</b>.`});
 return {...x,kind:'column',title:'Addition posée',len,A,B,steps};
}

function subtractionModel(x){
 const len=Math.max(String(x.a).length,String(x.b).length),A=digits(x.a,len),B=digits(x.b,len),work=[...A],res=Array(len).fill(''),steps=[];
 for(let i=len-1;i>=0;i--){
  const before=work[i],changed=[];let borrowed=false,from=-1;
  if(work[i]<B[i]){borrowed=true;from=i-1;while(from>=0&&work[from]===0)from--;if(from<0)return null;work[from]--;changed.push(from);for(let k=from+1;k<i;k++){work[k]=9;changed.push(k);}work[i]+=10;changed.push(i);}
  const d=work[i]-B[i];res[i]=String(d);let text=`${posName(i,len)} : `;
  if(borrowed){const crossed=i-from>1;text+=crossed?`${before} est trop petit pour enlever ${B[i]}. J’emprunte à gauche en traversant ${i-from-1} colonne${i-from-1>1?'s':''} : j’obtiens ${work[i]}. `:`${before} est trop petit pour enlever ${B[i]}. J’emprunte 1 à la colonne de gauche : j’obtiens ${work[i]}. `;}
  text+=`${work[i]} − ${B[i]} = <b>${d}</b>.`;
  steps.push({focus:i,result:[...res],carries:Array(len).fill(''),displayA:[...work],borrowed:changed,text});
 }
 steps.push({focus:-1,result:digits(x.answer,len).map(String),carries:Array(len).fill(''),displayA:[...work],borrowed:[],done:true,text:`Vérification : <b>${x.a} − ${x.b} = ${x.answer}</b>.`});
 return {...x,kind:'column',title:'Soustraction posée',len,A,B,steps};
}

function multiplicationModel(x){
 const steps=[];
 if(x.b<10){
  const aDigits=String(x.a).split('').map(Number),width=String(x.answer).length,out=Array(width).fill(''),offset=width-aDigits.length;let carry=0;
  for(let i=aDigits.length-1;i>=0;i--){
   const cin=carry,total=aDigits[i]*x.b+cin,d=total%10,pos=offset+i;out[pos]=String(d);carry=Math.floor(total/10);
   if(i===0&&carry){const cs=String(carry);for(let k=0;k<cs.length;k++)out[k]=cs[k];}
   const extra=cin?` + ${cin} de retenue`:'';
   let text=`${aDigits[i]} × ${x.b}${extra} = ${total}. `;
   if(i===0&&carry)text+=`C’est la dernière colonne : j’écris <b>${total}</b> pour terminer.`;
   else text+=`J’écris <b>${d}</b>${carry&&i>0?` et je retiens <b>${carry}</b>`:''}.`;
   steps.push({work:[...out],carry,text});
  }
 }else{
  const units=x.b%10,tens=x.b-units,p1=x.a*units,p2=x.a*tens;
  steps.push({partials:[p1],text:`Première ligne : <b>${grouped(x.a)} × ${units} = ${grouped(p1)}</b>.`});
  steps.push({partials:[p1,p2],text:`Deuxième ligne : ${Math.floor(x.b/10)} dizaine${Math.floor(x.b/10)>1?'s':''}, donc <b>${grouped(x.a)} × ${tens} = ${grouped(p2)}</b>. Cette ligne est décalée d’un rang.`});
  steps.push({partials:[p1,p2],sum:x.answer,text:`J’additionne les deux lignes : ${grouped(p1)} + ${grouped(p2)} = <b>${grouped(x.answer)}</b>.`});
 }
 steps.push({partials:x.b<10?[]:steps[steps.length-1]?.partials,work:x.b<10?String(x.answer).split(''):undefined,sum:x.answer,done:true,text:`Vérification : <b>${grouped(x.a)} × ${x.b} = ${grouped(x.answer)}</b>.`});
 return {...x,kind:'multiplication',title:'Multiplication posée',steps};
}

function decimalMultiplicationModel(x){
 const steps=[
  {formula:`${frNumber(x.a)} × ${x.b} → ${x.scaled} × ${x.b}`,text:`Je retire provisoirement la virgule de <b>${frNumber(x.a)}</b>. Comme il y a ${x.scale} chiffre${x.scale>1?'s':''} après la virgule, je calcule d’abord avec <b>${x.scaled}</b>.`},
  {formula:`${x.scaled} × ${x.b} = ${x.product}`,text:`Sans virgule : <b>${x.scaled} × ${x.b} = ${x.product}</b>.`},
  {formula:`${x.product} → ${frNumber(x.answer)}`,done:true,text:`Je replace la virgule de ${x.scale} rang${x.scale>1?'s':''} : <b>${frNumber(x.answer)}</b>. Vérification : ${frNumber(x.a)} × ${x.b} = ${frNumber(x.answer)}.`}
 ];
 return {...x,kind:'simple',title:'Multiplication décimale',steps};
}

function divisionModel(x){
 const ds=String(x.n).split('').map(Number),steps=[];let rem=0,qtxt='',started=false;
 for(let i=0;i<ds.length;i++){
  const cur=rem*10+ds[i],qd=Math.floor(cur/x.b),next=cur%x.b;
  if(qd||started){started=true;qtxt+=String(qd);}else if(i===ds.length-1)qtxt='0';
  const lowered=i?`J’abaisse le chiffre <b>${ds[i]}</b> : j’obtiens ${cur}. `:'';const small=!started&&cur<x.b&&i<ds.length-1;
  const text=small?`${cur} est plus petit que ${x.b} : je prends aussi le chiffre suivant.`:`${lowered}Dans ${cur}, ${x.b} va <b>${qd} fois</b> (${x.b} × ${qd} = ${x.b*qd}). Il reste <b>${next}</b>.`;
  rem=next;steps.push({current:cur,quotient:qtxt||'—',remainder:rem,digit:i,text});
 }
 steps.push({quotient:String(x.quotient),remainder:x.remainder,done:true,text:`Vérification : <b>${grouped(x.n)} = ${x.b} × ${grouped(x.quotient)} + ${x.remainder}</b>. ${x.ask==='reste'?`Le reste demandé est <b>${x.remainder}</b>.`:`Le quotient demandé est <b>${grouped(x.quotient)}</b>.`}`});
 return {...x,kind:'division',title:'Division euclidienne',steps};
}

function decimalDivisionModel(x){
 const steps=[],intQ=x.quotientInt;let rem=x.remainder,shown=String(intQ),digitsAfter=0;
 steps.push({formula:`${x.n} = ${x.b} × ${intQ} + ${rem}`,text:`Je commence par la partie entière : ${x.b} va <b>${intQ} fois</b> dans ${x.n}. Il reste <b>${rem}</b>.`});
 while(rem&&digitsAfter<3){
  const current=rem*10,digit=Math.floor(current/x.b),next=current%x.b;
  shown+=(digitsAfter===0?',':'')+String(digit);digitsAfter++;
  steps.push({formula:`${current} ÷ ${x.b} → ${digit}, reste ${next}`,text:`Je passe aux ${digitsAfter===1?'dixièmes':digitsAfter===2?'centièmes':'millièmes'} : ${rem} devient ${current}. ${x.b} va <b>${digit} fois</b> dans ${current}. Le quotient devient <b>${shown}</b>.`});
  rem=next;
 }
 steps.push({formula:`${x.n} ÷ ${x.b} = ${frNumber(x.answer)}`,done:true,text:`Le reste est nul : <b>${x.n} ÷ ${x.b} = ${frNumber(x.answer)}</b>. Vérification : ${x.b} × ${frNumber(x.answer)} = ${x.n}.`});
 return {...x,kind:'simple',title:'Division décimale',steps};
}

function fractionModel(x){
 const steps=[];
 if(x.b!==x.common||x.d!==x.common)steps.push({leftN:x.n1,rightN:x.n2,den:x.common,text:`Je mets les deux fractions au même dénominateur : <b>${x.a}/${x.b} = ${x.n1}/${x.common}</b> et <b>${x.c}/${x.d} = ${x.n2}/${x.common}</b>.`});
 else steps.push({leftN:x.a,rightN:x.c,den:x.common,text:`Les deux fractions ont déjà le même dénominateur <b>${x.common}</b>.`});
 steps.push({leftN:x.n1,rightN:x.n2,den:x.common,num:x.num,text:`Je ${x.op==='+'?'additionne':'soustrais'} les numérateurs et je garde le dénominateur : <b>${x.n1} ${x.op} ${x.n2} = ${x.num}</b>, donc <b>${x.num}/${x.common}</b>.`});
 const same=x.num===x.answerN&&x.common===x.answerD;
 steps.push({num:x.answerN,den:x.answerD,done:true,text:same?`Résultat : <b>${x.answerN}/${x.answerD}</b>.`:`${x.num}/${x.common} est équivalent à la réponse attendue <b>${x.answerN}/${x.answerD}</b>.`});
 return {...x,kind:'fraction',title:'Calcul de fractions',steps};
}

function integerFractionMultiplicationModel(x){
 const steps=[
  {formula:`${x.n} = ${x.n}/1`,text:`J’écris l’entier sous forme de fraction : <b>${x.n} = ${x.n}/1</b>.`},
  {formula:`${x.n}/1 × ${x.a}/${x.b} = ${x.num}/${x.b}`,text:`Je multiplie les numérateurs : ${x.n} × ${x.a} = <b>${x.num}</b>. Le dénominateur reste ${x.b}, donc j’obtiens <b>${x.num}/${x.b}</b>.`},
  {formula:`${x.answerN}/${x.answerD}`,done:true,text:x.num===x.answerN&&x.b===x.answerD?`Résultat : <b>${x.answerN}/${x.answerD}</b>.`:`${x.num}/${x.b} est équivalent à <b>${x.answerN}/${x.answerD}</b>.`}
 ];
 return {...x,kind:'simple',title:'Multiplier un entier par une fraction',steps};
}

function register(name,match,build,priority=100){
 if(typeof match!=='function'||typeof build!=='function')throw new TypeError('Adaptateur de correction invalide');
 const a={name:String(name),match,build,priority:+priority||100};const i=ADAPTERS.findIndex(x=>x.name===a.name);
 if(i>=0)ADAPTERS[i]=a;else ADAPTERS.push(a);ADAPTERS.sort((a,b)=>a.priority-b.priority);return a;
}
function modelFor(ctx){for(const a of ADAPTERS){try{if(a.match(ctx)){const m=a.build(ctx);if(m&&Array.isArray(m.steps)&&m.steps.length)return {...m,adapter:a.name};}}catch(e){try{console.warn('[Finot corrections] adaptateur',a.name,e);}catch(_){}}}return null;}

register('addition-posée',ctx=>parseIntegerOperation(ctx.q)?.op==='+',ctx=>additionModel(parseIntegerOperation(ctx.q)),10);
register('soustraction-posée',ctx=>parseIntegerOperation(ctx.q)?.op==='−',ctx=>subtractionModel(parseIntegerOperation(ctx.q)),20);
register('multiplication-posée',ctx=>!!parseMultiplication(ctx.q),ctx=>multiplicationModel(parseMultiplication(ctx.q)),30);
register('multiplication-décimale',ctx=>!!parseDecimalMultiplication(ctx.q),ctx=>decimalMultiplicationModel(parseDecimalMultiplication(ctx.q)),35);
register('division-euclidienne',ctx=>!!parseDivision(ctx.q),ctx=>divisionModel(parseDivision(ctx.q)),40);
register('division-décimale',ctx=>!!parseDecimalDivision(ctx.q),ctx=>decimalDivisionModel(parseDecimalDivision(ctx.q)),45);
register('fractions-calcul',ctx=>!!parseFractionOperation(ctx.q),ctx=>fractionModel(parseFractionOperation(ctx.q)),50);
register('entier-fois-fraction',ctx=>!!parseIntegerFractionMultiplication(ctx.q),ctx=>integerFractionMultiplicationModel(parseIntegerFractionMultiplication(ctx.q)),55);

function cell(v,i,step,cls=''){const focus=step.focus===i?' mq-corr-focus':'',borrow=(step.borrowed||[]).includes(i)?' mq-corr-borrow':'';return `<span class="${cls}${focus}${borrow}">${v===''?'&nbsp;':escC(v)}</span>`;}
function columnBoard(m,step){
 const style=`--digits:${m.len}`,rawTop=step.displayA||m.A,topVals=hidePad(rawTop,m.a),bottomVals=hidePad(m.B,m.b),rawOut=step.result||[],outVals=step.done?hidePad(rawOut,m.answer):rawOut;
 const carries=(step.carries||Array(m.len).fill('')).map((v,i)=>cell(v,i,step,'mq-corr-carry')).join(''),top=topVals.map((v,i)=>cell(v,i,step)).join(''),bottom=bottomVals.map((v,i)=>cell(v,i,step)).join(''),outCells=outVals.map((v,i)=>cell(v,i,step)).join('');
 return `<div class="mq-corr-op" style="${style}"><div class="mq-corr-row"><span class="mq-op"></span>${carries}</div><div class="mq-corr-row"><span class="mq-op"></span>${top}</div><div class="mq-corr-row"><span class="mq-op">${m.op}</span>${bottom}</div><div class="mq-corr-row mq-corr-line"><span class="mq-op"></span>${outCells}</div></div>`;
}
function multiplicationBoard(m,step){
 if(m.b<10){const work=(step.work||Array(String(m.answer).length).fill('')).map(x=>x||'·').join(' ');return `<div class="mq-corr-eq"><div>${grouped(m.a)}</div><div class="mq-corr-eq-op">× ${m.b}</div><hr><div>${escC(work)}</div>${step.carry?`<small>retenue : ${step.carry}</small>`:''}</div>`;}
 const parts=step.partials||[];return `<div class="mq-corr-eq"><div>${grouped(m.a)} × ${m.b}</div><hr>${parts.map((x,i)=>`<div class="mq-corr-part">${i?'2e':'1re'} ligne : ${grouped(x)}</div>`).join('')}${step.sum!=null?`<div class="mq-corr-eq-answer">= ${grouped(step.sum)}</div>`:''}</div>`;
}
function divisionBoard(m,step){return `<div class="mq-corr-eq"><div>${grouped(m.n)} ÷ ${m.b}</div><hr><div>Quotient : <b>${escC(step.quotient??'—')}</b></div><div>Reste : <b>${escC(step.remainder??'—')}</b></div>${step.current!=null&&!step.done?`<small>nombre étudié : ${step.current}</small>`:''}</div>`;}
function fractionBoard(m,step){let formula;if(step.leftN!=null)formula=`${step.leftN}/${step.den} ${m.op} ${step.rightN}/${step.den}`;else formula=`${m.a}/${m.b} ${m.op} ${m.c}/${m.d}`;if(step.num!=null)formula+=` = ${step.num}/${step.den}`;return `<div class="mq-corr-eq mq-corr-frac"><div>${escC(formula)}</div>${step.done?`<div class="mq-corr-eq-answer">${m.answerN}/${m.answerD}</div>`:''}</div>`;}
function simpleBoard(m,step){return `<div class="mq-corr-eq"><div>${escC(step.formula||'')}</div>${step.done?'<div class="mq-corr-eq-answer">✓</div>':''}</div>`;}
function board(m,step){if(m.kind==='column')return columnBoard(m,step);if(m.kind==='multiplication')return multiplicationBoard(m,step);if(m.kind==='division')return divisionBoard(m,step);if(m.kind==='fraction')return fractionBoard(m,step);if(m.kind==='simple')return simpleBoard(m,step);return'';}

function renderInstance(id){
 const s=INST.get(id);if(!s)return'';const step=s.model.steps[s.index],last=s.model.steps.length-1;
 return `<section class="mq-corr" data-corr="${id}"><div class="mq-corr-head"><img src="data/images/finot/03-expression-encouragement.jpg" alt="" aria-hidden="true"><div><b>Finot te montre au tableau</b><small>${escC(s.model.title||'Correction')} · pas à pas</small></div></div><div class="mq-corr-board mq-corr-step-in">${board(s.model,step)}<div class="mq-corr-text ${step.done?'mq-corr-done':''}">${step.text}</div><div class="mq-corr-count">Étape ${s.index+1} / ${s.model.steps.length}</div></div><div class="mq-corr-controls"><button class="btn" data-a="corrprev:${id}" ${s.index<=0?'disabled':''}>← Précédent</button><button class="btn primary mq-corr-next" data-a="corrnext:${id}" ${s.index>=last?'disabled':''}>${s.index>=last?'Terminé ✓':'Étape suivante →'}</button><button class="btn mq-corr-replay" data-a="corrreplay:${id}">↺ Recommencer</button></div></section>`;
}
function paint(id){const safe=String(id).replace(/[^a-z0-9_-]/gi,''),el=document.querySelector(`[data-corr="${safe}"]`),s=INST.get(String(id));if(!el||!s)return;const wrap=document.createElement('div');wrap.innerHTML=renderInstance(String(id));el.replaceWith(wrap.firstElementChild);}
function mount(ctx){const model=modelFor(ctx);if(!model)return false;const fb=document.querySelector('#fb .fb.bad,.lfb.bad,.lesson-feedback.bad');if(!fb)return false;const id='c'+(++SEQ).toString(36);INST.clear();INST.set(id,{model,index:0,cid:ctx.cid});fb.insertAdjacentHTML('beforeend',renderInstance(id));return true;}

ACT.corrprev=id=>{const s=INST.get(String(id));if(!s)return;s.index=Math.max(0,s.index-1);paint(String(id));};
ACT.corrnext=id=>{const s=INST.get(String(id));if(!s)return;s.index=Math.min(s.model.steps.length-1,s.index+1);paint(String(id));};
ACT.corrreplay=id=>{const s=INST.get(String(id));if(!s)return;s.index=0;paint(String(id));};

if(window.MQHooks){
 MQHooks.on('answer:after',x=>{if(!x?.ok&&x.mode!=='flash')setTimeout(()=>mount({q:x.q,cid:x.cid,mode:x.mode,M:x.M,L:x.L}),0);},{id:'animated-corrections',order:70});
 MQHooks.on('question:after-render',()=>INST.clear(),{id:'animated-corrections-clear',order:5});
 MQHooks.on('profile:changed',()=>INST.clear(),{id:'animated-corrections-profile',order:5});
}

window.MQCorrections={
 version:'3.1',register,modelFor,
 parseIntegerOperation,parseMultiplication,parseDecimalMultiplication,parseDivision,parseDecimalDivision,parseFractionOperation,parseIntegerFractionMultiplication,
 additionModel,subtractionModel,multiplicationModel,decimalMultiplicationModel,divisionModel,decimalDivisionModel,fractionModel,integerFractionMultiplicationModel,
 get adapters(){return ADAPTERS.map(x=>x.name);}
};
})();
