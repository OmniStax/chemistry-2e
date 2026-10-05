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
   FIGURE 13.5: 2SO2 + O2 ⇌ 2SO3 run from reactants only ([SO2]0 = 1.00 M,
   [O2]0 = 0.50 M) or from product only ([SO3]0 = 1.00 M), the same mixture
   written two ways, so both runs end at [SO3] = 0.568 M, [SO2] = 0.432 M,
   [O2] = 0.216 M. K_c = 8.0 is a model value (the book prints none); net
   rate k_f[SO2]²[O2] − k_r[SO3]², k_f = 1 and k_r = k_f/K_c in model time,
   integrated by RK4 at load. The time axis is unnumbered, as the book's.
   Axes fixed: concentration 0 to 1.00 M, Q_c 0 to 14 (K_c = 8.0 with
   headroom; larger values leave through the top edge).
===================================================================== */
(function () {
  const d = sim('sim-quotient', 760);
  const K = 8, KR = 1 / K, N = 1400;
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
  const TMAX = 10.5;
  const RUNS = { r: integrate([1, 0.5, 0], TMAX), p: integrate([0, 0, 1], TMAX) };
  const TEQ = {};
  for (const k of ['r', 'p']) { const i = RUNS[k].findIndex((c) => Math.abs(Qof(c) - K) / K < 0.01); TEQ[k] = i * TMAX / N; }
  const at = (run, t) => { const x = Math.min(N, Math.max(0, t / TMAX * N)), i = Math.min(N - 1, Math.floor(x)), f = x - i; return run[i].map((v, j) => v + f * (run[i + 1][j] - v)); };
  const SP = [
    { id: 'so2', name: '[SO_{2}]', tex: '\\text{SO}_{2}' },
    { id: 'o2', name: '[O_{2}]', tex: '\\text{O}_{2}' },
    { id: 'so3', name: '[SO_{3}]', tex: '\\text{SO}_{3}' },
  ];
  const cy = cycle(() => 5, 1.2);
  const start = F.choice(d.controls, { label: '\\text{start}', aria: 'the starting mixture', value: 'r',
    options: [{ value: 'r', label: 'reactants only' }, { value: 'p', label: 'product only' }], onInput: () => cy.reset() });
  const G1 = { l: 150, r: 1170, t: 120, b: 350 }, G2 = { l: 150, r: 1170, t: 450, b: 680 };
  const QMAX = 14;
  function draw() {
    const { ctx } = begin(d.c);
    const key = start.value, other = key === 'r' ? 'p' : 'r', run = RUNS[key];
    const tau = cy.now(), t = Number.isFinite(tau) ? tau / 5 * TMAX : TMAX;
    const cK = C('equilibrium-constant'), ct = C('time'), cc = C('concentration'), guide = alpha(PAL.ink, 0.4);
    const blank = () => '';
    const g1 = F.axes(ctx, G1, [0, TMAX], [0, 1], { nx: 4, ny: 4, fx: blank, fy: (v) => fmt(v, 2), yl: 'concentration (M)', yc: cc });
    const g2 = F.axes(ctx, G2, [0, TMAX], [0, QMAX], { nx: 4, ny: 7, fx: blank, fy: (v) => fmt(v, 0), xl: 'time', xc: ct, yl: 'reaction quotient, Q_{c}', yc: cK });
    const reached = t >= TEQ[key];
    if (reached) {
      const x = g1.X(TEQ[key]);
      line(ctx, x, G1.t, x, G1.b, guide, 2, [10, 10]); line(ctx, x, G2.t, x, G2.b, guide, 2, [10, 10]);
      text(ctx, 'equilibrium is reached', x, G1.t - 22, PAL.ink, { size: 18, align: 'center', bg: PAL.panel });
    }
    clipTo(ctx, G2, () => {
      line(ctx, G2.l, g2.Y(K), G2.r, g2.Y(K), cK, 3, [10, 10]);
      F.curve(ctx, (s) => Qof(at(RUNS[other], s)), 0.002, TMAX, g2.X, g2.Y, alpha(cK, 0.28), 3, 300);
      F.curve(ctx, (s) => Qof(at(run, s)), 0.002, t, g2.X, g2.Y, cK, 5, 300);
    });
    text(ctx, 'K_{c} = 8.0', G2.r + 24, g2.Y(K), cK, { size: 20, weight: 600 });
    SP.forEach((s, j) => {
      const c = F.ref(s.id);
      F.curve(ctx, (x) => at(run, x)[j], 0, t, g1.X, g1.Y, c, 5, 300);
    });
    const now = at(run, t), q = Qof(now);
    SP.forEach((s, j) => dot(ctx, g1.X(t), g1.Y(now[j]), F.ref(s.id), true, 8));
    if (q <= QMAX) dot(ctx, g2.X(t), g2.Y(q), cK, false, 9);
    else F.pinned(ctx, G2, g2.X, g2.Y, t, q, cK);
    SP.forEach((s, j) => { const y = G1.t + 24 + 34 * j; line(ctx, G1.r + 24, y, G1.r + 64, y, F.ref(s.id), 5); text(ctx, s.name, G1.r + 76, y, F.ref(s.id), { size: 20, weight: 600 }); });
    topline(ctx, reached ? '$\\kQc$ has reached $\\kKc$, and the concentrations no longer change.'
      : key === 'r' ? 'Starting from reactants only, $\\kQc$ climbs from 0 toward $\\kKc$.'
      : 'Starting from product only, $\\kQc$ falls from an immeasurably large value toward $\\kKc$.');
    const r3 = now.map((v) => +v.toFixed(3)), shown = r3.map((v) => conc(v.toFixed(3)));
    const expr = '\\frac{[\\text{SO}_{3}]^{2}}{[\\text{SO}_{2}]^{2}[\\text{O}_{2}]}';
    const nums = `\\frac{(${shown[2]})^{2}}{(${shown[0]})^{2}(${shown[1]})}`;
    let tail;
    if (r3[0] === 0 || r3[1] === 0) tail = r3[2] === 0 ? '' : '\\to \\infty';
    else { const qs = r3[2] * r3[2] / (r3[0] * r3[0] * r3[1]); tail = `= ${hue('equilibrium-constant', qs < 0.05 ? sig(qs, 1) : qs < 10 ? fmt(qs, 1) : fmt(qs, 0))}` + (reached ? ' = \\kKc' : ''); }
    if (r3[2] === 0) tail = '= 0';
    F.tex(d.readout, `\\kQc = ${expr} = ${nums} ${tail}`);
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();

/* =====================================================================
   FIGURE 13.6: CO + H2O ⇌ CO2 + H2, K_c = 0.640 at 800 °C, the book's
   three mixtures. Each concentration runs in a straight line from the
   book's "before reaction" value to its "at equilibrium" value as the
   progress slider goes 0 to 100 %. Bar axis 0 to 0.10 M, as the book's.
   The Q scale is log10 Q from −3 to 3; 0 and ∞ are pinned at its ends.
===================================================================== */
(function () {
  const d = sim('sim-mixtures', 560);
  const KC = 0.640;
  const IDS = ['co', 'h2o', 'co2', 'h2'], NAMES = ['[CO]', '[H_{2}O]', '[CO_{2}]', '[H_{2}]'];
  const MIX = {
    1: { a: [0.0243, 0.0243, 0, 0], b: [0.0135, 0.0135, 0.0108, 0.0108] },
    2: { a: [0, 0, 0.0468, 0.0468], b: [0.0260, 0.0260, 0.0208, 0.0208] },
    3: { a: [0.0330, 0.0190, 0.00175, 0.00160], b: [0.0231, 0.00909, 0.0115, 0.0117] },
  };
  const pick = F.choice(d.controls, { label: '\\text{mixture}', aria: 'the starting mixture', value: '1',
    options: [{ value: '1', label: 'Mixture 1' }, { value: '2', label: 'Mixture 2' }, { value: '3', label: 'Mixture 3' }] });
  const pr = ctl(d.controls, { label: '\\text{progress}', cls: '', key: 'progress', min: 0, max: 100, step: 1, value: 0, unit: '%', dec: 0,
    aria: 'how far the mixture has gone toward equilibrium, in percent', specials: [{ at: 100, label: 'equilibrium' }] });
  const G = { l: 150, r: 600, t: 120, b: 470 };
  const S = { l: 800, r: 1330, y: 300 }, LMIN = -3, LMAX = 3;
  const SX = (lq) => S.l + (lq - LMIN) / (LMAX - LMIN) * (S.r - S.l);
  const Qof = (c) => c[0] * c[1] === 0 ? (c[2] * c[3] === 0 ? NaN : Infinity) : c[2] * c[3] / (c[0] * c[1]);
  const xOfQ = (q) => q === 0 ? S.l : q === Infinity ? S.r : SX(Math.min(LMAX, Math.max(LMIN, Math.log10(q))));
  const stateOf = (m, p) => MIX[m].a.map((v, j) => v + p * (MIX[m].b[j] - v));
  const SUP = { '-3': '10⁻³', '-2': '10⁻²', '-1': '10⁻¹', '0': '1', '1': '10', '2': '10²', '3': '10³' };
  function stack(ctx, Y, x, w, c, ghost) {
    let y0 = 0;
    c.forEach((v, j) => {
      const col = F.ref(IDS[j]);
      if (v > 0) rect(ctx, x - w / 2, Y(y0 + v), x + w / 2, Y(y0), ghost ? alpha(col, 0.18) : col, ghost ? col : null, ghost ? [6, 5] : null);
      y0 += v;
    });
    return y0;
  }
  function draw() {
    const { ctx } = begin(d.c);
    const p = pr.v / 100, m = pick.value, cK = C('equilibrium-constant'), cc = C('concentration');
    const g = F.axes(ctx, G, [0, 1], [0, 0.10], { nx: 1, ny: 5, fx: () => '', fy: (v) => fmt(v, 2), yl: 'concentration (M)', yc: cc });
    const [a, now] = pick.mix((v) => [...MIX[v].a, ...stateOf(v, p)]).reduce((acc, v, i) => { acc[i < 4 ? 0 : 1].push(v); return acc; }, [[], []]);
    const XA = 260, XB = 470, W = 130;
    stack(ctx, g.Y, XA, W, a, true);
    stack(ctx, g.Y, XB, W, now, false);
    text(ctx, 'before reaction', XA, G.b + 28, PAL.ink, { size: 18, align: 'center' });
    text(ctx, p >= 1 ? 'at equilibrium' : `${fmt(pr.v, 0)}% of the way`, XB, G.b + 28, PAL.ink, { size: 18, align: 'center' });
    let y0 = 0, last = Infinity;
    const want = now.map((v) => { const m = g.Y(y0 + v / 2); y0 += v; return m; });
    now.forEach((v, j) => {
      if (!(v > 0)) return;
      const y = Math.min(want[j], last - 28); last = y;
      const col = F.ref(IDS[j]), x0 = XB + W / 2;
      if (Math.abs(y - want[j]) > 2) line(ctx, x0 + 2, want[j], x0 + 22, y, alpha(col, 0.6), 1.5, [5, 6]);
      text(ctx, `${NAMES[j]} ${sig(v)}`, x0 + 28, y, col, { size: 18, weight: 600, bg: PAL.panel });
    });
    /* the Q scale */
    line(ctx, S.l, S.y, S.r, S.y, PAL.muted, 2);
    for (let e = LMIN; e <= LMAX; e++) { line(ctx, SX(e), S.y - 8, SX(e), S.y + 8, PAL.muted, 2); text(ctx, SUP[e], SX(e), S.y + 30, PAL.muted, { size: 17, align: 'center' }); }
    text(ctx, 'reaction quotient, Q_{c} (log scale)', (S.l + S.r) / 2, S.y - 150, cK, { size: 20, weight: 600, align: 'center' });
    const xk = SX(Math.log10(KC));
    line(ctx, xk, S.y - 70, xk, S.y + 50, cK, 3, [10, 10]);
    text(ctx, 'K_{c} = 0.640', xk, S.y - 88, cK, { size: 20, weight: 600, align: 'center', bg: PAL.panel });
    text(ctx, 'Q_{c} < K_{c}: forward', (S.l + xk) / 2, S.y + 74, PAL.ink, { size: 18, align: 'center' });
    text(ctx, 'Q_{c} > K_{c}: reverse', (xk + S.r) / 2, S.y + 74, PAL.ink, { size: 18, align: 'center' });
    const qa = Qof(MIX[m].a);
    const xa = pick.mix((v) => xOfQ(Qof(MIX[v].a))), xn = pick.mix((v) => xOfQ(Qof(stateOf(v, p))));
    dot(ctx, xa, S.y, cK, false, 10);
    dot(ctx, xn, S.y, cK, true, 9);
    const end = (x) => x <= S.l + 1 ? '0' : x >= S.r - 1 ? '∞' : null;
    if (end(xa)) text(ctx, `Q_{c} = ${end(xa)}`, xa, S.y - 34, cK, { size: 17, weight: 600, align: 'center', bg: PAL.panel });
    const dir = qa < KC ? 'below' : 'above', way = qa < KC ? 'forward' : 'reverse';
    topline(ctx, p >= 1 ? `Mixture ${m} has reached equilibrium, where $\\kQc$ equals $\\kKc$.` : `Mixture ${m} starts with $\\kQc$ ${dir} $\\kKc$, so it reacts in the ${way} direction.`);
    const r = stateOf(m, p).map((v) => +sig(v)), sh = r.map((v) => conc(sig(v)));
    const expr = '\\frac{[\\text{CO}_{2}][\\text{H}_{2}]}{[\\text{CO}][\\text{H}_{2}\\text{O}]}';
    const nums = `\\frac{(${sh[2]})(${sh[3]})}{(${sh[0]})(${sh[1]})}`;
    let tail;
    if (r[0] * r[1] === 0) tail = '\\to \\infty > \\kKc = 0.640';
    else {
      const q = r[2] * r[3] / (r[0] * r[1]), qs = q === 0 ? '0' : sig(q);
      const rel = qs === '0.640' ? '= \\kKc' : Math.abs(q - KC) / KC < 0.005 ? '\\approx \\kKc' : q < KC ? '< \\kKc = 0.640' : '> \\kKc = 0.640';
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
   2K_c c² + c − 0.10 = 0. s = 2.21 gives K_c = 1.6 × 10², [NO2] = 0.0161 M,
   [N2O4] = 0.0420 M, Example 13.2's 0.016 M and 0.042 M. Bar axis 0 to
   0.12 M, headroom over the starting 0.10 M of NO2.
===================================================================== */
(function () {
  const d = sim('sim-magnitude-k', 500);
  const C0 = 0.10;
  const s = ctl(d.controls, { label: '\\log \\kKc', cls: 'equilibrium-constant', key: 'logK', min: -2, max: 4, step: 0.01, value: 2.21, unit: '', dec: 2,
    detents: [-2, -1, 0, 1, 2, 3, 4], aria: 'the base-ten logarithm of the equilibrium constant' });
  const G = { l: 420, r: 980, t: 120, b: 410 };
  const eq = (K) => { const c = (-1 + Math.sqrt(1 + 8 * K * C0)) / (4 * K); return [c, (C0 - c) / 2]; };
  function draw() {
    const { ctx } = begin(d.c);
    const K = 10 ** s.v, [c, n] = eq(K), cc = C('concentration');
    const g = F.axes(ctx, G, [0, 1], [0, 0.12], { nx: 1, ny: 6, fx: () => '', fy: (v) => fmt(v, 2), yl: 'concentration at equilibrium (M)', yc: cc });
    const W = 140, X1 = 560, X2 = 840;
    const cN = F.ref('no2'), cD = F.ref('n2o4');
    rect(ctx, X1 - W / 2, g.Y(C0), X1 + W / 2, G.b, null, cN, [6, 5]);
    rect(ctx, X1 - W / 2, g.Y(c), X1 + W / 2, G.b, cN);
    rect(ctx, X2 - W / 2, g.Y(n), X2 + W / 2, G.b, cD);
    text(ctx, `${concTxt(c)} M`, X1, Math.min(g.Y(c), G.b) - 20, cN, { size: 20, weight: 600, align: 'center', bg: PAL.panel });
    text(ctx, `${concTxt(n)} M`, X2, g.Y(n) - 20, cD, { size: 20, weight: 600, align: 'center', bg: PAL.panel });
    text(ctx, '[NO_{2}]', X1, G.b + 30, cN, { size: 22, weight: 600, align: 'center' });
    text(ctx, '[N_{2}O_{4}]', X2, G.b + 30, cD, { size: 22, weight: 600, align: 'center' });
    text(ctx, 'starting [NO_{2}]', X1 + W / 2 + 12, g.Y(C0), PAL.muted, { size: 17 });
    const f = (C0 - c) / C0 * 100, pct = f < 9.95 ? fmt(f, 1) : fmt(f, 0);
    topline(ctx, `At $\\kKc = ${sciTex(K)}$, ${pct}% of the NO_{2} has become N_{2}O_{4}.`);
    const nc = +concTex(c).replace(' \\times 10^{', 'e').replace('}', ''), nn = +concTex(n).replace(' \\times 10^{', 'e').replace('}', '');
    F.tex(d.readout, `\\kKc = \\frac{[\\text{N}_{2}\\text{O}_{4}]}{[\\text{NO}_{2}]^{2}} = \\frac{${conc(concTex(nn))}}{(${conc(concTex(nc))})^{2}} = ${hue('equilibrium-constant', sciTex(K))}`);
  }
  register(d.fig, { update: () => {}, draw });
})();
};
