/* Figures for section 17.3 Electrode and Cell Potentials. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['17.3'] = function (root, F) {
const { fmt, tex, C, PAL, alpha, register, begin, line, arrow, text, topline } = F;
const sim = (id, H) => F.sim(root, id, H);
const MINUS = '−';
const signed = (x, d) => (Math.abs(x) < 1e-9 ? fmt(0, d) : (x > 0 ? '+' : MINUS) + fmt(Math.abs(x), d));
const frac = (x) => x - Math.floor(x);
const clamp01 = (x) => Math.min(1, Math.max(0, x));
const inTex = (s) => s.replace(MINUS, '-');

/* =====================================================================
   FIGURE 17.5 + 17.6: the SHE wired against a half-cell X, in three
   dimensions, with both electrode surfaces magnified on a strip beneath.
   Moving on a continuous clock: H₂ bubbles rise off the platinum, the
   electrons run through the wire (SHE to X for a positive reading, X to
   SHE for a negative one), and particles meet each surface. The bench
   stands on a table, so the pitch stays between 3° and 70° above level
   and the yaw within 60° of the front.
===================================================================== */
(function () {
  const T3D = window.THREE;
  const d = sim('sim-she-cell');
  const CU_BLUE = '#3c9ad6';                    /* the blue of Cu²⁺(aq) */
  const RED_IN = '#c62828', BLACK_IN = '#1f1f1f';   /* the voltmeter's own red and black inputs */
  const X = {
    ag: { el: 'Ag', name: 'silver', ion: 'Ag⁺', n: 1, E: 0.7996, dec: 4, label: 'Ag⁺/Ag' },
    cu: { el: 'Cu', name: 'copper', ion: 'Cu²⁺', n: 2, E: 0.337, dec: 3, label: 'Cu²⁺/Cu' },
    pb: { el: 'Pb', name: 'lead', ion: 'Pb²⁺', n: 2, E: -0.1262, dec: 4, label: 'Pb²⁺/Pb' },
    zn: { el: 'Zn', name: 'zinc', ion: 'Zn²⁺', n: 2, E: -0.7618, dec: 4, label: 'Zn²⁺/Zn' },
  };
  const v = F.view3d(d.stage, { spin: 'off', pitch: [0.05, 1.22], yaw: [-1.05, 1.05], views: [{ label: 'front', yaw: 0, pitch: 0.2 }, { label: 'above', yaw: 0, pitch: 1.15 }], h: 600, dist: 7.2, tilt: 0.2 });
  const grp = v.part(0), cnv = F.makeCanvas(d.stage, 470);
  const pick = F.choice(d.controls, { label: '\\text{half-cell X}', options: Object.keys(X).map((k) => ({ value: k, label: X[k].label })), value: 'cu', aria: 'the half-cell wired to the red input', onInput: () => {} });
  const cy = F.cycle(() => Infinity, 0);
  const P = (x, y, z = 0) => [x, y - 0.62, z];
  const XL = -1.3, XR = 1.3, BENCH = -0.75, SURF = 0.05, TUBE_X = -1.5, ROD_X = 1.5, VY = 1.6;
  const PATH = [P(TUBE_X, 1.05), P(TUBE_X, VY), P(-0.52, VY), P(0.52, VY), P(ROD_X, VY), P(ROD_X, 0.62)];
  const SEG = PATH.slice(1).map((p, i) => Math.hypot(p[0] - PATH[i][0], p[1] - PATH[i][1]));
  const LEN = SEG.reduce((a, b) => a + b, 0);
  const along = (s) => {
    let r = s * LEN;
    for (let i = 0; i < SEG.length; i++) {
      if (r <= SEG[i] || i === SEG.length - 1) { const k = Math.min(1, r / SEG[i]), a = PATH[i], b = PATH[i + 1]; return [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, 0]; }
      r -= SEG[i];
    }
    return PATH[PATH.length - 1];
  };
  const NE = 14, NB = 12, E_SPEED = 0.45, B_RISE = 0.5;
  const glass = () => ({ transparent: true, opacity: 0.14, depthWrite: false, side: T3D ? T3D.DoubleSide : 2 });
  let sig = '', electrons = [], bubbles = [], rod = null, sol = null;
  const palSig = () => [PAL.ink, PAL.soft, PAL.muted, PAL.panel, F.el('Pt'), F.el('H'), F.el('e-'), Object.keys(X).map((k) => F.el(X[k].el)).join(','), F.fact(CU_BLUE), F.fact(RED_IN), pick.value].join('|');
  const solColor = (k) => (k === 'cu' ? F.fact(CU_BLUE) : PAL.ink);
  const solAlpha = (k) => (k === 'cu' ? 0.42 : 0.07);
  function build() {
    if (!v.scene || palSig() === sig) return; sig = palSig();
    v.clear();
    const x = X[pick.value];
    v.pickable(F.mesh.box(grp, P(0, BENCH - 0.05, 0), [4.8, 0.1, 1.9], PAL.soft), 'the bench');
    for (const bx of [XL, XR]) {
      const b = new T3D.Mesh(new T3D.CylinderGeometry(0.62, 0.62, 1.3, 44, 1, true), F.mesh.mat(PAL.ink, glass()));
      b.position.set(...P(bx, BENCH + 0.65)); grp.add(b);
      v.pickable(b, bx < 0 ? 'the beaker of the SHE' : 'the beaker of half-cell X');
    }
    const shSol = new T3D.Mesh(new T3D.CylinderGeometry(0.6, 0.6, SURF - BENCH, 44), F.mesh.mat(PAL.ink, { transparent: true, opacity: 0.07, depthWrite: false }));
    shSol.position.set(...P(XL, (SURF + BENCH) / 2)); grp.add(shSol); v.pickable(shSol, '1 M H⁺(aq)');
    sol = new T3D.Mesh(new T3D.CylinderGeometry(0.6, 0.6, SURF - BENCH, 44), F.mesh.mat(solColor(pick.value), { transparent: true, opacity: solAlpha(pick.value), depthWrite: false }));
    sol.position.set(...P(XR, (SURF + BENCH) / 2)); grp.add(sol); v.pickable(sol, `1 M ${x.ion}(aq)`);
    const tube = new T3D.Mesh(new T3D.CylinderGeometry(0.14, 0.14, 1.45, 28, 1, true), F.mesh.mat(PAL.ink, glass()));
    tube.position.set(...P(TUBE_X, 0.27)); grp.add(tube); v.pickable(tube, 'the glass tube of the SHE');
    v.pickable(F.mesh.stick(grp, P(TUBE_X - 0.42, 0.8), P(TUBE_X - 0.14, 0.8), 0.045, PAL.muted, glass()), 'the H₂ inlet, 1 bar');
    v.pickable(F.mesh.box(grp, P(TUBE_X, -0.5), [0.22, 0.24, 0.03], F.el('Pt')), 'the platinum electrode');
    v.pickable(F.mesh.stick(grp, P(TUBE_X, -0.4), P(TUBE_X, 1.05), 0.016, PAL.ink), 'the platinum wire');
    rod = F.mesh.box(grp, P(ROD_X, -0.04), [0.2, 1.32, 0.05], F.el(x.el));
    v.pickable(rod, `the ${x.name} electrode`);
    for (const s of [-1, 1]) v.pickable(F.mesh.stick(grp, P(s * 0.86, -0.3), P(s * 0.86, 0.85), 0.11, PAL.ink, glass()), 'the salt bridge');
    const arch = new T3D.Mesh(new T3D.TorusGeometry(0.86, 0.11, 14, 40, Math.PI), F.mesh.mat(PAL.ink, glass()));
    arch.position.set(...P(0, 0.85)); grp.add(arch); v.pickable(arch, 'the salt bridge');
    for (let i = 0; i < PATH.length - 1; i++) {
      if (i === 2) continue;
      v.pickable(F.mesh.stick(grp, PATH[i], PATH[i + 1], 0.02, PAL.ink), i < 2 ? 'the wire to the black input' : 'the wire to the red input');
    }
    v.pickable(F.mesh.box(grp, P(0, VY), [1.1, 0.4, 0.18], PAL.muted), 'the voltmeter');
    v.pickable(F.mesh.sphere(grp, P(-0.52, VY), 0.065, F.fact(BLACK_IN)), 'the black (negative) input');
    v.pickable(F.mesh.sphere(grp, P(0.52, VY), 0.065, F.fact(RED_IN)), 'the red (positive) input');
    electrons = Array.from({ length: NE }, () => v.pickable(F.mesh.sphere(grp, P(0, 0), 0.05, F.el('e-')), 'an electron, e⁻'));
    bubbles = Array.from({ length: NB }, () => v.pickable(F.mesh.sphere(grp, P(0, 0), 0.035, F.el('H'), { transparent: true, opacity: 0.85 }), 'a bubble of H₂ gas'));
    v.label(`${signed(x.E, x.dec)} V`, P(0, VY, 0.1), grp, 0);
    v.label('SHE in 1 <em>M</em> H<sup>+</sup>', P(XL, BENCH + 0.12, 0.8), grp, 0);
    v.label(`${x.el} in 1 <em>M</em> ${x.ion}`, P(XR, BENCH + 0.12, 0.8), grp, 0);
    v.label('<em>T</em> = 298 K', P(0, -0.45, 0), grp, 0);
  }

  /* One meeting of particles with an electrode surface, at progress u of a
     reduction; an oxidation is the same meeting played backwards. */
  const lerp = (a, b, k) => a + (b - a) * k;
  function ball(ctx, x, y, r, c, a = 1) {
    if (a <= 0.01) return;
    ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = c; ctx.strokeStyle = alpha(PAL.ink, 0.45); ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(x, y, r, 0, 2 * Math.PI); ctx.fill(); ctx.stroke(); ctx.restore();
  }
  function meetH(ctx, xs, ly, u) {
    const ce = F.el('e-'), ch = F.el('H');
    if (u < 0.5) {
      const k = clamp01(u / 0.5), a = clamp01(u / 0.08);
      for (const s of [-1, 1]) ball(ctx, lerp(xs + 190, xs + 14, k), ly + s * 20, 6, ch, a);
      const ke = clamp01((u - 0.22) / 0.28);
      if (ke > 0) for (const s of [-1, 1]) ball(ctx, lerp(xs - 70, xs + 2, ke), ly + s * 20, 5, ce);
    } else if (u < 0.62) {
      const k = (u - 0.5) / 0.12;
      for (const s of [-1, 1]) ball(ctx, xs + 22, ly + s * lerp(20, 7, k), 10, ch);
    } else {
      const k = (u - 0.62) / 0.38, a = 1 - clamp01((u - 0.86) / 0.14);
      for (const s of [-1, 1]) ball(ctx, lerp(xs + 22, xs + 200, k), ly + s * 7, 10, ch, a);
    }
  }
  function meetM(ctx, xs, ly, u, el, n) {
    const ce = F.el('e-'), cm = F.el(el);
    if (u < 0.5) {
      ball(ctx, lerp(xs + 190, xs + 22, u / 0.5), ly, 12, cm, clamp01(u / 0.08));
      const ke = clamp01((u - 0.22) / 0.28);
      if (ke > 0) for (let j = 0; j < n; j++) ball(ctx, lerp(xs - 70, xs + 4, ke), ly + (j - (n - 1) / 2) * 14, 5, ce);
    } else {
      ball(ctx, xs + 20, ly, lerp(12, 19, clamp01((u - 0.5) / 0.1)), cm, 1 - clamp01((u - 0.8) / 0.2));
    }
  }
  function surface(ctx, cx, cyy, R, metal, fill, u0, meet) {
    const xs = cx - 40;
    ctx.save(); ctx.beginPath(); ctx.arc(cx, cyy, R, 0, 2 * Math.PI); ctx.clip();
    if (fill) { ctx.fillStyle = fill; ctx.fillRect(cx - R, cyy - R, 2 * R, 2 * R); }
    const cm = F.el(metal);
    for (let row = -6, j = 0; row <= 6; row++, j++) {
      const y = cyy + row * 30, off = (row & 1) ? 18 : 0;
      for (let x = xs - 18 - off; x > cx - R - 30; x -= 36) ball(ctx, x, y, 19, cm);
    }
    [-90, 0, 90].forEach((dy, i) => meet(xs, cyy + dy, frac(u0 + i / 3)));
    ctx.restore();
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(cx, cyy, R, 0, 2 * Math.PI); ctx.stroke(); ctx.restore();
  }
  function legend(ctx, cx, y, items) {
    const w = items.map(([s]) => F.measure(ctx, s, { size: 19 }) + 44);
    let x = cx - w.reduce((a, b) => a + b, 0) / 2;
    items.forEach(([s, draw], i) => { draw(x + 12, y); text(ctx, s, x + 30, y, PAL.ink, { size: 19 }); x += w[i]; });
  }

  const CX = [330, 1070], CYS = 205, R = 150, PERIOD = 3.6;
  function draw() {
    build();
    const k = pick.value, x = X[k], t = cy.now(), dir = Math.sign(x.E);
    if (v.scene) {
      if (rod) rod.material.color.set(pick.mixColor((q) => F.el(X[q].el)));
      if (sol) { sol.material.color.set(pick.mixColor(solColor)); sol.material.opacity = pick.mix(solAlpha); }
      electrons.forEach((m, i) => m.position.set(...along(frac(i / NE + dir * t * E_SPEED / LEN))));
      bubbles.forEach((m, i) => {
        const h = frac(t * B_RISE / 0.55 + i / NB), dx = ((i * 37) % 11 - 5) * 0.045, dz = ((i * 23) % 7 - 3) * 0.05;
        m.position.set(...P(TUBE_X + dx + 0.03 * Math.sin(6 * h + i), -0.45 + h * 0.48, dz));
      });
      v.headline(dir > 0
        ? `The voltmeter reads ${signed(x.E, x.dec)} V: electrons flow from the SHE to the ${x.name} electrode.`
        : `The voltmeter reads ${signed(x.E, x.dec)} V: electrons flow from the ${x.name} electrode to the SHE.`);
      v.invalidate();
    }
    const { ctx } = begin(cnv);
    const u = t / PERIOD, reduceAtX = dir > 0;
    text(ctx, 'platinum electrode surface (SHE)', CX[0], 30, PAL.ink, { size: 24, weight: 600, align: 'center' });
    text(ctx, `${x.name} electrode surface (X)`, CX[1], 30, PAL.ink, { size: 24, weight: 600, align: 'center' });
    surface(ctx, CX[0], CYS, R, 'Pt', null, u, (xs, ly, w) => meetH(ctx, xs, ly, reduceAtX ? 1 - w : w));
    surface(ctx, CX[1], CYS, R, x.el, k === 'cu' ? alpha(F.fact(CU_BLUE), 0.22) : null, u, (xs, ly, w) => meetM(ctx, xs, ly, reduceAtX ? w : 1 - w, x.el, x.n));
    const eDot = (px, py) => ball(ctx, px, py, 5, F.el('e-'));
    legend(ctx, CX[0], 384, [['Pt atom', (px, py) => ball(ctx, px, py, 10, F.el('Pt'))], ['H⁺ ion', (px, py) => ball(ctx, px, py, 6, F.el('H'))], ['H₂ molecule', (px, py) => { ball(ctx, px - 4, py, 7, F.el('H')); ball(ctx, px + 4, py, 7, F.el('H')); }], ['electron, e⁻', eDot]]);
    legend(ctx, CX[1], 384, [[`${x.el} atom`, (px, py) => ball(ctx, px, py, 10, F.el(x.el))], [`${x.ion} ion`, (px, py) => ball(ctx, px, py, 7, F.el(x.el))], ['electron, e⁻', eDot]]);
    const e = x.n === 1 ? 'e⁻' : `${x.n}e⁻`;
    text(ctx, reduceAtX ? 'anode, oxidation:  H_2(g) ⟶ 2H⁺(aq) + 2e⁻' : 'cathode, reduction:  2H⁺(aq) + 2e⁻ ⟶ H_2(g)', CX[0], 434, PAL.ink, { size: 23, align: 'center' });
    text(ctx, reduceAtX ? `cathode, reduction:  ${x.ion}(aq) + ${e} ⟶ ${x.el}(s)` : `anode, oxidation:  ${x.el}(s) ⟶ ${x.ion}(aq) + ${e}`, CX[1], 434, PAL.ink, { size: 23, align: 'center' });
    tex(d.readout, `\\kEocell = \\kEoX - \\kEshe = ${fmt(x.E, x.dec)}\\ \\text{V} - 0\\ \\text{V} = ${inTex(signed(x.E, x.dec))}\\ \\text{V}`);
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();

/* =====================================================================
   SIM: Table 17.1 as a ladder of standard electrode potentials. Still:
   the reader picks a cathode couple and an anode couple, and the arrow
   from the anode's rung to the cathode's is E°cell. Axis fixed from
   +3.0 V to −3.1 V, which holds every value of the table.
===================================================================== */
(function () {
  const H = 780, d = sim('sim-ladder', H);
  /* [id, oxidant, reductant, half-reaction, E° as printed] in the table's order */
  const ROWS = [
    ['f2', 'F₂', 'F⁻', 'F₂(g) + 2e⁻ ⟶ 2F⁻(aq)', '+2.866'],
    ['pbo2', 'PbO₂', 'PbSO₄', 'PbO₂(s) + SO₄²⁻(aq) + 4H⁺(aq) + 2e⁻ ⟶ PbSO₄(s) + 2H₂O(l)', '+1.69'],
    ['mno4-mn', 'MnO₄⁻', 'Mn²⁺', 'MnO₄⁻(aq) + 8H⁺(aq) + 5e⁻ ⟶ Mn²⁺(aq) + 4H₂O(l)', '+1.507'],
    ['au', 'Au³⁺', 'Au', 'Au³⁺(aq) + 3e⁻ ⟶ Au(s)', '+1.498'],
    ['cl2', 'Cl₂', 'Cl⁻', 'Cl₂(g) + 2e⁻ ⟶ 2Cl⁻(aq)', '+1.35827'],
    ['o2', 'O₂', 'H₂O', 'O₂(g) + 4H⁺(aq) + 4e⁻ ⟶ 2H₂O(l)', '+1.229'],
    ['pt', 'Pt²⁺', 'Pt', 'Pt²⁺(aq) + 2e⁻ ⟶ Pt(s)', '+1.20'],
    ['br2', 'Br₂', 'Br⁻', 'Br₂(aq) + 2e⁻ ⟶ 2Br⁻(aq)', '+1.0873'],
    ['ag', 'Ag⁺', 'Ag', 'Ag⁺(aq) + e⁻ ⟶ Ag(s)', '+0.7996'],
    ['hg2', 'Hg₂²⁺', 'Hg', 'Hg₂²⁺(aq) + 2e⁻ ⟶ 2Hg(l)', '+0.7973'],
    ['fe3', 'Fe³⁺', 'Fe²⁺', 'Fe³⁺(aq) + e⁻ ⟶ Fe²⁺(aq)', '+0.771'],
    ['mno4-mno2', 'MnO₄⁻', 'MnO₂', 'MnO₄⁻(aq) + 2H₂O(l) + 3e⁻ ⟶ MnO₂(s) + 4OH⁻(aq)', '+0.558'],
    ['i2', 'I₂', 'I⁻', 'I₂(s) + 2e⁻ ⟶ 2I⁻(aq)', '+0.5355'],
    ['nio2', 'NiO₂', 'Ni(OH)₂', 'NiO₂(s) + 2H₂O(l) + 2e⁻ ⟶ Ni(OH)₂(s) + 2OH⁻(aq)', '+0.49'],
    ['cu', 'Cu²⁺', 'Cu', 'Cu²⁺(aq) + 2e⁻ ⟶ Cu(s)', '+0.34'],
    ['hg2cl2', 'Hg₂Cl₂', 'Hg', 'Hg₂Cl₂(s) + 2e⁻ ⟶ 2Hg(l) + 2Cl⁻(aq)', '+0.26808'],
    ['agcl', 'AgCl', 'Ag', 'AgCl(s) + e⁻ ⟶ Ag(s) + Cl⁻(aq)', '+0.22233'],
    ['sn4', 'Sn⁴⁺', 'Sn²⁺', 'Sn⁴⁺(aq) + 2e⁻ ⟶ Sn²⁺(aq)', '+0.151'],
    ['h', 'H⁺', 'H₂', '2H⁺(aq) + 2e⁻ ⟶ H₂(g)', '0.00'],
    ['pb', 'Pb²⁺', 'Pb', 'Pb²⁺(aq) + 2e⁻ ⟶ Pb(s)', '−0.1262'],
    ['sn2', 'Sn²⁺', 'Sn', 'Sn²⁺(aq) + 2e⁻ ⟶ Sn(s)', '−0.1375'],
    ['ni', 'Ni²⁺', 'Ni', 'Ni²⁺(aq) + 2e⁻ ⟶ Ni(s)', '−0.257'],
    ['co', 'Co²⁺', 'Co', 'Co²⁺(aq) + 2e⁻ ⟶ Co(s)', '−0.28'],
    ['pbso4', 'PbSO₄', 'Pb', 'PbSO₄(s) + 2e⁻ ⟶ Pb(s) + SO₄²⁻(aq)', '−0.3505'],
    ['cd', 'Cd²⁺', 'Cd', 'Cd²⁺(aq) + 2e⁻ ⟶ Cd(s)', '−0.4030'],
    ['fe2', 'Fe²⁺', 'Fe', 'Fe²⁺(aq) + 2e⁻ ⟶ Fe(s)', '−0.447'],
    ['cr', 'Cr³⁺', 'Cr', 'Cr³⁺(aq) + 3e⁻ ⟶ Cr(s)', '−0.744'],
    ['mn', 'Mn²⁺', 'Mn', 'Mn²⁺(aq) + 2e⁻ ⟶ Mn(s)', '−1.185'],
    ['znoh2', 'Zn(OH)₂', 'Zn', 'Zn(OH)₂(s) + 2e⁻ ⟶ Zn(s) + 2OH⁻(aq)', '−1.245'],
    ['zn', 'Zn²⁺', 'Zn', 'Zn²⁺(aq) + 2e⁻ ⟶ Zn(s)', '−0.7618'],
    ['al', 'Al³⁺', 'Al', 'Al³⁺(aq) + 3e⁻ ⟶ Al(s)', '−1.662'],
    ['mg', 'Mg²⁺', 'Mg', 'Mg²⁺(aq) + 2e⁻ ⟶ Mg(s)', '−2.372'],
    ['na', 'Na⁺', 'Na', 'Na⁺(aq) + e⁻ ⟶ Na(s)', '−2.71'],
    ['ca', 'Ca²⁺', 'Ca', 'Ca²⁺(aq) + 2e⁻ ⟶ Ca(s)', '−2.868'],
    ['ba', 'Ba²⁺', 'Ba', 'Ba²⁺(aq) + 2e⁻ ⟶ Ba(s)', '−2.912'],
    ['k', 'K⁺', 'K', 'K⁺(aq) + e⁻ ⟶ K(s)', '−2.931'],
    ['li', 'Li⁺', 'Li', 'Li⁺(aq) + e⁻ ⟶ Li(s)', '−3.04'],
  ].map(([id, ox, red, half, s]) => ({ id, ox, red, half, s, E: parseFloat(s.replace(MINUS, '-')), dec: (s.split('.')[1] || '').length }));
  const BY = Object.fromEntries(ROWS.map((r) => [r.id, r]));
  const opts = ROWS.map((r) => ({ value: r.id, label: `${r.ox}/${r.red}, ${r.s} V` }));
  const cat = F.select(d.controls, { label: '\\text{cathode}', options: opts, value: 'ag', aria: 'the cathode half-cell', key: 'cathode' });
  const an = F.select(d.controls, { label: '\\text{anode}', options: opts, value: 'cu', aria: 'the anode half-cell', key: 'anode' });
  const TOP = 3.0, BOT = -3.1, Y0 = 140, Y1 = 730, AX = 330, RUNG = 690, LX = 706;
  const Y = (e) => Y0 + ((TOP - e) / (TOP - BOT)) * (Y1 - Y0);
  F.hover(d.stage, () => ROWS.map((r) => ({ x: AX + 16, y: Y(r.E), r: 9, name: `${r.half}, E° = ${r.s} V` })));
  const value = (r) => fmt(r.E, r.dec);
  function spread(items, gap, lo, hi) {
    const s = items.slice().sort((a, b) => a.y - b.y);
    for (let i = 1; i < s.length; i++) s[i].y = Math.max(s[i].y, s[i - 1].y + gap);
    const over = s.length ? s[s.length - 1].y - hi : 0;
    if (over > 0) s.forEach((it) => { it.y -= over; });
    for (let i = s.length - 2; i >= 0; i--) s[i].y = Math.min(s[i].y, s[i + 1].y - gap);
    if (s.length && s[0].y < lo) { const up = lo - s[0].y; s.forEach((it) => { it.y += up; }); }
    return items;
  }
  function draw() {
    const { ctx } = begin(d.c);
    const cp = C('potential'), cC = F.ref('cathode-half-cell'), cA = F.ref('anode-half-cell');
    const rc = BY[cat.value], ra = BY[an.value];
    const yc = Y(cat.mix((q) => BY[q].E)), ya = Y(an.mix((q) => BY[q].E));
    line(ctx, AX, Y0 - 10, AX, Y1 + 10, PAL.ink, 3);
    for (let e = -3; e <= 3.001; e += 0.5) {
      line(ctx, AX - 8, Y(e), AX, Y(e), PAL.muted, 2);
      text(ctx, e === 0 ? '0' : signed(e, 1), AX - 14, Y(e), PAL.muted, { size: 17, align: 'right' });
    }
    text(ctx, '$\\kEo$ (V)', AX, Y0 - 34, cp, { size: 22, weight: 600, align: 'center', tex: true });
    arrow(ctx, 150, 370, 150, 175, alpha(PAL.ink, 0.5), 3);
    text(ctx, 'stronger oxidants', 150, 155, PAL.muted, { size: 17, align: 'center' });
    arrow(ctx, 150, 500, 150, 695, alpha(PAL.ink, 0.5), 3);
    text(ctx, 'stronger reductants', 150, 715, PAL.muted, { size: 17, align: 'center' });
    ROWS.forEach((r) => line(ctx, AX, Y(r.E), AX + 32, Y(r.E), alpha(PAL.ink, 0.45), 2));
    line(ctx, AX, Y(0), RUNG, Y(0), alpha(PAL.ink, 0.45), 2, [10, 10]);
    const same = rc === ra;
    const tags = [];
    if (rc.id !== 'h' && ra.id !== 'h') tags.push({ y: Y(0), s: `${BY.h.half},  0.00 V`, c: PAL.muted, w: 400 });
    tags.push({ y: yc, s: `cathode:  ${rc.half},  ${rc.s} V`, c: cC, w: 600 });
    if (!same) tags.push({ y: ya, s: `anode:  ${ra.half},  ${ra.s} V`, c: cA, w: 600 });
    spread(tags, 34, Y0 - 12, Y1 + 12);
    line(ctx, AX, ya, RUNG, ya, cA, 4);
    line(ctx, AX, yc, RUNG, yc, cC, 4);
    tags.forEach((g) => text(ctx, g.s, LX, g.y, g.c, { size: 22, weight: g.w, bg: PAL.panel }));
    const dec = Math.min(rc.dec, ra.dec), ec = +(rc.E - ra.E).toFixed(dec);
    if (!same) {
      if (Math.abs(yc - ya) > 16) arrow(ctx, 540, ya, 540, yc, cp, 4);
      text(ctx, `${signed(ec, dec)} V`, 524, (ya + yc) / 2, cp, { size: 22, weight: 600, align: 'right', bg: PAL.panel });
    }
    topline(ctx, same ? 'With the same half-cell on both sides, the cell potential is zero and there is no net reaction.'
      : ec > 0 ? `The oxidant ${rc.ox} sits above the reductant ${ra.red}, so the reaction is spontaneous.`
        : `The oxidant ${rc.ox} sits below the reductant ${ra.red}, so the reaction is nonspontaneous.`);
    const aTerm = ra.E < 0 ? `(${value(ra)}\\ \\text{V})` : `${value(ra)}\\ \\text{V}`;
    tex(d.readout, `\\kEocell = \\kEocathode - \\kEoanode = ${value(rc)}\\ \\text{V} - ${aTerm} = ${inTex(signed(ec, dec))}\\ \\text{V}`);
  }
  register(d.fig, { update: () => {}, draw });
})();
};
