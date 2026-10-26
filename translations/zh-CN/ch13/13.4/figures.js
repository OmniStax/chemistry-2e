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
const pct = (v) => String(Number((100 * v).toPrecision(2)));
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;

/* =====================================================================
   SIM: the equilibrium of A ⇌ B + C from A alone, K_c = x²/(c₀ − x),
   for the two decompositions the section solves (PCl₅, Example 13.9;
   HCN, Example 13.10). Above, the ICE table with the live numbers;
   below, on log–log axes, Q_c of the mixture after a change x (solid,
   rising to the vertical x = c₀), the approximation x²/c₀ (dashed), and
   the K_c level. The exact x is the positive root of the book's
   quadratic, written as 2Kc₀/(K + √(K² + 4Kc₀)) so that it keeps its
   digits at K = 10⁻¹⁰; the approximate x is √(K c₀). Axes fixed: x from
   10⁻⁸ to 10 M, Q_c from 10⁻¹² to 10²; at the slider extremes (K 10⁻¹⁰
   to 10, c₀ 0.01 to 2.00 M) the exact x runs from 10⁻⁶ to 2 M and the
   approximate x to 4.5 M, so every state stays inside. Still: the
   arithmetic of an equilibrium has no clock.
===================================================================== */
(function () {
  const d = sim('sim-small-x', 720);
  const RX = {
    pcl5: { K: 0.0211, c0: 1.0, sp: ['PCl_{5}', 'PCl_{3}', 'Cl_{2}'], a: '[\\text{PCl}_{5}]_{i}', aria: 'initial concentration of PCl5' },
    hcn: { K: 4.9e-10, c0: 0.15, sp: ['HCN', 'H⁺', 'CN⁻'], a: '[\\text{HCN}]_{i}', aria: 'initial concentration of HCN' },
  };
  const pick = F.choice(d.controls, {
    label: '\\text{reaction}', aria: 'the reaction', value: 'hcn', ms: 0,
    options: [{ value: 'pcl5', label: 'PCl₅ ⇌ PCl₃ + Cl₂' }, { value: 'hcn', label: 'HCN ⇌ H⁺ + CN⁻' }],
    onInput: () => { const r = RX[pick.value]; K.set(Math.log10(r.K)); c0.set(r.c0); c0.relabel(hue('concentration', r.a), r.aria); },
  });
  const K = ctl(d.controls, { label: '\\kKc', cls: 'equilibrium-constant', min: -10, max: 1, step: 0.001, value: Math.log10(4.9e-10), unit: '', dec: 2, aria: 'equilibrium constant Kc, on a logarithmic scale' });
  const c0 = ctl(d.controls, { label: hue('concentration', RX.hcn.a), cls: 'concentration', min: 0.01, max: 2, step: 0.01, value: 0.15, unit: 'M', dec: 2, aria: RX.hcn.aria });
  const kBox = K.el.querySelector('.ctl-val');
  const ro = F.readout(d);
  let hits = [];
  F.hover(d.stage, () => hits);

  const COLS = [150, 520, 770, 1020, 1270], ROWS = [124, 164, 204, 244];
  const B = { l: 200, r: 1300, t: 340, b: 640 };
  const LX = [-8, 1], LY = [-12, 2];
  function table(ctx, r, c, x) {
    const cC = C('concentration'), mid = (i) => (COLS[i] + COLS[i + 1]) / 2;
    for (let i = 0; i < 5; i++) line(ctx, COLS[i], ROWS[0] - 20, COLS[i], ROWS[3] + 20, PAL.rule, 1.5);
    [ROWS[0] - 20, ROWS[0] + 20, ROWS[1] + 20, ROWS[2] + 20, ROWS[3] + 20].forEach((y) => line(ctx, COLS[0], y, COLS[4], y, PAL.rule, 1.5));
    r.sp.forEach((s, i) => text(ctx, s, mid(i + 1), ROWS[0], PAL.ink, { size: 22, weight: 600, align: 'center' }));
    text(ctx, '⇌', COLS[2], ROWS[0], PAL.ink, { size: 24, align: 'center', bg: PAL.panel });
    text(ctx, '+', COLS[3], ROWS[0], PAL.ink, { size: 22, align: 'center', bg: PAL.panel });
    ['Initial concentration (M)', 'Change (M)', 'Equilibrium concentration (M)'].forEach((s, j) => text(ctx, s, COLS[0] + 16, ROWS[j + 1], PAL.ink, { size: 19, weight: 600 }));
    const cs = c.toFixed(2), xs = sigText(x);
    const cells = [[cs, '0', '0'], ['−x = −' + xs, '+x = ' + xs, '+x = ' + xs], [`${cs} − x = ${sigText(c - x)}`, 'x = ' + xs, 'x = ' + xs]];
    cells.forEach((row, j) => row.forEach((s, i) => text(ctx, s, mid(i + 1), ROWS[j + 1], cC, { size: 19, align: 'center' })));
  }
  function draw() {
    const { ctx, H } = begin(d.c);
    const r = RX[pick.value], k = 10 ** K.v, c = c0.v, lk = K.v, lc = Math.log10(c);
    const x = (2 * k * c) / (k + Math.sqrt(k * k + 4 * k * c)), xa = Math.sqrt(k * c);
    const cK = C('equilibrium-constant'), cC = C('concentration');
    if (kBox) kBox.textContent = sigText(k);
    const spA = `[${r.sp[0]}]_{i}`, cs = c.toFixed(2);
    const lines = topline(ctx, `$x$ is ${pct(x / c)}% of ${spA}, and the approximation $${cs} - x \\approx ${cs}$ puts $x$ ${pct(xa / x - 1)}% too high.`);
    const lab = F.labeller(ctx, H, { headline: lines });
    table(ctx, r, c, x);
    lab.block(COLS[0], ROWS[0] - 20, COLS[4], ROWS[3] + 20);

    /* the decades are counted from the lower ends, so the axes draw no zero lines at x = 1 M and Q_c = 1 */
    const a = F.axes(ctx, B, [0, LX[1] - LX[0]], [0, LY[1] - LY[0]], { nx: 9, ny: 7, fx: (v) => pow10(v + LX[0]), fy: (v) => pow10(v + LY[0]), xl: 'x (M)', yl: 'Q_{c}', yc: cK });
    lab.block(B.l - 120, B.t - 44, B.l + 60, B.t - 6); lab.block(B.l - 120, B.t, B.l - 4, B.b + 40); lab.block(B.l, B.b + 4, B.r + 10, B.b + 76);
    const X = (s) => a.X(s - LX[0]), Y = (s) => a.Y(s - LY[0]), L = Math.log10;
    ctx.save(); ctx.beginPath(); ctx.rect(B.l, B.t, B.r - B.l, B.b - B.t); ctx.clip();
    const xc = X(lc);
    line(ctx, xc, B.t, xc, B.b, cC, 2.5, [10, 10]);
    line(ctx, X(LX[0]), Y(2 * LX[0] - lc), X(LX[1]), Y(2 * LX[1] - lc), PAL.muted, 3, [14, 9]);
    F.curve(ctx, (s) => { const v = 10 ** s; return Math.min(4, L((v * v) / (c - v))); }, LX[0], lc - 1e-7, X, Y, cK, 5, 700);
    const yK = Y(lk);
    line(ctx, B.l, yK, B.r, yK, cK, 3, [10, 10]);
    const pe = { x: X(L(x)), y: yK }, pa = { x: X(L(xa)), y: yK };
    line(ctx, pa.x, yK, pa.x, B.b, alpha(PAL.ink, 0.4), 2, [4, 8]);
    line(ctx, pe.x, yK, pe.x, B.b, alpha(PAL.ink, 0.4), 2, [4, 8]);
    ctx.restore();
    dot(ctx, pa.x, pa.y, PAL.ink, false, 11);
    dot(ctx, pe.x, pe.y, PAL.ink, true, 8);
    lab.block(pe.x - 14, yK - 14, pa.x + 14, yK + 14);

    /* the names: the K_c level at its left end, each curve where it runs clear of the other, the vertical at its foot */
    const up = lk > -4 ? -1 : 1;
    lab.add(`K_{c} = ${sigText(k)}`, B.l + 16, yK, 0.5, -0.87 * up, cK, 20, 24);
    const q = lk > -0.5 ? -2 : 1, xq = (-(10 ** q) + Math.sqrt(10 ** (2 * q) + 4 * 10 ** q * c)) / 2;
    lab.add(`x²/(${cs} − x)`, X(L(xq)), Y(q), -1, 0, cK, 20, 22);
    const q2 = Math.abs(lk + 3) < 1.5 ? -6 : -3, sq = (q2 + lc) / 2;
    lab.add(`x²/${cs}`, X(sq), Y(q2), 0.71, 0.71, PAL.muted, 20, 26);
    lab.add(spA, xc, B.b - 18, 1, 0, cC, 20, 16);
    lab.flush();

    hits = [
      { x: pe.x, y: pe.y, r: 14, name: `x = ${sigText(x)} M, the positive root of the quadratic` },
      { x: pa.x, y: pa.y, r: 14, name: `x ≈ √(K_c × ${cs}) = ${sigText(xa)} M` },
      { x: xc, y: B.t + 20, r: 16, name: `x cannot exceed ${spA.replace(/_\{(\w+)\}/g, '$1')} = ${cs} M` },
    ];
    const xt = sigTex(x), ct = hue('concentration', cs);
    ro.set(`\\kKc = \\frac{(x)(x)}{${ct}\\,-\\,x} = \\frac{(\\mk{x1}{${xt}})(\\mk{x2}{${xt}})}{\\mk{c}{${ct}}\\,-\\,\\mk{x3}{${xt}}} = \\mk{K}{${hue('equilibrium-constant', sigTex(k))}}`,
      `If $x \\ll ${cs}$, then $x \\approx \\sqrt{\\kKc \\times ${cs}}$ = ${sigText(xa)} M.`);
  }
  register(d.fig, { update: () => {}, draw });
})();
};
