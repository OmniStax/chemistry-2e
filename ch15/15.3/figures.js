/* Figures for section 15.3 Coupled Equilibria. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['15.3'] = function (root, F) {
const { C, PAL, alpha, ctl, register, begin, line, text, topline } = F;
const sim = (id, H) => F.sim(root, id, H);
const still = (d, draw) => register(d.fig, { update: () => {}, draw });
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;
const TAU = 2 * Math.PI, RAD = Math.PI / 180;

const SUP = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
const sup = (n) => String(n).split('').map((c) => SUP[c]).join('');
const pow10 = (k) => (k === 0 ? '1' : k === 1 ? '10' : '10' + sup(k));
/* x to two significant figures: plain from 0.01 to below 100, otherwise m × 10ⁿ */
function sig(x) {
  let e = Math.floor(Math.log10(x));
  if (e >= -2 && e < 2) return { plain: String(Number(x.toPrecision(2))) };
  let m = (x / 10 ** e).toFixed(1);
  if (+m >= 10) { e += 1; m = (x / 10 ** e).toFixed(1); }
  return { m, e };
}
const round2 = (x) => Number(x.toPrecision(2));
const sigText = (x) => { const s = sig(x); return s.plain ?? `${s.m} × 10${sup(s.e)}`; };
const sigTex = (x) => { const s = sig(x); return s.plain ?? `${s.m} \\times 10^{${s.e}}`; };

/* =====================================================================
   SIM: the solubility of Al(OH)₃ against pH, with the book's constants:
   K_sp = 2 × 10⁻³² and, for Al(OH)₃ + OH⁻ ⇌ Al(OH)₄⁻, K = K_sp K_f = 22.
   In a solution held at one pH, [Al³⁺] = K_sp/[OH⁻]³ (Example 15.15) and
   [Al(OH)₄⁻] = K[OH⁻]; the molar solubility is their sum, and [OH⁻] comes
   from pOH = 14.00 − pH. On log axes the two are lines of slope −3 and +1
   that cross at pH 5.74 (sum 2.4 × 10⁻⁷ M); the sum is least just above,
   2.1 × 10⁻⁷ M at pH 5.86, where 3K_sp/[OH⁻]⁴ = K. Axes fixed:
   pH 2 to 14, the slider's 3 to 13 with a unit of headroom each side;
   concentration 10⁻¹² to 10² M, since the sum reaches 20 M at pH 3 and
   2.2 M at pH 13, so the point never leaves the box. Still: equilibrium
   at a set pH has no clock.
===================================================================== */
(function () {
  const H = 640, d = sim('sim-solubility-ph', H);
  const KSP = 2e-32, K = 22, LKSP = Math.log10(KSP), LK = Math.log10(K);
  const pH = ctl(d.controls, { label: '\\kpH', cls: 'concentration', key: 'pH', min: 3, max: 13, step: 0.01, value: 4.74, unit: '', dec: 2,
    aria: 'the pH of the buffered solution', detents: [{ v: 4.74, label: 'acetate buffer' }] });
  const ro = F.readout(d);
  let hits = [];
  F.hover(d.stage, () => hits);
  const G = { l: 210, r: 1250, t: 130, b: 530 };
  const la = (p) => LKSP + 3 * (14 - p);          /* log [Al³⁺] */
  const lb = (p) => LK - (14 - p);                 /* log [Al(OH)₄⁻] */
  const ls = (p) => Math.log10(10 ** la(p) + 10 ** lb(p));
  const L0 = -12;   /* log₁₀ of the concentration less L0, so the frame has no zero line inside it */
  function draw() {
    const { ctx } = begin(d.c);
    const cC = C('concentration'), cA = F.ref('al-ion'), cB = F.ref('aluminate');
    const p = Math.round(pH.v * 100) / 100, pOH = 14 - p, oh = round2(10 ** -pOH);
    const t1 = round2(KSP / oh ** 3), t2 = round2(K * oh), s = round2(t1 + t2);
    const f = 10 ** la(p) / (10 ** la(p) + 10 ** lb(p));
    const share = f > 0.99 ? 'nearly all of it as Al³⁺' : f < 0.01 ? 'nearly all of it as Al(OH)_{4}⁻' : `${Math.round(100 * f)} percent of it as Al³⁺`;
    const lines = topline(ctx, `At pH ${p.toFixed(2)}, Al(OH)_{3} dissolves to ${sigText(s)} M, ${share}.`);
    const lab = F.labeller(ctx, H, { headline: lines });
    const ax = F.axes(ctx, G, [2, 14], [0, 14], { nx: 6, ny: 7, fx: (v) => String(Math.round(v)), fy: (v) => pow10(Math.round(v) + L0),
      xl: 'pH', xc: cC, yl: 'concentration (M)', yc: cC });
    const g = { X: ax.X, Y: (lg) => ax.Y(lg - L0) };
    lab.block(G.l - 120, G.t - 46, G.l + 220, G.t - 4); lab.block(G.l - 120, G.t, G.l - 4, G.b + 70); lab.block(G.l, G.b + 4, G.r, G.b + 70);
    ctx.save(); ctx.beginPath(); ctx.rect(G.l, G.t, G.r - G.l, G.b - G.t); ctx.clip();
    F.curve(ctx, ls, 2, 14, g.X, g.Y, cC, 7, 160);
    F.curve(ctx, la, 2, 14, g.X, g.Y, cA, 3, 2);
    F.curve(ctx, lb, 2, 14, g.X, g.Y, cB, 3, 2);
    ctx.restore();
    const y = ls(p), inside = y <= 2 && y >= -12;
    if (inside) {
      line(ctx, g.X(p), g.Y(y), g.X(p), G.b, alpha(cC, 0.6), 2.5, [4, 8]);
      line(ctx, G.l, g.Y(y), g.X(p), g.Y(y), alpha(cC, 0.6), 2.5, [4, 8]);
    }
    const pt = F.pinned(ctx, G, g.X, g.Y, p, y, cC);
    lab.place({ l: pt.x - 12, t: pt.y - 12, r: pt.x + 12, b: pt.y + 12 });
    text(ctx, `${sigText(s)} M`, G.l + 12, Math.min(Math.max(pt.y - 18, G.t + 14), G.b - 30), cC, { size: 17, weight: 600, bg: PAL.panel });
    lab.add('[Al³⁺]', g.X(6.6), g.Y(la(6.6)), 1, 0, cA, 22, 22);
    lab.add('[Al(OH)_{4}⁻]', g.X(3.3), g.Y(lb(3.3)), -0.25, 1, cB, 22, 22);
    lab.add('molar solubility', g.X(10.5), g.Y(ls(10.5)), -0.6, -0.8, cC, 22, 30);
    lab.flush();
    hits = [];
    [3, 4, 5, 6, 7, 8, 9, 10].forEach((q) => { if (la(q) > -12 && la(q) < 2) hits.push({ x: g.X(q), y: g.Y(la(q)), r: 14, name: '[Al³⁺], the line of the acid coupling' }); });
    [3, 5, 7, 9, 11, 13].forEach((q) => { if (lb(q) > -12 && lb(q) < 2) hits.push({ x: g.X(q), y: g.Y(lb(q)), r: 14, name: '[Al(OH)₄⁻], the line of the complex coupling' }); });
    hits.push({ x: pt.x, y: pt.y, r: 16, name: `molar solubility at pH ${p.toFixed(2)}: ${sigText(s)} M` });
    const ohT = hue('concentration', sigTex(oh));
    ro.set(`[\\text{Al}^{3+}] + [\\text{Al(OH)}_{4}{}^{-}] = \\frac{\\kKsp}{{\\kconcOH}^{3}} + \\kK\\,\\kconcOH = \\frac{${hue('equilibrium-constant', '2 \\times 10^{-32}')}}{(${ohT})^{3}} + ${hue('equilibrium-constant', '22')}\\,(${ohT}) = ${hue('concentration', sigTex(t1))} + ${hue('concentration', sigTex(t2))} = ${hue('concentration', sigTex(s))}\\ \\text{M}`,
      'Each unit of $\\kpH$ multiplies $\\kconcOH$ by 10, which divides [Al³⁺] by 1000 and multiplies [Al(OH)₄⁻] by 10.');
  }
  still(d, draw);
})();

};
