/* Figures for section 18.5 Occurrence, Preparation, and Compounds of Hydrogen. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['18.5'] = function (root, F) {
const { PAL, cycle, register, begin, text, dot } = F;
const TAU = 2 * Math.PI;
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;
/* a fixed pseudo-random number in [0, 1) for event k and draw j, so every run draws the same */
const rnd = (k, j) => { const s = Math.sin(k * 127.1 + j * 311.7) * 43758.5453; return s - Math.floor(s); };

/* =====================================================================
   FIGURE 18.26: the electrolysis of water, on a bench in three dimensions.
   A beaker of water with sulfuric acid, a battery standing in it, and an
   inverted test tube over each terminal, held by a ring. Moving: the cell
   runs for T = 6 s of model time and holds. One H₂ rises from the cathode
   (−) every TH = 0.2 s and one O₂ from the anode (+) every 2 TH, so the gas
   at the top of each tube grows as V = VMAX · t / T, hydrogen to 8.0 mL and
   oxygen to 4.0 mL. The tubes are drawn as 10 mL tubes, a scale of the
   drawing's own (the book states none), graduated every 2 mL. The cell
   stands on a bench, so the pitch stays between 2° and 70° above level.
===================================================================== */
(function () {
  const T3D = window.THREE;
  const d = F.sim(root, 'sim-electrolysis');
  const v = F.view3d(d.stage, { spin: 'off', pitch: [0.035, 1.22], views: [{ label: 'front', yaw: 0, pitch: 0.16 }, { label: 'above', yaw: 0, pitch: 1.1 }], h: 640, dist: 9.6, tilt: 0.16 });
  const grp = v.part(0), cnv = F.makeCanvas(d.stage, 100);
  if (grp) grp.position.y = -0.55;
  const T = 6, TH = 0.2, RISE = 1.5;
  /* the beaker, the battery, the tubes: radius, bottom, rim and liquid level; tube centres, mouth and closed end */
  const RB = 1.15, YB = -1.5, YT = 0.55, YL = 0.2;
  const BW = 0.95, BD = 0.55, YBAT = -0.45, YCAP = -0.7;
  const XT = 0.24, RT = 0.21, YM = -0.58, YC = 2.0, PER_ML = 0.2;
  const GAS = { H: { x: -XT, el: 'H', max: 8, every: TH, r: 0.034, gap: 0.05, name: 'a hydrogen molecule, H₂, rising from the cathode' },
    O: { x: XT, el: 'O', max: 4, every: 2 * TH, r: 0.046, gap: 0.066, name: 'an oxygen molecule, O₂, rising from the anode' } };
  const level = (g, t) => YC - PER_ML * g.max * t / T;
  const cy = cycle(() => T, 1.2);

  let sig = '', water = {}, pools = {};
  const palSig = () => [PAL.ink, PAL.soft, PAL.muted, PAL.panel, F.el('H'), F.el('O')].join('|');
  const glassMat = () => F.mesh.mat(PAL.ink, { transparent: true, opacity: 0.1, depthWrite: false, side: T3D.DoubleSide });
  const liquidMat = (o = 0.16) => F.mesh.mat(PAL.muted, { transparent: true, opacity: o, depthWrite: false });
  function cyl(r, y0, y1, mat, open) {
    const m = new T3D.Mesh(new T3D.CylinderGeometry(r, r, y1 - y0, 40, 1, !!open), mat);
    m.position.y = (y0 + y1) / 2; grp.add(m); return m;
  }
  function ring(x, y, R, r, color) {
    const m = new T3D.Mesh(new T3D.TorusGeometry(R, r, 8, 48), F.mesh.mat(color));
    m.rotation.x = Math.PI / 2; m.position.set(x, y, 0); grp.add(m); return m;
  }
  function molecule(g) {
    const m = new T3D.Group(); grp.add(m);
    for (const s of [-1, 1]) {
      v.pickable(F.mesh.sphere(m, [s * g.gap / 2, 0, 0], g.r, F.el(g.el)), g.name);
      F.mesh.sphere(m, [s * g.gap / 2, 0, 0], g.r * 1.18, PAL.ink, { side: T3D.BackSide });
    }
    /* drawn after the water so a molecule inside a tube is not veiled by it */
    m.traverse((o) => { if (o.material) { o.material.transparent = true; o.renderOrder = 2; } });
    m.position.set(0, -50, 0); return m;
  }
  function build() {
    if (!v.scene || palSig() === sig) return; sig = palSig();
    v.clear(); water = {}; pools = {};
    v.pickable(F.mesh.box(grp, [0, YB - 0.06, 0], [4.8, 0.1, 2.8], PAL.soft), 'the bench');
    cyl(RB, YB, YT, glassMat(), true);
    const floor = new T3D.Mesh(new T3D.CircleGeometry(RB, 40), glassMat()); floor.rotation.x = -Math.PI / 2; floor.position.y = YB + 0.005; grp.add(floor);
    ring(0, YT, RB, 0.02, PAL.muted);
    v.pickable(cyl(RB - 0.02, YB + 0.01, YL, liquidMat()), 'water containing sulfuric acid');
    /* the battery: its body, its dark top and its two terminals */
    v.pickable(F.mesh.box(grp, [0, (YB + YCAP) / 2 + 0.01, 0], [BW, YCAP - YB - 0.02, BD], PAL.soft), 'the battery');
    v.pickable(F.mesh.box(grp, [0, (YCAP + YBAT) / 2, 0], [BW, YBAT - YCAP, BD], PAL.muted), 'the battery');
    for (const g of [GAS.H, GAS.O]) {
      v.pickable(F.mesh.stick(grp, [g.x, YBAT, 0], [g.x, YBAT + 0.07, 0], 0.08, PAL.muted), g.el === 'H' ? 'the negative terminal, the cathode, where hydrogen forms' : 'the positive terminal, the anode, where oxygen forms');
      /* the tube: open at the mouth, closed by a dome above YC */
      v.pickable(cyl(RT, YM, YC, glassMat(), true), g.el === 'H' ? 'the test tube collecting hydrogen' : 'the test tube collecting oxygen').position.x = g.x;
      const dome = new T3D.Mesh(new T3D.SphereGeometry(RT, 32, 12, 0, TAU, 0, Math.PI / 2), glassMat()); dome.position.set(g.x, YC, 0); grp.add(dome);
      for (let ml = 2; ml <= 10; ml += 2) ring(g.x, YC - PER_ML * ml, RT + 0.004, 0.006, PAL.muted);
      const w = new T3D.Mesh(new T3D.CylinderGeometry(RT - 0.015, RT - 0.015, 1, 32), liquidMat(0.5)); grp.add(w);
      water[g.el] = v.pickable(w, 'water held up in the tube');
      water[g.el + 's'] = ring(g.x, 0, RT - 0.01, 0.014, PAL.ink);
      pools[g.el] = Array.from({ length: Math.ceil(2.2 / RISE / g.every) + 2 }, () => molecule(g));
    }
    ring(0, -0.1, RT + XT + 0.03, 0.025, PAL.muted);
    /* the labels sit off the apparatus, each led to its part by a thin line */
    const lead = (a, b) => F.mesh.polyline(grp, [a, b], PAL.muted);
    const tag = (s, p, to) => { v.label(s, p, grp, 0); lead([p[0] + Math.sign(to[0] - p[0]) * 0.35, p[1], p[2]], to); };
    tag('H<sub>2</sub>(<em>g</em>)', [-1.75, 1.6, 0], [-XT - RT, 1.6, 0]);
    tag('O<sub>2</sub>(<em>g</em>)', [1.75, 1.6, 0], [XT + RT, 1.6, 0]);
    tag('cathode (−)', [-1.85, -0.42, 0], [-XT - 0.08, YBAT + 0.04, 0]);
    tag('anode (+)', [1.85, -0.42, 0], [XT + 0.08, YBAT + 0.04, 0]);
    tag('battery', [-1.85, -1.15, 0], [-BW / 2, -1.15, 0]);
    tag('H<sub>2</sub>O(<em>l</em>) + H<sub>2</sub>SO<sub>4</sub>', [1.95, -1.15, 0], [RB - 0.25, -1.15, 0]);
    v.headline('Hydrogen collects at the cathode (−) twice as fast as oxygen at the anode (+).');
  }
  function place(t) {
    for (const g of [GAS.H, GAS.O]) {
      const top = level(g, t), w = water[g.el];
      w.scale.y = top - YM; w.position.set(g.x, (top + YM) / 2, 0); water[g.el + 's'].position.y = top;
      const pool = pools[g.el]; pool.forEach((m) => m.position.set(0, -50, 0));
      const K = Math.floor((T - 1.4) / g.every);
      let n = 0;
      for (let k = 0; k <= K && n < pool.length; k++) {
        const tk = k * g.every; if (tk > t) break;
        const u = RISE * (0.85 + 0.3 * rnd(k, g.max)), y = YBAT + 0.1 + u * (t - tk);
        if (y >= level(g, t) - 0.05) continue;
        const a = rnd(k, g.max + 3) * TAU, r = (RT - 0.07) * Math.sqrt(rnd(k, g.max + 5));
        const m = pool[n++];
        m.position.set(g.x + r * Math.cos(a) + 0.02 * Math.sin(7 * (t - tk) + k), y, r * Math.sin(a));
        m.rotation.set(0, rnd(k, g.max + 7) * TAU, (rnd(k, g.max + 9) - 0.5) * 1.6);
      }
    }
  }
  let lastTex = '';
  function draw() {
    build();
    const t = cy.now();
    if (v.scene) { place(t); v.invalidate(); }
    const vH = GAS.H.max * t / T, vO = GAS.O.max * t / T, ml = (x) => hue('volume', x.toFixed(1) + '\\;\\text{mL}');
    const s = `\\kV_{\\text{H}_2} = 2\\,\\kV_{\\text{O}_2}:\\quad ${ml(vH)} = 2\\,(${ml(vO)})`;
    if (s !== lastTex) { lastTex = s; F.tex(d.readout, s, false, { values: false }); }
    /* the legend: the book's three molecules, named once */
    const { ctx } = begin(cnv), y = 50;
    const items = [['water, H₂O(l)', [['O', 0, 0, 13], ['H', -13, 11, 9], ['H', 13, 11, 9]]],
      ['hydrogen, H₂(g)', [['H', -7, 0, 9], ['H', 7, 0, 9]]],
      ['oxygen, O₂(g)', [['O', -9, 0, 12], ['O', 9, 0, 12]]]];
    items.forEach(([name, atoms], i) => {
      const cx = 380 + i * 330;
      atoms.forEach(([e, dx, dy, r]) => {
        dot(ctx, cx - 40 + dx, y + dy, F.el(e), true, r);
        ctx.save(); ctx.strokeStyle = F.alpha(PAL.ink, 0.6); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(cx - 40 + dx, y + dy, r + 1, 0, TAU); ctx.stroke(); ctx.restore();
      });
      text(ctx, name, cx - 10, y, PAL.ink, { size: 26, align: 'left' });
    });
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();
};
