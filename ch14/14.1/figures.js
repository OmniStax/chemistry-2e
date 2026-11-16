/* Figures for section 14.1 Brønsted-Lowry Acids and Bases. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['14.1'] = function (root, F) {
const { C, PAL, alpha, ctl, register, begin, line, text, headline } = F;
const sim = (id, H) => F.sim(root, id, H);
const still = (d, draw) => register(d.fig, { update: () => {}, draw });
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;
const RAD = Math.PI / 180;

/* =====================================================================
   One proton passing from an acid to a base and back, drawn as Lewis
   structures: the two species stay where they are and become their
   conjugates in place, so each conjugate pair is one thing before and
   after. The pair the proton leaves keeps the bonding electrons as a
   new lone pair; the lone pair of the base that faces the proton
   becomes the new bond. Beneath, the book's equation in its own order,
   each acid joined to its conjugate base by a bracket as the book's
   first image joins them; the side present now is at full strength and
   the half of the equilibrium arrow now running is the dark one.
   The clock is schematic (a real transfer takes about a picosecond).
===================================================================== */
const L = 140, TRAVEL = 270, SZ = 52, CY = 276, RING = 110, RH = 76;
const smooth = F.ease.smooth, ramp = (k, a, b) => smooth(Math.min(1, Math.max(0, (k - a) / (b - a))));
function atom(ctx, s, x, y, c, size = SZ) { text(ctx, s, x, y + 1, c, { size, weight: 600, align: 'center' }); }
function bond(ctx, x1, y1, x2, y2, c, order = 1, GAP = 34) {
  const dx = x2 - x1, dy = y2 - y1, D = Math.hypot(dx, dy), ux = dx / D, uy = dy / D;
  (order === 2 ? [-7, 7] : [0]).forEach((o) => line(ctx, x1 + ux * GAP - uy * o, y1 + uy * GAP + ux * o, x2 - ux * GAP - uy * o, y2 - uy * GAP + ux * o, c, 4));
}
function lone(ctx, x, y, ang, c) {
  const cx = Math.cos(ang * RAD), cy = -Math.sin(ang * RAD), r = 44;
  [-10, 10].forEach((o) => F.dot(ctx, x + cx * r - cy * o, y + cy * r + cx * o, c, true, 5.5));
}
/* square brackets round an ion, its charge at the top right */
function brackets(ctx, x1, x2, y1, y2, q) {
  [[x1, 1], [x2, -1]].forEach(([x, s]) => {
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3.5; ctx.beginPath();
    ctx.moveTo(x + s * 14, y1); ctx.lineTo(x, y1); ctx.lineTo(x, y2); ctx.lineTo(x + s * 14, y2); ctx.stroke(); ctx.restore();
  });
  text(ctx, q, x2 + 12, y1 + 4, PAL.ink, { size: 36, weight: 600 });
}
/* the acids: the atom X that holds the proton, what else is on it, and the box of its ion.
   The proton always leaves to the right, toward the base. */
const ACID = {
  water: { X: 'O', H: [[0, -1]], lp: [180, 270], box: [-72, 72, -L - 38, 70], br: true, w: [-66, 66] },
  hf: { X: 'F', H: [], lp: [90, 180, 270], box: [-72, 72, -72, 70], br: false, w: [-66, 66] },
};
/* the bases: the atom Y whose lone pair faces the proton; box is the ion's, w the molecule's reach right of Y */
const BASE = {
  ammonia: { Y: 'N', H: [[0, -1], [1, 0], [0, 1]], lp: [], box: [-L - 40, L + 40, -L - 38, L + 38], mid: 0, w: L + 40 },
  water: { Y: 'O', H: [[0, -1], [1, 0]], lp: [270], box: [-L - 40, L + 40, -L - 38, 70], mid: 0, w: L + 40 },
  pyridine: { Y: 'N', ring: true, lp: [], box: [-L - 40, 2 * RING + RH + 56, -(RING + RH + 14) * 0.866 - 36, (RING + RH + 14) * 0.866 + 36], mid: RING, w: 2 * RING + RH + 56 },
};
function ring(ctx, xN, c) {
  const cx = xN + RING, v = [180, 120, 60, 0, -60, -120].map((a) => [cx + RING * Math.cos(a * RAD), CY - RING * Math.sin(a * RAD), a]);
  /* the book's Kekulé structure: N=C, C–C, C=C, C–C, C=C, C–N round the ring from N upward */
  v.forEach((p, i) => { const q = v[(i + 1) % 6]; bond(ctx, p[0], p[1], q[0], q[1], c, i % 2 ? 1 : 2, 30); });
  v.forEach((p, i) => {
    atom(ctx, i ? 'C' : 'N', p[0], p[1], c, i ? 46 : SZ);
    if (!i) return;
    const hx = cx + (RING + RH + 14) * Math.cos(p[2] * RAD), hy = CY - (RING + RH + 14) * Math.sin(p[2] * RAD);
    bond(ctx, p[0], p[1], hx, hy, c, 1, 30); atom(ctx, 'H', hx, hy, c, 46);
  });
}
/* the scene at progress k (0 the reactants, 1 the products); returns the hover names */
function transfer(ctx, R, k, A, B, eqY) {
  const ac = ACID[R.acid], ba = BASE[R.base];
  /* the scene and its names stand midway between the headline and the equation */
  const dy = (70 + eqY - 44) / 2 - (CY + (Math.min(ac.box[2], ba.box[2]) + Math.max(ac.box[3], ba.box[3]) + 58) / 2);
  ctx.save(); ctx.translate(0, dy);
  const span = -ac.w[0] + 2 * L + TRAVEL + ba.w, xA = 700 - span / 2 - ac.w[0], xB = xA + 2 * L + TRAVEL;
  const xH = xA + L + k * TRAVEL;
  const leave = 1 - ramp(k, 0.06, 0.42), left = ramp(k, 0.2, 0.5), facing = 1 - ramp(k, 0.5, 0.8), join = ramp(k, 0.58, 0.94), ion = ramp(k, 0.86, 1);
  /* the acid and what it becomes */
  ac.H.forEach(([dx, dy]) => { bond(ctx, xA, CY, xA + dx * L, CY + dy * L, A); atom(ctx, 'H', xA + dx * L, CY + dy * L, A); });
  ac.lp.forEach((a) => lone(ctx, xA, CY, a, A));
  atom(ctx, ac.X, xA, CY, A);
  F.faded(ctx, leave, [0, 0], () => bond(ctx, xA, CY, xH, CY, A));
  F.faded(ctx, left, [0, 0], () => lone(ctx, xA, CY, 0, A));
  F.faded(ctx, ion, [0, 0], () => (ac.br ? brackets(ctx, xA + ac.box[0], xA + ac.box[1], CY + ac.box[2], CY + ac.box[3], '−') : text(ctx, '−', xA + 52, CY - 56, PAL.ink, { size: 36, weight: 600 })));
  /* the base and what it becomes */
  if (ba.ring) ring(ctx, xB, B);
  else {
    ba.H.forEach(([dx, dy]) => { bond(ctx, xB, CY, xB + dx * L, CY + dy * L, B); atom(ctx, 'H', xB + dx * L, CY + dy * L, B); });
    atom(ctx, ba.Y, xB, CY, B);
  }
  ba.lp.forEach((a) => lone(ctx, xB, CY, a, B));
  F.faded(ctx, facing, [0, 0], () => lone(ctx, xB, CY, 180, B));
  F.faded(ctx, join, [0, 0], () => bond(ctx, xH, CY, xB, CY, A));
  F.faded(ctx, ion, [0, 0], () => brackets(ctx, xB + ba.box[0], xB + ba.box[1], CY + ba.box[2], CY + ba.box[3], '+'));
  /* the proton, in the acid's colour as the book draws it on the conjugate acid; H⁺ while it is bonded to neither */
  atom(ctx, 'H', xH, CY, A);
  F.faded(ctx, Math.min(1 - leave, 1 - join), [0, 0], () => text(ctx, '+', xH + 24, CY - 24, A, { size: 32, weight: 600 }));
  /* the names, as the text gives them, each under its species */
  const after = ramp(k, 0.4, 0.6), xb = xB + ba.mid;
  const name = (s, x, y, c, a) => F.faded(ctx, a, [0, 0], () => text(ctx, s, x, CY + y + 40, c, { size: 28, weight: 600, align: 'center' }));
  name(R.names[0], xA, ac.box[3], A, 1 - after); name(R.names[2], xA, ac.box[3], A, after);
  name(R.names[1], xb, ba.box[3], B, 1 - after); name(R.names[3], xb, ba.box[3], B, after);
  ctx.restore();
  return [
    { x: xH, y: CY, r: 36, name: k < 0.06 ? `the hydrogen ${R.names[0]} gives up` : k > 0.94 ? `the hydrogen that came from ${R.names[0]}` : 'the proton, H⁺' },
    ...(k < 0.5 ? [{ x: xB - 44, y: CY, r: 24, name: 'the lone pair that takes the proton' }] : []),
    ...(k > 0.5 ? [{ x: xA + 44, y: CY, r: 24, name: 'the pair of electrons the proton left behind' }] : []),
    { x: xA, y: CY, r: 36, name: k < 0.5 ? R.names[0] : R.names[2] }, { x: xb, y: CY, r: ba.ring ? RING : 36, name: k < 0.5 ? R.names[1] : R.names[3] },
  ].map((h) => ({ ...h, y: h.y + dy }));
}
/* the book's equation: formulas and roles in their pair's colours, the two conjugate pairs bracketed
   beneath. order: the pair (acid's or base's) of each of the four species, left to right. */
function equation(ctx, R, k, fwd, A, B, y) {
  const X = [300, 520, 880, 1100], col = (p) => (p === 'a' ? A : B), back = R.back ?? 1;
  const item = (i) => { text(ctx, R.eq[i], X[i], y, col(R.order[i]), { size: 32, weight: 600, align: 'center' }); text(ctx, R.roles[i], X[i], y + 44, col(R.order[i]), { size: 24, align: 'center' }); };
  const here = 0.4 + 0.6 * (1 - k), there = 0.4 + 0.6 * k;
  F.faded(ctx, here, [0, 0], () => { item(0); item(1); text(ctx, '+', 410, y, PAL.ink, { size: 32, align: 'center' }); });
  F.faded(ctx, there, [0, 0], () => { item(2); item(3); text(ctx, '+', 990, y, PAL.ink, { size: 32, align: 'center' }); });
  /* the equilibrium arrow: two half arrows, the reverse one longer where the book prints it so */
  const m = 700, hb = 66, hf = hb / back, ink = PAL.ink;
  F.faded(ctx, fwd ? 1 : 0.35, [0, 0], () => { line(ctx, m - hf, y - 7, m + hf, y - 7, ink, 3.5); line(ctx, m + hf, y - 7, m + hf - 17, y - 18, ink, 3.5); });
  F.faded(ctx, fwd ? 0.35 : 1, [0, 0], () => { line(ctx, m - hb, y + 7, m + hb, y + 7, ink, 3.5); line(ctx, m - hb, y + 7, m - hb + 17, y + 18, ink, 3.5); });
  /* each acid joined to its conjugate base: the pair that ends nearer is the shallower bracket */
  const ia = [0, 2 + R.order.slice(2).indexOf('a')], ib = [1, 2 + R.order.slice(2).indexOf('b')];
  const deepA = ia[1] > ib[1];
  [[ia, A, deepA], [ib, B, !deepA]].forEach(([[i, j], c, deep]) => {
    const yb = y + (deep ? 112 : 88);
    ctx.save(); ctx.strokeStyle = c; ctx.lineWidth = 3; ctx.lineJoin = 'miter'; ctx.beginPath();
    ctx.moveTo(X[i], y + 64); ctx.lineTo(X[i], yb); ctx.lineTo(X[j], yb); ctx.lineTo(X[j], y + 64); ctx.stroke(); ctx.restore();
  });
}
/* the clock: rest, the proton crosses, rest, it crosses back, rest */
const clock = (t, s) => ({
  k: t < s[0] ? 0 : t < s[1] ? smooth((t - s[0]) / (s[1] - s[0])) : t < s[2] ? 1 : t < s[3] ? 1 - smooth((t - s[2]) / (s[3] - s[2])) : 0,
  fwd: t < s[1] || t >= s[3],
});
const half = (a, b, c, d) => `\\mathrm{${a}} \\rightleftharpoons \\mathrm{${b}} + \\mathrm{H^{+}} \\\\ \\mathrm{${c}} + \\mathrm{H^{+}} \\rightleftharpoons \\mathrm{${d}}`;
const RX = {
  ammonia: { acid: 'water', base: 'ammonia', names: ['water', 'ammonia', 'hydroxide ion', 'ammonium ion'],
    eq: ['H_{2}O(l)', 'NH_{3}(aq)', 'OH⁻(aq)', 'NH_{4}⁺(aq)'], order: ['a', 'b', 'a', 'b'], roles: ['Acid', 'Base', 'Conjugate base', 'Conjugate acid'],
    say: ['Water gives a proton to ammonia.', 'Ammonium ion gives the proton back to hydroxide ion.'],
    tex: half('H_{2}O', 'OH^{-}', 'NH_{3}', 'NH_{4}{}^{+}') },
  hf: { acid: 'hf', base: 'water', names: ['hydrogen fluoride', 'water', 'fluoride ion', 'hydronium ion'],
    eq: ['HF', 'H_{2}O', 'H_{3}O⁺', 'F⁻'], order: ['a', 'b', 'b', 'a'], roles: ['Acid', 'Base', 'Acid', 'Base'],
    say: ['Hydrogen fluoride gives a proton to water.', 'Hydronium ion gives the proton back to fluoride ion.'],
    tex: half('HF', 'F^{-}', 'H_{2}O', 'H_{3}O^{+}') },
  pyridine: { acid: 'water', base: 'pyridine', names: ['water', 'pyridine', 'hydroxide ion', 'pyridinium ion'],
    eq: ['H_{2}O', 'C_{5}NH_{5}', 'C_{5}NH_{6}⁺', 'OH⁻'], order: ['a', 'b', 'b', 'a'], roles: ['Acid', 'Base', 'Acid', 'Base'],
    say: ['Water gives a proton to pyridine.', 'Pyridinium ion gives the proton back to hydroxide ion.'],
    tex: half('H_{2}O', 'OH^{-}', 'C_{5}NH_{5}', 'C_{5}NH_{6}{}^{+}') },
  water: { acid: 'water', base: 'water', names: ['water', 'water', 'hydroxide ion', 'hydronium ion'], back: 1.6,
    eq: ['H_{2}O', 'H_{2}O', 'H_{3}O⁺', 'OH⁻'], order: ['a', 'b', 'b', 'a'], roles: ['Acid', 'Base', 'Acid', 'Base'],
    say: ['One water molecule gives a proton to another.', 'Hydronium ion gives the proton back to hydroxide ion.'],
    tex: half('H_{2}O', 'OH^{-}', 'H_{2}O', 'H_{3}O^{+}') },
};

/* =====================================================================
   SIM: the proton transfer in the three reactions the section writes
   between two different species, the book's conjugate_img, HF_img and
   NH3_img. Water is the acid toward ammonia and pyridine and the base
   toward hydrogen fluoride.
===================================================================== */
(function () {
  const H = 744, d = sim('fig-water-ammonia', H), T = 7, STOPS = [0.9, 2.6, 4.1, 5.8];
  const cy = F.cycle(() => T, 0.4);
  const pick = F.choice(d.controls, { label: '\\text{reaction}', aria: 'the acid and the base that react', value: 'ammonia',
    options: [{ value: 'ammonia', label: 'H₂O + NH₃' }, { value: 'hf', label: 'HF + H₂O' }, { value: 'pyridine', label: 'H₂O + C₅NH₅' }], ms: 0,
    onInput: () => cy.reset() });
  let hits = [];
  F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c), R = RX[pick.value], s = clock(cy.now(), STOPS), A = F.ref('pair-acid'), B = F.ref('pair-base');
    headline(ctx, R.say[s.fwd ? 0 : 1]);
    hits = transfer(ctx, R, s.k, A, B, 610);
    equation(ctx, R, s.k, s.fwd, A, B, 610);
    F.tex(d.readout, R.tex);
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw, arrive: false });
})();

/* =====================================================================
   H2O + H2O ⇌ H3O+ + OH-, the book's Water_img, with the proton moving.
   The reverse half of the arrow is the longer, as printed, and the ions
   last a shorter time here than the molecules. The image puts the
   hydroxide's minus on its hydrogen; it is drawn on the bracket.
===================================================================== */
(function () {
  const H = 620, d = sim('fig-water-water', H), T = 7, STOPS = [1.6, 3.2, 3.9, 5.5];
  const cy = F.cycle(() => T, 0.4);
  let hits = [];
  F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c), R = RX.water, s = clock(cy.now(), STOPS), A = F.ref('water-acid'), B = F.ref('water-base');
    headline(ctx, R.say[s.fwd ? 0 : 1]);
    hits = transfer(ctx, R, s.k, A, B, 486);
    equation(ctx, R, s.k, s.fwd, A, B, 486);
    F.tex(d.readout, R.tex);
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw, arrive: false });
})();

/* =====================================================================
   SIM: Kw = [H3O+][OH-]. On logarithmic axes, log[OH-] = log Kw -
   log[H3O+], a line of slope -1 that the temperature lifts. Axes fixed
   at 1e-14 to 1 M both ways, so for the slider's 1e-12 to 1e-2 M the
   point stays in the box at every temperature (at 100 °C, [OH-] reaches
   10^-0.25 M). Kw only at the book's five temperatures: 25 and 100 °C
   from the text, 80 °C from the Check Your Learning, 40 and 60 °C from
   exercise 14; nothing is interpolated between them. The dashed circle
   is pure water, log sqrt(Kw). Still: the relation answers its controls.
===================================================================== */
(function () {
  const H = 520, d = sim('sim-kw', H);
  const KW = { 25: 1.0e-14, 40: 2.9e-14, 60: 9.3e-14, 80: 2.4e-13, 100: 5.6e-13 };
  const LOG = Object.fromEntries(Object.entries(KW).map(([t, k]) => [t, Math.log10(k)]));
  const ro = F.readout(d);
  const G = { l: 210, r: 1250, t: 112, b: 420 };
  const SUP = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
  const sup = (n) => String(n).split('').map((c) => SUP[c]).join('');
  const parts = (v) => { let e = Math.floor(Math.log10(v)), m = +(v / 10 ** e).toFixed(1); if (m >= 10) { m = 1; e += 1; } return [m, e]; };
  const round2 = (v) => { const [m, e] = parts(v); return m * 10 ** e; };
  const sciTxt = (v) => { const [m, e] = parts(v); return `${m.toFixed(1)} × 10${sup(e)}`; };
  const sciTex = (v) => { const [m, e] = parts(v); return `${m.toFixed(1)}\\times 10^{${e}}`; };
  const big = (r) => (r >= 1e4 ? sciTxt(r) : r >= 100 ? String(Math.round(r / 10 ** (Math.floor(Math.log10(r)) - 1)) * 10 ** (Math.floor(Math.log10(r)) - 1)) : r >= 10 ? String(Math.round(r)) : r.toFixed(1));
  const T = F.choice(d.controls, { label: '\\kT', key: 'T', aria: 'the temperature of the water', value: '25',
    options: Object.keys(KW).map((t) => ({ value: t, label: `${t} °C` })),
    onInput: (t) => { if (onWater) h.set(LOG[t] / 2); h.refresh(); draw(); } });
  const h = ctl(d.controls, { label: '\\kconcHyd', cls: 'concentration', key: 'logH', min: -12, max: -2, step: 0.01, value: -7, fmt: (lg) => `${sciTxt(10 ** lg)} M`,
    aria: 'the hydronium ion concentration',
    detents: [{ v: Math.log10(2.0e-6), label: '2.0 × 10⁻⁶ M' }],
    specials: [{ at: () => LOG[T.value] / 2, label: 'pure water' }], onInput: () => draw() });
  let onWater = true, hits = [];
  F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c);
    const t = T.value, K = KW[t], L = T.mix((v) => LOG[v]);
    onWater = Math.abs(h.v - LOG[t] / 2) < 0.006;
    const x = onWater ? LOG[t] / 2 : h.v;
    const cc = C('concentration'), ck = C('equilibrium-constant');
    const g = F.axes(ctx, G, [-14, 0], [-14, 0], { nx: 14, ny: 14, fx: (v) => (Math.round(v) % 2 ? '' : '10' + sup(Math.round(v))), fy: (v) => (Math.round(v) % 2 ? '' : '10' + sup(Math.round(v))),
      xl: '[H_{3}O⁺] (M)', xc: cc, yl: '[OH⁻] (M)', yc: cc });
    const seg = (lk) => [Math.max(-14, lk), Math.min(0, lk + 14)];
    line(ctx, g.X(-14), g.Y(-14), g.X(0), g.Y(0), alpha(PAL.ink, 0.35), 2.5, [10, 10]);
    text(ctx, '[OH⁻] = [H_{3}O⁺]', g.X(-3.6) + 14, g.Y(-3.6) + 8, PAL.muted, { size: 17, base: 'top' });
    const warm = t !== '25' || T.k < 1;
    if (warm) {
      const [a, b] = seg(LOG[25]);
      F.faded(ctx, t !== '25' ? 1 : 1 - T.k, [0, 0], () => line(ctx, g.X(a), g.Y(LOG[25] - a), g.X(b), g.Y(LOG[25] - b), alpha(ck, 0.45), 3, [10, 10]));
      F.legend(ctx, G, [{ s: `K_{w} at ${t} °C`, color: ck, w: 5 }, { s: 'K_{w} at 25 °C', color: alpha(ck, 0.45), w: 3, dash: [10, 10] }], { corner: 'above' });
    }
    const [a, b] = seg(L);
    F.curve(ctx, (u) => L - u, a, b, g.X, g.Y, ck, 5);
    const lx = x > L / 2 ? L + 3 : L + 10.5;   /* the value on the half of the line the point is not on */
    text(ctx, `$\\kKw = ${sciTex(K)}$`, g.X(lx) + 12, g.Y(L - lx) - 30, ck, { size: 22, tex: true, bg: PAL.panel });
    F.dot(ctx, g.X(L / 2), g.Y(L / 2), ck, false, 10);
    const y = L - x, inside = y <= 0;
    if (inside) {
      line(ctx, g.X(x), g.Y(y), g.X(x), G.b, alpha(cc, 0.6), 2.5, [4, 8]);
      line(ctx, G.l, g.Y(y), g.X(x), g.Y(y), alpha(cc, 0.6), 2.5, [4, 8]);
    }
    const p = F.pinned(ctx, G, g.X, g.Y, x, y, cc);
    const Hv = round2(10 ** x), Ov = round2(K / Hv);
    /* each value on its drop line at the frame's edge, or beside the point where the point is near that edge */
    const sH = `${sciTxt(Hv)} M`, sO = `${sciTxt(Ov)} M`, wO = F.measure(ctx, sO, { size: 17, weight: 600 });
    const xLow = G.b - p.y < 56, yLeft = p.x - G.l < wO + 40;
    text(ctx, sH, Math.min(Math.max(p.x, G.l + 80), G.r - 80), xLow ? p.y - 30 : G.b - 18, cc, { size: 17, weight: 600, align: 'center', bg: PAL.panel });
    text(ctx, sO, yLeft ? p.x + 18 : G.l + 12, Math.min(Math.max(p.y, G.t + 30), G.b - 46) + (yLeft ? -26 : 0), cc, { size: 17, weight: 600, bg: PAL.panel });
    hits = [{ x: g.X(L / 2), y: g.Y(L / 2), r: 16, name: `pure water at ${t} °C` },
      { x: p.x, y: p.y, r: 16, name: `the solution: [H₃O⁺] = ${sciTxt(Hv)} M, [OH⁻] = ${sciTxt(Ov)} M` }];
    const r = Hv / Ov;
    headline(ctx, onWater
      ? `At ${t} °C, pure water holds equal concentrations of hydronium and hydroxide ions, ${sciTxt(Hv)} M each.`
      : r >= 1 ? `At ${t} °C there is ${big(r)} times as much hydronium ion as hydroxide ion.`
        : `At ${t} °C there is ${big(1 / r)} times as much hydroxide ion as hydronium ion.`);
    const k = hue('equilibrium-constant', sciTex(K)), hv = hue('concentration', sciTex(Hv)), ov = hue('concentration', sciTex(Ov));
    ro.set(onWater
      ? `\\mk{H}{\\kconcHyd} = \\mk{O}{\\kconcOH} = \\sqrt{\\mk{K}{\\kKw}} = \\sqrt{\\mk{Kv}{${k}}} = \\mk{Ov}{${ov}}\\ M`
      : `\\mk{O}{\\kconcOH} = \\frac{\\mk{K}{\\kKw}}{\\mk{H}{\\kconcHyd}} = \\frac{\\mk{Kv}{${k}}}{\\mk{Hv}{${hv}}} = \\mk{Ov}{${ov}}\\ M`, undefined, { form: onWater });
  }
  still(d, draw);
})();
};
