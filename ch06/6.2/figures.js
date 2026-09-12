/* Figures for section 6.2 The Bohr Model. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['6.2'] = function (root, F) {
const { el, fmt, tex, C, PAL, alpha, ctl, cycle, register, begin, line, arrow, dot, text, topline, vbracket } = F;
const sim = (id, H) => F.sim(root, id, H);
function readout(host, main, small) { tex(host, main); if (small) host.appendChild(el('small', null, small)); }

/* ---------- the model's constants, as the book states them ---------- */
const K = 2.179e-18;          /* J, the constant k that gathers the fundamental constants together */
const HP = 6.626e-34;         /* J s, Planck's constant */
const CL = 2.998e8;           /* m/s, the speed of light */
const A0 = 5.292e-11;         /* m, the Bohr radius */
const RINF = K / (HP * CL);   /* m⁻¹, the Rydberg constant as the model recovers it */
const energy = (n, Z) => -K * Z * Z / (n * n);                                   /* J */
const lambdaNm = (n1, n2, Z) => (HP * CL / Math.abs(energy(n2, Z) - energy(n1, Z))) * 1e9;   /* nm */
const radiusM = (n, Z) => (n * n / Z) * A0;

/* ---------- number formatting ---------- */
const SUP = { '-': '⁻', '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹' };
const sup = (s) => String(s).split('').map((c) => SUP[c] ?? c).join('');
const expOf = (x) => Math.floor(Math.log10(Math.abs(x)));
/* a number in scientific form for the canvas: −2.421 × 10⁻¹⁹ */
function sciU(x, d = 3) {
  if (x === 0) return '0';
  const e = expOf(x), m = x / Math.pow(10, e);
  return (m < 0 ? '−' : '') + Math.abs(m).toFixed(d) + ' × 10' + sup(e);
}
/* the same for KaTeX */
function sciT(x, d = 3) {
  if (x === 0) return '0';
  const e = expOf(x), m = x / Math.pow(10, e);
  return (m < 0 ? '-' : '') + Math.abs(m).toFixed(d) + '\\times10^{' + e + '}';
}
/* a wavelength in nanometres to a sensible number of figures */
const nmU = (nm) => (nm < 100 ? fmt(nm, 2) : nm < 10000 ? fmt(nm, 1) : Math.round(nm).toString()) + ' nm';

/* ---------- the colours of light, which are a physical fact and not a type ---------- */
/* The visible band from 400 to 700 nm in the hue of that light (the usual linear approximation);
   a line outside it has a wavelength and no colour, and is drawn in the wavelength hue. */
function lightColor(nm) {
  let r = 0, g = 0, b = 0;
  if (nm < 440) { r = -(nm - 440) / 60; b = 1; }
  else if (nm < 490) { g = (nm - 440) / 50; b = 1; }
  else if (nm < 510) { g = 1; b = -(nm - 510) / 20; }
  else if (nm < 580) { r = (nm - 510) / 70; g = 1; }
  else if (nm < 645) { r = 1; g = -(nm - 645) / 65; }
  else { r = 1; }
  const f = nm < 430 ? 0.45 + 0.55 * (nm - 400) / 30 : nm > 660 ? 0.45 + 0.55 * (700 - nm) / 40 : 1;
  const ch = (v) => Math.round(255 * Math.pow(v * f, 0.8));
  return `rgb(${ch(r)},${ch(g)},${ch(b)})`;
}
const visible = (nm) => nm >= 400 && nm <= 700;
const lineColor = (nm) => (visible(nm) ? lightColor(nm) : C('wavelength'));
/* the region of the spectrum a wavelength falls in, in the book's words */
function region(nm) {
  if (nm < 400) return 'ultraviolet light';
  if (nm > 700) return 'infrared light';
  return (nm < 450 ? 'violet' : nm < 495 ? 'blue' : nm < 570 ? 'green' : nm < 590 ? 'yellow' : nm < 620 ? 'orange' : 'red') + ' light';
}

/* ---------- a logarithmic wavelength axis from 10 nm to 10 000 nm ----------
   One fixed frame holds the ultraviolet, the visible band and the infrared at every
   nuclear charge: the lines of Li²⁺ fall near 10 nm and the longest transition the
   sliders reach lies near 4000 nm. The band is painted in the colours of light. */
const LOGLO = 1, LOGHI = 4;
const TICKS = [10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000];
function wavelengthAxis(ctx, box, h, title, inside) {
  const X = (nm) => box.l + ((Math.log10(nm) - LOGLO) / (LOGHI - LOGLO)) * (box.r - box.l);
  const y = box.y, cw = C('wavelength');
  const ry = inside ? y : y - h / 2 - 12;   /* the region names sit inside the strip where lines stand above it */
  ctx.save(); ctx.fillStyle = PAL.soft; ctx.fillRect(box.l, y - h / 2, box.r - box.l, h); ctx.restore();
  /* the visible band, painted sliver by sliver */
  const N = 96;
  for (let i = 0; i < N; i++) {
    const a = 400 + (300 * i) / N, b = 400 + (300 * (i + 1)) / N;
    ctx.save(); ctx.fillStyle = lightColor((a + b) / 2); ctx.fillRect(X(a), y - h / 2, X(b) - X(a) + 0.6, h); ctx.restore();
  }
  if (!inside) text(ctx, 'visible', X(530), ry, PAL.muted, { size: 15, align: 'center' });
  text(ctx, 'ultraviolet', X(60), ry, PAL.muted, { size: 15, align: 'center' });
  text(ctx, 'infrared', X(2500), ry, PAL.muted, { size: 15, align: 'center' });
  line(ctx, box.l, y + h / 2, box.r, y + h / 2, cw, 2);
  TICKS.forEach((t) => { line(ctx, X(t), y + h / 2, X(t), y + h / 2 + 9, cw, 2); text(ctx, t >= 1000 ? (t / 1000) + ' µm' : String(t), X(t), y + h / 2 + 28, cw, { size: 17, align: 'center' }); });
  text(ctx, title, box.r, y + h / 2 + 60, cw, { size: 20, weight: 600, align: 'right' });
  return X;
}

/* ---------- the energy ladder ----------
   Rungs at heights in proportion to E_n = −kZ²/n², so the ladder is to scale for every Z: the
   floor is n = 1 and the top is the ionization limit, E = 0. The labels of the crowded upper
   rungs fan out on leaders so that each can be read. */
function ladderY(n, top, bottom) { return bottom - (bottom - top) * (1 - 1 / (n * n)); }
function ladder(ctx, o) {
  const { l, r, top, bottom, nmax, Z, labelX } = o, ce = C('energy');
  const ys = [];
  for (let n = 1; n <= nmax; n++) ys.push({ n, y: ladderY(n, top, bottom), E: energy(n, Z) });
  ys.push({ n: Infinity, y: top, E: 0 });
  /* the rungs */
  ys.forEach((q) => line(ctx, l, q.y, r, q.y, ce, q.n === Infinity ? 2.5 : 4, q.n === Infinity ? [10, 10] : undefined));
  /* the energy axis */
  arrow(ctx, l - 40, bottom + 6, l - 40, top - 34, ce, 3);
  text(ctx, 'E', l - 40, top - 52, ce, { size: 24, weight: 600, align: 'center' });
  /* the labels, fanned out from the top down with a slot spacing of 28 */
  const slots = []; let last = -Infinity;
  [...ys].sort((a, b) => a.y - b.y).forEach((q) => { const y = Math.max(q.y, last + 28); slots.push({ ...q, sy: y }); last = y; });
  slots.forEach((q) => {
    if (Math.abs(q.sy - q.y) > 2) line(ctx, r, q.y, labelX - 12, q.sy, alpha(PAL.ink, 0.35), 1.5);
    else line(ctx, r, q.y, labelX - 12, q.y, alpha(PAL.ink, 0.35), 1.5);
    const name = q.n === Infinity ? 'n → ∞' : 'n = ' + q.n;
    text(ctx, name, labelX, q.sy, PAL.ink, { size: 19, weight: 600 });
    text(ctx, (q.n === Infinity ? '0' : sciU(q.E)) + ' J', labelX + 88, q.sy, ce, { size: 18 });
  });
  text(ctx, 'n', labelX, top - 36, PAL.ink, { size: 19, weight: 600 });
  text(ctx, 'Eₙ', labelX + 88, top - 36, ce, { size: 19, weight: 600 });
  return Object.fromEntries(ys.map((q) => [q.n, q.y]));
}

/* ---------- a photon: a short wave packet travelling along a path ---------- */
function photon(ctx, x, y, dirx, diry, color) {
  const L = 84, A = 10, px = -diry, py = dirx;
  ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = 3.5; ctx.beginPath();
  for (let i = 0; i <= 28; i++) {
    const s = -L / 2 + (L * i) / 28, env = Math.cos((Math.PI * s) / L), w = A * env * Math.sin((s / L) * 5 * Math.PI);
    const qx = x + dirx * s + px * w, qy = y + diry * s + py * w;
    if (i) ctx.lineTo(qx, qy); else ctx.moveTo(qx, qy);
  }
  ctx.stroke(); ctx.restore();
}
const ease = (t) => (t < 0 ? 0 : t > 1 ? 1 : t * t * (3 - 2 * t));

/* =====================================================================
   FIGURE 6.14 + 6.15: the Bohr ladder. The levels of a one-electron atom
   to scale with their energies, the electron moving between two rungs, the
   photon leaving for the wavelength strip or arriving from it, and the
   line it makes. Moving: a jump and a photon are an event with a time in
   it, so the figure runs a five-second cycle and carries the transport.
===================================================================== */
(function () {
  const d = sim('sim-bohr-ladder', 820);
  const NI = ctl(d.controls, { label: 'n_{\\text{i}}', cls: '', min: 1, max: 6, step: 1, value: 3, unit: '', dec: 0, onInput: reset, aria: 'quantum number of the orbit the electron starts in' });
  const NF = ctl(d.controls, { label: 'n_{\\text{f}}', cls: '', min: 1, max: 6, step: 1, value: 2, unit: '', dec: 0, onInput: reset, aria: 'quantum number of the orbit the electron ends in' });
  const ZC = ctl(d.controls, { label: 'Z', cls: '', min: 1, max: 3, step: 1, value: 1, unit: '', dec: 0, onInput: reset, aria: 'nuclear charge' });
  const T = 5;                                   /* seconds of model time in one cycle */
  const cy = cycle(() => T, 1.2);
  const landed = new Set();                      /* the lines the reader has landed, keyed by Z and the two orbits */
  function reset() { cy.reset(); }
  const LAD = { l: 300, r: 700, top: 150, bottom: 610 };
  const STRIP = { l: 300, r: 1300, y: 706 };
  const EX = 380, AX = 520;                      /* the electron's column and the arrow's column on the ladder */
  function draw() {
    const { ctx } = begin(d.c);
    const ni = NI.v, nf = NF.v, Z = ZC.v, tau = cy.now();
    const dE = energy(nf, Z) - energy(ni, Z), emit = dE < 0, same = ni === nf;
    const nm = same ? 0 : lambdaNm(ni, nf, Z), key = `${Z}:${Math.min(ni, nf)}-${Math.max(ni, nf)}`;
    const ce = C('energy'), cw = C('wavelength'), ion = Z === 1 ? 'hydrogen' : Z === 2 ? 'He⁺' : 'Li²⁺';
    /* the phases of the cycle: an emission jumps first and the photon leaves; an absorption's photon arrives first */
    const jump = emit ? ease((tau - 1.0) / 1.0) : ease((tau - 2.2) / 1.0);
    const flight = emit ? ease((tau - 2.0) / 2.2) : ease(tau / 2.2);
    const arrived = emit ? tau >= 4.2 : true;    /* the line is on the strip once the emitted photon has landed; an absorbed photon was there from the start */
    if (!same && (emit ? tau >= 4.2 : tau >= 2.2)) landed.add(key);
    /* the ladder and the strip */
    const Y = ladder(ctx, { ...LAD, nmax: 6, Z, labelX: 790 });
    const X = wavelengthAxis(ctx, STRIP, 44, 'wavelength λ (nm), logarithmic scale');
    /* every line landed so far for this ion, the current one drawn last */
    landed.forEach((k) => {
      const [z, pair] = k.split(':'); if (+z !== Z) return;
      const [a, b] = pair.split('-').map(Number), w = lambdaNm(a, b, Z);
      line(ctx, X(w), STRIP.y - 22, X(w), STRIP.y + 22, lineColor(w), k === key ? 4 : 2.5);
    });
    if (!same && arrived) {
      line(ctx, X(nm), STRIP.y - 22, X(nm), STRIP.y + 22, lineColor(nm), 4);
      text(ctx, nmU(nm), X(nm), STRIP.y - 58, visible(nm) ? PAL.ink : cw, { size: 17, weight: 600, align: 'center', bg: PAL.panel });
    }
    /* the transition arrow and the bracket for |ΔE| */
    if (!same) {
      const y1 = Y[ni], y2 = Y[nf];
      if (jump > 0) {
        arrow(ctx, AX, y1, AX, y1 + (y2 - y1) * jump, ce, 4);
        if (jump >= 1) {
          vbracket(ctx, AX - 50, Math.min(y1, y2), Math.max(y1, y2), ce);
          text(ctx, '|ΔE| = ' + sciU(Math.abs(dE)) + ' J', AX - 68, Math.abs(y1 - y2) < 40 ? Math.max(y1, y2) + 30 : (y1 + y2) / 2, ce, { size: 18, weight: 600, align: 'right', bg: PAL.panel });
        }
      }
      /* the electron on its rung, or between them */
      dot(ctx, EX, y1 + (y2 - y1) * jump, PAL.ink, true, 9);
      /* the photon on its way, and where it starts and ends */
      const from = emit ? [AX, y2] : [X(nm), STRIP.y - 30], to = emit ? [X(nm), STRIP.y - 30] : [AX, y1];
      if (flight > 0 && flight < 1) {
        const px = from[0] + (to[0] - from[0]) * flight, py = from[1] + (to[1] - from[1]) * flight;
        const L = Math.hypot(to[0] - from[0], to[1] - from[1]) || 1;
        photon(ctx, px, py, (to[0] - from[0]) / L, (to[1] - from[1]) / L, lineColor(nm));
      }
      text(ctx, emit ? 'the electron falls and a photon leaves' : 'a photon arrives and the electron rises', 1300, 118, PAL.muted, { size: 17, align: 'right' });
    } else {
      dot(ctx, EX, Y[ni], PAL.ink, true, 9);
      text(ctx, 'the electron stays on its rung and no photon is emitted or absorbed', 1300, 118, PAL.muted, { size: 17, align: 'right' });
    }
    text(ctx, 'electron', EX - 18, same ? Y[ni] : Y[ni] + (Y[nf] - Y[ni]) * jump, PAL.muted, { size: 16, align: 'right', bg: PAL.panel });
    /* the headline and the readout */
    topline(ctx, same
      ? 'The starting and the ending orbit are both n = ' + ni + ' in ' + ion + ', so the electron keeps its energy of ' + sciU(energy(ni, Z)) + ' J and nothing is emitted or absorbed.'
      : emit
        ? 'The electron falls from n = ' + ni + ' to n = ' + nf + ' in ' + ion + ' and the atom emits a photon of ' + nmU(nm) + ', which is ' + region(nm) + '.'
        : 'A photon of ' + nmU(nm) + ', which is ' + region(nm) + ', is absorbed and the electron rises from n = ' + ni + ' to n = ' + nf + ' in ' + ion + '.');
    const main = same
      ? `\\kEn=-\\frac{kZ^2}{n^2}=-\\frac{(${sciT(K)}\\ \\text{J})(${Z})^2}{${ni}^2}=${sciT(energy(ni, Z))}\\ \\text{J}`
      : `\\kdE=kZ^2\\left(\\frac{1}{n_1^{2}}-\\frac{1}{n_2^{2}}\\right)=(${sciT(K)}\\ \\text{J})(${Z})^2\\left(\\frac{1}{${ni}^2}-\\frac{1}{${nf}^2}\\right)=${sciT(dE)}\\ \\text{J}\\qquad\\klam=\\frac{hc}{|\\kdE|}=${sciT(nm * 1e-9)}\\ \\text{m}=${nmU(nm).replace(' nm', '')}\\ \\text{nm}`;
    readout(d.readout, main, same
      ? 'Choose a different orbit for the electron to end in, and a photon carries the difference between the two energies.'
      : emit
        ? 'The energy difference is negative, so the atom emits the photon; the further apart the two rungs, the shorter the wavelength of the line.'
        : 'The energy difference is positive, so a photon of exactly this energy must be absorbed; the same photon is emitted when the electron returns.');
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();

/* =====================================================================
   SIM: the orbit and the rung. The circular orbit of the electron at a
   fixed scale on the left, its energy as a rung of the ladder on the
   right, one n slider moving both. Still: a set of orbits answers its
   sliders and nothing here has a clock.
===================================================================== */
(function () {
  const d = sim('sim-orbit-rung', 720);
  const N = ctl(d.controls, { label: 'n', cls: '', min: 1, max: 8, step: 1, value: 3, unit: '', dec: 0, aria: 'quantum number of the orbit' });
  const ZC = ctl(d.controls, { label: 'Z', cls: '', min: 1, max: 3, step: 1, value: 1, unit: '', dec: 0, aria: 'nuclear charge' });
  const SCALE = 12;                              /* canvas units per Bohr radius; n = 6 in hydrogen already runs off the frame */
  const CX = 360, CY = 400, FR = { l: 40, r: 720, t: 96, b: 690 };
  function draw() {
    const { ctx } = begin(d.c);
    const n = N.v, Z = ZC.v, ce = C('energy');
    const rA = (n * n) / Z, rM = radiusM(n, Z), E = energy(n, Z), ion = Z === 1 ? 'hydrogen' : Z === 2 ? 'He⁺' : 'Li²⁺';
    /* the orbits, clipped to their frame */
    ctx.save(); ctx.beginPath(); ctx.rect(FR.l, FR.t, FR.r - FR.l, FR.b - FR.t); ctx.clip();
    for (let m = 1; m <= 8; m++) {
      const r = (m * m / Z) * SCALE;
      ctx.save(); ctx.strokeStyle = m === n ? PAL.ink : alpha(PAL.ink, 0.28); ctx.lineWidth = m === n ? 3 : 1.5; ctx.beginPath(); ctx.arc(CX, CY, r, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
    }
    ctx.restore();
    /* the nucleus and its charge */
    dot(ctx, CX, CY, PAL.ink, true, 8);
    text(ctx, '+' + Z, CX + 14, CY - 16, PAL.ink, { size: 17, weight: 600 });
    /* the electron at the first angle that keeps it inside the frame, else a hollow marker at the frame's edge */
    const r = rA * SCALE;
    const angles = [45, 30, 60, 15, 75, 0, 90, -15, -30, -45];
    let placed = null;
    for (const a of angles) { const x = CX + r * Math.cos(a * Math.PI / 180), y = CY - r * Math.sin(a * Math.PI / 180); if (x > FR.l + 14 && x < FR.r - 14 && y > FR.t + 14 && y < FR.b - 14) { placed = [x, y]; break; } }
    if (placed) {
      line(ctx, CX, CY, placed[0], placed[1], alpha(PAL.ink, 0.4), 2, [4, 8]);
      dot(ctx, placed[0], placed[1], PAL.ink, true, 9);
      text(ctx, 'r = ' + fmt(rA, rA < 10 ? 2 : 1) + ' a₀ = ' + fmt(rM * 1e10, 2) + ' Å', placed[0] + 16, placed[1] - 18, PAL.ink, { size: 18, weight: 600, bg: PAL.panel });
    } else {
      const ex = FR.r - 20, ey = CY - (FR.r - 20 - CX) * Math.tan(Math.PI / 12);
      dot(ctx, ex, ey, PAL.ink, false, 9);
      arrow(ctx, ex - 40, ey, ex - 12, ey, PAL.ink, 3);
      text(ctx, 'r = ' + fmt(rA, 1) + ' a₀ = ' + fmt(rM * 1e10, 1) + ' Å, beyond the frame', ex - 20, ey - 24, PAL.ink, { size: 17, weight: 600, align: 'right', bg: PAL.panel });
    }
    /* the scale bar */
    line(ctx, FR.l + 20, FR.b - 18, FR.l + 20 + 10 * SCALE, FR.b - 18, PAL.ink, 3);
    line(ctx, FR.l + 20, FR.b - 26, FR.l + 20, FR.b - 10, PAL.ink, 2); line(ctx, FR.l + 20 + 10 * SCALE, FR.b - 26, FR.l + 20 + 10 * SCALE, FR.b - 10, PAL.ink, 2);
    text(ctx, '10 a₀ = 5.29 Å', FR.l + 20 + 10 * SCALE + 14, FR.b - 18, PAL.muted, { size: 16 });
    text(ctx, 'the orbits n = 1 to 8 of ' + ion, FR.l + 20, FR.t + 6, PAL.muted, { size: 16, bg: PAL.panel });
    /* the ladder on the right, with the chosen rung marked and the energy to the limit bracketed */
    const LAD = { l: 960, r: 1120, top: 176, bottom: 650 };
    const Y = ladder(ctx, { ...LAD, nmax: 8, Z, labelX: 1176 });
    line(ctx, LAD.l, Y[n], LAD.r, Y[n], ce, 7);
    dot(ctx, LAD.l + 30, Y[n], PAL.ink, true, 9);
    if (Y[n] - LAD.top > 8) vbracket(ctx, LAD.l - 70, LAD.top, Y[n], ce);
    text(ctx, 'to E = 0:', 800, (LAD.top + Y[n]) / 2 - 14, ce, { size: 17, weight: 600, align: 'center', bg: PAL.panel });
    text(ctx, sciU(-E) + ' J', 800, (LAD.top + Y[n]) / 2 + 12, ce, { size: 17, weight: 600, align: 'center', bg: PAL.panel });
    text(ctx, 'ionization limit', LAD.r, LAD.top - 16, ce, { size: 16, align: 'right' });
    /* the headline and the readout */
    topline(ctx, 'In ' + ion + ' the n = ' + n + ' orbit has a radius of ' + fmt(rA, rA < 10 ? 2 : 1) + ' a₀, which is ' + fmt(rM * 1e10, 2) + ' Å, and the electron in it has an energy of ' + sciU(E) + ' J.');
    readout(d.readout,
      `\\kEn=-\\frac{kZ^2}{n^2}=-\\frac{(${sciT(K)}\\ \\text{J})(${Z})^2}{${n}^2}=${sciT(E)}\\ \\text{J}\\qquad r=\\frac{n^2}{Z}\\,a_0=\\frac{${n}^2}{${Z}}(${sciT(A0)}\\ \\text{m})=${sciT(rM)}\\ \\text{m}`,
      n === 1 && Z === 1
        ? 'This is the ground state of hydrogen, and removing its electron altogether, to n → ∞ where E = 0, takes k itself, 2.179 × 10⁻¹⁸ J.'
        : 'Removing the electron from this orbit altogether, to n → ∞ where E = 0, takes ' + sciU(-E) + ' J; the orbit is ' + fmt(rA, rA < 10 ? 2 : 1) + ' times the Bohr radius, and the rung is ' + fmt(1 / (n * n), 4) + ' of the way from E = 0 to the ground state of ' + ion + '.');
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   SIM: the series. Every transition that ends on n₁ as one line on a
   wavelength axis, the visible band painted, the series limit dashed.
   Still: a family of transitions has no clock in it.
===================================================================== */
(function () {
  const d = sim('sim-series', 440);
  const N1 = ctl(d.controls, { label: 'n_1', cls: '', min: 1, max: 4, step: 1, value: 2, unit: '', dec: 0, aria: 'the orbit the electron falls to' });
  const N2 = ctl(d.controls, { label: 'n_2\\ \\text{up to}', cls: '', min: 3, max: 12, step: 1, value: 8, unit: '', dec: 0, aria: 'the highest orbit the electron falls from' });
  const ZC = ctl(d.controls, { label: 'Z', cls: '', min: 1, max: 3, step: 1, value: 1, unit: '', dec: 0, aria: 'nuclear charge' });
  const STRIP = { l: 200, r: 1300, y: 300 };
  function draw() {
    const { ctx } = begin(d.c);
    const n1 = N1.v, hi = Math.max(N2.v, n1 + 1), Z = ZC.v, cw = C('wavelength'), ion = Z === 1 ? 'hydrogen' : Z === 2 ? 'He⁺' : 'Li²⁺';
    const X = wavelengthAxis(ctx, STRIP, 56, 'wavelength λ (nm), logarithmic scale', true);
    const lines = []; for (let n2 = n1 + 1; n2 <= hi; n2++) lines.push({ n2, nm: lambdaNm(n1, n2, Z) });
    const limit = (n1 * n1) / (RINF * Z * Z) * 1e9;
    /* the limit, then the lines from the longest wavelength down, each labelled where there is room */
    line(ctx, X(limit), STRIP.y - 88, X(limit), STRIP.y + 34, cw, 2.5, [10, 10]);
    text(ctx, 'series limit, ' + nmU(limit), X(limit) - 10, STRIP.y - 102, cw, { size: 17, weight: 600, align: 'right', bg: PAL.panel });
    let lastLabel = Infinity;
    lines.forEach((q) => {
      line(ctx, X(q.nm), STRIP.y - 40, X(q.nm), STRIP.y + 36, lineColor(q.nm), 3.5);
      if (lastLabel - X(q.nm) > 24) { text(ctx, String(q.n2), X(q.nm), STRIP.y - 56, PAL.ink, { size: 16, align: 'center' }); lastLabel = X(q.nm); }
    });
    text(ctx, 'each line is one transition from the orbit n₂ written above it down to n₁ = ' + n1, STRIP.l, STRIP.y - 134, PAL.muted, { size: 17 });
    /* what the reader sees */
    const nVis = lines.filter((q) => visible(q.nm)).length, nUV = lines.filter((q) => q.nm < 380).length, nIR = lines.filter((q) => q.nm > 700).length;
    const first = lines[0], last = lines[lines.length - 1];
    const where = [nVis ? nVis + ' in the visible' : '', nUV ? nUV + ' in the ultraviolet' : '', nIR ? nIR + ' in the infrared' : ''].filter(Boolean).join(', ');
    topline(ctx, 'In ' + ion + ' the transitions from n₂ = ' + (n1 + 1) + ' to ' + hi + ' down to n₁ = ' + n1 + ' give ' + lines.length + ' lines from ' + nmU(first.nm) + ' to ' + nmU(last.nm) + ' (' + where + '), crowding toward the series limit at ' + nmU(limit) + '.');
    readout(d.readout,
      `\\frac{1}{\\klam}=\\frac{k}{hc}\\,Z^2\\left(\\frac{1}{n_1^{2}}-\\frac{1}{n_2^{2}}\\right)=(${sciT(RINF)}\\ \\text{m}^{-1})(${Z})^2\\left(\\frac{1}{${n1}^2}-\\frac{1}{n_2^{2}}\\right)\\qquad\\klam=${sciT(first.nm * 1e-9)}\\ \\text{m for }n_2=${n1 + 1}`,
      n1 === 2 && Z === 1
        ? 'The four visible lines, at 656, 486, 434 and 410 nm, are the ones Balmer fitted to whole numbers; the quotient k/hc is the Rydberg constant, 1.097 × 10⁷ m⁻¹.'
        : 'The quotient k/hc is the Rydberg constant, 1.097 × 10⁷ m⁻¹; the limit is the wavelength of the photon from an electron so far out that its energy is zero, and no line of the series lies beyond it.');
  }
  register(d.fig, { update: () => {}, draw });
})();
};
