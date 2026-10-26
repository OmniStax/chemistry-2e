/* Figures for section 10.2 Properties of Liquids. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['10.2'] = function (root, F) {
const { fmt, tex, C, PAL, alpha, ctl, register, begin, line, text, headline, hbracket, vbracket, angleArc } = F;
const sim = (id, H) => F.sim(root, id, H);
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;

/* =====================================================================
   FIGURE 10.20: capillary rise. One beaker of the chosen liquid with two
   glass tubes, of diameter d and 2d, a centimeter scale at the surface
   outside them, and a circle magnifying the meniscus of the narrow tube.
   Still: the equation gives the height the column rests at; a change of
   liquid bends the columns and the meniscus from one state to the next.
   The two tubes and the beaker are the section's referents, in F.ref;
   heights, diameters and the radius wear length, the contact angle angle.
===================================================================== */
(function () {
  const d = sim('sim-caprise', 640);
  /* surface tension in mN/m from Table 10.3; density in g/cm3 (water as Example 10.4 takes it); contact angle with glass in degrees */
  const LIQ = {
    water: { name: 'water', T: 71.99, rho: 1.00, th: 0 },
    ethanol: { name: 'ethanol', T: 21.97, rho: 0.789, th: 0 },
    glycol: { name: 'ethylene glycol', T: 47.99, rho: 1.11, th: 0 },
    mercury: { name: 'mercury', T: 458.48, rho: 13.53, th: 140 },
  };
  const G = 9.8, RAD = Math.PI / 180;
  /* the height in cm for a tube of diameter dmm in mm */
  const hOf = (k, dmm) => { const q = LIQ[k]; return (2 * (q.T / 1000) * Math.cos(q.th * RAD)) / ((dmm / 2000) * q.rho * 1000 * G) * 100; };
  const liq = F.select(d.controls, { label: '\\text{liquid}', aria: 'the liquid in the beaker', value: 'water',
    options: Object.keys(LIQ).map((k) => ({ value: k, label: LIQ[k].name })) });
  const D = ctl(d.controls, { label: 'd', cls: 'length', min: 0.2, max: 2, step: 0.01, value: 0.25, unit: 'mm', dec: 2, aria: 'diameter of the narrow tube in millimeters',
    specials: [{ at: 0.25, label: 'Example 10.4' }] });

  /* height scale: 20 units per cm, fixed from -6 cm (mercury in the narrowest tube, -5.3 cm) to 16 cm (water, 14.7 cm) */
  const S = 20, Y0 = 420, Yh = (cm) => Y0 - cm * S;
  /* tube widths drawn ten times true size: 1 mm of diameter is 0.1 cm, 2 units at the height scale, 20 drawn */
  const WMM = 20;
  /* the tubes start below a two-line headline */
  const BX0 = 250, BX1 = 720, BTOP = 290, BBOT = 600, TTOP = 104, TBOT = 560;
  const X1 = 410, X2 = 585;
  /* the rise of a meniscus's edge above its centre, for inner half-width a and contact angle th (degrees) */
  const sagOf = (a, th) => { const c = Math.cos(th * RAD); return Math.abs(c) < 1e-3 ? 0 : (a * (1 - Math.sin(th * RAD))) / c; };
  /* the meniscus from the left wall to the right wall, as points: centre at (xc, yc), edge sag s (positive rises at the walls) */
  function meniscus(xc, yc, a, s) {
    const pts = [], n = 32;
    if (Math.abs(s) < 0.5) { pts.push([xc - a, yc], [xc + a, yc]); return pts; }
    const R = (a * a + s * s) / (2 * Math.abs(s)), sg = Math.sign(s);
    for (let i = 0; i <= n; i++) { const x = -a + (2 * a * i) / n; pts.push([xc + x, yc - sg * (R - Math.sqrt(Math.max(0, R * R - x * x)))]); }
    return pts;
  }
  function column(ctx, xc, a, yc, s, bottom) {
    const top = meniscus(xc, yc, a, s);
    ctx.save(); ctx.beginPath(); ctx.moveTo(xc - a, bottom);
    top.forEach(([x, y]) => ctx.lineTo(x, y)); ctx.lineTo(xc + a, bottom); ctx.closePath();
    ctx.fillStyle = PAL.soft; ctx.fill(); ctx.restore();
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2.5; ctx.beginPath(); top.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.stroke(); ctx.restore();
  }
  function tube(ctx, xc, a, col) {
    ctx.save(); ctx.fillStyle = alpha(col, 0.12); ctx.fillRect(xc - a - 6, TTOP, 6, TBOT - TTOP); ctx.fillRect(xc + a, TTOP, 6, TBOT - TTOP); ctx.restore();
    line(ctx, xc - a - 6, TTOP, xc - a - 6, TBOT, col, 2); line(ctx, xc + a + 6, TTOP, xc + a + 6, TBOT, col, 2);
    line(ctx, xc - a, TTOP, xc - a, TBOT, alpha(col, 0.6), 1.5); line(ctx, xc + a, TTOP, xc + a, TBOT, alpha(col, 0.6), 1.5);
  }
  const sci = (x) => { const e = Math.floor(Math.log10(Math.abs(x))); const m = x / 10 ** e; return `${+m.toPrecision(3)}\\times10^{${e}}`; };

  function draw() {
    const { ctx } = begin(d.c);
    const dmm = D.v, key = liq.value, q = LIQ[key];
    const m = liq.mix((k) => ({ h1: hOf(k, dmm), h2: hOf(k, 2 * dmm), th: LIQ[k].th }));
    const a1 = (dmm * WMM) / 2, a2 = dmm * WMM;
    const s1 = sagOf(a1, m.th), s2 = sagOf(a2, m.th);

    /* the scale, 0 at the surface outside the tubes */
    const RX = 170;
    line(ctx, RX, Yh(16), RX, Yh(-6), PAL.muted, 2);
    for (let c = -6; c <= 16; c++) {
      const big = c % 2 === 0;
      line(ctx, RX, Yh(c), RX + (big ? 16 : 9), Yh(c), PAL.muted, big ? 2 : 1.2);
      if (big) text(ctx, String(c), RX - 12, Yh(c), PAL.muted, { size: 17, align: 'right' });
    }
    text(ctx, 'cm', RX + 26, Yh(16), PAL.muted, { size: 17 });
    line(ctx, RX + 18, Y0, BX0 - 8, Y0, alpha(PAL.ink, 0.35), 2, [4, 8]);

    /* the beaker and the liquid in it, with the tubes' insides kept clear of it */
    ctx.save(); ctx.fillStyle = PAL.soft; ctx.fillRect(BX0, Y0, BX1 - BX0, BBOT - Y0);
    ctx.fillStyle = PAL.panel; [[X1, a1], [X2, a2]].forEach(([x, a]) => ctx.fillRect(x - a - 6, Y0 - 1, 2 * a + 12, TBOT - Y0 + 1)); ctx.restore();
    line(ctx, BX0, Y0, BX1, Y0, PAL.ink, 2.5);
    ctx.save(); ctx.strokeStyle = F.ref('beaker'); ctx.lineWidth = 3; ctx.beginPath();
    ctx.moveTo(BX0 - 18, BTOP - 8); ctx.quadraticCurveTo(BX0, BTOP - 4, BX0, BTOP + 14); ctx.lineTo(BX0, BBOT - 16); ctx.quadraticCurveTo(BX0, BBOT, BX0 + 16, BBOT);
    ctx.lineTo(BX1 - 16, BBOT); ctx.quadraticCurveTo(BX1, BBOT, BX1, BBOT - 16); ctx.lineTo(BX1, BTOP); ctx.stroke(); ctx.restore();
    text(ctx, q.name, BX1 - 18, BBOT - 24, PAL.ink, { size: 20, align: 'right' });

    /* the two columns, each resting at its height with its meniscus, then the glass over them */
    column(ctx, X1, a1, Yh(m.h1), s1, TBOT);
    column(ctx, X2, a2, Yh(m.h2), s2, TBOT);
    const cN = F.ref('narrow-tube'), cW = F.ref('wide-tube'), cL = C('length'), cA = C('angle');
    tube(ctx, X1, a1, cN); tube(ctx, X2, a2, cW);

    /* the heights, measured from the surface outside to the centre of each meniscus */
    const word = (h) => fmt(Math.abs(h), 1) + ' cm';
    /* a short bracket keeps its label off the surface line: set just above or below it, on the side the column went */
    const height = (x, h, shown, side) => {
      vbracket(ctx, x, Y0, Yh(h), cL);
      const y = Math.abs(h) < 1.6 ? Y0 - Math.sign(h || 1) * 22 : (Y0 + Yh(h)) / 2;
      text(ctx, word(shown), x + side * 16, y, cL, { size: 22, weight: 600, align: side > 0 ? 'left' : 'right', bg: PAL.panel });
    };
    height(X1 - a1 - 22, m.h1, hOf(key, dmm), -1);
    height(X2 + a2 + 22, m.h2, hOf(key, 2 * dmm), 1);
    text(ctx, 'd = ' + fmt(dmm, 2) + ' mm', X1, 622, cL, { size: 18, align: 'center' });
    text(ctx, '2d = ' + fmt(2 * dmm, 2) + ' mm', X2, 622, cL, { size: 18, align: 'center' });
    text(ctx, 'tube widths drawn 10 times true size', 1075, 614, PAL.muted, { size: 15, align: 'center' });

    /* the close-up of the narrow tube's meniscus, at its own scale */
    const CX = 1075, CY = 350, CR = 200, A = 120, YM = CY + 30;
    const sC = sagOf(A, m.th);
    ctx.save(); ctx.beginPath(); ctx.arc(CX, CY, CR, 0, 2 * Math.PI); ctx.clip();
    column(ctx, CX, A, YM, sC, CY + CR + 4);
    ctx.fillStyle = alpha(cN, 0.12); ctx.fillRect(CX - A - 26, CY - CR, 26, 2 * CR); ctx.fillRect(CX + A, CY - CR, 26, 2 * CR);
    ctx.restore();
    [CX - A - 26, CX - A, CX + A, CX + A + 26].forEach((x, i) => { const hh = Math.sqrt(CR * CR - (x - CX) ** 2); line(ctx, x, CY - hh, x, CY + hh, i % 3 ? alpha(cN, 0.6) : cN, i % 3 ? 1.5 : 2); });
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(CX, CY, CR, 0, 2 * Math.PI); ctx.stroke(); ctx.restore();
    hbracket(ctx, CX - A, CX + A, CY - 140, cL, '2r');
    const pC = { x: CX + A, y: YM - sC };
    if (m.th > 4) angleArc(ctx, pC, 54, -Math.PI / 2 - m.th * RAD, -Math.PI / 2, 'θ = ' + fmt(q.th, 0) + '°', undefined, cA);
    else text(ctx, 'θ = 0°', CX + A - 16, YM - sC + 44, cA, { size: 20, weight: 600, align: 'right', bg: PAL.panel });
    text(ctx, 'the meniscus in the narrow tube, magnified', CX, CY - CR - 22, PAL.muted, { size: 17, align: 'center' });
    const wets = q.th < 90;
    text(ctx, wets ? 'adhesion to the glass outweighs cohesion: the liquid wets it' : 'cohesion outweighs adhesion to the glass: the liquid does not wet it',
      CX, CY + CR + 28, PAL.ink, { size: 18, align: 'center' });

    const Name = q.name[0].toUpperCase() + q.name.slice(1), h1 = hOf(key, dmm), h2 = hOf(key, 2 * dmm);
    headline(ctx, wets
      ? `${Name} rises ${word(h1)} in the tube ${fmt(dmm, 2)} mm across and ${word(h2)} in the tube twice as wide.`
      : `${Name} stands ${word(h1)} below the surface in the tube ${fmt(dmm, 2)} mm across and ${word(h2)} below it in the tube twice as wide.`);

    const hm = h1 / 100;
    tex(d.readout, `\\khcap=\\frac{2\\kTsurf\\cos\\kthetacont}{\\krtube\\krho\\kgrav}=\\frac{2(${hue('surface-tension', fmt(q.T / 1000, 5) + '\\ \\text{N/m}')})\\cos ${hue('angle', fmt(q.th, 0) + '^\\circ')}}{(${hue('length', sci(dmm / 2000) + '\\ \\text{m}')})(${hue('density', fmt(q.rho * 1000, 0) + '\\ \\text{kg/m}^{3}')})(${hue('acceleration', '9.8\\ \\text{m/s}^{2}')})}=${hue('length', fmt(hm, Math.abs(hm) < 0.1 ? 4 : 3) + '\\ \\text{m}')}`);
  }
  register(d.fig, { update: () => {}, draw });
})();
};
