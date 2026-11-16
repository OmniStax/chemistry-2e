/* Figures for section 20.3 Aldehydes, Ketones, Carboxylic Acids, and Esters. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['20.3'] = function (root, F) {
const { PAL, alpha, register, begin, line, text, headline } = F;

/* =====================================================================
   FIGURE 20.14: the carbonyl group and the orbitals that make its
   double bond, in three dimensions. Mathematical 3D over a physical
   frame: the plane of the three σ bonds is the xz plane, oxygen along
   −z, R¹ and R² at 120° toward the reader, and the p orbitals stand
   along y. The choice walks the text's sentence: carbon's three sp²
   hybrids and their σ bonds, the two p orbitals side by side, and their
   overlap into the π bond, whose cloud is fatter at oxygen because
   oxygen pulls the shared electrons closer (δ− on O, δ+ on C, as the
   book marks them). Still: a structure has no clock. Free orbit.
   C=O 1.21, C–R 1.5 (Å), angles 120°.
===================================================================== */
(function () {
  const d = F.sim(root, 'sim-carbonyl');
  const T3 = window.THREE;
  const DIST = 11.5, FOV = 16, RAD = Math.PI / 180;
  const v = F.view3d(d.stage, { spin: 'off', h: 560, dist: DIST, tilt: 0.52, pitch: [-1.3, 1.3], onRender: () => place() });
  if (v.camera && 'fov' in v.camera) { v.camera.fov = FOV; v.camera.updateProjectionMatrix(); }   /* a long lens: the near R group is not drawn larger than the far one */
  v.setView(-1.25, 0.52);
  const g = v.part(0); if (g && g.position) g.position.set(0, -0.3, 0.2);
  const key = F.makeCanvas(d.stage, 64);
  const step = F.choice(d.controls, { label: '\\text{the C=O bond}', key: 'bond', aria: 'how far the double bond is built: σ bonds, p orbitals, π bond', value: 'pi',
    options: [{ value: 'sigma', label: 'σ bonds' }, { value: 'p', label: 'two p orbitals' }, { value: 'pi', label: 'π bond' }] });
  const ro = F.readout(d);
  const HEAD = {
    sigma: 'Three sp² hybrid orbitals on carbon point 120° apart in one plane and form its three σ bonds.',
    p: 'Carbon’s unhybridized p orbital and a p orbital on oxygen stand perpendicular to that plane, side by side.',
    pi: 'The two p orbitals overlap above and below the plane: the π bond, its electrons pulled toward oxygen.',
  };
  const READ = {
    sigma: '\\mk{s}{3\\ sp^{2}\\text{ orbitals on C}} \\to \\mk{g}{3\\ \\sigma\\text{ bonds}}',
    p: '\\mk{s}{1\\ p\\text{ orbital on C}} + 1\\ p\\text{ orbital on O} \\to \\mk{q}{1\\ \\pi\\text{ bond}}',
    pi: '\\text{C=O} = \\mk{g}{1\\ \\sigma\\text{ bond}} + \\mk{q}{1\\ \\pi\\text{ bond}}',
  };
  const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]], mul = (a, k) => [a[0] * k, a[1] * k, a[2] * k];
  const S60 = Math.sin(60 * RAD);
  const DIR = { O: [0, 0, -1], L: [-S60, 0, 0.5], R: [S60, 0, 0.5] };
  const AT = { C: [0, 0, 0], O: mul(DIR.O, 1.21), L: mul(DIR.L, 1.5), R: mul(DIR.R, 1.5) };
  const HYB = () => F.cat(2), PLUS = () => F.cat(0), MINUS = () => F.cat(1);
  const palSig = () => [PAL.ink, PAL.panel, PAL.muted, F.el('C'), F.el('O'), F.el('R'), HYB(), PLUS(), MINUS()].join('|');

  /* the shapes, made once: a teardrop lobe pointed at its nucleus, and the π cloud, a rounded bar fatter at its +x end */
  let DROP = null, CLOUD = null;
  if (T3 && v.scene) {
    const prof = [];
    for (let i = 0; i <= 40; i++) { const u = i / 40; prof.push(new T3.Vector2(Math.max(1e-4, 0.5 * Math.pow(u, 0.62) * Math.sqrt(Math.max(0, 1 - u * u))), u)); }
    DROP = new T3.LatheGeometry(prof, 36);
    const sp = (a, e) => Math.sign(a) * Math.pow(Math.abs(a), e), NU = 48, NV = 40, pos = [], idx = [];
    for (let i = 0; i <= NU; i++) {
      const th = -Math.PI / 2 + (Math.PI * i) / NU, x = sp(Math.sin(th), 0.45), c = sp(Math.cos(th), 0.45) * (0.74 + 0.4 * x);
      for (let j = 0; j <= NV; j++) { const ph = -Math.PI + (2 * Math.PI * j) / NV; pos.push(x, c * Math.cos(ph), c * Math.sin(ph)); }
    }
    for (let i = 0; i < NU; i++) for (let j = 0; j < NV; j++) { const a = i * (NV + 1) + j, b = a + NV + 1; idx.push(a, a + 1, b, b, a + 1, b + 1); }
    CLOUD = new T3.BufferGeometry(); CLOUD.setAttribute('position', new T3.Float32BufferAttribute(pos, 3)); CLOUD.setIndex(idx); CLOUD.computeVertexNormals();
  }
  let sig = '', gP = null, gPi = null;
  function lobe(grp, from, dir, len, c, name, wide = 1, op = 1) {
    const m = new T3.Mesh(DROP, F.mesh.mat(c, op < 1 ? { transparent: true, opacity: op, depthWrite: false } : {})); if (op < 1) m.renderOrder = 3;
    m.position.set(...add(from, mul(dir, 0.07))); m.quaternion.setFromUnitVectors(new T3.Vector3(0, 1, 0), new T3.Vector3(...dir)); m.scale.set(len * wide, len, len * wide);
    grp.add(m); v.pickable(m, name); return m;
  }
  function build() {
    const s = palSig(); if (s === sig || !T3 || !v.scene || !DROP) return; sig = s;
    g.children.slice().forEach((c) => { g.remove(c); });
    gP = new T3.Group(); gPi = new T3.Group(); g.add(gP, gPi);
    /* the plane of the σ bonds */
    const X = 1.62, Z0 = -1.9, Z1 = 1.15, pts = [[-X, 0, Z0], [X, 0, Z0], [X, 0, Z1], [-X, 0, Z1]];
    const geo = new T3.BufferGeometry(); geo.setAttribute('position', new T3.Float32BufferAttribute(pts.flat(), 3)); geo.setIndex([0, 1, 2, 0, 2, 3]); geo.computeVertexNormals();
    const sheet = new T3.Mesh(geo, new T3.MeshBasicMaterial({ color: new T3.Color(PAL.muted), transparent: true, opacity: 0.16, depthWrite: false, side: T3.DoubleSide }));
    sheet.renderOrder = 1; g.add(sheet); v.pickable(sheet, 'the plane of the three σ bonds');
    F.mesh.polyline(g, pts.concat([pts[0]]), PAL.muted);
    /* atoms and σ bonds */
    v.pickable(F.mesh.sphere(g, AT.C, 0.18, F.el('C')), 'carbonyl carbon atom, sp² hybridized, δ+');
    v.pickable(F.mesh.sphere(g, AT.O, 0.2, F.el('O')), 'carbonyl oxygen atom, δ−');
    ['L', 'R'].forEach((k) => {
      v.pickable(F.mesh.sphere(g, AT[k], 0.24, F.el('R')), 'R group: a carbon chain or a hydrogen atom');
      v.pickable(F.mesh.stick(g, AT.C, AT[k], 0.045, PAL.ink), 'σ bond from carbon to an R group');
      lobe(g, AT.C, DIR[k], 0.95, HYB(), 'sp² hybrid orbital on carbon: a σ bond to an R group', 0.8, 0.5);
    });
    v.pickable(F.mesh.stick(g, AT.C, AT.O, 0.045, PAL.ink), 'σ bond from carbon to oxygen');
    lobe(g, AT.C, DIR.O, 0.9, HYB(), 'sp² hybrid orbital on carbon: the σ bond to oxygen', 0.8, 0.5);
    /* the ~120° angle the book marks, between C=O and C–R² */
    const N = 20, RA = 1.12, arc = [];
    for (let i = 0; i <= N; i++) { const a = (-80 + (100 * i) / N) * RAD; arc.push([RA * Math.cos(a), 0.012, RA * Math.sin(a)]); }
    for (let i = 0; i < N; i++) F.mesh.stick(g, arc[i], arc[i + 1], 0.014, PAL.ink);
    /* the two p orbitals */
    [[AT.C, 'unhybridized p orbital on carbon'], [AT.O, 'p orbital on oxygen']].forEach(([p, name]) => {
      lobe(gP, p, [0, 1, 0], 1.05, PLUS(), `${name}, + phase`, 0.85);
      lobe(gP, p, [0, -1, 0], 1.05, MINUS(), `${name}, − phase`, 0.85);
    });
    /* the π bond: one cloud above the plane and one below, fatter over oxygen */
    [[1, PLUS(), '+'], [-1, MINUS(), '−']].forEach(([y, c, ph]) => {
      const m = new T3.Mesh(CLOUD, F.mesh.mat(c, { transparent: true, opacity: 0.32, depthWrite: false }));
      m.position.set(0, 0.64 * y, -0.605); m.rotation.y = Math.PI / 2; m.scale.set(1.2, 0.58, 0.42); m.renderOrder = 4;
      gPi.add(m); v.pickable(m, `the π bond, ${ph} phase: denser at oxygen`);
    });
  }
  /* labels, each pushed on the screen away from the group's centre until it clears its thing */
  const outs = [
    { el: v.label('R¹', [0, 0, 0], g, 0, 'bare'), p: AT.L, r: 0.3 },
    { el: v.label('R²', [0, 0, 0], g, 0, 'bare'), p: AT.R, r: 0.3 },
    { el: v.label('δ−', [0, 0, 0], g), p: add(AT.O, [0.2, 0, -0.15]), r: 0.34 },
    { el: v.label('δ+', [0, 0, 0], g), p: [-0.12, 0, 0.6], r: 0.04 },
    { el: v.label('~120°', [0, 0, 0], g), p: [1.42 * Math.cos(-22 * RAD), 0, 1.42 * Math.sin(-22 * RAD)], r: 0.04 },
  ];
  outs.forEach((l) => { l.el.style.transform = 'translate(-50%, -50%)'; });
  function place() {
    if (!v.wrap || !v.wrap.clientHeight) return;
    const w = v.wrap.clientWidth, h = v.wrap.clientHeight, u = h / (2 * Math.tan((FOV / 2) * RAD) * DIST / (v.at.zoom || 1));
    const c = v.project([0, 0, -0.2], g);
    outs.forEach((l) => {
      const q = v.project(l.p, g);
      let dx = q[0] - c[0], dy = q[1] - c[1]; const n = Math.hypot(dx, dy);
      if (n < 6) { dx = 0; dy = -1; } else { dx /= n; dy /= n; }
      const bw = l.el.offsetWidth / 2, bh = l.el.offsetHeight / 2, push = l.r * u + 5 + Math.abs(dx) * bw + Math.abs(dy) * bh;
      l.el.style.left = Math.min(Math.max(q[0] + dx * push, bw + 2), w - bw - 2) + 'px';
      l.el.style.top = Math.min(Math.max(q[1] + dy * push, bh + 2), h - bh - 2) + 'px';
    });
  }
  function draw() {
    build();
    v.headline(HEAD[step.value]);
    ro.set(READ[step.value], undefined, { form: step.value });
    const { ctx } = begin(key);
    const ball = (sym, r, s) => ({ s, draw: (c, x, y) => { c.save(); c.beginPath(); c.arc(x, y, r, 0, 2 * Math.PI); c.fillStyle = F.el(sym); c.fill(); c.lineWidth = 1.5; c.strokeStyle = alpha(PAL.ink, 0.5); c.stroke(); c.restore(); } });
    const drop = (col, s) => ({ s, draw: (c, x, y) => { c.save(); c.fillStyle = col; c.beginPath(); c.moveTo(x - 16, y); c.bezierCurveTo(x - 4, y - 12, x + 16, y - 12, x + 16, y); c.bezierCurveTo(x + 16, y + 12, x - 4, y + 12, x - 16, y); c.fill(); c.restore(); } });
    F.legend(ctx, { l: 40, r: 1360, t: 0, b: 64 }, [ball('C', 7, 'carbon'), ball('O', 8, 'oxygen'), ball('R', 10, 'R group'), drop(HYB(), 'sp² hybrid orbital'), drop(PLUS(), 'p orbital, + phase'), drop(MINUS(), 'p orbital, − phase')], { corner: 'top', row: true, panel: false, size: 20 });
    if (!gP) return;
    F.fade3(gP, step.mix((x) => (x === 'sigma' ? 0 : 1)));
    F.fade3(gPi, step.mix((x) => (x === 'pi' ? 1 : 0)));
    v.invalidate();
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   SIM (Example 20.10): CH4, CH3OH, CH2O, HCO2H and CO2 side by side,
   each with its carbon standing over its oxidation number on one scale
   from −4 to +4. Every bond is drawn with its two electrons beside the
   atom that holds them more tightly (carbon in C–H, oxygen in C–O and
   O–H), and a dashed ring gathers the ones counted as carbon's: 8, 6,
   4, 2, 0. So each C–H bond replaced by a C–O bond is seen to cost
   carbon two electrons, which is the book's "this carbon atom has lost
   two electrons so it was oxidized". The choice picks the molecule the
   headline and the readout work out. Flat: a ladder of structures on a
   scale. Still: five states of one comparison, nothing with a clock.
===================================================================== */
(function () {
  const d = F.sim(root, 'sim-carbon-oxidation', 566);
  const ORDER = ['CH4', 'CH3OH', 'CH2O', 'HCO2H', 'CO2'];
  const c30 = Math.cos(Math.PI / 6), s30 = 0.5, CO = 1.05;
  /* atoms by key in bond lengths about carbon, y down; bonds as [a, b, order]; nH and nO count the atoms of the formula */
  const MOL = {
    CH4: { label: 'CH₄', name: 'methane', ox: -4, nH: 4, nO: 0,
      atoms: { C: [0, 0], Ha: [0, -1], Hb: [-1, 0], Hc: [0, 1], Hd: [1, 0] },
      bonds: [['C', 'Ha', 1], ['C', 'Hb', 1], ['C', 'Hc', 1], ['C', 'Hd', 1]],
      head: 'In methane, carbon pulls all four C–H pairs its way and is counted 8 electrons.' },
    CH3OH: { label: 'CH₃OH', name: 'methanol', ox: -2, nH: 4, nO: 1,
      atoms: { C: [0, 0], Ha: [0, -1], Hb: [-1, 0], Hc: [0, 1], O1: [CO, 0], Ho1: [CO + 0.52, 0.64] },
      bonds: [['C', 'Ha', 1], ['C', 'Hb', 1], ['C', 'Hc', 1], ['C', 'O1', 1], ['O1', 'Ho1', 1]],
      head: 'In methanol one pair sits with oxygen, so carbon is counted 6 electrons, 2 fewer than in methane.' },
    CH2O: { label: 'CH₂O', name: 'formaldehyde', ox: 0, nH: 2, nO: 1,
      atoms: { C: [0, 0], O1: [0, -CO], Hb: [-c30, s30], Hc: [c30, s30] },
      bonds: [['C', 'O1', 2], ['C', 'Hb', 1], ['C', 'Hc', 1]],
      head: 'In formaldehyde two pairs sit with oxygen, and carbon is counted 4 electrons, its own number.' },
    HCO2H: { label: 'HCO₂H', name: 'formic acid', ox: 2, nH: 2, nO: 2,
      atoms: { C: [0, 0], O1: [0, -CO], Hb: [-c30, s30], O2: [c30 * CO, s30 * CO], Ho2: [c30 * CO + 0.12, s30 * CO + 0.7] },
      bonds: [['C', 'O1', 2], ['C', 'Hb', 1], ['C', 'O2', 1], ['O2', 'Ho2', 1]],
      head: 'In formic acid three pairs sit with oxygen, and carbon is counted 2 electrons.' },
    CO2: { label: 'CO₂', name: 'carbon dioxide', ox: 4, nH: 0, nO: 2,
      atoms: { C: [0, 0], O1: [-1.1, 0], O2: [1.1, 0] },
      bonds: [['C', 'O1', 2], ['C', 'O2', 2]],
      head: 'In carbon dioxide all four pairs sit with oxygen, and carbon is counted no electrons.' },
  };
  /* the electrons counted as carbon's: two for each C–H bond */
  ORDER.forEach((m) => { MOL[m].e = 2 * MOL[m].bonds.filter(([a, b]) => a === 'C' && b[0] === 'H').length; });
  const mol = F.choice(d.controls, { label: '\\text{molecule}', key: 'molecule', aria: 'the molecule worked out',
    options: ORDER.map((m) => ({ value: m, label: MOL[m].label })), value: 'CH4' });
  const ro = F.readout(d);
  let hits = []; F.hover(d.stage, () => hits);

  const XA = 180, XB = 1220, X = (n) => XA + ((n + 4) / 8) * (XB - XA);
  const MY = 262, BL = 86, RAD = { C: 19, O: 19, H: 12 }, RING = 45, SY = 478;
  const NAME = { C: 'carbon atom', O: 'oxygen atom', H: 'hydrogen atom' };
  /* which end of a bond holds its electrons: oxygen over carbon over hydrogen */
  const RANK = { O: 3, C: 2, H: 1 };
  function disc(ctx, x, y, s) {
    ctx.save(); ctx.beginPath(); ctx.arc(x, y, RAD[s], 0, 2 * Math.PI); ctx.fillStyle = F.el(s); ctx.fill();
    ctx.lineWidth = s === 'H' ? 2 : 1.2; ctx.strokeStyle = s === 'H' ? PAL.ink : alpha(PAL.ink, 0.4); ctx.stroke(); ctx.restore();
  }
  function molecule(ctx, m) {
    const t = MOL[m], cx = X(t.ox), P = (k) => [cx + t.atoms[k][0] * BL, MY + t.atoms[k][1] * BL];
    t.bonds.forEach(([a, b, order]) => {
      const p = P(a), q = P(b), L = Math.hypot(q[0] - p[0], q[1] - p[1]), ux = (q[0] - p[0]) / L, uy = (q[1] - p[1]) / L;
      /* w is the atom that holds the pair, and the dots step from its rim toward the other atom */
      const wa = RANK[a[0]] > RANK[b[0]], w = wa ? p : q, sg = wa ? 1 : -1, rw = RAD[(wa ? a : b)[0]];
      (order === 2 ? [-6.5, 6.5] : [0]).forEach((o) => {
        line(ctx, p[0] - uy * o, p[1] + ux * o, q[0] - uy * o, q[1] + ux * o, PAL.muted, 3);
        [rw + 7.5, rw + 19].forEach((r) => F.dot(ctx, w[0] + sg * ux * r - uy * o, w[1] + sg * uy * r + ux * o, PAL.ink, true, 4.6));
      });
    });
    Object.keys(t.atoms).forEach((k) => { const p = P(k), s = k[0]; disc(ctx, p[0], p[1], s); hits.push({ x: p[0], y: p[1], r: RAD[s] + 3, name: NAME[s] }); });
    ctx.save(); ctx.setLineDash([7, 6]); ctx.lineWidth = 2; ctx.strokeStyle = PAL.ink; ctx.beginPath(); ctx.arc(cx, MY, RING, 0, 2 * Math.PI); ctx.stroke(); ctx.restore();
    text(ctx, `${t.e} e⁻ counted to C`, cx, 412, PAL.ink, { size: 21, align: 'center' });
  }
  const num = (n) => (n > 0 ? `+${n}` : n < 0 ? `−${-n}` : '0');
  function drawScale(ctx) {
    line(ctx, XA, SY, XB, SY, PAL.muted, 3);
    for (let n = -4; n <= 4; n++) {
      line(ctx, X(n), SY, X(n), SY + 9, PAL.muted, 2);
      text(ctx, num(n), X(n), SY + 28, PAL.muted, { size: 18, align: 'center' });
      /* between two molecules of the ladder: what the step costs carbon */
      if (n % 2) text(ctx, '−2 e⁻', X(n), SY - 30, PAL.muted, { size: 18, align: 'center' });
    }
    text(ctx, 'oxidation number of carbon', (XA + XB) / 2, SY + 62, PAL.ink, { size: 20, align: 'center' });
    text(ctx, 'more reduced', XA - 28, SY + 62, PAL.muted, { size: 18, align: 'center' });
    text(ctx, 'more oxidized', XB + 28, SY + 62, PAL.muted, { size: 18, align: 'center' });
    ORDER.forEach((m) => {
      F.dot(ctx, X(MOL[m].ox), SY, PAL.ink, false, 9);
      text(ctx, MOL[m].label, X(MOL[m].ox), SY - 30, PAL.ink, { size: 22, align: 'center', weight: m === mol.value ? 600 : 400 });
    });
    F.dot(ctx, X(mol.mix((m) => MOL[m].ox)), SY, PAL.ink, true, 11);
  }
  function draw() {
    const { ctx } = begin(d.c); hits = [];
    const t = MOL[mol.value];
    const rows = headline(ctx, t.head);
    /* the chosen molecule's column */
    const hx = X(mol.mix((m) => MOL[m].ox));
    ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.07); ctx.beginPath(); ctx.roundRect(hx - 126, 124, 252, 310, 14); ctx.fill(); ctx.restore();
    ORDER.forEach((m) => molecule(ctx, m));
    drawScale(ctx);
    const ball = (s, n) => ({ s: n, draw: (c, x, y) => disc(c, x, y, s) });
    F.legend(ctx, { l: 40, r: 1360, t: 62 + (rows > 1 ? 26 : 0), b: 112 + (rows > 1 ? 26 : 0) }, [ball('C', 'carbon'), ball('H', 'hydrogen'), ball('O', 'oxygen'),
      { s: 'a bond’s two electrons, beside the atom that holds them', draw: (c, x, y) => { F.dot(c, x - 6.5, y, PAL.ink, true, 4.6); F.dot(c, x + 6.5, y, PAL.ink, true, 4.6); } },
      { s: 'counted to carbon', draw: (c, x, y) => { c.save(); c.setLineDash([5, 4]); c.lineWidth = 2; c.strokeStyle = PAL.ink; c.beginPath(); c.arc(x, y, 10, 0, 2 * Math.PI); c.stroke(); c.restore(); } }],
      { corner: 'top', row: true, panel: false, size: 19 });
    const terms = [t.nH ? `\\mk{h}{${t.nH}(+1)}` : '', t.nO ? `\\mk{o}{${t.nO}(-2)}` : ''].filter(Boolean).join(' + ');
    const sg = (n) => (n > 0 ? `+${n}` : `${n}`);
    ro.set(`\\mk{x}{x_{\\text{C}}} = 0 - [${terms}] = \\mk{r}{${sg(t.ox)}} \\\\ \\mk{y}{x_{\\text{C}}} = \\mk{v}{4\\text{ valence }e^{-}} - \\mk{c}{${t.e}\\ e^{-}\\text{ counted to C}} = \\mk{z}{${sg(t.ox)}}`, undefined, { form: `${!!t.nH}${!!t.nO}` });
  }
  register(d.fig, { update: () => {}, draw });
})();
};
