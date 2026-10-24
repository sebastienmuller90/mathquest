/* Outils communs aux audits de release (24/10/2026) : contextes propres, inscription réelle par l'assistant, instantané d'un profil.
   Ne touche à aucun fichier de l'appli ; complète lib.js sans le modifier. */
const {serve,launchEngine}=require('./lib');
// Contexte « première installation » : splash ignoré, localStorage vidé une seule fois (pas à chaque rechargement).
async function freshContext(b,url,opts={}){
  const ctx=await b.newContext({viewport:{width:opts.w||390,height:opts.h||844},colorScheme:opts.scheme||'light',hasTouch:(opts.w||390)<800});
  await ctx.addInitScript(()=>{try{sessionStorage.setItem('fa_splash_shown','1');}catch(e){}});
  const p=await ctx.newPage();const errs=[];
  p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push('console: '+m.text());});
  await p.goto(url+'index.html',{waitUntil:'load'});await p.evaluate(()=>{try{localStorage.clear();}catch(e){}});await p.goto(url+'index.html',{waitUntil:'load'});
  return {ctx,p,errs};}
// Inscription réelle (étapes de l'assistant moderne). spec : {name,gender,birth,stage,grade,companion}
async function wizard(p,spec){const s={gender:'girl',birth:'',stage:'primaire',companion:'finot',...spec};
  await p.waitForSelector('.pob-shell',{timeout:8000});
  await p.fill('#pob-name',s.name);await p.click(`[data-pob="gender"][data-value="${s.gender}"]`);await p.click('[data-pob="next"]');
  if(s.birth){await p.fill('#pob-birth',s.birth);}
  await p.click('[data-pob="next"]');
  await p.click(`[data-pob="stage"][data-value="${s.stage}"]`);await p.click(`[data-pob="grade"][data-value="${s.grade}"]`);await p.click('[data-pob="next"]');
  await p.click(`[data-pob="companion"][data-value="${s.companion}"]`);await p.click('[data-pob="next"]');
  await p.click('[data-pob="level"][data-value="ok"]');await p.click('[data-pob="confidence"][data-value="medium"]');await p.click('[data-pob="help"][data-value="try"]');await p.click('[data-pob="next"]');
  await p.click('[data-pob="goal"][data-value="understand"]');await p.click('[data-pob="pace"][data-value="balanced"]');await p.click('[data-pob="next"]');await p.click('[data-pob="finish"]');
  await p.waitForFunction(n=>typeof S!=='undefined'&&S.name===n,s.name,{timeout:8000});
  await p.waitForFunction(()=>typeof CUR!=='undefined'&&CUR==='diagnostic',null,{timeout:5000}).catch(()=>{});
  const pause=p.locator('[data-a="diagpause"]');if(await pause.count())await pause.click();
  await p.waitForFunction(()=>CUR==='home',null,{timeout:5000});}
// Profil enregistré tel que stocké (ce que verrait un redémarrage)
const stored=p=>p.evaluate(()=>{const o=JSON.parse(localStorage.getItem('mathquest_profiles_v2')||'null');return o;});

// Répond à la question affichée par de VRAIS clics / saisies. correct=false → réponse volontairement fausse.
async function answerQuestion(p,correct=true){
  const q=await p.evaluate(()=>{const x=M&&M.q;if(!x)return null;return {type:x.type,ans:x.ans,acc:x.acc,tokens:x.tokens,n:(x.opts||x.choices||[]).length||document.querySelectorAll('.choice').length,labels:x.labels?x.labels.length:0,simplest:!!x.simplest};});
  if(!q)return null;
  const gcd=(a,b)=>b?gcd(b,a%b):a;
  if(q.type==='choice'){const n=await p.locator('.choice').count();const i=correct?q.ans:(q.ans+1)%n;await p.locator('.choice').nth(i).click();}
  else if(q.type==='order'){
    const idx=await p.evaluate(()=>{const x=M.q;const want=x.ans.split(' ');const used=new Set();return want.map(w=>{const i=x.tokens.findIndex((t,j)=>t===w&&!used.has(j));used.add(i);return i;});});
    const seq=correct?idx:idx.slice().reverse();
    for(const i of seq){await p.locator('.otok').nth(i).click().catch(async()=>{await p.evaluate(i=>{const x=M.q;x._sel=x._sel||[];x._sel.push(i);},i);});}
    await p.click('[data-a="valid"]');
    return {type:q.type,correct};}
  else if(q.type==='multi'){for(let i=0;i<q.labels;i++)await p.fill('#in'+i,correct?String(q.ans[i]):'987654');await p.click('[data-a="valid"]');}
  else{let v;
    if(q.type==='num')v=correct?String(q.ans):'987654.321';
    else if(q.type==='frac'){const g=gcd(q.ans[0],q.ans[1]);v=correct?`${q.ans[0]/g}/${q.ans[1]/g}`:'987/654';}
    else v=correct?String(q.acc[0]):'zzzzqq';
    await p.fill('#in0',v);await p.click('[data-a="valid"]');}
  return {type:q.type,correct};}
// Joue une mission en entier : pattern = tableau de booléens (juste/faux) répété ; renvoie le nombre de questions jouées.
async function playMission(p,pattern=[true],opts={}){let n=0;
  for(let guard=0;guard<40;guard++){
    const state=await p.evaluate(()=>({cur:CUR,hasQ:!!(M&&M.q)}));
    if(state.cur==='mission-end'||!state.hasQ)break;
    const ok=pattern[n%pattern.length];
    if(opts.hintOn===n&&await p.locator('[data-a="hint"]').count())await p.click('[data-a="hint"]');
    await answerQuestion(p,ok);n++;
    await p.waitForSelector('[data-a="next"],.mend,#mend,.endcard',{timeout:4000}).catch(()=>{});
    if(await p.locator('[data-a="next"]').count())await p.click('[data-a="next"]');
    await p.waitForTimeout(40);}
  return n;}
module.exports={serve,launchEngine,freshContext,wizard,stored,answerQuestion,playMission};
