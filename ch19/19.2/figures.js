/* Figures for section 19.2 Coordination Chemistry of Transition Metals. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['19.2'] = function (root, F) {
const { PAL, register, text } = F;
const { sphere, stick, polyline } = F.mesh;
const T3 = window.THREE;
const sim = (id) => F.sim(root, id);
const still = (d, draw) => register(d.fig, { update: () => {}, draw });
const RAD = Math.PI / 180;

const V = {
  add: (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]],
  sub: (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]],
  mul: (a, k) => [a[0] * k, a[1] * k, a[2] * k],
  dot: (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2],
  cross: (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]],
  len: (a) => Math.hypot(a[0], a[1], a[2]),
  unit: (a) => { const l = Math.hypot(a[0], a[1], a[2]) || 1; return [a[0] / l, a[1] / l, a[2] / l]; },
  lerp: (a, b, k) => [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k],
};
const lerp = (a, b, k) => a + (b - a) * k;
/* any unit vector perpendicular to a */
const perp = (a) => V.unit(V.cross(a, Math.abs(a[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0]));
/* along the great circle from a to b; opposite directions go round by way of perp(a) */
function slerp(a, b, t) {
  const c = V.dot(a, b);
  if (c < -0.999) { const p = perp(a); return V.add(V.mul(a, Math.cos(Math.PI * t)), V.mul(p, Math.sin(Math.PI * t))); }
  const w = Math.acos(Math.min(1, c)); if (w < 1e-6) return a;
  const s = Math.sin(w); return V.add(V.mul(a, Math.sin((1 - t) * w) / s), V.mul(b, Math.sin(t * w) / s));
}
/* a ligand on its way from a to b bows out of the plane of the two, so two ligands that trade places pass each other */
const swing = (a, b, t) => { const n = V.cross(a, b); return V.unit(V.add(slerp(a, b, t), V.mul(V.len(n) > 1e-3 ? V.unit(n) : [0, 0, 0], 0.55 * Math.sin(Math.PI * t)))); };
/* a direction at polar angle th from straight up and azimuth az, measured from the reader's right round toward the reader */
const dirOf = (th, az) => [Math.sin(th * RAD) * Math.cos(az * RAD), Math.cos(th * RAD), Math.sin(th * RAD) * Math.sin(az * RAD)];
const rot = (p, n, a) => { const c = Math.cos(a), s = Math.sin(a), k = V.dot(n, p) * (1 - c); return V.add(V.add(V.mul(p, c), V.mul(V.cross(n, p), s)), V.mul(n, k)); };
const rotX = (p, a) => rot(p, [1, 0, 0], a);

/* a long lens, so an ion at the side of the stage is seen as squarely as one at its centre; returns the stage's logical units per scene unit */
const FOV = 14;
function lens(v, HS, DIST) {
  if (v.camera && v.camera.isPerspectiveCamera) { v.camera.fov = FOV; v.camera.updateProjectionMatrix(); }
  return HS / (2 * DIST * Math.tan((FOV / 2) * RAD));
}

/* ---------- atoms in the book's palette, each bond two half sticks in its atoms' colours ---------- */
const RADIUS = { M: 0.42, H: 0.15, C: 0.25, N: 0.25, O: 0.26, F: 0.23, Cl: 0.32 };
const rad = (s) => RADIUS[s] || RADIUS.M;
const METAL = { Ag: 'silver', Cu: 'copper', Zn: 'zinc', Ni: 'nickel', Pt: 'platinum', Co: 'cobalt', V: 'vanadium', Cr: 'chromium', Zr: 'zirconium', Re: 'rhenium', Mo: 'molybdenum', M: 'a metal ion' };
const fade = (a) => (a < 0.999 ? { transparent: true, opacity: a } : undefined);
const plain = (e, a) => { e.style.opacity = String(Math.max(0, Math.min(1, a))); return e; };
const hued = (e, type) => { e.style.color = F.C(type); return e; };
const colOf = (t, k) => (t.from && t.from !== t.sym ? F.mixColor(F.el(t.from), F.el(t.sym), k) : F.el(t.sym));
/* atoms [{sym, from, p (scene units), a, name, s}] and bonds [{i, j, a}]; whole is the opacity of the whole ion */
function molecule(v, g, atoms, bonds, k, whole = 1) {
  atoms.forEach((t) => {
    if (t.a * whole <= 0.01 || t.hide) return;
    const r = (t.from && t.from !== t.sym ? lerp(rad(t.from), rad(t.sym), k) : rad(t.sym)) * (0.3 + 0.7 * t.a) * (t.s || 1);
    v.pickable(sphere(g, t.p, r, colOf(t, k), fade(t.a * whole)), t.name);
  });
  bonds.forEach(({ i, j, a }) => {
    const A = atoms[i], B = atoms[j]; if (a * whole <= 0.01 || (A.hide && B.hide)) return;
    const m = V.lerp(A.p, B.p, 0.5), w = 0.07 * Math.min(A.s || 1, B.s || 1);
    stick(g, A.p, m, w, colOf(A, k), fade(a * whole));
    stick(g, m, B.p, w, colOf(B, k), fade(a * whole));
  });
}

/* ---------- ligands: each set out along its donor direction d at distance r (Å) ---------- */
const T = (sym, along, side, name) => ({ sym, along, side, name });
const LIG = {
  NH3: { atoms: [T('N', 0, 0, 'ammine ligand: nitrogen (N), the donor atom'), ...[0, 120, 240].map((az) => T('H', 1.01 * Math.cos(70.5 * RAD), [1.01 * Math.sin(70.5 * RAD), az], 'hydrogen (H) of an ammine ligand'))], bonds: [[0, 1], [0, 2], [0, 3]] },
  OH2: { atoms: [T('O', 0, 0, 'aqua ligand: oxygen (O), the donor atom'), ...[0, 180].map((az) => T('H', 0.96 * Math.cos(52 * RAD), [0.96 * Math.sin(52 * RAD), az], 'hydrogen (H) of an aqua ligand'))], bonds: [[0, 1], [0, 2]] },
  Cl: { atoms: [T('Cl', 0, 0, 'chloride ligand (Cl), a donor atom')], bonds: [] },
  F: { atoms: [T('F', 0, 0, 'fluoride ligand (F), a donor atom')], bonds: [] },
  O: { atoms: [T('O', 0, 0, 'oxo ligand (O), a donor atom')], bonds: [] },
  CN: { atoms: [T('C', 0, 0, 'cyanide ligand: carbon (C), the donor atom'), T('N', 1.16, 0, 'nitrogen (N) of a cyanide ligand')], bonds: [[0, 1]] },
  CO: { atoms: [T('C', 0, 0, 'carbonyl ligand: carbon (C), the donor atom'), T('O', 1.13, 0, 'oxygen (O) of a carbonyl ligand')], bonds: [[0, 1]] },
  en: { atoms: [T('N', 0, 0, 'ethylenediamine (en): nitrogen (N) of an NH₂ group, a donor atom; its hydrogen atoms are not drawn')], bonds: [] },
};
/* the atoms of one ligand at donor direction d, distance r Å, scale K */
function ligandAtoms(type, d, r, K) {
  const u = perp(d), w = V.cross(d, u), base = V.mul(d, r);
  return LIG[type].atoms.map((t) => {
    let p = V.add(base, V.mul(d, t.along));
    if (t.side) { const [s, az] = t.side; p = V.add(p, V.add(V.mul(u, s * Math.cos(az * RAD)), V.mul(w, s * Math.sin(az * RAD)))); }
    return { sym: t.sym, p: V.mul(p, K), name: t.name };
  });
}
/* the two CH₂ carbons of an en ring closing sites a and b */
function enCarbons(a, b, r, K) {
  const ca = V.add(V.mul(a, r), V.mul(V.unit(V.add(b, V.mul(a, 0.3))), 1.48)), cb = V.add(V.mul(b, r), V.mul(V.unit(V.add(a, V.mul(b, 0.3))), 1.48));
  return [ca, cb].map((p) => ({ sym: 'C', p: V.mul(p, K), name: 'ethylenediamine (en): carbon (C) of a CH₂ group; its hydrogen atoms are not drawn' }));
}
/* the two hydrogen atoms on an atom at p whose other two bonds go to n1 and n2 */
function twoH(p, n1, n2, len) {
  const u1 = V.unit(V.sub(n1, p)), u2 = V.unit(V.sub(n2, p)), b = V.unit(V.mul(V.add(u1, u2), -1)), w = V.unit(V.cross(u1, u2));
  return [1, -1].map((sg) => V.add(p, V.add(V.mul(b, len * Math.cos(54.75 * RAD)), V.mul(w, sg * len * Math.sin(54.75 * RAD)))));
}

/* A complex as slots: sites [{d, type, r}] (a slot may be null) and en bridges [[i, j]]. Two states blend at k:
   a ligand in both swings to its new corner, one only in the old shrinks into the metal, one only in the new grows out of it.
   With o.H the hydrogen atoms of each en are drawn too. */
function blend(A, B, k, K, o = {}) {
  const at = [0, 0, 0];
  const atoms = [{ sym: B.metal, from: A.metal, p: at, a: 1, name: `${METAL[k < 0.5 ? A.metal : B.metal]} (${k < 0.5 ? A.metal : B.metal}), the central metal` }];
  const bonds = [], donors = [];
  const n = Math.max(A.sites.length, B.sites.length);
  for (let s = 0; s < n; s++) {
    const a = A.sites[s], b = B.sites[s];
    if (!a && !b) { donors.push(null); continue; }
    const d = a && b ? swing(a.d, b.d, k) : (b || a).d;
    const r = a && b ? lerp(a.r, b.r, k) : (b || a).r * (0.35 + 0.65 * (b ? k : 1 - k));
    const parts = a && b && a.type === b.type ? [[b.type, 1]] : [a && [a.type, 1 - k], b && [b.type, k]].filter(Boolean);
    donors.push({ d, r, a: a && b ? 1 : b ? k : 1 - k });
    parts.forEach(([type, pres]) => {
      const at0 = atoms.length;
      ligandAtoms(type, d, r, K).forEach((t) => atoms.push({ ...t, a: pres, site: s }));
      bonds.push({ i: 0, j: at0, a: pres });
      LIG[type].bonds.forEach(([i, j]) => bonds.push({ i: at0 + i, j: at0 + j, a: pres }));
    });
  }
  const key = (p) => p.join('-');
  const bridges = [...B.bridges.map((p) => [p, A.bridges.some((q) => key(q) === key(p)) ? 1 : k]), ...A.bridges.filter((p) => !B.bridges.some((q) => key(q) === key(p))).map((p) => [p, 1 - k])];
  bridges.forEach(([[i, j], pres]) => {
    const di = donors[i], dj = donors[j]; if (!di || !dj) return;
    const ni = atoms.findIndex((t, m) => m > 0 && t.sym === 'N' && t.site === i), nj = atoms.findIndex((t, m) => m > 0 && t.sym === 'N' && t.site === j);
    const c0 = atoms.length;
    enCarbons(di.d, dj.d, (di.r + dj.r) / 2, K).forEach((t) => atoms.push({ ...t, a: pres, ring: key([i, j]) }));
    if (ni > 0) bonds.push({ i: ni, j: c0, a: pres });
    bonds.push({ i: c0, j: c0 + 1, a: pres });
    if (nj > 0) bonds.push({ i: c0 + 1, j: nj, a: pres });
    if (o.H && ni > 0 && nj > 0) {
      [[ni, at, atoms[c0].p, 1.01, 'N'], [nj, at, atoms[c0 + 1].p, 1.01, 'N'], [c0, atoms[ni].p, atoms[c0 + 1].p, 1.09, 'C'], [c0 + 1, atoms[nj].p, atoms[c0].p, 1.09, 'C']].forEach(([m, n1, n2, len, on]) => {
        twoH(atoms[m].p, n1, n2, len * K).forEach((p) => { bonds.push({ i: m, j: atoms.length, a: pres }); atoms.push({ sym: 'H', p, a: pres, name: `ethylenediamine (en): hydrogen (H) on ${on === 'N' ? 'nitrogen' : 'carbon'}` }); });
      });
    }
  });
  return { atoms, bonds, donors };
}
/* an arc of radius R from direction a to b, through their bisector, or through m when they are opposite; returns the points and the label's point */
function arcPts(a, b, R, m) {
  const pts = [];
  const opp = V.dot(a, b) < -0.99;
  for (let i = 0; i <= 32; i++) { const t = i / 32; pts.push(V.mul(opp ? V.add(V.mul(a, Math.cos(Math.PI * t)), V.mul(m, Math.sin(Math.PI * t))) : slerp(a, b, t), R)); }
  return { pts, mid: V.mul(opp ? m : V.unit(V.add(a, b)), R + 0.24) };
}
/* an element's disc as a key sample; nothing is written on an atom, and every atom is named on hover */
const ELNAME = { Ag: 'silver', Cu: 'copper', Zn: 'zinc', Ni: 'nickel', Pt: 'platinum', Co: 'cobalt', V: 'vanadium', Cr: 'chromium', Zr: 'zirconium', Re: 'rhenium', Mo: 'molybdenum', M: 'metal ion M', N: 'nitrogen', H: 'hydrogen', O: 'oxygen', C: 'carbon', Cl: 'chlorine', F: 'fluorine' };
const ORDER = ['Ag', 'Cu', 'Zn', 'Ni', 'Pt', 'Co', 'V', 'Cr', 'Zr', 'Re', 'Mo', 'M', 'Cl', 'F', 'O', 'N', 'C', 'H'];
const disc = (s) => (cc, x, y) => { cc.save(); cc.beginPath(); cc.arc(x, y, Math.max(6, 22 * rad(s)), 0, 2 * Math.PI); cc.fillStyle = F.el(s); cc.fill(); cc.lineWidth = 1.5; cc.strokeStyle = F.alpha(PAL.ink, s === 'H' ? 0.8 : 0.45); cc.stroke(); cc.restore(); };
const elKey = (syms, names = {}) => ORDER.filter((s) => syms.includes(s)).map((s) => ({ s: names[s] || ELNAME[s], draw: disc(s) }));
const keyRow = (ctx, y, entries) => F.legend(ctx, { l: 30, r: 1370, t: y, b: y + 60 }, entries, { corner: 'top', row: true, panel: false, size: 19 });
const symsOf = (atoms) => [...new Set(atoms.filter((t) => t.a > 0.5).map((t) => t.sym))];
/* the greatest reach of a set of atoms from the metal, sphere included */
const reach = (atoms) => Math.max(...atoms.map((t) => V.len(t.p) + rad(t.sym)));
/* "cis-" or "trans-" in italics before a formula, the two set as one centred line */
function prefixed(ctx, pre, s, x, y, o = {}) {
  const size = o.size || 25, weight = o.weight || 600;
  const w1 = F.measure(ctx, pre, { size, weight, italic: true }), w2 = F.measure(ctx, '-' + s, { size, weight });
  text(ctx, pre, x - (w1 + w2) / 2, y, PAL.ink, { size, weight, italic: true });
  text(ctx, '-' + s, x - (w1 + w2) / 2 + w1, y, PAL.ink, { size, weight });
}

/* ---------- the polyhedron whose corners are the donor atoms ---------- */
/* the faces of the convex hull of a few points, each a ring of indices in order round the face; a flat set is one face, a line none */
function hull(P) {
  const n = P.length, faces = new Map(), eps = 1e-3;
  for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) for (let k = j + 1; k < n; k++) {
    let nrm = V.cross(V.sub(P[j], P[i]), V.sub(P[k], P[i])); if (V.len(nrm) < 1e-6) continue;
    nrm = V.unit(nrm);
    const ds = P.map((p) => V.dot(nrm, V.sub(p, P[i])));
    if (!(ds.every((x) => x < eps) || ds.every((x) => x > -eps))) continue;
    const idx = ds.map((x, m) => (Math.abs(x) < eps ? m : -1)).filter((m) => m >= 0), id = idx.join(',');
    if (faces.has(id)) continue;
    const c = V.mul(idx.reduce((s, m) => V.add(s, P[m]), [0, 0, 0]), 1 / idx.length), u = V.unit(V.sub(P[idx[0]], c)), w = V.cross(nrm, u);
    faces.set(id, idx.slice().sort((a, b) => Math.atan2(V.dot(V.sub(P[a], c), w), V.dot(V.sub(P[a], c), u)) - Math.atan2(V.dot(V.sub(P[b], c), w), V.dot(V.sub(P[b], c), u))));
  }
  return [...faces.values()];
}
/* the faces tinted and the edges ruled through the points P, at opacity a */
function polyhedron(g, faces, P, a) {
  if (!T3 || a <= 0.01) return;
  const edges = new Set();
  faces.forEach((f) => f.forEach((m, i) => { const q = f[(i + 1) % f.length]; edges.add(m < q ? `${m},${q}` : `${q},${m}`); }));
  edges.forEach((e) => { const [i, j] = e.split(',').map(Number), l = polyline(g, [P[i], P[j]], PAL.muted); l.material.transparent = true; l.material.opacity = 0.9 * a; });
  const idx = []; faces.forEach((f) => { for (let i = 1; i + 1 < f.length; i++) idx.push(f[0], f[i], f[i + 1]); });
  const geo = new T3.BufferGeometry(); geo.setAttribute('position', new T3.Float32BufferAttribute(P.flat(), 3)); geo.setIndex(idx);
  const m = new T3.Mesh(geo, new T3.MeshBasicMaterial({ color: new T3.Color(PAL.muted), transparent: true, opacity: 0.13 * a, depthWrite: false, side: T3.DoubleSide }));
  m.renderOrder = 2; g.add(m);
}
/* the octahedron's six corners with one axis upright, the other four turned off the line of sight so that none hides behind the metal */
const OCT = [[0, 1, 0], [0, -1, 0], dirOf(90, 38), dirOf(90, 218), dirOf(90, 128), dirOf(90, 308)];

/* =====================================================================
   FIGURE 19.14 + 19.18 + 19.19 + 19.20: the coordination number on the
   control, and every shape the figures and Table 19.5 give for it side
   by side, the donor atoms at the corners of a tinted polyhedron.
   Still: a new number is one morph.
===================================================================== */
(function () {
  const d = sim('sim-complex-geometry');
  const HS = 540, DIST = 22.7, K = 0.62, Y0 = -0.4;
  const v = F.view3d(d.stage, { spin: 'idle', h: HS, dist: DIST, tilt: 0.3 });
  v.look({});                                      /* the shapes are compared at rest; the spin button starts the turn */
  const UNIT = lens(v, HS, DIST);
  const strip = F.makeCanvas(d.stage, 196);
  const G = [0, 1, 2].map(() => v.part(0));
  const ring = (n, th, off) => Array.from({ length: n }, (_, i) => dirOf(th, off + (360 / n) * i));
  /* a flat shape is tipped toward the reader so that it is seen as a triangle or a square, not as a sliver */
  const tip = (dirs) => dirs.map((p) => rotX(p, 0.5));
  const GEOM = {
    linear: { name: 'linear', dirs: [[-1, 0, 0], [1, 0, 0]] },
    trigonal: { name: 'trigonal planar', dirs: tip(ring(3, 90, 100)) },
    tetrahedral: { name: 'tetrahedral', dirs: [[0, 1, 0], ...ring(3, 109.47, 80)] },
    square: { name: 'square planar', dirs: tip(ring(4, 90, 218)) },
    tbp: { name: 'trigonal bipyramidal', dirs: [[0, 1, 0], [0, -1, 0], ...ring(3, 90, 80)] },
    spy: { name: 'square pyramidal', dirs: [[0, 1, 0], ...ring(4, 104, 38)] },
    octahedral: { name: 'octahedral', dirs: OCT },
    pbp: { name: 'pentagonal bipyramid', dirs: [[0, 1, 0], [0, -1, 0], ...ring(5, 90, 100)] },
    sap: { name: 'square antiprism', dirs: [...ring(4, 59.27, 57), ...ring(4, 120.73, 12)] },
    dodec: { name: 'dodecahedron', dirs: [dirOf(36.85, 20), dirOf(36.85, 200), dirOf(143.15, 110), dirOf(143.15, 290), dirOf(69.46, 110), dirOf(69.46, 290), dirOf(110.54, 20), dirOf(110.54, 200)] },
  };
  Object.values(GEOM).forEach((g) => { g.faces = hull(g.dirs); });
  /* id: [formula, metal, geometry, ligands by site (a type, or [type, r Å] per site), M–L distance Å, ligands, o] */
  const ROWS = {
    ag: ['[Ag(NH₃)₂]⁺', 'Ag', 'linear', 'NH3', 2.1, 2],
    cucn3: ['[Cu(CN)₃]²⁻', 'Cu', 'trigonal', 'CN', 1.95, 3],
    cucl4: ['[CuCl₄]²⁻', 'Cu', 'tetrahedral', 'Cl', 2.23, 4],
    zncn4: ['[Zn(CN)₄]²⁻', 'Zn', 'tetrahedral', 'CN', 2.02, 4, { arc: [0, 2, '109.5°'] }],
    /* Figure 19.20 (b): the two Cl on the left, the two NH₃ on the right */
    ptnh3cl2: ['[Pt(NH₃)₂Cl₂]', 'Pt', 'square', [['Cl', 2.32], ['NH3', 2.05], ['NH3', 2.05], ['Cl', 2.32]], 0, 4, { arc: [0, 3, '90°'] }],
    cocl5: ['[CoCl₅]²⁻', 'Co', 'tbp', 'Cl', 2.3, 5],
    vocn4: ['[VO(CN)₄]²⁻', 'V', 'spy', [['O', 1.6], ['CN', 2.15], ['CN', 2.15], ['CN', 2.15], ['CN', 2.15]], 0, 5],
    coh2o6: ['[Co(H₂O)₆]²⁺', 'Co', 'octahedral', 'OH2', 2.1, 6, { arc: [0, 2, '90°'], out: '2 Cl⁻ outside the brackets' }],
    cren3: ['[Cr(en)₃]³⁺', 'Cr', 'octahedral', 'en', 2.08, 3, { bridges: [[0, 2], [1, 4], [3, 5]], out: '3 NO₃⁻ outside the brackets' }],
    ptcl6: ['[PtCl₆]²⁻', 'Pt', 'octahedral', 'Cl', 2.32, 6, { out: '2 K⁺ outside the brackets' }],
    zrf7: ['[ZrF₇]³⁻', 'Zr', 'pbp', 'F', 2.05, 7],
    ref8: ['[ReF₈]²⁻', 'Re', 'sap', 'F', 1.95, 8],
    mocn8: ['[Mo(CN)₈]⁴⁻', 'Mo', 'dodec', 'CN', 2.17, 8],
  };
  const C = {};
  Object.entries(ROWS).forEach(([id, [label, metal, geom, lig, r, ligands, o = {}]]) => {
    const sites = GEOM[geom].dirs.map((dd, i) => { const [type, rr] = Array.isArray(lig) ? lig[i] : [lig, r]; return { d: dd, type, r: rr }; });
    const S = { metal, sites, bridges: o.bridges || [] };
    C[id] = { id, label, geom, S, ligands, cn: sites.length, arc: o.arc, out: o.out, R: reach(blend(S, S, 1, K).atoms) };
  });
  const HEAD = {
    2: 'Two donor atoms lie in a line through the metal.',
    3: 'Three donor atoms sit at the corners of a triangle with the metal at its center.',
    4: 'Four donor atoms take one of two shapes: the corners of a tetrahedron or the corners of a square.',
    5: 'Five donor atoms sit at the corners of a trigonal bipyramid or of a square pyramid.',
    6: 'Six donor atoms sit at the corners of an octahedron, whatever the ligands and whatever ions lie outside the brackets.',
    7: 'Seven donor atoms sit at the corners of a pentagonal bipyramid: five in a ring round the metal, one above and one below.',
    8: 'Eight donor atoms sit at the corners of a square antiprism or of a dodecahedron.',
  };
  /* the ions shown for each coordination number, set in a row at one scale that fills the stage */
  const SETS = {};
  Object.entries({ 2: ['ag'], 3: ['cucn3'], 4: ['cucl4', 'zncn4', 'ptnh3cl2'], 5: ['cocl5', 'vocn4'], 6: ['coh2o6', 'cren3', 'ptcl6'], 7: ['zrf7'], 8: ['ref8', 'mocn8'] }).forEach(([cn, ids]) => {
    const list = ids.map((id) => C[id]), gap = 0.8, wide = 1400 / UNIT - 0.8, tall = 2.3;
    const s = Math.min(1.7, tall / Math.max(...list.map((c) => c.R)), wide / (list.reduce((a, c) => a + 2 * c.R, 0) + gap * (list.length - 1)));
    let x = -(list.reduce((a, c) => a + 2 * c.R * s, 0) + gap * s * (list.length - 1)) / 2;
    SETS[cn] = { cn: +cn, list: list.map((c) => { const o = { c, s, x: x + c.R * s }; x += 2 * c.R * s + gap * s; return o; }) };
  });
  const pick = F.choice(d.controls, { label: '\\text{coordination number}', key: 'cn', aria: 'the coordination number', options: Object.keys(SETS).map((n) => ({ value: n, label: n })), value: '4' });
  const ro = F.readout(d);
  function draw() {
    const k = pick.k, A = SETS[pick.from], B = SETS[pick.value];
    v.clear();
    const { ctx } = F.begin(strip), labels = [], syms = new Set();
    for (let i = 0; i < 3; i++) {
      const a = A.list[i], b = B.list[i], g = G[i]; if (!a && !b) continue;
      const both = a && b, on = both ? 1 : b ? k : 1 - k, kk = both ? k : 1;
      const st = blend((a || b).c.S, (b || a).c.S, kk, K);
      const x = both ? lerp(a.x, b.x, k) : (b || a).x, s = (both ? lerp(a.s, b.s, k) : (b || a).s) * (0.45 + 0.55 * on);
      g.position.set(x, Y0, 0); g.scale.setScalar(s);
      molecule(v, g, st.atoms, st.bonds, kk, on);
      /* the polyhedron of whichever ion the morph is nearer, gone at the half-way point where its corners are in flight */
      const near = both ? (k < 0.5 ? a : b).c : (b || a).c, fa = (both && a.c !== b.c ? Math.abs(2 * k - 1) : 1) * on;
      const P = st.donors.slice(0, near.cn).map((q) => V.mul(q.d, q.r * K));
      if (P.length === near.cn) polyhedron(g, GEOM[near.geom].faces, P, fa);
      if (near.arc && fa > 0.6) {
        const [p, q, lab] = near.arc, pt = F.mesh.arc(g, st.donors[p].d, st.donors[q].d, 0.72, [0, 0, 0], F.C('angle'));
        plain(hued(v.label(lab, V.mul(pt, 1.2), g, 0, 'bare'), 'angle'), (fa - 0.6) / 0.4);
      }
      if (on > 0.5) st.atoms.forEach((t, m) => { if (m > 0 && t.a > 0.5) syms.add(t.sym); });
      if (both && a.c !== b.c) labels.push([a.c, lerp(a.x, b.x, k), 1 - k], [b.c, lerp(a.x, b.x, k), k]); else labels.push([near, x, on]);
    }
    /* under each ion: its formula, the geometry as Table 19.5 names it, its ligands and donor atoms, and Figure 19.19's ions outside the brackets */
    labels.forEach(([c, x, a]) => {
      if (a <= 0.01) return;
      const X = 700 + x * UNIT;
      F.faded(ctx, a, [0, 0], () => {
        text(ctx, c.label, X, 20, PAL.ink, { size: 25, weight: 600, align: 'center' });
        text(ctx, GEOM[c.geom].name, X, 52, PAL.ink, { size: 21, align: 'center' });
        text(ctx, `${c.ligands} ligands, ${c.cn} donor atoms`, X, 81, PAL.muted, { size: 18, align: 'center' });
        if (c.out) text(ctx, c.out, X, 107, PAL.muted, { size: 18, align: 'center' });
      });
    });
    keyRow(ctx, 134, [...elKey([...syms]), { s: 'shape with a donor atom at each corner', kind: 'swatch', color: F.alpha(PAL.muted, 0.35) }]);
    v.headline(HEAD[B.cn]);
    const terms = [...new Set(B.list.map(({ c }) => `${c.ligands} \\times ${c.cn / c.ligands}`))].join(' = ');
    ro.set(`\\text{coordination number} = \\text{ligands} \\times \\text{donor atoms on each} = ${terms} = ${B.cn}`, '', { form: terms.length });
  }
  still(d, draw);
})();

/* =====================================================================
   FIGURE 19.21 + 19.22: the cis and trans isomers side by side, each
   M–Cl bond dipole beside its bond (as 7.6 draws bond moments). In cis
   the two leave a sum; in trans they are opposite and leave none.
   Still: a new complex is one morph.
===================================================================== */
(function () {
  const d = sim('sim-cis-trans');
  const HS = 520, DIST = 21.5, K = 0.62, Y0 = -0.45, X0 = 3.1;
  const v = F.view3d(d.stage, { spin: 'idle', h: HS, dist: DIST, tilt: 0.3 });
  v.look({});
  const UNIT = lens(v, HS, DIST);
  const strip = F.makeCanvas(d.stage, 172);
  const G = { cis: v.part(-X0), trans: v.part(X0) };
  const [Y, Yn, FR, BL, FL, BR] = OCT;                       /* up, down, front right, back left, front left, back right */
  const site = (dd, type, r) => ({ d: dd, type, r });
  /* Figure 19.21: one Cl up in both; the second front right in cis, straight down in trans */
  const oct = (L, rL, cis) => [site(Y, 'Cl', 2.3), site(cis ? Yn : FR, L, rL), site(cis ? FR : Yn, 'Cl', 2.3), site(BL, L, rL), site(FL, L, rL), site(BR, L, rL)];
  /* the square of platinum lies flat and is tipped toward the reader; Figure 19.20 (b) has both Cl on the left, Figure 19.22 has them back left and front right */
  const SQ = [38, 128, 218, 308].map((az) => rotX(dirOf(90, az), 0.5)), UP = rotX([0, 1, 0], 0.5);
  const sq = (cis) => [site(SQ[2], 'Cl', 2.32), site(cis ? SQ[0] : SQ[1], 'NH3', 2.05), site(cis ? SQ[1] : SQ[0], 'Cl', 2.32), site(SQ[3], 'NH3', 2.05)];
  const VIOLET = '#7d4fa8', GREEN = '#4a8f3c';
  const CPX = {
    aqua: { metal: 'Co', name: '[Co(H₂O)₄Cl₂]⁺', sites: (c) => oct('OH2', 2.1, c), colour: true, side: [-1, 0, 0], many: 'six', el: 'cobalt' },
    ammine: { metal: 'Co', name: '[Co(NH₃)₄Cl₂]⁺', sites: (c) => oct('NH3', 1.97, c), colour: true, side: [-1, 0, 0], many: 'six', el: 'cobalt' },
    pt: { metal: 'Pt', name: '[Pt(NH₃)₂Cl₂]', sites: (c) => sq(c), colour: false, side: UP, many: 'four', el: 'platinum', long: 'diamminedichloroplatinum(II)' },
  };
  const cx = F.select(d.controls, { label: '\\text{complex}', aria: 'the complex', options: [{ value: 'aqua', label: '[Co(H₂O)₄Cl₂]⁺' }, { value: 'ammine', label: '[Co(NH₃)₄Cl₂]⁺' }, { value: 'pt', label: '[Pt(NH₃)₂Cl₂]' }], value: 'aqua' });
  const ro = F.readout(d);
  const state = (c, cis) => ({ metal: CPX[c].metal, sites: CPX[c].sites(cis), bridges: [] });
  /* a bond dipole from a to b: an arrow with the crossed tail the book draws on it; the sum is heavier and has no cross */
  function dipole(g, a, b, heavy, o) {
    const c = F.C('dipole-moment'), u = V.unit(V.sub(b, a)), w = perp(u), r = heavy ? 0.062 : 0.038, ex = fade(o);
    const hl = Math.min(0.32, V.len(V.sub(b, a)) * 0.45), base = V.sub(b, V.mul(u, hl));
    stick(g, a, base, r, c, ex);
    if (T3) { const cone = new T3.Mesh(F.mesh.geo().cone, F.mesh.mat(c, ex)); cone.position.copy(F.mesh.vec(V.add(base, V.mul(u, hl / 2)))); cone.quaternion.setFromUnitVectors(new T3.Vector3(0, 1, 0), F.mesh.vec(u)); cone.scale.set(r * 3.2, hl, r * 3.2); g.add(cone); }
    if (!heavy) { const bar = V.add(a, V.mul(u, 0.07)); stick(g, V.sub(bar, V.mul(w, 0.11)), V.add(bar, V.mul(w, 0.11)), 0.03, c, ex); }
  }
  const LEN = 0.78;                                            /* the length of a bond dipole's arrow, scene units */
  function draw() {
    const k = cx.k, P = CPX[cx.value], show = Math.max(0, (k - 0.6) / 0.4);
    v.clear();
    const syms = new Set();
    ['cis', 'trans'].forEach((iso) => {
      const cis = iso === 'cis', g = G[iso];
      const { atoms, bonds, donors } = blend(state(cx.from, cis), state(cx.value, cis), k, K);
      g.position.y = Y0;
      molecule(v, g, atoms, bonds, k);
      symsOf(atoms).forEach((s) => syms.add(s));
      const a = donors[0], b = donors[2], bis = V.unit(V.add(a.d, b.d));
      /* the angle between the two M–Cl bonds; in trans the half circle goes round the side the dipoles are not on */
      const { pts, mid } = arcPts(a.d, b.d, 0.6, V.mul(P.side, -1));
      polyline(g, pts, F.C('angle'));
      if (show > 0) plain(hued(v.label(cis ? '90°' : '180°', mid, g, 0, 'bare'), 'angle'), show);
      if (show <= 0) return;
      /* each bond dipole beside its bond, on the side away from the other chloride, pointing to the chlorine */
      [[a, b], [b, a]].forEach(([p, q]) => {
        const away = cis ? V.unit(V.sub(V.mul(p.d, V.dot(p.d, q.d)), q.d)) : P.side, off = V.mul(away, 0.46), r = p.r * K;
        dipole(g, V.add(V.mul(p.d, r * 0.5 - LEN / 2 + 0.12), off), V.add(V.mul(p.d, r * 0.5 + LEN / 2 + 0.12), off), false, show);
      });
      if (cis) dipole(g, V.mul(bis, 1.22), V.mul(bis, 1.22 + LEN * Math.SQRT2), true, show);
    });
    const { ctx } = F.begin(strip), cD = F.C('dipole-moment'), M = P.metal;
    [['cis', -X0, VIOLET, 'violet', 'add: the ion is polar'], ['trans', X0, GREEN, 'green', 'cancel: the ion is nonpolar']].forEach(([iso, x, hex, word, verdict]) => {
      const X = 700 + x * UNIT;
      prefixed(ctx, iso, P.name, X, 20);
      if (P.colour) {
        const w = F.measure(ctx, word, { size: 21 });
        ctx.save(); ctx.fillStyle = F.fact(hex); ctx.fillRect(X - w / 2 - 30, 41, 22, 22); ctx.restore();
        text(ctx, word, X + 14, 52, PAL.ink, { size: 21, align: 'center' });
      } else prefixed(ctx, iso, P.long, X, 52, { size: 21, weight: 400 });
      F.rich(ctx, [[`${M}–Cl bond dipoles`, cD, 400], ` ${verdict}`.replace('ion', P.colour ? 'ion' : 'molecule')], X, 82, { size: 19, align: 'center' });
    });
    keyRow(ctx, 110, [...elKey([...syms]),
      { s: `${M}–Cl bond dipole`, draw: (c, x, y) => { F.arrow(c, x - 20, y, x + 20, y, cD, 2.5); F.line(c, x - 13, y - 6, x - 13, y + 6, cD, 2.5); } },
      { s: 'their sum', draw: (c, x, y) => F.arrow(c, x - 20, y, x + 20, y, cD, 5) }]);
    v.headline(`The same ${P.many} ligands surround ${P.el} in both isomers. The two chloride ligands are adjacent in <i>cis</i>-${P.name} and directly across from one another in <i>trans</i>-${P.name}.`);
    ro.set(`\\textit{cis}:\\ \\htmlClass{kv-angle}{\\angle\\text{Cl–${M}–Cl}} = 90^\\circ \\\\ \\textit{trans}:\\ \\htmlClass{kv-angle}{\\angle\\text{Cl–${M}–Cl}} = 180^\\circ`);
  }
  still(d, draw);
})();

/* =====================================================================
   FIGURE 19.23 + 19.24: an ion and its mirror image either side of a
   mirror, then the image turned to its closest fit and laid over the
   original, the atoms that land on nothing ringed.
   Still: a choice is one morph.
===================================================================== */
(function () {
  const d = sim('sim-optical-isomers');
  const HS = 520, DIST = 21.5, K = 0.62, Y0 = -0.4, D = 2.9;
  let t = 0, seen = [NaN, NaN];
  /* a drag turns the original; the image turns the opposite way about the upright axis, as a reflection does, and the
     mirror stays edge-on between them. Laid over (t = 1), the image turns with the original. */
  function sync() {
    if (!gR) return;
    const yaw = v.at.yaw;
    if (seen[0] === yaw && seen[1] === t) return;
    seen = [yaw, t]; gR.rotation.y = -2 * yaw * (1 - t); gM.rotation.y = -yaw; v.invalidate();
  }
  let gR = null, gM = null;
  const v = F.view3d(d.stage, { h: HS, dist: DIST, tilt: 0.3, onRender: sync });
  const UNIT = lens(v, HS, DIST);
  const strip = F.makeCanvas(d.stage, 122);
  const gL = v.part(-D); gR = v.part(D); gM = v.part(0);
  const o6 = [[0, 1, 0], [0, -1, 0], [1, 0, 0], [-1, 0, 0], [0, 0, 1], [0, 0, -1]];
  const site = (i, type, r) => ({ d: o6[i], type, r });
  /* each ion is set in the octahedron's own frame and shown in a frame [right, up, toward the reader] in which the mirror, the plane
     x = 0, is one of the octahedron's mirror planes: the image's donor atoms then sit on the same six corners, and the
     octahedron's 24 rotations are the ways of fitting it. [M(en)₃]ⁿ⁺ and the cis ion stand with the threefold axis of the
     three rings upright, so each ring climbs from a lower corner to an upper one, all one way round; the trans ion stands
     with Cl–Co–Cl upright and a ring to the left and right, as Figure 19.24 draws it. */
  const frame = (x, y) => { const X = V.unit(x), Yv = V.unit(y); return [X, Yv, V.cross(X, Yv)]; };
  const F3 = frame([0, 1, -1], [-1, 1, 1]), FT = frame([1, 0, 1], [0, 1, 0]);
  const CPX = {
    en3: { metal: 'M', name: '[M(en)₃]ⁿ⁺', sites: [0, 1, 2, 3, 4, 5].map((i) => site(i, 'en', 2.1)), bridges: [[0, 2], [1, 4], [3, 5]], fr: F3 },
    cis: { metal: 'Co', name: '<i>cis</i>-[Co(en)₂Cl₂]⁺', plain: ['cis', '[Co(en)₂Cl₂]⁺'], sites: [0, 1, 2, 3, 4, 5].map((i) => (i === 0 || i === 2 ? site(i, 'Cl', 2.3) : site(i, 'en', 2.0))), bridges: [[1, 4], [3, 5]], fr: F3 },
    trans: { metal: 'Co', name: '<i>trans</i>-[Co(en)₂Cl₂]⁺', plain: ['trans', '[Co(en)₂Cl₂]⁺'], sites: [0, 1, 2, 3, 4, 5].map((i) => (i < 2 ? site(i, 'Cl', 2.3) : site(i, 'en', 2.0))), bridges: [[2, 4], [3, 5]], fr: FT },
  };
  const into = (fr) => (p) => [V.dot(p, fr[0]), V.dot(p, fr[1]), V.dot(p, fr[2])];
  /* the 24 rotations of the octahedron as axis and angle */
  const ROTS = [[[0, 1, 0], 0]];
  [[1, 0, 0], [0, 1, 0], [0, 0, 1]].forEach((n) => [1, 2, 3].forEach((q) => ROTS.push([n, (q * Math.PI) / 2])));
  [[1, 1, 1], [1, 1, -1], [1, -1, 1], [-1, 1, 1]].forEach((n) => [1, 2].forEach((q) => ROTS.push([V.unit(n), (q * 2 * Math.PI) / 3])));
  [[1, 1, 0], [1, -1, 0], [1, 0, 1], [1, 0, -1], [0, 1, 1], [0, 1, -1]].forEach((n) => ROTS.push([V.unit(n), Math.PI]));
  const mirror = (p) => [-p[0], p[1], p[2]];
  /* for each complex, the rotation of its mirror image that leaves the fewest atoms without a twin of the same element, and which atoms those are */
  Object.values(CPX).forEach((c) => {
    const S = { metal: c.metal, sites: c.sites, bridges: c.bridges }, Q = into(c.fr);
    const orig = blend(S, S, 1, K).atoms.map((a) => ({ ...a, p: Q(a.p) }));
    let best = null;
    ROTS.forEach(([n0, a]) => {
      const n = Q(n0);
      const lost = orig.map((a0) => !orig.some((o) => o.sym === a0.sym && V.len(V.sub(o.p, rot(mirror(a0.p), n, a))) < 0.15));
      const miss = lost.filter(Boolean).length;
      if (!best || miss < best.miss || (miss === best.miss && a < best.a)) best = { n, a, miss, lost };
    });
    Object.assign(c, { S, best, total: orig.length });
  });
  const cx = F.select(d.controls, { label: '\\text{complex}', aria: 'the complex', options: [{ value: 'en3', label: '[M(en)₃]ⁿ⁺' }, { value: 'cis', label: 'cis-[Co(en)₂Cl₂]⁺' }, { value: 'trans', label: 'trans-[Co(en)₂Cl₂]⁺' }], value: 'en3' });
  const arr = F.choice(d.controls, { label: '\\text{arrangement}', aria: 'the arrangement', options: [{ value: 'mirror', label: 'mirror images' }, { value: 'over', label: 'laid over' }], value: 'mirror' });
  const ro = F.readout(d);
  /* the frame part-way between two ions' frames, as a turn about one axis */
  function between(A, B, k) {
    if (A === B || !T3 || k > 0.999) return into(B);
    const m = (fr) => new T3.Quaternion().setFromRotationMatrix(new T3.Matrix4().makeBasis(...fr.map((a) => new T3.Vector3(...a)))).invert();
    const q = m(A).slerp(m(B), k);
    return (p) => new T3.Vector3(...p).applyQuaternion(q).toArray();
  }
  const NAMES = { N: 'nitrogen of an NH₂ group', C: 'carbon of a CH₂ group' };
  function draw() {
    const k = cx.k, B = CPX[cx.value], A = k > 0.999 ? B : CPX[cx.from];
    t = F.ease.smooth(arr.mix((x) => (x === 'over' ? 1 : 0)));
    /* the image turns to its fit over the first two thirds of the way and slides across over the last two thirds */
    const turn = F.ease.smooth(Math.min(1, t / 0.66)), slide = F.ease.smooth(Math.max(0, (t - 0.34) / 0.66));
    const { n, a, lost } = B.best, Q = between(A.fr, B.fr, k);
    const left = blend(A.S, B.S, k, K), right = blend(A.S, B.S, k, K);
    left.atoms.forEach((x) => { x.p = Q(x.p); });
    /* the image is drawn a little smaller, so that an atom it shares with the original lies inside the original's */
    right.atoms.forEach((x, i) => { x.p = rot(mirror(Q(x.p)), n, a * turn); x.name = 'mirror image: ' + x.name; x.s = 1 - 0.06 * t; x.lost = k > 0.99 && lost[i]; x.hide = t > 0.97 && !x.lost; });
    v.clear();
    gL.position.set(-D * (1 - slide), Y0, 0); gR.position.set(D * (1 - slide), Y0, 0); gM.position.y = Y0;
    molecule(v, gL, left.atoms, left.bonds, k);
    molecule(v, gR, right.atoms, right.bonds, k);
    /* a ring round each atom of the image that has landed on nothing */
    const cR = F.cat(0);
    if (t > 0.5) right.atoms.forEach((x) => { if (x.lost) v.pickable(sphere(gR, x.p, rad(x.sym) * 1.75, cR, { transparent: true, opacity: 0.38 * (t - 0.5) * 2, depthWrite: false }), 'an atom of the mirror image with no atom of the original under it'); });
    if (t < 0.99) {
      const m = F.mesh.box(gM, [0, 0, 0], [0.035, 4.5, 0.035], PAL.muted, { transparent: true, opacity: 1 - t });
      v.pickable(m, 'the mirror, seen edge-on');
      plain(v.label('mirror', [0, -2.42, 0], gM, 0, 'bare'), 1 - t);
    }
    sync();
    const { ctx } = F.begin(strip), over = arr.value === 'over', miss = B.best.miss;
    const nameAt = (c, X, y, a0) => F.faded(ctx, a0, [0, 0], () => (c.plain ? prefixed(ctx, c.plain[0], c.plain[1], X, y) : text(ctx, c.name, X, y, PAL.ink, { size: 25, weight: 600, align: 'center' })));
    const xL = 700 - D * (1 - slide) * UNIT, xR = 700 + D * (1 - slide) * UNIT;
    [[A, 1 - k], [B, k]].forEach(([c, a0]) => { if (a0 > 0.01 && (c === B || A !== B)) nameAt(c, xL, 20, a0 * (1 - t)); });
    F.faded(ctx, 1 - t, [0, 0], () => text(ctx, 'its mirror image', xR, 20, PAL.ink, { size: 25, weight: 600, align: 'center' }));
    F.faded(ctx, t, [0, 0], () => text(ctx, miss ? 'the mirror image, turned and laid over the original' : 'the mirror image, turned and laid over the original: one ion', 700, 20, PAL.ink, { size: 23, align: 'center' }));
    keyRow(ctx, 56, [...elKey(symsOf(left.atoms), NAMES),
      ...(t > 0.5 && miss ? [{ s: 'atom of the image that lands on nothing', draw: (c, x, y) => { c.save(); c.globalAlpha = 0.4; c.beginPath(); c.arc(x, y, 12, 0, 2 * Math.PI); c.fillStyle = cR; c.fill(); c.restore(); F.dot(c, x, y, F.el('C'), true, 6); } }] : [])]);
    v.headline(over
      ? (miss ? `Turned to its closest fit and laid over ${B.name}, the mirror image still puts ${miss} atoms where the original has none. The two are optical isomers.` : `Turned and laid over ${B.name}, the mirror image matches it atom for atom. The two are the same ion.`)
      : (miss ? `In ${B.name} the rings climb one way round the metal, and in its mirror image they climb the other way.` : `${B.name} and its mirror image look alike.`));
    ro.set(`\\text{atoms of the mirror image with no match} = ${miss}\\ \\text{of}\\ ${B.total}\\;\\Rightarrow\\;\\text{${miss ? 'optical isomers' : 'the same ion'}}`);
  }
  still(d, draw);
})();
};
