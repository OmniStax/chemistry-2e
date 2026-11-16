/* Figures for section 12.4 Integrated Rate Laws. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['12.4'] = function (root, F) {
const { fmt, tex, C, PAL, alpha, cycle, register, begin, line, text, dot, topline, hbracket } = F;
const sim = (id, H) => F.sim(root, id, H);
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;
const minus = (s) => String(s).replace(/^-/, '−');
/* x for a hover name: to three significant figures, as m × 10ⁿ below 0.01 */
const SUP = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
function usci(x) {
  const e = Math.floor(Math.log10(Math.abs(x)));
  if (e >= -2) return x.toPrecision(3);
  return `${(x / 10 ** e).toFixed(2)} × 10${String(e).replace(/./g, (ch) => SUP[ch])}`;
}
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
   ln[A] and 1/[A] against t, side by side, each panel headed by the
   order it tests and the answer. Still: the choice of data set swaps
   the points and the axes, the three frames staying. Through each
   series runs the curve of its own rate law, as the book draws a curve
   through its points, and a chord from its first point to its last:
   solid in rate-constant where the series is straight in that panel
   (its slope is read as k), dashed muted ink where the curve bows away
   from it. H2O2 is Example 12.7's table (k = ln 2 / 6.00 h), C4H6
   Example 12.9's (1/[A] = 100 + 0.0614 t); NH3 is read off Figure 12.11
   and set on the lines the text names: on W 2.80e-3 M falling 1.3e-6
   M/s (Example 12.10), on SiO2 first order with k = 1.384e-3 /s (12.1's
   Figure 12.5). Axis ranges are fixed per data set from its data.
===================================================================== */
(function () {
  const d = sim('sim-order-plots', 580);
  const BOXES = [105, 580, 1055].map((l) => ({ l, r: l + 290, t: 190, b: 480 }));
  const ORDER = ['zero order', 'first order', 'second order'];
  const FN = [(c) => c, Math.log, (c) => 1 / c];
  const nh3W = [0, 200, 400, 600, 800, 1000], nh3Q = [0, 100, 200, 300, 400, 500, 700, 1000];
  const fW = (t) => 2.8e-3 - 1.3e-6 * t, fQ = (t) => 2.8e-3 * Math.exp(-1.384e-3 * t);
  /* cs scales the concentration axis of the first panel (1000 writes it in 10⁻³ M, as the book's axis of 12.11 does) */
  const SETS = {
    h2o2: {
      sp: 'H_{2}O_{2}', tu: 'h', x: [0, 24], nx: 4, cs: 1, cu: 'M',
      series: [{ t: [0, 6, 12, 18, 24], c: [1, 0.5, 0.25, 0.125, 0.0625], f: (t) => Math.exp((-Math.LN2 / 6) * t), straight: 1 }],
      y: [[0, 1, 4], [-3, 0, 3], [0, 20, 4]],
      head: 'Only ln[H_{2}O_{2}] against t is a straight line, so the decomposition is first order.',
      ro: `\\kk = -\\text{slope} = -\\frac{-2.772 - 0.000}{${hue('time', '24.00\\ \\text{h}')} - ${hue('time', '0.00\\ \\text{h}')}} = ${hue('rate-constant', '0.116\\ \\text{h}^{-1}')}`,
    },
    c4h6: {
      sp: 'C_{4}H_{6}', tu: 's', x: [0, 6400], nx: 4, cs: 1000, cu: '10⁻³ M',
      series: [{ t: [0, 1600, 3200, 4800, 6200], c: [1.0e-2, 5.04e-3, 3.37e-3, 2.53e-3, 2.08e-3], f: (t) => 1 / (100 + ((1 / 2.08e-3 - 100) / 6200) * t), straight: 2 }],
      y: [[0, 10, 5], [-6.5, -4.5, 4], [0, 500, 5]],
      head: 'Only 1/[C_{4}H_{6}] against t is a straight line, so the dimerization is second order.',
      ro: `\\kk = \\text{slope} = \\frac{481\\ M^{-1} - 100\\ M^{-1}}{${hue('time', '6200\\ \\text{s}')} - ${hue('time', '0\\ \\text{s}')}} = ${hue('rate-constant', '0.0614\\ M^{-1}\\,\\text{s}^{-1}')}`,
    },
    nh3: {
      sp: 'NH_{3}', tu: 's', x: [0, 1000], nx: 4, cs: 1000, cu: '10⁻³ M',
      series: [
        { ref: 'tungsten', name: 'on W', t: nh3W, c: nh3W.map(fW), f: fW, straight: 0 },
        { ref: 'quartz', name: 'on SiO_{2}', t: nh3Q, c: nh3Q.map(fQ), f: fQ, straight: 1 },
      ],
      y: [[0, 3, 3], [-7.5, -5.5, 4], [0, 1600, 4]],
      head: 'On tungsten [NH_{3}] falls in a straight line, zero order; on quartz ln[NH_{3}] does, first order.',
      /* the book's Example 12.10 for tungsten; quartz by the same two-point reading of its ln plot (2.80e-3 M to 7.02e-4 M) */
      ro: `\\kk_{\\text{W}} = -\\text{slope} = -\\frac{${hue('concentration', '0.0015\\ \\text{mol L}^{-1}')} - ${hue('concentration', '0.0028\\ \\text{mol L}^{-1}')}}{${hue('time', '1000\\ \\text{s}')} - ${hue('time', '0\\ \\text{s}')}} = ${hue('rate-constant', '1.3 \\times 10^{-6}\\ \\text{mol L}^{-1}\\,\\text{s}^{-1}')} \\\\ \\kk_{\\text{SiO}_{2}} = -\\text{slope} = -\\frac{-7.262 - (-5.878)}{${hue('time', '1000\\ \\text{s}')} - ${hue('time', '0\\ \\text{s}')}} = ${hue('rate-constant', '1.38 \\times 10^{-3}\\ \\text{s}^{-1}')}`,
    },
  };
  const pick = F.choice(d.controls, { label: '\\text{reaction}', options: [{ value: 'h2o2', label: 'H₂O₂' }, { value: 'c4h6', label: 'C₄H₆' }, { value: 'nh3', label: 'NH₃' }], value: 'h2o2', aria: 'the reaction whose concentration data are plotted' });
  let hits = [];
  F.hover(d.stage, () => hits);
  const yTitle = (S, i) => (i === 0 ? `[${S.sp}] (${S.cu})` : i === 1 ? `ln[${S.sp}]` : `1/[${S.sp}] (M⁻¹)`);
  const valueText = (i, v) => (i === 0 ? `${usci(v)} M` : i === 1 ? minus(v.toFixed(3)) : `${Math.round(v)} M⁻¹`);
  function drawSet(ctx, H, key, live) {
    const S = SETS[key], lab = F.labeller(ctx, H, { headline: true }), kc = C('rate-constant');
    BOXES.forEach((B, i) => {
      const [y0, y1, ny] = S.y[i], sc = i === 0 ? S.cs : 1, g = (c) => FN[i](c) * sc, step = (y1 - y0) / ny, dec = Number.isInteger(step) ? 0 : Number.isInteger(step * 10) ? 1 : 2;
      const cA = C('concentration');
      const a = F.axes(ctx, B, S.x, [y0, y1], { nx: S.nx, ny, fx: (v) => fmt(v, 0), fy: (v) => minus(fmt(v, dec)), xl: `t (${S.tu})`, xc: C('time'), yl: yTitle(S, i), yc: i === 0 ? cA : PAL.ink });
      /* the panel's question and its answer: which series, if any, is straight here */
      const yes = S.series.filter((s) => s.straight === i);
      const answer = !yes.length ? 'curved' : S.series.length === 1 ? 'a straight line' : `straight ${sub(yes[0].name)}`;
      F.rich(ctx, [[`${ORDER[i]}?  `, PAL.ink, 600], [answer, yes.length ? kc : PAL.muted, yes.length ? 600 : 400]], B.l, B.t - 68, { size: 24 });
      lab.block(B.l - 100, B.t - 84, B.r + 10, B.t - 8); lab.block(B.l - 100, B.t, B.l - 4, B.b + 70); lab.block(B.l, B.b + 4, B.r + 10, B.b + 74);
      const all = S.series.map((s) => s.t.map((t, j) => ({ x: a.X(t), y: a.Y(g(s.c[j])), t, v: FN[i](s.c[j]) })));
      const crowd = (x, y) => all.flat().filter((q) => Math.abs(q.x - x - 50) < 80 && Math.abs(q.y - y) < 34).length;
      S.series.forEach((s, si) => {
        const col = s.ref ? F.ref(s.ref) : i === 0 ? cA : PAL.ink;
        const pts = all[si];
        const p0 = pts[0], p1 = pts[pts.length - 1], straight = s.straight === i, who = s.ref ? 'NH₃ ' + sub(s.name) : sub(S.sp);
        if (straight) line(ctx, p0.x, p0.y, p1.x, p1.y, kc, 4);
        else {
          line(ctx, p0.x, p0.y, p1.x, p1.y, alpha(PAL.ink, 0.4), 2.5, [10, 10]);
          F.plot(ctx, a, (t) => g(s.f(t)), alpha(col, 0.75), { w: 3, x: [s.t[0], s.t[s.t.length - 1]] });
        }
        if (live) hits.push({ x: (p0.x + p1.x) / 2, y: (p0.y + p1.y) / 2, r: 12, name: straight ? `the straight line through the points of ${who}` : `the straight line from the first point of ${who} to the last` });
        for (const p of pts) lab.block(p.x - 10, p.y - 10, p.x + 10, p.y + 10);
        for (const p of pts) {
          dot(ctx, p.x, p.y, col, true, 8);
          if (live) hits.push({ x: p.x, y: p.y, r: 14, name: `${who} at ${p.t} ${S.tu}: ${valueText(i, p.v)}` });
        }
        if (straight) {
          /* the slope's name sits off the middle of the chord on the side away from the corner its points come from, which no point occupies */
          const dx = p1.x - p0.x, dy = p1.y - p0.y, L = Math.hypot(dx, dy) || 1, [nx, ny2] = dy > 0 ? [dy / L, -dx / L] : [-dy / L, dx / L];
          const cx = (p0.x + p1.x) / 2, cy = (p0.y + p1.y) / 2, sg = crowd(cx + nx * 30, cy + ny2 * 30) > crowd(cx - nx * 30 - 110, cy - ny2 * 30) ? -1 : 1;
          const mx = cx + sg * nx * 30 - (sg < 0 ? 110 : 0), my = cy + sg * ny2 * 30;
          lab.place({ l: mx - 6, t: my - 14, r: mx + 110, b: my + 14 });
          text(ctx, i === 2 ? 'slope = k' : 'slope = −k', mx, my, kc, { size: 20, weight: 600, bg: PAL.panel });
        }
        if (s.ref && i === 0) lab.add(s.name, p1.x, p1.y, 1, 0, col, 20, 14);
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
   FIGURE 12.12: one sample followed from half to half as a clock runs.
   The five beakers are the book's five concentrations, 1.000 M halved
   four times; under each stands the time the sample reached it, written
   when the clock gets there. The beaker under way holds the live sample
   and its live concentration, the ones after it stand empty. Tint: an
   opacity of the concentration hue (H2O2 is colorless). Below, [A]
   against t to the clock, a bracket in time over each half-life. The
   order is a choice, each order starting from 1.000 M with a first
   half-life of 6.00 h: first k = ln2/t_half (3.21e-5 /s, Example 12.11),
   second k = 1/([A]0 t_half) (4.63e-5 /M/s), zero k = [A]0/(2 t_half)
   (2.315e-5 M/s, written to four figures so that every half-life the
   readout works out agrees with the one drawn). The time axis is fixed
   per order to hold four half-lives: 0 to 24 h, 0 to 96 h (6, 12, 24,
   48 h), 0 to 12 h (6, 3, 1.5, 0.75 h, the reactant gone at 12 h); the
   clock crosses it in 6 s and holds. [A] axis 0 to 1.25 M.
===================================================================== */
(function () {
  const d = sim('sim-half-lives', 800);
  const TS = 3600 * 6, XS = [225, 462, 700, 938, 1175];
  const ORD = {
    first: { T: 24, kt: '3.21 \\times 10^{-5}\\ \\text{s}^{-1}', c: (t) => Math.exp(-(Math.LN2 / TS) * t * 3600), ends: [6, 12, 18, 24], sp: '[H_{2}O_{2}]', head: 'Every half-life lasts 6.00 h, however much H_{2}O_{2} is left.' },
    second: { T: 96, kt: '4.63 \\times 10^{-5}\\ M^{-1}\\,\\text{s}^{-1}', c: (t) => 1 / (1 + (t * 3600) / TS), ends: [6, 18, 42, 90], sp: '[A]', head: 'Second order: each half-life lasts twice as long as the one before.' },
    zero: { T: 12, kt: '2.315 \\times 10^{-5}\\ M\\,\\text{s}^{-1}', c: (t) => Math.max(0, 1 - (t * 3600) / (2 * TS)), ends: [6, 9, 10.5, 11.25], sp: '[A]', head: 'Zero order: each half-life lasts half as long as the one before.' },
  };
  const order = F.choice(d.controls, { label: '\\text{order}', options: [{ value: 'zero', label: 'zero order' }, { value: 'first', label: 'first order' }, { value: 'second', label: 'second order' }], value: 'first', aria: 'the order of the reaction', ms: 0, onInput: () => cy.reset() });
  const cy = cycle(() => ORD[order.value].T, 1.4);
  const B = { l: 150, r: 1300, t: 490, b: 720 };
  let hits = [];
  F.hover(d.stage, () => hits);
  const conc = (c) => (c <= 1e-9 ? '0' : c >= 0.1 ? c.toFixed(3) : c.toPrecision(3));
  const hours = (h) => `${+h.toFixed(2)} h`, span = (h) => `${h.toPrecision(3)} h`;
  const BK = { top: 100, base: 290, half: 84, lv: 168 };
  /* a beaker standing on its base: straight walls, a rounded foot, a flared rim with a spout at the left, graduations up its right side */
  function glassPath(ctx, x) {
    const l = x - BK.half, r = x + BK.half;
    ctx.beginPath();
    ctx.moveTo(l - 15, BK.top - 7); ctx.quadraticCurveTo(l - 2, BK.top - 2, l, BK.top + 13);
    ctx.lineTo(l, BK.base - 14); ctx.quadraticCurveTo(l, BK.base, l + 14, BK.base);
    ctx.lineTo(r - 14, BK.base); ctx.quadraticCurveTo(r, BK.base, r, BK.base - 14);
    ctx.lineTo(r, BK.top + 8); ctx.quadraticCurveTo(r, BK.top, r + 7, BK.top - 2);
  }
  function beaker(ctx, x, c) {
    const l = x - BK.half, r = x + BK.half, ct = C('concentration');
    ctx.save();
    if (c !== null) {
      ctx.save(); glassPath(ctx, x); ctx.closePath(); ctx.clip();
      ctx.fillStyle = alpha(ct, 0.05 + 0.75 * c); ctx.fillRect(l, BK.lv, 2 * BK.half, BK.base - BK.lv);
      ctx.restore();
      line(ctx, l + 2, BK.lv, r - 2, BK.lv, alpha(ct, 0.3 + 0.6 * c), 2.5);
    }
    for (let j = 0; j < 5; j += 1) { const y = BK.base - 30 - j * 28; line(ctx, r - (j % 2 ? 20 : 30), y, r - 8, y, alpha(PAL.ink, 0.35), 1.5); }
    ctx.strokeStyle = alpha(PAL.ink, 0.7); ctx.lineWidth = 3.5; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    glassPath(ctx, x); ctx.stroke();
    ctx.restore();
  }
  function draw() {
    const { ctx } = begin(d.c), O = ORD[order.value], now = cy.now(), ct = C('concentration'), tc = C('time');
    hits = [];
    topline(ctx, O.head);
    /* the halvings done by now: beaker i is stamped once the sample has reached 1/2^i, the next one holds the live sample */
    const TIMES = [0, ...O.ends], done = O.ends.filter((e) => e <= now + 1e-9).length, cn = O.c(now);
    TIMES.forEach((ti, i) => {
      const x = XS[i], y = BK.base + 34;
      if (i <= done) {
        const c = 1 / 2 ** i;
        beaker(ctx, x, c);
        text(ctx, conc(c) + ' M', x, y, ct, { size: 23, weight: 600, align: 'center' });
        text(ctx, ti === 0 ? '0 s' : `$${sci(ti * 3600)}$ s`, x, y + 31, tc, { size: 21, align: 'center', tex: true });
        text(ctx, `(${hours(ti)})`, x, y + 60, tc, { size: 21, align: 'center' });
        hits.push({ x, y: (BK.top + BK.base) / 2, r: 90, name: `the sample at ${hours(ti)}: ${conc(c)} M` });
      } else if (i === done + 1) {
        beaker(ctx, x, cn);
        text(ctx, conc(cn) + ' M', x, y, ct, { size: 23, weight: 600, align: 'center' });
        hits.push({ x, y: (BK.top + BK.base) / 2, r: 90, name: `the sample now, at ${hours(now)}: ${conc(cn)} M` });
      } else {
        F.faded(ctx, 0.4, [0, 0], () => beaker(ctx, x, null));
        hits.push({ x, y: (BK.top + BK.base) / 2, r: 90, name: `waiting for the sample to fall to ${conc(1 / 2 ** i)} M` });
      }
    });
    const a = F.axes(ctx, B, [0, O.T], [0, 1.25], { nx: 4, ny: 5, fx: (v) => fmt(v, 0), fy: (v) => fmt(v, 2), xl: 't (h)', xc: tc });
    /* the axis title stands left of the axis top, clear of the brackets' lengths */
    text(ctx, `${O.sp} (M)`, B.l - 14, B.t - 28, ct, { size: 20, weight: 600, align: 'right' });
    const row = a.Y(1.1);
    for (let i = 0; i < done; i += 1) line(ctx, a.X(O.ends[i]), row, a.X(O.ends[i]), B.b, alpha(PAL.ink, 0.35), 2, [4, 8]);
    F.curve(ctx, O.c, 0, now, a.X, a.Y, ct, 5, 200);
    let start = 0;
    O.ends.forEach((end, i) => {
      if (i < done) {
        const w = a.X(end) - a.X(start), len = span(end - start);
        hbracket(ctx, a.X(start), a.X(end), row, tc, w >= 64 ? len : undefined, { size: 20 });
        dot(ctx, a.X(end), a.Y(O.c(end)), ct, false, 8);
        hits.push({ x: (a.X(start) + a.X(end)) / 2, y: row, r: Math.max(14, w / 2), name: `half-life ${i + 1}: ${len}, from ${conc(1 / 2 ** i)} M to ${conc(1 / 2 ** (i + 1))} M` });
        hits.push({ x: a.X(end), y: a.Y(O.c(end)), r: 14, name: `${conc(1 / 2 ** (i + 1))} M at ${hours(end)}` });
      } else if (i === done && now > start) {
        /* the half-life under way: its bracket open at the clock */
        line(ctx, a.X(start), row, a.X(now), row, alpha(tc, 0.5), 3);
        if (i === 0) line(ctx, a.X(0), row - 10, a.X(0), row + 10, alpha(tc, 0.5), 3);
      }
      start = end;
    });
    dot(ctx, a.X(now), a.Y(cn), ct, true, 9);
    hits.push({ x: a.X(now), y: a.Y(cn), r: 14, name: `${sub(O.sp)} now: ${conc(cn)} M` });
    /* Table 12.2's half-life for the half-life under way, [A]₀ the concentration it starts from (the fifth after the fourth is done) */
    const A0 = hue('concentration', `${conc(1 / 2 ** done)}\\ M`), K = hue('rate-constant', O.kt), th = TS * (order.value === 'first' ? 1 : order.value === 'second' ? 2 ** done : 1 / 2 ** done);
    const res = hue('time', `${sci(th)}\\ \\text{s}`);
    const ro = order.value === 'first' ? `\\kthalf = \\frac{0.693}{\\kk} = \\frac{0.693}{${K}} = ${res}`
      : order.value === 'second' ? `\\kthalf = \\frac{1}{\\kk\\kconcAz} = \\frac{1}{(${K})(${A0})} = ${res}`
        : `\\kthalf = \\frac{\\kconcAz}{2\\kk} = \\frac{${A0}}{2(${K})} = ${res}`;
    tex(d.readout, ro, false, { values: false });
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => ORD[order.value].T / 6), draw });
})();
};
