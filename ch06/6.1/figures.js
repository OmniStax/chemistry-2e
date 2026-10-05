/* Figures for section 6.1 Electromagnetic Energy. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['6.1'] = function (root, F) {
const { el, fmt, tex, C, PAL, alpha, ctl, cycle, register, begin, line, arrow, dot, text, topline, axes, hbracket, vbracket } = F;
const sim = (id, H) => F.sim(root, id, H);
function readout(host, main, small) { tex(host, main); if (small) { const s = el('small', null, small); host.appendChild(s); F.renderMath(s); } }

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
function lightColor(nm) {
  let r = 0, g = 0, b = 0;
  if (nm < 440) { r = -(nm - 440) / 60; b = 1; }
  else if (nm < 490) { g = (nm - 440) / 50; b = 1; }
  else if (nm < 510) { g = 1; b = -(nm - 510) / 20; }
  else if (nm < 580) { r = (nm - 510) / 70; g = 1; }
  else if (nm < 645) { r = 1; g = -(nm - 645) / 65; }
  else { r = 1; }
  const f = nm < 430 ? 0.45 + 0.55 * (nm - 400) / 30 : nm > 660 ? 0.45 + 0.55 * (700 - nm) / 40 : 1;
  const ch = (v) => Math.round(255 * Math.pow(Math.max(0, v * f), 0.8));
  return F.fact(`rgb(${ch(r)},${ch(g)},${ch(b)})`);
}
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
    const xc = X0 + V * t * PX;
    ctx.save(); ctx.strokeStyle = F.ref('rope'); ctx.lineWidth = 5; ctx.lineJoin = 'round'; ctx.beginPath();
    for (let x = 40; x <= 1370; x += 3) {
      const y = Y - a * PX * Math.cos((2 * Math.PI * (x - xc)) / (lam * PX));
      if (x === 40) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke(); ctx.restore();
    line(ctx, 40, Y, 1370, Y, alpha(PAL.ink, 0.3), 2, [4, 8]);
    /* the crest that is followed, filled while it crosses and hollow once it has arrived */
    dot(ctx, xc, Y - a * PX, F.ref('crest'), t < LOOP, 10);
    hits.push({ x: xc, y: Y - a * PX, r: 14, name: 'the crest followed across the frame' });
    /* the wavelength as a measure fixed above the frame, and the amplitude beside the held end */
    const lw = lam * PX, bx = X0 + Math.max(0, (X1 - X0 - lw) / 2);
    hbracket(ctx, bx, bx + lw, Y - 1.2 * PX - 12, cw, 'λ = ' + fmt(lam, 2) + ' m');
    vbracket(ctx, 90, Y - a * PX, Y, PAL.ink, 'a', -1);
    /* the crests that have passed the second line */
    const passed = Math.max(0, Math.floor(nu * t + 1e-6));
    text(ctx, 'crests past the right-hand line: ' + passed, X1, 450, cf, { size: 18, weight: 600, align: 'right' });
    text(ctx, 't = ' + fmt(t, 2) + ' s', X0, 450, PAL.muted, { size: 18, align: 'left' });
    topline(ctx, 'At ' + fmt(nu, 1) + ' Hz the wavelength is ' + fmt(lam, 2) + ' m, and ' + fmt(nu, 1) + ' wavelengths fit in the 12 m the wave travels in one second.');
    readout(d.readout,
      `\\klam\\knu=(${fmt(lam, 2)}\\ \\text{m})(${fmt(nu, 1)}\\ \\text{Hz})=12\\ \\text{m/s}`);
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 0.25), draw });
})();

/* =====================================================================
   FIGURE 6.3: the electromagnetic spectrum. A logarithmic wavelength
   scale from 1 pm to 1 km with its regions, the frequency and the photon
   energy on scales of their own beneath it, one wavelength marked through
   all three. Still: a spectrum has no clock.
===================================================================== */
(function () {
  const d = sim('sim-spectrum', 560);
  const LO = -12, HI = 3, L = 110, R = 1290;
  const X = (lg) => L + ((lg - LO) / (HI - LO)) * (R - L);
  const REGIONS = [
    { name: 'gamma rays', a: -12, b: -11 }, { name: 'X-rays', a: -11, b: -8 }, { name: 'ultraviolet', a: -8, b: Math.log10(4e-7) },
    { name: 'visible', a: Math.log10(4e-7), b: Math.log10(7e-7) }, { name: 'infrared', a: Math.log10(7e-7), b: -4 },
    { name: 'terahertz', a: -4, b: -3 }, { name: 'microwave', a: -3, b: -1 }, { name: 'radio', a: -1, b: 3 },
  ];
  const regionOf = (lg) => REGIONS.find((r) => lg >= r.a && lg <= r.b) ?? REGIONS[REGIONS.length - 1];
  const LG = ctl(d.controls, { label: '\\log_{10}(\\klam/\\text{m})', cls: 'wavelength', min: LO, max: HI, step: 0.01, value: Math.log10(589e-9), unit: '', dec: 2, aria: 'wavelength, as a power of ten in meters',
    detents: [{ v: Math.log10(589e-9), label: '589 nm' }, { v: Math.log10(CL / 850e6), label: '850 MHz' }] });
  const SY = 250, SH = 56;                        /* the wavelength strip */
  const NY = 390, EY = 470;                        /* the frequency and energy scales */
  function draw() {
    const { ctx } = begin(d.c);
    const lg = LG.v, lam = Math.pow(10, lg), nu = CL / lam, E = HP * nu, nm = lam * 1e9;
    const cw = C('wavelength'), cf = C('frequency'), ce = C('energy');
    /* the chirped wave above the strip: short at the left, long at the right */
    ctx.save(); ctx.strokeStyle = alpha(PAL.ink, 0.45); ctx.lineWidth = 2.5; ctx.beginPath();
    let ph = 0;
    for (let x = L; x <= R; x += 1.5) { const w = 6 + 150 * Math.pow((x - L) / (R - L), 2.2); ph += (2 * Math.PI * 1.5) / w; const y = SY - SH / 2 - 44 + 18 * Math.sin(ph); if (x === L) ctx.moveTo(x, y); else ctx.lineTo(x, y); }
    ctx.stroke(); ctx.restore();
    /* the strip and its regions */
    ctx.save(); ctx.fillStyle = PAL.soft; ctx.fillRect(L, SY - SH / 2, R - L, SH); ctx.restore();
    paintVisible(ctx, (n) => X(Math.log10(n * 1e-9)), SY + SH / 2, () => SY - SH / 2);
    REGIONS.forEach((r, i) => {
      if (i) line(ctx, X(r.a), SY - SH / 2, X(r.a), SY + SH / 2, alpha(PAL.ink, 0.35), 1.5);
      if (r.name === 'visible') return;
      text(ctx, r.name, (X(r.a) + X(r.b)) / 2, SY, PAL.ink, { size: r.b - r.a < 1.2 ? 14 : 17, align: 'center', bg: PAL.soft });
    });
    const vx = (X(REGIONS[3].a) + X(REGIONS[3].b)) / 2;
    line(ctx, vx, SY - SH / 2 - 4, vx, SY - SH / 2 - 16, PAL.muted, 1.5);
    text(ctx, 'visible', vx, SY - SH / 2 - 76, PAL.muted, { size: 15, align: 'center', bg: PAL.panel });
    /* the wavelength scale */
    line(ctx, L, SY + SH / 2, R, SY + SH / 2, cw, 2);
    for (let p = LO; p <= HI; p += 1) { line(ctx, X(p), SY + SH / 2, X(p), SY + SH / 2 + 9, cw, 2); if ((p - LO) % 3 === 0) text(ctx, '10' + sup(p), X(p), SY + SH / 2 + 28, cw, { size: 17, align: 'center' }); }
    text(ctx, 'wavelength λ (m)', R, SY + SH / 2 + 56, cw, { size: 19, weight: 600, align: 'right' });
    /* the frequency scale runs the other way: ν = c/λ */
    line(ctx, L, NY, R, NY, cf, 2);
    for (let q = 6; q <= 20; q += 1) { const x = X(Math.log10(CL) - q); if (x < L - 1 || x > R + 1) continue; line(ctx, x, NY - 9, x, NY, cf, 2); if (q % 3 === 0) text(ctx, '10' + sup(q), x, NY + 22, cf, { size: 17, align: 'center' }); }
    const x = X(lg), side = x > 900 ? 'right' : 'left', dx = side === 'right' ? -14 : 14;
    /* an axis title moves to the left end where the marked value would sit on it */
    const title = (s, y, col, val) => { const w = F.measure(ctx, s, { size: 19, weight: 600 }), vw = F.measure(ctx, val, { size: 18, weight: 600 }), v0 = side === 'right' ? x + dx - vw : x + dx, left = v0 + vw > R - w - 12;
      text(ctx, s, left ? L : R, y, col, { size: 19, weight: 600, align: left ? 'left' : 'right' }); };
    title('frequency ν (Hz), increasing to the left', NY - 26, cf, lenU(lam));
    /* the energy of one photon, E = hν */
    line(ctx, L, EY, R, EY, ce, 2);
    for (let q = -28; q <= -13; q += 1) { const x = X(Math.log10(HP * CL) - q); if (x < L - 1 || x > R + 1) continue; line(ctx, x, EY - 9, x, EY, ce, 2); if (q % 3 === 0) text(ctx, '10' + sup(q), x, EY + 22, ce, { size: 17, align: 'center' }); }
    title('energy of one photon E (J), increasing to the left', EY - 26, ce, freqU(nu));
    /* the chosen wavelength through all three scales */
    line(ctx, x, SY - SH / 2 - 10, x, EY + 6, alpha(PAL.ink, 0.5), 2, [4, 8]);
    line(ctx, x, SY - SH / 2, x, SY + SH / 2, visible(nm) ? PAL.ink : cw, 4);
    dot(ctx, x, SY - SH / 2 - 12, lightOr(nm), true, 10);
    dot(ctx, x, NY, cf, true, 8); dot(ctx, x, EY, ce, true, 8);
    text(ctx, lenU(lam), x + dx, SY + SH / 2 + 84, cw, { size: 18, weight: 600, align: side, bg: PAL.panel });
    text(ctx, freqU(nu), x + dx, NY + 48, cf, { size: 18, weight: 600, align: side, bg: PAL.panel });
    text(ctx, sciU(E) + ' J', x + dx, EY + 48, ce, { size: 18, weight: 600, align: side, bg: PAL.panel });
    const reg = regionOf(lg);
    topline(ctx, 'Radiation of wavelength ' + lenU(lam) + ' is ' + (reg.name === 'visible' ? colorName(nm) + ' visible light' : reg.name === 'radio' ? 'a radio wave' : reg.name) + ', with a frequency of ' + freqU(nu) + ' and ' + sciU(E) + ' J in each photon.');
    readout(d.readout,
      `\\knu=\\frac{\\kc}{\\klam}=\\frac{2.998\\times10^{8}\\ \\text{m s}^{-1}}{${sciT(lam)}\\ \\text{m}}=${sciT(nu)}\\ \\text{s}^{-1},\\quad \\kE=h\\knu=${sciT(E)}\\ \\text{J}`);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 6.5: AM and FM. One signal, and the carrier wave that transmits
   it, whose amplitude (AM) or frequency (FM) follows the signal. Still:
   the choice bends the carrier from one form into the other.
===================================================================== */
(function () {
  const d = sim('sim-amfm', 440);
  const MODE = F.choice(d.controls, { label: '\\text{modulation}', options: [{ value: 'am', label: 'AM' }, { value: 'fm', label: 'FM' }], value: 'am', aria: 'amplitude or frequency modulation' });
  const L = 150, R = 1250, SY = 158, CYc = 320;
  const sig = (s) => Math.sin(2 * Math.PI * (1.5 * s - 0.25));              /* the signal over s = 0..1: two crests and a trough, as the book draws it */
  const K0 = 16;                                                            /* carrier cycles across the width */
  /* the carrier's phase for FM is the running integral of its frequency, K0 (1 + 0.45 s(x)) */
  const fmPhase = (s) => 2 * Math.PI * (K0 * s + (K0 * 0.45) * (-Math.cos(2 * Math.PI * (1.5 * s - 0.25)) + Math.cos(-Math.PI / 2)) / (2 * Math.PI * 1.5));
  const carrier = (m) => (m === 'am' ? (s) => 0.62 * (1 + 0.6 * sig(s)) * Math.sin(2 * Math.PI * K0 * s) : (s) => 0.62 * Math.sin(fmPhase(s)));
  function draw() {
    const { ctx } = begin(d.c);
    const m = MODE.value, cs = F.ref('signal'), cc = F.ref('carrier');
    const Xs = (s) => L + s * (R - L), Ys = (v) => SY - 60 * v, Yc = (v) => CYc - 100 * v;
    line(ctx, L, SY, R, SY, alpha(PAL.ink, 0.25), 1.5, [4, 8]);
    line(ctx, L, CYc, R, CYc, alpha(PAL.ink, 0.25), 1.5, [4, 8]);
    F.curve(ctx, sig, 0, 1, Xs, Ys, cs, 4, 200);
    text(ctx, 'signal', R + 20, SY, cs, { size: 20, weight: 600 });
    MODE.curve(ctx, carrier, 0, 1, Xs, Yc, cc, 3.5, 900);
    MODE.only(ctx, 'am', () => text(ctx, 'AM', R + 20, CYc, cc, { size: 22, weight: 600 }));
    MODE.only(ctx, 'fm', () => text(ctx, 'FM', R + 20, CYc, cc, { size: 22, weight: 600 }));
    /* guide lines from the signal's crests and trough down to the carrier */
    [1 / 3, 2 / 3, 0.985].forEach((s, i) => { line(ctx, Xs(s), Ys(sig(s)) + 12, Xs(s), CYc - 110, alpha(PAL.ink, 0.3), 1.5, [4, 8]); text(ctx, i === 1 ? 'trough' : 'crest', Xs(s), CYc + 112, PAL.muted, { size: 16, align: 'center' }); });
    topline(ctx, m === 'am'
      ? 'In AM the carrier keeps one frequency, and its amplitude is greatest under the crests of the signal and least under its trough.'
      : 'In FM the carrier keeps one amplitude, and its waves crowd together under the crests of the signal and spread apart under its trough.');
    readout(d.readout, m === 'am'
      ? `\\knu_{\\text{carrier}}=1000\\ \\text{kHz, fixed}`
      : `\\knu_{\\text{carrier}}=100.0\\ \\text{MHz}\\pm0.075\\ \\text{MHz}`,
      m === 'am'
        ? 'An AM station broadcasts in the band of 540 to 2830 kHz.'
        : 'An FM station in its band of 87.5 to 108.0 MHz swings its carrier by only 75 kHz; the drawing exaggerates the swing so that it can be seen.');
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 6.7: a vibrating string 1.00 m long, fixed at both ends, as a
   standing wave of n half-wavelengths. Moving: the string vibrates (a
   clock), its nodes stay still. A change of n bends the shape into the new one.
===================================================================== */
(function () {
  const d = sim('sim-string', 440);
  const N = F.choice(d.controls, { label: 'n', options: [1, 2, 3, 4, 5, 6].map((k) => ({ value: String(k), label: String(k) })), value: '3', aria: 'number of half-wavelengths on the string' });
  const L = 200, R = 1200, Y = 250, AMP = 110;
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
    text(ctx, 'fixed end', L - 11, Y + 84, PAL.muted, { size: 16, align: 'center' });
    text(ctx, 'fixed end', R + 11, Y + 84, PAL.muted, { size: 16, align: 'center' });
    /* the nodes between the ends, one labelled */
    for (let k = 1; k < n; k++) { const x = Xs(k / n); dot(ctx, x, Y, PAL.ink, false, 10); hits.push({ x, y: Y, r: 14, name: 'a node, which does not move' }); }
    if (n > 1) text(ctx, 'node', Xs(1 / n), Y + 38, PAL.ink, { size: 18, weight: 600, align: 'center', bg: PAL.panel });
    /* one half-wavelength measured below the string */
    hbracket(ctx, Xs(0), Xs(1 / n), Y + AMP + 40, cw, 'λ/2 = ' + fmt(1 / n, 3) + ' m', { side: 'below' });
    const lam = 2 / n;
    topline(ctx, 'With n = ' + n + (n === 1 ? ' half-wavelength' : ' half-wavelengths') + ' between the ends the string has ' + (n - 1) + (n - 1 === 1 ? ' node' : ' nodes') + ' and a wavelength of ' + fmt(lam, 3) + ' m.');
    readout(d.readout,
      `\\klam=\\frac{2L}{n}=\\frac{2(1.00\\ \\text{m})}{${n}}=${fmt(lam, 3)}\\ \\text{m}`,
      'Only a whole number of half-wavelengths fits between two fixed ends, so the wavelength is quantized.');
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();

/* =====================================================================
   FIGURE 6.10: blackbody curves. The book's four temperatures drawn
   faintly, the chosen one over them with λ_max marked on the locus of
   maxima, the visible band painted under it; the classical theory as a
   choice, whose curve climbs without limit at short wavelengths. Still.
   Axes fixed: 0 to 3.0 μm and 0 to 10 arbitrary units, as the book's.
===================================================================== */
(function () {
  const d = sim('sim-blackbody', 560);
  const B = { l: 150, r: 1250, t: 110, b: 470 };
  const C2 = 14388;                                /* μm K, hc/k of Planck's formula */
  const raw = (lam, T) => 1 / (Math.pow(lam, 5) * (Math.exp(C2 / (lam * T)) - 1));
  const S = 9.5 / raw(2898 / 6000, 6000);          /* arbitrary units: the 6000 K maximum stands at 9.5, as the book draws it */
  const planck = (T) => (lam) => (lam <= 0.02 ? 0 : S * raw(lam, T));
  const classical = (T) => (lam) => (lam <= 0.02 ? 1e6 : (S * T) / (C2 * Math.pow(lam, 4)));
  const T = ctl(d.controls, { label: '\\kT', cls: 'temperature', min: 2000, max: 6000, step: 10, value: 5000, unit: 'K', dec: 0, aria: 'temperature of the blackbody',
    detents: [3000, 4000, 5000, 6000], specials: [{ at: 5523, label: '5250 °C, the sun' }] });
  const TH = F.choice(d.controls, { label: '\\text{theory}', options: [{ value: 'planck', label: 'observed (Planck)' }, { value: 'classical', label: 'classical' }], value: 'planck', aria: 'observed curve or the classical prediction' });
  function draw() {
    const { ctx } = begin(d.c);
    const Tv = T.v, cw = C('wavelength'), ct = C('temperature'), lm = 2898 / Tv, clas = TH.value === 'classical';
    const { X, Y } = axes(ctx, B, [0, 3], [0, 10], { nx: 6, ny: 5, fx: (v) => fmt(v, 1), xl: 'wavelength λ (μm)', xc: cw, yl: 'intensity (arbitrary units)' });
    const clip = (f) => { ctx.save(); ctx.beginPath(); ctx.rect(B.l, B.t - 2, B.r - B.l, B.b - B.t + 4); ctx.clip(); f(); ctx.restore(); };
    /* the regions */
    [0.4, 0.7].forEach((v) => line(ctx, X(v), B.t, X(v), B.b, alpha(PAL.ink, 0.35), 2, [10, 10]));
    text(ctx, 'UV', X(0.2), B.t + 18, PAL.muted, { size: 16, align: 'center' });
    text(ctx, 'visible', X(0.6), B.t + 18, PAL.muted, { size: 16, align: 'center' });
    text(ctx, 'infrared', X(1.6), B.t + 18, PAL.muted, { size: 16, align: 'center' });
    /* the visible band under the observed curve, in the colours of that light */
    clip(() => paintVisible(ctx, (nm) => X(nm / 1000), B.b, (nm) => Math.max(B.t, Y(planck(Tv)(nm / 1000)))));
    /* the chosen curve's two labels first, so a faint name that would sit on them is left to the caption */
    const lamS = 'λ_{max} = ' + fmt(lm, 3) + ' μm', lx = X(lm) + 16, ly = Math.max(B.t + 44, Y(planck(Tv)(lm)) - 24), lw = F.measure(ctx, lamS, { size: 18, weight: 600 });
    const xT = Math.min(2.85, lm + 0.5), tx = X(xT), ty0 = Math.max(B.t + 70, Y(planck(Tv)(xT)) - 20), ty = !clas && tx < lx + lw * 1.25 + 24 && Math.abs(ty0 - ly) < 28 ? ly - 30 : ty0, tw = F.measure(ctx, Tv + ' K', { size: 20, weight: 600 });
    const taken = [[lx, ly, lx + lw], [tx, ty, tx + tw]];
    /* the book's four temperatures, faint, named at their maxima */
    [3000, 4000, 5000, 6000].forEach((t0) => {
      clip(() => F.curve(ctx, planck(t0), 0.05, 3, X, Y, alpha(PAL.ink, 0.25), 2, 160));
      const px = X(2898 / t0 + 0.2), py = Math.max(B.t + 44, Y(planck(t0)(2898 / t0 + 0.08)) - 6);
      const pw = F.measure(ctx, t0 + ' K', { size: 16 });
      const onCurve = [0, 0.5, 1].some((f) => Math.abs(py - Y(planck(Tv)(2898 / t0 + 0.2 + (f * pw * 1.2 * 3) / (B.r - B.l)))) < 18);
      if (Math.abs(t0 - Tv) > 150 && !onCurve && !taken.some(([a, y, b]) => px < b * 1.02 + 24 && px + pw * 1.25 > a - 24 && Math.abs(py - y) < 28)) text(ctx, t0 + ' K', px, py, alpha(ct, 0.8), { size: 16, align: 'left' });
    });
    /* the locus of maxima, λ_max against the peak height, for 2000 to 7000 K */
    clip(() => {
      ctx.save(); ctx.strokeStyle = alpha(cw, 0.6); ctx.lineWidth = 2; ctx.setLineDash([6, 8]); ctx.beginPath();
      for (let t0 = 2000; t0 <= 7000; t0 += 50) { const x = X(2898 / t0), y = Y(planck(t0)(2898 / t0)); if (t0 === 2000) ctx.moveTo(x, y); else ctx.lineTo(x, y); }
      ctx.stroke(); ctx.restore();
    });
    /* the observed curve, dashed behind the classical one when that theory is chosen */
    if (clas || TH.k < 1) clip(() => F.curve(ctx, planck(Tv), 0.05, 3, X, Y, alpha(PAL.ink, 0.45), 2.5, 200));
    clip(() => TH.curve(ctx, (v) => (v === 'classical' ? classical(Tv) : planck(Tv)), 0.05, 3, X, Y, PAL.ink, 5, 300));
    /* λ_max, or the catastrophe */
    const pk = planck(Tv)(lm);
    TH.only(ctx, 'planck', () => {
      F.pinned(ctx, B, X, Y, lm, pk, cw);
      text(ctx, lamS, lx, ly, cw, { size: 18, weight: 600, bg: PAL.panel });
    });
    TH.only(ctx, 'classical', () => {
      const xa = X(Math.pow((S * Tv) / (C2 * 10), 0.25));
      arrow(ctx, xa + 90, B.t + 70, xa + 12, B.t + 12, PAL.ink, 3);
      text(ctx, 'the ultraviolet catastrophe', xa + 96, B.t + 78, PAL.ink, { size: 18, weight: 600, bg: PAL.panel });
    });
    text(ctx, Tv + ' K', tx, ty, ct, { size: 20, weight: 600, align: 'left', bg: PAL.panel });
    topline(ctx, clas
      ? 'At ' + Tv + ' K the classical curve climbs without limit as the wavelength shrinks.'
      : 'At ' + Tv + ' K (' + fmt(Tv - 273, 0) + ' °C) the curve reaches its maximum at ' + fmt(lm * 1000, 0) + ' nm, ' + (lm * 1000 < 400 ? 'in the ultraviolet' : lm * 1000 <= 700 ? 'in the visible' : 'in the infrared') + '.');
    readout(d.readout,
      `\\klammax=${fmt(lm * 1000, 0)}\\ \\text{nm at}\\ \\kT=${Tv}\\ \\text{K}`,
      clas
        ? 'With vibrating atoms allowed any energy, the intensity grows without limit at short wavelengths; restricting each frequency to the energies $\\kE=nh\\knu$ makes the curve turn down, as observed.'
        : 'Planck’s quantized energies, $\\kE=nh\\knu$, give the observed curve.');
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 6.11: the photoelectric effect. Photons of one wavelength strike
   a metal whose electrons are held by 3.21 × 10⁻¹⁹ J (the metal the
   book's two speeds imply); above that energy each photon frees one
   electron, which leaves with the rest. Moving: photons arrive and
   electrons fly, at a rate the brightness sets.
===================================================================== */
(function () {
  const d = sim('sim-photoelectric', 560);
  const W0 = 3.21e-19;                              /* J, the threshold energy */
  const L0 = (HP * CL / W0) * 1e9;                  /* nm, the threshold wavelength, 619 nm */
  const LAM = ctl(d.controls, { label: '\\klam', cls: 'wavelength', min: 200, max: 800, step: 1, value: 550, unit: 'nm', dec: 0, aria: 'wavelength of the light',
    detents: [700, 550, 400], specials: [{ at: Math.round(L0), label: 'threshold' }] });
  const BR = ctl(d.controls, { label: '\\text{brightness}', cls: '', min: 1, max: 8, step: 1, value: 3, unit: 'photons/s', dec: 0, aria: 'brightness, the number of photons arriving each second' });
  const LOOP = 8, cy = cycle(() => LOOP, 0);
  const MT = { l: 420, r: 1180, y: 430 };           /* the metal's surface */
  const SRC = [340, 110], TRAVEL = 1.1;              /* where the light comes from, and the seconds a photon takes to reach the surface */
  const hash = (i) => { const s = Math.sin(i * 12.9898) * 43758.5453; return s - Math.floor(s); };
  let hits = []; F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c);
    hits = [];
    const nm = LAM.v, E = (HP * CL) / (nm * 1e-9), nu = CL / (nm * 1e-9), KE = E - W0, out = KE > 0;
    const v = out ? Math.sqrt((2 * KE) / ME) : 0, t = cy.now();
    const cw = C('wavelength'), cf = C('frequency'), ce = C('energy'), cv = C('velocity'), cm = F.ref('metal'), cel = F.el('e-'), pc = lightOr(nm);
    /* the metal */
    ctx.save(); ctx.fillStyle = alpha(cm, 0.18); ctx.strokeStyle = cm; ctx.lineWidth = 3;
    ctx.fillRect(MT.l, MT.y, MT.r - MT.l, 70); ctx.strokeRect(MT.l, MT.y, MT.r - MT.l, 70); ctx.restore();
    text(ctx, 'metal', (MT.l + MT.r) / 2, MT.y + 36, cm, { size: 20, weight: 600, align: 'center' });
    hits.push({ x: (MT.l + MT.r) / 2, y: MT.y + 35, r: 60, name: 'the metal, whose electrons are held by 3.21 × 10⁻¹⁹ J' });
    /* photons: short packets of their own wavelength travelling from the source to the surface */
    const n = BR.v * LOOP, pw = 10 + nm / 22;
    for (let i = 0; i < n; i++) {
      const t0 = (i / n) * LOOP, age = (((t - t0) % LOOP) + LOOP) % LOOP;
      const hx = MT.l + 60 + hash(i + 1) * (MT.r - MT.l - 220), hy = MT.y;
      if (age < TRAVEL) {
        const k = age / TRAVEL, px = SRC[0] + (hx - SRC[0]) * k, py = SRC[1] + (hy - SRC[1]) * k;
        const ux = (hx - SRC[0]), uy = (hy - SRC[1]), ul = Math.hypot(ux, uy), bl = 2.2 * pw;
        waveBetween(ctx, px - (ux / ul) * bl, py - (uy / ul) * bl, px, py, pw, 9, -age * 40, pc, 3.5);
        hits.push({ x: px, y: py, r: 16, name: 'a photon of ' + nm + ' nm' });
      } else if (out) {
        const s = (age - TRAVEL) * (260 * v / 6.2e5), ex = hx + s * 0.62, ey = hy - s * 0.78;
        if (ey > 130 && ex < 1380) {
          line(ctx, hx, hy, ex, ey, alpha(PAL.ink, 0.18), 2);
          dot(ctx, ex, ey, cel, true, 8);
          hits.push({ x: ex, y: ey, r: 13, name: 'an ejected electron' });
        }
      } else if (age < TRAVEL + 0.25) {
        F.faded(ctx, 1 - (age - TRAVEL) / 0.25, [0, 0], () => dot(ctx, hx, hy, pc, false, 12 * (1 + (age - TRAVEL) * 3)));
      }
    }
    /* the light's own numbers beside its source */
    text(ctx, 'λ = ' + nm + ' nm', 60, 190, cw, { size: 20, weight: 600 });
    text(ctx, 'ν = ' + sciU(nu) + ' Hz', 60, 222, cf, { size: 20, weight: 600 });
    text(ctx, 'E = hν = ' + sciU(E) + ' J', 60, 254, ce, { size: 20, weight: 600 });
    text(ctx, out ? 'v_{max} = ' + sciU(v) + ' m/s' : 'no electrons ejected', 1360, 330, out ? cv : PAL.muted, { size: 20, weight: 600, align: 'right' });
    topline(ctx, out
      ? 'Each photon of ' + nm + ' nm carries more than the threshold energy, so every one frees an electron, which leaves at up to ' + sciU(v) + ' m/s.'
      : 'Each photon of ' + nm + ' nm carries less than the threshold energy, so no electron leaves the metal however bright the light.');
    readout(d.readout, out
      ? `\\kKE=\\kE-\\kE_{\\text{threshold}}=${sciT(E)}\\ \\text{J}-${sciT(W0)}\\ \\text{J}=${sciT(KE)}\\ \\text{J}`
      : `\\kE=\\frac{h\\kc}{\\klam}=${sciT(E)}\\ \\text{J}<\\kE_{\\text{threshold}}=${sciT(W0)}\\ \\text{J}`,
      out
        ? undefined
        : 'Light of wavelength longer than ' + fmt(L0, 0) + ' nm, a frequency below ' + sciU(CL / (L0 * 1e-9)) + ' Hz, ejects nothing.');
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();
};
