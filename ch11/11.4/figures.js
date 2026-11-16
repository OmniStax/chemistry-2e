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
  const d = sim('sim-vapor-lowering', 600);
  const P_STAR = 23.7;
  const X = ctl(d.controls, { label: 'X_{\\text{solvent}}', cls: '', min: 0.5, max: 1, step: 0.1, value: 0.8, unit: '', dec: 3, aria: 'mole fraction of water in the solution' });
  const FXS = [232, 692], YB = 548, YN = 236, YT = 128, YS = 426, HB = 212, HN = 56, NS = 10;
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
    const x = X.v, cP = C('pressure'), ps = x * P_STAR, tt = cy.now();
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
      F.rich(ctx, ['vapor pressure ', [fmt(f.k ? ps : P_STAR, 1) + ' torr', cP]], cx + HN + 26, YT + 52, { size: 19 });
    });
    legend(ctx, { l: FXS[0] + 150, r: FXS[1] - 150, t: 270, b: 400 }, [{ s: 'water', draw: (c, a, b) => water(c, a + 22, b + 9, -Math.PI / 2) }, { s: 'urea', draw: (c, a, b) => ureaMol(c, a + 22, b + 8) }], { corner: 'top' });
    /* Raoult's law as its line: the vapor pressure against the mole fraction of water, 0 to 1 and 0 to 25 torr */
    const ax = axes(ctx, { l: 1040, r: 1310, t: 150, b: 470 }, [0, 1], [0, 25], { nx: 2, ny: 5, xl: 'X_{solvent}', yl: 'vapor pressure (torr)', yc: cP });
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
   FIGURE 11.23: phase diagrams of a pure solvent (solid curves) and of a
   solution of a nonvolatile solute (dashed), drawn as the book draws
   them: a sketch with linear pressure up to 1 atm and no temperature
   scale, the four points that matter marked on the axis with their
   values for water. Still: the diagram answers its slider and choice.
   The shifts are drawn to one scale, S units per °C, for both ΔT_f =
   iK_f m and ΔT_b = iK_b m, so their ratio K_f/K_b = 3.6 is honest; the
   distance from 0 °C to 100 °C is not to that scale (the book's is not
   either). The liquid–vapor curve is P(x) = e^{k(x − B0)} in drawn
   units; the solid–gas curve does not move; the solution's triple point
   lies on it ΔT_f to the left of water's (the solid–liquid line is all
   but upright), and the solution's liquid–vapor curve is the
   exponential from there to its boiling point, below water's
   everywhere, as Raoult's law has it. Canvas: pressure 0 at
   PB, 1 atm at PT; water freezes at F0 and boils at B0.
===================================================================== */
(function () {
  const d = sim('sim-phase-diagram', 600);
  const I = { sucrose: 1, NaCl: 2, CaCl2: 3 }, NAME = { sucrose: 'sucrose', NaCl: 'NaCl', CaCl2: 'CaCl₂' };
  const mS = ctl(d.controls, { label: '\\kmolal', cls: 'concentration', min: 0, max: 2, step: 0.05, value: 1, unit: 'm', dec: 2, detents: [1], aria: 'molality of the solute, in moles per kilogram of water' });
  const sol = F.choice(d.controls, { label: '\\text{solute}', options: [{ value: 'sucrose', label: 'sucrose' }, { value: 'NaCl', label: 'NaCl' }, { value: 'CaCl2', label: 'CaCl₂' }], value: 'NaCl', aria: 'the solute dissolved in the water' });
  const KB = 0.512, KF = 1.86, S = 24;
  const BOX = { l: 150, r: 1250, t: 110, b: 500 }, PB = 500, PT = 150, F0 = 520, B0 = 950, X3 = 495, P3 = 0.35, PS0 = 0.07;
  const Y = (p) => PB - p * (PB - PT);
  const k = Math.log(1 / P3) / (B0 - X3), ks = Math.log(P3 / PS0) / (X3 - BOX.l);
  const sub = (x) => P3 * Math.exp(ks * (x - X3));
  /* the liquid–vapor curve from the triple point shifted df left to the boiling point shifted db right (0, 0 for water) */
  const vap = (x, db, df = 0) => { const x3 = X3 - df, p3 = sub(x3), kk = Math.log(1 / p3) / (B0 + db - x3); return Math.exp(kk * (x - B0 - db)); };
  const triple = (df) => [X3 - df, sub(X3 - df)];
  const melt = (p, x3, p3, xtop) => x3 + (xtop - x3) * (p - p3) / (1 - p3);
  const hits = []; F.hover(d.stage, () => hits);
  function poly(ctx, f, x0, x1, color, dash) {
    ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = 4; if (dash) ctx.setLineDash(dash); ctx.beginPath();
    for (let i = 0; i <= 80; i++) { const x = x0 + ((x1 - x0) * i) / 80, y = Y(Math.min(f(x), 1)); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }
    ctx.stroke(); ctx.restore();
  }
  function draw() {
    const { ctx } = begin(d.c);
    hits.length = 0;
    const m = mS.v, ip = I[sol.value], iv = sol.mix((s) => I[s]), ct = C('temperature'), cp = C('pressure');
    const dTf = ip * KF * m, dTb = ip * KB * m, df = iv * KF * m * S, db = iv * KB * m * S;
    const cSub = F.ref('sub-curve'), cVap = F.ref('vap-curve'), cMelt = F.ref('melt-curve'), guide = alpha(PAL.ink, 0.4), DASH = [12, 9];
    const xb1 = B0 + db, xf1 = F0 - df, [x3s, p3s] = triple(df), vs = (x) => vap(x, db, df);
    /* the frame: pressure up to 1 atm, temperature along the bottom, both unscaled as in the book */
    line(ctx, BOX.l, BOX.t - 10, BOX.l, PB, PAL.muted, 2); line(ctx, BOX.l, PB, BOX.r, PB, PAL.muted, 2);
    line(ctx, BOX.l, PT, BOX.r, PT, guide, 2);
    text(ctx, '1 atm', BOX.l - 12, PT, cp, { size: 18, weight: 600, align: 'right' });
    text(ctx, 'pressure', BOX.l - 12, (PT + PB) / 2 + 40, cp, { size: 18, weight: 600, align: 'right' });
    text(ctx, 'temperature', BOX.r, PB + 74, ct, { size: 18, weight: 600, align: 'right' });
    /* the band where the solution is still liquid and the solvent is not, lightly tinted */
    if (m > 0) {
      ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.07); ctx.beginPath();
      ctx.moveTo(xf1, PT); for (let i = 0; i <= 30; i++) { const p = 1 - (1 - p3s) * i / 30; ctx.lineTo(melt(p, x3s, p3s, xf1), Y(p)); }
      for (let i = 0; i <= 60; i++) { const x = x3s + (xb1 - x3s) * i / 60; ctx.lineTo(x, Y(vs(x))); }
      for (let i = 60; i >= 0; i--) { const x = X3 + (B0 - X3) * i / 60; ctx.lineTo(x, Y(vap(x, 0))); }
      for (let i = 0; i <= 30; i++) { const p = P3 + (1 - P3) * i / 30; ctx.lineTo(melt(p, X3, P3, F0), Y(p)); }
      ctx.closePath(); ctx.fill(); ctx.restore();
    }
    /* the curves: solid–gas, then water's solid–liquid and liquid–vapor, then the solution's dashed */
    poly(ctx, sub, BOX.l, X3, cSub);
    poly(ctx, (x) => vap(x, 0), X3, B0, cVap);
    line(ctx, X3, Y(P3), F0, PT, cMelt, 4);
    if (m > 0) { poly(ctx, vs, x3s, xb1, cVap, DASH); line(ctx, x3s, Y(p3s), xf1, PT, cMelt, 4, DASH); }
    text(ctx, 'Solid', BOX.l + 14, Y(0.86), PAL.ink, { size: 22, weight: 600, align: 'left' });
    text(ctx, 'Liquid', 720, Y(0.84), PAL.ink, { size: 22, weight: 600, align: 'center' });
    text(ctx, 'Gas', 1120, Y(0.4), PAL.ink, { size: 22, weight: 600, align: 'center' });
    /* the four points, dropped to the axis, each value under it, turned away from its pair */
    const pts = [[F0, '0 °C', 'left', 'freezing point of water'], [B0, '100 °C', 'right', 'boiling point of water']];
    if (m > 0) pts.push([xf1, minus(fmt(-dTf, 2)) + ' °C', 'right', 'freezing point of the solution'], [xb1, fmt(100 + dTb, 2) + ' °C', 'left', 'boiling point of the solution']);
    pts.forEach(([x, s, side, nm], i) => {
      line(ctx, x, PT, x, PB + 8, guide, 2, [4, 8]);
      text(ctx, s, x + (side === 'left' ? 6 : -6), PB + 26 + (i > 1 ? 0 : 0), ct, { size: 18, weight: 600, align: side, bg: PAL.panel });
      hits.push({ x, y: PB + 26, r: 22, name: nm });
    });
    /* the gaps: ΔT_f and ΔT_b over the 1 atm line, ΔP between the liquid–vapor curves */
    if (m > 0) {
      hbracket(ctx, xf1, F0, PT - 22, ct); text(ctx, 'ΔT_{f}', (xf1 + F0) / 2, PT - 52, ct, { size: 20, weight: 600, align: 'center', bg: PAL.panel });
      hbracket(ctx, B0, xb1, PT - 22, ct); text(ctx, 'ΔT_{b}', (B0 + xb1) / 2, PT - 52, ct, { size: 20, weight: 600, align: 'center', bg: PAL.panel });
      const xp = 820, y0 = Y(vap(xp, 0)), y1 = Y(vs(xp));
      vbracket(ctx, xp, y0, y1, cp); text(ctx, 'ΔP', xp - 18, (y0 + y1) / 2, cp, { size: 20, weight: 600, align: 'right', bg: PAL.panel });
    }
    hits.push({ x: 300, y: Y(sub(300)), r: 18, name: 'the solid–gas curve, the same for the solvent and the solution' }, { x: 760, y: Y(vap(760, 0)), r: 18, name: 'the liquid–vapor curve of water' }, { x: (X3 + F0) / 2, y: Y((P3 + 1) / 2), r: 18, name: 'the solid–liquid line of water' });
    if (m > 0) hits.push({ x: 880, y: Y(vs(880)), r: 18, name: 'the liquid–vapor curve of the solution' }, { x: (x3s + xf1) / 2, y: Y((p3s + 1) / 2), r: 18, name: 'the solid–liquid line of the solution' });
    legend(ctx, { l: 1000, r: 1240, t: PT + 10, b: PT + 120 }, [{ s: 'water', color: PAL.ink, w: 4 }, { s: 'solution', color: PAL.ink, w: 4, dash: DASH }], { corner: 'tr' });
    const fz = minus(fmt(-dTf, 2)), bp = fmt(100 + dTb, 2);
    topline(ctx, m === 0 ? 'With no solute, the solution’s curves lie on those of water.' : `A ${fmt(m, 2)} m solution of ${NAME[sol.value]} freezes at ${fz} °C and boils at ${bp} °C.`);
    const mm = hue('concentration', fmt(m, 2) + '\\ m'), deg = (x) => hue('temperature', fmt(x, 2) + '\\ {}^{\\circ}\\text{C}');
    tex(d.readout, `\\kdTf = i\\kKf\\kmolal = ${ip} \\times ${hue('colligative-constant', '1.86\\ {}^{\\circ}\\text{C}/m')} \\times ${mm} = ${deg(dTf)} \\\\ \\kdTb = i\\kKb\\kmolal = ${ip} \\times ${hue('colligative-constant', '0.512\\ {}^{\\circ}\\text{C}/m')} \\times ${mm} = ${deg(dTb)}`);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 11.24 + 11.25: osmosis in a U-tube, and reverse osmosis under
   a piston, drawn flat as the book draws them: pure water in the left
   arm, a glucose solution in the right, a semipermeable membrane across
   the bottom of the U. Moving: from equal levels (the book's (a)) the
   height difference relaxes toward Π − P_applied over a 6 s clock with
   time constant 1.5 s, the left column falling as the right one rises by
   the same amount; at the membrane, water molecules cross both ways,
   more of them toward the side the water is moving to, and glucose never
   crosses. Past Π (Figure 11.25) water is driven out of the solution and
   the pure water's column stands higher. Heights are drawn at S units
   per atm against the true 10.3 m of water per atm, about 1000 times
   shorter, as the figure says. T is fixed at 310 K (37 °C), as in
   Example 11.10. Canvas units: the U's centreline runs down the left arm
   at XL, round a half circle of radius RC about (XC, YC), and up the
   right arm at XR; the tube is 2 TW wide.
===================================================================== */
(function () {
  const d = sim('sim-osmosis', 680);
  const RT = 0.08206, TK = 310, S = 8, TAU_S = 1.5, PER = 6;
  const Mv = ctl(d.controls, { label: '\\kM', cls: 'concentration', min: 0, max: 0.5, step: 0.01, value: 0.3, unit: 'M', dec: 2, aria: 'molarity of the glucose solution', onInput: () => cy.reset() });
  const Pa = ctl(d.controls, { label: 'P_{\\text{applied}}', cls: 'pressure', min: 0, max: 15, step: 0.1, value: 0, unit: 'atm', dec: 1, aria: 'pressure applied to the piston over the solution, in atmospheres', specials: [{ at: () => Mv.v * RT * TK, label: 'Π' }], onInput: () => cy.reset() });
  const cy = cycle(() => PER, 1.5);
  const XC = 700, YC = 330, RC = 210, TW = 58, XL = XC - RC, XR = XC + RC, YTOP = 96, Y0 = 228;
  const LA = YC - YTOP, LB = Math.PI * RC, LEN = 2 * LA + LB;
  const Pi = () => Mv.v * RT * TK;
  /* atm the height difference stands for: an exponential approach, scaled to arrive exactly at the end of the clock */
  const hOf = (t) => (Pi() - Pa.v) * (1 - Math.exp(-t / TAU_S)) / (1 - Math.exp(-PER / TAU_S));
  /* a point of the tube: s along the centreline from the top of the left arm, u across it (positive outward on the bend) */
  function at(s, u) {
    if (s <= LA) return [XL - u, YTOP + s];
    if (s >= LA + LB) return [XR + u, YTOP + LEN - s];
    const a = Math.PI - (s - LA) / RC;                       /* from the left (π) round the bottom to the right (0) */
    return [XC + (RC + u) * Math.cos(a), YC + (RC + u) * Math.sin(a)];
  }
  const fr = (i) => { const v = Math.sin(i * 12.9898 + 78.233) * 43758.5453; return v - Math.floor(v); };
  const SMID = LA + LB / 2;
  /* water at fixed places in two lanes; glucose on the right of the membrane only, its count following M */
  const WATER = []; for (let s = 14, i = 0; s < LEN - 10; s += 30, i++) for (const u of [-28, 0, 28]) WATER.push({ s: s + (u > 0 ? 15 : u < 0 ? 0 : 8), u, i: WATER.length });
  const GLU = Array.from({ length: 10 }, (_, j) => SMID + 60 + j * ((LEN - SMID - 90) / 10) * 1.0);
  let hits = [];
  F.hover(d.stage, () => hits);
  function water(ctx, x, y, a) {
    ball(ctx, x + 8.5 * Math.cos(a + 0.91), y + 8.5 * Math.sin(a + 0.91), 4.5, F.el('H'));
    ball(ctx, x + 8.5 * Math.cos(a - 0.91), y + 8.5 * Math.sin(a - 0.91), 4.5, F.el('H'));
    ball(ctx, x, y, 7, F.el('O'));
  }
  /* glucose as its ring, five C and one O */
  function glucose(ctx, x, y, a) {
    for (let k = 0; k < 6; k++) { const b = a + (k * Math.PI) / 3; ball(ctx, x + 11 * Math.cos(b), y + 11 * Math.sin(b), 6.5, F.el(k === 0 ? 'O' : 'C')); }
  }
  function tubePath(ctx, u) {
    ctx.moveTo(...at(0, u)); for (let s = 4; s <= LEN; s += 4) ctx.lineTo(...at(s, u));
  }
  function draw() {
    const { ctx } = begin(d.c);
    hits = [];
    const t = cy.now(), pi = Pi(), pa = Pa.v, h = hOf(t), target = pi - pa, rising = t < PER - 0.01 && Math.abs(target) > 0.05;
    const yL = Y0 + (h * S) / 2, yR = Y0 - (h * S) / 2, sL = yL - YTOP, sR = LEN - (yR - YTOP);
    const cw = F.ref('water-arm'), cs = F.ref('solution-arm'), cm = F.ref('membrane'), cpis = F.ref('piston'), cp = C('pressure');
    /* the liquid, from the left surface round to the right surface */
    ctx.save(); ctx.beginPath();
    for (let s = sL; s <= sR; s += 4) ctx.lineTo(...at(s, -TW + 2));
    for (let s = sR; s >= sL; s -= 4) ctx.lineTo(...at(s, TW - 2));
    ctx.closePath(); ctx.fillStyle = alpha(PAL.ink, 0.07); ctx.fill(); ctx.restore();
    line(ctx, XL - TW + 2, yL, XL + TW - 2, yL, alpha(PAL.ink, 0.4), 2); line(ctx, XR - TW + 2, yR, XR + TW - 2, yR, alpha(PAL.ink, 0.4), 2);
    /* the molecules in the liquid; none on the membrane, where the crossing ones are drawn */
    const nG = Math.round(Mv.v * 20), tt = cy.now();
    const gl = GLU.slice(0, nG).map((s, j) => ({ s, u: (j % 2 ? 18 : -18), j }));
    for (const g of gl) {
      if (g.s > sR - 16) continue;
      const [x, y] = at(g.s, g.u); glucose(ctx, x, y, g.j + tt * 0.4);
      hits.push({ x, y, r: 16, name: 'a glucose molecule, C₆H₁₂O₆, too large to cross the membrane' });
    }
    for (const w of WATER) {
      if (w.s < sL + 10 || w.s > sR - 10) continue;
      const [x0, y0] = at(w.s, w.u);
      if (Math.abs(x0 - XC) < 26 && y0 > YC) continue;
      if (gl.some((g) => { const [gx, gy] = at(g.s, g.u); return Math.hypot(gx - x0, gy - y0) < 26; })) continue;
      const x = x0 + 2 * Math.sin(tt * 3 + w.i), y = y0 + 2 * Math.cos(tt * 2.6 + w.i * 1.3);
      water(ctx, x, y, w.i * 2.1 + tt * 0.5);
      hits.push({ x, y, r: 12, name: 'a water molecule' });
    }
    /* water crossing the membrane both ways, more toward the side the water is moving to */
    const flow = target - h, nRight = Math.abs(flow) < 0.05 ? 2 : flow > 0 ? 3 : 1;
    [-33, -11, 11, 33].forEach((dy, i) => {
      const dir = i < nRight ? 1 : -1, p = (tt * 0.45 + i * 0.27) % 1, x = XC + dir * (-58 + 116 * p), y = YC + RC + dy;
      ctx.save(); ctx.globalAlpha = Math.min(1, 6 * p, 6 * (1 - p)); water(ctx, x, y, dir > 0 ? 0 : Math.PI); ctx.restore();
    });
    /* the glass: each arm in its referent colour, the membrane across the bottom */
    ctx.save(); ctx.lineWidth = 4; ctx.lineJoin = 'round';
    for (const [col, side] of [[cw, -1], [cs, 1]]) {
      ctx.strokeStyle = col;
      for (const u of [-TW, TW]) { ctx.beginPath(); for (let s = side < 0 ? 0 : SMID, i = 0; side < 0 ? s <= SMID : s <= LEN; s += 4, i++) { const p = at(s, u); i ? ctx.lineTo(...p) : ctx.moveTo(...p); } ctx.stroke(); }
    }
    ctx.restore();
    ctx.save(); ctx.fillStyle = alpha(cm, 0.55); ctx.strokeStyle = cm; ctx.lineWidth = 2; ctx.fillRect(XC - 5, YC + RC - TW, 10, 2 * TW); ctx.strokeRect(XC - 5, YC + RC - TW, 10, 2 * TW); ctx.restore();
    hits.push({ x: XC, y: YC + RC, r: 20, name: 'the semipermeable membrane, which only water crosses' });
    label(ctx, 'semipermeable membrane', XC, YC + RC + TW, { side: 'below', size: 18, gap: 26, color: cm });
    text(ctx, 'pure water', XL, YC + RC + 40, cw, { size: 20, weight: 600, align: 'right' });
    text(ctx, 'solution', XR, YC + RC + 40, cs, { size: 20, weight: 600, align: 'left' });
    /* the piston on the solution, and the pressure on it */
    if (pa > 0.05) {
      ctx.save(); ctx.fillStyle = alpha(cpis, 0.35); ctx.strokeStyle = cpis; ctx.lineWidth = 3; ctx.fillRect(XR - TW + 3, yR - 20, 2 * TW - 6, 20); ctx.strokeRect(XR - TW + 3, yR - 20, 2 * TW - 6, 20); ctx.restore();
      line(ctx, XR, yR - 20, XR, YTOP - 20, cpis, 5);
      F.arrow(ctx, XR + TW + 26, yR - 90, XR + TW + 26, yR - 26, cp, 4);
      F.rich(ctx, ['P_{applied} = ', [fmt(pa, 1) + ' atm', cp]], XR + TW + 40, yR - 70, { size: 18 });
      hits.push({ x: XR, y: yR - 10, r: 30, name: 'the piston pressing on the solution' });
    }
    /* the height difference, and the pressure it stands for */
    if (Math.abs(h) * S > 6) {
      const xb = XR + TW + 120;
      line(ctx, XL + TW + 4, yL, xb + 10, yL, alpha(PAL.ink, 0.45), 2, [10, 8]);
      line(ctx, XR + TW + 4, yR, xb + 10, yR, alpha(PAL.ink, 0.45), 2, [10, 8]);
      F.vbracket(ctx, xb, Math.min(yL, yR), Math.max(yL, yR), cp, fmt(Math.abs(h), 1) + ' atm', 1, { size: 20 });
    }
    text(ctx, 'heights drawn about 1000 times shorter than true', 30, 660, PAL.muted, { size: 16 });
    const head = rising
      ? (target >= 0 ? `Water crosses into the solution; its column stands ${fmt(h, 1)} atm higher and is still rising.` : `The piston drives water out of the solution, which now stands ${fmt(-h, 1)} atm lower.`)
      : pa < 0.05 ? `The flow stops when the solution’s column stands ${fmt(pi, 1)} atm higher: its osmotic pressure.`
        : target > 0 ? `With ${fmt(pa, 1)} atm on the piston, the solution’s column stops ${fmt(target, 1)} atm higher.`
          : target < 0 ? `${fmt(pa, 1)} atm is more than Π = ${fmt(pi, 1)} atm: reverse osmosis leaves the solution ${fmt(-target, 1)} atm lower.`
            : 'The piston balances the osmotic pressure exactly: no net flow.';
    topline(ctx, head);
    tex(d.readout, `\\kosm = \\kM R\\kT = ${hue('concentration', fmt(Mv.v, 2) + '\\ \\text{mol/L}')} \\times 0.08206\\ \\text{L atm/mol K} \\times ${hue('temperature', '310\\ \\text{K}')} = ${hue('pressure', fmt(pi, 1) + '\\ \\text{atm}')}`);
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();

/* =====================================================================
   FIGURE 11.27: a red blood cell put into a solution whose osmotic
   pressure the reader sets; the fluid inside starts at that of blood
   serum, 7.7 atm. Moving: from the moment the cell is put in, water
   crosses its membrane both ways, inward at a rate in proportion to the
   osmotic pressure inside and outward in proportion to the one outside
   (the book's two H₂O arrows, a water molecule drawn travelling each);
   the cell's volume relaxes over a 5 s clock to V/V₀ = 0.4 + 0.6 ×
   7.7/Π_solution (a share of a cell's volume takes no part in osmosis),
   and the inside's osmotic pressure follows, 7.7 × 0.6/(V/V₀ − 0.4),
   until the two rates are equal. A cell that swells past V/V₀ = 1.6
   bursts (the book's (a)); one that shrinks crumples (its (c)). Seen
   face on, a normal cell shows its central dimple; a swollen one loses
   it on its way to a sphere. CELL_RED is the colour of the cell, a
   physical fact.
===================================================================== */
(function () {
  const d = sim('sim-red-cells', 480);
  const CELL_RED = '#c0392b', PI_IN = 7.7, PER = 5, TAU_S = 1.2, BURST = 1.6;
  const Po = ctl(d.controls, { label: '\\kosm_{\\text{solution}}', cls: 'pressure', min: 0, max: 16, step: 0.1, value: 4.0, unit: 'atm', dec: 1, aria: 'osmotic pressure of the solution around the cell, in atmospheres', specials: [{ at: PI_IN, label: 'isotonic' }], onInput: () => cy.reset() });
  const cy = cycle(() => PER, 2);
  const vEq = () => 0.4 + 0.6 * PI_IN / Math.max(Po.v, 0.3);
  /* the volume at t: an exponential approach from 1, arriving at the end of the clock, stopped where the cell bursts */
  const vAt = (t) => { const v = 1 + (vEq() - 1) * (1 - Math.exp(-t / TAU_S)) / (1 - Math.exp(-PER / TAU_S)); return Math.min(v, BURST); };
  const burstAt = () => { if (vEq() <= BURST) return Infinity; for (let t = 0; t <= PER; t += 0.01) if (vAt(t) >= BURST) return t; return PER; };
  const CX = 780, CY = 260, R0 = 112;
  let hits = [];
  F.hover(d.stage, () => hits);
  function water(ctx, x, y, a) {
    ball(ctx, x + 8 * Math.cos(a + 0.91), y + 8 * Math.sin(a + 0.91), 4.3, F.el('H'));
    ball(ctx, x + 8 * Math.cos(a - 0.91), y + 8 * Math.sin(a - 0.91), 4.3, F.el('H'));
    ball(ctx, x, y, 6.5, F.el('O'));
  }
  /* a curved path from (x0, y0) to (x1, y1) bowed by b */
  const bez = (x0, y0, x1, y1, b) => (u) => { const mx = (x0 + x1) / 2, my = (y0 + y1) / 2 + b, v = 1 - u; return [v * v * x0 + 2 * v * u * mx + u * u * x1, v * v * y0 + 2 * v * u * my + u * u * y1]; };
  function path(ctx, f, w, col) {
    ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = w; ctx.beginPath(); for (let i = 0; i <= 30; i++) { const p = f(i / 30); i ? ctx.lineTo(...p) : ctx.moveTo(...p); } ctx.stroke(); ctx.restore();
    const [ax, ay] = f(1), [bx, by] = f(0.94), a = Math.atan2(ay - by, ax - bx);
    ctx.save(); ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(ax - 18 * Math.cos(a - 0.4), ay - 18 * Math.sin(a - 0.4)); ctx.lineTo(ax - 18 * Math.cos(a + 0.4), ay - 18 * Math.sin(a + 0.4)); ctx.closePath(); ctx.fill(); ctx.restore();
  }
  function draw() {
    const { ctx } = begin(d.c);
    hits = [];
    const t = cy.now(), po = Po.v, tb = burstAt(), burst = t >= tb, v = vAt(Math.min(t, tb)), piIn = PI_IN * 0.6 / (v - 0.4);
    const cell = F.fact(CELL_RED), rim = F.mixColor(cell, PAL.ink, 0.35), cp = C('pressure');
    const R = R0 * Math.cbrt(v), dimple = Math.max(0, Math.min(1, (1.35 - v) / 0.35)), crumple = Math.max(0, Math.min(1, (1 - v) / 0.3));
    /* the water crossing: inward over the top, outward under it, each arrow as thick as its rate and a molecule on it per 2.5 atm */
    const rIn = burst ? 0 : piIn, rOut = burst ? 0 : po, x0 = CX - R - 200, xin = CX - R * 0.9, yin = CY - R * 0.4, yout = CY + R * 0.3;
    const fIn = bez(x0 + 20, CY - 20, xin, yin, -70), fOut = bez(xin, yout, x0 + 20, CY + 30, 70);
    const lane = alpha(PAL.ink, 0.45);
    if (!burst) {
      path(ctx, fIn, 1 + rIn * 0.5, lane); path(ctx, fOut, 1 + rOut * 0.5, lane);
      [[fIn, rIn], [fOut, rOut]].forEach(([f, r], k) => {
        const n = Math.round(r / 2.5);
        for (let i = 0; i < n; i++) { const u = (t * 0.35 + i / n + k * 0.13) % 1, [x, y] = f(u); ctx.save(); ctx.globalAlpha = Math.min(1, 8 * u, 8 * (1 - u)); water(ctx, x, y, u * 6); ctx.restore(); }
      });
      text(ctx, 'H₂O', x0 - 14, CY + 4, PAL.ink, { size: 22, align: 'right' });
      hits.push({ x: (x0 + xin) / 2, y: CY - 70, r: 40, name: 'water entering the cell' }, { x: (x0 + xin) / 2, y: CY + 80, r: 40, name: 'water leaving the cell' });
    }
    /* the cell, face on */
    ctx.save();
    if (burst) {
      /* the burst cell: a torn membrane, its contents spilling out */
      const k = Math.min(1, (t - tb) / 0.8);
      ctx.fillStyle = alpha(cell, 0.25 * (1 - 0.5 * k));
      for (let j = 0; j < 9; j++) { const a = j * TAU / 9 + 0.3, r = R * (1.05 + 0.5 * k * (0.5 + ((j * 7) % 5) / 10)); ctx.beginPath(); ctx.arc(CX + r * Math.cos(a), CY + r * Math.sin(a), 14 + (j % 3) * 6, 0, TAU); ctx.fill(); }
      ctx.strokeStyle = rim; ctx.lineWidth = 4; ctx.fillStyle = alpha(cell, 0.35 * (1 - 0.6 * k));
      ctx.beginPath(); ctx.arc(CX, CY, R, 0.5, TAU - 0.2); ctx.fill(); ctx.stroke();
    } else {
      ctx.beginPath();
      for (let i = 0; i <= 240; i++) { const a = i * TAU / 240, r = R * (1 + 0.1 * crumple * Math.sin(7 * a + 0.5 * Math.sin(3 * a)) - 0.05 * crumple * Math.sin(11 * a)); const x = CX + r * Math.cos(a), y = CY + r * Math.sin(a); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }
      ctx.closePath(); ctx.fillStyle = cell; ctx.fill(); ctx.strokeStyle = rim; ctx.lineWidth = 4; ctx.stroke();
      if (dimple > 0) { const g = ctx.createRadialGradient(CX, CY, 0, CX, CY, R * 0.55); g.addColorStop(0, alpha(F.mixColor(cell, PAL.panel, 0.4), dimple)); g.addColorStop(1, alpha(cell, 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(CX, CY, R * 0.55, 0, TAU); ctx.fill(); }
    }
    ctx.restore();
    hits.push({ x: CX, y: CY, r: R, name: burst ? 'a burst red blood cell' : 'a red blood cell, seen face on' });
    if (!burst) {
      F.rich(ctx, ['inside the cell ', [fmt(piIn, 1) + ' atm', cp]], CX + 200, CY - 14, { size: 19 });
      F.rich(ctx, ['volume ', [fmt(v, 2), PAL.ink], ' × normal'], CX + 200, CY + 18, { size: 19 });
    }
    const kind = Math.abs(po - PI_IN) < 0.05 ? 'isotonic' : po < PI_IN ? 'hypotonic' : 'hypertonic';
    topline(ctx, burst ? 'In this hypotonic solution water keeps flowing in until the cell bursts.'
      : kind === 'isotonic' ? 'In an isotonic solution water enters and leaves at the same rate: the cell keeps its shape.'
        : t < PER - 0.01 ? (kind === 'hypotonic' ? 'In a hypotonic solution more water enters than leaves, and the cell swells.' : 'In a hypertonic solution more water leaves than enters, and the cell shrivels.')
          : (kind === 'hypotonic' ? 'The cell has swollen until water enters and leaves at the same rate.' : 'The cell has shriveled until water enters and leaves at the same rate.'));
    const rel = kind === 'isotonic' ? '=' : po < PI_IN ? '<' : '>';
    tex(d.readout, `\\kosm_{\\text{solution}} = ${hue('pressure', fmt(po, 1) + '\\ \\text{atm}')} ${rel} \\kosm_{\\text{blood}} = ${hue('pressure', '7.7\\ \\text{atm}')}`);
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();

};
