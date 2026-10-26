/* Figures for section 12.3 Rate Laws. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['12.3'] = function (root, F) {
const { el, fmt, tex, C, PAL, alpha, ctl, register, begin, line, text, topline } = F;
const sim = (id, H) => F.sim(root, id, H);
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;

/* =====================================================================
   SIM: the method of initial rates on Example 12.5's three trials.
   A stands for NO and B for Cl2. Rate in 10^-3 mol L^-1 s^-1 is
   3.00 (a/0.10)^m (b/0.10)^n, so k = 3.00e-3 / 0.10^(m+n) is the value
   trial 1 gives for any orders. Axes fixed: concentration 0 to 0.20 M,
   rate 0 to 16, which holds both sliders at their 0.15 M maximum with
   both orders 2 (3.00 x 1.5^4 = 15.2); past 0.15 M the curve runs off
   the top under a clip. Still: no clock.
===================================================================== */
(function () {
  const d = sim('sim-initial-rates', 510);
  const A = ctl(d.controls, { label: '\\kconcA', cls: 'concentration', min: 0.02, max: 0.15, step: 0.01, value: 0.1, unit: 'M', dec: 2, detents: [0.1, 0.15], aria: 'concentration of A, in moles per liter' });
  const B = ctl(d.controls, { label: '\\kconcB', cls: 'concentration', min: 0.02, max: 0.15, step: 0.01, value: 0.1, unit: 'M', dec: 2, detents: [0.1, 0.15], aria: 'concentration of B, in moles per liter' });
  const ORD = [0, 1, 2].map((v) => ({ value: String(v), label: String(v) }));
  const mO = F.choice(d.controls, { label: 'm', key: 'm', options: ORD, value: '2', aria: 'order of the reaction in A' });
  const nO = F.choice(d.controls, { label: 'n', key: 'n', options: ORD, value: '1', aria: 'order of the reaction in B' });
  const R1 = 3.0, C0 = 0.1, XR = [0, 0.2], YR = [0, 16];
  const TRIALS = [
    { id: 'trial-1', n: 1, a: 0.1, b: 0.1, r: 3.0 },
    { id: 'trial-2', n: 2, a: 0.1, b: 0.15, r: 4.5 },
    { id: 'trial-3', n: 3, a: 0.15, b: 0.1, r: 6.75 },
  ];
  const rateOf = (a, b, m, n) => R1 * Math.pow(a / C0, m) * Math.pow(b / C0, n);
  const at = (v, w) => Math.abs(v - w) < 0.005;
  const KUNIT = ['\\text{mol L}^{-1}\\,\\text{s}^{-1}', '\\text{s}^{-1}', '\\text{L mol}^{-1}\\,\\text{s}^{-1}', '\\text{L}^{2}\\,\\text{mol}^{-2}\\,\\text{s}^{-1}', '\\text{L}^{3}\\,\\text{mol}^{-3}\\,\\text{s}^{-1}'];
  const sci = (v, dec) => {
    let e = Math.floor(Math.log10(v)), m = v / Math.pow(10, e);
    if (+m.toFixed(dec) >= 10) { m /= 10; e += 1; }
    return e === 0 ? m.toFixed(dec) : `${m.toFixed(dec)} \\times 10^{${e}}`;
  };
  const LB = { l: 130, r: 640, t: 140, b: 420 }, RB = { l: 830, r: 1340, t: 140, b: 420 };
  let hits = [];
  F.hover(d.stage, () => hits);
  function panel(ctx, lab, box, xl, held, heldOk, f, pts, cur) {
    const cr = C('rate'), cc = C('concentration');
    const g = F.axes(ctx, box, XR, YR, { nx: 4, ny: 4, fx: (v) => fmt(v, 2), xl, xc: cc, yl: 'rate (10⁻³ mol L⁻¹ s⁻¹)', yc: cr });
    text(ctx, held, box.r, box.t - 24, PAL.muted, { size: 18, align: 'right' });
    ctx.save(); ctx.beginPath(); ctx.rect(box.l, box.t - 4, box.r - box.l, box.b - box.t + 8); ctx.clip();
    F.curve(ctx, (x) => Math.min(f(x), YR[1] + 1), XR[0], XR[1], g.X, g.Y, cr, 5, 120);
    ctx.restore();
    for (let x = XR[0]; x <= XR[1]; x += 0.004) { const y = f(x); if (y <= YR[1]) lab.block(g.X(x) - 3, g.Y(y) - 3, g.X(x) + 3, g.Y(y) + 3); }
    const px = g.X(cur.x), py = g.Y(cur.y);
    line(ctx, px, py, px, box.b, alpha(PAL.ink, 0.35), 2, [4, 8]);
    line(ctx, px, py, box.l, py, alpha(PAL.ink, 0.35), 2, [4, 8]);
    for (const t of pts) {
      const tx = g.X(t.x), ty = g.Y(t.r), col = F.ref(t.id);
      F.faded(ctx, heldOk ? 1 : 0.3, [0, 0], () => { ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(tx, ty, 15, 0, 2 * Math.PI); ctx.stroke(); ctx.restore(); });
      if (heldOk) lab.add('trial ' + t.n, tx, ty, -0.7, -0.7, col, 20, 26);
      hits.push({ x: tx, y: ty, r: 16, name: `trial ${t.n} of Example 12.5: ${fmt(t.r / 1000, 5)} mol L⁻¹ s⁻¹` });
    }
    F.dot(ctx, px, py, cr, true, 9);
    hits.push({ x: px, y: py, r: 12, name: 'the rate at the chosen concentrations' });
    return g;
  }
  function draw() {
    const { ctx, H } = begin(d.c), lab = F.labeller(ctx, H, { headline: true });
    hits = [];
    const a = A.v, b = B.v, m = +mO.value, n = +nO.value;
    const mE = mO.mix((v) => +v), nE = nO.mix((v) => +v);
    const r = rateOf(a, b, m, n);
    const missed = TRIALS.filter((t) => Math.abs(rateOf(t.a, t.b, m, n) - t.r) > 0.01).map((t) => t.n);
    const lg = panel(ctx, lab, LB, '[A] (M)', `at [B] = ${fmt(b, 2)} M`, at(b, C0), (x) => rateOf(x, b, mE, nE),
      TRIALS.filter((t) => t.b === C0).map((t) => ({ ...t, x: t.a })), { x: a, y: rateOf(a, b, mE, nE) });
    panel(ctx, lab, RB, '[B] (M)', `at [A] = ${fmt(a, 2)} M`, at(a, C0), (x) => rateOf(a, x, mE, nE),
      TRIALS.filter((t) => t.a === C0).map((t) => ({ ...t, x: t.b })), { x: b, y: rateOf(a, b, mE, nE) });
    lab.add('rate law', lg.X(0.05), lg.Y(rateOf(0.05, b, mE, nE)), -0.3, -1, C('rate'), 20, 30);
    lab.flush();
    const ords = `$m = ${m}$ and $n = ${n}$`;
    topline(ctx, !missed.length ? `The rate law with ${ords} passes through all three trials.`
      : `The rate law with ${ords} misses trial${missed.length > 1 ? 's' : ''} ${missed.join(' and ')}.`);
    const x = m + n;
    tex(d.readout, `\\krate = \\kk\\kconcA^{${m}}\\kconcB^{${n}} = (${hue('rate-constant', sci(R1 * 1e-3 / Math.pow(C0, x), 1) + '\\ ' + KUNIT[x])})(${hue('concentration', fmt(a, 2) + '\\ \\text{M}')})^{${m}}(${hue('concentration', fmt(b, 2) + '\\ \\text{M}')})^{${n}} = ${hue('rate', sci(r * 1e-3, 2) + '\\ \\text{mol L}^{-1}\\,\\text{s}^{-1}')}`);
    const sm = d.readout.appendChild(el('small'));
    tex(sm, `\\text{overall order: } m + n = ${m} + ${n} = ${x}`);
  }
  register(d.fig, { update: () => {}, draw });
})();
};
