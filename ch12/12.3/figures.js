/* Figures for section 12.3 Rate Laws. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['12.3'] = function (root, F) {
const { fmt, C, PAL, alpha, ctl, register, begin, line, text, topline } = F;
const sim = (id, H) => F.sim(root, id, H);
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;

/* =====================================================================
   SIM: the method of initial rates on Example 12.5's three trials.
   Each graph is one step of the example: one concentration raised from
   trial 1's 0.10 M with the other held there. Through trial 1 run the
   three rate laws an order of 0, 1 or 2 would give, rate (10^-3 mol L^-1 s^-1)
   = 3.00 (c/0.10)^order; the chosen one is heavy and carries the dot, the
   rate that law gives at the slider's concentration. Brackets from trial 1
   to the dot say how many times the concentration and the rate have grown,
   so 1.5 times the NO giving 2.25 times the rate reads as m = 2.
   Axes fixed: concentration 0 to 0.20 M (the slider's maximum, twice
   trial 1), rate 0 to 12 (3.00 x 2^2 at 0.20 M with order 2). Still: no clock.
===================================================================== */
(function () {
  const d = sim('sim-initial-rates', 510);
  const conc = (name, key, aria) => ctl(d.controls, { label: hue('concentration', name), cls: 'concentration', key, min: 0.1, max: 0.2, step: 0.01, value: 0.15, unit: 'M', dec: 2, detents: [0.15, 0.2], aria });
  const ORD = [0, 1, 2].map((v) => ({ value: String(v), label: String(v) }));
  const A = conc('[\\text{NO}]', 'no', 'concentration of NO, in moles per liter');
  const B = conc('[\\text{Cl}_{2}]', 'cl2', 'concentration of Cl2, in moles per liter');
  const mO = F.choice(d.controls, { label: 'm', key: 'm', options: ORD, value: '2', aria: 'order of the reaction in NO' });
  const nO = F.choice(d.controls, { label: 'n', key: 'n', options: ORD, value: '1', aria: 'order of the reaction in Cl2' });
  const R1 = 3.0, C0 = 0.1, XR = [0, 0.2], YR = [0, 12];
  const law = (c, order) => R1 * Math.pow(c / C0, order);
  const times = (v) => String(+v.toFixed(2));
  const KUNIT = ['\\text{mol L}^{-1}\\,\\text{s}^{-1}', '\\text{s}^{-1}', '\\text{L mol}^{-1}\\,\\text{s}^{-1}', '\\text{L}^{2}\\,\\text{mol}^{-2}\\,\\text{s}^{-1}', '\\text{L}^{3}\\,\\text{mol}^{-3}\\,\\text{s}^{-1}'];
  const sci = (v, dec) => {
    let e = Math.floor(Math.log10(v)), m = v / Math.pow(10, e);
    if (+m.toFixed(dec) >= 10) { m /= 10; e += 1; }
    return e === 0 ? m.toFixed(dec) : `${m.toFixed(dec)} \\times 10^{${e}}`;
  };
  /* each step of the example: the species raised, the species held, the order's letter, the trial measured at 0.15 M */
  const STEPS = [
    { box: { l: 110, r: 590, t: 150, b: 450 }, sp: '[NO]', held: '[Cl_{2}]', letter: 'm', trial: { id: 'trial-3', n: 3, c: 0.15, r: 6.75 } },
    { box: { l: 810, r: 1290, t: 150, b: 450 }, sp: '[Cl_{2}]', held: '[NO]', letter: 'n', trial: { id: 'trial-2', n: 2, c: 0.15, r: 4.5 } },
  ];
  const ro = F.readout(d);
  let hits = [];
  F.hover(d.stage, () => hits);
  const ring = (ctx, x, y, col) => { ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(x, y, 14, 0, 2 * Math.PI); ctx.stroke(); ctx.restore(); };
  function panel(ctx, lab, s, c, order, orderE) {
    const cr = C('rate'), cc = C('concentration'), box = s.box, guide = alpha(PAL.ink, 0.35);
    const g = F.axes(ctx, box, XR, YR, { nx: 4, ny: 4, fx: (v) => fmt(v, 2), xl: s.sp + ' (M)', xc: cc, yl: 'rate (10⁻³ mol L⁻¹ s⁻¹)', yc: cr });
    F.rich(ctx, [s.held + ' held at ', ['0.10 M', cc]], box.r, box.t - 24, { size: 20, align: 'right' });
    /* the three rate laws through trial 1, one per order, the chosen one heavy */
    [0, 1, 2].forEach((o) => {
      F.curve(ctx, (x) => law(x, o), XR[0], XR[1], g.X, g.Y, alpha(cr, 0.3), 2.5, 80);
      text(ctx, `${s.letter} = ${o}`, box.r + 18, Math.max(g.Y(law(XR[1], o)), box.t + 10), o === order ? PAL.ink : PAL.muted, { size: 20, weight: o === order ? 600 : 400, base: 'middle' });
      hits.push({ x: g.X(0.185), y: g.Y(law(0.185, o)), r: 14, name: `the rate law through trial 1 if ${s.letter} = ${o}` });
    });
    F.curve(ctx, (x) => law(x, orderE), XR[0], XR[1], g.X, g.Y, cr, 5, 120);
    const x1 = g.X(C0), y1 = g.Y(R1), px = g.X(c), py = g.Y(law(c, orderE)), r = law(c, order) / R1;
    [[x1, y1], [px, py]].forEach(([x, y]) => { line(ctx, x, y, x, box.b, guide, 2, [4, 8]); line(ctx, x, y, box.l, y, guide, 2, [4, 8]); });
    /* how many times the concentration and the rate have grown since trial 1 */
    const by = g.Y(1.1), bx = g.X(0.028);
    if (c > C0 + 0.005) {
      const run = `${s.sp} × ${times(c / C0)}`, half = F.measure(ctx, run, { size: 22, weight: 600 }) / 2;
      F.hbracket(ctx, x1, px, by, cc);
      text(ctx, run, Math.max((x1 + px) / 2, x1 + 10 + half), by - 24, cc, { size: 22, weight: 600, align: 'center', base: 'middle' });
      F.vbracket(ctx, bx, y1, py, cr);
      const rise = `rate × ${times(r)}`, wy = y1 - py < 44 ? py - 18 : (y1 + py) / 2;
      text(ctx, rise, bx + 16, wy, cr, { size: 22, weight: 600, base: 'middle' });
      lab.block(bx - 12, Math.min(wy - 16, py), bx + 30 + F.measure(ctx, rise, { size: 22, weight: 600 }), y1);
    }
    for (let x = XR[0]; x <= XR[1]; x += 0.004) [0, 1, 2].forEach((o) => { const yy = g.Y(law(x, o)); lab.block(g.X(x) - 3, yy - 3, g.X(x) + 3, yy + 3); });
    /* the measured trials, rings in their referent colours; the dot is the chosen law's rate.
       The second trial's name sits below and right of its ring, between the first-order line and the curve above it. */
    const t1 = F.ref('trial-1'), t2 = F.ref(s.trial.id), tx = g.X(s.trial.c), ty = g.Y(s.trial.r);
    ring(ctx, x1, y1, t1); ring(ctx, tx, ty, t2);
    F.dot(ctx, px, py, cr, true, 9);
    lab.add('trial 1', x1, y1, -0.5, -0.85, t1, 20, 30);
    text(ctx, 'trial ' + s.trial.n, tx + 20, ty + 17, t2, { size: 20, weight: 600, base: 'middle', bg: PAL.panel });
    hits.push({ x: x1, y: y1, r: 16, name: 'trial 1 of Example 12.5: 0.00300 mol L⁻¹ s⁻¹' });
    hits.push({ x: tx, y: ty, r: 16, name: `trial ${s.trial.n} of Example 12.5: ${fmt(s.trial.r / 1000, 5)} mol L⁻¹ s⁻¹` });
    hits.push({ x: px, y: py, r: 12, name: `the rate this rate law gives: ${fmt(law(c, order) / 1000, 5)} mol L⁻¹ s⁻¹` });
  }
  function draw() {
    const { ctx, H } = begin(d.c), lab = F.labeller(ctx, H, { headline: true });
    hits = [];
    const a = A.v, b = B.v, m = +mO.value, n = +nO.value;
    panel(ctx, lab, STEPS[0], a, m, mO.mix((v) => +v));
    panel(ctx, lab, STEPS[1], b, n, nO.mix((v) => +v));
    lab.flush();
    const okM = m === 2, okN = n === 1;
    const miss = (letter, o, t, got) => `With $${letter} = ${o}$ the rate law puts trial ${t} at ${times(Math.pow(1.5, o))} times the rate of trial 1, and ${got} times was measured.`;
    topline(ctx, okM && okN ? `With $m = ${m}$ and $n = ${n}$ the rate law passes through all three trials.`
      : okN ? miss('m', m, 3, '2.25') : okM ? miss('n', n, 2, '1.5')
      : `With $m = ${m}$ and $n = ${n}$ the rate law misses trials 2 and 3.`);
    const M = (v) => hue('concentration', fmt(v, 2) + '\\ \\text{M}');
    const step = (sp, c, o) => `\\dfrac{\\krate}{{\\krate}_{1}} = \\left(\\dfrac{${hue('concentration', sp)}}{${hue('concentration', sp + '_{1}')}}\\right)^{${o}} = \\left(\\dfrac{${M(c)}}{${M(C0)}}\\right)^{${o}} = ${times(Math.pow(c / C0, o))}`;
    const x = m + n, k = R1 * 1e-3 / Math.pow(C0, x);
    ro.set(`${step('[\\text{NO}]', a, m)} \\\\ ${step('[\\text{Cl}_{2}]', b, n)} \\\\ `
      + `\\kk = \\dfrac{{\\krate}_{1}}{${hue('concentration', '[\\text{NO}]_{1}')}^{${m}}${hue('concentration', '[\\text{Cl}_{2}]_{1}')}^{${n}}} = \\dfrac{${hue('rate', '0.00300\\ \\text{mol L}^{-1}\\,\\text{s}^{-1}')}}{(${M(C0)})^{${m}}(${M(C0)})^{${n}}} = ${hue('rate-constant', (x ? String(+k.toPrecision(2)).replace(/^(\d)$/, '$1.0').replace(/^(0\.0*\d)$/, '$10') : sci(k, 1)) + '\\ ' + KUNIT[x])}`, undefined, { form: `${m}${n}` });
  }
  register(d.fig, { update: () => {}, draw });
})();
};
