/* Figures for section 2.7 Chemical Nomenclature. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['2.7'] = function (root, F) {
const { el, tex, PAL, register, begin, line, text, headline } = F;
const sim = (id, H) => F.sim(root, id, H);
function readout(host, main, small) { tex(host, main); if (small) host.appendChild(el('small', null, small)); }
const NAME = { Cr: '铬', O: '氧' };
const T3 = () => window.THREE;
const palSig = () => [PAL.ink, PAL.panel, PAL.muted, F.el('Cr'), F.el('O')].join('|');

/* a bond of a structural formula between two lettered atoms: one or two strokes, trimmed clear of the letters */
function bond2(ctx, a, b, order, gap = 30) {
  const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy);
  const ux = dx / L, uy = dy / L, nx = -uy, ny = ux;
  (order === 1 ? [0] : [-5, 5]).forEach((o) => line(ctx, a[0] + ux * gap + nx * o, a[1] + uy * gap + ny * o, b[0] - ux * gap + nx * o, b[1] - uy * gap + ny * o, PAL.ink, 3));
}

/* ---------- the two ions ----------
   Cr–O 1.66 Å to a terminal oxygen and 1.78 Å to the bridging oxygen of dichromate, whose Cr–O–Cr
   angle is 126°; every chromium atom sits at the centre of a tetrahedron of oxygen atoms. Bond
   orders as the book draws them: two double bonds on each chromium atom, the rest single. */
const add = (a, b, k = 1) => a.map((x, i) => x + k * b[i]);
const unit = (a) => { const n = Math.hypot(...a); return a.map((x) => x / n); };
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
/* the three other corners of a tetrahedron about `c` whose fourth corner lies along `u` */
function corners(c, u, r) {
  const e1 = [0, 0, 1], e2 = cross(u, e1), s = Math.sqrt(8) / 3;
  return [0, 1, 2].map((k) => { const p = 2 * Math.PI * k / 3; return add(c, add(u.map((x) => -x / 3), add(e1.map((x) => x * s * Math.cos(p)), e2.map((x) => x * s * Math.sin(p)))), r); });
}
const CHROMATE_3D = (() => {
  const d = 1.66 / Math.sqrt(3);
  const A = [['Cr', 0, 0, 0], ['O', d, d, d], ['O', -d, -d, d], ['O', -d, d, -d], ['O', d, -d, -d]];
  return { A, B: [[0, 1, 2], [0, 2, 2], [0, 3, 1], [0, 4, 1]] };
})();
const DICHROMATE_3D = (() => {
  const h = 63 * Math.PI / 180, crL = [-1.78 * Math.sin(h), -1.78 * Math.cos(h), 0], crR = [-crL[0], crL[1], 0];
  const A = [['O', 0, 0, 0], ['Cr', ...crL], ['Cr', ...crR]];
  const B = [[0, 1, 1], [0, 2, 1]];
  [[1, crL], [2, crR]].forEach(([i, c]) => corners(c, unit(c.map((x) => -x)), 1.66).forEach((p, k) => { A.push(['O', ...p]); B.push([i, A.length - 1, k < 2 ? 2 : 1]); }));
  return { A, B };
})();
const ION = {
  chromate: {
    formula: '\\text{CrO}_4^{\\;2-}', uni: 'CrO₄²⁻', count: '一个铬原子和四个氧原子',
    flat: [['Cr', 0, 0], ['O', 0, -1], ['O', 0, 1], ['O', -1, 0], ['O', 1, 0]], fb: [[0, 1, 2], [0, 2, 2], [0, 3, 1], [0, 4, 1]],
    ...CHROMATE_3D,
    shows: { struct: '铬酸根离子的结构式显示铬原子与四个氧原子相连，其中两个以双键相连。',
      ball: '铬酸根离子的球棍模型显示四个氧原子位于铬原子周围四面体的顶角。' },
  },
  dichromate: {
    formula: '\\text{Cr}_2\\text{O}_7^{\\;2-}', uni: 'Cr₂O₇²⁻', count: '两个铬原子和七个氧原子',
    flat: [['O', 0, 0], ['Cr', -1, 0], ['Cr', 1, 0], ['O', -1, -1], ['O', -1, 1], ['O', -2, 0], ['O', 1, -1], ['O', 1, 1], ['O', 2, 0]],
    fb: [[0, 1, 1], [0, 2, 1], [1, 3, 2], [1, 4, 2], [1, 5, 1], [2, 6, 2], [2, 7, 2], [2, 8, 1]],
    ...DICHROMATE_3D,
    shows: { struct: '重铬酸根离子的结构式显示两个铬原子通过一个共用的氧原子相连。',
      ball: '重铬酸根离子的球棍模型显示两个由氧原子构成的四面体共用一个顶角。' },
  },
};
const R_BALL = { Cr: 0.44, O: 0.34 };

/* =====================================================================
   Figure 2.32: chromate and dichromate, the two Cr(VI) ions of the note.
   The structural formula is the flat default the book teaches; the
   ball-and-stick model is a 3D scene mounted on the first switch. Still:
   an ion has no clock. Free orbit and idle spin, since an ion has no ground.
   ===================================================================== */
(function () {
  const d = sim('fig-chromate', 470);
  const I = F.choice(d.controls, { label: '\\text{离子}', options: [{ value: 'chromate', label: '铬酸根离子' }, { value: 'dichromate', label: '重铬酸根离子' }], value: 'chromate', aria: '选择哪种离子', onInput: show });
  const M = F.choice(d.controls, { label: '\\text{模型}', options: [{ value: 'struct', label: '结构式' }, { value: 'ball', label: '球棍模型' }], value: 'struct', aria: '离子的表示方式', onInput: show });
  let hits = [];
  F.hover(d.stage, () => (M.value === 'struct' ? hits : []));
  function draw2d() {
    const m = ION[I.value], { ctx } = begin(d.c); hits = [];
    headline(ctx, m.shows.struct);
    const L = 110, cx = 700, cy = 280;
    const P = m.flat.map((a) => [cx + a[1] * L, cy + a[2] * L]);
    m.fb.forEach(([i, j, o]) => bond2(ctx, P[i], P[j], o));
    m.flat.forEach((a, i) => { text(ctx, a[0], P[i][0], P[i][1], PAL.ink, { size: 40, align: 'center' }); hits.push({ x: P[i][0], y: P[i][1], r: 26, name: NAME[a[0]] + '原子' }); });
    const xs = P.map((p) => p[0]), ys = P.map((p) => p[1]);
    const x0 = Math.min(...xs) - 50, x1 = Math.max(...xs) + 50, y0 = Math.min(...ys) - 40, y1 = Math.max(...ys) + 40;
    [[x0, 1], [x1, -1]].forEach(([x, s]) => { line(ctx, x + 14 * s, y0, x, y0, PAL.ink, 3); line(ctx, x, y0, x, y1, PAL.ink, 3); line(ctx, x, y1, x + 14 * s, y1, PAL.ink, 3); });
    text(ctx, '2−', x1 + 12, y0 + 4, PAL.ink, { size: 30, align: 'left' });
  }
  let v = null, grp = null, sig = '';
  function mount() {
    v = F.view3d(d.stage, { spin: 'idle', views: [{ label: '正视', yaw: 0, pitch: 0 }, { label: '俯视', yaw: 0, pitch: 1.4 }], h: 420, dist: 10, tilt: 0.3 });
    grp = v.part(0);
  }
  function build() {
    const s = palSig() + I.value; if (s === sig) return; sig = s;
    const m = ION[I.value];
    v.clear();
    const sticks = new (T3().Group)(); grp.add(sticks);
    m.B.forEach(([i, j, o]) => F.mesh.bond(sticks, m.A[i].slice(1), m.A[j].slice(1), o, 0.07));
    m.A.forEach((a) => v.pickable(F.mesh.sphere(grp, a.slice(1), R_BALL[a[0]], F.el(a[0])), NAME[a[0]] + '原子'));
  }
  function draw3d() {
    build();
    v.headline(ION[I.value].shows.ball);
    v.invalidate();
  }
  function show() {
    const three = M.value !== 'struct';
    if (three && !v) mount();
    d.c.style.display = three ? 'none' : '';
    if (v) [v.wrap, d.stage.querySelector('.view3d-bar')].forEach((e) => { if (e) e.style.display = three ? '' : 'none'; });
    draw();
  }
  function draw() {
    const m = ION[I.value];
    if (M.value === 'struct') draw2d(); else draw3d();
    readout(d.readout, m.formula, `化学式 ${m.uni} 含有${m.count}，它们合起来带有 2− 的电荷；${M.value === 'struct' ? '结构式还表明它们是如何连接的' : '球棍模型还表明它们在空间中是如何排列的'}。`);
  }
  register(d.fig, { update: () => {}, draw });
})();
};
