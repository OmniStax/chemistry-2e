/* Figures for section 5.2 Calorimetry. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['5.2'] = function (root, F) {
const { PAL, C, alpha, cycle, register, begin, line, arrow, text, dot, axes, curve, topline, fmt } = F;
const sim = (id, H) => F.sim(root, id, H);

/* =====================================================================
   FIGURE 5.11 + 5.12 + 5.14: a coffee cup calorimeter. A hot metal in cool
   water (5.14), or a reaction in solution that releases or absorbs heat
   (5.11 a and b), in the nested polystyrene cups of 5.12. Moving: heat
   flows and both temperatures relax to the final one on one clock, while
   the heat bars beneath the graph stay equal and opposite.
===================================================================== */
(function () {
  const d = sim('sim-calorimeter', 580);
  /* specific heats from Table 5.1, J/g °C */
  const METALS = {
    Fe: { name: 'iron', c: 0.449 }, Cu: { name: 'copper', c: 0.385 }, Pb: { name: 'lead', c: 0.130 },
    Au: { name: 'gold', c: 0.129 }, Al: { name: 'aluminum', c: 0.897 },
  };
  const CW = 4.184;
  /* each state opens on its book example: 5.3 (rebar as iron), 5.5 and 5.6 */
  const BOOK = {
    metal: { mw: 425.0, Tw: 24.0 },
    exo: { mw: 100.0, Tw: 22.0, q: 2.89 },
    endo: { mw: 53.2, Tw: 24.9, q: 1.02 },
  };
  const PROC = F.choice(d.controls, {
    label: '\\text{process}', aria: 'the process in the calorimeter', value: 'metal',
    options: [{ value: 'metal', label: 'hot metal' }, { value: 'exo', label: 'exothermic reaction' }, { value: 'endo', label: 'endothermic reaction' }],
    onInput: (v) => switchTo(v),
  });
  const MET = F.select(d.controls, {
    label: '\\text{metal}', aria: 'the metal', value: 'Fe',
    options: Object.keys(METALS).map((k) => ({ value: k, label: METALS[k].name })), onInput: () => cy.reset(),
  });
  const metEl = d.controls.lastElementChild;
  const MM = F.ctl(d.controls, { label: '\\km_{\\htmlData{ref=metal}{\\text{metal}}}', cls: 'mass', min: 10, max: 500, step: 0.1, value: 360.0, unit: 'g', dec: 1, aria: 'mass of the metal in grams', onInput: () => cy.reset() });
  const TM = F.ctl(d.controls, {
    label: '\\kT_{\\text{i,}\\htmlData{ref=metal}{\\text{metal}}}', cls: 'temperature', min: 15, max: 300, step: 1, value: 248, unit: '°C', dec: 0, aria: 'initial temperature of the metal in degrees Celsius',
    specials: [{ at: () => Math.round(TW.v), label: 'equal temperatures' }], onInput: () => cy.reset(),
  });
  const Q = F.ctl(d.controls, { label: '|\\kq_{\\text{reaction}}|', cls: 'energy', min: 0.1, max: 3, step: 0.01, value: 2.89, unit: 'kJ', dec: 2, aria: 'heat of the reaction in kilojoules', onInput: () => cy.reset() });
  const MW = F.ctl(d.controls, { label: '\\km_{\\htmlData{ref=water}{\\text{water}}}', cls: 'mass', min: 50, max: 500, step: 0.1, value: 425.0, unit: 'g', dec: 1, aria: 'mass of the water in grams', onInput: () => cy.reset() });
  const TW = F.ctl(d.controls, { label: '\\kT_{\\text{i,}\\htmlData{ref=water}{\\text{water}}}', cls: 'temperature', min: 15, max: 30, step: 0.1, value: 24.0, unit: '°C', dec: 1, aria: 'initial temperature of the water in degrees Celsius', onInput: () => { TM.refresh(); cy.reset(); } });
  const metalParts = [metEl, MM.el, TM.el];
  Q.el.style.display = 'none'; Q.el.dataset.out = '';
  function switchTo(v) {
    const b = BOOK[v], metal = v === 'metal';
    MW.set(b.mw); TW.set(b.Tw); if (!metal) Q.set(b.q);
    const liquid = metal ? 'water' : 'solution', tag = '\\htmlData{ref=' + liquid + '}{\\text{' + liquid + '}}';
    MW.relabel('\\km_{' + tag + '}', 'mass of the ' + liquid + ' in grams');
    TW.relabel('\\kT_{\\text{i,}' + tag + '}', 'initial temperature of the ' + liquid + ' in degrees Celsius');
    F.regroup(d.controls, metal ? metalParts : [Q.el], metal ? [Q.el] : metalParts);
    TM.refresh(); cy.reset();
  }

  const TAU = 0.9, TT = 5.2;
  const cy = cycle(() => TT, 1.4);
  let hits = []; F.hover(d.stage, () => hits);
  const ro = F.readout(d);
  const f1 = (x) => fmt(x, 1), f2 = (x) => fmt(x, 2), tn = (s) => s.replace(/−/g, '-');
  const kJ = (x) => (Math.abs(x) < 0.005 ? '0.00' : (x > 0 ? '+' : '−') + (Math.abs(x) >= 10 ? f1(Math.abs(x)) : f2(Math.abs(x))));
  const hu = (type, x) => '\\htmlClass{kv-' + type + '}{' + x + '}';

  /* the relaxation, scaled so that it lands on the final state at the end of the loop */
  const R = (x) => (1 - Math.exp(-x / TAU)) / (1 - Math.exp(-TT / TAU));
  /* the state at time t: every temperature and heat, from the sliders alone */
  function state(t) {
    const mode = PROC.value, mw = MW.v, Tw0 = TW.v, Cw = CW * mw, r = R(t);
    if (mode === 'metal') {
      const m = METALS[MET.value], Cm = m.c * MM.v, Tm0 = TM.v;
      const Tf = (Cm * Tm0 + Cw * Tw0) / (Cm + Cw);
      const Tm = (x) => Tm0 + (Tf - Tm0) * R(x), Tw = (x) => Tw0 + (Tf - Tw0) * R(x);
      return { mode, m, Cm, Tm0, Tw0, Tf, Tm, Tw, qs: Cm * (Tm(t) - Tm0) / 1000, ql: Cw * (Tw(t) - Tw0) / 1000, flow: Math.abs(Tm0 - Tf) > 0.05 ? 1 - r : 0 };
    }
    const qr = (mode === 'exo' ? -1 : 1) * Q.v * 1000, Tf = Tw0 - qr / Cw;
    const Tw = (x) => Tw0 + (Tf - Tw0) * R(x);
    return { mode, Tw0, Tf, Tw, qs: qr * r / 1000, ql: -qr * r / 1000, flow: 1 - r };
  }

  /* the cup of Figure 5.12: two nested polystyrene cups under a cover */
  const CX = 250, TOP = 170, BOT = 520, WT = 150, WB = 110, LEVEL = 232;
  const halfAt = (y, w0, w1) => w0 + (w1 - w0) * (y - TOP) / (BOT - TOP);
  function cup(ctx, wet) {
    const outer = [[CX - WT - 16, TOP], [CX - WB - 12, BOT + 14], [CX + WB + 12, BOT + 14], [CX + WT + 16, TOP]], rc = F.ref('calorimeter');
    ctx.save(); ctx.fillStyle = PAL.soft; ctx.strokeStyle = rc; ctx.lineWidth = 3; ctx.lineJoin = 'round';
    ctx.beginPath(); outer.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]))); ctx.closePath(); ctx.fill(); ctx.stroke();
    /* the liquid in the inner cup */
    ctx.strokeStyle = PAL.ink; ctx.fillStyle = PAL.panel; ctx.beginPath();
    ctx.moveTo(CX - halfAt(TOP, WT, WB), TOP); ctx.lineTo(CX - WB, BOT); ctx.lineTo(CX + WB, BOT); ctx.lineTo(CX + halfAt(TOP, WT, WB), TOP); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.fillStyle = alpha(wet, 0.16); ctx.beginPath();
    ctx.moveTo(CX - halfAt(LEVEL, WT, WB), LEVEL); ctx.lineTo(CX - WB, BOT); ctx.lineTo(CX + WB, BOT); ctx.lineTo(CX + halfAt(LEVEL, WT, WB), LEVEL); ctx.closePath(); ctx.fill();
    ctx.restore();
    line(ctx, CX - halfAt(LEVEL, WT, WB), LEVEL, CX + halfAt(LEVEL, WT, WB), LEVEL, alpha(PAL.ink, 0.35), 2);
    /* the cover */
    ctx.save(); ctx.fillStyle = PAL.soft; ctx.strokeStyle = rc; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.rect(CX - WT - 30, TOP - 26, 2 * WT + 60, 26); ctx.fill(); ctx.stroke(); ctx.restore();
    hits.push({ x: CX - WT - 8, y: (TOP + BOT) / 2, r: 18, name: 'two nested polystyrene cups' }, { x: CX - 60, y: TOP - 13, r: 20, name: 'the cover' });
  }
  function stirrer(ctx, lift) {
    const x = CX - 70, y = BOT - 40 - lift;
    line(ctx, x, TOP - 90 - lift, x, y, PAL.ink, 4);
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 4; ctx.beginPath(); ctx.ellipse(x, y, 46, 8, 0, 0, 2 * Math.PI); ctx.stroke(); ctx.restore();
    hits.push({ x, y: TOP - 60 - lift, r: 16, name: 'the stirrer' });
  }
  /* the thermometer, its column in the temperature hue up to the reading on the graph's scale */
  function thermometer(ctx, T, yr) {
    const x = CX + 78, y0 = 70, y1 = BOT - 36, span = y1 - 26 - (y0 + 14);
    ctx.save(); ctx.fillStyle = PAL.panel; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.roundRect(x - 9, y0, 18, y1 - y0, 9); ctx.fill(); ctx.stroke(); ctx.restore();
    const k = Math.max(0, Math.min(1, (T - yr[0]) / (yr[1] - yr[0])));
    const top = y1 - 26 - k * span;
    line(ctx, x, y1 - 10, x, top, C('temperature'), 7);
    dot(ctx, x, y1 - 6, C('temperature'), true, 12);
    text(ctx, f1(T) + ' °C', x + 24, Math.max(top, y0 + 14), C('temperature'), { size: 22, weight: 600, bg: PAL.panel });
    hits.push({ x, y: (y0 + y1) / 2, r: 14, name: 'the thermometer' });
  }
  /* heat arrows between the system and the solution, moving the way heat flows and fading as the flow stops */
  function heatArrows(ctx, cx, cy0, r0, out, flow, t) {
    if (flow < 0.03) return;
    const col = C('energy'), s = (t * 0.9) % 1, run = 34;
    ctx.save(); ctx.globalAlpha = Math.min(1, flow * 1.6);
    [-Math.PI, -Math.PI / 2, 0].forEach((a) => {
      const u = [Math.cos(a), Math.sin(a)], p = out ? r0 + s * run : r0 + run - s * run;
      const a0 = out ? p : p + 30, a1 = out ? p + 30 : p;
      arrow(ctx, cx + u[0] * a0, cy0 + u[1] * a0, cx + u[0] * a1, cy0 + u[1] * a1, col, 4);
    });
    ctx.restore();
    text(ctx, 'q', cx + 16, cy0 - r0 - run / 2, col, { size: 24, weight: 600 });
  }

  /* graph: temperature against time, beside the cup; T from 0 to 300 °C for a metal, 0 to 50 °C for a solution */
  const GB = { l: 660, r: 1320, t: 124, b: 338 };
  const YR = (v) => (v === 'metal' ? [0, 300] : [0, 50]);
  /* heat bars: the scale holds 60 kJ for a metal and 3 kJ for a reaction either side of zero */
  const QMAX = (v) => (v === 'metal' ? 60 : 3);
  const BX = (GB.l + GB.r) / 2, BH = (GB.r - GB.l) / 2 - 40;
  function bar(ctx, q, qmax, y, name, fullName) {
    const col = C('energy'), w = Math.min(Math.abs(q), qmax) / qmax * BH, sgn = q >= 0 ? 1 : -1;
    ctx.save(); ctx.fillStyle = alpha(col, 0.85); ctx.fillRect(sgn > 0 ? BX : BX - w, y - 13, w, 26); ctx.restore();
    if (Math.abs(q) > qmax) arrow(ctx, BX + sgn * (BH - 30), y, BX + sgn * (BH + 6), y, col, 4);
    text(ctx, name + ' = ' + kJ(q) + ' kJ', BX - sgn * 14, y, col, { size: 20, weight: 600, align: sgn > 0 ? 'right' : 'left', bg: PAL.panel });
    hits.push({ x: BX + sgn * w / 2, y, r: 14, name: fullName });
  }

  function draw() {
    const { ctx } = begin(d.c);
    hits = [];
    const t = cy.now(), S = state(t), mode = S.mode, metal = mode === 'metal';
    const yr = PROC.mix(YR), qmax = PROC.mix(QMAX);
    const rM = F.ref('metal'), rW = F.ref(metal ? 'water' : 'solution');
    cup(ctx, rW);
    stirrer(ctx, S.flow > 0.03 ? 22 * (0.5 + 0.5 * Math.sin(t * 7)) : 0);
    const ICY = 420;
    if (metal) {
      const bw = 96, bh = 62, bx = CX + 6 - bw / 2, by = ICY - bh / 2;
      ctx.save(); ctx.fillStyle = F.el(MET.value); ctx.strokeStyle = rM; ctx.lineWidth = 3.5;
      ctx.beginPath(); ctx.rect(bx, by, bw, bh); ctx.fill(); ctx.stroke(); ctx.restore();
      text(ctx, 'M', CX + 6, ICY, rM, { size: 24, weight: 600, align: 'center', bg: PAL.panel });
      text(ctx, f1(S.Tm(t)) + ' °C', CX + 6, by + bh + 24, C('temperature'), { size: 20, weight: 600, align: 'center', bg: PAL.panel });
      hits.push({ x: CX + 6, y: ICY, r: 36, name: 'a piece of ' + S.m.name + ', the system' });
      heatArrows(ctx, CX + 6, ICY, 62, S.Tm0 > S.Tw0, S.flow, t);
      text(ctx, 'W', CX - 110, LEVEL + 40, rW, { size: 22, weight: 600, align: 'center' });
    } else {
      text(ctx, 'reaction', CX + 6, ICY - 12, PAL.ink, { size: 20, weight: 600, align: 'center' });
      text(ctx, '(system)', CX + 6, ICY + 14, PAL.muted, { size: 17, align: 'center' });
      hits.push({ x: CX + 6, y: ICY, r: 40, name: mode === 'exo' ? 'an exothermic reaction, the system' : 'an endothermic reaction, the system' });
      heatArrows(ctx, CX + 6, ICY, 58, mode === 'exo', S.flow, t);
    }
    hits.push({ x: CX - 60, y: LEVEL + 70, r: 60, name: metal ? 'the water, the surroundings' : 'the solution, the surroundings' });
    text(ctx, metal ? 'water (surroundings)' : 'solution (surroundings)', CX, BOT + 44, rW, { size: 20, align: 'center' });
    thermometer(ctx, S.Tw(t), yr);

    /* the graph */
    const { X, Y } = axes(ctx, GB, [0, TT], yr, { nx: 4, ny: 5, fx: () => '', yl: 'T (°C)', yc: C('temperature'), xl: 'time' });
    const Tf = Math.max(yr[0], Math.min(yr[1], S.Tf));
    line(ctx, GB.l, Y(Tf), GB.r, Y(Tf), alpha(C('temperature'), 0.6), 2, [10, 10]);
    const tcol = C('temperature');
    if (metal) {
      ctx.save(); ctx.setLineDash([12, 9]); curve(ctx, (x) => Math.min(yr[1], S.Tm(x)), 0, Math.max(t, 1e-3), X, Y, rM, 4); ctx.restore();
      F.pinned(ctx, GB, X, Y, t, S.Tm(t), rM);
      text(ctx, S.m.name, X(t) + 16, Math.max(GB.t + 10, Math.min(Y(S.Tm(t)) - 20, GB.b - 12)), rM, { size: 18, weight: 600, bg: PAL.panel });
    }
    curve(ctx, S.Tw, 0, Math.max(t, 1e-3), X, Y, rW, 5);
    F.pinned(ctx, GB, X, Y, t, S.Tw(t), rW);
    const below = metal || mode === 'exo' ? 1 : -1;
    text(ctx, metal ? 'water' : 'solution', X(t) + 16, Math.max(GB.t + 10, Math.min(Y(S.Tw(t)) + 22 * below, GB.b - 12)), rW, { size: 18, weight: 600, bg: PAL.panel });
    text(ctx, 'T_{final} = ' + f1(S.Tf) + ' °C', GB.r, Y(Tf) + (Y(Tf) < GB.t + 40 ? 22 : -18), tcol, { size: 18, weight: 600, align: 'right', bg: PAL.panel });

    /* the heat bars: equal and opposite at every moment */
    line(ctx, BX, 418, BX, 548, PAL.muted, 2);
    bar(ctx, S.qs, qmax, 446, metal ? 'q_{metal}' : 'q_{reaction}', metal ? 'the heat gained by the metal, negative while it loses heat' : 'the heat of the reaction');
    bar(ctx, S.ql, qmax, 516, metal ? 'q_{water}' : 'q_{solution}', metal ? 'the heat gained by the water' : 'the heat gained by the solution');

    /* the headline */
    const done = S.flow < 0.03;
    if (metal) {
      const nm = S.m.name;
      if (Math.abs(S.Tm0 - S.Tw0) <= 0.05) topline(ctx, 'The ' + nm + ' and the water start at the same temperature, so no heat flows between them.');
      else if (done) topline(ctx, 'The ' + nm + ' and the water have both reached ' + f1(S.Tf) + ' °C, and no more heat flows.');
      else topline(ctx, 'Heat flows from the ' + (S.Tm0 > S.Tw0 ? nm + ' at ' + f1(S.Tm(t)) + ' °C to the water at ' + f1(S.Tw(t)) + ' °C.' : 'water at ' + f1(S.Tw(t)) + ' °C to the ' + nm + ' at ' + f1(S.Tm(t)) + ' °C.'));
    } else if (mode === 'exo') {
      topline(ctx, done ? 'The reaction has released ' + f2(Q.v) + ' kJ, and the solution has warmed from ' + f1(S.Tw0) + ' °C to ' + f1(S.Tf) + ' °C.'
        : 'The reaction releases heat into the solution, which has warmed from ' + f1(S.Tw0) + ' °C to ' + f1(S.Tw(t)) + ' °C.');
    } else {
      topline(ctx, done ? 'The reaction has absorbed ' + f2(Q.v) + ' kJ, and the solution has cooled from ' + f1(S.Tw0) + ' °C to ' + f1(S.Tf) + ' °C.'
        : 'The reaction takes heat from the solution, which has cooled from ' + f1(S.Tw0) + ' °C to ' + f1(S.Tw(t)) + ' °C.');
    }

    /* the readout: the final state, from the sliders alone */
    const u = '\\;\\text{J/g}\\,^\\circ\\text{C}';
    if (metal) {
      const dT = S.Tf - S.Tm0, q = S.Cm * dT / 1000;
      const texs = '\\kq_{\\htmlData{ref=metal}{\\text{metal}}}=\\kcspec\\times\\km\\times\\kdT=(' + hu('heat-capacity', fmt(S.m.c, 3) + u) + ')(' + hu('mass', f1(MM.v) + '\\;\\text{g}') + ')(' + hu('temperature', tn(f1(dT)) + '\\;^\\circ\\text{C}') + ')=' + hu('energy', tn(kJ(q)).replace('+', '') + '\\;\\text{kJ}') + '=-\\kq_{\\htmlData{ref=water}{\\text{water}}}';
      const note = S.Tf >= 100 ? 'The water would reach 100 °C and begin to boil, which this calculation does not include.' : '';
      ro.set(texs, note, { form: 'metal' });
    } else {
      const dT = S.Tf - S.Tw0, qsol = CW * MW.v * dT / 1000;
      const texs = '\\kq_{\\text{reaction}}=-\\kqsolution=-\\kcspec\\times\\km\\times\\kdT=-(' + hu('heat-capacity', '4.184' + u) + ')(' + hu('mass', f1(MW.v) + '\\;\\text{g}') + ')(' + hu('temperature', tn(f2(dT)) + '\\;^\\circ\\text{C}') + ')=' + hu('energy', tn(kJ(-qsol)).replace('+', '') + '\\;\\text{kJ}');
      ro.set(texs, mode === 'exo' ? 'The negative sign shows that the reaction is exothermic: the solution absorbs the heat it gives off.' : 'The positive sign shows that the reaction is endothermic: it takes its heat from the solution.', { form: 'reaction' });
    }
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();
};
