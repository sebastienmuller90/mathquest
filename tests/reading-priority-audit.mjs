import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const report=JSON.parse(fs.readFileSync(path.join(root,'tests/reading-gap-report.json'),'utf8'));
const normalize=s=>String(s??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();

const tierA=[
  /comprend/,/lecture/,/litterat/,/document/,/recit/,/ecrire/,/oeuvre/,/justif/,/resum/,/argument/,/paragraphe/,/oral/,/debatt/,/presenter/,/discours/,/description/,/media/,/information/,/narrat/,/poes/,/theatre/
];
const tierB=[
  /vocab/,/lexique/,/sens/,/registre/,/connecteur/,/formation des mots/,/champ lexical/,/synonyme/,/contraire/,/polysem/,/connotation/,/reference/,/dialogue/,/phrase complexe/,/ponctuation/
];
const levelsOrder=['CP','CE1','CE2','CM1','CM2','6e','5e','4e','3e'];
const priorities={A:[],B:[],C:[]};
for(const level of levelsOrder){
  const row=report.levels[level];
  for(const ch of row?.missingChapters||[]){
    const t=normalize(ch.title);
    const tier=tierA.some(r=>r.test(t))?'A':tierB.some(r=>r.test(t))?'B':'C';
    priorities[tier].push({level,...ch});
  }
}
const byLevel={};
for(const level of levelsOrder){
  byLevel[level]={A:priorities.A.filter(x=>x.level===level).length,B:priorities.B.filter(x=>x.level===level).length,C:priorities.C.filter(x=>x.level===level).length};
}
const out={
  summary:{
    missingFrenchChapters:report.summary.missing,
    priorityA:priorities.A.length,
    priorityB:priorities.B.length,
    grammarOrOtherC:priorities.C.length,
    note:'A = support de lecture/compréhension prioritaire ; B = texte contextualisé utile ; C = grammaire/conjugaison/orthographe ou autre, pas de texte complet requis par défaut.'
  },
  byLevel,
  priorities
};
fs.writeFileSync(path.join(root,'tests/reading-priority-report.json'),JSON.stringify(out,null,2));
const md=['# Finot Académie — backlog lecture / compréhension priorisé','',
`Parmi les **${report.summary.missing}** chapitres de français sans lien de lecture, tous ne doivent pas recevoir artificiellement un texte complet.`, '',
`- Priorité A — lecture/compréhension/littérature/écriture/oral : **${priorities.A.length}**`,
`- Priorité B — lexique/sens/discours/phrase contextualisable : **${priorities.B.length}**`,
`- Priorité C — grammaire/conjugaison/orthographe/autre : **${priorities.C.length}** (pas de texte complet requis par défaut)`, '',
'## Priorité A',''];
for(const x of priorities.A)md.push(`- **${x.level}** — \`${x.id}\` — ${x.title}`);
md.push('','## Priorité B','');
for(const x of priorities.B)md.push(`- **${x.level}** — \`${x.id}\` — ${x.title}`);
md.push('','## Couverture par niveau','', '| Niveau | A | B | C |','|---|---:|---:|---:|');
for(const level of levelsOrder){const x=byLevel[level];md.push(`| ${level} | ${x.A} | ${x.B} | ${x.C} |`);}
fs.writeFileSync(path.join(root,'docs/reading-comprehension-backlog.md'),md.join('\n'));
console.log(JSON.stringify(out,null,2));
