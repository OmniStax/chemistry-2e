/* Figures for section 13.1 Chemical Equilibria. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['13.1'] = function (root, F) {
const { fmt, tex, C, PAL, ctl, cycle, register, begin, line, dot, text, topline, axes, plot, legend, label, alpha } = F;
const TAU = 2 * Math.PI;
const NO2_BROWN = '#8b4a1c';                         /* the colour of nitrogen dioxide gas */
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;

/* =====================================================================
   FIGURE 13.2: a sealed tube of N₂O₄ ⇌ 2NO₂, its gas magnified to a
   circle of molecules, beside [N₂O₄], [NO₂] and the two rates against t.
   Flat (book rule: a particle picture is 3D only where turning shows
   something; here every molecule must be seen and none gains from a turn).
   The concentrations follow d[N₂O₄]/dt = −k_f[N₂O₄] + k_r[NO₂]² from
   [N₂O₄]₀ = 0.140 M; the circle splits an N₂O₄ each time ∫rate_f dt passes
   a multiple of Q = 0.010 M and joins the closest free pair of NO₂ each
   time ∫rate_r dt does (offset by half), so its counts stay within a
   molecule of the curves and both kinds of event go on at equilibrium.
   A run of TRUN model seconds is computed whole when a slider moves.
   Axes fixed: t 0 to 8 s; concentration 0 to 0.30 M (all NO₂ is 0.28 M);
   rate 0 to 0.18 M/s (largest initial rate 1.20 × 0.140 = 0.168 M/s).
===================================================================== */
(function () {
  const d = F.sim(root, 'sim-n2o4-equilibrium', 600);
  const kf = ctl(d.controls, { label: '\\kkf', cls: 'rate-constant', key: 'kf', min: 0.1, max: 1.2, step: 0.05, value: 0.6, unit: 's⁻¹', dec: 2, onInput: rerun, aria: 'forward rate constant in per second' });
  const kr = ctl(d.controls, { label: '\\kkr', cls: 'rate-constant', key: 'kr', min: 1, max: 3, step: 0.01, value: 1.41, unit: 'M⁻¹ s⁻¹', dec: 2, onInput: rerun, aria: 'reverse rate constant in per molar per second' });

  /* the magnified circle and the tube, in canvas units */
  const CX = 360, CY = 330, CR = 205, RI = CR - 4, TX = 92, TT = 150, TB = 520, TW = 40, RX = TX, RY = 335, RR = 26;
  /* each molecule's atoms [element, dx, dy, r], space-filling as the book draws them; rc its collision radius */
  const MOLS = {
    A: { M: 92.01, rc: 30, name: 'dinitrogen tetroxide, N₂O₄', atoms: [['O', -19, -11, 10], ['O', -19, 11, 10], ['O', 19, -11, 10], ['O', 19, 11, 10], ['N', -8.5, 0, 10.5], ['N', 8.5, 0, 10.5]] },
    B: { M: 46.01, rc: 22, name: 'nitrogen dioxide, NO₂', atoms: [['O', -13, 6, 10], ['O', 13, 6, 10], ['N', 0, -3, 10.5]] },
  };
  const Q = 0.01, N0 = 14, A0 = N0 * Q, TRUN = 8, PLAY = 1.4, DT = 1 / 60, NF = Math.round(TRUN / DT), GLIDE = 260;
  const gauss = () => { let a = 0; while (!a) a = Math.random(); return Math.sqrt(-2 * Math.log(a)) * Math.cos(TAU * Math.random()); };
  const kick = (M) => [gauss() * 110 * Math.sqrt(46 / M), gauss() * 110 * Math.sqrt(46 / M)];
  const inside = (p, r) => { const dx = p[0] - CX, dy = p[1] - CY, q = Math.hypot(dx, dy), lim = RI - r; return q <= lim ? p : [CX + (dx / q) * lim, CY + (dy / q) * lim]; };
  const smooth = F.ease.smooth;

  /* one run: the concentrations every frame, and every molecule's place and turn every frame */
  function simulate() {
    const f1 = kf.v, r1 = kr.v;
    const A = new Float64Array(NF + 1), B = new Float64Array(NF + 1), frames = [];
    let a = A0, b = 0, cf = 0, cr = 0, uid = 0;
    const mols = [];
    const add = (kind, x, u, th) => { const m = { id: uid++, kind, x, u, th, w: (Math.random() - 0.5) * 3, glide: null }; mols.push(m); return m; };
    for (let i = 0; i < N0; i++) {
      let p, tries = 0;
      do { const rr = Math.sqrt(Math.random()) * (RI - 30), aa = Math.random() * TAU; p = [CX + rr * Math.cos(aa), CY + rr * Math.sin(aa)]; tries++; }
      while (tries < 200 && mols.some((m) => Math.hypot(m.x[0] - p[0], m.x[1] - p[1]) < 72));
      add('A', p, kick(MOLS.A.M), Math.random() * TAU);
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
        const m = pool[Math.floor(Math.random() * pool.length)], c = Math.cos(m.th), s = Math.sin(m.th);
        mols.splice(mols.indexOf(m), 1);
        [1, -1].forEach((sg) => add('B', inside([m.x[0] + sg * 16 * c, m.x[1] + sg * 16 * s], MOLS.B.rc), [m.u[0] + sg * 70 * c, m.u[1] + sg * 70 * s], m.th + (sg > 0 ? Math.PI / 2 : -Math.PI / 2)));
        splits++; events.push({ t: t + DT, kind: 'split' });
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
        const mid = [(best[0].x[0] + best[1].x[0]) / 2, (best[0].x[1] + best[1].x[1]) / 2], n = Math.max(12, Math.round(bd / GLIDE / DT));
        const ax = Math.atan2(best[1].x[1] - best[0].x[1], best[1].x[0] - best[0].x[0]);
        best.forEach((m, i) => {
          const sg = i === 0 ? -1 : 1;
          m.glide = { from: m.x.slice(), to: [mid[0] + sg * 16 * Math.cos(ax), mid[1] + sg * 16 * Math.sin(ax)], th0: m.th, th1: ax + (sg > 0 ? Math.PI / 2 : -Math.PI / 2), mid, ax, f0: f, n, mate: best[1 - i] };
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
        add('A', inside(m.glide.mid.slice(), MOLS.A.rc), u, m.glide.ax);
        events.push({ t: t + DT, kind: 'join' });
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
    /* equilibrium: the first time the two rates agree to the readout's three decimals, and stay so */
    let teq = Infinity;
    for (let f = NF; f >= 0; f--) { if (fmt(f1 * A[f], 3) !== fmt(r1 * B[f] * B[f], 3)) break; teq = f * DT; }
    return { A, B, frames, events, teq, f1, r1 };
  }
  const cy = cycle(() => TRUN, 1.2);
  let run = simulate(), hits = [];
  function rerun() { run = simulate(); cy.reset(); }
  F.hover(d.stage, () => hits);

  function molecule(ctx, kind, x, y, th, s = 1) {
    const c = Math.cos(th), sn = Math.sin(th);
    MOLS[kind].atoms.forEach(([e, dx, dy, r]) => {
      ctx.save(); ctx.fillStyle = F.el(e); ctx.strokeStyle = alpha(PAL.ink, 0.55); ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.arc(x + s * (dx * c - dy * sn), y + s * (dx * sn + dy * c), r * s, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore();
    });
  }
  /* the outer tangents of the ring on the tube and the magnified circle: the two lines of the magnifier */
  function tangents() {
    const dx = CX - RX, dy = CY - RY, D = Math.hypot(dx, dy), base = Math.atan2(dy, dx), g = Math.acos((RR - CR) / D);
    return [base + g, base - g].map((a) => [RX + RR * Math.cos(a), RY + RR * Math.sin(a), CX + CR * Math.cos(a), CY + CR * Math.sin(a)]);
  }

  function draw() {
    const { ctx } = begin(d.c);
    const t = cy.now(), f = Math.min(NF, Math.round(t / DT)), { A, B, teq, f1, r1 } = run;
    const eq = t >= teq;
    const seen = run.events.filter((e) => e.t <= t + 1e-9), nS = seen.filter((e) => e.kind === 'split').length, nJ = seen.length - nS;
    const pl = (n, one, many) => n + ' ' + (n === 1 ? one : many);
    const lines = topline(ctx, t < DT / 2 ? 'At $\\kt = 0$ the tube holds only N₂O₄: ' + N0 + ' molecules in the circle and no NO₂.'
      : (eq ? 'At equilibrium: ' : 'Pre-equilibrium: ') + pl(nS, 'N₂O₄ has', 'N₂O₄ have') + ' split and ' + pl(nJ, 'pair', 'pairs') + ' of NO₂ ' + (nJ === 1 ? 'has' : 'have') + ' joined' + (eq ? ', and both go on.' : '.'));

    /* the sealed tube, its gas as brown as the NO₂ in it */
    const brown = F.fact(NO2_BROWN), tint = 0.04 + 0.8 * Math.min(1, B[f] / (2 * A0));
    const tube = () => { ctx.beginPath(); ctx.moveTo(TX - TW / 2, TT + 34); ctx.quadraticCurveTo(TX - TW / 2, TT + 8, TX - 6, TT); ctx.lineTo(TX - 3, TT - 26); ctx.arc(TX, TT - 26, 3, Math.PI, 0); ctx.lineTo(TX + 6, TT); ctx.quadraticCurveTo(TX + TW / 2, TT + 8, TX + TW / 2, TT + 34); ctx.lineTo(TX + TW / 2, TB - TW / 2); ctx.arc(TX, TB - TW / 2, TW / 2, 0, Math.PI); ctx.closePath(); };
    ctx.save(); tube(); ctx.fillStyle = alpha(brown, tint); ctx.fill(); ctx.strokeStyle = alpha(PAL.ink, 0.7); ctx.lineWidth = 3; ctx.stroke(); ctx.restore();
    label(ctx, 'sealed tube', TX, TB + 24, { side: 'below', size: 17, gap: 0, weight: 400, color: PAL.muted });

    /* the magnifier: a ring on the tube, two lines out to the circle */
    tangents().forEach(([x1, y1, x2, y2]) => line(ctx, x1, y1, x2, y2, alpha(PAL.ink, 0.35), 2));
    ctx.save(); ctx.strokeStyle = alpha(PAL.ink, 0.6); ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(RX, RY, RR, 0, TAU); ctx.stroke(); ctx.restore();
    ctx.save(); ctx.fillStyle = PAL.panel; ctx.beginPath(); ctx.arc(CX, CY, CR, 0, TAU); ctx.fill(); ctx.fillStyle = alpha(brown, tint * 0.25); ctx.fill(); ctx.restore();

    /* the molecules, clipped to the circle */
    hits = [];
    ctx.save(); ctx.beginPath(); ctx.arc(CX, CY, RI, 0, TAU); ctx.clip();
    run.frames[f].forEach(([kind, x, y, th]) => { molecule(ctx, kind, x, y, th); hits.push({ x, y, r: MOLS[kind].rc, name: MOLS[kind].name }); });
    ctx.restore();
    ctx.save(); ctx.strokeStyle = alpha(PAL.ink, 0.75); ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(CX, CY, CR, 0, TAU); ctx.stroke(); ctx.restore();
    hits.push({ x: TX, y: (TT + TB) / 2, r: 30, name: 'the sealed tube of gas' });
    legend(ctx, { l: CX - CR, r: CX + CR, t: CY + CR + 8, b: CY + CR + 50 }, [
      { s: 'N₂O₄', draw: (c, x, y) => molecule(c, 'A', x, y, 0, 0.7) },
      { s: 'NO₂', draw: (c, x, y) => molecule(c, 'B', x, y, 0, 0.7) },
    ], { corner: 'top', row: true, panel: false });

    /* the two graphs, drawn up to the clock, the stretch at equilibrium shaded */
    const at = (arr) => (s) => { const g = Math.min(NF, s / DT), i = Math.floor(g), k = g - i; return i >= NF ? arr[NF] : arr[i] + (arr[i + 1] - arr[i]) * k; };
    const cA = at(A), cB = at(B), rf = (s) => f1 * cA(s), rr = (s) => r1 * cB(s) * cB(s);
    const shade = (ax) => {
      if (!eq) return;
      const { box, X } = ax;
      ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.07); ctx.fillRect(X(teq), box.t, box.r - X(teq), box.b - box.t); ctx.restore();
      line(ctx, X(teq), box.t, X(teq), box.b, alpha(PAL.ink, 0.55), 2, [10, 10]);
      const room = box.r - X(teq) > 210;   /* a late equilibrium leaves a narrow stretch: the words stand left of the line */
      text(ctx, 'equilibrium achieved', room ? (X(teq) + box.r) / 2 : X(teq) - 12, box.t + 18, PAL.muted, { size: 17, align: room ? 'center' : 'right', bg: PAL.panel });
    };
    const top = 120 + (lines > 1 ? 26 : 0);
    const g1 = axes(ctx, { l: 690, r: 1340, t: top, b: 300 }, [0, TRUN], [0, 0.3], { nx: 4, ny: 3, fy: (q) => fmt(q, 2), yl: 'concentration (M)', yc: C('concentration') });
    shade(g1);
    const cn = F.ref('n2o4'), co = F.ref('no2'), cfw = F.ref('forward'), crv = F.ref('reverse');
    if (t > 0.01) { plot(ctx, g1, cA, cn, { w: 5, x: [0, t] }); plot(ctx, g1, cB, co, { w: 5, x: [0, t] }); }
    dot(ctx, g1.X(t), g1.Y(cA(t)), cn, true, 9); dot(ctx, g1.X(t), g1.Y(cB(t)), co, true, 9);
    legend(ctx, g1, [{ s: '$[\\text{N}_2\\text{O}_4]$', color: cn, w: 5, f: cA }, { s: '$[\\text{NO}_2]$', color: co, w: 5, f: cB }], { corner: 'above' });

    const g2 = axes(ctx, { l: 690, r: 1340, t: 390, b: 540 }, [0, TRUN], [0, 0.18], { nx: 4, ny: 3, fy: (q) => fmt(q, 2), xl: 'time t (s)', xc: C('time'), yl: 'rate (M/s)', yc: C('rate') });
    shade(g2);
    if (t > 0.01) { plot(ctx, g2, rf, cfw, { w: 5, x: [0, t] }); plot(ctx, g2, rr, crv, { w: 5, x: [0, t] }); }
    dot(ctx, g2.X(t), g2.Y(rf(t)), cfw, true, 9); dot(ctx, g2.X(t), g2.Y(rr(t)), crv, true, 9);
    legend(ctx, g2, [{ s: '$\\kkf[\\text{N}_2\\text{O}_4]$', color: cfw, w: 5, f: rf }, { s: '$\\kkr[\\text{NO}_2]^2$', color: crv, w: 5, f: rr }], { corner: 'above' });

    const ca = fmt(cA(t), 3), cb = fmt(cB(t), 3), sf = fmt(rf(t), 3), sr = fmt(rr(t), 3);
    tex(d.readout, `\\kratef = \\kkf[\\text{N}_2\\text{O}_4] = (${hue('rate-constant', fmt(f1, 2) + '\\ \\text{s}^{-1}')})(${hue('concentration', ca + '\\ \\text{M}')}) = ${hue('rate', sf + '\\ \\text{M/s}')}`
      + ` \\\\ \\krater = \\kkr[\\text{NO}_2]^2 = (${hue('rate-constant', fmt(r1, 2) + '\\ \\text{M}^{-1}\\,\\text{s}^{-1}')})(${hue('concentration', cb + '\\ \\text{M}')})^2 = ${hue('rate', sr + '\\ \\text{M/s}')}`);
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => PLAY), draw });
})();
};
