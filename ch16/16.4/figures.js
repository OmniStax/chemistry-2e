/* Figures for section 16.4 Free Energy. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['16.4'] = function (root, F) {
const { C, PAL, alpha, register, begin, line, text, dot, topline } = F;
const sim = (id, H) => F.sim(root, id, H);
const still = (d, draw) => register(d.fig, { update: () => {}, draw });
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;
const minus = (s) => String(s).replace('-', '−');
/* a canvas pointer event in logical units */
const local = (c, e) => { const r = c.getBoundingClientRect(); return r.width ? [((e.clientX - r.left) * 1400) / r.width, ((e.clientY - r.top) * 1400) / r.width] : null; };

/* =====================================================================
   FIGURE 16.12 + 16.13: ΔG = ΔH − TΔS against T. One line starts at ΔH
   (the dashed level) and leaves it by −TΔS, the shaded wedge that widens
   with T; the lower half of the frame, ΔG < 0, is tinted as the book's
   "Spontaneous" half is. Beside it the book's table of the four sign
   cases, each cell a sketch of its line: a tap on a cell gives ΔH and ΔS
   that cell's signs, and the cell the line is in is outlined. The point
   on the line is the T slider's and can be dragged. Defaults are water's
   vaporization (Examples 16.7 and 16.11): 44.01 kJ, 118.8 J/K, 298.0 K,
   ΔG = 8.61 kJ, crossing zero at 370.5 K. Axes fixed: T 0 to 1000 K, ΔG
   −150 to 150 kJ; the line is clipped to the frame and the live point
   pinned past it. Still: a relation with no clock.
===================================================================== */
(function () {
  const H = 660, d = sim('sim-temp-spont', H);
  const G = { l: 120, r: 850, t: 132, b: 572 };
  const YR = [-150, 150], WATER = { h: 44.01, s: 118.8 };
  let dH = null, dS = null, T = null;
  const ready = () => dH && dS && T;
  dH = F.ctl(d.controls, {
    label: '\\kdH', cls: 'energy', min: -100, max: 100, step: 0.01, value: WATER.h, unit: 'kJ', dec: 2, aria: 'enthalpy change, in kilojoules',
    specials: [{ at: () => (ready() ? T.v * dS.v / 1000 : null), label: 'ΔG = 0' }],
  });
  dS = F.ctl(d.controls, {
    label: '\\kdS', cls: 'entropy', min: -250, max: 250, step: 0.1, value: WATER.s, unit: 'J/K', dec: 1, aria: 'entropy change, in joules per kelvin',
    specials: [{ at: () => (ready() ? 1000 * dH.v / T.v : null), label: 'ΔG = 0' }],
  });
  T = F.ctl(d.controls, {
    label: '\\kT', cls: 'temperature', min: 1, max: 1000, step: 0.1, value: 298, unit: 'K', dec: 1, aria: 'temperature, in kelvins',
    specials: [{ at: () => (ready() && dH.v * dS.v > 0 ? 1000 * dH.v / dS.v : null), label: 'ΔG = 0' }],
  });
  [dH, dS].forEach((c) => c.refresh());
  const P = F.drag(d, { x: T, y: (t) => +dH.v.toFixed(2) - (t * +dS.v.toFixed(1)) / 1000 });
  const ro = F.readout(d);
  let hits = [];
  F.hover(d.stage, () => hits);

  /* the four cases as the book's table sets them: columns ΔH > 0, ΔH < 0; rows ΔS > 0, ΔS < 0 */
  const CASES = [
    { h: 1, s: 1, a: 0.5, b: -0.35, word: 'spontaneous', when: 'at high ', name: 'ΔG < 0 above ΔH/ΔS, ΔG > 0 below it' },
    { h: -1, s: 1, a: -0.5, b: -0.95, word: 'spontaneous', when: 'at any ', name: 'ΔG < 0 at any temperature' },
    { h: 1, s: -1, a: 0.5, b: 0.95, word: 'nonspontaneous', when: 'at any ', name: 'ΔG > 0 at any temperature' },
    { h: -1, s: -1, a: -0.5, b: 0.35, word: 'spontaneous', when: 'at low ', name: 'ΔG < 0 below ΔH/ΔS, ΔG > 0 above it' },
  ];
  const TB = { l: 1000, w: 180, gap: 10, t: 190, h: 186 };
  const cellXY = (c) => [TB.l + (c.h > 0 ? 0 : 1) * (TB.w + TB.gap), TB.t + (c.s > 0 ? 0 : 1) * (TB.h + TB.gap)];
  const cellAt = (p) => p && CASES.find((c) => { const [x0, y0] = cellXY(c); return p[0] >= x0 && p[0] <= x0 + TB.w && p[1] >= y0 && p[1] <= y0 + TB.h; });
  /* a tap on a cell gives ΔH and ΔS its signs, keeping their sizes (water's where one is zero) */
  d.c.addEventListener('click', (e) => {
    const c = cellAt(local(d.c, e)); if (!c) return;
    dH.drive(c.h * (Math.abs(dH.v) || WATER.h)); dS.drive(c.s * (Math.abs(dS.v) || WATER.s));
  });
  d.c.addEventListener('pointermove', (e) => { if (cellAt(local(d.c, e))) d.c.style.cursor = 'pointer'; });

  function table(ctx, sh, ss) {
    const cE = C('energy'), cS = C('entropy'), cT = C('temperature');
    const cx = (col) => TB.l + col * (TB.w + TB.gap) + TB.w / 2;
    text(ctx, 'ΔH > 0', cx(0), 132, cE, { size: 24, weight: 600, align: 'center' });
    text(ctx, 'ΔH < 0', cx(1), 132, cE, { size: 24, weight: 600, align: 'center' });
    text(ctx, 'endothermic', cx(0), 164, PAL.muted, { size: 20, align: 'center' });
    text(ctx, 'exothermic', cx(1), 164, PAL.muted, { size: 20, align: 'center' });
    text(ctx, 'ΔS > 0', TB.l - 14, TB.t + TB.h / 2, cS, { size: 24, weight: 600, align: 'right' });
    text(ctx, 'ΔS < 0', TB.l - 14, TB.t + TB.h * 1.5 + TB.gap, cS, { size: 24, weight: 600, align: 'right' });
    CASES.forEach((c) => {
      const [x0, y0] = cellXY(c), on = c.h === sh && c.s === ss, ink = on ? PAL.ink : PAL.muted;
      ctx.save();
      ctx.fillStyle = on ? alpha(cE, 0.08) : PAL.panel; ctx.fillRect(x0, y0, TB.w, TB.h);
      ctx.strokeStyle = on ? PAL.ink : PAL.rule; ctx.lineWidth = on ? 3 : 1.5; ctx.strokeRect(x0, y0, TB.w, TB.h);
      /* the sketch: its lower half tinted as the graph's is */
      const pl = x0 + 24, pr = x0 + TB.w - 24, pm = y0 + 62, ph = 42;
      ctx.fillStyle = alpha(PAL.ink, 0.07); ctx.fillRect(pl, pm, pr - pl, 46);
      ctx.restore();
      line(ctx, pl, y0 + 16, pl, pm + 46, alpha(PAL.ink, 0.4), 2);
      line(ctx, pl, pm, pr, pm, alpha(PAL.ink, 0.4), 2, [6, 6]);
      line(ctx, pl, pm - c.a * ph, pr, pm - c.b * ph, on ? cE : PAL.muted, on ? 5 : 3);
      text(ctx, c.word, x0 + TB.w / 2, y0 + 134, ink, { size: 21, align: 'center' });
      F.rich(ctx, [[c.when, ink, 400], ['T', on ? cT : ink]], x0 + TB.w / 2, y0 + 162, { size: 21, align: 'center' });
      hits.push({ x: x0 + TB.w / 2, y: y0 + TB.h / 2, r: 80, name: c.name });
    });
  }

  function draw() {
    const { ctx } = begin(d.c);
    const h = +dH.v.toFixed(2), sJ = +dS.v.toFixed(1), s = sJ / 1000, t = +T.v.toFixed(1);
    const f = (x) => h - x * s, g = f(t), cE = C('energy'), cT = C('temperature');
    const eq = Math.abs(dH.v - T.v * dS.v / 1000) < 1e-6 && Math.abs(sJ) > 1e-9;
    const tc = Math.abs(sJ) > 1e-9 ? h / s : null, crosses = tc !== null && tc > 0 && tc <= 1000;
    hits = [];
    /* the half of the frame where ΔG < 0 */
    ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.06); ctx.fillRect(G.l, (G.t + G.b) / 2, G.r - G.l, (G.b - G.t) / 2); ctx.restore();
    const ax = F.axes(ctx, G, [0, 1000], YR, { nx: 5, ny: 6, xl: 'T (K)', xc: cT, yl: 'ΔG (kJ)', yc: cE });
    const { X, Y } = ax;
    const lines = topline(ctx, eq
      ? `At ${t.toFixed(1)} K, $\\kdG = 0$: the system is at equilibrium.`
      : `At ${t.toFixed(1)} K, $\\kdG ${g < 0 ? '<' : '>'} 0$: the process is ${g < 0 ? 'spontaneous' : 'nonspontaneous'}.`);
    const lab = F.labeller(ctx, H, { headline: lines });
    lab.block(G.l - 70, G.t - 40, G.l + 80, G.t - 8);
    /* each half's name in the corner farther from the line */
    const gap = (lvl, xs) => Math.min(...xs.map((x) => Math.abs(f(x) - lvl)));
    for (const [w, lvl] of [['nonspontaneous, ΔG > 0', 132], ['spontaneous, ΔG < 0', -132]]) {
      const left = gap(lvl, [0, 100, 200, 300]) >= gap(lvl, [700, 800, 900, 1000]), wx = left ? G.l + 16 : G.r - 16, ww = F.measure(ctx, w, { size: 20 }) + 14;
      text(ctx, w, wx, Y(lvl), PAL.ink, { size: 20, align: left ? 'left' : 'right' });
      lab.block(left ? wx - 7 : wx - ww, Y(lvl) - 16, left ? wx + ww : wx + 7, Y(lvl) + 16);
    }

    /* −TΔS, the wedge between the ΔH level and the line; then the level and the line */
    F.shade(ctx, ax, f, h, 0, 1000, cE, { alpha: 0.12 });
    F.plot(ctx, ax, () => h, cE, { w: 3, dash: [10, 10] });
    F.plot(ctx, ax, f, cE, { w: 5 });
    const inside = (v) => v > YR[0] && v < YR[1];
    if (inside(h)) {
      /* on the side away from the wedge, unless that side is too near the frame's edge and the half's name */
      let dir = s > 0 ? -1 : 1;
      if (Y(h) + dir * 100 < G.t || Y(h) + dir * 100 > G.b) dir = -dir;
      lab.add('ΔH', G.r - 50, Y(h), 0, dir, cE, 24, 24);
      hits.push({ x: G.r - 50, y: Y(h), r: 18, name: `ΔH = ${minus(h.toFixed(2))} kJ, the value of ΔG at T = 0` });
    }
    /* the ΔG label where the line is still inside the frame, toward the right, on the side away from the wedge */
    for (let x = 900; x >= 100; x -= 50) {
      const y = f(x);
      if (y > YR[0] + 20 && y < YR[1] - 20) { lab.add('ΔG', X(x), Y(y), 0, s > 0 ? 1 : -1, cE, 24, 28); break; }
    }

    /* the −TΔS term at the reader's temperature, from the ΔH level to ΔG */
    const px = X(t);
    const side = px > 610 ? -1 : 1;
    if (inside(h) && inside(g) && Math.abs(Y(g) - Y(h)) > 30) {
      /* named at mid-height on the right; on the left a quarter of the way from the ΔH level, where the line (which
         passes mid-height at T/2) is farther off */
      const bx = px + side * 26, bl = `−TΔS = ${minus((-t * s).toFixed(1))} kJ`, tall = Math.abs(Y(g) - Y(h));
      const ly = side < 0 && tall > 90 ? Y(h) + (Y(g) - Y(h)) / 4 : (Y(h) + Y(g)) / 2, w = F.measure(ctx, bl, { size: 22, weight: 600 }) + 20;
      F.vbracket(ctx, bx, Y(h), Y(g), cE);
      text(ctx, bl, bx + side * 16, ly, cE, { size: 22, weight: 600, align: side > 0 ? 'left' : 'right', bg: PAL.panel });
      if (side < 0) lab.block(bx - 16 - w, ly - 16, bx + 10, ly + 16); else lab.block(bx - 10, ly - 16, bx + 16 + w, ly + 16);
      hits.push({ x: bx, y: ly, r: 22, name: `−TΔS = −(${t.toFixed(1)} K)(${minus(s.toFixed(4))} kJ/K) = ${minus((-t * s).toFixed(2))} kJ` });
    }
    if (crosses) {
      /* named across the zero line from the ΔH level, where the wedge and its bracket are not */
      dot(ctx, X(tc), Y(0), PAL.ink, false, 9);
      lab.add(`${tc.toFixed(1)} K`, X(tc), Y(0), 0, h > 0 ? 1 : -1, cT, 22, 38);
      hits.push({ x: X(tc), y: Y(0), r: 16, name: `ΔG = 0 at T = ΔH/ΔS = ${tc.toFixed(1)} K` });
    }

    const p = P.draw(ctx, ax, cE);
    if (p && !p.out) line(ctx, p.x, p.y + 11, p.x, G.b, alpha(cT, 0.7), 2, [4, 8]);
    if (p && p.out) lab.add(`${minus(g.toFixed(1))} kJ`, p.x, p.y, 0, g > 0 ? 1 : -1, cE, 20, 30);
    if (p) hits.push({ x: p.x, y: p.y, r: 18, name: `ΔG = ${minus(g.toFixed(2))} kJ at ${t.toFixed(1)} K` });
    lab.flush();

    table(ctx, Math.sign(h), Math.sign(sJ));

    const H_ = hue('energy', h.toFixed(2)), S_ = hue('entropy', s.toFixed(4)), T_ = hue('temperature', t.toFixed(1));
    let tex, note;
    if (eq) {
      tex = `\\mk{T}{\\kT} = \\frac{\\mk{H}{\\kdH}}{\\mk{S}{\\kdS}} = \\frac{\\mk{h}{${H_}}\\ \\text{kJ}}{\\mk{s}{${S_}}\\ \\text{kJ/K}} = \\mk{t}{${hue('temperature', tc.toFixed(1))}}\\ \\text{K}`;
      note = h > 0 ? 'Above this temperature the process is spontaneous, and below it nonspontaneous.' : 'Below this temperature the process is spontaneous, and above it nonspontaneous.';
    } else {
      tex = `\\mk{G}{\\kdG} = \\mk{H}{\\kdH} - \\mk{T}{\\kT}\\mk{S}{\\kdS} = \\mk{h}{${H_}}\\ \\text{kJ} - (\\mk{t}{${T_}}\\ \\text{K})(\\mk{s}{${S_}}\\ \\text{kJ/K}) = \\mk{g}{${hue('energy', g.toFixed(2))}}\\ \\text{kJ}`;
      if (sJ === 0) note = 'With $\\kdS = 0$, $\\kdG = \\kdH$ at every temperature.';
      else if (h === 0) note = `With $\\kdH = 0$, $\\kdG$ is ${sJ > 0 ? 'negative' : 'positive'} at every temperature.`;
      else if (h * sJ > 0) note = `$\\kdG = 0$ at ${tc.toFixed(1)} K; ${h > 0 ? 'above' : 'below'} it the process is spontaneous.`;
      else note = `$\\kdH$ and $\\kdS$ have opposite signs, so $\\kdG$ is ${h > 0 ? 'positive' : 'negative'} at every temperature.`;
    }
    ro.set(tex, note, { form: eq });
  }
  still(d, draw);
})();

/* =====================================================================
   FIGURE 16.14: G against reaction progress for one mole of A turning
   into B at 298.15 K: G(x) = (x − ½)ΔG° + RT[x ln x + (1−x) ln(1−x)],
   measured from midway between the two standard values so that the
   curve stays in the middle of the frame whatever ΔG° is. Its slope at a mixture is ΔG = ΔG° + RT ln Q with
   Q = x/(1 − x), drawn as the tangent there with its head downhill, the
   way the reaction runs; the slope is zero at the minimum, where Q = K =
   e^(−ΔG°/RT). ΔG°, the bracket between the two end levels, runs from
   −2.5 to 2.5 kJ/mol, which puts the minimum between 27 % and 73 %
   product. The frame is fixed at −2.9 to 1.7 kJ, which holds every curve
   the slider reaches (ends at ±1.25, lowest −2.02) above the Q and K
   labels. No tick numbers on G, as the book prints none. RT is
   2.479 kJ/mol. The mixture's point can be dragged along the curve.
   Still: a relation with no clock.
===================================================================== */
(function () {
  const H = 690, d = sim('sim-gibbs', H);
  const G = { l: 150, r: 1080, t: 124, b: 590 };
  const YR = [-2.9, 1.7], RT = 8.314e-3 * 298.15, BX = 1112;
  const xlnx = (x) => (x > 0 ? x * Math.log(x) : 0);
  const Gof = (g0) => (x) => (x - 0.5) * g0 + RT * (xlnx(x) + xlnx(1 - x));
  const Kof = (g0) => Math.exp(-g0 / RT);
  const xeq = (g0) => { const k = Kof(g0); return k / (1 + k); };
  const sig3 = (v) => (v >= 100 ? v.toFixed(1) : v.toPrecision(3));
  const g0c = F.ctl(d.controls, {
    label: '\\kdGo', cls: 'energy', min: -2.5, max: 2.5, step: 0.01, value: -2, unit: 'kJ/mol', dec: 2, detents: [-2, 2],
    aria: 'standard free energy change, in kilojoules per mole', specials: [{ at: 0, label: 'K = 1' }],
  });
  const xc = F.ctl(d.controls, {
    label: '\\text{reaction progress}', cls: '', key: 'progress', min: 0.01, max: 0.99, step: 0.01, value: 0.3, fmt: (v) => `${Math.round(v * 100)} % product`,
    aria: 'reaction progress, the fraction of the reactant turned into product', specials: [{ at: () => xeq(+g0c.v.toFixed(2)), label: 'Q = K' }],
  });
  const P = F.drag(d, { x: xc, y: (x) => Gof(+g0c.v.toFixed(2))(x) });
  const ro = F.readout(d);
  let hits = [];
  F.hover(d.stage, () => hits);

  function draw() {
    const { ctx } = begin(d.c);
    const g0 = +g0c.v.toFixed(2), x = xc.v, f = Gof(g0), xe = xeq(g0), at = Math.abs(x - xe) < 1e-6;
    const cE = C('energy'), cK = C('equilibrium-constant');
    hits = [];
    /* the frame is drawn on G − YR[0], so that no axis line is ruled at the arbitrary zero of G */
    const ax0 = F.axes(ctx, G, [0, 1], [0, YR[1] - YR[0]], {
      nx: 4, ny: 0, xl: 'reaction progress', yl: 'Gibbs free energy (G)', yc: cE,
      fx: (v) => (v === 0 ? 'Reactants' : v === 1 ? 'Products' : `${Math.round(v * 100)} % product`),
    });
    const ax = { ...ax0, Y: (v) => ax0.Y(v - YR[0]), yr: YR }, { X, Y } = ax;
    const q = x / (1 - x), qs = sig3(q), k = Kof(g0), ks = sig3(k);
    const dg = at ? 0 : g0 + RT * Math.log(+qs);
    const head = at
      ? '$\\kQrxn = \\kK$: $\\kdG = 0$, the free energy is at its minimum, and the system is at equilibrium.'
      : `$\\kQrxn ${q < k ? '<' : '>'} \\kK$: $\\kdG ${q < k ? '<' : '>'} 0$, and the reaction proceeds ${q < k ? 'forward' : 'in reverse'}, down to the minimum.`;
    const lab = F.labeller(ctx, H, { headline: topline(ctx, head) });
    lab.block(G.l - 70, G.t - 40, G.l + 330, G.t - 8);

    /* the two standard free energies, each named over its own end, and the bracket between them beside the frame */
    const lev = alpha(PAL.ink, 0.45);
    const yr = Y(-g0 / 2), yp = Y(g0 / 2);
    line(ctx, G.l, yr, BX + 10, yr, lev, 2, [10, 10]);
    line(ctx, G.l, yp, BX + 10, yp, lev, 2, [10, 10]);
    const wr = F.measure(ctx, 'G°(reactants)', { size: 22 }), wp = F.measure(ctx, 'G°(products)', { size: 22 });
    text(ctx, 'G°(reactants)', G.l + 16, yr - 22, PAL.ink, { size: 22 });
    lab.block(G.l + 8, yr - 38, G.l + 24 + wr, yr - 6);
    text(ctx, 'G°(products)', G.r - 16, yp - 22, PAL.ink, { size: 22, align: 'right' });
    lab.block(G.r - 24 - wp, yp - 38, G.r - 8, yp - 6);
    F.vbracket(ctx, BX, yr, yp, cE, `ΔG° = ${minus(g0.toFixed(2))} kJ/mol`, 1, { H });
    hits.push({ x: BX, y: (yr + yp) / 2, r: 24, name: `ΔG° = G°(products) − G°(reactants) = ${minus(g0.toFixed(2))} kJ/mol` });

    F.curve(ctx, f, 0, 1, X, Y, cE, 5, 240);

    /* the minimum, where Q = K */
    const mx = X(xe), my = Y(f(xe));
    line(ctx, mx, my + 8, mx, G.b, alpha(PAL.ink, 0.45), 2, [4, 8]);
    dot(ctx, mx, my, cE, false, 8);
    /* K is named on the bottom row and Q on the row above, each on the outer side of its drop line where there is room */
    const room = (px, w) => (px - G.l < w ? 1 : G.r - px < w ? -1 : 0);
    const px = X(x), py = Y(f(x)), qSide = room(px, 290) || (x < xe ? -1 : 1), kSide = room(mx, 190) || (x < xe ? 1 : -1);
    lab.add(at ? `Q = K = ${ks}` : `K = ${ks}`, mx, G.b - 26, kSide, 0, cK, 22, 16);
    hits.push({ x: mx, y: my, r: 16, name: `the minimum of G, where Q = K = ${ks}: ${Math.round(xe * 100)} % product at equilibrium` });

    /* the reader's mixture: its tangent, whose slope is ΔG, the head on the downhill end */
    const m = at ? 0 : g0 + RT * Math.log(q);
    const vx = G.r - G.l, vy = (-m * (G.b - G.t)) / (YR[1] - YR[0]), L = Math.hypot(vx, vy), ux = vx / L, uy = vy / L;
    /* how far along ±u the tangent may run inside the frame */
    const reach = (sg, want) => Math.max(0, Math.min(want, ((sg > 0 ? G.r - 8 - px : px - G.l - 8)) / Math.abs(ux), uy * sg > 0 ? (G.b - 8 - py) / Math.abs(uy) : uy * sg < 0 ? (py - G.t - 8) / Math.abs(uy) : want));
    if (at) {
      const a = reach(-1, 110), b = reach(1, 110);
      line(ctx, px - a, py, px + b, py, cE, 3);
    } else {
      const down = m < 0 ? 1 : -1, toMin = Math.abs(mx - px) / Math.abs(ux);
      const a = reach(-down, 80), b = reach(down, Math.max(46, Math.min(150, toMin)));
      F.arrow(ctx, px - down * a * ux, py - down * a * uy, px + down * b * ux, py + down * b * uy, cE, 3);
      line(ctx, px, py + 12, px, G.b, alpha(PAL.ink, 0.45), 2, [4, 8]);
      lab.add(`Q = ${x.toFixed(2)}/${(1 - x).toFixed(2)} = ${qs}`, px, G.b - 62, qSide, 0, cK, 22, 16);
    }
    P.draw(ctx, ax, cE);
    /* the slope named inside the bowl, on the side the reaction runs to */
    if (at) lab.add('slope = ΔG = 0', px, py, 0, -1, cE, 22, 40);
    else if (py < G.t + 110) lab.add(`slope = ΔG = ${minus(dg.toFixed(2))} kJ/mol`, px, py + 24, m < 0 ? 1 : -1, 0, cE, 22, 64);
    else lab.add(`slope = ΔG = ${minus(dg.toFixed(2))} kJ/mol`, px, py, m < 0 ? 0.7 : -0.7, -0.7, cE, 22, Math.abs(px - mx) < 220 ? 62 : 46);
    hits.push({ x: px, y: py, r: 18, name: at ? `the mixture at equilibrium: ${Math.round(x * 100)} % product` : `the mixture: ${Math.round(x * 100)} % product, Q = ${qs}; the tangent's slope is ΔG, and its head points the way the reaction runs` });
    lab.flush();

    const g0s = hue('energy', g0.toFixed(2)), RTs = RT.toFixed(3);
    let tex;
    if (at) {
      const e = (-g0 / RT).toFixed(3), kk = sig3(Math.exp(+e)), G0 = `${g0s}\\ \\text{kJ/mol}`, G0p = g0 < 0 ? `(${G0})` : G0;
      tex = `\\mk{Q}{\\kQrxn} = \\mk{K}{\\kK} = e^{-\\mk{G0}{\\kdGo}/\\mk{RT}{R\\kT}} = e^{-\\mk{g0}{${G0p}}/(\\mk{rt}{${RTs}\\ \\text{kJ/mol}})} = e^{\\mk{e}{${e}}} = \\mk{k}{${hue('equilibrium-constant', kk)}}`;
    } else {
      tex = `\\mk{G}{\\kdG} = \\mk{G0}{\\kdGo} + \\mk{RT}{R\\kT}\\ln\\mk{Q}{\\kQrxn} = (\\mk{g0}{${g0s}} + \\mk{rt}{${RTs}}\\ln\\mk{q}{${hue('equilibrium-constant', qs)}})\\ \\text{kJ/mol} = \\mk{g}{${hue('energy', dg.toFixed(2))}}\\ \\text{kJ/mol}`;
    }
    const abundant = g0 === 0 ? '$\\kK = 1$: reactants and products are comparably abundant at equilibrium.'
      : g0 < 0 ? '$\\kK > 1$: products are more abundant at equilibrium.' : '$\\kK < 1$: reactants are more abundant at equilibrium.';
    ro.set(tex, `At 298.15 K, $R\\kT$ = ${RTs} kJ/mol. ${abundant}`, { form: at });
  }
  still(d, draw);
})();
};
