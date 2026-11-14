/* Figures for section 2.1 Early Ideas in Atomic Theory. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['2.1'] = function (root, F) {
const { fmt, tex, C, PAL, alpha, ctl, register, begin, line, arrow, text } = F;
const sim = (id, H) => F.sim(root, id, H);
const TAU = 2 * Math.PI;

/* an atom as a filled disc in its element's colour (rule 7.2) */
function disc(ctx, x, y, r, fill, strong) {
  ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fillStyle = fill; ctx.fill();
  ctx.lineWidth = strong ? 2 : 1.2; ctx.strokeStyle = strong ? PAL.ink : alpha(PAL.ink, 0.4); ctx.stroke(); ctx.restore();
}
const atom = (ctx, x, y, sym, r) => disc(ctx, x, y, r, F.el(sym), sym === 'H');

/* =====================================================================
   FIGURE 2.4: copper and oxygen become copper(II) oxide, one O2 molecule
   at a time. Sixteen copper atoms and eight O2 molecules; each molecule
   that reacts takes two copper atoms from the metal into the oxide. The
   atoms travel on a tween that follows the slider, so none appears and
   none vanishes. Still: it answers its slider and has no clock.
===================================================================== */
(function () {
  const d = sim('sim-copper-oxygen', 520);
  const P = F.tween(d, 4);
  const N = ctl(d.controls, { label: '\\text{O}_2\\text{ molecules reacted}', cls: '', key: 'reacted', min: 0, max: 8, step: 1, value: 4, unit: '', dec: 0,
    aria: 'oxygen molecules that have reacted', onInput: () => P.to(N.v, Math.min(2600, 650 * Math.abs(N.v - P.v))) });
  const RC = 30, RO = 22, Y0 = 262;
  /* the metal: 4 by 4, atoms touching; the top row leaves first, from the right */
  const CU0 = [];
  for (let k = 0; k < 16; k++) CU0.push([90 + 60 * (3 - (k % 4)), Y0 - 90 + 60 * Math.floor(k / 4)]);
  /* the gas: eight O2 molecules at fixed places and angles, the two atoms of each overlapping as the book draws them */
  const PAIRS = [[690, 250, 0.2], [560, 150, -0.5], [640, 372, 0.5], [480, 232, 1.0], [600, 268, -0.3], [450, 345, -0.8], [455, 135, 0.3], [545, 395, 0.1]];
  const O0 = [];
  for (const [x, y, a] of PAIRS) { const dx = Math.cos(a) * RO * 0.8, dy = Math.sin(a) * RO * 0.8; O0.push([x - dx, y - dy], [x + dx, y + dy]); }
  /* the oxide: 8 by 4, copper and oxygen alternating; each molecule and its two copper atoms fill one 2 by 2 block, column by column */
  const Q = 52, OX = 900, OY = Y0 - 1.5 * Q, CU1 = [], O1 = [];
  for (let k = 0; k < 8; k++) {
    const c = 2 * (k >> 1), r = 2 * (k & 1), at = (i, j) => [OX + Q * (c + j), OY + Q * (r + i)];
    CU1.push(at(0, 0), at(1, 1)); O1.push(at(0, 1), at(1, 0));
  }
  const ease = (u) => u * u * (3 - 2 * u), mixp = (a, b, u) => [a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u];
  let hits = []; F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c);
    const p = P.v, n = N.v; hits = [];
    const u = (k) => ease(Math.min(1, Math.max(0, p - k)));
    /* atoms at rest first, the ones on their way over them */
    for (const moving of [false, true]) for (let k = 0; k < 8; k++) {
      const uk = u(k); if ((uk > 0 && uk < 1) !== moving) continue;
      for (const i of [2 * k, 2 * k + 1]) {
        const c = mixp(CU0[i], CU1[i], uk), o = mixp(O0[i], O1[i], uk);
        atom(ctx, c[0], c[1], 'Cu', RC); hits.push({ x: c[0], y: c[1], r: RC, name: 'copper atom' });
        atom(ctx, o[0], o[1], 'O', RO); hits.push({ x: o[0], y: o[1], r: RO, name: uk > 0 ? 'oxygen atom' : 'oxygen atom of an O₂ molecule' });
      }
    }
    /* the change as the book writes one: the elements, an arrow, the compound */
    text(ctx, '+', 350, Y0, PAL.ink, { size: 36, align: 'center' });
    arrow(ctx, 770, Y0, 850, Y0, PAL.ink, 4);
    const name = (a, x, s, sub) => F.faded(ctx, Math.min(1, Math.max(0, a)), [0, 0], () => {
      text(ctx, s, x, 432, PAL.ink, { size: 22, weight: 600, align: 'center' }); text(ctx, sub, x, 462, PAL.muted, { size: 18, align: 'center' });
    });
    name(8 - p, 180, 'copper', 'a shiny, red-brown solid');
    name(8 - p, 570, 'oxygen', 'a clear and colorless gas');
    /* the oxide's name stays under the columns filled so far */
    const m = Math.min(3, Math.floor(p / 2)), cols = p >= 8 ? 8 : Math.max(2, 2 * m + 2 * ease(Math.min(1, p - 2 * m)));
    name(p, OX + (Q * (cols - 1)) / 2, 'copper(II) oxide', 'a powdery, black solid');
    F.legend(ctx, { l: 30, r: 1370, t: 14, b: 506 }, [{ s: 'copper atom', draw: (c, x, y) => atom(c, x, y, 'Cu', 11) }, { s: 'oxygen atom', draw: (c, x, y) => atom(c, x, y, 'O', 9) }], { corner: 'top', row: true });
    tex(d.readout, `\\text{copper atoms: } ${16 - 2 * n} \\text{ in the metal} + ${2 * n} \\text{ in the oxide} = 16 \\\\ \\text{oxygen atoms: } ${16 - 2 * n} \\text{ in O}_2 + ${2 * n} \\text{ in the oxide} = 16`);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   SIM: the constant composition of isooctane (Table 2.1) as a graph.
   Mass of carbon against mass of hydrogen: samples A, B and C lie on one
   line through the origin, and the slider's sample moves along it. The
   slider holds the hydrogen in hundredths of a gram and shows the sample's
   mass, so the masses printed divide to 5.33 at every setting.
   Axes fixed: 0 to 5 g of hydrogen, 0 to 30 g of carbon.
===================================================================== */
(function () {
  const d = sim('sim-isooctane', 540);
  const K = 5.33, SAMPLES = [['A', 2.78, 14.82, 'sample-a'], ['C', 3.64, 19.40, 'sample-c'], ['B', 4.19, 22.33, 'sample-b']];
  const carbon = (h) => Math.round(K * h * 100) / 100;
  const M = ctl(d.controls, { label: '\\km', cls: 'mass', min: 1, max: 4.5, step: 0.01, value: 2.78, unit: 'g', fmt: (h) => fmt(carbon(h) + h, 2) + ' g',
    aria: 'mass of the sample of isooctane', detents: SAMPLES.map(([s, h]) => ({ v: h, label: s })), snap: true });
  let hits = []; F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c);
    const h = Math.round(M.v * 100) / 100, c = carbon(h), cm = C('mass');
    const box = { l: 150, r: 1300, t: 70, b: 440 };
    const g = F.axes(ctx, box, [0, 5], [0, 30], { xl: 'mass of hydrogen (g)', xc: cm, yl: 'mass of carbon (g)', yc: cm, nx: 5, ny: 6 });
    F.plot(ctx, g, (x) => K * x, PAL.ink, { w: 3 });
    text(ctx, 'isooctane', g.X(4.74), g.Y(28), PAL.ink, { size: 22, align: 'right' });
    /* the slider's sample, with its two masses dropped to the axes */
    const x = g.X(h), y = g.Y(c);
    line(ctx, x, box.b, x, y, cm, 2, [4, 8]); line(ctx, box.l, y, x, y, cm, 2, [4, 8]);
    F.dot(ctx, x, y, cm, false, 15);
    text(ctx, fmt(c, 2) + ' g', box.l + 12, y - 16, cm, { size: 22, weight: 600 });
    text(ctx, fmt(h, 2) + ' g', x + 12, box.b - 18, cm, { size: 22, weight: 600 });
    hits = [{ x, y, r: 16, name: fmt(c + h, 2) + ' g of isooctane: ' + fmt(c, 2) + ' g of carbon, ' + fmt(h, 2) + ' g of hydrogen' }];
    /* the three samples of Table 2.1, each in its referent colour */
    for (const [s, sh, sc, id] of SAMPLES) {
      const col = F.ref(id), sx = g.X(sh), sy = g.Y(sc);
      F.dot(ctx, sx, sy, col, true, 8); text(ctx, s, sx - 20, sy - 22, col, { size: 22, weight: 600, align: 'center' });
      if (Math.abs(sh - h) > 0.005) hits.push({ x: sx, y: sy, r: 12, name: 'sample ' + s + ': ' + fmt(sc, 2) + ' g of carbon, ' + fmt(sh, 2) + ' g of hydrogen' });
    }
    const m = (v) => `\\htmlClass{kv-mass}{${v}\\ \\text{g}}`;
    tex(d.readout, `\\frac{${m(fmt(c, 2))}\\ \\text{carbon}}{${m(fmt(h, 2))}\\ \\text{hydrogen}}=\\frac{${m('5.33')}\\ \\text{carbon}}{${m('1.00')}\\ \\text{hydrogen}}`);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 2.5: the two copper chlorides, atom for atom. The mass of copper
   is a slider in steps of 0.20 g, and each step is one copper atom drawn
   in each compound: one chlorine atom on it in the green compound, two in
   the brown. Under each slab a bracket is the copper's mass and a bar the
   chlorine's, on one scale (88 units for 0.20 g). Still: no time in it.
   The powders' colours are the fact the text names, read off the photographs.
===================================================================== */
(function () {
  const d = sim('sim-copper-chlorides', 620);
  const M = ctl(d.controls, { label: '\\km_{\\text{Cu}}', cls: 'mass', min: 0.2, max: 1.6, step: 0.2, value: 1, unit: 'g', dec: 2, aria: 'mass of copper in each sample' });
  const GREEN = 0.558, POWDER = { green: '#8a9a3c', brown: '#a8562e' };
  const RC = 41, RL = 33, PITCH = 88, X0 = 284, PER_G = PITCH / 0.2;
  /* a chlorine mass to the digits it has: 0.558, 1.116, 0.1116 */
  const cl = (v) => v.toFixed(4).replace(/0$/, '');
  let hits = []; F.hover(d.stage, () => hits);
  function row(ctx, o) {
    const cm = C('mass'), n = o.n, yCu = o.y, cu = 0.2 * n, g = GREEN * cu * o.per;
    for (let i = 0; i < n; i++) {
      const x = X0 + PITCH * (i + 0.5);
      for (const yCl of o.per === 2 ? [yCu - RC - RL, yCu + RC + RL] : [yCu - RC - RL]) { atom(ctx, x, yCl, 'Cl', RL); hits.push({ x, y: yCl, r: RL, name: 'chlorine atom' }); }
      atom(ctx, x, yCu, 'Cu', RC); hits.push({ x, y: yCu, r: RC, name: 'copper atom' });
    }
    const bottom = yCu + RC + (o.per === 2 ? 2 * RL : 0);
    F.hbracket(ctx, X0, X0 + PITCH * n, bottom + 14, cm, fmt(cu, 2) + ' g Cu', { side: 'below', size: 20 });
    const by = bottom + 62, bw = g * PER_G;
    ctx.save(); ctx.fillStyle = alpha(cm, 0.35); ctx.fillRect(X0, by, bw, 26); ctx.strokeStyle = cm; ctx.lineWidth = 2; ctx.strokeRect(X0, by, bw, 26);
    if (o.per === 2) { ctx.beginPath(); ctx.moveTo(X0 + bw / 2, by); ctx.lineTo(X0 + bw / 2, by + 26); ctx.stroke(); }
    ctx.restore();
    text(ctx, cl(g) + ' g Cl', X0 + bw + 12, by + 13, cm, { size: 20, weight: 600 });
    hits.push({ x: X0 + bw / 2, y: by + 13, r: 16, name: cl(g) + ' g of chlorine' });
    /* the compound's name beside its slab, with the powder's own colour */
    const ny = (yCu - RC - 2 * RL + bottom) / 2;
    ctx.save(); ctx.fillStyle = F.fact(o.powder); ctx.fillRect(40, ny - 24, 22, 22); ctx.strokeStyle = alpha(PAL.ink, 0.4); ctx.lineWidth = 1; ctx.strokeRect(40, ny - 24, 22, 22); ctx.restore();
    text(ctx, o.name, 72, ny - 13, PAL.ink, { size: 22, weight: 600 });
    text(ctx, o.per + ' Cl per Cu', 72, ny + 17, PAL.muted, { size: 18 });
    return g;
  }
  function draw() {
    const { ctx } = begin(d.c);
    const n = Math.round(M.v / 0.2), cu = 0.2 * n; hits = [];
    const g = row(ctx, { n, y: 150, per: 1, name: 'green compound', powder: POWDER.green });
    const b = row(ctx, { n, y: 420, per: 2, name: 'brown compound', powder: POWDER.brown });
    F.legend(ctx, { l: 30, r: 1370, t: 14, b: 606 }, [{ s: 'copper atom', draw: (c, x, y) => atom(c, x, y, 'Cu', 11) }, { s: 'chlorine atom', draw: (c, x, y) => atom(c, x, y, 'Cl', 9) }], { corner: 'tr' });
    const cuT = `\\htmlClass{kv-mass}{${fmt(cu, 2)}\\ \\text{g}}\\ \\text{Cu}`, clT = (v) => `\\htmlClass{kv-mass}{${cl(v)}\\ \\text{g}}\\ \\text{Cl}`;
    tex(d.readout, `\\dfrac{\\dfrac{${clT(b)}}{${cuT}}}{\\dfrac{${clT(g)}}{${cuT}}}=\\dfrac{2}{1}`);
  }
  register(d.fig, { update: () => {}, draw });
})();
};
