import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root=process.cwd();
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const el=()=>({style:{},dataset:{},classList:{add(){},remove(){},toggle(){}},appendChild(){},remove(){},setAttribute(){},getAttribute(){return null},addEventListener(){},removeEventListener(){},querySelector(){return null},querySelectorAll(){return[]},focus(){},click(){},scrollIntoView(){},innerHTML:'',textContent:'',value:'',checked:false,disabled:false});
const document={readyState:'loading',visibilityState:'visible',body:el(),documentElement:el(),createElement:el,getElementById:()=>el(),querySelector(){return null},querySelectorAll(){return[]},addEventListener(){},removeEventListener(){}};
const c={console,document,navigator:{userAgent:'reading-gap-audit',language:'fr-FR',onLine:true},location:{protocol:'https:',hostname:'localhost',origin:'https://localhost',pathname:'/'},localStorage:{getItem(){return null},setItem(){},removeItem(){}},sessionStorage:{getItem(){return null},setItem(){},removeItem(){}},matchMedia:()=>({matches:false,addEventListener(){},removeEventListener(){}}),setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame:f=>setTimeout(f,0),cancelAnimationFrame:clearTimeout,Audio:function(){return{play(){return Promise.resolve()},pause(){}}},Image:function(){},speechSynthesis:{speak(){},cancel(){},getVoices(){return[]}},SpeechSynthesisUtterance:function(){},fetch:async()=>({ok:false,status:404,text:async()=>'',json:async()=>({})}),crypto:globalThis.crypto,URL,URLSearchParams,TextEncoder,TextDecoder,structuredClone,performance:{now:()=>Date.now()},alert(){},confirm(){return false},prompt(){return null},addEventListener(){},removeEventListener(){}};
c.window=c;c.self=c;c.globalThis=c;vm.createContext(c);
const html=read('index.html');
const scripts=[...html.matchAll(/<script\s+src=["']([^"']+)["']/g)].map(m=>m[1].split(/[?#]/)[0]);
for(const s of scripts){if(s.startsWith('js/vendor/'))continue;const f=path.join(root,s);if(!fs.existsSync(f))continue;vm.runInContext(read(s),c,{filename:s,timeout:30000});if(s==='js/app-content.js')break;}
const CH=vm.runInContext(`typeof CHMAP==='object'?CHMAP:{}`,c);
const R=c.MQ_READING?.resources||{};
const linked=new Set(Object.values(R).flatMap(r=>r.chapterLinks||[]));
const levels=[
  ['CP',/^cp-fr-/],['CE1',/^ce1-fr-/],['CE2',/^ce2-fr-/],['CM1',/^cm1-fr-/],['CM2',/^cm2-fr-/],
  ['6e',/^fr6/],['5e',/^fr5/],['4e',/^fr4/],['3e',/^fr3/]
];
const byLevel={};
for(const [level,re] of levels){
  const chapters=Object.values(CH).filter(ch=>re.test(ch.id)).map(ch=>({id:ch.id,title:ch.name||ch.title||ch.id})).sort((a,b)=>a.id.localeCompare(b.id));
  const covered=chapters.filter(ch=>linked.has(ch.id));
  const missing=chapters.filter(ch=>!linked.has(ch.id));
  byLevel[level]={totalFrenchChapters:chapters.length,covered:covered.length,coveragePct:chapters.length?Math.round(covered.length/chapters.length*1000)/10:0,missing:missing.length,coveredIds:covered.map(x=>x.id),missingChapters:missing};
}
const total=Object.values(byLevel).reduce((a,x)=>({chapters:a.chapters+x.totalFrenchChapters,covered:a.covered+x.covered,missing:a.missing+x.missing}),{chapters:0,covered:0,missing:0});
total.coveragePct=total.chapters?Math.round(total.covered/total.chapters*1000)/10:0;
const report={summary:total,levels:byLevel};
fs.writeFileSync(path.join(root,'tests/reading-gap-report.json'),JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));
