/* Figures for section 11.3 Solubility. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['11.3'] = function (root, F) {
const { el, fmt, tex, C, PAL, alpha, ctl, cycle, register, begin, line, text, topline, axes, curve, pinned, dot, hbracket, vbracket } = F;
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
   FIGURE 11.8: the book's five curves at 101.3 kPa, and beside them
   Henry's law for the chosen gas at the chosen temperature, on the same
   concentration scale, so a level line joins the two readings. Still.
   The curves are read off the book's image every 5 °C; each starts
   where the book's does (3.3 to 4.4 °C). Oxygen at 20 °C is the 1.38
   of Example 11.1 (the image reads 1.37, inside its line width).
   Axes: 0 to 30 °C, 0 to 125 kPa, 0 to 3 × 10⁻³ mol/L on both (methane
   at 5 °C and 125 kPa is 2.6).
===================================================================== */
(function () {
  const d = sim('sim-gas-solubility', 640);
  const TS = [5, 10, 15, 20, 25, 30];
  /* 10⁻³ mol/L at 5 to 30 °C; from: where the book's curve starts; at: where its name stands, as the book places it */
  const GASES = [
    { v: 'CH4', ref: 'methane', name: 'methane', from: 3.3, at: [3.3, 2.46], data: [2.13, 1.86, 1.64, 1.46, 1.31, 1.19] },
    { v: 'O2', ref: 'oxygen', name: 'oxygen', from: 4.4, at: [4.4, 1.62], data: [1.91, 1.71, 1.52, 1.38, 1.23, 1.13] },
    { v: 'CO', ref: 'carbon-monoxide', name: 'carbon monoxide', from: 4.4, at: [4.4, 1.04], data: [1.39, 1.23, 1.10, 0.99, 0.91, 0.84] },
    { v: 'N2', ref: 'nitrogen', name: 'nitrogen', from: 4.4, at: [4.4, 0.62], data: [0.84, 0.72, 0.63, 0.56, 0.50, 0.47] },
    { v: 'He', ref: 'helium', name: 'helium', from: 3.5, at: [3.5, 0.24], data: [0.41, 0.39, 0.38, 0.365, 0.355, 0.35] },
  ].map((g) => ({ ...g, f: spline(TS, g.data) }));
  const ATM = 101.3;
  const gas = F.select(d.controls, { label: '\\text{gas}', options: GASES.map((g) => ({ value: g.v, label: g.name })), value: 'O2', aria: 'the dissolved gas', onInput: () => {} });
  const T = ctl(d.controls, { label: '\\kT', cls: 'temperature', min: 5, max: 30, step: 0.5, value: 20, unit: '°C', dec: 1, aria: 'temperature of the water in degrees Celsius' });
  const P = ctl(d.controls, { label: '\\kPg', cls: 'pressure', min: 0, max: 125, step: 0.1, value: 20.7, unit: 'kPa', dec: 1, detents: [20.7], aria: 'partial pressure of the gas in kilopascals', specials: [{ at: ATM, label: '1 atm' }] });
  const hits = []; F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c);
    hits.length = 0;
    const cc = C('concentration'), cp = C('pressure'), ct = C('temperature');
    const gi = Math.max(0, GASES.findIndex((g) => g.v === gas.value)), g = GASES[gi], col = F.ref(g.ref);
    /* k to the three figures the readout shows, so every number drawn follows from the ones written */
    const t = T.v, p = P.v, c1 = +g.f(t).toFixed(2), k = +(c1 * 1e-3 / ATM).toPrecision(3), cg = k * p, y1 = c1, yg = cg * 1e3, frac = p / ATM;
    const bl = { l: 110, r: 640, t: 150, b: 540 }, br = { l: 780, r: 1280, t: 150, b: 540 };
    const A = axes(ctx, bl, [0, 30], [0, 3], { xl: 'Temperature (°C)', xc: ct, yl: 'C_{g} (10⁻³ mol/L)', yc: cc, nx: 3, ny: 3, fy: (v) => fmt(v, 1) });
    const B = axes(ctx, br, [0, 125], [0, 3], { xl: 'P_{g} (kPa)', xc: cp, yl: 'C_{g} (10⁻³ mol/L)', yc: cc, nx: 5, ny: 3, fy: (v) => fmt(v, 1) });
    /* the two readings carried across on one level: at 101.3 kPa, and at the pressure set */
    line(ctx, A.X(t), A.Y(y1), B.X(ATM), B.Y(y1), alpha(cc, 0.55), 2, [4, 8]);
    if (Math.abs(p - ATM) > 0.5) line(ctx, A.X(t), A.Y(yg), B.X(p), B.Y(yg), alpha(cc, 0.55), 2, [4, 8]);
    /* left: the book's graph, all at 101.3 kPa */
    GASES.forEach((q, i) => { if (i !== gi) F.plot(ctx, A, q.f, F.ref(q.ref), { w: 3, x: [q.from, 30] }); });
    F.plot(ctx, A, g.f, col, { w: 6, x: [g.from, 30] });
    if (Math.abs(p - ATM) > 0.5 && p > 0) F.plot(ctx, A, (x) => g.f(x) * frac, col, { w: 3.5, x: [g.from, 30], dash: [10, 8] });
    line(ctx, A.X(t), bl.b, A.X(t), A.Y(Math.max(y1, yg)), ct, 2, [4, 8]);
    GASES.forEach((q, i) => text(ctx, q.name, A.X(q.at[0]) + 2, A.Y(q.at[1]), F.ref(q.ref), { size: 20, weight: i === gi ? 600 : 400, bg: PAL.panel }));
    text(ctx, 'all at 101.3 kPa', bl.r - 8, bl.t + 18, PAL.muted, { size: 17, align: 'right', bg: PAL.panel });
    if (Math.abs(p - ATM) > 6 && p > 0) {
      const up = frac > 1, ly = A.Y(g.f(29.6) * frac) + (up ? -22 : 22);
      text(ctx, g.name + ' at ' + fmt(p, 1) + ' kPa', bl.r - 8, Math.min(ly, bl.b - 14), col, { size: 17, weight: 600, align: 'right', bg: PAL.panel });
    }
    dot(ctx, A.X(t), A.Y(y1), cc, false, 9);
    if (Math.abs(p - ATM) > 0.5) dot(ctx, A.X(t), A.Y(yg), cc, true, 9);
    else dot(ctx, A.X(t), A.Y(y1), cc, true, 9);
    hits.push({ x: A.X(t), y: A.Y(y1), r: 14, name: g.name + ' at 101.3 kPa, ' + fmt(c1, 2) + ' × 10⁻³ mol/L' });
    hits.push({ x: A.X(t), y: A.Y(yg), r: 14, name: g.name + ' at ' + fmt(p, 1) + ' kPa' });
    text(ctx, fmt(c1, 2), A.X(t) + (t > 24 ? -14 : 14), A.Y(y1) - 22, cc, { size: 19, weight: 600, align: t > 24 ? 'right' : 'left', bg: PAL.panel });
    /* right: Henry's law for the chosen gas, the lines at the coldest and warmest water faint beside it */
    const lineAt = (tt) => (x) => (g.f(tt) / ATM) * x;
    [[5, '5 °C'], [30, '30 °C']].forEach(([tt, s]) => {
      F.plot(ctx, B, lineAt(tt), alpha(col, 0.4), { w: 2.5 });
      if (Math.abs(B.Y(lineAt(tt)(125)) - B.Y(k * 1e3 * 125)) > 24) text(ctx, s, br.r + 12, B.Y(lineAt(tt)(125)), alpha(col, 0.75), { size: 17 });
    });
    line(ctx, B.X(ATM), br.b, B.X(ATM), br.t, PAL.muted, 2, [10, 10]);
    text(ctx, '101.3 kPa', B.X(ATM) - 8, br.b - 18, PAL.muted, { size: 17, align: 'right', bg: PAL.panel });
    F.plot(ctx, B, (x) => k * 1e3 * x, col, { w: 6 });
    text(ctx, fmt(t, 1) + ' °C', br.r + 12, B.Y(k * 1e3 * 125), col, { size: 19, weight: 600 });
    text(ctx, g.name + ', C_{g} = kP_{g}', br.l + 16, br.t + 18, col, { size: 19, weight: 600, bg: PAL.panel });
    line(ctx, B.X(p), br.b, B.X(p), B.Y(yg), cp, 2, [4, 8]);
    dot(ctx, B.X(ATM), B.Y(y1), cc, false, 9);
    dot(ctx, B.X(p), B.Y(yg), cc, true, 9);
    hits.push({ x: B.X(ATM), y: B.Y(y1), r: 14, name: g.name + ' at 101.3 kPa, the value on its curve' });
    const s = sci(cg), sk = sci(k), right = p < 62;
    text(ctx, p > 0 ? s.plain + ' mol/L' : '0 mol/L', B.X(p) + (right ? 18 : -16), right ? Math.min(B.Y(yg) + 24, br.b - 18) : B.Y(yg) - 24, cc, { size: 19, weight: 600, align: right ? 'left' : 'right', bg: PAL.panel });
    const cap = g.name[0].toUpperCase() + g.name.slice(1);
    topline(ctx, Math.abs(p - ATM) < 0.05
      ? cap + ' at ' + fmt(t, 1) + ' °C and 101.3 kPa, the pressure the curves were measured at: ' + s.plain + ' mol/L dissolves.'
      : p > 0
      ? cap + ' at ' + fmt(t, 1) + ' °C: ' + fmt(p, 1) + ' kPa is ' + fmt(frac, 3) + ' of 101.3 kPa, so ' + fmt(frac, 3) + ' times as much dissolves, ' + s.plain + ' mol/L.'
      : 'With no ' + g.name + ' above the water, none of it stays dissolved.');
    const cgT = p > 0 ? s.tex : '0';
    const s1 = sci(c1 * 1e-3), kk = hue('equilibrium-constant', sk.tex + '\\ \\text{mol L}^{-1}\\,\\text{kPa}^{-1}');
    tex(d.readout, `\\kkH = \\frac{\\kCg}{\\kPg} = \\frac{${hue('concentration', s1.tex + '\\ \\text{mol L}^{-1}')}}{${hue('pressure', '101.3\\ \\text{kPa}')}} = ${kk} \\\\ \\kCg = \\kkH\\kPg = (${kk})(${hue('pressure', fmt(p, 1) + '\\ \\text{kPa}')}) = ${hue('concentration', cgT + '\\ \\text{mol L}^{-1}')}`);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   SIM: a parcel of saturated water rising through a crater lake. The
   pressure at depth is 1 atm + depth/10 m, the rule of the note on the
   bends; k for CO₂ is 3.4 × 10⁻² M/atm, the book's value at 25 °C. The
   parcel starts saturated; as it rises it keeps no more than the
   solubility at its depth and the rest leaves as bubbles. The gas a
   liter has let go of is given as a volume at 1 atm and 25 °C
   (24.5 L/mol, the ideal gas of Chapter 9). Moving: the parcel rises at
   a constant speed over 5 s. The scene and the graph share one depth
   scale, 1.9 units to the meter, so the parcel and its point stand on
   one level. Graph: 0 to 0.8 M (0.71 M at 200 m), 0 to 200 m.
===================================================================== */
(function () {
  const d = sim('sim-nyos', 640);
  const K = 0.034, Mf = (x) => fmt(x, x < 0.1 ? 3 : 2), Pof = (dep) => 1 + dep / 10, Csat = (dep) => K * Pof(dep), RISE = 5, VM = 24.5;
  const D0 = ctl(d.controls, { label: '\\text{starting depth}', cls: 'length', min: 20, max: 200, step: 5, value: 200, unit: 'm', dec: 0, aria: 'depth the parcel starts from, in meters', onInput: () => cy.reset() });
  const cy = cycle(() => RISE, 1.5);
  const hits = []; F.hover(d.stage, () => hits);
  const Ys = (m) => 170 + m * 1.9, SURF = Ys(0), FLOOR = Ys(232), XC = 380, R = 58, UNIT = 0.06;
  /* twelve places inside the parcel: one molecule drawn for each 0.06 mol/L */
  const SPOTS = [[-20, -22], [6, -27], [26, -10], [-30, -2], [-6, -8], [14, 6], [-18, 14], [28, 16], [2, 22], [-26, 28], [16, 31], [-4, 36]].map(([x, y], i) => [x * 1.32, (y - 4) * 1.32, (i * 2.3) % Math.PI]);
  function co2(ctx, x, y, a, s = 1) {
    const ux = Math.cos(a), uy = Math.sin(a);
    for (const [k, colr, r] of [[-7.4 * s, F.el('O'), 4.4 * s], [7.4 * s, F.el('O'), 4.4 * s], [0, F.el('C'), 4.8 * s]]) {
      ctx.save(); ctx.fillStyle = colr; ctx.strokeStyle = alpha(PAL.ink, 0.6); ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(x + k * ux, y + k * uy, r, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore();
    }
  }
  /* the ground along the top of the scene: the lake's surface, the low rim on the right and the valley beyond it */
  const ground = (x) => (x <= 640 ? SURF : x <= 668 ? SURF - ((x - 640) / 28) * 14 : SURF - 14 + ((x - 668) / 72) * 70);
  function draw() {
    const { ctx } = begin(d.c);
    hits.length = 0;
    const cc = C('concentration'), cl = C('length'), cp = C('pressure'), lake = F.ref('lake'), parcel = F.ref('parcel');
    const d0 = D0.v, tau = cy.now(), dep = d0 * (1 - tau / RISE), c0 = Csat(d0), cs = Csat(dep), held = Math.min(c0, cs);
    /* the gas released is the difference of the two rounded concentrations shown, so the numbers add up */
    const out = Math.max(0, +Mf(c0) - +Mf(held)), vol = out * VM, volS = fmt(vol, vol < 10 ? 1 : 0);
    /* rock, then water */
    ctx.save();
    ctx.beginPath(); ctx.moveTo(24, 132); ctx.lineTo(120, SURF); ctx.lineTo(214, FLOOR); ctx.lineTo(546, FLOOR); ctx.lineTo(640, SURF); ctx.lineTo(668, SURF - 14); ctx.lineTo(740, SURF + 56); ctx.lineTo(740, 624); ctx.lineTo(24, 624); ctx.closePath();
    ctx.fillStyle = alpha(PAL.ink, 0.13); ctx.fill();
    ctx.beginPath(); ctx.moveTo(120, SURF); ctx.lineTo(214, FLOOR); ctx.lineTo(546, FLOOR); ctx.lineTo(640, SURF); ctx.closePath();
    ctx.fillStyle = PAL.panel; ctx.fill(); ctx.fillStyle = alpha(cl, 0.1); ctx.fill();
    ctx.restore();
    line(ctx, 24, 132, 120, SURF, PAL.muted, 3); line(ctx, 640, SURF, 668, SURF - 14, PAL.muted, 3); line(ctx, 668, SURF - 14, 740, SURF + 56, PAL.muted, 3);
    ctx.save(); ctx.strokeStyle = lake; ctx.lineWidth = 3; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(120, SURF); ctx.lineTo(214, FLOOR); ctx.lineTo(546, FLOOR); ctx.lineTo(640, SURF); ctx.stroke(); ctx.restore();
    line(ctx, 120, SURF, 640, SURF, alpha(PAL.ink, 0.55), 2);
    text(ctx, 'crater lake', 232, FLOOR - 22, lake, { size: 18, weight: 600 });
    text(ctx, 'valley', 736, SURF + 96, PAL.muted, { size: 17, align: 'right' });
    /* the graph, on the scene's depth scale */
    const box = { l: 900, r: 1340, t: Ys(0), b: Ys(200) };
    const G = axes(ctx, box, [0, 0.8], [-200, 0], { xl: 'C_{g} of CO_{2} (M)', xc: cc, nx: 4, ny: 4, fx: (v) => fmt(v, 1), fy: () => '' });
    for (let m = 0; m <= 200; m += 50) F.rich(ctx, [[m + ' m', cl, 400], ', ', [Pof(m) + ' atm', cp, 400]], box.l - 14, Ys(m), { size: 17, align: 'right' });
    F.rich(ctx, [['depth', cl], ' and the ', ['pressure', cp], ' there'], box.l - 14, box.t - 34, { size: 18, align: 'right' });
    /* where the parcel is drawn: at its depth, held inside the water for the last few meters */
    const yTrue = Ys(dep), yp = Math.max(yTrue, SURF + R + 4), y0 = Ys(d0);
    line(ctx, XC + R + 6, yTrue, G.X(held), yTrue, alpha(PAL.ink, 0.4), 2, [4, 8]);
    /* the start, left behind as a ring */
    if (y0 - yp > 12) {
      ctx.save(); ctx.strokeStyle = alpha(parcel, 0.45); ctx.lineWidth = 2; ctx.setLineDash([4, 7]); ctx.beginPath(); ctx.arc(XC, y0, R, 0, TAU); ctx.stroke(); ctx.restore();
      if (y0 - yp > 2 * R + 10) text(ctx, 'start, ' + d0 + ' m', XC + R + 12, y0, PAL.muted, { size: 17 });
    }
    /* bubbles from the parcel to the surface, larger as the pressure on them falls */
    const top = yp - R - 4, span = top - SURF - 8, nb = out > 0.004 && span > 6 ? Math.max(3, Math.round(3 + 11 * out / 0.68)) : 0;
    for (let i = 0; i < nb; i++) {
      const f = ((i / nb) + tau * 0.55) % 1, y = top - f * span, depB = (y - SURF) / 1.9;
      const x = XC + 20 * Math.sin(i * 2.4 + f * 6), r = 11 / Math.cbrt(Pof(depB)) + 2.5;
      ctx.save(); ctx.strokeStyle = alpha(PAL.ink, 0.75); ctx.lineWidth = 1.8; ctx.fillStyle = PAL.panel; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore();
      hits.push({ x, y, r: r + 4, name: 'a bubble of carbon dioxide gas' });
    }
    /* the gas let go, heavier than air: it lies on the lake and runs over the low rim into the valley */
    if (out > 0.004) {
      const a = Math.min(1, out / 0.68), x1 = XC - 70 - 150 * a, x2 = Math.min(736, XC + 90 + 300 * a), th = 12 + 22 * a, n = 40;
      ctx.save(); ctx.beginPath();
      for (let i = 0; i <= n; i++) { const x = x1 + ((x2 - x1) * i) / n; if (i) ctx.lineTo(x, ground(x) - 3); else ctx.moveTo(x, ground(x) - 3); }
      for (let i = n; i >= 0; i--) { const x = x1 + ((x2 - x1) * i) / n, u = i / n, taper = Math.min(1, u / 0.12, x2 >= 736 ? 1 : (1 - u) / 0.12); ctx.lineTo(x, ground(x) - 3 - th * Math.sqrt(Math.max(taper, 0)) * (x > 668 ? 0.8 : 1)); }
      ctx.closePath(); ctx.fillStyle = alpha(PAL.ink, 0.1); ctx.fill(); ctx.setLineDash([7, 6]); ctx.strokeStyle = alpha(PAL.ink, 0.6); ctx.lineWidth = 2; ctx.stroke(); ctx.restore();
      F.rich(ctx, ['CO_{2} gas, ', [volS + ' L', C('volume')], ' from each liter of water'], XC, SURF - th - 26, { size: 18, align: 'center', bg: PAL.panel });
      hits.push({ x: XC, y: SURF - th / 2, r: 60, name: 'carbon dioxide gas, denser than air' });
    }
    /* the parcel and the carbon dioxide still dissolved in it */
    ctx.save(); ctx.fillStyle = PAL.panel; ctx.beginPath(); ctx.arc(XC, yp, R, 0, TAU); ctx.fill(); ctx.fillStyle = alpha(cl, 0.1); ctx.fill(); ctx.strokeStyle = parcel; ctx.lineWidth = 3; ctx.setLineDash([7, 5]); ctx.stroke(); ctx.restore();
    const nm = Math.max(1, Math.round(held / UNIT));
    for (let i = 0; i < Math.min(nm, SPOTS.length); i++) co2(ctx, XC + SPOTS[i][0], yp + SPOTS[i][1], SPOTS[i][2], 1.25);
    hits.push({ x: XC, y: yp, r: R, name: 'a liter of lake water; each CO₂ drawn is 0.06 mol dissolved in it' });
    F.rich(ctx, [['a liter of water', parcel], ', ', [Mf(held) + ' M', cc]], XC - R - 12, yp, { size: 18, align: 'right', bg: PAL.panel });
    /* the graph's curve and points */
    F.plot(ctx, G, (c) => -(c / K - 1) * 10, cc, { w: 5, x: [Csat(0), Csat(200)] });
    text(ctx, 'solubility, kP_{g}', G.X(Csat(62)) - 16, Ys(62) + 4, cc, { size: 19, weight: 600, align: 'right', bg: PAL.panel });
    if (out > 0.004) {
      line(ctx, G.X(c0), y0, G.X(c0), yTrue, alpha(PAL.ink, 0.45), 2, [4, 8]);
      hbracket(ctx, G.X(held), G.X(c0), yTrue, PAL.ink, 'released ' + Mf(out) + ' M', { size: 18, side: yTrue < SURF + 60 ? 'below' : 'above' });
    }
    dot(ctx, G.X(c0), y0, cc, false, 9);
    dot(ctx, G.X(held), yTrue, cc, true, 9);
    hits.push({ x: G.X(c0), y: y0, r: 14, name: 'the water at the start, saturated at ' + Mf(c0) + ' M' });
    hits.push({ x: G.X(held), y: yTrue, r: 14, name: 'the water now, ' + Mf(held) + ' M' });
    topline(ctx, out < 0.005
      ? 'At ' + fmt(dep, 0) + ' m, under ' + fmt(Pof(dep), 1) + ' atm, the water holds ' + Mf(held) + ' M of CO₂, all it can keep there.'
      : 'At ' + fmt(dep, 0) + ' m the water can hold ' + Mf(held) + ' M of CO₂, so each liter has let go of ' + Mf(out) + ' mol, ' + volS + ' L of gas at 1 atm.');
    const hc = (x) => hue('concentration', Mf(x) + '\\ M');
    tex(d.readout, `\\kCg = \\kkH\\kPg = (${hue('equilibrium-constant', '0.034\\ M/\\text{atm}')})(${hue('pressure', fmt(Pof(dep), 1) + '\\ \\text{atm}')}) = ${hc(held)} \\\\ \\text{released} = ${hc(c0)} - ${hc(held)} = ${hc(out)}`);
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();

/* =====================================================================
   FIGURE 11.16: solubility curves of eight solids, g per 100 g of water,
   read off the book's image every 10 °C, and beside the graph a beaker
   of 100 g of water holding the mass added: what dissolves and what
   stays solid at the bottom. Still. Axes 0 to 100 °C by 20, 0 to 300 g
   by 50 (the book's frame); sugar's curve leaves the top at 65.7 °C and
   cerium sulfate's stops at 92 °C, as the book draws them.
===================================================================== */
(function () {
  const d = sim('sim-solid-solubility', 680);
  const T10 = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  const SOLIDS = [
    { v: 'sugar', ref: 'sugar', lab: 'sugar (C_{12}H_{22}O_{11})', plain: 'sugar', tex: '\\text{sugar}', ts: [0, 10, 20, 30, 40, 50, 60, 65.7], data: [180, 189.5, 202.5, 218.5, 237.5, 259.5, 285.5, 300], end: 65.7, off: true },
    { v: 'KNO3', ref: 'kno3', lab: 'KNO_{3}', plain: 'KNO₃', tex: '\\text{KNO}_{3}', data: [13, 21.5, 33, 49, 67, 88, 112, 140.5, 171, 205, 242.5] },
    { v: 'NaNO3', ref: 'nano3', lab: 'NaNO_{3}', plain: 'NaNO₃', tex: '\\text{NaNO}_{3}', data: [73, 80, 88, 96.5, 105, 114.6, 125, 136.5, 149, 163, 177.5] },
    { v: 'NaBr', ref: 'nabr', lab: 'NaBr', plain: 'NaBr', tex: '\\text{NaBr}', data: [112.3, 112.4, 112.8, 113.4, 114.3, 115.3, 116.6, 118.2, 120.1, 122.3, 124.9] },
    { v: 'KBr', ref: 'kbr', lab: 'KBr', plain: 'KBr', tex: '\\text{KBr}', data: [55, 60.6, 66.7, 72.3, 77.7, 83.1, 88.1, 93.1, 97.6, 101.7, 105.6] },
    { v: 'KCl', ref: 'kcl', lab: 'KCl', plain: 'KCl', tex: '\\text{KCl}', data: [31.5, 32.8, 34.5, 36.5, 38.5, 40.5, 42.9, 45.7, 48.8, 52.2, 55.7] },
    { v: 'NaCl', ref: 'nacl', lab: 'NaCl', plain: 'NaCl', tex: '\\text{NaCl}', data: [36, 36, 36.1, 36.4, 36.7, 36.9, 37.1, 37.5, 38.2, 38.8, 39.9] },
    { v: 'Ce2SO43', ref: 'cerium-sulfate', lab: 'Ce_{2}(SO_{4})_{3}', plain: 'Ce₂(SO₄)₃', tex: '\\text{Ce}_{2}(\\text{SO}_{4})_{3}', ts: [0, 10, 20, 30, 40, 50, 60, 70, 80, 92], data: [19.8, 14.4, 10.3, 7.2, 5.1, 3.8, 2.9, 2.5, 2.5, 2.8], end: 92 },
  ].map((s) => ({ ...s, f: spline(s.ts ?? T10, s.data), end: s.end ?? 100 }));
  const pick = F.select(d.controls, { label: '\\text{solute}', options: SOLIDS.map((s) => ({ value: s.v, label: s.plain })), value: 'KNO3', aria: 'the solid added to the water', onInput: () => {} });
  const cur = () => SOLIDS.find((s) => s.v === pick.value) || SOLIDS[1];
  /* the temperature at which the mass added just dissolves, where the chosen curve passes through it */
  const crossing = () => { const s = cur(), m = M.v; let prev = s.f(0) - m; for (let x = 0.5; x <= s.end; x += 0.5) { const now = s.f(x) - m; if (prev === 0) return x - 0.5; if (prev * now < 0) return Math.round(x - 0.5 + (0.5 * prev) / (prev - now)); prev = now; } return null; };
  const T = ctl(d.controls, { label: '\\kT', cls: 'temperature', min: 0, max: 100, step: 1, value: 40, unit: '°C', dec: 0, aria: 'temperature of the water in degrees Celsius', specials: [{ at: () => crossing(), label: 'saturated' }] });
  const M = ctl(d.controls, { label: '\\text{added}', cls: 'mass', min: 0, max: 300, step: 1, value: 100, unit: 'g', dec: 0, aria: 'grams of solid added to 100 grams of water',
    specials: [{ at: () => { const s = cur(); return T.v <= s.end ? Math.round(s.f(T.v)) : null; }, label: 'saturated' }] });
  const round = (x) => (x < 10 ? fmt(x, 1) : fmt(x, 0));
  const hits = []; F.hover(d.stage, () => hits);
  /* the beaker: inner walls, rim, base, the water's surface; one mark for each 5 g */
  const BL = 1096, BR = 1346, RIM = 196, BASE = 566, LEVEL = 286, PER = 5;
  const DOTS = []; for (let r = 0; r < 6; r++) for (let c = 0; c < 10; c++) DOTS.push([BL + 24 + c * 22.5 + ((r * 7 + c * 3) % 5) * 2 - 4, LEVEL + 26 + r * 23 + ((c * 5 + r * 2) % 4) * 2.5 - 3]);
  const ORDER = DOTS.map((_, i) => (i * 37) % 60);
  const HEAP = []; for (let r = 0; r < 5; r++) { const n = 13 - (r % 2); for (let c = 0; c < n; c++) HEAP.push([BL + 14 + (r % 2) * 9.2 + c * 18.5, BASE - 13 - r * 16.5]); }
  /* the heap fills from the middle of each row outward, a row at a time */
  const HEAP_ORDER = []; for (let r = 0, base = 0; r < 5; r++) { const n = 13 - (r % 2), mid = (n - 1) / 2; Array.from({ length: n }, (_, c) => c).sort((a, b) => Math.abs(a - mid) - Math.abs(b - mid)).forEach((c) => HEAP_ORDER.push(base + c)); base += n; }
  function beakerPath(ctx) {
    ctx.beginPath(); ctx.moveTo(BL - 16, RIM - 6); ctx.quadraticCurveTo(BL - 2, RIM - 4, BL, RIM + 12); ctx.lineTo(BL, BASE - 16); ctx.quadraticCurveTo(BL, BASE, BL + 16, BASE); ctx.lineTo(BR - 16, BASE); ctx.quadraticCurveTo(BR, BASE, BR, BASE - 16); ctx.lineTo(BR, RIM + 8); ctx.quadraticCurveTo(BR, RIM - 2, BR + 8, RIM - 4);
  }
  function draw() {
    const { ctx } = begin(d.c);
    hits.length = 0;
    const ct = C('temperature'), cm = C('mass');
    const si = SOLIDS.indexOf(cur()), s = SOLIDS[si], col = F.ref(s.ref), t = T.v, m = M.v;
    const box = { l: 120, r: 880, t: 160, b: 590 };
    const A = axes(ctx, box, [0, 100], [0, 300], { xl: 'Temperature (°C)', xc: ct, yl: 'solubility (g of solute in 100 g of H_{2}O)', nx: 5, ny: 6 });
    /* past the end of the book's curve: sugar is above the frame (more than 300 g dissolves), cerium sulfate has no data */
    const past = t > s.end, sol = past ? null : Math.round(s.f(t) * (s.f(t) < 10 ? 10 : 1)) / (s.f(t) < 10 ? 10 : 1);
    const state = past ? (s.off ? 'open' : 'none') : Math.abs(m - sol) < 0.5 ? 'saturated' : m < sol ? 'unsaturated' : 'over';
    const diss = state === 'none' ? 0 : state === 'over' ? sol : m, solid = state === 'over' ? m - sol : 0;
    F.shade(ctx, A, (x) => Math.min(s.f(x), 300), 0, 0, s.end, col, { alpha: 0.13 });
    SOLIDS.forEach((q, i) => { if (i !== si) F.plot(ctx, A, q.f, F.ref(q.ref), { w: 3, x: [0, q.end] }); });
    F.plot(ctx, A, s.f, col, { w: 6, x: [0, s.end] });
    line(ctx, A.X(t), box.b, A.X(t), A.Y(Math.min(Math.max(m, sol ?? 0), 300)), ct, 2, [4, 8]);
    SOLIDS.forEach((q, i) => {
      const x = q.off ? A.X(q.end) + 14 : A.X(q.end) + 12, y = q.off ? box.t + 16 : A.Y(q.f(q.end)) + (q.v === 'NaCl' ? 6 : q.v === 'KCl' ? -6 : q.v === 'Ce2SO43' ? -18 : q.v === 'NaBr' ? -4 : q.v === 'KBr' ? 4 : 0);
      text(ctx, q.lab, x, y, F.ref(q.ref), { size: 19, weight: i === si ? 600 : 400, bg: PAL.panel });
    });
    if (sol !== null) { dot(ctx, A.X(t), A.Y(sol), col, false, 10); hits.push({ x: A.X(t), y: A.Y(sol), r: 14, name: 'the solubility of ' + s.plain + ' at ' + t + ' °C, ' + round(sol) + ' g' }); }
    if (state === 'over' && A.Y(sol) - A.Y(m) > 26) vbracket(ctx, A.X(t) + (t > 80 ? -22 : 22), A.Y(m), A.Y(sol), PAL.ink, round(solid) + ' g solid', t > 80 ? -1 : 1, { size: 18 });
    const pt = pinned(ctx, box, A.X, A.Y, t, m, cm);
    const word = { saturated: 'saturated', unsaturated: 'all dissolved', open: 'all dissolved', over: '', none: '' }[state];
    const left = t > 62;
    F.rich(ctx, [[m + ' g added', cm], word ? ', ' + word : ''], pt.x + (left ? -16 : 16), pt.y + (state === 'over' ? -24 : pt.y > box.b - 40 ? -24 : 24), { size: 18, align: left ? 'right' : 'left', bg: PAL.panel });
    /* the beaker */
    ctx.save(); beakerPath(ctx); ctx.lineTo(BR, RIM); ctx.lineTo(BL, RIM); ctx.closePath(); ctx.clip(); ctx.fillStyle = alpha(PAL.muted, 0.2); ctx.fillRect(BL, LEVEL, BR - BL, BASE - LEVEL); ctx.restore();
    line(ctx, BL + 2, LEVEL, BR - 2, LEVEL, alpha(PAL.ink, 0.45), 1.5);
    const nd = Math.min(DOTS.length, Math.round(diss / PER)), ns = solid > 0 ? Math.min(HEAP.length, Math.max(1, Math.round(solid / PER))) : 0;
    const lit = new Set(ORDER.slice(0, nd));
    DOTS.forEach(([x, y], i) => { if (!lit.has(i)) return; ctx.save(); ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y, 6.5, 0, TAU); ctx.fill(); ctx.restore(); });
    HEAP_ORDER.slice(0, ns).forEach((i) => { const [x, y] = HEAP[i]; ctx.save(); ctx.translate(x, y); ctx.rotate(Math.PI / 4); ctx.fillStyle = col; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.rect(-6.2, -6.2, 12.4, 12.4); ctx.fill(); ctx.stroke(); ctx.restore(); });
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; beakerPath(ctx); ctx.stroke(); ctx.restore();
    text(ctx, '100 g of water at ' + t + ' °C', (BL + BR) / 2, RIM - 34, PAL.ink, { size: 18, align: 'center' });
    hits.push({ x: (BL + BR) / 2, y: LEVEL + 80, r: 90, name: s.plain + ' dissolved in the water, one dot for each 5 g' });
    if (ns) hits.push({ x: (BL + BR) / 2, y: BASE - 30, r: 60, name: 'solid ' + s.plain + ' on the bottom, one crystal for each 5 g' });
    if (state !== 'none') F.legend(ctx, { l: BL - 12, r: BR + 12, t: BASE + 22, b: BASE + 100 }, [
      { s: round(diss) + ' g dissolved', kind: 'dot', color: col },
      ...(solid > 0 ? [{ s: round(solid) + ' g solid', color: col, draw: (c, x, y) => { c.save(); c.translate(x + 22, y); c.rotate(Math.PI / 4); c.fillStyle = col; c.strokeStyle = PAL.ink; c.lineWidth = 1.2; c.beginPath(); c.rect(-6.2, -6.2, 12.4, 12.4); c.fill(); c.stroke(); c.restore(); } }] : []),
    ], { corner: 'tl', panel: false, size: 18 });
    const sr = sol === null ? '' : round(sol);
    topline(ctx, state === 'none'
      ? 'The curve for ' + s.plain + ' stops at ' + s.end + ' °C.'
      : state === 'open'
        ? 'Above 66 °C, 100 g of water dissolves more than 300 g of sugar, so all ' + m + ' g dissolves.'
        : state === 'saturated'
          ? 'At ' + t + ' °C, 100 g of water dissolves ' + sr + ' g of ' + s.plain + ', just the amount added: a saturated solution.'
          : state === 'unsaturated'
            ? 'At ' + t + ' °C, 100 g of water can dissolve ' + sr + ' g of ' + s.plain + ', so all ' + m + ' g dissolves: an unsaturated solution.'
            : 'At ' + t + ' °C, 100 g of water dissolves ' + sr + ' g of ' + s.plain + '; the other ' + round(solid) + ' g of the ' + m + ' g added stays solid.');
    const hm = (x) => hue('mass', x + '\\ \\text{g}'), hT = hue('temperature', t + '\\ ^\\circ\\text{C}');
    if (state === 'none') { tex(d.readout, `\\text{no curve for }${s.tex}\\text{ above }${hue('temperature', s.end + '\\ ^\\circ\\text{C}')}`); return; }
    if (state === 'open') { tex(d.readout, `${hm(m)}\\ \\text{added} < \\text{the solubility of }${s.tex}\\text{ at }${hT}\\text{, more than 300 g}`); return; }
    if (state === 'over') { tex(d.readout, `\\text{solid left} = ${hm(m)}\\ \\text{added} - ${sr}\\ \\text{g dissolved at }${hT} = ${round(solid)}\\ \\text{g of }${s.tex}`); return; }
    tex(d.readout, `${hm(m)}\\ \\text{added} ${state === 'saturated' ? '=' : '<'} ${sr}\\ \\text{g, the solubility of }${s.tex}\\text{ in 100 g of water at }${hT}`);
  }
  register(d.fig, { update: () => {}, draw });
})();
};
