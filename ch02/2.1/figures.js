/* Figures for section 2.1 Early Ideas in Atomic Theory. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['2.1'] = function (root, F) {
const { el, fmt, tex, C, PAL, alpha, ctl, register, begin, line, arrow, text, headline } = F;
const sim = (id, H) => F.sim(root, id, H);
function readout(host, main, small) { tex(host, main); if (small) host.appendChild(el('small', null, small)); }
const TAU = 2 * Math.PI;
const NAME = { Cu: 'copper', O: 'oxygen', Cl: 'chlorine', C: 'carbon', H: 'hydrogen' };

/* an atom as a filled disc in its element's colour (rule 7.2); hydrogen is light and takes an ink outline */
function disc(ctx, x, y, r, fill, strong) {
  ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fillStyle = fill; ctx.fill();
  ctx.lineWidth = strong ? 2 : 1.2; ctx.strokeStyle = strong ? PAL.ink : alpha(PAL.ink, 0.4); ctx.stroke(); ctx.restore();
}
const atom = (ctx, x, y, sym, r) => disc(ctx, x, y, r, F.el(sym), sym === 'H');
/* a bond between two atoms, drawn under them */
const bond = (ctx, a, b) => line(ctx, a[0], a[1], b[0], b[1], alpha(PAL.ink, 0.55), 5);

/* the example names its spheres green and blue, so those colours are the fact its question points at */
const SPHERE = { green: '#3c9a4a', blue: '#3a72d0' };

/* =====================================================================
   FIGURE 2.4: copper and oxygen become copper(II) oxide. A choice between
   the elements and the compound; each atom travels on the choice's morph
   from its place in the copper block or its O2 pair to its place in the
   oxide. Still: the change is a before and an after, with no clock.
===================================================================== */
(function () {
  const d = sim('sim-copper-oxygen', 500);
  const S = F.choice(d.controls, { label: '\\text{sample}', aria: 'the elements or the compound', value: 'before',
    options: [{ value: 'before', label: 'copper and oxygen' }, { value: 'after', label: 'copper(II) oxide' }] });
  const R = 19, G = 40;
  /* the copper block, 4 by 4, and eight O2 molecules scattered through the gas at fixed places and angles */
  const CU0 = [], O0 = [];
  for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) CU0.push([230 + G * j, 210 + G * i]);
  const PAIRS = [[700, 150, 0.2], [860, 175, -0.6], [1020, 145, 0.9], [1170, 190, 0.1], [740, 300, 1.3], [900, 330, 0.4], [1060, 290, -0.3], [1200, 350, 0.7]];
  for (const [x, y, a] of PAIRS) { const dx = Math.cos(a) * R * 0.95, dy = Math.sin(a) * R * 0.95; O0.push([x - dx, y - dy], [x + dx, y + dy]); }
  /* the oxide: 8 by 4, copper and oxygen alternating, centred under the headline */
  const CU1 = [], O1 = [];
  for (let i = 0; i < 4; i++) for (let j = 0; j < 8; j++) ((i + j) % 2 ? O1 : CU1).push([560 + G * j, 210 + G * i]);
  const flat = (a) => a.flat();
  const POS = { before: { cu: flat(CU0), o: flat(O0) }, after: { cu: flat(CU1), o: flat(O1) } };
  let hits = []; F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c);
    const p = S.mix((v) => POS[v]), aB = S.a('before'), aA = S.a('after');
    hits = [];
    /* O2 bonds while the oxygen is a gas; the pairs part as the atoms leave */
    F.faded(ctx, aB, [0, 0], () => { for (let k = 0; k < 8; k++) bond(ctx, [p.o[4 * k], p.o[4 * k + 1]], [p.o[4 * k + 2], p.o[4 * k + 3]]); });
    for (let k = 0; k < 16; k++) { atom(ctx, p.cu[2 * k], p.cu[2 * k + 1], 'Cu', R); hits.push({ x: p.cu[2 * k], y: p.cu[2 * k + 1], r: R, name: 'copper atom' }); }
    for (let k = 0; k < 16; k++) { atom(ctx, p.o[2 * k], p.o[2 * k + 1], 'O', R * 0.8); hits.push({ x: p.o[2 * k], y: p.o[2 * k + 1], r: R, name: S.value === 'before' ? 'oxygen atom of an O₂ molecule' : 'oxygen atom' }); }
    F.faded(ctx, aB, [0, 0], () => {
      text(ctx, 'copper, a shiny, red-brown solid', 290, 390, PAL.ink, { size: 20, align: 'center' });
      text(ctx, 'oxygen, a clear and colorless gas', 950, 410, PAL.ink, { size: 20, align: 'center' });
    });
    F.faded(ctx, aA, [0, 0], () => text(ctx, 'copper(II) oxide, a powdery, black solid', 700, 390, PAL.ink, { size: 20, align: 'center' }));
    /* the legend */
    atom(ctx, 90, 458, 'Cu', 12); text(ctx, 'copper atom', 110, 458, PAL.ink, { size: 18 });
    atom(ctx, 270, 458, 'O', 10); text(ctx, 'oxygen atom', 290, 458, PAL.ink, { size: 18 });
    const after = S.value === 'after';
    headline(ctx, after ? 'The same 16 copper atoms and 16 oxygen atoms are now combined in a 1:1 ratio as copper(II) oxide.'
      : 'Sixteen copper atoms in the metal and 16 oxygen atoms in eight O₂ molecules, before the change.');
    readout(d.readout, '\\text{copper atoms: } 16 \\text{ before} = 16 \\text{ after} \\qquad \\text{oxygen atoms: } 16 \\text{ before} = 16 \\text{ after}');
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   SIM: the constant composition of isooctane (Table 2.1). The sample's
   mass is a slider notched at samples A, B and C; its carbon and hydrogen
   are two bars on one fixed 0–30 g scale, and the strip beneath scales the
   sample to 1.00 g of hydrogen. Still: the bars answer the slider.
===================================================================== */
(function () {
  const d = sim('sim-isooctane', 440);
  const SAMPLES = [['A', 17.60], ['C', 23.04], ['B', 26.52]];
  /* each notched sample is a referent of Table 2.1, named in its colour while the slider rests on it */
  const WHO = { A: 'sample-a', B: 'sample-b', C: 'sample-c' };
  const M = ctl(d.controls, { label: '\\km', cls: 'mass', min: 5, max: 30, step: 0.01, value: 17.60, unit: 'g', dec: 2, aria: 'mass of the sample of isooctane',
    detents: SAMPLES.map(([n, v]) => ({ v, label: n })), snap: true });
  /* sample A's carbon and hydrogen fix the composition: 14.82 g of carbon in 17.60 g */
  const FC = 14.82 / 17.60, FH = 2.78 / 17.60, RATIO = 14.82 / 2.78;
  const L = 260, RT = 1300, X = (g) => L + ((RT - L) * g) / 30, XS = (g) => L + ((RT - L) * g) / 6;
  let hits = []; F.hover(d.stage, () => hits);
  function bar(ctx, y, h, g, solid) {
    const cm = C('mass');
    ctx.save(); ctx.fillStyle = solid ? cm : alpha(cm, 0.35); ctx.fillRect(L, y - h / 2, X(g) - L, h);
    ctx.strokeStyle = cm; ctx.lineWidth = 2; ctx.strokeRect(L, y - h / 2, X(g) - L, h); ctx.restore();
  }
  function draw() {
    const { ctx } = begin(d.c);
    const m = M.v, c = m * FC, h = m * FH, cm = C('mass');
    const at = SAMPLES.find(([, v]) => Math.abs(v - m) < 0.005);
    /* the scale in grams, 0 to 30 */
    for (let g = 0; g <= 30; g += 5) { line(ctx, X(g), 110, X(g), 262, PAL.rule, 1.5); text(ctx, String(g), X(g), 280, PAL.muted, { size: 17, align: 'center' }); }
    text(ctx, 'mass (g)', RT, 304, PAL.muted, { size: 17, align: 'right' });
    if (at) text(ctx, 'sample ' + at[0], 56, 100, F.ref(WHO[at[0]]), { size: 20, weight: 600 });
    atom(ctx, 70, 150, 'C', 14); text(ctx, 'carbon', 92, 150, PAL.ink, { size: 20 });
    atom(ctx, 70, 222, 'H', 10); text(ctx, 'hydrogen', 92, 222, PAL.ink, { size: 20 });
    bar(ctx, 150, 46, c, true); bar(ctx, 222, 46, h, false);
    text(ctx, fmt(c, 2) + ' g', X(c) + 12, 150, cm, { size: 20, weight: 600 });
    text(ctx, fmt(h, 2) + ' g', X(h) + 12, 222, cm, { size: 20, weight: 600 });
    /* the same composition per 1.00 g of hydrogen, on its own 0 to 6 g scale */
    const y = 374;
    line(ctx, L, y + 30, RT, y + 30, PAL.muted, 2);
    for (let g = 0; g <= 6; g++) text(ctx, String(g), XS(g), y + 48, PAL.muted, { size: 15, align: 'center' });
    ctx.save(); ctx.fillStyle = cm; ctx.fillRect(L, y - 20, XS(RATIO) - L, 18); ctx.fillStyle = alpha(cm, 0.35); ctx.fillRect(L, y + 2, XS(1) - L, 18); ctx.restore();
    text(ctx, fmt(RATIO, 2) + ' g carbon', XS(RATIO) + 12, y - 11, cm, { size: 18, weight: 600 });
    text(ctx, '1.00 g hydrogen', XS(1) + 12, y + 11, cm, { size: 18, weight: 600 });
    text(ctx, 'per 1.00 g', 70, y - 11, PAL.ink, { size: 18 }); text(ctx, 'of hydrogen', 70, y + 13, PAL.ink, { size: 18 });
    hits = [{ x: (L + X(c)) / 2, y: 150, r: 26, name: fmt(c, 2) + ' g of carbon' }, { x: (L + X(h)) / 2, y: 222, r: 26, name: fmt(h, 2) + ' g of hydrogen' }];
    headline(ctx, (at ? 'Sample ' + at[0] + ', ' : 'A sample of ') + fmt(m, 2) + ' g of isooctane holds ' + fmt(c, 2) + ' g of carbon and ' + fmt(h, 2) + ' g of hydrogen, or 5.33 g of carbon for every 1.00 g of hydrogen.');
    readout(d.readout, `\\frac{\\htmlClass{kv-mass}{${fmt(c, 2)}\\ \\text{g carbon}}}{\\htmlClass{kv-mass}{${fmt(h, 2)}\\ \\text{g hydrogen}}}=\\frac{\\htmlClass{kv-mass}{5.33\\ \\text{g carbon}}}{\\htmlClass{kv-mass}{1.00\\ \\text{g hydrogen}}}`);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 2.5: the two copper chlorides, flat. The mass of copper is a
   slider; the chlorine that combines with it is a bar beneath each
   compound, the brown one's twice the green one's. Still: no time in it.
===================================================================== */
(function () {
  const d = sim('sim-copper-chlorides', 600);
  const M = ctl(d.controls, { label: '\\km_{\\text{Cu}}', cls: 'mass', min: 0.5, max: 5, step: 0.01, value: 1, unit: 'g', dec: 2, aria: 'mass of copper in each sample' });
  const GREEN = 0.558, BROWN = 1.116;
  const R = 17;
  /* (a) one chlorine atom per copper atom: a 6 by 4 lattice, copper and chlorine alternating */
  const A = [];
  for (let i = 0; i < 4; i++) for (let j = 0; j < 6; j++) A.push({ x: 190 + 64 * j, y: 140 + 56 * i, s: (i + j) % 2 ? 'Cl' : 'Cu' });
  /* (b) two chlorine atoms per copper atom: a chain of copper atoms with a pair of chlorine atoms after each */
  const B = [];
  for (let j = 0; j < 5; j++) { const x = 820 + 96 * j; B.push({ x, y: 224, s: 'Cu' }, { x: x + 48, y: 170, s: 'Cl' }, { x: x + 48, y: 278, s: 'Cl' }); }
  let hits = []; F.hover(d.stage, () => hits);
  function drawSet(ctx, set, links) {
    for (const [a, b] of links) bond(ctx, [set[a].x, set[a].y], [set[b].x, set[b].y]);
    for (const q of set) { atom(ctx, q.x, q.y, q.s, q.s === 'Cu' ? R : R * 0.85); hits.push({ x: q.x, y: q.y, r: R, name: NAME[q.s] + ' atom' }); }
  }
  const LA = [];
  for (let i = 0; i < 4; i++) for (let j = 0; j < 6; j++) { const k = 6 * i + j; if (j < 5) LA.push([k, k + 1]); if (i < 3) LA.push([k, k + 6]); }
  const LB = [];
  for (let j = 0; j < 5; j++) { const k = 3 * j; LB.push([k, k + 1], [k, k + 2]); if (j < 4) LB.push([k + 1, k + 3], [k + 2, k + 3]); }
  /* the bars: 0 to 6 g under each panel */
  function bars(ctx, x0, w, cu, cl) {
    const cm = C('mass'), Xg = (g) => x0 + (w * g) / 6;
    for (let g = 0; g <= 6; g++) text(ctx, String(g), Xg(g), 530, PAL.muted, { size: 15, align: 'center' });
    line(ctx, x0, 512, x0 + w, 512, PAL.muted, 2);
    text(ctx, 'mass (g)', x0 + w, 556, PAL.muted, { size: 15, align: 'right' });
    ctx.save(); ctx.fillStyle = cm; ctx.fillRect(x0, 420, Xg(cu) - x0, 30); ctx.fillStyle = alpha(cm, 0.35); ctx.fillRect(x0, 462, Xg(cl) - x0, 30);
    ctx.strokeStyle = cm; ctx.lineWidth = 2; ctx.strokeRect(x0, 462, Xg(cl) - x0, 30); ctx.restore();
    text(ctx, fmt(cu, 2) + ' g copper', Xg(cu) + 10, 435, cm, { size: 18, weight: 600 });
    text(ctx, fmt(cl, 3) + ' g chlorine', Xg(cl) + 10, 477, cm, { size: 18, weight: 600 });
  }
  function draw() {
    const { ctx } = begin(d.c);
    const cu = M.v, g = GREEN * cu, b = BROWN * cu;
    hits = [];
    drawSet(ctx, A, LA); drawSet(ctx, B, LB);
    text(ctx, '(a) green solid, 1 Cl per Cu', 350, 370, PAL.ink, { size: 20, align: 'center', weight: 600 });
    text(ctx, '(b) brown solid, 2 Cl per Cu', 1060, 370, PAL.ink, { size: 20, align: 'center', weight: 600 });
    atom(ctx, 560, 580, 'Cu', 12); text(ctx, 'copper atom', 580, 580, PAL.ink, { size: 17 });
    atom(ctx, 730, 580, 'Cl', 10); text(ctx, 'chlorine atom', 750, 580, PAL.ink, { size: 17 });
    bars(ctx, 110, 440, cu, g); bars(ctx, 800, 440, cu, b);
    headline(ctx, 'With ' + fmt(cu, 2) + ' g of copper, the green compound holds ' + fmt(g, 3) + ' g of chlorine and the brown compound ' + fmt(b, 3) + ' g, twice as much.');
    const cuT = `\\htmlClass{kv-mass}{${fmt(cu, 2)}\\ \\text{g Cu}}`;
    readout(d.readout, `\\dfrac{\\dfrac{\\htmlClass{kv-mass}{${fmt(b, 3)}\\ \\text{g Cl}}}{${cuT}}}{\\dfrac{\\htmlClass{kv-mass}{${fmt(g, 3)}\\ \\text{g Cl}}}{${cuT}}}=\\dfrac{2}{1}`);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE (Example 2.1): the change the example tests, a faithful copy
   drawn for both themes. Still, no controls.
===================================================================== */
(function () {
  const d = sim('fig-dalton-test', 230);
  let hits = []; F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c);
    const gr = F.fact(SPHERE.green), bl = F.fact(SPHERE.blue), RG = 30, RB = 23;
    hits = [];
    const put = (x, y, r, fill, name) => { disc(ctx, x, y, r, fill, false); hits.push({ x, y, r, name }); };
    const y = 120;
    put(200, y, RG, gr, 'atom of one element (green)'); put(258, y, RG, gr, 'atom of one element (green)');
    text(ctx, '+', 350, y, PAL.ink, { size: 34, align: 'center' });
    put(430, y, RB, bl, 'atom of another element (blue)'); put(474, y, RB, bl, 'atom of another element (blue)');
    arrow(ctx, 600, y, 760, y, PAL.ink, 4);
    put(900, y, RG, gr, 'atom of one element (green)'); put(952, y, RB, bl, 'atom of another element (blue)');
    text(ctx, 'Starting materials', 337, 196, PAL.ink, { size: 22, align: 'center' });
    text(ctx, 'Products of the change', 926, 196, PAL.ink, { size: 22, align: 'center' });
    headline(ctx, 'Green spheres are atoms of one element, and blue spheres are atoms of another.');
    readout(d.readout, '\\text{starting materials: 2 green, 2 blue} \\qquad \\text{products: 1 green, 1 blue}');
  }
  register(d.fig, { update: () => {}, draw });
})();
};
