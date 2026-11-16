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
   integrated by RK4 (dt 0.05 s) from [NO2] = 0.100 M and [CO]0 on its
   slider (0.100 to 0.300 M, so CO never runs short). CO2 is made only in
   step 2, so it forms at rate2. The dashed curve is the CO2 the book's
   rate law gives, rate = k1 [NO2]^2 with NO3 used as fast as it forms:
   [NO2] = C0 / (1 + k1 C0 t) and [CO2] = C0 - [NO2], which has no [CO]
   in it. Axes fixed: t 0 to 100 s, concentration 0 to 0.100 M, which
   holds every drawn curve at every slider position ([CO] is not drawn).
   The rate constants are illustrative; the book gives none. Still: the
   graph carries the time course and t only marks the moment read.
===================================================================== */
(function () {
  const H = 700;
  const d = sim('sim-slow-step', H);
  const K1 = [0.1, 0.15, 0.2, 0.3, 0.5, 0.7, 1, 1.5, 2];
  const K2 = [0.1, 0.15, 0.2, 0.3, 0.5, 0.7, 1, 1.5, 2, 3, 5, 7, 10, 15, 20, 30, 50];
  const kOf = (list, c) => list[Math.max(0, Math.min(list.length - 1, Math.round(c.v)))];
  const kFmt = (list) => (i) => `${list[Math.max(0, Math.min(list.length - 1, Math.round(i)))]} M⁻¹ s⁻¹`;
  const k1 = ctl(d.controls, { label: '\\kkone', cls: 'rate-constant', key: 'k1', min: 0, max: K1.length - 1, step: 1, value: 4, fmt: kFmt(K1), aria: 'rate constant of step 1' });
  const k2 = ctl(d.controls, { label: '\\kktwo', cls: 'rate-constant', key: 'k2', min: 0, max: K2.length - 1, step: 1, value: 16, fmt: kFmt(K2), aria: 'rate constant of step 2' });
  const cCO = ctl(d.controls, { label: hue('concentration', '[\\text{CO}]_{0}'), cls: 'concentration', key: 'co', min: 0.1, max: 0.3, step: 0.01, value: 0.1, unit: 'M', dec: 3, aria: 'starting concentration of carbon monoxide in mol per liter' });
  const tS = ctl(d.controls, { label: '\\kt', cls: 'time', min: 0, max: 100, step: 1, value: 30, unit: 's', dec: 0, aria: 'time' });
  const C0 = 0.1, T = 100, DT = 0.05, N = Math.round(T / DT);
  const SP = [{ i: 0, name: 'NO₂' }, { i: 1, name: 'NO₃' }, { i: 3, name: 'CO₂' }];
  let run = null, key = '';
  /* y = [NO2, NO3, CO, CO2] */
  function rates(y, a, b) {
    const r1 = a * y[0] * y[0], r2 = b * y[1] * y[2];
    return [-2 * r1 + r2, r1 - r2, -r2, r2];
  }
  function integrate(a, b, co) {
    const out = [[C0, 0, co, 0]];
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
  const BOX = { l: 150, r: 1200, t: 226, b: 622 };
  const LAW = '$\\krate = \\kkone[\\text{NO}_{2}]^{2}$';
  let hits = []; F.hover(d.stage, () => hits);
  function draw() {
    const a = kOf(K1, k1), b = kOf(K2, k2), co = cCO.v, t = tS.v;
    const kk = `${a}|${b}|${co}`; if (kk !== key) { key = kk; run = integrate(a, b, co); }
    const { ctx } = begin(d.c);
    hits = [];
    /* which step is the slow one: how fast step 2 can use NO3 against how fast step 1 makes it, at the start */
    const R = (b * co) / (a * C0), slow = R >= 20 ? 1 : R <= 0.5 ? 2 : 0;
    topline(ctx, slow === 1 ? `Step 1 is the slow step: NO₃ is used as fast as it forms, so CO₂ follows ${LAW} and extra CO changes nothing.`
      : slow === 2 ? `Step 2 is the slow step: NO₃ piles up, and CO₂ forms more slowly than ${LAW} gives.`
      : `Neither step is much slower than the other: NO₃ builds up partway, and CO₂ lags behind ${LAW}.`);
    [['Step 1', 'NO₂ + NO₂ ⟶ NO₃ + NO', slow === 1 ? '(slow)' : slow === 2 ? '(fast)' : ''],
     ['Step 2', 'NO₃ + CO ⟶ NO₂ + CO₂', slow === 2 ? '(slow)' : slow === 1 ? '(fast)' : '']].forEach(([s, eq, tag], i) => {
      const y = 126 + i * 38;
      text(ctx, s, BOX.l, y, PAL.muted, { size: 22 });
      text(ctx, eq, BOX.l + 96, y, PAL.ink, { size: 24 });
      if (tag) text(ctx, tag, BOX.l + 440, y, tag === '(slow)' ? PAL.ink : PAL.muted, { size: 22, weight: tag === '(slow)' ? 700 : 400 });
    });
    const g = F.axes(ctx, BOX, [0, T], [0, C0], { nx: 5, ny: 5, fy: (v) => fmt(v, 2), xl: 't (s)', xc: C('time'), yl: 'concentration (M)', yc: C('concentration') });
    line(ctx, g.X(t), BOX.t, g.X(t), BOX.b, alpha(PAL.ink, 0.35), 2, [4, 8]);
    const yt = at(t);
    SP.forEach(({ i, name }, n) => {
      const col = F.cat(n);
      F.plot(ctx, g, (s) => at(s)[i], col, { w: 5 });
      const px = g.X(t), py = g.Y(yt[i]);
      F.dot(ctx, px, py, col, true, 8);
      hits.push({ x: px, y: py, r: 12, name: `[${name}] at ${fmt(t, 0)} s: ${fmt(yt[i], 4)} M` });
    });
    /* the CO2 the rate law alone gives, in ink over the curves so that it shows where the real CO2 lies on it */
    F.plot(ctx, g, (s) => C0 - C0 / (1 + a * C0 * s), PAL.ink, { w: 2.5, dash: [10, 10] });
    F.legend(ctx, g, [{ s: 'CO₂ if rate = k₁[NO₂]²', color: PAL.ink, w: 2.5, dash: [10, 10] }], { corner: 'above', size: 20 });
    /* each curve is named at its right end; names step apart where the ends crowd, each tied to its curve by a short leader */
    const ends = SP.map(({ i }, n) => ({ n, y: g.Y(run[N][i]) })).sort((u, v) => u.y - v.y), ys = ends.map((e) => e.y);
    for (let q = 0; q < 8; q++) for (let j = 1; j < ys.length; j++) { const lack = 30 - (ys[j] - ys[j - 1]); if (lack > 0) { ys[j - 1] -= lack / 2; ys[j] += lack / 2; } }
    const over = Math.max(0, ys[ys.length - 1] - (BOX.b - 2));
    if (F.arrival(d) >= 1) ends.forEach((e, j) => {
      line(ctx, BOX.r + 4, e.y, BOX.r + 30, ys[j] - over, alpha(F.cat(e.n), 0.7), 2);
      text(ctx, SP[e.n].name, BOX.r + 38, ys[j] - over, F.cat(e.n), { size: 22 });
    });
    const r1 = a * yt[0] * yt[0], r2 = b * yt[1] * yt[2];
    const M = (v) => hue('concentration', `${sci(v, 2)}\\ \\text{M}`), KU = '\\ \\text{M}^{-1}\\,\\text{s}^{-1}', RU = '\\ \\text{M/s}';
    tex(d.readout, `{\\krate}_{1} = \\kkone${hue('concentration', '[\\text{NO}_{2}]')}^{2} = (${hue('rate-constant', a + KU)})(${M(yt[0])})^{2} = ${hue('rate', sci(r1, 2) + RU)}`
      + ` \\\\ {\\krate}_{2} = \\kktwo${hue('concentration', '[\\text{NO}_{3}]')}${hue('concentration', '[\\text{CO}]')} = (${hue('rate-constant', b + KU)})(${M(yt[1])})(${M(yt[2])}) = ${hue('rate', sci(r2, 2) + RU)}`);
  }
  still(d, draw);
})();
};
