/* Figures for section 6.3 Development of Quantum Theory. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['6.3'] = function (root, F) {
const { el, fmt, tex, C, PAL, alpha, ctl, cycle, register, begin, line, arrow, dot, text, topline, axes, curve, hbracket } = F;
const sim = (id, H) => F.sim(root, id, H);
const still = (d, draw) => register(d.fig, { update: () => {}, draw });
function readout(host, main, small) { tex(host, main); if (small) host.appendChild(el('small', null, small)); }

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
   when a whole number of wavelengths fits 2πr; the same wave is laid out
   straight on the right, one circumference long, so the reader sees where
   it arrives back at its start.
===================================================================== */
(function () {
  const d = sim('sim-orbit-wave', 440);
  const R_PM = 100, CIRC = TAU * R_PM;                 /* the orbit's radius and circumference, pm */
  const specials = [1, 2, 3, 4, 5, 6].map((n) => ({ at: CIRC / n, label: 'n = ' + n }));
  const lam = ctl(d.controls, { label: '\\klam', cls: 'wavelength', min: 90, max: 660, step: 0.1, value: +(CIRC / 6).toFixed(1), unit: 'pm', dec: 1, aria: 'the wavelength of the electron wave', specials });
  const CX = 300, CY = 250, R = 138, AMP = 16;
  /* the unrolled orbit: one circumference, 0 to 628.3 pm, laid along x from SX0 to SX1 */
  const SX0 = 660, SX1 = 1320, SY = 250, SAMP = 46;
  function draw() {
    const { ctx } = begin(d.c), L = lam.v, n = CIRC / L, whole = Math.abs(n - Math.round(n)) < 0.004, cw = C('wavelength'), cr = C('length'), co = F.ref('orbit');
    const k = Math.round(n);
    topline(ctx, whole
      ? `${cap(WORDS[k] ?? String(k))} wavelength${k > 1 ? 's' : ''} of ${fmt(L, 1)} pm fit the ${fmt(CIRC, 1)} pm orbit exactly, so the wave closes on itself.`
      : `The ${fmt(CIRC, 1)} pm orbit holds ${fmt(n, 2)} wavelengths of ${fmt(L, 1)} pm, which is not a whole number, so the wave does not close on itself.`);
    /* the orbit and the nucleus */
    ctx.save(); ctx.setLineDash([10, 10]); ctx.strokeStyle = co; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(CX, CY, R, 0, TAU); ctx.stroke(); ctx.restore();
    dot(ctx, CX, CY, PAL.ink, true, 9);
    arrow(ctx, CX, CY, CX + R * Math.cos(-2.3), CY + R * Math.sin(-2.3), cr, 3);
    text(ctx, 'radius r = 100 pm', CX, CY + R + 40, cr, { size: 19, align: 'center' });
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
    /* the orbit unrolled */
    const X = (s) => SX0 + ((SX1 - SX0) * s) / CIRC;
    line(ctx, SX0, SY, SX1, SY, co, 2, [10, 10]);
    [SX0, SX1].forEach((x) => line(ctx, x, SY - SAMP - 18, x, SY + SAMP + 18, PAL.muted, 2));
    text(ctx, 'start', SX0, SY + SAMP + 38, PAL.muted, { size: 17, align: 'center' });
    text(ctx, 'once around, 628.3 pm', SX1, SY + SAMP + 38, cr, { size: 17, align: 'right' });
    text(ctx, 'The orbit unrolled', (SX0 + SX1) / 2, SY + SAMP + 76, co, { size: 20, weight: 600, align: 'center' });
    ctx.save(); ctx.strokeStyle = cw; ctx.lineWidth = 5; ctx.beginPath();
    for (let i = 0; i <= 400; i++) { const s = (CIRC * i) / 400, x = X(s), y = SY - SAMP * Math.sin((TAU * s) / L); if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y); }
    ctx.stroke(); ctx.restore();
    /* where the wave must be to join its own start, and where it is */
    const yEnd = SY - SAMP * Math.sin((TAU * CIRC) / L);
    dot(ctx, SX0, SY, cw, true, 9); dot(ctx, SX1, SY, cw, false, 11);
    if (!whole) dot(ctx, SX1, yEnd, cw, true, 9);
    if (L <= CIRC) hbracket(ctx, X(0), X(L), SY - SAMP - 16, cw, 'λ = ' + fmt(L, 1) + ' pm', { side: 'above' });
    readout(d.readout, `2\\pi \\kr = n\\klam:\\quad ${fmt(CIRC, 1)}\\ \\text{pm} = ${fmt(n, 2)}\\times ${fmt(L, 1)}\\ \\text{pm}`,
      whole ? 'n is a whole number, so this wavelength gives an allowed standing wave.' : 'n must be a whole number for the electron wave to stand in the orbit.');
  }
  still(d, draw);
})();

/* =====================================================================
   FIGURE 6.18: electrons through two slits, one at a time. Moving: the
   clock is the number of electrons recorded, and the pattern emerges from
   it. The speed slider sets the de Broglie wavelength, and the spacing of
   the bands is drawn in proportion to it; the geometry is schematic.
===================================================================== */
(function () {
  const d = sim('sim-double-slit', 460);
  const v = ctl(d.controls, { label: '\\kv', cls: 'velocity', min: 2, max: 10, step: 0.1, value: 10, unit: '× 10⁶ m/s', dec: 1, aria: 'the speed of the electrons', onInput: () => { sample(); cy.reset(); } });
  const T = 7, NMAX = 2400;
  const cy = cycle(() => T, 2.5);
  const SCR = { l: 660, r: 810, t: 86, b: 406 }, YC = (SCR.t + SCR.b) / 2;
  const HB = { l: 880, r: 1320 }, NB = 64, BH = (SCR.b - SCR.t) / NB;
  const spacing = () => 36 * (10 / v.v);             /* canvas units between bands, in proportion to λ */
  const prob = (y) => { const u = y - YC, c = Math.cos((Math.PI * u) / spacing()); return c * c * Math.exp(-((u / 118) ** 2)); };
  /* one fixed stream of random numbers, so the same electrons arrive every time the clock runs */
  function rng(seed) { let a = seed >>> 0; return () => { a = (a + 0x6d2b79f5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  let hits = [], expect = [];
  function sample() {
    const r = rng(6318); hits = [];
    while (hits.length < NMAX) { const y = SCR.t + r() * (SCR.b - SCR.t), x = SCR.l + 6 + r() * (SCR.r - SCR.l - 12); if (r() < prob(y)) hits.push([x, y]); }
    let tot = 0; expect = Array.from({ length: NB }, (_, i) => { const p = prob(SCR.t + (i + 0.5) * BH); tot += p; return p; });
    expect = expect.map((p) => p / tot);
  }
  sample();
  const count = (t) => Math.min(NMAX, Math.floor(NMAX * Math.pow(t / T, 2.4)));
  F.hover(d.stage, () => [{ x: 110, y: 250, r: 50, name: 'the electron source' }, { x: 380, y: 150, r: 30, name: 'the barrier with two slits' }, { x: 580, y: 250, r: 20, name: 'the screen, seen edge on' }]);
  function draw() {
    const { ctx } = begin(d.c), t = cy.now(), N = count(t), ce = F.el('e-'), cs = F.ref('source'), cb = F.ref('barrier'), cn = F.ref('screen');
    topline(ctx, N === 0 ? 'No electrons have arrived yet.' : `${N} electron${N === 1 ? ' has' : 's have'} arrived. ` + (N < 40 ? 'So far they seem to land at random.' : N < 500 ? 'Bands are beginning to show where more of them land.' : 'Together they draw the interference pattern of a wave.'));
    /* the source, the barrier and the screen edge on */
    ctx.save(); ctx.strokeStyle = cs; ctx.lineWidth = 3; ctx.fillStyle = alpha(cs, 0.18); ctx.beginPath(); ctx.rect(70, 220, 80, 60); ctx.fill(); ctx.stroke(); ctx.restore();
    text(ctx, 'electron source', 110, 306, cs, { size: 19, align: 'center' });
    const slits = [YC - 22, YC + 22];
    line(ctx, 380, SCR.t, 380, slits[0] - 6, cb, 10); line(ctx, 380, slits[0] + 6, 380, slits[1] - 6, cb, 10); line(ctx, 380, slits[1] + 6, 380, SCR.b, cb, 10);
    text(ctx, 'two slits', 380, SCR.b + 24, cb, { size: 19, align: 'center' });
    line(ctx, 580, SCR.t, 580, SCR.b, cn, 5);
    text(ctx, 'screen', 580, SCR.b + 24, cn, { size: 19, align: 'center' });
    arrow(ctx, 160, 250, 360, 250, alpha(PAL.ink, 0.4), 3);
    /* the screen face on, with every electron recorded so far */
    ctx.save(); ctx.fillStyle = PAL.soft; ctx.strokeStyle = cn; ctx.lineWidth = 3; ctx.fillRect(SCR.l, SCR.t, SCR.r - SCR.l, SCR.b - SCR.t); ctx.strokeRect(SCR.l, SCR.t, SCR.r - SCR.l, SCR.b - SCR.t); ctx.restore();
    text(ctx, 'the screen, face on', (SCR.l + SCR.r) / 2, SCR.b + 24, cn, { size: 19, align: 'center' });
    ctx.save(); ctx.fillStyle = ce;
    for (let i = 0; i < N; i++) { ctx.beginPath(); ctx.arc(hits[i][0], hits[i][1], 2.6, 0, TAU); ctx.fill(); }
    ctx.restore();
    /* the newest arrival flashes as it lands */
    if (N > 0 && N < NMAX && N < 200) { const h = hits[N - 1]; dot(ctx, h[0], h[1], ce, false, 11); }
    /* the counts along the screen, and the curve they approach */
    const bins = new Array(NB).fill(0);
    for (let i = 0; i < N; i++) bins[Math.min(NB - 1, Math.floor((hits[i][1] - SCR.t) / BH))]++;
    const top = Math.max(Math.max(...expect) * Math.max(N, 1), ...bins), scale = (HB.r - HB.l) / (top * 1.1 || 1);
    line(ctx, HB.l, SCR.t, HB.l, SCR.b, PAL.ink, 2.5);
    ctx.save(); ctx.fillStyle = alpha(ce, 0.45);
    bins.forEach((b, i) => { if (b) ctx.fillRect(HB.l, SCR.t + i * BH + 0.5, b * scale, BH - 1); });
    ctx.restore();
    if (N >= 20) {
      ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.beginPath();
      expect.forEach((p, i) => { const x = HB.l + p * N * scale, y = SCR.t + (i + 0.5) * BH; if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y); });
      ctx.stroke(); ctx.restore();
      text(ctx, '|ψ|²', HB.r, SCR.t + 10, PAL.ink, { size: 22, weight: 600, align: 'right' });
    }
    text(ctx, 'electrons counted at each height', (HB.l + HB.r) / 2, SCR.b + 24, PAL.ink, { size: 19, align: 'center' });
    const lam = HP / (ME * v.v * 1e6);
    readout(d.readout, `\\klam = \\frac{h}{\\km \\kv} = \\frac{6.626\\times10^{-34}\\ \\text{kg m}^{2}\\text{/s}}{(9.109\\times10^{-31}\\ \\text{kg})(${fmt(v.v, 1)}\\times10^{6}\\ \\text{m/s})} = ${sciT(lam, 2)}\\ \\text{m}`,
      'The bands on the screen are spaced in proportion to this wavelength.');
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();

/* =====================================================================
   SIM: the de Broglie wavelength of an electron, a proton and a softball
   on one logarithmic scale of lengths, beside an atom and a nucleus.
   Still: it answers its choice and its slider.
===================================================================== */
(function () {
  const d = sim('sim-de-broglie', 360);
  const P = {
    e: { name: 'electron', m: ME, range: { min: 0.1, max: 10, step: 0.01, value: 10, unit: '× 10⁶ m/s', dec: 2 }, k: 1e6 },
    p: { name: 'proton', m: MP, range: { min: 0.1, max: 10, step: 0.01, value: 10, unit: '× 10⁶ m/s', dec: 2 }, k: 1e6 },
    ball: { name: 'softball', m: 0.100, range: { min: 1, max: 50, step: 0.5, value: 35, unit: 'm/s', dec: 1 }, k: 1 },
  };
  const who = F.choice(d.controls, { label: '\\text{particle}', options: [{ value: 'e', label: 'electron' }, { value: 'p', label: 'proton' }, { value: 'ball', label: 'softball' }], value: 'e', aria: 'the moving particle', onInput: (x) => v.range(P[x].range) });
  const v = ctl(d.controls, { label: '\\kv', cls: 'velocity', ...P.e.range, aria: 'the speed of the particle' });
  const LO = -36, HI = -6, AX = { l: 90, r: 1310, y: 270 };
  const X = (lg) => AX.l + ((lg - LO) / (HI - LO)) * (AX.r - AX.l);
  const REFS = [{ lg: -10, name: 'an atom, about 10⁻¹⁰ m' }, { lg: -14.5, name: 'a nucleus, about 10⁻¹⁵ to 10⁻¹⁴ m' }];
  function draw() {
    const { ctx } = begin(d.c), q = P[who.value], vel = v.v * q.k, lam = HP / (q.m * vel), lg = Math.log10(lam), cw = C('wavelength'), cr = C('length');
    const vs = q.k === 1 ? fmt(vel, 1) + ' m/s' : sciU(vel, 2) + ' m/s';
    const r = lam / 1e-10;
    const cmp = r > 3 ? `about ${fmt(r, 0)} times the size of an atom` : r > 0.3 ? 'about the size of an atom' : `about ${sciU(1 / r, 1)} times smaller than an atom`;
    topline(ctx, `${q.name === 'electron' ? 'An' : 'A'} ${q.name} moving at ${vs} has a de Broglie wavelength of ${sciU(lam, 2)} m, ${cmp}.`);
    line(ctx, AX.l, AX.y, AX.r, AX.y, cw, 3);
    for (let e = -35; e <= -5; e += 5) { if (e > HI) break; line(ctx, X(e), AX.y, X(e), AX.y + 10, cw, 2); text(ctx, '10' + sup(e), X(e), AX.y + 32, cw, { size: 17, align: 'center' }); }
    for (let e = LO; e <= HI; e++) line(ctx, X(e), AX.y, X(e), AX.y + 5, cw, 1.5);
    text(ctx, 'wavelength (m)', AX.r, AX.y + 66, cw, { size: 20, weight: 600, align: 'right' });
    REFS.forEach((f, i) => { const x = X(f.lg); line(ctx, x, AX.y - 8, x, AX.y - 108 - 30 * i, cr, 2, [4, 8]); text(ctx, f.name, x, AX.y - 120 - 30 * i, cr, { size: 18, align: 'center' }); });
    const x = X(Math.max(LO, Math.min(HI, lg)));
    arrow(ctx, x, AX.y - 60, x, AX.y - 6, cw, 4); dot(ctx, x, AX.y, cw, true, 9);
    F.label(ctx, `λ of the ${q.name}`, x, AX.y - 60, { side: 'above', color: cw, size: 20 });
    readout(d.readout, `\\klam = \\frac{h}{\\km \\kv} = \\frac{6.626\\times10^{-34}\\ \\text{kg m}^{2}\\text{/s}}{(${sciT(q.m, 3)}\\ \\text{kg})(${q.k === 1 ? fmt(vel, 1) : sciT(vel, 2)}\\ \\text{m/s})} = ${sciT(lam, 2)}\\ \\text{m}`,
      'The wavelength is inversely proportional to both the mass and the speed.');
  }
  still(d, draw);
})();

/* =====================================================================
   FIGURE 6.19: shells about a nucleus, faithful. The arrow of increasing
   energy is the one quantity drawn, in the energy hue.
===================================================================== */
(function () {
  const d = sim('fig-shells', 380);
  const CX = 560, CY = 190, RS = [82, 128, 174];
  F.hover(d.stage, () => [{ x: CX, y: CY, r: 36, name: 'the nucleus' }]);
  function draw() {
    const { ctx } = begin(d.c), ce = C('energy');
    RS.forEach((r) => { ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(CX, CY, r, 0, TAU); ctx.stroke(); ctx.restore(); });
    ctx.save(); ctx.fillStyle = PAL.soft; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(CX, CY, 34, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore();
    text(ctx, '+', CX, CY, PAL.ink, { size: 30, weight: 600, align: 'center' });
    text(ctx, 'nucleus', CX - 34, CY + 60, PAL.ink, { size: 18, align: 'center', bg: PAL.panel });
    RS.forEach((r, i) => { const a = -2.2; text(ctx, 'n = ' + (i + 1), CX + r * Math.cos(a), CY + r * Math.sin(a), PAL.ink, { size: 19, weight: 600, align: 'center', bg: PAL.panel }); });
    arrow(ctx, CX + 36, CY, CX + 290, CY, ce, 4);
    text(ctx, 'increasing energy', CX + 300, CY, ce, { size: 20, weight: 600 });
    readout(d.readout, 'n = 1,\\ 2,\\ 3,\\ \\ldots', 'The farther a shell lies from the nucleus, the higher the energy of its electrons.');
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
/* the angular part along the z axis for each l: 1, cos θ, 3cos²θ − 1 */
const ANG = [() => 1, (c) => c, (c) => 3 * c * c - 1];
const ANGMAX = [1, 1, 2];

/* =====================================================================
   FIGURE 6.20: an s orbital as a cutaway cloud above its radial graph,
   extended to 2p, 3p and 3d so that n − l − 1 is seen in general.
   Mathematical 3D: a cloud of points sampled from |ψ|², coloured by the
   sign of ψ, with free orbit and an idle spin; the graph is flat beneath.
   Still: a change of orbital crossfades the clouds and the graph.
===================================================================== */
(function () {
  const d = sim('sim-radial');
  const V = F.view3d(d.stage, { spin: 'idle', views: [{ label: 'side', yaw: 0.6, pitch: 0.22 }, { label: 'above', yaw: 0.6, pitch: 1.4 }], h: 380, dist: 15, tilt: 0.22 });
  const g = V.part(0), c2 = F.makeCanvas(d.stage, 330);
  const KEYS = ['1s', '2s', '3s', '2p', '3p', '3d'];
  const orb = F.choice(d.controls, { label: '\\text{orbital}', options: KEYS.map((k) => ({ value: k, label: k.replace(/([spd])$/, '<em>$1</em>') })), value: '1s', aria: 'the orbital drawn' });
  const U = 0.2;                                     /* scene units per Bohr radius */
  const T3 = window.THREE;
  const clouds = {};
  let painted = '';
  function cloud(key) {
    if (clouds[key] || !T3 || !V.scene) return clouds[key];
    const o = RADIAL[key], pr = (r) => r * r * o.R(r) ** 2;
    let pmax = 0; for (let r = 0; r < 30; r += 0.02) pmax = Math.max(pmax, pr(r));
    let seed = 20 + key.charCodeAt(0) * 7 + key.charCodeAt(1);
    const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
    const pos = [], sgn = [];
    while (pos.length < 3 * 6500) {
      const r = rnd() * 28; if (rnd() * pmax > pr(r)) continue;
      const z = 2 * rnd() - 1, ph = TAU * rnd(), s = Math.sqrt(1 - z * z);
      const a = ANG[o.l](z); if (rnd() * ANGMAX[o.l] ** 2 > a * a) continue;
      const x = s * Math.cos(ph), y = s * Math.sin(ph);
      /* the chemist's z is the scene's up; the wedge toward the viewer is cut away */
      const P = [y * r * U, z * r * U, x * r * U];
      if (P[0] > 0 && P[2] > 0) continue;
      pos.push(...P); sgn.push(o.R(r) * a >= 0 ? 1 : -1);
    }
    const geo = new T3.BufferGeometry();
    geo.setAttribute('position', new T3.Float32BufferAttribute(pos, 3));
    geo.setAttribute('color', new T3.Float32BufferAttribute(new Array(pos.length).fill(0), 3));
    const pts = new T3.Points(geo, new T3.PointsMaterial({ size: 0.045, vertexColors: true, transparent: true, opacity: 1, depthWrite: false }));
    const grp = new T3.Group(); grp.add(pts); g.add(grp);
    clouds[key] = { grp, geo, sgn, paint: '' };
    return clouds[key];
  }
  function paint(cl) {
    const a = F.cat(0), b = F.cat(1), tag = a + b; if (cl.paint === tag) return;
    const ca = new T3.Color(a), cb = new T3.Color(b), col = cl.geo.getAttribute('color');
    cl.sgn.forEach((s, i) => { const c = s > 0 ? ca : cb; col.setXYZ(i, c.r, c.g, c.b); });
    col.needsUpdate = true; cl.paint = tag;
  }
  if (T3 && V.scene) V.pickable(F.mesh.sphere(g, [0, 0, 0], 0.05, PAL.ink), 'the nucleus');
  const pOf = (key) => (x) => { const r = x / A0, o = RADIAL[key]; return (r * r * o.R(r) ** 2); };
  function draw() {
    const key = orb.value, o = RADIAL[key];
    KEYS.forEach((k) => { const a = k === key || k === orb.from ? orb.a(k) : 0; if (a > 0) cloud(k); if (clouds[k]) { paint(clouds[k]); F.fade3(clouds[k].grp, a); } });
    V.invalidate();
    const { ctx } = begin(c2), nodes = o.n - o.l - 1;
    topline(ctx, `The ${key} orbital has n − l − 1 = ${o.n} − ${o.l} − 1 = ${nodes} radial node${nodes === 1 ? '' : 's'}` + (nodes ? ', at ' + o.nodes.map((r) => fmt(r * A0, 0) + ' pm').join(' and ') + ' from the nucleus.' : ', so its probability never falls to zero between the nucleus and the outside.'));
    const box = { l: 150, r: 1300, t: 120, b: 262 };
    const { X, Y } = axes(ctx, box, [0, 1000], [0, 0.6], { xl: 'distance from nucleus (pm)', xc: C('length'), yl: 'probability density', nx: 5, ny: 3, fy: () => '' });
    /* the area under the curve in the colour of the sign of ψ there */
    const fill = (k, a) => F.faded(ctx, a, [0, 0], () => {
      const R = RADIAL[k].R, f = pOf(k);
      for (let x = 0; x < 1000; x += 4) {
        ctx.fillStyle = alpha(R((x + 2) / A0) >= 0 ? F.cat(0) : F.cat(1), 0.3);
        ctx.fillRect(X(x), Y(Math.min(0.6, f(x + 2))), X(x + 4) - X(x) + 0.5, Y(0) - Y(Math.min(0.6, f(x + 2))));
      }
    });
    if (orb.from && orb.from !== key) fill(orb.from, 1 - orb.a(key));
    fill(key, orb.a(key));
    orb.curve(ctx, (k) => pOf(k), 0, 1000, X, Y, PAL.ink, 4, 240);
    o.nodes.forEach((r) => { const x = X(r * A0); line(ctx, x, box.t, x, box.b, PAL.muted, 2, [4, 8]); text(ctx, 'node', x + 8, box.t + 14, PAL.muted, { size: 17 }); });
    readout(d.readout, `n - l - 1 = ${o.n} - ${o.l} - 1 = ${nodes}`, 'At a radial node ψ is zero, and on either side of it ψ has opposite signs, drawn in the two colors.');
  }
  still(d, draw);
})();

/* ---------- the real angular functions of s, p, d and f, of a unit direction (x, y, z) ---------- */
const SHAPES = {
  s: [{ v: 's', label: 's', f: () => 1 }],
  p: [{ v: 'px', label: 'p<sub>x</sub>', f: (x) => x }, { v: 'py', label: 'p<sub>y</sub>', f: (x, y) => y }, { v: 'pz', label: 'p<sub>z</sub>', f: (x, y, z) => z }],
  d: [{ v: 'dxy', label: 'd<sub>xy</sub>', f: (x, y) => x * y }, { v: 'dxz', label: 'd<sub>xz</sub>', f: (x, y, z) => x * z }, { v: 'dyz', label: 'd<sub>yz</sub>', f: (x, y, z) => y * z },
    { v: 'dx2y2', label: 'd<sub>x²−y²</sub>', f: (x, y) => x * x - y * y }, { v: 'dz2', label: 'd<sub>z²</sub>', f: (x, y, z) => 3 * z * z - 1 }],
  f: [{ v: 'fz3', label: 'f<sub>z³</sub>', f: (x, y, z) => z * (5 * z * z - 3) }, { v: 'fxz2', label: 'f<sub>xz²</sub>', f: (x, y, z) => x * (5 * z * z - 1) }, { v: 'fyz2', label: 'f<sub>yz²</sub>', f: (x, y, z) => y * (5 * z * z - 1) },
    { v: 'fxyz', label: 'f<sub>xyz</sub>', f: (x, y, z) => x * y * z }, { v: 'fzx2y2', label: 'f<sub>z(x²−y²)</sub>', f: (x, y, z) => z * (x * x - y * y) },
    { v: 'fx', label: 'f<sub>x(x²−3y²)</sub>', f: (x, y) => x * (x * x - 3 * y * y) }, { v: 'fy', label: 'f<sub>y(3x²−y²)</sub>', f: (x, y) => y * (3 * x * x - y * y) }],
};
const LOF = { s: 0, p: 1, d: 2, f: 3 };
const byV = {}; Object.values(SHAPES).flat().forEach((q) => { byV[q.v] = q; });

/* =====================================================================
   FIGURE 6.21: the shapes of the s, p, d and f orbitals. Mathematical 3D:
   the surface r = |f(θ, φ)| of the orbital's angular part, its lobes in the
   two colours of the sign of ψ, about the x, y and z axes. Still: a new
   orbital bends out of the last one.
===================================================================== */
(function () {
  const d = sim('sim-orbital-shapes');
  const V = F.view3d(d.stage, { spin: 'idle', views: [{ label: 'along x', yaw: 0, pitch: 0 }, { label: 'along y', yaw: -Math.PI / 2, pitch: 0 }, { label: 'along z', yaw: 0, pitch: Math.PI / 2 }], h: 420, dist: 8, tilt: 0.35 });
  const g = V.part(0);
  const sub = F.choice(d.controls, { label: '\\text{subshell}', options: [{ value: 's', label: 's (<em>l</em> = 0)' }, { value: 'p', label: 'p (<em>l</em> = 1)' }, { value: 'd', label: 'd (<em>l</em> = 2)' }, { value: 'f', label: 'f (<em>l</em> = 3)' }], value: 'p', aria: 'the subshell', onInput: () => { rows(); go(); } });
  const pick = {}, box = {};
  ['p', 'd', 'f'].forEach((l) => {
    const o = { label: '\\text{orbital}', options: SHAPES[l].map((q) => ({ value: q.v, label: l === 'f' ? q.label.replace(/<\/?sub>/g, '') : q.label })), value: SHAPES[l][l === 'p' ? 2 : 0].v, aria: 'the orbital of the ' + l + ' subshell', ms: 0, onInput: () => go() };
    pick[l] = l === 'f' ? F.select(d.controls, o) : F.choice(d.controls, o);
    box[l] = d.controls.lastElementChild;
  });
  function rows() { ['p', 'd', 'f'].forEach((l) => { box[l].style.display = l === sub.value ? '' : 'none'; }); }
  rows();
  const cur = () => (sub.value === 's' ? 's' : pick[sub.value].value);
  let from = cur(), to = from;
  const tw = F.tween(d, 1);
  function go() { const now = cur(); if (now === to) return; from = to; to = now; tw.set(0); tw.to(1, 1000); }
  const T3 = window.THREE;
  const NT = 72, NP = 144, RMAX = 1.7;
  /* unit directions on a θ, φ grid, in the chemist's axes; the scene's axes are (y, z, x) of these */
  const dirs = [];
  for (let i = 0; i <= NT; i++) for (let j = 0; j <= NP; j++) { const th = (Math.PI * i) / NT, ph = (TAU * j) / NP; dirs.push([Math.sin(th) * Math.cos(ph), Math.sin(th) * Math.sin(ph), Math.cos(th)]); }
  const norm = {};
  const valuesOf = (v) => { if (norm[v]) return norm[v]; const f = byV[v].f, a = dirs.map((q) => f(q[0], q[1], q[2])), m = Math.max(...a.map(Math.abs)); return (norm[v] = a.map((x) => x / m)); };
  let mesh = null, pos = null, col = null;
  if (T3 && V.scene) {
    const geo = new T3.BufferGeometry(), idx = [];
    for (let i = 0; i < NT; i++) for (let j = 0; j < NP; j++) { const a = i * (NP + 1) + j, b = a + NP + 1; idx.push(a, b, a + 1, b, b + 1, a + 1); }
    pos = new T3.Float32BufferAttribute(new Float32Array(dirs.length * 3), 3); col = new T3.Float32BufferAttribute(new Float32Array(dirs.length * 3), 3);
    geo.setAttribute('position', pos); geo.setAttribute('color', col); geo.setIndex(idx);
    mesh = new T3.Mesh(geo, new T3.MeshPhongMaterial({ vertexColors: true, side: T3.DoubleSide, shininess: 30 }));
    g.add(mesh); V.pickable(mesh, 'a lobe of the orbital');
    const L = 2.3;
    [[[0, 0, L], 'x'], [[L, 0, 0], 'y'], [[0, L, 0], 'z']].forEach(([p, name]) => {
      F.mesh.polyline(g, [p.map((c) => -c), p], PAL.muted);
      V.label(name, p.map((c) => c * 1.07), g, 0);
    });
    V.pickable(F.mesh.sphere(g, [0, 0, 0], 0.05, PAL.ink), 'the nucleus');
  }
  function draw() {
    const k = tw.v, A = valuesOf(from), B = valuesOf(to);
    if (mesh) {
      const ca = new T3.Color(F.cat(0)), cb = new T3.Color(F.cat(1));
      dirs.forEach((q, i) => {
        const s = (1 - k) * A[i] + k * B[i], r = Math.abs(s) * RMAX, c = s >= 0 ? ca : cb;
        pos.setXYZ(i, q[1] * r, q[2] * r, q[0] * r); col.setXYZ(i, c.r, c.g, c.b);
      });
      pos.needsUpdate = true; col.needsUpdate = true; mesh.geometry.computeVertexNormals(); mesh.geometry.computeBoundingSphere();
      V.invalidate();
    }
    const l = LOF[sub.value], name = byV[to].label;
    readout(d.readout, `l = ${l}:\\quad 2l + 1 = 2(${l}) + 1 = ${2 * l + 1}\\ \\text{orbital${l ? 's' : ''}}`,
      l ? `The ${sub.value} subshell has ${WORDS[2 * l + 1]} orbitals, one for each value of mₗ from −${l} to +${l}; they differ in their orientation in space.` : 'The s subshell has one orbital, a sphere, so it has no orientation to choose.');
    V.headline(l ? `The <em>${name}</em> orbital, one of the ${WORDS[2 * l + 1]} <em>${sub.value}</em> orbitals` : 'The <em>s</em> orbital is a sphere');
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
  const W = 52, GAP = 14, SEP = 40, BOT = 386, TOP = 112;
  let x = 140; SUBS.forEach((s) => { s.x = x; x += s.count * W + (s.count - 1) * GAP + SEP; });
  const span = x - SEP - 140, off = (1340 - 140 - span) / 2;
  SUBS.forEach((s) => { s.x += off; });
  function draw() {
    const { ctx } = begin(d.c), ce = C('energy');
    topline(ctx, atom.value === 'H'
      ? 'In a hydrogen atom the energy depends on n alone, so 2s and 2p are degenerate, and so are 3s, 3p and 3d.'
      : 'In a multi-electron atom the subshells of one shell have different energies; only the orbitals of one subshell are degenerate.');
    arrow(ctx, 90, BOT + 10, 90, TOP - 40, ce, 3);
    text(ctx, 'E', 62, (BOT + TOP) / 2, ce, { size: 24, weight: 600, italic: true, align: 'center' });
    SUBS.forEach((s) => {
      const h = atom.mix((a) => (a === 'H' ? s.H : s.many)), y = BOT - h * (BOT - TOP);
      for (let i = 0; i < s.count; i++) { const x0 = s.x + i * (W + GAP); line(ctx, x0, y, x0 + W, y, ce, 5); }
      const mid = s.x + (s.count * W + (s.count - 1) * GAP) / 2;
      text(ctx, s.name, mid, y + 24, PAL.ink, { size: 19, align: 'center' });
    });
    readout(d.readout, atom.value === 'H' ? '\\kE = -\\frac{2.18\\times10^{-18}}{n^{2}}\\ \\text{J}' : '\\kE_{2s} < \\kE_{2p},\\qquad \\kE_{4s} < \\kE_{3d}',
      atom.value === 'H' ? 'In a one-electron atom the orbitals of a shell differ in shape and orientation but not in energy.' : 'The interactions between the electrons remove the degeneracy of the orbitals that belong to different subshells.');
  }
  still(d, draw);
})();

/* =====================================================================
   FIGURE 6.23: the two spin states of an electron in a field B₀, faithful,
   with the two energies the text states beside them.
===================================================================== */
(function () {
  const d = sim('fig-spin', 420);
  const E1 = { x: 560, up: true }, E2 = { x: 880, up: false }, CY = 200, RE = 36;
  F.hover(d.stage, () => [E1, E2].map((e) => ({ x: e.x, y: CY, r: RE, name: e.up ? 'an electron with spin +½' : 'an electron with spin −½' })));
  function electron(ctx, e) {
    const ce = F.el('e-');
    /* the two magnet poles */
    [[CY - 150, e.up ? 'N' : 'S'], [CY + 150, e.up ? 'S' : 'N']].forEach(([y, s]) => {
      ctx.save(); ctx.fillStyle = PAL.soft; ctx.fillRect(e.x - 100, y - 22, 200, 44); ctx.restore();
      text(ctx, s, e.x, y, PAL.ink, { size: 22, weight: 600, align: 'center' });
    });
    /* the magnetic moment through the electron */
    if (e.up) arrow(ctx, e.x, CY + 124, e.x, CY - 122, PAL.muted, 14); else arrow(ctx, e.x, CY - 124, e.x, CY + 122, PAL.muted, 14);
    const gr = ctx.createRadialGradient(e.x - 12, CY - 12, 4, e.x, CY, RE);
    gr.addColorStop(0, F.mixColor(ce, PAL.panel, 0.55)); gr.addColorStop(1, ce);
    ctx.save(); ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(e.x, CY, RE, 0, TAU); ctx.fill(); ctx.restore();
    text(ctx, 'e⁻', e.x, CY, PAL.panel, { size: 24, weight: 600, align: 'center' });
    /* the sense of the spin, an arrow round the equator */
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.ellipse(e.x, CY + 6, RE + 16, 11, 0, 0.15 * Math.PI, 0.95 * Math.PI, false); ctx.stroke(); ctx.restore();
    const ax = e.up ? e.x + 26 : e.x - 26, dir = e.up ? -1 : 1;
    ctx.save(); ctx.fillStyle = PAL.ink; ctx.beginPath(); ctx.moveTo(ax + dir * 10, CY + 16); ctx.lineTo(ax - dir * 4, CY + 10); ctx.lineTo(ax - dir * 2, CY + 24); ctx.closePath(); ctx.fill(); ctx.restore();
    text(ctx, e.up ? 'spin +½, spin-up' : 'spin −½, spin-down', e.x, CY + 196, PAL.ink, { size: 20, align: 'center' });
  }
  function draw() {
    const { ctx } = begin(d.c), ce = C('energy');
    arrow(ctx, 340, CY + 170, 340, CY - 170, PAL.ink, 3);
    text(ctx, 'B_0', 312, CY, PAL.ink, { size: 24, weight: 600, italic: true, align: 'center' });
    electron(ctx, E1); electron(ctx, E2);
    /* the two energies in the field */
    arrow(ctx, 1110, CY + 90, 1110, CY - 110, ce, 3);
    text(ctx, 'E', 1110, CY - 128, ce, { size: 22, weight: 600, italic: true, align: 'center' });
    line(ctx, 1140, CY + 50, 1200, CY + 50, ce, 5); line(ctx, 1140, CY - 50, 1200, CY - 50, ce, 5);
    text(ctx, 'spin +½', 1212, CY + 50, PAL.ink, { size: 19 });
    text(ctx, 'spin −½', 1212, CY - 50, PAL.ink, { size: 19 });
    readout(d.readout, 'm_{s} = +\\tfrac{1}{2}\\quad\\text{or}\\quad m_{s} = -\\tfrac{1}{2}', 'In a field in the positive z direction, the electron with its moment along the field has the slightly lower energy.');
  }
  still(d, draw);
})();
};
