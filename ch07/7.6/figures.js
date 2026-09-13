/* Figures for section 7.6 Molecular Structure and Polarity. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['7.6'] = function (root, F) {
const { el, fmt, tex, PAL, alpha, ctl, cycle, register, begin, line, arrow, text, headline, topline, labeller } = F;
const sim = (id, H) => F.sim(root, id, H);
/* a still figure answers its sliders, or nothing at all, and has no clock */
const still = (d, draw) => register(d.fig, { update: () => {}, draw });
function readout(host, main, small) { tex(host, main); if (small) host.appendChild(el('small', null, small)); }
const RAD = Math.PI / 180, TAU = 2 * Math.PI;
const DEG = '°';
/* a state the figure switches between rather than slides through (rule 26.1): a
   row of buttons with the current one marked, or a dropdown where the list of
   states is long enough that a row of buttons would wrap. The figure still reads
   it as the index it always read. */
function pick(controls, o, names) {
  const make = names.length > 4 ? F.select : F.choice;
  const c = make(controls, { label: o.label, aria: o.aria, options: names.map((n, i) => ({ value: String(i), label: n })), value: String(o.value ?? 0), onInput: () => o.onInput?.() });
  return { get v() { return +c.value; }, set(x) { c.set(String(x)); } };
}

/* ---------- vectors ---------- */
const V = {
  add: (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]],
  sub: (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]],
  mul: (a, k) => [a[0] * k, a[1] * k, a[2] * k],
  dot: (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2],
  len: (a) => Math.hypot(a[0], a[1], a[2]),
  unit: (a) => { const l = Math.hypot(a[0], a[1], a[2]) || 1; return [a[0] / l, a[1] / l, a[2] / l]; },
  angle: (a, b) => Math.acos(Math.max(-1, Math.min(1, V.dot(V.unit(a), V.unit(b))))) / RAD,
};
/* a point on the great circle from unit a to unit b, t from 0 to 1 */
function slerp(a, b, t) {
  const w = Math.acos(Math.max(-1, Math.min(1, V.dot(a, b)))); if (w < 1e-6) return a;
  const s = Math.sin(w); return V.add(V.mul(a, Math.sin((1 - t) * w) / s), V.mul(b, Math.sin(t * w) / s));
}
/* a rotation of v by a degrees about the y axis */
const rotY = (v, a) => { const c = Math.cos(a * RAD), s = Math.sin(a * RAD); return [v[0] * c + v[2] * s, v[1], -v[0] * s + v[2] * c]; };

/* ---------- the element palette, and the radii the atoms are drawn with ---------- */
const RADIUS = { H: 15, C: 24, N: 24, O: 24, F: 22, Cl: 28, S: 28, B: 24, P: 28, Be: 22, Xe: 32, E: 26, X: 20 };
const rOf = (sym) => RADIUS[sym] ?? 24;
/* an atom as a filled disc in its element colour; E and X are not elements and take the panel colour with an ink outline */
function atom(ctx, x, y, sym, r = rOf(sym)) {
  const generic = sym === 'E' || sym === 'X';
  ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, TAU);
  ctx.fillStyle = generic ? PAL.soft : F.el(sym); ctx.fill();
  ctx.lineWidth = sym === 'H' || generic ? 2.5 : 1.5; ctx.strokeStyle = sym === 'H' || generic ? PAL.ink : alpha(PAL.ink, 0.45); ctx.stroke(); ctx.restore();
  if (generic) text(ctx, sym, x, y + 1, PAL.ink, { size: 22, weight: 600, align: 'center' });
}
/* one bond on the canvas between two projected points, of the given order, in ink */
function bondLine(ctx, x1, y1, x2, y2, order = 1, w = 4) {
  const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy) || 1, px = -dy / L * 7, py = dx / L * 7;
  const offs = order === 1 ? [0] : order === 2 ? [-1, 1] : [-1.4, 0, 1.4];
  offs.forEach((o) => line(ctx, x1 + px * o, y1 + py * o, x2 + px * o, y2 + py * o, PAL.ink, w));
}

/* ---------- the ideal sites of the five electron-pair geometries, as unit directions ---------- */
const T3 = Math.sqrt(8 / 9), T1 = -1 / 3;
const SITES = {
  2: [[1, 0, 0], [-1, 0, 0]],
  3: [[0, 1, 0], [Math.cos(210 * RAD), Math.sin(210 * RAD), 0], [Math.cos(330 * RAD), Math.sin(330 * RAD), 0]],
  4: [[0, 1, 0], [T3, T1, 0], rotY([T3, T1, 0], 120), rotY([T3, T1, 0], 240)],
  5: [[0, 1, 0], [0, -1, 0], [1, 0, 0], rotY([1, 0, 0], 120), rotY([1, 0, 0], 240)],
  6: [[0, 1, 0], [0, -1, 0], [1, 0, 0], [-1, 0, 0], [0, 0, 1], [0, 0, -1]],
};
/* which sites the lone pairs take: equatorial in a trigonal bipyramid, opposite one another in an octahedron */
const LONE_AT = { 2: [[]], 3: [[], [0]], 4: [[], [0], [0, 1]], 5: [[], [2], [2, 3], [2, 3, 4]], 6: [[], [0], [0, 1], [0, 1, 2], [0, 1, 2, 3]] };
const MAX_LONE = { 2: 0, 3: 1, 4: 2, 5: 3, 6: 4 };
const GEOM = { 2: 'linear', 3: 'trigonal planar', 4: 'tetrahedral', 5: 'trigonal bipyramidal', 6: 'octahedral' };
const STRUCT = { 2: ['linear'], 3: ['trigonal planar', 'bent'], 4: ['tetrahedral', 'trigonal pyramidal', 'bent'], 5: ['trigonal bipyramidal', 'seesaw', 'T-shaped', 'linear'], 6: ['octahedral', 'square pyramidal', 'square planar', 'T-shaped', 'linear'] };
const IDEAL = { 2: '180°', 3: '120°', 4: '109.5°', 5: '90° and 120°', 6: '90° and 180°' };
const EXAMPLE = { 2: ['BeF₂ and CO₂'], 3: ['BCl₃', 'SO₂'], 4: ['CH₄', 'NH₃', 'H₂O'], 5: ['PF₅', 'SF₄', 'ClF₃', 'XeF₂'], 6: ['SF₆', 'BrF₅', 'XeF₄', '', ''] };
/* the arcs the bench marks: pairs of site indices and the ideal angle between them */
const ARCS = { 2: [[0, 1, '180°']], 3: [[1, 2, '120°']], 4: [[1, 2, '109.5°']], 5: [[0, 2, '90°'], [2, 3, '120°']], 6: [[2, 4, '90°']] };
/* the molecule of a central atom E with n regions, `lone` of them lone pairs, at bond length L */
function generic(n, lone, L = 170, sym = { c: 'E', x: 'X' }, at) {
  const sites = SITES[n], ls = new Set(at ?? LONE_AT[n][lone]);
  const atoms = [{ sym: sym.c, p: [0, 0, 0] }], bonds = [], lones = [];
  sites.forEach((s, i) => { if (ls.has(i)) lones.push({ a: 0, dir: s, len: L * 0.8 }); else { atoms.push({ sym: sym.x, p: V.mul(s, L) }); bonds.push([0, atoms.length - 1, 1]); } });
  return { atoms, bonds, lones, sites, lone: ls };
}

/* ---------- wedge and dash notation: the book's flat drawing of a solid ----------
   A bond in the plane of the page is a line, one coming toward the reader a filled wedge, one going
   away a row of dashes. The sketch takes a molecule whose atoms sit about the origin and projects it
   straight on (x across, y up), reading each bond's z for its notation. */
function wedge(ctx, x1, y1, x2, y2) {
  const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy) || 1, px = -dy / L * 9, py = dx / L * 9;
  ctx.save(); ctx.fillStyle = PAL.ink; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2 + px, y2 + py); ctx.lineTo(x2 - px, y2 - py); ctx.closePath(); ctx.fill(); ctx.restore();
}
function dashes(ctx, x1, y1, x2, y2) {
  const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy) || 1, px = -dy / L, py = dx / L;
  ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3;
  for (let i = 1; i <= 7; i++) { const t = i / 7.5, w = 2 + 8 * t, x = x1 + dx * t, y = y1 + dy * t; ctx.beginPath(); ctx.moveTo(x + px * w, y + py * w); ctx.lineTo(x - px * w, y - py * w); ctx.stroke(); }
  ctx.restore();
}
/* the sketch: atoms as symbols (letters, as the book prints them) at (cx, cy) with scale k; lone pairs as two dots on a stub */
function sketch(ctx, cx, cy, mol, k = 1, labels = true) {
  const P = (p) => [cx + p[0] * k, cy - p[1] * k];
  const gap = (sym) => (labels ? (sym.length > 1 ? 22 : 16) : 0);
  mol.bonds.forEach(([i, j, order]) => {
    const a = mol.atoms[i], b = mol.atoms[j], [x1, y1] = P(a.p), [x2, y2] = P(b.p), dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy) || 1;
    const s1 = gap(a.sym) / L, s2 = gap(b.sym) / L, ax = x1 + dx * s1, ay = y1 + dy * s1, bx = x2 - dx * s2, by = y2 - dy * s2;
    const z = b.p[2] - a.p[2];
    if (Math.abs(z) < 0.15 * V.len(V.sub(b.p, a.p))) bondLine(ctx, ax, ay, bx, by, order ?? 1, 3.5); else if (z > 0) wedge(ctx, ax, ay, bx, by); else dashes(ctx, ax, ay, bx, by);
  });
  (mol.lones ?? []).forEach((l) => {
    const a = mol.atoms[l.a], d = V.unit(l.dir), [x0, y0] = P(a.p), L = (l.len ?? 150) * k * 0.55, x1 = x0 + d[0] * L, y1 = y0 - d[1] * L;
    const px = d[1], py = d[0];
    line(ctx, x0 + d[0] * gap(a.sym), y0 - d[1] * gap(a.sym), x1, y1, PAL.ink, 2.5);
    F.dot(ctx, x1 + px * 7, y1 + py * 7, PAL.ink, true, 4); F.dot(ctx, x1 - px * 7, y1 - py * 7, PAL.ink, true, 4);
  });
  if (labels) mol.atoms.forEach((a) => { const [x, y] = P(a.p); text(ctx, a.sym, x, y + 1, PAL.ink, { size: a.sym.length > 1 ? 26 : 30, weight: 600, align: 'center', bg: PAL.panel }); });
  return P;
}

/* ---------- Lewis structures: letters, bonds and pairs of dots ---------- */
/* atoms: [{sym, x, y, lp: [angles in degrees]}]; bonds: [[i, j, order]]; drawn about (cx, cy) */
function lewis(ctx, cx, cy, atoms, bonds, k = 1) {
  const gap = (s) => (s.length > 1 ? 26 : 18);
  bonds.forEach(([i, j, order]) => {
    const a = atoms[i], b = atoms[j], x1 = cx + a.x * k, y1 = cy + a.y * k, x2 = cx + b.x * k, y2 = cy + b.y * k, dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy) || 1;
    bondLine(ctx, x1 + dx * gap(a.sym) / L, y1 + dy * gap(a.sym) / L, x2 - dx * gap(b.sym) / L, y2 - dy * gap(b.sym) / L, order ?? 1, 3.5);
  });
  atoms.forEach((a) => {
    const x = cx + a.x * k, y = cy + a.y * k;
    text(ctx, a.sym, x, y + 1, PAL.ink, { size: a.sym.length > 1 ? 28 : 32, weight: 600, align: 'center' });
    (a.lp ?? []).forEach((ang) => { const c = Math.cos(ang * RAD), s = -Math.sin(ang * RAD), d = 30, px = -s, py = c; F.dot(ctx, x + c * d + px * 7, y + s * d + py * 7, PAL.ink, true, 4); F.dot(ctx, x + c * d - px * 7, y + s * d - py * 7, PAL.ink, true, 4); });
  });
}
/* the brackets and charge the book prints round an ion */
function ionBrackets(ctx, l, r, t, b, charge) {
  ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.beginPath();
  ctx.moveTo(l + 16, t); ctx.lineTo(l, t); ctx.lineTo(l, b); ctx.lineTo(l + 16, b); ctx.moveTo(r - 16, t); ctx.lineTo(r, t); ctx.lineTo(r, b); ctx.lineTo(r - 16, b); ctx.stroke(); ctx.restore();
  text(ctx, charge, r + 8, t + 2, PAL.ink, { size: 24, weight: 600 });
}
/* a bond-moment arrow with the book's plus sign at its tail */
function moment(ctx, x1, y1, x2, y2, w = 4) {
  arrow(ctx, x1, y1, x2, y2, PAL.ink, w);
  const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L, px = -uy, py = ux, s = 6;
  line(ctx, x1 + px * s, y1 + py * s, x1 - px * s, y1 - py * s, PAL.ink, w * 0.75);
}

/* ---------- three dimensions ----------
   The viewer, the meshes and the navigation buttons all come from the library:
   F.view3d mounts the transparent WebGL scene inside the figure's stage and
   carries auto-rotate, the snap-to-view buttons and zoom, and F.mesh draws the
   balls, sticks, lobes, arrows and arcs a molecule is built from. A molecule
   turns freely: there is no up to keep, and every viewpoint of it is a real
   one, so the only bounds here are the pitch that keeps the turntable upright.
   What stays in this file is what is about chemistry rather than about three
   dimensions: which colour an atom takes and how a molecule record is built. */
const { vec, sphere, stick, setStick, setLobe, lobe: lobe3, bond: bond3, arrow: arrow3, polyline, arc: arc3d } = F.mesh;
/* every molecule turns freely and spins until the reader takes hold of it */
const FREE = { spin: 'idle', views: [{ label: 'axis', yaw: 0, pitch: 0 }, { label: 'face-on', yaw: Math.PI / 2, pitch: 0.32 }] };

/* atoms as spheres in the element palette, bonds as cylinders and lone pairs as lobes in ink;
   `mol` is the same record the sketches read, with p in logical units (a bond about 150) */
const SCALE = 1 / 150;
const darkPanel = () => parseInt(PAL.panel.slice(1, 3), 16) < 128;
const atomColor = (sym) => (sym === 'E' || sym === 'X' ? (darkPanel() ? PAL.muted : PAL.soft2) : F.el(sym));
/* the name of every symbol these figures draw, so no atom is an unnamed coloured ball */
const NAMES = { H: 'hydrogen', C: 'carbon', N: 'nitrogen', O: 'oxygen', F: 'fluorine', Cl: 'chlorine', S: 'sulfur', B: 'boron', P: 'phosphorus', Be: 'beryllium', Xe: 'xenon', E: 'the central atom', X: 'a bonded atom' };
const nameOf = (sym) => (NAMES[sym] ? `${NAMES[sym]} (${sym})` : sym);
function molecule3(g, mol, k = SCALE, v = null) {
  const P = (p) => V.mul(p, k);
  const out = { atoms: [], bonds: [], lones: [] };
  mol.atoms.forEach((a) => { const m = sphere(g, P(a.p), rOf(a.sym) / 62, atomColor(a.sym)); v?.pickable(m, nameOf(a.sym)); out.atoms.push(m); });
  mol.bonds.forEach(([i, j, order]) => out.bonds.push(bond3(g, P(mol.atoms[i].p), P(mol.atoms[j].p), order ?? 1)));
  (mol.lones ?? []).forEach((l) => { const m = lobe3(g, P(mol.atoms[l.a].p), l.dir, (l.len ?? 150) * k); v?.pickable(m, 'a lone pair'); out.lones.push(m); });
  return out;
}
/* a figlib canvas beneath the viewer for the headline, the names and any graph */
const strip = (d, H) => F.makeCanvas(d.stage, H);

/* =====================================================================
   FIGURE 7.14: formaldehyde in three dimensions with its H–C–H angle
   and its C=O distance measured on the molecule. Still: it answers a
   drag and nothing else; the headline reads the angle the flat drawing
   would show from the reader's viewpoint.
===================================================================== */
(function () {
  const d = sim('sim-formaldehyde');
  let shown = 118;
  /* formaldehyde is planar, so the two viewpoints worth a button are the plane of the molecule and its edge (rule 26.2) */
  const v = F.view3d(d.stage, { spin: 'idle', views: [{ label: 'in plane', yaw: 0, pitch: 0 }, { label: 'edge on', yaw: Math.PI / 2, pitch: 0 }], h: 440, dist: 5.8, onRender: () => { if (Math.round(flat()) !== shown) draw2d(); } });
  const g = v.part(0), c2 = strip(d, 190);
  const A = 1.15;   /* scene units per Ångstrom */
  const dirH1 = [Math.cos(121 * RAD), Math.sin(121 * RAD), 0], dirH2 = [Math.cos(-121 * RAD), Math.sin(-121 * RAD), 0];
  const P = { C: [0, 0, 0], O: [1.21 * A, 0, 0], H1: V.mul(dirH1, 1.11 * A), H2: V.mul(dirH2, 1.11 * A) };
  const mol = { atoms: [{ sym: 'C', p: P.C }, { sym: 'O', p: P.O }, { sym: 'H', p: P.H1 }, { sym: 'H', p: P.H2 }], bonds: [[0, 1, 2], [0, 2, 1], [0, 3, 1]] };
  /* the angle the two C–H bonds make on the canvas, which is what a flat drawing from this viewpoint would show */
  function flat() {
    const c = v.project(P.C, g), a = v.project(P.H1, g), b = v.project(P.H2, g), s1 = [a[0] - c[0], a[1] - c[1]], s2 = [b[0] - c[0], b[1] - c[1]];
    return Math.acos(Math.max(-1, Math.min(1, (s1[0] * s2[0] + s1[1] * s2[1]) / ((Math.hypot(...s1) * Math.hypot(...s2)) || 1)))) / RAD;
  }
  function build() {
    v.clear();
    molecule3(g, mol, 1, v);
    const m = arc3d(g, dirH1, dirH2, 0.62); v.label('118°', m, g, 0);
    /* the bracket beside the C=O bond, in the molecule's own plane */
    const y = -0.5 * A, b1 = [P.C[0], y, 0], b2 = [P.O[0], y, 0];
    polyline(g, [[P.C[0], y + 0.14 * A, 0], b1, b2, [P.O[0], y + 0.14 * A, 0]]);
    v.label('1.21 Å, center to center', [(P.C[0] + P.O[0]) / 2, y - 0.16 * A, 0], g, -14);
    v.label('C', P.C, g, 62); v.label('O', P.O, g, 62); v.label('H', V.mul(dirH1, 1.3 * A), g, -14); v.label('H', V.mul(dirH2, 1.3 * A), g, -14);
  }
  function draw2d() {
    const { ctx } = begin(c2);
    shown = Math.round(flat());
    topline(ctx, 'The H–C–H bond angle is 118° and the C=O bond distance is 1.21 Å; from this viewpoint a flat drawing would show the angle as ' + shown + '°.');
    text(ctx, 'A bond angle is the angle between two bonds that share an atom, and this one is 118°.', 700, 118, PAL.muted, { size: 17, align: 'center' });
    text(ctx, 'A bond distance is the distance between two bonded nuclei, 1.21 Å for the C=O bond here. The C–H bonds are 1.11 Å and the H–C=O angles 121°.', 700, 146, PAL.muted, { size: 17, align: 'center' });
    text(ctx, 'Drag the molecule to turn it.', 700, 176, PAL.muted, { size: 16, align: 'center' });
    readout(d.readout, `\\angle\\text{HCH} = 118^\\circ \\qquad d(\\text{C=O}) = 1.21\\ \\text{Å} = 121\\ \\text{pm}`,
      Math.abs(shown - 118) < 3 ? 'Seen face on, the drawing shows the angle as it is; a Lewis structure is drawn this way and still says nothing about the angle.' : 'The angle is measured in the plane of the molecule, so turning the molecule changes only what the flat drawing seems to show.');
  }
  function draw() { build(); draw2d(); }
  still(d, draw);
})();

/* =====================================================================
   FIGURE 7.15: the Lewis structure of BeF2, faithful, with its 180°.
===================================================================== */
(function () {
  const d = sim('fig-bef2', 300);
  function draw() {
    const { ctx } = begin(d.c);
    lewis(ctx, 700, 150, [{ sym: 'F', x: -190, y: 0, lp: [90, 180, 270] }, { sym: 'Be', x: 0, y: 0 }, { sym: 'F', x: 190, y: 0, lp: [90, 0, 270] }], [[0, 1, 1], [1, 2, 1]]);
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(700, 150, 70, Math.PI * 1.08, Math.PI * 1.92); ctx.stroke(); ctx.restore();
    text(ctx, '180°', 700, 52, PAL.ink, { size: 22, weight: 600, align: 'center' });
    readout(d.readout, '\\text{F–Be–F}', 'Two regions of electron density and no lone pair on the central atom: the bonds lie on opposite sides of the beryllium atom.');
  }
  still(d, draw);
})();

/* =====================================================================
   FIGURE 7.16 + 7.19 + 7.20: the VSEPR bench. A central atom E with its
   regions in three dimensions, the lone pairs as lobes, the ideal angles
   as arcs, the axial and equatorial positions named at five regions,
   and beneath it the two names and the book's wedge-and-dash sketch of
   the same case. Still: the arrangement answers its sliders and a drag.
===================================================================== */
(function () {
  const d = sim('sim-vsepr');
  const v = F.view3d(d.stage, { ...FREE, h: 460, dist: 5 });
  const g = v.part(0), c2 = strip(d, 330);
  const N = ctl(d.controls, { label: '\\text{regions}', cls: '', min: 2, max: 6, step: 1, value: 4, unit: '', dec: 0, aria: 'regions of electron density', onInput: fitLone });
  const LP = ctl(d.controls, { label: '\\text{lone pairs}', cls: '', min: 0, max: 4, step: 1, value: 1, unit: '', dec: 0, aria: 'lone pairs among the regions', detents: [0, 1, 2, 3, 4] });
  /* the labels are tiered (rule 26.7): the central atom, one bonded atom and the marked angles are always shown, and the
     rest of the names, which would run to ten on a turning molecule, wait behind a button, with hover names all the while */
  const LAB = F.choice(d.controls, { label: '\\text{Labels}', options: [{ value: 'off', label: 'off' }, { value: 'on', label: 'on' }], value: 'off', aria: 'names on every bonded atom and position' });
  /* Figure 7.20: the three ways two lone pairs could be placed in a trigonal bipyramid, which only ClF3 needs, so the
     control appears only in that case rather than standing there doing nothing (rule 24.6) */
  const CLF = {
    eq: { label: 'both equatorial', at: [2, 3], struct: 'T-shaped', why: 'This is the arrangement ClF\u2083 actually takes. Both lone pairs sit in equatorial positions, where the 120\u00b0 angles give them the most room, and the three fluorine atoms make a T.' },
    one: { label: 'one axial', at: [0, 2], struct: 'neither of the named structures', why: 'One lone pair has been moved to an axial position, where three neighbors stand at 90\u00b0 to it rather than two, so this arrangement is less stable than the one ClF\u2083 takes.' },
    both: { label: 'both axial', at: [0, 1], struct: 'trigonal planar', why: 'Both lone pairs have been moved to axial positions, where each is crowded by three neighbors at 90\u00b0, so this is the least stable of the three and is not what ClF\u2083 does.' },
  };
  const PL = F.choice(d.controls, { label: '\\text{lone pairs of ClF}_3', options: Object.keys(CLF).map((k) => ({ value: k, label: CLF[k].label })), value: 'eq', aria: 'where the two lone pairs of ClF3 are placed' });
  const PLBOX = d.controls.lastElementChild;
  function fitLone() { const m = MAX_LONE[N.v]; if (LP.v > m) LP.set(m); }
  function draw() {
    const { ctx } = begin(c2);
    const n = N.v, lone = Math.min(LP.v, MAX_LONE[n]); if (LP.v !== lone) LP.set(lone);
    const clf = n === 5 && lone === 2, place = CLF[PL.value], all = LAB.value === 'on';
    PLBOX.style.display = clf ? '' : 'none';
    const mol = generic(n, lone, 170, undefined, clf ? place.at : undefined), bonds = n - lone, L = 170 * SCALE;
    v.clear();
    molecule3(g, mol, SCALE, v);
    ARCS[n].forEach(([i, j, label]) => { const m = arc3d(g, mol.sites[i], mol.sites[j], L * 0.5); v.label(label, m, g, 0); });
    v.label('E', [0, 0, 0], g, -54);
    mol.atoms.slice(1).forEach((a, i) => { if (i === 0 || all) v.label('X', V.mul(a.p, SCALE * 1.3), g, 0); });
    if (n === 5) { v.label('axial', V.mul(mol.sites[0], L + 0.4), g, 0); if (all) v.label('axial', V.mul(mol.sites[1], L + 0.4), g, 0); v.label('equatorial', V.mul(mol.sites[2], L + 0.55), g, 0); }
    /* the sketch, straight on as the book draws it, and the two names */
    const P = sketch(ctx, 300, 205, mol, 0.6, false);
    mol.atoms.forEach((a) => { const [x, y] = P(a.p); atom(ctx, x, y, a.sym, a.sym === 'E' ? 20 : 15); });
    text(ctx, 'in wedge and dash notation', 300, 305, PAL.muted, { size: 17, align: 'center' });
    const struct = clf ? place.struct : STRUCT[n][lone];
    /* only the observed placement is a structure a molecule takes, so the other two name no example */
    const example = clf && PL.value !== 'eq' ? '' : EXAMPLE[n][lone];
    text(ctx, 'The electron-pair geometry is ' + GEOM[n] + '.', 620, 150, PAL.ink, { size: 22, weight: 600 });
    text(ctx, 'The molecular structure is ' + struct + '.', 620, 190, PAL.ink, { size: 22, weight: 600 });
    text(ctx, 'The ideal angles are ' + IDEAL[n] + '.', 620, 240, PAL.ink, { size: 20 });
    text(ctx, example ? 'A molecule that takes it is ' + example + '.' : 'No common molecule takes this arrangement.', 620, 275, PAL.muted, { size: 18 });
    text(ctx, 'Drag the molecule to turn it, and rest the pointer on a body to be told what it is.', 620, 305, PAL.muted, { size: 16 });
    const lp = lone === 0 ? 'no lone pair' : lone === 1 ? 'one lone pair' : lone + ' lone pairs';
    topline(ctx, 'With ' + n + ' regions of electron density and ' + lp + ', the electron-pair geometry is ' + GEOM[n] + ' and the molecular structure is ' + struct + (example ? ', as in ' + example : '') + '.');
    readout(d.readout, `${n}\\ \\text{regions} = ${bonds}\\ \\text{bond${bonds === 1 ? '' : 's'}} + ${lone}\\ \\text{lone pair${lone === 1 ? '' : 's'}}`,
      clf ? place.why
        : lone === 0 ? 'With no lone pair on the central atom, the molecular structure is the electron-pair geometry itself.'
        : n === 5 ? 'A lone pair takes an equatorial position, where the 120° angles leave it more room than the 90° angles of an axial position.'
        : n === 6 && lone === 2 ? 'The two lone pairs sit on opposite sides of the octahedron, 180° apart, which keeps them as far from each other as possible.'
        : 'The lone pair is a region of electron density but not an atom, so it shapes the molecule without appearing in its structure; the real angles are slightly smaller than the ideal ones.');
  }
  still(d, draw);
})();

/* =====================================================================
   SIM: the regions of electron density finding their places. Points on
   a sphere about the central atom repel one another and settle into the
   arrangement that keeps them farthest apart; a lone pair pushes harder.
   Moving: the regions travel and the smallest angle grows as a clock
   runs, and the loop is finite, so it gets the scrubber. The sphere is
   drawn in three dimensions and the reader turns it by dragging.
===================================================================== */
(function () {
  const d = sim('sim-domains');
  const v = F.view3d(d.stage, { ...FREE, h: 420, dist: 4.6 });
  const g = v.part(0), c2 = strip(d, 400);
  const N = ctl(d.controls, { label: '\\text{regions}', cls: '', min: 2, max: 6, step: 1, value: 4, unit: '', dec: 0, aria: 'regions of electron density', onInput: onRegions });
  const LP = ctl(d.controls, { label: '\\text{lone pairs}', cls: '', min: 0, max: 2, step: 1, value: 0, unit: '', dec: 0, aria: 'lone pairs among the regions', detents: [0, 1, 2], onInput: reset });
  /* a repulsion alone cannot tell an axial site from an equatorial one, so at five and six regions the slider has nothing
     to say: it is set to none and disabled rather than moved and snapped back (rule 24.6) */
  function onRegions() { const n = N.v, max = n >= 5 ? 0 : Math.min(2, n - 2); if (LP.v > max) LP.set(max); LP.disable(n >= 5); reset(); }
  const T = 5, cy = cycle(() => T, 1.4), L = 1.15;
  /* a repulsion alone cannot tell an axial site from an equatorial one, so the lone pairs of five and six regions are the bench's to place, not this figure's */
  const simLone = (n, want) => (n >= 5 ? 0 : Math.min(want, n - 2));
  /* a seeded generator, so that a run starts the same way every time and the scrubber can replay it */
  function rng(seed) { let s = seed >>> 0; return () => { s += 0x6D2B79F5; let z = s; z = Math.imul(z ^ (z >>> 15), z | 1); z ^= z + Math.imul(z ^ (z >>> 7), z | 61); return ((z ^ (z >>> 14)) >>> 0) / 4294967296; }; }
  let st = null;   /* {p: unit positions, v: velocities, q: charges, tau: model time reached, trace: [[tau, angle]], meshes} */
  onRegions();
  function init() {
    const n = N.v, lone = simLone(n, LP.v), r = rng(97 + n * 31 + lone * 7);
    const p = [], vel = [], q = [];
    for (let i = 0; i < n; i++) {   /* scattered over one side of the sphere, so they have somewhere to go */
      const a = r() * TAU, b = (0.15 + 0.5 * r()) * Math.PI;
      p.push([Math.sin(b) * Math.cos(a), Math.cos(b), Math.sin(b) * Math.sin(a)]); vel.push([0, 0, 0]); q.push(i < lone ? 1.35 : 1);
    }
    st = { p, v: vel, q, tau: 0, trace: [], built: false };
  }
  function reset() { cy.reset(); st = null; }
  const smallest = (p) => { let m = 180; for (let i = 0; i < p.length; i++) for (let j = i + 1; j < p.length; j++) m = Math.min(m, V.angle(p[i], p[j])); return m; };
  /* advance the regions to model time tau with fixed steps: a tangential repulsion, damped */
  function advance(tau) {
    if (!st || tau < st.tau) init();
    const h = 1 / 120, n = st.p.length;
    while (st.tau + h <= tau + 1e-9) {
      const f = st.p.map(() => [0, 0, 0]);
      for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) {
        const dvec = V.sub(st.p[i], st.p[j]), r = Math.max(0.08, V.len(dvec)), k = (st.q[i] * st.q[j]) / (r * r * r);
        f[i] = V.add(f[i], V.mul(dvec, k)); f[j] = V.sub(f[j], V.mul(dvec, k));
      }
      for (let i = 0; i < n; i++) {
        const tan = V.sub(f[i], V.mul(st.p[i], V.dot(f[i], st.p[i])));
        st.v[i] = V.add(V.mul(st.v[i], 1 - 8 * h), V.mul(tan, 24 * h));
        st.p[i] = V.unit(V.add(st.p[i], V.mul(st.v[i], h)));
      }
      st.tau += h;
      if (st.trace.length === 0 || st.tau - st.trace[st.trace.length - 1][0] > 0.04) st.trace.push([st.tau, smallest(st.p)]);
    }
    if (st.trace.length === 0) st.trace.push([0, smallest(st.p)]);
  }
  /* the scene is built once per run and its regions moved every frame; the arc of the smallest angle is redrawn */
  function build() {
    v.clear();
    v.pickable(sphere(g, [0, 0, 0], rOf('E') / 62, atomColor('E')), nameOf('E')); v.label('E', [0, 0, 0], g, -54);
    sphere(g, [0, 0, 0], L, PAL.ink, { transparent: true, opacity: 0.07, depthWrite: false });
    st.meshes = st.p.map((u, i) => (st.q[i] > 1 ? { lobe: v.pickable(lobe3(g, [0, 0, 0], u, L * 0.8), 'a lone pair') } : { atom: v.pickable(sphere(g, V.mul(u, L), rOf('X') / 62, atomColor('X')), nameOf('X')), bond: stick(g, [0, 0, 0], V.mul(u, L), 0.07, PAL.ink) }));
    st.arc = null; st.arcLabel = null; st.built = true;
  }
  function draw() {
    const { ctx } = begin(c2);
    const n = N.v, lone = simLone(n, LP.v);
    const tau = cy.now(); advance(tau);
    if (!st.built) build();
    st.p.forEach((u, i) => { const m = st.meshes[i]; if (m.lobe) setLobe(m.lobe, [0, 0, 0], u, L * 0.8); else { m.atom.position.copy(vec(V.mul(u, L))); setStick(m.bond, [0, 0, 0], V.mul(u, L)); } });
    /* the smallest angle, marked on the sphere */
    let best = [0, 1, 180]; for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) { const a = V.angle(st.p[i], st.p[j]); if (a < best[2]) best = [i, j, a]; }
    const ang = best[2], settled = tau >= T - 1e-9 || (tau > 1.5 && st.v.every((w) => V.len(w) < 0.02));
    if (st.arc) { g.remove(st.arc); st.arc.geometry.dispose(); st.arc.material.dispose(); }
    const pts = []; for (let i = 0; i <= 24; i++) pts.push(V.mul(slerp(st.p[best[0]], st.p[best[1]], i / 24), L * 0.45));
    st.arc = polyline(g, pts);
    const mid = V.mul(V.unit(slerp(st.p[best[0]], st.p[best[1]], 0.5)), L * 0.45 + 0.2);
    if (!st.arcLabel) st.arcLabel = v.label('', mid, g, 0);
    st.arcLabel.textContent = fmt(ang, 0) + '°'; st.arcLabelP = mid; st.arcLabel.__p = mid;
    v.invalidate();
    /* the trace of the smallest angle against time, on a fixed frame: 0 to 180°, 0 to 5 s */
    const box = { l: 400, r: 1040, t: 120, b: 300 };
    const { X, Y } = F.axes(ctx, box, [0, T], [0, 180], { xl: 'time (s)', yl: 'smallest angle between two regions', nx: 5, ny: 3, fy: (q) => fmt(q, 0) + '°' });
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 4; ctx.beginPath(); st.trace.forEach(([tt, a], i) => { if (i) ctx.lineTo(X(tt), Y(a)); else ctx.moveTo(X(tt), Y(a)); }); ctx.stroke(); ctx.restore();
    F.dot(ctx, X(Math.min(tau, T)), Y(ang), PAL.ink, true, 8);
    const ideal = { 2: 180, 3: 120, 4: 109.5, 5: 90, 6: 90 }[n];
    line(ctx, box.l, Y(ideal), box.r, Y(ideal), alpha(PAL.ink, 0.4), 2, [10, 10]);
    text(ctx, 'ideal ' + ideal + '°', box.r - 6, Y(ideal) - 16, PAL.muted, { size: 17, align: 'right' });
    text(ctx, n + ' regions on a sphere about E' + (lone ? ', ' + lone + ' of them lone pairs' : '') + '. The smallest angle grows until no region can get farther from the rest. Drag the sphere to turn it.', 700, 372, PAL.muted, { size: 17, align: 'center' });
    const found = lone ? GEOM[n] + ' electron-pair geometry, ' + STRUCT[n][Math.min(lone, MAX_LONE[n])] + ' molecular structure' : 'a ' + GEOM[n] + ' arrangement';
    topline(ctx, settled ? 'The ' + n + ' regions have settled into ' + found + ', and the smallest angle between two of them is ' + fmt(ang, 0) + '°.'
      : 'At t = ' + fmt(tau, 1) + ' s the regions are still pushing apart, and the smallest angle between two of them has grown to ' + fmt(ang, 0) + '°.');
    readout(d.readout, `\\text{smallest angle} = ${fmt(ang, 1)}^\\circ \\quad (\\text{ideal } ${ideal}^\\circ)`,
      lone ? 'A lone pair repels more strongly than a bonding pair, so the bonds are pushed toward one another and their angle settles below the ideal.'
        : n >= 5 ? (n === 5 ? 'Five regions cannot all be equivalent: two settle 90° from their neighbors while the other three are 120° apart. ' : 'Six regions square themselves into an octahedron. ') + 'A repulsion alone cannot say which of two unlike positions a lone pair takes; that is decided by the size order, which the bench above applies.'
        : 'Nothing is placed by hand: every region only moves away from the others, and the geometry the book names is where that ends.');
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();

/* =====================================================================
   FIGURE 7.17: methane in wedge and dash notation, faithful.
===================================================================== */
(function () {
  const d = sim('fig-methane', 400);
  const mol = generic(4, 0, 150, { c: 'C', x: 'H' });
  function draw() {
    const { ctx } = begin(d.c);
    sketch(ctx, 700, 205, mol, 1);
    text(ctx, 'A solid line is a bond in the plane of the page, a wedge one coming up out of the plane, and a row of dashes one going down into it.', 700, 372, PAL.muted, { size: 17, align: 'center' });
    readout(d.readout, '\\text{CH}_4', 'Four bonding pairs and no lone pair: the electron-pair geometry and the molecular structure are both tetrahedral, with 109.5° between every pair of bonds.');
  }
  still(d, draw);
})();

/* =====================================================================
   FIGURE 7.18: ammonia in the book's three panels, each a molecule in
   three dimensions that a drag turns together: (a) the four regions,
   (b) the atoms, (c) the angles. Faithful, still.
===================================================================== */
(function () {
  const d = sim('fig-ammonia');
  const v = F.view3d(d.stage, { ...FREE, h: 400, dist: 7 });
  const parts = [-2.7, 0, 2.7].map((x) => v.part(x)), c2 = strip(d, 70);
  /* the real H–N–H angle of 106.8°: three bonds at one polar angle a from the axis of the lone pair */
  const cosA = Math.sqrt((1 + 2 * Math.cos(106.8 * RAD)) / 3), a = Math.acos(cosA), sinA = Math.sin(a);
  const hs = [0, 120, 240].map((az) => [sinA * Math.cos(az * RAD), -cosA, sinA * Math.sin(az * RAD)]);
  const L = 150;
  const nh3 = { atoms: [{ sym: 'N', p: [0, 0, 0] }, ...hs.map((h) => ({ sym: 'H', p: V.mul(h, L) }))], bonds: [[0, 1, 1], [0, 2, 1], [0, 3, 1]], lones: [{ a: 0, dir: [0, 1, 0], len: L * 0.85 }] };
  const noLone = { ...nh3, lones: [] };
  function draw() {
    const { ctx } = begin(c2);
    v.clear();
    [[nh3, '(a) The four regions make a tetrahedral electron-pair geometry.'], [noLone, '(b) The molecular structure is trigonal pyramidal.'], [noLone, '(c) Each H–N–H angle is 106.8°.']].forEach(([mol, cap], k) => {
      const g = parts[k];
      molecule3(g, mol, SCALE, v);
      if (k === 0) { v.label('N', [0, 0, 0], g, -52); v.label('lone pair', [0, L * 0.85 * SCALE + 0.25, 0], g, 0); }
      if (k === 2) { [[0, 1], [1, 2], [0, 2]].forEach(([i, j]) => arc3d(g, hs[i], hs[j], 0.5)); v.label('106.8°', arc3d(g, hs[0], hs[1], 0.5), g, -18); }
      text(ctx, cap, 233 + 467 * k, 36, PAL.ink, { size: 19, weight: 600, align: 'center' });
    });
    readout(d.readout, '\\text{NH}_3', 'The lone pair takes up a larger region of space than the single bonds, so the H–N–H angle is slightly smaller than the 109.5° of a regular tetrahedron. Drag any of the three to turn them.');
  }
  still(d, draw);
})();

/* =====================================================================
   FIGURES 7.21 and 7.22: BCl3 and the ammonium ion in wedge and dash
   notation, faithful.
===================================================================== */
(function () {
  const d = sim('fig-bcl3', 380);
  const mol = generic(3, 0, 150, { c: 'B', x: 'Cl' });
  function draw() {
    const { ctx } = begin(d.c);
    sketch(ctx, 700, 200, mol, 1);
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(700, 200, 58, 30 * RAD, 150 * RAD); ctx.stroke(); ctx.restore();
    text(ctx, '120°', 700, 292, PAL.ink, { size: 20, weight: 600, align: 'center' });
    readout(d.readout, '\\text{BCl}_3', 'Three bonds and no lone pair on boron: the three B–Cl bonds lie in one plane, 120° apart, and the molecular structure is trigonal planar.');
  }
  still(d, draw);
})();
(function () {
  const d = sim('fig-ammonium', 420);
  const mol = generic(4, 0, 150, { c: 'N', x: 'H' });
  function draw() {
    const { ctx } = begin(d.c);
    sketch(ctx, 700, 220, mol, 1);
    ionBrackets(ctx, 520, 880, 40, 400, '+');
    readout(d.readout, '\\text{NH}_4{}^{+}', 'Four bonds and no lone pair on nitrogen: the four regions point to the corners of a tetrahedron, and the molecular structure is tetrahedral too.');
  }
  still(d, draw);
})();

/* =====================================================================
   FIGURES 7.23, 7.24 and 7.25: water, SF4 and XeF4, each in the book's
   two panels, (a) the regions of electron density and (b) the atoms,
   faithful, in three dimensions; a drag turns both together.
===================================================================== */
function twoPanels(id, molA, molB, capA, capB, small, formula) {
  const d = sim(id);
  const v = F.view3d(d.stage, { ...FREE, h: 400, dist: 6.4 });
  const parts = [-2.1, 2.1].map((x) => v.part(x)), c2 = strip(d, 70);
  function draw() {
    const { ctx } = begin(c2);
    v.clear();
    [[molA, capA], [molB, capB]].forEach(([mol, cap], k) => {
      const g = parts[k]; molecule3(g, mol, SCALE, v);
      v.label(mol.atoms[0].sym, [0, 0, 0], g, -56);
      text(ctx, cap, 350 + 700 * k, 36, PAL.ink, { size: 19, weight: 600, align: 'center' });
    });
    readout(d.readout, formula, small + ' Drag either panel to turn both.');
  }
  still(d, draw);
}
/* every region drawn as a lobe: the electron-pair geometry alone */
const allLobes = (n, sym, L = 150) => ({ atoms: [{ sym, p: [0, 0, 0] }], bonds: [], lones: SITES[n].map((s) => ({ a: 0, dir: s, len: L * 0.85 })) });
twoPanels('fig-water', allLobes(4, 'O'), generic(4, 2, 150, { c: 'O', x: 'H' }), '(a) Four regions make a tetrahedral electron-pair geometry.', '(b) Two of them are lone pairs, so the molecular structure is bent.',
  'Two of the four regions about the oxygen atom are lone pairs, so the two hydrogen atoms are bent toward one another; the angle is slightly less than 109.5°, and in fact 104.5°.', '\\text{H}_2\\text{O}');
twoPanels('fig-sf4', allLobes(5, 'S'), generic(5, 1, 150, { c: 'S', x: 'F' }), '(a) Five regions make a trigonal bipyramidal electron-pair geometry.', '(b) One of them is a lone pair in an equatorial position, so the molecular structure is a seesaw.',
  'The lone pair takes one of the three equatorial positions, where it has the most room, and the four fluorine atoms make a seesaw.', '\\text{SF}_4');
twoPanels('fig-xef4', allLobes(6, 'Xe'), generic(6, 2, 150, { c: 'Xe', x: 'F' }), '(a) Six regions make an octahedral electron-pair geometry.', '(b) Two of them are lone pairs on opposite sides, so the molecular structure is square planar.',
  'The two lone pairs sit on opposite sides of the octahedron, 180° apart, and the four fluorine atoms lie in one plane with the xenon atom.', '\\text{XeF}_4');

/* =====================================================================
   The unnumbered Lewis structures of the examples, faithful.
===================================================================== */
function lewisFigure(id, H, atoms, bonds, main, small, extra) {
  const d = sim(id, H);
  function draw() { const { ctx } = begin(d.c); lewis(ctx, 700, H / 2, atoms, bonds); if (extra) extra(ctx); readout(d.readout, main, small); }
  still(d, draw);
}
lewisFigure('fig-lewis-co2', 220, [{ sym: 'O', x: -190, y: 0, lp: [90, 270] }, { sym: 'C', x: 0, y: 0 }, { sym: 'O', x: 190, y: 0, lp: [90, 270] }], [[0, 1, 2], [1, 2, 2]],
  '\\text{O=C=O}', 'Each double bond counts as one region of electron density, and there is no lone pair on the carbon atom: two regions.');
lewisFigure('fig-lewis-bcl3', 340, [{ sym: 'B', x: 0, y: 20 }, { sym: 'Cl', x: 0, y: -130, lp: [90, 0, 180] }, { sym: 'Cl', x: -150, y: 105, lp: [180, 270, 135] }, { sym: 'Cl', x: 150, y: 105, lp: [0, 270, 45] }], [[0, 1, 1], [0, 2, 1], [0, 3, 1]],
  '\\text{BCl}_3', 'Three bonds and no lone pair on the boron atom: three regions of electron density.');
lewisFigure('fig-lewis-nh4', 320, [{ sym: 'N', x: 0, y: 0 }, { sym: 'H', x: 0, y: -110 }, { sym: 'H', x: 0, y: 110 }, { sym: 'H', x: -120, y: 0 }, { sym: 'H', x: 120, y: 0 }], [[0, 1, 1], [0, 2, 1], [0, 3, 1], [0, 4, 1]],
  '\\text{NH}_4{}^{+}', 'Four bonds and no lone pair on the nitrogen atom: four regions of electron density.', (ctx) => ionBrackets(ctx, 540, 860, 30, 290, '+'));
lewisFigure('fig-lewis-h2o', 260, [{ sym: 'O', x: 0, y: 0, lp: [90, 0] }, { sym: 'H', x: -120, y: 0 }, { sym: 'H', x: 0, y: 100 }], [[0, 1, 1], [0, 2, 1]],
  '\\text{H}_2\\text{O}', 'Two bonds and two lone pairs on the oxygen atom: four regions of electron density.');
lewisFigure('fig-lewis-sf4', 360, [{ sym: 'S', x: 0, y: 0, lp: [180] }, { sym: 'F', x: 0, y: -130, lp: [90, 0, 180] }, { sym: 'F', x: 0, y: 130, lp: [270, 0, 180] }, { sym: 'F', x: 150, y: -70, lp: [90, 0, 270] }, { sym: 'F', x: 150, y: 70, lp: [90, 0, 270] }], [[0, 1, 1], [0, 2, 1], [0, 3, 1], [0, 4, 1]],
  '\\text{SF}_4', 'Four bonds and one lone pair on the sulfur atom: five regions of electron density.');
lewisFigure('fig-lewis-xef4', 360, [{ sym: 'Xe', x: 0, y: 0, lp: [90, 270] }, { sym: 'F', x: -160, y: -80, lp: [90, 180, 270] }, { sym: 'F', x: 160, y: -80, lp: [90, 0, 270] }, { sym: 'F', x: -160, y: 80, lp: [90, 180, 270] }, { sym: 'F', x: 160, y: 80, lp: [90, 0, 270] }], [[0, 1, 1], [0, 2, 1], [0, 3, 1], [0, 4, 1]],
  '\\text{XeF}_4', 'Four bonds and two lone pairs on the xenon atom: six regions of electron density.');
/* glycine: H2N–CH2–C(=O)–OH, laid out as the book prints it */
const GLY = [{ sym: 'N', x: -300, y: 0, lp: [90] }, { sym: 'H', x: -400, y: -70 }, { sym: 'H', x: -400, y: 70 }, { sym: 'C', x: -140, y: 0 }, { sym: 'H', x: -140, y: -110 }, { sym: 'H', x: -140, y: 110 },
  { sym: 'C', x: 20, y: 0 }, { sym: 'O', x: 120, y: -100, lp: [90, 0] }, { sym: 'O', x: 120, y: 100, lp: [180, 270] }, { sym: 'H', x: 250, y: 100 }];
const GLY_BONDS = [[0, 1, 1], [0, 2, 1], [0, 3, 1], [3, 4, 1], [3, 5, 1], [3, 6, 1], [6, 7, 2], [6, 8, 1], [8, 9, 1]];
lewisFigure('fig-lewis-glycine', 340, GLY, GLY_BONDS, '\\text{H}_2\\text{NCH}_2\\text{CO}_2\\text{H}', 'Four interior atoms, each with a local geometry of its own: the nitrogen, the two carbons and the oxygen that carries a hydrogen.');
(function () {
  const d = sim('fig-glycine-3d', 360);
  /* the same molecule with the bonds about N and the first C in wedge and dash notation */
  const atoms = GLY.map((a) => ({ ...a, lp: a.sym === 'N' ? [90] : a.lp }));
  const z = { 1: 1, 2: -1, 4: 1, 5: -1 };   /* which hydrogens come toward the reader and which go away */
  function draw() {
    const { ctx } = begin(d.c);
    const cx = 700, cy = 180;
    GLY_BONDS.forEach(([i, j, order]) => {
      const a = atoms[i], b = atoms[j], x1 = cx + a.x, y1 = cy + a.y, x2 = cx + b.x, y2 = cy + b.y, dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy);
      const g1 = 18 / L, g2 = 18 / L, ax = x1 + dx * g1, ay = y1 + dy * g1, bx = x2 - dx * g2, by = y2 - dy * g2;
      if (z[j] === 1) wedge(ctx, ax, ay, bx, by); else if (z[j] === -1) dashes(ctx, ax, ay, bx, by); else bondLine(ctx, ax, ay, bx, by, order, 3.5);
    });
    lewis(ctx, cx, cy, atoms, []);
    readout(d.readout, '\\text{H}_2\\text{NCH}_2\\text{CO}_2\\text{H}', 'The bonds about the nitrogen and the first carbon are drawn as wedges and dashes, since each of those atoms has four regions of electron density arranged in a tetrahedron; the second carbon has three, in one plane.');
  }
  still(d, draw);
})();

/* =====================================================================
   The unnumbered vector sketches of the polarity passage, faithful:
   OCS with its two unequal bond moments, chloromethane with four, and
   the partial charges of H2S and NH3.
===================================================================== */
(function () {
  const d = sim('fig-ocs', 320);
  function draw() {
    const { ctx, H } = begin(d.c);
    const lab = labeller(ctx, H);
    const y = 130, xo = 480, xc = 700, xs = 920;
    bondLine(ctx, xo + 26, y, xc - 26, y, 2); bondLine(ctx, xc + 26, y, xs - 30, y, 2);
    atom(ctx, xo, y, 'O'); atom(ctx, xc, y, 'C'); atom(ctx, xs, y, 'S');
    lab.add('O', xo, y, -1, -0.5, PAL.ink, 20, 34); lab.add('C', xc, y, 0, -1, PAL.ink, 20, 34); lab.add('S', xs, y, 1, -0.5, PAL.ink, 20, 34);
    moment(ctx, xc - 30, y + 60, xo + 10, y + 60); moment(ctx, xc + 30, y + 60, xs - 60, y + 60);
    text(ctx, 'bond moments', xc, y + 92, PAL.ink, { size: 18, align: 'center' });
    moment(ctx, xc + 40, y + 150, xc - 130, y + 150, 5);
    text(ctx, 'overall dipole moment', xc, y + 182, PAL.ink, { size: 18, align: 'center' });
    lab.flush();
    readout(d.readout, '\\text{O=C=S}', 'The C–O bond moment is the larger, the C–S bond moment is small and points the other way, and their sum points toward the oxygen end.');
  }
  still(d, draw);
})();
(function () {
  const d = sim('fig-chloromethane', 440);
  const mol = generic(4, 0, 150, { c: 'C', x: 'H' }); mol.atoms[1].sym = 'Cl';
  function draw() {
    const { ctx, H } = begin(d.c);
    const lab = labeller(ctx, H);
    const P = sketch(ctx, 620, 230, mol, 1);
    const c = P(mol.atoms[0].p);
    mol.atoms.slice(1).forEach((a) => {
      const q = P(a.p), dx = q[0] - c[0], dy = q[1] - c[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, px = -uy * 22, py = ux * 22;
      if (a.sym === 'Cl') moment(ctx, c[0] + ux * 30 + px, c[1] + uy * 30 + py, q[0] - ux * 30 + px, q[1] - uy * 30 + py, 4);
      else moment(ctx, q[0] - ux * 26 + px, q[1] - uy * 26 + py, c[0] + ux * 50 + px, c[1] + uy * 50 + py, 3);
    });
    text(ctx, 'each C–H moment is short and points toward the carbon;', 1080, 190, PAL.ink, { size: 18, align: 'center' });
    text(ctx, 'the C–Cl moment is longer and points toward the chlorine', 1080, 220, PAL.ink, { size: 18, align: 'center' });
    text(ctx, 'H < C < Cl in electronegativity', 1080, 260, PAL.muted, { size: 17, align: 'center' });
    lab.flush();
    readout(d.readout, '\\text{CH}_3\\text{Cl}', 'All four bond moments point toward the chlorine end of the molecule, so they add rather than cancel, and the molecule is polar.');
  }
  still(d, draw);
})();
(function () {
  const d = sim('fig-h2s-nh3', 300);
  function draw() {
    const { ctx } = begin(d.c);
    lewis(ctx, 420, 150, [{ sym: 'S', x: 0, y: 0, lp: [90, 0] }, { sym: 'H', x: -120, y: 0 }, { sym: 'H', x: 0, y: 100 }], [[0, 1, 1], [0, 2, 1]]);
    text(ctx, 'δ−', 420 + 60, 150 - 60, PAL.ink, { size: 20, weight: 600 }); text(ctx, 'δ+', 420 - 175, 150, PAL.ink, { size: 20, weight: 600, align: 'right' }); text(ctx, 'δ+', 420 + 30, 150 + 118, PAL.ink, { size: 20, weight: 600 });
    lewis(ctx, 980, 150, [{ sym: 'N', x: 0, y: 0, lp: [90] }, { sym: 'H', x: -120, y: 0 }, { sym: 'H', x: 120, y: 0 }, { sym: 'H', x: 0, y: 100 }], [[0, 1, 1], [0, 2, 1], [0, 3, 1]]);
    text(ctx, 'δ−', 980 + 40, 150 - 60, PAL.ink, { size: 20, weight: 600 }); text(ctx, 'δ+', 980 - 175, 150, PAL.ink, { size: 20, weight: 600, align: 'right' }); text(ctx, 'δ+', 980 + 175, 150, PAL.ink, { size: 20, weight: 600 }); text(ctx, 'δ+', 980 + 30, 150 + 118, PAL.ink, { size: 20, weight: 600 });
    readout(d.readout, '\\text{H}_2\\text{S} \\qquad \\text{NH}_3', 'Every bond moment in each molecule is the same, but the bent and the trigonal pyramidal structures do not let them cancel.');
  }
  still(d, draw);
})();

/* =====================================================================
   FIGURE 7.26 + 7.27: the bond-moment bench. Each bond moment is an
   arrow along its bond whose length follows the electronegativity
   difference, and the molecular dipole is their vector sum in three
   dimensions, all drawn in three dimensions and turned by dragging.
   Still: a vector sum has no time in it.
===================================================================== */
(function () {
  const d = sim('sim-bond-moments');
  /* the list holds molecules of every shape, so the two viewpoints worth a button are the plain ones (rule 26.2) */
  const v = F.view3d(d.stage, { spin: 'idle', views: [{ label: 'front', yaw: 0, pitch: 0.18 }, { label: 'above', yaw: 0, pitch: 1.2 }], h: 440, dist: 6 });
  const g = v.part(0), c2 = strip(d, 250);
  /* the electronegativities the book prints in Figure 7.6, which is the table this figure cites (rule 25) */
  const EN = { H: 2.1, B: 2.0, C: 2.5, N: 3.0, O: 3.5, F: 4.0, P: 2.1, S: 2.5, Cl: 3.0 };
  const L = 150;
  /* three bonds at one polar angle from the axis that make the given angle with one another */
  const pyramid = (angle) => { const cosA = Math.sqrt((1 + 2 * Math.cos(angle * RAD)) / 3), s = Math.sqrt(1 - cosA * cosA); return [0, 120, 240].map((az) => [s * Math.cos(az * RAD), -cosA, s * Math.sin(az * RAD)]); };
  const bent = (angle) => [[Math.cos((-90 - angle / 2) * RAD), Math.sin((-90 - angle / 2) * RAD), 0], [Math.cos((-90 + angle / 2) * RAD), Math.sin((-90 + angle / 2) * RAD), 0]];
  const mk = (name, formula, c, terms, structure, order = 1) => ({ name, formula, structure, atoms: [{ sym: c, p: [0, 0, 0] }, ...terms.map(([s, dir]) => ({ sym: s, p: V.mul(dir, L) }))], bonds: terms.map((_, i) => [0, i + 1, Array.isArray(order) ? order[i] : order]) });
  /* HF and CO are molecules of two atoms; C–H and B–F are single bonds the book draws on their own in Figure 7.26 */
  const pair = (name, a, b, whole = true) => ({ name, formula: name, structure: whole ? 'a molecule of two atoms' : 'a single bond', atoms: [{ sym: a, p: [-L / 2, 0, 0] }, { sym: b, p: [L / 2, 0, 0] }], bonds: [[0, 1, 1]], diatomic: true, whole });
  const MOLS = [
    pair('HF', 'H', 'F'), pair('CO', 'C', 'O'), pair('C–H', 'C', 'H', false), pair('B–F', 'B', 'F', false),
    mk('CO₂', '\\text{CO}_2', 'C', [['O', [1, 0, 0]], ['O', [-1, 0, 0]]], 'linear', 2),
    mk('OCS', '\\text{OCS}', 'C', [['O', [-1, 0, 0]], ['S', [1, 0, 0]]], 'linear', 2),
    mk('H₂O', '\\text{H}_2\\text{O}', 'O', bent(104.5).map((q) => ['H', q]), 'bent, 104.5°'),
    mk('H₂S', '\\text{H}_2\\text{S}', 'S', bent(92.1).map((q) => ['H', q]), 'bent, 92°'),
    mk('BF₃', '\\text{BF}_3', 'B', SITES[3].map((q) => ['F', q]), 'trigonal planar'),
    mk('NH₃', '\\text{NH}_3', 'N', pyramid(107).map((q) => ['H', q]), 'trigonal pyramidal, 107°'),
    mk('CH₄', '\\text{CH}_4', 'C', SITES[4].map((q) => ['H', q]), 'tetrahedral'),
    mk('CH₃Cl', '\\text{CH}_3\\text{Cl}', 'C', SITES[4].map((q, i) => [i === 0 ? 'Cl' : 'H', q]), 'tetrahedral'),
    mk('PF₅', '\\text{PF}_5', 'P', SITES[5].map((q) => ['F', q]), 'trigonal bipyramidal'),
    mk('SF₆', '\\text{SF}_6', 'S', SITES[6].map((q) => ['F', q]), 'octahedral'),
  ];
  const M = pick(d.controls, { label: '\\text{molecule or bond}', value: 6, aria: 'the molecule or the single bond' }, MOLS.map((m) => m.name));
  /* the labels are tiered (rule 26.7): the central atom and one bonded atom are named, since the rest are of the same kind,
     and the whole set of names waits behind a button; every atom answers the pointer either way */
  const LAB = F.choice(d.controls, { label: '\\text{Labels}', options: [{ value: 'off', label: 'off' }, { value: 'on', label: 'on' }], value: 'off', aria: 'a name on every atom' });
  const K = 0.62;   /* scene units of arrow per unit of electronegativity difference */
  function draw() {
    const { ctx } = begin(c2);
    const mol = MOLS[M.v];
    v.clear();
    molecule3(g, mol, SCALE, v);
    /* the bond moments: from the less electronegative atom toward the more, beside the bond */
    let sum = [0, 0, 0]; const rows = [];
    mol.bonds.forEach(([i, j]) => {
      const a = mol.atoms[i], b = mol.atoms[j], dEN = EN[b.sym] - EN[a.sym], [from, to] = dEN >= 0 ? [a, b] : [b, a];
      const u = V.unit(V.sub(to.p, from.p)), mag = Math.abs(dEN); sum = V.add(sum, V.mul(u, mag));
      rows.push({ a, b, dEN });
      if (mag < 0.02) return;
      const side = Math.abs(u[1]) < 0.9 ? V.unit([u[2], 0, -u[0]]) : [1, 0, 0];
      const start = V.add(V.add(V.mul(from.p, SCALE), V.mul(u, 0.22)), V.mul(side, 0.2)), end = V.add(start, V.mul(u, mag * K));
      arrow3(g, start, end, 0.035); const plus = v.label('+', start, g, 4); plus.style.fontSize = '0.7rem'; plus.style.padding = '0 4px';
    });
    const net = V.len(sum), polar = net > 0.05;
    if (polar) { const c = mol.diatomic ? [0, 0, 0] : [0, 0, 0], u = V.unit(sum), tip = V.add(c, V.mul(u, net * K)); arrow3(g, c, tip, 0.06); v.label('dipole moment', V.add(tip, V.mul(u, 0.25)), g, 0); }
    mol.atoms.forEach((a, i) => { if (i > 1 && LAB.value !== 'on') return; v.label(a.sym, V.mul(a.p, SCALE), g, i === 0 && !mol.diatomic ? -52 : 0); });
    /* the electronegativities the arrows are drawn from */
    const seen = new Set(); let y = 130;
    rows.forEach(({ a, b, dEN }) => { const key = a.sym + b.sym; if (seen.has(key)) return; seen.add(key); text(ctx, a.sym + '–' + b.sym + ': ' + fmt(EN[a.sym], 1) + ' and ' + fmt(EN[b.sym], 1) + ', a difference of ' + fmt(Math.abs(dEN), 1), 1360, y, PAL.ink, { size: 18, align: 'right' }); y += 30; });
    text(ctx, 'electronegativities from Figure 7.6', 1360, y + 4, PAL.muted, { size: 16, align: 'right' });
    text(ctx, mol.diatomic ? 'This is ' + mol.structure + '.' : 'The molecular structure is ' + mol.structure + '.', 40, 130, PAL.ink, { size: 19 });
    text(ctx, polar ? 'The bond moments do not cancel, so the molecule is polar.' : mol.bonds.every((_, i) => Math.abs(rows[i].dEN) < 0.02) ? 'There is no polar bond here, so the molecule is nonpolar.' : 'The bond moments cancel, so the molecule is nonpolar.', 40, 164, PAL.ink, { size: 19, weight: 600 });
    text(ctx, 'Each arrow points from the less electronegative atom toward the more, with a plus sign at its tail.', 40, 200, PAL.muted, { size: 16 });
    text(ctx, 'Drag the molecule to turn it, and rest the pointer on an atom to be told which it is.', 40, 226, PAL.muted, { size: 16 });
    const one = rows[0];
    topline(ctx, mol.diatomic ? 'In ' + (mol.whole ? 'the ' + mol.name + ' molecule' : 'the ' + mol.name + ' bond') + ' the electronegativity difference is ' + fmt(Math.abs(one.dEN), 1) + ', so its bond moment is ' + (Math.abs(one.dEN) > 1 ? 'a long' : Math.abs(one.dEN) > 0.5 ? 'a moderate' : 'a short') + ' vector pointing toward the ' + (one.dEN >= 0 ? one.b.sym : one.a.sym) + ' atom.'
      : mol.name + ' is ' + mol.structure.split(',')[0] + ', so its ' + mol.bonds.length + ' bond moments ' + (polar ? 'do not cancel and the molecule is polar' : 'cancel and the molecule is nonpolar') + '.');
    readout(d.readout, mol.diatomic ? `\\mu \\propto |\\Delta\\text{EN}| = ${fmt(Math.abs(one.dEN), 2)}` : `\\left|\\sum \\vec{\\mu}_{\\text{bond}}\\right| \\propto ${fmt(net, 2)}`,
      mol.diatomic ? (mol.whole ? 'For a molecule of two atoms there is only one bond, so its bond dipole moment is the dipole moment of the molecule.' : 'For a single bond there is nothing to add, so the bond moment stands on its own.')
        : rows.some((r) => Math.abs(r.dEN) < 0.02) ? 'Figure 7.6 gives carbon and sulfur the same electronegativity, so the C–S bond draws no arrow here, and the whole of this dipole moment comes from the C=O bond. The text notes that sulfur is in fact very slightly the more electronegative of the two.'
        : polar ? 'The dipole moment is the vector sum of the bond moments, taken in three dimensions, and here the sum is not zero.'
        : 'Each bond is polar, but the bonds are arranged so that their moments sum to zero, and the molecule as a whole is nonpolar.');
  }
  still(d, draw);
})();

/* =====================================================================
   FIGURE 7.28: molecules between two plates, tumbling at random until
   the field comes on, and then, if they are polar, turning to align.
   Moving: the loop runs three seconds with the field off and three with
   it on, and holds; finite, so it gets the scrubber.
===================================================================== */
(function () {
  const d = sim('sim-field', 560);
  const MOLS = [['HF', 'H', 'F', true], ['F₂', 'F', 'F', false]];
  const M = pick(d.controls, { label: '\\text{molecule}', value: 0, aria: 'the molecule between the plates', onInput: reset }, MOLS.map((m) => m[0]));
  const N = ctl(d.controls, { label: '\\text{molecules}', cls: '', min: 6, max: 20, step: 1, value: 12, unit: '', dec: 0, aria: 'number of molecules', onInput: reset });
  const T = 6, ON = 3, cy = cycle(() => T, 1.5);
  function reset() { cy.reset(); }
  function rng(seed) { let s = seed >>> 0; return () => { s += 0x6D2B79F5; let z = s; z = Math.imul(z ^ (z >>> 15), z | 1); z ^= z + Math.imul(z ^ (z >>> 7), z | 61); return ((z ^ (z >>> 14)) >>> 0) / 4294967296; }; }
  /* the molecules' places and their random tumbling, fixed by the seed so a replay repeats */
  function layout(n) {
    const r = rng(7 + n), out = [], cols = Math.ceil(Math.sqrt(n * 1.8)), rows = Math.ceil(n / cols);
    for (let i = 0; i < n; i++) {
      const cx = 360 + ((i % cols) + 0.5) * (680 / cols) + (r() - 0.5) * 40, cyy = 150 + (Math.floor(i / cols) + 0.5) * (300 / rows) + (r() - 0.5) * 30;
      out.push({ x: cx, y: cyy, th0: r() * TAU, w: (r() - 0.5) * 2.2, ph: r() * TAU, amp: 0.4 + 0.5 * r() });
    }
    return out;
  }
  const tumble = (m, tau) => m.th0 + m.w * tau + m.amp * Math.sin(1.7 * tau + m.ph);
  const norm = (a) => Math.atan2(Math.sin(a), Math.cos(a));
  function draw() {
    const { ctx } = begin(d.c);
    const [name, A, B, polar] = MOLS[M.v], n = N.v, tau = cy.now(), on = tau >= ON, mols = layout(n);
    /* the plates */
    ctx.save(); ctx.fillStyle = PAL.soft; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.fillRect(300, 110, 34, 360); ctx.strokeRect(300, 110, 34, 360); ctx.fillRect(1066, 110, 34, 360); ctx.strokeRect(1066, 110, 34, 360); ctx.restore();
    text(ctx, on ? '−' : '', 317, 96, PAL.ink, { size: 30, weight: 600, align: 'center' }); text(ctx, on ? '+' : '', 1083, 96, PAL.ink, { size: 30, weight: 600, align: 'center' });
    text(ctx, on ? 'negative plate' : 'plate', 317, 496, PAL.muted, { size: 17, align: 'center' }); text(ctx, on ? 'positive plate' : 'plate', 1083, 496, PAL.muted, { size: 17, align: 'center' });
    if (on) for (let k = 0; k < 6; k++) { const y = 140 + k * 60; arrow(ctx, 1060, y, 342, y, alpha(PAL.ink, 0.22), 2); }
    /* the molecules: A at the tail end, B at the head end, along the angle th; when the field is on a polar one turns its A end to the negative plate */
    mols.forEach((m) => {
      let th = tumble(m, tau);
      /* A carries the partial positive charge, and it is drawn at the tail end, to the left; the field pulls it toward the
         negative plate on the left, so the molecule settles at th = 0 rather than at th = π (rule: check it by eye) */
      if (on && polar) { const th3 = norm(tumble(m, ON)), k = 1 - Math.exp(-3.2 * (tau - ON)); th = th3 + norm(-th3) * k; }
      const half = 26, ax = m.x - Math.cos(th) * half, ay = m.y - Math.sin(th) * half, bx = m.x + Math.cos(th) * half, by = m.y + Math.sin(th) * half;
      line(ctx, ax, ay, bx, by, PAL.ink, 4);
      atom(ctx, bx, by, B, 15); atom(ctx, ax, ay, A, A === 'H' ? 11 : 15);
      if (polar) { text(ctx, 'δ+', ax - Math.cos(th) * 22, ay - Math.sin(th) * 22, PAL.ink, { size: 14, weight: 600, align: 'center' }); text(ctx, 'δ−', bx + Math.cos(th) * 22, by + Math.sin(th) * 22, PAL.ink, { size: 14, weight: 600, align: 'center' }); }
    });
    text(ctx, on ? 'electric field on' : 'no electric field', 700, 496, PAL.ink, { size: 19, weight: 600, align: 'center' });
    text(ctx, name + (polar ? ': the fluorine end carries δ− and the hydrogen end δ+' : ': two fluorine atoms, no difference in electronegativity, no dipole moment'), 700, 526, PAL.muted, { size: 17, align: 'center' });
    const aligned = on && polar && tau - ON > 1.2;
    topline(ctx, !on ? 'At t = ' + fmt(tau, 1) + ' s the field is off and the ' + name + ' molecules lie at random, as they always do in the liquid.'
      : polar ? (aligned ? 'The field is on, and every HF molecule has turned its hydrogen end toward the negative plate and its fluorine end toward the positive one.' : 'At t = ' + fmt(tau, 1) + ' s the field is on and the HF molecules are turning to align with it.')
      : 'The field is on, but F₂ has no dipole moment, so the molecules go on tumbling as before.');
    readout(d.readout, polar ? '\\text{H}^{\\delta+}\\text{–F}^{\\delta-}' : '\\text{F–F}',
      polar ? 'A polar molecule aligns in an electric field with its positive end toward the negative plate and its negative end toward the positive plate.' : 'A nonpolar molecule has no positive and negative ends for the field to pull on, so it is not aligned and not attracted.');
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();
};
