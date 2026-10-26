/* Figures for section 19.3 Spectroscopic and Magnetic Properties of Coordination Compounds. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['19.3'] = function (root, F) {
const { el, fmt, tex, C, PAL, alpha, register, begin, line, arrow, text, topline, cycle } = F;
const sim = (id, H) => F.sim(root, id, H);
const still = (d, draw) => register(d.fig, { update: () => {}, draw });
function readout(host, main, small) { tex(host, main); if (small) host.appendChild(el('small', null, small)); }
const TAU = 2 * Math.PI;
const SUP = ['⁰', '¹', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹', '¹⁰'];
const WORDS = ['no', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
const cap = (s) => s[0].toUpperCase() + s.slice(1);

/* =====================================================================
   FIGURE 19.33 + 19.34 + 19.36: one d orbital among the ligands of an
   octahedral, tetrahedral or square planar complex, and the five levels
   beneath. Mathematical 3D: the surface r = |angular part| in two ink
   tones for the two phases. Still: a change of geometry slides the
   ligands and the levels, a change of orbital bends the lobes.
===================================================================== */
(function () {
  const d = sim('sim-d-orbitals');
  const V = F.view3d(d.stage, { spin: 'idle', h: 440, dist: 14, tilt: 0.38,
    views: [{ label: 'perspective', yaw: 0.62, pitch: 0.38 }, { label: 'down z', yaw: 0, pitch: Math.PI / 2 }, { label: 'along x', yaw: 0, pitch: 0 }] });
  V.setView(0.62, 0.38);
  const g = V.part(0), c2 = F.makeCanvas(d.stage, 360);
  g.position.y = -1.15;
  const ORBS = [
    { v: 'x2y2', label: 'd<sub>x²−y²</sub>', tex: 'd_{x^2-y^2}', name: 'd_{x²−y²}', f: (x, y) => x * x - y * y },
    { v: 'z2', label: 'd<sub>z²</sub>', tex: 'd_{z^2}', name: 'd_{z²}', f: (x, y, z) => 3 * z * z - 1 },
    { v: 'yz', label: 'd<sub>yz</sub>', tex: 'd_{yz}', name: 'd_{yz}', f: (x, y, z) => y * z },
    { v: 'xz', label: 'd<sub>xz</sub>', tex: 'd_{xz}', name: 'd_{xz}', f: (x, y, z) => x * z },
    { v: 'xy', label: 'd<sub>xy</sub>', tex: 'd_{xy}', name: 'd_{xy}', f: (x, y) => x * y },
  ];
  const byV = {}; ORBS.forEach((o) => { byV[o.v] = o; });
  const EG = { x2y2: 1, z2: 1 };
  const geo = F.select(d.controls, { label: '\\text{geometry}', aria: 'the geometry of the complex', value: 'oct',
    options: [{ value: 'oct', label: 'octahedral' }, { value: 'tet', label: 'tetrahedral' }, { value: 'sqp', label: 'square planar' }] });
  const orb = F.choice(d.controls, { label: '\\text{orbital}', aria: 'the d orbital drawn', value: 'x2y2', ms: 0,
    options: ORBS.map((o) => ({ value: o.v, label: o.label })), onInput: () => go() });
  let from = orb.value, to = from;
  const tw = F.tween(d, 1);
  function go() { if (orb.value === to) return; from = to; to = orb.value; tw.set(0); tw.to(1, 1000); }

  /* the ligand sites, in the chemist's axes; a site a geometry leaves empty is pushed out along its axis */
  const c = 1 / Math.sqrt(3), RL = 2.05, OUT = 3.2;
  const AX6 = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]];
  const SITES = {
    oct: { p: AX6, on: [1, 1, 1, 1, 1, 1] },
    tet: { p: [[c, c, c], [-c, -c, c], [-c, c, -c], [c, -c, -c], [0, 0, 1], [0, 0, -1]], on: [1, 1, 1, 1, 0, 0] },
    sqp: { p: AX6, on: [1, 1, 1, 1, 0, 0] },
  };
  const S = (p) => [p[1], p[2], p[0]];            /* the chemist's (x, y, z) to the scene's (right, up, out) */
  const unit = (a) => { const l = Math.hypot(a[0], a[1], a[2]) || 1; return [a[0] / l, a[1] / l, a[2] / l]; };
  function slerp(a, b, t) {
    const w = Math.acos(Math.max(-1, Math.min(1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2])));
    if (w < 1e-6) return a;
    const s = Math.sin(w), p = Math.sin((1 - t) * w) / s, q = Math.sin(t * w) / s;
    return unit([a[0] * p + b[0] * q, a[1] * p + b[1] * q, a[2] * p + b[2] * q]);
  }

  const T3 = window.THREE, NT = 60, NP = 120, RMAX = 1.55;
  const dirs = [];
  for (let i = 0; i <= NT; i++) for (let j = 0; j <= NP; j++) { const th = (Math.PI * i) / NT, ph = (TAU * j) / NP; dirs.push([Math.sin(th) * Math.cos(ph), Math.sin(th) * Math.sin(ph), Math.cos(th)]); }
  const norm = {};
  const valuesOf = (v) => { if (norm[v]) return norm[v]; const f = byV[v].f, a = dirs.map((q) => f(q[0], q[1], q[2])), m = Math.max(...a.map(Math.abs)); return (norm[v] = a.map((x) => x / m)); };
  let mesh = null, pos = null, col = null, metal = null, cube = [];
  const ligs = [], sticks = [];
  let tagL = null;
  if (T3 && V.scene) {
    const gm = new T3.BufferGeometry(), idx = [];
    for (let i = 0; i < NT; i++) for (let j = 0; j < NP; j++) { const a = i * (NP + 1) + j, b = a + NP + 1; idx.push(a, b, a + 1, b, b + 1, a + 1); }
    pos = new T3.Float32BufferAttribute(new Float32Array(dirs.length * 3), 3); col = new T3.Float32BufferAttribute(new Float32Array(dirs.length * 3), 3);
    gm.setAttribute('position', pos); gm.setAttribute('color', col); gm.setIndex(idx);
    mesh = new T3.Mesh(gm, new T3.MeshPhongMaterial({ vertexColors: true, side: T3.DoubleSide, shininess: 30 }));
    g.add(mesh); V.pickable(mesh, 'a lobe of the d orbital, shaded by its phase');
    const L = 2.3;
    [[[L, 0, 0], 'x'], [[0, L, 0], 'y'], [[0, 0, L], 'z']].forEach(([p, name]) => {
      F.mesh.polyline(g, [S(p.map((q) => -q)), S(p)], PAL.muted);
      V.label('<em>' + name + '</em>', S(p.map((q) => q * 1.08)), g, 0);
    });
    metal = F.mesh.sphere(g, [0, 0, 0], 0.14, F.el('M'));
    V.pickable(metal, 'the central metal ion, M');
    AX6.forEach((p) => {
      const s = F.mesh.stick(g, [0, 0, 0], S(p.map((q) => q * RL)), 0.022, PAL.muted, { transparent: true });
      const m = F.mesh.sphere(g, S(p.map((q) => q * RL)), 0.17, F.el('L'), { transparent: true });
      V.pickable(m, 'a ligand, L, treated as a point charge');
      ligs.push(m); sticks.push(s);
    });
    tagL = V.label('L', S([0, -RL, 0]), g, -30);
    /* the cube whose alternate corners hold the tetrahedral ligands (the book's 19.36) */
    const h = c * RL, corners = [];
    for (let i = 0; i < 8; i++) corners.push([(i & 1 ? 1 : -1) * h, (i & 2 ? 1 : -1) * h, (i & 4 ? 1 : -1) * h]);
    for (let i = 0; i < 8; i++) for (const b of [1, 2, 4]) if (!(i & b)) {
      const ln = F.mesh.polyline(g, [S(corners[i]), S(corners[i | b])], PAL.muted);
      ln.material.transparent = true; cube.push(ln);
    }
  }

  /* the five levels: x centre on the canvas and energy in units of Δoct about the free ion's average */
  const DO = 160, YB = 228, BW = 100;
  const LV = {
    oct: { xy: [580, -0.4], xz: [700, -0.4], yz: [820, -0.4], z2: [640, 0.6], x2y2: [760, 0.6] },
    tet: { z2: [640, -0.6 * 4 / 9], x2y2: [760, -0.6 * 4 / 9], xy: [580, 0.4 * 4 / 9], xz: [700, 0.4 * 4 / 9], yz: [820, 0.4 * 4 / 9] },
    sqp: { xz: [640, -0.55], yz: [760, -0.55], z2: [700, -0.15], xy: [700, 0.3], x2y2: [700, 0.95] },
  };
  const yOf = (e) => YB - e * DO;
  const SETS = {
    oct: { lo: ['t_{2g}', -0.4, 530], hi: ['e_{g}', 0.6, 590], gap: '$\\kdoct$' },
    tet: { lo: ['e', -0.6 * 4 / 9, 590], hi: ['t_{2}', 0.4 * 4 / 9, 530], gap: '$\\kdtet$' },
    sqp: null,
  };
  const HEAD = {
    oct: (o) => (EG[o.v]
      ? (o.v === 'z2' ? 'Six ligands on the axes: $d_{z^2}$ points at the two on the $z$-axis, and its ring at the other four.' : `Six ligands on the axes: the lobes of $${o.tex}$ point straight at four of them.`)
      : `Six ligands on the axes: the lobes of $${o.tex}$ point between them.`),
    tet: (o) => (EG[o.v]
      ? `Four ligands between the axes: the lobes of $${o.tex}$ lie along the axes, farther from them than the $t_2$ lobes.`
      : `Four ligands between the axes: the lobes of $${o.tex}$ point nearer to them than the $e$ lobes.`),
    sqp: (o) => ({
      x2y2: 'Four ligands on the $x$- and $y$-axes: the lobes of $d_{x^2-y^2}$ point straight at all four.',
      xy: 'Four ligands on the $x$- and $y$-axes: the lobes of $d_{xy}$ lie in their plane, between them.',
      z2: 'Four ligands on the $x$- and $y$-axes: $d_{z^2}$ points along $z$, where two were removed, with only its ring in their plane.',
    }[o.v] ?? `Four ligands on the $x$- and $y$-axes: the lobes of $${o.tex}$ point out of their plane.`),
  };
  const RO = {
    oct: 'E_{e_{g}} - E_{t_{2g}} = \\kdoct',
    tet: 'E_{t_{2}} - E_{e} = \\kdtet = \\tfrac{4}{9}\\kdoct',
    sqp: 'E:\\quad d_{xz} = d_{yz} < d_{z^2} < d_{xy} < d_{x^2-y^2}',
  };

  function scene() {
    if (!mesh) return;
    const k = tw.v, A = valuesOf(from), B = valuesOf(to);
    const ca = new T3.Color(F.mixColor(PAL.ink, PAL.panel, 0.18)), cb = new T3.Color(F.mixColor(PAL.ink, PAL.panel, 0.62));
    dirs.forEach((q, i) => {
      const s = (1 - k) * A[i] + k * B[i], r = Math.abs(s) * RMAX, cc = s >= 0 ? ca : cb;
      pos.setXYZ(i, q[1] * r, q[2] * r, q[0] * r); col.setXYZ(i, cc.r, cc.g, cc.b);
    });
    pos.needsUpdate = true; col.needsUpdate = true; mesh.geometry.computeVertexNormals(); mesh.geometry.computeBoundingSphere();
    metal.material.color.set(F.el('M'));
    const a = SITES[geo.from ?? geo.value], b = SITES[geo.value], kg = geo.k;
    ligs.forEach((m, n) => {
      const on = a.on[n] + (b.on[n] - a.on[n]) * kg;
      const dir = a.on[n] && b.on[n] ? slerp(a.p[n], b.p[n], kg) : b.on[n] ? b.p[n] : a.p[n];
      const R = RL + (OUT - RL) * (1 - on), P = S(dir.map((q) => q * R));
      m.position.set(P[0], P[1], P[2]); m.material.color.set(F.el('L')); m.material.opacity = on; m.visible = on > 0.02;
      F.mesh.setStick(sticks[n], [0, 0, 0], P); sticks[n].material.color.set(PAL.muted); sticks[n].material.opacity = on; sticks[n].visible = on > 0.02;
      if (n === 3 && tagL) V.move(tagL, P);
    });
    const ct = geo.a('tet');
    cube.forEach((ln) => { ln.material.color.set(PAL.muted); ln.material.opacity = ct; ln.visible = ct > 0.02; });
    V.invalidate();
  }

  function diagram() {
    const { ctx } = begin(c2), ce = C('energy');
    arrow(ctx, 330, 340, 330, 24, ce, 3);
    text(ctx, 'E', 300, 180, ce, { size: 24, weight: 600, italic: true, align: 'center' });
    ORBS.forEach((o) => {
      const [x, e] = geo.mix((v) => LV[v][o.v]), y = yOf(e), on = o.v === orb.value;
      line(ctx, x - BW / 2, y, x + BW / 2, y, on ? PAL.ink : PAL.muted, on ? 6 : 4);
      text(ctx, o.name, x, y + 23, on ? PAL.ink : PAL.muted, { size: 22, italic: true, align: 'center', weight: on ? 600 : 400 });
    });
    ['oct', 'tet'].forEach((v) => F.faded(ctx, geo.a(v), [0, 0], () => {
      const s = SETS[v], ylo = yOf(s.lo[1]), yhi = yOf(s.hi[1]), xa = 990;
      text(ctx, s.lo[0], s.lo[2] - 16, ylo, PAL.ink, { size: 26, italic: true, align: 'right' });
      text(ctx, s.hi[0], s.hi[2] - 16, yhi, PAL.ink, { size: 26, italic: true, align: 'right' });
      line(ctx, 880, ylo, xa + 14, ylo, alpha(PAL.ink, 0.35), 2, [4, 8]);
      line(ctx, 880, yhi, xa + 14, yhi, alpha(PAL.ink, 0.35), 2, [4, 8]);
      arrow(ctx, xa, (ylo + yhi) / 2, xa, Math.min(ylo, yhi), ce, 4);
      arrow(ctx, xa, (ylo + yhi) / 2, xa, Math.max(ylo, yhi), ce, 4);
      text(ctx, s.gap, xa + 22, (ylo + yhi) / 2, ce, { size: 28, tex: true });
    }));
  }

  function draw() {
    scene();
    diagram();
    V.headline(HEAD[geo.value](byV[orb.value]));
    readout(d.readout, RO[geo.value]);
  }
  still(d, draw);
})();

/* =====================================================================
   FIGURE 19.35: high and low spin. The free ion's five degenerate boxes,
   and the octahedral complex's t2g and eg rows Δoct apart about the
   same average, with the pairing energy P drawn beside the gap. Still:
   the gap answers the slider; crossing Δoct = P moves the electrons
   that change sets in one eased beat, their spins turning over.
===================================================================== */
(function () {
  const H = 480;
  const d = sim('sim-high-low-spin', H);
  const nPick = F.select(d.controls, { label: '\\text{d electrons}', aria: 'the number of d electrons', value: '6',
    options: Array.from({ length: 10 }, (_, i) => ({ value: String(i + 1), label: 'd' + SUP[i + 1] })), ms: 0, onInput: () => settle(true) });
  const ratio = F.ctl(d.controls, { label: '\\kdoct/\\kPpair', cls: '', min: 0.5, max: 2, step: 0.01, value: 0.6, unit: '', dec: 2,
    aria: 'the crystal field splitting as a multiple of the pairing energy', specials: [{ at: 1, label: 'equal' }], onInput: () => settle(false) });
  const PX = 130, YB = 290, BW = 64, BH = 52, CXF = 330, CX = 760, XA = 1010, XP = 1160;
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
    return [boxX(e[0]) + (two ? (e[1] === 'u' ? -11 : 11) : 0), e[1] === 'u' ? 1 : -1];
  }
  function half(ctx, x, yc, s, color, a = 1) {
    if (Math.abs(s) < 0.04) return;
    F.faded(ctx, a, [0, 0], () => {
      const tip = yc - 17 * s, tail = yc + 17 * s;
      line(ctx, x, tail, x, tip, color, 3);
      line(ctx, x, tip, x - 8 * s, tip + 11 * s, color, 3);
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
    let head;
    if (!q) head = `${cap(WORDS[n])} $d$ electron${n > 1 ? 's' : ''}, one arrangement for any $\\kdoct$: ${un ? WORDS[un] : 'no'} unpaired electron${un === 1 ? '' : 's'}.`;
    else if (sp === 'eq') head = `${cap(WORDS[n])} $d$ electrons, $\\kdoct = \\kPpair$: the high- and low-spin arrangements have the same energy.`;
    else head = `${cap(WORDS[n])} $d$ electrons, $\\kdoct ${sp === 'hs' ? '<' : '>'} \\kPpair$: ${sp === 'hs' ? 'high' : 'low'} spin, ${un ? WORDS[un] : 'no'} unpaired electron${un === 1 ? '' : 's'}.`;
    topline(ctx, head);
    arrow(ctx, 90, 440, 90, 110, ce, 3);
    text(ctx, 'E', 62, 275, ce, { size: 24, weight: 600, italic: true, align: 'center' });
    /* the free ion: five degenerate boxes, filled by Hund's rule */
    boxes(ctx, CXF - 2.5 * BW, YB, 5);
    hs.forEach((e) => { const two = hs.filter((x) => x[0] === e[0]).length === 2; half(ctx, CXF + (e[0] - 2) * BW + (two ? (e[1] === 'u' ? -11 : 11) : 0), YB, e[1] === 'u' ? 1 : -1, PAL.ink); });
    /* the complex */
    boxes(ctx, CX - 1.5 * BW, yT, 3);
    boxes(ctx, CX - BW, yE, 2);
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
    /* the set names, the levels, the gap and the pairing energy beside it */
    text(ctx, 't_{2g}', CX - 1.5 * BW - 16, yT, PAL.ink, { size: 26, italic: true, align: 'right' });
    text(ctx, 'e_{g}', CX - BW - 16, yE, PAL.ink, { size: 26, italic: true, align: 'right' });
    const bT = yT + BH / 2, bE = yE + BH / 2;
    line(ctx, CX + 1.5 * BW + 8, bT, XA + 14, bT, alpha(PAL.ink, 0.35), 2, [4, 8]);
    line(ctx, CX + BW + 8, bE, XA + 14, bE, alpha(PAL.ink, 0.35), 2, [4, 8]);
    arrow(ctx, XA, (bT + bE) / 2, XA, bE, ce, 4);
    arrow(ctx, XA, (bT + bE) / 2, XA, bT, ce, 4);
    text(ctx, '$\\kdoct$', XA + 20, (bT + bE) / 2, ce, { size: 28, tex: true });
    line(ctx, XA + 14, bT, XP, bT, alpha(PAL.ink, 0.35), 2, [4, 8]);
    F.vbracket(ctx, XP, bT - PX, bT, ce);
    text(ctx, '$\\kPpair$', XP + 18, bT - PX / 2, ce, { size: 28, tex: true });
    text(ctx, 'free ion, no ligands', CXF, 462, PAL.ink, { size: 22, align: 'center' });
    text(ctx, 'octahedral complex', CX, 462, PAL.ink, { size: 22, align: 'center' });
    const ct = (conf) => `t_{2g}^{${count(conf, true)}}\\,e_{g}^{${count(conf, false)}}`;
    if (!q) readout(d.readout, `\\kdoct = ${fmt(r, 2)}\\,\\kPpair:\\quad ${ct(hs)}`);
    else {
      const rel = sp === 'eq' ? '=' : sp === 'hs' ? '<' : '>', Q = q > 1 ? String(q) : '';
      const end = sp === 'eq' ? `${ct(hs)}\\ \\text{or}\\ ${ct(ls)}` : ct(conf);
      readout(d.readout, `${Q}\\kdoct = ${fmt(q * r, 2)}\\,\\kPpair ${rel} ${Q}\\kPpair\\;\\Rightarrow\\; ${end}`);
    }
  }
  still(d, draw);
})();

/* =====================================================================
   FIGURE 19.37: the colour wheel and a solution in white light. The
   absorbed wavelength is a slider; its band is marked on the wheel with
   its complement across it, and the solution takes the colour of white
   light with that band removed. Moving: the light's front crosses the
   bench in 4 s, the absorbed colours ending in the solution.
===================================================================== */
(function () {
  const H = 470, T = 4;
  const d = sim('sim-color-wheel', H);
  const lam = F.ctl(d.controls, { label: '\\klam', cls: 'wavelength', min: 400, max: 800, step: 1, value: 499, unit: 'nm', dec: 0, aria: 'the wavelength absorbed most strongly' });
  const cy = cycle(() => T, 1.2);
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
  /* the band a complex absorbs: half its depth 46 nm either side of the maximum */
  const SIG = 55, HALF = 46;
  const trans = (nm, l0) => 1 - 0.95 * Math.exp(-(((nm - l0) / SIG) ** 2));
  function seen(l0) {
    const s = [0, 0, 0], w = [0, 0, 0];
    for (let nm = 400; nm <= 700; nm += 4) { const c = lightRGB(nm), t = trans(nm, l0); for (let i = 0; i < 3; i++) { s[i] += t * c[i]; w[i] += c[i]; } }
    return rgbOf(s.map((x, i) => x / w[i]));
  }
  /* the book's wheel: wavelength against angle (degrees, counterclockwise from the right), clockwise from 800 nm to 400 nm */
  const WHEEL = [[400, -210], [430, -150], [490, -90], [560, -30], [580, 30], [620, 90], [800, 150]];
  const angOf = (nm) => { for (let i = 1; i < WHEEL.length; i++) if (nm <= WHEEL[i][0]) { const [l0, a0] = WHEEL[i - 1], [l1, a1] = WHEEL[i]; return a0 + ((nm - l0) / (l1 - l0)) * (a1 - a0); } return 150; };
  const lamOf = (a) => { a = ((a + 210) % 360 + 360) % 360 - 210; for (let i = 1; i < WHEEL.length; i++) if (a <= WHEEL[i][1]) { const [l0, a0] = WHEEL[i - 1], [l1, a1] = WHEEL[i]; return l0 + ((a - a0) / (a1 - a0)) * (l1 - l0); } return 800; };
  const WX = 300, WY = 262, R = 140;
  const P = (a, r) => [WX + r * Math.cos((a * Math.PI) / 180), WY - r * Math.sin((a * Math.PI) / 180)];
  function arc(ctx, a0, a1, r, color, w, dash) {
    ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = w; if (dash) ctx.setLineDash(dash);
    ctx.beginPath();
    const n = Math.max(2, Math.ceil(Math.abs(a1 - a0) / 2));
    for (let i = 0; i <= n; i++) { const [x, y] = P(a0 + ((a1 - a0) * i) / n, r); if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y); }
    ctx.stroke(); ctx.restore();
  }
  const RAYS = [700, 610, 580, 530, 470, 445, 410];
  const X0 = 600, XG0 = 892, XG1 = 968, X1 = 1250, TX = 930;
  function draw() {
    const { ctx } = begin(d.c), l0 = lam.v;
    topline(ctx, `The solution absorbs light around ${fmt(l0, 0)} nm; the eye sees the color across the wheel.`);
    /* the wheel */
    for (let a = -210; a < 150; a += 2) {
      ctx.save(); ctx.fillStyle = lightColor(lamOf(a + 1)); ctx.beginPath(); ctx.moveTo(WX, WY);
      const [x0, y0] = P(a, R), [x1, y1] = P(a + 2.4, R);
      ctx.lineTo(x0, y0); ctx.lineTo(x1, y1); ctx.closePath(); ctx.fill(); ctx.restore();
    }
    WHEEL.slice(0, 6).forEach(([nm, a]) => { const [x, y] = P(a, R); line(ctx, WX, WY, x, y, PAL.ink, 1.5); });
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(WX, WY, R, 0, TAU); ctx.stroke(); ctx.restore();
    WHEEL.slice(1, 6).forEach(([nm, a]) => {
      const [x, y] = P(a, R + 30), cs = Math.cos((a * Math.PI) / 180);
      text(ctx, nm + ' nm', x, y, PAL.muted, { size: 17, align: cs > 0.3 ? 'left' : cs < -0.3 ? 'right' : 'center' });
    });
    { const [x, y] = P(150, R + 22); text(ctx, '800 nm', x, y - 12, PAL.muted, { size: 17, align: 'right' }); text(ctx, '400 nm', x, y + 12, PAL.muted, { size: 17, align: 'right' }); }
    /* the band absorbed, and its complement across the wheel */
    const aA = angOf(l0), aL = angOf(Math.max(400, l0 - HALF)), aH = angOf(Math.min(800, l0 + HALF));
    arc(ctx, aL, aH, R + 9, PAL.ink, 7);
    arc(ctx, aL + 180, aH + 180, R + 9, PAL.ink, 4, [8, 6]);
    const [ax, ay] = P(aA, R), [bx, by] = P(aA + 180, R);
    line(ctx, ax, ay, bx, by, PAL.ink, 2.5, [8, 6]);
    F.dot(ctx, ax, ay, PAL.ink, true, 7); F.dot(ctx, bx, by, PAL.ink, false, 7);
    line(ctx, 150, 452, 186, 452, PAL.ink, 7); text(ctx, 'absorbed', 196, 452, PAL.ink, { size: 19 });
    line(ctx, 300, 452, 336, 452, PAL.ink, 4, [8, 6]); text(ctx, 'seen', 346, 452, PAL.ink, { size: 19 });
    /* the solution in its tube, and white light crossing it */
    const front = X0 + (X1 - X0) * (cy.now() / T);
    ctx.save(); ctx.fillStyle = seen(l0); ctx.fillRect(TX - 30, 190, 60, 220); ctx.restore();
    ctx.save(); ctx.strokeStyle = PAL.muted; ctx.lineWidth = 3; ctx.beginPath();
    ctx.moveTo(TX - 34, 120); ctx.lineTo(TX - 34, 410); ctx.arc(TX, 410, 34, Math.PI, 0, true); ctx.lineTo(TX + 34, 120); ctx.stroke(); ctx.restore();
    RAYS.forEach((nm, i) => {
      const y = 382 - i * 30, col = lightColor(nm), t = trans(nm, l0);
      if (front > X0 + 30) arrow(ctx, X0, y, Math.min(front, XG0), y, col, 4);
      if (front > XG0) F.faded(ctx, 0.5 + 0.5 * t, [0, 0], () => line(ctx, XG0, y, Math.min(front, XG1), y, col, 3));
      if (front > XG1 + 30 && t > 0.15) F.faded(ctx, t, [0, 0], () => arrow(ctx, XG1, y, Math.min(front, X1), y, col, 4));
    });
    text(ctx, 'white light', (X0 + XG0) / 2, 150, PAL.ink, { size: 20, align: 'center' });
    text(ctx, 'transmitted light', (XG1 + X1) / 2, 150, PAL.ink, { size: 20, align: 'center' });
    const E = (6.63e-34 * 3.0e8) / (l0 * 1e-9) / 1e-19;
    readout(d.readout, `\\kE = h\\knu = \\frac{h\\kc}{\\klam} = \\frac{(6.63\\times10^{-34}\\ \\text{J·s})(3.00\\times10^{8}\\ \\text{m/s})}{${fmt(l0, 0)}\\times10^{-9}\\ \\text{m}} = ${fmt(E, 2)}\\times10^{-19}\\ \\text{J} = \\kdoct`);
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();
};
