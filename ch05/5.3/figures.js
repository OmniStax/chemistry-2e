/* Figures for section 5.3 Enthalpy. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['5.3'] = function (root, F) {
const { el, fmt, tex, C, PAL, alpha, ctl, register, begin, line, arrow, text, topline } = F;
const sim = (id, H) => F.sim(root, id, H);
function readout(host, main, small) { tex(host, main); if (small) host.appendChild(el('small', null, small)); }

const hue = (s) => `\\htmlClass{kv-energy}{${s}}`;
/* a signed number with its sign always written, as the book writes enthalpy changes */
const signed = (x, dec) => (x > 0 ? '+' : x < 0 ? '−' : '') + fmt(Math.abs(x), dec);
const signedTex = (x, dec) => (x > 0 ? '+' : x < 0 ? '-' : '') + fmt(Math.abs(x), dec);
const lerp = (a, b, k) => a + (b - a) * k;
function rrect(ctx, x, y, w, h, r, fill, stroke, lw = 2, dash) {
  ctx.save(); ctx.beginPath(); ctx.roundRect(x, y, w, h, r);
  if (fill) { ctx.fillStyle = fill; ctx.fill(); }
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; if (dash) ctx.setLineDash(dash); ctx.stroke(); }
  ctx.restore();
}
/* work is told from heat by its stroke: a dashed shaft ending in the same head */
function dashedArrow(ctx, x1, y1, x2, y2, color, w) {
  const L = Math.hypot(x2 - x1, y2 - y1); if (L < 1) return;
  const ux = (x2 - x1) / L, uy = (y2 - y1) / L, k = Math.min(24, L);
  line(ctx, x1, y1, x2 - ux * k, y2 - uy * k, color, w, [12, 8]);
  arrow(ctx, x2 - ux * k, y2 - uy * k, x2, y2, color, w);
}

/* =====================================================================
   FIGURE 5.19: the first law. A system inside its surroundings, the heat
   arrow on the left and the work arrow on the right, each pointing in or
   out by its sign and as long as its size. The internal energy before and
   after is a pair of levels at the right with ΔU between them. Heat and
   work are one type and share the energy hue; they are told apart by
   label and stroke. Still: the relation has no clock.
===================================================================== */
(function () {
  const d = sim('sim-first-law', 470);
  const q = ctl(d.controls, { label: '\\kq', cls: 'energy', min: -100, max: 100, step: 1, value: 40, unit: 'kJ', dec: 0, aria: 'heat flowing into the system in kilojoules',
    specials: [{ at: () => -w.v, label: 'ΔU = 0' }] });
  const w = ctl(d.controls, { label: '\\kwork', cls: 'energy', min: -100, max: 100, step: 1, value: -15, unit: 'kJ', dec: 0, aria: 'work done on the system in kilojoules',
    specials: [{ at: () => -q.v, label: 'ΔU = 0' }] });
  const SX = 560, SY = 270, RX = 170, RY = 95;
  /* arrows run 40 to 240 units long for 0 to 100 kJ; ΔU levels move 0.72 units per kJ, ±144 at ±200 kJ */
  const len = (v) => (Math.abs(v) / 100) * 200 + 40, UK = 0.72, UX = 1080, UW = 200;
  function draw() {
    const { ctx } = begin(d.c);
    const ce = C('energy'), dU = q.v + w.v;
    rrect(ctx, 30, 84, 1340, 370, 8, alpha(PAL.soft, 0.7), PAL.rule, 1.5);
    text(ctx, 'Surroundings', 60, 118, PAL.muted, { size: 20 });
    ctx.save(); ctx.beginPath(); ctx.ellipse(SX, SY, RX, RY, 0, 0, 2 * Math.PI);
    ctx.fillStyle = PAL.panel; ctx.fill(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2; ctx.stroke(); ctx.restore();
    text(ctx, 'System', SX, SY - 18, PAL.ink, { size: 22, align: 'center', base: 'middle' });
    text(ctx, dU > 0 ? 'ΔU > 0' : dU < 0 ? 'ΔU < 0' : 'ΔU = 0', SX, SY + 20, ce, { size: 22, weight: 600, align: 'center', base: 'middle' });
    /* heat, at the left edge of the system */
    const qx = SX - RX - 6;
    if (q.v !== 0) {
      const L = len(q.v);
      if (q.v > 0) arrow(ctx, qx - L, SY, qx, SY, ce, 5); else arrow(ctx, qx, SY, qx - L, SY, ce, 5);
      text(ctx, 'q = ' + signed(q.v, 0) + ' kJ', qx - 140, SY - 30, ce, { size: 22, weight: 600, align: 'center' });
      text(ctx, q.v > 0 ? 'heat in' : 'heat out', qx - 140, SY + 42, PAL.ink, { size: 19, align: 'center' });
    } else text(ctx, 'no heat flows', qx - 120, SY + 6, PAL.muted, { size: 19, align: 'center' });
    /* work, at the right edge */
    const wx = SX + RX + 6;
    if (w.v !== 0) {
      const L = len(w.v);
      if (w.v > 0) dashedArrow(ctx, wx + L, SY, wx, SY, ce, 5); else dashedArrow(ctx, wx, SY, wx + L, SY, ce, 5);
      text(ctx, 'w = ' + signed(w.v, 0) + ' kJ', wx + 140, SY - 30, ce, { size: 22, weight: 600, align: 'center' });
      text(ctx, w.v > 0 ? 'work done on the system' : 'work done by the system', wx + 140, SY + 42, PAL.ink, { size: 19, align: 'center' });
    } else text(ctx, 'no work is done', wx + 120, SY + 6, PAL.muted, { size: 19, align: 'center' });
    /* the internal energy before and after */
    const y0 = SY, y1 = SY - dU * UK;
    line(ctx, UX, y0, UX + UW, y0, ce, 3, [10, 10]);
    line(ctx, UX, y1, UX + UW, y1, ce, 5);
    text(ctx, 'U before', UX + UW + 10, y0 + (dU < 0 ? -12 : 14), ce, { size: 19, base: 'middle' });
    if (dU !== 0) {
      text(ctx, 'U after', UX + UW + 10, y1 + (dU < 0 ? 14 : -12), ce, { size: 19, weight: 600, base: 'middle' });
      if (Math.abs(y1 - y0) > 26) arrow(ctx, UX + UW / 2, y0, UX + UW / 2, y1 + (dU > 0 ? 2 : -2), ce, 4);
      text(ctx, 'ΔU = ' + signed(dU, 0) + ' kJ', UX - 12, (y0 + y1) / 2, ce, { size: 20, weight: 600, align: 'right', base: 'middle' });
    } else text(ctx, 'U after is the same', UX + UW / 2, y0 + 30, ce, { size: 19, align: 'center' });
    const qs = q.v > 0 ? 'absorbs ' + q.v + ' kJ of heat' : q.v < 0 ? 'loses ' + -q.v + ' kJ of heat' : 'neither gains nor loses heat';
    const ws = w.v > 0 ? 'has ' + w.v + ' kJ of work done on it' : w.v < 0 ? 'does ' + -w.v + ' kJ of work on the surroundings' : 'does no work';
    const us = dU > 0 ? 'its internal energy rises by ' + dU + ' kJ' : dU < 0 ? 'its internal energy falls by ' + -dU + ' kJ' : 'its internal energy does not change';
    topline(ctx, 'The system ' + qs + ' and ' + ws + ', so ' + us + '.');
    readout(d.readout, `\\kdU = \\kq + \\kwork = (${hue(signedTex(q.v, 0))}\\ \\text{kJ}) + (${hue(signedTex(w.v, 0))}\\ \\text{kJ}) = ${hue(signedTex(dU, 0))}\\ \\text{kJ}`,
      'Heat flowing in and work done on the system are positive; heat flowing out and work done by the system are negative.');
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 5.24: the Hess ladder. Three enthalpy levels, one overall arrow
   and two step arrows between them, for the book's carbon dioxide
   (Figure 5.24), iron(III) chloride (Example 5.13) and the reaction of
   Example 5.15 taken by way of its elements. Reversing turns every arrow
   round and changes every sign; the factor stretches every level from the
   top one. The levels and arrows are enthalpies, in the energy hue; the
   formulas are ink. Still: nothing here has a clock.
===================================================================== */
(function () {
  const d = sim('sim-hess', 580);
  const RX = {
    co2: { levels: [['C(s) + O₂(g)', 0], ['CO(g) + ½O₂(g)', -111], ['CO₂(g)', -394]], dec: 0 },
    fecl3: { levels: [['Fe(s) + 3/2 Cl₂(g)', 0], ['FeCl₂(s) + ½Cl₂(g)', -341.8], ['FeCl₃(s)', -399.5]], dec: 1 },
    hno3: { levels: [['3NO₂(g) + H₂O(l)', -186.23], ['3/2 N₂(g) + 7/2 O₂(g) + H₂(g)', 0], ['2HNO₃(aq) + NO(g)', -323.03]], dec: 2 },
  };
  const pick = F.select(d.controls, { label: '\\text{reaction}', aria: 'the reaction and its two steps', value: 'co2',
    options: [{ value: 'co2', label: 'CO₂ from carbon (Figure 5.24)' }, { value: 'fecl3', label: 'FeCl₃ from iron (Example 5.13)' }, { value: 'hno3', label: 'HNO₃ by way of the elements (Example 5.15)' }] });
  const dir = F.choice(d.controls, { label: '\\text{direction}', aria: 'the direction of every equation', value: 'fwd',
    options: [{ value: 'fwd', label: 'forward' }, { value: 'rev', label: 'reverse' }] });
  const f = ctl(d.controls, { label: '\\text{factor}', cls: '', min: 0.5, max: 2, step: 0.5, value: 1, unit: '', dec: 1, aria: 'the factor every equation is multiplied by', detents: [0.5, 1, 2] });
  /* the enthalpy scale runs from +50 kJ down to −850 kJ, past the −799 kJ that twice the iron(III) chloride ladder reaches */
  const TOP = 120, BOT = 520, HMAX = 50, HMIN = -850, Y = (h) => TOP + ((HMAX - h) / (HMAX - HMIN)) * (BOT - TOP);
  const A = { x0: 200, x1: 560 }, M = { x0: 640, x1: 1010 }, E = { x0: 200, x1: 1010 };
  const XO = 330, X1 = 600, X2 = 900;
  function draw() {
    const { ctx } = begin(d.c);
    const ce = C('energy'), r = RX[pick.value], k = f.v;
    const hs = pick.mix((v) => RX[v].levels.map((l) => l[1]));
    const s = dir.mix((v) => (v === 'rev' ? 1 : 0));
    const yA = Y(hs[0] * k), yM = Y(hs[1] * k), yE = Y(hs[2] * k);
    /* the enthalpy axis, as the book draws it */
    arrow(ctx, 90, BOT + 20, 90, TOP - 30, ce, 4);
    text(ctx, 'H increasing', 110, TOP - 30, ce, { size: 20, weight: 600, base: 'middle' });
    /* the three levels, the start of the reaction on the upper left in the book's order */
    const pre = k === 1 ? '' : fmt(k, k % 1 ? 1 : 0) + ' × (';
    const post = k === 1 ? '' : ')';
    [[A, yA, 0], [M, yM, 1], [E, yE, 2]].forEach(([L, y, i]) => {
      line(ctx, L.x0, y, L.x1, y, ce, 4);
      text(ctx, pre + r.levels[i][0] + post, i === 2 ? L.x0 + 10 : L.x0 + 10, i === 2 ? y + 28 : y - 14, PAL.ink, { size: 20 });
    });
    /* the arrows: forward runs top level to middle to bottom; reverse turns each one round */
    const d1 = (hs[1] - hs[0]) * k, d2 = (hs[2] - hs[1]) * k, dO = (hs[2] - hs[0]) * k;
    const sign = dir.value === 'rev' ? -1 : 1;
    const grow = (x, ya, yb, wdt) => { const t = lerp(ya, yb, s), h = lerp(yb, ya, s); if (Math.abs(h - t) > 8) arrow(ctx, x, t, x, h, ce, wdt); };
    grow(XO, yA, yE, 6);
    grow(X1, yA, yM, 4);
    grow(X2, yM, yE, 4);
    const lab = (x, ya, yb, v, name, left) => text(ctx, name + ' = ' + signed(v * sign, r.dec) + ' kJ', left ? x - 14 : x + 14, (ya + yb) / 2, ce, { size: 20, weight: 600, base: 'middle', bg: PAL.panel, align: left ? 'right' : 'left' });
    lab(XO, yA, yE, dO, 'overall ΔH°');
    lab(X1, yA, yM, d1, 'step 1 ΔH°', true);
    lab(X2, yM, yE, d2, 'step 2 ΔH°', true);
    /* the sum, kept on the right */
    const SXR = 1060;
    text(ctx, 'step 1', SXR, 240, PAL.ink, { size: 20 }); text(ctx, signed(d1 * sign, r.dec) + ' kJ', 1340, 240, ce, { size: 20, weight: 600, align: 'right' });
    text(ctx, 'step 2', SXR, 280, PAL.ink, { size: 20 }); text(ctx, signed(d2 * sign, r.dec) + ' kJ', 1340, 280, ce, { size: 20, weight: 600, align: 'right' });
    line(ctx, SXR, 298, 1340, 298, PAL.ink, 2);
    text(ctx, 'overall', SXR, 326, PAL.ink, { size: 20 }); text(ctx, signed(dO * sign, r.dec) + ' kJ', 1340, 326, ce, { size: 20, weight: 600, align: 'right' });
    const exo = dO * sign < 0;
    topline(ctx, 'Step 1 (' + signed(d1 * sign, r.dec) + ' kJ) and step 2 (' + signed(d2 * sign, r.dec) + ' kJ) add up to ' + signed(dO * sign, r.dec)
      + ' kJ, the same as the overall reaction in one step, which is ' + (exo ? 'exothermic.' : 'endothermic.'));
    readout(d.readout, `\\kdHo_{\\text{overall}} = \\kdHo_{1} + \\kdHo_{2} = (${hue(signedTex(d1 * sign, r.dec))}\\ \\text{kJ}) + (${hue(signedTex(d2 * sign, r.dec))}\\ \\text{kJ}) = ${hue(signedTex(dO * sign, r.dec))}\\ \\text{kJ}`,
      k === 1 && sign === 1 ? 'The enthalpy change of the overall reaction equals the sum of the enthalpy changes of its steps.'
        : 'Reversing an equation changes the sign of its ΔH°, and multiplying it by a factor multiplies its ΔH° by the same factor.');
  }
  register(d.fig, { update: () => {}, draw });
})();
};
