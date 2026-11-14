/* Figures for section 3.4 Other Units for Solution Concentrations. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['3.4'] = function (root, F) {
const { tex, C, PAL, alpha, ctl, register, begin, line, dot, text } = F;
const sim = (id, H) => F.sim(root, id, H);

/* a number to three significant figures in plain decimals with no trailing zeros, as the book writes 0.075% and 15 ppb;
   five digits or more take commas */
const plain = (x) => {
  if (!(x > 0)) return '0';
  const v = Number(x.toPrecision(3)), e = Math.floor(Math.log10(v));
  let t = v.toFixed(Math.max(0, 2 - e));
  if (t.includes('.')) t = t.replace(/0+$/, '').replace(/\.$/, '');
  return v >= 10000 ? t.replace(/\B(?=(\d{3})+$)/g, ',') : t;
};
const SUP = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
const pow10 = (k) => (k === 0 ? '1' : '10' + String(k).split('').map((c) => SUP[c]).join(''));
/* a mass in the unit that keeps it between 1 and 1000, for a slider's value */
const massStr = (g) => (g >= 1 ? plain(g) + ' g' : g >= 1e-3 ? plain(g * 1e3) + ' mg' : g >= 1e-6 ? plain(g * 1e6) + ' µg' : plain(g * 1e9) + ' ng');
/* a mass in grams for the readout, so that both masses of the ratio carry one unit: 0.00375 g, and 4.5 × 10⁻⁶ g below 0.0001 g */
const gramsTex = (g) => {
  if (g >= 1e-4) return plain(g).replace(/,/g, '{,}') + '\\ \\text{g}';
  const e = Math.floor(Math.log10(g) + 1e-9);
  return plain(g / 10 ** e) + ' \\times 10^{' + e + '}\\ \\text{g}';
};
const round3 = (x) => Number(x.toPrecision(3));

/* =====================================================================
   SIM: one mass ratio read as a percentage, in ppm and in ppb. A
   logarithmic line of mass fractions from 10⁻¹⁰ to 1 carries the section's
   five solutions; under it one row per unit, numbered only over the stretch
   where that unit gives a number between 0.1 and 1000, so the three
   stretches step down from percent on the right to ppb on the left. A
   marker at the chosen ratio crosses the rows with its reading on each.
   Still: the rows answer the sliders and nothing here has a clock.
===================================================================== */
(function () {
  const d = sim('sim-ppm', 530);
  /* the solutions the section names, with the book's masses: [hover-free name, solute mass in g, solution mass in g, referent].
     The acid's 221 g is the unrounded 500 mL × 1.19 g/mL × 0.372, so the ratio reads the book's 37.2%. */
  const SAMPLES = [
    ['lead in tap water', 4.5e-6, 300, 'lead-water'],
    ['fluoride in tap water', 1.2e-3, 300, 'fluoride-water'],
    ['glucose in spinal fluid', 0.00375, 5.0, 'spinal-fluid'],
    ['liquid bleach', 7.4, 100.0, 'bleach'],
    ['concentrated HCl', 221.34, 595, 'hcl'],
  ];
  const OTHER = SAMPLES.length, lg10 = Math.log10;
  const S = F.select(d.controls, { label: '\\text{solution}', aria: 'solution', value: '0',
    options: [...SAMPLES.map((s, i) => ({ value: String(i), label: s[0] })), { value: String(OTHER), label: 'another solution' }],
    onInput: () => { const i = +S.value; if (i < OTHER) { MS.set(lg10(SAMPLES[i][2])); R.set(lg10(SAMPLES[i][1])); } } });
  /* both masses on logarithmic tracks, since the section's solutes run from micrograms to hundreds of grams; each value
     box shows the mass itself. The dashed circles on the solute's track are the masses that make 1 ppb, 1 ppm and 1% of
     the solution chosen, so they move with the other slider. */
  const MS = ctl(d.controls, { label: '\\km_{\\text{solution}}', cls: 'mass', min: 0, max: 3, step: 0.001, value: lg10(300), unit: '', fmt: (v) => massStr(round3(10 ** v)), aria: 'mass of solution' });
  const R = ctl(d.controls, { label: '\\km_{\\text{solute}}', cls: 'mass', min: -7, max: 3, step: 0.001, value: lg10(4.5e-6), unit: '', fmt: (v) => massStr(round3(10 ** v)), aria: 'mass of solute',
    specials: [{ at: () => lg10(masses().ms) - 9, label: '1 ppb' }, { at: () => lg10(masses().ms) - 6, label: '1 ppm' }, { at: () => lg10(masses().ms) - 2, label: '1%' }] });
  const which = () => SAMPLES.findIndex((s) => Math.abs(lg10(s[1]) - R.v) < 0.002 && Math.abs(lg10(s[2]) - MS.v) < 0.002);
  /* the two masses as the value boxes show them (three figures), the book's own numbers on a named solution */
  function masses() {
    const i = which();
    if (i >= 0) return { i, ms: SAMPLES[i][2], m: SAMPLES[i][1] };
    return { i, ms: round3(10 ** MS.v), m: round3(10 ** R.v) };
  }

  const X0 = 310, X1 = 1370, LO = -10, HI = 0, yF = 150;
  const X = (lg) => X0 + ((lg - LO) / (HI - LO)) * (X1 - X0);
  /* the three units: the power of ten each multiplies the fraction by, its name, and the multiplier as the book writes it */
  const ROWS = [
    { y: 260, k: 2, unit: '%', name: 'mass percentage', by: '× 100%' },
    { y: 355, k: 6, unit: 'ppm', name: 'parts per million', by: '× 10⁶ ppm' },
    { y: 450, k: 9, unit: 'ppb', name: 'parts per billion', by: '× 10⁹ ppb' },
  ];
  const withUnit = (t, u) => t + (u === '%' ? '%' : ' ' + u);
  function draw() {
    /* a solute cannot outweigh its solution */
    if (R.v > MS.v) R.set(MS.v);
    const { ctx } = begin(d.c);
    const { i, ms, m } = masses(); S.set(String(i < 0 ? OTHER : i));
    const frac = Math.min(1, m / ms), lg = Math.max(LO, lg10(frac)), xm = X(lg), cm = C('mass');
    /* the mass-fraction line, one decade per step */
    text(ctx, 'mass of solute ÷', X0 - 50, yF - 13, PAL.ink, { size: 18, weight: 600, align: 'right' });
    text(ctx, 'mass of solution', X0 - 50, yF + 13, PAL.ink, { size: 18, weight: 600, align: 'right' });
    line(ctx, X0, yF, X1, yF, PAL.ink, 3);
    for (let k = LO; k <= HI; k++) {
      line(ctx, X(k), yF - 9, X(k), yF + 9, PAL.ink, 2);
      text(ctx, pow10(k), X(k), yF + 30, PAL.muted, { size: 17, align: 'center', bg: alpha(PAL.panel, 0.9) });
    }
    /* each unit's row: numbered over the stretch where it reads 0.1 to 1000, a bare line elsewhere */
    ROWS.forEach((r) => {
      const a = Math.max(LO, -1 - r.k), b = Math.min(HI, 3 - r.k);
      text(ctx, r.name, X0 - 50, r.y - 14, PAL.ink, { size: 18, weight: 600, align: 'right' });
      text(ctx, r.by, X0 - 50, r.y + 14, PAL.muted, { size: 17, align: 'right' });
      line(ctx, X0, r.y, X1, r.y, alpha(PAL.ink, 0.3), 2);
      ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.1); ctx.fillRect(X(a), r.y - 15, X(b) - X(a), 30); ctx.restore();
      line(ctx, X(a), r.y, X(b), r.y, PAL.ink, 2.5);
      for (let k = a; k <= b; k++) {
        const v = k + r.k;
        line(ctx, X(k), r.y - 9, X(k), r.y + 9, PAL.ink, 2);
        text(ctx, withUnit(v < 0 ? (10 ** v).toFixed(-v) : String(10 ** v), r.unit), X(k), r.y + 32, PAL.muted, { size: 17, align: 'center' });
      }
    });
    /* the marker at the chosen ratio, crossing every row */
    line(ctx, xm, yF, xm, ROWS[2].y + 12, cm, 3, [4, 8]);
    dot(ctx, xm, yF, cm, true, 10);
    /* the section's solutions on the fraction line, each named above it; the acid's name a row higher, clear of the bleach's */
    SAMPLES.forEach((s, j) => {
      const x = X(lg10(s[1] / s[2])), c = F.ref(s[3]), up = j === 4, yN = up ? 36 : 78;
      line(ctx, x, yN + 14, x, yF - 12, alpha(PAL.ink, 0.35), 1.5);
      dot(ctx, x, yF, c, j === i, 7);
      const w = F.measure(ctx, s[0], { size: 18, weight: j === i ? 600 : 400 });
      text(ctx, s[0], Math.min(x, 1390 - w / 2), yN, c, { size: 18, weight: j === i ? 600 : 400, align: 'center', bg: alpha(PAL.panel, 0.9) });
    });
    /* the reading on each row: heavy where the number is an easy one, muted where it is not */
    const right = xm < 1000;
    ROWS.forEach((r) => {
      const v = frac * 10 ** r.k, easy = v >= 0.0999 && v <= 1000.5;
      dot(ctx, xm, r.y, cm, true, 8);
      text(ctx, withUnit(plain(v), r.unit), xm + (right ? 16 : -16), r.y - 30, easy ? PAL.ink : PAL.muted, { size: 22, weight: easy ? 600 : 400, align: right ? 'left' : 'right', bg: alpha(PAL.panel, 0.9) });
    });
    F.legend(ctx, { l: X0, r: X1, t: 486, b: 526 }, [{ s: 'a number from 0.1 to 1000', kind: 'swatch', color: alpha(PAL.ink, 0.25) }], { corner: 'br', panel: false, size: 17 });
    const num = (v) => plain(v).replace(/,/g, '{,}');
    tex(d.readout, `\\frac{\\km_{\\text{solute}}}{\\km_{\\text{solution}}} = \\frac{\\htmlClass{kv-mass}{${gramsTex(m)}}}{\\htmlClass{kv-mass}{${gramsTex(ms)}}} = ${num(frac * 100)}\\% = ${num(frac * 1e6)}\\ \\text{ppm} = ${num(frac * 1e9)}\\ \\text{ppb}`);
  }
  register(d.fig, { update: () => {}, draw });
})();
};
