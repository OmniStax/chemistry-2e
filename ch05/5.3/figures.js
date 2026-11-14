/* Figures for section 5.3 Enthalpy. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['5.3'] = function (root, F) {
const { fmt, tex, C, PAL, alpha, ctl, register, begin, line, arrow, text, measure } = F;
const sim = (id, H) => F.sim(root, id, H);

const hue = (s) => `\\htmlClass{kv-energy}{${s}}`;
/* a signed number with its sign always written, as the book writes enthalpy changes */
const signed = (x, dec) => (x > 0 ? '+' : x < 0 ? '−' : '') + fmt(Math.abs(x), dec);
const signedTex = (x, dec) => (x > 0 ? '+' : x < 0 ? '-' : '') + fmt(Math.abs(x), dec);
const lerp = (a, b, k) => a + (b - a) * k;
function rrect(ctx, x, y, w, h, r, fill, stroke, lw = 2) {
  ctx.save(); ctx.beginPath(); ctx.roundRect(x, y, w, h, r);
  if (fill) { ctx.fillStyle = fill; ctx.fill(); }
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke(); }
  ctx.restore();
}
/* work is told from heat by its stroke: a dashed shaft ending in the same head */
function dashedArrow(ctx, x1, y1, x2, y2, color, w) {
  const L = Math.hypot(x2 - x1, y2 - y1); if (L < 1) return;
  const ux = (x2 - x1) / L, uy = (y2 - y1) / L, k = Math.min(24, L);
  line(ctx, x1, y1, x2 - ux * k, y2 - uy * k, color, w, [12, 8]);
  arrow(ctx, x2 - ux * k, y2 - uy * k, x2, y2, color, w);
}

/* =====================================================================
   FIGURE 5.19: the first law. On the left the system inside its
   surroundings, the heat arrow on its left and the work arrow on its
   right, each pointing in or out by its sign and as long as its size. On
   the right the internal energy as two levels: from U before the heat
   arrow, then the work arrow from where the heat arrow ends, landing on
   U after, with one ΔU arrow spanning both. Heat and work are one type
   and share the energy hue; heat is solid and work dashed. Still.
===================================================================== */
(function () {
  const d = sim('sim-first-law', 460);
  const q = ctl(d.controls, { label: '\\kq', cls: 'energy', min: -50, max: 50, step: 1, value: 40, unit: 'kJ', dec: 0, aria: 'heat, positive into the system, in kilojoules',
    specials: [{ at: () => -w.v, label: 'ΔU = 0' }] });
  const w = ctl(d.controls, { label: '\\kwork', cls: 'energy', min: -50, max: 50, step: 1, value: -15, unit: 'kJ', dec: 0, aria: 'work, positive when done on the system, in kilojoules',
    specials: [{ at: () => -q.v, label: 'ΔU = 0' }] });
  const hits = []; F.hover(d.stage, () => hits);
  const SX = 410, SY = 230, RX = 160, RY = 112;
  /* the boundary arrows run 36 to 186 units for 0 to 50 kJ; the levels move 1.95 units per kJ, ±195 units at ΔU = ±100 kJ */
  const len = (v) => 36 + (Math.abs(v) / 50) * 150, UK = 1.95;
  const LX0 = 972, LX1 = 1232, QX = 1022, WX = 1107, DX = 1192;
  function draw() {
    const { ctx } = begin(d.c);
    const ce = C('energy'), dU = q.v + w.v;
    hits.length = 0;
    /* the surroundings and the system */
    rrect(ctx, 24, 20, 766, 420, 8, alpha(PAL.soft, 0.7), PAL.rule, 1.5);
    text(ctx, 'Surroundings', 407, 56, PAL.ink, { size: 22, align: 'center' });
    ctx.save(); ctx.beginPath(); ctx.ellipse(SX, SY, RX, RY, 0, 0, 2 * Math.PI);
    ctx.fillStyle = PAL.panel; ctx.fill(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2.5; ctx.stroke(); ctx.restore();
    text(ctx, 'System', SX, SY - 20, PAL.ink, { size: 24, align: 'center', base: 'middle' });
    text(ctx, dU > 0 ? 'ΔU > 0' : dU < 0 ? 'ΔU < 0' : 'ΔU = 0', SX, SY + 20, ce, { size: 24, weight: 600, align: 'center', base: 'middle' });
    /* heat crosses the boundary on the left, work on the right */
    const edge = (side, v, sym, into, out, dashed) => {
      const x0 = SX + side * (RX + 8), cx = x0 + side * 105;
      text(ctx, sym + ' = ' + (v === 0 ? '0' : signed(v, 0)) + ' kJ', cx, SY - 34, ce, { size: 22, weight: 600, align: 'center' });
      text(ctx, v > 0 ? into : v < 0 ? out : dashed ? 'no work' : 'no heat', cx, SY + 46, PAL.ink, { size: 20, align: 'center' });
      if (v === 0) return;
      const x1 = x0 + side * len(v), a = v > 0 ? [x1, x0] : [x0, x1];
      (dashed ? dashedArrow : arrow)(ctx, a[0], SY, a[1], SY, ce, 5);
      hits.push({ x: (x0 + x1) / 2, y: SY, r: 40, name: dashed ? 'work, w' : 'heat, q' });
    };
    edge(-1, q.v, 'q', 'heat in', 'heat out', false);
    edge(1, w.v, 'w', 'work on the system', 'work by the system', true);
    /* the internal energy: U before, then q, then w, landing on U after */
    const y0 = SY, yq = y0 - q.v * UK, y1 = y0 - dU * UK, up = dU >= 0 ? 1 : -1;
    arrow(ctx, 850, 440, 850, 20, alpha(PAL.ink, 0.45), 2.5);
    text(ctx, 'U', 836, 30, ce, { size: 22, weight: 600, align: 'right', base: 'middle' });
    hits.push({ x: 850, y: 230, r: 26, name: 'internal energy, increasing upward' });
    line(ctx, LX0, y0, LX1, y0, ce, 3, [10, 10]);
    line(ctx, LX0, y1, LX1, y1, ce, 5);
    text(ctx, 'U before', LX0 - 12, y0 + up * 13, ce, { size: 20, align: 'right', base: 'middle' });
    text(ctx, 'U after', LX0 - 12, y1 - up * 13, ce, { size: 20, weight: 600, align: 'right', base: 'middle' });
    if (q.v !== 0 && w.v !== 0) line(ctx, QX, yq, WX, yq, alpha(PAL.ink, 0.4), 2, [4, 8]);
    if (q.v !== 0) {
      arrow(ctx, QX, y0, QX, yq, ce, 4);
      if (Math.abs(yq - y0) >= 30) text(ctx, 'q', QX - 14, (y0 + yq) / 2, ce, { size: 22, weight: 600, align: 'right', base: 'middle' });
      hits.push({ x: QX, y: (y0 + yq) / 2, r: 24, name: 'heat, q = ' + signed(q.v, 0) + ' kJ' });
    }
    if (w.v !== 0) {
      dashedArrow(ctx, WX, yq, WX, y1, ce, 4);
      if (Math.abs(y1 - yq) >= 30) text(ctx, 'w', WX + 14, (yq + y1) / 2, ce, { size: 22, weight: 600, base: 'middle' });
      hits.push({ x: WX, y: (yq + y1) / 2, r: 24, name: 'work, w = ' + signed(w.v, 0) + ' kJ' });
    }
    if (Math.abs(y1 - y0) > 10) arrow(ctx, DX, y0, DX, y1, ce, 6);
    text(ctx, 'ΔU = ' + (dU === 0 ? '0' : signed(dU, 0)) + ' kJ', LX1 + 14, (y0 + y1) / 2, ce, { size: 22, weight: 600, base: 'middle' });
    tex(d.readout, `\\kdU = \\kq + \\kwork = (${hue(signedTex(q.v, 0))}\\ \\text{kJ}) + (${hue(signedTex(w.v, 0))}\\ \\text{kJ}) = ${hue(signedTex(dU, 0))}\\ \\text{kJ}`);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 5.24: the Hess ladder. Three enthalpy levels on an axis in kJ
   with the elements at 0, one arrow for the reaction in one step and two
   for its two steps, for the book's carbon dioxide (the image's numbers),
   iron(III) chloride (Example 5.13) and the reaction of Example 5.15
   taken by way of its elements, whose first step climbs. Reversing turns
   every arrow round and swaps which level holds the reactants. Levels,
   axis and arrows are enthalpies, in the energy hue; formulas are ink.
   The axis is fixed at +40 to −430 kJ, which holds all three. Still.
===================================================================== */
(function () {
  const d = sim('sim-hess', 560);
  /* levels: the reactants, the intermediate set, the products, each at the sum of its enthalpies of formation */
  const RX = {
    co2: { levels: [['C(s) + O₂(g)', 0], ['CO(g) + ½O₂(g)', -111], ['CO₂(g)', -393.5]], dec: 1 },
    fecl3: { levels: [['Fe(s) + 3/2 Cl₂(g)', 0], ['FeCl₂(s) + ½Cl₂(g)', -341.8], ['FeCl₃(s)', -399.5]], dec: 1 },
    hno3: { levels: [['3NO₂(g) + H₂O(l)', -186.23], ['3/2 N₂(g) + 7/2 O₂(g) + H₂(g)', 0], ['2HNO₃(aq) + NO(g)', -323.03]], dec: 2 },
  };
  const pick = F.select(d.controls, { label: '\\text{reaction}', aria: 'the reaction and its two steps', value: 'co2',
    options: [{ value: 'co2', label: 'C + O₂ → CO₂' }, { value: 'fecl3', label: 'Fe + 3/2 Cl₂ → FeCl₃' }, { value: 'hno3', label: '3NO₂ + H₂O → 2HNO₃ + NO' }] });
  const dir = F.choice(d.controls, { label: '\\text{direction}', aria: 'the direction of every equation', value: 'fwd',
    options: [{ value: 'fwd', label: 'forward' }, { value: 'rev', label: 'reverse' }] });
  const hits = []; F.hover(d.stage, () => hits);
  const Y = (h) => 100 - h;                                  /* one unit per kJ: 0 kJ at y = 100, −400 kJ at y = 500 */
  const A = { x0: 210, x1: 650 }, M = { x0: 560, x1: 1010 }, E = { x0: 210, x1: 1010 };
  const XO = 340, X1 = 605, X2 = 860, AX = 120, KX = 1080;
  /* the book's image prints −111 beside −282.5 and −393.5: a value loses a trailing .0 */
  const num = (v, dec) => signed(v, dec).replace(/\.0$/, ''), numTex = (v, dec) => signedTex(v, dec).replace(/\.0$/, '');
  function draw() {
    const { ctx } = begin(d.c);
    const ce = C('energy'), r = RX[pick.value], rev = dir.value === 'rev', sign = rev ? -1 : 1;
    const hs = pick.mix((v) => RX[v].levels.map((l) => l[1])), s = dir.mix((v) => (v === 'rev' ? 1 : 0));
    const yA = Y(hs[0]), yM = Y(hs[1]), yE = Y(hs[2]);
    const L = r.levels, d1 = (L[1][1] - L[0][1]) * sign, d2 = (L[2][1] - L[1][1]) * sign, dO = (L[2][1] - L[0][1]) * sign;
    hits.length = 0;
    /* the enthalpy axis, in kJ from the elements */
    arrow(ctx, AX, 540, AX, 40, ce, 3);
    text(ctx, 'H (kJ), elements at 0', AX + 16, 34, ce, { size: 18, weight: 600, base: 'middle' });
    for (let h = 0; h >= -400; h -= 100) {
      line(ctx, AX - 8, Y(h), AX, Y(h), ce, 2);
      text(ctx, fmt(h, 0), AX - 14, Y(h), PAL.muted, { size: 17, align: 'right', base: 'middle' });
    }
    /* the three levels and what each holds */
    [[A, yA, 0, 0], [M, yM, 1, 90], [E, yE, 2, 0]].forEach(([S, y, i, dx]) => {
      line(ctx, S.x0, y, S.x1, y, ce, 4);
      text(ctx, L[i][0], S.x0 + 10 + dx, i === 2 ? y + 26 : y - 14, PAL.ink, { size: 21 });
      hits.push({ x: (S.x0 + S.x1) / 2, y, r: 16, name: 'the enthalpy of ' + L[i][0] });
    });
    /* the arrows: forward runs reactants to intermediate to products; reverse turns each one round */
    const grow = (x, ya, yb, wdt) => { const t = lerp(ya, yb, s), h = lerp(yb, ya, s); if (Math.abs(h - t) > 8) arrow(ctx, x, t, x, h, ce, wdt); };
    grow(XO, yA, yE, 7); grow(X1, yA, yM, 4.5); grow(X2, yM, yE, 4.5);
    const lab = (x, ya, yb, v, name, side) => {
      const val = num(v, r.dec) + ' kJ', y = (ya + yb) / 2, wd = measure(ctx, name + ' ', { size: 21 }) + measure(ctx, val, { size: 21, weight: 600 });
      F.rich(ctx, [name + ' ', [val, ce]], side > 0 ? x + 18 : x - 18 - wd, y, { size: 21, base: 'middle', bg: PAL.panel });
      hits.push({ x, y, r: 22, name: name + ', ΔH° = ' + val });
    };
    lab(XO, yA, yE, dO, 'one step', -1);
    lab(X1, yA, yM, d1, 'step 1', -1);
    lab(X2, yM, yE, d2, 'step 2', 1);
    /* the key at the right: which level holds the reactants, which the products, and the sign of the change */
    const yR = lerp(yA, yE, s), yP = lerp(yE, yA, s);
    line(ctx, KX, yR, KX + 40, yR, PAL.ink, 3); line(ctx, KX, yP, KX + 40, yP, PAL.ink, 3);
    line(ctx, KX + 20, yA, KX + 20, yE, alpha(PAL.ink, 0.4), 2, [4, 8]);
    text(ctx, 'reactants', KX + 54, yR, PAL.ink, { size: 21, base: 'middle' });
    text(ctx, 'products', KX + 54, yP, PAL.ink, { size: 21, base: 'middle' });
    text(ctx, dO < 0 ? 'exothermic,' : 'endothermic,', KX + 54, (yA + yE) / 2 - 14, PAL.ink, { size: 21, weight: 600, base: 'middle' });
    text(ctx, dO < 0 ? 'products lower' : 'products higher', KX + 54, (yA + yE) / 2 + 14, PAL.ink, { size: 21, base: 'middle' });
    tex(d.readout, `\\kdHo_{\\text{overall}} = \\kdHo_{1} + \\kdHo_{2} = (${hue(numTex(d1, r.dec))}\\ \\text{kJ}) + (${hue(numTex(d2, r.dec))}\\ \\text{kJ}) = ${hue(numTex(dO, r.dec))}\\ \\text{kJ}`);
  }
  register(d.fig, { update: () => {}, draw });
})();
};
