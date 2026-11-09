/* Bouton « Valider » de l'exercice : jamais hors de la carte ni de l'écran, même avec la police système agrandie (09/11/2026).
   Cause établie : la rangée .qbtns (Indice, Brouillon, Finot, « Pourquoi ? », Valider) restait en « nowrap » au-dessus de 440 px ;
   avec la police Android à 2,0× (textZoom de la WebView), la somme des largeurs minimales des boutons dépassait la carte et
   « Valider » sortait de 13 px à droite de l'écran (viewport ≈ 985 px = tablette 1280 px à l'affichage agrandi).
   Seuls les types d'exercice avec « Valider » (num, frac, text, multi, order) sont concernés, d'où le caractère « aléatoire ».
   Le texte agrandi est émulé comme Android : chaque taille de police calculée est multipliée, les largeurs CSS ne changent pas.
   Déterministe : générateurs initialisés par un PRNG fixe. Durée visée < 60 s. */
const {serve,launch,seedProfile,gotoRetry,main}=require('./lib');
const VPS=[[800,1280],[1280,800],[985,617],[985,1580],[448,900],[412,915],[360,640],[320,568]];
const SCALES=[1,1.5,2];
const GRADES=['6e'];
function PLAN(){
  let st=424242;Math.random=()=>{st=(st*1664525+1013904223)%4294967296;return st/4294967296;};
  const seenType={},plan=[],want=['num','frac','text','multi','order','choice'];
  for(const c of ALLCH){if(!WMAP[c.id]||typeof c.g!=='function'||!byId(c.id))continue;
    for(const d of [1,2,3]){let q;try{q=c.g(d);}catch(e){continue;}if(!q||!want.includes(q.type))continue;
      const key=q.type+'|'+(q.unit?1:0)+'|'+(q.lang||'')+'|'+((q.chips||[]).join('')); if(seenType[key])continue;seenType[key]=1;plan.push([c.id,d,q.type]);}}
  return plan;
}
function MEASURE({scale,plan}){
  let st=424242;Math.random=()=>{st=(st*1664525+1013904223)%4294967296;return st/4294967296;};
  const W=document.documentElement.clientWidth,out=[];let n=0;
  const scaleText=()=>{if(scale===1)return;document.querySelectorAll('#app .qcard *,#app .qtop *,#app .qcard').forEach(e=>{if(e.dataset.mqs)return;e.dataset.mqs='1';e.style.setProperty('font-size',(parseFloat(getComputedStyle(e).fontSize)*scale)+'px','important');});};
  const measure=(tag,cid,type)=>{n++;
    const de=document.documentElement,bad=[];
    if(de.scrollWidth-de.clientWidth>1)bad.push('défilement horizontal +'+(de.scrollWidth-de.clientWidth));
    const card=document.querySelector('#app .qcard'),cr=card&&card.getBoundingClientRect();
    const btns=[...document.querySelectorAll('#app .qbtns button')].filter(b=>b.getClientRects().length);
    const rs=btns.map(b=>b.getBoundingClientRect());
    btns.forEach((b,i)=>{const r=rs[i],nm=b.dataset.a||b.textContent.trim().slice(0,10);
      if(r.right>W+0.5||r.left<-0.5)bad.push('hors écran '+nm+' '+Math.round(r.left)+'-'+Math.round(r.right)+'/'+W);
      else if(cr&&r.right>cr.right+0.5)bad.push('hors carte '+nm+' '+Math.round(r.right)+'>'+Math.round(cr.right));});
    for(let i=0;i<rs.length;i++)for(let j=i+1;j<rs.length;j++){const a=rs[i],c=rs[j];if(Math.min(a.right,c.right)-Math.max(a.left,c.left)>1&&Math.min(a.bottom,c.bottom)-Math.max(a.top,c.top)>1)bad.push('chevauchement '+(btns[i].dataset.a||i)+'/'+(btns[j].dataset.a||j));}
    const v=document.querySelector('#app [data-a="valid"]');
    if(v&&!bad.length){v.scrollIntoView({block:'center'});const r=v.getBoundingClientRect(),t=document.elementFromPoint(Math.min(W-1,r.left+r.width/2),Math.min(innerHeight-1,Math.max(0,r.top+r.height/2)));if(!t||!(t===v||v.contains(t)))bad.push('Valider injoignable');scrollTo(0,0);}
    if(bad.length)out.push(tag+' '+cid+' '+type+' : '+bad.join(' ; '));};
  for(const [cid,d,type] of plan){
    try{home();startMission([cid]);let q;let st2=1;Math.random=()=>{st2=(st2*1664525+1013904223)%4294967296;return st2/4294967296;};
      for(let k=0;k<30;k++){q=CHMAP[cid].g(d);if(q&&q.type===type)break;}
      M.d=d;M.q=q;M.locked=false;renderQ();scaleText();measure('Q',cid,type);
      if(q.type==='choice')validate((q.ans+1)%q.choices.length);else{M.your='?';result(false);}scaleText();measure('C',cid,type);
    }catch(e){out.push('erreur '+cid+' '+e.message);}}
  return {n,out,plan:plan.length};
}
main(async()=>{
  let PLANV=null;const R=[];const {srv,url}=await serve();const b=await launch();let total=0;
  for(const [w,h] of VPS)for(const g of GRADES){
    const fails=[];let n=0;
    const ctx=await b.newContext({viewport:{width:w,height:h},isMobile:w<900,hasTouch:true,deviceScaleFactor:2});
    const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
    await gotoRetry(p,url+'index.html',{waitUntil:'load'});await seedProfile(p,'Lina',g);
    if(!PLANV)PLANV=await p.evaluate(PLAN);
    for(const sc of SCALES){
      const r=await p.evaluate(MEASURE,{scale:sc,plan:PLANV});n+=r.n;
      r.out.slice(0,3).forEach(o=>fails.push(`police ×${sc} : ${o}`));
      if(r.plan<8)fails.push('trop peu de types balayés : '+r.plan);}
    if(errs.length)fails.push('erreur JS '+errs[0]);
    await ctx.close();
    total+=n;
    R.push({name:`Exercice ${w}×${h}, profil ${g}, police ×1/×1,5/×2 : boutons d'action dans la carte et l'écran, sans chevauchement (${n} écrans)`,ok:!fails.length,detail:fails.join(' || ')});
  }
  await b.close();srv.close();
  R.push({name:`Balayage terminé (${total} écrans mesurés)`,ok:total>500,detail:String(total)});
  return R;
});
