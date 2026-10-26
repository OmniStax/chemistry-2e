/* Figures for section 14.1 Brønsted-Lowry Acids and Bases. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['14.1'] = function (root, F) {
const { C, PAL, alpha, ctl, register, begin, line, text, headline } = F;
const sim = (id, H) => F.sim(root, id, H);
const still = (d, draw) => register(d.fig, { update: () => {}, draw });
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;
const TAU = 2 * Math.PI, RAD = Math.PI / 180;
const VIEWS = [{ value: '2d', label: '2D' }, { value: '3d', label: '3D' }];
const ACID = () => F.ref('pair-acid'), BASE = () => F.ref('pair-base');

/* an atom as a disc in its element's colour; hydrogen is light and takes an ink outline so that it reads on a light page */
function atom(ctx, x, y, sym, r) {
  ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fillStyle = F.el(sym); ctx.fill();
  ctx.lineWidth = sym === 'H' ? 2 : 1.5; ctx.strokeStyle = sym === 'H' ? PAL.ink : alpha(PAL.ink, 0.45); ctx.stroke(); ctx.restore();
}
/* the flat view and the scene behind one view choice: the stage mounts on the first switch and each hides the other */
function views(d, VIEW, mount, draw) {
  let v = null;
  return {
    get v() { return v; },
    show() {
      const three = VIEW.value === '3d';
      if (three && !v) v = mount();
      d.c.style.display = three ? 'none' : '';
      if (v) [v.wrap, d.stage.querySelector('.view3d-bar')].forEach((e) => { if (e) e.style.display = three ? '' : 'none'; });
      draw();
    },
  };
}

/* ---------- Lewis structures, flat, each atom in its pair's colour ----------
   atoms: [{ s, x, y, c, lp: [angles in degrees, 0 to the right, 90 up] }]; bonds: [[i, j, order, colour]] */
function lewis(ctx, atoms, bonds) {
  const gap = 19;
  bonds.forEach(([i, j, order, c]) => {
    const a = atoms[i], b = atoms[j], dx = b.x - a.x, dy = b.y - a.y, L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L;
    (order === 2 ? [-5, 5] : [0]).forEach((o) => line(ctx, a.x + ux * gap - uy * o, a.y + uy * gap + ux * o, b.x - ux * gap - uy * o, b.y - uy * gap + ux * o, c, 3));
  });
  atoms.forEach((a) => {
    text(ctx, a.s, a.x, a.y + 1, a.c, { size: 28, weight: 600, align: 'center' });
    (a.lp ?? []).forEach((ang) => {
      const cx = Math.cos(ang * RAD), cy = -Math.sin(ang * RAD), r = 25;
      [-6.5, 6.5].forEach((o) => F.dot(ctx, a.x + cx * r - cy * o, a.y + cy * r + cx * o, a.c, true, 3.5));
    });
  });
}
/* square brackets round an ion, its charge at the top right */
function brackets(ctx, x1, x2, y1, y2, q) {
  [[x1, 1], [x2, -1]].forEach(([x, s]) => {
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.beginPath();
    ctx.moveTo(x + s * 12, y1); ctx.lineTo(x, y1); ctx.lineTo(x, y2); ctx.lineTo(x + s * 12, y2); ctx.stroke(); ctx.restore();
  });
  text(ctx, q, x2 + 14, y1 + 6, PAL.ink, { size: 26, weight: 600 });
}
/* the equilibrium arrow, two half-arrows; back > 1 draws the reverse half longer */
function equilibrium(ctx, x1, x2, y, back = 1) {
  const ink = PAL.ink, gap = 6, m = (x1 + x2) / 2, half = (x2 - x1) / 2, f = half / Math.max(1, back), b = half;
  line(ctx, m - f, y - gap, m + f, y - gap, ink, 3); line(ctx, m + f, y - gap, m + f - 16, y - gap - 10, ink, 3);
  line(ctx, m - b, y + gap, m + b, y + gap, ink, 3); line(ctx, m - b, y + gap, m - b + 16, y + gap + 10, ink, 3);
}
/* the book's second row: formulas in ink, each with its role beneath in its pair's colour */
function equationRow(ctx, y, items, plus, arrowAt, back) {
  items.forEach(([s, x, role, c]) => {
    text(ctx, s, x, y, PAL.ink, { size: 26, align: 'center' });
    text(ctx, role, x, y + 40, c, { size: 22, weight: 600, align: 'center' });
  });
  plus.forEach((x) => text(ctx, '+', x, y, PAL.ink, { size: 28, align: 'center' }));
  equilibrium(ctx, arrowAt[0], arrowAt[1], y, back);
}

/* =====================================================================
   Water and ammonia, the book's conjugate_img. Two braced pairs side
   by side, H2O -> OH- by removing H+, NH3 -> NH4+ by adding it; a
   direction choice reads the equation the other way, turning both
   arrows round and relabelling each species, and the readout's species
   slide to their places in the reversed equation. Space-filling atoms
   in angstroms: O-H 0.96 at 104.5 degrees in water, 0.97 in hydroxide;
   N-H 1.01 at 106.7 degrees in ammonia, 1.03 tetrahedral in ammonium.
   The flat view projects the same coordinates face on. Still: the two
   directions are states of one equation, not a clock.
===================================================================== */
(function () {
  const H = 410, d = sim('fig-water-ammonia', H);
  const DIR = F.choice(d.controls, { label: '\\text{direction}', key: 'direction', aria: 'the direction in which the equation is read',
    options: [{ value: 'forward', label: 'forward' }, { value: 'reverse', label: 'reverse' }], value: 'forward', onInput: () => draw() });
  const VIEW = F.choice(d.controls, { label: '\\text{view}', options: VIEWS, value: '2d', aria: 'a flat drawing or a scene to turn', ms: 0, onInput: () => V.show() });
  const ro = F.readout(d);
  let hits = []; F.hover(d.stage, () => hits);

  const norm = (v) => { const l = Math.hypot(...v); return v.map((x) => x / l); };
  const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  /* n bonds of length L from the origin, at angle th from the axis, spread evenly about it from phase ph */
  function cone(axis, th, L, n, ph) {
    const a = norm(axis), u = norm(cross(a, Math.abs(a[1]) < 0.9 ? [0, 1, 0] : [1, 0, 0])), w = cross(a, u);
    return Array.from({ length: n }, (_, i) => {
      const p = ph + (i * TAU) / n;
      return [0, 1, 2].map((k) => L * (Math.cos(th) * a[k] + Math.sin(th) * (Math.cos(p) * u[k] + Math.sin(p) * w[k])));
    });
  }
  const hw = 52.25 * RAD;
  const MOL = {
    water: { name: 'water molecule', atoms: [['O', 0, 0.2, 0], ['H', -0.96 * Math.sin(hw), 0.2 - 0.96 * Math.cos(hw), 0], ['H', 0.96 * Math.sin(hw), 0.2 - 0.96 * Math.cos(hw), 0]] },
    hydroxide: { name: 'hydroxide ion', atoms: [['O', -0.3, 0, 0], ['H', 0.6, 0.33, 0.1]] },
    ammonia: { name: 'ammonia molecule', atoms: [['N', 0, 0.25, -0.15], ...cone([0, -0.55, 0.83], 67.9 * RAD, 1.01, 3, 0.5).map((p) => ['H', p[0], p[1] + 0.25, p[2] - 0.15])] },
    ammonium: { name: 'ammonium ion', atoms: [['N', 0, -0.1, 0], ['H', 0, 0.93, 0], ...cone([0, -1, 0], 70.53 * RAD, 1.03, 3, 0.35).map((p) => ['H', p[0], p[1] - 0.1, p[2]])] },
  };
  const RV = { O: 0.76, N: 0.8, H: 0.55 };
  const NAME = { O: 'oxygen atom', N: 'nitrogen atom', H: 'hydrogen atom' };
  /* the book's arrangement, left to right: water, hydroxide | ammonia, ammonium */
  const SLOT = { water: -7.6, hydroxide: -2.5, ammonia: 2.5, ammonium: 7.6 };
  const PAIR = { water: 'acid', hydroxide: 'acid', ammonia: 'base', ammonium: 'base' };
  const ROLE = {
    forward: { water: 'H_{2}O (acid)', hydroxide: 'OH⁻ (conjugate base)', ammonia: 'NH_{3} (base)', ammonium: 'NH_{4}⁺ (conjugate acid)' },
    reverse: { water: 'H_{2}O (conjugate acid)', hydroxide: 'OH⁻ (base)', ammonia: 'NH_{3} (conjugate base)', ammonium: 'NH_{4}⁺ (acid)' },
  };
  const STEP = { forward: ['Remove H⁺', 'Add H⁺'], reverse: ['Add H⁺', 'Remove H⁺'] };
  const HEAD = {
    forward: 'Water gives a proton to ammonia: water is the acid and ammonia the base.',
    reverse: 'In reverse, ammonium ion gives a proton to hydroxide ion, now the base.',
  };
  const species = (k) => ({ water: '\\text{H}_{2}\\text{O}(l)', hydroxide: '\\text{OH}^{-}(aq)', ammonia: '\\text{NH}_{3}(aq)', ammonium: '\\text{NH}_{4}{}^{+}(aq)' })[k];
  const EQ = {
    forward: ['water', 'ammonia', 'hydroxide', 'ammonium'],
    reverse: ['ammonium', 'hydroxide', 'ammonia', 'water'],
  };
  const tag = (k) => `\\mk{${k}}{${species(k)}}`;
  const equation = (dir) => { const [a, b, c, e] = EQ[dir]; return `${tag(a)}+${tag(b)}\\;\\longrightarrow\\;${tag(c)}+${tag(e)}`; };
  const pairColor = (k) => (PAIR[k] === 'acid' ? ACID() : BASE());

  /* ---------- the flat view: the book's two braces, four models and two arrows ---------- */
  const U = 62, CX = 700, CY = 300;
  function brace(ctx, x1, x2, y, s) {
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2.5; ctx.beginPath();
    const m = (x1 + x2) / 2;
    ctx.moveTo(x1, y + 12); ctx.quadraticCurveTo(x1, y, x1 + 14, y); ctx.lineTo(m - 14, y); ctx.quadraticCurveTo(m, y, m, y - 10);
    ctx.quadraticCurveTo(m, y, m + 14, y); ctx.lineTo(x2 - 14, y); ctx.quadraticCurveTo(x2, y, x2, y + 12); ctx.stroke(); ctx.restore();
    text(ctx, s, m, y - 28, PAL.ink, { size: 22, align: 'center' });
  }
  function draw2d() {
    const { ctx } = begin(d.c); hits = [];
    headline(ctx, HEAD[DIR.value]);
    const sx = (k) => CX + SLOT[k] * U;
    brace(ctx, sx('water') - 100, sx('hydroxide') + 120, 140, 'Conjugate acid-base pair');
    brace(ctx, sx('ammonia') - 110, sx('ammonium') + 110, 140, 'Conjugate acid-base pair');
    Object.keys(MOL).forEach((k) => {
      ['forward', 'reverse'].forEach((dir) => DIR.only(ctx, dir, () => text(ctx, ROLE[dir][k], sx(k), 184, pairColor(k), { size: 22, weight: 600, align: 'center' }), [0, 8]));
      const m = MOL[k], who = m.name;
      [...m.atoms].sort((a, b) => a[3] - b[3]).forEach(([s, x, y]) => {
        const px = sx(k) + x * U, py = CY - y * U;
        atom(ctx, px, py, s, RV[s] * U);
      });
      [...m.atoms].sort((a, b) => b[3] - a[3]).forEach(([s, x, y]) => hits.push({ x: sx(k) + x * U, y: CY - y * U, r: RV[s] * U * 0.8, name: `${NAME[s]} of the ${who}` }));
    });
    /* each arrow turns by shrinking through zero and growing the other way */
    const turn = DIR.mix((v) => (v === 'forward' ? 1 : -1));
    [['water', 'hydroxide', 0], ['ammonia', 'ammonium', 1]].forEach(([a, b, i]) => {
      const m = (sx(a) + sx(b)) / 2, half = 62 * turn;
      if (Math.abs(half) > 3) F.arrow(ctx, m - half, CY, m + half, CY, PAL.ink, 4);
      ['forward', 'reverse'].forEach((dir) => DIR.only(ctx, dir, () => text(ctx, STEP[dir][i], m, CY - 36, PAL.ink, { size: 22, align: 'center' }), [0, 8]));
    });
  }

  /* ---------- the same four species in three dimensions ---------- */
  let g = null;
  function mount() {
    const v = F.view3d(d.stage, { spin: 'off', h: 410, dist: 17, tilt: 0, pitch: [-1.3, 1.3], yaw: [-1.2, 1.2],
      views: [{ label: 'front', yaw: 0, pitch: 0 }, { label: 'above', yaw: 0, pitch: 1.25 }] });
    g = v.part(0);
    return v;
  }
  function draw3d(v) {
    if (!v.scene) return;
    v.clear();
    Object.keys(MOL).forEach((k) => MOL[k].atoms.forEach(([s, x, y, z]) => v.pickable(F.mesh.sphere(g, [x + SLOT[k], y, z], RV[s], F.el(s)), `${NAME[s]} of the ${MOL[k].name}`)));
    const turn = DIR.mix((x) => (x === 'forward' ? 1 : -1));
    [['water', 'hydroxide'], ['ammonia', 'ammonium']].forEach(([a, b]) => {
      const m = (SLOT[a] + SLOT[b]) / 2, half = 0.95 * turn;
      if (Math.abs(half) > 0.05) F.mesh.arrow(g, [m - half, 0, 0], [m + half, 0, 0], 0.05, PAL.ink);
    });
    v.headline(HEAD[DIR.value]);
    v.invalidate();
  }
  const V = views(d, VIEW, mount, draw);
  function draw() {
    if (VIEW.value === '3d' && V.v) { hits = []; draw3d(V.v); } else draw2d();
    ro.set(equation(DIR.value), undefined, { form: DIR.value });
  }
  still(d, draw);
})();

/* =====================================================================
   HF + H2O ⇌ H3O+ + F-, the book's HF_img, faithful: Lewis structures
   in the colours of the two pairs, the hydrogen that moves keeping its
   acid's colour inside the hydronium ion, as the book draws it.
===================================================================== */
(function () {
  const H = 330, d = sim('fig-hf-water', H);
  function draw() {
    const { ctx } = begin(d.c), A = ACID(), B = BASE(), Y = 112, L = 72;
    const hf = [{ s: 'H', x: 90, y: Y, c: A }, { s: 'F', x: 90 + L, y: Y, c: A, lp: [90, 0, 270] }];
    lewis(ctx, hf, [[0, 1, 1, A]]);
    text(ctx, '+', 275, Y, PAL.ink, { size: 30, align: 'center' });
    const w = [{ s: 'O', x: 390, y: Y, c: B, lp: [180, 270] }, { s: 'H', x: 390, y: Y - L, c: B }, { s: 'H', x: 390 + L, y: Y, c: B }];
    lewis(ctx, w, [[0, 1, 1, B], [0, 2, 1, B]]);
    equilibrium(ctx, 560, 720, Y);
    const h3o = [{ s: 'O', x: 900, y: Y, c: B, lp: [270] }, { s: 'H', x: 900, y: Y - L, c: B }, { s: 'H', x: 900 + L, y: Y, c: B }, { s: 'H', x: 900 - L, y: Y, c: A }];
    lewis(ctx, h3o, [[0, 1, 1, B], [0, 2, 1, B], [0, 3, 1, A]]);
    brackets(ctx, 805, 995, Y - L - 26, Y + 48, '+');
    text(ctx, '+', 1085, Y, PAL.ink, { size: 30, align: 'center' });
    lewis(ctx, [{ s: 'F', x: 1200, y: Y, c: A, lp: [90, 0, 270, 180] }], []);
    text(ctx, '⁻', 1238, Y - 30, A, { size: 30, weight: 600 });
    equationRow(ctx, 238, [['HF', 126, 'Acid', A], ['H_{2}O', 410, 'Base', B], ['H_{3}O⁺', 900, 'Acid', B], ['F⁻', 1200, 'Base', A]], [275, 1085], [560, 720]);
  }
  still(d, draw);
})();

/* =====================================================================
   H2O + C5NH5 ⇌ C5NH6+ + OH-, the book's NH3_img (which shows
   pyridine), faithful: the proton passes to the lone pair of the ring's
   nitrogen and keeps water's colour there.
===================================================================== */
(function () {
  const H = 400, d = sim('fig-pyridine-water', H);
  /* pyridine about (cx, cy): nitrogen on the left, alternating double bonds as the book draws them */
  function ring(cx, cy, c, lpN) {
    const R = 70, HR = 128, atoms = [], bonds = [];
    [180, 120, 60, 0, -60, -120].forEach((deg, i) => {
      atoms.push({ s: i === 0 ? 'N' : 'C', x: cx + R * Math.cos(deg * RAD), y: cy - R * Math.sin(deg * RAD), c, lp: i === 0 && lpN ? [180] : [] });
    });
    [[0, 1, 2], [1, 2, 1], [2, 3, 2], [3, 4, 1], [4, 5, 2], [5, 0, 1]].forEach(([i, j, o]) => bonds.push([i, j, o, c]));
    [120, 60, 0, -60, -120].forEach((deg, i) => {
      atoms.push({ s: 'H', x: cx + HR * Math.cos(deg * RAD), y: cy - HR * Math.sin(deg * RAD), c }); bonds.push([i + 1, atoms.length - 1, 1, c]);
    });
    return [atoms, bonds];
  }
  function draw() {
    const { ctx } = begin(d.c), A = ACID(), B = BASE(), Y = 150, L = 72;
    const w = [{ s: 'O', x: 90, y: Y, c: A, lp: [180, 270] }, { s: 'H', x: 90, y: Y - L, c: A }, { s: 'H', x: 90 + L, y: Y, c: A }];
    lewis(ctx, w, [[0, 1, 1, A], [0, 2, 1, A]]);
    text(ctx, '+', 228, Y, PAL.ink, { size: 30, align: 'center' });
    lewis(ctx, ...ring(400, Y, B, true));
    equilibrium(ctx, 560, 680, Y);
    const [pa, pb] = ring(930, Y, B, false);
    pa.push({ s: 'H', x: 930 - 70 - L, y: Y, c: A }); pb.push([0, pa.length - 1, 1, A]);
    lewis(ctx, pa, pb);
    brackets(ctx, 752, 1075, Y - 140, Y + 140, '+');
    text(ctx, '+', 1130, Y, PAL.ink, { size: 30, align: 'center' });
    lewis(ctx, [{ s: 'O', x: 1215, y: Y, c: A, lp: [90, 180, 270] }, { s: 'H', x: 1215 + L, y: Y, c: A }], [[0, 1, 1, A]]);
    brackets(ctx, 1170, 1312, Y - 40, Y + 40, '⁻');
    equationRow(ctx, 336, [['H_{2}O', 110, 'Acid', A], ['C_{5}NH_{5}', 400, 'Base', B], ['C_{5}NH_{6}⁺', 930, 'Acid', B], ['OH⁻', 1241, 'Base', A]], [228, 1130], [560, 680]);
  }
  still(d, draw);
})();

/* =====================================================================
   H2O + H2O ⇌ H3O+ + OH-, the book's Water_img, faithful: the reverse
   half of the arrow drawn the longer, as printed. The image puts the
   hydroxide's minus on its hydrogen; it is drawn on the bracket.
===================================================================== */
(function () {
  const H = 330, d = sim('fig-water-water', H);
  function draw() {
    const { ctx } = begin(d.c), A = F.ref('water-acid'), B = F.ref('water-base'), Y = 112, L = 72;
    const water = (x, c) => lewis(ctx, [{ s: 'O', x, y: Y, c, lp: [180, 270] }, { s: 'H', x, y: Y - L, c }, { s: 'H', x: x + L, y: Y, c }], [[0, 1, 1, c], [0, 2, 1, c]]);
    water(110, A);
    text(ctx, '+', 270, Y, PAL.ink, { size: 30, align: 'center' });
    water(390, B);
    equilibrium(ctx, 560, 730, Y, 1.6);
    const h3o = [{ s: 'O', x: 900, y: Y, c: B, lp: [270] }, { s: 'H', x: 900, y: Y - L, c: B }, { s: 'H', x: 900 + L, y: Y, c: B }, { s: 'H', x: 900 - L, y: Y, c: A }];
    lewis(ctx, h3o, [[0, 1, 1, B], [0, 2, 1, B], [0, 3, 1, A]]);
    brackets(ctx, 805, 995, Y - L - 26, Y + 48, '+');
    text(ctx, '+', 1085, Y, PAL.ink, { size: 30, align: 'center' });
    lewis(ctx, [{ s: 'O', x: 1180, y: Y, c: A, lp: [90, 180, 270] }, { s: 'H', x: 1180 + L, y: Y, c: A }], [[0, 1, 1, A]]);
    brackets(ctx, 1135, 1277, Y - 40, Y + 40, '⁻');
    equationRow(ctx, 238, [['H_{2}O', 130, 'Acid', A], ['H_{2}O', 410, 'Base', B], ['H_{3}O⁺', 900, 'Acid', B], ['OH⁻', 1206, 'Base', A]], [270, 1085], [560, 730], 1.6);
  }
  still(d, draw);
})();

/* =====================================================================
   SIM: Kw = [H3O+][OH-]. On logarithmic axes, log[OH-] = log Kw -
   log[H3O+], a line of slope -1 that the temperature lifts. Axes fixed
   at 1e-12 to 1e-2 M both ways, the slider's range; at 100 °C the line
   leaves the top of the box below [H3O+] = 10^-10.25 M and the point is
   pinned there. Kw only at the book's five temperatures: 25 and 100 °C
   from the text, 80 °C from the Check Your Learning, 40 and 60 °C from
   exercise 14; nothing is interpolated between them. The dashed circle
   is pure water, log sqrt(Kw). Still: the relation answers its controls.
===================================================================== */
(function () {
  const H = 520, d = sim('sim-kw', H);
  const KW = { 25: 1.0e-14, 40: 2.9e-14, 60: 9.3e-14, 80: 2.4e-13, 100: 5.6e-13 };
  const LOG = Object.fromEntries(Object.entries(KW).map(([t, k]) => [t, Math.log10(k)]));
  const T = F.choice(d.controls, { label: '\\kT', key: 'T', aria: 'the temperature of the water', value: '25',
    options: Object.keys(KW).map((t) => ({ value: t, label: `${t} °C` })),
    onInput: (t) => { if (onWater) h.set(LOG[t] / 2); h.refresh(); draw(); } });
  const h = ctl(d.controls, { label: '\\log \\kconcHyd', cls: 'concentration', key: 'logH', min: -12, max: -2, step: 0.01, value: -7, unit: '', dec: 2,
    aria: 'the base-ten logarithm of the hydronium ion concentration in molar',
    detents: [{ v: Math.log10(2.0e-6), label: '2.0 × 10⁻⁶ M' }],
    specials: [{ at: () => LOG[T.value] / 2, label: 'pure water' }], onInput: () => draw() });
  const ro = F.readout(d);
  const G = { l: 210, r: 1250, t: 112, b: 420 };
  const SUP = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
  const sup = (n) => String(n).split('').map((c) => SUP[c]).join('');
  const parts = (v) => { let e = Math.floor(Math.log10(v)), m = +(v / 10 ** e).toFixed(1); if (m >= 10) { m = 1; e += 1; } return [m, e]; };
  const round2 = (v) => { const [m, e] = parts(v); return m * 10 ** e; };
  const sciTxt = (v) => { const [m, e] = parts(v); return `${m.toFixed(1)} × 10${sup(e)}`; };
  const sciTex = (v) => { const [m, e] = parts(v); return `${m.toFixed(1)}\\times 10^{${e}}`; };
  const big = (r) => (r >= 1e4 ? sciTxt(r) : r >= 100 ? String(Math.round(r / 10 ** (Math.floor(Math.log10(r)) - 1)) * 10 ** (Math.floor(Math.log10(r)) - 1)) : r >= 10 ? String(Math.round(r)) : r.toFixed(1));
  let onWater = true;
  function draw() {
    const { ctx } = begin(d.c);
    const t = T.value, K = KW[t], L = T.mix((v) => LOG[v]);
    onWater = Math.abs(h.v - LOG[t] / 2) < 0.006;
    const x = onWater ? LOG[t] / 2 : h.v;
    const cc = C('concentration'), ck = C('equilibrium-constant');
    const g = F.axes(ctx, G, [-12, -2], [-12, -2], { nx: 10, ny: 10, fx: (v) => (Math.round(v) % 2 ? '' : '10' + sup(Math.round(v))), fy: (v) => (Math.round(v) % 2 ? '' : '10' + sup(Math.round(v))),
      xl: '[H_{3}O⁺] (M)', xc: cc, yl: '[OH⁻] (M)', yc: cc });
    const seg = (lk) => [Math.max(-12, lk + 2), Math.min(-2, lk + 12)];
    line(ctx, g.X(-12), g.Y(-12), g.X(-2), g.Y(-2), alpha(PAL.ink, 0.35), 2.5, [10, 10]);
    text(ctx, '[OH⁻] = [H_{3}O⁺]', g.X(-3), g.Y(-3) - 8, PAL.muted, { size: 17, align: 'right', base: 'bottom' });
    if (t !== '25' || T.k < 1) {
      const [a, b] = seg(LOG[25]);
      line(ctx, g.X(a), g.Y(LOG[25] - a), g.X(b), g.Y(LOG[25] - b), alpha(ck, 0.45), 3, [10, 10]);
      text(ctx, '25 °C', g.X(-4.2), g.Y(LOG[25] + 4.2) + 18, alpha(ck, 0.8), { size: 17, align: 'right' });
    }
    const [a, b] = seg(L);
    F.curve(ctx, (u) => L - u, a, b, g.X, g.Y, ck, 5);
    const lx = Math.max(-11.2, L + 3.6);
    text(ctx, `$\\kKw = ${sciTex(K)}$`, g.X(lx) + 10, g.Y(L - lx) - 30, ck, { size: 22, tex: true, bg: PAL.panel });
    F.dot(ctx, g.X(L / 2), g.Y(L / 2), ck, false, 10);
    const y = L - x, inside = y <= -2;
    if (inside) {
      line(ctx, g.X(x), g.Y(y), g.X(x), G.b, alpha(cc, 0.6), 2.5, [4, 8]);
      line(ctx, G.l, g.Y(y), g.X(x), g.Y(y), alpha(cc, 0.6), 2.5, [4, 8]);
    }
    const p = F.pinned(ctx, G, g.X, g.Y, x, y, cc);
    const Hv = round2(10 ** x), Ov = round2(K / Hv);
    text(ctx, `${sciTxt(Hv)} M`, Math.min(Math.max(p.x, G.l + 80), G.r - 80), G.b - 18, cc, { size: 17, weight: 600, align: 'center', bg: PAL.panel });
    text(ctx, `${sciTxt(Ov)} M`, G.l + 12, Math.min(Math.max(p.y, G.t + 14), G.b - 46), cc, { size: 17, weight: 600, bg: PAL.panel });
    const r = Hv / Ov;
    headline(ctx, onWater
      ? `At ${t} °C, pure water holds equal concentrations of hydronium and hydroxide ions, ${sciTxt(Hv)} M each.`
      : r >= 1 ? `At ${t} °C there is ${big(r)} times as much hydronium ion as hydroxide ion.`
        : `At ${t} °C there is ${big(1 / r)} times as much hydroxide ion as hydronium ion.`);
    const k = hue('equilibrium-constant', sciTex(K)), hv = hue('concentration', sciTex(Hv)), ov = hue('concentration', sciTex(Ov));
    ro.set(onWater
      ? `\\mk{H}{\\kconcHyd} = \\mk{O}{\\kconcOH} = \\sqrt{\\mk{K}{\\kKw}} = \\sqrt{\\mk{Kv}{${k}}} = \\mk{Ov}{${ov}}\\ M`
      : `\\mk{O}{\\kconcOH} = \\frac{\\mk{K}{\\kKw}}{\\mk{H}{\\kconcHyd}} = \\frac{\\mk{Kv}{${k}}}{\\mk{Hv}{${hv}}} = \\mk{Ov}{${ov}}\\ M`, undefined, { form: onWater });
  }
  still(d, draw);
})();
};
