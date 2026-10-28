/* Figures for section 6.2 The Bohr Model. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['6.2'] = function (root, F) {
const { el, fmt, tex, C, PAL, alpha, ctl, cycle, register, begin, line, arrow, dot, text, topline, vbracket } = F;
const sim = (id, H) => F.sim(root, id, H);
function readout(host, main, small) { tex(host, main); if (small) { const s = el('small', null, small); host.appendChild(s); F.renderMath(s); } }
/* a quantum number is a discrete state, so a choice (a dropdown where the row would wrap), never a slider (rule 26.1) */
function qn(controls, { label, min, max, value, aria, onInput }) {
  const options = []; for (let k = min; k <= max; k++) options.push({ value: String(k), label: String(k) });
  const c = (max - min > 5 ? F.select : F.choice)(controls, { label, options, value: String(value), aria, onInput });
  return { get v() { return +c.value; }, set: (k) => c.set(String(k)) };
}

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
  return F.fact(`rgb(${ch(r)},${ch(g)},${ch(b)})`);
}
const visible = (nm) => nm >= 400 && nm <= 700;
const lineColor = (nm) => (visible(nm) ? lightColor(nm) : C('wavelength'));
/* the region of the spectrum a wavelength falls in, in the book's words */
function region(nm) {
  if (nm < 400) return '紫外光';
  if (nm > 700) return '红外光';
  return (nm < 450 ? '紫' : nm < 495 ? '蓝' : nm < 570 ? '绿' : nm < 590 ? '黄' : nm < 620 ? '橙' : '红') + '光';
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
  if (!inside) text(ctx, '可见光', X(530), ry, PAL.muted, { size: 15, align: 'center' });
  text(ctx, '紫外线', X(60), ry, PAL.muted, { size: 15, align: 'center' });
  text(ctx, '红外线', X(2500), ry, PAL.muted, { size: 15, align: 'center' });
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
    text(ctx, name, labelX, q.sy, PAL.ink, { size: 19, weight: 600, bg: o.plate });
    text(ctx, (q.n === Infinity ? '0' : sciU(q.E)) + ' J', labelX + 88, q.sy, ce, { size: 18, bg: o.plate });
  });
  text(ctx, 'n', labelX, top - 36, PAL.ink, { size: 19, weight: 600 });
  text(ctx, 'Eₙ', labelX + 88, top - 36, ce, { size: 19, weight: 600 });
  return Object.fromEntries(ys.map((q) => [q.n, q.y]));
}

/* ---------- the line pairing a transition with its place on the spectrum ----------
   A correspondence, not a path (rule 24.1): a straight line drawn along its length once, up to the fraction k, then held. */
function connector(ctx, from, to, k, color) {
  const q = F.partial([from, to], k); if (q.length < 2) return;
  line(ctx, q[0][0], q[0][1], q[q.length - 1][0], q[q.length - 1][1], color, 3);
}
const ease = (t) => (t < 0 ? 0 : t > 1 ? 1 : t * t * (3 - 2 * t));
/* ---------- a change of transition: the electron eases to its rung and the line is drawn, one after the other ----------
   An emission falls first and then draws its line; an absorption draws its line first and then rises. */
const STEP = 1100, SPLIT = 0.55;
function phases(s, emit) {
  return emit
    ? { jump: ease(s / SPLIT), draw: ease((s - SPLIT) / (1 - SPLIT)) }
    : { draw: ease(s / (1 - SPLIT)), jump: ease((s - (1 - SPLIT)) / SPLIT) };
}

/* ---------- the one-electron species the model holds for ----------
   Hydrogen, He⁺ and Li²⁺ are three named atoms and ions, not three values of a quantity, so the reader
   picks one from a row of buttons rather than sliding a nuclear charge through them (rule 26.1). */
const pad = (t) => (/^[A-Za-z]/.test(t) ? ' ' + t + ' ' : t);   /* a space between Chinese and a Latin name */
const IONS = [{ z: 1, name: '氢', label: 'H' }, { z: 2, name: 'He\u207a', label: 'He\u207a' }, { z: 3, name: 'Li\u00b2\u207a', label: 'Li\u00b2\u207a' }];
function ionPick(controls, onInput) {
  const c = F.choice(controls, { label: '\\text{原子或离子}', options: IONS.map((q, i) => ({ value: String(i), label: q.label })), value: '0', aria: '单电子原子或离子', onInput });
  return { get v() { return IONS[+c.value].z; }, get name() { return IONS[+c.value].name; }, mix: (f) => c.mix((i) => f(IONS[+i].z)) };
}

/* =====================================================================
   FIGURE 6.14 + 6.15: the Bohr ladder. The levels of a one-electron atom
   to scale with their energies, the electron moving between two rungs, the
   photon leaving for the wavelength strip or arriving from it, and the
   line it makes. Still: a change of transition eases the electron to its
   new rung once and draws the line to the spectrum once, then holds. The
   equation morphs by meaning between the energy of one level and the jump
   between two, and the orbit the electron starts in is a dashed circle on
   the other slider, where no photon is emitted or absorbed.
===================================================================== */
(function () {
  const d = sim('sim-bohr-ladder', 820);
  /* the rungs, and their labels fanned out on leaders that return the slot each label took */
  function rungs(ctx, o) {
    const { l, r, top, bottom, nmax, Z, labelX } = o, ce = C('energy');
    const ys = [];
    for (let n = 1; n <= nmax; n++) ys.push({ n, y: ladderY(n, top, bottom), E: energy(n, Z) });
    ys.push({ n: Infinity, y: top, E: 0 });
    ys.forEach((q) => line(ctx, l, q.y, r, q.y, ce, q.n === Infinity ? 2.5 : 4, q.n === Infinity ? [10, 10] : undefined));
    arrow(ctx, l - 40, bottom + 6, l - 40, top - 34, ce, 4);
    text(ctx, 'E', l - 40, top - 52, ce, { size: 24, weight: 600, align: 'center' });
    const slots = []; let last = -Infinity;
    [...ys].sort((a, b) => a.y - b.y).forEach((q) => { const y = Math.max(q.y, last + 28); slots.push({ ...q, sy: y }); last = y; });
    slots.forEach((q) => {
      line(ctx, r + 8, q.y, labelX - 12, q.sy, alpha(PAL.ink, 0.3), 2);
      text(ctx, q.n === Infinity ? 'n → ∞' : 'n = ' + q.n, labelX, q.sy, PAL.ink, { size: 19, weight: 600, bg: PAL.panel });
      text(ctx, (q.n === Infinity ? '0' : sciU(q.E)) + ' J', labelX + 88, q.sy, ce, { size: 18, bg: PAL.panel });
    });
    text(ctx, 'n', labelX, top - 36, PAL.ink, { size: 19, weight: 600 });
    text(ctx, 'Eₙ', labelX + 88, top - 36, ce, { size: 19, weight: 600 });
    return { Y: Object.fromEntries(ys.map((q) => [q.n, q.y])), S: Object.fromEntries(slots.map((q) => [q.n, q.sy])) };
  }
  /* the equation and its numbers, one line that morphs by meaning: k and Z² move, 1/n₁² bends into the level's n², the rest fades */
  const { formula: fx, note } = F.readout(d);
  let shown = '';
  const NI = qn(d.controls, { label: 'n_{\\text{i}}', min: 1, max: 6, value: 3, onInput: reset, aria: '电子起始轨道的量子数' });
  const NF = qn(d.controls, { label: 'n_{\\text{f}}', min: 1, max: 6, value: 2, onInput: reset, aria: '电子终止轨道的量子数' });
  const ZC = ionPick(d.controls, reset);
  const step = F.tween(d, 0);
  const landed = new Set();                      /* the lines the reader has landed, keyed by Z and the two orbits */
  function reset() { step.set(0); step.to(1, STEP, F.ease.linear); }
  const LAD = { l: 300, r: 700, top: 150, bottom: 610 };
  const STRIP = { l: 300, r: 1300, y: 706 };
  /* the inset: the band of the ladder from n = 3 to the ionization limit, redrawn at MAG times the height */
  const INS = { l: 1110, r: 1250, top: 170, bottom: 578, from: 3 };
  const BX = 1044;                               /* the bracket that gathers the labels of the magnified rungs */
  const BAND = ladderY(INS.from, LAD.top, LAD.bottom) - LAD.top;
  const MAG = (INS.bottom - INS.top) / BAND;
  const iy = (n) => INS.bottom - (ladderY(INS.from, LAD.top, LAD.bottom) - ladderY(n, LAD.top, LAD.bottom)) * MAG;
  function magnified(ctx, Z, ni, nf, jump, same, S) {
    const ce = C('energy'), cl = alpha(PAL.ink, 0.3), t0 = S[Infinity] - 12, t1 = S[INS.from] + 12;
    /* the labels of the rungs the inset enlarges, gathered by a bracket beyond their energies, and two connectors to the inset; nothing crosses a leader */
    line(ctx, BX, t0, BX, t1, cl, 1.5); line(ctx, BX - 8, t0, BX, t0, cl, 1.5); line(ctx, BX - 8, t1, BX, t1, cl, 1.5);
    line(ctx, BX, t0, INS.l - 14, INS.top - 12, cl, 1.5);
    line(ctx, BX, t1, INS.l - 14, INS.bottom + 12, cl, 1.5);
    for (let n = INS.from; n <= 6; n++) { line(ctx, INS.l, iy(n), INS.r, iy(n), ce, 4); text(ctx, 'n = ' + n, INS.r + 14, iy(n), PAL.ink, { size: 17, weight: 600 }); }
    line(ctx, INS.l, INS.top, INS.r, INS.top, ce, 2.5, [10, 10]); text(ctx, 'n \u2192 \u221e', INS.r + 14, INS.top, PAL.ink, { size: 17, weight: 600 });
    const inBand = ni >= INS.from && nf >= INS.from;
    if (!same && inBand) {
      arrow(ctx, INS.l + 110, iy(ni), INS.l + 110, iy(nf), ce, 4);
      dot(ctx, INS.l + 46, iy(ni) + (iy(nf) - iy(ni)) * jump, F.el('e-'), true, 8);
    }
    text(ctx, 'n = 3 及以上的横档，', INS.l - 14, INS.top - 62, PAL.muted, { size: 17 });
    text(ctx, '放大 ' + fmt(MAG, 0) + ' 倍', INS.l - 14, INS.top - 38, PAL.muted, { size: 17 });
    if (!same && !inBand) {
      const my = (iy(INS.from) + iy(INS.from + 1)) / 2, mx = (INS.l + INS.r) / 2;
      text(ctx, '这次跃迁到达', mx, my - 12, PAL.muted, { size: 16, align: 'center' });
      text(ctx, 'n = 3 以下', mx, my + 12, PAL.muted, { size: 16, align: 'center' });
    }
  }
  const EX = 380, AX = 520;                      /* the electron's column and the arrow's column on the ladder */
  /* the electron names itself under the pointer (rule 26.6) */
  let hits = []; F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c);
    hits = [];
    const ni = NI.v, nf = NF.v, Z = ZC.v;
    const dE = energy(nf, Z) - energy(ni, Z), emit = dE < 0, same = ni === nf;
    const nm = same ? 0 : lambdaNm(ni, nf, Z), key = `${Z}:${Math.min(ni, nf)}-${Math.max(ni, nf)}`;
    const ce = C('energy'), cw = C('wavelength'), ion = ZC.name;
    const { jump, draw: drawn } = phases(step.v, emit);
    const arrived = emit ? drawn >= 1 : true;    /* an emitted line is on the strip once its connector is drawn; an absorbed one was there from the start */
    if (!same && drawn >= 1) landed.add(key);
    /* the ladder and the strip */
    const X = wavelengthAxis(ctx, STRIP, 44, '波长 λ（nm），对数标度');
    /* the line from the transition to its place on the spectrum, drawn from the side that gives the photon, beneath the rung labels */
    if (!same) {
      const y1 = ladderY(ni, LAD.top, LAD.bottom), y2 = ladderY(nf, LAD.top, LAD.bottom);
      const from = emit ? [AX, y2] : [X(nm), STRIP.y - 80], to = emit ? [X(nm), STRIP.y - 80] : [AX, y1];
      connector(ctx, from, to, drawn, lineColor(nm));
    }
    const { Y, S } = rungs(ctx, { ...LAD, nmax: 6, Z, labelX: 790 });
    /* every line landed so far for this ion, the current one drawn last */
    landed.forEach((k) => {
      const [z, pair] = k.split(':'); if (+z !== Z) return;
      const [a, b] = pair.split('-').map(Number), w = lambdaNm(a, b, Z);
      line(ctx, X(w), STRIP.y - 22, X(w), STRIP.y + 22, lineColor(w), k === key ? 4 : 2.5);
    });
    if (!same && arrived) {
      line(ctx, X(nm), STRIP.y - 22, X(nm), STRIP.y + 22, lineColor(nm), 4);
      text(ctx, nmU(nm), X(nm), STRIP.y - 58, visible(nm) ? PAL.ink : cw, { size: 17, weight: 600, align: 'center' });
    }
    /* the transition arrow and the bracket for |ΔE| */
    if (!same) {
      const y1 = Y[ni], y2 = Y[nf];
      /* the arrow is notation and stands still; only the electron moves (rule 24.1) */
      arrow(ctx, AX, y1, AX, y2, ce, 4);
      vbracket(ctx, AX - 50, Math.min(y1, y2), Math.max(y1, y2), ce);
      text(ctx, '|ΔE| = ' + sciU(Math.abs(dE)) + ' J', AX + 22, Math.abs(y1 - y2) < 40 ? Y[INS.from] + 24 : (y1 + y2) / 2, ce, { size: 18, weight: 600, align: 'left', bg: PAL.panel });
      /* the electron on its rung, or between them */
      dot(ctx, EX, y1 + (y2 - y1) * jump, F.el('e-'), true, 9); hits.push({ x: EX, y: y1 + (y2 - y1) * jump, r: 13, name: '电子' });
    } else {
      dot(ctx, EX, Y[ni], F.el('e-'), true, 9); hits.push({ x: EX, y: Y[ni], r: 13, name: '电子' });
    }
    /* the electron is named beside its place and never on the rung it sits on, with a leader back to it */
    const eY = same ? Y[ni] : Y[ni] + (Y[nf] - Y[ni]) * jump, lY = eY < 210 ? eY + 38 : eY - 38;
    line(ctx, EX - 12, eY + (lY > eY ? 10 : -10), EX - 26, lY + (lY > eY ? -10 : 10), alpha(PAL.ink, 0.4), 1.5);
    text(ctx, '电子', EX - 32, lY, PAL.muted, { size: 16, align: 'right', bg: PAL.panel });
    /* the rungs from n = 3 up lie within fifty units of one another, so they are drawn again magnified, with the factor stated (rule 28.4) */
    magnified(ctx, Z, ni, nf, jump, same, S);
    /* the headline and the readout */
    topline(ctx, same
      ? '在' + pad(ion) + '中，起始轨道和终止轨道都是 n = ' + ni + '，所以电子保持其 ' + sciU(energy(ni, Z)) + ' J 的能量，既不发射也不吸收。'
      : emit
        ? '在' + pad(ion) + '中，电子从 n = ' + ni + ' 落到 n = ' + nf + '，原子发射一个波长为 ' + nmU(nm) + ' 的光子，属于' + region(nm) + '。'
        : '一个波长为 ' + nmU(nm) + ' 的光子（属于' + region(nm) + '）被吸收，电子在' + pad(ion) + '中从 n = ' + ni + ' 升到 n = ' + nf + '。');
    const kZ = `\\mk{k}{\\kk}\\mk{Z}{Z^2}`, kZval = `(\\mk{kval}{${sciT(K)}\\ \\text{J}})(\\mk{Zval}{${Z}})^2`;
    const f = same
      ? `\\mk{En}{\\kEn}=-\\frac{${kZ}}{\\mk{n1}{n^2}}=-\\frac{${kZval}}{\\mk{nival}{${ni}}^2}=\\mk{Enval}{${sciT(energy(ni, Z))}\\ \\text{J}}`
      : `\\mk{dE}{\\kdE}=${kZ}\\left(\\mk{n1}{\\frac{1}{n_1^{2}}}-\\mk{n2}{\\frac{1}{n_2^{2}}}\\right)=${kZval}\\left(\\frac{1}{\\mk{nival}{${ni}}^2}-\\frac{1}{\\mk{nfval}{${nf}}^2}\\right)=\\mk{dEval}{${sciT(dE)}\\ \\text{J}}`;
    if (f !== shown) { shown = f; F.morph(fx, f); }
    note.textContent = same
      ? '换成任何别的轨道，都会给出一个携带两个能量之差的光子。'
      : '光子的 $\\klam=h\\kc/|\\kdE|$ = ' + nmU(nm) + '。' + (emit
        ? '能量差为负，所以原子发射该光子。'
        : '能量差为正，所以必须吸收一个恰好具有这一能量的光子。');
    F.renderMath(note);
  }
  reset();
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   SIM: the orbit and the rung. The circular orbit of the electron at a
   fixed scale on the left, its energy as a rung of the ladder on the
   right, one n slider moving both. Still: a set of orbits answers its
   sliders and nothing here has a clock.
===================================================================== */
(function () {
  const d = sim('sim-orbit-rung', 720);
  const N = qn(d.controls, { label: 'n', min: 1, max: 6, value: 3, aria: '轨道的量子数' });
  const ZC = ionPick(d.controls);
  const SCALE = 7.5;                              /* canvas units per Bohr radius, fixed so that the largest orbit the buttons reach, n = 6 in hydrogen, still stands inside the frame */
  const CX = 360, CY = 400, FR = { l: 40, r: 720, t: 96, b: 690 };
  let hits = []; F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c);
    hits = [];
    const n = N.v, Z = ZC.v, Zm = ZC.mix((z) => z), ce = C('energy'), cr = C('length'), cel = F.el('e-');
    const rA = (n * n) / Z, rD = (n * n) / Zm, rM = radiusM(n, Z), E = energy(n, Z), ion = ZC.name;
    /* the orbits, clipped to their frame */
    ctx.save(); ctx.beginPath(); ctx.rect(FR.l, FR.t, FR.r - FR.l, FR.b - FR.t); ctx.clip();
    for (let m = 1; m <= 6; m++) {
      const r = (m * m / Zm) * SCALE;
      ctx.save(); ctx.strokeStyle = m === n ? PAL.ink : alpha(PAL.ink, 0.28); ctx.lineWidth = m === n ? 3 : 1.5; ctx.beginPath(); ctx.arc(CX, CY, r, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
    }
    ctx.restore();
    /* the nucleus and its charge */
    dot(ctx, CX, CY, PAL.ink, true, 8); hits.push({ x: CX, y: CY, r: 12, name: '原子核，电荷 +' + Z });
    text(ctx, '+' + Z, CX - 14, CY + 18, PAL.ink, { size: 17, weight: 600, align: 'right' });
    /* the electron at the first angle that keeps it inside the frame, else a hollow marker at the frame's edge */
    const r = rD * SCALE;
    const angles = [45, 30, 60, 15, 75, 0, 90, -15, -30, -45];
    let placed = null;
    for (const a of angles) { const x = CX + r * Math.cos(a * Math.PI / 180), y = CY - r * Math.sin(a * Math.PI / 180); if (x > FR.l + 14 && x < FR.r - 14 && y > FR.t + 14 && y < FR.b - 14) { placed = [x, y]; break; } }
    if (placed) {
      line(ctx, CX, CY, placed[0], placed[1], cr, 2, [4, 8]);
      dot(ctx, placed[0], placed[1], cel, true, 9); hits.push({ x: placed[0], y: placed[1], r: 13, name: 'n = ' + n + ' 轨道上的电子' });
      const rs = 'r = ' + fmt(rA, rA < 10 ? 2 : 1) + ' a₀ = ' + fmt(rM * 1e10, 2) + ' Å', far = placed[0] > 500, near = r < 40;
      text(ctx, rs, near ? CX + 34 : far ? placed[0] - 16 : placed[0] + 16, near ? CY - 44 : placed[1] - 18, cr, { size: 18, weight: 600, align: far ? 'right' : 'left', bg: PAL.panel });
    } else {
      const ex = FR.r - 20, ey = CY - (FR.r - 20 - CX) * Math.tan(Math.PI / 12);
      dot(ctx, ex, ey, cel, false, 9);
      arrow(ctx, ex - 40, ey, ex - 12, ey, PAL.ink, 3);
      text(ctx, 'r = ' + fmt(rA, 1) + ' a₀ = ' + fmt(rM * 1e10, 1) + ' Å，超出画框', ex - 20, ey - 24, cr, { size: 17, weight: 600, align: 'right', bg: PAL.panel });
    }
    /* the scale bar */
    line(ctx, FR.l + 20, FR.b - 18, FR.l + 20 + 10 * SCALE, FR.b - 18, PAL.ink, 3);
    line(ctx, FR.l + 20, FR.b - 26, FR.l + 20, FR.b - 10, PAL.ink, 2); line(ctx, FR.l + 20 + 10 * SCALE, FR.b - 26, FR.l + 20 + 10 * SCALE, FR.b - 10, PAL.ink, 2);
    text(ctx, '10 a₀ = 5.29 Å', FR.l + 20 + 10 * SCALE + 14, FR.b - 18, PAL.muted, { size: 16 });
    text(ctx, pad(ion).trimStart() + '的 n = 1 至 6 轨道', FR.l + 20, FR.t + 6, PAL.muted, { size: 16, bg: PAL.panel });
    /* the ladder on the right, with the chosen rung marked and the energy to the limit bracketed */
    const LAD = { l: 960, r: 1100, top: 176, bottom: 650 };
    const Y = ladder(ctx, { ...LAD, nmax: 6, Z, labelX: 1132 });
    line(ctx, LAD.l, Y[n], LAD.r, Y[n], ce, 7);
    dot(ctx, LAD.l + 30, Y[n], cel, true, 9); hits.push({ x: LAD.l + 30, y: Y[n], r: 13, name: 'n = ' + n + ' 横档上的电子' });
    if (Y[n] - LAD.top > 8) vbracket(ctx, LAD.l - 70, LAD.top, Y[n], ce);
    text(ctx, '到 E = 0：', 800, (LAD.top + Y[n]) / 2 - 14, ce, { size: 17, weight: 600, align: 'center', bg: PAL.panel });
    text(ctx, sciU(-E) + ' J', 800, (LAD.top + Y[n]) / 2 + 12, ce, { size: 17, weight: 600, align: 'center', bg: PAL.panel });
    text(ctx, '电离极限', LAD.r, LAD.top - 16, ce, { size: 16, align: 'right' });
    /* the headline and the readout */
    topline(ctx, '在' + pad(ion) + '中，n = ' + n + ' 轨道的半径为 ' + fmt(rA, rA < 10 ? 2 : 1) + ' a₀，即 ' + fmt(rM * 1e10, 2) + ' Å，其上电子的能量为 ' + sciU(E) + ' J。');
    readout(d.readout,
      `\\kEn=-\\frac{\\kk Z^2}{n^2}=-\\frac{(${sciT(K)}\\ \\text{J})(${Z})^2}{${n}^2}=${sciT(E)}\\ \\text{J}`,
      '半径为 $\\kr=(n^2/Z)\\,\\kao$ = ' + sciU(rM) + ' m。' + (n === 1 && Z === 1 ? '这是氢的基态。' : ''));
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
  const N1 = qn(d.controls, { label: 'n_1', min: 1, max: 4, value: 2, aria: '电子落向的轨道' });
  const N2 = qn(d.controls, { label: 'n_2\\ \\text{最高到}', min: 3, max: 12, value: 8, aria: '电子起始的最高轨道' });
  const ZC = ionPick(d.controls);
  const STRIP = { l: 200, r: 1300, y: 300 };
  function draw() {
    const { ctx } = begin(d.c);
    const n1 = N1.v; if (N2.v <= n1) N2.set(n1 + 1);   /* the highest orbit is always above the one the electron falls to, and the control is moved rather than silently overridden */
    const hi = N2.v, Z = ZC.v, Zm = ZC.mix((z) => z), cw = C('wavelength'), ion = ZC.name;
    const X = wavelengthAxis(ctx, STRIP, 56, '波长 λ（nm），对数标度', true);
    /* a change of ion slides every line to its new wavelength, the same transitions in the same frame */
    const lines = []; for (let n2 = n1 + 1; n2 <= hi; n2++) lines.push({ n2, nm: lambdaNm(n1, n2, Zm), at: lambdaNm(n1, n2, Z) });
    const limit = (n1 * n1) / (RINF * Zm * Zm) * 1e9, limitAt = (n1 * n1) / (RINF * Z * Z) * 1e9;
    /* the limit, then the lines from the longest wavelength down, each labelled where there is room */
    line(ctx, X(limit), STRIP.y - 88, X(limit), STRIP.y + 34, cw, 2.5, [10, 10]);
    text(ctx, '线系极限，' + nmU(limitAt), X(limit) - 10, STRIP.y - 102, cw, { size: 17, weight: 600, align: 'right', bg: PAL.panel });
    let lastLabel = Infinity;
    lines.forEach((q) => {
      line(ctx, X(q.nm), STRIP.y - 40, X(q.nm), STRIP.y + 36, lineColor(q.nm), 3.5);
      if (lastLabel - X(q.nm) > 24) { text(ctx, String(q.n2), X(q.nm), STRIP.y - 56, PAL.ink, { size: 16, align: 'center' }); lastLabel = X(q.nm); }
    });
    text(ctx, '每条谱线是从其上方标出的轨道 n₂ 落到 n₁ = ' + n1 + ' 的一次跃迁', STRIP.l, STRIP.y - 134, PAL.muted, { size: 17 });
    /* what the reader sees */
    /* one boundary at each end of the visible band, so the three counts always add up to the number of lines */
    const nVis = lines.filter((q) => visible(q.at)).length, nUV = lines.filter((q) => q.at < 400).length, nIR = lines.filter((q) => q.at > 700).length;
    const first = lines[0], last = lines[lines.length - 1];
    const where = [nVis ? nVis + ' 条在可见光区' : '', nUV ? nUV + ' 条在紫外线区' : '', nIR ? nIR + ' 条在红外线区' : ''].filter(Boolean).join('，');
    topline(ctx, '在' + pad(ion) + '中，从 n₂ = ' + (n1 + 1) + ' 到 ' + hi + ' 落到 n₁ = ' + n1 + ' 的跃迁给出 ' + lines.length + ' 条谱线，波长从 ' + nmU(first.at) + ' 到 ' + nmU(last.at) + '（' + where + '），向 ' + nmU(limitAt) + ' 处的线系极限聚拢。');
    readout(d.readout,
      `\\frac{1}{\\klam}=\\frac{\\kk}{h\\kc}\\,Z^2\\left(\\frac{1}{n_1^{2}}-\\frac{1}{n_2^{2}}\\right)=(${sciT(RINF)}\\ \\text{m}^{-1})(${Z})^2\\left(\\frac{1}{${n1}^2}-\\frac{1}{n_2^{2}}\\right)`,
      (n1 === 2 && Z === 1 ? '四条可见谱线，位于 656、486、434 和 410 nm，是巴耳末用整数拟合的那几条；' : '') + '商 $\\kk/h\\kc$ 是里德伯常量，1.097 × 10⁷ m⁻¹。');
  }
  register(d.fig, { update: () => {}, draw });
})();
};
