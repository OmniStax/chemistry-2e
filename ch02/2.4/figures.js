/* Figures for section 2.4 Chemical Formulas. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['2.4'] = function (root, F) {
const { el, tex, PAL, alpha, register, begin, line, text, headline } = F;
const sim = (id, H) => F.sim(root, id, H);
function readout(host, main, small) { tex(host, main); if (small) host.appendChild(el('small', null, small)); }
const TAU = 2 * Math.PI;
const lerp = (a, b, k) => a + (b - a) * k;
const NAME = { H: 'hydrogen', C: 'carbon', O: 'oxygen', S: 'sulfur' };
/* an atom as a disc in its element's colour; hydrogen is light and takes an ink outline so that it reads on a light page */
function atom(ctx, x, y, sym, r) {
  ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fillStyle = F.el(sym); ctx.fill();
  ctx.lineWidth = sym === 'H' ? 2 : 1.2; ctx.strokeStyle = sym === 'H' ? PAL.ink : alpha(PAL.ink, 0.4); ctx.stroke(); ctx.restore();
}
/* a bond of a structural formula between two lettered atoms: one, two or three strokes, trimmed clear of the letters */
function bond2(ctx, a, b, order, color = PAL.ink, gap = 26) {
  const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy); if (L < 2 * gap + 4) return;
  const ux = dx / L, uy = dy / L, nx = -uy, ny = ux;
  const offs = order === 1 ? [0] : order === 2 ? [-5, 5] : [-8, 0, 8];
  offs.forEach((o) => line(ctx, a[0] + ux * gap + nx * o, a[1] + uy * gap + ny * o, b[0] - ux * gap + nx * o, b[1] - uy * gap + ny * o, color, 3));
}

/* ---------- the molecules ----------
   Structural formulas in bond lengths (x right, y down), and 3D coordinates in ångströms from the
   PubChem conformers (methane CID 297, benzene 241, acetic acid 176, methyl formate 7865, carvone 16724),
   centred on their mean. S₈ is a crown of 2.05 Å bonds with angles near 108°. */
const MOL = {
  methane: {
    formula: '\\text{CH}_4', uni: 'CH₄', count: 'one carbon atom and four hydrogen atoms',
    flat: [['C', 0, 0], ['H', 0, -1], ['H', -1, 0], ['H', 1, 0], ['H', 0, 1]], fb: [[0, 1, 1], [0, 2, 1], [0, 3, 1], [0, 4, 1]],
    A: [['C', 0, 0, 0], ['H', 0.55, 0.8, 0.5], ['H', 0.68, -0.81, -0.25], ['H', -0.78, -0.37, 0.67], ['H', -0.46, 0.39, -0.91]],
    B: [[0, 1, 1], [0, 2, 1], [0, 3, 1], [0, 4, 1]],
    dist: 14, views: [{ label: 'front', yaw: 0, pitch: 0 }, { label: 'above', yaw: 0, pitch: 1.4 }],
    shows: { struct: 'The structural formula of methane shows the carbon atom bonded to each of the four hydrogen atoms.',
      ball: 'The ball-and-stick model of methane shows the four hydrogen atoms spread evenly around the carbon atom.',
      space: 'The space-filling model of methane shows the hydrogen atoms partly buried in the larger carbon atom.' },
  },
  sulfur: {
    formula: '\\text{S}_8', uni: 'S₈', count: 'eight sulfur atoms',
    flat: [0, 1, 2, 3, 4, 5, 6, 7].map((k) => ['S', 1.31 * Math.cos((k + 0.5) * TAU / 8), 1.31 * Math.sin((k + 0.5) * TAU / 8)]),
    fb: [0, 1, 2, 3, 4, 5, 6, 7].map((k) => [k, (k + 1) % 8, 1]),
    A: [['S', 2.3, 0, -0.53], ['S', 1.62, 1.62, 0.53], ['S', 0, 2.3, -0.53], ['S', -1.62, 1.62, 0.53], ['S', -2.3, 0, -0.53], ['S', -1.62, -1.62, 0.53], ['S', 0, -2.3, -0.53], ['S', 1.62, -1.62, 0.53]],
    B: [0, 1, 2, 3, 4, 5, 6, 7].map((k) => [k, (k + 1) % 8, 1]),
    dist: 24, views: [{ label: 'above', yaw: 0, pitch: 0 }, { label: 'side', yaw: 0, pitch: 1.45 }],
    shows: { struct: 'The structural formula of sulfur draws its eight atoms as a flat ring.',
      ball: 'The ball-and-stick model of S₈ shows the ring puckered into a crown.',
      space: 'The space-filling model of S₈ shows each sulfur atom partly buried in its two neighbors.' },
  },
  benzene: {
    formula: '\\text{C}_6\\text{H}_6', uni: 'C₆H₆', count: 'six carbon atoms and six hydrogen atoms',
    flat: [0, 1, 2, 3, 4, 5].map((k) => ['C', Math.cos(-Math.PI / 2 + k * TAU / 6), Math.sin(-Math.PI / 2 + k * TAU / 6)])
      .concat([0, 1, 2, 3, 4, 5].map((k) => ['H', 1.95 * Math.cos(-Math.PI / 2 + k * TAU / 6), 1.95 * Math.sin(-Math.PI / 2 + k * TAU / 6)])),
    fb: [0, 1, 2, 3, 4, 5].map((k) => [k, (k + 1) % 6, k % 2 ? 1 : 2]).concat([0, 1, 2, 3, 4, 5].map((k) => [k, k + 6, 1])),
    A: [['C', -1.21, -0.69, 0], ['C', -1.2, 0.71, 0], ['C', -0.01, -1.39, 0], ['C', 0.01, 1.39, 0], ['C', 1.2, -0.71, 0], ['C', 1.21, 0.69, 0], ['H', -2.16, -1.22, 0], ['H', -2.14, 1.26, 0], ['H', -0.02, -2.48, 0], ['H', 0.02, 2.48, 0], ['H', 2.14, -1.26, 0], ['H', 2.16, 1.22, 0]],
    B: [[0, 1, 2], [0, 2, 1], [0, 6, 1], [1, 3, 1], [1, 7, 1], [2, 4, 2], [2, 8, 1], [3, 5, 2], [3, 9, 1], [4, 5, 1], [4, 10, 1], [5, 11, 1]],
    dist: 26, views: [{ label: 'face', yaw: 0, pitch: 0 }, { label: 'edge', yaw: 0, pitch: 1.5 }],
    shows: { struct: 'The structural formula of benzene shows a ring of six carbon atoms, each bonded to one hydrogen atom.',
      ball: 'The ball-and-stick model of benzene shows all twelve atoms lying in one plane.',
      space: 'The space-filling model of benzene shows most of the space taken up by the carbon atoms.' },
  },
  acetic: {
    formula: '\\text{C}_2\\text{H}_4\\text{O}_2', uni: 'C₂H₄O₂', count: 'two carbon atoms, four hydrogen atoms and two oxygen atoms',
    flat: [['C', -1, 0], ['H', -2, 0], ['H', -1, -1], ['H', -1, 1], ['C', 0, 0], ['O', 0, -1], ['O', 1, 0], ['H', 2, 0]],
    fb: [[0, 1, 1], [0, 2, 1], [0, 3, 1], [0, 4, 1], [4, 5, 2], [4, 6, 1], [6, 7, 1]],
    A: [['O', -0.8, 1.26, 0], ['O', -1.47, -0.91, 0], ['C', 0.88, -0.38, 0], ['C', -0.58, -0.07, 0], ['H', 1.34, 0.03, -0.9], ['H', 1.35, 0.04, 0.9], ['H', 1.03, -1.46, 0.01], ['H', -1.75, 1.48, 0]],
    B: [[0, 3, 1], [0, 7, 1], [1, 3, 2], [2, 3, 1], [2, 4, 1], [2, 5, 1], [2, 6, 1]],
    dist: 19, views: [{ label: 'front', yaw: 0, pitch: 0 }, { label: 'side', yaw: 1.57, pitch: 0 }],
    shows: { struct: 'The structural formula of acetic acid shows the second carbon atom bonded to both oxygen atoms, one of them by a double bond.',
      ball: 'The ball-and-stick model of acetic acid shows the arrangement of its eight atoms in space.',
      space: 'The space-filling model of acetic acid shows the relative sizes of its atoms.' },
  },
};
const R_BALL = { H: 0.26, C: 0.38, O: 0.36, S: 0.46 }, R_VDW = { H: 1.1, C: 1.6, O: 1.45, S: 1.7 };
const MODEL_WORD = { struct: 'structural formula', ball: 'ball-and-stick model', space: 'space-filling model' };
const T3 = () => window.THREE;
/* the signature of everything a scene's colours are read from, so a theme change rebuilds it */
const palSig = () => [PAL.ink, PAL.panel, PAL.muted, F.el('C'), F.el('H'), F.el('O'), F.el('S')].join('|');

/* =====================================================================
   Figures 2.16, 2.17, 2.20, 2.21: one molecule three ways. The structural
   formula is the flat drawing the book teaches and the default; the two
   models are one 3D scene mounted on the first switch, where the balls
   swell into the space-filling model and the sticks fade as they are
   buried. Still: a molecule has no clock. Free orbit and idle spin, since
   a molecule has no ground.
   ===================================================================== */
function represent(id, key) {
  const m = MOL[key], d = sim(id, 500);
  const M = F.choice(d.controls, { label: '\\text{model}', options: [{ value: 'struct', label: 'structural formula' }, { value: 'ball', label: 'ball-and-stick' }, { value: 'space', label: 'space-filling' }], value: 'struct', aria: 'how the molecule is represented', onInput: show });
  let hits = [];
  F.hover(d.stage, () => (M.value === 'struct' ? hits : []));
  /* the flat drawing, scaled so that the widest molecule fits */
  function draw2d() {
    const { ctx } = begin(d.c); hits = [];
    headline(ctx, m.shows.struct);
    const xs = m.flat.map((a) => a[1]), ys = m.flat.map((a) => a[2]);
    const L = Math.min(130, 900 / (Math.max(...xs) - Math.min(...xs) + 1), 360 / (Math.max(...ys) - Math.min(...ys) + 0.4));
    const cx = 700 - L * (Math.max(...xs) + Math.min(...xs)) / 2, cy = 285 - L * (Math.max(...ys) + Math.min(...ys)) / 2;
    const P = m.flat.map((a) => [cx + a[1] * L, cy + a[2] * L]);
    const size = Math.min(40, L * 0.4);
    m.fb.forEach(([i, j, o]) => bond2(ctx, P[i], P[j], o, PAL.ink, size * 0.62));
    m.flat.forEach((a, i) => { text(ctx, a[0], P[i][0], P[i][1], PAL.ink, { size, align: 'center' }); hits.push({ x: P[i][0], y: P[i][1], r: size * 0.6, name: NAME[a[0]] + ' atom' }); });
  }
  let v = null, grp = null, sticks = null, balls = [], sig = '';
  function mount() {
    v = F.view3d(d.stage, { spin: 'idle', views: m.views, h: 420, dist: m.dist, tilt: 0.3 });
    grp = v.part(0);
  }
  function build() {
    const s = palSig(); if (s === sig) return; sig = s;
    v.clear(); balls = [];
    sticks = new (T3().Group)(); grp.add(sticks);
    m.B.forEach(([i, j, o]) => F.mesh.bond(sticks, m.A[i].slice(1), m.A[j].slice(1), o, 0.07));
    m.A.forEach((a) => { const b = F.mesh.sphere(grp, a.slice(1), R_BALL[a[0]], F.el(a[0])); v.pickable(b, NAME[a[0]] + ' atom'); balls.push([b, a[0]]); });
  }
  function draw3d() {
    build();
    const k = M.mix((x) => (x === 'space' ? 1 : 0));
    balls.forEach(([b, s]) => b.scale.setScalar(lerp(R_BALL[s], R_VDW[s], k)));
    F.fade3(sticks, 1 - k);
    v.headline(m.shows[M.value]);
    v.invalidate();
  }
  function show() {
    const three = M.value !== 'struct';
    if (three && !v) mount();
    d.c.style.display = three ? 'none' : '';
    if (v) [v.wrap, d.stage.querySelector('.view3d-bar')].forEach((e) => { if (e) e.style.display = three ? '' : 'none'; });
    draw();
  }
  function draw() {
    if (M.value === 'struct') draw2d(); else draw3d();
    readout(d.readout, m.formula, `The molecular formula ${m.uni} counts ${m.count}; the ${MODEL_WORD[M.value]} ${M.value === 'struct' ? 'adds how they are connected' : M.value === 'ball' ? 'adds how they are arranged in space' : 'adds their relative sizes'}.`);
  }
  register(d.fig, { update: () => {}, draw });
}
represent('fig-methane', 'methane');
represent('fig-sulfur', 'sulfur');
represent('fig-benzene', 'benzene');
represent('fig-acetic', 'acetic');

/* =====================================================================
   Figure 2.18: H, 2H, H₂ and 2H₂. Two choices write the number in front
   and the subscript; the atoms slide together into molecules or apart
   into separate units as the choices change. Still: no clock.
   ===================================================================== */
(function () {
  const d = sim('fig-hydrogen', 400);
  const opts = [{ value: '1', label: 'none' }, { value: '2', label: '2' }];
  const Cf = F.choice(d.controls, { label: '\\text{number in front}', options: opts, value: '2', aria: 'the number written in front of the symbol' });
  const Sb = F.choice(d.controls, { label: '\\text{subscript}', options: opts, value: '2', aria: 'the subscript written after the symbol' });
  const Y = 250, UNIT = 320, BOND = 76, R = 30;
  /* four atom slots, (unit, place in unit); each is [x, opacity], and a bond per unit carries its own opacity */
  function layout(c, s) {
    const out = [];
    for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) {
      const ii = Math.min(i, c - 1), jj = Math.min(j, s - 1), ux = 700 + (ii - (c - 1) / 2) * UNIT;
      out.push(ux + (jj - (s - 1) / 2) * BOND, i < c && j < s ? 1 : 0);
    }
    for (let i = 0; i < 2; i++) out.push(i < c && s === 2 ? 1 : 0);
    return out;
  }
  const HEAD = { '1,1': 'H is one hydrogen atom.', '2,1': '2H is two separate hydrogen atoms, not combined as a unit.',
    '1,2': 'H₂ is one molecule of two hydrogen atoms bonded together.', '2,2': '2H₂ is two H₂ molecules, four hydrogen atoms in all.' };
  const UNITWORD = { 1: 'one H atom', 2: 'one H₂ molecule' };
  let hits = [];
  F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c); hits = [];
    const c = +Cf.value, s = +Sb.value;
    headline(ctx, HEAD[c + ',' + s]);
    const L = Cf.mix((cv) => Sb.mix((sv) => layout(+cv, +sv)));
    for (let i = 0; i < 2; i++) {
      const a = L[2 * (2 * i) + 1] > 0 ? L[8 + i] : 0;
      if (a > 0.01) F.faded(ctx, a, [0, 0], () => line(ctx, L[2 * (2 * i)], Y, L[2 * (2 * i + 1)], Y, PAL.ink, 8));
    }
    for (let n = 0; n < 4; n++) {
      const x = L[2 * n], a = L[2 * n + 1];
      if (a > 0.01) F.faded(ctx, a, [0, 0], () => atom(ctx, x, Y, 'H', R));
      if (a > 0.5) hits.push({ x, y: Y, r: R + 3, name: 'hydrogen atom' });
    }
    const formula = (c === 2 ? '2' : '') + 'H' + (s === 2 ? '_2' : '');
    text(ctx, formula, 700, 140, PAL.ink, { size: 56, weight: 600, align: 'center' });
    for (let i = 0; i < c; i++) text(ctx, UNITWORD[s], 700 + (i - (c - 1) / 2) * UNIT, Y + 72, PAL.muted, { size: 19, align: 'center' });
    readout(d.readout, `\\text{hydrogen atoms} = ${c} \\times ${s} = ${c * s}`);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   Sim: from a molecular formula to an empirical formula. The atoms of one
   molecule stand in rows by element; a story slider deals them, like cards,
   into as many identical groups as the counts allow, and each group is the
   empirical formula. The story has no clock of its own; the compound is a
   choice. Examples the exercises and the Check Your Learning ask about
   are left out.
   ===================================================================== */
(function () {
  const d = sim('sim-empirical', 500);
  const CMP = {
    methane: { name: 'methane', n: { C: 1, H: 4 }, mol: 'CH_{4}', uni: 'CH₄', tex: '\\text{CH}_4' },
    benzene: { name: 'benzene', n: { C: 6, H: 6 }, mol: 'C_{6}H_{6}', uni: 'C₆H₆', tex: '\\text{C}_6\\text{H}_6' },
    acetic: { name: 'acetic acid', n: { C: 2, H: 4, O: 2 }, mol: 'C_{2}H_{4}O_{2}', uni: 'C₂H₄O₂', tex: '\\text{C}_2\\text{H}_4\\text{O}_2' },
    glucose: { name: 'glucose', n: { C: 6, H: 12, O: 6 }, mol: 'C_{6}H_{12}O_{6}', uni: 'C₆H₁₂O₆', tex: '\\text{C}_6\\text{H}_{12}\\text{O}_6' },
  };
  const gcd = (a, b) => (b ? gcd(b, a % b) : a);
  const sub = (s, n, u) => (n === 1 ? s : s + (u ? String(n).split('').map((c) => '₀₁₂₃₄₅₆₇₈₉'[+c]).join('') : `_{${n}}`));
  const fmt = (n, u) => Object.entries(n).map(([s, k]) => sub(s, k, u)).join('');
  const texOf = (n) => Object.entries(n).map(([s, k]) => (k === 1 ? `\\text{${s}}` : `\\text{${s}}_{${k}}`)).join('');
  const K = F.choice(d.controls, { label: '\\text{compound}', options: Object.keys(CMP).map((k) => ({ value: k, label: CMP[k].name })), value: 'acetic', aria: 'the compound' });
  const st = F.ctl(d.controls, { label: '\\text{step}', cls: '', min: 0, max: 1, step: 0.01, value: 0, unit: '', aria: 'from the molecule to the simplest ratio' });
  F.story(d, st, { stops: [{ v: 0, label: 'molecule' }, { v: 1, label: 'simplest ratio' }] });
  const RA = { C: 17, H: 13, O: 16 };
  let hits = [];
  F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c); hits = [];
    const c = CMP[K.value], els = Object.keys(c.n), g = els.map((s) => c.n[s]).reduce(gcd), emp = Object.fromEntries(els.map((s) => [s, c.n[s] / g]));
    const k = F.ease.smooth(st.v);
    headline(ctx, g === 1 ? `${c.uni} divides into no smaller identical groups, so its empirical formula is ${c.uni} itself.` : `${c.uni} divides into ${g} identical groups of ${fmt(emp, true)}, its empirical formula.`);
    /* the groups: g boxes across the canvas, each holding one empirical unit in rows by element */
    const bw = Math.min(230, (1240 - (g - 1) * 18) / g), bx0 = 700 - (g * bw + (g - 1) * 18) / 2, by0 = 130, bh = 250;
    const rows = els.length, rowY = (r) => by0 + 40 + r * (bh - 80) / Math.max(1, rows - 1);
    F.faded(ctx, k, [0, 0], () => {
      for (let i = 0; i < g; i++) {
        const x = bx0 + i * (bw + 18);
        ctx.save(); ctx.strokeStyle = PAL.muted; ctx.lineWidth = 2.5; ctx.setLineDash([8, 6]); ctx.beginPath(); ctx.roundRect(x, by0, bw, bh, 12); ctx.stroke(); ctx.restore();
        text(ctx, fmt(emp), x + bw / 2, by0 + bh + 30, PAL.ink, { size: bw < 120 ? 20 : 26, weight: 600, align: 'center' });
      }
    });
    F.faded(ctx, 1 - k, [0, 0], () => els.forEach((s, r) => text(ctx, sub(s, c.n[s]), 150, rowY(r), PAL.ink, { size: 28, weight: 600, align: 'right' })));
    /* the atoms: in rows at the start, dealt atom k of an element into group k mod g at the end */
    F.faded(ctx, K.k, [0, 0], () => els.forEach((s, r) => {
      const n = c.n[s], per = n / g, rowGap = Math.min(64, 1100 / n);
      for (let a = 0; a < n; a++) {
        const x0 = 200 + a * rowGap, y0 = rowY(r);
        const gi = a % g, slot = Math.floor(a / g), sp = Math.min(34, (bw - 30) / per);
        const x1 = bx0 + gi * (bw + 18) + bw / 2 + (slot - (per - 1) / 2) * sp, y1 = rowY(r);
        const x = lerp(x0, x1, k), y = y0 + Math.sin(Math.PI * k) * (gi % 2 ? -1 : 1) * 12;
        atom(ctx, x, y, s, Math.min(RA[s], sp / 2 + 2));
        hits.push({ x, y, r: RA[s] + 3, name: NAME[s] + ' atom' });
      }
    }));
    text(ctx, c.mol, 700, by0 + bh + 80, PAL.muted, { size: 22, align: 'center' });
    const ratio = (n) => els.map((s) => n[s]).join(':');
    readout(d.readout, `${c.tex} = ${g === 1 ? '' : g + ' \\times '}${texOf(emp)}`, `The ratio of atoms ${ratio(c.n)}${g === 1 ? ' has no common factor, so it is already the simplest whole-number ratio.' : `, divided by ${g}, gives the simplest whole-number ratio ${ratio(emp)}.`}`);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   Figure 2.23: acetic acid and methyl formate. The same eight atoms keep
   their identities as the compound changes; the second carbon atom and
   the singly bonded oxygen atom trade places and the bonds that differ
   fade out and in. Still: the change fires on the choice.
   ===================================================================== */
(function () {
  const d = sim('fig-isomers', 440);
  /* atoms: C1, H, H, H, C2, O (double), O (single), H */
  const SYM = ['C', 'H', 'H', 'H', 'C', 'O', 'O', 'H'];
  const POS = {
    acetic: [[-1, 0], [-2, 0], [-1, -1], [-1, 1], [0, 0], [0, -1], [1, 0], [2, 0]],
    formate: [[-1, 0], [-2, 0], [-1, -1], [-1, 1], [1, 0], [1, -1], [0, 0], [2, 0]],
  };
  const BONDS = {
    acetic: [[0, 1, 1], [0, 2, 1], [0, 3, 1], [4, 5, 2], [0, 4, 1], [4, 6, 1], [6, 7, 1]],
    formate: [[0, 1, 1], [0, 2, 1], [0, 3, 1], [4, 5, 2], [0, 6, 1], [6, 4, 1], [4, 7, 1]],
  };
  const same = (a, b) => (a[0] === b[0] && a[1] === b[1]) || (a[0] === b[1] && a[1] === b[0]);
  const I = F.choice(d.controls, { label: '\\text{compound}', options: [{ value: 'acetic', label: 'acetic acid' }, { value: 'formate', label: 'methyl formate' }], value: 'acetic', aria: 'which isomer', ms: 1200 });
  const HEAD = { acetic: 'In acetic acid, the second carbon atom is bonded to both oxygen atoms.', formate: 'In methyl formate, one oxygen atom sits between the two carbon atoms.' };
  let hits = [];
  F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c); hits = [];
    headline(ctx, HEAD[I.value]);
    const L = 125, cx = 700, cy = 250;
    const flat = I.mix((v) => POS[v].flat());
    const P = SYM.map((_, i) => [cx + flat[2 * i] * L, cy + flat[2 * i + 1] * L]);
    /* the carbon and the oxygen that trade places pass on arcs, one above the bond line and one below, not through each other */
    const lift = I.k < 1 ? Math.sin(Math.PI * I.k) * 60 : 0;
    P[4][1] -= lift; P[6][1] += lift;
    ['acetic', 'formate'].forEach((v) => {
      const other = v === 'acetic' ? 'formate' : 'acetic';
      BONDS[v].forEach((b) => {
        const shared = BONDS[other].some((q) => same(q, b));
        if (shared) { if (v === 'acetic') bond2(ctx, P[b[0]], P[b[1]], b[2]); return; }
        const a = I.a(v); if (a > 0.01) F.faded(ctx, a, [0, 0], () => bond2(ctx, P[b[0]], P[b[1]], b[2]));
      });
    });
    SYM.forEach((s, i) => { text(ctx, s, P[i][0], P[i][1], PAL.ink, { size: 40, align: 'center' }); hits.push({ x: P[i][0], y: P[i][1], r: 24, name: NAME[s] + ' atom' }); });
    text(ctx, I.value === 'acetic' ? 'acetic acid' : 'methyl formate', cx, cy + 180, PAL.muted, { size: 22, align: 'center' });
    readout(d.readout, '\\text{C}_2\\text{H}_4\\text{O}_2');
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   Figure 2.24: the carvone mirror pair, in three dimensions only, as the
   book's rule for this pair asks. S-(+)-carvone on the left, and on the
   right its reflection in the plane between them, R-(−)-carvone. Still:
   the two are turned together, so the mirror relation holds in every
   view. Free orbit and idle spin, since a molecule has no ground.
   ===================================================================== */
(function () {
  const d = sim('fig-carvone');
  const A = [['O', 2.37, -2.06, 0.02], ['C', -0.65, -0.1, -0.28], ['C', 0.15, -1.23, 0.38], ['C', -0.12, 1.26, 0.17], ['C', -2.11, -0.23, 0.03], ['C', 1.63, -1.07, 0.1], ['C', 1.37, 1.35, 0.06], ['C', 2.2, 0.3, 0], ['C', -3.02, -0.43, -1.15], ['C', 3.69, 0.44, -0.14], ['C', -2.58, -0.18, 1.28], ['H', -0.5, -0.18, -1.36], ['H', -0.17, -2.19, -0.02], ['H', 0.03, -1.25, 1.47], ['H', -0.4, 1.51, 1.2], ['H', -0.57, 2.04, -0.47], ['H', 1.78, 2.36, 0.03], ['H', -2.93, 0.42, -1.84], ['H', -2.75, -1.34, -1.69], ['H', -4.07, -0.52, -0.86], ['H', 4.03, -0.05, -1.06], ['H', 4.19, -0.03, 0.71], ['H', 4, 1.49, -0.18], ['H', -3.64, -0.27, 1.48], ['H', -1.93, -0.04, 2.14]];
  const B = [[0, 5, 2], [1, 2, 1], [1, 3, 1], [1, 4, 1], [1, 11, 1], [2, 5, 1], [2, 12, 1], [2, 13, 1], [3, 6, 1], [3, 14, 1], [3, 15, 1], [4, 8, 1], [4, 10, 2], [5, 7, 1], [6, 7, 2], [6, 16, 1], [7, 9, 1], [8, 17, 1], [8, 18, 1], [8, 19, 1], [9, 20, 1], [9, 21, 1], [9, 22, 1], [10, 23, 1], [10, 24, 1]];
  /* the S molecule turned a quarter about y so that it faces the reader, then set left of the mirror; the R molecule is its reflection */
  const GAP = 5.2;
  const S = A.map(([s, x, y, z]) => [s, -z - GAP, y, x]);
  const Rm = S.map(([s, x, y, z]) => [s, -x, y, z]);
  const v = F.view3d(d.stage, { spin: 'idle', h: 440, dist: 24, tilt: 0.2, views: [{ label: 'face the mirror', yaw: 0, pitch: 0 }, { label: 'above', yaw: 0, pitch: 1.4 }, { label: 'along the mirror', yaw: 1.57, pitch: 0 }] });
  const g = v.part(0);
  let sig = '';
  function molecule(atoms, which) {
    B.forEach(([i, j, o]) => F.mesh.bond(g, atoms[i].slice(1), atoms[j].slice(1), o, 0.07));
    atoms.forEach((a, i) => v.pickable(F.mesh.sphere(g, a.slice(1), R_BALL[a[0]], F.el(a[0])), NAME[a[0]] + ' atom of ' + which + (i === 1 ? ', the ring carbon atom whose four bonds point differently in the two isomers' : '')));
  }
  function build() {
    const s = palSig(); if (s === sig) return; sig = s;
    v.clear();
    const T = T3(), plane = new T.Mesh(new T.PlaneGeometry(9, 9), F.mesh.mat(PAL.ink, { transparent: true, opacity: 0.07, depthWrite: false, side: T.DoubleSide }));
    plane.rotation.y = Math.PI / 2; g.add(plane);
    molecule(S, 'S-(+)-carvone'); molecule(Rm, 'R-(−)-carvone');
    /* the names sit below and in front of each molecule, so that seen from above they fall clear of it too */
    v.label('<em>S</em>-(+)-carvone', [-GAP, -4.2, 4.6], g); v.label('<em>R</em>-(−)-carvone', [GAP, -4.2, 4.6], g);
  }
  function draw() {
    if (!v.scene) return;
    build();
    v.headline('<em>S</em>-(+)-carvone, which smells like caraway, and <em>R</em>-(−)-carvone, which smells like spearmint, are mirror images.');
    v.invalidate();
    readout(d.readout, '\\text{C}_{10}\\text{H}_{14}\\text{O}');
  }
  register(d.fig, { update: () => {}, draw });
})();
};
