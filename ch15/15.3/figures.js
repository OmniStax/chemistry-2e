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
   that cross at pH 5.74, where the sum is lowest, 2.4 × 10⁻⁷ M. Axes fixed:
   pH 2 to 14, the slider's 3 to 13 with a unit of headroom each side;
   concentration 10⁻¹² to 10² M, since the sum reaches 20 M at pH 3 and
   2.2 M at pH 13, so the point never leaves the box. Still: equilibrium
   at a set pH has no clock.
===================================================================== */
(function () {
  const H = 560, d = sim('sim-solubility-ph', H);
  const KSP = 2e-32, K = 22, LKSP = Math.log10(KSP), LK = Math.log10(K);
  const pH = ctl(d.controls, { label: '\\kpH', cls: 'concentration', key: 'pH', min: 3, max: 13, step: 0.01, value: 4.74, unit: '', dec: 2,
    aria: 'the pH of the buffered solution', detents: [{ v: 4.74, label: 'acetate buffer' }] });
  const ro = F.readout(d);
  let hits = [];
  F.hover(d.stage, () => hits);
  const G = { l: 210, r: 1250, t: 130, b: 450 };
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
    lab.add('[Al(OH)_{4}⁻]', g.X(4.3), g.Y(lb(4.3)), -0.25, 1, cB, 22, 22);
    lab.add('molar solubility', g.X(10.5), g.Y(ls(10.5)), -0.6, -0.8, cC, 22, 30);
    lab.flush();
    hits = [];
    [3, 4, 5, 6, 7, 8, 9, 10].forEach((q) => { if (la(q) > -12 && la(q) < 2) hits.push({ x: g.X(q), y: g.Y(la(q)), r: 14, name: '[Al³⁺], the line of the acid coupling' }); });
    [3, 5, 7, 9, 11, 13].forEach((q) => { if (lb(q) > -12 && lb(q) < 2) hits.push({ x: g.X(q), y: g.Y(lb(q)), r: 14, name: '[Al(OH)₄⁻], the line of the complex coupling' }); });
    hits.push({ x: pt.x, y: pt.y, r: 16, name: `molar solubility at pH ${p.toFixed(2)}: ${sigText(s)} M` });
    const ohT = hue('concentration', sigTex(oh));
    ro.set(`[\\text{Al}^{3+}] + [\\text{Al(OH)}_{4}{}^{-}] = \\frac{\\kKsp}{{\\kconcOH}^{3}} + \\kK\\,\\kconcOH = \\frac{${hue('equilibrium-constant', '2 \\times 10^{-32}')}}{(${ohT})^{3}} + ${hue('equilibrium-constant', '22')}\\,(${ohT}) = ${hue('concentration', sigTex(t1))} + ${hue('concentration', sigTex(t2))} = ${hue('concentration', sigTex(s))}\\ M`,
      'Each unit of $\\kpH$ multiplies $\\kconcOH$ by 10, which divides [Al³⁺] by 1000 and multiplies [Al(OH)₄⁻] by 10.');
  }
  still(d, draw);
})();

/* =====================================================================
   The complex ion Al(OH)₄⁻, the book's AlOH4_img. Flat: the book's Lewis
   structure, in ink, each oxygen with its two lone pairs. In 3D: Al–O
   1.77 Å to the corners of a tetrahedron, O–H 0.96 Å at an Al–O–H angle
   of 115°. Physical 3D (a coordination geometry): no ground, so yaw is
   free and the ion idles round; pitch held within 1.2 rad so the view
   never turns over a pole. The stage mounts on the first switch; without
   WebGL the flat drawing stays. Still: a structure has no clock.
===================================================================== */
(function () {
  const H = 420, d = sim('fig-aloh4', H);
  const VIEW = F.choice(d.controls, { label: '\\text{view}', options: [{ value: '2d', label: '2D' }, { value: '3d', label: '3D' }], value: '2d',
    aria: 'a flat drawing or a scene to turn', ms: 0, onInput: () => show() });
  F.tex(d.readout, '\\text{Al}^{3+}(aq)+4\\text{OH}^{-}(aq)\\rightleftharpoons\\text{Al(OH)}_{4}{}^{-}(aq)\\qquad\\kKfform=1.1\\times 10^{33}');
  let hits = [];
  F.hover(d.stage, () => hits);
  const NAME = { Al: 'aluminum atom', O: 'oxygen atom of a hydroxide ion', H: 'hydrogen atom of a hydroxide ion' };

  /* ---------- flat: the Lewis structure as the book draws it ---------- */
  const X0 = 700, Y0 = 200, AO = 120, OHL = 105;
  const ATOMS = [
    { s: 'Al', x: X0, y: Y0 },
    { s: 'O', x: X0 - AO, y: Y0, lp: [90, 270] }, { s: 'H', x: X0 - AO - OHL, y: Y0 },
    { s: 'O', x: X0 + AO, y: Y0, lp: [90, 270] }, { s: 'H', x: X0 + AO + OHL, y: Y0 },
    { s: 'O', x: X0, y: Y0 - AO, lp: [90, 180] }, { s: 'H', x: X0 + OHL, y: Y0 - AO },
    { s: 'O', x: X0, y: Y0 + AO, lp: [180, 270] }, { s: 'H', x: X0 + OHL, y: Y0 + AO },
  ];
  const BONDS = [[0, 1], [1, 2], [0, 3], [3, 4], [0, 5], [5, 6], [0, 7], [7, 8]];
  function draw2d() {
    const { ctx } = begin(d.c), ink = PAL.ink;
    BONDS.forEach(([i, j]) => {
      const a = ATOMS[i], b = ATOMS[j], dx = b.x - a.x, dy = b.y - a.y, L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L;
      const ga = a.s === 'Al' ? 26 : 20, gb = 20;
      line(ctx, a.x + ux * ga, a.y + uy * ga, b.x - ux * gb, b.y - uy * gb, ink, 3);
    });
    hits = [];
    ATOMS.forEach((a) => {
      text(ctx, a.s, a.x, a.y + 1, ink, { size: 28, weight: 600, align: 'center' });
      (a.lp ?? []).forEach((ang) => {
        const cx = Math.cos(ang * RAD), cy = -Math.sin(ang * RAD), r = 25;
        [-6.5, 6.5].forEach((o) => F.dot(ctx, a.x + cx * r - cy * o, a.y + cy * r + cx * o, ink, true, 3.5));
      });
      hits.push({ x: a.x, y: a.y, r: 20, name: NAME[a.s] });
    });
    const x1 = X0 - AO - OHL - 45, x2 = X0 + AO + OHL + 45, y1 = Y0 - AO - 42, y2 = Y0 + AO + 42;
    [[x1, 1], [x2, -1]].forEach(([x, s]) => {
      ctx.save(); ctx.strokeStyle = ink; ctx.lineWidth = 3; ctx.beginPath();
      ctx.moveTo(x + s * 14, y1); ctx.lineTo(x, y1); ctx.lineTo(x, y2); ctx.lineTo(x + s * 14, y2); ctx.stroke(); ctx.restore();
    });
    text(ctx, '−', x2 + 16, y1 + 8, ink, { size: 28, weight: 600 });
    text(ctx, 'Al(OH)_{4}⁻', X0, y2 + 34, F.ref('aluminate'), { size: 22, weight: 600, align: 'center' });
  }

  /* ---------- 3D: the tetrahedron ---------- */
  const norm = (v) => { const l = Math.hypot(...v); return v.map((x) => x / l); };
  const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const add = (p, q, k = 1) => p.map((x, i) => x + q[i] * k);
  const DAO = 1.77, DOH = 0.96, BEND = (180 - 115) * RAD;
  const DIRS = [[1, 1, 1], [1, -1, -1], [-1, 1, -1], [-1, -1, 1]].map(norm);
  const M = [{ el: 'Al', p: [0, 0, 0] }], STICKS = [];
  DIRS.forEach((u) => {
    const o = add([0, 0, 0], u, DAO), w = norm(cross(u, [0, 1, 0]));
    const h = add(o, add(u.map((x) => x * Math.cos(BEND)), w, Math.sin(BEND)), DOH);
    STICKS.push([[0, 0, 0], o], [o, h]);
    M.push({ el: 'O', p: o }, { el: 'H', p: h });
  });
  const R3 = { Al: 0.5, O: 0.4, H: 0.24 };
  let v = null, g = null, sig3 = '';
  function build() {
    const key = [PAL.ink, F.el('Al'), F.el('O'), F.el('H')].join('|');
    if (key === sig3) return; sig3 = key;
    v.clear();
    M.forEach((a) => v.pickable(F.mesh.sphere(g, a.p, R3[a.el], F.el(a.el)), NAME[a.el]));
    STICKS.forEach(([a, b]) => F.mesh.stick(g, a, b, 0.07, PAL.ink));
  }
  const three = () => VIEW.value === '3d' && v && v.scene;
  function show() {
    if (VIEW.value === '3d' && !v) {
      v = F.view3d(d.stage, { h: H, dist: 9, tilt: 0.3, spin: 'idle', yaw: 'free', pitch: [-1.2, 1.2],
        views: [{ label: 'front', yaw: 0, pitch: 0.3 }, { label: 'above', yaw: 0, pitch: 1.2 }] });
      g = v.scene ? v.part(0) : null;
    }
    const on = !!three();
    d.c.style.display = on ? 'none' : '';
    if (v) [v.wrap, d.stage.querySelector('.view3d-bar')].forEach((e) => { if (e) e.style.display = on ? '' : 'none'; });
    draw();
  }
  function draw() {
    if (three()) {
      build(); hits = [];
      v.invalidate();
    } else draw2d();
  }
  still(d, draw);
})();
};
