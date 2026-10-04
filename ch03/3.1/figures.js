/* Figures for section 3.1 Formula Mass and the Mole Concept. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['3.1'] = function (root, F) {
const { el, tex, C, PAL, alpha, ctl, register, begin, line, text, headline } = F;
const sim = (id, H) => F.sim(root, id, H);
function readout(host, main, small) { tex(host, main); if (small) host.appendChild(el('small', null, small)); }
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;
const TAU = 2 * Math.PI;
const T3 = () => window.THREE;

/* ---------- numbers to s significant figures, in exponent form outside 0.001 to 10 000 ---------- */
const SUP = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
function parts(x, s) {
  const e = Math.floor(Math.log10(Math.abs(x)));
  if (e >= -3 && e < 4) return { m: Number(x.toPrecision(s)).toFixed(Math.max(0, s - 1 - e)), e: 0 };
  let m = Number((x / 10 ** e).toPrecision(s)), k = e;
  if (m >= 10) { m /= 10; k += 1; }
  return { m: m.toFixed(s - 1), e: k };
}
const sciTex = (x, s) => { const p = parts(x, s); return p.e ? `${p.m}\\times 10^{${p.e}}` : p.m; };
const sciTxt = (x, s) => { const p = parts(x, s); return p.e ? `${p.m} × 10${String(p.e).split('').map((c) => SUP[c]).join('')}` : p.m; };

const NAME = { H: 'hydrogen atom', C: 'carbon atom', O: 'oxygen atom', Cl: 'chlorine atom', Na: 'sodium atom' };
/* an atom as a disc in its element's colour; hydrogen is light and takes an ink outline so that it reads on a light page */
function atom(ctx, x, y, sym, r) {
  ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fillStyle = F.el(sym); ctx.fill();
  ctx.lineWidth = sym === 'H' ? 2 : 1.2; ctx.strokeStyle = sym === 'H' ? PAL.ink : alpha(PAL.ink, 0.4); ctx.stroke(); ctx.restore();
}
function bond(ctx, a, b, order) {
  const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), nx = -dy / L, ny = dx / L;
  (order === 2 ? [-5, 5] : [0]).forEach((o) => line(ctx, a[0] + nx * o, a[1] + ny * o, b[0] + nx * o, b[1] + ny * o, PAL.ink, 4));
}

/* =====================================================================
   Figures 3.2 + 3.3 + 3.4: the formula mass of chloroform, aspirin and
   sodium chloride. The model on the left, drawn flat by default, and the
   book's table on the right, each row led by its element's disc; the 3D
   view turns the molecule or the crystal. Still: a formula has no clock.
   Chloroform and aspirin are an RDKit MMFF conformer in ångströms; the
   crystal is the 3 × 3 × 3 packing of the book's picture on a 2.82 Å grid.
   ===================================================================== */
(function () {
  const d = sim('fig-formula-mass', 520);
  const ASP_A = [['C', 3.42, 0.43, 0.07], ['C', 2.02, 0.16, 0.53], ['O', 1.6, 0.42, 1.65], ['O', 1.31, -0.43, -0.51], ['C', -0.03, -0.64, -0.19], ['C', -0.4, -1.92, 0.21], ['C', -1.73, -2.2, 0.51], ['C', -2.69, -1.2, 0.4], ['C', -2.33, 0.08, -0.02], ['C', -0.99, 0.38, -0.33], ['C', -0.6, 1.73, -0.81], ['O', 0.5, 2.09, -1.18], ['O', -1.63, 2.6, -0.8], ['H', 3.93, -0.51, -0.14], ['H', 3.97, 0.96, 0.86], ['H', 3.4, 1.07, -0.82], ['H', 0.35, -2.7, 0.3], ['H', -2.02, -3.2, 0.84], ['H', -3.73, -1.41, 0.64], ['H', -3.1, 0.85, -0.11], ['H', -1.23, 3.44, -1.11]];
  const ASP_F = [[-2.57, 0.28], [-1.68, -0.19], [-1.64, -1.19], [-0.84, 0.35], [0.05, -0.12], [0.09, -1.12], [0.97, -1.58], [1.82, -1.05], [1.78, -0.05], [0.89, 0.42], [0.85, 1.42], [-0.03, 1.88], [1.7, 1.95], [-3.46, 0.74], [-3.03, -0.61], [-2.11, 1.16], [-0.76, -1.65], [1.01, -2.58], [2.7, -1.51], [2.62, 0.49], [1.66, 2.95]];
  const ASP_B = [[0, 1, 1], [1, 2, 2], [1, 3, 1], [3, 4, 1], [4, 5, 2], [5, 6, 1], [6, 7, 2], [7, 8, 1], [8, 9, 2], [9, 4, 1], [9, 10, 1], [10, 11, 2], [10, 12, 1], [0, 13, 1], [0, 14, 1], [0, 15, 1], [5, 16, 1], [6, 17, 1], [7, 18, 1], [8, 19, 1], [12, 20, 1]];
  const S = 2.82, GRID = [];
  for (let i = -1; i <= 1; i++) for (let j = -1; j <= 1; j++) for (let k = -1; k <= 1; k++) GRID.push([(i + j + k + 3) % 2 ? 'Cl' : 'Na', i * S, j * S, k * S]);
  const CMP = {
    chloroform: {
      name: 'chloroform', uni: 'CHCl₃', ionic: false, word: 'molecular mass', total: '119.37',
      rows: [['C', 1, '12.01', '12.01'], ['H', 1, '1.008', '1.008'], ['Cl', 3, '35.45', '106.35']],
      A: [['Cl', -0.82, 1.47, -0.44], ['C', 0, 0, 0.12], ['Cl', -0.89, -1.44, -0.41], ['Cl', 1.67, -0.04, -0.48], ['H', 0.03, 0.01, 1.21]],
      F: [[-0.94, 0.42], [0, 0], [0.94, 0.42], [0, 1.02], [0, -1]], B: [[0, 1, 1], [1, 2, 1], [1, 3, 1], [1, 4, 1]], scale: 2.6,
      head: 'A chloroform molecule, CHCl₃, has a molecular mass of 119.37 amu.',
    },
    aspirin: {
      name: 'aspirin', uni: 'C₉H₈O₄', ionic: false, word: 'molecular mass', total: '180.15',
      rows: [['C', 9, '12.01', '108.09'], ['H', 8, '1.008', '8.064'], ['O', 4, '16.00', '64.00']],
      A: ASP_A, F: ASP_F, B: ASP_B, scale: 1.4,
      head: 'An aspirin molecule, C₉H₈O₄, has a molecular mass of 180.15 amu.',
    },
    salt: {
      name: 'sodium chloride', uni: 'NaCl', ionic: true, word: 'formula mass', total: '58.44',
      rows: [['Na', 1, '22.99', '22.99'], ['Cl', 1, '35.45', '35.45']],
      A: GRID, scale: 0.75,
      head: 'Sodium chloride, NaCl, has a formula mass of 58.44 amu.',
    },
  };
  const KEYS = Object.keys(CMP);
  const M = F.choice(d.controls, { label: '\\text{compound}', options: [{ value: 'chloroform', label: 'chloroform' }, { value: 'aspirin', label: 'aspirin' }, { value: 'salt', label: 'sodium chloride' }], value: 'chloroform', aria: 'the compound' });
  const Vw = F.choice(d.controls, { label: '\\text{view}', options: [{ value: '2d', label: '2D' }, { value: '3d', label: '3D' }], value: '2d', aria: 'flat drawing or three-dimensional model', ms: 0, onInput: show });
  const R2 = { H: 0.2, C: 0.27, O: 0.26, Cl: 0.34 };
  const ION = { Na: { r: 19, mark: '+', name: 'sodium ion, Na⁺' }, Cl: { r: 33, mark: '−', name: 'chloride ion, Cl⁻' } };
  let hits = [];
  F.hover(d.stage, () => (Vw.value === '2d' ? hits : []));

  function model2d(ctx, key) {
    const c = CMP[key], cx = 320, cy = 290;
    if (c.ionic) {
      const s = 92, n = 4;
      for (let i = 0; i < n; i++) {
        const p = (i - (n - 1) / 2) * s;
        line(ctx, cx - 1.5 * s, cy + p, cx + 1.5 * s, cy + p, alpha(PAL.ink, 0.35), 2);
        line(ctx, cx + p, cy - 1.5 * s, cx + p, cy + 1.5 * s, alpha(PAL.ink, 0.35), 2);
      }
      for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
        const sym = (i + j) % 2 ? 'Cl' : 'Na', ion = ION[sym], x = cx + (i - (n - 1) / 2) * s, y = cy + (j - (n - 1) / 2) * s;
        atom(ctx, x, y, sym, ion.r);
        text(ctx, ion.mark, x + ion.r * 0.72 + 7, y - ion.r * 0.72 - 7, PAL.ink, { size: 20, weight: 600, align: 'center' });
        hits.push({ x, y, r: ion.r + 2, name: ion.name });
      }
      text(ctx, 'one face of the crystal', cx, cy + 1.5 * s + 56, PAL.muted, { size: 17, align: 'center' });
      return;
    }
    const xs = c.F.map((p) => p[0]), ys = c.F.map((p) => p[1]);
    const L = Math.min(120, 460 / (Math.max(...xs) - Math.min(...xs) + 0.9), 360 / (Math.max(...ys) - Math.min(...ys) + 0.9));
    const ox = cx - L * (Math.max(...xs) + Math.min(...xs)) / 2, oy = cy - L * (Math.max(...ys) + Math.min(...ys)) / 2;
    const P = c.F.map((p) => [ox + p[0] * L, oy + p[1] * L]);
    c.B.forEach(([i, j, o]) => bond(ctx, P[i], P[j], o));
    c.A.forEach((a, i) => { const r = R2[a[0]] * L; atom(ctx, P[i][0], P[i][1], a[0], r); hits.push({ x: P[i][0], y: P[i][1], r: r + 2, name: NAME[a[0]] }); });
  }
  /* the book's table: element, quantity × average atomic mass = subtotal, and the sum beneath */
  const COL = { el: 700, q: 850, x: 905, m: 1030, eq: 1140, sub: 1330 };
  const y0 = 150, dy = 58;
  function header(ctx) {
    {
      text(ctx, 'Element', COL.el, y0 - 44, PAL.muted, { size: 17, align: 'center' });
      text(ctx, 'Quantity', COL.q, y0 - 44, PAL.muted, { size: 17, align: 'center' });
      text(ctx, 'Average atomic', COL.m, y0 - 56, PAL.muted, { size: 17, align: 'center' });
      text(ctx, 'mass (amu)', COL.m, y0 - 34, PAL.muted, { size: 17, align: 'center' });
      text(ctx, 'Subtotal (amu)', COL.sub, y0 - 44, PAL.muted, { size: 17, align: 'right' });
      line(ctx, 650, y0 - 18, 1350, y0 - 18, alpha(PAL.ink, 0.35), 2);
    }
  }
  function table(ctx, key) {
    const c = CMP[key];
    c.rows.forEach(([sym, n, am, st], i) => {
      const y = y0 + 16 + i * dy;
      atom(ctx, COL.el - 34, y, sym, 12);
      text(ctx, sym, COL.el + 6, y, PAL.ink, { size: 24, weight: 600, align: 'center' });
      text(ctx, String(n), COL.q, y, PAL.ink, { size: 24, align: 'center' });
      text(ctx, '×', COL.x, y, PAL.muted, { size: 22, align: 'center' });
      text(ctx, am, COL.m, y, C('mass'), { size: 24, align: 'center' });
      text(ctx, '=', COL.eq, y, PAL.muted, { size: 22, align: 'center' });
      text(ctx, st, COL.sub, y, C('mass'), { size: 24, align: 'right' });
    });
    const yl = y0 + 16 + c.rows.length * dy - 26;
    line(ctx, 1200, yl, 1350, yl, PAL.ink, 4);
    const w = c.word[0].toUpperCase() + c.word.slice(1);
    text(ctx, w, 800, yl + 36, PAL.ink, { size: 22, weight: 600, align: 'center' });
    text(ctx, c.total, COL.sub, yl + 36, C('mass'), { size: 26, weight: 600, align: 'right' });
  }
  function draw2d() {
    const { ctx } = begin(d.c); hits = [];
    headline(ctx, CMP[M.value].head);
    header(ctx);
    KEYS.forEach((k) => M.only(ctx, k, () => { model2d(ctx, k); table(ctx, k); }, [0, 12]));
  }

  let v = null, groups = {}, sig = '';
  const palSig = () => [PAL.ink, PAL.panel, PAL.muted, F.el('C'), F.el('H'), F.el('O'), F.el('Cl'), F.el('Na')].join('|');
  const RB = { H: 0.26, C: 0.38, O: 0.36, Cl: 0.5 }, RI = { Na: 0.6, Cl: 1.05 };
  function mount() {
    v = F.view3d(d.stage, { spin: 'idle', h: 440, dist: 20, tilt: 0.3, views: [{ label: 'front', yaw: 0, pitch: 0 }, { label: 'top', yaw: 0, pitch: 1.45 }] });
  }
  function build() {
    const s = palSig(); if (s === sig) return; sig = s;
    v.clear(); groups = {};
    KEYS.forEach((key, i) => {
      const c = CMP[key], g = v.part(i);
      if (c.ionic) {
        c.A.forEach(([sym, x, y, z]) => {
          [[S, 0, 0], [0, S, 0], [0, 0, S]].forEach(([a, b, e]) => { if (x + a <= S + 0.01 && y + b <= S + 0.01 && z + e <= S + 0.01) F.mesh.stick(g, [x, y, z], [x + a, y + b, z + e], 0.05, PAL.muted); });
          v.pickable(F.mesh.sphere(g, [x, y, z], RI[sym], F.el(sym)), ION[sym].name);
        });
      } else {
        c.B.forEach(([p, q, o]) => F.mesh.bond(g, c.A[p].slice(1), c.A[q].slice(1), o, 0.07));
        c.A.forEach((a) => v.pickable(F.mesh.sphere(g, a.slice(1), RB[a[0]], F.el(a[0])), NAME[a[0]]));
      }
      g.scale.setScalar(c.scale);
      groups[key] = g;
    });
  }
  function draw3d() {
    if (!v.scene) return;
    build();
    KEYS.forEach((k) => F.fade3(groups[k], M.a(k)));
    v.headline(CMP[M.value].head);
    v.invalidate();
  }
  function show() {
    const three = Vw.value === '3d';
    if (three && !v) mount();
    d.c.style.display = three ? 'none' : '';
    if (v) [v.wrap, d.stage.querySelector('.view3d-bar')].forEach((e) => { if (e) e.style.display = three ? '' : 'none'; });
    draw();
  }
  function draw() {
    if (Vw.value === '2d') draw2d(); else if (v) draw3d();
    const c = CMP[M.value];
    const sum = c.rows.map(([, n, am]) => `${n} \\times ${hue('mass', am)}`).join(' + ');
    readout(d.readout, `${hue('mass', `\\text{${c.word}}`)} = ${sum} = ${hue('mass', `${c.total}\\ \\text{amu}`)}`,
      c.ionic ? 'The formula NaCl gives the ratio of the ions in the crystal, not a molecule, so its sum is a formula mass.' : `Each term is the number of atoms of one element in the formula ${c.uni} times that element’s average atomic mass.`);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   Sim: mass, moles and entities for the six examples 3.3 to 3.8. Four
   boxes in a row, each one factor from the next; the route from the
   quantity an example gives to the one it asks for is lit, and each lit
   factor is written as divided or multiplied in the direction the route
   runs. Still: the numbers answer the slider.
   ===================================================================== */
(function () {
  const d = sim("sim-mole-chain", 360);
  const NA = 6.022e23;
  const EX = {
    potassium: { label: 'Example 3.3 · potassium', name: 'potassium', sym: 'K', tex: '\\text{K}', MM: 39.10, give: 'm', want: 'n', value: 4.7, sf: 2, unit: 'atoms', r: { min: 0.5, max: 10, step: 0.1, dec: 1, unit: 'g' },
      head: (q) => `A sample of ${q.m} g of potassium is ${q.n} mol of K atoms.` },
    argon: { label: 'Example 3.4 · argon', name: 'argon', sym: 'Ar', tex: '\\text{Ar}', MM: 39.95, give: 'n', want: 'm', value: 0.92, sf: 2, unit: 'atoms', r: { min: 0.1, max: 2, step: 0.01, dec: 2, unit: 'mmol' },
      head: (q) => `Argon in the amount of ${q.n} mol has a mass of ${q.m} g.` },
    copper: { label: 'Example 3.5 · copper', name: 'copper', sym: 'Cu', tex: '\\text{Cu}', MM: 63.55, give: 'm', want: 'N', value: 5, sf: 3, unit: 'atoms', r: { min: 0.5, max: 20, step: 0.01, dec: 2, unit: 'g' },
      head: (q) => `A copper wire of ${q.m} g contains ${q.N} Cu atoms.` },
    glycine: { label: 'Example 3.6 · glycine', name: 'glycine', sym: 'glycine', tex: '\\text{glycine}', MM: 75.07, give: 'm', want: 'n', value: 28.35, sf: 4, unit: 'molecules', nC: 2, r: { min: 1, max: 75, step: 0.01, dec: 2, unit: 'g' },
      head: (q) => `A sample of ${q.m} g of glycine is ${q.n} mol of glycine molecules.` },
    vitaminC: { label: 'Example 3.7 · vitamin C', name: 'vitamin C', sym: 'vitamin C', tex: '\\text{vitamin C}', MM: 176.124, give: 'n', want: 'm', value: 0.142, sf: 3, unit: 'molecules', nC: 6, r: { min: 0.01, max: 0.5, step: 0.001, dec: 3, unit: 'mmol' },
      head: (q) => `Vitamin C in the amount of ${q.n} mol has a mass of ${q.m} g.` },
    saccharin: { label: 'Example 3.8 · saccharin', name: 'saccharin', sym: 'C₇H₅NO₃S', tex: '\\text{C}_7\\text{H}_5\\text{NO}_3\\text{S}', MM: 183.18, give: 'm', want: 'C', value: 40, sf: 3, unit: 'molecules', nC: 7, mg: true, r: { min: 1, max: 200, step: 0.1, dec: 1, unit: 'mg' },
      head: (q) => `A packet of ${q.m} mg of saccharin holds ${q.N} molecules and ${q.C} carbon atoms.` },
  };
  const ex = F.select(d.controls, { label: '\\text{example}', aria: 'the worked example', value: 'potassium', options: Object.keys(EX).map((k) => ({ value: k, label: EX[k].label })), onInput: () => load() });
  const SL = {
    m: ctl(d.controls, { label: '\\km', cls: 'mass', min: 0.5, max: 10, step: 0.1, value: 4.7, unit: 'g', dec: 1, aria: 'mass of the sample' }),
    n: ctl(d.controls, { label: '\\kn', cls: 'amount', min: 0.1, max: 2, step: 0.01, value: 0.92, unit: 'mmol', dec: 2, aria: 'amount of the sample in millimoles' }),
  };
  SL.n.show(false, { ms: 0 });
  let shown = 'm';
  function load() {
    const e = EX[ex.value];
    if (e.give !== shown) { SL[shown].show(false); SL[e.give].show(true); shown = e.give; }
    SL[e.give].range({ ...e.r, value: e.value });
  }
  /* the sample's amount in moles, from whichever slider the example gives */
  const molesOf = (e) => (e.give === 'm' ? (SL.m.v / (e.mg ? 1000 : 1)) / e.MM : SL.n.v / 1000);
  const BX = [160, 520, 880, 1240], BY = 210, BW = 230, BH = 104;
  const ORDER = ['m', 'n', 'N', 'C'];
  function box(ctx, x, kind, name, value, lit) {
    const c = kind === 'm' ? C('mass') : kind === 'n' ? C('amount') : PAL.ink;
    ctx.save(); ctx.beginPath(); ctx.roundRect(x - BW / 2, BY - BH / 2, BW, BH, 8);
    ctx.fillStyle = kind === 'm' || kind === 'n' ? alpha(c, lit ? 0.16 : 0.07) : PAL.soft; ctx.fill();
    ctx.lineWidth = lit ? 4 : 2; ctx.strokeStyle = lit ? c : alpha(c, 0.5); ctx.stroke(); ctx.restore();
    text(ctx, name, x, BY - 22, lit ? PAL.ink : PAL.muted, { size: Math.min(17, 17 * (BW - 20) / F.measure(ctx, name, { size: 17 })), align: 'center' });
    text(ctx, value, x, BY + 20, kind === 'm' || kind === 'n' ? c : PAL.ink, { size: 24, weight: 600, align: 'center' });
  }
  /* a factor between two boxes: an arrow in the route's direction when lit, a bare rule when not */
  function factor(ctx, i, name, fwd, back, dir) {
    const x1 = BX[i] + BW / 2 + 8, x2 = BX[i + 1] - BW / 2 - 8, xm = (x1 + x2) / 2;
    if (dir === 0) line(ctx, x1, BY, x2, BY, alpha(PAL.ink, 0.35), 3);
    else F.arrow(ctx, dir > 0 ? x1 : x2, BY, dir > 0 ? x2 : x1, BY, PAL.ink, 4);
    text(ctx, name, xm, BY - 78, dir ? PAL.ink : PAL.muted, { size: 17, align: 'center' });
    text(ctx, dir < 0 ? back : fwd, xm, BY + 80, dir ? PAL.ink : PAL.muted, { size: 17, align: 'center' });
  }
  function draw() {
    const { ctx } = begin(d.c);
    const e = EX[ex.value], n = molesOf(e), s = e.sf;
    const val = { m: n * e.MM, n, N: n * NA, C: Number((n * NA).toPrecision(e.sf)) * (e.nC || 0) };
    const q = { m: sciTxt(val.m, s), n: sciTxt(val.n, s), N: sciTxt(val.N, s), C: sciTxt(val.C, s) };
    if (e.mg) q.m = sciTxt(val.m * 1000, s);
    headline(ctx, e.head(q));
    const a = ORDER.indexOf(e.give), b = ORDER.indexOf(e.want), lo = Math.min(a, b), hi = Math.max(a, b), sgn = Math.sign(b - a);
    const dirOf = (i) => (i >= lo && i < hi ? sgn : 0);
    const nC = ex.mix((k) => (EX[k].nC ? 1 : 0));
    factor(ctx, 0, 'molar mass', `÷ ${e.MM} g/mol`, `× ${e.MM} g/mol`, dirOf(0));
    factor(ctx, 1, 'Avogadro’s number', '× 6.022 × 10²³/mol', '÷ 6.022 × 10²³/mol', dirOf(1));
    F.faded(ctx, nC, [0, 0], () => factor(ctx, 2, 'carbon atoms per molecule', `× ${e.nC || ''}`, `÷ ${e.nC || ''}`, dirOf(2)));
    box(ctx, BX[0], 'm', `mass of ${e.sym} (${e.mg ? 'mg' : 'g'})`, q.m, lo === 0);
    box(ctx, BX[1], 'n', `moles of ${e.sym} (mol)`, q.n, lo <= 1 && hi >= 1);
    box(ctx, BX[2], 'N', `${e.sym} ${e.unit}`, q.N, lo <= 2 && hi >= 2);
    F.faded(ctx, nC, [0, 0], () => box(ctx, BX[3], 'C', 'carbon atoms', e.nC ? q.C : '', b === 3));
    /* the chain of factors, written with the live numbers */
    const M_ = hue('mass', `${e.MM}\\ \\text{g/mol}`);
    const mT = hue('mass', `${sciTex(val.m, s)}\\ \\text{g}`), nT = hue('amount', `${sciTex(val.n, s)}\\ \\text{mol}`);
    const NAt = '6.022\\times 10^{23}\\ \\text{mol}^{-1}';
    let f;
    if (e.give === 'm' && e.want === 'n') f = `\\kn = \\frac{\\km}{\\kMM} = \\frac{${mT}}{${M_}} = ${nT}`;
    else if (e.give === 'n' && e.want === 'm') f = `\\km = \\kn \\times \\kMM = ${nT} \\times ${M_} = ${mT}`;
    else if (e.want === 'N') f = `N = \\frac{\\km}{\\kMM} \\times N_A = \\frac{${mT}}{${M_}} \\times ${NAt} = ${sciTex(val.N, s)}\\ \\text{${e.sym} atoms}`;
    else f = `N_{\\text{C}} = \\frac{\\km}{\\kMM} \\times N_A \\times ${e.nC} = \\frac{${mT}}{${M_}} \\times ${NAt} \\times ${e.nC} = ${sciTex(val.C, s)}\\ \\text{C atoms}`;
    readout(d.readout, f);
  }
  register(d.fig, { update: () => {}, draw });
})();
};
