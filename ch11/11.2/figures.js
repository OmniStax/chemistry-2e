/* Figures for section 11.2 Electrolytes. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['11.2'] = function (root, F) {
const { tex, PAL, alpha, cycle, register, begin, line, text, topline, label, legend } = F;
const sim = (id, H) => F.sim(root, id, H);
const TAU = 2 * Math.PI;
const clamp01 = (x) => Math.max(0, Math.min(1, x));
const smooth = F.ease.smooth;
/* one atom: a filled ball in its element colour, ink rim */
function ball(ctx, x, y, r, col) { ctx.save(); ctx.fillStyle = col; ctx.strokeStyle = alpha(PAL.ink, 0.55); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore(); }
/* a particle drawn from its atoms [element, dx, dy, r], turned by a and scaled by k; hydrogens behind */
function particle(ctx, atoms, x, y, a, k = 1) {
  const c = Math.cos(a), s = Math.sin(a);
  atoms.slice().sort((p, q) => (q[0] === 'H') - (p[0] === 'H')).forEach(([e, dx, dy, r]) => ball(ctx, x + (dx * c - dy * s) * k, y + (dx * s + dy * c) * k, r * k, F.el(e)));
}
/* a charge's sign beside an ion, as the book marks it */
const sign = (ctx, q, x, y, r) => text(ctx, q > 0 ? '+' : '−', x + r * 0.8 + 6, y - r * 0.8 - 4, PAL.ink, { size: 20, weight: 700, align: 'center', bg: PAL.panel });

/* =====================================================================
   FIGURE 11.6: the conductivity apparatus, drawn flat from the book's
   image: a beaker of solution, two plate electrodes (− left, + right as
   the book marks them), a power supply wired to the negative plate and,
   through a light bulb in its socket, to the positive plate. The solute
   is a choice of the book's three: ethanol, KCl and acetic acid. Moving:
   every ion drifts toward the plate of opposite charge (the book's
   arrows) and, arriving, is replaced by one of its kind at the far plate,
   so the current runs steadily; molecules only jostle. The bulb's glow
   follows the number of ions. Particles: 6 ethanol molecules; 6 K⁺ and
   6 Cl⁻; 5 acetic acid molecules, 1 H₃O⁺ and 1 acetate ion (the book
   draws 2 molecules and 1 ion of each sign; the real share ionized at
   0.1 M is near 1 %, too few to draw). BULB_LIGHT is the warm light of
   a glowing filament, a physical colour.
   Canvas units: beaker inside x 520..900, rim y 236, base y 536; liquid
   from y 300; plates at XL and XR from y 226 to 500.
===================================================================== */
(function () {
  const BULB_LIGHT = '#ffc94d';
  const d = sim('sim-conductivity', 600);
  const XL = 560, XR = 860, PT = 266, PB = 540, LS = 340;
  /* the space between the plates that the particles move through */
  const BOX = { l: XL + 36, r: XR - 36, t: LS + 30, b: PB - 20 };
  /* hydrogens drawn; offsets in canvas units at k = 1 */
  const MOL = {
    ethanol: { word: 'an ethanol molecule, C₂H₅OH', atoms: [['C', -9, 2, 6], ['C', -1, -3, 6], ['O', 7, 2, 6], ['H', 13.5, -1.5, 3.8], ['H', -16, 1.5, 3.8], ['H', -12, 8.5, 3.8], ['H', -6, 8.5, 3.8], ['H', -4.5, -9.5, 3.8], ['H', 2.5, -9.5, 3.8]] },
    acid: { word: 'an acetic acid molecule, CH₃CO₂H', atoms: [['C', -8, 0, 6], ['C', 3, 0, 6], ['O', 9, -9, 6], ['O', 10, 8, 6], ['H', 17, 9, 3.8], ['H', -14, -6, 3.8], ['H', -14, 6, 3.8], ['H', -9, 1, 3.8]] },
    acetate: { word: 'an acetate ion, CH₃CO₂⁻', q: -1, atoms: [['C', -8, 0, 6], ['C', 3, 0, 6], ['O', 9, -9, 6], ['O', 10, 8, 6], ['H', -14, -6, 3.8], ['H', -14, 6, 3.8], ['H', -9, 1, 3.8]] },
    hydronium: { word: 'a hydronium ion, H₃O⁺', q: 1, atoms: [['O', 0, 0, 6.5], ['H', -8, 5, 3.8], ['H', 8, 5, 3.8], ['H', 0, -9, 3.8]] },
    K: { word: 'a potassium ion, K⁺', q: 1, atoms: [['K', 0, 0, 11]] },
    Cl: { word: 'a chloride ion, Cl⁻', q: -1, atoms: [['Cl', 0, 0, 14]] },
  };
  const K = 1.45;                                           /* the scale the particles are drawn at */
  const SOLUTES = {
    ethanol: { mix: [['ethanol', 6]], ions: 0, eq: '\\text{C}_{2}\\text{H}_{5}\\text{OH}(l) \\longrightarrow \\text{C}_{2}\\text{H}_{5}\\text{OH}(aq)', key: [['ethanol', 'ethanol']] },
    KCl: { mix: [['K', 6], ['Cl', 6]], ions: 12, eq: '\\text{KCl}(s) \\longrightarrow \\text{K}^{+}(aq) + \\text{Cl}^{-}(aq)', key: [['K', 'K⁺'], ['Cl', 'Cl⁻']] },
    acetic: { mix: [['acid', 5], ['hydronium', 1], ['acetate', 1]], ions: 2, eq: '\\text{CH}_{3}\\text{CO}_{2}\\text{H}(aq) + \\text{H}_{2}\\text{O}(l) \\rightleftharpoons \\text{H}_{3}\\text{O}^{+}(aq) + \\text{CH}_{3}\\text{CO}_{2}{}^{-}(aq)', key: [['acid', 'acetic acid'], ['hydronium', 'H₃O⁺'], ['acetate', 'CH₃CO₂⁻']] },
  };
  const sol = F.choice(d.controls, { label: '\\text{solute}', options: [{ value: 'ethanol', label: 'ethanol' }, { value: 'KCl', label: 'KCl' }, { value: 'acetic', label: 'acetic acid' }], value: 'KCl', aria: 'the solute dissolved in the water', ms: 600 });
  const rnd = (a, b) => a + Math.random() * (b - a);
  const state = {};
  for (const [key, s] of Object.entries(SOLUTES)) {
    state[key] = [];
    for (const [kind, n] of s.mix) for (let j = 0; j < n; j++) state[key].push({ kind, x: rnd(BOX.l, BOX.r), y: rnd(BOX.t, BOX.b), a: rnd(0, TAU), vx: 0, vy: 0, w: rnd(-1, 1) });
  }
  const DRIFT = 55, JIG = 40;
  function step(dt) {
    for (const [key, list] of Object.entries(state)) {
      if (sol.a(key) <= 0) continue;
      for (const p of list) {
        const q = MOL[p.kind].q || 0;
        if (Math.random() < dt * 3) { const h = rnd(0, TAU); p.vx = JIG * Math.cos(h); p.vy = JIG * Math.sin(h); p.w = rnd(-1.2, 1.2); }
        p.x += (p.vx - q * DRIFT) * dt; p.y += p.vy * dt; p.a += p.w * dt;
        /* a cation drifts left to the negative plate, an anion right to the positive; arriving, it is replaced at the far plate */
        if (q && (p.x < BOX.l || p.x > BOX.r)) { p.x = q > 0 ? BOX.r : BOX.l; p.y = rnd(BOX.t, BOX.b); }
        p.x = Math.max(BOX.l, Math.min(BOX.r, p.x)); p.y = Math.max(BOX.t, Math.min(BOX.b, p.y));
      }
      /* particles do not overlap: a pair closer than 40 units is pushed apart */
      for (let i = 0; i < list.length; i++) for (let j = i + 1; j < list.length; j++) {
        const p = list[i], o = list[j], dx = o.x - p.x, dy = o.y - p.y, r = Math.hypot(dx, dy) || 1;
        if (r < 40) { const k = (40 - r) / 2 / r; p.x -= dx * k; p.y -= dy * k; o.x += dx * k; o.y += dy * k; }
      }
    }
  }
  const cy = cycle(() => Infinity, 0);
  let hits = [];
  F.hover(d.stage, () => hits);
  const wire = (ctx, pts) => { ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 4; ctx.lineJoin = 'round'; ctx.beginPath(); pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.stroke(); ctx.restore(); };
  function beaker(ctx) {
    const l = 480, r = 940, t = 276, b = 576;
    ctx.save();
    ctx.fillStyle = alpha(PAL.ink, 0.07); ctx.fillRect(l + 4, LS, r - l - 8, b - LS - 4);
    ctx.strokeStyle = alpha(PAL.ink, 0.35); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(l + 4, LS); ctx.lineTo(r - 4, LS); ctx.stroke();
    ctx.strokeStyle = PAL.ink; ctx.lineWidth = 4; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.moveTo(l - 22, t - 8); ctx.quadraticCurveTo(l - 4, t, l, t + 16); ctx.lineTo(l, b - 14); ctx.quadraticCurveTo(l, b, l + 14, b); ctx.lineTo(r - 14, b); ctx.quadraticCurveTo(r, b, r, b - 14); ctx.lineTo(r, t); ctx.lineTo(r + 8, t - 6); ctx.stroke();
    ctx.restore();
  }
  function plate(ctx, x, q) {
    ctx.save(); ctx.fillStyle = alpha(F.ref('electrodes'), 0.22); ctx.strokeStyle = F.ref('electrodes'); ctx.lineWidth = 3;
    ctx.beginPath(); ctx.rect(x - 13, PT, 26, PB - PT); ctx.fill(); ctx.stroke(); ctx.restore();
    text(ctx, q > 0 ? '+' : '−', x, LS - 34, PAL.ink, { size: 30, weight: 700, align: 'center', bg: PAL.panel });
    hits.push({ x, y: (PT + PB) / 2, r: 16, name: q > 0 ? 'the positive electrode' : 'the negative electrode' }, { x, y: LS - 34, r: 16, name: q > 0 ? 'the positive electrode' : 'the negative electrode' });
  }
  /* the bulb in its socket, glass centred (BX, BY): glow behind, then glass, filament, screw base */
  function bulb(ctx, BX, BY, b) {
    const R = 42, glow = F.fact(BULB_LIGHT), cb = F.ref('bulb');
    if (b > 0.01) {
      ctx.save(); const g = ctx.createRadialGradient(BX, BY, 6, BX, BY, R + 70 * b);
      g.addColorStop(0, alpha(glow, 0.95 * Math.min(1, 0.35 + b))); g.addColorStop(0.45, alpha(glow, 0.55 * b)); g.addColorStop(1, alpha(glow, 0));
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(BX, BY, R + 70 * b, 0, TAU); ctx.fill(); ctx.restore();
    }
    ctx.save(); ctx.strokeStyle = cb; ctx.lineWidth = 3.5; ctx.fillStyle = alpha(PAL.panel, 0.25);
    ctx.beginPath(); ctx.arc(BX, BY, R, Math.PI * 0.72, Math.PI * 2.28); ctx.lineTo(BX + 17, BY + R + 14); ctx.lineTo(BX - 17, BY + R + 14); ctx.closePath(); ctx.fill(); ctx.stroke();
    /* filament on two leads */
    ctx.strokeStyle = b > 0.01 ? F.mixColor(PAL.ink, glow, Math.min(1, 0.4 + b)) : alpha(PAL.ink, 0.8); ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(BX - 8, BY + R + 12); ctx.lineTo(BX - 12, BY - 2); ctx.moveTo(BX + 8, BY + R + 12); ctx.lineTo(BX + 12, BY - 2); ctx.stroke();
    ctx.lineWidth = 2.5; ctx.beginPath(); for (let i = 0; i <= 24; i++) { const u = i / 24, x = BX - 12 + 24 * u, y = BY - 2 - 5 * Math.abs(Math.sin(u * Math.PI * 4)); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke();
    /* screw base and socket */
    ctx.fillStyle = PAL.panel; ctx.strokeStyle = cb; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.rect(BX - 17, BY + R + 14, 34, 22); ctx.fill(); ctx.stroke();
    for (let i = 1; i < 3; i++) line(ctx, BX - 17, BY + R + 14 + i * 7, BX + 17, BY + R + 14 + i * 7, cb, 1.5);
    ctx.beginPath(); ctx.rect(BX - 34, BY + R + 36, 68, 18); ctx.fill(); ctx.stroke();
    ctx.restore();
    hits.push({ x: BX, y: BY, r: R + 10, name: 'the light bulb' }, { x: BX, y: BY + R + 40, r: 30, name: 'the light bulb' });
  }
  function supply(ctx) {
    const l = 400, r = 690, t = 110, b = 190, c = F.ref('power-supply');
    ctx.save(); ctx.fillStyle = alpha(c, 0.12); ctx.strokeStyle = c; ctx.lineWidth = 3; ctx.beginPath(); ctx.roundRect(l, t, r - l, b - t, 8); ctx.fill(); ctx.stroke(); ctx.restore();
    text(ctx, 'power supply', (l + r) / 2 - 20, (t + b) / 2, c, { size: 20, weight: 600, align: 'center' });
    text(ctx, '−', XL - 24, b - 16, PAL.ink, { size: 22, weight: 700, align: 'center' });
    text(ctx, '+', r - 18, t + 22, PAL.ink, { size: 22, weight: 700, align: 'center' });
    hits.push({ x: (l + r) / 2, y: (t + b) / 2, r: 60, name: 'the power supply' });
  }
  function draw() {
    const { ctx } = begin(d.c);
    hits = [];
    const BX = 1040, BY = 150;
    const b = sol.mix((k) => SOLUTES[k].ions / 12);
    /* the circuit: supply − to the negative plate; supply + to the bulb's socket, the socket to the positive plate */
    wire(ctx, [[XL, 190], [XL, PT]]);
    wire(ctx, [[690, 132], [980, 132], [980, BY + 87], [BX - 34, BY + 87]]);
    wire(ctx, [[BX + 34, BY + 87], [1100, BY + 87], [1100, 252], [XR, 252], [XR, PT]]);
    supply(ctx);
    bulb(ctx, BX, BY, b);
    beaker(ctx);
    for (const [key, list] of Object.entries(state)) {
      const a = sol.a(key); if (a <= 0) continue;
      ctx.save(); ctx.globalAlpha = a;
      for (const p of list) {
        const m = MOL[p.kind], one = m.atoms.length === 1;
        particle(ctx, m.atoms, p.x, p.y, one ? 0 : p.a, K);
        if (m.q && one) text(ctx, m.q > 0 ? '+' : '−', p.x, p.y + 1, PAL.panel, { size: 22, weight: 700, align: 'center' });
        else if (m.q) sign(ctx, m.q, p.x, p.y, 13);
        if (key === sol.value) hits.push({ x: p.x, y: p.y, r: 20, name: m.word });
      }
      ctx.restore();
    }
    plate(ctx, XL, -1); plate(ctx, XR, 1);
    const s = SOLUTES[sol.value];
    legend(ctx, { l: 960, r: 1380, t: 290, b: 576 }, s.key.map(([kind, name]) => ({ s: name, draw: (c, x, y) => { const m = MOL[kind]; particle(c, m.atoms, x, y, 0, m.atoms.length === 1 ? 0.9 : 1.1); } })), { corner: 'bl' });
    topline(ctx, sol.value === 'ethanol'
      ? 'Ethanol dissolves as molecules: no ions, no current, and the bulb stays dark.'
      : sol.value === 'KCl'
        ? 'KCl dissociates completely: all 12 particles are ions, and the bulb glows brightly.'
        : 'Few acetic acid molecules ionize: 2 ions among 5 molecules, and the bulb glows dimly.');
    tex(d.readout, s.eq);
  }
  register(d.fig, { update: (dt) => { cy.step(dt, () => 1); step(Math.min(dt, 0.05)); }, draw });
})();

/* =====================================================================
   FIGURE 11.7: KCl dissolving, drawn flat as the book draws it (a slice:
   the water molecules in front of and behind the ions are not drawn). A
   crystal of 4 × 5 ions, K⁺ where row + column is odd and Cl⁻ where it
   is even. Six surface ions leave one at a time: four water molecules
   turn as they close in, oxygen toward K⁺ and one hydrogen toward Cl⁻,
   the ion lifts off the surface and the cluster carries it into the
   solution. Moving: dissolving has a time, so the clock runs 0 to TEND
   and holds; the transport scrubs it, and every frame is a function of
   the time alone. Radii K⁺ 20 and Cl⁻ 25 (138 and 181 pm), O 13, H 8;
   the lattice spacing 46, the ions all but touching.
===================================================================== */
(function () {
  const d = sim('sim-hydration', 560);
  const A = 46, C0 = 600, R0 = 330, R = { K: 20, Cl: 25, O: 13, H: 8 }, OH = 15, HALF = (104.5 / 2) * Math.PI / 180;
  const NAME = { K: 'a potassium ion, K⁺', Cl: 'a chloride ion, Cl⁻' };
  const ions = [];
  for (let r = 0; r < 5; r++) for (let c = 0; c < 4; c++) ions.push({ f: (r + c) % 2 ? 'K' : 'Cl', x: C0 + c * A, y: R0 + r * A, r, c, n: -1 });
  const at = (r, c) => ions.find((q) => q.r === r && q.c === c);
  /* the leaving order, each with its way out (the outward normal) and where its cluster comes to rest */
  const PLAN = [[0, 3, [0.7, -0.7], [1010, 170]], [1, 3, [1, 0], [1220, 330]], [0, 2, [0, -1], [790, 150]], [0, 1, [0, -1], [470, 150]], [2, 3, [1, 0.3], [1120, 470]], [0, 0, [-0.7, -0.7], [250, 230]]];
  const START = 0.6, GAP = 1.7, DUR = 3.0, TEND = START + GAP * (PLAN.length - 1) + DUR + 0.4;
  /* a water molecule: O at (x, y), the two H at ±HALF about the direction a (the dipole's way, O to the H's) */
  const waterAtoms = (x, y, a) => [['O', x, y, R.O], ['H', x + OH * Math.cos(a + HALF), y + OH * Math.sin(a + HALF), R.H], ['H', x + OH * Math.cos(a - HALF), y + OH * Math.sin(a - HALF), R.H]];
  /* a little hash for fixed scatter */
  const fr = (i) => { const v = Math.sin(i * 12.9898 + 4.1) * 43758.5453; return v - Math.floor(v); };
  PLAN.forEach(([r, c, nrm, dest], n) => {
    const q = at(r, c), nl = Math.hypot(nrm[0], nrm[1]);
    q.n = n; q.out = [nrm[0] / nl, nrm[1] / nl]; q.dest = dest;
    const base = Math.atan2(q.out[1], q.out[0]) + Math.PI / 4;
    /* four waters about the ion at right angles; each from a start out in the solution, turned at random */
    q.shell = [0, 1, 2, 3].map((m) => {
      const u = base + (m * Math.PI) / 2, cu = Math.cos(u), su = Math.sin(u);
      /* K⁺: oxygen toward the ion, the dipole pointing away. Cl⁻: one O–H bond along the line to the ion */
      const dO = q.f === 'K' ? R.K + R.O + 2 : R.Cl + R.H + 1 + OH;
      const a = q.f === 'K' ? u : u + Math.PI + HALF;
      const s = 150 + 60 * fr(n * 7 + m), sa = u * 0.35 + Math.atan2(q.out[1], q.out[0]) * 0.65 + (fr(n * 11 + m) - 0.5) * 1.2;
      return { off: [dO * cu, dO * su], a, from: [s * Math.cos(sa) + q.out[0] * 60, s * Math.sin(sa) + q.out[1] * 60], a0: fr(n * 13 + m) * TAU };
    });
  });
  /* the waiting waters spread out once: kept 46 apart, clear of the crystal, of every cluster's resting place and of
     the key, inside the canvas */
  {
    const W = []; PLAN.forEach((_, n) => ions.filter((q) => q.n === n).forEach((q) => q.shell.forEach((h) => W.push({ q, h, x: q.x + h.from[0], y: q.y + h.from[1] }))));
    const fixed = [...ions.map((q) => [q.x, q.y, 52]), ...PLAN.map((p) => [p[3][0], p[3][1], 84])];
    for (let it = 0; it < 120; it++) {
      for (let i = 0; i < W.length; i++) {
        const p = W[i];
        for (let j = i + 1; j < W.length; j++) { const o = W[j], dx = o.x - p.x, dy = o.y - p.y, r = Math.hypot(dx, dy) || 1; if (r < 46) { const k = (46 - r) / 2 / r; p.x -= dx * k; p.y -= dy * k; o.x += dx * k; o.y += dy * k; } }
        for (const [fx, fy, fr0] of fixed) { const dx = p.x - fx, dy = p.y - fy, r = Math.hypot(dx, dy) || 1; if (r < fr0) { p.x = fx + dx / r * fr0; p.y = fy + dy / r * fr0; } }
        if (p.x < 420 && p.y > 340) p.y = 340;
        p.x = Math.min(Math.max(p.x, 40), 1360); p.y = Math.min(Math.max(p.y, 110), 520);
      }
    }
    W.forEach((w) => { w.h.from = [w.x - w.q.x, w.y - w.q.y]; });
  }
  /* where an ion and its waters are at time t */
  function state(q, t) {
    if (q.n < 0) return { x: q.x, y: q.y, w: -1 };
    const w = clamp01((t - (START + q.n * GAP)) / DUR);
    const lift = smooth(clamp01((w - 0.25) / 0.25)), go = smooth(clamp01((w - 0.45) / 0.55));
    const lx = q.x + q.out[0] * 70 * lift, ly = q.y + q.out[1] * 70 * lift;
    return { x: lx + (q.dest[0] - lx) * go, y: ly + (q.dest[1] - ly) * go, w, come: smooth(clamp01(w / 0.42)) };
  }
  const cy = cycle(() => TEND, 2);
  let hits = [];
  F.hover(d.stage, () => hits);
  const turn = (a0, a1, k) => { let da = ((a1 - a0) % TAU + 3 * Math.PI) % TAU - Math.PI; return a0 + da * k; };
  function draw() {
    const { ctx } = begin(d.c);
    const t = cy.now();
    hits = [];
    let outK = 0, outCl = 0;
    /* the crystal's ions first, then the leaving clusters on top */
    const S = ions.map((q) => ({ q, s: state(q, t) }));
    S.filter(({ s }) => s.w <= 0).forEach(({ q, s }) => { ball(ctx, s.x, s.y, R[q.f], F.el(q.f)); hits.push({ x: s.x, y: s.y, r: R[q.f], name: NAME[q.f] + ' in the crystal' }); });
    S.filter(({ s }) => s.w > 0).forEach(({ q, s }) => {
      if (s.w >= 0.6) { if (q.f === 'K') outK++; else outCl++; }
      ball(ctx, s.x, s.y, R[q.f], F.el(q.f));
      hits.push({ x: s.x, y: s.y, r: R[q.f], name: NAME[q.f] + (s.w >= 0.6 ? ', hydrated' : '') });
    });
    /* the waters: each closes in on its ion and turns to face it */
    S.filter(({ q }) => q.n >= 0).forEach(({ q, s }) => {
      if (s.w < 0 && t < START) { /* waiting in the solution */ }
      const k = s.w < 0 ? 0 : s.come;
      q.shell.forEach((h, m) => {
        const tx = s.x + h.off[0], ty = s.y + h.off[1], fx = q.x + h.from[0], fy = q.y + h.from[1];
        const x = fx + (tx - fx) * k, y = fy + (ty - fy) * k, a = turn(h.a0, h.a, k);
        particle(ctx, waterAtoms(0, 0, a), x, y, 0, 1);
        hits.push({ x, y, r: 16, name: k > 0.95 ? 'a water molecule, turned ' + (q.f === 'K' ? 'oxygen end toward the K⁺' : 'one hydrogen end toward the Cl⁻') : 'a water molecule, H₂O' });
      });
    });
    const dot = (f) => (c, x, y) => ball(c, x, y, f === 'O' ? 10 : f === 'H' ? 7 : 11, F.el(f));
    legend(ctx, { l: 30, r: 400, t: 360, b: 540 }, [{ s: 'potassium ion, K⁺', draw: dot('K') }, { s: 'chloride ion, Cl⁻', draw: dot('Cl') }, { s: 'oxygen, O', draw: dot('O') }, { s: 'hydrogen, H', draw: dot('H') }], { corner: 'bl' });
    const ion = (n, w) => n + ' ' + w + (n === 1 ? ' ion' : ' ions');
    topline(ctx, outK + outCl === 0
      ? 'Water molecules close in on the surface of a KCl crystal.'
      : 'Water has carried ' + ion(outK, 'K⁺') + ' and ' + ion(outCl, 'Cl⁻') + ' into the solution.');
    tex(d.readout, '\\text{KCl}(s) \\longrightarrow \\text{K}^{+}(aq) + \\text{Cl}^{-}(aq)');
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();
};
