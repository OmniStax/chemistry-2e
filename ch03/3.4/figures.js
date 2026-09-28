/* Figures for section 3.4 Other Units for Solution Concentrations. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['3.4'] = function (root, F) {
const { tex, C, PAL, alpha, ctl, register, begin, line, dot, text, headline } = F;
const sim = (id, H) => F.sim(root, id, H);

/* a number to n significant figures in plain decimals, as the book writes 0.075% and 9600 ppb */
const sig = (x, n = 2) => {
  if (x === 0) return '0';
  const e = Math.floor(Math.log10(Math.abs(x))), d = Math.max(0, n - 1 - e);
  return d > 12 ? x.toExponential(n - 1) : Number(x.toPrecision(n)).toFixed(d);
};
const SUP = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
const pow10 = (k) => (k === 0 ? '1' : k === 1 ? '10' : k === 2 ? '100' : k === 3 ? '1000' : '10' + String(k).split('').map((c) => SUP[c]).join(''));
/* a mass in the unit that keeps it between 1 and 1000 */
const massStr = (g) => (g >= 1 ? sig(g, 3) + ' g' : g >= 1e-3 ? sig(g * 1e3, 3) + ' mg' : g >= 1e-6 ? sig(g * 1e6, 3) + ' µg' : sig(g * 1e9, 3) + ' ng');
const massTex = (g) => massStr(g).replace(' µg', '\\ \\mu\\text{g}').replace(/ (n?m?g)$/, '\\ \\text{$1}');

/* =====================================================================
   SIM: one mass ratio read as a percentage, in ppm and in ppb. A
   logarithmic line of mass fractions from 10⁻¹⁰ to 1 carries three scales,
   one per unit, and a marker at the chosen ratio crosses all three. Still:
   the scales answer the sliders and nothing here has a clock.
===================================================================== */
(function () {
  const d = sim('sim-ppm', 560);
  /* the solutions the section names, with the book's masses: [name, solute, mass of solute in g, mass of solution in g] */
  const SAMPLES = [
    ['tap water at the lead action level', 'lead', 4.5e-6, 300],
    ['tap water at the fluoride limit', 'fluoride', 1.2e-3, 300],
    ['spinal fluid', 'glucose', 0.00375, 5.0],
    ['liquid bleach', 'NaOCl', 7.4, 100.0],
    ['concentrated hydrochloric acid', 'HCl', 221, 595],
  ];
  const OTHER = SAMPLES.length;
  const S = F.select(d.controls, { label: '\\text{solution}', aria: 'solution', value: '0',
    options: [...SAMPLES.map((s, i) => ({ value: String(i), label: s[0] })), { value: String(OTHER), label: 'another solution' }],
    onInput: () => { const i = +S.value; if (i < OTHER) { MS.set(SAMPLES[i][3]); R.set(Math.log10(SAMPLES[i][2] / SAMPLES[i][3])); } } });
  /* the mass of solution sets the scale of the sample, and the second slider sets the solute's share of it on a logarithmic
     track, since the section's concentrations run from parts per billion to tens of percent; its value box shows the solute's mass */
  const MS = ctl(d.controls, { label: '\\km_{\\text{solution}}', cls: 'mass', min: 1, max: 1000, step: 0.1, value: 300, unit: 'g', dec: 1, aria: 'mass of solution' });
  const R = ctl(d.controls, { label: '\\km_{\\text{solute}}', cls: 'mass', min: -10, max: -0.3, step: 0.0001, value: Math.log10(4.5e-6 / 300), unit: '', dec: 2, aria: 'mass of solute as a share of the solution, on a logarithmic scale',
    specials: [{ at: -9, label: '1 ppb' }, { at: -6, label: '1 ppm' }, { at: -2, label: '1%' }] });
  const soluteBox = R.el.querySelector('.ctl-val');
  const which = () => SAMPLES.findIndex((s) => Math.abs(Math.log10(s[2] / s[3]) - R.v) < 0.006 && Math.abs(s[3] - MS.v) < 0.05);
  let hits = []; F.hover(d.stage, () => hits);

  const X0 = 110, X1 = 1290, LO = -10, HI = 0;
  const X = (lg) => X0 + ((lg - LO) / (HI - LO)) * (X1 - X0);
  /* the three scales: the power of ten each unit multiplies the fraction by, and its name */
  const SCALES = [
    { y: 240, k: 2, unit: '%', name: 'mass percentage' },
    { y: 350, k: 6, unit: 'ppm', name: 'parts per million' },
    { y: 460, k: 9, unit: 'ppb', name: 'parts per billion' },
  ];
  function tick(k, s) {
    const v = k + s.k;
    if (v < -3) return pow10(v) + ' ' + s.unit;
    return (v < 0 ? (10 ** v).toFixed(-v) : String(10 ** v)) + (s.unit === '%' ? '%' : ' ' + s.unit);
  }
  function draw() {
    const { ctx } = begin(d.c);
    const i = which(); S.set(String(i < 0 ? OTHER : i));
    const lg = R.v, frac = 10 ** lg, ms = MS.v, mSolute = frac * ms, cm = C('mass');
    if (soluteBox) soluteBox.textContent = massStr(mSolute);
    const pct = frac * 100, ppm = frac * 1e6, ppb = frac * 1e9;
    hits.length = 0;
    /* the mass-fraction line itself, one decade per step */
    const yF = 130;
    line(ctx, X0, yF, X1, yF, PAL.ink, 3);
    for (let k = LO; k <= HI; k++) {
      line(ctx, X(k), yF - 10, X(k), yF + 10, PAL.ink, 2);
      if (k % 2 === 0) text(ctx, pow10(k), X(k), yF - 30, PAL.muted, { size: 17, align: 'center' });
    }
    const names = [['mass solute ÷ mass solution', yF + 36, PAL.muted, 400]];
    /* each unit's scale, with the stretch where it reads between 0.1 and 1000 shaded */
    SCALES.forEach((s) => {
      const a = Math.max(LO, -1 - s.k), b = Math.min(HI, 3 - s.k);
      ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.07); ctx.fillRect(X(a), s.y - 16, X(b) - X(a), 32); ctx.restore();
      line(ctx, X0, s.y, X1, s.y, PAL.muted, 2);
      for (let k = LO; k <= HI; k++) {
        const big = (k + s.k) % 3 === 0;
        line(ctx, X(k), s.y - (big ? 12 : 7), X(k), s.y + (big ? 12 : 7), PAL.ink, big ? 2 : 1.2);
        if (big) text(ctx, tick(k, s), X(k), s.y + 32, PAL.ink, { size: 17, align: 'center' });
      }
      names.push([s.name, s.y - 34, PAL.ink, 600]);
    });
    /* the samples of the section as small marks on the fraction line, named on hover */
    SAMPLES.forEach((s, j) => {
      const x = X(Math.log10(s[2] / s[3]));
      dot(ctx, x, yF, PAL.muted, j === i, 7);
      hits.push({ x, y: yF, r: 14, name: s[0] + ', ' + s[1] });
    });
    /* the marker at the chosen ratio, crossing every scale, with the reading on each */
    const xm = X(lg);
    line(ctx, xm, yF, xm, SCALES[2].y + 8, cm, 3, [4, 8]);
    dot(ctx, xm, yF, cm, true, 10);
    const right = xm < 900;
    [pct, ppm, ppb].forEach((v, j) => {
      const s = SCALES[j];
      dot(ctx, xm, s.y, cm, true, 8);
      text(ctx, sig(v) + (s.unit === '%' ? '%' : ' ' + s.unit), xm + (right ? 16 : -16), s.y - 22, PAL.ink, { size: 22, weight: 600, align: right ? 'left' : 'right', bg: alpha(PAL.panel, 0.9) });
    });
    const nx = xm < 700 ? X1 : X0, na = xm < 700 ? 'right' : 'left';
    names.forEach(([s, y, c, w]) => text(ctx, s, nx, y, c, { size: 18, weight: w, align: na, bg: alpha(PAL.panel, 0.9) }));
    const who = i < 0 ? 'the solution' : SAMPLES[i][0], what = i < 0 ? 'solute' : SAMPLES[i][1];
    headline(ctx, 'In ' + sig(ms, 3) + ' g of ' + who + ', ' + massStr(mSolute) + ' of ' + what + ' is ' + sig(pct) + '% of the mass, or ' + sig(ppm) + ' ppm, or ' + sig(ppb) + ' ppb.');
    tex(d.readout, `\\frac{\\htmlClass{kv-mass}{${massTex(mSolute)}}}{\\htmlClass{kv-mass}{${sig(ms, 3)}\\ \\text{g}}} = ${sig(pct)}\\% = ${sig(ppm)}\\ \\text{ppm} = ${sig(ppb)}\\ \\text{ppb}`);
  }
  register(d.fig, { update: () => {}, draw });
})();
};
