/* Figures for section 12.6 Reaction Mechanisms. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['12.6'] = function (root, F) {
const { el, fmt, tex, C, PAL, alpha, ctl, register, begin, line, text, topline } = F;
const sim = (id, H) => F.sim(root, id, H);
const still = (d, draw) => register(d.fig, { update: () => {}, draw });
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;

/* =====================================================================
   SIM: the two-step mechanism of NO2 + CO below 225 C,
     step 1  NO2 + NO2 -> NO3 + NO   rate1 = k1 [NO2]^2
     step 2  NO3 + CO  -> NO2 + CO2  rate2 = k2 [NO3][CO]
   integrated by RK4 (dt 0.05 s) from [NO2] = [CO] = 0.100 M. CO2 is made
   only in step 2, so the overall rate is rate2. Axes fixed: t 0 to 100 s,
   concentration 0 to 0.100 M, which holds every curve at every slider
   position (no species exceeds the starting 0.100 M). The rate constants
   are illustrative; the book gives none. Still: the graph carries the
   time course and t only marks the moment read.
===================================================================== */
(function () {
  const H = 600;
  const d = sim('sim-slow-step', H);
  const K = { min: 0.2, max: 5, step: 0.1, unit: 'M⁻¹ s⁻¹', dec: 1 };
  const k1 = ctl(d.controls, { ...K, label: '\\kkone', cls: 'rate-constant', value: 0.5, aria: 'rate constant of step 1' });
  const k2 = ctl(d.controls, { ...K, label: '\\kktwo', cls: 'rate-constant', value: 5, aria: 'rate constant of step 2' });
  const tS = ctl(d.controls, { label: '\\kt', cls: 'time', min: 0, max: 100, step: 1, value: 20, unit: 's', dec: 0, aria: 'time' });
  const C0 = 0.1, T = 100, DT = 0.05, N = Math.round(T / DT);
  const SP = [{ i: 0, name: 'NO₂' }, { i: 1, name: 'NO₃' }, { i: 3, name: 'CO₂' }];
  let run = null, key = '';
  /* y = [NO2, NO3, CO, CO2] */
  function rates(y, a, b) {
    const r1 = a * y[0] * y[0], r2 = b * y[1] * y[2];
    return [-2 * r1 + r2, r1 - r2, -r2, r2];
  }
  function integrate(a, b) {
    const out = [[C0, 0, C0, 0]];
    let y = out[0];
    for (let n = 0; n < N; n++) {
      const add = (p, q, h) => p.map((v, i) => v + q[i] * h);
      const f1 = rates(y, a, b), f2 = rates(add(y, f1, DT / 2), a, b), f3 = rates(add(y, f2, DT / 2), a, b), f4 = rates(add(y, f3, DT), a, b);
      y = y.map((v, i) => Math.max(0, v + DT / 6 * (f1[i] + 2 * f2[i] + 2 * f3[i] + f4[i])));
      out.push(y);
    }
    return out;
  }
  const at = (t) => { const x = Math.min(N, Math.max(0, t / DT)), i = Math.min(N - 1, Math.floor(x)), f = x - i; return run[i].map((v, j) => v + (run[i + 1][j] - v) * f); };
  const sci = (v, s) => {
    if (v >= 1e-3 && v < 10) return v.toPrecision(s);
    if (!(v > 0)) return '0';
    let e = Math.floor(Math.log10(v)), m = v / Math.pow(10, e);
    if (+m.toFixed(s - 1) >= 10) { m /= 10; e += 1; }
    return `${m.toFixed(s - 1)} \\times 10^{${e}}`;
  };
  const BOX = { l: 150, r: 1220, t: 240, b: 500 };
  let hits = []; F.hover(d.stage, () => hits);
  function draw() {
    const a = k1.v, b = k2.v, t = tS.v;
    const kk = `${a}|${b}`; if (kk !== key) { key = kk; run = integrate(a, b); }
    const { ctx } = begin(d.c), lab = F.labeller(ctx, H, { headline: true });
    hits = [];
    const ratio = b / a, slow = ratio >= 3 ? 1 : ratio <= 1 / 3 ? 2 : 0;
    topline(ctx, slow === 1 ? 'Step 1 is the slow step: NO₃ is used as fast as it forms, and CO₂ forms at the rate of step 1.'
      : slow === 2 ? 'Step 2 is the slow step: NO₃ piles up, and CO₂ forms only as fast as step 2 uses it.'
      : 'Neither step is much slower than the other, so NO₃ builds up partway before it is used.');
    [['Step 1:', 'NO₂ + NO₂ ⟶ NO₃ + NO', slow === 1 ? '(slow)' : slow === 2 ? '(fast)' : ''],
     ['Step 2:', 'NO₃ + CO ⟶ NO₂ + CO₂', slow === 2 ? '(slow)' : slow === 1 ? '(fast)' : '']].forEach(([s, eq, tag], i) => {
      const y = 122 + i * 36;
      text(ctx, s, BOX.l, y, PAL.muted, { size: 20 });
      text(ctx, eq, BOX.l + 90, y, PAL.ink, { size: 22 });
      if (tag) text(ctx, tag, BOX.l + 410, y, tag === '(slow)' ? PAL.ink : PAL.muted, { size: 20, weight: tag === '(slow)' ? 600 : 400 });
      lab.block(BOX.l - 8, y - 16, BOX.l + 480, y + 16);
    });
    const g = F.axes(ctx, BOX, [0, T], [0, C0], { nx: 5, ny: 5, fy: (v) => fmt(v, 2), xl: 't (s)', xc: C('time'), yl: 'concentration (M)', yc: C('concentration') });
    line(ctx, g.X(t), BOX.t, g.X(t), BOX.b, alpha(PAL.ink, 0.35), 2, [4, 8]);
    const yt = at(t);
    SP.forEach(({ i, name }, n) => {
      const col = F.cat(n);
      F.curve(ctx, (s) => at(s)[i], 0, T, g.X, g.Y, col, 5, 200);
      for (let s = 0; s <= T; s += 2) { const y = g.Y(at(s)[i]); lab.block(g.X(s) - 3, y - 3, g.X(s) + 3, y + 3); }
      lab.add(name, g.X(T), g.Y(run[N][i]), 1, 0, col, 22, 14);
      const px = g.X(t), py = g.Y(yt[i]);
      F.dot(ctx, px, py, col, true, 8);
      hits.push({ x: px, y: py, r: 12, name: `the concentration of ${name} at ${fmt(t, 0)} s` });
    });
    lab.flush();
    const r1 = a * yt[0] * yt[0], r2 = b * yt[1] * yt[2];
    const M = (v) => hue('concentration', `${sci(v, 2)}\\ \\text{M}`), KU = '\\ \\text{M}^{-1}\\,\\text{s}^{-1}', RU = '\\ \\text{M/s}';
    tex(d.readout, `\\krate = {\\krate}_{2} = \\kktwo${hue('concentration', '[\\text{NO}_{3}]')}${hue('concentration', '[\\text{CO}]')} = (${hue('rate-constant', fmt(b, 1) + KU)})(${M(yt[1])})(${M(yt[2])}) = ${hue('rate', sci(r2, 2) + RU)}`);
    const sm = d.readout.appendChild(el('small'));
    tex(sm, `{\\krate}_{1} = \\kkone${hue('concentration', '[\\text{NO}_{2}]')}^{2} = (${hue('rate-constant', fmt(a, 1) + KU)})(${M(yt[0])})^{2} = ${hue('rate', sci(r1, 2) + RU)}`);
  }
  still(d, draw);
})();
};
