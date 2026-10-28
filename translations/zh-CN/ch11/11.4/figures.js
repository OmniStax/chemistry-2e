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
  const v = F.view3d(d.stage, { spin: 'off', pitch: [0.035, 1.22], views: [{ label: '正视', yaw: 0, pitch: 0.2 }, { label: '俯视', yaw: 0, pitch: 1.1 }], h: 360, dist: 6.2, tilt: 0.22 });
  const grp = v.part(0), cnv = F.makeCanvas(d.stage, 250);
  const NX = 5, NZ = 3, NY = 5, SITES = NX * NZ * NY, TOP = NX * NZ, SP = 0.26;
  const XB = 1.3, W = NX * SP, D = NZ * SP, Y0 = -1.0, YS = Y0 + NY * SP, YT = YS + 1.2;
  const SPEED = 1.3, VY = 0.75 * SPEED, TF = 2 * (YT - YS - 0.08) / VY, N_PURE = 14, R_EV = N_PURE / (TOP * TF), P_STAR = 23.7;
  const nU = ctl(d.controls, { label: '\\text{尿素分子数}', cls: '', min: 0, max: 30, step: 5, value: 15, unit: '个，共 75 个', dec: 0, aria: '溶液 75 个位点中的尿素分子数', onInput: () => { seedSolute(); sig = ''; } });
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
    v.pickable(F.mesh.box(grp, [0, Y0 - 0.1, 0], [5.0, 0.12, 1.8], PAL.soft), '工作台');
    const glass = glassOf(T3D), R = rng(11);
    for (const t of tanks) {
      const tank = new T3D.Group(); tank.position.set(t.x, 0, 0); grp.add(tank);
      v.pickable(F.mesh.box(tank, [0, (Y0 + YT) / 2, 0], [W + 0.08, YT - Y0 + 0.04, D + 0.08], TANK(t), { ...glass, opacity: 0.16 }), t.solute ? '一个盛有尿素水溶液的密闭容器' : '一个盛有纯水的密闭容器');
      F.mesh.box(tank, [0, YS - NY * SP / 2, 0], [W, NY * SP, D], PAL.muted, { transparent: true, opacity: 0.12, depthWrite: false });
      for (let k = 0; k < SITES; k++) {
        const p = siteAt(k);
        if (t.solute && urea.has(k)) {
          const u = new T3D.Group(); u.position.set(p[0], p[1], p[2]); u.rotation.y = R() * TAU; tank.add(u);
          const nm = '一个尿素分子 CO(NH₂)₂，一种不挥发性溶质';
          [[[0, 0, 0], 0.07, 'C'], [[0, 0.085, 0], 0.07, 'O'], [[-0.08, -0.05, 0], 0.07, 'N'], [[0.08, -0.05, 0], 0.07, 'N']].forEach(([q, r, e]) => v.pickable(F.mesh.sphere(u, q, r, F.el(e)), nm));
        } else {
          const w = water(tank, p, R() * TAU, 0.9); w.parts.forEach((m) => v.pickable(m, '液体中的一个水分子'));
        }
      }
      const pool = [];
      for (let j = 0; j < 40; j++) { const w = water(tank, [0, -9, 0], 0, 0.9); w.parts.forEach((m) => v.pickable(m, '蒸气中的一个水分子')); w.g.visible = false; pool.push(w.g); }
      pools.push(pool);
      v.label(t.solute ? '水溶液' : '纯水', [t.x, Y0 - 0.32, D / 2 + 0.3], grp, 16).style.color = TANK(t);
    }
  }
  function draw() {
    build();
    tanks.forEach((t, i) => pools[i].forEach((g, j) => { const q = t.vap[j]; g.visible = !!q; if (q) { g.position.set(q.p[0], q.p[1], q.p[2]); g.rotation.y = q.spin; } }));
    v.invalidate();
    const { ctx } = begin(cnv);
    const n = Math.round(nU.v), X = (SITES - n) / SITES;
    const cnt = tanks.map((t) => Math.round(t.avg ?? t.vap.length)), want = [N_PURE, N_PURE * X];
    const bx = (k) => 420 + k * 40, rows = [{ y: 120, name: '纯水上方的蒸气' }, { y: 180, name: '溶液上方的蒸气' }];
    rows.forEach((r, i) => {
      text(ctx, r.name, 395, r.y, PAL.ink, { size: 18, align: 'right' });
      ctx.save(); ctx.fillStyle = alpha(TANK(tanks[i]), 0.75); ctx.fillRect(bx(0), r.y - 13, bx(Math.min(cnt[i], 22)) - bx(0), 26); ctx.restore();
      line(ctx, bx(want[i]), r.y - 22, bx(want[i]), r.y + 22, PAL.ink, 3, [4, 4]);
      text(ctx, cnt[i] + ' 个分子', bx(Math.max(cnt[i], want[i])) + 18, r.y, PAL.ink, { size: 18 });
    });
    text(ctx, '虚线标记：拉乌尔定律预测的平均个数', bx(0), 226, PAL.muted, { size: 16 });
    topline(ctx, n === 0
      ? '没有尿素时，两种液体都是纯水，各自上方的蒸气稳定在约 ' + cnt[0] + ' 个分子。'
      : '水占据溶液表面位点的 ' + Math.round(X * 100) + '%，其上方的蒸气中有 ' + cnt[1] + ' 个分子，而纯水上方有 ' + cnt[0] + ' 个。');
    const Ps = X * P_STAR;
    readout(d.readout, `\\kPsoln = X_{\\text{溶剂}}\\kPsolvstar = ${fmt(X, 3)} \\times ${hue('pressure', '23.7\\ \\text{torr}')} = ${hue('pressure', fmt(Ps, 1) + '\\ \\text{torr}')}`,
      '水占据 75 个位点中的 ' + (SITES - n) + ' 个，所以它的摩尔分数为 ' + fmt(X, 3) + '。纯水在 25 °C 时的蒸气压 23.7 torr，就是例 11.6 的“学习检测”所用的值。');
  }
  const cy = cycle(() => Infinity, 0);
  register(d.fig, { update: (dt) => { cy.step(dt, () => 1); step(Math.min(dt, 0.05)); }, draw });
})();

/* =====================================================================
   FIGURE 11.23: phase diagrams of water and of an aqueous solution.
   Still: the diagram answers its slider and choice. Left, the overview:
   temperature fixed at −40 to 120 °C, pressure on a logarithmic axis
   from 0.001 to 10 atm, so the triple point (0.006 atm) and 1 atm both
   show; it carries the ΔT_f bracket. Right, a linear inset round the
   normal boiling point, 98 to 106 °C and 0.85 to 1.10 atm, which holds
   the ΔT_b and ΔP brackets at 3.00 m of CaCl2 (4.3 °C, 0.14 atm) and
   magnifies the 0.51 °C and 0.018 atm of the default to a readable size.
   Water by Clausius–Clapeyron: ΔH_vap = 40.7 kJ/mol through 100 °C and
   1 atm (which gives K_b = 0.512 °C/m), ΔH_sub = 46.7 kJ/mol through the
   triple point. The solution's liquid–vapor curve is X_solvent times
   water's; its solid–liquid line stands at −iK_f m, and its triple point
   where that line meets the unchanged solid–gas curve.
===================================================================== */
(function () {
  const d = sim('sim-phase-diagram', 620);
  const I = { sucrose: 1, NaCl: 2, CaCl2: 3 }, NAME = { sucrose: '蔗糖', NaCl: '氯化钠', CaCl2: '氯化钙' };
  const mS = ctl(d.controls, { label: '\\kmolal', cls: 'concentration', min: 0, max: 3, step: 0.05, value: 1, unit: 'm', dec: 2, detents: [1], aria: '溶质的质量摩尔浓度，单位为每千克水中溶质的物质的量（mol）' });
  const sol = F.choice(d.controls, { label: '\\text{溶质}', options: [{ value: 'sucrose', label: '蔗糖' }, { value: 'NaCl', label: 'NaCl' }, { value: 'CaCl2', label: 'CaCl₂' }], value: 'sucrose', aria: '溶于水中的溶质' });
  const RG = 8.314, HV = 40700, HS = 46700, KB = 0.512, KF = 1.86, W_MOL = 55.51;
  const K = (t) => t + 273.15;
  const Pvap = (t) => Math.exp(-HV / RG * (1 / K(t) - 1 / 373.15));
  const P3 = Pvap(0.01), Psub = (t) => P3 * Math.exp(-HS / RG * (1 / K(t) - 1 / 273.16));
  /* the overview's axes run in t + 40 and log10 P + 3, so neither range straddles the zero F.axes rules */
  const OB = { l: 120, r: 820, t: 120, b: 520 }, IB = { l: 960, r: 1350, t: 120, b: 470 };
  const IX = [98, 106], IY = [0.85, 1.1];
  const lg = (p) => Math.log10(Math.max(p, 1e-9)) + 3;
  function clipTo(ctx, b, f) { ctx.save(); ctx.beginPath(); ctx.rect(b.l, b.t, b.r - b.l, b.b - b.t); ctx.clip(); f(); ctx.restore(); }
  function dashed(ctx, f) { ctx.save(); ctx.setLineDash([12, 9]); f(); ctx.restore(); }
  function draw() {
    const { ctx, H } = begin(d.c), lab = F.labeller(ctx, H, { headline: true });
    const m = mS.v, iv = sol.mix((s) => I[s]), ip = I[sol.value], ct = C('temperature'), cp = C('pressure');
    const Xs = W_MOL / (W_MOL + iv * m), tf = -iv * KF * m;
    const tb = 1 / (1 / 373.15 + RG * Math.log(Xs) / HV) - 273.15;
    const cSub = F.ref('sub-curve'), cVap = F.ref('vap-curve'), cMelt = F.ref('melt-curve'), guide = alpha(PAL.ink, 0.35);
    const sol_ = (t) => Xs * Pvap(t);
    /* the overview */
    const o = F.axes(ctx, OB, [0, 160], [0, 4], { nx: 8, ny: 4, fx: (v) => minus(fmt(v - 40, 0)), fy: (v) => String(+(10 ** (v - 3)).toPrecision(1)), xl: '温度（°C）', xc: ct, yl: '压强（atm）', yc: cp });
    const OX = (t) => o.X(t + 40), OY = (p) => o.Y(lg(p));
    clipTo(ctx, OB, () => {
      line(ctx, OB.l, OY(1), OB.r, OY(1), guide, 2, [10, 10]);
      F.curve(ctx, (t) => lg(Psub(t)), -40, 0.01, OX, o.Y, cSub, 4, 120);
      F.curve(ctx, (t) => lg(Pvap(t)), 0.01, 120, OX, o.Y, cVap, 4, 160);
      line(ctx, OX(0.01), OY(P3), OX(0.01), OB.t, cMelt, 4);
      if (m > 0) dashed(ctx, () => {
        F.curve(ctx, (t) => lg(sol_(t)), tf, 120, OX, o.Y, cVap, 4, 160);
        line(ctx, OX(tf), OY(Psub(tf)), OX(tf), OB.t, cMelt, 4);
      });
    });
    text(ctx, '固相', OX(-30), OY(0.1), PAL.muted, { size: 20, align: 'center' });
    text(ctx, '液相', OX(45), OY(3), PAL.muted, { size: 20, align: 'center' });
    text(ctx, '气相', OX(45), OY(0.01), PAL.muted, { size: 20, align: 'center' });
    /* the legend, in the overview's empty gas region */
    const lx = OX(78), ly = OY(0.0035);
    line(ctx, lx, ly, lx + 46, ly, PAL.ink, 4); text(ctx, '水', lx + 58, ly, PAL.ink, { size: 18 });
    dashed(ctx, () => line(ctx, lx, ly + 32, lx + 46, ly + 32, PAL.ink, 4)); text(ctx, '溶液', lx + 58, ly + 32, PAL.ink, { size: 18 });
    lab.block(lx - 8, ly - 16, lx + 150, ly + 48);
    /* the window the inset magnifies */
    const wl = OX(IX[0]), wr = OX(IX[1]), wt = OY(IY[1]), wb = OY(IY[0]);
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2; ctx.strokeRect(wl, wt, wr - wl, wb - wt); ctx.restore();
    const dTf = ip * KF * m, dTb = ip * KB * m, dP = 1 - W_MOL / (W_MOL + ip * m);
    if (m > 0) {
      const yb = OY(1) - 44;
      line(ctx, OX(tf), OY(1), OX(tf), yb, guide, 2, [4, 8]);
      hbracket(ctx, OX(tf), OX(0), yb, ct);
      lab.block(OX(tf) - 6, OB.t, OX(0) + 6, OB.b);
      lab.add('ΔT_{f}', OX(tf) - 10, yb, -1, 0, ct, 20, 12);
    }
    /* the inset */
    const n = F.axes(ctx, IB, IX, IY, { nx: 4, ny: 5, fy: (v) => fmt(v, 2), xl: '温度（°C）', xc: ct, yl: '压强（atm）', yc: cp });
    ctx.save(); ctx.strokeStyle = PAL.rule; ctx.lineWidth = 1.5; ctx.strokeRect(IB.l, IB.t, IB.r - IB.l, IB.b - IB.t); ctx.restore();
    lab.block(IB.l - 70, IB.t - 40, IB.r, IB.t - 8); lab.block(IB.l - 70, IB.t, IB.l, IB.b + 70); lab.block(IB.l, IB.b, IB.r + 30, IB.b + 70);
    text(ctx, '液相', IB.l + 14, IB.t + 24, PAL.muted, { size: 20 });
    text(ctx, '气相', IB.r - 14, IB.b - 22, PAL.muted, { size: 20, align: 'right' });
    lab.block(IB.l, IB.t, IB.l + 80, IB.t + 44); lab.block(IB.r - 60, IB.b - 44, IB.r, IB.b);
    clipTo(ctx, IB, () => {
      line(ctx, IB.l, n.Y(1), IB.r, n.Y(1), guide, 2, [10, 10]);
      F.curve(ctx, Pvap, IX[0], IX[1], n.X, n.Y, cVap, 4, 80);
      if (m > 0) dashed(ctx, () => F.curve(ctx, sol_, IX[0], IX[1], n.X, n.Y, cVap, 4, 80));
    });
    /* the curves join the labels' collision set, so a label steps off them */
    for (let t = IX[0]; t <= IX[1]; t += 0.08) for (const p of m > 0 ? [Pvap(t), sol_(t)] : [Pvap(t)]) {
      if (p < IY[0] || p > IY[1]) continue;
      const x = n.X(t), y = n.Y(p); lab.block(x - 3, y - 3, x + 3, y + 3);
    }
    if (m > 0) {
      const x0 = n.X(100), x1 = n.X(tb), y0 = n.Y(1), y1 = n.Y(Xs);
      hbracket(ctx, x0, x1, y0, ct);
      vbracket(ctx, x0, y0, y1, cp);
      lab.block(x0 - 6, y0 - 6, x0 + 6, y1 + 6); lab.block(x0 - 6, y0 - 12, x1 + 6, y0 + 12);
      /* ΔT_b leaves its bracket down into the gas, clear of both curves */
      const aim = (hx, hy, tx, ty) => { const L = Math.hypot(tx - hx, ty - hy) || 1; return [(tx - hx) / L, (ty - hy) / L, Math.max(20, L)]; };
      const [bx, by, bg] = aim((x0 + x1) / 2, y0, n.X(tb + 0.7), n.Y(0.965));
      lab.add('ΔT_{b}', (x0 + x1) / 2, y0 + 6, bx, by, ct, 20, bg);
    }
    lab.flush();
    if (m > 0) {
      /* ΔP is set in the liquid region above 1 atm, where nothing moves at any molality, and leadered back to its bracket */
      const x0 = n.X(100), ym = (n.Y(1) + n.Y(Xs)) / 2, hx = IB.l + 64, hy = n.Y(1.045), L = Math.hypot(hx - x0, hy - ym);
      line(ctx, x0 + (hx - x0) / L * 12, ym + (hy - ym) / L * 12, hx + (x0 - hx) / L * 30, hy + (ym - hy) / L * 30, alpha(cp, 0.5), 1.5, [5, 6]);
      text(ctx, 'ΔP_{vp}', hx, hy, cp, { size: 20, weight: 600, align: 'center', bg: PAL.panel });
    }
    const fz = minus(fmt(-dTf, 2)), bp = fmt(100 + dTb, 2);
    topline(ctx, m === 0 ? '没有溶质时，溶液的曲线与水的曲线重合。' : fmt(m, 2) + ' m ' + NAME[sol.value] + '溶液在 ' + fz + ' °C 凝固，在 ' + bp + ' °C 沸腾。');
    const mm = hue('concentration', fmt(m, 2) + '\\ m');
    tex(d.readout, `\\kdTf = i\\kKf\\kmolal = ${ip} \\times ${hue('colligative-constant', '1.86\\ {}^{\\circ}\\text{C}/m')} \\times ${mm} = ${hue('temperature', fmt(dTf, 2) + '\\ {}^{\\circ}\\text{C}')}`);
    const sm = d.readout.appendChild(el('small'));
    tex(sm, `\\text{在 } ${hue('temperature', '100\\ {}^{\\circ}\\text{C}')}\\text{ 时：} \\kdPvp = (1 - X_{\\text{溶剂}}) \\times ${hue('pressure', '1\\ \\text{atm}')} = ${hue('pressure', fmt(dP, 3) + '\\ \\text{atm}')}`);
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
  const v = F.view3d(d.stage, { spin: 'off', pitch: [0.035, 1.22], views: [{ label: '正视', yaw: 0, pitch: 0.12 }, { label: '俯视', yaw: 0, pitch: 1.1 }], h: 380, dist: 7.6, tilt: 0.14 });
  const grp = v.part(0), cnv = F.makeCanvas(d.stage, 230);
  grp.position.y = -0.2;
  const RT = 0.08206, TK = 310, S = 0.09, TAU_S = 1.5, PER = 6;
  const Mv = ctl(d.controls, { label: '\\kM', cls: 'concentration', min: 0, max: 0.5, step: 0.01, value: 0.3, unit: 'M', dec: 2, aria: '葡萄糖溶液的物质的量浓度', onInput: () => cy.reset() });
  const Pa = ctl(d.controls, { label: 'P_{\\text{外加}}', cls: 'pressure', min: 0, max: 15, step: 0.1, value: 0, unit: 'atm', dec: 1, aria: '施加在溶液上方活塞上的压强，单位为标准大气压', specials: [{ at: () => Mv.v * RT * TK, label: 'Π' }], onInput: () => cy.reset() });
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
    v.pickable(F.mesh.box(grp, [0, YB - 0.42, 0], [3.4, 0.1, 1.4], PAL.soft), '工作台');
    for (const s of [-1, 1]) {
      const arm = new T3D.Mesh(new T3D.CylinderGeometry(RA + 0.03, RA + 0.03, YTOP - YB, 32, 1, true), F.mesh.mat(ARM(s), { ...glass, opacity: 0.16 })); arm.position.set(s * XA, (YTOP + YB) / 2, 0); grp.add(arm);
      v.pickable(arm, s < 0 ? '盛纯水的一侧' : '盛葡萄糖溶液的一侧');
      liq.push(column(T3D, grp, s * XA, YB, YL, 0, RA, PAL.muted, wet));
      F.mesh.stick(grp, [s * XA, YB - 0.3, 0.4], [s * XA, YB - 0.37, 0.4], 0.06, PAL.muted);
    }
    const base = new T3D.Mesh(new T3D.CylinderGeometry(RA + 0.03, RA + 0.03, 2 * XA, 32, 1, true), F.mesh.mat(PAL.ink, glass)); base.rotation.z = Math.PI / 2; base.position.set(0, YB, 0); grp.add(base);
    const fill = new T3D.Mesh(new T3D.CylinderGeometry(RA, RA, 2 * XA, 32), F.mesh.mat(PAL.muted, wet)); fill.rotation.z = Math.PI / 2; fill.position.set(0, YB, 0); grp.add(fill);
    const mem = new T3D.Mesh(new T3D.CylinderGeometry(RA + 0.04, RA + 0.04, 0.03, 32), F.mesh.mat(F.ref('membrane'), { transparent: true, opacity: 0.6 })); mem.rotation.z = Math.PI / 2; mem.position.set(0, YB, 0); grp.add(mem);
    v.pickable(mem, '半透膜，只有水能透过');
    piston = column(T3D, grp, XA, 0, 0.08, 0, RA - 0.005, F.ref('piston'));
    v.pickable(piston, '压在溶液上的活塞');
    rod = F.mesh.stick(grp, [XA, 0, 0], [XA, 0.5, 0], 0.04, F.ref('piston'));
    meshes = mols.map((q) => {
      const g = new T3D.Group(); grp.add(g);
      if (q.glu) {
        for (let k = 0; k < 6; k++) { const a = k * TAU / 6; v.pickable(F.mesh.sphere(g, [0.07 * Math.cos(a), 0.07 * Math.sin(a), 0], 0.04, F.el(k === 0 ? 'O' : 'C')), '一个葡萄糖分子，不能透过膜'); }
      } else {
        const w = water(g, [0, 0, 0], R0() * TAU, 0.8); w.parts.forEach((m) => v.pickable(m, '一个水分子，能透过膜'));
      }
      return g;
    });
    v.label('膜', [0, YB - 0.55, 0.75], grp, 15).style.color = F.ref('membrane');
    v.label('水', [-XA - 0.6, YL + 0.3, 0], grp, 15).style.color = ARM(-1);
    v.label('溶液', [XA + 0.7, YL + 0.3, 0], grp, 15).style.color = ARM(1);
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
    bar(110, pi, '渗透压 Π', false);
    bar(150, Pa.v, '外加压强', false);
    bar(190, h, '液柱高度差', true);
    line(ctx, bx0, 90, bx0, 208, PAL.muted, 2);
    const rising = Math.abs(pi - Pa.v - h) > 0.05;
    topline(ctx, pi < 0.05
      ? '没有葡萄糖时，两侧都是纯水，水向两个方向的透过量相等。'
      : Pa.v <= 0.05
        ? (rising ? '水透过膜进入溶液，溶液一侧的液柱现在高出 ' + fmt(h, 1) + ' atm，并且仍在上升。' : '水透过膜进入 ' + fmt(Mv.v, 2) + ' M 葡萄糖溶液，直到其液柱高出 ' + fmt(pi, 1) + ' atm。')
        : Math.abs(Pa.v - pi) <= 0.05
          ? '施加 ' + fmt(Pa.v, 1) + ' atm，恰好等于渗透压，总体上没有水透过。'
          : Pa.v < pi
            ? '施加 ' + fmt(Pa.v, 1) + ' atm，低于渗透压，液柱只上升 ' + fmt(pi - Pa.v, 1) + ' atm。'
            : '施加 ' + fmt(Pa.v, 1) + ' atm，高于 ' + fmt(pi, 1) + ' atm 的渗透压，水离开溶液。');
    readout(d.readout, `\\kosm = \\kM R\\kT = ${hue('concentration', fmt(Mv.v, 2) + '\\ \\text{mol/L}')} \\times 0.08206\\ \\text{L atm/mol K} \\times ${hue('temperature', '310\\ \\text{K}')} = ${hue('pressure', fmt(pi, 1) + '\\ \\text{atm}')}`,
      '这一压强相当于一根 ' + fmt(pi * 10.3, 0) + ' m 高的水柱所产生的压强；图中液柱的高度约为实际的 1/1000。');
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
  const Po = ctl(d.controls, { label: '\\kosm_{\\text{溶液}}', cls: 'pressure', min: 0, max: 16, step: 0.1, value: 7.7, unit: 'atm', dec: 1, aria: '细胞周围溶液的渗透压，单位为标准大气压', specials: [{ at: PI_IN, label: '等渗' }] });
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
    const flow = state === 'isotonic' ? '水进出的速率相等' : state === 'hypotonic' ? '水进入细胞' : '水离开细胞';
    text(ctx, flow, cx + 230, cy, PAL.ink, { size: 20, align: 'left' });
    text(ctx, burst ? '破裂的细胞（溶血）' : state === 'hypertonic' ? '干瘪的细胞（皱缩）' : state === 'hypotonic' ? '膨胀的细胞' : '正常的细胞', cx - 230, cy, PAL.ink, { size: 20, align: 'right' });
    /* a strip with the two osmotic pressures */
    const cp = C('pressure'), X = (p) => 300 + p * 50, ys = 540;
    line(ctx, X(0), ys, X(16), ys, PAL.muted, 2);
    for (let p = 0; p <= 16; p += 4) { line(ctx, X(p), ys - 7, X(p), ys + 7, PAL.muted, 2); text(ctx, String(p), X(p), ys + 24, PAL.muted, { size: 16, align: 'center' }); }
    text(ctx, '渗透压（atm）', X(0) - 20, ys, cp, { size: 18, weight: 600, align: 'right' });
    F.dot(ctx, X(PI_IN), ys, cp, false, 10); text(ctx, '细胞内', X(PI_IN), ys - 26, PAL.ink, { size: 16, align: 'center' });
    F.dot(ctx, X(Po.v), ys, cp, true, 9); if (Math.abs(Po.v - PI_IN) > 1.6) text(ctx, '溶液', X(Po.v), ys - 26, PAL.ink, { size: 16, align: 'center' });
    topline(ctx, state === 'isotonic'
      ? '在 7.7 atm 时，溶液与细胞等渗，细胞保持其正常的体积和形状。'
      : state === 'hypotonic'
        ? (burst ? '在 ' + fmt(Po.v, 1) + ' atm 时，溶液的低渗程度很高，细胞膨胀直至破裂。' : '在 ' + fmt(Po.v, 1) + ' atm 时，溶液是低渗的，所以细胞吸水而膨胀。')
        : '在 ' + fmt(Po.v, 1) + ' atm 时，溶液是高渗的，所以细胞失水而干瘪。');
    const rel = state === 'isotonic' ? '=' : state === 'hypotonic' ? '<' : '>';
    readout(d.readout, `\\kosm_{\\text{溶液}} = ${hue('pressure', fmt(Po.v, 1) + '\\ \\text{atm}')} ${rel} \\kosm_{\\text{细胞}} = ${hue('pressure', '7.7\\ \\text{atm}')}`,
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
  const v = F.view3d(d.stage, { spin: 'idle', pitch: [-0.52, 1.4], views: [{ label: '正视', yaw: 0, pitch: 0.25 }, { label: '俯视', yaw: 0, pitch: 1.35 }], h: 380, dist: 6.4, tilt: 0.3 });
  const grp = v.part(0), cnv = F.makeCanvas(d.stage, 220);
  const mS = ctl(d.controls, { label: '\\kmolal', cls: 'concentration', min: 0.01, max: 1, step: 0.01, value: 0.05, unit: 'm', dec: 2, detents: [0.05, 0.2, 0.5, 1], aria: '氯化钾的质量摩尔浓度' });
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
      const r = ion.e === 'K' ? RK : RCL, name = ion.mate ? (ion.e === 'K' ? '离子对中的一个钾离子 K⁺' : '离子对中的一个氯离子 Cl⁻') : (ion.e === 'K' ? '一个水合钾离子 K⁺' : '一个水合氯离子 Cl⁻');
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
        v.pickable(F.mesh.sphere(grp, S(o), RO * k, F.el('O')), '水合壳层中的一个水分子');
        hs.forEach((h) => v.pickable(F.mesh.sphere(grp, S(h), RH * k, F.el('H')), '水合壳层中的一个水分子'));
      });
    });
    if (firstK) v.label('K⁺', add(S(firstK), [0, (RK + 0.3) * k, 0]), grp, 15);
    if (firstCl) v.label('Cl⁻', add(S(firstCl), [0, (RCL + 0.3) * k, 0]), grp, 15);
    if (firstPair) v.label('离子对', add(S(firstPair), [0, 0.45 * k, 0]), grp, 15);
  }
  function draw() {
    build(); v.invalidate();
    const { ctx } = begin(cnv);
    const np = pairsAt(mS.v), parts = 16 - np, X = (n) => 470 + n * 44;
    const rows = [{ y: 130, n: 8, name: '所溶解的化学式单元' }, { y: 178, n: parts, name: '溶液中的粒子' }];
    rows.forEach((r) => {
      text(ctx, r.name, 440, r.y, PAL.ink, { size: 18, align: 'right' });
      for (let j = 0; j < r.n; j++) { ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.12); ctx.strokeStyle = alpha(PAL.ink, 0.5); ctx.lineWidth = 1.5; ctx.fillRect(X(j), r.y - 12, 36, 24); ctx.strokeRect(X(j), r.y - 12, 36, 24); ctx.restore(); }
      text(ctx, String(r.n), X(r.n) + 12, r.y, PAL.ink, { size: 18, weight: 600 });
    });
    topline(ctx, np === 0
      ? '在 ' + fmt(mS.v, 3) + ' m 时，离子相距很远，没有成对的，所以溶液中有 16 个粒子，对应 8 个化学式单元。'
      : '在 ' + fmt(mS.v, 3) + ' m 时，八个化学式单元中有' + ['', '一', '两', '三', '四'][np] + '个形成离子对，所以溶液中有 ' + parts + ' 个粒子，对应 8 个化学式单元。');
    readout(d.readout, `i = \\frac{\\text{溶液中粒子的物质的量}}{\\text{所溶化学式单元的物质的量}} = \\frac{${parts}}{8} = ${fmt(parts / 8, 2)}`);
  }
  register(d.fig, { update: () => {}, draw });
})();
};
