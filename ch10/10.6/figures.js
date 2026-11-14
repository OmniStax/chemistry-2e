/* Figures for section 10.6 Lattice Structures in Crystalline Solids. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['10.6'] = function (root, F) {
const { tex, C, PAL, alpha, ctl, register, begin, line, dot, text, topline } = F;
const sim = (id, H) => F.sim(root, id, H);
const still = (d, draw) => register(d.fig, { update: () => {}, draw });
const T3D = window.THREE;
const RAD = Math.PI / 180, S2 = Math.SQRT2, S3 = Math.sqrt(3);
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;
const add3 = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const mul3 = (a, k) => [a[0] * k, a[1] * k, a[2] * k];
const len3 = (a) => Math.hypot(a[0], a[1], a[2]);
const themeKey = () => [PAL.ink, PAL.muted, PAL.panel].join('|');

/* The parts of a sphere that lie inside a cell: an octant at a corner, a half at a face.
   The octant is the one on the +x, +y, +z side of the centre and is turned into the cell by
   the signs of its scale; the half faces +x and is turned by a rotation. */
let GEO = null;
const geo = () => GEO ?? (GEO = {
  oct: new T3D.SphereGeometry(1, 16, 12, Math.PI / 2, Math.PI / 2, 0, Math.PI / 2),
  half: new T3D.SphereGeometry(1, 24, 16, Math.PI / 2, Math.PI, 0, Math.PI),
});
/* the flat face a cut leaves: a fan about p in the plane of the unit vectors u and w, from angle 0 to arc */
function cap(g, p, r, u, w, arc, color) {
  const n = 16, pos = [p[0], p[1], p[2]];
  for (let i = 0; i <= n; i++) { const t = (arc * i) / n, c = Math.cos(t), s = Math.sin(t); pos.push(p[0] + r * (c * u[0] + s * w[0]), p[1] + r * (c * u[1] + s * w[1]), p[2] + r * (c * u[2] + s * w[2])); }
  const idx = []; for (let i = 1; i <= n; i++) idx.push(0, i, i + 1);
  const gm = new T3D.BufferGeometry(); gm.setAttribute('position', new T3D.Float32BufferAttribute(pos, 3)); gm.setIndex(idx); gm.computeVertexNormals();
  const m = new T3D.Mesh(gm, F.mesh.mat(color, { side: T3D.DoubleSide })); g.add(m); return m;
}
const AX = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
function octant(g, p, r, color, dir) {
  const m = new T3D.Mesh(geo().oct, F.mesh.mat(color, { side: T3D.DoubleSide }));
  m.position.set(p[0], p[1], p[2]); m.scale.set(dir[0] * r, dir[1] * r, dir[2] * r); g.add(m);
  [0, 1, 2].forEach((i) => { const [j, k] = [0, 1, 2].filter((x) => x !== i); cap(g, p, r, mul3(AX[j], dir[j]), mul3(AX[k], dir[k]), Math.PI / 2, color); });
  return m;
}
function halfBall(g, p, r, color, dir) {
  const m = new T3D.Mesh(geo().half, F.mesh.mat(color, { side: T3D.DoubleSide }));
  m.position.set(p[0], p[1], p[2]); m.scale.setScalar(r);
  m.quaternion.setFromUnitVectors(new T3D.Vector3(1, 0, 0), new T3D.Vector3(dir[0], dir[1], dir[2])); g.add(m);
  const i = dir.findIndex((x) => x !== 0), [j, k] = [0, 1, 2].filter((x) => x !== i);
  cap(g, p, r, AX[j], AX[k], 2 * Math.PI, color);
  return m;
}
/* the twelve edges of a box whose corners are o + i·a + j·b + k·c */
function cellEdges(g, o, a, b, c, r, color, extra) {
  const P = (i, j, k) => add3(add3(add3(o, mul3(a, i)), mul3(b, j)), mul3(c, k));
  [[0, 0, 0, 1, 0, 0], [0, 1, 0, 1, 1, 0], [0, 0, 1, 1, 0, 1], [0, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 0], [1, 0, 0, 1, 1, 0], [0, 0, 1, 0, 1, 1], [1, 0, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 1], [1, 0, 0, 1, 0, 1], [0, 1, 0, 0, 1, 1], [1, 1, 0, 1, 1, 1]]
    .forEach(([i, j, k, l, m, n]) => F.mesh.stick(g, P(i, j, k), P(l, m, n), r, color, extra));
}
/* A scene that swaps with a choice: the groups of the old and the new option are built when the
   choice changes, only the new one answers the pointer, and the two cross-fade as the choice turns. */
function swapper(v, grp, build) {
  let sig = '', parts = {};
  return (pick, extra = '') => {
    const key = pick.from + '>' + pick.value + '|' + extra + '|' + themeKey();
    if (key !== sig && grp) {
      sig = key; v.clear(); parts = {};
      if (pick.from !== pick.value) { parts[pick.from] = new T3D.Group(); grp.add(parts[pick.from]); build(parts[pick.from], pick.from, false); }
      parts[pick.value] = new T3D.Group(); grp.add(parts[pick.value]); build(parts[pick.value], pick.value, true);
    }
    Object.entries(parts).forEach(([k, g]) => F.fade3(g, pick.a(k)));
    v.invalidate();
  };
}

/* A key in the strip above a scene: a lit disc for an atom or an ion, a dot for a lattice point */
const disc = (col, r) => (c, x, y) => { c.save(); c.beginPath(); c.arc(x, y, r, 0, 2 * Math.PI); c.fillStyle = col; c.fill(); c.lineWidth = 1.5; c.strokeStyle = alpha(PAL.ink, 0.45); c.stroke(); c.restore(); };
const keyStrip = (d, H, entries) => { const { ctx } = begin(d.c); F.legend(ctx, { l: 20, r: 1380, t: 6, b: H - 4 }, entries, { corner: 'top', row: true, size: 22 }); };
/* drawn over the atoms, as the book draws its cell edges: no depth test, so the cell reads through the spheres */
const OVER = { depthTest: false, transparent: true };

/* =====================================================================
   The cubic cells, Figures 10.46 to 10.52. The same scene serves two figures:
   the simple cubic cell of polonium alone, and the three cubic cells with a
   choice among them. Three pictures of one structure: the lattice points of
   eight cells with the shared point joined to its nearest neighbors, the
   atoms of one cell at full size with the line they touch along, and the
   parts of those atoms inside the cell. Corner atoms wear the element's
   colour; an atom at the center or on a face wears a darker shade of it, as
   the book tells them apart (gray and red). Still: nothing in a cell has a
   clock. A crystal has no ground: yaw free, pitch within 0.9 rad of level.
===================================================================== */
const CELLS = {
  sc: { name: 'simple cubic', short: 'simple', metal: 'Po', metalName: 'polonium', n: 1, cn: 6, r: 0.5, extra: '',
    count: '\\mk{c}{8\\times\\tfrac{1}{8}} = \\mk{n}{1}\\ \\text{atom}', rel: '\\mk{a}{\\kacell} = \\mk{r}{2\\kratom}' },
  bcc: { name: 'body-centered cubic', short: 'body-centered', metal: 'Fe', metalName: 'iron', n: 2, cn: 8, r: S3 / 4, extra: 'center',
    count: '\\mk{c}{8\\times\\tfrac{1}{8}} + \\mk{b}{1} = \\mk{n}{2}\\ \\text{atoms}', rel: '\\mk{r}{4\\kratom} = \\mk{a}{\\sqrt{3}\\,\\kacell}' },
  fcc: { name: 'face-centered cubic', short: 'face-centered', metal: 'Cu', metalName: 'copper', n: 4, cn: 12, r: S2 / 4, extra: 'face center',
    count: '\\mk{c}{8\\times\\tfrac{1}{8}} + \\mk{f}{6\\times\\tfrac{1}{2}} = \\mk{n}{4}\\ \\text{atoms}', rel: '\\mk{r}{4\\kratom} = \\mk{a}{\\sqrt{2}\\,\\kacell}' },
};
const CORNERS = [];
for (let i = 0; i <= 1; i++) for (let j = 0; j <= 1; j++) for (let k = 0; k <= 1; k++) CORNERS.push([i, j, k]);
const FACES = [[0.5, 0.5, 0], [0.5, 0.5, 1], [0.5, 0, 0.5], [0.5, 1, 0.5], [0, 0.5, 0.5], [1, 0.5, 0.5]];
const NEIGHBORS = {
  sc: [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]],
  bcc: CORNERS.map((p) => p.map((x) => x - 0.5)),
  fcc: [[0.5, 0.5, 0], [0.5, -0.5, 0], [-0.5, 0.5, 0], [-0.5, -0.5, 0], [0.5, 0, 0.5], [0.5, 0, -0.5], [-0.5, 0, 0.5], [-0.5, 0, -0.5], [0, 0.5, 0.5], [0, 0.5, -0.5], [0, -0.5, 0.5], [0, -0.5, -0.5]],
};
const PICTURES = [{ value: 'points', label: 'lattice points' }, { value: 'atoms', label: 'atoms' }, { value: 'inside', label: 'inside the cell' }];
const inner = (col) => F.mixColor(col, PAL.ink, 0.38);

function cubicFigure(id, cells, cell0, pic0) {
  const KH = 70, d = sim(id, KH);
  const v = F.view3d(d.stage, { h: 600, dist: 7.9, tilt: 0.36, spin: 'idle', pitch: [-0.9, 0.9] });
  const grp = v.part(0);
  const cellPick = cells.length > 1
    ? F.choice(d.controls, { label: '\\text{unit cell}', aria: 'the cubic unit cell', options: cells.map((c) => ({ value: c, label: CELLS[c].short })), value: cell0 })
    : { value: cell0, from: cell0, a: () => 1, k: 1 };
  /* the parts inside the cell stop at its faces, so that picture is seen closer to fill the stage */
  const ZOOM = { points: 1, atoms: 1, inside: 1.35 };
  const pic = F.choice(d.controls, { label: '\\text{picture}', aria: 'how the structure is drawn', options: PICTURES, value: pic0, onInput: (x) => v.glide({ zoom: ZOOM[x] }, 900) });
  v.setView(-0.55, 0.36);
  const ro = F.readout(d);
  const A = 1.6, h = A / 2, B = 1.25;
  const at = (f) => [(f[0] - 0.5) * A, (f[2] - 0.5) * A, (0.5 - f[1]) * A];
  let sig = '', parts = {};
  function build(g, cell, p, live) {
    const q = CELLS[cell], col = F.el(q.metal), dark = inner(col), nm = (where) => `${q.metalName} atom, ${where}`;
    const pk = (m, s) => (live ? v.pickable(m, s) : m);
    if (p === 'points') {
      /* eight cells of edge B about the shared point at the origin; one cell outlined in ink */
      for (let i = -1; i <= 0; i++) for (let j = -1; j <= 0; j++) for (let k = -1; k <= 0; k++) {
        const o = [i * B, j * B, k * B], mine = i === 0 && j === -1 && k === 0;
        cellEdges(g, o, [B, 0, 0], [0, B, 0], [0, 0, B], mine ? 0.014 : 0.007, mine ? PAL.ink : alpha(PAL.ink, 0.4));
      }
      const pts = [];
      for (let i = -1; i <= 1; i++) for (let j = -1; j <= 1; j++) for (let k = -1; k <= 1; k++) pts.push([i, j, k]);
      if (cell === 'bcc') for (let i = -1; i <= 0; i++) for (let j = -1; j <= 0; j++) for (let k = -1; k <= 0; k++) pts.push([i + 0.5, j + 0.5, k + 0.5]);
      if (cell === 'fcc') for (let i = -1; i <= 0; i++) for (let j = -1; j <= 0; j++) for (let k = -1; k <= 0; k++) FACES.forEach((f) => pts.push([i + f[0], j + f[1], k + f[2]]));
      const seen = new Set(), near = new Set(NEIGHBORS[cell].map((n) => n.join(',')));
      pts.forEach((p3) => {
        const s = p3.join(','); if (seen.has(s)) return; seen.add(s);
        const centre = p3.every((x) => x === 0), nb = near.has(s);
        pk(F.mesh.sphere(g, mul3(p3, B), centre ? 0.12 : nb ? 0.085 : 0.05, PAL.ink, centre || nb ? undefined : { transparent: true, opacity: 0.35 }),
          centre ? 'the lattice point shared by all eight cells' : nb ? 'a nearest neighbor of the shared point' : 'a lattice point');
      });
      NEIGHBORS[cell].forEach((n) => F.mesh.stick(g, [0, 0, 0], mul3(n, B), 0.022, PAL.ink));
      return;
    }
    const r = q.r * A;
    cellEdges(g, [-h, -h, -h], [A, 0, 0], [0, A, 0], [0, 0, A], 0.013, PAL.ink, p === 'atoms' ? OVER : undefined);
    const sites = CORNERS.map((f) => ({ f, c: col, where: 'at a corner, one-eighth inside this cell' }));
    if (cell === 'bcc') sites.push({ f: [0.5, 0.5, 0.5], c: dark, where: 'at the center, wholly inside this cell' });
    if (cell === 'fcc') FACES.forEach((f) => sites.push({ f, c: dark, where: 'at the center of a face, one-half inside this cell' }));
    sites.forEach(({ f, c, where }) => {
      const p3 = at(f);
      if (p === 'atoms') { pk(F.mesh.sphere(g, p3, r, c), nm(where)); return; }
      const inward = p3.map((x) => (Math.abs(x) < 1e-9 ? 0 : -Math.sign(x)));
      const nz = inward.filter((x) => x !== 0).length;
      if (nz === 3) pk(octant(g, p3, r, c, inward), nm(where));
      else if (nz === 1) pk(halfBall(g, p3, r, c, inward), nm(where));
      else pk(F.mesh.sphere(g, p3, r, c), nm(where));
    });
    if (p === 'atoms') {
      /* the line the atoms touch along: an edge, the body diagonal, or the diagonal of the front face */
      const [a0, a1] = cell === 'sc' ? [[0, 1, 1], [1, 1, 1]] : cell === 'bcc' ? [[0, 1, 0], [1, 0, 1]] : [[0, 1, 1], [1, 1, 0]];
      pk(F.mesh.stick(g, at(a0), at(a1), 0.03, C('length'), OVER), 'the line along which the atoms touch');
    }
  }
  function draw() {
    const cell = cellPick.value, p = pic.value, q = CELLS[cell];
    const key = [cellPick.from, cell, pic.from, p, themeKey(), C('length'), Object.keys(CELLS).map((c) => F.el(CELLS[c].metal)).join()].join('|');
    if (key !== sig && grp) {
      sig = key; v.clear(); parts = {};
      const combos = new Set([cell + ':' + p, cellPick.from + ':' + p, cell + ':' + pic.from, cellPick.from + ':' + pic.from]);
      combos.forEach((cp) => {
        const [c, pp] = cp.split(':'), g = new T3D.Group(); grp.add(g); parts[cp] = g;
        build(g, c, pp, c === cell && pp === p);
      });
    }
    Object.entries(parts).forEach(([cp, g]) => { const [c, pp] = cp.split(':'); F.fade3(g, cellPick.a(c) * pic.a(pp)); });
    v.invalidate();
    const col = F.el(q.metal), M = q.metal;
    const key3 = p === 'points'
      ? [{ s: 'point shared by eight cells', draw: disc(PAL.ink, 7) }, { s: `its ${q.cn} nearest neighbors`, draw: disc(PAL.ink, 5) }, { s: 'other lattice points', draw: disc(alpha(PAL.ink, 0.35), 3.5) }]
      : [{ s: p === 'inside' ? `${M}: one-eighth at a corner` : `${M} atom at a corner`, draw: disc(col, 10) }];
    if (p !== 'points' && q.extra) key3.push({ s: p === 'inside' ? (cell === 'bcc' ? `${M}: all of the one at the center` : `${M}: one-half at a face center`) : `${M} atom at the ${q.extra}`, draw: disc(inner(col), 10) });
    if (p === 'atoms') key3.push({ s: 'the atoms touch along this line', color: C('length'), w: 5 });
    keyStrip(d, KH, key3);
    ro.set(p === 'points' ? `\\text{coordination number} = \\mk{cn}{${q.cn}}` : p === 'atoms' ? q.rel : q.count, '', { form: p + cell });
  }
  still(d, draw);
}
cubicFigure('sim-simple', ['sc'], 'sc', 'points');
cubicFigure('sim-cubic', ['sc', 'bcc', 'fcc'], 'bcc', 'atoms');

/* =====================================================================
   Figure 10.53 + 10.54: four close-packed layers. Layers A and B stay put;
   the third and fourth slide between A and C sites as the stacking changes.
   The third state picks out one face-centered cube of the cubic stack (its
   fourteen atoms solid, the rest nearly gone, its edges drawn) and the
   camera glides to look straight at a face of it, the book's side view, where
   A sits at one corner, B across the diagonal and at the center, C at the far
   corner. Still. The positions A, B, C are the section's referents and their
   layers take F.ref. Sphere diameter D; a layer rises D√(2/3); the cube's
   centre is the stack's centre, so the camera's target never moves.
   Free yaw; pitch within 1.2 rad of level, enough to look down on the layers.
===================================================================== */
(function () {
  const KH = 70, d = sim('sim-packing', KH);
  const v = F.view3d(d.stage, { h: 600, dist: 5.6, tilt: 0.42, spin: 'off', pitch: [-1.2, 1.2] });
  v.setView(0.35, 0.42);
  const grp = v.part(0);
  const D = 0.5, SP = D * Math.sqrt(2 / 3), U = [0, D / S3];
  const OFF = { A: [0, 0], B: U, C: [2 * U[0], 2 * U[1]] };
  const SEQ = { hcp: ['A', 'B', 'A', 'B'], ccp: ['A', 'B', 'C', 'A'], cell: ['A', 'B', 'C', 'A'] };
  const LAYER = ['layer-a', 'layer-b', 'layer-c'], refOf = (x) => F.ref(LAYER['ABC'.indexOf(x)]);
  const rot = (p, k) => { const c = Math.cos(k * 2 * Math.PI / 3), s = Math.sin(k * 2 * Math.PI / 3); return [p[0] * c - p[1] * s, p[0] * s + p[1] * c]; };
  const LAT = [];
  for (let i = -6; i <= 6; i++) for (let j = -6; j <= 6; j++) { const p = [D * (i + j / 2), D * j * S3 / 2]; if (Math.hypot(p[0], p[1]) <= 2.3 * D) LAT.push(p); }
  const yOf = (layer) => (layer - 1.5) * SP;
  /* the cube in the cubic stack: corner at the origin of layer 0, edges E_i rising one layer each */
  const h1 = [-2 * U[0], -2 * U[1]], E = [0, 1, 2].map((k) => { const hh = rot(h1, k); return [hh[0], SP, hh[1]]; });
  const o = [0, yOf(0), 0], P = (i, j, k) => add3(add3(add3(o, mul3(E[0], i)), mul3(E[1], j)), mul3(E[2], k));
  const cubeSites = CORNERS.map(([i, j, k]) => P(i, j, k));
  [[0, 1], [0, 2], [1, 2]].forEach(([i, j]) => { const c = 3 - i - j, mid = add3(o, mul3(add3(E[i], E[j]), 0.5)); cubeSites.push(mid, add3(mid, E[c])); });
  const world = (p2, layer) => [p2[0], yOf(layer), p2[1]];
  const isCube = (p) => cubeSites.some((q) => len3([p[0] - q[0], p[1] - q[1], p[2] - q[2]]) < 1e-6);
  /* the view straight at the cube face spanned by E0 and E1, from outside it (along −E2): A, B, B, C at its corners */
  const n = mul3(E[2], -1 / len3(E[2]));
  const faceYaw = Math.atan2(-n[0], n[2]), z1 = -n[0] * Math.sin(faceYaw) + n[2] * Math.cos(faceYaw), facePitch = Math.atan2(n[1], z1);
  const OPEN = { yaw: 0.35, pitch: 0.42, zoom: 1, target: [0, 0, 0] }, FACE = { yaw: faceYaw, pitch: facePitch, zoom: 1.25, target: [0, 0, 0] };
  const stack = F.choice(d.controls, { label: '\\text{stacking}', aria: 'the stacking of the layers, or one unit cell of the cubic stack',
    options: [{ value: 'hcp', label: 'hexagonal (ABAB)' }, { value: 'ccp', label: 'cubic (ABCA)' }, { value: 'cell', label: 'cubic: one unit cell' }], value: 'ccp',
    onInput: (x) => { v.glide(x === 'cell' ? FACE : OPEN, 1100); } });
  const ro = F.readout(d);
  let sig = '', atoms = [], edges = null;
  function build() {
    const key = themeKey() + LAYER.map((id) => F.ref(id)).join(); if (key === sig || !grp) return; sig = key;
    v.clear(); atoms = [];
    for (let layer = 0; layer < 4; layer++) LAT.forEach((p) => {
      const ccpPos = world([p[0] + OFF[SEQ.ccp[layer]][0], p[1] + OFF[SEQ.ccp[layer]][1]], layer);
      const m = F.mesh.sphere(grp, [0, 0, 0], D / 2 * 0.985, refOf('A'), { transparent: true });
      atoms.push({ m, p, layer, cube: isCube(ccpPos) });
    });
    edges = new T3D.Group(); grp.add(edges);
    cellEdges(edges, o, E[0], E[1], E[2], 0.014, PAL.ink, OVER);
  }
  function draw() {
    build();
    const one = stack.a('cell'), mixOff = (layer) => stack.mix((s) => OFF[SEQ[s][layer]]);
    atoms.forEach((q) => {
      const off = mixOff(q.layer), pos = world([q.p[0] + off[0], q.p[1] + off[1]], q.layer);
      q.m.position.set(pos[0], pos[1], pos[2]);
      q.m.material.color.set(stack.mixColor((s) => refOf(SEQ[s][q.layer])));
      const op = q.cube ? 1 : 1 - 0.93 * one;
      q.m.material.opacity = op; q.m.material.depthWrite = op >= 1;
      const x = SEQ[stack.value][q.layer];
      v.pickable(q.m, stack.value === 'cell' && q.cube ? `an atom of layer ${x}, in the face-centered cube` : `an atom of layer ${x}`);
    });
    if (edges) F.fade3(edges, one);
    v.invalidate();
    const s = stack.value;
    const key3 = (s === 'hcp' ? ['A', 'B'] : ['A', 'B', 'C']).map((x) => ({ s: `layer ${x}`, draw: disc(refOf(x), 10) }));
    if (s === 'cell') key3.push({ s: 'edges of the face-centered cube', color: PAL.ink, w: 3 });
    keyStrip(d, KH, key3);
    ro.set(s === 'cell' ? '\\mk{c}{8\\times\\tfrac{1}{8}} + \\mk{f}{6\\times\\tfrac{1}{2}} = \\mk{n}{4}\\ \\text{atoms per cell}' : '\\text{coordination number} = 6 + 3 + 3 = 12', '', { form: s === 'cell' ? 'cell' : 'cn' });
  }
  still(d, draw);
})();

/* =====================================================================
   Figure 10.55 + 10.56: the fourteen unit cells, as the book's table lists
   them. The cell is built from its axes a, b, c and angles α, β, γ, and the
   choice blends those six numbers, so one cell bends into the next; lattice
   points at the body, the faces or the bases fade in where the new cell has
   them, in F.cat(0) as the book's blue against its red corners. The
   hexagonal cell is the book's hexagonal prism: twelve corners and the two
   base centers, with one primitive cell drawn in ink inside it. Still.
   Free yaw; pitch within 0.9 rad of level, so the cell never turns over.
===================================================================== */
(function () {
  const KH = 70, d = sim('sim-lattices', KH);
  const v = F.view3d(d.stage, { h: 600, dist: 5.4, tilt: 0.32, spin: 'off', pitch: [-0.9, 0.9] });
  /* from in front of the origin corner's far side, as the book draws it: a toward the front left, b to the right, c up */
  v.setView(-2.3, 0.32);
  const grp = v.part(0);
  const R90 = 90;
  const SYS = {
    cubic: { p: { a: 1.25, b: 1.25, c: 1.25, al: R90, be: R90, ga: R90 }, axes: 'a = b = c', angles: '\\alpha = \\beta = \\gamma = 90^\\circ' },
    tetragonal: { p: { a: 1.05, b: 1.05, c: 1.7, al: R90, be: R90, ga: R90 }, axes: 'a = b \\ne c', angles: '\\alpha = \\beta = \\gamma = 90^\\circ' },
    orthorhombic: { p: { a: 0.95, b: 1.3, c: 1.7, al: R90, be: R90, ga: R90 }, axes: 'a \\ne b \\ne c', angles: '\\alpha = \\beta = \\gamma = 90^\\circ' },
    monoclinic: { p: { a: 1.0, b: 1.3, c: 1.6, al: R90, be: 112, ga: R90 }, axes: 'a \\ne b \\ne c', angles: '\\alpha = \\gamma = 90^\\circ;\\ \\beta \\ne 90^\\circ' },
    triclinic: { p: { a: 1.0, b: 1.3, c: 1.6, al: 76, be: 106, ga: 97 }, axes: 'a \\ne b \\ne c', angles: '\\alpha \\ne \\beta \\ne \\gamma \\ne 90^\\circ' },
    hexagonal: { p: { a: 0.95, b: 0.95, c: 1.6, al: R90, be: R90, ga: 120 }, axes: 'a = b \\ne c', angles: '\\alpha = \\beta = 90^\\circ;\\ \\gamma = 120^\\circ' },
    rhombohedral: { p: { a: 1.3, b: 1.3, c: 1.3, al: 72, be: 72, ga: 72 }, axes: 'a = b = c', angles: '\\alpha = \\beta = \\gamma \\ne 90^\\circ' },
  };
  /* the book's table, row by row: monoclinic is simple and base-centered */
  const LIST = [['cubic', 'P'], ['cubic', 'F'], ['cubic', 'I'], ['tetragonal', 'P'], ['tetragonal', 'I'], ['orthorhombic', 'P'], ['orthorhombic', 'I'], ['orthorhombic', 'C'], ['orthorhombic', 'F'],
    ['monoclinic', 'P'], ['monoclinic', 'C'], ['triclinic', 'P'], ['hexagonal', 'P'], ['rhombohedral', 'P']];
  const CENT = { P: 'simple', I: 'body-centered', F: 'face-centered', C: 'base-centered' };
  const NAME = { I: 'at the center of the cell', F: 'at the center of a face', C: 'at the center of a base' };
  const nameOf = (i) => { const [s, c] = LIST[i]; return s === 'triclinic' || s === 'hexagonal' || s === 'rhombohedral' ? s : `${s}, ${CENT[c]}`; };
  const sel = F.select(d.controls, { label: '\\text{unit cell}', aria: 'the unit cell', options: LIST.map((_, i) => ({ value: String(i), label: nameOf(i) })), value: '0' });
  const cap = (s) => s[0].toUpperCase() + s.slice(1);
  let sig = '';
  function draw() {
    const key = sel.from + '>' + sel.value + '|' + sel.k.toFixed(3) + '|' + themeKey() + C('angle') + F.cat(0);
    if (key !== sig && grp) {
      sig = key;
      v.clear();
      const q = sel.mix((s) => SYS[LIST[+s][0]].p);
      const ca = Math.cos(q.al * RAD), cb = Math.cos(q.be * RAD), cg = Math.cos(q.ga * RAD), sg = Math.sin(q.ga * RAD);
      const cx = q.c * cb, cy = q.c * (ca - cb * cg) / sg, cz = Math.sqrt(Math.max(0.01, q.c * q.c - cx * cx - cy * cy));
      const W = (p) => [p[0], p[2], -p[1]];
      const va = [q.a, 0, 0], vb = [q.b * cg, q.b * sg, 0], vc = [cx, cy, cz];
      const hexA = sel.mix((s) => (LIST[+s][0] === 'hexagonal' ? 1 : 0));
      const centre = mul3(add3(add3(va, vb), vc), 0.5), shift = hexA > 0 ? mul3(add3(va, vb), hexA * 0.5) : [0, 0, 0];
      const Pc = (f) => W(add3(add3(add3(mul3(va, f[0]), mul3(vb, f[1])), mul3(vc, f[2])), mul3(add3(centre, shift), -1)));
      const g = new T3D.Group(); grp.add(g);
      const faded = [];
      const sub = (x) => { const s = new T3D.Group(); g.add(s); faded.push([s, x]); return s; };
      const E = [[0, 0, 0, 1, 0, 0], [0, 1, 0, 1, 1, 0], [0, 0, 1, 1, 0, 1], [0, 1, 1, 1, 1, 1], [0, 0, 0, 0, 1, 0], [1, 0, 0, 1, 1, 0], [0, 0, 1, 0, 1, 1], [1, 0, 1, 1, 1, 1], [0, 0, 0, 0, 0, 1], [1, 0, 0, 1, 0, 1], [0, 1, 0, 0, 1, 1], [1, 1, 0, 1, 1, 1]];
      E.forEach(([i, j, k, l, m, n]) => F.mesh.stick(g, Pc([i, j, k]), Pc([l, m, n]), 0.016, PAL.ink));
      CORNERS.forEach((f) => v.pickable(F.mesh.sphere(g, Pc(f), 0.085, PAL.ink), 'a lattice point at a corner of the cell'));
      const extra = { I: [[0.5, 0.5, 0.5]], F: FACES, C: [[0.5, 0.5, 0], [0.5, 0.5, 1]] };
      const alive = LIST[+sel.value][1];
      Object.entries(extra).forEach(([c, pts]) => {
        const x = sel.mix((s) => (LIST[+s][1] === c ? 1 : 0)); if (x < 0.01) return;
        const s = sub(x);
        pts.forEach((f) => { const m = F.mesh.sphere(s, Pc(f), 0.095, F.cat(0)); if (alive === c) v.pickable(m, `a lattice point ${NAME[c]}`); });
      });
      if (hexA > 0.01) {
        /* the hexagonal prism about the axis through a + b, its corners in ink and its base centers in F.cat(0) */
        const s = sub(hexA), ring = [], ctr = add3(va, vb);
        for (let k = 0; k < 6; k++) { const ang = k * Math.PI / 3, p = [-ctr[0], -ctr[1], 0]; ring.push(add3(ctr, [p[0] * Math.cos(ang) - p[1] * Math.sin(ang), p[0] * Math.sin(ang) + p[1] * Math.cos(ang), 0])); }
        const fr = (p) => { const det = va[0] * vb[1] - va[1] * vb[0]; return [(p[0] * vb[1] - p[1] * vb[0]) / det, (va[0] * p[1] - va[1] * p[0]) / det]; };
        const top = (f, z) => Pc([f[0], f[1], z]);
        ring.forEach((p, k) => {
          const f = fr(p), f2 = fr(ring[(k + 1) % 6]);
          [0, 1].forEach((z) => { F.mesh.stick(s, top(f, z), top(f2, z), 0.011, alpha(PAL.ink, 0.6)); v.pickable(F.mesh.sphere(s, top(f, z), 0.085, PAL.ink), 'a lattice point at a corner of the hexagonal prism'); });
          F.mesh.stick(s, top(f, 0), top(f, 1), 0.011, alpha(PAL.ink, 0.6));
        });
        [0, 1].forEach((z) => v.pickable(F.mesh.sphere(s, top([1, 1], z), 0.095, F.cat(0)), 'a lattice point at the center of a base of the prism'));
      }
      /* a, b, c beside the middle of their edges, pushed out from the cell's centre; α, β, γ at their arcs at the origin corner */
      const O = Pc([0, 0, 0]), dA = W(va), dB = W(vb), dC = W(vc);
      const mid = Pc([0.5, 0.5, 0.5]), out = (f, k = 0.22) => { const q3 = Pc(f), dv = add3(q3, mul3(mid, -1)), l3 = len3(dv) || 1; return add3(q3, mul3(dv, k / l3)); };
      v.label('<i>a</i>', out([0.5, 0, 0]), g, 0);
      v.label('<i>b</i>', out([0, 0.5, 0]), g, 0);
      v.label('<i>c</i>', out([0, 0, 0.5]), g, 0);
      const ca3 = C('angle');
            [['α', dB, dC], ['β', dA, dC], ['γ', dA, dB]].forEach(([s, u, w]) => { v.label(`<i>${s}</i>`, F.mesh.arc(g, u, w, 0.45, O, ca3), g, 0).style.color = ca3; });
      faded.forEach(([s, x]) => F.fade3(s, x));
      v.invalidate();
    }
    const [sys, c] = LIST[+sel.value], S = SYS[sys];
    const key3 = [{ s: 'lattice point at a corner', draw: disc(PAL.ink, 7) }];
    if (c !== 'P' || sys === 'hexagonal') key3.push({ s: sys === 'hexagonal' ? 'lattice point at the center of a base' : `lattice point ${NAME[c]}`, draw: disc(F.cat(0), 7.5) });
    keyStrip(d, KH, key3);
    tex(d.readout, `\\text{${cap(sys)}:}\\ ${S.axes} \\\\ ${S.angles}`);
  }
  still(d, draw);
})();

/* =====================================================================
   Figure 10.57 + 10.58: a cation in its hole. Anions and cation at their
   real radii (0.0042 scene units per pm), the anions translucent so the
   cation shows, the polyhedron's edges in ink. The strip beneath is the
   radius-ratio line, 0 to 1, with the book's limits. Still. Free yaw;
   pitch within 0.9 rad of level.
===================================================================== */
(function () {
  const KH = 70, d = sim('sim-holes', KH);
  const v = F.view3d(d.stage, { h: 540, dist: 7.8, tilt: 0.3, spin: 'idle', pitch: [-0.9, 0.9] });
  v.setView(-0.4, 0.3);
  const grp = v.part(0);
  const cnv = F.makeCanvas(d.stage, 150);
  const K = 0.0042, T = 1 / S3;
  const HOLES = {
    zns: { f: 'ZnS', cat: ['Zn', 'Zn²⁺', 'zinc ion', 74], an: ['S', 'S²⁻', 'sulfide ion', 184], hole: 'tetrahedral', n: 4, shape: 'tetrahedron', dirs: [[T, T, T], [T, -T, -T], [-T, T, -T], [-T, -T, T]] },
    nacl: { f: 'NaCl', cat: ['Na', 'Na⁺', 'sodium ion', 102], an: ['Cl', 'Cl⁻', 'chloride ion', 181], hole: 'octahedral', n: 6, shape: 'octahedron', dirs: [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]] },
    cscl: { f: 'CsCl', cat: ['Cs', 'Cs⁺', 'cesium ion', 174], an: ['Cl', 'Cl⁻', 'chloride ion', 181], hole: 'cubic', n: 8, shape: 'cube', dirs: CORNERS.map((c) => c.map((x) => (2 * x - 1) * T)) },
  };
  const ratio = (k) => HOLES[k].cat[3] / HOLES[k].an[3];
  const cmp = F.choice(d.controls, { label: '\\text{compound}', aria: 'the compound', options: Object.keys(HOLES).map((k) => ({ value: k, label: HOLES[k].f })), value: 'nacl' });
  const swap = swapper(v, grp, (g, k, live) => {
    const q = HOLES[k], dist = (q.cat[3] + q.an[3]) * K, pts = q.dirs.map((u) => mul3(u, dist));
    const c = F.mesh.sphere(g, [0, 0, 0], q.cat[3] * K, F.el(q.cat[0]));
    pts.forEach((p) => { const m = F.mesh.sphere(g, p, q.an[3] * K, F.el(q.an[0]), { transparent: true, opacity: 0.4, depthWrite: false }); if (live) v.pickable(m, `${q.an[2]}, ${q.an[1]}, radius ${q.an[3]} pm`); });
    if (live) v.pickable(c, `${q.cat[2]}, ${q.cat[1]}, radius ${q.cat[3]} pm`);
    let min = Infinity; pts.forEach((p, i) => pts.forEach((r, j) => { if (j > i) min = Math.min(min, len3([p[0] - r[0], p[1] - r[1], p[2] - r[2]])); }));
    pts.forEach((p, i) => pts.forEach((r, j) => { if (j > i && len3([p[0] - r[0], p[1] - r[1], p[2] - r[2]]) < min * 1.01) F.mesh.stick(g, p, r, 0.014, PAL.ink); }));
  });
  function draw() {
    swap(cmp, [HOLES.zns, HOLES.nacl, HOLES.cscl].map((q) => F.el(q.cat[0]) + F.el(q.an[0])).join());
    const q = HOLES[cmp.value], x = ratio(cmp.value);
    keyStrip(d, KH, [{ s: `${q.cat[1]}, ${q.cat[2]}`, draw: disc(F.el(q.cat[0]), 6) }, { s: `${q.an[1]}, ${q.an[2]}`, draw: disc(F.el(q.an[0]), 10.5) }, { s: `edges of the ${q.shape}`, color: PAL.ink, w: 3 }]);
    tex(d.readout, `\\dfrac{r_{+}}{r_{-}} = \\dfrac{${hue('length', q.cat[3] + '\\ \\text{pm}')}}{${hue('length', q.an[3] + '\\ \\text{pm}')}} = ${x.toFixed(3)}`);
    const { ctx } = begin(cnv), L = 150, R = 1250, Y = 66, X = (r) => L + (R - L) * r;
    line(ctx, L, Y, R, Y, PAL.ink, 3);
    [[0.225, 0.414, 'tetrahedral hole'], [0.414, 0.732, 'octahedral hole'], [0.732, 1, 'cubic hole']].forEach(([a, b, s]) => {
      const on = s.startsWith(q.hole);
      ctx.save(); ctx.fillStyle = alpha(PAL.ink, on ? 0.16 : 0.06); ctx.fillRect(X(a), Y - 16, X(b) - X(a), 32); ctx.restore();
      text(ctx, s, (X(a) + X(b)) / 2, Y - 30, on ? PAL.ink : PAL.muted, { size: 20, align: 'center', weight: on ? 600 : 400 });
    });
    [0, 0.225, 0.414, 0.732, 1].forEach((t) => { line(ctx, X(t), Y - 16, X(t), Y + 16, PAL.ink, 2); text(ctx, t === 0 || t === 1 ? String(t) : t.toFixed(3), X(t), Y + 38, PAL.muted, { size: 17, align: 'center' }); });
    text(ctx, 'r₊ / r₋', L - 24, Y + 6, PAL.ink, { size: 20, align: 'right', weight: 600 });
    const xm = X(cmp.mix((k) => ratio(k)));
    dot(ctx, xm, Y, PAL.ink, true, 11);
    text(ctx, q.f, xm, Y + 64, PAL.ink, { size: 20, align: 'center', weight: 600 });
  }
  still(d, draw);
})();

/* =====================================================================
   Figure 10.59 to 10.62: four ionic unit cells. Ions at half their radii
   so the inside of the cell can be seen, the cell edge 1.7 scene units.
   Each ion names its share of the cell on hover. Still. Free yaw; pitch
   within 0.9 rad of level.
===================================================================== */
(function () {
  const KH = 70, d = sim('sim-ionic', KH);
  const v = F.view3d(d.stage, { h: 600, dist: 7.0, tilt: 0.34, spin: 'idle', pitch: [-0.9, 0.9] });
  v.setView(-0.45, 0.34);
  const grp = v.part(0), E = 1.7;
  const EDGES = [[0.5, 0, 0], [0.5, 1, 0], [0.5, 0, 1], [0.5, 1, 1], [0, 0.5, 0], [1, 0.5, 0], [0, 0.5, 1], [1, 0.5, 1], [0, 0, 0.5], [1, 0, 0.5], [0, 1, 0.5], [1, 1, 0.5]];
  const FCC = [...CORNERS, ...FACES], TET = CORNERS.map((c) => c.map((x) => (x ? 0.75 : 0.25)));
  /* alternate tetrahedral holes: (¼,¼,¼), (¾,¾,¼), (¾,¼,¾), (¼,¾,¾) */
  const ZN = TET.filter((p) => Math.round((p[0] + p[1] + p[2]) * 4) % 4 === 3);
  const ION = {
    Cl: ['Cl', 'chloride ion', 'Cl⁻', 181], Cs: ['Cs', 'cesium ion', 'Cs⁺', 174], Na: ['Na', 'sodium ion', 'Na⁺', 102],
    S: ['S', 'sulfide ion', 'S²⁻', 184], Zn: ['Zn', 'zinc ion', 'Zn²⁺', 74], Ca: ['Ca', 'calcium ion', 'Ca²⁺', 100], F: ['F', 'fluoride ion', 'F⁻', 133],
  };
  const CMP = {
    cscl: { f: 'CsCl', a: 412, sets: [['Cl', CORNERS], ['Cs', [[0.5, 0.5, 0.5]]]], counts: ['\\text{Cl}^{-}: 8\\times\\tfrac{1}{8} = 1', '\\text{Cs}^{+}: 1'] },
    nacl: { f: 'NaCl', a: 564, sets: [['Cl', FCC], ['Na', [...EDGES, [0.5, 0.5, 0.5]]]], counts: ['\\text{Cl}^{-}: 8\\times\\tfrac{1}{8} + 6\\times\\tfrac{1}{2} = 4', '\\text{Na}^{+}: 12\\times\\tfrac{1}{4} + 1 = 4'] },
    zns: { f: 'ZnS', a: 541, sets: [['S', FCC], ['Zn', ZN]], bonds: 'Zn', counts: ['\\text{S}^{2-}: 8\\times\\tfrac{1}{8} + 6\\times\\tfrac{1}{2} = 4', '\\text{Zn}^{2+}: 4 \\text{ in half of the 8 tetrahedral holes}'] },
    caf2: { f: 'CaF₂', a: 546, sets: [['Ca', FCC], ['F', TET]], bonds: 'F', counts: ['\\text{Ca}^{2+}: 8\\times\\tfrac{1}{8} + 6\\times\\tfrac{1}{2} = 4', '\\text{F}^{-}: 8 \\text{ in all 8 tetrahedral holes}'] },
  };
  const share = (f) => { const n = f.filter((x) => x === 0 || x === 1).length; return ['wholly inside the cell', 'on a face, one-half in the cell', 'on an edge, one-quarter in the cell', 'at a corner, one-eighth in the cell'][n]; };
  const at = (f) => [(f[0] - 0.5) * E, (f[2] - 0.5) * E, (0.5 - f[1]) * E];
  const cmp = F.choice(d.controls, { label: '\\text{compound}', aria: 'the ionic compound', options: Object.keys(CMP).map((k) => ({ value: k, label: CMP[k].f })), value: 'nacl' });
  const swap = swapper(v, grp, (g, k, live) => {
    const q = CMP[k], s = E / q.a;
    cellEdges(g, [-E / 2, -E / 2, -E / 2], [E, 0, 0], [0, E, 0], [0, 0, E], 0.013, PAL.ink);
    q.sets.forEach(([ion, pts]) => pts.forEach((f) => { const m = F.mesh.sphere(g, at(f), 0.5 * ION[ion][3] * s, F.el(ION[ion][0])); if (live) v.pickable(m, `${ION[ion][1]}, ${ION[ion][2]}, ${share(f)}`); }));
    if (q.bonds) {
      const small = q.sets.find(([ion]) => ion === q.bonds)[1], big = q.sets.find(([ion]) => ion !== q.bonds)[1];
      small.forEach((p) => big.forEach((b) => { if (Math.abs(len3([p[0] - b[0], p[1] - b[1], p[2] - b[2]]) - S3 / 4) < 1e-6) F.mesh.stick(g, at(p), at(b), 0.014, alpha(PAL.ink, 0.6)); }));
    }
  });
  function draw() {
    swap(cmp, Object.values(ION).map((i) => F.el(i[0])).join());
    const q = CMP[cmp.value], s = 10.5 / Math.max(...q.sets.map(([ion]) => ION[ion][3]));
    const key3 = q.sets.map(([ion]) => ({ s: `${ION[ion][2]}, ${ION[ion][1]}`, draw: disc(F.el(ion), Math.max(4.5, ION[ion][3] * s)) }));
    if (q.bonds) key3.push({ s: 'lines to the four nearest neighbors', color: alpha(PAL.ink, 0.6), w: 3 });
    keyStrip(d, KH, key3);
    tex(d.readout, q.counts.join(' \\\\ '));
  }
  still(d, draw);
})();

/* =====================================================================
   Figure 10.63 + 10.64: Bragg reflection from two planes of copper atoms.
   Left: the planes, d apart at 400 units per nm (0.5 nm is 200 units), the
   two rays in and out at θ, and the extra path d sin θ on either side of the
   lower atom. Right: the two scattered waves, drawn at 600 units per nm of
   wavelength, and their sum. Still: the lesson is the phase between the
   waves, not their travel. The two rays with their waves and the sum are
   referents in F.ref; the spacing and the extra path wear length, θ angle,
   λ wavelength.
===================================================================== */
(function () {
  const d = sim('sim-bragg', 560);
  const bragg = (n, th, lm, dd) => n * lm / (2 * dd);
  const th = ctl(d.controls, { label: '\\kthetabragg', cls: 'angle', min: 5, max: 60, step: 0.05, value: 25.25, unit: '°', dec: 2, aria: 'angle theta in degrees',
    specials: [1, 2, 3].map((n) => ({ at: () => { const s = bragg(n, 0, lm.v, dd.v); return s < 1 ? Math.asin(s) / RAD : null; }, label: `n = ${n}` })) });
  const lm = ctl(d.controls, { label: '\\klam', cls: 'wavelength', min: 0.05, max: 0.3, step: 0.0005, value: 0.1315, unit: 'nm', dec: 4, aria: 'wavelength in nanometers',
    specials: [1, 2, 3].map((n) => ({ at: () => 2 * dd.v * Math.sin(th.v * RAD) / n, label: `n = ${n}` })) });
  const dd = ctl(d.controls, { label: '\\kdplane', cls: 'length', min: 0.1, max: 0.5, step: 0.001, value: 0.154, unit: 'nm', dec: 3, aria: 'spacing between the planes in nanometers',
    specials: [1, 2, 3].map((n) => ({ at: () => n * lm.v / (2 * Math.sin(th.v * RAD)), label: `n = ${n}` })) });
  const S = 400, XP = 380, Y1 = 290, L0 = 40, R0 = 700;
  function draw() {
    const { ctx, H } = begin(d.c), lab = F.labeller(ctx, H, { headline: true });
    const t = th.v * RAD, dn = dd.v, lam = lm.v, cw = C('wavelength'), cl = C('length'), ca = C('angle'), cU = F.ref('upper-ray'), cD = F.ref('lower-ray'), Y2 = Y1 + dn * S, cs = Math.cos(t), sn = Math.sin(t);
    /* the planes */
    [Y1, Y2].forEach((y) => { line(ctx, L0, y, R0, y, alpha(PAL.ink, 0.35), 2); for (let x = XP - 5 * 64; x <= R0; x += 64) if (x >= L0) { ctx.beginPath(); ctx.arc(x, y, 13, 0, 2 * Math.PI); ctx.fillStyle = F.el('Cu'); ctx.fill(); ctx.lineWidth = 1.5; ctx.strokeStyle = alpha(PAL.ink, 0.5); ctx.stroke(); } });
    F.vbracket(ctx, L0 + 12, Y1, Y2, cl, 'd', 1);
    /* the rays, clipped to the scene */
    ctx.save(); ctx.beginPath(); ctx.rect(L0, 118, R0 - L0, 440); ctx.clip();
    const Lr = 420;
    [[XP, Y1, cU], [XP, Y2, cD]].forEach(([x, y, cr]) => {
      F.arrow(ctx, x - Lr * cs, y - Lr * sn, x - 16 * cs, y - 16 * sn, cr, 4);
      F.arrow(ctx, x, y, x + Lr * cs, y - Lr * sn, cr, 4);
    });
    /* the extra path of the lower ray: d sin θ in and d sin θ out */
    const k = dn * S * sn, Fin = [XP - k * cs, Y2 - k * sn], Gout = [XP + k * cs, Y2 - k * sn];
    line(ctx, XP, Y1, Fin[0], Fin[1], alpha(PAL.ink, 0.5), 2, [4, 8]);
    line(ctx, XP, Y1, Gout[0], Gout[1], alpha(PAL.ink, 0.5), 2, [4, 8]);
    line(ctx, Fin[0], Fin[1], XP, Y2, cl, 7);
    line(ctx, XP, Y2, Gout[0], Gout[1], cl, 7);
    ctx.restore();
    /* below the lower plane, clear of its atoms, one to each side of the atom the lower ray meets */
    lab.add('d sin θ', (Fin[0] + XP) / 2, Y2 + 16, -0.5, 0.87, cl, 20, 22);
    lab.add('d sin θ', (Gout[0] + XP) / 2, Y2 + 16, 0.5, 0.87, cl, 20, 22);
    F.angleArc(ctx, { x: XP, y: Y1 }, 64, Math.PI - t, Math.PI, 'θ', lab, ca);
    F.angleArc(ctx, { x: XP, y: Y1 }, 64, 0, t, 'θ', lab, ca);
    text(ctx, 'incident X-rays', L0 + 10, 96, PAL.muted, { size: 17 });
    text(ctx, 'diffracted X-rays', R0 - 10, 96, PAL.muted, { size: 17, align: 'right' });

    /* the two waves and their sum */
    const path = 2 * dn * sn, m = path / lam, delta = 2 * Math.PI * m, WL = 780, WR = 1360, A = 32, px = lam * 600;
    const wave = (y, ph, amp, col, w) => { ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = w; ctx.beginPath(); for (let x = WL; x <= WR; x += 3) { const yy = y - amp * Math.cos(2 * Math.PI * (x - WL) / px - ph); if (x === WL) ctx.moveTo(x, yy); else ctx.lineTo(x, yy); } ctx.stroke(); ctx.restore(); };
    const ya = 150, yb = 290, ys = 450, amp = 2 * A * Math.abs(Math.cos(delta / 2)), phs = delta / 2;
    [ya, yb, ys].forEach((y) => line(ctx, WL, y, WR, y, alpha(PAL.ink, 0.25), 2));
    const cS = F.ref('sum-wave');
    wave(ya, 0, A, cU, 3.5); wave(yb, delta, A, cD, 3.5); wave(ys, phs, amp, cS, 5);
    text(ctx, 'from the upper plane', WL, ya - A - 18, cU, { size: 17 });
    text(ctx, 'from the lower plane', WL, yb - A - 18, cD, { size: 17 });
    text(ctx, 'sum', WL, ys - 2 * A - 16, cS, { size: 17 });
    F.hbracket(ctx, WL, WL + px, ya + A + 12, cw, 'λ', { side: 'below' });
    line(ctx, 755, 110, 755, 500, alpha(PAL.ink, 0.2), 2);
    lab.flush();

    const n = Math.round(m), off = Math.abs(m - n);
    const verdict = n >= 1 && off < 0.05 ? 'so the waves reinforce' : off > 0.42 ? 'so the waves cancel' : 'so the waves partly cancel';
    topline(ctx, `The lower ray travels ${m.toFixed(2)} wavelengths farther, ${verdict}.`);
    tex(d.readout, `2\\kdplane\\sin\\kthetabragg = 2(${hue('length', dn.toFixed(3) + '\\ \\text{nm}')})\\sin(${hue('angle', th.v.toFixed(2) + '^\\circ')}) = ${hue('length', path.toFixed(4) + '\\ \\text{nm}')} = ${m.toFixed(2)}\\,\\klam`);
  }
  still(d, draw);
})();
};
