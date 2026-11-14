/* Figures for section 1.6 Mathematical Treatment of Measurement Results. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['1.6'] = function (root, F) {
const { fmt, tex, C, PAL, alpha, ctl, register, begin, line, dot, text, axes, plot, measure } = F;
const sim = (id, H) => F.sim(root, id, H);
/* a value of the readout in its type's colour (root rule 26.17) */
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;
/* a number to one decimal place, halves rounded up, so that binary noise never turns 98.65 into 98.6 */
const r1 = (v) => Math.round(v * 10 + 1e-6) / 10;

/* =====================================================================
   FIGURE 1.28: one temperature read on the Fahrenheit, Celsius and kelvin
   thermometers. The three lie on their sides over one Celsius axis, so the
   end of each liquid thread stands over its point on the graph beneath.
   A still picture: nothing in the idea has a time in it, so no cycle is
   registered and no transport is added.
===================================================================== */
(function () {
  const d = sim('sim-temperature-scales', 900);
  /* the Celsius axis the thermometers and the graph share: −80 °C to 120 °C */
  const LO = -80, HI = 120, XL = 250, XR = 1300;
  const X = (tc) => XL + ((tc - LO) / (HI - LO)) * (XR - XL);
  /* each scale: its name, the y of its thermometer, the reading for a Celsius temperature and back, the reading's
     decimals and unit, the book's bracket between water's freezing and boiling, and its three numbers on the image */
  const SCALES = [
    { key: 'F', name: 'Fahrenheit', y: 116, of: (c) => 1.8 * c + 32, back: (f) => (f - 32) / 1.8, dec: 1, unit: '°F', span: '180 Fahrenheit degrees', marks: ['−40 °F', '32 °F', '212 °F'], filled: false },
    { key: 'C', name: 'Celsius', y: 238, of: (c) => c, back: (c) => c, dec: 1, unit: '°C', span: '100 Celsius degrees', marks: ['−40 °C', '0 °C', '100 °C'], filled: true },
    { key: 'K', name: 'Kelvin', y: 360, of: (c) => c + 273.15, back: (k) => k - 273.15, dec: 2, unit: 'K', span: '100 kelvins', marks: ['233.15 K', '273.15 K', '373.15 K'], filled: false },
  ];
  const REF = [-40, 0, 100];   /* the temperatures the book's image marks on all three */

  /* The reader sets the temperature on whichever scale they drag; the other two sliders follow. The Celsius
     reading is kept to a tenth and the other two are computed from it as shown, so every line of the readout is
     true as written (37.0 °C + 273.15 = 310.15 K). */
  let active = 'C', c = 37, f = 98.6;
  const S = {};
  const pick = (key) => {
    active = key;
    if (key === 'C') c = r1(S.C.v);
    if (key === 'K') c = r1(S.K.v - 273.15);
    if (key === 'F') { f = r1(S.F.v); c = r1((f - 32) / 1.8); } else f = r1(1.8 * c + 32);
    if (key !== 'F') S.F.set(f);
    if (key !== 'C') S.C.set(c);
    if (key !== 'K') S.K.set(c + 273.15);
  };
  const SP = ['°C and °F agree', 'water freezes', 'water boils'];
  const slider = (s, label, name) => ctl(d.controls, { label, cls: 'temperature', key: 'T' + s.key, min: s.of(LO), max: s.of(HI), step: 0.1, value: s.of(37), unit: s.unit, dec: s.dec,
    aria: 'temperature on the ' + name + ' scale', specials: REF.map((t, i) => ({ at: s.of(t), label: SP[i] })), onInput: () => pick(s.key) });
  S.F = slider(SCALES[0], '\\kTF', 'Fahrenheit'); S.C = slider(SCALES[1], '\\kTC', 'Celsius'); S.K = slider(SCALES[2], '\\kTK', 'kelvin');

  let hits = []; F.hover(d.stage, () => hits);

  /* a glass thermometer lying on its side, bulb to the left: the stem, its bore, and the liquid that fills the bulb
     and reaches along the bore to xe */
  const SR = 16, BR = 21, BORE = 5;
  function thermometer(ctx, y, xe, color, filled) {
    const x0 = XL - 92, xb = XL - 42, x1 = XR + 34;
    ctx.save(); ctx.lineWidth = 2.5; ctx.strokeStyle = PAL.ink; ctx.fillStyle = PAL.panel;
    ctx.beginPath(); ctx.moveTo(xb + 10, y - SR); ctx.lineTo(x1 - SR, y - SR); ctx.arc(x1 - SR, y, SR, -Math.PI / 2, Math.PI / 2); ctx.lineTo(xb + 10, y + SR);
    ctx.lineTo(xb, y + BR); ctx.lineTo(x0 + BR, y + BR); ctx.arc(x0 + BR, y, BR, Math.PI / 2, 1.5 * Math.PI); ctx.lineTo(xb, y - BR); ctx.closePath(); ctx.fill(); ctx.stroke();
    /* the empty bore ahead of the liquid */
    ctx.strokeStyle = alpha(PAL.ink, 0.3); ctx.lineWidth = 1.5; ctx.strokeRect(xe, y - BORE, x1 - SR - 6 - xe, 2 * BORE);
    /* the liquid: bulb and thread as one shape */
    const q = BR - 6;
    ctx.strokeStyle = color; ctx.lineWidth = 2.5; ctx.fillStyle = filled ? color : alpha(color, 0.3);
    ctx.beginPath(); ctx.moveTo(xb, y - BORE); ctx.lineTo(xe, y - BORE); ctx.lineTo(xe, y + BORE); ctx.lineTo(xb, y + BORE);
    ctx.lineTo(xb - 6, y + q); ctx.lineTo(x0 + BR, y + q); ctx.arc(x0 + BR, y, q, Math.PI / 2, 1.5 * Math.PI); ctx.lineTo(xb - 6, y - q); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.restore();
  }

  function draw() {
    const { ctx } = begin(d.c);
    const temp = C('temperature'), xe = X(c), box = { l: XL, r: XR, t: 490, b: 820 };
    const shown = { F: f, C: c, K: c + 273.15 };
    hits = [];
    /* the temperatures the book marks, across all three thermometers: water's two in dashes, −40 as a thin rule */
    const top = SCALES[0].y - 78, foot = SCALES[2].y + 34;
    line(ctx, X(-40), top + 44, X(-40), foot, alpha(PAL.ink, 0.45), 2);
    line(ctx, X(0), top + 44, X(0), foot, PAL.ink, 2, [10, 8]); line(ctx, X(100), top + 44, X(100), foot, PAL.ink, 2, [10, 8]);
    text(ctx, '°C and °F agree', X(-40), top, PAL.ink, { size: 20, align: 'center' });
    text(ctx, 'Freezing point of water', X(0), top, PAL.ink, { size: 20, align: 'center' });
    text(ctx, 'Boiling point of water', X(100), top, PAL.ink, { size: 20, align: 'center' });
    /* the one temperature, dropped from the thermometers to the graph */
    line(ctx, xe, SCALES[0].y, xe, box.b, alpha(temp, 0.7), 2, [4, 8]);

    for (const s of SCALES) {
      const y = s.y, ly = y + 52;
      text(ctx, s.name, 28, y, PAL.ink, { size: 22, weight: 600 });
      thermometer(ctx, y, xe, temp, s.filled);
      hits.push({ x: XL - 70, y, r: 26, name: s.name + ' thermometer' });
      /* graduations every 10 of the scale's own unit, so the size of its degree shows as their spacing */
      const lo = Math.ceil(s.of(LO) / 10 - 1e-9) * 10, hi = Math.floor(s.of(HI) / 10 + 1e-9) * 10;
      for (let v = lo; v <= hi; v += 10) line(ctx, X(s.back(v)), y + SR, X(s.back(v)), y + SR + 8, PAL.muted, 1.5);
      /* the book's three numbers under their marks, and its bracket between freezing and boiling */
      REF.forEach((t, i) => { line(ctx, X(t), y + SR, X(t), y + SR + 14, PAL.ink, 2.5); text(ctx, s.marks[i], X(t), ly, PAL.ink, { size: 20, align: 'center', bg: PAL.panel }); });
      const a = X(0) + measure(ctx, s.marks[1], { size: 20 }) / 2 + 16, b = X(100) - measure(ctx, s.marks[2], { size: 20 }) / 2 - 16, w = measure(ctx, s.span, { size: 20 }) / 2 + 12;
      const mid = (a + b) / 2;
      line(ctx, a, ly, mid - w, ly, PAL.ink, 2); line(ctx, mid + w, ly, b, ly, PAL.ink, 2); line(ctx, a, ly - 8, a, ly + 8, PAL.ink, 2); line(ctx, b, ly - 8, b, ly + 8, PAL.ink, 2);
      text(ctx, s.span, mid, ly, PAL.ink, { size: 20, align: 'center', bg: PAL.panel });
      /* the reading, over the end of the liquid */
      const lab = fmt(shown[s.key], s.dec) + ' ' + s.unit, half = measure(ctx, lab, { size: 22, weight: 600 }) / 2;
      text(ctx, lab, Math.min(Math.max(xe, XL - 20 + half), XR + 40 - half), y - 36, temp, { size: 22, weight: 600, align: 'center', bg: PAL.panel });
    }

    /* the graph beneath, on the same Celsius axis: the three readings against the Celsius temperature */
    const g = axes(ctx, box, [LO, HI], [-200, 400], { xl: 'Celsius temperature (°C)', xc: temp, nx: 5, ny: 6 });
    text(ctx, 'reading on each scale', box.l, box.t - 24, temp, { size: 20, weight: 600, bg: PAL.panel });
    for (const s of SCALES) {
      plot(ctx, g, s.of, temp, { w: 4 });
      text(ctx, s.unit, box.r + 22, g.Y(s.of(HI)), PAL.ink, { size: 22, weight: 600 });
    }
    /* where each line meets 0 °C: the intercept its conversion adds */
    for (const [s, v] of [[SCALES[0], '32 °F'], [SCALES[2], '273.15 K']]) {
      dot(ctx, g.X(0), g.Y(s.of(0)), PAL.ink, false, 6);
      text(ctx, v, g.X(0) - 14, g.Y(s.of(0)) - 16, PAL.ink, { size: 20, align: 'right' });
      hits.push({ x: g.X(0), y: g.Y(s.of(0)), r: 16, name: 'The ' + s.name.replace('Kelvin', 'kelvin') + ' reading at 0 °C, the intercept' });
    }
    dot(ctx, g.X(-40), g.Y(-40), PAL.ink, false, 6);
    text(ctx, '−40 °F = −40 °C', g.X(-40) + 16, g.Y(-40) + 20, PAL.ink, { size: 20 });
    for (const s of SCALES) {
      dot(ctx, g.X(c), g.Y(s.of(c)), temp, s.filled, 8);
      hits.push({ x: g.X(c), y: g.Y(s.of(c)), r: 16, name: s.name.replace('Kelvin', 'The kelvin').replace(/^(F|C)/, 'The $1') + ' reading, ' + fmt(shown[s.key], s.dec) + ' ' + s.unit });
    }

    /* the readout: the two conversions from the scale the reader set, each whole on its line */
    const v = (x, dec, unit) => hue('temperature', fmt(x, dec) + '\\ \\text{' + unit + '}');
    const toF = `\\kTF = \\left(\\frac{9}{5}\\times\\kTC\\right)+32 = \\left(\\frac{9}{5}\\times ${v(c, 1, '°C')}\\right)+32 = ${v(f, 1, '°F')}`;
    const toK = `\\kTK = \\kTC+273.15 = ${v(c, 1, '°C')}+273.15 = ${v(c + 273.15, 2, 'K')}`;
    const fromF = `\\kTC = \\frac{5}{9}\\left(\\kTF-32\\right) = \\frac{5}{9}\\left(${v(f, 1, '°F')}-32\\right) = ${v(c, 1, '°C')}`;
    const fromK = `\\kTC = \\kTK-273.15 = ${v(c + 273.15, 2, 'K')}-273.15 = ${v(c, 1, '°C')}`;
    tex(d.readout, active === 'F' ? fromF + ' \\\\ ' + toK : active === 'K' ? fromK + ' \\\\ ' + toF : toF + ' \\\\ ' + toK);
  }
  register(d.fig, { update: () => {}, draw });
})();
};
