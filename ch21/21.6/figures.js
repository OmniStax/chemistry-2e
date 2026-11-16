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
   FIGURE 21.31: the electromagnetic spectrum, nonionizing and ionizing.
   One logarithmic scale, 10 Hz to 10²² Hz (60 units a decade): the
   frequency along the top edge of the band strip, the energy of a mole
   of photons, N_A hν, along its bottom edge, where 345 kJ/mol, the C–C
   bond energy of Table 7.2, falls just past the violet edge of visible
   light, the book's line between nonionizing and ionizing. Still.
===================================================================== */
(function () {
  const H = 524, L = 70, R = 1330, LO = 1, HI = 22, lg = Math.log10;
  const d = sim('sim-ionizing', H);
  const X = (lv) => L + ((lv - LO) / (HI - LO)) * (R - L);
  const PLANCK = 6.626e-34, NA = 6.022e23, BOND = 345;
  const SPLIT = lg(7.5e14), LVBOND = lg((BOND * 1000) / (PLANCK * NA));
  const BANDS = [
    { name: 'broadcast and wireless radio', who: 'A radio photon', lo: LO, hi: lg(3e8), cls: 0 },
    { name: 'microwave', who: 'A microwave photon', lo: lg(3e8), hi: lg(3e11), cls: 1 },
    { name: 'terahertz', who: 'A terahertz photon', lo: lg(3e11), hi: 13, cls: 1 },
    { name: 'infrared', who: 'An infrared photon', lo: 13, hi: lg(4e14), cls: 2 },
    { name: 'visible light', who: 'A photon of visible light', lo: lg(4e14), hi: SPLIT, cls: 2 },
    { name: 'ultraviolet', who: 'An ultraviolet photon', lo: SPLIT, hi: lg(3e16), cls: 3 },
    { name: 'X-ray', who: 'An X-ray photon', lo: lg(3e16), hi: lg(3e19), cls: 3 },
    { name: 'γ ray', who: 'A γ-ray photon', lo: lg(3e19), hi: HI, cls: 3 },
  ];
  const bandOf = (lv) => BANDS.find((q) => lv < q.hi) ?? BANDS[BANDS.length - 1];
  /* the book's four effects, each over the bands it covers */
  const CLASSES = [
    { head: 'Non-thermal', sub: 'induces low currents', row: 0 },
    { head: 'Thermal', sub: 'induces high currents, heating', row: 0 },
    { head: 'Optical', sub: 'excites electrons, photo-chemical effects', row: 1 },
    { head: 'Broken bonds', sub: 'damages DNA', row: 0 },
  ];
  CLASSES.forEach((c, i) => { const bs = BANDS.filter((b) => b.cls === i); c.lo = bs[0].lo; c.hi = bs[bs.length - 1].hi; });
  /* the book's everyday sources, at their usual frequencies */
  const SOURCES = [
    { name: 'power line', lv: lg(60), row: 0 }, { name: 'AM radio', lv: 6, row: 0 }, { name: 'FM radio', lv: 8, row: 1 },
    { name: 'microwave oven', lv: lg(2.45e9), row: 0 }, { name: 'heat lamp', lv: lg(3e14), row: 0 },
    { name: 'tanning booth', lv: lg(8.5e14), row: 1 }, { name: 'medical X-rays', lv: 19, row: 0 },
  ];
  const CATCH = [...SOURCES.map((s) => s.lv), SPLIT];
  const near = (lv) => CATCH.find((q) => Math.abs(q - lv) < 0.006) ?? lv;
  const hz = (lv) => { const s = sci(10 ** near(lv)); return `${s.m} × 10${sup(s.n)} Hz`; };
  const nu = F.ctl(d.controls, {
    label: '\\knu', cls: 'frequency', min: LO, max: HI, step: 0.01, value: +lg(2.45e9).toFixed(2), unit: '', fmt: hz,
    aria: 'the frequency of the radiation, on a logarithmic scale', detents: SOURCES.map((s) => s.lv), specials: [{ at: SPLIT, label: 'ionizing' }],
  });
  /* a ratio in words: 350,000 or 2.9 × 10⁹ */
  const count = (n) => {
    if (n >= 1e6) { const e = Math.floor(lg(n) + 1e-9), m = +(n / 10 ** e).toPrecision(2); return m >= 10 ? `1.0 × 10${sup(e + 1)}` : `${m.toFixed(1)} × 10${sup(e)}`; }
    return (+n.toPrecision(2)).toLocaleString('en-US');
  };
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
  const ST = 160, SB = 228;
  function draw() {
    const { ctx } = begin(d.c), lv = near(nu.v), sv = sci(10 ** lv), v = +sv.m * 10 ** sv.n, band = bandOf(lv), cls = CLASSES[band.cls];
    const E = PLANCK * v, Em = (E * NA) / 1000, r = Em / BOND, cf = C('frequency'), ce = C('energy'), x = X(lv), xs = X(SPLIT), xb = X(LVBOND);
    hits = [];
    topline(ctx, `${band.who} has ${r < 0.01 ? `1/${count(1 / r)} of` : `${count(r)} times`} the energy that breaks a C–C bond.`);
    /* nonionizing | ionizing, the book's line at the violet edge of the visible */
    text(ctx, 'nonionizing', (L + xs) / 2, 84, PAL.ink, { size: 22, align: 'center', weight: 600 });
    text(ctx, 'ionizing', (xs + R) / 2, 84, PAL.ink, { size: 22, align: 'center', weight: 600 });
    arrow(ctx, xs, 110, L, 110, PAL.ink, 4); arrow(ctx, xs, 110, R, 110, PAL.ink, 4);
    line(ctx, xs, 97, xs, 123, PAL.ink, 3);
    /* the frequency scale, along the top edge */
    text(ctx, 'frequency ν (Hz)', L, 142, cf, { size: 20, weight: 600 });
    for (let n = 2; n <= 21; n++) {
      const big = n % 3 === 0, tx = X(n);
      line(ctx, tx, ST - (big ? 9 : 5), tx, ST, PAL.muted, big ? 2 : 1.5);
      if (big && n >= 6) text(ctx, `10${sup(n)}`, tx, 142, PAL.muted, { size: 18, align: 'center' });
    }
    /* the bands */
    BANDS.forEach((b) => {
      const x0 = X(b.lo), x1 = X(b.hi), on = b === band;
      ctx.save();
      if (b.name === 'visible light') for (let q = x0; q < x1; q += 1) { ctx.fillStyle = lightRGB(700 - ((q - x0) / (x1 - x0)) * 300); ctx.fillRect(q, ST, 1.5, SB - ST); }
      else if (on) { ctx.fillStyle = alpha(cf, 0.16); ctx.fillRect(x0, ST, x1 - x0, SB - ST); }
      ctx.restore();
      if (b.lo > LO) line(ctx, x0, ST, x0, SB, PAL.muted, 1.5);
      if (b.name !== 'visible light') text(ctx, b.name, (x0 + x1) / 2, (ST + SB) / 2, PAL.ink, { size: 18, align: 'center', weight: on ? 700 : 400 });
      hits.push({ x: (x0 + x1) / 2, y: (ST + SB) / 2, r: Math.max(14, Math.min(30, (x1 - x0) / 2)), name: `${b.name}, ${sciText(10 ** b.lo)} to ${sciText(10 ** b.hi)} Hz` });
    });
    ctx.save(); ctx.strokeStyle = PAL.muted; ctx.lineWidth = 2; ctx.strokeRect(L, ST, R - L, SB - ST); ctx.restore();
    /* the energy scale, along the bottom edge: N_A hν in kJ/mol */
    for (let n = -10; n <= 9; n++) {
      const tx = X(lg((10 ** n * 1000) / (PLANCK * NA))), big = (n + 12) % 3 === 0;
      line(ctx, tx, SB, tx, SB + (big ? 9 : 5), PAL.muted, big ? 2 : 1.5);
      if (big) text(ctx, n === 0 ? '1' : `10${sup(n)}`, tx, 252, PAL.muted, { size: 18, align: 'center' });
    }
    text(ctx, 'visible light', X(SPLIT) - 2, 253, PAL.ink, { size: 17, align: 'right' });
    text(ctx, 'energy of a mole of photons (kJ/mol)', L, 282, ce, { size: 20, weight: 600 });
    /* the energy of a C–C bond */
    line(ctx, xb, ST, xb, 266, PAL.ink, 3, [7, 6]);
    F.rich(ctx, ['a C–C bond breaks, ', ['345 kJ/mol', ce]], xb, 282, { size: 20, align: 'center' });
    hits.push({ x: xb, y: 274, r: 22, name: 'the bond energy of a C–C bond, 345 kJ/mol' });
    /* the book's everyday sources */
    SOURCES.forEach((s) => {
      const sx = X(s.lv), y = 334 + s.row * 27, on = Math.abs(s.lv - lv) < 1e-9;
      line(ctx, sx, 312, sx, y - 13, on ? cf : PAL.muted, 2);
      text(ctx, s.name, sx, y, on ? PAL.ink : PAL.muted, { size: 19, align: 'center', weight: on ? 700 : 400 });
      hits.push({ x: sx, y, r: 24, name: `${s.name}, about ${sciText(10 ** s.lv)} Hz` });
    });
    /* the book's four effects */
    CLASSES.forEach((c) => {
      const x0 = X(c.lo) + 5, x1 = X(c.hi) - 5, cx = (x0 + x1) / 2, on = c === cls, col = on ? PAL.ink : PAL.muted, y = 428 + c.row * 50;
      F.hbracket(ctx, x0, x1, 398, on ? PAL.ink : alpha(PAL.ink, 0.35));
      if (c.row) line(ctx, cx, 398, cx, y - 14, alpha(PAL.ink, 0.35), 1.5);
      text(ctx, c.head, cx, y, col, { size: 21, align: 'center', weight: 700, bg: PAL.panel });
      text(ctx, c.sub, cx, y + 26, col, { size: 19, align: 'center' });
    });
    /* the reader's frequency */
    line(ctx, x, ST - 12, x, SB + 12, cf, 4);
    F.dot(ctx, x, ST, cf, true, 8); F.dot(ctx, x, SB, ce, true, 8);
    hits.push({ x, y: (ST + SB) / 2, r: 16, name: `ν = ${sciText(v)} Hz, ${band.name}` });
    const kv = (k, s) => `\\htmlClass{kv-${k}}{${s}}`, emTex = Em >= 0.01 && Em < 1e4 ? String(+Em.toPrecision(3)) : sciTex(Em);
    tex(d.readout, `\\kE = h\\knu = (6.626\\times10^{-34}\\ \\text{J s})(${kv('frequency', `${sciTex(v)}\\ \\text{Hz}`)}) = ${kv('energy', `${sciTex(E)}\\ \\text{J}`)} \\\\ `
      + `N_{\\text{A}}\\kE = (6.022\\times10^{23}\\ \\text{mol}^{-1})(${kv('energy', `${sciTex(E)}\\ \\text{J}`)}) = ${kv('energy', `${emTex}\\ \\text{kJ/mol}`)}`);
  }
  still(d, draw);
})();

/* =====================================================================
   FIGURE 21.32: direct and indirect damage, one scene. A γ photon
   arrives. Direct: it strikes the DNA, an electron leaves and a strand
   breaks. Indirect: it knocks an electron out of a water molecule; the
   H₂O⁺ ion meets a second water molecule and passes it a proton; what
   is left is the OH• radical, which travels to the DNA and breaks a
   strand. Moving: one event, 3.6 s or 7.2 s, holding 1.2 s.
===================================================================== */
(function () {
  const H = 560;
  const d = sim('sim-damage', H);
  const path = F.choice(d.controls, { label: '\\text{effect}', options: [{ value: 'direct', label: 'direct' }, { value: 'indirect', label: 'indirect' }], value: 'indirect', aria: 'the direct or the indirect effect', onInput: () => { cy.reset(); say(); } });
  const T = () => (path.value === 'direct' ? 3.6 : 7.2);
  const cy = cycle(T, 1.2);
  const EQ = {
    direct: '\\text{biomolecule}+\\text{radiation}\\longrightarrow\\text{biomolecule}^{+}+\\text{e}^{-}',
    indirect: '\\text{H}_{2}\\text{O}+\\text{radiation}\\longrightarrow\\text{H}_{2}\\text{O}^{+}+\\text{e}^{-} \\\\ \\text{H}_{2}\\text{O}^{+}+\\text{H}_{2}\\text{O}\\longrightarrow\\text{H}_{3}\\text{O}^{+}+\\text{OH}^{\\bullet}',
  };
  const say = () => tex(d.readout, EQ[path.value], false, { values: false });
  say();
  const STEPS = {
    direct: [[0, 'Radiation strikes the DNA itself.'], [1, 'An electron leaves, and a bond in the strand breaks.']],
    indirect: [[0, 'Radiation knocks an electron out of a water molecule.'], [2.3, 'The H₂O⁺ ion passes a proton to a second water molecule.'], [4.6, 'The OH• radical that is left reaches the DNA and breaks a strand.']],
  };
  /* the DNA: a double helix about a vertical axis; z > 0 faces the reader */
  const DX = 1190, DY0 = 64, DY1 = 524, AMP = 80, PER = 228;
  const ph = (y, s) => ((y - DY0) / PER) * TAU + s * Math.PI;
  const sx = (y, s) => DX + AMP * Math.sin(ph(y, s));
  /* each path breaks strand 1 where it faces the reader on the left of the helix */
  const BREAK = { direct: DY0 + PER * (0.25 + 0.5 / TAU), indirect: DY0 + PER * (1.25 + 0.5 / TAU) };
  function dna(ctx, yb, kb) {
    const part = (front) => [0, 1].forEach((s) => {
      ctx.save(); ctx.strokeStyle = front ? PAL.ink : PAL.muted; ctx.lineWidth = front ? 11 : 8; ctx.lineCap = 'round'; ctx.beginPath();
      let on = false;
      for (let y = DY0; y <= DY1; y += 2) {
        const show = Math.cos(ph(y, s)) >= 0 === front && !(s === 1 && kb > 0 && Math.abs(y - yb) < 12 * kb);
        if (!show) { on = false; continue; }
        on ? ctx.lineTo(sx(y, s), y) : ctx.moveTo(sx(y, s), y); on = true;
      }
      ctx.stroke(); ctx.restore();
    });
    part(false);
    for (let y = DY0 + 10; y < DY1; y += 19) {
      const a = sx(y, 0), b = sx(y, 1);
      if (Math.abs(a - b) > 26) line(ctx, a, y, b, y, alpha(PAL.ink, 0.3), 5);
    }
    part(true);
  }
  /* a water molecule or what it becomes: an O with its H atoms at the given offsets */
  const RO = 52, RH = 33, HL = [-51, 40], HR = [51, 40];
  function oxy(ctx, x, y, hs, radical) {
    hs.forEach(([dx, dy]) => disc(ctx, x + dx, y + dy, RH, F.el('H')));
    disc(ctx, x, y, RO, F.el('O'));
    if (radical > 0) { ctx.save(); ctx.globalAlpha *= radical; F.dot(ctx, x + 38, y + 54, PAL.ink, true, 7); ctx.restore(); }
  }
  const bez = (a, c, b, k) => ({ x: (1 - k) * (1 - k) * a.x + 2 * k * (1 - k) * c.x + k * k * b.x, y: (1 - k) * (1 - k) * a.y + 2 * k * (1 - k) * c.y + k * k * b.y });
  let hits = [];
  F.hover(d.stage, () => hits);
  const A0 = { x: 380, y: 226 }, A1 = { x: 590, y: 226 }, B0 = { x: 800, y: 226 }, B1 = { x: 800, y: 150 };
  function draw() {
    const { ctx } = begin(d.c), t = cy.now(), ind = path.value === 'indirect', yb = BREAK[path.value], bx = sx(yb, 1);
    const sm = F.ease.smooth, name = (s, x, y) => text(ctx, s, x, y, PAL.ink, { size: 24, align: 'center', weight: 600 });
    hits = [];
    const tBreak = ind ? 6.3 : 1.0, kb = clamp01((t - tBreak) / 0.35);
    burst(ctx, bx, yb, 36, PAL.ink, kb);
    dna(ctx, yb, kb);
    text(ctx, 'DNA', DX, 34, PAL.ink, { size: 22, align: 'center', weight: 600 });
    hits.push({ x: DX, y: (DY0 + DY1) / 2, r: 90, name: 'DNA, a biomolecule' });
    if (kb > 0) hits.push({ x: bx, y: yb, r: 30, name: 'a broken strand of the DNA' });
    /* the photon arrives over the first second */
    const P0 = ind ? { x: 150, y: 62 } : { x: 640, y: 50 }, tgt = ind ? { x: A0.x - 32, y: A0.y - 42 } : { x: bx - 8, y: yb - 2 };
    const ux = tgt.x - P0.x, uy = tgt.y - P0.y, PL = Math.hypot(ux, uy);
    if (t < 1.0) {
      const hx = lerp(P0.x, tgt.x, t), hy = lerp(P0.y, tgt.y, t);
      photon(ctx, hx, hy, ux / PL, uy / PL, 120, 11, F.el('gamma'), 4);
      if (t < 0.5) text(ctx, 'radiation', hx + 26, hy - 34, PAL.ink, { size: 20, align: 'center' });
      hits.push({ x: hx - (ux / PL) * 50, y: hy - (uy / PL) * 50, r: 50, name: 'ionizing radiation, a γ photon' });
    }
    /* the water molecules */
    let a = { ...A0 }, b = { ...B0 }, aH = [HL, HR], bH = [HL, HR], aName = 'H₂O', bName = 'H₂O', aRest = true, bRest = true, rad = 0, proton = null;
    if (ind) {
      if (t >= 1.0) aName = 'H₂O⁺';
      if (t > 2.3) { const k = sm(clamp01((t - 2.3) / 0.8)); a = { x: lerp(A0.x, A1.x, k), y: A0.y }; aRest = k >= 1; }
      if (t > 3.1) {
        const k = sm(clamp01((t - 3.1) / 1.0)), from = [A1.x + HR[0], A1.y + HR[1]], to = [B0.x - 62, B0.y - 25];
        aH = [HL];
        if (k < 1) proton = { x: lerp(from[0], to[0], k), y: lerp(from[1], to[1], k) };
        else { bH = [HL, HR, [-62, -25]]; bName = 'H₃O⁺'; aName = 'OH•'; }
        rad = k;
      }
      if (t > 4.1) {
        const k = sm(clamp01((t - 4.1) / 0.9)), q = lerp(0, 1, k);
        b = { x: B0.x, y: lerp(B0.y, B1.y, k) }; bRest = k >= 1;
        bH = [[lerp(HL[0], -56, q), lerp(HL[1], 32, q)], [lerp(HR[0], 56, q), lerp(HR[1], 32, q)], [lerp(-62, 0, q), lerp(-25, -65, q)]];
      }
      if (t > 4.6) {
        const k = sm(clamp01((t - 4.6) / 1.7));
        a = bez(A1, { x: 840, y: 500 }, { x: bx - 80, y: yb + 8 }, k); aRest = k >= 1;
        aH = [[lerp(HL[0], -60, k), lerp(HL[1], 24, k)]];
      }
    }
    oxy(ctx, b.x, b.y, bH, 0);
    if (proton) disc(ctx, proton.x, proton.y, RH, F.el('H'));
    oxy(ctx, a.x, a.y, aH, rad);
    if (proton) hits.push({ x: proton.x, y: proton.y, r: RH, name: 'a proton, H⁺, passing to the second water molecule' });
    const full = { 'H₂O': 'a water molecule, H₂O', 'H₂O⁺': 'the H₂O⁺ ion', 'H₃O⁺': 'a hydronium ion, H₃O⁺', 'OH•': 'the hydroxyl radical, OH•, with its unpaired electron' };
    hits.push({ x: a.x, y: a.y + 10, r: 76, name: full[aName] }, { x: b.x, y: b.y + 10, r: 76, name: full[bName] });
    if (aRest) name(aName, a.x - (aName === 'OH•' && t > 4.6 ? 20 : 0), a.y + (aName === 'OH•' && t > 4.6 ? -76 : 104));
    if (bRest) name(bName, b.x, b.y + 104);
    /* the electron knocked out */
    if (t >= 1.0) {
      const k = F.ease.out(clamp01((t - 1.0) / 1.2)), from = ind ? { x: A0.x - 50, y: A0.y + 60 } : { x: bx - 20, y: yb + 16 }, to = ind ? { x: 190, y: 372 } : { x: 960, y: 340 };
      const ex = lerp(from.x, to.x, k), ey = lerp(from.y, to.y, k);
      disc(ctx, ex, ey, 17, F.el('e-'), -1);
      if (k >= 1) name('e⁻', ex, ey + 40);
      hits.push({ x: ex, y: ey, r: 22, name: 'the electron knocked out' });
    }
    /* the steps, in order */
    const steps = STEPS[path.value], now = steps.reduce((n, s, i) => (t >= s[0] ? i : n), 0);
    steps.forEach(([, s], i) => {
      const y = 560 - 36 * (steps.length - i) + 6, col = i <= now ? PAL.ink : PAL.muted;
      text(ctx, `${i + 1}`, 52, y, col, { size: 23, weight: 700, align: 'center' });
      text(ctx, s, 80, y, col, { size: 23, weight: i === now ? 600 : 400 });
    });
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();

/* =====================================================================
   FIGURE 21.33: what stops each radiation. Four lanes cross the book's
   barriers in the book's order: paper, a hand, metal, a glass of water,
   concrete, lead. α stops at the paper, β at the metal, neutrons in the
   water, and the γ ray crosses the concrete and dies away in the lead.
   Each leaves ions along its path at a density in the text's ratio,
   α : neutron : β : γ = 20 : 10 : 2 : 1. Moving: a particle leaves each
   source every second through a 6 s loop, holding 1.2 s.
===================================================================== */
(function () {
  const H = 600, T = 6;
  const d = sim('sim-penetration', H);
  const cy = cycle(() => T, 1.2);
  const X0 = 204, TOP = 100, BOT = 524, DXS = 22, DYS = 16;
  const PAPER = [330, 337], METAL = [636, 654], GLASS = [716, 862], CONC = [930, 1110], LEAD = [1180, 1290], HAND = 466;
  const LANES = [
    { key: 'a', name: 'α particle', rel: 'ionizes most', y: 152, stop: 333, speed: 150, gap: 7, hov: 'an α particle, two protons and two neutrons', end: 'stopped by the paper' },
    { key: 'b', name: 'β particle', rel: '1/10 as much', y: 258, stop: 645, speed: 300, gap: 70, hov: 'a β particle, an electron', end: 'stopped by the metal' },
    { key: 'n', name: 'neutron', rel: '1/2 as much', y: 366, stop: 792, speed: 300, gap: 14, hov: 'a neutron', end: 'stopped in the water' },
    { key: 'g', name: 'γ ray', rel: '1/20 as much', y: 472, stop: 1266, speed: 520, gap: 140, hov: 'a γ ray', end: 'attenuated by the lead' },
  ];
  /* where the ions of each lane lie: a fixed scatter about the path */
  const rnd = (i, j) => { const s = Math.sin(i * 127.1 + j * 311.7) * 43758.5453; return s - Math.floor(s); };
  LANES.forEach((l, j) => { l.ions = []; for (let x = X0 + 26, i = 0; x < l.stop - 2; x += l.gap, i++) l.ions.push([x + (rnd(i, j) - 0.5) * l.gap * 0.6, l.y + (rnd(i, j + 9) - 0.5) * 34]); });
  /* a slab seen a little from the right and above */
  function slab(ctx, [x0, x1], fill, speck) {
    const edge = alpha(PAL.ink, 0.6);
    ctx.save(); ctx.lineWidth = 2; ctx.strokeStyle = edge; ctx.lineJoin = 'round';
    const face = (pts, f) => { ctx.beginPath(); pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.closePath(); ctx.fillStyle = PAL.panel; ctx.fill(); ctx.fillStyle = f; ctx.fill(); ctx.stroke(); };
    face([[x1, TOP], [x1 + DXS, TOP - DYS], [x1 + DXS, BOT - DYS], [x1, BOT]], fill(1.35));
    face([[x0, TOP], [x0 + DXS, TOP - DYS], [x1 + DXS, TOP - DYS], [x1, TOP]], fill(0.6));
    face([[x0, TOP], [x1, TOP], [x1, BOT], [x0, BOT]], fill(1));
    if (speck) { ctx.fillStyle = alpha(PAL.ink, 0.4); for (let i = 0; i < speck; i++) { ctx.beginPath(); ctx.arc(x0 + 10 + rnd(i, 3) * (x1 - x0 - 20), TOP + 10 + rnd(i, 5) * (BOT - TOP - 20), 1.5 + rnd(i, 7) * 2, 0, TAU); ctx.fill(); } }
    ctx.restore();
  }
  function glass(ctx) {
    const [x0, x1] = GLASS, top = 296, lvl = 326, tx = (y) => 13 * ((y - top) / (BOT - top));
    ctx.save();
    ctx.beginPath(); ctx.moveTo(x0 + tx(lvl), lvl); ctx.lineTo(x1 - tx(lvl), lvl); ctx.lineTo(x1 - 13, BOT - 5); ctx.lineTo(x0 + 13, BOT - 5); ctx.closePath();
    ctx.fillStyle = PAL.panel; ctx.fill(); ctx.fillStyle = alpha(PAL.ink, 0.1); ctx.fill();
    ctx.strokeStyle = alpha(PAL.ink, 0.6); ctx.lineWidth = 3; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.moveTo(x0, top); ctx.lineTo(x0 + 13, BOT); ctx.lineTo(x1 - 13, BOT); ctx.lineTo(x1, top); ctx.stroke();
    ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse((x0 + x1) / 2, top, (x1 - x0) / 2, 9, 0, 0, TAU); ctx.stroke();
    ctx.beginPath(); ctx.ellipse((x0 + x1) / 2, lvl, (x1 - x0) / 2 - tx(lvl), 8, 0, 0, TAU); ctx.fillStyle = alpha(PAL.ink, 0.08); ctx.fill(); ctx.stroke();
    ctx.restore();
  }
  let hits = [];
  F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c), t = cy.now();
    hits = [];
    topline(ctx, 'α particles stop in paper, β particles in metal and neutrons in water; lead attenuates γ rays.');
    /* the barriers, in the book's order */
    slab(ctx, PAPER, () => alpha(PAL.ink, 0.02));
    F.hand(ctx, HAND, BOT + 4, { aim: [0, -1], view: 'palm', s: 2.45, color: alpha(PAL.ink, 0.22) });
    slab(ctx, METAL, (k) => alpha(PAL.ink, 0.3 * k));
    glass(ctx);
    slab(ctx, CONC, (k) => alpha(PAL.ink, 0.13 * k), 70);
    slab(ctx, LEAD, (k) => alpha(PAL.ink, Math.min(0.85, 0.5 * k)));
    [['paper', 334, PAPER], ['hand', HAND, null], ['metal', 645, METAL], ['water', 789, GLASS], ['concrete', 1020, CONC], ['lead', 1235, LEAD]].forEach(([s, x, b]) => {
      text(ctx, s, x, 574, PAL.ink, { size: 22, align: 'center' });
      hits.push({ x, y: 300, r: b ? Math.max(24, (b[1] - b[0]) / 2) : 80, name: s === 'water' ? 'a glass of water' : s === 'hand' ? 'a hand' : s === 'metal' ? 'a thin sheet of metal' : s === 'paper' ? 'a sheet of paper' : s === 'lead' ? 'a block of lead' : 'a block of concrete' });
    });
    F.legend(ctx, { l: 24, r: 300, t: 556, b: 592 }, [{ s: 'ions formed', draw: (g, x, y) => { g.save(); g.fillStyle = PAL.ink; g.globalAlpha = 0.8; [[-13, -4], [0, 5], [12, -3]].forEach(([dx, dy]) => { g.beginPath(); g.arc(x + dx, y + dy, 3.4, 0, TAU); g.fill(); }); g.restore(); } }], { corner: 'tl', panel: false });
    LANES.forEach((l) => {
      const lead = X0 + l.speed * t;
      text(ctx, l.name, 26, l.y - 12, PAL.ink, { size: 22, weight: 600 });
      text(ctx, l.rel, 26, l.y + 16, PAL.muted, { size: 19 });
      /* the path, as far as the first particle has gone */
      const reach = Math.min(lead, l.stop);
      line(ctx, X0, l.y, reach, l.y, alpha(PAL.ink, 0.28), 2);
      if (lead >= l.stop) { line(ctx, l.stop, l.y - 13, l.stop, l.y + 13, PAL.ink, 4); hits.push({ x: l.stop, y: l.y, r: 16, name: `${l.name}: ${l.end}` }); }
      /* the ions left behind it */
      ctx.save(); ctx.fillStyle = PAL.ink;
      l.ions.forEach(([x, y]) => { const k = clamp01((reach - x) / 30); if (k <= 0) return; ctx.globalAlpha = 0.8 * k; ctx.beginPath(); ctx.arc(x, y, 3.4, 0, TAU); ctx.fill(); });
      ctx.restore();
      /* the particles, one a second */
      for (let k = 0; k < T; k++) {
        if (t < k) break;
        const x = X0 + l.speed * (t - k), gone = clamp01((x - l.stop) / (l.speed * 0.25));
        if (gone >= 1) continue;
        const px = Math.min(x, l.stop);
        ctx.save(); ctx.globalAlpha *= 1 - gone;
        if (l.key === 'a') alphaParticle(ctx, px - 14, l.y, 9);
        else if (l.key === 'b') disc(ctx, px - 10, l.y, 10, F.el('e-'), -1);
        else if (l.key === 'n') disc(ctx, px - 12, l.y, 12, F.el('n0'));
        else {
          /* the γ ray keeps its strength to the lead and dies away inside it */
          const amp = 10 * (px <= LEAD[0] ? 1 : Math.max(0.12, 1 - (px - LEAD[0]) / (l.stop - LEAD[0])));
          photon(ctx, px, l.y, 1, 0, 96, amp, F.el('gamma'), 4);
        }
        ctx.restore();
        hits.push({ x: px - 12, y: l.y, r: 24, name: l.hov });
      }
    });
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();

/* =====================================================================
   SIM: the absorbed dose and the damage it does. One logarithmic scale,
   0.001 to 10,000, read in rad for the absorbed dose and in rem for the
   dose equivalent. The one absorbed dose is carried to the right by each
   radiation's RBE (1 for β and γ, 2 for protons and neutrons, 10 for α,
   the text's), a fixed step on this scale. Beneath, the doses the
   section names: a flight and the average year of Figure 21.37, the
   health effects of Table 21.5 and the text's 500 rem. Still.
===================================================================== */
(function () {
  const H = 590, L = 250, R = 1330, LO = -3, HI = 4, lg = Math.log10;
  const d = sim('sim-dose', H);
  const X = (v) => L + ((lg(v) - LO) / (HI - LO)) * (R - L);
  const KINDS = [
    { value: 'bg', label: 'β, γ', name: 'β or γ radiation', rbe: 1, y: 158 },
    { value: 'pn', label: 'protons, neutrons', name: 'protons or neutrons', rbe: 2, y: 214 },
    { value: 'a', label: 'α', name: 'α radiation', rbe: 10, y: 270 },
  ];
  const kind = F.choice(d.controls, { label: '\\text{radiation}', options: KINDS.map(({ value, label }) => ({ value, label })), value: 'a', aria: 'the kind of radiation' });
  const rbe = () => KINDS.find((k) => k.value === kind.value).rbe;
  const num = (v) => (v >= 1000 ? v.toLocaleString('en-US') : String(v));
  const two = (v) => +v.toPrecision(2);
  /* a dose to two figures, as it is written */
  const str = (v) => (v >= 100 ? num(two(v)) : v.toPrecision(2));
  const dose = F.ctl(d.controls, {
    label: '\\text{absorbed dose}', cls: 'dose', min: -3, max: 3, step: 0.01, value: 1.7, unit: '', fmt: (q) => `${str(10 ** q)} rad`,
    aria: 'the absorbed dose in rad, on a logarithmic scale', specials: [{ at: () => lg(500 / rbe()), label: '500 rem' }],
  });
  /* what the section says of each dose: Figure 21.37's (per year) and Table 21.5's (short-term) */
  const MARKS = [
    { v: 0.62, s: 'average US dose in a year', val: '0.62 rem', side: -1, hov: 'the average annual dose in the US, 620 mrem (Figure 21.37)' },
    { v: 0.0025, s: 'trans-Atlantic flight', val: '0.0025 rem', side: 1, hov: 'a trans-Atlantic flight, 2.5 mrem (Figure 21.37)' },
    { v: 5, to: 10, s: 'changes in blood chemistry', val: '5–10 rem', side: -1, hov: '5–10 rem: changes in blood chemistry (Table 21.5)' },
    { v: 50, to: 100, s: 'nausea, hair loss, hemorrhage', val: '50–100 rem', side: -1, hov: '50 rem nausea, 55 rem fatigue, 70 rem vomiting, 75 rem hair loss, 90 rem diarrhea, 100 rem hemorrhage (Table 21.5)' },
    { v: 400, s: 'possible death within 2 months', val: '400 rem', side: -1, hov: '400 rem: possible death within 2 months (Table 21.5)' },
    { v: 500, s: 'half die within 30 days', val: '500 rem', side: -1, hov: 'about 500 rem: a 50% probability of death within 30 days' },
    { v: 1000, s: 'death in 1–2 weeks', val: '1000 rem', side: -1, hov: '1000 rem: destruction of the intestinal lining, internal bleeding, death in 1–2 weeks (Table 21.5)' },
    { v: 2000, s: 'death in hours to days', val: '2000 rem', side: -1, hov: '2000 rem: damage to the central nervous system, loss of consciousness within minutes, death in hours to days (Table 21.5)' },
  ];
  const AX = 318, ROW0 = 376, ROWH = 27;
  let hits = [];
  F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c), D = Math.abs(dose.v - lg(500 / rbe())) < 0.004 ? two(500 / rbe()) : two(10 ** dose.v), cd = C('dose'), sel = KINDS.find((k) => k.value === kind.value);
    const rem = (k) => two(k.rbe * D), xd = X(D), e = rem(sel);
    hits = [];
    topline(ctx, `The same ${str(D)} rad is ${str(rem(KINDS[0]))} rem from β or γ radiation and ${str(rem(KINDS[2]))} rem from α radiation.`);
    /* the scale */
    for (let p = LO; p <= HI; p++) {
      const x = X(10 ** p);
      line(ctx, x, 136, x, AX, PAL.rule, 1.5);
      line(ctx, x, AX, x, AX + 9, PAL.muted, 2);
      text(ctx, num(10 ** p < 1 ? +(10 ** p).toFixed(3) : 10 ** p), x, AX + 28, PAL.muted, { size: 17, align: 'center' });
    }
    line(ctx, L, AX, R, AX, PAL.muted, 2);
    text(ctx, 'rad or rem', L - 16, AX, cd, { size: 20, align: 'right', weight: 600 });
    /* the absorbed dose: one line through the three rows */
    line(ctx, xd, 108, xd, AX, cd, 3, [8, 6]);
    F.rich(ctx, ['absorbed dose ', [`${str(D)} rad`, cd, 700]], Math.min(Math.max(xd, L + 60), R - 60), 92, { size: 20, align: 'center' });
    hits.push({ x: xd, y: 120, r: 18, name: `the absorbed dose, ${str(D)} rad` });
    KINDS.forEach((k) => {
      const on = k === sel, v = rem(k), xe = X(v), col = on ? cd : alpha(cd, 0.55), ink = on ? PAL.ink : PAL.muted;
      text(ctx, k.name, L - 16, k.y - 11, ink, { size: 20, align: 'right', weight: on ? 700 : 400 });
      text(ctx, `RBE ${k.rbe}`, L - 16, k.y + 14, PAL.muted, { size: 18, align: 'right' });
      F.dot(ctx, xd, k.y, col, false, 8);
      if (xe - xd > 30) {
        arrow(ctx, xd + 9, k.y, xe - (on ? 13 : 11), k.y, col, on ? 5 : 4);
        text(ctx, `× ${k.rbe}`, (xd + xe) / 2 - 4, k.y - 18, ink, { size: 18, align: 'center', weight: on ? 700 : 400 });
      }
      F.dot(ctx, xe, k.y, col, true, on ? 11 : 9);
      const right = xe < R - 130;
      F.rich(ctx, [[`${str(v)} rem`, col, on ? 700 : 400]], right ? xe + 20 : xe - 4, right ? k.y : k.y + 26, { size: 20, align: right ? 'left' : 'right' });
      hits.push({ x: xe, y: k.y, r: 16, name: `${k.name}: ${k.rbe} × ${str(D)} rad = ${str(v)} rem` });
    });
    /* the dose equivalent picked, carried down to what the section says of it */
    const xe = X(e);
    line(ctx, xe, sel.y + 12, xe, ROW0 + ROWH * (MARKS.length - 1) + 14, alpha(cd, 0.6), 2.5, [4, 8]);
    MARKS.forEach((m, i) => {
      const y = ROW0 + ROWH * i, x0 = X(m.v), x1 = X(m.to ?? m.v), got = e >= m.v, ink = got ? PAL.ink : PAL.muted, vc = got ? cd : alpha(cd, 0.6);
      if (m.to) line(ctx, x0, AX, x1, AX, ink, 6);
      line(ctx, x0, AX - 7, x0, AX + 7, ink, 3);
      line(ctx, x0, AX + 42, x0, y + 4, alpha(PAL.ink, got ? 0.5 : 0.28), 1.5);
      if (m.side < 0) F.rich(ctx, [[m.s + '  ', ink, got ? 600 : 400], [m.val, vc, got ? 700 : 400]], x0 - 8, y, { size: 19, align: 'right' });
      else F.rich(ctx, [[m.val, vc, got ? 700 : 400], ['  ' + m.s, ink, got ? 600 : 400]], x0 + 8, y, { size: 19, align: 'left' });
      hits.push({ x: x0, y, r: 16, name: m.hov }, { x: x0, y: AX, r: 12, name: m.hov });
    });
    const kv = (s) => `\\htmlClass{kv-dose}{${s}}`, t = (v) => str(v).replace(/,/g, '{,}');
    tex(d.readout, `${kv('\\text{number of rems}')} = \\text{RBE}\\times${kv('\\text{number of rads}')} = ${sel.rbe}\\times${kv(`${t(D)}\\ \\text{rad}`)} = ${kv(`${t(e)}\\ \\text{rem}`)} = ${kv(`${t(e / 100)}\\ \\text{Sv}`)}`);
  }
  still(d, draw);
})();
};
