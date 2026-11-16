/* Figures for section 1.3 Physical and Chemical Properties. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['1.3'] = function (root, F) {
const { fmt, tex, C, PAL, alpha, ctl, register, begin, line, text } = F;
const sim = (id, H) => F.sim(root, id, H);
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;

/* =====================================================================
   SIM: extensive against intensive, as the book's own case. Two samples
   of milk at 20 °C, opening on the gallon and the cup, each in a beaker
   on a balance with a thermometer in it, and a third beaker holding the
   two poured together. The masses and the volumes add; the temperature
   and the density are the same in all three. Still: the picture answers
   its two sliders and has no clock.
===================================================================== */
(function () {
  const d = sim('sim-extensive', 640);
  const GALLON = 3790, CUP = 240;   /* mL, a US gallon and a US cup to the figures the readings carry */
  const DENS = 1.03;                /* g/mL, whole milk near 20 °C; the book gives no value */
  const TEMP = 20;                  /* °C, the book's room temperature */
  const V1 = ctl(d.controls, { label: '\\kV_1', cls: 'volume', min: 1000, max: 4000, step: 10, value: GALLON, unit: 'mL', dec: 0, aria: 'volume of the first sample of milk in milliliters', specials: [{ at: GALLON, label: 'a gallon' }] });
  const V2 = ctl(d.controls, { label: '\\kV_2', cls: 'volume', min: 100, max: 1000, step: 10, value: CUP, unit: 'mL', dec: 0, aria: 'volume of the second sample of milk in milliliters', specials: [{ at: CUP, label: 'a cup' }] });
  const BASE = 380, BIG = { half: 105, cap: 5200, h: 270, grad: 1000 };
  /* the small beaker is 0.6 as wide as the large ones, so a milliliter stands 1 / 0.36 as high in it */
  const SMALL = { half: 63, cap: 1100, h: (270 * 1100) / 5200 / 0.36, grad: 250 };
  const COLS = [{ x: 320, b: BIG, name: 'first sample', ref: 'milk-1' }, { x: 690, b: SMALL, name: 'second sample', ref: 'milk-2' }, { x: 1060, b: BIG, name: 'poured together', ref: null }];
  const hits = []; F.hover(d.stage, () => hits);
  /* a beaker standing on BASE: straight walls, rounded foot, a flared rim with a spout at the left */
  function beakerPath(ctx, x, b) {
    const l = x - b.half, r = x + b.half, top = BASE - b.h;
    ctx.beginPath();
    ctx.moveTo(l - 14, top - 6); ctx.quadraticCurveTo(l - 2, top - 2, l, top + 12);
    ctx.lineTo(l, BASE - 12); ctx.quadraticCurveTo(l, BASE, l + 12, BASE);
    ctx.lineTo(r - 12, BASE); ctx.quadraticCurveTo(r, BASE, r, BASE - 12);
    ctx.lineTo(r, top + 8); ctx.quadraticCurveTo(r, top, r + 6, top - 2);
  }
  /* a top-pan balance under a beaker at x: the pan, its stem, the housing on two feet and the display window */
  function balance(ctx, x, shown, cm) {
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2.5; ctx.lineJoin = 'round'; ctx.fillStyle = PAL.panel;
    ctx.beginPath(); ctx.roundRect(x - 26, BASE + 9, 52, 12, 2); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.roundRect(x - 138, BASE + 1, 276, 9, 4); ctx.fillStyle = alpha(PAL.ink, 0.12); ctx.fill(); ctx.stroke();
    ctx.fillStyle = alpha(PAL.ink, 0.07);
    ctx.beginPath(); ctx.moveTo(x - 112, BASE + 20); ctx.lineTo(x + 112, BASE + 20); ctx.lineTo(x + 126, BASE + 80); ctx.lineTo(x - 126, BASE + 80); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.fillStyle = PAL.ink; ctx.fillRect(x - 108, BASE + 80, 30, 6); ctx.fillRect(x + 78, BASE + 80, 30, 6);
    ctx.fillStyle = PAL.panel; ctx.lineWidth = 2; ctx.beginPath(); ctx.roundRect(x - 84, BASE + 29, 168, 42, 5); ctx.fill(); ctx.stroke();
    ctx.restore();
    text(ctx, shown, x, BASE + 51, cm, { size: 24, weight: 600, align: 'center' });
    hits.push({ x: x - 110, y: BASE + 50, r: 26, name: 'a balance, reading ' + shown }, { x: x + 110, y: BASE + 50, r: 26, name: 'a balance, reading ' + shown }, { x, y: BASE + 50, r: 44, name: 'a balance, reading ' + shown });
  }
  /* a thermometer standing in the beaker at x, bulb on the bottom, its column at the same height on all three */
  function thermometer(ctx, x, b, ct) {
    const tx = x + b.half - 26, bulb = BASE - 8, top = BASE - 270 - 44, mark = BASE - 270 - 8;
    ctx.save(); ctx.fillStyle = PAL.panel; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 1.8;
    ctx.beginPath(); ctx.roundRect(tx - 4.5, top, 9, bulb - top, 4.5); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.arc(tx, bulb, 5.5, 0, 2 * Math.PI); ctx.fillStyle = ct; ctx.fill(); ctx.stroke();
    ctx.fillStyle = ct; ctx.fillRect(tx - 1.6, mark, 3.2, bulb - mark);
    ctx.restore();
    for (let i = 0; i < 4; i++) line(ctx, tx + 4.5, top + 10 + i * 12, tx + 10, top + 10 + i * 12, PAL.ink, 1.2);
    for (let y = top + 6; y < bulb; y += 30) hits.push({ x: tx, y, r: 15, name: 'a thermometer in the milk, reading ' + TEMP + ' °C' });
  }
  function draw() {
    const { ctx } = begin(d.c);
    hits.length = 0;
    const cm = C('mass'), cv = C('volume'), ct = C('temperature'), cd = C('density');
    const v = [V1.v, V2.v, V1.v + V2.v];
    /* each balance reads to the gram, and the third reads the sum of the two readings, so the row adds as written */
    const m = [Math.round(DENS * v[0]), Math.round(DENS * v[1])]; m.push(m[0] + m[1]);
    COLS.forEach((c, i) => {
      const b = c.b, l = c.x - b.half, r = c.x + b.half, level = BASE - (b.h * v[i]) / b.cap, glass = c.ref ? F.ref(c.ref) : PAL.ink;
      /* the milk, clipped to the inside of its beaker */
      ctx.save(); beakerPath(ctx, c.x, b); ctx.closePath(); ctx.clip(); ctx.fillStyle = alpha(cv, 0.26); ctx.fillRect(l, level, 2 * b.half, BASE - level); ctx.restore();
      thermometer(ctx, c.x, b, ct);
      line(ctx, l + 2, level, r - 2, level, cv, 3);
      ctx.save(); ctx.strokeStyle = glass; ctx.lineWidth = 3; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; beakerPath(ctx, c.x, b); ctx.stroke(); ctx.restore();
      /* graduations up the left wall, one for every b.grad milliliters */
      for (let g = b.grad; g <= b.cap - b.grad / 2; g += b.grad) {
        const y = BASE - (b.h * g) / b.cap;
        line(ctx, l + 3, y, l + 22, y, alpha(PAL.ink, 0.55), 1.5);
        if (Math.abs(y - level) > 13) text(ctx, String(g), l + 28, y, PAL.muted, { size: 14 });
        hits.push({ x: l + 24, y, r: 12, name: 'the ' + g + ' mL mark' });
      }
      const what = i === 2 ? 'the two samples poured together' : 'the ' + c.name + ' of milk';
      for (let y = BASE - b.h + 20; y < BASE; y += 36) hits.push({ x: c.x - 10, y, r: 36, name: what + ', ' + v[i] + ' mL' });
      text(ctx, c.name, c.x, 40, glass, { size: 20, weight: 600, align: 'center' });
      balance(ctx, c.x, m[i] + ' g', cm);
    });
    text(ctx, 'mL', COLS[0].x - BIG.half + 28, BASE - BIG.h + 4, PAL.muted, { size: 14 });
    /* the four readings in rows under the three samples: the balances' displays are the first row */
    const ROWS = [
      ['mass', cm, BASE + 51, null, true],
      ['volume', cv, 505, v.map((x) => x + ' mL'), true],
      ['temperature', ct, 553, v.map(() => TEMP + ' °C'), false],
      ['density', cd, 601, v.map(() => fmt(DENS, 2) + ' g/mL'), false],
    ];
    const s1 = (COLS[0].x + COLS[1].x) / 2, s2 = (COLS[1].x + COLS[2].x) / 2;
    ROWS.forEach(([name, color, y, vals, adds]) => {
      text(ctx, name, 36, y, color, { size: 21, weight: 600 });
      if (vals) vals.forEach((s, i) => text(ctx, s, COLS[i].x, y, color, { size: 24, weight: 600, align: 'center' }));
      text(ctx, adds ? '+' : '=', s1, y, PAL.ink, { size: 26, align: 'center' });
      text(ctx, '=', s2, y, PAL.ink, { size: 26, align: 'center' });
    });
    F.vbracket(ctx, 1204, BASE + 34, 522, PAL.ink, 'extensive', 1, { size: 20 });
    F.vbracket(ctx, 1204, 538, 616, PAL.ink, 'intensive', 1, { size: 20 });
    tex(d.readout, `\\kd = \\frac{\\km}{\\kV} = \\frac{${hue('mass', m[2] + '\\ \\text{g}')}}{${hue('volume', v[2] + '\\ \\text{mL}')}} = ${hue('density', fmt(m[2] / v[2], 2) + '\\ \\text{g/mL}')}`);
  }
  register(d.fig, { update: () => {}, draw });
})();
};
