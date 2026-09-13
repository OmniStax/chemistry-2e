/* Figures for section 1.6 Mathematical Treatment of Measurement Results. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['1.6'] = function (root, F) {
const { el, fmt, tex, C, PAL, alpha, ctl, register, begin, line, dot, text, headline, axes } = F;
const sim = (id, H) => F.sim(root, id, H);
function readout(host, main, small) { tex(host, main); if (small) host.appendChild(el('small', null, small)); }

/* ---------- small helpers ---------- */
const TAU = 2 * Math.PI;
/* a number for the canvas and the prose, with a true minus sign */
const num = (v, d) => fmt(v, d).replace('-', '−');
/* the same temperature on the three scales */
const toF = (tc) => (9 / 5) * tc + 32;
const toK = (tc) => tc + 273.15;

/* ---------- sprite: a thermometer tube, in ink, under 12 path commands ----------
   x is the tube's centre line, top and bottom the ends of the tube, r its half-width; the bulb hangs below the bottom. */
function tube(ctx, x, top, bottom, r, color) {
  ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = 3; ctx.fillStyle = PAL.panel;
  ctx.beginPath(); ctx.moveTo(x - r, bottom); ctx.lineTo(x - r, top + r); ctx.arc(x, top + r, r, Math.PI, 0); ctx.lineTo(x + r, bottom);
  ctx.arc(x, bottom + 1.6 * r, 2 * r, -0.35 * Math.PI, 1.35 * Math.PI); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore();
}
/* the liquid column: filled for the Celsius scale, hollow for the other two, as the chapter's colour plan marks a variant */
function column(ctx, x, yTop, bottom, r, color, filled) {
  const br = 2 * r, by = bottom + 1.6 * r;
  ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = 3; ctx.fillStyle = filled ? color : alpha(color, 0.18);
  ctx.beginPath(); ctx.moveTo(x - r * 0.5, yTop); ctx.lineTo(x - r * 0.5, bottom); ctx.arc(x, by, br - 5, -0.42 * Math.PI, 1.42 * Math.PI); ctx.lineTo(x + r * 0.5, bottom); ctx.lineTo(x + r * 0.5, yTop); ctx.closePath();
  ctx.fill(); ctx.stroke(); ctx.restore();
}

/* =====================================================================
   FIGURE 1.28: the Fahrenheit, Celsius and kelvin thermometers as one
   instrument. A still picture: a temperature is set on the slider and the
   three columns and the graph answer it; nothing in the idea has a time in
   it, so no cycle is registered and no transport is added.
===================================================================== */
(function () {
  const d = sim('sim-temperature-scales', 640);
  const T = ctl(d.controls, { label: '\\kTC', cls: 'temperature', min: -80, max: 120, step: 0.1, value: 37, unit: '°C', dec: 1, aria: 'temperature on the Celsius scale' });
  /* the height axis the three tubes share: −80 °C at the bottom, 120 °C at the top */
  const LO = -80, HI = 120, YB = 540, YT = 130;
  const Y = (tc) => YB - ((tc - LO) / (HI - LO)) * (YB - YT);
  const TOP = 108, BOT = 548, R = 13;
  /* the three scales: name, x of the tube, the reading for a Celsius temperature, the tick spacing in its own unit, how many ticks per label, decimals of the reading, its unit */
  const SCALES = [
    { name: 'Fahrenheit', x: 300, of: toF, back: (f) => ((f - 32) * 5) / 9, step: 20, every: 2, dec: 1, unit: '°F', filled: false },
    { name: 'Celsius', x: 520, of: (tc) => tc, back: (c) => c, step: 20, every: 1, dec: 1, unit: '°C', filled: true },
    { name: 'Kelvin', x: 740, of: toK, back: (k) => k - 273.15, step: 20, every: 1, dec: 1, unit: 'K', filled: false },
  ];
  function draw() {
    const { ctx } = begin(d.c);
    const tc = T.v, tf = toF(tc), tk = toK(tc), hue = C('temperature');
    /* the reference temperatures of water, in ink, across all three tubes at the same height */
    for (const [t, l1, l2] of [[100, 'Boiling point', 'of water'], [0, 'Freezing point', 'of water']]) {
      const y = Y(t);
      text(ctx, l1, 26, y - 11, PAL.ink, { size: 17 }); text(ctx, l2, 26, y + 11, PAL.ink, { size: 17 });
      for (const [a, b] of [[160, 284], [402, 504], [622, 724]]) line(ctx, a, y, b, y, PAL.ink, 2, [10, 8]);
    }
    /* the tubes, their ticks and their columns */
    for (const s of SCALES) {
      text(ctx, s.name, s.x, 86, PAL.ink, { size: 20, weight: 600, align: 'center' });
      tube(ctx, s.x, TOP, BOT, R, PAL.muted);
      const first = Math.ceil(s.of(LO) / s.step) * s.step, last = Math.floor(s.of(HI) / s.step) * s.step;
      for (let v = first; v <= last + 1e-9; v += s.step) {
        const y = Y(s.back(v)), big = Math.round(v / s.step) % s.every === 0;
        line(ctx, s.x + R, y, s.x + R + (big ? 12 : 7), y, PAL.muted, 2);
        if (big) text(ctx, num(v, 0), s.x + R + 18, y, PAL.muted, { size: 17 });
      }
      column(ctx, s.x, Y(tc), BOT, R, hue, s.filled);
      dot(ctx, s.x, Y(tc), hue, s.filled, 6);
      text(ctx, num(s.of(tc), s.dec) + ' ' + s.unit, s.x + R + 18, Y(tc), hue, { size: 20, weight: 600, bg: PAL.panel });
    }
    /* the graph beside the tubes: the Fahrenheit and kelvin readings against the Celsius temperature */
    const box = { l: 960, r: 1330, t: 130, b: 540 };
    const g = axes(ctx, box, [LO, HI], [-100, 400], { xl: 'Celsius temperature (°C)', xc: hue, yl: 'reading on the other scale', yc: hue, nx: 5, ny: 5, fx: (v) => num(v, 0), fy: (v) => num(v, 0) });
    const X = g.X, Yg = g.Y;
    line(ctx, X(LO), Yg(toF(LO)), X(HI), Yg(toF(HI)), hue, 4);
    line(ctx, X(LO), Yg(toK(LO)), X(HI), Yg(toK(HI)), hue, 4, [12, 10]);
    text(ctx, '°F', box.r + 10, Yg(toF(HI)), PAL.ink, { size: 20, weight: 600 });
    text(ctx, 'K', box.r + 10, Yg(toK(HI)), PAL.ink, { size: 20, weight: 600 });
    dot(ctx, X(0), Yg(0), PAL.ink, false, 7); text(ctx, 'origin', X(0) + 14, Yg(0) + 20, PAL.muted, { size: 17 });
    line(ctx, X(tc), box.b, X(tc), Yg(Math.max(tf, tk)), hue, 2, [4, 8]);
    dot(ctx, X(tc), Yg(tf), hue, true, 9);
    dot(ctx, X(tc), Yg(tk), hue, false, 9);
    /* the headline names the reference temperatures and the one temperature at which two of the scales agree */
    const at = Math.abs(tc) < 0.05 ? 'At 0 °C water freezes, and the thermometers read 0.0 °C, 32.0 °F and 273.2 K, the freezing point being 273.15 K exactly.'
      : Math.abs(tc - 100) < 0.05 ? 'At 100 °C water boils, and the thermometers read 100.0 °C, 212.0 °F and 373.2 K, the boiling point being 373.15 K exactly.'
      : Math.abs(tc + 40) < 0.05 ? 'At −40 °C the Celsius and Fahrenheit readings agree, both at −40, and the kelvin reading is 233.2 K.'
      : 'At ' + num(tc, 1) + ' °C the three thermometers read ' + num(tc, 1) + ' °C, ' + num(tf, 1) + ' °F and ' + num(tk, 1) + ' K.';
    headline(ctx, at);
    readout(d.readout, `\\kTF=\\left(\\frac{9}{5}\\times\\kTC\\right)+32=\\left(\\frac{9}{5}\\times ${fmt(tc, 1)}\\right)+32=${fmt(tf, 1)}\\ \\text{°F}`,
      'On the kelvin scale the same temperature is ' + num(tc, 1) + ' + 273.15 = ' + num(tk, 1) + ' K. A kelvin and a Celsius degree are the same size, so the two scales differ only in where their zeros sit, and the Fahrenheit degree is five ninths as large as either.');
  }
  register(d.fig, { update: () => {}, draw });
})();
};
