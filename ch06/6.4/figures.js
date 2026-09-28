/* Figures for section 6.4 Electronic Structure of Atoms (Electron Configurations). Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['6.4'] = function (root, F) {
const { el, tex, C, PAL, alpha, ctl, register, begin, line, arrow, dot, text, topline, measure, hbracket } = F;
const sim = (id, H) => F.sim(root, id, H);
function readout(host, main, small) { tex(host, main); if (small) host.appendChild(el('small', null, small)); }

/* ---------- the elements: symbol, name, ground-state configuration, block, group, period ----------
   The configurations are those Figure 6.29 prints; elements 113 to 118, which the book leaves
   blank, carry the predicted ones of the elements page. */
const ELS = [["H","Hydrogen","1s1","s",1,1],
["He","Helium","1s2","s",18,1],
["Li","Lithium","[He]2s1","s",1,2],
["Be","Beryllium","[He]2s2","s",2,2],
["B","Boron","[He]2s2 2p1","p",13,2],
["C","Carbon","[He]2s2 2p2","p",14,2],
["N","Nitrogen","[He]2s2 2p3","p",15,2],
["O","Oxygen","[He]2s2 2p4","p",16,2],
["F","Fluorine","[He]2s2 2p5","p",17,2],
["Ne","Neon","[He]2s2 2p6","p",18,2],
["Na","Sodium","[Ne]3s1","s",1,3],
["Mg","Magnesium","[Ne]3s2","s",2,3],
["Al","Aluminum","[Ne]3s2 3p1","p",13,3],
["Si","Silicon","[Ne]3s2 3p2","p",14,3],
["P","Phosphorus","[Ne]3s2 3p3","p",15,3],
["S","Sulfur","[Ne]3s2 3p4","p",16,3],
["Cl","Chlorine","[Ne]3s2 3p5","p",17,3],
["Ar","Argon","[Ne]3s2 3p6","p",18,3],
["K","Potassium","[Ar]4s1","s",1,4],
["Ca","Calcium","[Ar]4s2","s",2,4],
["Sc","Scandium","[Ar]3d1 4s2","d",3,4],
["Ti","Titanium","[Ar]3d2 4s2","d",4,4],
["V","Vanadium","[Ar]3d3 4s2","d",5,4],
["Cr","Chromium","[Ar]3d5 4s1","d",6,4],
["Mn","Manganese","[Ar]3d5 4s2","d",7,4],
["Fe","Iron","[Ar]3d6 4s2","d",8,4],
["Co","Cobalt","[Ar]3d7 4s2","d",9,4],
["Ni","Nickel","[Ar]3d8 4s2","d",10,4],
["Cu","Copper","[Ar]3d10 4s1","d",11,4],
["Zn","Zinc","[Ar]3d10 4s2","d",12,4],
["Ga","Gallium","[Ar]3d10 4s2 4p1","p",13,4],
["Ge","Germanium","[Ar]3d10 4s2 4p2","p",14,4],
["As","Arsenic","[Ar]3d10 4s2 4p3","p",15,4],
["Se","Selenium","[Ar]3d10 4s2 4p4","p",16,4],
["Br","Bromine","[Ar]3d10 4s2 4p5","p",17,4],
["Kr","Krypton","[Ar]3d10 4s2 4p6","p",18,4],
["Rb","Rubidium","[Kr]5s1","s",1,5],
["Sr","Strontium","[Kr]5s2","s",2,5],
["Y","Yttrium","[Kr]4d1 5s2","d",3,5],
["Zr","Zirconium","[Kr]4d2 5s2","d",4,5],
["Nb","Niobium","[Kr]4d4 5s1","d",5,5],
["Mo","Molybdenum","[Kr]4d5 5s1","d",6,5],
["Tc","Technetium","[Kr]4d5 5s2","d",7,5],
["Ru","Ruthenium","[Kr]4d7 5s1","d",8,5],
["Rh","Rhodium","[Kr]4d8 5s1","d",9,5],
["Pd","Palladium","[Kr]4d10","d",10,5],
["Ag","Silver","[Kr]4d10 5s1","d",11,5],
["Cd","Cadmium","[Kr]4d10 5s2","d",12,5],
["In","Indium","[Kr]4d10 5s2 5p1","p",13,5],
["Sn","Tin","[Kr]4d10 5s2 5p2","p",14,5],
["Sb","Antimony","[Kr]4d10 5s2 5p3","p",15,5],
["Te","Tellurium","[Kr]4d10 5s2 5p4","p",16,5],
["I","Iodine","[Kr]4d10 5s2 5p5","p",17,5],
["Xe","Xenon","[Kr]4d10 5s2 5p6","p",18,5],
["Cs","Cesium","[Xe]6s1","s",1,6],
["Ba","Barium","[Xe]6s2","s",2,6],
["La","Lanthanum","[Xe]5d1 6s2","f",3,6],
["Ce","Cerium","[Xe]4f1 5d1 6s2","f",0,6],
["Pr","Praseodymium","[Xe]4f3 6s2","f",0,6],
["Nd","Neodymium","[Xe]4f4 6s2","f",0,6],
["Pm","Promethium","[Xe]4f5 6s2","f",0,6],
["Sm","Samarium","[Xe]4f6 6s2","f",0,6],
["Eu","Europium","[Xe]4f7 6s2","f",0,6],
["Gd","Gadolinium","[Xe]4f7 5d1 6s2","f",0,6],
["Tb","Terbium","[Xe]4f9 6s2","f",0,6],
["Dy","Dysprosium","[Xe]4f10 6s2","f",0,6],
["Ho","Holmium","[Xe]4f11 6s2","f",0,6],
["Er","Erbium","[Xe]4f12 6s2","f",0,6],
["Tm","Thulium","[Xe]4f13 6s2","f",0,6],
["Yb","Ytterbium","[Xe]4f14 6s2","f",0,6],
["Lu","Lutetium","[Xe]4f14 5d1 6s2","f",0,6],
["Hf","Hafnium","[Xe]4f14 5d2 6s2","d",4,6],
["Ta","Tantalum","[Xe]4f14 5d3 6s2","d",5,6],
["W","Tungsten","[Xe]4f14 5d4 6s2","d",6,6],
["Re","Rhenium","[Xe]4f14 5d5 6s2","d",7,6],
["Os","Osmium","[Xe]4f14 5d6 6s2","d",8,6],
["Ir","Iridium","[Xe]4f14 5d7 6s2","d",9,6],
["Pt","Platinum","[Xe]4f14 5d9 6s1","d",10,6],
["Au","Gold","[Xe]4f14 5d10 6s1","d",11,6],
["Hg","Mercury","[Xe]4f14 5d10 6s2","d",12,6],
["Tl","Thallium","[Xe]4f14 5d10 6s2 6p1","p",13,6],
["Pb","Lead","[Xe]4f14 5d10 6s2 6p2","p",14,6],
["Bi","Bismuth","[Xe]4f14 5d10 6s2 6p3","p",15,6],
["Po","Polonium","[Xe]4f14 5d10 6s2 6p4","p",16,6],
["At","Astatine","[Xe]4f14 5d10 6s2 6p5","p",17,6],
["Rn","Radon","[Xe]4f14 5d10 6s2 6p6","p",18,6],
["Fr","Francium","[Rn]7s1","s",1,7],
["Ra","Radium","[Rn]7s2","s",2,7],
["Ac","Actinium","[Rn]6d1 7s2","f",3,7],
["Th","Thorium","[Rn]6d2 7s2","f",0,7],
["Pa","Protactinium","[Rn]5f2 6d1 7s2","f",0,7],
["U","Uranium","[Rn]5f3 6d1 7s2","f",0,7],
["Np","Neptunium","[Rn]5f4 6d1 7s2","f",0,7],
["Pu","Plutonium","[Rn]5f6 7s2","f",0,7],
["Am","Americium","[Rn]5f7 7s2","f",0,7],
["Cm","Curium","[Rn]5f7 6d1 7s2","f",0,7],
["Bk","Berkelium","[Rn]5f8 6d1 7s2","f",0,7],
["Cf","Californium","[Rn]5f10 7s2","f",0,7],
["Es","Einsteinium","[Rn]5f11 7s2","f",0,7],
["Fm","Fermium","[Rn]5f12 7s2","f",0,7],
["Md","Mendelevium","[Rn]5f13 7s2","f",0,7],
["No","Nobelium","[Rn]5f14 7s2","f",0,7],
["Lr","Lawrencium","[Rn]5f14 6d1 7s2","f",0,7],
["Rf","Rutherfordium","[Rn]5f14 6d2 7s2","d",4,7],
["Db","Dubnium","[Rn]5f14 6d3 7s2","d",5,7],
["Sg","Seaborgium","[Rn]5f14 6d4 7s2","d",6,7],
["Bh","Bohrium","[Rn]5f14 6d5 7s2","d",7,7],
["Hs","Hassium","[Rn]5f14 6d6 7s2","d",8,7],
["Mt","Meitnerium","[Rn]5f14 6d7 7s2","d",9,7],
["Ds","Darmstadtium","[Rn]5f14 6d8 7s2","d",10,7],
["Rg","Roentgenium","[Rn]5f14 6d9 7s2","d",11,7],
["Cn","Copernicium","[Rn]5f14 6d10 7s2","d",12,7],
["Nh","Nihonium","[Rn]5f14 6d10 7s2 7p1","p",13,7],
["Fl","Flerovium","[Rn]5f14 6d10 7s2 7p2","p",14,7],
["Mc","Moscovium","[Rn]5f14 6d10 7s2 7p3","p",15,7],
["Lv","Livermorium","[Rn]5f14 6d10 7s2 7p4","p",16,7],
["Ts","Tennessine","[Rn]5f14 6d10 7s2 7p5","p",17,7],
["Og","Oganesson","[Rn]5f14 6d10 7s2 7p6","p",18,7]];
const E = (Z) => { const [sym, name, cfg, block, group, period] = ELS[Z - 1]; return { Z, sym, name, cfg, block, group, period }; };

/* ---------- subshells, in the order the Aufbau principle fills them ---------- */
const ORDER = ['1s', '2s', '2p', '3s', '3p', '4s', '3d', '4p', '5s', '4d', '5p', '6s', '4f', '5d', '6p', '7s', '5f', '6d', '7p'];
const BOXES = { s: 1, p: 3, d: 5, f: 7 };
const CAP = { s: 2, p: 6, d: 10, f: 14 };
const BLOCK = { s: 0, p: 1, d: 2, f: 3 };
const NOBLE = [[2, 'He'], [10, 'Ne'], [18, 'Ar'], [36, 'Kr'], [54, 'Xe'], [86, 'Rn']];
const SUP = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹' };
const sup = (k) => String(k).split('').map((c) => SUP[c]).join('');

/* the configuration the building-up order predicts for Z electrons, as counts per subshell */
function predicted(Z) {
  const o = {}; let left = Z;
  for (const s of ORDER) { if (!left) break; const k = Math.min(left, CAP[s[1]]); o[s] = k; left -= k; }
  return o;
}
/* the observed ground state */
function observed(Z) {
  const m = /^\[(\w+)\]\s*(.*)$/.exec(E(Z).cfg);
  const o = m ? predicted(NOBLE.find((q) => q[1] === m[1])[0]) : {};
  (m ? m[2] : E(Z).cfg).split(/\s+/).filter(Boolean).forEach((t) => { o[t.slice(0, 2)] = +t.slice(2); });
  return o;
}
const same = (a, b) => ORDER.every((s) => (a[s] || 0) === (b[s] || 0));
const terms = (o) => ORDER.filter((s) => o[s]).map((s) => [s, o[s]]);
/* the noble gas whose configuration is the core, the last one before Z */
const coreOf = (Z) => { let c = null; NOBLE.forEach((q) => { if (q[0] < Z) c = q; }); return c; };
function valenceTerms(Z, o) {
  const c = coreOf(Z), core = c ? predicted(c[0]) : {};
  return ORDER.filter((s) => (o[s] || 0) > (core[s] || 0)).map((s) => [s, o[s] - (core[s] || 0)]);
}
const unpaired = (o) => ORDER.reduce((t, s) => { const k = o[s] || 0, m = BOXES[s[1]]; return t + (k <= m ? k : 2 * m - k); }, 0);
/* written for the canvas and for KaTeX */
const plain = (ts) => ts.map(([s, k]) => s + sup(k)).join('');
const abbr = (Z, o) => { const c = coreOf(Z); return (c ? '[' + c[1] + ']' : '') + plain(c ? valenceTerms(Z, o) : terms(o)); };
const texTerms = (ts, under) => ts.map(([s, k]) => { const t = `${s[0]}${s[1]}^{${k}}`; return under && under(s) ? `\\underline{${t}}` : t; }).join('');

/* a configuration drawn with the subshell letter in italics, as the book sets it; returns the width */
function cfgText(ctx, ts, x, y, color, o = {}) {
  const size = o.size ?? 22, weight = o.weight ?? 400, pre = o.pre ?? '';
  const parts = [];
  if (pre) parts.push([pre, false]);
  ts.forEach(([s, k]) => { parts.push([s[0], false]); parts.push([s[1], true]); if (k !== null) parts.push([sup(k), false]); });
  const ws = parts.map(([t, it]) => measure(ctx, t, { size, weight, italic: it }));
  const total = ws.reduce((a, b) => a + b, 0);
  let cx = o.align === 'center' ? x - total / 2 : o.align === 'right' ? x - total : x;
  const at = [];
  parts.forEach(([t, it], i) => { if (!o.measureOnly) text(ctx, t, cx, y, color, { size, weight, italic: it }); at.push([cx, cx + ws[i]]); cx += ws[i]; });
  return { total, at };
}

/* one electron in a box: a half-arrow, up on the left of the box and down on the right */
function spin(ctx, x, y, up, h, color, w = 3) {
  const t = up ? y - h / 2 : y + h / 2, b = up ? y + h / 2 : y - h / 2, s = up ? 1 : -1;
  line(ctx, x, b, x, t, color, w);
  line(ctx, x, t, x - 0.28 * h, t + s * 0.3 * h, color, w);
}
/* where electron i of a subshell sits: singly through every box first, then paired (Hund's rule) */
const slot = (i, m) => (i < m ? { box: i, up: true } : { box: i - m, up: false });

/* an atom beside its symbol: the disc in the element's colour, the symbol in ink */
function atomTag(ctx, sym, x, y, r, size) {
  ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fillStyle = F.el(sym); ctx.fill();
  ctx.strokeStyle = PAL.ink; ctx.lineWidth = 1.5; ctx.stroke(); ctx.restore();
  text(ctx, sym, x + r + 12, y, PAL.ink, { size, weight: 600 });
}

/* =====================================================================
   FIGURE 6.24: the energy ladder of a many-electron atom, filled by the
   Aufbau principle. Rungs in rank order in the book's four columns, a box
   per orbital; a slider over the number of electrons. Still: the ladder
   answers its slider. At an exception the electron that leaves the
   predicted subshell eases once into the observed one, then holds.
===================================================================== */
(function () {
  const d = sim('sim-aufbau', 820);
  const ro = F.readout(d);
  const Zs = ctl(d.controls, {
    label: 'Z', cls: '', min: 1, max: 118, step: 1, value: 15, unit: '', dec: 0, onInput: changed,
    aria: 'number of electrons, the atomic number',
    specials: [{ at: 24, label: 'Cr' }, { at: 29, label: 'Cu' }, { at: 41, label: 'Nb' }],
  });
  const move = F.tween(d, 1);
  let lastZ = Zs.v;
  function changed() {
    const Z = Zs.v; if (Z === lastZ) return; lastZ = Z;
    if (!same(predicted(Z), observed(Z))) { move.set(0); move.to(1, 1100); } else move.set(1);
  }
  const COL = { s: 200, p: 400, d: 640, f: 930 }, BW = 34, BH = 26;
  const Y0 = 770, DY = 32.5;
  const rungY = (s) => Y0 - ORDER.indexOf(s) * DY;
  const slotXY = (s, i) => { const q = slot(i, BOXES[s[1]]); return { x: COL[s[1]] + q.box * BW + (q.up ? 0.36 : 0.64) * BW, y: rungY(s), up: q.up }; };
  function draw() {
    const { ctx } = begin(d.c);
    const Z = Zs.v, el0 = E(Z), pred = predicted(Z), obs = observed(Z), ce = C('energy');
    const exc = !same(pred, obs), k = F.ease.smooth(move.v);
    const last = ORDER.filter((s) => pred[s]).pop();
    /* the energy axis and the capacity of each column */
    arrow(ctx, 90, Y0 + 30, 90, 150, ce, 4);
    text(ctx, 'E', 90, 130, ce, { size: 24, weight: 600, align: 'center' });
    [['s', 2], ['p', 6], ['d', 10], ['f', 14]].forEach(([l, n]) => text(ctx, l + ' subshells hold ' + n, COL[l] + (BOXES[l] * BW) / 2, 116, PAL.muted, { size: 16, align: 'center' }));
    /* the moving electrons: the ones the observed configuration has taken out of a predicted subshell, and where they go */
    const moving = [];
    if (exc) {
      const src = [], dst = [];
      ORDER.forEach((s) => {
        for (let i = obs[s] || 0; i < (pred[s] || 0); i++) src.push(slotXY(s, i));
        for (let i = pred[s] || 0; i < (obs[s] || 0); i++) dst.push({ s, i });
      });
      dst.forEach((q, j) => moving.push({ ...q, from: src[j] }));
    }
    const isMoving = (s, i) => moving.some((q) => q.s === s && q.i === i);
    /* the rungs, their boxes and their electrons */
    ORDER.forEach((s) => {
      const l = s[1], x0 = COL[l], m = BOXES[l], y = rungY(s), n = obs[s] || 0, on = n > 0 || (pred[s] || 0) > 0;
      line(ctx, x0 - 8, y + BH / 2 + 3, x0 + m * BW + 8, y + BH / 2 + 3, on ? ce : alpha(ce, 0.35), s === last ? 5 : 3);
      ctx.save(); ctx.strokeStyle = on ? PAL.ink : alpha(PAL.ink, 0.3); ctx.lineWidth = 1.5;
      for (let b = 0; b < m; b++) ctx.strokeRect(x0 + b * BW, y - BH / 2, BW, BH);
      ctx.restore();
      cfgText(ctx, [[s, null]], x0 - 14, y, on ? PAL.ink : PAL.muted, { size: 18, weight: s === last ? 600 : 400, align: 'right' });
      for (let i = 0; i < n; i++) { if (k < 1 && isMoving(s, i)) continue; const p = slotXY(s, i); spin(ctx, p.x, p.y, p.up, BH - 8, PAL.ink); }
    });
    moving.forEach((q) => {
      const to = slotXY(q.s, q.i), x = q.from.x + (to.x - q.from.x) * k, y = q.from.y + (to.y - q.from.y) * k;
      if (k < 1) spin(ctx, x, y, k < 0.5 ? q.from.up : to.up, BH - 8, PAL.ink);
    });
    /* the legend: each kind named once */
    const LX = 1010;
    [[0, 'a filled orbital', 2], [1, 'an unpaired electron', 1], [2, 'an empty orbital', 0]].forEach(([r, name, e]) => {
      const y = 620 + r * 44;
      ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 1.5; ctx.strokeRect(LX, y - BH / 2, BW, BH); ctx.restore();
      if (e >= 1) spin(ctx, LX + 0.36 * BW, y, true, BH - 8, PAL.ink);
      if (e === 2) spin(ctx, LX + 0.64 * BW, y, false, BH - 8, PAL.ink);
      text(ctx, name, LX + BW + 12, y, PAL.muted, { size: 16 });
    });
    text(ctx, 'not to scale', LX, 620 + 3 * 44, PAL.muted, { size: 16 });
    /* the headline */
    const u = unpaired(obs), un = u === 0 ? 'no unpaired electrons' : u === 1 ? 'one unpaired electron' : u + ' unpaired electrons';
    let head;
    if (exc) {
      const src = ORDER.filter((s) => (obs[s] || 0) < (pred[s] || 0)), dst = ORDER.filter((s) => (obs[s] || 0) > (pred[s] || 0));
      const cnt = moving.length;
      head = el0.name + ', Z = ' + Z + ': the filling order predicts ' + abbr(Z, pred) + ', but ' + (cnt === 1 ? 'one electron goes' : cnt + ' electrons go') + ' into the ' + dst.join(' and ') + ' subshell instead of the ' + src.join(' and ') + ', giving the observed ' + abbr(Z, obs) + '.';
    } else {
      head = el0.name + ', Z = ' + Z + ', puts its last electron in the ' + last + ' subshell and has ' + un + '.';
    }
    topline(ctx, head);
    const c = coreOf(Z);
    const f = `\\text{${el0.sym}}:\\ ${texTerms(terms(obs))}` + (c ? `=[\\text{${c[1]}}]\\,${texTerms(valenceTerms(Z, obs))}` : '');
    ro.set(f, exc
      ? 'The Aufbau order predicts ' + abbr(Z, pred) + '; the ground state observed is ' + abbr(Z, obs) + ', with ' + un + '.'
      : (c ? 'Outside the [' + c[1] + '] core the configuration is ' + plain(valenceTerms(Z, obs)) + ', with ' + un + '.' : 'The atom has no noble-gas core, and it has ' + un + '.'));
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 6.25: the parts of the notation 1s¹. A faithful copy: a hydrogen
   atom with its one electron, and the symbol with the book's two labels.
===================================================================== */
(function () {
  const d = sim('fig-notation', 380);
  let hits = []; F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c);
    const cx = 300, cy = 200, r = 130;
    ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fillStyle = alpha(F.el('H'), 0.85); ctx.fill();
    ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2; ctx.stroke(); ctx.restore();
    text(ctx, 'H', cx - 70, cy - 70, PAL.ink, { size: 34, weight: 600, align: 'center' });
    dot(ctx, cx + 60, cy + 20, PAL.ink, true, 11);
    text(ctx, '−', cx + 60, cy - 8, PAL.ink, { size: 22, weight: 600, align: 'center' });
    hits = [{ x: cx, y: cy, r, name: 'a hydrogen atom' }, { x: cx + 60, y: cy + 20, r: 16, name: 'its one electron' }];
    /* the symbol */
    const SZ = 120, X = 640, Y = 220;
    const { at } = cfgText(ctx, [['1s', 1]], X, Y, PAL.ink, { size: SZ });
    const sx = (at[1][0] + at[1][1]) / 2, ex = (at[2][0] + at[2][1]) / 2;
    line(ctx, sx, Y + 62, sx, Y + 108, alpha(PAL.ink, 0.5), 2);
    text(ctx, 'Subshell', sx, Y + 128, PAL.ink, { size: 22, align: 'center' });
    line(ctx, ex, Y - 58, ex + 70, Y - 118, alpha(PAL.ink, 0.5), 2);
    text(ctx, 'Number of electrons in subshell', ex + 80, Y - 124, PAL.ink, { size: 22 });
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 6.26: the diagonal rule for the filling order. A faithful copy:
   the subshells in rows by n and columns by l, coloured by block, and
   the arrows read from the top down, drawn along their length once.
===================================================================== */
(function () {
  const d = sim('fig-fill-order', 660);
  const SHELLS = [['1s'], ['2s', '2p'], ['3s', '3p', '3d'], ['4s', '4p', '4d', '4f'], ['5s', '5p', '5d', '5f'], ['6s', '6p', '6d'], ['7s', '7p']];
  const X0 = 560, Y0 = 80, DX = 96, DY = 80, R = 31, L = { s: 0, p: 1, d: 2, f: 3 };
  const pos = (s) => [X0 + L[s[1]] * DX, Y0 + (+s[0] - 1) * DY];
  function draw() {
    const { ctx } = begin(d.c);
    const k = F.ease.smooth(F.arrival(d));
    /* the diagonals, one per value of n + l */
    const all = SHELLS.flat();
    const diag = [];
    for (let nl = 1; nl <= 8; nl++) { const g = all.filter((s) => +s[0] + L[s[1]] === nl).sort((a, b) => L[b[1]] - L[a[1]]); if (g.length) diag.push(g); }
    diag.forEach((g, i) => {
      const [ax, ay] = pos(g[0]), [bx, by] = pos(g[g.length - 1]);
      const ux = -DX, uy = DY, n = Math.hypot(ux, uy), ex = ux / n, ey = uy / n, ext = 0.62 * Math.hypot(DX, DY);
      const a = [ax - ex * ext, ay - ey * ext], b = [bx + ex * ext, by + ey * ext];
      const q = F.partial([a, b], F.stagger(k, i, diag.length));
      if (q.length > 1) arrow(ctx, q[0][0], q[0][1], q[q.length - 1][0], q[q.length - 1][1], alpha(PAL.ink, 0.55), 3);
    });
    all.forEach((s) => {
      const [x, y] = pos(s), c = F.cat(BLOCK[s[1]]);
      ctx.save(); ctx.beginPath(); ctx.arc(x, y, R, 0, Math.PI * 2); ctx.fillStyle = PAL.panel; ctx.fill(); ctx.fillStyle = alpha(c, 0.25); ctx.fill();
      ctx.strokeStyle = c; ctx.lineWidth = 2.5; ctx.stroke(); ctx.restore();
      cfgText(ctx, [[s, null]], x, y, PAL.ink, { size: 22, weight: 600, align: 'center' });
    });
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 6.27 + 6.29: the periodic table by the subshell being filled.
   Blocks by the categorical palette, each square naming its last subshell
   with its electrons, the exceptions to the building-up order outlined
   dashed, and one chosen element's configuration written out with its
   valence electrons underlined. Still: a choice and nothing with a clock.
===================================================================== */
(function () {
  const d = sim('sim-periodic', 780);
  const pick = F.select(d.controls, {
    label: '\\text{element}', aria: 'the element whose configuration is written out', value: '31',
    options: ELS.map((q, i) => ({ value: String(i + 1), label: (i + 1) + ' ' + q[0] + ' (' + q[1] + ')' })),
    onInput: () => {},
  });
  const X0 = 52, CW = 72.5, CH = 64, PY = 67, TOP = 116, FTOP = 612;
  /* where each element's square stands: groups and periods, the lanthanides and actinides after La and Ac in two rows beneath */
  function cell(Z) {
    const q = E(Z);
    if (Z >= 58 && Z <= 71) return { x: X0 + (3 + Z - 58) * CW, y: FTOP };
    if (Z >= 90 && Z <= 103) return { x: X0 + (3 + Z - 90) * CW, y: FTOP + PY };
    return { x: X0 + (q.group - 1) * CW, y: TOP + (q.period - 1) * PY };
  }
  const lastOf = (o) => { const ts = terms(o); return ts[ts.length - 1]; };
  let hits = []; F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c);
    const sel = +pick.value, s0 = E(sel);
    hits = [];
    /* period and group numbers */
    for (let p = 1; p <= 7; p++) text(ctx, String(p), X0 - 20, TOP + (p - 1) * PY + CH / 2, PAL.muted, { size: 15, align: 'center' });
    const firstRow = [1, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 2, 2, 2, 2, 1];
    firstRow.forEach((p, g) => text(ctx, String(g + 1), X0 + g * CW + CW / 2, TOP + (p - 1) * PY - 12, PAL.muted, { size: 15, align: 'center' }));
    text(ctx, 'lanthanides', X0 + 3 * CW - 10, FTOP + CH / 2, PAL.muted, { size: 15, align: 'right' });
    text(ctx, 'actinides', X0 + 3 * CW - 10, FTOP + PY + CH / 2, PAL.muted, { size: 15, align: 'right' });
    for (let Z = 1; Z <= 118; Z++) {
      const q = E(Z), { x, y } = cell(Z), c = F.cat(BLOCK[q.block]), obs = observed(Z), exc = !same(predicted(Z), obs);
      ctx.save(); ctx.fillStyle = alpha(c, 0.16); ctx.fillRect(x + 1, y, CW - 3, CH); ctx.strokeStyle = c; ctx.lineWidth = 1.5; ctx.strokeRect(x + 1, y, CW - 3, CH); ctx.restore();
      if (exc) { ctx.save(); ctx.setLineDash([5, 4]); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2; ctx.strokeRect(x + 5, y + 4, CW - 11, CH - 8); ctx.restore(); }
      if (Z === sel) { ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 4; ctx.strokeRect(x - 1, y - 2, CW + 1, CH + 4); ctx.restore(); }
      text(ctx, String(Z), x + 7, y + 13, PAL.muted, { size: 12 });
      text(ctx, q.sym, x + CW - 8, y + 18, PAL.ink, { size: 19, weight: 600, align: 'right' });
      cfgText(ctx, [lastOf(obs)], x + CW / 2, y + 46, PAL.ink, { size: 16, align: 'center' });
      hits.push({ x: x + CW / 2, y: y + CH / 2, r: 30, name: q.name + ', Z = ' + Z + ': ' + abbr(Z, obs) });
    }
    /* the chosen element, enlarged, and the key to the colours */
    const bx = X0 + 2 * CW + 16, by = TOP + 4, bw = 150, bh = 150, bc = F.cat(BLOCK[s0.block]), so = observed(sel);
    ctx.save(); ctx.fillStyle = alpha(bc, 0.16); ctx.fillRect(bx, by, bw, bh); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.strokeRect(bx, by, bw, bh); ctx.restore();
    text(ctx, String(sel), bx + 12, by + 22, PAL.ink, { size: 22 });
    text(ctx, s0.sym, bx + bw - 12, by + 30, PAL.ink, { size: 40, weight: 600, align: 'right' });
    text(ctx, s0.name, bx + bw / 2, by + 78, PAL.ink, { size: 18, align: 'center' });
    cfgText(ctx, [lastOf(so)], bx + bw / 2, by + 118, PAL.ink, { size: 30, align: 'center' });
    const KX = bx + bw + 40;
    [['s', 's block'], ['p', 'p block'], ['d', 'd block'], ['f', 'f block']].forEach(([b, name], i) => {
      const y = by + 14 + i * 32, c = F.cat(BLOCK[b]);
      ctx.save(); ctx.fillStyle = alpha(c, 0.16); ctx.fillRect(KX, y - 11, 30, 22); ctx.strokeStyle = c; ctx.lineWidth = 1.5; ctx.strokeRect(KX, y - 11, 30, 22); ctx.restore();
      text(ctx, name, KX + 42, y, PAL.ink, { size: 17 });
    });
    const yx = by + 14 + 4 * 32;
    ctx.save(); ctx.setLineDash([5, 4]); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2; ctx.strokeRect(KX, yx - 11, 30, 22); ctx.restore();
    text(ctx, 'observed, not as built up', KX + 42, yx, PAL.ink, { size: 17 });
    /* the headline and the readout */
    const where = s0.group ? 'period ' + s0.period + ', group ' + s0.group : (sel < 90 ? 'the lanthanide series' : 'the actinide series');
    const kind = s0.block === 's' || s0.block === 'p' ? 'a main group element' : s0.block === 'd' ? 'a transition element' : 'an inner transition element';
    topline(ctx, s0.name + ' stands in ' + where + ', in the ' + s0.block + ' block, and is ' + kind + '.');
    /* valence electrons by the book's three rules */
    const vt = valenceTerms(sel, so), nMax = s0.period;
    const isVal = (s) => {
      const n = +s[0], l = s[1];
      if (s0.block === 's' || s0.block === 'p') return n === nMax;
      if (s0.block === 'd') return (l === 's' && n === nMax) || (l === 'd' && n === nMax - 1);
      return vt.some((t) => t[0] === s);
    };
    const nVal = vt.filter(([s]) => isVal(s)).reduce((t, [s]) => t + so[s], 0);
    const c = coreOf(sel);
    const f = `\\text{${s0.sym}}:\\ ` + (c ? `[\\text{${c[1]}}]\\,` : '') + texTerms(c ? vt : terms(so), isVal);
    const rule = kind === 'a main group element'
      ? 'The valence electrons of a main group element are those with the highest n, ' + nVal + ' here, underlined' + (vt.some(([s]) => !isVal(s)) ? '; the filled subshells beneath them count as core.' : '.')
      : kind === 'a transition element'
        ? 'The valence electrons of a transition element are the ns and (n – 1)d electrons, ' + nVal + ' here, underlined.'
        : 'The valence shell of an inner transition element holds the (n – 2)f, (n – 1)d and ns subshells, ' + nVal + ' electrons here, underlined.';
    const pred = predicted(sel), extra = !same(pred, so) ? ' The building-up order predicts ' + abbr(sel, pred) + '.' : '';
    const src = sel >= 113 ? ' The book prints no configuration for this element; this is the predicted one of the elements page.' : '';
    readout(d.readout, f, rule + extra + src);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 6.28: core and valence electrons of sodium. A faithful copy:
   the configuration with the core and the valence electron bracketed,
   and the abbreviation beside it.
===================================================================== */
(function () {
  const d = sim('fig-valence', 300);
  function draw() {
    const { ctx } = begin(d.c);
    atomTag(ctx, 'Na', 90, 140, 24, 40);
    const SZ = 50, X = 230, Y = 140;
    const { at } = cfgText(ctx, [['1s', 2], ['2s', 2], ['2p', 6], ['3s', 1]], X, Y, PAL.ink, { size: SZ });
    hbracket(ctx, at[0][0], at[8][1], Y + 44, PAL.ink, 'core electrons', { side: 'below' });
    hbracket(ctx, at[9][0], at[11][1], Y - 52, PAL.ink, 'valence electron');
    const AX = 900;
    text(ctx, 'Abbreviation', AX, Y - 70, PAL.muted, { size: 22 });
    cfgText(ctx, [['3s', 1]], AX, Y, PAL.ink, { size: SZ, pre: '[Ne]' });
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   The orbital diagrams of the text and of Example 6.10: faithful copies,
   one row per atom, the symbol, the configuration and a box per orbital
   with its electrons, the same boxes the ladder of Figure 6.24 draws.
===================================================================== */
function orbitalFigure(id, rows) {
  const RH = 116, d = sim(id, 40 + rows.length * RH);
  function draw() {
    const { ctx } = begin(d.c);
    rows.forEach(([sym, Z], r) => {
      const y = 70 + r * RH, o = predicted(Z), ts = terms(o);
      atomTag(ctx, sym, 70, y, 18, 30);
      cfgText(ctx, ts, 190, y, PAL.ink, { size: 32 });
      const BW = 56, BH = 48, GAP = 30;
      let x = 1340 - ts.reduce((t, [s]) => t + BOXES[s[1]] * BW, 0) - GAP * (ts.length - 1);
      ts.forEach(([s, k]) => {
        const m = BOXES[s[1]];
        ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2;
        for (let b = 0; b < m; b++) ctx.strokeRect(x + b * BW, y - BH / 2, BW, BH);
        ctx.restore();
        for (let i = 0; i < k; i++) { const q = slot(i, m); spin(ctx, x + q.box * BW + (q.up ? 0.36 : 0.64) * BW, y, q.up, BH - 14, PAL.ink, 3.5); }
        cfgText(ctx, [[s, null]], x + (m * BW) / 2, y + BH / 2 + 20, PAL.ink, { size: 20, align: 'center' });
        x += m * BW + GAP;
      });
    });
  }
  register(d.fig, { update: () => {}, draw });
}
orbitalFigure('fig-od-h', [['H', 1]]);
orbitalFigure('fig-od-he', [['He', 2]]);
orbitalFigure('fig-od-li', [['Li', 3]]);
orbitalFigure('fig-od-be', [['Be', 4]]);
orbitalFigure('fig-od-b', [['B', 5]]);
orbitalFigure('fig-od-c', [['C', 6]]);
orbitalFigure('fig-od-nofne', [['N', 7], ['O', 8], ['F', 9], ['Ne', 10]]);
orbitalFigure('fig-od-p', [['P', 15]]);
};
