import { chromium } from 'playwright';
import fs from 'node:fs';

const base=process.env.MQ_BASE_URL||'http://127.0.0.1:4173';
const errors=[];
const fail=m=>errors.push(m);
const browser=await chromium.launch({headless:true});
const ctx=await browser.newContext({viewport:{width:430,height:900},reducedMotion:'reduce'});
const page=await ctx.newPage();
page.on('pageerror',e=>fail('runtime:'+e.message));

await page.goto(base+'/index.html',{waitUntil:'load'});
await page.waitForFunction(()=>window.MQPedagogicalWorkshop&&window.CHMAP?.['ce2-ma-donnees'],{timeout:8000});

const audit=await page.evaluate(()=>{
  const id='ce2-ma-donnees';
  const spec=MQPedagogicalWorkshop.dataSpec(id);
  const built=MQPedagogicalWorkshop.build(id);
  const questions=Array.isArray(spec?.questions)?spec.questions:[];
  return {
    exists:!!CHMAP[id],
    grade:WMAP[id]?.lvl||'',
    topic:spec?.topic||null,
    subtype:spec?.subtype||null,
    values:Array.isArray(spec?.values)?spec.values.slice():[],
    secondary:Array.isArray(spec?.secondary?.values)?spec.secondary.values.slice():[],
    secondaryLabel:spec?.secondary?.label||'',
    questions,
    hasSecondaryRow:/mq-data-secondary/.test(built?.h||''),
    hasForbidden:questions.some(q=>/moyenne|étendue|etendue|pourcent/i.test(q)),
    hasAddition:questions.some(q=>/addition|additionne|total|ensemble|en tout/i.test(q)),
    html:built?.h||''
  };
});

if(!audit.exists)fail('ce2-chapter-missing');
if(audit.grade!=='CE2')fail('ce2-grade:'+audit.grade);
if(audit.topic!=='statistics')fail('ce2-topic:'+audit.topic);
if(audit.subtype!=='elementary-double-table')fail('ce2-subtype:'+audit.subtype);
if(audit.values.length!==4||audit.secondary.length!==4)fail('ce2-double-entry-shape');
if(!audit.hasSecondaryRow)fail('ce2-secondary-row-not-rendered');
if(audit.hasForbidden)fail('ce2-forbidden-statistics-concept');
if(!audit.hasAddition)fail('ce2-missing-addition-task');
if(!/groupe|équipe|equipe/i.test(audit.secondaryLabel+' '+audit.html))fail('ce2-second-row-not-explicit');

await browser.close();
const report={audit:{...audit,html:undefined},errorCount:errors.length,errors};
fs.writeFileSync('tests/phase4-ce2-data-audit-report.json',JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));
if(errors.length)process.exitCode=1;else console.log('PHASE4_CE2_DATA_AUDIT_OK');
