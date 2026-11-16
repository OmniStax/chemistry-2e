/* Figures for section 12.1 Chemical Reaction Rates. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['12.1'] = function (root, F) {
const { fmt, C, PAL, alpha, ctl, register, begin, line, dot, text } = F;
const sim = (id, H) => F.sim(root, id, H);
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;
const sig = (v, n = 3) => v.toFixed(Math.max(0, n - 1 - Math.floor(Math.log10(Math.abs(v)))));
const minus = (s) => String(s).replace(/^-/, '−');
function clipTo(ctx, b, f) { ctx.save(); ctx.beginPath(); ctx.rect(b.l, b.t, b.r - b.l, b.b - b.t); ctx.clip(); f(); ctx.restore(); }
function band(ctx, l, t, r, b, color) { ctx.save(); ctx.fillStyle = color; ctx.fillRect(l, t, r - l, b - t); ctx.restore(); }

/* =====================================================================
   FIGURE 12.2 + 12.3: the decomposition of H2O2 at 40 °C, its table
   beside its curve. [H2O2] = 1.000 M × 2^(−t / 6.00 h), which passes
   through every row of the book's table and gives Example 12.2's
   3.20 × 10⁻² mol L⁻¹ h⁻¹ at 11.1 h. Axes fixed at 0 to 24 h and 0 to
   1.200 M (the curve tops at 1.000 M; the band above keeps the slope
   triangle's Δt clear at t1 = 0). The secant joins t1 and t2, the
   tangent stands at t1; both points are dragged along the curve, t2 is
   held at or after t1, and landing on t1 leaves only the tangent's
   rate. The table is the book's, its 0.062 and 0.010 included.
===================================================================== */
(function () {
  const d = sim('sim-h2o2-rate', 560);
  const K = Math.LN2 / 6, A = (t) => Math.pow(2, -t / 6), R = (t) => K * A(t);
  const DET = [0, 6, 12, 18, 24];
  const hold = () => { if (t2.v < t1.v) t2.set(t1.v); };
  const t1 = ctl(d.controls, { label: '\\kt_{1}', cls: 'time', key: 't1', min: 0, max: 24, step: 0.1, value: 0, unit: 'h', dec: 2, detents: DET, specials: [{ at: 11.1, label: 'Example 12.2' }], aria: 'the earlier time, t1, in hours', onInput: hold });
  const t2 = ctl(d.controls, { label: '\\kt_{2}', cls: 'time', key: 't2', min: 0, max: 24, step: 0.1, value: 6, unit: 'h', dec: 2, detents: DET, specials: [{ at: () => t1.v, label: 't₁' }], aria: 'the later time, t2, in hours', onInput: hold });
  /* t2's grip is listed first, so where the two points coincide the reader pulls t2 away */
  const P2 = F.drag(d, { x: t2, y: A }), P1 = F.drag(d, { x: t1, y: A });
  const G = { l: 120, r: 760, t: 64, b: 462 };
  const ROWS = [['0.00', '1.000'], ['6.00', '0.500'], ['12.00', '0.250'], ['18.00', '0.125'], ['24.00', '0.0625']];
  const GAPS = [['−0.500', '6.00', '0.0833'], ['−0.250', '6.00', '0.0417'], ['−0.125', '6.00', '0.0208'], ['−0.062', '6.00', '0.010']];
  const COLX = [872, 978, 1100, 1204, 1318], ROW0 = 152, STEP = 39, TL = 826, TR = 1392, SPLIT = 1036;
  const fc = (c) => c >= 0.1 ? c.toFixed(3) : c.toFixed(4);
  const near = (a, b) => Math.abs(a - b) < 0.01;
  const conc = (s) => hue('concentration', s), tim = (s) => hue('time', s), rt = (s) => hue('rate', s);
  const H2O2 = '[\\text{H}_{2}\\text{O}_{2}]', UNIT = '\\ \\text{mol L}^{-1}\\,\\text{h}^{-1}', ML = '\\ \\text{mol/L}', HR = '\\ \\text{h}';
  function table(ctx, a, b) {
    const ct = C('time'), cc = C('concentration'), cr = C('rate');
    const heads = [['time', '(h)', ct], ['[H_{2}O_{2}]', '(mol L⁻¹)', cc], ['Δ[H_{2}O_{2}]', '(mol L⁻¹)', cc], ['Δt', '(h)', ct], ['rate', '(mol L⁻¹ h⁻¹)', cr]];
    heads.forEach(([h, u, c], i) => { text(ctx, h, COLX[i], 76, c, { size: 21, weight: 600, align: 'center' }); text(ctx, u, COLX[i], 105, PAL.muted, { size: 17, align: 'center' }); });
    line(ctx, TL, 126, TR, 126, PAL.rule, 1.5);
    ROWS.forEach(([t, c], i) => {
      const y = ROW0 + 2 * i * STEP;
      if (near(a, 6 * i) || near(b, 6 * i)) band(ctx, TL, y - 19, SPLIT - 10, y + 19, alpha(ct, 0.16));
      text(ctx, t, COLX[0], y, PAL.ink, { size: 21, align: 'center' });
      text(ctx, c, COLX[1], y, PAL.ink, { size: 21, align: 'center' });
    });
    GAPS.forEach(([dc, dt, r], j) => {
      const y = ROW0 + (2 * j + 1) * STEP, on = near(a, 6 * j) && near(b, 6 * j + 6);
      if (on) band(ctx, SPLIT + 8, y - 19, TR, y + 19, alpha(cr, 0.16));
      for (const k of [0, 2]) line(ctx, SPLIT - 14, ROW0 + (2 * j + k) * STEP + (k ? -7 : 7), SPLIT + 12, y, alpha(PAL.ink, 0.35), 1.5);
      text(ctx, dc, COLX[2], y, PAL.ink, { size: 21, align: 'center' });
      text(ctx, dt, COLX[3], y, PAL.ink, { size: 21, align: 'center' });
      text(ctx, r, COLX[4], y, on ? cr : PAL.ink, { size: 21, weight: on ? 600 : 400, align: 'center' });
    });
  }
  function draw() {
    const { ctx, H } = begin(d.c), lab = F.labeller(ctx, H);
    const a = t1.v, b = t2.v, same = b - a < 1e-9, ca = A(a), cb = A(b);
    const cc = C('concentration'), ct = C('time'), cr = C('rate');
    const g = F.axes(ctx, G, [0, 24], [0, 1.2], { nx: 4, ny: 6, fx: (v) => fmt(v, 2), fy: (v) => fmt(v, 3), xl: 'time (h)', xc: ct, yl: '[H_{2}O_{2}] (mol/L)', yc: cc });
    const m = -R(a), e = 6;
    F.plot(ctx, g, A, cc, { w: 5 });
    clipTo(ctx, G, () => {
      line(ctx, g.X(a - e), g.Y(ca - e * m), g.X(a + e), g.Y(ca + e * m), cr, 4);
      if (!same) {
        const s = (cb - ca) / (b - a), x = 1.5;
        /* the slope triangle above the curve: Δt along [H2O2] at t1, Δ[H2O2] down to the curve at t2 */
        line(ctx, g.X(a), g.Y(ca), g.X(b), g.Y(ca), alpha(ct, 0.85), 3, [4, 8]);
        line(ctx, g.X(b), g.Y(ca), g.X(b), g.Y(cb), alpha(cc, 0.85), 3, [4, 8]);
        line(ctx, g.X(a - x), g.Y(ca - x * s), g.X(b + x), g.Y(cb + x * s), cr, 4, [10, 10]);
      }
    });
    for (let i = 0; i <= 4; i++) dot(ctx, g.X(6 * i), g.Y(A(6 * i)), alpha(cc, 0.55), true, 6);
    if (!same) P2.draw(ctx, g, cc);
    P1.draw(ctx, g, cc);
    lab.block(TL - 10, 0, 1400, H);
    const key = F.legend(ctx, g, [{ s: 'tangent at t_{1}', color: cr, w: 4 }, ...(same ? [] : [{ s: 'secant, t_{1} to t_{2}', color: cr, w: 4, dash: [10, 10] }])], { corner: 'tr' });
    lab.block(key.l, key.t, key.r, key.b);
    if (!same) {
      if (g.Y(cb) - g.Y(ca) > 26) { const side = g.X(b) > G.r - 130 ? -1 : 1; lab.add('Δ[H_{2}O_{2}]', g.X(b) + 8 * side, (g.Y(ca) + g.Y(cb)) / 2, side, 0, cc, 20, 8); }
      if (g.X(b) - g.X(a) > 34) lab.add('Δt', (g.X(a) + g.X(b)) / 2, g.Y(ca) - 6, 0, -1, ct, 20, 8);
    }
    lab.add('t_{1}', g.X(a), g.Y(ca), a < 1 ? 0.6 : -0.6, a < 1 ? -1 : 1, ct, 20, 20);
    if (!same) lab.add('t_{2}', g.X(b), g.Y(cb), b < 2 ? 1 : -0.6, b < 2 ? -0.4 : 1, ct, 20, 20);
    lab.flush();
    table(ctx, a, b);
    const inst = a < 1e-9 ? `\\text{initial rate} = -(\\text{slope of the tangent at } ${tim('0.00' + HR)})` : `\\text{instantaneous rate at } ${tim(fmt(a, 2) + HR)} = -(\\text{slope of the tangent})`;
    const tan = `${inst} = ${rt(sig(R(a)) + UNIT)}`;
    if (same) { F.tex(d.readout, tan); return; }
    const r = -(cb - ca) / (b - a);
    F.tex(d.readout, `\\text{average rate} = -\\frac{\\Delta${conc(H2O2)}}{\\kdt} = -\\frac{${conc(fc(cb) + ML)}\\,-\\,${conc(fc(ca) + ML)}}{${tim(fmt(b, 2) + HR)}\\,-\\,${tim(fmt(a, 2) + HR)}} = ${rt(sig(r) + UNIT)} \\\\ ${tan}`);
  }
  F.hover(d.stage, () => { const g = { X: (v) => G.l + (v / 24) * (G.r - G.l), Y: (v) => G.b - (v / 1.2) * (G.b - G.t) }; return [
    { x: g.X(t1.v), y: g.Y(A(t1.v)), r: 20, name: `[H₂O₂] at t₁: ${fc(A(t1.v))} mol/L` },
    ...(t2.v - t1.v < 1e-9 ? [] : [{ x: g.X(t2.v), y: g.Y(A(t2.v)), r: 20, name: `[H₂O₂] at t₂: ${fc(A(t2.v))} mol/L` }]),
    ...[1, 2, 3, 4].map((i) => ({ x: g.X(6 * i), y: g.Y(A(6 * i)), r: 12, name: `measured at ${(6 * i).toFixed(2)} h: ${ROWS[i][1]} mol/L` })),
  ]; });
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 12.5: 2NH3 ⟶ N2 + 3H2 at 1100 °C. Concentrations in units of
   10⁻³ M: [NH3] = 2.80 e^(−kt) with k = 1.3844 × 10⁻³ s⁻¹, fitted so the
   tangent slopes at 500 s are the book's 1.94 × 10⁻⁶, 9.70 × 10⁻⁷ and
   2.91 × 10⁻⁶ M/s; [N2] = ([NH3]0 − [NH3]) / 2 and [H2] three times
   that. Graph axes fixed at 0 to 2000 s and 0 to 4.4 × 10⁻³ M ([H2]
   reaches 3.94 × 10⁻³ M at 2000 s). Beside it the three slopes stand as
   bars on a fixed scale of −4 to 8 × 10⁻⁶ M/s (at t = 0 they are −3.88,
   1.94 and 5.81), each cut into as many blocks as the species'
   coefficient, so one block is the rate. Tangents span 450 s each way.
===================================================================== */
(function () {
  const d = sim('sim-nh3-rates', 540);
  const C0 = 2.8, KS = 1.3844e-3, KEYS = ['nh3', 'n2', 'h2'];
  const SP = {
    nh3: { f: (t) => C0 * Math.exp(-KS * t), name: '[NH_{3}]', plain: '[NH₃]', tex: '\\text{NH}_{3}', n: 2, at: 150, u: [0.35, -1] },
    n2: { f: (t) => (C0 - C0 * Math.exp(-KS * t)) / 2, name: '[N_{2}]', plain: '[N₂]', tex: '\\text{N}_{2}', n: 1, at: 1800, u: [0, 1] },
    h2: { f: (t) => 1.5 * (C0 - C0 * Math.exp(-KS * t)), name: '[H_{2}]', plain: '[H₂]', tex: '\\text{H}_{2}', n: 3, at: 1500, u: [0.35, -1] },
  };
  /* slopes in 10⁻⁶ M/s (the curves are in 10⁻³ M, so 10⁻³ M/s × 1000) */
  const slope = { nh3: (t) => -1e3 * KS * SP.nh3.f(t), n2: (t) => 500 * KS * SP.nh3.f(t), h2: (t) => 1500 * KS * SP.nh3.f(t) };
  const tS = ctl(d.controls, { label: '\\kt', cls: 'time', min: 0, max: 2000, step: 10, value: 500, unit: 's', dec: 0, detents: [{ v: 500 }], aria: 'the time at which the tangents are drawn, in seconds' });
  const grips = KEYS.map((k) => F.drag(d, { x: tS, y: SP[k].f }));
  const G = { l: 170, r: 880, t: 64, b: 440 }, B = { l: 1010, r: 1390, t: 64, b: 440 }, BX = { nh3: 1078, n2: 1202, h2: 1326 }, BW = 66;
  const SUP = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
  const parts = (v) => { const e = Math.floor(Math.log10(Math.abs(v)) + 1e-9), m = (v / 10 ** e).toFixed(2); return [minus(m), e]; };   /* v in M/s */
  const sci = (v) => { const [m, e] = parts(v); return `${m} \\times 10^{${e}}`; };
  const usci = (v) => { const [m, e] = parts(v); return `${m} × 10${String(e).replace(/./g, (c) => SUP[c])}`; };
  const conc = (s) => hue('concentration', s), rt = (s) => hue('rate', s);
  const frac = (k) => `\\frac{\\Delta${conc('[' + SP[k].tex + ']')}}{\\kdt}`;
  const MS = '\\ M\\text{/s}';
  const YB = (v) => B.b - ((v + 4) / 12) * (B.b - B.t);
  function draw() {
    const { ctx, H } = begin(d.c), lab = F.labeller(ctx, H);
    const t = tS.v, ct = C('time'), cr = C('rate'), guide = alpha(PAL.ink, 0.35);
    const g = F.axes(ctx, G, [0, 2000], [0, 4.4], { nx: 4, ny: 5, nice: true, fy: (v) => (v ? fmt(v, 1) + ' × 10⁻³' : '0'), xl: 'time (s)', xc: ct, yl: 'concentration (M)', yc: C('concentration') });
    clipTo(ctx, G, () => line(ctx, g.X(t), G.t, g.X(t), G.b, guide, 2, [10, 10]));
    KEYS.forEach((k, i) => {
      const s = SP[k], c = F.ref(k), y = s.f(t), m = slope[k](t) / 1e3;
      F.plot(ctx, g, s.f, c, { w: 5 });
      clipTo(ctx, G, () => line(ctx, g.X(t - 450), g.Y(y - 450 * m), g.X(t + 450), g.Y(y + 450 * m), c, 3));
      grips[i].draw(ctx, g, c);
    });
    for (const k of KEYS) { const s = SP[k]; lab.add(s.name, g.X(s.at), g.Y(s.f(s.at)), s.u[0], s.u[1], F.ref(k), 22, 26); }
    lab.flush();
    /* the slopes as bars: each bar is its species' coefficient in blocks, one block the rate */
    F.axes(ctx, B, [0, 1], [-4, 8], { nx: 0, ny: 6, fy: (v) => minus(fmt(v, 0)), yl: 'slope of the tangent (10⁻⁶ M/s)', yc: cr });
    const rate = slope.n2(t), y0 = YB(0), hb = y0 - YB(rate);
    line(ctx, B.l, y0, B.r, y0, PAL.ink, 2);
    for (const k of KEYS) {
      const s = SP[k], c = F.ref(k), x = BX[k], dir = k === 'nh3' ? 1 : -1, end = y0 + dir * s.n * hb;
      band(ctx, x - BW / 2, Math.min(y0, end), x + BW / 2, Math.max(y0, end), alpha(c, 0.5));
      ctx.save(); ctx.strokeStyle = c; ctx.lineWidth = 2.5; ctx.strokeRect(x - BW / 2, Math.min(y0, end), BW, Math.abs(end - y0)); ctx.restore();
      if (hb > 7) for (let j = 1; j < s.n; j++) line(ctx, x - BW / 2, y0 + dir * j * hb, x + BW / 2, y0 + dir * j * hb, c, 2.5);
      text(ctx, s.name, x, y0 - dir * 20, c, { size: 21, weight: 600, align: 'center' });
      text(ctx, usci(slope[k](t) * 1e-6), x, end + dir * 18, c, { size: 17, weight: 600, align: 'center', bg: PAL.panel });
    }
    F.rich(ctx, ['one block = ', ['rate', cr]], (B.l + B.r) / 2, B.b + 44, { size: 20, align: 'center' });
    const v = rt(sci(rate * 1e-6) + MS), sub = (k) => `(${rt(sci(slope[k](t) * 1e-6) + MS)})`;
    F.tex(d.readout, `\\krate = -\\frac{1}{2}\\,${frac('nh3')} = -\\frac{1}{2}${sub('nh3')} = ${v} \\\\ \\krate = ${frac('n2')} = ${v} \\\\ \\krate = \\frac{1}{3}\\,${frac('h2')} = \\frac{1}{3}${sub('h2')} = ${v}`);
  }
  F.hover(d.stage, () => { const t = tS.v, X = G.l + (t / 2000) * (G.r - G.l), Y = (v) => G.b - (v / 4.4) * (G.b - G.t);
    return KEYS.map((k) => ({ x: X, y: Y(SP[k].f(t)), r: 20, name: `tangent to ${SP[k].plain} at ${t.toFixed(0)} s: slope ${usci(slope[k](t) * 1e-6)} M/s` })); });
  register(d.fig, { update: () => {}, draw });
})();
};
