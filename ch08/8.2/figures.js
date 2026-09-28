/* Figures for section 8.2 Hybrid Atomic Orbitals. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['8.2'] = function (root, F) {
const { el, tex, PAL, alpha, register, begin, line, arrow, text, topline, C } = F;
const sim = (id, H) => F.sim(root, id, H);
/* a still figure answers its choices, or nothing at all, and has no clock */
const still = (d, draw) => register(d.fig, { update: () => {}, draw });
function readout(host, main, small) { tex(host, main); if (small) host.appendChild(el('small', null, small)); }
const RAD = Math.PI / 180, TAU = 2 * Math.PI;

/* ---------- vectors ---------- */
const V = {
  add: (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]],
  mul: (a, k) => [a[0] * k, a[1] * k, a[2] * k],
  dot: (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2],
  unit: (a) => { const l = Math.hypot(a[0], a[1], a[2]) || 1; return [a[0] / l, a[1] / l, a[2] / l]; },
};
function slerp(a, b, t) {
  const w = Math.acos(Math.max(-1, Math.min(1, V.dot(a, b)))); if (w < 1e-6) return a;
  const s = Math.sin(w); return V.add(V.mul(a, Math.sin((1 - t) * w) / s), V.mul(b, Math.sin(t * w) / s));
}
const rotY = (v, a) => { const c = Math.cos(a * RAD), s = Math.sin(a * RAD); return [v[0] * c + v[2] * s, v[1], -v[0] * s + v[2] * c]; };
const rotX = (v, a) => { const c = Math.cos(a * RAD), s = Math.sin(a * RAD); return [v[0], v[1] * c - v[2] * s, v[1] * s + v[2] * c]; };

/* the ideal directions of the five sets of hybrid orbitals, as unit vectors */
const T3 = Math.sqrt(8 / 9), T1 = -1 / 3;
const SITES = {
  2: [[1, 0, 0], [-1, 0, 0]],
  3: [[0, 1, 0], [Math.cos(210 * RAD), Math.sin(210 * RAD), 0], [Math.cos(330 * RAD), Math.sin(330 * RAD), 0]],
  4: [[0, 1, 0], [T3, T1, 0], rotY([T3, T1, 0], 120), rotY([T3, T1, 0], 240)],
  5: [[0, 1, 0], [0, -1, 0], [1, 0, 0], rotY([1, 0, 0], 120), rotY([1, 0, 0], 240)],
  6: [[0, 1, 0], [0, -1, 0], [1, 0, 0], [-1, 0, 0], [0, 0, 1], [0, 0, -1]],
};
const ARRANGE = { 2: 'linear', 3: 'trigonal planar', 4: 'tetrahedral', 5: 'trigonal bipyramidal', 6: 'octahedral' };
const HYB = { 2: 'sp', 3: 'sp<sup>2</sup>', 4: 'sp<sup>3</sup>', 5: 'sp<sup>3</sup>d', 6: 'sp<sup>3</sup>d<sup>2</sup>' };
const HYB_NAME = { 2: 'sp', 3: 'sp²', 4: 'sp³', 5: 'sp³d', 6: 'sp³d²' };
const HYB_TEX = { 2: 'sp', 3: 'sp^2', 4: 'sp^3', 5: 'sp^3d', 6: 'sp^3d^2' };
const ANGLES = { 2: '180°', 3: '120°', 4: '109.5°', 5: '90° and 120°', 6: '90°' };
/* the arcs each set marks: two site indices and the angle between them */
const ARCS = { 2: [[0, 1, '180°']], 3: [[1, 2, '120°']], 4: [[1, 2, '109.5°']], 5: [[0, 2, '90°'], [2, 3, '120°']], 6: [[0, 2, '90°']] };
const WORDS = { 2: 'Two', 3: 'Three', 4: 'Four', 5: 'Five', 6: 'Six' };

/* ---------- three dimensions ----------
   Orbitals are mathematical 3D (root rule 28.3): lobes in the categorical palette,
   the book's s blue, p red and hybrid yellow as F.cat(0), F.cat(1) and F.cat(2);
   atoms in the element palette; nuclei, axes and arcs in ink. Every lobe names
   itself under the pointer. */
const { sphere, stick, lobe: lobe3, arc: arc3d, polyline } = F.mesh;
const S_COL = () => F.cat(0), P_COL = () => F.cat(1), H_COL = () => F.cat(2);
const fade = (m, a) => { m.material.transparent = true; m.material.opacity *= a; m.visible = a > 0.01; return m; };
function sOrb(g, v, c, r, col, a, name) {
  const m = sphere(g, c, r, col, { transparent: true, opacity: 0.42 }); fade(m, a); if (a > 0.3) v.pickable(m, name); return m;
}
function pOrb(g, v, c, dir, len, col, a, name) {
  [dir, V.mul(dir, -1)].forEach((u) => { const m = fade(lobe3(g, c, u, len, col), a); if (a > 0.3) v.pickable(m, name); });
}
/* a hybrid orbital: one large lobe along dir and, unless drawn thin, a small one behind it */
function hOrb(g, v, c, dir, len, col, a, name, minor = 1, thin = 0) {
  const m = fade(lobe3(g, c, dir, len * (1 + 0.3 * thin), col), a);
  m.scale.x *= 1 - 0.5 * thin; m.scale.z *= 1 - 0.5 * thin;
  if (a > 0.3) v.pickable(m, name);
  if (minor * a > 0.01) { const n = fade(lobe3(g, c, V.mul(dir, -1), len * 0.34, col), a * minor); if (a * minor > 0.3) v.pickable(n, name); }
  return m;
}
function axes3(g, v, L = 2.3) {
  const col = alpha(PAL.ink, 0.45);
  [[1, 0, 0, 'x'], [0, 1, 0, 'y'], [0, 0, 1, 'z']].forEach(([x, y, z, n]) => {
    polyline(g, [[-x * L, -y * L, -z * L], [x * L, y * L, z * L]], col);
    v.label(`<em>${n}</em>`, [x * (L + 0.18), y * (L + 0.18), z * (L + 0.18)], g, 0);
  });
}
const nucleus = (g, r = 0.07) => sphere(g, [0, 0, 0], r, PAL.ink);
const NAMES = { H: 'hydrogen (H)', B: 'boron (B)', C: 'carbon (C)', O: 'oxygen (O)', P: 'phosphorus (P)', Cl: 'chlorine (Cl)', S: 'sulfur (S)', F: 'fluorine (F)' };
function atom3(g, v, p, sym, r, a = 1) { const m = fade(sphere(g, p, r, F.el(sym)), a); if (a > 0.3) v.pickable(m, NAMES[sym]); return m; }
function bond3(g, p, q, a = 1, r = 0.055) { return fade(stick(g, p, q, r, PAL.ink), a); }
const FREE_PITCH = [-Math.PI / 2, Math.PI / 2];

/* =====================================================================
   FIGURE 8.6 + 8.7: water with two perpendicular 2p orbitals, then with four
   sp3 hybrids. Still: a choice between two models; the lobes bend and turn
   from one to the other and the hydrogen atoms swing with them.
===================================================================== */
(function () {
  const d = sim('sim-water');
  const v = F.view3d(d.stage, { h: 440, dist: 8, spin: 'idle', pitch: FREE_PITCH, views: [{ label: 'face on', yaw: 0, pitch: 0 }, { label: 'from the side', yaw: -0.9, pitch: 0.5 }] });
  const g = v.part(0);
  const model = F.choice(d.controls, { label: 'model', aria: 'orbitals on oxygen', options: [{ value: 'p', label: '2<em>p</em> orbitals' }, { value: 'sp3', label: '<em>sp</em><sup>3</sup> hybrids' }], value: 'p' });
  const u = V.unit([1, 1, 0]), w = V.unit([1, -1, 0]), z = [0, 0, 1];
  const half = (a) => [V.add(V.mul(u, Math.cos(a * RAD)), V.mul(w, Math.sin(a * RAD))), V.add(V.mul(u, Math.cos(a * RAD)), V.mul(w, -Math.sin(a * RAD)))];
  const [H1p, H2p] = half(45), [H1h, H2h] = half(54.75);
  const back = [[-1, 0, 0], [0, -1, 0]];
  const lone = [V.add(V.mul(u, -Math.cos(54.75 * RAD)), V.mul(z, Math.sin(54.75 * RAD))), V.add(V.mul(u, -Math.cos(54.75 * RAD)), V.mul(z, -Math.sin(54.75 * RAD)))];
  function draw() {
    const k = model.mix((m) => (m === 'sp3' ? 1 : 0)), sp3 = model.value === 'sp3';
    v.clear();
    const col = F.mixColor(P_COL(), H_COL(), k), len = 1.05 + 0.2 * k;
    const bonds = [slerp(H1p, H1h, k), slerp(H2p, H2h, k)], lones = [slerp(back[0], lone[0], k), slerp(back[1], lone[1], k)];
    const bName = sp3 ? 'an sp³ hybrid orbital of oxygen, bonding' : 'a 2p orbital of oxygen';
    const lName = sp3 ? 'an sp³ hybrid orbital of oxygen, holding a lone pair' : 'the other lobe of a 2p orbital of oxygen';
    bonds.forEach((b) => { const m = fade(lobe3(g, [0, 0, 0], b, len, col), 1); v.pickable(m, bName); });
    lones.forEach((b) => { const m = fade(lobe3(g, [0, 0, 0], b, len * (1 - 0.1 * k), col), 1); v.pickable(m, lName); });
    atom3(g, v, [0, 0, 0], 'O', 0.16);
    bonds.forEach((b) => { const p = V.mul(b, 1.75); sOrb(g, v, p, 0.5, S_COL(), 1, 'the 1s orbital of a hydrogen atom'); atom3(g, v, p, 'H', 0.12); });
    const m = arc3d(g, bonds[0], bonds[1], 0.75);
    if (k < 0.02 || k > 0.98) v.label(sp3 ? '109.5°' : '90°', m, g, 0);
    v.label('O', [0, -0.28, 0], g, 0);
    v.label(sp3 ? '<em>sp</em><sup>3</sup>' : '2<em>p</em>', V.mul(bonds[1], 1.0), g, 0);
    v.label('H', V.mul(bonds[0], 2.4), g, 0); v.label('H', V.mul(bonds[1], 2.4), g, 0);
    v.headline(sp3
      ? 'Four sp<sup>3</sup> hybrids point toward the corners of a tetrahedron, 109.5° apart; the observed H–O–H angle is 104.5°.'
      : 'Two perpendicular 2p orbitals would hold the hydrogen atoms 90° apart; the observed H–O–H angle is 104.5°.');
    readout(d.readout, `\\angle\\text{HOH}_{\\text{predicted}} = ${sp3 ? '109.5' : '90'}^\\circ \\qquad \\angle\\text{HOH}_{\\text{observed}} = 104.5^\\circ`,
      sp3 ? 'The two lone pairs occupy more space than the two bonding pairs, which is why the observed angle is slightly smaller than 109.5°.'
        : 'The prediction misses the observed angle by 14.5°, so a model that keeps the atomic orbitals of an isolated atom cannot be the whole story.');
  }
  still(d, draw);
})();

/* =====================================================================
   FIGURES 8.8, 8.10 + 8.11 + 8.12 and 8.15: one s orbital and one, two or
   three p orbitals mixing into a set of hybrids. Still: a choice between the
   book's drawings; the atomic orbitals fade as the hybrids grow out of the
   nucleus, and in 8.12 the hybrids draw in to become the B–H bonds.
===================================================================== */
const AXES = [[1, 0, 0], [0, 1, 0], [0, 0, 1]], AXN = ['x', 'y', 'z'];
function bench(id, n, stages, opts) {
  const d = sim(id);
  const v = F.view3d(d.stage, { h: 420, dist: 8.2, spin: 'idle', pitch: FREE_PITCH, views: opts.views });
  const g = v.part(0);
  const nP = n - 1;
  const STATE = {
    atomic: { at: 1, hy: 0, minor: 1, thin: 0, mol: 0 },
    hybrid: { at: 0, hy: 1, minor: 1, thin: 0, mol: 0 },
    thin: { at: 0, hy: 1, minor: 0, thin: 1, mol: 0 },
    mol: { at: 0, hy: 0, minor: 0, thin: 1, mol: 1 },
  };
  const st = F.choice(d.controls, { label: 'orbitals', aria: 'which drawing', options: stages, value: 'atomic' });
  const dirs = SITES[n], hyb = HYB[n];
  function draw() {
    const s = st.mix((x) => STATE[x]);
    v.clear(); axes3(g, v);
    nucleus(g);
    /* the atomic orbitals: the s orbital and the p orbitals that mix, and for sp2 the p orbital that stays */
    sOrb(g, v, [0, 0, 0], 0.62, S_COL(), s.at, 'the valence s orbital');
    for (let i = 0; i < nP; i++) pOrb(g, v, [0, 0, 0], AXES[i], 1.2, P_COL(), s.at, `a valence p orbital (p${AXN[i]})`);
    if (n === 3) pOrb(g, v, [0, 0, 0], AXES[2], 1.2, P_COL(), 0.35, 'the unhybridized p orbital (pz)');
    /* the hybrids grow from the nucleus */
    const grow = F.ease.smooth(s.hy);
    dirs.forEach((u) => { if (grow > 0.01) hOrb(g, v, [0, 0, 0], u, 1.35 * grow, H_COL(), Math.min(1, s.hy * 1.4), `an ${HYB_NAME[n]} hybrid orbital`, s.minor, s.thin); });
    /* BH3: the hybrids draw in as the bonds and hydrogen atoms arrive */
    if (s.mol > 0.01) {
      atom3(g, v, [0, 0, 0], 'B', 0.3, s.mol);
      dirs.forEach((u) => { const p = V.mul(u, 1.75); bond3(g, [0, 0, 0], p, s.mol, 0.07); atom3(g, v, p, 'H', 0.2, s.mol); });
    }
    const sp = st.value;
    if (st.k > 0.98) {
      if (sp === 'atomic') { v.label('<em>s</em>', [0.35, 0.5, 0.2], g, 0); v.label(`<em>p<sub>${AXN[0]}</sub></em>`, [1.95, 0.2, 0], g, 0); if (nP > 1) v.label(`<em>p<sub>y</sub></em>`, [0.2, 1.95, 0], g, 0); if (nP > 2) v.label(`<em>p<sub>z</sub></em>`, [0.2, 0.2, 1.95], g, 0); }
      if (sp === 'hybrid' || sp === 'thin') v.label(`<em>${hyb}</em>`, V.mul(dirs[0], 1.9), g, 0);
      if (n === 3 && sp !== 'atomic') v.label('<em>p<sub>z</sub></em>', [0.2, 0.2, 1.75], g, 0);
      if (sp !== 'atomic') ARCS[n].forEach(([i, j, t]) => v.label(t, arc3d(g, dirs[i], dirs[j], 0.8), g, 0));
      if (sp === 'mol') { v.label('B', [0, -0.45, 0], g, 0); dirs.forEach((u) => v.label('H', V.mul(u, 2.15), g, 0)); }
    }
    v.headline(opts.head[sp]);
    readout(d.readout, opts.eq, opts.note[sp]);
  }
  still(d, draw);
}
bench('sim-sp', 2, [{ value: 'atomic', label: 'atomic orbitals' }, { value: 'hybrid', label: 'hybrid orbitals' }], {
  views: [{ label: 'side', yaw: 0.45, pitch: 0.35 }, { label: 'along x', yaw: -Math.PI / 2, pitch: 0 }],
  eq: '1\\ s + 1\\ p \\;\\longrightarrow\\; 2\\ sp',
  head: { atomic: 'One valence s orbital and one valence p orbital, before they mix.', hybrid: 'Two sp hybrid orbitals, 180° apart along the x axis.' },
  note: { atomic: 'Two atomic orbitals go into the set, so two hybrid orbitals come out of it.', hybrid: 'Each sp orbital has one large lobe and one small one; the two are equivalent in shape and energy.' },
});
bench('sim-sp2', 3, [{ value: 'atomic', label: 'atomic orbitals' }, { value: 'hybrid', label: 'hybrid orbitals' }, { value: 'thin', label: 'drawn thin' }, { value: 'mol', label: 'in BH<sub>3</sub>' }], {
  views: [{ label: 'face on', yaw: 0, pitch: 0 }, { label: 'edge on', yaw: 0.3, pitch: 1.35 }],
  eq: '1\\ s + 2\\ p \\;\\longrightarrow\\; 3\\ sp^2 \\;(+\\ 1\\ p\\ \\text{unhybridized})',
  head: { atomic: 'One s orbital and two p orbitals, before they mix; the third p orbital lies along z.', hybrid: 'Three sp<sup>2</sup> hybrid orbitals, 120° apart in one plane; the p orbital along z is unchanged.', thin: 'The same three sp<sup>2</sup> orbitals drawn thinner and without their minor lobes.', mol: 'BH<sub>3</sub>: a trigonal planar molecule with its three B–H bonds 120° apart.' },
  note: { atomic: 'Three atomic orbitals go into the set, so three hybrid orbitals come out of it.', hybrid: 'The three hybrids are equivalent in shape and energy, and together they lie in the plane perpendicular to the unhybridized p orbital.', thin: 'This drawing keeps the directions and the 120° angles and leaves out what would crowd a larger figure.', mol: 'Each sp² hybrid of boron overlaps with the 1s orbital of a hydrogen atom to form one of the three σ bonds.' },
});
bench('sim-sp3', 4, [{ value: 'atomic', label: 'atomic orbitals' }, { value: 'hybrid', label: 'hybrid orbitals' }], {
  views: [{ label: 'side', yaw: 0.45, pitch: 0.3 }, { label: 'down a lobe', yaw: 0, pitch: Math.PI / 2 }],
  eq: '1\\ s + 3\\ p \\;\\longrightarrow\\; 4\\ sp^3',
  head: { atomic: 'One s orbital and all three p orbitals, before they mix.', hybrid: 'Four sp<sup>3</sup> hybrid orbitals pointing toward the corners of a tetrahedron, 109.5° apart.' },
  note: { atomic: 'Four atomic orbitals go into the set, so four hybrid orbitals come out of it, and no p orbital is left over.', hybrid: 'The four hybrids are equivalent in shape and energy; each can overlap with another orbital to form a σ bond or hold a lone pair.' },
});

/* =====================================================================
   FIGURES 8.9, 8.13 and 8.16: orbital energy-level diagrams, faithful copies.
   Each orbital a line at its energy, each electron a half-arrow; the E axis
   takes the energy hue and everything else is ink.
===================================================================== */
function halfArrow(ctx, x, y, up) {
  const y0 = up ? y - 6 : y - 46, y1 = up ? y - 46 : y - 6;
  line(ctx, x, y0, x, y1, PAL.ink, 3);
  line(ctx, x, y1, x + (up ? -9 : 9), y1 + (up ? 13 : -13), PAL.ink, 3);
}
function level(ctx, x, y, lab, electrons) {
  line(ctx, x - 46, y, x + 46, y, PAL.ink, 5);
  text(ctx, lab, x, y + 26, PAL.ink, { size: 22, align: 'center' });
  if (electrons === 1) halfArrow(ctx, x, y, true);
  if (electrons === 2) { halfArrow(ctx, x - 9, y, true); halfArrow(ctx, x + 9, y, false); }
}
function levels(id, o) {
  const H = 420, d = sim(id, H);
  function draw() {
    const { ctx } = begin(d.c);
    arrow(ctx, 110, 390, 110, 80, C('energy'), 4);
    text(ctx, 'E', 78, 235, C('energy'), { size: 26, weight: 600, align: 'center' });
    const y2s = 350, y2p = 150, yh = (y2s + o.m * y2p) / (o.m + 1);
    text(ctx, `Orbitals in an isolated ${o.atom} atom`, 330, 48, PAL.ink, { size: 22, align: 'center' });
    level(ctx, 210, y2s, '2s', 2);
    [0, 1, 2].forEach((i) => level(ctx, 210 + i * 120, y2p, '2p', i < o.p ? 1 : 0));
    arrow(ctx, 590, 250, 730, 250, PAL.muted, 6);
    text(ctx, 'Hybridization', 660, 222, PAL.ink, { size: 22, align: 'center' });
    text(ctx, o.title, 1030, 48, PAL.ink, { size: 22, align: 'center' });
    const nh = o.m + 1, x0 = 1030 - (nh - 1) * 60;
    for (let i = 0; i < nh; i++) level(ctx, x0 + i * 120, yh, o.hyb, i < o.e ? 1 : 0);
    const left = 3 - o.m;
    for (let j = 0; j < left; j++) level(ctx, x0 + j * 120, y2p, '2p', 0);
    if (left) text(ctx, 'Unhybridized', x0 + left * 120 - 30, y2p - 4, PAL.ink, { size: 22 });
    readout(d.readout, o.eq, o.note);
  }
  still(d, draw);
}
levels('fig-sp-levels', { atom: 'Be', m: 1, p: 0, e: 2, hyb: 'sp', title: 'Orbitals in the sp hybridized Be in BeCl_{2}',
  eq: '\\text{Be: } 2s^2 \\;\\longrightarrow\\; (sp)^1(sp)^1', note: 'Two half-filled sp orbitals, each available to overlap with a Cl 3p orbital.' });
levels('fig-sp2-levels', { atom: 'B', m: 2, p: 1, e: 3, hyb: 'sp^{2}', title: 'Orbitals in the sp^{2} hybridized B atom in BH_{3}',
  eq: '\\text{B: } 2s^2\\,2p^1 \\;\\longrightarrow\\; (sp^2)^1(sp^2)^1(sp^2)^1', note: 'Three half-filled sp² orbitals, one for each B–H σ bond, and one empty 2p orbital.' });
levels('fig-sp3-levels', { atom: 'C', m: 3, p: 2, e: 4, hyb: 'sp^{3}', title: 'Orbitals in the sp^{3} hybridized C atom in CH_{4}',
  eq: '\\text{C: } 2s^2\\,2p^2 \\;\\longrightarrow\\; (sp^3)^1(sp^3)^1(sp^3)^1(sp^3)^1', note: 'Four half-filled sp³ orbitals, one for each C–H σ bond.' });

/* =====================================================================
   FIGURE 8.17: ethane, as orbitals or as bonds, with one CH3 group turned
   about the C–C axis by a slider (a rotation is a slider, not a cycle).
===================================================================== */
(function () {
  const d = sim('sim-ethane');
  const v = F.view3d(d.stage, { h: 420, dist: 9, spin: 'idle', pitch: FREE_PITCH, views: [{ label: 'side', yaw: 0.35, pitch: 0.3 }, { label: 'along C–C', yaw: -Math.PI / 2, pitch: 0 }] });
  const g = v.part(0);
  const view = F.choice(d.controls, { label: 'drawing', aria: 'orbitals or bonds', options: [{ value: 'orb', label: 'orbitals' }, { value: 'bond', label: 'σ bonds' }], value: 'orb' });
  const phi = F.ctl(d.controls, { label: '\\varphi', cls: '', min: 0, max: 120, step: 1, value: 0, unit: '°', dec: 0, aria: 'rotation of the right-hand CH3 group about the C–C bond' });
  const CC = 1.55, CH = 1.1 * 1.15;
  const hDirs = (sign, turn) => [90, 210, 330].map((a) => V.unit([sign * 1 / 3, T3 * Math.cos((a + turn) * RAD), T3 * Math.sin((a + turn) * RAD)]));
  function draw() {
    const k = view.mix((x) => (x === 'bond' ? 1 : 0));
    v.clear();
    const C1 = [-CC / 2, 0, 0], C2 = [CC / 2, 0, 0];
    const groups = [{ c: C1, toC: [1, 0, 0], hs: hDirs(-1, 0) }, { c: C2, toC: [-1, 0, 0], hs: hDirs(1, 60 + phi.v) }];
    groups.forEach((gr) => {
      /* orbitals */
      hOrb(g, v, gr.c, gr.toC, 1.0, H_COL(), 1 - k, 'an sp³ orbital of carbon, overlapping end to end with one on the other carbon', 0.6);
      gr.hs.forEach((u) => {
        hOrb(g, v, gr.c, u, 0.95, H_COL(), 1 - k, 'an sp³ orbital of carbon', 0.6);
        sOrb(g, v, V.add(gr.c, V.mul(u, CH)), 0.42, S_COL(), 1 - k, 'the 1s orbital of a hydrogen atom');
      });
      /* bonds */
      atom3(g, v, gr.c, 'C', 0.2 + 0.08 * k);
      gr.hs.forEach((u) => { const p = V.add(gr.c, V.mul(u, CH)); bond3(g, gr.c, p, k); atom3(g, v, p, 'H', 0.1 + 0.08 * k); });
    });
    bond3(g, C1, C2, k);
    if (view.k > 0.98) {
      v.label('C', [C1[0], -0.42, 0], g, 0); v.label('C', [C2[0], -0.42, 0], g, 0);
      if (view.value === 'orb') v.label('<em>sp</em><sup>3</sup>', V.add(C1, V.mul(groups[0].hs[0], 1.1)), g, 0);
    }
    v.headline(`One CH<sub>3</sub> group turned ${Math.round(phi.v)}° about the C–C bond: seven σ bonds, one C–C and six C–H, at every angle.`);
    readout(d.readout, `\\varphi = ${Math.round(phi.v)}^\\circ`, 'The C–C σ bond is formed by end-to-end overlap along the bond axis, so turning one group about that axis leaves the overlap unchanged.');
  }
  still(d, draw);
})();

/* =====================================================================
   FIGURE 8.19 + 8.20: PCl5 and SF6, as ball-and-stick molecules and as the
   hybrid orbitals of the central atom (minor lobes left out, as the book
   leaves them out). Still: two choices; the sticks become lobes as the
   outer atoms fade, and one molecule gives way to the other.
===================================================================== */
(function () {
  const d = sim('sim-sp3d');
  const v = F.view3d(d.stage, { h: 440, dist: 8.6, spin: 'idle', pitch: FREE_PITCH, views: [{ label: 'side', yaw: 0.45, pitch: 0.3 }, { label: 'down the axis', yaw: 0, pitch: Math.PI / 2 }] });
  const g = v.part(0);
  const MOL = { pcl5: { n: 5, c: 'P', x: 'Cl', rx: 0.3, name: 'PCl<sub>5</sub>' }, sf6: { n: 6, c: 'S', x: 'F', rx: 0.26, name: 'SF<sub>6</sub>' } };
  const mol = F.choice(d.controls, { label: 'molecule', aria: 'molecule', options: [{ value: 'pcl5', label: 'PCl<sub>5</sub>' }, { value: 'sf6', label: 'SF<sub>6</sub>' }], value: 'pcl5' });
  const how = F.choice(d.controls, { label: 'drawing', aria: 'ball-and-stick or hybrid orbitals', options: [{ value: 'mol', label: 'ball and stick' }, { value: 'hyb', label: 'hybrid orbitals' }], value: 'mol' });
  function one(key, a) {
    if (a < 0.01) return;
    const m = MOL[key], dirs = SITES[m.n], h = how.mix((x) => (x === 'hyb' ? 1 : 0)), hy = HYB_NAME[m.n];
    atom3(g, v, [0, 0, 0], m.c, 0.34 * (1 - h) + 0.08, a);
    dirs.forEach((u) => {
      const p = V.mul(u, 1.85);
      bond3(g, [0, 0, 0], p, a * (1 - h), 0.07); atom3(g, v, p, m.x, m.rx, a * (1 - h));
      if (h > 0.01) hOrb(g, v, [0, 0, 0], u, 1.45 * F.ease.smooth(h), H_COL(), a * Math.min(1, h * 1.4), `an ${hy} hybrid orbital of ${NAMES[m.c].split(' ')[0]}`, 0);
    });
  }
  function draw() {
    v.clear();
    one('pcl5', mol.a('pcl5')); one('sf6', mol.a('sf6'));
    const m = MOL[mol.value], dirs = SITES[m.n], hyb = how.value === 'hyb';
    if (mol.k > 0.98 && how.k > 0.98) {
      ARCS[m.n].forEach(([i, j, t]) => v.label(t, arc3d(g, dirs[i], dirs[j], 0.8), g, 0));
      if (hyb) v.label(`<em>${HYB[m.n]}</em>`, V.mul(dirs[0], 2.0), g, 0);
      else { v.label(m.c, [0.3, -0.35, 0.3], g, 0); v.label(m.x, V.mul(dirs[0], 2.3), g, 0); }
    }
    const five = m.n === 5;
    v.headline(hyb
      ? `${WORDS[m.n]} ${HYB[m.n]} hybrid orbitals of ${five ? 'phosphorus' : 'sulfur'}, one large lobe pointing at each corner of ${five ? 'a trigonal bipyramid' : 'an octahedron'}.`
      : `${m.name}: ${WORDS[m.n].toLowerCase()} regions of electron density around the ${five ? 'phosphorus' : 'sulfur'} atom, ${five ? 'trigonal bipyramidal' : 'octahedral'}.`);
    readout(d.readout, five ? '1\\ s + 3\\ p + 1\\ d \\;\\longrightarrow\\; 5\\ sp^3d' : '1\\ s + 3\\ p + 2\\ d \\;\\longrightarrow\\; 6\\ sp^3d^2',
      five ? 'The 3s orbital, the three 3p orbitals and one 3d orbital of phosphorus form the five hybrids of the P–Cl bonds.' : 'The 3s orbital, the three 3p orbitals and two 3d orbitals of sulfur form the six hybrids of the S–F bonds.');
  }
  still(d, draw);
})();

/* =====================================================================
   FIGURE 8.21: the hybrid set for each number of regions of electron density.
   Still: a choice of two to six regions; the old set fades as the new one
   grows, and the headline reads the book's row.
===================================================================== */
(function () {
  const d = sim('sim-hybrid-sets');
  const v = F.view3d(d.stage, { h: 420, dist: 8, spin: 'idle', pitch: FREE_PITCH, views: [{ label: 'side', yaw: 0.45, pitch: 0.3 }, { label: 'face on', yaw: 0, pitch: 0 }] });
  const g = v.part(0);
  const n = F.choice(d.controls, { label: 'regions of electron density', aria: 'number of regions of electron density', options: [2, 3, 4, 5, 6].map((i) => ({ value: String(i), label: String(i) })), value: '3' });
  function one(i, a) {
    if (a < 0.01) return;
    SITES[i].forEach((u) => hOrb(g, v, [0, 0, 0], u, 1.4 * (0.4 + 0.6 * a), H_COL(), a, `an ${HYB_NAME[i]} hybrid orbital`, 0));
  }
  function draw() {
    v.clear(); nucleus(g);
    [2, 3, 4, 5, 6].forEach((i) => one(i, n.a(String(i))));
    const i = +n.value;
    if (n.k > 0.98) ARCS[i].forEach(([a, b, t]) => v.label(t, arc3d(g, SITES[i][a], SITES[i][b], 0.8), g, 0));
    v.headline(`${WORDS[i]} regions of electron density: a ${ARRANGE[i]} arrangement of ${HYB[i]} hybrid orbitals, ${ANGLES[i]} apart.`);
    readout(d.readout, `${i}\\ \\text{regions} \\;\\longrightarrow\\; \\text{${ARRANGE[i]}},\\ ${HYB_TEX[i]}`,
      i > 4 ? 'This set needs d orbitals, so it is possible only for an atom beyond the second period.' : 'The arrangement is the electron-pair geometry VSEPR theory predicts for the same number of regions.');
  }
  still(d, draw);
})();

/* ---------- Lewis structures: letters, bonds and pairs of dots, faithful copies ---------- */
function bondLine(ctx, x1, y1, x2, y2, order = 1, w = 3.5) {
  const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy) || 1, px = -dy / L * 7, py = dx / L * 7;
  const offs = order === 1 ? [0] : order === 2 ? [-1, 1] : [-1.4, 0, 1.4];
  offs.forEach((o) => line(ctx, x1 + px * o, y1 + py * o, x2 + px * o, y2 + py * o, PAL.ink, w));
}
function wedge(ctx, x1, y1, x2, y2) {
  const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy) || 1, px = -dy / L * 9, py = dx / L * 9;
  ctx.save(); ctx.fillStyle = PAL.ink; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2 + px, y2 + py); ctx.lineTo(x2 - px, y2 - py); ctx.closePath(); ctx.fill(); ctx.restore();
}
function dashes(ctx, x1, y1, x2, y2) {
  const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy) || 1, px = -dy / L, py = dx / L;
  ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3;
  for (let i = 1; i <= 6; i++) { const t = i / 6.5, w = 2 + 8 * t, x = x1 + dx * t, y = y1 + dy * t; ctx.beginPath(); ctx.moveTo(x + px * w, y + py * w); ctx.lineTo(x - px * w, y - py * w); ctx.stroke(); }
  ctx.restore();
}
/* atoms: [{sym, x, y, lp: [angles in degrees]}]; bonds: [[i, j, order, 'w' | 'd']]; drawn about (cx, cy) */
function lewis(ctx, cx, cy, atoms, bonds) {
  const gap = (s) => (s.length > 1 ? 26 : 18);
  bonds.forEach(([i, j, order, how]) => {
    const a = atoms[i], b = atoms[j], x1 = cx + a.x, y1 = cy + a.y, x2 = cx + b.x, y2 = cy + b.y, dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy) || 1;
    const ax = x1 + dx * gap(a.sym) / L, ay = y1 + dy * gap(a.sym) / L, bx = x2 - dx * gap(b.sym) / L, by = y2 - dy * gap(b.sym) / L;
    if (how === 'w') wedge(ctx, ax, ay, bx, by); else if (how === 'd') dashes(ctx, ax, ay, bx, by); else bondLine(ctx, ax, ay, bx, by, order ?? 1);
  });
  atoms.forEach((a) => {
    const x = cx + a.x, y = cy + a.y;
    text(ctx, a.sym, x, y + 1, PAL.ink, { size: a.sym.length > 1 ? 28 : 32, weight: 600, align: 'center' });
    (a.lp ?? []).forEach((ang) => { const c = Math.cos(ang * RAD), s = -Math.sin(ang * RAD), dd = a.sym.length > 1 ? 36 : 30, px = -s, py = c; F.dot(ctx, x + c * dd + px * 7, y + s * dd + py * 7, PAL.ink, true, 4); F.dot(ctx, x + c * dd - px * 7, y + s * dd - py * 7, PAL.ink, true, 4); });
  });
}
function ionBrackets(ctx, l, r, t, b, charge) {
  ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.beginPath();
  ctx.moveTo(l + 16, t); ctx.lineTo(l, t); ctx.lineTo(l, b); ctx.lineTo(l + 16, b); ctx.moveTo(r - 16, t); ctx.lineTo(r, t); ctx.lineTo(r, b); ctx.lineTo(r - 16, b); ctx.stroke(); ctx.restore();
  text(ctx, charge, r + 10, t + 4, PAL.ink, { size: 24, weight: 600 });
}
function lewisFigure(id, H, paint, main, small) {
  const d = sim(id, H);
  still(d, () => { const { ctx } = begin(d.c); paint(ctx); readout(d.readout, main, small); });
}

/* FIGURE 8.14: ClNO, formaldehyde and ethene */
lewisFigure('fig-sp2-examples', 300, (ctx) => {
  lewis(ctx, 250, 160, [{ sym: 'Cl', x: -95, y: 30, lp: [180, 90, 270] }, { sym: 'N', x: 0, y: -30, lp: [90] }, { sym: 'O', x: 95, y: 30, lp: [0, 270] }], [[0, 1, 1], [1, 2, 2]]);
  lewis(ctx, 700, 150, [{ sym: 'O', x: 0, y: -95, lp: [180, 0] }, { sym: 'C', x: 0, y: 15 }, { sym: 'H', x: -95, y: 75 }, { sym: 'H', x: 95, y: 75 }], [[0, 1, 2], [1, 2, 1], [1, 3, 1]]);
  lewis(ctx, 1150, 150, [{ sym: 'C', x: -55, y: 0 }, { sym: 'C', x: 55, y: 0 }, { sym: 'H', x: -110, y: -85 }, { sym: 'H', x: -110, y: 85 }, { sym: 'H', x: 110, y: -85 }, { sym: 'H', x: 110, y: 85 }], [[0, 1, 2], [0, 2, 1], [0, 3, 1], [1, 4, 1], [1, 5, 1]]);
}, '\\text{ClNO} \\qquad \\text{CH}_2\\text{O} \\qquad \\text{H}_2\\text{CCH}_2', 'Three regions of electron density around each central atom: a lone pair, a single bond and a double bond around nitrogen; two single bonds and a double bond around each carbon.');

/* FIGURE 8.18: SF4, ClF3 and ClF4+ in wedge-and-dash notation */
lewisFigure('fig-sp3d-lewis', 320, (ctx) => {
  const see = (cx, c, lps) => lewis(ctx, cx, 160, [{ sym: c, x: 0, y: 0, lp: lps }, { sym: 'F', x: 0, y: -105 }, { sym: 'F', x: 0, y: 105 }, { sym: 'F', x: 90, y: -40 }, { sym: 'F', x: 90, y: 45 }], [[0, 1, 1], [0, 2, 1], [0, 3, 1, 'd'], [0, 4, 1, 'w']]);
  see(250, 'S', [180]);
  lewis(ctx, 700, 160, [{ sym: 'Cl', x: 0, y: 0, lp: [155, 205] }, { sym: 'F', x: 0, y: -105 }, { sym: 'F', x: 0, y: 105 }, { sym: 'F', x: 110, y: 0 }], [[0, 1, 1], [0, 2, 1], [0, 3, 1]]);
  see(1140, 'Cl', [180]);
  ionBrackets(ctx, 1060, 1265, 32, 290, '+');
}, '\\text{SF}_4 \\qquad \\text{ClF}_3 \\qquad \\text{ClF}_4{}^{+}', 'Five regions of electron density around each central atom: four bonds and one lone pair in SF₄ and ClF₄⁺, three bonds and two lone pairs in ClF₃.');

/* the Lewis structure of urea, in Example 8.3 */
lewisFigure('fig-urea', 280, (ctx) => {
  lewis(ctx, 700, 140, [{ sym: 'C', x: 0, y: 0 }, { sym: 'O', x: 0, y: -100, lp: [90, 180] }, { sym: 'N', x: -120, y: 0, lp: [90] }, { sym: 'N', x: 120, y: 0, lp: [90] }, { sym: 'H', x: -235, y: 0 }, { sym: 'H', x: -120, y: 100 }, { sym: 'H', x: 235, y: 0 }, { sym: 'H', x: 120, y: 100 }],
    [[0, 1, 2], [0, 2, 1], [0, 3, 1], [2, 4, 1], [2, 5, 1], [3, 6, 1], [3, 7, 1]]);
}, '\\text{NH}_2\\text{C(O)NH}_2', 'Three regions of electron density around the carbon atom: two single bonds and one double bond.');

/* the sulfate ion in Example 8.2, the book's ball-and-stick drawing laid flat; atoms in the element palette */
(function () {
  const H = 340, d = sim('fig-sulfate', H);
  const ATOMS = [
    { sym: 'O', x: 700, y: 62, r: 40 }, { sym: 'O', x: 556, y: 232, r: 40 }, { sym: 'O', x: 842, y: 222, r: 38, q: true },
    { sym: 'S', x: 700, y: 196, r: 44 }, { sym: 'O', x: 740, y: 292, r: 42, q: true },
  ];
  function draw() {
    const { ctx } = begin(d.c);
    const s = ATOMS[3];
    ATOMS.forEach((a) => { if (a !== s) line(ctx, s.x, s.y, a.x, a.y, PAL.ink, 12); });
    ATOMS.forEach((a) => {
      ctx.save(); ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, TAU); ctx.fillStyle = F.el(a.sym); ctx.fill(); ctx.lineWidth = 1.5; ctx.strokeStyle = alpha(PAL.ink, 0.45); ctx.stroke(); ctx.restore();
      if (a.q) text(ctx, '−', a.x + a.r + 14, a.y - a.r + 6, PAL.ink, { size: 30, weight: 600, align: 'center' });
    });
    readout(d.readout, '\\text{SO}_4{}^{2-}', 'Four regions of electron density around the sulfur atom, in a tetrahedral arrangement.');
  }
  F.hover(d.stage, () => ATOMS.map((a) => ({ x: a.x, y: a.y, r: a.r, name: a.sym === 'S' ? 'sulfur (S)' : a.q ? 'oxygen (O), carrying a negative charge' : 'oxygen (O)' })));
  still(d, draw);
})();
};
