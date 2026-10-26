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
   SIM: a halogen added to a solution of a halide ion. A ladder of the
   four couples' standard reduction potentials, the chosen two drawn
   heavy, and a tube whose colour is the solution that results. Still:
   the pair answers at once; a choice crossfades the colour.
===================================================================== */
(function () {
  const H = 560, d = sim('sim-halogen-ladder', H);
  const E = { F: 2.87, Cl: 1.36, Br: 1.09, I: 0.54 };            /* V; 18.5 prints Cl, Br, I, Appendix L gives F */
  const ORDER = ['F', 'Cl', 'Br', 'I'];
  const ION = { F: 'fluoride', Cl: 'chloride', Br: 'bromide', I: 'iodide' };
  const WATER = { Cl: '#c9dc6a', Br: '#d9822b', I: '#8a4b1f' };   /* chlorine water pale yellow-green, bromine water orange, iodine and triiodide brown */
  const Y = (e) => 500 - e * 125;                                  /* E° from 0 to 3 V, fixed */
  const AX = 220, R0 = 250, R1 = 440, TX = 1090, TW = 110, TT = 150, TB = 450, LIQ = 230;
  const ox = F.choice(d.controls, { label: '\\text{halogen added}', key: 'halogen', aria: 'the halogen added', options: ['Cl', 'Br', 'I'].map((s) => ({ value: s, label: `${s}₂` })), value: 'Cl' });
  const rd = F.choice(d.controls, { label: '\\text{halide ion}', key: 'halide', aria: 'the halide ion in solution', options: ORDER.map((s) => ({ value: s, label: `${s}⁻` })), value: 'Br' });
  const { formula: fx } = F.readout(d);
  const sol = (x, y) => F.fact(E[x] > E[y] ? WATER[y] : WATER[x]);
  function story(x, y) {
    const tx = `\\text{${x}}`, ty = `\\text{${y}}`;
    if (E[x] > E[y]) return { head: `${cap(NAME[x])} oxidizes ${ION[y]} ion to ${NAME[y]}: $${tx}_2 + 2${ty}^- \\longrightarrow ${ty}_2 + 2${tx}^-$.`, has: `${y}_{2}(aq) + ${x}⁻(aq)` };
    if (x === 'I' && y === 'I') return { head: 'Iodine dissolves in iodide solution as the brown triiodide ion: $\\text{I}_2 + \\text{I}^- \\longrightarrow \\text{I}_3{}^-$.', has: 'I_{3}⁻(aq)' };
    if (x === y) return { head: `${cap(NAME[x])} and ${ION[y]} ion are the two sides of one couple, so nothing is oxidized.`, has: `${x}_{2}(aq) + ${y}⁻(aq)` };
    if (y === 'F') return { head: `${cap(NAME[x])} cannot oxidize fluoride ion, the most difficult halide ion to oxidize.`, has: `${x}_{2}(aq) + F⁻(aq)` };
    return { head: `${cap(NAME[x])}, the weaker oxidizing agent, does not oxidize ${ION[y]} ion.`, has: `${x}_{2}(aq) + ${y}⁻(aq)` };
  }
  let hits = [];
  F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c);
    const x = ox.value, y = rd.value, s = story(x, y), P = C('potential');
    hits = [];
    /* the axis of E°, fixed from 0 to 3 V */
    line(ctx, AX, Y(0), AX, Y(3) - 10, PAL.muted, 2);
    [0, 1, 2, 3].forEach((e) => { line(ctx, AX - 8, Y(e), AX, Y(e), PAL.muted, 2); text(ctx, String(e), AX - 16, Y(e), PAL.muted, { size: 17, align: 'right' }); });
    text(ctx, '$\\kEo$ (V)', AX, Y(3) - 34, P, { size: 22, weight: 600, align: 'center', tex: true });
    /* the four couples, the halogen's and the halide's drawn heavy */
    const wx = ox.mix((v) => ORDER.map((q) => (q === v ? 1 : 0))), wy = rd.mix((v) => ORDER.map((q) => (q === v ? 1 : 0)));
    ORDER.forEach((q, i) => {
      const yy = Y(E[q]), w = Math.max(wx[i], wy[i]);
      line(ctx, R0, yy, R1, yy, alpha(P, 0.65 + 0.35 * w), 2.5 + 3.5 * w);
      text(ctx, `${q}_{2} + 2e⁻ ⟶ 2${q}⁻`, R1 + 18, yy, PAL.ink, { size: 20 });
      text(ctx, `+${E[q].toFixed(2)} V`, R1 + 238, yy, P, { size: 20, weight: 600 });
      if (wx[i] > 0.01) F.faded(ctx, wx[i], [0, 0], () => text(ctx, q === y ? `${q}_{2} added, ${q}⁻ in solution` : `${q}_{2} added`, R1 + 340, yy, PAL.ink, { size: 17 }));
      if (wy[i] > 0.01 && !(q === x && q === y)) F.faded(ctx, wy[i], [0, 0], () => text(ctx, `${q}⁻ in solution`, R1 + 340, yy, PAL.ink, { size: 17 }));
      hits.push({ x: (R0 + R1) / 2, y: yy, r: 14, name: `the ${q}₂/${q}⁻ couple, E° = +${E[q].toFixed(2)} V` });
    });
    /* electrons pass from the halide up to the halogen where the halogen's couple lies above */
    if (E[x] > E[y]) F.faded(ctx, Math.min(ox.k, rd.k), [0, 0], () => {
      arrow(ctx, R0 + 70, Y(E[y]) - 4, R0 + 70, Y(E[x]) + 6, PAL.ink, 3);
      text(ctx, '2e⁻', R0 + 84, (Y(E[x]) + Y(E[y])) / 2, PAL.ink, { size: 20, bg: PAL.panel });
    });
    /* the tube and its solution, its colour the fact */
    const col = ox.k < 1 ? ox.mixColor((v) => sol(v, y)) : rd.mixColor((v) => sol(x, v));
    const tube = () => { ctx.beginPath(); ctx.moveTo(TX - TW / 2, TT); ctx.lineTo(TX - TW / 2, TB - TW / 2); ctx.arc(TX, TB - TW / 2, TW / 2, Math.PI, 0, true); ctx.lineTo(TX + TW / 2, TT); };
    ctx.save(); tube(); ctx.clip(); ctx.fillStyle = col; ctx.fillRect(TX - TW / 2, LIQ, TW, TB - LIQ + 2); ctx.restore();
    line(ctx, TX - TW / 2 + 2, LIQ, TX + TW / 2 - 2, LIQ, alpha(PAL.ink, 0.35), 2);
    ctx.save(); tube(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.stroke(); ctx.restore();
    line(ctx, TX - TW / 2 - 12, TT, TX + TW / 2 + 12, TT, PAL.ink, 3);
    text(ctx, s.has, TX, TB + 38, PAL.ink, { size: 22, align: 'center' });
    hits.push({ x: TX, y: (LIQ + TB) / 2, r: TW / 2, name: `the solution: ${s.has.replace(/_\{(\d)\}/g, (m, n) => '₀₁₂₃₄₅₆₇₈₉'[n])}` });
    topline(ctx, s.head);
    const sign = (v) => (v > 0.004 ? `+${v.toFixed(2)}` : v < -0.004 ? `-${(-v).toFixed(2)}` : '0.00');
    F.morph(fx, `\\kEo = \\mk{a}{\\kEo{}_{\\text{${x}}_2/\\text{${x}}^-}} - \\mk{b}{\\kEo{}_{\\text{${y}}_2/\\text{${y}}^-}} = \\mk{av}{${E[x].toFixed(2)}\\ \\text{V}} - \\mk{bv}{${E[y].toFixed(2)}\\ \\text{V}} = \\mk{r}{${sign(E[x] - E[y])}\\ \\text{V}}`);
  }
  still(d, draw);
})();

/* =====================================================================
   FIGURE 18.63: the interhalogen fluorides of Table 18.3, a central Cl,
   Br or I with one, three, five or seven fluorine atoms. Seven fluorine
   sites and three lone-pair sites in the molecule's own frame; each
   shape turns the molecule to the book's orientation. Still: a choice
   is one morph, a lone pair giving way to two fluorine atoms that grow
   out of the central atom while the others swing to their new places.
===================================================================== */
(function () {
  const d = sim('sim-interhalogens');
  const FREE = { spin: 'idle', views: [{ label: 'side', yaw: 0.35, pitch: 0.22 }, { label: 'down the axis', yaw: 0, pitch: Math.PI / 2 }] };
  const v = F.view3d(d.stage, { ...FREE, h: 600, dist: 7.6 });
  const g = v.part(0);
  const K = 0.62;                                               /* scene units per ångström */
  const RCOV = { F: 64, Cl: 99, Br: 114, I: 133 };              /* covalent radii, pm (Table 6.2) */
  const rad = (s) => (RCOV[s] / 200) * K;                       /* each sphere half its covalent radius */
  const V = {
    add: (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]],
    mul: (a, k) => [a[0] * k, a[1] * k, a[2] * k],
  };
  function slerp(a, b, t) {
    const w = Math.acos(Math.max(-1, Math.min(1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]))); if (w < 1e-6) return a;
    const s = Math.sin(w); return V.add(V.mul(a, Math.sin((1 - t) * w) / s), V.mul(b, Math.sin(t * w) / s));
  }
  const cs = (deg) => [Math.cos(deg * RAD), Math.sin(deg * RAD)];
  const [c82, s82] = cs(82), [c72, s72] = cs(72), [c144, s144] = cs(144), [cT, sT] = cs(87.5);
  const TH = [-1 / 3, Math.sqrt(8) / 3];                        /* cos and sin of the tetrahedral angle */
  /* fluorine sites 0 to 6 and lone-pair sites 0 to 2 per count of fluorine atoms; rot is the turn to the book's view */
  const SHAPE = {
    1: { F: [null, null, [1, 0, 0], null, null, null, null], L: [[TH[0], 0, TH[1]], [TH[0], TH[1] * 0.866, -TH[1] * 0.5], [TH[0], -TH[1] * 0.866, -TH[1] * 0.5]], rot: [0, 0, Math.PI / 2], shape: 'linear', tag: 2 },
    3: { F: [[-cT, sT, 0], [-cT, -sT, 0], [1, 0, 0], null, null, null, null], L: [[-0.5, 0, 0.866], [-0.5, 0, -0.866], null], rot: [0, 0, 0], shape: 'T-shaped', tag: 2 },
    5: { F: [[c82, s82, 0], [c82, -s82, 0], [1, 0, 0], [c82, 0, s82], [c82, 0, -s82], null, null], L: [[-1, 0, 0], null, null], rot: [0, 0, Math.PI / 2], shape: 'square pyramidal', tag: 0 },
    7: { F: [[c72, s72, 0], [c72, -s72, 0], [1, 0, 0], [0, 0, 1], [0, 0, -1], [c144, s144, 0], [c144, -s144, 0]], L: [null, null, null], rot: [-Math.PI / 2, 0, 0], shape: 'pentagonal bipyramidal', tag: 2 },
  };
  const COUNT = ['one', '', '', 'three', '', 'five', '', 'seven'];
  const PAIRS = ['', 'one lone pair', 'two lone pairs', 'three lone pairs'];
  const MOL = {};
  [['Cl', [1.63, 1.65, 1.65]], ['Br', [1.76, 1.77, 1.75]], ['I', [1.91, 1.93, 1.86, 1.83]]].forEach(([X, lens]) => lens.forEach((len, i) => {
    const n = 2 * i + 1;
    MOL[`${X}F${n > 1 ? n : ''}`] = { X, n, len, label: `${X}F${n > 1 ? '₀₁₂₃₄₅₆₇'[n] : ''}` };
  }));
  Object.values(MOL).forEach((m) => {
    const lp = (7 - m.n) / 2, top = m.X !== 'I' && m.n === 5, lim = m.n === 7;
    m.head = m.n === 1
      ? `${m.label} is linear: one fluorine atom bonded to ${NAME[m.X]} in the 1+ oxidation state, with three lone pairs.`
      : `${m.label} is ${SHAPE[m.n].shape}: ${COUNT[m.n]} fluorine atoms about ${NAME[m.X]} in the ${m.n}+ oxidation state${top ? `, the highest ${NAME[m.X]} reaches` : lim ? ', the limit for the halogens' : `, with ${PAIRS[lp]}`}.`;
  });
  const fade = (a) => (a < 0.999 ? { transparent: true, opacity: a } : undefined);
  const plain = (e, a) => { e.style.opacity = String(Math.max(0, Math.min(1, a))); return e; };
  const pick = F.select(d.controls, { label: '\\text{molecule}', aria: 'the interhalogen', options: Object.entries(MOL).map(([k, m]) => ({ value: k, label: m.label })), value: 'IF3' });
  const ro = F.readout(d);
  function draw() {
    const k = pick.k, A = MOL[pick.from], B = MOL[pick.value], SA = SHAPE[A.n], SB = SHAPE[B.n];
    const len = (A.len + (B.len - A.len) * k) * K;
    v.clear();
    /* the molecule's own turn sits inside the part, whose orientation the orbit owns */
    const h = new g.constructor(); g.add(h);
    h.position.y = -0.22; h.rotation.set(...SA.rot.map((a, i) => a + (SB.rot[i] - a) * k));
    g.updateMatrixWorld(true);
    const cc = A.X === B.X ? F.el(B.X) : F.mixColor(F.el(A.X), F.el(B.X), k);
    const X = k < 0.5 ? A.X : B.X;
    v.pickable(sphere(h, [0, 0, 0], rad(A.X) + (rad(B.X) - rad(A.X)) * k, cc), `${NAME[X]} (${X})`);
    let named = null;
    for (let n = 0; n < 7; n++) {
      const da = SA.F[n], db = SB.F[n], on = (da ? 1 : 0) + ((db ? 1 : 0) - (da ? 1 : 0)) * k;
      if (on <= 0.01) continue;
      /* an arriving or leaving fluorine runs out of or into the central atom along the direction it ends or started at */
      const p = V.mul(da && db ? slerp(da, db, k) : db || da, len * (da && db ? 1 : 0.35 + 0.65 * on));
      v.pickable(sphere(h, p, rad('F') * (0.3 + 0.7 * on), F.el('F'), fade(on)), 'fluorine (F)');
      const m = V.mul(p, 0.5);
      stick(h, [0, 0, 0], m, 0.075, cc, fade(on));
      stick(h, m, p, 0.075, F.el('F'), fade(on));
      if (n === SB.tag) named = p;
    }
    let lp = null;
    for (let n = 0; n < 3; n++) {
      const la = SA.L[n], lb = SB.L[n], on = (la ? 1 : 0) + ((lb ? 1 : 0) - (la ? 1 : 0)) * k;
      if (on <= 0.01) continue;
      const dir = la && lb ? slerp(la, lb, k) : lb || la;
      const m = lobe(h, [0, 0, 0], dir, 0.95 * (0.4 + 0.6 * on), PAL.ink); m.material.opacity = 0.35 * on;
      v.pickable(m, `a lone pair on ${NAME[X]}`);
      /* the lone pair that points most across the line of sight carries the label */
      const w = h.localToWorld(F.mesh.vec(dir)).sub(h.localToWorld(F.mesh.vec([0, 0, 0]))).normalize();
      const far = 1 - Math.abs(w.z);
      if (!lp || far > lp.far + 0.05) lp = { p: V.mul(dir, 1.15), on, far };
    }
    v.label(X, [0, 0, 0], h, 0);
    if (named) v.label('F', named, h, 0);
    if (lp) plain(v.label('lone pair', lp.p, h, 0), lp.on);
    v.headline(B.head);
    const lone = (7 - B.n) / 2;
    ro.set(`\\mk{m}{\\text{${B.X}F}${B.n > 1 ? `_{${B.n}}` : ''}}:\\ \\mk{b}{${B.n}}\\ \\text{bond${B.n > 1 ? 's' : ''}} + \\mk{l}{${lone}}\\ \\text{lone pair${lone === 1 ? '' : 's'}} = \\mk{p}{${B.n + lone}}\\ \\text{electron pairs}`,
      `Covalent radii: $\\kr{}_{\\text{${B.X}}} = ${RCOV[B.X]}\\ \\text{pm}$, $\\kr{}_{\\text{F}} = 64\\ \\text{pm}$.`);
  }
  still(d, draw);
})();
};
