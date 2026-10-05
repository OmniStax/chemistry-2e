/* Figures for section 21.6 Biological Effects of Radiation. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['21.6'] = function (root, F) {
const { C, PAL, alpha, register, begin, line, arrow, text, topline, cycle, tex, fmt } = F;
const sim = (id, H) => F.sim(root, id, H);
const still = (d, draw) => register(d.fig, { update: () => {}, draw });
const TAU = 2 * Math.PI;
const SUP = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
const sup = (n) => String(n).split('').map((c) => SUP[c]).join('');
/* a positive number as mantissa and power of ten, the mantissa to three figures */
function sci(v) {
  let n = Math.floor(Math.log10(v) + 1e-9), m = v / 10 ** n;
  if (+m.toFixed(2) >= 10) { m /= 10; n += 1; }
  return { m: m.toFixed(2), n };
}
const sciText = (v) => { const s = sci(v); return `${s.m} × 10${sup(s.n)}`; };
const sciTex = (v) => { const s = sci(v); return `${s.m}\\times10^{${s.n}}`; };
/* two significant figures */
const decOf = (v) => Math.max(0, 1 - Math.floor(Math.log10(v) + 1e-9));
const sig2 = (v) => +v.toFixed(decOf(v));

/* A particle drawn as a disc in its palette colour, its charge as a sign drawn on it. */
function disc(ctx, x, y, r, fill, s) {
  ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fillStyle = fill; ctx.fill();
  ctx.strokeStyle = alpha(PAL.ink, 0.45); ctx.lineWidth = Math.max(1, r * 0.09); ctx.stroke(); ctx.restore();
  if (!s) return;
  const a = r * 0.5, w = Math.max(1.5, r * 0.2);
  line(ctx, x - a, y, x + a, y, PAL.panel, w);
  if (s > 0) line(ctx, x, y - a, x, y + a, PAL.panel, w);
}
function alphaParticle(ctx, x, y, r) {
  const o = r * 0.72;
  disc(ctx, x - o, y - o, r, F.el('n0')); disc(ctx, x + o, y - o, r, F.el('p+'), 1);
  disc(ctx, x - o, y + o, r, F.el('p+'), 1); disc(ctx, x + o, y + o, r, F.el('n0'));
}
/* a γ photon: a wave packet of length len ending at (x, y), heading along (ux, uy) */
function photon(ctx, x, y, ux, uy, len, amp, color, w = 3) {
  const px = -uy, py = ux;
  ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = w; ctx.beginPath();
  for (let s = 0; s <= len; s += 2) {
    const k = Math.sin((s / len) * Math.PI), o = amp * k * Math.sin((s / 13) * TAU);
    const qx = x - ux * (len - s) + px * o, qy = y - uy * (len - s) + py * o;
    s ? ctx.lineTo(qx, qy) : ctx.moveTo(qx, qy);
  }
  ctx.stroke(); ctx.restore();
}
const clamp01 = (k) => Math.min(1, Math.max(0, k));
const lerp = (a, b, k) => a + (b - a) * k;
function burst(ctx, x, y, r, color, k) {
  if (k <= 0) return;
  ctx.save(); ctx.globalAlpha *= k; ctx.beginPath();
  for (let i = 0; i <= 16; i++) { const a = (i / 16) * TAU, q = i % 2 ? r * 0.45 : r; i ? ctx.lineTo(x + q * Math.cos(a), y + q * Math.sin(a)) : ctx.moveTo(x + q * Math.cos(a), y + q * Math.sin(a)); }
  ctx.closePath(); ctx.fillStyle = alpha(color, 0.18); ctx.fill(); ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.stroke(); ctx.restore();
}

/* =====================================================================
   FIGURE 21.31: the electromagnetic spectrum split into nonionizing and
   ionizing radiation. A slider walks log ν from 10 Hz to 10²² Hz; the
   strip keeps the book's band widths, each band a stretch of log ν, so
   the narrow visible band stays readable. Still.
===================================================================== */
(function () {
  const H = 440, X0 = 60, X1 = 1340;
  const d = sim('sim-ionizing', H);
  /* the book's bands: their widths on its strip (of 1300) and their edges in log10 Hz */
  const BANDS = [
    { name: 'radio', w: 355, lo: 1, hi: Math.log10(3e8), col: 0 },
    { name: 'microwave', w: 145, lo: Math.log10(3e8), hi: Math.log10(3e11), col: 1 },
    { name: 'terahertz', w: 120, lo: Math.log10(3e11), hi: 13, col: 1 },
    { name: 'infrared', w: 135, lo: 13, hi: Math.log10(4e14), col: 2 },
    { name: 'visible', w: 150, lo: Math.log10(4e14), hi: Math.log10(7.5e14), col: 2 },
    { name: 'ultraviolet', w: 120, lo: Math.log10(7.5e14), hi: Math.log10(3e16), col: 3 },
    { name: 'X-ray', w: 175, lo: Math.log10(3e16), hi: Math.log10(3e19), col: 3 },
    { name: 'γ ray', w: 100, lo: Math.log10(3e19), hi: 22, col: 3 },
  ];
  const k = (X1 - X0) / BANDS.reduce((s, b) => s + b.w, 0);
  let acc = X0; BANDS.forEach((b) => { b.x0 = acc; acc += b.w * k; b.x1 = acc; });
  const xOf = (lv) => {
    const b = bandOf(lv);
    return b.x0 + ((Math.min(Math.max(lv, b.lo), b.hi) - b.lo) / (b.hi - b.lo)) * (b.x1 - b.x0);
  };
  const bandOf = (lv) => BANDS.find((q) => lv < q.hi) ?? BANDS[BANDS.length - 1];
  const SPLIT = Math.log10(7.5e14);
  const COLS = [
    { head: 'Non-thermal', lines: ['Induces low currents'], effect: 'nonionizing, inducing low currents' },
    { head: 'Thermal', lines: ['Induces high currents', 'Heating'], effect: 'nonionizing, heating what absorbs it' },
    { head: 'Optical', lines: ['Excites electrons', 'Photo-chemical effects'], effect: 'nonionizing, exciting electrons' },
    { head: 'Broken bonds', lines: ['Damages DNA'], effect: 'ionizing, able to break bonds and damage DNA' },
  ];
  COLS.forEach((c, i) => { const bs = BANDS.filter((b) => b.col === i); c.x0 = bs[0].x0; c.x1 = bs[bs.length - 1].x1; });
  /* the book's everyday sources, at their usual frequencies */
  const SOURCES = [
    { name: 'power line', lv: Math.log10(60), row: 0 }, { name: 'AM radio', lv: 6, row: 1 }, { name: 'FM radio', lv: 8, row: 0 },
    { name: 'microwave oven', lv: Math.log10(2.45e9), row: 1 }, { name: 'heat lamp', lv: Math.log10(3e14), row: 0 },
    { name: 'tanning booth', lv: 15, row: 1 }, { name: 'medical X-rays', lv: 19, row: 0 },
  ];
  const EDGES = [Math.log10(3e8), Math.log10(3e11), 13, Math.log10(4e14), Math.log10(7.5e14), Math.log10(3e16), Math.log10(3e19)];
  const edgeText = (lv) => { const v = 10 ** lv, n = Math.floor(lv + 1e-9), m = v / 10 ** n; return (Math.abs(m - 1) < 0.01 ? '' : `${+m.toFixed(1)} × `) + `10${sup(n)}`; };
  const nu = F.ctl(d.controls, {
    label: '\\knu', cls: 'frequency', min: 1, max: 22, step: 0.01, value: +Math.log10(2.45e9).toFixed(2), unit: 'Hz', dec: 2,
    aria: 'the frequency of the radiation, on a logarithmic scale', specials: [{ at: SPLIT, label: 'ionizing' }], onInput: () => show(),
  });
  const valEl = nu.el.querySelector('.ctl-val'), inp = nu.el.querySelector('input');
  const show = () => { const s = sciText(10 ** nu.v) + ' Hz'; valEl.textContent = s; inp.setAttribute('aria-valuetext', s); };
  show();
  /* the visible band in the colours of light, a physical fact */
  function lightRGB(nm) {
    let r = 0, g = 0, b = 0;
    if (nm < 440) { r = -(nm - 440) / 60; b = 1; } else if (nm < 490) { g = (nm - 440) / 50; b = 1; } else if (nm < 510) { g = 1; b = -(nm - 510) / 20; }
    else if (nm < 580) { r = (nm - 510) / 70; g = 1; } else if (nm < 645) { r = 1; g = -(nm - 645) / 65; } else r = 1;
    const ch = (v) => Math.round(255 * Math.pow(Math.min(1, Math.max(0, v)), 0.8));
    return F.fact(`rgb(${ch(r)},${ch(g)},${ch(b)})`);
  }
  let hits = [];
  F.hover(d.stage, () => hits);
  const SY = 196, SH = 40;
  function draw() {
    const { ctx } = begin(d.c), lv = nu.v, sv = sci(10 ** lv), v = +sv.m * 10 ** sv.n, band = bandOf(lv), col = COLS[band.col], E = 6.626e-34 * v;
    topline(ctx, `At $\\knu$ = ${sciText(v)} Hz the radiation is ${band.name === 'γ ray' ? 'a γ ray' : band.name}: ${col.effect}.`);
    /* the book's wave, its wavelength shortening along the strip */
    ctx.save(); ctx.strokeStyle = alpha(PAL.ink, 0.45); ctx.lineWidth = 2; ctx.beginPath();
    let ph = 0;
    for (let x = X0; x <= X1; x += 1) { ph += TAU / (90 * Math.pow(0.04, (x - X0) / (X1 - X0)) + 3); const y = 104 + 9 * Math.sin(ph); x === X0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); }
    ctx.stroke(); ctx.restore();
    /* nonionizing | ionizing */
    const xs = xOf(SPLIT);
    arrow(ctx, xs, 146, X0, 146, PAL.ink, 4); arrow(ctx, xs, 146, X1, 146, PAL.ink, 4);
    line(ctx, xs, 134, xs, 158, PAL.ink, 3);
    text(ctx, 'nonionizing', (X0 + xs) / 2, 128, PAL.ink, { size: 20, align: 'center', weight: 600 });
    text(ctx, 'ionizing', (xs + X1) / 2, 128, PAL.ink, { size: 20, align: 'center', weight: 600 });
    EDGES.forEach((e) => { const x = xOf(e); line(ctx, x, SY - 6, x, SY, PAL.muted, 2); });
    EDGES.forEach((e, i) => text(ctx, edgeText(e), xOf(e), 178, PAL.muted, { size: 15, align: i === 3 || i === 4 ? 'right' : i === 5 ? 'left' : 'center' }));
    /* the effect columns, the current one shaded */
    ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.07); ctx.fillRect(col.x0, SY + SH, col.x1 - col.x0, H - 6 - SY - SH); ctx.restore();
    /* the bands */
    BANDS.forEach((b) => {
      if (b.name === 'visible') for (let x = b.x0; x < b.x1; x += 2) { ctx.save(); ctx.fillStyle = lightRGB(700 - ((x - b.x0) / (b.x1 - b.x0)) * 300); ctx.fillRect(x, SY, 2.5, SH); ctx.restore(); }
      else if (b === band) { ctx.save(); ctx.fillStyle = alpha(C('frequency'), 0.14); ctx.fillRect(b.x0, SY, b.x1 - b.x0, SH); ctx.restore(); }
      line(ctx, b.x0, SY, b.x0, SY + SH, PAL.rule, 2);
      text(ctx, b.name, (b.x0 + b.x1) / 2, SY + SH / 2, PAL.ink, { size: 18, align: 'center', weight: b === band ? 700 : 400, bg: b.name === 'visible' ? PAL.panel : undefined });
    });
    ctx.save(); ctx.strokeStyle = PAL.muted; ctx.lineWidth = 2; ctx.strokeRect(X0, SY, X1 - X0, SH); ctx.restore();
    /* the sources */
    SOURCES.forEach((s) => { const x = xOf(s.lv), y = SY + SH + 20 + s.row * 24; line(ctx, x, SY + SH, x, y - 10, alpha(PAL.ink, 0.35), 1.5); text(ctx, s.name, x, y, PAL.muted, { size: 16, align: 'center' }); });
    COLS.forEach((c, i) => {
      const cx = (c.x0 + c.x1) / 2, on = c === col;
      if (i) line(ctx, c.x0, SY + SH + 70, c.x0, H - 10, PAL.rule, 1.5);
      text(ctx, c.head, cx, SY + SH + 92, on ? PAL.ink : PAL.muted, { size: 20, align: 'center', weight: 700 });
      c.lines.forEach((l, j) => text(ctx, l, cx, SY + SH + 122 + j * 26, on ? PAL.ink : PAL.muted, { size: 17, align: 'center' }));
    });
    /* the reader's frequency */
    const x = xOf(lv), cf = C('frequency');
    F.dot(ctx, x, 104, cf, true, 7);
    line(ctx, x, SY - 8, x, SY + SH + 6, cf, 4);
    F.dot(ctx, x, SY + SH / 2, cf, true, 9);
    hits = [{ x, y: SY + SH / 2, r: 18, name: `ν = ${sciText(v)} Hz, ${band.name}` }].concat(BANDS.map((b) => ({ x: (b.x0 + b.x1) / 2, y: SY + SH / 2, r: 30, name: `${b.name}: ${edgeText(b.lo)} to ${edgeText(b.hi)} Hz` })));
    tex(d.readout, `\\kE = h\\knu = (6.626\\times10^{-34}\\ \\text{J s})(${sciTex(v)}\\ \\text{Hz}) = ${sciTex(E)}\\ \\text{J}`);
  }
  still(d, draw);
})();

/* =====================================================================
   FIGURE 21.32: direct and indirect damage. A γ photon arrives; in the
   direct path it ionizes the DNA and a strand breaks; in the indirect
   path it ionizes a water molecule, a proton passes from H₂O⁺ to a
   second water molecule, and the hydroxyl radical drifts to the DNA and
   breaks a strand. Moving: one event, 3 s or 5.6 s, holding 1.2 s.
===================================================================== */
(function () {
  const H = 440;
  const d = sim('sim-damage', H);
  const path = F.choice(d.controls, { label: 'path', options: [{ value: 'direct', label: 'direct' }, { value: 'indirect', label: 'indirect' }], value: 'indirect', onInput: () => { cy.reset(); say(); } });
  const T = () => (path.value === 'direct' ? 3.2 : 5.6);
  const cy = cycle(T, 1.2);
  const ro = F.readout(d);
  const EQ = {
    direct: '\\mk{m}{\\text{biomolecule}}+\\mk{r}{\\text{radiation}}\\longrightarrow\\mk{i}{\\text{biomolecule}^{+}}+\\mk{e}{\\text{e}^{-}}',
    indirect: '\\mk{m}{\\text{H}_{2}\\text{O}}+\\mk{r}{\\text{radiation}}\\longrightarrow\\mk{i}{\\text{H}_{2}\\text{O}^{+}}+\\mk{e}{\\text{e}^{-}},\\quad\\mk{i2}{\\text{H}_{2}\\text{O}^{+}}+\\mk{w}{\\text{H}_{2}\\text{O}}\\longrightarrow\\mk{h}{\\text{H}_{3}\\text{O}^{+}}+\\mk{oh}{\\text{OH}^{\\bullet}}',
  };
  const say = () => ro.set(EQ[path.value], undefined, { form: path.value });
  say();
  /* the DNA: two strands about a vertical axis */
  const DX = 1110, DY0 = 92, DY1 = 420, AMP = 62, PER = 170;
  const strand = (y, s) => DX + AMP * Math.sin(((y - DY0) / PER) * TAU + s * Math.PI);
  const BREAK = { direct: 214, indirect: 300 };
  function dna(ctx, yb, kb) {
    for (let y = DY0 + 6; y < DY1; y += 15) {
      const a = strand(y, 0), b = strand(y, 1);
      if (Math.abs(a - b) > 14) line(ctx, a, y, b, y, alpha(PAL.ink, 0.28), 4);
    }
    [1, 0].forEach((s) => {
      ctx.save(); ctx.strokeStyle = s ? PAL.muted : PAL.ink; ctx.lineWidth = 6; ctx.beginPath();
      let on = false;
      for (let y = DY0; y <= DY1; y += 2) {
        const gap = s === 0 && kb > 0 && Math.abs(y - yb) < 9 * kb;
        if (gap) { on = false; continue; }
        const x = strand(y, s); on ? ctx.lineTo(x, y) : ctx.moveTo(x, y); on = true;
      }
      ctx.stroke(); ctx.restore();
    });
  }
  function water(ctx, x, y, nH, radical, plus) {
    const O = F.el('O'), Hc = F.el('H');
    const spots = nH === 3 ? [[-30, 16], [30, 16], [0, -32]] : nH === 2 ? [[-30, 18], [30, 18]] : [[30, 18]];
    spots.forEach(([dx, dy]) => disc(ctx, x + dx, y + dy, 15, Hc));
    disc(ctx, x, y, 24, O);
    if (radical) F.dot(ctx, x - 18, y - 30, PAL.ink, true, 5);
    if (plus) { ctx.save(); ctx.strokeStyle = alpha(PAL.ink, 0.6); ctx.lineWidth = 2; ctx.setLineDash([5, 5]); ctx.beginPath(); ctx.arc(x, y + 4, 46, 0, TAU); ctx.stroke(); ctx.restore(); }
  }
  let hits = [];
  F.hover(d.stage, () => hits);
  const A = { x: 560, y: 250 }, B = { x: 720, y: 250 };
  function draw() {
    const { ctx } = begin(d.c), t = cy.now(), ind = path.value === 'indirect';
    hits = [];
    topline(ctx, ind ? 'Indirect effect: radiation ionizes water, and the hydroxyl radical formed breaks the DNA.' : 'Direct effect: the radiation ionizes the DNA itself, and a strand breaks.');
    const tgt = ind ? A : { x: strand(BREAK.direct, 0), y: BREAK.direct };
    const tBreak = ind ? 4.75 : 1.0, kb = clamp01((t - tBreak) / 0.3);
    dna(ctx, BREAK[path.value], kb);
    text(ctx, 'DNA', DX, DY0 - 2 + 0, PAL.ink, { size: 20, align: 'center', weight: 600, bg: PAL.panel });
    hits.push({ x: DX, y: (DY0 + DY1) / 2, r: 70, name: 'DNA, a biomolecule' });
    const bx = strand(BREAK[path.value], 0), by = BREAK[path.value];
    burst(ctx, bx, by, 26, PAL.ink, kb * (1 - 0.5 * clamp01((t - tBreak - 0.8) / 0.6)));
    if (kb > 0) hits.push({ x: bx, y: by, r: 26, name: 'a broken strand of the DNA' });
    /* the photon arrives over the first second */
    const P0 = ind ? { x: 300, y: 112 } : { x: 760, y: 108 };
    if (t < 1.0) {
      const kp = t / 1.0, ux = tgt.x - P0.x, uy = tgt.y - P0.y, L = Math.hypot(ux, uy);
      const hx = lerp(P0.x, tgt.x - (ux / L) * 26, kp), hy = lerp(P0.y, tgt.y - (uy / L) * 26, kp);
      photon(ctx, hx, hy, ux / L, uy / L, 90, 8, F.el('gamma'));
      hits.push({ x: hx, y: hy, r: 30, name: 'a γ photon' });
    }
    /* the electron knocked out */
    if (t >= 1.0 && t < 2.2) {
      const ke = F.ease.out(clamp01((t - 1.0) / 1.0)), ex = tgt.x - 30 - 170 * ke, ey = tgt.y + 30 + 120 * ke;
      ctx.save(); ctx.globalAlpha = 1 - clamp01((t - 1.8) / 0.4); disc(ctx, ex, ey, 10, F.el('e-'), -1); ctx.restore();
      hits.push({ x: ex, y: ey, r: 16, name: 'an electron, knocked out' });
    }
    if (!ind) return;
    /* water A: H₂O, then H₂O⁺, then OH• that leaves for the DNA */
    const kh = F.ease.smooth(clamp01((t - 2.0) / 0.8));
    const kr = F.ease.smooth(clamp01((t - 3.3) / 1.45));
    const R = { x: lerp(A.x, bx - 40, kr), y: lerp(A.y, by, kr) - 70 * Math.sin(Math.PI * kr) };
    if (t < 2.8) water(ctx, A.x, A.y, t >= 2.0 ? 1 : 2, false, t >= 1.0);
    else if (kr < 1 || t < 4.75) water(ctx, R.x, R.y, 1, true, false);
    /* the proton passing from H₂O⁺ to the second water */
    if (t >= 2.0 && t < 2.8) { const px = lerp(A.x - 30, B.x - 52, kh), py = A.y + 18 - 30 * Math.sin(Math.PI * kh); disc(ctx, px, py, 15, F.el('H'), 1); hits.push({ x: px, y: py, r: 18, name: 'a proton, H⁺, passing to the second water molecule' }); }
    water(ctx, B.x, B.y, t >= 2.8 ? 3 : 2, false, t >= 2.8);
    const lab = (s, x, y) => text(ctx, s, x, y + 76, PAL.ink, { size: 22, align: 'center', tex: true });
    const restA = t < 2.0 || (t >= 2.8 && t < 3.3);
    if (restA) lab(t < 1.0 ? '$\\text{H}_{2}\\text{O}$' : t < 2.0 ? '$\\text{H}_{2}\\text{O}^{+}$' : '$\\text{OH}^{\\bullet}$', A.x, A.y);
    if (t < 2.0 || t >= 2.8) lab(t < 2.8 ? '$\\text{H}_{2}\\text{O}$' : '$\\text{H}_{3}\\text{O}^{+}$', B.x, B.y);
    hits.push({ x: B.x, y: B.y, r: 40, name: t < 2.8 ? 'a water molecule, H₂O' : 'a hydronium ion, H₃O⁺' });
    hits.push(t < 2.8 ? { x: A.x, y: A.y, r: 40, name: t < 1.0 ? 'a water molecule, H₂O' : 'an ionized water molecule, H₂O⁺' } : { x: R.x, y: R.y, r: 36, name: 'a hydroxyl radical, OH•' });
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();

/* =====================================================================
   FIGURE 21.33: α, β, neutron and γ against paper, a hand, metal, water,
   concrete and lead. Particles leave the source every 0.8 s and stop
   where the book's arrows stop; each leaves ions behind it, the density
   in the text's ratio α : n : β : γ = 20 : 10 : 2 : 1. Moving: a 6 s
   loop holding 1.2 s.
===================================================================== */
(function () {
  const H = 520, T = 6, XS = 236;
  const d = sim('sim-penetration', H);
  const cy = cycle(() => T, 1.2);
  const LANES = [
    { key: 'a', name: 'α particle', y: 140, stop: 292, v: 170, per100: 10 },
    { key: 'b', name: 'β particle', y: 225, stop: 509, v: 420, per100: 1 },
    { key: 'n', name: 'neutron', y: 310, stop: 662, v: 320, per100: 5 },
    { key: 'g', name: 'γ ray', y: 395, stop: 1072, v: 760, per100: 0.5 },
  ];
  const EMIT = [0, 0.8, 1.6, 2.4, 3.2, 4.0, 4.8];
  /* a fixed scatter of ions along each particle's track */
  let seed = 7;
  const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  LANES.forEach((l) => {
    l.ions = EMIT.map(() => { const n = Math.max(1, Math.round(((l.stop - XS) * l.per100) / 100)); return Array.from({ length: n }, () => ({ x: XS + 20 + rnd() * (l.stop - XS - 20), dy: (rnd() - 0.5) * 34 })); });
  });
  const BAR = { paper: [296, 312], metal: [512, 530], glass: [600, 712], concrete: [790, 930], lead: [1030, 1120] };
  function ionMark(ctx, x, y, a) {
    if (a <= 0) return;
    ctx.save(); ctx.globalAlpha *= a;
    line(ctx, x - 4, y, x + 4, y, PAL.ink, 2); line(ctx, x, y - 4, x, y + 4, PAL.ink, 2);
    line(ctx, x + 8, y + 5, x + 15, y + 5, PAL.ink, 2);
    ctx.restore();
  }
  function particle(ctx, key, x, y) {
    if (key === 'a') alphaParticle(ctx, x, y, 8);
    else if (key === 'b') disc(ctx, x, y, 8, F.el('e-'), -1);
    else if (key === 'n') disc(ctx, x, y, 10, F.el('n0'));
    else photon(ctx, x + 20, y, 1, 0, 64, 7, F.el('gamma'));
  }
  let hits = [];
  F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c), t = cy.now();
    hits = [];
    topline(ctx, 'α particles stop in paper, β particles in metal, neutrons in water, and γ rays only in lead.');
    const top = 92, bot = 448;
    /* the barriers, back to front */
    const slab = (x0, x1, fill, name) => { ctx.save(); ctx.fillStyle = fill; ctx.fillRect(x0, top, x1 - x0, bot - top); ctx.strokeStyle = PAL.muted; ctx.lineWidth = 2; ctx.strokeRect(x0, top, x1 - x0, bot - top); ctx.restore(); hits.push({ x: (x0 + x1) / 2, y: 110, r: Math.max(16, (x1 - x0) / 2), name }); };
    slab(BAR.paper[0], BAR.paper[1], alpha(PAL.ink, 0.06), 'a sheet of paper');
    F.hand(ctx, 408, 462, { aim: [0, -1], view: 'palm', thumb: 'along', s: 2.3 });
    hits.push({ x: 410, y: 300, r: 50, name: 'a hand' });
    slab(BAR.metal[0], BAR.metal[1], alpha(PAL.ink, 0.28), 'a thin sheet of metal');
    { const [g0, g1] = BAR.glass, gt = 200;
      ctx.save(); ctx.beginPath(); ctx.moveTo(g0 + 4, gt + 30); ctx.lineTo(g1 - 4, gt + 30); ctx.lineTo(g1 - 12, bot); ctx.lineTo(g0 + 12, bot); ctx.closePath(); ctx.fillStyle = alpha(PAL.ink, 0.1); ctx.fill(); ctx.restore();
      ctx.save(); ctx.beginPath(); ctx.moveTo(g0, gt); ctx.lineTo(g0 + 12, bot); ctx.lineTo(g1 - 12, bot); ctx.lineTo(g1, gt); ctx.strokeStyle = PAL.muted; ctx.lineWidth = 3; ctx.stroke(); ctx.restore();
      line(ctx, g0 + 4, gt + 30, g1 - 4, gt + 30, alpha(PAL.ink, 0.4), 2);
      hits.push({ x: (g0 + g1) / 2, y: 330, r: 50, name: 'a glass of water' }); }
    slab(BAR.concrete[0], BAR.concrete[1], alpha(PAL.ink, 0.13), 'a thick block of concrete');
    for (let i = 0; i < 70; i++) { const x = BAR.concrete[0] + 8 + ((i * 0.6180339887 * 124) % 124), y = top + 10 + ((i * 0.7548776662 * 336 + i * i * 7.3) % 336); F.dot(ctx, x, y, alpha(PAL.ink, 0.35), true, 1.6); }
    slab(BAR.lead[0], BAR.lead[1], alpha(PAL.ink, 0.42), 'a thick block of lead');
    [['Paper', BAR.paper], ['Metal', BAR.metal], ['Water', BAR.glass], ['Concrete', BAR.concrete], ['Lead', BAR.lead]].forEach(([s, [a, b]]) => text(ctx, s, (a + b) / 2, 482, PAL.ink, { size: 20, align: 'center' }));
    /* the sources */
    LANES.forEach((l) => {
      text(ctx, l.name, 28, l.y, PAL.ink, { size: 20, weight: 600 });
      particle(ctx, l.key, l.key === 'g' ? 176 : 196, l.y);
    });
    /* ions, which fade as they recombine, then the particles in flight */
    LANES.forEach((l) => EMIT.forEach((e, i) => {
      const x = Math.min(XS + l.v * (t - e), l.stop);
      if (t < e) return;
      l.ions[i].forEach((q) => { if (q.x <= x) { const tq = e + (q.x - XS) / l.v; ionMark(ctx, q.x, l.y + q.dy, 1 - clamp01((t - tq - 1.4) / 0.8)); } });
    }));
    LANES.forEach((l) => EMIT.forEach((e) => {
      if (t < e) return;
      const x = Math.min(XS + l.v * (t - e), l.stop), tStop = e + (l.stop - XS) / l.v, a = 1 - clamp01((t - tStop) / 0.35);
      if (a <= 0) return;
      ctx.save(); ctx.globalAlpha = a; particle(ctx, l.key, x, l.y); ctx.restore();
      hits.push({ x, y: l.y, r: 18, name: `${l.name === 'neutron' ? 'a neutron' : l.name === 'γ ray' ? 'a γ ray' : 'an ' + l.name}` });
    }));
    /* the legend */
    ionMark(ctx, 1180, 482, 1); text(ctx, 'ion pair formed', 1204, 482, PAL.ink, { size: 18 });
    hits.push({ x: 1190, y: 482, r: 14, name: 'an ion pair, left where the radiation knocked out an electron' });
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
  tex(d.readout, '\\text{penetration: }\\alpha<\\beta<\\text{n}<\\gamma\\qquad\\text{ionizing power: }\\alpha:\\text{n}:\\beta:\\gamma\\approx20:10:2:1');
})();

/* =====================================================================
   SIM: number of rems = RBE × number of rads. The radiation sets the RBE
   and a slider the absorbed dose on a log scale; two strips share one
   logarithmic spacing, so the rem bar runs past the rad bar by log RBE.
   Table 21.5's exposures tick the rem strip. Still.
===================================================================== */
(function () {
  const H = 400, L0 = 230, L1 = 1330, LO = -2, HI = 4;
  const d = sim('sim-dose', H);
  const RBE = { a: 10, pn: 2, bg: 1 }, NAME = { a: 'α radiation', pn: 'protons or neutrons', bg: 'β or γ radiation' };
  const kind = F.choice(d.controls, { label: 'radiation', options: [{ value: 'a', label: 'α' }, { value: 'pn', label: 'protons, neutrons' }, { value: 'bg', label: 'β, γ' }], value: 'a', ms: 0, onInput: () => { rad.refresh(); show(); } });
  const rad = F.ctl(d.controls, {
    label: '\\text{absorbed dose}', cls: 'dose', key: 'rad', min: -1, max: 3, step: 0.01, value: Math.log10(5), unit: 'rad', dec: 2,
    aria: 'the absorbed dose in rad, on a logarithmic scale', specials: [{ at: () => Math.log10(500 / RBE[kind.value]), label: '500 rem' }], onInput: () => show(),
  });
  const valEl = rad.el.querySelector('.ctl-val'), inp = rad.el.querySelector('input');
  const radOf = () => sig2(10 ** rad.v);
  const radText = (v) => v.toFixed(decOf(v));
  const show = () => { const s = radText(radOf()) + ' rad'; valEl.textContent = s; inp.setAttribute('aria-valuetext', s); };
  show();
  const X = (v) => L0 + ((Math.log10(v) - LO) / (HI - LO)) * (L1 - L0);
  const EFFECTS = [
    { at: 5, to: 10, name: 'changes in blood chemistry' }, { at: 50, name: 'nausea' }, { at: 55, name: 'fatigue' }, { at: 70, name: 'vomiting' },
    { at: 75, name: 'hair loss' }, { at: 90, name: 'diarrhea' }, { at: 100, name: 'hemorrhage' }, { at: 400, name: 'possible death' },
    { at: 1000, name: 'destruction of intestinal lining, internal bleeding, death' }, { at: 2000, name: 'damage to central nervous system, loss of consciousness, death' },
  ];
  const S1 = 112, S2 = 222, SH = 38;
  const big = (v, dec) => (v >= 1000 ? v.toLocaleString('en-US') : v.toFixed(dec));
  const svOf = (s) => { const n = Math.min(3, s.replace(/[.,]/g, '').replace(/^0+/, '').length); return (+s.replace(/,/g, '') / 100).toPrecision(n); };
  let hits = [];
  F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c), r = RBE[kind.value], a = radOf(), dec = Math.max(0, decOf(a) - (r === 10 ? 1 : 0)), e = +(a * r).toFixed(dec), cd = C('dose');
    topline(ctx, `With ${NAME[kind.value]} (RBE = ${r}), an absorbed dose of ${radText(a)} rad does the damage of ${big(e, dec)} rem.`);
    /* decades */
    for (let p = LO; p <= HI; p++) {
      const x = X(10 ** p);
      line(ctx, x, S1 - 6, x, S2 + SH, PAL.rule, 1.5);
      text(ctx, p < 0 ? String(+(10 ** p).toFixed(2)) : (10 ** p).toLocaleString('en-US'), x, S1 - 18, PAL.muted, { size: 17, align: 'center' });
    }
    [[S1, 'absorbed dose', '(rad)'], [S2, 'dose equivalent', '(rem)']].forEach(([y, a1, a2]) => {
      text(ctx, a1, L0 - 20, y + SH / 2 - 11, cd, { size: 20, align: 'right', weight: 600 });
      text(ctx, a2, L0 - 20, y + SH / 2 + 13, cd, { size: 18, align: 'right' });
      ctx.save(); ctx.strokeStyle = PAL.muted; ctx.lineWidth = 2; ctx.strokeRect(L0, y, L1 - L0, SH); ctx.restore();
    });
    /* the absorbed dose, hollow, and the dose equivalent, filled */
    const xa = X(a), xe = X(Math.min(e, 10 ** HI));
    ctx.save(); ctx.fillStyle = alpha(cd, 0.16); ctx.fillRect(L0, S1, xa - L0, SH); ctx.strokeStyle = cd; ctx.lineWidth = 3; ctx.strokeRect(L0, S1, xa - L0, SH); ctx.restore();
    ctx.save(); ctx.fillStyle = cd; ctx.fillRect(L0, S2, xe - L0, SH); ctx.restore();
    /* × RBE */
    const yA = S1 + SH + 6, yB = S2 - 6;
    if (Math.abs(xe - xa) > 4) arrow(ctx, xa, yA, xe, yB, PAL.ink, 3); else line(ctx, xa, yA, xe, yB, PAL.ink, 3, [6, 6]);
    const xm = Math.max(xa, xe) + 14 > L1 - 60 ? Math.min(xa, xe) - 70 : Math.max(xa, xe) + 14;
    text(ctx, `× ${r}`, xm, (yA + yB) / 2, PAL.ink, { size: 22, weight: 600, bg: PAL.panel });
    /* the marks: Table 21.5's exposures, the US annual dose and 500 rem */
    hits = [];
    EFFECTS.forEach((f) => {
      const x0 = X(f.at), x1 = f.to ? X(f.to) : x0;
      if (f.to) { line(ctx, x0, S2 + SH + 8, x1, S2 + SH + 8, PAL.ink, 3); }
      line(ctx, x0, S2 + SH, x0, S2 + SH + 12, PAL.ink, 2); if (f.to) line(ctx, x1, S2 + SH, x1, S2 + SH + 12, PAL.ink, 2);
      hits.push({ x: (x0 + x1) / 2, y: S2 + SH + 8, r: 10, name: `${f.to ? f.at + '–' + f.to : f.at} rem: ${f.name}` });
    });
    const x5 = X(500), xu = X(0.62);
    line(ctx, x5, S2 - 8, x5, S2 + SH + 26, PAL.ink, 2.5, [7, 6]);
    line(ctx, xu, S2 - 8, xu, S2 + SH + 26, PAL.ink, 2.5, [3, 6]);
    text(ctx, '500 rem', x5, S2 + SH + 42, PAL.ink, { size: 18, align: 'center', weight: 600 });
    text(ctx, 'US annual dose', xu, S2 + SH + 42, PAL.ink, { size: 18, align: 'center', weight: 600 });
    hits.push({ x: x5, y: S2 + SH / 2, r: 12, name: '500 rem: a 50% probability of death within 30 days' }, { x: xu, y: S2 + SH / 2, r: 12, name: '0.62 rem (620 mrem): the average annual dose in the US' });
    hits.push({ x: xa, y: S1 + SH / 2, r: 14, name: `absorbed dose: ${radText(a)} rad` }, { x: xe, y: S2 + SH / 2, r: 14, name: `dose equivalent: ${big(e, dec)} rem` });
    /* the effect reached */
    const reached = EFFECTS.filter((f) => e >= f.at).pop();
    const say = reached ? `${reached.name.split(',')[0]} (${reached.to ? reached.at + '–' + reached.to : reached.at} rem)` : 'below every exposure of Table 21.5';
    F.label(ctx, say, xe, S2 + SH + 14, { side: 'below', gap: 80, size: 19, H });
    tex(d.readout, `\\htmlClass{kv-dose}{\\text{number of rems}} = \\text{RBE}\\times\\htmlClass{kv-dose}{\\text{number of rads}} = ${r}\\times\\htmlClass{kv-dose}{${radText(a)}\\ \\text{rad}} = \\htmlClass{kv-dose}{${big(e, dec).replace(',', '{,}')}\\ \\text{rem}} = \\htmlClass{kv-dose}{${svOf(big(e, dec))}\\ \\text{Sv}}`);
  }
  still(d, draw);
})();

/* =====================================================================
   FIGURE 21.37: the book's doses and regulatory limits in millirem, one
   bar each, on one logarithmic axis from 1 to 10,000 mrem. Dose limits
   hollow, doses filled. A faithful copy: nothing varies.
===================================================================== */
(function () {
  const H = 560, L0 = 500, L1 = 1320, LO = 0, HI = 4;
  const d = sim('sim-doses', H);
  const BARS = [
    ['Annual nuclear worker dose limit (NRC)', 5000, 1], ['Whole body CT', 1000, 0], ['Average US annual dose', 620, 0],
    ['US avg. natural background dose', 310, 0], ['Annual public dose limit (NRC)', 100, 1], ['From your body', 40, 0],
    ['Cosmic rays', 30, 0], ['Chest X-rays', 10, 0], ['Safe drinking water limit (EPA)', 4, 0], ['Trans-Atlantic flight', 2.5, 0],
  ];
  const X = (v) => L0 + ((Math.log10(v) - LO) / (HI - LO)) * (L1 - L0);
  const Y0 = 112, ROW = 36, BH = 22;
  function draw() {
    const { ctx } = begin(d.c), cd = C('dose'), yb = Y0 + ROW * BARS.length;
    text(ctx, 'Radiation Doses and Regulatory Limits (in Millirems)', 700, 40, PAL.ink, { size: 22, align: 'center', weight: 700 });
    for (let p = LO; p <= HI; p++) {
      const x = X(10 ** p);
      if (p) line(ctx, x, Y0 - 16, x, yb, PAL.rule, 1.5);
      line(ctx, x, yb, x, yb + 8, PAL.muted, 2);
      text(ctx, (10 ** p).toLocaleString('en-US'), x, yb + 26, PAL.muted, { size: 17, align: 'center' });
    }
    line(ctx, L0, Y0 - 16, L0, yb, PAL.muted, 2); line(ctx, L0, yb, L1, yb, PAL.muted, 2);
    text(ctx, 'Dose (millirem)', L1, yb + 58, cd, { size: 20, align: 'right', weight: 600 });
    BARS.forEach(([name, v, limit], i) => {
      const y = Y0 + ROW * i + ROW / 2 - 8, x = X(v);
      text(ctx, name, L0 - 16, y, PAL.ink, { size: 18, align: 'right' });
      ctx.save();
      if (limit) { ctx.fillStyle = alpha(cd, 0.16); ctx.fillRect(L0, y - BH / 2, x - L0, BH); ctx.strokeStyle = cd; ctx.lineWidth = 3; ctx.strokeRect(L0, y - BH / 2, x - L0, BH); }
      else { ctx.fillStyle = cd; ctx.fillRect(L0, y - BH / 2, x - L0, BH); }
      ctx.restore();
      text(ctx, v.toLocaleString('en-US'), x + 10, y, PAL.ink, { size: 17 });
    });
    /* the legend */
    const lx = 1000, ly = 380;
    ctx.save(); ctx.fillStyle = alpha(cd, 0.16); ctx.fillRect(lx, ly - 9, 26, 18); ctx.strokeStyle = cd; ctx.lineWidth = 3; ctx.strokeRect(lx, ly - 9, 26, 18); ctx.restore();
    text(ctx, 'Dose limit from NRC-licensed activity', lx + 38, ly, PAL.ink, { size: 17 });
    ctx.save(); ctx.fillStyle = cd; ctx.fillRect(lx, ly + 21, 26, 18); ctx.restore();
    text(ctx, 'Radiation doses', lx + 38, ly + 30, PAL.ink, { size: 17 });
  }
  still(d, draw);
})();
};
