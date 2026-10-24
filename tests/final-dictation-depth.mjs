import fs from 'node:fs';
import vm from 'node:vm';

const file='data/primary/enrich-final-release.js';
const src=fs.readFileSync(file,'utf8');
const enriched=new Map();
let pickIndex=0;
const H={
  P:a=>a[(pickIndex++)%a.length],
  txt:(q,acc,o={})=>({type:'text',q,acc:Array.isArray(acc)?acc:[acc],...o})
};
const context={window:{MQPrimary:{H,enrich:(id,o)=>enriched.set(id,o)}}};
vm.createContext(context);
vm.runInContext(src,context,{filename:file});

function check(id,expectedMinimum){
  const cfg=enriched.get(id);
  if(!cfg||!Array.isArray(cfg.items)||typeof cfg.items[0]!=='function')throw new Error(`${id}: enrichissement absent ou invalide`);
  const gen=cfg.items[0];
  const answers=new Set();
  for(const d of [1,2,3]){
    for(let i=0;i<180;i++){
      const q=gen(d);
      if(!q||q.type!=='text'||!q.acc||!q.acc[0])throw new Error(`${id}: question de dictée invalide`);
      const answer=String(q.acc[0]);
      answers.add(answer);
      if(!q.audio||q.audio.t!==answer||q.audio.l!=='fr-FR')throw new Error(`${id}: audio absent ou différent de la dictée « ${answer} »`);
      if(!q.strict)throw new Error(`${id}: correction stricte désactivée`);
    }
  }
  if(answers.size<expectedMinimum)throw new Error(`${id}: seulement ${answers.size} contenus dictés distincts, attendu >= ${expectedMinimum}`);
  return answers.size;
}

const cp=check('cp-fr-dictee',85);
const ce1=check('ce1-fr-dictee',70);
if(!(enriched.get('cp-fr-dictee').w>=0.65&&enriched.get('ce1-fr-dictee').w>=0.65))throw new Error('Poids des nouvelles banques de dictée insuffisant');
console.log(`Dictées finales OK — CP: ${cp} contenus distincts ; CE1: ${ce1} contenus distincts ; audio aligné.`);
