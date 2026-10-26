/* Figures for section 14.5 Polyprotic Acids. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['14.5'] = function (root, F) {
const { C, PAL, ctl, register, begin, line, text, topline } = F;
const sim = (id, H) => F.sim(root, id, H);

const SUP = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
const sup = (n) => String(n).split('').map((c) => SUP[c]).join('');
const pow10 = (k) => (k === 0 ? '1' : k === 1 ? '10' : '10' + sup(k));
/* x to n significant figures: plain from 0.001 to below 1000, otherwise m × 10ⁿ; as figure text and as TeX */
function sig(x, n = 3) {
  let e = Math.floor(Math.log10(Math.abs(x)));
  if (e >= -3 && e < 3) return { plain: String(Number(x.toPrecision(n))) };
  let m = (x / 10 ** e).toFixed(n - 1);
  if (+m >= 10) { e += 1; m = (x / 10 ** e).toFixed(n - 1); }
  return { m, e };
}
const sigText = (x, n) => { const s = sig(x, n); return s.plain ?? `${s.m} × 10${sup(s.e)}`; };
const sigTex = (x, n) => { const s = sig(x, n); return s.plain ?? `${s.m} \\times 10^{${s.e}}`; };
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;

/* =====================================================================
   SIM: stepwise ionization of a polyprotic acid, solved as the book
   solves Example 14.19. The first step gives x = [H₃O⁺] = [HA⁻] as the
   positive root of K_a1 = x²/(c₀ − x), written 2Kc₀/(K + √(K² + 4Kc₀))
   so it keeps its digits; each later species is K_a[previous]/[H₃O⁺],
   which the earlier steps' x outweighs. Every species stands as a level
   on one log concentration axis, fixed from 10⁻²¹ to 10³ M: the controls
   reach from 1.0 M (H₂A at 1.0 M) down to 1.0 × 10⁻¹⁹ M (S²⁻), and the
   decades above 1 M are headroom for the value written over the top level. Still: equilibrium has no clock here.
===================================================================== */
(function () {
  const d = sim('sim-stepwise', 640);
  const ACIDS = {
    h2co3: { c0: 0.033, K: [4.3e-7, 4.7e-11], sp: ['H_{2}CO_{3}', 'HCO_{3}⁻', 'CO_{3}²⁻'], hover: ['H₂CO₃', 'HCO₃⁻', 'CO₃²⁻'],
      a: '[\\text{H}_{2}\\text{CO}_{3}]_{0}', aria: 'initial concentration of H2CO3' },
    h2s: { c0: 0.1, K: [8.9e-8, 1.0e-19], sp: ['H_{2}S', 'HS⁻', 'S²⁻'], hover: ['H₂S', 'HS⁻', 'S²⁻'],
      a: '[\\text{H}_{2}\\text{S}]_{0}', aria: 'initial concentration of H2S' },
    h3po4: { c0: 0.1, K: [7.5e-3, 6.2e-8, 4.2e-13], sp: ['H_{3}PO_{4}', 'H_{2}PO_{4}⁻', 'HPO_{4}²⁻', 'PO_{4}³⁻'], hover: ['H₃PO₄', 'H₂PO₄⁻', 'HPO₄²⁻', 'PO₄³⁻'],
      a: '[\\text{H}_{3}\\text{PO}_{4}]_{0}', aria: 'initial concentration of H3PO4' },
  };
  const TEX = { h2co3: ['\\text{H}_{2}\\text{CO}_{3}', '\\text{HCO}_{3}^{-}', '\\text{CO}_{3}^{2-}'], h2s: ['\\text{H}_{2}\\text{S}', '\\text{HS}^{-}', '\\text{S}^{2-}'],
    h3po4: ['\\text{H}_{3}\\text{PO}_{4}', '\\text{H}_{2}\\text{PO}_{4}^{-}', '\\text{HPO}_{4}^{2-}', '\\text{PO}_{4}^{3-}'] };
  const KS = ['K_{a1}', 'K_{a2}', 'K_{a3}'];
  const pick = F.choice(d.controls, {
    label: '\\text{acid}', aria: 'the acid', value: 'h2co3', ms: 0,
    options: [{ value: 'h2co3', label: 'H₂CO₃' }, { value: 'h2s', label: 'H₂S' }, { value: 'h3po4', label: 'H₃PO₄' }],
    onInput: () => { const a = ACIDS[pick.value]; c0.set(Math.log10(a.c0)); c0.relabel(hue('concentration', a.a), a.aria); },
  });
  const c0 = ctl(d.controls, { label: hue('concentration', ACIDS.h2co3.a), cls: 'concentration', min: -3, max: 0, step: 0.01, value: Math.log10(0.033), unit: '', dec: 2, aria: ACIDS.h2co3.aria });
  const cBox = c0.el.querySelector('.ctl-val');
  const ro = F.readout(d);
  let hits = [];
  F.hover(d.stage, () => hits);

  const B = { l: 210, r: 1130, t: 130, b: 520 };
  const LY = [0, 24], L0 = -21;   /* log₁₀ of the concentration less L0, so the frame has no zero line inside it */
  function solve(a, c) {
    const k = a.K[0], x = (2 * k * c) / (k + Math.sqrt(k * k + 4 * k * c));
    const v = [c - x, x];
    for (let i = 1; i < a.K.length; i++) v.push((a.K[i] * v[i]) / x);
    return { x, v };
  }
  function draw() {
    const { ctx, H } = begin(d.c);
    const key = pick.value, a = ACIDS[key], n = a.sp.length;
    const c = Number((10 ** c0.v).toPrecision(2)), { x, v } = solve(a, c);
    const cC = C('concentration'), cK = C('equilibrium-constant');
    if (cBox) cBox.textContent = sigText(c, 2) + ' M';

    const rel = (hi, lo) => (hi >= lo ? `${sigText(hi / lo, 2)} times below` : `${sigText(lo / hi, 2)} times above`);
    const lines = topline(ctx, `${a.sp[1]} lies ${rel(v[0], v[1])} ${a.sp[0]}, and ${a.sp[2]} ${rel(v[1], v[2])} ${a.sp[1]}.`);
    const lab = F.labeller(ctx, H, { headline: lines });

    const ax = F.axes(ctx, B, [0, n], LY, { nx: n, ny: 8, fx: () => '', fy: (s) => pow10(Math.round(s) + L0), yl: 'concentration (M)', yc: cC });
    const { X } = ax, Y = (lg) => ax.Y(lg - L0), mid = (i) => X(i + 0.5);
    lab.block(B.l - 110, B.t - 44, B.l + 190, B.t - 6); lab.block(B.l - 110, B.t, B.l - 4, B.b + 20); lab.block(B.l, B.b + 4, B.r, B.b + 90);

    /* the chain under the axis: each species, and the step that leads to the next */
    a.sp.forEach((s, i) => text(ctx, s, mid(i), B.b + 32, F.cat(i), { size: 22, weight: 600, align: 'center' }));
    for (let i = 0; i < n - 1; i++) {
      const xm = X(i + 1);
      F.arrow(ctx, xm - 26, B.b + 32, xm + 26, B.b + 32, PAL.ink, 3);
      text(ctx, KS[i], xm, B.b + 64, cK, { size: 20, weight: 600, align: 'center' });
    }

    const yH = Y(Math.log10(x));
    line(ctx, B.l, yH, B.r, yH, cC, 3, [10, 10]);
    const k = F.arrival(d), half = Math.min(80, (B.r - B.l) / n / 2 - 30);
    hits = [];
    v.forEach((cv, i) => {
      const y = Y(Math.log10(cv)), w = half * F.ease.smooth(F.stagger(k, i, n));
      if (w > 0) line(ctx, mid(i) - w, y, mid(i) + w, y, F.cat(i), 7);
      lab.block(mid(i) - half, y - 5, mid(i) + half, y + 5);
      hits.push({ x: mid(i), y, r: half, name: `${a.hover[i]}: ${sigText(cv, i ? 3 : 2)} M` });
    });
    v.forEach((cv, i) => lab.add(`${sigText(cv, i ? 3 : 2)} M`, mid(i), Y(Math.log10(cv)), 0, -1, cC, 20, 32));
    lab.add(`[H_{3}O⁺] = ${sigText(x)} M`, B.r, yH, 1, 0, cC, 20, 12);
    lab.flush();
    hits.push({ x: (B.l + B.r) / 2, y: yH, r: 12, name: `[H₃O⁺] = ${sigText(x)} M` });

    const T = TEX[key], xt = sigTex(x), ct = hue('concentration', sigTex(c, 2));
    ro.set(`\\kKaone = \\frac{(x)(x)}{${ct} - x} = \\frac{(\\mk{x1}{${xt}})(\\mk{x2}{${xt}})}{\\mk{c}{${ct}} - \\mk{x3}{${xt}}} = \\mk{K}{${sigTex(a.K[0], 2)}}`,
      `$[${T[2]}] = \\kKatwo [${T[1]}]/\\kconcHyd$ = ${sigText(a.K[1], 2)} M at every starting concentration, since $[${T[1]}] = \\kconcHyd$.`);
  }
  register(d.fig, { update: () => {}, draw });
})();
};
