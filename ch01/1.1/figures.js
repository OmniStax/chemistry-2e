/* Figures for section 1.1 Chemistry in Context. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['1.1'] = function (root, F) {
const { el, tex, C, PAL, alpha, ctl, register, begin, line, arrow, text, headline, topline, FONT } = F;
const sim = (id, H) => F.sim(root, id, H);
function readout(host, main, small) { tex(host, main); if (small) host.appendChild(el('small', null, small)); }
const TAU = 2 * Math.PI;
/* an atom as a filled disc in its element's colour (rule 7.2): hydrogen is a light disc and takes an ink outline so that it reads on a light page */
function atom(ctx, x, y, sym, r) {
  ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fillStyle = F.el(sym); ctx.fill();
  ctx.lineWidth = sym === 'H' ? 2 : 1.2; ctx.strokeStyle = sym === 'H' ? PAL.ink : alpha(PAL.ink, 0.4); ctx.stroke(); ctx.restore();
}
const NAME = { H: 'hydrogen', O: 'oxygen' };

/* ---------- small helpers shared by the figures ---------- */
/* a rounded box centred on (cx, cy) with its label on one or more lines */
function box(ctx, cx, cy, w, h, lines, o = {}) {
  const r = 12, x = cx - w / 2, y = cy - h / 2;
  ctx.save(); ctx.fillStyle = o.fill ?? PAL.panel; ctx.strokeStyle = o.stroke ?? PAL.muted; ctx.lineWidth = o.lw ?? 3;
  ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
  ctx.fill(); ctx.stroke(); ctx.restore();
  const size = o.size ?? 22, lh = size * 1.25, y0 = cy - lh * (lines.length - 1) / 2;
  lines.forEach((s, i) => text(ctx, s, cx, y0 + i * lh, o.color ?? PAL.ink, { size, weight: o.weight ?? 400, align: 'center' }));
}
/* several lines of small text, left- or centre-aligned, starting at y */
function lines(ctx, ls, x, y, o = {}) {
  const size = o.size ?? 19, lh = size * 1.25;
  ls.forEach((s, i) => text(ctx, s, x, y + i * lh, o.color ?? PAL.ink, { size, weight: o.weight ?? 400, align: o.align ?? 'left' }));
}
/* an arc of an ellipse drawn as an arrow, ending in a head along its tangent; angles increase clockwise on the canvas */
function arcArrow(ctx, cx, cy, rx, ry, a0, a1, color, w = 4) {
  ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = w; ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, 0, a0, a1, false); ctx.stroke(); ctx.restore();
  const at = (a) => [cx + rx * Math.cos(a), cy + ry * Math.sin(a)], [ex, ey] = at(a1), [bx, by] = at(a1 - 0.08);
  arrow(ctx, bx, by, ex, ey, color, w);
}
/* a seeded generator, so a still picture is the same picture every time it is drawn */
function rng(seed) { let a = seed >>> 0; return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

/* =====================================================================
   Figure 1.3: chemistry among the other sciences, redrawn from the book's
   diagram. A still picture with nothing to vary.
   ===================================================================== */
(function () {
  const d = sim('fig-chemweb', 620);
  const k = 1400 / 1300;                                   // the book's diagram is 1300 wide
  const P = (x, y) => [x * k, y * k + 10];
  const N = {
    med: { p: P(178, 63), w: 180, l: ['Medicine'] },
    bio: { p: P(402, 63), w: 180, l: ['Biology'] },
    food: { p: P(650, 63), w: 230, l: ['Food Science'] },
    agri: { p: P(900, 63), w: 200, l: ['Agriculture'] },
    geo: { p: P(1165, 63), w: 240, l: ['Geology', 'Earth Sciences'] },
    tox: { p: P(97, 225), w: 180, l: ['Toxicology'] },
    biochem: { p: P(375, 210), w: 240, l: ['Biochemistry', 'Molecular Biology'] },
    env: { p: P(650, 180), w: 200, l: ['Environmental', 'Science'] },
    geochem: { p: P(962, 187), w: 200, l: ['Geochemistry'] },
    phys: { p: P(1195, 255), w: 180, l: ['Physics'] },
    cheme: { p: P(283, 352), w: 280, l: ['Chemical Engineering'] },
    chem: { p: P(670, 347), w: 170, l: ['Chemistry'] },
    nuc: { p: P(932, 316), w: 190, l: ['Nuclear', 'Chemistry'] },
    mat: { p: P(283, 463), w: 280, l: ['Materials Science'] },
    nano: { p: P(585, 500), w: 240, l: ['Nanoscience', 'Nanotechnology'] },
    chemphys: { p: P(845, 500), w: 190, l: ['Chemical', 'Physics'] },
    math: { p: P(1150, 420), w: 200, l: ['Mathematics'] },
    cs: { p: P(1150, 515), w: 280, l: ['Computer Science'] },
  };
  const E = [['med', 'bio'], ['bio', 'food'], ['food', 'agri'], ['med', 'tox'], ['med', 'biochem'], ['bio', 'biochem'], ['bio', 'env'], ['tox', 'biochem'],
    ['biochem', 'env'], ['biochem', 'chem'], ['env', 'chem'], ['agri', 'chem'], ['agri', 'geochem'], ['geo', 'geochem'], ['geochem', 'chem'], ['chem', 'nuc'],
    ['nuc', 'phys'], ['phys', 'math'], ['chem', 'math'], ['math', 'cs'], ['math', 'chemphys'], ['chemphys', 'cs'], ['chem', 'chemphys'], ['chem', 'nano'],
    ['chem', 'mat'], ['chem', 'cheme'], ['cheme', 'mat'], ['mat', 'nano']];
  function draw() {
    const { ctx } = begin(d.c);
    E.forEach(([a, b]) => line(ctx, N[a].p[0], N[a].p[1], N[b].p[0], N[b].p[1], PAL.muted, 5));
    Object.entries(N).forEach(([id, n]) => {
      const centre = id === 'chem';
      box(ctx, n.p[0], n.p[1], n.w, n.l.length > 1 ? 82 : 60, n.l, { stroke: centre ? PAL.ink : PAL.muted, lw: centre ? 4 : 3, weight: centre ? 600 : 400, fill: centre ? PAL.soft : PAL.panel });
    });
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   Figure 1.4: the scientific method, redrawn from the book's flowchart.
   A still picture: the loop in it is a loop of reasoning, not a clock.
   ===================================================================== */
(function () {
  const d = sim('fig-scimethod', 830);
  const k = 1400 / 1300;
  const P = (x, y) => [x * k, y * k + 8];
  const W = 205, Hb = 165;
  const obs = P(330, 83), hyp = P(330, 350), exp = P(330, 560), know = P(800, 452), law = P(1133, 243), thy = P(1133, 662);
  function draw() {
    const { ctx } = begin(d.c);
    const ink = PAL.ink, mut = PAL.muted;
    /* observation down to hypothesis */
    arrow(ctx, obs[0], obs[1] + Hb / 2, hyp[0], hyp[1] - Hb / 2 - 4, mut, 5);
    /* the loop between hypothesis and experiment: "next" down the right side, the failed prediction back up the left */
    const mid = (hyp[1] + exp[1]) / 2, rx = 150, ry = (exp[1] - hyp[1]) / 2 - 6, a = Math.acos((W / 2 + 4) / rx);
    arcArrow(ctx, hyp[0], mid, rx, ry, -a, a, mut, 5);                          // next: down the right side
    arcArrow(ctx, hyp[0], mid, rx, ry, Math.PI - a, Math.PI + a, mut, 5);       // results not consistent: back up the left side
    /* experiment to the body of knowledge, and knowledge back to the hypothesis */
    arrow(ctx, exp[0] + W / 2, exp[1] - 20, know[0] - W / 2 - 4, know[1] + 40, mut, 5);
    arrow(ctx, know[0] - W / 2, know[1] - 40, hyp[0] + W / 2 + 4, hyp[1] - 30, mut, 5);
    /* the two elbows out of the body of knowledge */
    line(ctx, know[0], know[1] - Hb / 2, know[0], law[1], mut, 5); arrow(ctx, know[0], law[1], law[0] - W / 2 - 4, law[1], mut, 5);
    line(ctx, know[0], know[1] + Hb / 2, know[0], thy[1], mut, 5); arrow(ctx, know[0], thy[1], thy[0] - W / 2 - 4, thy[1], mut, 5);
    /* the boxes */
    box(ctx, obs[0], obs[1], W, Hb, ['Observation', 'and', 'curiosity'], { weight: 600, fill: PAL.soft });
    box(ctx, hyp[0], hyp[1], W, Hb, ['Form', 'hypothesis;', 'make', 'prediction'], { weight: 600 });
    box(ctx, exp[0], exp[1], W, Hb, ['Perform', 'experiment;', 'make more', 'observations'], { weight: 600 });
    box(ctx, know[0], know[1], W, Hb, ['Contributes', 'to body of', 'knowledge'], { weight: 600 });
    box(ctx, law[0], law[1], W, Hb, ['Observation', 'becomes', 'law'], { weight: 600 });
    box(ctx, thy[0], thy[1], W, Hb, ['Hypothesis', 'becomes', 'theory'], { weight: 600 });
    /* the labels on the arrows, the book's own words; its three red phrases are set heavier here */
    text(ctx, 'Next …', hyp[0] + rx + 14, mid, ink, { size: 19 });
    lines(ctx, ['Results'], hyp[0] - rx - 12, mid - 24, { align: 'right' });
    lines(ctx, ['not consistent with'], hyp[0] - rx - 12, mid, { align: 'right', weight: 600 });
    lines(ctx, ['prediction'], hyp[0] - rx - 12, mid + 24, { align: 'right' });
    lines(ctx, ['Results'], 560, exp[1] - 8, { align: 'center' });
    lines(ctx, ['are consistent with'], 560, exp[1] + 16, { align: 'center', weight: 600 });
    lines(ctx, ['prediction'], 560, exp[1] + 40, { align: 'center' });
    lines(ctx, ['Further testing'], 600, hyp[1] - 74, { align: 'center' });
    lines(ctx, ['does not support'], 600, hyp[1] - 50, { align: 'center', weight: 600 });
    lines(ctx, ['hypothesis'], 600, hyp[1] - 26, { align: 'center' });
    lines(ctx, ['Much additional', 'testing yields', 'constant', 'observations'], know[0] + 20, law[1] - 100);
    lines(ctx, ['Much additional', 'testing supports', 'hypothesis'], know[0] + 20, thy[1] + 34);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* ---------- three dimensions ----------
   The book's rule for this chapter (Chemistry 2e RULES.md, Figures): a
   molecule inset in an otherwise flat figure is built both ways behind a
   view choice, 2D and 3D, defaulting to 2D, because the flat diagram is
   itself something the book teaches; the 3D stage mounts on the first
   switch. The viewer, the meshes and the buttons come from the library
   (F.view3d, F.mesh); what stays here is how a water molecule is built. */
const T3D = window.THREE;
const { sphere: sphere3, stick: stick3 } = F.mesh;
/* the signature of everything a scene's colours are read from, so a theme change rebuilds it */
const palSig = () => [PAL.ink, PAL.panel, PAL.soft, PAL.muted, F.CC, F.el('O'), F.el('H')].join('|');
/* a figlib canvas beneath the viewer for the headline */
const strip = (d, H) => F.makeCanvas(d.stage, H);
const V3 = {
  add: (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]],
  mul: (a, k) => [a[0] * k, a[1] * k, a[2] * k],
  cross: (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]],
  unit: (a) => { const l = Math.hypot(a[0], a[1], a[2]) || 1; return [a[0] / l, a[1] / l, a[2] / l]; },
};
/* one water molecule in the scene: an oxygen at p, two hydrogens 104.5° apart at bond length b in the plane spanned by the
   unit vectors u and w, every sphere named for the pointer (rule 26.6) */
function water3(v, g, p, u, w, b = 0.26) {
  const h = 0.912;
  v.pickable(sphere3(g, p, 0.13, F.el('O')), NAME.O + ' atom of a water molecule');
  [-h, h].forEach((q) => {
    const hp = V3.add(p, V3.mul(V3.add(V3.mul(u, Math.cos(q)), V3.mul(w, Math.sin(q))), b));
    stick3(g, p, hp, 0.035, PAL.ink); v.pickable(sphere3(g, hp, 0.08, F.el('H')), NAME.H + ' atom of a water molecule');
  });
}
/* a seeded frame of two perpendicular unit vectors, so a molecule is turned the same way on every rebuild */
function frame(r) {
  const a = V3.unit([r() - 0.5, r() - 0.5, r() - 0.5]), t = Math.abs(a[1]) < 0.9 ? [0, 1, 0] : [1, 0, 0];
  const u = V3.unit(V3.cross(a, t)); return [u, V3.cross(a, u)];
}

/* =====================================================================
   Figure 1.5: water in the three domains. A beaker with a thermometer,
   the formula with its state letter, and the molecules in a circle, all
   answering one temperature slider. Still: a state at a temperature has
   no clock in it. The microscopic domain is built both ways behind a
   view choice: the flat circle the book draws, and the same molecules
   as a cluster in three dimensions the reader turns, mounted on the
   first switch, sharing the slider, the state buttons and the readout;
   the cluster turns freely, since a cluster of molecules has no ground.
   ===================================================================== */
(function () {
  const d = sim('sim-water', 560);
  /* the view is a state (rule 26.1): the flat drawing, which the book teaches, or the molecules turned in three dimensions */
  const VIEW = F.choice(d.controls, { label: '\\text{view}', options: [{ value: '2d', label: '2D' }, { value: '3d', label: '3D' }], value: '2d', aria: 'a flat drawing or a scene to turn', onInput: show });
  const T = ctl(d.controls, { label: '\\kT', cls: 'temperature', min: -40, max: 140, step: 1, value: 25, unit: '°C', dec: 0, aria: 'temperature' });
  const stateOf = (t) => (t < 0 ? 's' : t < 100 ? 'l' : 'g');
  /* the state is a thing the reader chooses as well as a thing the temperature decides (rule 26.1): three buttons, the one the
     temperature falls in marked; pressing one sets the temperature to a value inside that state, and the slider is still free */
  const PRESET = { s: -10, l: 25, g: 110 };
  const S = F.choice(d.controls, { label: '\\text{state}', options: [{ value: 's', label: 'solid' }, { value: 'l', label: 'liquid' }, { value: 'g', label: 'gas' }], value: stateOf(T.v), aria: 'state of the water', onInput: (v) => T.set(PRESET[v]) });
  const WORD = { s: 'a solid', l: 'a liquid', g: 'a gas' };
  const MICRO = { s: 'close together and organized', l: 'close together and disordered', g: 'far apart and disorganized' };
  const headOf = (t, s) => `At ${t} °C the water in the beaker is ${WORD[s]}, H₂O(${s}), and its molecules are ${MICRO[s]}.`;
  /* the atoms drawn this frame, handed to the hover tooltip so that every disc has a name (rule 26.6) */
  let hits = [];
  F.hover(d.stage, () => hits);
  const named = (x, y, sym, r) => { atom(ctx0, x, y, sym, r); hits.push({ x, y, r: r + 3, name: NAME[sym] + ' atom of a water molecule' }); };
  let ctx0 = null;
  /* one water molecule: a red disc for the oxygen, two light discs for the hydrogens, 104.5° apart */
  function molecule(ctx, x, y, a) {
    const b = 21, h = 0.912;                               // bond length on the canvas and half the bond angle in radians
    [a - h, a + h].forEach((q) => { const hx = x + b * Math.cos(q), hy = y + b * Math.sin(q); line(ctx, x, y, hx, hy, PAL.ink, 3); });
    named(x, y, 'O', 10);
    [a - h, a + h].forEach((q) => named(x + b * Math.cos(q), y + b * Math.sin(q), 'H', 6));
  }
  /* the beaker: an open glass with a lip, its inside from (x0, y0) at the top left to (x1, y1) at the bottom right */
  function beaker(ctx, x0, y0, x1, y1) {
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 4; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.moveTo(x0 - 12, y0); ctx.lineTo(x0, y0 + 8); ctx.lineTo(x0, y1 - 14); ctx.quadraticCurveTo(x0, y1, x0 + 14, y1);
    ctx.lineTo(x1 - 14, y1); ctx.quadraticCurveTo(x1, y1, x1, y1 - 14); ctx.lineTo(x1, y0 + 8); ctx.lineTo(x1 + 12, y0); ctx.stroke(); ctx.restore();
  }
  /* the thermometer standing in the beaker, its column in the temperature hue */
  function thermometer(ctx, x, top, bulbY, t) {
    const col = C('temperature'), y0 = bulbY - 16, span = y0 - top - 20;   // the column runs from y0 up to top + 20 over −40 … 140 °C
    const Y = (v) => y0 - ((v + 40) / 180) * span;
    ctx.save(); ctx.strokeStyle = PAL.muted; ctx.fillStyle = PAL.panel; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(x - 9, top); ctx.lineTo(x - 9, y0); ctx.arc(x, bulbY, 18, Math.PI * 1.2, Math.PI * 1.8, true); ctx.lineTo(x + 9, top); ctx.arc(x, top, 9, 0, Math.PI, true); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore();
    ctx.save(); ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, bulbY, 13, 0, Math.PI * 2); ctx.fill(); ctx.fillRect(x - 4, Y(t), 8, y0 - Y(t) + 4); ctx.restore();
    [0, 100].forEach((v) => { line(ctx, x + 9, Y(v), x + 22, Y(v), PAL.muted, 2); text(ctx, v + ' °C', x + 28, Y(v), PAL.muted, { size: 17 }); });
    text(ctx, t + ' °C', x, top - 26, col, { size: 24, weight: 600, align: 'center' });
  }
  /* the flat drawing: the three domains side by side */
  function draw2d() {
    const { ctx } = begin(d.c);
    ctx0 = ctx; hits = [];
    const t = T.v, s = stateOf(t);
    headline(ctx, headOf(t, s));
    /* (a) the macroscopic domain: the beaker and what is in it */
    const bx0 = 150, bx1 = 410, by0 = 120, by1 = 470, lvl = 250;
    if (s === 'l') { ctx.save(); ctx.fillStyle = PAL.soft; ctx.fillRect(bx0, lvl, bx1 - bx0, by1 - lvl - 2); ctx.restore(); line(ctx, bx0, lvl, bx1, lvl, PAL.muted, 3); }
    if (s === 's') {
      ctx.save(); ctx.fillStyle = PAL.soft; ctx.fillRect(bx0, lvl - 14, bx1 - bx0, by1 - lvl + 12); ctx.restore(); line(ctx, bx0, lvl - 14, bx1, lvl - 14, PAL.muted, 3);
      [[250, 290, 300, 370], [320, 270, 370, 340], [230, 420, 330, 450], [340, 380, 390, 430]].forEach(([a, b, c, e]) => line(ctx, a, b, c, e, PAL.muted, 2, [6, 6]));
    }
    if (s === 'g') {
      ctx.save(); ctx.strokeStyle = PAL.muted; ctx.lineWidth = 2.5; ctx.setLineDash([8, 7]);
      [250, 310, 370].forEach((x, i) => { ctx.beginPath(); ctx.moveTo(x, by1 - 30); for (let y = by1 - 30; y > by0 - 40; y -= 10) ctx.lineTo(x + 18 * Math.sin((y + i * 40) / 28), y); ctx.stroke(); });
      ctx.restore();
    }
    beaker(ctx, bx0, by0, bx1, by1);
    thermometer(ctx, 200, 100, 415, t);
    hits.push({ x: 200, y: 415, r: 24, name: 'thermometer, reading ' + t + ' °C' }, { x: 200, y: 250, r: 16, name: 'thermometer, reading ' + t + ' °C' });
    text(ctx, WORD[s], (bx0 + bx1) / 2 + 30, by1 + 30, PAL.ink, { size: 22, align: 'center', weight: 600 });
    text(ctx, 'macroscopic domain', (bx0 + bx1) / 2, 530, PAL.muted, { size: 19, align: 'center' });
    /* (c) the symbolic domain: the formula between the two pictures */
    const fx = 700, fy = 300;
    arrow(ctx, bx1 + 40, fy, fx - 120, fy, PAL.muted, 4);
    arrow(ctx, fx + 120, fy, 1110 - 165 - 28, fy, PAL.muted, 4);
    ctx.save(); ctx.fillStyle = PAL.ink; ctx.textBaseline = 'middle'; ctx.textAlign = 'left';
    const big = `600 52px ${FONT}`, ital = `italic 600 52px ${FONT}`, sub = `600 34px ${FONT}`;
    const wOf = (f, str) => { ctx.font = f; return ctx.measureText(str).width; };
    const parts = [[big, 'H', 0], [sub, '2', 16], [big, 'O(', 0], [ital, s, 0], [big, ')', 0]];
    const total = parts.reduce((a, [f, str]) => a + wOf(f, str), 0); let x = fx - total / 2;
    parts.forEach(([f, str, dy]) => { ctx.font = f; ctx.fillText(str, x, fy + dy); x += ctx.measureText(str).width; });
    ctx.restore();
    text(ctx, 'symbolic domain', fx, 530, PAL.muted, { size: 19, align: 'center' });
    /* (b) the microscopic domain: the molecules in a circle */
    const cx = 1110, cy = 300, R = 165;
    ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fillStyle = PAL.panel; ctx.fill(); ctx.clip();
    if (s === 's') {
      /* six-membered rings: the oxygens at the corners of a honeycomb, a hydrogen on two of each one's three bonds */
      const b = 46, O = [], seen = new Set();
      for (let j = -3; j <= 3; j++) for (let i = -3; i <= 3; i++) {
        const hx = cx + (i + (j & 1 ? 0.5 : 0)) * b * Math.sqrt(3), hy = cy + j * 1.5 * b;
        for (let k = 0; k < 6; k++) { const a = Math.PI / 6 + k * Math.PI / 3, p = [Math.round(hx + b * Math.cos(a)), Math.round(hy + b * Math.sin(a))]; const key = p.join(','); if (!seen.has(key)) { seen.add(key); O.push(p); } }
      }
      const near = (p, q) => Math.abs(Math.hypot(p[0] - q[0], p[1] - q[1]) - b) < 3;
      O.forEach((p, n) => { O.slice(n + 1).forEach((q) => { if (near(p, q)) line(ctx, p[0], p[1], q[0], q[1], PAL.rule, 2); }); });
      O.forEach((p, n) => {
        const nb = O.filter((q) => near(p, q)).slice(n % 2, n % 2 + 2);
        const hs = nb.map((q) => [p[0] + (q[0] - p[0]) * 0.42, p[1] + (q[1] - p[1]) * 0.42]);
        hs.forEach(([hx, hy]) => line(ctx, p[0], p[1], hx, hy, PAL.ink, 3));
        named(p[0], p[1], 'O', 10);
        hs.forEach(([hx, hy]) => named(hx, hy, 'H', 6));
      });
    } else if (s === 'l') {
      const r = rng(11), g = 50;
      for (let j = -4; j <= 4; j++) for (let i = -4; i <= 4; i++) {
        const x0 = cx + i * g + (r() - 0.5) * 22 + (j % 2 ? g / 2 : 0), y0 = cy + j * g * 0.9 + (r() - 0.5) * 22;
        if (Math.hypot(x0 - cx, y0 - cy) < R + 20) molecule(ctx, x0, y0, r() * Math.PI * 2);
      }
    } else {
      const r = rng(7);
      [[-95, -80], [60, -105], [-20, 10], [110, 40], [-110, 70], [30, 120], [-60, -20]].forEach(([dx, dy]) => molecule(ctx, cx + dx, cy + dy, r() * Math.PI * 2));
    }
    ctx.restore();
    ctx.save(); ctx.strokeStyle = PAL.muted; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
    text(ctx, 'microscopic domain', cx, 530, PAL.muted, { size: 19, align: 'center' });
  }
  /* the scene: the same molecules as a cluster the reader turns, an ice lattice of two honeycomb layers, a crowded disorder,
     or a few far apart, inside a faint sphere that stands for the circle of the flat drawing; mounted on the first switch */
  let v = null, grp = null, cnv = null, sig = '';
  function mount() {
    v = F.view3d(d.stage, { spin: 'idle', views: [{ label: 'front', yaw: 0, pitch: 0.2 }, { label: 'above', yaw: 0, pitch: 1.2 }], h: 440, dist: 8 });
    grp = v.part(0); cnv = strip(d, 90);
  }
  function build() {
    const s = stateOf(T.v), key = [s, palSig()].join('|'); if (key === sig) return; sig = key;
    v.clear();
    const RW = 1.75;
    const window3 = new T3D.Mesh(new T3D.SphereGeometry(RW, 36, 24), F.mesh.mat(PAL.ink, { transparent: true, opacity: 0.06, depthWrite: false, side: T3D.DoubleSide })); window3.renderOrder = 2; grp.add(window3);
    if (s === 's') {
      /* two honeycomb layers, the oxygens at the corners, each bonded to two of its three neighbours in the layer and hydrogen-bonded to the layer above */
      const b = 0.42, layers = [-0.45, 0.45];
      layers.forEach((z, li) => {
        const O = [], seen = new Set();
        for (let j = -2; j <= 2; j++) for (let i = -2; i <= 2; i++) {
          const hx = (i + (j & 1 ? 0.5 : 0)) * b * Math.sqrt(3), hy = j * 1.5 * b;
          for (let k = 0; k < 6; k++) { const a = Math.PI / 6 + k * Math.PI / 3, p = [+(hx + b * Math.cos(a)).toFixed(3), +(hy + b * Math.sin(a)).toFixed(3)]; const kk = p.join(','); if (!seen.has(kk) && Math.hypot(p[0], p[1]) < RW - 0.35) { seen.add(kk); O.push(p); } }
        }
        const near = (p, q) => Math.abs(Math.hypot(p[0] - q[0], p[1] - q[1]) - b) < 0.02;
        O.forEach((p, n) => { O.slice(n + 1).forEach((q) => { if (near(p, q)) stick3(grp, [p[0], p[1], z], [q[0], q[1], z], 0.012, PAL.muted, { transparent: true, opacity: 0.5 }); }); });
        O.forEach((p, n) => {
          const nb = O.filter((q) => near(p, q)).slice(n % 2, n % 2 + 2), P = [p[0], p[1], z];
          v.pickable(sphere3(grp, P, 0.13, F.el('O')), NAME.O + ' atom of a water molecule');
          nb.forEach((q) => { const H = [p[0] + (q[0] - p[0]) * 0.4, p[1] + (q[1] - p[1]) * 0.4, z]; stick3(grp, P, H, 0.035, PAL.ink); v.pickable(sphere3(grp, H, 0.08, F.el('H')), NAME.H + ' atom of a water molecule'); });
          if (li === 0 && n % 2 === 0) stick3(grp, P, [p[0], p[1], layers[1]], 0.012, PAL.muted, { transparent: true, opacity: 0.5 });
        });
      });
    } else if (s === 'l') {
      const r = rng(11), pts = [];
      while (pts.length < 30) {
        const p = [(r() - 0.5) * 2 * (RW - 0.3), (r() - 0.5) * 2 * (RW - 0.3), (r() - 0.5) * 2 * (RW - 0.3)];
        if (Math.hypot(...p) < RW - 0.3 && pts.every((q) => Math.hypot(p[0] - q[0], p[1] - q[1], p[2] - q[2]) > 0.5)) pts.push(p);
      }
      pts.forEach((p) => { const [u, w] = frame(r); water3(v, grp, p, u, w); });
    } else {
      const r = rng(7);
      [[-0.95, -0.8, 0.3], [0.6, -1.05, -0.5], [-0.2, 0.1, 0.9], [1.1, 0.4, 0.2], [-1.1, 0.7, -0.6], [0.3, 1.2, -0.3], [-0.6, -0.2, -1.1]].forEach((p) => { const [u, w] = frame(r); water3(v, grp, p, u, w); });
    }
    v.label('microscopic domain', [0, -RW, 0], grp, 6);   /* over the sphere's lowest point, inside it, so it never leaves the canvas */
  }
  function draw3d() {
    build(); v.invalidate();
    const { ctx } = begin(cnv);
    topline(ctx, headOf(T.v, stateOf(T.v)) + ' Drag to turn the molecules.');
  }
  /* one stage shows at a time: the canvas, or the scene with its button row and its strip */
  function show() {
    const three = VIEW.value === '3d';
    if (three && !v) mount();
    d.c.style.display = three ? 'none' : '';
    if (v) [v.wrap, d.stage.querySelector('.view3d-bar'), cnv].forEach((e) => { if (e) e.style.display = three ? '' : 'none'; });
    draw();
  }
  function draw() {
    const t = T.v, s = stateOf(t);
    S.set(s);
    if (VIEW.value === '3d') draw3d(); else draw2d();
    readout(d.readout, `\\kT = ${t}\\ ^\\circ\\text{C} \\qquad \\text{H}_2\\text{O}(\\mathit{${s}})`,
      'The formula H₂O names both the water in the beaker and the molecule in the circle; only the letter in parentheses changes with the state.');
  }
  register(d.fig, { update: () => {}, draw });
})();
};
