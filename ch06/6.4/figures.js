/* Figures for section 6.4 Electronic Structure of Atoms (Electron Configurations). Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['6.4'] = function (root, F) {
const { C, PAL, alpha, ctl, register, begin, line, arrow, text, topline } = F;
const sim = (id, H) => F.sim(root, id, H);

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
/* written for KaTeX: the whole configuration, and the core-abbreviated one */
const texTerms = (ts) => ts.map(([s, k]) => `${s}^{${k}}`).join('');
const texAbbr = (Z, o) => { const c = coreOf(Z); return c ? `[\\text{${c[1]}}]\\,${texTerms(valenceTerms(Z, o))}` : texTerms(terms(o)); };
/* the readout: the element, its configuration in full where the line holds it, and core-abbreviated */
const cfgLine = (Z, o) => { const c = coreOf(Z), sym = `\\text{${E(Z).sym}}:\\ `; return !c ? sym + texTerms(terms(o)) : Z <= FULL ? sym + texTerms(terms(o)) + '=' + texAbbr(Z, o) : sym + texAbbr(Z, o); };
const FULL = 36;

/* one electron in a box: a half-arrow, up on the left of the box and down on the right */
function spin(ctx, x, y, up, h, color, w = 3) {
  const t = up ? y - h / 2 : y + h / 2, b = up ? y + h / 2 : y - h / 2, s = up ? 1 : -1;
  line(ctx, x, b, x, t, color, w);
  line(ctx, x, t, x - 0.28 * h, t + s * 0.3 * h, color, w);
}
/* where electron i of a subshell sits: singly through every box first, then paired (Hund's rule) */
const slot = (i, m) => (i < m ? { box: i, up: true } : { box: i - m, up: false });
const SPECIALS = [{ at: 24, label: 'Cr' }, { at: 29, label: 'Cu' }, { at: 41, label: 'Nb' }];

/* =====================================================================
   FIGURE 6.24: the energy ladder of a many-electron atom, filled by the
   Aufbau principle. Rungs in rank order in the book's four columns, a box
   per orbital; a slider over the number of electrons. Still: the ladder
   answers its slider. At an exception the electron that leaves the
   predicted subshell eases once into the observed one, then holds.
===================================================================== */
(function () {
  const d = sim('sim-aufbau', 930);
  const ro = F.readout(d);
  const Zs = ctl(d.controls, {
    label: 'Z', cls: '', min: 1, max: 118, step: 1, value: 15, unit: '', dec: 0, onInput: changed,
    aria: 'number of electrons, the atomic number', specials: SPECIALS,
  });
  const move = F.tween(d, 1);
  let lastZ = Zs.v;
  function changed() {
    const Z = Zs.v; if (Z === lastZ) return; lastZ = Z;
    if (!same(predicted(Z), observed(Z))) { move.set(0); move.to(1, 1100); } else move.set(1);
  }
  const COL = { s: 200, p: 350, d: 610, f: 980 }, BW = 52, BH = 34;
  const Y0 = 880, DY = 40, AH = BH - 10;
  const rungY = (s) => Y0 - ORDER.indexOf(s) * DY;
  const slotXY = (s, i) => { const q = slot(i, BOXES[s[1]]); return { x: COL[s[1]] + q.box * BW + (q.up ? 0.38 : 0.62) * BW, y: rungY(s), up: q.up }; };
  const box = (ctx, x, y, w, color) => { ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.strokeRect(x, y - BH / 2, w, BH); ctx.restore(); };
  function draw() {
    const { ctx } = begin(d.c);
    const Z = Zs.v, el0 = E(Z), pred = predicted(Z), obs = observed(Z), ce = C('energy');
    const exc = !same(pred, obs), k = F.ease.smooth(move.v);
    const last = ORDER.filter((s) => pred[s]).pop();
    /* the energy axis and the capacity of each column */
    arrow(ctx, 90, Y0 + 26, 90, 150, ce, 4);
    text(ctx, 'E', 90, 126, ce, { size: 26, weight: 600, align: 'center' });
    [['s', 2], ['p', 6], ['d', 10], ['f', 14]].forEach(([l, n]) => text(ctx, 'holds ' + n, COL[l] + (BOXES[l] * BW) / 2, 104, PAL.muted, { size: 20, align: 'center' }));
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
      line(ctx, x0 - 8, y + BH / 2 + 3, x0 + m * BW + 8, y + BH / 2 + 3, on ? ce : alpha(ce, 0.35), s === last ? 6 : 3);
      for (let b = 0; b < m; b++) box(ctx, x0 + b * BW, y, BW, on ? PAL.ink : alpha(PAL.ink, 0.3));
      text(ctx, '$' + s + '$', x0 - 16, y, on ? PAL.ink : PAL.muted, { size: 22, align: 'right', tex: true });
      for (let i = 0; i < n; i++) { if (k < 1 && isMoving(s, i)) continue; const p = slotXY(s, i); spin(ctx, p.x, p.y, p.up, AH, PAL.ink); }
    });
    moving.forEach((q) => {
      const to = slotXY(q.s, q.i), x = q.from.x + (to.x - q.from.x) * k, y = q.from.y + (to.y - q.from.y) * k;
      if (k < 1) spin(ctx, x, y, k < 0.5 ? q.from.up : to.up, AH, PAL.ink);
    });
    /* the key: each kind named once */
    const sample = (e) => (c, x, y) => {
      c.save(); c.strokeStyle = PAL.ink; c.lineWidth = 2; c.strokeRect(x - 16, y - 11, 32, 22); c.restore();
      if (e >= 1) spin(c, x - 4, y, true, 15, PAL.ink, 2.5);
      if (e === 2) spin(c, x + 4, y, false, 15, PAL.ink, 2.5);
    };
    F.legend(ctx, { l: 900, r: 1380, t: 690, b: 900 }, [
      { s: 'an orbital with one electron', draw: sample(1) },
      { s: 'a full orbital: two opposite spins', draw: sample(2) },
      { s: 'a subshell’s energy, not to scale', color: ce, w: 3 },
    ], { corner: 'br', size: 20 });
    /* the headline */
    const u = unpaired(obs), un = u === 0 ? 'no unpaired electrons' : u === 1 ? '1 unpaired electron' : u + ' unpaired electrons';
    let head;
    if (exc) {
      const src = ORDER.filter((s) => (obs[s] || 0) < (pred[s] || 0)), dst = ORDER.filter((s) => (obs[s] || 0) > (pred[s] || 0));
      const cnt = moving.length, names = (a) => a.map((s) => '$' + s + '$').join(' and ');
      head = el0.name + ', Z = ' + Z + ': ' + (['', 'one ', 'two ', 'three '][cnt] || cnt + ' ') + names(src) + (cnt === 1 ? ' electron sits in ' : ' electrons sit in ') + names(dst) + ', so $' + texAbbr(Z, pred) + '$ is observed as $' + texAbbr(Z, obs) + '$.';
    } else {
      head = el0.name + ', Z = ' + Z + ': the last electron enters $' + last + '$, leaving ' + un + '.';
    }
    topline(ctx, head);
    ro.set(cfgLine(Z, obs), '');
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 6.27: the periodic table read as the filling order. Each square
   carries the subshell of its row and its place along the row; the squares
   from hydrogen to the chosen element are marked, and the rows crossed are
   its configuration. A dashed square is an atom whose observed
   configuration (Figure 6.29's) differs. Still: a slider and a tap.
===================================================================== */
(function () {
  const d = sim('sim-periodic', 840);
  const ro = F.readout(d);
  const Zs = ctl(d.controls, {
    label: 'Z', cls: '', min: 1, max: 118, step: 1, value: 31, unit: '', dec: 0, onInput: () => {},
    aria: 'atomic number of the element read from the table', specials: SPECIALS,
  });
  const X0 = 56, CW = 73, CH = 68, PY = 72, TOP = 150, FTOP = TOP + 7 * PY + 22;
  const inF = (Z) => (Z >= 58 && Z <= 71) || (Z >= 90 && Z <= 103);
  const blockOf = (Z) => (inF(Z) ? 'f' : Z === 57 || Z === 89 ? 'd' : E(Z).block);
  /* the subshell a square stands in and its place along that row */
  function term(Z) {
    const q = E(Z), b = blockOf(Z);
    if (b === 'f') return Z < 72 ? ['4f', Z - 57] : ['5f', Z - 89];
    if (b === 's') return [q.period + 's', Z === 2 ? 2 : q.group];
    if (b === 'p') return [q.period + 'p', q.group - 12];
    return [(q.period - 1) + 'd', q.group - 2];
  }
  /* the configuration read from the table: every row crossed from hydrogen to Z */
  function read(Z) { const o = {}; for (let z = 1; z <= Z; z++) { const [s, k] = term(z); o[s] = k; } return o; }
  const differs = (Z) => Z < 113 && !same(read(Z), observed(Z));
  function cell(Z) {
    const q = E(Z);
    if (Z >= 58 && Z <= 71) return { x: X0 + (3 + Z - 58) * CW, y: FTOP };
    if (Z >= 90 && Z <= 103) return { x: X0 + (3 + Z - 90) * CW, y: FTOP + PY };
    return { x: X0 + (q.group - 1) * CW, y: TOP + (q.period - 1) * PY };
  }
  const ord = (k) => k + (k === 1 ? 'st' : k === 2 ? 'nd' : k === 3 ? 'rd' : 'th');
  let hits = []; F.hover(d.stage, () => hits);
  /* a tap on a square chooses its element */
  d.c.style.cursor = 'pointer';
  d.c.addEventListener('click', (e) => {
    const r = d.c.getBoundingClientRect(); if (!r.width) return;
    const s = 1400 / r.width, px = (e.clientX - r.left) * s, py = (e.clientY - r.top) * s;
    for (let Z = 1; Z <= 118; Z++) { const { x, y } = cell(Z); if (px >= x && px < x + CW && py >= y && py < y + CH) { Zs.drive(Z); return; } }
  });
  function draw() {
    const { ctx } = begin(d.c);
    const sel = Zs.v, s0 = E(sel), got = read(sel), [sub, nth] = term(sel);
    hits = [];
    /* in a pane too narrow for two lines in a square, a square keeps its symbol and the enlarged one carries the subshell */
    const narrow = d.c.clientWidth > 0 && d.c.clientWidth < 640;
    /* period and group numbers */
    for (let p = 1; p <= 7; p++) text(ctx, String(p), X0 - 22, TOP + (p - 1) * PY + CH / 2, PAL.muted, { size: 18, align: 'center' });
    ctx.save(); ctx.translate(X0 - 22, TOP - 20); ctx.rotate(-Math.PI / 2); text(ctx, 'period', 0, 0, PAL.muted, { size: 18 }); ctx.restore();
    const firstRow = [1, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 2, 2, 2, 2, 1];
    firstRow.forEach((p, g) => text(ctx, String(g + 1), X0 + g * CW + CW / 2, TOP + (p - 1) * PY - 15, PAL.muted, { size: 18, align: 'center' }));
    text(ctx, 'group', X0 + CW + 8, TOP - 15, PAL.muted, { size: 18 });
    text(ctx, 'after La', X0 + 3 * CW - 12, FTOP + CH / 2, PAL.muted, { size: 18, align: 'right' });
    text(ctx, 'after Ac', X0 + 3 * CW - 12, FTOP + PY + CH / 2, PAL.muted, { size: 18, align: 'right' });
    for (let Z = 1; Z <= 118; Z++) {
      const q = E(Z), { x, y } = cell(Z), c = F.cat(BLOCK[blockOf(Z)]), on = Z <= sel, [s, k] = term(Z);
      ctx.save(); ctx.fillStyle = alpha(c, on ? 0.45 : 0.1); ctx.fillRect(x + 1, y, CW - 3, CH);
      ctx.strokeStyle = on ? c : alpha(c, 0.6); ctx.lineWidth = 1.5; ctx.strokeRect(x + 1, y, CW - 3, CH); ctx.restore();
      if (differs(Z)) { ctx.save(); ctx.setLineDash([5, 4]); ctx.strokeStyle = on ? PAL.ink : PAL.muted; ctx.lineWidth = 2; ctx.strokeRect(x + 5, y + 4, CW - 11, CH - 8); ctx.restore(); }
      if (Z === sel) { ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 5; ctx.strokeRect(x, y - 1, CW - 1, CH + 2); ctx.restore(); }
      text(ctx, q.sym, x + CW / 2, y + (narrow ? CH / 2 : 21), on ? PAL.ink : PAL.muted, { size: 21, weight: 600, align: 'center' });
      if (!narrow) text(ctx, '$' + s + '^{' + k + '}$', x + CW / 2, y + 48, on ? PAL.ink : PAL.muted, { size: 20, align: 'center', tex: true });
      hits.push({ x: x + CW / 2, y: y + CH / 2, r: 34, name: q.name + ', Z = ' + Z + (Z < 113 ? ', observed ' + (coreOf(Z) ? '[' + coreOf(Z)[1] + ']' : '') + valenceTerms(Z, observed(Z)).map(([a, b]) => a + String(b).split('').map((ch) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[+ch]).join('')).join('') : '') });
    }
    /* the chosen square, enlarged, as the key to a square; and the key to the colours */
    const bx = X0 + 2 * CW + 40, by = TOP + 6, bw = 160, bh = 160, bc = F.cat(BLOCK[blockOf(sel)]);
    ctx.save(); ctx.fillStyle = alpha(bc, 0.45); ctx.fillRect(bx, by, bw, bh); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 4; ctx.strokeRect(bx, by, bw, bh); ctx.restore();
    text(ctx, s0.sym, bx + bw / 2, by + 48, PAL.ink, { size: 44, weight: 600, align: 'center' });
    text(ctx, '$' + sub + '^{' + nth + '}$', bx + bw / 2, by + 112, PAL.ink, { size: 44, align: 'center', tex: true });
    const lx = bx + bw + 60;
    if (!narrow) {
    line(ctx, bx + bw + 8, by + 48, lx - 8, by + 48, PAL.muted, 2); text(ctx, s0.name.toLowerCase(), lx, by + 48, PAL.ink, { size: 20 });
    line(ctx, bx + bw + 8, by + 112, lx - 8, by + 112, PAL.muted, 2);
    text(ctx, 'the subshell being filled', lx, by + 100, PAL.ink, { size: 20 });
    text(ctx, 'and the electrons in it', lx, by + 126, PAL.ink, { size: 20 });
    }
    const sw = (c) => (cx, x, y) => { cx.save(); cx.fillStyle = alpha(c, 0.45); cx.fillRect(x - 18, y - 11, 36, 22); cx.strokeStyle = c; cx.lineWidth = 1.5; cx.strokeRect(x - 18, y - 11, 36, 22); cx.restore(); };
    F.legend(ctx, { l: 700, r: X0 + 12 * CW - 6, t: TOP - 10, b: TOP + 3 * PY - 40 }, [
      ...['s', 'p', 'd', 'f'].map((b) => ({ s: '$' + b + '$ block', draw: sw(F.cat(BLOCK[b])) })),
      { s: 'observed differs', draw: (cx, x, y) => { cx.save(); cx.setLineDash([5, 4]); cx.strokeStyle = PAL.ink; cx.lineWidth = 2; cx.strokeRect(x - 18, y - 11, 36, 22); cx.restore(); } },
    ], { corner: 'tr', size: 20, panel: false });
    /* the headline and the readout */
    topline(ctx, differs(sel)
      ? s0.name + ', Z = ' + sel + ': the table reads $' + texAbbr(sel, got) + '$; the atom is observed as $' + texAbbr(sel, observed(sel)) + '$.'
      : s0.name + ', Z = ' + sel + ', is the ' + ord(nth) + ' square of the $' + sub + '$ row.');
    ro.set(cfgLine(sel, got), '');
  }
  register(d.fig, { update: () => {}, draw });
})();
};
