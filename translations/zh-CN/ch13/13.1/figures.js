/* Figures for section 13.1 Chemical Equilibria. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['13.1'] = function (root, F) {
const { el, fmt, tex, C, PAL, ctl, cycle, register, begin, line, dot, text, topline, axes, curve, alpha } = F;
const T3D = window.THREE;
const { sphere: sphere3, mat: mat3 } = F.mesh;
const TAU = 2 * Math.PI;
const NO2_BROWN = '#8b4a1c';                         /* the colour of nitrogen dioxide gas */
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;

/* =====================================================================
   FIGURE 13.2: a sealed tube of N₂O₄ ⇌ 2NO₂, magnified to a box of
   molecules, over [N₂O₄], [NO₂] and rate_f, rate_r against t. The
   concentrations follow d[N₂O₄]/dt = −k_f[N₂O₄] + k_r[NO₂]² from
   [N₂O₄]₀ = 0.140 M; the box splits an N₂O₄ each time ∫rate_f dt passes a
   multiple of Q and joins the closest free pair of NO₂ each time ∫rate_r dt
   does (offset by half), so its counts stay within a molecule of the curves
   and both kinds of event go on at equilibrium. A run of TRUN model seconds
   is computed whole when a slider moves. Axes fixed: t 0 to 8 s, conc 0 to
   0.30 M (all NO₂ is 0.28 M), rate 0 to 0.18 M/s (largest initial rate
   1.20 × 0.140 = 0.168 M/s). No ground: yaw free, pitch within 70°.
===================================================================== */
(function () {
  const d = F.sim(root, 'sim-n2o4-equilibrium');
  const v = F.view3d(d.stage, { spin: 'off', pitch: [-1.22, 1.22], views: [{ label: 'front', yaw: 0, pitch: 0.15 }, { label: 'corner', yaw: 0.7, pitch: 0.42 }], h: 380, dist: 5.0, tilt: 0.18 });
  const grp = v.part(0), cnv = F.makeCanvas(d.stage, 640);
  const kf = ctl(d.controls, { label: '\\kkf', cls: 'rate-constant', key: 'kf', min: 0.1, max: 1.2, step: 0.05, value: 0.6, unit: 's⁻¹', dec: 2, onInput: rerun, aria: 'forward rate constant in per second' });
  const kr = ctl(d.controls, { label: '\\kkr', cls: 'rate-constant', key: 'kr', min: 1, max: 3, step: 0.01, value: 1.41, unit: 'M⁻¹ s⁻¹', dec: 2, onInput: rerun, aria: 'reverse rate constant in per molar per second' });
  const fx = el('div'), nt = el('small'); d.readout.append(fx, nt);
  nt.textContent = 'Each molecule drawn stands for 0.010 M of its gas; in the real gas the reaction runs far faster than drawn.';

  const MOLS = {
    A: { M: 92.01, r: 0.21, name: 'dinitrogen tetroxide, N₂O₄', atoms: [['N', -0.075, 0, 0.062], ['N', 0.075, 0, 0.062], ['O', -0.14, 0.08, 0.058], ['O', -0.14, -0.08, 0.058], ['O', 0.14, 0.08, 0.058], ['O', 0.14, -0.08, 0.058]] },
    B: { M: 46.01, r: 0.17, name: 'nitrogen dioxide, NO₂', atoms: [['N', 0, 0.03, 0.062], ['O', -0.1, -0.02, 0.058], ['O', 0.1, -0.02, 0.058]] },
  };
  const SZ = 1.35, L = 1, Q = 0.01, N0 = 14, A0 = N0 * Q, TRUN = 8, PLAY = 1.4, DT = 1 / 60, NF = Math.round(TRUN / DT), GLIDE = 1.4;
  const SA = N0, SB = 2 * N0;
  const gauss = () => { let a = 0; while (!a) a = Math.random(); return Math.sqrt(-2 * Math.log(a)) * Math.cos(TAU * Math.random()); };
  const kick = (M) => [0, 1, 2].map(() => gauss() * 0.45 * Math.sqrt(46 / M));
  const unit = () => { const p = [gauss(), gauss(), gauss()], n = Math.hypot(...p) || 1; return p.map((q) => q / n); };
  const clampIn = (p, r) => p.map((q) => Math.max(-L + r, Math.min(L - r, q)));
  const smooth = F.ease.smooth;

  function simulate() {
    const f1 = kf.v, r1 = kr.v;
    const A = new Float64Array(NF + 1), B = new Float64Array(NF + 1);
    let a = A0, b = 0, cf = 0, cr = 0;
    const posA = new Float32Array((NF + 1) * SA * 6).fill(NaN), posB = new Float32Array((NF + 1) * SB * 6).fill(NaN);
    const mols = [];
    const freeSlot = (kind) => { const used = new Set(mols.filter((m) => m.kind === kind).map((m) => m.slot)); for (let s = 0; ; s++) if (!used.has(s)) return s; };
    const add = (kind, x, u) => { const m = { kind, slot: freeSlot(kind), x, u, glide: null }; mols.push(m); return m; };
    for (let i = 0; i < N0; i++) {
      let p, tries = 0;
      do { p = [0, 1, 2].map(() => (Math.random() * 2 - 1) * (L - MOLS.A.r)); tries++; } while (tries < 80 && mols.some((m) => Math.hypot(m.x[0] - p[0], m.x[1] - p[1], m.x[2] - p[2]) < 2.6 * MOLS.A.r));
      add('A', p, kick(MOLS.A.M));
    }
    let splits = 0, joinsStarted = 0;
    const events = [];
    for (let f = 0; f <= NF; f++) {
      const t = f * DT;
      A[f] = a; B[f] = b;
      for (const m of mols) {
        const s = Math.hypot(...m.u) || 1, P = m.kind === 'A' ? posA : posB, n = m.kind === 'A' ? SA : SB, o = (f * n + m.slot) * 6;
        P[o] = m.x[0]; P[o + 1] = m.x[1]; P[o + 2] = m.x[2]; P[o + 3] = m.u[0] / s; P[o + 4] = m.u[1] / s; P[o + 5] = m.u[2] / s;
      }
      if (f === NF) break;
      /* concentrations, midpoint step */
      const da = (x, y) => -f1 * x + r1 * y * y;
      const ka = da(a, b), am = a + ka * DT / 2, bm = b - 2 * ka * DT / 2, kb = da(am, bm);
      cf += f1 * am * DT; cr += r1 * bm * bm * DT; a += kb * DT; b -= 2 * kb * DT;
      /* splits */
      while (splits < Math.floor(cf / Q + 1e-9)) {
        const pool = mols.filter((m) => m.kind === 'A');
        if (!pool.length) break;
        const m = pool[Math.floor(Math.random() * pool.length)], nn = unit();
        mols.splice(mols.indexOf(m), 1);
        [1, -1].forEach((sg) => add('B', clampIn(m.x.map((q, k) => q + sg * 0.1 * nn[k]), MOLS.B.r), m.u.map((q, k) => q + sg * 0.3 * nn[k])));
        splits++; events.push({ t: t + DT, kind: 'split' });
      }
      /* joins: the closest free pair of NO₂ glides together and becomes one N₂O₄ */
      while (joinsStarted < Math.floor(cr / Q + 0.5)) {
        const free = mols.filter((m) => m.kind === 'B' && !m.glide);
        if (free.length < 2) break;
        let best = null, bd = Infinity;
        for (let i = 0; i < free.length; i++) for (let j = i + 1; j < free.length; j++) {
          const dd = Math.hypot(free[i].x[0] - free[j].x[0], free[i].x[1] - free[j].x[1], free[i].x[2] - free[j].x[2]);
          if (dd < bd) { bd = dd; best = [free[i], free[j]]; }
        }
        const mid = [0, 1, 2].map((k) => (best[0].x[k] + best[1].x[k]) / 2), n = Math.max(6, Math.round(bd / GLIDE / DT));
        best.forEach((m) => { m.glide = { from: m.x.slice(), to: mid, f0: f, n, mate: best[0] === m ? best[1] : best[0] }; });
        joinsStarted++;
      }
      /* motion */
      for (const m of mols) {
        if (m.glide) { const k = smooth(Math.min(1, (f + 1 - m.glide.f0) / m.glide.n)); m.x = m.glide.from.map((q, i) => q + (m.glide.to[i] - q) * k); continue; }
        const r = MOLS[m.kind].r;
        for (let k = 0; k < 3; k++) {
          m.x[k] += m.u[k] * DT;
          if (m.x[k] > L - r && m.u[k] > 0) m.u[k] = -m.u[k];
          if (m.x[k] < -L + r && m.u[k] < 0) m.u[k] = -m.u[k];
        }
      }
      const done = mols.filter((m) => m.glide && f + 1 - m.glide.f0 >= m.glide.n && mols.indexOf(m) < mols.indexOf(m.glide.mate));
      done.forEach((m) => {
        const w = m.glide.mate, u = m.u.map((q, k) => (q + w.u[k]) / 2);
        mols.splice(mols.indexOf(m), 1); mols.splice(mols.indexOf(w), 1);
        add('A', clampIn(m.glide.to, MOLS.A.r), u);
        events.push({ t: t + DT, kind: 'join' });
      });
      /* elastic bounces between molecules that are not gliding */
      const live = mols.filter((m) => !m.glide);
      for (let i = 0; i < live.length; i++) for (let j = i + 1; j < live.length; j++) {
        const p = live[i], q = live[j], dx = [0, 1, 2].map((k) => q.x[k] - p.x[k]), r = Math.hypot(...dx);
        if (r === 0 || r >= MOLS[p.kind].r + MOLS[q.kind].r) continue;
        const nn = dx.map((z) => z / r), vn = [0, 1, 2].reduce((s, k) => s + (q.u[k] - p.u[k]) * nn[k], 0);
        if (vn >= 0) continue;
        const mp = MOLS[p.kind].M, mq = MOLS[q.kind].M;
        for (let k = 0; k < 3; k++) { p.u[k] += ((2 * mq) / (mp + mq)) * vn * nn[k]; q.u[k] -= ((2 * mp) / (mp + mq)) * vn * nn[k]; }
      }
    }
    /* equilibrium: the first time the two rates agree to the readout's three decimals, and stay so */
    let teq = Infinity;
    for (let f = NF; f >= 0; f--) { if (fmt(f1 * A[f], 3) !== fmt(r1 * B[f] * B[f], 3)) break; teq = f * DT; }
    return { A, B, posA, posB, events, teq, f1, r1, id: Math.random() };
  }
  const cy = cycle(() => TRUN, 1.2);
  let run = simulate();
  function rerun() { run = simulate(); cy.reset(); }

  let sig = '', slotsA = [], slotsB = [], box = null;
  const palSig = () => [PAL.ink, PAL.panel, F.CC, F.el('N'), F.el('O'), F.fact(NO2_BROWN)].join('|');
  function molecule3(kind) {
    const g = new T3D.Group(); grp.add(g);
    MOLS[kind].atoms.forEach(([e, ax, ay, r]) => v.pickable(sphere3(g, [ax * SZ, ay * SZ, 0], r * SZ, F.el(e)), MOLS[kind].name));
    g.visible = false; return g;
  }
  function build() {
    const key = palSig(); if (key === sig) return; sig = key;
    v.clear(); grp.position.set(0, -0.2, 0);
    box = new T3D.Mesh(new T3D.BoxGeometry(2 * L, 2 * L, 2 * L), mat3(F.fact(NO2_BROWN), { transparent: true, opacity: 0.04, depthWrite: false, side: T3D.DoubleSide })); grp.add(box);
    v.pickable(box, 'the gas in the sealed tube');
    grp.add(new T3D.LineSegments(new T3D.EdgesGeometry(new T3D.BoxGeometry(2 * L, 2 * L, 2 * L)), new T3D.LineBasicMaterial({ color: new T3D.Color(PAL.ink) })));
    v.label('N₂O₄ ⇌ 2NO₂', [0, L + 0.15, 0], grp, 6);
    slotsA = Array.from({ length: SA }, () => molecule3('A'));
    slotsB = Array.from({ length: SB }, () => molecule3('B'));
  }
  const place = (slots, P, n, f) => slots.forEach((g, s) => {
    const o = (f * n + s) * 6; g.visible = !Number.isNaN(P[o]); if (!g.visible) return;
    g.position.set(P[o], P[o + 1], P[o + 2]);
    g.rotation.set(0, Math.atan2(P[o + 3], P[o + 5]), Math.asin(Math.max(-1, Math.min(1, P[o + 4]))));
  });

  function draw() {
    build();
    const t = cy.now(), f = Math.min(NF, Math.round(t / DT)), { A, B, teq, f1, r1 } = run;
    place(slotsA, run.posA, SA, f); place(slotsB, run.posB, SB, f);
    box.material.opacity = 0.04 + 0.3 * (B[f] / (2 * A0));
    v.invalidate();

    const seen = run.events.filter((e) => e.t <= t + 1e-9), nS = seen.filter((e) => e.kind === 'split').length, nJ = seen.length - nS;
    const pl = (n, one, many) => n + ' ' + (n === 1 ? one : many);
    const { ctx } = begin(cnv);
    const eq = t >= teq;
    topline(ctx, t < DT / 2 ? 'At $\\kt = 0$ the tube holds ' + N0 + ' molecules of N_{2}O_{4} and no NO_{2}.'
      : (eq ? 'At equilibrium: ' : 'Pre-equilibrium: ') + pl(nS, 'N_{2}O_{4} has', 'N_{2}O_{4} have') + ' split and ' + pl(nJ, 'pair', 'pairs') + ' of NO_{2} ' + (nJ === 1 ? 'has' : 'have') + ' joined' + (eq ? ', and both go on.' : '.'));

    const at = (arr) => (s) => { const g = Math.min(NF, s / DT), i = Math.floor(g), k = g - i; return i >= NF ? arr[NF] : arr[i] + (arr[i + 1] - arr[i]) * k; };
    const cA = at(A), cB = at(B), rf = (s) => f1 * cA(s), rr = (s) => r1 * cB(s) * cB(s);
    const n = Math.max(2, Math.round(t * 20));
    const shade = (bx, X) => {
      if (!eq) return;
      ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.06); ctx.fillRect(X(teq), bx.t, bx.r - X(teq), bx.b - bx.t); ctx.restore();
      line(ctx, X(teq), bx.t, X(teq), bx.b, alpha(PAL.ink, 0.5), 2, [10, 10]);
      text(ctx, 'equilibrium achieved', X(teq) + 12, bx.t + 16, PAL.muted, { size: 17, bg: PAL.panel });
    };
    const key = (x, y, color, s) => { line(ctx, x, y, x + 40, y, color, 5); text(ctx, s, x + 52, y, PAL.ink, { size: 20, tex: true }); };

    const b1 = { l: 150, r: 1140, t: 110, b: 290 };
    const g1 = axes(ctx, b1, [0, TRUN], [0, 0.3], { nx: 4, ny: 3, fy: (q) => fmt(q, 2), yl: 'concentration (M)', yc: C('concentration') });
    shade(b1, g1.X);
    curve(ctx, cA, 0, t, g1.X, g1.Y, F.ref('n2o4'), 5, n); curve(ctx, cB, 0, t, g1.X, g1.Y, F.ref('no2'), 5, n);
    dot(ctx, g1.X(t), g1.Y(cA(t)), F.ref('n2o4'), true, 9); dot(ctx, g1.X(t), g1.Y(cB(t)), F.ref('no2'), true, 9);
    key(1170, b1.t + 20, F.ref('n2o4'), '$[\\text{N}_2\\text{O}_4]$'); key(1170, b1.t + 60, F.ref('no2'), '$[\\text{NO}_2]$');

    const b2 = { l: 150, r: 1140, t: 400, b: 560 };
    const g2 = axes(ctx, b2, [0, TRUN], [0, 0.18], { nx: 4, ny: 3, fy: (q) => fmt(q, 2), xl: 'time t (s)', xc: C('time'), yl: 'rate (M/s)', yc: C('rate') });
    shade(b2, g2.X);
    curve(ctx, rf, 0, t, g2.X, g2.Y, F.ref('forward'), 5, n); curve(ctx, rr, 0, t, g2.X, g2.Y, F.ref('reverse'), 5, n);
    dot(ctx, g2.X(t), g2.Y(rf(t)), F.ref('forward'), true, 9); dot(ctx, g2.X(t), g2.Y(rr(t)), F.ref('reverse'), true, 9);
    key(1170, b2.t + 20, F.ref('forward'), '$\\kkf[\\text{N}_2\\text{O}_4]$'); key(1170, b2.t + 60, F.ref('reverse'), '$\\kkr[\\text{NO}_2]^2$');

    const sf = fmt(rf(t), 3), sr = fmt(rr(t), 3), rel = sf === sr ? '=' : rf(t) > rr(t) ? '>' : '<';
    tex(fx, `\\kratef = \\kkf[\\text{N}_2\\text{O}_4] = ${hue('rate', sf + '\\ \\text{M/s}')} ${rel} ${hue('rate', sr + '\\ \\text{M/s}')} = \\kkr[\\text{NO}_2]^2 = \\krater`);
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => PLAY), draw });
})();
};
