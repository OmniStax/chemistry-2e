/* Figures for section 13.1 Chemical Equilibria. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['13.1'] = function (root, F) {
const { fmt, tex, C, PAL, ctl, cycle, register, begin, line, dot, text, topline, axes, plot, legend, label, alpha } = F;
const TAU = 2 * Math.PI;
const NO2_BROWN = '#8b4a1c';                         /* the colour of nitrogen dioxide gas */
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;

/* =====================================================================
   FIGURE 13.2: a sealed tube of N₂O₄ ⇌ 2NO₂, its gas magnified to a
   circle of molecules, beside [N₂O₄] and [NO₂], every split and join
   ticked on the time axis, and the two rates. Flat (book rule: a particle
   picture is 3D only where turning shows something; here every molecule
   must be seen and none gains from a turn).
   The run starts from N₂O₄ alone (0.140 M, the book's case) or from NO₂
   alone (0.280 M, the same atoms), and the concentrations follow
   d[N₂O₄]/dt = −k_f[N₂O₄] + k_r[NO₂]². The circle splits an N₂O₄ each
   time ∫rate_f dt passes a multiple of Q = 0.010 M and joins the closest
   free pair of NO₂ each time ∫rate_r dt does (offset by half), so its
   counts keep to the curves and both kinds of event go on at equilibrium.
   Equilibrium is drawn from the moment the two rates stay within
   0.0005 M/s of each other, half a unit of the readout's last place; from
   then on the readout writes their mean for both.
   A run of TRUN model seconds is computed whole when a control moves.
   Axes fixed: t 0 to 8 s; concentration 0 to 0.30 M (all NO₂ is 0.28 M);
   rate 0 to 0.18 M/s (largest initial rates 1.20 × 0.140 = 0.168 M/s
   forward and 2.20 × 0.280² = 0.172 M/s reverse).
===================================================================== */
(function () {
  const d = F.sim(root, 'sim-n2o4-equilibrium', 730);
  const st = F.choice(d.controls, { label: '\\text{start with}', aria: 'the gas the tube starts with', options: [{ value: 'n2o4', label: 'N₂O₄' }, { value: 'no2', label: 'NO₂' }], value: 'n2o4', onInput: rerun });
  const kf = ctl(d.controls, { label: '\\kkf', cls: 'rate-constant', key: 'kf', min: 0.3, max: 1.2, step: 0.05, value: 0.6, unit: 's⁻¹', dec: 2, onInput: rerun, aria: 'forward rate constant in per second' });
  const kr = ctl(d.controls, { label: '\\kkr', cls: 'rate-constant', key: 'kr', min: 1, max: 2.2, step: 0.05, value: 1.4, unit: 'M⁻¹ s⁻¹', dec: 2, onInput: rerun, aria: 'reverse rate constant in per molar per second' });

  /* the magnified circle and the tube, in canvas units */
  const CX = 362, CY = 392, CR = 250, RI = CR - 4, TX = 66, TT = 200, TB = 600, TW = 54, RX = TX, RY = 396, RR = 34;
  /* each molecule's atoms [element, dx, dy, r], space-filling as the book draws them; rc its collision radius */
  const MOLS = {
    A: { M: 92.01, rc: 35, name: 'dinitrogen tetroxide, N₂O₄', atoms: [['O', -22, -12.5, 11.5], ['O', -22, 12.5, 11.5], ['O', 22, -12.5, 11.5], ['O', 22, 12.5, 11.5], ['N', -10, 0, 12], ['N', 10, 0, 12]] },
    B: { M: 46.01, rc: 25, name: 'nitrogen dioxide, NO₂', atoms: [['O', -15, 7, 11.5], ['O', 15, 7, 11.5], ['N', 0, -3.5, 12]] },
  };
  const Q = 0.01, N0 = 14, A0 = N0 * Q, TRUN = 8, PLAY = 1.4, DT = 1 / 60, NF = Math.round(TRUN / DT), GLIDE = 320, HALF = 18, FLASH = 0.55, TOL = 0.0005;
  const rng = (seed) => () => { seed = (seed + 0x6D2B79F5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  const inside = (p, r) => { const dx = p[0] - CX, dy = p[1] - CY, q = Math.hypot(dx, dy), lim = RI - r; return q <= lim ? p : [CX + (dx / q) * lim, CY + (dy / q) * lim]; };
  const smooth = F.ease.smooth;

  /* one run: the concentrations every frame, every molecule's place and turn every frame, and every split and join */
  function simulate() {
    const f1 = kf.v, r1 = kr.v, fromA = st.value === 'n2o4', rnd = rng(fromA ? 11 : 29);
    const gauss = () => { let a = 0; while (!a) a = rnd(); return Math.sqrt(-2 * Math.log(a)) * Math.cos(TAU * rnd()); };
    const kick = (M) => [gauss() * 110 * Math.sqrt(46 / M), gauss() * 110 * Math.sqrt(46 / M)];
    const A = new Float64Array(NF + 1), B = new Float64Array(NF + 1), frames = [];
    let a = fromA ? A0 : 0, b = fromA ? 0 : 2 * A0, cf = 0, cr = 0, uid = 0;
    const mols = [];
    const add = (kind, x, u, th) => { const m = { id: uid++, kind, x, u, th, w: (rnd() - 0.5) * 3, glide: null }; mols.push(m); return m; };
    const K0 = fromA ? 'A' : 'B', n0 = fromA ? N0 : 2 * N0, sep = 2 * MOLS[K0].rc + 6;
    for (let i = 0; i < n0; i++) {
      let p, tries = 0;
      do { const rr = Math.sqrt(rnd()) * (RI - MOLS[K0].rc - 2), aa = rnd() * TAU; p = [CX + rr * Math.cos(aa), CY + rr * Math.sin(aa)]; tries++; }
      while (tries < 400 && mols.some((m) => Math.hypot(m.x[0] - p[0], m.x[1] - p[1]) < sep));
      add(K0, p, kick(MOLS[K0].M), rnd() * TAU);
    }
    let splits = 0, joins = 0;
    const events = [];
    for (let f = 0; f <= NF; f++) {
      const t = f * DT;
      A[f] = a; B[f] = b;
      frames.push(mols.map((m) => [m.kind, m.x[0], m.x[1], m.th, m.id]));
      if (f === NF) break;
      /* concentrations, midpoint step */
      const da = (x, y) => -f1 * x + r1 * y * y;
      const ka = da(a, b), am = a + ka * DT / 2, bm = b - 2 * ka * DT / 2, kb = da(am, bm);
      cf += f1 * am * DT; cr += r1 * bm * bm * DT; a += kb * DT; b -= 2 * kb * DT;
      /* splits: an N₂O₄ breaks at its N–N bond into two NO₂ that fly apart */
      while (splits < Math.floor(cf / Q + 1e-9)) {
        const pool = mols.filter((m) => m.kind === 'A');
        if (!pool.length) break;
        const m = pool[Math.floor(rnd() * pool.length)], c = Math.cos(m.th), s = Math.sin(m.th);
        mols.splice(mols.indexOf(m), 1);
        const made = [1, -1].map((sg) => add('B', inside([m.x[0] + sg * HALF * c, m.x[1] + sg * HALF * s], MOLS.B.rc), [m.u[0] + sg * 70 * c, m.u[1] + sg * 70 * s], m.th + (sg > 0 ? Math.PI / 2 : -Math.PI / 2)));
        splits++; events.push({ t: t + DT, kind: 'split', ids: made.map((w) => w.id), x: m.x[0], y: m.x[1] });
      }
      /* joins: the closest free pair of NO₂ glides together and becomes one N₂O₄ */
      while (joins < Math.floor(cr / Q + 0.5)) {
        const free = mols.filter((m) => m.kind === 'B' && !m.glide);
        if (free.length < 2) break;
        let best = null, bd = Infinity;
        for (let i = 0; i < free.length; i++) for (let j = i + 1; j < free.length; j++) {
          const dd = Math.hypot(free[i].x[0] - free[j].x[0], free[i].x[1] - free[j].x[1]);
          if (dd < bd) { bd = dd; best = [free[i], free[j]]; }
        }
        const mid = inside([(best[0].x[0] + best[1].x[0]) / 2, (best[0].x[1] + best[1].x[1]) / 2], MOLS.B.rc + HALF + 2), n = Math.max(9, Math.round(bd / GLIDE / DT));
        const ax = Math.atan2(best[1].x[1] - best[0].x[1], best[1].x[0] - best[0].x[0]);
        best.forEach((m, i) => {
          const sg = i === 0 ? -1 : 1;
          m.glide = { from: m.x.slice(), to: [mid[0] + sg * HALF * Math.cos(ax), mid[1] + sg * HALF * Math.sin(ax)], th0: m.th, th1: ax + (sg > 0 ? Math.PI / 2 : -Math.PI / 2), mid, ax, f0: f, n, mate: best[1 - i] };
        });
        joins++;
      }
      /* motion: straight flights, a turn as they go, bounces off the inside of the circle */
      for (const m of mols) {
        if (m.glide) {
          const g = m.glide, k = smooth(Math.min(1, (f + 1 - g.f0) / g.n));
          m.x = [g.from[0] + (g.to[0] - g.from[0]) * k, g.from[1] + (g.to[1] - g.from[1]) * k];
          let dth = ((g.th1 - g.th0) % TAU + TAU + Math.PI) % TAU - Math.PI; m.th = g.th0 + dth * k; continue;
        }
        const r = MOLS[m.kind].rc;
        m.x[0] += m.u[0] * DT; m.x[1] += m.u[1] * DT; m.th += m.w * DT;
        const dx = m.x[0] - CX, dy = m.x[1] - CY, q = Math.hypot(dx, dy);
        if (q > RI - r) { const nx = dx / q, ny = dy / q, dd = m.u[0] * nx + m.u[1] * ny; if (dd > 0) { m.u[0] -= 2 * dd * nx; m.u[1] -= 2 * dd * ny; } m.x = [CX + nx * (RI - r), CY + ny * (RI - r)]; }
      }
      const done = mols.filter((m) => m.glide && f + 1 - m.glide.f0 >= m.glide.n && mols.indexOf(m) < mols.indexOf(m.glide.mate));
      done.forEach((m) => {
        const w = m.glide.mate, u = [(m.u[0] + w.u[0]) / 2, (m.u[1] + w.u[1]) / 2];
        mols.splice(mols.indexOf(m), 1); mols.splice(mols.indexOf(w), 1);
        const made = add('A', m.glide.mid.slice(), u, m.glide.ax);
        events.push({ t: t + DT, kind: 'join', ids: [made.id], x: made.x[0], y: made.x[1] });
      });
      /* elastic bounces between molecules that are not gliding */
      const live = mols.filter((m) => !m.glide);
      for (let i = 0; i < live.length; i++) for (let j = i + 1; j < live.length; j++) {
        const p = live[i], q = live[j], dx = q.x[0] - p.x[0], dy = q.x[1] - p.x[1], r = Math.hypot(dx, dy);
        if (r === 0 || r >= MOLS[p.kind].rc + MOLS[q.kind].rc) continue;
        const nx = dx / r, ny = dy / r, vn = (q.u[0] - p.u[0]) * nx + (q.u[1] - p.u[1]) * ny;
        if (vn >= 0) continue;
        const mp = MOLS[p.kind].M, mq = MOLS[q.kind].M;
        p.u[0] += ((2 * mq) / (mp + mq)) * vn * nx; p.u[1] += ((2 * mq) / (mp + mq)) * vn * ny;
        q.u[0] -= ((2 * mp) / (mp + mq)) * vn * nx; q.u[1] -= ((2 * mp) / (mp + mq)) * vn * ny;
      }
    }
    /* equilibrium: from the frame after which the two rates stay within TOL of each other */
    let teq = Infinity;
    for (let f = NF; f >= 0; f--) { if (Math.abs(f1 * A[f] - r1 * B[f] * B[f]) >= TOL) break; teq = f * DT; }
    return { A, B, frames, events, teq, f1, r1, fromA, n0 };
  }
  const cy = cycle(() => TRUN, 1.2);
  let run = simulate(), hits = [];
  function rerun() { run = simulate(); cy.reset(); }
  F.hover(d.stage, () => hits);
  /*TEST*/ d.fig.__run = () => run;

  function molecule(ctx, kind, x, y, th, s = 1) {
    const c = Math.cos(th), sn = Math.sin(th);
    MOLS[kind].atoms.forEach(([e, dx, dy, r]) => {
      ctx.save(); ctx.fillStyle = F.el(e); ctx.strokeStyle = alpha(PAL.ink, 0.55); ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.arc(x + s * (dx * c - dy * sn), y + s * (dx * sn + dy * c), r * s, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore();
    });
  }
  const ring = (ctx, x, y, r, color, w = 4) => { ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = w; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.stroke(); ctx.restore(); };
  /* the outer tangents of the ring on the tube and the magnified circle: the two lines of the magnifier */
  function tangents() {
    const dx = CX - RX, dy = CY - RY, D = Math.hypot(dx, dy), base = Math.atan2(dy, dx), g = Math.acos((RR - CR) / D);
    return [base + g, base - g].map((a) => [RX + RR * Math.cos(a), RY + RR * Math.sin(a), CX + CR * Math.cos(a), CY + CR * Math.sin(a)]);
  }
  /* the sealed tube: a glass ampoule drawn off to a closed tip, round at the bottom */
  function tubePath(ctx) {
    const h = TW / 2;
    ctx.beginPath(); ctx.moveTo(TX - h, TT + 52); ctx.bezierCurveTo(TX - h, TT + 18, TX - 7, TT + 22, TX - 7, TT - 6); ctx.lineTo(TX - 6, TT - 34); ctx.arc(TX, TT - 34, 6, Math.PI, 0);
    ctx.lineTo(TX + 7, TT - 6); ctx.bezierCurveTo(TX + 7, TT + 22, TX + h, TT + 18, TX + h, TT + 52); ctx.lineTo(TX + h, TB - h); ctx.arc(TX, TB - h, h, 0, Math.PI); ctx.closePath();
  }
  /* a curve's name beside its newest point, ahead of the curve; two names never closer than GAP */
  function names(ctx, ax, x, items) {
    const GAP = 34, ys = items.map((it) => Math.min(ax.box.b - 14, Math.max(ax.box.t + 14, it.y)));
    if (Math.abs(ys[1] - ys[0]) < GAP) { const m = Math.min(ax.box.b - 14 - GAP / 2, Math.max(ax.box.t + 14 + GAP / 2, (ys[0] + ys[1]) / 2)), sg = items[0].over ? -1 : 1; ys[0] = m + sg * GAP / 2; ys[1] = m - sg * GAP / 2; }
    items.forEach((it, i) => text(ctx, it.s, x + 18, ys[i], it.color, { size: 20, weight: 600, tex: true, bg: PAL.panel }));
  }

  function draw() {
    const { ctx } = begin(d.c);
    const t = cy.now(), f = Math.min(NF, Math.round(t / DT)), { A, B, teq, f1, r1, fromA, n0 } = run;
    const eq = t >= teq;
    const cn = F.ref('n2o4'), co = F.ref('no2'), cfw = F.ref('forward'), crv = F.ref('reverse');
    const seen = run.events.filter((e) => e.t <= t + 1e-9);
    const count = (list, kind) => list.filter((e) => e.kind === kind).length;
    const pl = (n, one, many) => n + ' ' + (n === 1 ? one : many);
    const said = (list) => pl(count(list, 'split'), 'N₂O₄ has', 'N₂O₄ have') + ' split and ' + pl(count(list, 'join'), 'pair of NO₂ has', 'pairs of NO₂ have') + ' joined';
    const lines = topline(ctx, t < DT / 2 ? 'At $\\kt = 0$ the tube holds only ' + (fromA ? 'N₂O₄' : 'NO₂') + ', ' + n0 + ' molecules in the circle.'
      : eq ? 'At equilibrium: since $\\kt = ' + fmt(teq, 1) + '\\ \\text{s}$, ' + said(seen.filter((e) => e.t > teq)) + '.'
        : 'Pre-equilibrium: ' + said(seen) + '.');

    /* the sealed tube, its gas as brown as the NO₂ in it */
    const brown = F.fact(NO2_BROWN), tint = 0.03 + 0.82 * Math.min(1, B[f] / (2 * A0));
    ctx.save(); tubePath(ctx); ctx.fillStyle = PAL.panel; ctx.fill(); ctx.fillStyle = alpha(brown, tint); ctx.fill(); ctx.strokeStyle = alpha(PAL.ink, 0.75); ctx.lineWidth = 3.5; ctx.stroke(); ctx.restore();
    line(ctx, TX - TW / 2 + 11, TT + 64, TX - TW / 2 + 11, TB - TW / 2 - 6, alpha(PAL.panel, 0.55), 6);   /* the light along the glass */
    label(ctx, 'sealed tube', TX, TB + 26, { side: 'below', size: 17, gap: 0, weight: 400, color: PAL.muted });

    /* the magnifier: a ring on the tube, two lines out to the circle */
    tangents().forEach(([x1, y1, x2, y2]) => line(ctx, x1, y1, x2, y2, alpha(PAL.ink, 0.35), 2));
    ring(ctx, RX, RY, RR, alpha(PAL.ink, 0.6), 2.5);
    ctx.save(); ctx.fillStyle = PAL.panel; ctx.beginPath(); ctx.arc(CX, CY, CR, 0, TAU); ctx.fill(); ctx.fillStyle = alpha(brown, tint * 0.22); ctx.fill(); ctx.restore();

    /* the molecules, clipped to the circle, and a ring spreading from each split and each join just made */
    hits = [];
    const now = run.frames[f];
    ctx.save(); ctx.beginPath(); ctx.arc(CX, CY, RI, 0, TAU); ctx.clip();
    now.forEach(([kind, x, y, th]) => { molecule(ctx, kind, x, y, th); hits.push({ x, y, r: MOLS[kind].rc, name: MOLS[kind].name }); });
    seen.filter((e) => t - e.t < FLASH).forEach((e) => {
      const k = (t - e.t) / FLASH, at = now.filter((m) => e.ids.includes(m[4]));
      const x = at.length === e.ids.length ? at.reduce((s, m) => s + m[1], 0) / at.length : e.x, y = at.length === e.ids.length ? at.reduce((s, m) => s + m[2], 0) / at.length : e.y;
      ctx.save(); ctx.globalAlpha = 1 - k * k; ring(ctx, x, y, MOLS.A.rc + 4 + 24 * F.ease.out(k), e.kind === 'split' ? cfw : crv, 5); ctx.restore();
    });
    ctx.restore();
    ring(ctx, CX, CY, CR, alpha(PAL.ink, 0.75), 3);
    hits.push({ x: TX, y: (TT + TB) / 2, r: 34, name: 'the sealed tube; its gas is as brown as the NO₂ in it' });
    legend(ctx, { l: CX - CR - 30, r: CX + CR + 30, t: CY + CR + 8, b: CY + CR + 50 }, [
      { s: '$\\text{N}_2\\text{O}_4$', draw: (c, x, y) => molecule(c, 'A', x, y, 0, 0.6) },
      { s: '$\\text{NO}_2$', draw: (c, x, y) => molecule(c, 'B', x, y, 0, 0.6) },
      { s: 'a split', draw: (c, x, y) => ring(c, x, y, 9, cfw, 4) },
      { s: 'a join', draw: (c, x, y) => ring(c, x, y, 9, crv, 4) },
    ], { corner: 'top', row: true, panel: false });

    /* the graphs, drawn up to the clock, the stretch at equilibrium shaded */
    const at = (arr) => (s) => { const g = Math.min(NF, s / DT), i = Math.floor(g), k = g - i; return i >= NF ? arr[NF] : arr[i] + (arr[i + 1] - arr[i]) * k; };
    const cA = at(A), cB = at(B), rf = (s) => f1 * cA(s), rr = (s) => r1 * cB(s) * cB(s);
    const GL = 770, GR = 1250, top = 142 + (lines > 1 ? 20 : 0), TY = [392, 422];
    const g1 = axes(ctx, { l: GL, r: GR, t: top, b: 332 }, [0, TRUN], [0, 0.3], { nx: 4, ny: 3, fy: (q) => fmt(q, 2), yl: 'concentration (M)', yc: C('concentration') });
    const g2 = axes(ctx, { l: GL, r: GR, t: 488, b: 678 }, [0, TRUN], [0, 0.18], { nx: 4, ny: 3, fy: (q) => fmt(q, 2), xl: 'time t (s)', xc: C('time'), yl: 'rate (M/s)', yc: C('rate') });
    if (eq) {
      const xe = g1.X(teq);
      [g1, g2].forEach(({ box }) => { ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.07); ctx.fillRect(xe, box.t, box.r - xe, box.b - box.t); ctx.restore(); });
      line(ctx, xe, g1.box.t, xe, g2.box.b, alpha(PAL.ink, 0.55), 2, [10, 10]);
      const room = GR - xe > 210;   /* a late equilibrium leaves a narrow stretch: the words stand left of the line */
      text(ctx, 'equilibrium achieved', room ? (xe + GR) / 2 : xe - 12, g1.box.t + 18, PAL.muted, { size: 17, align: room ? 'center' : 'right', bg: PAL.panel });
    }
    if (t > 0.01) { plot(ctx, g1, cA, cn, { w: 5, x: [0, t] }); plot(ctx, g1, cB, co, { w: 5, x: [0, t] }); }
    dot(ctx, g1.X(t), g1.Y(cA(t)), cn, true, 9); dot(ctx, g1.X(t), g1.Y(cB(t)), co, true, 9);
    names(ctx, g1, g1.X(t), [{ s: '$\\text{N}_2\\text{O}_4$', y: g1.Y(cA(t)), color: cn, over: cA(t) >= cB(t) }, { s: '$\\text{NO}_2$', y: g1.Y(cB(t)), color: co }]);

    /* every split and every join so far, a tick at its time: the closer the ticks, the greater the rate */
    [['splits', 'split', cfw], ['joins', 'join', crv]].forEach(([s, kind, color], i) => {
      line(ctx, GL, TY[i], GR, TY[i], alpha(PAL.ink, 0.18), 1.5);
      seen.forEach((e) => { if (e.kind === kind) line(ctx, g1.X(e.t), TY[i] - 10, g1.X(e.t), TY[i] + 10, color, 3.5); });
      text(ctx, s, GL - 14, TY[i], color, { size: 18, weight: 600, align: 'right' });
    });

    /* the forward rate dashed over the reverse, so both show where they run together */
    if (t > 0.01) { plot(ctx, g2, rr, crv, { w: 5, x: [0, t] }); plot(ctx, g2, rf, cfw, { w: 5, x: [0, t], dash: [10, 10] }); }
    dot(ctx, g2.X(t), g2.Y(rr(t)), crv, true, 9); dot(ctx, g2.X(t), g2.Y(rf(t)), cfw, true, 9);
    names(ctx, g2, g2.X(t), [{ s: '$\\kkf[\\text{N}_2\\text{O}_4]$', y: g2.Y(rf(t)), color: cfw, over: fromA }, { s: '$\\kkr[\\text{NO}_2]^2$', y: g2.Y(rr(t)), color: crv }]);

    const both = (rf(t) + rr(t)) / 2;
    const ca = fmt(cA(t), 3), cb = fmt(cB(t), 3), sf = fmt(eq ? both : rf(t), 3), sr = fmt(eq ? both : rr(t), 3);
    tex(d.readout, `\\kratef = \\kkf[\\text{N}_2\\text{O}_4] = (${hue('rate-constant', fmt(f1, 2) + '\\ \\text{s}^{-1}')})(${hue('concentration', ca + '\\ \\text{M}')}) = ${hue('rate', sf + '\\ \\text{M/s}')}`
      + ` \\\\ \\krater = \\kkr[\\text{NO}_2]^2 = (${hue('rate-constant', fmt(r1, 2) + '\\ \\text{M}^{-1}\\,\\text{s}^{-1}')})(${hue('concentration', cb + '\\ \\text{M}')})^2 = ${hue('rate', sr + '\\ \\text{M/s}')}`);
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => PLAY), draw });
})();
};
