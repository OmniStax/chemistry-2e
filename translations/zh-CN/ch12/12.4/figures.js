/* Figures for section 12.4 Integrated Rate Laws. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['12.4'] = function (root, F) {
const { fmt, tex, C, PAL, alpha, cycle, register, begin, line, text, dot, topline, hbracket } = F;
const sim = (id, H) => F.sim(root, id, H);
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;
const minus = (s) => String(s).replace(/^-/, '−');
const sub = (s) => s.replace(/_\{(\d)\}/g, (m, n) => '₀₁₂₃₄₅₆₇₈₉'[n]);
/* x as a TeX number to three significant figures, in scientific notation outside 0.01 to 1000 */
function sci(x) {
  if (x === 0) return '0';
  const e = Math.floor(Math.log10(Math.abs(x)));
  if (e >= -2 && e < 3) return x.toPrecision(3);
  const m = x / 10 ** e;
  return `${m.toFixed(2)} \\times 10^{${e}}`;
}

/* =====================================================================
   FIGURE 12.9 + 12.10 + 12.11: one data set plotted three ways, [A],
   ln[A] and 1/[A] against t, side by side. Still: the choice of data set
   swaps the points and the axes, the three frames staying. Each series
   has a chord from its first point to its last: solid in rate-constant
   where the series is straight in that panel (its slope is read as k),
   dashed muted ink elsewhere. H2O2 is Example 12.7's table, C4H6 Example
   12.9's; NH3 is read off Figure 12.11 and set on the lines the text
   names: on W 2.80e-3 M falling 1.3e-6 M/s (Example 12.10), on SiO2
   first order with k = 1.384e-3 /s (12.1's Figure 12.5). Axis ranges
   are fixed per data set from its data with headroom.
===================================================================== */
(function () {
  const d = sim('sim-order-plots', 540);
  const BOXES = [120, 590, 1060].map((l) => ({ l, r: l + 290, t: 150, b: 420 }));
  const ORDER = ['zero order', 'first order', 'second order'];
  const FN = [(c) => c, Math.log, (c) => 1 / c];
  const nh3W = [0, 200, 400, 600, 800, 1000], nh3Q = [0, 100, 200, 300, 400, 500, 700, 1000];
  const SETS = {
    h2o2: {
      sp: 'H_{2}O_{2}', tu: 'h', x: [0, 24], nx: 4, fx: (v) => fmt(v, 0),
      series: [{ t: [0, 6, 12, 18, 24], c: [1, 0.5, 0.25, 0.125, 0.0625], straight: 1 }],
      y: [[0, 1.2, 6, (v) => fmt(v, 1)], [-3, 1, 4, (v) => minus(fmt(v, 0))], [0, 20, 4, (v) => fmt(v, 0)]],
      head: 'Only ln[H_{2}O_{2}] against t is a straight line, so the decomposition is first order.',
      ro: `\\kk = -\\text{slope} = -\\frac{-2.772 - 0.000}{${hue('time', '24.00\\ \\text{h}')} - ${hue('time', '0.00\\ \\text{h}')}} = ${hue('rate-constant', '0.116\\ \\text{h}^{-1}')}`,
    },
    c4h6: {
      sp: 'C_{4}H_{6}', tu: 's', x: [0, 6400], nx: 4, fx: (v) => fmt(v, 0),
      series: [{ t: [0, 1600, 3200, 4800, 6200], c: [1.0e-2, 5.04e-3, 3.37e-3, 2.53e-3, 2.08e-3], straight: 2 }],
      y: [[0, 0.012, 4, (v) => fmt(v, 3)], [-7, -4, 3, (v) => minus(fmt(v, 0))], [0, 600, 3, (v) => fmt(v, 0)]],
      head: 'Only 1/[C_{4}H_{6}] against t is a straight line, so the dimerization is second order.',
      ro: `\\kk = \\text{slope} = \\frac{481\\ M^{-1} - 100\\ M^{-1}}{${hue('time', '6200\\ \\text{s}')} - ${hue('time', '0\\ \\text{s}')}} = ${hue('rate-constant', '0.0614\\ M^{-1}\\,\\text{s}^{-1}')}`,
    },
    nh3: {
      sp: 'NH_{3}', tu: 's', x: [0, 1000], nx: 4, fx: (v) => fmt(v, 0),
      series: [
        { ref: 'tungsten', name: 'on W', t: nh3W, c: nh3W.map((t) => 2.8e-3 - 1.3e-6 * t), straight: 0 },
        { ref: 'quartz', name: 'on SiO_{2}', t: nh3Q, c: nh3Q.map((t) => 2.8e-3 * Math.exp(-1.384e-3 * t)), straight: 1 },
      ],
      y: [[0, 0.004, 4, (v) => fmt(v, 3)], [-8, -5, 3, (v) => minus(fmt(v, 0))], [0, 1600, 4, (v) => fmt(v, 0)]],
      head: 'On tungsten [NH_{3}] falls in a straight line, zero order; on quartz ln[NH_{3}] does, first order.',
      ro: `\\kk = -\\text{slope} = -\\frac{${hue('concentration', '0.0015\\ \\text{mol L}^{-1}')} - ${hue('concentration', '0.0028\\ \\text{mol L}^{-1}')}}{${hue('time', '1000\\ \\text{s}')} - ${hue('time', '0\\ \\text{s}')}} = ${hue('rate-constant', '1.3 \\times 10^{-6}\\ \\text{mol L}^{-1}\\,\\text{s}^{-1}')}`,
    },
  };
  const pick = F.choice(d.controls, { label: '\\text{reaction}', options: [{ value: 'h2o2', label: 'H₂O₂' }, { value: 'c4h6', label: 'C₄H₆' }, { value: 'nh3', label: 'NH₃' }], value: 'h2o2', aria: 'the reaction whose concentration data are plotted' });
  let hits = [];
  F.hover(d.stage, () => hits);
  const yTitle = (sp, i) => (i === 0 ? `[${sp}] (M)` : i === 1 ? `ln[${sp}]` : `1/[${sp}] (M⁻¹)`);
  const valueText = (i, v) => (i === 0 ? `${+v.toPrecision(3)} M` : i === 1 ? minus(v.toFixed(3)) : `${Math.round(v)} M⁻¹`);
  function drawSet(ctx, H, key, live) {
    const S = SETS[key], lab = F.labeller(ctx, H, { headline: true });
    BOXES.forEach((B, i) => {
      const [y0, y1, ny, fy] = S.y[i];
      const cA = C('concentration');
      const a = F.axes(ctx, B, S.x, [y0, y1], { nx: S.nx, ny, fx: S.fx, fy, xl: `t (${S.tu})`, xc: C('time'), yl: yTitle(S.sp, i), yc: i === 0 ? cA : PAL.ink });
      text(ctx, ORDER[i], B.l, B.b + 58, PAL.muted, { size: 18 });
      lab.block(B.l - 100, B.t - 40, B.r + 10, B.t - 8); lab.block(B.l - 100, B.t, B.l - 4, B.b + 70); lab.block(B.l, B.b + 4, B.r + 10, B.b + 74);
      const all = S.series.map((s) => s.t.map((t, j) => ({ x: a.X(t), y: a.Y(FN[i](s.c[j])), t, v: FN[i](s.c[j]) })));
      const crowd = (x, y) => all.flat().filter((q) => Math.abs(q.x - x - 50) < 80 && Math.abs(q.y - y) < 34).length;
      S.series.forEach((s, si) => {
        const col = s.ref ? F.ref(s.ref) : i === 0 ? cA : PAL.ink;
        const pts = all[si];
        const p0 = pts[0], p1 = pts[pts.length - 1], straight = s.straight === i;
        if (straight) line(ctx, p0.x, p0.y, p1.x, p1.y, C('rate-constant'), 4);
        else line(ctx, p0.x, p0.y, p1.x, p1.y, alpha(PAL.ink, 0.4), 2.5, [10, 10]);
        for (const p of pts) lab.block(p.x - 10, p.y - 10, p.x + 10, p.y + 10);
        for (const p of pts) {
          dot(ctx, p.x, p.y, col, true, 8);
          if (live) hits.push({ x: p.x, y: p.y, r: 14, name: `${s.ref ? 'NH₃ ' + sub(s.name) : sub(S.sp)} at ${p.t} ${S.tu}: ${valueText(i, p.v)}` });
        }
        if (straight) {
          /* the slope's name sits off the middle of the chord on the side away from the corner its points come from, which no point occupies */
          const dx = p1.x - p0.x, dy = p1.y - p0.y, L = Math.hypot(dx, dy) || 1, [nx, ny] = dy > 0 ? [dy / L, -dx / L] : [-dy / L, dx / L];
          const cx = (p0.x + p1.x) / 2, cy = (p0.y + p1.y) / 2, sg = crowd(cx + nx * 30, cy + ny * 30) > crowd(cx - nx * 30 - 110, cy - ny * 30) ? -1 : 1;
          const mx = cx + sg * nx * 30 - (sg < 0 ? 110 : 0), my = cy + sg * ny * 30;
          lab.place({ l: mx - 6, t: my - 14, r: mx + 110, b: my + 14 });
          text(ctx, i === 2 ? 'slope = k' : 'slope = −k', mx, my, C('rate-constant'), { size: 19, weight: 600, bg: PAL.panel });
        }
        if (s.ref && i === 0) lab.add(s.name, p1.x, p1.y, 1, 0, col, 19, 18);
      });
    });
    lab.flush();
  }
  function draw() {
    const { ctx, H } = begin(d.c);
    hits = [];
    const now = pick.value, was = pick.from;
    if (was !== now && pick.k < 1) pick.only(ctx, was, () => drawSet(ctx, H, was, false), [0, 0]);
    pick.only(ctx, now, () => drawSet(ctx, H, now, true), [0, 0]);
    topline(ctx, SETS[now].head);
    tex(d.readout, SETS[now].ro);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 12.12: one sample of H2O2 seen at five times 6.00 h apart, as
   a clock runs from 0 to 24 h (4 h of model time per second, so 6 s,
   then a hold). Each beaker shows [A] at min(t, its own time), so all
   fade together until each is left behind; at the end they are the
   book's five beakers. Tint: an opacity of the concentration hue (H2O2
   is colorless). Below, [A] against t to the clock, with a bracket in
   time for each half-life as it completes. The order is a choice, each
   order starting from 1.000 M with a first half-life of 6.00 h:
   first k = ln2/t_half (3.21e-5 /s), second k = 1/([A]0 t_half)
   (4.63e-5 /M/s), zero k = [A]0/(2 t_half) (2.31e-5 M/s). Axes fixed
   at 0 to 24 h and 0 to 1.2 M.
===================================================================== */
(function () {
  const d = sim('sim-half-lives', 700);
  const TH = 6, TS = 3600 * TH, TIMES = [0, 6, 12, 18, 24], XS = [220, 460, 700, 940, 1180];
  const ORD = {
    first: { k: Math.LN2 / TS, c: (t) => Math.exp(-(Math.LN2 / TS) * t * 3600), ends: [6, 12, 18, 24], head: 'The concentration halves every 6.00 h, however much is left.' },
    second: { k: 1 / TS, c: (t) => 1 / (1 + (t * 3600) / TS), ends: [6, 18], head: 'Each half-life is twice as long as the one before: 6.00 h, then 12.0 h.' },
    zero: { k: 1 / (2 * TS), c: (t) => Math.max(0, 1 - (t * 3600) / (2 * TS)), ends: [6, 9, 10.5, 11.25], head: 'Each half-life is half as long as the one before: 6.00 h, then 3.00 h, then 1.50 h.' },
  };
  const order = F.choice(d.controls, { label: '\\text{order}', options: [{ value: 'zero', label: 'zero order' }, { value: 'first', label: 'first order' }, { value: 'second', label: 'second order' }], value: 'first', aria: 'the order of the reaction', ms: 0, onInput: () => cy.reset() });
  const cy = cycle(() => 24, 1.2);
  const B = { l: 150, r: 1300, t: 420, b: 620 };
  let hits = [];
  F.hover(d.stage, () => hits);
  const conc = (c) => (c <= 1e-9 ? '0' : c >= 0.1 ? c.toFixed(3) : c.toPrecision(3));
  function beaker(ctx, cx, c) {
    const w = 150, h = 150, top = 96, l = cx - w / 2, r = cx + w / 2, bot = top + h, rad = 16, lt = top + h * 0.38;
    ctx.save();
    ctx.beginPath(); ctx.moveTo(l, lt); ctx.lineTo(l, bot - rad); ctx.quadraticCurveTo(l, bot, l + rad, bot); ctx.lineTo(r - rad, bot); ctx.quadraticCurveTo(r, bot, r, bot - rad); ctx.lineTo(r, lt); ctx.closePath();
    ctx.fillStyle = alpha(C('concentration'), 0.06 + 0.74 * c); ctx.fill();
    ctx.strokeStyle = alpha(C('concentration'), 0.25 + 0.6 * c); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(l, lt); ctx.lineTo(r, lt); ctx.stroke();
    ctx.strokeStyle = alpha(PAL.ink, 0.6); ctx.lineWidth = 3; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.moveTo(l - 12, top - 6); ctx.quadraticCurveTo(l, top - 6, l, top + 10); ctx.lineTo(l, bot - rad); ctx.quadraticCurveTo(l, bot, l + rad, bot); ctx.lineTo(r - rad, bot); ctx.quadraticCurveTo(r, bot, r, bot - rad); ctx.lineTo(r, top); ctx.stroke();
    ctx.restore();
    return { top, bot, w, h };
  }
  function draw() {
    const { ctx } = begin(d.c), O = ORD[order.value], now = cy.now(), ct = C('concentration'), tc = C('time');
    hits = [];
    topline(ctx, O.head);
    TIMES.forEach((ti, i) => {
      const c = O.c(Math.min(now, ti)), g = beaker(ctx, XS[i], c), y = g.bot + 28;
      text(ctx, conc(c) + ' M', XS[i], y, ct, { size: 21, weight: 600, align: 'center' });
      text(ctx, ti === 0 ? '0 s' : `$${sci(ti * 3600)}$ s`, XS[i], y + 28, tc, { size: 19, align: 'center', tex: true });
      text(ctx, `(${ti} h)`, XS[i], y + 54, tc, { size: 19, align: 'center' });
      hits.push({ x: XS[i], y: (g.top + g.bot) / 2, r: 75, name: `the sample at ${ti} h: ${conc(c)} M` });
    });
    const a = F.axes(ctx, B, [0, 24], [0, 1.2], { nx: 4, ny: 6, fx: (v) => fmt(v, 0), fy: (v) => fmt(v, 1), xl: 'time (h)', xc: tc, yl: '[H_{2}O_{2}] (M)', yc: ct });
    for (const ti of TIMES) if (ti > 0 && ti <= now) {
      const c = O.c(ti);
      line(ctx, a.X(ti), a.Y(c), a.X(ti), B.b, alpha(PAL.ink, 0.35), 2, [4, 8]);
    }
    F.curve(ctx, O.c, 0, now, a.X, a.Y, ct, 5, 160);
    let start = 0;
    const row = a.Y(1.1);
    O.ends.forEach((end, i) => {
      if (end <= now + 1e-9) {
        const w = a.X(end) - a.X(start), len = (end - start).toPrecision(3) + ' h';
        hbracket(ctx, a.X(start), a.X(end), row, tc, w >= 90 ? len : undefined, { size: 19, side: 'below' });
        dot(ctx, a.X(end), a.Y(O.c(end)), ct, false, 8);
        hits.push({ x: (a.X(start) + a.X(end)) / 2, y: row, r: Math.max(14, w / 2), name: `half-life ${i + 1}: ${len}` });
      }
      start = end;
    });
    dot(ctx, a.X(now), a.Y(O.c(now)), ct, true, 9);
    const ts = now * 3600, cn = O.c(now), K = (s) => hue('rate-constant', s), T = hue('time', `${sci(ts)}\\ \\text{s}`), A0 = hue('concentration', '1.000\\ M');
    let ro;
    if (order.value === 'first') ro = `\\kconcAt = \\kconcAz e^{-\\kk\\kt} = (${A0})\\,e^{-(${K(sci(O.k) + '\\ \\text{s}^{-1}')})(${T})} = ${hue('concentration', conc(cn) + '\\ M')}`;
    else if (order.value === 'second') ro = `\\frac{1}{\\kconcAt} = \\kk\\kt + \\frac{1}{\\kconcAz} = (${K(sci(O.k) + '\\ M^{-1}\\,\\text{s}^{-1}')})(${T}) + \\frac{1}{${A0}} = ${sci(1 / cn)}\\ M^{-1}`;
    else ro = cn > 0 ? `\\kconcAt = -\\kk\\kt + \\kconcAz = -(${K(sci(O.k) + '\\ M\\,\\text{s}^{-1}')})(${T}) + ${A0} = ${hue('concentration', conc(cn) + '\\ M')}` : `\\kconcAt = ${hue('concentration', '0\\ M')}\\text{, all of A used up at } \\kt = ${hue('time', sci(2 * TS) + '\\ \\text{s}')}`;
    tex(d.readout, ro, false, { values: false });
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 4), draw });
})();
};
