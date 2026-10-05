/* Figures for section 11.2 Electrolytes. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['11.2'] = function (root, F) {
const { el, tex, PAL, alpha, cycle, register, begin, text, topline } = F;
const sim = (id, H) => F.sim(root, id, H);
function readout(host, main, small) { tex(host, main); if (small) host.appendChild(el('small', null, small)); }
const TAU = 2 * Math.PI;
const clamp01 = (x) => Math.max(0, Math.min(1, x));
const smooth = F.ease.smooth;
const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const mul = (a, k) => [a[0] * k, a[1] * k, a[2] * k];
const unit = (a) => { const l = Math.hypot(a[0], a[1], a[2]) || 1; return [a[0] / l, a[1] / l, a[2] / l]; };
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const heading = () => { const z = 2 * Math.random() - 1, a = Math.random() * TAU, r = Math.sqrt(1 - z * z); return [r * Math.cos(a), r * Math.sin(a), z]; };
/* a bar of n particles of one kind in a strip, filled to `full` of `total` */
function bar(ctx, x0, y, per, full, total, col) {
  ctx.save(); ctx.fillStyle = col; ctx.strokeStyle = alpha(PAL.ink, 0.5); ctx.lineWidth = 1.5;
  ctx.fillRect(x0, y - 12, per * full, 24); ctx.strokeRect(x0, y - 12, per * full, 24);
  ctx.globalAlpha = 0.35; ctx.fillRect(x0 + per * full, y - 12, per * (total - full), 24); ctx.globalAlpha = 1;
  if (total > full) ctx.strokeRect(x0 + per * full, y - 12, per * (total - full), 24);
  ctx.restore();
}
function ball(ctx, x, y, r, col) { ctx.save(); ctx.fillStyle = col; ctx.strokeStyle = alpha(PAL.ink, 0.5); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore(); }

/* =====================================================================
   FIGURE 11.6: a conductivity bench in three dimensions. A beaker with
   two electrodes, wired through a bulb to a power supply; the solute is a
   choice of ethanol, KCl or acetic acid. Moving: every ion drifts toward
   the electrode of opposite charge and, arriving, is replaced by one of
   its kind at the far side, so the current runs steadily; molecules only
   jostle. The bulb's brightness follows the number of ions. The bench
   stands on a table, so the pitch stays between 2° and 70° above level.
   BULB_LIGHT is the warm light of a glowing filament, a physical colour.
===================================================================== */
(function () {
  const T3D = window.THREE;
  const BULB_LIGHT = '#ffc94d';
  const d = sim('sim-conductivity');
  const v = F.view3d(d.stage, { spin: 'off', pitch: [0.035, 1.22], views: [{ label: 'front', yaw: 0, pitch: 0.16 }, { label: 'above', yaw: 0, pitch: 1.1 }], h: 380, dist: 7.0, tilt: 0.2 });
  const grp = v.part(0), cnv = F.makeCanvas(d.stage, 230);
  const XE = 0.55, YB = -1.2;
  /* the space between the electrodes that the particles move through */
  const BOX = { x: 0.4, y0: -1.0, y1: -0.05, z: 0.38 };
  const ATOM = { C: 0.075, O: 0.07, H: 0.045 };
  const MOL = {
    ethanol: { atoms: [['C', [-0.12, 0, 0]], ['C', [0, 0.07, 0]], ['O', [0.12, 0, 0]]], name: 'an ethanol molecule, C<sub>2</sub>H<sub>5</sub>OH (hydrogen atoms not shown)' },
    acid: { atoms: [['C', [-0.13, 0, 0]], ['C', [0, 0, 0]], ['O', [0.07, 0.11, 0]], ['O', [0.08, -0.1, 0]]], name: 'an acetic acid molecule, CH<sub>3</sub>CO<sub>2</sub>H (hydrogen atoms not shown)' },
    acetate: { atoms: [['C', [-0.13, 0, 0]], ['C', [0, 0, 0]], ['O', [0.07, 0.11, 0]], ['O', [0.08, -0.1, 0]]], name: 'an acetate ion, CH<sub>3</sub>CO<sub>2</sub><sup>−</sup> (hydrogen atoms not shown)', charge: -1 },
    hydronium: { atoms: [['O', [0, 0, 0]], ['H', [0.09, 0.05, 0]], ['H', [-0.09, 0.05, 0]], ['H', [0, -0.06, 0.08]]], name: 'a hydronium ion, H<sub>3</sub>O<sup>+</sup>', charge: 1 },
    K: { atoms: [['K', [0, 0, 0]]], name: 'a potassium ion, K<sup>+</sup>', charge: 1 },
    Cl: { atoms: [['Cl', [0, 0, 0]]], name: 'a chloride ion, Cl<sup>−</sup>', charge: -1 },
  };
  const RADIUS = { C: 0.075, O: 0.07, H: 0.045, K: 0.1, Cl: 0.12 };
  const SOLUTES = {
    ethanol: { word: 'ethanol', mix: [['ethanol', 6]], ions: 0, units: 6, bright: 0 },
    KCl: { word: 'KCl', mix: [['K', 6], ['Cl', 6]], ions: 12, units: 6, bright: 1 },
    acetic: { word: 'acetic acid', mix: [['acid', 5], ['hydronium', 1], ['acetate', 1]], ions: 2, units: 6, bright: 0.3 },
  };
  const sol = F.choice(d.controls, { label: '\\text{solute}', options: [{ value: 'ethanol', label: 'ethanol' }, { value: 'KCl', label: 'KCl' }, { value: 'acetic', label: 'acetic acid' }], value: 'KCl', aria: 'the solute dissolved in the water' });
  const rnd = (a, b) => a + Math.random() * (b - a);
  const spot = () => [rnd(-BOX.x, BOX.x), rnd(BOX.y0, BOX.y1), rnd(-BOX.z, BOX.z)];
  /* each particle: kind, position, a random walk velocity, and a fixed orientation */
  const state = {};
  for (const [key, s] of Object.entries(SOLUTES)) {
    state[key] = [];
    for (const [kind, n] of s.mix) for (let j = 0; j < n; j++) {
      const ax = unit(heading()), up = unit(cross(ax, heading()));
      state[key].push({ kind, x: spot(), u: heading(), ax, up });
    }
  }
  const DRIFT = 0.28, JIG = 0.12;
  function step(dt) {
    for (const [key, list] of Object.entries(state)) {
      if (sol.a(key) <= 0) continue;
      for (const p of list) {
        const q = MOL[p.kind].charge || 0;
        if (Math.random() < dt * 2) p.u = heading();
        p.x = add(p.x, mul(p.u, JIG * dt));
        p.x[0] += q * DRIFT * dt;
        if (q && Math.abs(p.x[0]) > BOX.x) { p.x = spot(); p.x[0] = -Math.sign(q) * BOX.x; }
        if (!q) p.x[0] = Math.max(-BOX.x, Math.min(BOX.x, p.x[0]));
        p.x[1] = Math.max(BOX.y0, Math.min(BOX.y1, p.x[1])); p.x[2] = Math.max(-BOX.z, Math.min(BOX.z, p.x[2]));
      }
    }
  }
  /* an atom's place in a particle, its offset turned into the particle's own frame */
  const place = (p, o) => { const side = cross(p.ax, p.up); return add(p.x, add(add(mul(p.ax, o[0]), mul(p.up, o[1])), mul(side, o[2]))); };
  let sig = '', groups = {}, bulb = null, halo = null;
  const palSig = () => [PAL.ink, PAL.panel, PAL.soft, PAL.muted, F.el('K'), F.el('Cl'), F.el('C'), F.el('O'), F.el('H'), F.fact(BULB_LIGHT), F.ref('electrodes'), F.ref('bulb'), F.ref('power-supply')].join('|');
  const glass = { transparent: true, opacity: 0.12, depthWrite: false, side: T3D.DoubleSide };
  const wire = (pts) => { for (let i = 0; i + 1 < pts.length; i++) F.mesh.stick(scene, pts[i], pts[i + 1], 0.022, PAL.ink); };
  let scene = null;
  function build() {
    if (palSig() === sig) return; sig = palSig();
    v.clear();
    scene = new T3D.Group(); scene.position.set(0.7, -0.25, 0); grp.add(scene);
    v.pickable(F.mesh.box(scene, [-0.7, YB - 0.05, 0], [5.2, 0.1, 2.0], PAL.muted), 'the bench');
    const beaker = new T3D.Mesh(new T3D.CylinderGeometry(0.85, 0.85, 1.55, 48, 1, true), F.mesh.mat(PAL.ink, glass)); beaker.position.set(0, YB + 0.775, 0); scene.add(beaker);
    v.pickable(beaker, 'the beaker');
    const liquid = new T3D.Mesh(new T3D.CylinderGeometry(0.83, 0.83, 1.25, 48), F.mesh.mat(PAL.muted, { transparent: true, opacity: 0.08, depthWrite: false })); liquid.position.set(0, YB + 0.625, 0); scene.add(liquid);
    v.pickable(liquid, 'the solution');
    for (const s of [-1, 1]) {
      v.pickable(F.mesh.box(scene, [s * XE, YB + 1.0, 0], [0.08, 1.7, 0.5], F.ref('electrodes')), s < 0 ? 'the positive electrode' : 'the negative electrode');
      v.label(s < 0 ? '+' : '−', [s * XE + s * 0.22, YB + 1.72, 0], scene, 0);
    }
    const top = YB + 1.85;
    wire([[-XE, top], [-XE, 1.35], [-0.95, 1.35]].map(([x, y]) => [x, y, 0]));
    wire([[-1.45, 1.35], [-2.2, 1.35], [-2.2, YB + 0.62]].map(([x, y]) => [x, y, 0]));
    wire([[XE, top], [XE, 1.8], [-2.7, 1.8], [-2.7, YB + 0.62]].map(([x, y]) => [x, y, 0]));
    v.pickable(F.mesh.box(scene, [-2.45, YB + 0.3, 0], [0.9, 0.6, 0.6], F.ref('power-supply')), 'the power supply');
    v.label('power supply', [-2.45, YB + 0.72, 0], scene, 0).style.color = F.ref('power-supply');
    F.mesh.stick(scene, [-1.2, 1.35, 0], [-0.95, 1.35, 0], 0.09, F.ref('bulb'));
    F.mesh.stick(scene, [-1.2, 1.35, 0], [-1.45, 1.35, 0], 0.09, F.ref('bulb'));
    bulb = F.mesh.sphere(scene, [-1.2, 1.35, 0], 0.24, PAL.soft, { transparent: true, opacity: 0.85 });
    v.pickable(bulb, 'the light bulb');
    halo = F.mesh.sphere(scene, [-1.2, 1.35, 0], 0.5, F.fact(BULB_LIGHT), { transparent: true, opacity: 0, depthWrite: false });
    groups = {};
    for (const [key, list] of Object.entries(state)) {
      const g = new T3D.Group(); scene.add(g); groups[key] = { g, meshes: [] };
      for (const p of list) {
        const ms = MOL[p.kind].atoms.map(([sym, o]) => { const m = F.mesh.sphere(g, place(p, o), RADIUS[sym], F.el(sym)); v.pickable(m, MOL[p.kind].name); return m; });
        groups[key].meshes.push(ms);
      }
    }
  }
  const cy = cycle(() => Infinity, 0);
  function draw() {
    build();
    for (const [key, list] of Object.entries(state)) {
      const a = sol.a(key); F.fade3(groups[key].g, a);
      if (a <= 0) continue;
      list.forEach((p, i) => groups[key].meshes[i].forEach((m, j) => { const q = place(p, MOL[p.kind].atoms[j][1]); m.position.set(q[0], q[1], q[2]); }));
    }
    const b = sol.mix((k) => SOLUTES[k].bright);
    const glow = F.fact(BULB_LIGHT), lit = new T3D.Color(PAL.soft).lerp(new T3D.Color(glow), b);
    bulb.material.color.copy(lit); bulb.material.emissive.copy(new T3D.Color(glow).multiplyScalar(0.8 * b));
    halo.material.opacity = 0.35 * b;
    v.invalidate();
    const s = SOLUTES[sol.value], { ctx } = begin(cnv);
    topline(ctx, sol.value === 'ethanol'
      ? 'Ethanol dissolves as whole molecules and gives no ions, so no current flows and the bulb stays dark.'
      : sol.value === 'KCl'
        ? 'Potassium chloride dissociates completely, so all 12 of its dissolved particles are ions and the bulb glows brightly.'
        : 'Only 1 of 6 acetic acid molecules has reacted with water to give 2 ions, so the bulb glows dimly.');
    const per = 34, x0 = 420;
    text(ctx, 'ions', x0 - 20, 120, PAL.ink, { size: 18, align: 'right' });
    bar(ctx, x0, 120, per, s.ions, s.ions || 0.001, PAL.ink);
    text(ctx, s.ions + ' carry charge', x0 + per * Math.max(s.ions, 0) + 14, 120, PAL.ink, { size: 17 });
    text(ctx, 'bulb', x0 - 20, 172, F.ref('bulb'), { size: 18, align: 'right' });
    ctx.save(); ctx.strokeStyle = alpha(PAL.ink, 0.5); ctx.lineWidth = 1.5; ctx.strokeRect(x0, 160, per * 12, 24);
    ctx.fillStyle = glow; ctx.fillRect(x0, 160, per * 12 * b, 24); ctx.restore();
    text(ctx, b >= 0.99 ? 'bright' : b > 0.01 ? 'dim' : 'dark', x0 + per * 12 + 14, 172, PAL.ink, { size: 17 });
    /* legend of the kinds present */
    const kinds = sol.value === 'ethanol' ? [['C', 'C'], ['O', 'O']] : sol.value === 'KCl' ? [['K', 'K⁺'], ['Cl', 'Cl⁻']] : [['C', 'C'], ['O', 'O'], ['H', 'H']];
    kinds.forEach(([sym, name], i) => { const y = 100 + i * 38; ball(ctx, 1080, y, RADIUS[sym] * 110, F.el(sym)); text(ctx, name, 1104, y, PAL.ink, { size: 18 }); });
    const EQ = {
      ethanol: '\\text{C}_{2}\\text{H}_{5}\\text{OH}(l) \\longrightarrow \\text{C}_{2}\\text{H}_{5}\\text{OH}(aq)',
      KCl: '\\text{KCl}(s) \\longrightarrow \\text{K}^{+}(aq) + \\text{Cl}^{-}(aq)',
      acetic: '\\text{CH}_{3}\\text{CO}_{2}\\text{H}(aq) + \\text{H}_{2}\\text{O}(l) \\rightleftharpoons \\text{H}_{3}\\text{O}^{+}(aq) + \\text{CH}_{3}\\text{CO}_{2}{}^{-}(aq)',
    };
    readout(d.readout, EQ[sol.value]);
  }
  register(d.fig, { update: (dt) => { cy.step(dt, () => 1); step(Math.min(dt, 0.05)); }, draw });
})();

/* =====================================================================
   FIGURE 11.7: KCl dissolving, in three dimensions. A 3 × 3 × 3 crystal,
   K+ where the lattice indices sum odd and Cl− where they sum even; the
   eight ions of the top layer around its centre leave one at a time, K+
   and Cl− in turn. Each ion's four water molecules close in, oxygen
   first toward K+ and hydrogen first toward Cl−, lift the ion out of the
   layer and carry it into the solution. Moving: the crystal dissolves
   over a 13 s clock. A box of solution with no ground, so the orbit
   runs from 30° below level to 80° above.
===================================================================== */
(function () {
  const d = sim('sim-hydration');
  const v = F.view3d(d.stage, { spin: 'off', pitch: [-0.52, 1.4], views: [{ label: 'front', yaw: 0.3, pitch: 0.25 }, { label: 'above', yaw: 0, pitch: 1.35 }], h: 380, dist: 8.4, tilt: 0.25, yaw: 'free' });
  const grp = v.part(0), cnv = F.makeCanvas(d.stage, 220);
  const A = 0.46, Y0 = -0.75, R = { K: 0.2, Cl: 0.24, O: 0.1, H: 0.065 }, OH = 0.13, HALF = 1.824 / 2; /* half of 104.5° in radians */
  const NAME = { K: 'a potassium ion, K<sup>+</sup>', Cl: 'a chloride ion, Cl<sup>−</sup>' };
  const ions = [];
  for (let i = -1; i <= 1; i++) for (let j = -1; j <= 1; j++) for (let k = -1; k <= 1; k++) {
    ions.push({ f: (i + j + k) % 2 !== 0 ? 'K' : 'Cl', p0: [i * A, Y0 + j * A, k * A], lat: [i, j, k], n: -1 });
  }
  const leaving = ions.filter((q) => q.lat[1] === 1 && (q.lat[0] !== 0 || q.lat[2] !== 0));
  const Ks = leaving.filter((q) => q.f === 'K'), Cls = leaving.filter((q) => q.f === 'Cl');
  const order = []; for (let i = 0; i < 4; i++) order.push(Ks[i], Cls[(i + 1) % 4]);
  const START = 0.5, GAP = 1.4, DUR = 2.6, TEND = START + GAP * 7 + DUR + 0.3;
  order.forEach((q, n) => {
    q.n = n;
    const phi = Math.atan2(q.lat[2], q.lat[0]);
    q.dest = [1.75 * Math.cos(phi), 0.45 + 0.4 * (n % 2), 1.75 * Math.sin(phi)];
    /* the shell: one water above, three below at the tetrahedral angle */
    const dirs = [[0, 1, 0]];
    for (let m = 0; m < 3; m++) { const a = phi + m * TAU / 3; dirs.push([0.943 * Math.cos(a), -0.333, 0.943 * Math.sin(a)]); }
    q.shell = dirs.map((u) => {
      const w = unit(Math.abs(u[1]) > 0.9 ? [1, 0, 0] : cross(u, [0, 1, 0]));
      let atoms;
      if (q.f === 'K') {
        const o = mul(u, R.K + R.O + 0.03);
        atoms = [['O', o], ['H', add(o, add(mul(u, OH * Math.cos(HALF)), mul(w, OH * Math.sin(HALF))))], ['H', add(o, add(mul(u, OH * Math.cos(HALF)), mul(w, -OH * Math.sin(HALF))))]];
      } else {
        const h = mul(u, R.Cl + R.H + 0.03), o = add(h, mul(u, OH));
        atoms = [['H', h], ['O', o], ['H', add(o, add(mul(u, -OH * Math.cos(2 * HALF)), mul(w, OH * Math.sin(2 * HALF))))]];
      }
      return { u, atoms };
    });
  });
  const pos = (q, t) => {
    if (q.n < 0) return { x: q.p0, a: 1 };
    const w = clamp01((t - (START + q.n * GAP)) / DUR), rise = smooth(clamp01(w / 0.45)), go = smooth(clamp01((w - 0.4) / 0.6));
    const lifted = add(q.p0, [0, 0.6 * rise, 0]);
    return { x: add(mul(lifted, 1 - go), mul(q.dest, go)), a: smooth(clamp01(w / 0.45)), w };
  };
  const cy = cycle(() => TEND, 1.5);
  let sig = '', meshes = [];
  const palSig = () => [PAL.ink, PAL.soft, PAL.muted, F.el('K'), F.el('Cl'), F.el('O'), F.el('H')].join('|');
  function build() {
    if (palSig() === sig) return; sig = palSig();
    v.clear(); meshes = [];
    const box = new window.THREE.LineSegments(new window.THREE.EdgesGeometry(new window.THREE.BoxGeometry(4.6, 3.0, 4.6)), new window.THREE.LineBasicMaterial({ color: new window.THREE.Color(PAL.muted) }));
    box.position.set(0, 0, 0); grp.add(box);
    for (const q of ions) {
      const m = { ion: v.pickable(F.mesh.sphere(grp, q.p0, R[q.f], F.el(q.f)), NAME[q.f]), shell: [] };
      if (q.n >= 0) for (const s of q.shell) m.shell.push(s.atoms.map(([sym]) => v.pickable(F.mesh.sphere(grp, [0, 0, 0], R[sym], F.el(sym)), 'a water molecule, H<sub>2</sub>O, turned toward ' + (q.f === 'K' ? 'the potassium ion by its oxygen end' : 'the chloride ion by a hydrogen end'))));
      meshes.push(m);
    }
  }
  function draw() {
    build();
    const t = cy.now();
    let inK = 0, inCl = 0, outK = 0, outCl = 0;
    ions.forEach((q, i) => {
      const { x, a, w } = pos(q, t), m = meshes[i];
      m.ion.position.set(x[0], x[1], x[2]);
      if (q.n >= 0) q.shell.forEach((s, j) => s.atoms.forEach(([, o], k) => {
        const p = add(add(x, o), mul(s.u, 1.3 * (1 - a)));
        m.shell[j][k].position.set(p[0], p[1], p[2]);
      }));
      const gone = q.n >= 0 && w >= 0.5;
      if (q.f === 'K') { if (gone) outK++; else inK++; } else { if (gone) outCl++; else inCl++; }
    });
    v.invalidate();
    const { ctx } = begin(cnv);
    topline(ctx, outK + outCl === 0
      ? 'Water molecules gather at the surface of a crystal of 13 potassium ions and 14 chloride ions.'
      : 'Water has carried ' + outK + (outK === 1 ? ' potassium ion' : ' potassium ions') + ' and ' + outCl + (outCl === 1 ? ' chloride ion' : ' chloride ions') + ' away from the crystal into the solution.');
    const per = 22, x0 = 470;
    text(ctx, 'in the crystal', x0 + per * 7, 84, PAL.muted, { size: 17, align: 'center' });
    text(ctx, 'in solution', x0 + per * 14 + 70, 84, PAL.muted, { size: 17, align: 'left' });
    [['K', 'potassium ions', inK, outK, 118], ['Cl', 'chloride ions', inCl, outCl, 166]].forEach(([f, word, a, b, y]) => {
      text(ctx, word, x0 - 20, y, PAL.ink, { size: 18, align: 'right' });
      bar(ctx, x0, y, per, a, a, F.el(f));
      bar(ctx, x0 + per * 14 + 70, y, per, b, 4, F.el(f));
    });
    [['K', 'K⁺'], ['Cl', 'Cl⁻'], ['O', 'O'], ['H', 'H']].forEach(([sym, name], i) => { const y = 94 + i * 30; ball(ctx, 1130, y, R[sym] * 55, F.el(sym)); text(ctx, name, 1156, y, PAL.ink, { size: 18 }); });
    readout(d.readout, `\\text{KCl}(s) \\longrightarrow \\text{K}^{+}(aq) + \\text{Cl}^{-}(aq) \\qquad ${outK}\\ \\text{K}^{+}(aq),\\ ${outCl}\\ \\text{Cl}^{-}(aq)`,
      'Ion-dipole attractions to the water replace the attractions that held the ions in the crystal.');
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();
};
