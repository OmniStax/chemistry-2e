/* Figures for section 5.2 Calorimetry. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['5.2'] = function (root, F) {
const { PAL, C, alpha, cycle, register, begin, line, arrow, text, dot, axes, topline, fmt, tex } = F;
const sim = (id, H) => F.sim(root, id, H);

/* =====================================================================
   FIGURE 5.14: a hot metal in cool water, in the coffee cup calorimeter of
   Figure 5.12 drawn in section. Moving: heat leaves the metal for the water
   and both temperatures relax to the final one on one clock, while the two
   heat bars beneath the graph stay equal and opposite. Opens on Example 5.3.
   Lengths are in centimetres and drawn at one scale, so the water's level
   and the metal's size are the ones their volumes give in this cup.
===================================================================== */
(function () {
  const d = sim('sim-calorimeter', 670);
  /* specific heats from Table 5.1 in J/g °C; densities in g/cm³ size the cube and are not shown */
  const METALS = {
    Fe: { name: 'iron', c: 0.449, rho: 7.87 }, Cu: { name: 'copper', c: 0.385, rho: 8.96 }, Pb: { name: 'lead', c: 0.130, rho: 11.3 },
    Au: { name: 'gold', c: 0.129, rho: 19.3 }, Al: { name: 'aluminum', c: 0.897, rho: 2.70 },
  };
  const CW = 4.184, TW0 = 24.0;
  /* ranges: 400 g of aluminum at 300 °C in 250 g of water ends at 94.5 °C, the highest final temperature, so the water never boils */
  const MET = F.select(d.controls, {
    label: '\\text{metal}', aria: 'the metal', value: 'Fe',
    options: Object.keys(METALS).map((k) => ({ value: k, label: METALS[k].name })), onInput: () => cy.reset(),
  });
  const MM = F.ctl(d.controls, { label: '\\km_{\\htmlData{ref=metal}{\\text{metal}}}', cls: 'mass', min: 50, max: 400, step: 1, value: 360, unit: 'g', dec: 1, aria: 'mass of the metal in grams', onInput: () => cy.reset() });
  const TM = F.ctl(d.controls, {
    label: '\\kT_{\\text{i,}\\htmlData{ref=metal}{\\text{metal}}}', cls: 'temperature', min: 0, max: 300, step: 1, value: 248, unit: '°C', dec: 0, aria: 'initial temperature of the metal in degrees Celsius',
    specials: [{ at: TW0, label: 'the water’s temperature' }], onInput: () => cy.reset(),
  });
  const MW = F.ctl(d.controls, { label: '\\km_{\\htmlData{ref=water}{\\text{water}}}', cls: 'mass', min: 250, max: 500, step: 1, value: 425, unit: 'g', dec: 1, aria: 'mass of the water in grams', onInput: () => cy.reset() });

  const TAU = 0.9, TT = 5.2;
  const cy = cycle(() => TT, 1.4);
  let hits = []; F.hover(d.stage, () => hits);
  const f1 = (x) => fmt(x, 1), f2 = (x) => fmt(x, 2), tn = (s) => s.replace(/−/g, '-');
  const kJ = (x) => (x > 0 ? '+' : '') + (Math.abs(x) >= 10 ? f1(x) : f2(x));
  const hu = (type, x) => '\\htmlClass{kv-' + type + '}{' + x + '}';

  /* the relaxation, scaled so that it lands on the final state at the end of the loop */
  const R = (x) => (1 - Math.exp(-x / TAU)) / (1 - Math.exp(-TT / TAU));
  function state(t) {
    const m = METALS[MET.value], Cm = m.c * MM.v, Cw = CW * MW.v, Tm0 = TM.v, r = R(t);
    const Tf = (Cm * Tm0 + Cw * TW0) / (Cm + Cw);
    const Tm = (x) => Tm0 + (Tf - Tm0) * R(x), Tw = (x) => TW0 + (Tf - TW0) * R(x);
    const any = Math.abs(Tm0 - TW0) > 0.05;
    return { m, Cm, Cw, Tm0, Tf, Tm, Tw, any, qm: Cm * (Tm(t) - Tm0) / 1000, qw: Cw * (Tw(t) - TW0) / 1000, flow: any ? 1 - r : 0 };
  }

  /* ---- the calorimeter, in centimetres from the centre of the inner cup's floor ---- */
  const CX = 330, FLOOR = 592, S = 25;
  const px = (x) => CX + x * S, py = (h) => FLOOR - h * S;
  const R0 = 3.6, HC = 13.5, K = 1.5 / HC, WALL = 0.3;        /* the inner cup: 3.6 cm at its floor, 5.1 cm at its rim, 13.5 cm deep */
  const rin = (h) => R0 + K * h;
  const vol = (h) => Math.PI * (R0 * R0 * h + R0 * K * h * h + K * K * h * h * h / 3);
  const levelOf = (v) => { let a = 0, b = HC; for (let i = 0; i < 40; i += 1) { const c = (a + b) / 2; if (vol(c) < v) a = c; else b = c; } return (a + b) / 2; };
  const XT = -2.85, XROD = 2.6, XB = 0.85;                    /* the thermometer, the stirrer's rod, the centre of the metal */
  const poly = (ctx, pts) => { ctx.beginPath(); pts.forEach(([x, h], i) => (i ? ctx.lineTo(px(x), py(h)) : ctx.moveTo(px(x), py(h)))); ctx.closePath(); };
  /* one cup in section: its wall round an inside of radius r(h) from its floor at h0 to its rim at h1 */
  function cupWall(ctx, r, h0, h1, rc) {
    ctx.save(); ctx.fillStyle = PAL.soft; ctx.strokeStyle = rc; ctx.lineWidth = 2.5; ctx.lineJoin = 'round';
    poly(ctx, [[-r(h1) - WALL, h1], [-r(h0) - WALL, h0 - WALL], [r(h0) + WALL, h0 - WALL], [r(h1) + WALL, h1], [r(h1), h1], [r(h0), h0], [-r(h0), h0], [-r(h1), h1]]);
    ctx.fill(); ctx.stroke(); ctx.restore();
  }
  function cups(ctx, level, rW, rc) {
    /* the outer cup holds the inner one: its rim 1.4 cm lower, its floor 1.6 cm lower, air between the two floors */
    const rout = (h) => rin(h) + WALL + 0.06;
    cupWall(ctx, rout, -1.6, HC - 1.4, rc);
    ctx.save(); ctx.fillStyle = PAL.panel; poly(ctx, [[-rin(0), 0], [rin(0), 0], [rin(HC), HC], [-rin(HC), HC]]); ctx.fill(); ctx.restore();
    cupWall(ctx, rin, 0, HC, rc);
    ctx.save(); ctx.fillStyle = alpha(rW, 0.2); poly(ctx, [[-rin(0), 0], [rin(0), 0], [rin(level), level], [-rin(level), level]]); ctx.fill(); ctx.restore();
    line(ctx, px(-rin(level)), py(level), px(rin(level)), py(level), rW, 2.5);
  }
  function cover(ctx, rc) {
    ctx.save(); ctx.fillStyle = PAL.soft; ctx.strokeStyle = rc; ctx.lineWidth = 2.5; ctx.lineJoin = 'round';
    poly(ctx, [[-5.95, HC + 0.55], [5.95, HC + 0.55], [6.1, HC - 0.6], [5.52, HC - 0.6], [5.48, HC], [-5.48, HC], [-5.52, HC - 0.6], [-6.1, HC - 0.6]]);
    ctx.fill(); ctx.stroke(); ctx.restore();
  }
  /* the thermometer: bulb near the floor, stem through the cover, 0 °C at 2.4 cm and 100 °C at 18.4 cm */
  const HT = (T) => 2.4 + 0.16 * T, TTOP = 19.5;
  function thermometer(ctx, T) {
    const x = px(XT), ct = C('temperature');
    ctx.save(); ctx.fillStyle = PAL.panel; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.roundRect(x - 7, py(TTOP), 14, py(0.5) - py(TTOP), 7); ctx.fill(); ctx.stroke(); ctx.restore();
    for (let v = 0; v <= 100; v += 10) line(ctx, x - (v % 50 ? 3 : 7), py(HT(v)), x + 7, py(HT(v)), alpha(PAL.ink, 0.55), 1.5);
    line(ctx, x, py(1.2), x, py(HT(T)), ct, 4);
    ctx.save(); ctx.fillStyle = ct; ctx.beginPath(); ctx.roundRect(x - 5, py(1.5), 10, py(0.62) - py(1.5), 5); ctx.fill(); ctx.restore();
  }
  /* the stirrer: a rod through the cover and a level ring round the thermometer, seen a little from above */
  const RCX = (-3.5 + XROD) / 2, RA = (XROD + 3.5) / 2, RB = 0.3;
  function ring(ctx, h, front) {
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 4; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.ellipse(px(RCX), py(h), RA * S, RB * S, 0, front ? 0 : Math.PI, front ? Math.PI : 2 * Math.PI); ctx.stroke(); ctx.restore();
  }
  /* a name beside the cup with a thin leader to what it names */
  function tag(ctx, parts, lx, ly, tx, ty, right) {
    line(ctx, right ? lx + 8 : lx - 8, ly, tx, ty, alpha(PAL.ink, 0.5), 1.5);
    F.rich(ctx, parts, lx, ly, { size: 20, align: right ? 'right' : 'left' });
  }

  /* graph: temperature against time beside the cup; T fixed at 0 to 300 °C, the metal's range */
  const GB = { l: 860, r: 1280, t: 140, b: 400 };
  /* heat bars: one scale, −100 to 100 kJ (the most the sliders reach is 84.5 kJ) */
  const BX = (GB.l + GB.r) / 2, QX = (q) => BX + q * 2;
  function bar(ctx, q, y, name, who) {
    const col = C('energy'), sgn = q >= 0 ? 1 : -1;
    ctx.save(); ctx.fillStyle = alpha(col, 0.85); ctx.fillRect(Math.min(BX, QX(q)), y - 14, Math.abs(QX(q) - BX), 28); ctx.restore();
    text(ctx, name + ' = ' + kJ(q) + ' kJ', BX - sgn * 14, y, col, { size: 20, weight: 600, align: sgn > 0 ? 'right' : 'left' });
    hits.push({ x: (BX + QX(q)) / 2, y, r: 16, name: who });
  }

  function draw() {
    const { ctx } = begin(d.c);
    hits = [];
    const t = cy.now(), st = state(t), nm = st.m.name, hot = st.Tm0 > TW0;
    const rM = F.ref('metal'), rW = F.ref('water'), rc = F.ref('calorimeter'), ct = C('temperature'), ce = C('energy');
    const side = Math.cbrt(MM.v / st.m.rho), level = levelOf(MW.v + MM.v / st.m.rho);
    const moving = st.flow > 0.03;

    cups(ctx, level, rW, rc);
    /* the metal, a cube on the cup's floor: its element's colour inside its referent's outline */
    ctx.save(); ctx.fillStyle = F.el(MET.value); ctx.strokeStyle = rM; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.rect(px(XB - side / 2), py(side), side * S, side * S - 1.5); ctx.fill(); ctx.stroke(); ctx.restore();
    /* heat, moving the way it flows and fading as the flow stops */
    if (moving) {
      const s = (t * 0.9) % 1, run = 16, len = 26;
      ctx.save(); ctx.globalAlpha = Math.min(1, st.flow * 1.8);
      [-0.62, 0, 0.62].forEach((a, i) => {
        const ux = Math.sin(a), uy = -Math.cos(a), x0 = px(XB + i * side / 3 - side / 3), y0 = py(side) - 7;
        const p = hot ? s * run : run - s * run, a0 = hot ? p : p + len, a1 = hot ? p + len : p;
        arrow(ctx, x0 + ux * a0, y0 + uy * a0, x0 + ux * a1, y0 + uy * a1, ce, 4);
      });
      ctx.restore();
      text(ctx, 'q', px(XB - side / 3) - 44, py(side) - 34, ce, { size: 24, weight: 600, italic: true });
      hits.push({ x: px(XB), y: py(side) - 28, r: 30, name: hot ? 'heat q leaving the ' + nm + ' for the water' : 'heat q leaving the water for the ' + nm });
    }
    /* the stirrer strokes while heat flows and rests above the metal when it stops */
    const lo = Math.min(side + 1.9, level - 0.7), hi = Math.min(lo + 2, level - 0.5);
    const hr = moving ? lo + (hi - lo) * (0.5 - 0.5 * Math.cos(t * 7)) : lo;
    ring(ctx, hr, false);
    cover(ctx, rc);
    thermometer(ctx, st.Tw(t));
    ring(ctx, hr, true);
    line(ctx, px(XROD), py(hr), px(XROD), py(hr + HC + 4.2 - lo), PAL.ink, 4);

    /* names */
    tag(ctx, ['thermometer'], 206, 150, px(XT) - 9, 150, true);
    text(ctx, f1(st.Tw(t)) + ' °C', 206, 178, ct, { size: 20, weight: 600, align: 'right' });
    tag(ctx, ['stirrer'], 520, 190, px(XROD) + 4, 190);
    tag(ctx, ['cover'], 520, py(HC + 0.2), px(5.9), py(HC + 0.2));
    tag(ctx, [['water W', rW], ' (surroundings)'], 520, 452, px(3.9), py(4.6));
    tag(ctx, [[nm + ' M', rM], ' (system)'], 520, 520, px(XB + side / 2) - 5, py(side / 2));
    text(ctx, f1(st.Tm(t)) + ' °C', 520, 547, ct, { size: 20, weight: 600 });
    line(ctx, 512, 612, px(rin(1.5) + 0.15), py(1.5), alpha(PAL.ink, 0.5), 1.5);
    tag(ctx, [['two polystyrene cups', rc]], 520, 612, px(rin(-0.9) + 0.5), py(-0.9));
    hits.push({ x: px(XT), y: py(16), r: 16, name: 'the thermometer, reading the water’s temperature' }, { x: px(XROD), y: py(16), r: 14, name: 'the stirrer' },
      { x: px(XB), y: py(side / 2), r: side * S / 2, name: 'the ' + nm + ', M, the system' }, { x: px(-1), y: py(level - 0.8), r: 22, name: 'the water, W, the surroundings' },
      { x: px(0), y: py(HC + 0.2), r: 16, name: 'the cover' }, { x: px(-rin(6) - 0.3), y: py(6), r: 14, name: 'two polystyrene cups, one inside the other' });

    /* the graph */
    const ax = axes(ctx, GB, [0, TT], [0, 300], { nx: 0, ny: 6, yl: 'T (°C)', yc: ct, xl: 'time' }), { X, Y } = ax;
    line(ctx, GB.l, Y(st.Tf), GB.r, Y(st.Tf), alpha(ct, 0.7), 2, [10, 10]);
    const upTo = Math.max(t, 1e-3);
    F.plot(ctx, ax, st.Tm, rM, { w: 5, x: [0, upTo] });
    F.plot(ctx, ax, st.Tw, rW, { w: 5, x: [0, upTo] });
    dot(ctx, X(0), Y(st.Tm0), rM, false, 9); dot(ctx, X(0), Y(TW0), rW, false, 9);
    dot(ctx, X(t), Y(st.Tm(t)), rM, true, 9); dot(ctx, X(t), Y(st.Tw(t)), rW, true, 9);
    const up = hot ? -1 : 1, clampY = (y) => Math.max(GB.t + 10, Math.min(y, GB.b - 13));
    text(ctx, nm, X(t) + 16, clampY(Y(st.Tm(t)) + 21 * up), rM, { size: 19, weight: 600, bg: PAL.panel });
    text(ctx, 'water', X(t) + 16, clampY(Y(st.Tw(t)) - 21 * up), rW, { size: 19, weight: 600, bg: PAL.panel });
    F.legend(ctx, ax, [{ s: 'final temperature, ' + f1(st.Tf) + ' °C', color: alpha(ct, 0.7), w: 2, dash: [10, 10] }], { corner: 'above' });
    hits.push({ x: X(t), y: Y(st.Tm(t)), r: 14, name: 'the temperature of the ' + nm }, { x: X(t), y: Y(st.Tw(t)), r: 14, name: 'the temperature of the water' });

    /* the heat bars: equal and opposite at every moment */
    line(ctx, BX, 470, BX, 590, PAL.muted, 2);
    bar(ctx, st.qm, 500, 'q_{metal}', 'the heat gained by the ' + nm + ', negative while it loses heat');
    bar(ctx, st.qw, 560, 'q_{water}', 'the heat gained by the water, negative while it loses heat');
    F.scale(ctx, QX, -100, 100, 50, 598, 'kJ');

    /* the headline: which way heat flows, then where it stops */
    if (!st.any) topline(ctx, 'The ' + nm + ' and the water start at the same temperature, so no heat flows.');
    else if (!moving) topline(ctx, 'The ' + nm + ' and the water are both at ' + f1(st.Tf) + ' °C, and no heat flows.');
    else topline(ctx, hot ? 'Heat flows from the ' + nm + ' to the water.' : 'Heat flows from the water to the ' + nm + '.');

    /* the readout: the two heats at the final temperature, each formula whole on its line */
    const u = '\\;\\text{J/g}\\,^\\circ\\text{C}', deg = '\\;^\\circ\\text{C}';
    const qM = st.Cm * (st.Tf - st.Tm0) / 1000, qW = st.Cw * (st.Tf - TW0) / 1000;
    const row = (sym, c, m, dT, q) => sym + '=\\kcspec\\times\\km\\times\\kdT=(' + hu('heat-capacity', c + u) + ')(' + hu('mass', f1(m) + '\\;\\text{g}') + ')(' + hu('temperature', tn(dT) + deg) + ')=' + hu('energy', tn(kJ(q)) + '\\;\\text{kJ}');
    tex(d.readout, row('\\kq_{\\htmlData{ref=metal}{\\text{metal}}}', fmt(st.m.c, 3), MM.v, f1(st.Tf - st.Tm0), qM) + ' \\\\ '
      + row('\\kq_{\\htmlData{ref=water}{\\text{water}}}', '4.184', MW.v, f2(st.Tf - TW0), qW));
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();
};
