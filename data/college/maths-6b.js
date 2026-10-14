/* MathQuest — Mathématiques 6e : chapitres reconstruits (complète data/college/maths-6.js), année scolaire 2026-2027.
   Programme appliqué : mathématiques du cycle 3, BO n°16 du 17 avril 2025 (MENE2504620A), applicable en 6e depuis la rentrée 2025.
   Chaque chapitre suit les objectifs d’apprentissage de 6e de ce programme (ou du cours moyen qu’il consolide).
   Identifiants des chapitres existants conservés (progression des élèves préservée). */
(function(){
'use strict';
const MQ=window.MQCollege;if(!MQ)return;const H=MQ.H;
const {R,P,ch,num,frac,order,bank,pairs,sort,mix,pickN,shuffle,nf,dec,gcd}=H;
const C=(d,u,ex,m,a,r)=>({d,u,ex,m,a,r});const T=(t,h)=>({t,h});
const REF='Mathématiques cycle 3 — BO n°16 du 17 avril 2025 (MENE2504620A), applicable en 6e depuis 2025-2026';
const PRG='Programme de mathématiques du cycle 3 (2025)';
const multiS=(q,labels,ans,expl)=>({type:'multi',q,labels,ans,expl,hint:'Pose la division.'});
const pw=(b,e)=>`${b}<sup>${e<0?'−'+(-e):e}</sup>`;
const mono=(a,v)=>a===0?'':a===1?v:a===-1?'−'+v:nf(a)+v;
function poly(...terms){let s='';for(const [c,v] of terms){if(!c)continue;const abs=Math.abs(c);const body=v?(abs===1?v:nf(abs)+v):nf(abs);if(!s)s=(c<0?'−':'')+body;else s+=(c<0?' − ':' + ')+body;}return s||'0';}
const lin=(a,b,v='x')=>poly([a,v],[b,'']);
const par=n=>n<0?`(${nf(n)})`:nf(n);
const fr=(n,d)=>{const g=gcd(n,d)||1;n/=g;d/=g;if(d<0){n=-n;d=-d;}return d===1?nf(n):`${n<0?'−':''}${Math.abs(n)}/${d}`;};
const fracR=(q,n,d,o={})=>{const g=gcd(n,d)||1;let a=n/g,b=d/g;if(b<0){a=-a;b=-b;}return b===1?num(q,a,o):frac(q,a,b,o);};
const irr=(dens,maxN)=>{const d=P(dens);let n=R(1,maxN);let k=0;while((gcd(n,d)!==1||n%d===0)&&k++<40)n=R(1,maxN);if(gcd(n,d)!==1)n=1;return [n,d];};
const eqF=(n,d)=>F(n,d)===fr(n,d)?'':` = ${fr(n,d)}`;
const F=(n,d)=>`${n<0?'−':''}${Math.abs(n)}/${d}`;
const deg=x=>x*Math.PI/180;
/* Repère et droites (x et y de −5 à 5), pour lire des images ou des coefficients. */
function graph(lines){const u=20,o=120,X=x=>o+x*u,Y=y=>o-y*u;let g='';for(let i=-5;i<=5;i++){g+=`<line x1="${X(i)}" y1="${Y(-5.5)}" x2="${X(i)}" y2="${Y(5.5)}" stroke="currentColor" stroke-opacity="0.15"/><line x1="${X(-5.5)}" y1="${Y(i)}" x2="${X(5.5)}" y2="${Y(i)}" stroke="currentColor" stroke-opacity="0.15"/>`;}
  g+=`<line x1="${X(-5.5)}" y1="${Y(0)}" x2="${X(5.5)}" y2="${Y(0)}" stroke="currentColor" stroke-width="1.5"/><line x1="${X(0)}" y1="${Y(-5.5)}" x2="${X(0)}" y2="${Y(5.5)}" stroke="currentColor" stroke-width="1.5"/>`;
  for(const i of [-4,-2,2,4]){g+=`<text x="${X(i)}" y="${Y(0)+14}" font-size="10" text-anchor="middle" fill="currentColor">${i<0?'−'+(-i):i}</text><text x="${X(0)-8}" y="${Y(i)+4}" font-size="10" text-anchor="end" fill="currentColor">${i<0?'−'+(-i):i}</text>`;}
  g+=`<text x="${X(0)-6}" y="${Y(0)+14}" font-size="10" text-anchor="end" fill="currentColor">0</text><text x="${X(1)}" y="${Y(0)+14}" font-size="10" text-anchor="middle" fill="currentColor">1</text><text x="${X(0)-8}" y="${Y(1)+4}" font-size="10" text-anchor="end" fill="currentColor">1</text>`;
  for(const [a,b] of lines){const x1=-6,x2=6;g+=`<line x1="${X(x1)}" y1="${Y(a*x1+b)}" x2="${X(x2)}" y2="${Y(a*x2+b)}" stroke="#2563eb" stroke-width="2.5"/>`;}
  return `<svg class="fig pfig" viewBox="0 0 240 240" width="240" height="240" role="img" aria-label="Repère avec une droite" style="overflow:hidden">${g}</svg>`;}
const multiP=(q,x,y)=>({type:'multi',q,labels:['abscisse','ordonnée'],ans:[x,y],expl:`Le point a pour coordonnées <b>(${nf(x)} ; ${nf(y)})</b> : abscisse ${nf(x)}, ordonnée ${nf(y)}.`,hint:'Abscisse sur l’axe horizontal, ordonnée sur l’axe vertical.'});

MQ.add('maths','6',[
/* ======================= 6a ======================= */
{id:'6a',name:'Numération : entiers et décimaux',icon:'🔢',domain:'Nombres et calculs',
 refs:[REF,PRG+' — 6e : valeur des chiffres selon leur rang, liens entre unités de numération (unité, dizaine… dixième, centième, millième), grands nombres, différentes écritures d’un décimal (virgule, fraction, nombre mixte, pourcentage)'],
 tip:'Dans 3 527,46 : le 4 est le chiffre des dixièmes (1er rang après la virgule) ; il y a 3 527 unités en tout, mais le chiffre des unités est 7.',
 c:C(`Le nombre 2 345,67 se lit « deux-mille-trois-cent-quarante-cinq virgule soixante-sept ». Chaque chiffre a une valeur qui dépend de sa <b>place</b> : c’est la numération de position, en base dix.`,
  [T('Rangs et unités de numération',`<p>Partie entière : unités, dizaines, centaines, milliers, dizaines de milliers… Partie décimale : <b>dixièmes</b> (1/10), <b>centièmes</b> (1/100), <b>millièmes</b> (1/1000).</p><p>1 dizaine = 10 unités ; 1 unité = 10 dixièmes = 100 centièmes ; 1 dixième = 10 centièmes.</p><p>Attention : dans 3 527, le <b>chiffre</b> des centaines est 5, mais le <b>nombre</b> de centaines est 35.</p>`),
   T('Différentes écritures',`<p>2,35 = 2 + 3/10 + 5/100 = 235/100 = 2 + 35/100 (nombre mixte).</p><p>Un <b>pourcentage</b> est une fraction de dénominateur 100 : 35 % = 35/100 = 0,35.</p><p>Grands nombres : 1 million = 1 000 000 ; 1 milliard = 1 000 000 000.</p>`)],
  [{q:'Décomposer 47,206.',s:['4 dizaines, 7 unités.','2 dixièmes, 0 centième, 6 millièmes.','47,206 = 47 + 2/10 + 6/1000 = 47 206/1000.']}],
  ['Je repère la virgule.','Je nomme les rangs à gauche (unités, dizaines…) et à droite (dixièmes, centièmes…).','Je distingue « chiffre des » et « nombre de ».','Je passe d’une écriture à l’autre (fraction décimale, virgule, pourcentage).'],
  ['Confondre dixièmes et dizaines.','Croire que 2,35 &gt; 2,4 parce que 35 &gt; 4.','Confondre le chiffre des centaines et le nombre de centaines.'],
  ['1 unité = 10 dixièmes = 100 centièmes = 1 000 millièmes.','t % = t/100.','Chiffre des… ≠ nombre de…']),
 g:mix([d=>{const n=R(10000,99999)/(d===1?10:1000);const s=nf(n);const digits=s.replace(/\s/g,'');const ip=digits.split(',')[0],dp=(digits.split(',')[1]||'');const ranks=[];if(dp.length>=1)ranks.push(['dixièmes',dp[0]]);if(dp.length>=2)ranks.push(['centièmes',dp[1]]);if(dp.length>=3)ranks.push(['millièmes',dp[2]]);ranks.push(['unités',ip[ip.length-1]]);if(ip.length>=2)ranks.push(['dizaines',ip[ip.length-2]]);if(ip.length>=3)ranks.push(['centaines',ip[ip.length-3]]);
   const [nm,dg]=P(ranks);return num(`Dans <b>${s}</b>, quel est le chiffre des <b>${nm}</b> ?`,+dg,{expl:`Le chiffre des ${nm} est <b>${dg}</b>.`,hint:'Repère la virgule, puis compte les rangs.'});},3],
  [d=>{const n=R(1000,99999);const k=P([['dizaines',10],['centaines',100],['milliers',1000]]);return num(`Combien y a-t-il de <b>${k[0]}</b> en tout dans ${nf(n)} ?`,Math.floor(n/k[1]),{expl:`${nf(n)} = ${nf(Math.floor(n/k[1]))} × ${k[1]} + ${n%k[1]} : <b>${nf(Math.floor(n/k[1]))}</b> ${k[0]}.`,hint:'On ne cherche pas un seul chiffre, mais le nombre total.'});},2],
  [d=>{const a=R(1,9),b=R(0,9),c=R(1,9);const v=a+b/10+c/100;return ch(`Quelle fraction décimale est égale à <b>${nf(Math.round(v*100)/100)}</b> ?`,`${a*100+b*10+c}/100`,[`${a*100+b*10+c}/10`,`${a*100+b*10+c}/1000`,`${a}/${b*10+c}`],{expl:`${nf(Math.round(v*100)/100)} = ${a*100+b*10+c} centièmes = <b>${a*100+b*10+c}/100</b>.`,hint:'Compte les chiffres après la virgule.'});},2],
  [d=>{const p=R(1,99);return ch(`${p} % s’écrit aussi…`,nf(p/100),[nf(p/10),nf(p),nf(p/1000)],{expl:`${p} % = ${p}/100 = <b>${nf(p/100)}</b>.`,hint:'Pourcentage = fraction sur 100.'});},2],
  [bank([['Combien de dixièmes dans une unité ?','10',['100','1','1 000'],'1 = 10/10.'],['Un million s’écrit…','1 000 000',['100 000','10 000 000','1 000 000 000'],'Six zéros.'],['Dans 4 523,8, le chiffre 8 est celui des…','dixièmes',['dizaines','unités','centièmes'],'Premier chiffre après la virgule.']]),1])},

/* ======================= 6b ======================= */
{id:'6b',name:'Comparer, ranger, encadrer et arrondir',icon:'📏',domain:'Nombres et calculs',
 refs:[REF,PRG+' — 6e : comparer, ordonner, encadrer, intercaler des décimaux ; arrondi à l’unité, au dixième, au centième ; placer et repérer sur une demi-droite graduée'],
 tip:'Pour comparer deux décimaux, compare d’abord les parties entières, puis les chiffres des dixièmes, puis des centièmes… Tu peux ajouter des zéros : 2,4 = 2,40.',
 c:C(`Qui a sauté le plus loin : 3,45 m ou 3,5 m ? Beaucoup répondent 3,45 « parce que 45 &gt; 5 »… et se trompent ! Pour <b>comparer des décimaux</b>, il faut regarder les rangs dans l’ordre.`,
  [T('Comparer et ranger',`<p>On compare d’abord les parties entières ; si elles sont égales, on compare les dixièmes, puis les centièmes… 3,5 = 3,50 &gt; 3,45.</p><p>Ordre croissant : du plus petit au plus grand ; décroissant : du plus grand au plus petit.</p><p>Encadrer 3,47 au dixième : 3,4 &lt; 3,47 &lt; 3,5. Entre deux décimaux, on peut toujours en <b>intercaler</b> un autre : entre 3,4 et 3,5 il y a 3,45.</p>`),
   T('Arrondir',`<p>Arrondir à l’unité, au dixième, au centième : on garde le rang voulu et on regarde le chiffre <b>suivant</b> : de 0 à 4 → on garde ; de 5 à 9 → on augmente de 1.</p><p>12,47 arrondi au dixième : 12,5 ; à l’unité : 12. Un nombre non décimal a aussi des arrondis : 1/3 ≈ 0,33 au centième.</p>`)],
  [{q:'Ranger dans l’ordre croissant : 4,7 ; 4,07 ; 4,17 ; 4,707.',s:['On écrit avec le même nombre de décimales : 4,700 ; 4,070 ; 4,170 ; 4,707.','On compare : 4,070 &lt; 4,170 &lt; 4,700 &lt; 4,707.','Ordre : 4,07 &lt; 4,17 &lt; 4,7 &lt; 4,707.']}],
  ['J’aligne les nombres sur la virgule (j’ajoute des zéros si besoin).','Je compare rang par rang de gauche à droite.','Pour arrondir, je regarde le chiffre suivant le rang demandé.','Je vérifie que l’arrondi est le nombre le plus proche.'],
  ['Comparer les parties décimales comme des entiers : 3,45 n’est pas plus grand que 3,5.','Tronquer au lieu d’arrondir : 12,47 au dixième donne 12,5.','Croire qu’il n’y a aucun nombre entre 3,4 et 3,5.'],
  ['Comparer : rang par rang.','On peut ajouter des zéros à droite de la partie décimale.','Arrondir : chiffre suivant ≥ 5 → on augmente.']),
 g:mix([d=>{const u=R(1,9),t=R(1,9),h=R(1,9);const A=u+t/10,Bv=Math.round((u+(t-1+(t===1?2:0))/10+h/100)*100)/100;const g=Math.max(A,Bv),l=Math.min(A,Bv);return ch(`Quel est le plus grand : <b>${nf(A)}</b> ou <b>${nf(Bv)}</b> ?`,nf(g),[nf(l)],{expl:`On compare rang par rang (${nf(A)} = ${nf(A)}0) : ${nf(g)} &gt; ${nf(l)}.`,hint:'Compare d’abord les unités, puis les dixièmes…'});},3],
  [d=>{const base=R(1,9);const v=shuffle([base+0.7,base+0.07,base+0.17,base+0.707,base+0.71]).slice(0,4).map(x=>Math.round(x*1000)/1000);return order('Range dans l’ordre croissant :',v.slice().sort((a,b)=>a-b).map(nf),{expl:v.slice().sort((a,b)=>a-b).map(nf).join(' &lt; '),hint:'Ajoute des zéros pour avoir le même nombre de décimales.'});},2],
  [d=>{const x=R(1001,99999)/1000;const p=P([0,1,2]);const v=Math.round(x*10**p)/10**p;return num(`Arrondis ${nf(x)} ${p===0?'à l’unité':p===1?'au dixième':'au centième'}.`,v,{expl:`On regarde le chiffre suivant : <b>${nf(v)}</b>.`,hint:'5 ou plus : on augmente.'});},3],
  [d=>{const x=R(101,999)/100;return ch(`Encadrement de ${nf(x)} au dixième ?`,`${nf(Math.floor(x*10)/10)} &lt; ${nf(x)} &lt; ${nf(Math.floor(x*10)/10+0.1)}`,[`${nf(Math.floor(x))} &lt; ${nf(x)} &lt; ${nf(Math.floor(x)+1)}`,`${nf(Math.floor(x*10)/10-0.1)} &lt; ${nf(x)} &lt; ${nf(Math.floor(x*10)/10)}`,`${nf(Math.floor(x*100)/100)} &lt; ${nf(x)} &lt; ${nf(Math.floor(x*100)/100+0.01)}`].filter(z=>!z.includes('NaN')),{expl:`Au dixième : on garde un chiffre après la virgule de part et d’autre.`,hint:'Encadrer au dixième : deux nombres à un chiffre après la virgule.'});},2],
  [d=>{const step=P([0.1,0.2,0.5]),start=R(0,5),i=R(1,8);const val=Math.round((start+i*step)*10)/10;return num(`${H.SVG.line(start,start+8*step,step,val,[start,start+8*step])}Quelle est l’abscisse du point marqué ?`,val,{expl:`Chaque graduation vaut ${nf(step)} : l’abscisse est <b>${nf(val)}</b>.`,hint:'Calcule la valeur d’une graduation.'});},2])},

/* ======================= 6c ======================= */
{id:'6c',name:'Addition, soustraction et calcul mental',icon:'➕',domain:'Nombres et calculs',
 refs:[REF,PRG+' — 6e : additionner et soustraire des décimaux ; multiplier par 0,1, 0,01, 0,001 (lien avec la division par 10, 100, 1 000) ; calcul mental'],
 tip:'Pour poser une addition de décimaux, aligne les virgules (et complète par des zéros) : unités sous unités, dixièmes sous dixièmes.',
 c:C(`Au supermarché, on additionne des prix ; au saut en longueur, on calcule des écarts. Pour calculer juste avec des <b>nombres décimaux</b>, il faut aligner les chiffres de même rang.`,
  [T('Additionner et soustraire',`<p>On pose en <b>alignant les virgules</b> : 12,5 + 3,47 → 12,50 + 3,47 = 15,97. On complète par des zéros si besoin : 7 − 2,35 = 7,00 − 2,35 = 4,65.</p><p>Calcul mental : 4,7 + 2,3 = 7 ; 5,6 − 0,8 = 4,8 ; on peut décomposer : 3,6 + 2,7 = 3,6 + 2 + 0,7 = 6,3.</p>`),
   T('Multiplier par 0,1 ; 0,01 ; 0,001',`<p>Multiplier par 0,1, c’est <b>diviser par 10</b> : 45 × 0,1 = 4,5. Multiplier par 0,01, c’est diviser par 100 : 45 × 0,01 = 0,45.</p><p>Multiplier par 10, 100, 1 000 décale les chiffres vers la gauche (la virgule semble aller à droite) : 3,25 × 100 = 325.</p>`)],
  [{q:'Calculer 18 − 6,75.',s:['On écrit 18,00 − 6,75 en alignant les virgules.','On soustrait rang par rang avec les retenues.','Résultat : 11,25.']}],
  ['J’aligne les virgules.','Je complète avec des zéros si nécessaire.','Je calcule rang par rang avec les retenues.','Je vérifie avec un ordre de grandeur.'],
  ['Aligner les chiffres à droite au lieu d’aligner les virgules.','Croire que multiplier rend toujours plus grand : × 0,1 rend plus petit.','Oublier la virgule dans le résultat.'],
  ['On aligne les virgules.','× 0,1 = ÷ 10 ; × 0,01 = ÷ 100.','Contrôle par ordre de grandeur.']),
 g:mix([d=>{const a=R(100,9999)/100,b=R(100,999)/(d===1?10:100);return num(`Calcule : ${nf(a)} + ${nf(b)}`,Math.round((a+b)*100)/100,{expl:`On aligne les virgules : <b>${nf(Math.round((a+b)*100)/100)}</b>.`,hint:'Aligne les virgules.'});},3],
  [d=>{const a=R(500,9999)/100,b=R(100,Math.floor(a*100)-1)/100;return num(`Calcule : ${nf(a)} − ${nf(b)}`,Math.round((a-b)*100)/100,{expl:`On aligne les virgules : <b>${nf(Math.round((a-b)*100)/100)}</b>.`,hint:'Complète par des zéros.'});},3],
  [d=>{const x=R(1,9999)/(P([1,10,100]));const k=P([[0.1,'0,1',10],[0.01,'0,01',100],[0.001,'0,001',1000],[10,'10',0],[100,'100',0]]);const v=Math.round(x*k[0]*1e6)/1e6;return num(`Calcule : ${nf(x)} × ${k[1]}`,v,{expl:k[2]?`Multiplier par ${k[1]}, c’est diviser par ${k[2]} : <b>${nf(v)}</b>.`:`On décale les chiffres vers la gauche : <b>${nf(v)}</b>.`,hint:'× 0,1 = ÷ 10.'});},2],
  [d=>{const a=R(11,99)/10,b=R(11,99)/10;return num(`Calcul mental : ${nf(a)} + ${nf(b)}`,Math.round((a+b)*10)/10,{expl:`<b>${nf(Math.round((a+b)*10)/10)}</b>.`,hint:'Additionne les unités, puis les dixièmes.'});},1])},

/* ======================= 6d ======================= */
{id:'6d',name:'Multiplier des nombres décimaux',icon:'✖️',domain:'Nombres et calculs',
 refs:[REF,PRG+' — 6e : comprendre le sens de la multiplication de deux décimaux, calculer le produit, contrôler par ordre de grandeur, résoudre des problèmes'],
 tip:'Multiplie sans les virgules, puis place la virgule : le résultat a autant de chiffres après la virgule que les deux facteurs réunis.',
 c:C(`1,5 kg de cerises à 4,80 € le kilo : combien payer ? On calcule 1,5 × 4,80. Mais où mettre la virgule dans le résultat ? Et pourquoi 0,5 × 8 = 4 est-il plus petit que 8 ?`,
  [T('Technique',`<p>On calcule le produit des nombres <b>sans virgule</b>, puis on place la virgule pour que le résultat ait <b>autant de décimales</b> que les deux facteurs réunis.</p><p>2,4 × 1,3 : 24 × 13 = 312 ; 1 + 1 = 2 décimales → <b>3,12</b>.</p><p>0,05 × 0,3 : 5 × 3 = 15 ; 2 + 1 = 3 décimales → 0,015.</p>`),
   T('Sens et ordre de grandeur',`<p>Multiplier par un nombre plus petit que 1 rend plus petit : 0,5 × 8 = 4 (la moitié de 8).</p><p>On contrôle avec un <b>ordre de grandeur</b> : 4,9 × 2,1 ≈ 5 × 2 = 10 ; le résultat exact 10,29 est cohérent.</p>`)],
  [{q:'Calculer 3,6 × 2,5.',s:['36 × 25 = 900.','Une décimale + une décimale = deux décimales : 9,00.','3,6 × 2,5 = 9 (ordre de grandeur : 4 × 2,5 = 10 ✔).']}],
  ['Je calcule le produit sans les virgules.','Je compte les chiffres après la virgule dans les deux facteurs.','Je place la virgule dans le résultat.','Je vérifie avec un ordre de grandeur.'],
  ['Aligner les virgules comme pour une addition.','Oublier des zéros : 0,2 × 0,3 = 0,06 (pas 0,6).','Croire qu’un produit est toujours plus grand que les facteurs.'],
  ['Nombre de décimales du produit = somme des décimales des facteurs.','× un nombre &lt; 1 → résultat plus petit.','Toujours contrôler par un ordre de grandeur.']),
 g:mix([d=>{const a=R(11,99)/10,b=R(d===1?2:11,d===1?9:99)/(d===1?1:10);return num(`Calcule : ${nf(a)} × ${nf(b)}`,Math.round(a*b*100)/100,{expl:`${Math.round(a*10)} × ${Math.round(b*(d===1?1:10))} = ${Math.round(a*10)*Math.round(b*(d===1?1:10))} ; on place la virgule : <b>${nf(Math.round(a*b*100)/100)}</b>.`,hint:'Compte les décimales.'});},3],
  [d=>{const a=P([0.2,0.3,0.4,0.5,0.05,0.06,0.03]),b=P([0.2,0.3,0.4,0.6,0.7,0.8]);return num(`Calcule : ${nf(a)} × ${nf(b)}`,Math.round(a*b*10000)/10000,{expl:`Produit sans virgule, puis ${String(a).split('.')[1].length+String(b).split('.')[1].length} décimales : <b>${nf(Math.round(a*b*10000)/10000)}</b>.`,hint:'N’oublie pas les zéros.'});},2],
  [d=>{const a=R(11,99)/10,b=R(11,99)/10;const est=Math.round(a)*Math.round(b);const ex=Math.round(a*b*100)/100;return ch(`Quel est le meilleur ordre de grandeur de ${nf(a)} × ${nf(b)} ?`,nf(est),[nf(est*10),nf(Math.max(1,Math.round(est/10))),nf(est+Math.round(a)+Math.round(b)+1)],{expl:`${nf(a)} ≈ ${Math.round(a)} et ${nf(b)} ≈ ${Math.round(b)} : ${Math.round(a)} × ${Math.round(b)} = <b>${est}</b> (valeur exacte : ${nf(ex)}).`,hint:'Arrondis chaque facteur à l’unité.'});},2],
  [d=>{const p=R(150,699)/100,m=R(12,45)/10;const v=Math.round(p*m*100)/100;return num(`Des tomates coûtent ${nf(p)} € le kilo. Combien coûtent ${nf(m)} kg ? (au centime près)`,v,{unit:'€',tol:0.0051,expl:`${nf(m)} × ${nf(p)} ≈ <b>${nf(v)} €</b>.`,hint:'Prix = masse × prix au kilo.'});},1])},

/* ======================= 6e ======================= */
{id:'6e',name:'Divisions : euclidienne et décimale',icon:'➗',domain:'Nombres et calculs',
 refs:[REF,PRG+' — 6e : division euclidienne d’un entier par un entier inférieur à 100 ; diviser un décimal par un entier inférieur à 10 ; problèmes'],
 tip:'Division euclidienne : dividende = diviseur × quotient + reste, avec reste &lt; diviseur. Pour une division décimale, on place la virgule au quotient dès qu’on « abaisse » le premier chiffre après la virgule.',
 c:C(`On veut ranger 157 œufs dans des boîtes de 12 : combien de boîtes pleines et combien d’œufs restent ? C’est une <b>division euclidienne</b>. On veut partager 15,6 € entre 4 personnes : c’est une <b>division décimale</b>.`,
  [T('Division euclidienne',`<p>Diviser a par b (b ≠ 0), c’est trouver le quotient q et le reste r tels que <b>a = b × q + r</b> avec <b>r &lt; b</b>.</p><p>157 = 12 × 13 + 1 : 13 boîtes pleines, 1 œuf reste.</p><p>Si le reste est nul, b est un diviseur de a.</p>`),
   T('Division décimale',`<p>15,6 ÷ 4 = 3,9 : on divise comme d’habitude et on place la virgule au quotient au moment où l’on utilise le chiffre des dixièmes.</p><p>On peut continuer en ajoutant des zéros : 7 ÷ 4 = 1,75. Certains quotients ne s’arrêtent jamais : 10 ÷ 3 = 3,333… (on donne une valeur approchée).</p>`)],
  [{q:'Ranger 157 œufs dans des boîtes de 12.',s:['On cherche combien de fois 12 dans 157 : 12 × 13 = 156.','157 − 156 = 1.','157 = 12 × 13 + 1 : 13 boîtes pleines et 1 œuf restant.']}],
  ['Je repère le dividende et le diviseur.','Je cherche le plus grand multiple du diviseur inférieur ou égal au dividende.','Je calcule le reste et je vérifie qu’il est plus petit que le diviseur.','Je réponds à la question (boîtes pleines ? boîtes nécessaires ?).'],
  ['Obtenir un reste plus grand que le diviseur.','Oublier la virgule au quotient.','Répondre 13 boîtes quand on demande combien de boîtes sont nécessaires pour tout ranger (14).'],
  ['a = b × q + r avec r &lt; b.','Reste nul → b divise a.','Division décimale : virgule au quotient dès les dixièmes.']),
 g:mix([d=>{const b=R(d===1?2:11,d===1?9:99),q=R(2,d===1?30:60),r=R(0,b-1);const a=b*q+r;return multiS(`Division euclidienne de ${a} par ${b} : donne le quotient et le reste.`,['quotient','reste'],[q,r],`${a} = ${b} × ${q} + ${r} (avec ${r} &lt; ${b}).`);},3],
  [d=>{const b=R(2,9),q=R(11,999)/(d===1?10:100);const a=Math.round(b*q*1000)/1000;return num(`Calcule : ${nf(a)} ÷ ${b}`,q,{expl:`${nf(a)} ÷ ${b} = <b>${nf(q)}</b> (vérification : ${b} × ${nf(q)} = ${nf(a)}).`,hint:'Place la virgule au quotient au bon moment.'});},3],
  [d=>{const k=P([6,8,10,12,15,24]),n=k*R(3,15)+R(1,k-1);return num(`On range ${n} œufs dans des boîtes de ${k}. Combien de boîtes faut-il pour <b>tout</b> ranger ?`,Math.ceil(n/k),{expl:`${n} = ${k} × ${Math.floor(n/k)} + ${n%k} : ${Math.floor(n/k)} boîtes pleines et une de plus pour les ${n%k} restants : <b>${Math.ceil(n/k)}</b>.`,hint:'Pense aux œufs qui restent.'});},2],
  [d=>{const p=R(4,9),t=p*R(101,999)/100;const v=Math.round(t/p*100)/100;return num(`On partage équitablement ${nf(Math.round(t*100)/100)} € entre ${p} personnes. Combien chacune reçoit-elle ?`,v,{unit:'€',tol:0.0051,expl:`${nf(Math.round(t*100)/100)} ÷ ${p} = <b>${nf(v)} €</b>.`,hint:'Division décimale.'});},1])},

/* ======================= 6f ======================= */
{id:'6f',name:'Multiples, diviseurs et critères',icon:'🔍',domain:'Nombres et calculs',
 refs:[REF,PRG+' — cycle 3 : multiples et diviseurs, critères de divisibilité par 2, 3, 5, 9 et 10'],
 tip:'Divisible par 3 (ou 9) : la somme des chiffres est dans la table de 3 (ou de 9). Divisible par 2 : chiffre des unités pair ; par 5 : se termine par 0 ou 5.',
 c:C(`Peut-on partager 126 bonbons équitablement entre 9 enfants sans casser de bonbon ? Il suffit de savoir si 126 est <b>divisible</b> par 9. Des <b>critères</b> permettent de répondre sans poser la division.`,
  [T('Multiples et diviseurs',`<p>Si a = b × k (k entier), alors a est un <b>multiple</b> de b et b est un <b>diviseur</b> de a : 126 = 9 × 14, donc 9 divise 126.</p><p>Les diviseurs de 12 : 1, 2, 3, 4, 6, 12.</p>`),
   T('Critères de divisibilité',`<p>Par <b>2</b> : chiffre des unités 0, 2, 4, 6 ou 8. Par <b>5</b> : 0 ou 5. Par <b>10</b> : 0.</p><p>Par <b>3</b> : somme des chiffres multiple de 3. Par <b>9</b> : somme des chiffres multiple de 9. 126 : 1 + 2 + 6 = 9 → divisible par 3 et par 9.</p>`)],
  [{q:'4 518 est-il divisible par 2, 3, 5, 9 ?',s:['Chiffre des unités : 8 → divisible par 2, pas par 5.','Somme des chiffres : 4 + 5 + 1 + 8 = 18.','18 est multiple de 3 et de 9 : divisible par 3 et par 9.']}],
  ['Je regarde le chiffre des unités (pour 2, 5, 10).','J’additionne les chiffres (pour 3 et 9).','Je conclus pour chaque diviseur.','Je peux vérifier en posant la division.'],
  ['Croire qu’un nombre terminé par 3 est divisible par 3.','Confondre multiple et diviseur.','Oublier que 1 et le nombre lui-même sont des diviseurs.'],
  ['a multiple de b ⇔ b diviseur de a.','2, 5, 10 : chiffre des unités.','3, 9 : somme des chiffres.']),
 g:mix([d=>{const n=R(100,d===1?999:99999);const k=P([2,3,5,9,10]);let ok;if(k===2)ok=n%2===0;else if(k===5)ok=n%5===0;else if(k===10)ok=n%10===0;else ok=n%k===0;const sum=String(n).split('').reduce((a,b)=>a+ +b,0);
   return ch(`${nf(n)} est-il divisible par ${k} ?`,ok?'Oui':'Non',[ok?'Non':'Oui'],{expl:k===3||k===9?`Somme des chiffres : ${sum} ${sum%k?'n’est pas':'est'} un multiple de ${k}.`:`Chiffre des unités : ${n%10} → ${ok?'divisible':'pas divisible'} par ${k}.`,hint:k===3||k===9?'Additionne les chiffres.':'Regarde le chiffre des unités.'});},3],
  [d=>{const n=P([12,18,20,24,28,30,36,40,42,45,48]);const divs=[];for(let i=1;i<=n;i++)if(n%i===0)divs.push(i);return num(`Combien de diviseurs a le nombre ${n} ?`,divs.length,{expl:`Diviseurs de ${n} : ${divs.join(', ')} → <b>${divs.length}</b>.`,hint:'Cherche les produits égaux à ce nombre (1 × …, 2 × …).'});},2],
  [d=>{const b=R(2,12),k=R(2,15);const a=b*k+P([0,0,1]);return ch(`${a} est-il un multiple de ${b} ?`,a%b===0?'Oui':'Non',[a%b===0?'Non':'Oui'],{expl:a%b===0?`${a} = ${b} × ${a/b}.`:`${a} = ${b} × ${Math.floor(a/b)} + ${a%b} : le reste n’est pas nul.`,hint:'Fais la division.'});},2],
  [bank([['Quel nombre est divisible par 9 ?','738',['739','745','910'],'7 + 3 + 8 = 18, multiple de 9.'],{tf:'Tout nombre divisible par 9 est divisible par 3.',v:true,e:'9 = 3 × 3.'},{tf:'Tout nombre divisible par 3 est divisible par 9.',v:false,e:'12 est divisible par 3 mais pas par 9.'}]),1])},

/* ======================= 6g ======================= */
{id:'6g',name:'Fractions : partage, mesure et quotient',icon:'🍰',domain:'Nombres et calculs',
 refs:[REF,PRG+' — 6e : relier une fraction au résultat exact de la division ; quotient a/b ; égalités à trous multiplicatives ; placer une fraction sur une demi-droite graduée'],
 tip:'a/b est le nombre qui, multiplié par b, donne a : 7/3 × 3 = 7. C’est aussi le résultat exact de a ÷ b.',
 c:C(`Partager 7 tablettes de chocolat entre 3 enfants : chacun reçoit 7 ÷ 3 tablettes, soit 2,333… La division ne tombe pas juste, mais on peut écrire le résultat <b>exact</b> : c’est la fraction <b>7/3</b>.`,
  [T('La fraction comme quotient',`<p>Le <b>quotient</b> de a par b (b ≠ 0) est le nombre qui, multiplié par b, donne a ; on le note <b>a/b</b>. Ainsi 3 × 7/3 = 7.</p><p>a/b est le résultat exact de a ÷ b : 3/4 = 0,75 ; 12/4 = 3 ; 7/3 ≈ 2,33 (pas d’écriture décimale exacte).</p><p>Égalité à trou : 3 × … = 7 → … = 7/3.</p>`),
   T('Fraction et demi-droite graduée',`<p>Pour placer 7/3 : on partage chaque unité en 3 parts égales et on compte 7 parts depuis 0. 7/3 = 2 + 1/3 est entre 2 et 3.</p><p>Une fraction peut être un entier (6/3 = 2), un décimal non entier (3/4 = 0,75) ou un nombre non décimal (1/3).</p>`)],
  [{q:'Compléter : 4 × … = 10.',s:['On cherche le nombre qui, multiplié par 4, donne 10.','C’est le quotient 10/4.','10/4 = 5/2 = 2,5.']}],
  ['Je reconnais une division ou une multiplication à trou.','J’écris le quotient sous forme de fraction.','Je donne l’écriture décimale si elle existe.','Je vérifie en multipliant.'],
  ['Écrire 3/7 au lieu de 7/3 pour 7 ÷ 3.','Croire que toute fraction a une écriture décimale exacte.','Mal compter les parts sur la demi-droite.'],
  ['a/b = a ÷ b (résultat exact).','b × a/b = a.','Une fraction peut être entière, décimale ou non décimale.']),
 g:mix([d=>{const b=R(2,9),a=R(1,40);return frac(`Complète : ${b} × … = ${a} (écris le nombre manquant sous forme de fraction ou de nombre)`,a,b,{expl:`Le nombre manquant est le quotient ${a}/${b}${a%b===0?' = '+a/b:''}.`,hint:'C’est le quotient de a par b.'});},3],
  [d=>{const f=P([[3,4,0.75],[1,2,0.5],[1,4,0.25],[2,5,0.4],[7,10,0.7],[3,5,0.6],[9,4,2.25],[5,2,2.5],[12,4,3],[6,8,0.75]]);return num(`Quelle est l’écriture décimale de ${f[0]}/${f[1]} ?`,f[2],{expl:`${f[0]} ÷ ${f[1]} = <b>${nf(f[2])}</b>.`,hint:'Divise le numérateur par le dénominateur.'});},2],
  [d=>{const b=P([2,3,4,5]),n=R(1,3*b);return num(`${H.SVG.line(0,3,1/b,n/b,[0,1,2,3])}La flèche indique une fraction de dénominateur ${b}. Quel est son numérateur ?`,n,{expl:`Chaque unité est partagée en ${b} parts ; on compte ${n} parts : <b>${n}/${b}</b>.`,hint:'Compte les petites graduations depuis 0.'});},2],
  [d=>{const t=P([['1/3','un nombre non décimal'],['3/4','un décimal non entier'],['8/4','un entier'],['2/3','un nombre non décimal'],['7/10','un décimal non entier'],['15/5','un entier']]);return ch(`La fraction ${t[0]} est…`,t[1],['un entier','un décimal non entier','un nombre non décimal'].filter(x=>x!==t[1]),{expl:`${t[0]} = ${(()=>{const [p,q]=t[0].split('/').map(Number);return p%q===0?p/q:[2,4,5,10,20,25].includes(q)?nf(p/q):dec(p/q,3)+'…';})()} : ${t[1]}.`,hint:'Fais la division.'});},1])},

/* ======================= 6h ======================= */
{id:'6h',name:'Fractions égales, comparaison et opérations',icon:'⚖️',domain:'Nombres et calculs',
 refs:[REF,PRG+' — 6e : égalités de fractions, comparer, encadrer, ordonner ; additionner et soustraire des fractions ; multiplier une fraction par un entier'],
 tip:'Pour comparer ou additionner, mets les fractions au même dénominateur : multiplie le numérateur ET le dénominateur par le même nombre.',
 c:C(`2/3 d’une pizza ou 5/8 ? Qui en a le plus ? Et combien font 1/4 + 2/3 ? Les <b>fractions égales</b> sont la clé : elles permettent de mettre deux fractions au même dénominateur.`,
  [T('Égalités de fractions et comparaison',`<p>a/b = (a × k)/(b × k) : 2/3 = 4/6 = 8/12. On peut aussi simplifier : 15/20 = 3/4.</p><p>Comparer : même dénominateur → on compare les numérateurs : 2/3 = 16/24 &gt; 5/8 = 15/24.</p><p>Encadrer entre deux entiers : 17/5 = 3 + 2/5, donc 3 &lt; 17/5 &lt; 4.</p>`),
   T('Opérations',`<p>Addition et soustraction : même dénominateur, puis on additionne les numérateurs : 1/4 + 2/3 = 3/12 + 8/12 = 11/12.</p><p>Multiplier une fraction par un entier : <b>k × a/b = (k × a)/b</b> : 3 × 2/7 = 6/7.</p>`)],
  [{q:'Calculer 5/6 − 3/4.',s:['Dénominateur commun 12.','5/6 = 10/12 ; 3/4 = 9/12.','10/12 − 9/12 = 1/12.']}],
  ['Je cherche un dénominateur commun.','Je transforme chaque fraction en multipliant numérateur et dénominateur.','Je compare, j’additionne ou je soustrais les numérateurs.','Je simplifie si possible.'],
  ['Additionner les dénominateurs.','Ne multiplier que le dénominateur.','Multiplier le dénominateur par l’entier : 3 × 2/7 ≠ 6/21.'],
  ['a/b = (a × k)/(b × k).','Même dénominateur pour comparer, additionner, soustraire.','k × a/b = (k × a)/b.']),
 g:mix([d=>{const [a,b]=irr([2,3,4,5,6,7,8,9],8),k=R(2,7);const ask=P(['n','d']);return ask==='n'?num(`Complète : ${a}/${b} = …/${b*k}`,a*k,{expl:`On a multiplié le dénominateur par ${k} : ${a} × ${k} = <b>${a*k}</b>.`,hint:'Même multiplication en haut et en bas.'}):num(`Complète : ${a}/${b} = ${a*k}/…`,b*k,{expl:`On a multiplié le numérateur par ${k} : ${b} × ${k} = <b>${b*k}</b>.`,hint:'Même multiplication en haut et en bas.'});},3],
  [d=>{const [a,b]=irr([3,4,5,6,7,8],7),[c,dd]=irr([3,4,5,6,9,10].filter(x=>x!==b),9);const v1=a/b,v2=c/dd;if(v1===v2)return ch(`${F(a,b)} et ${F(c,dd)} sont-elles égales ?`,'Oui',['Non'],{expl:'Elles sont égales.'});return ch(`Quelle est la plus grande fraction : ${F(a,b)} ou ${F(c,dd)} ?`,v1>v2?F(a,b):F(c,dd),[v1>v2?F(c,dd):F(a,b),'elles sont égales'],{expl:`${F(a,b)} = ${F(a*dd,b*dd)} et ${F(c,dd)} = ${F(c*b,b*dd)}.`,hint:'Même dénominateur.'});},2],
  [d=>{const [a,b]=irr([2,3,4,5,6],5),[c,dd]=irr([3,4,6,8,10,12].filter(x=>x!==b),7);const s=P([1,-1]);let n=a*dd+s*c*b;const S=n<0?1:s;n=a*dd+S*c*b;return fracR(`Calcule et simplifie : ${F(a,b)} ${S>0?'+':'−'} ${F(c,dd)}`,n,b*dd,{expl:`${F(a*dd,b*dd)} ${S>0?'+':'−'} ${F(c*b,b*dd)} = <b>${F(n,b*dd)}${eqF(n,b*dd)}</b>.`,hint:'Même dénominateur.'});},3],
  [d=>{const [a,b]=irr([3,5,7,9,11],8),k=R(2,6);return fracR(`Calcule : ${k} × ${F(a,b)}`,k*a,b,{expl:`${k} × ${F(a,b)} = ${F(k*a,b)}${eqF(k*a,b)}.`,hint:'On multiplie seulement le numérateur.'});},2],
  [d=>{const b=P([3,4,5,6,7]),q=R(1,5),r=R(1,b-1);const n=q*b+r;return ch(`Encadre ${n}/${b} entre deux entiers consécutifs.`,`${q} &lt; ${n}/${b} &lt; ${q+1}`,[`${q+1} &lt; ${n}/${b} &lt; ${q+2}`,`${q-1} &lt; ${n}/${b} &lt; ${q}`,`${r} &lt; ${n}/${b} &lt; ${r+1}`].filter(x=>!x.startsWith('-')),{expl:`${n}/${b} = ${q} + ${r}/${b} : <b>${q} &lt; ${n}/${b} &lt; ${q+1}</b>.`,hint:'Combien de fois le dénominateur dans le numérateur ?'});},1])},

/* ======================= 6i ======================= */
{id:'6i',name:'Fractions d’un nombre et pourcentages',icon:'💯',domain:'Nombres et calculs',
 refs:[REF,PRG+' — 6e : appliquer une fraction à un nombre (multiplication) ; sens d’un pourcentage, calculer une proportion en pourcentage, appliquer un pourcentage'],
 tip:'Les 3/4 de 20 : 20 ÷ 4 × 3 = 15, ou 3/4 × 20. Un pourcentage, c’est une fraction sur 100 : 15 % de 80 = 80 × 15 ÷ 100 = 12.',
 c:C(`Les 3/4 des 28 élèves d’une classe déjeunent à la cantine ; un pull à 40 € est soldé à −25 %. Calculer une <b>fraction d’un nombre</b> ou un <b>pourcentage</b>, c’est la même idée : prendre une part d’un tout.`,
  [T('Fraction d’un nombre',`<p>Prendre a/b de N, c’est calculer <b>a/b × N</b> : on peut diviser N par b, puis multiplier par a. Les 3/4 de 28 : 28 ÷ 4 = 7, 7 × 3 = 21.</p>`),
   T('Pourcentages',`<p>t % = t/100. <b>Appliquer</b> un pourcentage : 25 % de 40 = 40 × 25 ÷ 100 = 10. Repères : 50 % = la moitié, 25 % = le quart, 10 % = le dixième, 1 % = le centième.</p><p><b>Calculer une proportion</b> en pourcentage : 9 filles sur 36 élèves → 9/36 = 1/4 = 25 %.</p>`)],
  [{q:'Un pull coûte 40 € ; il est soldé à −25 %. Nouveau prix ?',s:['25 % de 40 = 40 × 25 ÷ 100 = 10 €.','Réduction : 10 €.','Nouveau prix : 40 − 10 = 30 €.']}],
  ['Je repère le tout (N) et la part (fraction ou pourcentage).','Je divise par le dénominateur (ou par 100).','Je multiplie par le numérateur (ou par t).','Je réponds à la question (part ou reste ?).'],
  ['Calculer 25 % de 40 = 25 au lieu de 10.','Oublier de soustraire la réduction pour trouver le nouveau prix.','Diviser par le numérateur au lieu du dénominateur.'],
  ['a/b de N = N ÷ b × a.','t % de N = N × t ÷ 100.','50 % = moitié, 25 % = quart, 10 % = dixième.']),
 g:mix([d=>{const [a,b]=irr([2,3,4,5,6,8,10],7);const k=R(2,10);return num(`Calcule les ${a}/${b} de ${b*k}.`,a*k,{expl:`${b*k} ÷ ${b} = ${k} ; ${k} × ${a} = <b>${a*k}</b>.`,hint:'Divise, puis multiplie.'});},3],
  [d=>{const t=P([10,20,25,50,75,5,1,30,40]),n=P([20,40,60,80,100,120,200,300,400]);return num(`Calcule ${t} % de ${n}.`,n*t/100,{expl:`${n} × ${t} ÷ 100 = <b>${nf(n*t/100)}</b>.`,hint:'Divise par 100 puis multiplie par t.'});},3],
  [d=>{const p=P([20,40,50,60,80,100,120]),t=P([10,20,25,50]);return num(`Un article à ${p} € est soldé à −${t} %. Quel est son nouveau prix ?`,p*(1-t/100),{unit:'€',expl:`Réduction : ${p} × ${t} ÷ 100 = ${nf(p*t/100)} € ; nouveau prix : ${p} − ${nf(p*t/100)} = <b>${nf(p*(1-t/100))} €</b>.`,hint:'Calcule la réduction, puis soustrais.'});},2],
  [d=>{const combos=[[9,36],[5,20],[3,12],[10,40],[6,24],[15,60],[7,28],[12,48],[13,52],[18,24]];const [a,b]=P(combos);return num(`${a} élèves sur ${b} font du sport. Quel pourcentage cela représente-t-il ?`,a/b*100,{unit:'%',expl:`${a}/${b} = ${nf(a/b)} = <b>${nf(a/b*100)} %</b>.`,hint:'Part ÷ tout × 100.'});},2])},

/* ======================= 6j ======================= */
{id:'6j',name:'Premiers pas en algèbre',icon:'🔣',domain:'Nombres et calculs',
 refs:[REF,PRG+' — 6e : utiliser des modèles pré-algébriques (schémas en barres) pour résoudre des problèmes algébriques ; égalités à trous ; expressions avec une lettre'],
 tip:'Dessine des barres : une barre pour l’inconnue ; si une quantité vaut « 3 fois plus », dessine 3 barres. Le total se lit alors facilement.',
 c:C(`« Tom a 3 fois plus d’images que Léa ; à eux deux ils en ont 48. Combien Léa en a-t-elle ? » Un <b>schéma en barres</b> permet de résoudre ce type de problème avant même d’utiliser des équations.`,
  [T('Schémas en barres',`<p>On représente la quantité inconnue par une barre. Léa : ▭ ; Tom : ▭▭▭. Total : 4 barres = 48, donc 1 barre = 12. Léa a 12 images, Tom 36.</p><p>« Lou a 5 € de plus que Max ; ensemble ils ont 31 € » : 2 barres + 5 = 31, donc 2 barres = 26 et 1 barre = 13.</p>`),
   T('Égalités à trous et lettres',`<p>Une lettre peut remplacer un nombre inconnu : 7 + x = 15 donne x = 8 ; 4 × n = 36 donne n = 9.</p><p>On peut calculer une expression en remplaçant la lettre : pour x = 5, 3 × x + 2 = 17.</p>`)],
  [{q:'Lou a 5 € de plus que Max ; ensemble ils ont 31 €. Combien a Max ?',s:['Max : ▭ ; Lou : ▭ + 5.','2 barres + 5 = 31, donc 2 barres = 26.','1 barre = 13 : Max a 13 €, Lou 18 €.']}],
  ['Je dessine une barre pour la quantité inconnue.','Je traduis les relations (fois plus, de plus).','Je trouve la valeur d’une barre.','Je réponds à la question et je vérifie.'],
  ['Répondre la valeur de Tom quand on demande celle de Léa.','Oublier d’enlever la différence avant de partager.','Confondre « 3 fois plus » et « 3 de plus ».'],
  ['Une barre = l’inconnue.','« k fois plus » → k barres ; « a de plus » → une barre + a.','Toujours vérifier avec l’énoncé.']),
 g:mix([d=>{const k=P([2,3,4,5]),x=R(3,25);return num(`Tom a ${k} fois plus d’images que Léa. Ensemble, ils en ont ${(k+1)*x}. Combien d’images a Léa ?`,x,{expl:`Léa : 1 barre ; Tom : ${k} barres ; total ${k+1} barres = ${(k+1)*x} ; 1 barre = <b>${x}</b>.`,hint:'Dessine les barres.'});},3],
  [d=>{const dif=R(2,15),x=R(5,40);return num(`Lou a ${dif} € de plus que Max. Ensemble, ils ont ${2*x+dif} €. Combien a Max ?`,x,{unit:'€',expl:`2 barres + ${dif} = ${2*x+dif} → 2 barres = ${2*x} → <b>${x} €</b>.`,hint:'Enlève d’abord la différence.'});},3],
  [d=>{const t=P(['add','mul']);if(t==='add'){const a=R(5,60),x=R(2,50);return num(`Complète : ${a} + x = ${a+x}. x = ?`,x,{expl:`x = ${a+x} − ${a} = <b>${x}</b>.`,hint:'Soustrais.'});}const a=R(2,12),x=R(2,12);return num(`Complète : ${a} × n = ${a*x}. n = ?`,x,{expl:`n = ${a*x} ÷ ${a} = <b>${x}</b>.`,hint:'Divise.'});},2],
  [d=>{const a=R(2,9),b=R(1,10),x=R(1,10);return num(`Pour x = ${x}, calcule ${a} × x + ${b}.`,a*x+b,{expl:`${a} × ${x} + ${b} = <b>${a*x+b}</b>.`,hint:'Remplace x par sa valeur.'});},1])},

/* ======================= 6k ======================= */
{id:'6k',name:'Suites, motifs et programmes de calcul',icon:'🔁',domain:'Nombres et calculs',
 refs:[REF,PRG+' — 6e : identifier la structure d’un motif évolutif, trouver une étape éloignée ; programmes de calcul'],
 tip:'Dans une suite de motifs, regarde ce qui change d’une étape à la suivante : « on ajoute 3 carreaux à chaque étape » donne une règle pour n’importe quelle étape.',
 c:C(`Étape 1 : 4 allumettes ; étape 2 : 7 ; étape 3 : 10… Combien d’allumettes à l’étape 20 ? Repérer la <b>régularité</b> d’un motif permet de prévoir n’importe quelle étape sans tout dessiner.`,
  [T('Suites et motifs',`<p>On cherche ce qui se répète : 4, 7, 10, 13… on ajoute 3 à chaque étape. À l’étape n : 4 + 3 × (n − 1) = 3n + 1. Étape 20 : 61 allumettes.</p><p>Suites de nombres : 2, 6, 18, 54… (on multiplie par 3) ; 1, 4, 9, 16… (les carrés).</p>`),
   T('Programmes de calcul',`<p>Un programme de calcul est une suite d’instructions : « Choisis un nombre ; multiplie-le par 4 ; ajoute 3 ». Avec 5 : 5 × 4 = 20 ; 20 + 3 = 23.</p><p>Pour retrouver le nombre de départ, on « remonte » le programme avec les opérations inverses : résultat 31 → 31 − 3 = 28 → 28 ÷ 4 = 7.</p>`)],
  [{q:'Motif : 5, 9, 13, 17… Quel est le 10e terme ?',s:['On ajoute 4 à chaque étape.','10e terme = 5 + 9 × 4.','= 5 + 36 = 41.']}],
  ['Je compare deux étapes consécutives.','J’écris la règle (ajouter, multiplier…).','Je l’applique pour l’étape demandée (sans tout lister si possible).','Je vérifie sur les premières étapes.'],
  ['Compter n fois l’écart au lieu de (n − 1) fois.','Confondre « on ajoute 3 » et « on multiplie par 3 ».','Exécuter un programme de calcul dans le désordre.'],
  ['Repérer la régularité entre deux étapes.','Étape n = premier terme + (n − 1) × écart.','Programme inverse : opérations inverses dans l’ordre inverse.']),
 g:mix([d=>{const u=R(1,9),r=R(2,7),n=R(5,d===1?10:30);return num(`Suite : ${u}, ${u+r}, ${u+2*r}, ${u+3*r}… Quel est le terme numéro ${n} ?`,u+(n-1)*r,{expl:`On ajoute ${r} à chaque fois : ${u} + ${n-1} × ${r} = <b>${u+(n-1)*r}</b>.`,hint:'Combien d’ajouts entre le 1er et le terme demandé ?'});},3],
  [d=>{const u=P([1,2,3]),q=P([2,3]);const t=[u,u*q,u*q*q,u*q**3];return num(`Suite : ${t.join(', ')}… Quel est le terme suivant ?`,u*q**4,{expl:`On multiplie par ${q} : ${t[3]} × ${q} = <b>${u*q**4}</b>.`,hint:'Regarde le rapport entre deux termes.'});},2],
  [d=>{const a=R(2,9),b=R(1,15),x=R(1,12);return num(`Programme : choisis un nombre ; multiplie-le par ${a} ; ajoute ${b}. Résultat avec ${x} ?`,a*x+b,{expl:`${x} × ${a} = ${a*x} ; ${a*x} + ${b} = <b>${a*x+b}</b>.`,hint:'Applique les étapes dans l’ordre.'});},2],
  [d=>{const a=R(2,9),b=R(1,15),x=R(1,12);return num(`Programme : choisis un nombre ; multiplie-le par ${a} ; ajoute ${b}. On obtient ${a*x+b}. Quel nombre a-t-on choisi ?`,x,{expl:`On remonte : ${a*x+b} − ${b} = ${a*x} ; ${a*x} ÷ ${a} = <b>${x}</b>.`,hint:'Opérations inverses en partant de la fin.'});},2],
  [d=>{const a=R(3,6),r=R(2,4),n=P([10,15,20,50]);return num(`Motif d’allumettes : étape 1 : ${a} ; étape 2 : ${a+r} ; étape 3 : ${a+2*r}. Combien d’allumettes à l’étape ${n} ?`,a+(n-1)*r,{expl:`+${r} à chaque étape : ${a} + ${n-1} × ${r} = <b>${a+(n-1)*r}</b>.`,hint:'Repère ce qu’on ajoute à chaque étape.'});},1])},

/* ======================= 6l ======================= */
{id:'6l',name:'Résoudre des problèmes en plusieurs étapes',icon:'🧩',domain:'Nombres et calculs',
 refs:[REF,PRG+' — cycle 3 : résoudre des problèmes en une ou plusieurs étapes (additifs, multiplicatifs, mixtes) ; contrôler la vraisemblance'],
 tip:'Avant de calculer, écris les étapes en phrases : « Je calcule d’abord… pour savoir… ». Chaque calcul doit répondre à une petite question.',
 c:C(`« Une classe de 28 élèves part en sortie. Le car coûte 336 € et chaque entrée au musée coûte 6,50 €. Quelle somme chaque élève doit-il payer ? » Pour répondre, il faut enchaîner <b>plusieurs calculs</b> dans le bon ordre.`,
  [T('Organiser sa démarche',`<p>1. Repérer la question finale et les données utiles. 2. Chercher les <b>questions intermédiaires</b> (ici : part du car par élève). 3. Calculer chaque étape. 4. Contrôler l’ordre de grandeur et répondre par une phrase.</p><p>Part du car : 336 ÷ 28 = 12 € ; total par élève : 12 + 6,50 = 18,50 €.</p>`),
   T('Contrôler',`<p>Le résultat doit être vraisemblable : un élève ne paie pas 1 000 € pour une sortie ! On vérifie aussi les unités (€, km, min) et qu’on a bien utilisé toutes les données nécessaires.</p>`)],
  [{q:'Un fleuriste achète 12 bouquets à 7 € et les revend 11 € pièce. Bénéfice ?',s:['Dépense : 12 × 7 = 84 €.','Recette : 12 × 11 = 132 €.','Bénéfice : 132 − 84 = 48 €.']}],
  ['Je lis tout l’énoncé et je repère la question.','J’écris les questions intermédiaires.','Je calcule chaque étape avec les unités.','Je vérifie la vraisemblance et je fais une phrase.'],
  ['Calculer avec toutes les données sans réfléchir à leur utilité.','Oublier une étape.','Répondre à une question intermédiaire au lieu de la question finale.'],
  ['Question finale → questions intermédiaires → calculs.','Unités à chaque étape.','Phrase réponse et contrôle.']),
 g:mix([d=>{const n=P([20,24,25,28,30]),c=n*R(8,15),e=P([4,5,6,6.5,7.5]);return num(`Une classe de ${n} élèves part en sortie. Le car coûte ${c} € à partager et chaque entrée coûte ${nf(e)} €. Combien chaque élève paie-t-il ?`,c/n+e,{unit:'€',expl:`Car : ${c} ÷ ${n} = ${c/n} € ; total : ${c/n} + ${nf(e)} = <b>${nf(c/n+e)} €</b>.`,hint:'D’abord la part du car par élève.'});},3],
  [d=>{const q=R(6,20),a=R(3,9),v=a+R(2,6);return num(`Un fleuriste achète ${q} bouquets à ${a} € et les revend ${v} € pièce. Quel est son bénéfice ?`,q*(v-a),{unit:'€',expl:`Recette ${q} × ${v} = ${q*v} ; dépense ${q} × ${a} = ${q*a} ; bénéfice <b>${q*(v-a)} €</b>.`,hint:'Recette − dépense.'});},2],
  [d=>{const n=R(3,6),p=R(2,9),b=P([20,50]);const tot=n*p;if(tot>=b)return num(`${n} cahiers coûtent ${p} € chacun. Prix total ?`,tot,{unit:'€',expl:`${n} × ${p} = <b>${tot} €</b>.`,hint:'Multiplie.'});return num(`J’achète ${n} cahiers à ${p} € et je paie avec un billet de ${b} €. Combien me rend-on ?`,b-tot,{unit:'€',expl:`Prix : ${n} × ${p} = ${tot} € ; monnaie : ${b} − ${tot} = <b>${b-tot} €</b>.`,hint:'Prix total, puis monnaie.'});},2],
  [d=>{const km=R(120,600),cons=P([5,6,7,8]),pr=P([1.8,1.9,2]);const L=km*cons/100;return num(`Une voiture consomme ${cons} L aux 100 km. Le carburant coûte ${nf(pr)} € le litre. Coût d’un trajet de ${km} km ? (au centime près)`,Math.round(L*pr*100)/100,{unit:'€',tol:0.0051,expl:`Carburant : ${km} × ${cons} ÷ 100 = ${nf(L)} L ; coût : ${nf(L)} × ${nf(pr)} ≈ <b>${nf(Math.round(L*pr*100)/100)} €</b>.`,hint:'D’abord les litres, puis le prix.'});},1])},

/* ======================= 6m ======================= */
{id:'6m',name:'Longueurs, périmètres et cercle',icon:'⭕',domain:'Grandeurs et mesures',
 refs:[REF,PRG+' — 6e : périmètre du disque proportionnel au diamètre, formule et calcul ; périmètres de figures composées ; conversions de longueurs'],
 tip:'Périmètre du cercle = π × diamètre = 2 × π × rayon. Pour une figure composée, fais le tour du contour sans compter les traits intérieurs.',
 c:C(`Une roue de vélo de 70 cm de diamètre fait un tour : de combien a-t-elle avancé ? Il faut connaître le <b>périmètre du cercle</b>, qui est toujours un peu plus de trois fois son diamètre.`,
  [T('Périmètre du cercle',`<p>Le périmètre d’un cercle est <b>proportionnel à son diamètre</b> ; le coefficient est le nombre <b>π ≈ 3,14</b>.</p><p><b>P = π × d = 2 × π × r</b>. Roue de 70 cm : P = π × 70 ≈ 219,9 cm.</p>`),
   T('Périmètres et conversions',`<p>Le périmètre d’un polygone est la somme des longueurs de ses côtés ; d’une figure composée, la longueur de son contour (un demi-cercle de diamètre d mesure π × d ÷ 2).</p><p>Conversions : km, hm, dam, m, dm, cm, mm : × 10 à chaque rang. 1 km = 1 000 m ; 1 m = 100 cm.</p>`)],
  [{q:'Un terrain est formé d’un carré de 10 m de côté surmonté d’un demi-cercle de diamètre 10 m. Périmètre ?',s:['Contour : 3 côtés du carré = 30 m.','Demi-cercle : π × 10 ÷ 2 ≈ 15,7 m.','Périmètre ≈ 45,7 m.']}],
  ['Je repère le contour de la figure.','Je calcule chaque morceau (côtés, arcs de cercle).','J’additionne dans la même unité.','J’arrondis à la fin si on utilise π.'],
  ['Confondre rayon et diamètre.','Compter un côté intérieur dans le périmètre.','Mélanger m et cm.'],
  ['P(cercle) = π × d = 2πr.','Périmètre = longueur du contour.','Longueurs : × 10 par rang.']),
 g:mix([d=>{const useR=Math.random()<.5,v=R(1,d===1?10:30);const P_=Math.round(Math.PI*(useR?2*v:v)*10)/10;return num(`Périmètre d’un cercle de ${useR?'rayon':'diamètre'} ${v} cm, arrondi au dixième ?`,P_,{unit:'cm',tol:0.0501,expl:`P = π × ${useR?2*v:v} ≈ <b>${nf(P_)} cm</b>${useR?` (diamètre = 2 × ${v} = ${2*v})`:''}.`,hint:'P = π × diamètre.'});},3],
  [d=>{const c=R(4,20);const p=Math.round((3*c+Math.PI*c/2)*10)/10;return num(`Un carré de ${c} m de côté est surmonté d’un demi-cercle de diamètre ${c} m. Périmètre de la figure, arrondi au dixième ?`,p,{unit:'m',tol:0.0501,expl:`3 × ${c} + π × ${c} ÷ 2 ≈ <b>${nf(p)} m</b>.`,hint:'Le côté commun n’est pas sur le contour.'});},2],
  [d=>{const L=R(3,20),l=R(2,15);return num(`Périmètre d’un rectangle de ${L} cm sur ${l} cm ?`,2*(L+l),{unit:'cm',expl:`2 × (${L} + ${l}) = <b>${2*(L+l)} cm</b>.`,hint:'2 × (L + l).'});},2],
  [d=>{const c=P([['km','m',1000],['m','cm',100],['m','mm',1000],['cm','mm',10],['hm','m',100],['dm','cm',10]]);const v=P([1.5,2,0.75,3.2,12,0.4]);const inv=Math.random()<.5;return inv?num(`Convertis ${nf(Math.round(v*c[2]*1000)/1000)} ${c[1]} en ${c[0]}.`,v,{unit:c[0],expl:`1 ${c[0]} = ${c[2]} ${c[1]} : <b>${nf(v)} ${c[0]}</b>.`,hint:'Divise.'}):num(`Convertis ${nf(v)} ${c[0]} en ${c[1]}.`,Math.round(v*c[2]*1000)/1000,{unit:c[1],expl:`1 ${c[0]} = ${c[2]} ${c[1]} : <b>${nf(Math.round(v*c[2]*1000)/1000)} ${c[1]}</b>.`,hint:'Multiplie.'});},2],
  [bank([['Le périmètre d’un cercle est proportionnel à…','son diamètre',['son aire','le carré de son rayon','rien'],'P = π × d.'],['Une roue de 50 cm de diamètre parcourt environ en un tour…','157 cm',['50 cm','100 cm','314 cm'],'π × 50 ≈ 157 cm.',2]]),1])},

/* ======================= 6n ======================= */
{id:'6n',name:'Aires et conversions',icon:'🟩',domain:'Grandeurs et mesures',
 refs:[REF,PRG+' — 6e : connaître et utiliser la formule de l’aire du carré et du rectangle ; effectuer des conversions d’aire'],
 tip:'Aire = surface « à l’intérieur » (cm², m²), périmètre = longueur du contour (cm, m). Entre deux unités d’aire voisines : × 100.',
 c:C(`Pour savoir combien de carreaux de 1 dm² il faut pour couvrir une terrasse, on calcule son <b>aire</b>. Ne pas la confondre avec le périmètre, qui mesure le tour !`,
  [T('Formules',`<p>Rectangle : <b>A = L × l</b> ; carré : <b>A = c × c</b>. Rectangle de 6 cm sur 4 cm : 24 cm² (24 carrés de 1 cm de côté).</p><p>Deux figures peuvent avoir le même périmètre et des aires différentes (et inversement).</p>`),
   T('Unités d’aire',`<p>1 cm² = aire d’un carré de 1 cm de côté. 1 dm² = 100 cm² ; 1 m² = 100 dm² = 10 000 cm².</p><p>Pour convertir, on multiplie ou on divise par 100 à chaque rang : 3,5 m² = 350 dm² = 35 000 cm².</p>`)],
  [{q:'Une terrasse de 4 m sur 2,5 m : aire en m² puis en dm² ?',s:['A = 4 × 2,5 = 10 m².','1 m² = 100 dm².','A = 1 000 dm².']}],
  ['Je vérifie que les longueurs sont dans la même unité.','J’applique la formule.','J’écris l’unité d’aire (cm², m²).','Je convertis avec × 100 ou ÷ 100 par rang.'],
  ['Calculer le périmètre au lieu de l’aire.','Convertir avec × 10 au lieu de × 100.','Écrire cm au lieu de cm².'],
  ['Rectangle : L × l ; carré : c × c.','Aire en unités « carrées ».','1 m² = 100 dm² = 10 000 cm².']),
 g:mix([d=>{const L=R(2,20),l=R(2,15);return num(`Aire d’un rectangle de ${L} cm sur ${l} cm ?`,L*l,{unit:'cm²',expl:`${L} × ${l} = <b>${L*l} cm²</b>.`,hint:'L × l.'});},3],
  [d=>{const c=R(2,15)+P([0,0,0.5]);return num(`Aire d’un carré de ${nf(c)} m de côté ?`,c*c,{unit:'m²',expl:`${nf(c)} × ${nf(c)} = <b>${nf(c*c)} m²</b>.`,hint:'c × c.'});},2],
  [d=>{const c=P([['m²','dm²',100],['m²','cm²',10000],['dm²','cm²',100],['cm²','mm²',100]]);const v=P([1,2,3.5,0.5,12,0.25]);const inv=Math.random()<.5;return inv?num(`Convertis ${nf(v*c[2])} ${c[1]} en ${c[0]}.`,v,{unit:c[0],expl:`1 ${c[0]} = ${nf(c[2])} ${c[1]} : <b>${nf(v)} ${c[0]}</b>.`,hint:'÷ 100 par rang.'}):num(`Convertis ${nf(v)} ${c[0]} en ${c[1]}.`,v*c[2],{unit:c[1],expl:`1 ${c[0]} = ${nf(c[2])} ${c[1]} : <b>${nf(v*c[2])} ${c[1]}</b>.`,hint:'× 100 par rang.'});},3],
  [d=>{const A=P([24,36,48,60,72]);const divs=[];for(let i=2;i*i<=A;i++)if(A%i===0)divs.push(i);const l=P(divs);return num(`Un rectangle a une aire de ${A} cm² et une largeur de ${l} cm. Quelle est sa longueur ?`,A/l,{unit:'cm',expl:`${A} ÷ ${l} = <b>${A/l} cm</b>.`,hint:'L = A ÷ l.'});},1],
  [bank([{tf:'Deux rectangles de même périmètre ont toujours la même aire.',v:false,e:'6 × 4 (P = 20, A = 24) et 9 × 1 (P = 20, A = 9).'},['Quelle unité convient pour l’aire d’une salle de classe ?','m²',['m','cm³','km'],'Une aire s’exprime en unités « carrées » ; pour une salle, le m² est adapté.']]),1])},

/* ======================= 6o ======================= */
{id:'6o',name:'Volumes et assemblages de cubes',icon:'🧊',domain:'Grandeurs et mesures',
 refs:[REF,PRG+' — 6e : connaître l’unité centimètre cube, comparer et déterminer des volumes ; voir dans l’espace des assemblages de cubes'],
 tip:'Un volume se mesure en cubes unités : un pavé de 4 × 3 × 2 contient 4 × 3 × 2 = 24 cubes de 1 cm³.',
 c:C(`Combien de petits cubes de 1 cm de côté faut-il pour remplir une boîte de 5 cm × 4 cm × 3 cm ? Compter les cubes, c’est mesurer un <b>volume</b> en <b>centimètres cubes</b> (cm³).`,
  [T('Le centimètre cube',`<p>1 cm³ est le volume d’un cube de 1 cm d’arête. Pour un pavé droit : on compte les cubes d’une couche (L × l), puis on multiplie par le nombre de couches (h) : <b>V = L × l × h</b>.</p><p>Boîte 5 × 4 × 3 : 20 cubes par couche, 3 couches : 60 cm³.</p>`),
   T('Assemblages et contenances',`<p>Pour un assemblage de cubes, on compte couche par couche, sans oublier les cubes cachés.</p><p>1 L = 1 dm³ = 1 000 cm³ ; 1 cm³ = 1 mL. Une brique de 1 L a un volume de 1 000 cm³.</p>`)],
  [{q:'Un cube de 3 cm d’arête : combien de cubes de 1 cm³ ?',s:['Une couche : 3 × 3 = 9 cubes.','3 couches.','9 × 3 = 27 cm³.']}],
  ['Je repère les trois dimensions.','Je compte les cubes d’une couche.','Je multiplie par le nombre de couches.','J’écris l’unité cm³.'],
  ['Additionner les dimensions au lieu de les multiplier.','Oublier les cubes cachés d’un assemblage.','Confondre cm² et cm³.'],
  ['Pavé : V = L × l × h.','1 cm³ = 1 mL ; 1 dm³ = 1 L.','Compter couche par couche.']),
 g:mix([d=>{const L=R(2,10),l=R(2,8),h=R(2,6);return num(`Quel est le volume d’une boîte de ${L} cm × ${l} cm × ${h} cm (nombre de cubes de 1 cm³ qu’elle contient) ?`,L*l*h,{unit:'cm³',expl:`${L} × ${l} = ${L*l} cubes par couche ; × ${h} couches = <b>${L*l*h} cm³</b>.`,hint:'Une couche, puis le nombre de couches.'});},3],
  [d=>{const c=R(2,10);return num(`Volume d’un cube de ${c} cm d’arête ?`,c**3,{unit:'cm³',expl:`${c} × ${c} × ${c} = <b>${c**3} cm³</b>.`,hint:'arête × arête × arête.'});},2],
  [d=>{const a=R(2,5),b=R(2,5);const h1=R(1,3),h2=R(1,3);return num(`Un escalier est formé de deux pavés de cubes posés côte à côte : le premier fait ${a} × ${b} × ${h1}, le second ${a} × ${b} × ${h2}. Combien de cubes au total ?`,a*b*(h1+h2),{expl:`${a*b*h1} + ${a*b*h2} = <b>${a*b*(h1+h2)}</b> cubes.`,hint:'Compte chaque pavé.'});},2],
  [d=>{const v=P([[1000,'cm³','L',1],[2500,'cm³','L',2.5],[1,'L','cm³',1000],[250,'mL','cm³',250],[0.5,'L','mL',500]]);return num(`Convertis ${nf(v[0])} ${v[1]} en ${v[2]}.`,v[3],{unit:v[2],expl:`1 L = 1 000 cm³ = 1 000 mL : <b>${nf(v[3])} ${v[2]}</b>.`,hint:'1 L = 1 000 cm³.'});},1])},

/* ======================= 6q ======================= */
{id:'6q',name:'Distances, milieu, cercle et médiatrice',icon:'📍',domain:'Espace et géométrie',
 refs:[REF,PRG+' — 6e : distance entre deux points, milieu d’un segment ; cercle, disque, rayon, diamètre, corde ; médiatrice et sa propriété caractéristique'],
 tip:'Le cercle de centre O et de rayon 3 cm, c’est TOUS les points à exactement 3 cm de O. La médiatrice de [AB], c’est tous les points à égale distance de A et de B.',
 c:C(`Une chèvre attachée à un piquet par une corde de 5 m broute tout ce qui est à moins de 5 m du piquet : elle broute un <b>disque</b>. Les notions de distance, de cercle et de médiatrice décrivent ce genre de situations.`,
  [T('Distance, milieu, cercle',`<p>La distance entre A et B est la longueur du segment [AB], notée AB. Le <b>milieu</b> M de [AB] est le point de [AB] tel que AM = MB = AB ÷ 2.</p><p>Le <b>cercle</b> de centre O et de rayon r est l’ensemble des points situés à la distance r de O ; le <b>disque</b> est l’ensemble des points situés à une distance inférieure ou égale à r. Un <b>diamètre</b> mesure 2r ; une <b>corde</b> relie deux points du cercle.</p>`),
   T('Médiatrice',`<p>La <b>médiatrice</b> d’un segment [AB] est la droite perpendiculaire à [AB] en son milieu.</p><p><b>Propriété caractéristique</b> : un point est sur la médiatrice de [AB] si et seulement s’il est à égale distance de A et de B.</p><p>On la construit au compas : deux arcs de même rayon centrés en A et en B se coupent en deux points de la médiatrice.</p>`)],
  [{q:'A et B sont à 8 cm l’un de l’autre. Où sont les points à 5 cm de A et à 5 cm de B ?',s:['Ils sont à égale distance de A et B : sur la médiatrice de [AB].','Ils sont aussi sur le cercle de centre A de rayon 5 cm.','Il y a deux tels points, de part et d’autre de [AB].']}],
  ['Je traduis la situation en distances.','J’utilise la définition du cercle ou de la médiatrice.','Je construis au compas.','Je vérifie les distances obtenues.'],
  ['Confondre rayon et diamètre.','Confondre cercle (le contour) et disque (la surface).','Tracer une perpendiculaire qui ne passe pas par le milieu.'],
  ['Cercle : points à distance r du centre ; diamètre = 2r.','Milieu : AM = MB = AB/2.','Médiatrice : points équidistants de A et B.']),
 g:mix([d=>{const r=R(2,15)+P([0,0.5]);const ask=P(['d','r']);return ask==='d'?num(`Un cercle a un rayon de ${nf(r)} cm. Quelle est la longueur d’un diamètre ?`,2*r,{unit:'cm',expl:`d = 2 × ${nf(r)} = <b>${nf(2*r)} cm</b>.`,hint:'Diamètre = 2 × rayon.'}):num(`Un cercle a un diamètre de ${nf(2*r)} cm. Quel est son rayon ?`,r,{unit:'cm',expl:`r = ${nf(2*r)} ÷ 2 = <b>${nf(r)} cm</b>.`,hint:'Rayon = diamètre ÷ 2.'});},3],
  [d=>{const ab=R(2,20)+P([0,0.4,0.6]);return num(`M est le milieu de [AB] et AB = ${nf(ab)} cm. Combien mesure AM ?`,ab/2,{unit:'cm',expl:`AM = ${nf(ab)} ÷ 2 = <b>${nf(ab/2)} cm</b>.`,hint:'Le milieu partage en deux.'});},2],
  [d=>{const r=R(2,8),dd=R(1,12);const pos=dd<r?'à l’intérieur du cercle (dans le disque)':dd===r?'sur le cercle':'à l’extérieur du cercle';return ch(`Un cercle a pour centre O et pour rayon ${r} cm. Le point P est à ${dd} cm de O. Où est P ?`,pos,['à l’intérieur du cercle (dans le disque)','sur le cercle','à l’extérieur du cercle'].filter(x=>x!==pos),{expl:`OP = ${dd} cm ${dd<r?'&lt;':dd===r?'=':'&gt;'} ${r} cm : P est <b>${pos}</b>.`,hint:'Compare la distance au rayon.'});},2],
  [d=>{const pa=R(2,9),pb=pa+P([0,0,1,-1]);return ch(`PA = ${pa} cm et PB = ${pb} cm. P est-il sur la médiatrice de [AB] ?`,pa===pb?'Oui':'Non',[pa===pb?'Non':'Oui'],{expl:pa===pb?'P est à égale distance de A et de B.':'PA ≠ PB : P n’est pas équidistant de A et B.',hint:'Propriété caractéristique de la médiatrice.'});},2],
  [bank([['La médiatrice d’un segment est…','perpendiculaire au segment en son milieu',['parallèle au segment','une droite passant par une extrémité','le cercle de diamètre le segment'],'Définition.'],['Une corde qui passe par le centre du cercle est…','un diamètre',['un rayon','un arc','une tangente']]]),1])},

/* ======================= 6r ======================= */
{id:'6r',name:'Angles, parallèles et perpendiculaires',icon:'📐',domain:'Espace et géométrie',
 refs:[REF,PRG+' — 6e : lexique et notations des angles (droit, plat, plein, nul, aigu, obtus), mesurer et construire un angle, bissectrice'],
 tip:'Avec le rapporteur, place le centre sur le sommet et le zéro sur un côté ; lis la graduation qui part de ce zéro.',
 c:C(`Les aiguilles d’une horloge, une rampe d’accès, une part de pizza : ce sont des <b>angles</b>. On les mesure en <b>degrés</b> avec un rapporteur et on les classe selon leur mesure.`,
  [T('Vocabulaire et mesure',`<p>Un angle a un sommet et deux côtés ; on le note par exemple x̂Oy ou ÂOB.</p><p><b>Nul</b> : 0° ; <b>aigu</b> : entre 0° et 90° ; <b>droit</b> : 90° ; <b>obtus</b> : entre 90° et 180° ; <b>plat</b> : 180° ; <b>plein</b> : 360°.</p>`),
   T('Bissectrice',`<p>La <b>bissectrice</b> d’un angle est la demi-droite qui le partage en deux angles de même mesure. La bissectrice d’un angle de 70° forme deux angles de 35°.</p><p>Deux droites perpendiculaires forment quatre angles droits ; deux droites parallèles ne se coupent jamais.</p>`)],
  [{q:'Un angle de 128° est partagé par sa bissectrice. Mesure de chaque angle ?',s:['La bissectrice partage l’angle en deux angles égaux.','128 ÷ 2 = 64.','Chaque angle mesure 64°.']}],
  ['Je repère le sommet et les côtés.','Je place le rapporteur (centre sur le sommet, zéro sur un côté).','Je lis sur la bonne graduation.','Je vérifie : aigu ou obtus ?'],
  ['Lire la mauvaise graduation du rapporteur (40° au lieu de 140°).','Confondre angle obtus et angle plat.','Croire que la longueur des côtés change la mesure de l’angle.'],
  ['Aigu &lt; 90° &lt; obtus &lt; 180°.','Plat : 180° ; plein : 360°.','Bissectrice : partage en deux angles égaux.']),
 g:mix([d=>{const a=P([0,180,360,90,R(1,89),R(91,179)]);const t=a===0?'nul':a===90?'droit':a===180?'plat':a===360?'plein':a<90?'aigu':'obtus';return ch(`Un angle de ${a}° est…`,t,['nul','aigu','droit','obtus','plat','plein'].filter(x=>x!==t),{expl:`${a}° : angle <b>${t}</b>.`,hint:'Compare à 90° et 180°.'});},3],
  [d=>{const a=2*R(10,89);return num(`Un angle de ${a}° est partagé par sa bissectrice. Quelle est la mesure de chacun des deux angles obtenus ?`,a/2,{unit:'°',expl:`${a} ÷ 2 = <b>${a/2}°</b>.`,hint:'Moitié de l’angle.'});},2],
  [d=>{const h=P([1,2,3,4,5]);return num(`Quel angle (en degrés, le plus petit) forment les aiguilles d’une horloge à ${h} h pile ?`,h*30,{unit:'°',expl:`Chaque heure correspond à 360 ÷ 12 = 30° ; ${h} × 30 = <b>${h*30}°</b>.`,hint:'Un tour = 360° = 12 heures.'});},2],
  [d=>{const a=R(10,170);return ch(`Sur un rapporteur, on lit 40° sur une graduation et 140° sur l’autre pour un angle visiblement obtus. Quelle est sa mesure ?`,'140°',['40°','180°','90°'],{expl:'Un angle obtus mesure plus de 90° : c’est 140°.',hint:'Vérifie si l’angle est aigu ou obtus.'});},1],
  [bank([['Un angle plein mesure…','360°',['180°','90°','0°'],'Un angle plein correspond à un tour complet : 360°.'],['Deux droites perpendiculaires forment…','quatre angles droits',['deux angles plats','un angle aigu et un angle obtus','aucun angle'],'Par définition.']]),1])},

/* ======================= 6s ======================= */
{id:'6s',name:'Triangles, quadrilatères et symétrie axiale',icon:'🔺',domain:'Espace et géométrie',
 refs:[REF,PRG+' — 6e : construire des triangles, propriétés angulaires des triangles particuliers, somme des angles, médiatrices concourantes et cercle circonscrit ; symétrie axiale (définition, propriétés, constructions)'],
 tip:'Symétrique de A par rapport à (d) : l’axe (d) est la médiatrice de [AA′]. Somme des angles d’un triangle : 180°.',
 c:C(`Plie une feuille et découpe une forme : en dépliant, les deux moitiés sont <b>symétriques</b> par rapport au pli. Les triangles, eux, cachent une propriété étonnante : la somme de leurs angles vaut toujours 180°.`,
  [T('Triangles',`<p>Somme des angles d’un triangle : <b>180°</b>. Triangle <b>équilatéral</b> : 3 côtés égaux, 3 angles de 60°. <b>Isocèle</b> : 2 côtés égaux, 2 angles à la base égaux. <b>Rectangle</b> : un angle droit, les deux autres font 90° ensemble.</p><p>Les trois médiatrices d’un triangle se coupent au centre du <b>cercle circonscrit</b>, qui passe par les trois sommets.</p>`),
   T('Symétrie axiale',`<p>Le symétrique de A par rapport à la droite (d) est le point A′ tel que <b>(d) est la médiatrice de [AA′]</b>. Si A est sur (d), A′ = A.</p><p>La symétrie axiale conserve les longueurs, les angles, les aires et l’alignement. Une figure a un <b>axe de symétrie</b> si elle se superpose à elle-même par pliage le long de cet axe (carré : 4 axes ; rectangle : 2 ; triangle équilatéral : 3 ; isocèle : 1 ; cercle : une infinité).</p>`)],
  [{q:'ABC est isocèle en A avec B̂ = 70°. Calculer Ĉ et Â.',s:['Isocèle en A : B̂ = Ĉ = 70°.','Â = 180° − 70° − 70°.','Â = 40°.']}],
  ['Je repère la nature du triangle (codages).','J’utilise la somme des angles (180°).','Pour une symétrie, je trace la perpendiculaire à l’axe et je reporte la distance.','Je vérifie : longueurs et angles conservés.'],
  ['Oublier que l’angle droit compte pour 90°.','Construire le symétrique en « recopiant » la figure à côté au lieu de la retourner.','Croire qu’un rectangle a 4 axes de symétrie.'],
  ['Somme des angles d’un triangle : 180°.','Symétrique : l’axe est la médiatrice de [AA′].','Carré 4 axes, rectangle 2, équilatéral 3, isocèle 1.']),
 g:mix([d=>{const a=R(20,100),b=R(20,150-a);return num(`Un triangle a deux angles de ${a}° et ${b}°. Combien mesure le troisième ?`,180-a-b,{unit:'°',expl:`180 − ${a} − ${b} = <b>${180-a-b}°</b>.`,hint:'Somme : 180°.'});},3],
  [d=>{const b=R(20,80);return num(`ABC est isocèle en A et B̂ = ${b}°. Combien mesure Â ?`,180-2*b,{unit:'°',expl:`Ĉ = B̂ = ${b}° ; Â = 180 − 2 × ${b} = <b>${180-2*b}°</b>.`,hint:'Les angles à la base sont égaux.'});},2],
  [d=>{const f=P([['un carré',4],['un rectangle (non carré)',2],['un triangle équilatéral',3],['un triangle isocèle (non équilatéral)',1],['un losange (non carré)',2],['un triangle quelconque',0]]);return num(`Combien d’axes de symétrie a ${f[0]} ?`,f[1],{expl:`${f[0].charAt(0).toUpperCase()+f[0].slice(1)} : <b>${f[1]}</b> axe${f[1]>1?'s':''}.`,hint:'Imagine les pliages.'});},2],
  [d=>{const k=R(1,6);const g=P(['gauche','droite']);return ch(`L’axe de symétrie est vertical. Le point A est à ${k} carreau${k>1?'x':''} à ${g} de l’axe. Où est son symétrique A′ ?`,`à ${k} carreau${k>1?'x':''} à ${g==='gauche'?'droite':'gauche'} de l’axe, sur la même ligne`,[`à ${k} carreau${k>1?'x':''} à ${g} de l’axe`,`à ${2*k} carreaux à ${g==='gauche'?'droite':'gauche'} de l’axe`,`sur l’axe`],{expl:'Même distance à l’axe, de l’autre côté.',hint:'L’axe est la médiatrice de [AA′].'});},2],
  [bank([['Le cercle circonscrit à un triangle a pour centre…','le point de concours des médiatrices',['le milieu d’un côté','un sommet','le point de concours des bissectrices'],'Ce point est à égale distance des trois sommets.'],{tf:'La symétrie axiale conserve les longueurs.',v:true,e:'La figure symétrique est superposable.'}]),1])},

/* ======================= 6u ======================= */
{id:'6u',name:'Données : enquêtes, tableaux et graphiques',icon:'📋',domain:'Organisation et gestion de données',
 refs:[REF,PRG+' — 6e : planifier une enquête, recueillir et présenter des données dans un tableau, filtrer selon un critère ; lire et interpréter tableaux et graphiques'],
 tip:'Lis toujours le titre, les en-têtes du tableau et les axes du graphique (avec leurs unités) avant de répondre.',
 c:C(`Ta classe veut connaître les sports préférés des élèves du collège. Il faut <b>organiser l’enquête</b> (quelle question ? à qui ?), <b>recueillir</b> les réponses, puis les <b>présenter</b> dans un tableau ou un graphique pour les interpréter.`,
  [T('Recueillir et organiser',`<p>Une enquête commence par une question précise et le choix des personnes interrogées. On consigne les réponses dans un <b>tableau</b> : une colonne par caractère étudié, une ligne par catégorie, avec l’effectif.</p><p>On peut <b>filtrer</b> un tableau : ne garder que les lignes qui vérifient un critère (par exemple « élèves de 6e »).</p>`),
   T('Lire et interpréter',`<p>Diagramme en barres : la hauteur représente l’effectif. Graphique cartésien : il montre une évolution. On repère la valeur la plus grande, la plus petite, des écarts.</p><p>On calcule un effectif total en additionnant, un écart en soustrayant.</p>`)],
  [{q:'Sondage : football 12, natation 7, danse 9, judo 4. Total ? Écart football-judo ?',s:['Total : 12 + 7 + 9 + 4 = 32.','Écart : 12 − 4 = 8.','Le football est choisi 8 fois de plus que le judo.']}],
  ['Je lis le titre et les en-têtes.','Je repère la ligne ou la colonne utile.','Je calcule (total, écart) si demandé.','Je réponds par une phrase.'],
  ['Lire la mauvaise ligne d’un tableau à double entrée.','Oublier une catégorie dans le total.','Ignorer l’échelle d’un graphique.'],
  ['Tableau : catégories et effectifs.','Total = somme des effectifs.','Filtrer = garder les données qui vérifient un critère.']),
 g:mix([d=>{const cats=pickN(['football','natation','danse','judo','tennis','basket'],4);const e=cats.map(()=>R(2,20));const tot=e.reduce((a,b)=>a+b,0);return num(`Sondage : ${cats.map((c,i)=>`${c} ${e[i]}`).join(', ')}. Combien de personnes ont répondu ?`,tot,{expl:`${e.join(' + ')} = <b>${tot}</b>.`,hint:'Additionne.'});},3],
  [d=>{const cats=pickN(['lundi','mardi','jeudi','vendredi'],4);const e=cats.map(()=>R(3,30));const i=e.indexOf(Math.max(...e)),j=e.indexOf(Math.min(...e));return num(`Livres empruntés : ${cats.map((c,k)=>`${c} ${e[k]}`).join(', ')}. Écart entre le jour le plus fréquenté et le moins fréquenté ?`,e[i]-e[j],{expl:`${e[i]} − ${e[j]} = <b>${e[i]-e[j]}</b>.`,hint:'Maximum − minimum.'});},2],
  [d=>{const rows=[['Léa','6e',12],['Tom','5e',9],['Inès','6e',15],['Noé','6e',7],['Sam','4e',11]];const sel=rows.filter(r=>r[1]==='6e');return num(`<table class="ptable"><tr><th>Élève</th><th>Classe</th><th>Livres lus</th></tr>${rows.map(r=>`<tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join('')}</table>En ne gardant que les élèves de 6e, combien de livres ont-ils lus au total ?`,sel.reduce((a,r)=>a+r[2],0),{expl:`Élèves de 6e : ${sel.map(r=>r[0]).join(', ')} ; ${sel.map(r=>r[2]).join(' + ')} = <b>${sel.reduce((a,r)=>a+r[2],0)}</b>.`,hint:'Filtre d’abord les lignes « 6e ».'});},2],
  [bank([['Pour connaître le sport préféré des élèves d’un collège, la première étape est de…','formuler une question précise et choisir qui interroger',['tracer le graphique','calculer la moyenne','deviner la réponse'],'Une enquête se planifie.'],['Pour montrer l’évolution de la température heure par heure, on choisit…','un graphique cartésien',['un diagramme circulaire','un tableau sans titre','une carte']]]),1])},

/* ======================= 6w ======================= */
{id:'6w',name:'Proportionnalité et échelles',icon:'🗺️',domain:'Proportionnalité',
 refs:[REF,PRG+' — 6e : définition de la proportionnalité, identifier une situation proportionnelle, procédures (linéarité, retour à l’unité, coefficient), tableaux, initiation aux échelles'],
 tip:'Échelle 1/25 000 : 1 cm sur la carte représente 25 000 cm (250 m) dans la réalité.',
 c:C(`6 croissants coûtent 7,20 € : combien en coûtent 9 ? Sur une carte au 1/25 000, deux villages sont à 6 cm l’un de l’autre : quelle distance réelle ? Ce sont des situations de <b>proportionnalité</b>.`,
  [T('Procédures',`<p>Deux grandeurs sont proportionnelles si l’on obtient l’une en multipliant l’autre par un même nombre (coefficient).</p><p><b>Linéarité</b> : 9 croissants = 6 + 3 croissants → 7,20 + 3,60 = 10,80 €. <b>Retour à l’unité</b> : 1 croissant = 1,20 € → 9 × 1,20 = 10,80 €. <b>Coefficient</b> : prix = 1,20 × nombre.</p>`),
   T('Échelles',`<p>L’<b>échelle</b> d’une carte est le coefficient qui relie les distances sur la carte aux distances réelles (dans la même unité). Au 1/25 000 : 6 cm sur la carte → 6 × 25 000 = 150 000 cm = 1,5 km.</p>`)],
  [{q:'Au 1/50 000, deux villes sont à 8 cm. Distance réelle ?',s:['8 × 50 000 = 400 000 cm.','400 000 cm = 4 000 m.','= 4 km.']}],
  ['Je vérifie la proportionnalité.','Je choisis une procédure (linéarité, unité, coefficient).','Pour une échelle, je multiplie puis je convertis.','Je vérifie la vraisemblance.'],
  ['Ajouter au lieu de multiplier.','Oublier de convertir les cm en km.','Appliquer la proportionnalité à une situation qui ne l’est pas.'],
  ['Linéarité, retour à l’unité, coefficient.','Échelle 1/n : 1 cm ↔ n cm.','Convertir à la fin.']),
 g:mix([d=>{const u=P([1.2,1.5,0.8,2,2.5,3]),a=P([2,3,4,5,6]);let b=P([3,4,6,8,9,10,12]);if(b===a)b++;return num(`${a} croissants coûtent ${nf(Math.round(u*a*100)/100)} €. Combien coûtent ${b} croissants ?`,Math.round(u*b*100)/100,{unit:'€',expl:`1 croissant : ${nf(u)} € ; ${b} × ${nf(u)} = <b>${nf(Math.round(u*b*100)/100)} €</b>.`,hint:'Retour à l’unité.'});},3],
  [d=>{const e=P([10000,25000,50000,100000]),c=R(2,12);return num(`Sur une carte au 1/${nf(e)}, deux villages sont à ${c} cm. Distance réelle en km ?`,c*e/100000,{unit:'km',expl:`${c} × ${nf(e)} = ${nf(c*e)} cm = <b>${nf(c*e/100000)} km</b>.`,hint:'Multiplie, puis convertis (1 km = 100 000 cm).'});},3],
  [d=>{const q=P([2,4]),g=P([100,150,200,250]),n=P([6,8,10,12].filter(x=>x%q===0||true));return num(`Une recette pour ${q} personnes utilise ${g} g de sucre. Combien pour ${n} personnes ?`,g*n/q,{unit:'g',expl:`Pour 1 personne : ${g} ÷ ${q} = ${g/q} g ; pour ${n} : <b>${g*n/q} g</b>.`,hint:'Retour à l’unité.'});},2],
  [bank([['Le prix des timbres est-il proportionnel au nombre de timbres (même tarif) ?','oui',['non','seulement pour 10 timbres','on ne peut pas savoir'],'Prix = prix unitaire × nombre.'],['La pointure d’une personne est-elle proportionnelle à son âge ?','non',['oui','seulement chez les enfants','oui, coefficient 3'],'La pointure ne double pas quand l’âge double.']]),1])},

/* ======================= 6x ======================= */
{id:'6x',name:'Pensée informatique et algorithmes',icon:'🤖',domain:'Initiation à la pensée informatique',
 refs:[REF,PRG+' — 6e : identifier une instruction ou une séquence d’instructions, produire et exécuter une séquence, répéter une séquence, programmer un chemin simple'],
 tip:'Exécute les instructions une par une, dans l’ordre, en suivant le déplacement sur un quadrillage avec ton doigt.',
 c:C(`Un robot sur un quadrillage obéit à des <b>instructions</b> : « avancer », « tourner à droite », « tourner à gauche ». Une suite d’instructions dans un ordre précis est un <b>algorithme</b>. Écrire et exécuter des algorithmes, c’est commencer à programmer.`,
  [T('Instructions et séquences',`<p>Une <b>instruction</b> est un ordre élémentaire. Une <b>séquence</b> est une suite d’instructions exécutées dans l’ordre. Changer l’ordre change le résultat.</p><p>Exemple : depuis la case de départ, « avancer 2 ; tourner à droite ; avancer 1 ».</p>`),
   T('Répéter',`<p>Quand une partie se répète, on utilise une <b>boucle</b> : « répéter 4 fois : avancer 3 ; tourner à droite » fait faire un carré au robot.</p><p>Pour corriger un algorithme, on l’exécute pas à pas et on cherche la première instruction qui donne un résultat inattendu.</p>`)],
  [{q:'Robot orienté vers le nord : « avancer 2 ; tourner à droite ; avancer 3 ». Où est-il par rapport au départ ?',s:['Avancer 2 : 2 cases vers le nord.','Tourner à droite : il regarde vers l’est.','Avancer 3 : 3 cases vers l’est. Il est 2 cases au nord et 3 à l’est du départ.']}],
  ['Je note l’orientation de départ.','J’exécute chaque instruction dans l’ordre.','Pour une boucle, je répète le bloc le nombre de fois indiqué.','Je vérifie la position finale.'],
  ['Confondre tourner à droite et à gauche selon l’orientation du robot.','Changer l’ordre des instructions.','Compter une répétition de trop.'],
  ['Algorithme : instructions dans un ordre précis.','Boucle : répéter une séquence.','On débogue pas à pas.']),
 g:mix([d=>{const a=R(1,5),b=R(1,5);const t=P(['droite','gauche']);return ch(`Un robot regarde vers le nord. Programme : « avancer ${a} ; tourner à ${t} ; avancer ${b} ». Où arrive-t-il par rapport au départ ?`,`${a} case${a>1?'s':''} au nord et ${b} case${b>1?'s':''} à l’${t==='droite'?'est':'ouest'}`,[`${a} case${a>1?'s':''} au nord et ${b} case${b>1?'s':''} à l’${t==='droite'?'ouest':'est'}`,`${b} case${b>1?'s':''} au nord et ${a} case${a>1?'s':''} à l’${t==='droite'?'est':'ouest'}`,`${a+b} cases au nord`],{expl:`Après « tourner à ${t} », il regarde vers l’${t==='droite'?'est':'ouest'} : ${a} au nord puis ${b} à l’${t==='droite'?'est':'ouest'}.`,hint:'Suis l’orientation du robot.'});},3],
  [d=>{const n=R(2,6),a=R(1,4);return num(`« Répéter ${n} fois : avancer de ${a} cases ». Combien de cases le robot parcourt-il ?`,n*a,{expl:`${n} × ${a} = <b>${n*a}</b> cases.`,hint:'Nombre de répétitions × cases.'});},2],
  [d=>{const n=P([3,4,6]);return num(`Pour faire un tour complet en ${n} rotations égales, de combien de degrés le robot doit-il tourner à chaque fois ?`,360/n,{unit:'°',expl:`360 ÷ ${n} = <b>${360/n}°</b>.`,hint:'Un tour = 360°.'});},1],
  [bank([['Que se passe-t-il si on échange deux instructions d’un algorithme ?','le résultat peut changer',['rien ne change jamais','le robot s’arrête','l’algorithme devient une boucle'],'L’ordre des instructions compte.'],['« Répéter 4 fois : avancer 2 ; tourner à droite » fait dessiner au robot…','un carré',['un triangle','une ligne droite','un cercle'],'4 côtés égaux et 4 quarts de tour.'],['Pour trouver une erreur dans un programme, on…','l’exécute pas à pas',['le recopie','l’efface','ajoute des instructions au hasard'],'On cherche la première étape fausse.']]),1])}
]);
})();
