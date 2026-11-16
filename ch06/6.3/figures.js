/* Figures for section 6.3 Development of Quantum Theory. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['6.3'] = function (root, F) {
const { fmt, tex, C, PAL, alpha, ctl, cycle, register, begin, line, arrow, dot, text, topline, axes, hbracket } = F;
const sim = (id, H) => F.sim(root, id, H);
const still = (d, draw) => register(d.fig, { update: () => {}, draw });

/* ---------- constants as the book states them ---------- */
const HP = 6.626e-34;        /* J s, Planck's constant */
const ME = 9.109e-31;        /* kg, the mass of an electron */
const MP = 1.673e-27;        /* kg, the mass of a proton */
const A0 = 52.92;            /* pm, the Bohr radius */
const TAU = 2 * Math.PI;

/* ---------- numbers in scientific form ---------- */
const SUP = { '-': '⁻', '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹' };
const sup = (s) => String(s).split('').map((c) => SUP[c] ?? c).join('');
const expOf = (x) => Math.floor(Math.log10(Math.abs(x)) + 1e-9);
function sciU(x, d = 2) { const e = expOf(x), m = x / Math.pow(10, e); return m.toFixed(d) + ' × 10' + sup(e); }
function sciT(x, d = 2) { const e = expOf(x), m = x / Math.pow(10, e); return m.toFixed(d) + '\\times10^{' + e + '}'; }
const WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'];
const cap = (s) => s[0].toUpperCase() + s.slice(1);

/* =====================================================================
   FIGURE 6.17: the electron wave about a circular orbit of fixed radius.
   Still: the wavelength slider is the whole figure. The first lap is
   drawn in full and the second faintly over it, so the two coincide only
   when a whole number of wavelengths fits 2πr; the same lap is laid out
   straight on the right, one circumference long, so the reader sees where
   the wave arrives back at its start.
===================================================================== */
(function () {
  const d = sim('sim-orbit-wave', 500);
  const R_PM = 100, CIRC = TAU * R_PM;                 /* the orbit's radius and circumference, pm */
  const specials = [1, 2, 3, 4, 5, 6].map((n) => ({ at: CIRC / n, label: 'n = ' + n }));
  const lam = ctl(d.controls, { label: '\\klam', cls: 'wavelength', min: 90, max: 660, step: 0.1, value: +(CIRC / 6).toFixed(1), unit: 'pm', dec: 1, aria: 'the wavelength of the electron wave', specials });
  const CX = 330, CY = 262, R = 148, AMP = 22;
  /* the unrolled orbit: one circumference, 0 to 628.3 pm, laid along x from SX0 to SX1 */
  const SX0 = 700, SX1 = 1320, SY = 262, SAMP = 62;
  const endY = () => SY - SAMP * Math.sin((TAU * CIRC) / lam.v);
  F.hover(d.stage, () => [
    { x: CX, y: CY, r: 20, name: 'the nucleus' },
    { x: SX0, y: SY, r: 18, name: 'where the wave starts' },
    { x: SX1, y: SY, r: 16, name: 'where the wave must arrive to join its start' },
    { x: SX1, y: endY(), r: 14, name: 'where the wave arrives after one lap' },
  ]);
  function draw() {
    const { ctx } = begin(d.c), L = lam.v, n = CIRC / L, whole = Math.abs(n - Math.round(n)) < 0.004, cw = C('wavelength'), cr = C('length'), co = F.ref('orbit');
    const k = Math.round(n);
    topline(ctx, whole
      ? `${cap(WORDS[k] ?? String(k))} wavelength${k > 1 ? 's fit' : ' fits'} the orbit, so the wave closes on itself.`
      : `${fmt(n, 2)} wavelengths fit the orbit, so the wave comes back out of step with itself.`);
    /* the orbit, the nucleus and the radius */
    ctx.save(); ctx.setLineDash([10, 10]); ctx.strokeStyle = co; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(CX, CY, R, 0, TAU); ctx.stroke(); ctx.restore();
    const ra = -2.45, rx = CX + R * Math.cos(ra), ry = CY + R * Math.sin(ra);
    arrow(ctx, CX, CY, rx, ry, cr, 3);
    dot(ctx, CX, CY, PAL.ink, true, 9);
    text(ctx, 'r = 100 pm', CX, CY + 36, cr, { size: 21, weight: 600, align: 'center' });
    /* the wave: arc length s = rθ, displacement AMP·sin(2πs/λ) outward from the orbit */
    const lap = (t0, t1, a, w) => {
      ctx.save(); ctx.strokeStyle = cw; ctx.globalAlpha *= a; ctx.lineWidth = w; ctx.beginPath();
      for (let i = 0; i <= 480; i++) {
        const th = t0 + ((t1 - t0) * i) / 480, s = th * R_PM, rr = R + AMP * Math.sin((TAU * s) / L);
        const x = CX + rr * Math.cos(th - Math.PI / 2), y = CY + rr * Math.sin(th - Math.PI / 2);
        if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y);
      }
      ctx.stroke(); ctx.restore();
    };
    lap(TAU, 2 * TAU, 0.32, 3);
    lap(0, TAU, 1, 5);
    dot(ctx, CX, CY - R, cw, true, 8);
    F.legend(ctx, { l: 60, r: 600, t: 80, b: 490 }, [{ s: 'first lap', color: cw, w: 5 }, { s: 'second lap', color: alpha(cw, 0.32), w: 3 }], { corner: 'bottom', row: true, size: 19, panel: false });
    /* the orbit unrolled */
    const X = (s) => SX0 + ((SX1 - SX0) * s) / CIRC;
    line(ctx, SX0, SY, SX1, SY, co, 2.5, [10, 10]);
    [SX0, SX1].forEach((x) => line(ctx, x, SY - SAMP - 20, x, SY + SAMP + 20, PAL.muted, 2));
    text(ctx, 'start', SX0, SY + SAMP + 44, PAL.ink, { size: 20, align: 'center' });
    text(ctx, 'once around, 2πr = 628.3 pm', SX1 + 10, SY + SAMP + 44, cr, { size: 20, align: 'right' });
    text(ctx, 'the orbit unrolled', (SX0 + SX1) / 2, SY + SAMP + 96, co, { size: 21, weight: 600, align: 'center' });
    ctx.save(); ctx.strokeStyle = cw; ctx.lineWidth = 5; ctx.beginPath();
    for (let i = 0; i <= 400; i++) { const s = (CIRC * i) / 400, x = X(s), y = SY - SAMP * Math.sin((TAU * s) / L); if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y); }
    ctx.stroke(); ctx.restore();
    /* where the wave must be to join its own start, and where it is */
    dot(ctx, SX0, SY, cw, true, 9); dot(ctx, SX1, SY, cw, false, 11);
    if (!whole) dot(ctx, SX1, endY(), cw, true, 9);
    if (L <= CIRC) hbracket(ctx, X(0), X(L), SY - SAMP - 22, cw, 'λ = ' + fmt(L, 1) + ' pm', { side: 'above' });
    tex(d.readout, `n = \\frac{2\\pi \\kr}{\\klam} = \\frac{2\\pi(100\\ \\text{pm})}{${fmt(L, 1)}\\ \\text{pm}} = ${fmt(n, 2)}`);
  }
  still(d, draw);
})();

/* =====================================================================
   FIGURE 6.18: electrons through two slits, one at a time. Moving: the
   clock is the number of electrons recorded, and the pattern emerges from
   it. The wave is drawn as fronts one wavelength apart, from the source to
   the barrier and from each slit to the screen; the speed slider sets the
   wavelength, and the bands are computed from the drawn geometry: the
   difference between the two paths from the drawn slits to each height of
   the drawn screen, over the drawn wavelength. The apparatus is schematic.
===================================================================== */
(function () {
  const d = sim('sim-double-slit', 500);
  const v = ctl(d.controls, { label: '\\kv', cls: 'velocity', min: 4, max: 10, step: 0.1, value: 10, unit: '× 10⁶ m/s', dec: 1, aria: 'the speed of the electrons', onInput: () => { sample(); cy.reset(); } });
  const T = 7, NMAX = 2400;
  const cy = cycle(() => T, 2.5);
  const TOP = 118, BOT = 438, YC = (TOP + BOT) / 2;
  const XS = 176, XB = 400, XE = 640, D2 = 22;       /* the source's mouth, the barrier, the screen edge on; half the slit separation */
  const SCR = { l: 716, r: 916, t: TOP, b: BOT };
  const HB = { l: 990, r: 1340 }, NB = 64, BH = (BOT - TOP) / NB;
  const lamC = () => 80 / v.v;                        /* one wavelength in canvas units: 8 at the opening speed */
  const prob = (y) => { const u = y - YC, L = XE - XB, dr = Math.hypot(L, u + D2) - Math.hypot(L, u - D2), c = Math.cos((Math.PI * dr) / lamC()); return c * c * Math.exp(-((u / 150) ** 2)); };
  /* one fixed stream of random numbers, so the same electrons arrive every time the clock runs */
  function rng(seed) { let a = seed >>> 0; return () => { a = (a + 0x6d2b79f5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  let hits = [], tot = 1;
  function sample() {
    const r = rng(6318); hits = [];
    while (hits.length < NMAX) { const y = SCR.t + r() * (SCR.b - SCR.t), x = SCR.l + 7 + r() * (SCR.r - SCR.l - 14); if (r() < prob(y)) hits.push([x, y]); }
    tot = 0; for (let i = 0; i < NB; i++) tot += prob(SCR.t + (i + 0.5) * BH);
  }
  sample();
  const count = (t) => Math.min(NMAX, Math.floor(NMAX * Math.pow(t / T, 2.4)));
  F.hover(d.stage, () => [
    { x: (XS + XB) / 2, y: YC, r: 90, name: 'the electron wave, its fronts one wavelength apart' },
    { x: (XB + XE) / 2, y: YC, r: 100, name: 'the waves from the two slits, crossing' },
  ]);
  function draw() {
    const { ctx } = begin(d.c), t = cy.now(), N = count(t), ce = F.el('e-'), cw = C('wavelength'), cs = F.ref('source'), cb = F.ref('barrier'), cn = F.ref('screen');
    topline(ctx, N === 0 ? 'No electron has arrived yet.'
      : N < 40 ? `${N} electron${N === 1 ? '' : 's'}: each lands as one dot, and the dots look scattered.`
        : N < 500 ? `${N} electrons: bands begin to show where more of them land.`
          : `${N} electrons: together the dots draw the interference pattern of a wave.`);
    /* the wave: fronts one wavelength apart, moving away from the source and from each slit */
    const lc = lamC(), ph = ((t * 30) / lc) % 1;
    const fronts = (x0, y0, xa, xb) => {
      ctx.save(); ctx.beginPath(); ctx.rect(xa, TOP, xb - xa, BOT - TOP); ctx.clip();
      ctx.strokeStyle = alpha(cw, 0.5); ctx.lineWidth = 2;
      const rmax = Math.hypot(xb - x0, BOT - TOP);
      for (let r = (ph + 0.5) * lc; r < rmax; r += lc) { ctx.beginPath(); ctx.arc(x0, y0, r, -Math.PI / 2, Math.PI / 2); ctx.stroke(); }
      ctx.restore();
    };
    fronts(XS, YC, XS + 2, XB - 8);
    fronts(XB + 6, YC - D2, XB + 8, XE - 4);
    fronts(XB + 6, YC + D2, XB + 8, XE - 4);
    /* the source: a gun with a heated filament and a narrow mouth */
    ctx.save(); ctx.strokeStyle = cs; ctx.lineWidth = 3; ctx.fillStyle = alpha(cs, 0.16); ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.roundRect(56, YC - 38, 92, 76, 8); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.rect(148, YC - 12, XS - 148, 24); ctx.fill(); ctx.stroke();
    ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(72, YC + 18);
    [[86, YC + 18], [92, YC - 14], [100, YC + 14], [108, YC - 14], [116, YC + 14], [122, YC - 18], [136, YC - 18]].forEach(([x, y]) => ctx.lineTo(x, y));
    ctx.stroke(); ctx.restore();
    text(ctx, 'electron source', 116, BOT + 30, cs, { size: 20, align: 'center' });
    /* the barrier with its two slits, and the screen edge on */
    const gaps = [YC - D2, YC + D2];
    line(ctx, XB, TOP, XB, gaps[0] - 5, cb, 12); line(ctx, XB, gaps[0] + 5, XB, gaps[1] - 5, cb, 12); line(ctx, XB, gaps[1] + 5, XB, BOT, cb, 12);
    text(ctx, 'two slits', XB, BOT + 30, cb, { size: 20, align: 'center' });
    line(ctx, XE, TOP, XE, BOT, cn, 6);
    text(ctx, 'screen, edge on', XE - 10, BOT + 30, cn, { size: 20, align: 'center' });
    /* the same screen face on, with every electron recorded so far */
    [TOP, BOT].forEach((y) => line(ctx, XE + 8, y, SCR.l - 4, y, alpha(PAL.ink, 0.35), 2, [4, 8]));
    ctx.save(); ctx.fillStyle = PAL.soft; ctx.strokeStyle = cn; ctx.lineWidth = 3; ctx.fillRect(SCR.l, SCR.t, SCR.r - SCR.l, SCR.b - SCR.t); ctx.strokeRect(SCR.l, SCR.t, SCR.r - SCR.l, SCR.b - SCR.t); ctx.restore();
    text(ctx, 'screen, face on', (SCR.l + SCR.r) / 2 + 10, BOT + 30, cn, { size: 20, align: 'center' });
    ctx.save(); ctx.fillStyle = ce;
    for (let i = 0; i < N; i++) { ctx.beginPath(); ctx.arc(hits[i][0], hits[i][1], 2.8, 0, TAU); ctx.fill(); }
    ctx.restore();
    /* the newest arrival is ringed as it lands */
    if (N > 0 && N < 200) { const h = hits[N - 1]; dot(ctx, h[0], h[1], ce, false, 11); }
    /* the counts along the screen, and the curve they approach */
    const bins = new Array(NB).fill(0);
    for (let i = 0; i < N; i++) bins[Math.min(NB - 1, Math.floor((hits[i][1] - SCR.t) / BH))]++;
    const top = Math.max((1 / tot) * Math.max(N, 1), ...bins), scale = (HB.r - HB.l) / (top * 1.1 || 1);
    line(ctx, HB.l, TOP, HB.l, BOT, PAL.ink, 2.5);
    ctx.save(); ctx.fillStyle = alpha(ce, 0.45);
    bins.forEach((b, i) => { if (b) ctx.fillRect(HB.l, SCR.t + i * BH + 0.5, b * scale, BH - 1); });
    ctx.restore();
    if (N >= 1) {
      ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.lineJoin = 'round'; ctx.beginPath();
      for (let i = 0; i <= 320; i++) { const y = TOP + ((BOT - TOP) * i) / 320, x = HB.l + (prob(y) / tot) * N * scale; if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y); }
      ctx.stroke(); ctx.restore();
    }
    F.legend(ctx, { l: HB.l, r: HB.r, t: TOP, b: BOT }, [{ s: 'electrons counted', kind: 'swatch', color: alpha(ce, 0.45) }, { s: '|ψ|² of the wave', color: PAL.ink, w: 3 }], { corner: 'above', size: 19 });
    text(ctx, 'count at each height', (HB.l + HB.r) / 2, BOT + 30, PAL.ink, { size: 20, align: 'center' });
    const lam = HP / (ME * v.v * 1e6);
    tex(d.readout, `\\klam = \\frac{h}{\\km \\kv} = \\frac{6.626\\times10^{-34}\\ \\text{kg m}^{2}\\text{/s}}{(9.109\\times10^{-31}\\ \\text{kg})(${fmt(v.v, 1)}\\times10^{6}\\ \\text{m/s})} = ${sciT(lam, 2)}\\ \\text{m}`);
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();

/* =====================================================================
   SIM: the de Broglie wavelength of an electron, a proton and a softball
   on one logarithmic scale of lengths, beside an atom and a nucleus.
   Still: it answers its choice and its slider.
===================================================================== */
(function () {
  const d = sim('sim-de-broglie', 300);
  const P = {
    e: { name: 'electron', m: ME, range: { min: 0.1, max: 10, step: 0.01, value: 10, unit: '× 10⁶ m/s', dec: 2 }, k: 1e6 },
    p: { name: 'proton', m: MP, range: { min: 0.1, max: 10, step: 0.01, value: 10, unit: '× 10⁶ m/s', dec: 2 }, k: 1e6 },
    ball: { name: 'softball', m: 0.100, range: { min: 1, max: 50, step: 0.5, value: 35, unit: 'm/s', dec: 1 }, k: 1 },
  };
  const who = F.choice(d.controls, { label: '\\text{particle}', options: [{ value: 'e', label: 'electron' }, { value: 'p', label: 'proton' }, { value: 'ball', label: 'softball' }], value: 'e', aria: 'the moving particle', onInput: (x) => v.range(P[x].range) });
  const v = ctl(d.controls, { label: '\\kv', cls: 'velocity', ...P.e.range, aria: 'the speed of the particle' });
  /* the scale: 10⁻³⁶ m to 10⁻⁶ m, which holds every wavelength the controls reach */
  const LO = -36, HI = -6, AX = { l: 90, r: 1310, y: 190 };
  const X = (lg) => AX.l + ((lg - LO) / (HI - LO)) * (AX.r - AX.l);
  const REFS = { '-10': 'an atom', '-15': 'a nucleus' };
  function draw() {
    const { ctx } = begin(d.c), q = P[who.value], vel = v.v * q.k, lam = HP / (q.m * vel), lg = Math.log10(lam), cw = C('wavelength'), cr = C('length');
    const r = lam / 1e-10, small = 1 / r;
    const cmp = r > 3 ? `about ${fmt(r, 0)} times the size of an atom` : r > 0.3 ? 'about the size of an atom' : `${small < 1000 ? fmt(small, 0) : sciU(small, 1)} times smaller than an atom`;
    topline(ctx, `The ${q.name}’s wavelength is ${cmp}.`);
    line(ctx, AX.l, AX.y, AX.r, AX.y, cw, 3);
    for (let e = LO; e <= HI; e++) line(ctx, X(e), AX.y, X(e), AX.y + (e % 5 ? 6 : 12), cw, e % 5 ? 1.5 : 2.5);
    for (let e = -35; e <= HI; e += 5) {
      text(ctx, '10' + sup(e), X(e), AX.y + 34, cw, { size: 19, align: 'center' });
      if (REFS[e]) text(ctx, REFS[e], X(e), AX.y + 64, cr, { size: 20, weight: 600, align: 'center' });
    }
    text(ctx, 'length (m)', AX.r, AX.y + 92, PAL.ink, { size: 20, align: 'right' });
    const x = X(Math.max(LO, Math.min(HI, lg)));
    arrow(ctx, x, AX.y - 62, x, AX.y - 8, cw, 4); dot(ctx, x, AX.y, cw, true, 9);
    F.label(ctx, `λ = ${sciU(lam, 2)} m`, x, AX.y - 62, { side: 'above', color: cw, size: 22, gap: 6 });
    tex(d.readout, `\\klam = \\frac{h}{\\km \\kv} = \\frac{6.626\\times10^{-34}\\ \\text{kg m}^{2}\\text{/s}}{(${sciT(q.m, 3)}\\ \\text{kg})(${q.k === 1 ? fmt(vel, 1) : sciT(vel, 2)}\\ \\text{m/s})} = ${sciT(lam, 2)}\\ \\text{m}`);
  }
  still(d, draw);
})();

/* ---------- hydrogen's radial functions, a₀ = 1, normalized ---------- */
const RADIAL = {
  '1s': { n: 1, l: 0, R: (r) => 2 * Math.exp(-r), nodes: [] },
  '2s': { n: 2, l: 0, R: (r) => (1 / (2 * Math.SQRT2)) * (2 - r) * Math.exp(-r / 2), nodes: [2] },
  '3s': { n: 3, l: 0, R: (r) => (2 / (81 * Math.sqrt(3))) * (27 - 18 * r + 2 * r * r) * Math.exp(-r / 3), nodes: [(9 - 3 * Math.sqrt(3)) / 2, (9 + 3 * Math.sqrt(3)) / 2] },
  '2p': { n: 2, l: 1, R: (r) => (1 / (2 * Math.sqrt(6))) * r * Math.exp(-r / 2), nodes: [] },
  '3p': { n: 3, l: 1, R: (r) => (8 / (27 * Math.sqrt(6))) * r * (1 - r / 6) * Math.exp(-r / 3), nodes: [6] },
  '3d': { n: 3, l: 2, R: (r) => (4 / (81 * Math.sqrt(30))) * r * r * Math.exp(-r / 3), nodes: [] },
};
/* the angular part about the z axis for each l, largest value 1: 1, cos θ, (3cos²θ − 1)/2 */
const ANG = [() => 1, (c) => c, (c) => (3 * c * c - 1) / 2];

/* =====================================================================
   FIGURE 6.20: an orbital with a quarter cut away, above its radial graph.
   Mathematical 3D: the body is the contour of |ψ| at 0.18 of its
   outermost peak, lit, in the colour of the sign of ψ; the quarter toward
   the reader is removed, and the two flat faces of the cut are painted
   with the same sign colours, deeper where |ψ|² is greater. A radial node
   is the gap between two shells, ringed on the faces. Every orbital is
   scaled to fill the stage and carries a ruler in pm; the graph beneath
   keeps one distance axis for all of them. The orbit is bounded to the
   views that look into the cut. Still: a change of orbital crossfades the
   scenes and bends the curve.
===================================================================== */
(function () {
  const d = sim('sim-radial');
  const V = F.view3d(d.stage, { h: 520, dist: 7.6, tilt: 0.2, yaw: [-0.95, -0.2], pitch: [-0.5, 0.7] });
  V.setView(-0.46, 0.2);
  const g = V.part(0), c2 = F.makeCanvas(d.stage, 300);
  const KEYS = ['1s', '2s', '3s', '2p', '3p', '3d'];
  const orb = F.choice(d.controls, { label: '\\text{orbital}', options: KEYS.map((k) => ({ value: k, label: k.replace(/([spd])$/, '<em>$1</em>') })), value: '3s', aria: 'the orbital drawn' });
  const W = 1.6;                                     /* the half-width of a cut face in the scene */
  const T3 = window.THREE, live = !!(T3 && V.scene);
  const LEVEL = 0.18;                                /* the contour drawn, as a fraction of the outermost peak of |ψ| */
  const psi = (o, x, z) => { const r = Math.hypot(x, z) || 1e-9; return o.R(r) * ANG[o.l](z / r); };
  /* the humps of |R| between its nodes, each with its peak; the contour's level; how far the body reaches */
  const SHAPE = {};
  KEYS.forEach((key) => {
    const o = RADIAL[key], cuts = [0, ...o.nodes, 60];
    const humps = cuts.slice(0, -1).map((lo, i) => { const hi = cuts[i + 1]; let rp = lo, m = 0; for (let r = lo; r < hi; r += 0.01) { const v = Math.abs(o.R(r)); if (v > m) { m = v; rp = r; } } return { lo, hi, rp, peak: m }; });
    const level = LEVEL * humps[humps.length - 1].peak;
    const root = (a, b, t) => { for (let i = 0; i < 40; i++) { const m = (a + b) / 2; if ((Math.abs(o.R(m)) > t) === (Math.abs(o.R(a)) > t)) a = m; else b = m; } return (a + b) / 2; };
    /* where |R| falls to t on the far and the near side of a hump's peak; the near side is the nucleus itself where |R| is still above t there */
    const far = (h, t) => root(h.rp, h.hi, t), near = (h, t) => (Math.abs(o.R(h.lo)) > t ? h.lo : root(h.lo, h.rp, t));
    const reach = far(humps[humps.length - 1], level), ext = reach * 1.08, pm = ext * A0, step = [20, 50, 100, 200, 300, 500].find((x) => pm / x < 3.6) ?? 500;
    const ticks = []; for (let t = 0; t <= pm; t += step) ticks.push(t);
    SHAPE[key] = { humps, level, far, near, ext, ticks };
  });
  const NT = 48, NP = 96, CUT = NP / 4;              /* the grid of directions; the first quarter of the turn about z is cut away */
  const scenes = {};
  function build(key) {
    if (scenes[key] || !live) return scenes[key];
    const o = RADIAL[key], sh = SHAPE[key], s = W / sh.ext, grp = new T3.Group(), mats = { pos: [], neg: [] };
    /* the body: for each hump of |R|, the contour's far and near sheets, over every direction outside the cut.
       The orbital's z axis is the scene's y; the cut is the quarter between the scene's +x and +z. */
    sh.humps.forEach((h) => {
      const sign = o.R(h.rp) >= 0 ? 1 : -1;
      [sh.far, sh.near].forEach((at) => {
        const pos = [], col = [], on = [];
        for (let i = 0; i <= NT; i++) for (let j = 0; j <= NP; j++) {
          const th = (Math.PI * i) / NT, ph = (TAU * j) / NP, c = Math.cos(th), a = Math.abs(ANG[o.l](c)), ok = h.peak * a > sh.level;
          const r = (ok ? at(h, sh.level / a) : h.rp) * s, q = Math.sin(th);
          pos.push(q * Math.cos(ph) * r, c * r, q * Math.sin(ph) * r); on.push(ok); col.push(sign * (ANG[o.l](c) >= 0 ? 1 : -1));
        }
        const idx = [];
        for (let i = 0; i < NT; i++) for (let j = CUT; j < NP; j++) {
          const p = i * (NP + 1) + j, b = p + NP + 1;
          if (on[p] || on[b] || on[p + 1]) idx.push(p, b, p + 1);
          if (on[b] || on[b + 1] || on[p + 1]) idx.push(b, b + 1, p + 1);
        }
        if (!idx.length) return;
        const geo = new T3.BufferGeometry();
        geo.setAttribute('position', new T3.Float32BufferAttribute(pos, 3));
        geo.setAttribute('color', new T3.Float32BufferAttribute(new Array(pos.length).fill(0), 3));
        geo.setIndex(idx); geo.computeVertexNormals();
        const mesh = new T3.Mesh(geo, new T3.MeshPhongMaterial({ vertexColors: true, side: T3.DoubleSide, shininess: 20 }));
        mesh.userData.sgn = col; grp.add(mesh); V.pickable(mesh, 'the orbital, where the electron is most likely to be found');
        (mats.pos).push(mesh);
      });
    });
    /* the two flat faces of the cut, which meet along the orbital's z axis: the same half-plane picture on each */
    const cv = document.createElement('canvas'); cv.width = 240; cv.height = 480;
    const tx = new T3.CanvasTexture(cv); if (T3.SRGBColorSpace) tx.colorSpace = T3.SRGBColorSpace;
    const mat = new T3.MeshBasicMaterial({ map: tx, alphaTest: 0.5, side: T3.DoubleSide });
    const faceA = new T3.Mesh(new T3.PlaneGeometry(W, 2 * W), mat); faceA.position.set(W / 2, 0, 0);
    const faceB = new T3.Mesh(new T3.PlaneGeometry(W, 2 * W), mat); faceB.rotation.y = -Math.PI / 2; faceB.position.set(0, 0, W / 2);
    [faceA, faceB].forEach((f) => { grp.add(f); V.pickable(f, 'a cut face through the nucleus'); });
    /* a ring at each radial node on both faces, the ruler under the cut, and the nucleus */
    const inks = [], dash = (len) => { const u = Math.min(0.06, len / 28); const m = new T3.LineDashedMaterial({ dashSize: u, gapSize: u * 0.8 }); inks.push(m); return m; };
    const solid = () => { const m = new T3.LineBasicMaterial(); inks.push(m); return m; };
    o.nodes.forEach((rn) => {
      [(c, h) => [c, h, 0.006], (c, h) => [0.006, h, c]].forEach((at) => {
        const p = []; for (let i = 0; i <= 48; i++) { const a = -Math.PI / 2 + (Math.PI * i) / 48; p.push(new T3.Vector3(...at(rn * s * Math.cos(a), rn * s * Math.sin(a)))); }
        const ring = new T3.Line(new T3.BufferGeometry().setFromPoints(p), dash(TAU * rn * s)); ring.computeLineDistances(); grp.add(ring);
      });
    });
    const YR = -W / 1.08 - 0.16, seg = (a, b) => grp.add(new T3.Line(new T3.BufferGeometry().setFromPoints([new T3.Vector3(...a), new T3.Vector3(...b)]), solid()));
    seg([0, YR, 0], [(sh.ticks[sh.ticks.length - 1] / A0) * s, YR, 0]);
    const labels = sh.ticks.map((pm, i) => { const x = (pm / A0) * s; seg([x, YR, 0], [x, YR - 0.07, 0]); return V.label(pm + (i === sh.ticks.length - 1 ? ' pm' : ''), [x, YR - 0.25 + 0.2, 0], g, 0, 'tick'); });
    const nuc = F.mesh.sphere(grp, [0, 0, 0], 0.03, PAL.ink); V.pickable(nuc, 'the nucleus');
    grp.position.y = 0.2; g.add(grp);
    scenes[key] = { o, sh, grp, meshes: mats.pos, cv, tx, inks, nuc, labels, paint: '' };
    return scenes[key];
  }
  function paint(sc) {
    const a = F.cat(0), b = F.cat(1), tag = [a, b, PAL.ink, PAL.panel].join('|'); if (sc.paint === tag) return;
    const ca = new T3.Color(a), cb = new T3.Color(b);
    sc.meshes.forEach((m) => { const col = m.geometry.getAttribute('color'); m.userData.sgn.forEach((s, i) => { const c = s > 0 ? ca : cb; col.setXYZ(i, c.r, c.g, c.b); }); col.needsUpdate = true; });
    /* the faces: inside the contour, the colour of the sign of ψ over the page's ground, deeper where |ψ|² is greater */
    const N = sc.cv.width, M = sc.cv.height, c = sc.cv.getContext('2d'), o = sc.o, sh = sc.sh, ref = (sh.level / LEVEL) ** 2;
    const probe = (css) => { c.clearRect(0, 0, 1, 1); c.fillStyle = css; c.fillRect(0, 0, 1, 1); return c.getImageData(0, 0, 1, 1).data; };
    const pa = probe(a), pb = probe(b), pg = probe(PAL.panel), img = c.createImageData(N, M);
    for (let j = 0; j < M; j++) for (let i = 0; i < N; i++) {
      const x = ((i + 0.5) / N) * sh.ext, z = (1 - ((j + 0.5) / M) * 2) * sh.ext, w = psi(o, x, z), k = 4 * (j * N + i), px = w >= 0 ? pa : pb;
      if (Math.abs(w) < sh.level) continue;
      const t = 0.42 + 0.58 * Math.min(1, Math.pow((w * w) / ref, 0.4));
      for (let q = 0; q < 3; q++) img.data[k + q] = Math.round(pg[q] * (1 - t) + px[q] * t);
      img.data[k + 3] = 255;
    }
    c.clearRect(0, 0, N, M); c.putImageData(img, 0, 0); sc.tx.needsUpdate = true;
    sc.inks.forEach((m) => m.color.set(PAL.ink)); sc.nuc.material.color.set(PAL.ink);
    sc.paint = tag;
  }
  /* the radial probability r²R², each curve drawn to its own peak (the y axis has no numbers, as the book's) */
  const PEAK = {}; KEYS.forEach((k) => { const o = RADIAL[k]; let m = 0; for (let r = 0; r < 30; r += 0.01) m = Math.max(m, r * r * o.R(r) ** 2); PEAK[k] = m; });
  const pOf = (key) => (x) => { const r = x / A0, o = RADIAL[key]; return (0.9 * r * r * o.R(r) ** 2) / PEAK[key]; };
  function draw() {
    const key = orb.value, o = RADIAL[key];
    KEYS.forEach((k) => {
      const a = k === key || k === orb.from ? orb.a(k) : 0; if (a > 0) build(k);
      const sc = scenes[k]; if (!sc) return;
      paint(sc); F.fade3(sc.grp, a); sc.labels.forEach((e) => { e.style.display = a > 0.5 ? '' : 'none'; });
    });
    V.invalidate();
    const { ctx } = begin(c2), nodes = o.n - o.l - 1, ca = F.cat(0), cb = F.cat(1);
    const box = { l: 150, r: 1300, t: 62, b: 222 };
    const ax = axes(ctx, box, [0, 1500], [0, 1], { xl: 'distance from nucleus (pm)', xc: C('length'), yl: 'probability density', nx: 5, ny: 0 }), { X, Y } = ax;
    /* the area under the curve in the colour of the sign of ψ there */
    const fill = (k, a) => F.faded(ctx, a, [0, 0], () => {
      const R = RADIAL[k].R, f = pOf(k);
      for (let x = 0; x < 1500; x += 4) {
        ctx.fillStyle = alpha(R((x + 2) / A0) >= 0 ? ca : cb, 0.4);
        ctx.fillRect(X(x), Y(f(x + 2)), X(x + 4) - X(x) + 0.5, Y(0) - Y(f(x + 2)));
      }
    });
    if (orb.from && orb.from !== key) fill(orb.from, 1 - orb.a(key));
    fill(key, orb.a(key));
    orb.curve(ctx, (k) => pOf(k), 0, 1500, X, Y, PAL.ink, 4, 400);
    o.nodes.forEach((r) => { const x = X(r * A0); line(ctx, x, box.t, x, box.b, PAL.ink, 2, [6, 6]); text(ctx, fmt(r * A0, 0) + ' pm', x + 10, box.t + 14, PAL.ink, { size: 19 }); });
    F.legend(ctx, ax, [{ s: 'ψ positive', kind: 'swatch', color: alpha(ca, 0.7) }, { s: 'ψ negative', kind: 'swatch', color: alpha(cb, 0.7) }, { s: 'radial node', color: PAL.ink, w: 2, dash: [6, 6] }], { corner: 'above', size: 19 });
    tex(d.readout, `\\text{radial nodes} = n - l - 1 = ${o.n} - ${o.l} - 1 = ${nodes}`);
  }
  still(d, draw);
})();

/* ---------- the real angular functions of s, p, d and f, of a unit direction (x, y, z) ---------- */
const SHAPES = {
  s: [{ v: 's', label: 's', f: () => 1 }],
  p: [{ v: 'px', label: 'p<sub>x</sub>', f: (x) => x }, { v: 'py', label: 'p<sub>y</sub>', f: (x, y) => y }, { v: 'pz', label: 'p<sub>z</sub>', f: (x, y, z) => z }],
  d: [{ v: 'dxy', label: 'd<sub>xy</sub>', f: (x, y) => x * y }, { v: 'dxz', label: 'd<sub>xz</sub>', f: (x, y, z) => x * z }, { v: 'dz2', label: 'd<sub>z²</sub>', f: (x, y, z) => 3 * z * z - 1 },
    { v: 'dyz', label: 'd<sub>yz</sub>', f: (x, y, z) => y * z }, { v: 'dx2y2', label: 'd<sub>x²−y²</sub>', f: (x, y) => x * x - y * y }],
  f: [{ v: 'fx', label: 'f<sub>x(x²−3y²)</sub>', f: (x, y) => x * (x * x - 3 * y * y) }, { v: 'fzx2y2', label: 'f<sub>z(x²−y²)</sub>', f: (x, y, z) => z * (x * x - y * y) }, { v: 'fxz2', label: 'f<sub>xz²</sub>', f: (x, y, z) => x * (5 * z * z - 1) },
    { v: 'fz3', label: 'f<sub>z³</sub>', f: (x, y, z) => z * (5 * z * z - 3) }, { v: 'fyz2', label: 'f<sub>yz²</sub>', f: (x, y, z) => y * (5 * z * z - 1) }, { v: 'fxyz', label: 'f<sub>xyz</sub>', f: (x, y, z) => x * y * z },
    { v: 'fy', label: 'f<sub>y(3x²−y²)</sub>', f: (x, y) => y * (3 * x * x - y * y) }],
};
const LOF = { s: 0, p: 1, d: 2, f: 3 };
const FIRST = { s: 's', p: 'pz', d: 'dxy', f: 'fz3' };
const byV = {}; Object.entries(SHAPES).forEach(([l, list]) => list.forEach((q) => { byV[q.v] = { ...q, l: LOF[l] }; }));

/* =====================================================================
   FIGURE 6.21: the shapes of the s, p, d and f orbitals. Mathematical 3D:
   one contour of |ψ| for the orbital's angular function Y with the radial
   factor (r/l)ˡ e^(l − r) of a hydrogen-like orbital, which closes into
   rounded lobes clear of the nucleus, as the book draws them. Along each
   direction the contour is met twice, so a lobe is an outer and an inner
   sheet joined at its rim. The lobes wear the two colours of the sign of
   ψ, about the x, y and z axes (z up, as the book's). Still: a new orbital
   bends out of the last one.
===================================================================== */
(function () {
  const d = sim('sim-orbital-shapes');
  const names = [];
  /* an axis name is hidden while its end of the axis is seen against the orbital or lies off the stage, so no name sits on a lobe */
  function clear() {
    const o = V.project([0, 0, 0], g), ppu = V.wrap.clientHeight / (2 * (10.6 / V.at.zoom) * Math.tan(Math.PI / 12));
    names.forEach(({ e, p }) => { const q = V.project(p, g); const off = q[0] < 10 || q[1] < 10 || q[0] > V.wrap.clientWidth - 10 || q[1] > V.wrap.clientHeight - 10; e.style.visibility = off || Math.hypot(q[0] - o[0], q[1] - o[1]) < 1.08 * RMAX * ppu ? 'hidden' : ''; });
  }
  const V = F.view3d(d.stage, { spin: 'idle', h: 560, dist: 10.6, tilt: 0.28, onRender: () => { if (names.length) clear(); } });
  V.setView(-0.6, 0.28);
  const g = V.part(0);
  const optsOf = (l) => SHAPES[l].map((q) => ({ value: q.v, label: q.label }));
  const sub = F.choice(d.controls, { label: '\\text{subshell}', options: ['s', 'p', 'd', 'f'].map((l) => ({ value: l, label: `<em>${l}</em>` })), value: 'p', aria: 'the subshell', ms: 0, onInput: (l) => { orb.options(optsOf(l), FIRST[l]); go(); } });
  const orb = F.choice(d.controls, { label: '\\text{orbital}', options: optsOf('p'), value: 'pz', aria: 'the orbital of the subshell', ms: 0, onInput: () => go() });
  let from = orb.value, to = from;
  const tw = F.tween(d, 1);
  function go() { const now = orb.value; if (now === to) return; from = to; to = now; tw.set(0); tw.to(1, 1000); }
  const T3 = window.THREE, live = !!(T3 && V.scene);
  const NT = 72, NP = 144, RMAX = 1.75, Q = 0.3;     /* the grid of directions, the reach of a lobe in the scene, the contour's level */
  const dirs = [];
  for (let i = 0; i <= NT; i++) for (let j = 0; j <= NP; j++) { const th = (Math.PI * i) / NT, ph = (TAU * j) / NP; dirs.push([Math.sin(th) * Math.cos(ph), Math.sin(th) * Math.sin(ph), Math.cos(th)]); }
  const norm = {};
  const valuesOf = (v) => { if (norm[v]) return norm[v]; const f = byV[v].f, a = dirs.map((q) => f(q[0], q[1], q[2])), m = Math.max(...a.map(Math.abs)); return (norm[v] = a.map((x) => x / m)); };
  /* the radial factor, 1 at its peak r = l, and the two distances at which it falls to t */
  const rad = (l, r) => (l > 1e-6 ? Math.exp(l * Math.log(r / l) + l - r) : Math.exp(-r));
  function outer(l, t) { let a = l, b = l + 30; for (let i = 0; i < 26; i++) { const m = (a + b) / 2; if (rad(l, m) > t) a = m; else b = m; } return (a + b) / 2; }
  function inner(l, t) { if (l < 1e-6) return 0; let a = 1e-9, b = l; for (let i = 0; i < 26; i++) { const m = (a + b) / 2; if (rad(l, m) < t) a = m; else b = m; } return (a + b) / 2; }
  let sheets = null, axesLines = [], nuc = null, sig = '';
  if (live) {
    const sheet = () => {
      const geo = new T3.BufferGeometry(), pos = new T3.Float32BufferAttribute(new Float32Array(dirs.length * 3), 3), col = new T3.Float32BufferAttribute(new Float32Array(dirs.length * 3), 3);
      geo.setAttribute('position', pos); geo.setAttribute('color', col);
      const mesh = new T3.Mesh(geo, new T3.MeshPhongMaterial({ vertexColors: true, side: T3.DoubleSide, shininess: 30 }));
      g.add(mesh); V.pickable(mesh, 'a lobe of the orbital'); return { geo, pos, col, mesh };
    };
    sheets = [sheet(), sheet()];
    /* the chemist's x, z, y are the scene's x, y, −z: z up and y away from the reader, as the book draws the axes */
    const L = 2.25;
    [[[L, 0, 0], 'x'], [[0, 0, -L], 'y'], [[0, L, 0], 'z']].forEach(([p, name]) => {
      axesLines.push(F.mesh.polyline(g, [p.map((c) => -c * 0.92), p], PAL.muted));
      const tip = p.map((c) => c * 1.12); names.push({ e: V.label(`<em>${name}</em>`, tip, g, 0, 'bare'), p: tip });
    });
    nuc = F.mesh.sphere(g, [0, 0, 0], 0.045, PAL.ink); V.pickable(nuc, 'the nucleus');
  }
  function shape() {
    const k = tw.v, A = valuesOf(from), B = valuesOf(to), l = (1 - k) * byV[from].l + k * byV[to].l;
    const tag = [from, to, k.toFixed(4), F.cat(0), F.cat(1), PAL.ink, PAL.muted].join('|'); if (tag === sig) return; sig = tag;
    const ca = new T3.Color(F.cat(0)), cb = new T3.Color(F.cat(1)), sc = RMAX / outer(l, Q), n = dirs.length, on = new Uint8Array(n);
    const [out, inn] = sheets;
    for (let i = 0; i < n; i++) {
      const s = (1 - k) * A[i] + k * B[i], a = Math.abs(s), q = dirs[i], c = s >= 0 ? ca : cb;
      on[i] = a >= Q ? 1 : 0;
      const ro = (on[i] ? outer(l, Q / a) : l) * sc, ri = (on[i] ? inner(l, Q / a) : l) * sc;
      out.pos.setXYZ(i, q[0] * ro, q[2] * ro, -q[1] * ro); inn.pos.setXYZ(i, q[0] * ri, q[2] * ri, -q[1] * ri);
      out.col.setXYZ(i, c.r, c.g, c.b); inn.col.setXYZ(i, c.r, c.g, c.b);
    }
    /* a cell of the grid is drawn where the contour reaches any of its corners; elsewhere there is no surface */
    const idx = [];
    for (let i = 0; i < NT; i++) for (let j = 0; j < NP; j++) {
      const a = i * (NP + 1) + j, b = a + NP + 1;
      if (on[a] || on[b] || on[a + 1]) idx.push(a, b, a + 1);
      if (on[b] || on[b + 1] || on[a + 1]) idx.push(b, b + 1, a + 1);
    }
    sheets.forEach((sh) => { sh.geo.setIndex(idx); sh.pos.needsUpdate = true; sh.col.needsUpdate = true; sh.geo.computeVertexNormals(); sh.geo.computeBoundingSphere(); });
    inn.mesh.visible = l > 1e-6;
    axesLines.forEach((ln) => ln.material.color.set(PAL.muted)); nuc.material.color.set(PAL.ink);
    V.invalidate();
  }
  function draw() {
    if (live) shape();
    const l = LOF[sub.value], ml = []; for (let m = -l; m <= l; m++) ml.push(m > 0 ? '+' + m : String(m));
    tex(d.readout, `2l + 1 = 2(${l}) + 1 = ${2 * l + 1}\\ \\text{orbital${l ? 's' : ''}} \\\\ m_{l} = ${ml.join(',\\ ')}`);
  }
  still(d, draw);
})();

/* =====================================================================
   FIGURE 6.22: the energies of the orbitals. The multi-electron atom is
   the book's chart; hydrogen puts every orbital of a shell at one energy,
   E ∝ −1/n². Still: a change of atom slides the orbitals to their heights.
===================================================================== */
(function () {
  const d = sim('sim-subshell-energies', 440);
  const atom = F.choice(d.controls, { label: '\\text{atom}', options: [{ value: 'many', label: 'multi-electron atom' }, { value: 'H', label: 'hydrogen' }], value: 'many', aria: 'the atom whose orbital energies are drawn' });
  /* heights from 0 (1s) to 1 (4p): the book's chart, and hydrogen's (1 − 1/n²)/(1 − 1/16) */
  const SUBS = [['1s', 1, 1, 0], ['2s', 2, 1, 0.433], ['2p', 2, 3, 0.488], ['3s', 3, 1, 0.788], ['3p', 3, 3, 0.843], ['3d', 3, 5, 0.981], ['4s', 4, 1, 0.943], ['4p', 4, 3, 1]]
    .map(([name, n, count, many]) => ({ name, n, count, many, H: (1 - 1 / (n * n)) / (1 - 1 / 16) }));
  const W = 44, GAP = 10, SEP = 40, BOT = 380, TOP = 108;
  let x = 140; SUBS.forEach((s) => { s.x = x; x += s.count * W + (s.count - 1) * GAP + SEP; });
  const span = x - SEP - 140, off = (1340 - 140 - span) / 2;
  SUBS.forEach((s) => { s.x += off; });
  function draw() {
    const { ctx } = begin(d.c), ce = C('energy');
    topline(ctx, atom.value === 'H'
      ? 'In a hydrogen atom, every orbital of a shell has the same energy.'
      : 'In a multi-electron atom, the subshells of a shell differ in energy.');
    arrow(ctx, 90, BOT + 14, 90, TOP - 36, ce, 3);
    text(ctx, 'E', 60, (BOT + TOP) / 2, ce, { size: 26, weight: 600, italic: true, align: 'center' });
    SUBS.forEach((s) => {
      const h = atom.mix((a) => (a === 'H' ? s.H : s.many)), y = BOT - h * (BOT - TOP);
      for (let i = 0; i < s.count; i++) { const x0 = s.x + i * (W + GAP); line(ctx, x0, y, x0 + W, y, ce, 5); }
      const mid = s.x + (s.count * W + (s.count - 1) * GAP) / 2;
      text(ctx, s.name, mid, y + 26, PAL.ink, { size: 21, align: 'center' });
    });
    const E = (s) => `\\kE_{${s}}`;
    tex(d.readout, atom.value === 'H'
      ? `${E('1s')} < ${E('2s')} = ${E('2p')} < ${E('3s')} = ${E('3p')} = ${E('3d')} < ${E('4s')} = ${E('4p')}`
      : `${E('1s')} < ${E('2s')} < ${E('2p')} < ${E('3s')} < ${E('3p')} < ${E('4s')} < ${E('3d')} < ${E('4p')}`);
  }
  still(d, draw);
})();
};
