// Contrôle de data/atlas-france.js (régions et départements de France). Node pur, aucune dépendance, aucun réseau.
// Usage : node tools/atlas-check-france.mjs      → code de sortie 0 si tout est bon, 1 sinon.
// La table de référence ci-dessous est volontairement INDÉPENDANTE du générateur (préfectures et chefs-lieux officiels).
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const w = {}; new Function('window', readFileSync(join(ROOT, 'data', 'atlas-france.js'), 'utf8'))(w);
const T = w.MQ_ATLAS_T || {}; const R = T.regions || {}, D = T.departements || {};
const errs = []; const bad = (m) => errs.push(m); const ok = (c, m) => { if (!c) bad(m); };

const PREF = { '01': 'Bourg-en-Bresse', '02': 'Laon', '03': 'Moulins', '04': 'Digne-les-Bains', '05': 'Gap', '06': 'Nice', '07': 'Privas', '08': 'Charleville-Mézières', '09': 'Foix', '10': 'Troyes', '11': 'Carcassonne', '12': 'Rodez', '13': 'Marseille', '14': 'Caen', '15': 'Aurillac', '16': 'Angoulême', '17': 'La Rochelle', '18': 'Bourges', '19': 'Tulle', '21': 'Dijon', '22': 'Saint-Brieuc', '23': 'Guéret', '24': 'Périgueux', '25': 'Besançon', '26': 'Valence', '27': 'Évreux', '28': 'Chartres', '29': 'Quimper', '2A': 'Ajaccio', '2B': 'Bastia', '30': 'Nîmes', '31': 'Toulouse', '32': 'Auch', '33': 'Bordeaux', '34': 'Montpellier', '35': 'Rennes', '36': 'Châteauroux', '37': 'Tours', '38': 'Grenoble', '39': 'Lons-le-Saunier', '40': 'Mont-de-Marsan', '41': 'Blois', '42': 'Saint-Étienne', '43': 'Le Puy-en-Velay', '44': 'Nantes', '45': 'Orléans', '46': 'Cahors', '47': 'Agen', '48': 'Mende', '49': 'Angers', '50': 'Saint-Lô', '51': 'Châlons-en-Champagne', '52': 'Chaumont', '53': 'Laval', '54': 'Nancy', '55': 'Bar-le-Duc', '56': 'Vannes', '57': 'Metz', '58': 'Nevers', '59': 'Lille', '60': 'Beauvais', '61': 'Alençon', '62': 'Arras', '63': 'Clermont-Ferrand', '64': 'Pau', '65': 'Tarbes', '66': 'Perpignan', '67': 'Strasbourg', '68': 'Colmar', '69': 'Lyon', '70': 'Vesoul', '71': 'Mâcon', '72': 'Le Mans', '73': 'Chambéry', '74': 'Annecy', '75': 'Paris', '76': 'Rouen', '77': 'Melun', '78': 'Versailles', '79': 'Niort', '80': 'Amiens', '81': 'Albi', '82': 'Montauban', '83': 'Toulon', '84': 'Avignon', '85': 'La Roche-sur-Yon', '86': 'Poitiers', '87': 'Limoges', '88': 'Épinal', '89': 'Auxerre', '90': 'Belfort', '91': 'Évry-Courcouronnes', '92': 'Nanterre', '93': 'Bobigny', '94': 'Créteil', '95': 'Cergy', '971': 'Basse-Terre', '972': 'Fort-de-France', '973': 'Cayenne', '974': 'Saint-Denis', '976': 'Mamoudzou' };
const CHEF = { '11': ['Île-de-France', 'Paris', 8], '24': ['Centre-Val de Loire', 'Orléans', 6], '27': ['Bourgogne-Franche-Comté', 'Dijon', 8], '28': ['Normandie', 'Rouen', 5], '32': ['Hauts-de-France', 'Lille', 5], '44': ['Grand Est', 'Strasbourg', 10], '52': ['Pays de la Loire', 'Nantes', 5], '53': ['Bretagne', 'Rennes', 4], '75': ['Nouvelle-Aquitaine', 'Bordeaux', 12], '76': ['Occitanie', 'Toulouse', 13], '84': ['Auvergne-Rhône-Alpes', 'Lyon', 12], '93': ["Provence-Alpes-Côte d'Azur", 'Marseille', 6], '94': ['Corse', 'Ajaccio', 2], '01': ['Guadeloupe', 'Basse-Terre', 1], '02': ['Martinique', 'Fort-de-France', 1], '03': ['Guyane', 'Cayenne', 1], '04': ['La Réunion', 'Saint-Denis', 1], '06': ['Mayotte', 'Mamoudzou', 1] };
const between = (v, a, b) => typeof v === 'number' && v >= a && v <= b;

// --- comptes et structure ---
const rs = Object.entries(R), ds = Object.entries(D);
ok(rs.length === 18, `régions : ${rs.length} au lieu de 18`);
ok(ds.length === 101, `départements : ${ds.length} au lieu de 101`);
ok(new Set(ds.map(([, o]) => o.code)).size === ds.length, 'codes de départements en double');
ok(new Set(rs.map(([, o]) => o.code)).size === rs.length, 'codes de régions en double');
for (const [s] of [...rs, ...ds]) ok(/^[a-z0-9-]+$/.test(s), `slug non ASCII : ${s}`);
for (const c of Object.keys(PREF)) ok(ds.some(([, o]) => o.code === c), `département absent : ${c}`);

// --- références croisées ---
const seen = {};
for (const [s, o] of ds) {
  ok(R[o.reg], `${o.n} : région inconnue « ${o.reg} »`);
  if (R[o.reg]) ok(R[o.reg].deps.includes(s), `${o.n} : absent de la liste deps de sa région ${o.reg}`);
  seen[s] = (seen[s] || 0) + 1;
}
for (const [s, o] of rs) {
  for (const d of o.deps) { ok(D[d], `${o.n} : département inconnu « ${d} »`); seen[d] = (seen[d] || 0) + 1; if (D[d]) ok(D[d].reg === s, `${o.n} : ${d} se déclare rattaché à ${D[d].reg}`); }
  ok(o.ndep === o.deps.length, `${o.n} : ndep ${o.ndep} ≠ ${o.deps.length}`);
  const sp = o.deps.reduce((a, d) => a + (D[d]?.pop || 0), 0), sk = o.deps.reduce((a, d) => a + (D[d]?.km2 || 0), 0), sc = o.deps.reduce((a, d) => a + (D[d]?.ncom || 0), 0);
  ok(sp === o.pop, `${o.n} : population ${o.pop} ≠ somme des départements ${sp}`);
  ok(Math.abs(sk - o.km2) <= o.deps.length, `${o.n} : superficie ${o.km2} ≠ somme des départements ${sk}`);
  ok(sc === o.ncom, `${o.n} : communes ${o.ncom} ≠ somme ${sc}`);
}
for (const [s, n] of Object.entries(seen)) ok(n === 2, `${s} : rattaché ${n / 2} fois (attendu 1)`);

// --- valeurs de référence (préfectures, chefs-lieux, nombre de départements par région) ---
for (const [, o] of ds) { ok(o.pref, `${o.n} : préfecture vide`); if (PREF[o.code]) ok(o.pref === PREF[o.code], `${o.n} : préfecture « ${o.pref} » ≠ « ${PREF[o.code]} »`); }
for (const [, o] of rs) { const c = CHEF[o.code]; if (!c) { bad(`région inattendue ${o.code}`); continue; } ok(o.n === c[0], `région ${o.code} : « ${o.n} » ≠ « ${c[0]} »`); ok(o.chef === c[1], `${o.n} : chef-lieu « ${o.chef} » ≠ « ${c[1]} »`); ok(o.ndep === c[2], `${o.n} : ${o.ndep} départements ≠ ${c[2]}`); }
ok(rs.filter(([, o]) => o.om).length === 5, 'outre-mer : 5 régions attendues');
ok(ds.filter(([, o]) => o.om).length === 5, 'outre-mer : 5 départements attendus');

// --- vraisemblance des chiffres ---
const by = c => ds.find(([, o]) => o.code === c)?.[1] || {};
const P = by('75'), G = by('973'), L = by('48'), N = by('59'), M = by('976'), H = by('92');
ok(between(P.km2, 100, 110) && between(P.pop, 2.0e6, 2.3e6), `Paris : ${P.km2} km², ${P.pop} hab.`);
ok(between(G.km2, 83000, 84000), `Guyane : ${G.km2} km²`);
ok(between(L.km2, 5100, 5250) && between(L.pop, 70000, 80000), `Lozère : ${L.km2} km², ${L.pop} hab.`);
ok(between(N.km2, 5700, 5800) && between(N.pop, 2.5e6, 2.7e6), `Nord : ${N.km2} km², ${N.pop} hab.`);
ok(between(M.km2, 360, 390), `Mayotte : ${M.km2} km²`);
ok(between(H.km2, 170, 180), `Hauts-de-Seine : ${H.km2} km²`);
const tp = ds.reduce((a, [, o]) => a + o.pop, 0); ok(between(tp, 66e6, 70e6), `population totale ${tp}`);
const tk = ds.reduce((a, [, o]) => a + o.km2, 0); ok(between(tk, 630000, 645000), `superficie totale ${tk}`);
for (const [, o] of [...rs, ...ds]) { ok(o.pop > 0 && o.km2 > 0 && o.ncom > 0, `${o.n} : valeur nulle`); ok(Number.isInteger(o.pop) && Number.isInteger(o.km2), `${o.n} : valeurs non entières`); }
ok(by('69').note && /métropole de Lyon/i.test(by('69').note), 'Rhône : note sur la Métropole de Lyon manquante');

// --- voisins (réciproques, existants, hors soi-même) ---
for (const [s, o] of ds) for (const v of o.voisins || []) { ok(D[v], `${o.n} : voisin inconnu ${v}`); ok(v !== s, `${o.n} : voisin de lui-même`); if (D[v]) ok((D[v].voisins || []).includes(s), `${o.n} ↔ ${v} : voisinage non réciproque`); }
ok(by('75').voisins?.length === 3, 'Paris : 3 voisins attendus (Hauts-de-Seine, Seine-Saint-Denis, Val-de-Marne)');

// --- textes : propres, datés de rien, avec source valide ---
const NONLATIN = /[^\u0000-ɏḀ-ỿ -⁯€←-⇿\s]/;
const ARTEFACT = /[<>{}\[\]]|\/km|hab\.|\bInsee\b|\bINSEE\b|La Poste|\d\s*(habitants|km²)| {2}/;
const PERIME = /\b(présidente?|maire|conseill(?:er|ère)s?|élu(?:e|s|es)?|élections?|députée?s?|sénat(?:eur|rice)s?|devr(?:a|ont)|ser(?:a|ont)|provisoire(?:ment)?|prochainement|bientôt)\b|\((?:LR|PS|PCF|LREM|RN|EELV|UDI|MoDem|DVD|DVG|SE)\)/i;
for (const [, o] of [...rs, ...ds]) {
  ok(Array.isArray(o.bref) && o.bref.length >= 1 && o.bref.length <= 2, `${o.n} : texte absent ou trop long`);
  const all = (o.bref || []).join(' ');
  ok(all.length >= 90 && all.length <= 900, `${o.n} : longueur de texte ${all.length}`);
  for (const p of o.bref || []) {
    ok(/^[A-ZÀ-ÝŒ«“"‘'(0-9]/.test(p), `${o.n} : paragraphe qui ne commence pas par une majuscule : « ${p.slice(0, 40)} »`);
    ok(/[.!?…»]$/.test(p), `${o.n} : paragraphe sans ponctuation finale`);
    ok(!ARTEFACT.test(p), `${o.n} : artefact dans le texte : « ${(p.match(ARTEFACT) || [''])[0]} »`);
    ok(!NONLATIN.test(p), `${o.n} : caractères non latins`);
    ok(!PERIME.test(p), `${o.n} : formulation périssable : « ${(p.match(PERIME) || [''])[0]} »`);
  }
  ok(/^https:\/\/fr\.(vikidia|wikipedia)\.org\/wiki\//.test(o.src || ''), `${o.n} : source invalide`);
  ok((o.sw === 'v') === /fr\.vikidia\.org/.test(o.src || ''), `${o.n} : sw incohérent avec la source`);
  ok(/^Q\d+$/.test(o.q || ''), `${o.n} : identifiant Wikidata invalide`);
}

const resume = `${rs.length} régions, ${ds.length} départements, ${ds.reduce((a, [, o]) => a + (o.voisins || []).length, 0) / 2} voisinages, ${tp.toLocaleString('fr-FR')} habitants, ${tk.toLocaleString('fr-FR')} km²`;
if (errs.length) { console.log('❌ atlas-check-france : ' + errs.length + ' erreur(s)\n  ' + errs.slice(0, 60).join('\n  ')); process.exit(1); }
console.log('✅ atlas-check-france : tout est bon — ' + resume);
