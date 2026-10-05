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
   FIGURE 18.59: the Frasch process in the book's cutaway, three concentric
   pipes through soil into a sulfur deposit. Moving on a 6 s clock with a
   1.2 s hold: water flows down the outer pipe and air down the inner pipe
   from the start (each path makes whole laps per cycle, so neither jumps);
   the pool of liquid sulfur grows round the foot of the pipes from t = 0,
   and a drop entering the middle pipe at time te is sulfur with a chance
   that grows with the pool at te. The water's temperature T sets the pool's
   final size and the sulfur's share, both zero at or below 113 °C, the
   melting point of rhombic sulfur (18.4).
===================================================================== */
(function () {
  const H = 900, d = F.sim(root, 'sim-frasch', H);
  const SOLID = '#e5c444', MOLTEN = '#d9a63a';     /* rhombic sulfur's yellow; molten sulfur's straw */
  const T = 6, MP = 113, TB = 170;
  const CX = 640;
  const RI = 22, RM = 70, RO = 118, WALL = 6;      /* inner, middle and outer pipe radii */
  const YAIR = 132, YCH = [176, 252], YCAP = 318, YWIN = 352;   /* air inlet; outlet chamber top and bottom; outer pipe's cap; water inlet */
  const GROUND = 470, DEPOSIT = 612, YI = 700, YM = 752, YO = 782;   /* the soil, the deposit, the feet of the three pipes */
  const XIN = CX + 360, XOUT = CX - 360;
  const POOL = { x: CX, y: YO + 6 };

  const cy = F.cycle(() => T, 1.2);
  const temp = F.ctl(d.controls, { label: '\\kT', cls: 'temperature', min: 100, max: 200, step: 1, value: TB, unit: '°C', dec: 0,
    specials: [{ at: MP, label: 'melting point' }], onInput: () => cy.reset() });
  const ro = F.readout(d);
  let hits = [];
  F.hover(d.stage, () => hits);

  const excess = () => (temp.v > MP ? Math.min(1.5, (temp.v - MP) / (TB - MP)) : 0);   /* 1 at the book's 170 °C */
  const poolK = (t) => F.ease.smooth(clamp01(t / 3.2));          /* the pool's growth over the clock, 0 to 1 */
  const poolR = (t) => (temp.v > MP ? (60 + 140 * excess()) * poolK(t) : 0);

  /* the flow paths, as polylines */
  const AIR = [[XIN, YAIR], [CX + 34, YAIR], [CX + 12, YAIR + 8], [CX + 2, YAIR + 30], [CX, YAIR + 60], [CX, YI - 6]];
  const WATER = [
    [[XIN, YWIN], [CX + (RM + RO) / 2, YWIN], [CX + (RM + RO) / 2, YO - 4], [CX + 190, YO + 36]],
    [[CX - (RM + RO) / 2, YCAP + 12], [CX - (RM + RO) / 2, YO - 4], [CX - 190, YO + 36]],
  ];
  const RISE = [
    [[CX - (RI + RM) / 2, YM - 4], [CX - (RI + RM) / 2, YCH[0] + 40], [CX - 120, (YCH[0] + YCH[1]) / 2 - 4], [XOUT, (YCH[0] + YCH[1]) / 2 - 4]],
    [[CX + (RI + RM) / 2, YM - 4], [CX + (RI + RM) / 2, YCH[0] + 34], [CX + 30, YCH[0] + 18], [CX - 30, YCH[0] + 18], [CX - 120, (YCH[0] + YCH[1]) / 2 + 4], [XOUT, (YCH[0] + YCH[1]) / 2 + 4]],
  ];
  const lenOf = (pts) => pts.slice(1).reduce((a, p, i) => a + Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]), 0);
  function along(pts, s) {
    const seg = pts.slice(1).map((p, i) => Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]));
    let r = s * seg.reduce((a, b) => a + b, 0);
    for (let i = 0; i < seg.length; i++) {
      if (r <= seg[i] || i === seg.length - 1) { const k = Math.min(1, r / seg[i]); return [lerp(pts[i][0], pts[i + 1][0], k), lerp(pts[i][1], pts[i + 1][1], k)]; }
      r -= seg[i];
    }
    return pts[pts.length - 1];
  }

  function ball(ctx, x, y, r, c, a = 1) {
    if (a <= 0.01) return;
    ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = c; ctx.strokeStyle = alpha(PAL.ink, 0.5); ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.arc(x, y, r, 0, 2 * Math.PI); ctx.fill(); ctx.stroke(); ctx.restore();
  }
  const water = (ctx, x, y, a = 1) => { ball(ctx, x - 6, y + 4, 3.5, F.el('H'), a); ball(ctx, x + 6, y + 4, 3.5, F.el('H'), a); ball(ctx, x, y, 6, F.el('O'), a); };
  const diatomic = (el) => (ctx, x, y, a = 1) => { ball(ctx, x - 4.5, y, 5.5, F.el(el), a); ball(ctx, x + 4.5, y, 5.5, F.el(el), a); };
  const n2 = diatomic('N'), o2 = diatomic('O');
  const sulfur = (ctx, x, y, a = 1) => ball(ctx, x, y, 7, F.el('S'), a);
  const KIND = { water: [water, 'a water molecule, H₂O'], n2: [n2, 'a nitrogen molecule of the air, N₂'], o2: [o2, 'an oxygen molecule of the air, O₂'], s: [sulfur, 'liquid sulfur'] };

  function rect(ctx, x, y, w, h, fill) { ctx.fillStyle = fill; ctx.fillRect(x, y, w, h); }
  function pipeWall(ctx, x, y1, y2, w = WALL) { rect(ctx, x - w / 2, y1, w, y2 - y1, PAL.ink); }

  function draw() {
    const { ctx, W } = begin(d.c);
    const t = cy.now(), Tv = temp.v, melts = Tv > MP, R = poolR(t);
    const bore = alpha(PAL.ink, 0.04), riserFill = alpha(F.fact(MOLTEN), 0.18 * clamp01(R / 60));
    hits = [];

    /* the ground: soil over the deposit, and the pool of liquid sulfur round the foot of the pipes */
    rect(ctx, 0, GROUND, W, DEPOSIT - GROUND, alpha(PAL.ink, 0.1));
    line(ctx, 0, GROUND, W, GROUND, alpha(PAL.ink, 0.35), 2);
    rect(ctx, 0, DEPOSIT, W, H - DEPOSIT, F.fact(SOLID));
    if (R > 1) {
      const g = ctx.createRadialGradient(POOL.x, POOL.y, 0, POOL.x, POOL.y, R);
      g.addColorStop(0, F.fact(MOLTEN)); g.addColorStop(0.75, alpha(F.fact(MOLTEN), 0.9)); g.addColorStop(1, alpha(F.fact(MOLTEN), 0));
      ctx.save(); ctx.translate(POOL.x, POOL.y); ctx.scale(1, 0.5); ctx.translate(-POOL.x, -POOL.y);
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(POOL.x, POOL.y, R, 0, 2 * Math.PI); ctx.fill(); ctx.restore();
    }

    /* the bores of the three pipes and the outlet chamber */
    rect(ctx, CX - RO, YCAP, 2 * RO, YO - YCAP, bore);
    rect(ctx, CX - RM, YCH[1], 2 * RM, YM - YCH[1], riserFill);
    rect(ctx, CX - RM - 80, YCH[0], 2 * RM + 160, YCH[1] - YCH[0], bore);
    rect(ctx, XOUT, (YCH[0] + YCH[1]) / 2 - 22, CX - RM - 80 - XOUT, 44, bore);
    rect(ctx, CX + RO, YWIN - 22, XIN - CX - RO, 44, bore);
    rect(ctx, CX - RI, YAIR - 22, XIN - CX + RI, 44, bore);

    /* the rising mixture: a drop entering the middle pipe at te is sulfur with a chance that grows with the pool then */
    const NR = 22, LAPS_R = 2;
    RISE.forEach((path, side) => {
      for (let i = 0; i < NR; i++) {
        const s = frac(i / NR + t * LAPS_R / T + side * 0.5 / NR), te = t - s * T / LAPS_R;
        const lap = Math.floor(i / NR + t * LAPS_R / T + side * 0.5 / NR);
        const share = melts && te > 0 ? 0.6 * clamp01(poolR(te) / 200) : 0;
        const u = rnd(i + 40 * side, lap), kind = u < share ? 's' : rnd(i + 40 * side, lap + 99) < 0.5 ? 'water' : rnd(i, lap + 7) < 0.8 ? 'n2' : 'o2';
        const [x, y] = along(path, s), a = 1 - clamp01((s - 0.93) / 0.07);
        KIND[kind][0](ctx, x, y, a); hits.push({ x, y, r: 10, name: KIND[kind][1] });
      }
    });
    /* liquid sulfur drawn into the mouth of the middle pipe from the pool */
    if (R > 60) for (let i = 0; i < 6; i++) {
      const u = frac(t * 0.6 + i / 6), side = i % 2 ? 1 : -1, x0 = CX + side * Math.min(R * 0.8, 170), y0 = POOL.y + 18;
      const x = lerp(x0, CX + side * (RI + RM) / 2, u), y = lerp(y0, YM + 4, u);
      sulfur(ctx, x, y, clamp01(u / 0.15) * clamp01((1 - u) / 0.15)); hits.push({ x, y, r: 10, name: 'liquid sulfur' });
    }

    /* water down the outer pipe, two laps per cycle, fading into the deposit at the foot */
    WATER.forEach((path, side) => {
      const L = lenOf(path), N = Math.round(L / 46);
      for (let i = 0; i < N; i++) {
        const s = frac(i / N + t * 2 / T), [x, y] = along(path, s);
        const a = clamp01(s / 0.03) * (1 - clamp01((y - YO) / 36));
        water(ctx, x, y, a); hits.push({ x, y, r: 10, name: KIND.water[1] });
      }
    });
    /* air down the inner pipe, three laps per cycle, leaving its foot into the middle pipe */
    { const L = lenOf(AIR), N = Math.round(L / 40);
      for (let i = 0; i < N; i++) {
        const s = frac(i / N + t * 3 / T), [x, y] = along(AIR, s), kind = i % 5 === 2 ? 'o2' : 'n2';
        KIND[kind][0](ctx, x, y, clamp01(s / 0.03) * clamp01((1 - s) / 0.04)); hits.push({ x, y, r: 10, name: KIND[kind][1] });
      }
    }

    /* the pipe walls: the outer casing heavy as in the book, the outlet chamber and the two inlets */
    pipeWall(ctx, CX - RO, YCAP, YO, 10); pipeWall(ctx, CX + RO, YWIN + 22, YO, 10);
    line(ctx, CX - RO, YCAP, CX - RM, YCAP, PAL.ink, WALL); line(ctx, CX + RM, YCAP, CX + RO, YCAP, PAL.ink, WALL);
    pipeWall(ctx, CX + RO, YCAP, YWIN - 22, 10);
    line(ctx, CX + RO, YWIN - 22, XIN, YWIN - 22, PAL.ink, WALL); line(ctx, CX + RO, YWIN + 22, XIN, YWIN + 22, PAL.ink, WALL);
    pipeWall(ctx, CX - RM, YCH[1], YM); pipeWall(ctx, CX + RM, YCH[1], YM);
    const yo = (YCH[0] + YCH[1]) / 2;
    line(ctx, CX - RM - 80, YCH[0], CX - RI, YCH[0], PAL.ink, WALL); line(ctx, CX + RI, YCH[0], CX + RM + 80, YCH[0], PAL.ink, WALL);
    line(ctx, CX + RM + 80, YCH[0], CX + RM + 80, YCH[1], PAL.ink, WALL);
    line(ctx, CX - RM - 80, YCH[1], CX - RM, YCH[1], PAL.ink, WALL); line(ctx, CX + RM, YCH[1], CX + RM + 80, YCH[1], PAL.ink, WALL);
    line(ctx, CX - RM - 80, YCH[0], CX - RM - 80, yo - 22, PAL.ink, WALL); line(ctx, CX - RM - 80, yo + 22, CX - RM - 80, YCH[1], PAL.ink, WALL);
    line(ctx, XOUT, yo - 22, CX - RM - 80, yo - 22, PAL.ink, WALL); line(ctx, XOUT, yo + 22, CX - RM - 80, yo + 22, PAL.ink, WALL);
    /* the inner pipe, drawn over the chamber so the rising drops pass behind it */
    rect(ctx, CX - RI, YCH[0] - 3, 2 * RI, YCH[1] - YCH[0] + 6, PAL.panel); rect(ctx, CX - RI, YCH[0] - 3, 2 * RI, YCH[1] - YCH[0] + 6, bore);
    { const L = lenOf(AIR), N = Math.round(L / 40);
      for (let i = 0; i < N; i++) {
        const s = frac(i / N + t * 3 / T), [x, y] = along(AIR, s);
        if (y > YCH[0] - 6 && y < YCH[1] + 6) KIND[i % 5 === 2 ? 'o2' : 'n2'][0](ctx, x, y);
      }
    }
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = WALL; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.moveTo(XIN, YAIR - 22); ctx.lineTo(CX + 30, YAIR - 22); ctx.arcTo(CX - RI, YAIR - 22, CX - RI, YAIR + 40, 52); ctx.lineTo(CX - RI, YI); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(XIN, YAIR + 22); ctx.lineTo(CX + RI + 8, YAIR + 22); ctx.arcTo(CX + RI, YAIR + 22, CX + RI, YAIR + 40, 8); ctx.lineTo(CX + RI, YI); ctx.stroke();
    ctx.restore();

    hits.push(
      { x: CX - (RM + RO) / 2, y: 520, r: 26, name: 'outermost pipe: superheated water' }, { x: CX + (RM + RO) / 2, y: 520, r: 26, name: 'outermost pipe: superheated water' },
      { x: CX, y: 420, r: 20, name: 'innermost pipe: compressed air' },
      { x: CX - (RI + RM) / 2, y: 420, r: 22, name: 'middle pipe: sulfur, water, and air rising' }, { x: CX + (RI + RM) / 2, y: 420, r: 22, name: 'middle pipe: sulfur, water, and air rising' },
      { x: 200, y: 540, r: 60, name: 'soil' }, { x: 1150, y: 760, r: 70, name: 'solid sulfur deposit' });
    if (R > 30) hits.push({ x: CX - R * 0.6, y: POOL.y + 10, r: 24, name: 'liquid sulfur' }, { x: CX + R * 0.6, y: POOL.y + 10, r: 24, name: 'liquid sulfur' });

    /* labels on the parts that stay put */
    F.label(ctx, 'compressed air', XIN - 90, YAIR + 22, { side: 'below', gap: 26, size: 20 });
    F.label(ctx, 'superheated water', XIN - 90, YWIN - 22, { side: 'above', gap: 26, size: 20 });
    text(ctx, '10 atm', XIN - 90, YWIN + 50, C('pressure'), { size: 20, weight: 600, align: 'center', bg: PAL.panel });
    text(ctx, 'sulfur, water, and air', XOUT + 10, yo - 50, PAL.ink, { size: 20, weight: 600, bg: PAL.panel });
    text(ctx, 'soil', 90, (GROUND + DEPOSIT) / 2, PAL.ink, { size: 20, weight: 600, bg: PAL.panel });
    text(ctx, 'solid sulfur deposit', 1060, DEPOSIT + 60, PAL.ink, { size: 20, weight: 600, bg: PAL.panel });
    if (R > 1) F.faded(ctx, clamp01((R - 40) / 60), [0, 0], () => F.label(ctx, 'liquid sulfur', CX + 0.6 * R, POOL.y + 12, { side: 'right', gap: 330 - 0.6 * R, size: 20 }));

    /* the moving kinds, once each */
    const items = [['H₂O', (x, y) => water(ctx, x, y)], ['N₂ and O₂ (air)', (x, y) => { n2(ctx, x - 7, y); o2(ctx, x + 13, y); }], ['S', (x, y) => sulfur(ctx, x, y)]];
    items.forEach(([s, mark], i) => { const y = 300 + 40 * i; mark(70, y); text(ctx, s, 100, y, PAL.ink, { size: 17 }); });

    topline(ctx, Tv > MP ? 'Hot water melts the sulfur, and compressed air lifts it up the middle pipe.'
      : Tv === MP ? 'At 113 °C the water only reaches the melting point of sulfur, so none melts yet.'
      : 'Water cooler than the melting point of sulfur leaves the deposit solid, so only water and air rise.');
    const rel = Tv > MP ? '>' : Tv === MP ? '=' : '<';
    ro.set(`\\kT = \\mk{tv}{${Tv.toFixed(0)}\\ ^\\circ\\text{C}} \\mk{rel}{${rel}} \\mk{mp}{${hue('temperature', `${MP}\\ ^\\circ\\text{C}`)}}\\text{, the melting point of sulfur}`, undefined, { form: rel });
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();
};
