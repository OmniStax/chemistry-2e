/* Figures for section 13.2 Equilibrium Constants. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['13.2'] = function (root, F) {
const { fmt, C, PAL, alpha, ctl, register, begin, line, dot, text, topline, cycle } = F;
const sim = (id, H) => F.sim(root, id, H);
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;
const sig = (v, n = 3) => v === 0 ? '0' : v.toFixed(Math.max(0, n - 1 - Math.floor(Math.log10(Math.abs(v)))));
const sciParts = (v, n = 2) => { let e = Math.floor(Math.log10(Math.abs(v))), m = +(v / 10 ** e).toFixed(n - 1); if (m >= 10) { m /= 10; e += 1; } return [m.toFixed(n - 1), e]; };
const sciTex = (v, n = 2) => { const [m, e] = sciParts(v, n); return e >= -2 && e <= 1 ? sig(v, n) : `${m} \\times 10^{${e}}`; };
const SUPD = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
const concTex = (v) => v >= 0.001 || v === 0 ? sig(v) : sciTex(v, 3);
const concTxt = (v) => { if (v >= 0.001 || v === 0) return sig(v); const [m, e] = sciParts(v, 3); return `${m} × 10${String(e).split('').map((ch) => SUPD[ch]).join('')}`; };
function clipTo(ctx, b, f) { ctx.save(); ctx.beginPath(); ctx.rect(b.l, b.t, b.r - b.l, b.b - b.t); ctx.clip(); f(); ctx.restore(); }
function rect(ctx, l, t, r, b, fill, stroke, dash) {
  ctx.save();
  if (fill) { ctx.fillStyle = fill; ctx.fillRect(l, t, r - l, b - t); }
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = 2; if (dash) ctx.setLineDash(dash); ctx.strokeRect(l, t, r - l, b - t); }
  ctx.restore();
}
const conc = (s) => hue('concentration', s);

/* =====================================================================
   FIGURE 13.5: 2SO2 + O2 ⇌ 2SO3 run from three starts on one clock.
   Reactants only ([SO2]0 = 1.00 M, [O2]0 = 0.50 M) and product only
   ([SO3]0 = 1.00 M) are the book's panels (a) and (b): the same atoms
   written two ways, so both end at [SO3] = 0.598 M, [SO2] = 0.402 M,
   [O2] = 0.201 M. K_c = 11 is read from the book's image: with the starting
   [SO2] 280 px above the axis the plateaus stand 167, 112.5 and 56.5 px up
   (0.596, 0.402, 0.202), and 0.598² / (0.402² × 0.201) = 11.0 (the book
   prints no value). The third start, all three gases with O2 in excess
   (0.30, 0.90, 0.30 M), ends at other concentrations and the same K_c.
   Net rate k_f[SO2]²[O2] − k_r[SO3]², k_f = 1 and k_r = k_f/K_c in model
   time, integrated by RK4 at load. The time axis is unnumbered, as the
   book's. Axes fixed: concentration 0 to 1.00 M, Q_c 0 to 20 (K_c a little
   over half way up, where the book draws it; larger values leave through
   the top edge).
===================================================================== */
(function () {
  const d = sim('sim-quotient', 840);
  const K = 11, KR = 1 / K, N = 1400, TMAX = 12, QMAX = 20;
  const rhs = (c) => { const r = c[0] * c[0] * c[1] - KR * c[2] * c[2]; return [-2 * r, -r, 2 * r]; };
  const Qof = (c) => c[2] * c[2] / (c[0] * c[0] * c[1]);
  function integrate(s0, T) {
    const out = [s0.slice()], dt = T / N; let s = s0.slice();
    for (let i = 0; i < N; i++) {
      const k1 = rhs(s), k2 = rhs(s.map((v, j) => v + dt / 2 * k1[j])), k3 = rhs(s.map((v, j) => v + dt / 2 * k2[j])), k4 = rhs(s.map((v, j) => v + dt * k3[j]));
      s = s.map((v, j) => v + dt / 6 * (k1[j] + 2 * k2[j] + 2 * k3[j] + k4[j])); out.push(s.slice());
    }
    return out;
  }
  const STARTS = [
    { value: 'r', label: 'reactants only', c0: [1, 0.5, 0], from: 'reactants only' },
    { value: 'p', label: 'product only', c0: [0, 0, 1], from: 'product only' },
    { value: 'm', label: 'all three gases', c0: [0.3, 0.9, 0.3], from: 'all three gases' },
  ];
  const RUNS = {}, TEQ = {};
  STARTS.forEach((s) => { RUNS[s.value] = integrate(s.c0, TMAX); TEQ[s.value] = RUNS[s.value].findIndex((c) => Math.abs(Qof(c) - K) / K < 0.01) * TMAX / N; });
  const at = (run, t) => { const x = Math.min(N, Math.max(0, t / TMAX * N)), i = Math.min(N - 1, Math.floor(x)), f = x - i; return run[i].map((v, j) => v + f * (run[i + 1][j] - v)); };
  const SP = [{ id: 'so2', name: '[SO_{2}]' }, { id: 'o2', name: '[O_{2}]' }, { id: 'so3', name: '[SO_{3}]' }];
  const cy = cycle(() => 5, 1.2);
  const start = F.choice(d.controls, { label: '\\text{start}', aria: 'the starting mixture', value: 'r',
    options: STARTS.map(({ value, label }) => ({ value, label })), onInput: () => cy.reset() });
  const G1 = { l: 150, r: 1300, t: 130, b: 370 }, G2 = { l: 150, r: 1300, t: 470, b: 770 };
  const qTxt = (q) => q < 0.095 ? sig(q, 2) : q < 9.95 ? fmt(q, 1) : fmt(q, 0);
  let hits = [];
  F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c);
    hits = [];
    const key = start.value, run = RUNS[key];
    const tau = cy.now(), t = Number.isFinite(tau) ? tau / 5 * TMAX : TMAX;
    const cK = C('equilibrium-constant'), ct = C('time'), cc = C('concentration'), guide = alpha(PAL.ink, 0.4);
    const blank = () => '';
    const g1 = F.axes(ctx, G1, [0, TMAX], [0, 1], { nx: 4, ny: 4, fx: blank, fy: (v) => fmt(v, 2), yl: 'concentration (M)', yc: cc });
    const g2 = F.axes(ctx, G2, [0, TMAX], [0, QMAX], { nx: 4, ny: 4, fx: blank, fy: (v) => fmt(v, 0), yl: 'reaction quotient, Q_{c}', yc: cK });
    text(ctx, 'time', G2.r, G2.b + 30, ct, { size: 20, weight: 600, align: 'right' });
    const reached = t >= TEQ[key];
    if (reached) {
      const x = g1.X(TEQ[key]);
      line(ctx, x, G1.t, x, G1.b, guide, 2, [10, 10]); line(ctx, x, G2.t, x, G2.b, guide, 2, [10, 10]);
      text(ctx, 'equilibrium is reached', x + 12, G2.b - 24, PAL.ink, { size: 18, bg: PAL.panel });
    }
    clipTo(ctx, G2, () => {
      line(ctx, G2.l, g2.Y(K), G2.r, g2.Y(K), cK, 3, [10, 10]);
      STARTS.filter((s) => s.value !== key).forEach((s) => F.curve(ctx, (x) => Qof(at(RUNS[s.value], x)), 0.002, TMAX, g2.X, g2.Y, alpha(cK, 0.3), 3, 300));
      F.curve(ctx, (s) => Qof(at(run, s)), 0.002, t, g2.X, g2.Y, cK, 5, 300);
    });
    STARTS.forEach((s) => [1.2, 2.6, 4].forEach((x) => { const q = Qof(at(RUNS[s.value], x)); if (q < QMAX) hits.push({ x: g2.X(x), y: g2.Y(q), r: 16, name: 'the reaction quotient starting from ' + s.from }); }));
    text(ctx, `$\\kKc$ = ${K}`, G2.r - 14, g2.Y(K) - 22, PAL.ink, { size: 20, align: 'right', bg: PAL.panel, tex: true });
    SP.forEach((s, j) => F.curve(ctx, (x) => at(run, x)[j], 0, t, g1.X, g1.Y, F.ref(s.id), 5, 300));
    const now = at(run, t), q = Qof(now);
    SP.forEach((s, j) => dot(ctx, g1.X(t), g1.Y(now[j]), F.ref(s.id), true, 8));
    if (q <= QMAX) dot(ctx, g2.X(t), g2.Y(q), cK, true, 9);
    else F.pinned(ctx, G2, g2.X, g2.Y, t, q, cK);
    F.legend(ctx, g1, SP.map((s) => ({ s: s.name, color: F.ref(s.id), w: 5 })), { corner: 'above' });
    const q0 = Qof(STARTS.find((s) => s.value === key).c0);
    topline(ctx, reached ? (key === 'm' ? 'This mixture settles at other concentrations, and $\\kQc$ still stops at $\\kKc$.' : '$\\kQc$ has reached $\\kKc$, and the concentrations no longer change.')
      : key === 'r' ? 'Starting from reactants only, $\\kQc$ climbs from 0 toward $\\kKc$.'
      : key === 'p' ? 'Starting from product only, $\\kQc$ falls from an immeasurably large value toward $\\kKc$.'
      : `Starting from all three gases, $\\kQc$ climbs from ${qTxt(q0)} toward $\\kKc$.`);
    const r3 = now.map((v) => +v.toFixed(3)), shown = r3.map((v) => conc(v.toFixed(3)));
    const expr = '\\frac{[\\text{SO}_{3}]^{2}}{[\\text{SO}_{2}]^{2}[\\text{O}_{2}]}';
    const nums = `\\frac{(${shown[2]})^{2}}{(${shown[0]})^{2}(${shown[1]})}`;
    let tail;
    if (r3[2] === 0) tail = '= 0';
    else if (r3[0] === 0 || r3[1] === 0) tail = '\\to \\infty';
    else tail = `= ${hue('equilibrium-constant', qTxt(r3[2] * r3[2] / (r3[0] * r3[0] * r3[1])))}` + (reached ? ' = \\kKc' : '');
    F.tex(d.readout, `\\kQc = ${expr} = ${nums} ${tail}`);
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();

/* =====================================================================
   FIGURE 13.6: CO + H2O ⇌ CO2 + H2, K_c = 0.640 at 800 °C, the book's
   three mixtures, one row each: its composition as a stacked bar (the
   book's order CO, H2O, CO2, H2, on the book's 0 to 0.10 M scale) and,
   beside it, its Q_c on a log track that the three rows share. Each
   concentration runs in a straight line from the book's "before reaction"
   value to its "at equilibrium" value as the progress slider goes 0 to
   100 %, all three mixtures together. The track is log10 Q from −4 to 4;
   Q = 0 and Q → ∞ stand past its ends, across a break.
===================================================================== */
(function () {
  const d = sim('sim-mixtures', 610);
  const KC = 0.640;
  const IDS = ['co', 'h2o', 'co2', 'h2'], NAMES = ['[CO]', '[H₂O]', '[CO₂]', '[H₂]'];
  const MIX = [
    { a: [0.0243, 0.0243, 0, 0], b: [0.0135, 0.0135, 0.0108, 0.0108] },
    { a: [0, 0, 0.0468, 0.0468], b: [0.0260, 0.0260, 0.0208, 0.0208] },
    { a: [0.0330, 0.0190, 0.00175, 0.00160], b: [0.0231, 0.00909, 0.0115, 0.0117] },
  ];
  const pick = F.choice(d.controls, { label: '\\text{mixture}', aria: 'the mixture whose reaction quotient is written out', value: '1',
    options: [{ value: '1', label: 'Mixture 1' }, { value: '2', label: 'Mixture 2' }, { value: '3', label: 'Mixture 3' }] });
  const pr = ctl(d.controls, { label: '\\text{progress}', cls: '', key: 'progress', min: 0, max: 100, step: 1, value: 0, unit: '%', dec: 0,
    aria: 'how far the mixtures have gone toward equilibrium, in percent', specials: [{ at: 100, label: 'equilibrium' }] });
  const B = { l: 170, r: 770 }, BX = (v) => B.l + v / 0.10 * (B.r - B.l);
  const S = { l: 926, r: 1306 }, LMIN = -4, LMAX = 4, X0 = S.l - 56, XINF = S.r + 56;
  const SX = (lq) => S.l + (lq - LMIN) / (LMAX - LMIN) * (S.r - S.l);
  const ROWS = [222, 342, 462], BH = 60, AX = 524, TOP = 176;
  const Qof = (c) => c[0] * c[1] === 0 ? (c[2] * c[3] === 0 ? NaN : Infinity) : c[2] * c[3] / (c[0] * c[1]);
  const xOfQ = (q) => q === 0 ? X0 : q === Infinity ? XINF : SX(Math.min(LMAX, Math.max(LMIN, Math.log10(q))));
  const stateOf = (m, p) => MIX[m].a.map((v, j) => v + p * (MIX[m].b[j] - v));
  const qTxt = (q) => q === 0 ? '0' : q === Infinity ? '∞' : q >= 0.001 && q < 1000 ? sig(q) : concTxt2(q);
  const concTxt2 = (v) => { const [m, e] = sciParts(v, 3); return `${m} × 10${String(e).split('').map((ch) => SUPD[ch]).join('')}`; };
  const SUP = { '-4': '10⁻⁴', '-2': '10⁻²', '0': '1', '2': '10²', '4': '10⁴' };
  let hits = [];
  F.hover(d.stage, () => hits);
  function bar(ctx, i, c, on) {
    const y = ROWS[i], t = y - BH / 2, b = y + BH / 2;
    let v0 = 0, right = -Infinity;
    const thin = [];
    c.forEach((v, j) => {
      const col = F.ref(IDS[j]), l = BX(v0), r = BX(v0 + v); v0 += v;
      if (!(v > 0)) return;
      rect(ctx, l, t, r, b, alpha(col, 0.3), null);
      ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = 2.5; ctx.strokeRect(l + 1.25, t + 1.25, Math.max(0.5, r - l - 2.5), BH - 2.5); ctx.restore();
      hits.push({ x: (l + r) / 2, y, r: Math.max(12, Math.min(30, (r - l) / 2)), name: `${NAMES[j]} in mixture ${i + 1}: ${sig(v)} M` });
      const s = sig(v), w = F.measure(ctx, s, { size: 17, weight: 600 });
      if (r - l >= w + 8) text(ctx, s, (l + r) / 2, y, PAL.ink, { size: 17, weight: 600, align: 'center' });
      else if (v >= 0.0005) thin.push({ s, w, x: (l + r) / 2 });
    });
    /* a value its segment cannot hold stands over the bar on a leader, as the book sets 0.00175 and 0.00160 */
    thin.forEach((k) => {
      const x = Math.max(k.x, right + 12 + k.w / 2, B.l + 8 + k.w / 2); right = x + k.w / 2;
      line(ctx, k.x, t - 2, x, t - 14, alpha(PAL.ink, 0.6), 1.5);
      text(ctx, k.s, x, t - 26, PAL.ink, { size: 17, weight: 600, align: 'center' });
    });
    text(ctx, `Mixture ${i + 1}`, B.l - 22, y, on ? PAL.ink : PAL.muted, { size: 20, weight: on ? 600 : 400, align: 'right' });
  }
  function draw() {
    const { ctx } = begin(d.c);
    hits = [];
    const p = pr.v / 100, m = +pick.value - 1, cK = C('equilibrium-constant'), cc = C('concentration');
    /* the row the readout writes out */
    rect(ctx, 30, ROWS[m] - 56, 1380, ROWS[m] + 56, alpha(PAL.ink, 0.06), null);
    /* the concentration scale under the bars */
    for (let k = 0; k <= 5; k++) {
      const x = BX(k * 0.02);
      if (k) line(ctx, x, TOP, x, AX, PAL.rule, 1.5);
      text(ctx, fmt(k * 0.02, 2), x, AX + 26, PAL.muted, { size: 17, align: 'center' });
    }
    line(ctx, B.l, AX, B.r, AX, PAL.muted, 2); line(ctx, B.l, TOP, B.l, AX, PAL.muted, 2);
    text(ctx, 'concentration (M)', B.r, AX + 58, cc, { size: 20, weight: 600, align: 'right' });
    F.legend(ctx, { l: B.l, r: B.r, t: 112, b: 146 }, IDS.map((id, j) => ({ s: NAMES[j], color: F.ref(id), kind: 'swatch' })), { corner: 'top', row: true, panel: false });
    MIX.forEach((_, i) => bar(ctx, i, stateOf(i, p), i === m));
    /* the Q track the three rows share */
    line(ctx, S.l, AX, S.r, AX, PAL.muted, 2);
    line(ctx, X0, AX, S.l, AX, PAL.muted, 2, [4, 6]); line(ctx, S.r, AX, XINF, AX, PAL.muted, 2, [4, 6]);
    for (let e = LMIN; e <= LMAX; e++) { line(ctx, SX(e), AX - 7, SX(e), AX + 7, PAL.muted, 2); if (SUP[e]) text(ctx, SUP[e], SX(e), AX + 26, PAL.muted, { size: 17, align: 'center' }); }
    text(ctx, '0', X0, AX + 26, PAL.muted, { size: 17, align: 'center' }); text(ctx, '∞', XINF, AX + 26, PAL.muted, { size: 19, align: 'center' });
    text(ctx, 'reaction quotient, Q_{c} (log scale)', XINF, AX + 58, cK, { size: 20, weight: 600, align: 'right' });
    const xk = SX(Math.log10(KC));
    line(ctx, xk, 136, xk, AX, cK, 3, [10, 10]);
    text(ctx, '$\\kKc$ = 0.640', xk, 118, PAL.ink, { size: 20, align: 'center', tex: true });
    text(ctx, '$\\kQc < \\kKc$: forward', (X0 + xk) / 2 - 8, 158, PAL.ink, { size: 18, align: 'center', tex: true });
    text(ctx, '$\\kQc > \\kKc$: reverse', (xk + XINF) / 2 + 8, 158, PAL.ink, { size: 18, align: 'center', tex: true });
    MIX.forEach((mx, i) => {
      const y = ROWS[i], on = i === m, qa = Qof(mx.a), qn = Qof(stateOf(i, p)), xa = xOfQ(qa), xn = p >= 1 ? xk : xOfQ(qn), dir = Math.sign(xk - xa);
      line(ctx, X0, y, XINF, y, alpha(PAL.ink, 0.14), 1.5);
      /* the way Q_c must move to reach K_c, and how far it has come */
      if (Math.abs(xk - xn) > 40) F.arrow(ctx, xn + dir * 16, y, xk - dir * 8, y, alpha(cK, 0.32), 3);
      line(ctx, xa, y, xn, y, cK, 4);
      dot(ctx, xa, y, cK, false, 10);
      dot(ctx, xn, y, cK, true, on ? 11 : 9);
      const s = qTxt(qn), w = F.measure(ctx, s, { size: 18, weight: on ? 600 : 400 });
      /* the value under its dot, kept to the dot's own side of the K_c line */
      let lx = Math.min(Math.max(xn, 30 + w / 2), 1388 - w / 2);
      if (Math.abs(lx - xk) < w / 2 + 10) lx = xk - dir * (w / 2 + 10);
      text(ctx, s, lx, y + 32, PAL.ink, { size: 18, weight: on ? 600 : 400, align: 'center' });
      hits.push({ x: xa, y, r: 14, name: `mixture ${i + 1} before reaction: Q = ${qTxt(qa)}` });
      if (Math.abs(xn - xa) > 20) hits.push({ x: xn, y, r: 14, name: `mixture ${i + 1} now: Q = ${s}` });
    });
    const qa = Qof(MIX[m].a), below = qa < KC;
    topline(ctx, p >= 1 ? 'At equilibrium the three mixtures differ in composition, and each has $\\kQc$ equal to $\\kKc$.'
      : p === 0 ? `Mixture ${m + 1} starts with $\\kQc$ ${below ? 'below' : 'above'} $\\kKc$, so it reacts in the ${below ? 'forward' : 'reverse'} direction.`
      : `Mixture ${m + 1} reacts in the ${below ? 'forward' : 'reverse'} direction, and its $\\kQc$ ${below ? 'rises' : 'falls'} toward $\\kKc$.`);
    const r = stateOf(m, p).map((v) => +sig(v)), sh = r.map((v) => conc(v === 0 ? '0' : concTex(v)));
    const expr = '\\frac{[\\text{CO}_{2}][\\text{H}_{2}]}{[\\text{CO}][\\text{H}_{2}\\text{O}]}';
    const nums = `\\frac{(${sh[2]})(${sh[3]})}{(${sh[0]})(${sh[1]})}`;
    let tail;
    if (r[0] * r[1] === 0) tail = '\\to \\infty > \\kKc = 0.640';
    else {
      const q = r[2] * r[3] / (r[0] * r[1]), qs = q === 0 ? '0' : q >= 0.001 && q < 1000 ? sig(q) : sciTex(q, 3);
      const rel = qs === '0.640' ? '= \\kKc' : Math.abs(q - KC) / KC < 0.005 ? '\\approx \\kKc = 0.640' : q < KC ? '< \\kKc = 0.640' : '> \\kKc = 0.640';
      tail = `= ${hue('equilibrium-constant', qs)} ${rel}`;
    }
    F.tex(d.readout, `\\kQc = ${expr} = ${nums} ${tail}`);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   SIM: the magnitude of K. Example 13.2's flask, 0.10 M NO2 at the start,
   2NO2 ⇌ N2O4 at equilibrium for K_c = 10^s, s from −2 to 4. With
   [NO2] = c, [N2O4] = (0.10 − c)/2 and K_c = [N2O4]/c², so
   2K_c c² + c − 0.10 = 0. s = log 160 gives K_c = 1.6 × 10², [NO2] = 0.0162 M,
   [N2O4] = 0.0419 M, Example 13.2's 0.016 M and 0.042 M.
   Left, the flask's gas as 40 NO2 molecules (0.0025 M each) on 20 sites of
   two: a site's pair is drawn joined as N2O4 once the converted fraction
   passes it, so round(20 × fraction) sites are joined. Right, both
   equilibrium concentrations against K_c on a log axis, 0 to 0.10 M (the
   starting [NO2]); the point on the NO2 curve is the slider's.
===================================================================== */
(function () {
  const d = sim('sim-magnitude-k', 560);
  const C0 = 0.10, NS = 20, TAU = 2 * Math.PI;
  const kFmt = (lg) => { const [m, e] = sciParts(10 ** lg); return e === 0 ? m : `${m} × 10${String(e).split('').map((ch) => SUPD[ch]).join('')}`; };
  const s = ctl(d.controls, { label: '\\kKc', cls: 'equilibrium-constant', key: 'logK', min: -2, max: 4, step: 0.001, value: Math.log10(160),
    fmt: kFmt, detents: [-2, -1, 0, 1, 2, 3, 4], specials: [{ at: Math.log10(160), label: 'Example 13.2' }], aria: 'the equilibrium constant, on a logarithmic scale' });
  const eq = (K) => { const c = (-1 + Math.sqrt(1 + 8 * K * C0)) / (4 * K); return [c, (C0 - c) / 2]; };
  const cOf = (lg) => eq(10 ** lg)[0], nOf = (lg) => eq(10 ** lg)[1];
  const P = F.drag(d, { x: s, y: cOf });
  const BOX = { l: 70, r: 590, t: 128, b: 448 }, G = { l: 770, r: 1250, t: 150, b: 450 };
  /* the 20 sites, 5 by 4, each with a fixed jitter, a fixed axis and its place in the order of joining */
  let seed = 7; const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  const SITES = [];
  for (let r = 0; r < 4; r++) for (let c = 0; c < 5; c++) SITES.push({ x: BOX.l + 52 + c * 104 + (rnd() - 0.5) * 16, y: BOX.t + 42 + r * 79 + (rnd() - 0.5) * 10, th: rnd() * TAU, ra: (rnd() - 0.5) * 2.4, rb: (rnd() - 0.5) * 2.4, k: 0 });
  SITES.map((_, i) => i).sort(() => rnd() - 0.5).forEach((i, k) => { SITES[i].k = k; });
  const ball = (ctx, e, x, y, r) => { ctx.save(); ctx.fillStyle = F.el(e); ctx.strokeStyle = alpha(PAL.ink, 0.55); ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore(); };
  /* one NO2, its N at (x, y) and its two O on the side away from th, 134° apart */
  function no2(ctx, x, y, th, z = 1) {
    [1, -1].forEach((sg) => { const a = th + Math.PI + sg * 1.17; ball(ctx, 'O', x + 15 * z * Math.cos(a), y + 15 * z * Math.sin(a), 10 * z); });
    ball(ctx, 'N', x, y, 10.5 * z);
  }
  function n2o4(ctx, x, y, th, z = 1) { [1, -1].forEach((sg) => no2(ctx, x + sg * 9 * z * Math.cos(th), y + sg * 9 * z * Math.sin(th), th + (sg > 0 ? Math.PI : 0), z)); }
  let hits = [];
  F.hover(d.stage, () => hits);
  const POW = { '-2': '10⁻²', '-1': '10⁻¹', '0': '1', '1': '10', '2': '10²', '3': '10³', '4': '10⁴' };
  function draw() {
    const { ctx } = begin(d.c);
    hits = [];
    const K = 10 ** s.v, [c, n] = eq(K), cc = C('concentration'), cK = C('equilibrium-constant');
    const cN = F.ref('no2'), cD = F.ref('n2o4'), frac = (C0 - c) / C0;
    /* the flask's gas */
    ctx.save(); ctx.strokeStyle = alpha(PAL.ink, 0.7); ctx.lineWidth = 2.5; ctx.beginPath(); ctx.roundRect(BOX.l, BOX.t, BOX.r - BOX.l, BOX.b - BOX.t, 16); ctx.stroke(); ctx.restore();
    let joined = 0;
    SITES.forEach((q) => {
      const j = Math.min(1, Math.max(0, NS * frac - q.k)), ux = Math.cos(q.th), uy = Math.sin(q.th);
      if (j >= 0.5) { joined += 1; n2o4(ctx, q.x, q.y, q.th); hits.push({ x: q.x, y: q.y, r: 30, name: 'N₂O₄' }); return; }
      const k = j * 2, e = k * k * (3 - 2 * k), off = 29 - 17 * e;
      [1, -1].forEach((sg) => {
        const x = q.x + sg * off * ux, y = q.y + sg * off * uy, home = q.th + (sg > 0 ? Math.PI : 0), turn = (sg > 0 ? q.ra : q.rb) * (1 - e);
        no2(ctx, x, y, home + turn); hits.push({ x, y, r: 18, name: 'NO₂' });
      });
    });
    text(ctx, '0.10 M NO_{2} at the start, drawn as 40 molecules', BOX.l, BOX.t - 22, PAL.ink, { size: 18 });
    F.rich(ctx, ['now ', [String(2 * (NS - joined)), cN], ' NO₂ and ', [String(joined), cD], ' N₂O₄'], (BOX.l + BOX.r) / 2, BOX.b + 30, { size: 20, align: 'center' });
    F.legend(ctx, { l: BOX.l, r: BOX.r, t: BOX.b + 52, b: BOX.b + 92 }, [
      { s: 'NO₂', draw: (g, x, y) => no2(g, x + 6, y, 0, 0.62) },
      { s: 'N₂O₄', draw: (g, x, y) => n2o4(g, x, y, 0, 0.62) },
    ], { corner: 'top', row: true, panel: false });
    /* both concentrations against K_c */
    const g0 = F.axes(ctx, G, [0, 6], [0, 0.10], { nx: 6, ny: 5, fx: (v) => POW[Math.round(v) - 2], fy: (v) => fmt(v, 2), xl: 'K_{c}', xc: cK, yl: 'concentration at equilibrium (M)', yc: cc });
    /* the frame is drawn on log K_c + 2 so that K_c = 1 is a gridline like the others; g maps log K_c itself */
    const g = { X: (v) => g0.X(v + 2), Y: g0.Y, box: G, xr: [-2, 4], yr: [0, 0.10] };
    const xs = g.X(s.v);
    line(ctx, xs, G.t, xs, G.b, alpha(PAL.ink, 0.4), 2, [10, 10]);
    F.curve(ctx, cOf, -2, 4, g.X, g.Y, cN, 5, 160);
    F.curve(ctx, nOf, -2, 4, g.X, g.Y, cD, 5, 160);
    text(ctx, '[NO_{2}]', G.r + 16, g.Y(cOf(4)) - 4, cN, { size: 22, weight: 600 });
    text(ctx, '[N_{2}O_{4}]', G.r + 16, g.Y(nOf(4)), cD, { size: 22, weight: 600 });
    text(ctx, 'half the starting [NO_{2}]', G.l + 14, g.Y(C0 / 2) - 18, PAL.muted, { size: 17 });
    line(ctx, G.l, g.Y(C0 / 2), G.r, g.Y(C0 / 2), alpha(PAL.ink, 0.3), 2, [4, 8]);
    dot(ctx, xs, g.Y(n), cD, true, 9);
    P.draw(ctx, g, cN);
    const left = xs > G.r - 150, lx = left ? xs - 18 : xs + 18, al = left ? 'right' : 'left';
    const yN = g.Y(c), yD = g.Y(n), gap = Math.abs(yN - yD) < 26 ? (yN <= yD ? [-14, 14] : [14, -14]) : [0, 0];
    text(ctx, `${concTxt(c)} M`, lx, Math.min(G.b - 14, Math.max(G.t + 12, yN + gap[0])), cN, { size: 18, weight: 600, align: al, bg: PAL.panel });
    text(ctx, `${concTxt(n)} M`, lx, Math.min(G.b - 14, Math.max(G.t + 12, yD + gap[1])), cD, { size: 18, weight: 600, align: al, bg: PAL.panel });
    hits.push({ x: xs, y: yN, r: 16, name: '[NO₂] at equilibrium' }, { x: xs, y: yD, r: 16, name: '[N₂O₄] at equilibrium' });
    const f = frac * 100, pct = f < 9.95 ? fmt(f, 1) : fmt(f, 0);
    topline(ctx, `At $\\kKc = ${sciTex(K)}$, ${pct}% of the NO_{2} has become N_{2}O_{4}.`);
    const nc = +concTex(c).replace(' \\times 10^{', 'e').replace('}', ''), nn = +concTex(n).replace(' \\times 10^{', 'e').replace('}', '');
    F.tex(d.readout, `\\kKc = \\frac{[\\text{N}_{2}\\text{O}_{4}]}{[\\text{NO}_{2}]^{2}} = \\frac{${conc(concTex(nn))}}{(${conc(concTex(nc))})^{2}} = ${hue('equilibrium-constant', sciTex(K))}`);
  }
  register(d.fig, { update: () => {}, draw });
})();
};
