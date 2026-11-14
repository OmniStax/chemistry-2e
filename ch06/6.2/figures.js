/* Figures for section 6.2 The Bohr Model. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['6.2'] = function (root, F) {
const { fmt, tex, C, PAL, alpha, cycle, register, begin, line, arrow, dot, text, topline } = F;
const sim = (id, H) => F.sim(root, id, H);
/* a value in its category's colour inside a readout: the value is coloured, the equation round it stays in ink */
const hu = (type, x) => '\\htmlClass{kv-' + type + '}{' + x + '}';
/* a quantum number is a discrete state, so a choice (a dropdown where the row would wrap), never a slider (rule 26.1) */
const span = (min, max) => { const o = []; for (let k = min; k <= max; k++) o.push({ value: String(k), label: String(k) }); return o; };
function qn(controls, { label, min, max, value, aria, onInput }) {
  const c = F.choice(controls, { label, options: span(min, max), value: String(value), aria, onInput });
  return { get v() { return +c.value; } };
}

/* ---------- the model's constants, as the book states them ---------- */
const K = 2.179e-18;          /* J, the constant k that gathers the fundamental constants together */
const HP = 6.626e-34;         /* J s, Planck's constant */
const CL = 2.998e8;           /* m/s, the speed of light */
const A0 = 5.292e-11;         /* m, the Bohr radius */
const RINF = 1.097e7;          /* m⁻¹, the Rydberg constant: k/hc from the three constants above, to the four figures the text carries */
const sig4 = (x) => Number(x.toPrecision(4));
const energy = (n, Z) => -K * Z * Z / (n * n);                                   /* J */
/* the wavelength in nm from the energy difference as it is shown, to four figures, the way Example 6.5 works it */
const photonNm = (n1, n2, Z) => (HP * CL / sig4(Math.abs(energy(n2, Z) - energy(n1, Z)))) * 1e9;
/* the same from the Rydberg equation; Z need not be whole while a change of ion slides the lines */
const lambdaNm = (n1, n2, Z) => 1e9 / (RINF * Z * Z * (1 / (n1 * n1) - 1 / (n2 * n2)));
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
  return F.fact(`rgb(${ch(r)},${ch(g)},${ch(b)})`);
}
const visible = (nm) => nm >= 400 && nm <= 700;
const lineColor = (nm) => (visible(nm) ? lightColor(nm) : C('wavelength'));
/* the region of the spectrum a wavelength falls in, in the book's words */
function region(nm) {
  if (nm < 400) return 'ultraviolet light';
  if (nm > 700) return 'infrared light';
  return (nm < 450 ? 'violet' : nm < 495 ? 'blue' : nm < 570 ? 'green' : nm < 590 ? 'yellow' : nm < 620 ? 'orange' : 'red') + ' light';
}

/* ---------- the one-electron species the model holds for ----------
   Hydrogen, He⁺ and Li²⁺ are three named atoms and ions, not three values of a quantity, so the reader
   picks one from a row of buttons rather than sliding a nuclear charge through them (rule 26.1). */
const IONS = [{ z: 1, name: 'hydrogen', label: 'H' }, { z: 2, name: 'He\u207a', label: 'He\u207a' }, { z: 3, name: 'Li\u00b2\u207a', label: 'Li\u00b2\u207a' }];
function ionPick(controls, onInput) {
  const c = F.choice(controls, { label: '\\text{atom or ion}', options: IONS.map((q, i) => ({ value: String(i), label: q.label })), value: '0', aria: 'the one-electron atom or ion', onInput });
  return { get v() { return IONS[+c.value].z; }, get name() { return IONS[+c.value].name; }, mix: (f) => c.mix((i) => f(IONS[+i].z)) };
}

/* ---------- the energy ladder, to scale ----------
   Rungs at heights in proportion to E_n = −kZ²/n²: the foot is n = 1 and the top is E = 0, for every Z.
   The labels of the crowded upper rungs fan out on leaders, as Figure 6.14 fans them; `slot` is where
   each label stands. */
const ladderY = (n, top, bottom) => (n === Infinity ? top : bottom - (bottom - top) * (1 - 1 / (n * n)));
function slotsOf(nmax, top, bottom, gap = 28) {
  const ns = [Infinity]; for (let n = nmax; n >= 1; n--) ns.push(n);
  let last = top - gap - 6; const out = {};
  ns.forEach((n) => { const y = Math.max(ladderY(n, top, bottom), last + gap); out[n] = y; last = y; });
  return out;
}
const nName = (n) => (n === Infinity ? 'n = ∞' : 'n = ' + n);

/* =====================================================================
   SIM: the series. The four families of lines the Rydberg equation gives,
   one row for each orbit n₁ the jump ends on, on one logarithmic wavelength
   axis that never changes: 10 nm (the limit of Li²⁺'s first series is
   10.1 nm) to 5000 nm (hydrogen's 5 → 4 line is 4051 nm). Still: a family
   of lines has no clock. A change of ion slides every line once to its new
   place, a rigid shift on a logarithmic axis.
===================================================================== */
(function () {
  const d = sim('sim-series', 760);
  const N2LIST = (n1) => span(n1 + 1, n1 + 8);
  const N1 = qn(d.controls, { label: 'n_1', min: 1, max: 4, value: 2, aria: 'the orbit the jump ends on', onInput: () => N2.options(N2LIST(N1.v)) });
  const N2 = F.select(d.controls, { label: 'n_2', options: N2LIST(2), value: '3', aria: 'the orbit the jump starts from' });
  const ZC = ionPick(d.controls);
  const AX = { l: 150, r: 1350 }, LO = 1, HI = Math.log10(5000);
  const X = (nm) => AX.l + ((Math.log10(nm) - LO) / (HI - LO)) * (AX.r - AX.l);
  const ROW = { y0: 104, h: 40, gap: 14 }, STRIP = { t: 322, b: 344 };
  const rowTop = (n1) => ROW.y0 + (n1 - 1) * (ROW.h + ROW.gap);
  const TICKS = [10, 20, 50, 100, 200, 500, 1000, 2000, 5000];
  /* the chosen series again, spread out on a linear axis from its limit to its longest wavelength */
  const DET = { l: 150, r: 1350, t: 520, b: 640, in0: 50, in1: 70 }, NFAR = 40;
  const limitNm = (n1, Z) => (n1 * n1) / (RINF * Z * Z) * 1e9;
  const sliver = (x0, x1, t, b, a, c) => { const N = 96; for (let i = 0; i < N; i++) { const u = a + ((c - a) * i) / N, v = a + ((c - a) * (i + 1)) / N; ctx2.fillStyle = lightColor((u + v) / 2); ctx2.fillRect(x0(u), t, x0(v) - x0(u) + 0.6, b - t); } };
  let ctx2 = null;
  let hits = []; F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c); ctx2 = ctx;
    hits = [];
    const n1 = N1.v; if (+N2.value <= n1 || +N2.value > n1 + 8) N2.options(N2LIST(n1));
    const n2 = +N2.value, Z = ZC.v, Zm = ZC.mix((z) => z), cw = C('wavelength'), ion = ZC.name;
    /* ---- above: the four series on one axis ---- */
    [400, 700].forEach((nm) => line(ctx, X(nm), ROW.y0 - 30, X(nm), STRIP.t, alpha(PAL.ink, 0.3), 2, [4, 8]));
    for (let m = 1; m <= 4; m++) {
      const t = rowTop(m), on = m === n1, limit = limitNm(m, Zm);
      ctx.save(); ctx.fillStyle = PAL.soft; ctx.fillRect(AX.l, t, AX.r - AX.l, ROW.h); ctx.restore();
      text(ctx, 'n₁ = ' + m, AX.l - 16, t + ROW.h / 2, on ? PAL.ink : PAL.muted, { size: 20, weight: on ? 600 : 400, align: 'right' });
      F.faded(ctx, on ? 1 : 0.5, [0, 0], () => {
        for (let k = 20; k > m; k--) { const nm = lambdaNm(m, k, Zm); line(ctx, X(nm), t + 3, X(nm), t + ROW.h - 3, lineColor(nm), k - m <= 6 ? 3 : 2); }
        line(ctx, X(limit), t - 4, X(limit), t + ROW.h + 4, cw, 2.5, [6, 5]);
      });
      hits.push({ x: (X(limit) + X(lambdaNm(m, m + 1, Zm))) / 2, y: t + ROW.h / 2, r: 24, name: 'the lines that end on n₁ = ' + m + ', ' + nmU(limitNm(m, Z)) + ' to ' + nmU(lambdaNm(m, m + 1, Z)) });
    }
    /* the chosen row is the one spread out below: a bracket under its lines says so */
    const t1 = rowTop(n1), xa = X(limitNm(n1, Zm)), xb = X(lambdaNm(n1, n1 + 1, Zm));
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2; ctx.strokeRect(xa - 7, t1 - 5, xb - xa + 14, ROW.h + 10); ctx.restore();
    /* the axis: its strip, the visible band painted, the regions named */
    ctx.save(); ctx.fillStyle = PAL.soft; ctx.fillRect(AX.l, STRIP.t, AX.r - AX.l, STRIP.b - STRIP.t);
    sliver(X, X, STRIP.t, STRIP.b, 400, 700); ctx.restore();
    /* the three regions, named over their columns */
    text(ctx, 'ultraviolet', X(63), ROW.y0 - 18, PAL.muted, { size: 17, align: 'center' });
    text(ctx, 'visible', X(529), ROW.y0 - 18, PAL.muted, { size: 17, align: 'center' });
    text(ctx, 'infrared', X(1870), ROW.y0 - 18, PAL.muted, { size: 17, align: 'center' });
    line(ctx, AX.l, STRIP.b, AX.r, STRIP.b, cw, 2);
    TICKS.forEach((v) => { line(ctx, X(v), STRIP.b, X(v), STRIP.b + 9, cw, 2); text(ctx, String(v), X(v), STRIP.b + 26, cw, { size: 17, align: 'center' }); });
    text(ctx, 'wavelength λ (nm), logarithmic scale', AX.r, STRIP.b + 56, cw, { size: 19, weight: 600, align: 'right' });
    /* ---- below: the chosen series spread out ---- */
    const lim = limitNm(n1, Zm), first = lambdaNm(n1, n1 + 1, Zm), limAt = limitNm(n1, Z), at = lambdaNm(n1, n2, Z);
    const DX = (nm) => DET.l + DET.in0 + ((nm - lim) / (first - lim)) * (DET.r - DET.in1 - DET.l - DET.in0);
    F.rich(ctx, ['The lines that end on ', ['n₁ = ' + n1, PAL.ink, 600], ', spread out'], DET.l, DET.t - 62, { size: 20 });
    ctx.save(); ctx.fillStyle = PAL.soft; ctx.fillRect(DET.l, DET.t, DET.r - DET.l, DET.b - DET.t);
    /* the part of this stretch the eye sees, painted along its foot */
    const v0 = Math.max(400, lim), v1 = Math.min(700, first * 1.06);
    if (v1 > v0) { ctx.beginPath(); ctx.rect(DET.l, DET.b - 12, DET.r - DET.l, 12); ctx.clip(); sliver(DX, DX, DET.b - 12, DET.b, v0, v1); }
    ctx.restore();
    for (let k = NFAR; k > n1; k--) {
      if (k === n2) continue;
      const nm = lambdaNm(n1, k, Zm);
      line(ctx, DX(nm), DET.t + 8, DX(nm), DET.b - 16, lineColor(nm), k - n1 <= 8 ? 4 : 2);
    }
    line(ctx, DX(lim), DET.t - 10, DX(lim), DET.b + 2, cw, 3, [8, 6]);
    /* each line's n₂ above it where there is room; the chosen one heavier, with its wavelength */
    const xs = DX(lambdaNm(n1, n2, Zm));
    line(ctx, xs, DET.t - 10, xs, DET.b - 16, lineColor(lambdaNm(n1, n2, Zm)), 7);
    const tag = 'n₂ = ' + n2 + ', ', tw = F.measure(ctx, tag + nmU(at), { size: 20, weight: 600 }), tx = Math.min(DET.r - tw / 2, Math.max(DET.l + tw / 2, xs));
    F.rich(ctx, [[tag, PAL.ink, 600], [nmU(at), cw]], tx, DET.t - 28, { size: 20, align: 'center' });
    for (let k = n1 + 1; k <= n1 + 8; k++) {
      const x = DX(lambdaNm(n1, k, Zm));
      hits.push({ x, y: (DET.t + DET.b) / 2, r: 10, name: 'n₂ = ' + k + ' to n₁ = ' + n1 + ', ' + nmU(lambdaNm(n1, k, Z)) });
      if (k !== n2 && Math.abs(x - tx) > tw / 2 + 24 && (k === n1 + 1 || DX(lambdaNm(n1, k - 1, Zm)) - x > 30)) text(ctx, String(k), x, DET.t - 14, PAL.muted, { size: 17, align: 'center' });
    }
    hits.push({ x: DX(lim), y: (DET.t + DET.b) / 2, r: 9, name: 'the limit of the series, n₂ = ∞' });
    /* its own axis, in round steps of this stretch */
    line(ctx, DET.l, DET.b, DET.r, DET.b, cw, 2);
    const stepOf = (w) => { const p = Math.pow(10, Math.floor(Math.log10(w / 5))), q = w / 5 / p; return (q < 1.5 ? 1 : q < 3.5 ? 2 : q < 7.5 ? 5 : 10) * p; };
    const stp = stepOf(first - lim);
    for (let v = Math.ceil((lim + (first - lim) * 0.06) / stp) * stp; v <= first * 1.0001; v += stp) { line(ctx, DX(v), DET.b, DX(v), DET.b + 9, cw, 2); text(ctx, fmt(v, stp < 1 ? 1 : 0), DX(v), DET.b + 26, cw, { size: 17, align: 'center' }); }
    F.rich(ctx, ['limit, ', [nmU(limAt), cw]], DX(lim) - 6, DET.b + 56, { size: 18 });
    text(ctx, 'wavelength λ (nm)', DET.r, DET.b + 56, cw, { size: 19, weight: 600, align: 'right' });
    /* how many lines of the chosen series are light the eye sees */
    let nVis = 0, nUV = 0, nIR = 0;
    for (let k = n1 + 1; k <= 400; k++) { const w = lambdaNm(n1, k, Z); if (visible(w)) nVis++; else if (w < 400) nUV++; else nIR++; }
    topline(ctx, nVis
      ? 'In ' + ion + ', ' + nVis + ' of the lines that end on n₁ = ' + n1 + (nVis === 1 ? ' is' : ' are') + ' visible light.'
      : 'In ' + ion + ', ' + (nUV && nIR ? 'no line that ends on n₁ = ' + n1 + ' is visible light.' : 'every line that ends on n₁ = ' + n1 + ' is ' + (nUV ? 'ultraviolet.' : 'infrared.')));
    const inv = RINF * Z * Z * (1 / (n1 * n1) - 1 / (n2 * n2));
    tex(d.readout,
      `\\frac{1}{\\klam}=R_{\\infty}Z^{2}\\left(\\frac{1}{n_1^{2}}-\\frac{1}{n_2^{2}}\\right)=(${sciT(RINF)}\\ \\text{m}^{-1})(${Z})^{2}\\left(\\frac{1}{${n1}^{2}}-\\frac{1}{${n2}^{2}}\\right)=${sciT(inv)}\\ \\text{m}^{-1}`
      + ' \\\\ ' + `\\klam=${hu('wavelength', sciT(1 / inv) + '\\ \\text{m}')}=${hu('wavelength', fmt(at, at < 100 ? 2 : 1) + '\\ \\text{nm}')}`);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 6.14 + 6.15: the Bohr ladder. The levels of a one-electron atom
   to scale with their energies as Figure 6.14 writes them, and one jump of
   Figure 6.15 at a time: a photon comes in and the electron rises, or the
   electron falls and a photon leaves. Moving: one cycle of 3 s. The
   electron is eased between its rungs, since a jump has no path in time to
   be faithful to; the photon travels at a steady pace.
===================================================================== */
(function () {
  const d = sim('sim-bohr-ladder', 780);
  const TT = 3;
  const cy = cycle(() => TT, 1.4);
  const NI = qn(d.controls, { label: 'n_{\\text{i}}', min: 1, max: 6, value: 3, onInput: () => cy.reset(), aria: 'quantum number of the orbit the electron starts in' });
  const NF = qn(d.controls, { label: 'n_{\\text{f}}', min: 1, max: 6, value: 2, onInput: () => cy.reset(), aria: 'quantum number of the orbit the electron ends in' });
  const ZC = ionPick(d.controls, () => cy.reset());
  const TOP = 150, BOT = 720, L = 440, R = 800, EX = 520, AXC = 610, NX = 850, VX = 934, PH = { near: 420, far: 230, len: 170 };
  const Y = (n) => ladderY(n, TOP, BOT), SLOT = slotsOf(6, TOP, BOT);
  const ease = F.ease.smooth, clamp = (x) => Math.max(0, Math.min(1, x));
  /* a photon: a short packet of waves with a head on the side it travels to; its drawn wavelength grows with its real one */
  function photon(ctx, xc, y, dir, nm, color) {
    const p = 9 + 13 * Math.log10(nm / 10), h = PH.len / 2;
    ctx.save(); ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = 3.5; ctx.lineJoin = 'round'; ctx.beginPath();
    for (let s = -h; s <= h; s += 1.5) { const yy = y + 14 * Math.exp(-((s / (h * 0.62)) ** 2)) * Math.sin((2 * Math.PI * s) / p); if (s === -h) ctx.moveTo(xc + s, yy); else ctx.lineTo(xc + s, yy); }
    ctx.stroke();
    const tip = xc + dir * (h + 22);
    ctx.beginPath(); ctx.moveTo(tip, y); ctx.lineTo(tip - dir * 18, y - 8); ctx.lineTo(tip - dir * 18, y + 8); ctx.closePath(); ctx.fill(); ctx.restore();
  }
  let hits = []; F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c);
    hits = [];
    const t = cy.now(), ni = NI.v, nf = NF.v, Z = ZC.v, ion = ZC.name;
    const dE = energy(nf, Z) - energy(ni, Z), emit = dE < 0, same = ni === nf, nm = same ? 0 : photonNm(ni, nf, Z);
    const ce = C('energy'), cw = C('wavelength'), cel = F.el('e-');
    /* the energy axis */
    arrow(ctx, 70, BOT + 10, 70, TOP - 36, ce, 4);
    text(ctx, 'E', 44, TOP - 20, ce, { size: 24, weight: 600, align: 'center' });
    /* the rungs, each with its n and its energy; the upper labels fan out on leaders */
    [1, 2, 3, 4, 5, 6, Infinity].forEach((n) => {
      const y = Y(n), s = SLOT[n];
      line(ctx, L, y, R, y, ce, n === Infinity ? 2.5 : 4, n === Infinity ? [10, 10] : undefined);
      line(ctx, R + 8, y, NX - 10, s, alpha(PAL.ink, 0.35), 2);
      text(ctx, nName(n), NX, s, PAL.ink, { size: 20, weight: 600 });
      text(ctx, (n === Infinity ? '0' : sciU(energy(n, Z))) + ' J', VX, s, ce, { size: 20 });
      hits.push({ x: (L + R) / 2, y, r: 4, name: nName(n) + ', ' + (n === Infinity ? '0' : sciU(energy(n, Z))) + ' J' });
    });
    /* the two names the passage gives the states */
    text(ctx, 'ground state', 1168, SLOT[1], PAL.ink, { size: 20 });
    const b0 = SLOT[6] - 10, b1 = SLOT[2] + 10;
    line(ctx, 1150, b0, 1150, b1, PAL.ink, 2); line(ctx, 1140, b0, 1150, b0, PAL.ink, 2); line(ctx, 1140, b1, 1150, b1, PAL.ink, 2);
    text(ctx, 'excited states', 1168, (b0 + b1) / 2, PAL.ink, { size: 20 });
    if (same) {
      dot(ctx, EX, Y(ni), cel, true, 7); hits.push({ x: EX, y: Y(ni), r: 13, name: 'the electron' });
      topline(ctx, 'In ' + ion + ' the electron stays on n = ' + ni + ', so no photon is absorbed or emitted.');
      tex(d.readout, `\\kEn=-\\frac{\\kk Z^{2}}{n^{2}}=-\\frac{(${sciT(K)}\\ \\text{J})(${Z})^{2}}{${ni}^{2}}=${hu('energy', sciT(energy(ni, Z)) + '\\ \\text{J}')}`);
      return;
    }
    /* the timeline: an absorbed photon arrives and then the electron rises; an electron falls and then its photon leaves */
    const jump = emit ? ease(clamp((t - 0.2) / 0.9)) : ease(clamp((t - 1.8) / 0.9));
    const fly = emit ? clamp((t - 1.0) / 2.0) : clamp(t / 1.8);
    const seen = emit ? clamp((t - 1.0) / 0.25) : 1 - clamp((t - 1.6) / 0.25);
    const y1 = Y(ni), y2 = Y(nf), ym = (y1 + y2) / 2, pc = lineColor(nm);
    /* the arrow of Figure 6.15 is notation and stands still; the electron and the photon move */
    arrow(ctx, AXC, y1, AXC, y2, ce, 4);
    const xc = emit ? PH.near + (PH.far - PH.near) * fly : PH.far + (PH.near - PH.far) * fly;
    F.faded(ctx, seen, [0, 0], () => photon(ctx, xc, ym, emit ? -1 : 1, nm, pc));
    if (seen > 0.5) hits.push({ x: xc, y: ym, r: 40, name: 'the photon, ' + nmU(nm) });
    /* the photon's energy is the gap between the rungs; its wavelength follows */
    F.rich(ctx, ['photon of ', [sciU(Math.abs(dE)) + ' J', ce]], 270, ym + 46, { size: 20, align: 'center', bg: PAL.panel });
    F.rich(ctx, [[nmU(nm), cw], ', ' + region(nm)], 270, ym + 74, { size: 20, align: 'center', bg: PAL.panel });
    /* the electron: hollow where it started, filled where it is */
    const ey = y1 + (y2 - y1) * jump;
    if (jump > 0.02) dot(ctx, EX, y1, cel, false, 7);
    dot(ctx, EX, ey, cel, true, 7); hits.push({ x: EX, y: ey, r: 13, name: 'the electron' });
    topline(ctx, emit
      ? 'In ' + ion + ' the electron falls from n = ' + ni + ' to n = ' + nf + ' and the atom emits a photon of ' + region(nm) + '.'
      : 'In ' + ion + ' a photon of ' + region(nm) + ' is absorbed and the electron rises from n = ' + ni + ' to n = ' + nf + '.');
    tex(d.readout,
      `\\kdE=\\kk Z^{2}\\left(\\frac{1}{n_{\\text{i}}^{2}}-\\frac{1}{n_{\\text{f}}^{2}}\\right)=(${sciT(K)}\\ \\text{J})(${Z})^{2}\\left(\\frac{1}{${ni}^{2}}-\\frac{1}{${nf}^{2}}\\right)=${hu('energy', sciT(dE) + '\\ \\text{J}')}`
      + ' \\\\ ' + `\\klam=\\frac{h\\kc}{|\\kdE|}=\\frac{(${sciT(HP)}\\ \\text{J s})(${sciT(CL)}\\ \\text{m/s})}{${sciT(Math.abs(dE))}\\ \\text{J}}=${hu('wavelength', sciT(nm * 1e-9) + '\\ \\text{m}')}`);
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();

/* =====================================================================
   SIM: the orbit and the rung. The circular orbits of the electron at one
   fixed scale on the left (12.6 canvas units to a Bohr radius, so that
   n = 5 of hydrogen, 25 a₀, stands inside the stage), the ladder of the
   same five levels on the right, to scale. Still: it answers its choices.
   Only the chosen orbit and rung are labelled; the others answer to the
   pointer, since their labels would collide once a larger Z draws them in.
===================================================================== */
(function () {
  const d = sim('sim-orbit-rung', 780);
  const N = qn(d.controls, { label: 'n', min: 1, max: 5, value: 3, aria: 'quantum number of the orbit' });
  const ZC = ionPick(d.controls);
  const SC = 12.6, CX = 360, CY = 440, ANG = 35 * Math.PI / 180, LX = 706;
  const TOP = 150, BOT = 720, L = 1010, R = 1200;
  const Y = (n) => ladderY(n, TOP, BOT), SLOT = slotsOf(5, TOP, BOT, 26);
  let hits = []; F.hover(d.stage, () => hits);
  function ring(ctx, r, color, w) { ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = w; ctx.beginPath(); ctx.arc(CX, CY, r, 0, Math.PI * 2); ctx.stroke(); ctx.restore(); }
  function draw() {
    const { ctx } = begin(d.c);
    hits = [];
    const n = N.v, Z = ZC.v, Zm = ZC.mix((z) => z), ce = C('energy'), cr = C('length'), cel = F.el('e-');
    const rA = (n * n) / Z, rM = radiusM(n, Z), E = energy(n, Z);
    /* the orbits, the chosen one in ink */
    for (let m = 5; m >= 1; m--) {
      const r = (m * m / Zm) * SC;
      ring(ctx, r, m === n ? PAL.ink : alpha(PAL.ink, 0.3), m === n ? 3 : 2);
      for (let a = 0; a < 12; a++) hits.push({ x: CX + r * Math.cos(a * Math.PI / 6 + 0.9), y: CY + r * Math.sin(a * Math.PI / 6 + 0.9), r: 7, name: 'the n = ' + m + ' orbit, ' + fmt(m * m / Z, m * m % Z ? 2 : 0) + ' a₀ from the nucleus' });
    }
    /* the nucleus and its charge */
    dot(ctx, CX, CY, PAL.ink, true, 3.5); hits.push({ x: CX, y: CY, r: 6, name: 'the nucleus, charge +' + Z });
    text(ctx, '+' + Z, CX - 10, CY + 18, PAL.ink, { size: 18, weight: 600, align: 'right', bg: PAL.panel });
    /* the electron on its orbit, the radius drawn to it */
    const r = (n * n / Zm) * SC, ex = CX + r * Math.cos(ANG), ey = CY - r * Math.sin(ANG);
    line(ctx, CX, CY, ex, ey, cr, 3, [6, 6]);
    dot(ctx, ex, ey, cel, true, 6); hits.push({ x: ex, y: ey, r: 11, name: 'the electron, on the n = ' + n + ' orbit' });
    /* its name and radius stand in a column clear of every orbit, on a leader from the electron */
    line(ctx, ex + 12, ey, LX - 12, ey, alpha(PAL.ink, 0.35), 2);
    text(ctx, 'n = ' + n, LX, ey - 14, PAL.ink, { size: 20, weight: 600 });
    text(ctx, 'r = ' + fmt(rA, n * n % Z ? 2 : 0) + ' a₀ = ' + fmt(rM * 1e10, 3) + ' Å', LX, ey + 14, cr, { size: 20, weight: 600 });
    /* the scale bar */
    const bx = 44, by = 752;
    line(ctx, bx, by, bx + 5 * SC, by, PAL.ink, 3); line(ctx, bx, by - 8, bx, by + 8, PAL.ink, 2); line(ctx, bx + 5 * SC, by - 8, bx + 5 * SC, by + 8, PAL.ink, 2);
    text(ctx, '5 a₀', bx + 5 * SC + 14, by, PAL.ink, { size: 18 });
    /* the ladder of the same levels, the chosen rung heavy with the electron on it */
    arrow(ctx, 1352, BOT + 10, 1352, TOP - 36, ce, 4);
    text(ctx, 'E', 1326, TOP - 20, ce, { size: 24, weight: 600, align: 'center' });
    [1, 2, 3, 4, 5, Infinity].forEach((m) => {
      const y = Y(m), s = SLOT[m], on = m === n;
      line(ctx, L, y, R, y, ce, m === Infinity ? 2.5 : on ? 7 : 3, m === Infinity ? [10, 10] : undefined);
      line(ctx, R + 8, y, 1240, s, alpha(PAL.ink, 0.35), 2);
      text(ctx, nName(m), 1250, s, on ? PAL.ink : PAL.muted, { size: 20, weight: on ? 600 : 400 });
      hits.push({ x: (L + R) / 2 + 40, y, r: 4, name: nName(m) + ', ' + (m === Infinity ? '0' : sciU(energy(m, Z))) + ' J' });
    });
    dot(ctx, L + 50, Y(n), cel, true, 8); hits.push({ x: L + 50, y: Y(n), r: 12, name: 'the electron, on the n = ' + n + ' rung' });
    /* from the rung up to E = 0: the energy that removes the electron */
    const y0 = Y(n), bxx = L - 34;
    line(ctx, bxx, TOP, bxx, y0, ce, 3); line(ctx, bxx, TOP, bxx + 12, TOP, ce, 3); line(ctx, bxx, y0, bxx + 12, y0, ce, 3);
    F.rich(ctx, ['energy to remove the electron, ', [sciU(-E) + ' J', ce]], bxx - 8, TOP - 34, { size: 20 });
    /* the pattern neither label states */
    topline(ctx, n === 1
      ? 'The n = 1 orbit is the smallest, and its electron takes the most energy to remove.'
      : 'The n = ' + n + ' orbit is ' + n * n + ' times as wide as n = 1, and its electron takes 1/' + n * n + ' of the energy to remove.');
    tex(d.readout,
      `\\kr=\\frac{n^{2}}{Z}\\,\\kao=\\frac{${n}^{2}}{${Z}}(${sciT(A0)}\\ \\text{m})=${hu('length', sciT(rM) + '\\ \\text{m}')}`
      + ' \\\\ ' + `\\kEn=-\\frac{\\kk Z^{2}}{n^{2}}=-\\frac{(${sciT(K)}\\ \\text{J})(${Z})^{2}}{${n}^{2}}=${hu('energy', sciT(E) + '\\ \\text{J}')}`);
  }
  register(d.fig, { update: () => {}, draw });
})();
};
