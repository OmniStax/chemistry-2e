/* Figures for section 12.6 Reaction Mechanisms. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['12.6'] = function (root, F) {
const { el, fmt, tex, C, PAL, alpha, ctl, register, begin, line, text, headline, topline } = F;
const sim = (id, H) => F.sim(root, id, H);
const still = (d, draw) => register(d.fig, { update: () => {}, draw });
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;
const TAU = 2 * Math.PI;
const VIEWS = [{ value: '2d', label: '2D' }, { value: '3d', label: '3D' }];
const NAME = { H: 'hydrogen atom', C: 'carbon atom', N: 'nitrogen atom', O: 'oxygen atom' };

/* an atom as a disc in its element's color; hydrogen is light and takes an ink outline so that it reads on a light page */
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

/* =====================================================================
   The cyclobutane equation, C4H8 -> 2 C2H4. Flat by default: the book's
   structural formulas in ink letters. The 3D view is ball-and-stick in
   angstroms: a ring of side 1.54 puckered by 0.12 either side of its
   plane (about 25 degrees), C-H 1.09 at the tetrahedral half angle
   either side of the ring; ethylene C=C 1.33, C-H 1.09, H-C-H 117
   degrees, flat. The edge-on view shows the ring's pucker against the
   flat ethylenes. Still: a structure has no clock.
===================================================================== */
(function () {
  const H = 410;
  const d = sim('fig-cyclobutane', H);
  const VIEW = F.choice(d.controls, { label: '\\text{view}', options: VIEWS, value: '2d', aria: 'a flat drawing or a scene to turn', ms: 0, onInput: () => V.show() });
  let hits = []; F.hover(d.stage, () => hits);

  /* ---------- the book's structural formulas ---------- */
  const S = 85, CY = 205;
  function bondLine(ctx, a, b, order) {
    const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, gap = 20;
    (order === 2 ? [-6, 6] : [0]).forEach((o) => line(ctx, a[0] + ux * gap - uy * o, a[1] + uy * gap + ux * o, b[0] - ux * gap - uy * o, b[1] - uy * gap + ux * o, PAL.ink, 3.5));
  }
  function formula(ctx, atoms, bonds, who) {
    bonds.forEach(([i, j, o]) => bondLine(ctx, atoms[i].slice(1), atoms[j].slice(1), o));
    atoms.forEach(([sym, x, y]) => { text(ctx, sym, x, y + 1, PAL.ink, { size: 30, weight: 600, align: 'center' }); hits.push({ x, y, r: 20, name: `${NAME[sym]} of ${who}` }); });
  }
  function cyclobutane(cx) {
    const h = S / 2, A = [];
    [[-1, -1], [1, -1], [1, 1], [-1, 1]].forEach(([sx, sy]) => A.push(['C', cx + sx * h, CY + sy * h]));
    const B = [[0, 1, 1], [1, 2, 1], [2, 3, 1], [3, 0, 1]];
    [[-1, -1], [1, -1], [1, 1], [-1, 1]].forEach(([sx, sy], i) => {
      A.push(['H', cx + sx * h, CY + sy * (h + S)]); B.push([i, A.length - 1, 1]);
      A.push(['H', cx + sx * (h + S), CY + sy * h]); B.push([i, A.length - 1, 1]);
    });
    return [A, B];
  }
  function ethylene(cx) {
    const h = S / 2, hx = S * 0.866, hy = S * 0.5;
    const A = [['C', cx, CY - h], ['C', cx, CY + h], ['H', cx - hx, CY - h - hy], ['H', cx + hx, CY - h - hy], ['H', cx - hx, CY + h + hy], ['H', cx + hx, CY + h + hy]];
    return [A, [[0, 1, 2], [0, 2, 1], [0, 3, 1], [1, 4, 1], [1, 5, 1]]];
  }
  function draw2d() {
    const { ctx } = begin(d.c); hits = [];
    headline(ctx, 'A single molecule of cyclobutane, C₄H₈, is the only reactant, so the step is unimolecular.');
    formula(ctx, ...cyclobutane(300), 'cyclobutane');
    F.arrow(ctx, 520, CY, 690, CY, PAL.ink, 4);
    formula(ctx, ...ethylene(900), 'ethylene');
    text(ctx, '+', 1065, CY, PAL.ink, { size: 34, align: 'center' });
    formula(ctx, ...ethylene(1230), 'ethylene');
    const ly = CY + S / 2 + S + 44;
    [[300, 'cyclobutane'], [900, 'ethylene'], [1230, 'ethylene']].forEach(([x, s]) => text(ctx, s, x, ly, PAL.muted, { size: 20, align: 'center' }));
  }

  /* ---------- the same molecules in three dimensions ---------- */
  const a = 0.77, z = 0.12, ch = 1.09, cr = 0.578, cz = 0.816;
  const RING = [[a, a, z], [-a, a, -z], [-a, -a, z], [a, -a, -z]];
  const CB = { atoms: [], bonds: [] };
  RING.forEach((p) => CB.atoms.push(['C', ...p]));
  for (let i = 0; i < 4; i++) CB.bonds.push([i, (i + 1) % 4, 1]);
  RING.forEach((p, i) => {
    const u = [Math.sign(p[0]) / Math.SQRT2, Math.sign(p[1]) / Math.SQRT2];
    [1, -1].forEach((s) => { CB.atoms.push(['H', p[0] + ch * cr * u[0], p[1] + ch * cr * u[1], p[2] + s * ch * cz]); CB.bonds.push([i, CB.atoms.length - 1, 1]); });
  });
  const ET = { atoms: [['C', 0, 0.665, 0], ['C', 0, -0.665, 0], ['H', -0.93, 1.23, 0], ['H', 0.93, 1.23, 0], ['H', -0.93, -1.23, 0], ['H', 0.93, -1.23, 0]], bonds: [[0, 1, 2], [0, 2, 1], [0, 3, 1], [1, 4, 1], [1, 5, 1]] };
  const RB = { C: 0.36, H: 0.24 };
  let g = null, sig = '';
  function mount() {
    const v = F.view3d(d.stage, { spin: 'off', h: 420, dist: 11, tilt: 0, pitch: [-1.4, 1.4], yaw: [-1.2, 1.2],
      views: [{ label: 'front', yaw: 0, pitch: 0 }, { label: 'edge on', yaw: 0, pitch: 1.4 }] });
    g = v.part(0);
    return v;
  }
  function molecule(v, m, dx, who) {
    m.bonds.forEach(([i, j, o]) => F.mesh.bond(g, [m.atoms[i][1] + dx, m.atoms[i][2], m.atoms[i][3]], [m.atoms[j][1] + dx, m.atoms[j][2], m.atoms[j][3]], o, 0.07));
    m.atoms.forEach(([s, x, y, zz]) => v.pickable(F.mesh.sphere(g, [x + dx, y, zz], RB[s], F.el(s)), `${NAME[s]} of ${who}`));
  }
  function draw3d(v) {
    if (!v.scene) return;
    const s = [PAL.ink, PAL.muted, F.el('C'), F.el('H')].join('|');
    if (s !== sig) {
      sig = s; v.clear();
      molecule(v, CB, -3.6, 'cyclobutane');
      F.mesh.arrow(g, [-1.9, 0, 0], [-0.5, 0, 0], 0.05, PAL.ink);
      molecule(v, ET, 1.0, 'ethylene'); molecule(v, ET, 3.7, 'ethylene');
    }
    v.headline('The ring of cyclobutane is slightly puckered; each ethylene molecule is flat.');
    v.invalidate();
  }
  const V = views(d, VIEW, mount, draw);
  function draw() {
    if (VIEW.value === '3d' && V.v) { hits = []; draw3d(V.v); } else draw2d();
    tex(d.readout, `\\krate = \\kk${hue('concentration', '[\\text{C}_{4}\\text{H}_{8}]')}`);
  }
  still(d, draw);
})();

/* =====================================================================
   FIGURE 12.17: NO2 + CO -> NO + CO2 in one bimolecular step. A stage
   choice walks the book's three frames and morphs between them: the
   oxygen atom that changes partners slides from nitrogen to carbon while
   the others follow. Positions in angstroms, the molecules in the plane
   of the page as the book draws them: NO2 bent at 134 degrees with N-O
   1.20; CO 1.13; in the transition state the moving oxygen 1.27 from N
   and 1.35 from C; NO 1.15 and CO2 1.16 apart afterwards. Space-filling
   radius 0.66. Each stage is centered on its own extent. Still: the
   stages are states of one event, not a clock.
===================================================================== */
(function () {
  const H = 430;
  const d = sim('sim-no2-co', H);
  const SYM = ['N', 'O', 'O', 'C', 'O'];          /* N, the O that stays, the O that moves, C, the O of CO */
  const WHO = ['the nitrogen atom', 'the oxygen atom that stays on nitrogen', 'the oxygen atom that passes from nitrogen to carbon', 'the carbon atom', 'the oxygen atom of carbon monoxide'];
  const RAW = {
    react: [[-2.4, -0.45], [-3.5, 0.02], [-1.3, 0.02], [1.0, 0], [2.13, 0]],
    ts: [[-0.95, -0.85], [-2.0, -0.25], [0, 0], [1.35, 0], [2.48, 0]],
    prod: [[-2.3, -0.75], [-3.3, -0.15], [0.6, 0], [1.76, 0], [2.92, 0]],
  };
  const R = 0.66;
  const POS = {};
  Object.keys(RAW).forEach((k) => {
    const xs = RAW[k].map((p) => p[0]), ys = RAW[k].map((p) => p[1]);
    const mx = (Math.min(...xs) + Math.max(...xs)) / 2, my = (Math.min(...ys) + Math.max(...ys)) / 2;
    POS[k] = RAW[k].flatMap((p) => [p[0] - mx, p[1] - my]);
  });
  const STAGES = {
    react: { label: 'NO₂ + CO', head: 'A molecule of NO₂ and a molecule of CO, two reactant entities, collide in a single step.',
      names: [['NO₂', [0, 1, 2]], ['CO', [3, 4]]] },
    ts: { label: 'transition state', head: 'In the transition state one oxygen atom is held between the nitrogen atom and the carbon atom.',
      names: [['transition state', [0, 1, 2, 3, 4]]] },
    prod: { label: 'NO + CO₂', head: 'That oxygen atom now belongs to carbon: the step ends as a molecule of NO and a molecule of CO₂.',
      names: [['NO', [0, 1]], ['CO₂', [2, 3, 4]]] },
  };
  const stage = F.choice(d.controls, { label: '\\text{stage}', key: 'stage', options: Object.keys(STAGES).map((k) => ({ value: k, label: STAGES[k].label })), value: 'react', aria: 'the stage of the collision', onInput: () => draw() });
  const VIEW = F.choice(d.controls, { label: '\\text{view}', options: VIEWS, value: '2d', aria: 'a flat drawing or a scene to turn', ms: 0, onInput: () => V.show() });
  const ORDER = [0, 3, 1, 2, 4];                  /* nitrogen and carbon drawn first, the oxygens over them, as the book shades them */
  const U = 120, CX = 700, CYc = 235;
  let hits = []; F.hover(d.stage, () => hits);

  function draw2d(P) {
    const { ctx } = begin(d.c); hits = [];
    headline(ctx, STAGES[stage.value].head);
    const at = (i) => [CX + P[2 * i] * U, CYc - P[2 * i + 1] * U];
    ORDER.forEach((i) => { const [x, y] = at(i); atom(ctx, x, y, SYM[i], R * U); });
    [...ORDER].reverse().forEach((i) => { const [x, y] = at(i); hits.push({ x, y, r: R * U * 0.8, name: WHO[i] }); });
    Object.keys(STAGES).forEach((k) => stage.only(ctx, k, () => STAGES[k].names.forEach(([s, idx]) => {
      const q = POS[k], x = CX + idx.reduce((m, i) => m + q[2 * i], 0) / idx.length * U;
      const low = Math.max(...idx.map((i) => -q[2 * i + 1])) + R;
      text(ctx, s, x, CYc + low * U + 34, PAL.ink, { size: 24, align: 'center' });
    }), [0, 10]));
  }

  let g = null;
  function mount() {
    const v = F.view3d(d.stage, { spin: 'off', h: 420, dist: 8.5, tilt: 0, pitch: [-1.05, 1.05], yaw: [-1.2, 1.2],
      views: [{ label: 'front', yaw: 0, pitch: 0 }, { label: 'above', yaw: 0, pitch: 1.0 }] });
    g = v.part(0);
    return v;
  }
  function draw3d(v, P) {
    if (!v.scene) return;
    v.clear();
    SYM.forEach((s, i) => v.pickable(F.mesh.sphere(g, [P[2 * i], P[2 * i + 1], 0], R, F.el(s)), WHO[i]));
    v.headline(STAGES[stage.value].head);
    v.invalidate();
  }
  const V = views(d, VIEW, mount, draw);
  function draw() {
    const P = stage.mix((k) => POS[k]);
    if (VIEW.value === '3d' && V.v) { hits = []; draw3d(V.v, P); } else draw2d(P);
    tex(d.readout, `\\krate = \\kk${hue('concentration', '[\\text{NO}_{2}]')}${hue('concentration', '[\\text{CO}]')}`);
  }
  still(d, draw);
})();

/* =====================================================================
   SIM: the two-step mechanism of NO2 + CO below 225 C,
     step 1  NO2 + NO2 -> NO3 + NO   rate1 = k1 [NO2]^2
     step 2  NO3 + CO  -> NO2 + CO2  rate2 = k2 [NO3][CO]
   integrated by RK4 (dt 0.05 s) from [NO2] = [CO] = 0.100 M. CO2 is made
   only in step 2, so the overall rate is rate2. Axes fixed: t 0 to 100 s,
   concentration 0 to 0.100 M, which holds every curve at every slider
   position (no species exceeds the starting 0.100 M). The rate constants
   are illustrative; the book gives none. Still: the graph carries the
   time course and t only marks the moment read.
===================================================================== */
(function () {
  const H = 600;
  const d = sim('sim-slow-step', H);
  const K = { min: 0.2, max: 5, step: 0.1, unit: 'M⁻¹ s⁻¹', dec: 1 };
  const k1 = ctl(d.controls, { ...K, label: '\\kkone', cls: 'rate-constant', value: 0.5, aria: 'rate constant of step 1' });
  const k2 = ctl(d.controls, { ...K, label: '\\kktwo', cls: 'rate-constant', value: 5, aria: 'rate constant of step 2' });
  const tS = ctl(d.controls, { label: '\\kt', cls: 'time', min: 0, max: 100, step: 1, value: 20, unit: 's', dec: 0, aria: 'time' });
  const C0 = 0.1, T = 100, DT = 0.05, N = Math.round(T / DT);
  const SP = [{ i: 0, name: 'NO₂' }, { i: 1, name: 'NO₃' }, { i: 3, name: 'CO₂' }];
  let run = null, key = '';
  /* y = [NO2, NO3, CO, CO2] */
  function rates(y, a, b) {
    const r1 = a * y[0] * y[0], r2 = b * y[1] * y[2];
    return [-2 * r1 + r2, r1 - r2, -r2, r2];
  }
  function integrate(a, b) {
    const out = [[C0, 0, C0, 0]];
    let y = out[0];
    for (let n = 0; n < N; n++) {
      const add = (p, q, h) => p.map((v, i) => v + q[i] * h);
      const f1 = rates(y, a, b), f2 = rates(add(y, f1, DT / 2), a, b), f3 = rates(add(y, f2, DT / 2), a, b), f4 = rates(add(y, f3, DT), a, b);
      y = y.map((v, i) => Math.max(0, v + DT / 6 * (f1[i] + 2 * f2[i] + 2 * f3[i] + f4[i])));
      out.push(y);
    }
    return out;
  }
  const at = (t) => { const x = Math.min(N, Math.max(0, t / DT)), i = Math.min(N - 1, Math.floor(x)), f = x - i; return run[i].map((v, j) => v + (run[i + 1][j] - v) * f); };
  const sci = (v, s) => {
    if (v >= 1e-3 && v < 10) return v.toPrecision(s);
    if (!(v > 0)) return '0';
    let e = Math.floor(Math.log10(v)), m = v / Math.pow(10, e);
    if (+m.toFixed(s - 1) >= 10) { m /= 10; e += 1; }
    return `${m.toFixed(s - 1)} \\times 10^{${e}}`;
  };
  const BOX = { l: 150, r: 1220, t: 240, b: 500 };
  let hits = []; F.hover(d.stage, () => hits);
  function draw() {
    const a = k1.v, b = k2.v, t = tS.v;
    const kk = `${a}|${b}`; if (kk !== key) { key = kk; run = integrate(a, b); }
    const { ctx } = begin(d.c), lab = F.labeller(ctx, H, { headline: true });
    hits = [];
    const ratio = b / a, slow = ratio >= 3 ? 1 : ratio <= 1 / 3 ? 2 : 0;
    topline(ctx, slow === 1 ? 'Step 1 is the slow step: NO₃ is used as fast as it forms, and CO₂ forms at the rate of step 1.'
      : slow === 2 ? 'Step 2 is the slow step: NO₃ piles up, and CO₂ forms only as fast as step 2 uses it.'
      : 'Neither step is much slower than the other, so NO₃ builds up partway before it is used.');
    [['Step 1:', 'NO₂ + NO₂ ⟶ NO₃ + NO', slow === 1 ? '(slow)' : slow === 2 ? '(fast)' : ''],
     ['Step 2:', 'NO₃ + CO ⟶ NO₂ + CO₂', slow === 2 ? '(slow)' : slow === 1 ? '(fast)' : '']].forEach(([s, eq, tag], i) => {
      const y = 122 + i * 36;
      text(ctx, s, BOX.l, y, PAL.muted, { size: 20 });
      text(ctx, eq, BOX.l + 90, y, PAL.ink, { size: 22 });
      if (tag) text(ctx, tag, BOX.l + 410, y, tag === '(slow)' ? PAL.ink : PAL.muted, { size: 20, weight: tag === '(slow)' ? 600 : 400 });
      lab.block(BOX.l - 8, y - 16, BOX.l + 480, y + 16);
    });
    const g = F.axes(ctx, BOX, [0, T], [0, C0], { nx: 5, ny: 5, fy: (v) => fmt(v, 2), xl: 't (s)', xc: C('time'), yl: 'concentration (M)', yc: C('concentration') });
    line(ctx, g.X(t), BOX.t, g.X(t), BOX.b, alpha(PAL.ink, 0.35), 2, [4, 8]);
    const yt = at(t);
    SP.forEach(({ i, name }, n) => {
      const col = F.cat(n);
      F.curve(ctx, (s) => at(s)[i], 0, T, g.X, g.Y, col, 5, 200);
      for (let s = 0; s <= T; s += 2) { const y = g.Y(at(s)[i]); lab.block(g.X(s) - 3, y - 3, g.X(s) + 3, y + 3); }
      lab.add(name, g.X(T), g.Y(run[N][i]), 1, 0, col, 22, 14);
      const px = g.X(t), py = g.Y(yt[i]);
      F.dot(ctx, px, py, col, true, 8);
      hits.push({ x: px, y: py, r: 12, name: `the concentration of ${name} at ${fmt(t, 0)} s` });
    });
    lab.flush();
    const r1 = a * yt[0] * yt[0], r2 = b * yt[1] * yt[2];
    const M = (v) => hue('concentration', `${sci(v, 2)}\\ \\text{M}`), KU = '\\ \\text{M}^{-1}\\,\\text{s}^{-1}', RU = '\\ \\text{M/s}';
    tex(d.readout, `\\krate = {\\krate}_{2} = \\kktwo${hue('concentration', '[\\text{NO}_{3}]')}${hue('concentration', '[\\text{CO}]')} = (${hue('rate-constant', fmt(b, 1) + KU)})(${M(yt[1])})(${M(yt[2])}) = ${hue('rate', sci(r2, 2) + RU)}`);
    const sm = d.readout.appendChild(el('small'));
    tex(sm, `{\\krate}_{1} = \\kkone${hue('concentration', '[\\text{NO}_{2}]')}^{2} = (${hue('rate-constant', fmt(a, 1) + KU)})(${M(yt[0])})^{2} = ${hue('rate', sci(r1, 2) + RU)}`);
  }
  still(d, draw);
})();
};
