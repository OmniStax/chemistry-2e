/* Figures for section 18.10 Occurrence, Preparation, and Properties of Sulfur. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['18.10'] = function (root, F) {
const { C, PAL, alpha, register, begin, line, text, topline } = F;
const frac = (x) => x - Math.floor(x);
const clamp01 = (x) => Math.min(1, Math.max(0, x));
const lerp = (a, b, k) => a + (b - a) * k;
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;
/* a fixed pseudo-random number in [0, 1) for particle i and draw j, so every run draws the same */
const rnd = (i, j) => { const s = Math.sin(i * 127.1 + j * 311.7) * 43758.5453; return s - Math.floor(s); };

/* =====================================================================
   FIGURE 18.59: the Frasch process as a working well, in the book's cutaway:
   three concentric pipes through soil into a sulfur deposit, and the settling
   vat the text sends the mixture to. The fluids are drawn as fluids: water
   blue, liquid sulfur straw, air as bubbles. Water runs down the outermost
   pipe from the start; above 113 °C a pool of liquid sulfur grows round the
   foot; with the air on, bubbles carry what stands at the foot up the middle
   pipe and out to the vat, and with it off the column stands partway up.
   A 6 s clock and a 1.2 s hold.
===================================================================== */
(function () {
  const H = 920, d = F.sim(root, 'sim-frasch', H);
  const SOLID = '#e5c444', MOLTEN = '#d9a63a', WATER = '#8fc6e8', SOIL = '#b79a80';   /* rhombic sulfur; molten sulfur's straw; water; soil */
  const T = 6, MP = 113, TB = 170, TAU = 2 * Math.PI;
  const CX = 780, RI = 26, RM = 80, RO = 134, PH = 24, CW = RM + 54;   /* the three pipes' radii, a side pipe's half bore, the chamber's half width */
  const YAIR = 146, YCH = [190, 270], YOUT = 230, YCAP = 326, YWIN = 372;
  const GROUND = 440, DEPOSIT = 608, YI = 772, YM = 822, YO = 850, YS = 524;   /* YS: where the column stands with the air off */
  const XS = 236, YSP = 296, VAT = { l: 56, r: 430, t: 316, b: GROUND - 4 };
  const POOL = { x: CX, y: YO + 14 };
  const V = 431, TM = 0.4;                          /* the riser's speed in units a second; when the pool reaches the middle pipe's mouth */
  const L1 = YM - YOUT, LOUT = (CX - CW - XS) + (YSP - YOUT), LTOP = L1 + CW + LOUT;

  const cy = F.cycle(() => T, 1.2);
  const temp = F.ctl(d.controls, { label: '\\kT', cls: 'temperature', min: 100, max: 180, step: 1, value: TB, unit: '°C', dec: 0,
    specials: [{ at: MP, label: 'melting point' }], onInput: () => cy.reset() });
  const sw = F.choice(d.controls, { label: '\\text{compressed air}', options: [{ value: 'off', label: 'off' }, { value: 'on', label: 'on' }], value: 'on', aria: 'the compressed air', onInput: () => cy.reset() });
  const ro = F.readout(d);
  let hits = [];
  F.hover(d.stage, () => hits);

  const excess = () => (temp.v > MP ? (temp.v - MP) / (TB - MP) : 0);   /* 1 at the book's 170 °C */
  const poolR = (t) => (temp.v > MP ? (90 + 290 * excess()) * F.ease.smooth(clamp01(t / 3.6)) : 0);
  /* how far up the middle pipe the liquid sulfur has come, measured from the pipe's mouth */
  const front = (t) => (temp.v > MP ? Math.max(0, V * (t - TM)) : 0);

  const mk = (pts) => { const cum = [0]; for (let i = 1; i < pts.length; i++) cum.push(cum[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1])); return { pts, cum, L: cum[cum.length - 1] }; };
  function at(p, s) {
    const c = p.cum; let i = 1; while (i < c.length - 1 && c[i] < s) i++;
    const k = clamp01((s - c[i - 1]) / (c[i] - c[i - 1] || 1)), a = p.pts[i - 1], b = p.pts[i];
    return [lerp(a[0], b[0], k), lerp(a[1], b[1], k), Math.atan2(b[1] - a[1], b[0] - a[0])];
  }
  const XA = (RI + RM) / 2 + 1, XW = (RM + RO) / 2;
  const FOOT = 76;                                  /* a bubble's way from the air pipe's foot round into the middle pipe */
  const BUB = [
    mk([[CX - 9, YI - 30], [CX - 12, YI + 22], [CX - XA, YI + 24], [CX - XA, YCH[1] + 6], [CX - CW, YOUT - 6], [XS, YOUT - 6], [XS - 4, YSP]]),
    mk([[CX + 9, YI - 30], [CX + 12, YI + 22], [CX + XA, YI + 24], [CX + XA, YCH[1] + 10], [CX + 34, YOUT + 4], [CX - 60, YOUT + 8], [CX - CW, YOUT + 6], [XS, YOUT + 6], [XS + 4, YSP]]),
  ];
  const WAT = [
    mk([[1400, YWIN], [CX + XW, YWIN], [CX + XW, YO - 2], [CX + XW, YO + 30]]),
    mk([[CX - XW, YCAP + 22], [CX - XW, YO - 2], [CX - XW, YO + 30]]),
  ];
  const AIRP = mk([[1400, YAIR], [CX + 44, YAIR], [CX + 12, YAIR + 10], [CX, YAIR + 44], [CX, YI - 10]]);

  function rect(ctx, x, y, w, h, fill) { if (w > 0 && h > 0) { ctx.fillStyle = fill; ctx.fillRect(x, y, w, h); } }
  function disc(ctx, x, y, r, fill, edge, a = 1) {
    if (a <= 0.01) return;
    ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fillStyle = fill; ctx.fill();
    if (edge) { ctx.strokeStyle = edge; ctx.lineWidth = 1.6; ctx.stroke(); } ctx.restore();
  }
  function chevron(ctx, x, y, ang, color, a = 1) {
    if (a <= 0.01) return;
    ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang); ctx.strokeStyle = color; ctx.lineWidth = 3; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.moveTo(-5, -8); ctx.lineTo(4, 0); ctx.lineTo(-5, 8); ctx.stroke(); ctx.restore();
  }
  /* a pipe along a bent centre line: its wall, then its bore, then what fills it up to `upto` units along */
  function trace(ctx, pts, r) { ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length - 1; i++) ctx.arcTo(pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1], r); ctx.lineTo(pts[pts.length - 1][0], pts[pts.length - 1][1]); }
  function tube(ctx, pts, half, r, fills) {
    ctx.save(); ctx.lineCap = 'butt'; ctx.lineJoin = 'round';
    trace(ctx, pts, r); ctx.strokeStyle = wall(); ctx.lineWidth = 2 * half + 12; ctx.stroke();
    trace(ctx, pts, r); ctx.strokeStyle = PAL.panel; ctx.lineWidth = 2 * half; ctx.stroke();
    for (const [col, upto] of fills) {
      if (upto !== undefined && upto <= 0) continue;
      trace(ctx, pts, r); ctx.strokeStyle = col; ctx.lineWidth = 2 * half;
      if (upto !== undefined) ctx.setLineDash([upto, 4000]);
      ctx.stroke(); ctx.setLineDash([]);
    }
    ctx.restore();
  }
  const { mixColor } = F;
  const wall = () => mixColor(PAL.ink, PAL.panel, 0.18);

  function draw() {
    const { ctx, W } = begin(d.c);
    const t = cy.now(), Tv = temp.v, hot = Tv > MP, air = sw.value === 'on', R = poolR(t);
    const wat = mixColor(F.fact(WATER), PAL.panel, 0.25), sul = F.fact(MOLTEN), froth = mixColor(F.fact(MOLTEN), PAL.panel, 0.22);
    const gas = mixColor(PAL.panel, PAL.ink, 0.05), mark = mixColor(F.fact(WATER), PAL.ink, 0.5);
    const Lf = air ? front(t) : Math.min(front(t) * 0.45, YM - YS);          /* without air the sulfur only creeps up to where the column stands */
    hits = [];

    /* the ground: soil over the deposit, and the pool of liquid sulfur round the foot of the pipes */
    rect(ctx, 0, GROUND, W, DEPOSIT - GROUND, F.fact(SOIL));
    rect(ctx, 0, DEPOSIT, W, H - DEPOSIT, F.fact(SOLID));
    line(ctx, 0, GROUND, W, GROUND, alpha(PAL.ink, 0.55), 2.5);
    line(ctx, 0, DEPOSIT, W, DEPOSIT, alpha(PAL.ink, 0.25), 1.5);
    if (R > 1) {
      ctx.save(); ctx.beginPath(); ctx.rect(0, DEPOSIT, W, H - DEPOSIT); ctx.clip();
      ctx.beginPath(); ctx.ellipse(POOL.x, POOL.y, R, 0.3 * R, 0, 0, TAU); ctx.fillStyle = sul; ctx.fill();
      ctx.strokeStyle = alpha(PAL.ink, 0.4); ctx.lineWidth = 2; ctx.stroke(); ctx.restore();
    }

    /* the outlet pipe to the vat, and the vat: sulfur settles under the water */
    const q = Lf - L1 - CW, flowing = air;
    tube(ctx, [[CX - CW + 4, YOUT], [XS, YOUT], [XS, YSP]], PH, 46, flowing ? [[wat], [froth, q]] : [[gas]]);
    const tArr = TM + LTOP / V;                                                  /* when the sulfur reaches the vat */
    const hs = flowing && hot ? 27 * Math.min(1.25, excess()) * Math.max(0, t - tArr) : 0;
    const hw = flowing ? 5.5 * Math.min(t, hot ? tArr : T) + (hot ? 2.5 * Math.max(0, t - tArr) : 0) : 0;
    rect(ctx, VAT.l, VAT.b - hs, VAT.r - VAT.l, hs, F.fact(SOLID));
    rect(ctx, VAT.l, VAT.b - hs - hw, VAT.r - VAT.l, hw, wat);
    if (flowing && t > 0.05) rect(ctx, XS - 9, YSP, 18, VAT.b - hs - hw - YSP + 2, q > LOUT ? froth : wat);
    ctx.save(); ctx.strokeStyle = wall(); ctx.lineWidth = 7; ctx.lineJoin = 'miter';
    ctx.beginPath(); ctx.moveTo(VAT.l, VAT.t); ctx.lineTo(VAT.l, VAT.b); ctx.lineTo(VAT.r, VAT.b); ctx.lineTo(VAT.r, VAT.t); ctx.stroke(); ctx.restore();

    /* water in its inlet and in the outermost pipe */
    rect(ctx, CX + RO, YWIN - PH, W - CX - RO, 2 * PH, wat);
    rect(ctx, CX - RO, YCAP, RO - RM, YO - YCAP, wat); rect(ctx, CX + RM, YCAP, RO - RM, YO - YCAP, wat);

    /* the middle pipe and its chamber: water above the sulfur front; empty above the standing column with the air off */
    const yTop = air ? YCH[1] : YS, yF = Math.max(yTop, YM - Lf);
    rect(ctx, CX - RM, YCH[0], 2 * RM, YM - YCH[0], PAL.panel); rect(ctx, CX - CW, YCH[0], 2 * CW, YCH[1] - YCH[0], PAL.panel);
    rect(ctx, CX - RM, YCH[0], 2 * RM, yTop - YCH[0], gas);
    rect(ctx, CX - RM, yTop, 2 * RM, yF - yTop, wat);
    rect(ctx, CX - RM, yF, 2 * RM, YM - yF, air ? froth : sul);
    rect(ctx, CX - CW, YCH[0], 2 * CW, YCH[1] - YCH[0], air ? mixColor(wat, froth, clamp01((Lf - (YM - YCH[1])) / (L1 + CW - (YM - YCH[1])))) : gas);
    if (!air) line(ctx, CX - RM, YS, CX + RM, YS, alpha(PAL.ink, 0.5), 2);

    /* the air's bubbles, and the water drops the sulfur carries with it */
    if (air) BUB.forEach((p, side) => {
      const N = 21, LAPS = 2, Vb = (LAPS * p.L) / T;
      for (let i = 0; i < 2 * N; i++) {
        const drop = i % 2 === 1, s = frac(i / (2 * N) + (t * LAPS) / T + side * 0.019) * p.L, rise = s - FOOT;
        if (drop && !(hot && rise > 0 && rise < Lf && i % 4 === 1)) continue;
        const [x0, y0] = at(p, s), up = s > FOOT + 20 && y0 > YCH[1] + 20;
        const x = x0 + (up ? 11 * Math.sin(s / 47 + i * 2.1) : 0), y = y0 + (!up && s > FOOT ? 5 * Math.sin(s / 31 + i) : 0);
        const a = clamp01(s / 30) * clamp01((p.L - s) / 24);
        if (drop) { disc(ctx, x, y, 5.5, F.fact(WATER), alpha(PAL.ink, 0.45), a); hits.push({ x, y, r: 10, name: 'water carried up with the sulfur' }); }
        else { const r = 4.5 + 4.5 * clamp01(rise / L1) + 2 * rnd(i, side); disc(ctx, x, y, r, PAL.panel, alpha(PAL.ink, 0.6), a); hits.push({ x, y, r: r + 4, name: 'an air bubble' }); }
      }
    });

    /* the innermost pipe, drawn over the chamber it passes through, and the air moving down it */
    tube(ctx, [[W + 10, YAIR], [CX, YAIR], [CX, YI]], RI, 54, [[gas]]);
    if (air) for (let i = 0, N = Math.round(AIRP.L / 52); i < N; i++) {
      const s = frac(i / N + (t * 3) / T) * AIRP.L, [x, y, ang] = at(AIRP, s);
      chevron(ctx, x, y, ang, alpha(PAL.ink, 0.55), clamp01((AIRP.L - s) / 30));
    }
    /* the water moving down and out into the deposit */
    WAT.forEach((p) => {
      const N = Math.round(p.L / 56);
      for (let i = 0; i < N; i++) {
        const s = frac(i / N + (t * 2) / T) * p.L, [x, y, ang] = at(p, s);
        chevron(ctx, x, y, ang, mark, clamp01(s / 20) * clamp01((p.L - s) / 44));
      }
    });

    /* the walls: the outer casing heavy as in the book, the chamber, the water inlet */
    const wl = (x1, y1, x2, y2, w = 6) => { ctx.save(); ctx.lineCap = 'square'; line(ctx, x1, y1, x2, y2, wall(), w); ctx.restore(); };
    wl(CX - RO, YCAP, CX - RO, YO, 10); wl(CX + RO, YWIN + PH, CX + RO, YO, 10); wl(CX + RO, YCAP, CX + RO, YWIN - PH, 10);
    wl(CX - RO, YCAP, CX - RM, YCAP); wl(CX + RM, YCAP, CX + RO, YCAP);
    wl(CX + RO, YWIN - PH, W, YWIN - PH); wl(CX + RO, YWIN + PH, W, YWIN + PH);
    wl(CX - RM, YCH[1], CX - RM, YM); wl(CX + RM, YCH[1], CX + RM, YM);
    wl(CX - CW, YCH[0], CX - RI - 6, YCH[0]); wl(CX + RI + 6, YCH[0], CX + CW, YCH[0]); wl(CX + CW, YCH[0], CX + CW, YCH[1]);
    wl(CX - CW, YCH[1], CX - RM, YCH[1]); wl(CX + RM, YCH[1], CX + CW, YCH[1]);
    wl(CX - CW, YCH[0], CX - CW, YOUT - PH); wl(CX - CW, YOUT + PH, CX - CW, YCH[1]);

    hits.push(
      { x: CX - XW, y: 600, r: 30, name: 'outermost pipe: superheated water going down' }, { x: CX + XW, y: 600, r: 30, name: 'outermost pipe: superheated water going down' },
      { x: 1150, y: YWIN, r: 30, name: 'superheated water: 10 atm keeps it liquid above 100 °C' },
      { x: CX, y: 500, r: 24, name: 'innermost pipe: compressed air going down' }, { x: 1150, y: YAIR, r: 30, name: 'compressed air' },
      { x: CX - XA, y: 660, r: 26, name: air ? 'middle pipe: the mixture rising' : 'middle pipe: the column stands here without air' }, { x: CX + XA, y: 660, r: 26, name: air ? 'middle pipe: the mixture rising' : 'middle pipe: the column stands here without air' },
      { x: 440, y: YOUT, r: 30, name: 'outlet pipe to the settling vat' }, { x: 150, y: 524, r: 60, name: 'soil' }, { x: 150, y: 760, r: 80, name: 'solid sulfur deposit' });
    if (hw > 3) hits.push({ x: 150, y: VAT.b - hs - hw / 2, r: 16, name: 'water' }, { x: 320, y: VAT.b - hs - hw / 2, r: 16, name: 'water' });
    if (hs > 6) hits.push({ x: 150, y: VAT.b - hs / 2, r: 20, name: 'sulfur settling out, 99.5% to 99.9% pure' }, { x: 320, y: VAT.b - hs / 2, r: 20, name: 'sulfur settling out, 99.5% to 99.9% pure' });
    if (R > 40) hits.push({ x: CX - R * 0.55, y: POOL.y + 6, r: 30, name: 'liquid sulfur' }, { x: CX + R * 0.55, y: POOL.y + 6, r: 30, name: 'liquid sulfur' });

    /* labels */
    F.label(ctx, 'compressed air', 1200, YAIR - RI - 6, { side: 'above', gap: 22, size: 22 });
    F.label(ctx, 'superheated water', 1200, YWIN - PH - 6, { side: 'above', gap: 22, size: 22 });
    F.rich(ctx, [[`${Tv.toFixed(0)} °C`, C('temperature')], ', ', ['10 atm', C('pressure')]], 1200, YWIN + PH + 30, { size: 22, align: 'center' });
    if (air) F.label(ctx, hot && q > 0 ? 'sulfur, water, and air' : 'water and air', (XS + CX - CW) / 2 + 20, YOUT - PH - 6, { side: 'above', gap: 22, size: 22 });
    F.label(ctx, 'settling vat', VAT.r + 4, 380, { side: 'right', gap: 22, size: 22 });
    text(ctx, 'soil', 1230, (GROUND + DEPOSIT) / 2, PAL.ink, { size: 22, weight: 600, align: 'center', bg: PAL.panel });
    text(ctx, 'solid sulfur deposit', 1230, DEPOSIT + 66, PAL.ink, { size: 22, weight: 600, align: 'center', bg: PAL.panel });
    if (R > 1) F.faded(ctx, clamp01((R - 50) / 60), [0, 0], () => F.label(ctx, 'liquid sulfur', CX + 0.72 * R, POOL.y + 26, { side: 'right', gap: 1150 - CX - 0.72 * R, size: 22 }));

    topline(ctx, !hot ? (Tv === MP ? 'At 113 °C the water only reaches the melting point of sulfur, so none melts.' : `Water at ${Tv.toFixed(0)} °C leaves the sulfur solid${air ? ', so the air lifts only water' : ''}.`)
      : air ? `Water at ${Tv.toFixed(0)} °C melts the sulfur, and the air bubbles lift it to the surface.`
      : 'The sulfur melts, but liquid sulfur is denser than water and stops partway up without air.');
    const rel = Tv > MP ? '>' : Tv === MP ? '=' : '<';
    ro.set(`\\kT = \\mk{tv}{${Tv.toFixed(0)}\\ ^\\circ\\text{C}} \\mk{rel}{${rel}} \\mk{mp}{${hue('temperature', `${MP}\\ ^\\circ\\text{C}`)}}\\text{, the melting point of sulfur}`, undefined, { form: rel });
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();
};
