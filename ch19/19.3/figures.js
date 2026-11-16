/* Figures for section 19.3 Spectroscopic and Magnetic Properties of Coordination Compounds. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['19.3'] = function (root, F) {
const { el, fmt, tex, C, PAL, alpha, register, begin, line, arrow, text, topline, hover } = F;
const sim = (id, H) => F.sim(root, id, H);
const still = (d, draw) => register(d.fig, { update: () => {}, draw });
function readout(host, main, small) { tex(host, main); if (small) host.appendChild(el('small', null, small)); }
const TAU = 2 * Math.PI;
const SUP = ['⁰', '¹', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹', '¹⁰'];
const WORDS = ['no', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
const cap = (s) => s[0].toUpperCase() + s.slice(1);

/* =====================================================================
   FIGURE 19.33 + 19.34 + 19.36: the five d orbitals among the ligands of
   an octahedral, tetrahedral or square planar complex, each standing at
   its energy, so the picture is the splitting diagram. Five panels of one
   scene: a drag turns every orbital about its own centre. Mathematical
   3D: an orbital is one contour of |ψ| for its angular function with a
   hydrogen-like radial factor, as 6.3 draws it, in the two colours of
   the sign of ψ. Still: a change of geometry slides the ligands to their
   new sites and the orbitals to their new levels. Heights are to scale:
   Δtet is four ninths of Δoct; the book gives no values for square
   planar, so its four levels are evenly spaced in the book's order.
===================================================================== */
(function () {
  const d = sim('sim-d-orbitals');
  /* 23.8 by 19.4 scene units fill the stage; a narrow lens far off keeps the outer panels undistorted */
  const WU = 23.8, HU = 19.4, FOV = 14, DIST = HU / 2 / Math.tan((FOV * Math.PI) / 360);
  const V = F.view3d(d.stage, { h: Math.round((1400 * HU) / WU), dist: DIST, tilt: 0.3, zoomMin: 0.8, zoomMax: 2.2, onRender: () => hideBehind() });
  const T3 = window.THREE, live = !!T3 && V.wrap.classList.contains('three-wrap');
  if (live) { V.camera.fov = FOV; V.camera.near = 1; V.camera.far = DIST * 2; V.camera.updateProjectionMatrix(); }
  V.setView(-0.7, 0.45);
  const key = F.makeCanvas(d.stage, 56);
  const ORBS = [
    { v: 'x2y2', html: '<em>d</em><sub><em>x</em>²−<em>y</em>²</sub>', plain: 'dx²−y²', f: (x, y) => x * x - y * y },
    { v: 'z2', html: '<em>d</em><sub><em>z</em>²</sub>', plain: 'dz²', f: (x, y, z) => 3 * z * z - 1 },
    { v: 'yz', html: '<em>d</em><sub><em>yz</em></sub>', plain: 'dyz', f: (x, y, z) => y * z },
    { v: 'xz', html: '<em>d</em><sub><em>xz</em></sub>', plain: 'dxz', f: (x, y, z) => x * z },
    { v: 'xy', html: '<em>d</em><sub><em>xy</em></sub>', plain: 'dxy', f: (x, y) => x * y },
  ];
  const geo = F.choice(d.controls, { label: '\\text{geometry}', aria: 'the geometry of the complex', value: 'oct', ms: 1100,
    options: [{ value: 'oct', label: 'octahedral' }, { value: 'tet', label: 'tetrahedral' }, { value: 'sqp', label: 'square planar' }] });

  /* where each orbital stands: its column, its energy in units of Δoct about the free ion's average, and the side its name takes */
  const DU = 9.6, X0 = -0.7, Y0 = -1.45, TQ = 4 / 9;
  const LAY = {
    oct: { xy: [-6, -0.4, -1], xz: [0, -0.4, -1], yz: [6, -0.4, -1], z2: [-3, 0.6, -1], x2y2: [3, 0.6, -1] },
    tet: { z2: [-3, -0.6 * TQ, -1], x2y2: [3, -0.6 * TQ, -1], xy: [-6, 0.4 * TQ, 1], xz: [0, 0.4 * TQ, 1], yz: [6, 0.4 * TQ, 1] },
    sqp: { xz: [-6, -0.4, -1], yz: [0, -0.4, -1], z2: [6, -0.4 + 1 / 3, -1], xy: [-3, -0.4 + 2 / 3, -1], x2y2: [3, 0.6, -1] },
  };
  const XE = -9.9 + X0, XA = 9.6 + X0;
  const SETS = { oct: { lo: '<em>t</em><sub>2<em>g</em></sub>', hi: '<em>e<sub>g</sub></em>', gap: '\\kdoct' }, tet: { lo: '<em>e</em>', hi: '<em>t</em><sub>2</sub>', gap: '\\kdtet' } };
  const HEAD = {
    oct: 'The lobes of $d_{z^2}$ and $d_{x^2-y^2}$ point straight at the six ligands, so those two orbitals lie higher.',
    tet: 'No lobe points straight at the four ligands. Those of $d_{xy}$, $d_{xz}$ and $d_{yz}$ come nearest, so these three lie higher, by less.',
    sqp: '$d_{x^2-y^2}$ points at all four ligands and lies highest. $d_{xz}$ and $d_{yz}$ point out of their plane and lie lowest.',
  };
  const RO = {
    oct: 'E_{e_{g}} - E_{t_{2g}} = \\kdoct',
    tet: 'E_{t_{2}} - E_{e} = \\kdtet = \\tfrac{4}{9}\\kdoct',
    sqp: 'E_{d_{xz}} = E_{d_{yz}} < E_{d_{z^2}} < E_{d_{xy}} < E_{d_{x^2-y^2}}',
  };

  /* the ligand sites, in the chemist's axes; a site a geometry leaves empty is pushed out along its axis and fades */
  const c = 1 / Math.sqrt(3), RMAX = 2.1, RL = 2.6, OUT = 3.5;
  const AX6 = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]];
  const SITES = {
    oct: { p: AX6, on: [1, 1, 1, 1, 1, 1] },
    tet: { p: [[c, c, c], [-c, -c, c], [-c, c, -c], [c, -c, -c], [0, 0, 1], [0, 0, -1]], on: [1, 1, 1, 1, 0, 0] },
    sqp: { p: AX6, on: [1, 1, 1, 1, 0, 0] },
  };
  /* the chemist's x, y, z to the scene's: z up and y going away to the right, as the book draws its axes */
  const S = (p) => [p[0], p[2], -p[1]];
  const unit = (a) => { const l = Math.hypot(a[0], a[1], a[2]) || 1; return [a[0] / l, a[1] / l, a[2] / l]; };
  function slerp(a, b, t) {
    const w = Math.acos(Math.max(-1, Math.min(1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2])));
    if (w < 1e-6) return a;
    const s = Math.sin(w), p = Math.sin((1 - t) * w) / s, q = Math.sin(t * w) / s;
    return unit([a[0] * p + b[0] * q, a[1] * p + b[1] * q, a[2] * p + b[2] * q]);
  }

  /* an orbital: along each direction the contour |R(r) Y| = Q is met twice, an outer and an inner sheet joined at the rim */
  const NT = 60, NP = 120, Q = 0.38, L2 = 2;
  const dirs = [];
  for (let i = 0; i <= NT; i++) for (let j = 0; j <= NP; j++) { const th = (Math.PI * i) / NT, ph = (TAU * j) / NP; dirs.push([Math.sin(th) * Math.cos(ph), Math.sin(th) * Math.sin(ph), Math.cos(th)]); }
  const rad = (r) => Math.exp(L2 * Math.log(r / L2) + L2 - r);
  function outer(t) { let a = L2, b = L2 + 30; for (let i = 0; i < 26; i++) { const m = (a + b) / 2; if (rad(m) > t) a = m; else b = m; } return (a + b) / 2; }
  function inner(t) { let a = 1e-9, b = L2; for (let i = 0; i < 26; i++) { const m = (a + b) / 2; if (rad(m) < t) a = m; else b = m; } return (a + b) / 2; }
  const SC = RMAX / outer(Q);
  function lobes(o, g) {
    const n = dirs.length, raw = dirs.map((q) => o.f(q[0], q[1], q[2])), top = Math.max(...raw.map(Math.abs)), on = new Uint8Array(n), sign = new Int8Array(n);
    const mk = () => {
      const g3 = new T3.BufferGeometry(), pos = new T3.Float32BufferAttribute(new Float32Array(n * 3), 3), col = new T3.Float32BufferAttribute(new Float32Array(n * 3), 3);
      g3.setAttribute('position', pos); g3.setAttribute('color', col);
      const mesh = new T3.Mesh(g3, new T3.MeshPhongMaterial({ vertexColors: true, side: T3.DoubleSide, shininess: 30 }));
      g.add(mesh); V.pickable(mesh, `the ${o.plain} orbital; the two colors are the two signs of its wave function`); return { g3, pos, col };
    };
    const out = mk(), inn = mk();
    for (let i = 0; i < n; i++) {
      const sv = raw[i] / top, a = Math.abs(sv), q = S(dirs[i]);
      on[i] = a >= Q ? 1 : 0; sign[i] = sv >= 0 ? 1 : -1;
      const ro = (on[i] ? outer(Q / a) : L2) * SC, ri = (on[i] ? inner(Q / a) : L2) * SC;
      out.pos.setXYZ(i, q[0] * ro, q[1] * ro, q[2] * ro); inn.pos.setXYZ(i, q[0] * ri, q[1] * ri, q[2] * ri);
    }
    const idx = [];
    for (let i = 0; i < NT; i++) for (let j = 0; j < NP; j++) {
      const a = i * (NP + 1) + j, b = a + NP + 1;
      if (on[a] || on[b] || on[a + 1]) idx.push(a, b, a + 1);
      if (on[b] || on[b + 1] || on[a + 1]) idx.push(b, b + 1, a + 1);
    }
    [out, inn].forEach((sh) => { sh.g3.setIndex(idx); sh.g3.computeVertexNormals(); sh.g3.computeBoundingSphere(); });
    return { sheets: [out, inn], sign };
  }

  const panels = [], axisNames = [];
  let flat = null, sigFlat = '', sigCol = '', sigLig = '';
  const lab = {};
  if (live) {
    ORBS.forEach((o) => {
      const g = V.part(0), P = { o, g, ligs: [], sticks: [], cube: [], axes: [] };
      P.lobes = lobes(o, g);
      [[1, 0, 0], [0, 1, 0], [0, 0, 1]].forEach((p) => P.axes.push(F.mesh.polyline(g, [S(p.map((q) => -2.95 * q)), S(p.map((q) => 2.95 * q))], PAL.muted)));
      AX6.forEach(() => {
        const s = F.mesh.stick(g, [0, 0, 0], [0, 1, 0], 0.022, PAL.muted, { transparent: true });
        const m = F.mesh.sphere(g, [0, 1, 0], 0.2, F.el('L'), { transparent: true });
        V.pickable(m, 'a ligand, L, treated as a point of negative charge');
        P.ligs.push(m); P.sticks.push(s);
      });
      /* the cube whose alternate corners hold the tetrahedral ligands (Figure 19.36) */
      const h = c * RL, corners = [];
      for (let i = 0; i < 8; i++) corners.push([(i & 1 ? 1 : -1) * h, (i & 2 ? 1 : -1) * h, (i & 4 ? 1 : -1) * h]);
      for (let i = 0; i < 8; i++) for (const b of [1, 2, 4]) if (!(i & b)) {
        const ln = F.mesh.polyline(g, [S(corners[i]), S(corners[i | b])], PAL.muted);
        ln.material.transparent = true; P.cube.push(ln);
      }
      panels.push(P);
    });
    /* the flat parts of the diagram stand outside the turn */
    flat = V.part(0); flat.updateMatrix = T3.Object3D.prototype.updateMatrix;
    ORBS.forEach((o) => { lab[o.v] = V.label(o.html, [0, 0, 0], flat, 0, 'bare'); });
    lab.E = V.label('<em>E</em>', [XE - 0.6, Y0 + 1, 0], flat, 0, 'bare');
    ['oct', 'tet'].forEach((v) => {
      lab[v + 'gap'] = V.label('', [0, 0, 0], flat, 0, 'bare'); tex(lab[v + 'gap'], SETS[v].gap);
      lab[v + 'lo'] = V.label(SETS[v].lo, [0, 0, 0], flat, 0, 'bare'); lab[v + 'hi'] = V.label(SETS[v].hi, [0, 0, 0], flat, 0, 'bare');
    });
    /* the axes are named once, on the first orbital, as the book names them */
    const g0 = panels[0].g;
    [[[3.3, 0, 0], 'x'], [[0, 3.3, 0], 'y'], [[0, 0, 3.25], 'z']].forEach(([p, nm]) => axisNames.push({ e: V.label(`<em>${nm}</em>`, S(p), g0, 0, 'bare'), p: S(p), g: g0 }));
  }
  /* an axis name hides while it is seen against its orbital, so no name sits on a lobe */
  function hideBehind() {
    if (!axisNames.length) return;
    const g = axisNames[0].g, o = V.project([0, 0, 0], g), u = V.project([1, 0, 0], flat), z = V.project([0, 0, 0], flat), ppu = Math.hypot(u[0] - z[0], u[1] - z[1]);
    axisNames.forEach(({ e, p }) => { const q = V.project(p, g); e.style.visibility = Math.hypot(q[0] - o[0], q[1] - o[1]) < 0.9 * RMAX * ppu ? 'hidden' : ''; });
  }
  const shared = live ? Object.values(F.mesh.geo()) : [];
  function wipe(g) { g.children.slice().forEach((o) => { o.material?.dispose?.(); if (o.geometry && !shared.includes(o.geometry)) o.geometry.dispose(); g.remove(o); }); }
  function scene() {
    if (!live) return;
    const kg = geo.k, ce = C('energy');
    /* the lobes' two colours */
    const tagC = [F.cat(0), F.cat(1)].join('|');
    if (tagC !== sigCol) {
      sigCol = tagC;
      const ca = new T3.Color(F.cat(0)), cb = new T3.Color(F.cat(1));
      panels.forEach((P) => P.lobes.sheets.forEach((sh) => { for (let i = 0; i < dirs.length; i++) { const cc = P.lobes.sign[i] > 0 ? ca : cb; sh.col.setXYZ(i, cc.r, cc.g, cc.b); } sh.col.needsUpdate = true; }));
    }
    const pos = {};
    ORBS.forEach((o) => { pos[o.v] = geo.mix((v) => LAY[v][o.v]); });
    panels.forEach((P) => { const [x, e] = pos[P.o.v]; P.g.position.set(x + X0, e * DU + Y0, 0); });
    const tagL = [geo.value, kg.toFixed(4), PAL.muted, F.el('L')].join('|');
    if (tagL !== sigLig) {
      sigLig = tagL;
      const sa = SITES[geo.from ?? geo.value], sb = SITES[geo.value], ct = geo.a('tet');
      panels.forEach((P) => {
        P.ligs.forEach((m, j) => {
          const op = sa.on[j] + (sb.on[j] - sa.on[j]) * kg;
          const dir = sa.on[j] && sb.on[j] ? slerp(sa.p[j], sb.p[j], kg) : sb.on[j] ? sb.p[j] : sa.p[j];
          const R = RL + (OUT - RL) * (1 - op), Q3 = S(dir.map((q) => q * R));
          m.position.set(Q3[0], Q3[1], Q3[2]); m.material.color.set(F.el('L')); m.material.opacity = op; m.visible = op > 0.02;
          F.mesh.setStick(P.sticks[j], [0, 0, 0], Q3); P.sticks[j].material.color.set(PAL.muted); P.sticks[j].material.opacity = 0.8 * op; P.sticks[j].visible = op > 0.02;
        });
        P.cube.forEach((ln) => { ln.material.color.set(PAL.muted); ln.material.opacity = 0.8 * ct; ln.visible = ct > 0.02; });
        P.axes.forEach((ln) => ln.material.color.set(PAL.muted));
      });
    }
    /* the energy axis, a level line through each orbital, and the gap between the two sets */
    const ys = ORBS.map((o) => pos[o.v][1] * DU + Y0), lo = Math.min(...ys), hi = Math.max(...ys), gapOn = geo.value !== 'sqp';
    const tagF = [geo.value, kg.toFixed(4), PAL.muted, PAL.ink, ce].join('|');
    if (tagF !== sigFlat) {
      sigFlat = tagF; wipe(flat);
      F.mesh.arrow(flat, [XE, Y0 - 0.4 * DU - 3.6, 0], [XE, Y0 + 0.6 * DU + 2.9, 0], 0.05, PAL.muted);
      [...new Set(ys.map((y) => y.toFixed(3)))].forEach((y) => { const ln = F.mesh.polyline(flat, [[XE, +y, -3.4], [XA + 0.45, +y, -3.4]], PAL.muted); ln.material.transparent = true; ln.material.opacity = 0.55; });
      if (gapOn) {
        const mid = (lo + hi) / 2;
        F.mesh.arrow(flat, [XA, mid, 0], [XA, hi, 0], 0.05, ce); F.mesh.arrow(flat, [XA, mid, 0], [XA, lo, 0], 0.05, ce);
        [lo, hi].forEach((y) => F.mesh.stick(flat, [XA - 0.45, y, 0], [XA + 0.45, y, 0], 0.035, PAL.ink));
      }
    }
    ORBS.forEach((o) => { const [x, e, side] = pos[o.v]; V.move(lab[o.v], [x + X0, e * DU + Y0 + side * 3.45, 0]); });
    ['oct', 'tet'].forEach((v) => {
      const a = String(geo.a(v));
      V.move(lab[v + 'gap'], [XA + 1.25, (lo + hi) / 2, 0]); V.move(lab[v + 'lo'], [XA + 1.2, lo, 0]); V.move(lab[v + 'hi'], [XA + 1.2, hi, 0]);
      lab[v + 'gap'].style.opacity = a; lab[v + 'lo'].style.opacity = a; lab[v + 'hi'].style.opacity = a;
    });
    V.invalidate();
  }
  function keyDraw() {
    const { ctx } = begin(key);
    const disc = (col, r) => (cc, x, y) => { cc.save(); cc.beginPath(); cc.arc(x, y, r, 0, TAU); cc.fillStyle = col; cc.fill(); cc.restore(); };
    F.legend(ctx, { l: 40, r: 1360, t: 0, b: 56 }, [
      { s: 'ligand L', draw: disc(F.el('L'), 9) },
      { s: 'ψ > 0', kind: 'swatch', color: F.cat(0) },
      { s: 'ψ < 0', kind: 'swatch', color: F.cat(1) },
    ], { corner: 'top', row: true, panel: false, size: 20 });
  }
  function draw() {
    scene();
    keyDraw();
    V.headline(HEAD[geo.value]);
    readout(d.readout, RO[geo.value]);
  }
  still(d, draw);
})();

/* =====================================================================
   FIGURE 19.35: high and low spin. The free ion's five degenerate boxes
   split into the octahedral complex's t2g and eg rows, Δoct apart about
   the same average; beside the gap stands the pairing energy P from the
   same floor, so the two prices an electron can pay are two lengths side
   by side. Still: the gap answers the slider; crossing Δoct = P moves
   the electrons that change sets in one eased beat, their spins turning.
===================================================================== */
(function () {
  const H = 570;
  const d = sim('sim-high-low-spin', H);
  const nPick = F.select(d.controls, { label: '\\text{d electrons}', aria: 'the number of d electrons', value: '6',
    options: Array.from({ length: 10 }, (_, i) => ({ value: String(i + 1), label: 'd' + SUP[i + 1] })), ms: 0, onInput: () => settle(true) });
  const ratio = F.ctl(d.controls, { label: '\\kdoct/\\kPpair', cls: '', min: 0.5, max: 1.5, step: 0.01, value: 0.6, unit: '', dec: 2,
    aria: 'the crystal field splitting as a multiple of the pairing energy', specials: [{ at: 1, label: 'equal' }], onInput: () => settle(false) });
  /* P is 220 units; the free ion's level and the complex's average stand at YB */
  const PX = 220, YB = 338, BW = 100, BH = 80, CXF = 345, CX = 870, XA = 1120, XP = 1265, EH = 27, SEP = 16;
  const HS = [[0, 'u'], [1, 'u'], [2, 'u'], [3, 'u'], [4, 'u'], [0, 'd'], [1, 'd'], [2, 'd'], [3, 'd'], [4, 'd']];
  const LS = [[0, 'u'], [1, 'u'], [2, 'u'], [0, 'd'], [1, 'd'], [2, 'd'], [3, 'u'], [4, 'u'], [3, 'd'], [4, 'd']];
  const PROMOTED = { 4: 1, 5: 2, 6: 2, 7: 1 };
  const spinOf = () => { const r = ratio.v; return Math.abs(r - 1) < 1e-9 ? 'eq' : r < 1 ? 'hs' : 'ls'; };
  const m = F.tween(d, spinOf() === 'ls' ? 1 : 0);
  function settle(cut) {
    const s = spinOf();
    if (s === 'eq') return;
    const target = s === 'ls' ? 1 : 0;
    if (cut) m.set(target); else if (m.v !== target) m.to(target, 900);
  }
  const key = (e) => e[0] + e[1];
  const boxX = (b) => (b < 3 ? CX + (b - 1) * BW : CX + (b - 3.5) * BW);
  /* where an electron sits in its box: alone in the middle, or the up spin left of the down spin */
  function slot(conf, e) {
    const two = conf.filter((q) => q[0] === e[0]).length === 2;
    return [boxX(e[0]) + (two ? (e[1] === 'u' ? -SEP : SEP) : 0), e[1] === 'u' ? 1 : -1];
  }
  /* one electron as the book's half arrow: up with its barb on the left, down with its barb on the right */
  function half(ctx, x, yc, s, color, a = 1) {
    if (Math.abs(s) < 0.04) return;
    F.faded(ctx, a, [0, 0], () => {
      const tip = yc - EH * s, tail = yc + EH * s;
      line(ctx, x, tail, x, tip, color, 4);
      line(ctx, x, tip, x - 11 * s, tip + 16 * s, color, 4);
    });
  }
  function boxes(ctx, x0, y, n) {
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2.5;
    for (let i = 0; i < n; i++) ctx.strokeRect(x0 + i * BW, y - BH / 2, BW, BH);
    ctx.restore();
  }
  function draw() {
    const { ctx } = begin(d.c), ce = C('energy'), n = +nPick.value, r = ratio.v, sp = spinOf();
    const dpx = r * PX, yT = YB + 0.4 * dpx, yE = YB - 0.6 * dpx;
    const hs = HS.slice(0, n), ls = LS.slice(0, n), q = PROMOTED[n];
    const count = (conf, lo) => conf.filter((e) => (lo ? e[0] < 3 : e[0] >= 3)).length;
    const unpaired = (conf) => [0, 1, 2, 3, 4].filter((b) => conf.filter((e) => e[0] === b).length === 1).length;
    const conf = sp === 'ls' ? ls : hs, un = unpaired(conf);
    const ex = n === 6 ? (sp === 'hs' ? ', as in [Fe(H₂O)₆]²⁺' : sp === 'ls' ? ', as in [Fe(CN)₆]⁴⁻' : '') : '';
    let head;
    if (!q) head = `${cap(WORDS[n])} $d$ electron${n > 1 ? 's' : ''} fill the same way at any $\\kdoct$: ${un ? WORDS[un] : 'no'} unpaired electron${un === 1 ? '' : 's'}.`;
    else if (sp === 'eq') head = `${cap(WORDS[n])} $d$ electrons, $\\kdoct = \\kPpair$: the high- and low-spin arrangements have the same energy.`;
    else head = `${cap(WORDS[n])} $d$ electrons, $\\kdoct ${sp === 'hs' ? '<' : '>'} \\kPpair$: ${sp === 'hs' ? 'high' : 'low'} spin, ${un ? WORDS[un] : 'no'} unpaired electron${un === 1 ? '' : 's'}${ex}.`;
    topline(ctx, head);
    arrow(ctx, 62, H - 20, 62, 100, PAL.muted, 3);
    text(ctx, 'E', 36, YB, PAL.ink, { size: 24, weight: 600, italic: true, align: 'center' });
    /* the free ion: five degenerate boxes, filled by Hund's rule */
    const xF0 = CXF - 2.5 * BW, xF1 = CXF + 2.5 * BW;
    boxes(ctx, xF0, YB, 5);
    hs.forEach((e) => { const two = hs.filter((x) => x[0] === e[0]).length === 2; half(ctx, CXF + (e[0] - 2) * BW + (two ? (e[1] === 'u' ? -SEP : SEP) : 0), YB, e[1] === 'u' ? 1 : -1, PAL.ink); });
    text(ctx, 'free ion, no ligands', CXF, YB + BH / 2 + 34, PAL.ink, { size: 22, align: 'center' });
    /* the two sets of the complex, each joined to the level it came from */
    const xT0 = CX - 1.5 * BW, xE0 = CX - BW, xL = xT0 - 86;
    line(ctx, xF1 + 10, YB, xL - 8, yE, alpha(PAL.ink, 0.4), 2, [4, 8]);
    line(ctx, xF1 + 10, YB, xL - 8, yT, alpha(PAL.ink, 0.4), 2, [4, 8]);
    boxes(ctx, xT0, yT, 3);
    boxes(ctx, xE0, yE, 2);
    const yOfBox = (b) => (b < 3 ? yT : yE);
    const hk = new Set(hs.map(key)), lk = new Set(ls.map(key));
    const stay = hs.filter((e) => lk.has(key(e))), goH = hs.filter((e) => !lk.has(key(e))), goL = ls.filter((e) => !hk.has(key(e)));
    const k = m.v;
    stay.forEach((e) => {
      const [xa] = slot(hs, e), [xb] = slot(ls, e), x = xa + (xb - xa) * k;
      half(ctx, x, yOfBox(e[0]), e[1] === 'u' ? 1 : -1, PAL.ink);
    });
    goH.forEach((e, i) => {
      const f = goL[i], [xa, sa] = slot(hs, e), [xb, sb] = slot(ls, f);
      if (sp === 'eq') { half(ctx, xa, yOfBox(e[0]), sa, PAL.ink, 0.45); half(ctx, xb, yOfBox(f[0]), sb, PAL.ink, 0.45); return; }
      half(ctx, xa + (xb - xa) * k, yOfBox(e[0]) + (yOfBox(f[0]) - yOfBox(e[0])) * k, sa + (sb - sa) * k, PAL.ink);
    });
    text(ctx, 't_{2g}', xL + 68, yT, PAL.ink, { size: 28, italic: true, align: 'right' });
    text(ctx, 'e_{g}', xL + 68, yE, PAL.ink, { size: 28, italic: true, align: 'right' });
    text(ctx, 'octahedral complex', CX, yT + BH / 2 + 34, PAL.ink, { size: 22, align: 'center' });
    /* the two prices from the same floor: Δoct to stand in an eg orbital, P to share a t2g orbital */
    const bT = yT + BH / 2, bE = yE + BH / 2;
    line(ctx, CX + 1.5 * BW + 8, bT, XP + 16, bT, alpha(PAL.ink, 0.4), 2, [4, 8]);
    line(ctx, CX + BW + 8, bE, XA + 16, bE, alpha(PAL.ink, 0.4), 2, [4, 8]);
    arrow(ctx, XA, (bT + bE) / 2, XA, bE, ce, 4.5);
    arrow(ctx, XA, (bT + bE) / 2, XA, bT, ce, 4.5);
    text(ctx, '$\\kdoct$', XA + 18, (bT + bE) / 2, ce, { size: 30, tex: true });
    F.vbracket(ctx, XP, bT - PX, bT, ce);
    text(ctx, '$\\kPpair$', XP + 18, bT - PX / 2, ce, { size: 30, tex: true });
    text(ctx, 'to move up', XA, bT + 32, PAL.muted, { size: 19, align: 'center' });
    text(ctx, 'to pair', XP, bT + 32, PAL.muted, { size: 19, align: 'center' });
    const ct = (cf) => `t_{2g}^{${count(cf, true)}}\\,e_{g}^{${count(cf, false)}}`;
    const rel = sp === 'eq' ? '=' : sp === 'hs' ? '<' : '>';
    if (!q) readout(d.readout, `\\kdoct = ${fmt(r, 2)}\\,\\kPpair \\Rightarrow ${ct(hs)}`);
    else readout(d.readout, `\\kdoct = ${fmt(r, 2)}\\,\\kPpair ${rel} \\kPpair \\Rightarrow ${sp === 'eq' ? `${ct(hs)}\\ \\text{or}\\ ${ct(ls)}` : ct(conf)}`);
  }
  still(d, draw);
})();

/* =====================================================================
   FIGURE 19.37: the colour wheel, a solution in white light, and the gap
   the absorbed photon bridges. The absorbed wavelength is a slider; the
   band it takes out is two sectors of the book's wheel, marked with the
   band straight across, and the solution takes the colour of white light
   with that band removed. Opens on the book's own case, red and orange
   absorbed about 620 nm, the blue of [Cu(NH₃)₄]²⁺; Example 19.9's 499 nm
   is a marked value. Still: nothing here is learned from watching light
   travel.
===================================================================== */
(function () {
  const H = 640;
  const d = sim('sim-color-wheel', H);
  const lam = F.ctl(d.controls, { label: '\\klam', cls: 'wavelength', min: 400, max: 800, step: 1, value: 620, unit: 'nm', dec: 0, aria: 'the wavelength absorbed most strongly',
    specials: [{ at: 499, label: 'Example 19.9' }] });
  /* the colours of light, which are a physical fact: 400 to 700 nm in the usual linear approximation, darkening past 660 nm */
  function lightRGB(nm) {
    let r = 0, g = 0, b = 0;
    if (nm < 440) { r = -(nm - 440) / 60; b = 1; }
    else if (nm < 490) { g = (nm - 440) / 50; b = 1; }
    else if (nm < 510) { g = 1; b = -(nm - 510) / 20; }
    else if (nm < 580) { r = (nm - 510) / 70; g = 1; }
    else if (nm < 645) { r = 1; g = -(nm - 645) / 65; }
    else { r = 1; }
    const f = nm < 430 ? 0.45 + 0.55 * (nm - 400) / 30 : nm > 660 ? Math.max(0.15, 0.45 + 0.55 * (700 - nm) / 40) : 1;
    return [r * f, g * f, b * f];
  }
  const rgbOf = ([r, g, b]) => { const ch = (v) => Math.round(255 * Math.pow(Math.min(1, Math.max(0, v)), 0.8)); return F.fact(`rgb(${ch(r)},${ch(g)},${ch(b)})`); };
  const lightColor = (nm) => rgbOf(lightRGB(nm));
  /* the book's wheel: wavelength against angle (degrees, counterclockwise from the right), clockwise from 800 nm to 400 nm */
  const WHEEL = [[400, -210], [430, -150], [490, -90], [560, -30], [580, 30], [620, 90], [800, 150]];
  const angOf = (nm) => { for (let i = 1; i < WHEEL.length; i++) if (nm <= WHEEL[i][0]) { const [l0, a0] = WHEEL[i - 1], [l1, a1] = WHEEL[i]; return a0 + ((nm - l0) / (l1 - l0)) * (a1 - a0); } return 150; };
  const lamOf = (a) => { a = ((a + 210) % 360 + 360) % 360 - 210; for (let i = 1; i < WHEEL.length; i++) if (a <= WHEEL[i][1]) { const [l0, a0] = WHEEL[i - 1], [l1, a1] = WHEEL[i]; return l0 + ((a - a0) / (a1 - a0)) * (l1 - l0); } return 800; };
  /* the band a complex absorbs: two sectors of the wheel, 60° either side of the maximum; how far round the wheel a colour lies from it */
  const BAND = 60;
  const away = (nm, l0) => { const x = Math.abs(angOf(nm) - angOf(l0)) % 360; return Math.min(x, 360 - x); };
  const stopped = (nm, l0) => away(nm, l0) < BAND - 1e-6;
  const trans = (nm, l0) => 1 - 0.96 / (1 + Math.exp((away(nm, l0) - BAND) / 5));
  function seen(l0) {
    const s = [0, 0, 0], w = [0, 0, 0];
    for (let nm = 400; nm <= 700; nm += 4) { const c = lightRGB(nm), t = trans(nm, l0); for (let i = 0; i < 3; i++) { s[i] += t * c[i]; w[i] += c[i]; } }
    return rgbOf(s.map((x, i) => x / w[i]));
  }
  const WX = 262, WY = 352, R = 190;
  const P = (a, r) => [WX + r * Math.cos((a * Math.PI) / 180), WY - r * Math.sin((a * Math.PI) / 180)];
  function arc(ctx, a0, a1, r, color, w, dash) {
    ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = w; if (dash) ctx.setLineDash(dash);
    ctx.beginPath();
    const n = Math.max(2, Math.ceil(Math.abs(a1 - a0) / 2));
    for (let i = 0; i <= n; i++) { const [x, y] = P(a0 + ((a1 - a0) * i) / n, r); if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y); }
    ctx.stroke(); ctx.restore();
  }
  /* the book's seven rays, red at the bottom: red, orange, yellow, green, light blue, blue, violet */
  const RAYS = [700, 600, 572, 530, 485, 455, 415];
  const X0 = 556, XG0 = 736, XG1 = 824, X1 = 1004, TX = 780, TR = 44, TT = 122, TB = 548, TL = 204;
  const LX = 1200, LW2 = 150, YT2 = 560, EPX = 62;
  function draw() {
    const { ctx } = begin(d.c), l0 = lam.v, ce = C('energy');
    topline(ctx, `Light around ${fmt(l0, 0)} nm is absorbed. What gets through looks like the color across the wheel.`);
    /* the wheel */
    for (let a = -210; a < 150; a += 2) {
      ctx.save(); ctx.fillStyle = lightColor(lamOf(a + 1)); ctx.beginPath(); ctx.moveTo(WX, WY);
      const [x0, y0] = P(a, R), [x1, y1] = P(a + 2.4, R);
      ctx.lineTo(x0, y0); ctx.lineTo(x1, y1); ctx.closePath(); ctx.fill(); ctx.restore();
    }
    WHEEL.slice(0, 6).forEach(([nm, a]) => { const [x, y] = P(a, R); line(ctx, WX, WY, x, y, PAL.ink, 1.5); });
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(WX, WY, R, 0, TAU); ctx.stroke(); ctx.restore();
    WHEEL.slice(1, 6).forEach(([nm, a]) => {
      const [x, y] = P(a, R + 34), cs = Math.cos((a * Math.PI) / 180);
      text(ctx, nm + ' nm', x, y, PAL.muted, { size: 19, align: cs > 0.3 ? 'left' : cs < -0.3 ? 'right' : 'center' });
    });
    { const [x, y] = P(150, R + 24); text(ctx, '800 nm', x, y - 13, PAL.muted, { size: 19, align: 'right' }); text(ctx, '400 nm', x, y + 13, PAL.muted, { size: 19, align: 'right' }); }
    /* the band absorbed, and the band straight across the wheel */
    const aA = angOf(l0);
    arc(ctx, aA - BAND, aA + BAND, R + 11, PAL.ink, 8);
    arc(ctx, aA - BAND + 180, aA + BAND + 180, R + 11, PAL.ink, 4, [9, 7]);
    const [ax, ay] = P(aA, R), [bx, by] = P(aA + 180, R);
    line(ctx, ax, ay, bx, by, PAL.ink, 2.5, [8, 6]);
    F.dot(ctx, ax, ay, PAL.ink, true, 8); F.dot(ctx, bx, by, PAL.ink, false, 8);
    F.legend(ctx, { l: 30, r: 500, t: 594, b: 634 }, [{ s: 'absorbed', color: PAL.ink, w: 8 }, { s: 'seen', color: PAL.ink, w: 4, dash: [9, 7] }], { corner: 'top', row: true, panel: false, size: 20 });
    /* the solution in its test tube, as the book draws it, and white light crossing it */
    const sol = seen(l0);
    ctx.save(); ctx.fillStyle = sol;
    ctx.beginPath(); ctx.moveTo(TX - TR + 4, TL); ctx.lineTo(TX - TR + 4, TB); ctx.arc(TX, TB, TR - 4, Math.PI, 0, true); ctx.lineTo(TX + TR - 4, TL);
    ctx.quadraticCurveTo(TX, TL + 10, TX - TR + 4, TL); ctx.fill(); ctx.restore();
    RAYS.forEach((nm, i) => {
      const y = 500 - i * 40, col = lightColor(nm), stop = stopped(nm, l0);
      arrow(ctx, X0, y, XG0 - 6, y, col, 4.5);
      if (!stop) arrow(ctx, XG1 + 6, y, X1, y, col, 4.5);
    });
    ctx.save(); ctx.strokeStyle = PAL.muted; ctx.lineWidth = 3.5; ctx.lineJoin = 'round'; ctx.beginPath();
    ctx.moveTo(TX - TR, TT); ctx.lineTo(TX - TR, TB); ctx.arc(TX, TB, TR, Math.PI, 0, true); ctx.lineTo(TX + TR, TT); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(TX, TT, TR + 7, 11, 0, 0, TAU); ctx.fillStyle = PAL.panel; ctx.fill(); ctx.stroke();
    ctx.globalAlpha = 0.4; ctx.lineWidth = 5; ctx.strokeStyle = PAL.panel; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(TX - TR + 13, TL + 22); ctx.lineTo(TX - TR + 13, TB - 4); ctx.stroke();
    ctx.restore();
    text(ctx, 'white light', (X0 + XG0) / 2, 226, PAL.ink, { size: 21, align: 'center' });
    text(ctx, 'transmitted light', (XG1 + X1) / 2 + 8, 226, PAL.ink, { size: 21, align: 'center' });
    /* the gap the absorbed photon bridges: the shorter the wavelength, the wider */
    const E = (6.63e-34 * 3.0e8) / (l0 * 1e-9) / 1e-19, yE2 = YT2 - E * EPX, xl = LX - LW2 / 2, xr = LX + LW2 / 2;
    line(ctx, xl, YT2, xr, YT2, PAL.ink, 4); line(ctx, xl, yE2, xr, yE2, PAL.ink, 4);
    text(ctx, 't_{2g}', xl - 14, YT2, PAL.ink, { size: 26, italic: true, align: 'right' });
    text(ctx, 'e_{g}', xl - 14, yE2, PAL.ink, { size: 26, italic: true, align: 'right' });
    arrow(ctx, LX - 30, YT2 - 6, LX - 30, yE2 + 6, lightColor(l0), 6);
    arrow(ctx, xr + 34, (YT2 + yE2) / 2, xr + 34, yE2, ce, 4); arrow(ctx, xr + 34, (YT2 + yE2) / 2, xr + 34, YT2, ce, 4);
    text(ctx, '$\\kdoct$', xr + 48, (YT2 + yE2) / 2, ce, { size: 28, tex: true });
    text(ctx, 'the absorbed photon', LX, YT2 + 34, PAL.muted, { size: 19, align: 'center' });
    text(ctx, 'lifts one electron', LX, YT2 + 58, PAL.muted, { size: 19, align: 'center' });
    readout(d.readout, `\\kE = h\\knu = \\frac{h\\kc}{\\klam} = \\frac{(6.63\\times10^{-34}\\ \\text{J·s})(3.00\\times10^{8}\\ \\text{m/s})}{${fmt(l0, 0)}\\times10^{-9}\\ \\text{m}} = ${fmt(E, 2)}\\times10^{-19}\\ \\text{J} = \\kdoct`);
  }
  still(d, draw);
  hover(d.stage, () => [
    { x: LX - 30, y: YT2 - ((6.63e-34 * 3.0e8) / (lam.v * 1e-9) / 1e-19) * EPX / 2, r: 26, name: 'the absorbed photon, in its own color, lifting an electron across the gap' },
    { x: TX, y: (TL + TB) / 2, r: 60, name: 'the solution, in the color of white light less the absorbed band' },
  ]);
})();
};
