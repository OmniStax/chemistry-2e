/* Figures for section 18.4 Structure and General Properties of the Nonmetals. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['18.4'] = function (root, F) {
const { el, tex, PAL, alpha, ctl, register, begin, line, text, arrow } = F;
const sim = (id, H) => F.sim(root, id, H);
const still = (d, draw) => register(d.fig, { update: () => {}, draw });
function readout(host, main, small) { tex(host, main); if (small) host.appendChild(el('small', null, small)); }
const TAU = 2 * Math.PI, R3 = Math.sqrt(3);
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;
const degC = (x) => hue('temperature', `${x}\\ ^\\circ\\text{C}`);
const dist3 = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
const lerp3 = (a, b, k) => [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k];
const smooth = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
const palSig = (els) => [PAL.ink, PAL.panel, PAL.muted, ...els.map((e) => F.el(e))].join('|');
function rng(seed) { let a = seed >>> 0; return () => { a = (a + 0x6d2b79f5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
const VIEW3 = { spin: 'idle', pitch: [-1.3, 1.3], tilt: 0.3 };

/* =====================================================================
   FIGURE 18.19: the common oxidation states of the nonmetals, the
   book's six columns set on one scale from 8+ to 4−, so a state reads
   off by height and the book's "To" is a run through every state
   between. A faithful copy: still, no controls.
===================================================================== */
(function () {
  const d = sim('fig-oxidation-states', 560);
  const COLS = [
    { g: 0, head: 'H', name: 'hydrogen', s: [1, -1] },
    { g: 1, head: 'C', name: 'carbon', run: [4, -4] },
    { g: 2, head: 'N', name: 'nitrogen', run: [5, -3] },
    { g: 2, head: 'P, As', name: 'phosphorus and arsenic', s: [5, 3, -3] },
    { g: 3, head: 'O', name: 'oxygen', s: [-1, -2] },
    { g: 3, head: 'S, Se', name: 'sulfur and selenium', s: [6, 4, -2] },
    { g: 4, head: 'F', name: 'fluorine', s: [-1] },
    { g: 4, head: 'Cl, Br, I', name: 'chlorine, bromine and iodine', s: [7, 5, 3, 1, -1] },
    { g: 5, head: 'Xe', name: 'xenon', s: [8, 6, 4, 2] },
  ];
  const st = (s) => (s > 0 ? `${s}+` : s < 0 ? `${-s}−` : '0');
  const T = 118, B = 526, L = 196, R = 1376, GAP = 18, STEP = (B - T) / 12;
  const Y = (s) => T + (8 - s) * STEP;
  const W = (R - L - 5 * GAP) / COLS.length;
  const X = (i) => L + i * W + COLS[i].g * GAP + W / 2;
  const hits = []; F.hover(d.stage, () => hits);
  still(d, () => {
    const { ctx } = begin(d.c); hits.length = 0;
    for (let g = 0; g <= 5; g++) {
      const mine = COLS.map((c, i) => [c, i]).filter(([c]) => c.g === g);
      const x0 = X(mine[0][1]) - W / 2, x1 = X(mine[mine.length - 1][1]) + W / 2;
      ctx.fillStyle = alpha(PAL.ink, 0.045); ctx.fillRect(x0, T - 74, x1 - x0, B - T + 98);
    }
    for (let s = 8; s >= -4; s--) {
      line(ctx, L, Y(s), R, Y(s), alpha(PAL.ink, s === 0 ? 0.4 : 0.12), s === 0 ? 2 : 1.5);
      text(ctx, st(s), L - 22, Y(s), PAL.muted, { size: 17, align: 'right' });
    }
    text(ctx, 'oxidation state', L - 22, T - 52, PAL.muted, { size: 17, align: 'right' });
    COLS.forEach((c, i) => {
      const x = X(i);
      text(ctx, c.head, x, T - 46, PAL.ink, { size: 22, weight: 600, align: 'center' });
      if (c.run) {
        const [hi, lo] = c.run;
        line(ctx, x, Y(hi), x, Y(lo), alpha(PAL.ink, 0.28), 10);
        for (let s = hi; s >= lo; s--) {
          const end = s === hi || s === lo;
          F.dot(ctx, x, Y(s), PAL.ink, true, end ? 9 : 5);
          hits.push({ x, y: Y(s), r: 11, name: `${c.name}: ${st(s)}, one of its states from ${st(hi)} to ${st(lo)}` });
        }
      } else c.s.forEach((s) => { F.dot(ctx, x, Y(s), PAL.ink, true, 9); hits.push({ x, y: Y(s), r: 11, name: `${c.name}: ${st(s)}` }); });
    });
  });
})();

/* =====================================================================
   FIGURE 18.20 + 18.22 + 18.23: the allotropes of carbon to turn, one
   scale throughout (a C–C bond of graphite is 0.3 scene units, the
   bond of diamond 0.33, the layers 0.71 apart, C60 1.5 across). The
   middle layer of graphite is the graphene sheet: choosing graphene
   draws the outer layers away, and the nanotube is that sheet rolled.
   Diamond and C60 have no counterpart and crossfade. Still: a form is
   a discrete state. No ground; pitch bounded to ±1.3 rad.
===================================================================== */
(function () {
  const d = sim('sim-carbon');
  const v = F.view3d(d.stage, { ...VIEW3, h: 560, dist: 7.2 });
  /* the sheets lie flat, as the book draws graphite's layers, so the stacking reads from the side */
  const grp = v.part(0); if (grp) { grp.position.y = -0.1; grp.rotation.x = -Math.PI / 2; }
  const A = 0.3, NC = 8, NR = 6, PER = R3 * A, Wd = NC * PER, RT = Wd / TAU, GAP = 0.71, RA = 0.08, RB = 0.03;
  const flat = [];
  for (let j = 0; j < NR; j++) for (let i = 0; i < NC; i++) { const x = ((i + j / 2) * PER) % Wd; flat.push([x, j * 1.5 * A], [x, j * 1.5 * A + A]); }
  const yMid = ((NR - 1) * 1.5 * A + A) / 2;
  flat.forEach((p) => { p[0] -= Wd / 2; p[1] -= yMid; });
  const idx = (i, j, b) => 2 * (j * NC + (((i % NC) + NC) % NC)) + b;
  const sheetBonds = [];
  for (let j = 0; j < NR; j++) for (let i = 0; i < NC; i++) {
    sheetBonds.push([idx(i, j, 0), idx(i, j, 1)]);
    if (j + 1 < NR) sheetBonds.push([idx(i, j, 1), idx(i, j + 1, 0)], [idx(i, j, 1), idx(i - 1, j + 1, 0)]);
  }
  const wraps = sheetBonds.map(([a, b]) => Math.abs(flat[a][0] - flat[b][0]) > Wd / 2);
  const roll = (p, k) => {
    if (k < 1e-3) return [p[0], p[1], 0];
    const Rk = RT / k, th = p[0] / Rk;
    return [Rk * Math.sin(th), p[1], Rk * Math.cos(th) - Rk + RT];
  };
  /* diamond: two cubic cells each way of the face-centred lattice with its tetrahedral basis, edge 0.95 */
  const DA = 0.95, FCC = [[0, 0, 0], [0.5, 0.5, 0], [0.5, 0, 0.5], [0, 0.5, 0.5]], BAS = [[0, 0, 0], [0.25, 0.25, 0.25]];
  const dia = [];
  for (let i = -1; i <= 2; i++) for (let j = -1; j <= 2; j++) for (let k = -1; k <= 2; k++) FCC.forEach((f) => BAS.forEach((b) => {
    const p = [i + f[0] + b[0], j + f[1] + b[1], k + f[2] + b[2]];
    if (p.every((x) => x > -1e-6 && x < 2 + 1e-6)) dia.push(p.map((x) => (x - 1) * DA));
  }));
  const DB = (R3 / 4) * DA, diaBonds = [];
  for (let i = 0; i < dia.length; i++) for (let j = i + 1; j < dia.length; j++) if (Math.abs(dist3(dia[i], dia[j]) - DB) < 0.01) diaBonds.push([i, j]);
  const keep = dia.map((_, i) => diaBonds.filter((b) => b.includes(i)).length >= 2);
  /* C60 from the icosahedron's three generating points, edge A */
  const phi = (1 + Math.sqrt(5)) / 2, bucky = [];
  [[0, 1, 3 * phi], [1, 2 + phi, 2 * phi], [phi, 2, phi * phi * phi]].forEach((b) => [0, 1, 2].forEach((rot) => {
    const q = [b[rot], b[(rot + 1) % 3], b[(rot + 2) % 3]];
    for (let m = 0; m < 8; m++) { const p = q.map((x, n) => ((m >> n) & 1 ? -x : x)); if (!bucky.some((r) => dist3(r, p) < 1e-6)) bucky.push(p); }
  }));
  const bp = bucky.map((p) => p.map((x) => (x * A) / 2)), bb = [];
  for (let i = 0; i < bp.length; i++) for (let j = i + 1; j < bp.length; j++) if (Math.abs(dist3(bp[i], bp[j]) - A) < 0.01) bb.push([i, j]);
  const FORM = F.choice(d.controls, { label: '\\text{form}', options: [{ value: 'diamond', label: 'diamond' }, { value: 'graphite', label: 'graphite' }, { value: 'graphene', label: 'graphene' }, { value: 'tube', label: 'nanotube' }, { value: 'ball', label: 'C<sub>60</sub>' }], value: 'diamond', aria: 'the form of carbon' });
  const NAME = { diamond: 'a carbon atom of diamond, bonded to four others', sheet: 'a carbon atom, bonded to three others in a six-membered ring', layer: 'a carbon atom of another graphite layer', ball: 'a carbon atom of C₆₀' };
  let sig = '', sheet, sMesh = [], sBond = [], upper, lower, diaG, ballG;
  function build() {
    const key = palSig(['C']); if (key === sig || !grp) return; sig = key;
    v.clear(); const T3 = window.THREE;
    sheet = new T3.Group(); upper = new T3.Group(); lower = new T3.Group(); diaG = new T3.Group(); ballG = new T3.Group();
    grp.add(sheet, upper, lower, diaG, ballG);
    sMesh = flat.map((p) => v.pickable(F.mesh.sphere(sheet, [p[0], p[1], 0], RA, F.el('C')), NAME.sheet));
    sBond = sheetBonds.map(([a, b]) => v.pickable(F.mesh.stick(sheet, [flat[a][0], flat[a][1], 0], [flat[b][0], flat[b][1], 0], RB, PAL.muted), 'a C–C bond: a σ bond, with a share of the π bonding'));
    [upper, lower].forEach((g) => {
      const pts = flat.map((p) => [p[0], p[1] + A, 0]);
      const on = (p) => Math.abs(p[1]) <= yMid + 1e-6;
      pts.forEach((p) => { if (on(p)) v.pickable(F.mesh.sphere(g, p, RA, F.el('C')), NAME.layer); });
      sheetBonds.forEach(([a, b], i) => { if (!wraps[i] && on(pts[a]) && on(pts[b])) F.mesh.stick(g, pts[a], pts[b], RB, PAL.muted); });
    });
    /* one atom near the centre and its four neighbours solid, its bonds in ink; the rest pale, so the tetrahedron reads */
    let hub = -1, bd = 1e9; dia.forEach((p, i) => { const r = Math.hypot(...p), n = diaBonds.filter((b) => b.includes(i)).length; if (keep[i] && n === 4 && r < bd) { bd = r; hub = i; } });
    const near = new Set([hub]); diaBonds.forEach(([i, j]) => { if (i === hub) near.add(j); if (j === hub) near.add(i); });
    const pale = { transparent: true, opacity: 0.4, depthWrite: false };
    dia.forEach((p, i) => { if (keep[i]) v.pickable(F.mesh.sphere(diaG, p, near.has(i) ? RA * 1.15 : RA, F.el('C'), near.has(i) ? undefined : pale), NAME.diamond); });
    diaBonds.forEach(([i, j]) => { if (!keep[i] || !keep[j]) return; const on = i === hub || j === hub; v.pickable(F.mesh.stick(diaG, dia[i], dia[j], on ? RB * 2 : RB, on ? PAL.ink : PAL.muted, on ? undefined : pale), 'a C–C single bond'); });
    bp.forEach((p) => v.pickable(F.mesh.sphere(ballG, p, RA, F.el('C')), NAME.ball));
    bb.forEach(([i, j]) => F.mesh.stick(ballG, bp[i], bp[j], RB, PAL.muted));
  }
  const HEAD = {
    diamond: 'In diamond each carbon atom forms four single bonds to four other atoms at the corners of a tetrahedron.',
    graphite: 'In graphite each carbon atom bonds to three others in a planar layer; weak forces hold the layers together.',
    graphene: 'Graphene is a single layer of graphite, one atom thick.',
    tube: 'A carbon nanotube is the same layer of six-membered rings rolled into a small tube.',
    ball: 'C₆₀, buckminsterfullerene, is an icosahedral molecule of 60 carbon atoms.',
  };
  const RO = {
    diamond: `\\text{4 single bonds per C atom }(sp^{3})\\text{, a 3D network} \\;\\to\\; \\text{very hard, melts at }{\\sim}${degC(4400)}`,
    graphite: '\\sigma\\text{ and }\\pi\\text{ bonds in a layer }(sp^{2})\\text{, London forces between} \\;\\to\\; \\text{soft, conducts}',
    graphene: '\\text{one layer of }sp^{2}\\text{ rings, no stacking} \\;\\to\\; \\text{strong, conducts}',
    tube: '\\text{the layer wrapped into a tube} \\;\\to\\; \\text{harder than diamond}',
    ball: '60\\text{ C atoms in a closed, icosahedral cage}',
  };
  function draw() {
    build(); if (!grp || !sheet) return;
    const kStack = FORM.mix((f) => (f === 'graphite' ? 1 : 0)), kRoll = FORM.mix((f) => (f === 'tube' ? 1 : 0));
    const P = flat.map((p) => roll(p, kRoll));
    sMesh.forEach((m, i) => m.position.set(P[i][0], P[i][1], P[i][2]));
    sBond.forEach((m, i) => { F.mesh.setStick(m, P[sheetBonds[i][0]], P[sheetBonds[i][1]]); m.visible = !wraps[i] || kRoll > 0.98; });
    upper.position.z = GAP + (1 - kStack) * 1.6; lower.position.z = -GAP - (1 - kStack) * 1.6;
    F.fade3(upper, kStack); F.fade3(lower, kStack);
    F.fade3(sheet, FORM.mix((f) => (f === 'diamond' || f === 'ball' ? 0 : 1)));
    F.fade3(diaG, FORM.mix((f) => (f === 'diamond' ? 1 : 0)));
    F.fade3(ballG, FORM.mix((f) => (f === 'ball' ? 1 : 0)));
    v.headline(HEAD[FORM.value]);
    v.invalidate();
    readout(d.readout, RO[FORM.value]);
  }
  still(d, draw);
})();

/* =====================================================================
   FIGURE 18.24: white phosphorus as P4 molecules and red phosphorus as
   P4 tetrahedra joined by P–P single bonds. Four molecules: in the red
   form each opens the bond between its two front base atoms, and those
   atoms bond to the neighbouring tetrahedra, so every atom keeps three
   bonds; the chain runs on past the ends as the book's stubs show. The
   choice eases each molecule along and turns it into line. Still: two
   allotropes are two states. No ground; pitch bounded to ±1.3 rad.
===================================================================== */
(function () {
  const d = sim('sim-phosphorus');
  const v = F.view3d(d.stage, { ...VIEW3, h: 420, dist: 4.9 });
  const grp = v.part(0);
  const E = 0.6, H = E * Math.sqrt(2 / 3), OPEN = 1.35, SP = OPEN * E + E, N = 4;
  /* a tetrahedron, base in the xz plane, a and b at the front, apex d up; s spreads a and b to OPEN × E */
  const tet = (s) => { const half = (E / 2) * (1 + (OPEN - 1) * s); return [[-half, -H / 3, E / (2 * R3)], [half, -H / 3, E / (2 * R3)], [0, -H / 3, -E / R3], [0, (2 * H) / 3, 0]]; };
  const EDGES = [[0, 2], [0, 3], [1, 2], [1, 3], [2, 3]];
  const T3 = window.THREE;
  const WHITE = [[-2.0, 0.35, 0.25, 0.9, 0.4, 0.2], [-0.65, -0.45, -0.35, 2.1, 1.3, 0.5], [0.7, 0.4, 0.3, 0.3, 2.4, 1.1], [2.0, -0.3, -0.2, 1.5, 0.7, 2.6]];
  const qW = T3 ? WHITE.map(([, , , a, b, c]) => new T3.Quaternion().setFromEuler(new T3.Euler(a, b, c))) : [];
  const FORM = F.choice(d.controls, { label: '\\text{form}', options: [{ value: 'white', label: 'white phosphorus' }, { value: 'red', label: 'red phosphorus' }], value: 'white', aria: 'the allotrope of phosphorus' });
  let sig = '', atoms = [], sticks = [], ab = [], links = [], stubs = [], gOpen, gLink;
  function build() {
    const key = palSig(['P']); if (key === sig || !grp) return; sig = key;
    v.clear(); gOpen = new T3.Group(); gLink = new T3.Group(); grp.add(gOpen, gLink);
    atoms = []; sticks = []; ab = []; links = []; stubs = [];
    for (let m = 0; m < N; m++) {
      atoms.push([0, 1, 2, 3].map(() => v.pickable(F.mesh.sphere(grp, [0, 0, 0], 0.15, F.el('P')), 'a phosphorus atom, P, bonded to three other P atoms')));
      sticks.push(EDGES.map(() => v.pickable(F.mesh.stick(grp, [0, 0, 0], [1, 0, 0], 0.05, PAL.muted), 'a P–P single bond within a tetrahedron')));
      ab.push(v.pickable(F.mesh.stick(gOpen, [0, 0, 0], [1, 0, 0], 0.05, PAL.muted), 'a P–P single bond, the one that opens on heating'));
      if (m + 1 < N) links.push(v.pickable(F.mesh.stick(gLink, [0, 0, 0], [1, 0, 0], 0.05, PAL.muted), 'a P–P single bond joining two tetrahedra'));
    }
    stubs = [0, 1].map(() => v.pickable(F.mesh.stick(gLink, [0, 0, 0], [1, 0, 0], 0.05, PAL.muted), 'a P–P bond to the next tetrahedron of the network'));
  }
  function draw() {
    build(); if (!grp || !T3 || !atoms.length) return;
    const k = FORM.mix((f) => (f === 'red' ? 1 : 0)), ke = F.ease.smooth(k);
    const pos = [];
    for (let m = 0; m < N; m++) {
      const w = WHITE[m], c = lerp3([w[0], w[1], w[2]], [(m - (N - 1) / 2) * SP, 0, 0], ke);
      const q = qW[m].clone().slerp(new T3.Quaternion(), ke);
      const p = tet(smooth(0.15, 0.85, k)).map((x) => { const u = new T3.Vector3(...x).applyQuaternion(q); return [u.x + c[0], u.y + c[1], u.z + c[2]]; });
      pos.push(p);
      p.forEach((x, i) => atoms[m][i].position.set(...x));
      EDGES.forEach(([i, j], e) => F.mesh.setStick(sticks[m][e], p[i], p[j]));
      F.mesh.setStick(ab[m], p[0], p[1]);
    }
    links.forEach((s, m) => F.mesh.setStick(s, pos[m][1], pos[m + 1][0]));
    F.mesh.setStick(stubs[0], pos[0][0], [pos[0][0][0] - E * 0.55, pos[0][0][1], pos[0][0][2]]);
    F.mesh.setStick(stubs[1], pos[N - 1][1], [pos[N - 1][1][0] + E * 0.55, pos[N - 1][1][1], pos[N - 1][1][2]]);
    F.fade3(gOpen, 1 - smooth(0.1, 0.45, k));
    F.fade3(gLink, smooth(0.8, 1, k));
    v.headline(FORM.value === 'white' ? 'White phosphorus exists as P₄ molecules, four atoms at the corners of a regular tetrahedron.' : 'Heated to 270–300 °C without air, the P₄ tetrahedra join through P–P single bonds into red phosphorus.');
    v.invalidate();
    readout(d.readout, FORM.value === 'white'
      ? `\\text{separate P}_{4}\\text{ molecules, each P bonded to 3 P; melts at }${degC('44.2')}`
      : `\\text{P}_{4}\\text{ tetrahedra joined in a chain, each P still bonded to 3 P; melts at }{\\sim}${degC(600)}`);
  }
  still(d, draw);
})();

/* =====================================================================
   FIGURE 18.25: molten sulfur on a temperature slider. 32 atoms, as in
   the book's four drawings: four S8 crowns (113 °C), four S8 chains,
   three chains of 9, 12 and 11 atoms, and those chains drawn together
   and tangled (230 °C). The text gives no temperature between the
   melting point and 230 °C, so the four states are spread evenly over
   that range. A bond is drawn while its two atoms are within bonding
   distance, so rings open and chains join as the atoms move. The strip
   beneath carries the liquid's colour as the fact (straw to dark red)
   on a fixed axis from 100 to 260 °C. Still: positions are a function
   of temperature. No ground; pitch bounded to ±1.3 rad.
===================================================================== */
(function () {
  const d = sim('sim-sulfur');
  const v = F.view3d(d.stage, { ...VIEW3, h: 440, dist: 4.9 });
  const grp = v.part(0), c2 = F.makeCanvas(d.stage, 210); if (grp) grp.position.y = -0.2;
  const Tsl = ctl(d.controls, { label: '\\kT', cls: 'temperature', min: 113, max: 260, step: 1, value: 113, unit: '°C', dec: 0, aria: 'temperature of the liquid sulfur in degrees Celsius', specials: [{ at: 230, label: 'does not pour' }] });
  const BD = 0.42, NA = 32;
  const STRAW = '#e3c75a', AMBER = '#d4892b', DARK = '#8c1d12';
  const T3 = window.THREE;
  const rot = (p, [a, b, c]) => { if (!T3) return p; const u = new T3.Vector3(...p).applyEuler(new T3.Euler(a, b, c)); return [u.x, u.y, u.z]; };
  const add = (p, c) => [p[0] + c[0], p[1] + c[1], p[2] + c[2]];
  /* (a) four crowns: ring radius 0.81 bond, pucker ±0.39 bond */
  const RR = 0.81 * BD, HH = 0.39 * BD;
  const RING_AT = [[-0.7, 0.45, -0.3], [0.7, 0.45, 0.3], [-0.7, -0.45, 0.3], [0.7, -0.45, -0.3]];
  const ROW_AT = [[-0.3, 0.6, -0.45], [0.3, 0.2, 0.45], [-0.3, -0.2, -0.45], [0.3, -0.6, 0.45]];
  const RING_TURN = [[1.2, 0.3, 0.2], [0.4, 1.1, 0.9], [2.0, 0.5, 1.4], [0.9, 2.2, 0.3]];
  const confA = [];
  for (let r = 0; r < 4; r++) for (let j = 0; j < 8; j++) { const a = (j * TAU) / 8; confA.push(add(rot([RR * Math.cos(a), j % 2 ? HH : -HH, RR * Math.sin(a)], RING_TURN[r]), RING_AT[r])); }
  /* (b) four S8 chains, each a loose helix along x in its own row */
  const confB = [];
  for (let r = 0; r < 4; r++) for (let j = 0; j < 8; j++) { const a = (j * Math.PI) / 2; confB.push([ROW_AT[r][0] + (j - 3.5) * 0.85 * BD, ROW_AT[r][1] + 0.37 * BD * Math.cos(a), ROW_AT[r][2] + 0.37 * BD * Math.sin(a)]); }
  /* (c) and (d): three chains of 9, 12 and 11 atoms as random walks of fixed bond length and bond angle 106°,
     placed apart for (c) and drawn together and turned for (d); the first seed that keeps unbonded atoms apart is taken */
  const CHAINS = [[0, 9], [9, 21], [21, 32]], C_AT = [[-1.0, 0.35, 0], [0.9, 0.3, -0.1], [-0.1, -0.5, 0.1]];
  const PAIRS = [];
  for (let i = 0; i + 1 < NA; i++) PAIRS.push([i, i + 1]);
  for (let r = 0; r < 4; r++) PAIRS.push([8 * r, 8 * r + 7]);
  const chainOf = (i) => CHAINS.findIndex(([a, b]) => i >= a && i < b);
  const bonded = (i, j) => chainOf(i) === chainOf(j) && Math.abs(i - j) === 1;
  function walk(R, n) {
    const pts = [[0, 0, 0]]; let dir = [1, 0, 0], ref = [0, 1, 0];
    const cos = Math.cos(Math.PI - (106 * Math.PI) / 180), sin = Math.sin(Math.PI - (106 * Math.PI) / 180);
    for (let i = 1; i < n; i++) {
      const tw = (R() < 0.5 ? -1 : 1) * (1.2 + R() * 0.8) + (i === 1 ? R() * TAU : 0);
      const cr = [dir[1] * ref[2] - dir[2] * ref[1], dir[2] * ref[0] - dir[0] * ref[2], dir[0] * ref[1] - dir[1] * ref[0]], cl = Math.hypot(...cr) || 1;
      const n1 = cr.map((x) => x / cl), n2 = [dir[1] * n1[2] - dir[2] * n1[1], dir[2] * n1[0] - dir[0] * n1[2], dir[0] * n1[1] - dir[1] * n1[0]];
      const off = n1.map((x, q) => x * Math.cos(tw) + n2[q] * Math.sin(tw));
      const nd = dir.map((x, q) => x * cos + off[q] * sin);
      ref = dir; dir = nd; pts.push(add(pts[i - 1], dir.map((x) => x * BD)));
    }
    const c = [0, 1, 2].map((q) => pts.reduce((s, p) => s + p[q], 0) / n);
    return pts.map((p) => [p[0] - c[0], p[1] - c[1], p[2] - c[2]]);
  }
  function minGap(conf) {
    let m = Infinity;
    for (let i = 0; i < NA; i++) for (let j = i + 1; j < NA; j++) if (!bonded(i, j)) m = Math.min(m, dist3(conf[i], conf[j]));
    return m;
  }
  const ends = (conf) => Math.min(dist3(conf[8], conf[9]), dist3(conf[20], conf[21]), ...[0, 1, 2, 3].map((r) => dist3(conf[8 * r], conf[8 * r + 7])));
  let shapes = null, confC = null;
  for (let seed = 1; seed < 400 && !confC; seed++) {
    const R = rng(1825 + seed), sh = CHAINS.map(([a, b]) => walk(R, b - a)), conf = [];
    CHAINS.forEach((_, c) => sh[c].forEach((p) => conf.push(add(p, C_AT[c]))));
    const inBox = conf.every((p) => Math.abs(p[0]) < 1.9 && Math.abs(p[1]) < 0.9 && Math.abs(p[2]) < 0.9);
    if (inBox && minGap(conf) > 0.8 * BD && ends(conf) > 1.6 * BD) { shapes = sh; confC = conf; }
  }
  if (!confC) { shapes = CHAINS.map(([a, b]) => walk(rng(1826), b - a)); confC = []; CHAINS.forEach((_, c) => shapes[c].forEach((p) => confC.push(add(p, C_AT[c])))); }
  let confD = null;
  for (let t = 1; t < 400 && !confD; t++) {
    const R = rng(2300 + t), conf = [];
    CHAINS.forEach((_, c) => { const turn = [R() * 1.2 - 0.6, R() * TAU, R() * 1.2 - 0.6], at = C_AT[c].map((x) => x * 0.42 + (R() - 0.5) * 0.2); shapes[c].forEach((p) => conf.push(add(rot(p, turn), at))); });
    if (minGap(conf) > 0.68 * BD && ends(conf) > 1.5 * BD) confD = conf;
  }
  if (!confD) confD = confC.map((p) => p.map((x) => x * 0.6));
  const CONF = [confA, confB, confC, confD];
  const stage = (T) => Math.min(3, Math.max(0, (3 * (T - 113)) / (230 - 113)));
  const liquid = (T) => (T < 171 ? F.mixColor(F.fact(STRAW), F.fact(AMBER), smooth(113, 171, T)) : F.mixColor(F.fact(AMBER), F.fact(DARK), smooth(171, 230, T)));
  let sig = '', atomM = [], endM = [], pairM = [];
  function build() {
    const key = palSig(['S']); if (key === sig || !grp) return; sig = key;
    v.clear();
    atomM = confA.map((p) => v.pickable(F.mesh.sphere(grp, p, 0.13, F.el('S')), 'a sulfur atom, S, bonded to two neighbors'));
    endM = confA.map((p) => v.pickable(F.mesh.sphere(grp, [0, -99, 0], 0.16, PAL.panel, { transparent: true, opacity: 0, depthWrite: false }), 'a sulfur atom at the end of a chain, bonded to one neighbor: such dangling atoms absorb light differently and color the liquid dark red'));
    pairM = PAIRS.map(() => v.pickable(F.mesh.stick(grp, [0, 0, 0], [1, 0, 0], 0.045, PAL.muted), 'an S–S single bond'));
  }
  const HEAD = [
    (T) => `At ${T} °C the straw-colored liquid is quite mobile: its S₈ molecules are crowns that move past one another.`,
    (T) => `At ${T} °C S–S bonds in the rings break, and the rings open into S₈ chains.`,
    (T) => `At ${T} °C the chains combine end to end into longer chains, and the liquid darkens.`,
    (T) => `At ${T} °C the long chains tangle with one another, and the dark red liquid does not pour easily.`,
  ];
  const WORDS = ['\\text{S}_{8}\\text{ rings; a mobile liquid}', '\\text{S}_{8}\\text{ chains}', '\\text{longer chains; the liquid darkens}', '\\text{long, tangled chains; so viscous it does not pour}'];
  function draw() {
    build();
    const T = Tsl.v, s = stage(T), i = Math.min(2, Math.floor(s)), k = F.ease.smooth(s - i), near = Math.round(s);
    if (grp && atomM.length) {
      const P = CONF[i].map((p, n) => lerp3(p, CONF[i + 1][n], k));
      atomM.forEach((m, n) => m.position.set(...P[n]));
      const on = PAIRS.map(([a, b]) => dist3(P[a], P[b]) < 1.25 * BD);
      PAIRS.forEach(([a, b], n) => { F.mesh.setStick(pairM[n], P[a], P[b]); pairM[n].visible = on[n]; });
      const deg = P.map(() => 0); PAIRS.forEach(([a, b], n) => { if (on[n]) { deg[a]++; deg[b]++; } });
      endM.forEach((m, n) => m.position.set(...(deg[n] === 1 ? P[n] : [0, -99, 0])));
      v.headline(HEAD[near](T));
      v.invalidate();
    }
    const { ctx } = begin(c2);
    /* temperature axis 100 to 260 °C by 20 */
    const x0 = 170, x1 = 1150, y = 112, X = (t) => x0 + ((t - 100) / 160) * (x1 - x0);
    for (let t = 114; t <= 260; t += 2) { ctx.fillStyle = liquid(t); ctx.fillRect(X(t - 1), y - 26, X(t + 1) - X(t - 1) + 0.6, 26); }
    line(ctx, x0, y, x1, y, PAL.ink, 2);
    for (let t = 100; t <= 260; t += 20) { line(ctx, X(t), y, X(t), y + 8, PAL.ink, 2); if (Math.abs(t - T) > 12) text(ctx, String(t), X(t), y + 24, PAL.muted, { size: 17, align: 'center' }); }
    text(ctx, 'T (°C)', x1 + 14, y - 13, F.C('temperature'), { size: 17, weight: 600 });
    [[113, 'melts, 113 °C'], [230, 'does not pour easily, 230 °C']].forEach(([t, s2]) => {
      line(ctx, X(t), y - 64, X(t), y - 26, alpha(PAL.ink, 0.45), 2, [4, 6]);
      text(ctx, s2, X(t) + (t === 230 ? -8 : 8), y - 74, PAL.muted, { size: 17, align: t === 230 ? 'right' : 'left' });
    });
    text(ctx, 'liquid sulfur', x0 - 18, y - 13, PAL.muted, { size: 17, align: 'right' });
    const px = X(T);
    ctx.save(); ctx.fillStyle = F.C('temperature'); ctx.beginPath(); ctx.moveTo(px, y + 4); ctx.lineTo(px - 10, y + 40); ctx.lineTo(px + 10, y + 40); ctx.closePath(); ctx.fill(); ctx.restore();
    text(ctx, `${T} °C`, px, y + 58, F.C('temperature'), { size: 20, weight: 600, align: 'center' });
    /* a vial of the liquid at this temperature */
    const vx = 1290, vy = 46, vw = 46, vh = 112;
    ctx.save(); ctx.fillStyle = liquid(T); ctx.beginPath(); ctx.moveTo(vx, vy + 30); ctx.lineTo(vx, vy + vh - vw / 2); ctx.arc(vx + vw / 2, vy + vh - vw / 2, vw / 2, Math.PI, 0, true); ctx.lineTo(vx + vw, vy + 30); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(vx, vy); ctx.lineTo(vx, vy + vh - vw / 2); ctx.arc(vx + vw / 2, vy + vh - vw / 2, vw / 2, Math.PI, 0, true); ctx.lineTo(vx + vw, vy); ctx.stroke(); ctx.restore();
    readout(d.readout, `\\kT = ${degC(T)}:\\ ${WORDS[near]}`);
  }
  still(d, draw);
})();
};
