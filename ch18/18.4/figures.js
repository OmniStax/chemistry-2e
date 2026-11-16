/* Figures for section 18.4 Structure and General Properties of the Nonmetals. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['18.4'] = function (root, F) {
const { el, tex, PAL, alpha, ctl, register, begin, line, text } = F;
const sim = (id, H) => F.sim(root, id, H);
const still = (d, draw) => register(d.fig, { update: () => {}, draw });
const TAU = 2 * Math.PI, R3 = Math.sqrt(3);
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;
const degC = (x) => hue('temperature', `${x}\\ ^\\circ\\text{C}`);
const dist3 = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
const lerp3 = (a, b, k) => [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k];
const clamp01 = (x) => Math.min(1, Math.max(0, x));
const smooth = (a, b, x) => { const t = clamp01((x - a) / (b - a)); return t * t * (3 - 2 * t); };
const palSig = (els, more = []) => [PAL.ink, PAL.panel, PAL.muted, ...els.map((e) => F.el(e)), ...more].join('|');

/* =====================================================================
   FIGURE 18.19: the common oxidation states of the nonmetals on one
   scale, each state beside a compound that shows it. The band behind
   a group runs from every valence electron lost (group number − 10)
   down to a filled valence shell (group number − 18), so the bands
   climb one step a group and every state sits inside its band. Still:
   a chart with no variable the text varies.
===================================================================== */
(function () {
  const d = sim('fig-oxidation-states', 660);
  const COLS = [
    { g: 0, head: 'H', name: 'hydrogen', s: [[1, 'HCl'], [-1, 'NaH']] },
    { g: 1, head: 'C', name: 'carbon', run: true, s: [[4, 'CO₂'], [3, ''], [2, 'CO'], [1, ''], [0, 'CH₂O'], [-1, 'C₂H₂'], [-2, 'C₂H₄'], [-3, 'C₂H₆'], [-4, 'CH₄']] },
    { g: 2, head: 'N', name: 'nitrogen', run: true, s: [[5, 'HNO₃'], [4, 'NO₂'], [3, 'HNO₂'], [2, 'NO'], [1, 'N₂O'], [0, ''], [-1, ''], [-2, 'N₂H₄'], [-3, 'NH₃']] },
    { g: 2, head: 'P, As', name: 'phosphorus and arsenic', s: [[5, 'H₃PO₄'], [3, 'H₃PO₃'], [-3, 'PH₃']] },
    { g: 3, head: 'O', name: 'oxygen', s: [[-1, 'H₂O₂'], [-2, 'H₂O']] },
    { g: 3, head: 'S, Se', name: 'sulfur and selenium', s: [[6, 'H₂SO₄'], [4, 'SO₂'], [-2, 'H₂S']] },
    { g: 4, head: 'F', name: 'fluorine', s: [[-1, 'HF']] },
    { g: 4, head: 'Cl, Br, I', name: 'chlorine, bromine and iodine', s: [[7, 'HClO₄'], [5, 'HClO₃'], [3, 'HClO₂'], [1, 'HClO'], [-1, 'HCl']] },
    { g: 5, head: 'Xe', name: 'xenon', s: [[8, 'XeO₆⁴⁻'], [6, 'XeF₆'], [4, 'XeF₄'], [2, 'XeF₂']] },
  ];
  /* the periodic group of each block and the window of states its valence shell allows */
  const GROUPS = [{ n: 1, hi: 1, lo: -1 }, ...[14, 15, 16, 17, 18].map((n) => ({ n, hi: n - 10, lo: n - 18 }))];
  const st = (s) => (s > 0 ? `${s}+` : s < 0 ? `${-s}−` : '0');
  const T = 152, B = 612, L = 172, R = 1384, GAP = 16, STEP = (B - T) / 12;
  const Y = (s) => T + (8 - s) * STEP;
  const W = (R - L - 5 * GAP) / COLS.length;
  const X0 = (i) => L + i * W + COLS[i].g * GAP;
  const hits = []; F.hover(d.stage, () => hits);
  still(d, () => {
    const { ctx } = begin(d.c); hits.length = 0;
    for (let s = 8; s >= -4; s--) {
      line(ctx, L, Y(s), R, Y(s), alpha(PAL.ink, s === 0 ? 0.45 : 0.1), s === 0 ? 2 : 1.5);
      text(ctx, st(s), L - 20, Y(s), s === 0 ? PAL.ink : PAL.muted, { size: 18, align: 'right' });
    }
    text(ctx, 'oxidation state', L - 20, T - 50, PAL.muted, { size: 17, align: 'right' });
    GROUPS.forEach((G, g) => {
      const mine = COLS.map((c, i) => [c, i]).filter(([c]) => c.g === g);
      const x0 = X0(mine[0][1]), x1 = X0(mine[mine.length - 1][1]) + W;
      ctx.fillStyle = alpha(PAL.ink, 0.07); ctx.fillRect(x0, Y(G.hi) - STEP / 2, x1 - x0, (G.hi - G.lo + 1) * STEP);
      text(ctx, `group ${G.n}`, (x0 + x1) / 2, T - 88, PAL.muted, { size: 17, align: 'center' });
      hits.push({ x: (x0 + x1) / 2, y: T - 88, r: 30, name: `group ${G.n}: states from ${st(G.hi)}, every valence electron lost, down to ${st(G.lo)}, the valence shell filled` });
    });
    COLS.forEach((c, i) => {
      const x = X0(i) + 24;
      text(ctx, c.head, X0(i) + W / 2, T - 50, PAL.ink, { size: 22, weight: 600, align: 'center' });
      if (c.run) line(ctx, x, Y(c.s[0][0]), x, Y(c.s[c.s.length - 1][0]), alpha(PAL.ink, 0.3), 8);
      c.s.forEach(([s, f], n) => {
        const end = !c.run || n === 0 || n === c.s.length - 1;
        F.dot(ctx, x, Y(s), PAL.ink, true, end ? 8 : 5);
        if (f) text(ctx, f, x + 18, Y(s), end ? PAL.ink : PAL.muted, { size: end ? 19 : 17 });
        hits.push({ x, y: Y(s), r: 12, name: f ? `${c.name}: ${st(s)}, as in ${f}` : `${c.name}: ${st(s)}` });
      });
    });
    F.legend(ctx, { l: L, r: R, t: T - STEP / 2, b: B }, [{ kind: 'swatch', color: alpha(PAL.ink, 0.22), s: 'from every valence electron lost down to a filled valence shell' }], { corner: 'tl', panel: false, size: 18 });
  });
})();

/* =====================================================================
   FIGURE 18.20 + 18.22 + 18.23: the allotropes of carbon to turn. In
   each form one atom and the atoms bonded to it are drawn large with
   their bonds in ink: four in diamond, three in every other form. The
   middle layer of graphite is the graphene sheet (choosing graphene
   draws the outer layers away) and the nanotube is that sheet rolled
   about its long axis. Diamond and C60 have no counterpart and
   crossfade. Still: a form is a discrete state. No ground; pitch
   bounded to ±1.3 rad; an idle spin, since the depth of a lattice
   reads from its turning.
===================================================================== */
(function () {
  const d = sim('sim-carbon');
  const v = F.view3d(d.stage, { spin: 'idle', pitch: [-1.3, 1.3], tilt: 0.34, h: 600, dist: 6.1 });
  const grp = v.part(0); if (grp) grp.position.y = -0.18;
  const A = 0.3, NC = 8, NR = 10, PER = R3 * A, Wd = NC * PER, RT = Wd / TAU, GAP = 0.71, RA = 0.075, RB = 0.028, RAH = 0.125, RBH = 0.055;
  /* the sheet in its own plane: w runs round the tube (period Wd), u along it */
  const flat = [];
  for (let j = 0; j < NR; j++) for (let i = 0; i < NC; i++) { const w = ((i + j / 2) * PER) % Wd; flat.push([w, j * 1.5 * A], [w, j * 1.5 * A + A]); }
  const uMid = ((NR - 1) * 1.5 * A + A) / 2;
  flat.forEach((p) => { p[0] -= Wd / 2; p[1] -= uMid; });
  const idx = (i, j, b) => 2 * (j * NC + (((i % NC) + NC) % NC)) + b;
  const sheetBonds = [];
  for (let j = 0; j < NR; j++) for (let i = 0; i < NC; i++) {
    sheetBonds.push([idx(i, j, 0), idx(i, j, 1)]);
    if (j + 1 < NR) sheetBonds.push([idx(i, j, 1), idx(i, j + 1, 0)], [idx(i, j, 1), idx(i - 1, j + 1, 0)]);
  }
  const wraps = sheetBonds.map(([a, b]) => Math.abs(flat[a][0] - flat[b][0]) > Wd / 2);
  /* the sheet lies flat in the xz plane and rolls downward about the x axis, so its middle stays on top */
  const roll = (p, k) => {
    if (k < 1e-3) return [p[1], 0, p[0]];
    const Rk = RT / k, th = p[0] / Rk;
    return [p[1], Rk * Math.cos(th) - Rk + RT * k, Rk * Math.sin(th)];
  };
  const nbrs = (bonds, i) => bonds.filter((b) => b.includes(i)).map((b) => (b[0] === i ? b[1] : b[0]));
  /* the atom nearest the middle of the sheet, and its three neighbours */
  let hubS = 0; flat.forEach((p, i) => { if (Math.hypot(...p) < Math.hypot(...flat[hubS])) hubS = i; });
  const nearS = new Set([hubS, ...sheetBonds.filter((b, i) => !wraps[i] && b.includes(hubS)).map((b) => (b[0] === hubS ? b[1] : b[0]))]);
  /* diamond: two cubic cells each way of the face-centred lattice with its tetrahedral basis, edge 1 */
  const DA = 1.0, FCC = [[0, 0, 0], [0.5, 0.5, 0], [0.5, 0, 0.5], [0, 0.5, 0.5]], BAS = [[0, 0, 0], [0.25, 0.25, 0.25]];
  const dia = [];
  for (let i = -1; i <= 2; i++) for (let j = -1; j <= 2; j++) for (let k = -1; k <= 2; k++) FCC.forEach((f) => BAS.forEach((b) => {
    const p = [i + f[0] + b[0], j + f[1] + b[1], k + f[2] + b[2]];
    if (p.every((x) => x > -1e-6 && x < 2 + 1e-6)) dia.push(p.map((x) => (x - 1) * DA));
  }));
  const DB = (R3 / 4) * DA, diaBonds = [];
  for (let i = 0; i < dia.length; i++) for (let j = i + 1; j < dia.length; j++) if (Math.abs(dist3(dia[i], dia[j]) - DB) < 0.01) diaBonds.push([i, j]);
  const keep = dia.map((_, i) => nbrs(diaBonds, i).length >= 2);
  let hubD = -1, bd = 1e9; dia.forEach((p, i) => { const r = Math.hypot(...p); if (keep[i] && nbrs(diaBonds, i).length === 4 && r < bd) { bd = r; hubD = i; } });
  const nearD = new Set([hubD, ...nbrs(diaBonds, hubD)]);
  /* C60 from the icosahedron's three generating points, edge 0.5 */
  const AB = 0.5, phi = (1 + Math.sqrt(5)) / 2, bucky = [];
  [[0, 1, 3 * phi], [1, 2 + phi, 2 * phi], [phi, 2, phi * phi * phi]].forEach((b) => [0, 1, 2].forEach((rot) => {
    const q = [b[rot], b[(rot + 1) % 3], b[(rot + 2) % 3]];
    for (let m = 0; m < 8; m++) { const p = q.map((x, n) => ((m >> n) & 1 ? -x : x)); if (!bucky.some((r) => dist3(r, p) < 1e-6)) bucky.push(p); }
  }));
  const bp = bucky.map((p) => p.map((x) => (x * AB) / 2)), bb = [];
  for (let i = 0; i < bp.length; i++) for (let j = i + 1; j < bp.length; j++) if (Math.abs(dist3(bp[i], bp[j]) - AB) < 0.01) bb.push([i, j]);
  let hubB = 0; bp.forEach((p, i) => { if (p[2] + p[1] > bp[hubB][2] + bp[hubB][1]) hubB = i; });
  const nearB = new Set([hubB, ...nbrs(bb, hubB)]);
  const FORM = F.choice(d.controls, { label: '\\text{form}', options: [{ value: 'diamond', label: 'diamond' }, { value: 'graphite', label: 'graphite' }, { value: 'graphene', label: 'graphene' }, { value: 'tube', label: 'nanotube' }, { value: 'ball', label: 'C<sub>60</sub>' }], value: 'diamond', aria: 'the form of carbon' });
  const NAME = {
    diamond: 'a carbon atom of diamond, bonded to four others', sheet: 'a carbon atom, bonded to three others in a six-membered ring',
    layer: 'a carbon atom of another graphite layer', ball: 'a carbon atom of C₆₀, bonded to three others',
    single: 'a C–C single bond', sp2: 'a C–C bond: a σ bond, with a share of the π bonding',
  };
  let sig = '', sheet, sMesh = [], sBond = [], upper, lower, diaG, ballG;
  /* one atom and its neighbours large, their bonds thick and in ink; the rest of the lattice fine */
  const atom = (g, p, hot, name) => v.pickable(F.mesh.sphere(g, p, hot ? RAH : RA, F.el('C')), name);
  const bond = (g, a, b, hot, name) => v.pickable(F.mesh.stick(g, a, b, hot ? RBH : RB, hot ? PAL.ink : PAL.muted), name);
  function build() {
    const key = palSig(['C']); if (key === sig || !grp) return; sig = key;
    v.clear(); const T3 = window.THREE;
    sheet = new T3.Group(); upper = new T3.Group(); lower = new T3.Group(); diaG = new T3.Group(); ballG = new T3.Group();
    grp.add(sheet, upper, lower, diaG, ballG);
    sMesh = flat.map((p, i) => atom(sheet, roll(p, 0), nearS.has(i), NAME.sheet));
    sBond = sheetBonds.map(([a, b]) => bond(sheet, roll(flat[a], 0), roll(flat[b], 0), a === hubS || b === hubS, NAME.sp2));
    [upper, lower].forEach((g) => {
      /* the neighbouring layers are shifted by one bond length, as graphite stacks */
      const pts = flat.map((p) => [p[0], p[1] + A]);
      const on = (p) => Math.abs(p[1]) <= uMid + 1e-6;
      const top = g === upper;
      pts.forEach((p, i) => { if (on(p)) atom(g, roll(p, 0), top && nearS.has(i), NAME.layer); });
      sheetBonds.forEach(([a, b], i) => { if (!wraps[i] && on(pts[a]) && on(pts[b])) bond(g, roll(pts[a], 0), roll(pts[b], 0), top && (a === hubS || b === hubS), NAME.sp2); });
    });
    dia.forEach((p, i) => { if (keep[i]) atom(diaG, p, nearD.has(i), NAME.diamond); });
    diaBonds.forEach(([i, j]) => { if (keep[i] && keep[j]) bond(diaG, dia[i], dia[j], i === hubD || j === hubD, NAME.single); });
    bp.forEach((p, i) => atom(ballG, p, nearB.has(i), NAME.ball));
    bb.forEach(([i, j]) => bond(ballG, bp[i], bp[j], i === hubB || j === hubB, NAME.sp2));
  }
  const HEAD = {
    diamond: 'In diamond each carbon atom bonds to four others at the corners of a tetrahedron, and the network runs on in every direction.',
    graphite: 'In graphite each carbon atom bonds to three others in a flat layer, and only weak London forces hold the layers together.',
    graphene: 'Graphene is a single layer of graphite, one atom thick.',
    tube: 'A carbon nanotube is the same layer of six-membered rings rolled into a tube.',
    ball: 'C₆₀, buckminsterfullerene, is a closed cage of 60 carbon atoms, each bonded to three others.',
  };
  const RO = {
    diamond: `\\text{4 single bonds per atom }(sp^{3})\\text{ in a 3D network} \\;\\to\\; \\text{very hard, melts at }{\\sim}${degC(4400)}`,
    graphite: '\\text{3 }\\sigma\\text{ bonds per atom }(sp^{2})\\text{ and }\\pi\\text{ bonds in a layer} \\;\\to\\; \\text{soft, slippery, conducts}',
    graphene: '\\text{3 }\\sigma\\text{ bonds per atom }(sp^{2})\\text{, one layer, no stacking} \\;\\to\\; \\text{very strong, conducts}',
    tube: '\\text{3 }\\sigma\\text{ bonds per atom }(sp^{2})\\text{, the layer closed on itself} \\;\\to\\; \\text{harder than diamond}',
    ball: '\\text{3 }\\sigma\\text{ bonds per atom, 60 atoms in an icosahedral molecule}',
  };
  /* each form is scaled to fill the stage */
  const SC = { diamond: 1.0, graphite: 0.95, graphene: 1.15, tube: 1.3, ball: 1.05 };
  function draw() {
    build(); if (!grp || !sheet) return;
    const kStack = FORM.mix((f) => (f === 'graphite' ? 1 : 0)), kRoll = FORM.mix((f) => (f === 'tube' ? 1 : 0));
    const P = flat.map((p) => roll(p, kRoll));
    sMesh.forEach((m, i) => m.position.set(P[i][0], P[i][1], P[i][2]));
    sBond.forEach((m, i) => { F.mesh.setStick(m, P[sheetBonds[i][0]], P[sheetBonds[i][1]]); m.visible = !wraps[i] || kRoll > 0.98; });
    upper.position.y = GAP + (1 - kStack) * 1.4; lower.position.y = -GAP - (1 - kStack) * 1.4;
    F.fade3(upper, kStack); F.fade3(lower, kStack);
    F.fade3(sheet, FORM.mix((f) => (f === 'diamond' || f === 'ball' ? 0 : 1)));
    F.fade3(diaG, FORM.mix((f) => (f === 'diamond' ? 1 : 0)));
    F.fade3(ballG, FORM.mix((f) => (f === 'ball' ? 1 : 0)));
    grp.scale.setScalar(FORM.mix((f) => SC[f]));
    v.headline(HEAD[FORM.value]);
    v.invalidate();
    tex(d.readout, RO[FORM.value]);
  }
  still(d, draw);
})();

/* =====================================================================
   FIGURE 18.21: a patch of one graphite layer with the unhybridized p
   orbital of every atom, to turn. In a resonance form each p orbital
   overlaps one neighbour side by side: a π bond, drawn as the band that
   joins two lobes above the layer and two below, with the second line
   of the double bond beside the σ bond. The two forms pair the same
   orbitals with different neighbours; in the hybrid every orbital
   overlaps all three, and the π electrons run over the whole layer.
   Still: three discrete states. Pitch bounded to ±1.3 rad, no spin.
===================================================================== */
(function () {
  const d = sim('fig-graphite-orbitals');
  const v = F.view3d(d.stage, { spin: 'off', pitch: [-1.3, 1.3], tilt: 0.52, h: 600, dist: 8.4 });
  v.setView(-0.32, 0.52);
  const grp = v.part(0); if (grp) grp.position.y = -0.25;
  /* three rings by two of the honeycomb, bond length 1: 22 atoms */
  const at = [];
  for (let j = 0; j < 2; j++) for (let i = 0; i < 3; i++) for (let k = 0; k < 6; k++) {
    const p = [i * R3 + (j * R3) / 2 + Math.sin((k * Math.PI) / 3), j * 1.5 + Math.cos((k * Math.PI) / 3)];
    if (!at.some((q) => Math.hypot(q[0] - p[0], q[1] - p[1]) < 1e-6)) at.push(p);
  }
  const cx = at.reduce((s, p) => s + p[0], 0) / at.length, cz = at.reduce((s, p) => s + p[1], 0) / at.length;
  const P = at.map((p) => [p[0] - cx, 0, p[1] - cz]);
  const bonds = [];
  for (let i = 0; i < P.length; i++) for (let j = i + 1; j < P.length; j++) if (Math.abs(dist3(P[i], P[j]) - 1) < 1e-6) bonds.push([i, j]);
  /* where the layer runs on: a short stub toward each neighbour the patch leaves out */
  const stubs = [];
  P.forEach((p, i) => {
    const mine = bonds.filter((b) => b.includes(i)).map((b) => { const q = P[b[0] === i ? b[1] : b[0]]; return Math.atan2(q[2] - p[2], q[0] - p[0]); });
    for (let n = 0; n < 3; n++) { const a = mine[0] + (n * TAU) / 3; if (!mine.some((m) => Math.abs(Math.atan2(Math.sin(m - a), Math.cos(m - a))) < 0.1)) stubs.push([p, [p[0] + 0.5 * Math.cos(a), 0, p[2] + 0.5 * Math.sin(a)]]); }
  });
  /* the two resonance forms: the two ways of pairing every atom with one neighbour that share the fewest bonds */
  const forms = [];
  (function pair(used, set) {
    const i = used.indexOf(false); if (i < 0) { forms.push(set.slice()); return; }
    bonds.forEach((b, n) => { if (b[0] !== i || used[b[1]]) return; used[i] = used[b[1]] = true; set.push(n); pair(used, set); set.pop(); used[i] = used[b[1]] = false; });
  })(P.map(() => false), []);
  let M1 = forms[0], M2 = forms[1], shared = Infinity;
  forms.forEach((a, x) => forms.forEach((b, y) => { if (y <= x) return; const s = a.filter((n) => b.includes(n)).length; if (s < shared) { shared = s; M1 = a; M2 = b; } }));
  const FORM = F.choice(d.controls, { label: '\\pi\\text{ bonding}', options: [{ value: 'a', label: 'resonance form 1' }, { value: 'b', label: 'resonance form 2' }, { value: 'hybrid', label: 'resonance hybrid' }], value: 'a', aria: 'how the p orbitals are paired' });
  const HP = 0.56, RP = 0.2;
  let sig = '', gA, gB, gH;
  function build() {
    const up = F.cat(0), down = F.cat(1);
    const key = palSig(['C'], [up, down]); if (key === sig || !grp) return; sig = key;
    v.clear(); const T3 = window.THREE;
    gA = new T3.Group(); gB = new T3.Group(); gH = new T3.Group(); grp.add(gA, gB, gH);
    P.forEach((p) => {
      v.pickable(F.mesh.sphere(grp, p, 0.17, F.el('C')), 'a carbon atom, sp² hybridized, bonded to three others in the layer');
      v.pickable(F.mesh.lobe(grp, p, [0, 1, 0], 0.95, up), 'one lobe of an unhybridized p orbital, above the layer');
      v.pickable(F.mesh.lobe(grp, p, [0, -1, 0], 0.95, down), 'the other lobe of the p orbital, below the layer');
    });
    bonds.forEach(([i, j]) => v.pickable(F.mesh.stick(grp, P[i], P[j], 0.05, PAL.muted), 'a σ bond between two sp² hybrid orbitals'));
    stubs.forEach(([a, b]) => v.pickable(F.mesh.stick(grp, a, b, 0.05, PAL.muted, { transparent: true, opacity: 0.45 }), 'a σ bond to the next atom of the layer'));
    /* the band of a π bond over the bond i–j, at height ±HP, and the double bond's second line in the plane */
    const band = (g, i, j, r, name) => [[HP, up], [-HP, down]].forEach(([y, c]) => {
      const a = [P[i][0], y, P[i][2]], b = [P[j][0], y, P[j][2]], m = { transparent: true, opacity: 0.55, depthWrite: false };
      v.pickable(F.mesh.stick(g, a, b, r, c, m), name);
    });
    const second = (g, i, j) => {
      const dx = P[j][0] - P[i][0], dz = P[j][2] - P[i][2], o = [-dz * 0.17, 0, dx * 0.17], s = 0.16;
      const a = [P[i][0] + dx * s + o[0], 0, P[i][2] + dz * s + o[2]], b = [P[j][0] - dx * s + o[0], 0, P[j][2] - dz * s + o[2]];
      v.pickable(F.mesh.stick(g, a, b, 0.04, PAL.ink), 'the second line of a double bond: the π bond');
    };
    M1.forEach((n) => { band(gA, ...bonds[n], RP, 'a π bond: two p orbitals overlapping side by side'); second(gA, ...bonds[n]); });
    M2.forEach((n) => { band(gB, ...bonds[n], RP, 'a π bond: two p orbitals overlapping side by side'); second(gB, ...bonds[n]); });
    bonds.forEach(([i, j]) => band(gH, i, j, RP * 0.8, 'π electrons shared by the whole layer'));
    v.label('p orbital', [P[0][0], 1.02, P[0][2]], grp, 6);
  }
  const HEAD = {
    a: 'Each p orbital stands square to the layer and overlaps one neighbor side by side: a π bond.',
    b: 'The same p orbitals can pair with other neighbors: a second resonance form.',
    hybrid: 'In the hybrid every p orbital overlaps all three neighbors, and the π electrons spread over the whole layer.',
  };
  const n = P.length;
  function draw() {
    build(); if (!grp || !gA) return;
    F.fade3(gA, FORM.mix((f) => (f === 'a' ? 1 : 0)));
    F.fade3(gB, FORM.mix((f) => (f === 'b' ? 1 : 0)));
    F.fade3(gH, FORM.mix((f) => (f === 'hybrid' ? 1 : 0)));
    v.headline(HEAD[FORM.value]);
    v.invalidate();
    tex(d.readout, FORM.value === 'hybrid'
      ? `${n}\\ p\\text{ orbitals} \\;\\to\\; ${n}\\ \\pi\\text{ electrons free to move through the layer}`
      : `${n}\\ p\\text{ orbitals} \\;\\to\\; ${n / 2}\\ \\pi\\text{ bonds, each between two atoms}`);
  }
  still(d, draw);
})();

/* =====================================================================
   FIGURE 18.24: white phosphorus as separate P4 molecules and red
   phosphorus as P4 tetrahedra joined by P–P single bonds. Five
   molecules: in the red form each opens the bond between its two front
   base atoms, and those atoms bond to the neighbouring tetrahedra, so
   every atom keeps three bonds; the new bonds are in ink, and the chain
   runs on past its ends as the book's stubs show. The choice eases each
   molecule into line. Still: two allotropes are two states. No ground;
   yaw bounded to ±0.9 rad so the chain is never seen end-on.
===================================================================== */
(function () {
  const d = sim('sim-phosphorus');
  const v = F.view3d(d.stage, { spin: 'off', pitch: [-1.0, 1.0], yaw: [-0.9, 0.9], tilt: 0.3, h: 400, dist: 4.25 });
  const grp = v.part(0); if (grp) grp.position.y = -0.16;
  const E = 0.6, H = E * Math.sqrt(2 / 3), OPEN = 1.35, SP = OPEN * E + E, N = 5;
  /* a tetrahedron, base in the xz plane, a and b at the front, apex up; s spreads a and b to OPEN × E */
  const tet = (s) => { const half = (E / 2) * (1 + (OPEN - 1) * s); return [[-half, -H / 3, E / (2 * R3)], [half, -H / 3, E / (2 * R3)], [0, -H / 3, -E / R3], [0, (2 * H) / 3, 0]]; };
  const EDGES = [[0, 2], [0, 3], [1, 2], [1, 3], [2, 3]];
  const T3 = window.THREE;
  /* the molecules of the white form: where each floats, and how it is turned */
  const WHITE = [[-2.85, 0.3, 0.2, 0.9, 0.4, 0.2], [-1.45, -0.42, -0.3, 2.1, 1.3, 0.5], [0, 0.34, 0.25, 0.3, 2.4, 1.1], [1.45, -0.4, -0.2, 1.5, 0.7, 2.6], [2.85, 0.28, 0.2, 2.6, 0.2, 1.7]];
  const qW = T3 ? WHITE.map(([, , , a, b, c]) => new T3.Quaternion().setFromEuler(new T3.Euler(a, b, c))) : [];
  const FORM = F.choice(d.controls, { label: '\\text{form}', options: [{ value: 'white', label: 'white phosphorus' }, { value: 'red', label: 'red phosphorus' }], value: 'white', aria: 'the allotrope of phosphorus' });
  let sig = '', atoms = [], sticks = [], ab = [], links = [], stubs = [], gOpen, gLink, labW, labR;
  function build() {
    const key = palSig(['P']); if (key === sig || !grp) return; sig = key;
    v.clear(); gOpen = new T3.Group(); gLink = new T3.Group(); grp.add(gOpen, gLink);
    atoms = []; sticks = []; ab = []; links = []; stubs = [];
    for (let m = 0; m < N; m++) {
      atoms.push([0, 1, 2, 3].map(() => v.pickable(F.mesh.sphere(grp, [0, 0, 0], 0.16, F.el('P')), 'a phosphorus atom, P, bonded to three other P atoms')));
      sticks.push(EDGES.map(() => v.pickable(F.mesh.stick(grp, [0, 0, 0], [1, 0, 0], 0.05, PAL.muted), 'a P–P single bond within a tetrahedron')));
      ab.push(v.pickable(F.mesh.stick(gOpen, [0, 0, 0], [1, 0, 0], 0.05, PAL.muted), 'a P–P single bond, the one that opens on heating'));
      if (m + 1 < N) links.push(v.pickable(F.mesh.stick(gLink, [0, 0, 0], [1, 0, 0], 0.065, PAL.ink), 'a new P–P single bond joining two tetrahedra'));
    }
    stubs = [0, 1].map(() => v.pickable(F.mesh.stick(gLink, [0, 0, 0], [1, 0, 0], 0.065, PAL.ink), 'a P–P bond to the next tetrahedron of the network'));
    labW = v.label('a P₄ molecule', [0, 0, 0], grp, 8); labR = v.label('new P–P bond', [0, 0, 0], grp, 8);
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
    const mid = (N - 1) / 2, top = pos[mid].reduce((a, b) => (b[1] > a[1] ? b : a));
    v.move(labW, [top[0], top[1] + 0.2, top[2]]); v.move(labR, lerp3(pos[mid][1], pos[mid + 1][0], 0.5));
    labW.style.opacity = String(1 - smooth(0, 0.3, k)); labR.style.opacity = String(smooth(0.85, 1, k));
    v.headline(FORM.value === 'white' ? 'White phosphorus is separate P₄ molecules, each a tetrahedron of four atoms.' : 'In red phosphorus one bond of each tetrahedron has opened, and new P–P bonds join the tetrahedra.');
    v.invalidate();
    tex(d.readout, FORM.value === 'white'
      ? `\\text{separate P}_{4}\\text{ molecules} \\;\\to\\; \\text{melts at }${degC('44.2')}\\text{, very reactive}`
      : `\\text{P}_{4}\\text{ units bonded to one another} \\;\\to\\; \\text{melts at }{\\sim}${degC(600)}\\text{, much less reactive}`);
  }
  still(d, draw);
})();

/* =====================================================================
   FIGURE 18.25: liquid sulfur on a temperature slider, flat, so every
   atom is seen. Sixty-four atoms: eight S8 rings at the melting point.
   As the temperature rises the rings open one after another into S8
   chains, the chains join end to end into three long chains, and the
   long chains draw together and tangle (230 °C). Every bond keeps its
   length throughout: a molecule is laid out from the directions of its
   bonds, and those directions are what the temperature moves. The text
   gives no temperature between the melting point and 230 °C, so the
   rings begin to open near 150 °C, where liquid sulfur does begin to
   thicken. Beside the molecules the same liquid in a tube tipped a
   moment ago, in its own colour (straw to dark red, the fact): it runs
   out while it is rings and stays put when it is tangled chains.
   Still: positions are a function of temperature.
===================================================================== */
(function () {
  const d = sim('sim-sulfur', 620);
  const Tsl = ctl(d.controls, { label: '\\kT', cls: 'temperature', min: 113, max: 230, step: 1, value: 113, unit: '°C', dec: 0, aria: 'temperature of the liquid sulfur in degrees Celsius', specials: [{ at: 230, label: 'does not pour' }] });
  const STRAW = '#e3c75a', AMBER = '#d4892b', DARK = '#8c1d12';
  const BD = 46, ZZ = (37 * Math.PI) / 180, NS = 8;
  const BOX = { l: 40, r: 1000, t: 92, b: 552 }, KEY = { ...BOX, b: BOX.b - 28 };
  /* a molecule from the directions of its bonds, set down on its centroid c */
  const walk = (ds, c) => {
    const pts = [[0, 0]]; ds.forEach((a, i) => pts.push([pts[i][0] + BD * Math.cos(a), pts[i][1] + BD * Math.sin(a)]));
    const m = [0, 1].map((q) => pts.reduce((s, p) => s + p[q], 0) / pts.length);
    return pts.map((p) => [p[0] - m[0] + c[0], p[1] - m[1] + c[1]]);
  };
  const centroid = (pts) => [0, 1].map((q) => pts.reduce((s, p) => s + p[q], 0) / pts.length);
  /* a chain's bond directions: a heading that wanders, and the zigzag of the 106° bond angle on it */
  const dirs = (n, p) => Array.from({ length: n - 1 }, (_, j) => p.f0 + p.a1 * Math.sin((TAU * j) / p.p1 + p.q1) + p.a2 * Math.sin((TAU * j) / p.p2 + p.q2) + (j % 2 ? -ZZ : ZZ));
  /* the three long chains, of 24, 24 and 16 atoms: apart (the book's c), then drawn together and tangled (its d) */
  const CHAIN = [[0, 1, 2], [3, 4, 5], [6, 7]];
  const APART = [
    { f0: 0, a1: 0.95, p1: 12, q1: 0, a2: 0, p2: 5, q2: 0, c: [400, 205] },
    { f0: 0, a1: 0.95, p1: 12, q1: 3.14, a2: 0, p2: 5, q2: 0, c: [400, 445] },
    { f0: 1.5708, a1: 1.1, p1: 10, q1: 0.3, a2: 0, p2: 5, q2: 0, c: [880, 325] },
  ];
  const TANGLED = [
    { f0: 0.498, a1: 0.924, p1: 14.58, q1: 4.168, a2: 0.211, p2: 6.082, q2: 1.292, c: [407, 372] },
    { f0: -0.087, a1: 0.952, p1: 13.671, q1: 2.376, a2: 0.205, p2: 4.592, q2: 5.086, c: [457, 279] },
    { f0: 1.469, a1: 1.502, p1: 10.284, q1: 0.958, a2: 0.082, p2: 4.172, q2: 0.595, c: [565, 343] },
  ];
  const dC = CHAIN.map((segs, c) => dirs(8 * segs.length, APART[c])), pC = dC.map((ds, c) => walk(ds, APART[c].c));
  const dD = CHAIN.map((segs, c) => dirs(8 * segs.length, TANGLED[c]));
  /* each S8 unit: a ring at home, an S8 chain at home, and its stretch of the long chain */
  const HOME = [[160, 205], [400, 205], [640, 205], [160, 445], [400, 445], [640, 445], [880, 228], [880, 428]];
  const TILT = 0.55;
  const SEG = [];
  CHAIN.forEach((segs, c) => segs.forEach((g, k) => {
    const axis = APART[c].f0 + TILT;
    SEG[g] = {
      chain: c, k,
      ring: Array.from({ length: 7 }, (_, j) => axis + ((j - 3) * Math.PI) / 4),
      open: Array.from({ length: 7 }, (_, j) => axis + (j % 2 ? -ZZ : ZZ)),
      join: dC[c].slice(8 * k, 8 * k + 7), at: centroid(pC[c].slice(8 * k, 8 * k + 8)),
    };
  }));
  /* the temperature, °C, at which each ring opens and each S8 chain moves into its long chain; the text gives none */
  const T_OPEN = [150, 165, 180, 155, 170, 185, 160, 175], T_JOIN = [196, 196, 204, 199, 199, 207, 202, 202];
  const kOpen = (g, T) => smooth(T_OPEN[g] - 5, T_OPEN[g] + 5, T), kJoin = (g, T) => smooth(T_JOIN[g] - 5, T_JOIN[g] + 5, T);
  const kTangle = (T) => smooth(213, 230, T);
  const mix = (a, b, k) => a.map((x, i) => x + (b[i] - x) * k);
  /* every atom's place at temperature T, chain by chain, and the bonds that hold */
  function state(T) {
    const kt = kTangle(T);
    return CHAIN.map((segs, c) => {
      let pts;
      if (kt > 0) pts = walk(mix(dC[c], dD[c], kt), mix(APART[c].c, TANGLED[c].c, kt));
      else pts = segs.flatMap((g) => { const s = SEG[g], kj = kJoin(g, T), ko = kOpen(g, T); return kj > 0 ? walk(mix(s.open, s.join, kj), mix(HOME[g], s.at, kj)) : walk(mix(s.ring, s.open, ko), HOME[g]); });
      const near = (i, j) => Math.hypot(pts[i][0] - pts[j][0], pts[i][1] - pts[j][1]) < 1.2 * BD;
      const bonds = [], deg = pts.map(() => 0), chains = []; let rings = 0, cur = null;
      const tie = (i, j) => { bonds.push([i, j]); deg[i]++; deg[j]++; };
      segs.forEach((g, k) => {
        for (let j = 0; j < 7; j++) tie(8 * k + j, 8 * k + j + 1);
        cur = cur || { n: 0, ring: false }; cur.n += 8;
        if (near(8 * k, 8 * k + 7)) { tie(8 * k, 8 * k + 7); rings++; cur.ring = true; }
        if (k + 1 < segs.length && !cur.ring && near(8 * k + 7, 8 * k + 8)) tie(8 * k + 7, 8 * k + 8);
        else { if (!cur.ring) chains.push(cur.n); cur = null; }
      });
      return { pts, bonds, deg, rings, chains };
    });
  }
  const liquid = (T) => (T < 171 ? F.mixColor(F.fact(STRAW), F.fact(AMBER), smooth(113, 171, T)) : F.mixColor(F.fact(AMBER), F.fact(DARK), smooth(171, 230, T)));
  /* how freely the liquid runs: 1 while it is rings, almost 0 once the chains tangle */
  const mobility = (T) => 1 - 0.97 * smooth(150, 228, T);
  const hits = []; F.hover(d.stage, () => hits);
  const HEAD = [
    (T) => `At ${T} °C the liquid is S₈ rings that slip past one another, so it pours freely.`,
    (T) => `At ${T} °C S–S bonds break, and rings open into chains.`,
    (T) => `At ${T} °C the chains join end to end into longer chains, and the liquid thickens and darkens.`,
    (T) => `At ${T} °C the long chains tangle, and the dark red liquid does not pour easily.`,
  ];
  /* the tube: its closed end at (OX, OY), its axis tipped TIP below the level, LT long and RT in radius */
  const OX = 1072, OY = 232, TIP = 0.35, LT = 250, RT = 38, PLUG = 120;
  function tube(ctx, T) {
    const m = mobility(T), col = liquid(T);
    /* a moment after tipping: the front of the liquid has run a distance set by how freely it flows; past the mouth it pours */
    const Lf = PLUG + (LT - PLUG) * clamp01(m / 0.55), out = clamp01((m - 0.55) / 0.45) * 0.72, area = 2 * RT * PLUG * (1 - out);
    ctx.save(); ctx.translate(OX, OY); ctx.rotate(TIP);
    const glass = () => { ctx.beginPath(); ctx.moveTo(LT, -RT); ctx.lineTo(RT, -RT); ctx.arc(RT, 0, RT, -Math.PI / 2, Math.PI / 2, true); ctx.lineTo(LT, RT); };
    ctx.save(); glass(); ctx.closePath(); ctx.clip();
    ctx.fillStyle = col; ctx.beginPath();
    if (Lf <= 2 * PLUG) { const x1 = Math.max(0, 2 * PLUG - Lf); ctx.moveTo(0, -RT); ctx.lineTo(x1, -RT); ctx.lineTo(Lf, RT); ctx.lineTo(0, RT); }
    else { const v0 = RT - (2 * area) / Lf; ctx.moveTo(0, v0); ctx.lineTo(Lf, RT - (out > 0 ? 9 * out : 0)); ctx.lineTo(Lf, RT); ctx.lineTo(0, RT); }
    ctx.closePath(); ctx.fill(); ctx.restore();
    ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.lineJoin = 'round'; glass(); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(LT, -RT); ctx.lineTo(LT + 5, -RT - 7); ctx.moveTo(LT, RT); ctx.lineTo(LT + 5, RT + 7); ctx.stroke();
    ctx.restore();
    /* the lip, the stream and the beaker under it */
    const lip = [OX + LT * Math.cos(TIP) - RT * Math.sin(TIP), OY + LT * Math.sin(TIP) + RT * Math.cos(TIP)];
    const bx = lip[0] - 46, bw = 124, bb = 556, bh = 104, level = bb - 4 - out * 92;
    ctx.save();
    if (out > 0) {
      const w = 3 + 12 * out;
      ctx.strokeStyle = col; ctx.lineWidth = w; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(lip[0] - 2, lip[1] - 3);
      ctx.quadraticCurveTo(lip[0] + 16, lip[1] + 8, lip[0] + 18, lip[1] + 60); ctx.lineTo(lip[0] + 18, bb - 6); ctx.stroke();
      ctx.fillStyle = col; ctx.fillRect(bx + 3, level, bw - 6, bb - 3 - level);
    }
    ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.lineJoin = 'round'; ctx.lineCap = 'butt';
    ctx.beginPath(); ctx.moveTo(bx - 5, bb - bh - 4); ctx.lineTo(bx, bb - bh); ctx.lineTo(bx, bb); ctx.lineTo(bx + bw, bb); ctx.lineTo(bx + bw, bb - bh); ctx.lineTo(bx + bw + 5, bb - bh - 4); ctx.stroke();
    ctx.restore();
    text(ctx, 'the liquid, tipped', (OX + 1380) / 2 - 16, 122, PAL.muted, { size: 18, align: 'center' });
    hits.push({ x: OX + 110, y: OY + 44, r: 60, name: 'a test tube of liquid sulfur, tipped a moment ago' });
    hits.push({ x: bx + bw / 2, y: bb - 46, r: 56, name: out > 0 ? 'the liquid sulfur that has poured out' : 'a beaker, still empty: the liquid has not poured' });
  }
  function draw() {
    const { ctx } = begin(d.c); hits.length = 0;
    const T = Tsl.v, S = state(T);
    const rings = S.reduce((s, c) => s + c.rings, 0), chains = S.flatMap((c) => c.chains), longest = Math.max(0, ...chains);
    F.headline(ctx, HEAD[kTangle(T) > 0.5 ? 3 : longest > 8 ? 2 : chains.length ? 1 : 0](T));
    ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.035); ctx.strokeStyle = PAL.rule; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.roundRect(BOX.l, BOX.t, BOX.r - BOX.l, BOX.b - BOX.t, 10); ctx.fill(); ctx.stroke(); ctx.restore();
    const sulfur = F.el('S'), end = F.fact(DARK);
    S.forEach(({ pts, bonds, deg }) => {
      bonds.forEach(([i, j]) => line(ctx, pts[i][0], pts[i][1], pts[j][0], pts[j][1], PAL.panel, 15));
      bonds.forEach(([i, j]) => line(ctx, pts[i][0], pts[i][1], pts[j][0], pts[j][1], PAL.muted, 8));
      /* the crown's pucker: alternate atoms stand nearer and farther */
      [1, 0].forEach((nearer) => pts.forEach((p, i) => {
        if ((i % 2 === 0) !== !!nearer) return;
        const r = nearer ? 15 : 12.5;
        ctx.save(); ctx.beginPath(); ctx.arc(p[0], p[1], r, 0, TAU); ctx.fillStyle = sulfur; ctx.fill();
        ctx.lineWidth = deg[i] === 1 ? 5 : 1.5; ctx.strokeStyle = deg[i] === 1 ? end : alpha(PAL.ink, 0.6); ctx.stroke(); ctx.restore();
        hits.push({ x: p[0], y: p[1], r: r + 3, name: deg[i] === 1 ? 'the atom at the end of a chain, bonded to one neighbor: atoms like this color the liquid dark red' : 'a sulfur atom, S, bonded to two neighbors' });
      }));
    });
    F.legend(ctx, KEY, [
      { s: 'sulfur atom', draw: (c, x, y) => { c.save(); c.beginPath(); c.arc(x, y, 9, 0, TAU); c.fillStyle = sulfur; c.fill(); c.lineWidth = 1.5; c.strokeStyle = alpha(PAL.ink, 0.6); c.stroke(); c.restore(); } },
      { s: 'end of a chain', draw: (c, x, y) => { c.save(); c.beginPath(); c.arc(x, y, 9, 0, TAU); c.fillStyle = sulfur; c.fill(); c.lineWidth = 4; c.strokeStyle = end; c.stroke(); c.restore(); } },
    ], { corner: 'below', size: 17 });
    tube(ctx, T);
    const n = (k, one, many) => `${k}\\text{ ${k === 1 ? one : many}}`;
    const parts = [rings ? `${rings}\\ \\text{S}_{8}\\text{ ${rings === 1 ? 'ring' : 'rings'}}` : '', chains.length ? `${n(chains.length, 'chain', 'chains')}\\text{, the longest }${longest}\\text{ atoms}` : ''].filter(Boolean);
    tex(d.readout, `\\kT = ${degC(T)}:\\ ${parts.join('\\text{ and }')}`);
  }
  still(d, draw);
})();
};
