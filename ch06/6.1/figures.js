/* Figures for section 6.1 Electromagnetic Energy. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['6.1'] = function (root, F) {
const { fmt, tex, C, PAL, alpha, ctl, cycle, register, begin, line, arrow, dot, text, topline, axes, hbracket, vbracket } = F;
const sim = (id, H) => F.sim(root, id, H);

/* ---------- the constants, as the book states them ---------- */
const HP = 6.626e-34;         /* J s, Planck's constant */
const CL = 2.998e8;           /* m/s, the speed of light */
const ME = 9.109e-31;         /* kg, the mass of an electron */

/* ---------- number formatting ---------- */
const SUP = { '-': '⁻', '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹' };
const sup = (s) => String(s).split('').map((c) => SUP[c] ?? c).join('');
const expOf = (x) => Math.floor(Math.log10(Math.abs(x)) + 1e-9);
function sciU(x, d = 2) {
  const e = expOf(x), m = x / Math.pow(10, e);
  return (m < 0 ? '−' : '') + Math.abs(m).toFixed(d) + ' × 10' + sup(e);
}
function sciT(x, d = 2) {
  const e = expOf(x), m = x / Math.pow(10, e);
  return (m < 0 ? '-' : '') + Math.abs(m).toFixed(d) + '\\times10^{' + e + '}';
}
/* a wavelength in metres in the unit its region is usually given in */
function lenU(m) {
  if (m >= 1) return fmt(m, m < 10 ? 2 : m < 100 ? 1 : 0) + ' m';
  if (m >= 1e-2) return fmt(m * 100, m < 0.1 ? 2 : 1) + ' cm';
  if (m >= 1e-3) return fmt(m * 1000, 2) + ' mm';
  if (m >= 1e-6) return fmt(m * 1e6, m < 1e-5 ? 2 : 1) + ' μm';
  if (m >= 1e-9) return fmt(m * 1e9, m < 1e-8 ? 2 : 0) + ' nm';
  return fmt(m * 1e12, m < 1e-11 ? 2 : 1) + ' pm';
}
function freqU(hz) {
  if (hz < 1e6) return fmt(hz / 1e3, 0) + ' kHz';
  if (hz < 1e9) return fmt(hz / 1e6, 0) + ' MHz';
  if (hz < 1e12) return fmt(hz / 1e9, hz < 1e10 ? 2 : 1) + ' GHz';
  return sciU(hz) + ' Hz';
}

/* ---------- the colours of light, which are a physical fact and not a type ----------
   The visible band from 400 to 700 nm in the hue of that light (the usual linear approximation);
   light outside it has a wavelength and no colour, and is drawn in the wavelength hue. */
function lightRGB(nm) {
  let r = 0, g = 0, b = 0;
  if (nm < 440) { r = -(nm - 440) / 60; b = 1; }
  else if (nm < 490) { g = (nm - 440) / 50; b = 1; }
  else if (nm < 510) { g = 1; b = -(nm - 510) / 20; }
  else if (nm < 580) { r = (nm - 510) / 70; g = 1; }
  else if (nm < 645) { r = 1; g = -(nm - 645) / 65; }
  else { r = 1; }
  const f = nm < 430 ? 0.45 + 0.55 * (nm - 400) / 30 : nm > 660 ? 0.45 + 0.55 * (700 - nm) / 40 : 1;
  return [r * f, g * f, b * f];
}
const rgbOf = ([r, g, b]) => { const ch = (v) => Math.round(255 * Math.pow(Math.min(1, Math.max(0, v)), 0.8)); return F.fact(`rgb(${ch(r)},${ch(g)},${ch(b)})`); };
const lightColor = (nm) => rgbOf(lightRGB(nm));
const visible = (nm) => nm >= 400 && nm <= 700;
const lightOr = (nm) => (visible(nm) ? lightColor(nm) : C('wavelength'));
const colorName = (nm) => (nm < 450 ? 'violet' : nm < 495 ? 'blue' : nm < 570 ? 'green' : nm < 590 ? 'yellow' : nm < 620 ? 'orange' : 'red');
/* paint the visible band between x-positions of 400 and 700 nm, from y0 to the height f(nm) gives */
function paintVisible(ctx, X, y0, top) {
  const N = 90;
  for (let i = 0; i < N; i++) {
    const a = 400 + (300 * i) / N, b = 400 + (300 * (i + 1)) / N, t = top((a + b) / 2);
    ctx.save(); ctx.fillStyle = lightColor((a + b) / 2); ctx.fillRect(X(a), t, X(b) - X(a) + 0.6, y0 - t); ctx.restore();
  }
}
/* a short stretch of sine wave between two points, of wavelength w (canvas units) and amplitude a, phase ph */
function waveBetween(ctx, x1, y1, x2, y2, w, a, ph, color, lw = 3) {
  const L = Math.hypot(x2 - x1, y2 - y1); if (L < 1) return;
  const ux = (x2 - x1) / L, uy = (y2 - y1) / L, n = Math.max(8, Math.ceil(L / 3));
  ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = lw; ctx.lineJoin = 'round'; ctx.beginPath();
  for (let i = 0; i <= n; i++) {
    const s = (L * i) / n, o = a * Math.sin((2 * Math.PI * s) / w + ph);
    const x = x1 + ux * s - uy * o, y = y1 + uy * s + ux * o;
    if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y);
  }
  ctx.stroke(); ctx.restore();
}

/* =====================================================================
   FIGURE 6.2: a travelling wave on a rope. The frame between the two
   dashed lines is the distance the wave travels in one second, 12 m, so
   ν wavelengths fit in it and λν = 12 m/s at every frequency. Moving: the
   wave travels and one crest is followed across the frame in one second.
===================================================================== */
(function () {
  const d = sim('sim-wave', 480);
  const V = 12;                                   /* m/s, the speed of the wave on the rope */
  const X0 = 170, X1 = 1250, PX = (X1 - X0) / V;  /* the frame: 12 m across 1080 units, 90 units per metre */
  const Y = 290;                                  /* the rope at rest */
  const NU = ctl(d.controls, { label: '\\knu', cls: 'frequency', min: 1, max: 12, step: 0.1, value: 3, unit: 'Hz', dec: 1, aria: 'frequency of the wave', detents: [3, 6, 12], snap: true, onInput: () => cy.reset() });
  const A = ctl(d.controls, { label: 'a', cls: '', min: 0.2, max: 1.2, step: 0.01, value: 0.8, unit: 'm', dec: 2, aria: 'amplitude of the wave' });
  const LOOP = 1;                                 /* model seconds: one crest crosses the frame */
  const cy = cycle(() => LOOP, 1.2);
  let hits = []; F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c);
    hits = [];
    const nu = NU.v, lam = V / nu, a = A.v, t = cy.now(), cw = C('wavelength'), cf = C('frequency');
    /* the frame: two dashed lines and the distance arrow between them */
    line(ctx, X0, 110, X0, 420, alpha(PAL.ink, 0.4), 2, [10, 10]);
    line(ctx, X1, 110, X1, 420, alpha(PAL.ink, 0.4), 2, [10, 10]);
    arrow(ctx, X0 + 4, 112, X1 - 4, 112, PAL.muted, 3);
    text(ctx, 'distance traveled in 1 second, 12 m', X0 + 12, 132, PAL.muted, { size: 17, align: 'left', bg: PAL.panel });
    /* the rope, crest at x = X0 + V t, drawn from its held end past the second line */
    const xc = X0 + V * t * PX, yc = Y - a * PX;
    ctx.save(); ctx.strokeStyle = F.ref('rope'); ctx.lineWidth = 5; ctx.lineJoin = 'round'; ctx.beginPath();
    for (let x = 40; x <= 1370; x += 3) {
      const y = Y - a * PX * Math.cos((2 * Math.PI * (x - xc)) / (lam * PX));
      if (x === 40) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke(); ctx.restore();
    line(ctx, 40, Y, 1370, Y, alpha(PAL.ink, 0.3), 2, [4, 8]);
    /* the crest that is followed, filled while it crosses and hollow once it has arrived */
    dot(ctx, xc, yc, F.ref('crest'), t < LOOP, 10);
    hits.push({ x: xc, y: yc, r: 14, name: 'the crest followed across the frame' });
    /* the wavelength as a measure fixed above the frame */
    const lw = lam * PX, bx = X0 + Math.max(0, (X1 - X0 - lw) / 2);
    hbracket(ctx, bx, bx + lw, Y - 1.2 * PX - 12, cw, 'λ = ' + fmt(lam, 2) + ' m');
    /* the amplitude, from the rest line up to the line of the crests, as the book brackets it */
    line(ctx, 40, yc, 160, yc, alpha(PAL.ink, 0.3), 2, [4, 8]);
    vbracket(ctx, 100, yc, Y, PAL.ink, 'a', -1);
    /* the cycles that have passed the second line: ν of them in one second */
    F.rich(ctx, ['cycles past this line: ', [fmt(nu * t, 1), cf]], X1, 450, { size: 18, align: 'right' });
    text(ctx, 't = ' + fmt(t, 2) + ' s', X0, 450, PAL.muted, { size: 18, align: 'left' });
    topline(ctx, fmt(nu, 1) + ' wavelengths of ' + fmt(lam, 2) + ' m fit in the 12 m the wave travels in one second.');
    tex(d.readout, `\\klam\\knu=(${fmt(lam, 2)}\\ \\text{m})(${fmt(nu, 1)}\\ \\text{Hz})=12\\ \\text{m/s}`);
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 0.25), draw });
})();

/* =====================================================================
   FIGURE 6.3: the electromagnetic spectrum. The book's strip of regions
   on a logarithmic wavelength scale from 1 pm to 1 km, with the frequency
   and the energy of one photon on scales of their own beneath it and one
   wavelength marked through all three. Still: a spectrum has no clock.
===================================================================== */
(function () {
  const d = sim('sim-spectrum', 500);
  const LO = -12, HI = 3, PAD = 0.55, L = 250, R = 1350;   /* the strip runs a little past both ends of the scale, as the book's does */
  const X = (lg) => L + ((lg - LO + PAD) / (HI - LO + 2 * PAD)) * (R - L);
  const V0 = Math.log10(4e-7), V1 = Math.log10(7e-7);
  /* the regions, their boundaries read off the book's strip */
  const REGIONS = [
    { name: 'gamma', a: LO - PAD, b: -11.3 }, { name: 'X-ray', a: -11.3, b: -8.15 }, { name: 'ultraviolet', a: -8.15, b: V0 },
    { name: 'visible', a: V0, b: V1 }, { name: 'infrared', a: V1, b: -4.6 }, { name: 'terahertz', a: -4.6, b: -3 },
    { name: 'microwave', a: -3, b: -0.3 }, { name: 'broadcast and wireless radio', short: 'radio', a: -0.3, b: HI + PAD },
  ];
  const LG = ctl(d.controls, { label: '\\klam', cls: 'wavelength', min: LO, max: HI, step: 0.01, value: Math.log10(589e-9), unit: '', fmt: (lg) => lenU(Math.pow(10, lg)), aria: 'wavelength',
    detents: [{ v: Math.log10(589e-9), label: '589 nm' }, { v: Math.log10(CL / 850e6), label: '850 MHz' }] });
  const WY = 86, SY = 166, SH = 56;                /* the wave and the strip of regions */
  const AX = [262, 352, 442];                      /* the wavelength, frequency and energy scales */
  let hits = []; F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c);
    hits = [];
    const lg = LG.v, lam = Math.pow(10, lg), nu = CL / lam, E = HP * nu, nm = lam * 1e9;
    const cw = C('wavelength'), cf = C('frequency'), ce = C('energy'), x = X(lg);
    /* the wave above the strip: short at the gamma end, long at the radio end */
    ctx.save(); ctx.strokeStyle = alpha(PAL.ink, 0.5); ctx.lineWidth = 2.5; ctx.beginPath();
    let ph = 0;
    for (let px = L; px <= R; px += 1.5) { const w = 6 + 170 * Math.pow((px - L) / (R - L), 2.2); ph += (2 * Math.PI * 1.5) / w; const y = WY + 20 * Math.sin(ph); if (px === L) ctx.moveTo(px, y); else ctx.lineTo(px, y); }
    ctx.stroke(); ctx.restore();
    text(ctx, 'the wave (not to scale)', L - 22, WY, PAL.muted, { size: 17, align: 'right' });
    /* the strip and its regions */
    ctx.save(); ctx.fillStyle = PAL.soft; ctx.fillRect(L, SY - SH / 2, R - L, SH); ctx.restore();
    paintVisible(ctx, (n) => X(Math.log10(n * 1e-9)), SY + SH / 2, () => SY - SH / 2);
    REGIONS.forEach((r, i) => {
      if (i) line(ctx, X(r.a), SY - SH / 2, X(r.a), SY + SH / 2, alpha(PAL.ink, 0.4), 1.5);
      if (r.name === 'visible') return;
      const room = X(r.b) - X(r.a) - 16, name = r.short && F.measure(ctx, r.name, { size: 17 }) > room ? r.short : r.name;
      text(ctx, name, (X(r.a) + X(r.b)) / 2, SY, PAL.ink, { size: 17, align: 'center' });
    });
    text(ctx, 'visible', (X(V0) + X(V1)) / 2, SY - SH / 2 - 16, PAL.ink, { size: 17, align: 'center', bg: PAL.panel });
    /* three scales: wavelength, and frequency and photon energy running the other way */
    const tick = (px, y, col, s) => { line(ctx, px, y, px, y + 9, col, 2); text(ctx, s, px, y + 27, col, { size: 16, align: 'center' }); };
    const scaleRow = (y, col, title, lgOf, q0, q1) => {
      line(ctx, L, y, R, y, col, 2);
      for (let q = q0; q <= q1; q += 1) { const px = X(lgOf(q)); if (px > L + 4 && px < R - 4) tick(px, y, col, '10' + sup(q)); }
      text(ctx, title, L - 22, y, col, { size: 19, weight: 600, align: 'right' });
    };
    scaleRow(AX[0], cw, 'wavelength λ (m)', (q) => q, LO, HI);
    scaleRow(AX[1], cf, 'frequency ν (Hz)', (q) => Math.log10(CL) - q, 5, 21);
    scaleRow(AX[2], ce, 'photon energy E (J)', (q) => Math.log10(HP * CL) - q, -28, -12);
    /* the chosen wavelength through the strip and all three scales, its value tagged above each scale */
    line(ctx, x, WY - 26, x, AX[2], alpha(PAL.ink, 0.55), 2, [4, 8]);
    line(ctx, x, SY - SH / 2, x, SY + SH / 2, PAL.ink, 4);
    const tag = (s, y, col) => { const w = F.measure(ctx, s, { size: 19, weight: 600 }) / 2 + 10; text(ctx, s, Math.min(Math.max(x, L + w), R - w), y - 24, col, { size: 19, weight: 600, align: 'center', bg: PAL.panel }); };
    tag(lenU(lam) + (visible(nm) ? ', ' + colorName(nm) + ' light' : ''), AX[0], cw);
    tag(freqU(nu), AX[1], cf);
    tag(sciU(E) + ' J', AX[2], ce);
    dot(ctx, x, AX[0], visible(nm) ? lightColor(nm) : cw, true, 9);
    dot(ctx, x, AX[1], cf, true, 9); dot(ctx, x, AX[2], ce, true, 9);
    hits.push({ x: x, y: WY, r: 30, name: 'the waves lengthen from the gamma end to the radio end' });
    tex(d.readout,
      `\\knu=\\frac{\\kc}{\\klam}=\\frac{2.998\\times10^{8}\\ \\text{m s}^{-1}}{${sciT(lam)}\\ \\text{m}}=${sciT(nu)}\\ \\text{s}^{-1}\\\\`
      + `\\kE=h\\knu=(6.626\\times10^{-34}\\ \\text{J s})(${sciT(nu)}\\ \\text{s}^{-1})=${sciT(E)}\\ \\text{J}`);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 6.6: the fringes of light through two narrow slits, redrawn
   from the book's four bands, since the bundle's image keeps only the red
   one. Each band is the two-slit pattern, cos² of the fringe phase under
   the single-slit envelope, with its fringe spacing in proportion to λ;
   white light is the sum of the visible wavelengths, so its centre is
   white and its outer fringes part into colours. The brightness is shown
   as its square root, as the camera's exposure does. Still: a photograph
   has nothing to vary and no clock. The black is the dark of the
   photograph, and the bands wear the colours of their light.
===================================================================== */
const DARK = '#000000';
(function () {
  const d = sim('fig-fringes', 380);
  const X0 = 300, X1 = 1370, XC = (X0 + X1) / 2, TOP = 28, BH = 64, GAP = 22;
  const PX_PER_NM = 0.032, ENV = 5;   /* fringe spacing 20.8 units at 650 nm; slit spacing five slit widths */
  const BANDS = [
    { name: 'white light', nm: null },
    { name: 'red light', nm: 650 },
    { name: 'green light', nm: 532 },
    { name: 'blue light', nm: 450 },
  ];
  const sinc2 = (u) => (Math.abs(u) < 1e-6 ? 1 : (Math.sin(u) / u) ** 2);
  const I = (y, nm) => { const p = PX_PER_NM * nm; return Math.cos((Math.PI * y) / p) ** 2 * sinc2((Math.PI * y) / (ENV * p)); };
  const WHITE = []; for (let nm = 400; nm <= 700; nm += 5) WHITE.push([nm, lightRGB(nm)]);
  const W0 = [0, 1, 2].map((k) => WHITE.reduce((a, [, c]) => a + c[k], 0));
  function rgbAt(y, nm) {
    if (nm) return lightRGB(nm).map((c) => c * Math.sqrt(I(y, nm)));
    const sum = [0, 0, 0];
    WHITE.forEach(([n, c]) => { const i = I(y, n); for (let k = 0; k < 3; k++) sum[k] += c[k] * i; });
    return sum.map((v, k) => Math.sqrt(v / W0[k]));
  }
  function draw() {
    const { ctx } = begin(d.c);
    const facts = F.shown.facts, STEP = 2;
    BANDS.forEach((b, i) => {
      const y = TOP + i * (BH + GAP);
      ctx.save(); ctx.fillStyle = facts ? F.fact(DARK) : PAL.panel; ctx.fillRect(X0, y, X1 - X0, BH);
      for (let x = X0; x < X1; x += STEP) {
        const c = rgbAt(x + STEP / 2 - XC, b.nm);
        ctx.fillStyle = facts ? rgbOf(c) : alpha(PAL.ink, Math.max(...c));
        ctx.fillRect(x, y, STEP + 0.5, BH);
      }
      ctx.restore();
      text(ctx, b.name, X0 - 24, y + (b.nm ? BH / 2 - 14 : BH / 2), PAL.ink, { size: 22, align: 'right' });
      if (b.nm) text(ctx, 'λ = ' + b.nm + ' nm', X0 - 24, y + BH / 2 + 16, C('wavelength'), { size: 20, weight: 600, align: 'right' });
    });
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 6.7: a vibrating string 1.00 m long, fixed at both ends, as a
   standing wave of n half-wavelengths. Moving: the string vibrates (a
   clock), its nodes stay still. A change of n bends the shape into the new one.
===================================================================== */
(function () {
  const d = sim('sim-string', 420);
  const N = F.choice(d.controls, { label: 'n', options: [1, 2, 3, 4, 5, 6].map((k) => ({ value: String(k), label: String(k) })), value: '3', aria: 'number of half-wavelengths on the string' });
  const L = 200, R = 1200, Y = 230, AMP = 110;
  const LOOP = 4, cy = cycle(() => LOOP, 0);     /* model seconds; the string makes n cycles in each loop, so the loop closes on itself */
  let hits = []; F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c);
    hits = [];
    const n = +N.value, t = cy.now(), cw = C('wavelength');
    const phase = Math.cos((2 * Math.PI * n * t) / LOOP);
    const shape = (s) => N.mix((v) => Math.sin(+v * Math.PI * s));
    /* the envelope the string swings between, and the string itself */
    const Xs = (s) => L + s * (R - L);
    ctx.save(); ctx.strokeStyle = alpha(PAL.ink, 0.3); ctx.lineWidth = 2; ctx.setLineDash([10, 10]);
    [1, -1].forEach((sg) => { ctx.beginPath(); for (let i = 0; i <= 200; i++) { const s = i / 200, y = Y - sg * AMP * shape(s); if (i) ctx.lineTo(Xs(s), y); else ctx.moveTo(Xs(s), y); } ctx.stroke(); });
    ctx.restore();
    ctx.save(); ctx.strokeStyle = F.ref('string'); ctx.lineWidth = 5; ctx.lineJoin = 'round'; ctx.beginPath();
    for (let i = 0; i <= 240; i++) { const s = i / 240, y = Y - AMP * phase * shape(s); if (i) ctx.lineTo(Xs(s), y); else ctx.moveTo(Xs(s), y); }
    ctx.stroke(); ctx.restore();
    /* the two fixed ends */
    [L, R].forEach((x) => { ctx.save(); ctx.fillStyle = PAL.muted; ctx.fillRect(x - (x === L ? 22 : 0), Y - 60, 22, 120); ctx.restore(); });
    text(ctx, 'fixed end', L - 11, Y + 84, PAL.muted, { size: 17, align: 'center' });
    text(ctx, 'fixed end', R + 11, Y + 84, PAL.muted, { size: 17, align: 'center' });
    /* the nodes between the ends, one labelled */
    for (let k = 1; k < n; k++) { const x = Xs(k / n); dot(ctx, x, Y, PAL.ink, false, 10); hits.push({ x, y: Y, r: 14, name: 'a node, which does not move' }); }
    if (n > 1) text(ctx, 'node', Xs(1 / n), Y + 38, PAL.ink, { size: 18, weight: 600, align: 'center', bg: PAL.panel });
    /* one half-wavelength measured below the string */
    hbracket(ctx, Xs(0), Xs(1 / n), Y + AMP + 40, cw, 'λ/2 = ' + fmt(1 / n, 3) + ' m', { side: 'below' });
    const lam = 2 / n;
    topline(ctx, n + (n === 1 ? ' half-wavelength fits' : ' half-wavelengths fit') + ' between the ends, with ' + (n - 1 === 0 ? 'no nodes' : n - 1 === 1 ? '1 node' : (n - 1) + ' nodes') + ' between them.');
    tex(d.readout, `\\klam=\\frac{2L}{n}=\\frac{2(1.00\\ \\text{m})}{${n}}=${fmt(lam, 3)}\\ \\text{m}`);
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();

/* =====================================================================
   FIGURE 6.10: blackbody curves. The book's four temperatures (2500,
   3400, 4400 and 5500 K) drawn faintly with their maxima joined, the
   chosen one over them with λ_max marked and the visible band painted
   under it, and the classical prediction for the same temperature dashed
   beside it, climbing without limit at short wavelengths. Still.
   Axes fixed: 0 to 3000 nm as the book's, and 0 to 11 arbitrary units
   with the 5500 K maximum at 9.6, where the book draws it.
===================================================================== */
(function () {
  const d = sim('sim-blackbody', 600);
  const B = { l: 90, r: 1330, t: 120, b: 500 };
  const C2 = 1.4388e7;                             /* nm K, hc/k of Planck's formula */
  const WIEN = 2.898e6;                            /* nm K, λ_max T */
  const BOOK = [5500, 4400, 3400, 2500];
  const raw = (lam, T) => 1 / (Math.pow(lam / 1000, 5) * (Math.exp(C2 / (lam * T)) - 1));
  const S = 9.6 / raw(WIEN / 5500, 5500);
  const planck = (T) => (lam) => (lam <= 20 ? 0 : S * raw(lam, T));
  /* the classical curve: Planck's with the vibrating atoms allowed any energy, intensity ∝ T/λ⁴ */
  const classical = (T) => (lam) => (S * lam * T) / (C2 * Math.pow(lam / 1000, 5));
  const T = ctl(d.controls, { label: '\\kT', cls: 'temperature', min: 2000, max: 5500, step: 10, value: 4400, unit: 'K', dec: 0, aria: 'temperature of the blackbody', detents: BOOK });
  function draw() {
    const { ctx } = begin(d.c);
    const Tv = T.v, cw = C('wavelength'), ct = C('temperature'), lm = WIEN / Tv, pk = planck(Tv)(lm);
    const ax = axes(ctx, B, [0, 3000], [0, 11], { nx: 6, ny: 0, xl: 'wavelength λ (nm)', xc: cw, yl: 'intensity (arbitrary units)' }), { X, Y } = ax;
    const clip = (f) => { ctx.save(); ctx.beginPath(); ctx.rect(B.l, B.t - 2, B.r - B.l, B.b - B.t + 4); ctx.clip(); f(); ctx.restore(); };
    /* the regions */
    [400, 700].forEach((v) => line(ctx, X(v), B.t, X(v), B.b, alpha(PAL.ink, 0.35), 2, [10, 10]));
    text(ctx, 'ultraviolet', X(200), B.t + 18, PAL.muted, { size: 17, align: 'center' });
    text(ctx, 'visible', X(550), B.t + 18, PAL.muted, { size: 17, align: 'center' });
    text(ctx, 'infrared', X(1000), B.t + 18, PAL.muted, { size: 17, align: 'center' });
    /* the visible band under the chosen curve, in the colours of that light */
    clip(() => paintVisible(ctx, X, B.b, (nm) => Math.max(B.t, Y(planck(Tv)(nm)))));
    /* the book's four temperatures, faint, each named above its curve, and the line through their maxima */
    BOOK.forEach((t0) => {
      F.plot(ctx, ax, planck(t0), alpha(PAL.ink, 0.3), { w: 2, x: [25, 3000] });
      text(ctx, t0 + ' K', X(1420), Y(planck(t0)(1420)) - 15, ct, { size: 17, weight: 600, align: 'left' });
    });
    F.plot(ctx, ax, (lam) => planck(WIEN / lam)(lam), alpha(cw, 0.7), { w: 2, x: [WIEN / 5500, WIEN / 2000], dash: [6, 8] });
    BOOK.forEach((t0) => dot(ctx, X(WIEN / t0), Y(planck(t0)(WIEN / t0)), cw, true, 5));
    /* the classical prediction, then the observed curve over it */
    F.plot(ctx, ax, classical(Tv), PAL.ink, { w: 3, x: [150, 3000], dash: [10, 10] });
    F.plot(ctx, ax, planck(Tv), PAL.ink, { w: 5, x: [25, 3000] });
    /* λ_max */
    dot(ctx, X(lm), Y(pk), cw, true, 9);
    F.label(ctx, 'λ_{max} = ' + fmt(lm, 0) + ' nm', X(lm), Y(pk), { side: 'above', color: cw, size: 19, gap: 26 });
    F.legend(ctx, ax, [
      { s: 'observed at ' + Tv + ' K', color: PAL.ink, w: 5 },
      { s: 'classical theory at ' + Tv + ' K', color: PAL.ink, w: 3, dash: [10, 10] },
      { s: 'the maxima, λ_{max}', color: alpha(cw, 0.7), w: 2, dash: [6, 8] },
    ], { corner: 'tr' });
    topline(ctx, 'At ' + Tv + ' K the observed curve peaks at ' + fmt(lm, 0) + ' nm, ' + (lm < 400 ? 'in the ultraviolet' : lm <= 700 ? 'in the visible' : 'in the infrared') + '.');
    const E = (HP * CL) / (lm * 1e-9);
    tex(d.readout, `\\kE=h\\knu=\\frac{h\\kc}{\\klammax}=\\frac{(6.626\\times10^{-34}\\ \\text{J s})(2.998\\times10^{8}\\ \\text{m s}^{-1})}{${sciT(lm * 1e-9)}\\ \\text{m}}=${sciT(E)}\\ \\text{J}`);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 6.11: the photoelectric effect. Photons of one wavelength strike
   a metal whose electrons are held by 3.21 × 10⁻¹⁹ J (the metal the
   book's two speeds imply); above that energy each photon frees one
   electron, which leaves with the rest. Beside the scene a bar sets one
   photon's energy against the threshold. Moving: photons arrive and
   electrons fly, at a rate the brightness sets.
===================================================================== */
(function () {
  const d = sim('sim-photoelectric', 580);
  const W0 = 3.21e-19;                              /* J, the threshold energy */
  const L0 = (HP * CL / W0) * 1e9;                  /* nm, the threshold wavelength, 619 nm */
  const LAM = ctl(d.controls, { label: '\\klam', cls: 'wavelength', min: 200, max: 800, step: 1, value: 550, unit: 'nm', dec: 0, aria: 'wavelength of the light',
    detents: [700, 550, 400], specials: [{ at: Math.round(L0), label: 'threshold' }] });
  const BR = ctl(d.controls, { label: '\\text{brightness}', cls: '', min: 1, max: 8, step: 1, value: 3, unit: 'photons/s', dec: 0, aria: 'brightness, the number of photons arriving each second' });
  const LOOP = 8, cy = cycle(() => LOOP, 0);
  const MT = { l: 60, r: 880, y: 440, h: 56 };      /* the metal and its surface */
  const RUN = 330, TRAVEL = 1.2;                    /* a photon comes in at 45° over RUN units each way, in TRAVEL seconds */
  const BOX = { l: 1040, r: 1310, t: 140, b: 470 }; /* the energy bar */
  const Q = Math.SQRT1_2;
  const hash = (i) => { const s = Math.sin(i * 12.9898) * 43758.5453; return s - Math.floor(s); };
  const e19 = (x) => (x / 1e-19).toFixed(2);
  let hits = []; F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c);
    hits = [];
    const nm = LAM.v, E = (HP * CL) / (nm * 1e-9), KE = E - W0, out = KE > 0;
    const v = out ? Math.sqrt((2 * KE) / ME) : 0, t = cy.now();
    const cw = C('wavelength'), ce = C('energy'), cv = C('velocity'), cm = F.ref('metal'), cel = F.el('e-'), pc = lightOr(nm);
    /* the metal */
    ctx.save(); ctx.fillStyle = alpha(cm, 0.2); ctx.strokeStyle = cm; ctx.lineWidth = 3;
    ctx.fillRect(MT.l, MT.y, MT.r - MT.l, MT.h); ctx.strokeRect(MT.l, MT.y, MT.r - MT.l, MT.h); ctx.restore();
    text(ctx, 'metal', MT.r - 24, MT.y + MT.h / 2, cm, { size: 22, weight: 600, align: 'right' });
    hits.push({ x: (MT.l + MT.r) / 2, y: MT.y + MT.h / 2, r: 30, name: 'the metal, whose electrons are held by 3.21 × 10⁻¹⁹ J' });
    /* photons: wave trains of their own wavelength arriving at 45°; electrons leaving at 45° */
    const n = BR.v * LOOP, pw = 16 + nm / 14, bl = 2.5 * pw, SP = 300 * (v / 6.2e5);
    ctx.save(); ctx.beginPath(); ctx.rect(20, 100, 940, MT.y - 100); ctx.clip();
    for (let i = 0; i < n; i++) {
      const t0 = (i / n) * LOOP, age = (((t - t0) % LOOP) + LOOP) % LOOP;
      const hx = 340 + hash(i + 1) * 300, hy = MT.y;
      if (age < TRAVEL) {
        const k = age / TRAVEL, px = hx - RUN * (1 - k), py = hy - RUN * (1 - k);
        waveBetween(ctx, px - Q * bl, py - Q * bl, px, py, pw, 12, -age * 30, pc, 4);
        hits.push({ x: px - Q * bl / 2, y: py - Q * bl / 2, r: 24, name: 'a photon of ' + nm + ' nm' });
      } else if (out) {
        const s = (age - TRAVEL) * SP, ex = hx + s * Q, ey = hy - s * Q;
        if (ey > 90) {
          line(ctx, hx, hy, ex, ey, alpha(PAL.ink, 0.18), 2);
          dot(ctx, ex, ey, cel, true, 10);
          hits.push({ x: ex, y: ey, r: 14, name: 'an ejected electron' });
        }
      } else if (age < TRAVEL + 0.3) {
        F.faded(ctx, 1 - (age - TRAVEL) / 0.3, [0, 0], () => dot(ctx, hx, hy - 2, pc, false, 12 * (1 + (age - TRAVEL) * 3)));
      }
    }
    ctx.restore();
    F.rich(ctx, ['light of ', [nm + ' nm', cw]], 50, 330, { size: 22 });
    if (out) F.rich(ctx, ['v_{max} = ', [sciU(v) + ' m/s', cv]], 490, 128, { size: 22, align: 'center' });
    else text(ctx, 'no electrons ejected', 640, 400, PAL.muted, { size: 22, align: 'center' });
    F.legend(ctx, { l: MT.l, r: MT.r, t: MT.y + MT.h, b: 566 }, [
      { s: 'photon', draw: (c, x, y) => waveBetween(c, x - 20, y, x + 20, y, 16, 6, 0, pc, 3) },
      { s: 'electron', kind: 'dot', color: cel },
    ], { corner: 'bottom', row: true, panel: false });
    /* one photon's energy against the threshold: what is left over is the electron's kinetic energy */
    const ax = axes(ctx, BOX, [0, 1], [0, 10], { nx: 0, ny: 5, yl: 'energy (10⁻¹⁹ J)', yc: ce }), { Y } = ax;
    const bx0 = 1100, bx1 = 1200, yE = Y(E / 1e-19), yW = Y(W0 / 1e-19);
    ctx.save();
    ctx.fillStyle = alpha(ce, 0.3); ctx.fillRect(bx0, Math.max(yE, yW), bx1 - bx0, BOX.b - Math.max(yE, yW));
    if (out) { ctx.fillStyle = alpha(ce, 0.9); ctx.fillRect(bx0, yE, bx1 - bx0, yW - yE); }
    ctx.restore();
    line(ctx, BOX.l, yW, BOX.r, yW, PAL.ink, 2.5, [10, 10]);
    text(ctx, 'threshold', BOX.r, yW + 18, PAL.ink, { size: 17, align: 'right' });
    text(ctx, 'one photon', (bx0 + bx1) / 2, BOX.b + 26, PAL.ink, { size: 17, align: 'center' });
    if (out) vbracket(ctx, bx1 + 22, yE, yW, ce, 'KE', 1);
    topline(ctx, out
      ? 'Each photon of ' + nm + ' nm carries more than the threshold energy and frees one electron.'
      : 'A photon of ' + nm + ' nm carries less than the threshold energy, so no electron leaves, however bright the light.');
    tex(d.readout, out
      ? `\\kKE=\\frac{h\\kc}{\\klam}-\\kE_{\\text{threshold}}=${e19(E)}\\times10^{-19}\\ \\text{J}-3.21\\times10^{-19}\\ \\text{J}=${(+e19(E) - 3.21).toFixed(2)}\\times10^{-19}\\ \\text{J}`
      : `\\kE=\\frac{h\\kc}{\\klam}=${e19(E)}\\times10^{-19}\\ \\text{J}<\\kE_{\\text{threshold}}=3.21\\times10^{-19}\\ \\text{J}`);
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();
};
