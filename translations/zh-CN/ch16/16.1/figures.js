/* Figures for section 16.1 Spontaneity. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['16.1'] = function (root, F) {
const { fmt, tex, C, PAL, alpha, ctl, cycle, register, begin, line, arrow, text, dot, topline } = F;
const sim = (id, H) => F.sim(root, id, H);
const still = (d, draw) => register(d.fig, { update: () => {}, draw });
const TAU = 2 * Math.PI;

/* =====================================================================
   FIGURE 16.2: technetium-99m and uranium-238 decaying, a faithful copy.
   Time in days over the week the caption names, percent remaining from
   each half-life: 6.01 h for Tc-99m, 4.47 × 10⁹ y for U-238. Axes fixed,
   0 to 7 d and 0 to 100 %.
===================================================================== */
(function () {
  const H = 470, d = sim('sim-decay', H);
  const G = { l: 260, r: 1180, t: 70, b: 380 };
  const HALF = { tc: 6.01 / 24, u: 4.47e9 * 365.25 };
  const left = (h) => (t) => 100 * Math.pow(0.5, t / h);
  function draw() {
    const { ctx } = begin(d.c);
    const g = F.axes(ctx, G, [0, 7], [0, 100], { nx: 7, ny: 10, xl: 'time (days)', xc: C('time'), yl: 'amount of isotope remaining (%)' });
    const tc = F.ref('tc-99m'), u = F.ref('u-238');
    F.curve(ctx, left(HALF.u), 0, 7, g.X, g.Y, u, 5, 20);
    F.curve(ctx, left(HALF.tc), 0, 7, g.X, g.Y, tc, 5, 400);
    text(ctx, 'U-238', G.r, g.Y(100) + 24, u, { size: 22, weight: 600, align: 'right' });
    text(ctx, 'Tc-99m', g.X(0.5) + 18, g.Y(left(HALF.tc)(0.5)) - 6, tc, { size: 22, weight: 600, align: 'left' });
  }
  still(d, draw);
})();

/* =====================================================================
   FIGURE 16.4: an ideal gas expanding into a vacuum, in three dimensions.
   Two round flasks joined by a tube with a valve, thirty argon atoms.
   Moving: the atoms travel continuously and turn at random off the glass.
   Closing the valve puts the gas back in the left flask. The flasks stand
   on a bench, so the pitch stays between 2° and 70° above level.
===================================================================== */
(function () {
  const T3D = window.THREE;
  const d = sim('sim-gas-flasks');
  const v = F.view3d(d.stage, { spin: 'off', pitch: [0.035, 1.22], views: [{ label: 'front', yaw: 0, pitch: 0.18 }, { label: 'above', yaw: 0, pitch: 1.1 }], h: 330, dist: 4.8, tilt: 0.18 });
  const grp = v.part(0), cnv = F.makeCanvas(d.stage, 190);
  const RB = 0.8, XB = 1.1, RT = 0.3, XT = 0.5, N = 30, R = 0.08, SPEED = 2.4;
  const valve = F.choice(d.controls, { label: '\\text{valve}', options: [{ value: 'closed', label: 'closed' }, { value: 'open', label: 'open' }], value: 'open', ms: 0, aria: 'the valve between the flasks', onInput: () => { if (valve.value === 'closed') seed(); } });
  const heading = () => { const z = 2 * Math.random() - 1, a = Math.random() * TAU, r = Math.sqrt(1 - z * z); return [r * Math.cos(a), r * Math.sin(a), z]; };
  let atoms = [];
  function seed() {
    atoms = Array.from({ length: N }, () => {
      const u = heading(), rr = Math.cbrt(Math.random()) * (RB - R - 0.02);
      return { x: [-XB + u[0] * rr, u[1] * rr, u[2] * rr], u: heading() };
    });
  }
  seed();
  const ok = (p) => {
    for (const s of [-1, 1]) if (Math.hypot(p[0] - s * XB, p[1], p[2]) < RB - R) return true;
    return valve.value === 'open' && Math.abs(p[0]) < XT && Math.hypot(p[1], p[2]) < RT - R;
  };
  function step(dt) {
    for (const q of atoms) {
      const nx = q.x.map((c, k) => c + q.u[k] * SPEED * dt);
      if (ok(nx)) q.x = nx; else q.u = heading();
    }
  }
  const cy = cycle(() => Infinity, 0);
  let sig = '', meshes = [];
  const palSig = () => [PAL.ink, PAL.soft, PAL.muted, F.el('Ar'), valve.value].join('|');
  const glass = { transparent: true, opacity: 0.12, depthWrite: false, side: T3D ? T3D.DoubleSide : 2 };
  function build() {
    if (!v.scene || palSig() === sig) return; sig = palSig();
    v.clear();
    v.pickable(F.mesh.box(grp, [0, -RB - 0.26, 0], [4.4, 0.1, 1.6], PAL.soft), 'bench');
    for (const s of [-1, 1]) {
      const b = new T3D.Mesh(new T3D.SphereGeometry(RB, 40, 24), F.mesh.mat(PAL.ink, glass)); b.position.set(s * XB, 0, 0); grp.add(b);
      v.pickable(b, s < 0 ? 'the left flask' : 'the right flask');
      F.mesh.stick(grp, [s * XB, -RB, 0], [s * XB, -RB - 0.21, 0], 0.05, PAL.muted);
      v.label(s < 0 ? 'left flask' : 'right flask', [s * XB, -RB - 0.34, 0.85], grp, 16);
    }
    const tube = new T3D.Mesh(new T3D.CylinderGeometry(RT, RT, 2 * XT, 32, 1, true), F.mesh.mat(PAL.ink, glass)); tube.rotation.z = Math.PI / 2; grp.add(tube);
    v.pickable(tube, 'the tube joining the flasks');
    const open = valve.value === 'open';
    v.pickable(F.mesh.stick(grp, [0, RT - 0.05, 0], [0, RT + 0.3, 0], 0.07, PAL.muted), open ? 'the valve, open' : 'the valve, closed');
    v.pickable(F.mesh.box(grp, [0, RT + 0.34, 0], open ? [0.5, 0.08, 0.1] : [0.1, 0.08, 0.5], PAL.muted), 'the valve handle');
    if (!open) v.pickable(F.mesh.box(grp, [0, 0, 0], [0.06, 2 * RT, 2 * RT], PAL.muted), 'the closed valve');
    meshes = atoms.map((q) => v.pickable(F.mesh.sphere(grp, q.x, R * 1.3, F.el('Ar')), 'an argon atom, Ar'));
  }
  tex(d.readout, '\\kwork = -\\kP\\kdV = 0 \\qquad \\kdU = \\kq + \\kwork = 0 + 0 = 0');
  function draw() {
    build();
    if (v.scene) { atoms.forEach((q, i) => meshes[i].position.set(q.x[0], q.x[1], q.x[2])); v.invalidate(); }
    const { ctx } = begin(cnv);
    const r = atoms.filter((q) => q.x[0] >= 0).length, l = N - r;
    const X = (n) => 370 + n * 22, y = 128, ar = F.el('Ar');
    text(ctx, `left flask, ${l}`, X(0), 92, PAL.ink, { size: 18, align: 'left' });
    text(ctx, `right flask, ${r}`, X(N), 92, PAL.ink, { size: 18, align: 'right' });
    ctx.save(); ctx.fillStyle = ar; ctx.strokeStyle = alpha(PAL.ink, 0.5); ctx.lineWidth = 1.5;
    ctx.fillRect(X(0), y - 12, X(l) - X(0), 24); ctx.strokeRect(X(0), y - 12, X(l) - X(0), 24);
    ctx.globalAlpha = 0.4; ctx.fillRect(X(l), y - 12, X(N) - X(l), 24); ctx.globalAlpha = 1; ctx.strokeRect(X(l), y - 12, X(N) - X(l), 24); ctx.restore();
    line(ctx, X(N / 2), y - 22, X(N / 2), y + 22, alpha(PAL.ink, 0.4), 2, [10, 10]);
    text(ctx, 'even split', X(N / 2), y + 40, PAL.muted, { size: 16, align: 'center' });
    topline(ctx, valve.value === 'closed'
      ? 'With the valve closed, all 30 atoms are in the left flask and the right flask is empty.'
      : `${r} of the 30 atoms have crossed into the right flask.`);
  }
  register(d.fig, { update: (dt) => { cy.step(dt, () => 1); step(Math.min(dt, 0.05)); }, draw });
})();

/* =====================================================================
   FIGURE 16.5: heat flowing from X to Y. Two alike objects of heat
   capacity 1.00 kJ/K in contact; each temperature closes on the mean as
   e^(−t/τ), τ = 2 min. Moving: ten minutes of model time in about 6 s.
   Axes fixed, 0 to 10 min and 250 to 400 K, the slider limits.
===================================================================== */
(function () {
  const H = 600, d = sim('sim-heat-flow', H);
  const CAP = 1.0, TAU_M = 2, TEND = 10;
  const cy = cycle(() => TEND, 1.2), reset = () => cy.reset();
  const tx = ctl(d.controls, { label: '\\kTX', cls: 'temperature', key: 'TX', min: 300, max: 400, step: 1, value: 350, unit: 'K', dec: 0, aria: 'the starting temperature of object X', onInput: reset });
  const ty = ctl(d.controls, { label: '\\kTY', cls: 'temperature', key: 'TY', min: 250, max: 350, step: 1, value: 290, unit: 'K', dec: 0, aria: 'the starting temperature of object Y', onInput: reset });
  const G = { l: 210, r: 1250, t: 370, b: 510 };
  const BX = { l: 460, m: 700, r: 940, t: 128, b: 236 };
  const LANES = [152, 182, 212], PER = 3;
  function draw() {
    const { ctx } = begin(d.c);
    const t = cy.now(), x0 = tx.v, y0 = ty.v, Tf = (x0 + y0) / 2, k = Math.exp(-t / TAU_M);
    const TX = Tf + (x0 - Tf) * k, TY = Tf + (y0 - Tf) * k, dir = Math.sign(x0 - y0);
    const rx = F.ref('object-x'), ry = F.ref('object-y'), ce = C('energy'), ct = C('temperature');
    for (const [l, r, c] of [[BX.l, BX.m, rx], [BX.m, BX.r, ry]]) {
      ctx.save(); ctx.fillStyle = alpha(c, 0.22); ctx.fillRect(l, BX.t, r - l, BX.b - BX.t); ctx.restore();
    }
    ctx.save(); ctx.strokeStyle = rx; ctx.lineWidth = 3; ctx.strokeRect(BX.l, BX.t, BX.m - BX.l, BX.b - BX.t); ctx.strokeStyle = ry; ctx.strokeRect(BX.m, BX.t, BX.r - BX.m, BX.b - BX.t); ctx.restore();
    const flow = dir ? k : 0;
    if (flow > 0.01) {
      const a = 520, b = 880;
      LANES.forEach((ly, j) => {
        for (let i = 0; i < PER; i++) {
          const u = (((t / 1.4 + i / PER + j * 0.37) % 1) + 1) % 1, s = dir > 0 ? u : 1 - u;
          ctx.save(); ctx.globalAlpha = Math.sqrt(flow) * Math.sin(Math.PI * u); dot(ctx, a + s * (b - a), ly, ce, true, 6); ctx.restore();
        }
      });
      const [p, q] = dir > 0 ? [640, 760] : [760, 640];
      arrow(ctx, p, 104, q, 104, alpha(ce, Math.max(0.35, Math.sqrt(flow))), 4);
      text(ctx, 'heat', dir > 0 ? 628 : 772, 104, alpha(ce, Math.max(0.35, Math.sqrt(flow))), { size: 20, weight: 600, align: dir > 0 ? 'right' : 'left' });
    }
    text(ctx, 'X', (BX.l + BX.m) / 2, 262, rx, { size: 24, weight: 600, align: 'center' });
    text(ctx, 'Y', (BX.m + BX.r) / 2, 262, ry, { size: 24, weight: 600, align: 'center' });
    text(ctx, `$\\kTX = ${fmt(TX, 0)}\\ \\text{K}$`, (BX.l + BX.m) / 2, 298, PAL.ink, { size: 22, align: 'center', tex: true });
    text(ctx, `$\\kTY = ${fmt(TY, 0)}\\ \\text{K}$`, (BX.m + BX.r) / 2, 298, PAL.ink, { size: 22, align: 'center', tex: true });
    const g = F.axes(ctx, G, [0, TEND], [250, 400], { nx: 5, ny: 3, xl: 'time (min)', xc: C('time'), yl: 'temperature (K)', yc: ct });
    line(ctx, G.l, g.Y(Tf), G.r, g.Y(Tf), alpha(ct, 0.6), 2.5, [10, 10]);
    text(ctx, `${fmt(Tf, 0)} K`, G.r - 6, g.Y(Tf) - 14, PAL.muted, { size: 17, align: 'right' });
    const fx = (T0) => (s) => Tf + (T0 - Tf) * Math.exp(-s / TAU_M);
    if (t > 0) { F.curve(ctx, fx(x0), 0, t, g.X, g.Y, rx, 5); F.curve(ctx, fx(y0), 0, t, g.X, g.Y, ry, 5); }
    dot(ctx, g.X(t), g.Y(TX), rx, true, 9); dot(ctx, g.X(t), g.Y(TY), ry, true, 9);
    const up = x0 >= y0, ly = (T, s) => Math.min(Math.max(g.Y(T) + s * 16, G.t + 10), G.b - 10);
    text(ctx, 'X', g.X(t) + 18, ly(TX, up ? -1 : 1), rx, { size: 20, weight: 600 });
    text(ctx, 'Y', g.X(t) + 18, ly(TY, up ? 1 : -1), ry, { size: 20, weight: 600 });
    const done = Math.abs(TX - TY) < 0.5;
    topline(ctx, !dir ? `X and Y start at the same temperature, ${fmt(x0, 0)} K, so no heat flows.`
      : done ? `X and Y have both reached ${fmt(Tf, 0)} K, and heat no longer flows.`
        : dir > 0 ? `Heat flows from X to Y: X has cooled to ${fmt(TX, 0)} K and Y has warmed to ${fmt(TY, 0)} K.`
          : `Heat flows from Y to X: Y has cooled to ${fmt(TY, 0)} K and X has warmed to ${fmt(TX, 0)} K.`);
    const qx = +(CAP * (TX - x0)).toFixed(1) || 0;
    tex(d.readout, `\\kqX = ${fmt(qx, 1)}\\ \\text{kJ} \\qquad \\kqY = -\\kqX = ${fmt(-qx, 1)}\\ \\text{kJ}`);
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => TEND / 6), draw });
})();
};
