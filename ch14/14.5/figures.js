/* Figures for section 14.5 Polyprotic Acids. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['14.5'] = function (root, F) {
const { C, PAL, alpha, ctl, register, begin, line, text, topline } = F;
const sim = (id, H) => F.sim(root, id, H);

const SUP = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
const sup = (n) => String(n).split('').map((c) => SUP[c]).join('');
const pow10 = (k) => (k === 0 ? '1' : k === 1 ? '10' : '10' + sup(k));
/* x to n significant figures, its closing zeros kept (0.10, 1.0): plain from 0.001 to below 1000, otherwise m × 10ⁿ; as figure text and as TeX */
function sig(x, n = 3) {
  let e = Math.floor(Math.log10(Math.abs(x)));
  if (e >= -3 && e < 3) return { plain: e < n - 1 ? x.toPrecision(n) : String(Number(x.toPrecision(n))) };
  let m = (x / 10 ** e).toFixed(n - 1);
  if (+m >= 10) { e += 1; m = (x / 10 ** e).toFixed(n - 1); }
  return { m, e };
}
const sigText = (x, n) => { const s = sig(x, n); return s.plain ?? `${s.m} × 10${sup(s.e)}`; };
const sigTex = (x, n) => { const s = sig(x, n); return s.plain ?? `${s.m} \\times 10^{${s.e}}`; };
/* a constant always as m × 10ⁿ, as the appendix prints it */
const kTex = (x) => { const e = Math.floor(Math.log10(x) + 1e-9); return `${(x / 10 ** e).toFixed(1)} \\times 10^{${e}}`; };
const kText = (x) => { const e = Math.floor(Math.log10(x) + 1e-9); return `${(x / 10 ** e).toFixed(1)} × 10${sup(e)}`; };
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;

/* =====================================================================
   SIM: stepwise ionization of a polyprotic acid, solved as the book
   solves Example 14.19. The first step gives x = [H₃O⁺] = [HA⁻] as the
   positive root of K_a1 = x²/(c₀ − x), written 2Kc₀/(K + √(K² + 4Kc₀))
   so it keeps its digits; each later species is K_a[previous]/[H₃O⁺],
   which the first step's x outweighs. Across the top each species is
   drawn by its atoms (flat ball and stick, the element palette), one
   hydrogen fewer at every step and a dashed ring where it was. Under
   each stands its equilibrium concentration as a level on one log axis,
   fixed from 10⁻²⁰ to 10² M: the controls reach from just under 1.0 M
   (H₂A at 1.0 M) down to 1.0 × 10⁻¹⁹ M (S²⁻), and the two decades
   above 1 M leave room for the value written over the top level. Still: equilibrium
   concentrations have no clock.
===================================================================== */
(function () {
  const H = 770;
  const d = sim('sim-stepwise', H);
  /* atoms [element, x, y, r], bonds [i, j, order], hs: the hydrogens in the order they ionize */
  const ACIDS = {
    h2co3: { c0: 0.033, K: [4.3e-7, 4.7e-11], mark: 'Example 14.19',
      sp: ['H_{2}CO_{3}', 'HCO_{3}⁻', 'CO_{3}²⁻'], hover: ['H₂CO₃', 'HCO₃⁻', 'CO₃²⁻'], kind: ['molecules', 'ions', 'ions'],
      tex: ['\\text{H}_{2}\\text{CO}_{3}', '\\text{HCO}_{3}^{-}', '\\text{CO}_{3}^{2-}'],
      a: '[\\text{H}_{2}\\text{CO}_{3}]_{0}', aria: 'initial concentration of H2CO3',
      atoms: [['C', 0, 4, 17], ['O', 0, -36, 16], ['O', -34, 24, 16], ['O', 34, 24, 16], ['H', 60, 40, 10], ['H', -60, 40, 10]],
      bonds: [[0, 1, 2], [0, 2, 1], [0, 3, 1], [3, 4, 1], [2, 5, 1]], hs: [4, 5] },
    h2s: { c0: 0.1, K: [8.9e-8, 1.0e-19], mark: 'Check Your Learning',
      sp: ['H_{2}S', 'HS⁻', 'S²⁻'], hover: ['H₂S', 'HS⁻', 'S²⁻'], kind: ['molecules', 'ions', 'ions'],
      tex: ['\\text{H}_{2}\\text{S}', '\\text{HS}^{-}', '\\text{S}^{2-}'],
      a: '[\\text{H}_{2}\\text{S}]_{0}', aria: 'initial concentration of H2S',
      atoms: [['S', 0, -6, 24], ['H', 34, 20, 10], ['H', -34, 20, 10]],
      bonds: [[0, 1, 1], [0, 2, 1]], hs: [1, 2] },
    h3po4: { c0: 0.1, K: [7.5e-3, 6.2e-8, 4.2e-13], mark: null,
      sp: ['H_{3}PO_{4}', 'H_{2}PO_{4}⁻', 'HPO_{4}²⁻', 'PO_{4}³⁻'], hover: ['H₃PO₄', 'H₂PO₄⁻', 'HPO₄²⁻', 'PO₄³⁻'], kind: ['molecules', 'ions', 'ions', 'ions'],
      tex: ['\\text{H}_{3}\\text{PO}_{4}', '\\text{H}_{2}\\text{PO}_{4}^{-}', '\\text{HPO}_{4}^{2-}', '\\text{PO}_{4}^{3-}'],
      a: '[\\text{H}_{3}\\text{PO}_{4}]_{0}', aria: 'initial concentration of H3PO4',
      atoms: [['P', 0, 0, 19], ['O', 0, -38, 16], ['O', -38, 6, 16], ['O', 38, 6, 16], ['O', 0, 40, 16], ['H', 60, 26, 10], ['H', -60, 26, 10], ['H', 28, 50, 10]],
      bonds: [[0, 1, 2], [0, 2, 1], [0, 3, 1], [0, 4, 1], [3, 5, 1], [2, 6, 1], [4, 7, 1]], hs: [5, 6, 7] },
  };
  const KEYS = Object.keys(ACIDS);
  const ELNAME = { C: 'carbon', O: 'oxygen', S: 'sulfur', P: 'phosphorus' };
  const KS = ['K_{a1}', 'K_{a2}', 'K_{a3}'], KTEX = ['\\kKaone', '\\kKatwo', '\\kKathree'], NTH = ['first', 'second', 'third'];
  const marks = (a) => (a.mark ? [{ at: Math.log10(a.c0), label: a.mark }] : []);
  const pick = F.choice(d.controls, {
    label: '\\text{acid}', aria: 'the acid', value: 'h2co3',
    options: [{ value: 'h2co3', label: 'H₂CO₃' }, { value: 'h2s', label: 'H₂S' }, { value: 'h3po4', label: 'H₃PO₄' }],
    onInput: () => { const a = ACIDS[pick.value]; c0.mark(marks(a)); c0.set(Math.log10(a.c0)); c0.relabel(hue('concentration', a.a), a.aria); },
  });
  const cOf = (lg) => Number((10 ** lg).toPrecision(2));
  const c0 = ctl(d.controls, { label: hue('concentration', ACIDS.h2co3.a), cls: 'concentration', min: -3, max: 0, step: 0.01, value: Math.log10(0.033), unit: '',
    fmt: (lg) => `${sigText(cOf(lg), 2)} M`, aria: ACIDS.h2co3.aria, specials: marks(ACIDS.h2co3) });
  const ro = F.readout(d);
  let hits = [];
  F.hover(d.stage, () => hits);

  const B = { l: 170, r: 1330, t: 350, b: 730 };
  const LY = [0, 22], L0 = -20;   /* log₁₀ of the concentration less L0, so the frame has no zero line inside it */
  const MY = 186, MS = 1.25, FY = 292;   /* the molecules' row, their scale, the formulas' row */
  const lastC = { h2co3: 0.033, h2s: 0.1, h3po4: 0.1 };
  function solve(a, c) {
    const k = a.K[0], x = (2 * k * c) / (k + Math.sqrt(k * k + 4 * k * c));
    const v = [c - x, x];
    for (let i = 1; i < a.K.length; i++) v.push((a.K[i] * v[i]) / x);
    return { x, v };
  }
  /* species i of acid a: i hydrogens gone, each a dashed ring where it was */
  function molecule(ctx, a, i, cx, cy, name) {
    const gone = a.hs.slice(0, i), at = (j) => [cx + a.atoms[j][1] * MS, cy + a.atoms[j][2] * MS];
    a.bonds.forEach(([p, q, order]) => {
      if (gone.includes(p) || gone.includes(q)) return;
      const [x1, y1] = at(p), [x2, y2] = at(q), L = Math.hypot(x2 - x1, y2 - y1), nx = -(y2 - y1) / L, ny = (x2 - x1) / L;
      (order === 2 ? [-4, 4] : [0]).forEach((o) => line(ctx, x1 + nx * o, y1 + ny * o, x2 + nx * o, y2 + ny * o, PAL.ink, 3.5));
    });
    a.atoms.forEach(([e, , , r], j) => {
      const [x, y] = at(j), R = r * MS;
      ctx.save(); ctx.beginPath(); ctx.arc(x, y, R, 0, 2 * Math.PI);
      if (gone.includes(j)) { ctx.setLineDash([5, 5]); ctx.lineWidth = 2; ctx.strokeStyle = alpha(PAL.ink, 0.55); ctx.stroke(); }
      else { ctx.fillStyle = F.el(e); ctx.fill(); ctx.lineWidth = 2; ctx.strokeStyle = alpha(PAL.ink, 0.7); ctx.stroke(); }
      ctx.restore();
      if (name) hits.push({ x, y, r: R, name: gone.includes(j) ? 'this proton went to a water molecule' : e === 'H' ? 'hydrogen that can ionize' : ELNAME[e] });
    });
  }
  /* a step that stops at equilibrium: a pair of half arrows */
  function steps(ctx, x, y, a) {
    ctx.save(); ctx.globalAlpha *= a;
    F.arrow(ctx, x - 30, y - 6, x + 30, y - 6, PAL.ink, 3); F.arrow(ctx, x + 30, y + 6, x - 30, y + 6, PAL.ink, 3);
    ctx.restore();
  }
  function draw() {
    const { ctx } = begin(d.c);
    const key = pick.value, a = ACIDS[key], n = a.sp.length;
    const c = cOf(c0.v), { x, v } = solve(a, c);
    lastC[key] = c;
    const cC = C('concentration'), cK = C('equilibrium-constant');
    hits = [];

    /* the share that gives up each proton: x of c₀ at the first step, then each anion against the one before it */
    const f = a.K.map((_, i) => (i ? v[i + 1] / v[i] : x / c));
    const share = (q, i) => {
      const many = q >= 0.01, who = `${a.sp[i]} ${a.kind[i]}`;
      const amt = many ? `${Number((100 * q).toPrecision(2))}% of ${who}` : `1 in ${sigText(1 / q, 2)} ${who}`;
      return i ? `${amt} the ${NTH[i]}` : `${amt} ${many ? 'give up their' : 'gives up its'} first proton`;
    };
    topline(ctx, n === 3 ? `${share(f[0], 0)}, and ${share(f[1], 1)}.` : `${share(f[0], 0)}, ${share(f[1], 1)} and ${share(f[2], 2)}.`);

    const ax = F.axes(ctx, B, [0, 1], LY, { nx: 0, ny: 11, fy: (s) => pow10(Math.round(s) + L0), yl: 'concentration at equilibrium (M)', yc: cC });
    const Y = (lg) => ax.Y(lg - L0);
    /* columns: three or four, eased from one count to the other with the levels when the acid changes */
    const W = pick.mix((k) => (B.r - B.l) / ACIDS[k].sp.length), mid = (i) => B.l + W * (i + 0.5), edge = (i) => B.l + W * i;
    const lev = pick.mix((k) => { const s = solve(ACIDS[k], lastC[k]).v.map((cv) => Math.log10(cv)); return [s[0], s[1], s[2], s[3] ?? s[2] - 4, Math.log10(solve(ACIDS[k], lastC[k]).x)]; });
    const rest = pick.k >= 1, arr = F.arrival(d);

    KEYS.forEach((k) => {
      const A = ACIDS[k], al = pick.a(k);
      if (!(al > 0)) return;
      ctx.save(); ctx.globalAlpha *= al;
      A.sp.forEach((s, i) => {
        molecule(ctx, A, i, mid(i), MY, k === key && rest);
        text(ctx, s, mid(i), FY, F.cat(i), { size: 26, weight: 600, align: 'center' });
        if (i) {
          steps(ctx, edge(i), MY, 1);
          text(ctx, `${KS[i - 1]} = ${kText(A.K[i - 1])}`, edge(i), MY - 32, cK, { size: 21, weight: 600, align: 'center' });
          text(ctx, '− H⁺', edge(i), MY + 34, PAL.muted, { size: 19, align: 'center' });
        }
      });
      ctx.restore();
    });

    for (let i = 1; i < 4; i++) { const al = i < 3 ? 1 : pick.a('h3po4'); if (al > 0) line(ctx, edge(i), B.t, edge(i), B.b, alpha(PAL.ink, 0.14 * al), 2); }
    const yH = Y(lev[4]);
    line(ctx, B.l, yH, B.r, yH, cC, 3, [10, 10]);
    for (let i = 0; i < 4; i++) {
      const al = i < 3 ? 1 : pick.a('h3po4'); if (!(al > 0)) continue;
      const y = Y(lev[i]), w = (W / 2 - 16) * F.ease.smooth(F.stagger(arr, i, 4)), col = F.cat(i);
      if (!(w > 0)) continue;
      ctx.save(); ctx.globalAlpha *= al;
      ctx.fillStyle = alpha(col, 0.12); ctx.fillRect(mid(i) - w, y, 2 * w, B.b - y);
      line(ctx, mid(i) - w, y, mid(i) + w, y, col, 7);
      ctx.restore();
    }
    if (rest && arr >= 1) {
      v.forEach((cv, i) => {
        const y = Y(Math.log10(cv)), val = `${sigText(cv, 2)} M`;
        /* above its level; below where the dashed line is in the way */
        const below = i !== 1 && y > yH && y - yH < 46;
        const ty = below ? y + 24 : y - 22;
        if (i === 2) F.rich(ctx, [[val, cC], ' = ', [KS[1], cK]], mid(i), ty, { size: 22, align: 'center' });
        else text(ctx, val, mid(i), ty, cC, { size: 22, weight: 600, align: 'center' });
        hits.push({ x: mid(i), y, r: 40, name: `[${a.hover[i]}] = ${val}` });
      });
      text(ctx, `[H_{3}O⁺] = ${sigText(x, 2)} M`, B.r - 14, yH - 22, cC, { size: 22, weight: 600, align: 'right' });
      hits.push({ x: B.r - 150, y: yH, r: 26, name: `[H₃O⁺] = ${sigText(x, 2)} M, nearly all of it from the first step` });
    }

    const T = a.tex, conc = (s) => hue('concentration', s), kc = (s) => hue('equilibrium-constant', s), M = '\\,\\text{M}';
    const xt = sigTex(x, 4), ct = sigTex(c, 2);   /* x to four figures, so the numbers written give the K written at every setting */
    const rows = [`\\kKaone = \\frac{\\kconcHyd${conc(`[${T[1]}]`)}}{${conc(`[${T[0]}]`)}} = \\frac{(${conc(xt)})(${conc(xt)})}{${conc(ct)} - ${conc(xt)}} = ${kc(kTex(a.K[0]))}`];
    for (let i = 2; i < n; i++) {
      const top = i === 2 ? xt : sigTex(v[i - 1], 2);
      rows.push(`${conc(`[${T[i]}]`)} = \\frac{${KTEX[i - 1]}${conc(`[${T[i - 1]}]`)}}{\\kconcHyd} = \\frac{(${kc(kTex(a.K[i - 1]))})(${conc(top + M)})}{${conc(xt + M)}} = ${conc(sigTex(v[i], 2) + M)}`);
    }
    ro.set(rows.join(' \\\\ '), undefined, { form: key });
  }
  register(d.fig, { update: () => {}, draw });
})();
};
