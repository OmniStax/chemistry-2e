/* Figures for section 7.1 Ionic Bonding. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['7.1'] = function (root, F) {
const { el, tex, PAL, alpha, register, begin, text, topline } = F;
const sim = (id, H) => F.sim(root, id, H);
const still = (d, draw) => register(d.fig, { update: () => {}, draw });
function readout(host, main, small) { tex(host, main); if (small) host.appendChild(el('small', null, small)); }
const TAU = 2 * Math.PI;
const gcd = (a, b) => (b ? gcd(b, a % b) : a);
const SUP = { 1: '', 2: '²', 3: '³' };
const charge = (z) => `${SUP[Math.abs(z)]}${z > 0 ? '⁺' : '⁻'}`;
const mark = (z) => `${Math.abs(z) === 1 ? '' : Math.abs(z)}${z > 0 ? '+' : '−'}`;
const count = (n, noun) => `${['', '一', '两', '三'][n]}个${noun}`;

/* =====================================================================
   SIM: the charge balance of a binary ionic compound. A cation and an
   anion are chosen; the smallest numbers of each whose charges cancel
   are drawn as ions in their element colors, each carrying its charge,
   and the readout writes the book's sum for aluminum oxide with the
   chosen numbers. Still: it answers its choices and has no clock.
===================================================================== */
(function () {
  const d = sim('sim-charge-balance', 420);
  /* ionic radii in pm, which set the drawn sizes */
  const CATIONS = {
    Na: { z: 1, r: 102, name: '钠' }, K: { z: 1, r: 138, name: '钾' },
    Mg: { z: 2, r: 72, name: '镁' }, Ca: { z: 2, r: 100, name: '钙' },
    Al: { z: 3, r: 54, name: '铝' }, Fe: { z: 3, r: 65, name: '铁(III)' },
  };
  const ANIONS = {
    Cl: { z: -1, r: 181, name: '氯' }, O: { z: -2, r: 140, name: '氧' },
    S: { z: -2, r: 184, name: '硫' }, N: { z: -3, r: 146, name: '氮' },
  };
  const cat = F.select(d.controls, { label: '\\text{阳离子}', aria: '金属离子', value: 'Al', options: Object.keys(CATIONS).map((s) => ({ value: s, label: s + charge(CATIONS[s].z) })), onInput: () => draw() });
  const an = F.choice(d.controls, { label: '\\text{阴离子}', aria: '非金属离子', value: 'O', options: Object.keys(ANIONS).map((s) => ({ value: s, label: s + charge(ANIONS[s].z) })), onInput: () => draw() });
  const K = 0.34, GAP = 170, X0 = 470;
  const hits = [];
  F.hover(d.stage, () => hits);
  function row(ctx, sym, ion, n, y, kind) {
    const r = ion.r * K;
    text(ctx, `${sym}${charge(ion.z)}`, 250, y, PAL.ink, { size: 26, weight: 600, align: 'center', base: 'middle' });
    for (let i = 0; i < n; i++) {
      const x = X0 + GAP * i;
      ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fillStyle = F.el(sym); ctx.fill();
      ctx.lineWidth = 1.5; ctx.strokeStyle = alpha(PAL.ink, 0.45); ctx.stroke(); ctx.restore();
      text(ctx, mark(ion.z), x + r * 0.72 + 6, y - r * 0.72 - 4, PAL.ink, { size: 20, weight: 600, align: 'left', base: 'middle' });
      hits.push({ x, y, r, name: `${kind}${ion.name}离子（${sym}${charge(ion.z)}）` });
    }
    const q = n * ion.z;
    text(ctx, `${q > 0 ? '+' : '−'}${Math.abs(q)}`, 1170, y, PAL.ink, { size: 26, weight: 600, align: 'center', base: 'middle' });
  }
  function draw() {
    const { ctx } = begin(d.c);
    const c = CATIONS[cat.value], a = ANIONS[an.value], m = c.z, n = -a.z, g = gcd(m, n);
    const nc = n / g, na = m / g;
    hits.length = 0;
    topline(ctx, `${count(nc, `${c.name}离子`)}带 ${nc * m} 个正电荷，${count(na, `${a.name}离子`)}带同样多的负电荷。`);
    text(ctx, '总电荷', 1170, 96, PAL.muted, { size: 17, align: 'center' });
    row(ctx, cat.value, c, nc, 170, '阳离子，');
    row(ctx, an.value, a, na, 320, '阴离子，');
    const sub = (k) => (k > 1 ? `_{${k}}` : '');
    const formula = `\\text{${cat.value}}${sub(nc)}\\text{${an.value}}${sub(na)}`;
    readout(d.readout, `(${nc} \\times +${m}) + (${na} \\times -${n}) = 0 \\qquad ${formula}`);
  }
  still(d, draw);
})();

/* =====================================================================
   FIGURE 7.3: the sodium chloride lattice in three dimensions, 27 ions
   of a 3 × 3 × 3 block, chloride at the corners and face centers and
   sodium between them. Panels (a) packed and (b) expanded are one
   choice, a morph of spacing and size with the rods fading in. Still:
   the viewer's idle spin is not a clock, and there is no transport.
===================================================================== */
(function () {
  const d = sim('sim-nacl-lattice');
  /* free yaw; pitch bounded so the rows of the crystal stay readable (rule 26.3) */
  const v = F.view3d(d.stage, { spin: 'idle', h: 440, dist: 11, tilt: 0.42, pitch: [-0.9, 0.9],
    views: [{ label: '正面', yaw: 0, pitch: 0 }, { label: '顶角', yaw: Math.PI / 4, pitch: 0.6155 }] });
  const g = v.part(0);
  /* ionic radii 102 and 181 pm over an Na–Cl distance of 283 pm, one drawn unit */
  const RNA = 102 / 283, RCL = 181 / 283;
  const P = F.choice(d.controls, { label: '\\text{视图}', aria: '紧密堆积或展开', value: 'a',
    options: [{ value: 'a', label: '（a）紧密堆积' }, { value: 'b', label: '（b）展开' }], onInput: () => { v.glide({ zoom: P.value === 'a' ? 1 : 0.62 }, 900); draw(); } });
  const ions = [];
  for (let i = -1; i <= 1; i++) for (let j = -1; j <= 1; j++) for (let k = -1; k <= 1; k++) ions.push({ q: [i, j, k], na: (i + j + k) % 2 === 0 });
  const links = [];
  ions.forEach((a, ia) => ions.forEach((b, ib) => { if (ib > ia && Math.abs(a.q[0] - b.q[0]) + Math.abs(a.q[1] - b.q[1]) + Math.abs(a.q[2] - b.q[2]) === 1) links.push([ia, ib]); }));
  function draw() {
    const s = P.mix((x) => (x === 'a' ? 1 : 1.9)), k = P.mix((x) => (x === 'a' ? 1 : 0.42)), rods = P.a('b');
    v.clear();
    const pos = (ion) => ion.q.map((c) => c * s);
    if (rods > 0.01) links.forEach(([a, b]) => F.mesh.stick(g, pos(ions[a]), pos(ions[b]), 0.045, PAL.muted, rods < 1 ? { transparent: true, opacity: rods } : undefined));
    ions.forEach((ion) => {
      const m = F.mesh.sphere(g, pos(ion), (ion.na ? RNA : RCL) * k, F.el(ion.na ? 'Na' : 'Cl'));
      v.pickable(m, ion.na ? '钠离子（Na⁺）' : '氯离子（Cl⁻）');
    });
    v.label('Na⁺', pos(ions.find((x) => x.q.join() === '0,1,1')), g, 30 * k);
    v.label('Cl⁻', pos(ions.find((x) => x.q.join() === '1,1,1')), g, 40 * k);
    readout(d.readout, '\\text{每个 Na}^{+}\\text{ 周围有 }6\\ \\text{个 Cl}^{-}, \\quad \\text{每个 Cl}^{-}\\text{ 周围有 }6\\ \\text{个 Na}^{+}, \\quad \\text{Na}^{+} : \\text{Cl}^{-} = 1 : 1',
      P.value === 'a' ? '像在晶体中那样紧密堆积时，每个离子都与其周围六个带相反电荷的离子接触，没有哪一对离子单独构成一个分子。'
        : '分开之后，连杆把每个离子与它最近的六个带相反电荷的邻近离子连接起来，这六个离子分别位于它的上方和下方、前方和后方，以及左右两侧。');
  }
  still(d, draw);
})();
};
