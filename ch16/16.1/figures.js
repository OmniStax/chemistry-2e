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
   FIGURE 16.2: technetium-99m and uranium-238 decaying over a span of
   time the reader stretches. Half-lives from the text: 6.01 h for
   Tc-99m ("about six hours"), 4.47 × 10⁹ y for U-238 ("more than four
   billion years"). The slider is log₁₀ of the span in hours, 0 (1 h) to
   14 (11.4 billion years); the time axis is a named zoom that follows it,
   in hours, days or years as the span needs. Opens on the book's week.
   Still: the slider sets what is shown, no clock runs.
===================================================================== */
(function () {
  const H = 500, d = sim('sim-decay', H);
  const HR = { day: 24, year: 8766 };
  const HALF = { tc: 6.01, u: 4.47e9 * HR.year };
  const WEEK = Math.log10(168);
  /* the unit a span of h hours is read in, as [hours per unit, axis word, phrase for n of them] */
  const unitOf = (h) => (h < 48 ? [1, 'hours', 'hours'] : h < 2 * HR.year ? [HR.day, 'days', 'days'] : h < 2e6 * HR.year ? [HR.year, 'years', 'years']
    : h < 2e9 * HR.year ? [1e6 * HR.year, 'millions of years', 'million years'] : [1e9 * HR.year, 'billions of years', 'billion years']);
  const two = (x) => (x < 10 ? fmt(x, 1) : x < 1000 ? fmt(x, 0) : fmt(x, 0));
  const span = (h) => { const [u, , w] = unitOf(h); return `${two(h / u)} ${w}`; };
  const t = ctl(d.controls, { label: '\\text{time shown}', cls: 'time', key: 'span', min: 0, max: 14, step: 0.005, value: WEEK, unit: '', fmt: (lg) => span(10 ** lg),
    aria: 'the span of time shown', detents: [{ v: WEEK, label: '1 week' }],
    specials: [{ at: Math.log10(HALF.tc), label: 'Tc-99m half-life' }, { at: Math.log10(HALF.u), label: 'U-238 half-life' }] });
  const left = (h) => 100 * Math.pow(0.5, h);
  /* a percentage as the headline writes it: whole near 100, one place above 1, two figures below, powers of ten under 0.01 */
  function pct(p) {
    if (p >= 99.95) return '100 %';
    if (p >= 1) return `${fmt(p, 1)} %`;
    if (p >= 0.01) return `${p.toPrecision(2)} %`;
    if (p < 1e-30) return '0 %';
    const e = Math.floor(Math.log10(p)), m = p / 10 ** e;
    return `${m.toFixed(1)} × 10${sup(e)} %`;
  }
  /* a number for the readout to three figures, in TeX */
  function sci(x) {
    if (x >= 0.9995 && x < 1) return '1.00';
    if (x >= 0.001 && x < 1000) return x.toPrecision(3);
    if (x < 1e-300) return '0';
    const e = Math.floor(Math.log10(x)), m = x / 10 ** e;
    return `${m.toFixed(2)}\\times 10^{${e}}`;
  }
  const G = { l: 170, r: 1300, t: 110, b: 400 };
  function draw() {
    const { ctx } = begin(d.c);
    const h = 10 ** t.v, [u, word] = unitOf(h), tc = F.ref('tc-99m'), ur = F.ref('u-238'), ct = C('time');
    const g = F.axes(ctx, G, [0, h / u], [0, 100], { nx: 7, ny: 5, nice: true, xl: `time (${word})`, xc: ct, yl: 'amount of isotope remaining (%)' });
    const iso = [['u', ur, 'U-238'], ['tc', tc, 'Tc-99m']];
    iso.forEach(([k, c]) => F.plot(ctx, g, (x) => left((x * u) / HALF[k]), c, { w: 5 }));
    /* a half-life inside the span, not crowded against the axis, is marked where its curve crosses 50 % */
    iso.forEach(([k, c]) => {
      const x = HALF[k] / u;
      if (x > (h / u) * 1.0001 || x < (h / u) * 0.02) return;
      line(ctx, g.X(x), g.Y(50), g.X(x), G.b, alpha(c, 0.7), 2.5, [4, 8]);
      line(ctx, G.l, g.Y(50), g.X(x), g.Y(50), alpha(c, 0.7), 2.5, [4, 8]);
      dot(ctx, g.X(x), g.Y(50), c, false, 10);
      const far = x > (h / u) * 0.75;
      F.label(ctx, 'half-life', g.X(x) - (far ? 56 : 0), g.Y(50), { side: far ? 'below' : 'right', size: 18, color: c, gap: far ? 24 : 18, leader: false });
    });
    F.legend(ctx, g, iso.map(([, c, s]) => ({ s, color: c, w: 5 })), { corner: 'above' });
    const [pt, pu] = [left(h / HALF.tc), left(h / HALF.u)];
    F.rich(ctx, ['After ', [span(h), ct], ', ', [pct(pt), tc], ' of the Tc-99m and ', [pct(pu), ur], ' of the U-238 remain.'], 700, 46, { size: 24, align: 'center' });
    const tt = (x) => `\\htmlClass{kv-time}{${sci(x)}\\ \\text{${word === 'hours' ? 'h' : word === 'days' ? 'd' : word === 'years' ? 'y' : word === 'millions of years' ? 'My' : 'Gy'}}}`;
    const row = (k, ref, name) => `\\htmlData{ref=${ref}}{\\text{${name}}}\\ \\text{remaining} = \\left(\\tfrac{1}{2}\\right)^{t/t_{1/2}} = \\left(\\tfrac{1}{2}\\right)^{${tt(h / u)}\\,/\\,${tt(HALF[k] / u)}} = ${sci(Math.pow(0.5, h / HALF[k]))}`;
    tex(d.readout, `${row('tc', 'tc-99m', 'Tc-99m')} \\\\ ${row('u', 'u-238', 'U-238')}`);
  }
  still(d, draw);
})();

/* =====================================================================
   FIGURE 16.4: an ideal gas expanding into a vacuum, drawn flat. Two
   round flasks of inner radius RB, centres OFF either side of the valve
   at (X0, Y0), joined by a tube of inner half-height HN; a stopcock plug
   PW wide either side of the axis closes the tube. Thirty argon atoms run
   straight and leave the glass in a random direction (9.4's bulbs).
   Closing the valve puts all thirty back in the left flask. Moving, on an
   endless clock. Beneath, the right flask's count against time over the
   last WIN seconds of the drawing's time, 0 to 30, the even split dashed.
===================================================================== */
(function () {
  const H = 780, d = sim('sim-gas-flasks', H);
  const X0 = 700, Y0 = 270, OFF = 290, RB = 175, HN = 44, RM = 13, PW = 32, N = 30, DS = 2, SPEED = 640, WIN = 40;
  const RI = RB - RM, HI = HN - RM;
  const valve = F.choice(d.controls, { label: '\\text{valve}', aria: 'the valve between the flasks', options: [{ value: 'closed', label: 'closed' }, { value: 'open', label: 'open' }],
    value: 'open', ms: 500, onInput: (v) => { if (v === 'closed') restart(); } });
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
      if (Math.abs(q.y) > HI - 1 && dl > RI - 0.5 && dr > RI - 0.5) leave(q, 0, -Math.sign(q.y));
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
  let P = [], clock = 0, trace = [];
  function restart() {
    P = []; clock = 0; trace = [[0, 0]];
    for (let i = 0; i < N; i++) { const [x, y] = place(P), h = Math.random() * TAU; P.push({ x, y, ux: Math.cos(h), uy: Math.sin(h), left: 0 }); }
  }
  const right = () => P.filter((q) => q.x > 0).length;
  function step(dt) {
    const W = walls();
    for (const q of P) { q.left += SPEED * dt; while (q.left >= DS) { q.left -= DS; move(q, DS, W); } }
    clock += dt;
    if (clock - trace[trace.length - 1][0] >= 0.1) { trace.push([clock, right()]); while (trace.length && trace[0][0] < clock - WIN - 1) trace.shift(); }
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
    ctx.lineWidth = 4; ctx.strokeStyle = PAL.ink; ctx.stroke();
    ctx.restore();
  }
  /* the stopcock from the side, as the book draws it: a tapered plug across the tube, its bore in line with the tube when
     open and seen end on when closed, a knob on a stem that turns flat along the tube when open */
  function stopcock(ctx, k) {
    const top = Y0 - HN - 18, bot = Y0 + HN + 18, wt = PW + 5, wb = PW - 3;
    const body = () => { ctx.beginPath(); ctx.moveTo(X0 - wt, top); ctx.lineTo(X0 + wt, top); ctx.lineTo(X0 + wb, bot); ctx.lineTo(X0 - wb, bot); ctx.closePath(); };
    ctx.save();
    ctx.fillStyle = PAL.panel; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.roundRect(X0 - 17, bot, 34, 14, 3); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.rect(X0 - 7, top - 18, 14, 18); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(X0, top - 28, 13 + 37 * k, 12 - 2 * k, 0, 0, TAU); ctx.fill(); ctx.stroke();
    body(); ctx.fill();
    ctx.save(); body(); ctx.clip();
    ctx.fillStyle = alpha(PAL.ink, 0.05); ctx.lineWidth = 2.5;
    if (k >= 1) { ctx.fillRect(X0 - wt, Y0 - HN, 2 * wt, 2 * HN); line(ctx, X0 - wt, Y0 - HN, X0 + wt, Y0 - HN, PAL.ink, 2.5); line(ctx, X0 - wt, Y0 + HN, X0 + wt, Y0 + HN, PAL.ink, 2.5); }
    else { ctx.beginPath(); ctx.ellipse(X0, Y0, 20 + (wt + 14 - 20) * k, 20 + (HN - 20) * k, 0, 0, TAU); ctx.fill(); ctx.stroke(); }
    ctx.restore();
    body(); ctx.stroke();
    ctx.restore();
  }
  const G = { l: 260, r: 1140, t: 560, b: 690 };
  tex(d.readout, '\\kwork = -\\kP\\kdV = 0 \\\\ \\kdU = \\kq + \\kwork = 0 + 0 = 0');
  function draw() {
    const { ctx } = begin(d.c), ar = F.el('Ar'), n = right();
    glassware(ctx);
    stopcock(ctx, turn());
    const fresh = valve.value === 'closed' ? valve.k : 1;
    ctx.save(); ctx.globalAlpha = fresh; ctx.fillStyle = ar; ctx.strokeStyle = alpha(PAL.ink, 0.55); ctx.lineWidth = 1.5;
    for (const q of P) { ctx.beginPath(); ctx.arc(X0 + q.x, Y0 + q.y, RM, 0, TAU); ctx.fill(); ctx.stroke(); }
    ctx.restore();
    F.label(ctx, 'valve', X0, Y0 - HN - 58, { side: 'above', size: 20, color: PAL.ink, gap: 16, leader: false });
    [[-1, N - n, 'left flask'], [1, n, 'right flask']].forEach(([s, c, w]) => F.rich(ctx, [w + ' ', [String(c), PAL.ink, 700]], X0 + s * OFF, Y0 + RB + 34, { size: 22, align: 'center' }));
    /* the trace: the right flask's count over the last WIN seconds */
    const t1 = Math.max(WIN, clock), g = F.axes(ctx, G, [t1 - WIN, t1], [0, 30], { nx: 0, ny: 2, xl: 'time', xc: C('time'), yl: 'atoms in the right flask' });
    line(ctx, G.l, g.Y(15), G.r, g.Y(15), alpha(PAL.ink, 0.45), 2.5, [10, 10]);
    text(ctx, 'even split', G.r + 12, g.Y(15), PAL.muted, { size: 17 });
    const pts = trace.filter(([s]) => s >= t1 - WIN);
    if (pts.length > 1) {
      ctx.save(); ctx.beginPath(); ctx.rect(G.l, G.t - 4, G.r - G.l, G.b - G.t + 8); ctx.clip();
      ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3.5; ctx.lineJoin = 'round'; ctx.beginPath();
      pts.forEach(([s, c], i) => (i ? ctx.lineTo(g.X(s), g.Y(c)) : ctx.moveTo(g.X(s), g.Y(c)))); ctx.stroke(); ctx.restore();
      const [s, c] = pts[pts.length - 1]; dot(ctx, g.X(s), g.Y(c), PAL.ink, true, 8);
    }
    topline(ctx, valve.value === 'closed'
      ? 'Valve closed: all 30 atoms are in the left flask, and the right flask holds a vacuum.'
      : `${n} of the 30 atoms ${n === 1 ? 'is' : 'are'} in the right flask.`);
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
