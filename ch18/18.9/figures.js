/* Figures for section 18.9 Occurrence, Preparation, and Compounds of Oxygen. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['18.9'] = function (root, F) {
const { C, PAL, alpha, register, begin, line, text } = F;

/* =====================================================================
   FIGURE 18.55 + 18.56 + 18.57: the oxyanions of chlorine. Chlorine
   keeps four electron pairs at the corners of a tetrahedron; from ClO-
   to ClO4- each step turns one of its lone pairs into the pair it
   shares with a new oxygen atom. Above, the chosen ion as the book's
   perspective drawing, in three dimensions: balls, sticks, lobes for
   the lone pairs and the tetrahedron's edges. Beneath, the four ions
   side by side as the book's electron-dot structures, each over its
   name, chlorine's oxidation state and its parent acid with Table
   18.2's pKa (HOCl 7.5, HClO2 2.0; HClO3 and HClO4 strong, no value
   given). Still: a series of states; the choice morphs between them.
===================================================================== */
(function () {
  const d = F.sim(root, 'sim-chlorine-oxyanions');
  const ORDER = ['ClO', 'ClO2', 'ClO3', 'ClO4'];
  /* the sites in the order oxygen takes them, as the book draws them: right, then left, then down, then up */
  const SITES = ['right', 'left', 'down', 'up'];
  const ION = {
    ClO: { n: 1, label: 'ClO⁻', name: 'hypochlorite', tex: '\\text{ClO}^{-}', acid: '\\text{HOCl}', acidPlain: 'HOCl', pKa: '7.5',
      head: 'In hypochlorite, ClO⁻, one of chlorine’s four electron pairs bonds the oxygen atom and three are lone pairs.' },
    ClO2: { n: 2, label: 'ClO₂⁻', name: 'chlorite', tex: '\\text{ClO}_{2}^{-}', acid: '\\text{HClO}_{2}', acidPlain: 'HClO₂', pKa: '2.0',
      head: 'In chlorite, ClO₂⁻, two of chlorine’s four electron pairs bond oxygen atoms and two are lone pairs, so the ion is bent.' },
    ClO3: { n: 3, label: 'ClO₃⁻', name: 'chlorate', tex: '\\text{ClO}_{3}^{-}', acid: '\\text{HClO}_{3}', acidPlain: 'HClO₃', pKa: null,
      head: 'In chlorate, ClO₃⁻, three of chlorine’s four electron pairs bond oxygen atoms and one is a lone pair, so the ion is trigonal pyramidal.' },
    ClO4: { n: 4, label: 'ClO₄⁻', name: 'perchlorate', tex: '\\text{ClO}_{4}^{-}', acid: '\\text{HClO}_{4}', acidPlain: 'HClO₄', pKa: null,
      head: 'In perchlorate, ClO₄⁻, all four of chlorine’s electron pairs bond oxygen atoms, so the ion is tetrahedral.' },
  };
  const has = (v, s) => (SITES.indexOf(s) < ION[v].n ? 1 : 0);

  /* ---------- the chosen ion in three dimensions ---------- */
  const R3 = 1.6, a3 = Math.sqrt(2 / 3), b3 = Math.sqrt(1 / 3);
  /* a regular tetrahedron (every angle at chlorine 109.5°, every corner R3 from it). Right and left lie in the plane of
     the screen below chlorine, so chlorite's two bonds open as a V toward the reader; the other two corners rise in
     front and behind. Oxygen takes them in the book's order: right, left, then the two the dot structure draws down and up */
  const T3 = { right: [a3, -b3, 0], left: [-a3, -b3, 0], down: [0, b3, a3], up: [0, b3, -a3] };
  /* how each ion is stood up so its shape reads at once: hypochlorite's one bond level, chlorite's V upright, and
     chlorate and perchlorate tipped until the last corner stands straight up over a base of three oxygen atoms;
     y lifts or lowers the ion to the middle of its stage */
  const POSE = { ClO: { x: 0, z: Math.atan(b3 / a3), y: 0.1 }, ClO2: { x: 0, z: 0, y: 0.25 }, ClO3: { x: Math.acos(b3), z: 0, y: 0.15 }, ClO4: { x: Math.acos(b3), z: 0, y: -0.3 } };
  const top = F.makeCanvas(d.stage, 104);
  const V = F.view3d(d.stage, { h: 500, dist: 6.9, tilt: 0.2, pitch: [-Math.PI / 2, Math.PI / 2] });
  const g = V.part(0);
  V.setView(0.6, 0.2);
  const key = F.makeCanvas(d.stage, 56);
  const row = F.makeCanvas(d.stage, 446);
  const ion = F.choice(d.controls, { label: '\\text{ion}', key: 'ion', aria: 'the chlorine oxyanion',
    options: ORDER.map((v) => ({ value: v, label: ION[v].label })), value: 'ClO2' });
  let hits = []; F.hover(d.stage, () => hits, row);

  /* how far each site has become an oxygen atom, 0 a lone pair on chlorine and 1 a bonded oxygen, mid-morph between */
  const weight = (s) => ion.mix((v) => has(v, s));
  let sig = '';
  function scene() {
    const ws = SITES.map(weight), pose = ['x', 'z', 'y'].map((q) => ion.mix((v) => POSE[v][q]));
    const s = [ws.concat(pose).map((w) => w.toFixed(3)).join(','), PAL.ink, F.el('Cl'), F.el('O')].join('|');
    F.topline(begin(top).ctx, ION[ion.value].head);
    if (s === sig) return;
    sig = s; V.clear();
    g.rotation.set(pose[0], 0, pose[1]); g.position.y = pose[2];
    const { sphere, stick, bond, lobe } = F.mesh;
    V.pickable(sphere(g, [0, 0, 0], 0.5, F.el('Cl')), 'chlorine atom');
    SITES.forEach((site, i) => {
      const w = ws[i], u = T3[site], tip = u.map((x) => x * R3);
      if (w > 0.01) {
        V.pickable(sphere(g, tip, 0.42 * (0.4 + 0.6 * w), F.el('O'), w < 1 ? { transparent: true, opacity: w } : undefined), 'oxygen atom');
        bond(g, [0, 0, 0], u.map((x) => x * R3 * (0.3 + 0.7 * w)), 1, 0.075);
      }
      if (w < 0.99) { const lb = lobe(g, [0, 0, 0], u, 1.2 * (1 - 0.6 * w)); lb.material.opacity = 0.5 * (1 - w); V.pickable(lb, 'lone pair on chlorine'); }
    });
    /* the tetrahedron whose corners the four pairs point to */
    const P = (t) => T3[t].map((x) => x * R3), faint = { transparent: true, opacity: 0.38 };
    SITES.forEach((a, i) => SITES.slice(i + 1).forEach((b) => stick(g, P(a), P(b), 0.013, PAL.ink, faint)));
    V.invalidate();
  }

  /* ---------- the key: what the scene is made of ---------- */
  const TAU = 2 * Math.PI;
  const disc = (sym, r) => (c, x, y) => { c.save(); c.beginPath(); c.arc(x, y, r, 0, TAU); c.fillStyle = F.el(sym); c.fill(); c.lineWidth = 1.5; c.strokeStyle = alpha(PAL.ink, 0.45); c.stroke(); c.restore(); };
  function drawKey() {
    const { ctx } = begin(key);
    F.legend(ctx, { l: 60, r: 1340, t: 0, b: 56 }, [
      { s: 'chlorine atom', draw: disc('Cl', 11) },
      { s: 'oxygen atom', draw: disc('O', 9) },
      { s: 'lone pair on chlorine', draw: (c, x, y) => { c.save(); c.fillStyle = alpha(PAL.ink, 0.45); c.beginPath(); c.ellipse(x, y, 16, 9, 0, 0, TAU); c.fill(); c.restore(); } },
      { s: 'edge of the tetrahedron', color: alpha(PAL.ink, 0.45), w: 2 },
    ], { corner: 'top', row: true, panel: false, size: 20 });
  }

  /* ---------- the series: four electron-dot structures over what changes from one to the next ---------- */
  const X0 = 300, COLW = 270, CY = 128, BOND = 62, LP = 23, SPREAD = 5.5;
  const colX = (i) => X0 + COLW * (i + 0.5);
  const ROWS = { name: 272, ox: 310, acid: 348, pKa: 386, arrow: 426 };
  const DIR = { right: [1, 0], left: [-1, 0], down: [0, 1], up: [0, -1] }, OPP = { right: 'left', left: 'right', up: 'down', down: 'up' };
  function pair(ctx, x, y, dx, dy, name) {
    [-SPREAD, SPREAD].forEach((o) => F.dot(ctx, x - dy * o, y + dx * o, PAL.ink, true, 3.3));
    hits.push({ x, y, r: 10, name });
  }
  function lewis(ctx, v, cx) {
    text(ctx, 'Cl', cx, CY + 1, PAL.ink, { size: 27, align: 'center' });
    hits.push({ x: cx, y: CY, r: 16, name: 'chlorine atom' });
    const reach = {};
    SITES.forEach((s) => {
      const [dx, dy] = DIR[s];
      if (!has(v, s)) { pair(ctx, cx + dx * LP, CY + dy * LP, dx, dy, 'lone pair on chlorine'); reach[s] = LP + 12; return; }
      pair(ctx, cx + dx * BOND / 2, CY + dy * BOND / 2, dx, dy, 'bonding pair shared by chlorine and oxygen');
      const ox = cx + dx * BOND, oy = CY + dy * BOND;
      text(ctx, 'O', ox, oy + 1, PAL.ink, { size: 27, align: 'center' });
      hits.push({ x: ox, y: oy, r: 16, name: 'oxygen atom' });
      Object.keys(DIR).filter((t) => t !== OPP[s]).forEach((t) => { const [ex, ey] = DIR[t]; pair(ctx, ox + ex * LP, oy + ey * LP, ex, ey, 'lone pair on oxygen'); });
      reach[s] = BOND + LP + 12;
    });
    /* brackets hug the structure, the charge at the upper right as the book sets it */
    const sideY = (has(v, 'left') || has(v, 'right')) ? LP + 12 : 0;
    const top = Math.max(reach.up, sideY), bot = Math.max(reach.down, sideY);
    const x1 = cx - reach.left - 6, x2 = cx + reach.right + 6, y1 = CY - top - 4, y2 = CY + bot + 4;
    [[x1, 1], [x2, -1]].forEach(([x, sgn]) => {
      ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2.5; ctx.beginPath();
      ctx.moveTo(x + sgn * 10, y1); ctx.lineTo(x, y1); ctx.lineTo(x, y2); ctx.lineTo(x + sgn * 10, y2); ctx.stroke(); ctx.restore();
    });
    text(ctx, '−', x2 + 17, y1 + 8, PAL.ink, { size: 24, weight: 600, align: 'center' });
  }
  function drawRow() {
    const { ctx } = begin(row), hue = C('equilibrium-constant'); hits = [];
    /* the chosen ion's column */
    ORDER.forEach((v, i) => {
      const on = ion.a(v); if (on <= 0.01) return;
      ctx.save(); ctx.globalAlpha = on; ctx.fillStyle = alpha(PAL.ink, 0.07);
      ctx.beginPath(); ctx.roundRect(colX(i) - COLW / 2 + 8, 6, COLW - 16, 398, 10); ctx.fill(); ctx.restore();
    });
    const lab = (s, y) => text(ctx, s, X0 - 20, y, PAL.muted, { size: 20, align: 'right' });
    lab('electron-dot structure', CY); lab('ion', ROWS.name); lab('oxidation state of Cl', ROWS.ox); lab('parent acid', ROWS.acid);
    F.rich(ctx, [['p', hue], ['K', hue], ['ₐ', hue], ' of the acid'], X0 - 20, ROWS.pKa, { size: 20, align: 'right' });
    ORDER.forEach((v, i) => {
      const t = ION[v], cx = colX(i), w = v === ion.value ? 600 : 400;
      lewis(ctx, v, cx);
      text(ctx, t.name, cx, ROWS.name, PAL.ink, { size: 22, align: 'center', weight: w });
      text(ctx, (2 * t.n - 1) + '+', cx, ROWS.ox, PAL.ink, { size: 22, align: 'center', weight: w });
      text(ctx, t.acidPlain, cx, ROWS.acid, PAL.ink, { size: 22, align: 'center', weight: w });
      if (t.pKa) text(ctx, t.pKa, cx, ROWS.pKa, hue, { size: 22, align: 'center', weight: 600 });
      else text(ctx, 'strong acid', cx, ROWS.pKa, PAL.ink, { size: 22, align: 'center', weight: w });
    });
    lab('stronger acid', ROWS.arrow);
    F.arrow(ctx, X0, ROWS.arrow, X0 + 4 * COLW - 10, ROWS.arrow, PAL.muted, 3);
  }
  /* a tap on a column chooses its ion */
  row.style.cursor = 'pointer';
  row.addEventListener('click', (e) => {
    const r = row.getBoundingClientRect(); if (!r.width) return;
    const i = Math.floor((((e.clientX - r.left) / r.width) * 1400 - X0) / COLW);
    if (i >= 0 && i < ORDER.length) ion.drive(ORDER[i]);
  });

  /* the caption of each of the book's three figures: the acid meets a base and leaves its ion */
  function readout() {
    const t = ION[ion.value];
    F.tex(d.readout, `{${t.acid}(aq)} + {\\text{OH}^{-}(aq)} \\longrightarrow {${t.tex}(aq)} + {\\text{H}_{2}\\text{O}(l)}`);
  }

  function draw() { scene(); drawKey(); drawRow(); readout(); }
  /* set once now, before the first draw, so the equation stands at first paint */
  readout();
  register(d.fig, { update: () => {}, draw });
})();
};
