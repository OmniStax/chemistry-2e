/* Figures for section 2.4 Chemical Formulas. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['2.4'] = function (root, F) {
const { el, tex, PAL, alpha, register, begin, line, text, headline } = F;
const sim = (id, H) => F.sim(root, id, H);
function readout(host, main, small) { tex(host, main); if (small) host.appendChild(el('small', null, small)); }
const TAU = 2 * Math.PI;
const lerp = (a, b, k) => a + (b - a) * k;
const NAME = { H: '氢', C: '碳', O: '氧', S: '硫' };
/* an atom as a disc in its element's colour; hydrogen is light and takes an ink outline so that it reads on a light page */
function atom(ctx, x, y, sym, r) {
  ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fillStyle = F.el(sym); ctx.fill();
  ctx.lineWidth = sym === 'H' ? 2 : 1.2; ctx.strokeStyle = sym === 'H' ? PAL.ink : alpha(PAL.ink, 0.4); ctx.stroke(); ctx.restore();
}
/* a bond of a structural formula between two lettered atoms: one, two or three strokes, trimmed clear of the letters */
function bond2(ctx, a, b, order, color = PAL.ink, gap = 26) {
  const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy); if (L < 2 * gap + 4) return;
  const ux = dx / L, uy = dy / L, nx = -uy, ny = ux;
  const offs = order === 1 ? [0] : order === 2 ? [-5, 5] : [-8, 0, 8];
  offs.forEach((o) => line(ctx, a[0] + ux * gap + nx * o, a[1] + uy * gap + ny * o, b[0] - ux * gap + nx * o, b[1] - uy * gap + ny * o, color, 3));
}

/* ---------- the molecules ----------
   Structural formulas in bond lengths (x right, y down), and 3D coordinates in ångströms from the
   PubChem conformers (methane CID 297, benzene 241, acetic acid 176, methyl formate 7865, carvone 16724),
   centred on their mean. S₈ is a crown of 2.05 Å bonds with angles near 108°. */
const MOL = {
  methane: {
    formula: '\\text{CH}_4', uni: 'CH₄', count: '一个碳原子和四个氢原子',
    flat: [['C', 0, 0], ['H', 0, -1], ['H', -1, 0], ['H', 1, 0], ['H', 0, 1]], fb: [[0, 1, 1], [0, 2, 1], [0, 3, 1], [0, 4, 1]],
    A: [['C', 0, 0, 0], ['H', 0.55, 0.8, 0.5], ['H', 0.68, -0.81, -0.25], ['H', -0.78, -0.37, 0.67], ['H', -0.46, 0.39, -0.91]],
    B: [[0, 1, 1], [0, 2, 1], [0, 3, 1], [0, 4, 1]],
    dist: 14, views: [{ label: '正视', yaw: 0, pitch: 0 }, { label: '俯视', yaw: 0, pitch: 1.4 }],
    shows: { struct: '甲烷的结构式显示碳原子与四个氢原子各成一键。',
      ball: '甲烷的球棍模型显示四个氢原子均匀地分布在碳原子周围。',
      space: '甲烷的空间填充模型显示氢原子有一部分埋在较大的碳原子之中。' },
  },
  sulfur: {
    formula: '\\text{S}_8', uni: 'S₈', count: '八个硫原子',
    flat: [0, 1, 2, 3, 4, 5, 6, 7].map((k) => ['S', 1.31 * Math.cos((k + 0.5) * TAU / 8), 1.31 * Math.sin((k + 0.5) * TAU / 8)]),
    fb: [0, 1, 2, 3, 4, 5, 6, 7].map((k) => [k, (k + 1) % 8, 1]),
    A: [['S', 2.3, 0, -0.53], ['S', 1.62, 1.62, 0.53], ['S', 0, 2.3, -0.53], ['S', -1.62, 1.62, 0.53], ['S', -2.3, 0, -0.53], ['S', -1.62, -1.62, 0.53], ['S', 0, -2.3, -0.53], ['S', 1.62, -1.62, 0.53]],
    B: [0, 1, 2, 3, 4, 5, 6, 7].map((k) => [k, (k + 1) % 8, 1]),
    dist: 24, views: [{ label: '俯视', yaw: 0, pitch: 0 }, { label: '侧视', yaw: 0, pitch: 1.45 }],
    shows: { struct: '硫的结构式把它的八个原子画成一个平面环。',
      ball: 'S₈ 的球棍模型显示这个环折皱成王冠形。',
      space: 'S₈ 的空间填充模型显示每个硫原子有一部分埋在与它相邻的两个原子之中。' },
  },
  benzene: {
    formula: '\\text{C}_6\\text{H}_6', uni: 'C₆H₆', count: '六个碳原子和六个氢原子',
    flat: [0, 1, 2, 3, 4, 5].map((k) => ['C', Math.cos(-Math.PI / 2 + k * TAU / 6), Math.sin(-Math.PI / 2 + k * TAU / 6)])
      .concat([0, 1, 2, 3, 4, 5].map((k) => ['H', 1.95 * Math.cos(-Math.PI / 2 + k * TAU / 6), 1.95 * Math.sin(-Math.PI / 2 + k * TAU / 6)])),
    fb: [0, 1, 2, 3, 4, 5].map((k) => [k, (k + 1) % 6, k % 2 ? 1 : 2]).concat([0, 1, 2, 3, 4, 5].map((k) => [k, k + 6, 1])),
    A: [['C', -1.21, -0.69, 0], ['C', -1.2, 0.71, 0], ['C', -0.01, -1.39, 0], ['C', 0.01, 1.39, 0], ['C', 1.2, -0.71, 0], ['C', 1.21, 0.69, 0], ['H', -2.16, -1.22, 0], ['H', -2.14, 1.26, 0], ['H', -0.02, -2.48, 0], ['H', 0.02, 2.48, 0], ['H', 2.14, -1.26, 0], ['H', 2.16, 1.22, 0]],
    B: [[0, 1, 2], [0, 2, 1], [0, 6, 1], [1, 3, 1], [1, 7, 1], [2, 4, 2], [2, 8, 1], [3, 5, 2], [3, 9, 1], [4, 5, 1], [4, 10, 1], [5, 11, 1]],
    dist: 26, views: [{ label: '环面', yaw: 0, pitch: 0 }, { label: '环边', yaw: 0, pitch: 1.5 }],
    shows: { struct: '苯的结构式显示由六个碳原子组成的环，每个碳原子与一个氢原子成键。',
      ball: '苯的球棍模型显示全部十二个原子位于同一平面。',
      space: '苯的空间填充模型显示大部分空间被碳原子占据。' },
  },
  acetic: {
    formula: '\\text{C}_2\\text{H}_4\\text{O}_2', uni: 'C₂H₄O₂', count: '两个碳原子、四个氢原子和两个氧原子',
    flat: [['C', -1, 0], ['H', -2, 0], ['H', -1, -1], ['H', -1, 1], ['C', 0, 0], ['O', 0, -1], ['O', 1, 0], ['H', 2, 0]],
    fb: [[0, 1, 1], [0, 2, 1], [0, 3, 1], [0, 4, 1], [4, 5, 2], [4, 6, 1], [6, 7, 1]],
    A: [['O', -0.8, 1.26, 0], ['O', -1.47, -0.91, 0], ['C', 0.88, -0.38, 0], ['C', -0.58, -0.07, 0], ['H', 1.34, 0.03, -0.9], ['H', 1.35, 0.04, 0.9], ['H', 1.03, -1.46, 0.01], ['H', -1.75, 1.48, 0]],
    B: [[0, 3, 1], [0, 7, 1], [1, 3, 2], [2, 3, 1], [2, 4, 1], [2, 5, 1], [2, 6, 1]],
    dist: 19, views: [{ label: '正视', yaw: 0, pitch: 0 }, { label: '侧视', yaw: 1.57, pitch: 0 }],
    shows: { struct: '乙酸的结构式显示第二个碳原子与两个氧原子都成键，其中一个是双键。',
      ball: '乙酸的球棍模型显示它的八个原子在空间中的排列。',
      space: '乙酸的空间填充模型显示它的各原子的相对大小。' },
  },
};
const R_BALL = { H: 0.26, C: 0.38, O: 0.36, S: 0.46 }, R_VDW = { H: 1.1, C: 1.6, O: 1.45, S: 1.7 };
const MODEL_WORD = { struct: '结构式', ball: '球棍模型', space: '空间填充模型' };
const T3 = () => window.THREE;
/* the signature of everything a scene's colours are read from, so a theme change rebuilds it */
const palSig = () => [PAL.ink, PAL.panel, PAL.muted, F.el('C'), F.el('H'), F.el('O'), F.el('S')].join('|');

/* =====================================================================
   Figures 2.16, 2.17, 2.20, 2.21: one molecule three ways. The structural
   formula is the flat drawing the book teaches and the default; the two
   models are one 3D scene mounted on the first switch, where the balls
   swell into the space-filling model and the sticks fade as they are
   buried. Still: a molecule has no clock. Free orbit and idle spin, since
   a molecule has no ground.
   ===================================================================== */
function represent(id, key) {
  const m = MOL[key], d = sim(id, 500);
  const M = F.choice(d.controls, { label: '\\text{模型}', options: [{ value: 'struct', label: '结构式' }, { value: 'ball', label: '球棍模型' }, { value: 'space', label: '空间填充模型' }], value: 'struct', aria: '分子的表示方式', onInput: show });
  let hits = [];
  F.hover(d.stage, () => (M.value === 'struct' ? hits : []));
  /* the flat drawing, scaled so that the widest molecule fits */
  function draw2d() {
    const { ctx } = begin(d.c); hits = [];
    headline(ctx, m.shows.struct);
    const xs = m.flat.map((a) => a[1]), ys = m.flat.map((a) => a[2]);
    const L = Math.min(130, 900 / (Math.max(...xs) - Math.min(...xs) + 1), 360 / (Math.max(...ys) - Math.min(...ys) + 0.4));
    const cx = 700 - L * (Math.max(...xs) + Math.min(...xs)) / 2, cy = 285 - L * (Math.max(...ys) + Math.min(...ys)) / 2;
    const P = m.flat.map((a) => [cx + a[1] * L, cy + a[2] * L]);
    const size = Math.min(40, L * 0.4);
    m.fb.forEach(([i, j, o]) => bond2(ctx, P[i], P[j], o, PAL.ink, size * 0.62));
    m.flat.forEach((a, i) => { text(ctx, a[0], P[i][0], P[i][1], PAL.ink, { size, align: 'center' }); hits.push({ x: P[i][0], y: P[i][1], r: size * 0.6, name: NAME[a[0]] + '原子' }); });
  }
  let v = null, grp = null, sticks = null, balls = [], sig = '';
  function mount() {
    v = F.view3d(d.stage, { spin: 'idle', views: m.views, h: 420, dist: m.dist, tilt: 0.3 });
    grp = v.part(0);
  }
  function build() {
    const s = palSig(); if (s === sig) return; sig = s;
    v.clear(); balls = [];
    sticks = new (T3().Group)(); grp.add(sticks);
    m.B.forEach(([i, j, o]) => F.mesh.bond(sticks, m.A[i].slice(1), m.A[j].slice(1), o, 0.07));
    m.A.forEach((a) => { const b = F.mesh.sphere(grp, a.slice(1), R_BALL[a[0]], F.el(a[0])); v.pickable(b, NAME[a[0]] + '原子'); balls.push([b, a[0]]); });
  }
  function draw3d() {
    build();
    const k = M.mix((x) => (x === 'space' ? 1 : 0));
    balls.forEach(([b, s]) => b.scale.setScalar(lerp(R_BALL[s], R_VDW[s], k)));
    F.fade3(sticks, 1 - k);
    v.headline(m.shows[M.value]);
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
    if (M.value === 'struct') draw2d(); else draw3d();
    readout(d.readout, m.formula, `分子式 ${m.uni} 表示有${m.count}；${MODEL_WORD[M.value]}则${M.value === 'struct' ? '补充了它们是如何连接的' : M.value === 'ball' ? '补充了它们在空间中是如何排列的' : '补充了它们的相对大小'}。`);
  }
  register(d.fig, { update: () => {}, draw });
}
represent('fig-methane', 'methane');
represent('fig-sulfur', 'sulfur');
represent('fig-benzene', 'benzene');
represent('fig-acetic', 'acetic');

/* =====================================================================
   Figure 2.18: H, 2H, H₂ and 2H₂. Two choices write the number in front
   and the subscript; the atoms slide together into molecules or apart
   into separate units as the choices change. Still: no clock.
   ===================================================================== */
(function () {
  const d = sim('fig-hydrogen', 400);
  const opts = [{ value: '1', label: '无' }, { value: '2', label: '2' }];
  const Cf = F.choice(d.controls, { label: '\\text{前面的数字}', options: opts, value: '2', aria: '写在符号前面的数字' });
  const Sb = F.choice(d.controls, { label: '\\text{下标}', options: opts, value: '2', aria: '写在符号后面的下标' });
  const Y = 250, UNIT = 320, BOND = 76, R = 30;
  /* four atom slots, (unit, place in unit); each is [x, opacity], and a bond per unit carries its own opacity */
  function layout(c, s) {
    const out = [];
    for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) {
      const ii = Math.min(i, c - 1), jj = Math.min(j, s - 1), ux = 700 + (ii - (c - 1) / 2) * UNIT;
      out.push(ux + (jj - (s - 1) / 2) * BOND, i < c && j < s ? 1 : 0);
    }
    for (let i = 0; i < 2; i++) out.push(i < c && s === 2 ? 1 : 0);
    return out;
  }
  const HEAD = { '1,1': 'H 是一个氢原子。', '2,1': '2H 是两个单独的氢原子，没有结合成一个整体。',
    '1,2': 'H₂ 是由两个氢原子结合在一起的一个分子。', '2,2': '2H₂ 是两个 H₂ 分子，共四个氢原子。' };
  const UNITWORD = { 1: '一个 H 原子', 2: '一个 H₂ 分子' };
  let hits = [];
  F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c); hits = [];
    const c = +Cf.value, s = +Sb.value;
    headline(ctx, HEAD[c + ',' + s]);
    const L = Cf.mix((cv) => Sb.mix((sv) => layout(+cv, +sv)));
    for (let i = 0; i < 2; i++) {
      const a = L[2 * (2 * i) + 1] > 0 ? L[8 + i] : 0;
      if (a > 0.01) F.faded(ctx, a, [0, 0], () => line(ctx, L[2 * (2 * i)], Y, L[2 * (2 * i + 1)], Y, PAL.ink, 8));
    }
    for (let n = 0; n < 4; n++) {
      const x = L[2 * n], a = L[2 * n + 1];
      if (a > 0.01) F.faded(ctx, a, [0, 0], () => atom(ctx, x, Y, 'H', R));
      if (a > 0.5) hits.push({ x, y: Y, r: R + 3, name: '氢原子' });
    }
    const formula = (c === 2 ? '2' : '') + 'H' + (s === 2 ? '_2' : '');
    text(ctx, formula, 700, 140, PAL.ink, { size: 56, weight: 600, align: 'center' });
    for (let i = 0; i < c; i++) text(ctx, UNITWORD[s], 700 + (i - (c - 1) / 2) * UNIT, Y + 72, PAL.muted, { size: 19, align: 'center' });
    readout(d.readout, `\\text{氢原子} = ${c} \\times ${s} = ${c * s}`);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   Sim: from a molecular formula to an empirical formula. The atoms of one
   molecule stand in rows by element; a story slider deals them, like cards,
   into as many identical groups as the counts allow, and each group is the
   empirical formula. The story has no clock of its own; the compound is a
   choice. Examples the exercises and the Check Your Learning ask about
   are left out.
   ===================================================================== */
(function () {
  const d = sim('sim-empirical', 500);
  const CMP = {
    methane: { name: '甲烷', n: { C: 1, H: 4 }, mol: 'CH_{4}', uni: 'CH₄', tex: '\\text{CH}_4' },
    benzene: { name: '苯', n: { C: 6, H: 6 }, mol: 'C_{6}H_{6}', uni: 'C₆H₆', tex: '\\text{C}_6\\text{H}_6' },
    acetic: { name: '乙酸', n: { C: 2, H: 4, O: 2 }, mol: 'C_{2}H_{4}O_{2}', uni: 'C₂H₄O₂', tex: '\\text{C}_2\\text{H}_4\\text{O}_2' },
    glucose: { name: '葡萄糖', n: { C: 6, H: 12, O: 6 }, mol: 'C_{6}H_{12}O_{6}', uni: 'C₆H₁₂O₆', tex: '\\text{C}_6\\text{H}_{12}\\text{O}_6' },
  };
  const gcd = (a, b) => (b ? gcd(b, a % b) : a);
  const sub = (s, n, u) => (n === 1 ? s : s + (u ? String(n).split('').map((c) => '₀₁₂₃₄₅₆₇₈₉'[+c]).join('') : `_{${n}}`));
  const fmt = (n, u) => Object.entries(n).map(([s, k]) => sub(s, k, u)).join('');
  const texOf = (n) => Object.entries(n).map(([s, k]) => (k === 1 ? `\\text{${s}}` : `\\text{${s}}_{${k}}`)).join('');
  const K = F.choice(d.controls, { label: '\\text{化合物}', options: Object.keys(CMP).map((k) => ({ value: k, label: CMP[k].name })), value: 'acetic', aria: '化合物' });
  const st = F.ctl(d.controls, { label: '\\text{步骤}', cls: '', min: 0, max: 1, step: 0.01, value: 0, unit: '', aria: '从分子到最简比' });
  F.story(d, st, { stops: [{ v: 0, label: '分子' }, { v: 1, label: '最简比' }] });
  const RA = { C: 17, H: 13, O: 16 };
  let hits = [];
  F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c); hits = [];
    const c = CMP[K.value], els = Object.keys(c.n), g = els.map((s) => c.n[s]).reduce(gcd), emp = Object.fromEntries(els.map((s) => [s, c.n[s] / g]));
    const k = F.ease.smooth(st.v);
    headline(ctx, g === 1 ? `${c.uni} 不能分成更小的相同的组，所以它的实验式就是 ${c.uni} 本身。` : `${c.uni} 分成 ${g} 个相同的组，每组为 ${fmt(emp, true)}，即它的实验式。`);
    /* the groups: g boxes across the canvas, each holding one empirical unit in rows by element */
    const bw = Math.min(230, (1240 - (g - 1) * 18) / g), bx0 = 700 - (g * bw + (g - 1) * 18) / 2, by0 = 130, bh = 250;
    const rows = els.length, rowY = (r) => by0 + 40 + r * (bh - 80) / Math.max(1, rows - 1);
    F.faded(ctx, k, [0, 0], () => {
      for (let i = 0; i < g; i++) {
        const x = bx0 + i * (bw + 18);
        ctx.save(); ctx.strokeStyle = PAL.muted; ctx.lineWidth = 2.5; ctx.setLineDash([8, 6]); ctx.beginPath(); ctx.roundRect(x, by0, bw, bh, 12); ctx.stroke(); ctx.restore();
        text(ctx, fmt(emp), x + bw / 2, by0 + bh + 30, PAL.ink, { size: bw < 120 ? 20 : 26, weight: 600, align: 'center' });
      }
    });
    F.faded(ctx, 1 - k, [0, 0], () => els.forEach((s, r) => text(ctx, sub(s, c.n[s]), 150, rowY(r), PAL.ink, { size: 28, weight: 600, align: 'right' })));
    /* the atoms: in rows at the start, dealt atom k of an element into group k mod g at the end */
    F.faded(ctx, K.k, [0, 0], () => els.forEach((s, r) => {
      const n = c.n[s], per = n / g, rowGap = Math.min(64, 1100 / n);
      for (let a = 0; a < n; a++) {
        const x0 = 200 + a * rowGap, y0 = rowY(r);
        const gi = a % g, slot = Math.floor(a / g), sp = Math.min(34, (bw - 30) / per);
        const x1 = bx0 + gi * (bw + 18) + bw / 2 + (slot - (per - 1) / 2) * sp, y1 = rowY(r);
        const x = lerp(x0, x1, k), y = y0 + Math.sin(Math.PI * k) * (gi % 2 ? -1 : 1) * 12;
        atom(ctx, x, y, s, Math.min(RA[s], sp / 2 + 2));
        hits.push({ x, y, r: RA[s] + 3, name: NAME[s] + '原子' });
      }
    }));
    text(ctx, c.mol, 700, by0 + bh + 80, PAL.muted, { size: 22, align: 'center' });
    const ratio = (n) => els.map((s) => n[s]).join(':');
    readout(d.readout, `${c.tex} = ${g === 1 ? '' : g + ' \\times '}${texOf(emp)}`, `原子数之比 ${ratio(c.n)}${g === 1 ? ' 没有公因数，所以它已经是最简整数比。' : `，除以 ${g} 后得到最简整数比 ${ratio(emp)}。`}`);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   Figure 2.23: acetic acid and methyl formate. The same eight atoms keep
   their identities as the compound changes; the second carbon atom and
   the singly bonded oxygen atom trade places and the bonds that differ
   fade out and in. Still: the change fires on the choice.
   ===================================================================== */
(function () {
  const d = sim('fig-isomers', 440);
  /* atoms: C1, H, H, H, C2, O (double), O (single), H */
  const SYM = ['C', 'H', 'H', 'H', 'C', 'O', 'O', 'H'];
  const POS = {
    acetic: [[-1, 0], [-2, 0], [-1, -1], [-1, 1], [0, 0], [0, -1], [1, 0], [2, 0]],
    formate: [[-1, 0], [-2, 0], [-1, -1], [-1, 1], [1, 0], [1, -1], [0, 0], [2, 0]],
  };
  const BONDS = {
    acetic: [[0, 1, 1], [0, 2, 1], [0, 3, 1], [4, 5, 2], [0, 4, 1], [4, 6, 1], [6, 7, 1]],
    formate: [[0, 1, 1], [0, 2, 1], [0, 3, 1], [4, 5, 2], [0, 6, 1], [6, 4, 1], [4, 7, 1]],
  };
  const same = (a, b) => (a[0] === b[0] && a[1] === b[1]) || (a[0] === b[1] && a[1] === b[0]);
  const I = F.choice(d.controls, { label: '\\text{化合物}', options: [{ value: 'acetic', label: '乙酸' }, { value: 'formate', label: '甲酸甲酯' }], value: 'acetic', aria: '哪一种异构体', ms: 1200 });
  const HEAD = { acetic: '在乙酸中，第二个碳原子与两个氧原子都成键。', formate: '在甲酸甲酯中，有一个氧原子位于两个碳原子之间。' };
  let hits = [];
  F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c); hits = [];
    headline(ctx, HEAD[I.value]);
    const L = 125, cx = 700, cy = 250;
    const flat = I.mix((v) => POS[v].flat());
    const P = SYM.map((_, i) => [cx + flat[2 * i] * L, cy + flat[2 * i + 1] * L]);
    /* the carbon and the oxygen that trade places pass on arcs, one above the bond line and one below, not through each other */
    const lift = I.k < 1 ? Math.sin(Math.PI * I.k) * 60 : 0;
    P[4][1] -= lift; P[6][1] += lift;
    ['acetic', 'formate'].forEach((v) => {
      const other = v === 'acetic' ? 'formate' : 'acetic';
      BONDS[v].forEach((b) => {
        const shared = BONDS[other].some((q) => same(q, b));
        if (shared) { if (v === 'acetic') bond2(ctx, P[b[0]], P[b[1]], b[2]); return; }
        const a = I.a(v); if (a > 0.01) F.faded(ctx, a, [0, 0], () => bond2(ctx, P[b[0]], P[b[1]], b[2]));
      });
    });
    SYM.forEach((s, i) => { text(ctx, s, P[i][0], P[i][1], PAL.ink, { size: 40, align: 'center' }); hits.push({ x: P[i][0], y: P[i][1], r: 24, name: NAME[s] + '原子' }); });
    text(ctx, I.value === 'acetic' ? '乙酸' : '甲酸甲酯', cx, cy + 180, PAL.muted, { size: 22, align: 'center' });
    readout(d.readout, '\\text{C}_2\\text{H}_4\\text{O}_2');
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   Figure 2.24: the carvone mirror pair, in three dimensions only, as the
   book's rule for this pair asks. S-(+)-carvone on the left, and on the
   right its reflection in the plane between them, R-(−)-carvone. Still:
   the two are turned together, so the mirror relation holds in every
   view. Free orbit and idle spin, since a molecule has no ground.
   ===================================================================== */
(function () {
  const d = sim('fig-carvone');
  const A = [['O', 2.37, -2.06, 0.02], ['C', -0.65, -0.1, -0.28], ['C', 0.15, -1.23, 0.38], ['C', -0.12, 1.26, 0.17], ['C', -2.11, -0.23, 0.03], ['C', 1.63, -1.07, 0.1], ['C', 1.37, 1.35, 0.06], ['C', 2.2, 0.3, 0], ['C', -3.02, -0.43, -1.15], ['C', 3.69, 0.44, -0.14], ['C', -2.58, -0.18, 1.28], ['H', -0.5, -0.18, -1.36], ['H', -0.17, -2.19, -0.02], ['H', 0.03, -1.25, 1.47], ['H', -0.4, 1.51, 1.2], ['H', -0.57, 2.04, -0.47], ['H', 1.78, 2.36, 0.03], ['H', -2.93, 0.42, -1.84], ['H', -2.75, -1.34, -1.69], ['H', -4.07, -0.52, -0.86], ['H', 4.03, -0.05, -1.06], ['H', 4.19, -0.03, 0.71], ['H', 4, 1.49, -0.18], ['H', -3.64, -0.27, 1.48], ['H', -1.93, -0.04, 2.14]];
  const B = [[0, 5, 2], [1, 2, 1], [1, 3, 1], [1, 4, 1], [1, 11, 1], [2, 5, 1], [2, 12, 1], [2, 13, 1], [3, 6, 1], [3, 14, 1], [3, 15, 1], [4, 8, 1], [4, 10, 2], [5, 7, 1], [6, 7, 2], [6, 16, 1], [7, 9, 1], [8, 17, 1], [8, 18, 1], [8, 19, 1], [9, 20, 1], [9, 21, 1], [9, 22, 1], [10, 23, 1], [10, 24, 1]];
  /* the S molecule turned a quarter about y so that it faces the reader, then set left of the mirror; the R molecule is its reflection */
  const GAP = 5.2;
  const S = A.map(([s, x, y, z]) => [s, -z - GAP, y, x]);
  const Rm = S.map(([s, x, y, z]) => [s, -x, y, z]);
  const v = F.view3d(d.stage, { spin: 'idle', h: 440, dist: 24, tilt: 0.2, views: [{ label: '面对镜面', yaw: 0, pitch: 0 }, { label: '俯视', yaw: 0, pitch: 1.4 }, { label: '沿镜面', yaw: 1.57, pitch: 0 }] });
  const g = v.part(0);
  let sig = '';
  function molecule(atoms, which) {
    B.forEach(([i, j, o]) => F.mesh.bond(g, atoms[i].slice(1), atoms[j].slice(1), o, 0.07));
    atoms.forEach((a, i) => v.pickable(F.mesh.sphere(g, a.slice(1), R_BALL[a[0]], F.el(a[0])), NAME[a[0]] + '原子，属于 ' + which + (i === 1 ? '；它是环上的碳原子，四个键在两种异构体中的指向不同' : '')));
  }
  function build() {
    const s = palSig(); if (s === sig) return; sig = s;
    v.clear();
    const T = T3(), plane = new T.Mesh(new T.PlaneGeometry(9, 9), F.mesh.mat(PAL.ink, { transparent: true, opacity: 0.07, depthWrite: false, side: T.DoubleSide }));
    plane.rotation.y = Math.PI / 2; g.add(plane);
    molecule(S, 'S-(+)-香芹酮'); molecule(Rm, 'R-(−)-香芹酮');
    /* the names sit below and in front of each molecule, so that seen from above they fall clear of it too */
    v.label('<em>S</em>-(+)-香芹酮', [-GAP, -4.2, 4.6], g); v.label('<em>R</em>-(−)-香芹酮', [GAP, -4.2, 4.6], g);
  }
  function draw() {
    if (!v.scene) return;
    build();
    v.headline('<em>S</em>-(+)-香芹酮闻起来像葛缕子，<em>R</em>-(−)-香芹酮闻起来像留兰香，二者互为镜像。');
    v.invalidate();
    readout(d.readout, '\\text{C}_{10}\\text{H}_{14}\\text{O}');
  }
  register(d.fig, { update: () => {}, draw });
})();
};
