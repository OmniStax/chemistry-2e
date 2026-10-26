/* Figures for section 20.1 Hydrocarbons. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['20.1'] = function (root, F) {
const { tex, fmt, C, PAL, alpha, register, begin, line, dot, text, headline } = F;
const sim = (id, H) => F.sim(root, id, H);
const still = (d, draw) => register(d.fig, { update: () => {}, draw });
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;
const TAU = 2 * Math.PI, RAD = Math.PI / 180;
const lerp = (a, b, k) => a + (b - a) * k;
const VIEWS = [{ value: '2d', label: '2D' }, { value: '3d', label: '3D' }];
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
  cs.forEach(([x, y], i) => SIDES.forEach(([sx, sy]) => {
    if (cs.some(([u, v]) => u === x + sx && v === y + sy)) return;
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

/* the flat views shared by a figure with a 2D/3D choice: the stage mounts on the first switch and each hides the other */
function views(d, three, mount, draw) {
  let v = null;
  return {
    get v() { return v; },
    show() {
      const on = three();
      if (on && !v) v = mount();
      d.c.style.display = on ? 'none' : '';
      if (v) [v.wrap, d.stage.querySelector('.view3d-bar')].forEach((e) => { if (e) e.style.display = on ? '' : 'none'; });
      draw();
    },
  };
}

/* =====================================================================
   FIGURES 20.2 + 20.7 + 20.10: one molecule at a time as the Lewis
   structure the text teaches, then as a ball-and-stick model the reader
   turns, then as a space-filling model; the balls swell and the sticks
   sink into them between the two models. Still: a structure has no
   clock. The Lewis structures are the book's: the alkanes straight with
   hydrogen atoms above and below, the alkenes in 120° zigzags, the
   methyl groups of 2-butene condensed as the book prints them.
===================================================================== */
(function () {
  const H = 440, d = sim('sim-hydrocarbon-models', H);
  const AL = (n) => ({ C: zigzag(n), B: chainBonds(n) });
  function methylpropane() {
    const C = zigzag(3), a = unit(sub(C[0], C[1])), b = unit(sub(C[2], C[1]));
    const m = unit(mul(add(a, b), -1)), nrm = unit(cross(a, b)), h = TET / 2;
    C.push(add(C[1], mul(add(mul(m, Math.cos(h)), mul(nrm, Math.sin(h))), 1.54)));
    return { C, B: [[0, 1, 1], [1, 2, 1], [1, 3, 1]] };
  }
  const D2 = 1.34;
  const ene = (C) => ({ C, B: C.slice(1).map((_, i) => [i, i + 1, i === 0 ? 2 : 1]) });
  const MOL = {
    methane: { name: 'methane', kind: 'alkane', n: 1, cond: '\\text{CH}_4', mf: '\\text{CH}_4', g3: { C: [[0, 0, 0]], B: [] }, g2: [[0, 0]],
      head: 'In methane, CH₄, one carbon atom bonds to four hydrogen atoms, which point to the corners of a tetrahedron.' },
    ethane: { name: 'ethane', kind: 'alkane', n: 2, cond: '\\text{CH}_3\\text{CH}_3', mf: '\\text{C}_2\\text{H}_6', g3: AL(2), g2: [[0, 0], [1, 0]],
      head: 'Ethane’s two carbon atoms share a single bond, and each bonds to three hydrogen atoms.' },
    butane: { name: 'n-butane', kind: 'alkane', n: 4, cond: '\\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{CH}_3', mf: '\\text{C}_4\\text{H}_{10}', g3: AL(4), g2: [[0, 0], [1, 0], [2, 0], [3, 0]],
      head: 'The four carbon atoms of $n$-butane form an unbranched chain: none bonds to more than two others.' },
    pentane: { name: 'pentane', kind: 'alkane', n: 5, cond: '\\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{CH}_2\\text{CH}_3', mf: '\\text{C}_5\\text{H}_{12}', g3: AL(5), g2: [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]],
      head: 'Bond angles of about 109.5° give pentane’s chain a zigzag shape, though its Lewis structure draws it straight.' },
    methylpropane: { name: '2-methylpropane', kind: 'alkane', n: 4, cond: '\\text{CH}_3\\text{CH(CH}_3)\\text{CH}_3', mf: '\\text{C}_4\\text{H}_{10}', g3: methylpropane(), g2: [[0, 0], [1, 0], [2, 0], [1, -1]],
      head: 'The central carbon atom of 2-methylpropane bonds to three other carbon atoms, so its chain is branched.' },
    ethene: { name: 'ethene', kind: 'alkene', cond: '\\text{CH}_2{=}\\text{CH}_2', mf: '\\text{C}_2\\text{H}_4', g3: ene([[0, 0, 0], [D2, 0, 0]]),
      head: 'Each carbon atom of ethene is trigonal planar, and all six atoms lie in one plane.' },
    propene: { name: 'propene', kind: 'alkene', cond: '\\text{CH}_2{=}\\text{CHCH}_3', mf: '\\text{C}_3\\text{H}_6', g3: (() => { const a = [0, 0, 0], b = add(a, mul(dir(30), D2)); return ene([a, b, add(b, mul(dir(-30), 1.5))]); })(),
      head: 'Propene’s double bond joins its first two carbon atoms; the third belongs to a methyl group.' },
    butene1: { name: '1-butene', kind: 'alkene', cond: '\\text{CH}_2{=}\\text{CHCH}_2\\text{CH}_3', mf: '\\text{C}_4\\text{H}_8',
      g3: (() => { const a = [0, 0, 0], b = add(a, mul(dir(30), D2)), c = add(b, mul(dir(-30), 1.51)); return ene([a, b, c, add(c, mul(dir(150 - TET / RAD), 1.54))]); })(),
      head: 'In 1-butene the double bond lies between carbon atoms 1 and 2 of a four-carbon chain.' },
    cis: { name: 'cis-2-butene', kind: 'alkene', cond: '\\textit{cis}\\text{-CH}_3\\text{CH}{=}\\text{CHCH}_3', mf: '\\text{C}_4\\text{H}_8', cond2: true,
      g3: (() => { const b = [-D2 / 2, 0, 0], c = [D2 / 2, 0, 0]; return { C: [add(b, mul(dir(240), 1.5)), b, c, add(c, mul(dir(300), 1.5))], B: [[0, 1, 1], [1, 2, 2], [2, 3, 1]] }; })(),
      head: 'In $cis$-2-butene both methyl groups lie on the same side of the rigid double bond.' },
    trans: { name: 'trans-2-butene', kind: 'alkene', cond: '\\textit{trans}\\text{-CH}_3\\text{CH}{=}\\text{CHCH}_3', mf: '\\text{C}_4\\text{H}_8', cond2: true,
      g3: (() => { const b = [-D2 / 2, 0, 0], c = [D2 / 2, 0, 0]; return { C: [add(b, mul(dir(240), 1.5)), b, c, add(c, mul(dir(60), 1.5))], B: [[0, 1, 1], [1, 2, 2], [2, 3, 1]] }; })(),
      head: 'In $trans$-2-butene the methyl groups lie on opposite sides of the rigid double bond.' },
  };
  Object.values(MOL).forEach((m) => { m.m3 = hydrogens(m.g3.C, m.g3.B); });
  const KEYS = Object.keys(MOL);
  const mol = F.select(d.controls, { label: '\\text{molecule}', key: 'molecule', aria: 'the molecule', value: 'pentane',
    options: KEYS.map((k) => ({ value: k, label: MOL[k].name })), onInput: () => V.show() });
  const model = F.choice(d.controls, { label: '\\text{model}', key: 'model', aria: 'the Lewis structure or a model to turn', value: 'lewis',
    options: [{ value: 'lewis', label: 'Lewis' }, { value: 'ball', label: 'ball-and-stick' }, { value: 'fill', label: 'space-filling' }], onInput: () => V.show() });
  let hits = []; F.hover(d.stage, () => (model.value === 'lewis' ? hits : []));

  /* ---------- the Lewis structure ---------- */
  const U = 74, CX = 700, CY = 262, S2 = 70;   /* 74 units a grid step for the alkanes; 70 units an ångström for the alkenes */
  function lewisOf(k) {
    const m = MOL[k];
    if (m.kind === 'alkane') {
      const cc = m.m3.bonds.filter(([i, j]) => m.m3.atoms[i].el === 'C' && m.m3.atoms[j].el === 'C').map(([i, j]) => [i, j]);
      const g = grid(m.g2, cc); return { atoms: place(g, CX, CY, U), bonds: g.bonds.map(([i, j, o]) => [i, j, o, 3]) };
    }
    /* an alkene lies in the plane of the page: its carbon atoms where the model has them, a hydrogen atom of an sp² carbon where
       the model has it, the three of a methyl group spread about the bond's far side; 2-butene's methyl groups condensed */
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
      const dirs = nb.length === 1 ? [[-u[0], -u[1]], [-u[1], u[0]], [u[1], -u[0]]]
        : (() => { const w = unit(sub(A[nb[1]].p, A[c].p)), mm = unit([-(u[0] + w[0]), -(u[1] + w[1]), 0]); return [-40, 40].map((g) => [mm[0] * Math.cos(g * RAD) - mm[1] * Math.sin(g * RAD), mm[0] * Math.sin(g * RAD) + mm[1] * Math.cos(g * RAD)]); })();
      mine.forEach((j, q) => { const v = dirs[q]; bonds.push([ci, atoms.length, 1, 3]); atoms.push({ s: 'H', x: A[c].p[0] + v[0] * 1.09, y: -A[c].p[1] - v[1] * 1.09, h: j }); });
    });
    const xs = atoms.map((t) => t.x), ys = atoms.map((t) => t.y), ox = (Math.min(...xs) + Math.max(...xs)) / 2, oy = (Math.min(...ys) + Math.max(...ys)) / 2;
    atoms.forEach((t) => { t.x = CX + (t.x - ox) * S2; t.y = CY + (t.y - oy) * S2; });
    return { atoms, bonds };
  }
  const NAME = { C: 'carbon atom', H: 'hydrogen atom' };
  function draw2d() {
    const { ctx } = begin(d.c); hits = [];
    headline(ctx, MOL[mol.value].head);
    KEYS.forEach((k) => mol.only(ctx, k, () => {
      const L = lewisOf(k); lewis(ctx, L.atoms, L.bonds);
      if (k === mol.value) L.atoms.forEach((t) => hits.push({ x: t.x, y: t.y, r: 20, name: `${t.s === 'H' ? NAME.H : t.s === 'C' ? NAME.C : 'methyl group, CH₃'} of ${MOL[k].name}` }));
    }, [0, 10]));
  }

  /* ---------- the models ---------- */
  const RB = { C: 0.36, H: 0.24 }, RF = { C: 1.55, H: 1.1 };
  let g = null;
  function mount() {
    const v = F.view3d(d.stage, { h: H, dist: 15, tilt: 0.12, spin: 'idle', pitch: [-1.4, 1.4], yaw: 'free', zoomMin: 0.6, zoomMax: 2.4,
      views: [{ label: 'front', yaw: 0, pitch: 0 }, { label: 'end on', yaw: Math.PI / 2, pitch: 0.12 }] });
    g = v.part(0); g.position.y = -0.55; return v;
  }
  function draw3d(v) {
    if (!v.scene) return;
    v.clear();
    const m = MOL[mol.value].m3, from = model.from === 'lewis' ? model.value : model.from;
    const k = model.k >= 1 || from === model.value ? (model.value === 'fill' ? 1 : 0) : lerp(from === 'fill' ? 1 : 0, model.value === 'fill' ? 1 : 0, model.k);
    m.atoms.forEach((t, i) => v.pickable(F.mesh.sphere(g, t.p, lerp(RB[t.el], RF[t.el], k), F.el(t.el)), `${NAME[t.el]} of ${MOL[mol.value].name}`));
    if (k < 0.92) m.bonds.forEach(([a, b, o]) => F.mesh.bond(g, m.atoms[a].p, m.atoms[b].p, o, 0.09 * (1 - k), PAL.muted));
    v.headline(MOL[mol.value].head);
    v.invalidate();
  }
  const V = views(d, () => model.value !== 'lewis', mount, draw);
  function draw() {
    if (model.value !== 'lewis' && V.v) draw3d(V.v); else draw2d();
    const m = MOL[mol.value];
    tex(d.readout, m.kind === 'alkane'
      ? `${m.cond === m.mf ? m.mf : `${m.cond}\\;:\\;${m.mf}`} = \\text{C}_{n}\\text{H}_{2n+2},\\quad n = ${m.n}`
      : `${m.cond}\\;:\\;${m.mf}`);
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
  const H = 470, d = sim('sim-line-structures', H);
  /* main chain C1 to C6 left to right; C7 the methyl group above C2; C8 and C9 the ethyl group below C3 */
  const CS = [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [1, -1], [2, 1], [2, 2]];
  const CC = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [1, 6], [2, 7], [7, 8]];
  const G = grid(CS, CC);
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
  const CX = 700, CY = 285;
  /* each drawing as numbers: per carbon its point and how far its label shows; per hydrogen its point and opacity */
  function state(rep) {
    if (rep === 'skeletal') {
      const xs = SKEL.map((p) => p[0]), ys = SKEL.map((p) => p[1]), ox = (Math.min(...xs) + Math.max(...xs)) / 2, oy = (Math.min(...ys) + Math.max(...ys)) / 2;
      const P = SKEL.map(([x, y]) => [CX + x - ox, CY + y - oy]);
      return { c: P.flat(), lab: CS.map(() => 0), cond: CS.map(() => 0), h: G.atoms.filter((t) => t.s === 'H').flatMap((t) => [...P[t.on], 0]) };
    }
    const sx = rep === 'expanded' ? 70 : 118, sy = rep === 'expanded' ? 62 : 74;
    const at = G.atoms.map((t) => ({ x: CX + (t.gx - 2.5) * sx, y: CY + (t.gy - 0.5) * sy }));
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
      hits.push({ x, y, r: 22, name: `carbon atom ${i < 6 ? `${i + 1} of the main chain` : i === 6 ? 'of the methyl group on carbon 2' : 'of the ethyl group on carbon 3'}` });
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
    tex(d.readout, '\\text{C}_{9}\\text{H}_{20} = \\text{C}_{n}\\text{H}_{2n+2},\\quad n = 9');
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
  const H = 640, d = sim('sim-alkane-trend', H);
  const T = [
    [1, 'methane', -182.5, -161.5, 'gas'], [2, 'ethane', -183.3, -88.6, 'gas'], [3, 'propane', -187.7, -42.1, 'gas'], [4, 'butane', -138.3, -0.5, 'gas'],
    [5, 'pentane', -129.7, 36.1, 'liquid'], [6, 'hexane', -95.3, 68.7, 'liquid'], [7, 'heptane', -90.6, 98.4, 'liquid'], [8, 'octane', -56.8, 125.7, 'liquid'],
    [9, 'nonane', -53.6, 150.8, 'liquid'], [10, 'decane', -29.7, 174.0, 'liquid'], [14, 'tetradecane', 5.9, 253.5, 'solid'], [18, 'octadecane', 28.2, 316.1, 'solid'],
  ];
  const NS = T.map((r) => r[0]);
  const near = (x) => NS.reduce((b, n) => (Math.abs(n - x) < Math.abs(b - x) ? n : b), NS[0]);
  const N = F.ctl(d.controls, { label: '\\text{carbon atoms}', cls: '', key: 'carbons', min: 1, max: 18, step: 1, value: 5, unit: '', dec: 0, aria: 'number of carbon atoms in the chain',
    detents: NS, onInput: () => { const n = near(N.v); if (n !== N.v) N.set(n); } });
  const box = { l: 170, r: 1320, t: 270, b: 560 };
  let hits = []; F.hover(d.stage, () => hits);
  const deg = (v) => `${minus(v.toFixed(1))} °C`;
  function draw() {
    const { ctx } = begin(d.c); hits = [];
    const n = near(N.v), row = T.find((r) => r[0] === n), [, name, mp, bp, phase] = row, cT = C('temperature');
    const verb = phase === 'gas' ? `boils at ${deg(bp)}, below 0 °C, so it is a gas at STP`
      : phase === 'liquid' ? `melts at ${deg(mp)} and boils at ${deg(bp)}, either side of 0 °C, so it is a liquid at STP`
      : `melts at ${deg(mp)}, above 0 °C, so it is a solid at STP`;
    const lines = headline(ctx, `${name[0].toUpperCase() + name.slice(1)} ${verb}.`);
    const lab = F.labeller(ctx, H, { headline: lines });
    /* the chain: n carbon atoms zigzagging at 109.5°, its hydrogen atoms left out as a skeletal structure leaves them */
    const step = Math.min(62, 1080 / Math.max(1, n - 1)), amp = step * 0.36, y0 = 180, x0 = 700 - ((n - 1) * step) / 2;
    const P = Array.from({ length: n }, (_, i) => [x0 + i * step, y0 + (i % 2 ? -amp : amp)]);
    P.slice(1).forEach((p, i) => line(ctx, P[i][0], P[i][1], p[0], p[1], PAL.ink, 3));
    P.forEach(([x, y], i) => { atom(ctx, x, y, 'C', 13); hits.push({ x, y, r: 15, name: `carbon atom ${i + 1} of ${name}` }); });
    const { X, Y } = F.axes(ctx, box, [0, 19], [-200, 350], { nx: 19, ny: 11, xl: 'number of carbon atoms', yl: 'temperature (°C)', yc: cT, fx: (v) => (v % 2 ? '' : fmt(v, 0)), fy: (v) => minus(fmt(v, 0)) });
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
    lab.add('boiling point', X(18), Y(316.1), -1, -1, cT, 22, 22);
    lab.add('melting point', X(18), Y(28.2), -1, -1, cT, 22, 22);
    lab.flush();
    const sub = (k) => (k > 1 ? `_{${k}}` : '');
    tex(d.readout, `\\text{${name}, C}${sub(n)}\\text{H}_{${2 * n + 2}}\\text{:}\\quad \\text{melting point } ${hue('temperature', `${mp.toFixed(1).replace('-', '{-}')}\\ ^\\circ\\text{C}`)},\\quad \\text{boiling point } ${hue('temperature', `${bp.toFixed(1).replace('-', '{-}')}\\ ^\\circ\\text{C}`)}`);
  }
  still(d, draw);
})();

/* =====================================================================
   FIGURE 20.4 with the book's C4H10 isomers: n-butane drawn four ways,
   the same atoms sliding from one drawing into the next with every bond
   kept, and 2-methylpropane beside it, whose central carbon atom bonds
   to three others. The book's red chain is a heavier stroke in ink.
   Still: four drawings of one molecule.
===================================================================== */
(function () {
  const H = 460, d = sim('sim-butane-drawings', H);
  const CC = [[0, 1], [1, 2], [2, 3]];
  const DRAW = {
    row: [[0, 0], [1, 0], [2, 0], [3, 0]],
    up: [[0, -1], [0, 0], [1, 0], [2, 0]],
    down: [[0, 1], [0, 0], [1, 0], [2, 0]],
    twice: [[0, -1], [0, 0], [1, 0], [1, 1]],
  };
  const HEAD = {
    row: 'Drawn in a row, $n$-butane is an unbranched chain of four carbon atoms.',
    up: 'Bent up at one end, the chain still runs through four carbon atoms, none bonded to more than two others.',
    down: 'Bent down instead, it is the same chain, with the same atoms bonded to the same atoms.',
    twice: 'Bent at both ends, it is still $n$-butane: an unbranched chain of four carbon atoms.',
  };
  const pick = F.choice(d.controls, { label: '\\text{n-butane drawn}', key: 'drawing', aria: 'how n-butane is drawn', value: 'row',
    options: [{ value: 'row', label: 'in a row' }, { value: 'up', label: 'bent up' }, { value: 'down', label: 'bent down' }, { value: 'twice', label: 'bent twice' }] });
  const U = 64, LX = 440, RX = 1060, CY = 250;
  const iso = place(grid([[0, 0], [1, 0], [2, 0], [1, -1]], [[0, 1], [1, 2], [1, 3]]), RX, CY, U);
  const isoB = grid([[0, 0], [1, 0], [2, 0], [1, -1]], [[0, 1], [1, 2], [1, 3]]).bonds;
  const posOf = (k) => place(grid(DRAW[k], CC), LX, CY, U).flatMap((t) => [t.x, t.y]);
  const bonds = grid(DRAW.row, CC).bonds;
  let hits = []; F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c); hits = [];
    headline(ctx, HEAD[pick.value]);
    const P = pick.mix(posOf), base = grid(DRAW.row, CC).atoms;
    const atoms = base.map((t, i) => ({ s: t.s, x: P[2 * i], y: P[2 * i + 1] }));
    lewis(ctx, atoms, bonds, { size: 26 });
    lewis(ctx, iso, isoB, { size: 26 });
    line(ctx, 750, 110, 750, 400, alpha(PAL.ink, 0.25), 2);
    text(ctx, 'n-butane', LX, 428, PAL.ink, { size: 22, weight: 600, align: 'center' });
    text(ctx, '2-methylpropane', RX, 428, PAL.ink, { size: 22, weight: 600, align: 'center' });
    atoms.forEach((t, i) => hits.push({ x: t.x, y: t.y, r: 20, name: t.s === 'C' ? `carbon atom ${i + 1} of n-butane, bonded to ${i === 0 || i === 3 ? 'one other carbon atom' : 'two other carbon atoms'}` : 'hydrogen atom of n-butane' }));
    iso.forEach((t, i) => hits.push({ x: t.x, y: t.y, r: 20, name: t.s === 'C' ? `carbon atom of 2-methylpropane, bonded to ${i === 1 ? 'three other carbon atoms' : 'one other carbon atom'}` : 'hydrogen atom of 2-methylpropane' }));
    tex(d.readout, '\\text{C–C bonds of each carbon atom:}\\quad n\\text{-butane } 1, 2, 2, 1;\\quad \\text{2-methylpropane } 1, 3, 1, 1');
  }
  still(d, draw);
})();

/* =====================================================================
   FIGURE 20.5: the eight alkyl groups of the book's listing. The alkane
   each comes from is drawn as a Lewis structure with every hydrogen atom
   in the removed one's environment ringed, the removed one gone and its
   bond left open; beside it the group in the book's condensed form, its
   open bond in the same direction. Still: a choice of group, no clock.
===================================================================== */
(function () {
  const H = 460, d = sim('sim-alkyl-groups', H);
  const PARENT = {
    methane: { name: 'methane', mf: '\\text{CH}_4', C: [[0, 0]], B: [] },
    ethane: { name: 'ethane', mf: '\\text{C}_2\\text{H}_6', C: [[0, 0], [1, 0]], B: [[0, 1]] },
    propane: { name: 'propane', mf: '\\text{C}_3\\text{H}_8', C: [[0, 0], [1, 0], [2, 0]], B: [[0, 1], [1, 2]] },
    butane: { name: 'butane', mf: '\\text{C}_4\\text{H}_{10}', C: [[0, 0], [1, 0], [2, 0], [3, 0]], B: [[0, 1], [1, 2], [2, 3]] },
    methylpropane: { name: '2-methylpropane', mf: '\\text{C}_4\\text{H}_{10}', C: [[0, 0], [1, 0], [2, 0], [1, -1]], B: [[0, 1], [1, 2], [1, 3]] },
  };
  /* the group: its alkane, the carbon atom that loses a hydrogen atom and which side, and the carbon atoms whose hydrogen atoms share its environment */
  const GROUP = {
    methyl: { name: 'methyl', p: 'methane', c: 0, side: [1, 0], eq: [0], mf: '\\text{–CH}_3' },
    ethyl: { name: 'ethyl', p: 'ethane', c: 1, side: [1, 0], eq: [0, 1], mf: '\\text{–C}_2\\text{H}_5' },
    npropyl: { name: 'n-propyl', p: 'propane', c: 2, side: [1, 0], eq: [0, 2], mf: '\\text{–C}_3\\text{H}_7' },
    isopropyl: { name: 'isopropyl', p: 'propane', c: 1, side: [0, -1], eq: [1], mf: '\\text{–C}_3\\text{H}_7' },
    nbutyl: { name: 'n-butyl', p: 'butane', c: 3, side: [1, 0], eq: [0, 3], mf: '\\text{–C}_4\\text{H}_9' },
    secbutyl: { name: 'sec-butyl', p: 'butane', c: 2, side: [0, -1], eq: [1, 2], mf: '\\text{–C}_4\\text{H}_9' },
    isobutyl: { name: 'isobutyl', p: 'methylpropane', c: 2, side: [1, 0], eq: [0, 2, 3], mf: '\\text{–C}_4\\text{H}_9' },
    tertbutyl: { name: 'tert-butyl', p: 'methylpropane', c: 1, side: [0, 1], eq: [1], mf: '\\text{–C}_4\\text{H}_9' },
  };
  const KEYS = Object.keys(GROUP);
  const pick = F.select(d.controls, { label: '\\text{alkyl group}', key: 'group', aria: 'the alkyl group', value: 'isopropyl',
    options: KEYS.map((k) => ({ value: k, label: GROUP[k].name })) });
  const WORD = ['no other carbon atom', 'one other carbon atom', 'two other carbon atoms', 'three other carbon atoms'];
  const NUM = ['no', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  const U = 74, LX = 400, RX = 1060, CY = 255;
  let hits = []; F.hover(d.stage, () => hits);
  function scene(ctx, k, live) {
    const gr = GROUP[k], p = PARENT[gr.p], G = grid(p.C, p.B), A = place(G, LX, CY, U);
    const gone = G.atoms.findIndex((t) => t.s === 'H' && t.on === gr.c && t.side[0] === gr.side[0] && t.side[1] === gr.side[1]);
    /* the removed hydrogen atom stays as a faint ring where it was, its bond open */
    lewis(ctx, A.map((t, i) => (i === gone ? { ...t, a: 0.22 } : t)), G.bonds.map((b) => (b[1] === gone ? [b[0], b[1], 1, 3, 0.22] : b)), { size: 26 });
    const ring = A.filter((t) => t.s === 'H' && gr.eq.includes(t.on));
    ring.forEach((t) => { ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2.5; ctx.setLineDash(t === A[gone] ? [5, 5] : []); ctx.beginPath(); ctx.arc(t.x, t.y, 17, 0, TAU); ctx.stroke(); ctx.restore(); });
    /* the group, condensed: each carbon atom written with the hydrogen atoms it keeps */
    const left = G.hs.map((h) => h.filter((j) => j !== gone).length), cs = p.C.map(([x, y]) => [x * 1.7, y]);
    const xs = cs.map((c) => c[0]), ys = cs.map((c) => c[1]), ox = (Math.min(...xs) + Math.max(...xs)) / 2, oy = (Math.min(...ys) + Math.max(...ys)) / 2;
    const Q = cs.map(([x, y], i) => ({ s: left[i] === 0 ? 'C' : left[i] === 1 ? 'CH' : `CH_{${left[i]}}`, x: RX + (x - ox) * U, y: CY + (y - oy) * U }));
    const end = { s: '', x: Q[gr.c].x + gr.side[0] * U * 1.1, y: Q[gr.c].y + gr.side[1] * U * 0.95 };
    lewis(ctx, [...Q, end], [...p.B.map(([a, b]) => [a, b, 1, 3]), [gr.c, Q.length, 1, 3]], { size: 26 });
    text(ctx, p.name, LX, 430, PAL.ink, { size: 22, weight: 600, align: 'center' });
    text(ctx, gr.name, RX, 430, PAL.ink, { size: 22, weight: 600, align: 'center' });
    if (live) {
      A.forEach((t, i) => hits.push({ x: t.x, y: t.y, r: 20, name: t.s === 'C' ? `carbon atom of ${p.name}` : i === gone ? `the hydrogen atom removed to form the ${gr.name} group` : gr.eq.includes(t.on) ? `a hydrogen atom in the same environment as the removed one` : `a hydrogen atom of ${p.name} in another environment` }));
      Q.forEach((q) => hits.push({ x: q.x, y: q.y, r: 24, name: `${q.s.replace('_{', '').replace('}', '')} of the ${gr.name} group` }));
      hits.push({ x: end.x, y: end.y, r: 18, name: 'the open bond, where the group bonds to another atom' });
    }
  }
  function draw() {
    const { ctx } = begin(d.c); hits = [];
    const gr = GROUP[pick.value], p = PARENT[gr.p], G = grid(p.C, p.B);
    const n = G.atoms.filter((t) => t.s === 'H' && gr.eq.includes(t.on)).length;
    const bonded = p.B.filter(([a, b]) => a === gr.c || b === gr.c).length;
    headline(ctx, n === 1 ? `Removing the one hydrogen atom of ${p.name}’s central carbon atom, bonded to ${WORD[bonded]}, gives the ${gr.name} group.`
      : `Removing any one of the ${NUM[n]} ringed hydrogen atoms of ${p.name}, each on a carbon atom bonded to ${WORD[bonded]}, gives the ${gr.name} group.`);
    F.arrow(ctx, 690, CY, 790, CY, PAL.ink, 4);
    text(ctx, '− H', 740, CY - 30, PAL.ink, { size: 22, align: 'center' });
    KEYS.forEach((k) => pick.only(ctx, k, () => scene(ctx, k, k === pick.value), [0, 10]));
    tex(d.readout, `\\text{${p.name}, }${p.mf}\\;-\\;\\text{H}\\;\\longrightarrow\\;\\text{${gr.name}, }${gr.mf}`);
  }
  still(d, draw);
})();

/* =====================================================================
   FIGURE 20.6: fractional distillation, the book's cutaway set moving.
   Crude oil runs into the furnace and, at about 425 °C, into the base of
   the tower; its molecules, drawn as zigzags of carbon atoms, rise until
   the tower is cooler than their boiling points, condense on a tray and
   run off its pipe. The smallest leave at the top as refinery gas; the
   largest never vaporize and drain from the bottom as residue. The book
   gives no boiling range for a fraction, so the drawn chain lengths only
   order the fractions. Moving: a 6 s clock, every path periodic in it.
===================================================================== */
(function () {
  const H = 640, d = sim('sim-fractional-distillation', H);
  const TL = 560, TR = 780, TT = 92, TB = 600, MX = (TL + TR) / 2;
  const FR = [
    { name: 'refinery gas', y: 134, n: 2 }, { name: 'gasoline', y: 192, n: 5 }, { name: 'naphtha', y: 262, n: 7 }, { name: 'kerosene', y: 332, n: 9 },
    { name: 'diesel oil', y: 402, n: 11 }, { name: 'fuel oil', y: 472, n: 13 }, { name: 'residue', y: 588, n: 16 },
  ];
  const TRAYS = [212, 282, 352, 422, 492];
  const INLET = 540, FUR = { l: 250, r: 420, t: 470, b: 600 };
  const PX = 900;                                   /* the end of the draw-off pipes */
  const cy = F.cycle(() => 6, 0);
  /* a molecule's path: in from the crude oil pipe, through the furnace, into the tower, up (or down) to its draw-off, out the pipe */
  function path(c) {
    const f = FR[c], bottom = c === FR.length - 1;
    const pts = [[70, 568], [FUR.l, 568], [FUR.r - 20, 540], [TL, INLET], [MX, INLET]];
    if (bottom) pts.push([MX, f.y - 6], [TR, f.y], [PX, f.y]);
    else pts.push([MX + (c % 2 ? 26 : -26), (f.y + INLET) / 2], [MX, f.y + 22], [TR - 10, f.y], [PX, f.y]);
    const seg = pts.slice(1).map((p, i) => Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]));
    const total = seg.reduce((a, b) => a + b, 0);
    const upto = (m) => seg.slice(0, m).reduce((a, b) => a + b, 0) / total;
    /* where the oil leaves the furnace as vapour, and where the vapour condenses (never, for refinery gas; the residue stays liquid) */
    return { pts, seg, total, boil: bottom ? 1 : upto(2), cond: c === 0 ? 1 : bottom ? 0 : upto(pts.length - 3) };
  }
  const PATHS = FR.map((_, c) => path(c));
  const at = (P, s) => {
    let L = s * P.total;
    for (let i = 0; i < P.seg.length; i++) { if (L <= P.seg[i]) { const k = L / P.seg[i], a = P.pts[i], b = P.pts[i + 1]; return [lerp(a[0], b[0], k), lerp(a[1], b[1], k)]; } L -= P.seg[i]; }
    return P.pts[P.pts.length - 1];
  };
  const MOLS = [];
  FR.forEach((_, c) => { for (let j = 0; j < 4; j++) MOLS.push({ c, ph: (j / 4 + c * 0.137) % 1 }); });
  let hits = []; F.hover(d.stage, () => hits);
  function chain(ctx, x, y, n, a) {
    const s = 7, w = (n - 1) * s;
    ctx.save(); ctx.globalAlpha *= a;
    for (let i = 0; i < n; i++) {
      const px = x - w / 2 + i * s, py = y + (i % 2 ? -3 : 3);
      if (i) line(ctx, px - s, y + ((i - 1) % 2 ? -3 : 3), px, py, PAL.ink, 1.5);
    }
    for (let i = 0; i < n; i++) atom(ctx, x - w / 2 + i * s, y + (i % 2 ? -3 : 3), 'C', 3.6);
    ctx.restore();
  }
  function draw() {
    const { ctx } = begin(d.c); hits = [];
    const cT = C('temperature'), t = cy.now() / 6;
    headline(ctx, 'Small molecules rise high before they condense; large ones condense low or never vaporize.');
    /* the crude oil pipe, the furnace and the pipe into the tower */
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2.5;
    ctx.strokeRect(FUR.l, FUR.t, FUR.r - FUR.l, FUR.b - FUR.t);
    [[40, 560, FUR.l, 560], [40, 576, FUR.l, 576], [FUR.r, 532, TL, 532], [FUR.r, 548, TL, 548]].forEach(([a, b, c2, e]) => line(ctx, a, b, c2, e, PAL.ink, 2.5));
    ctx.restore();
    text(ctx, 'furnace', (FUR.l + FUR.r) / 2, FUR.t - 46, PAL.ink, { size: 20, weight: 600, align: 'center' });
    text(ctx, 'about 425 °C', (FUR.l + FUR.r) / 2, FUR.t - 20, cT, { size: 20, weight: 600, align: 'center' });
    text(ctx, 'crude oil', 50, 535, PAL.ink, { size: 20, weight: 600 });
    /* the tower, its trays with bubble caps, and the draw-off pipes */
    ctx.save(); ctx.fillStyle = PAL.panel; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(TL, TB); ctx.lineTo(TL, TT + 30); ctx.quadraticCurveTo(TL, TT, MX, TT); ctx.quadraticCurveTo(TR, TT, TR, TT + 30); ctx.lineTo(TR, TB); ctx.closePath(); ctx.stroke(); ctx.restore();
    TRAYS.forEach((y) => {
      line(ctx, TL, y, TR, y, PAL.ink, 2.5);
      [TL + 45, MX, TR - 45].forEach((x) => { ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x, y - 2, 11, Math.PI, TAU); ctx.stroke(); ctx.restore(); });
    });
    FR.forEach((f) => {
      line(ctx, TR, f.y - 8, PX, f.y - 8, PAL.ink, 2.5); line(ctx, TR, f.y + 8, PX, f.y + 8, PAL.ink, 2.5);
      text(ctx, f.name, PX + 14, f.y, PAL.ink, { size: 20, weight: 600 });
      hits.push({ x: PX - 30, y: f.y, r: 16, name: `the pipe that draws off the ${f.name}` });
    });
    hits.push({ x: (FUR.l + FUR.r) / 2, y: (FUR.t + FUR.b) / 2, r: 60, name: 'the furnace, where crude oil is heated to about 425 °C' });
    /* the book's double arrow beside the tower, drawn on the temperature hue: strongest where the tower is hottest */
    const BX = 1110, BT = 150, BB = 560;
    const grad = ctx.createLinearGradient(0, BT, 0, BB); grad.addColorStop(0, alpha(cT, 0.12)); grad.addColorStop(1, alpha(cT, 0.85));
    ctx.save(); ctx.fillStyle = grad; ctx.fillRect(BX - 9, BT, 18, BB - BT); ctx.restore();
    text(ctx, 'cooler', BX, BT - 18, PAL.ink, { size: 18, align: 'center' });
    text(ctx, 'hotter', BX, BB + 22, PAL.ink, { size: 18, align: 'center' });
    [['Small molecules:', 'low boiling point,', 'very volatile, flows easily,', 'ignites easily'], ['Large molecules:', 'high boiling point,', 'not very volatile, does not', 'flow easily, does not', 'ignite easily']].forEach((ls, i) => {
      const y0 = i ? 430 : 170;
      ls.forEach((s, j) => text(ctx, s, BX + 30, y0 + j * 26, PAL.ink, { size: 18, weight: j ? 400 : 600 }));
    });
    /* the molecules: vapour as a bare chain, condensed liquid on a faint drop */
    MOLS.forEach((m) => {
      const P = PATHS[m.c], s = (t + m.ph) % 1, [x, y] = at(P, s), n = FR[m.c].n;
      const a = Math.min(1, s / 0.04, (1 - s) / 0.05);
      if (s < P.boil || s > P.cond) { ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = alpha(PAL.ink, 0.12); ctx.beginPath(); ctx.ellipse(x, y, n * 3.5 + 6, 10, 0, 0, TAU); ctx.fill(); ctx.restore(); }
      chain(ctx, x, y, n, a);
      hits.push({ x, y, r: n * 3.5 + 6, name: `a molecule of the ${FR[m.c].name}` });
    });
    tex(d.readout, '\\text{boiling point:}\\quad \\text{refinery gas} < \\text{gasoline} < \\text{naphtha} < \\text{kerosene} < \\text{diesel oil} < \\text{fuel oil} < \\text{residue}');
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();

/* =====================================================================
   FIGURE 20.11 with the book's two resonance structures: the double
   bonds slide round the ring from one resonance structure to the other,
   and at the third choice open into the circle. Built both ways (the
   book's rule): the flat Lewis drawing by default, and a ball-and-stick
   ring with the six unhybridized p orbitals above and below its plane,
   mounted on the first switch. Still: three structures, no clock.
===================================================================== */
(function () {
  const H = 500, d = sim('sim-benzene', H);
  const pick = F.choice(d.controls, { label: '\\text{structure}', key: 'structure', aria: 'the structure of benzene', value: 'form1',
    options: [{ value: 'form1', label: 'resonance 1' }, { value: 'form2', label: 'resonance 2' }, { value: 'circle', label: 'delocalized' }], onInput: () => V.show() });
  const VIEW = F.choice(d.controls, { label: '\\text{view}', options: VIEWS, value: '2d', aria: 'a flat drawing or a scene to turn', ms: 0, onInput: () => V.show() });
  const HEAD = {
    form1: 'In one resonance structure, three double bonds alternate with three single bonds around the ring.',
    form2: 'In the other, each double bond has moved to the next pair of carbon atoms.',
    circle: 'The six carbon-carbon bonds are equivalent, each between a single and a double bond, and the circle shows it.',
  };
  /* the state as numbers: the angle of the first double bond's midpoint and how far the three have opened into the circle */
  const ST = { form1: { base: 120, arc: 0 }, form2: { base: 180, arc: 0 }, circle: { base: 150, arc: 1 } };
  let hits = []; F.hover(d.stage, () => (VIEW.value === '2d' ? hits : []));
  const CX = 700, CY = 300, R = 96, RH = 166;
  function draw2d() {
    const { ctx } = begin(d.c); hits = [];
    headline(ctx, HEAD[pick.value]);
    const s = pick.mix((v) => ST[v]);
    const atoms = [], bonds = [];
    for (let k = 0; k < 6; k++) { const a = (90 + 60 * k) * RAD; atoms.push({ s: 'C', x: CX + R * Math.cos(a), y: CY - R * Math.sin(a) }); }
    for (let k = 0; k < 6; k++) { const a = (90 + 60 * k) * RAD; atoms.push({ s: 'H', x: CX + RH * Math.cos(a), y: CY - RH * Math.sin(a) }); bonds.push([k, (k + 1) % 6, 1, 3], [k, k + 6, 1, 3]); }
    lewis(ctx, atoms, bonds, { size: 28 });
    /* the three second lines: a chord inside a bond, bending into a third of the circle */
    for (let j = 0; j < 3; j++) {
      const mid = s.base + 120 * j, pts = [];
      for (let i = 0; i <= 24; i++) {
        const q = i / 24;
        const ch = (() => { const a1 = (mid - 21) * RAD, a2 = (mid + 21) * RAD, r = 76; return [lerp(r * Math.cos(a1), r * Math.cos(a2), q), lerp(r * Math.sin(a1), r * Math.sin(a2), q)]; })();
        const ar = (() => { const a = (mid - 60 + 120 * q) * RAD, r = 58; return [r * Math.cos(a), r * Math.sin(a)]; })();
        pts.push([CX + lerp(ch[0], ar[0], s.arc), CY - lerp(ch[1], ar[1], s.arc)]);
      }
      ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.beginPath(); pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.stroke(); ctx.restore();
    }
    atoms.forEach((t, i) => hits.push({ x: t.x, y: t.y, r: 22, name: i < 6 ? 'carbon atom, sp² hybridized' : 'hydrogen atom' }));
  }
  /* ---------- the ring in three dimensions ---------- */
  let g = null;
  function mount() {
    const v = F.view3d(d.stage, { h: H, dist: 15.5, tilt: 0.35, spin: 'idle', pitch: [-1.5, 1.5], yaw: 'free', zoomMin: 0.6, zoomMax: 2.4,
      views: [{ label: 'face on', yaw: 0, pitch: 0 }, { label: 'edge on', yaw: 0, pitch: 1.5 }] });
    g = v.part(0); g.position.y = -0.5; return v;
  }
  function draw3d(v) {
    if (!v.scene) return;
    v.clear();
    const RC = 1.39, RHH = 2.48, Cs = [], Hs = [];
    for (let k = 0; k < 6; k++) { const a = (90 + 60 * k) * RAD; Cs.push([RC * Math.cos(a), RC * Math.sin(a), 0]); Hs.push([RHH * Math.cos(a), RHH * Math.sin(a), 0]); }
    const st = pick.value;
    Cs.forEach((p, k) => {
      v.pickable(F.mesh.sphere(g, p, 0.34, F.el('C')), 'carbon atom, sp² hybridized');
      v.pickable(F.mesh.sphere(g, Hs[k], 0.24, F.el('H')), 'hydrogen atom');
      F.mesh.bond(g, p, Hs[k], 1, 0.08, PAL.muted);
      const dbl = st === 'form1' ? k % 2 === 0 : st === 'form2' ? k % 2 === 1 : false;
      F.mesh.bond(g, p, Cs[(k + 1) % 6], dbl ? 2 : 1, 0.08, PAL.muted);
      [[0, 0, 1], [0, 0, -1]].forEach((u) => v.pickable(F.mesh.lobe(g, p, u, 1.0, PAL.ink), 'a lobe of an unhybridized p orbital, perpendicular to the ring'));
    });
    if (st === 'circle') {
      const T3 = window.THREE;
      [0.85, -0.85].forEach((z) => {
        const m = new T3.Mesh(new T3.TorusGeometry(RC, 0.2, 12, 60), F.mesh.mat(PAL.ink, { transparent: true, opacity: 0.32 }));
        m.position.set(0, 0, z); g.add(m); v.pickable(m, `the delocalized π electrons, ${z > 0 ? 'above' : 'below'} the ring`);
      });
    }
    v.headline(HEAD[st]);
    v.invalidate();
  }
  const V = views(d, () => VIEW.value === '3d', mount, draw);
  function draw() {
    if (VIEW.value === '3d' && V.v) draw3d(V.v); else draw2d();
    tex(d.readout, pick.value === 'circle'
      ? '\\text{C}_6\\text{H}_6\\text{:}\\quad 6\\ \\text{equivalent C–C bonds, each between a single and a double bond}'
      : '\\text{C}_6\\text{H}_6\\text{:}\\quad 3\\ \\text{C–C single bonds} + 3\\ \\text{C=C double bonds}');
  }
  still(d, draw);
})();
};
