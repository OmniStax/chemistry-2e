/* Figures for section 18.7 Occurrence, Preparation, and Properties of Nitrogen. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['18.7'] = function (root, F) {
const { C, PAL, ctl, tex, register, begin, line, text, topline, alpha } = F;
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;
const NO2_BROWN = '#8b4a1c';                         /* the colour of nitrogen dioxide gas */
function rng(seed) { let a = seed >>> 0; return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

/* =====================================================================
   SIM: 2NO₂ ⇌ N₂O₄ in a sealed vessel closed by a piston. K_P = 6.86 at
   298 K (the book's), and K_P(T) by van 't Hoff from ΔH = −57.20 kJ for the
   dimerization (13.3's +57.20 kJ for N₂O₄ ⟶ 2NO₂). The vessel holds A0 mol
   of N₂O₄ units, A0 chosen so the total pressure is 1.000 atm at 298 K and
   1.00 L. With S = A0 RT/V: P_N2O4 + P_NO2/2 = S and P_N2O4 = K P_NO2².
   Sixteen pair slots, the number joined the nearest whole number to 16 ×
   the share of nitrogen in N₂O₄; a tween walks the count so the pairs
   join or split one after another. The piston height is V / 2.00 L. Strip:
   partial pressures on 0 to 4 atm (largest, P_NO2 = 3.01 atm at 373 K and
   0.50 L). The tint follows [NO₂] = P_NO2 / RT. Pitch 2° to 70°: never seen
   from beneath.
===================================================================== */
(function () {
  const d = F.sim(root, 'sim-no2-dimer');
  const v = F.view3d(d.stage, { spin: 'off', pitch: [0.035, 1.22], views: [{ label: 'front', yaw: 0, pitch: 0.12 }, { label: 'above', yaw: 0.5, pitch: 1.0 }], h: 600, dist: 6.4, tilt: 0.2 });
  const grp = v.part(0), cnv = F.makeCanvas(d.stage, 300);
  const R = 0.082057, R8 = 8.314, DH = 57200, K0 = 6.86, T0 = 298, VMAX = 2, NS = 16;
  const x0 = (-1 + Math.sqrt(1 + 4 * K0)) / (2 * K0), A0 = (1 - x0 / 2) / (R * T0);
  const KP = (t) => K0 * Math.exp((DH / R8) * (1 / t - 1 / T0));
  const tS = ctl(d.controls, { label: '\\kT', cls: 'temperature', min: 273, max: 373, step: 1, value: 298, unit: 'K', dec: 0, specials: [{ at: 298, label: 'room temperature' }], onInput: settle, aria: 'temperature in kelvins' });
  const vS = ctl(d.controls, { label: '\\kV', cls: 'volume', min: 0.5, max: 2, step: 0.01, value: 1, unit: 'L', dec: 2, onInput: settle, aria: 'volume of the vessel in liters' });

  function state() {
    const t = tS.v, k = KP(t), S = (A0 * R * t) / vS.v;
    const no2 = (-0.5 + Math.sqrt(0.25 + 4 * k * S)) / (2 * k), n2o4 = k * no2 * no2;
    return { t, k, no2, n2o4, joined: Math.round((NS * n2o4) / (n2o4 + no2 / 2)), conc: no2 / (R * t) };
  }
  let target = state().joined;
  const jt = F.tween(d, target);
  function settle() { const j = state().joined; if (j !== target) { target = j; jt.to(j, 900); } }

  /* slots on a jittered 4 × 4 grid across the floor, each pair split along a diagonal of its cell */
  const L = 1.1, RC = 0.14, SZ = 0.85, rand = rng(1807);
  const slots = Array.from({ length: NS }, (_, i) => {
    const gx = (i % 4) - 1.5, gz = Math.floor(i / 4) - 1.5, cell = (2 * (L - RC)) / 4, s = rand() < 0.5 ? 1 : -1;
    return {
      mid: [gx * cell + (rand() - 0.5) * 0.08, rand() * 2 - 1, gz * cell + (rand() - 0.5) * 0.08],
      off: [0.15 * s, 0, 0.15],
      dy: (rand() - 0.5) * 0.5,
      rot: [[(rand() - 0.5) * 0.9, rand() * 6.28, (rand() - 0.5) * 0.9], [(rand() - 0.5) * 0.9, rand() * 6.28, (rand() - 0.5) * 0.9], [(rand() - 0.5) * 0.9, rand() * 6.28, (rand() - 0.5) * 0.9]],
    };
  });
  const order = slots.map((_, i) => i);
  for (let i = NS - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [order[i], order[j]] = [order[j], order[i]]; }

  const MOLS = {
    N2O4: { name: 'dinitrogen tetraoxide, N₂O₄', atoms: [['N', -0.085, 0, 0, 0.075], ['N', 0.085, 0, 0, 0.075], ['O', -0.155, 0.105, 0, 0.07], ['O', -0.155, -0.105, 0, 0.07], ['O', 0.155, 0.105, 0, 0.07], ['O', 0.155, -0.105, 0, 0.07]] },
    NO2: { name: 'nitrogen dioxide, NO₂', atoms: [['N', 0, 0.035, 0, 0.075], ['O', -0.11, -0.035, 0, 0.07], ['O', 0.11, -0.035, 0, 0.07]] },
  };
  const T3 = () => window.THREE;
  let sig = '', box = null, edges = null, piston = null, rod = null, meshes = [];
  const palSig = () => [PAL.ink, PAL.panel, PAL.muted, F.CC, F.el('N'), F.el('O'), F.fact(NO2_BROWN)].join('|');
  function molecule3(k) {
    const g = new (T3().Group)(); grp.add(g);
    MOLS[k].atoms.forEach(([e, x, y, z, r]) => v.pickable(F.mesh.sphere(g, [x * SZ, y * SZ, z * SZ], r * SZ, F.el(e)), MOLS[k].name));
    g.visible = false; return g;
  }
  const TOP = L + 0.12;
  function build() {
    const key = palSig(); if (key === sig || !T3() || !grp) return; sig = key;
    const T = T3();
    v.clear(); grp.position.set(0, -0.05, 0);
    box = new T.Mesh(new T.BoxGeometry(1, 1, 1), F.mesh.mat(F.fact(NO2_BROWN), { transparent: true, opacity: 0.05, depthWrite: false, side: T.DoubleSide })); grp.add(box);
    v.pickable(box, 'the gas in the sealed vessel');
    edges = new T.LineSegments(new T.EdgesGeometry(new T.BoxGeometry(1, 1, 1)), new T.LineBasicMaterial({ color: new T.Color(PAL.ink) })); grp.add(edges);
    piston = F.mesh.box(grp, [0, 0, 0], [2 * L - 0.02, 0.06, 2 * L - 0.02], PAL.muted, { transparent: true, opacity: 0.55 });
    v.pickable(piston, 'the piston');
    rod = F.mesh.stick(grp, [0, 0, 0], [0, TOP, 0], 0.05, PAL.muted);
    v.pickable(rod, 'the piston rod');
    v.label('2NO₂ ⇌ N₂O₄', [0, TOP + 0.12, 0], grp, 6);
    meshes = slots.map(() => ({ A: molecule3('N2O4'), B: [molecule3('NO2'), molecule3('NO2')] }));
  }

  function draw() {
    const s = state(), h = vS.v / VMAX, top = -L + 2 * L * h;
    build();
    if (box) {
      box.scale.set(2 * L, 2 * L * h, 2 * L); box.position.set(0, -L + L * h, 0);
      edges.scale.copy(box.scale); edges.position.copy(box.position);
      box.material.opacity = 0.03 + 0.5 * (1 - Math.exp(-s.conc / 0.03));
      piston.position.y = top + 0.03; F.mesh.setStick(rod, [0, top + 0.06, 0], [0, TOP, 0]);
      const bot = -L + RC, hi = top - RC, yOf = (q) => (bot + hi) / 2 + (q * (hi - bot)) / 2;
      order.forEach((i, rank) => {
        const sl = slots[i], m = meshes[i], p = Math.max(0, Math.min(1, jt.v - rank));
        const c = [sl.mid[0], yOf(sl.mid[1]), sl.mid[2]];
        m.A.visible = p >= 1;
        if (p >= 1) { m.A.position.set(...c); m.A.rotation.set(...sl.rot[0]); }
        const spread = 1 - 0.55 * p, dy = sl.dy * (hi - bot) * 0.5 * spread;
        m.B.forEach((g, j) => {
          g.visible = p < 1; if (!g.visible) return;
          const sg = j ? -1 : 1;
          g.position.set(c[0] + sg * sl.off[0] * spread, Math.max(bot, Math.min(hi, c[1] + sg * dy)), c[2] + sg * sl.off[2] * spread);
          g.rotation.set(...sl.rot[1 + j]);
        });
      });
      v.invalidate();
    }

    const { ctx } = begin(cnv);
    const share = Math.round((100 * s.no2) / (s.no2 + s.n2o4));
    topline(ctx, `At ${s.t} K, ${share}% of the molecules are brown NO_{2} and ${100 - share}% colorless N_{2}O_{4}.`);
    const l = 300, r = 1240, X = (p) => l + ((r - l) * p) / 4, ay = 236;
    [[s.n2o4, 'n2o4', 'N_{2}O_{4}', 118], [s.no2, 'no2', 'NO_{2}', 182]].forEach(([p, id, name, y]) => {
      ctx.save(); ctx.fillStyle = F.ref(id); ctx.fillRect(l, y - 18, X(p) - l, 36); ctx.restore();
      text(ctx, name, l - 18, y, PAL.ink, { size: 24, weight: 600, align: 'right' });
      text(ctx, `${p.toPrecision(3)} atm`, X(p) + 12, y, PAL.ink, { size: 20 });
    });
    line(ctx, l, ay, r, ay, PAL.muted, 2);
    for (let q = 0; q <= 4; q++) { line(ctx, X(q), ay, X(q), ay + 8, PAL.muted, 2); text(ctx, String(q), X(q), ay + 24, PAL.muted, { size: 17, align: 'center' }); }
    for (let q = 1; q <= 4; q++) line(ctx, X(q), 92, X(q), ay, alpha(PAL.ink, 0.12), 2);
    text(ctx, 'partial pressure (atm)', (l + r) / 2, ay + 52, C('pressure'), { size: 20, align: 'center' });

    const f4 = (q) => q.toPrecision(4);
    tex(d.readout, `\\kKP = \\dfrac{\\kP_{\\text{N}_2\\text{O}_4}}{\\kP_{\\text{NO}_2}^{2}} = \\dfrac{${hue('pressure', f4(s.n2o4))}}{(${hue('pressure', f4(s.no2))})^{2}} = ${hue('equilibrium-constant', s.k.toPrecision(3))}`);
  }
  register(d.fig, { update: () => {}, draw });
})();
};
