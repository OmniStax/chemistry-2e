/* Figures for section 18.11 Occurrence, Preparation, and Properties of Halogens. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['18.11'] = function (root, F) {
const { C, PAL, alpha, register, begin, line, arrow, text, topline } = F;
const { sphere, stick, lobe } = F.mesh;
const sim = (id, H) => F.sim(root, id, H);
const still = (d, draw) => register(d.fig, { update: () => {}, draw });
const RAD = Math.PI / 180;
const NAME = { F: 'fluorine', Cl: 'chlorine', Br: 'bromine', I: 'iodine' };
const cap = (s) => s[0].toUpperCase() + s.slice(1);

/* =====================================================================
   SIM: each halogen water added to each halide solution, all twelve
   tubes at once. Rows run down the group (Cl₂, Br₂, I₂), columns from
   fluoride to iodide, each headed by its couple's E° (18.5, Appendix L).
   A tube's solution is the colour that results and the drop above it
   the colour of what was added, so an oxidized halide shows as a tube
   unlike its drop. Still: a tap picks a pair for the headline and readout.
===================================================================== */
(function () {
  const H = 640, d = sim('sim-halogen-ladder', H);
  const E = { F: 2.87, Cl: 1.36, Br: 1.09, I: 0.54 };            /* V; 18.5 prints Cl, Br, I, Appendix L gives F */
  const ROWS = ['Cl', 'Br', 'I'], COLS = ['F', 'Cl', 'Br', 'I'];
  const ION = { F: 'fluoride', Cl: 'chloride', Br: 'bromide', I: 'iodide' };
  const WATER = { Cl: '#d6e58e', Br: '#d9822b', I: '#8a4b1f' };   /* chlorine water pale yellow-green, bromine water orange, iodine and triiodide brown */
  const HUE = { Cl: 'pale yellow-green', Br: 'orange', I: 'brown' };
  const CX0 = 350, CW = 250, R0 = 172, RH = 126, TW = 58;
  const colX = (y) => CX0 + CW * (COLS.indexOf(y) + 0.5), rowY = (x) => R0 + RH * (ROWS.indexOf(x) + 0.5);
  const ox = F.choice(d.controls, { label: '\\text{halogen added}', key: 'halogen', aria: 'the halogen added', options: ROWS.map((s) => ({ value: s, label: `${s}₂` })), value: 'Cl' });
  const rd = F.choice(d.controls, { label: '\\text{halide ion}', key: 'halide', aria: 'the halide ion in solution', options: COLS.map((s) => ({ value: s, label: `${s}⁻` })), value: 'Br' });
  const { formula: fx } = F.readout(d);
  const goes = (x, y) => E[x] > E[y];
  const after = (x, y) => (goes(x, y) ? y : x);                   /* the halogen left in the tube */
  function story(x, y) {
    const tx = `\\text{${x}}`, ty = `\\text{${y}}`;
    if (goes(x, y)) return `${cap(NAME[x])} oxidizes ${ION[y]} ion to ${NAME[y]}: $${tx}_2 + 2${ty}^- \\longrightarrow ${ty}_2 + 2${tx}^-$.`;
    if (x === 'I' && y === 'I') return 'Iodine dissolves in iodide solution as the brown triiodide ion: $\\text{I}_2 + \\text{I}^- \\longrightarrow \\text{I}_3{}^-$.';
    if (x === y) return `${cap(NAME[x])} and ${ION[y]} ion are the two sides of one couple, so nothing is oxidized.`;
    if (y === 'F') return `${cap(NAME[x])} cannot oxidize fluoride ion, the most difficult halide ion to oxidize.`;
    return `${cap(NAME[x])}, the weaker oxidizing agent, does not oxidize ${ION[y]} ion.`;
  }
  const has = (x, y) => (goes(x, y) ? `${y}₂(aq) + ${x}⁻(aq)` : x === 'I' && y === 'I' ? 'I₃⁻(aq)' : x === y ? `${x}₂(aq) + ${x}⁻(aq)` : `${x}₂(aq) + ${y}⁻(aq)`);
  const said = (x, y) => (goes(x, y) ? `${y}₂ forms` : x === 'I' && y === 'I' ? 'I₃⁻ forms' : 'no reaction');
  let hits = [];
  F.hover(d.stage, () => hits);
  d.c.style.cursor = 'pointer';
  d.c.addEventListener('click', (ev) => {
    const b = d.c.getBoundingClientRect(); if (!b.width) return;
    const px = ((ev.clientX - b.left) * 1400) / b.width, py = ((ev.clientY - b.top) * 1400) / b.width;
    const j = Math.floor((px - CX0) / CW), i = Math.floor((py - R0) / RH);
    if (j < 0 || j >= COLS.length || i < 0 || i >= ROWS.length) return;
    if (ROWS[i] !== ox.value) ox.drive(ROWS[i]);
    if (COLS[j] !== rd.value) rd.drive(COLS[j]);
  });
  const round = (ctx, x, y, w, h, r) => { ctx.beginPath(); ctx.roundRect(x, y, w, h, r); };
  function drop(ctx, x, y, r, col) {
    ctx.save(); ctx.beginPath(); ctx.moveTo(x, y - 2.1 * r); ctx.quadraticCurveTo(x + 1.25 * r, y - 0.2 * r, x + r, y + 0.2 * r);
    ctx.arc(x, y + 0.2 * r, r, 0, Math.PI); ctx.quadraticCurveTo(x - 1.25 * r, y - 0.2 * r, x, y - 2.1 * r); ctx.closePath();
    ctx.fillStyle = col; ctx.fill(); ctx.strokeStyle = alpha(PAL.ink, 0.55); ctx.lineWidth = 1.5; ctx.stroke(); ctx.restore();
  }
  function tube(ctx, x, top, bot, col) {
    const path = () => { ctx.beginPath(); ctx.moveTo(x - TW / 2, top); ctx.lineTo(x - TW / 2, bot - TW / 2); ctx.arc(x, bot - TW / 2, TW / 2, Math.PI, 0, true); ctx.lineTo(x + TW / 2, top); };
    const liq = top + 26;
    ctx.save(); path(); ctx.clip(); ctx.fillStyle = col; ctx.fillRect(x - TW / 2, liq, TW, bot - liq + 2); ctx.restore();
    line(ctx, x - TW / 2 + 2, liq, x + TW / 2 - 2, liq, alpha(PAL.ink, 0.35), 2);
    ctx.save(); path(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2.5; ctx.stroke(); ctx.restore();
    line(ctx, x - TW / 2 - 8, top, x + TW / 2 + 8, top, PAL.ink, 2.5);
  }
  function draw() {
    const { ctx } = begin(d.c);
    const x = ox.value, y = rd.value, P = C('potential');
    hits = [];
    /* the heads of the columns: the halide ion in the tube and its couple's potential */
    text(ctx, 'in the tube', CX0 - 20, 112, PAL.muted, { size: 19, align: 'right' });
    text(ctx, '$\\kEo$ of X₂ + 2e⁻ ⟶ 2X⁻', CX0 - 20, 142, P, { size: 19, align: 'right', tex: true });
    COLS.forEach((q) => {
      text(ctx, `${q}⁻(aq)`, colX(q), 112, PAL.ink, { size: 24, weight: 600, align: 'center' });
      text(ctx, `+${E[q].toFixed(2)} V`, colX(q), 142, P, { size: 19, weight: 600, align: 'center' });
    });
    /* the cells that react stand on a soft ground; the chosen one wears a frame */
    ROWS.forEach((r) => COLS.forEach((q) => { if (goes(r, q)) { ctx.save(); round(ctx, colX(q) - CW / 2 + 8, rowY(r) - RH / 2 + 7, CW - 16, RH - 14, 10); ctx.fillStyle = PAL.soft; ctx.fill(); ctx.restore(); } }));
    { const sx = rd.mix((v) => colX(v)), sy = ox.mix((v) => rowY(v));
      ctx.save(); round(ctx, sx - CW / 2 + 5, sy - RH / 2 + 4, CW - 10, RH - 8, 12); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); }
    ROWS.forEach((r) => {
      const cy = rowY(r);
      drop(ctx, 76, cy - 8, 11, F.fact(WATER[r]));
      text(ctx, `${r}₂(aq) added`, 104, cy - 14, PAL.ink, { size: 23, weight: 600 });
      text(ctx, `+${E[r].toFixed(2)} V`, 104, cy + 16, P, { size: 19, weight: 600 });
      COLS.forEach((q) => {
        const cx = colX(q), tx = cx - 62, on = goes(r, q), tri = r === 'I' && q === 'I';
        drop(ctx, tx, cy - 50, 6.5, F.fact(WATER[r]));
        tube(ctx, tx, cy - 36, cy + 54, F.fact(WATER[after(r, q)]));
        text(ctx, said(r, q), cx - 14, cy + 8, on || tri ? PAL.ink : PAL.muted, { size: on ? 22 : 19, weight: on ? 600 : 400 });
        hits.push({ x: tx, y: cy + 6, r: 50, name: `${r}₂ added to ${q}⁻: ${has(r, q)}, ${HUE[after(r, q)]}` });
      });
    });
    /* the two orders the grid is laid out by */
    const yb = R0 + 3 * RH + 30;
    arrow(ctx, 44, R0 + 3 * RH - 14, 44, R0 + 14, PAL.muted, 3);
    text(ctx, '↑ stronger oxidizing agent', 34, yb, PAL.muted, { size: 19 });
    arrow(ctx, CX0 + 30, yb, CX0 + 4 * CW - 30, yb, PAL.muted, 3);
    text(ctx, 'halide ion easier to oxidize', CX0 + 2 * CW, yb, PAL.muted, { size: 19, align: 'center', bg: PAL.panel });
    text(ctx, 'Fluorine has no row: water itself burns in it.', 34, yb + 38, PAL.muted, { size: 17 });
    topline(ctx, story(x, y));
    const sign = (v) => (v > 0.004 ? `+${v.toFixed(2)}` : v < -0.004 ? `-${(-v).toFixed(2)}` : '0.00');
    F.morph(fx, `\\kEo = \\mk{a}{\\kEo{}_{\\text{${x}}_2/\\text{${x}}^-}} - \\mk{b}{\\kEo{}_{\\text{${y}}_2/\\text{${y}}^-}} = \\mk{av}{${E[x].toFixed(2)}\\ \\text{V}} - \\mk{bv}{${E[y].toFixed(2)}\\ \\text{V}} = \\mk{r}{${sign(E[x] - E[y])}\\ \\text{V}}`);
  }
  still(d, draw);
})();

/* =====================================================================
   FIGURE 18.63: the fluorides of one heavier halogen side by side, as
   the book sets IF₃, IF₅ and IF₇, with the monofluoride added: one,
   three, five and seven fluorine atoms about Cl, Br or I (Table 18.3).
   The fourth place is empty for chlorine and bromine. Every atom is
   drawn to its covalent radius, and one drag turns all four. Still: a
   choice blends the central atom's size and colour and the bond lengths,
   and the heptafluoride grows in or shrinks away.
===================================================================== */
(function () {
  const d = sim('sim-interhalogens');
  const HS = 480, FOV = 14, DIST = 14.7;
  const XS = [-4.27, -1.79, 1.08, 3.89];                        /* each molecule's place, spaced by its own width */
  const v = F.view3d(d.stage, { spin: 'idle', h: HS, dist: DIST, tilt: 0.3 });
  /* a long lens, so the molecules at the two ends are seen as squarely as the middle ones */
  if (v.camera && v.camera.isPerspectiveCamera) { v.camera.fov = FOV; v.camera.updateProjectionMatrix(); }
  const kc = F.makeCanvas(d.stage, 166);
  const UNIT = HS / (2 * DIST * Math.tan((FOV / 2) * RAD));     /* logical units of the strip per scene unit */
  const G = XS.map((x) => v.part(x));
  const K = 0.56;                                               /* scene units per ångström */
  const RCOV = { F: 64, Cl: 99, Br: 114, I: 133 };              /* covalent radii, pm (Table 6.2) */
  const rad = (s) => (RCOV[s] / 100) * 0.6 * K;                 /* each sphere six tenths of its covalent radius */
  const cs = (deg) => [Math.cos(deg * RAD), Math.sin(deg * RAD)];
  const [c82, s82] = cs(82), [c72, s72] = cs(72), [c144, s144] = cs(144), [cT, sT] = cs(87.5);
  const TH = [-1 / 3, Math.sqrt(8) / 3];                        /* cos and sin of the tetrahedral angle */
  /* fluorine atoms and lone pairs in the molecule's own frame; rot turns it to the book's view */
  const SHAPE = [
    { n: 1, F: [[1, 0, 0]], L: [[TH[0], 0, TH[1]], [TH[0], TH[1] * 0.866, -TH[1] * 0.5], [TH[0], -TH[1] * 0.866, -TH[1] * 0.5]], rot: [0, 0, Math.PI / 2], shape: 'linear' },
    { n: 3, F: [[-cT, sT, 0], [-cT, -sT, 0], [1, 0, 0]], L: [[-0.5, 0, 0.866], [-0.5, 0, -0.866]], rot: [0, 0, 0], shape: 'T-shaped' },
    { n: 5, F: [[c82, s82, 0], [c82, -s82, 0], [1, 0, 0], [c82, 0, s82], [c82, 0, -s82]], L: [[-1, 0, 0]], rot: [0, 0, Math.PI / 2], shape: 'square pyramidal' },
    { n: 7, F: [[c72, s72, 0], [c72, -s72, 0], [1, 0, 0], [0, 0, 1], [0, 0, -1], [c144, s144, 0], [c144, -s144, 0]], L: [], rot: [-Math.PI / 2, 0, 0], shape: 'pentagonal bipyramidal' },
  ];
  const LEN = { Cl: [1.63, 1.65, 1.65, 1.83], Br: [1.76, 1.77, 1.75, 1.83], I: [1.91, 1.93, 1.86, 1.83] };   /* Å; the fourth is IF₇'s, the only heptafluoride */
  const STATE = { Cl: ['g', 'g', 'g'], Br: ['g', 'l', 'l'], I: ['s', 's', 'l', 'g'] };                        /* Table 18.3 */
  const SUB = '₀₁₂₃₄₅₆₇';
  const HEAD = {
    I: 'Iodine, the largest of the three, holds as many as seven fluorine atoms: in IF₇ it is in the 7+ oxidation state, the limit for the halogens.',
    Br: 'Bromine is smaller than iodine and holds five fluorine atoms at most, so it stops at the 5+ oxidation state.',
    Cl: 'Chlorine, the smallest of the three, holds five fluorine atoms at most, so it stops at the 5+ oxidation state.',
  };
  const fade = (a) => (a < 0.999 ? { transparent: true, opacity: a } : undefined);
  const pick = F.choice(d.controls, { label: '\\text{central atom and its covalent radius }\\kr', key: 'central', aria: 'the central halogen', options: ['Cl', 'Br', 'I'].map((s) => ({ value: s, label: `${s}, ${RCOV[s]} pm` })), value: 'I' });
  const ro = F.readout(d);
  function draw() {
    const k = pick.k, A = pick.from, B = pick.value, X = k < 0.5 ? A : B;
    const cc = A === B ? F.el(B) : F.mixColor(F.el(A), F.el(B), k), rc = rad(A) + (rad(B) - rad(A)) * k;
    v.clear();
    const shown = SHAPE.map((S, i) => {
      const on = i < 3 ? 1 : (A === 'I' ? 1 : 0) + ((B === 'I' ? 1 : 0) - (A === 'I' ? 1 : 0)) * k;
      if (on <= 0.01) { if (v.label) v.label(`no ${B}F<sub>7</sub>`, [0, -0.3, 0], G[i]); return on; }
      const g = G[i], h = new g.constructor(); g.add(h);
      /* the molecule's own turn sits inside the part, whose orientation the orbit owns */
      h.position.y = -0.3; h.rotation.set(...S.rot); h.scale.setScalar(0.45 + 0.55 * on);
      const len = (LEN[A][i] + (LEN[B][i] - LEN[A][i]) * k) * K;
      v.pickable(sphere(h, [0, 0, 0], rc, cc, fade(on)), `${NAME[X]} (${X}), covalent radius ${RCOV[X]} pm`);
      S.F.forEach((dir) => {
        const p = dir.map((c) => c * len), m = dir.map((c) => c * len * 0.5);
        v.pickable(sphere(h, p, rad('F'), F.el('F'), fade(on)), 'fluorine (F), covalent radius 64 pm');
        stick(h, [0, 0, 0], m, 0.06, cc, fade(on));
        stick(h, m, p, 0.06, F.el('F'), fade(on));
      });
      S.L.forEach((dir) => {
        const m = lobe(h, [0, 0, 0], dir, 0.9, PAL.ink); m.material.opacity = 0.35 * on;
        v.pickable(m, `a lone pair on ${NAME[X]}`);
      });
      return on;
    });
    /* under each molecule its formula and state (Table 18.3), its shape, and the central atom's count */
    { const { ctx } = F.begin(kc);
      SHAPE.forEach((S, i) => {
        const on = shown[i]; if (on <= 0.01) return;
        const x = 700 + XS[i] * UNIT, lp = (7 - S.n) / 2, st = STATE[i < 3 ? B : 'I'][i], el = i < 3 ? B : 'I';
        F.faded(ctx, on, [0, 0], () => {
          text(ctx, `${el}F${S.n > 1 ? SUB[S.n] : ''}(${st})`, x, 20, PAL.ink, { size: 25, weight: 600, align: 'center' });
          text(ctx, S.shape, x, 52, PAL.ink, { size: 20, align: 'center' });
          text(ctx, `${el} is ${S.n}+, ${lp === 0 ? 'no lone pairs' : lp === 1 ? '1 lone pair' : `${lp} lone pairs`}`, x, 80, PAL.muted, { size: 18, align: 'center' });
        });
      });
      F.legend(ctx, { l: 60, r: 1340, t: 106, b: 166 }, [
        { s: NAME[B], draw: (c, x, y) => F.dot(c, x, y, F.el(B), true, 11) },
        { s: NAME.F, draw: (c, x, y) => F.dot(c, x, y, F.el('F'), true, 7) },
        { s: 'lone pair', draw: (c, x, y) => F.dot(c, x, y, F.alpha(PAL.ink, 0.35), true, 10) },
      ], { corner: 'top', row: true, panel: false, size: 19 }); }
    v.headline(HEAD[B]);
    const terms = SHAPE.filter((S) => S.n < 7 || B === 'I').map((S) => `${S.n} + 2(${(7 - S.n) / 2})`).join(' = ');
    ro.set(`\\text{valence electrons of }\\mk{x}{\\text{${B}}}:\\ \\mk{v}{7} = ${terms}`,
      'Each bond takes one of the central atom’s seven valence electrons and each lone pair two, so the fluorine atoms come in odd numbers.');
  }
  still(d, draw);
})();
};
