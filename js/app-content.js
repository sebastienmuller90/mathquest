/* ===== Utilitaires ===== */
const R=(a,b)=>Math.floor(Math.random()*(b-a+1))+a;
const P=a=>a[Math.floor(Math.random()*a.length)];
const gcd=(a,b)=>{a=Math.abs(a);b=Math.abs(b);while(b){[a,b]=[b,a%b];}return a;};
const rd=x=>Math.round(x*1e6)/1e6;
const F=x=>rd(x).toLocaleString('fr-FR',{maximumFractionDigits:6}).replace(/-/g,'−');
const Pn=x=>x<0?`(${F(x)})`:F(x);
const nz=(a,b)=>{let x=0;while(x===0)x=R(a,b);return x;};
const fr=(n,d)=>`<span class="fr"><span>${n}</span><span>${d}</span></span>`;
const sup=n=>`<sup>${n}</sup>`;
const shuffle=a=>{for(let i=a.length-1;i>0;i--){const j=R(0,i);[a[i],a[j]]=[a[j],a[i]];}return a;};
const isPrime=n=>{if(n<2)return false;for(let i=2;i*i<=n;i++)if(n%i===0)return false;return true;};
const affine=(a,b)=>{let s=a===0?'':a===1?'x':a===-1?'−x':F(a)+'x';if(b===0)return s||'0';if(!s)return F(b);return s+(b>0?` + ${b}`:` − ${-b}`);};

const Q={
  num:(q,ans,o={})=>({type:'num',q,ans:rd(ans),...o}),
  frac:(q,n,d,o={})=>({type:'frac',q,ans:[n,d],...o}),
  txt:(q,acc,o={})=>({type:'text',q,acc,...o}),
  multi:(q,labels,ans,o={})=>({type:'multi',q,labels,ans,...o}),
  // Les distracteurs identiques à la bonne réponse (ou entre eux) sont retirés : aucune réponse juste ne peut être comptée fausse.
  ch:(q,good,bad,o={})=>{const k=x=>String(x).replace(/<[^>]*>/g,'').replace(/\s+/g,' ').trim(),seen=new Set([k(good)]),u=[];(bad||[]).forEach(b=>{const x=k(b);if(x&&!seen.has(x)){seen.add(x);u.push(b);}});const c=shuffle([good,...u]);return{type:'choice',q,choices:c,ans:c.indexOf(good),...o};}
};


/* ===== Kit langues ===== */
const E=t=>`<span lang="en">${t}</span>`,IT=t=>`<span lang="it">${t}</span>`;
const LW=l=>l==='en'?E:IT,LNM=l=>l==='en'?'anglais':'italien',LV=l=>l==='en'?'en-GB':'it-IT';
function vq(bank,lang,d){const W=LW(lang),it=P(bank),tg=String(it[1]).split(';'),oth=shuffle(bank.filter(b=>b!==it&&b[0]!==it[0]&&String(b[1]).split(';')[0]!==tg[0])).slice(0,3);
 const f=d===1?R(0,1):d===2?R(1,2):R(2,3),ex=`« ${it[0]} » = ${W(tg[0])}`;
 if(f===0)return Q.ch(`Comment dit-on <b>« ${it[0]} »</b> en ${LNM(lang)} ?`,W(tg[0]),oth.map(o=>W(String(o[1]).split(';')[0])),{lang,hint:`Ça commence par « ${tg[0][0]} ».`,expl:ex});
 if(f===1)return Q.ch(`Que veut dire ${W('<b>'+tg[0]+'</b>')} ?`,it[0],oth.map(o=>o[0]),{lang,hint:'Clique sur le mot pour l’écouter.',expl:ex});
 if(f===2)return Q.ch('🎧 Écoute, puis choisis la traduction.',it[0],oth.map(o=>o[0]),{lang,audio:{t:tg[0],l:LV(lang)},hint:'Réécoute en mode lent si besoin.',expl:`Tu as entendu ${W(tg[0])}. ${ex}`});
 return Q.txt(`Écris en ${LNM(lang)} : <b>« ${it[0]} »</b>`,tg,{lang,hint:`Ça commence par « ${tg[0][0]} » (${tg[0].length} lettres).`,expl:ex});}
function fq(items,lang,d){const W=LW(lang),[s,a,w,fr,h]=P(items),acc=a.split(';'),wr=w.split('|');
 const gap=s.replace('___','<span class="gap">___</span>'),tr=fr?`<div class="trad">${fr}</div>`:'',ex=W(s.replace('___','<b>'+acc[0]+'</b>'));
 if(d===1||(d===2&&Math.random()<.5))return Q.ch(`Complète : ${W(gap)}${tr}`,W(acc[0]),shuffle(wr).slice(0,3).map(W),{lang,hint:h||'Relis la phrase et sa traduction.',expl:ex});
 return Q.txt(`Complète : ${W(gap)}${tr}`,acc,{lang,hint:h||`Ça commence par « ${acc[0][0]} ».`,expl:ex});}
function oq(items,lang){const [s,fr]=P(items),toks=s.replace(/[.?!]$/,'').split(' ');let sh=shuffle([...toks]),k=0;while(sh.join(' ')===toks.join(' ')&&toks.length>1&&k++<20)sh=shuffle([...toks]);
 return {type:'order',q:`Remets les mots dans l’ordre :<div class="trad">« ${fr} »</div>`,tokens:sh,ans:toks.join(' '),lang,hint:`La phrase commence par « ${toks[0]} ».`,expl:LW(lang)(s)};}
function lmix(d,lang,o){const g=[];if(o.v)g.push(()=>vq(o.v,lang,d));if(o.f)g.push(()=>fq(o.f,lang,d));if(o.x){g.push(()=>o.x(d));g.push(()=>o.x(d));}if(o.o&&(d>1||g.length===0))g.push(()=>oq(o.o,lang));return P(g)();}

/* ===== Figures SVG ===== */
const SV={
  rect:(a,b)=>`<svg class="fig" viewBox="0 0 260 150" aria-hidden="true"><rect x="50" y="20" width="160" height="90" rx="4" class="sh"/><text x="130" y="138" text-anchor="middle">${a}</text><text x="218" y="70">${b}</text></svg>`,
  tri:(ab,ac,bc)=>`<svg class="fig" viewBox="0 0 260 172" aria-hidden="true"><path d="M50 140 L220 140 L50 25 Z" class="sh"/><path d="M50 124 L66 124 L66 140" class="ln"/><text x="34" y="158">A</text><text x="226" y="158">B</text><text x="34" y="24">C</text><text x="135" y="164" text-anchor="middle">${ab}</text><text x="42" y="88" text-anchor="end">${ac}</text><text x="150" y="76">${bc}</text></svg>`,
  angle:v=>{const r=v*Math.PI/180,ox=130,oy=120,L=105;const x2=ox+L*Math.cos(r),y2=oy-L*Math.sin(r);const ax=ox+30*Math.cos(r),ay=oy-30*Math.sin(r);
    const arc=v===90?`<path d="M${ox+18} ${oy} L${ox+18} ${oy-18} L${ox} ${oy-18}" class="ln"/>`:`<path d="M${ox+30} ${oy} A30 30 0 0 0 ${ax.toFixed(1)} ${ay.toFixed(1)}" class="ac"/>`;
    return `<svg class="fig" viewBox="0 0 260 140" aria-hidden="true"><line x1="${ox}" y1="${oy}" x2="${ox+115}" y2="${oy}" class="ray"/><line x1="${ox}" y1="${oy}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" class="ray"/>${arc}<circle cx="${ox}" cy="${oy}" r="5" class="dot"/></svg>`;},
  thales:()=>`<svg class="fig" viewBox="0 0 260 172" aria-hidden="true"><path d="M130 20 L30 150 L230 150 Z" class="sh"/><line x1="84" y1="79.8" x2="176" y2="79.8" class="ray"/><text x="124" y="15">A</text><text x="12" y="164">B</text><text x="236" y="164">C</text><text x="62" y="82">M</text><text x="182" y="82">N</text></svg>`
};

/* ===== Correction ===== */
function parseNum(s){s=String(s).trim().replace(/\s/g,'').replace(/−/g,'-').replace(/,/g,'.');if(!s)return NaN;
  if(s.includes('/')){const p=s.split('/');if(p.length!==2||p[0]===''||p[1]==='')return NaN;const x=Number(p[0]),y=Number(p[1]);if(!isFinite(x)||!isFinite(y)||y===0)return NaN;return x/y;}
  if(!/^[-+]?\d*\.?\d+$/.test(s))return NaN;return Number(s);}
function normTxt(s){return String(s).toLowerCase().replace(/\s/g,'').replace(/−/g,'-').replace(/[*×]/g,'').replace(/,/g,'.').replace(/\^2/g,'²');}
const CONTR={"i'm":'i am',"you're":'you are',"we're":'we are',"they're":'they are',"he's":'he is',"she's":'she is',"it's":'it is',"isn't":'is not',"aren't":'are not',"wasn't":'was not',"weren't":'were not',"don't":'do not',"doesn't":'does not',"didn't":'did not',"can't":'cannot',"won't":'will not',"haven't":'have not',"hasn't":'has not',"i've":'i have',"you've":'you have',"we've":'we have',"they've":'they have',"shouldn't":'should not',"couldn't":'could not',"wouldn't":'would not',"mustn't":'must not',"there's":'there is',"i'll":'i will',"you'll":'you will',"he'll":'he will',"she'll":'she will',"we'll":'we will',"they'll":'they will',"i'd":'i would',"'ve":'have',"'m":'am',"'re":'are',"'ll":'will',"'d":'would'};
function normLang(s,lang){s=String(s).toLowerCase().replace(/[’‘`´]/g,"'").normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[.,!?;:«»"()…]/g,' ').replace(/-/g,' ').replace(/\s+/g,' ').trim();
 if(lang==='en')s=s.split(' ').map(w=>CONTR[w]||w).join(' ').replace(/\bcan not\b/g,'cannot');return s;}
const normStrict=s=>String(s).replace(/[’‘`´]/g,"'").replace(/[  ]/g,' ').toLowerCase().replace(/\s+/g,' ').replace(/\s*([',-])\s*/g,'$1').trim().replace(/\s*[.!?…]+$/,'').trim();
function check(q,v){
  if(q.type==='text'&&q.strict)return q.acc.some(a=>normStrict(a)===normStrict(v));
  // Comparaison stricte (pas de normLang) : v et q.ans sont toujours reconstruits à partir des mêmes
  // chaînes de q.tokens (jamais tapées par l'élève) — normaliser les risquait de fusionner des jetons
  // numériques décimaux (la virgule de « 1,1 » devenait un espace, créant des égalités accidentelles
  // avec d'autres jetons voisins comme « 1 » ou « 8,8 »).
  if(q.type==='order')return v===q.ans;
  if(q.type==='text'&&q.lang){const n=normLang(v,q.lang);return q.acc.some(a=>normLang(a,q.lang)===n);}
  if(q.type==='choice')return v===q.ans;
  if(q.type==='num'){const x=parseNum(v);return !isNaN(x)&&Math.abs(x-q.ans)<=(q.tol||1e-6);}
  if(q.type==='frac'){const x=parseNum(v),t=q.ans[0]/q.ans[1];if(isNaN(x)||Math.abs(x-t)>1e-6)return false;
    if(q.simplest){const s=String(v).replace(/\s/g,'').replace(/−/g,'-');if(!s.includes('/'))return Number.isInteger(t);const [a,b]=s.split('/').map(Number);return Number.isInteger(a)&&Number.isInteger(b)&&b>0&&gcd(a,b)===1;}
    return true;}
  if(q.type==='text'){const n=normTxt(v);return q.acc.some(a=>normTxt(a)===n);}
  if(q.type==='multi'){const xs=v.map(parseNum);if(xs.some(isNaN))return false;let a=[...q.ans],b=[...xs];if(q.unordered){a.sort((p,r)=>p-r);b.sort((p,r)=>p-r);}return a.every((y,i)=>Math.abs(y-b[i])<1e-6);}
  return false;}
function answerText(q){
  if(q.type==='choice')return q.choices[q.ans];
  if(q.type==='num')return F(q.ans)+(q.unit?' '+q.unit:'');
  if(q.type==='frac')return `${q.ans[0]}/${q.ans[1]}`;
  if(q.type==='order')return q.ans;
  if(q.type==='text'&&(q.lang||q.strict))return q.acc[0];
  if(q.type==='text')return q.acc[0].replace(/-/g,' − ').replace(/\+/g,' + ');
  if(q.type==='multi')return q.labels.map((l,i)=>`${l} = ${F(q.ans[i])}`).join(' et ');
}

/* ===== Programme 6e → 3e ===== */
const CH={
'6':[
{id:'6a',name:'Comparer les décimaux',icon:'🔢',
 f:{t:'Comparer des nombres décimaux',l:['Compare d’abord la partie entière (avant la virgule).','Si elle est pareille, compare les dixièmes, puis les centièmes…','Astuce : ajoute des zéros. 3,5 = 3,50'],ex:'3,5 > 3,45 car 3,50 > 3,45'},
 g(d){const b=R(0,d*4+1),ks=[10,100,1000].slice(0,d),s=new Set();let k=0;while(s.size<4&&k++<200){const m=P(ks);s.add(rd(b+R(1,m-1)/m));}while(s.size<4)s.add(rd(b+s.size+.5));
  const a=[...s],big=Math.random()<.5,t=big?Math.max(...a):Math.min(...a);
  return Q.ch(`Quel est le <b>plus ${big?'grand':'petit'}</b> nombre ?`,F(t),a.filter(x=>x!==t).map(F),{hint:'Écris-les tous avec 3 chiffres après la virgule, puis compare.',expl:`Avec 3 décimales : ${a.map(x=>x.toFixed(3).replace('.',',')).join(' ; ')}. Le plus ${big?'grand':'petit'} est ${F(t)}.`});}},
{id:'6b',name:'Additionner, soustraire',icon:'➕',
 f:{t:'Poser une addition de décimaux',l:['Aligne les virgules les unes sous les autres.','Complète avec des zéros si besoin.','Calcule comme avec des entiers, puis replace la virgule.'],ex:'12,5 + 3,75 = 12,50 + 3,75 = 16,25'},
 g(d){let a=rd(d===1?R(11,99)/10:R(101,999)/(d===2?10:100)),b=rd(d===3?R(11,999)/100:R(11,99)/10);const h='Aligne les virgules et complète avec des zéros.';
  if(Math.random()<.5){if(a<b)[a,b]=[b,a];const r=rd(a-b);return Q.num(`${F(a)} − ${F(b)} = ?`,r,{hint:h,expl:`${F(a)} − ${F(b)} = ${F(r)}`});}
  const r=rd(a+b);return Q.num(`${F(a)} + ${F(b)} = ?`,r,{hint:h,expl:`${F(a)} + ${F(b)} = ${F(r)}`});}},
{id:'6c',name:'Multiplier',icon:'✖️',
 f:{t:'Multiplier',l:['Les tables de multiplication sont la base de tout.','× 10, × 100, × 1000 : la virgule avance de 1, 2 ou 3 rangs vers la droite.','Décimal × entier : calcule sans la virgule, puis replace-la.'],ex:'2,5 × 4 = 10 et 3,7 × 100 = 370'},
 g(d){let a,b;if(d===1){a=R(2,10);b=R(2,10);}else if(d===2){a=R(11,99);b=R(2,9);}else if(Math.random()<.5){a=rd(R(11,999)/100);b=P([10,100,1000]);}else{a=rd(R(11,99)/10);b=R(2,9);}
  const r=rd(a*b);return Q.num(`${F(a)} × ${F(b)} = ?`,r,{hint:b>=10?'La virgule se déplace vers la droite d’autant de rangs que de zéros.':'Décompose : 23 × 4 = 20 × 4 + 3 × 4.',expl:`${F(a)} × ${F(b)} = ${F(r)}`});}},
{id:'6d',name:'Division euclidienne',icon:'➗',
 f:{t:'Division euclidienne',l:['a = b × quotient + reste','Le reste est toujours plus petit que le diviseur.','Cherche le plus grand multiple du diviseur qui ne dépasse pas a.'],ex:'47 = 5 × 9 + 2 : quotient 9, reste 2'},
 g(d){const b=R(2,[9,12,25][d-1]),q=R(3,[12,30,60][d-1]),r=R(0,b-1),a=b*q+r;
  return Q.multi(`Division euclidienne de <b>${a}</b> par <b>${b}</b>`,['Quotient','Reste'],[q,r],{hint:`Cherche le plus grand multiple de ${b} inférieur ou égal à ${a}.`,expl:`${a} = ${b} × ${q} + ${r}`});}},
{id:'6e',name:'Fraction d’une quantité',icon:'🍕',
 f:{t:'Prendre une fraction d’une quantité',l:['Pour calculer 3/4 de 20 :','1) divise par le dénominateur : 20 ÷ 4 = 5','2) multiplie par le numérateur : 5 × 3 = 15'],ex:'3/4 de 20 = 15'},
 g(d){const den=P(d===1?[2,4,10]:[2,3,4,5,6,8,10]),k=R(2,[5,10,15][d-1]),tot=den*k,n=R(1,den-1),r=n*k,o=P(['bonbons','euros','billes','minutes']);
  return Q.num(`Calcule ${fr(n,den)} de <b>${tot}</b> ${o}.`,r,{hint:`Commence par ${tot} ÷ ${den}.`,expl:`${tot} ÷ ${den} = ${k}, puis ${k} × ${n} = ${r}`});}},
{id:'6f',name:'Périmètre et aire',icon:'📐',
 f:{t:'Rectangle et carré',l:['Périmètre = longueur du tour (en cm).','Rectangle : P = 2 × (L + l) et A = L × l (en cm²)','Carré : P = 4 × c et A = c × c'],ex:'Rectangle 5 cm sur 3 cm : P = 16 cm, A = 15 cm²'},
 g(d){const sq=d===3&&Math.random()<.5,L=R(3,[8,12,20][d-1]),l=sq?L:R(2,L-1),fig=sq?`un carré de côté ${L} cm`:`un rectangle de ${L} cm sur ${l} cm`,svg=SV.rect(L+' cm',l+' cm');
  if(Math.random()<.5){const r=2*(L+l);return Q.num(`<b>Périmètre</b> de ${fig} ?`,r,{unit:'cm',svg,hint:'Le périmètre, c’est le tour : additionne les 4 côtés.',expl:sq?`4 × ${L} = ${r} cm`:`2 × (${L} + ${l}) = ${r} cm`});}
  const r=L*l;return Q.num(`<b>Aire</b> de ${fig} ?`,r,{unit:'cm²',svg,hint:'Aire = longueur × largeur.',expl:`${L} × ${l} = ${r} cm²`});}},
{id:'6g',name:'Aire du triangle',icon:'🔺',
 f:{t:'Aire d’un triangle',l:['A = base × hauteur ÷ 2','Triangle rectangle : base et hauteur sont les 2 côtés de l’angle droit.','C’est la moitié d’un rectangle.'],ex:'Côtés 6 cm et 4 cm : 6 × 4 ÷ 2 = 12 cm²'},
 g(d){const m=[8,12,20][d-1];let a=R(2,m),b=R(2,m);if(a*b%2)b++;const r=a*b/2;
  return Q.num(`Triangle rectangle en A : AB = <b>${a} cm</b>, AC = <b>${b} cm</b>. Son aire ?`,r,{unit:'cm²',svg:SV.tri(a+' cm',b+' cm',''),hint:'C’est la moitié du rectangle de mêmes dimensions.',expl:`${a} × ${b} ÷ 2 = ${r} cm²`});}},
{id:'6h',name:'Les angles',icon:'📏',
 f:{t:'Nature d’un angle',l:['Aigu : entre 0° et 90°','Droit : exactement 90° (le coin d’une feuille)','Obtus : entre 90° et 180°. Plat : 180°'],ex:'45° est aigu, 120° est obtus'},
 g(){const k=R(0,3),v=[R(10,85),90,R(95,175),180][k],N=['aigu','droit','obtus','plat'];
  return Q.ch(`Un angle de <b>${v}°</b> est…`,N[k],N.filter((_,i)=>i!==k),{svg:SV.angle(v),hint:'Compare avec 90° (droit) et 180° (plat).',expl:`${v}° : angle ${N[k]}.`});}},
{id:'6i',name:'Proportionnalité',icon:'🛒',
 f:{t:'Passer par l’unité',l:['Trouve d’abord le prix d’un seul objet.','Puis multiplie par le nombre voulu.'],ex:'3 cahiers = 6 € → 1 cahier = 2 € → 5 cahiers = 10 €'},
 g(d){const it=P([['cahier','cahiers'],['croissant','croissants'],['stylo','stylos'],['ticket','tickets']]),p=d===1?R(2,5):d===2?R(2,12):rd(R(12,45)/10),n1=R(2,6);let n2=R(2,12);if(n2===n1)n2++;const p1=rd(p*n1),r=rd(p*n2);
  return Q.num(`${n1} ${it[1]} coûtent <b>${F(p1)} €</b>. Combien coûtent <b>${n2}</b> ${it[1]} ?`,r,{unit:'€',hint:`Trouve d’abord le prix d’un seul ${it[0]}.`,expl:`1 ${it[0]} = ${F(p1)} ÷ ${n1} = ${F(p)} €, donc ${n2} × ${F(p)} = ${F(r)} €`});}},
{id:'6j',name:'Conversions',icon:'🔄',
 f:{t:'Convertir des longueurs',l:['km | hm | dam | m | dm | cm | mm','Vers une unité plus petite : × 10 par colonne.','Vers une unité plus grande : ÷ 10 par colonne.'],ex:'3,5 m = 350 cm et 1 200 m = 1,2 km'},
 g(d){const U=['km','hm','dam','m','dm','cm','mm'];let i,j;do{i=R(0,6);j=i+P([-1,1])*R(1,Math.min(3,d+1));}while(j<0||j>6);const v=d===1?R(1,20):rd(R(11,999)/10),g=Math.abs(j-i),r=rd(v*Math.pow(10,j-i));
  return Q.num(`${F(v)} ${U[i]} = ? ${U[j]}`,r,{unit:U[j],hint:j>i?'Unité plus petite : le nombre devient plus grand (× 10 par colonne).':'Unité plus grande : le nombre devient plus petit (÷ 10 par colonne).',expl:`${g} colonne${g>1?'s':''} : ${j>i?'×':'÷'} ${Math.pow(10,g)}, donc ${F(v)} ${U[i]} = ${F(r)} ${U[j]}`});}}
],
'5':[
{id:'5a',name:'Priorités opératoires',icon:'🧮',
 f:{t:'L’ordre des calculs',l:['1) Les parenthèses','2) Les × et ÷','3) Les + et −, de gauche à droite'],ex:'2 + 3 × 4 = 2 + 12 = 14'},
 g(d){const a=R(2,9),b=R(2,9),c=R(2,9),t=d===1?R(0,1):d===2?R(2,4):R(5,6);let q,r,e;
  switch(t){case 0:r=a+b*c;q=`${a} + ${b} × ${c}`;e=`× d’abord : ${b} × ${c} = ${b*c}, puis ${a} + ${b*c} = ${r}`;break;
   case 1:r=a*b+c;q=`${a} × ${b} + ${c}`;e=`${a} × ${b} = ${a*b}, puis ${a*b} + ${c} = ${r}`;break;
   case 2:r=(a+b)*c;q=`(${a} + ${b}) × ${c}`;e=`Parenthèses : ${a} + ${b} = ${a+b}, puis ${a+b} × ${c} = ${r}`;break;
   case 3:{const A=b*c+R(1,20);r=A-b*c;q=`${A} − ${b} × ${c}`;e=`${b} × ${c} = ${b*c}, puis ${A} − ${b*c} = ${r}`;break;}
   case 4:{const B=b*c;r=a+c;q=`${a} + ${B} ÷ ${b}`;e=`÷ d’abord : ${B} ÷ ${b} = ${c}, puis ${a} + ${c} = ${r}`;break;}
   case 5:{const h=b+R(1,6);r=a*(h-b)+c;q=`${a} × (${h} − ${b}) + ${c}`;e=`${h} − ${b} = ${h-b}, puis ${a} × ${h-b} = ${a*(h-b)}, puis + ${c} = ${r}`;break;}
   default:{const h=c+R(1,5);r=(a+b)*(h-c);q=`(${a} + ${b}) × (${h} − ${c})`;e=`${a+b} × ${h-c} = ${r}`;}}
  return Q.num(q+' = ?',r,{hint:'Ordre : parenthèses, puis × et ÷, puis + et −.',expl:e});}},
{id:'5b',name:'Nombres relatifs',icon:'🌡️',
 f:{t:'Additionner des relatifs',l:['Même signe : ajoute les distances à zéro, garde le signe.','Signes contraires : soustrais les distances, garde le signe du plus éloigné de zéro.','Soustraire = ajouter l’opposé.'],ex:'−7 + 3 = −4 et 5 − (−2) = 5 + 2 = 7'},
 g(d){const L=d*10,a=nz(-L,L),b=nz(-L,L),plus=Math.random()<.5,r=plus?a+b:a-b;
  return Q.num(`${F(a)} ${plus?'+':'−'} ${Pn(b)} = ?`,r,{hint:plus?'Signes contraires : soustrais les distances à zéro, garde le signe du plus éloigné.':'Soustraire un nombre = ajouter son opposé.',expl:plus?`${F(a)} + ${Pn(b)} = ${F(r)}`:`${F(a)} − ${Pn(b)} = ${F(a)} + ${Pn(-b)} = ${F(r)}`});}},
{id:'5c',name:'Simplifier une fraction',icon:'✂️',
 f:{t:'Simplifier',l:['Divise le numérateur ET le dénominateur par le même nombre.','Recommence jusqu’à ne plus pouvoir.','Écris ta réponse comme ça : 2/3'],ex:'12/18 = 6/9 = 2/3'},
 g(d){let a,b;do{a=R(1,9);b=R(a+1,12);}while(gcd(a,b)!==1);const k=R(2,[5,9,15][d-1]);
  return Q.frac(`Simplifie au maximum : ${fr(k*a,k*b)}`,a,b,{simplest:true,hint:'Essaie de diviser en haut et en bas par 2, 3, 5 ou 7.',expl:`On divise en haut et en bas par ${k} : ${fr(k*a,k*b)} = ${fr(a,b)}`});}},
{id:'5d',name:'Additionner des fractions',icon:'🥧',
 f:{t:'Additionner des fractions',l:['Il faut le même dénominateur.','Si besoin, multiplie en haut ET en bas pour l’obtenir.','Puis ajoute les numérateurs, garde le dénominateur.'],ex:'1/3 + 1/6 = 2/6 + 1/6 = 3/6'},
 g(d){const den=R(3,10),m=d===1?1:R(2,4),D=den*m,n1=R(1,den-1),n2=R(1,D-1),N1=n1*m;let sub=d===3&&Math.random()<.5;if(sub&&N1<=n2)sub=false;const N=sub?N1-n2:N1+n2,o=sub?'−':'+';
  return Q.frac(`${fr(n1,den)} ${o} ${fr(n2,D)} = ?`,N,D,{hint:'Mets les deux fractions au même dénominateur.',expl:(m>1?`${fr(n1,den)} = ${fr(N1,D)}, donc `:'')+`${fr(N1,D)} ${o} ${fr(n2,D)} = ${fr(N,D)}`});}},
{id:'5e',name:'Calcul littéral',icon:'🔤',
 f:{t:'Remplacer une lettre',l:['3x veut dire 3 × x.','x² veut dire x × x.','Remplace x par sa valeur, puis calcule.'],ex:'Pour x = 4 : 3x + 5 = 3 × 4 + 5 = 17'},
 g(d){const a=R(2,9),b=R(1,9),x=d===3?nz(-5,5):R(1,[5,9][d-1]),t=d===1?0:d===2?R(1,2):R(3,4);let e,r;
  switch(t){case 0:e=`${a}x + ${b}`;r=a*x+b;break;case 1:e=`${a}x − ${b}`;r=a*x-b;break;case 2:e=`${a}(x + ${b})`;r=a*(x+b);break;case 3:e=`x² + ${a}x`;r=x*x+a*x;break;default:e=`${a}x² − ${b}`;r=a*x*x-b;}
  const sub=e.replace(/(\d)x/g,'$1 × x').replace(/(\d)\(/g,'$1 × (').replace(/x/g,Pn(x));
  return Q.num(`Calcule <b>${e}</b> pour <b>x = ${F(x)}</b>`,r,{hint:`Remplace x par ${Pn(x)}. Rappel : ${a}x = ${a} × x.`,expl:`${sub} = ${F(r)}`});}},
{id:'5f',name:'Pourcentages',icon:'💯',
 f:{t:'Calculer un pourcentage',l:['t % de N = N × t ÷ 100','10 % : divise par 10. 50 % : la moitié. 25 % : le quart.'],ex:'20 % de 60 = 60 × 20 ÷ 100 = 12'},
 g(d){const t=P([[10,50,25],[10,20,25,50,75,5],[15,30,12,35,60,40]][d-1]),N=R(1,20)*20,r=rd(t*N/100);
  return Q.num(`Calcule <b>${t} %</b> de <b>${N}</b>.`,r,{hint:`${N} × ${t} ÷ 100`,expl:`${N} × ${t} ÷ 100 = ${F(r)}`});}},
{id:'5g',name:'Angles du triangle',icon:'📐',
 f:{t:'Somme des angles',l:['Dans tout triangle : somme des 3 angles = 180°.','Triangle isocèle : les 2 angles à la base sont égaux.'],ex:'50° + 60° + ? = 180° donc ? = 70°'},
 g(d){if(d===3&&Math.random()<.5){const s=R(10,80)*2,r=(180-s)/2;return Q.num(`Triangle isocèle : l’angle principal mesure ${s}°. Combien mesure chaque angle à la base ?`,r,{unit:'°',hint:'Les 2 angles à la base sont égaux et le total fait 180°.',expl:`(180 − ${s}) ÷ 2 = ${r}°`});}
  const a=R(20,100),b=R(20,160-a),r=180-a-b;return Q.num(`Un triangle a deux angles de <b>${a}°</b> et <b>${b}°</b>. Le troisième ?`,r,{unit:'°',hint:'La somme des angles d’un triangle vaut 180°.',expl:`180 − ${a} − ${b} = ${r}°`});}},
{id:'5h',name:'Moyenne',icon:'📊',
 f:{t:'Calculer une moyenne',l:['Additionne toutes les valeurs.','Divise par le nombre de valeurs.'],ex:'Notes 12, 14, 10 : (12 + 14 + 10) ÷ 3 = 12'},
 g(d){const n=d+2,m=R(8,14);let v;do{v=[];let s=0;for(let i=0;i<n-1;i++){const x=m+R(-5,5);v.push(x);s+=x;}v.push(n*m-s);}while(v.some(x=>x<0||x>20));
  return Q.num(`Notes : <b>${v.join(' ; ')}</b>. Moyenne ?`,m,{hint:'Additionne tout, puis divise par le nombre de notes.',expl:`(${v.join(' + ')}) ÷ ${n} = ${n*m} ÷ ${n} = ${m}`});}},
{id:'5i',name:'Divisibilité',icon:'🔍',
 f:{t:'Critères de divisibilité',l:['Par 2 : dernier chiffre pair. Par 5 : finit par 0 ou 5. Par 10 : finit par 0.','Par 3 : somme des chiffres divisible par 3.','Par 9 : somme des chiffres divisible par 9.'],ex:'162 : 1 + 6 + 2 = 9, donc divisible par 3 et par 9'},
 g(d){const RU={2:'dernier chiffre pair',3:'somme des chiffres divisible par 3',5:'dernier chiffre 0 ou 5',9:'somme des chiffres divisible par 9',10:'dernier chiffre 0'};const k=P([2,3,5,9,10]),yes=Math.random()<.5;let N=k*R(12,[50,200,1200][d-1]);if(!yes)N+=R(1,k-1);
  const ds=String(N).split('').reduce((a,c)=>a+ +c,0),x=(k===3||k===9)?` (ici ${ds})`:'';
  return Q.ch(`<b>${N}</b> est-il divisible par <b>${k}</b> ?`,yes?'Oui':'Non',[yes?'Non':'Oui'],{hint:'Règle : '+RU[k]+'.',expl:`Règle : ${RU[k]}${x}. Donc ${yes?'oui':'non'}.`});}},
{id:'5j',name:'Cercle et disque',icon:'⭕',
 f:{t:'Cercle et disque',l:['Périmètre du cercle = 2 × π × r','Aire du disque = π × r × r','On prend π ≈ 3,14. Rayon = diamètre ÷ 2'],ex:'r = 2 cm : P = 12,56 cm et A = 12,56 cm²'},
 g(d){const useD=d===3&&Math.random()<.5,r=R(1,[6,10,15][d-1]),giv=useD?`de diamètre <b>${2*r} cm</b>`:`de rayon <b>${r} cm</b>`,hd=useD?' (rayon = diamètre ÷ 2)':'';
  if(d>1&&Math.random()<.5){const A=rd(3.14*r*r);return Q.num(`Aire d’un disque ${giv} ? (π ≈ 3,14)`,A,{unit:'cm²',tol:.011,hint:'Aire = π × r × r'+hd,expl:`3,14 × ${r} × ${r} = ${F(A)} cm²`});}
  const p=rd(2*3.14*r);return Q.num(`Périmètre d’un cercle ${giv} ? (π ≈ 3,14)`,p,{unit:'cm',tol:.011,hint:'Périmètre = 2 × π × r'+hd,expl:`2 × 3,14 × ${r} = ${F(p)} cm`});}}
],
'4':[
{id:'4a',name:'Multiplier des relatifs',icon:'⚡',
 f:{t:'Règle des signes',l:['Même signe : résultat positif.','Signes contraires : résultat négatif.','Pareil pour la division.'],ex:'(−3) × (−4) = 12 et (−20) ÷ 5 = −4'},
 g(d){const L=[6,10,12][d-1],a=nz(-L,L),b=nz(-L,L),h='Même signe : +. Signes contraires : −.';
  if(Math.random()<.5){const r=a*b;return Q.num(`${F(a)} × ${Pn(b)} = ?`,r,{hint:h,expl:`${Math.abs(a)} × ${Math.abs(b)} = ${Math.abs(r)}, signe ${r>0?'+':'−'} : ${F(r)}`});}
  const A=a*b;return Q.num(`${F(A)} ÷ ${Pn(b)} = ?`,a,{hint:h,expl:`${Math.abs(A)} ÷ ${Math.abs(b)} = ${Math.abs(a)}, signe ${a>0?'+':'−'} : ${F(a)}`});}},
{id:'4b',name:'Puissances',icon:'🚀',
 f:{t:'Les puissances',l:['aⁿ = a × a × … × a (n fois)','10³ = 1 000 et 10⁻² = 0,01','a⁰ = 1'],ex:'2⁵ = 2 × 2 × 2 × 2 × 2 = 32'},
 g(d){const t=d===1?R(0,2):d===2?R(3,5):R(5,7);let b,n;
  switch(t){case 0:b=2;n=R(2,6);break;case 1:b=10;n=R(2,6);break;case 2:b=R(2,12);n=2;break;case 3:b=3;n=R(2,4);break;case 4:b=5;n=3;break;case 5:b=-2;n=R(2,5);break;case 6:b=10;n=-R(1,4);break;default:b=R(2,20);n=0;}
  const r=rd(Math.pow(b,n)),bs=b<0?`(${F(b)})`:b,disp=bs+sup(n<0?'−'+(-n):n);
  return Q.num(`${disp} = ?`,r,{hint:n<0?`10${sup('−'+(-n))} = 1 ÷ 10${sup(-n)}`:n===0?'Tout nombre non nul puissance 0 vaut 1.':`${disp} = ${Array(n).fill(bs).join(' × ')}`,expl:`${disp} = ${F(r)}`});}},
{id:'4c',name:'Multiplier des fractions',icon:'🧩',
 f:{t:'Produit et quotient de fractions',l:['a/b × c/d = (a × c) / (b × d)','Diviser par une fraction = multiplier par son inverse.','Écris ta réponse comme ça : 6/35'],ex:'2/3 × 4/5 = 8/15'},
 g(d){const a=R(1,9),b=R(2,9),c=R(1,9),e=R(2,9);
  if(d===3&&Math.random()<.5)return Q.frac(`${fr(a,b)} ÷ ${fr(c,e)} = ?`,a*e,b*c,{hint:'Diviser par une fraction = multiplier par son inverse.',expl:`${fr(a,b)} × ${fr(e,c)} = ${fr(a*e,b*c)}`});
  return Q.frac(`${fr(a,b)} × ${fr(c,e)} = ?`,a*c,b*e,{hint:'Haut × haut, bas × bas.',expl:`${fr(a,b)} × ${fr(c,e)} = ${fr(a*c,b*e)}`});}},
{id:'4d',name:'Réduire une expression',icon:'🧹',
 f:{t:'Réduire',l:['On regroupe les « x » ensemble.','On regroupe les nombres seuls ensemble.','Écris ta réponse comme ça : 5x+3'],ex:'4x + 2 + 3x − 5 = 7x − 3'},
 g(d){const a=R(2,9),b=R(2,9);let k,m,e;
  if(d===1){k=a+b;m=0;e=`${a}x + ${b}x`;}
  else if(d===2){const A=b+R(2,8),c=R(1,9);k=A-b;m=c;e=`${A}x − ${b}x + ${c}`;}
  else{const c=R(1,9);let f=R(1,9);if(f===c)f=c%9+1;k=a+b;m=c-f;e=`${a}x + ${c} + ${b}x − ${f}`;}
  const acc=m===0?[`${k}x`]:m>0?[`${k}x+${m}`,`${m}+${k}x`]:[`${k}x${m}`,`${m}+${k}x`];
  return Q.txt(`Réduis : <b>${e}</b>`,acc,{hint:'Regroupe les x ensemble, puis les nombres seuls.',expl:`= ${answerText({type:'text',acc})}`});}},
{id:'4e',name:'Développer',icon:'🌂',
 f:{t:'Distributivité',l:['k(a + b) = k × a + k × b','Le nombre devant la parenthèse multiplie CHAQUE terme.'],ex:'3(x + 4) = 3x + 12'},
 g(d){const k=d===3?nz(-9,9):R(2,9),a=d===1?R(1,9):nz(-9,9),kk=k===1?'':k===-1?'−':F(k),ins=a>0?`x + ${a}`:`x − ${-a}`;
  return Q.multi(`Développe : <b>${kk}(${ins})</b> = ①x + ②`,['①','②'],[k,k*a],{hint:`Multiplie ${F(k)} par x, puis ${F(k)} par ${Pn(a)}.`,expl:`${F(k)} × x = ${affine(k,0)} et ${F(k)} × ${Pn(a)} = ${F(k*a)}, donc ${affine(k,k*a)}`});}},
{id:'4f',name:'Équations',icon:'⚖️',
 f:{t:'Résoudre une équation',l:['Le = est une balance : ce que tu fais d’un côté, fais-le de l’autre.','Enlève d’abord le nombre seul, puis divise par le nombre devant x.'],ex:'3x + 2 = 14 → 3x = 12 → x = 4'},
 g(d){const x=d===1?R(1,15):nz(-10,10);let e,s;
  if(d===1){const b=R(1,20),c=x+b;e=`x + ${b} = ${c}`;s=`x = ${c} − ${b} = ${x}`;}
  else if(d===2){const a=R(2,9),c=a*x;e=`${a}x = ${F(c)}`;s=`x = ${F(c)} ÷ ${a} = ${F(x)}`;}
  else{const a=R(2,9),b=nz(-15,15),c=a*x+b;e=`${a}x ${b>0?'+':'−'} ${Math.abs(b)} = ${F(c)}`;s=`${a}x = ${F(c)} ${b>0?'−':'+'} ${Math.abs(b)} = ${F(a*x)}, puis x = ${F(a*x)} ÷ ${a} = ${F(x)}`;}
  return Q.num(`Résous : <b>${e}</b>. x = ?`,x,{hint:'Isole x : même opération des deux côtés du =.',expl:s});}},
{id:'4g',name:'Pythagore',icon:'📐',
 f:{t:'Théorème de Pythagore',l:['Triangle rectangle : hypoténuse² = côté1² + côté2²','L’hypoténuse est le plus grand côté, en face de l’angle droit.','Pour un petit côté : côté² = hypoténuse² − autre côté²'],ex:'3² + 4² = 9 + 16 = 25 = 5²'},
 g(d){const T=P(d===1?[[3,4,5]]:[[3,4,5],[5,12,13],[8,15,17],[6,8,10]]),k=d===1?R(1,4):R(1,3),[a,b,c]=T.map(x=>x*k);
  if(d===1||Math.random()<.5)return Q.num(`ABC rectangle en A. AB = ${a} cm, AC = ${b} cm. Calcule <b>BC</b>.`,c,{unit:'cm',svg:SV.tri(a,b,'?'),hint:'BC² = AB² + AC²',expl:`BC² = ${a}² + ${b}² = ${a*a} + ${b*b} = ${c*c}, donc BC = √${c*c} = ${c} cm`});
  return Q.num(`ABC rectangle en A. BC = ${c} cm, AB = ${a} cm. Calcule <b>AC</b>.`,b,{unit:'cm',svg:SV.tri(a,'?',c),hint:'AC² = BC² − AB²',expl:`AC² = ${c}² − ${a}² = ${c*c} − ${a*a} = ${b*b}, donc AC = √${b*b} = ${b} cm`});}},
{id:'4h',name:'Notation scientifique',icon:'🔬',
 f:{t:'Notation scientifique',l:['a × 10ⁿ avec 1 ≤ a < 10','Grand nombre : n positif. Nombre plus petit que 1 : n négatif.','n = nombre de rangs dont la virgule se déplace.'],ex:'45 000 = 4,5 × 10⁴ et 0,003 = 3 × 10⁻³'},
 g(d){const m=rd(R(11,99)/10),n=d===3?nz(-4,7):R(2,[5,8][d-1]),v=rd(m*Math.pow(10,n));
  return Q.num(`${F(v)} = ${F(m)} × 10${sup('?')}`,n,{hint:n>0?'Compte de combien de rangs la virgule se déplace vers la gauche.':'Nombre plus petit que 1 : exposant négatif.',expl:`${F(v)} = ${F(m)} × 10${sup(F(n))}`});}},
{id:'4i',name:'Vitesse',icon:'🏎️',
 f:{t:'Distance, vitesse, temps',l:['distance = vitesse × temps','vitesse = distance ÷ temps','temps = distance ÷ vitesse'],ex:'80 km/h pendant 2 h → 160 km'},
 g(d){const v=R(3,12)*10,t=d===1?R(1,5):P([.5,1.5,2,2.5,3]),D=rd(v*t),w=d===3?R(0,2):0;
  if(w===0)return Q.num(`Une voiture roule à <b>${v} km/h</b> pendant <b>${F(t)} h</b>. Distance ?`,D,{unit:'km',hint:'Distance = vitesse × temps',expl:`${v} × ${F(t)} = ${F(D)} km`});
  if(w===1)return Q.num(`Une voiture parcourt <b>${F(D)} km</b> en <b>${F(t)} h</b>. Vitesse moyenne ?`,v,{unit:'km/h',hint:'Vitesse = distance ÷ temps',expl:`${F(D)} ÷ ${F(t)} = ${v} km/h`});
  return Q.num(`Une voiture roule à <b>${v} km/h</b> et parcourt <b>${F(D)} km</b>. Durée en heures ?`,t,{unit:'h',hint:'Temps = distance ÷ vitesse',expl:`${F(D)} ÷ ${v} = ${F(t)} h`});}},
{id:'4j',name:'Probabilités',icon:'🎲',
 f:{t:'Calculer une probabilité',l:['P = nombre de cas favorables ÷ nombre total de cas','Une probabilité est entre 0 et 1.','Écris ta réponse comme ça : 3/10'],ex:'3 boules rouges sur 10 : P = 3/10'},
 g(d){const c={rouges:R(1,8),bleues:R(1,8),vertes:d>1?R(1,8):0},tot=c.rouges+c.bleues+c.vertes,col=P(Object.keys(c).filter(k=>c[k]>0)),n=c[col];
  const desc=Object.entries(c).filter(([,v])=>v>0).map(([k,v])=>v===1?`1 boule ${k.slice(0,-1)}`:`${v} boules ${k}`).join(', ');
  return Q.frac(`Une urne contient ${desc}. On tire une boule au hasard. Probabilité qu’elle soit <b>${col.slice(0,-1)}</b> ?`,n,tot,{hint:'Cas favorables ÷ total des boules.',expl:`${n} ${col} sur ${tot} boules : ${fr(n,tot)}`});}}
],
'3':[
{id:'3a',name:'Nombres premiers',icon:'💎',
 f:{t:'Nombre premier',l:['Un nombre premier a exactement 2 diviseurs : 1 et lui-même.','Premiers : 2, 3, 5, 7, 11, 13, 17, 19, 23, 29…','1 n’est pas premier.'],ex:'15 = 3 × 5 n’est pas premier'},
 g(d){const M=[30,60,100][d-1],want=Math.random()<.5;let N;do{N=R(2,M);}while(isPrime(N)!==want);let f=2;if(!want)while(N%f)f++;
  return Q.ch(`<b>${N}</b> est-il un nombre premier ?`,want?'Oui':'Non',[want?'Non':'Oui'],{hint:'Teste la division par 2, 3, 5, 7…',expl:want?`${N} n’est divisible que par 1 et ${N} : premier.`:`${N} = ${f} × ${N/f} : pas premier.`});}},
{id:'3b',name:'Identités remarquables',icon:'✨',
 f:{t:'Identités remarquables',l:['(a + b)² = a² + 2ab + b²','(a − b)² = a² − 2ab + b²','(a + b)(a − b) = a² − b²'],ex:'(x + 3)² = x² + 6x + 9'},
 g(d){const a=R(1,[5,9,12][d-1]),t=R(0,2);
  if(t===0)return Q.multi(`Développe : <b>(x + ${a})²</b> = x² + ①x + ②`,['①','②'],[2*a,a*a],{hint:'(a + b)² = a² + 2ab + b²',expl:`2 × x × ${a} = ${2*a}x et ${a}² = ${a*a}, donc x² + ${2*a}x + ${a*a}`});
  if(t===1)return Q.multi(`Développe : <b>(x − ${a})²</b> = x² − ①x + ②`,['①','②'],[2*a,a*a],{hint:'(a − b)² = a² − 2ab + b²',expl:`2 × x × ${a} = ${2*a}x et ${a}² = ${a*a}, donc x² − ${2*a}x + ${a*a}`});
  return Q.multi(`Développe : <b>(x + ${a})(x − ${a})</b> = x² − ①`,['①'],[a*a],{hint:'(a + b)(a − b) = a² − b²',expl:`x² − ${a}² = x² − ${a*a}`});}},
{id:'3c',name:'Équation produit nul',icon:'0️⃣',
 f:{t:'Produit nul',l:['Si A × B = 0, alors A = 0 ou B = 0.','On résout chaque parenthèse séparément.'],ex:'(x − 2)(x + 5) = 0 → x = 2 ou x = −5'},
 g(d){const L=[5,9,12][d-1];let a,b;do{a=nz(-L,L);b=nz(-L,L);}while(a===b);const f=v=>v>0?`(x − ${v})`:`(x + ${-v})`;
  return Q.multi(`Résous : <b>${f(a)}${f(b)} = 0</b>`,['Solution 1','Solution 2'],[a,b],{unordered:true,hint:'Un produit est nul si l’un des facteurs est nul.',expl:`${f(a).slice(1,-1)} = 0 donne x = ${F(a)} ; ${f(b).slice(1,-1)} = 0 donne x = ${F(b)}`});}},
{id:'3d',name:'Image par une fonction',icon:'📈',
 f:{t:'Calculer une image',l:['f(x) = 2x + 3 : f est une « machine » qui transforme x.','Pour f(4) : remplace x par 4.'],ex:'f(4) = 2 × 4 + 3 = 11'},
 g(d){const a=d===1?R(2,9):nz(-[5,9][d-2],[5,9][d-2]),b=d===1?0:nz(-10,10),k=d===1?R(1,10):nz(-6,6),r=a*k+b;
  return Q.num(`f(x) = <b>${affine(a,b)}</b>. Calcule <b>f(${F(k)})</b>.`,r,{hint:`Remplace x par ${Pn(k)}.`,expl:`f(${F(k)}) = ${F(a)} × ${Pn(k)}${b?(b>0?' + '+b:' − '+(-b)):''} = ${F(r)}`});}},
{id:'3e',name:'Antécédent',icon:'🔙',
 f:{t:'Trouver un antécédent',l:['On cherche x tel que f(x) = le nombre donné.','Cela revient à résoudre une équation.'],ex:'f(x) = 3x − 1 ; antécédent de 8 : 3x − 1 = 8, donc x = 3'},
 g(d){const a=d===1?R(2,9):nz(-6,6),b=d===1?0:nz(-10,10),x=nz(-8,8),c=a*x+b;
  return Q.num(`f(x) = <b>${affine(a,b)}</b>. Antécédent de <b>${F(c)}</b> ?`,x,{hint:`Résous ${affine(a,b)} = ${F(c)}.`,expl:`${affine(a,b)} = ${F(c)} donne x = ${F(x)}`});}},
{id:'3f',name:'Thalès',icon:'🔺',
 f:{t:'Théorème de Thalès',l:['Si (MN) // (BC) :','AM/AB = AN/AC = MN/BC','Produit en croix pour trouver la longueur.'],ex:'AM = 2, AB = 4, BC = 6 → MN = 6 × 2 ÷ 4 = 3'},
 g(d){const [nu,de]=P([[1,2],[1,3],[2,3],[3,4],[2,5],[3,5]]),m=R(1,4),n=R(1,5),AB=de*m,AM=nu*m,BC=de*n,MN=nu*n,svg=SV.thales();
  if(d<3||Math.random()<.5)return Q.num(`(MN) // (BC). AM = ${AM} cm, AB = ${AB} cm, BC = ${BC} cm. Calcule <b>MN</b>.`,MN,{unit:'cm',svg,hint:'AM/AB = MN/BC',expl:`MN = BC × AM ÷ AB = ${BC} × ${AM} ÷ ${AB} = ${MN} cm`});
  return Q.num(`(MN) // (BC). AB = ${AB} cm, MN = ${MN} cm, BC = ${BC} cm. Calcule <b>AM</b>.`,AM,{unit:'cm',svg,hint:'AM/AB = MN/BC',expl:`AM = AB × MN ÷ BC = ${AB} × ${MN} ÷ ${BC} = ${AM} cm`});}},
{id:'3g',name:'Trigonométrie',icon:'📡',
 f:{t:'SOH CAH TOA',l:['sin = opposé ÷ hypoténuse','cos = adjacent ÷ hypoténuse','tan = opposé ÷ adjacent'],ex:'cos(Â) = 0,6 et hypoténuse 10 cm → adjacent = 6 cm'},
 g(d){if(d===1||Math.random()<.35){const k=R(0,2),nm=['cos','sin','tan'],RR=['adjacent ÷ hypoténuse','opposé ÷ hypoténuse','opposé ÷ adjacent'];
   return Q.ch(`Dans un triangle rectangle, <b>${nm[k]}</b> d’un angle aigu = ?`,RR[k],[...RR.filter((_,i)=>i!==k),'hypoténuse ÷ adjacent'],{hint:'Retiens : SOH CAH TOA',expl:`${nm[k]} = ${RR[k]}`});}
  const [v,f]=P([[.5,'cos'],[.6,'cos'],[.8,'cos'],[.5,'sin'],[.6,'sin'],[.8,'sin']]),H=R(1,9)*10,r=rd(v*H),s=f==='cos'?'adjacent':'opposé';
  return Q.num(`Triangle rectangle : hypoténuse = ${H} cm et ${f}(Â) = ${F(v)}. Côté <b>${s}</b> à Â ?`,r,{unit:'cm',hint:`${s} = ${f}(Â) × hypoténuse`,expl:`${F(v)} × ${H} = ${F(r)} cm`});}},
{id:'3h',name:'Racines carrées',icon:'√',
 f:{t:'Racine carrée',l:['√a est le nombre positif qui, multiplié par lui-même, donne a.','√a × √a = a','√a × √b = √(a × b)'],ex:'√49 = 7 car 7 × 7 = 49'},
 g(d){if(d===1){const n=R(1,15);return Q.num(`√${n*n} = ?`,n,{hint:`Quel nombre multiplié par lui-même donne ${n*n} ?`,expl:`${n} × ${n} = ${n*n}, donc √${n*n} = ${n}`});}
  if(d===2){const a=P([2,3,5,6,7,10,11]);return Q.num(`√${a} × √${a} = ?`,a,{hint:'√a × √a = a',expl:`√${a} × √${a} = ${a}`});}
  const [a,b]=P([[2,8],[2,18],[3,12],[5,20],[2,32],[3,27],[2,50]]),r=Math.sqrt(a*b);return Q.num(`√${a} × √${b} = ?`,r,{hint:'√a × √b = √(a × b)',expl:`√${a} × √${b} = √${a*b} = ${r}`});}},
{id:'3i',name:'Évolutions en %',icon:'📉',
 f:{t:'Hausse et baisse',l:['Augmenter de t % : multiplier par 1 + t/100','Diminuer de t % : multiplier par 1 − t/100','Taux = (nouveau − ancien) ÷ ancien × 100'],ex:'+20 % : × 1,2 et −30 % : × 0,7'},
 g(d){const t=P([5,10,15,20,25,30,40,50]),up=Math.random()<.5,c=rd(1+(up?t:-t)/100);
  if(d===1)return Q.num(`${up?'Augmenter':'Diminuer'} de ${t} % revient à multiplier par… ?`,c,{hint:up?'1 + t/100':'1 − t/100',expl:`1 ${up?'+':'−'} ${t}/100 = ${F(c)}`});
  if(d===2){const P0=R(1,15)*20,r=rd(P0*c);return Q.num(`Un article coûte ${P0} €. Son prix ${up?'augmente':'baisse'} de ${t} %. Nouveau prix ?`,r,{unit:'€',hint:`Multiplie par ${up?'1 + t/100':'1 − t/100'}.`,expl:`${P0} × ${F(c)} = ${F(r)} €`});}
  const A=R(1,10)*20,tt=up?t:-t,B=rd(A*c);return Q.num(`Un prix passe de ${A} € à ${F(B)} €. Taux d’évolution en % ? (négatif si baisse)`,tt,{unit:'%',hint:'(nouveau − ancien) ÷ ancien × 100',expl:`(${F(B)} − ${A}) ÷ ${A} × 100 = ${F(tt)} %`});}},
{id:'3j',name:'Volumes',icon:'🧊',
 f:{t:'Volumes',l:['Pavé droit : L × l × h','Cylindre : π × r × r × h','Pyramide et cône : aire de la base × h ÷ 3'],ex:'Pavé 2 × 3 × 4 = 24 cm³'},
 g(d){if(d===1){const L=R(2,10),l=R(2,10),h=R(2,10),r=L*l*h;return Q.num(`Volume d’un pavé droit de ${L} cm × ${l} cm × ${h} cm ?`,r,{unit:'cm³',hint:'V = L × l × h',expl:`${L} × ${l} × ${h} = ${r} cm³`});}
  if(d===2){const r=R(1,6),h=R(2,10),V=rd(3.14*r*r*h);return Q.num(`Volume d’un cylindre : rayon ${r} cm, hauteur ${h} cm ? (π ≈ 3,14)`,V,{unit:'cm³',tol:.011,hint:'V = π × r × r × h',expl:`3,14 × ${r} × ${r} × ${h} = ${F(V)} cm³`});}
  const L=R(2,10),l=R(2,10),h=R(1,6)*3,V=L*l*h/3;return Q.num(`Volume d’une pyramide : base ${L} cm × ${l} cm, hauteur ${h} cm ?`,V,{unit:'cm³',hint:'V = aire de la base × hauteur ÷ 3',expl:`${L} × ${l} × ${h} ÷ 3 = ${V} cm³`});}}
]};
if(typeof module!=='undefined')module.exports={CH,check,answerText,F};

/* ===== Visuels des cours ===== */

/* ===== CODEX V2 : chapitres de maths supplémentaires ===== */
CH['6'].push(
{id:'6k',name:'Multiples et diviseurs',icon:'🧩',f:{t:'Multiples et diviseurs',l:['Un multiple de 4 s’écrit 4 × un entier.','Un diviseur partage un nombre sans reste.','Les critères de divisibilité permettent de décider rapidement.'],ex:'36 est multiple de 4 et 9 ; 4 et 9 sont des diviseurs de 36.'},g(d){const k=P([2,3,4,5,9,10]),n=k*R(2,20),good=Math.random()<.6?n:n+1;return Q.ch(`<b>${good}</b> est-il divisible par ${k} ?`,good%k===0?'Oui':'Non',[good%k===0?'Non':'Oui'],{hint:'Teste si la division donne un reste nul.',expl:`${good} ÷ ${k} ${good%k===0?'tombe juste : divisible.':'ne tombe pas juste : non divisible.'}`});}},
{id:'6l',name:'Fractions équivalentes',icon:'🟰',f:{t:'Fractions équivalentes',l:['On peut multiplier le numérateur et le dénominateur par le même nombre.','La valeur de la fraction ne change pas.','Cela aide à comparer ou additionner des fractions.'],ex:'2/3 = 4/6 = 6/9'},g(d){const a=R(1,7),b=R(a+1,10),k=R(2,6);return Q.num(`Complète : ${a}/${b} = ?/${b*k}`,a*k,{hint:`Le dénominateur a été multiplié par ${k}. Fais pareil en haut.`,expl:`${a} × ${k} = ${a*k}, donc ${a}/${b} = ${a*k}/${b*k}.`});}},
{id:'6m',name:'Repérage dans le plan',icon:'📍',f:{t:'Coordonnées d’un point',l:['Une coordonnée s’écrit (abscisse ; ordonnée).','On lit d’abord l’axe horizontal x, puis l’axe vertical y.','Le point O a pour coordonnées (0 ; 0).'],ex:'A(3 ; 2) : 3 vers la droite, puis 2 vers le haut.'},g(d){const x=R(-d*3,d*3),y=R(-d*3,d*3);return Q.multi(`Le point A a pour coordonnées <b>(${x} ; ${y})</b>. Recopie ses coordonnées.`,['Abscisse x','Ordonnée y'],[x,y],{hint:'Toujours x puis y.',expl:`A(${x} ; ${y}) : abscisse ${x}, ordonnée ${y}.`});}},
{id:'6n',name:'Symétrie axiale',icon:'🪞',f:{t:'Symétrie axiale',l:['Une figure et son symétrique sont comme dans un miroir.','L’axe est la médiatrice de chaque segment reliant un point à son image.','Longueurs, angles et alignements sont conservés.'],ex:'Si A et A’ sont symétriques, l’axe coupe [AA’] en son milieu et à angle droit.'},g(){const qs=[['Que conserve une symétrie axiale ?','Les longueurs et les angles','Seulement les couleurs|Seulement les aires|Rien'],['L’axe de symétrie de [AA’] est…','Sa médiatrice','Sa parallèle|Sa diagonale|Son rayon']];const [q,a,w]=P(qs);return Q.ch(q,a,w.split('|'),{hint:'Pense au miroir et à la médiatrice.',expl:a+'.'});}},
{id:'6o',name:'Lire des données',icon:'📊',f:{t:'Tableaux et graphiques',l:['Un tableau organise des valeurs par catégories.','Un diagramme permet de comparer rapidement les effectifs.','Toujours lire le titre, les axes, les unités et la légende.'],ex:'Si 8 élèves choisissent le foot et 5 le basket, le foot a l’effectif le plus grand.'},g(d){const a=R(3,10),b=R(3,10),c=R(3,10),sum=a+b+c;return Q.num(`Un sondage donne : vélo ${a}, marche ${b}, bus ${c}. Combien de réponses au total ?`,sum,{hint:'Additionne tous les effectifs.',expl:`${a} + ${b} + ${c} = ${sum}.`});}}
);
CH['5'].push(
{id:'5k',name:'Distributivité',icon:'📦',f:{t:'Distribuer un produit',l:['k(a+b)=ka+kb.','k(a−b)=ka−kb.','La distributivité permet de calculer ou de développer.'],ex:'3(5+2)=3×5+3×2=21'},g(d){const k=R(2,9),a=R(2,15),b=R(2,10);return Q.num(`${k} × (${a} + ${b}) = ?`,k*(a+b),{hint:'Distribue ou calcule la parenthèse.',expl:`${k}×${a} + ${k}×${b} = ${k*a}+${k*b} = ${k*(a+b)}.`});}},
{id:'5l',name:'Coefficient de proportionnalité',icon:'⚖️',f:{t:'Proportionnalité',l:['Deux grandeurs sont proportionnelles si on passe de l’une à l’autre en multipliant toujours par le même nombre.','Ce nombre est le coefficient de proportionnalité.','On peut aussi passer par l’unité.'],ex:'3 kg coûtent 12 € : coefficient 4 €/kg.'},g(d){const k=R(2,8),x=R(2,12),y=x*k;return Q.num(`${x} objets coûtent ${y} €. Quel est le prix d’un objet ?`,k,{unit:'€',hint:`Calcule ${y} ÷ ${x}.`,expl:`${y} ÷ ${x} = ${k} €.`});}},
{id:'5m',name:'Échelles et plans',icon:'🗺️',f:{t:'Utiliser une échelle',l:['Une échelle 1:n signifie 1 unité sur le plan pour n unités réelles.','Il faut mettre les deux longueurs dans la même unité.','Distance réelle = distance sur le plan × n.'],ex:'À l’échelle 1:100, 3 cm représentent 300 cm = 3 m.'},g(d){const n=P([50,100,200,500]),cm=R(1,10),real=cm*n/100;return Q.num(`Plan à l’échelle 1:${n}. ${cm} cm sur le plan représentent combien de mètres ?`,real,{unit:'m',hint:`${cm} × ${n} donne des centimètres, puis ÷100 pour les mètres.`,expl:`${cm}×${n}=${cm*n} cm = ${real} m.`});}},
{id:'5n',name:'Volumes du pavé droit',icon:'🧊',f:{t:'Volume d’un pavé droit',l:['V = longueur × largeur × hauteur.','Le volume s’exprime en unités cubes : cm³, m³…','1 dm³ = 1 L.'],ex:'5×3×2 = 30 cm³'},g(d){const a=R(2,10),b=R(2,8),c=R(2,6);return Q.num(`Pavé droit ${a} cm × ${b} cm × ${c} cm. Volume ?`,a*b*c,{unit:'cm³',hint:'Multiplie les trois dimensions.',expl:`${a}×${b}×${c}=${a*b*c} cm³.`});}},
{id:'5o',name:'Coordonnées et relatifs',icon:'🧭',f:{t:'Se repérer avec des relatifs',l:['À droite de 0 : abscisses positives ; à gauche : négatives.','Au-dessus de 0 : ordonnées positives ; en dessous : négatives.','On écrit toujours (x ; y).'],ex:'B(−2 ; 3) est à gauche et au-dessus de l’origine.'},g(d){const x=R(-8,8),y=R(-8,8);return Q.multi(`Point B(${x} ; ${y})`,['x','y'],[x,y],{hint:'x horizontal, y vertical.',expl:`x=${x}, y=${y}.`});}}
);
CH['4'].push(
{id:'4k',name:'Double distributivité',icon:'🧱',f:{t:'Développer deux parenthèses',l:['(a+b)(c+d)=ac+ad+bc+bd.','Chaque terme de la première parenthèse multiplie chaque terme de la seconde.','On réduit ensuite les termes semblables.'],ex:'(x+2)(x+3)=x²+5x+6'},g(d){const a=R(1,5),b=R(1,6);return Q.ch(`Développe (x + ${a})(x + ${b}).`,`x² + ${a+b}x + ${a*b}`,[`x² + ${a*b}x + ${a+b}`,`x² + ${a+b}x + ${a+b}`,`2x² + ${a+b}x + ${a*b}`],{hint:'x×x, x×b, a×x, a×b.',expl:`x² + ${b}x + ${a}x + ${a*b} = x² + ${a+b}x + ${a*b}.`});}},
{id:'4l',name:'Diviser des fractions',icon:'➗',f:{t:'Division de fractions',l:['Diviser par une fraction revient à multiplier par son inverse.','On garde la première fraction.','On retourne la seconde, puis on multiplie.'],ex:'2/3 ÷ 5/7 = 2/3 × 7/5 = 14/15'},g(d){const a=R(1,6),b=R(a+1,9),c=R(1,6),e=R(c+1,9);return Q.frac(`${fr(a,b)} ÷ ${fr(c,e)} = ?`,a*e,b*c,{hint:'Multiplie par l’inverse de la seconde fraction.',expl:`${fr(a,b)} × ${fr(e,c)} = ${fr(a*e,b*c)}.`});}},
{id:'4m',name:'Thalès : introduction',icon:'📐',f:{t:'Proportionnalité dans les triangles',l:['Avec des droites parallèles, les longueurs correspondantes sont proportionnelles.','On écrit les rapports dans le même ordre.','Un produit en croix permet de trouver une longueur.'],ex:'AM/AB = AN/AC = MN/BC'},g(d){const k=R(2,5),small=R(2,8),big=small*k,other=R(2,8);return Q.num(`Deux triangles semblables ont un coefficient ${k}. Un côté mesure ${small} cm dans le petit. Combien dans le grand ?`,big,{unit:'cm',hint:`Multiplie par ${k}.`,expl:`${small}×${k}=${big} cm.`});}},
{id:'4n',name:'Médiane et étendue',icon:'📈',f:{t:'Décrire une série statistique',l:['La médiane partage une série ordonnée en deux groupes de même effectif.','L’étendue = maximum − minimum.','Toujours trier les valeurs avant de chercher la médiane.'],ex:'2,4,7,9,12 : médiane 7, étendue 10.'},g(d){let a=[R(1,5),R(6,10),R(11,15),R(16,20),R(21,25)].sort((x,y)=>x-y);return Q.num(`Série : ${a.join(' ; ')}. Quelle est la médiane ?`,a[2],{hint:'5 valeurs : prends celle du milieu.',expl:`La valeur centrale est ${a[2]}.`});}},
{id:'4o',name:'Algorithmique',icon:'🤖',f:{t:'Comprendre un algorithme',l:['Un algorithme est une suite d’instructions dans un ordre précis.','Une variable mémorise une valeur.','Une boucle répète des instructions.'],ex:'x←3 ; x←x+2 donne x=5.'},g(d){const x=R(1,10),k=R(2,6),b=R(1,8);return Q.num(`Algorithme : x ← ${x} ; x ← x × ${k} ; x ← x + ${b}. Valeur finale ?`,x*k+b,{hint:'Exécute les instructions dans l’ordre.',expl:`${x}×${k}=${x*k}, puis +${b} = ${x*k+b}.`});}}
);
CH['3'].push(
{id:'3k',name:'Fonctions affines',icon:'📉',f:{t:'Fonction affine',l:['Une fonction affine s’écrit f(x)=ax+b.','a est le coefficient directeur et b l’ordonnée à l’origine.','Sa représentation graphique est une droite.'],ex:'f(x)=2x+3 : a=2, b=3.'},g(d){const a=nz(-5,5),b=nz(-8,8),x=R(-5,5),r=a*x+b;return Q.num(`f(x) = ${a}x ${b>=0?'+':'−'} ${Math.abs(b)}. Calcule f(${x}).`,r,{hint:'Remplace x puis calcule.',expl:`${a}×(${x}) ${b>=0?'+':'−'} ${Math.abs(b)} = ${r}.`});}},
{id:'3l',name:'Systèmes simples',icon:'🧮',f:{t:'Deux équations, deux inconnues',l:['Un système cherche des valeurs qui vérifient deux équations en même temps.','On peut utiliser substitution ou élimination.','Toujours vérifier les deux équations.'],ex:'x+y=10 et x−y=2 donnent x=6, y=4.'},g(d){const x=R(1,10),y=R(1,10),s=x+y,dif=x-y;return Q.multi(`Résous : x + y = ${s} et x − y = ${dif}.`,['x','y'],[x,y],{hint:'Additionne les deux équations pour trouver 2x.',expl:`2x=${s+dif}, donc x=${x}, puis y=${y}.`});}},
{id:'3m',name:'Statistiques : médiane et étendue',icon:'📊',f:{t:'Analyser une série',l:['La médiane mesure une position centrale.','L’étendue mesure la dispersion : max − min.','Ces indicateurs complètent la moyenne.'],ex:'3,5,5,8,14 : médiane 5, étendue 11.'},g(d){const a=[R(1,4),R(5,8),R(9,12),R(13,16),R(17,22)].sort((x,y)=>x-y);return Q.num(`Série : ${a.join(' ; ')}. Calcule l’étendue.`,a[4]-a[0],{hint:'Maximum − minimum.',expl:`${a[4]} − ${a[0]} = ${a[4]-a[0]}.`});}},
{id:'3n',name:'Probabilités à deux étapes',icon:'🎲',f:{t:'Deux expériences successives',l:['Pour deux événements indépendants successifs, on multiplie les probabilités.','Un arbre aide à visualiser les chemins.','La somme des probabilités de toutes les issues vaut 1.'],ex:'Pile puis pile : 1/2 × 1/2 = 1/4.'},g(d){return Q.ch('On lance deux pièces équilibrées. Probabilité d’obtenir deux piles ?','1/4',['1/2','1/3','3/4'],{hint:'1/2 puis encore 1/2 : multiplie.',expl:'1/2 × 1/2 = 1/4.'});}},
{id:'3o',name:'Algorithmique et programmes',icon:'💻',f:{t:'Variables, conditions, boucles',l:['Une condition choisit une action selon vrai/faux.','Une boucle répète une instruction.','Un programme doit être testé avec plusieurs valeurs.'],ex:'Répéter 4 fois « x←x+3 » ajoute 12 à x.'},g(d){const x=R(1,8),n=R(2,6),k=R(1,5);return Q.num(`x vaut ${x}. On répète ${n} fois : x ← x + ${k}. Valeur finale ?`,x+n*k,{hint:`On ajoute ${k} exactement ${n} fois.`,expl:`${x} + ${n}×${k} = ${x+n*k}.`});}}
);

const V={
 tbl:(h,rows,hl=[])=>`<div class="tw"><table class="ctab"><tr>${h.map((x,i)=>`<th class="${hl.includes(i)?'hl':''}">${x}</th>`).join('')}</tr>${rows.map(r=>`<tr>${r.map((x,i)=>`<td class="${hl.includes(i)?'hl':''}">${x}</td>`).join('')}</tr>`).join('')}</table></div>`,
 pose:t=>`<pre class="pose">${t}</pre>`,
 tip:t=>`<div class="tip">💡 ${t}</div>`,
 steps:a=>`<ol class="lst">${a.map(x=>`<li>${x}</li>`).join('')}</ol>`,
 pie:(n,d)=>{const cx=60,cy=60,r=52;let p='';for(let i=0;i<d;i++){const a0=i/d*2*Math.PI-Math.PI/2,a1=(i+1)/d*2*Math.PI-Math.PI/2;p+=`<path d="M${cx} ${cy} L${(cx+r*Math.cos(a0)).toFixed(1)} ${(cy+r*Math.sin(a0)).toFixed(1)} A${r} ${r} 0 0 1 ${(cx+r*Math.cos(a1)).toFixed(1)} ${(cy+r*Math.sin(a1)).toFixed(1)} Z" class="${i<n?'pf':'pe'}"/>`;}return `<svg class="fig sm" viewBox="0 0 120 120" aria-hidden="true">${p}</svg>`;},
 bar:(n,d,lab='')=>{const w=260/d;let s='';for(let i=0;i<d;i++)s+=`<rect x="${10+i*w}" y="8" width="${w}" height="34" class="${i<n?'pf':'pe'}"/>`;return `<svg class="fig" viewBox="0 0 280 ${lab?70:50}" aria-hidden="true">${s}${lab?`<text x="140" y="64" text-anchor="middle">${lab}</text>`:''}</svg>`;},
 line:(min,max,pts=[],jump=null)=>{const X=v=>20+(v-min)/(max-min)*280;let t='';for(let v=min;v<=max;v++)t+=`<line x1="${X(v)}" y1="44" x2="${X(v)}" y2="54" class="ln"/><text x="${X(v)}" y="72" text-anchor="middle" class="tk">${v<0?'−'+(-v):v}</text>`;
  const j=jump?`<path d="M${X(jump[0])} 40 Q${(X(jump[0])+X(jump[1]))/2} 6 ${X(jump[1])} 40" class="ac" marker-end="url(#ah)"/><text x="${(X(jump[0])+X(jump[1]))/2}" y="16" text-anchor="middle">${jump[2]||''}</text>`:'';
  return `<svg class="fig" viewBox="0 0 320 80" aria-hidden="true"><defs><marker id="ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" class="dotf"/></marker></defs><line x1="10" y1="49" x2="312" y2="49" class="ray"/>${t}${j}${pts.map(p=>`<circle cx="${X(p)}" cy="49" r="7" class="dot"/>`).join('')}</svg>`;},
 circle:()=>`<svg class="fig sm" viewBox="0 0 140 140" aria-hidden="true"><circle cx="70" cy="70" r="55" class="sh"/><line x1="15" y1="70" x2="125" y2="70" class="ray"/><circle cx="70" cy="70" r="4" class="dot"/><text x="97" y="62" text-anchor="middle">r</text><text x="70" y="92" text-anchor="middle">diamètre = 2 × r</text></svg>`,
 dist:()=>`<svg class="fig" viewBox="0 0 280 130" aria-hidden="true"><rect x="40" y="20" width="120" height="70" class="sh"/><rect x="160" y="20" width="80" height="70" class="sh2"/><text x="100" y="60" text-anchor="middle">3 × x</text><text x="200" y="60" text-anchor="middle">3 × 4</text><text x="100" y="112" text-anchor="middle">x</text><text x="200" y="112" text-anchor="middle">4</text><text x="24" y="60" text-anchor="middle">3</text></svg>`,
 square:()=>`<svg class="fig" viewBox="0 0 220 220" aria-hidden="true"><rect x="20" y="20" width="120" height="120" class="sh"/><rect x="140" y="20" width="60" height="120" class="sh2"/><rect x="20" y="140" width="120" height="60" class="sh2"/><rect x="140" y="140" width="60" height="60" class="sh"/><text x="80" y="85" text-anchor="middle">a²</text><text x="170" y="85" text-anchor="middle">ab</text><text x="80" y="175" text-anchor="middle">ab</text><text x="170" y="175" text-anchor="middle">b²</text></svg>`,
 bal:(l,r)=>`<svg class="fig" viewBox="0 0 280 120" aria-hidden="true"><line x1="140" y1="20" x2="140" y2="100" class="ray"/><line x1="40" y1="40" x2="240" y2="40" class="ray"/><path d="M20 70 L60 70 L40 40 Z" class="ln"/><path d="M220 70 L260 70 L240 40 Z" class="ln"/><text x="40" y="92" text-anchor="middle">${l}</text><text x="240" y="92" text-anchor="middle">${r}</text><path d="M120 110 L160 110 L140 100 Z" class="dotf"/></svg>`
};


/* ===== Cours ===== */
const COURS={
'6a':{hook:'Une gourde à 3,5 € et une autre à 3,45 € : laquelle est la moins chère ? Les décimaux sont partout : prix, mesures, records sportifs.',
 parts:[{t:'Chaque chiffre a sa place',h:`Après la virgule viennent les <b>dixièmes</b>, puis les <b>centièmes</b>, puis les <b>millièmes</b>.${V.tbl(['Unités',',','Dixièmes','Centièmes','Millièmes'],[['3',',','5','0','0'],['3',',','4','5','0']])}`},
  {t:'La méthode',h:V.steps(['Compare la partie entière (avant la virgule).','Si elle est égale, compare les dixièmes.','Puis les centièmes, et ainsi de suite.'])+V.tip('Ajoute des zéros pour avoir le même nombre de chiffres : 3,5 = 3,50.')}],
 ex:{q:'Qui est le plus grand : 3,5 ou 3,45 ?',s:['Parties entières : 3 et 3, égalité.','On écrit 3,50 et 3,45 pour avoir 2 chiffres après la virgule.','5 dixièmes contre 4 dixièmes : 5 gagne.','Donc 3,5 > 3,45 ✅']},
 piege:'Le nombre le plus long n’est pas forcément le plus grand. 3,45 a plus de chiffres que 3,5, et pourtant il est plus petit.',
 retenir:['On compare chiffre par chiffre, de gauche à droite.','Ajouter des zéros à la fin d’un décimal ne change pas sa valeur.']},
'6b':{hook:'Un livre à 12,50 € et un stylo à 3,75 € : combien tu paies ? Pour ne jamais se tromper, on pose l’opération.',
 parts:[{t:'Aligner les virgules',h:`On place les virgules <b>les unes sous les autres</b>, puis on complète avec des zéros.${V.pose('  1 2 , 5 0\n+   3 , 7 5\n───────────\n  1 6 , 2 5')}`},
  {t:'Les retenues',h:`On calcule de droite à gauche, comme avec des entiers. 0 + 5 = 5 ; 5 + 7 = 12 : on écrit 2 et on retient 1.${V.tip('La virgule du résultat se place juste sous les autres virgules.')}`}],
 ex:{q:'Calcule 15,2 − 7,85',s:['On complète : 15,20 − 7,85.','On aligne les virgules et on pose.','Centièmes : 0 − 5 impossible, on emprunte : 10 − 5 = 5.','Résultat : 15,20 − 7,85 = 7,35 ✅']},
 piege:'Aligner les chiffres à droite au lieu d’aligner les virgules. Dans 12,5 + 3,75, le 5 de 12,5 est sous le 7, pas sous le 5.',
 retenir:['Virgules alignées, zéros ajoutés, puis calcul comme d’habitude.','La virgule descend telle quelle dans le résultat.']},
'6c':{hook:'4 sacs de farine de 2,5 kg : quel poids total ? La multiplication, c’est une addition rapide : 2,5 + 2,5 + 2,5 + 2,5.',
 parts:[{t:'× 10, × 100, × 1000',h:`La virgule avance vers la droite d’autant de rangs que de zéros.${V.tbl(['Calcul','Résultat'],[['3,7 × 10','37'],['3,7 × 100','370'],['3,7 × 1000','3 700']])}`},
  {t:'Décimal × entier',h:V.steps(['Calcule sans la virgule : 37 × 6 = 222.','Compte les chiffres après la virgule dans l’opération : un seul (3,<b>7</b>).','Place la virgule pour en avoir autant : 22,2.'])}],
 ex:{q:'Calcule 2,5 × 4',s:['Sans la virgule : 25 × 4 = 100.','2,5 a 1 chiffre après la virgule.','Donc 10,0, soit 10.','2,5 × 4 = 10 ✅']},
 piege:'« × 10 = ajouter un zéro » ne marche pas avec les décimaux : 3,7 × 10 = 37, et non 3,70.',
 retenir:['× 10, 100, 1000 : la virgule avance de 1, 2, 3 rangs.','Calcule sans virgule, puis replace-la en comptant les décimales.']},
'6d':{hook:'47 bonbons à partager équitablement entre 5 amis : combien chacun, et combien en reste-t-il ?',
 parts:[{t:'Le vocabulaire',h:`${V.pose('dividende = diviseur × quotient + reste\n   47    =    5     ×    9     +   2')}Le reste est toujours <b>plus petit que le diviseur</b>.`},
  {t:'La méthode des multiples',h:`Écris les multiples du diviseur jusqu’à dépasser le dividende : 5, 10, 15, 20, 25, 30, 35, 40, <b>45</b>, 50.${V.tip('Le plus grand multiple qui ne dépasse pas donne le quotient.')}`}],
 ex:{q:'Division euclidienne de 47 par 5',s:['Multiples de 5 : 45 ≤ 47 < 50.','45 = 5 × 9, donc le quotient vaut 9.','Reste : 47 − 45 = 2.','Vérification : 5 × 9 + 2 = 47 ✅']},
 piege:'Si ton reste est plus grand que le diviseur, ton quotient est trop petit : recommence avec un multiple plus grand.',
 retenir:['a = b × q + r, avec r < b.','Cherche le plus grand multiple de b qui ne dépasse pas a.']},
'6e':{hook:'Une pizza coupée en 4 parts : tu en manges 3. Tu as mangé 3/4 de la pizza 🍕',
 parts:[{t:'Lire une fraction',h:`${V.pie(3,4)}<b>3</b>/4 : le numérateur (en haut) compte les parts prises.<br>3/<b>4</b> : le dénominateur (en bas) dit en combien de parts on coupe.`},
  {t:'Fraction d’une quantité',h:V.steps(['Divise la quantité par le dénominateur.','Multiplie le résultat par le numérateur.'])+V.tip('Pour 3/4 de 20 : 20 ÷ 4 = 5, puis 5 × 3 = 15.')}],
 ex:{q:'Calcule 2/5 de 30 €',s:['On coupe 30 € en 5 parts : 30 ÷ 5 = 6 €.','On en prend 2 : 6 × 2 = 12.','2/5 de 30 € = 12 € ✅']},
 piege:'Diviser par le numérateur au lieu du dénominateur. Pour 3/4 de 20, on divise par 4, pas par 3.',
 retenir:['Numérateur = parts prises, dénominateur = nombre de parts.','On divise par le bas, puis on multiplie par le haut.']},
'6f':{hook:'Pour clôturer un jardin, on a besoin du périmètre. Pour le recouvrir de gazon, on a besoin de l’aire.',
 parts:[{t:'Périmètre',h:`${SV.rect('5 cm','3 cm')}Le périmètre est la longueur du <b>tour</b>, comme une ficelle posée autour.<br>Rectangle : P = 2 × (L + l). Carré : P = 4 × c.`},
  {t:'Aire',h:`L’aire mesure la <b>surface</b> : combien de carreaux de 1 cm² il faut pour recouvrir la figure.<br>Rectangle : A = L × l. Carré : A = c × c.${V.tip('Le périmètre est en cm, l’aire en cm².')}`}],
 ex:{q:'Rectangle de 5 cm sur 3 cm',s:['Périmètre : 2 × (5 + 3) = 2 × 8 = 16 cm.','Aire : 5 × 3 = 15 cm².','Deux réponses différentes pour deux questions différentes ✅']},
 piege:'Confondre périmètre et aire, ou oublier l’unité au carré pour l’aire.',
 retenir:['Périmètre = tour (cm). Aire = surface (cm²).','Rectangle : P = 2 × (L + l) et A = L × l.']},
'6g':{hook:'Coupe un rectangle en deux selon sa diagonale : tu obtiens deux triangles rectangles identiques ✂️',
 parts:[{t:'La moitié d’un rectangle',h:`${SV.tri('6 cm','4 cm','')}L’aire du triangle rectangle est la moitié de celle du rectangle : 6 × 4 ÷ 2 = 12 cm².`},
  {t:'Pour tous les triangles',h:`A = base × hauteur ÷ 2.<br>La <b>hauteur</b> part d’un sommet et tombe à angle droit sur la base.`}],
 ex:{q:'Triangle de base 10 cm et de hauteur 7 cm',s:['Base × hauteur : 10 × 7 = 70.','On divise par 2 : 70 ÷ 2 = 35.','Aire = 35 cm² ✅']},
 piege:'Oublier le ÷ 2. Sans lui, tu calcules l’aire du rectangle entier.',
 retenir:['Aire du triangle = base × hauteur ÷ 2.','La hauteur est toujours perpendiculaire à la base.']},
'6h':{hook:'Une porte entrouverte, les aiguilles d’une horloge, une rampe de skate : ce sont des angles !',
 parts:[{t:'Les 4 familles',h:`${V.tbl(['Angle','Mesure'],[['Aigu','entre 0° et 90°'],['Droit','90° pile'],['Obtus','entre 90° et 180°'],['Plat','180°']])}${SV.angle(45)}`},
  {t:'Le rapporteur',h:V.steps(['Place le centre du rapporteur sur le sommet.','Aligne le 0 sur un des côtés.','Lis la graduation sur l’autre côté, en partant du même 0.'])}],
 ex:{q:'Un angle de 135°, c’est quoi ?',s:['135 est plus grand que 90.','135 est plus petit que 180.','C’est donc un angle obtus ✅']},
 piege:'Lire la mauvaise graduation du rapporteur. Un angle visiblement petit ne peut pas mesurer 150° : vérifie toujours à l’œil.',
 retenir:['Repères : 90° (droit) et 180° (plat).','Sur le rapporteur, pars toujours du 0 posé sur un côté.']},
'6i':{hook:'3 cahiers coûtent 6 €. Combien pour 5 cahiers ? Quand le prix dépend du nombre comme ça, c’est de la proportionnalité.',
 parts:[{t:'Le tableau',h:`${V.tbl(['Cahiers','1','3','5'],[['Prix (€)','2','6','10']])}On passe de la 1re ligne à la 2e en multipliant toujours par le <b>même nombre</b> (ici × 2).`},
  {t:'Passer par l’unité',h:V.steps(['Calcule le prix d’un seul objet.','Multiplie par le nombre voulu.'])}],
 ex:{q:'4 places de cinéma coûtent 30 €. Prix de 6 places ?',s:['1 place : 30 ÷ 4 = 7,50 €.','6 places : 6 × 7,50 = 45 €.','6 places coûtent 45 € ✅']},
 piege:'Tout n’est pas proportionnel : ta taille n’est pas proportionnelle à ton âge !',
 retenir:['Proportionnel = on multiplie toujours par le même nombre.','La méthode la plus sûre : calculer pour 1.']},
'6j':{hook:'Un marathon fait 42 km. Combien de mètres ? Et ta taille en centimètres ? Convertir, c’est changer d’unité sans changer la longueur.',
 parts:[{t:'Le tableau de conversion',h:`${V.tbl(['km','hm','dam','m','dm','cm','mm'],[['','','','3','5','0','']],[3])}Place le chiffre des unités dans la colonne de l’unité de départ. Ici 3,5 m.`},
  {t:'Lire le résultat',h:`Pour 3,5 m en cm : la virgule se place après la colonne cm, donc <b>350 cm</b>.${V.tip('Une colonne = × 10 ou ÷ 10.')}`}],
 ex:{q:'Convertis 1 200 m en km',s:['Le 0 des unités va dans la colonne m.','On remonte de 3 colonnes jusqu’au km : ÷ 1000.','1 200 ÷ 1000 = 1,2.','1 200 m = 1,2 km ✅']},
 piege:'Partir dans le mauvais sens. Vers une unité plus grande, le nombre devient plus petit.',
 retenir:['Plus petite unité : nombre plus grand.','Chaque colonne vaut × 10.']},
'5a':{hook:'2 + 3 × 4, ça fait 20 ou 14 ? La calculatrice dit 14 : il existe des règles de priorité que tout le monde respecte.',
 parts:[{t:'L’ordre officiel',h:V.steps(['Les parenthèses.','Les multiplications et divisions.','Les additions et soustractions.'])},
  {t:'À égalité, de gauche à droite',h:`Quand il n’y a que des + et des −, on calcule de gauche à droite.${V.pose('20 − 5 + 2\n= 15 + 2\n= 17')}`}],
 ex:{q:'Calcule 3 × (8 − 2) + 4',s:['Parenthèses : 8 − 2 = 6.','Multiplication : 3 × 6 = 18.','Addition : 18 + 4 = 22.','Résultat : 22 ✅']},
 piege:'20 − 5 + 2 ne fait pas 13 : on ne commence pas par 5 + 2.',
 retenir:['Parenthèses, puis × et ÷, puis + et −.','À égalité de priorité, de gauche à droite.']},
'5b':{hook:'Il fait −3 °C le matin et 5 °C l’après-midi. Les nombres négatifs servent pour les températures, les étages de parking, les comptes en banque…',
 parts:[{t:'La droite graduée',h:`${V.line(-5,5,[-3,5])}Plus on va à gauche, plus le nombre est petit. −3 est plus petit que 1.`},
  {t:'Additionner',h:`<b>Même signe</b> : on ajoute les distances à zéro et on garde le signe.<br><b>Signes contraires</b> : on soustrait les distances et on garde le signe du plus éloigné de zéro.${V.tip('Soustraire un nombre = ajouter son opposé : 5 − (−2) = 5 + 2.')}`}],
 ex:{q:'Calcule −7 + 3',s:['Signes contraires.','Distances : 7 et 3, donc 7 − 3 = 4.','−7 est plus loin de zéro, on garde son signe −.','−7 + 3 = −4 ✅']},
 piege:'−3 − 2 ne fait pas −1. On descend encore de 2 : −3 − 2 = −5.',
 retenir:['Signes contraires : on soustrait, on garde le signe du plus loin.','Moins un négatif = plus.']},
'5c':{hook:'Une demi-pizza ou 2 parts sur 4 : c’est pareil ! Deux fractions différentes peuvent avoir la même valeur.',
 parts:[{t:'Fractions égales',h:`${V.bar(1,2,'1/2')}${V.bar(2,4,'2/4')}On multiplie ou on divise le haut ET le bas par le même nombre.`},
  {t:'Simplifier',h:`On divise le haut et le bas par un diviseur commun, jusqu’à ne plus pouvoir.${V.tip('Les critères de divisibilité par 2, 3, 5 aident beaucoup.')}`}],
 ex:{q:'Simplifie 12/18',s:['12 et 18 sont divisibles par 6.','12 ÷ 6 = 2 et 18 ÷ 6 = 3.','12/18 = 2/3, impossible de simplifier plus ✅']},
 piege:'Soustraire au lieu de diviser : 12/18 n’est pas égal à 10/16.',
 retenir:['On divise toujours le haut et le bas par le même nombre.','Une fraction irréductible ne se simplifie plus.']},
'5d':{hook:'Tu as mangé 1/3 d’une tarte et ton frère 1/6. Quelle part de la tarte a disparu ?',
 parts:[{t:'Même dénominateur',h:`On ajoute les numérateurs et on garde le dénominateur.<br>2/6 + 1/6 = 3/6.${V.bar(3,6,'2/6 + 1/6 = 3/6')}`},
  {t:'Dénominateurs différents',h:`On met d’abord au même dénominateur : 1/3 = 2/6 (on multiplie le haut et le bas par 2).`}],
 ex:{q:'Calcule 1/3 + 1/6',s:['On transforme 1/3 en sixièmes : 1/3 = 2/6.','2/6 + 1/6 = 3/6.','On simplifie : 3/6 = 1/2.','Résultat : 1/2 de la tarte ✅']},
 piege:'Ne jamais additionner les dénominateurs : 1/3 + 1/6 n’est pas 2/9.',
 retenir:['Même dénominateur d’abord.','On additionne seulement les numérateurs.']},
'5e':{hook:'Une lettre, c’est une boîte mystère qui contient un nombre. On peut écrire une formule pour tous les cas en même temps.',
 parts:[{t:'Les conventions',h:V.tbl(['On écrit','Ça veut dire'],[['3x','3 × x'],['x²','x × x'],['3(x + 2)','3 × (x + 2)']])},
  {t:'Remplacer',h:`Pour calculer une expression, on remplace la lettre par sa valeur, puis on applique les priorités.`}],
 ex:{q:'Calcule x² + 2x pour x = 3',s:['On remplace : 3 × 3 + 2 × 3.','3 × 3 = 9 et 2 × 3 = 6.','9 + 6 = 15 ✅']},
 piege:'3x avec x = 4 ne fait pas 34 : ça fait 3 × 4 = 12.',
 retenir:['Le × est caché entre un nombre et une lettre.','On remplace la lettre, puis on suit les priorités.']},
'5f':{hook:'−20 % sur un jean, 50 % de batterie, 25 % de réussite… Un pourcentage, c’est une fraction sur 100.',
 parts:[{t:'Le sens',h:`${V.bar(1,5,'20 % = 20/100 = 1/5')}t % de N = N × t ÷ 100.`},
  {t:'Les raccourcis',h:V.tbl(['Pourcentage','Calcul rapide'],[['10 %','÷ 10'],['50 %','la moitié'],['25 %','le quart'],['20 %','10 % × 2']])}],
 ex:{q:'Calcule 20 % de 60',s:['10 % de 60 = 6.','20 %, c’est le double : 6 × 2 = 12.','Vérification : 60 × 20 ÷ 100 = 12 ✅']},
 piege:'20 % de 60 ne fait pas 60 − 20. On calcule une part de 60, pas une soustraction.',
 retenir:['t % de N = N × t ÷ 100.','10 % = diviser par 10.']},
'5g':{hook:'Découpe les 3 coins d’un triangle en papier et colle-les côte à côte : ils forment toujours un angle plat !',
 parts:[{t:'La règle des 180°',h:`Dans <b>tout</b> triangle, la somme des 3 angles fait 180°.${V.tip('Triangle équilatéral : 3 angles de 60°.')}`},
  {t:'Le triangle isocèle',h:`Il a 2 côtés égaux et donc 2 angles à la base égaux.`}],
 ex:{q:'Triangle avec des angles de 50° et 60°',s:['50 + 60 = 110.','180 − 110 = 70.','Le 3e angle mesure 70° ✅']},
 piege:'Dans un isocèle d’angle principal 40°, chaque angle à la base vaut (180 − 40) ÷ 2 = 70°, pas 140°.',
 retenir:['Somme des angles d’un triangle = 180°.','Isocèle : 2 angles égaux à la base.']},
'5h':{hook:'Tes notes : 12, 15 et 9. Quelle est ta moyenne ? C’est la note que tu aurais si toutes tes notes étaient pareilles.',
 parts:[{t:'Calculer une moyenne',h:V.steps(['Additionne toutes les valeurs.','Divise par le nombre de valeurs.'])}],
 ex:{q:'Moyenne de 12, 15 et 9',s:['Somme : 12 + 15 + 9 = 36.','Il y a 3 notes.','36 ÷ 3 = 12.','Moyenne : 12 ✅']},
 piege:'Diviser par 20 au lieu du nombre de notes.',
 retenir:['Moyenne = somme ÷ nombre de valeurs.','La moyenne est toujours entre la plus petite et la plus grande valeur.']},
'5i':{hook:'Peut-on partager 162 billes en 3 tas égaux, sans calculatrice ? Les critères de divisibilité répondent en un coup d’œil.',
 parts:[{t:'Les critères',h:V.tbl(['Par','Règle'],[['2','dernier chiffre pair'],['5','finit par 0 ou 5'],['10','finit par 0'],['3','somme des chiffres divisible par 3'],['9','somme des chiffres divisible par 9']])}],
 ex:{q:'162 est-il divisible par 2, 3, 5, 9 ?',s:['Finit par 2 : divisible par 2.','1 + 6 + 2 = 9 : divisible par 3 et par 9.','Ne finit ni par 0 ni par 5 : pas par 5.','Réponse : 2, 3 et 9 ✅']},
 piege:'Pour 3 et 9, on regarde la somme des chiffres, pas le dernier chiffre.',
 retenir:['2, 5, 10 : dernier chiffre.','3, 9 : somme des chiffres.']},
'5j':{hook:'Combien de ruban pour faire le tour d’un gâteau rond ? Pour les cercles, un nombre magique entre en jeu : π ≈ 3,14.',
 parts:[{t:'Le vocabulaire',h:`${V.circle()}Le rayon r va du centre au bord. Le diamètre traverse : D = 2 × r.`},
  {t:'Les formules',h:V.tbl(['Quoi','Formule'],[['Périmètre du cercle','2 × π × r'],['Aire du disque','π × r × r']])}],
 ex:{q:'Cercle de rayon 5 cm',s:['Périmètre : 2 × 3,14 × 5 = 31,4 cm.','Aire : 3,14 × 5 × 5 = 78,5 cm².','Deux unités différentes : cm et cm² ✅']},
 piege:'Utiliser le diamètre au lieu du rayon dans l’aire. Si on te donne le diamètre, divise-le d’abord par 2.',
 retenir:['P = 2 × π × r et A = π × r × r.','π ≈ 3,14.']},
'4a':{hook:'Perdre une dette, c’est gagner ! C’est pour ça que moins par moins donne plus.',
 parts:[{t:'La règle des signes',h:V.tbl(['×','+','−'],[['+','+','−'],['−','−','+']])},
  {t:'Plusieurs facteurs',h:`On compte les signes − : nombre <b>pair</b>, résultat positif ; nombre <b>impair</b>, résultat négatif.`}],
 ex:{q:'Calcule (−3) × (−4) et (−20) ÷ 5',s:['(−3) × (−4) : même signe, donc +12.','(−20) ÷ 5 : signes contraires, donc −4.','Réponses : 12 et −4 ✅']},
 piege:'Cette règle vaut pour × et ÷. En addition, −3 + (−4) = −7, pas +7.',
 retenir:['Même signe : +. Signes contraires : −.','Pair de − : positif. Impair : négatif.']},
'4b':{hook:'Une rumeur : chaque personne la raconte à 2 amis. Au bout de 10 étapes, 2¹⁰ = 1 024 personnes la connaissent ! Les puissances grandissent très vite.',
 parts:[{t:'Définition',h:`aⁿ = a × a × … × a (n fois).<br>2⁵ = 2 × 2 × 2 × 2 × 2 = 32.`},
  {t:'Puissances de 10',h:V.tbl(['Écriture','Valeur'],[['10³','1 000'],['10¹','10'],['10⁰','1'],['10⁻²','0,01']])+V.tip('Tout nombre non nul puissance 0 vaut 1.')}],
 ex:{q:'Calcule 3⁴',s:['3 × 3 = 9.','9 × 3 = 27.','27 × 3 = 81.','3⁴ = 81 ✅']},
 piege:'2³ ne fait pas 2 × 3 = 6, mais 2 × 2 × 2 = 8.',
 retenir:['L’exposant dit combien de fois on multiplie.','10ⁿ = 1 suivi de n zéros.']},
'4c':{hook:'Les 2/3 de la moitié d’un gâteau, c’est quelle part ? Multiplier des fractions est plus simple que les additionner !',
 parts:[{t:'Multiplier',h:`On multiplie les hauts entre eux et les bas entre eux.<br>2/3 × 4/5 = 8/15.${V.tip('Pas besoin de même dénominateur pour multiplier.')}`},
  {t:'Diviser',h:`Diviser par une fraction revient à multiplier par son <b>inverse</b> (on la retourne).<br>3/5 ÷ 2/7 = 3/5 × 7/2 = 21/10.`}],
 ex:{q:'Calcule 2/3 × 9/4',s:['Hauts : 2 × 9 = 18.','Bas : 3 × 4 = 12.','18/12, on simplifie par 6.','Résultat : 3/2 ✅']},
 piege:'Chercher un dénominateur commun pour multiplier : inutile, et source d’erreurs.',
 retenir:['Haut × haut, bas × bas.','Diviser = multiplier par l’inverse.']},
'4d':{hook:'3 pommes + 5 pommes = 8 pommes. Mais 3 pommes + 2 poires, ça reste 3 pommes + 2 poires ! En algèbre, c’est pareil.',
 parts:[{t:'Les termes semblables',h:`On regroupe les termes en x ensemble, et les nombres seuls ensemble.${V.pose('4x + 2 + 3x − 5\n= (4x + 3x) + (2 − 5)\n= 7x − 3')}`}],
 ex:{q:'Réduis 6x − 2x + 9',s:['Termes en x : 6x − 2x = 4x.','Nombre seul : 9.','Résultat : 4x + 9 ✅']},
 piege:'3x + 2 ne fait pas 5x : ce ne sont pas les mêmes « fruits ».',
 retenir:['On ne mélange pas x, x² et les nombres seuls.','On additionne les coefficients des termes semblables.']},
'4e':{hook:'3 sacs contenant chacun x billes rouges et 4 billes bleues : combien de billes en tout ? 3x + 12.',
 parts:[{t:'La distributivité',h:`${V.dist()}k(a + b) = k × a + k × b.<br>Le nombre devant la parenthèse multiplie <b>chaque</b> terme.`},
  {t:'Avec des signes',h:`−2(x − 5) = −2 × x + (−2) × (−5) = −2x + 10.`}],
 ex:{q:'Développe 3(x + 4)',s:['3 × x = 3x.','3 × 4 = 12.','3(x + 4) = 3x + 12 ✅']},
 piege:'Oublier de multiplier le 2e terme : 3(x + 4) n’est pas 3x + 4.',
 retenir:['Chaque terme de la parenthèse est multiplié.','Attention aux signes avec un nombre négatif devant.']},
'4f':{hook:'Une équation, c’est une balance en équilibre. Ce que tu fais d’un côté, tu le fais de l’autre pour garder l’équilibre ⚖️',
 parts:[{t:'Le principe',h:`${V.bal('3x + 2','14')}On cherche la valeur de x qui rend l’égalité vraie.`},
  {t:'La méthode',h:V.steps(['Enlève le nombre seul des deux côtés.','Divise les deux côtés par le nombre devant x.','Vérifie en remplaçant x.'])}],
 ex:{q:'Résous 3x + 2 = 14',s:['On enlève 2 des deux côtés : 3x = 12.','On divise par 3 : x = 4.','Vérification : 3 × 4 + 2 = 14 ✅']},
 piege:'Quand un + 2 passe de l’autre côté, il devient − 2. Et on divise par 3, on ne soustrait pas 3.',
 retenir:['Même opération des deux côtés.','On vérifie toujours la solution.']},
'4g':{hook:'Un écran de 10 pouces : c’est la diagonale ! Pythagore permet de calculer une longueur sans la mesurer.',
 parts:[{t:'Le théorème',h:`${SV.tri('AB','AC','BC')}Si ABC est rectangle en A, alors <b>BC² = AB² + AC²</b>.<br>BC est l’hypoténuse : le plus grand côté, en face de l’angle droit.`},
  {t:'Trouver un petit côté',h:`AC² = BC² − AB².${V.tip('Triplets célèbres : 3, 4, 5 et 5, 12, 13.')}`}],
 ex:{q:'AB = 6 cm, AC = 8 cm. Calcule BC.',s:['BC² = 6² + 8² = 36 + 64.','BC² = 100.','BC = √100 = 10 cm ✅']},
 piege:'Pour trouver un petit côté, on soustrait. Si tu additionnes, ton côté serait plus grand que l’hypoténuse : impossible !',
 retenir:['Hypoténuse² = somme des carrés des 2 autres côtés.','Seulement dans un triangle rectangle.']},
'4h':{hook:'La Terre est à 150 000 000 km du Soleil. Un microbe mesure 0,000 001 m. Pour écrire ces nombres sans erreur, on utilise la notation scientifique 🔬',
 parts:[{t:'La forme',h:`a × 10ⁿ, avec a entre 1 et 10 (1 ≤ a < 10).${V.tbl(['Nombre','Notation scientifique'],[['45 000','4,5 × 10⁴'],['0,003','3 × 10⁻³']])}`},
  {t:'Trouver l’exposant',h:`Compte de combien de rangs la virgule se déplace. Grand nombre : n positif. Nombre inférieur à 1 : n négatif.`}],
 ex:{q:'Écris 150 000 000 en notation scientifique',s:['On veut 1,5 (entre 1 et 10).','La virgule recule de 8 rangs.','150 000 000 = 1,5 × 10⁸ ✅']},
 piege:'45 × 10³ est juste, mais ce n’est pas la notation scientifique : 45 n’est pas entre 1 et 10.',
 retenir:['1 ≤ a < 10.','n compte les déplacements de la virgule.']},
'4i':{hook:'Une voiture à 80 km/h roule 80 km en 1 heure. En 2 h 30, quelle distance ?',
 parts:[{t:'Les 3 formules',h:V.tbl(['On cherche','Formule'],[['la distance','v × t'],['la vitesse','d ÷ t'],['le temps','d ÷ v']])},
  {t:'Les heures en décimal',h:V.tbl(['Durée','En heures'],[['30 min','0,5 h'],['15 min','0,25 h'],['1 h 30','1,5 h']])}],
 ex:{q:'80 km/h pendant 2 h 30',s:['2 h 30 = 2,5 h.','d = 80 × 2,5.','d = 200 km ✅']},
 piege:'1 h 30 ne s’écrit pas 1,3 h, mais 1,5 h (30 minutes = une demi-heure).',
 retenir:['d = v × t.','Convertis les minutes en heures décimales.']},
'4j':{hook:'Tu lances un dé : quelle chance d’avoir un 6 ? Les probabilités mesurent le hasard 🎲',
 parts:[{t:'La formule',h:`P = nombre de cas favorables ÷ nombre total de cas.<br>Une probabilité est toujours entre 0 (impossible) et 1 (certain).`},
  {t:'Exemple de l’urne',h:`3 boules rouges et 7 bleues : P(rouge) = 3/10 = 0,3.`}],
 ex:{q:'Probabilité d’obtenir un nombre pair avec un dé',s:['Cas possibles : 1, 2, 3, 4, 5, 6, soit 6 cas.','Cas favorables : 2, 4, 6, soit 3 cas.','P = 3/6 = 1/2 ✅']},
 piege:'Une probabilité ne peut jamais dépasser 1. Si tu trouves 7/3, vérifie ton total.',
 retenir:['P = favorables ÷ total.','0 ≤ P ≤ 1.']},
'3a':{hook:'Les nombres premiers sont les « briques de base » : tous les autres nombres se construisent en les multipliant 🧱',
 parts:[{t:'Définition',h:`Un nombre premier a exactement <b>2 diviseurs</b> : 1 et lui-même.<br>2, 3, 5, 7, 11, 13, 17, 19, 23, 29…${V.tip('1 n’est pas premier. 2 est le seul premier pair.')}`},
  {t:'Décomposer',h:`On divise par les premiers dans l’ordre.${V.pose('60 = 2 × 30\n   = 2 × 2 × 15\n   = 2 × 2 × 3 × 5\n   = 2² × 3 × 5')}`}],
 ex:{q:'91 est-il premier ?',s:['Pas pair, ne finit pas par 5.','9 + 1 = 10 : pas divisible par 3.','91 ÷ 7 = 13 !','91 = 7 × 13 : pas premier ✅']},
 piege:'Un nombre impair n’est pas forcément premier : 91, 51 = 3 × 17…',
 retenir:['Premier = exactement 2 diviseurs.','Tout nombre se décompose en produit de premiers.']},
'3b':{hook:'Calcule 101² de tête en 3 secondes ? Avec les identités remarquables : 100² + 2 × 100 + 1 = 10 201 ✨',
 parts:[{t:'Le carré en image',h:`${V.square()}(a + b)² = a² + 2ab + b² : le grand carré est fait de 4 morceaux.`},
  {t:'Les 3 identités',h:V.tbl(['Identité','Développement'],[['(a + b)²','a² + 2ab + b²'],['(a − b)²','a² − 2ab + b²'],['(a + b)(a − b)','a² − b²']])}],
 ex:{q:'Développe (x + 3)²',s:['a = x et b = 3.','a² = x², 2ab = 2 × x × 3 = 6x, b² = 9.','(x + 3)² = x² + 6x + 9 ✅']},
 piege:'(x + 3)² n’est pas x² + 9 : il manque le double produit 6x.',
 retenir:['Ne jamais oublier le 2ab.','(a + b)(a − b) = a² − b².']},
'3c':{hook:'Si un produit vaut zéro, c’est forcément qu’un des facteurs vaut zéro : 5 × 0 = 0, 0 × 1 000 = 0.',
 parts:[{t:'La règle',h:`A × B = 0 signifie A = 0 <b>ou</b> B = 0.<br>On résout donc deux petites équations.`}],
 ex:{q:'Résous (x − 2)(x + 5) = 0',s:['x − 2 = 0, donc x = 2.','x + 5 = 0, donc x = −5.','Deux solutions : 2 et −5 ✅']},
 piege:'Le signe s’inverse : x + 5 = 0 donne x = −5, pas 5.',
 retenir:['Un produit est nul si un facteur est nul.','En général : deux solutions.']},
'3d':{hook:'Une fonction, c’est une machine : tu mets un nombre, elle en ressort un autre. f(x) = 2x + 3 : « double, puis ajoute 3 » ⚙️',
 parts:[{t:'Image',h:`f(4) se lit « f de 4 » : c’est l’<b>image</b> de 4.<br>f(4) = 2 × 4 + 3 = 11.`},
  {t:'Tableau de valeurs',h:V.tbl(['x','−1','0','1','4'],[['f(x)','1','3','5','11']])+V.tip('Chaque colonne donne un point du graphique : (4 ; 11).')}],
 ex:{q:'f(x) = 2x + 3. Calcule f(−1).',s:['On remplace x par (−1).','2 × (−1) + 3.','−2 + 3 = 1.','f(−1) = 1 ✅']},
 piege:'f(4) ne veut pas dire f × 4. C’est le résultat de la machine quand on y met 4.',
 retenir:['Image : on part de x, on calcule f(x).','Remplacer, puis respecter les priorités.']},
'3e':{hook:'Cette fois, on connaît le résultat de la machine et on cherche le nombre de départ : c’est l’antécédent.',
 parts:[{t:'Image ou antécédent ?',h:V.tbl(['On connaît','On cherche','Nom'],[['x','f(x)','image'],['f(x)','x','antécédent']])},
  {t:'La méthode',h:`Chercher l’antécédent de 8, c’est résoudre f(x) = 8.`}],
 ex:{q:'f(x) = 3x − 1. Antécédent de 8 ?',s:['On résout 3x − 1 = 8.','3x = 9.','x = 3.','Vérification : f(3) = 9 − 1 = 8 ✅']},
 piege:'Confondre les deux : calculer f(8) au lieu de résoudre f(x) = 8.',
 retenir:['Antécédent = on remonte la machine.','On résout une équation.']},
'3f':{hook:'Comment mesurer la hauteur d’un arbre avec un bâton et son ombre ? Thalès l’a fait il y a 2 600 ans pour une pyramide !',
 parts:[{t:'La configuration',h:`${SV.thales()}Si (MN) est parallèle à (BC), les petits côtés sont proportionnels aux grands.`},
  {t:'L’égalité',h:`<b>AM/AB = AN/AC = MN/BC</b>.<br>On trouve la longueur inconnue avec un produit en croix.`}],
 ex:{q:'AM = 2, AB = 4, BC = 6. Calcule MN.',s:['AM/AB = MN/BC, donc 2/4 = MN/6.','MN = 6 × 2 ÷ 4.','MN = 3 ✅']},
 piege:'Les rapports partent toujours de A : AM/AB, et non AM/MB.',
 retenir:['Il faut des droites parallèles.','Petit triangle sur grand triangle, côté par côté.']},
'3g':{hook:'Quelle est la hauteur d’un toit si la pente fait 30° ? La trigonométrie relie les angles et les longueurs 📐',
 parts:[{t:'Repérer les côtés',h:`Depuis l’angle Â : l’<b>hypoténuse</b> est en face de l’angle droit, l’<b>opposé</b> est en face de Â, l’<b>adjacent</b> touche Â.`},
  {t:'SOH CAH TOA',h:V.tbl(['Rapport','Formule'],[['sin','opposé ÷ hypoténuse'],['cos','adjacent ÷ hypoténuse'],['tan','opposé ÷ adjacent']])+V.tip('Calculatrice en mode degrés !')}],
 ex:{q:'Hypoténuse 10 cm, cos(Â) = 0,6. Côté adjacent ?',s:['cos = adjacent ÷ hypoténuse.','adjacent = cos × hypoténuse.','adjacent = 0,6 × 10 = 6 cm ✅']},
 piege:'Opposé et adjacent dépendent de l’angle choisi : change d’angle et ils s’échangent.',
 retenir:['SOH CAH TOA.','Seulement dans un triangle rectangle.']},
'3h':{hook:'Un carré a une aire de 49 cm². Quelle est la longueur de son côté ? C’est la racine carrée : √49 = 7.',
 parts:[{t:'Définition',h:`√a est le nombre positif qui, multiplié par lui-même, donne a.${V.tbl(['a','1','4','9','16','25','36','49','64','81','100'],[['√a','1','2','3','4','5','6','7','8','9','10']])}`},
  {t:'Les règles',h:`√a × √a = a<br>√a × √b = √(a × b)`}],
 ex:{q:'Calcule √2 × √8',s:['√2 × √8 = √(2 × 8).','= √16.','= 4 ✅']},
 piege:'√(9 + 16) = √25 = 5, et non √9 + √16 = 7. La racine ne se « distribue » pas sur l’addition.',
 retenir:['Apprends les carrés jusqu’à 15² = 225.','√(a × b) = √a × √b, mais pas pour +.']},
'3i':{hook:'Un jean à 80 € augmente de 25 %, puis baisse de 20 %. Retour au prix de départ ? Oui ! Mais +20 % puis −20 %, non !',
 parts:[{t:'Le coefficient multiplicateur',h:V.tbl(['Évolution','On multiplie par'],[['+ t %','1 + t/100'],['− t %','1 − t/100'],['+ 20 %','1,2'],['− 30 %','0,7']])},
  {t:'Le taux d’évolution',h:`Taux = (nouveau − ancien) ÷ ancien × 100.`}],
 ex:{q:'80 € augmenté de 25 %',s:['Coefficient : 1 + 25/100 = 1,25.','80 × 1,25 = 100.','Nouveau prix : 100 € ✅']},
 piege:'100 € + 20 % = 120 €, puis − 20 % = 96 €. Les pourcentages successifs ne s’annulent pas.',
 retenir:['Une évolution = une multiplication.','Évolutions successives : on multiplie les coefficients.']},
'3j':{hook:'Combien d’eau dans un aquarium ? Combien de glace dans un cornet ? Le volume mesure la place occupée 🧊',
 parts:[{t:'Les formules',h:V.tbl(['Solide','Volume'],[['Pavé droit','L × l × h'],['Cube','c × c × c'],['Cylindre','π × r × r × h'],['Pyramide, cône','aire de la base × h ÷ 3'],['Boule','4/3 × π × r³']])},
  {t:'Les unités',h:`Le volume s’exprime en cm³, m³… et 1 L = 1 dm³ = 1 000 cm³.`}],
 ex:{q:'Pyramide de base 6 cm × 4 cm, hauteur 9 cm',s:['Aire de la base : 6 × 4 = 24 cm².','× hauteur : 24 × 9 = 216.','÷ 3 : 216 ÷ 3 = 72.','Volume : 72 cm³ ✅']},
 piege:'Oublier le ÷ 3 pour les solides pointus (pyramide, cône).',
 retenir:['Solides droits : base × hauteur.','Solides pointus : base × hauteur ÷ 3.']}
};


/* ===== CODEX V2 : cours théoriques supplémentaires de maths ===== */
Object.assign(COURS,{
'6k':{hook:'Les multiples et diviseurs servent à organiser des paquets, partager sans reste et reconnaître rapidement les nombres compatibles.',parts:[{t:'Comprendre les mots',h:V.tbl(['Mot','Sens'],[['multiple','résultat d’une multiplication par un entier'],['diviseur','nombre qui divise exactement, sans reste']])},{t:'Critères utiles',h:V.tbl(['Divisible par','Critère'],[['2','dernier chiffre pair'],['3','somme des chiffres multiple de 3'],['5','finit par 0 ou 5'],['9','somme des chiffres multiple de 9'],['10','finit par 0']])},{t:'Méthode',h:V.steps(['Cherche le diviseur demandé.','Applique le critère ou effectue la division.','Vérifie que le reste vaut 0.'])}],ex:{q:'36 est-il divisible par 9 ?',s:['3+6=9.','9 est divisible par 9.','Donc 36 est divisible par 9 ✅']},piege:'Confondre « multiple de » et « diviseur de ». 36 est multiple de 9 ; 9 est diviseur de 36.',retenir:['Diviseur = division exacte.','Un critère évite souvent de poser la division.']},
'6l':{hook:'Deux fractions peuvent être écrites différemment tout en représentant exactement la même quantité.',parts:[{t:'Principe',h:'On multiplie ou divise <b>le numérateur ET le dénominateur par le même nombre non nul</b>.'},{t:'Visualiser',h:`${V.pie(1,2)}1/2 représente la même part que 2/4 ou 3/6.`},{t:'Pourquoi ?',h:'Multiplier en haut et en bas revient à multiplier la fraction par 1 : 2/2, 3/3… Sa valeur ne change donc pas.'}],ex:{q:'Complète 3/5 = ?/20',s:['5×4=20.','On fait la même chose en haut : 3×4=12.','3/5=12/20 ✅']},piege:'Ne multiplier que le dénominateur change la valeur de la fraction.',retenir:['Même opération en haut et en bas.','Fractions équivalentes = même valeur.']},
'6m':{hook:'Une carte, un jeu vidéo ou un plan utilisent tous le même principe : deux nombres permettent de localiser précisément un point.',parts:[{t:'Les axes',h:'L’axe horizontal est celui des <b>abscisses x</b>. L’axe vertical est celui des <b>ordonnées y</b>.'},{t:'Ordre de lecture',h:V.steps(['Pars de l’origine O.','Déplace-toi horizontalement pour lire x.','Puis verticalement pour lire y.','Écris toujours (x ; y).'])}],ex:{q:'Place mentalement A(−2 ; 3)',s:['x=−2 : 2 unités à gauche.','y=3 : 3 unités vers le haut.','A est donc en haut à gauche ✅']},piege:'Inverser x et y. Les coordonnées ne sont pas interchangeables.',retenir:['Toujours x puis y.','O=(0 ; 0).']},
'6n':{hook:'La symétrie axiale fonctionne comme un miroir parfaitement placé : chaque point possède une image à la même distance de l’axe.',parts:[{t:'Construction',h:V.steps(['Trace la perpendiculaire à l’axe passant par le point.','Mesure la distance du point à l’axe.','Reporte exactement la même distance de l’autre côté.'])},{t:'Ce qui est conservé',h:'Les longueurs, les angles, l’alignement, le parallélisme et les aires sont conservés.'}],ex:{q:'Que peut-on dire de [AA’] ?',s:['A et A’ sont symétriques.','L’axe coupe [AA’] à angle droit.','Il passe aussi par son milieu : c’est sa médiatrice ✅']},piege:'Mesurer depuis un point quelconque de l’axe au lieu de suivre une perpendiculaire.',retenir:['Même distance de part et d’autre.','L’axe est la médiatrice de [AA’].']},
'6o':{hook:'Les données ne sont utiles que si on sait les lire : titre, unités, légende et échelle sont aussi importants que les nombres.',parts:[{t:'Lire dans le bon ordre',h:V.steps(['Lis le titre : de quoi parle le graphique ?','Observe les axes et leurs unités.','Lis la légende ou les catégories.','Repère ensuite la valeur demandée.'])},{t:'Effectif total',h:'L’effectif total est la somme des effectifs de toutes les catégories.'}],ex:{q:'8 vélos, 5 bus, 7 marcheurs : total ?',s:['On additionne 8+5+7.','=20.','Il y a 20 réponses ✅']},piege:'Lire une hauteur de barre sans vérifier l’échelle verticale.',retenir:['Titre + axes + unités + légende.','Total = somme des effectifs.']},
'5k':{hook:'La distributivité transforme un produit avec parenthèses en somme de produits. C’est une règle essentielle du calcul littéral.',parts:[{t:'Formules',h:V.tbl(['Forme','Développement'],[['k(a+b)','ka+kb'],['k(a−b)','ka−kb']])},{t:'Pourquoi ?',h:'Multiplier un groupe entier par k revient à multiplier chacun de ses éléments par k.'},{t:'Calcul mental',h:'Elle aide aussi : 7×19 = 7×(20−1)=140−7=133.'}],ex:{q:'Développe 5(x+3)',s:['5 multiplie x : 5x.','5 multiplie 3 : 15.','Résultat : 5x+15 ✅']},piege:'Oublier de multiplier le deuxième terme de la parenthèse.',retenir:['Le facteur extérieur multiplie TOUS les termes.','Attention aux signes avec une soustraction.']},
'5l':{hook:'Prix, recettes, distances : quand deux grandeurs évoluent toujours dans le même rapport, elles sont proportionnelles.',parts:[{t:'Reconnaître',h:'Si on multiplie une grandeur par 2 et que l’autre est aussi multipliée par 2, la situation peut être proportionnelle.'},{t:'Coefficient',h:'Dans y=k×x, k est le coefficient de proportionnalité.'},{t:'Passage à l’unité',h:V.steps(['Divise pour trouver la valeur correspondant à 1.','Multiplie ensuite par la quantité recherchée.'])}],ex:{q:'4 cahiers coûtent 10 €. Prix de 7 ?',s:['1 cahier = 10÷4=2,50 €.','7 cahiers = 7×2,50.','=17,50 € ✅']},piege:'Ajouter la même quantité au lieu de multiplier par le même coefficient.',retenir:['Proportionnalité = multiplication par un nombre fixe.','Passer par 1 est souvent la méthode la plus sûre.']},
'5m':{hook:'Sur une carte, tout est réduit dans la même proportion. L’échelle donne précisément ce rapport.',parts:[{t:'Lire 1:n',h:'1 cm sur le plan correspond à n cm dans la réalité.'},{t:'Méthode',h:V.steps(['Multiplie la longueur du plan par n.','Convertis ensuite dans l’unité demandée.','Vérifie que la distance réelle est plus grande si l’échelle réduit.'])}],ex:{q:'Échelle 1:200, 4 cm sur le plan',s:['4×200=800 cm.','800 cm=8 m.','Distance réelle : 8 m ✅']},piege:'Mélanger mètres et centimètres avant d’avoir terminé le calcul.',retenir:['Même unité avant de comparer.','Réel = plan × dénominateur de l’échelle.']},
'5n':{hook:'Un volume mesure l’espace occupé par un solide. Pour un pavé droit, on empile des couches de petits cubes.',parts:[{t:'Formule',h:'V = longueur × largeur × hauteur.'},{t:'Unités',h:V.tbl(['Longueur','Volume associé'],[['cm','cm³'],['dm','dm³'],['m','m³']])+V.tip('1 dm³ = 1 litre.')},{t:'Interprétation',h:'Un cube de 1 cm de côté occupe 1 cm³.'}],ex:{q:'Boîte 8×5×3 cm',s:['Aire d’une couche : 8×5=40 cm².','3 couches : 40×3=120.','Volume =120 cm³ ✅']},piege:'Donner une réponse en cm² : un volume utilise une unité au cube.',retenir:['Trois dimensions → unité³.','Pavé : L×l×h.']},
'5o':{hook:'Les nombres négatifs permettent de se déplacer à gauche de 0 ou sous 0 : le repérage prend alors tout son sens.',parts:[{t:'Les quatre zones',h:'Le signe de x indique gauche/droite ; le signe de y indique bas/haut.'},{t:'Lire un point',h:V.steps(['Projette le point sur l’axe horizontal : x.','Projette-le sur l’axe vertical : y.','Écris (x ; y).'])}],ex:{q:'C(−4 ; −2)',s:['x négatif : à gauche.','y négatif : en dessous.','Le point est en bas à gauche ✅']},piege:'Oublier le signe − en recopiant une coordonnée.',retenir:['Horizontal=x. Vertical=y.','Toujours (x ; y).']},
'4k':{hook:'Deux parenthèses à multiplier : la règle est systématique. Chacun multiplie chacun.',parts:[{t:'Méthode FOIL',h:V.steps(['Premier×premier.','Premier×second.','Second×premier.','Second×second.','Réduis les termes semblables.'])},{t:'Exemple',h:'(x+2)(x+5)=x²+5x+2x+10=x²+7x+10.'}],ex:{q:'Développe (x+3)(x+4)',s:['x×x=x².','x×4=4x ; 3×x=3x.','3×4=12.','x²+7x+12 ✅']},piege:'Écrire seulement x²+12 et oublier les deux produits croisés.',retenir:['4 produits à faire.','Réduire seulement à la fin.']},
'4l':{hook:'Diviser par 2, c’est multiplier par 1/2. La même idée fonctionne avec toutes les fractions.',parts:[{t:'La règle',h:'a/b ÷ c/d = a/b × d/c.'},{t:'Méthode',h:V.steps(['Garde la première fraction.','Inverse la seconde.','Remplace ÷ par ×.','Multiplie puis simplifie.'])}],ex:{q:'3/4 ÷ 2/5',s:['On inverse 2/5 → 5/2.','3/4×5/2=15/8.','15/8 est irréductible ✅']},piege:'Inverser la première fraction ou les deux fractions.',retenir:['On inverse uniquement le diviseur.','Puis multiplication classique.']},
'4m':{hook:'Des triangles emboîtés et des droites parallèles permettent de calculer des longueurs impossibles à mesurer directement.',parts:[{t:'Condition essentielle',h:'Il faut reconnaître une configuration avec des droites parallèles.'},{t:'Rapports',h:'Les longueurs correspondantes sont proportionnelles : petit/grand = petit/grand.'},{t:'Produit en croix',h:'Une fois l’égalité des rapports écrite correctement, on isole la longueur inconnue.'}],ex:{q:'Petit côté 3, grand correspondant 9, autre petit côté 4',s:['Coefficient grand/petit =9÷3=3.','Autre grand côté =4×3.','=12 ✅']},piege:'Associer des côtés qui ne se correspondent pas.',retenir:['Parallèles indispensables.','Toujours garder le même ordre dans les rapports.']},
'4n':{hook:'Deux classes peuvent avoir la même moyenne mais des résultats très différents. Médiane et étendue donnent d’autres informations.',parts:[{t:'Médiane',h:'Après avoir trié la série, la médiane partage les données en deux groupes de même effectif.'},{t:'Étendue',h:'Étendue = valeur maximale − valeur minimale.'},{t:'Interpréter',h:'Petite étendue = valeurs regroupées ; grande étendue = valeurs dispersées.'}],ex:{q:'2 ; 5 ; 7 ; 9 ; 15',s:['La série est déjà triée.','La valeur centrale est 7 : médiane.','Étendue=15−2=13 ✅']},piege:'Chercher la médiane avant de trier la série.',retenir:['Trier d’abord.','Étendue=max−min.']},
'4o':{hook:'Un algorithme est une recette précise que l’ordinateur exécute sans deviner ce que l’on voulait dire.',parts:[{t:'Variables',h:'Une variable est une boîte nommée qui contient une valeur et peut changer.'},{t:'Boucles',h:'Une boucle répète une ou plusieurs instructions.'},{t:'Conditions',h:'« si… alors… sinon… » permet de choisir entre deux chemins.'}],ex:{q:'x=2, puis répéter 3 fois x←x+4',s:['Départ 2.','Après 1 fois :6 ; puis 10 ; puis 14.','Valeur finale 14 ✅']},piege:'Confondre « x←x+4 » avec une équation. C’est une affectation : la nouvelle valeur remplace l’ancienne.',retenir:['Exécuter dans l’ordre.','Noter chaque nouvelle valeur.']},
'3k':{hook:'Les fonctions affines décrivent des évolutions régulières : tarifs, conversions, mouvements à vitesse constante…',parts:[{t:'Forme',h:'f(x)=ax+b.'},{t:'Rôle de a',h:'a indique la variation de f(x) lorsque x augmente de 1 : c’est le coefficient directeur.'},{t:'Rôle de b',h:'b=f(0) : c’est l’ordonnée à l’origine.'},{t:'Graphique',h:'Toute fonction affine est représentée par une droite.'}],ex:{q:'f(x)=−2x+5, calcule f(3)',s:['Remplace x par 3.','−2×3+5=−6+5.','=−1 ✅']},piege:'Oublier les parenthèses quand x est négatif.',retenir:['a = pente de la droite.','b = valeur pour x=0.']},
'3l':{hook:'Deux inconnues et deux informations indépendantes permettent souvent de déterminer une solution unique.',parts:[{t:'Principe',h:'La solution (x ; y) doit vérifier les deux équations simultanément.'},{t:'Élimination',h:V.steps(['Arrange les équations.','Additionne ou soustrais pour faire disparaître une inconnue.','Trouve la première valeur.','Remplace-la pour trouver la seconde.'])}],ex:{q:'x+y=10 et x−y=4',s:['On additionne : 2x=14.','x=7.','7+y=10 donc y=3.','Solution (7 ; 3) ✅']},piege:'S’arrêter après avoir trouvé x : il faut aussi trouver y et vérifier.',retenir:['Une solution est un couple.','Vérifie dans les deux équations.']},
'3m':{hook:'Moyenne, médiane et étendue ne racontent pas la même chose. Les utiliser ensemble donne une vision plus juste d’une série.',parts:[{t:'Médiane',h:'Valeur qui partage la série ordonnée en deux moitiés.'},{t:'Étendue',h:'max−min : mesure simple de dispersion.'},{t:'Comparer',h:'Deux séries peuvent avoir la même moyenne, mais des médianes ou étendues différentes.'}],ex:{q:'4 ; 6 ; 7 ; 12 ; 20',s:['Médiane=7.','Étendue=20−4=16.','Ces deux nombres décrivent position et dispersion ✅']},piege:'Dire que la médiane est toujours la moyenne.',retenir:['Médiane = position.','Étendue = dispersion.']},
'3n':{hook:'Quand une expérience se déroule en plusieurs étapes, un arbre de probabilités aide à ne perdre aucun chemin.',parts:[{t:'Règle du chemin',h:'Sur un même chemin successif, on multiplie les probabilités.'},{t:'Plusieurs chemins favorables',h:'Si plusieurs chemins donnent le même événement, on additionne leurs probabilités.'},{t:'Contrôle',h:'La somme des probabilités des issues finales vaut 1.'}],ex:{q:'Deux lancers de pièce : P(Pile puis Face)',s:['P(Pile)=1/2.','Puis P(Face)=1/2.','1/2×1/2=1/4 ✅']},piege:'Additionner les probabilités le long d’un même chemin.',retenir:['Le long d’un chemin : ×.','Entre chemins favorables : +.']},
'3o':{hook:'Un programme est un algorithme écrit dans un langage exécutable. Pour le comprendre, on suit exactement ses variables, tests et boucles.',parts:[{t:'Tracer les variables',h:'Faire un petit tableau des valeurs évite les erreurs lors des boucles.'},{t:'Condition',h:'Une condition n’exécute son bloc que si elle est vraie.'},{t:'Boucle',h:'Repère précisément le nombre de répétitions et l’instruction répétée.'}],ex:{q:'x=5 ; répéter 4 fois x←x−2',s:['5→3→1→−1→−3.','Quatre répétitions ont été faites.','Valeur finale −3 ✅']},piege:'Compter la valeur de départ comme une répétition.',retenir:['Écrire les états successifs.','Tester les cas limites.']}
});

/* ===== ANGLAIS : outils ===== */
const NUM1=['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'],NUM10=['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];
const numW=n=>n<20?NUM1[n]:n===100?'one hundred':NUM10[Math.floor(n/10)]+(n%10?'-'+NUM1[n%10]:'');
const s3=v=>v==='have'?'has':/(s|sh|ch|x|z|o)$/.test(v)?v+'es':/[^aeiou]y$/.test(v)?v.slice(0,-1)+'ies':v+'s';
const s3bad=v=>/(s|sh|ch|x|z|o)$/.test(v)||/[^aeiou]y$/.test(v)?v+'s':v+'es';
const DBL={run:'running',swim:'swimming',sit:'sitting',stop:'stopping',get:'getting',cut:'cutting',begin:'beginning',shop:'shopping',put:'putting',plan:'planning'};
const ing=v=>DBL[v]||(v.endsWith('ie')?v.slice(0,-2)+'ying':v.endsWith('e')&&!v.endsWith('ee')?v.slice(0,-1)+'ing':v+'ing');
const DBLED={stop:'stopped',plan:'planned',travel:'travelled',shop:'shopped',drop:'dropped',chat:'chatted'};
const ed=v=>DBLED[v]||(v.endsWith('e')?v+'d':/[^aeiou]y$/.test(v)?v.slice(0,-1)+'ied':v+'ed');
const IRR=[['be','was/were','been','être'],['have','had','had','avoir'],['do','did','done','faire'],['go','went','gone','aller'],['see','saw','seen','voir'],['eat','ate','eaten','manger'],['drink','drank','drunk','boire'],['come','came','come','venir'],['take','took','taken','prendre'],['make','made','made','fabriquer'],['get','got','got','obtenir'],['give','gave','given','donner'],['buy','bought','bought','acheter'],['think','thought','thought','penser'],['say','said','said','dire'],['tell','told','told','raconter'],['write','wrote','written','écrire'],['read','read','read','lire'],['run','ran','run','courir'],['swim','swam','swum','nager'],['sing','sang','sung','chanter'],['begin','began','begun','commencer'],['know','knew','known','savoir'],['find','found','found','trouver'],['leave','left','left','partir'],['meet','met','met','rencontrer'],['sleep','slept','slept','dormir'],['speak','spoke','spoken','parler'],['break','broke','broken','casser'],['forget','forgot','forgotten','oublier'],['win','won','won','gagner'],['lose','lost','lost','perdre'],['teach','taught','taught','enseigner'],['catch','caught','caught','attraper'],['fly','flew','flown','voler (oiseau)'],['feel','felt','felt','ressentir'],['put','put','put','mettre'],['cut','cut','cut','couper'],['sit','sat','sat','s’asseoir'],['wear','wore','worn','porter (un vêtement)'],['choose','chose','chosen','choisir'],['fall','fell','fallen','tomber'],['drive','drove','driven','conduire'],['ride','rode','ridden','faire (du vélo, du cheval)'],['hear','heard','heard','entendre'],['send','sent','sent','envoyer'],['build','built','built','construire'],['draw','drew','drawn','dessiner'],['grow','grew','grown','grandir'],['bring','brought','brought','apporter'],['pay','paid','paid','payer'],['sell','sold','sold','vendre']];
const SUBJ=[['I','am','have','was',1],['You','are','have','were',0],['He','is','has','was',3],['She','is','has','was',3],['It','is','has','was',3],['We','are','have','were',0],['They','are','have','were',0],['Tom','is','has','was',3],['My sister','is','has','was',3],['My parents','are','have','were',0]];
const gapQ=(s,a,w,fr,h)=>[s,a,w,fr,h];
const lcf=s=>['He','She','It','We','They','You'].includes(s)||s.startsWith('My ')?s.charAt(0).toLowerCase()+s.slice(1):s;
const OBJV=['do','see','eat','drink','take','make','give','buy','write','find','break','forget','win','lose','catch','choose','hear','send','build','draw','bring','pay','sell','wear'];

const CH_EN={
'en6':[
{id:'en6a',name:'Saluer, se présenter',icon:'👋',
 f:{t:'Saluer et se présenter',l:[`${E('Hello / Hi')} : bonjour, salut.`,`${E('My name is…')} : je m’appelle…`,`${E('How are you?')} ${E('I’m fine, thank you.')}`],ex:E('Hello! My name is Léa. I’m twelve.')},
 g:d=>lmix(d,'en',{v:[['Bonjour, salut','Hello;Hi'],['Au revoir','Goodbye;Bye'],['Bonjour (le matin)','Good morning'],['Bonsoir','Good evening'],['Bonne nuit','Good night'],['Merci','Thank you;Thanks'],['S’il te plaît','Please'],['Enchanté(e)','Nice to meet you'],['Oui','Yes'],['Non','No']],
  f:[gapQ('My ___ is Tom.','name','names|is|am','Je m’appelle Tom.'),gapQ('How ___ you?','are','is|am|be','Comment vas-tu ?'),gapQ("I ___ fine, thank you.","am;'m",'is|are|be','Je vais bien, merci.'),gapQ('Nice to ___ you!','meet','see|know|met','Ravi de te rencontrer !'),gapQ('Where ___ you from?','are','is|am|do','D’où viens-tu ?'),gapQ("I'm ___ France.",'from','of|in|to','Je viens de France.')],
  o:[['My name is Tom','Je m’appelle Tom'],['How are you today','Comment vas-tu aujourd’hui ?'],['I am from France','Je viens de France'],['Nice to meet you','Ravi de te rencontrer']]})},
{id:'en6b',name:'Les nombres et l’âge',icon:'🔢',
 f:{t:'Compter et dire son âge',l:[`13 ${E('thirteen')} et 30 ${E('thirty')} : ne les confonds pas.`,`21 : ${E('twenty-one')}, avec un tiret.`,`${E('How old are you?')} ${E('I’m twelve.')} Jamais « I have 12 ».`],ex:E('I’m twelve years old.')},
 g:d=>{if(Math.random()<.25)return fq([gapQ('How ___ are you?','old','age|years|many','Quel âge as-tu ?'),gapQ("I ___ twelve years old.","am;'m",'have|has|is','J’ai douze ans.'),gapQ('She ___ thirteen.','is','has|have|are','Elle a treize ans.'),gapQ('My brothers ___ ten.','are','have|is|has','Mes frères ont dix ans.')],'en',d);
  const n=d===1?R(0,20):R(13,99),w=numW(n),near=[...new Set([n+10,n-10,n+1,n-1,n<20&&n>12?(n-10)*10:n%10*10+n%10,n+2].filter(x=>x>=0&&x<=100&&x!==n))].slice(0,3);
  const f=d===1?R(0,1):d===2?R(1,2):R(2,3);
  if(f===0)return Q.ch(`Comment s’écrit <b>${n}</b> en anglais ?`,E(w),near.map(x=>E(numW(x))),{lang:'en',hint:'Écoute bien la fin : -teen (13 à 19) ou -ty (dizaines).',expl:`${n} = ${E(w)}`});
  if(f===1)return Q.ch(`Quel nombre est ${E('<b>'+w+'</b>')} ?`,String(n),near.map(String),{lang:'en',hint:'Clique sur le mot pour l’écouter.',expl:`${E(w)} = ${n}`});
  if(f===2)return Q.num('🎧 Écoute le nombre et écris-le en chiffres.',n,{lang:'en',audio:{t:w,l:'en-GB'},hint:'Réécoute en mode lent si besoin.',expl:`Tu as entendu ${E(w)} = ${n}`});
  return Q.txt(`Écris <b>${n}</b> en lettres, en anglais.`,[w],{lang:'en',hint:n>20?'Dizaine, tiret, unité.':'Ça finit par -teen ?',expl:`${n} = ${E(w)}`});}},
{id:'en6c',name:'Couleurs et objets',icon:'🎨',
 f:{t:'Couleurs et objets de la classe',l:['L’adjectif se place AVANT le nom.',`Il ne s’accorde jamais : ${E('a red pen, two red pens')}.`,`${E('a')} devant une consonne, ${E('an')} devant une voyelle : ${E('an apple')}.`],ex:E('I have got a blue schoolbag.')},
 g:d=>lmix(d,'en',{v:[['rouge','red'],['bleu','blue'],['vert','green'],['jaune','yellow'],['noir','black'],['blanc','white'],['rose','pink'],['violet','purple'],['marron','brown'],['gris','grey;gray'],['un stylo','a pen;pen'],['un crayon','a pencil;pencil'],['une règle','a ruler;ruler'],['une gomme','a rubber;rubber;an eraser;eraser'],['un livre','a book;book'],['un cahier','an exercise book;exercise book;a notebook;notebook'],['une trousse','a pencil case;pencil case'],['un cartable','a schoolbag;schoolbag;a bag;bag']],
  f:[gapQ('I have ___ apple.','an','a|the|two'),gapQ('It is ___ blue pen.','a','an|two|the'),gapQ('She has ___ orange bag.','an','a|two|those'),gapQ('This is ___ umbrella.','an','a|two|these'),gapQ('He has ___ ruler.','a','an|two|these')],
  o:[['I have a red pen','J’ai un stylo rouge'],['My schoolbag is blue','Mon cartable est bleu'],['She has two green pencils','Elle a deux crayons verts']]})},
{id:'en6d',name:'La famille',icon:'👨‍👩‍👧',
 f:{t:'La famille et les possessifs',l:[`${E('Tom’s dog')} = le chien de Tom.`,`${E('his')} = son, sa (à lui). ${E('her')} = son, sa (à elle).`,`${E('my, your, his, her, its, our, their')}`],ex:E('This is my mother. Her name is Anna.')},
 g:d=>lmix(d,'en',{v:[['la mère','mother;mum'],['le père','father;dad'],['la sœur','sister'],['le frère','brother'],['la grand-mère','grandmother;grandma'],['le grand-père','grandfather;grandpa'],['la tante','aunt'],['l’oncle','uncle'],['le fils','son'],['la fille (de quelqu’un)','daughter'],['les parents','parents'],['le cousin, la cousine','cousin']],
  f:[gapQ('She loves ___ brother.','her','his|its|their','Elle aime son frère (à elle).'),gapQ('Tom plays with ___ sister.','his','her|its|their','Tom joue avec sa sœur (à lui).'),gapQ('We love ___ parents.','our','your|their|my','Nous aimons nos parents.'),gapQ('They visit ___ grandmother.','their','there|our|her','Ils rendent visite à leur grand-mère.'),gapQ('I play with ___ cousin.','my','me|I|mine','Je joue avec mon cousin.'),gapQ('This is Lisa___ cat.',"'s",'s|is|of','C’est le chat de Lisa.')]})},
{id:'en6e',name:'Le verbe BE',icon:'✋',
 f:{t:'BE : être',l:[`${E('I am, you are, he / she / it is, we are, they are')}`,`Négation : ${E('I’m not, he isn’t, they aren’t')}.`,`Question : on inverse. ${E('Are you happy?')}`],ex:E('She is twelve. Is she French? No, she isn’t.')},
 g:d=>{const s=P(SUBJ),c=P(['happy','at school','twelve','from London','hungry','in the garden','tired','my friend']),t=d===1?0:R(0,2);
  if(t===0)return fq([gapQ(`${s[0]} ___ ${c}.`,s[1]==='am'?"am;'m":s[1],['am','is','are','be'].filter(x=>x!==s[1]).join('|'),'',`${s[0]} → ${s[1]}`)],'en',d);
  if(t===1){const n=s[1]==='am'?"am not;'m not":s[1]==='is'?"isn't;is not":"aren't;are not";return fq([gapQ(`${s[0]} ___ ${c}. (négatif)`,n,s[1]==='am'?"isn't|amn't|don't":s[1]==='is'?"aren't|don't|not is":"isn't|don't|not are",'',`Négatif : ${s[1]} + not`)],'en',d);}
  const q=s[1].charAt(0).toUpperCase()+s[1].slice(1);return fq([gapQ(`___ ${lcf(s[0])} ${c}?`,q,['Am','Is','Are','Do'].filter(x=>x!==q).join('|'),'','Question : le verbe passe devant le sujet.')],'en',d);}},
{id:'en6f',name:'HAVE GOT',icon:'🎒',
 f:{t:'HAVE GOT : avoir, posséder',l:[`${E('I / you / we / they have got')}`,`${E('he / she / it has got')}`,`Négation : ${E('haven’t got, hasn’t got')}. Question : ${E('Have you got…?')}`],ex:E('She has got a dog. Have you got a pet?')},
 g:d=>{const s=P(SUBJ),o=P(['a dog','two sisters','a new bike','blue eyes','long hair','a big house']),t=d===1?0:R(0,2),h=s[2];
  if(t===0)return fq([gapQ(`${s[0]} ___ got ${o}.`,h,h==='has'?'have|is|haves':'has|are|is','',`${s[0]} → ${h} got`)],'en',d);
  if(t===1)return fq([gapQ(`${s[0]} ___ got ${o}. (négatif)`,h==='has'?"hasn't;has not":"haven't;have not",h==='has'?"haven't|doesn't|isn't":"hasn't|don't|aren't",'','Négatif : have / has + not')],'en',d);
  const q=h==='has'?'Has':'Have';return fq([gapQ(`___ ${lcf(s[0])} got ${o}?`,q,q==='Has'?'Have|Is|Does':'Has|Are|Do','','Question : Have / Has devant le sujet.')],'en',d);}},
{id:'en6g',name:'Jours, mois, dates',icon:'📅',
 f:{t:'Jours et mois',l:['Ils prennent toujours une MAJUSCULE en anglais.',`${E('on')} + jour (${E('on Monday')}), ${E('in')} + mois (${E('in May')}), ${E('at')} + heure (${E('at 5')}).`],ex:E('My birthday is on Monday, the 3rd of May.')},
 g:d=>{const D=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],DF=['lundi','mardi','mercredi','jeudi','vendredi','samedi','dimanche'],MO=['January','February','March','April','May','June','July','August','September','October','November','December'],MF=['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre'];
  const t=R(0,3);
  if(t===0)return vq(D.map((x,i)=>[DF[i],x]),'en',d);
  if(t===1)return vq(MO.map((x,i)=>[MF[i],x]),'en',d);
  if(t===2){const i=R(0,6),j=(i+1)%7;return fq([gapQ(`The day after ${D[i]} is ___.`,D[j],shuffle(D.filter(x=>x!==D[j])).slice(0,3).join('|'),`Le jour après ${DF[i]} est…`)],'en',d);}
  return fq([gapQ('I go to the cinema ___ Saturday.','on','in|at|the'),gapQ('My birthday is ___ May.','in','on|at|the'),gapQ('School starts ___ 8 o’clock.','at','in|on|the'),gapQ('We go to the beach ___ summer.','in','on|at|the'),gapQ('___ Sunday, I sleep a lot.','On','In|At|The')],'en',d);}},
{id:'en6h',name:'Pronoms personnels',icon:'🧑',
 f:{t:'Les pronoms sujets',l:[`${E('I')} je, ${E('you')} tu ou vous, ${E('he')} il, ${E('she')} elle.`,`${E('it')} : une chose ou un animal.`,`${E('we')} nous, ${E('they')} ils ou elles.`],ex:E('Tom is my friend. He is funny.')},
 g:d=>{const it=P([['Tom','He','is'],['Lisa','She','is'],['My dog','It','is'],['Tom and I','We','are'],['Lisa and Tom','They','are'],['The books','They','are'],['The cat','It','is'],['My mother','She','is'],['My father','He','is'],['You and Tom','You','are']]),c=P(['nice','at home','small','in the kitchen']);
  if(Math.random()<.35)return vq([['je','I'],['tu','you'],['il','he'],['elle','she'],['nous','we'],['ils, elles','they']],'en',d);
  return fq([gapQ(`(${it[0]}) ___ ${it[2]} ${c}.`,it[1],['He','She','It','We','They','You'].filter(x=>x!==it[1]).join('|'),`Remplace « ${it[0]} » par un pronom.`)],'en',d);}},
{id:'en6i',name:'Le pluriel',icon:'🐾',
 f:{t:'Le pluriel des noms',l:[`En général : + s. ${E('cat → cats')}`,`Après s, sh, ch, x : + es. ${E('box → boxes')}`,`Consonne + y : ies. ${E('baby → babies')}. Irréguliers : ${E('child → children, man → men, foot → feet')}`],ex:E('two boxes, three babies, four children')},
 g:d=>{const B=[['cat','cats'],['box','boxes'],['bus','buses'],['watch','watches'],['dish','dishes'],['baby','babies'],['city','cities'],['boy','boys'],['toy','toys'],['knife','knives'],['leaf','leaves'],['child','children'],['man','men'],['woman','women'],['foot','feet'],['tooth','teeth'],['mouse','mice'],['person','people'],['sheep','sheep'],['fish','fish']],[s,p]=P(B);
  const wr=[...new Set([s+'s',s+'es',s.replace(/y$/,'ies'),s+'ies',s.replace(/f(e)?$/,'ves')].filter(x=>x!==p))].slice(0,3);
  if(d===3)return Q.txt(`Écris le pluriel de ${E('<b>'+s+'</b>')}.`,[p],{lang:'en',hint:'Pense aux règles -es, -ies et aux irréguliers.',expl:`${E(s)} → ${E(p)}`});
  return Q.ch(`Quel est le pluriel de ${E('<b>'+s+'</b>')} ?`,E(p),wr.map(E),{lang:'en',hint:'Regarde la dernière lettre du mot.',expl:`${E(s)} → ${E(p)}`});}},
{id:'en6j',name:'CAN : savoir, pouvoir',icon:'💪',
 f:{t:'CAN',l:[`${E('can')} + verbe sans ${E('to')} : ${E('I can swim')}.`,`Pas de -s : ${E('she can')}, jamais « she cans ».`,`Négation : ${E('can’t / cannot')}. Question : ${E('Can you…?')}`],ex:E('I can ride a bike but I can’t swim.')},
 g:d=>lmix(d,'en',{v:[['nager','swim'],['courir','run'],['danser','dance'],['chanter','sing'],['cuisiner','cook'],['dessiner','draw'],['sauter','jump'],['lire','read'],['faire du vélo','ride a bike'],['jouer de la guitare','play the guitar']],
  f:[gapQ('She ___ swim very well.','can','cans|can to|is can','Elle sait très bien nager.'),gapQ('I ___ speak Chinese.',"can't;cannot;can not","don't can|not can|can to",'Je ne sais pas parler chinois.'),gapQ('___ you play the guitar?','Can','Do can|Are|Cans','Sais-tu jouer de la guitare ?'),gapQ('He can ___ fast.','run','runs|running|to run','Il sait courir vite.')],
  o:[['I can play the piano','Je sais jouer du piano'],['Can you swim','Sais-tu nager ?'],['My dog can jump high','Mon chien sait sauter haut']]})},
{id:'en6k',name:'A / AN / THE',icon:'🅰️',
 f:{t:'Les articles',l:[`${E('a')} devant un son consonne, ${E('an')} devant un son voyelle.`,`${E('the')} désigne quelque chose de précis ou déjà connu.`,`Pas d’article devant certaines généralités : ${E('I like chocolate')}.`],ex:E('I have a dog. The dog is black.')},
 g:d=>fq([gapQ('I have ___ cat.','a','an|the|two'),gapQ('She eats ___ apple.','an','a|the|some'),gapQ('___ sun is hot.','The','A|An|Some'),gapQ('He is ___ English boy.','an','a|the|some'),gapQ('I can see ___ moon.','the','a|an|some'),gapQ('This is ___ new book.','a','an|the|two')],'en',d)},
{id:'en6l',name:'Adjectifs possessifs',icon:'🔐',
 f:{t:'My, your, his, her…',l:[`${E('my')} mon/ma/mes, ${E('your')} ton/ta/tes, ${E('his')} son/sa à lui, ${E('her')} son/sa à elle.`,`${E('our')} notre/nos, ${E('their')} leur/leurs.`,`Le possessif dépend du possesseur, pas de l’objet.`],ex:E('Emma loves her dog. Tom loves his dog.')},
 g:d=>fq([gapQ('I love ___ family.','my','his|her|their'),gapQ('Tom likes ___ bike.','his','her|our|my'),gapQ('Anna plays with ___ sister.','her','his|their|my'),gapQ('We do ___ homework.','our','your|their|his'),gapQ('They visit ___ grandparents.','their','our|his|her'),gapQ('You open ___ book.','your','my|his|their')],'en',d)},
{id:'en6m',name:'THIS / THAT / THESE / THOSE',icon:'👉',
 f:{t:'Montrer une chose ou plusieurs',l:[`${E('this')} : ceci, près, singulier. ${E('that')} : cela, loin, singulier.`,`${E('these')} : ceux-ci, près, pluriel. ${E('those')} : ceux-là, loin, pluriel.`,`Le nombre est essentiel : ${E('this book')} mais ${E('these books')}.`],ex:E('This pen is mine. Those shoes are yours.')},
 g:d=>fq([gapQ('___ book here is mine.','This','These|Those|That'),gapQ('___ shoes here are new.','These','This|That|Those'),gapQ('___ house over there is big.','That','This|These|Those'),gapQ('___ birds over there are beautiful.','Those','This|That|These'),gapQ('___ pencils in my hand are blue.','These','This|That|Those')],'en',d)},
{id:'en6n',name:'THERE IS / THERE ARE',icon:'🏠',
 f:{t:'Dire « il y a »',l:[`${E('There is')} + singulier. ${E('There are')} + pluriel.`,`Négation : ${E("There isn't")}, ${E("There aren't")}.`,`Question : ${E('Is there…?')} / ${E('Are there…?')}`],ex:E('There is a bed. There are two chairs.')},
 g:d=>fq([gapQ('___ a cat in the garden.',"There is;There's",'There are|It is|They are'),gapQ('___ three books on the table.','There are','There is|It are|They is'),gapQ('___ a bathroom upstairs?','Is there','Are there|There is|Is it'),gapQ('___ any windows?','Are there','Is there|There are|Are they'),gapQ('There ___ two bedrooms.','are','is|am|be')],'en',d)},
{id:'en6o',name:'Prépositions de lieu',icon:'📍',
 f:{t:'Situer un objet',l:[`${E('in')} dans, ${E('on')} sur, ${E('under')} sous.`,`${E('behind')} derrière, ${E('in front of')} devant, ${E('next to')} à côté de.`,`${E('between')} entre deux éléments, ${E('opposite')} en face de.`],ex:E('The cat is under the table, next to the chair.')},
 g:d=>lmix(d,'en',{v:[['dans','in'],['sur','on'],['sous','under'],['derrière','behind'],['devant','in front of'],['à côté de','next to'],['entre','between'],['en face de','opposite']],f:[gapQ('The book is ___ the table.','on','in|under|behind'),gapQ('The cat is ___ the bed.','under','on|between|opposite'),gapQ('The school is ___ the bank and the park.','between','in|under|behind')]})},
{id:'en6p',name:'Prépositions de temps',icon:'⏰',
 f:{t:'IN / ON / AT',l:[`${E('at')} pour une heure précise : ${E('at 8 o’clock')}.`,`${E('on')} pour un jour ou une date : ${E('on Monday')}.`,`${E('in')} pour mois, saisons, années et parties de journée : ${E('in July')}, ${E('in winter')}.`],ex:E('School starts at eight on Monday in September.')},
 g:d=>fq([gapQ('School starts ___ 8 o’clock.','at','on|in|to'),gapQ('I play football ___ Saturday.','on','in|at|to'),gapQ('My birthday is ___ May.','in','on|at|to'),gapQ('It is cold ___ winter.','in','on|at|to'),gapQ('We have English ___ Tuesday morning.','on','in|at|to')],'en',d)},
{id:'en6q',name:'Présent simple',icon:'🔁',
 f:{t:'Parler des habitudes',l:[`Avec ${E('I / you / we / they')}, on garde le verbe : ${E('I play')}.`,`Avec ${E('he / she / it')}, on ajoute souvent -s : ${E('She plays')}.`,`Le présent simple sert aux habitudes, goûts et vérités générales.`],ex:E('I walk to school. My brother walks to school too.')},
 g:d=>fq([gapQ('I ___ football every Wednesday.','play','plays|playing|am play'),gapQ('She ___ football every Wednesday.','plays','play|playing|is play'),gapQ('Tom ___ TV after dinner.','watches','watch|watchs|watching'),gapQ('We ___ English at school.','study','studies|studys|studying'),gapQ('My cat ___ a lot.','sleeps','sleep|sleeping|is sleep')],'en',d)},
{id:'en6r',name:'LIKE / LOVE / HATE',icon:'❤️',
 f:{t:'Exprimer ses goûts',l:[`${E('I like…')} j’aime, ${E('I love…')} j’adore, ${E('I hate…')} je déteste.`,`Avec une activité : ${E('I like swimming')} ou ${E('I like to swim')}.`,`Avec he/she : ${E('She likes music')}.`],ex:E('I love pizza but I hate spinach.')},
 g:d=>fq([gapQ('I ___ chocolate. (j’aime)','like','likes|am like|liking'),gapQ('She ___ cats. (adore)','loves','love|loving|is love'),gapQ('Tom ___ getting up early. (déteste)','hates','hate|hating|is hate'),gapQ('We like ___ football.','playing','play|plays|played'),gapQ('He ___ music.','likes','like|liking|is like')],'en',d)},
{id:'en6s',name:'Routine quotidienne',icon:'🌅',
 f:{t:'Parler de sa journée',l:[`${E('get up')} se lever, ${E('have breakfast')} prendre le petit-déjeuner, ${E('go to school')} aller à l’école.`,`${E('have lunch')} déjeuner, ${E('do homework')} faire ses devoirs, ${E('go to bed')} se coucher.`,`On utilise souvent le présent simple avec ${E('every day')}.`],ex:E('I get up at seven and I go to school at eight.')},
 g:d=>lmix(d,'en',{v:[['se lever','get up'],['prendre le petit-déjeuner','have breakfast'],['aller à l’école','go to school'],['déjeuner','have lunch'],['faire ses devoirs','do homework'],['se coucher','go to bed']],o:[['I get up at seven','Je me lève à sept heures'],['I do my homework after school','Je fais mes devoirs après l’école'],['I go to bed at ten','Je me couche à dix heures']]})},
{id:'en6t',name:'Dire l’heure',icon:'🕒',
 f:{t:'What time is it?',l:[`${E("It's three o'clock")} = 3 h 00.`,`${E('half past three')} = 3 h 30 ; ${E('quarter past three')} = 3 h 15.`,`${E('quarter to four')} = 3 h 45. ${E('past')} = après, ${E('to')} = avant l’heure suivante.`],ex:E("It's twenty past four.")},
 g:d=>fq([gapQ("It's three ___.",'o’clock','hours|clock|hour'),gapQ("It's ___ past two. (2 h 30)",'half','quarter|thirty|to'),gapQ("It's quarter ___ five. (5 h 15)",'past','to|at|after'),gapQ("It's quarter ___ six. (5 h 45)",'to','past|at|after')],'en',d)},
{id:'en6u',name:'La météo',icon:'🌦️',
 f:{t:'Parler du temps',l:[`${E("It's sunny / cloudy / windy / rainy")}.`,`Température : ${E("It's ten degrees")}.`,`Question : ${E("What's the weather like?")}`],ex:E("It's cold and windy today.")},
 g:d=>lmix(d,'en',{v:[['ensoleillé','sunny'],['nuageux','cloudy'],['venteux','windy'],['pluvieux','rainy'],['neigeux','snowy'],['chaud','hot'],['froid','cold']],f:[gapQ("What's the weather ___?",'like','look|is|today'),gapQ("It ___ sunny today.",'is',"'s|are|am")]})},
{id:'en6v',name:'La maison et les pièces',icon:'🛋️',
 f:{t:'Les pièces de la maison',l:[`${E('kitchen')} cuisine, ${E('living room')} salon, ${E('bedroom')} chambre.`,`${E('bathroom')} salle de bain, ${E('garden')} jardin, ${E('garage')} garage.`,`Pour décrire : ${E('There are three bedrooms in my house')}.`],ex:E('My bedroom is upstairs, next to the bathroom.')},
 g:d=>lmix(d,'en',{v:[['la cuisine','kitchen'],['le salon','living room'],['la chambre','bedroom'],['la salle de bain','bathroom'],['le jardin','garden'],['le garage','garage'],['la salle à manger','dining room']],o:[['My bedroom is upstairs','Ma chambre est à l’étage'],['There is a sofa in the living room','Il y a un canapé dans le salon']]})},
{id:'en6w',name:'Les vêtements',icon:'👕',
 f:{t:'Décrire ses vêtements',l:[`${E('T-shirt, jumper, trousers, jeans, skirt, dress, shoes, trainers')}.`,`Couleur avant le nom : ${E('a blue T-shirt')}.`,`Pour dire ce qu’on porte : ${E('I am wearing…')}.`],ex:E('She is wearing black jeans and white trainers.')},
 g:d=>lmix(d,'en',{v:[['un tee-shirt','a T-shirt;T-shirt'],['un pull','a jumper;jumper'],['un pantalon','trousers'],['un jean','jeans'],['une jupe','a skirt;skirt'],['une robe','a dress;dress'],['des chaussures','shoes'],['des baskets','trainers']],f:[gapQ('She is ___ a red dress.','wearing','wear|wears|wore')]})},
{id:'en6x',name:'Nourriture et boissons',icon:'🍎',
 f:{t:'Manger et boire',l:[`${E('bread, rice, pasta, cheese, chicken, vegetables, fruit')}.`,`${E('water, milk, juice')}.`,`Pour commander simplement : ${E("I'd like…")}; pour parler de ses goûts : ${E('I like…')}.`],ex:E("I'd like a sandwich and some water, please.")},
 g:d=>lmix(d,'en',{v:[['le pain','bread'],['le riz','rice'],['les pâtes','pasta'],['le fromage','cheese'],['le poulet','chicken'],['les légumes','vegetables'],['les fruits','fruit'],['l’eau','water'],['le lait','milk'],['le jus','juice']],f:[gapQ("I'd ___ some water, please.",'like','love|wanting|likes')]})},
{id:'en6y',name:'Le corps humain',icon:'🧍',
 f:{t:'Les parties du corps',l:[`${E('head')} tête, ${E('eyes')} yeux, ${E('ears')} oreilles, ${E('nose')} nez, ${E('mouth')} bouche.`,`${E('arm, hand, leg, foot')}.`,`Pluriels irréguliers utiles : ${E('foot → feet')}, ${E('tooth → teeth')}.`],ex:E('I have two eyes, two ears and two feet.')},
 g:d=>lmix(d,'en',{v:[['la tête','head'],['les yeux','eyes'],['les oreilles','ears'],['le nez','nose'],['la bouche','mouth'],['le bras','arm'],['la main','hand'],['la jambe','leg'],['le pied','foot;feet']],f:[gapQ('One foot, two ___.','feet','foots|foot|feets')]})},
{id:'en6z',name:'Les animaux',icon:'🐶',
 f:{t:'Animaux familiers et sauvages',l:[`${E('dog, cat, rabbit, hamster, fish, bird')}.`,`${E('lion, tiger, elephant, monkey, giraffe')}.`,`Décrire : ${E('It has got four legs. It can run fast.')}`],ex:E('My dog has got brown eyes and it can swim.')},
 g:d=>lmix(d,'en',{v:[['un chien','a dog;dog'],['un chat','a cat;cat'],['un lapin','a rabbit;rabbit'],['un poisson','a fish;fish'],['un oiseau','a bird;bird'],['un lion','a lion;lion'],['un éléphant','an elephant;elephant'],['un singe','a monkey;monkey']],f:[gapQ('A bird can ___.','fly','flies|flying|to fly')]})},
{id:'en6aa',name:'Le matériel scolaire',icon:'🎒',
 f:{t:'Dans la classe',l:[`${E('pen, pencil, ruler, rubber, pencil case, schoolbag')}.`,`${E('book, exercise book, desk, chair, board')}.`,`Pour demander : ${E('Can I borrow your ruler, please?')}`],ex:E('My pencil case is in my schoolbag.')},
 g:d=>lmix(d,'en',{v:[['un stylo','a pen;pen'],['un crayon','a pencil;pencil'],['une règle','a ruler;ruler'],['une gomme','a rubber;rubber'],['une trousse','a pencil case;pencil case'],['un cartable','a schoolbag;schoolbag'],['un bureau','a desk;desk'],['une chaise','a chair;chair']],o:[['Can I borrow your ruler','Puis-je emprunter ta règle ?'],['Open your exercise book','Ouvre ton cahier']]})},
{id:'en6ab',name:'Pays et nationalités',icon:'🌍',
 f:{t:'Dire d’où l’on vient',l:[`${E('France → French')}, ${E('England → English')}, ${E('Spain → Spanish')}.`,`${E('Italy → Italian')}, ${E('Germany → German')}, ${E('Ireland → Irish')}.`,`Pays : ${E("I'm from France")}. Nationalité : ${E("I'm French")}.`],ex:E('She is from Spain. She is Spanish.')},
 g:d=>lmix(d,'en',{v:[['français','French'],['anglais','English'],['espagnol','Spanish'],['italien','Italian'],['allemand','German'],['irlandais','Irish']],f:[gapQ("I'm ___ France.",'from','of|in|at'),gapQ('She is from Italy. She is ___.','Italian','Italy|Italish|French')]})},
{id:'en6ac',name:'Consignes de classe',icon:'🏫',
 f:{t:'Comprendre le professeur',l:[`${E('Open your book. Close your book. Listen. Repeat.')}`,`${E('Read. Write. Look at the board. Work in pairs.')}`,`${E('Stand up. Sit down. Be quiet, please.')}`],ex:E('Open your book and read exercise three.')},
 g:d=>lmix(d,'en',{v:[['ouvre ton livre','open your book'],['ferme ton livre','close your book'],['écoute','listen'],['répète','repeat'],['lis','read'],['écris','write'],['regarde le tableau','look at the board'],['travaillez par deux','work in pairs'],['assieds-toi','sit down'],['lève-toi','stand up']]})},
{id:'en6ad',name:'Poser des questions simples',icon:'❓',
 f:{t:'Construire une question',l:[`Avec BE : on inverse : ${E('Are you tired?')}.`,`Avec CAN : ${E('Can you swim?')}.`,`Avec un mot interrogatif : ${E('What is your name?')}, ${E('Where are you from?')}, ${E('How old are you?')}.`],ex:E('Where are you from? I am from France.')},
 g:d=>fq([gapQ('___ is your name?','What','Where|Who|How'),gapQ('___ are you from?','Where','What|When|Why'),gapQ('___ old are you?','How','What|Where|Who'),gapQ('___ you swim?','Can','Are|Do|Have'),gapQ('___ you happy?','Are','Do|Can|Have')],'en',d)}
],
'en5':[
{id:'en5a',name:'Présent simple',icon:'🔁',
 f:{t:'Le présent simple (habitudes)',l:['Pour les habitudes et les vérités générales.',`Avec ${E('he, she, it')} : on ajoute -s. ${E('She plays')}.`,`${E('-es')} après s, sh, ch, x, o (${E('goes, watches')}) ; ${E('-ies')} après consonne + y (${E('studies')}).`],ex:E('My brother plays football every Saturday.')},
 g:d=>{const V=[['play','football'],['watch','TV'],['go','to school'],['do','homework'],['study','English'],['have','breakfast'],['like','pizza'],['live','in Paris'],['read','books'],['wash','the dishes'],['finish','work at 5'],['carry','a big bag'],['teach','maths'],['fix','bikes'],['miss','the bus']],[v,c]=P(V),s=P(SUBJ.filter(x=>x[0]!=='It')),third=s[4]===3,a=third?s3(v):v,cc=c;
  if(d===1)return Q.ch(`${E(`${s[0]} usually <span class="gap">___</span> ${cc}.`)} (${E(v)})`,E(a),[third?v:s3(v),ing(v),s3bad(v)].filter(x=>x!==a).slice(0,3).map(E),{lang:'en',hint:third?'He, she, it : on ajoute un -s.':'Pas de -s avec ce sujet.',expl:E(`${s[0]} usually <b>${a}</b> ${cc}.`)});
  return Q.txt(`${E(`${s[0]} usually <span class="gap">___</span> ${cc}.`)} (${E(v)})`,[a],{lang:'en',hint:third?'He, she, it : -s, -es ou -ies.':'Pas de -s avec ce sujet.',expl:E(`${s[0]} usually <b>${a}</b> ${cc}.`)});}},
{id:'en5b',name:'Négation et questions',icon:'❓',
 f:{t:'DO / DOES au présent simple',l:[`Négation : ${E('don’t')} + verbe, ou ${E('doesn’t')} + verbe (he, she, it).`,`Question : ${E('Do / Does')} + sujet + verbe.`,`Le -s passe sur ${E('does')} : ${E('She doesn’t like')}, jamais « doesn’t likes ».`],ex:E('Does she like pizza? No, she doesn’t.')},
 g:d=>{const V=['like coffee','play tennis','live in London','speak Spanish','watch TV','eat meat'],c=P(V),s=P(SUBJ.filter(x=>x[0]!=='It')),third=s[4]===3,t=R(0,1),[v,...rest]=c.split(' ');
  if(t===0)return fq([gapQ(`${s[0]} ___ ${rest.join(' ')}.`,third?`doesn't ${v};does not ${v}`:`don't ${v};do not ${v}`,third?`don't ${v}|doesn't ${s3(v)}|not ${s3(v)}`:`doesn't ${v}|don't ${s3(v)}|not ${v}`,`(négatif de « ${v} »)`)],'en',d);
  return fq([gapQ(`___ ${lcf(s[0])} ${c}?`,third?'Does':'Do',third?'Do|Is|Are':'Does|Is|Are','')],'en',d);}},
{id:'en5c',name:'Présent en BE + -ING',icon:'⏳',
 f:{t:'Le présent continu (en ce moment)',l:[`BE + verbe-ING : ${E('I am reading')}.`,`Pour une action en cours : ${E('now, at the moment, Look!, Listen!')}`,`Orthographe : ${E('make → making, swim → swimming, lie → lying')}`],ex:E('Look! The cat is sleeping on my bed.')},
 g:d=>{const v=P(['dance','run','swim','play','read','write','eat','sleep','sit','watch','cook','make','ride','study','take','stop','shop','get']),s=P(SUBJ),neg=d===3&&Math.random()<.4,a=ing(v);
  const be=s[1],full=neg?(be==='am'?`am not ${a}`:be==='is'?`isn't ${a};is not ${a}`:`aren't ${a};are not ${a}`):`${be} ${a}`;
  const wr=neg?`${be} not ${v}ing|don't ${v}|not ${a}`:`${be} ${v}ing|${a}|${be} ${v}`;
  return fq([gapQ(`Now, ${lcf(s[0])} ___ (${v}${neg?', négatif':''}).`,full,wr.split('|').filter(x=>!full.split(';').includes(x)).join('|'),'',`BE (${be}) + ${v} + ING`)],'en',d);}},
{id:'en5d',name:'Simple ou BE + -ING ?',icon:'⚖️',
 f:{t:'Habitude ou action en cours ?',l:[`Habitude (${E('every day, usually, often, never')}) : présent simple.`,`Action en cours (${E('now, Look!, Listen!, at the moment')}) : BE + -ING.`],ex:E('I usually walk to school, but today I am taking the bus.')},
 g:d=>fq([gapQ('I usually ___ (walk) to school.','walk','am walking|walks|walking'),gapQ('Look! It ___ (rain).','is raining','rains|rain|raining'),gapQ('She ___ (play) tennis every Sunday.','plays','is playing|play|playing'),gapQ('Listen! The baby ___ (cry).','is crying','cries|cry|crying'),gapQ('We ___ (watch) TV right now.','are watching','watch|watches|watching'),gapQ('My dad never ___ (cook).','cooks','is cooking|cook|cooking'),gapQ('They ___ (go) to the cinema on Fridays.','go','are going|goes|going'),gapQ('Be quiet! I ___ (study).','am studying','study|studies|studying'),gapQ('He often ___ (read) comics.','reads','is reading|read|reading'),gapQ('At the moment, Tom ___ (sleep).','is sleeping','sleeps|sleep|sleeping')],'en',d)},
{id:'en5e',name:'Adverbes de fréquence',icon:'🔄',
 f:{t:'Always, often, never…',l:[`${E('always')} toujours, ${E('usually')} d’habitude, ${E('often')} souvent, ${E('sometimes')} parfois, ${E('never')} jamais.`,'Place : AVANT le verbe, mais APRÈS be.'],ex:E('I always get up early. She is never late.')},
 g:d=>lmix(d,'en',{v:[['toujours','always'],['d’habitude','usually'],['souvent','often'],['parfois','sometimes'],['rarement','rarely'],['jamais','never']],
  o:[['I always get up early','Je me lève toujours tôt'],['She is never late','Elle n’est jamais en retard'],['They usually play football','Ils jouent d’habitude au foot'],['He often reads comics','Il lit souvent des BD'],['We sometimes go to the beach','Nous allons parfois à la plage'],['My cat is always hungry','Mon chat a toujours faim']],
  f:[gapQ('I ___ eat vegetables. (jamais)','never','always|often|ever'),gapQ('She ___ goes to bed late. (parfois)','sometimes','never|always|usually')]})},
{id:'en5f',name:'There is / are, lieux',icon:'📍',
 f:{t:'Il y a… et les prépositions',l:[`${E('There is')} + singulier, ${E('There are')} + pluriel.`,`Question : ${E('Is there…? Are there…?')}`,`${E('in')} dans, ${E('on')} sur, ${E('under')} sous, ${E('behind')} derrière, ${E('next to')} à côté de.`],ex:E('There is a cat under the table.')},
 g:d=>lmix(d,'en',{v:[['dans','in'],['sur','on'],['sous','under'],['derrière','behind'],['devant','in front of'],['à côté de','next to'],['entre','between'],['en face de','opposite']],
  f:[gapQ('___ a cat on the sofa.',"There is;There's",'There are|It is|They are'),gapQ('___ two books on the desk.','There are','There is|It are|They is'),gapQ('___ any milk in the fridge?','Is there','Are there|There is|Is it'),gapQ('___ any apples?','Are there','Is there|There are|Are they'),gapQ('The ball is ___ the bed.','under','in|on|between','La balle est sous le lit.'),gapQ('The bank is ___ the school.','next to','between|in|on','La banque est à côté de l’école.')]})},
{id:'en5g',name:'Nourriture, some / any',icon:'🍎',
 f:{t:'Some, any, much, many',l:[`${E('some')} : phrase affirmative. ${E('any')} : négation et question.`,`${E('many')} + dénombrable (${E('apples')}), ${E('much')} + indénombrable (${E('water')}).`],ex:E('I have some apples but I don’t have any milk.')},
 g:d=>lmix(d,'en',{v:[['le pain','bread'],['le lait','milk'],['le fromage','cheese'],['une pomme','an apple;apple'],['un œuf','an egg;egg'],['l’eau','water'],['le poulet','chicken'],['le riz','rice'],['le sucre','sugar'],['les légumes','vegetables']],
  f:[gapQ('I have ___ apples.','some','any|much|a'),gapQ('Do you have ___ brothers?','any;many','some|much|a'),gapQ("There isn't ___ milk.",'any;much','some|many|a'),gapQ('How ___ sugar do you want?','much','many|any|some'),gapQ('How ___ pens have you got?','many','much|any|some'),gapQ("We don't have ___ time.",'much;any','many|some|a')]})},
{id:'en5h',name:'Mots interrogatifs',icon:'🕵️',
 f:{t:'Poser des questions',l:[`${E('What')} quoi, ${E('Where')} où, ${E('When')} quand, ${E('Who')} qui, ${E('Why')} pourquoi, ${E('How')} comment.`,`${E('How old')} quel âge, ${E('How many')} combien.`],ex:E('Where do you live? In Paris.')},
 g:d=>lmix(d,'en',{v:[['quoi, que','what'],['où','where'],['quand','when'],['qui','who'],['pourquoi','why'],['comment','how'],['combien','how many;how much']],
  f:[gapQ('___ do you live? In Paris.','Where','When|Who|What'),gapQ('___ is your birthday? In May.','When','Where|Who|Why'),gapQ('___ is that girl? My sister.','Who','What|Where|Why'),gapQ('___ are you sad? Because I lost my dog.','Why','How|When|Who'),gapQ('___ old are you? Twelve.','How','What|Who|Why'),gapQ('___ is your favourite colour? Blue.','What','Who|Where|How')],
  o:[['Where do you live','Où habites-tu ?'],['What is your name','Comment t’appelles-tu ?'],['Why are you late','Pourquoi es-tu en retard ?']]})},
{id:'en5i',name:'Mine, yours, whose',icon:'🔑',
 f:{t:'Les pronoms possessifs',l:[`${E('mine, yours, his, hers, ours, theirs')} remplacent nom + possessif.`,`${E('It’s my book')} = ${E('It’s mine')}.`,`${E('Whose…?')} : à qui ?`],ex:E('Whose bag is this? It’s hers.')},
 g:d=>fq([gapQ('This book is ___. (à moi)','mine','my|me|I'),gapQ('Is this pen ___? (à toi)','yours','your|you|your’s'),gapQ('The red bike is ___. (à elle)','hers','her|her’s|she'),gapQ('That house is ___. (à nous)','ours','our|us|our’s'),gapQ('These dogs are ___. (à eux)','theirs','their|them|there'),gapQ('The blue cap is ___. (à lui)','his','him|he|he’s'),gapQ('___ bag is this?','Whose',"Who's|Who|Whom"),gapQ('It’s ___ book.','my','mine|me|I')],'en',d)},
{id:'en5j',name:'Dire l’heure',icon:'🕒',
 f:{t:'What time is it?',l:[`${E('o’clock')} : heure pile. ${E('half past')} : et demie.`,`${E('quarter past')} : et quart. ${E('quarter to')} : moins le quart.`,`${E('ten past four')} 4 h 10, ${E('ten to five')} 4 h 50.`],ex:E('It’s half past three.')},
 g:d=>{const tw=(h,m)=>{const nx=h%12+1;return m===0?`${numW(h)} o'clock`:m===15?`quarter past ${numW(h)}`:m===30?`half past ${numW(h)}`:m===45?`quarter to ${numW(nx)}`:m<30?`${numW(m)} past ${numW(h)}`:`${numW(60-m)} to ${numW(nx)}`;};
  const h=R(1,12),m=P(d===1?[0,30,15,45]:[0,15,30,45,5,10,20,25,40,50,55]),w=tw(h,m),dig=`${h}:${String(m).padStart(2,'0')}`;
  const opts=new Set([w]);[[h,(m+30)%60],[h%12+1,m],[h===1?12:h-1,m],[h,60-m===60?0:60-m]].forEach(([a,b])=>{if(opts.size<4)opts.add(tw(a,b));});
  const oth=[...opts].filter(x=>x!==w),dg=(a,b)=>`${a}:${String(b).padStart(2,'0')}`;
  if(Math.random()<.5)return Q.ch(`Il est <b>${dig}</b>. Comment le dit-on ?`,E("It's "+w),oth.map(x=>E("It's "+x)),{lang:'en',hint:'Moins de 30 minutes : past. Plus de 30 : to + heure suivante.',expl:`${dig} = ${E("It's "+w)}`});
  const other=new Set([dig]);[[h,(m+30)%60],[h%12+1,m],[h===1?12:h-1,m],[h%12+1,(m+15)%60]].forEach(([a,b])=>{if(other.size<4)other.add(dg(a,b));});
  return Q.ch('🎧 Écoute l’heure. Quelle est la bonne ?',dig,[...other].filter(x=>x!==dig),{lang:'en',audio:{t:"It's "+w,l:'en-GB'},hint:'Repère past ou to.',expl:`${E("It's "+w)} = ${dig}`});}}
],
'en4':[
{id:'en4a',name:'WAS / WERE',icon:'⏮️',
 f:{t:'BE au passé',l:[`${E('I / he / she / it was')}`,`${E('you / we / they were')}`,`Négation : ${E('wasn’t, weren’t')}. Question : ${E('Was he…? Were you…?')}`],ex:E('I was at home yesterday. Were you at school?')},
 g:d=>{const s=P(SUBJ),c=P(['at home yesterday','tired last night','in London last week','happy at the party','late this morning']),t=d===1?0:R(0,2),w=s[3];
  if(t===0)return fq([gapQ(`${s[0]} ___ ${c}.`,w,w==='was'?'were|is|are':'was|are|is','',`${s[0]} → ${w}`)],'en',d);
  if(t===1)return fq([gapQ(`${s[0]} ___ ${c}. (négatif)`,w==='was'?"wasn't;was not":"weren't;were not",w==='was'?"weren't|didn't|isn't":"wasn't|didn't|aren't",'')],'en',d);
  const q=w==='was'?'Was':'Were';return fq([gapQ(`___ ${lcf(s[0])} ${c}?`,q,q==='Was'?'Were|Did|Is':'Was|Did|Are','')],'en',d);}},
{id:'en4b',name:'Prétérit régulier (-ED)',icon:'🕰️',
 f:{t:'Le prétérit des verbes réguliers',l:['Action terminée dans le passé : verbe + ED, pour tous les sujets.',`${E('like → liked')}, ${E('study → studied')}, ${E('stop → stopped')}`,`Marqueurs : ${E('yesterday, last week, ago, in 2010')}`],ex:E('Yesterday, I played football and watched a film.')},
 g:d=>{const V=[['play','football'],['watch','a film'],['visit','my grandma'],['walk','to school'],['cook','pasta'],['clean','my room'],['like','the book'],['live','in Rome'],['dance','all night'],['study','for the test'],['try','sushi'],['carry','the bags'],['stop','the car'],['travel','to Spain']],[v,c]=P(V),s=P(SUBJ.filter(x=>x[0]!=='It')),a=ed(v);
  const wr=[...new Set([v,s3(v),v+'ed',v+'d',ing(v)].filter(x=>x!==a))].slice(0,3);
  if(d===1)return Q.ch(E(`Yesterday, ${lcf(s[0])} <span class="gap">___</span> ${c}.`)+` (${E(v)})`,E(a),wr.map(E),{lang:'en',hint:'Yesterday : prétérit, verbe + ED.',expl:E(`Yesterday, ${lcf(s[0])} <b>${a}</b> ${c}.`)});
  return Q.txt(E(`Yesterday, ${lcf(s[0])} <span class="gap">___</span> ${c}.`)+` (${E(v)})`,[a],{lang:'en',hint:/y$/.test(v)?'Consonne + y : ied.':'Verbe + ED (attention à l’orthographe).',expl:E(`Yesterday, ${lcf(s[0])} <b>${a}</b> ${c}.`)});}},
{id:'en4c',name:'Verbes irréguliers (prétérit)',icon:'🌀',
 f:{t:'Les verbes irréguliers au prétérit',l:['Ils ne prennent pas -ED : on les apprend par cœur.',`${E('go → went, see → saw, eat → ate, have → had')}`,'Révise 5 verbes par jour, à voix haute.'],ex:E('Last summer, we went to Italy and ate pizza.')},
 g:d=>{const L=IRR.filter(x=>x[0]!=='be'),[b,p,,fr]=P(L.slice(0,d===1?20:L.length)),oth=shuffle(L.filter(x=>x[1]!==p)).slice(0,3).map(x=>x[1]);
  const t=d===1?0:R(0,2);
  if(t===0)return Q.ch(`Prétérit du verbe ${E('<b>'+b+'</b>')} (${fr}) ?`,E(p),[b+'ed',...oth.slice(0,2)].filter(x=>x!==p).map(E),{lang:'en',hint:'C’est un verbe irrégulier.',expl:`${E(b)} → ${E(p)}`});
  if(t===1)return Q.txt(`Prétérit du verbe ${E('<b>'+b+'</b>')} (${fr}) ?`,[p],{lang:'en',hint:`Ça commence par « ${p[0]} ».`,expl:`${E(b)} → ${E(p)}`});
  return Q.ch(`Que veut dire ${E('<b>'+p+'</b>')} ?`,`le prétérit de « ${fr} »`,shuffle(L.filter(x=>x[1]!==p)).slice(0,3).map(x=>`le prétérit de « ${x[3]} »`),{lang:'en',hint:'Pense à la base verbale.',expl:`${E(p)} vient du verbe ${E(b)} (${fr}).`});}},
{id:'en4d',name:'Prétérit : négation, questions',icon:'🚫',
 f:{t:'DID',l:[`Négation : ${E('didn’t')} + base verbale. ${E('I didn’t go')}.`,`Question : ${E('Did')} + sujet + base. ${E('Did you see…?')}`,'Après did, le verbe reste à la base : jamais « didn’t went ».'],ex:E('Did you see the film? No, I didn’t see it.')},
 g:d=>{const L=IRR.filter(x=>OBJV.includes(x[0])),[b,p]=P(L),s=P(SUBJ.filter(x=>x[0]!=='It')),t=R(0,2),sj=lcf(s[0]);
  if(t===0)return fq([gapQ(`${s[0]} ___ yesterday. (${b}, négatif)`,`didn't ${b};did not ${b}`,`didn't ${p}|don't ${b}|wasn't ${b}`,'','didn’t + base verbale')],'en',d);
  if(t===1)return fq([gapQ(`___ ${sj} ${b} it yesterday?`,'Did','Do|Does|Was','','Question au passé : Did')],'en',d);
  return fq([gapQ(`Did ${sj} ___ it yesterday? (${b})`,b,`${p}|${s3(b)}|${ing(b)}`,'','Après did : base verbale')],'en',d);}},
{id:'en4e',name:'Comparatifs, superlatifs',icon:'🏆',
 f:{t:'Comparer',l:[`Adjectif court : ${E('-er than')} / ${E('the -est')}. ${E('tall → taller → the tallest')}`,`Adjectif long : ${E('more … than')} / ${E('the most …')}`,`Irréguliers : ${E('good → better → the best')}, ${E('bad → worse → the worst')}`],ex:E('My brother is taller than me. He is the tallest in his class.')},
 g:d=>{const IRA={good:['better','best'],bad:['worse','worst'],far:['further','furthest']},LONG=['beautiful','expensive','interesting','difficult','dangerous','famous'],DB={big:'bigg',hot:'hott',thin:'thinn',sad:'sadd'};
  const cmp=a=>IRA[a]?IRA[a][0]:LONG.includes(a)?'more '+a:/[^aeiou]y$/.test(a)?a.slice(0,-1)+'ier':DB[a]?DB[a]+'er':a.endsWith('e')?a+'r':a+'er';
  const sup=a=>IRA[a]?IRA[a][1]:LONG.includes(a)?'most '+a:/[^aeiou]y$/.test(a)?a.slice(0,-1)+'iest':DB[a]?DB[a]+'est':a.endsWith('e')?a+'st':a+'est';
  const a=P(['tall','small','old','young','fast','big','hot','happy','easy','funny','nice','good','bad','beautiful','expensive','interesting','difficult','dangerous']),ct=Math.random()<.5;
  if(ct){const r=cmp(a);return fq([gapQ(`My brother is ___ than me. (${a})`,r,[...new Set([a+'er',`more ${a}`,sup(a),a+'est'])].filter(x=>x!==r).slice(0,3).join('|'),'',LONG.includes(a)?'Adjectif long : more … than':'Adjectif court : -er than')],'en',d);}
  const r=sup(a);return fq([gapQ(`It is the ___ house in the street. (${a})`,r,[...new Set([cmp(a),a+'est',`most ${a}`,a+'er'])].filter(x=>x!==r).slice(0,3).join('|'),'',LONG.includes(a)?'Adjectif long : the most …':'Adjectif court : the -est')],'en',d);}},
{id:'en4f',name:'Le futur : WILL, GOING TO',icon:'🔮',
 f:{t:'Parler du futur',l:[`${E('will')} + base : prédiction, décision soudaine. ${E('I will help you')}.`,`${E('be going to')} + base : projet déjà décidé. ${E('I am going to visit Rome')}.`,`Négation : ${E('won’t')}, ${E('am not going to')}.`],ex:E('Tomorrow it will be sunny. We are going to play tennis.')},
 g:d=>{const v=P(['visit','play','watch','help','call','buy']),c={visit:'her grandma',play:'tennis',watch:'a film',help:'you',call:'Tom',buy:'a new phone'}[v],s=P(SUBJ),w=Math.random()<.5,sj=s[0];
  if(w)return fq([gapQ(`Tomorrow, ${lcf(sj)} ___ ${c}. (${v}, WILL)`,`will ${v};'ll ${v}`,`will ${s3(v)}|will to ${v}|${s[1]} going ${v}`,'','will + base verbale, pour tous les sujets')],'en',d);
  return fq([gapQ(`${sj} ___ ${c} tomorrow. (${v}, GOING TO)`,`${s[1]} going to ${v}`,`going to ${v}|${s[1]} going ${v}|will going to ${v}`,'',`BE (${s[1]}) + going to + base`)],'en',d);}},
{id:'en4g',name:'MUST, HAVE TO',icon:'⛔',
 f:{t:'Obligation et interdiction',l:[`${E('must')} / ${E('have to')} : obligation.`,`${E('mustn’t')} : interdiction.`,`${E('don’t have to')} : pas obligé (absence d’obligation).`],ex:E('You must wear a helmet. You mustn’t run here.')},
 g:d=>fq([gapQ('You ___ wear a helmet on a bike. (obligation)','must;have to',"mustn't|can|don't have to"),gapQ('You ___ use your phone in class. (interdiction)',"mustn't;must not","must|have to|don't have to"),gapQ("It's Sunday, I ___ get up early. (pas obligé)","don't have to;do not have to","mustn't|must|have to"),gapQ('She ___ do her homework every evening. (obligation)','has to;must',"have to|must to|mustn't"),gapQ('Students ___ run in the corridors. (interdiction)',"mustn't;must not",'must|have to|has to'),gapQ('We ___ wear a uniform at school. (obligation)','have to;must',"has to|mustn't|don't have to")],'en',d)},
{id:'en4h',name:'Prétérit en BE + -ING',icon:'🎬',
 f:{t:'Le passé continu',l:[`${E('was / were')} + verbe-ING : action en cours dans le passé.`,`Souvent avec ${E('when')} : ${E('I was reading when the phone rang.')}`],ex:E('At 8 pm, we were watching TV.')},
 g:d=>{const v=P(['watch','read','sleep','cook','play','run','swim','eat','write','dance']),c={watch:'TV',read:'a book',sleep:'',cook:'dinner',play:'video games',run:'in the park',swim:'in the sea',eat:'pizza',write:'a letter',dance:''}[v],s=P(SUBJ),a=`${s[3]} ${ing(v)}`;
  return fq([gapQ(`At 8 pm yesterday, ${lcf(s[0])} ___ ${c}. (${v})`.replace(' .','.').replace('  ',' '),a,`${s[3]==='was'?'were':'was'} ${ing(v)}|${ed(v)}|${s[3]} ${v}`,'',`${s[3]} + ${ing(v)}`)],'en',d);}},
{id:'en4i',name:'Pronoms compléments',icon:'🎯',
 f:{t:'Me, him, her, us, them',l:[`Après le verbe ou une préposition : ${E('me, you, him, her, it, us, them')}.`,`${E('I love her')}. ${E('Look at them')}.`],ex:E('Can you help me? Call him tonight!')},
 g:d=>{const it=P([['I love ___. (Lisa)','her'],['Call ___ tonight. (Tom)','him'],['Look at ___. (the dogs)','them'],['Can you help ___? (moi)','me'],['She invited ___. (Tom and me)','us'],["I don't like ___. (the film)",'it'],['Give the book to ___. (Paul)','him'],['Listen to ___! (les professeurs)','them']]);
  const all=['me','him','her','it','us','them'],sub={me:'I',him:'he',her:'she',it:'its',us:'we',them:'they'};
  return fq([gapQ(it[0],it[1],[sub[it[1]],...shuffle(all.filter(x=>x!==it[1])).slice(0,2)].join('|'),'','Après le verbe : pronom complément.')],'en',d);}},
{id:'en4j',name:'Loisirs et sports',icon:'⚽',
 f:{t:'Parler de ses loisirs',l:[`Après ${E('like, love, hate, enjoy')} : verbe + ING.`,`${E('I love swimming')}. ${E('She hates cooking')}.`,`${E('play')} + sport de balle, ${E('go')} + activité en -ING (${E('go swimming')}).`],ex:E('I enjoy reading and I play basketball on Saturdays.')},
 g:d=>lmix(d,'en',{v:[['la lecture','reading'],['la natation','swimming'],['le vélo','cycling'],['le ski','skiing'],['le dessin','drawing'],['la danse','dancing'],['l’équitation','horse riding;riding'],['la cuisine (activité)','cooking'],['le jardinage','gardening'],['le basket','basketball']],
  f:[gapQ('I love ___. (swim)','swimming;to swim','swim|swims|swiming'),gapQ('She hates ___. (cook)','cooking;to cook','cook|cooks|cookking'),gapQ('We enjoy ___ films. (watch)','watching','watch|to watch|watches'),gapQ('They ___ football every Monday.','play','go|do|make'),gapQ('My dad ___ skiing in winter.','goes','plays|does|makes')]})}
],
'en3':[
{id:'en3a',name:'Present perfect',icon:'🔗',
 f:{t:'HAVE + participe passé',l:[`${E('have / has')} + participe passé : ${E('I have visited, she has seen')}.`,'Expérience ou bilan, sans date précise.',`Avec ${E('ever, never, already, just, yet')}.`],ex:E('I have never seen snow. Have you ever been to London?')},
 g:d=>{const L=[...IRR.filter(x=>OBJV.includes(x[0])).map(x=>[x[0],x[2]]),['visit','visited'],['play','played'],['finish','finished'],['watch','watched']],[b,pp]=P(L),s=P(SUBJ.filter(x=>x[0]!=='It')),h=s[2],neg=d===3&&Math.random()<.4;
  const a=neg?(h==='has'?`hasn't ${pp};has not ${pp}`:`haven't ${pp};have not ${pp}`):`${h} ${pp}`;
  const pret=(IRR.find(x=>x[0]===b)||[0,ed(b)])[1].split('/')[0];
  const wr=[`${h==='has'?'have':'has'} ${pp}`,`${h} ${pret}`,`${pret}`].filter(x=>!a.split(';').includes(x)&&x!==`${h} ${pp}`);
  return fq([gapQ(`${s[0]} ___ it${neg?'':' before'}. (${b}${neg?', négatif':''})`,a,wr.join('|')||`${pp}|${b}|${pret}`,'',`${h} + participe passé de ${b}`)],'en',d);}},
{id:'en3b',name:'Present perfect ou prétérit',icon:'⌛',
 f:{t:'For, since, ago',l:[`${E('since')} + point de départ (${E('since 2015')}).`,`${E('for')} + durée (${E('for three years')}).`,`${E('ago')} + prétérit : ${E('two years ago')}. Date précise = prétérit.`],ex:E('I have lived here since 2015. I moved here ten years ago.')},
 g:d=>fq([gapQ('I have lived here ___ 2015.','since','for|ago|during'),gapQ('She has studied English ___ three years.','for','since|ago|during'),gapQ('We met two years ___.','ago','for|since|before'),gapQ('I ___ that film last week. (see)','saw','have seen|seen|see'),gapQ('He has been ill ___ Monday.','since','for|ago|from'),gapQ('They moved to Paris five years ___.','ago','for|since|after'),gapQ('___ you ever been to London?','Have','Did|Do|Are'),gapQ('I ___ sushi. (never, eat)','have never eaten','never ate|have never ate|never eaten')],'en',d)},
{id:'en3c',name:'Participes passés irréguliers',icon:'🧩',
 f:{t:'La 3e colonne',l:['Base, prétérit, participe passé : on les apprend ensemble.',`${E('go, went, gone')} ; ${E('see, saw, seen')} ; ${E('write, wrote, written')}`],ex:E('I have written a letter.')},
 g:d=>{const L=IRR.filter(x=>x[0]!=='be'),[b,p,pp,fr]=P(L),oth=shuffle(L.filter(x=>x[2]!==pp)).slice(0,2).map(x=>x[2]);
  if(d===3)return Q.txt(`${E(`${b}, ${p}, <span class="gap">___</span>`)} (${fr})`,[pp],{lang:'en',hint:`Ça commence par « ${pp[0]} ».`,expl:E(`${b}, ${p}, <b>${pp}</b>`)});
  return Q.ch(`${E(`${b}, ${p}, <span class="gap">___</span>`)} (${fr})`,E(pp),[...new Set([p===pp?b+'ed':p,...oth])].filter(x=>x!==pp).slice(0,3).map(E),{lang:'en',hint:'C’est la 3e colonne du tableau.',expl:E(`${b}, ${p}, <b>${pp}</b>`)});}},
{id:'en3d',name:'Condition : IF + présent',icon:'🌦️',
 f:{t:'Le conditionnel réel',l:[`${E('If')} + présent, ${E('will')} + base.`,`${E('If it rains, we will stay at home.')}`,'Jamais de will juste après if.'],ex:E('If you study, you will pass.')},
 g:d=>fq([gapQ('If it rains, we ___ at home. (stay)',"will stay;'ll stay",'stay|would stay|stayed'),gapQ('If you ___ hard, you will pass. (study)','study','will study|studied|studies'),gapQ('If she ___ late, she will miss the bus. (be)','is','will be|was|be'),gapQ('If I see Tom, I ___ him. (tell)',"will tell;'ll tell",'tell|told|would tell'),gapQ('If we ___ now, we will arrive on time. (leave)','leave','will leave|left|leaves'),gapQ('They ___ angry if you are late. (be)',"will be;'ll be",'are|would be|were')],'en',d)},
{id:'en3e',name:'Condition : IF + prétérit',icon:'💭',
 f:{t:'L’hypothèse (si j’étais…)',l:[`${E('If')} + prétérit, ${E('would')} + base.`,`Avec be : ${E('If I were…')} (ou ${E('was')} à l’oral).`],ex:E('If I were rich, I would travel around the world.')},
 g:d=>fq([gapQ('If I ___ rich, I would buy a boat. (be)','were;was','am|would be|will be'),gapQ('If I won the lottery, I ___ the world. (travel)',"would travel;'d travel",'will travel|travelled|travel'),gapQ('If she ___ more, she would be better. (practise)','practised;practiced','practises|would practise|will practise'),gapQ('What would you do if you ___ a dragon? (see)','saw','see|would see|seen'),gapQ('If we had time, we ___ you. (help)',"would help;'d help",'will help|helped|help')],'en',d)},
{id:'en3f',name:'La voix passive',icon:'🏗️',
 f:{t:'BE + participe passé',l:['On met en avant ce qui subit l’action.',`Présent : ${E('is / are made')}. Prétérit : ${E('was / were built')}.`,`L’auteur avec ${E('by')} : ${E('painted by Leonardo')}.`],ex:E('The Eiffel Tower was built in 1889.')},
 g:d=>fq([gapQ('English ___ all over the world. (speak)','is spoken','speaks|is speaking|spoken'),gapQ('This bridge ___ in 1900. (build)','was built','built|is building|were built'),gapQ('The Mona Lisa ___ by Leonardo da Vinci. (paint)','was painted','painted|is painting|were painted'),gapQ('Cars ___ in this factory. (make)','are made','make|is made|are making'),gapQ('The letters ___ yesterday. (send)','were sent','was sent|sent|are sent'),gapQ('Rice ___ in China. (grow)','is grown','grows|is growing|are grown'),gapQ('The window ___ last night. (break)','was broken','broke|is broken|were broken')],'en',d)},
{id:'en3g',name:'Pronoms relatifs',icon:'🔗',
 f:{t:'Who, which, that, whose, where',l:[`${E('who')} : personne. ${E('which')} : chose. ${E('that')} : les deux.`,`${E('whose')} : dont, à qui. ${E('where')} : où (lieu).`],ex:E('The girl who lives next door has a dog which barks a lot.')},
 g:d=>fq([gapQ('The girl ___ lives next door is my friend.','who;that','which|whose|where'),gapQ('The book ___ I bought is great.','which;that','who|whose|where'),gapQ("That's the boy ___ father is a pilot.",'whose','who|which|that'),gapQ('This is the town ___ I was born.','where','which|who|whose'),gapQ('I have a phone ___ takes great photos.','which;that','who|whose|where'),gapQ('The teacher ___ helps us is nice.','who;that','which|whose|where')],'en',d)},
{id:'en3h',name:'Conseil, possibilité',icon:'💡',
 f:{t:'Should, could, might',l:[`${E('should')} : conseil. ${E('shouldn’t')} : déconseillé.`,`${E('might / may')} : peut-être.`,`${E('could')} : capacité passée ou demande polie.`],ex:E('You should rest. It might rain later.')},
 g:d=>fq([gapQ('You look tired. You ___ go to bed.','should',"shouldn't|mustn't|might not"),gapQ('You ___ eat so many sweets.',"shouldn't;should not",'should|must|could'),gapQ('Take an umbrella, it ___ rain.','might;may;could','should|must|would'),gapQ('When I was five, I ___ swim.','could','can|might|should'),gapQ('___ you help me, please?','Could;Can','Should|Might|Must')],'en',d)},
{id:'en3i',name:'USED TO',icon:'📼',
 f:{t:'Les habitudes passées',l:[`${E('used to')} + base : une habitude qui n’existe plus.`,`Négation : ${E('didn’t use to')}. Question : ${E('Did you use to…?')}`],ex:E('I used to play with dolls. I didn’t use to like vegetables.')},
 g:d=>{const it=P([['play with dolls','jouer à la poupée'],['live in Lyon','habiter à Lyon'],['have long hair','avoir les cheveux longs'],['watch cartoons','regarder des dessins animés'],['hate vegetables','détester les légumes']]),neg=Math.random()<.35,v=it[0].split(' ')[0],rest=it[0].split(' ').slice(1).join(' ');
  if(neg)return fq([gapQ(`When I was young, I ___ ${rest}. (${v}, négatif)`,`didn't use to ${v};did not use to ${v}`,`didn't used to ${v}|don't use to ${v}|used not ${v}`,'')],'en',d);
  return fq([gapQ(`When I was young, I ___ ${rest}. (${v})`,`used to ${v}`,`use to ${v}|used ${v}|was used to ${v}`,`Quand j’étais petit, j’avais l’habitude ${/^[aeiouyéèêàâîïôûh]/i.test(it[1])?'d’':'de '}${it[1]}.`)],'en',d);}},
{id:'en3j',name:'Mots de liaison',icon:'🧵',
 f:{t:'Relier ses idées',l:[`${E('and')} et, ${E('but')} mais, ${E('so')} donc, ${E('because')} parce que.`,`${E('however')} cependant, ${E('although')} bien que.`,`${E('first, then, finally')} : d’abord, ensuite, enfin.`],ex:E('I was tired, so I went to bed. However, I couldn’t sleep.')},
 g:d=>lmix(d,'en',{v:[['et','and'],['mais','but'],['donc','so'],['parce que','because'],['cependant','however'],['bien que','although'],['ensuite','then'],['enfin','finally']],
  f:[gapQ('I was tired, ___ I went to bed.','so','because|but|although'),gapQ('I stayed at home ___ I was ill.','because','so|but|however'),gapQ("She is rich, ___ she isn't happy.",'but','so|because|then'),gapQ('___ it was cold, we went swimming.','Although','Because|So|However'),gapQ('It was raining. ___, we played outside.','However','Although|Because|So'),gapQ('___, open the box. Then, take the cake.','First','Finally|However|Although')]})}
]};

/* ===== ITALIEN : outils ===== */
const SOGG=['io','tu','lui','lei','noi','voi','loro'],SIDX=[0,1,2,2,3,4,5];
const IRRP={essere:['sono','sei','è','siamo','siete','sono'],avere:['ho','hai','ha','abbiamo','avete','hanno'],andare:['vado','vai','va','andiamo','andate','vanno'],fare:['faccio','fai','fa','facciamo','fate','fanno'],venire:['vengo','vieni','viene','veniamo','venite','vengono'],stare:['sto','stai','sta','stiamo','state','stanno'],bere:['bevo','bevi','beve','beviamo','bevete','bevono'],uscire:['esco','esci','esce','usciamo','uscite','escono'],potere:['posso','puoi','può','possiamo','potete','possono'],volere:['voglio','vuoi','vuole','vogliamo','volete','vogliono'],dovere:['devo','devi','deve','dobbiamo','dovete','devono']};
const ISC=['finire','capire','preferire','pulire'];
function presIT(v){if(IRRP[v])return IRRP[v];const st=v.slice(0,-3),t=v.slice(-3),en=t==='are'?['o','i','a','iamo','ate','ano']:t==='ere'?['o','i','e','iamo','ete','ono']:ISC.includes(v)?['isco','isci','isce','iamo','ite','iscono']:['o','i','e','iamo','ite','ono'];
 return en.map(e=>t==='are'&&/[cg]$/.test(st)&&/^[ie]/.test(e)?st+'h'+e:st.endsWith('i')&&e.startsWith('i')?st+e.slice(1):st+e);}
const FST={essere:'sar',avere:'avr',andare:'andr',fare:'far',venire:'verr',potere:'potr',vedere:'vedr',volere:'vorr',dovere:'dovr',stare:'star',bere:'berr'};
function stemF(v){if(FST[v])return FST[v];const b=v.slice(0,-3),t=v.slice(-3);return t==='are'?(/[cg]$/.test(b)?b+'her':/(ci|gi)$/.test(b)?b.slice(0,-1)+'er':b+'er'):t==='ere'?b+'er':b+'ir';}
const futIT=v=>['ò','ai','à','emo','ete','anno'].map(e=>stemF(v)+e),condIT=v=>['ei','esti','ebbe','emmo','este','ebbero'].map(e=>stemF(v)+e);
const IMPI={essere:['ero','eri','era','eravamo','eravate','erano'],fare:'face',bere:'beve',dire:'dice'};
const impIT=v=>Array.isArray(IMPI[v])?IMPI[v]:['vo','vi','va','vamo','vate','vano'].map(e=>(IMPI[v]||v.slice(0,-2))+e);
const PPI={fare:'fatto',prendere:'preso',leggere:'letto',scrivere:'scritto',vedere:'visto',bere:'bevuto',mettere:'messo',aprire:'aperto',dire:'detto',venire:'venuto',nascere:'nato',rimanere:'rimasto',chiudere:'chiuso',perdere:'perso',vincere:'vinto',essere:'stato'};
const ppIT=v=>PPI[v]||v.slice(0,-3)+(v.endsWith('are')?'ato':v.endsWith('ere')?'uto':'ito');
const NIT=['zero','uno','due','tre','quattro','cinque','sei','sette','otto','nove','dieci','undici','dodici','tredici','quattordici','quindici','sedici','diciassette','diciotto','diciannove'],TIT=['','','venti','trenta','quaranta','cinquanta','sessanta','settanta','ottanta','novanta'];
const numIT=n=>{if(n<20)return NIT[n];if(n===100)return 'cento';let t=TIT[Math.floor(n/10)];const u=n%10;if(!u)return t;if(u===1||u===8)t=t.slice(0,-1);return t+(u===3?'tré':NIT[u]);};
const cap=s=>s.charAt(0).toUpperCase()+s.slice(1);
function conjQ(d,verbs,fn,label,ctx){const [v,c]=P(verbs),k=R(0,6),forms=fn(v),a=forms[SIDX[k]],sj=SOGG[k];
 const wr=[...new Set(forms.filter(x=>x!==a))].sort(()=>Math.random()-.5).slice(0,3),sjt=ctx?sj:cap(sj),s=`${ctx?ctx+' ':''}${sjt} <span class="gap">___</span> ${c}.`;
 const ex=IT(`${ctx?ctx+' ':''}${sjt} <b>${a}</b> ${c}.`);
 if(d===1||(d===2&&Math.random()<.5))return Q.ch(`${IT(s)} (${IT(v)}, ${label})`,IT(a),wr.map(IT),{lang:'it',hint:`Sujet « ${sj} » : regarde la terminaison.`,expl:ex});
 return Q.txt(`${IT(s)} (${IT(v)}, ${label})`,[a],{lang:'it',hint:`Ça commence par « ${a.slice(0,3)} ».`,expl:ex});}

const CH_IT={
'it5':[
{id:'it5a',name:'Saluer, se présenter',icon:'👋',
 f:{t:'Ciao !',l:[`${IT('Ciao')} : salut ou au revoir (entre amis).`,`${IT('Mi chiamo…')} : je m’appelle… ${IT('Come ti chiami?')}`,`${IT('Come stai? Sto bene, grazie.')}`],ex:IT('Ciao! Mi chiamo Léa. Sono francese.')},
 g:d=>lmix(d,'it',{v:[['Salut, au revoir','Ciao'],['Bonjour','Buongiorno'],['Bonsoir','Buonasera'],['Bonne nuit','Buonanotte'],['Au revoir','Arrivederci'],['Merci','Grazie'],['De rien','Prego'],['S’il te plaît','Per favore'],['Pardon','Scusa'],['Oui','Sì'],['Je vais bien','Sto bene']],
  f:[gapQ('Mi ___ Giulia.','chiamo','chiami|chiama|nome','Je m’appelle Giulia.'),gapQ('Come ___? Bene, grazie.','stai','sei|sta|stare','Comment vas-tu ?'),gapQ('Io ___ francese.','sono','ho|è|sei','Je suis français(e).'),gapQ('Di dove ___? Sono di Parigi.','sei','sono|è|hai','D’où es-tu ?')],
  o:[['Mi chiamo Luca','Je m’appelle Luca'],['Come ti chiami','Comment t’appelles-tu ?'],['Piacere di conoscerti','Ravi de te connaître']]})},
{id:'it5b',name:'Les nombres et l’âge',icon:'🔢',
 f:{t:'Contare',l:[`${IT('venti, ventuno, ventidue, ventitré')} : on perd la voyelle devant ${IT('uno')} et ${IT('otto')}.`,`${IT('Quanti anni hai?')} ${IT('Ho dodici anni.')} : avec le verbe avoir, comme en français.`],ex:IT('Ho dodici anni.')},
 g:d=>{if(Math.random()<.25)return fq([gapQ('Quanti anni ___? (tu)','hai','sei|ha|hanno','Quel âge as-tu ?'),gapQ('Ho dodici ___.','anni','ani|età|anno','J’ai douze ans.'),gapQ('Mia sorella ___ dieci anni.','ha','è|ho|hai','Ma sœur a dix ans.')],'it',d);
  const n=d===1?R(0,20):R(13,99),w=numIT(n),near=[...new Set([n+10,n-10,n+1,n-1,n+2].filter(x=>x>=0&&x<=100&&x!==n))].slice(0,3),f=d===1?R(0,1):d===2?R(1,2):R(2,3);
  if(f===0)return Q.ch(`Comment s’écrit <b>${n}</b> en italien ?`,IT(w),near.map(x=>IT(numIT(x))),{lang:'it',hint:'Dizaine + unité, collés.',expl:`${n} = ${IT(w)}`});
  if(f===1)return Q.ch(`Quel nombre est ${IT('<b>'+w+'</b>')} ?`,String(n),near.map(String),{lang:'it',hint:'Clique sur le mot pour l’écouter.',expl:`${IT(w)} = ${n}`});
  if(f===2)return Q.num('🎧 Écoute le nombre et écris-le en chiffres.',n,{lang:'it',audio:{t:w,l:'it-IT'},hint:'Réécoute en mode lent si besoin.',expl:`Tu as entendu ${IT(w)} = ${n}`});
  return Q.txt(`Écris <b>${n}</b> en lettres, en italien.`,[w],{lang:'it',hint:'Les nombres s’écrivent en un seul mot.',expl:`${n} = ${IT(w)}`});}},
{id:'it5c',name:'Articles définis',icon:'🏷️',
 f:{t:'Il, lo, la, l’, i, gli, le',l:[`Masculin : ${IT('il')} (${IT('il libro')}), ${IT('lo')} devant s + consonne ou z (${IT('lo zaino')}), ${IT('l’')} devant voyelle.`,`Féminin : ${IT('la')}, ${IT('l’')} devant voyelle.`,`Pluriel : ${IT('i')}, ${IT('gli')} (pour lo et l’ masculin), ${IT('le')}.`],ex:IT('il libro, lo zaino, l’amico, la casa, gli amici, le case')},
 g:d=>{const B=[['libro','il'],['studente','lo'],['zaino','lo'],['zio','lo'],['amico',"l'"],['casa','la'],['amica',"l'"],['libri','i'],['studenti','gli'],['amici','gli'],['case','le'],['zaini','gli'],['penna','la'],['quaderno','il'],['scuola','la'],['orologio',"l'"],['sport','lo'],['ragazzi','i'],['ragazze','le']],[n,a]=P(B),all=['il','lo','la',"l'",'i','gli','le'],wr=shuffle(all.filter(x=>x!==a)).slice(0,3),disp=x=>x+(x.endsWith("'")?'':' ')+n;
  if(d===3)return Q.txt(`Quel article devant ${IT('<b>'+n+'</b>')} ?`,[a],{lang:'it',hint:'Regarde la 1re lettre, le genre et le nombre.',expl:IT(disp(a))});
  return Q.ch(`Quel est le bon article ?`,IT(disp(a)),wr.map(x=>IT(disp(x))),{lang:'it',hint:'Regarde la 1re lettre, le genre et le nombre.',expl:IT(disp(a))});}},
{id:'it5d',name:'Le verbe ESSERE',icon:'✋',
 f:{t:'Essere : être',l:[`${IT('io sono, tu sei, lui / lei è')}`,`${IT('noi siamo, voi siete, loro sono')}`,'On dit souvent le verbe sans le pronom : sono = je suis.'],ex:IT('Sono di Parigi. Marco è italiano.')},
 g:d=>conjQ(d,[['essere','a scuola'],['essere','a casa'],['essere','in classe'],['essere','di Parigi'],['essere','in vacanza'],['essere','al mare']],presIT,'présent')},
{id:'it5e',name:'Le verbe AVERE',icon:'🎒',
 f:{t:'Avere : avoir',l:[`${IT('io ho, tu hai, lui / lei ha')}`,`${IT('noi abbiamo, voi avete, loro hanno')}`,'Le h ne se prononce pas.'],ex:IT('Ho fame! Hai un cane?')},
 g:d=>conjQ(d,[['avere','un cane'],['avere','due fratelli'],['avere','fame'],['avere','sete'],['avere','una bici'],['avere','dodici anni']],presIT,'présent')},
{id:'it5f',name:'Couleurs et objets',icon:'🎨',
 f:{t:'Couleurs et objets de la classe',l:['L’adjectif se place APRÈS le nom et s’accorde.',`-o / -a / -i / -e : ${IT('rosso, rossa, rossi, rosse')}.`,`En -e, une seule forme au singulier : ${IT('verde')} (pluriel ${IT('verdi')}).`],ex:IT('la penna rossa, i libri neri')},
 g:d=>lmix(d,'it',{v:[['rouge','rosso'],['bleu','blu'],['vert','verde'],['jaune','giallo'],['noir','nero'],['blanc','bianco'],['rose','rosa'],['gris','grigio'],['le stylo','la penna;penna'],['le crayon','la matita;matita'],['le livre','il libro;libro'],['le cahier','il quaderno;quaderno'],['le cartable','lo zaino;zaino'],['la gomme','la gomma;gomma'],['la règle','il righello;righello'],['la trousse','l’astuccio;astuccio'],['le tableau','la lavagna;lavagna']],
  f:[gapQ('La penna è ___. (rouge)','rossa','rosso|rossi|rosse'),gapQ('I libri sono ___. (noir)','neri','nero|nera|nere'),gapQ('Il quaderno è ___. (jaune)','giallo','gialla|gialli|gialle'),gapQ('Le matite sono ___. (blanc)','bianche','bianchi|bianca|bianco'),gapQ('Lo zaino è ___. (vert)','verde','verda|verdi|verdo')]})},
{id:'it5g',name:'La famille',icon:'👨‍👩‍👧',
 f:{t:'La famille et les possessifs',l:[`Les possessifs prennent l’article : ${IT('il mio zaino')}.`,`SAUF avec un membre de la famille au singulier : ${IT('mia madre, tuo fratello')}.`,`Au pluriel, l’article revient : ${IT('i miei fratelli')}.`],ex:IT('Mia madre si chiama Anna. I miei nonni abitano a Roma.')},
 g:d=>lmix(d,'it',{v:[['la mère','madre;mamma'],['le père','padre;papà'],['la sœur','sorella'],['le frère','fratello'],['la grand-mère','nonna'],['le grand-père','nonno'],['la tante','zia'],['l’oncle','zio'],['le cousin','cugino'],['la cousine','cugina'],['les parents','genitori']],
  f:[gapQ('___ madre si chiama Anna. (ma)','Mia','La mia|Mio|Mie','Ma mère s’appelle Anna.'),gapQ('___ fratelli sono simpatici. (mes)','I miei','Miei|Mie|Le mie','Mes frères sont sympas.'),gapQ('___ zaino è nuovo. (mon)','Il mio','Mio|La mia|Mia','Mon cartable est neuf.'),gapQ('___ sorella ha dieci anni. (ta)','Tua','La tua|Tuo|Tue','Ta sœur a dix ans.'),gapQ('___ casa è grande. (ma)','La mia','Mia|Il mio|Mio','Ma maison est grande.')]})},
{id:'it5h',name:'Jours, mois, saisons',icon:'📅',
 f:{t:'Le calendrier',l:['Jours et mois s’écrivent en minuscules, comme en français.',`${IT('lunedì, martedì…')} : accent sur le ì final.`,`Saisons : ${IT('primavera, estate, autunno, inverno')}.`],ex:IT('Il mio compleanno è a maggio, in primavera.')},
 g:d=>{const D=['lunedì','martedì','mercoledì','giovedì','venerdì','sabato','domenica'],DF=['lundi','mardi','mercredi','jeudi','vendredi','samedi','dimanche'],MO=['gennaio','febbraio','marzo','aprile','maggio','giugno','luglio','agosto','settembre','ottobre','novembre','dicembre'],MF=['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre'],t=R(0,2);
  if(t===0)return vq(D.map((x,i)=>[DF[i],x]),'it',d);if(t===1)return vq(MO.map((x,i)=>[MF[i],x]),'it',d);
  return vq([['le printemps','primavera;la primavera'],['l’été','estate;l’estate'],['l’automne','autunno;l’autunno'],['l’hiver','inverno;l’inverno'],['aujourd’hui','oggi'],['demain','domani'],['hier','ieri']],'it',d);}}
],
'it4':[
{id:'it4a',name:'Présent des verbes en -ARE',icon:'🗣️',
 f:{t:'Les verbes en -are',l:[`Radical + ${IT('o, i, a, iamo, ate, ano')}.`,`${IT('parlo, parli, parla, parliamo, parlate, parlano')}`,`${IT('giocare')} : on ajoute un h devant i (${IT('giochi')}).`],ex:IT('Parlo italiano. Giochiamo a calcio.')},
 g:d=>conjQ(d,[['parlare','italiano'],['abitare','a Roma'],['lavorare','molto'],['ascoltare','la musica'],['guardare','la TV'],['cantare','bene'],['comprare','il pane'],['mangiare','la pizza'],['giocare','a calcio'],['studiare','l’italiano']],presIT,'présent')},
{id:'it4b',name:'Présent en -ERE et -IRE',icon:'📚',
 f:{t:'Les verbes en -ere et -ire',l:[`-ere : ${IT('o, i, e, iamo, ete, ono')} (${IT('prendo')}).`,`-ire : ${IT('o, i, e, iamo, ite, ono')} (${IT('dormo')}).`,`Certains -ire ajoutent -isc- : ${IT('finisco, capisci')}.`],ex:IT('Leggo un libro. Capisci l’italiano?')},
 g:d=>conjQ(d,[['prendere','l’autobus'],['leggere','un libro'],['scrivere','una lettera'],['vedere','un film'],['correre','nel parco'],['dormire','tanto'],['partire','domani'],['aprire','la finestra'],['finire','i compiti'],['capire','la lezione'],['preferire','il gelato']],presIT,'présent')},
{id:'it4c',name:'Le pluriel',icon:'🐾',
 f:{t:'Le pluriel des noms',l:[`${IT('-o → -i')} (${IT('libro → libri')}), ${IT('-a → -e')} (${IT('casa → case')}), ${IT('-e → -i')} (${IT('studente → studenti')}).`,`Mots accentués ou étrangers : invariables (${IT('città, caffè, sport')}).`,`Irréguliers : ${IT('uomo → uomini, uovo → uova')}.`],ex:IT('un libro, due libri ; una casa, tre case')},
 g:d=>{const B=[['libro','libri'],['casa','case'],['studente','studenti'],['chiave','chiavi'],['ragazzo','ragazzi'],['ragazza','ragazze'],['amico','amici'],['amica','amiche'],['gatto','gatti'],['sedia','sedie'],['fiore','fiori'],['città','città'],['caffè','caffè'],['uomo','uomini'],['mano','mani'],['gioco','giochi'],['sport','sport']],[s,p]=P(B),wr=[...new Set([s.slice(0,-1)+'i',s.slice(0,-1)+'e',s+'s',s.slice(0,-1)+'a'].filter(x=>x!==p&&x!==s))].slice(0,3);
  if(d===3)return Q.txt(`Écris le pluriel de ${IT('<b>'+s+'</b>')}.`,[p],{lang:'it',hint:'Regarde la dernière lettre du mot.',expl:`${IT(s)} → ${IT(p)}`});
  return Q.ch(`Quel est le pluriel de ${IT('<b>'+s+'</b>')} ?`,IT(p),wr.map(IT),{lang:'it',hint:'-o → -i, -a → -e, -e → -i.',expl:`${IT(s)} → ${IT(p)}`});}},
{id:'it4d',name:'Articles indéfinis',icon:'1️⃣',
 f:{t:'Un, uno, una, un’',l:[`Masculin : ${IT('un')} (${IT('un libro, un amico')}), ${IT('uno')} devant s + consonne ou z (${IT('uno zaino')}).`,`Féminin : ${IT('una')}, ${IT('un’')} devant voyelle (${IT('un’amica')}).`],ex:IT('un gatto, uno studente, una penna, un’isola')},
 g:d=>{const B=[['libro','un'],['zaino','uno'],['studente','uno'],['penna','una'],['amica',"un'"],['amico','un'],['zio','uno'],['casa','una'],['arancia',"un'"],['gatto','un'],['sport','uno'],['scuola','una'],['isola',"un'"],['albero','un']],[n,a]=P(B),all=['un','uno','una',"un'"],disp=x=>x+(x.endsWith("'")?'':' ')+n;
  return Q.ch('Quel est le bon article ?',IT(disp(a)),all.filter(x=>x!==a).map(x=>IT(disp(x))),{lang:'it',hint:'Masculin ou féminin ? Commence par une voyelle, s + consonne ou z ?',expl:IT(disp(a))});}},
{id:'it4e',name:'Prépositions contractées',icon:'🧲',
 f:{t:'Al, del, nel, sul…',l:[`${IT('di, a, da, in, su')} + article = un seul mot.`,`${IT('a + il = al')}, ${IT('di + la = della')}, ${IT('in + il = nel')}, ${IT('su + lo = sullo')}.`],ex:IT('Vado al cinema. Il libro è sul tavolo.')},
 g:d=>{const PR={di:'de',a:'a',da:'da',in:'ne',su:'su'},AR={il:'l',lo:'llo',la:'lla',"l'":"ll'",i:'i',gli:'gli',le:'lle'},N=[['il','cinema'],['lo','zaino'],['la','scuola'],["l'",'albero'],['i','giardini'],['gli','amici'],['le','case']];
  const pr=P(Object.keys(PR)),[ar,n]=P(N),mk=(p,a)=>PR[p]+AR[a],a=mk(pr,ar),disp=x=>x+(x.endsWith("'")?'':' ')+n;
  const wr=[...new Set([...Object.keys(AR).filter(x=>x!==ar).map(x=>mk(pr,x)),...Object.keys(PR).filter(x=>x!==pr).map(x=>mk(x,ar))])].sort(()=>Math.random()-.5).slice(0,3);
  if(d===3)return Q.txt(`${IT(`${pr} + ${ar}${ar.endsWith("'")?'':' '}${n}`)} = ___ ${IT(n)}`,[a],{lang:'it',hint:'Préposition + article collés.',expl:IT(disp(a))});
  return Q.ch(`${IT(`${pr} + ${ar}${ar.endsWith("'")?'':' '}${n}`)} = ?`,IT(disp(a)),wr.map(x=>IT(disp(x))),{lang:'it',hint:'Préposition + article collés.',expl:IT(disp(a))});}},
{id:'it4f',name:'Verbes irréguliers',icon:'🌀',
 f:{t:'Andare, fare, venire, stare…',l:['Les plus utiles sont irréguliers : à apprendre par cœur.',`${IT('vado, vai, va, andiamo, andate, vanno')}`,`${IT('faccio, fai, fa, facciamo, fate, fanno')}`],ex:IT('Vado a scuola. Che cosa fai?')},
 g:d=>conjQ(d,[['andare','a scuola'],['fare','i compiti'],['venire','alla festa'],['stare','bene'],['uscire','con gli amici'],['bere','l’acqua'],['potere','venire'],['volere','un gelato'],['dovere','studiare']],presIT,'présent')},
{id:'it4g',name:'Dire l’heure',icon:'🕒',
 f:{t:'Che ore sono?',l:[`${IT('Sono le tre')} : il est trois heures. Mais ${IT('È l’una')}.`,`${IT('e un quarto')} et quart, ${IT('e mezza')} et demie, ${IT('meno un quarto')} moins le quart.`],ex:IT('Sono le quattro e mezza.')},
 g:d=>{const ow=(h,m)=>{const nx=h%12+1,base=x=>x===1?"È l'una":`Sono le ${numIT(x)}`;return m===0?base(h):m===15?base(h)+' e un quarto':m===30?base(h)+' e mezza':m===45?base(nx)+' meno un quarto':m<30?base(h)+' e '+numIT(m):base(nx)+' meno '+numIT(60-m);};
  const h=R(1,12),m=P(d===1?[0,30,15,45]:[0,15,30,45,5,10,20,40,50]),w=ow(h,m),dig=`${h}:${String(m).padStart(2,'0')}`,o=new Set([w]);
  [[h,(m+30)%60],[h%12+1,m],[h===1?12:h-1,m],[h%12+1,(m+15)%60]].forEach(([a,b])=>{if(o.size<4)o.add(ow(a,b));});
  if(Math.random()<.5)return Q.ch(`Il est <b>${dig}</b>. Comment le dit-on ?`,IT(w),[...o].filter(x=>x!==w).map(IT),{lang:'it',hint:'Après la demie : heure suivante + meno.',expl:`${dig} = ${IT(w)}`});
  const dg=(a,b)=>`${a}:${String(b).padStart(2,'0')}`,od=new Set([dig]);[[h,(m+30)%60],[h%12+1,m],[h===1?12:h-1,m],[h%12+1,(m+15)%60]].forEach(([a,b])=>{if(od.size<4)od.add(dg(a,b));});
  return Q.ch('🎧 Écoute l’heure. Quelle est la bonne ?',dig,[...od].filter(x=>x!==dig),{lang:'it',audio:{t:w,l:'it-IT'},hint:'Repère e (et) ou meno (moins).',expl:`${IT(w)} = ${dig}`});}},
{id:'it4h',name:'Nourriture, MI PIACE',icon:'🍝',
 f:{t:'Dire ce qu’on aime',l:[`${IT('Mi piace')} + singulier : ${IT('mi piace la pizza')}.`,`${IT('Mi piacciono')} + pluriel : ${IT('mi piacciono gli spaghetti')}.`,`${IT('ti piace, gli / le piace, ci piace')}…`],ex:IT('Mi piace il gelato. Non mi piacciono le carote.')},
 g:d=>lmix(d,'it',{v:[['le pain','il pane;pane'],['l’eau','l’acqua;acqua'],['le lait','il latte;latte'],['la viande','la carne;carne'],['le poisson','il pesce;pesce'],['les fruits','la frutta;frutta'],['les légumes','la verdura;verdura'],['le fromage','il formaggio;formaggio'],['la pomme','la mela;mela'],['la glace','il gelato;gelato']],
  f:[gapQ('Mi ___ la pizza.','piace','piacciono|piaccio|piaci','J’aime la pizza.'),gapQ('Mi ___ gli spaghetti.','piacciono','piace|piaccio|piaci','J’aime les spaghettis.'),gapQ('Ti ___ il gelato?','piace','piacciono|piaci|piacere','Tu aimes la glace ?'),gapQ('Non mi ___ le carote.','piacciono','piace|piaccio|piaci','Je n’aime pas les carottes.'),gapQ('A Marco ___ il calcio.','piace','piacciono|piaci|piaccio','Marco aime le foot.')]})}
],
'it3':[
{id:'it3a',name:'Passé composé avec AVERE',icon:'⏮️',
 f:{t:'Il passato prossimo (1)',l:[`${IT('avere')} au présent + participe passé.`,`${IT('-are → -ato, -ere → -uto, -ire → -ito')}`,`Irréguliers : ${IT('fatto, preso, letto, scritto, visto')}.`],ex:IT('Ieri ho mangiato una pizza e ho visto un film.')},
 g:d=>{const V=[['mangiare','una pizza'],['comprare','un libro'],['giocare','a calcio'],['studiare','la storia'],['dormire','tanto'],['finire','i compiti'],['leggere','un libro'],['scrivere','una lettera'],['vedere','un film'],['fare','i compiti'],['prendere','il treno'],['bere','un succo'],['aprire','la porta']],[v,c]=P(V),k=R(0,6),a=`${IRRP.avere[SIDX[k]]} ${ppIT(v)}`,sj=cap(SOGG[k]);
  const wr=[...new Set([`${IRRP.essere[SIDX[k]]} ${ppIT(v)}`,`${IRRP.avere[SIDX[k]]} ${v.slice(0,-3)}ato`,`${IRRP.avere[(SIDX[k]+1)%6]} ${ppIT(v)}`,presIT(v)[SIDX[k]]])].filter(x=>x!==a).slice(0,3);
  return fq([gapQ(`Ieri ${SOGG[k]} ___ ${c}. (${v})`,a,wr.join('|'),'',`avere (${IRRP.avere[SIDX[k]]}) + ${ppIT(v)}`)],'it',d);}},
{id:'it3b',name:'Passé composé avec ESSERE',icon:'🚶',
 f:{t:'Il passato prossimo (2)',l:[`Verbes de mouvement et d’état : ${IT('essere')} + participe.`,`Le participe s’accorde avec le sujet : ${IT('Marco è andato, Giulia è andata')}.`,`${IT('-o, -a, -i, -e')} selon le genre et le nombre.`],ex:IT('Siamo andati al mare. Anna è tornata ieri.')},
 g:d=>{const V=[['andare','al mare'],['venire','alla festa'],['partire','presto'],['arrivare','tardi'],['tornare','a casa'],['uscire','con gli amici'],['entrare','in classe'],['restare','a casa']],[v,c]=P(V),S=[['Io (Luca)',0,'o'],['Io (Giulia)',0,'a'],['Tu (Paolo)',1,'o'],['Lei',2,'a'],['Lui',2,'o'],['Noi (Luca e Paolo)',3,'i'],['Noi (Anna e Sara)',3,'e'],['Loro (i ragazzi)',5,'i'],['Loro (le ragazze)',5,'e']],[sj,k,g]=P(S);
  const pp=ppIT(v).slice(0,-1),a=`${IRRP.essere[k]} ${pp}${g}`,wr=[...new Set(['o','a','i','e'].filter(x=>x!==g).map(x=>`${IRRP.essere[k]} ${pp}${x}`).concat([`${IRRP.avere[k]} ${pp}o`]))].slice(0,3);
  return fq([gapQ(`${sj} ___ ${c}. (${v})`,a,wr.join('|'),'',`essere + participe accordé (-${g})`)],'it',d);}},
{id:'it3c',name:'Le futur',icon:'🔮',
 f:{t:'Il futuro semplice',l:[`Terminaisons : ${IT('ò, ai, à, emo, ete, anno')}.`,`-are devient -er- : ${IT('parlerò')}. -ere : ${IT('prenderò')}. -ire : ${IT('dormirò')}.`,`Irréguliers : ${IT('sarò, avrò, andrò, farò, verrò')}.`],ex:IT('Domani andrò al mare.')},
 g:d=>conjQ(d,[['parlare','con Marco'],['mangiare','la pizza'],['giocare','a tennis'],['prendere','il treno'],['dormire','tanto'],['essere','a Roma'],['avere','tempo'],['andare','in Italia'],['fare','i compiti'],['venire','alla festa']],futIT,'futur','Domani')},
{id:'it3d',name:'Verbes pronominaux',icon:'🪥',
 f:{t:'I verbi riflessivi',l:[`Pronom + verbe : ${IT('mi, ti, si, ci, vi, si')}.`,`${IT('alzarsi')} : ${IT('mi alzo, ti alzi, si alza, ci alziamo, vi alzate, si alzano')}.`],ex:IT('Mi sveglio alle sette e mi vesto.')},
 g:d=>{const V=[['alzarsi','alzare','presto'],['lavarsi','lavare','i denti'],['svegliarsi','svegliare','alle sette'],['chiamarsi','chiamare','Luca'],['vestirsi','vestire','in fretta'],['divertirsi','divertire','molto']],[v,base,c]=P(V),PRN=['mi','ti','si','ci','vi','si'],k=R(0,6),i=SIDX[k],a=`${PRN[i]} ${presIT(base)[i]}`;
  const wr=[...new Set([`${PRN[(i+1)%6]} ${presIT(base)[i]}`,`${PRN[i]} ${presIT(base)[(i+1)%6]}`,presIT(base)[i],`si ${presIT(base)[i]}`])].filter(x=>x!==a).slice(0,3);
  return fq([gapQ(`${cap(SOGG[k])} ___ ${c}. (${v})`,a,wr.join('|'),'',`${SOGG[k]} → ${PRN[i]}`)],'it',d);}},
{id:'it3e',name:'Pronoms compléments',icon:'🎯',
 f:{t:'Lo, la, li, le',l:[`${IT('lo')} le (masc.), ${IT('la')} la (fém.), ${IT('li')} les (masc.), ${IT('le')} les (fém.).`,`Avant le verbe : ${IT('Lo mangio')}.`],ex:IT('Il film? Lo guardo stasera.')},
 g:d=>fq([gapQ('Mangi la pizza? Sì, ___ mangio.','la','lo|li|le'),gapQ('Guardi il film? Sì, ___ guardo.','lo','la|li|le'),gapQ('Compri i libri? Sì, ___ compro.','li','le|lo|la'),gapQ('Inviti le amiche? Sì, ___ invito.','le','li|la|lo'),gapQ('Conosci Marco? Sì, ___ conosco.','lo','la|li|gli'),gapQ('Chiami Giulia? Sì, ___ chiamo.','la','lo|le|li')],'it',d)},
{id:'it3f',name:'L’imparfait',icon:'🕰️',
 f:{t:'L’imperfetto',l:[`Radical + ${IT('vo, vi, va, vamo, vate, vano')} : ${IT('parlavo, leggevo, dormivo')}.`,`${IT('essere')} : ${IT('ero, eri, era, eravamo, eravate, erano')}.`,'Habitudes et descriptions dans le passé.'],ex:IT('Da piccolo giocavo sempre al parco.')},
 g:d=>conjQ(d,[['giocare','al parco'],['abitare','a Napoli'],['leggere','i fumetti'],['dormire','tanto'],['essere','felice'],['fare','sport'],['guardare','i cartoni'],['avere','un gatto']],impIT,'imparfait','Da piccolo,')},
{id:'it3g',name:'Le conditionnel',icon:'🙏',
 f:{t:'Il condizionale',l:[`Terminaisons : ${IT('ei, esti, ebbe, emmo, este, ebbero')}.`,`Politesse : ${IT('vorrei')} (je voudrais), ${IT('potrei')} (je pourrais).`],ex:IT('Vorrei un gelato, per favore.')},
 g:d=>conjQ(d,[['volere','un gelato'],['potere','venire'],['dovere','studiare'],['mangiare','una pizza'],['andare','al cinema'],['comprare','un regalo'],['essere','contento'],['avere','bisogno di aiuto']],condIT,'conditionnel')},
{id:'it3h',name:'Comparer',icon:'⚖️',
 f:{t:'Più, meno, come',l:[`${IT('più … di')} : plus … que. ${IT('meno … di')} : moins … que.`,`${IT('come / quanto')} : aussi … que.`,`Superlatif : ${IT('il più bello')}, ${IT('la meno cara')}.`],ex:IT('Marco è più alto di Luca.')},
 g:d=>fq([gapQ('Marco è ___ alto di Luca. (plus)','più','meno|tanto|come','Marco est plus grand que Luca.'),gapQ('Il treno è più veloce ___ bici.','della','di|che|come','Le train est plus rapide que le vélo.'),gapQ('Roma è ___ grande di Firenze. (plus)','più','meno|molto|tanto'),gapQ('Questo libro è il ___ bello. (le plus)','più','meno|molto|tanto'),gapQ('Sono alta ___ te. (aussi que)','come;quanto','di|che|più'),gapQ('La matematica è ___ difficile dell’inglese. (moins)','meno','più|tanto|come')],'it',d)}
]};

/* ===== HISTOIRE-GÉO-EMC : programmes en vigueur 2026-2027 =====
 Histoire-géographie : programmes du cycle 3 et 4 (BO 2015, modifiés en 2020).
 EMC : programme du BO n°24 du 13 juin 2024, appliqué à tous les niveaux du collège depuis la rentrée 2026. */
const fy=y=>y<0?(y<=-10000?`vers ${(-y).toLocaleString('fr-FR')} av. J.-C.`:`${-y} av. J.-C.`):String(y);
const cap1=s=>s.charAt(0).toUpperCase()+s.slice(1);
function hgq(b,d){const g=[];
 if(b.q){g.push(()=>{const [q,a,w,e]=P(b.q);return Q.ch(q,a,shuffle(w.split('|')).slice(0,3),{hint:'Élimine d’abord les réponses impossibles.',expl:e});});g.push(g[g.length-1]);}
 if(b.d)g.push(()=>{const it=P(b.d),oth=shuffle(b.d.filter(x=>x!==it)).slice(0,3),f=d===3?R(1,2):R(0,1);
  if(f===0)return Q.ch(`Que signifie <b>« ${it[0]} »</b> ?`,cap1(it[1]),oth.map(o=>cap1(o[1])),{hint:'Pense à une phrase du cours où ce mot apparaît.',expl:`${cap1(it[0])} : ${it[1]}.`});
  if(f===1)return Q.ch(`Quel mot correspond à cette définition ?<div class="stmt">${cap1(it[1])}</div>`,cap1(it[0]),oth.map(o=>cap1(o[0])),{hint:'Relis le vocabulaire du cours.',expl:`${cap1(it[0])} : ${it[1]}.`});
  return Q.txt(`Écris le mot qui correspond à cette définition :<div class="stmt">${cap1(it[1])}</div>`,[it[0]],{lang:'fr',hint:`Ça commence par « ${it[0][0].toUpperCase()} » (${it[0].length} caractères).`,expl:`${cap1(it[0])} : ${it[1]}.`});});
 if(b.c&&b.c.length>=3){
  g.push(()=>{const [y,l]=P(b.c),pool=[...new Set([...b.c.map(x=>x[0]),y+10,y-10,y+50,y-50,y+100])].filter(x=>x!==y);
   return Q.ch(`Quelle est la date de cet événement ?<div class="stmt">${l}</div>`,fy(y),shuffle(pool).slice(0,3).map(fy),{hint:'Situe-le sur la frise du cours : avant ou après les autres ?',expl:`${l} : ${fy(y)}.`});});
  if(d>1)g.push(()=>{const seen=new Set(),ev=shuffle([...b.c]).filter(e=>!seen.has(e[0])&&seen.add(e[0])).slice(0,d===2?3:4).sort((a,b)=>a[0]-b[0]),toks=ev.map(e=>e[1]);
   let sh=shuffle([...toks]),k=0;while(sh.join('|')===toks.join('|')&&k++<20)sh=shuffle([...toks]);
   return {type:'order',q:'Remets ces événements dans l’ordre chronologique, du plus ancien au plus récent.',tokens:sh,ans:toks.join(' '),hint:`Le plus ancien : « ${toks[0]} ».`,expl:ev.map(e=>`<b>${fy(e[0])}</b> : ${e[1]}`).join('<br>')};});}
 if(b.t)g.push(()=>{const [s,v,e]=P(b.t);return Q.ch(`Vrai ou faux ?<div class="stmt">${s}</div>`,v?'Vrai':'Faux',[v?'Faux':'Vrai'],{hint:'Relis l’essentiel du cours.',expl:`${v?'Vrai':'Faux'}. ${e}`});});
 return P(g)();}
const TAGS={H:'Histoire',G:'Géographie',E:'EMC'};
const hc=(id,tag,name,icon,hook,l,ex,b)=>({id,tag,name,icon,hook,b,f:{t:name,l,ex},g:d=>hgq(b,d)});

const CH_HG={
'hg6':[
hc('hg6a','H','Les débuts de l’humanité','🦴','Il y a des millions d’années, en Afrique, des êtres se mettent debout et taillent des pierres : c’est le début de notre histoire !',
 ['Les premiers humains apparaissent en Afrique, il y a plusieurs millions d’années.','Au Paléolithique, les humains sont chasseurs-cueilleurs et nomades.','Au Néolithique (vers 10 000 av. J.-C. au Proche-Orient), ils deviennent agriculteurs, éleveurs et sédentaires.'],'Homo sapiens apparaît en Afrique il y a environ 300 000 ans, puis peuple toute la Terre.',
 {q:[['Sur quel continent sont apparus les premiers humains ?','En Afrique','En Europe|En Asie|En Amérique','Les plus anciens fossiles humains ont été découverts en Afrique.'],['Comment vivaient les humains du Paléolithique ?','Ils étaient chasseurs-cueilleurs et nomades','Ils cultivaient des champs|Ils vivaient dans des villes|Ils élevaient des moutons','Ils se déplaçaient pour suivre le gibier et trouver de la nourriture.'],['Où commence le Néolithique ?','Au Proche-Orient','En Gaule|En Chine|En Amérique','Vers 10 000 av. J.-C., dans le « Croissant fertile ».'],['Qu’est-ce qui change au Néolithique ?','Les humains deviennent agriculteurs, éleveurs et sédentaires','Les humains découvrent le feu|Les humains inventent l’écriture|Les humains quittent l’Afrique','C’est une véritable « révolution » du mode de vie.'],['Quelle grotte ornée française est l’une des plus anciennes ?','La grotte Chauvet','La grotte de Lourdes|Le Mont-Saint-Michel|Les arènes de Nîmes','Ses peintures ont environ 36 000 ans.'],['Comment s’appelle l’espèce humaine actuelle ?','Homo sapiens','Homo erectus|Australopithèque|Néandertal','Homo sapiens est apparu en Afrique il y a environ 300 000 ans.']],
  d:[['Préhistoire','période qui va de l’apparition des premiers humains à l’invention de l’écriture'],['Paléolithique','période de la Préhistoire où les humains sont chasseurs-cueilleurs'],['Néolithique','période où les humains deviennent agriculteurs et éleveurs'],['nomade','qui se déplace sans cesse, sans habitat fixe'],['sédentaire','qui vit toujours au même endroit'],['migration','déplacement d’une population vers un autre territoire'],['art pariétal','peintures et gravures réalisées sur les parois des grottes']],
  c:[[-3200000,'Lucy vit en Afrique (Australopithèque)'],[-300000,'Apparition d’Homo sapiens en Afrique'],[-36000,'Peintures de la grotte Chauvet'],[-10000,'Début du Néolithique au Proche-Orient'],[-3300,'Invention de l’écriture']],
  t:[['Les premiers humains sont apparus en Europe.',false,'Ils sont apparus en Afrique.'],['Au Néolithique, les humains se sédentarisent.',true,'Ils construisent des villages près de leurs champs.'],['Les chasseurs-cueilleurs du Paléolithique cultivaient le blé.',false,'L’agriculture apparaît au Néolithique.']]}),
hc('hg6b','H','Premiers États, premières écritures','📜','Imagine devoir compter les sacs de blé de tout un royaume sans savoir écrire… C’est pour ça que l’écriture a été inventée !',
 ['L’écriture apparaît vers 3300 av. J.-C. en Mésopotamie : c’est la fin de la Préhistoire.','La Mésopotamie est entre le Tigre et l’Euphrate ; l’Égypte vit le long du Nil.','Des États se forment, dirigés par des rois (en Égypte, le pharaon), aidés par des scribes.'],'Le Code de Hammurabi (vers 1750 av. J.-C.) est un recueil de lois gravé dans la pierre.',
 {q:[['Où l’écriture apparaît-elle vers 3300 av. J.-C. ?','En Mésopotamie','En Grèce|À Rome|En Gaule','Les premiers signes sont tracés sur des tablettes d’argile, à Uruk.'],['Comment s’appelle l’écriture mésopotamienne ?','Le cunéiforme','Les hiéroglyphes|L’alphabet latin|Le grec','Ses signes en forme de « clous » sont gravés dans l’argile.'],['Comment s’appelle l’écriture égyptienne ?','Les hiéroglyphes','Le cunéiforme|L’alphabet grec|Les runes','Ce sont des signes-images, déchiffrés par Champollion en 1822.'],['Quel fleuve traverse l’Égypte ?','Le Nil','Le Tigre|L’Euphrate|Le Rhône','Sans le Nil et ses crues, l’Égypte serait un désert.'],['Qui dirige l’Égypte ancienne ?','Le pharaon','Le consul|L’empereur romain|Le Sénat','Le pharaon est considéré comme un dieu vivant.'],['Quel roi de Babylone a fait graver un célèbre code de lois ?','Hammurabi','Ramsès II|Jules César|Périclès','Le Code de Hammurabi date d’environ 1750 av. J.-C.'],['À quoi sert l’écriture dans les premiers États ?','À compter, gouverner et rendre la justice','À écrire des romans d’aventure|À envoyer des messages secrets uniquement|À rien de précis','Les scribes notent les impôts, les stocks et les lois.']],
  d:[['État','territoire organisé, dirigé par un pouvoir qui fait respecter des lois'],['scribe','personne chargée d’écrire, de compter et de tenir les archives'],['pharaon','roi de l’Égypte ancienne'],['cunéiforme','écriture mésopotamienne en forme de clous'],['hiéroglyphes','écriture égyptienne faite de signes-images'],['Mésopotamie','région située entre le Tigre et l’Euphrate']],
  c:[[-3300,'Invention de l’écriture en Mésopotamie'],[-2500,'Construction des grandes pyramides de Gizeh (vers)'],[-1750,'Code de Hammurabi (vers)'],[-753,'Fondation légendaire de Rome']],
  t:[['L’invention de l’écriture marque la fin de la Préhistoire.',true,'Avec l’écriture commence l’Histoire.'],['La Mésopotamie se trouve autour du Nil.',false,'Elle se trouve entre le Tigre et l’Euphrate.']]}),
hc('hg6c','H','Le monde des cités grecques','🏺','Des dieux qui se disputent sur l’Olympe, des héros comme Ulysse, les premiers Jeux olympiques : bienvenue chez les Grecs !',
 ['Les Grecs vivent dans des cités indépendantes, comme Athènes ou Sparte.','Ils partagent une langue, des dieux (Zeus, Athéna…) et des récits (l’Iliade et l’Odyssée d’Homère).','À Athènes, au Ve siècle av. J.-C., naît la démocratie.'],'Les Jeux olympiques sont organisés dès 776 av. J.-C. en l’honneur de Zeus.',
 {q:[['Qu’est-ce qu’une cité grecque ?','Une ville et son territoire, formant un État indépendant','Un empire immense|Un village sans lois|Une île uniquement','Chaque cité a ses lois, son armée et sa monnaie.'],['Qui est le roi des dieux grecs ?','Zeus','Apollon|Poséidon|Héphaïstos','Les dieux vivent sur le mont Olympe.'],['Quel poète a raconté l’Iliade et l’Odyssée ?','Homère','Périclès|Hérodote|Virgile','Ces récits ont été mis par écrit vers le VIIIe siècle av. J.-C.'],['Dans quel sanctuaire ont lieu les Jeux olympiques ?','Olympie','Delphes|Athènes|Sparte','Ils sont organisés en l’honneur de Zeus.'],['Quelle cité invente la démocratie ?','Athènes','Sparte|Rome|Babylone','Elle se met en place à la fin du VIe siècle et au Ve siècle av. J.-C.'],['À Athènes, qui est citoyen ?','Les hommes nés de parents athéniens','Tous les habitants|Les femmes et les esclaves|Les étrangers riches','Les femmes, les esclaves et les étrangers (métèques) sont exclus.'],['Quelle ville française a été fondée par des Grecs ?','Marseille','Paris|Lyon|Bordeaux','Massalia est fondée vers 600 av. J.-C. par des Grecs de Phocée.']],
  d:[['cité','ville et territoire qui l’entoure, formant un État indépendant'],['polythéisme','croyance en plusieurs dieux'],['mythe','récit fabuleux qui met en scène des dieux et des héros'],['démocratie','régime où le pouvoir appartient aux citoyens'],['citoyen','membre d’une cité qui participe à la vie politique'],['sanctuaire','lieu sacré consacré à un dieu'],['colonie','cité fondée par des Grecs loin de leur cité d’origine']],
  c:[[-776,'Premiers Jeux olympiques'],[-600,'Fondation de Marseille (Massalia)'],[-508,'Réformes de Clisthène, début de la démocratie athénienne'],[-443,'Périclès dirige Athènes']],
  t:[['Les Grecs croyaient en un seul dieu.',false,'Ils étaient polythéistes.'],['Les femmes votaient à Athènes.',false,'Elles n’étaient pas citoyennes.']]}),
hc('hg6d','H','Rome, du mythe à l’histoire','🐺','Deux jumeaux abandonnés, nourris par une louve, qui fondent la ville la plus puissante du monde antique… Mythe ou réalité ?',
 ['Selon la légende, Rome est fondée en 753 av. J.-C. par Romulus.','Rome devient une République en 509 av. J.-C., dirigée par des consuls et le Sénat.','Jules César conquiert la Gaule (Alésia, 52 av. J.-C.) ; Auguste devient le premier empereur en 27 av. J.-C.'],'Romulus et Rémus nourris par une louve : c’est un mythe, pas un fait prouvé.',
 {q:[['Selon la légende, qui a fondé Rome ?','Romulus','Jules César|Auguste|Hercule','Romulus aurait tué son frère Rémus.'],['Quel animal aurait nourri Romulus et Rémus ?','Une louve','Une ourse|Une chèvre|Une lionne','La louve est le symbole de Rome.'],['En quelle année Rome devient-elle une République ?','509 av. J.-C.','753 av. J.-C.|52 av. J.-C.|27 av. J.-C.','Les Romains chassent leur dernier roi.'],['Qui est le premier empereur romain ?','Auguste','Jules César|Romulus|Néron','Il prend le titre d’Auguste en 27 av. J.-C.'],['Qui a conquis la Gaule ?','Jules César','Auguste|Vercingétorix|Hannibal','Il bat Vercingétorix à Alésia en 52 av. J.-C.'],['Comment s’appelle le chef gaulois vaincu à Alésia ?','Vercingétorix','Astérix|Clovis|Charlemagne','Il se rend à César en 52 av. J.-C.'],['Sous la République, qui dirige Rome ?','Deux consuls élus et le Sénat','Un roi|Un empereur|Le pharaon','Les consuls sont élus pour un an.']],
  d:[['légende','récit merveilleux qui mélange faits réels et imaginaires'],['République','régime où le pouvoir n’est pas détenu par un roi'],['Sénat','assemblée de riches Romains qui conseille les dirigeants'],['consul','magistrat élu pour un an qui dirige la République romaine'],['empereur','chef unique de l’Empire romain']],
  c:[[-753,'Fondation légendaire de Rome'],[-509,'Début de la République romaine'],[-52,'Bataille d’Alésia'],[-44,'Assassinat de Jules César'],[-27,'Auguste devient le premier empereur']],
  t:[['L’existence de Romulus et Rémus est prouvée par les historiens.',false,'C’est une légende.'],['Jules César a été le premier empereur.',false,'C’est Auguste, en 27 av. J.-C.']]}),
hc('hg6e','H','La naissance du monothéisme juif','✡️','Dans un monde où l’on vénère des dizaines de dieux, un petit peuple affirme qu’il n’en existe qu’un seul : une idée qui va changer l’histoire.',
 ['Les Hébreux sont les premiers à croire en un dieu unique : c’est le monothéisme.','Leur histoire et leurs croyances sont rassemblées dans la Bible hébraïque, écrite sur plusieurs siècles (du VIIIe au IIe siècle av. J.-C.).','La destruction du Temple de Jérusalem en 587 av. J.-C. et l’exil à Babylone renforcent cette croyance.'],'Les cinq premiers livres de la Bible hébraïque forment la Torah.',
 {q:[['Qu’est-ce que le monothéisme ?','La croyance en un dieu unique','La croyance en plusieurs dieux|L’absence de croyance|Le culte des ancêtres','Les Hébreux sont les premiers monothéistes.'],['Comment s’appelle le livre sacré des Hébreux ?','La Bible hébraïque','Le Coran|L’Iliade|Le Code de Hammurabi','Ses cinq premiers livres forment la Torah.'],['Quelle ville abritait le Temple des Hébreux ?','Jérusalem','Babylone|Athènes|Rome','Le Temple est détruit par les Babyloniens en 587 av. J.-C.'],['Qui détruit le Temple de Jérusalem en 587 av. J.-C. ?','Les Babyloniens','Les Romains|Les Grecs|Les Égyptiens','Une partie des Hébreux est déportée à Babylone : c’est l’Exil.'],['Selon la Bible, quel prophète reçoit les Dix Commandements ?','Moïse','Abraham|David|Salomon','Dieu les lui transmet sur le mont Sinaï.'],['Comment appelle-t-on les descendants des Hébreux ?','Les Juifs','Les Gaulois|Les Phéniciens|Les Perses','Le judaïsme est la religion des Juifs.']],
  d:[['monothéisme','croyance en un dieu unique'],['polythéisme','croyance en plusieurs dieux'],['Bible hébraïque','livre sacré des Juifs'],['Torah','les cinq premiers livres de la Bible hébraïque'],['Alliance','pacte entre Dieu et le peuple hébreu selon la Bible'],['prophète','personne qui parle au nom de Dieu']],
  c:[[-1000,'Règne du roi David, selon la Bible (vers)'],[-587,'Destruction du Temple de Jérusalem'],[-538,'Retour d’exil des Hébreux'],[70,'Les Romains détruisent le second Temple']],
  t:[['Les Hébreux étaient polythéistes.',false,'Ils sont les premiers monothéistes.'],['La Bible hébraïque a été écrite en une seule année.',false,'Elle a été écrite pendant plusieurs siècles.']]}),
hc('hg6f','H','L’Empire romain dans le monde antique','🏛️','Des routes, des aqueducs, des thermes de la Bretagne jusqu’à l’Égypte… et des marchands qui échangent avec la lointaine Chine !',
 ['L’Empire s’étend autour de la Méditerranée ; aux Ier et IIe siècles, c’est la paix romaine.','Les peuples conquis adoptent le mode de vie romain : c’est la romanisation.','Les chrétiens, d’abord persécutés, sont autorisés en 313 ; le christianisme devient religion officielle en 392. Rome commerce avec la Chine des Han par la route de la soie.'],'En 212, l’édit de Caracalla donne la citoyenneté romaine à tous les hommes libres de l’Empire.',
 {q:[['Comment appelle-t-on la période de paix des Ier et IIe siècles ?','La paix romaine','La guerre de Cent Ans|La Renaissance|La Révolution','Les frontières (le limes) protègent l’Empire.'],['Qu’est-ce que la romanisation ?','L’adoption du mode de vie romain par les peuples conquis','La destruction de Rome|L’invention de l’écriture|La conquête de la Chine','Les villes gauloises se dotent de thermes, de théâtres, d’aqueducs.'],['Quel édit accorde la citoyenneté à tous les hommes libres en 212 ?','L’édit de Caracalla','L’édit de Nantes|Le Code de Hammurabi|L’édit de Milan','L’empereur Caracalla unifie ainsi l’Empire.'],['Quel empereur autorise le christianisme en 313 ?','Constantin','Auguste|Néron|Jules César','C’est l’édit de Milan ; Constantin se convertit lui-même.'],['En quelle année le christianisme devient-il religion officielle ?','392','313|212|476','L’empereur Théodose interdit les cultes païens.'],['Comment s’appelle la route commerciale entre Rome et la Chine ?','La route de la soie','La voie Appienne|La route du sel|Le limes','On y échange soie, épices, verre, or.'],['Quelle dynastie règne en Chine à la même époque ?','Les Han','Les Ming|Les Capétiens|Les pharaons','L’empire des Han est aussi vaste et peuplé que l’Empire romain.']],
  d:[['romanisation','adoption de la culture et du mode de vie romains'],['citoyenneté','fait d’être citoyen, avec des droits et des devoirs'],['limes','frontière fortifiée de l’Empire romain'],['aqueduc','pont-canal qui amène l’eau jusqu’aux villes'],['christianisme','religion fondée sur l’enseignement de Jésus'],['route de la soie','routes commerciales reliant la Chine à la Méditerranée']],
  c:[[-27,'Auguste, premier empereur'],[30,'Mort de Jésus à Jérusalem (vers)'],[212,'Édit de Caracalla'],[313,'Édit de Milan : le christianisme est autorisé'],[392,'Le christianisme devient religion officielle']],
  t:[['Les chrétiens ont d’abord été persécutés dans l’Empire.',true,'Ils refusaient de rendre un culte à l’empereur.'],['L’Empire romain n’avait aucun contact avec la Chine.',false,'Des échanges existaient par la route de la soie.']]}),
hc('hg6g','G','Habiter une métropole','🏙️','Métro bondé, gratte-ciel, embouteillages, quartiers branchés… Comment vit-on dans une ville de plusieurs millions d’habitants ?',
 ['Une métropole est une très grande ville qui concentre population, activités et pouvoirs.','Plus de la moitié de l’humanité vit en ville.','Habiter une métropole, c’est se loger, se déplacer, travailler, se divertir… mais aussi faire face aux inégalités et à la pollution.'],'Une métropole s’étend : centre, banlieues, puis espace périurbain.',
 {q:[['Qu’est-ce qu’une métropole ?','Une très grande ville qui concentre population, activités et pouvoirs','Un petit village de montagne|Une zone agricole|Une île déserte','Exemples : Paris, Londres, New York, Tokyo.'],['Quelle part de l’humanité vit en ville aujourd’hui ?','Plus de la moitié','Un quart|Un dixième|Presque personne','Depuis 2007, les urbains sont majoritaires dans le monde.'],['Comment appelle-t-on les communes autour de la ville-centre ?','La banlieue','Le centre-ville|La campagne isolée|Le littoral','Au-delà commence l’espace périurbain.'],['Qu’est-ce que l’étalement urbain ?','L’extension de la ville sur les espaces ruraux','La disparition des villes|La construction de gratte-ciel uniquement|Le départ de tous les habitants','Il consomme beaucoup de terres agricoles.'],['Laquelle est l’une des plus grandes métropoles du monde ?','Tokyo','Brest|Ajaccio|Chamonix','L’agglomération de Tokyo compte environ 37 millions d’habitants.'],['Qu’est-ce que le CBD ?','Le quartier des affaires','Une zone agricole|Un parc naturel|Un aéroport','Central Business District : tours de bureaux, sièges d’entreprises.'],['Quel problème touche souvent les grandes métropoles ?','Les embouteillages et la pollution','Le manque d’habitants|L’absence de transports|Le manque d’emplois qualifiés','Les métropoles développent les transports en commun pour y répondre.']],
  d:[['métropole','très grande ville qui concentre population, activités et pouvoirs'],['banlieue','ensemble des communes autour de la ville-centre'],['espace périurbain','espace à la périphérie de la ville, mêlant maisons et campagne'],['étalement urbain','extension de la ville sur les espaces ruraux'],['bidonville','quartier d’habitations précaires, sans eau ni électricité'],['quartier des affaires','quartier qui concentre les bureaux et les sièges d’entreprises']],
  t:[['Une métropole concentre de nombreuses activités et emplois.',true,'C’est ce qui attire les habitants.'],['Tous les habitants d’une métropole vivent dans de bonnes conditions.',false,'Il existe de fortes inégalités, et parfois des bidonvilles.']]}),
hc('hg6h','G','Habiter un espace de faible densité','🏔️','Un village perché en montagne, une oasis au milieu du Sahara, une ferme isolée dans la Beauce : comment vit-on là où il y a peu d’habitants ?',
 ['La densité est le nombre d’habitants par km².','Les espaces de faible densité sont peu peuplés : montagnes, déserts, régions froides, campagnes agricoles.','Les habitants s’adaptent aux contraintes (relief, climat) et valorisent leur territoire (agriculture, tourisme).'],'Dans le Sahara, la vie se concentre dans les oasis, autour des points d’eau.',
 {q:[['Comment calcule-t-on la densité de population ?','Nombre d’habitants ÷ superficie en km²','Superficie ÷ nombre de villes|Nombre de voitures ÷ habitants|Nombre de maisons ÷ routes','Elle s’exprime en habitants par km².'],['Lequel est un espace à forte contrainte ?','Un désert','Une métropole|Un port|Un centre-ville','Le manque d’eau limite le peuplement.'],['Qu’est-ce qu’une oasis ?','Un lieu cultivé et habité autour d’un point d’eau dans le désert','Une grande ville côtière|Une station de ski|Une forêt tropicale','On y cultive par exemple des palmiers-dattiers.'],['Quelle activité fait vivre de nombreux espaces de montagne ?','Le tourisme','L’industrie lourde|Les ports de commerce|La pêche en haute mer','Stations de ski l’hiver, randonnées l’été.'],['Quelle est une contrainte des espaces montagnards ?','Le relief et le froid','La chaleur extrême|La mer|La foule','Les pentes rendent l’accès et l’agriculture difficiles.'],['Comment appelle-t-on un espace peu peuplé tourné vers l’agriculture ?','Un espace rural agricole','Un quartier des affaires|Une métropole|Un port','Grandes exploitations, peu d’habitants, beaucoup de champs.']],
  d:[['densité de population','nombre moyen d’habitants par km²'],['contrainte','difficulté naturelle qui limite l’installation des hommes'],['oasis','lieu habité et cultivé autour d’un point d’eau dans le désert'],['espace rural','espace de campagne, peu urbanisé'],['aménagement','action de transformer un espace pour l’adapter aux besoins des habitants']],
  t:[['Les espaces de faible densité sont totalement vides.',false,'Ils sont peu peuplés, mais habités.'],['Le climat peut être une contrainte pour s’installer.',true,'Froid, chaleur ou sécheresse limitent le peuplement.']]}),
hc('hg6i','G','Habiter les littoraux','🏖️','Porte-conteneurs géants d’un côté, plages bondées de l’autre : les côtes attirent les hommes comme un aimant !',
 ['Le littoral est la zone de contact entre la terre et la mer.','Littoral industrialo-portuaire : ports, usines, échanges (Rotterdam, Le Havre).','Littoral touristique : plages, hôtels, loisirs (la Côte d’Azur). Ces espaces fragiles doivent être protégés.'],'Rotterdam, aux Pays-Bas, est le premier port d’Europe.',
 {q:[['Qu’est-ce qu’un littoral ?','La zone de contact entre la terre et la mer','Le sommet d’une montagne|Le centre d’une ville|Une forêt','Les littoraux attirent beaucoup d’habitants.'],['Quel est le premier port d’Europe ?','Rotterdam','Marseille|Brest|Venise','Il se trouve aux Pays-Bas.'],['Qu’est-ce qu’un littoral industrialo-portuaire ?','Un littoral aménagé avec un port et des usines','Un littoral réservé aux plages|Une réserve naturelle|Un désert côtier','Exemples : Le Havre, Fos-sur-Mer.'],['Quelle activité domine sur la Côte d’Azur ?','Le tourisme','La sidérurgie|L’agriculture céréalière|L’extraction de charbon','Plages, hôtels, ports de plaisance.'],['Qu’est-ce que la littoralisation ?','La concentration des hommes et des activités sur les littoraux','La disparition des plages|Le recul des ports|La construction en montagne','Environ 40 % de l’humanité vit à moins de 100 km des côtes.'],['Quel risque menace certains littoraux ?','L’érosion et la montée du niveau de la mer','Les avalanches|La désertification|Les éruptions de neige','Le changement climatique aggrave ce risque.'],['Comment s’appelle la loi française qui protège les littoraux ?','La loi Littoral','La loi Montagne|Le Code de Hammurabi|La loi de 1905','Votée en 1986, elle limite les constructions en bord de mer.']],
  d:[['littoral','zone de contact entre la terre et la mer'],['littoralisation','concentration des hommes et des activités sur les littoraux'],['zone industrialo-portuaire','espace littoral associant un port et des industries'],['station balnéaire','ville littorale aménagée pour le tourisme et les bains de mer'],['érosion','usure et recul progressif de la côte']],
  t:[['Les littoraux sont des espaces très attractifs.',true,'Une grande partie de l’humanité vit près des côtes.'],['On peut construire partout sur le littoral français.',false,'La loi Littoral limite les constructions.']]}),
hc('hg6j','G','Le monde habité','🌍','Plus de 8 milliards d’humains sur Terre, mais certaines régions sont bondées et d’autres presque vides. Pourquoi ?',
 ['La Terre compte plus de 8 milliards d’habitants, très inégalement répartis.','Trois grands foyers de peuplement : l’Asie de l’Est, l’Asie du Sud et l’Europe.','Les déserts, les hautes montagnes et les régions froides sont peu peuplés.'],'L’Inde et la Chine comptent chacune plus de 1,4 milliard d’habitants.',
 {q:[['Combien d’habitants compte la Terre ?','Plus de 8 milliards','Environ 1 milliard|Environ 3 milliards|Plus de 20 milliards','Le cap des 8 milliards a été franchi en 2022.'],['Quel est le pays le plus peuplé du monde ?','L’Inde','La France|Le Brésil|L’Australie','L’Inde a dépassé la Chine en 2023.'],['Lequel est un grand foyer de peuplement ?','L’Asie du Sud','Le Sahara|L’Antarctique|La Sibérie','Avec l’Asie de l’Est et l’Europe.'],['Quel espace est presque vide d’hommes ?','L’Antarctique','L’Europe de l’Ouest|La vallée du Nil|L’Asie de l’Est','Le froid extrême y empêche toute installation durable.'],['Combien de continents sont habités en permanence ?','Cinq','Trois|Huit|Douze','Afrique, Amérique, Asie, Europe, Océanie.'],['Quel est le plus grand océan ?','L’océan Pacifique','L’océan Atlantique|L’océan Indien|L’océan Arctique','Il couvre environ un tiers de la planète.']],
  d:[['foyer de peuplement','région où vit une très grande partie de la population'],['répartition','manière dont la population est distribuée sur un territoire'],['continent','très grande étendue de terre'],['océan','très vaste étendue d’eau salée']],
  t:[['La population mondiale est répartie de façon égale.',false,'Elle est très concentrée dans quelques foyers.'],['L’Asie est le continent le plus peuplé.',true,'Elle regroupe environ 60 % de l’humanité.']]}),
hc('hg6k','E','Représenter les autres, l’intérêt général','🗳️','En septembre, ta classe élit ses délégués. Mais au fait, à quoi sert un représentant ? Et que veut dire « intérêt général » ?',
 ['L’intérêt général est l’intérêt commun de tous, y compris des générations futures.','On vote pour élire des représentants qui portent la parole des autres et rendent des comptes.','Au collège : délégués de classe, conseil de la vie collégienne, éco-délégués.'],'Le délégué de classe représente ses camarades au conseil de classe.',
 {q:[['Qu’est-ce que l’intérêt général ?','L’intérêt commun de tous les membres de la société','L’intérêt d’une seule personne|L’intérêt des plus riches|L’avis du délégué','Il peut s’opposer aux intérêts particuliers.'],['Quel est le rôle d’un délégué de classe ?','Représenter et porter la parole de ses camarades','Punir les élèves|Remplacer le professeur|Choisir les notes','Il participe notamment au conseil de classe.'],['Qui sont les éco-délégués ?','Des élèves qui agissent pour l’environnement au collège','Des professeurs de sciences|Des policiers|Des parents d’élèves','Ils mènent des projets liés au développement durable.'],['Pourquoi vote-t-on ?','Pour choisir des représentants et participer aux décisions','Pour gagner de l’argent|Parce que c’est un jeu|Pour éviter d’aller en classe','Le vote est le moyen de s’exprimer en démocratie.'],['Qui représente les citoyens au Parlement européen ?','Des députés européens élus','Le délégué de classe|Le maire|Le secrétaire général de l’ONU','Ils sont élus tous les 5 ans.'],['Devant qui un élu est-il responsable ?','Devant ceux qui l’ont élu','Devant personne|Devant son professeur|Devant sa famille seulement','Il doit rendre compte de son action.']],
  d:[['intérêt général','intérêt commun à tous les membres de la société'],['intérêt particulier','intérêt d’une personne ou d’un groupe'],['représentant','personne élue pour parler et agir au nom des autres'],['vote','moyen d’exprimer son choix lors d’une élection'],['délégué','élève élu pour représenter sa classe']],
  t:[['L’intérêt général inclut les générations futures.',true,'Protéger l’environnement en est un exemple.'],['Un représentant défend seulement ses propres idées.',false,'Il porte la parole de ceux qui l’ont élu.']]}),
hc('hg6l','E','La laïcité','⚖️','Croire, ne pas croire, changer d’avis : en France, c’est ta liberté. La laïcité est la règle qui la protège.',
 ['La laïcité garantit la liberté de conscience : croire, ne pas croire, changer de croyance.','L’État est neutre vis-à-vis des religions et garantit le libre exercice des cultes (loi de 1905).','À l’école publique, la loi de 2004 interdit aux élèves les signes religieux ostensibles.'],'Le 9 décembre est la Journée de la laïcité, en souvenir de la loi du 9 décembre 1905.',
 {q:[['Que garantit la laïcité ?','La liberté de conscience et l’égalité de tous','L’interdiction de toute religion|Une religion officielle|Le droit de ne pas aller à l’école','Chacun est libre de croire ou de ne pas croire.'],['Quelle loi sépare les Églises et l’État ?','La loi de 1905','La loi de 2004|La loi Littoral|Le Code civil de 1804','Elle est votée le 9 décembre 1905.'],['Que prévoit la loi du 15 mars 2004 ?','Les élèves ne peuvent pas porter de signes religieux ostensibles à l’école publique','Les religions sont interdites en France|Les professeurs doivent être croyants|Les élèves doivent prier','Elle s’applique aux écoles, collèges et lycées publics.'],['La laïcité, c’est…','Un principe juridique','Une religion|Une opinion personnelle|L’athéisme','Elle se distingue de l’athéisme, qui est un choix personnel.'],['Quand a lieu la Journée de la laïcité ?','Le 9 décembre','Le 14 juillet|Le 1er mai|Le 11 novembre','En souvenir de la loi du 9 décembre 1905.'],['Qu’est-ce que la liberté de conscience ?','La liberté de croire, de ne pas croire ou de changer de croyance','L’obligation de croire|L’interdiction de croire|La liberté de ne pas respecter la loi','Elle est protégée par l’article 10 de la DDHC.']],
  d:[['laïcité','principe qui garantit la liberté de conscience et la neutralité de l’État'],['liberté de conscience','liberté de croire, de ne pas croire ou de changer de croyance'],['neutralité','fait que l’État ne favorise aucune religion'],['prosélytisme','fait de chercher à convertir les autres à sa croyance'],['culte','pratique d’une religion']],
  t:[['La laïcité interdit d’avoir une religion.',false,'Elle protège la liberté de croire ou de ne pas croire.'],['La République ne reconnaît, ne salarie ni ne subventionne aucun culte.',true,'C’est l’article 2 de la loi de 1905.']]}),
hc('hg6m','E','Le respect de la vie privée','📱','Une photo postée en deux secondes peut te suivre pendant des années. Tes données, ton image, ta vie privée : c’est à toi !',
 ['Chacun, enfant comme adulte, a droit au respect de sa vie privée.','Droit à l’image : on ne publie pas la photo de quelqu’un sans son accord.','La majorité numérique est fixée à 15 ans (loi du 7 juillet 2023).'],'Une photo publiée en ligne laisse une trace numérique difficile à effacer.',
 {q:[['Peut-on publier la photo d’un camarade sans son accord ?','Non, c’est contraire au droit à l’image','Oui, toujours|Oui, s’il est absent|Oui, si la photo est drôle','La personne doit donner son accord.'],['À quel âge la loi fixe-t-elle la majorité numérique ?','15 ans','10 ans|13 ans|21 ans','Avant 15 ans, l’accord des parents est nécessaire pour s’inscrire sur un réseau social.'],['Qu’est-ce qu’une donnée personnelle ?','Une information qui permet d’identifier une personne','Un dessin anonyme|La météo du jour|Un chiffre au hasard','Nom, adresse, photo, numéro de téléphone…'],['Quel organisme protège les données personnelles en France ?','La CNIL','L’ONU|La SNCF|Le Sénat','Commission nationale de l’informatique et des libertés.'],['Qu’est-ce que le cyberharcèlement ?','Un harcèlement répété par des moyens numériques','Un jeu vidéo|Une panne d’Internet|Un réseau social','C’est un délit. Numéro d’aide gratuit : 3018.'],['Quel texte international protège la vie privée des enfants ?','La Convention internationale des droits de l’enfant','Le Code de la route|La loi de 1905|Le Code de Hammurabi','Son article 16 protège la vie privée de l’enfant.']],
  d:[['vie privée','ce qui concerne l’intimité d’une personne et n’a pas à être exposé'],['droit à l’image','droit de refuser qu’on diffuse son image sans son accord'],['donnée personnelle','information qui permet d’identifier une personne'],['identité numérique','ensemble des traces laissées par une personne sur Internet'],['cyberharcèlement','harcèlement répété par des moyens numériques']],
  t:[['Ce qui est publié sur Internet peut rester très longtemps.',true,'C’est ta trace numérique.'],['Un enfant n’a pas droit au respect de sa vie privée.',false,'Il y a droit, comme un adulte.']]})
],
'hg5':[
hc('hg5a','H','Byzance et l’Europe carolingienne','👑','Un empereur à la barbe fleurie couronné à Rome, une capitale dorée sur le Bosphore : deux mondes chrétiens qui finissent par se séparer.',
 ['L’Empire romain d’Orient devient l’Empire byzantin : capitale Constantinople, chrétiens orthodoxes.','En Occident, Charlemagne est couronné empereur à Rome en 800.','En 1054, les chrétiens se séparent : catholiques (Rome) et orthodoxes (Constantinople).'],'Charlemagne s’appuie sur l’Église et sur les missi dominici pour gouverner son empire.',
 {q:[['Quelle est la capitale de l’Empire byzantin ?','Constantinople','Rome|Aix-la-Chapelle|Bagdad','C’est l’actuelle Istanbul.'],['En quelle année Charlemagne est-il couronné empereur ?','800','476|1054|1492','Il est couronné à Rome par le pape le 25 décembre 800.'],['Que se passe-t-il en 1054 ?','La séparation entre catholiques et orthodoxes','La prise de Constantinople|La naissance de l’islam|Le couronnement de Charlemagne','On parle du schisme de 1054.'],['Qui sont les missi dominici ?','Les envoyés de Charlemagne qui contrôlent l’empire','Des moines copistes|Des marchands byzantins|Des soldats arabes','Ils vont par deux : un laïc et un religieux.'],['Quel monument célèbre de Constantinople est construit sous Justinien ?','Sainte-Sophie','Le Colisée|Notre-Dame de Paris|Le Parthénon','Basilique chrétienne achevée en 537.'],['Quelle est la capitale de Charlemagne ?','Aix-la-Chapelle','Paris|Constantinople|Rome','Elle se trouve dans l’actuelle Allemagne.']],
  d:[['empire','territoire très vaste dirigé par un empereur'],['orthodoxe','chrétien d’Orient, fidèle au patriarche de Constantinople'],['catholique','chrétien d’Occident, fidèle au pape de Rome'],['schisme','séparation au sein d’une religion'],['pape','chef de l’Église catholique']],
  c:[[476,'Fin de l’Empire romain d’Occident'],[537,'Achèvement de Sainte-Sophie'],[800,'Couronnement de Charlemagne'],[1054,'Schisme entre catholiques et orthodoxes']],
  t:[['Charlemagne a été couronné empereur à Rome.',true,'Par le pape Léon III, en 800.'],['L’Empire byzantin est musulman.',false,'Il est chrétien orthodoxe.']]}),
hc('hg5b','H','La naissance de l’islam','☪️','Au VIIe siècle, dans les déserts d’Arabie, naît une religion qui va s’étendre en un siècle de l’Espagne jusqu’à l’Inde.',
 ['L’islam naît en Arabie au VIIe siècle, avec le prophète Mahomet (Muhammad).','622 : l’Hégire, départ de Mahomet de La Mecque vers Médine, début du calendrier musulman.','Le Coran est le livre sacré. Bagdad, fondée en 762, devient la capitale des califes abbassides jusqu’à sa prise par les Mongols en 1258.'],'Les cinq piliers de l’islam : profession de foi, prière, aumône, jeûne du ramadan, pèlerinage à La Mecque.',
 {q:[['Dans quelle région naît l’islam ?','En Arabie','En Gaule|En Grèce|En Chine','Au VIIe siècle.'],['Qu’est-ce que l’Hégire ?','Le départ de Mahomet de La Mecque vers Médine en 622','La prise de Bagdad|La construction de la Kaaba|La mort de Mahomet','C’est l’an 1 du calendrier musulman.'],['Quel est le livre sacré des musulmans ?','Le Coran','La Bible|La Torah|L’Iliade','Il est écrit en arabe.'],['Qui dirige l’empire musulman après Mahomet ?','Le calife','Le pape|Le pharaon|L’empereur byzantin','Calife signifie « successeur ».'],['Quelle ville devient la capitale des califes abbassides ?','Bagdad','Cordoue|Rome|Paris','Fondée en 762, c’est un grand centre de savoir.'],['Qui prend Bagdad en 1258 ?','Les Mongols','Les Byzantins|Les croisés|Les Romains','C’est la fin du califat abbasside de Bagdad.'],['Lequel fait partie des cinq piliers de l’islam ?','Le jeûne du ramadan','Le baptême|La messe|Le sabbat','Les autres : profession de foi, prière, aumône, pèlerinage.']],
  d:[['islam','religion monothéiste fondée par Mahomet'],['Coran','livre sacré des musulmans'],['calife','successeur de Mahomet, chef politique et religieux'],['Hégire','départ de Mahomet vers Médine en 622'],['mosquée','lieu de prière des musulmans']],
  c:[[622,'L’Hégire'],[632,'Mort de Mahomet'],[762,'Fondation de Bagdad'],[1258,'Prise de Bagdad par les Mongols']],
  t:[['L’islam est une religion monothéiste.',true,'Les musulmans croient en un dieu unique, Allah.'],['Bagdad était une petite ville sans importance.',false,'C’était l’une des plus grandes villes du monde.']]}),
hc('hg5c','H','La société féodale','🏰','Châteaux forts, chevaliers, paysans qui labourent : au Moyen Âge, chacun a sa place… et ne doit pas en changer !',
 ['Du XIe au XVe siècle, la société s’organise autour du seigneur et de son château.','Les paysans (environ 90 % de la population) travaillent la terre et paient des taxes au seigneur.','Les seigneurs sont liés par l’hommage (vassal et suzerain). L’Église encadre la vie des fidèles.'],'Le vassal jure fidélité à son suzerain, qui lui donne un fief.',
 {q:[['Quelle part de la population est paysanne au Moyen Âge ?','Environ 90 %','Environ 10 %|Environ 50 %|Presque personne','La société est très rurale.'],['Qu’est-ce qu’un fief ?','Une terre donnée par un suzerain à son vassal','Une taxe sur le sel|Une église|Une arme','En échange, le vassal doit aide et conseil.'],['Comment s’appelle la cérémonie où un vassal jure fidélité ?','L’hommage','Le sacre|Le baptême|Le couronnement','Le vassal place ses mains dans celles du suzerain.'],['Quels sont les trois ordres de la société médiévale ?','Ceux qui prient, ceux qui combattent, ceux qui travaillent','Riches, pauvres, étrangers|Citoyens, esclaves, métèques|Rois, papes, empereurs','Clergé, nobles, paysans.'],['Qu’est-ce qu’une seigneurie ?','Le territoire dominé par un seigneur','Un monastère|Une ville libre|Un royaume entier','Le seigneur y rend la justice et prélève des taxes.'],['Qu’est-ce que la dîme ?','Un impôt versé à l’Église','Un impôt versé au roi|Une fête religieuse|Un outil agricole','Environ un dixième des récoltes.']],
  d:[['seigneur','noble qui possède une seigneurie et domine les paysans'],['vassal','noble qui a juré fidélité à un seigneur plus puissant'],['suzerain','seigneur à qui un vassal a juré fidélité'],['fief','terre donnée par un suzerain à son vassal'],['clergé','ensemble des religieux'],['dîme','impôt versé à l’Église']],
  t:[['Au Moyen Âge, la plupart des gens vivent en ville.',false,'Environ 90 % sont des paysans.'],['L’Église joue un rôle très important dans la vie des gens.',true,'Elle rythme la vie, du baptême à la mort.']]}),
hc('hg5d','H','Villes et monarchie capétienne','⚜️','Des marchands qui font fortune, des cathédrales qui touchent le ciel, des rois qui agrandissent leur royaume : la France prend forme.',
 ['À partir du XIe siècle, les villes se développent : marchands, artisans, foires, bourgeois.','Les rois capétiens (987 : Hugues Capet) renforcent leur pouvoir et agrandissent le domaine royal.','Philippe Auguste gagne à Bouvines (1214) ; la guerre de Cent Ans (1337-1453) oppose la France et l’Angleterre.'],'Les bourgeois obtiennent des chartes de franchise qui leur accordent des libertés.',
 {q:[['Quand Hugues Capet devient-il roi ?','987','800|1214|1453','Début de la dynastie capétienne.'],['Quelle bataille Philippe Auguste gagne-t-il en 1214 ?','Bouvines','Alésia|Waterloo|Verdun','Il renforce ainsi le pouvoir royal.'],['Qui sont les bourgeois au Moyen Âge ?','Les habitants des villes (marchands, artisans)','Les paysans|Les moines|Les chevaliers','Ils obtiennent des libertés grâce aux chartes.'],['Quelle guerre oppose la France à l’Angleterre de 1337 à 1453 ?','La guerre de Cent Ans','La guerre de Trente Ans|La Première Guerre mondiale|La guerre des Gaules','Jeanne d’Arc y joue un rôle important.'],['Qu’est-ce qu’une corporation ?','Un groupement d’artisans d’un même métier','Une armée royale|Un monastère|Un impôt','Elle fixe les règles du métier.'],['Que reçoit le roi lors du sacre à Reims ?','Un pouvoir qui lui vient de Dieu','Une couronne en papier|Le titre d’empereur romain|Un fief','Le roi reçoit l’onction d’huile sainte.']],
  d:[['bourgeois','habitant d’une ville au Moyen Âge'],['charte de franchise','texte qui accorde des libertés aux habitants d’une ville'],['corporation','groupement d’artisans d’un même métier'],['sacre','cérémonie religieuse qui fait du roi l’élu de Dieu'],['dynastie','suite de souverains d’une même famille']],
  c:[[987,'Hugues Capet devient roi'],[1214,'Bataille de Bouvines'],[1337,'Début de la guerre de Cent Ans'],[1429,'Jeanne d’Arc délivre Orléans'],[1453,'Fin de la guerre de Cent Ans']],
  t:[['Les villes déclinent à partir du XIe siècle.',false,'Elles se développent.'],['Les Capétiens agrandissent le domaine royal.',true,'Par la guerre, les mariages et les héritages.']]}),
hc('hg5e','H','Le monde au XVIe siècle','⛵','Des caravelles qui partent vers l’inconnu, des empires immenses qui se disputent le monde : le XVIe siècle change la carte de la planète.',
 ['En 1492, Christophe Colomb atteint l’Amérique ; les Européens explorent le monde.','Les Espagnols conquièrent les empires aztèque et inca ; les populations amérindiennes s’effondrent.','Charles Quint et Soliman le Magnifique dirigent deux immenses empires rivaux.'],'L’expédition de Magellan réalise le premier tour du monde (1519-1522).',
 {q:[['En quelle année Christophe Colomb atteint-il l’Amérique ?','1492','1453|1515|1789','Il pensait atteindre les Indes.'],['Qui a conquis l’empire aztèque ?','Hernán Cortés','Christophe Colomb|Magellan|Soliman','Entre 1519 et 1521.'],['Qui dirige l’Empire ottoman au XVIe siècle ?','Soliman le Magnifique','Charles Quint|François Ier|Mahomet','Il règne de 1520 à 1566.'],['Comment décrit-on l’empire de Charles Quint ?','Un empire « sur lequel le soleil ne se couche jamais »','Un empire sans armée|Un petit royaume|Une république','Espagne, Saint-Empire, colonies d’Amérique…'],['Quelle expédition réalise le premier tour du monde ?','Celle de Magellan','Celle de Colomb|Celle de Cortés|Celle de Vasco de Gama','1519-1522 ; Magellan meurt en route.'],['Pourquoi les Amérindiens meurent-ils en masse ?','À cause des maladies apportées par les Européens et des violences','À cause du froid|À cause d’une guerre entre eux seulement|À cause d’une famine en Europe','Variole, travail forcé, massacres.'],['Quelle ville les Ottomans prennent-ils en 1453 ?','Constantinople','Rome|Paris|Madrid','C’est la fin de l’Empire byzantin.']],
  d:[['Grandes découvertes','explorations européennes des XVe et XVIe siècles'],['conquistador','conquérant espagnol de l’Amérique'],['Amérindiens','premiers habitants du continent américain'],['empire colonial','territoires conquis et dominés par un pays européen'],['caravelle','navire léger utilisé pour les explorations']],
  c:[[1453,'Prise de Constantinople par les Ottomans'],[1492,'Colomb atteint l’Amérique'],[1498,'Vasco de Gama atteint l’Inde'],[1519,'Départ de l’expédition de Magellan'],[1521,'Chute de Tenochtitlan, capitale aztèque']],
  t:[['Colomb savait qu’il découvrait un nouveau continent.',false,'Il pensait être arrivé aux Indes.'],['Soliman et Charles Quint étaient rivaux.',true,'Les Ottomans assiègent même Vienne en 1529.']]}),
hc('hg5f','H','Humanisme, réformes et conflits religieux','📖','Une machine qui imprime des livres, un moine qui défie le pape, des guerres entre chrétiens : le XVIe siècle est en ébullition !',
 ['L’humanisme place l’être humain et le savoir au centre ; l’imprimerie (Gutenberg, vers 1450) diffuse les idées.','En 1517, Luther critique l’Église : c’est le début de la Réforme protestante.','En France, les guerres de religion (massacre de la Saint-Barthélemy, 1572) s’achèvent avec l’édit de Nantes (1598).'],'Érasme, grand humaniste, prône la tolérance et le retour aux textes anciens.',
 {q:[['Qui met au point l’imprimerie vers 1450 ?','Gutenberg','Luther|Léonard de Vinci|Érasme','Les livres deviennent plus nombreux et moins chers.'],['Que critique Luther en 1517 ?','La vente des indulgences par l’Église','Le roi de France|L’imprimerie|Les Grandes découvertes','Ses 95 thèses lancent la Réforme.'],['Comment appelle-t-on les chrétiens qui suivent Luther ou Calvin ?','Les protestants','Les orthodoxes|Les catholiques|Les musulmans','Ils rejettent l’autorité du pape.'],['Que se passe-t-il le 24 août 1572 ?','Le massacre de la Saint-Barthélemy','L’édit de Nantes|La prise de la Bastille|Le sacre d’Henri IV','Des milliers de protestants sont tués à Paris puis en province.'],['Quel texte met fin aux guerres de religion en 1598 ?','L’édit de Nantes','L’édit de Caracalla|La loi de 1905|La Déclaration des droits de l’homme','Signé par Henri IV, il accorde des droits et une liberté de culte limitée aux protestants.'],['Quel artiste est un génie de la Renaissance ?','Léonard de Vinci','Charlemagne|Hugues Capet|Vercingétorix','Peintre de la Joconde, ingénieur, savant.']],
  d:[['humanisme','mouvement qui place l’être humain et le savoir au centre'],['Renaissance','renouveau des arts et des sciences en Europe aux XVe et XVIe siècles'],['Réforme','mouvement de critique de l’Église qui donne naissance au protestantisme'],['protestant','chrétien qui suit les idées de Luther ou de Calvin'],['indulgence','pardon des péchés que l’Église vendait aux fidèles']],
  c:[[1450,'Invention de l’imprimerie par Gutenberg (vers)'],[1517,'Luther publie ses 95 thèses'],[1572,'Massacre de la Saint-Barthélemy'],[1598,'Édit de Nantes']],
  t:[['L’imprimerie a aidé à diffuser les idées de la Réforme.',true,'Les textes de Luther sont imprimés et lus partout.'],['L’édit de Nantes interdit le protestantisme.',false,'Il accorde des droits aux protestants.']]}),
hc('hg5g','H','Du prince de la Renaissance au roi absolu','☀️','Un roi qui invite Léonard de Vinci, un autre qui se fait appeler le Roi-Soleil : en 200 ans, le pouvoir royal devient absolu.',
 ['François Ier (1515-1547), roi mécène de la Renaissance, impose le français dans les actes officiels (Villers-Cotterêts, 1539).','Henri IV met fin aux guerres de religion (1598).','Louis XIV (règne personnel de 1661 à 1715) incarne la monarchie absolue et fait de Versailles le siège du pouvoir.'],'Avec l’ordonnance de Villers-Cotterêts, le français remplace le latin dans la justice et l’administration.',
 {q:[['En quelle année François Ier devient-il roi ?','1515','1492|1598|1661','Il gagne la bataille de Marignan la même année.'],['Que décide l’ordonnance de Villers-Cotterêts (1539) ?','Le français devient la langue des actes officiels','La liberté de culte|La fin du servage|La construction de Versailles','Elle remplace le latin dans la justice et l’administration.'],['Quel roi fait de Versailles le siège du pouvoir ?','Louis XIV','François Ier|Henri IV|Charlemagne','La cour s’y installe en 1682.'],['Qu’est-ce qu’une monarchie absolue ?','Un régime où le roi détient tous les pouvoirs','Un régime où le peuple vote les lois|Une république|Un empire romain','Le roi ne rend compte qu’à Dieu.'],['Quel surnom a Louis XIV ?','Le Roi-Soleil','Le Bel|Le Lion|Le Magnifique','Le soleil est son emblème.'],['Quel artiste italien François Ier accueille-t-il en France ?','Léonard de Vinci','Michel-Ange|Raphaël|Botticelli','Il meurt à Amboise en 1519.']],
  d:[['mécène','personne qui protège et finance des artistes'],['monarchie absolue','régime où le roi détient tous les pouvoirs'],['courtisan','noble qui vit à la cour du roi'],['ordonnance','décision écrite du roi qui a valeur de loi']],
  c:[[1515,'François Ier devient roi'],[1539,'Ordonnance de Villers-Cotterêts'],[1598,'Édit de Nantes'],[1661,'Début du règne personnel de Louis XIV'],[1682,'La cour s’installe à Versailles'],[1715,'Mort de Louis XIV']],
  t:[['Louis XIV partageait le pouvoir avec un Parlement élu.',false,'Il gouverne seul : c’est la monarchie absolue.'],['François Ier était un roi de la Renaissance.',true,'Il protège les artistes et les savants.']]}),
hc('hg5h','G','Démographie et inégal développement','👶','Une population qui explose en Afrique, une Europe qui vieillit : le monde ne grandit pas au même rythme partout.',
 ['La population mondiale augmente, mais de façon très inégale selon les régions.','Le développement mesure l’amélioration des conditions de vie ; l’IDH le mesure (santé, éducation, revenu).','La transition démographique : on passe d’une natalité et d’une mortalité fortes à une natalité et une mortalité faibles.'],'L’Afrique a la croissance démographique la plus forte ; l’Europe vieillit.',
 {q:[['Que mesure l’IDH ?','Le développement (santé, éducation, niveau de vie)','La superficie d’un pays|Le nombre de villes|La température moyenne','Indice de développement humain, entre 0 et 1.'],['Quel continent a la plus forte croissance démographique ?','L’Afrique','L’Europe|L’Océanie|L’Amérique du Nord','Sa population augmente très vite.'],['Qu’est-ce que la transition démographique ?','Le passage d’une natalité et d’une mortalité fortes à faibles','Le déplacement des hommes d’un pays à l’autre|La baisse de la population mondiale|Le vieillissement des villes','Elle accompagne le développement.'],['Qu’est-ce que le taux de natalité ?','Le nombre de naissances pour 1 000 habitants par an','Le nombre de décès par an|Le nombre d’enfants par école|Le nombre de mariages','On le compare au taux de mortalité.'],['Quel phénomène touche l’Europe ?','Le vieillissement de la population','Une natalité très forte|Une population très jeune|La disparition des personnes âgées','La part des plus de 65 ans augmente.'],['Qu’est-ce que l’espérance de vie ?','Le nombre moyen d’années qu’un nouveau-né peut espérer vivre','L’âge de la retraite|L’âge moyen de la population|Le nombre d’années d’école','Elle dépasse 80 ans en France.']],
  d:[['développement','amélioration des conditions de vie d’une population'],['IDH','indicateur qui mesure le développement (santé, éducation, revenu)'],['natalité','nombre de naissances dans une population'],['mortalité','nombre de décès dans une population'],['croissance démographique','augmentation de la population'],['espérance de vie','durée de vie moyenne d’un nouveau-né']],
  t:[['Tous les pays du monde ont le même niveau de développement.',false,'Les inégalités sont très fortes.'],['L’Europe connaît un vieillissement de sa population.',true,'Natalité faible, espérance de vie élevée.']]}),
hc('hg5i','G','Des ressources limitées à gérer','💧','L’eau du robinet, l’électricité, ton assiette : tout ça vient de ressources que le monde doit apprendre à partager… et à préserver.',
 ['L’eau, l’énergie et l’alimentation sont des ressources inégalement réparties.','Certaines ressources s’épuisent (pétrole, charbon, gaz) ; d’autres sont renouvelables (soleil, vent, eau).','Le développement durable vise à répondre aux besoins d’aujourd’hui sans compromettre ceux de demain.'],'Plus de 2 milliards de personnes n’ont pas accès à une eau potable gérée en toute sécurité.',
 {q:[['Laquelle est une énergie renouvelable ?','L’énergie solaire','Le pétrole|Le charbon|Le gaz naturel','Elle ne s’épuise pas.'],['Qu’est-ce que le développement durable ?','Répondre aux besoins actuels sans compromettre ceux des générations futures','Produire toujours plus|Arrêter toute activité|Utiliser seulement du pétrole','Il concilie économie, société et environnement.'],['Quelle énergie fossile émet beaucoup de CO₂ ?','Le charbon','L’éolien|Le solaire|L’hydraulique','Les énergies fossiles aggravent le changement climatique.'],['Qu’est-ce que le stress hydrique ?','Une situation où l’eau disponible ne suffit pas aux besoins','Une tempête en mer|Une inondation|Une pluie acide','Il touche par exemple le Moyen-Orient.'],['Combien de personnes souffrent de la faim dans le monde ?','Plusieurs centaines de millions','Personne|Une dizaine|Tout le monde','Environ 700 millions selon l’ONU.'],['Quelle est la principale utilisation de l’eau douce dans le monde ?','L’agriculture (irrigation)','Les piscines|Les douches|Les usines de jouets','Environ 70 % de l’eau prélevée.']],
  d:[['ressource','richesse naturelle utilisée par les hommes'],['énergie renouvelable','énergie qui ne s’épuise pas (soleil, vent, eau)'],['énergie fossile','énergie issue du sous-sol, qui s’épuise (pétrole, gaz, charbon)'],['développement durable','développement qui préserve les besoins des générations futures'],['irrigation','apport artificiel d’eau aux cultures'],['sous-alimentation','manque de nourriture pour vivre en bonne santé']],
  t:[['Le pétrole est une ressource inépuisable.',false,'C’est une énergie fossile qui s’épuise.'],['L’accès à l’eau potable est inégal dans le monde.',true,'Des milliards de personnes en manquent.']]}),
hc('hg5j','G','Risques et changement global','🌡️','Canicules, inondations, tempêtes, usines qui explosent : comment les sociétés se protègent-elles des risques ?',
 ['Le changement climatique est provoqué principalement par les gaz à effet de serre émis par les activités humaines.','Ses effets : hausse des températures, montée du niveau des mers, événements extrêmes plus fréquents.','Prévenir les risques industriels et technologiques : surveillance, information, plans d’urgence.'],'En 2001, l’explosion de l’usine AZF à Toulouse a fait 31 morts.',
 {q:[['Quelle est la principale cause du changement climatique actuel ?','Les gaz à effet de serre émis par les activités humaines','Les volcans uniquement|La rotation de la Terre|Les marées','Combustion du pétrole, du charbon et du gaz.'],['Quel est un effet du changement climatique ?','La montée du niveau des mers','La baisse des températures partout|La fin des tempêtes|L’arrêt de la fonte des glaces','Les glaciers et les calottes fondent.'],['Qu’est-ce qu’un risque ?','La rencontre entre un aléa et des enjeux (population, biens)','Un orage sans conséquence|Une catastrophe déjà passée|Une loi','Sans population exposée, il n’y a pas de risque.'],['Lequel est un risque industriel ?','L’explosion d’une usine chimique','Un séisme|Une avalanche|Une sécheresse','Exemple : AZF à Toulouse en 2001.'],['Comment s’appelle l’accord international de 2015 sur le climat ?','L’accord de Paris','Le traité de Versailles|L’édit de Nantes|Le traité de Rome','Objectif : limiter le réchauffement nettement en dessous de 2 °C.'],['Lequel est un gaz à effet de serre ?','Le dioxyde de carbone (CO₂)','L’oxygène|L’azote|L’hélium','Avec le méthane, il retient la chaleur dans l’atmosphère.']],
  d:[['changement climatique','modification durable du climat, accélérée par les activités humaines'],['effet de serre','phénomène par lequel des gaz retiennent la chaleur dans l’atmosphère'],['aléa','phénomène naturel ou technologique qui peut être dangereux'],['risque','danger possible qui menace une population'],['vulnérabilité','fragilité d’une population face à un risque'],['prévention','ensemble des mesures pour limiter un risque']],
  t:[['Le changement climatique actuel est uniquement naturel.',false,'Les activités humaines l’accélèrent fortement.'],['Les pays pauvres sont souvent plus vulnérables face aux risques.',true,'Ils ont moins de moyens pour se protéger.']]}),
hc('hg5k','E','Égalité et lutte contre les discriminations','🤝','Même métier, salaire différent ? Refusé à cause de son nom ? L’égalité est dans la loi… mais il faut encore se battre pour elle.',
 ['L’égalité entre les femmes et les hommes est un principe fondamental de la République.','Les femmes obtiennent le droit de vote en 1944 ; la loi sur la parité date de 2000.','Une discrimination est un traitement défavorable fondé sur un critère interdit par la loi (origine, sexe, handicap…) : c’est un délit.'],'Malgré les lois, des inégalités de salaire entre femmes et hommes persistent.',
 {q:[['Depuis quand les Françaises ont-elles le droit de vote ?','1944','1789|1905|1981','Elles votent pour la première fois en 1945.'],['Que demande la loi sur la parité (2000) ?','Autant de femmes que d’hommes sur les listes électorales','Que seules les femmes votent|Que les hommes ne travaillent plus|L’égalité des notes à l’école','Elle favorise l’égal accès aux mandats.'],['Qu’est-ce qu’une discrimination ?','Un traitement défavorable fondé sur un critère interdit','Une différence d’avis|Un choix d’ami|Un désaccord politique','Exemple : refuser un logement à cause de l’origine.'],['Que risque l’auteur d’une discrimination ?','Une condamnation : c’est un délit','Rien du tout|Une simple remarque|Un bon point','Elle peut être punie d’amende et de prison.'],['Qu’est-ce qu’un stéréotype ?','Une idée toute faite sur un groupe de personnes','Une loi|Un sport|Une fête','Exemple : « les filles ne sont pas faites pour la mécanique ».'],['Qu’est-ce que le racisme ?','L’idée fausse qu’il existe des groupes humains supérieurs à d’autres','Un sport collectif|Une religion|Une opinion comme une autre','Le racisme est un délit, pas une opinion.']],
  d:[['égalité','principe selon lequel tous ont les mêmes droits'],['parité','égalité du nombre de femmes et d’hommes'],['discrimination','traitement défavorable fondé sur un critère interdit par la loi'],['stéréotype','idée toute faite sur un groupe de personnes'],['racisme','idée fausse d’une hiérarchie entre groupes humains'],['inclusion','fait d’accueillir chacun avec ses différences']],
  t:[['Une discrimination peut être punie par la loi.',true,'C’est un délit.'],['L’égalité femmes-hommes est totalement atteinte en France.',false,'Des inégalités persistent, notamment de salaire.']]}),
hc('hg5l','E','La solidarité et ses échelles','🤲','Une collecte de jouets au collège, la carte Vitale, l’aide humanitaire après un séisme : la solidarité existe à toutes les échelles.',
 ['La solidarité, c’est l’entraide entre les membres d’une société ; elle est liée à la fraternité.','En France, la Sécurité sociale (1945) protège contre la maladie, la vieillesse, les accidents…','La solidarité s’exerce à toutes les échelles : famille, associations, État, Union européenne, monde.'],'Les impôts et les cotisations financent les services publics et l’aide aux plus fragiles.',
 {q:[['Qu’est-ce que la solidarité ?','L’entraide entre les membres d’une société','La compétition entre élèves|Le fait de vivre seul|Une taxe sur les voitures','Elle est liée à la fraternité.'],['En quelle année est créée la Sécurité sociale ?','1945','1789|1905|2000','Elle protège contre les risques de la vie.'],['Quel mot de la devise républicaine est lié à la solidarité ?','Fraternité','Liberté|Égalité|République','Liberté, Égalité, Fraternité.'],['Comment l’État finance-t-il la solidarité ?','Grâce aux impôts et aux cotisations','Grâce aux dons des pays voisins|Grâce aux amendes de stationnement|Il ne la finance pas','Chacun contribue selon ses moyens.'],['Laquelle est une association de solidarité ?','Les Restos du cœur','La SNCF|Le Sénat|La CNIL','Fondés en 1985 par Coluche.'],['Qu’est-ce qu’une ONG ?','Une organisation non gouvernementale','Un ministère|Une entreprise privée|Une armée','Exemple : Médecins sans frontières.']],
  d:[['solidarité','entraide entre les membres d’une société'],['fraternité','lien qui unit les citoyens comme des frères et sœurs'],['Sécurité sociale','système qui protège contre la maladie, la vieillesse, les accidents'],['ONG','organisation non gouvernementale'],['bénévole','personne qui aide sans être payée']],
  t:[['La solidarité ne concerne que la famille.',false,'Elle s’exerce à toutes les échelles.'],['La Sécurité sociale rembourse une partie des soins.',true,'C’est la solidarité nationale.']]})
],
'hg4':[
hc('hg4a','H','Commerce, traites et esclavage','⛓️','Le sucre de ton café a longtemps eu un prix terrible : celui de millions d’Africains réduits en esclavage.',
 ['Au XVIIIe siècle, les ports européens (Nantes, Bordeaux) s’enrichissent grâce au commerce atlantique.','Le commerce triangulaire : Europe → Afrique (marchandises) → Amériques (esclaves) → Europe (sucre, café, coton).','Environ 12 millions d’Africains ont été déportés ; l’esclavage est définitivement aboli en France en 1848.'],'Le Code noir (1685) fait de l’esclave un « bien meuble ».',
 {q:[['Quel port est le premier port négrier français au XVIIIe siècle ?','Nantes','Lyon|Strasbourg|Lille','Plus de 40 % des expéditions françaises en partent.'],['Combien d’Africains environ ont été déportés par la traite atlantique ?','Environ 12 millions','Environ 1 000|Environ 100 000|Environ 1 milliard','Du XVIe au XIXe siècle.'],['Quels produits les navires rapportent-ils des Amériques ?','Sucre, café, coton','Soie et épices de Chine|Charbon et acier|Blé et vin','Ils sont produits par les esclaves dans les plantations.'],['Qu’est-ce que le Code noir (1685) ?','Un texte qui réglemente l’esclavage','Une loi qui abolit l’esclavage|Une déclaration des droits|Un traité de paix','Il fait de l’esclave un bien appartenant à son maître.'],['En quelle année l’esclavage est-il définitivement aboli en France ?','1848','1789|1685|1905','Grâce notamment à Victor Schœlcher.'],['Quelle révolte d’esclaves mène à l’indépendance d’Haïti ?','La révolte de Saint-Domingue','La Fronde|La Commune|La révolte des Cipayes','Toussaint Louverture en est une figure ; Haïti est indépendant en 1804.']],
  d:[['traite','commerce des esclaves'],['commerce triangulaire','commerce entre l’Europe, l’Afrique et les Amériques'],['esclave','personne privée de liberté, propriété d’un maître'],['plantation','grande exploitation agricole où travaillent des esclaves'],['abolition','suppression d’une loi ou d’une pratique']],
  c:[[1685,'Code noir'],[1794,'Première abolition de l’esclavage'],[1802,'Rétablissement de l’esclavage par Bonaparte'],[1804,'Indépendance d’Haïti'],[1848,'Abolition définitive de l’esclavage']],
  t:[['La traite atlantique a enrichi des ports comme Nantes et Bordeaux.',true,'Les armateurs et négociants font fortune.'],['L’esclavage a été aboli dès 1685.',false,'1685 est la date du Code noir ; l’abolition définitive date de 1848.']]}),
hc('hg4b','H','L’Europe des Lumières','💡','Oser penser par soi-même : c’est la devise des Lumières, des philosophes qui allument la lumière de la raison dans l’Europe du XVIIIe siècle.',
 ['Au XVIIIe siècle, les philosophes des Lumières utilisent la raison pour critiquer l’absolutisme et l’intolérance.','Montesquieu défend la séparation des pouvoirs, Voltaire la tolérance, Rousseau la souveraineté du peuple.','L’Encyclopédie de Diderot et d’Alembert rassemble les savoirs de l’époque.'],'Les idées circulent dans les salons, les cafés et grâce aux livres imprimés.',
 {q:[['Quel philosophe défend la séparation des pouvoirs ?','Montesquieu','Voltaire|Rousseau|Diderot','Dans De l’esprit des lois (1748).'],['Quel philosophe combat l’intolérance religieuse ?','Voltaire','Montesquieu|Louis XIV|Colbert','Il défend Jean Calas, protestant injustement exécuté.'],['Qui dirige l’Encyclopédie ?','Diderot et d’Alembert','Voltaire et Rousseau|Louis XV et Louis XVI|Montesquieu et Colbert','Publiée de 1751 à 1772.'],['Que sont les Lumières ?','Un mouvement qui utilise la raison contre l’ignorance et l’absolutisme','Une invention électrique|Un style de peinture|Une religion','Il éclaire les esprits par le savoir.'],['Quelle idée défend Rousseau ?','La souveraineté du peuple','La monarchie absolue|Le pouvoir du pape|L’esclavage','Dans Du contrat social (1762).'],['Où les idées des Lumières circulent-elles ?','Dans les salons, les cafés et les livres','Uniquement dans les églises|À la télévision|Sur Internet','Les salons sont souvent tenus par des femmes.']],
  d:[['Lumières','mouvement intellectuel du XVIIIe siècle fondé sur la raison'],['philosophe','penseur qui réfléchit sur l’homme et la société'],['séparation des pouvoirs','partage des pouvoirs législatif, exécutif et judiciaire'],['tolérance','respect des opinions et des croyances des autres'],['absolutisme','régime où le roi détient tous les pouvoirs']],
  c:[[1748,'De l’esprit des lois de Montesquieu'],[1751,'Début de la publication de l’Encyclopédie'],[1762,'Du contrat social de Rousseau'],[1763,'Traité sur la tolérance de Voltaire']],
  t:[['Les philosophes des Lumières soutiennent la monarchie absolue.',false,'Ils la critiquent.'],['Les Lumières font confiance à la raison.',true,'Elles s’opposent aux superstitions.']]}),
hc('hg4c','H','La Révolution française et l’Empire','🇫🇷','En quelques années, la France abat la monarchie, proclame les droits de l’homme, exécute son roi… puis se donne un empereur !',
 ['14 juillet 1789 : prise de la Bastille ; 26 août 1789 : Déclaration des droits de l’homme et du citoyen.','1792 : proclamation de la République ; 1793 : exécution de Louis XVI.','1804 : Napoléon Bonaparte devient empereur et crée le Code civil ; 1815 : défaite de Waterloo.'],'Article 1 de la DDHC : « Les hommes naissent et demeurent libres et égaux en droits. »',
 {q:[['Que se passe-t-il le 14 juillet 1789 ?','La prise de la Bastille','L’exécution du roi|Le sacre de Napoléon|La bataille de Waterloo','C’est devenu la fête nationale.'],['Quand la Déclaration des droits de l’homme et du citoyen est-elle adoptée ?','Le 26 août 1789','Le 14 juillet 1789|Le 21 septembre 1792|Le 2 décembre 1804','Elle affirme la liberté et l’égalité des droits.'],['Quand la République est-elle proclamée ?','En 1792','En 1789|En 1804|En 1815','La royauté est abolie le 21 septembre 1792.'],['Que se passe-t-il le 21 janvier 1793 ?','Louis XVI est guillotiné','Napoléon est sacré|La Bastille tombe|Les états généraux se réunissent','Il a été jugé pour trahison.'],['En quelle année Napoléon devient-il empereur ?','1804','1789|1799|1815','Il est sacré à Notre-Dame le 2 décembre 1804.'],['Quel texte de 1804 organise encore une partie du droit français ?','Le Code civil','Le Code noir|L’Encyclopédie|L’édit de Nantes','Il garantit l’égalité devant la loi.'],['Quelle bataille marque la défaite finale de Napoléon ?','Waterloo','Austerlitz|Valmy|Bouvines','En 1815.']],
  d:[['Révolution','changement brutal et profond de régime politique'],['DDHC','Déclaration des droits de l’homme et du citoyen (1789)'],['monarchie constitutionnelle','régime où le pouvoir du roi est limité par une Constitution'],['République','régime politique sans roi, où le peuple est souverain'],['Code civil','recueil de lois sur les relations entre les personnes (1804)'],['souveraineté nationale','principe selon lequel le pouvoir appartient à la nation']],
  c:[[1789,'Prise de la Bastille'],[1792,'Proclamation de la République'],[1793,'Exécution de Louis XVI'],[1799,'Coup d’État de Bonaparte'],[1804,'Napoléon Ier, empereur'],[1815,'Défaite de Waterloo']],
  t:[['La nuit du 4 août 1789, les privilèges sont abolis.',true,'C’est la fin de la société d’ordres.'],['Napoléon rétablit la monarchie absolue.',false,'Il crée un Empire, mais garde certains acquis révolutionnaires.']]}),
hc('hg4d','H','La révolution industrielle','🏭','Fumée noire, machines à vapeur, trains qui filent à toute allure : au XIXe siècle, le monde change plus vite que jamais.',
 ['Au XIXe siècle, l’industrialisation transforme l’Europe : charbon, machine à vapeur, chemin de fer.','Elle commence au Royaume-Uni à la fin du XVIIIe siècle.','Naissent la classe ouvrière, aux conditions de vie très dures, et la bourgeoisie industrielle.'],'Karl Marx et Friedrich Engels publient le Manifeste du parti communiste en 1848.',
 {q:[['Dans quel pays commence la révolution industrielle ?','Au Royaume-Uni','En France|En Italie|En Chine','À la fin du XVIIIe siècle.'],['Quelle source d’énergie domine au XIXe siècle ?','Le charbon','Le pétrole|Le nucléaire|Le solaire','Il alimente les machines à vapeur.'],['Qui perfectionne la machine à vapeur ?','James Watt','Thomas Edison|Louis Pasteur|Gutenberg','À partir de 1769.'],['Comment vivent les ouvriers au XIXe siècle ?','Longues journées, bas salaires, logements insalubres','Ils travaillent peu et sont riches|Ils vivent sans travailler|Ils sont protégés par la Sécurité sociale','Les enfants travaillent aussi.'],['Qu’est-ce que l’exode rural ?','Le départ des habitants des campagnes vers les villes','Le départ des citadins vers la mer|La fin des usines|Le retour à la terre','Les usines attirent les paysans.'],['Quel moyen de transport révolutionne les échanges ?','Le chemin de fer','L’avion|La voiture électrique|Le cheval','Les voies ferrées se multiplient en Europe au XIXe siècle.']],
  d:[['industrialisation','développement des industries et des usines'],['ouvrier','personne qui travaille dans une usine contre un salaire'],['bourgeoisie','groupe social qui possède les entreprises et les capitaux'],['exode rural','départ des habitants des campagnes vers les villes'],['syndicat','association qui défend les intérêts des travailleurs'],['socialisme','courant politique qui veut améliorer le sort des ouvriers']],
  c:[[1769,'Machine à vapeur de James Watt'],[1830,'Ligne de chemin de fer Liverpool – Manchester'],[1848,'Manifeste du parti communiste'],[1884,'Les syndicats sont autorisés en France']],
  t:[['Des enfants travaillaient dans les usines au XIXe siècle.',true,'Des lois limitent peu à peu leur travail.'],['La révolution industrielle commence en Chine.',false,'Elle commence au Royaume-Uni.']]}),
hc('hg4e','H','Conquêtes et sociétés coloniales','🗺️','À la fin du XIXe siècle, quelques pays européens se partagent presque toute l’Afrique et une partie de l’Asie. Comment et pourquoi ?',
 ['Au XIXe siècle, les puissances européennes conquièrent de vastes territoires, surtout en Afrique et en Asie.','La France colonise l’Algérie dès 1830 et forme le deuxième empire colonial du monde.','Les sociétés coloniales sont inégalitaires : les colonisés ont moins de droits (Code de l’indigénat).'],'La conférence de Berlin (1884-1885) organise le partage de l’Afrique entre Européens.',
 {q:[['En quelle année commence la conquête de l’Algérie ?','1830','1789|1914|1962','Elle dure plusieurs décennies.'],['Quel pays possède le plus grand empire colonial ?','Le Royaume-Uni','La France|L’Allemagne|La Belgique','La France a le deuxième.'],['Qu’organise la conférence de Berlin (1884-1885) ?','Le partage de l’Afrique entre Européens','La fin de la colonisation|L’abolition de l’esclavage|La création de l’ONU','Les Africains n’y sont pas invités.'],['Qu’est-ce que le Code de l’indigénat ?','Un ensemble de règles qui privent les colonisés de droits','Une loi qui protège les colonisés|Un traité de paix|Une constitution','Les colonisés ne sont pas des citoyens égaux.'],['Comment les colonisateurs justifient-ils la colonisation ?','En prétendant apporter la « civilisation »','En voulant libérer les peuples|En respectant les cultures locales|En demandant l’avis des colonisés','Ce discours masque une domination économique et politique.'],['Dans le contexte colonial, qu’est-ce que la métropole ?','Le pays colonisateur','La colonie elle-même|Une grande ville africaine|Un port','La France est la métropole de ses colonies.']],
  d:[['colonie','territoire dominé et exploité par un pays étranger'],['colonisation','conquête et domination d’un territoire par un autre pays'],['empire colonial','ensemble des colonies d’un pays'],['indigène','nom donné aux populations colonisées'],['métropole','le pays colonisateur, par rapport à ses colonies']],
  c:[[1830,'Début de la conquête de l’Algérie'],[1885,'Fin de la conférence de Berlin'],[1931,'Exposition coloniale à Paris']],
  t:[['Les colonisés avaient les mêmes droits que les Européens.',false,'Ils étaient soumis à des règles discriminatoires.'],['À la fin du XIXe siècle, l’Afrique est presque entièrement colonisée.',true,'Seuls l’Éthiopie et le Liberia restent indépendants.']]}),
hc('hg4f','H','Voter, de 1815 à la IIIe République','🗳️','Pendant longtemps, seuls les hommes riches votaient. Comment la France a-t-elle conquis le suffrage universel… et installé la République ?',
 ['De 1815 à 1848, le suffrage est censitaire ; en 1848, le suffrage universel masculin est instauré.','La IIIe République, proclamée en 1870, s’installe durablement et diffuse ses valeurs.','Les lois Ferry (1881-1882) rendent l’école gratuite, obligatoire et laïque ; la loi de 1905 sépare les Églises et l’État.'],'La Marseillaise devient l’hymne national en 1879 et le 14 juillet la fête nationale en 1880.',
 {q:[['Qu’est-ce que le suffrage censitaire ?','Seuls les hommes qui paient assez d’impôts votent','Tous les citoyens votent|Seules les femmes votent|Personne ne vote','Il est en place de 1815 à 1848.'],['En quelle année le suffrage universel masculin est-il instauré ?','1848','1789|1870|1944','Tous les hommes de plus de 21 ans votent.'],['Que rendent les lois Ferry (1881-1882) ?','L’école gratuite, obligatoire et laïque','Le vote obligatoire|Le service militaire facultatif|La religion obligatoire','Pour les enfants de 6 à 13 ans.'],['Quand la IIIe République est-elle proclamée ?','En 1870','En 1848|En 1792|En 1958','Le 4 septembre 1870, après la défaite de Sedan.'],['Quelle loi sépare les Églises et l’État ?','La loi de 1905','Les lois Ferry|La loi Waldeck-Rousseau|Le Code civil','L’État devient laïque.'],['Quel symbole de la République est adopté en 1879 ?','La Marseillaise comme hymne national','Le drapeau blanc|La fleur de lys|L’aigle impérial','Elle avait été composée en 1792.']],
  d:[['suffrage censitaire','vote réservé aux hommes qui paient un certain impôt'],['suffrage universel','droit de vote accordé à tous les citoyens adultes'],['République','régime où le pouvoir est exercé par des représentants élus'],['laïcité','séparation des religions et de l’État'],['instruction obligatoire','obligation pour les enfants d’aller à l’école']],
  c:[[1848,'Suffrage universel masculin'],[1870,'Proclamation de la IIIe République'],[1881,'École gratuite (lois Ferry)'],[1905,'Séparation des Églises et de l’État']],
  t:[['En 1848, les femmes obtiennent le droit de vote.',false,'Seulement les hommes ; les femmes votent à partir de 1944-1945.'],['L’école publique est laïque depuis les lois Ferry.',true,'Loi de 1882.']]}),
hc('hg4g','H','Conditions féminines au XIXe siècle','👩','Au XIXe siècle, une femme mariée ne peut ni voter, ni ouvrir un compte, ni choisir seule son métier. Certaines vont se battre pour changer ça.',
 ['Au XIXe siècle, les femmes sont juridiquement inférieures : le Code civil (1804) les soumet à leur mari.','Ouvrières, paysannes, domestiques : beaucoup de femmes travaillent, pour des salaires plus faibles.','Des femmes luttent pour leurs droits : Louise Michel, Hubertine Auclert ; Marie Curie reçoit deux prix Nobel.'],'Les lois Ferry ouvrent l’école aux filles et la loi Camille Sée (1880) crée des lycées de jeunes filles.',
 {q:[['Selon le Code civil de 1804, la femme mariée doit…','Obéissance à son mari','Diriger la famille|Voter|Choisir seule son métier','Elle est considérée comme une mineure juridique.'],['Qui est Marie Curie ?','Une scientifique, deux fois prix Nobel','Une reine de France|Une philosophe des Lumières|Une impératrice','Prix Nobel de physique (1903) et de chimie (1911).'],['Qu’est-ce qu’une suffragiste ?','Une femme qui réclame le droit de vote','Une femme qui refuse de voter|Une ouvrière du textile|Une religieuse','Hubertine Auclert en est une figure.'],['Quelle militante participe à la Commune de Paris (1871) ?','Louise Michel','Marie-Antoinette|Jeanne d’Arc|George Sand','Elle est déportée en Nouvelle-Calédonie.'],['Les ouvrières sont-elles payées comme les hommes ?','Non, beaucoup moins','Oui, exactement pareil|Plus que les hommes|Elles ne sont pas payées du tout','Parfois deux fois moins.'],['Que crée la loi Camille Sée (1880) ?','Les lycées de jeunes filles','Le droit de vote des femmes|Le divorce|Les congés payés','L’instruction des filles progresse.']],
  d:[['féminisme','combat pour l’égalité des droits entre femmes et hommes'],['suffragiste','militante pour le droit de vote des femmes'],['mineure juridique','personne qui ne peut pas agir seule devant la loi'],['domestique','personne employée au service d’une famille']],
  c:[[1804,'Code civil'],[1871,'Louise Michel dans la Commune de Paris'],[1880,'Loi Camille Sée sur les lycées de jeunes filles'],[1903,'Premier prix Nobel de Marie Curie']],
  t:[['Au XIXe siècle, les femmes ont les mêmes droits que les hommes.',false,'Elles sont juridiquement inférieures.'],['Beaucoup de femmes travaillent au XIXe siècle.',true,'Dans les champs, les usines et comme domestiques.']]}),
hc('hg4h','G','L’urbanisation du monde','🌆','Chaque semaine, la population urbaine mondiale augmente d’environ 1,5 million de personnes. Bienvenue dans un monde de villes !',
 ['Plus de la moitié de la population mondiale est urbaine, et cette part augmente.','Les villes s’étalent et se multiplient, surtout en Asie et en Afrique.','Les villes sont inégalement connectées à la mondialisation : les villes mondiales (New York, Londres, Tokyo, Paris) dominent.'],'En 2050, environ deux humains sur trois vivront en ville selon l’ONU.',
 {q:[['Quelle part de la population mondiale vit en ville ?','Plus de la moitié','Un quart|Un dixième|Presque tout le monde','Environ 57 % aujourd’hui.'],['Où l’urbanisation est-elle la plus rapide ?','En Afrique et en Asie','En Europe|En Amérique du Nord|En Antarctique','Les villes y grandissent très vite.'],['Qu’est-ce qu’une ville mondiale ?','Une métropole qui commande l’économie mondiale','Une ville de plus de 1 000 habitants|La capitale d’un petit pays|Une ville sans habitants','Exemples : New York, Londres, Tokyo, Paris.'],['Qu’est-ce qu’un bidonville ?','Un quartier d’habitations précaires','Un quartier d’affaires|Un parc urbain|Une ville nouvelle','Environ un milliard de personnes y vivent.'],['Qu’est-ce qu’une mégapole ?','Une ville de plus de 10 millions d’habitants','Une ville de 10 000 habitants|Un village de montagne|Un port de pêche','Exemples : Lagos, Mumbai, São Paulo.'],['Qu’est-ce que la périurbanisation ?','L’urbanisation des espaces ruraux autour des villes','La destruction des banlieues|La construction de tours en centre-ville|Le retour à la campagne sans ville','Elle augmente les trajets en voiture.']],
  d:[['urbanisation','augmentation de la part de population vivant en ville'],['mégapole','ville de plus de 10 millions d’habitants'],['ville mondiale','métropole qui exerce des fonctions de commandement à l’échelle mondiale'],['périurbanisation','urbanisation des espaces ruraux autour des villes'],['mondialisation','mise en relation des différentes parties du monde par les échanges']],
  t:[['La population urbaine mondiale diminue.',false,'Elle augmente.'],['Les villes ne sont pas toutes connectées de la même façon à la mondialisation.',true,'Il existe une hiérarchie urbaine.']]}),
hc('hg4i','G','Les mobilités humaines','✈️','Partir étudier à l’étranger, fuir une guerre, passer ses vacances à l’autre bout du monde : jamais les humains n’ont autant bougé.',
 ['Environ 300 millions de personnes vivent hors de leur pays de naissance : ce sont des migrants internationaux.','On migre pour travailler, étudier, rejoindre sa famille, fuir une guerre ou une catastrophe.','Le tourisme international concerne plus d’un milliard de voyageurs par an ; la France est le pays le plus visité au monde.'],'Un réfugié est une personne qui fuit des persécutions et reçoit la protection d’un autre pays.',
 {q:[['Combien de migrants internationaux y a-t-il dans le monde ?','Environ 300 millions','Environ 3 000|Environ 3 milliards|Aucun','Soit moins de 4 % de l’humanité.'],['Qu’est-ce qu’un réfugié ?','Une personne qui fuit des persécutions ou une guerre','Un touriste|Un étudiant Erasmus|Un retraité au soleil','Il est protégé par la convention de Genève (1951).'],['Quel est le pays le plus visité au monde ?','La France','Les États-Unis|La Chine|Le Brésil','Environ 100 millions de touristes étrangers par an.'],['Pourquoi la plupart des migrants quittent-ils leur pays ?','Pour trouver du travail et de meilleures conditions de vie','Pour faire du tourisme|Par obligation scolaire|Pour le climat seulement','On parle de migrations économiques.'],['Qu’est-ce qu’un transfert de fonds ?','L’argent envoyé par un migrant à sa famille restée au pays','Un billet d’avion|Une taxe touristique|Une amende','Ces sommes sont très importantes pour certains pays.'],['Qu’est-ce que le tourisme ?','Un déplacement temporaire pour les loisirs, hors de chez soi','Un déménagement définitif|Un trajet domicile-travail|Une migration forcée','Il dure au moins une nuit hors de son domicile.']],
  d:[['migrant','personne qui vit dans un autre pays que son pays de naissance'],['réfugié','personne qui fuit des persécutions et obtient la protection d’un autre pays'],['mobilité','déplacement de personnes d’un lieu à un autre'],['tourisme','déplacement temporaire pour les loisirs'],['pays d’accueil','pays où s’installe un migrant']],
  t:[['Toutes les migrations vont des pays pauvres vers les pays riches.',false,'Beaucoup ont lieu entre pays voisins du Sud.'],['Le tourisme crée de nombreux emplois.',true,'Mais il peut aussi abîmer l’environnement.']]}),
hc('hg4j','G','Des espaces transformés par la mondialisation','🚢','Ton t-shirt a peut-être fait 20 000 km en bateau avant d’arriver chez toi ! Les mers, les ports et les grands pays s’adaptent à la mondialisation.',
 ['Les mers et les océans sont les routes de la mondialisation : environ 80 % des marchandises voyagent par bateau.','Les États-Unis, première puissance mondiale, adaptent leur territoire : façades maritimes, métropoles, Sun Belt.','Un grand ensemble africain, comme l’Afrique de l’Ouest, s’intègre inégalement à la mondialisation.'],'Le conteneur, inventé en 1956, a révolutionné le transport maritime.',
 {q:[['Quelle part des marchandises voyage par voie maritime ?','Environ 80 %','Environ 5 %|Environ 25 %|100 %','Le transport maritime est peu cher.'],['Qu’est-ce qu’un conteneur ?','Une grande caisse métallique standard pour transporter des marchandises','Un navire de croisière|Un port pétrolier|Un avion-cargo','Il facilite le chargement et le déchargement.'],['Qu’est-ce que la Sun Belt aux États-Unis ?','Les États dynamiques du Sud et de l’Ouest','La région des Grands Lacs|Le désert du Nevada uniquement|L’Alaska','Californie, Texas, Floride…'],['Quel canal relie la mer Méditerranée à la mer Rouge ?','Le canal de Suez','Le canal de Panama|Le canal du Midi|Le canal de Corinthe','Ouvert en 1869.'],['Qu’est-ce qu’une ZEE ?','Une zone maritime où un État exploite les ressources','Une zone de libre-échange|Un parc d’attractions|Une région désertique','Zone économique exclusive, jusqu’à 200 milles nautiques des côtes.'],['Quel océan relie l’Europe à l’Amérique du Nord ?','L’océan Atlantique','L’océan Pacifique|L’océan Indien|L’océan Arctique','C’est une grande route commerciale.']],
  d:[['mondialisation','mise en relation des différentes parties du monde par les échanges'],['conteneur','caisse métallique standard pour le transport des marchandises'],['façade maritime','littoral qui concentre de grands ports ouverts sur le monde'],['ZEE','zone maritime où un État exploite seul les ressources'],['interface','zone de contact entre deux espaces qui favorise les échanges']],
  t:[['Les mers jouent un petit rôle dans la mondialisation.',false,'Environ 80 % des marchandises y circulent.'],['Les États-Unis sont la première puissance économique mondiale.',true,'Avec un territoire tourné vers le Pacifique et l’Atlantique.']]}),
hc('hg4k','E','L’État de droit et les libertés','🗽','Peut-on tout dire ? Tout faire ? Être arrêté sans raison ? Dans un État de droit, la loi protège tes libertés… et fixe leurs limites.',
 ['Dans un État de droit, tout le monde, y compris l’État, doit respecter la loi.','Les libertés fondamentales (expression, réunion, conscience…) sont garanties mais encadrées par la loi.','La justice est rendue par des juges indépendants ; tout accusé a droit à un procès équitable et est présumé innocent.'],'Article 4 de la DDHC : la liberté consiste à pouvoir faire tout ce qui ne nuit pas à autrui.',
 {q:[['Qu’est-ce qu’un État de droit ?','Un État où tous, y compris les dirigeants, respectent la loi','Un État sans lois|Un État dirigé par un roi absolu|Un État où la police décide de tout','Les droits de chacun y sont garantis.'],['Selon la DDHC, la liberté consiste à…','Pouvoir faire tout ce qui ne nuit pas à autrui','Faire tout ce qu’on veut|Obéir sans réfléchir|Ne jamais parler','Article 4 (1789).'],['La liberté d’expression a-t-elle des limites ?','Oui, la loi interdit l’injure, la diffamation, l’incitation à la haine','Non, on peut tout dire|Oui, mais seulement à l’école|Il est interdit de critiquer le gouvernement','Ces limites protègent les autres.'],['Qu’est-ce que la présomption d’innocence ?','Toute personne est innocente tant que sa culpabilité n’est pas prouvée','Tout suspect est coupable|Seuls les enfants sont innocents|Un juge peut condamner sans preuve','Principe fondamental de la justice.'],['À partir de quel âge un mineur peut-il être condamné à une peine en France ?','13 ans','5 ans|10 ans|21 ans','Avant 13 ans, il est présumé sans discernement : on privilégie les mesures éducatives.'],['Qui rend la justice ?','Des juges indépendants','Le président de la République|Les policiers|Les victimes','L’indépendance de la justice est essentielle.']],
  d:[['État de droit','État où chacun, y compris le pouvoir, est soumis au droit'],['liberté fondamentale','liberté essentielle garantie par la Constitution'],['présomption d’innocence','principe selon lequel on est innocent tant que la culpabilité n’est pas prouvée'],['diffamation','accusation qui porte atteinte à l’honneur d’une personne'],['procès équitable','procès où chacun peut se défendre devant un juge impartial']],
  t:[['Dans un État de droit, les dirigeants sont au-dessus des lois.',false,'Ils doivent eux aussi respecter la loi.'],['Toute personne accusée a droit à un avocat.',true,'C’est une garantie du procès équitable.']]}),
hc('hg4l','E','Sécurité et défense nationale','🛡️','Qui protège le pays ? Les soldats, mais aussi les policiers, les gendarmes… et toi, un jour, lors de ta Journée défense et citoyenneté.',
 ['La défense nationale protège le territoire, la population et les intérêts de la France.','Les forces armées : armée de Terre, Marine nationale, armée de l’Air et de l’Espace. Le président de la République est le chef des armées.','Le service militaire n’est plus obligatoire depuis 1997, mais la Journée défense et citoyenneté (JDC) l’est.'],'Policiers et gendarmes assurent la sécurité intérieure ; l’armée intervient aussi à l’étranger.',
 {q:[['Qui est le chef des armées en France ?','Le président de la République','Le Premier ministre|Le maire|Le chef d’état-major','Article 15 de la Constitution.'],['Quelle journée est obligatoire pour tous les jeunes Français ?','La Journée défense et citoyenneté (JDC)','Le service militaire de 10 mois|La fête nationale|Le baccalauréat','Elle remplace l’ancien service militaire obligatoire.'],['Depuis quand le service militaire n’est-il plus obligatoire ?','1997','1945|1981|2015','Il est suspendu par une loi de 1997.'],['Qui assure la sécurité dans les villes ?','La police nationale','La Marine nationale|L’armée de l’Air|Les pompiers uniquement','La gendarmerie s’occupe surtout des zones rurales.'],['Quelle alliance militaire la France fonde-t-elle avec d’autres pays en 1949 ?','L’OTAN','L’ONU|L’UNESCO|Le G7','Alliance avec les États-Unis et des pays européens.'],['Qu’est-ce que la dissuasion nucléaire ?','Posséder l’arme nucléaire pour décourager toute attaque','Attaquer en premier|Interdire le nucléaire civil|Une alliance commerciale','La France possède l’arme nucléaire depuis 1960.']],
  d:[['défense nationale','ensemble des moyens pour protéger un pays et sa population'],['OTAN','alliance militaire entre pays d’Europe et d’Amérique du Nord'],['JDC','Journée défense et citoyenneté, obligatoire pour les jeunes'],['dissuasion','fait de décourager une attaque par la menace d’une riposte'],['sécurité intérieure','protection des personnes et des biens sur le territoire']],
  t:[['Le service militaire est encore obligatoire en France.',false,'Il est suspendu depuis 1997.'],['L’armée française peut intervenir à l’étranger.',true,'Par exemple dans des opérations de maintien de la paix.']]})
],
'hg3':[
hc('hg3a','H','La Première Guerre mondiale','🎖️','Des millions d’hommes enterrés dans la boue des tranchées pendant quatre ans : la Grande Guerre invente la guerre totale.',
 ['1914-1918 : une guerre totale qui mobilise soldats, civils et économies.','Guerre des tranchées (Verdun, 1916) ; génocide des Arméniens par l’Empire ottoman (1915).','11 novembre 1918 : armistice ; 1919 : traité de Versailles.'],'Environ 10 millions de soldats meurent pendant la Première Guerre mondiale.',
 {q:[['En quelle année commence la Première Guerre mondiale ?','1914','1918|1939|1870','L’Autriche-Hongrie déclare la guerre à la Serbie le 28 juillet 1914.'],['Quelle bataille de 1916 symbolise l’enfer des tranchées pour les Français ?','Verdun','Waterloo|Stalingrad|Alésia','Elle dure environ 300 jours.'],['Que se passe-t-il le 11 novembre 1918 ?','L’armistice est signé','La guerre commence|Le traité de Versailles est signé|La France capitule','Les combats cessent.'],['Quel traité est imposé à l’Allemagne en 1919 ?','Le traité de Versailles','Le traité de Rome|L’édit de Nantes|Les accords de Munich','Il impose de lourdes réparations à l’Allemagne.'],['Qu’est-ce qu’une guerre totale ?','Une guerre qui mobilise toutes les ressources d’un pays','Une guerre très courte|Une guerre sans armes|Une guerre entre deux villes','Soldats, civils, industrie, propagande.'],['Quel peuple est victime d’un génocide en 1915 ?','Les Arméniens','Les Français|Les Anglais|Les Américains','Perpétré par l’Empire ottoman.'],['Comment surnomme-t-on les soldats français de 14-18 ?','Les poilus','Les grognards|Les sans-culottes|Les marsouins','Ils vivent dans les tranchées.']],
  d:[['guerre totale','guerre qui mobilise toutes les forces d’un pays'],['tranchée','fossé creusé pour protéger les soldats'],['armistice','arrêt des combats'],['génocide','extermination volontaire et organisée d’un peuple'],['poilu','surnom du soldat français de 14-18']],
  c:[[1914,'Début de la Première Guerre mondiale'],[1915,'Génocide des Arméniens'],[1916,'Bataille de Verdun'],[1917,'Entrée en guerre des États-Unis'],[1918,'Armistice du 11 novembre'],[1919,'Traité de Versailles']],
  t:[['Les civils ont aussi été touchés par la Grande Guerre.',true,'Bombardements, occupation, travail dans les usines.'],['La guerre de 14-18 a duré quelques semaines.',false,'Elle a duré plus de quatre ans.']]}),
hc('hg3b','H','Démocraties fragilisées et totalitarismes','✊','Après la guerre et la crise de 1929, des dictateurs prennent le pouvoir et veulent contrôler jusqu’aux pensées des gens.',
 ['Après 1918 et la crise de 1929, les démocraties sont fragilisées.','Des régimes totalitaires s’installent : l’URSS de Staline, l’Allemagne nazie de Hitler (au pouvoir en 1933).','En France, le Front populaire (1936) défend la démocratie : congés payés, semaine de 40 heures.'],'Un régime totalitaire contrôle toute la société : parti unique, propagande, terreur, culte du chef.',
 {q:[['Quel krach boursier déclenche une grave crise en 1929 ?','Le krach de Wall Street','Le krach de Paris|La faillite de Rome|La crise de Versailles','À New York, en octobre 1929.'],['Quand Hitler arrive-t-il au pouvoir ?','1933','1918|1929|1945','Il devient chancelier en janvier 1933.'],['Qui dirige l’URSS à partir de la fin des années 1920 ?','Staline','Lénine|Hitler|Mussolini','Il impose un régime de terreur (goulag).'],['Qu’obtient le Front populaire en 1936 ?','Les congés payés et la semaine de 40 heures','Le droit de vote des femmes|La fin de l’esclavage|La Sécurité sociale','Deux semaines de congés payés.'],['Qu’est-ce qu’un régime totalitaire ?','Un régime qui contrôle toute la société et les esprits','Une démocratie avec plusieurs partis|Une monarchie constitutionnelle|Une république fédérale','Parti unique, propagande, terreur, culte du chef.'],['Que sont les camps du goulag ?','Des camps de travail forcé en URSS','Des camps de vacances|Des usines automobiles|Des camps militaires français','Des millions de personnes y meurent.']],
  d:[['totalitarisme','régime qui contrôle tous les aspects de la vie'],['propagande','diffusion d’idées pour manipuler l’opinion'],['parti unique','seul parti politique autorisé'],['antisémitisme','haine des Juifs'],['Front populaire','alliance des partis de gauche au pouvoir en 1936'],['goulag','système de camps de travail forcé en URSS']],
  c:[[1917,'Révolution russe'],[1929,'Krach de Wall Street'],[1933,'Hitler au pouvoir'],[1935,'Lois antisémites de Nuremberg'],[1936,'Front populaire en France']],
  t:[['L’Allemagne nazie était une démocratie.',false,'C’était un régime totalitaire.'],['Le Front populaire a créé les congés payés.',true,'En 1936.']]}),
hc('hg3c','H','La Seconde Guerre mondiale','💣','La guerre la plus meurtrière de l’histoire : environ 60 millions de morts, des génocides, et la première bombe atomique.',
 ['1939-1945 : une guerre mondiale d’anéantissement, en Europe comme dans le Pacifique.','Les nazis organisent la Shoah, le génocide des Juifs (environ 6 millions de morts), et celui des Tsiganes.','8 mai 1945 : capitulation allemande ; août 1945 : bombes atomiques sur Hiroshima et Nagasaki, puis capitulation du Japon.'],'La majorité des quelque 60 millions de morts sont des civils.',
 {q:[['Quand commence la Seconde Guerre mondiale ?','1939','1914|1941|1945','L’Allemagne envahit la Pologne le 1er septembre 1939.'],['Qu’est-ce que la Shoah ?','Le génocide des Juifs par les nazis','Une bataille navale|Un traité de paix|Une ville allemande','Environ 6 millions de victimes.'],['Quel est le plus grand centre de mise à mort nazi ?','Auschwitz-Birkenau','Verdun|Versailles|Nuremberg','Plus d’un million de personnes y sont assassinées.'],['Quelle bataille marque un tournant à l’Est en 1942-1943 ?','Stalingrad','Waterloo|Verdun|Marignan','Défaite allemande face à l’Armée rouge.'],['Que se passe-t-il le 6 juin 1944 ?','Le débarquement allié en Normandie','La capitulation allemande|La bombe d’Hiroshima|L’attaque de Pearl Harbor','C’est le « D-Day ».'],['Quand l’Allemagne capitule-t-elle ?','Le 8 mai 1945','Le 11 novembre 1918|Le 6 juin 1944|Le 2 septembre 1945','La guerre continue contre le Japon jusqu’en septembre.'],['Sur quelle ville la première bombe atomique est-elle lancée ?','Hiroshima','Tokyo|Berlin|Pearl Harbor','Le 6 août 1945.']],
  d:[['guerre d’anéantissement','guerre qui vise à détruire totalement l’ennemi'],['Shoah','génocide des Juifs d’Europe par les nazis'],['centre de mise à mort','camp où les nazis assassinaient les déportés dès leur arrivée'],['Alliés','pays qui combattent l’Allemagne nazie (Royaume-Uni, URSS, États-Unis…)'],['capitulation','reddition sans condition']],
  c:[[1939,'Invasion de la Pologne'],[1941,'Attaque de Pearl Harbor'],[1943,'Victoire soviétique à Stalingrad'],[1944,'Débarquement en Normandie'],[1945,'Capitulation de l’Allemagne']],
  t:[['La majorité des morts de la Seconde Guerre mondiale sont des civils.',true,'Bombardements, massacres, génocides.'],['Les États-Unis restent neutres pendant toute la guerre.',false,'Ils entrent en guerre en décembre 1941.']]}),
hc('hg3d','H','La France défaite et occupée','🕯️','Juin 1940 : en six semaines, la France s’effondre. Certains collaborent avec les nazis, d’autres risquent leur vie pour résister.',
 ['Juin 1940 : défaite française ; le maréchal Pétain signe l’armistice et dirige le régime de Vichy.','Vichy collabore avec l’Allemagne nazie et participe à la persécution des Juifs (rafle du Vel d’Hiv, juillet 1942).','Le général de Gaulle lance l’appel du 18 juin 1940 ; la Résistance s’organise, unifiée par Jean Moulin.'],'Vichy remplace la devise « Liberté, Égalité, Fraternité » par « Travail, Famille, Patrie ».',
 {q:[['Qui lance un appel à résister le 18 juin 1940 ?','Le général de Gaulle','Le maréchal Pétain|Jean Moulin|Hitler','Depuis Londres, à la radio de la BBC.'],['Qui dirige le régime de Vichy ?','Le maréchal Pétain','Le général de Gaulle|Léon Blum|Jean Moulin','Il obtient les pleins pouvoirs le 10 juillet 1940.'],['Qu’est-ce que la collaboration ?','La coopération avec l’occupant nazi','La résistance à l’occupant|La neutralité|L’alliance avec le Royaume-Uni','Pétain l’annonce en octobre 1940.'],['Qu’est-ce que la rafle du Vel d’Hiv (juillet 1942) ?','L’arrestation de plus de 13 000 Juifs à Paris par la police française','Une course cycliste|Une victoire de la Résistance|Un bombardement allié','Ils sont ensuite déportés vers Auschwitz.'],['Qui unifie la Résistance intérieure ?','Jean Moulin','Pétain|Laval|Napoléon','Il crée le Conseil national de la Résistance (CNR) en 1943.'],['Quelle est la devise du régime de Vichy ?','Travail, Famille, Patrie','Liberté, Égalité, Fraternité|Unité, Progrès, Justice|Honneur et Patrie','Elle rejette les valeurs républicaines.']],
  d:[['régime de Vichy','régime autoritaire du maréchal Pétain (1940-1944)'],['collaboration','politique de coopération avec l’Allemagne nazie'],['Résistance','lutte contre l’occupant et le régime de Vichy'],['rafle','arrestation massive de personnes'],['France libre','mouvement de résistance créé par de Gaulle à Londres']],
  c:[[1940,'Appel du 18 juin'],[1942,'Rafle du Vel d’Hiv'],[1943,'Création du Conseil national de la Résistance'],[1944,'Libération de Paris']],
  t:[['Le régime de Vichy a participé à la déportation des Juifs.',true,'La police française a organisé des rafles.'],['Paris est libéré dès 1941.',false,'Paris est libéré en août 1944.']]}),
hc('hg3e','H','Indépendances et nouveaux États','🕊️','Après 1945, des dizaines de peuples colonisés réclament leur liberté. Certains l’obtiennent par la négociation, d’autres par la guerre.',
 ['Après 1945, les colonies deviennent indépendantes : c’est la décolonisation.','L’Inde devient indépendante en 1947, avec Gandhi et la non-violence ; l’Algérie en 1962, après une guerre de 1954 à 1962.','Les nouveaux États, réunis à Bandung (1955), forment le « tiers-monde » et cherchent à se développer.'],'1960 est appelée « l’année de l’Afrique » : 17 pays africains deviennent indépendants.',
 {q:[['En quelle année l’Inde devient-elle indépendante ?','1947','1914|1962|1989','Gandhi prône la non-violence.'],['En quelle année l’Algérie devient-elle indépendante ?','1962','1830|1945|1954','Après huit ans de guerre.'],['Qu’est-ce que la décolonisation ?','Le processus par lequel les colonies deviennent indépendantes','La conquête de nouvelles colonies|La guerre froide|La construction européenne','Elle a lieu surtout entre 1945 et 1975.'],['Qui est Gandhi ?','Le leader de l’indépendance indienne, par la non-violence','Un empereur colonial|Le président algérien|Un général britannique','Il est assassiné en 1948.'],['Que réunit la conférence de Bandung (1955) ?','Des pays d’Asie et d’Afrique contre le colonialisme','Les pays européens|Les États-Unis et l’URSS|Les pays de l’OTAN','Elle marque l’émergence du tiers-monde.'],['Quand commence la guerre d’Algérie ?','1954','1945|1962|1830','Le 1er novembre 1954.']],
  d:[['décolonisation','processus d’accès à l’indépendance des colonies'],['indépendance','situation d’un État libre, qui se gouverne lui-même'],['tiers-monde','ensemble des pays pauvres, souvent anciennement colonisés'],['non-violence','méthode de lutte sans armes'],['non-alignement','refus de choisir entre les États-Unis et l’URSS']],
  c:[[1947,'Indépendance de l’Inde'],[1954,'Début de la guerre d’Algérie'],[1955,'Conférence de Bandung'],[1960,'Indépendance de nombreux pays d’Afrique'],[1962,'Indépendance de l’Algérie']],
  t:[['Toutes les décolonisations se sont faites sans violence.',false,'La guerre d’Algérie a duré huit ans.'],['1960 est appelée « l’année de l’Afrique ».',true,'Dix-sept pays africains deviennent indépendants.']]}),
hc('hg3f','H','La guerre froide','🧊','Deux superpuissances, des milliers de bombes atomiques, un mur au milieu d’une ville… et pourtant, jamais de guerre directe entre elles.',
 ['De 1947 à 1991, les États-Unis (capitalisme) et l’URSS (communisme) s’affrontent sans guerre directe.','Berlin, ville divisée : blocus (1948-1949), mur construit en 1961, ouvert le 9 novembre 1989.','La crise de Cuba (1962) fait frôler la guerre nucléaire ; l’URSS disparaît en 1991.'],'La course aux armements et à l’espace oppose les deux Grands : Spoutnik en 1957, premiers pas sur la Lune en 1969.',
 {q:[['Quels pays s’opposent pendant la guerre froide ?','Les États-Unis et l’URSS','La France et l’Allemagne|Le Japon et la Chine|Le Royaume-Uni et l’Inde','Deux superpuissances, deux modèles.'],['Quand le mur de Berlin est-il construit ?','1961','1945|1989|1991','Pour empêcher les Allemands de l’Est de fuir.'],['Quand le mur de Berlin tombe-t-il ?','1989','1961|1991|1945','Le 9 novembre 1989.'],['Qu’est-ce que la crise de Cuba (1962) ?','Une crise causée par l’installation de missiles soviétiques à Cuba','Une guerre entre Cuba et l’Espagne|Un ouragan|Un traité de paix','Le monde frôle la guerre nucléaire.'],['Quand l’URSS disparaît-elle ?','1991','1945|1962|1989','Elle éclate en 15 États.'],['Pourquoi parle-t-on de guerre « froide » ?','Les deux Grands ne s’affrontent pas directement','Elle se déroule en hiver|Elle a lieu en Antarctique|Il n’y a aucune tension','Il y a cependant des conflits indirects (Corée, Vietnam).']],
  d:[['guerre froide','opposition entre les États-Unis et l’URSS (1947-1991) sans affrontement direct'],['bloc','ensemble de pays alliés à une superpuissance'],['rideau de fer','frontière qui sépare l’Europe de l’Ouest et l’Europe de l’Est'],['communisme','système politique et économique fondé sur la propriété collective'],['dissuasion nucléaire','menace d’utiliser l’arme nucléaire pour empêcher une attaque']],
  c:[[1947,'Début de la guerre froide'],[1948,'Blocus de Berlin'],[1961,'Construction du mur de Berlin'],[1962,'Crise de Cuba'],[1989,'Chute du mur de Berlin'],[1991,'Disparition de l’URSS']],
  t:[['Pendant la guerre froide, l’Allemagne est divisée en deux États.',true,'La RFA à l’Ouest, la RDA à l’Est.'],['Les États-Unis et l’URSS se sont fait la guerre directement.',false,'Ils s’affrontent de façon indirecte.']]}),
hc('hg3g','H','L’Europe et le monde depuis 1945','🇪🇺','Hier ennemis, aujourd’hui partenaires : les pays d’Europe construisent une union unique au monde… dans un monde qui reste instable.',
 ['1950 : déclaration Schuman ; 1957 : traité de Rome, six pays fondent la CEE.','1992 : traité de Maastricht, création de l’Union européenne ; 2002 : l’euro en pièces et billets.','Après 1989 : fin de la guerre froide, mais de nouveaux conflits (attentats du 11 septembre 2001, guerre en Ukraine depuis 2022).'],'Le Royaume-Uni a quitté l’UE en 2020 (Brexit) ; l’UE compte 27 pays.',
 {q:[['Quel traité crée la CEE en 1957 ?','Le traité de Rome','Le traité de Versailles|Le traité de Maastricht|Le traité de Lisbonne','Six pays fondateurs, dont la France.'],['Quel traité crée l’Union européenne en 1992 ?','Le traité de Maastricht','Le traité de Rome|Le traité de Paris|L’édit de Nantes','Il prévoit aussi la monnaie unique.'],['Depuis quand l’euro circule-t-il en pièces et billets ?','2002','1957|1992|2012','Le 1er janvier 2002.'],['Combien de pays compte l’Union européenne ?','27','6|12|50','Depuis le départ du Royaume-Uni.'],['Que se passe-t-il le 11 septembre 2001 ?','Des attentats terroristes frappent les États-Unis','La chute du mur de Berlin|La création de l’euro|La fin de l’URSS','Près de 3 000 morts.'],['Quel pays la Russie envahit-elle en février 2022 ?','L’Ukraine','La Pologne|La Finlande|La Géorgie','La guerre est de retour sur le continent européen.'],['Qui sont deux « pères de l’Europe » ?','Jean Monnet et Robert Schuman','Napoléon et Hitler|Staline et Churchill|Louis XIV et Charlemagne','Déclaration Schuman du 9 mai 1950.']],
  d:[['construction européenne','processus d’union des pays d’Europe depuis 1950'],['Union européenne','association de 27 pays européens'],['euro','monnaie commune à de nombreux pays de l’UE'],['terrorisme','usage de la violence pour semer la peur à des fins politiques'],['Brexit','sortie du Royaume-Uni de l’Union européenne']],
  c:[[1950,'Déclaration Schuman'],[1957,'Traité de Rome'],[1992,'Traité de Maastricht'],[2002,'L’euro en circulation'],[2020,'Brexit']],
  t:[['La France est un pays fondateur de la construction européenne.',true,'Dès 1951 avec la CECA.'],['Tous les pays de l’UE utilisent l’euro.',false,'Certains, comme la Suède ou la Pologne, gardent leur monnaie.']]}),
hc('hg3h','H','Refonder la République (1944-1981)','🏛️','Après la guerre, il faut tout reconstruire, y compris la démocratie. De la Libération à la Ve République, la France se réinvente.',
 ['1944-1947 : on refonde la République : vote des femmes (1944), Sécurité sociale (1945), IVe République (1946).','1958 : de Gaulle fonde la Ve République ; depuis 1962, le président est élu au suffrage universel direct.','1981 : alternance avec François Mitterrand ; 1986 : première cohabitation.'],'La Constitution de 1958 renforce le pouvoir du président de la République.',
 {q:[['Quand les Françaises votent-elles pour la première fois ?','En 1945','En 1789|En 1848|En 1958','Le droit de vote leur est accordé en 1944.'],['En quelle année commence la Ve République ?','1958','1946|1962|1981','Avec la Constitution du 4 octobre 1958.'],['Qui fonde la Ve République ?','Charles de Gaulle','François Mitterrand|Jacques Chirac|Philippe Pétain','Il en est le premier président.'],['Depuis 1962, comment le président est-il élu ?','Au suffrage universel direct','Par le Parlement|Par les maires|Il est nommé par le Premier ministre','Réforme approuvée par référendum.'],['Qu’est-ce que l’alternance de 1981 ?','L’arrivée de la gauche au pouvoir avec François Mitterrand','Le retour de De Gaulle|La fin de la Ve République|Un coup d’État','Première alternance de la Ve République.'],['Qu’est-ce qu’une cohabitation ?','Un président et un gouvernement de bords politiques opposés','Deux présidents en même temps|Un gouvernement sans ministres|Le partage d’un logement','La première a lieu en 1986.']],
  d:[['Ve République','régime politique de la France depuis 1958'],['Constitution','texte qui fixe l’organisation des pouvoirs et les droits des citoyens'],['référendum','vote où les citoyens répondent par oui ou par non'],['alternance','changement de majorité politique au pouvoir'],['cohabitation','situation où le président et la majorité sont opposés']],
  c:[[1944,'Droit de vote des femmes'],[1945,'Création de la Sécurité sociale'],[1958,'Début de la Ve République'],[1962,'Élection du président au suffrage universel direct'],[1981,'Élection de François Mitterrand']],
  t:[['Le président de la Ve République est élu directement par les citoyens.',true,'Depuis 1962.'],['La IVe République dure jusqu’en 2000.',false,'Elle prend fin en 1958.']]}),
hc('hg3i','H','Femmes et hommes (1950-1980)','👫','Télé, voiture, machine à laver… et nouveaux droits pour les femmes : entre 1950 et 1980, la vie quotidienne des Français est bouleversée.',
 ['Les Trente Glorieuses (1945-1975) : forte croissance et société de consommation.','Les femmes conquièrent de nouveaux droits : travailler sans l’autorisation du mari (1965), contraception (loi Neuwirth, 1967), IVG (loi Veil, 1975).','Mai 1968 : la jeunesse et les ouvriers contestent la société.'],'Simone Veil défend la loi sur l’IVG devant l’Assemblée nationale en novembre 1974.',
 {q:[['Comment appelle-t-on la période de forte croissance de 1945 à 1975 ?','Les Trente Glorieuses','La Belle Époque|Les Années folles|La Grande Dépression','Plein emploi et hausse du niveau de vie.'],['Qui défend la loi sur l’IVG en 1974-1975 ?','Simone Veil','Marie Curie|Louise Michel|Simone de Beauvoir','Loi promulguée en janvier 1975.'],['Que permet la loi de 1965 aux femmes mariées ?','Travailler et ouvrir un compte sans l’accord du mari','Voter pour la première fois|Devenir présidente|Être élues maires','Loi du 13 juillet 1965.'],['Que se passe-t-il en Mai 68 ?','Une grande contestation des étudiants et des ouvriers','La fin de la guerre d’Algérie|L’élection de Mitterrand|La création de l’euro','Grèves et manifestations massives.'],['Quel objet symbolise la société de consommation ?','La télévision','La charrue|Le rouet|La lampe à huile','Les ménages s’équipent massivement.'],['Qu’autorise la loi Neuwirth (1967) ?','La contraception (pilule)','L’IVG|Le divorce|Le vote des femmes','Les femmes maîtrisent leur fécondité.']],
  d:[['Trente Glorieuses','période de forte croissance économique (1945-1975)'],['société de consommation','société où l’achat de biens occupe une grande place'],['IVG','interruption volontaire de grossesse'],['contraception','moyens d’éviter une grossesse'],['émancipation','fait de se libérer d’une domination']],
  c:[[1965,'Les femmes peuvent travailler sans l’accord du mari'],[1967,'Loi Neuwirth sur la contraception'],[1968,'Mai 68'],[1975,'Loi Veil sur l’IVG']],
  t:[['Pendant les Trente Glorieuses, le chômage est très faible.',true,'C’est presque le plein emploi.'],['En 1960, une femme mariée pouvait ouvrir seule un compte bancaire.',false,'Il faut attendre la loi de 1965.']]}),
hc('hg3j','G','Les aires urbaines en France','🏙️','Huit Français sur dix vivent en ville ou autour. Mais où exactement, et comment se déplacent-ils chaque jour ?',
 ['Environ 80 % des Français vivent dans des espaces urbains.','Une aire urbaine (appelée aujourd’hui « aire d’attraction » d’une ville) comprend un pôle et sa couronne périurbaine.','Paris domine le réseau urbain ; des métropoles régionales (Lyon, Marseille, Toulouse…) sont très dynamiques.'],'La périurbanisation allonge les trajets domicile-travail et l’usage de la voiture.',
 {q:[['Quelle part des Français vit dans des espaces urbains ?','Environ 80 %','Environ 20 %|Environ 50 %|100 %','La France est très urbanisée.'],['Qu’est-ce qu’une aire urbaine (aire d’attraction) ?','Un pôle urbain et sa couronne périurbaine','Un seul quartier|Une zone rurale isolée|Un parc national','Les habitants de la couronne travaillent souvent dans le pôle.'],['Quelle est la plus grande aire urbaine de France ?','Paris','Lyon|Marseille|Lille','Environ 13 millions d’habitants.'],['Qu’est-ce qu’un navetteur ?','Une personne qui fait chaque jour l’aller-retour domicile-travail','Un marin|Un touriste|Un agriculteur','Les navettes saturent les routes aux heures de pointe.'],['Qu’est-ce que la gentrification ?','L’arrivée de populations aisées dans un quartier populaire','La destruction d’un quartier|La construction d’une autoroute|L’exode rural','Les prix des logements augmentent.'],['Quel est un enjeu de la ville durable ?','Développer les transports en commun','Construire plus d’autoroutes en ville|Supprimer les parcs|Étaler la ville','Pour réduire pollution et embouteillages.']],
  d:[['aire urbaine','pôle urbain et sa couronne périurbaine'],['pôle urbain','ville-centre et sa banlieue, qui concentrent les emplois'],['couronne périurbaine','communes autour du pôle dont les habitants y travaillent'],['navetteur','personne qui fait chaque jour le trajet domicile-travail'],['métropole','grande ville qui concentre population, activités et pouvoirs']],
  t:[['La plupart des Français vivent dans des espaces urbains.',true,'Environ 80 %.'],['Lyon est plus peuplée que Paris.',false,'Paris est de loin la première aire urbaine.']]}),
hc('hg3k','G','Espaces productifs, espaces de faible densité','🚜','Avions à Toulouse, vignes en Bourgogne, stations de ski dans les Alpes : où et comment la France produit-elle ses richesses ?',
 ['Les espaces productifs sont les lieux où l’on produit des richesses : agricoles, industriels, de services, touristiques.','La France est la première puissance agricole de l’UE et un géant touristique ; les services emploient plus de 75 % des actifs.','Les espaces de faible densité (montagnes, campagnes isolées) ont des atouts : tourisme, agriculture, cadre de vie.'],'Toulouse est un grand pôle aéronautique (Airbus), lié à la recherche et aux universités.',
 {q:[['Quel secteur emploie le plus d’actifs en France ?','Les services (secteur tertiaire)','L’agriculture|L’industrie|La pêche','Plus de 75 % des emplois.'],['Quelle ville est le grand pôle aéronautique français ?','Toulouse','Brest|Lille|Strasbourg','Siège d’Airbus.'],['Quelle est la place de la France parmi les producteurs agricoles de l’UE ?','La première','La dernière|La dixième|Elle ne produit rien','Céréales, vin, lait, viande.'],['Qu’est-ce qu’un espace productif ?','Un espace aménagé pour produire des biens ou des services','Un espace protégé où rien n’est autorisé|Une zone désertique|Une forêt vierge','Agricole, industriel, touristique, tertiaire.'],['Qu’est-ce qu’un technopôle ?','Un espace qui associe entreprises de haute technologie, recherche et universités','Un champ de blé|Une station de ski|Un port de pêche','Exemple : Sophia Antipolis.'],['Quel est un atout des espaces de faible densité ?','Le cadre de vie et le tourisme vert','Les embouteillages|La forte densité d’usines|Le manque d’espace','Certains accueillent de nouveaux habitants.']],
  d:[['espace productif','espace aménagé pour produire des richesses'],['technopôle','espace associant entreprises innovantes, recherche et formation'],['secteur tertiaire','secteur des services (commerce, santé, éducation…)'],['désindustrialisation','recul de l’industrie dans l’économie'],['espace de faible densité','espace peu peuplé']],
  t:[['La France est l’un des pays les plus visités au monde.',true,'Le tourisme y est une activité majeure.'],['L’industrie est le secteur qui emploie le plus en France.',false,'C’est le secteur des services.']]}),
hc('hg3l','G','Aménager le territoire, les outre-mer','🗺️','Un TGV, une fibre optique, un hôpital, une île à 10 000 km de Paris : aménager le territoire, c’est réduire les inégalités partout en France.',
 ['Aménager, c’est agir sur un territoire pour réduire les inégalités et améliorer la vie des habitants.','Les acteurs : l’État, les régions, les départements, les communes et l’Union européenne.','Les territoires ultramarins (Guadeloupe, Martinique, Guyane, La Réunion, Mayotte…) donnent à la France la 2e ZEE du monde.'],'Les lignes à grande vitesse rapprochent les métropoles régionales de Paris.',
 {q:[['Qu’est-ce qu’aménager un territoire ?','Agir pour l’organiser et réduire les inégalités','Le laisser à l’abandon|Le vendre à l’étranger|Interdire d’y habiter','Routes, écoles, hôpitaux, Internet…'],['Lequel est un département et région d’outre-mer (DROM) ?','La Réunion','La Corse|La Bretagne|L’Alsace','Avec la Guadeloupe, la Martinique, la Guyane et Mayotte.'],['Où se trouve la Guyane ?','En Amérique du Sud','En Afrique|En Océanie|Dans l’océan Indien','Le centre spatial de Kourou s’y trouve.'],['Quel rang occupe la ZEE française dans le monde ?','La deuxième','La première|La dixième|La cinquantième','Grâce aux territoires ultramarins.'],['Quel acteur finance des projets d’aménagement en plus de l’État ?','L’Union européenne','Les touristes uniquement|L’ONU uniquement|Personne','Avec des fonds pour les régions en difficulté.'],['Qu’est-ce qu’une « zone blanche » ?','Un territoire mal couvert par Internet et le téléphone mobile','Une région enneigée|Un quartier riche|Une plage','Un enjeu d’aménagement numérique.']],
  d:[['aménagement du territoire','action pour organiser un territoire et réduire les inégalités'],['DROM','département et région d’outre-mer'],['ultramarin','situé outre-mer'],['ZEE','zone maritime où un État exploite seul les ressources'],['acteur','personne ou institution qui intervient sur un territoire']],
  t:[['Les territoires ultramarins font partie de la France.',true,'Leurs habitants sont des citoyens français.'],['L’État est le seul acteur de l’aménagement.',false,'Les régions, les communes et l’UE agissent aussi.']]}),
hc('hg3m','G','La France et l’Union européenne','🌐','Voyager sans passeport, étudier en Espagne avec Erasmus, payer en euros à Rome : l’Europe fait déjà partie de ta vie.',
 ['L’UE est un territoire de référence : libre circulation (espace Schengen), euro, programmes Erasmus+.','La France, pays fondateur, est l’une des principales puissances de l’UE.','La France et l’UE pèsent dans le monde : diplomatie (la France est membre permanent du Conseil de sécurité de l’ONU), culture, défense, francophonie.'],'Strasbourg accueille le Parlement européen ; Bruxelles la Commission européenne.',
 {q:[['Où siège le Parlement européen ?','Strasbourg','Paris|Rome|Berlin','Il se réunit aussi à Bruxelles.'],['Qu’est-ce que l’espace Schengen ?','Un espace de libre circulation sans contrôle aux frontières intérieures','Une zone de pêche|Une alliance militaire|Une monnaie','Créé par les accords de 1985.'],['La France est-elle membre permanent du Conseil de sécurité de l’ONU ?','Oui','Non|Seulement tous les 5 ans|Elle n’est pas membre de l’ONU','Elle dispose d’un droit de veto.'],['Qu’est-ce qu’Erasmus+ ?','Un programme d’échanges pour étudier ou se former en Europe','Une monnaie|Un traité militaire|Une fusée','Des millions de jeunes en ont profité.'],['Qu’est-ce que la francophonie ?','L’ensemble des personnes et des pays qui parlent français','Une chaîne de télévision|Un traité européen|Une région française','Plus de 300 millions de francophones.'],['Où siège la Commission européenne ?','Bruxelles','Strasbourg|Luxembourg|Genève','Elle propose les lois européennes.']],
  d:[['Union européenne','association de 27 États européens'],['espace Schengen','espace de libre circulation des personnes'],['Parlement européen','assemblée élue par les citoyens européens'],['francophonie','ensemble des locuteurs et des pays qui parlent français'],['puissance','capacité d’un État à agir et à influencer dans le monde']],
  t:[['La France est un pays fondateur de la construction européenne.',true,'Depuis 1951 et la CECA.'],['Le Parlement européen n’est pas élu.',false,'Il est élu au suffrage universel direct tous les 5 ans.']]}),
hc('hg3n','E','Les règles du jeu démocratique','📜','Qui fait les lois ? Qui les applique ? Qui vérifie qu’elles sont justes ? La Constitution est le règlement de la démocratie française.',
 ['La Constitution de 1958 est la norme suprême : elle garantit les droits et organise la séparation des pouvoirs.','Pouvoir exécutif (président, gouvernement), législatif (Parlement : Assemblée nationale et Sénat), judiciaire (juges).','Le bloc de constitutionnalité comprend la DDHC (1789), le préambule de 1946 et la Charte de l’environnement (2004).'],'Le Conseil constitutionnel vérifie que les lois respectent la Constitution, par exemple lors d’une QPC.',
 {q:[['Quel texte est la norme juridique suprême en France ?','La Constitution de 1958','Le Code de la route|La loi de 1905|Le règlement du collège','Toutes les lois doivent la respecter.'],['Qui vote les lois ?','Le Parlement (Assemblée nationale et Sénat)','Le président seul|Les juges|Les maires','C’est le pouvoir législatif.'],['Pour combien de temps le président est-il élu depuis 2002 ?','5 ans','7 ans|4 ans|10 ans','C’est le quinquennat, adopté par référendum en 2000.'],['Que contrôle le Conseil constitutionnel ?','La conformité des lois à la Constitution','Les impôts des citoyens|Les notes du brevet|Les élections du délégué','On peut le saisir par une QPC.'],['Quels textes forment avec la Constitution le « bloc de constitutionnalité » ?','La DDHC, le préambule de 1946 et la Charte de l’environnement','Le Code noir et le Code civil|L’édit de Nantes|Le traité de Versailles','Ils ont la même valeur que la Constitution.'],['Quelle institution européenne ne fait pas partie de l’UE ?','Le Conseil de l’Europe','Le Parlement européen|La Commission européenne|Le Conseil européen','Il rassemble 46 États et veille aux droits de l’homme.']],
  d:[['Constitution','texte fondamental qui organise les pouvoirs et garantit les droits'],['séparation des pouvoirs','répartition des pouvoirs législatif, exécutif et judiciaire entre des institutions différentes'],['Parlement','Assemblée nationale et Sénat, qui votent les lois'],['quinquennat','mandat de cinq ans du président de la République'],['QPC','question prioritaire de constitutionnalité, posée lors d’un procès']],
  c:[[1789,'Déclaration des droits de l’homme et du citoyen'],[1946,'Préambule de la Constitution de 1946'],[1958,'Constitution de la Ve République'],[1962,'Élection du président au suffrage universel direct'],[2000,'Référendum sur le quinquennat'],[2004,'Charte de l’environnement']],
  t:[['Le président de la République vote les lois.',false,'C’est le Parlement.'],['Une loi contraire à la Constitution peut être censurée.',true,'Par le Conseil constitutionnel.']]}),
hc('hg3o','E','L’opinion et l’information','📰','Une vidéo choc, une image générée par IA, un sondage en une : comment savoir ce qui est vrai avant de partager ?',
 ['En démocratie, l’opinion publique pèse sur les décisions ; elle s’exprime notamment par les élections et le référendum.','Les médias et les réseaux sociaux informent, mais peuvent aussi diffuser de fausses informations.','Il faut vérifier les sources et distinguer croyance, opinion et savoir ; la loi de 2018 lutte contre la manipulation de l’information.'],'Un sondage donne une image de l’opinion à un moment donné, avec une marge d’erreur.',
 {q:[['Qu’est-ce qu’une « infox » ?','Une fausse information, diffusée volontairement ou non','Une information vérifiée|Un journal télévisé|Un sondage','On dit aussi « fake news ».'],['Que faut-il faire avant de partager une information ?','Vérifier la source et la croiser avec d’autres','La partager tout de suite|Ne lire que le titre|Faire confiance au nombre de « j’aime »','Qui l’a publiée ? Quand ? Est-elle reprise ailleurs ?'],['Qu’est-ce qu’un sondage ?','Une enquête auprès d’un échantillon pour estimer l’opinion','Un vote officiel|Une loi|Une décision de justice','Il comporte une marge d’erreur.'],['Qu’est-ce que le complotisme ?','La croyance, sans preuves, que des groupes secrets manipulent le monde','Une méthode scientifique|Une enquête journalistique|Un type d’élection','Il nourrit souvent le racisme et l’antisémitisme.'],['Qu’est-ce qu’un référendum ?','Un vote où les citoyens répondent par oui ou par non à une question','L’élection du maire|Un sondage en ligne|Un débat télévisé','Exemples : 1962, 2000, 2005.'],['Pourquoi une image générée par l’IA peut-elle tromper ?','Elle peut sembler réelle sans l’être','Elle est toujours floue|Elle est toujours vraie|Elle est interdite','Il faut vérifier son origine.']],
  d:[['opinion publique','ensemble des opinions partagées par une population'],['source','origine d’une information'],['désinformation','diffusion volontaire de fausses informations'],['sondage','enquête auprès d’un échantillon de personnes'],['esprit critique','capacité à examiner une information avant d’y croire'],['complotisme','croyance non prouvée en un complot secret']],
  t:[['Une information très partagée est forcément vraie.',false,'Il faut toujours vérifier la source.'],['Un sondage n’est pas un vote officiel.',true,'C’est une estimation à un moment donné.']]}),
hc('hg3p','E','L’engagement collectif','🙋','Délégué, bénévole, éco-délégué, futur électeur : la démocratie ne marche que si des citoyens s’engagent. Et ça commence au collège.',
 ['La démocratie vit grâce à l’engagement des citoyens : vote, associations, syndicats, partis politiques.','Au collège : délégués, conseil de la vie collégienne, éco-délégués.','Manifester est une liberté encadrée par la loi ; les lanceurs d’alerte sont protégés (loi du 21 mars 2022).'],'Des millions de Français sont bénévoles dans des associations.',
 {q:[['Laquelle est une forme d’engagement ?','Être bénévole dans une association','Rester chez soi sans voter|Ignorer les élections|Refuser toute règle','L’engagement peut être associatif, politique, syndical.'],['Qu’est-ce qu’un syndicat ?','Une organisation qui défend les intérêts des travailleurs','Un parti politique|Une entreprise|Un tribunal','Les syndicats sont autorisés depuis 1884.'],['Qu’est-ce qu’un lanceur d’alerte ?','Une personne qui révèle une menace pour l’intérêt général','Un pompier|Un policier|Un journaliste sportif','Protégé par la loi du 21 mars 2022.'],['Manifester sur la voie publique est-il un droit ?','Oui, dans le cadre fixé par la loi','Non, c’est interdit|Oui, sans aucune règle|Seulement pour les élus','Une déclaration préalable est demandée.'],['À partir de quel âge peut-on voter en France ?','18 ans','16 ans|21 ans|25 ans','Il faut être inscrit sur les listes électorales.'],['Au collège, qui représente les élèves ?','Les délégués élus','Le principal|Les parents seulement|Personne','Ils siègent au conseil de classe.']],
  d:[['engagement','fait de s’investir pour une cause ou pour les autres'],['association','groupement de personnes réunies autour d’un projet commun'],['syndicat','organisation qui défend les intérêts des salariés'],['bénévole','personne qui s’engage sans être payée'],['lanceur d’alerte','personne qui signale une menace pour l’intérêt général'],['citoyenneté','fait d’être citoyen, avec des droits et des devoirs']],
  t:[['Voter est obligatoire en France.',false,'C’est un droit et un devoir civique, pas une obligation légale.'],['On peut s’engager dès le collège.',true,'Comme délégué ou éco-délégué.']]})
]};

/* ===== Cours d'anglais ===== */
Object.assign(COURS,{
 'en6a':{hook:`Dire bonjour et se présenter est la première compétence utile en anglais. En quelques phrases, tu peux déjà commencer une vraie conversation.`,
 parts:[{t:'1. Choisir la bonne salutation',h:V.tbl(['Situation','Expression'],[[E('Hello / Hi'),'Bonjour / Salut'],[E('Good morning'),'Bonjour le matin'],[E('Good afternoon'),'Bonjour l’après-midi'],[E('Good evening'),'Bonsoir'],[E('Goodbye / Bye'),'Au revoir'],[E('See you soon'),'À bientôt']])+V.tip(`${E('Hi')} est plus familier que ${E('Hello')}.`)},
 {t:'2. Donner son nom, son âge et son origine',h:V.steps([`${E('My name is Léa.')} = Je m’appelle Léa.`,`${E("I'm Léa.")} = Je suis Léa.`,`${E("I'm twelve years old.")} = J’ai douze ans.`,`${E("I'm from France.")} = Je viens de France.`])},
 {t:'3. Demander comment va quelqu’un',h:V.tbl(['Question','Réponses possibles'],[[E('How are you?'),E("I'm fine, thank you.")],[E('How are you?'),E("I'm great!")],[E('How are you?'),E("I'm tired.")]])+V.tip(`Après ta réponse, tu peux ajouter ${E('And you?')} pour renvoyer la question.`)},
 {t:'4. Mini-dialogue modèle',h:`${E('A: Hello! My name is Tom. What is your name?')}<br>${E("B: Hi! I'm Emma. Nice to meet you.")}<br>${E('A: Nice to meet you too. How are you?')}<br>${E("B: I'm fine, thank you. And you?")}`}],
 ex:{q:'Présente-toi en quatre informations.',s:[`Commence par une salutation : ${E('Hello!')}.`,`Donne ton nom : ${E('My name is…')}.`,`Ajoute ton âge : ${E("I'm twelve years old.")}.`,`Ajoute ton pays : ${E("I'm from France.")}.`,`Exemple complet : ${E("Hello! My name is Léa. I'm twelve years old and I'm from France.")} ✅`]},
 piege:`Pour l’âge, l’anglais utilise BE : ${E("I'm twelve")}. Ne traduis pas mot à mot « j’ai douze ans » par « I have twelve years ».`,
 retenir:[`${E('My name is…')} pour donner son nom.`,`${E('How are you?')} pour demander comment ça va.`,`${E("I'm from…")} pour dire d’où l’on vient.`]},
'en6b':{hook:'Les nombres servent partout : âge, prix, téléphone, adresse, heure et score. Les maîtriser évite beaucoup d’erreurs.',
 parts:[{t:'1. De 0 à 20',h:V.tbl(['0–10','11–20'],[[E('zero, one, two, three, four, five'),''],[E('six, seven, eight, nine, ten'),''],[E('eleven, twelve'),E('thirteen, fourteen, fifteen')],[E('sixteen, seventeen, eighteen'),E('nineteen, twenty')]])},
 {t:'2. Les dizaines',h:V.tbl(['Nombre','Anglais'],[['20',E('twenty')],['30',E('thirty')],['40',E('forty')],['50',E('fifty')],['60',E('sixty')],['70',E('seventy')],['80',E('eighty')],['90',E('ninety')],['100',E('one hundred')]])+V.tip(`21 à 99 : dizaine + tiret + unité, par exemple ${E('forty-seven')}.`)},
 {t:'3. -TEEN ou -TY ?',h:`${E('thirteen')} = 13, ${E('thirty')} = 30. Les nombres en -teen vont de 13 à 19 ; les dizaines finissent généralement par -ty.`},
 {t:'4. Dire son âge',h:`Question : ${E('How old are you?')}<br>Réponse : ${E("I'm twelve years old.")} ou simplement ${E("I'm twelve.")}`}],
 ex:{q:'Comment écrire 47 et dire « j’ai 12 ans » ?',s:[`40 = ${E('forty')} — attention, sans « u ».`,`7 = ${E('seven')}.`,`47 = ${E('forty-seven')}.`,`Pour l’âge : ${E("I'm twelve years old.")} ✅`]},
 piege:`${E('fourteen')} = 14 mais ${E('forty')} = 40. Écoute bien la terminaison et apprends l’orthographe de ${E('forty')}.`,
 retenir:['13–19 : terminaison -teen.','20, 30, 40… : terminaison -ty.',`Âge : ${E('I am / I’m + âge')}.`]},
'en6c':{hook:'Couleurs et objets permettent de décrire immédiatement ce qui t’entoure : trousse, cahier, vêtements, chambre…',
 parts:[{t:'1. Couleurs essentielles',h:V.tbl(['Anglais','Français'],[[E('red'),'rouge'],[E('blue'),'bleu'],[E('green'),'vert'],[E('yellow'),'jaune'],[E('black'),'noir'],[E('white'),'blanc'],[E('grey'),'gris'],[E('brown'),'marron'],[E('purple'),'violet'],[E('pink'),'rose']])},
 {t:'2. Objets de classe',h:V.tbl(['Anglais','Français'],[[E('a pen'),'un stylo'],[E('a pencil'),'un crayon'],[E('a ruler'),'une règle'],[E('a rubber'),'une gomme'],[E('a pencil case'),'une trousse'],[E('a schoolbag'),'un cartable']])},
 {t:'3. Place de l’adjectif',h:`L’adjectif se place <b>avant</b> le nom : ${E('a red pen')}. Il reste invariable : ${E('two red pens')}, jamais « reds pens ».`},
 {t:'4. A ou AN ?',h:`${E('a')} devant un son consonne : ${E('a blue bag')}. ${E('an')} devant un son voyelle : ${E('an orange pencil case')}.`}],
 ex:{q:'Décris « deux crayons verts ».',s:[`Le nom est ${E('pencils')}.`,`La couleur ${E('green')} se place avant le nom.`,`L’adjectif ne prend pas de -s.`,`Réponse : ${E('two green pencils')} ✅`]},
 piege:`En anglais, on dit ${E('a blue bag')}, pas « a bag blue ».`,
 retenir:['Adjectif avant le nom.','Adjectif invariable.',`${E('a')} / ${E('an')} dépend du son qui suit.`]},
'en6d':{hook:'Parler de sa famille permet de présenter les personnes qui comptent pour soi et d’apprendre les premiers possessifs.',
 parts:[{t:'1. Le vocabulaire de base',h:V.tbl(['Anglais','Français'],[[E('mother / mum'),'mère / maman'],[E('father / dad'),'père / papa'],[E('parents'),'parents'],[E('brother'),'frère'],[E('sister'),'sœur'],[E('grandparents'),'grands-parents'],[E('uncle'),'oncle'],[E('aunt'),'tante'],[E('cousin'),'cousin / cousine']])},
 {t:'2. My, his, her',h:`${E('my')} = mon/ma/mes ; ${E('his')} = son/sa à lui ; ${E('her')} = son/sa à elle. Exemple : ${E('Tom loves his sister. Emma loves her brother.')}`},
 {t:'3. Le possessif en ’s',h:`Pour indiquer le propriétaire : ${E("Tom's dog")} = le chien de Tom ; ${E("Lisa's brother")} = le frère de Lisa.`}],
 ex:{q:'Comment dire « Voici ma mère. Son prénom est Anna. » ?',s:[`${E('This is…')} = voici / c’est.`,`ma mère = ${E('my mother')}.`,`Comme Anna est une femme, « son prénom » = ${E('her name')}.`,`${E('This is my mother. Her name is Anna.')} ✅`]},
 piege:`${E('his')} et ${E('her')} dépendent de la personne qui possède, pas de l’objet possédé.`,
 retenir:[`${E('my, your, his, her, our, their')}.`,`${E("Tom's…")} signifie « le/la … de Tom ».`]},
'en6e':{hook:'BE signifie principalement « être ». C’est l’un des verbes les plus importants de toute la langue anglaise.',
 parts:[{t:'1. Forme affirmative',h:V.tbl(['Sujet','Forme longue','Forme contractée'],[[E('I'),E('I am'),E("I'm")],[E('you'),E('you are'),E("you're")],[E('he / she / it'),E('he is'),E("he's")],[E('we'),E('we are'),E("we're")],[E('they'),E('they are'),E("they're")]])},
 {t:'2. Forme négative',h:V.tbl(['Affirmatif','Négatif'],[[E('I am'),E("I am not / I'm not")],[E('he is'),E("he is not / he isn't")],[E('you are'),E("you are not / you aren't")]])+V.tip(`On ajoute ${E('not')} après BE.`)},
 {t:'3. Questions',h:`Pour poser une question, BE passe devant le sujet : ${E('You are tired. → Are you tired?')} ; ${E('She is French. → Is she French?')}`},
 {t:'4. Réponses courtes',h:V.tbl(['Question','Oui','Non'],[[E('Are you ready?'),E('Yes, I am.'),E("No, I'm not.")],[E('Is she twelve?'),E('Yes, she is.'),E("No, she isn't.")],[E('Are they here?'),E('Yes, they are.'),E("No, they aren't.")]])}],
 ex:{q:'Transforme « She is happy. » en négation puis en question.',s:[`Affirmatif : ${E('She is happy.')}`,`Négatif : ajoute ${E('not')} → ${E("She isn't happy.")}`,`Question : place ${E('is')} devant le sujet → ${E('Is she happy?')} ✅`]},
 piege:`N’utilise pas DO avec BE : on dit ${E('Are you tired?')}, pas « Do you are tired? ».`,
 retenir:[`${E('I am')}, ${E('he/she/it is')}, ${E('you/we/they are')}.`,`Négation = BE + ${E('not')}.`,`Question = BE devant le sujet.`]},
'en6f':{hook:'HAVE GOT permet de dire ce que l’on possède et sert aussi beaucoup pour décrire le physique.',
 parts:[{t:'1. Forme affirmative',h:V.tbl(['Sujet','Forme'],[[E('I / you / we / they'),E('have got')],[E('he / she / it'),E('has got')]])},
 {t:'2. Négation',h:`${E("haven't got")} avec I/you/we/they ; ${E("hasn't got")} avec he/she/it.`},
 {t:'3. Questions et réponses courtes',h:`${E('Have you got a bike? Yes, I have. / No, I haven’t.')}<br>${E('Has she got blue eyes? Yes, she has. / No, she hasn’t.')}`},
 {t:'4. Décrire une personne',h:`${E('She has got long brown hair and green eyes.')} HAVE GOT fonctionne très bien pour les yeux, les cheveux, les frères et sœurs et les objets possédés.`}],
 ex:{q:'Mets « Tom has got a dog. » à la forme négative.',s:[`Sujet : Tom = ${E('he')}.`,`Avec he, on utilise ${E('has got')}.`,`Négation : ${E("hasn't got")}.`,`${E("Tom hasn't got a dog.")} ✅`]},
 piege:`Après ${E('does')} au présent simple on revient à have, mais dans la structure HAVE GOT de ce cours, la question est directement ${E('Has he got…?')}.`,
 retenir:[`${E('have got')} avec I/you/we/they.`,`${E('has got')} avec he/she/it.`,`${E('Have… got? / Has… got?')} pour les questions.`]},
'en6g':{hook:'Dates et calendrier permettent de parler de son anniversaire, de l’emploi du temps et des événements.',
 parts:[{t:'1. Les jours',h:`${E('Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday')}. Ils prennent toujours une majuscule.`},
 {t:'2. Les mois',h:`${E('January, February, March, April, May, June, July, August, September, October, November, December')}. Eux aussi prennent une majuscule.`},
 {t:'3. IN / ON / AT',h:V.tbl(['Préposition','Usage','Exemple'],[[E('on'),'jour / date',E('on Monday')],[E('in'),'mois / saison / année',E('in May')],[E('at'),'heure précise',E('at 8 o’clock')]])},
 {t:'4. Les nombres ordinaux',h:`Pour les dates : ${E('1st first, 2nd second, 3rd third, 4th fourth, 21st twenty-first')}.`}],
 ex:{q:'Comment dire « Mon anniversaire est le 3 mai » ?',s:[`« anniversaire » = ${E('birthday')}.`,`Pour une date précise, on peut employer ${E('on')}.`,`3 = ${E('third')} dans une date.`,`${E('My birthday is on the third of May.')} ✅`]},
 piege:'Jours et mois prennent une majuscule en anglais, même au milieu d’une phrase.',
 retenir:[`${E('on Monday')}, ${E('in May')}, ${E('at eight')}.`,'Jours et mois avec majuscule.']},
'en6h':{hook:'Les pronoms évitent de répéter les noms et sont indispensables pour conjuguer correctement.',
 parts:[{t:'1. Les pronoms sujets',h:V.tbl(['Pronom','Français'],[[E('I'),'je'],[E('you'),'tu / vous'],[E('he'),'il'],[E('she'),'elle'],[E('it'),'il/elle pour chose ou animal'],[E('we'),'nous'],[E('they'),'ils / elles']])},
 {t:'2. Remplacer un nom',h:`${E('Tom is my friend. He is funny.')}<br>${E('Lisa is my sister. She is twelve.')}<br>${E('The books are new. They are interesting.')}`},
 {t:'3. HE, SHE ou IT ?',h:`${E('he')} pour un garçon/homme, ${E('she')} pour une fille/femme, ${E('it')} pour un objet, une idée ou souvent un animal dont on ne précise pas le sexe.`}],
 ex:{q:'Remplace « Tom and Lisa » par un pronom.',s:['Il y a deux personnes.','Tom + Lisa = « ils / elles » au pluriel.',`Le pronom anglais est ${E('they')}.`,`${E('Tom and Lisa are here. They are happy.')} ✅`]},
 piege:`${E('you')} sert à la fois pour « tu », « vous » singulier de politesse et « vous » pluriel.`,
 retenir:[`${E('he')} masculin, ${E('she')} féminin, ${E('it')} chose/animal.`,`${E('we')} nous, ${E('they')} ils/elles.`]},
'en6i':{hook:'Le pluriel anglais est souvent simple, mais quelques terminaisons et mots irréguliers sont à connaître.',
 parts:[{t:'1. Règle générale',h:`On ajoute -s : ${E('cat → cats')}, ${E('book → books')}.`},
 {t:'2. Ajouter -ES',h:`Après -s, -sh, -ch, -x ou souvent -o : ${E('bus → buses')}, ${E('watch → watches')}, ${E('box → boxes')}.`},
 {t:'3. Les mots en -Y',h:`Consonne + y : y devient ies : ${E('baby → babies')}. Voyelle + y : on garde y + s : ${E('boy → boys')}.`},
 {t:'4. Irréguliers fréquents',h:V.tbl(['Singulier','Pluriel'],[[E('child'),E('children')],[E('man'),E('men')],[E('woman'),E('women')],[E('person'),E('people')],[E('foot'),E('feet')],[E('tooth'),E('teeth')],[E('mouse'),E('mice')]])}],
 ex:{q:'Mets au pluriel « one baby, one box, one child ».',s:[`${E('baby')} : consonne + y → ${E('babies')}.`,`${E('box')} : -x → ${E('boxes')}.`,`${E('child')} est irrégulier → ${E('children')}.`,`${E('babies, boxes, children')} ✅`]},
 piege:`Ne mets pas simplement -s à tous les mots : ${E('childs')} est incorrect ; il faut ${E('children')}.`,
 retenir:['Règle générale : +s.','s/sh/ch/x : +es.','Consonne + y : -ies.','Apprendre les irréguliers fréquents.']},
'en6j':{hook:'CAN permet de dire ce que l’on sait faire, ce que l’on peut faire ou demander une permission simple.',
 parts:[{t:'1. Construction',h:`${E('can')} est identique avec tous les sujets : ${E('I can, she can, they can')}. Après CAN, le verbe reste à la base : ${E('can swim')}, jamais « can to swim ».`},
 {t:'2. Négation',h:`${E("cannot")} ou ${E("can't")}. Exemple : ${E("I can't drive.")}`},
 {t:'3. Question',h:`CAN passe devant le sujet : ${E('Can you swim?')} Réponses : ${E('Yes, I can. / No, I can’t.')}`},
 {t:'4. Permission',h:`${E('Can I open the window?')} = Est-ce que je peux ouvrir la fenêtre ?`}],
 ex:{q:'Transforme « She can dance. » en négation puis en question.',s:[`Négation : ${E("She can't dance.")}`,`Question : CAN devant le sujet → ${E('Can she dance?')}`,`Réponse courte possible : ${E('Yes, she can.')} ✅`]},
 piege:`Après CAN, pas de -s avec he/she : ${E('She can swim')}, pas « she can swims ».`,
 retenir:[`${E('can + base verbale')}.`,`${E("can't")} pour la négation.`,`${E('Can + sujet + verbe ?')} pour la question.`]},
'en6k':{hook:'A, AN et THE sont de petits mots, mais ils changent le sens du nom qui suit.',parts:[{t:'1. A et AN : un / une',h:`${E('a')} devant un son consonne : ${E('a dog')}. ${E('an')} devant un son voyelle : ${E('an apple')}. C’est le <b>son</b> qui compte.`},{t:'2. THE : le / la / les précis',h:`${E('the')} désigne quelque chose d’identifié : ${E('I have a dog. The dog is black.')}`},{t:'3. Quand ne rien mettre ?',h:`Pour parler d’une chose en général, on peut ne pas mettre d’article : ${E('I like chocolate. Cats are cute.')}`}],ex:{q:'Complète « I have __ umbrella. __ umbrella is blue. »',s:[`Umbrella commence par un son voyelle → ${E('an umbrella')}.`,`Ensuite, on parle du parapluie déjà identifié → ${E('the umbrella')}.`,`${E('I have an umbrella. The umbrella is blue.')} ✅`]},piege:`A/AN dépend du son, pas seulement de la lettre.`,retenir:[`${E('a')} + son consonne.`,`${E('an')} + son voyelle.`,`${E('the')} pour quelque chose de précis.`]},
'en6l':{hook:'Les adjectifs possessifs disent à qui appartient quelque chose sans répéter le propriétaire.',parts:[{t:'1. Le tableau complet',h:V.tbl(['Sujet','Possessif','Exemple'],[[E('I'),E('my'),E('my book')],[E('you'),E('your'),E('your bag')],[E('he'),E('his'),E('his bike')],[E('she'),E('her'),E('her cat')],[E('we'),E('our'),E('our house')],[E('they'),E('their'),E('their school')]])},{t:'2. Le possesseur décide',h:`Tom est un garçon : ${E('Tom loves his mother.')}. Emma est une fille : ${E('Emma loves her mother.')}. Le mot « mother » est identique, mais le possesseur change.`}],ex:{q:'Choisis entre his et her : « Lisa plays with ___ brother. »',s:['Lisa est une fille.',`Le possessif correspondant à she est ${E('her')}.`,`${E('Lisa plays with her brother.')} ✅`]},piege:`Ne choisis pas his/her selon le genre de l’objet possédé, mais selon la personne qui possède.`,retenir:[`${E('my, your, his, her, our, their')}.`,'Le possessif reste devant le nom.']},
'en6m':{hook:'THIS, THAT, THESE et THOSE permettent de montrer précisément ce dont on parle.',parts:[{t:'1. Proche ou loin ?',h:V.tbl(['','Singulier','Pluriel'],[['près',E('this'),E('these')],['loin',E('that'),E('those')]])},{t:'2. Exemples',h:`${E('This book is new.')} ${E('These books are new.')}<br>${E('That car is red.')} ${E('Those cars are red.')}`}],ex:{q:'Tu montres plusieurs chaussures loin de toi.',s:['Plusieurs = pluriel.','Loin = forme « those ».',`${E('Those shoes are nice.')} ✅`]},piege:`${E('this')} et ${E('that')} sont singuliers ; ${E('these')} et ${E('those')} sont pluriels.`,retenir:['this/these = près.','that/those = loin.']},
'en6n':{hook:'THERE IS / THERE ARE sert à décrire une pièce, une image ou un lieu en disant ce qui s’y trouve.',parts:[{t:'1. Affirmatif',h:`${E('There is')} + singulier : ${E('There is a sofa.')}<br>${E('There are')} + pluriel : ${E('There are two chairs.')}`},{t:'2. Négatif',h:`${E("There isn't a TV.")} / ${E("There aren't any books.")}`},{t:'3. Questions',h:`${E('Is there a garden?')} ${E('Are there two bathrooms?')}`}],ex:{q:'Décris une chambre avec un lit et deux fenêtres.',s:[`Un lit = singulier → ${E('There is a bed.')}`,`Deux fenêtres = pluriel → ${E('There are two windows.')}`,`Les deux phrases ensemble donnent une description correcte. ✅`]},piege:`Ne dis pas « there is two chairs » : pluriel → ${E('there are')}.`,retenir:[`${E('There is')} singulier.`,`${E('There are')} pluriel.`]},
'en6o':{hook:'Les prépositions de lieu servent à dire où se trouve exactement un objet ou une personne.',parts:[{t:'1. Les positions de base',h:V.tbl(['Anglais','Français'],[[E('in'),'dans'],[E('on'),'sur'],[E('under'),'sous'],[E('behind'),'derrière'],[E('in front of'),'devant'],[E('next to'),'à côté de'],[E('between'),'entre'],[E('opposite'),'en face de']])},{t:'2. Construire la phrase',h:`Sujet + BE + préposition + lieu : ${E('The cat is under the chair.')}`}],ex:{q:'Traduis « La banque est entre l’école et le parc. »',s:[`Sujet : ${E('The bank')}.`,`Verbe BE : ${E('is')}.`,`« entre » = ${E('between')}.`,`${E('The bank is between the school and the park.')} ✅`]},piege:`${E('between')} s’utilise généralement entre deux éléments.`,retenir:[`Structure : sujet + ${E('is/are')} + préposition + lieu.`]},
'en6p':{hook:'IN, ON et AT sont trois petits mots essentiels pour parler du temps sans hésiter.',parts:[{t:'1. AT',h:`Heure précise : ${E('at 7 o’clock')}, ${E('at noon')}, ${E('at night')}.`},{t:'2. ON',h:`Jour ou date : ${E('on Monday')}, ${E('on 12 May')}.`},{t:'3. IN',h:`Mois, saison, année, partie de journée : ${E('in July')}, ${E('in winter')}, ${E('in 2026')}, ${E('in the morning')}.`}],ex:{q:'Complète : « ___ Monday ___ 8 o’clock ___ September »',s:[`Jour → ${E('on Monday')}.`,`Heure → ${E('at 8 o’clock')}.`,`Mois → ${E('in September')}.`,`Réponse : ${E('on Monday at 8 o’clock in September')} ✅`]},piege:`On dit ${E('at night')} mais ${E('in the morning')}.`,retenir:['AT = heure.','ON = jour/date.','IN = mois/saison/année.']},
'en6q':{hook:'Le présent simple est le temps des habitudes, des routines, des goûts et des faits généraux.',parts:[{t:'1. Forme de base',h:V.tbl(['Sujet','Verbe PLAY'],[[E('I'),E('play')],[E('you'),E('play')],[E('he / she / it'),E('plays')],[E('we'),E('play')],[E('they'),E('play')]])},{t:'2. Le -S de la 3e personne',h:`Avec he/she/it, ajoute généralement -s : ${E('She likes music.')}. Après -ch/-sh/-s/-x, souvent -es : ${E('He watches TV.')}. Consonne + y : ${E('study → studies')}.`},{t:'3. Quand l’utiliser ?',h:`Marqueurs fréquents : ${E('every day, usually, often, on Mondays')}.`}],ex:{q:'Conjugue « Tom (watch) TV every evening. »',s:['Tom = he.','Au présent simple, he/she/it prend une terminaison.','Watch finit par -ch → on ajoute -es.',`${E('Tom watches TV every evening.')} ✅`]},piege:`Le -s appartient au verbe avec he/she/it : ${E('She plays')}, pas « she play ».`,retenir:['I/you/we/they + base verbale.','he/she/it + -s/-es.']},
'en6r':{hook:'LIKE, LOVE et HATE permettent de parler de ce que tu aimes, adores ou détestes.',parts:[{t:'1. Intensité',h:V.tbl(['Verbe','Sens'],[[E('love'),'adorer'],[E('like'),'aimer'],[E("don't like"),'ne pas aimer'],[E('hate'),'détester']])},{t:'2. Avec un nom',h:`${E('I like pizza. She loves dogs.')}`},{t:'3. Avec une activité',h:`On rencontre souvent -ING : ${E('I like swimming. He hates getting up early.')}`}],ex:{q:'Dis « Elle adore danser mais elle déteste courir. »',s:[`Elle = ${E('she')}.`,`Avec she : ${E('loves')} et ${E('hates')}.`,`Activités : ${E('dancing')} et ${E('running')}.`,`${E('She loves dancing but she hates running.')} ✅`]},piege:`Avec he/she/it au présent simple, pense au -s : ${E('She likes')}.`,retenir:['love > like > don’t like > hate.','Activité après ces verbes : souvent -ING.']},
'en6s':{hook:'La routine quotidienne combine le présent simple, l’heure et beaucoup de vocabulaire très utile.',parts:[{t:'1. Les actions principales',h:V.tbl(['Anglais','Français'],[[E('get up'),'se lever'],[E('have breakfast'),'prendre le petit-déjeuner'],[E('go to school'),'aller à l’école'],[E('have lunch'),'déjeuner'],[E('go home'),'rentrer'],[E('do homework'),'faire ses devoirs'],[E('have dinner'),'dîner'],[E('go to bed'),'se coucher']])},{t:'2. Ajouter l’heure',h:`${E('I get up at seven. I go to school at eight.')}`},{t:'3. Avec he/she',h:`${E('She gets up at seven. He goes to school at eight.')}`}],ex:{q:'Raconte trois étapes d’une journée.',s:[`Choisis trois verbes de routine.`,`Mets-les au présent simple.`,`Ajoute éventuellement les heures avec ${E('at')}.`,`${E('I get up at seven, I go to school at eight and I do my homework at five.')} ✅`]},piege:`Avec he/she : ${E('go → goes')}, ${E('do → does')}.`,retenir:['Routine = présent simple.','He/she/it : attention aux formes en -s/-es.']},
'en6t':{hook:'Dire l’heure en anglais devient simple si tu sépares les minutes avant et après la demi-heure.',parts:[{t:'1. Heure pile',h:`${E("It's five o'clock.")} = 5 h 00.`},{t:'2. Après l’heure : PAST',h:`${E('ten past four')} = 4 h 10 ; ${E('quarter past four')} = 4 h 15 ; ${E('half past four')} = 4 h 30.`},{t:'3. Avant l’heure suivante : TO',h:`${E('twenty to five')} = 4 h 40 ; ${E('quarter to five')} = 4 h 45.`}],ex:{q:'Comment dire 5 h 45 ?',s:['Il reste 15 minutes avant 6 h.','15 minutes = quarter.','Avant l’heure suivante = to.',`${E("It's quarter to six.")} ✅`]},piege:`À 4 h 50, on parle de l’heure suivante : ${E('ten to five')}.`,retenir:['past = après l’heure.','to = avant l’heure suivante.','half = 30 min, quarter = 15 min.']},
'en6u':{hook:'La météo est un sujet de conversation courant et un excellent entraînement à la structure IT IS.',parts:[{t:'1. Adjectifs météo',h:V.tbl(['Anglais','Français'],[[E('sunny'),'ensoleillé'],[E('cloudy'),'nuageux'],[E('windy'),'venteux'],[E('rainy'),'pluvieux'],[E('snowy'),'neigeux'],[E('hot'),'chaud'],[E('cold'),'froid']])},{t:'2. Poser la question',h:`${E("What's the weather like?")} = Quel temps fait-il ? Réponse : ${E("It's sunny and warm.")}`},{t:'3. Température',h:`${E("It's ten degrees.")} = Il fait dix degrés.`}],ex:{q:'Décris une journée froide, venteuse et à 5 degrés.',s:[`Commence par ${E("It's")}.`,`Ajoute ${E('cold and windy')}.`,`Température : ${E("It's five degrees.")}`,`${E("It's cold and windy. It's five degrees.")} ✅`]},piege:`On utilise ${E('it')} pour la météo : pas « the weather is sun ».`,retenir:[`${E("What's the weather like?")}`,`${E("It's + adjectif")}.`]},
'en6v':{hook:'Décrire une maison combine vocabulaire, THERE IS/ARE et prépositions de lieu.',parts:[{t:'1. Pièces principales',h:V.tbl(['Anglais','Français'],[[E('kitchen'),'cuisine'],[E('living room'),'salon'],[E('dining room'),'salle à manger'],[E('bedroom'),'chambre'],[E('bathroom'),'salle de bain'],[E('garage'),'garage'],[E('garden'),'jardin']])},{t:'2. Décrire',h:`${E('There is a kitchen downstairs. There are three bedrooms upstairs.')}`},{t:'3. Situer',h:`${E('My bedroom is next to the bathroom.')}`}],ex:{q:'Décris une maison avec un salon, une cuisine et deux chambres.',s:[`Singulier : ${E('There is a living room and a kitchen.')}`,`Pluriel : ${E('There are two bedrooms.')}`,`Tu peux ajouter ${E('upstairs / downstairs')}. ✅`]},piege:`${E('room')} signifie « pièce/chambre » selon le contexte ; ${E('bedroom')} désigne précisément une chambre à coucher.`,retenir:['There is + singulier.','There are + pluriel.']},
'en6w':{hook:'Les vêtements sont parfaits pour revoir couleurs, adjectifs et BE + -ING dans une phrase simple.',parts:[{t:'1. Vocabulaire',h:V.tbl(['Anglais','Français'],[[E('T-shirt'),'tee-shirt'],[E('jumper'),'pull'],[E('trousers'),'pantalon'],[E('jeans'),'jean'],[E('skirt'),'jupe'],[E('dress'),'robe'],[E('shoes'),'chaussures'],[E('trainers'),'baskets']])},{t:'2. Couleur + vêtement',h:`${E('a red dress')}, ${E('black jeans')}, ${E('white trainers')}.`},{t:'3. Ce que quelqu’un porte',h:`${E('I am wearing… / She is wearing…')}`}],ex:{q:'Décris : « Elle porte un pull bleu et un jean noir. »',s:[`« elle » = ${E('she')}.`,`Structure : ${E('is wearing')}.`,`Couleurs avant les noms.`,`${E('She is wearing a blue jumper and black jeans.')} ✅`]},piege:`${E('trousers')} et ${E('jeans')} sont généralement pluriels en anglais.`,retenir:[`${E('be + wearing')} pour dire ce que l’on porte.`]},
'en6x':{hook:'Le vocabulaire de la nourriture sert à parler de ses goûts et à commander poliment.',parts:[{t:'1. Aliments fréquents',h:V.tbl(['Anglais','Français'],[[E('bread'),'pain'],[E('rice'),'riz'],[E('pasta'),'pâtes'],[E('cheese'),'fromage'],[E('chicken'),'poulet'],[E('vegetables'),'légumes'],[E('fruit'),'fruit']])},{t:'2. Boissons',h:`${E('water, milk, juice, tea, hot chocolate')}.`},{t:'3. Commander',h:`${E("I'd like a sandwich and some water, please.")} est une formule simple et polie.`}],ex:{q:'Commande un sandwich et un jus.',s:[`Commence par ${E("I'd like…")}.`,`Ajoute les deux éléments avec ${E('and')}.`,`Termine par ${E('please')}.`,`${E("I'd like a sandwich and a juice, please.")} ✅`]},piege:`${E("I'd like")} signifie « je voudrais » et est plus poli que ${E('I want')}.`,retenir:[`${E("I'd like… please")}`]},
'en6y':{hook:'Le corps humain sert à se décrire, à parler de santé et à revoir certains pluriels irréguliers.',parts:[{t:'1. Tête et visage',h:`${E('head, hair, eye, ear, nose, mouth, tooth')}.`},{t:'2. Corps',h:`${E('arm, hand, finger, leg, knee, foot')}.`},{t:'3. Pluriels utiles',h:V.tbl(['Singulier','Pluriel'],[[E('foot'),E('feet')],[E('tooth'),E('teeth')]])}],ex:{q:'Décris « deux yeux, deux oreilles et deux pieds ».',s:[`${E('two eyes')}.`,`${E('two ears')}.`,`Foot est irrégulier → ${E('two feet')}.`,`Phrase : ${E('I have got two eyes, two ears and two feet.')} ✅`]},piege:`Ne dis pas ${E('foots')} ni ${E('tooths')}.`,retenir:[`${E('foot → feet')}, ${E('tooth → teeth')}.`]},
'en6z':{hook:'Décrire un animal mélange vocabulaire, HAVE GOT et CAN.',parts:[{t:'1. Animaux familiers',h:`${E('dog, cat, rabbit, hamster, fish, bird')}.`},{t:'2. Animaux sauvages',h:`${E('lion, tiger, elephant, monkey, giraffe, crocodile')}.`},{t:'3. Décrire son corps',h:`${E('It has got four legs, a long tail and brown eyes.')}`},{t:'4. Dire ce qu’il sait faire',h:`${E('It can run. It can swim. It cannot fly.')}`}],ex:{q:'Décris un chien en deux phrases.',s:[`Corps : utilise ${E('has got')}.`,`Capacité : utilise ${E('can')}.`,`${E('It has got four legs and brown eyes. It can run and swim.')} ✅`]},piege:`Pour un animal, ${E('it')} est très fréquent quand on ne précise pas le sexe.`,retenir:['It has got… = description.','It can… = capacité.']},
'en6aa':{hook:'Le matériel scolaire est l’un des vocabulaires les plus utiles pour comprendre les consignes en classe.',parts:[{t:'1. Dans la trousse',h:`${E('pen, pencil, ruler, rubber, pencil case')}.`},{t:'2. Dans le cartable et la salle',h:`${E('schoolbag, book, exercise book, desk, chair, board')}.`},{t:'3. Demander poliment',h:`${E('Can I borrow your ruler, please?')} ${E('Here you are.')} ${E('Thank you.')}`}],ex:{q:'Demande une règle poliment.',s:[`Permission : ${E('Can I…?')}`,`« emprunter » = ${E('borrow')}.`,`Ajoute ${E('please')}.`,`${E('Can I borrow your ruler, please?')} ✅`]},piege:`${E('borrow')} = emprunter ; ${E('lend')} = prêter.`,retenir:[`${E('Can I borrow…?')} pour emprunter.`]},
'en6ab':{hook:'Pays et nationalités permettent de parler de son origine et de rencontrer des personnes du monde entier.',parts:[{t:'1. Quelques couples',h:V.tbl(['Pays','Nationalité'],[[E('France'),E('French')],[E('England'),E('English')],[E('Spain'),E('Spanish')],[E('Italy'),E('Italian')],[E('Germany'),E('German')],[E('Ireland'),E('Irish')]])},{t:'2. Pays ou nationalité ?',h:`Origine : ${E("I'm from France.")} Nationalité : ${E("I'm French.")}`},{t:'3. Poser la question',h:`${E('Where are you from?')} = D’où viens-tu ?`}],ex:{q:'Réponds pour une personne venant d’Espagne.',s:[`Pays : ${E('Spain')}.`,`Nationalité : ${E('Spanish')}.`,`${E("I'm from Spain. I'm Spanish.")} ✅`]},piege:`On dit ${E('from France')} mais ${E('French')} sans « from ».`,retenir:[`${E("I'm from + pays")}.`,`${E("I'm + nationalité")}.`]},
'en6ac':{hook:'Comprendre les consignes anglaises rend les cours beaucoup plus faciles, même avant de connaître toute la grammaire.',parts:[{t:'1. Actions fréquentes',h:V.tbl(['Consigne','Sens'],[[E('Open your book.'),'Ouvre ton livre.'],[E('Close your book.'),'Ferme ton livre.'],[E('Listen.'),'Écoute.'],[E('Repeat.'),'Répète.'],[E('Read.'),'Lis.'],[E('Write.'),'Écris.'],[E('Look at the board.'),'Regarde le tableau.'],[E('Work in pairs.'),'Travaillez par deux.']])},{t:'2. L’impératif',h:`Une consigne utilise souvent directement la base verbale : ${E('Open, read, write, listen')}.`},{t:'3. Politesse',h:`Le professeur peut ajouter ${E('please')}.`}],ex:{q:'Que fais-tu si tu entends « Open your book and read exercise four » ?',s:[`${E('Open your book')} = ouvre ton livre.`,`${E('read exercise four')} = lis l’exercice 4.`,`Tu ouvres donc le livre et tu lis l’exercice 4. ✅`]},piege:`Une consigne n’a généralement pas besoin de sujet « you » devant le verbe.`,retenir:['Base verbale = ordre simple.','Apprendre les consignes comme des blocs.']},
'en6ad':{hook:'Savoir poser des questions transforme un vocabulaire passif en vraie conversation.',parts:[{t:'1. Avec BE',h:`${E('You are French. → Are you French?')} On place BE devant le sujet.`},{t:'2. Avec CAN',h:`${E('You can swim. → Can you swim?')}`},{t:'3. Mots interrogatifs',h:V.tbl(['Mot','Sens','Exemple'],[[E('What'),'quoi / quel',E('What is your name?')],[E('Where'),'où',E('Where are you from?')],[E('Who'),'qui',E('Who is she?')],[E('When'),'quand',E('When is your birthday?')],[E('How'),'comment',E('How are you?')]])},{t:'4. Questions très utiles',h:`${E('How old are you?')} ${E('What time is it?')} ${E("What's the weather like?")}`}],ex:{q:'Construis « D’où viens-tu ? »',s:[`Mot interrogatif : ${E('Where')}.`,`Avec BE, place ${E('are')} avant le sujet ${E('you')}.`,`Ajoute ${E('from')}.`,`${E('Where are you from?')} ✅`]},piege:`Avec BE et CAN, pas besoin de DO dans les questions de ce niveau.`,retenir:['Mot interrogatif + auxiliaire/verbe + sujet.','BE et CAN passent devant le sujet.']},

'en5a':{hook:'Tous les samedis, ton frère joue au foot ? Les habitudes se disent au présent simple.',
 parts:[{t:'La règle du -s',h:`Avec ${E('he, she, it')} : verbe + s.<br>${E('I play, you play, she plays, they play')}.`},
  {t:'L’orthographe',h:V.tbl(['Fin du verbe','Ajout','Exemple'],[['s, sh, ch, x, o','es',E('watches, goes')],['consonne + y','ies',E('studies')],[E('have'),'',E('has')]])}],
 ex:{q:`${E('My sister ___ (watch) TV every day.')}`,s:['Sujet : my sister = she.','Donc on ajoute un s.',`watch finit par ch : ${E('watches')} ✅`]},
 piege:`Le -s ne va qu’au verbe avec he, she, it : ${E('they plays')} est faux.`,
 retenir:['He, she, it : -s.','Habitudes, vérités générales.']},
'en5b':{hook:'Pour dire ce que tu NE fais PAS, ou poser une question, il te faut un petit assistant : DO.',
 parts:[{t:'La négation',h:`${E('I don’t like coffee.')}<br>${E('She doesn’t like coffee.')} (le s passe sur ${E('does')})`},
  {t:'La question',h:`${E('Do you like pizza?')} ${E('Yes, I do.')}<br>${E('Does he play tennis?')} ${E('No, he doesn’t.')}`}],
 ex:{q:`Négatif de ${E('He plays tennis.')}`,s:[`He → ${E('doesn’t')}.`,`Le verbe perd son s : ${E('play')}.`,`${E('He doesn’t play tennis.')} ✅`]},
 piege:`Un seul s ! ${E('Does she likes')} est faux : ${E('Does she like')}.`,
 retenir:[`${E('don’t / doesn’t')} + verbe nu.`,`${E('Do / Does')} + sujet + verbe nu.`]},
'en5c':{hook:`Regarde ! Ton chat est en train de dormir sur ton lit. ${E('Look! The cat is sleeping!')}`,
 parts:[{t:'La construction',h:`BE + verbe + ING : ${E('I am reading, she is reading, they are reading')}.`},
  {t:'L’orthographe de -ING',h:V.tbl(['Cas','Exemple'],[['e muet : on l’enlève',E('make → making')],['consonne doublée',E('swim → swimming')],['ie → y',E('lie → lying')]])}],
 ex:{q:'Traduis « Ils sont en train de nager »',s:[`Ils → ${E('they are')}.`,`nager → ${E('swim')} → ${E('swimming')} (m doublé).`,`${E('They are swimming.')} ✅`]},
 piege:`Ne pas oublier BE : « I reading » est faux, il faut ${E('I am reading')}.`,
 retenir:['BE + verbe-ING.','Action en cours, maintenant.']},
'en5d':{hook:'« Je marche » peut se dire de deux façons en anglais. Tout dépend du moment !',
 parts:[{t:'Les marqueurs',h:V.tbl(['Présent simple','BE + -ING'],[[E('every day'),E('now')],[E('usually'),E('at the moment')],[E('often, never'),E('Look! Listen!')]])}],
 ex:{q:`${E('Look! It ___ (snow).')}`,s:[`${E('Look!')} : l’action se passe sous nos yeux.`,'Donc BE + ING.',`${E('It is snowing.')} ✅`]},
 piege:`${E('I am liking')} est faux : like, love, know, want ne se mettent pas en -ING.`,
 retenir:['Habitude : présent simple.','En ce moment : BE + -ING.']},
'en5e':{hook:'Toujours, souvent, jamais : ces petits mots disent à quelle fréquence tu fais les choses.',
 parts:[{t:'Du plus au moins souvent',h:`${V.bar(5,5,'always 100 %')}${E('always, usually, often, sometimes, rarely, never')}`},
  {t:'La place',h:`Avant le verbe : ${E('I always eat breakfast.')}<br>Après BE : ${E('She is always late.')}`}],
 ex:{q:'Place « often » : I go to the cinema',s:['Le verbe est go (pas BE).','L’adverbe se place devant.',`${E('I often go to the cinema.')} ✅`]},
 piege:`Avec BE, l’adverbe passe après : ${E('He is never tired')}, pas « he never is ».`,
 retenir:['Avant le verbe.','Après BE.']},
'en5f':{hook:'Décris ta chambre : il y a un lit, deux fenêtres, un chat sous la table…',
 parts:[{t:'There is, there are',h:`${E('There is')} + singulier : ${E('There is a bed.')}<br>${E('There are')} + pluriel : ${E('There are two windows.')}`},
  {t:'Les prépositions',h:V.tbl(['Anglais','Français'],[[E('in'),'dans'],[E('on'),'sur'],[E('under'),'sous'],[E('behind'),'derrière'],[E('next to'),'à côté de'],[E('between'),'entre']])}],
 ex:{q:'Traduis « Il y a un chat sous la table »',s:[`Un chat → singulier → ${E('There is')}.`,`sous → ${E('under')}.`,`${E('There is a cat under the table.')} ✅`]},
 piege:`${E('There are')} pour le pluriel, même avec « il y a » au singulier en français.`,
 retenir:[`${E('There is')} + 1, ${E('There are')} + plusieurs.`,`Question : ${E('Is there…? Are there…?')}`]},
'en5g':{hook:'Fais ta liste de courses en anglais : du pain, des pommes, pas de lait…',
 parts:[{t:'SOME ou ANY',h:`${E('some')} : phrase affirmative. ${E('I have some apples.')}<br>${E('any')} : négation et question. ${E('Have you got any milk?')}`},
  {t:'MUCH ou MANY',h:`${E('many')} + ce qui se compte : ${E('many apples')}.<br>${E('much')} + ce qui ne se compte pas : ${E('much water')}.`}],
 ex:{q:`${E('How ___ apples do you want?')}`,s:['Les pommes se comptent (one, two…).',`Dénombrable → ${E('many')}.`,`${E('How many apples?')} ✅`]},
 piege:`${E('bread, water, milk, money')} ne se comptent pas : jamais de s, et ${E('much')}.`,
 retenir:[`${E('some')} affirmatif, ${E('any')} négatif ou question.`,`${E('many')} comptable, ${E('much')} non comptable.`]},
'en5h':{hook:'Un bon détective sait poser les bonnes questions : où, quand, qui, pourquoi ? 🕵️',
 parts:[{t:'Les mots en WH',h:V.tbl(['Anglais','Français'],[[E('What'),'quoi, que'],[E('Where'),'où'],[E('When'),'quand'],[E('Who'),'qui'],[E('Why'),'pourquoi'],[E('How'),'comment']])},
  {t:'Construire la question',h:`Mot interrogatif + auxiliaire + sujet + verbe.<br>${E('Where do you live?')}`}],
 ex:{q:'Traduis « Pourquoi es-tu triste ? »',s:[`pourquoi → ${E('Why')}.`,`es-tu → ${E('are you')} (on inverse).`,`${E('Why are you sad?')} ✅`]},
 piege:`On répond à ${E('Why')} avec ${E('Because…')}.`,
 retenir:['Le mot en WH se place en premier.','Puis auxiliaire + sujet.']},
'en5i':{hook:`À qui est ce sac ? ${E('Whose bag is this?')} C’est le mien ! ${E('It’s mine!')}`,
 parts:[{t:'Adjectif ou pronom ?',h:V.tbl(['Adjectif + nom','Pronom seul'],[[E('my book'),E('mine')],[E('your book'),E('yours')],[E('his book'),E('his')],[E('her book'),E('hers')],[E('our book'),E('ours')],[E('their book'),E('theirs')]])}],
 ex:{q:'Traduis « Ce stylo est à elle »',s:['à elle → pronom possessif féminin.',`${E('hers')}, sans apostrophe.`,`${E('This pen is hers.')} ✅`]},
 piege:`Jamais d’apostrophe : ${E('yours, hers, ours')}, pas « your’s ».`,
 retenir:['Le pronom remplace le nom.',`${E('Whose…?')} = à qui ?`]},
'en5j':{hook:'Ton bus part à quelle heure ? Ton film commence quand ? En anglais, on dit l’heure autrement.',
 parts:[{t:'Les repères',h:V.tbl(['Heure','Anglais'],[['3:00',E('three o’clock')],['3:15',E('quarter past three')],['3:30',E('half past three')],['3:45',E('quarter to four')]])},
  {t:'Les minutes',h:`Avant la demie : ${E('past')} (après). ${E('ten past four')} = 4 h 10.<br>Après la demie : ${E('to')} (avant). ${E('ten to five')} = 4 h 50.`}],
 ex:{q:'Dis 7 h 40',s:['40 minutes : après la demie, donc to.','Il manque 20 minutes pour 8 h.',`${E('It’s twenty to eight.')} ✅`]},
 piege:`Avec ${E('to')}, on annonce l’heure suivante : 7 h 45 = ${E('quarter to eight')}.`,
 retenir:[`${E('past')} avant la demie, ${E('to')} après.`,`${E('What time is it?')}`]},
'en4a':{hook:'Hier, tu étais où ? Fatiguée ? En vacances ? Pour le dire : WAS et WERE.',
 parts:[{t:'Les formes',h:V.tbl(['Sujet','Passé de BE'],[[E('I / he / she / it'),E('was')],[E('you / we / they'),E('were')]])},
  {t:'Négation et question',h:`${E('I wasn’t tired.')} ${E('Were you at home?')}`}],
 ex:{q:'Traduis « Nous étions à Londres »',s:[`nous → ${E('we')} → ${E('were')}.`,`à Londres → ${E('in London')}.`,`${E('We were in London.')} ✅`]},
 piege:`${E('you')} prend toujours ${E('were')}, même pour une seule personne.`,
 retenir:[`${E('was')} : I, he, she, it.`,`${E('were')} : you, we, they.`]},
'en4b':{hook:'Raconte ton week-end : tu as joué, regardé un film, rendu visite à ta mamie…',
 parts:[{t:'La règle',h:`Verbe + ED, pour tous les sujets : ${E('I played, she played, they played')}.`},
  {t:'L’orthographe',h:V.tbl(['Cas','Exemple'],[['e final : + d',E('like → liked')],['consonne + y : ied',E('study → studied')],['consonne doublée',E('stop → stopped')]])}],
 ex:{q:`${E('Last week, we ___ (visit) London.')}`,s:['Last week : passé terminé, prétérit.','visit est régulier : + ed.',`${E('We visited London.')} ✅`]},
 piege:`${E('play → played')} : voyelle + y garde le y.`,
 retenir:['Verbe + ED, même forme pour tous.',`Marqueurs : ${E('yesterday, last, ago')}.`]},
'en4c':{hook:'Les verbes les plus utilisés sont… irréguliers ! Bonne nouvelle : il n’y en a qu’une cinquantaine à connaître.',
 parts:[{t:'Les incontournables',h:V.tbl(['Base','Prétérit','Français'],[[E('go'),E('went'),'aller'],[E('see'),E('saw'),'voir'],[E('eat'),E('ate'),'manger'],[E('have'),E('had'),'avoir'],[E('do'),E('did'),'faire'],[E('buy'),E('bought'),'acheter']])},
  {t:'La méthode',h:V.steps(['Apprends 5 verbes par jour.','Récite-les à voix haute (clique pour écouter).','Écris-les dans ton brouillon.'])}],
 ex:{q:`${E('Yesterday I ___ (go) to the park.')}`,s:['go est irrégulier.',`Prétérit de go : ${E('went')}.`,`${E('Yesterday I went to the park.')} ✅`]},
 piege:`« goed » n’existe pas : c’est ${E('went')}.`,
 retenir:['Pas de -ED pour les irréguliers.','La liste s’apprend par cœur.']},
'en4d':{hook:'« Je ne suis pas allée », « Tu as vu ? » : au passé, l’assistant s’appelle DID.',
 parts:[{t:'Négation',h:`${E('didn’t')} + base verbale : ${E('I didn’t go.')}`},{t:'Question',h:`${E('Did')} + sujet + base : ${E('Did you see the film?')} ${E('Yes, I did.')}`}],
 ex:{q:`Négatif de ${E('She ate the cake.')}`,s:[`On ajoute ${E('didn’t')}.`,`Le verbe revient à la base : ${E('eat')}.`,`${E('She didn’t eat the cake.')} ✅`]},
 piege:`Le passé est déjà dans did : « didn’t went » est faux.`,
 retenir:[`${E('didn’t')} + base.`,`${E('Did')} + sujet + base ?`]},
'en4e':{hook:'Qui est le plus grand ? Le plus rapide ? Comparer, c’est la base de tous les débats !',
 parts:[{t:'Adjectifs courts',h:`${E('tall → taller than → the tallest')}<br>${E('big → bigger → the biggest')} ; ${E('happy → happier → the happiest')}`},
  {t:'Adjectifs longs',h:`${E('beautiful → more beautiful than → the most beautiful')}${V.tip(`Irréguliers : ${E('good, better, the best')} ; ${E('bad, worse, the worst')}.`)}`}],
 ex:{q:'Traduis « Paris est plus grand que Lyon »',s:[`grand → ${E('big')} (court).`,`${E('bigger than')} (g doublé).`,`${E('Paris is bigger than Lyon.')} ✅`]},
 piege:'Jamais « more bigger » : c’est -er OU more, pas les deux.',
 retenir:['Court : -er / -est.','Long : more / most.']},
'en4f':{hook:'Demain, l’année prochaine, plus tard : parler de ses projets et de ses prédictions.',
 parts:[{t:'WILL',h:`${E('will')} + base : prédiction ou décision sur le moment. ${E('It will rain.')} ${E('I’ll help you!')}`},
  {t:'GOING TO',h:`BE + ${E('going to')} + base : projet déjà décidé. ${E('I’m going to visit Rome this summer.')}`}],
 ex:{q:'Traduis « Je vais jouer au tennis demain » (projet)',s:['C’est un projet déjà prévu.',`BE going to : ${E('I am going to play')}.`,`${E('I am going to play tennis tomorrow.')} ✅`]},
 piege:`Après ${E('will')}, jamais de to ni de s : ${E('she will go')}.`,
 retenir:[`${E('will')} + base.`,`${E('am / is / are going to')} + base.`]},
'en4g':{hook:'Les règles du collège en anglais : ce qui est obligatoire, interdit, ou facultatif.',
 parts:[{t:'Trois sens différents',h:V.tbl(['Anglais','Sens'],[[E('must / have to'),'obligation'],[E('mustn’t'),'interdiction'],[E('don’t have to'),'pas obligé']])}],
 ex:{q:'Traduis « Tu ne dois pas courir ici »',s:['C’est une interdiction.',`Interdiction → ${E('mustn’t')}.`,`${E('You mustn’t run here.')} ✅`]},
 piege:`${E('mustn’t')} (interdit) ≠ ${E('don’t have to')} (pas obligé).`,
 retenir:[`${E('must')} : obligation.`,`${E('mustn’t')} : interdit.`]},
'en4h':{hook:'Que faisais-tu quand le téléphone a sonné ? Pour une action en cours dans le passé : WAS / WERE + ING.',
 parts:[{t:'La construction',h:`${E('was / were')} + verbe-ING.<br>${E('At 8 pm, I was watching TV.')}`},
  {t:'Avec WHEN',h:`L’action longue : was + ING. L’action courte : prétérit.<br>${E('I was reading when the phone rang.')}`}],
 ex:{q:'Traduis « Ils regardaient la télé »',s:[`ils → ${E('they')} → ${E('were')}.`,`regarder → ${E('watching')}.`,`${E('They were watching TV.')} ✅`]},
 piege:'L’action qui interrompt reste au prétérit simple.',
 retenir:['was / were + ING.','Action en cours dans le passé.']},
'en4i':{hook:'Je l’aime, appelle-le, regarde-les : les pronoms compléments évitent les répétitions.',
 parts:[{t:'Sujet ou complément ?',h:V.tbl(['Sujet','Complément'],[[E('I'),E('me')],[E('he'),E('him')],[E('she'),E('her')],[E('we'),E('us')],[E('they'),E('them')]])}],
 ex:{q:'Traduis « Appelle-moi ! »',s:['moi est complément.',`${E('me')}.`,`${E('Call me!')} ✅`]},
 piege:`Après une préposition aussi : ${E('with me, for him')}.`,
 retenir:['Après le verbe : pronom complément.',`${E('me, him, her, us, them')}.`]},
'en4j':{hook:'Tes passions, tes sports, ce que tu détestes : parle de tes loisirs !',
 parts:[{t:'Aimer + ING',h:`${E('I love reading.')} ${E('She hates cooking.')}<br>Après ${E('like, love, hate, enjoy')} : verbe-ING.`},
  {t:'PLAY, GO, DO',h:`${E('play')} + sport de balle : ${E('play football')}.<br>${E('go')} + activité en -ING : ${E('go swimming')}.`}],
 ex:{q:'Traduis « J’adore nager »',s:[`adorer → ${E('love')}.`,`nager → ${E('swimming')} (+ ING).`,`${E('I love swimming.')} ✅`]},
 piege:`Après ${E('enjoy')}, toujours ING : ${E('I enjoy reading')}.`,
 retenir:['love, like, hate + ING.',`${E('play')} football, ${E('go')} skiing.`]},
'en3a':{hook:'As-tu déjà vu la neige ? Visité Londres ? Pour parler d’expériences : le present perfect.',
 parts:[{t:'La construction',h:`${E('have / has')} + participe passé.<br>${E('I have visited London.')} ${E('She has seen snow.')}`},
  {t:'Les mots-clés',h:V.tbl(['Anglais','Français'],[[E('ever'),'déjà (question)'],[E('never'),'jamais'],[E('already'),'déjà'],[E('just'),'venir de'],[E('yet'),'encore, déjà']])}],
 ex:{q:'Traduis « Je n’ai jamais mangé de sushis »',s:[`jamais → ${E('never')}.`,`manger → ${E('eat, ate, eaten')}.`,`${E('I have never eaten sushi.')} ✅`]},
 piege:'Pas de date précise avec le present perfect.',
 retenir:['have / has + participe passé.','Expérience, bilan.']},
'en3b':{hook:'« J’habite ici depuis 2015 » se dit au present perfect, mais « il y a 3 ans » au prétérit !',
 parts:[{t:'FOR et SINCE',h:`${E('since')} + point de départ : ${E('since 2015, since Monday')}.<br>${E('for')} + durée : ${E('for three years')}.`},
  {t:'AGO',h:`${E('ago')} + prétérit : ${E('I moved here ten years ago.')}`}],
 ex:{q:`${E('I have lived here ___ 2015.')}`,s:['2015 est un point de départ.',`Donc ${E('since')}.`,`${E('I have lived here since 2015.')} ✅`]},
 piege:`Avec une date précise ou ${E('ago')}, on utilise le prétérit.`,
 retenir:[`${E('since')} + date, ${E('for')} + durée.`,`${E('ago')} + prétérit.`]},
'en3c':{hook:'La 3e colonne du tableau des verbes irréguliers : c’est elle qui sert au present perfect et au passif.',
 parts:[{t:'Les plus utiles',h:V.tbl(['Base','Prétérit','Participe'],[[E('go'),E('went'),E('gone')],[E('see'),E('saw'),E('seen')],[E('write'),E('wrote'),E('written')],[E('take'),E('took'),E('taken')],[E('eat'),E('ate'),E('eaten')]])}],
 ex:{q:`${E('I have ___ (write) a letter.')}`,s:['Present perfect : participe passé.',`write, wrote, ${E('written')}.`,`${E('I have written a letter.')} ✅`]},
 piege:`${E('I have went')} est faux : ${E('I have gone')}.`,
 retenir:['have + 3e colonne.','Récite base, prétérit, participe.']},
'en3d':{hook:'S’il pleut, on restera à la maison. Une condition réaliste, une conséquence probable.',
 parts:[{t:'La construction',h:`${E('If')} + présent, ${E('will')} + base.<br>${E('If it rains, we will stay at home.')}`}],
 ex:{q:`${E('If you ___ (study), you will pass.')}`,s:[`Après ${E('if')} : présent.`,`${E('you study')}.`,`${E('If you study, you will pass.')} ✅`]},
 piege:`Jamais ${E('will')} juste après ${E('if')}.`,
 retenir:['If + présent.','Will + base dans l’autre partie.']},
'en3e':{hook:'Si j’étais riche, si je gagnais au loto… Pour imaginer : IF + prétérit, WOULD.',
 parts:[{t:'La construction',h:`${E('If')} + prétérit, ${E('would')} + base.<br>${E('If I won the lottery, I would travel.')}`},
  {t:'Avec BE',h:`On dit ${E('If I were…')} pour tous les sujets (${E('was')} est toléré à l’oral).`}],
 ex:{q:'Traduis « Si j’avais un chien, je le promènerais »',s:[`avoir → prétérit ${E('had')}.`,`${E('would walk')}.`,`${E('If I had a dog, I would walk it.')} ✅`]},
 piege:`Pas de ${E('would')} après ${E('if')}.`,
 retenir:['If + prétérit.','Would + base.']},
'en3f':{hook:'La tour Eiffel a été construite en 1889. Ce qui compte, c’est la tour, pas l’ouvrier : c’est le passif.',
 parts:[{t:'La construction',h:`BE + participe passé.<br>Présent : ${E('English is spoken here.')}<br>Prétérit : ${E('The tower was built in 1889.')}`},
  {t:'L’agent',h:`Celui qui fait l’action, avec ${E('by')} : ${E('painted by Leonardo')}.`}],
 ex:{q:'Traduis « Ce livre a été écrit par J. K. Rowling »',s:['Passé : was.',`write → ${E('written')}.`,`${E('This book was written by J. K. Rowling.')} ✅`]},
 piege:'BE se conjugue au temps de la phrase : is, was, are, were.',
 retenir:['BE + participe passé.',`${E('by')} + auteur.`]},
'en3g':{hook:'« La fille QUI habite à côté », « le livre QUE j’ai lu » : les relatifs relient deux phrases.',
 parts:[{t:'Les relatifs',h:V.tbl(['Anglais','Pour'],[[E('who'),'une personne'],[E('which'),'une chose'],[E('that'),'les deux'],[E('whose'),'dont, à qui'],[E('where'),'un lieu']])}],
 ex:{q:`${E('That’s the boy ___ father is a pilot.')}`,s:['Le père DU garçon : possession.',`${E('whose')}.`,`${E('That’s the boy whose father is a pilot.')} ✅`]},
 piege:`${E('who')} pour une personne, jamais ${E('which')}.`,
 retenir:[`${E('who')} personne, ${E('which')} chose.`,`${E('whose')} possession.`]},
'en3h':{hook:'Donner un conseil, envisager une possibilité : les modaux nuancent ta pensée.',
 parts:[{t:'Les modaux',h:V.tbl(['Anglais','Sens'],[[E('should'),'conseil'],[E('shouldn’t'),'déconseillé'],[E('might / may'),'peut-être'],[E('could'),'capacité passée, politesse']])}],
 ex:{q:'Traduis « Tu devrais te reposer »',s:['C’est un conseil.',`${E('should')} + base.`,`${E('You should rest.')} ✅`]},
 piege:`Comme ${E('can')}, pas de s et pas de to : ${E('she should go')}.`,
 retenir:[`${E('should')} = conseil.`,`${E('might')} = peut-être.`]},
'en3i':{hook:'Quand tu étais petite, tu regardais des dessins animés ? Les habitudes d’avant : USED TO.',
 parts:[{t:'La construction',h:`${E('used to')} + base : ${E('I used to play with dolls.')}<br>Négation : ${E('I didn’t use to…')}`}],
 ex:{q:'Traduis « J’habitais à Lyon »',s:['Habitude passée, plus vraie aujourd’hui.',`${E('used to live')}.`,`${E('I used to live in Lyon.')} ✅`]},
 piege:`Après ${E('didn’t')}, on écrit ${E('use to')} (sans d).`,
 retenir:['Habitude terminée.',`${E('used to')} + base.`]},
'en3j':{hook:'Pour écrire un vrai paragraphe, il faut relier ses idées. Les mots de liaison sont la colle du texte.',
 parts:[{t:'Les plus utiles',h:V.tbl(['Anglais','Français'],[[E('and / but'),'et / mais'],[E('so'),'donc'],[E('because'),'parce que'],[E('however'),'cependant'],[E('although'),'bien que'],[E('first, then, finally'),'d’abord, ensuite, enfin']])}],
 ex:{q:'Relie : It was cold. We went swimming.',s:['Les deux idées s’opposent.',`${E('although')} = bien que.`,`${E('Although it was cold, we went swimming.')} ✅`]},
 piege:`${E('so')} (conséquence) ≠ ${E('because')} (cause).`,
 retenir:['Cause : because. Conséquence : so.','Opposition : but, however, although.']},

/* ===== Cours d'italien ===== */
'it5a':{hook:`${IT('Ciao!')} L’italien ressemble beaucoup au français : tu vas comprendre très vite.`,
 parts:[{t:'Saluer',h:V.tbl(['Italien','Français'],[[IT('Ciao'),'salut, au revoir'],[IT('Buongiorno'),'bonjour'],[IT('Buonasera'),'bonsoir'],[IT('Arrivederci'),'au revoir'],[IT('Grazie'),'merci']])},
  {t:'Se présenter',h:V.steps([`${IT('Mi chiamo Léa.')} Je m’appelle Léa.`,`${IT('Ho dodici anni.')} J’ai douze ans.`,`${IT('Sono francese.')} Je suis française.`])}],
 ex:{q:`Réponds à ${IT('Come ti chiami?')}`,s:[`${IT('Come ti chiami?')} = Comment t’appelles-tu ?`,`On répond avec ${IT('Mi chiamo')} + prénom.`,`${IT('Mi chiamo Léa.')} ✅`]},
 piege:`${IT('Ciao')} est familier : à un adulte, dis ${IT('Buongiorno')}.`,
 retenir:[`${IT('Mi chiamo…')}`,`${IT('Come stai? Sto bene.')}`]},
'it5b':{hook:'Pizza à 9 euros, bus numéro 23 : en Italie, les nombres sont partout !',
 parts:[{t:'De 0 à 20',h:V.tbl(['Nombre','Italien'],[['1',IT('uno')],['2',IT('due')],['3',IT('tre')],['10',IT('dieci')],['11',IT('undici')],['16',IT('sedici')],['17',IT('diciassette')],['20',IT('venti')]])},
  {t:'Les dizaines',h:`${IT('venti, trenta, quaranta…')}<br>Devant ${IT('uno')} et ${IT('otto')}, la voyelle tombe : ${IT('ventuno, ventotto')}.<br>${IT('tre')} prend un accent : ${IT('ventitré')}.`}],
 ex:{q:'Écris 38 en italien',s:[`30 = ${IT('trenta')}.`,`8 = ${IT('otto')} : on enlève le a.`,`${IT('trentotto')} ✅`]},
 piege:`Pour l’âge, on utilise avere : ${IT('Ho dodici anni')}, comme en français.`,
 retenir:['La voyelle tombe devant uno et otto.','Un seul mot, sans tiret.']},
'it5c':{hook:'En italien, il y a 7 articles définis ! Ça paraît beaucoup, mais il y a une logique.',
 parts:[{t:'Le tableau',h:V.tbl(['','Singulier','Pluriel'],[['Masculin (cas général)',IT('il libro'),IT('i libri')],['Masc. : s + consonne, z',IT('lo zaino'),IT('gli zaini')],['Masc. : voyelle',IT('l’amico'),IT('gli amici')],['Féminin',IT('la casa'),IT('le case')],['Fém. : voyelle',IT('l’amica'),IT('le amiche')]])}],
 ex:{q:`Article de ${IT('studente')} ?`,s:['Masculin, commence par s + consonne.',`Donc ${IT('lo')}.`,`${IT('lo studente')}, pluriel ${IT('gli studenti')} ✅`]},
 piege:`${IT('gli')} sert pour lo ET l’ masculin au pluriel.`,
 retenir:['Regarde la 1re lettre.','lo et gli devant s + consonne, z, voyelle.']},
'it5d':{hook:`${IT('Essere o non essere')} : le verbe être est le plus important de la langue.`,
 parts:[{t:'Le présent',h:V.tbl(['Sujet','Essere'],[[IT('io'),IT('sono')],[IT('tu'),IT('sei')],[IT('lui, lei'),IT('è')],[IT('noi'),IT('siamo')],[IT('voi'),IT('siete')],[IT('loro'),IT('sono')]])+V.tip('On enlève souvent le pronom : Sono = je suis.')}],
 ex:{q:'Traduis « Nous sommes à l’école »',s:[`nous → ${IT('siamo')}.`,`à l’école → ${IT('a scuola')}.`,`${IT('Siamo a scuola.')} ✅`]},
 piege:`${IT('è')} (il est) a un accent, ${IT('e')} (et) n’en a pas.`,
 retenir:[`${IT('sono')} = je suis ET ils sont.`,'Pronom souvent sous-entendu.']},
'it5e':{hook:`Faim, soif, un chien, douze ans : tout ça se dit avec AVERE.`,
 parts:[{t:'Le présent',h:V.tbl(['Sujet','Avere'],[[IT('io'),IT('ho')],[IT('tu'),IT('hai')],[IT('lui, lei'),IT('ha')],[IT('noi'),IT('abbiamo')],[IT('voi'),IT('avete')],[IT('loro'),IT('hanno')]])+V.tip('Le h ne se prononce jamais.')}],
 ex:{q:'Traduis « Tu as faim ? »',s:[`tu → ${IT('hai')}.`,`faim → ${IT('fame')}.`,`${IT('Hai fame?')} ✅`]},
 piege:`${IT('ho')} (j’ai) et ${IT('o')} (ou) se prononcent pareil.`,
 retenir:['ho, hai, ha, abbiamo, avete, hanno.','Faim, soif, âge : avere.']},
'it5f':{hook:'Décris ton cartable et ta trousse… en italien, les couleurs s’accordent comme en français !',
 parts:[{t:'Les objets',h:V.tbl(['Italien','Français'],[[IT('la penna'),'le stylo'],[IT('la matita'),'le crayon'],[IT('il quaderno'),'le cahier'],[IT('lo zaino'),'le cartable'],[IT('la gomma'),'la gomme']])},
  {t:'L’accord',h:`${IT('rosso')} : ${IT('il libro rosso, la penna rossa, i libri rossi, le penne rosse')}.<br>Les adjectifs en -e : ${IT('verde, verdi')}.`}],
 ex:{q:'Traduis « les crayons noirs »',s:[`${IT('matita')} est féminin : ${IT('le matite')}.`,`noir → ${IT('nero')} → féminin pluriel ${IT('nere')}.`,`${IT('le matite nere')} ✅`]},
 piege:`Attention : ${IT('penna')} (stylo) et ${IT('matita')} (crayon) sont féminins.`,
 retenir:['Adjectif après le nom.','-o, -a, -i, -e.']},
'it5g':{hook:'Présente ta famille à un ami italien : les Italiens adorent parler de leur « famiglia » !',
 parts:[{t:'La famille',h:V.tbl(['Italien','Français'],[[IT('la madre / la mamma'),'la mère'],[IT('il padre / il papà'),'le père'],[IT('la sorella'),'la sœur'],[IT('il fratello'),'le frère'],[IT('i nonni'),'les grands-parents']])},
  {t:'Les possessifs',h:`Avec l’article : ${IT('il mio zaino, la mia casa')}.<br>Famille au singulier : sans article. ${IT('mia madre, tuo fratello')}.`}],
 ex:{q:'Traduis « mes frères »',s:['Famille, mais au pluriel.',`Donc l’article revient : ${IT('i miei')}.`,`${IT('i miei fratelli')} ✅`]},
 piege:`${IT('la mia madre')} est faux : pas d’article avec la famille au singulier.`,
 retenir:['Possessif + article en général.','Famille au singulier : pas d’article.']},
'it5h':{hook:'Ton anniversaire, les vacances d’été, le week-end : le calendrier italien.',
 parts:[{t:'Les jours',h:V.tbl(['Italien','Français'],[[IT('lunedì'),'lundi'],[IT('martedì'),'mardi'],[IT('mercoledì'),'mercredi'],[IT('giovedì'),'jeudi'],[IT('venerdì'),'vendredi'],[IT('sabato'),'samedi'],[IT('domenica'),'dimanche']])},
  {t:'Les saisons',h:`${IT('la primavera, l’estate, l’autunno, l’inverno')}`}],
 ex:{q:'Traduis « en été »',s:[`été → ${IT('estate')}.`,`en → ${IT('in')} ou ${IT('d’')}.`,`${IT('in estate')} ✅`]},
 piege:'Jours et mois s’écrivent en minuscules.',
 retenir:['lunedì → venerdì : accent final.','Minuscules.']},
'it4a':{hook:'Parler, chanter, manger : la majorité des verbes italiens finissent en -ARE. Une seule règle à connaître !',
 parts:[{t:'Les terminaisons',h:V.tbl(['Sujet','parlare'],[[IT('io'),IT('parlo')],[IT('tu'),IT('parli')],[IT('lui, lei'),IT('parla')],[IT('noi'),IT('parliamo')],[IT('voi'),IT('parlate')],[IT('loro'),IT('parlano')]])},
  {t:'Les cas spéciaux',h:`-care, -gare : un h devant i. ${IT('giocare → giochi, giochiamo')}.<br>-iare : un seul i. ${IT('mangiare → mangi')}.`}],
 ex:{q:'Conjugue « noi » + giocare',s:['Terminaison noi : -iamo.',`On garde le son dur : ${IT('gioch-')}.`,`${IT('giochiamo')} ✅`]},
 piege:`${IT('loro parlano')} : l’accent tonique est sur la 1re syllabe (PAR-la-no).`,
 retenir:['o, i, a, iamo, ate, ano.','h pour garder le son dur.']},
'it4b':{hook:'Lire, écrire, dormir, finir : les verbes en -ERE et -IRE se ressemblent beaucoup.',
 parts:[{t:'Les terminaisons',h:V.tbl(['Sujet','prendere','dormire'],[[IT('io'),IT('prendo'),IT('dormo')],[IT('tu'),IT('prendi'),IT('dormi')],[IT('lui'),IT('prende'),IT('dorme')],[IT('noi'),IT('prendiamo'),IT('dormiamo')],[IT('voi'),IT('prendete'),IT('dormite')],[IT('loro'),IT('prendono'),IT('dormono')]])},
  {t:'Les verbes en -ISC-',h:`${IT('finire, capire, preferire')} : ${IT('finisco, finisci, finisce, finiamo, finite, finiscono')}.`}],
 ex:{q:'Conjugue « tu » + capire',s:['capire est un verbe en -isc-.',`${IT('cap-')} + ${IT('isci')}.`,`${IT('capisci')} ✅`]},
 piege:'Pas de -isc- avec noi et voi : finiamo, finite.',
 retenir:['-ere : ete. -ire : ite.','-isc- sauf noi et voi.']},
'it4c':{hook:'Une pizza, deux pizze ! En italien, le pluriel change la dernière voyelle.',
 parts:[{t:'Les règles',h:V.tbl(['Singulier','Pluriel','Exemple'],[['-o','-i',IT('libro → libri')],['-a','-e',IT('casa → case')],['-e','-i',IT('studente → studenti')]])},
  {t:'Les invariables',h:`Mots accentués ou étrangers : ${IT('la città → le città, lo sport → gli sport')}.`}],
 ex:{q:`Pluriel de ${IT('amica')} ?`,s:['Finit par -a : devient -e.','On garde le son dur : h.',`${IT('amiche')} ✅`]},
 piege:`${IT('amico → amici')} (son doux) mais ${IT('amica → amiche')} (son dur).`,
 retenir:['-o → -i, -a → -e, -e → -i.','Accent final : invariable.']},
'it4d':{hook:'Un chat, une école, un ami : les articles indéfinis suivent la même logique que lo et la.',
 parts:[{t:'Le tableau',h:V.tbl(['Article','Quand ?','Exemple'],[[IT('un'),'masculin',IT('un libro, un amico')],[IT('uno'),'masc. s + consonne, z',IT('uno zaino')],[IT('una'),'féminin',IT('una casa')],[IT('un’'),'fém. + voyelle',IT('un’amica')]])}],
 ex:{q:`Article de ${IT('isola')} (île, féminin) ?`,s:['Féminin, commence par une voyelle.','Apostrophe.',`${IT('un’isola')} ✅`]},
 piege:`Masculin + voyelle : ${IT('un amico')}, SANS apostrophe.`,
 retenir:['uno comme lo.','Apostrophe seulement au féminin.']},
'it4e':{hook:'« Au cinéma », « sur la table », « dans le jardin » : en italien, préposition et article fusionnent !',
 parts:[{t:'Le tableau',h:V.tbl(['',...['il','lo','la','i','gli','le'].map(IT)],[[IT('di'),IT('del'),IT('dello'),IT('della'),IT('dei'),IT('degli'),IT('delle')],[IT('a'),IT('al'),IT('allo'),IT('alla'),IT('ai'),IT('agli'),IT('alle')],[IT('in'),IT('nel'),IT('nello'),IT('nella'),IT('nei'),IT('negli'),IT('nelle')],[IT('su'),IT('sul'),IT('sullo'),IT('sulla'),IT('sui'),IT('sugli'),IT('sulle')]])}],
 ex:{q:'Traduis « dans la maison »',s:[`dans → ${IT('in')}, la → ${IT('la')}.`,`${IT('in + la = nella')}.`,`${IT('nella casa')} ✅`]},
 piege:`${IT('in')} devient ${IT('ne-')} : nel, nella, nei.`,
 retenir:['Préposition + article = un mot.','in → ne-, di → de-.']},
'it4f':{hook:'Aller, faire, venir : les verbes les plus utiles sont irréguliers. Apprends-les comme une chanson !',
 parts:[{t:'Andare et fare',h:V.tbl(['Sujet','andare','fare'],[[IT('io'),IT('vado'),IT('faccio')],[IT('tu'),IT('vai'),IT('fai')],[IT('lui'),IT('va'),IT('fa')],[IT('noi'),IT('andiamo'),IT('facciamo')],[IT('voi'),IT('andate'),IT('fate')],[IT('loro'),IT('vanno'),IT('fanno')]])}],
 ex:{q:'Traduis « Je vais à l’école »',s:[`je vais → ${IT('vado')}.`,`à l’école → ${IT('a scuola')}.`,`${IT('Vado a scuola.')} ✅`]},
 piege:`${IT('Come stai?')} utilise stare, pas essere.`,
 retenir:['vado, faccio, vengo, sto.','Récite-les à voix haute.']},
'it4g':{hook:'À quelle heure part le train pour Rome ? Apprends à lire l’heure comme un Italien.',
 parts:[{t:'Le principe',h:`${IT('Che ore sono?')} → ${IT('Sono le')} + heure (pluriel).<br>Exception : ${IT('È l’una')} (1 h), ${IT('È mezzogiorno')} (midi).`},
  {t:'Les minutes',h:V.tbl(['Heure','Italien'],[['4:15',IT('le quattro e un quarto')],['4:30',IT('le quattro e mezza')],['4:45',IT('le cinque meno un quarto')]])}],
 ex:{q:'Dis 8 h 30',s:[`${IT('Sono le otto')}.`,`et demie → ${IT('e mezza')}.`,`${IT('Sono le otto e mezza.')} ✅`]},
 piege:`1 h se dit ${IT('È l’una')}, au singulier.`,
 retenir:['Sono le + heure.','e (et), meno (moins).']},
'it4h':{hook:'Pizza, pâtes, gelato : parle de ce que tu aimes manger en italien !',
 parts:[{t:'Mi piace',h:`${IT('Mi piace')} + chose au singulier : ${IT('mi piace la pizza')}.<br>${IT('Mi piacciono')} + pluriel : ${IT('mi piacciono le fragole')}.`},
  {t:'Les pronoms',h:V.tbl(['Français','Italien'],[['j’aime',IT('mi piace')],['tu aimes',IT('ti piace')],['il / elle aime',IT('gli / le piace')],['nous aimons',IT('ci piace')]])}],
 ex:{q:'Traduis « J’aime les spaghettis »',s:['Spaghettis : pluriel.',`${IT('mi piacciono')}.`,`${IT('Mi piacciono gli spaghetti.')} ✅`]},
 piege:'Le verbe s’accorde avec la chose aimée, pas avec la personne.',
 retenir:['piace + singulier.','piacciono + pluriel.']},
'it3a':{hook:'Hier, j’ai mangé une pizza et j’ai vu un film : pour raconter, le passato prossimo !',
 parts:[{t:'La construction',h:`${IT('avere')} au présent + participe passé.<br>${IT('ho mangiato, hai visto, ha letto')}`},
  {t:'Le participe',h:V.tbl(['Infinitif','Participe'],[[IT('-are'),IT('-ato')],[IT('-ere'),IT('-uto')],[IT('-ire'),IT('-ito')],[IT('fare'),IT('fatto')],[IT('vedere'),IT('visto')],[IT('prendere'),IT('preso')]])}],
 ex:{q:'Traduis « Nous avons fini les devoirs »',s:[`nous → ${IT('abbiamo')}.`,`finire → ${IT('finito')}.`,`${IT('Abbiamo finito i compiti.')} ✅`]},
 piege:'Avec avere, le participe ne s’accorde pas avec le sujet.',
 retenir:['avere + participe.','-ato, -uto, -ito.']},
'it3b':{hook:'Je suis allée au cinéma : avec les verbes de mouvement, on utilise ESSERE, comme en français !',
 parts:[{t:'Les verbes',h:`${IT('andare, venire, partire, arrivare, tornare, uscire, entrare, restare, nascere')}`},
  {t:'L’accord',h:V.tbl(['Sujet','Forme'],[['un garçon',IT('è andato')],['une fille',IT('è andata')],['des garçons',IT('sono andati')],['des filles',IT('sono andate')]])}],
 ex:{q:'Traduis « Anna et Sara sont parties »',s:['Deux filles : féminin pluriel.',`${IT('sono')} + ${IT('partite')}.`,`${IT('Anna e Sara sono partite.')} ✅`]},
 piege:'Avec essere, le participe s’accorde toujours avec le sujet.',
 retenir:['Mouvement : essere.','Accord -o, -a, -i, -e.']},
'it3c':{hook:'Demain, l’an prochain, quand je serai grande… Le futur italien est très régulier.',
 parts:[{t:'Les terminaisons',h:V.tbl(['Sujet','parlare'],[[IT('io'),IT('parlerò')],[IT('tu'),IT('parlerai')],[IT('lui'),IT('parlerà')],[IT('noi'),IT('parleremo')],[IT('voi'),IT('parlerete')],[IT('loro'),IT('parleranno')]])+V.tip('-are devient -er- : parlare → parler-.')},
  {t:'Les irréguliers',h:`${IT('essere → sarò, avere → avrò, andare → andrò, fare → farò, venire → verrò')}`}],
 ex:{q:'Traduis « Demain je jouerai au tennis »',s:[`giocare → ${IT('giocher-')} (h pour le son dur).`,`io → ${IT('-ò')}.`,`${IT('Domani giocherò a tennis.')} ✅`]},
 piege:'L’accent final est obligatoire : parlerò, parlerà.',
 retenir:['ò, ai, à, emo, ete, anno.','-are → -er-.']},
'it3d':{hook:'Je me lève, je me lave, je m’habille : ta routine du matin en italien !',
 parts:[{t:'Les pronoms',h:V.tbl(['Sujet','alzarsi'],[[IT('io'),IT('mi alzo')],[IT('tu'),IT('ti alzi')],[IT('lui, lei'),IT('si alza')],[IT('noi'),IT('ci alziamo')],[IT('voi'),IT('vi alzate')],[IT('loro'),IT('si alzano')]])}],
 ex:{q:'Traduis « Nous nous réveillons à 7 h »',s:[`nous → ${IT('ci')}.`,`svegliare → ${IT('svegliamo')}.`,`${IT('Ci svegliamo alle sette.')} ✅`]},
 piege:`${IT('si')} sert pour lui, lei ET loro.`,
 retenir:['mi, ti, si, ci, vi, si.','Pronom avant le verbe.']},
'it3e':{hook:'« Tu manges la pizza ? Oui, je LA mange. » Les pronoms évitent de répéter.',
 parts:[{t:'Les pronoms',h:V.tbl(['Remplace','Pronom'],[['masculin singulier',IT('lo')],['féminin singulier',IT('la')],['masculin pluriel',IT('li')],['féminin pluriel',IT('le')]])}],
 ex:{q:`${IT('Compri i libri? Sì, ___ compro.')}`,s:[`${IT('i libri')} : masculin pluriel.`,`Donc ${IT('li')}.`,`${IT('Sì, li compro.')} ✅`]},
 piege:`${IT('le')} est aussi l’article féminin pluriel : regarde sa place.`,
 retenir:['lo, la, li, le.','Avant le verbe conjugué.']},
'it3f':{hook:'Quand j’étais petite, je jouais au parc : l’imparfait raconte les souvenirs.',
 parts:[{t:'La règle',h:`On enlève -re et on ajoute ${IT('-vo, -vi, -va, -vamo, -vate, -vano')}.<br>${IT('giocare → giocavo, leggere → leggevo, dormire → dormivo')}`},
  {t:'Essere',h:`${IT('ero, eri, era, eravamo, eravate, erano')}`}],
 ex:{q:'Traduis « Nous habitions à Naples »',s:[`abitare → ${IT('abita-')}.`,`noi → ${IT('-vamo')}.`,`${IT('Abitavamo a Napoli.')} ✅`]},
 piege:`${IT('fare')} se conjugue sur ${IT('face-')} : ${IT('facevo')}.`,
 retenir:['Habitudes et descriptions passées.','-vo, -vi, -va…']},
'it3g':{hook:'Je voudrais une glace, s’il vous plaît : le conditionnel est le temps de la politesse.',
 parts:[{t:'Les terminaisons',h:`Même radical que le futur + ${IT('-ei, -esti, -ebbe, -emmo, -este, -ebbero')}.<br>${IT('parlerei, vorrei, potrei')}`}],
 ex:{q:'Traduis « Je voudrais un café »',s:[`volere → radical ${IT('vorr-')}.`,`io → ${IT('-ei')}.`,`${IT('Vorrei un caffè.')} ✅`]},
 piege:`${IT('vorrei')} prend deux r.`,
 retenir:['Radical du futur + ei.','vorrei, potrei, dovrei.']},
'it3h':{hook:'Qui est le plus rapide ? Le plus drôle ? Comparer en italien est très facile.',
 parts:[{t:'Les comparatifs',h:V.tbl(['Italien','Français'],[[IT('più … di'),'plus … que'],[IT('meno … di'),'moins … que'],[IT('come / quanto'),'aussi … que']])},
  {t:'Le superlatif',h:`${IT('il più bello')} : le plus beau. ${IT('la meno cara')} : la moins chère.`}],
 ex:{q:'Traduis « Marco est plus grand que Luca »',s:[`plus → ${IT('più')}.`,`que → ${IT('di')}.`,`${IT('Marco è più alto di Luca.')} ✅`]},
 piege:`${IT('di')} se contracte : ${IT('più veloce della bici')}.`,
 retenir:['più / meno … di.','come = aussi … que.']}
});


/* ===== CODEX V2 : chapitres Histoire-Géo supplémentaires ===== */
CH_HG.hg6.push(hc('hg6n','H','Les débuts du christianisme','✝️','Au Ier siècle, une nouvelle religion naît dans l’Empire romain avant de devenir, quelques siècles plus tard, la religion majoritaire de l’Empire.',
 ['Jésus de Nazareth prêche en Palestine au Ier siècle dans le cadre du judaïsme.','Ses disciples diffusent la croyance en sa résurrection : le christianisme se répand autour de la Méditerranée.','D’abord persécutés, les chrétiens obtiennent la liberté de culte en 313 ; le christianisme devient religion officielle de l’Empire en 380.'],'Paul de Tarse joue un rôle majeur dans la diffusion du christianisme hors de Palestine.',
 {q:[['Où naît le christianisme ?','En Palestine','En Gaule|En Chine|En Bretagne','Le christianisme naît dans la province romaine de Judée.'],['Quel empereur accorde la liberté de culte aux chrétiens en 313 ?','Constantin','Auguste|Trajan|Néron','L’édit de Milan de 313 marque un tournant.'],['Que font les disciples de Jésus ?','Ils diffusent son enseignement','Ils fondent Rome|Ils détruisent l’Empire|Ils deviennent pharaons','Les premières communautés chrétiennes se développent autour de la Méditerranée.']],d:[['christianisme','religion monothéiste fondée sur l’enseignement de Jésus-Christ'],['Évangile','récit de la vie et de l’enseignement de Jésus'],['Église','communauté des chrétiens, puis institution religieuse']],c:[[30,'Mort de Jésus (vers)'],[313,'Édit de Milan : liberté de culte'],[380,'Christianisme religion officielle de l’Empire']],t:[['Les chrétiens ont toujours été libres de pratiquer leur religion dans l’Empire romain.',false,'Ils ont connu plusieurs périodes de persécution.']]}));
CH_HG.hg5.push(hc('hg5m','H','La Renaissance artistique','🎨','Aux XVe et XVIe siècles, artistes et mécènes transforment la manière de représenter l’être humain et le monde.',
 ['La Renaissance artistique naît en Italie avant de se diffuser en Europe.','Les artistes étudient l’Antiquité, la perspective, l’anatomie et cherchent davantage de réalisme.','Princes, papes et riches marchands financent les artistes : ce sont des mécènes.'],'Léonard de Vinci incarne l’idéal de l’artiste et savant de la Renaissance.',
 {q:[['Où la Renaissance artistique débute-t-elle ?','En Italie','En Russie|En Amérique|En Scandinavie','Florence, Rome et Venise sont de grands foyers.'],['Qu’est-ce qu’un mécène ?','Une personne riche qui finance des artistes','Un soldat|Un paysan|Un imprimeur uniquement','Les mécènes commandent et financent des œuvres.'],['Quelle technique donne une impression de profondeur ?','La perspective','La mosaïque|La calligraphie|Le vitrail','La perspective géométrique transforme la peinture.']],d:[['Renaissance','renouveau artistique et culturel des XVe et XVIe siècles'],['mécène','personne qui protège et finance des artistes'],['perspective','technique permettant de représenter la profondeur']],c:[[1450,'Développement de l’imprimerie de Gutenberg (vers)'],[1503,'Début de La Joconde (vers)'],[1519,'Mort de Léonard de Vinci']],t:[['La Renaissance artistique commence principalement en Italie.',true,'Les cités italiennes sont des foyers majeurs du mouvement.']]}));
CH_HG.hg4.push(hc('hg4m','H','Nations et nationalismes au XIXe siècle','🚩','Après 1815, de nombreux peuples européens réclament davantage de libertés ou souhaitent former leur propre État-nation.',
 ['Le congrès de Vienne de 1815 restaure l’ordre monarchique après Napoléon.','Les idées libérales et nationales provoquent plusieurs révolutions au XIXe siècle.','L’Italie et l’Allemagne s’unifient dans la seconde moitié du XIXe siècle.'],'Les nationalismes peuvent unir des populations mais aussi créer des rivalités entre États.',
 {q:[['Quel congrès redessine l’Europe en 1815 ?','Le congrès de Vienne','Le congrès de Berlin|Le congrès de Versailles|Le congrès de Rome','Les vainqueurs de Napoléon y réorganisent l’Europe.'],['Quel pays s’unifie en 1871 ?','L’Allemagne','La France|L’Espagne|Le Portugal','L’Empire allemand est proclamé en 1871.'],['Que réclament les mouvements nationaux ?','L’unité ou l’indépendance d’un peuple','Le retour à la féodalité|La disparition des États|La fin de l’imprimerie','Ils veulent faire coïncider peuple, nation et État.']],d:[['nation','communauté humaine qui se reconnaît une histoire et une identité communes'],['nationalisme','doctrine qui place la nation au centre de la vie politique'],['unification','réunion de plusieurs territoires en un seul État']],c:[[1815,'Congrès de Vienne'],[1848,'Printemps des peuples'],[1861,'Proclamation du royaume d’Italie'],[1871,'Proclamation de l’Empire allemand']],t:[['L’Italie et l’Allemagne sont déjà unifiées en 1815.',false,'Leur unification se réalise plus tard au XIXe siècle.']]}));
CH_HG.hg3.push(hc('hg3q','E','Les institutions de la Ve République','🏛️','Qui décide des lois en France ? Qui nomme le Premier ministre ? Comprendre les institutions permet de comprendre comment fonctionne la démocratie.',
 ['La Ve République est fondée en 1958 et repose sur la Constitution.','Le président de la République, le Gouvernement et le Parlement exercent des fonctions différentes et se contrôlent mutuellement.','Les citoyens participent notamment par le vote et peuvent aussi s’engager dans des associations, syndicats ou partis.'],'Le Parlement, composé de l’Assemblée nationale et du Sénat, vote les lois et contrôle le Gouvernement.',
 {q:[['En quelle année naît la Ve République ?','1958','1945|1968|1981','La Constitution actuelle date de 1958.'],['Qui vote les lois ?','Le Parlement','Le président seul|Les maires seuls|Le Conseil constitutionnel seul','Assemblée nationale et Sénat examinent et votent les lois.'],['Qui nomme le Premier ministre ?','Le président de la République','Le Sénat|Les maires|Le Conseil d’État','C’est une prérogative du président.']],d:[['Constitution','texte qui fixe l’organisation et le fonctionnement des pouvoirs publics'],['Parlement','institution composée de l’Assemblée nationale et du Sénat qui vote la loi'],['Gouvernement','ensemble formé par le Premier ministre et les ministres']],c:[[1958,'Naissance de la Ve République'],[1962,'Élection du président au suffrage universel direct décidée par référendum'],[2000,'Adoption du quinquennat']],t:[['Le président vote seul toutes les lois.',false,'Les lois sont votées par le Parlement.']]}));

/* ===== Cours d'histoire-géo-EMC (construits à partir des chapitres) ===== */
V.frise=ev=>`<ol class="frise">${[...ev].sort((a,b)=>a[0]-b[0]).map(([y,l])=>`<li><b>${fy(y)}</b><i class="sep">, </i><span>${l}</span></li>`).join('')}</ol>`;
Object.values(CH_HG).flat().forEach(ch=>{const b=ch.b;
 const explain=(b.q||[]).slice(0,4).map(([q,a,w,e])=>`<b>${q}</b><br>${a}. <span class="muted">${e}</span>`);
 const parts=[
  {t:'Contexte et problématique',h:`${ch.hook}<br><br><b>Question centrale :</b> ${ch.f.t} : que faut-il comprendre et savoir expliquer ?`},
  {t:'L’essentiel expliqué',h:V.steps(ch.f.l)+V.tip(ch.f.ex)}
 ];
 if(explain.length)parts.push({t:'Comprendre le chapitre',h:explain.map((x,i)=>`<div class="ex"><b>${i+1}.</b> ${x}</div>`).join('')});
 if(b.c)parts.push({t:'Les dates et repères clés',h:V.frise(b.c)+V.tip('Replace chaque date dans l’ordre et associe-la à un événement précis. Une date seule ne suffit pas : il faut savoir ce qu’elle signifie.')});
 if(b.d)parts.push({t:'Le vocabulaire à maîtriser',h:V.tbl(['Mot','Définition'],b.d.map(([m,d])=>[`<b>${cap1(m)}</b>`,cap1(d)]))+V.tip('Pour apprendre un mot, cache la définition et essaie de la reformuler avec tes propres mots.')});
 parts.push({t:'Méthode pour répondre en contrôle',h:V.steps(['Lis la consigne et repère le verbe : citer, décrire, expliquer, justifier…','Repère le lieu et la période concernés.','Réponds par une phrase complète avec au moins un mot de vocabulaire du chapitre.','Ajoute une date, un exemple ou un acteur précis quand c’est possible.','Relis : ta réponse explique-t-elle vraiment le « pourquoi » ?'])});
 const q=b.q[0],tf=(b.t||[]).find(x=>!x[1]);
 COURS[ch.id]={hook:ch.hook,parts,ex:{q:q[0],s:['Repère le mot-clé et situe le thème.',`Réponse attendue : ${q[1]}.`,`Justification : ${q[3]}`,`Formule une phrase complète : « ${q[1]} car ${q[3].charAt(0).toLowerCase()+q[3].slice(1)} » ✅`]},
  piege:tf?`Idée fausse fréquente : « ${tf[0]} » → ${tf[2]}`:'Ne récite pas seulement des mots : relie les notions entre elles et explique les causes ou conséquences.',retenir:[...ch.f.l.slice(0,2),ch.f.ex]};});



/* ===== V8.5 — Histoire-Géographie + EMC officiels 2026-2027 ===== */
const CH_EMC={'emc6':[],'emc5':[],'emc4':[],'emc3':[]};
(function applyOfficialHistoryGeoEmc2026_2027(){
 const D=window.MQ_HG_EMC_2026_2027;
 if(!D)return;
 TAGS.M='Méthode';
 const grades=['6','5','4','3'];
 const esc=x=>String(x??'').replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
 const ulist=a=>`<ul class="lst">${(a||[]).map(x=>`<li>${x}</li>`).join('')}</ul>`;
 const uniq=(arr,key='id')=>{const seen=new Set();return arr.filter(x=>!seen.has(x[key])&&seen.add(x[key]));};

 // L'EMC devient une matière à part entière sans perdre les anciens identifiants/progrès.
 grades.forEach(l=>{
   const hk='hg'+l, ek='emc'+l;
   CH_EMC[ek]=CH_HG[hk].filter(c=>c.tag==='E');
   CH_HG[hk]=CH_HG[hk].filter(c=>c.tag!=='E');
 });

 // Compléments Histoire-Géographie ciblés sur les sous-thèmes/compétences manquants.
 (D.hgAdditions||[]).forEach(sp=>{
   const k='hg'+sp.level;
   if(CH_HG[k].some(c=>c.id===sp.id))return;
   const ch=hc(sp.id,sp.tag,sp.name,sp.icon,sp.hook,sp.l,sp.ex,sp.b);
   ch.official=true; ch.official2026=true;
   CH_HG[k].push(ch);
 });

 // Compléments EMC conformes au programme annualisé 2024, tous niveaux en vigueur en 2026-2027.
 (D.emcAdditions||[]).forEach(sp=>{
   const k='emc'+sp.level;
   if(CH_EMC[k].some(c=>c.id===sp.id))return;
   const ch=hc(sp.id,'E',sp.name,sp.icon,sp.hook,sp.l,sp.ex,sp.b);
   ch.axis=sp.axis; ch.refs=sp.refs||[]; ch.official=true; ch.official2026=true;
   CH_EMC[k].push(ch);
 });
 grades.forEach(l=>{CH_HG['hg'+l]=uniq(CH_HG['hg'+l]);CH_EMC['emc'+l]=uniq(CH_EMC['emc'+l]);});

 const methodByTag={
   H:['Je situe le sujet dans le temps et l’espace.','J’identifie les acteurs et les faits essentiels.','Je relie causes, déroulement et conséquences.','Je justifie avec une date, un acteur ou un exemple précis.'],
   G:['Je localise le territoire et je précise l’échelle.','Je décris ce que montrent cartes, photos, graphiques ou données.','J’explique les dynamiques et le rôle des acteurs.','Je termine par les conséquences, inégalités ou enjeux.'],
   M:['Je lis la consigne avant le document.','Je sélectionne une preuve précise.','Je l’explique avec le cours.','Je vérifie que ma réponse répond exactement au verbe de consigne.']
 };
 const skillByTag={H:'se repérer dans le temps, analyser des sources, raisonner et raconter/expliquer',G:'se repérer dans l’espace, changer d’échelle, analyser des cartes et pratiquer le croquis',M:'analyser un document, pratiquer différents langages et justifier une réponse'};

 function buildHGCourse(ch,level){
   const b=ch.b||{}, out=D.outlines?.['hg'+level]||{};
   const q=(b.q||[]), facts=q.slice(0,5).map(([qq,a,w,e],i)=>`<div class="ex"><b>${i+1}. ${qq}</b><br>${a}. <span class="muted">${e}</span></div>`).join('');
   const parts=[
     {t:'🎯 Mission du jour',h:`<div class="bubble"><span class="bav">${ch.icon}</span><div>${ch.hook}<br><br><b>À la fin, tu dois être capable d’expliquer :</b> ${esc(ch.f.t)}.</div></div>`},
     {t:'👩‍🏫 Le cours raconté par ton prof',h:`${ulist(ch.f.l)}${V.tip(ch.f.ex)}${facts?`<div class="whybox"><b>🔎 On approfondit</b>${facts}</div>`:''}`}
   ];
   if(b.c&&b.c.length)parts.push({t:'⏳ Repères à connaître',h:`${V.frise(b.c)}${V.tip('Ne retiens pas une date seule : associe toujours la date à un événement et à sa signification.')}`});
   if(b.d&&b.d.length)parts.push({t:'📚 Vocabulaire indispensable',h:`${V.tbl(['Notion','Explication'],b.d.map(([m,d])=>[`<b>${cap1(m)}</b>`,cap1(d)]))}<div class="checkpoint"><div class="q">🧠 Défi mémoire</div>Cache la colonne de droite et reformule chaque définition avec tes propres mots.</div>`});
   parts.push({t:'🛠️ Méthode du prof',h:`<div class="method-box">${(methodByTag[ch.tag]||methodByTag.H).map((x,i)=>`<div class="method-step"><span class="num">${i+1}</span><div>${x}</div></div>`).join('')}</div><p class="muted">Compétences travaillées : ${skillByTag[ch.tag]||skillByTag.H}.</p>`});
   parts.push({t:'🗣️ Raconte-le en 30 secondes',h:`<div class="checkpoint"><div class="q">Sans regarder le cours</div>Donne <b>le lieu</b>, <b>la période</b>, <b>2 idées essentielles</b> et <b>1 exemple précis</b>. Si tu bloques, reviens à la carte mémoire puis recommence.</div>`});
   parts.push({t:'📘 Programme officiel 2026-2027',h:`<div class="program-phase"><b>${out.ref||'Programme officiel'}</b><br>${out.status||'Programme en vigueur'}<br><span class="small">${(out.themes||[]).join(' · ')}</span></div>`});
   const first=q[0]||['Quelle idée dois-tu retenir ?',ch.f.l?.[0]||ch.f.ex,'',ch.f.ex];
   const bad=(b.t||[]).find(x=>x[1]===false);
   COURS[ch.id]={hook:ch.hook,official:true,domain:ch.tag==='H'?'Histoire':ch.tag==='G'?'Géographie':'Méthode',parts,
     ex:{q:first[0],s:['Repère les mots-clés de la question.',`Réponse : ${first[1]}.`,`Justifie : ${first[3]||ch.f.ex}`,`Formule une phrase complète avec un repère précis. ✅`]},
     piege:bad?`Idée fausse fréquente : « ${bad[0]} » → ${bad[2]}`:'Ne confonds pas récitation et explication : une réponse solide relie les faits et les justifie.',
     retenir:[...(ch.f.l||[]).slice(0,3),ch.f.ex].filter(Boolean)};
 }

 const emcRefsDefault={
   '6':['Convention internationale des droits de l’enfant','Charte de la laïcité à l’École'],
   '5':['Déclaration des droits de l’homme et du citoyen','Principes constitutionnels d’égalité et de fraternité'],
   '4':['Déclaration des droits de l’homme et du citoyen','Constitution française','Convention européenne des droits de l’homme'],
   '3':['Constitution du 4 octobre 1958','Déclaration des droits de l’homme et du citoyen','Traités de l’Union européenne']
 };
 function buildEMCCourse(ch,level){
   const b=ch.b||{}, out=D.outlines?.['emc'+level]||{}, q=b.q||[];
   const refs=(ch.refs&&ch.refs.length?ch.refs:emcRefsDefault[level]);
   const cases=q.slice(0,4).map(([qq,a,w,e],i)=>`<div class="ex"><b>Cas ${i+1} — ${qq}</b><br><b>${a}</b>. <span class="muted">${e}</span></div>`).join('');
   const parts=[
     {t:'🎯 Situation de départ',h:`<div class="bubble"><span class="bav">${ch.icon}</span><div>${ch.hook}<br><br><b>Question citoyenne :</b> comment agir de façon juste, libre et responsable dans cette situation ?</div></div>`},
     {t:'⚖️ Ce que dit le principe',h:`${ulist(ch.f.l)}${V.tip(ch.f.ex)}`},
     {t:'🧩 Cas concrets',h:cases||'<p>Applique la règle à une situation concrète et justifie chaque décision.</p>'}
   ];
   if(b.d&&b.d.length)parts.push({t:'📚 Les mots du citoyen',h:V.tbl(['Notion','Définition'],b.d.map(([m,d])=>[`<b>${cap1(m)}</b>`,cap1(d)]))});
   parts.push({t:'💬 Débat guidé',h:`<div class="checkpoint"><div class="q">Je prends position… et je justifie</div>1) Je formule mon avis en une phrase.<br>2) Je donne une raison.<br>3) Je m’appuie sur un droit, une règle ou une valeur.<br>4) J’écoute l’argument contraire avant de répondre.</div>`});
   parts.push({t:'🛠️ Méthode : résoudre un dilemme citoyen',h:`<div class="method-box"><div class="method-step"><span class="num">1</span><div>Identifier les personnes concernées et leurs droits.</div></div><div class="method-step"><span class="num">2</span><div>Repérer la règle, la valeur ou le principe en jeu.</div></div><div class="method-step"><span class="num">3</span><div>Comparer les solutions et leurs conséquences.</div></div><div class="method-step"><span class="num">4</span><div>Choisir une réponse et la justifier sans attaquer les personnes.</div></div></div>`});
   parts.push({t:'📜 Textes et repères',h:ulist(refs.map(x=>`<b>${x}</b>`))});
   parts.push({t:'📘 Programme EMC 2026-2027',h:`<div class="program-phase"><b>${out.annual||'EMC'}</b><br>${out.ref||'BO n°24 du 13 juin 2024'}<br><span class="small">${(out.axes||[]).join(' · ')}</span></div>`});
   const first=q[0]||['Que faut-il retenir ?',ch.f.l?.[0]||ch.f.ex,'',ch.f.ex];
   const bad=(b.t||[]).find(x=>x[1]===false);
   COURS[ch.id]={hook:ch.hook,official:true,domain:'EMC',parts,
     ex:{q:first[0],s:['Identifie le droit, la règle ou la valeur en jeu.',`Réponse : ${first[1]}.`,`Justification : ${first[3]||ch.f.ex}`,'Explique ensuite ce que tu ferais concrètement. ✅']},
     piege:bad?`Attention : « ${bad[0]} » → ${bad[2]}`:'En EMC, une opinion seule ne suffit pas : il faut l’appuyer sur un principe, un droit, une règle ou des faits.',
     retenir:[...(ch.f.l||[]).slice(0,3),ch.f.ex].filter(Boolean)};
 }

 grades.forEach(l=>CH_HG['hg'+l].forEach(ch=>buildHGCourse(ch,l)));
 grades.forEach(l=>CH_EMC['emc'+l].forEach(ch=>buildEMCCourse(ch,l)));

 window.MQ_HG_EMC_AUDIT={
   version:'8.5',schoolYear:'2026-2027',
   hgCounts:Object.fromEntries(grades.map(l=>[l,CH_HG['hg'+l].length])),
   emcCounts:Object.fromEntries(grades.map(l=>[l,CH_EMC['emc'+l].length])),
   hgTotal:grades.reduce((n,l)=>n+CH_HG['hg'+l].length,0),
   emcTotal:grades.reduce((n,l)=>n+CH_EMC['emc'+l].length,0),
   noEmcLeftInsideHg:grades.every(l=>CH_HG['hg'+l].every(c=>c.tag!=='E')),
   sources:{hg6:'BO n°31 du 30 juillet 2020 (programme encore applicable en 6e en 2026-2027)',hgCycle4:'BO n°31 du 30 juillet 2020',emc:'BO n°24 du 13 juin 2024'}
 };
})();

/* ===== V8.2 — Programme officiel de mathématiques 2026-2027 ===== */
(function applyOfficialMath2026_2027(){
 const specs=window.MQ_MATH_2026_2027||[];
 if(!specs.length)return;
 const old=Object.fromEntries(Object.values(CH).flat().map(c=>[c.id,c]));
 const escH=s=>String(s).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
 const ul=a=>`<ul class="lst">${(a||[]).map(x=>`<li>${x}</li>`).join('')}</ul>`;
 const quizFrom=(it)=>{
   if(!it)return Q.ch('Quelle affirmation est correcte ?','Relis le cours.',['Je ne sais pas','Aucune','Toutes'],{hint:'Reviens aux idées-clés.',expl:'Le cours contient la réponse.'});
   if(it.t==='num')return Q.num(it.q,it.a,{unit:it.unit||'',hint:it.hint||'',expl:it.expl||''});
   if(it.t==='frac')return Q.frac(it.q,it.n,it.d,{hint:it.hint||'',expl:it.expl||''});
   if(it.t==='text')return Q.txt(it.q,Array.isArray(it.a)?it.a:[it.a],{hint:it.hint||'',expl:it.expl||''});
   return Q.ch(it.q,it.a,it.bad||[],{hint:it.hint||'',expl:it.expl||''});
 };
 const fallbackQuiz=(sp,d)=>{
   const pool=[];
   (sp.retain||[]).forEach((x,i)=>pool.push({t:'choice',q:`Quelle idée faut-il retenir dans « ${sp.name} » ?`,a:x,bad:shuffle((sp.retain||[]).filter(y=>y!==x).concat(['Toujours calculer sans vérifier','Le dessin suffit comme preuve'])).slice(0,3),hint:'Pense à la carte mémoire du cours.',expl:x}));
   (sp.objectives||[]).slice(0,2).forEach(x=>pool.push({t:'choice',q:'Quel objectif fait partie de ce chapitre ?',a:x,bad:['Apprendre une règle sans la comprendre','Ignorer les unités','Éviter toute vérification'],hint:'Relis la mission du jour.',expl:x}));
   return quizFrom(P(pool));
 };
 const chapter=(sp)=>({id:sp.id,name:sp.name,icon:sp.icon,domain:sp.domain,official:true,
   f:{t:sp.name,l:(sp.keys||[]).slice(0,4),ex:sp.example?.q||''},
   g(d){
     if(sp.quiz&&sp.quiz.length&&Math.random()<.58)return quizFrom(P(sp.quiz));
     const r=sp.reuse&&old[sp.reuse]; if(r&&typeof r.g==='function')return r.g(Math.max(1,Math.min(3,d)));
     return fallbackQuiz(sp,d);
   }});
 const course=(sp)=>({
   hook:`<div class="program-phase"><b>📘 ${sp.domain}</b><br>${sp.level}e · Programme applicable en 2026-2027</div><p>${sp.objectives[0]}</p>`,
   domain:sp.domain,official:true,objectives:sp.objectives,
   parts:[
     {t:'Comprendre vraiment la notion',h:`<p>Avant de mémoriser une règle, construis une image mentale de ce qu'elle signifie.</p>${ul(sp.keys)}`},
     {t:'Les automatismes à installer',h:`${(sp.automatismes&&sp.automatismes.length)?ul(sp.automatismes):`<p>Réactive régulièrement les faits numériques, le vocabulaire et les procédures de ce chapitre. Quelques minutes souvent valent mieux qu'une longue séance rare.</p>`}`},
     {t:'Méthode pas à pas',h:`<div class="method-box">${(sp.method||[]).map((x,i)=>`<div class="method-step"><span class="num">${i+1}</span><div>${x}</div></div>`).join('')}</div>`},
     {t:'Raisonner comme un mathématicien',h:`<div class="whybox"><b>🔎 Explique avant de calculer</b><br>Demande-toi quelles données sont utiles, quelle propriété s'applique et comment tu pourras contrôler le résultat. Une réponse juste sans raisonnement est moins solide qu'une démarche que tu sais expliquer.</div>`},
     {t:'Je relie au programme officiel',h:`<p>Ce chapitre travaille notamment :</p>${ul(sp.objectives)}<p class="muted small">Référentiel MathQuest : année scolaire 2026-2027. Les 6e suivent le programme cycle 3 publié en 2025 ; les 5e le nouveau programme cycle 4 applicable en 2026 ; les 4e et 3e restent sur le programme 2020 et les attendus Eduscol en vigueur cette année.</p>`}
   ],
   ex:sp.example,
   piege:sp.trap,
   retenir:sp.retain
 });
 ['6','5','4','3'].forEach(l=>{
   const arr=specs.filter(s=>s.level===l);
   const REAL=id=>window.MQCollege&&MQCollege.byId[id];
   CH[l]=arr.map(sp=>REAL(sp.id)?MQCollege.chapter(REAL(sp.id)):chapter(sp));
   arr.forEach(sp=>COURS[sp.id]=REAL(sp.id)?MQCollege.course(REAL(sp.id)):course(sp));
 });
 window.MQ_MATH_AUDIT={version:'8.2',schoolYear:'2026-2027',counts:Object.fromEntries(['6','5','4','3'].map(l=>[l,specs.filter(s=>s.level===l).length])),domains:[...new Set(specs.map(s=>s.domain))]};
})();

/* ===== V8.3 — Programme officiel de français 2026-2027 ===== */
const CH_FR={'fr6':[],'fr5':[],'fr4':[],'fr3':[]};
(function applyOfficialFrench2026_2027(){
 const specs=window.MQ_FRENCH_2026_2027||[];
 if(!specs.length)return;
 const escF=x=>String(x??'').replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
 const ul=a=>`<ul class="lst">${(a||[]).map(x=>`<li>${escF(x)}</li>`).join('')}</ul>`;
 const quizFrom=(it)=>{
   if(!it)return null;
   if(it.t==='text')return Q.txt(it.q,Array.isArray(it.a)?it.a:[it.a],{hint:it.hint||'',expl:it.expl||''});
   if(it.t==='dictation')return Q.txt('🎧 Écoute puis écris exactement la phrase.',[it.a],{audio:{t:it.a,l:'fr-FR'},hint:it.hint||'Écoute une deuxième fois et repère les accords.',expl:it.expl||it.a});
   return Q.ch(it.q,it.a,it.bad||[],{hint:it.hint||'',expl:it.expl||''});
 };
 const fallback=(sp)=>{
   const r=P(sp.retain||sp.keys||[]);
   const bad=shuffle((sp.retain||[]).filter(x=>x!==r).concat(['Je réponds sans justifier.','La forme compte toujours plus que le sens.','Je n’ai pas besoin de relire.'])).slice(0,3);
   return Q.ch(`Dans « ${sp.name} », quelle idée faut-il retenir ?`,r,bad,{hint:'Pense à la carte mémoire du cours.',expl:r});
 };
 const chapter=sp=>({id:sp.id,name:sp.name,icon:sp.icon,domain:sp.domain,official:true,
   f:{t:sp.name,l:(sp.keys||[]).slice(0,4),ex:sp.example?.q||''},
   g(d){const q=(sp.quiz||[]);return q.length&&Math.random()<.72?quizFrom(P(q)):fallback(sp);}});
 const course=sp=>{
   const ref=sp.level==='6'?'BO n°16 du 17 avril 2025':sp.level==='5'?'BO n°10 du 5 mars 2026':'BO n°31 du 30 juillet 2020';
   return {hook:`<div class="program-phase"><b>📘 ${escF(sp.domain)}</b><br>${sp.level}e · ${ref} · programme applicable en 2026-2027</div><p>${escF(sp.objectives[0])}</p>`,domain:sp.domain,official:true,objectives:sp.objectives,
    parts:[
      {t:'Le cours expliqué comme avec un prof',h:`<p>On part du sens avant de mémoriser. Voici les idées qu’il faut vraiment comprendre :</p>${ul(sp.keys)}`},
      {t:'Comment reconnaître la notion dans un texte ou une phrase',h:`<div class="whybox"><b>🔎 Réflexe de lecteur</b><br>Ne cherche pas seulement une étiquette grammaticale ou un procédé : demande-toi toujours <b>ce que cela change dans le sens</b>, puis appuie ta réponse sur un indice précis.</div>${ul(sp.method)}`},
      {t:'Méthode pas à pas',h:`<div class="method-box">${(sp.method||[]).map((x,i)=>`<div class="method-step"><span class="num">${i+1}</span><div>${escF(x)}</div></div>`).join('')}</div>`},
      {t:'Je m’entraîne à expliquer',h:`<div class="checkpoint"><div class="q">🗣️ Explique-le avec tes mots</div>Sans regarder le cours, donne la règle ou l’idée essentielle, puis invente ton propre exemple. Si tu peux expliquer <b>pourquoi</b>, tu ne récites plus : tu maîtrises.</div>`},
      {t:'Je relie au programme de français',h:`<p>Ce chapitre fait travailler :</p>${ul(sp.objectives)}<p class="muted small">Référentiel MathQuest : 2026-2027. 6e = programme cycle 3 de 2025 ; 5e = nouveau programme cycle 4 de 2026 ; 4e et 3e = programme 2020 encore applicable cette année.</p>`}
    ],ex:sp.example,piege:escF(sp.trap),retenir:sp.retain};
 };
 const REAL=id=>window.MQCollege&&MQCollege.byId[id];
 ['6','5','4','3'].forEach(l=>{const a=specs.filter(x=>x.level===l);CH_FR['fr'+l]=a.map(sp=>REAL(sp.id)?MQCollege.chapter(REAL(sp.id)):chapter(sp));a.forEach(sp=>COURS[sp.id]=REAL(sp.id)?MQCollege.course(REAL(sp.id)):course(sp));});
 window.MQ_FRENCH_AUDIT={version:'8.3',schoolYear:'2026-2027',counts:Object.fromEntries(['6','5','4','3'].map(l=>[l,specs.filter(s=>s.level===l).length])),domains:[...new Set(specs.map(s=>s.domain))]};
})();

/* ===== Matières ===== */
const WORLDS=[{id:'6',lvl:'6e',name:'Île des Nombres',emoji:'🏝️',col:'#0ea5e9'},{id:'5',lvl:'5e',name:'Forêt des Relatifs',emoji:'🌳',col:'#16a34a'},{id:'4',lvl:'4e',name:'Volcan des Puissances',emoji:'🌋',col:'#ea580c'},{id:'3',lvl:'3e',name:'Galaxie des Fonctions',emoji:'🪐',col:'#9333ea'}];
const WORLDS_FR=[{id:'fr6',lvl:'6e',name:'Atelier des mots',emoji:'✒️',col:'#be185d'},{id:'fr5',lvl:'5e',name:'Bibliothèque des héros',emoji:'📚',col:'#a21caf'},{id:'fr4',lvl:'4e',name:'Cité des récits',emoji:'🪶',col:'#7e22ce'},{id:'fr3',lvl:'3e',name:'Agora des idées',emoji:'🎓',col:'#6d28d9'}];
const WORLDS_EN=[{id:'en6',lvl:'6e',name:'Londres',emoji:'💂',col:'#dc2626'},{id:'en5',lvl:'5e',name:'Highlands d’Écosse',emoji:'🏰',col:'#2563eb'},{id:'en4',lvl:'4e',name:'New York',emoji:'🗽',col:'#0891b2'},{id:'en3',lvl:'3e',name:'Sydney',emoji:'🦘',col:'#ea580c'}];
const WORLDS_IT=[{id:'it5',lvl:'5e',name:'Rome',emoji:'🏛️',col:'#15803d'},{id:'it4',lvl:'4e',name:'Venise',emoji:'🛶',col:'#0d9488'},{id:'it3',lvl:'3e',name:'Florence',emoji:'🎨',col:'#c2410c'}];
const WORLDS_HG=[{id:'hg6',lvl:'6e',name:'Des premiers humains à Rome',emoji:'🏺',col:'#b45309'},{id:'hg5',lvl:'5e',name:'Moyen Âge et Renaissance',emoji:'🏰',col:'#7c3aed'},{id:'hg4',lvl:'4e',name:'Lumières et révolutions',emoji:'💡',col:'#0369a1'},{id:'hg3',lvl:'3e',name:'Le monde contemporain',emoji:'🌐',col:'#be123c'}];
const WORLDS_EMC=[{id:'emc6',lvl:'6e',name:'Vivre en démocratie',emoji:'🗳️',col:'#0f766e'},{id:'emc5',lvl:'5e',name:'Égalité & solidarité',emoji:'🤝',col:'#047857'},{id:'emc4',lvl:'4e',name:'Droits & libertés',emoji:'⚖️',col:'#1d4ed8'},{id:'emc3',lvl:'3e',name:'Faire vivre la démocratie',emoji:'🏛️',col:'#4338ca'}];
if(window.MQ_LANGUAGE_2026_2027){
  window.MQ_LANGUAGE_2026_2027.apply({CH_EN,CH_IT,COURS,Q,E,IT,V});
}

/* ===== V8.11 — Phases 6 à 10 restaurées ===== */
const CH_EXTRA={};
const EXTRA_SUBJECTS=[];
(function applyRemainingPhases2026_2027(){
 const D=window.MQ_REMAINING_2026_2027;
 if(!D||!Array.isArray(D.specs))return;
 const escX=x=>String(x??'').replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
 const ul=a=>`<ul class="lst">${(a||[]).map(x=>`<li>${escX(x)}</li>`).join('')}</ul>`;
 const allDomains=[...new Set(D.specs.map(x=>x.domain))];
 const falseIdeas=[
   'Il suffit de mémoriser une phrase sans savoir l’expliquer.',
   'Une seule source ou un seul exemple suffit toujours.',
   'La méthode et la justification ne servent pas.',
   'On peut ignorer les règles de sécurité, de respect ou de vérification.'
 ];
 // V8.13 : un chapitre reconstruit (data/college/*.js) remplace intégralement le gabarit V8.11 de même identifiant.
 const REAL=id=>window.MQCollege&&MQCollege.byId[id];
 const makeChapter=sp=>REAL(sp.id)?MQCollege.chapter(REAL(sp.id)):({
   id:sp.id,name:sp.name,icon:sp.icon,domain:sp.domain,official:true,
   f:{t:sp.name,l:(sp.keys||[]).slice(0,4),ex:sp.summary},
   g(d){
     const r=Math.random();
     if(r<.30){
       const bad=allDomains.filter(x=>x!==sp.domain).sort(()=>Math.random()-.5).slice(0,3);
       while(bad.length<3)bad.push('Une notion sans rapport avec ce chapitre');
       return Q.ch(`À quel domaine se rattache surtout « ${sp.name} » ?`,sp.domain,bad,{hint:'Relis le titre et l’objectif du chapitre.',expl:`Ce chapitre est classé dans le domaine « ${sp.domain} ».`});
     }
     if(r<.62){
       const ans=(sp.keys||[])[0]||sp.summary;
       return Q.ch(`Quelle idée résume le mieux « ${sp.name} » ?`,ans,falseIdeas.slice(0,3),{hint:'Cherche l’idée qui explique la notion, pas une simple récitation.',expl:ans});
     }
     if(r<.82){
       const ans=(sp.method||[])[0]||'Observer la situation avant de conclure.';
       const bad=(sp.method||[]).slice(1).concat(falseIdeas).filter(x=>x!==ans).slice(0,3);
       return Q.ch(`Quel est un bon premier réflexe pour travailler « ${sp.name} » ?`,ans,bad,{hint:'Pense à la méthode du prof particulier.',expl:`La démarche commence par : ${ans}`});
     }
     const ans=(sp.retain||[])[0]||sp.summary;
     return Q.ch(`Que faut-il être capable d’expliquer après ce cours ?`,ans,falseIdeas.slice(1,4),{hint:'Essaie de reformuler le cours avec tes propres mots.',expl:ans});
   }
 });
 const makeCourse=sp=>({
   hook:`<div class="program-phase"><b>${sp.icon} ${escX(sp.domain)}</b><br>${sp.level}e · parcours MathQuest 2026-2027</div><p>${escX(sp.summary)}</p>`,
   domain:sp.domain,official:true,objectives:[sp.summary],
   parts:[
     {t:'Le cours expliqué comme avec un prof particulier',h:`<p>On commence par comprendre avant de mémoriser.</p>${ul(sp.keys)}`},
     {t:'Méthode pas à pas',h:`<div class="method-box">${(sp.method||[]).map((x,i)=>`<div class="method-step"><span class="num">${i+1}</span><div>${escX(x)}</div></div>`).join('')}</div>`},
     {t:'Je vérifie que j’ai compris',h:`<div class="checkpoint"><div class="q">🧠 Sans regarder le cours</div>Explique « <b>${escX(sp.name)}</b> » avec tes propres mots, donne un exemple puis justifie-le. Si tu bloques, relis uniquement la partie qui te manque.</div>`},
     {t:'Progression adaptative',h:`<div class="whybox"><b>🎯 Objectif</b><br>Les exercices et le quiz utilisent le moteur adaptatif de MathQuest : la difficulté évolue selon tes réponses, tes erreurs récentes et ton niveau de maîtrise.</div>`}
   ],
   ex:sp.example,piege:escX(sp.trap),retenir:sp.retain
 });
 const grouped={};
 D.specs.forEach(sp=>{
   const wid=sp.subject+sp.level;
   (grouped[wid]||(grouped[wid]=[])).push(sp);
   COURS[sp.id]=REAL(sp.id)?MQCollege.course(REAL(sp.id)):makeCourse(sp);
 });
 Object.entries(grouped).forEach(([wid,a])=>CH_EXTRA[wid]=a.map(makeChapter));
 Object.entries(D.subjects||{}).forEach(([sid,meta])=>{
   const levels=[...new Set(D.specs.filter(x=>x.subject===sid).map(x=>x.level))];
   const worlds=levels.map(l=>({
     id:sid+l,lvl:l+'e',name:(meta.worldNames&&meta.worldNames[l])||meta.name,
     emoji:meta.emoji,col:meta.color||'#64748b'
   }));
   EXTRA_SUBJECTS.push({id:sid,name:meta.name,emoji:meta.emoji,img:meta.img,worlds});
 });
 window.MQ_EXTRA_AUDIT={
   version:'8.11-recovery',schoolYear:D.schoolYear||'2026-2027',
   total:D.specs.length,
   counts:Object.fromEntries(Object.keys(D.subjects||{}).map(s=>[s,D.specs.filter(x=>x.subject===s).length]))
 };
})();

/* ===== V8.12 — École primaire (CP → CM2) ===== */
// Chapitres déclarés dans data/primary/*.js et mis en forme par js/primary-engine.js.
const PRIMARY=window.MQPrimary?MQPrimary.build():{subjects:[],chapters:{},cours:{}};
Object.assign(COURS,PRIMARY.cours);
const SUBJECTS=[
 {id:'maths',name:'Maths',emoji:'🧮',img:'data/images/icons/icon-maths.png',worlds:WORLDS},
 {id:'francais',name:'Français',emoji:'✒️',img:'data/images/icons/icon-francais.png',worlds:WORLDS_FR},
 {id:'anglais',name:'Anglais',emoji:'🇬🇧',img:'data/images/icons/icon-anglais.png',worlds:WORLDS_EN},
 {id:'italien',name:'Italien',emoji:'🇮🇹',img:'data/images/icons/icon-italien.png',worlds:WORLDS_IT},
 {id:'hg',name:'Histoire-Géo',emoji:'🌍',img:'data/images/icons/icon-hg.png',worlds:WORLDS_HG},
 {id:'emc',name:'EMC',emoji:'⚖️',img:'data/images/icons/icon-emc.png',worlds:WORLDS_EMC},
 ...EXTRA_SUBJECTS
].map(s=>({...s,stage:s.stage||'college'})).concat(PRIMARY.subjects);
const WCH={...CH,...CH_FR,...CH_EN,...CH_IT,...CH_HG,...CH_EMC,...CH_EXTRA,...PRIMARY.chapters},WALL=SUBJECTS.flatMap(s=>s.worlds),ALLCH=Object.values(WCH).flat(),WMAP={};
WALL.forEach(w=>WCH[w.id].forEach(c=>WMAP[c.id]=w));
// Index pré-calculés : évite des recherches linéaires répétées à chaque question/écran.
const CHMAP=Object.fromEntries(ALLCH.map(c=>[c.id,c]));
// V8.13 : enrichissements des chapitres collège historiques (data/college/enrich-*.js).
if(window.MQCollege&&MQCollege.applyEnrich)MQCollege.applyEnrich(CHMAP);
const SUBMAP=Object.fromEntries(SUBJECTS.map(x=>[x.id,x]));
const SUBJECT_CHAPTERS=Object.fromEntries(SUBJECTS.map(x=>[x.id,x.worlds.flatMap(w=>WCH[w.id])]));
const sOf=wid=>SUBJECTS.find(s=>s.worlds.some(w=>w.id===wid))||SUBJECTS[0];
/* Catégorie scolaire déduite de la classe : aucun champ supplémentaire n'est stocké dans les profils. */
const PRIMARY_GRADES=window.MQPrimary?MQPrimary.GRADES:[];
const stageOf=g=>PRIMARY_GRADES.includes(g)?'primaire':'college';
const STAGE_INFO={primaire:{label:'École primaire',emoji:'🎒'},college:{label:'Collège',emoji:'🎓'}};
const isPrimaryCh=id=>!!(CHMAP[id]&&CHMAP[id].primary);
// Matières proposées à l'enfant : celles de sa catégorie ; au primaire, seulement celles prévues pour sa classe.
function visibleSubjects(g=S.grade){const st=stageOf(g);return SUBJECTS.filter(x=>x.stage===st&&(st==='college'||x.worlds.some(w=>w.lvl===g)));}
// Si la matière mémorisée n'existe pas (ou plus) pour la classe, on choisit l'équivalent le plus proche.
function ensureSubj(){const vs=visibleSubjects();if(!vs.length||vs.some(x=>x.id===S.subj))return;const cur=SUBMAP[S.subj];let t=null;
 if(cur){t=cur.stage==='primaire'?vs.find(x=>x.id===cur.pair):vs.find(x=>x.pair===cur.id);}S.subj=(t||vs[0]).id;}
function gradeLabel(g){const st=STAGE_INFO[stageOf(g)];return `${st.emoji} ${st.label} · ${g}`;}
function gradeOptions(sel){return Object.entries({primaire:PRIMARY_GRADES,college:['6e','5e','4e','3e']}).filter(([,a])=>a.length).map(([k,a])=>`<optgroup label="${STAGE_INFO[k].emoji} ${STAGE_INFO[k].label}">${a.map(g=>`<option value="${g}" ${g===sel?'selected':''}>${g}</option>`).join('')}</optgroup>`).join('');}

