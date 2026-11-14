/* Figures for section 19.2 Coordination Chemistry of Transition Metals. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['19.2'] = function (root, F) {
const { PAL, register } = F;
const { sphere, stick, polyline } = F.mesh;
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
const dirOf = (th, az) => [Math.sin(th * RAD) * Math.cos(az * RAD), Math.cos(th * RAD), Math.sin(th * RAD) * Math.sin(az * RAD)];
const rot = (p, n, a) => { const c = Math.cos(a), s = Math.sin(a), k = V.dot(n, p) * (1 - c); return V.add(V.add(V.mul(p, c), V.mul(V.cross(n, p), s)), V.mul(n, k)); };

/* ---------- atoms in the book's palette, each bond two half sticks in its atoms' colours ---------- */
const RADIUS = { M: 0.42, H: 0.15, C: 0.25, N: 0.25, O: 0.26, F: 0.23, Cl: 0.32 };
const rad = (s) => RADIUS[s] || RADIUS.M;
const METAL = { Ag: 'silver', Cu: 'copper', Zn: 'zinc', Ni: 'nickel', Pt: 'platinum', Co: 'cobalt', V: 'vanadium', Cr: 'chromium', Zr: 'zirconium', Re: 'rhenium', Mo: 'molybdenum', M: 'a metal ion' };
const fade = (a) => (a < 0.999 ? { transparent: true, opacity: a } : undefined);
const plain = (e, a) => { e.style.opacity = String(Math.max(0, Math.min(1, a))); return e; };
const hued = (e, type) => { e.style.color = F.C(type); return e; };
const colOf = (t, k) => (t.from && t.from !== t.sym ? F.mixColor(F.el(t.from), F.el(t.sym), k) : F.el(t.sym));
/* atoms [{sym, from, p (scene units), a, name, s}] and bonds [{i, j, a}] */
function molecule(v, g, atoms, bonds, k, ghost = 1) {
  atoms.forEach((t) => {
    if (t.a <= 0.01) return;
    const r = (t.from && t.from !== t.sym ? lerp(rad(t.from), rad(t.sym), k) : rad(t.sym)) * (0.3 + 0.7 * t.a) * (t.s || 1);
    v.pickable(sphere(g, t.p, r, colOf(t, k), fade(t.a * (t.ghost ? ghost : 1))), t.name);
  });
  bonds.forEach(({ i, j, a }) => {
    if (a <= 0.01) return;
    const A = atoms[i], B = atoms[j], m = V.lerp(A.p, B.p, 0.5), o = a * (A.ghost ? ghost : 1);
    stick(g, A.p, m, 0.07, colOf(A, k), fade(o));
    stick(g, m, B.p, 0.07, colOf(B, k), fade(o));
  });
}

/* ---------- ligands: each set out along its donor direction d at distance r (Å) ---------- */
const T = (sym, along, side, name) => ({ sym, along, side, name });
const LIG = {
  NH3: { label: 'NH₃', atoms: [T('N', 0, 0, 'ammine ligand: nitrogen (N), the donor atom'), ...[0, 120, 240].map((az) => T('H', 1.01 * Math.cos(70.5 * RAD), [1.01 * Math.sin(70.5 * RAD), az], 'hydrogen (H) of an ammine ligand'))], bonds: [[0, 1], [0, 2], [0, 3]], q: 0 },
  OH2: { label: 'H₂O', atoms: [T('O', 0, 0, 'aqua ligand: oxygen (O), the donor atom'), ...[0, 180].map((az) => T('H', 0.96 * Math.cos(52 * RAD), [0.96 * Math.sin(52 * RAD), az], 'hydrogen (H) of an aqua ligand'))], bonds: [[0, 1], [0, 2]], q: 0 },
  Cl: { label: 'Cl', atoms: [T('Cl', 0, 0, 'chloride ligand (Cl)')], bonds: [], q: -1 },
  F: { label: 'F', atoms: [T('F', 0, 0, 'fluoride ligand (F)')], bonds: [], q: -1 },
  O: { label: 'O', atoms: [T('O', 0, 0, 'oxo ligand (O)')], bonds: [], q: -2 },
  CN: { label: 'CN', atoms: [T('C', 0, 0, 'cyanide ligand: carbon (C), the donor atom'), T('N', 1.16, 0, 'nitrogen (N) of a cyanide ligand')], bonds: [[0, 1]], q: -1 },
  CO: { label: 'CO', atoms: [T('C', 0, 0, 'carbonyl ligand: carbon (C), the donor atom'), T('O', 1.13, 0, 'oxygen (O) of a carbonyl ligand')], bonds: [[0, 1]], q: 0 },
  en: { label: 'en', atoms: [T('N', 0, 0, 'ethylenediamine (en): nitrogen (N), a donor atom')], bonds: [], q: 0 },
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
/* the two CH₂ carbons of an en ring closing sites i and j */
function enCarbons(a, b, r, K) {
  const ca = V.add(V.mul(a, r), V.mul(V.unit(V.add(b, V.mul(a, 0.3))), 1.48)), cb = V.add(V.mul(b, r), V.mul(V.unit(V.add(a, V.mul(b, 0.3))), 1.48));
  return [ca, cb].map((p) => ({ sym: 'C', p: V.mul(p, K), name: 'ethylenediamine (en): carbon (C) of a CH₂ group' }));
}

/* A complex as slots: sites [{d, type, r}] (a slot may be null) and en bridges [[i, j]]. Two states blend at k:
   a ligand in both swings to its new corner, one only in the old shrinks into the metal, one only in the new grows out of it. */
function blend(A, B, k, K, at = [0, 0, 0], extra = {}) {
  const atoms = [{ sym: B.metal, from: A.metal, p: at, a: 1, name: METAL[k < 0.5 ? A.metal : B.metal] + ` (${k < 0.5 ? A.metal : B.metal})`, ...extra }];
  const bonds = [], donors = [];
  const n = Math.max(A.sites.length, B.sites.length);
  for (let s = 0; s < n; s++) {
    const a = A.sites[s], b = B.sites[s];
    if (!a && !b) { donors.push(null); continue; }
    const d = a && b ? swing(a.d, b.d, k) : (b || a).d;
    const r = a && b ? lerp(a.r, b.r, k) : (b || a).r * (0.35 + 0.65 * (b ? k : 1 - k));
    const parts = a && b && a.type === b.type ? [[b.type, 1]] : [a && [a.type, 1 - k], b && [b.type, k]].filter(Boolean);
    donors.push({ d, r });
    parts.forEach(([type, pres]) => {
      const at0 = atoms.length;
      ligandAtoms(type, d, r, K).forEach((t) => atoms.push({ ...t, p: V.add(at, t.p), a: pres, ...extra }));
      bonds.push({ i: 0, j: at0, a: pres });
      LIG[type].bonds.forEach(([i, j]) => bonds.push({ i: at0 + i, j: at0 + j, a: pres }));
    });
  }
  const key = (p) => p.join('-');
  const bridges = [...B.bridges.map((p) => [p, A.bridges.some((q) => key(q) === key(p)) ? 1 : k]), ...A.bridges.filter((p) => !B.bridges.some((q) => key(q) === key(p))).map((p) => [p, 1 - k])];
  bridges.forEach(([[i, j], pres]) => {
    const di = donors[i], dj = donors[j]; if (!di || !dj) return;
    const ni = atoms.findIndex((t, m) => m > 0 && t.sym === 'N' && V.len(V.sub(t.p, V.add(at, V.mul(di.d, di.r * K)))) < 1e-6);
    const nj = atoms.findIndex((t, m) => m > 0 && t.sym === 'N' && V.len(V.sub(t.p, V.add(at, V.mul(dj.d, dj.r * K)))) < 1e-6);
    const c0 = atoms.length;
    enCarbons(di.d, dj.d, (di.r + dj.r) / 2, K).forEach((t) => atoms.push({ ...t, p: V.add(at, t.p), a: pres, ...extra }));
    if (ni > 0) bonds.push({ i: ni, j: c0, a: pres });
    bonds.push({ i: c0, j: c0 + 1, a: pres });
    if (nj > 0) bonds.push({ i: c0 + 1, j: nj, a: pres });
  });
  return { atoms, bonds, donors };
}
/* an arc of radius R from direction a to b, through their bisector, or through m when they are opposite; returns the points and the label's point */
function arcPts(a, b, R, m) {
  const pts = [];
  const opp = V.dot(a, b) < -0.99;
  for (let i = 0; i <= 32; i++) { const t = i / 32; pts.push(V.mul(opp ? V.add(V.mul(a, Math.cos(Math.PI * t)), V.mul(m, Math.sin(Math.PI * t))) : slerp(a, b, t), R)); }
  return { pts, mid: V.mul(opp ? m : V.unit(V.add(a, b)), R + 0.22) };
}
const FREE = { spin: 'idle' };
/* the elements a scene draws, named in a key row under it; nothing is written on an atom */
const ELNAME = { Ag: 'silver', Cu: 'copper', Zn: 'zinc', Ni: 'nickel', Pt: 'platinum', Co: 'cobalt', V: 'vanadium', Cr: 'chromium', Zr: 'zirconium', Re: 'rhenium', Mo: 'molybdenum', M: 'metal ion M', N: 'nitrogen', H: 'hydrogen', O: 'oxygen', C: 'carbon', Cl: 'chlorine', F: 'fluorine' };
const ORDER = ['Ag', 'Cu', 'Zn', 'Ni', 'Pt', 'Co', 'V', 'Cr', 'Zr', 'Re', 'Mo', 'M', 'Cl', 'F', 'O', 'N', 'C', 'H'];
function keyRow(c, syms, extra = []) {
  const { ctx } = F.begin(c);
  const disc = (s) => (cc, x, y) => { cc.save(); cc.beginPath(); cc.arc(x, y, Math.max(6, 22 * rad(s)), 0, 2 * Math.PI); cc.fillStyle = F.el(s); cc.fill(); cc.lineWidth = 1.5; cc.strokeStyle = F.alpha(PAL.ink, s === 'H' ? 0.8 : 0.45); cc.stroke(); cc.restore(); };
  const list = ORDER.filter((s) => syms.includes(s)).map((s) => ({ s: ELNAME[s], draw: disc(s) }));
  F.legend(ctx, { l: 40, r: 1360, t: 0, b: 64 }, [...list, ...extra], { corner: 'top', row: true, panel: false, size: 20 });
}
const symsOf = (atoms) => [...new Set(atoms.filter((t) => t.a > 0.5).map((t) => t.sym))];
const OCT = [[0, 1, 0], [0, -1, 0], [1, 0, 0], [-1, 0, 0], [0, 0, 1], [0, 0, -1]];

/* =====================================================================
   FIGURE 19.14 + 19.18 + 19.19 + 19.20: every complex the four figures
   and Table 19.5 name, its donor atoms at the corners of a faint
   polyhedron. Still: a new complex is one morph.
===================================================================== */
(function () {
  const d = sim('sim-complex-geometry');
  const v = F.view3d(d.stage, { ...FREE, h: 680, dist: 9.6 });
  const key = F.makeCanvas(d.stage, 64);
  const g = v.part(0); g.position.y = -0.2;
  const K = 0.62;
  const eq = (n, off = 90) => Array.from({ length: n }, (_, i) => dirOf(90, off + (360 / n) * i));
  const GEOM = {
    linear: { name: 'linear', dirs: [[0, 1, 0], [0, -1, 0]], edge: 0 },
    trigonal: { name: 'trigonal planar', dirs: [90, 210, 330].map((a) => [Math.cos(a * RAD), Math.sin(a * RAD), 0]), edge: 1.8 },
    tetrahedral: { name: 'tetrahedral', dirs: [[0, 1, 0], ...[90, 210, 330].map((az) => dirOf(109.47, az))], edge: 1.7, arc: [0, 1, '109.5°'] },
    square: { name: 'square planar', dirs: [[0, 1, 0], [1, 0, 0], [0, -1, 0], [-1, 0, 0]], edge: 1.5, arc: [0, 1, '90°'] },
    tbp: { name: 'trigonal bipyramidal', dirs: [[0, 1, 0], [0, -1, 0], ...eq(3)], edge: 1.8 },
    spy: { name: 'square pyramidal', dirs: [[0, 1, 0], ...[0, 90, 180, 270].map((az) => dirOf(104, az))], edge: 1.7 },
    octahedral: { name: 'octahedral', dirs: OCT, edge: 1.5, arc: [0, 2, '90°'] },
    pbp: { name: 'pentagonal bipyramid', dirs: [[0, 1, 0], [0, -1, 0], ...eq(5)], edge: 1.5 },
    sap: { name: 'square antiprism', dirs: [...[45, 135, 225, 315].map((az) => dirOf(59.27, az)), ...[0, 90, 180, 270].map((az) => dirOf(120.73, az))], edge: 1.4 },
    dodec: { name: 'dodecahedron', dirs: [dirOf(36.85, 0), dirOf(36.85, 180), dirOf(143.15, 90), dirOf(143.15, 270), dirOf(69.46, 90), dirOf(69.46, 270), dirOf(110.54, 0), dirOf(110.54, 180)], edge: 1.55 },
  };
  Object.values(GEOM).forEach((G) => { G.edges = []; G.dirs.forEach((a, i) => G.dirs.forEach((b, j) => { if (j > i && V.len(V.sub(a, b)) < G.edge) G.edges.push([i, j]); })); });
  const NUM = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'];
  /* [id, option label, metal, geometry, ligands by site (type or [type, r]), M–L distance Å, ion charge, headline, en bridges] */
  const ROWS = [
    ['ag', '[Ag(NH₃)₂]⁺', 'Ag', 'linear', 'NH3', 2.1, 1],
    ['cucn3', '[Cu(CN)₃]²⁻', 'Cu', 'trigonal', 'CN', 1.95, -2],
    ['cucl4', '[CuCl₄]²⁻', 'Cu', 'tetrahedral', 'Cl', 2.23, -2],
    ['zncn4', '[Zn(CN)₄]²⁻', 'Zn', 'tetrahedral', 'CN', 2.02, -2],
    ['nico4', '[Ni(CO)₄]', 'Ni', 'tetrahedral', 'CO', 1.82, 0],
    ['nicn4', '[Ni(CN)₄]²⁻', 'Ni', 'square', 'CN', 1.86, -2],
    ['ptnh3cl2', '[Pt(NH₃)₂Cl₂]', 'Pt', 'square', [['Cl', 2.32], ['NH3', 2.05], ['NH3', 2.05], ['Cl', 2.32]], 0, 0],
    ['cocl5', '[CoCl₅]²⁻', 'Co', 'tbp', 'Cl', 2.3, -2],
    ['vocn4', '[VO(CN)₄]²⁻', 'V', 'spy', [['O', 1.6], ['CN', 2.15], ['CN', 2.15], ['CN', 2.15], ['CN', 2.15]], 0, -2],
    ['coh2o6', '[Co(H₂O)₆]²⁺', 'Co', 'octahedral', 'OH2', 2.1, 2],
    ['cren3', '[Cr(en)₃]³⁺', 'Cr', 'octahedral', 'en', 2.08, 3, [[0, 2], [1, 4], [3, 5]]],
    ['ptcl6', 'K₂[PtCl₆]', 'Pt', 'octahedral', 'Cl', 2.32, -2],
    ['cocl6', '[CoCl₆]³⁻', 'Co', 'octahedral', 'Cl', 2.4, -3],
    ['zrf7', '[ZrF₇]³⁻', 'Zr', 'pbp', 'F', 2.05, -3],
    ['ref8', '[ReF₈]²⁻', 'Re', 'sap', 'F', 1.95, -2],
    ['mocn8', '[Mo(CN)₈]⁴⁻', 'Mo', 'dodec', 'CN', 2.17, -4],
  ];
  const signed = (q) => (q > 0 ? '+' + q : q < 0 ? '-' + -q : '0');
  const E = (s) => `\\text{${s}}`;
  const TEXION = {
    ag: `[${E('Ag')}(${E('NH')}_3)_2]^{+}`, cucn3: `[${E('Cu')}(${E('CN')})_3]^{2-}`, cucl4: `[${E('CuCl')}_4]^{2-}`, zncn4: `[${E('Zn')}(${E('CN')})_4]^{2-}`,
    nico4: `[${E('Ni')}(${E('CO')})_4]`, nicn4: `[${E('Ni')}(${E('CN')})_4]^{2-}`, ptnh3cl2: `[${E('Pt')}(${E('NH')}_3)_2${E('Cl')}_2]`, cocl5: `[${E('CoCl')}_5]^{2-}`,
    vocn4: `[${E('VO')}(${E('CN')})_4]^{2-}`, coh2o6: `[${E('Co')}(${E('H')}_2${E('O')})_6]^{2+}`, cren3: `[${E('Cr')}(${E('en')})_3]^{3+}`, ptcl6: `[${E('PtCl')}_6]^{2-}`,
    cocl6: `[${E('CoCl')}_6]^{3-}`, zrf7: `[${E('ZrF')}_7]^{3-}`, ref8: `[${E('ReF')}_8]^{2-}`, mocn8: `[${E('Mo')}(${E('CN')})_8]^{4-}`,
  };
  const LIGNAME = { NH3: 'ammine', OH2: 'aqua', Cl: 'chloride', F: 'fluoride', O: 'oxo', CN: 'cyanide', CO: 'carbonyl', en: 'en' };
  const C = {};
  ROWS.forEach(([id, label, metal, geom, lig, r, q, bridges]) => {
    const G = GEOM[geom];
    const sites = G.dirs.map((dd, i) => { const [type, rr] = Array.isArray(lig) ? lig[i] : [lig, r]; return { d: dd, type, r: rr }; });
    /* the ligands' charges grouped by kind, en counted once per ligand */
    const kinds = [...new Set(sites.map((s) => s.type))];
    const terms = kinds.map((t) => { const n = sites.filter((s) => s.type === t).length / (t === 'en' ? 2 : 1); return { t, n, q: LIG[t].q }; });
    const sum = terms.reduce((s, t) => s + t.n * t.q, 0), x = q - sum;
    const termTex = terms.map((t, i) => `\\mk{t${i}}{${t.n === 1 ? '' : t.n}${t.n === 1 ? signed(t.q) : '(' + signed(t.q) + ')'}}`).join(' + ');
    const tex = `\\mk{ion}{${TEXION[id]}}:\\ \\mk{q}{${signed(q)}} = ${termTex} + \\mk{x}{x}\\;\\Rightarrow\\; \\mk{r}{x = ${signed(x)}}`;
    const cn = G.dirs.length;
    const what = bridges ? `three en ligands, ${NUM[cn]} nitrogen donor atoms`
      : `${kinds.map((t) => `${NUM[sites.filter((s) => s.type === t).length]} ${LIGNAME[t]}`).join(' and ')} ligand${cn > 1 ? 's' : ''}, donor atoms`;
    const shape = { linear: 'in a line on either side of the metal', trigonal: 'at the corners of a triangle', tetrahedral: 'at the corners of a tetrahedron', square: 'at the corners of a square', tbp: 'at the corners of a trigonal bipyramid', spy: 'at the corners of a square pyramid', octahedral: 'at the corners of an octahedron', pbp: 'at the corners of a pentagonal bipyramid', sap: 'at the corners of a square antiprism', dodec: 'at the corners of a dodecahedron' }[geom];
    const head = `${label}: ${what} ${shape}, coordination number ${cn}${label.startsWith('K₂') ? '; the K⁺ ions lie outside the coordination sphere' : ''}.`;
    const note = { tetrahedral: 'Each pair of ligands forms an angle of $\\htmlClass{kv-angle}{109.5^\\circ}$.', square: 'Each ligand has two others at $\\htmlClass{kv-angle}{90^\\circ}$, the cis positions, and one at $\\htmlClass{kv-angle}{180^\\circ}$, the trans position.', octahedral: 'Adjacent donor atoms are $\\htmlClass{kv-angle}{90^\\circ}$ apart about the central atom.' }[geom] || '';
    C[id] = { id, label, metal, geom, sites, bridges: bridges || [], tex, terms: terms.length, head, note, kinds };
  });
  const pick = F.select(d.controls, { label: '\\text{complex}', aria: 'the complex', options: ROWS.map(([id, label, , geom]) => ({ value: id, label: `${label} · ${GEOM[geom].name}` })), value: 'coh2o6' });
  const ro = F.readout(d);
  function draw() {
    const k = pick.k, A = C[pick.from], B = C[pick.value];
    const { atoms, bonds, donors } = blend(A, B, k, K);
    v.clear();
    molecule(v, g, atoms, bonds, k);
    /* the polyhedron through the donor atoms of whichever complex the morph is nearer */
    const S = k < 0.5 ? A : B, edges = GEOM[S.geom].edges;
    edges.forEach(([i, j]) => { const a = donors[i], b = donors[j]; if (a && b) polyline(g, [V.mul(a.d, a.r * K), V.mul(b.d, b.r * K)], PAL.muted); });
    const arc = GEOM[B.geom].arc;
    if (arc && k > 0.6) {
      const [i, j, lab] = arc, a = donors[i], b = donors[j];
      const { pts, mid } = arcPts(a.d, b.d, 0.62, null);
      polyline(g, pts, F.C('angle'));
      plain(hued(v.label(lab, mid, g, 0, 'bare'), 'angle'), (k - 0.6) / 0.4);
    }
    keyRow(key, symsOf(atoms));
    v.headline(B.head);
    ro.set(B.tex, '', { form: B.terms });
  }
  still(d, draw);
})();

/* =====================================================================
   FIGURE 19.21 + 19.22: cis and trans. One chloride ligand swings from
   beside the other to directly across from it, trading places with the
   ligand that was there. Still: a choice is one morph.
===================================================================== */
(function () {
  const d = sim('sim-cis-trans');
  const v = F.view3d(d.stage, { spin: 'idle', h: 620, dist: 7.6 });
  const key = F.makeCanvas(d.stage, 64);
  const g = v.part(0); g.position.y = -0.35;
  const K = 0.62;
  const [Y, Yn, X, Xn, Z, Zn] = OCT;
  const site = (dd, type, r) => ({ d: dd, type, r });
  const oct = (L, rL, cis) => [site(Y, 'Cl', 2.3), site(cis ? Yn : X, L, rL), site(cis ? X : Yn, 'Cl', 2.3), site(Xn, L, rL), site(Z, L, rL), site(Zn, L, rL)];
  const sq = (cis) => [site(Y, 'Cl', 2.32), site(cis ? Yn : X, 'NH3', 2.05), site(cis ? X : Yn, 'Cl', 2.32), site(Xn, 'NH3', 2.05)];
  const VIOLET = '#7d4fa8', GREEN = '#4a8f3c';
  const CPX = {
    aqua: { metal: 'Co', name: '[Co(H₂O)₄Cl₂]⁺', sites: (c) => oct('OH2', 2.1, c), colour: true, L: 'H₂O' },
    ammine: { metal: 'Co', name: '[Co(NH₃)₄Cl₂]⁺', sites: (c) => oct('NH3', 1.97, c), colour: true, L: 'NH₃' },
    pt: { metal: 'Pt', name: '[Pt(NH₃)₂Cl₂]', sites: (c) => sq(c), colour: false, L: 'NH₃' },
  };
  const cx = F.select(d.controls, { label: '\\text{complex}', aria: 'the complex', options: [{ value: 'aqua', label: '[Co(H₂O)₄Cl₂]⁺' }, { value: 'ammine', label: '[Co(NH₃)₄Cl₂]⁺' }, { value: 'pt', label: '[Pt(NH₃)₂Cl₂]' }], value: 'aqua' });
  const iso = F.choice(d.controls, { label: '\\text{isomer}', aria: 'the isomer', options: [{ value: 'cis', label: 'cis' }, { value: 'trans', label: 'trans' }], value: 'cis' });
  const ro = F.readout(d);
  const state = (c, i) => ({ metal: CPX[c].metal, sites: CPX[c].sites(i === 'cis'), bridges: [] });
  const swatch = (hex) => `<span style="display:inline-block;width:0.8em;height:0.8em;border-radius:2px;margin:0 0.15em;vertical-align:-0.05em;background:${F.fact(hex)}"></span>`;
  function draw() {
    /* whichever control moved last is the one morphing; the other is already at rest */
    const moving = cx.k < 1 ? 'cx' : 'iso', k = moving === 'cx' ? cx.k : iso.k;
    const A = moving === 'cx' ? state(cx.from, iso.value) : state(cx.value, iso.from), B = state(cx.value, iso.value);
    const { atoms, bonds, donors } = blend(A, B, k, K);
    v.clear();
    molecule(v, g, atoms, bonds, k);
    const a = donors[0], b = donors[2];
    const others = donors.filter((x, i) => x && i !== 0 && i !== 2).map((x) => x.d);
    const m = [[1, 0, 1], [-1, 0, 1], [0, 0, 1], [1, 0, -1]].map(V.unit).sort((p, q) => Math.min(...others.map((o) => -V.dot(o, q))) - Math.min(...others.map((o) => -V.dot(o, p))))[0];
    const { pts, mid } = arcPts(a.d, b.d, 0.62, m);
    polyline(g, pts, F.C('angle'));
    const cis = iso.value === 'cis', P = CPX[cx.value], M = P.metal;
    if (k > 0.6) plain(hued(v.label(cis ? '90°' : '180°', mid, g, 0, 'bare'), 'angle'), (k - 0.6) / 0.4);
    keyRow(key, symsOf(atoms));
    const colour = P.colour ? (cis ? `, which is violet${swatch(VIOLET)}` : `, which is green${swatch(GREEN)}`) : '';
    v.headline(cis ? `In <i>cis</i>-${P.name}${colour}, the two chloride ligands are adjacent.` : `In <i>trans</i>-${P.name}${colour}, each ligand is directly across from an identical one.`);
    ro.set(`\\htmlClass{kv-angle}{\\angle\\text{Cl–${M}–Cl}} = ${cis ? 90 : 180}^\\circ`,
      cis ? `The two ${M}–Cl bond dipoles lie on one side of the metal and do not cancel.` : `Opposite bond dipoles cancel.`);
  }
  still(d, draw);
})();

/* =====================================================================
   FIGURE 19.23 + 19.24: an ion beside its mirror image, then the image
   turned to whichever of the octahedron's 24 positions matches the most
   atoms and laid over the original. Still: a choice is one morph.
===================================================================== */
(function () {
  const d = sim('sim-optical-isomers');
  const v = F.view3d(d.stage, { spin: 'off', tilt: 0.12, h: 620, dist: 8.4, yaw: [-0.9, 0.9] });
  const key = F.makeCanvas(d.stage, 64);
  const g = v.part(0); g.position.y = -0.1;
  const K = 0.5, D = 3.7 * K;
  const site = (i, type, r) => ({ d: OCT[i], type, r });
  const CPX = {
    en3: { metal: 'M', name: '[M(en)₃]ⁿ⁺', sites: [0, 1, 2, 3, 4, 5].map((i) => site(i, 'en', 2.1)), bridges: [[0, 2], [1, 4], [3, 5]] },
    cis: { metal: 'Co', name: '<i>cis</i>-[Co(en)₂Cl₂]⁺', sites: [0, 1, 2, 3, 4, 5].map((i) => (i === 0 || i === 2 ? site(i, 'Cl', 2.3) : site(i, 'en', 2.0))), bridges: [[1, 4], [3, 5]] },
    trans: { metal: 'Co', name: '<i>trans</i>-[Co(en)₂Cl₂]⁺', sites: [0, 1, 2, 3, 4, 5].map((i) => (i < 2 ? site(i, 'Cl', 2.3) : site(i, 'en', 2.0))), bridges: [[2, 4], [3, 5]] },
  };
  /* the 24 rotations of the octahedron as axis and angle */
  const ROTS = [[[0, 1, 0], 0]];
  [[1, 0, 0], [0, 1, 0], [0, 0, 1]].forEach((n) => [1, 2, 3].forEach((q) => ROTS.push([n, (q * Math.PI) / 2])));
  [[1, 1, 1], [1, 1, -1], [1, -1, 1], [-1, 1, 1]].forEach((n) => [1, 2].forEach((q) => ROTS.push([V.unit(n), (q * 2 * Math.PI) / 3])));
  [[1, 1, 0], [1, -1, 0], [1, 0, 1], [1, 0, -1], [0, 1, 1], [0, 1, -1]].forEach((n) => ROTS.push([V.unit(n), Math.PI]));
  const mirror = (p) => [-p[0], p[1], p[2]];
  /* each complex is turned so that the threefold axis of [M(en)₃]ⁿ⁺, (−1, 1, 1) in the octahedron's frame, points at the
     reader: the three rings then stand as a propeller, and the two hands of the propeller are the two isomers; and */
  /* the plane y = z of the octahedron, which holds that axis and is one of its mirror planes, is laid on the mirror
     between the two, so the image's donor atoms sit on the same six corners and the octahedron's rotations can fit it */
  const U3 = V.unit([-1, 1, 1]), U1 = V.unit([0, 1, -1]), U2 = V.cross(U3, U1);
  const Q = (p) => [V.dot(p, U1), V.dot(p, U2), V.dot(p, U3)];
  /* for each complex, the rotation of its mirror image that leaves the fewest atoms without a twin of the same element */
  Object.values(CPX).forEach((c) => {
    const S = { metal: c.metal, sites: c.sites, bridges: c.bridges };
    const orig = blend(S, S, 1, K).atoms.map((t) => ({ ...t, p: Q(t.p) }));
    let best = null;
    /* the octahedron's rotations, carried into the turned frame */
    ROTS.forEach(([n0, a]) => {
      const n = Q(n0);
      const miss = orig.filter((t) => !orig.some((o) => o.sym === t.sym && V.len(V.sub(o.p, rot(mirror(t.p), n, a))) < 0.15)).length;
      if (!best || miss < best.miss || (miss === best.miss && a < best.a)) best = { n, a, miss };
    });
    Object.assign(c, { S, best, total: orig.length });
  });
  const cx = F.select(d.controls, { label: '\\text{complex}', aria: 'the complex', options: [{ value: 'en3', label: '[M(en)₃]ⁿ⁺' }, { value: 'cis', label: 'cis-[Co(en)₂Cl₂]⁺' }, { value: 'trans', label: 'trans-[Co(en)₂Cl₂]⁺' }], value: 'en3' });
  const arr = F.choice(d.controls, { label: '\\text{arrangement}', aria: 'the arrangement', options: [{ value: 'mirror', label: 'mirror images' }, { value: 'over', label: 'laid over' }], value: 'mirror' });
  const ro = F.readout(d);
  function draw() {
    const k = cx.k, A = CPX[cx.from], B = CPX[cx.value];
    const t = F.ease.smooth(arr.mix((x) => (x === 'over' ? 1 : 0)));
    const { n, a } = B.best;
    const left = blend(A.S, B.S, k, K);
    left.atoms.forEach((x) => { x.p = V.add(Q(x.p), [-D * (1 - t), 0, 0]); });
    const right = blend(A.S, B.S, k, K, [0, 0, 0], { ghost: true, s: 1 + 0.06 * t });
    right.atoms.forEach((x) => { x.p = V.add(rot(mirror(Q(x.p)), n, a * t), [D * (1 - t), 0, 0]); x.name = 'mirror image: ' + x.name; });
    const off = left.atoms.length;
    const atoms = [...left.atoms, ...right.atoms], bonds = [...left.bonds, ...right.bonds.map((b) => ({ ...b, i: b.i + off, j: b.j + off }))];
    v.clear();
    molecule(v, g, atoms, bonds, k, 1 - 0.55 * t);
    if (t < 0.99) {
      const h = 2.9 * K, l = polyline(g, [[0, h, h], [0, h, -h], [0, -h, -h], [0, -h, h], [0, h, h]], PAL.muted);
      l.material.transparent = true; l.material.opacity = 1 - t;
      plain(v.label('mirror', [0, -h - 0.25, 0], g, 0, 'bare'), 1 - t);
    }
    keyRow(key, symsOf(atoms), t > 0.5 ? [{ s: 'the image, seen through', draw: (cc, x, y) => { cc.save(); cc.globalAlpha = 0.4; cc.beginPath(); cc.arc(x, y, 9, 0, 2 * Math.PI); cc.fillStyle = F.el('C'); cc.fill(); cc.restore(); } }] : []);
    const over = arr.value === 'over', miss = B.best.miss;
    v.headline(over
      ? (miss ? `Turned to its best fit, the mirror image of ${B.name} still leaves ${miss} atoms where the original has none: the two are optical isomers.` : `Turned to fit, the mirror image of ${B.name} lands atom for atom on the original: it is the same ion.`)
      : `${B.name} beside its mirror image.`);
    ro.set(`\\text{atoms of the image with no match} = ${miss}\\ \\text{of}\\ ${B.total}`);
  }
  still(d, draw);
})();
};
