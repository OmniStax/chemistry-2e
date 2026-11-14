/* Figures for section 3.1 Formula Mass and the Mole Concept. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['3.1'] = function (root, F) {
const { el, tex, C, PAL, alpha, ctl, register, begin, line, text, headline, dot } = F;
const sim = (id, H) => F.sim(root, id, H);
function readout(host, main, small) { tex(host, main); if (small) host.appendChild(el('small', null, small)); }
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;

/* ---------- numbers to s significant figures, in exponent form outside 0.001 to 10 000 ---------- */
const SUP = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
function parts(x, s) {
  const e = Math.floor(Math.log10(Math.abs(x)));
  if (e >= -3 && e < 4) return { m: Number(x.toPrecision(s)).toFixed(Math.max(0, s - 1 - e)), e: 0 };
  let m = Number((x / 10 ** e).toPrecision(s)), k = e;
  if (m >= 10) { m /= 10; k += 1; }
  return { m: m.toFixed(s - 1), e: k };
}
const sciTex = (x, s) => { const p = parts(x, s); return p.e ? `${p.m}\\times 10^{${p.e}}` : p.m; };
const sciTxt = (x, s) => { const p = parts(x, s); return p.e ? `${p.m} × 10${String(p.e).split('').map((c) => SUP[c]).join('')}` : p.m; };

/* =====================================================================
   Sim: mass, moles and entities for the six examples 3.3 to 3.8. Above,
   the chain of boxes, each one factor from the next, with the route from
   the quantity an example gives to the one it asks for lit and each lit
   factor written as divide by or multiply by, the way the route runs.
   Below, the estimate every example makes first: a line of powers of ten
   of one mole, each tick carrying its mass and its count, with a pin
   where the sample stands. Still: the numbers answer the slider.
   The line runs from 10⁻⁵ mol to 1 mol, which holds every slider range.
   ===================================================================== */
(function () {
  const d = sim('sim-mole-chain', 480);
  const NA = 6.022e23;
  const EX = {
    potassium: { label: 'Example 3.3 · potassium', sym: 'K', MM: '39.10', give: 'm', want: 'n', value: 4.7, sf: 2, unit: 'atoms', r: { min: 0.5, max: 10, step: 0.1, dec: 1, unit: 'g' },
      head: (q) => `${q.m} g of potassium is ${q.n} mol of K atoms.` },
    argon: { label: 'Example 3.4 · argon', sym: 'Ar', MM: '39.95', give: 'n', want: 'm', value: 0.92, sf: 2, unit: 'atoms', r: { min: 0.1, max: 2, step: 0.01 },
      head: (q) => `${q.n} mol of argon has a mass of ${q.m} g.` },
    copper: { label: 'Example 3.5 · copper', sym: 'Cu', MM: '63.55', give: 'm', want: 'N', value: 5, sf: 3, unit: 'atoms', r: { min: 0.5, max: 20, step: 0.01, dec: 2, unit: 'g' },
      head: (q) => `${q.m} g of copper wire contains ${q.N} Cu atoms.` },
    glycine: { label: 'Example 3.6 · glycine', sym: 'glycine', MM: '75.07', give: 'm', want: 'n', value: 28.35, sf: 4, unit: 'molecules', r: { min: 1, max: 75, step: 0.01, dec: 2, unit: 'g' },
      head: (q) => `${q.m} g of glycine is ${q.n} mol of glycine molecules.` },
    vitaminC: { label: 'Example 3.7 · vitamin C', sym: 'vitamin C', MM: '176.124', give: 'n', want: 'm', value: 0.142, sf: 3, unit: 'molecules', r: { min: 0.01, max: 0.5, step: 0.001 },
      head: (q) => `${q.n} mol of vitamin C has a mass of ${q.m} g.` },
    saccharin: { label: 'Example 3.8 · saccharin', sym: 'saccharin', MM: '183.18', give: 'm', want: 'C', value: 40, sf: 3, unit: 'molecules', nC: 7, mg: true, r: { min: 2, max: 200, step: 0.1, dec: 1, unit: 'mg' },
      head: (q) => `${q.m} mg of saccharin holds ${q.N} molecules and ${q.C} carbon atoms.` },
  };
  const ex = F.select(d.controls, { label: '\\text{example}', aria: 'the worked example', value: 'potassium', options: Object.keys(EX).map((k) => ({ value: k, label: EX[k].label })), onInput: () => load() });
  /* the amount slider runs in millimoles and reads in moles, as the examples write it (9.2 × 10⁻⁴ mol) */
  const molFmt = (v) => `${sciTxt(v / 1000, EX[ex.value].sf)} mol`;
  const SL = {
    m: ctl(d.controls, { label: '\\km', cls: 'mass', min: 0.5, max: 10, step: 0.1, value: 4.7, unit: 'g', dec: 1, aria: 'mass of the sample' }),
    n: ctl(d.controls, { label: '\\kn', cls: 'amount', min: 0.1, max: 2, step: 0.01, value: 0.92, unit: 'mol', fmt: molFmt, aria: 'amount of the sample' }),
  };
  SL.n.show(false, { ms: 0 });
  let shown = 'm';
  function load() {
    const e = EX[ex.value];
    if (e.give !== shown) { SL[shown].show(false); SL[e.give].show(true); shown = e.give; }
    SL[e.give].range(e.give === 'n' ? { ...e.r, value: e.value, fmt: molFmt } : { ...e.r, value: e.value });
  }
  /* the sample's amount in moles, from whichever slider the example gives */
  const molesOf = (e) => (e.give === 'm' ? (SL.m.v / (e.mg ? 1000 : 1)) / +e.MM : SL.n.v / 1000);
  const lerp = (a, b, k) => a + (b - a) * k;
  const BY = 170, BH = 100;
  const ORDER = ['m', 'n', 'N', 'C'];
  function box(ctx, x, w, kind, name, value, lit) {
    const c = kind === 'm' ? C('mass') : kind === 'n' ? C('amount') : PAL.ink;
    ctx.save(); ctx.beginPath(); ctx.roundRect(x - w / 2, BY - BH / 2, w, BH, 8);
    ctx.fillStyle = kind === 'm' || kind === 'n' ? alpha(c, lit ? 0.16 : 0.07) : PAL.soft; ctx.fill();
    ctx.lineWidth = lit ? 4 : 2; ctx.strokeStyle = lit ? c : alpha(c, 0.5); ctx.stroke(); ctx.restore();
    text(ctx, name, x, BY - 22, lit ? PAL.ink : PAL.muted, { size: Math.min(20, 20 * (w - 24) / F.measure(ctx, name, { size: 20 })), align: 'center' });
    text(ctx, value, x, BY + 20, kind === 'm' || kind === 'n' ? c : PAL.ink, { size: Math.min(26, 26 * (w - 24) / F.measure(ctx, value, { size: 26, weight: 600 })), weight: 600, align: 'center' });
  }
  /* a factor between two boxes: an arrow the way the route runs and its verb when lit, a bare rule when not */
  function factor(ctx, xa, xb, w, name, value, dir, sz = 19) {
    const x1 = xa + w / 2 + 8, x2 = xb - w / 2 - 8, xm = (x1 + x2) / 2, c = dir ? PAL.ink : PAL.muted;
    if (dir === 0) line(ctx, x1, BY, x2, BY, alpha(PAL.ink, 0.35), 3);
    else F.arrow(ctx, dir > 0 ? x1 : x2, BY, dir > 0 ? x2 : x1, BY, PAL.ink, 4);
    if (dir) text(ctx, dir > 0 ? name[1] : name[2], xm, BY - 40, c, { size: sz, weight: 600, align: 'center' });
    text(ctx, name[0], xm, BY - 17, c, { size: sz, align: 'center' });
    text(ctx, value, xm, BY + 21, c, { size: sz, align: 'center' });
  }
  /* the estimate line: 10⁻⁵ mol to 1 mol on a logarithmic scale, every decade carrying its mass and its count */
  const AX0 = 290, AX1 = 1320, AY = 356, LG0 = -5;
  const xOf = (n) => AX0 + (Math.log10(n) - LG0) / -LG0 * (AX1 - AX0);
  const MOL = ['0.00001 mol', '0.0001 mol', '0.001 mol', '0.01 mol', '0.1 mol', '1 mol'];
  function estimate(ctx, e, n) {
    const rows = [AY + 34, AY + 66, AY + 98];
    line(ctx, AX0, AY, AX1, AY, PAL.ink, 3);
    text(ctx, 'moles', AX0 - 96, rows[0], C('amount'), { size: 19, weight: 600, align: 'right' });
    text(ctx, 'mass', AX0 - 96, rows[1], C('mass'), { size: 19, weight: 600, align: 'right' });
    text(ctx, e.unit, AX0 - 96, rows[2], PAL.ink, { size: 19, weight: 600, align: 'right' });
    for (let k = LG0; k <= 0; k++) {
      const x = xOf(10 ** k), one = k === 0;
      line(ctx, x, AY - 9, x, AY + 9, PAL.ink, 3);
      if (k < 0) for (let j = 2; j <= 9; j++) { const xj = xOf(j * 10 ** k); line(ctx, xj, AY - 6, xj, AY + 6, alpha(PAL.ink, 0.45), 2); }
      const al = one ? 'right' : 'center', xt = one ? x + 14 : x;
      text(ctx, MOL[k - LG0], xt, rows[0], C('amount'), { size: 19, weight: one ? 600 : 400, align: al });
      text(ctx, `${(+e.MM * 10 ** k).toFixed(Math.max(0, 3 - Math.floor(Math.log10(+e.MM)) - k))} g`, xt, rows[1], C('mass'), { size: 19, weight: one ? 600 : 400, align: al });
      text(ctx, sciTxt(NA * 10 ** k, 4), xt, rows[2], PAL.ink, { size: 19, weight: one ? 600 : 400, align: al });
    }
    const xs = Math.max(AX0, Math.min(AX1, xOf(n)));
    line(ctx, xs, AY, xs, AY - 44, PAL.ink, 3);
    dot(ctx, xs, AY, C('amount'), true, 9);
    text(ctx, 'the sample', Math.max(AX0 + 10, Math.min(AX1 - 44, xs)), AY - 60, PAL.ink, { size: 19, align: 'center' });
  }
  function draw() {
    const { ctx } = begin(d.c);
    const e = EX[ex.value], n = molesOf(e), s = e.sf, MM = +e.MM;
    const val = { m: n * MM, n, N: n * NA, C: Number((n * NA).toPrecision(s)) * (e.nC || 0) };
    const q = { m: sciTxt(val.m, s), n: sciTxt(val.n, s), N: sciTxt(val.N, s), C: sciTxt(val.C, s) };
    if (e.mg) q.m = sciTxt(val.m * 1000, s);
    headline(ctx, e.head(q));
    const a = ORDER.indexOf(e.give), b = ORDER.indexOf(e.want), lo = Math.min(a, b), hi = Math.max(a, b), sgn = Math.sign(b - a);
    const dirOf = (i) => (i >= lo && i < hi ? sgn : 0);
    /* three boxes across the stage; the fourth, carbon atoms, comes in for the one example that asks for it */
    const k4 = ex.mix((k) => (EX[k].want === 'C' ? 1 : 0)), w = lerp(250, 190, k4), fs = lerp(19, 17, k4);
    const BX = [lerp(245, 115, k4), lerp(700, 505, k4), lerp(1155, 895, k4), 1285];
    factor(ctx, BX[0], BX[1], w, ['molar mass', 'divide by', 'multiply by'], `${e.MM} g/mol`, dirOf(0), fs);
    factor(ctx, BX[1], BX[2], w, ['Avogadro’s number', 'multiply by', 'divide by'], '6.022 × 10²³/mol', dirOf(1), fs);
    box(ctx, BX[0], w, 'm', `mass of ${e.sym}`, `${q.m} ${e.mg ? 'mg' : 'g'}`, lo === 0);
    box(ctx, BX[1], w, 'n', `moles of ${e.sym}`, `${q.n} mol`, lo <= 1 && hi >= 1);
    box(ctx, BX[2], w, 'N', `${e.sym} ${e.unit}`, q.N, lo <= 2 && hi >= 2);
    F.faded(ctx, k4, [0, 0], () => {
      factor(ctx, BX[2], BX[3], w, ['C atoms', 'multiply by', 'divide by'], `${e.nC || 7} per molecule`, e.nC ? 1 : 0, fs);
      box(ctx, BX[3], w, 'C', 'carbon atoms', e.nC ? q.C : '', true);
    });
    estimate(ctx, e, n);
    /* the chain of factors, written with the live numbers */
    const M_ = hue('mass', `${e.MM}\\ \\text{g/mol}`);
    const mT = hue('mass', `${sciTex(val.m, s)}\\ \\text{g}`), nT = hue('amount', `${sciTex(val.n, s)}\\ \\text{mol}`);
    const NAt = '6.022\\times 10^{23}\\ \\text{mol}^{-1}';
    let f;
    if (e.give === 'm' && e.want === 'n') f = `\\kn = \\frac{\\km}{\\kMM} = \\frac{${mT}}{${M_}} = ${nT}`;
    else if (e.give === 'n' && e.want === 'm') f = `\\km = \\kn \\times \\kMM = ${nT} \\times ${M_} = ${mT}`;
    else if (e.want === 'N') f = `N = \\frac{\\km}{\\kMM} \\times N_A = \\frac{${mT}}{${M_}} \\times ${NAt} = ${sciTex(val.N, s)}\\ \\text{${e.sym} atoms}`;
    else f = `N_{\\text{C}} = \\frac{\\km}{\\kMM} \\times N_A \\times ${e.nC} = \\frac{${mT}}{${M_}} \\times ${NAt} \\times ${e.nC} = ${sciTex(val.C, s)}\\ \\text{C atoms}`;
    tex(d.readout, f);
  }
  register(d.fig, { update: () => {}, draw });
})();
};
