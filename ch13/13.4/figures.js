/* Figures for section 13.4 Equilibrium Calculations. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['13.4'] = function (root, F) {
const { C, PAL, alpha, ctl, register, begin, line, text, dot, topline } = F;
const sim = (id, H) => F.sim(root, id, H);

const SUP = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
const sup = (n) => String(n).split('').map((c) => SUP[c]).join('');
const pow10 = (k) => (k === 0 ? '1' : k === 1 ? '10' : '10' + sup(k));
/* x to three significant figures: plain from 0.001 up, otherwise m × 10ⁿ; as figure text and as TeX */
function sig(x, n = 3) {
  let e = Math.floor(Math.log10(Math.abs(x)));
  if (e >= -3) return { plain: x.toFixed(Math.max(0, n - 1 - e)) };
  let m = (x / 10 ** e).toFixed(n - 1);
  if (+m >= 10) { e += 1; m = (x / 10 ** e).toFixed(n - 1); }
  return { m, e };
}
const sigText = (x, n) => { const s = sig(x, n); return s.plain ?? `${s.m} × 10${sup(s.e)}`; };
const sigTex = (x, n) => { const s = sig(x, n); return s.plain ?? `${s.m} \\times 10^{${s.e}}`; };
const pct = (v) => String(Number((100 * v).toPrecision(100 * v >= 10 ? 3 : 2)));
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;

/* =====================================================================
   SIM: the equilibrium of A ⇌ B + C from A alone, K_c = x²/(c₀ − x),
   for the two decompositions the section solves (PCl₅, Example 13.9;
   HCN, Example 13.10). Top: the book's ICE table with the live numbers.
   Below: the share of A that reacts, x/c₀, against K_c/c₀, the only
   thing it depends on: x/c₀ = 2r/(r + √(r² + 4r)) with r = K_c/c₀ (the
   positive root of the book's quadratic, in a form that keeps its digits
   at r = 10⁻¹⁰), solid; the approximation c₀ − x ≈ c₀ gives √r, dashed.
   The bar on the right shares the percent axis: the slice is x, the rest
   the A left. Tinted: where x is under 5% of c₀ (r < 0.05²/0.95), the
   limit Section 14.3 uses. Axes fixed: K_c/c₀ from 10⁻¹⁰ to 10² (the
   sliders reach exactly that: K_c 10⁻¹⁰ to 1, c₀ 0.01 to 1.00 M), 0 to
   100%; the approximation passes 100% at r = 1 and is pinned there.
   Still: the arithmetic of an equilibrium has no clock.
===================================================================== */
(function () {
  const d = sim('sim-small-x', 780);
  const RX = {
    pcl5: { K: 0.0211, c0: 1.0, sp: ['PCl_{5}', 'PCl_{3}', 'Cl_{2}'], a: '[\\text{PCl}_{5}]_{i}', aria: 'initial concentration of PCl5' },
    hcn: { K: 4.9e-10, c0: 0.15, sp: ['HCN', 'H⁺', 'CN⁻'], a: '[\\text{HCN}]_{i}', aria: 'initial concentration of HCN' },
  };
  const pick = F.choice(d.controls, {
    label: '\\text{reaction}', aria: 'the reaction', value: 'hcn', ms: 0,
    options: [{ value: 'pcl5', label: 'PCl₅ ⇌ PCl₃ + Cl₂' }, { value: 'hcn', label: 'HCN ⇌ H⁺ + CN⁻' }],
    onInput: () => { const r = RX[pick.value]; K.set(Math.log10(r.K)); c0.set(r.c0); c0.relabel(hue('concentration', r.a), r.aria); },
  });
  const K = ctl(d.controls, { label: '\\kKc', cls: 'equilibrium-constant', min: -10, max: 0, step: 0.001, value: Math.log10(4.9e-10), fmt: (lg) => sigText(10 ** lg), specials: [{ at: () => Math.log10(RX[pick.value].K), label: 'the example' }], aria: 'equilibrium constant Kc, on a logarithmic scale' });
  const c0 = ctl(d.controls, { label: hue('concentration', RX.hcn.a), cls: 'concentration', min: 0.01, max: 1, step: 0.01, value: 0.15, unit: 'M', dec: 2, specials: [{ at: () => RX[pick.value].c0, label: 'the example' }], aria: RX.hcn.aria });
  const ro = F.readout(d);
  let hits = [];
  F.hover(d.stage, () => hits);

  const COLS = [110, 470, 743, 1016, 1290], ROWS = [136, 176, 216, 256];
  const B = { l: 120, r: 850, t: 372, b: 712 }, BAR = { l: 940, r: 1020 };
  const LX = -10, DEC = 12, LIM = 0.05, RLIM = (LIM * LIM) / (1 - LIM);
  const share = (r) => (2 * r) / (r + Math.sqrt(r * r + 4 * r));
  const EX = [{ n: '13.10', r: 4.9e-10 / 0.15, what: 'HCN, K_c = 4.9 × 10⁻¹⁰, 0.15 M', ux: 0, uy: -1, gap: 48 }, { n: '13.9', r: 0.0211, what: 'PCl₅, K_c = 0.0211, 1.00 M', ux: 0.86, uy: 0.5, gap: 30 }];
  function table(ctx, r, c, x) {
    const cC = C('concentration'), mid = (i) => (COLS[i] + COLS[i + 1]) / 2;
    for (let i = 0; i < 5; i++) line(ctx, COLS[i], ROWS[0] - 20, COLS[i], ROWS[3] + 20, PAL.rule, 1.5);
    [ROWS[0] - 20, ROWS[0] + 20, ROWS[1] + 20, ROWS[2] + 20, ROWS[3] + 20].forEach((y) => line(ctx, COLS[0], y, COLS[4], y, PAL.rule, 1.5));
    r.sp.forEach((s, i) => text(ctx, s, mid(i + 1), ROWS[0], PAL.ink, { size: 22, weight: 600, align: 'center' }));
    text(ctx, '⇌', COLS[2], ROWS[0], PAL.ink, { size: 24, align: 'center', bg: PAL.panel });
    text(ctx, '+', COLS[3], ROWS[0], PAL.ink, { size: 22, align: 'center', bg: PAL.panel });
    ['Initial concentration (M)', 'Change (M)', 'Equilibrium concentration (M)'].forEach((s, j) => text(ctx, s, COLS[0] + 16, ROWS[j + 1], PAL.ink, { size: 20, weight: 600 }));
    const cs = c.toFixed(2), xs = sigText(x), v = (s) => [s, cC];
    const cells = [[[v(cs)], [v('0')], [v('0')]], [['−x = ', v('−' + xs)], ['+x = ', v('+' + xs)], ['+x = ', v('+' + xs)]], [[`${cs} − x = `, v(sigText(c - x))], ['x = ', v(xs)], ['x = ', v(xs)]]];
    cells.forEach((row, j) => row.forEach((parts, i) => F.rich(ctx, parts, mid(i + 1), ROWS[j + 1], { size: 20, align: 'center' })));
  }
  function draw() {
    const { ctx, H } = begin(d.c);
    hits = [];
    const r = RX[pick.value], k = 10 ** K.v, c = c0.v, ratio = k / c;
    const fx = share(ratio), fa = Math.sqrt(ratio), x = fx * c, xa = fa * c, ok = fx < LIM;
    const cC = C('concentration'), guide = alpha(PAL.ink, 0.4);
    const A = r.sp[0], spA = `[${A}]_{i}`, cs = c.toFixed(2), xs = sigText(x);
    const lines = topline(ctx, ok
      ? `$x$ is ${pct(fx)}% of ${spA}, so $${cs} - x \\approx ${cs}$ is justified: it puts $x$ ${pct(fa / fx - 1)}% too high.`
      : `$x$ is ${pct(fx)}% of ${spA}, too much to neglect: $${cs} - x \\approx ${cs}$ puts $x$ ${pct(fa / fx - 1)}% too high.`);
    const lab = F.labeller(ctx, H, { headline: lines });
    table(ctx, r, c, x);
    lab.block(COLS[0], ROWS[0] - 20, COLS[4], ROWS[3] + 20);

    /* the decades are counted from the left end, so the axes draw no zero line at K_c/c₀ = 1 */
    const a = F.axes(ctx, B, [0, DEC], [0, 100], { nx: 6, ny: 5, fx: (v) => pow10(v + LX), fy: (v) => v + '%', xl: `K_{c} / ${spA}`, yl: `x as a percent of ${spA}` });
    const X = (ra) => a.X(Math.log10(ra) - LX), Y = a.Y, y0 = Y(0), yT = Y(100), y5 = Y(100 * LIM);
    /* where x stays under 5% of the initial concentration */
    const xl = X(RLIM);
    ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.06); ctx.fillRect(B.l, B.t, xl - B.l, B.b - B.t); ctx.restore();
    line(ctx, xl, B.t, xl, y5, PAL.muted, 2, [10, 10]);
    line(ctx, B.l, y5, BAR.r, y5, PAL.muted, 2, [10, 10]);
    text(ctx, `x under 5% of ${spA}`, xl - 16, Y(46), PAL.muted, { size: 20, weight: 600, align: 'right' });
    lab.block(xl - 300, Y(46) - 16, xl, Y(46) + 16);

    F.plot(ctx, a, (s) => 100 * Math.sqrt(10 ** (s + LX)), PAL.muted, { w: 3, dash: [10, 10] });
    F.plot(ctx, a, (s) => 100 * share(10 ** (s + LX)), PAL.ink, { w: 5 });
    const key = F.legend(ctx, a, [{ s: 'x from the quadratic formula', color: PAL.ink, w: 5 }, { s: `x if ${cs} − x ≈ ${cs}`, color: PAL.muted, w: 3, dash: [10, 10] }], { corner: 'tl' });
    lab.place(key);

    /* the two worked examples, rings on the curve */
    EX.forEach((e) => {
      const ex = X(e.r), ey = Y(100 * share(e.r));
      ctx.save(); ctx.strokeStyle = PAL.muted; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(ex, ey, 14, 0, 2 * Math.PI); ctx.stroke(); ctx.restore();
      lab.add('Example ' + e.n, ex, ey, e.ux, e.uy, PAL.muted, 18, e.gap);
      hits.push({ x: ex, y: ey, r: 16, name: `Example ${e.n}: ${e.what}` });
    });

    /* this mixture: the exact x (filled) and the approximate x (hollow), each carried across to the bar */
    const px = X(ratio), pe = Y(100 * fx), over = fa > 1, pa = Y(100 * Math.min(fa, 1));
    line(ctx, px, Math.min(pe, pa), px, y0, guide, 2, [4, 8]);
    line(ctx, px, pe, BAR.l, pe, guide, 2, [4, 8]);

    /* the bar: all of the A put in, on the graph's percent scale; the slice is x */
    ctx.save();
    ctx.fillStyle = alpha(cC, 0.16); ctx.fillRect(BAR.l, yT, BAR.r - BAR.l, pe - yT);
    ctx.fillStyle = alpha(cC, 0.85); ctx.fillRect(BAR.l, pe, BAR.r - BAR.l, y0 - pe);
    ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2; ctx.strokeRect(BAR.l, yT, BAR.r - BAR.l, y0 - yT);
    ctx.restore();
    if (!over) { line(ctx, px, pa, BAR.l, pa, PAL.muted, 2, [4, 8]); line(ctx, BAR.l - 8, pa, BAR.r + 8, pa, PAL.muted, 3); }
    text(ctx, '5%', (B.r + BAR.l) / 2, y5, PAL.muted, { size: 17, weight: 600, align: 'center', bg: PAL.panel });
    F.rich(ctx, [spA + ' = ', [cs + ' M', cC]], BAR.l, B.t - 24, { size: 20, weight: 600 });
    const ySl = Math.min((pe + y0) / 2, y0 - 14), yRem = Math.min(Math.max((yT + pe) / 2, yT + 14), ySl - 30);
    F.rich(ctx, [`[${A}] = `, [sigText(c - x) + ' M', cC]], BAR.r + 18, yRem, { size: 19 });
    F.rich(ctx, [`[${r.sp[1]}] = [${r.sp[2]}] = `, [xs + ' M', cC]], BAR.r + 18, ySl, { size: 19 });

    dot(ctx, px, pa, PAL.ink, false, 11);
    if (over) { F.arrow(ctx, px, yT - 16, px, yT - 44, PAL.muted, 3); text(ctx, `${pct(fa)}%`, px - 14, yT - 30, PAL.muted, { size: 17, weight: 600, align: 'right' }); }
    dot(ctx, px, pe, PAL.ink, true, 8);
    lab.block(px - 14, Math.min(pe, pa) - 14, px + 14, y0);
    lab.flush();

    hits.push(
      { x: px, y: pe, r: 14, name: `x = ${xs} M from the quadratic formula, ${pct(fx)}% of ${cs} M` },
      { x: px, y: pa, r: 14, name: `x ≈ √(K_c × ${cs}) = ${sigText(xa)} M, ${pct(fa)}% of ${cs} M` },
      { x: (BAR.l + BAR.r) / 2, y: (yT + pe) / 2, r: Math.max(12, Math.min(35, (pe - yT) / 2)), name: `${A} left at equilibrium, ${sigText(c - x)} M` },
      { x: (BAR.l + BAR.r) / 2, y: Math.min((pe + y0) / 2, y0 - 6), r: Math.max(12, Math.min(35, (y0 - pe) / 2)), name: `${A} that reacted, x = ${xs} M` },
      { x: xl, y: (B.t + y5) / 2, r: 14, name: `left of this line x is under 5% of ${spA.replace(/_\{(\w+)\}/g, '$1')}` },
    );
    const xt = sigTex(x), ct = hue('concentration', cs), kt = hue('equilibrium-constant', sigTex(k));
    ro.set(`\\kKc = \\frac{(x)(x)}{${ct}\\,-\\,x} = \\frac{(\\mk{x1}{${xt}})(\\mk{x2}{${xt}})}{\\mk{c}{${ct}}\\,-\\,\\mk{x3}{${xt}}} = \\mk{K}{${kt}} \\\\ `
      + `x \\approx \\sqrt{\\kKc \\times ${ct}} = \\sqrt{\\mk{K2}{${kt}} \\times \\mk{c2}{${ct}}} = \\mk{xa}{${sigTex(xa)}}\\ \\text{M}`);
  }
  register(d.fig, { update: () => {}, draw });
})();
};
