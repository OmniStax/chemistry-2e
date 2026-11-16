/* Figures for section 20.1 Hydrocarbons. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['20.1'] = function (root, F) {
const { tex, fmt, C, PAL, alpha, register, begin, line, dot, text, headline } = F;
const sim = (id, H) => F.sim(root, id, H);
const still = (d, draw) => register(d.fig, { update: () => {}, draw });
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;
const TAU = 2 * Math.PI, RAD = Math.PI / 180;
const lerp = (a, b, k) => a + (b - a) * k;
const minus = (s) => String(s).replace('-', '−');

/* ---------- vectors ---------- */
const add = (a, b) => a.map((x, i) => x + b[i]);
const sub = (a, b) => a.map((x, i) => x - b[i]);
const mul = (a, k) => a.map((x) => x * k);
const dot3 = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const unit = (a) => { const l = Math.hypot(...a) || 1; return a.map((x) => x / l); };
const dir = (deg) => [Math.cos(deg * RAD), Math.sin(deg * RAD), 0];

/* an atom as a disc in its element's colour; hydrogen is light and takes an ink outline so that it reads on a light page */
function atom(ctx, x, y, sym, r, a = 1) {
  ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fillStyle = F.el(sym); ctx.fill();
  ctx.lineWidth = sym === 'H' ? 2 : 1.4; ctx.strokeStyle = sym === 'H' ? PAL.ink : alpha(PAL.ink, 0.45); ctx.stroke(); ctx.restore();
}

/* ---------- Lewis structures, in ink as the book draws them ----------
   atoms: [{ s, x, y, a }] (s may carry braced subscripts, CH_{3}); bonds: [[i, j, order, w]]; a bond stops short of each label */
function gapOf(ctx, s, ux, uy, size) {
  if (!s) return 0;
  const w = F.measure(ctx, s, { size, weight: 600 });
  return Math.min(Math.abs(ux) > 1e-6 ? (w / 2 + 7) / Math.abs(ux) : Infinity, Math.abs(uy) > 1e-6 ? (size * 0.62 + 4) / Math.abs(uy) : Infinity);
}
function lewis(ctx, atoms, bonds, o = {}) {
  const size = o.size ?? 28, ink = o.color ?? PAL.ink;
  bonds.forEach(([i, j, order, w = 3, ba = 1]) => {
    const A = atoms[i], B = atoms[j], dx = B.x - A.x, dy = B.y - A.y, L = Math.hypot(dx, dy);
    if (L < 2) return;
    const ux = dx / L, uy = dy / L, ga = gapOf(ctx, A.s, ux, uy, size) * (A.g ?? 1), gb = gapOf(ctx, B.s, ux, uy, size) * (B.g ?? 1);
    if (ga + gb > L - 4) return;
    const a = Math.min(A.a ?? 1, B.a ?? 1) * ba;
    const offs = order === 1 ? [0] : order === 2 ? [-5.5, 5.5] : [-8, 0, 8];
    ctx.save(); ctx.globalAlpha *= a;
    offs.forEach((q) => line(ctx, A.x + ux * ga - uy * q, A.y + uy * ga + ux * q, B.x - ux * gb - uy * q, B.y - uy * gb + ux * q, ink, w));
    ctx.restore();
  });
  atoms.forEach((t) => {
    if (!t.s || t.nolabel || (t.a ?? 1) <= 0.01) return;
    ctx.save(); ctx.globalAlpha *= t.a ?? 1; text(ctx, t.s, t.x, t.y + 1, ink, { size, weight: 600, align: 'center' }); ctx.restore();
  });
}
/* The book's square Lewis drawing: carbon atoms on a grid, each hydrogen atom on a free side of its carbon
   (left, up, right, down, in that order, so a hydrogen keeps its place in the list as a drawing changes) */
const SIDES = [[-1, 0], [0, -1], [1, 0], [0, 1]];
function grid(cs, cc) {
  const atoms = cs.map(([x, y]) => ({ s: 'C', gx: x, gy: y })), bonds = cc.map(([i, j]) => [i, j, 1, 4.5]), hs = cs.map(() => []);
  /* a side is taken where a bonded carbon atom lies that way, however long the bond (a branch drawn on a long bond) */
  const taken = (i, sx, sy) => cc.some(([a, b]) => { const j = a === i ? b : b === i ? a : -1; if (j < 0) return false;
    const dx = cs[j][0] - cs[i][0], dy = cs[j][1] - cs[i][1]; return Math.sign(dx) === sx && Math.sign(dy) === sy; });
  cs.forEach(([x, y], i) => SIDES.forEach(([sx, sy]) => {
    if (taken(i, sx, sy)) return;
    hs[i].push(atoms.length); bonds.push([i, atoms.length, 1, 3]); atoms.push({ s: 'H', gx: x + sx, gy: y + sy, on: i, side: [sx, sy] });
  }));
  return { atoms, bonds, hs };
}
/* grid units to the canvas, the drawing's box centred on (cx, cy) */
function place(m, cx, cy, U) {
  const xs = m.atoms.map((t) => t.gx), ys = m.atoms.map((t) => t.gy);
  const ox = (Math.min(...xs) + Math.max(...xs)) / 2, oy = (Math.min(...ys) + Math.max(...ys)) / 2;
  return m.atoms.map((t) => ({ ...t, x: cx + (t.gx - ox) * U, y: cy + (t.gy - oy) * U }));
}

/* ---------- a molecule in three dimensions ----------
   Carbon atoms placed by hand from the bond lengths and angles; every hydrogen atom placed by VSEPR
   from the carbon atom's other bonds. C–C 1.54 Å, C=C 1.34 Å, C–H 1.09 Å. */
const TET = Math.acos(-1 / 3);
function hydrogens(C, B) {
  const atoms = C.map((p) => ({ el: 'C', p })), bonds = B.map((b) => [...b]);
  C.forEach((p, i) => {
    const nb = B.filter(([a, b]) => a === i || b === i), order = Math.max(1, ...nb.map((b) => b[2]));
    const others = nb.map(([a, b]) => (a === i ? b : a)), U = others.map((j) => unit(sub(C[j], p)));
    const want = (order === 3 ? 2 : order === 2 ? 3 : 4) - U.length;
    let D = [];
    if (want <= 0) return;
    if (order === 3) D = [mul(U[0], -1)];
    else if (order === 2) {
      if (U.length === 1) D = [120, -120].map((g) => { const c = Math.cos(g * RAD), s = Math.sin(g * RAD); return [U[0][0] * c - U[0][1] * s, U[0][0] * s + U[0][1] * c, 0]; });
      else D = [unit(mul(add(U[0], U[1]), -1))];
    } else if (U.length === 0) D = [[0, 1, 0], ...[0, 120, 240].map((g) => add(mul([0, 1, 0], Math.cos(TET)), mul([Math.cos(g * RAD), 0, Math.sin(g * RAD)], Math.sin(TET))))];
    else if (U.length === 1) {
      const a = U[0], j = others[0], k = B.map(([x, y]) => (x === j && y !== i ? y : y === j && x !== i ? x : -1)).find((x) => x >= 0);
      const w = k === undefined ? [0, 1, 0] : mul(sub(C[k], C[j]), -1);
      let pp = sub(w, mul(a, dot3(w, a))); if (Math.hypot(...pp) < 1e-3) pp = cross(a, [0, 0, 1]);
      const P = unit(pp), Q = cross(a, P);
      D = [0, 120, 240].map((g) => add(mul(a, Math.cos(TET)), mul(add(mul(P, Math.cos(g * RAD)), mul(Q, Math.sin(g * RAD))), Math.sin(TET))));
    } else if (U.length === 2) {
      const m = unit(mul(add(U[0], U[1]), -1)), n = unit(cross(U[0], U[1])), h = TET / 2;
      D = [add(mul(m, Math.cos(h)), mul(n, Math.sin(h))), add(mul(m, Math.cos(h)), mul(n, -Math.sin(h)))];
    } else D = [unit(mul(add(add(U[0], U[1]), U[2]), -1))];
    D.slice(0, want).forEach((u) => { bonds.push([i, atoms.length, 1]); atoms.push({ el: 'H', p: add(p, mul(u, 1.09)), on: i }); });
  });
  const c = mul(atoms.reduce((s, t) => add(s, t.p), [0, 0, 0]), 1 / atoms.length);
  atoms.forEach((t) => { t.p = sub(t.p, c); });
  return { atoms, bonds };
}
/* a chain of n sp³ carbon atoms zigzagging in the plane of the page at 109.5° */
function zigzag(n) {
  const h = (180 - TET / RAD) / 2, out = [[0, 0, 0]];
  for (let i = 1; i < n; i++) out.push(add(out[i - 1], mul(dir(i % 2 ? h : -h), 1.54)));
  return out;
}
const chainBonds = (n) => Array.from({ length: n - 1 }, (_, i) => [i, i + 1, 1]);

/* ---------- the book's Lewis drawing of a molecule, laid out in a box ----------
   An alkane is the book's square drawing (grid); an alkene lies in the plane of the page with its carbon atoms where the
   model has them, a hydrogen atom of an sp² carbon where the model has it, the three of a methyl group as the book's cross,
   and 2-butene's methyl groups condensed. Returns { atoms, bonds } for lewis(). */
function lewisOf(m, CX, TOP, BOT, S2 = 70) {
  if (m.kind === 'alkane') {
    const cc = m.m3.bonds.filter(([i, j]) => m.m3.atoms[i].el === 'C' && m.m3.atoms[j].el === 'C').map(([i, j]) => [i, j]);
    const g = grid(m.g2, cc), ys = g.atoms.map((t) => t.gy), span = Math.max(...ys) - Math.min(...ys);
    const U = Math.min(80, (BOT - TOP) / span);
    return { atoms: place(g, CX, (TOP + BOT) / 2, U), bonds: g.bonds.map(([i, j, o]) => [i, j, o, 3]) };
  }
  const A = m.m3.atoms, atoms = [], idx = {}, bonds = [];
  const isMethyl = (i) => A[i].el === 'C' && m.g3.B.filter(([a, b]) => a === i || b === i).length === 1 && m.g3.B.every(([a, b, o]) => !((a === i || b === i) && o === 2));
  A.forEach((t, i) => {
    if (t.el !== 'C') return;
    idx[i] = atoms.length; atoms.push({ s: m.cond2 && isMethyl(i) ? 'CH_{3}' : 'C', x: t.p[0], y: -t.p[1] });
  });
  m.g3.B.forEach(([a, b, o]) => bonds.push([idx[a], idx[b], o, 3]));
  A.forEach((t, i) => {
    if (t.el !== 'H') return;
    const c = t.on, ci = idx[c];
    if (m.cond2 && isMethyl(c)) return;
    if (!isMethyl(c) && Math.abs(t.p[2] - A[c].p[2]) < 0.05) { bonds.push([ci, atoms.length, 1, 3]); atoms.push({ s: 'H', x: t.p[0], y: -t.p[1] }); return; }
    if (atoms.some((q) => q.h === i)) return;
    /* sp³ carbon: its hydrogens as the book's cross, opposite and square to its one carbon neighbour */
    const nb = m.g3.B.filter(([a, b]) => a === c || b === c).map(([a, b]) => (a === c ? b : a));
    const u = unit(sub(A[nb[0]].p, A[c].p)), mine = A.map((q, j) => (q.el === 'H' && q.on === c ? j : -1)).filter((j) => j >= 0);
    const dirs = nb.length === 1 ? [[-1, 0], [0, -1], [1, 0], [0, 1]].map((q) => [q, q[0] * u[0] - q[1] * u[1]]).sort((a, b) => a[1] - b[1]).slice(0, 3).map(([q]) => [q[0], -q[1]])
      : (() => { const w = unit(sub(A[nb[1]].p, A[c].p)), mm = unit([-(u[0] + w[0]), -(u[1] + w[1]), 0]); return [-40, 40].map((g) => [mm[0] * Math.cos(g * RAD) - mm[1] * Math.sin(g * RAD), mm[0] * Math.sin(g * RAD) + mm[1] * Math.cos(g * RAD)]); })();
    mine.forEach((j, q) => { const v = dirs[q]; bonds.push([ci, atoms.length, 1, 3]); atoms.push({ s: 'H', x: A[c].p[0] + v[0] * 1.09, y: -A[c].p[1] - v[1] * 1.09, h: j }); });
  });
  const xs = atoms.map((t) => t.x), ys = atoms.map((t) => t.y), ox = (Math.min(...xs) + Math.max(...xs)) / 2, oy = (Math.min(...ys) + Math.max(...ys)) / 2;
  atoms.forEach((t) => { t.x = CX + (t.x - ox) * S2; t.y = (TOP + BOT) / 2 + (t.y - oy) * S2; });
  return { atoms, bonds };
}
const NAME = { C: 'carbon atom', H: 'hydrogen atom' };
const D2 = 1.34;   /* C=C, Å */
const palSig = () => [PAL.ink, PAL.panel, PAL.muted, F.el('C'), F.el('H')].join('|');

/* =====================================================================
   FIGURES 20.2 + 20.7: the six molecules of the two figures, one at a
   time. The Lewis structure stands on a flat strip as the book draws it;
   under it the same molecule turns as a ball-and-stick model and as a
   space-filling model, side by side at one scale and each about its own
   centre, so neither ever passes in front of the other. The reader sets
   the flat drawing against the shape it flattens: pentane's straight
   chain against a 109.5° zigzag, ethene's six atoms in one plane.
   Still: a molecule has no clock. Physical 3D; the orbit turns freely
   about the vertical and tilts no more than 0.6 rad, so a long chain
   stays level and can fill its half of the stage. Idle spin.
===================================================================== */
(function () {
  const H = 300, d = sim('sim-hydrocarbon-models', H);
  const AL = (n) => ({ C: zigzag(n), B: chainBonds(n) });
  const ene = (C) => ({ C, B: C.slice(1).map((_, i) => [i, i + 1, i === 0 ? 2 : 1]) });
  const MOL = {
    methane: { name: 'methane', kind: 'alkane', n: 1, cond: '\\text{CH}_4', mf: '\\text{CH}_4', g3: { C: [[0, 0, 0]], B: [] }, g2: [[0, 0]],
      head: 'The four hydrogen atoms of methane point to the corners of a tetrahedron, 109.5° apart.' },
    ethane: { name: 'ethane', kind: 'alkane', n: 2, cond: '\\text{CH}_3\\text{CH}_3', mf: '\\text{C}_2\\text{H}_6', g3: AL(2), g2: [[0, 0], [1, 0]],
      head: 'Each carbon atom of ethane bonds to four atoms, the other carbon atom and three hydrogen atoms.' },
    pentane: { name: 'pentane', kind: 'alkane', n: 5, cond: '\\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{CH}_2\\text{CH}_3', mf: '\\text{C}_5\\text{H}_{12}', g3: AL(5), g2: [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]],
      head: 'The Lewis structure draws pentane’s chain straight, but bond angles near 109.5° make it zigzag.' },
    ethene: { name: 'ethene', kind: 'alkene', cond: '\\text{CH}_2{=}\\text{CH}_2', mf: '\\text{C}_2\\text{H}_4', g3: ene([[0, 0, 0], [D2, 0, 0]]),
      head: 'Each carbon atom of ethene is trigonal planar, so all six atoms lie in one plane.' },
    propene: { name: 'propene', kind: 'alkene', cond: '\\text{CH}_2{=}\\text{CHCH}_3', mf: '\\text{C}_3\\text{H}_6', g3: (() => { const a = [0, 0, 0], b = add(a, mul(dir(30), D2)); return ene([a, b, add(b, mul(dir(-30), 1.5))]); })(),
      head: 'Propene is flat around its double bond; the third carbon atom is tetrahedral.' },
    butene1: { name: '1-butene', kind: 'alkene', cond: '\\text{CH}_2{=}\\text{CHCH}_2\\text{CH}_3', mf: '\\text{C}_4\\text{H}_8',
      g3: (() => { const a = [0, 0, 0], b = add(a, mul(dir(30), D2)), c = add(b, mul(dir(-30), 1.51)); return ene([a, b, c, add(c, mul(dir(150 - TET / RAD), 1.54))]); })(),
      head: 'In 1-butene the double bond joins carbon atoms 1 and 2 of a four-carbon chain.' },
  };
  Object.values(MOL).forEach((m) => { m.m3 = hydrogens(m.g3.C, m.g3.B); });
  const KEYS = Object.keys(MOL);
  const mol = F.choice(d.controls, { label: '\\text{molecule}', key: 'molecule', aria: 'the molecule', value: 'pentane',
    options: KEYS.map((k) => ({ value: k, label: MOL[k].name })) });
  let hits = []; F.hover(d.stage, () => hits);
  const CX = 700, TOP = 112, BOT = H - 16;

  /* ---------- the two models under it ---------- */
  const RB = { C: 0.36, H: 0.24 }, RF = { C: 1.6, H: 1.1 }, PX = 5.5;
  /* a long lens (14° over 28 units frames what 30° over 13 would), so the two models, off the axis on either side, are seen from nearly the same direction */
  const v = F.view3d(d.stage, { spin: 'idle', h: 440, dist: 28, tilt: 0.22, pitch: [-0.6, 0.6] });
  if (v.scene && v.camera.isPerspectiveCamera) { v.camera.fov = 14; v.camera.updateProjectionMatrix(); }
  v.setView(-0.25, 0.22);
  const gB = v.part(-PX), gF = v.part(PX);
  gB.position.y = gF.position.y = 0.35;
  let sig = '', fix = null;
  function build() {
    const s = mol.value + '|' + palSig(); if (s === sig) return; sig = s;
    v.clear();
    const m = MOL[mol.value].m3;
    m.bonds.forEach(([a, b, o]) => F.mesh.bond(gB, m.atoms[a].p, m.atoms[b].p, o, 0.08));
    m.atoms.forEach((t) => {
      v.pickable(F.mesh.sphere(gB, t.p, RB[t.el], F.el(t.el)), `${NAME[t.el]} of ${MOL[mol.value].name}`);
      v.pickable(F.mesh.sphere(gF, t.p, RF[t.el], F.el(t.el)), `${NAME[t.el]} of ${MOL[mol.value].name}`);
    });
    /* each model is scaled to fill its own half of the stage as it turns, as the book draws the two at different sizes */
    const fit = (R) => Math.min(4.3 / Math.max(...m.atoms.map((t) => Math.hypot(t.p[0], t.p[2]) + R[t.el])), 2.15 / Math.max(...m.atoms.map((t) => Math.hypot(t.p[1], t.p[2]) + R[t.el])));
    gB.scale.setScalar(Math.min(1.9, fit(RB))); gF.scale.setScalar(fit(RF));
    if (!fix) { fix = new window.THREE.Group(); v.scene.add(fix); }
    v.label('ball-and-stick model', [-PX, -3.1, 0], fix); v.label('space-filling model', [PX, -3.1, 0], fix);
  }
  function draw() {
    const { ctx } = begin(d.c); hits = [];
    headline(ctx, MOL[mol.value].head);
    KEYS.forEach((k) => mol.only(ctx, k, () => {
      const L = lewisOf(MOL[k], CX, TOP, BOT); lewis(ctx, L.atoms, L.bonds, { size: 28 });
      if (k === mol.value) L.atoms.forEach((t) => hits.push({ x: t.x, y: t.y, r: 20, name: `${NAME[t.s] ?? 'methyl group, CH₃'} of ${MOL[k].name}` }));
    }, [0, 10]));
    text(ctx, 'Lewis structure', 150, (TOP + BOT) / 2, PAL.muted, { size: 22, align: 'center' });
    F.legend(ctx, { l: 1090, r: 1360, t: TOP, b: BOT }, ['C', 'H'].map((s) => ({ s: NAME[s], draw: (c, x, y) => atom(c, x, y, s, 12) })), { corner: 'tl', size: 22 });
    const m = MOL[mol.value];
    tex(d.readout, m.kind === 'alkane'
      ? `\\text{${m.name}: } ${m.cond === m.mf ? m.mf : `${m.cond}\\ \\text{or}\\ ${m.mf}`} \\\\ \\text{C}_{n}\\text{H}_{2n+2} = \\text{C}_{${m.n}}\\text{H}_{2(${m.n})+2} = ${m.mf}`
      : `\\text{${m.name}: } ${m.cond}\\ \\text{or}\\ ${m.mf}`);
    if (!v.scene) return;
    build();
    v.invalidate();
  }
  still(d, draw);
})();

/* =====================================================================
   FIGURE 20.10: why 2-butene has a cis and a trans isomer and n-butane
   has neither. One four-carbon chain; the reader twists its right half
   about the bond between carbon atoms 2 and 3. Where that bond is single
   the chain turns freely and every shape is n-butane. Where it is double,
   the unhybridized p orbital of each sp² carbon atom is drawn: side by
   side at 0° (cis) and 180° (trans) they overlap as the π bond, and at
   any angle between they are out of line and the π bond is broken, which
   is why the double bond is rigid. The strip holds the book's 120°
   drawings of the two isomers, the one the model shows in full ink.
   Still: the twist is the reader's. Physical 3D with a mathematical layer
   (the p lobes, ink); orbit free about the vertical, tilt within 0.7 rad
   so the chain stays level; idle spin.
   C–C 1.54 Å, C=C 1.34 Å, =C–CH₃ 1.50 Å, C–H 1.09 Å.
===================================================================== */
(function () {
  const H = 290, d = sim('sim-geometric-isomers', H);
  const bond = F.choice(d.controls, { label: '\\text{bond 2–3}', key: 'bond', aria: 'the bond between carbon atoms 2 and 3', value: 'double',
    options: [{ value: 'double', label: 'double, 2-butene' }, { value: 'single', label: 'single, $n$-butane' }] });
  const dbl = () => bond.value === 'double';
  const tw = F.ctl(d.controls, { label: '\\text{twist}', cls: 'angle', key: 'twist', min: 0, max: 360, step: 5, value: 0, unit: '°', dec: 0, fmt: (x) => `${Math.round(x)}°`,
    aria: 'twist of the right half about the bond between carbon atoms 2 and 3',
    specials: [{ at: () => (dbl() ? 0 : null), label: 'cis' }, { at: () => (dbl() ? 180 : null), label: 'trans' }, { at: () => (dbl() ? 360 : null), label: 'cis' }] });
  let hits = []; F.hover(d.stage, () => hits);
  /* carbon atoms 1 to 4 with the 2–3 bond along x, its midpoint the origin; the right half turned about x by th.
     At 0 carbon atoms 1 and 4 lie on the same side. */
  function chain(kind, th) {
    const L = kind === 'double' ? D2 : 1.54, l = kind === 'double' ? 1.5 : 1.54, a = (kind === 'double' ? 60 : 180 - TET / RAD) * RAD;
    const c2 = [-L / 2, 0, 0], c3 = [L / 2, 0, 0], c = Math.cos(th), s = Math.sin(th);
    const c1 = add(c2, mul([-Math.cos(a), -Math.sin(a), 0], l)), c4 = add(c3, mul([Math.cos(a), -Math.sin(a) * c, -Math.sin(a) * s], l));
    const m = hydrogens([c1, c2, c3, c4], [[0, 1, 1], [1, 2, kind === 'double' ? 2 : 1], [2, 3, 1]]);
    const o = mul(add(m.atoms[1].p, m.atoms[2].p), 0.5);
    m.atoms.forEach((t) => { t.p = sub(t.p, o); });
    return m;
  }
  /* the strip's drawings: the book's two isomers at 120°, methyl groups condensed, and n-butane's square Lewis structure */
  const flat = (th) => { const g3 = { C: [0, 1, 2, 3].map((i) => chain('double', th).atoms[i].p), B: [[0, 1, 1], [1, 2, 2], [2, 3, 1]] }; return { kind: 'alkene', cond2: true, g3, m3: hydrogens(g3.C, g3.B) }; };
  const CIS = flat(0), TRANS = flat(Math.PI), BUT = { kind: 'alkane', g2: [[0, 0], [1, 0], [2, 0], [3, 0]], m3: hydrogens(zigzag(4), chainBonds(4)) };
  const TOP = 106, BOT = H - 58;
  const state = () => { const t = Math.round(tw.v) % 360; return !dbl() ? 'single' : t === 0 ? 'cis' : t === 180 ? 'trans' : 'broken'; };
  const HEAD = {
    cis: 'In $cis$-2-butene both methyl groups lie on the same side of the double bond.',
    trans: 'In $trans$-2-butene the methyl groups lie on opposite sides of the double bond.',
    broken: 'A double bond is rigid: twisting it turns the two p orbitals out of line and breaks the π bond.',
    single: 'A single bond turns freely, so every shape of this chain is the same compound, $n$-butane.',
  };

  const v = F.view3d(d.stage, { spin: 'idle', h: 440, dist: 8.4, tilt: 0.42, pitch: [0, 0.9] });
  v.setView(-0.3, 0.42);
  const g = v.part(0);
  g.rotation.x = -Math.PI / 2;   /* the plane of the double bond lies level, so the p orbitals stand up and the methyl groups of the cis isomer point at the reader */
  g.position.y = 0.3;
  let sig = '';
  function build() {
    const st = state(), s = [bond.value, tw.v, palSig()].join('|'); if (s === sig) return; sig = s;
    v.clear();
    const th = tw.v * RAD, m = chain(bond.value, th), name = dbl() ? '2-butene' : 'n-butane';
    m.bonds.forEach(([a, b, o]) => F.mesh.bond(g, m.atoms[a].p, m.atoms[b].p, o === 2 && st === 'broken' ? 1 : o, 0.08));
    m.atoms.forEach((t, i) => v.pickable(F.mesh.sphere(g, t.p, t.el === 'C' ? 0.36 : 0.24, F.el(t.el)), t.el === 'C' ? `carbon atom ${i + 1} of ${name}` : `hydrogen atom on carbon atom ${t.on + 1}`));
    if (dbl()) {
      /* each sp² carbon atom's p orbital stands square to the plane of its own three bonds */
      const n3 = [0, -Math.sin(th), Math.cos(th)];
      [[1, [0, 0, 1]], [2, n3]].forEach(([i, n]) => [1, -1].forEach((q) => v.pickable(F.mesh.lobe(g, m.atoms[i].p, mul(n, q), 1.15, PAL.ink), `lobe of the p orbital of carbon atom ${i + 1}`)));
    }
  }
  function draw() {
    const { ctx } = begin(d.c); hits = [];
    const st = state();
    headline(ctx, HEAD[st]);
    const show = (m, cx, a, label, nm) => {
      ctx.save(); ctx.globalAlpha *= a;
      const L = lewisOf(m, cx, TOP, BOT, 56); lewis(ctx, L.atoms, L.bonds, { size: 28 });
      text(ctx, label, cx, H - 16, PAL.ink, { size: 22, align: 'center' });
      ctx.restore();
      if (a > 0.9) L.atoms.forEach((t) => hits.push({ x: t.x, y: t.y, r: 20, name: `${NAME[t.s] ?? 'methyl group, CH₃'} of ${nm}` }));
    };
    bond.only(ctx, 'double', () => {
      show(CIS, 470, st === 'cis' ? 1 : 0.3, 'cis isomer, twist 0°', 'cis-2-butene');
      show(TRANS, 930, st === 'trans' ? 1 : 0.3, 'trans isomer, twist 180°', 'trans-2-butene');
    }, [0, 10]);
    bond.only(ctx, 'single', () => show(BUT, 700, 1, 'n-butane, at every twist', 'n-butane'), [0, 10]);
    const ang = hue('angle', `${Math.round(tw.v)}^\\circ`);
    tex(d.readout, st === 'single' ? `\\text{twist} = ${ang}:\\ \\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{CH}_3,\\ n\\text{-butane}`
      : st === 'broken' ? `\\text{twist} = ${ang}:\\ \\pi\\ \\text{bond broken, neither isomer}`
      : `\\text{twist} = ${ang}:\\ \\text{CH}_3\\text{CH}{=}\\text{CHCH}_3,\\ \\textit{${st}}\\text{-2-butene}`);
    if (!v.scene) return;
    build();
    v.invalidate();
  }
  still(d, draw);
})();

/* =====================================================================
   FIGURE 20.3: the same molecule, C9H20, as an expanded formula, a
   condensed formula and a skeletal structure. Changing the drawing is one
   morph: the hydrogen atoms slide into the label of their carbon atom,
   the labels give way, and each carbon atom moves to its end or bend of
   the zigzag. Still: three drawings of one molecule, no clock.
===================================================================== */
(function () {
  const H = 510, d = sim('sim-line-structures', H);
  /* main chain C1 to C6 left to right; C7 the methyl group above C2; C8 and C9 the ethyl group below C3 */
  const CS = [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [1, -1], [2, 1], [2, 2]];
  const CC = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [1, 6], [2, 7], [7, 8]];
  const G = grid(CS, CC);
  /* the expanded formula as the book draws it: the methyl group stands above carbon 2 and the ethyl group hangs below carbon 3 on
     long bonds, so their hydrogen atoms stay clear of the chain's; the hydrogen atoms come in the same order as in G */
  const GE = grid([[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [1, -2], [2, 2], [2, 3]], CC);
  /* the skeletal structure at 120° bends, 100 units a bond: the main chain zigzags, the methyl group stands up from carbon 2, the ethyl group hangs from carbon 3 */
  const BX = 100 * Math.cos(30 * RAD), BY = 25;
  const SKEL = [0, 1, 2, 3, 4, 5].map((i) => [i * BX, i % 2 ? -BY : BY]);
  SKEL.push([SKEL[1][0], SKEL[1][1] - 100], [SKEL[2][0], SKEL[2][1] + 100], [SKEL[2][0] + BX, SKEL[2][1] + 150]);
  const nH = CS.map((_, i) => G.hs[i].length);
  const LABEL = nH.map((n) => (n === 0 ? 'C' : n === 1 ? 'CH' : `CH_{${n}}`));
  const REP = ['expanded', 'condensed', 'skeletal'];
  const pick = F.choice(d.controls, { label: '\\text{drawing}', key: 'drawing', aria: 'the way the molecule is drawn', value: 'expanded',
    options: [{ value: 'expanded', label: 'expanded' }, { value: 'condensed', label: 'condensed' }, { value: 'skeletal', label: 'skeletal' }] });
  const HEAD = {
    expanded: 'The expanded formula draws every atom and every bond: 9 carbon atoms and 20 hydrogen atoms.',
    condensed: 'The condensed formula writes each carbon atom with the hydrogen atoms bonded to it.',
    skeletal: 'In the skeletal structure each end or bend of a line is a carbon atom, and its hydrogen atoms are not drawn.',
  };
  let hits = []; F.hover(d.stage, () => hits);
  const CX = 700, CY = 302;
  /* each drawing as numbers: per carbon its point and how far its label shows; per hydrogen its point and opacity */
  function state(rep) {
    if (rep === 'skeletal') {
      const xs = SKEL.map((p) => p[0]), ys = SKEL.map((p) => p[1]), ox = (Math.min(...xs) + Math.max(...xs)) / 2, oy = (Math.min(...ys) + Math.max(...ys)) / 2;
      const P = SKEL.map(([x, y]) => [CX + x - ox, CY + y - oy]);
      return { c: P.flat(), lab: CS.map(() => 0), cond: CS.map(() => 0), h: G.atoms.filter((t) => t.s === 'H').flatMap((t) => [...P[t.on], 0]) };
    }
    const sx = rep === 'expanded' ? 66 : 118, sy = rep === 'expanded' ? 52 : 74;
    const at = (rep === 'expanded' ? GE : G).atoms.map((t) => ({ x: CX + (t.gx - 2.5) * sx, y: CY + (t.gy - 0.5) * sy }));
    const C = CS.map((_, i) => [at[i].x, at[i].y]);
    return { c: C.flat(), lab: CS.map(() => 1), cond: CS.map(() => (rep === 'condensed' ? 1 : 0)),
      h: G.atoms.filter((t) => t.s === 'H').flatMap((t, j) => (rep === 'expanded' ? [at[CS.length + j].x, at[CS.length + j].y, 1] : [...C[t.on], 0])) };
  }
  function draw() {
    const { ctx } = begin(d.c); hits = [];
    headline(ctx, HEAD[pick.value]);
    const s = pick.mix(state), nC = CS.length;
    const atoms = [];
    CS.forEach((_, i) => {
      const x = s.c[2 * i], y = s.c[2 * i + 1];
      atoms.push({ s: '', x, y, g: 0 });
      hits.push({ x, y, r: 22, name: `carbon atom ${i < 6 ? `${i + 1} of the main chain` : i === 6 ? 'of the methyl group on carbon 2' : 'of the ethyl group on carbon 3'}, ${LABEL[i].replace(/_\{(\d)\}/, (_, n) => '₀₁₂₃₄'[n])}` });
    });
    G.atoms.slice(nC).forEach((t, j) => atoms.push({ s: 'H', x: s.h[3 * j], y: s.h[3 * j + 1], a: s.h[3 * j + 2] }));
    /* bonds stop short of a label as far as the label shows */
    atoms.forEach((t, i) => { if (i < nC) { t.s = s.cond[i] > 0.5 ? LABEL[i] : 'C'; t.g = s.lab[i]; } });
    const bonds = G.bonds.map(([i, j]) => [i, j, 1, j < nC ? 4 : 3]);
    lewis(ctx, atoms.map((t, i) => (i < nC ? { ...t, a: 1, nolabel: true } : t)), bonds.map((b) => (b[1] < nC ? b : [...b.slice(0, 4), atoms[b[1]].a])), { size: 26 });
    ctx.save();
    CS.forEach((_, i) => {
      const x = s.c[2 * i], y = s.c[2 * i + 1];
      /* the plain C crossfades into the condensed label, and either fades as the skeletal structure takes over */
      if (s.lab[i] * (1 - s.cond[i]) > 0.01) { ctx.globalAlpha = s.lab[i] * (1 - s.cond[i]); text(ctx, 'C', x, y + 1, PAL.ink, { size: 26, weight: 600, align: 'center' }); }
      if (s.lab[i] * s.cond[i] > 0.01) { ctx.globalAlpha = s.lab[i] * s.cond[i]; text(ctx, LABEL[i], x, y + 1, PAL.ink, { size: 26, weight: 600, align: 'center' }); }
    });
    ctx.restore();
    tex(d.readout, pick.value === 'expanded' ? '\\text{C}_{n}\\text{H}_{2n+2} = \\text{C}_{9}\\text{H}_{2(9)+2} = \\text{C}_{9}\\text{H}_{20}'
      : pick.value === 'condensed' ? '4\\,\\text{CH}_3 + 3\\,\\text{CH}_2 + 2\\,\\text{CH} = \\text{C}_{9}\\text{H}_{20}'
      : '4\\ \\text{ends} \\times 3\\ \\text{H} + 3\\ \\text{bends} \\times 2\\ \\text{H} + 2\\ \\text{branch points} \\times 1\\ \\text{H} = 20\\ \\text{H}');
  }
  still(d, draw);
})();

/* =====================================================================
   Table 20.1 as a Sim: the chain grows a carbon atom at a time across
   the table's alkanes, and the melting and boiling points beneath climb
   past 0 °C, so the alkane is a gas, a liquid or a solid at STP. Still:
   the temperatures answer the carbon count. Fixed axes: 0 to 19 carbon
   atoms, −200 to 350 °C (the table runs from −187.7 to 316.1 °C).
===================================================================== */
(function () {
  const H = 660, d = sim('sim-alkane-trend', H);
  const T = [
    [1, 'methane', -182.5, -161.5, 'gas'], [2, 'ethane', -183.3, -88.6, 'gas'], [3, 'propane', -187.7, -42.1, 'gas'], [4, 'butane', -138.3, -0.5, 'gas'],
    [5, 'pentane', -129.7, 36.1, 'liquid'], [6, 'hexane', -95.3, 68.7, 'liquid'], [7, 'heptane', -90.6, 98.4, 'liquid'], [8, 'octane', -56.8, 125.7, 'liquid'],
    [9, 'nonane', -53.6, 150.8, 'liquid'], [10, 'decane', -29.7, 174.0, 'liquid'], [14, 'tetradecane', 5.9, 253.5, 'solid'], [18, 'octadecane', 28.2, 316.1, 'solid'],
  ];
  const NS = T.map((r) => r[0]);
  const near = (x) => NS.reduce((b, n) => (Math.abs(n - x) < Math.abs(b - x) ? n : b), NS[0]);
  const N = F.ctl(d.controls, { label: '\\text{carbon atoms}', cls: '', key: 'carbons', min: 1, max: 18, step: 1, value: 5, unit: '', dec: 0, aria: 'number of carbon atoms in the chain',
    detents: NS, onInput: () => { const n = near(N.v); if (n !== N.v) N.set(n); } });
  const box = { l: 170, r: 1320, t: 250, b: 580 };
  let hits = []; F.hover(d.stage, () => hits);
  const deg = (v) => `${minus(v.toFixed(1))} °C`;
  function draw() {
    const { ctx } = begin(d.c); hits = [];
    const n = near(N.v), row = T.find((r) => r[0] === n), [, name, mp, bp, phase] = row, cT = C('temperature');
    const Name = name[0].toUpperCase() + name.slice(1);
    const lines = headline(ctx, phase === 'gas' ? `${Name} is a gas at STP: it boils below 0 °C.`
      : phase === 'liquid' ? `${Name} is a liquid at STP: it melts below 0 °C and boils above it.`
      : `${Name} is a solid at STP: it melts above 0 °C.`);
    const lab = F.labeller(ctx, H, { headline: lines });
    /* the chain: n carbon atoms zigzagging at 109.5°, its hydrogen atoms left out as a skeletal structure leaves them */
    const step = Math.min(110, 1120 / Math.max(1, n - 1)), amp = step * 0.36, y0 = 158, x0 = 700 - ((n - 1) * step) / 2;
    const P = Array.from({ length: n }, (_, i) => [x0 + i * step, y0 + (i % 2 ? -amp : amp)]);
    P.slice(1).forEach((p, i) => line(ctx, P[i][0], P[i][1], p[0], p[1], PAL.ink, 4));
    P.forEach(([x, y], i) => { atom(ctx, x, y, 'C', 17); hits.push({ x, y, r: 19, name: `carbon atom ${i + 1} of ${name}` }); });
    const { X, Y } = F.axes(ctx, box, [0, 19], [-200, 350], { nx: 19, ny: 11, xl: 'number of carbon atoms', yl: 'temperature (°C)', yc: cT, fx: (v) => (v % 2 ? '' : fmt(v, 0)), fy: (v) => minus(fmt(v, 0)) });
    /* between the two curves an alkane is a liquid; above the boiling points a gas, below the melting points a solid */
    ctx.save(); ctx.beginPath(); T.forEach((r, i) => (i ? ctx.lineTo(X(r[0]), Y(r[3])) : ctx.moveTo(X(r[0]), Y(r[3])))); [...T].reverse().forEach((r) => ctx.lineTo(X(r[0]), Y(r[2]))); ctx.closePath();
    ctx.fillStyle = alpha(cT, 0.13); ctx.fill(); ctx.restore();
    [['gas', 2.6, 190], ['liquid', 12, 120], ['solid', 14.6, -110]].forEach(([s, x, y]) => text(ctx, s, X(x), Y(y), phase === s ? PAL.ink : PAL.muted, { size: 24, weight: phase === s ? 600 : 400, align: 'center' }));
    line(ctx, box.l, Y(0), box.r, Y(0), alpha(PAL.ink, 0.45), 2, [10, 10]);
    lab.add('0 °C, STP', X(16), Y(0), 0, 1, PAL.muted, 18, 12);
    const poly = (k, dash) => { ctx.save(); ctx.strokeStyle = cT; ctx.lineWidth = 4; if (dash) ctx.setLineDash(dash); ctx.beginPath(); T.forEach((r, i) => (i ? ctx.lineTo(X(r[0]), Y(r[k])) : ctx.moveTo(X(r[0]), Y(r[k])))); ctx.stroke(); ctx.restore(); };
    poly(3); poly(2, [12, 9]);
    T.forEach((r) => {
      dot(ctx, X(r[0]), Y(r[3]), cT, true, 5); dot(ctx, X(r[0]), Y(r[2]), cT, false, 5);
      hits.push({ x: X(r[0]), y: Y(r[3]), r: 9, name: `boiling point of ${r[1]}, ${deg(r[3])}` }, { x: X(r[0]), y: Y(r[2]), r: 9, name: `melting point of ${r[1]}, ${deg(r[2])}` });
    });
    line(ctx, X(n), box.t, X(n), box.b, alpha(PAL.ink, 0.4), 2, [4, 8]);
    dot(ctx, X(n), Y(bp), cT, true, 10); dot(ctx, X(n), Y(mp), cT, false, 10);
    dot(ctx, X(n), Y(0), PAL.ink, true, 8); hits.push({ x: X(n), y: Y(0), r: 12, name: `${name} at 0 °C: a ${phase}` });
    lab.add('boiling point', X(18), Y(316.1), -1, -1, cT, 22, 22);
    lab.add('melting point', X(18), Y(28.2), -1, -1, cT, 22, 22);
    lab.flush();
    const deg2 = (x) => hue('temperature', `${x.toFixed(1).replace('-', '{-}')}\\ ^\\circ\\text{C}`), zero = hue('temperature', '0\\ ^\\circ\\text{C}');
    const mf = `\\text{C}${n > 1 ? `_{${n}}` : ''}\\text{H}_{${2 * n + 2}}`;
    tex(d.readout, `\\text{${name}: C}_{n}\\text{H}_{2n+2} = \\text{C}_{${n}}\\text{H}_{2(${n})+2} = ${mf} \\\\ `
      + (phase === 'gas' ? `\\text{boiling point} = ${deg2(bp)} < ${zero}`
        : phase === 'liquid' ? `\\text{melting point} = ${deg2(mp)} < ${zero} < ${deg2(bp)} = \\text{boiling point}`
        : `\\text{melting point} = ${deg2(mp)} > ${zero}`));
  }
  still(d, draw);
})();

/* =====================================================================
   FIGURE 20.11 with the book's two resonance structures. The strip holds
   the book's drawings: the two resonance structures and the condensed
   formula with its circle. Under it the ring turns in three dimensions,
   flat, with the unhybridized p orbital of each sp² carbon atom standing
   perpendicular to it, which the book describes and never draws. A choice
   lets the six p orbitals overlap into the π electron density above and
   below the ring that all six carbon-carbon bonds share. Still: a molecule
   has no clock. Free orbit and an idle spin about the ring's axis.
   C–C 1.39 Å, C–H 1.09 Å.
===================================================================== */
(function () {
  const H = 300, d = sim('sim-benzene', H);
  const pick = F.choice(d.controls, { label: '\\text{six } p \\text{ orbitals}', key: 'orbitals', aria: 'the p orbitals apart or overlapping', value: 'p',
    options: [{ value: 'p', label: 'one on each carbon atom' }, { value: 'pi', label: 'overlapping' }] });
  const HEAD = {
    p: 'Each sp² carbon atom keeps one unhybridized p orbital, perpendicular to the plane of the ring.',
    pi: 'Overlapping around the ring, the p orbitals share the π electrons among all six bonds.',
  };
  let hits = []; F.hover(d.stage, () => hits);
  /* ---------- the strip: the book's drawings, the ring with a carbon atom at the left and at the right ---------- */
  const R = 62, RH = 128, CY = 150;
  const ring = (cx, r) => [0, 60, 120, 180, 240, 300].map((a) => [cx + r * Math.cos(a * RAD), CY - r * Math.sin(a * RAD)]);
  function resonance(ctx, cx, dbl) {
    const C = ring(cx, R), Hs = ring(cx, RH), atoms = [], bonds = [];
    C.forEach(([x, y]) => atoms.push({ s: 'C', x, y }));
    Hs.forEach(([x, y]) => atoms.push({ s: 'H', x, y }));
    for (let k = 0; k < 6; k++) bonds.push([k, (k + 1) % 6, dbl.includes(k) ? 2 : 1, 3], [k, k + 6, 1, 3]);
    lewis(ctx, atoms, bonds, { size: 26 });
    atoms.forEach((t, i) => hits.push({ x: t.x, y: t.y, r: 18, name: i < 6 ? 'carbon atom' : 'hydrogen atom' }));
  }
  function draw2d(ctx) {
    resonance(ctx, 230, [0, 2, 4]);
    resonance(ctx, 590, [1, 3, 5]);
    F.arrow(ctx, 380, CY, 440, CY, PAL.ink, 3); F.arrow(ctx, 440, CY, 380, CY, PAL.ink, 3);
    text(ctx, 'resonance structures', 410, H - 18, PAL.muted, { size: 20, align: 'center' });
    const C = ring(1030, 78), atoms = C.map(([x, y]) => ({ s: 'CH', x, y }));
    lewis(ctx, atoms, [0, 1, 2, 3, 4, 5].map((k) => [k, (k + 1) % 6, 1, 3]), { size: 26 });
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(1030, CY, 44, 0, TAU); ctx.stroke(); ctx.restore();
    atoms.forEach((t) => hits.push({ x: t.x, y: t.y, r: 24, name: 'CH group' }));
    hits.push({ x: 1030, y: CY, r: 36, name: 'circle: six equivalent carbon-carbon bonds' });
    text(ctx, 'condensed formula', 1030, H - 18, PAL.muted, { size: 20, align: 'center' });
  }
  /* ---------- the ring in three dimensions, lying flat ---------- */
  const v = F.view3d(d.stage, { spin: 'idle', h: 460, dist: 9.6, tilt: 0.55, pitch: [0.15, 1.2] });
  v.setView(0.3, 0.55);
  const g = v.part(0);
  g.position.y = -0.25;
  let sig = '', lobes = null, cloud = null;
  function build() {
    const s = palSig(); if (s === sig) return; sig = s;
    v.clear();
    const T = window.THREE, RC = 1.39, RHH = 2.48, at = (r, k) => [r * Math.cos(k * Math.PI / 3), 0, r * Math.sin(k * Math.PI / 3)];
    lobes = new T.Group(); cloud = new T.Group(); g.add(lobes); g.add(cloud);
    for (let k = 0; k < 6; k++) {
      const c = at(RC, k), h = at(RHH, k);
      v.pickable(F.mesh.sphere(g, c, 0.34, F.el('C')), 'carbon atom, sp² hybridized');
      v.pickable(F.mesh.sphere(g, h, 0.24, F.el('H')), 'hydrogen atom');
      F.mesh.bond(g, c, h, 1, 0.08); F.mesh.bond(g, c, at(RC, k + 1), 1, 0.08);
      [[0, 1, 0], [0, -1, 0]].forEach((u) => v.pickable(F.mesh.lobe(lobes, c, u, 0.95, PAL.ink), 'lobe of an unhybridized p orbital'));
    }
    [0.78, -0.78].forEach((y) => {
      const m = new T.Mesh(new T.TorusGeometry(RC, 0.3, 16, 72), F.mesh.mat(PAL.ink, { transparent: true, opacity: 0.25, depthWrite: false }));
      m.rotation.x = Math.PI / 2; m.position.set(0, y, 0); cloud.add(m); v.pickable(m, `π electrons, ${y > 0 ? 'above' : 'below'} the ring`);
    });
  }
  function draw() {
    const { ctx } = begin(d.c); hits = [];
    draw2d(ctx);
    tex(d.readout, pick.value === 'p'
      ? '4\\ \\text{valence electrons per carbon atom} = 3\\ \\text{in } sp^{2}\\ (\\sigma\\ \\text{bonds}) + 1\\ \\text{in } p\\ (\\pi\\ \\text{bonds})'
      : '6 \\times 1 = 6\\ \\pi\\ \\text{electrons, shared by all six carbon-carbon bonds}');
    if (!v.scene) return;
    build();
    const k = pick.mix((x) => (x === 'pi' ? 1 : 0));
    F.fade3(lobes, 1 - k); F.fade3(cloud, k);
    lobes.visible = k < 0.99; cloud.visible = k > 0.01;
    v.headline(HEAD[pick.value]);
    v.invalidate();
  }
  still(d, draw);
})();
};
