/* Figures for section 11.4 Colligative Properties. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['11.4'] = function (root, F) {
const { fmt, tex, C, PAL, alpha, ctl, cycle, register, begin, line, text, topline, hbracket, legend, label, axes, plot, dot } = F;
/* one atom: a filled ball in its element colour, ink rim */
function ball(ctx, x, y, r, col) { ctx.save(); ctx.fillStyle = col; ctx.strokeStyle = alpha(PAL.ink, 0.55); ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(x, y, r, 0, 2 * Math.PI); ctx.fill(); ctx.stroke(); ctx.restore(); }
const sim = (id, H) => F.sim(root, id, H);
const TAU = 2 * Math.PI;
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;
const minus = (s) => String(s).replace(/^-/, '−');
/* a small seeded generator, so a slider position always draws the same arrangement */
const rng = (seed) => () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };

/* =====================================================================
   FIGURE 11.18: the vapor above pure water and above a solution of urea,
   two stoppered Erlenmeyer flasks at 25 °C drawn flat as the book draws
   them, and beside them Raoult's law as its line. Each liquid is three
   rows of ten places; urea takes the same share of every row, so with X
   in tenths the share of the surface that water holds is exactly X.
   Moving: water leaves the surface from places water holds, R0 × X × 10
   molecules a second (evenly spaced), flies straight, turns at the
   glass, and goes back into the liquid at its first strike on the
   surface after AIR seconds aloft, in either flask alike (the rate of
   return per molecule is not changed by the solute). The number aloft
   therefore settles at X times the pure water's, which is the law.
   23.7 torr is the vapor pressure of water at 25 °C (Example 11.6's
   Check Your Learning); 0.800 is the mole fraction of Example 11.6.
   Canvas units: flask centres FXS, base at YB, neck from YN up to YT,
   liquid surface at YS.
===================================================================== */
(function () {
  const d = sim('sim-vapor-lowering', 640);
  const P_STAR = 23.7;
  const X = ctl(d.controls, { label: 'X_{\\text{solvent}}', cls: '', min: 0.5, max: 1, step: 0.1, value: 0.8, unit: '', dec: 3, aria: 'mole fraction of water in the solution' });
  const FXS = [236, 704], YB = 560, YN = 252, YT = 150, YS = 440, HB = 216, HN = 56, NS = 10;
  const hw = (y) => (y <= YN ? HN : HN + ((HB - HN) * (y - YN)) / (YB - YN));   /* inner half-width of the flask at height y */
  /* the liquid's places: three rows of NS, the top one the surface */
  const ROWS = [YS + 24, YS + 58, YS + 92];
  const SITES = ROWS.flatMap((y, r) => { const w = hw(y) - 26; return Array.from({ length: NS }, (_, i) => ({ r, i, x: -w + (2 * w * (i + 0.5 + (r % 2 ? 0.18 : -0.18))) / NS, y })); });
  /* which places urea takes: round((1 − X) NS) of each row, spread evenly along it and staggered row to row */
  function soluteSites(x) {
    const s = new Set(), n = Math.round((1 - x) * NS);
    ROWS.forEach((_, r) => { for (let j = 0; j < n; j++) s.add(r * NS + (Math.floor(((j + 0.5) * NS) / n + r * 1.4) % NS)); });
    return s;
  }
  const R0 = 0.5, AIR = 3.3, R = 12;                 /* departures per surface place per second; least time aloft; a molecule's reach */
  const fr = (i) => { const v = Math.sin(i * 12.9898 + 78.233) * 43758.5453; return v - Math.floor(v); };
  const flasks = [0, 1].map((k) => ({ k, mols: [], acc: 0.5, born: 0 }));
  let urea = soluteSites(X.v);
  function step(dt) {
    urea = soluteSites(X.v);
    for (const f of flasks) {
      const sites = SITES.filter((q) => q.r === 0 && !(f.k === 1 && urea.has(q.i)));
      f.acc += R0 * sites.length * dt;
      while (f.acc >= 1 && sites.length) {
        f.acc -= 1;
        const n = f.born++, q = sites[(n * 7 + f.k * 3) % sites.length], a = -Math.PI / 2 + (fr(n * 7 + 1 + f.k) - 0.5) * 2.0, sp = 150 + 90 * fr(n * 3 + 2);
        f.mols.push({ age: 0, least: AIR + 0.5 * fr(n * 13 + 5), x: q.x, y: YS - 4, vx: sp * Math.cos(a), vy: sp * Math.sin(a), rot: fr(n * 5) * TAU, w: (fr(n * 11) - 0.5) * 4, out: 0 });
      }
      for (const m of f.mols) {
        m.age += dt;
        if (m.out) { m.out += dt; m.y += 60 * dt; continue; }
        m.x += m.vx * dt; m.y += m.vy * dt; m.rot += m.w * dt;
        const top = YT + 30 + R;
        if (m.y < top) { m.y = top; m.vy = Math.abs(m.vy); }
        const lim = hw(m.y) - R - 3;
        if (Math.abs(m.x) > lim) {
          m.x = Math.sign(m.x) * lim;
          /* turn at the glass: upright in the neck, slanted in the cone */
          if (m.y <= YN) m.vx = -Math.sign(m.x) * Math.abs(m.vx);
          else { const sl = (HB - HN) / (YB - YN), nx = Math.sign(m.x) / Math.hypot(1, sl), ny = -sl / Math.hypot(1, sl), dd = m.vx * nx + m.vy * ny; if (dd > 0) { m.vx -= 2 * dd * nx; m.vy -= 2 * dd * ny; } }
        }
        /* at the surface: back into the liquid once it has been aloft long enough, else off it again */
        if (m.vy > 0 && m.y >= YS - R && m.age > 0.2) { if (m.age >= m.least) m.out = 1e-6; else { m.y = YS - R; m.vy = -m.vy; } }
      }
      f.mols = f.mols.filter((m) => m.out < 0.25);
    }
  }
  /* start with each flask's vapor already settled */
  for (let i = 0; i < 900; i++) step(1 / 60);
  const cy = cycle(() => Infinity, 0);
  let hits = [];
  F.hover(d.stage, () => hits);
  function water(ctx, x, y, a) {
    for (const s of [0.91, -0.91]) ball(ctx, x + 10 * Math.cos(a + s), y + 10 * Math.sin(a + s), 5.4, F.el('H'));
    ball(ctx, x, y, 8.4, F.el('O'));
  }
  /* urea, CO(NH₂)₂: C with O above and the two N below it, each N with its two H */
  function ureaMol(ctx, x, y) {
    [[-19, 8], [-13, 19], [19, 8], [13, 19]].forEach(([dx, dy]) => ball(ctx, x + dx, y + dy, 4.6, F.el('H')));
    ball(ctx, x - 10, y + 8, 7.4, F.el('N')); ball(ctx, x + 10, y + 8, 7.4, F.el('N'));
    ball(ctx, x, y - 12, 7.4, F.el('O')); ball(ctx, x, y, 7.8, F.el('C'));
  }
  function flask(ctx, cx, col) {
    ctx.save(); ctx.lineJoin = 'round';
    /* the liquid */
    ctx.beginPath(); ctx.moveTo(cx - hw(YS), YS); ctx.lineTo(cx + hw(YS), YS); ctx.lineTo(cx + HB, YB - 14); ctx.quadraticCurveTo(cx + HB, YB, cx + HB - 14, YB); ctx.lineTo(cx - HB + 14, YB); ctx.quadraticCurveTo(cx - HB, YB, cx - HB, YB - 14); ctx.closePath();
    ctx.fillStyle = alpha(PAL.ink, 0.08); ctx.fill();
    line(ctx, cx - hw(YS), YS, cx + hw(YS), YS, alpha(PAL.ink, 0.4), 2);
    /* the glass, in the flask's referent colour, with its lip */
    ctx.strokeStyle = col; ctx.lineWidth = 4; ctx.beginPath();
    ctx.moveTo(cx - HN - 9, YT - 7); ctx.lineTo(cx - HN, YT); ctx.lineTo(cx - HN, YN); ctx.lineTo(cx - HB, YB - 14); ctx.quadraticCurveTo(cx - HB, YB, cx - HB + 14, YB);
    ctx.lineTo(cx + HB - 14, YB); ctx.quadraticCurveTo(cx + HB, YB, cx + HB, YB - 14); ctx.lineTo(cx + HN, YN); ctx.lineTo(cx + HN, YT); ctx.lineTo(cx + HN + 9, YT - 7);
    ctx.stroke();
    /* the cork stopper, seated in the neck */
    ctx.fillStyle = alpha(PAL.ink, 0.3); ctx.strokeStyle = alpha(PAL.ink, 0.6); ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(cx - HN - 12, YT - 44); ctx.lineTo(cx + HN + 12, YT - 44); ctx.lineTo(cx + HN - 2, YT + 30); ctx.lineTo(cx - HN + 2, YT + 30); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.restore();
  }
  function draw() {
    const { ctx } = begin(d.c);
    hits = [];
    const x = X.v, cP = C('pressure'), ps = x * P_STAR + 1e-9, tt = cy.now();
    const cols = [F.ref('pure-tank'), F.ref('solution-tank')];
    flasks.forEach((f) => {
      const cx = FXS[f.k], col = cols[f.k];
      flask(ctx, cx, col);
      SITES.forEach((q, n) => {
        const px = cx + q.x + Math.sin(tt * 3.3 + n * 1.7) * 1.5, py = q.y + Math.cos(tt * 2.7 + n) * 1.5;
        if (f.k === 1 && urea.has(n)) { ureaMol(ctx, px, py); hits.push({ x: px, y: py, r: 18, name: 'a urea molecule, CO(NH₂)₂, which does not leave the liquid' }); }
        else { water(ctx, px, py, -Math.PI / 2 + Math.sin(n * 2.3) * 1.2); hits.push({ x: px, y: py, r: 13, name: q.r ? 'a water molecule in the liquid' : 'a water molecule at the surface' }); }
      });
      for (const m of f.mols) {
        ctx.save(); if (m.out) ctx.globalAlpha = Math.max(0, 1 - m.out / 0.25);
        water(ctx, cx + m.x, m.y, m.rot); ctx.restore();
        hits.push({ x: cx + m.x, y: m.y, r: 13, name: 'a water molecule in the vapor' });
      }
      hits.push({ x: cx, y: YT - 8, r: 44, name: 'the stopper' });
      text(ctx, f.k ? 'solution of urea in water' : 'pure water', cx, YB + 28, col, { size: 21, weight: 600, align: 'center' });
      F.rich(ctx, ['vapor pressure ', [fmt(f.k ? ps : P_STAR, 1) + ' torr', cP]], cx, YB + 58, { size: 20, align: 'center' });
    });
    legend(ctx, { l: FXS[0] + 150, r: FXS[1] - 150, t: 200, b: 330 }, [{ s: 'water', draw: (c, a, b) => water(c, a, b + 3, -Math.PI / 2) }, { s: 'urea', draw: (c, a, b) => ureaMol(c, a, b - 3) }], { corner: 'top' });
    /* Raoult's law as its line: the vapor pressure against the mole fraction of water, 0 to 1 and 0 to 25 torr */
    const ax = axes(ctx, { l: 1050, r: 1320, t: 190, b: 510 }, [0, 1], [0, 25], { nx: 2, ny: 5, xl: 'X_{solvent}', yl: 'vapor pressure (torr)', yc: cP });
    plot(ctx, ax, (u) => u * P_STAR, cP, { w: 5 });
    const gx = ax.X(x), gy = ax.Y(ps), guide = alpha(PAL.ink, 0.4);
    line(ctx, gx, gy, gx, ax.box.b, guide, 2, [4, 8]); line(ctx, ax.box.l, gy, gx, gy, guide, 2, [4, 8]);
    dot(ctx, ax.X(1), ax.Y(P_STAR), cols[0], true, 10);
    text(ctx, 'pure water', ax.X(1) - 18, ax.Y(P_STAR) - 4, cols[0], { size: 18, weight: 600, align: 'right' });
    if (x < 1) {
      dot(ctx, gx, gy, cols[1], true, 10);
      text(ctx, 'solution', gx + 16, gy + 24, cols[1], { size: 18, weight: 600, align: 'left' });
    }
    hits.push({ x: ax.X(1), y: ax.Y(P_STAR), r: 16, name: 'pure water: mole fraction 1, 23.7 torr' }, { x: gx, y: gy, r: 16, name: 'the solution' });
    const pc = Math.round(100 * (1 - x));
    topline(ctx, pc === 0 ? 'With no urea, water leaves both surfaces at the same rate and both flasks hold vapor at 23.7 torr.'
      : `Urea holds ${pc}% of the surface, so ${pc}% fewer water molecules leave it each second and the vapor pressure settles ${pc}% lower.`);
    tex(d.readout, `\\kPsoln = X_{\\text{solvent}}\\kPsolvstar = ${fmt(x, 3)} \\times ${hue('pressure', '23.7\\ \\text{torr}')} = ${hue('pressure', fmt(ps, 1) + '\\ \\text{torr}')}`);
  }
  register(d.fig, { update: (dt) => { cy.step(dt, () => 1); step(Math.min(dt, 0.05)); }, draw });
})();

/* =====================================================================
   FIGURE 11.23: phase diagrams of water (solid curves) and of a solution
   of a nonvolatile solute in it (dashed), with the molality and the
   solute the reader's. Still: the diagram answers its slider and choice.
   The temperature axis is real, TS units per °C, in two windows, −14 to
   3 °C and 97 to 104.5 °C, with a marked break between them, so ΔT_f =
   K_f m and ΔT_b = K_b m are read off the same scale and their ratio
   K_f/K_b = 3.6 is the ratio drawn; m is the molality of all solute
   particles, 1, 2 or 3 per formula unit. Pressure is not to scale (the
   book's is not): only 1 atm is marked. The solid–gas curve is
   P3 e^{0.12 T} and never moves; water's solid–liquid line stands at
   0 °C (its lean is 0.0075 °C per atm); the liquid–vapor curve is an
   exponential in canvas x from the triple point to 1 atm at 100 °C. The
   solution's triple point lies on the solid–gas curve at −ΔT_f, its
   liquid–vapor curve runs from there to 1 atm at 100 °C + ΔT_b, below
   water's everywhere, and ΔP is marked at 100 °C with its true value by
   Raoult's law, ΔP = X_solute × 1 atm, X_solute = m/(55.51 + m).
===================================================================== */
(function () {
  const d = sim('sim-phase-diagram', 640);
  const I = { sucrose: 1, NaCl: 2, CaCl2: 3 }, NAME = { sucrose: 'sucrose', NaCl: 'NaCl', CaCl2: 'CaCl₂' };
  const SEA = 4.2 / 58.44 / 0.125;                       /* Example 11.13: 4.2 g of NaCl in 125 g of water, 0.575 m */
  const mf = (v) => (Math.abs(v * 100 - Math.round(v * 100)) > 1e-6 ? v.toFixed(3) : v.toFixed(2));
  const mS = ctl(d.controls, { label: '\\kmolal', cls: 'concentration', min: 0, max: 2, step: 0.05, value: 1, unit: 'm', fmt: (v) => mf(v) + ' m', detents: [1], aria: 'molality of the solute, in moles of formula units per kilogram of water',
    specials: [{ at: () => (sol.value === 'NaCl' ? SEA : null), label: 'seawater' }] });
  const sol = F.choice(d.controls, { label: '\\text{solute}', options: [{ value: 'sucrose', label: 'sucrose' }, { value: 'NaCl', label: 'NaCl' }, { value: 'CaCl2', label: 'CaCl₂' }], value: 'NaCl', aria: 'the solute dissolved in the water', onInput: () => mS.refresh && mS.refresh() });
  const KB = 0.512, KF = 1.86, TS = 32;
  const XL = 170, XA = XL + 17 * TS, XB = XA + 220, XR = XB + 7.5 * TS, PB = 496, PT = 152, P3 = 0.28, KS = 0.12;
  /* canvas x of a temperature: the two windows to scale, the stretch between them squeezed into the break */
  const xT = (T) => (T <= 3 ? XL + (T + 14) * TS : T >= 97 ? XB + (T - 97) * TS : XA + ((T - 3) / 94) * (XB - XA));
  const Y = (p) => PB - p * (PB - PT);
  const sub = (T) => P3 * Math.exp(KS * T);
  const X0 = xT(0), X100 = xT(100);
  /* a liquid–vapor curve: exponential in canvas x from (x3, p3) up to 1 atm at xb */
  const vapOf = (x3, p3, xb) => { const k = Math.log(1 / p3) / (xb - x3); return (x) => p3 * Math.exp(k * (x - x3)); };
  const hits = []; F.hover(d.stage, () => hits);
  function poly(ctx, f, x0, x1, color, dash) {
    ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = 4.5; ctx.lineJoin = 'round'; if (dash) ctx.setLineDash(dash); ctx.beginPath();
    for (let i = 0; i <= 90; i++) { const x = x0 + ((x1 - x0) * i) / 90, y = Y(Math.min(f(x), 1)); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }
    ctx.stroke(); ctx.restore();
  }
  function draw() {
    const { ctx } = begin(d.c);
    hits.length = 0;
    const m = mS.v, ip = I[sol.value], iv = sol.mix((s) => I[s]), ct = C('temperature'), cp = C('pressure');
    const dTf = ip * KF * m, dTb = ip * KB * m, on = m > 0;
    const cSub = F.ref('sub-curve'), cVap = F.ref('vap-curve'), cMelt = F.ref('melt-curve'), guide = alpha(PAL.ink, 0.4), DASH = [12, 9];
    /* the drawn shifts follow the choice as it morphs; the numbers are the chosen solute's */
    const tf = -iv * KF * m, tb = 100 + iv * KB * m, x3s = xT(tf), p3s = sub(tf), xbs = xT(tb);
    const vw = vapOf(X0, P3, X100), vs = vapOf(x3s, p3s, xbs);
    /* the frame: pressure up the side with 1 atm marked, temperature along the bottom in its two windows */
    line(ctx, XL, PT - 34, XL, PB, PAL.muted, 2);
    line(ctx, XL, PB, XA + 4, PB, PAL.muted, 2); line(ctx, XB - 4, PB, XR + 16, PB, PAL.muted, 2);
    for (const x of [XA + 4, XB - 16]) { line(ctx, x, PB + 11, x + 12, PB - 11, PAL.muted, 2); }
    line(ctx, XL, PT, XR + 16, PT, guide, 2);
    text(ctx, '1 atm', XL - 14, PT, cp, { size: 19, weight: 600, align: 'right' });
    text(ctx, 'pressure', XL - 14, Y(0.5) - 12, cp, { size: 19, weight: 600, align: 'right' });
    text(ctx, 'not to scale', XL - 14, Y(0.5) + 12, PAL.muted, { size: 16, align: 'right' });
    text(ctx, 'temperature (°C)', (XA + XB) / 2, PB + 26, ct, { size: 19, weight: 600, align: 'center' });
    for (let T = -14; T <= 2; T += 2) { line(ctx, xT(T), PB, xT(T), PB + 8, PAL.muted, 2); text(ctx, fmt(T, 0), xT(T), PB + 26, PAL.muted, { size: 17, align: 'center' }); }
    for (let T = 98; T <= 104; T += 2) { line(ctx, xT(T), PB, xT(T), PB + 8, PAL.muted, 2); text(ctx, fmt(T, 0), xT(T), PB + 26, PAL.muted, { size: 17, align: 'center' }); }
    /* where the solution is liquid and water is not, lightly tinted */
    if (on) {
      ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.08); ctx.beginPath();
      ctx.moveTo(x3s, PT); ctx.lineTo(x3s, Y(p3s));
      for (let i = 0; i <= 60; i++) { const x = x3s + ((xbs - x3s) * i) / 60; ctx.lineTo(x, Y(Math.min(1, vs(x)))); }
      for (let i = 60; i >= 0; i--) { const x = X0 + ((X100 - X0) * i) / 60; ctx.lineTo(x, Y(Math.min(1, vw(x)))); }
      ctx.lineTo(X0, PT); ctx.closePath(); ctx.fill(); ctx.restore();
    }
    /* the four temperatures, dropped from 1 atm to the axis */
    const drops = [X0, X100].concat(on ? [x3s, xbs] : []);
    drops.forEach((x) => { line(ctx, x, PT, x, PB, guide, 2, [4, 8]); line(ctx, x, PB + 40, x, PB + 98, guide, 2, [4, 8]); });
    /* the curves: solid–gas, then water's solid–liquid and liquid–vapor, then the solution's dashed */
    poly(ctx, (x) => sub((x - X0) / TS), XL, X0, cSub);
    poly(ctx, vw, X0, X100, cVap);
    line(ctx, X0, Y(P3), X0, PT, cMelt, 4.5);
    if (on) { poly(ctx, vs, x3s, xbs, cVap, DASH); line(ctx, x3s, Y(p3s), x3s, PT, cMelt, 4.5, DASH); }
    text(ctx, 'Solid', XL + 46, Y(0.62), PAL.ink, { size: 23, weight: 600, align: 'center' });
    text(ctx, 'Liquid', (XA + XB) / 2 - 20, Y(0.8), PAL.ink, { size: 23, weight: 600, align: 'center' });
    text(ctx, 'Gas', XB - 10, Y(0.2), PAL.ink, { size: 23, weight: 600, align: 'center' });
    /* each temperature named under the axis, the pair of each end turned away from one another */
    const named = (x, side, s, v) => {
      text(ctx, s, x + (side === 'left' ? 8 : -8), PB + 62, PAL.ink, { size: 18, align: side });
      text(ctx, v, x + (side === 'left' ? 8 : -8), PB + 88, ct, { size: 20, weight: 600, align: side });
    };
    named(X0, 'left', 'water freezes', '0 °C'); named(X100, 'right', 'water boils', '100 °C');
    if (on) { named(x3s, 'right', 'solution freezes', fmt(-dTf, 2) + ' °C'); named(xbs, 'left', 'solution boils', fmt(100 + dTb, 2) + ' °C'); }
    /* the gaps: ΔT_f and ΔT_b over the 1 atm line, ΔP at 100 °C between the liquid–vapor curves */
    if (on) {
      hbracket(ctx, x3s, X0, PT - 24, ct, 'ΔT_{f} = ' + fmt(dTf, 2) + ' °C', { size: 20 });
      hbracket(ctx, X100, xbs, PT - 24, ct, 'ΔT_{b} = ' + fmt(dTb, 2) + ' °C', { size: 20 });
      const yp = Y(vs(X100)), xs = ip * m / (55.51 + ip * m);
      ctx.save(); ctx.strokeStyle = cp; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(X100, PT); ctx.lineTo(X100, yp); ctx.moveTo(X100 - 9, yp); ctx.lineTo(X100 + 9, yp); ctx.stroke(); ctx.restore();
      const lx = X100 + 64, ly = Math.max(yp, PT + 30) + 52;
      line(ctx, X100 + 6, (PT + yp) / 2 + 4, lx - 4, ly - 16, alpha(cp, 0.6), 1.5, [5, 6]);
      text(ctx, 'ΔP = ' + fmt(xs, 3) + ' atm', lx, ly, cp, { size: 20, weight: 600, align: 'left', bg: PAL.panel });
      hits.push({ x: X100, y: (PT + yp) / 2, r: 16, name: 'at 100 °C the solution’s vapor pressure is ΔP short of 1 atm' });
    }
    hits.push({ x: xT(-7), y: Y(sub(-7)), r: 18, name: 'the solid–gas curve, the same for water and the solution' }, { x: (XA + XB) / 2, y: Y(vw((XA + XB) / 2)), r: 18, name: 'the liquid–vapor curve of water' }, { x: X0, y: Y(0.65), r: 16, name: 'the solid–liquid line of water' },
      { x: XA + 10, y: PB, r: 18, name: 'the scale skips from 3 °C to 97 °C' }, { x: XB - 10, y: PB, r: 18, name: 'the scale skips from 3 °C to 97 °C' });
    if (on) hits.push({ x: (XA + XB) / 2 + 40, y: Y(vs((XA + XB) / 2 + 40)), r: 18, name: 'the liquid–vapor curve of the solution' }, { x: x3s, y: Y(0.65), r: 16, name: 'the solid–liquid line of the solution' }, { x: (x3s + X0) / 2, y: Y(0.8), r: 20, name: 'here the solution is still liquid and water is ice' });
    legend(ctx, { l: XB, r: XR + 16, t: PT + 150, b: PB - 8 }, [{ s: 'water', color: PAL.ink, w: 4 }, { s: 'solution', color: PAL.ink, w: 4, dash: DASH }], { corner: 'br' });
    const fz = fmt(-dTf, 2), bp = fmt(100 + dTb, 2), nm = NAME[sol.value];
    topline(ctx, !on ? 'With no solute, the solution’s curves lie on those of water.'
      : ip === 1 ? `A ${mf(m)} m solution of ${nm} freezes at ${fz} °C and boils at ${bp} °C.`
        : `${mf(m)} m ${nm} is ${mf(ip * m)} m in ions: the solution freezes at ${fz} °C and boils at ${bp} °C.`);
    const mm = ip === 1 ? hue('concentration', mf(m) + '\\ m') : `(${ip} \\times ${hue('concentration', mf(m) + '\\ m')})`, deg = (x) => hue('temperature', fmt(x, 2) + '\\ {}^{\\circ}\\text{C}');
    tex(d.readout, `\\kdTf = \\kKf\\kmolal = ${hue('colligative-constant', '1.86\\ {}^{\\circ}\\text{C}/m')} \\times ${mm} = ${deg(dTf)} \\\\ \\kdTb = \\kKb\\kmolal = ${hue('colligative-constant', '0.512\\ {}^{\\circ}\\text{C}/m')} \\times ${mm} = ${deg(dTb)}`);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 11.24 + 11.25: osmosis in a U-tube, and reverse osmosis under
   a piston, drawn flat as the book draws them: pure water in the left
   arm, a glucose solution in the right, a semipermeable membrane across
   the bottom of the U; beside it, the two rates of crossing against
   time. Moving: water crosses into the solution at a steady rate; the
   rate back grows with the pressure on the solution (its column's
   height and the piston), rate back = 1 − A (Π − P_applied − h) in
   units of the rate in, so from equal levels (the book's (a)) the
   height difference h relaxes toward Π − P_applied (time constant
   TAU_S, a PER s clock), the left column falling as the right one
   rises by the same amount, and the two rates meet. Past Π (Figure
   11.25) the rate back is the larger from the start and the pure
   water's column ends higher. Glucose never crosses. Heights are drawn
   at S units per atm; the true column, 10.33 m of water per atm, is
   stated under the tube. T is 310 K (37 °C), as in Example 11.10, which
   is the opening state. Canvas units: the U's centreline runs down the
   left arm at XL, round a half circle of radius RC about (XC, YC), and
   up the right arm at XR; the tube is 2 TW wide.
===================================================================== */
(function () {
  const d = sim('sim-osmosis', 690);
  const RT = 0.08206, TK = 310, S = 10, TAU_S = 1.4, PER = 7, A = 0.05;
  const Mv = ctl(d.controls, { label: '\\kM', cls: 'concentration', min: 0, max: 0.5, step: 0.01, value: 0.3, unit: 'M', dec: 2, detents: [0.3], aria: 'molarity of the glucose solution', onInput: () => cy.reset() });
  const Pa = ctl(d.controls, { label: 'P_{\\text{applied}}', cls: 'pressure', min: 0, max: 15, step: 0.1, value: 0, unit: 'atm', dec: 1, aria: 'pressure applied to the piston over the solution, in atmospheres', specials: [{ at: () => Mv.v * RT * TK, label: 'Π' }], onInput: () => cy.reset() });
  const cy = cycle(() => PER, 2);
  const XC = 400, YC = 350, RC = 190, TW = 62, XL = XC - RC, XR = XC + RC, YTOP = 104, Y0 = 250;
  const LA = YC - YTOP, LB = Math.PI * RC, LEN = 2 * LA + LB, SMID = LA + LB / 2;
  const Pi = () => Mv.v * RT * TK;
  /* atm the height difference stands for: an exponential approach, scaled to arrive exactly at the end of the clock */
  const hOf = (t) => (Pi() - Pa.v) * (1 - Math.exp(-t / TAU_S)) / (1 - Math.exp(-PER / TAU_S));
  const back = (t) => 1 - A * (Pi() - Pa.v - hOf(t));
  /* a point of the tube: s along the centreline from the top of the left arm, u across it (positive outward on the bend) */
  function at(s, u) {
    if (s <= LA) return [XL - u, YTOP + s];
    if (s >= LA + LB) return [XR + u, YTOP + LEN - s];
    const a = Math.PI - (s - LA) / RC;                       /* from the left (π) round the bottom to the right (0) */
    return [XC + (RC + u) * Math.cos(a), YC + (RC + u) * Math.sin(a)];
  }
  /* water at fixed places in three lanes */
  const WATER = []; for (let s = 16; s < LEN - 10; s += 34) for (const u of [-37, 0, 37]) WATER.push({ s: s + (u > 0 ? 17 : u < 0 ? 0 : 9), u, i: WATER.length });
  let hits = [];
  F.hover(d.stage, () => hits);
  function water(ctx, x, y, a) {
    for (const k of [0.91, -0.91]) ball(ctx, x + 10 * Math.cos(a + k), y + 10 * Math.sin(a + k), 5.4, F.el('H'));
    ball(ctx, x, y, 8.4, F.el('O'));
  }
  /* glucose as its ring, five C and one O, with the sixth carbon beside it */
  function glucose(ctx, x, y, a) {
    ball(ctx, x + 25 * Math.cos(a + 1.05), y + 25 * Math.sin(a + 1.05), 7, F.el('C'));
    for (let k = 0; k < 6; k++) { const b = a + (k * Math.PI) / 3; ball(ctx, x + 13.5 * Math.cos(b), y + 13.5 * Math.sin(b), 7.4, F.el(k === 0 ? 'O' : 'C')); }
  }
  function draw() {
    const { ctx } = begin(d.c);
    hits = [];
    const t = cy.now(), pi = Pi(), pa = Pa.v, h = hOf(t), target = pi - pa, rest = t >= PER - 0.01 || Math.abs(target) < 0.05;
    const yL = Y0 + (h * S) / 2, yR = Y0 - (h * S) / 2, sL = yL - YTOP, sR = LEN - (yR - YTOP);
    const cw = F.ref('water-arm'), cs = F.ref('solution-arm'), cm = F.ref('membrane'), cpis = F.ref('piston'), cp = C('pressure'), ctm = C('time');
    const cIn = F.cat(0), cBack = F.cat(3), guide = alpha(PAL.ink, 0.45);
    /* the liquid, from the left surface round to the right surface */
    ctx.save(); ctx.beginPath();
    for (let s = sL; s <= sR; s += 4) ctx.lineTo(...at(s, -TW + 2));
    ctx.lineTo(...at(sR, -TW + 2)); ctx.lineTo(...at(sR, TW - 2));
    for (let s = sR; s >= sL; s -= 4) ctx.lineTo(...at(s, TW - 2));
    ctx.closePath(); ctx.fillStyle = alpha(PAL.ink, 0.08); ctx.fill(); ctx.restore();
    line(ctx, XL - TW + 2, yL, XL + TW - 2, yL, alpha(PAL.ink, 0.4), 2); line(ctx, XR - TW + 2, yR, XR + TW - 2, yR, alpha(PAL.ink, 0.4), 2);
    /* glucose, spread through the solution from the membrane to its surface; water everywhere else */
    const nG = Math.round(Mv.v * 20), tt = cy.now(), g0 = SMID + 46, g1 = sR - 26;
    const gl = Array.from({ length: nG }, (_, j) => { const [x, y] = at(g0 + ((j + 0.5) / nG) * (g1 - g0), j % 2 ? 26 : -26); return { x: x + 2 * Math.sin(tt * 1.3 + j), y: y + 2 * Math.cos(tt * 1.1 + j * 2), j }; });
    for (const w of WATER) {
      if (w.s < sL + 12 || w.s > sR - 12) continue;
      const [x0, y0] = at(w.s, w.u);
      if (Math.abs(x0 - XC) < 30 && y0 > YC) continue;
      if (gl.some((g) => Math.hypot(g.x - x0, g.y - y0) < 36)) continue;
      const x = x0 + 2 * Math.sin(tt * 3 + w.i), y = y0 + 2 * Math.cos(tt * 2.6 + w.i * 1.3);
      water(ctx, x, y, w.i * 2.1 + tt * 0.5);
      hits.push({ x, y, r: 13, name: 'a water molecule' });
    }
    for (const g of gl) { glucose(ctx, g.x, g.y, g.j + tt * 0.4); hits.push({ x: g.x, y: g.y, r: 22, name: 'a glucose molecule, C₆H₁₂O₆, too large to cross the membrane' }); }
    /* water crossing the membrane both ways, more toward the side the water is moving to */
    const net = 1 - back(t), nRight = rest || Math.abs(net) < 0.004 ? 2 : net > 0 ? 3 : 1;
    [-42, -14, 14, 42].forEach((dy, i) => {
      const dir = (nRight === 2 ? [1, -1, 1, -1] : nRight === 3 ? [1, 1, -1, 1] : [-1, 1, -1, -1])[i], p = (tt * 0.42 + i * 0.27) % 1, x = XC + dir * (-62 + 124 * p), y = YC + RC + dy;
      ctx.save(); ctx.globalAlpha = Math.min(1, 6 * p, 6 * (1 - p)); water(ctx, x, y, dir > 0 ? 0 : Math.PI); ctx.restore();
    });
    /* the glass: each arm in its referent colour, the membrane across the bottom */
    ctx.save(); ctx.lineWidth = 4; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    for (const [col, side] of [[cw, -1], [cs, 1]]) {
      ctx.strokeStyle = col;
      for (const u of [-TW, TW]) { ctx.beginPath(); for (let s = side < 0 ? 0 : SMID, i = 0; side < 0 ? s <= SMID : s <= LEN; s += 4, i++) { const q = at(Math.min(s, LEN), u); i ? ctx.lineTo(...q) : ctx.moveTo(...q); } ctx.lineTo(...at(side < 0 ? SMID : LEN, u)); ctx.stroke(); }
    }
    ctx.restore();
    ctx.save(); ctx.fillStyle = alpha(cm, 0.55); ctx.strokeStyle = cm; ctx.lineWidth = 2; ctx.fillRect(XC - 6, YC + RC - TW, 12, 2 * TW); ctx.strokeRect(XC - 6, YC + RC - TW, 12, 2 * TW); ctx.restore();
    hits.push({ x: XC, y: YC + RC, r: 20, name: 'the semipermeable membrane, which only water crosses' });
    label(ctx, 'semipermeable membrane', XC, YC + RC + TW, { side: 'below', size: 19, gap: 26, color: cm });
    text(ctx, 'pure water', XL + 6, YC + RC + 54, cw, { size: 21, weight: 600, align: 'right' });
    text(ctx, 'glucose solution', XR - 6, YC + RC + 54, cs, { size: 21, weight: 600, align: 'left' });
    /* the piston on the solution, and the pressure on it */
    if (pa > 0.05) {
      ctx.save(); ctx.fillStyle = alpha(cpis, 0.35); ctx.strokeStyle = cpis; ctx.lineWidth = 3; ctx.fillRect(XR - TW + 4, yR - 22, 2 * TW - 8, 22); ctx.strokeRect(XR - TW + 4, yR - 22, 2 * TW - 8, 22); ctx.restore();
      line(ctx, XR, yR - 22, XR, YTOP - 34, cpis, 6);
      F.arrow(ctx, XR + TW + 34, YTOP - 30, XR + TW + 34, YTOP + 34, cp, 4);
      F.rich(ctx, ['P_{applied} = ', [fmt(pa, 1) + ' atm', cp]], XR + TW + 52, YTOP + 2, { size: 19 });
      hits.push({ x: XR, y: yR - 11, r: 34, name: 'the piston pressing on the solution' });
    }
    /* the height difference, and the pressure it stands for */
    if (Math.abs(h) * S > 6) {
      const xb = XR + TW + 64;
      line(ctx, XL + TW + 4, yL, xb + 10, yL, guide, 2, [10, 8]);
      line(ctx, XR + TW + 4, yR, xb + 10, yR, guide, 2, [10, 8]);
      F.vbracket(ctx, xb, Math.min(yL, yR), Math.max(yL, yR), cp, (rest && pa < 0.05 ? 'Π = ' : '') + fmt(Math.abs(h), 1) + ' atm', 1, { size: 20 });
      text(ctx, `A real column for ${fmt(Math.abs(h), 1)} atm is ${fmt(Math.abs(h) * 10.33, 0)} m of water; the arms are drawn far shorter.`, XC, 668, PAL.muted, { size: 16, align: 'center' });
    }
    /* the two rates of crossing against time, 0 to PER s; the rate axis 0 to 1.8 times the rate into the solution */
    const ax = axes(ctx, { l: 960, r: 1330, t: 170, b: 460 }, [0, PER], [0, 1.8], { nx: 7, ny: 0, xl: 't (s)', xc: ctm, yl: 'water molecules crossing per second' });
    plot(ctx, ax, () => 1, alpha(cIn, 0.3), { w: 4 }); plot(ctx, ax, back, alpha(cBack, 0.3), { w: 4 });
    if (t > 0.01) { plot(ctx, ax, () => 1, cIn, { w: 5, x: [0, t] }); plot(ctx, ax, back, cBack, { w: 5, x: [0, t] }); }
    dot(ctx, ax.X(t), ax.Y(1), cIn, true, 8); dot(ctx, ax.X(t), ax.Y(back(t)), cBack, true, 8);
    legend(ctx, { l: ax.box.l, r: ax.box.r - 90, t: ax.box.b + 44, b: ax.box.b + 130 }, [{ s: 'into the solution', color: cIn, w: 5 }, { s: 'back to the pure water', color: cBack, w: 5 }], { corner: 'tl', panel: false });
    legend(ctx, { l: XC - 110, r: XC + 110, t: YC - 4, b: YC + 100 }, [{ s: 'water', draw: (c, x, y) => water(c, x, y + 3, -Math.PI / 2) }, { s: 'glucose', draw: (c, x, y) => glucose(c, x - 4, y, 0.5) }], { corner: 'top' });
    const head = pi < 0.05 && pa < 0.05 ? 'With no glucose, water crosses both ways at the same rate and the levels stay equal.'
      : !rest ? (target >= 0 ? 'More water crosses into the solution than back, and its column is still rising.' : 'The piston drives more water out of the solution than crosses in, and its column falls.')
        : pa < 0.05 ? `The two rates meet when the solution’s column stands ${fmt(pi, 1)} atm higher: its osmotic pressure.`
          : target > 0.05 ? `With ${fmt(pa, 1)} atm on the piston, the rates meet with the solution’s column only ${fmt(target, 1)} atm higher.`
            : target < -0.05 ? `${fmt(pa, 1)} atm is more than Π = ${fmt(pi, 1)} atm: reverse osmosis has pushed water out of the solution.`
              : 'The piston balances the osmotic pressure: the rates are equal from the start and the levels stay.';
    topline(ctx, head);
    tex(d.readout, `\\kosm = \\kM R\\kT = ${hue('concentration', fmt(Mv.v, 2) + '\\ \\text{mol/L}')} \\times 0.08206\\ \\text{L atm/mol K} \\times ${hue('temperature', '310\\ \\text{K}')} = ${hue('pressure', fmt(pi, 1) + '\\ \\text{atm}')}`);
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();

/* =====================================================================
   FIGURE 11.27: a red blood cell put into a solution whose osmotic
   pressure the reader sets, cut through its middle so that the solute
   on both sides of its membrane is in view. The dots are solute
   particles, which cannot cross; their number per area is in proportion
   to the osmotic pressure, outside (the slider) and inside (N_IN dots
   in the cell, 7.7 atm at its normal size, as the text gives for cell
   fluid and blood serum). Moving: from the moment the cell is put in,
   water crosses both ways (the book's two H₂O arrows, the wider one the
   faster), and the cell's area a = A/A₀ follows da/dt = κ (Π_cell −
   Π_solution) with Π_cell = 7.7 atm / a, so the inside thins out or
   crowds until the two pressures are equal. The membrane cannot
   stretch: its outline keeps its length, from the biconcave section
   (Evans and Fung's profile) to a circle, which holds 2.17 times the
   area; a cell that would have to pass that bursts (hemolysis, the
   book's (a)), below 7.7/2.17 = 3.5 atm. One that loses water
   crumples (crenation, the book's (c)). The section's area stands in
   for the cell's volume. CELL_RED is the colour of the cell, a physical
   fact.
===================================================================== */
(function () {
  const d = sim('sim-red-cells', 560);
  const CELL_RED = '#c0392b', PI_IN = 7.7, PER = 6, N_IN = 20, W0 = 190, CX = 730, CY = 322;
  const Po = ctl(d.controls, { label: '\\kosm_{\\text{solution}}', cls: 'pressure', min: 0, max: 16, step: 0.1, value: 4.5, unit: 'atm', dec: 1, aria: 'osmotic pressure of the solution around the cell, in atmospheres', specials: [{ at: PI_IN, label: 'isotonic' }], onInput: () => { run = null; cy.reset(); } });
  const cy = cycle(() => PER, 2.2);
  /* the biconcave section: half-thickness at u = x / half-width, in units of the half-width */
  const zEF = (u) => { const x = u * u; return 0.5 * Math.sqrt(Math.max(0, 1 - x)) * (0.207 + 2.003 * x - 1.123 * x * x); };
  const NP = 180;
  /* an outline of half-width W and half-thickness top(u), rippled by rip for a crumpled cell */
  const outline = (top, W, rip) => Array.from({ length: NP }, (_, i) => { const th = (i * TAU) / NP, u = Math.cos(th), r = 1 + rip * Math.sin(13 * th + 0.6 * Math.sin(3 * th)); return [W * u * r, Math.sign(Math.sin(th)) * top(Math.abs(u)) * r]; });
  const per = (q) => q.reduce((a, c, i) => { const n = q[(i + 1) % q.length]; return a + Math.hypot(n[0] - c[0], n[1] - c[1]); }, 0);
  const areaOf = (q) => Math.abs(q.reduce((a, c, i) => { const n = q[(i + 1) % q.length]; return a + c[0] * n[1] - n[0] * c[1]; }, 0)) / 2;
  const L0 = per(outline(zEF, 1, 0)), A0 = areaOf(outline(zEF, 1, 0)), RC = L0 / TAU;
  /* the shape at k: 0 to 1 rounds the section into the circle, 0 to −1 thins and crumples it; always the same length of membrane */
  function shape(k) {
    const top = k >= 0 ? (u) => (1 - k) * zEF(u) + k * RC * Math.sqrt(Math.max(0, 1 - u * u)) : (u) => (1 + 0.3 * k) * zEF(u);
    const W = k >= 0 ? 1 - k + k * RC : 1, rip = k >= 0 ? 0 : -0.2 * k, raw = outline(top, W, rip), sc = L0 / per(raw);
    return { pts: raw.map(([x, y]) => [x * sc * W0, y * sc * W0]), W: W * sc * W0, top: (u) => top(u) * sc * W0, a: (areaOf(raw) * sc * sc) / A0, rip };
  }
  const TAB = Array.from({ length: 201 }, (_, i) => { const k = -1 + i / 100; return [k, shape(k).a]; });
  const A_MAX = TAB[200][1];
  const kOf = (a) => { for (let i = 1; i < TAB.length; i++) if (TAB[i][1] >= a) { const [k0, a0] = TAB[i - 1], [k1, a1] = TAB[i]; return k0 + ((k1 - k0) * (a - a0)) / (a1 - a0 || 1); } return 1; };
  /* the cell's area against time for the solution chosen, every 0.01 s; a burst cell stops at A_MAX at tb */
  let run = null;
  function path() {
    if (run) return run;
    const po = Po.v, aeq = po > 0 ? PI_IN / po : Infinity, bursts = aeq > A_MAX, f = (a) => PI_IN / a - po;
    let kappa = Math.min(aeq, A_MAX) ** 2 / PI_IN;                        /* a time constant of 1 s near rest */
    if (bursts) { let a = 1, t = 0; while (a < A_MAX && t < 60) { a += f(a) * 0.002; t += 0.002; } kappa = t / 2.4; }   /* a burst 2.4 s in */
    const as = [1]; let tb = Infinity;
    for (let i = 1; i <= PER * 100; i++) { let a = as[i - 1]; for (let j = 0; j < 10; j++) a += kappa * f(a) * 0.001; if (a >= A_MAX && bursts) { a = A_MAX; if (tb === Infinity) tb = i / 100; } as.push(a); }
    if (!bursts) as[as.length - 1] = aeq;
    return (run = { as, tb, aeq, bursts });
  }
  const aAt = (t) => { const { as } = path(), j = Math.min(as.length - 1.001, Math.max(0, t * 100)), i = Math.floor(j); return as[i] + (as[i + 1] - as[i]) * (j - i); };
  /* solute: N_IN particles inside, placed by their share of the half-width and of the thickness there; outside, places over the whole field */
  const rnd = rng(20261116);
  const INSIDE = []; for (let tries = 0; INSIDE.length < N_IN && tries < 20000; tries++) { const u = (rnd() * 2 - 1) * 0.9, f = (rnd() * 2 - 1) * 0.66, gap = tries < 6000 ? 0.12 : tries < 12000 ? 0.08 : 0; if (Math.abs(u) > 0.16 && rnd() * 0.36 < zEF(u) && INSIDE.every((q) => Math.hypot(q.u - u, q.f * zEF(q.u) - f * zEF(u)) > gap)) INSIDE.push({ u, f }); }
  const FIELD = { l: 60, r: 1340, t: 96, b: 540 }, DENS = N_IN / (A0 * W0 * W0);
  const N_OUT = (po) => Math.round((po / PI_IN) * DENS * (FIELD.r - FIELD.l) * (FIELD.b - FIELD.t));
  const OUTSIDE = Array.from({ length: N_OUT(16) }, () => ({ x: FIELD.l + 8 + rnd() * (FIELD.r - FIELD.l - 16), y: FIELD.t + 8 + rnd() * (FIELD.b - FIELD.t - 16), p: rnd() * TAU }));
  let hits = [];
  F.hover(d.stage, () => hits);
  function water(ctx, x, y, a) {
    for (const k of [0.91, -0.91]) ball(ctx, x + 9.5 * Math.cos(a + k), y + 9.5 * Math.sin(a + k), 5.2, F.el('H'));
    ball(ctx, x, y, 8, F.el('O'));
  }
  /* a curved path from (x0, y0) to (x1, y1) bowed by b */
  const bez = (x0, y0, x1, y1, b) => (u) => { const mx = (x0 + x1) / 2, my = (y0 + y1) / 2 + b, v = 1 - u; return [v * v * x0 + 2 * v * u * mx + u * u * x1, v * v * y0 + 2 * v * u * my + u * u * y1]; };
  function stroke(ctx, f, w, col, head) {
    ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = w; ctx.lineCap = 'round'; ctx.beginPath(); for (let i = 0; i <= 30; i++) { const q = f((i / 30) * (head ? 0.93 : 1)); i ? ctx.lineTo(...q) : ctx.moveTo(...q); } ctx.stroke(); ctx.restore();
    if (!head) return;
    const [ax, ay] = f(1), [bx, by] = f(0.9), a = Math.atan2(ay - by, ax - bx), hl = 16 + w * 1.6;
    ctx.save(); ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(ax - hl * Math.cos(a - 0.42), ay - hl * Math.sin(a - 0.42)); ctx.lineTo(ax - hl * Math.cos(a + 0.42), ay - hl * Math.sin(a + 0.42)); ctx.closePath(); ctx.fill(); ctx.restore();
  }
  function draw() {
    const { ctx } = begin(d.c);
    hits = [];
    const t = cy.now(), po = Po.v, R = path(), burst = t >= R.tb, a = aAt(Math.min(t, R.tb)), piIn = PI_IN / a, tt = cy.now();
    const rest = !R.bursts && (t >= PER - 0.01 || Math.abs(R.aeq - 1) < 0.004), sh = shape(kOf(a));
    const cell = F.fact(CELL_RED), cp = C('pressure'), cs = F.cat(0), kb = burst ? Math.min(1, (t - R.tb) / 1.2) : 0;
    /* the solution, and its solute */
    ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.045); ctx.beginPath(); ctx.roundRect(FIELD.l, FIELD.t, FIELD.r - FIELD.l, FIELD.b - FIELD.t, 22); ctx.fill(); ctx.restore();
    const inCell = (x, y, pad) => { const dx = Math.abs(x - CX), w = sh.W * (1 + sh.rip) + pad; return dx < w && Math.abs(y - CY) < sh.top(Math.min(1, dx / w)) * (1 + sh.rip) + pad; };
    const nOut = N_OUT(po);
    ctx.save(); ctx.fillStyle = cs;
    for (let i = 0; i < nOut; i++) { const q = OUTSIDE[i], x = q.x + 2.5 * Math.sin(tt * 2.1 + q.p), y = q.y + 2.5 * Math.cos(tt * 1.7 + q.p * 2); if (inCell(x, y, 12)) continue; ctx.beginPath(); ctx.arc(x, y, 5, 0, TAU); ctx.fill(); }
    ctx.restore();
    /* the water crossing: in over the top, out underneath, the wider arrow the faster flow */
    const x0 = CX - sh.W - 215, xe = CX - sh.W - 8, dP = piIn - po;
    if (!burst) {
      const wIn = Math.max(1.5, 6 + 0.5 * dP), wOut = Math.max(1.5, 6 - 0.5 * dP);
      const fIn = bez(x0 + 26, CY - 22, xe, CY - 26, -64), fOut = bez(xe, CY + 26, x0 + 26, CY + 22, 64), lane = F.mixColor(PAL.ink, PAL.panel, 0.45);
      [[fIn, wIn], [fOut, wOut]].forEach(([f, w], k) => {
        stroke(ctx, f, w + 26, PAL.panel, false); stroke(ctx, f, w, lane, true);
        const n = Math.max(1, Math.round(w / 2.4));
        for (let i = 0; i < n; i++) { const u = (tt * 0.3 + i / n + k * 0.13) % 1, [x, y] = f(u * 0.86); ctx.save(); ctx.globalAlpha = Math.min(1, 8 * u, 8 * (1 - u)); water(ctx, x, y, u * 6); ctx.restore(); }
      });
      text(ctx, 'H₂O', x0 + 4, CY, PAL.ink, { size: 23, weight: 600, align: 'right', bg: PAL.panel });
      hits.push({ x: (x0 + xe) / 2, y: CY - 62, r: 40, name: 'water entering the cell' }, { x: (x0 + xe) / 2, y: CY + 62, r: 40, name: 'water leaving the cell' });
    }
    /* the cell in section: its fluid, its solute, its membrane */
    ctx.save(); ctx.translate(CX, CY);
    ctx.beginPath(); sh.pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.closePath();
    ctx.fillStyle = PAL.panel; ctx.globalAlpha = 1 - kb; ctx.fill(); ctx.fillStyle = alpha(cell, 0.2); ctx.fill(); ctx.globalAlpha = 1;
    ctx.fillStyle = cs;
    const GAP = 0.03 * TAU, ke = kb * (2 - kb);                 /* where the membrane tears, and the spill eased */
    INSIDE.forEach((q, i) => {
      const x = q.u * sh.W * 0.94, y = q.f * sh.top(Math.abs(q.u)), jx = 2 * Math.sin(tt * 2.3 + i), jy = 2 * Math.cos(tt * 1.9 + i * 1.7);
      /* a burst cell's solute leaves through the tear and spreads into the solution */
      const ga = GAP + (((i * 7) % N_IN) / N_IN - 0.5) * 1.1, gr = sh.W * (1.2 + 1.0 * (((i * 11) % N_IN) / N_IN)), gx = gr * Math.cos(ga), gy = gr * Math.sin(ga);
      ctx.beginPath(); ctx.arc(x + (gx - x) * ke + jx, y + (gy - y) * ke + jy, 5, 0, TAU); ctx.fill();
    });
    ctx.strokeStyle = cell; ctx.lineWidth = 6; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.beginPath();
    if (burst) { const gap = Math.round(NP * 0.02 * (1 + 2.5 * kb)), i0 = Math.round(NP * 0.03); for (let i = i0 + gap; i <= NP + i0 - gap; i++) { const [x, y] = sh.pts[i % NP]; i === i0 + gap ? ctx.moveTo(x, y) : ctx.lineTo(x, y); } }
    else { sh.pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.closePath(); }
    ctx.stroke(); ctx.restore();
    hits.push({ x: CX, y: CY, r: sh.W * 0.8, name: burst ? 'the burst cell: its membrane has torn and its contents spill out' : 'a red blood cell, cut through its middle' });
    const yb = CY - Math.max(sh.top(0.72), sh.top(0)) * (1 + sh.rip) - 30;
    text(ctx, 'red blood cell, in section', CX, yb, cell, { size: 19, weight: 600, align: 'center', bg: PAL.panel });
    /* the two osmotic pressures, each beside what it belongs to */
    const tag = (parts, x, y) => { const w = parts.reduce((s, q) => s + F.measure(ctx, typeof q === 'string' ? q : q[0], { size: 20, weight: typeof q === 'string' ? 400 : 600 }), 0); ctx.save(); ctx.fillStyle = PAL.panel; ctx.beginPath(); ctx.roundRect(x - 10, y - 17, w + 20, 34, 6); ctx.fill(); ctx.restore(); F.rich(ctx, parts, x, y, { size: 20 }); };
    tag(['the solution, ', [fmt(po, 1) + ' atm', cp]], FIELD.l + 26, FIELD.t + 34);
    if (!burst) { const lx = CX + sh.W + 70, ly = CY - 74; line(ctx, CX + sh.W * 0.62, CY - sh.top(0.62) * 0.5, lx - 14, ly + 12, alpha(PAL.ink, 0.5), 1.5, [5, 6]); tag(['the cell’s fluid, ', [fmt(rest ? po : piIn, 1) + ' atm', cp]], lx, ly); }
    legend(ctx, FIELD, [{ s: 'solute, which cannot cross the membrane', kind: 'dot', color: cs }], { corner: 'br' });
    const kind = Math.abs(po - PI_IN) < 0.05 ? 'isotonic' : po < PI_IN ? 'hypotonic' : 'hypertonic';
    topline(ctx, burst ? 'The rounded cell can stretch no further, water keeps entering, and it bursts (hemolysis).'
      : kind === 'isotonic' ? 'An isotonic solution: water enters and leaves at the same rate, and the cell keeps its shape.'
        : !rest ? (kind === 'hypotonic' ? 'A hypotonic solution: more water enters the cell than leaves, and the cell swells.' : 'A hypertonic solution: more water leaves the cell than enters, and it shrivels (crenation).')
          : `The ${kind === 'hypotonic' ? 'swollen' : 'shriveled'} cell’s fluid now matches the solution: water enters and leaves at the same rate.`);
    const rel = kind === 'isotonic' ? '=' : po < PI_IN ? '<' : '>';
    tex(d.readout, `\\kosm_{\\text{solution}} = ${hue('pressure', fmt(po, 1) + '\\ \\text{atm}')} ${rel} \\kosm_{\\text{blood serum}} = ${hue('pressure', '7.7\\ \\text{atm}')}`);
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();

/* =====================================================================
   FIGURE 11.28: potassium chloride dissolved in water, drawn flat as the
   book draws it: K⁺ ions with the oxygen atoms of their water molecules
   turned toward them, Cl⁻ ions with a hydrogen atom of each water turned
   toward them, and here and there a K⁺ and a Cl⁻ touching as an ion
   pair. Moving: the ions wander at one speed, turning at random and off
   the walls and one another; a free K⁺ and a free Cl⁻ that meet stay
   together for about PAIR_S seconds, moving as one particle, then part.
   Nothing sets how many pairs there are: they are counted from the
   drawing, and i = particles / formula units is the book's definition
   with those counts, an ion pair counting as one particle. Fewer formula
   units in the same water meet less often, so i climbs toward 2. The
   run for each count is fixed (a seeded generator, the seed chosen so
   that the run's average is its long-run average), T_RUN s long after
   a warm-up, so the timeline can be dragged; the graph is i against
   time with its average so far. The numbers are the drawing's own, not
   measured values: Table 11.3 gives measured i only at 0.050 m.
===================================================================== */
(function () {
  const d = sim('sim-ion-pairs', 660);
  const T_RUN = 20, FPS = 30, PAIR_S = 2.2, V = 62, DMIN = 126, RK = 32, RCL = 26, TOUCH = RK + RCL - 1;
  const BOX = { l: 40, r: 900, t: 100, b: 592 };
  const Nv = ctl(d.controls, { label: '\\text{KCl dissolved}', cls: '', min: 1, max: 8, step: 1, value: 4, unit: '', fmt: (v) => v + (v === 1 ? ' formula unit' : ' formula units'), aria: 'formula units of potassium chloride dissolved in the water', onInput: () => cy.reset() });
  const cy = cycle(() => T_RUN, 2.5);
  const runs = {};
  /* for each count, the run of forty whose 20 s average of i lies nearest its long-run average (1.91, 1.86, 1.78, 1.75, 1.72, 1.67, 1.65, 1.64) */
  const PICK = [13, 21, 12, 4, 8, 14, 36, 5];
  /* the whole run for n formula units: positions every 1/FPS s, who is paired with whom, and i */
  function runOf(n) {
    if (runs[n]) return runs[n];
    const rnd = rng(7919 * n + 13 + 101 * PICK[n - 1]), ions = [];
    for (let i = 0; i < 2 * n; i++) {
      let x, y, tries = 0;
      do { x = BOX.l + 70 + rnd() * (BOX.r - BOX.l - 140); y = BOX.t + 70 + rnd() * (BOX.b - BOX.t - 140); tries++; } while (tries < 400 && ions.some((q) => Math.hypot(q.x - x, q.y - y) < DMIN + 6));
      ions.push({ k: i < n, x, y, th: rnd() * TAU, mate: -1, age: 0, life: 0, cool: 0, d: 0, phi: 0, spin: 0 });
    }
    const DT = 1 / 60, frames = [], iAt = [];
    const stepOnce = () => {
      ions.forEach((q, i) => {
        q.cool = Math.max(0, q.cool - DT);
        if (q.mate >= 0 && !q.k) return;                                   /* a paired Cl⁻ is carried by its K⁺ */
        q.th += (rnd() - 0.5) * 2.4 * Math.sqrt(DT) * 3.2;
        const sp = q.mate >= 0 ? V * 0.75 : V;
        q.x += sp * Math.cos(q.th) * DT; q.y += sp * Math.sin(q.th) * DT;
        if (q.mate >= 0) {
          const m = ions[q.mate]; q.age += DT; q.d += (TOUCH - q.d) * Math.min(1, DT / 0.12); q.phi += q.spin * DT;
          m.x = q.x + q.d * Math.cos(q.phi); m.y = q.y + q.d * Math.sin(q.phi);
          if (q.age > q.life) { m.th = q.phi; q.th = q.phi + Math.PI; q.cool = m.cool = 1.6; q.mate = m.mate = -1; }
        }
      });
      /* the walls, then one another */
      ions.forEach((q) => {
        const lead = q.mate >= 0 && !q.k ? ions[q.mate] : q, pad = 74;
        if (q.x < BOX.l + pad) { lead.x += BOX.l + pad - q.x; lead.th = Math.atan2(Math.sin(lead.th), Math.abs(Math.cos(lead.th))); }
        if (q.x > BOX.r - pad) { lead.x -= q.x - (BOX.r - pad); lead.th = Math.atan2(Math.sin(lead.th), -Math.abs(Math.cos(lead.th))); }
        if (q.y < BOX.t + pad) { lead.y += BOX.t + pad - q.y; lead.th = Math.atan2(Math.abs(Math.sin(lead.th)), Math.cos(lead.th)); }
        if (q.y > BOX.b - pad) { lead.y -= q.y - (BOX.b - pad); lead.th = Math.atan2(-Math.abs(Math.sin(lead.th)), Math.cos(lead.th)); }
        if (lead !== q) { q.x = lead.x + lead.d * Math.cos(lead.phi); q.y = lead.y + lead.d * Math.sin(lead.phi); }
      });
      for (let i = 0; i < ions.length; i++) for (let j = i + 1; j < ions.length; j++) {
        const a = ions[i], b = ions[j]; if (a.mate === j) continue;
        const dx = b.x - a.x, dy = b.y - a.y, r = Math.hypot(dx, dy) || 1;
        if (r >= DMIN) continue;
        if (a.k !== b.k && a.mate < 0 && b.mate < 0 && a.cool <= 0 && b.cool <= 0) {
          const kk = a.k ? a : b, cl = a.k ? b : a, ki = a.k ? i : j, ci = a.k ? j : i;
          kk.mate = ci; cl.mate = ki; kk.age = 0; kk.life = PAIR_S * (0.8 + 0.4 * rnd()); kk.d = r; kk.phi = Math.atan2(cl.y - kk.y, cl.x - kk.x); kk.spin = (rnd() - 0.5) * 0.8;
          continue;
        }
        const push = Math.min((DMIN - r) / 2, 150 * DT), nx = dx / r, ny = dy / r;
        for (const [q, sgn] of [[a, -1], [b, 1]]) {
          const lead = q.mate >= 0 && !q.k ? ions[q.mate] : q;
          lead.x += sgn * nx * push; lead.y += sgn * ny * push;
          const vn = Math.cos(lead.th) * sgn * nx + Math.sin(lead.th) * sgn * ny;
          if (vn < 0) { const vx = Math.cos(lead.th) - 2 * vn * sgn * nx, vy = Math.sin(lead.th) - 2 * vn * sgn * ny; lead.th = Math.atan2(vy, vx); }
        }
      }
      ions.forEach((q) => { if (q.mate >= 0 && !q.k) { const m = ions[q.mate]; q.x = m.x + m.d * Math.cos(m.phi); q.y = m.y + m.d * Math.sin(m.phi); } });
    };
    for (let i = 0; i < 60 * 25; i++) stepOnce();                          /* warm-up: the run opens already mixed */
    for (let f = 0; f <= T_RUN * FPS; f++) {
      frames.push(ions.map((q) => [q.x, q.y, q.mate]));
      iAt.push((2 * n - ions.filter((q) => q.k && q.mate >= 0).length) / n);
      for (let k = 0; k < 60 / FPS; k++) stepOnce();
    }
    const mean = []; let sum = 0; iAt.forEach((v, f) => { sum += v; mean.push(sum / (f + 1)); });
    return (runs[n] = { n, frames, iAt, mean, kinds: ions.map((q) => q.k) });
  }
  let hits = [];
  F.hover(d.stage, () => hits);
  function waterAt(ctx, ox, oy, a) {            /* O at (ox, oy), the two H either side of the direction a */
    for (const k of [0.91, -0.91]) ball(ctx, ox + 12.5 * Math.cos(a + k), oy + 12.5 * Math.sin(a + k), 7.2, F.el('H'));
    ball(ctx, ox, oy, 11, F.el('O'));
  }
  /* an ion, its charge marked on it: a plus on K⁺, a minus on Cl⁻ */
  function ion(ctx, x, y, k, r = k ? RK : RCL) {
    ball(ctx, x, y, r, F.el(k ? 'K' : 'Cl'));
    const h = r * 0.34; ctx.save(); ctx.strokeStyle = PAL.panel; ctx.lineWidth = Math.max(2, r * 0.13); ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - h, y); ctx.lineTo(x + h, y); if (k) { ctx.moveTo(x, y - h); ctx.lineTo(x, y + h); } ctx.stroke(); ctx.restore();
  }
  /* the waters round an ion: O toward K⁺, an H toward Cl⁻; none where its partner in an ion pair sits */
  function shell(ctx, x, y, k, turn, mateDir, close) {
    const n = k ? 4 : 3;
    for (let j = 0; j < n; j++) {
      const a = turn + (j * TAU) / n;
      let al = 1;
      if (mateDir !== null) { const da = Math.abs(Math.atan2(Math.sin(a - mateDir), Math.cos(a - mateDir))); al = 1 - close * Math.max(0, Math.min(1, (1.25 - da) / 0.3)); }
      if (al <= 0.02) continue;
      ctx.save(); ctx.globalAlpha = al;
      if (k) waterAt(ctx, x + (RK + 9) * Math.cos(a), y + (RK + 9) * Math.sin(a), a);
      else waterAt(ctx, x + (RCL + 18) * Math.cos(a), y + (RCL + 18) * Math.sin(a), a + Math.PI - 0.91);
      ctx.restore();
    }
  }
  function draw() {
    const { ctx } = begin(d.c);
    hits = [];
    const n = Nv.v, R = runOf(n), t = cy.now(), fj = Math.min(T_RUN * FPS - 0.001, t * FPS), f0 = Math.floor(fj), u = fj - f0, A = R.frames[f0], B = R.frames[f0 + 1];
    const ctm = C('time'), cAvg = F.cat(0), done = t >= T_RUN - 0.01;
    ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.05); ctx.strokeStyle = PAL.rule; ctx.lineWidth = 2; ctx.beginPath(); ctx.roundRect(BOX.l, BOX.t, BOX.r - BOX.l, BOX.b - BOX.t, 18); ctx.fill(); ctx.stroke(); ctx.restore();
    const pos = A.map((q, i) => [q[0] + (B[i][0] - q[0]) * u, q[1] + (B[i][1] - q[1]) * u, q[2]]);
    let pairs = 0;
    pos.forEach(([x, y, mate], i) => {
      const k = R.kinds[i];
      let dir = null, close = 0;
      if (mate >= 0) { const m = pos[mate], dd = Math.hypot(m[0] - x, m[1] - y); dir = Math.atan2(m[1] - y, m[0] - x); close = Math.max(0, Math.min(1, (DMIN - dd) / (DMIN - TOUCH - 8))); if (k) { pairs++; ctx.save(); ctx.strokeStyle = alpha(PAL.ink, 0.55); ctx.lineWidth = 2.5; ctx.setLineDash([7, 7]); ctx.beginPath(); ctx.ellipse((x + m[0]) / 2, (y + m[1]) / 2, dd / 2 + 72, 68, dir, 0, TAU); ctx.stroke(); ctx.restore(); hits.push({ x: (x + m[0]) / 2, y: (y + m[1]) / 2, r: 30, name: 'an ion pair: K⁺ and Cl⁻ touching, one particle' }); } }
      shell(ctx, x, y, k, (k ? 0.3 : 1.1) * i + (k ? 0.25 : -0.3) * t, dir, close);
    });
    pos.forEach(([x, y], i) => { ion(ctx, x, y, R.kinds[i]); hits.push({ x, y, r: 30, name: R.kinds[i] ? 'a potassium ion, K⁺, the oxygen atoms of its water molecules toward it' : 'a chloride ion, Cl⁻, a hydrogen atom of each water molecule toward it' }); });
    legend(ctx, { l: BOX.l, r: BOX.r, t: BOX.b + 6, b: 656 }, [{ s: 'K⁺', draw: (c, x, y) => ion(c, x, y, true, 13) }, { s: 'Cl⁻', draw: (c, x, y) => ion(c, x, y, false, 11) }, { s: 'water', draw: (c, x, y) => { ball(c, x - 7, y + 6, 4.5, F.el('H')); ball(c, x + 7, y + 6, 4.5, F.el('H')); ball(c, x, y, 7, F.el('O')); } },
      { s: 'ion pair, one particle', draw: (c, x, y) => { c.save(); c.strokeStyle = alpha(PAL.ink, 0.55); c.lineWidth = 2; c.setLineDash([4, 4]); c.beginPath(); c.ellipse(x, y, 22, 11, 0, 0, TAU); c.stroke(); c.restore(); ion(c, x - 7, y, true, 8); ion(c, x + 8, y, false, 6.5); } }], { corner: 'top', row: true, panel: false });
    /* i against time, 0 to T_RUN s and 1 (every ion paired) to 2 (every ion free) */
    const ax = axes(ctx, { l: 1030, r: 1350, t: 200, b: 500 }, [0, T_RUN], [1, 2], { nx: 4, ny: 4, xl: 't (s)', xc: ctm, yl: 'i, particles per formula unit' });
    const iOf = (s) => R.iAt[Math.min(R.iAt.length - 1, Math.floor(s * FPS + 1e-6))], mOf = (s) => R.mean[Math.min(R.mean.length - 1, Math.floor(s * FPS + 1e-6))];
    if (t > 0.05) {
      ctx.save(); ctx.strokeStyle = alpha(PAL.ink, 0.55); ctx.lineWidth = 3; ctx.lineJoin = 'round'; ctx.beginPath();
      for (let f = 0; f <= f0; f++) { const x = ax.X(f / FPS), y = ax.Y(R.iAt[f]); if (!f) ctx.moveTo(x, y); else { ctx.lineTo(x, ax.Y(R.iAt[f - 1])); ctx.lineTo(x, y); } }
      ctx.lineTo(ax.X(t), ax.Y(iOf(t))); ctx.stroke(); ctx.restore();
      plot(ctx, ax, mOf, cAvg, { w: 5, x: [0, t] });
    }
    dot(ctx, ax.X(t), ax.Y(iOf(t)), PAL.ink, true, 7); dot(ctx, ax.X(t), ax.Y(mOf(t)), cAvg, true, 8);
    legend(ctx, ax, [{ s: 'now', color: alpha(PAL.ink, 0.55), w: 3 }, { s: 'average so far', color: cAvg, w: 5 }], { corner: 'bl' });
    const parts = 2 * n - pairs, u1 = n === 1 ? 'formula unit' : 'formula units';
    topline(ctx, done && mOf(T_RUN) > 1.999 ? `Over ${T_RUN} s the two ions never met: i = 2.00, as complete dissociation predicts.`
      : done ? `Over ${T_RUN} s, ${n} ${u1} of KCl averaged ${fmt(mOf(T_RUN) * n, 1)} particles: i = ${fmt(mOf(T_RUN), 2)}, where complete dissociation predicts 2.`
      : pairs === 0 ? `Just now every ion is free: ${n} ${u1} of KCl, ${parts} particles.`
        : `Just now ${pairs} ion ${pairs === 1 ? 'pair moves' : 'pairs move'} as one particle each: ${n} ${u1} of KCl, ${parts} particles.`);
    tex(d.readout, `i = \\frac{\\text{particles in solution}}{\\text{formula units dissolved}} = \\frac{${parts}}{${n}} = ${fmt(parts / n, 2)}`, false, { values: false });
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();

};
