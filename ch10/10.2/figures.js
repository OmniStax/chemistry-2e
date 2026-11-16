/* Figures for section 10.2 Properties of Liquids. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['10.2'] = function (root, F) {
const { fmt, tex, C, PAL, alpha, ctl, register, begin, line, text, headline, hbracket, vbracket, angleArc } = F;
const sim = (id, H) => F.sim(root, id, H);
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;

/* =====================================================================
   FIGURE 10.20: capillary rise. A beaker of the chosen liquid with two
   glass tubes open at both ends, of inner diameter d and 2d, a centimetre
   scale with 0 at the surface outside them, and a box on the narrow tube's
   meniscus leading to a circle that magnifies it. Still: the equation gives
   the height the column rests at; a change of liquid bends the columns and
   the menisci from one state to the next. The two tubes are the section's
   referents; heights, diameters and 2r wear length, the contact angle angle.
===================================================================== */
(function () {
  const d = sim('sim-caprise', 670);
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
  const D = ctl(d.controls, { label: 'd', cls: 'length', min: 0.2, max: 2, step: 0.01, value: 0.25, unit: 'mm', dec: 2, aria: 'inner diameter of the narrow tube in millimeters',
    specials: [{ at: 0.25, label: 'Example 10.4' }] });

  /* height scale: 22 units per cm, 0 at the surface; it runs from -6 cm (mercury in the 0.20 mm tube stands at -5.3 cm)
     to 16 cm (water in it rises 14.7 cm). Tube widths are drawn 20 times true size: 1 mm of diameter is 44 units. */
  const S = 22, Y0 = 452, Yh = (cm) => Y0 - cm * S, WMM = 44, WALL = 7;
  const TTOP = Yh(16.6), TBOT = Yh(-6.7);
  const BX0 = 172, BX1 = 760, BRIM = Yh(2.6), BFLOOR = Yh(-7.6);
  const XW = 380, XN = 640;
  /* the close-up circle, at its own scale */
  const CX = 1085, CY = 300, CR = 190, A = 112, GW = 26;

  /* the rise of a meniscus's edge above its centre, for inner half-width a and contact angle th (degrees) */
  const sagOf = (a, th) => { const c = Math.cos(th * RAD); return Math.abs(c) < 1e-3 ? 0 : (a * (1 - Math.sin(th * RAD))) / c; };
  /* the meniscus from the left wall to the right wall: centre at (xc, yc), edges s above it (negative: below) */
  function meniscus(xc, yc, a, s) {
    const pts = [], n = 40;
    if (Math.abs(s) < 0.3) return [[xc - a, yc], [xc + a, yc]];
    const R = (a * a + s * s) / (2 * Math.abs(s)), sg = Math.sign(s);
    for (let i = 0; i <= n; i++) { const x = -a + (2 * a * i) / n; pts.push([xc + x, yc - sg * (R - Math.sqrt(Math.max(0, R * R - x * x)))]); }
    return pts;
  }
  /* a column of liquid from bottom up to its meniscus, filled, the meniscus stroked in ink */
  function column(ctx, xc, a, yc, s, bottom, fill) {
    const top = meniscus(xc, yc, a, s);
    ctx.save(); ctx.beginPath(); ctx.moveTo(xc - a, bottom);
    top.forEach(([x, y]) => ctx.lineTo(x, y)); ctx.lineTo(xc + a, bottom); ctx.closePath();
    ctx.fillStyle = fill; ctx.fill(); ctx.restore();
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2.5; ctx.beginPath(); top.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.stroke(); ctx.restore();
  }
  const ellipse = (ctx, x, y, rx, ry, col, w) => { ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = w; ctx.beginPath(); ctx.ellipse(x, y, rx, ry, 0, 0, 2 * Math.PI); ctx.stroke(); ctx.restore(); };
  /* a glass tube open at both ends: two walls of glass, the open rims seen a little from above */
  function tube(ctx, xc, a, col) {
    const o = a + WALL;
    ctx.save(); ctx.fillStyle = alpha(col, 0.16); ctx.fillRect(xc - o, TTOP, WALL, TBOT - TTOP); ctx.fillRect(xc + a, TTOP, WALL, TBOT - TTOP); ctx.restore();
    line(ctx, xc - o, TTOP, xc - o, TBOT, col, 2.5); line(ctx, xc + o, TTOP, xc + o, TBOT, col, 2.5);
    line(ctx, xc - a, TTOP, xc - a, TBOT, alpha(col, 0.55), 1.5); line(ctx, xc + a, TTOP, xc + a, TBOT, alpha(col, 0.55), 1.5);
    ellipse(ctx, xc, TTOP, o, 4, col, 2.5);
    ellipse(ctx, xc, TBOT, o, 4, alpha(col, 0.7), 2);
  }
  const sci = (x) => { const e = Math.floor(Math.log10(Math.abs(x))); const m = x / 10 ** e; return `${+m.toPrecision(3)}\\times10^{${e}}`; };
  /* two decimals under 1 cm, so the 2 : 1 of the two tubes still reads at the widest */
  const word = (h) => fmt(Math.abs(h), Math.abs(h) < 1 ? 2 : 1) + ' cm';

  let hits = []; F.hover(d.stage, () => hits);

  function draw() {
    const { ctx } = begin(d.c);
    const dmm = D.v, key = liq.value, q = LIQ[key];
    const m = liq.mix((k) => ({ h1: hOf(k, dmm), h2: hOf(k, 2 * dmm), th: LIQ[k].th }));
    const fill = liq.mixColor((k) => (k === 'mercury' ? F.el('Hg') : alpha(PAL.ink, 0.16)));
    const aN = (dmm * WMM) / 2, aW = dmm * WMM;
    /* a meniscus is a height, so it is drawn to the height scale (a 4 mm tube's is 2 mm deep), never at the widths' 20 times;
       a floor of 6 units keeps the way it curves visible, easing to flat as the contact angle passes 90° */
    const floor = 6 * Math.min(1, 2 * Math.abs(sagOf(1, m.th)));
    const sagH = (rcm) => { const s = sagOf(rcm, m.th) * S; return Math.abs(s) < 1e-6 ? 0 : Math.sign(s) * Math.max(Math.abs(s), floor); };
    const sN = sagH(dmm / 20), sW = sagH(dmm / 10);
    const cN = F.ref('narrow-tube'), cW = F.ref('wide-tube'), cL = C('length'), cA = C('angle');

    /* the scale, 0 at the surface outside the tubes */
    const RX = 100;
    line(ctx, RX, Yh(16), RX, Yh(-6), PAL.muted, 2);
    for (let c = -6; c <= 16; c++) {
      const big = c % 2 === 0;
      line(ctx, RX, Yh(c), RX + (big ? 16 : 9), Yh(c), PAL.muted, big ? 2 : 1.2);
      if (big) text(ctx, c < 0 ? '−' + -c : String(c), RX - 10, Yh(c), PAL.muted, { size: 17, align: 'right' });
    }
    text(ctx, 'cm', RX + 10, Yh(16) - 22, PAL.muted, { size: 17, align: 'center' });
    line(ctx, RX + 18, Y0, BX0 - 6, Y0, alpha(PAL.ink, 0.4), 2, [4, 8]);

    /* the liquid in the beaker, the tubes' insides cleared, then each column up to its meniscus */
    ctx.save(); ctx.fillStyle = fill; ctx.beginPath();
    ctx.moveTo(BX0, Y0); ctx.lineTo(BX0, BFLOOR - 18); ctx.quadraticCurveTo(BX0, BFLOOR, BX0 + 18, BFLOOR);
    ctx.lineTo(BX1 - 18, BFLOOR); ctx.quadraticCurveTo(BX1, BFLOOR, BX1, BFLOOR - 18); ctx.lineTo(BX1, Y0); ctx.closePath(); ctx.fill();
    ctx.fillStyle = PAL.panel; [[XW, aW], [XN, aN]].forEach(([x, a]) => ctx.fillRect(x - a - WALL, Y0 - 2, 2 * (a + WALL), TBOT - Y0 + 2));
    ctx.restore();
    const yW = Yh(m.h2), yN = Yh(m.h1);
    column(ctx, XW, aW, yW, sW, TBOT, fill);
    column(ctx, XN, aN, yN, sN, TBOT, fill);
    /* the surface outside the tubes */
    [[BX0, XW - aW - WALL], [XW + aW + WALL, XN - aN - WALL], [XN + aN + WALL, BX1]].forEach(([x1, x2]) => line(ctx, x1, Y0, x2, Y0, PAL.ink, 2.5));
    tube(ctx, XW, aW, cW); tube(ctx, XN, aN, cN);

    /* the beaker, in ink: a pouring lip on the left, a rounded floor */
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.beginPath();
    ctx.moveTo(BX0 - 20, BRIM - 10); ctx.quadraticCurveTo(BX0, BRIM - 6, BX0, BRIM + 14); ctx.lineTo(BX0, BFLOOR - 18); ctx.quadraticCurveTo(BX0, BFLOOR, BX0 + 18, BFLOOR);
    ctx.lineTo(BX1 - 18, BFLOOR); ctx.quadraticCurveTo(BX1, BFLOOR, BX1, BFLOOR - 18); ctx.lineTo(BX1, BRIM); ctx.stroke(); ctx.restore();
    text(ctx, q.name, BX1 + 16, BFLOOR - 18, PAL.ink, { size: 20, align: 'left' });

    /* the heights, from the surface outside to the centre of each meniscus: the wide tube's on its left, the narrow tube's on its left */
    const height = (x, h, shown) => {
      vbracket(ctx, x, Y0, Yh(h), cL);
      const y = Math.abs(h) < 1.6 ? Y0 - Math.sign(h || 1) * 22 : (Y0 + Yh(h)) / 2;
      text(ctx, word(shown), x - 16, y, cL, { size: 22, weight: 600, align: 'right', bg: PAL.panel });
    };
    height(XW - aW - WALL - 18, m.h2, hOf(key, 2 * dmm));
    height(XN - aN - WALL - 18, m.h1, hOf(key, dmm));
    F.rich(ctx, ['2d = ', [fmt(2 * dmm, 2) + ' mm', cL]], XW, BFLOOR + 30, { size: 20, align: 'center' });
    F.rich(ctx, ['d = ', [fmt(dmm, 2) + ' mm', cL]], XN, BFLOOR + 30, { size: 20, align: 'center' });

    /* the box on the narrow meniscus and the guide lines to the close-up */
    const bx = aN + WALL + 12, by = Math.max(bx * 0.6, 22), bcy = yN - sN / 2;
    ctx.save(); ctx.strokeStyle = alpha(PAL.ink, 0.7); ctx.lineWidth = 2; ctx.strokeRect(XN - bx, bcy - by, 2 * bx, 2 * by); ctx.restore();
    line(ctx, XN + bx, bcy - by, CX + CR * Math.cos(Math.PI + 0.5), CY + CR * Math.sin(Math.PI + 0.5), alpha(PAL.ink, 0.35), 1.5);
    line(ctx, XN + bx, bcy + by, CX + CR * Math.cos(Math.PI - 0.5), CY + CR * Math.sin(Math.PI - 0.5), alpha(PAL.ink, 0.35), 1.5);

    /* the close-up: the narrow tube's walls, its liquid and meniscus */
    const sC = sagOf(A, m.th), YM = CY + 20 + sC / 2;
    ctx.save(); ctx.beginPath(); ctx.arc(CX, CY, CR, 0, 2 * Math.PI); ctx.fillStyle = PAL.panel; ctx.fill(); ctx.clip();
    column(ctx, CX, A, YM, sC, CY + CR + 4, fill);
    ctx.fillStyle = alpha(cN, 0.16); ctx.fillRect(CX - A - GW, CY - CR, GW, 2 * CR); ctx.fillRect(CX + A, CY - CR, GW, 2 * CR);
    ctx.restore();
    [CX - A - GW, CX - A, CX + A, CX + A + GW].forEach((x, i) => { const hh = Math.sqrt(CR * CR - (x - CX) ** 2); line(ctx, x, CY - hh, x, CY + hh, i % 3 ? alpha(cN, 0.55) : cN, i % 3 ? 1.5 : 2.5); });
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(CX, CY, CR, 0, 2 * Math.PI); ctx.stroke(); ctx.restore();
    hbracket(ctx, CX - A, CX + A, Math.min(YM, YM - sC) - 64, cL, '2r = ' + fmt(dmm, 2) + ' mm');
    const pC = { x: CX + A, y: YM - sC };
    if (m.th > 4) angleArc(ctx, pC, 48, -Math.PI / 2 - m.th * RAD, -Math.PI / 2, 'θ = ' + fmt(q.th, 0) + '°', undefined, cA);
    else text(ctx, 'θ = 0°', CX + A - 14, YM - sC - 24, cA, { size: 20, weight: 600, align: 'right', bg: PAL.panel });
    const wets = q.th < 90;
    text(ctx, wets ? 'Adhesion to the glass outweighs cohesion: a concave meniscus.' : 'Cohesion outweighs adhesion to the glass: a convex meniscus.',
      CX, CY + CR + 30, PAL.ink, { size: 18, align: 'center' });
    text(ctx, 'tube widths drawn 20 times true size', CX, BFLOOR + 30, PAL.muted, { size: 15, align: 'center' });

    hits = [
      { x: XN, y: Yh(14), r: Math.max(aN + WALL, 16), name: 'narrow tube, inner diameter d' },
      { x: XW, y: Yh(14), r: Math.max(aW + WALL, 16), name: 'wide tube, inner diameter 2d' },
      { x: XN, y: bcy, r: Math.max(bx, 16), name: 'meniscus in the narrow tube' },
      { x: XW, y: yW, r: Math.max(aW, 16), name: 'meniscus in the wide tube' },
      { x: BX0 + 40, y: (Y0 + BFLOOR) / 2, r: 30, name: q.name + ' in the beaker' },
      { x: CX - A - GW / 2, y: CY, r: 22, name: 'glass wall of the narrow tube' },
      { x: CX + A + GW / 2, y: CY - 100, r: 22, name: 'glass wall of the narrow tube' },
      { x: CX, y: YM - sC / 2, r: 40, name: 'meniscus, magnified' },
    ];

    const h1 = hOf(key, dmm), h2 = hOf(key, 2 * dmm);
    headline(ctx, `${q.name[0].toUpperCase() + q.name.slice(1)} ${wets ? 'rises' : 'falls'} ${word(h1)} in the ${fmt(dmm, 2)} mm tube and ${word(h2)} in the ${fmt(2 * dmm, 2)} mm tube.`);

    const hm = h1 / 100;
    tex(d.readout, `\\khcap=\\frac{2\\kTsurf\\cos\\kthetacont}{\\krtube\\krho\\kgrav}=\\frac{2(${hue('surface-tension', fmt(q.T / 1000, 5) + '\\ \\text{N/m}')})\\cos ${hue('angle', fmt(q.th, 0) + '^\\circ')}}{(${hue('length', sci(dmm / 2000) + '\\ \\text{m}')})(${hue('density', fmt(q.rho * 1000, 0) + '\\ \\text{kg/m}^{3}')})(${hue('acceleration', '9.8\\ \\text{m/s}^{2}')})}=${hue('length', fmt(hm, Math.abs(hm) < 0.1 ? 4 : 3) + '\\ \\text{m}')}`);
  }
  register(d.fig, { update: () => {}, draw });
})();
};
