/* Figures for section 11.3 Solubility. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['11.3'] = function (root, F) {
const { el, fmt, tex, C, PAL, alpha, ctl, cycle, register, begin, line, text, topline, axes, curve, pinned, dot, hbracket } = F;
const sim = (id, H) => F.sim(root, id, H);
function readout(host, main, small) { tex(host, main); if (small) host.appendChild(el('small', null, small)); }
const TAU = 2 * Math.PI;
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;
const SUP = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
/* a number as mantissa and power of ten, for prose (× 10⁻⁴) and for TeX */
function sci(x, sig = 3) {
  const p = Math.floor(Math.log10(Math.abs(x))), m = x / Math.pow(10, p), ms = m.toFixed(sig - 1);
  const [mm, pp] = +ms >= 10 ? [(m / 10).toFixed(sig - 1), p + 1] : [ms, p];
  return { plain: mm + ' × 10' + String(pp).split('').map((c) => SUP[c]).join(''), tex: mm + '\\times10^{' + pp + '}' };
}
/* a smooth monotone curve through tabulated points (Fritsch–Carlson), held flat past the ends */
function spline(xs, ys) {
  const n = xs.length, dx = [], s = [];
  for (let i = 0; i < n - 1; i++) { dx[i] = xs[i + 1] - xs[i]; s[i] = (ys[i + 1] - ys[i]) / dx[i]; }
  const m = [s[0]];
  for (let i = 1; i < n - 1; i++) m[i] = s[i - 1] * s[i] <= 0 ? 0 : 3 * (dx[i - 1] + dx[i]) / ((2 * dx[i] + dx[i - 1]) / s[i - 1] + (dx[i] + 2 * dx[i - 1]) / s[i]);
  m[n - 1] = s[n - 2];
  return (x) => {
    if (x <= xs[0]) return ys[0] + m[0] * (x - xs[0]);
    if (x >= xs[n - 1]) return ys[n - 1] + m[n - 1] * (x - xs[n - 1]);
    let i = 0; while (x > xs[i + 1]) i++;
    const h = dx[i], t = (x - xs[i]) / h, t2 = t * t, t3 = t2 * t;
    return (2 * t3 - 3 * t2 + 1) * ys[i] + (t3 - 2 * t2 + t) * h * m[i] + (-2 * t3 + 3 * t2) * ys[i + 1] + (t3 - t2) * h * m[i + 1];
  };
}

/* =====================================================================
   FIGURE 11.8: the solubilities of five gases against temperature, read
   off the book's graph at 101.3 kPa, beside Henry's law for the chosen
   gas: C_g = kP_g with k = C_g(T, 101.3 kPa) / 101.3 kPa. Still.
   Left axes 0 to 30 °C, 0 to 2.5 × 10⁻³ mol/L; right axes 0 to 200 kPa
   (the slider's range), 0 to 5 × 10⁻³ mol/L (methane at 0 °C and
   200 kPa is 4.7).
===================================================================== */
(function () {
  const d = sim('sim-gas-solubility', 640);
  /* 10⁻³ mol/L at 0, 10, 20 and 30 °C, from the book's curves */
  const GASES = [
    { v: 'CH4', ref: 'methane', name: 'methane', tex: '\\text{methane}', data: [2.40, 1.87, 1.45, 1.21] },
    { v: 'O2', ref: 'oxygen', name: 'oxygen', tex: '\\text{oxygen}', data: [2.12, 1.72, 1.38, 1.14] },
    { v: 'CO', ref: 'carbon-monoxide', name: 'carbon monoxide', tex: '\\text{carbon monoxide}', data: [1.55, 1.22, 0.99, 0.85] },
    { v: 'N2', ref: 'nitrogen', name: 'nitrogen', tex: '\\text{nitrogen}', data: [0.94, 0.73, 0.56, 0.48] },
    { v: 'He', ref: 'helium', name: 'helium', tex: '\\text{helium}', data: [0.42, 0.39, 0.37, 0.36] },
  ].map((g) => ({ ...g, f: spline([0, 10, 20, 30], g.data) }));
  const gas = F.select(d.controls, { label: '\\text{gas}', options: GASES.map((g) => ({ value: g.v, label: g.name })), value: 'O2', aria: 'the dissolved gas', onInput: () => {} });
  const T = ctl(d.controls, { label: '\\kT', cls: 'temperature', min: 0, max: 30, step: 0.5, value: 20, unit: '°C', dec: 1, aria: 'temperature of the water in degrees Celsius' });
  const P = ctl(d.controls, { label: '\\kPg', cls: 'pressure', min: 0, max: 200, step: 0.1, value: 20.7, unit: 'kPa', dec: 1, detents: [20.7], aria: 'partial pressure of the gas in kilopascals', specials: [{ at: 101.3, label: '1 atm' }] });
  function draw() {
    const { ctx } = begin(d.c);
    const cc = C('concentration'), cp = C('pressure'), ct = C('temperature');
    const gi = Math.max(0, GASES.findIndex((g) => g.v === gas.value)), g = GASES[gi];
    const t = T.v, p = P.v, c1 = g.f(t), k = c1 * 1e-3 / 101.3, cg = k * p;
    /* left: the book's graph */
    const bl = { l: 130, r: 620, t: 140, b: 530 };
    const A = axes(ctx, bl, [0, 30], [0, 2.5], { xl: 'Temperature (°C)', xc: ct, yl: 'C_{g} at 101.3 kPa (10⁻³ mol/L)', yc: cc, nx: 3, ny: 5, fy: (v) => fmt(v, 1) });
    GASES.forEach((q, i) => {
      const on = i === gi;
      curve(ctx, q.f, 0, 30, A.X, A.Y, on ? F.ref(q.ref) : alpha(F.ref(q.ref), 0.55), on ? 6 : 3);
    });
    line(ctx, A.X(t), bl.b, A.X(t), A.Y(c1), ct, 2, [4, 8]);
    line(ctx, bl.l, A.Y(c1), A.X(t), A.Y(c1), cc, 2, [4, 8]);
    GASES.forEach((q, i) => text(ctx, q.name, A.X(0.6), A.Y(q.f(0.6)) + 22, F.ref(q.ref), { size: 17, weight: i === gi ? 600 : 400, bg: PAL.panel }));
    dot(ctx, A.X(t), A.Y(c1), cc, true, 9);
    const lx = t > 20 ? -16 : 16;
    text(ctx, fmt(c1, 2), A.X(t) + lx, A.Y(c1) - 20, cc, { size: 17, weight: 600, align: lx < 0 ? 'right' : 'left', bg: PAL.panel });
    /* right: Henry's law for the chosen gas at T */
    const br = { l: 800, r: 1320, t: 140, b: 530 };
    const B = axes(ctx, br, [0, 200], [0, 5], { xl: 'P_{g} (kPa)', xc: cp, yl: 'C_{g} (10⁻³ mol/L)', yc: cc, nx: 4, ny: 5 });
    curve(ctx, (x) => k * 1e3 * x, 0, 200, B.X, B.Y, F.ref(g.ref), 5);
    text(ctx, g.name + ' at ' + fmt(t, 1) + ' °C', B.X(200) - 6, B.Y(k * 1e3 * 200) + 30, F.ref(g.ref), { size: 17, weight: 600, align: 'right', bg: PAL.panel });
    dot(ctx, B.X(101.3), B.Y(c1), cc, false, 8);
    text(ctx, '1 atm', B.X(101.3) + 14, B.Y(c1) + 22, PAL.muted, { size: 16 });
    line(ctx, B.X(p), br.b, B.X(p), B.Y(cg * 1e3), cp, 2, [4, 8]);
    line(ctx, br.l, B.Y(cg * 1e3), B.X(p), B.Y(cg * 1e3), cc, 2, [4, 8]);
    pinned(ctx, br, B.X, B.Y, p, cg * 1e3, cc);
    const s = sci(cg), sk = sci(k);
    text(ctx, p > 0 ? s.plain + ' mol/L' : '0 mol/L', B.X(p) + (p > 140 ? -16 : 16), B.Y(cg * 1e3) - 22, cc, { size: 17, weight: 600, align: p > 140 ? 'right' : 'left', bg: PAL.panel });
    topline(ctx, p > 0
      ? 'At ' + fmt(t, 1) + ' °C, ' + g.name + ' at ' + fmt(p, 1) + ' kPa dissolves in water to a concentration of ' + s.plain + ' mol/L.'
      : 'With no ' + g.name + ' above the water at ' + fmt(t, 1) + ' °C, none of it dissolves.');
    const cgT = p > 0 ? s.tex : '0';
    readout(d.readout, `\\kCg = \\kkH\\kPg = (${hue('equilibrium-constant', sk.tex + '\\ \\text{mol L}^{-1}\\,\\text{kPa}^{-1}')})(${hue('pressure', fmt(p, 1) + '\\ \\text{kPa}')}) = ${hue('concentration', cgT + '\\ \\text{mol L}^{-1}')}`,
      'The Henry’s law constant is the solubility at ' + fmt(t, 1) + ' °C and 101.3 kPa divided by 101.3 kPa.');
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   SIM: a parcel of saturated water rising through a crater lake. The
   pressure at depth d is 1 atm + d/10 m, the note on the bends' rule;
   k for CO₂ is 3.4 × 10⁻² M/atm, the book's value at 25 °C. The parcel
   starts saturated at its depth; as it rises it keeps no more than the
   solubility and the rest leaves as bubbles. Moving: the parcel rises
   at a constant speed over 5 s (the turnover's clock). Graph axes 0 to
   0.8 M (the saturated concentration at 200 m is 0.71 M), 0 to 200 m.
===================================================================== */
(function () {
  const d = sim('sim-nyos', 620);
  const K = 0.034, Mf = (x) => fmt(x, x < 0.1 ? 3 : 2), Pof = (dep) => 1 + dep / 10, Csat = (dep) => K * Pof(dep), RISE = 5;
  const D0 = ctl(d.controls, { label: 'd_{0}', cls: 'length', min: 20, max: 200, step: 5, value: 200, unit: 'm', dec: 0, aria: 'starting depth of the parcel in meters', onInput: () => cy.reset() });
  const cy = cycle(() => RISE, 1.5);
  const hits = []; F.hover(d.stage, () => hits);
  /* fixed places for the dissolved molecules inside the parcel, on a sunflower spiral */
  const SPOTS = Array.from({ length: 24 }, (_, i) => { const r = 30 * Math.sqrt((i + 0.5) / 24), a = i * 2.39996; return [r * Math.cos(a), r * Math.sin(a)]; });
  function co2(ctx, x, y, s = 1) {
    for (const [dx, col, r] of [[-7 * s, F.el('O'), 4.2 * s], [7 * s, F.el('O'), 4.2 * s], [0, F.el('C'), 4.6 * s]]) {
      ctx.save(); ctx.fillStyle = col; ctx.strokeStyle = alpha(PAL.ink, 0.5); ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(x + dx, y, r, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore();
    }
  }
  function draw() {
    const { ctx } = begin(d.c);
    hits.length = 0;
    const cc = C('concentration'), cl = C('length'), lake = F.ref('lake'), parcel = F.ref('parcel');
    const d0 = D0.v, tau = cy.now(), dep = d0 * (1 - tau / RISE), c0 = Csat(d0), cs = Csat(dep), held = Math.min(c0, cs), out = Math.max(0, c0 - cs);
    /* the lake in section: surface at y 150, 200 m at y 540 */
    const Ys = (m) => 150 + m * 1.95, XC = 340;
    ctx.save();
    ctx.beginPath(); ctx.moveTo(30, 110); ctx.lineTo(100, 150); ctx.lineTo(190, Ys(200)); ctx.lineTo(490, Ys(200)); ctx.lineTo(580, 150); ctx.lineTo(650, 120); ctx.lineTo(650, 600); ctx.lineTo(30, 600); ctx.closePath();
    ctx.fillStyle = alpha(PAL.ink, 0.1); ctx.fill();
    ctx.beginPath(); ctx.moveTo(100, 150); ctx.lineTo(190, Ys(200)); ctx.lineTo(490, Ys(200)); ctx.lineTo(580, 150); ctx.closePath();
    ctx.fillStyle = PAL.soft; ctx.fill();
    ctx.restore();
    line(ctx, 30, 110, 100, 150, PAL.muted, 3); line(ctx, 100, 150, 190, Ys(200), lake, 3); line(ctx, 190, Ys(200), 490, Ys(200), lake, 3); line(ctx, 490, Ys(200), 580, 150, lake, 3); line(ctx, 580, 150, 650, 120, PAL.muted, 3);
    line(ctx, 100, 150, 580, 150, alpha(PAL.ink, 0.5), 2);
    for (let m = 0; m <= 200; m += 50) { line(ctx, 60, Ys(m), 72, Ys(m), PAL.muted, 2); text(ctx, m + ' m', 50, Ys(m), PAL.muted, { size: 16, align: 'right' }); }
    /* the parcel, 40 units across, is drawn inside the water at either end of its rise */
    const Yp = (m) => Math.min(Math.max(Ys(m), Ys(0) + 42), Ys(200) - 42);
    line(ctx, XC + 60, Yp(d0), XC + 90, Yp(d0), alpha(PAL.ink, 0.4), 2, [4, 8]);
    text(ctx, 'start', XC + 96, Yp(d0) - 14, PAL.muted, { size: 16 });
    /* bubbles rising from the parcel to the surface, larger as the pressure falls */
    const yp = Yp(dep), nb = Math.round(22 * out / Csat(200));
    for (let i = 0; i < nb; i++) {
      const f = ((i / nb) * 1.7 + tau * 0.9) % 1, y = yp - 44 - f * (yp - 44 - 158);
      if (y > yp - 40 || y < 156) continue;
      const x = XC + 26 * Math.sin(i * 2.1 + f * 5), r = 5 + 7 * (1 - (y - 150) / 390);
      ctx.save(); ctx.strokeStyle = alpha(PAL.ink, 0.7); ctx.lineWidth = 2; ctx.fillStyle = PAL.panel; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore();
      hits.push({ x, y, r: r + 3, name: 'a bubble of carbon dioxide gas' });
    }
    /* the gas released at the surface, denser than air, spilling over the rim into the valley */
    if (out > 0.005) {
      const a = Math.min(1, out / 0.5), w = 60 + 200 * a;
      ctx.save(); ctx.setLineDash([8, 8]); ctx.strokeStyle = alpha(PAL.ink, 0.55); ctx.lineWidth = 2;
      ctx.beginPath(); ctx.ellipse(XC + w * 0.5, 138 - 6 * a, w * 0.7, 14 + 10 * a, -0.08, 0, TAU); ctx.stroke(); ctx.restore();
      text(ctx, 'CO_{2} gas', XC + w * 0.5, 100 - 10 * a, PAL.ink, { size: 17, align: 'center', bg: PAL.panel });
    }
    /* the parcel and its dissolved molecules */
    ctx.save(); ctx.strokeStyle = parcel; ctx.lineWidth = 2.5; ctx.setLineDash([6, 5]); ctx.beginPath(); ctx.arc(XC, yp, 40, 0, TAU); ctx.stroke(); ctx.restore();
    const nm = Math.round(SPOTS.length * held / Csat(200));
    for (let i = 0; i < nm; i++) co2(ctx, XC + SPOTS[i][0], yp + SPOTS[i][1] * 0.9, 0.8);
    hits.push({ x: XC, y: yp, r: 40, name: 'a parcel of lake water with dissolved carbon dioxide' });
    text(ctx, 'parcel of water', XC - 52, yp, parcel, { size: 17, align: 'right', bg: PAL.panel });
    /* the graph: depth down, concentration across */
    const box = { l: 800, r: 1320, t: 140, b: 530 };
    const G = axes(ctx, box, [0, 0.8], [-200, 0], { xl: 'C_{g} of CO_{2} (M)', xc: cc, nx: 4, ny: 4, fx: (v) => fmt(v, 1), fy: (v) => fmt(-v, 0) });
    text(ctx, 'depth (m)', box.l, box.b + 58, cl, { align: 'left', weight: 600, size: 20 });
    curve(ctx, (v) => v, -200, 0, (v) => G.X(Csat(-v)), G.Y, cc, 5);
    text(ctx, 'solubility, kP_{g}', G.X(Csat(40)) + 14, G.Y(-40), cc, { size: 17, weight: 600, bg: PAL.panel });
    line(ctx, G.X(c0), G.Y(-d0), G.X(c0), G.Y(-dep), alpha(PAL.ink, 0.35), 2, [4, 8]);
    if (out > 0.004) hbracket(ctx, G.X(held), G.X(c0), G.Y(-dep) - 16, PAL.ink, 'released ' + Mf(out) + ' M', { size: 17 });
    dot(ctx, G.X(c0), G.Y(-d0), cc, false, 9);
    dot(ctx, G.X(held), G.Y(-dep), cc, true, 9);
    topline(ctx, out < 0.005
      ? 'At ' + fmt(dep, 0) + ' m the water holds ' + Mf(held) + ' M of CO₂, all it can keep at ' + fmt(Pof(dep), 1) + ' atm.'
      : 'At ' + fmt(dep, 0) + ' m the water can hold ' + Mf(held) + ' M of CO₂, so ' + Mf(out) + ' M of the ' + Mf(c0) + ' M it carried has come out as gas.');
    readout(d.readout, `\\kCg = \\kkH\\kPg = (${hue('equilibrium-constant', '0.034\\ M/\\text{atm}')})(${hue('pressure', fmt(Pof(dep), 1) + '\\ \\text{atm}')}) = ${hue('concentration', Mf(held) + '\\ M')}`,
      'The parcel left ' + fmt(d0, 0) + ' m holding ' + Mf(c0) + ' M; at the surface it can keep only ' + fmt(Csat(0), 3) + ' M.');
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();

/* =====================================================================
   FIGURE 11.16: solubility curves of eight solids, g per 100 g of water,
   read off the book's graph. The point is the amount added at T: below
   the curve unsaturated, on it saturated, above it more than the
   solubility. Still. Axes 0 to 100 °C by 20, 0 to 300 g by 50 (the
   book's frame); sugar leaves the top near 65 °C and is pinned there.
===================================================================== */
(function () {
  const d = sim('sim-solid-solubility', 680);
  const TS = [0, 20, 40, 60, 80, 100];
  const SOLIDS = [
    { v: 'sugar', ref: 'sugar', lab: 'sugar (C_{12}H_{22}O_{11})', plain: 'sugar', tex: '\\text{sugar}', data: [180, 203, 238, 287, 362, 487] },
    { v: 'KNO3', ref: 'kno3', lab: 'KNO_{3}', plain: 'KNO₃', tex: '\\text{KNO}_{3}', data: [13, 32, 64, 110, 169, 245] },
    { v: 'NaNO3', ref: 'nano3', lab: 'NaNO_{3}', plain: 'NaNO₃', tex: '\\text{NaNO}_{3}', data: [73, 88, 104, 124, 148, 178] },
    { v: 'NaBr', ref: 'nabr', lab: 'NaBr', plain: 'NaBr', tex: '\\text{NaBr}', data: [112, 113, 115, 118, 120, 125] },
    { v: 'KBr', ref: 'kbr', lab: 'KBr', plain: 'KBr', tex: '\\text{KBr}', data: [55, 66, 77, 88, 97, 106] },
    { v: 'KCl', ref: 'kcl', lab: 'KCl', plain: 'KCl', tex: '\\text{KCl}', data: [28, 34, 40, 45.5, 51, 56] },
    { v: 'NaCl', ref: 'nacl', lab: 'NaCl', plain: 'NaCl', tex: '\\text{NaCl}', data: [35.7, 36, 36.6, 37.3, 38.4, 39.8] },
    { v: 'Ce2SO43', ref: 'cerium-sulfate', lab: 'Ce_{2}(SO_{4})_{3}', plain: 'Ce₂(SO₄)₃', tex: '\\text{Ce}_{2}(\\text{SO}_{4})_{3}', data: [20, 10, 4.5, 2.2, 1.5, 1.5], end: 92 },
  ].map((s) => ({ ...s, f: spline(TS, s.data), end: s.end ?? 100 }));
  const pick = F.select(d.controls, { label: '\\text{solute}', options: SOLIDS.map((s) => ({ value: s.v, label: s.plain })), value: 'KNO3', aria: 'the dissolved solid', onInput: () => {} });
  const cur = () => SOLIDS.find((s) => s.v === pick.value) || SOLIDS[1];
  const T = ctl(d.controls, { label: '\\kT', cls: 'temperature', min: 0, max: 100, step: 1, value: 40, unit: '°C', dec: 0, aria: 'temperature of the water in degrees Celsius' });
  const M = ctl(d.controls, { label: '\\text{added}', cls: 'mass', min: 0, max: 300, step: 1, value: 50, unit: 'g', dec: 0, aria: 'grams of solute added to 100 grams of water',
    specials: [{ at: () => { const s = cur(); return T.v <= s.end ? Math.round(s.f(T.v)) : null; }, label: 'saturated' }] });
  const round = (x) => (x < 10 ? fmt(x, 1) : fmt(x, 0));
  function draw() {
    const { ctx } = begin(d.c);
    const ct = C('temperature');
    const si = SOLIDS.indexOf(cur()), s = SOLIDS[si], t = T.v, m = M.v;
    const box = { l: 140, r: 1130, t: 160, b: 580 };
    const A = axes(ctx, box, [0, 100], [0, 300], { xl: 'Temperature (°C)', xc: ct, yl: 'solubility (g solute per 100 g H_{2}O)', nx: 5, ny: 6 });
    ctx.save(); ctx.beginPath(); ctx.rect(box.l, box.t, box.r - box.l, box.b - box.t); ctx.clip();
    SOLIDS.forEach((q, i) => curve(ctx, q.f, 0, q.end, A.X, A.Y, i === si ? F.ref(q.ref) : alpha(F.ref(q.ref), 0.55), i === si ? 6 : 3));
    ctx.restore();
    const inRange = t <= s.end, sol = inRange ? s.f(t) : null;
    line(ctx, A.X(t), box.b, A.X(t), A.Y(Math.min(Math.max(m, sol ?? 0), 300)), ct, 2, [4, 8]);
    SOLIDS.forEach((q, i) => {
      const on = i === si, top = q.f(q.end) > 300;
      const x = top ? A.X(65) + 12 : A.X(q.end) + 10, y = top ? box.t + 14 : A.Y(q.f(q.end)) + (q.v === 'NaCl' ? 10 : q.v === 'KCl' ? -8 : q.v === 'Ce2SO43' ? -16 : 0);
      text(ctx, q.lab, x, y, F.ref(q.ref), { size: 17, weight: on ? 600 : 400, bg: PAL.panel });
    });
    if (sol !== null && sol <= 300) dot(ctx, A.X(t), A.Y(sol), F.ref(s.ref), false, 10);
    const pt = pinned(ctx, box, A.X, A.Y, t, m, C('mass'), m + ' g');
    const state = sol === null ? 'none' : Math.abs(m - Math.round(sol)) < 0.5 ? 'saturated' : m < sol ? 'unsaturated' : 'over';
    const word = { saturated: 'saturated', unsaturated: 'unsaturated', over: 'above the solubility', none: '' }[state];
    if (!pt.out && word) text(ctx, m + ' g, ' + word, pt.x + (t > 70 ? -16 : 16), pt.y - 22, PAL.ink, { size: 17, weight: 600, align: t > 70 ? 'right' : 'left', bg: PAL.panel });
    const sr = sol === null ? '' : round(sol);
    topline(ctx, state === 'none'
      ? 'The book’s curve for ' + s.plain + ' stops at ' + s.end + ' °C.'
      : state === 'saturated'
        ? 'At ' + t + ' °C, 100 g of water dissolves about ' + sr + ' g of ' + s.plain + ', so ' + m + ' g makes a saturated solution.'
        : state === 'unsaturated'
          ? 'At ' + t + ' °C, 100 g of water dissolves about ' + sr + ' g of ' + s.plain + ', so ' + m + ' g makes an unsaturated solution.'
          : 'At ' + t + ' °C, 100 g of water dissolves only about ' + sr + ' g of ' + s.plain + ', so ' + round(m - sol) + ' g of the ' + m + ' g added either stays undissolved or remains in a supersaturated solution.');
    if (state === 'none') { readout(d.readout, `\\text{no data for }${s.tex}\\text{ above }${hue('temperature', s.end + '\\ ^\\circ\\text{C}')}`); return; }
    const rel = state === 'saturated' ? '=' : state === 'unsaturated' ? '<' : '>';
    readout(d.readout, `${hue('mass', m + '\\ \\text{g}')}\\ \\text{added} ${rel} ${sr}\\ \\text{g, the solubility of }${s.tex}\\text{ in 100 g of water at }${hue('temperature', t + '\\ ^\\circ\\text{C}')}`);
  }
  register(d.fig, { update: () => {}, draw });
})();
};
