/* Figures for section 11.4 Colligative Properties. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['11.4'] = function (root, F) {
const { el, fmt, tex, C, PAL, alpha, ctl, cycle, register, begin, line, text, topline, hbracket, vbracket } = F;
const sim = (id, H) => F.sim(root, id, H);
function readout(host, main, small) { tex(host, main); if (small) host.appendChild(el('small', null, small)); }
const TAU = 2 * Math.PI;
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;
const minus = (s) => String(s).replace(/^-/, '−');
/* a small seeded generator, so a slider position always draws the same arrangement */
const rng = (seed) => () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
const glassOf = (T3D) => ({ transparent: true, opacity: 0.1, depthWrite: false, side: T3D.DoubleSide });
/* a closed cylinder of radius r standing from a to b along y */
function column(T3D, g, x, y0, y1, z, r, color, extra) {
  const m = new T3D.Mesh(new T3D.CylinderGeometry(r, r, 1, 28, 1, false), F.mesh.mat(color, extra));
  const set = (a, b) => { const h = Math.max(1e-3, b - a); m.scale.y = h; m.position.set(x, a + h / 2, z); };
  set(y0, y1); g.add(m); m.setSpan = set; return m;
}
/* a water molecule, O and two H, in a group at p, turned by the angle a about y */
function water(g, p, a, s = 1) {
  const T3D = window.THREE, w = new T3D.Group(), hs = [];
  const o = F.mesh.sphere(w, [0, 0, 0], 0.075 * s, F.el('O'));
  for (const k of [-1, 1]) hs.push(F.mesh.sphere(w, [0.075 * s * k, 0.06 * s, 0], 0.048 * s, F.el('H')));
  w.position.set(p[0], p[1], p[2]); w.rotation.y = a; g.add(w);
  return { g: w, parts: [o, ...hs] };
}

/* =====================================================================
   FIGURE 11.18: vapor above pure water and above a solution of urea, in
   three dimensions. Two closed glass tanks on a bench, 75 lattice sites
   of liquid in each (5 across, 3 deep, 5 high), the top 15 the surface.
   Moving: a water molecule at the surface escapes at a steady rate per
   site; a vapor molecule returns when it reaches the surface, after the
   one flight time TF. The vapor therefore settles near R_EV × (surface
   water sites) × TF molecules, which is 14 above pure water. Urea takes
   sites in every layer in proportion, so the surface share of water is
   the mole fraction of water. The bench keeps the pitch 2° to 70°.
===================================================================== */
(function () {
  const T3D = window.THREE;
  const d = sim('sim-vapor-lowering');
  const v = F.view3d(d.stage, { spin: 'off', pitch: [0.035, 1.22], views: [{ label: 'front', yaw: 0, pitch: 0.2 }, { label: 'above', yaw: 0, pitch: 1.1 }], h: 360, dist: 6.2, tilt: 0.22 });
  const grp = v.part(0), cnv = F.makeCanvas(d.stage, 250);
  const NX = 5, NZ = 3, NY = 5, SITES = NX * NZ * NY, TOP = NX * NZ, SP = 0.26;
  const XB = 1.3, W = NX * SP, D = NZ * SP, Y0 = -1.0, YS = Y0 + NY * SP, YT = YS + 1.2;
  const SPEED = 1.3, VY = 0.75 * SPEED, TF = 2 * (YT - YS - 0.08) / VY, N_PURE = 14, R_EV = N_PURE / (TOP * TF), P_STAR = 23.7;
  const nU = ctl(d.controls, { label: '\\text{urea molecules}', cls: '', min: 0, max: 30, step: 5, value: 15, unit: 'of 75', dec: 0, aria: 'urea molecules among the 75 sites of the solution', onInput: () => { seedSolute(); sig = ''; } });
  const siteAt = (k) => { const l = Math.floor(k / TOP), r = k % TOP, ix = r % NX, iz = Math.floor(r / NX); return [(ix - (NX - 1) / 2) * SP, YS - SP / 2 - l * SP, (iz - (NZ - 1) / 2) * SP]; };
  let urea = new Set();
  function seedSolute() {
    const R = rng(7), n = Math.round(nU.v), per = n / NY; urea = new Set();
    for (let l = 0; l < NY; l++) {
      const want = Math.round(per * (l + 1)) - Math.round(per * l), idx = Array.from({ length: TOP }, (_, i) => l * TOP + i);
      for (let j = 0; j < want; j++) { const k = Math.floor(R() * idx.length); urea.add(idx.splice(k, 1)[0]); }
    }
  }
  seedSolute();
  const tanks = [{ x: -XB, solute: false, vap: [] }, { x: XB, solute: true, vap: [] }];
  const surfWater = (t) => (t.solute ? Array.from({ length: TOP }, (_, i) => i).filter((i) => !urea.has(i)) : Array.from({ length: TOP }, (_, i) => i));
  const R0 = rng(3);
  function launch(t, s) {
    const p = siteAt(s), a = R0() * TAU;
    t.vap.push({ p: [p[0], YS + 0.02, p[2]], u: [Math.cos(a) * 0.66 * SPEED, VY, Math.sin(a) * 0.66 * SPEED], spin: R0() * TAU });
  }
  for (const t of tanks) { const sw = surfWater(t); for (let j = 0; j < Math.round(N_PURE * sw.length / TOP); j++) { launch(t, sw[j % sw.length]); const q = t.vap[t.vap.length - 1]; q.p[1] = YS + 0.05 + R0() * (YT - YS - 0.1); if (R0() < 0.5) q.u[1] = -VY; } }
  function step(dt) {
    for (const t of tanks) {
      const sw = surfWater(t);
      let k = R_EV * sw.length * dt; while (k > 0) { if (R0() < Math.min(k, 1)) launch(t, sw[Math.floor(R0() * sw.length)]); k -= 1; }
      t.vap = t.vap.filter((q) => {
        for (let i = 0; i < 3; i++) q.p[i] += q.u[i] * dt;
        const hx = W / 2 - 0.06, hz = D / 2 - 0.06;
        if (Math.abs(q.p[0]) > hx) { q.p[0] = Math.sign(q.p[0]) * hx; q.u[0] *= -1; }
        if (Math.abs(q.p[2]) > hz) { q.p[2] = Math.sign(q.p[2]) * hz; q.u[2] *= -1; }
        if (q.p[1] > YT - 0.06) { q.p[1] = YT - 0.06; q.u[1] = -VY; }
        return q.p[1] > YS;
      });
      t.avg = t.avg === undefined ? t.vap.length : t.avg + (t.vap.length - t.avg) * Math.min(1, dt / 3);
    }
  }
  let sig = '', pools = [];
  const TANK = (t) => F.ref(t.solute ? 'solution-tank' : 'pure-tank');
  const palSig = () => [PAL.ink, PAL.soft, PAL.muted, F.el('O'), F.el('H'), F.el('C'), F.el('N'), Math.round(nU.v), ...tanks.map(TANK)].join('|');
  function build() {
    if (palSig() === sig) return; sig = palSig();
    v.clear(); pools = [];
    v.pickable(F.mesh.box(grp, [0, Y0 - 0.1, 0], [5.0, 0.12, 1.8], PAL.soft), 'bench');
    const glass = glassOf(T3D), R = rng(11);
    for (const t of tanks) {
      const tank = new T3D.Group(); tank.position.set(t.x, 0, 0); grp.add(tank);
      v.pickable(F.mesh.box(tank, [0, (Y0 + YT) / 2, 0], [W + 0.08, YT - Y0 + 0.04, D + 0.08], TANK(t), { ...glass, opacity: 0.16 }), t.solute ? 'a closed tank of an aqueous solution of urea' : 'a closed tank of pure water');
      F.mesh.box(tank, [0, YS - NY * SP / 2, 0], [W, NY * SP, D], PAL.muted, { transparent: true, opacity: 0.12, depthWrite: false });
      for (let k = 0; k < SITES; k++) {
        const p = siteAt(k);
        if (t.solute && urea.has(k)) {
          const u = new T3D.Group(); u.position.set(p[0], p[1], p[2]); u.rotation.y = R() * TAU; tank.add(u);
          const nm = 'a urea molecule, CO(NH₂)₂, a nonvolatile solute';
          [[[0, 0, 0], 0.07, 'C'], [[0, 0.085, 0], 0.07, 'O'], [[-0.08, -0.05, 0], 0.07, 'N'], [[0.08, -0.05, 0], 0.07, 'N']].forEach(([q, r, e]) => v.pickable(F.mesh.sphere(u, q, r, F.el(e)), nm));
        } else {
          const w = water(tank, p, R() * TAU, 0.9); w.parts.forEach((m) => v.pickable(m, 'a water molecule in the liquid'));
        }
      }
      const pool = [];
      for (let j = 0; j < 40; j++) { const w = water(tank, [0, -9, 0], 0, 0.9); w.parts.forEach((m) => v.pickable(m, 'a water molecule in the vapor')); w.g.visible = false; pool.push(w.g); }
      pools.push(pool);
      v.label(t.solute ? 'aqueous solution' : 'pure water', [t.x, Y0 - 0.32, D / 2 + 0.3], grp, 16).style.color = TANK(t);
    }
  }
  function draw() {
    build();
    tanks.forEach((t, i) => pools[i].forEach((g, j) => { const q = t.vap[j]; g.visible = !!q; if (q) { g.position.set(q.p[0], q.p[1], q.p[2]); g.rotation.y = q.spin; } }));
    v.invalidate();
    const { ctx } = begin(cnv);
    const n = Math.round(nU.v), X = (SITES - n) / SITES;
    const cnt = tanks.map((t) => Math.round(t.avg ?? t.vap.length)), want = [N_PURE, N_PURE * X];
    const bx = (k) => 420 + k * 40, rows = [{ y: 120, name: 'vapor above pure water' }, { y: 180, name: 'vapor above the solution' }];
    rows.forEach((r, i) => {
      text(ctx, r.name, 395, r.y, PAL.ink, { size: 18, align: 'right' });
      ctx.save(); ctx.fillStyle = alpha(TANK(tanks[i]), 0.75); ctx.fillRect(bx(0), r.y - 13, bx(Math.min(cnt[i], 22)) - bx(0), 26); ctx.restore();
      line(ctx, bx(want[i]), r.y - 22, bx(want[i]), r.y + 22, PAL.ink, 3, [4, 4]);
      text(ctx, cnt[i] + ' molecules', bx(Math.max(cnt[i], want[i])) + 18, r.y, PAL.ink, { size: 18 });
    });
    text(ctx, 'dashed marks: the average count Raoult’s law predicts', bx(0), 226, PAL.muted, { size: 16 });
    topline(ctx, n === 0
      ? 'With no urea, both liquids are pure water, and the vapor above each settles near ' + cnt[0] + ' molecules.'
      : 'Water fills ' + Math.round(X * 100) + '% of the surface sites of the solution, and ' + cnt[1] + ' molecules are in the vapor above it against ' + cnt[0] + ' above pure water.');
    const Ps = X * P_STAR;
    readout(d.readout, `\\kPsoln = X_{\\text{solvent}}\\kPsolvstar = ${fmt(X, 3)} \\times ${hue('pressure', '23.7\\ \\text{torr}')} = ${hue('pressure', fmt(Ps, 1) + '\\ \\text{torr}')}`,
      'Water takes ' + (SITES - n) + ' of the 75 sites, so its mole fraction is ' + fmt(X, 3) + '. The vapor pressure of pure water at 25 °C, 23.7 torr, is the one the Check Your Learning of Example 11.6 uses.');
  }
  const cy = cycle(() => Infinity, 0);
  register(d.fig, { update: (dt) => { cy.step(dt, () => 1); step(Math.min(dt, 0.05)); }, draw });
})();

/* =====================================================================
   FIGURE 11.23: phase diagrams of water and of an aqueous solution.
   Still: the diagram answers its slider and choice. Temperature axis
   fixed at −30 to 110 °C; pressure on a logarithmic axis from 0.001 to
   2 atm, so the triple point (0.008 atm here) and 1 atm both show.
   Water by Clausius–Clapeyron: ΔH_vap = 40.7 kJ/mol through 100 °C and
   1 atm (which gives K_b = 0.512 °C/m), ΔH_sub = 46.7 kJ/mol through the
   triple point. The solution's liquid–vapor curve is X_solvent times
   water's; its solid–liquid line stands at −iK_f m, and its triple point
   where that line meets the unchanged solid–gas curve.
===================================================================== */
(function () {
  const d = sim('sim-phase-diagram', 620);
  const I = { sucrose: 1, NaCl: 2, CaCl2: 3 }, NAME = { sucrose: 'sucrose', NaCl: 'sodium chloride', CaCl2: 'calcium chloride' };
  const mS = ctl(d.controls, { label: '\\kmolal', cls: 'concentration', min: 0, max: 3, step: 0.05, value: 1, unit: 'm', dec: 2, detents: [1], aria: 'molality of the solute, in moles per kilogram of water' });
  const sol = F.choice(d.controls, { label: '\\text{solute}', options: [{ value: 'sucrose', label: 'sucrose' }, { value: 'NaCl', label: 'NaCl' }, { value: 'CaCl2', label: 'CaCl₂' }], value: 'sucrose', aria: 'the solute dissolved in the water' });
  const RG = 8.314, HV = 40700, HS = 46700, KB = 0.512, KF = 1.86, W_MOL = 55.51;
  const K = (t) => t + 273.15;
  const Pvap = (t) => Math.exp(-HV / RG * (1 / K(t) - 1 / 373.15));
  const P3 = Pvap(0.01), Psub = (t) => P3 * Math.exp(-HS / RG * (1 / K(t) - 1 / 273.16));
  const box = { l: 150, r: 1320, t: 110, b: 530 };
  const X = (t) => box.l + (t + 30) / 140 * (box.r - box.l);
  const LO = -3, HI = Math.log10(2), Y = (p) => box.b - (Math.log10(p) - LO) / (HI - LO) * (box.b - box.t);
  const path = (ctx, f, t0, t1, color, dash) => {
    ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = 4; if (dash) ctx.setLineDash(dash); ctx.beginPath();
    let started = false;
    for (let i = 0; i <= 160; i++) { const t = t0 + (t1 - t0) * i / 160, p = f(t); if (p > 2 || p < 1e-3) { started = false; continue; } const x = X(t), y = Y(p); if (started) ctx.lineTo(x, y); else { ctx.moveTo(x, y); started = true; } }
    ctx.stroke(); ctx.restore();
  };
  function draw() {
    const { ctx } = begin(d.c);
    const m = mS.v, iv = sol.mix((s) => I[s]), ip = I[sol.value], ct = C('temperature'), cp = C('pressure');
    const Xs = W_MOL / (W_MOL + iv * m), tf = -iv * KF * m;
    const tb = 1 / (1 / 373.15 + RG * Math.log(Xs) / HV) - 273.15;
    /* frame */
    line(ctx, box.l, box.t, box.l, box.b, PAL.muted, 2); line(ctx, box.l, box.b, box.r, box.b, PAL.muted, 2);
    for (let t = -20; t <= 100; t += 20) { line(ctx, X(t), box.b, X(t), box.b + 8, PAL.muted, 2); text(ctx, minus(t), X(t), box.b + 26, PAL.muted, { size: 17, align: 'center' }); }
    for (const p of [0.001, 0.01, 0.1, 1]) { line(ctx, box.l - 8, Y(p), box.l, Y(p), PAL.muted, 2); line(ctx, box.l, Y(p), box.r, Y(p), alpha(PAL.ink, 0.12), 1); text(ctx, String(p), box.l - 14, Y(p), PAL.muted, { size: 17, align: 'right' }); }
    text(ctx, 'temperature (°C)', (box.l + box.r) / 2, box.b + 62, ct, { size: 20, weight: 600, align: 'center' });
    text(ctx, 'pressure (atm)', 30, box.t - 42, cp, { size: 20, weight: 600 });
    line(ctx, box.l, Y(1), box.r, Y(1), alpha(PAL.ink, 0.35), 2, [10, 10]);
    /* water, solid; the solution, dashed */
    const cSub = F.ref('sub-curve'), cVap = F.ref('vap-curve'), cMelt = F.ref('melt-curve');
    path(ctx, Psub, -30, 0.01, cSub);
    path(ctx, Pvap, 0.01, 110, cVap);
    line(ctx, X(0.01), Y(P3), X(0.01), box.t, cMelt, 4);
    const pT = Psub(tf);
    path(ctx, (t) => Xs * Pvap(t), tf, 110, cVap, [12, 9]);
    ctx.save(); ctx.setLineDash([12, 9]); line(ctx, X(tf), Y(pT), X(tf), box.t, cMelt, 4); ctx.restore();
    text(ctx, 'solid', X(-22), Y(0.3), PAL.muted, { size: 20, align: 'center' });
    text(ctx, 'liquid', X(45), Y(0.6), PAL.muted, { size: 20, align: 'center' });
    text(ctx, 'gas', X(60), Y(0.004), PAL.muted, { size: 20, align: 'center' });
    /* the colligative gaps */
    const dTf = ip * KF * m, dTb = ip * KB * m, dP = 1 - W_MOL / (W_MOL + ip * m);
    if (m > 0) {
      line(ctx, X(tf), Y(1), X(tf), Y(1) - 34, alpha(PAL.ink, 0.35), 2, [4, 8]); hbracket(ctx, X(tf), X(0), Y(1) - 34, ct, 'ΔT_{f}', { size: 20 });
      hbracket(ctx, X(100), X(tb), Y(1) - 34, ct, 'ΔT_{b}', { size: 20 });
      line(ctx, X(100), Y(1), X(100), Y(1) - 34, alpha(PAL.ink, 0.35), 2, [4, 8]);
      line(ctx, X(tb), Y(1), X(tb), Y(1) - 34, alpha(PAL.ink, 0.35), 2, [4, 8]);
      vbracket(ctx, X(100) - 14, Y(1), Y(Xs * Pvap(100)), cp, 'ΔP', -1, { side: 'left', size: 20 });
    }
    text(ctx, 'water', X(66), Y(Pvap(66)) - 24, PAL.ink, { size: 18, align: 'right', bg: PAL.panel });
    if (m > 0) text(ctx, 'solution', X(74), Y(Xs * Pvap(74)) + 28, PAL.ink, { size: 18, align: 'left', bg: PAL.panel });
    const fz = minus(fmt(-dTf, 2)), bp = fmt(100 + dTb, 2);
    topline(ctx, m === 0 ? 'With no solute, the solution’s curves lie on those of water.' : 'A ' + fmt(m, 2) + ' m solution of ' + NAME[sol.value] + ' freezes at ' + fz + ' °C and boils at ' + bp + ' °C.');
    const mm = hue('concentration', fmt(m, 2) + '\\ m');
    readout(d.readout, `\\kdTf = i\\kKf\\kmolal = ${ip} \\times ${hue('colligative-constant', '1.86\\ {}^{\\circ}\\text{C}/m')} \\times ${mm} = ${hue('temperature', fmt(dTf, 2) + '\\ {}^{\\circ}\\text{C}')}`,
      'By the same count of particles, the boiling point rises by ' + fmt(dTb, 2) + ' °C, and at 100 °C the vapor pressure is lowered by ' + fmt(dP, 3) + ' atm. For ' + NAME[sol.value] + ', i = ' + ip + (ip > 1 ? ', assuming complete dissociation.' : ', since it does not dissociate.'));
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 11.24 + 11.25: osmosis in a U-tube, and reverse osmosis under
   a piston, in three dimensions. Water left, glucose solution right, a
   membrane at the base. Moving: from equal levels the height difference
   relaxes toward (Π − P_applied), drawn at S units per atm, over a 6 s
   clock with time constant 1.5 s; water molecules in the base cross the
   membrane with a bias in the direction of the net flow, glucose never
   crosses. Scene unit = 10 cm, so S = 0.09 units per atm is 0.9 cm per
   atm against the true 10.3 m of water per atm: about 1000 times
   shorter, stated in the readout. The bench keeps the pitch 2° to 70°.
===================================================================== */
(function () {
  const T3D = window.THREE;
  const d = sim('sim-osmosis');
  const v = F.view3d(d.stage, { spin: 'off', pitch: [0.035, 1.22], views: [{ label: 'front', yaw: 0, pitch: 0.12 }, { label: 'above', yaw: 0, pitch: 1.1 }], h: 380, dist: 7.6, tilt: 0.14 });
  const grp = v.part(0), cnv = F.makeCanvas(d.stage, 230);
  grp.position.y = -0.2;
  const RT = 0.08206, TK = 310, S = 0.09, TAU_S = 1.5, PER = 6;
  const Mv = ctl(d.controls, { label: '\\kM', cls: 'concentration', min: 0, max: 0.5, step: 0.01, value: 0.3, unit: 'M', dec: 2, aria: 'molarity of the glucose solution', onInput: () => cy.reset() });
  const Pa = ctl(d.controls, { label: 'P_{\\text{applied}}', cls: 'pressure', min: 0, max: 15, step: 0.1, value: 0, unit: 'atm', dec: 1, aria: 'pressure applied to the piston over the solution, in atmospheres', specials: [{ at: () => Mv.v * RT * TK, label: 'Π' }], onInput: () => cy.reset() });
  const cy = cycle(() => PER, 1.2);
  const XA = 0.85, RA = 0.26, YB = -1.1, YL = 0.25, YTOP = 1.35;
  const Pi = () => Mv.v * RT * TK;
  const hOf = (t) => (Pi() - Pa.v) * (1 - Math.exp(-t / TAU_S));
  const R0 = rng(5);
  const mols = Array.from({ length: 22 }, (_, i) => ({ x: -0.7 + 1.4 * R0(), y: YB + (R0() - 0.5) * 0.3, z: (R0() - 0.5) * 0.3, u: (R0() < 0.5 ? -1 : 1) * (0.25 + 0.2 * R0()), glu: i >= 16 }));
  mols.forEach((q) => { if (q.glu) q.x = 0.15 + 0.55 * R0(); });
  function step(dt) {
    const flow = Math.max(-1, Math.min(1, (Pi() - Pa.v - hOf(cy.now())) / 4)), pass = [0.5 + 0.45 * flow, 0.5 - 0.45 * flow];
    for (const q of mols) {
      const nx = q.x + q.u * dt;
      if (Math.abs(nx) > XA - 0.05) { q.u *= -1; continue; }
      if (Math.sign(nx) !== Math.sign(q.x)) {
        const fromLeft = q.x < 0;
        if (q.glu || R0() > pass[fromLeft ? 0 : 1]) { q.u *= -1; continue; }
      }
      q.x = nx; q.y += (R0() - 0.5) * 0.02; q.y = Math.max(YB - 0.15, Math.min(YB + 0.15, q.y)); q.z += (R0() - 0.5) * 0.02; q.z = Math.max(-0.15, Math.min(0.15, q.z));
    }
  }
  let sig = '', liq = [], piston = null, rod = null, meshes = [];
  const ARM = (s) => F.ref(s < 0 ? 'water-arm' : 'solution-arm');
  const palSig = () => [PAL.ink, PAL.soft, PAL.muted, F.el('O'), F.el('H'), F.el('C'), ARM(-1), ARM(1), F.ref('membrane'), F.ref('piston')].join('|');
  function build() {
    if (palSig() === sig) return; sig = palSig();
    v.clear(); liq = []; meshes = [];
    const glass = glassOf(T3D), wet = { transparent: true, opacity: 0.22, depthWrite: false };
    v.pickable(F.mesh.box(grp, [0, YB - 0.42, 0], [3.4, 0.1, 1.4], PAL.soft), 'bench');
    for (const s of [-1, 1]) {
      const arm = new T3D.Mesh(new T3D.CylinderGeometry(RA + 0.03, RA + 0.03, YTOP - YB, 32, 1, true), F.mesh.mat(ARM(s), { ...glass, opacity: 0.16 })); arm.position.set(s * XA, (YTOP + YB) / 2, 0); grp.add(arm);
      v.pickable(arm, s < 0 ? 'the arm holding pure water' : 'the arm holding the glucose solution');
      liq.push(column(T3D, grp, s * XA, YB, YL, 0, RA, PAL.muted, wet));
      F.mesh.stick(grp, [s * XA, YB - 0.3, 0.4], [s * XA, YB - 0.37, 0.4], 0.06, PAL.muted);
    }
    const base = new T3D.Mesh(new T3D.CylinderGeometry(RA + 0.03, RA + 0.03, 2 * XA, 32, 1, true), F.mesh.mat(PAL.ink, glass)); base.rotation.z = Math.PI / 2; base.position.set(0, YB, 0); grp.add(base);
    const fill = new T3D.Mesh(new T3D.CylinderGeometry(RA, RA, 2 * XA, 32), F.mesh.mat(PAL.muted, wet)); fill.rotation.z = Math.PI / 2; fill.position.set(0, YB, 0); grp.add(fill);
    const mem = new T3D.Mesh(new T3D.CylinderGeometry(RA + 0.04, RA + 0.04, 0.03, 32), F.mesh.mat(F.ref('membrane'), { transparent: true, opacity: 0.6 })); mem.rotation.z = Math.PI / 2; mem.position.set(0, YB, 0); grp.add(mem);
    v.pickable(mem, 'the semipermeable membrane, which only water crosses');
    piston = column(T3D, grp, XA, 0, 0.08, 0, RA - 0.005, F.ref('piston'));
    v.pickable(piston, 'the piston pressing on the solution');
    rod = F.mesh.stick(grp, [XA, 0, 0], [XA, 0.5, 0], 0.04, F.ref('piston'));
    meshes = mols.map((q) => {
      const g = new T3D.Group(); grp.add(g);
      if (q.glu) {
        for (let k = 0; k < 6; k++) { const a = k * TAU / 6; v.pickable(F.mesh.sphere(g, [0.07 * Math.cos(a), 0.07 * Math.sin(a), 0], 0.04, F.el(k === 0 ? 'O' : 'C')), 'a glucose molecule, which cannot cross the membrane'); }
      } else {
        const w = water(g, [0, 0, 0], R0() * TAU, 0.8); w.parts.forEach((m) => v.pickable(m, 'a water molecule, which can cross the membrane'));
      }
      return g;
    });
    v.label('membrane', [0, YB - 0.55, 0.75], grp, 15).style.color = F.ref('membrane');
    v.label('water', [-XA - 0.6, YL + 0.3, 0], grp, 15).style.color = ARM(-1);
    v.label('solution', [XA + 0.7, YL + 0.3, 0], grp, 15).style.color = ARM(1);
  }
  function draw() {
    build();
    const t = cy.now(), h = hOf(Math.min(t, 1e6)), yl = YL - (h * S) / 2, yr = YL + (h * S) / 2, pi = Pi();
    liq[0].setSpan(YB, yl); liq[1].setSpan(YB, yr);
    const press = Pa.v > 0.05;
    piston.visible = rod.visible = press;
    if (press) { piston.setSpan(yr, yr + 0.08); F.mesh.setStick(rod, [XA, yr + 0.08, 0], [XA, yr + 0.65, 0]); }
    mols.forEach((q, i) => meshes[i].position.set(q.x, q.y, q.z));
    v.invalidate();
    const { ctx } = begin(cnv);
    const cp = C('pressure'), bx0 = 760, bx = (p) => bx0 + p * 20;
    const bar = (y, val, name, filled) => {
      text(ctx, name, 440, y, PAL.ink, { size: 18, align: 'right' });
      ctx.save(); ctx.fillStyle = filled ? alpha(cp, 0.75) : 'transparent'; ctx.strokeStyle = cp; ctx.lineWidth = 2;
      const x1 = bx(Math.min(0, val)), x2 = bx(Math.max(0, val)); if (filled) ctx.fillRect(x1, y - 12, x2 - x1, 24); ctx.strokeRect(x1, y - 12, x2 - x1, 24); ctx.restore();
      text(ctx, minus(fmt(val, 1)) + ' atm', bx(Math.max(val, 0)) + 14, y, PAL.ink, { size: 18 });
    };
    bar(110, pi, 'osmotic pressure Π', false);
    bar(150, Pa.v, 'applied pressure', false);
    bar(190, h, 'column height difference', true);
    line(ctx, bx0, 90, bx0, 208, PAL.muted, 2);
    const rising = Math.abs(pi - Pa.v - h) > 0.05;
    topline(ctx, pi < 0.05
      ? 'With no glucose, the two sides are pure water, and water crosses equally in both directions.'
      : Pa.v <= 0.05
        ? (rising ? 'Water crosses into the solution, whose column now stands ' + fmt(h, 1) + ' atm higher and is still rising.' : 'Water crosses into the ' + fmt(Mv.v, 2) + ' M glucose solution until its column stands ' + fmt(pi, 1) + ' atm higher.')
        : Math.abs(Pa.v - pi) <= 0.05
          ? 'With ' + fmt(Pa.v, 1) + ' atm applied, exactly the osmotic pressure, no water crosses on balance.'
          : Pa.v < pi
            ? 'With ' + fmt(Pa.v, 1) + ' atm applied, below the osmotic pressure, the column rises only ' + fmt(pi - Pa.v, 1) + ' atm.'
            : 'With ' + fmt(Pa.v, 1) + ' atm applied, above the osmotic pressure of ' + fmt(pi, 1) + ' atm, water leaves the solution.');
    readout(d.readout, `\\kosm = \\kM R\\kT = ${hue('concentration', fmt(Mv.v, 2) + '\\ \\text{mol/L}')} \\times 0.08206\\ \\text{L atm/mol K} \\times ${hue('temperature', '310\\ \\text{K}')} = ${hue('pressure', fmt(pi, 1) + '\\ \\text{atm}')}`,
      'A column of water ' + fmt(pi * 10.3, 0) + ' m tall would exert this pressure; the columns are drawn about 1000 times shorter.');
  }
  register(d.fig, { update: (dt) => { cy.step(dt, () => 1); step(Math.min(dt, 0.05)); }, draw });
})();

/* =====================================================================
   FIGURE 11.27: a red blood cell in solutions of different osmotic
   pressure. Still: the cell takes the shape it reaches in the solution.
   The fluid inside has Π = 7.7 atm; the cell's volume follows
   V/V₀ = 0.4 + 0.6 × 7.7/Π_outside (a share of its volume does not take
   part in osmosis), and it ruptures past V/V₀ = 1.6. A swelling cell
   loses its central dimple on its way to a sphere; a shrinking one
   shrivels into a spiky outline. CELL_RED is the colour of the cell,
   a physical fact.
===================================================================== */
(function () {
  const d = sim('sim-red-cells', 600);
  const CELL_RED = '#c0392b', PI_IN = 7.7;
  const Po = ctl(d.controls, { label: '\\kosm_{\\text{solution}}', cls: 'pressure', min: 0, max: 16, step: 0.1, value: 7.7, unit: 'atm', dec: 1, aria: 'osmotic pressure of the solution around the cell, in atmospheres', specials: [{ at: PI_IN, label: 'isotonic' }] });
  function draw() {
    const { ctx } = begin(d.c);
    const cell = F.fact(CELL_RED), po = Math.max(Po.v, 0.3), vr = 0.4 + 0.6 * PI_IN / po, burst = vr > 1.6;
    const cx = 700, cy = 290, R = 110 * Math.cbrt(Math.min(vr, 1.6));
    const dimple = Math.max(0, Math.min(1, (1.35 - vr) / 0.35)), spikes = Math.max(0, Math.min(1, (1 - vr) / 0.3));
    const rim = F.mixColor(cell, PAL.ink, 0.35);
    ctx.save();
    if (burst) {
      ctx.fillStyle = alpha(cell, 0.18);
      for (let k = 0; k < 9; k++) { const a = k * TAU / 9 + 0.3, r = R * (1.05 + 0.25 * ((k * 7) % 5) / 5); ctx.beginPath(); ctx.arc(cx + r * Math.cos(a), cy + r * Math.sin(a), 16 + (k % 3) * 6, 0, TAU); ctx.fill(); }
      ctx.strokeStyle = rim; ctx.lineWidth = 4; ctx.fillStyle = alpha(cell, 0.35);
      ctx.beginPath(); ctx.arc(cx, cy, R, 0.5, TAU - 0.2); ctx.fill(); ctx.stroke();
    } else {
      ctx.beginPath();
      for (let i = 0; i <= 240; i++) { const a = i * TAU / 240, r = R * (1 + 0.09 * spikes * Math.pow(Math.abs(Math.sin(7 * a)), 3)); const x = cx + r * Math.cos(a), y = cy + r * Math.sin(a); if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y); }
      ctx.closePath(); ctx.fillStyle = cell; ctx.fill(); ctx.strokeStyle = rim; ctx.lineWidth = 4; ctx.stroke();
      if (dimple > 0) { ctx.fillStyle = alpha(F.mixColor(cell, PAL.panel, 0.35), dimple); ctx.beginPath(); ctx.arc(cx, cy, R * 0.45, 0, TAU); ctx.fill(); }
    }
    ctx.restore();
    const state = Math.abs(po - PI_IN) < 0.05 ? 'isotonic' : po < PI_IN ? 'hypotonic' : 'hypertonic';
    const flow = state === 'isotonic' ? 'water enters and leaves at equal rates' : state === 'hypotonic' ? 'water enters the cell' : 'water leaves the cell';
    text(ctx, flow, cx + 230, cy, PAL.ink, { size: 20, align: 'left' });
    text(ctx, burst ? 'ruptured cell (hemolysis)' : state === 'hypertonic' ? 'shriveled cell (crenation)' : state === 'hypotonic' ? 'swollen cell' : 'normal cell', cx - 230, cy, PAL.ink, { size: 20, align: 'right' });
    /* a strip with the two osmotic pressures */
    const cp = C('pressure'), X = (p) => 300 + p * 50, ys = 540;
    line(ctx, X(0), ys, X(16), ys, PAL.muted, 2);
    for (let p = 0; p <= 16; p += 4) { line(ctx, X(p), ys - 7, X(p), ys + 7, PAL.muted, 2); text(ctx, String(p), X(p), ys + 24, PAL.muted, { size: 16, align: 'center' }); }
    text(ctx, 'osmotic pressure (atm)', X(0) - 20, ys, cp, { size: 18, weight: 600, align: 'right' });
    F.dot(ctx, X(PI_IN), ys, cp, false, 10); text(ctx, 'inside the cell', X(PI_IN), ys - 26, PAL.ink, { size: 16, align: 'center' });
    F.dot(ctx, X(Po.v), ys, cp, true, 9); if (Math.abs(Po.v - PI_IN) > 1.6) text(ctx, 'solution', X(Po.v), ys - 26, PAL.ink, { size: 16, align: 'center' });
    topline(ctx, state === 'isotonic'
      ? 'At 7.7 atm the solution is isotonic with the cell, which keeps its normal volume and shape.'
      : state === 'hypotonic'
        ? (burst ? 'At ' + fmt(Po.v, 1) + ' atm the solution is so hypotonic that the cell swells until it ruptures.' : 'At ' + fmt(Po.v, 1) + ' atm the solution is hypotonic, so the cell takes in water and swells.')
        : 'At ' + fmt(Po.v, 1) + ' atm the solution is hypertonic, so the cell loses water and shrivels.');
    const rel = state === 'isotonic' ? '=' : state === 'hypotonic' ? '<' : '>';
    readout(d.readout, `\\kosm_{\\text{solution}} = ${hue('pressure', fmt(Po.v, 1) + '\\ \\text{atm}')} ${rel} \\kosm_{\\text{cell}} = ${hue('pressure', '7.7\\ \\text{atm}')}`,
);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 11.28: ion pairs in a solution of potassium chloride, in three
   dimensions. Still: the box answers its slider. Eight formula units at
   every molality, so the true box edge grows as m^(−1/3); the scene
   keeps the box one size and scales the particles down with it, which
   keeps their spacing honest (edge 6.4 nm at 0.050 m, eight formula units in about 1 L per mol). Ion pairs: round(8 × min(0.5, 0.125 ×
   (m/0.05)^0.5)), one at 0.050 m (i = 15/8, near the 1.9 of Table 11.3
   for NaCl), none at 0.01 m and four at 1 m. Each ion wears a shell of
   up to four water molecules, O toward K⁺ and one H toward Cl⁻. Free
   yaw, pitch −30° to 80°, idle spin.
===================================================================== */
(function () {
  const d = sim('sim-ion-pairs');
  const v = F.view3d(d.stage, { spin: 'idle', pitch: [-0.52, 1.4], views: [{ label: 'front', yaw: 0, pitch: 0.25 }, { label: 'above', yaw: 0, pitch: 1.35 }], h: 380, dist: 6.4, tilt: 0.3 });
  const grp = v.part(0), cnv = F.makeCanvas(d.stage, 220);
  const mS = ctl(d.controls, { label: '\\kmolal', cls: 'concentration', min: 0.01, max: 1, step: 0.01, value: 0.05, unit: 'm', dec: 2, detents: [0.05, 0.2, 0.5, 1], aria: 'molality of potassium chloride' });
  const HALF = 1.2, RK = 0.14, RCL = 0.18, RO = 0.075, RH = 0.047, TET = [[1, 1, 1], [1, -1, -1], [-1, 1, -1], [-1, -1, 1]].map((p) => p.map((c) => c / Math.sqrt(3)));
  const add = (a, b, k = 1) => [a[0] + b[0] * k, a[1] + b[1] * k, a[2] + b[2] * k];
  const dot3 = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  const perp = (u) => { const w = Math.abs(u[1]) < 0.9 ? [u[2], 0, -u[0]] : [1, 0, 0], l = Math.hypot(...w); return w.map((c) => c / l); };
  const pairsAt = (m) => Math.round(8 * Math.min(0.5, 0.125 * Math.sqrt(m / 0.05)));
  let sig = '';
  const palSig = () => [PAL.ink, PAL.muted, F.el('K'), F.el('Cl'), F.el('O'), F.el('H'), fmt(mS.v, 2), F.ref('box')].join('|');
  function build() {
    if (palSig() === sig) return; sig = palSig();
    v.clear();
    const m = mS.v, L = 6.4 * Math.cbrt(0.05 / m), k = 2 * HALF / L, gap = Math.min(1, 0.3 * L), np = pairsAt(m), R = rng(19);
    F.mesh.box(grp, [0, 0, 0], [2 * HALF, 2 * HALF, 2 * HALF], PAL.ink, { transparent: true, opacity: 0.06, depthWrite: false });
    const edges = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
    const boxC = F.ref('box');
    for (const [a, b] of edges) { F.mesh.stick(grp, [a * HALF, -HALF, b * HALF], [a * HALF, HALF, b * HALF], 0.012, boxC); F.mesh.stick(grp, [-HALF, a * HALF, b * HALF], [HALF, a * HALF, b * HALF], 0.012, boxC); F.mesh.stick(grp, [a * HALF, b * HALF, -HALF], [a * HALF, b * HALF, HALF], 0.012, boxC); }
    /* ion centres in true units inside the box of edge L, kept apart by at least a shell's width */
    const reach = Math.max(L / 2 - 0.35, 0.15), placed = [], ions = [];
    const free = (p, gap) => placed.every((q) => Math.hypot(p[0] - q[0], p[1] - q[1], p[2] - q[2]) > gap);
    const pick = (gap) => { for (let tries = 0; tries < 400; tries++) { const p = [0, 0, 0].map(() => (R() * 2 - 1) * reach); if (free(p, gap)) return p; } return [0, 0, 0].map(() => (R() * 2 - 1) * reach); };
    for (let f = 0; f < 8; f++) {
      if (f < np) {
        const c = pick(1.25 * gap), u = [R() - 0.5, R() - 0.5, R() - 0.5], l = Math.hypot(...u), dir = u.map((x) => x / l), half = (RK + RCL) / 2;
        const pk = add(c, dir, -half), pc = add(c, dir, half); placed.push(c);
        ions.push({ e: 'K', p: pk, mate: dir }, { e: 'Cl', p: pc, mate: dir.map((x) => -x) });
      } else {
        for (const e of ['K', 'Cl']) { const p = pick(gap); placed.push(p); ions.push({ e, p }); }
      }
    }
    const S = (p) => p.map((c) => c * k);
    let firstK = null, firstCl = null, firstPair = null;
    ions.forEach((ion) => {
      const r = ion.e === 'K' ? RK : RCL, name = ion.mate ? (ion.e === 'K' ? 'a potassium ion, K⁺, in an ion pair' : 'a chloride ion, Cl⁻, in an ion pair') : (ion.e === 'K' ? 'a hydrated potassium ion, K⁺' : 'a hydrated chloride ion, Cl⁻');
      v.pickable(F.mesh.sphere(grp, S(ion.p), r * k, F.el(ion.e)), name);
      if (ion.mate && !firstPair) firstPair = ion.p;
      if (!ion.mate && ion.e === 'K' && !firstK) firstK = ion.p;
      if (!ion.mate && ion.e === 'Cl' && !firstCl) firstCl = ion.p;
      TET.forEach((dir) => {
        if (ion.mate && dot3(dir, ion.mate) > -0.2) return;
        const o = add(ion.p, dir, r + RO + (ion.e === 'K' ? 0.03 : 0.1)), u = dir.map((x) => -x), w = perp(u);
        const hs = ion.e === 'K'
          ? [add(add(o, u, -0.06), w, 0.075), add(add(o, u, -0.06), w, -0.075)]
          : [add(o, u, 0.095), add(add(o, u, -0.03), w, 0.09)];
        v.pickable(F.mesh.sphere(grp, S(o), RO * k, F.el('O')), 'a water molecule of the hydration shell');
        hs.forEach((h) => v.pickable(F.mesh.sphere(grp, S(h), RH * k, F.el('H')), 'a water molecule of the hydration shell'));
      });
    });
    if (firstK) v.label('K⁺', add(S(firstK), [0, (RK + 0.3) * k, 0]), grp, 15);
    if (firstCl) v.label('Cl⁻', add(S(firstCl), [0, (RCL + 0.3) * k, 0]), grp, 15);
    if (firstPair) v.label('ion pair', add(S(firstPair), [0, 0.45 * k, 0]), grp, 15);
  }
  function draw() {
    build(); v.invalidate();
    const { ctx } = begin(cnv);
    const np = pairsAt(mS.v), parts = 16 - np, X = (n) => 470 + n * 44;
    const rows = [{ y: 130, n: 8, name: 'formula units dissolved' }, { y: 178, n: parts, name: 'particles in solution' }];
    rows.forEach((r) => {
      text(ctx, r.name, 440, r.y, PAL.ink, { size: 18, align: 'right' });
      for (let j = 0; j < r.n; j++) { ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.12); ctx.strokeStyle = alpha(PAL.ink, 0.5); ctx.lineWidth = 1.5; ctx.fillRect(X(j), r.y - 12, 36, 24); ctx.strokeRect(X(j), r.y - 12, 36, 24); ctx.restore(); }
      text(ctx, String(r.n), X(r.n) + 12, r.y, PAL.ink, { size: 18, weight: 600 });
    });
    topline(ctx, np === 0
      ? 'At ' + fmt(mS.v, 3) + ' m the ions lie far apart and none pair, so the solution holds 16 particles for 8 formula units.'
      : 'At ' + fmt(mS.v, 3) + ' m, ' + (np === 1 ? 'one of the eight formula units is an ion pair' : ['', '', 'two', 'three', 'four'][np] + ' of the eight formula units are ion pairs') + ', so the solution holds ' + parts + ' particles for 8 formula units.');
    readout(d.readout, `i = \\frac{\\text{moles of particles in solution}}{\\text{moles of formula units dissolved}} = \\frac{${parts}}{8} = ${fmt(parts / 8, 2)}`);
  }
  register(d.fig, { update: () => {}, draw });
})();
};
