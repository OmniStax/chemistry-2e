/* Figures for section 12.1 Chemical Reaction Rates. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['12.1'] = function (root, F) {
const { fmt, C, PAL, alpha, ctl, register, begin, line, dot, text, topline } = F;
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
   1.000 M, the sliders' whole reach. The secant joins t1 and t2, the
   tangent stands at t1; t2 is held at or after t1, and landing on t1
   turns the readout to the tangent's rate. The table is drawn as the
   book prints it, its 0.062 and 0.010 included.
===================================================================== */
(function () {
  const d = sim('sim-h2o2-rate', 560);
  const K = Math.LN2 / 6, A = (t) => Math.pow(2, -t / 6), R = (t) => K * A(t);
  const DET = [0, 6, 12, 18, 24];
  const hold = () => { if (t2.v < t1.v) t2.set(t1.v); };
  const t1 = ctl(d.controls, { label: '\\kt_{1}', cls: 'time', key: 't1', min: 0, max: 24, step: 0.1, value: 0, unit: 'h', dec: 2, detents: DET, aria: 'the earlier time, t1, in hours', onInput: hold });
  const t2 = ctl(d.controls, { label: '\\kt_{2}', cls: 'time', key: 't2', min: 0, max: 24, step: 0.1, value: 6, unit: 'h', dec: 2, detents: DET, specials: [{ at: () => t1.v, label: 't₁' }], aria: 'the later time, t2, in hours', onInput: hold });
  const G = { l: 130, r: 760, t: 70, b: 450 };
  const ROWS = [['0.00', '1.000'], ['6.00', '0.500'], ['12.00', '0.250'], ['18.00', '0.125'], ['24.00', '0.0625']];
  const GAPS = [['−0.500', '6.00', '0.0833'], ['−0.250', '6.00', '0.0417'], ['−0.125', '6.00', '0.0208'], ['−0.062', '6.00', '0.010']];
  const COLX = [892, 990, 1108, 1210, 1318], ROW0 = 150, STEP = 38;
  const fc = (c) => c >= 0.1 ? c.toFixed(3) : c.toFixed(4);
  const near = (a, b) => Math.abs(a - b) < 0.01;
  const conc = (s) => hue('concentration', s), tim = (s) => hue('time', s), rt = (s) => hue('rate', s);
  const H2O2 = '[\\text{H}_{2}\\text{O}_{2}]', UNIT = '\\ \\text{mol L}^{-1}\\,\\text{h}^{-1}', ML = '\\ \\text{mol/L}', HR = '\\ \\text{h}';
  function table(ctx, a, b) {
    const ct = C('time'), cc = C('concentration'), cr = C('rate');
    const heads = [['t', '(h)', ct], ['[H_{2}O_{2}]', '(mol/L)', cc], ['Δ[H_{2}O_{2}]', '(mol/L)', cc], ['Δt', '(h)', ct], ['rate', '(mol/L/h)', cr]];
    heads.forEach(([h, u, c], i) => { text(ctx, h, COLX[i], 78, c, { size: 19, weight: 600, align: 'center' }); text(ctx, u, COLX[i], 106, PAL.muted, { size: 17, align: 'center' }); });
    line(ctx, 845, 124, 1390, 124, PAL.rule, 1.5);
    ROWS.forEach(([t, c], i) => {
      const y = ROW0 + 2 * i * STEP;
      if (near(a, 6 * i) || near(b, 6 * i)) band(ctx, 848, y - 17, 1040, y + 17, alpha(ct, 0.16));
      text(ctx, t, COLX[0], y, PAL.ink, { size: 18, align: 'center' });
      text(ctx, c, COLX[1], y, PAL.ink, { size: 18, align: 'center' });
    });
    GAPS.forEach(([dc, dt, r], j) => {
      const y = ROW0 + (2 * j + 1) * STEP;
      if (near(a, 6 * j) && near(b, 6 * j + 6)) band(ctx, 1052, y - 17, 1390, y + 17, alpha(cr, 0.16));
      for (const k of [0, 2]) line(ctx, 1030, ROW0 + (2 * j + k) * STEP + (k ? -6 : 6), 1062, y, alpha(PAL.ink, 0.35), 1.5);
      text(ctx, dc, COLX[2], y, PAL.ink, { size: 18, align: 'center' });
      text(ctx, dt, COLX[3], y, PAL.ink, { size: 18, align: 'center' });
      text(ctx, r, COLX[4], y, PAL.ink, { size: 18, align: 'center' });
    });
  }
  function draw() {
    const { ctx, H } = begin(d.c), lab = F.labeller(ctx, H);
    const a = t1.v, b = t2.v, same = b - a < 1e-9, ca = A(a), cb = A(b);
    const cc = C('concentration'), ct = C('time'), cr = C('rate');
    /* y runs to 1.2 M so the slope triangle at t1 = 0 keeps room for its Δt above the curve */
    const g = F.axes(ctx, G, [0, 24], [0, 1.2], { nx: 4, ny: 6, fx: (v) => fmt(v, 2), fy: (v) => fmt(v, 3), xl: 'time (h)', xc: ct, yl: '[H_{2}O_{2}] (mol/L)', yc: cc });
    const m = -R(a), e = 5;
    clipTo(ctx, G, () => {
      F.curve(ctx, A, 0, 24, g.X, g.Y, cc, 5, 160);
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
    dot(ctx, g.X(a), g.Y(ca), cc, false, 10);
    if (!same) dot(ctx, g.X(b), g.Y(cb), cc, true, 9);
    lab.block(840, 0, 1400, H);
    const key = F.legend(ctx, g, [{ s: 'tangent at t_{1}', color: cr, w: 4 }, ...(same ? [] : [{ s: 'secant, t_{1} to t_{2}', color: cr, w: 4, dash: [10, 10] }])], { corner: 'tr' });
    lab.block(key.l, key.t, key.r, key.b);
    if (!same) {
      if (g.Y(cb) - g.Y(ca) > 26) { const side = g.X(b) > G.r - 130 ? -1 : 1; lab.add('Δ[H_{2}O_{2}]', g.X(b) + 8 * side, (g.Y(ca) + g.Y(cb)) / 2, side, 0, cc, 18, 8); }
      if (g.X(b) - g.X(a) > 34) lab.add('Δt', (g.X(a) + g.X(b)) / 2, g.Y(ca) - 6, 0, -1, ct, 18, 8);
    }
    lab.flush();
    table(ctx, a, b);
    const inst = a < 1e-9 ? `\\text{initial rate} = -(\\text{slope of the tangent at } ${tim('0.00' + HR)})` : `\\text{instantaneous rate at } ${tim(fmt(a, 2) + HR)} = -(\\text{slope of the tangent})`;
    const tan = `${inst} = ${rt(sig(R(a)) + UNIT)}`;
    if (same) { F.tex(d.readout, tan); return; }
    const r = -(cb - ca) / (b - a);
    F.tex(d.readout, `\\text{average rate} = -\\frac{\\Delta${conc(H2O2)}}{\\kdt} = -\\frac{${conc(fc(cb) + ML)} - ${conc(fc(ca) + ML)}}{${tim(fmt(b, 2) + HR)} - ${tim(fmt(a, 2) + HR)}} = ${rt(sig(r) + UNIT)} \\\\ ${tan}`);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 12.5: 2NH3 ⟶ N2 + 3H2 at 1100 °C. Concentrations in units of
   10⁻³ M: [NH3] = 2.80 e^(−kt) with k = 1.3844 × 10⁻³ s⁻¹, fitted so the
   tangent slopes at 500 s are the book's 1.94 × 10⁻⁶, 9.70 × 10⁻⁷ and
   2.91 × 10⁻⁶ M/s; [N2] = ([NH3]0 − [NH3]) / 2 and [H2] three times
   that. Axes fixed at 0 to 2000 s and 0 to 5.0 × 10⁻³ M; [H2] reaches
   3.94 × 10⁻³ M at 2000 s. Tangents span 400 s each way of t.
===================================================================== */
(function () {
  const d = sim('sim-nh3-rates', 540);
  const C0 = 2.8, KS = 1.3844e-3;
  const SP = {
    nh3: { f: (t) => C0 * Math.exp(-KS * t), name: '[NH_{3}]', tex: '\\text{NH}_{3}', at: 150, u: [0.35, -1] },
    n2: { f: (t) => (C0 - C0 * Math.exp(-KS * t)) / 2, name: '[N_{2}]', tex: '\\text{N}_{2}', at: 1800, u: [0, 1] },
    h2: { f: (t) => 1.5 * (C0 - C0 * Math.exp(-KS * t)), name: '[H_{2}]', tex: '\\text{H}_{2}', at: 1500, u: [0.35, -1] },
  };
  const slope = { nh3: (t) => -KS * SP.nh3.f(t), n2: (t) => KS * SP.nh3.f(t) / 2, h2: (t) => 1.5 * KS * SP.nh3.f(t) };
  const tS = ctl(d.controls, { label: '\\kt', cls: 'time', min: 0, max: 2000, step: 10, value: 500, unit: 's', dec: 0, aria: 'the time at which the tangents are drawn, in seconds' });
  const G = { l: 190, r: 1250, t: 70, b: 430 };
  const sci = (v) => { const e = Math.floor(Math.log10(Math.abs(v))), m = v / 10 ** e; return `${minus(m.toFixed(2))} \\times 10^{${e}}`; };
  const conc = (s) => hue('concentration', s), rt = (s) => hue('rate', s);
  const frac = (k) => `\\frac{\\Delta${conc('[' + SP[k].tex + ']')}}{\\kdt}`;
  const MS = '\\ M\\text{/s}';
  function draw() {
    const { ctx, H } = begin(d.c), lab = F.labeller(ctx, H);
    const t = tS.v, ct = C('time'), guide = alpha(PAL.ink, 0.35);
    /* y to 4.4 × 10⁻³ M: [H2] reaches 3.94 × 10⁻³ M at 2000 s; ticks on whole units as the book's */
    const g = F.axes(ctx, G, [0, 2000], [0, 4.4], { nx: 4, ny: 5, nice: true, fy: (v) => (v ? fmt(v, 1) + ' × 10⁻³' : '0'), xl: 'time (s)', xc: ct, yl: 'concentration (M)', yc: C('concentration') });
    clipTo(ctx, G, () => line(ctx, g.X(t), G.t, g.X(t), G.b, guide, 2, [10, 10]));
    for (const k of ['nh3', 'n2', 'h2']) {
      const s = SP[k], c = F.ref(k), y = s.f(t), m = slope[k](t);
      F.curve(ctx, s.f, 0, 2000, g.X, g.Y, c, 5, 160);
      clipTo(ctx, G, () => line(ctx, g.X(t - 450), g.Y(y - 450 * m), g.X(t + 450), g.Y(y + 450 * m), c, 3));
      dot(ctx, g.X(t), g.Y(y), c, true, 8);
    }
    for (const k of ['nh3', 'n2', 'h2']) {
      const s = SP[k];
      lab.add(s.name, g.X(s.at), g.Y(s.f(s.at)), s.u[0], s.u[1], F.ref(k), 20, 26);
    }
    lab.flush();
    const sl = (k, f) => `${f}(${rt(sci(slope[k](t) * 1e-3) + MS)})`;
    const v = rt(sci(slope.n2(t) * 1e-3) + MS);
    F.tex(d.readout, `\\krate = -\\frac{1}{2}\\,${frac('nh3')} = ${frac('n2')} = \\frac{1}{3}\\,${frac('h2')} = ${sl('nh3', '-\\tfrac{1}{2}')} = ${v} = ${sl('h2', '\\tfrac{1}{3}')} = ${v}`);
  }
  register(d.fig, { update: () => {}, draw });
})();
};
