/* Figures for section 15.3 Coupled Equilibria. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['15.3'] = function (root, F) {
const { C, PAL, alpha, ctl, register, begin, line, text, topline, dot } = F;
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
  if (e >= -2 && e < 2) return { plain: x.toPrecision(2) };
  let m = (x / 10 ** e).toFixed(1);
  if (+m >= 10) { e += 1; m = (x / 10 ** e).toFixed(1); }
  return { m, e };
}
const round2 = (x) => Number(x.toPrecision(2));
const sigText = (x) => { const s = sig(x); return s.plain ?? `${s.m} × 10${sup(s.e)}`; };
const sigTex = (x) => { const s = sig(x); return s.plain ?? `${s.m} \\times 10^{${s.e}}`; };

/* =====================================================================
   SIM: a sample of Al(OH)₃ in a buffered solution, and its solubility
   against pH, with the book's constants: K_sp = 2 × 10⁻³² and, for
   Al(OH)₃ + OH⁻ ⇌ Al(OH)₄⁻, K = K_sp K_f = 22. At a pH the buffer holds,
   [Al³⁺] = K_sp/[OH⁻]³ (Example 15.15) and [Al(OH)₄⁻] = K[OH⁻]; the
   molar solubility is their sum, and [OH⁻] comes from pOH = 14.00 − pH.
   On log axes the two are lines of slope −3 and +1 that cross at pH 5.74;
   the sum is least just above, 2.1 × 10⁻⁷ M at pH 5.86, where
   3K_sp/[OH⁻]⁴ = K. The beaker holds 1.0 × 10⁻³ mol of the solid in
   1.00 L (the sample is the figure's own, chosen so that the buffer of
   Example 15.15 dissolves a visible part of it); one mark is 5 × 10⁻⁵ mol.
   Axes fixed: pH 3 to 13, concentration 10⁻¹⁰ to 1 M; the slider runs
   3.50 to 12.50, where the sum is 0.63 M and 0.70 M, so the point never
   leaves the box. Still: equilibrium at a set pH has no clock.
===================================================================== */
(function () {
  const H = 690, d = sim('sim-solubility-ph', H);
  const KSP = 2e-32, K = 22, LKSP = Math.log10(KSP), LK = Math.log10(K);
  const C0 = 1e-3, MARKS = 20;                       /* the sample, mol in 1.00 L, and the marks it is drawn as */
  const PMIN = 14 + Math.log10(3 * KSP / K) / 4;     /* the pH of least solubility, 5.86 */
  const pH = ctl(d.controls, { label: '\\kpH', cls: 'concentration', key: 'pH', min: 3.5, max: 12.5, step: 0.01, value: 4.74, unit: '', dec: 2,
    aria: 'the pH of the buffered solution', detents: [{ v: 4.74, label: 'Example 15.15' }, { v: 5.86, label: 'lowest' }] });
  const ro = F.readout(d);
  let hits = [];
  F.hover(d.stage, () => hits);
  const G = { l: 150, r: 900, t: 150, b: 560 };
  const la = (p) => LKSP + 3 * (14 - p);          /* log [Al³⁺] */
  const lb = (p) => LK - (14 - p);                 /* log [Al(OH)₄⁻] */
  const ls = (p) => Math.log10(10 ** la(p) + 10 ** lb(p));
  const L0 = -10;   /* log₁₀ of the concentration less L0, so the frame has no zero line inside it */
  /* the beaker: inner walls, rim, base, the solution's surface */
  const BL = 1060, BR = 1330, RIM = 196, BASE = 540, LEVEL = 262;
  const DOTS = []; for (let r = 0; r < 4; r++) for (let c = 0; c < 5; c++) DOTS.push([BL + 38 + c * 48.5 + ((r * 7 + c * 3) % 5) * 4 - 8, LEVEL + 34 + r * 40 + ((c * 5 + r * 2) % 4) * 5 - 7]);
  const ORDER = DOTS.map((_, i) => (i * 7) % MARKS);
  /* the settled solid: a layer of 11 lumps across the bottom and 9 on top of it, each [x, y, r], filled from the middle outward */
  const HEAP = [];
  [11, 9].forEach((n, r) => { const mid = (n - 1) / 2; Array.from({ length: n }, (_, c) => c).sort((a, b) => Math.abs(a - mid) - Math.abs(b - mid)).forEach((c) => HEAP.push([(BL + BR) / 2 + (c - mid) * 23.4 + ((c * 3 + r) % 3) - 1, BASE - 13 - r * 19 - ((c * 5 + r * 2) % 3), 10 + ((c * 7 + r * 3) % 4) * 0.7])); });
  function beakerPath(ctx) {
    ctx.beginPath(); ctx.moveTo(BL - 16, RIM - 6); ctx.quadraticCurveTo(BL - 2, RIM - 4, BL, RIM + 12); ctx.lineTo(BL, BASE - 16); ctx.quadraticCurveTo(BL, BASE, BL + 16, BASE); ctx.lineTo(BR - 16, BASE); ctx.quadraticCurveTo(BR, BASE, BR, BASE - 16); ctx.lineTo(BR, RIM + 8); ctx.quadraticCurveTo(BR, RIM - 2, BR + 8, RIM - 4);
  }
  const lump = (ctx, x, y, fill, r = 10.5) => { ctx.save(); ctx.fillStyle = fill; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore(); };
  const ion = (ctx, x, y, fill) => { ctx.save(); ctx.fillStyle = fill; ctx.beginPath(); ctx.arc(x, y, 7.5, 0, TAU); ctx.fill(); ctx.restore(); };
  function draw() {
    const { ctx } = begin(d.c);
    const cC = C('concentration'), cA = F.ref('al-ion'), cB = F.ref('aluminate'), white = F.fact('#f4f4f2');
    const p = Math.round(pH.v * 100) / 100, pOH = 14 - p, oh = round2(10 ** -pOH);
    const t1 = round2(KSP / oh ** 3), t2 = round2(K * oh), s = round2(t1 + t2);
    const f = t1 / (t1 + t2);                          /* the share of the dissolved aluminum that is Al³⁺ */
    const all = s >= C0, diss = Math.min(s, C0), solid = C0 - diss;
    const share = f > 0.99 ? 'nearly all of it as Al³⁺' : f < 0.01 ? 'nearly all of it as Al(OH)_{4}⁻' : `${Math.round(100 * f)} percent of it as Al³⁺`;
    const lowest = Math.abs(p - PMIN) < 0.006;
    const lines = topline(ctx, all
      ? `At pH ${p.toFixed(2)}, as much as ${sigText(s)} M of Al(OH)_{3} can dissolve, ${share}, so the whole sample does.`
      : `At pH ${p.toFixed(2)}, Al(OH)_{3} dissolves to ${sigText(s)} M, ${lowest ? 'the least at any pH' : share}.`);
    const lab = F.labeller(ctx, H, { headline: lines });
    /* the graph */
    const ax = F.axes(ctx, G, [3, 13], [0, 10], { nx: 5, ny: 5, fx: (v) => String(Math.round(v)), fy: (v) => pow10(Math.round(v) + L0),
      xl: 'pH', xc: cC, yl: 'concentration (M)', yc: cC });
    const g = { X: ax.X, Y: (lg) => ax.Y(lg - L0) };
    lab.block(G.l - 120, G.t - 46, G.l + 220, G.t - 4); lab.block(G.l - 120, G.t, G.l - 4, G.b + 70); lab.block(G.l, G.b + 4, G.r, G.b + 70);
    const yS = g.Y(Math.log10(C0));
    line(ctx, G.l, yS, G.r, yS, alpha(PAL.ink, 0.5), 2, [10, 10]);
    ctx.save(); ctx.beginPath(); ctx.rect(G.l, G.t, G.r - G.l, G.b - G.t); ctx.clip();
    F.curve(ctx, la, 3, 13, g.X, g.Y, cA, 3, 2);
    F.curve(ctx, lb, 3, 13, g.X, g.Y, cB, 3, 2);
    F.curve(ctx, ls, 3, 13, g.X, g.Y, cC, 7, 200);
    ctx.restore();
    text(ctx, `the whole sample, ${sigText(C0)} M`, g.X(7.05), yS - 17, PAL.muted, { size: 17, align: 'center' });
    lab.block(g.X(7.05) - 140, yS - 30, g.X(7.05) + 140, yS - 4);
    const y = ls(p);
    line(ctx, g.X(p), g.Y(y), g.X(p), G.b, alpha(cC, 0.6), 2.5, [4, 8]);
    line(ctx, G.l, g.Y(y), g.X(p), g.Y(y), alpha(cC, 0.6), 2.5, [4, 8]);
    dot(ctx, g.X(PMIN), g.Y(ls(PMIN)), cC, false, 7);
    const pt = F.pinned(ctx, G, g.X, g.Y, p, y, cC);
    lab.place({ l: pt.x - 12, t: pt.y - 12, r: pt.x + 12, b: pt.y + 12 });
    lab.add('[Al³⁺]', g.X(6.3), g.Y(la(6.3)), 1, 0, cA, 22, 22);
    text(ctx, '[Al(OH)_{4}⁻]', g.X(3.88), g.Y(lb(3.88)) - 50, cB, { size: 20, weight: 600, align: 'center', bg: PAL.panel });
    lab.add('molar solubility', g.X(11.2), g.Y(ls(11.2)), -0.6, -0.8, cC, 22, 30);
    /* the beaker */
    ctx.save(); beakerPath(ctx); ctx.lineTo(BR, RIM); ctx.lineTo(BL, RIM); ctx.closePath(); ctx.clip(); ctx.fillStyle = alpha(PAL.muted, 0.2); ctx.fillRect(BL, LEVEL, BR - BL, BASE - LEVEL); ctx.restore();
    line(ctx, BL + 2, LEVEL, BR - 2, LEVEL, alpha(PAL.ink, 0.45), 1.5);
    const nd = Math.round(MARKS * diss / C0), ns = MARKS - nd, nA = Math.round(nd * f);
    ORDER.slice(0, nd).forEach((i, k) => ion(ctx, DOTS[i][0], DOTS[i][1], k < nA ? cA : cB));
    HEAP.slice(0, ns).forEach(([x, yy, r]) => lump(ctx, x, yy, white, r));
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; beakerPath(ctx); ctx.stroke(); ctx.restore();
    text(ctx, `${sigText(C0)} mol of Al(OH)_{3}`, (BL + BR) / 2, RIM - 60, PAL.ink, { size: 18, align: 'center' });
    text(ctx, `in 1.00 L held at pH ${p.toFixed(2)}`, (BL + BR) / 2, RIM - 34, PAL.ink, { size: 18, align: 'center' });
    const key = [];
    if (nA > 0 || f >= 0.01) key.push({ s: `Al³⁺, ${sigText(diss * f)} mol`, kind: 'dot', color: cA });
    if (nd - nA > 0 || f <= 0.99) key.push({ s: `Al(OH)_{4}⁻, ${sigText(diss * (1 - f))} mol`, kind: 'dot', color: cB });
    if (!all) key.push({ s: `solid, ${sigText(solid)} mol`, draw: (c, x, yy) => lump(c, x + 11, yy, white, 8.5) });
    F.legend(ctx, { l: BL - 30, r: BR + 30, t: BASE + 18, b: BASE + 140 }, key, { corner: 'tl', panel: false, size: 18 });
    lab.flush();
    hits = [];
    [3.5, 4, 5, 6, 6.5].forEach((q) => hits.push({ x: g.X(q), y: g.Y(la(q)), r: 14, name: '[Al³⁺] = K_sp/[OH⁻]³, a thousandth as much for each unit of pH' }));
    [3.5, 5, 7, 9, 11, 12.5].forEach((q) => hits.push({ x: g.X(q), y: g.Y(lb(q)), r: 14, name: '[Al(OH)₄⁻] = K[OH⁻], ten times as much for each unit of pH' }));
    [4, 5.5, 7, 8.5, 10, 11.5].forEach((q) => hits.push({ x: g.X(q), y: yS, r: 12, name: `${sigText(C0)} M, what the solution holds once the whole sample has dissolved` }));
    hits.push({ x: g.X(PMIN), y: g.Y(ls(PMIN)), r: 14, name: `the least soluble: ${sigText(10 ** ls(PMIN))} M at pH ${PMIN.toFixed(2)}` });
    hits.push({ x: pt.x, y: pt.y, r: 16, name: `molar solubility at pH ${p.toFixed(2)}: ${sigText(s)} M` });
    if (nd) hits.push({ x: (BL + BR) / 2, y: LEVEL + 90, r: 100, name: 'dissolved aluminum, one dot for each 5 × 10⁻⁵ mol' });
    if (ns) hits.push({ x: (BL + BR) / 2, y: BASE - 30, r: 70, name: 'solid Al(OH)₃ on the bottom, one lump for each 5 × 10⁻⁵ mol' });
    const kc = (x) => hue('concentration', x), ke = (x) => hue('equilibrium-constant', x), ohT = kc(sigTex(oh));
    ro.set(`\\kconcOH = 10^{-\\kpOH} = 10^{-(14.00 - ${kc(p.toFixed(2))})} = ${ohT}\\ \\text{M}`
      + ` \\\\ [\\text{Al}^{3+}] = \\frac{\\kKsp}{{\\kconcOH}^{3}} = \\frac{${ke('2 \\times 10^{-32}')}}{(${ohT})^{3}} = ${kc(sigTex(t1))}\\ \\text{M}`
      + ` \\\\ [\\text{Al(OH)}_{4}{}^{-}] = \\kK\\,\\kconcOH = ${ke('22')}\\,(${ohT}) = ${kc(sigTex(t2))}\\ \\text{M}`,
      'Each unit of $\\kpH$ multiplies $\\kconcOH$ by 10, which divides [Al³⁺] by 1000 and multiplies [Al(OH)₄⁻] by 10.');
  }
  still(d, draw);
})();

};
