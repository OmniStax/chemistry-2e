/* Figures for section 20.4 Amines and Amides. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['20.4'] = function (root, F) {
const { PAL, alpha, register, begin, line, text, headline } = F;

/* =====================================================================
   FIGURE (the amines image): ammonia's hydrogen atoms replaced by methyl
   groups one at a time, nitrogen keeping three bonds and its lone pair;
   with a hydrogen ion the lone pair becomes the fourth N-H bond of the
   ammonium ion. 2D is the book's Lewis structure (substituents left,
   right and below, the lone pair above), 3D a ball-and-stick model on
   tetrahedral corners, mounted on the first switch. Still: states.
===================================================================== */
(function () {
  const d = F.sim(root, 'fig-amines', 450);
  const ORDER = ['NH3', 'MeNH2', 'Me2NH', 'Me3N'];
  const SITES = ['left', 'right', 'down'];
  const AM = {
    NH3: { me: 0, label: 'NH₃', name: '氨', ion: '铵根离子', tex: '\\text{NH}_{3}', itex: '\\text{NH}_{4}{}^{+}', bonds: '三个氢原子' },
    MeNH2: { me: 1, label: 'CH₃NH₂', name: '甲胺', ion: '甲铵离子', tex: '\\text{CH}_{3}\\text{NH}_{2}', itex: '\\text{CH}_{3}\\text{NH}_{3}{}^{+}', bonds: '一个碳原子和两个氢原子' },
    Me2NH: { me: 2, label: '(CH₃)₂NH', name: '二甲胺', ion: '二甲铵离子', tex: '(\\text{CH}_{3})_{2}\\text{NH}', itex: '(\\text{CH}_{3})_{2}\\text{NH}_{2}{}^{+}', bonds: '两个碳原子和一个氢原子' },
    Me3N: { me: 3, label: '(CH₃)₃N', name: '三甲胺', ion: '三甲铵离子', tex: '(\\text{CH}_{3})_{3}\\text{N}', itex: '(\\text{CH}_{3})_{3}\\text{NH}^{+}', bonds: '三个碳原子' },
  };
  const amine = F.choice(d.controls, { label: '\\text{胺}', key: 'amine', aria: '胺',
    options: ORDER.map((v) => ({ value: v, label: AM[v].label })), value: 'MeNH2', onInput: () => draw() });
  const nitro = F.choice(d.controls, { label: '\\text{氮}', key: 'nitrogen', aria: '孤电子对保留，或与氢离子成键',
    options: [{ value: 'pair', label: '孤电子对' }, { value: 'ion', label: '与 H⁺ 成键' }], value: 'pair', onInput: () => draw() });
  const VIEW = F.choice(d.controls, { label: '\\text{视图}', key: 'view', aria: '平面路易斯结构或可转动的场景',
    options: [{ value: '2d', label: '2D' }, { value: '3d', label: '3D' }], value: '2d', ms: 0, onInput: () => show() });
  const ro = F.readout(d);
  let hits = []; F.hover(d.stage, () => hits);

  /* how far each site holds a methyl group (1) rather than a hydrogen atom (0), and how far the lone pair has taken H+ */
  const methyl = (s) => amine.mix((v) => (SITES.indexOf(s) < AM[v].me ? 1 : 0));
  const taken = () => nitro.mix((v) => (v === 'ion' ? 1 : 0));
  const head = () => {
    const a = AM[amine.value];
    return nitro.value === 'ion'
      ? `${a.name}的孤电子对与一个氢离子成键，${a.ion}中氮形成四个键。`
      : `在${a.name}中，氮与${a.bonds}成键，并保留一对孤电子对。`;
  };

  /* ---------- the flat view: the book's Lewis structure ---------- */
  const CX = 700, CY = 240, BOND = 110, LP = 30;
  const DIR = { left: [-1, 0], right: [1, 0], down: [0, 1] };
  function bondLine(ctx, x1, y1, x2, y2, g1, g2, a = 1) {
    if (a <= 0.01) return;
    const L = Math.hypot(x2 - x1, y2 - y1); if (L < g1 + g2 + 4) return;
    const ux = (x2 - x1) / L, uy = (y2 - y1) / L;
    ctx.save(); ctx.globalAlpha *= a; line(ctx, x1 + ux * g1, y1 + uy * g1, x2 - ux * g2, y2 - uy * g2, PAL.ink, 3); ctx.restore();
  }
  function brackets(ctx, a) {
    if (a <= 0.01) return;
    const x1 = CX - BOND - 62, x2 = CX + BOND + 62, y1 = CY - BOND - 26, y2 = CY + BOND + 26;
    ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3;
    [[x1, 1], [x2, -1]].forEach(([x, s]) => { ctx.beginPath(); ctx.moveTo(x + s * 14, y1); ctx.lineTo(x, y1); ctx.lineTo(x, y2); ctx.lineTo(x + s * 14, y2); ctx.stroke(); });
    ctx.restore();
    F.faded(ctx, a, [0, 0], () => text(ctx, '+', x2 + 16, y1 + 6, PAL.ink, { size: 28, weight: 600 }));
  }
  function draw2d() {
    const { ctx } = begin(d.c); hits = [];
    headline(ctx, head());
    const p = taken();
    brackets(ctx, p);
    text(ctx, 'N', CX, CY + 1, PAL.ink, { size: 30, align: 'center' });
    hits.push({ x: CX, y: CY, r: 22, name: '氮原子' });
    SITES.forEach((s) => {
      const w = methyl(s), [dx, dy] = DIR[s], x = CX + dx * BOND, y = CY + dy * BOND;
      const half = dx ? 24 + 14 * w : 16;
      bondLine(ctx, CX, CY, x, y, 20, half);
      F.faded(ctx, 1 - w, [0, 0], () => text(ctx, 'H', x, y + 1, PAL.ink, { size: 28, align: 'center' }));
      F.faded(ctx, w, [0, 0], () => text(ctx, 'CH_{3}', x, y + 1, PAL.ink, { size: 28, align: 'center' }));
      hits.push({ x, y, r: 24, name: w > 0.5 ? '甲基，CH₃' : '氢原子' });
    });
    /* the lone pair slides up into the shared pair as the hydrogen ion arrives, and the bond line takes its place */
    const r = LP + (BOND / 2 - LP) * p, fade = 1 - Math.min(1, Math.max(0, (p - 0.45) / 0.45));
    if (fade > 0.01) {
      ctx.save(); ctx.globalAlpha *= fade;
      [-6.5, 6.5].forEach((o) => F.dot(ctx, CX + o, CY - r, PAL.ink, true, 3.8));
      ctx.restore();
      if (fade > 0.5) hits.push({ x: CX, y: CY - r, r: 14, name: '氮上的孤电子对' });
    }
    if (p > 0.01) {
      const hy = CY - BOND - (1 - p) * 26;
      bondLine(ctx, CX, CY, CX, CY - 20 - (BOND - 36) * p, 20, 0, Math.min(1, p * 1.6));
      F.faded(ctx, p, [0, 0], () => text(ctx, 'H', CX, hy + 1, PAL.ink, { size: 28, align: 'center' }));
      if (p > 0.5) hits.push({ x: CX, y: hy, r: 22, name: '来自氢离子的氢原子' });
    }
    ORDER.forEach((v) => amine.only(ctx, v, () => {
      F.faded(ctx, 1 - p, [0, 0], () => text(ctx, AM[v].name, CX, CY + BOND + 74, PAL.ink, { size: 24, align: 'center' }));
      F.faded(ctx, p, [0, 0], () => text(ctx, AM[v].ion, CX, CY + BOND + 74, PAL.ink, { size: 24, align: 'center' }));
    }, [0, 0]));
  }

  /* ---------- the same molecule in three dimensions (lengths in angstroms) ---------- */
  const NH = 1.01, NC = 1.47, CH = 1.09, r8 = Math.sqrt(8) / 3;
  const at = (deg) => [r8 * Math.cos(deg * Math.PI / 180), -1 / 3, r8 * Math.sin(deg * Math.PI / 180)];
  /* the lone pair straight up; left and right behind, the third site toward the viewer, so the front view is the book's */
  const T3 = { left: at(210), right: at(330), down: at(90) }, UP = [0, 1, 0];
  const add = (a, b, k = 1) => a.map((x, i) => x + b[i] * k);
  const norm = (a) => { const L = Math.hypot(...a); return a.map((x) => x / L); };
  const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  function methylH(u) {
    const a = norm(cross(u, Math.abs(u[1]) < 0.9 ? UP : [1, 0, 0])), b = cross(u, a);
    return [0, 1, 2].map((i) => { const f = 0.4 + i * 2 * Math.PI / 3; return add(add(u.map((x) => x / 3), a, r8 * Math.cos(f)), b, r8 * Math.sin(f)); });
  }
  let V = null, g = null;
  function mount() {
    V = F.view3d(d.stage, { spin: 'idle', h: 520, dist: 9.4, tilt: 0.2, pitch: [-Math.PI / 2, Math.PI / 2],
      views: [{ label: '正视', yaw: 0, pitch: 0.2 }, { label: '俯视', yaw: 0, pitch: 1.45 }] });
    g = V.part(0); g.position.y = -0.15;
  }
  const fadeTo = (a) => (a < 0.99 ? { transparent: true, opacity: a } : undefined);
  function draw3d() {
    V.clear(); hits = [];
    const { sphere, bond, lobe } = F.mesh, cN = F.el('N'), cC = F.el('C'), cH = F.el('H');
    V.pickable(sphere(g, [0, 0, 0], 0.34, cN), '氮原子');
    SITES.forEach((s) => {
      const w = methyl(s), u = T3[s];
      bond(g, [0, 0, 0], u.map((x) => x * (NH + (NC - NH) * w)), 1);
      if (w < 0.99) V.pickable(sphere(g, u.map((x) => x * NH), 0.22 * (1 - 0.5 * w), cH, fadeTo(1 - w)), '氢原子');
      if (w > 0.01) {
        const c = u.map((x) => x * NC);
        V.pickable(sphere(g, c, 0.3 * (0.5 + 0.5 * w), cC, fadeTo(w)), '甲基的碳原子');
        methylH(u).forEach((h) => {
          const e = add(c, h, CH);
          if (w > 0.5) bond(g, c, e, 1);
          V.pickable(sphere(g, e, 0.2 * w, cH, fadeTo(w)), '甲基的氢原子');
        });
      }
    });
    const p = taken();
    if (p > 0.01) {
      bond(g, [0, 0, 0], UP.map((x) => x * NH * (0.3 + 0.7 * p)), 1);
      V.pickable(sphere(g, UP.map((x) => x * NH), 0.22 * (0.4 + 0.6 * p), cH, fadeTo(p)), '来自氢离子的氢原子');
    }
    if (p < 0.99) { const lb = lobe(g, [0, 0, 0], UP, 1.25 * (1 - 0.6 * p)); lb.material.opacity = 0.5 * (1 - p); V.pickable(lb, '氮上的孤电子对'); }
    V.headline(head());
    V.invalidate();
  }
  function show() {
    if (VIEW.value === '3d' && !V) mount();
    const three = VIEW.value === '3d' && !!V?.scene;
    d.c.style.display = three ? 'none' : '';
    if (V) [V.wrap, d.stage.querySelector('.view3d-bar')].forEach((e) => { if (e) e.style.display = VIEW.value === '3d' ? '' : 'none'; });
    draw();
  }

  function readout() {
    const a = AM[amine.value], ion = nitro.value === 'ion';
    const tex = ion
      ? `\\mk{a}{${a.tex}} + \\mk{h}{\\text{H}^{+}}\\mk{r}{\\;\\longrightarrow\\;}\\mk{i}{${a.itex}}`
      : `\\mk{a}{${a.tex}}`;
    const note = ion
      ? '四个键指向四面体的顶点，所以该离子在氮周围呈四面体形。'
      : '三个键和一对孤电子对指向四面体的顶点，所以该分子在氮周围呈三角锥形。';
    ro.set(tex, note, { form: ion });
  }

  function draw() {
    if (VIEW.value === '3d' && V?.scene) draw3d(); else draw2d();
    readout();
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 20.20: amino acids joined by peptide bonds. Before, each amino
   acid stands apart with its amine group, its carboxylic acid group and
   its side chain R; after, the OH of each acid group and an H of the
   next amine group leave as one water molecule beneath each new C-N
   bond. Two to four amino acids. Flat, the book's structural formulas
   in ink; its green boxes as dashed ink and its red atoms in bold.
   Still: a reaction's two sides.
===================================================================== */
(function () {
  const d = F.sim(root, 'sim-peptide', 460);
  const B = 60, GAP = 60, SB = 4.5 * B + GAP, SA = 3 * B, Y = 230, WY = Y + 190;
  const NUM = ['', '一', '两', '三', '四'];
  const CHAIN = { 2: '二肽', 3: '三肽', 4: '四肽' };
  const count = F.choice(d.controls, { label: '\\text{氨基酸}', key: 'amino-acids', aria: '氨基酸的个数',
    options: ['2', '3', '4'].map((v) => ({ value: v, label: v })), value: '2', onInput: () => draw() });
  const step = F.choice(d.controls, { label: '\\text{缩合}', key: 'condensation', aria: '缩合反应之前或之后',
    options: [{ value: 'before', label: '反应前' }, { value: 'after', label: '反应后' }], value: 'before', onInput: () => draw() });
  const ro = F.readout(d);
  let hits = []; F.hover(d.stage, () => hits);

  const lerp = (a, b, k) => a + (b - a) * k;
  const smooth = (a, b, k) => Math.min(1, Math.max(0, (k - a) / (b - a)));
  /* where amino acid i's nitrogen stands among n, a fraction w of the way from apart to joined; the row is centred */
  const xApart = (i, n) => 700 - ((n - 1) * SB + 4.35 * B) / 2 + 0.6 * B + i * SB;
  const xJoined = (i, n) => 700 - ((n - 1) * SA + 4.35 * B) / 2 + 0.6 * B + i * SA;
  const xOf = (i, n, w) => lerp(xApart(i, n), xJoined(i, n), w);

  function bondLine(ctx, x1, y1, x2, y2, a = 1, order = 1, w = 3) {
    if (a <= 0.01) return;
    const L = Math.hypot(x2 - x1, y2 - y1), g = 14; if (L < 2 * g + 4) return;
    const ux = (x2 - x1) / L, uy = (y2 - y1) / L;
    ctx.save(); ctx.globalAlpha *= a;
    (order === 2 ? [-4, 4] : [0]).forEach((o) => line(ctx, x1 + ux * g - uy * o, y1 + uy * g + ux * o, x2 - ux * g - uy * o, y2 - uy * g + ux * o, PAL.ink, w));
    ctx.restore();
  }
  const atom = (ctx, s, x, y, a = 1, bold = false) => F.faded(ctx, a, [0, 0], () => text(ctx, s, x, y + 1, PAL.ink, { size: 26, align: 'center', weight: bold ? 700 : 400 }));
  /* a dashed box round a group, its name above it running away from the chain */
  function box(ctx, l, t, r, b, name, align) {
    ctx.save(); ctx.strokeStyle = alpha(PAL.ink, 0.6); ctx.lineWidth = 2; ctx.setLineDash([7, 6]); ctx.strokeRect(l, t, r - l, b - t); ctx.restore();
    text(ctx, name, align === 'right' ? r : l, t - 18, PAL.ink, { size: 22, align });
  }

  function head() {
    const n = +count.value;
    if (step.value === 'before') return '每个氨基酸都带有一个氨基、一个羧基和一条侧链 R。';
    const k = n - 1;
    return `${NUM[n]}个氨基酸通过${NUM[k]}个肽键连接，脱去${NUM[k]}个水分子。`;
  }

  function draw() {
    const { ctx } = begin(d.c); hits = [];
    headline(ctx, head());
    const w = step.mix((v) => (v === 'after' ? 1 : 0));
    const pres = [0, 1, 2, 3].map((i) => count.mix((v) => (i < +v ? 1 : 0)));
    const xs = [0, 1, 2, 3].map((i) => count.mix((v) => xOf(i, +v, w)));
    /* j[i]: how far the bond between amino acids i and i + 1 has formed */
    const j = [0, 1, 2].map((i) => w * pres[i + 1]);
    for (let i = 0; i < 4; i++) {
      if (pres[i] <= 0.01) continue;
      const x = xs[i], a = pres[i], jin = i > 0 ? j[i - 1] : 0, jout = i < 3 ? j[i] : 0, next = i < 3 ? pres[i + 1] : 0;
      F.faded(ctx, a, [0, 0], () => {
        atom(ctx, 'N', x, Y); atom(ctx, 'C', x + B, Y); atom(ctx, 'C', x + 2 * B, Y);
        atom(ctx, 'H', x + B, Y - B); atom(ctx, 'R', x + B, Y + B); atom(ctx, 'O', x + 2 * B, Y - B);
        bondLine(ctx, x, Y, x + B, Y); bondLine(ctx, x + B, Y, x + 2 * B, Y);
        bondLine(ctx, x + B, Y, x + B, Y - B); bondLine(ctx, x + B, Y, x + B, Y + B);
        bondLine(ctx, x + 2 * B, Y, x + 2 * B, Y - B, 1, 2);
        /* the hydrogen that stays on nitrogen moves above it once the nitrogen is in the chain */
        const h1x = x + lerp(-0.6 * B, 0, jin), h1y = Y + lerp(-0.6 * B, -B, jin);
        atom(ctx, 'H', h1x, h1y); bondLine(ctx, x, Y, h1x, h1y);
        /* the hydrogen that leaves with the next water molecule, from the lower left of nitrogen */
        const mxIn = i > 0 ? (xs[i - 1] + 2 * B + x) / 2 : x;
        const h2x = lerp(x - 0.6 * B, mxIn - 46, jin), h2y = lerp(Y + 0.6 * B, WY, jin);
        atom(ctx, 'H', h2x, h2y, 1, i > 0);
        bondLine(ctx, x, Y, h2x, h2y, 1 - jin);
        if (i > 0) bondLine(ctx, h2x, h2y, lerp(xs[i - 1] + 3 * B, mxIn, j[i - 1]), lerp(Y, WY, j[i - 1]), jin);
        /* the OH of the carboxylic acid group, leaving to the water beneath the next bond */
        const mxOut = (x + 2 * B + (i < 3 ? xs[i + 1] : x + 3 * B)) / 2;
        const ox = lerp(x + 3 * B, mxOut, jout), oy = lerp(Y, WY, jout), hx = lerp(x + 3.75 * B, mxOut + 46, jout), hy = oy;
        const leaves = next > 0.5;
        atom(ctx, 'O', ox, oy, 1, leaves); atom(ctx, 'H', hx, hy, 1, leaves);
        bondLine(ctx, x + 2 * B, Y, ox, oy, 1 - jout); bondLine(ctx, ox, oy, hx, hy);
        if (jout > 0.01) bondLine(ctx, x + 2 * B, Y, xs[i + 1], Y, jout * next, 1, 4);
        hits.push({ x, y: Y, r: 18, name: jin > 0.5 ? '肽键中的氮原子' : '氨基中的氮原子' },
          { x: x + B, y: Y + B, r: 18, name: '侧链 R' }, { x: x + 2 * B, y: Y - B, r: 18, name: '羰基中的氧原子' });
        if (jout > 0.5) hits.push({ x: mxOut, y: WY, r: 50, name: '水分子' });
      });
      /* the plus sign between molecules apart */
      if (i < 3 && next > 0.01) F.faded(ctx, (1 - w) * next, [0, 0], () => text(ctx, '+', (x + 3.75 * B + xs[i + 1] - 0.6 * B) / 2, Y + 1, PAL.ink, { size: 26, align: 'center' }));
    }
    /* the first peptide bond, named once */
    if (j[0] > 0.6) {
      const mx = (xs[0] + 2 * B + xs[1]) / 2, k = smooth(0.6, 1, j[0]);
      F.faded(ctx, k, [0, 0], () => { line(ctx, mx, Y + 12, mx, Y + 96, alpha(PAL.ink, 0.5), 2); text(ctx, '肽键', mx, Y + 112, PAL.ink, { size: 22, align: 'center' }); });
      hits.push({ x: mx, y: Y, r: 16, name: '肽键' });
    }
    /* the two groups that stay unreacted at the ends */
    const x0 = xs[0], xl = count.mix((v) => xOf(+v - 1, +v, w));
    box(ctx, x0 - 0.6 * B - 22, Y - 0.6 * B - 24, x0 + 0.5 * B, Y + 0.6 * B + 24, '氨基', 'right');
    box(ctx, xl + 1.5 * B, Y - B - 24, xl + 3.75 * B + 20, Y + 22, '羧基', 'left');
    hits.push({ x: x0 - 0.3 * B, y: Y, r: 30, name: '氨基，–NH₂' }, { x: xl + 2.9 * B, y: Y - 0.4 * B, r: 34, name: '羧基，–COOH' });

    const n = +count.value, after = step.value === 'after';
    const water = n - 1 > 1 ? `${n - 1}\\,\\text{H}_{2}\\text{O}` : '\\text{H}_{2}\\text{O}';
    const tex = after
      ? `\\mk{n}{${n}\\ \\text{个氨基酸}}\\mk{r}{\\;\\longrightarrow\\;}\\mk{p}{\\text{${CHAIN[n]}}} + \\mk{w}{${water}}`
      : `\\mk{n}{${n}\\ \\text{个氨基酸}}`;
    ro.set(tex, after ? '链的两端仍是一个氨基和一个羧基，所以还可以再连接一个氨基酸。' : '', { form: after });
  }
  register(d.fig, { update: () => {}, draw });
})();
};
