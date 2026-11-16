/* Figures for section 16.1 Spontaneity. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['16.1'] = function (root, F) {
const { fmt, tex, C, PAL, alpha, ctl, cycle, register, begin, line, arrow, text, dot, topline } = F;
const sim = (id, H) => F.sim(root, id, H);
const still = (d, draw) => register(d.fig, { update: () => {}, draw });
const TAU = 2 * Math.PI;
const SUP = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
const sup = (n) => String(n).split('').map((c) => SUP[c] ?? c).join('');

/* =====================================================================
   FIGURE 16.2: technetium-99m and uranium-238 decaying, on one time axis
   that runs from a minute to a hundred billion years. Half-lives as the
   book gives them: 6.01 h for Tc-99m (21.5; the text's "about six
   hours") and 4.5 × 10⁹ y for U-238 (21.3; "more than four billion
   years"). The axis is logarithmic, fixed, log₁₀ of the time in hours
   from LO (1 min) to HI (10¹¹ y), its ticks at named times. The slider is
   the time t on the same scale and opens on the book's week. Over the
   graph, a sample of 100 nuclei of each isotope: nucleus k is left while
   100 × (½)^(t/t½) > k + ½, so the count is the curve's percent rounded.
   Still: no clock runs.
===================================================================== */
(function () {
  const H = 690, d = sim('sim-decay', H);
  const YEAR = 8766, HALF = { tc: 6.01, u: 4.5e9 * YEAR };
  const LO = Math.log10(1 / 60), HI = Math.log10(1e11 * YEAR), WEEK = Math.log10(168);
  /* a time of h hours in words: [value, unit] */
  const words = (h) => (h < 1 ? [h * 60, 'minutes'] : h < 48 ? [h, 'hours'] : h < 2 * YEAR ? [h / 24, 'days'] : h < 1e4 * YEAR ? [h / YEAR, 'years']
    : h < 1e6 * YEAR ? [h / (1e3 * YEAR), 'thousand years'] : h < 1e9 * YEAR ? [h / (1e6 * YEAR), 'million years'] : [h / (1e9 * YEAR), 'billion years']);
  const span = (h) => { const [x, w] = words(h); return `${fmt(x, x < 9.95 ? 1 : 0)} ${w}`; };
  const t = ctl(d.controls, { label: '\\text{time }t', cls: 'time', key: 'span', min: LO, max: HI, step: 0.005, value: WEEK, unit: '', fmt: (lg) => span(10 ** lg),
    aria: 'the time since the samples were made', detents: [{ v: WEEK, label: '1 week' }],
    specials: [{ at: Math.log10(HALF.tc), label: 'Tc-99m half-life' }, { at: Math.log10(HALF.u), label: 'U-238 half-life' }] });
  const SNAP = [HALF.tc, HALF.u];
  const left = (h, k) => 100 * Math.pow(0.5, h / HALF[k]);
  /* a number to three figures, in TeX */
  function sci(x) {
    if (x >= 0.001 && x < 1000) return x.toPrecision(3);
    if (x < 1e-300) return '0';
    const e = Math.floor(Math.log10(x)), m = x / 10 ** e;
    return `${m.toFixed(2)}\\times 10^{${e}}`;
  }
  /* the order the hundred nuclei decay in: a fixed shuffle of the grid's places, the same for both samples */
  const ORDER = (() => { const a = Array.from({ length: 100 }, (_, i) => i); let s = 7; for (let i = 99; i > 0; i--) { s = (s * 1103515245 + 12345) % 2147483648; const j = s % (i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; })();
  const G = { l: 170, r: 1310, t: 350, b: 590 };
  const TICKS = [[1 / 60, '1 minute'], [1, '1 hour'], [24, '1 day'], [YEAR, '1 year'], [1e3 * YEAR, '1000 years'], [1e6 * YEAR, '1 million years'], [1e9 * YEAR, '1 billion years']];
  const MINOR = [1 / 6, 10, 240, 2400, ...[10, 100, 1e4, 1e5, 1e7, 1e8, 1e10].map((y) => y * YEAR)];
  const COLS = 20, PITCH = 27, RN = 10, GY = 122;
  const SAMPLES = [['tc', 'tc-99m', 'Tc-99m', 400], ['u', 'u-238', 'U-238', 1000]];
  let hits = []; F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c); hits = [];
    const h = Math.abs(t.v - WEEK) < 0.004 ? 168 : SNAP.find((x) => Math.abs(t.v - Math.log10(x)) < 0.004) ?? 10 ** t.v, ct = C('time'), col = { tc: F.ref('tc-99m'), u: F.ref('u-238') };
    text(ctx, `After ${span(h)}`, 700, 46, ct, { size: 26, weight: 600, align: 'center' });
    /* the two samples */
    SAMPLES.forEach(([k, , name, cx]) => {
      const p = left(h, k), n = ORDER.filter((r) => p > r + 0.5).length, x0 = cx - ((COLS - 1) * PITCH) / 2;
      ctx.save(); ctx.strokeStyle = PAL.rule; ctx.lineWidth = 2; ctx.fillStyle = alpha(PAL.ink, 0.03);
      ctx.beginPath(); ctx.roundRect(x0 - 24, GY - 24, (COLS - 1) * PITCH + 48, 4 * PITCH + 48, 10); ctx.fill(); ctx.stroke(); ctx.restore();
      ORDER.forEach((r, i) => {
        const x = x0 + (i % COLS) * PITCH, y = GY + Math.floor(i / COLS) * PITCH, on = p > r + 0.5;
        if (on) dot(ctx, x, y, col[k], true, RN);
        else { ctx.save(); ctx.strokeStyle = alpha(PAL.ink, 0.3); ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x, y, RN - 2, 0, TAU); ctx.stroke(); ctx.restore(); }
        hits.push({ x, y, r: 13, name: on ? `a ${name} nucleus` : `a ${name} nucleus that has decayed` });
      });
      F.rich(ctx, [[String(n), col[k], 700], ` of 100 ${name} nuclei left`], cx + (cx < 700 ? -40 : 40), GY + 4 * PITCH + 52, { size: 22, align: 'center' });
    });
    F.legend(ctx, { l: 540, r: 860, t: GY + 4 * PITCH + 30, b: GY + 4 * PITCH + 74 }, [{ s: 'not decayed', kind: 'dot', color: PAL.ink }, { s: 'decayed', kind: 'dot', hollow: true, color: alpha(PAL.ink, 0.45) }], { corner: 'top', row: true, panel: false });
    /* the graph: percent remaining against log time */
    const g = F.axes(ctx, G, [LO, HI], [0, 100], { nx: 0, ny: 4, yl: 'amount of isotope remaining (%)' });
    TICKS.forEach(([hr, s], i) => {
      const x = g.X(Math.log10(hr));
      if (i) line(ctx, x, G.t, x, G.b, PAL.rule, 1.5);
      line(ctx, x, G.b, x, G.b + 9, PAL.muted, 2);
      text(ctx, s, x, G.b + 28, PAL.muted, { size: 17, align: i ? 'center' : 'left' });
    });
    MINOR.forEach((hr) => { const x = g.X(Math.log10(hr)); line(ctx, x, G.b, x, G.b + 5, PAL.muted, 1.5); });
    text(ctx, 'time (logarithmic scale)', G.r, G.b + 62, ct, { size: 20, weight: 600, align: 'right' });
    const X = (hr) => g.X(Math.log10(hr)), Yh = g.Y(50);
    /* the time on the slider: a line through both curves, under the labels */
    const xt = g.X(Math.log10(h));
    line(ctx, xt, G.t - 8, xt, G.b, ct, 3);
    /* how far apart the two half-lives stand, from one 50 % mark to the other */
    const r = HALF.u / HALF.tc, e = Math.floor(Math.log10(r));
    F.hbracket(ctx, X(HALF.tc) + 14, X(HALF.u) - 14, Yh, PAL.muted, `${fmt(r / 10 ** e, 1)} × 10${sup(e)} times as long`, { side: 'below', size: 20 });
    [['u', 'U-238'], ['tc', 'Tc-99m']].forEach(([k]) => F.plot(ctx, g, (lg) => left(10 ** lg, k), col[k], { w: 5 }));
    /* each half-life: a hollow dot where the curve crosses 50 %, dropped to the axis */
    [['tc', 'Tc-99m', '6.01 hours', 1], ['u', 'U-238', '4.5 billion years', -1]].forEach(([k, name, s, side]) => {
      const x = X(HALF[k]), al = side > 0 ? 'left' : 'right';
      line(ctx, x, Yh, x, G.b, alpha(col[k], 0.7), 2.5, [4, 8]);
      dot(ctx, x, Yh, col[k], false, 10);
      text(ctx, name, x + (side > 0 ? 44 : -78), g.Y(86), col[k], { size: 24, weight: 600, align: al, bg: PAL.panel });
      text(ctx, `half-life ${s}`, x + (side > 0 ? 44 : -78), g.Y(69), col[k], { size: 20, align: al, bg: PAL.panel });
      hits.push({ x, y: Yh, r: 16, name: `half of the ${name} is left after ${s}` });
    });
    ['u', 'tc'].forEach((k) => dot(ctx, xt, g.Y(left(h, k)), col[k], true, 9));
    hits.push({ x: xt, y: (G.t + G.b) / 2, r: 14, name: `${span(h)} after the samples were made` });
    const [x, w] = words(h), u = w === 'minutes' ? [1 / 60, 'min'] : w === 'hours' ? [1, 'h'] : w === 'days' ? [24, 'd'] : [YEAR, 'y'];
    const tt = (hr) => `\\htmlClass{kv-time}{${sci(hr / u[0])}\\ \\text{${u[1]}}}`;
    const row = (k, ref, name) => `\\htmlData{ref=${ref}}{\\text{${name}}}\\ \\text{remaining} = 100\\,\\% \\times \\left(\\tfrac{1}{2}\\right)^{t/t_{1/2}} = 100\\,\\% \\times \\left(\\tfrac{1}{2}\\right)^{${tt(h)}\\,/\\,${tt(HALF[k])}} = ${left(h, k) >= 99.95 ? '100' : sci(left(h, k))}\\,\\%`;
    tex(d.readout, `${row('tc', 'tc-99m', 'Tc-99m')} \\\\ ${row('u', 'u-238', 'U-238')}`);
  }
  still(d, draw);
})();

/* =====================================================================
   FIGURE 16.4: an ideal gas expanding into a vacuum, drawn flat. Two
   round flasks of inner radius RB, centres OFF either side of the valve
   at (X0, Y0), joined by a tube of inner half-height HN; a stopcock plug
   PW wide either side of the axis closes the tube. Argon atoms (thirty,
   as the book draws; ten or four by choice) run straight at one speed,
   leave the flask glass in a random direction and glance off the tube's
   straight wall. An atom belongs to the flask it was last in: it changes
   over where the tube opens into the other flask, at ±XE. Closing the
   valve starts again with every atom in the left flask. Moving, on an
   endless clock. Beneath, both flasks' counts against the time since the
   valve opened; the time axis is a named zoom, 0 to the time so far (30 s
   of the drawing's time at least), so the whole run stays in view.
===================================================================== */
(function () {
  const H = 830, d = sim('sim-gas-flasks', H);
  const X0 = 700, Y0 = 290, OFF = 285, RB = 190, HN = 50, RM = 13, PW = 32, DS = 2, SPEED = 640, WIN = 30;
  const RI = RB - RM, HI = HN - RM, XE = OFF - Math.sqrt(RI * RI - HI * HI) + 2;
  const valve = F.choice(d.controls, { label: '\\text{valve}', aria: 'the valve between the flasks', options: [{ value: 'closed', label: 'closed' }, { value: 'open', label: 'open' }],
    value: 'open', ms: 500, onInput: (v) => { if (v === 'closed') restart(); } });
  const atoms = F.choice(d.controls, { label: '\\text{atoms}', aria: 'the number of atoms', key: 'atoms', options: [4, 10, 30].map((n) => ({ value: String(n), label: String(n) })), value: '30', ms: 500, onInput: () => restart() });
  const turn = () => (valve.value === 'open' ? valve.k : 1 - valve.k);
  const open = () => valve.value === 'open' && valve.k >= 0.5;
  const inside = (x, y) => (Math.abs(y) < HI && Math.abs(x) < OFF) || Math.hypot(x + OFF, y) < RI || Math.hypot(x - OFF, y) < RI;
  const walls = () => (open() ? [] : [{ x: -(PW + RM), dir: 1 }, { x: PW + RM, dir: -1 }]);
  const leave = (q, nx, ny) => { const s = 2 * Math.random() - 1, c = Math.sqrt(1 - s * s); q.ux = nx * c - ny * s; q.uy = ny * c + nx * s; };
  function move(q, dist, W) {
    for (let it = 0; it < 6 && dist > 1e-6; it++) {
      const x1 = q.x + q.ux * dist;
      let tt = 1, hit = null;
      for (const w of W) {
        if (q.ux * w.dir <= 0 || (q.x - w.x) * w.dir >= 0 || (x1 - w.x) * w.dir < 0) continue;
        const tw = (w.x - q.x) / (x1 - q.x); if (tw < tt) { tt = tw; hit = w; }
      }
      const ex = q.x + q.ux * dist * tt, ey = q.y + q.uy * dist * tt;
      if (inside(ex, ey)) {
        if (!hit) { q.x = ex; q.y = ey; return; }
        q.x = ex - hit.dir * 0.01; q.y = ey; dist *= 1 - tt; leave(q, -hit.dir, 0); continue;
      }
      let a = 0, b = tt;
      for (let i = 0; i < 12; i++) { const m = (a + b) / 2; if (inside(q.x + q.ux * dist * m, q.y + q.uy * dist * m)) a = m; else b = m; }
      q.x += q.ux * dist * a; q.y += q.uy * dist * a; dist *= 1 - a;
      const dl = Math.hypot(q.x + OFF, q.y), dr = Math.hypot(q.x - OFF, q.y);
      if (Math.abs(q.x) < XE - 3 && Math.abs(q.y) > HI - 1) q.uy = -q.uy;   /* the tube's straight wall: a glancing bounce */
      else { const cx = dl < dr ? -OFF : OFF, r = Math.min(dl, dr) || 1; leave(q, (cx - q.x) / r, -q.y / r); }
    }
  }
  /* a place in the left flask, kept off the atoms already placed so the starting gas does not pile up */
  const place = (P) => {
    for (let k = 0; ; k++) {
      const x = -OFF + (2 * Math.random() - 1) * RI, y = (2 * Math.random() - 1) * RI;
      if (Math.hypot(x + OFF, y) < RI && (k > 200 || P.every((q) => Math.hypot(q.x - x, q.y - y) > 2.4 * RM))) return [x, y];
    }
  };
  /* trace: [time since the valve opened, atoms in the right flask], every DT seconds, thinned as it grows */
  let P = [], N = 30, clock = 0, trace = [], DT = 0.1, again = 0;
  function restart() {
    N = +atoms.value; P = []; clock = 0; trace = [[0, 0]]; DT = 0.1; again = 0;
    for (let i = 0; i < N; i++) { const [x, y] = place(P), h = Math.random() * TAU; P.push({ x, y, ux: Math.cos(h), uy: Math.sin(h), left: 0, side: -1 }); }
  }
  const right = () => P.filter((q) => q.side > 0).length;
  function step(dt) {
    const W = walls(), was = right();
    for (const q of P) {
      q.left += SPEED * dt;
      while (q.left >= DS) { q.left -= DS; move(q, DS, W); if (q.x * q.side < -XE) q.side = -q.side; }
    }
    if (!open()) return;
    const n = right();
    if (was > 0 && n === 0) again++;
    clock += dt;
    if (n !== trace[trace.length - 1][1] || clock - trace[trace.length - 1][0] >= DT) trace.push([clock, n]);
    if (trace.length > 6000) { trace = trace.filter((_, i) => i % 2 === 0 || i === trace.length - 1); DT *= 2; }
  }
  const cy = cycle(() => Infinity, 0);
  restart();
  F.hover(d.stage, () => [
    ...P.map((q) => ({ x: X0 + q.x, y: Y0 + q.y, r: 16, name: 'an argon atom, Ar' })),
    { x: X0, y: Y0 - HN - 40, r: 44, name: 'the valve, ' + valve.value }, { x: X0, y: Y0, r: HN + 20, name: 'the valve, ' + valve.value },
    { x: X0 - OFF, y: Y0, r: RB, name: 'the left flask' }, { x: X0 + OFF, y: Y0, r: RB, name: 'the right flask' },
  ]);
  /* the glass: one outline round both flasks and the tube */
  function glassware(ctx) {
    const RG = RB + 2, a = Math.asin((HN + 2) / RG), xl = X0 - OFF, xr = X0 + OFF, nx = RG * Math.cos(a);
    ctx.save();
    ctx.beginPath(); ctx.arc(xl, Y0, RG, a, TAU - a); ctx.lineTo(xr - nx, Y0 - HN - 2); ctx.arc(xr, Y0, RG, Math.PI + a, 3 * Math.PI - a); ctx.lineTo(xl + nx, Y0 + HN + 2); ctx.closePath();
    ctx.fillStyle = alpha(PAL.ink, 0.05); ctx.fill();
    ctx.lineWidth = 5; ctx.strokeStyle = PAL.ink; ctx.lineJoin = 'round'; ctx.stroke();
    ctx.restore();
  }
  /* the stopcock from the side, as the book draws it: a tapered plug across the tube, its bore in line with the tube when
     open and seen end on when closed, a handle on a stem, seen end on when closed and lying along the tube when open */
  function stopcock(ctx, k) {
    const top = Y0 - HN - 20, bot = Y0 + HN + 20, wt = PW + 6, wb = PW - 4;
    const body = () => { ctx.beginPath(); ctx.moveTo(X0 - wt, top); ctx.lineTo(X0 + wt, top); ctx.lineTo(X0 + wb, bot); ctx.lineTo(X0 - wb, bot); ctx.closePath(); };
    ctx.save();
    ctx.fillStyle = PAL.panel; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3.5; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.roundRect(X0 - 19, bot, 38, 16, 3); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.rect(X0 - 8, top - 20, 16, 20); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(X0, top - 32, 15 + 40 * k, 14 - 3 * k, 0, 0, TAU); ctx.fill(); ctx.stroke();
    body(); ctx.fill();
    ctx.save(); body(); ctx.clip();
    ctx.fillStyle = alpha(PAL.ink, 0.05); ctx.lineWidth = 3;
    if (k >= 1) { ctx.fillRect(X0 - wt, Y0 - HN, 2 * wt, 2 * HN); line(ctx, X0 - wt, Y0 - HN, X0 + wt, Y0 - HN, PAL.ink, 3); line(ctx, X0 - wt, Y0 + HN, X0 + wt, Y0 + HN, PAL.ink, 3); }
    else { ctx.beginPath(); ctx.ellipse(X0, Y0, 22 + (wt + 14 - 22) * k, 22 + (HN - 22) * k, 0, 0, TAU); ctx.fill(); ctx.stroke(); }
    ctx.restore();
    body(); ctx.stroke();
    ctx.restore();
  }
  const G = { l: 250, r: 1190, t: 610, b: 760 };
  tex(d.readout, '\\kwork = -\\kP\\kdV = 0 \\\\ \\kdU = \\kq + \\kwork = 0 + 0 = 0');
  function draw() {
    const { ctx } = begin(d.c), ar = F.el('Ar'), n = right(), cl = F.cat(0), cr = F.cat(1), shut = valve.value === 'closed';
    glassware(ctx);
    stopcock(ctx, turn());
    const fresh = shut ? valve.k : atoms.k;
    ctx.save(); ctx.globalAlpha = fresh; ctx.fillStyle = ar; ctx.strokeStyle = alpha(PAL.ink, 0.55); ctx.lineWidth = 1.5;
    for (const q of P) { ctx.beginPath(); ctx.arc(X0 + q.x, Y0 + q.y, RM, 0, TAU); ctx.fill(); ctx.stroke(); }
    ctx.restore();
    F.label(ctx, 'valve', X0, Y0 - HN - 66, { side: 'above', size: 20, color: PAL.ink, gap: 16, leader: false });
    [[-1, N - n, 'left flask', cl], [1, n, 'right flask', cr]].forEach(([s, c, w, col]) => F.rich(ctx, [w + ': ', [String(c), col, 700], c === 1 ? ' atom' : ' atoms'], X0 + s * OFF, Y0 + RB + 38, { size: 24, align: 'center' }));
    /* the counts since the valve opened */
    const t1 = Math.max(WIN, clock), g = F.axes(ctx, G, [0, t1], [0, N], { nx: 0, ny: 2, yl: 'atoms in each flask' });
    text(ctx, 'time since the valve opened', G.r, G.b + 30, C('time'), { size: 20, weight: 600, align: 'right' });
    line(ctx, G.l, g.Y(N / 2), G.r, g.Y(N / 2), alpha(PAL.ink, 0.45), 2.5, [10, 10]);
    text(ctx, 'even split', G.r + 24, g.Y(N / 2), PAL.muted, { size: 17 });
    F.legend(ctx, g, [{ s: 'left flask', color: cl, w: 4 }, { s: 'right flask', color: cr, w: 4 }], { corner: 'above' });
    const pts = shut ? [[0, 0]] : trace.concat([[clock, n]]);
    [[cl, (c) => N - c], [cr, (c) => c]].forEach(([col, f]) => {
      ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = 4; ctx.lineJoin = 'round'; ctx.beginPath();
      pts.forEach(([s, c], i) => { if (i) { ctx.lineTo(g.X(s), g.Y(f(pts[i - 1][1]))); ctx.lineTo(g.X(s), g.Y(f(c))); } else ctx.moveTo(g.X(s), g.Y(f(c))); });
      ctx.stroke(); ctx.restore();
      const [s, c] = pts[pts.length - 1]; dot(ctx, g.X(s), g.Y(f(c)), col, true, 8);
    });
    if (shut) topline(ctx, `Valve closed: all ${N} atoms stay in the left flask, and the right flask holds a vacuum.`);
    else F.rich(ctx, ['Since the valve opened, the right flask has been empty again ', [again === 1 ? '1 time' : `${again} times`, cr, 700], '.'], 700, 46, { size: 26, align: 'center' });
  }
  register(d.fig, { update: (dt) => { cy.step(dt, () => 1); step(Math.min(dt, 0.05)); }, draw });
})();

/* =====================================================================
   FIGURE 16.5: heat flowing between two alike objects of heat capacity
   1.00 kJ/K. For the first minute of model time they stand apart; at
   contact (t = 0) each temperature closes on the mean as e^(−t/τ),
   τ = 2 min, over ten minutes; 11 model minutes in about 7 s, then a
   1.2 s hold. Axes fixed, −1 to 10 min and 250 to 400 K, the slider
   limits. The heat arrow's length is the temperature difference, 100 K
   drawn 220 long.
===================================================================== */
(function () {
  const H = 670, d = sim('sim-heat-flow', H);
  const CAP = 1.0, TAU_M = 2, TEND = 10, PRE = 1;
  const cy = cycle(() => TEND + PRE, 1.2), reset = () => cy.reset();
  let ty = null;
  const tx = ctl(d.controls, { label: '\\kTX', cls: 'temperature', key: 'TX', min: 300, max: 400, step: 1, value: 350, unit: 'K', dec: 0, aria: 'the starting temperature of object X', onInput: reset,
    specials: [{ at: () => (ty ? ty.v : null), label: 'same as Y' }] });
  ty = ctl(d.controls, { label: '\\kTY', cls: 'temperature', key: 'TY', min: 250, max: 350, step: 1, value: 290, unit: 'K', dec: 0, aria: 'the starting temperature of object Y', onInput: reset,
    specials: [{ at: () => tx.v, label: 'same as X' }] });
  const G = { l: 190, r: 1250, t: 400, b: 590 };
  const S = 320, BH = 190, CX = 700, BT = 120, GAP = 80;
  const LANES = [BT + 55, BT + 95, BT + 135], PER = 3;
  let hits = []; F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c); hits = [];
    const tm = cy.now() - PRE, t = Math.max(0, tm), x0 = tx.v, y0 = ty.v, Tf = (x0 + y0) / 2, k = Math.exp(-t / TAU_M);
    const TX = tm < 0 ? x0 : Tf + (x0 - Tf) * k, TY = tm < 0 ? y0 : Tf + (y0 - Tf) * k, dir = Math.sign(x0 - y0);
    const rx = F.ref('object-x'), ry = F.ref('object-y'), ce = C('energy'), ct = C('temperature');
    /* half the gap, closing over the last 0.4 min before contact */
    const half = (GAP / 2) * Math.min(1, Math.max(0, -tm / 0.4));
    [[CX - half - S, rx, 'X', 'object X'], [CX + half, ry, 'Y', 'object Y']].forEach(([l, c, w, name]) => {
      ctx.save(); ctx.fillStyle = alpha(c, 0.2); ctx.fillRect(l, BT, S, BH); ctx.strokeStyle = c; ctx.lineWidth = 4; ctx.strokeRect(l + 2, BT + 2, S - 4, BH - 4); ctx.restore();
      text(ctx, w, l + S / 2, BT + BH / 2, c, { size: 30, weight: 600, align: 'center' });
      hits.push({ x: l + S / 2, y: BT + BH / 2, r: 80, name });
    });
    text(ctx, `$\\kTX = ${fmt(TX, 0)}\\ \\text{K}$`, CX - half - S / 2, BT + BH + 34, PAL.ink, { size: 22, align: 'center', tex: true });
    text(ctx, `$\\kTY = ${fmt(TY, 0)}\\ \\text{K}$`, CX + half + S / 2, BT + BH + 34, PAL.ink, { size: 22, align: 'center', tex: true });
    const diff = TX - TY, flowing = tm >= 0 && Math.abs(diff) >= 0.5;
    if (flowing) {
      const f = Math.min(1, Math.abs(diff) / 40);
      LANES.forEach((ly, j) => {
        for (let i = 0; i < PER; i++) {
          const u = (((t / 1.2 + i / PER + j * 0.37) % 1) + 1) % 1, s = dir > 0 ? u : 1 - u;
          ctx.save(); ctx.globalAlpha = Math.sqrt(f) * Math.sin(Math.PI * u); dot(ctx, CX - 110 + s * 220, ly, ce, true, 7); ctx.restore();
        }
      });
      const L = Math.max(40, (220 * Math.abs(diff)) / 100), sg = Math.sign(diff);
      arrow(ctx, CX - (sg * L) / 2, BT - 30, CX + (sg * L) / 2, BT - 30, ce, 5);
      text(ctx, 'heat', CX - (sg * L) / 2 - sg * 14, BT - 30, ce, { size: 22, weight: 600, align: sg > 0 ? 'right' : 'left' });
      hits.push({ x: CX, y: BT - 30, r: 30, name: `heat flowing from ${sg > 0 ? 'X to Y' : 'Y to X'}` });
    }
    const g = F.axes(ctx, G, [-PRE, TEND], [250, 400], { nx: 11, ny: 3, fx: (v) => (v < 0 ? '' : fmt(v, 0)), xl: 'time (min)', xc: C('time'), yl: 'temperature (K)', yc: ct });
    line(ctx, g.X(0), G.t, g.X(0), G.b, alpha(PAL.ink, 0.35), 2, [4, 8]);
    text(ctx, 'contact', g.X(0) + 10, G.t + 14, PAL.muted, { size: 17, bg: PAL.panel });
    if (dir) {
      line(ctx, g.X(0), g.Y(Tf), G.r, g.Y(Tf), alpha(PAL.ink, 0.4), 2.5, [10, 10]);
      text(ctx, `${fmt(Tf, 0)} K`, G.r + 10, g.Y(Tf), PAL.muted, { size: 17 });
    }
    const fx = (T0) => (s) => (s < 0 ? T0 : Tf + (T0 - Tf) * Math.exp(-s / TAU_M));
    if (tm > -PRE + 0.01) { F.plot(ctx, g, fx(x0), rx, { w: 5, x: [-PRE, tm] }); F.plot(ctx, g, fx(y0), ry, { w: 5, x: [-PRE, tm] }); }
    dot(ctx, g.X(tm), g.Y(TX), rx, true, 9); dot(ctx, g.X(tm), g.Y(TY), ry, true, 9);
    const apart = Math.abs(g.Y(TX) - g.Y(TY)) > 30, up = TX >= TY ? -1 : 1;
    text(ctx, 'X', g.X(tm) + 16, g.Y(TX) + (apart ? 0 : 13 * up), rx, { size: 20, weight: 600, bg: PAL.panel });
    text(ctx, 'Y', g.X(tm) + 16, g.Y(TY) - (apart ? 0 : 13 * up), ry, { size: 20, weight: 600, bg: PAL.panel });
    const hot = dir > 0 ? 'X' : 'Y', cold = dir > 0 ? 'Y' : 'X';
    topline(ctx, !dir ? `X and Y start at the same temperature, ${fmt(x0, 0)} K, so no heat flows.`
      : tm < 0 ? `X and Y are apart, at ${fmt(x0, 0)} K and ${fmt(y0, 0)} K.`
        : flowing ? `In contact, heat flows from ${hot} to ${cold}: ${hot} cools and ${cold} warms.`
          : `X and Y have both reached ${fmt(Tf, 0)} K, and heat no longer flows.`);
    const qx = +(CAP * (TX - x0)).toFixed(1) || 0;
    tex(d.readout, `\\kqX = ${fmt(qx, 1)}\\ \\text{kJ} \\\\ \\kqY = -\\kqX = ${fmt(-qx, 1)}\\ \\text{kJ}`);
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => (TEND + PRE) / 7), draw });
})();
};
