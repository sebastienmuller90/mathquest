import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const root = process.cwd();
const primaryDir = path.join(root, 'data', 'primary');
const files = fs.readdirSync(primaryDir)
  .filter(name => /^enrich-(cp|ce1|ce2|cm1|cm2)\.js$/.test(name))
  .sort();

// Pour comparer une réponse QCM, préserver casse, accents et ponctuation :
// "Le" != "le", "a" != "à", "ou" != "où", "?" != ".".
const exact = value => String(value ?? '')
  .normalize('NFC')
  .replace(/[’‘`]/g, "'")
  .replace(/<[^>]*>/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();

// Pour retrouver les mots d'un exercice d'ordre dans son explication,
// une comparaison accent-insensible et sans casse est utile.
const semantic = value => String(value ?? '')
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/[’‘`]/g, "'")
  .replace(/<[^>]*>/g, ' ')
  .replace(/[^a-zA-Z0-9'À-ÿ]+/g, ' ')
  .replace(/\s+/g, ' ')
  .trim()
  .toLowerCase();

const collected = [];
const H = new Proxy({}, { get: () => (...args) => ({ __helper: true, args }) });
const MQPrimary = {
  H,
  enrich(id, cfg = {}) {
    collected.push({ id, cfg, file: currentFile });
  },
  order: (...args) => ({ __order: true, args })
};
let currentFile = '';

const context = {
  console,
  window: { MQPrimary },
  Math,
  Date,
  Number,
  String,
  Array,
  Object,
  JSON,
  RegExp,
  Set,
  Map,
  parseInt,
  parseFloat,
  isFinite
};
context.globalThis = context;
vm.createContext(context);

for (const name of files) {
  currentFile = `data/primary/${name}`;
  const code = fs.readFileSync(path.join(primaryDir, name), 'utf8');
  vm.runInContext(code, context, { filename: currentFile, timeout: 30000 });
}

assert.ok(collected.length > 0, 'Aucune banque enrichie chargée');

const issues = [];
const duplicateBlocks = [];
const seenChapterIds = new Map();
let itemCount = 0;
let orderCount = 0;
let mcqCount = 0;

function pushIssue(entry, message, details = {}) {
  issues.push({ file: entry.file, chapter: entry.id, message, ...details });
}

function checkOrder(entry, item, itemIndex) {
  orderCount++;
  const order = item.o;
  if (!Array.isArray(order) || order.length < 2) {
    pushIssue(entry, 'Exercice d’ordre invalide : moins de 2 éléments', { itemIndex });
    return;
  }

  const exactOrder = order.map(exact);
  if (new Set(exactOrder).size !== exactOrder.length) {
    pushIssue(entry, 'Exercice d’ordre : éléments dupliqués', { itemIndex, order });
  }

  const normOrder = order.map(semantic);
  const expl = semantic(item.e || '');
  if (expl) {
    const positions = normOrder.map(token => token ? expl.indexOf(token) : -1);
    if (positions.every(pos => pos >= 0)) {
      const increasing = positions.every((pos, i) => i === 0 || pos > positions[i - 1]);
      if (!increasing) {
        pushIssue(entry, 'Ordre attendu contradictoire avec l’explication', {
          itemIndex,
          question: item.q,
          order,
          explanation: item.e,
          positions
        });
      }
    }
  }

  const numeric = order.map(v => /^-?\d+(?:[.,]\d+)?$/.test(String(v).trim()) ? Number(String(v).replace(',', '.')) : NaN);
  const q = semantic(item.q || '');
  if (numeric.every(Number.isFinite) && /(chronolog|plus ancien|ancien au plus recent|ordre)/.test(q)) {
    const ascending = numeric.every((value, i) => i === 0 || value >= numeric[i - 1]);
    if (!ascending) {
      pushIssue(entry, 'Chronologie numérique non croissante', { itemIndex, question: item.q, order });
    }
  }
}

function checkMCQ(entry, item, itemIndex) {
  mcqCount++;
  const [question, correct, distractors] = item;
  if (!Array.isArray(distractors)) return;
  const correctNorm = exact(correct);
  const dNorm = distractors.map(exact);
  if (dNorm.includes(correctNorm)) {
    pushIssue(entry, 'La bonne réponse apparaît aussi dans les distracteurs', { itemIndex, question, correct, distractors });
  }
  if (new Set(dNorm).size !== dNorm.length) {
    pushIssue(entry, 'Distracteurs dupliqués', { itemIndex, question, distractors });
  }
  if (dNorm.some(v => v.length === 0)) {
    pushIssue(entry, 'Distracteur vide', { itemIndex, question, distractors });
  }
}

for (const entry of collected) {
  if (seenChapterIds.has(entry.id)) {
    duplicateBlocks.push({ file: entry.file, chapter: entry.id, previous: seenChapterIds.get(entry.id) });
  } else {
    seenChapterIds.set(entry.id, entry.file);
  }

  const items = Array.isArray(entry.cfg?.items) ? entry.cfg.items : [];
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    itemCount++;
    if (Array.isArray(item)) {
      checkMCQ(entry, item, i);
      continue;
    }
    if (!item || typeof item !== 'object') continue;
    if (Array.isArray(item.o)) checkOrder(entry, item, i);
    if (Object.hasOwn(item, 'tf') && typeof item.v !== 'boolean') {
      pushIssue(entry, 'Vrai/faux sans booléen v', { itemIndex: i, prompt: item.tf, value: item.v });
    }
    if (Object.hasOwn(item, 'n') && !Number.isFinite(Number(item.a))) {
      pushIssue(entry, 'Question numérique avec réponse non numérique', { itemIndex: i, prompt: item.n, answer: item.a });
    }
  }
}

const summary = {
  files: files.length,
  enrichBlocks: collected.length,
  uniqueChapters: new Set(collected.map(x => x.id)).size,
  items: itemCount,
  mcq: mcqCount,
  order: orderCount,
  issues: issues.length,
  duplicateEnrichBlocks: duplicateBlocks.length
};

const report = { summary, issues, duplicateBlocks };
fs.writeFileSync(path.join(root, 'tests', 'wave1-data-consistency-report.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));

if (issues.length) {
  console.error(`\n❌ ${issues.length} incohérence(s) réelle(s) détectée(s).`);
  process.exitCode = 1;
} else {
  console.log(`\n✅ Cohérence des banques Wave 1 : ${itemCount} items contrôlés, ${orderCount} exercices d’ordre.`);
}
