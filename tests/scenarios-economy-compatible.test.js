/* Adaptateur temporaire du scénario historique pour l'économie anti-farm.
   Exécute les 17 contrôles existants sans les dupliquer. Seule l'assertion 7a,
   qui codait en dur l'ancien 10*d*combo, est réinterprétée avec le nouveau contrat. */
const base=require('./scenarios.test.js');
async function run(){
 const R=await base();
 const t=R.find(x=>/^7a\./.test(x.name));
 if(t&&!t.ok){
  try{
   const d=JSON.parse(t.detail||'{}'),first=(d.r1?.xp||0)-(d.g1?.xp||0),hinted=(d.r2?.xp||0)-(d.g2?.xp||0);
   const ok=!!d.r1?.good&&!!d.g2?.hint&&!!d.g2?.flag&&first>0&&hinted>0&&hinted<=Math.ceil(first/2);
   if(ok){t.ok=true;t.name='7a. Bonne réponse neuve récompensée ; un indice réduit réellement le gain';t.detail=JSON.stringify({...d,newEconomy:{firstGain:first,hintedGain:hinted}});}
  }catch(e){t.detail=(t.detail||'')+' | adaptateur: '+e.message;}
 }
 return R;
}
if(require.main===module)require('./lib').main(()=>run());
module.exports=run;
