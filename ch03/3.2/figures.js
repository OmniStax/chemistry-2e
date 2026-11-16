/* Figures for section 3.2 Determining Empirical and Molecular Formulas. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['3.2'] = function (root, F) {
const { tex, C, PAL, alpha, ctl, register, begin, line, arrow, text, headline } = F;
const sim = (id, H) => F.sim(root, id, H);
const still = (d, draw) => register(d.fig, { update: () => {}, draw });
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;
const sig = (x, n = 4) => { const e = Math.floor(Math.log10(Math.abs(x))); return x.toFixed(Math.max(0, n - 1 - e)); };

/* =====================================================================
   FIGURE 3.11: the book's six-box chart for elements A and X, each box
   showing its live value, fed by the sample drawn as a bar split by mass
   percent. The mass of the sample changes the masses and the amounts and
   leaves the ratio; the percent composition changes the ratio and the
   formula. Still: the values answer the controls.
===================================================================== */
(function () {
  const d = sim('sim-empirical', 590);
  const MM = { Fe: 55.85, O: 16.00, C: 12.01, H: 1.008, Cl: 35.45 };
  const MMS = { Fe: '55.85', O: '16.00', C: '12.01', H: '1.008', Cl: '35.45' };
  const NAME = { Fe: 'iron', O: 'oxygen', C: 'carbon', H: 'hydrogen', Cl: 'chlorine' };
  const pct = (a, i, x, j) => (100 * i * MM[a]) / (i * MM[a] + j * MM[x]);
  /* the book's samples: m the sample's mass (its range, step, decimals), p the mass percent of the first
     element (its range), marks the other real compounds of the same two elements */
  const SAMPLES = [
    { label: 'hematite', ref: 'hematite', name: 'the hematite sample', a: 'Fe', x: 'O', m: 50.00, rm: [10, 100, 0.01, 2], p: 69.94, rp: [50, 90],
      marks: [{ at: pct('Fe', 1, 'O', 1), label: 'FeO' }] },
    { label: 'carbon and hydrogen', ref: 'ch-sample', name: 'the sample of carbon and hydrogen', a: 'C', x: 'H', m: 1.997, rm: [0.5, 4, 0.001, 3], p: 85.63, rp: [70, 95],
      marks: [{ at: pct('C', 1, 'H', 4), label: 'CH₄' }, { at: pct('C', 1, 'H', 1), label: 'CH' }] },
    { label: 'chlorine and oxygen', ref: 'clo-sample', name: 'the sample of chlorine and oxygen', a: 'Cl', x: 'O', m: 13.71, rm: [3, 30, 0.01, 2], p: 38.73, rp: [30, 85],
      marks: [{ at: pct('Cl', 1, 'O', 2), label: 'ClO₂' }, { at: pct('Cl', 2, 'O', 1), label: 'Cl₂O' }] },
    { label: 'fermentation gas', ref: 'gas', name: 'the fermentation gas', a: 'C', x: 'O', m: 100.00, rm: [20, 200, 0.01, 2], p: 27.29, rp: [20, 50],
      marks: [{ at: pct('C', 1, 'O', 1), label: 'CO' }] },
  ];
  let S = SAMPLES[0];
  const pLabel = (sym) => `\\%\\,\\text{${sym}}`;
  const pFmt = (v) => `${v.toFixed(2)}%`;
  const marksOf = (s) => [{ at: s.p, label: s.label }, ...s.marks];
  const pick = F.select(d.controls, { label: '\\text{sample}', aria: 'sample analysed',
    options: SAMPLES.map((s, i) => ({ value: String(i), label: s.label })), value: '0',
    onInput: () => {
      S = SAMPLES[+pick.value];
      M.range({ min: S.rm[0], max: S.rm[1], step: S.rm[2], dec: S.rm[3], unit: 'g', value: S.m });
      P.relabel(pLabel(S.a), `mass percent of ${NAME[S.a]}`);
      P.range({ min: S.rp[0], max: S.rp[1], step: 0.01, fmt: pFmt, value: S.p });
      P.mark(marksOf(S));
    } });
  const M = ctl(d.controls, { label: '\\km_{\\text{sample}}', cls: 'mass', min: 10, max: 100, step: 0.01, value: 50, unit: 'g', dec: 2, aria: 'mass of the sample' });
  const P = ctl(d.controls, { label: pLabel('Fe'), cls: '', key: 'percent', min: 50, max: 90, step: 0.01, value: 69.94, unit: '', fmt: pFmt, aria: 'mass percent of iron', specials: marksOf(S) });
  const hits = [];
  F.hover(d.stage, () => hits);

  /* the smallest whole multiplier up to 5 that brings every subscript within 0.04 of a whole number, none above 9 */
  function whole(r) {
    for (let k = 1; k <= 5; k++) {
      if (r.every((x) => Math.abs(x * k - Math.round(x * k)) <= 0.04 && Math.round(x * k) <= 9)) {
        return { k, n: r.map((x) => Math.round(x * k)), exact: r.every((x) => Math.abs(+x.toFixed(3) * k - Math.round(x * k)) < 1e-9) };
      }
    }
    return null;
  }
  const sub = (sym, n) => (n === 1 ? sym : `${sym}_{${n}}`);
  const atomsOf = (n, sym) => `${n} atom${n === 1 ? '' : 's'} of ${sym}`;

  function box(ctx, x, y, w, h, color, name, value, o = {}) {
    ctx.save(); ctx.beginPath(); ctx.roundRect(x - w / 2, y - h / 2, w, h, 8);
    ctx.fillStyle = color === PAL.ink ? PAL.soft : alpha(color, 0.12); ctx.fill();
    ctx.lineWidth = 3; ctx.strokeStyle = color; ctx.stroke(); ctx.restore();
    text(ctx, name, x, y - 20, PAL.ink, { size: 22, align: 'center' });
    text(ctx, value, x, y + 20, o.color ?? color, { size: o.size ?? 27, weight: 600, align: 'center' });
  }
  function step(ctx, x1, x2, y, words, value) {
    arrow(ctx, x1, y, x2, y, PAL.ink, 4);
    text(ctx, value, (x1 + x2) / 2 - 6, y - 21, PAL.ink, { size: 21, weight: 600, align: 'center' });
    words.forEach((w, i) => text(ctx, w, (x1 + x2) / 2 - 6, y + 26 + 24 * i, PAL.muted, { size: 20, align: 'center' }));
  }
  function atom(ctx, x, y, sym) {
    ctx.save(); ctx.beginPath(); ctx.arc(x, y, 19, 0, Math.PI * 2); ctx.fillStyle = F.el(sym); ctx.fill();
    ctx.lineWidth = 1.5; ctx.strokeStyle = PAL.ink; ctx.stroke(); ctx.restore();
    hits.push({ x, y, r: 20, name: `${sym}, ${NAME[sym]}` });
  }

  function draw() {
    const { ctx } = begin(d.c); hits.length = 0;
    const A = S.a, X = S.x, total = M.v, pa = P.v, dec = S.rm[3];
    const ma = (total * pa) / 100, mx = total - ma;
    const na = ma / MM[A], nx = mx / MM[X], low = Math.min(na, nx);
    const ra = na / low, rx = nx / low, w = whole([ra, rx]);
    const formula = w ? sub(A, w.n[0]) + sub(X, w.n[1]) : null;
    const book = Math.abs(pa - S.p) < 0.005;

    /* the sample: its mass split by element (bar 150 to 1250), outlined in the referent's colour while it is the book's */
    const bx0 = 150, bx1 = 1250, by = 112, bh = 46, split = bx0 + (bx1 - bx0) * (pa / 100);
    [[bx0, split, A], [split, bx1, X]].forEach(([x0, x1, sym]) => {
      ctx.save(); ctx.fillStyle = alpha(F.el(sym), 0.45); ctx.fillRect(x0, by, x1 - x0, bh);
      ctx.lineWidth = 2; ctx.strokeStyle = PAL.ink; ctx.strokeRect(x0, by, x1 - x0, bh); ctx.restore();
      if (x1 - x0 > 50) text(ctx, sym, (x0 + x1) / 2, by + bh / 2, PAL.ink, { size: 23, weight: 600, align: 'center' });
    });
    ctx.save(); ctx.lineWidth = 4; ctx.strokeStyle = book ? F.ref(S.ref) : PAL.ink; ctx.strokeRect(bx0 - 3, by - 3, bx1 - bx0 + 6, bh + 6); ctx.restore();
    const barName = book ? S.name : `a sample of ${NAME[A]} and ${NAME[X]}`;
    for (let x = bx0 + 23; x < bx1; x += 46) hits.push({ x, y: by + bh / 2, r: 23, name: barName });
    text(ctx, `${pa.toFixed(2)}% ${A}`, bx0, by + bh + 28, PAL.ink, { size: 21 });
    text(ctx, `${(100 - pa).toFixed(2)}% ${X}`, bx1, by + bh + 28, PAL.ink, { size: 21, align: 'right' });
    F.rich(ctx, ['sample, ', [`${total.toFixed(dec)} g`, C('mass')]], 700, by + bh + 28, { size: 21, align: 'center' });

    /* the chart: mass to moles for each element, joined, divided by the lower, made whole */
    const yA = 296, yX = 456, yM = 376, bhh = 92;
    const xMass = 118, wMass = 204, xMol = 490, wMol = 204, xJoin = 624, xRatio = 924, wRatio = 224, xForm = 1293, wForm = 194;
    [[A, ma, na, yA], [X, mx, nx, yX]].forEach(([sym, m, n, y]) => {
      box(ctx, xMass, y, wMass, bhh, C('mass'), `mass of ${sym} atoms`, `${m.toFixed(dec)} g`);
      box(ctx, xMol, y, wMol, bhh, C('amount'), `moles of ${sym} atoms`, `${sig(n)} mol`);
      step(ctx, xMass + wMass / 2 + 4, xMol - wMol / 2 - 4, y, ['divide by', 'molar mass'], `÷ ${MMS[sym]} g/mol`);
      line(ctx, xMol + wMol / 2, y, xJoin, y, PAL.ink, 4);
    });
    line(ctx, xJoin, yA - 2, xJoin, yX + 2, PAL.ink, 4);
    step(ctx, xJoin, xRatio - wRatio / 2 - 4, yM, ['divide by lowest', 'number of moles'], `÷ ${sig(low)} mol`);
    box(ctx, xRatio, yM, wRatio, bhh, PAL.ink, `${A} to ${X} mole ratio`, `${ra.toFixed(3)} : ${rx.toFixed(3)}`);
    step(ctx, xRatio + wRatio / 2 + 4, xForm - wForm / 2 - 4, yM, ['convert ratio to', 'lowest whole', 'numbers'], w ? `× ${w.k}` : '');
    box(ctx, xForm, yM, wForm, bhh, PAL.ink, 'empirical formula', formula ?? 'not whole', formula ? {} : { color: PAL.muted, size: 23 });

    /* the empirical formula unit, a row of atoms for each element */
    if (w) {
      [[A, w.n[0]], [X, w.n[1]]].forEach(([sym, n], row) => {
        const x1 = xForm + wForm / 2 - 20;
        for (let i = 0; i < n; i++) atom(ctx, x1 - (n - 1 - i) * 42, yM + 122 + row * 46, sym);
      });
    }

    headline(ctx, w
      ? `${formula}: ${atomsOf(w.n[0], A)} for every ${atomsOf(w.n[1], X)}, whatever the mass of the sample.`
      : `${ra.toFixed(3)} mol of ${A} to ${rx.toFixed(3)} mol of ${X} is not a ratio of small whole numbers.`);
    const mol = (n) => hue('amount', `${sig(n)}\\ \\text{mol}`);
    tex(d.readout, `\\kn_{\\text{${A}}} : \\kn_{\\text{${X}}} = ${mol(na)} : ${mol(nx)} = ${ra.toFixed(3)} : ${rx.toFixed(3)}`
      + (w ? ` ${w.exact ? '=' : '\\approx'} ${w.n[0]} : ${w.n[1]}` : ''));
  }
  still(d, draw);
})();
};
