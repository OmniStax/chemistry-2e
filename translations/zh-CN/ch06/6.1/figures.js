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
const colorName = (nm) => (nm < 450 ? '紫色' : nm < 495 ? '蓝色' : nm < 570 ? '绿色' : nm < 590 ? '黄色' : nm < 620 ? '橙色' : '红色');
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
  const NU = ctl(d.controls, { label: '\\knu', cls: 'frequency', min: 1, max: 12, step: 0.1, value: 3, unit: 'Hz', dec: 1, aria: '波的频率', detents: [3, 6, 12], snap: true, onInput: () => cy.reset() });
  const A = ctl(d.controls, { label: 'a', cls: '', min: 0.2, max: 1.2, step: 0.01, value: 0.8, unit: 'm', dec: 2, aria: '波的振幅' });
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
    text(ctx, '1 秒内传播的距离，12 m', X0 + 12, 132, PAL.muted, { size: 17, align: 'left', bg: PAL.panel });
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
    hits.push({ x: xc, y: Y - a * PX, r: 14, name: '穿过画面时被跟踪的波峰' });
    /* the wavelength as a measure fixed above the frame, and the amplitude beside the held end */
    const lw = lam * PX, bx = X0 + Math.max(0, (X1 - X0 - lw) / 2);
    hbracket(ctx, bx, bx + lw, Y - 1.2 * PX - 12, cw, 'λ = ' + fmt(lam, 2) + ' m');
    vbracket(ctx, 90, Y - a * PX, Y, PAL.ink, 'a', -1);
    /* the crests that have passed the second line */
    const passed = Math.max(0, Math.floor(nu * t + 1e-6));
    text(ctx, '越过右侧虚线的波峰数：' + passed, X1, 450, cf, { size: 18, weight: 600, align: 'right' });
    text(ctx, 't = ' + fmt(t, 2) + ' s', X0, 450, PAL.muted, { size: 18, align: 'left' });
    topline(ctx, '在 ' + fmt(nu, 1) + ' Hz 时，波长为 ' + fmt(lam, 2) + ' m，波在 1 秒内传播的 12 m 中容得下 ' + fmt(nu, 1) + ' 个波长。');
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
    { name: 'γ 射线', a: -12, b: -11 }, { name: 'X 射线', a: -11, b: -8 }, { name: '紫外线', a: -8, b: Math.log10(4e-7) },
    { name: '可见光', a: Math.log10(4e-7), b: Math.log10(7e-7) }, { name: '红外线', a: Math.log10(7e-7), b: -4 },
    { name: '太赫兹波', a: -4, b: -3 }, { name: '微波', a: -3, b: -1 }, { name: '无线电波', a: -1, b: 3 },
  ];
  const regionOf = (lg) => REGIONS.find((r) => lg >= r.a && lg <= r.b) ?? REGIONS[REGIONS.length - 1];
  const LG = ctl(d.controls, { label: '\\log_{10}(\\klam/\\text{m})', cls: 'wavelength', min: LO, max: HI, step: 0.01, value: Math.log10(589e-9), unit: '', dec: 2, aria: '波长，以米为单位的十的幂',
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
      if (r.name === '可见光') return;
      text(ctx, r.name, (X(r.a) + X(r.b)) / 2, SY, PAL.ink, { size: r.b - r.a < 1.2 ? 14 : 17, align: 'center', bg: PAL.soft });
    });
    const vx = (X(REGIONS[3].a) + X(REGIONS[3].b)) / 2;
    line(ctx, vx, SY - SH / 2 - 4, vx, SY - SH / 2 - 16, PAL.muted, 1.5);
    text(ctx, '可见光', vx, SY - SH / 2 - 76, PAL.muted, { size: 15, align: 'center', bg: PAL.panel });
    /* the wavelength scale */
    line(ctx, L, SY + SH / 2, R, SY + SH / 2, cw, 2);
    for (let p = LO; p <= HI; p += 1) { line(ctx, X(p), SY + SH / 2, X(p), SY + SH / 2 + 9, cw, 2); if ((p - LO) % 3 === 0) text(ctx, '10' + sup(p), X(p), SY + SH / 2 + 28, cw, { size: 17, align: 'center' }); }
    text(ctx, '波长 λ（m）', R, SY + SH / 2 + 56, cw, { size: 19, weight: 600, align: 'right' });
    /* the frequency scale runs the other way: ν = c/λ */
    line(ctx, L, NY, R, NY, cf, 2);
    for (let q = 6; q <= 20; q += 1) { const x = X(Math.log10(CL) - q); if (x < L - 1 || x > R + 1) continue; line(ctx, x, NY - 9, x, NY, cf, 2); if (q % 3 === 0) text(ctx, '10' + sup(q), x, NY + 22, cf, { size: 17, align: 'center' }); }
    const x = X(lg), side = x > 900 ? 'right' : 'left', dx = side === 'right' ? -14 : 14;
    /* an axis title moves to the left end where the marked value would sit on it */
    const title = (s, y, col, val) => { const w = F.measure(ctx, s, { size: 19, weight: 600 }), vw = F.measure(ctx, val, { size: 18, weight: 600 }), v0 = side === 'right' ? x + dx - vw : x + dx, left = v0 + vw > R - w - 12;
      text(ctx, s, left ? L : R, y, col, { size: 19, weight: 600, align: left ? 'left' : 'right' }); };
    title('频率 ν（Hz），向左增大', NY - 26, cf, lenU(lam));
    /* the energy of one photon, E = hν */
    line(ctx, L, EY, R, EY, ce, 2);
    for (let q = -28; q <= -13; q += 1) { const x = X(Math.log10(HP * CL) - q); if (x < L - 1 || x > R + 1) continue; line(ctx, x, EY - 9, x, EY, ce, 2); if (q % 3 === 0) text(ctx, '10' + sup(q), x, EY + 22, ce, { size: 17, align: 'center' }); }
    title('单个光子的能量 E（J），向左增大', EY - 26, ce, freqU(nu));
    /* the chosen wavelength through all three scales */
    line(ctx, x, SY - SH / 2 - 10, x, EY + 6, alpha(PAL.ink, 0.5), 2, [4, 8]);
    line(ctx, x, SY - SH / 2, x, SY + SH / 2, visible(nm) ? PAL.ink : cw, 4);
    dot(ctx, x, SY - SH / 2 - 12, lightOr(nm), true, 10);
    dot(ctx, x, NY, cf, true, 8); dot(ctx, x, EY, ce, true, 8);
    text(ctx, lenU(lam), x + dx, SY + SH / 2 + 84, cw, { size: 18, weight: 600, align: side, bg: PAL.panel });
    text(ctx, freqU(nu), x + dx, NY + 48, cf, { size: 18, weight: 600, align: side, bg: PAL.panel });
    text(ctx, sciU(E) + ' J', x + dx, EY + 48, ce, { size: 18, weight: 600, align: side, bg: PAL.panel });
    const reg = regionOf(lg);
    topline(ctx, '波长为 ' + lenU(lam) + ' 的辐射是' + (reg.name === '可见光' ? colorName(nm) + '的可见光' : reg.name) + '，频率为 ' + freqU(nu) + '，每个光子的能量为 ' + sciU(E) + ' J。');
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
  const MODE = F.choice(d.controls, { label: '\\text{调制方式}', options: [{ value: 'am', label: 'AM' }, { value: 'fm', label: 'FM' }], value: 'am', aria: '调幅或调频' });
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
    text(ctx, '信号', R + 20, SY, cs, { size: 20, weight: 600 });
    MODE.curve(ctx, carrier, 0, 1, Xs, Yc, cc, 3.5, 900);
    MODE.only(ctx, 'am', () => text(ctx, 'AM', R + 20, CYc, cc, { size: 22, weight: 600 }));
    MODE.only(ctx, 'fm', () => text(ctx, 'FM', R + 20, CYc, cc, { size: 22, weight: 600 }));
    /* guide lines from the signal's crests and trough down to the carrier */
    [1 / 3, 2 / 3, 0.985].forEach((s, i) => { line(ctx, Xs(s), Ys(sig(s)) + 12, Xs(s), CYc - 110, alpha(PAL.ink, 0.3), 1.5, [4, 8]); text(ctx, i === 1 ? '波谷' : '波峰', Xs(s), CYc + 112, PAL.muted, { size: 16, align: 'center' }); });
    topline(ctx, m === 'am'
      ? '在 AM 中，载波的频率保持不变，其振幅在信号的波峰下最大，在信号的波谷下最小。'
      : '在 FM 中，载波的振幅保持不变，其波在信号的波峰下挤在一起，在信号的波谷下分开。');
    readout(d.readout, m === 'am'
      ? `\\knu_{\\text{载波}}=1000\\ \\text{kHz，固定}`
      : `\\knu_{\\text{载波}}=100.0\\ \\text{MHz}\\pm0.075\\ \\text{MHz}`,
      m === 'am'
        ? 'AM 电台的广播频段为 540 至 2830 kHz。'
        : 'FM 电台在 87.5 至 108.0 MHz 的频段内，其载波的摆动仅为 75 kHz；图中夸大了这一摆动，以便能够看见。');
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 6.6: the fringes of light through two narrow slits, redrawn
   faithfully from the book's four bands, since the bundle's image keeps
   only the red one. Each band is the two-slit pattern, cos² of the fringe
   phase under the single-slit envelope, with its fringe spacing in
   proportion to λ; white light is the sum of the visible wavelengths, so
   its centre is white and its outer fringes part into colours. The
   brightness is shown as its square root, as the camera's exposure does.
   Still: a photograph has nothing to vary and no clock. The black is the
   dark of the photograph, and the bands wear the colours of their light.
===================================================================== */
const DARK = '#000000';
(function () {
  const d = sim('fig-fringes', 380);
  const X0 = 300, X1 = 1370, XC = (X0 + X1) / 2, TOP = 28, BH = 64, GAP = 22;
  const PX_PER_NM = 0.032, ENV = 5;   /* fringe spacing 20.8 units at 650 nm; slit spacing five slit widths */
  const BANDS = [
    { name: '白光', nm: null },
    { name: '红光', nm: 650 },
    { name: '绿光', nm: 532 },
    { name: '蓝光', nm: 450 },
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
  const d = sim('sim-string', 440);
  const N = F.choice(d.controls, { label: 'n', options: [1, 2, 3, 4, 5, 6].map((k) => ({ value: String(k), label: String(k) })), value: '3', aria: '弦上的半波长个数' });
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
    text(ctx, '固定端', L - 11, Y + 84, PAL.muted, { size: 16, align: 'center' });
    text(ctx, '固定端', R + 11, Y + 84, PAL.muted, { size: 16, align: 'center' });
    /* the nodes between the ends, one labelled */
    for (let k = 1; k < n; k++) { const x = Xs(k / n); dot(ctx, x, Y, PAL.ink, false, 10); hits.push({ x, y: Y, r: 14, name: '节点，不运动' }); }
    if (n > 1) text(ctx, '节点', Xs(1 / n), Y + 38, PAL.ink, { size: 18, weight: 600, align: 'center', bg: PAL.panel });
    /* one half-wavelength measured below the string */
    hbracket(ctx, Xs(0), Xs(1 / n), Y + AMP + 40, cw, 'λ/2 = ' + fmt(1 / n, 3) + ' m', { side: 'below' });
    const lam = 2 / n;
    topline(ctx, '两端之间有 n = ' + n + ' 个半波长时，弦上有 ' + (n - 1) + ' 个节点，波长为 ' + fmt(lam, 3) + ' m。');
    readout(d.readout,
      `\\klam=\\frac{2L}{n}=\\frac{2(1.00\\ \\text{m})}{${n}}=${fmt(lam, 3)}\\ \\text{m}`,
      '两个固定端之间只能容纳整数个半波长，因此波长是量子化的。');
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
  const T = ctl(d.controls, { label: '\\kT', cls: 'temperature', min: 2000, max: 6000, step: 10, value: 5000, unit: 'K', dec: 0, aria: '黑体的温度',
    detents: [3000, 4000, 5000, 6000], specials: [{ at: 5523, label: '5250 °C，太阳' }] });
  const TH = F.choice(d.controls, { label: '\\text{理论}', options: [{ value: 'planck', label: '观测值（普朗克）' }, { value: 'classical', label: '经典理论' }], value: 'planck', aria: '观测曲线或经典理论的预测' });
  function draw() {
    const { ctx } = begin(d.c);
    const Tv = T.v, cw = C('wavelength'), ct = C('temperature'), lm = 2898 / Tv, clas = TH.value === 'classical';
    const { X, Y } = axes(ctx, B, [0, 3], [0, 10], { nx: 6, ny: 5, fx: (v) => fmt(v, 1), xl: '波长 λ（μm）', xc: cw, yl: '强度（任意单位）' });
    const clip = (f) => { ctx.save(); ctx.beginPath(); ctx.rect(B.l, B.t - 2, B.r - B.l, B.b - B.t + 4); ctx.clip(); f(); ctx.restore(); };
    /* the regions */
    [0.4, 0.7].forEach((v) => line(ctx, X(v), B.t, X(v), B.b, alpha(PAL.ink, 0.35), 2, [10, 10]));
    text(ctx, '紫外线', X(0.2), B.t + 18, PAL.muted, { size: 16, align: 'center' });
    text(ctx, '可见光', X(0.6), B.t + 18, PAL.muted, { size: 16, align: 'center' });
    text(ctx, '红外线', X(1.6), B.t + 18, PAL.muted, { size: 16, align: 'center' });
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
      text(ctx, '紫外灾难', xa + 96, B.t + 78, PAL.ink, { size: 18, weight: 600, bg: PAL.panel });
    });
    text(ctx, Tv + ' K', tx, ty, ct, { size: 20, weight: 600, align: 'left', bg: PAL.panel });
    topline(ctx, clas
      ? '在 ' + Tv + ' K 时，经典曲线随波长缩短而无限上升。'
      : '在 ' + Tv + ' K（' + fmt(Tv - 273, 0) + ' °C）时，曲线的极大值出现在 ' + fmt(lm * 1000, 0) + ' nm 处，' + (lm * 1000 < 400 ? '位于紫外区' : lm * 1000 <= 700 ? '位于可见光区' : '位于红外区') + '。');
    readout(d.readout,
      `\\klammax=${fmt(lm * 1000, 0)}\\ \\text{nm，}\\kT=${Tv}\\ \\text{K}`,
      clas
        ? '允许振动的原子具有任意能量时，强度在短波长处无限增大；把每个频率限制在能量 $\\kE=nh\\knu$ 上，曲线就会下降，与观测结果一致。'
        : '普朗克的量子化能量 $\\kE=nh\\knu$ 给出了观测到的曲线。');
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
  const LAM = ctl(d.controls, { label: '\\klam', cls: 'wavelength', min: 200, max: 800, step: 1, value: 550, unit: 'nm', dec: 0, aria: '光的波长',
    detents: [700, 550, 400], specials: [{ at: Math.round(L0), label: '阈值' }] });
  const BR = ctl(d.controls, { label: '\\text{亮度}', cls: '', min: 1, max: 8, step: 1, value: 3, unit: '光子/s', dec: 0, aria: '亮度，即每秒到达的光子数' });
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
    text(ctx, '金属', (MT.l + MT.r) / 2, MT.y + 36, cm, { size: 20, weight: 600, align: 'center' });
    hits.push({ x: (MT.l + MT.r) / 2, y: MT.y + 35, r: 60, name: '金属，其电子被 3.21 × 10⁻¹⁹ J 的能量束缚' });
    /* photons: short packets of their own wavelength travelling from the source to the surface */
    const n = BR.v * LOOP, pw = 10 + nm / 22;
    for (let i = 0; i < n; i++) {
      const t0 = (i / n) * LOOP, age = (((t - t0) % LOOP) + LOOP) % LOOP;
      const hx = MT.l + 60 + hash(i + 1) * (MT.r - MT.l - 220), hy = MT.y;
      if (age < TRAVEL) {
        const k = age / TRAVEL, px = SRC[0] + (hx - SRC[0]) * k, py = SRC[1] + (hy - SRC[1]) * k;
        const ux = (hx - SRC[0]), uy = (hy - SRC[1]), ul = Math.hypot(ux, uy), bl = 2.2 * pw;
        waveBetween(ctx, px - (ux / ul) * bl, py - (uy / ul) * bl, px, py, pw, 9, -age * 40, pc, 3.5);
        hits.push({ x: px, y: py, r: 16, name: nm + ' nm 的光子' });
      } else if (out) {
        const s = (age - TRAVEL) * (260 * v / 6.2e5), ex = hx + s * 0.62, ey = hy - s * 0.78;
        if (ey > 130 && ex < 1380) {
          line(ctx, hx, hy, ex, ey, alpha(PAL.ink, 0.18), 2);
          dot(ctx, ex, ey, cel, true, 8);
          hits.push({ x: ex, y: ey, r: 13, name: '逸出的电子' });
        }
      } else if (age < TRAVEL + 0.25) {
        F.faded(ctx, 1 - (age - TRAVEL) / 0.25, [0, 0], () => dot(ctx, hx, hy, pc, false, 12 * (1 + (age - TRAVEL) * 3)));
      }
    }
    /* the light's own numbers beside its source */
    text(ctx, 'λ = ' + nm + ' nm', 60, 190, cw, { size: 20, weight: 600 });
    text(ctx, 'ν = ' + sciU(nu) + ' Hz', 60, 222, cf, { size: 20, weight: 600 });
    text(ctx, 'E = hν = ' + sciU(E) + ' J', 60, 254, ce, { size: 20, weight: 600 });
    text(ctx, out ? 'v_{max} = ' + sciU(v) + ' m/s' : '没有电子逸出', 1360, 330, out ? cv : PAL.muted, { size: 20, weight: 600, align: 'right' });
    topline(ctx, out
      ? '每个 ' + nm + ' nm 的光子所带的能量都超过阈值能量，所以每个光子都能使一个电子逸出，电子离开时的速率最高可达 ' + sciU(v) + ' m/s。'
      : '每个 ' + nm + ' nm 的光子所带的能量都小于阈值能量，所以无论光多亮，都没有电子离开金属。');
    readout(d.readout, out
      ? `\\kKE=\\kE-\\kE_{\\text{阈}}=${sciT(E)}\\ \\text{J}-${sciT(W0)}\\ \\text{J}=${sciT(KE)}\\ \\text{J}`
      : `\\kE=\\frac{h\\kc}{\\klam}=${sciT(E)}\\ \\text{J}<\\kE_{\\text{阈}}=${sciT(W0)}\\ \\text{J}`,
      out
        ? undefined
        : '波长长于 ' + fmt(L0, 0) + ' nm、频率低于 ' + sciU(CL / (L0 * 1e-9)) + ' Hz 的光不会使任何电子逸出。');
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();
};
