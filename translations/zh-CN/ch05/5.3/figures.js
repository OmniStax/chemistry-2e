/* Figures for section 5.3 Enthalpy. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['5.3'] = function (root, F) {
const { el, fmt, tex, C, PAL, alpha, ctl, register, begin, line, arrow, text, topline, measure } = F;
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
  const q = ctl(d.controls, { label: '\\kq', cls: 'energy', min: -100, max: 100, step: 1, value: 40, unit: 'kJ', dec: 0, aria: '以千焦为单位流入体系的热量',
    specials: [{ at: () => -w.v, label: 'ΔU = 0' }] });
  const w = ctl(d.controls, { label: '\\kwork', cls: 'energy', min: -100, max: 100, step: 1, value: -15, unit: 'kJ', dec: 0, aria: '以千焦为单位对体系所做的功',
    specials: [{ at: () => -q.v, label: 'ΔU = 0' }] });
  const SX = 560, SY = 270, RX = 170, RY = 95;
  /* arrows run 40 to 240 units long for 0 to 100 kJ; ΔU levels move 0.72 units per kJ, ±144 at ±200 kJ */
  const len = (v) => (Math.abs(v) / 100) * 200 + 40, UK = 0.72, UX = 1080, UW = 200;
  function draw() {
    const { ctx } = begin(d.c);
    const ce = C('energy'), dU = q.v + w.v;
    rrect(ctx, 30, 84, 1340, 370, 8, alpha(PAL.soft, 0.7), PAL.rule, 1.5);
    text(ctx, '环境', 60, 118, PAL.muted, { size: 20 });
    ctx.save(); ctx.beginPath(); ctx.ellipse(SX, SY, RX, RY, 0, 0, 2 * Math.PI);
    ctx.fillStyle = PAL.panel; ctx.fill(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2; ctx.stroke(); ctx.restore();
    text(ctx, '体系', SX, SY - 18, PAL.ink, { size: 22, align: 'center', base: 'middle' });
    text(ctx, dU > 0 ? 'ΔU > 0' : dU < 0 ? 'ΔU < 0' : 'ΔU = 0', SX, SY + 20, ce, { size: 22, weight: 600, align: 'center', base: 'middle' });
    /* heat, at the left edge of the system */
    const qx = SX - RX - 6;
    if (q.v !== 0) {
      const L = len(q.v);
      if (q.v > 0) arrow(ctx, qx - L, SY, qx, SY, ce, 5); else arrow(ctx, qx, SY, qx - L, SY, ce, 5);
      text(ctx, 'q = ' + signed(q.v, 0) + ' kJ', qx - 140, SY - 30, ce, { size: 22, weight: 600, align: 'center' });
      text(ctx, q.v > 0 ? '热量流入' : '热量流出', qx - 140, SY + 42, PAL.ink, { size: 19, align: 'center' });
    } else text(ctx, '没有热量流动', qx - 120, SY + 6, PAL.muted, { size: 19, align: 'center' });
    /* work, at the right edge */
    const wx = SX + RX + 6;
    if (w.v !== 0) {
      const L = len(w.v);
      if (w.v > 0) dashedArrow(ctx, wx + L, SY, wx, SY, ce, 5); else dashedArrow(ctx, wx, SY, wx + L, SY, ce, 5);
      text(ctx, 'w = ' + signed(w.v, 0) + ' kJ', wx + 140, SY - 30, ce, { size: 22, weight: 600, align: 'center' });
      text(ctx, w.v > 0 ? '对体系做功' : '体系对外做功', wx + 140, SY + 42, PAL.ink, { size: 19, align: 'center' });
    } else text(ctx, '不做功', wx + 120, SY + 6, PAL.muted, { size: 19, align: 'center' });
    /* the internal energy before and after */
    const y0 = SY, y1 = SY - dU * UK;
    line(ctx, UX, y0, UX + UW, y0, ce, 3, [10, 10]);
    line(ctx, UX, y1, UX + UW, y1, ce, 5);
    text(ctx, 'U 变化前', UX + UW + 10, y0 + (dU < 0 ? -12 : 14), ce, { size: 19, base: 'middle' });
    if (dU !== 0) {
      text(ctx, 'U 变化后', UX + UW + 10, y1 + (dU < 0 ? 14 : -12), ce, { size: 19, weight: 600, base: 'middle' });
      if (Math.abs(y1 - y0) > 26) arrow(ctx, UX + UW / 2, y0, UX + UW / 2, y1 + (dU > 0 ? 2 : -2), ce, 4);
      text(ctx, 'ΔU = ' + signed(dU, 0) + ' kJ', UX + UW / 2, Math.max(y0, y1) + 34, ce, { size: 20, weight: 600, align: 'center', base: 'middle' });
    } else text(ctx, 'U 前后不变', UX + UW / 2, y0 + 30, ce, { size: 19, align: 'center' });
    const qs = q.v > 0 ? '吸收 ' + q.v + ' kJ 热量' : q.v < 0 ? '放出 ' + -q.v + ' kJ 热量' : '既不吸热也不放热';
    const ws = w.v > 0 ? '被做了 ' + w.v + ' kJ 的功' : w.v < 0 ? '对环境做了 ' + -w.v + ' kJ 的功' : '不做功';
    const us = dU > 0 ? '内能增加 ' + dU + ' kJ' : dU < 0 ? '内能减少 ' + -dU + ' kJ' : '内能不变';
    topline(ctx, '体系' + qs + '，并' + ws + '，因此其' + us + '。');
    readout(d.readout, `\\kdU = \\kq + \\kwork = (${hue(signedTex(q.v, 0))}\\ \\text{kJ}) + (${hue(signedTex(w.v, 0))}\\ \\text{kJ}) = ${hue(signedTex(dU, 0))}\\ \\text{kJ}`);
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
  const pick = F.select(d.controls, { label: '\\text{反应}', aria: '反应及其两个步骤', value: 'co2',
    options: [{ value: 'co2', label: 'CO₂（图 5.24）' }, { value: 'fecl3', label: 'FeCl₃（例 5.13）' }, { value: 'hno3', label: 'HNO₃（例 5.15）' }] });
  const dir = F.choice(d.controls, { label: '\\text{方向}', aria: '每个方程式的方向', value: 'fwd',
    options: [{ value: 'fwd', label: '正向' }, { value: 'rev', label: '逆向' }] });
  const f = ctl(d.controls, { label: '\\text{因子}', cls: '', min: 0.5, max: 2, step: 0.5, value: 1, unit: '', dec: 1, aria: '每个方程式所乘的因子', detents: [0.5, 1, 2] });
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
    const sign = dir.value === 'rev' ? -1 : 1;
    const d1 = (hs[1] - hs[0]) * k, d2 = (hs[2] - hs[1]) * k, dO = (hs[2] - hs[0]) * k;
    const exo = dO * sign < 0;
    const lines = topline(ctx, '步骤 1（' + signed(d1 * sign, r.dec) + ' kJ）与步骤 2（' + signed(d2 * sign, r.dec) + ' kJ）之和为 ' + signed(dO * sign, r.dec)
      + ' kJ，与一步完成的总反应相同，该反应是' + (exo ? '放热的。' : '吸热的。'));
    /* every box drawn so far, so the arrow labels can step clear of the levels, the formulas and each other */
    const taken = [{ l: 0, r: 1400, t: 0, b: lines === 2 ? 96 : 68 }];
    const clash = (b) => taken.some((o) => b.l < o.r + 6 && o.l < b.r + 6 && b.t < o.b + 4 && o.t < b.b + 4);
    /* the enthalpy axis, as the book draws it */
    arrow(ctx, 40, BOT + 20, 40, TOP - 30, ce, 4);
    text(ctx, 'H 增大', 60, TOP - 30, ce, { size: 20, weight: 600, base: 'middle' });
    taken.push({ l: 36, r: 44, t: TOP - 30, b: BOT + 20 }, { l: 50, r: 60 + measure(ctx, 'H 增大', { size: 20, weight: 600 }) + 7, t: TOP - 44, b: TOP - 16 });
    /* the three levels, the start of the reaction on the upper left in the book's order */
    const pre = k === 1 ? '' : fmt(k, k % 1 ? 1 : 0) + ' × (';
    const post = k === 1 ? '' : ')';
    [[A, yA, 0], [M, yM, 1], [E, yE, 2]].forEach(([L, y, i]) => {
      line(ctx, L.x0, y, L.x1, y, ce, 4);
      const s0 = pre + r.levels[i][0] + post, ty = i === 2 ? y + 28 : y - 14;
      text(ctx, s0, L.x0 + 10, ty, PAL.ink, { size: 20 });
      taken.push({ l: L.x0, r: L.x1, t: y - 3, b: y + 3 }, { l: L.x0 + 3, r: L.x0 + 17 + measure(ctx, s0, { size: 20 }), t: ty - 14, b: ty + 14 });
    });
    /* the arrows: forward runs top level to middle to bottom; reverse turns each one round */
    const grow = (x, ya, yb, wdt) => { const t = lerp(ya, yb, s), h = lerp(yb, ya, s); if (Math.abs(h - t) > 8) arrow(ctx, x, t, x, h, ce, wdt); taken.push({ l: x - 4, r: x + 4, t: Math.min(ya, yb), b: Math.max(ya, yb) }); };
    grow(XO, yA, yE, 6);
    grow(X1, yA, yM, 4);
    grow(X2, yM, yE, 4);
    /* each label beside its arrow at mid-height, or the nearest height that is clear, with a leader when it leaves the arrow's span */
    const lab = (x, ya, yb, v, name, side) => {
      const str = name + ' = ' + signed(v * sign, r.dec) + ' kJ', w = measure(ctx, str, { size: 20, weight: 600 }) + 14, mid = (ya + yb) / 2;
      const l = side > 0 ? x + 20 - 7 : x - 20 - w + 7;
      let y = mid;
      for (const dy of [0, 24, -24, 48, -48, 72, -72, 96, -96, 120, -120, 144, -144]) {
        const b = { l, r: l + w, t: mid + dy - 14, b: mid + dy + 14 };
        if (b.b > 576 || clash(b)) continue;
        y = mid + dy; taken.push(b); break;
      }
      if (y < Math.min(ya, yb) || y > Math.max(ya, yb)) line(ctx, x + side * 6, mid, x + side * 16, y, alpha(ce, 0.5), 1.5, [5, 6]);
      text(ctx, str, side > 0 ? x + 20 : x - 20, y, ce, { size: 20, weight: 600, base: 'middle', bg: PAL.panel, align: side > 0 ? 'left' : 'right' });
    };
    lab(XO, yA, yE, dO, '总反应 ΔH°', -1);
    lab(X1, yA, yM, d1, '步骤 1 ΔH°', -1);
    lab(X2, yM, yE, d2, '步骤 2 ΔH°', 1);
    readout(d.readout, `\\kdHo_{\\text{总}} = \\kdHo_{1} + \\kdHo_{2} = (${hue(signedTex(d1 * sign, r.dec))}\\ \\text{kJ}) + (${hue(signedTex(d2 * sign, r.dec))}\\ \\text{kJ}) = ${hue(signedTex(dO * sign, r.dec))}\\ \\text{kJ}`,
      k === 1 && sign === 1 ? '' : '把方程式反转会改变其焓变的正负号，把它乘以一个因子则其焓变乘以同一个因子。');
  }
  register(d.fig, { update: () => {}, draw });
})();
};
