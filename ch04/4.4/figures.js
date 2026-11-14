/* Figures for section 4.4 Reaction Yields. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['4.4'] = function (root, F) {
const { fmt, tex, C, PAL, alpha, ctl, cycle, register, begin, line, arrow, text, topline } = F;
const sim = (id, H) => F.sim(root, id, H);

/* ---------- small helpers shared by the figures ---------- */
const TAU = 2 * Math.PI;
/* n significant figures, never in exponent form */
const sig = (x, n) => { const s = Math.abs(x).toPrecision(n); return s.includes('e') ? String(Number(s)) : s; };
/* a live number wrapped in the hue of its type, for the readouts */
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;
const smooth = (u) => { const k = Math.min(1, Math.max(0, u)); return k * k * (3 - 2 * k); };
function rrect(ctx, x, y, w, h, r, fill, stroke, lw = 2, dash) {
  ctx.save(); ctx.beginPath(); ctx.roundRect(x, y, w, h, r);
  if (fill) { ctx.fillStyle = fill; ctx.fill(); }
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; if (dash) ctx.setLineDash(dash); ctx.stroke(); }
  ctx.restore();
}
/* an atom as a filled disc in its element's colour (rule 7); hydrogen, which is white, takes a full ink rim */
function atom(ctx, elm, x, y, r) {
  ctx.save(); ctx.fillStyle = F.el(elm); ctx.strokeStyle = elm === 'H' ? PAL.ink : alpha(PAL.ink, 0.45); ctx.lineWidth = elm === 'H' ? 1.8 : 1.2;
  ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore();
}
const plural = (n, one, many) => n + ' ' + (n === 1 ? one : many);

/* =====================================================================
   FIGURE 4.13: the grilled cheese sandwiches. Fifteen columns, each one
   sandwich's worth: two slices of bread over one slice of cheese, lying
   flat as the book draws them. Under a complete column stands the
   sandwich made of it; a column short of one ingredient shows a dashed
   empty place there and its slices again below, left over. Bread and
   cheese are the section's referents. Still: nothing here has a clock.
===================================================================== */
(function () {
  const d = sim('sim-sandwich', 372);
  const Bs = ctl(d.controls, { label: '\\text{slices of bread}', cls: '', key: 'bread', min: 2, max: 30, step: 2, value: 28, unit: '', dec: 0, aria: 'slices of bread provided',
    specials: [{ at: () => 2 * Ch.v, label: '2:1' }] });
  const Ch = ctl(d.controls, { label: '\\text{slices of cheese}', cls: '', key: 'cheese', min: 1, max: 15, step: 1, value: 11, unit: '', dec: 0, aria: 'slices of cheese provided',
    specials: [{ at: () => Bs.v / 2, label: '2:1' }] });
  let hits = []; F.hover(d.stage, () => hits);
  /* a slice lying flat, seen from above and in front: its top face a parallelogram, its edge below it */
  const X0 = 306, PITCH = 72, W = 54, SK = 14, DP = 20, TB = 8, TC = 5;
  function slab(ctx, x, y, c, thick, grow = 0) {
    const l = x - grow, r = x + W + grow;
    const top = [[l + SK, y], [r, y], [r - SK, y + DP], [l, y + DP]];
    const edge = [[l, y + DP], [r - SK, y + DP], [r, y], [r, y + thick], [r - SK, y + DP + thick], [l, y + DP + thick]];
    const path = (pts) => { ctx.beginPath(); pts.forEach(([px, py], i) => (i ? ctx.lineTo(px, py) : ctx.moveTo(px, py))); ctx.closePath(); };
    ctx.save(); ctx.lineJoin = 'round'; ctx.lineWidth = 2; ctx.strokeStyle = c;
    path(edge); ctx.fillStyle = F.mixColor(PAL.panel, c, 0.7); ctx.fill(); ctx.stroke();
    path(top); ctx.fillStyle = F.mixColor(PAL.panel, c, 0.32); ctx.fill(); ctx.stroke();
    ctx.restore();
  }
  /* the place of a slice that is not there */
  function gap(ctx, x, y) {
    ctx.save(); ctx.lineJoin = 'round'; ctx.lineWidth = 2; ctx.strokeStyle = PAL.muted; ctx.setLineDash([5, 5]);
    ctx.beginPath(); ctx.moveTo(x + SK, y); ctx.lineTo(x + W, y); ctx.lineTo(x + W - SK, y + DP); ctx.lineTo(x, y + DP); ctx.closePath(); ctx.stroke(); ctx.restore();
  }
  const two = (ctx, x, y) => { slab(ctx, x, y + TB + 1, F.ref('bread'), TB); slab(ctx, x, y, F.ref('bread'), TB); };
  const one = (ctx, x, y) => slab(ctx, x, y, F.ref('cheese'), TC, 2);
  function sandwich(ctx, x, y) { slab(ctx, x, y + TB + TC + 2, F.ref('bread'), TB); slab(ctx, x, y + TB + 1, F.ref('cheese'), TC, 5); slab(ctx, x, y, F.ref('bread'), TB); }
  const YB = 100, YC = 160, YM = 268;
  function draw() {
    const { ctx } = begin(d.c);
    const cb = F.ref('bread'), cc = F.ref('cheese');
    const nb = Bs.v, nc = Ch.v, pairs = nb / 2, s = Math.min(pairs, nc), lb = nb - 2 * s, lc = nc - s;
    const cx = (i) => X0 + i * PITCH + (PITCH - W) / 2, mid = (i) => cx(i) + W / 2;
    hits = [];
    for (let i = 0; i < Math.max(pairs, nc); i++) {
      if (i < pairs) { two(ctx, cx(i), YB); hits.push({ x: mid(i), y: YB + 18, r: 26, name: 'two slices of bread' }); }
      else { gap(ctx, cx(i), YB + TB + 1); gap(ctx, cx(i), YB); hits.push({ x: mid(i), y: YB + 18, r: 26, name: 'no bread for this slice of cheese' }); }
      if (i < nc) { one(ctx, cx(i), YC); hits.push({ x: mid(i), y: YC + 12, r: 22, name: 'one slice of cheese' }); }
      else { gap(ctx, cx(i), YC); hits.push({ x: mid(i), y: YC + 12, r: 22, name: 'no cheese for these two slices of bread' }); }
      if (i < s) { sandwich(ctx, cx(i), YM); hits.push({ x: mid(i), y: YM + 20, r: 28, name: 'a sandwich: two slices of bread and one slice of cheese' }); }
      else if (i < pairs) { two(ctx, cx(i), YM); hits.push({ x: mid(i), y: YM + 18, r: 26, name: 'two slices of bread left over' }); }
      else { one(ctx, cx(i), YM + 8); hits.push({ x: mid(i), y: YM + 20, r: 22, name: 'one slice of cheese left over' }); }
    }
    text(ctx, 'Provided with', 40, YB - 14, PAL.muted, { size: 18 });
    F.rich(ctx, [[String(nb), cb], ' slices of bread'], 40, YB + 22, { size: 21 });
    F.rich(ctx, [[String(nc), cc], nc === 1 ? ' slice of cheese' : ' slices of cheese'], 40, YC + 16, { size: 21 });
    arrow(ctx, 52, 204, 52, 236, PAL.muted, 3);
    text(ctx, 'We can make', 74, 228, PAL.muted, { size: 18 });
    F.rich(ctx, [[String(s), PAL.ink], s === 1 ? ' sandwich' : ' sandwiches'], 40, YM + 12, { size: 21 });
    if (lb) F.rich(ctx, [[String(lb), cb], ' slices of bread left over'], 40, YM + 42, { size: 21 });
    else if (lc) F.rich(ctx, [[String(lc), cc], lc === 1 ? ' slice of cheese left over' : ' slices of cheese left over'], 40, YM + 42, { size: 21 });
    else text(ctx, 'nothing left over', 40, YM + 42, PAL.ink, { size: 21 });
    F.rich(ctx, lb ? ['The ', ['cheese', cc], ' limits the number of sandwiches, and the ', ['bread', cb], ' is in excess.']
      : lc ? ['The ', ['bread', cb], ' limits the number of sandwiches, and the ', ['cheese', cc], ' is in excess.']
        : [['Bread', cb], ' and ', ['cheese', cc], ' are in the 2:1 ratio of the recipe, and nothing is left over.'], 700, 46, { size: 24, align: 'center' });
    const sw = (n) => `${n}\\ \\text{${n === 1 ? 'sandwich' : 'sandwiches'}}`;
    tex(d.readout, `${nb}\\ \\text{slices of bread} \\times \\frac{1\\ \\text{sandwich}}{2\\ \\text{slices of bread}} = ${sw(pairs)} \\\\ `
      + `${nc}\\ \\text{${nc === 1 ? 'slice' : 'slices'} of cheese} \\times \\frac{1\\ \\text{sandwich}}{1\\ \\text{slice of cheese}} = ${sw(nc)}`);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 4.14: hydrogen and chlorine before and after reaction. The left
   box holds the mixture as provided. The right box starts as the same
   mixture and reacts: each H2 and the Cl2 beside it move together, their
   four atoms regroup, and two HCl part, one pair after another, until one
   reactant has no partner left. Flat, every molecule in view (book rule,
   particle pictures). The count under the right box follows what is in it.
===================================================================== */
(function () {
  const d = sim('sim-hcl-limiting', 500);
  const reset = () => cy.reset();
  const Hn = ctl(d.controls, { label: '\\text{H}_2\\ \\text{molecules}', cls: '', key: 'h2', min: 1, max: 10, step: 1, value: 6, unit: '', dec: 0, aria: 'molecules of hydrogen',
    specials: [{ at: () => Cl.v, label: '1:1' }], onInput: reset });
  const Cl = ctl(d.controls, { label: '\\text{Cl}_2\\ \\text{molecules}', cls: '', key: 'cl2', min: 1, max: 10, step: 1, value: 4, unit: '', dec: 0, aria: 'molecules of chlorine',
    specials: [{ at: () => Hn.v, label: '1:1' }], onInput: reset });
  /* a short wait on the mixture, then one pair every LAG seconds, each taking DUR; the finished mixture is held */
  const LEAD = 0.7, LAG = 0.55, DUR = 1.8;
  const cy = cycle(() => LEAD + (Math.min(Hn.v, Cl.v) - 1) * LAG + DUR, 2.4);
  let hits = []; F.hover(d.stage, () => hits);
  const RH = 14, RCL = 22, DH = 8, DCL = 13;          /* radii, and each atom's distance from its molecule's centre */
  const PY = 104, PW = 500, PH = 340, LX = 40, RX = 860, CW = PW / 5, CH = PH / 4;
  /* the box as 5 by 4 places, tiled by ten pairs of neighbouring places: a reacting H2 and Cl2 start side by side */
  const DOM = [[[0, 0], [0, 1]], [[1, 0], [2, 0]], [[1, 1], [2, 1]], [[3, 0], [4, 0]], [[3, 1], [3, 2]], [[4, 1], [4, 2]], [[0, 2], [1, 2]], [[0, 3], [1, 3]], [[2, 2], [2, 3]], [[3, 3], [4, 3]]];
  const ORDER = [2, 6, 4, 9, 0, 3, 8, 5, 7, 1];
  const place = ([col, row]) => { const k = col + 5 * row; return { x: CW * (col + 0.5) + 11 * Math.sin(k * 12.9898 + 1), y: CH * (row + 0.5) + 6 * Math.sin(k * 78.233 + 2), th: 0.85 * Math.sin(k * 37.7 + 0.5), ph: TAU * ((k * 0.618034) % 1) }; };
  /* the molecules provided: pairs fill the tiling from the front, the reactant in excess from the back, one to a pair of places first */
  function mixture(h, c) {
    const used = Math.min(h, c), extra = Math.abs(h - c), kind = h > c ? 'H2' : 'Cl2', free = 10 - used;
    const pairs = [], rest = [];
    for (let i = 0; i < used; i++) { const D = DOM[ORDER[i]]; pairs.push({ H: place(D[i % 2]), C: place(D[1 - (i % 2)]) }); }
    for (let j = 0; j < extra; j++) rest.push({ kind, at: place(DOM[ORDER[9 - (j % free)]][j < free ? 0 : 1]) });
    return { pairs, rest };
  }
  const ends = (p, dist) => [[p.x - dist * Math.cos(p.th), p.y - dist * Math.sin(p.th)], [p.x + dist * Math.cos(p.th), p.y + dist * Math.sin(p.th)]];
  const mix = (a, b, k) => [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k];
  /* the four atoms of one pair at progress u: apart (0), together as a square of four (0.45 to 0.55), apart again as two HCl (1) */
  function pairAt(p, u) {
    const L = Math.hypot(p.C.x - p.H.x, p.C.y - p.H.y), e = [(p.C.x - p.H.x) / L, (p.C.y - p.H.y) / L], n = [-e[1], e[0]];
    const M = [(p.H.x + p.C.x) / 2, (p.H.y + p.C.y) / 2], at = (a, b) => [M[0] + e[0] * a + n[0] * b, M[1] + e[1] * a + n[1] * b];
    const side = (pts) => { const s = (q) => (q[0] - M[0]) * n[0] + (q[1] - M[1]) * n[1]; return s(pts[0]) >= s(pts[1]) ? pts : [pts[1], pts[0]]; };
    const h0 = side(ends(p.H, DH)), c0 = side(ends(p.C, DCL));
    const h1 = [at(-13, 9), at(-13, -9)], c1 = [at(10, 14), at(10, -14)];
    const out = (q) => ({ cl: [q.x - 6 * Math.cos(q.ph), q.y - 6 * Math.sin(q.ph)], h: [q.x + 17 * Math.cos(q.ph), q.y + 17 * Math.sin(q.ph)] });
    const a = out(p.H), b = out(p.C), h2 = [a.h, b.h], c2 = [a.cl, b.cl];
    const k1 = smooth(u / 0.45), k2 = smooth((u - 0.55) / 0.45);
    const go = (p0, p1, p2) => (u < 0.5 ? mix(p0, p1, k1) : mix(p1, p2, k2));
    return { H: [go(h0[0], h1[0], h2[0]), go(h0[1], h1[1], h2[1])], Cl: [go(c0[0], c1[0], c2[0]), go(c0[1], c1[1], c2[1])], M };
  }
  const NAME = { H2: 'a hydrogen molecule, H₂', Cl2: 'a chlorine molecule, Cl₂', HCl: 'a hydrogen chloride molecule, HCl' };
  /* one box: every chlorine atom first, then the smaller hydrogen atoms over them */
  function box(ctx, x, title, m, uOf) {
    rrect(ctx, x, PY, PW, PH, 6, alpha(PAL.soft, 0.6), PAL.rule, 1.5);
    text(ctx, title, x + PW / 2, PY - 16, PAL.ink, { size: 21, align: 'center' });
    const cl = [], hy = [];
    m.pairs.forEach((p, i) => {
      const u = uOf(i), q = pairAt(p, u); cl.push(...q.Cl); hy.push(...q.H);
      if (u <= 0) hits.push({ x: x + p.H.x, y: PY + p.H.y, r: 26, name: NAME.H2 }, { x: x + p.C.x, y: PY + p.C.y, r: 34, name: NAME.Cl2 });
      else if (u >= 1) hits.push({ x: x + p.H.x, y: PY + p.H.y, r: 32, name: NAME.HCl }, { x: x + p.C.x, y: PY + p.C.y, r: 32, name: NAME.HCl });
      else hits.push({ x: x + q.M[0], y: PY + q.M[1], r: 50, name: 'one H₂ and one Cl₂ becoming two HCl' });
    });
    m.rest.forEach((r) => {
      (r.kind === 'H2' ? hy : cl).push(...ends(r.at, r.kind === 'H2' ? DH : DCL));
      hits.push({ x: x + r.at.x, y: PY + r.at.y, r: r.kind === 'H2' ? 26 : 34, name: NAME[r.kind] + ', with no partner' });
    });
    cl.forEach(([ax, ay]) => atom(ctx, 'Cl', x + ax, PY + ay, RCL));
    hy.forEach(([ax, ay]) => atom(ctx, 'H', x + ax, PY + ay, RH));
  }
  const list = (parts) => { const p = parts.filter(([n]) => n > 0).map(([n, f]) => n + ' ' + f); return p.length > 2 ? p.slice(0, -1).join(', ') + ' and ' + p[p.length - 1] : p.join(' and '); };
  const sample = (ctx, f, x, y) => {
    const k = 0.55;
    if (f === 'H2') { atom(ctx, 'H', x - DH * k, y, RH * k); atom(ctx, 'H', x + DH * k, y, RH * k); }
    else if (f === 'Cl2') { atom(ctx, 'Cl', x - DCL * k, y, RCL * k); atom(ctx, 'Cl', x + DCL * k, y, RCL * k); }
    else { atom(ctx, 'Cl', x - 6 * k, y, RCL * k); atom(ctx, 'H', x + 17 * k, y, RH * k); }
  };
  function draw() {
    const { ctx } = begin(d.c);
    hits = [];
    const h = Hn.v, c = Cl.v, used = Math.min(h, c), t = cy.now(), m = mixture(h, c);
    const uOf = (i) => Math.min(1, Math.max(0, (t - LEAD - i * LAG) / DUR));
    let made = 0; for (let i = 0; i < used; i++) if (uOf(i) >= 0.5) made++;
    const done = uOf(used - 1) >= 1;
    box(ctx, LX, 'Before reaction', m, () => 0);
    box(ctx, RX, done ? 'After reaction' : 'Reacting', m, uOf);
    arrow(ctx, LX + PW + 40, PY + 230, RX - 40, PY + 230, PAL.ink, 4);
    F.legend(ctx, { l: LX + PW, r: RX, t: PY, b: PY + PH }, [['H2', 'hydrogen, H₂'], ['Cl2', 'chlorine, Cl₂'], ['HCl', 'hydrogen chloride, HCl']].map(([f, s]) => ({ s, draw: (g, x, y) => sample(g, f, x, y) })), { corner: 'top', panel: false });
    text(ctx, list([[h, 'H₂'], [c, 'Cl₂']]), LX + PW / 2, PY + PH + 38, PAL.ink, { size: 24, weight: 600, align: 'center' });
    text(ctx, list([[2 * made, 'HCl'], [h - made, 'H₂'], [c - made, 'Cl₂']]), RX + PW / 2, PY + PH + 38, PAL.ink, { size: 24, weight: 600, align: 'center' });
    topline(ctx, h > c ? 'Chlorine is the limiting reactant, and hydrogen is in excess.' : c > h ? 'Hydrogen is the limiting reactant, and chlorine is in excess.'
      : 'The reactants are in the 1:1 stoichiometric ratio, and neither is left over.');
    tex(d.readout, `${h}\\ \\text{H}_2 \\times \\frac{2\\ \\text{HCl}}{1\\ \\text{H}_2} = ${2 * h}\\ \\text{HCl} \\\\ ${c}\\ \\text{Cl}_2 \\times \\frac{2\\ \\text{HCl}}{1\\ \\text{Cl}_2} = ${2 * c}\\ \\text{HCl}`);
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();

/* =====================================================================
   SIM: Example 4.12 as a live route. Each reactant's mass is carried
   through its molar mass to moles and through the balanced equation to
   the silicon nitride it could give on its own; the bars compare the two,
   the lesser one filled. The readout sets the provided mole ratio against
   the stoichiometric one, the example's other method. Masses in the mass
   hue, moles in the amount hue. Still.
===================================================================== */
(function () {
  const d = sim('sim-silicon-nitride', 430);
  const MSI = 28.09, MN2 = 28.02;
  const mSi = ctl(d.controls, { label: '\\km_{\\text{Si}}', cls: 'mass', key: 'm-si', min: 0.5, max: 4, step: 0.01, value: 2, unit: 'g', dec: 2, aria: 'mass of silicon in grams' });
  const mN = ctl(d.controls, { label: '\\km_{\\text{N}_2}', cls: 'mass', key: 'm-n2', min: 0.5, max: 3, step: 0.01, value: 1.5, unit: 'g', dec: 2, aria: 'mass of nitrogen in grams',
    specials: [{ at: () => { const v = ((mSi.v / MSI) * 2 / 3) * MN2; return v >= 0.5 && v <= 3 ? Math.round(v * 100) / 100 : null; }, label: 'stoichiometric' }] });
  let hits = []; F.hover(d.stage, () => hits);
  /* the product axis runs 0 to 0.06 mol, past the most either slider can give (4.00 g Si gives 0.0475 mol, 3.00 g N2 0.0535 mol) */
  const BX = 880, BW = 440, PMAX = 0.06, PX = (n) => BX + (n / PMAX) * BW;
  function box(ctx, x, y, w, s, type) { const c = C(type); rrect(ctx, x, y - 26, w, 52, 6, alpha(c, 0.12), c, 2.5); text(ctx, s, x + w / 2, y, c, { size: 21, weight: 600, align: 'center', base: 'middle' }); }
  function step(ctx, x1, x2, y, s) { arrow(ctx, x1, y, x2, y, PAL.muted, 3); text(ctx, s, (x1 + x2) / 2 - 6, y - 16, PAL.muted, { size: 17, align: 'center' }); }
  function draw() {
    const { ctx } = begin(d.c);
    const cn = C('amount');
    const nSi = mSi.v / MSI, nN = mN.v / MN2, pSi = nSi / 3, pN = nN / 2, ratio = nSi / nN;
    /* the two are called stoichiometric when the ratio reads 1.50, so the words agree with the number shown */
    const eq = sig(ratio, 3) === '1.50', siLim = !eq && ratio < 1.5;
    const rows = [
      { y: 150, m: fmt(mSi.v, 2) + ' g Si', n: sig(nSi, 3) + ' mol Si', mm: '÷ 28.09 g/mol', f: '× 1 mol Si₃N₄ / 3 mol Si', p: pSi, name: 'silicon', lim: eq || siLim },
      { y: 290, m: fmt(mN.v, 2) + ' g N₂', n: sig(nN, 3) + ' mol N₂', mm: '÷ 28.02 g/mol', f: '× 1 mol Si₃N₄ / 2 mol N₂', p: pN, name: 'nitrogen', lim: eq || !siLim },
    ];
    const lesser = Math.min(pSi, pN);
    hits = [];
    F.axes(ctx, { l: BX, r: BX + BW, t: 104, b: 340 }, [0, PMAX], [0, 1], { xl: 'mol Si₃N₄ each reactant could give', xc: cn, nx: 3, ny: 0, fx: (v) => fmt(v, 2), fy: () => '' });
    rows.forEach((r) => {
      box(ctx, 30, r.y, 170, r.m, 'mass');
      step(ctx, 208, 362, r.y, r.mm);
      box(ctx, 370, r.y, 200, r.n, 'amount');
      step(ctx, 578, BX - 14, r.y, r.f);
      rrect(ctx, BX, r.y - 22, PX(r.p) - BX, 44, 4, r.lim ? alpha(cn, 0.55) : alpha(cn, 0.12), cn, 2.5, r.lim ? null : [8, 6]);
      F.rich(ctx, [[sig(r.p, 3) + ' mol Si₃N₄', cn], ' from the ' + r.name], BX + 8, r.y - 40, { size: 20 });
      text(ctx, eq ? 'used up' : r.lim ? 'limiting reactant' : 'excess reactant', 30, r.y + 48, PAL.ink, { size: 19, weight: r.lim && !eq ? 600 : 400 });
      hits.push({ x: (BX + PX(r.p)) / 2, y: r.y, r: 24, name: 'the Si₃N₄ that all of the ' + r.name + ' could give' });
    });
    /* the amount that can form, a level across both bars */
    line(ctx, PX(lesser), 122, PX(lesser), 322, PAL.ink, 2, [4, 8]);
    hits.unshift({ x: PX(lesser), y: 220, r: 26, name: 'the Si₃N₄ that can form: ' + sig(lesser, 3) + ' mol' });
    topline(ctx, eq ? 'Silicon and nitrogen are in the stoichiometric ratio, so neither is in excess.'
      : (siLim ? 'Silicon' : 'Nitrogen') + ' would give less Si₃N₄, so ' + (siLim ? 'silicon' : 'nitrogen') + ' is the limiting reactant and ' + sig(lesser, 3) + ' mol of Si₃N₄ can form.');
    const am = (s, u) => `${hue('amount', s)}\\ \\text{mol ${u}}`;
    tex(d.readout, `\\frac{\\kn_{\\text{Si}}}{\\kn_{\\text{N}_2}} = \\frac{${am(sig(nSi, 3), 'Si')}}{${am(sig(nN, 3), 'N}_2\\text{')}} = \\frac{${am(sig(ratio, 3), 'Si')}}{${am('1', 'N}_2\\text{')}} ${eq ? '=' : ratio < 1.5 ? '<' : '>'} \\frac{${am('1.5', 'Si')}}{${am('1', 'N}_2\\text{')}}`);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   SIM: percent yield of copper, Example 4.13. The route from grams of
   copper sulfate to grams of copper gives the theoretical yield, a dashed
   outline; the copper collected fills it. Masses in the mass hue, moles in
   the amount hue, the percent in ink. Still.
===================================================================== */
(function () {
  const d = sim('sim-percent-yield', 372);
  const MCUSO4 = 159.62, MCU = 63.55;
  const theoOf = (m) => (m / MCUSO4) * MCU;
  const mS = ctl(d.controls, { label: '\\km_{\\text{CuSO}_4}', cls: 'mass', key: 'm-cuso4', min: 0.5, max: 2.5, step: 0.001, value: 1.274, unit: 'g', dec: 3, aria: 'mass of copper sulfate in grams' });
  const mA = ctl(d.controls, { label: '\\km_{\\text{Cu, actual}}', cls: 'mass', key: 'm-cu', min: 0, max: 1, step: 0.001, value: 0.392, unit: 'g', dec: 3, aria: 'mass of copper obtained in grams',
    specials: [{ at: () => { const t = theoOf(mS.v); return t <= 1 ? t : null; }, label: 'theoretical yield' }] });
  let hits = []; F.hover(d.stage, () => hits);
  /* the mass axis runs 0 to 1.0 g, past the 0.995 g that 2.5 g of copper sulfate can give */
  const AX = 180, AW = 1000, X = (g) => AX + g * AW;
  function box(ctx, x, y, w, s, type) { const c = C(type); rrect(ctx, x, y - 26, w, 52, 6, alpha(c, 0.12), c, 2.5); text(ctx, s, x + w / 2, y, c, { size: 20, weight: 600, align: 'center', base: 'middle' }); }
  function step(ctx, x1, x2, y, s) { arrow(ctx, x1, y, x2, y, PAL.muted, 3); text(ctx, s, (x1 + x2) / 2 - 6, y - 16, PAL.muted, { size: 17, align: 'center' }); }
  function draw() {
    const { ctx } = begin(d.c);
    const cm = C('mass');
    const theo = theoOf(mS.v), n = mS.v / MCUSO4;
    if (mA.v > theo) mA.set(theo);
    const act = mA.v, pct = theo > 0 ? (act / theo) * 100 : 0;
    /* the route to the theoretical yield */
    const y = 76;
    box(ctx, 20, y, 176, fmt(mS.v, 3) + ' g CuSO₄', 'mass');
    step(ctx, 204, 352, y, '÷ 159.62 g/mol');
    box(ctx, 360, y, 222, sig(n, 4) + ' mol CuSO₄', 'amount');
    step(ctx, 590, 842, y, '× 1 mol Cu / 1 mol CuSO₄');
    box(ctx, 850, y, 190, sig(n, 4) + ' mol Cu', 'amount');
    step(ctx, 1048, 1202, y, '× 63.55 g/mol');
    box(ctx, 1210, y, 160, sig(theo, 4) + ' g Cu', 'mass');
    /* the theoretical yield as an outline, the actual yield filling it */
    const by = 186, bh = 64;
    F.axes(ctx, { l: AX, r: AX + AW, t: 166, b: 300 }, [0, 1], [0, 1], { xl: 'mass of copper (g)', xc: cm, nx: 5, ny: 0, fx: (v) => fmt(v, 1), fy: () => '' });
    rrect(ctx, X(0), by, X(act) - X(0), bh, 4, alpha(cm, 0.5), null);
    rrect(ctx, X(0), by, X(theo) - X(0), bh, 4, null, cm, 3, [10, 8]);
    F.rich(ctx, ['theoretical yield ', [sig(theo, 4) + ' g', cm]], Math.min(X(theo), 1090), by - 14, { size: 20, align: 'center' });
    if (act > 0) F.rich(ctx, ['actual yield ', [fmt(act, 3) + ' g', cm]], Math.max(X(act), X(0) + 96), by + bh + 28, { size: 20, align: 'center' });
    text(ctx, fmt(pct, 1) + '%', X(theo) + 18, by + bh / 2, PAL.ink, { size: 24, weight: 600, base: 'middle' });
    hits = [{ x: (X(0) + X(act)) / 2, y: by + bh / 2, r: 32, name: 'the copper collected, the actual yield' },
      { x: (X(act) + X(theo)) / 2, y: by + bh / 2, r: 32, name: 'copper the reaction could have given but that was not collected' }];
    const g = (s) => `${hue('mass', s)}\\ \\text{g Cu}`;
    tex(d.readout, `\\text{percent yield} = \\frac{\\text{actual yield}}{\\text{theoretical yield}} \\times 100\\% = \\frac{${g(fmt(act, 3))}}{${g(sig(theo, 4))}} \\times 100\\% = ${fmt(pct, 1)}\\%`);
  }
  register(d.fig, { update: () => {}, draw });
})();
};
