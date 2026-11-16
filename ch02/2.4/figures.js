/* Figures for section 2.4 Chemical Formulas. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['2.4'] = function (root, F) {
const { tex, PAL, alpha, register, begin, line, text, headline } = F;
const sim = (id, H) => F.sim(root, id, H);
const TAU = 2 * Math.PI;
const lerp = (a, b, k) => a + (b - a) * k;
const NAME = { H: 'hydrogen', C: 'carbon', O: 'oxygen', S: 'sulfur' };
/* an atom as a disc in its element's colour; hydrogen is light and takes an ink outline so that it reads on a light page */
function atom(ctx, x, y, sym, r) {
  ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fillStyle = F.el(sym); ctx.fill();
  ctx.lineWidth = sym === 'H' ? 2 : 1.2; ctx.strokeStyle = sym === 'H' ? PAL.ink : alpha(PAL.ink, 0.4); ctx.stroke(); ctx.restore();
}
/* a bond of a structural formula between two lettered atoms, trimmed clear of the letters */
function bond2(ctx, a, b, gap) {
  const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy); if (L < 2 * gap + 4) return;
  const ux = dx / L, uy = dy / L;
  line(ctx, a[0] + ux * gap, a[1] + uy * gap, b[0] - ux * gap, b[1] - uy * gap, PAL.ink, 3);
}
const R_BALL = { H: 0.26, C: 0.38, O: 0.36, S: 0.46 }, R_VDW = { H: 1.1, C: 1.6, O: 1.45, S: 1.7 };
const T3 = () => window.THREE;
/* the signature of everything a scene's colours are read from, so a theme change rebuilds it */
const palSig = () => [PAL.ink, PAL.panel, PAL.muted, F.el('C'), F.el('H'), F.el('O'), F.el('S')].join('|');

/* =====================================================================
   Figures 2.16 and 2.17: one molecule the book's four ways. The molecular
   and the structural formula stand on a flat strip, as the book prints
   them; under them the model turns, so the reader sets the flat formula
   against the shape it flattens (methane's cross against four bonds spread
   evenly in space, sulfur's octagon against a puckered crown). One choice
   swells the balls into the space-filling model and fades the sticks they
   bury. Still: a molecule has no clock. Free orbit and an idle spin about
   the vertical, since a molecule has no ground.
   Methane is a regular tetrahedron of 1.09 Å bonds, one hydrogen atom up as
   the book draws it; S₈ is a crown of 2.05 Å bonds with angles near 108°.
   ===================================================================== */
const MOL = {
  methane: {
    mol: 'CH_4', stripH: 330, L: 92,
    flat: [['C', 0, 0], ['H', 0, -1], ['H', -1, 0], ['H', 1, 0], ['H', 0, 1]], fb: [[0, 1], [0, 2], [0, 3], [0, 4]],
    A: [['C', 0, 0, 0], ['H', 0, 1.09, 0], ['H', 0, -0.363, 1.028], ['H', 0.89, -0.363, -0.514], ['H', -0.89, -0.363, -0.514]],
    B: [[0, 1], [0, 2], [0, 3], [0, 4]],
    key: ['C', 'H'], dist: 9.6, grow: 1.7, yaw: 0.35, tilt: 0.22,
  },
  sulfur: {
    mol: 'S_8', stripH: 330, L: 80,
    flat: [0, 1, 2, 3, 4, 5, 6, 7].map((k) => ['S', 1.31 * Math.cos((k + 0.5) * TAU / 8), 1.31 * Math.sin((k + 0.5) * TAU / 8)]),
    fb: [0, 1, 2, 3, 4, 5, 6, 7].map((k) => [k, (k + 1) % 8]),
    A: [['S', 2.3, 0, -0.53], ['S', 1.62, 1.62, 0.53], ['S', 0, 2.3, -0.53], ['S', -1.62, 1.62, 0.53], ['S', -2.3, 0, -0.53], ['S', -1.62, -1.62, 0.53], ['S', 0, -2.3, -0.53], ['S', 1.62, -1.62, 0.53]],
    B: [0, 1, 2, 3, 4, 5, 6, 7].map((k) => [k, (k + 1) % 8]),
    key: ['S'], dist: 17.2, grow: 1.4, yaw: 0.8, tilt: 0.3,
  },
};
function models(id, key) {
  const m = MOL[key], d = sim(id, m.stripH), H = m.stripH;
  const M = F.choice(d.controls, { label: '\\text{model}', options: [{ value: 'ball', label: 'ball-and-stick' }, { value: 'space', label: 'space-filling' }], value: 'ball', aria: 'which model of the molecule turns below the formulas' });
  let hits = [];
  F.hover(d.stage, () => hits);
  const v = F.view3d(d.stage, { spin: 'idle', h: 440, dist: m.dist, tilt: m.tilt });
  v.setView(m.yaw, m.tilt);
  const grp = v.part(0);
  let sticks = null, balls = [], sig = '';
  function build() {
    const s = palSig(); if (s === sig) return; sig = s;
    v.clear(); balls = [];
    sticks = new (T3().Group)(); grp.add(sticks);
    m.B.forEach(([i, j]) => F.mesh.bond(sticks, m.A[i].slice(1), m.A[j].slice(1), 1, 0.07));
    m.A.forEach((a) => { const b = F.mesh.sphere(grp, a.slice(1), R_BALL[a[0]], F.el(a[0])); v.pickable(b, NAME[a[0]] + ' atom'); balls.push([b, a[0]]); });
  }
  function draw() {
    const { ctx } = begin(d.c); hits = [];
    const yc = (H - 50) / 2 + 8, yn = H - 28;
    /* the molecular formula, the structural formula and the key, left to right */
    text(ctx, m.mol, 300, yc, PAL.ink, { size: 84, align: 'center' });
    text(ctx, 'molecular formula', 300, yn, PAL.muted, { size: 24, align: 'center' });
    const P = m.flat.map((a) => [730 + a[1] * m.L, yc + a[2] * m.L]);
    m.fb.forEach(([i, j]) => bond2(ctx, P[i], P[j], 27));
    m.flat.forEach((a, i) => { text(ctx, a[0], P[i][0], P[i][1], PAL.ink, { size: 42, align: 'center' }); hits.push({ x: P[i][0], y: P[i][1], r: 26, name: NAME[a[0]] + ' atom' }); });
    text(ctx, 'structural formula', 730, yn, PAL.muted, { size: 24, align: 'center' });
    const rows = m.key.length, kh = rows * 38 + 24;
    F.legend(ctx, { l: 1040, r: 1330, t: yc - kh / 2 - 12, b: yc + kh / 2 + 12 }, m.key.map((s) => ({ s: NAME[s] + ' atom', draw: (c, x, y) => atom(c, x, y, s, 12) })), { corner: 'tl', size: 24 });
    if (!v.scene) return;
    build();
    const k = M.mix((x) => (x === 'space' ? 1 : 0));
    balls.forEach(([b, s]) => b.scale.setScalar(lerp(R_BALL[s], R_VDW[s], k)));
    F.fade3(sticks, 1 - k);
    grp.scale.setScalar(lerp(m.grow, 1, k));   /* the ball-and-stick model is drawn larger, so that either model fills the stage */
    v.invalidate();
  }
  register(d.fig, { update: () => {}, draw });
}
models('fig-methane', 'methane');
models('fig-sulfur', 'sulfur');

/* =====================================================================
   Sim: from a molecular formula to an empirical formula. The atoms of one
   molecule stand in rows by element and are dealt into as many groups as
   the slider says. A number that divides every count leaves identical
   groups and a smaller formula; the largest such number leaves the
   simplest whole-number ratio, the empirical formula; a number that does
   not divide a count leaves atoms over. Still: the atoms glide to their
   new places when a control changes, and there is no clock.
   ===================================================================== */
(function () {
  const d = sim('sim-empirical', 470);
  const CMP = {
    methane: { name: 'methane', n: { C: 1, H: 4 } },
    benzene: { name: 'benzene', n: { C: 6, H: 6 } },
    acetic: { name: 'acetic acid', n: { C: 2, H: 4, O: 2 } },
    glucose: { name: 'glucose', n: { C: 6, H: 12, O: 6 } },
  };
  const gcd = (a, b) => (b ? gcd(b, a % b) : a);
  const gcdOf = (key) => Object.values(CMP[key].n).reduce(gcd);
  const uni = (n) => Object.entries(n).map(([s, k]) => (k === 1 ? s : s + String(k).split('').map((c) => '₀₁₂₃₄₅₆₇₈₉'[+c]).join(''))).join('');
  const sub = (n) => Object.entries(n).map(([s, k]) => (k === 1 ? s : `${s}_{${k}}`)).join('');
  const list = (a) => (a.length === 2 ? `${a[0]} and ${a[1]}` : `${a.slice(0, -1).join(', ')} and ${a[a.length - 1]}`);
  const K = F.choice(d.controls, { label: '\\text{compound}', options: Object.keys(CMP).map((k) => ({ value: k, label: CMP[k].name })), value: 'acetic', aria: 'the compound' });
  const D = F.ctl(d.controls, { label: '\\text{divide by}', cls: '', min: 1, max: 6, step: 1, value: 2, unit: '', dec: 0, aria: 'the number that the count of each element is divided by', specials: [{ at: () => gcdOf(K.value) }] });
  const RA = { C: 24, H: 19, O: 23 }, X0 = 190, GAP = 18, TOP = 104, BH = 270, SP = 64, LEFT = 250;
  /* where everything stands for one compound divided by n: the boxes, and each atom in its box or left over */
  function layout(key, n) {
    const c = CMP[key], els = Object.keys(c.n), per = els.map((s) => Math.floor(c.n[s] / n)), over = els.map((s) => c.n[s] % n);
    const left = Math.max(...over), most = Math.max(1, ...per), avail = 1340 - X0 - (left ? LEFT : 0);
    const bw = Math.min((avail - (n - 1) * GAP) / n, most * SP + 56), sp = Math.min(SP, (bw - 40) / most);
    /* the row names, the boxes and what is left over stand centred together */
    const wide = n * bw + (n - 1) * GAP, tail = left ? 76 + (left - 1) * 46 + 24 : 0, bx = 700 + (90 - wide - tail) / 2, end = bx + wide;
    const rowY = (r) => TOP + 48 + (els.length === 1 ? 0.5 : r / (els.length - 1)) * (BH - 96);
    const atoms = [];
    els.forEach((s, r) => {
      for (let a = 0; a < c.n[s]; a++) {
        const dealt = a < per[r] * n, gi = a % n, slot = Math.floor(a / n);
        const x = dealt ? bx + gi * (bw + GAP) + bw / 2 + (slot - (per[r] - 1) / 2) * sp : end + 76 + (a - per[r] * n) * 46;
        atoms.push({ s, x, y: rowY(r), r: Math.min(RA[s], sp / 2 - 2) });
      }
    });
    return { els, per, over, left, n, bx, bw, end, rowY, atoms, counts: els.map((s) => c.n[s]) };
  }
  let lay = null, was = null, shown = [], from = [], sig = '';
  const tw = F.tween(d, 1);
  let hits = [];
  F.hover(d.stage, () => hits);
  function boxes(ctx, L, a) {
    if (a < 0.01) return;
    const whole = !L.left, group = Object.fromEntries(L.els.map((s, r) => [s, L.per[r]]).filter(([, k]) => k > 0));
    F.faded(ctx, a, [0, 0], () => {
      for (let i = 0; i < L.n; i++) {
        const x = L.bx + i * (L.bw + GAP);
        ctx.save(); ctx.strokeStyle = PAL.muted; ctx.lineWidth = 2.5; ctx.setLineDash([8, 6]); ctx.beginPath(); ctx.roundRect(x, TOP, L.bw, BH, 12); ctx.stroke(); ctx.restore();
        if (whole) text(ctx, sub(group), x + L.bw / 2, TOP + BH + 36, PAL.ink, { size: L.bw < 130 ? 24 : 30, weight: 600, align: 'center' });
      }
      if (L.left) text(ctx, 'left over', L.end + 76 + (L.left - 1) * 23, TOP + BH + 36, PAL.muted, { size: 24, align: 'center' });
      L.els.forEach((s, r) => text(ctx, `${L.counts[r]} ${s}`, L.bx - 30, L.rowY(r), PAL.ink, { size: 28, align: 'right' }));
    });
  }
  function draw() {
    const { ctx } = begin(d.c); hits = [];
    const key = K.value, n = Math.round(D.v), c = CMP[key], g = gcdOf(key), s = key + ':' + n;
    if (s !== sig) {
      const same = sig.split(':')[0] === key && shown.length === (lay ? lay.atoms.length : -1);
      was = same ? lay : null; lay = layout(key, n);
      if (same) { from = shown.map((p) => ({ ...p })); tw.set(0); tw.to(1, 650); } else { from = lay.atoms; tw.set(1); }
      sig = s;
    }
    const k = tw.v, L = lay, whole = !L.left, group = Object.fromEntries(L.els.map((e, r) => [e, L.per[r]]));
    const ratio = (a) => a.join(':');
    headline(ctx, !whole ? `${list(L.counts)} cannot ${L.counts.length === 2 ? 'both' : 'all'} be divided by ${n} into whole atoms.`
      : n === g && g === 1 ? `${ratio(L.counts)} cannot be divided further, so the empirical formula of ${c.name} is ${uni(c.n)} itself.`
      : n === 1 ? `One molecule of ${c.name}, ${uni(c.n)}, holds atoms in the ratio ${ratio(L.counts)}.`
      : n === g ? `Dividing by ${n} gives ${ratio(L.per)}, the simplest whole-number ratio: the empirical formula is ${uni(group)}.`
      : `Dividing by ${n} gives ${ratio(L.per)}, which can still be divided by ${g / n}.`);
    if (was && k < 1) boxes(ctx, was, 1 - k);
    boxes(ctx, L, was ? k : K.k);
    shown = L.atoms.map((p, i) => ({ s: p.s, x: lerp(from[i].x, p.x, k), y: lerp(from[i].y, p.y, k) - Math.sin(Math.PI * k) * (i % 2 ? 10 : -10), r: lerp(from[i].r, p.r, k) }));
    F.faded(ctx, K.k, [0, 0], () => shown.forEach((p) => atom(ctx, p.x, p.y, p.s, p.r)));
    shown.forEach((p) => hits.push({ x: p.x, y: p.y, r: p.r + 3, name: NAME[p.s] + ' atom' }));
    const names = L.els.map((e) => `\\text{${e}}`).join(':'), q = L.counts.map((x) => x / n);
    const dec = (x) => String(Math.round(x * 100) / 100), exact = q.every((x) => Math.abs(x * 100 - Math.round(x * 100)) < 1e-9);
    tex(d.readout, n === 1 ? `${names} = ${ratio(L.counts)}`
      : `${names} = ${ratio(L.counts)} = ${L.counts.map((x) => `\\tfrac{${x}}{${n}}`).join(':')} ${exact ? '=' : '\\approx'} ${q.map(dec).join(':')}`);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   Figure 2.24: the carvone mirror pair, in three dimensions only, as the
   book's rule for this pair asks. S-(+)-carvone stands on the left with
   its ring facing the reader, as the book draws it; R-(−)-carvone is its
   reflection in the plane between them. The choice does what the book's
   180° arrow does: it turns R half way round its own vertical axis, and
   then lays it on S, where it is drawn see-through. Reflecting in the
   plane and turning half way round together reverse front and back, so the
   ring and the oxygen atom land on S's while everything in front of the
   ring lands behind it. Still: the turn fires on the choice. Free orbit of
   the pair, since a molecule has no ground; no spin, since the comparison
   is made in a view the reader holds.
   Coordinates: PubChem CID 16724, (S)-(+)-carvone, turned 60° in the ring's
   plane to the book's pose.
   ===================================================================== */
(function () {
  const d = sim('fig-carvone');
  const A0 = [['O', 2.37, -2.06, 0.02], ['C', -0.65, -0.1, -0.28], ['C', 0.15, -1.23, 0.38], ['C', -0.12, 1.26, 0.17], ['C', -2.11, -0.23, 0.03], ['C', 1.63, -1.07, 0.1], ['C', 1.37, 1.35, 0.06], ['C', 2.2, 0.3, 0], ['C', -3.02, -0.43, -1.15], ['C', 3.69, 0.44, -0.14], ['C', -2.58, -0.18, 1.28], ['H', -0.5, -0.18, -1.36], ['H', -0.17, -2.19, -0.02], ['H', 0.03, -1.25, 1.47], ['H', -0.4, 1.51, 1.2], ['H', -0.57, 2.04, -0.47], ['H', 1.78, 2.36, 0.03], ['H', -2.93, 0.42, -1.84], ['H', -2.75, -1.34, -1.69], ['H', -4.07, -0.52, -0.86], ['H', 4.03, -0.05, -1.06], ['H', 4.19, -0.03, 0.71], ['H', 4, 1.49, -0.18], ['H', -3.64, -0.27, 1.48], ['H', -1.93, -0.04, 2.14]];
  const B = [[0, 5, 2], [1, 2, 1], [1, 3, 1], [1, 4, 1], [1, 11, 1], [2, 5, 1], [2, 12, 1], [2, 13, 1], [3, 6, 1], [3, 14, 1], [3, 15, 1], [4, 8, 1], [4, 10, 2], [5, 7, 1], [6, 7, 2], [6, 16, 1], [7, 9, 1], [8, 17, 1], [8, 18, 1], [8, 19, 1], [9, 20, 1], [9, 21, 1], [9, 22, 1], [10, 23, 1], [10, 24, 1]];
  const RING = [1, 2, 5, 7, 6, 3];
  /* the book's pose: the ring's plane is the page, the oxygen atom toward the mirror, the C₃H₅ group below */
  const co = Math.cos(Math.PI / 3), si = Math.sin(Math.PI / 3), z0 = RING.reduce((a, i) => a + A0[i][3], 0) / 6;
  const turned = A0.map(([s, x, y, z]) => [s, x * co - y * si, x * si + y * co, z - z0]);
  const mid = (j) => (Math.max(...turned.map((a) => a[j])) + Math.min(...turned.map((a) => a[j]))) / 2;
  const mx = mid(1), my = mid(2);
  const S = turned.map(([s, x, y, z]) => [s, x - mx, y - my, z]), Rm = S.map(([s, x, y, z]) => [s, -x, y, z]);
  const GAP = Math.max(...S.map((a) => Math.abs(a[1]))) + 1.5;
  const WHICH = { S: '<em>S</em>-(+)-carvone', R: '<em>R</em>-(−)-carvone' }, PLAIN = { S: 'S-(+)-carvone', R: 'R-(−)-carvone' };
  const K = F.choice(d.controls, { label: '\\textit{R}\\text{-(−)-carvone}', options: [{ value: 'mirror', label: 'mirror image' }, { value: 'turned', label: 'turned 180°' }, { value: 'over', label: 'laid on <em>S</em>' }], value: 'mirror', aria: 'where R-(−)-carvone stands', ms: 1400, onInput: (x) => v.glide(VIEW[x], 1400) });
  const HEAD = {
    mirror: `${WHICH.R} is the mirror image of ${WHICH.S}.`,
    turned: `Turned half way round, ${WHICH.R} has its ring and its oxygen atom where ${WHICH.S} has them.`,
    over: `Laid on ${WHICH.S}, ${WHICH.R} matches it in the ring's plane only: what stands in front of the ring in one stands behind it in the other.`,
  };
  /* the pair is met from the front, as the book draws it; laid on each other they are seen from the side, where front and back show */
  const VIEW = { mirror: { yaw: -0.18, pitch: 0.12 }, turned: { yaw: -0.18, pitch: 0.12 }, over: { yaw: 0.6, pitch: 0.16 } };
  const v = F.view3d(d.stage, { h: 720, dist: 25, tilt: 0.12, onRender: names });
  v.setView(-0.18, 0.12);
  const g = v.part(0);
  let sig = '', gS = null, gR = null, plane = null, lab = null;
  function molecule(grp, atoms, which) {
    B.forEach(([i, j, o]) => F.mesh.bond(grp, atoms[i].slice(1), atoms[j].slice(1), o, 0.07));
    atoms.forEach((a, i) => v.pickable(F.mesh.sphere(grp, a.slice(1), R_BALL[a[0]], F.el(a[0])), i === 1 ? `ring carbon atom of ${PLAIN[which]} whose four bonds point differently in the two isomers` : `${NAME[a[0]]} atom of ${PLAIN[which]}`));
  }
  function build() {
    const s = palSig(); if (s === sig) return; sig = s;
    v.clear();
    const T = T3();
    plane = new T.Mesh(new T.PlaneGeometry(6.5, 10), F.mesh.mat(PAL.ink, { transparent: true, opacity: 0.08, depthWrite: false, side: T.DoubleSide }));
    plane.rotation.y = Math.PI / 2; g.add(plane); v.pickable(plane, 'mirror plane');
    gS = new T.Group(); gS.position.x = -GAP; g.add(gS); molecule(gS, S, 'S');
    gR = new T.Group(); g.add(gR); molecule(gR, Rm, 'R');
    lab = { S: v.label(WHICH.S, [0, 0, 0], g), R: v.label(WHICH.R, [0, 0, 0], g) };
  }
  /* each name stands under its molecule as the scene is now seen, and the two step apart where they would meet */
  function names() {
    if (!lab || !gS) return;
    const w = v.wrap.clientWidth, h = v.wrap.clientHeight;
    const under = (grp, atoms) => { let x0 = Infinity, x1 = -Infinity, y1 = -Infinity; atoms.forEach((a) => { const [x, y] = v.project(a.slice(1), grp); x0 = Math.min(x0, x); x1 = Math.max(x1, x); y1 = Math.max(y1, y); }); return [(x0 + x1) / 2, y1]; };
    const a = under(gS, S), b = under(gR, Rm), wa = lab.S.offsetWidth, wb = lab.R.offsetWidth, ht = lab.S.offsetHeight;
    const need = (wa + wb) / 2 + 12;
    if (Math.abs(a[0] - b[0]) < need) { const m = (a[0] + b[0]) / 2, sgn = a[0] <= b[0] ? 1 : -1; a[0] = m - sgn * need / 2; b[0] = m + sgn * need / 2; a[1] = b[1] = Math.max(a[1], b[1]); }
    [[lab.S, a, wa], [lab.R, b, wb]].forEach(([e, p, wide]) => {
      e.style.left = Math.min(Math.max(p[0], wide / 2 + 4), w - wide / 2 - 4) + 'px';
      e.style.top = Math.min(p[1] + ht + 14, h - 4) + 'px';
    });
  }
  function draw() {
    if (!v.scene) return;
    build();
    gR.rotation.y = K.mix((x) => (x === 'mirror' ? 0 : Math.PI));
    gR.position.x = K.mix((x) => (x === 'over' ? 0 : GAP)); gS.position.x = -gR.position.x;
    F.fade3(gR, K.mix((x) => (x === 'over' ? 0.55 : 1)));
    F.fade3(plane, K.mix((x) => (x === 'mirror' ? 1 : 0)));
    v.headline(HEAD[K.value]);
    v.invalidate();
    tex(d.readout, '\\text{C}_{10}\\text{H}_{14}\\text{O}');
  }
  register(d.fig, { update: () => {}, draw });
})();
};
