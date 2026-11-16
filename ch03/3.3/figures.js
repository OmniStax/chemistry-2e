/* Figures for section 3.3 Molarity. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['3.3'] = function (root, F) {
const { tex, C, PAL, alpha, ctl, register, begin, line, arrow, text, topline, axes, plot } = F;
const sim = (id, H) => F.sim(root, id, H);
const hue = (type, x) => `\\htmlClass{kv-${type}}{${x}}`;

const TAU = 2 * Math.PI;
const rnd = (i) => { const s = Math.sin(i * 12.9898 + 78.233) * 43758.5453; return s - Math.floor(s); };
const sig3 = (x) => { const s = Math.abs(x) >= 1000 ? String(Math.round(x)) : x.toPrecision(3); return s.includes('e') ? String(Number(s)) : s; };
/* water, and copper nitrate dissolved in it (the blue-green of the photograph of Figure 3.16): the colours of the
   liquids are physical facts, the same in both themes */
const WATER = '#8fc6e8';
const CU_NITRATE = '#2a9aa6';

function disc(ctx, x, y, r, sym) {
  ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fillStyle = F.el(sym); ctx.fill();
  ctx.lineWidth = 1.2; ctx.strokeStyle = alpha(PAL.ink, 0.45); ctx.stroke(); ctx.restore();
}
/* one particle of a solute: its two characteristic elements side by side */
function glyph(ctx, x, y, pair, r = 5.5) { disc(ctx, x - r * 0.8, y, r, pair[0]); disc(ctx, x + r * 0.8, y, r, pair[1]); }
/* n particles spread evenly through the liquid between x1, x2, top and bot: a lattice of the rows that make its cells
   most nearly square while each still holds a particle gw wide and gh high, each particle nudged within its cell by no
   more than the room that leaves, so none lies on another */
function spread(n, x1, x2, top, bot, gw, gh) {
  const out = []; if (n < 1) return out;
  const W = x2 - x1, H = Math.max(bot - top, 1);
  let rows = 1, best = -Infinity;
  for (let r = 1; r <= n; r++) {
    const cw = W / Math.ceil(n / r), ch = H / r, fits = cw >= gw + 1 && ch >= gh + 1;
    const score = fits ? 10 - Math.abs(Math.log(cw / ch)) : Math.min(cw / gw, ch / gh) - 10;
    if (score > best) { best = score; rows = r; }
  }
  const cols = Math.ceil(n / rows), cw = W / cols, ch = H / rows, jx = Math.max(0, (cw - gw) / 2) * 0.8, jy = Math.max(0, (ch - gh) / 2) * 0.8;
  for (let i = 0; i < n; i++) {
    const r = Math.floor(i / cols), inRow = r === rows - 1 ? n - r * cols : cols, c = i - r * cols;
    out.push([x1 + (W * (c + 0.5)) / inRow + (rnd(i * 3 + 1) * 2 - 1) * jx, bot - ch * (r + 0.5) + (rnd(i * 3 + 2) * 2 - 1) * jy]);
  }
  return out;
}

/* =====================================================================
   SIM: molarity from a weighed solute. A balance reads the mass of the
   solute in a dish, the molar mass turns it into moles, and the beaker
   holds the volume of solution it is made up to; the particles in the
   beaker, one for each 0.04 mol, thin out as the volume grows. Still:
   nothing in the definition has a clock. Flat: every particle is seen.
===================================================================== */
(function () {
  const d = sim('sim-molarity', 560);
  /* the solutes of Examples 3.14 to 3.18 and their Check Your Learning, each with the molar mass the book prints, the
     example's mass and volume, the density of the pure solute (g/mL, which sizes it in the dish) and the ranges of mass
     and volume that keep the solution below what dissolves (sucrose 2.6 M, NaCl 5.4 M, CoCl₂ 3.8 M, CaCl₂ 5.5 M,
     KBr 4.5 M; pure acetic acid is 17.4 M) */
  const SOLUTES = [
    { name: 'sucrose', f: 'C₁₂H₂₂O₁₁', mm: 342.30, mmS: '342.30', rho: 1.59, pair: ['C', 'O'], m: 45.53, V: 0.355, mMax: 80, vMin: 0.1 },
    { name: 'acetic acid', f: 'CH₃CO₂H', mm: 60.052, rho: 1.05, liquid: true, pair: ['C', 'O'], m: 25.2, V: 0.500, mMax: 45, vMin: 0.1 },
    { name: 'sodium chloride', f: 'NaCl', mm: 58.44, rho: 2.17, pair: ['Na', 'Cl'], m: 77.4, V: 0.250, mMax: 78, vMin: 0.25 },
    { name: 'cobalt chloride', f: 'CoCl₂', mm: 128.9, rho: 3.36, pair: ['Co', 'Cl'], m: 6.52, V: 0.075, mMax: 20, vMin: 0.075 },
    { name: 'calcium chloride', f: 'CaCl₂', mm: 110.98, rho: 2.15, pair: ['Ca', 'Cl'], m: 5.55, V: 0.250, mMax: 25, vMin: 0.1 },
    { name: 'potassium bromide', f: 'KBr', mm: 119.00, mmS: '119.00', rho: 2.75, pair: ['K', 'Br'], m: 66.0, V: 0.370, mMax: 75, vMin: 0.15 },
  ];
  const S = F.select(d.controls, { label: '\\text{solute}', aria: 'the solute', value: '1', options: SOLUTES.map((s, i) => ({ value: String(i), label: s.name })),
    onInput: (v) => { const s = SOLUTES[+v]; m.range({ min: 0.5, max: s.mMax, step: 0.01, value: s.m, unit: 'g', dec: 2 }); V.range({ min: s.vMin, max: 1, step: 0.005, value: s.V, unit: 'L', dec: 3 }); } });
  const m = ctl(d.controls, { label: '\\km', cls: 'mass', min: 0.5, max: 45, step: 0.01, value: 25.2, unit: 'g', dec: 2, aria: 'mass of solute' });
  const V = ctl(d.controls, { label: '\\kV', cls: 'volume', min: 0.1, max: 1, step: 0.005, value: 0.5, unit: 'L', dec: 3, aria: 'volume of solution',
    specials: [{ at: 1, label: '1 L' }] });
  const PER = 0.04;
  /* the bench; the balance; the beaker, which holds 1.000 L at its top mark, 300 units above its floor. One milliliter
     is the same area on the canvas in the dish as in the beaker, so the solute is drawn at its true size beside it */
  const BENCH = 520, BX = 290, PAN = 384, BL = 800, BR = 1160, FLOOR = 514, PERL = 300, RIM = FLOOR - PERL - 28, MLA = ((BR - BL) * PERL) / 1000;
  let hits = []; F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c); hits = [];
    const s = SOLUTES[+S.value], mass = m.v, vol = V.v, n = mass / s.mm, M = n / vol;
    const cm = C('mass'), cn = C('amount'), cv = C('volume'), rb = F.ref('balance'), rk = F.ref('beaker');
    topline(ctx, `Each liter of this solution holds ${sig3(M)} mol of ${s.name}.`);
    line(ctx, 60, BENCH, 1340, BENCH, PAL.rule, 2);
    /* the balance: a pan on a stem over a body with a display */
    ctx.save(); ctx.fillStyle = PAL.soft; ctx.strokeStyle = rb; ctx.lineWidth = 3; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.roundRect(BX - 190, PAN + 30, 380, BENCH - PAN - 30, [14, 14, 4, 4]); ctx.fill(); ctx.stroke();
    ctx.fillRect(BX - 16, PAN + 10, 32, 20); ctx.strokeRect(BX - 16, PAN + 10, 32, 20);
    ctx.beginPath(); ctx.roundRect(BX - 170, PAN, 340, 10, 4); ctx.fill(); ctx.stroke();
    ctx.fillStyle = PAL.panel; ctx.strokeStyle = cm; ctx.fillRect(BX - 110, PAN + 56, 220, 54); ctx.strokeRect(BX - 110, PAN + 56, 220, 54); ctx.restore();
    text(ctx, `${mass.toFixed(2)} g`, BX, PAN + 83, cm, { size: 26, weight: 600, align: 'center' });
    hits.push({ x: BX, y: PAN + 83, r: 90, name: 'the balance, reading the mass of solute in the dish' });
    /* the solute in a glass dish on the pan: a mound of a solid, a level of a liquid, at the size its mass and density give */
    const base = PAN - 4, area = (MLA * mass) / s.rho;
    ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.16); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2;
    if (s.liquid) { const h = area / 244; ctx.fillRect(BX - 122, base - h, 244, h); ctx.beginPath(); ctx.moveTo(BX - 122, base - h); ctx.lineTo(BX + 122, base - h); ctx.stroke(); }
    else { const w = Math.sqrt(area / 0.267), h = 0.4 * w; ctx.beginPath(); ctx.moveTo(BX - w / 2, base); ctx.quadraticCurveTo(BX, base - 2 * h, BX + w / 2, base); ctx.closePath(); ctx.fill(); ctx.stroke(); }
    ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2.5; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(BX - 136, base - 88); ctx.lineTo(BX - 124, base); ctx.lineTo(BX + 124, base); ctx.lineTo(BX + 136, base - 88); ctx.stroke(); ctx.restore();
    text(ctx, `${s.name}, ${s.f}`, BX, base - 114, PAL.ink, { size: 20, align: 'center' });
    hits.push({ x: BX, y: base - 36, r: 90, name: `${sig3(mass)} g of ${s.name}, ${s.f}, ${s.liquid ? 'a liquid' : 'a solid'}, in a dish` });
    /* from the dish to the beaker: the mass over the molar mass is the moles that go in */
    const P0 = [BX + 150, base - 94], P1 = [650, 84], P2 = [BL + 70, RIM + 16], bz = (t, k) => (1 - t) * (1 - t) * P0[k] + 2 * t * (1 - t) * P1[k] + t * t * P2[k];
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(P0[0], P0[1]);
    for (let i = 1; i <= 46; i++) ctx.lineTo(bz(i / 50, 0), bz(i / 50, 1));
    ctx.stroke(); ctx.restore();
    arrow(ctx, bz(0.92, 0), bz(0.92, 1), P2[0], P2[1], PAL.ink, 4);
    F.rich(ctx, ['÷ ', [`${s.mmS || s.mm} g/mol`, cm]], bz(0.5, 0), bz(0.5, 1) - 34, { size: 22, align: 'center' });
    text(ctx, `${sig3(n)} mol`, bz(0.5, 0), bz(0.5, 1) + 36, cn, { size: 24, weight: 600, align: 'center' });
    /* the beaker: the solution, the particles in it, the glass and its marks every 0.1 L */
    const top = FLOOR - PERL * vol;
    ctx.save(); ctx.fillStyle = F.fact(WATER); ctx.globalAlpha *= 0.35;
    ctx.beginPath(); ctx.moveTo(BL, top); ctx.lineTo(BL, FLOOR - 14); ctx.quadraticCurveTo(BL, FLOOR, BL + 14, FLOOR); ctx.lineTo(BR - 14, FLOOR); ctx.quadraticCurveTo(BR, FLOOR, BR, FLOOR - 14); ctx.lineTo(BR, top); ctx.closePath(); ctx.fill(); ctx.restore();
    spread(Math.round(n / PER), BL + 34, BR - 12, top + 3, FLOOR - 3, 20, 11).forEach(([x, y]) => { glyph(ctx, x, y, s.pair); hits.push({ x, y, r: 11, name: `0.04 mol of ${s.name}, ${s.f}` }); });
    for (let k = 1; k <= 10; k++) {
      const y = FLOOR - (PERL * k) / 10; line(ctx, BL, y, BL + (k % 5 ? 16 : 28), y, PAL.muted, 2);
      if (k % 2 === 0) text(ctx, k === 10 ? '1.0 L' : (k / 10).toFixed(1), BL - 14, y, PAL.muted, { size: 17, align: 'right' });
    }
    ctx.save(); ctx.strokeStyle = rk; ctx.lineWidth = 3.5; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(BL - 20, RIM - 8); ctx.lineTo(BL, RIM + 10); ctx.lineTo(BL, FLOOR - 14); ctx.quadraticCurveTo(BL, FLOOR, BL + 14, FLOOR); ctx.lineTo(BR - 14, FLOOR); ctx.quadraticCurveTo(BR, FLOOR, BR, FLOOR - 14); ctx.lineTo(BR, RIM + 4); ctx.lineTo(BR + 8, RIM - 6); ctx.stroke(); ctx.restore();
    line(ctx, BL + 2, top, BR - 2, top, cv, 3);
    line(ctx, BR + 8, top, BR + 60, top, cv, 2, [4, 8]);
    F.rich(ctx, [[`${sig3(vol)} L`, cv], ' of solution'], BR + 16, top - 20, { size: 20 });
    hits.push({ x: (BL + BR) / 2, y: top, r: 16, name: `the surface of ${sig3(vol)} L of solution` });
    hits.push({ x: BR, y: RIM + 40, r: 30, name: 'the beaker' });
    /* the key: what one particle stands for */
    F.legend(ctx, { l: 484, r: 760, t: 406, b: 442 }, [{ s: `0.04 mol of ${s.f}`, draw: (c, x, y) => glyph(c, x, y, s.pair) }], { corner: 'bl', panel: false });
    const vT = hue('volume', `${sig3(vol)}\\ \\text{L}`);
    tex(d.readout, `\\kM=\\frac{\\km/\\kMM}{\\kV}=\\frac{${hue('mass', `${mass.toFixed(2)}\\ \\text{g}`)}\\,/\\,${hue('mass', `${s.mmS || s.mm}\\ \\text{g/mol}`)}}{${vT}}=\\frac{${hue('amount', `${sig3(n)}\\ \\text{mol}`)}}{${vT}}=${hue('concentration', `${sig3(M)}\\ \\text{M}`)}`);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 3.16: a stock solution of copper nitrate and the same solute
   after dilution, in two graduated cylinders. The same particles, one
   for each 0.25 mol, spread through the larger volume, and the colour
   of the solution pales with its concentration. Beside them, C against
   V: both solutions lie on the curve C = n/V, and the rectangle under
   each point has the area C × V, the moles. Dilution only: the second
   volume never falls below the first. Still: nothing in the relation
   has a clock. Flat: every particle is seen.
===================================================================== */
(function () {
  const d = sim('sim-dilution', 590);
  const C1 = ctl(d.controls, { label: '\\kCone', cls: 'concentration', min: 0.1, max: 5, step: 0.01, value: 5, unit: 'M', dec: 2, aria: 'concentration of the stock solution' });
  const V1 = ctl(d.controls, { label: '\\kVone', cls: 'volume', min: 0.1, max: 1.25, step: 0.005, value: 0.85, unit: 'L', dec: 3, aria: 'volume of the stock solution' });
  const V2 = ctl(d.controls, { label: '\\kVtwo', cls: 'volume', min: 0.1, max: 2.5, step: 0.005, value: 1.8, unit: 'L', dec: 3, aria: 'volume after dilution',
    specials: [{ at: () => V1.v, label: 'no water added' }] });
  const PER = 0.25;
  /* both cylinders hold 2.50 L at their top mark, 310 units above the floor, so Example 3.19 stands in them as the
     photograph's solutions stand in theirs; the graph runs to the sliders' maxima, 2.5 L and 5 M */
  const BENCH = 522, FLOOR = 504, PERL = 124, CW = 110, RIM = FLOOR - PERL * 2.5 - 26, XS = [170, 600];
  const box = { l: 950, r: 1350, t: 190, b: 460 };
  let hits = []; F.hover(d.stage, () => hits);
  function cylinder(ctx, cx, vol, conc, n, sub, name, rc) {
    const x1 = cx - CW / 2, x2 = cx + CW / 2, top = FLOOR - PERL * vol;
    ctx.save(); ctx.fillStyle = F.fact(CU_NITRATE); ctx.globalAlpha *= 0.12 + (0.78 * conc) / 5;
    ctx.beginPath(); ctx.moveTo(x1, top); ctx.lineTo(x1, FLOOR - 8); ctx.quadraticCurveTo(x1, FLOOR, x1 + 8, FLOOR); ctx.lineTo(x2 - 8, FLOOR); ctx.quadraticCurveTo(x2, FLOOR, x2, FLOOR - 8); ctx.lineTo(x2, top); ctx.closePath(); ctx.fill(); ctx.restore();
    spread(Math.round(n / PER), x1 + 30, x2 - 8, top + 4, FLOOR - 3, 13, 13).forEach(([x, y]) => { disc(ctx, x, y, 6, 'Cu'); hits.push({ x, y, r: 9, name: '0.25 mol of copper nitrate, Cu(NO₃)₂' }); });
    for (let k = 1; k <= 25; k++) {
      const y = FLOOR - (PERL * k) / 10, big = k % 5 === 0; line(ctx, x1, y, x1 + (big ? 26 : 13), y, PAL.muted, big ? 2 : 1.3);
      if (big) text(ctx, k === 25 ? '2.5 L' : (k / 10).toFixed(1), x1 - 14, y, PAL.muted, { size: 17, align: 'right' });
    }
    /* the glass: walls with a pouring lip, and the foot it stands on */
    ctx.save(); ctx.strokeStyle = rc; ctx.lineWidth = 3; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(x1, RIM); ctx.lineTo(x1, FLOOR - 8); ctx.quadraticCurveTo(x1, FLOOR, x1 + 8, FLOOR); ctx.lineTo(x2 - 8, FLOOR); ctx.quadraticCurveTo(x2, FLOOR, x2, FLOOR - 8); ctx.lineTo(x2, RIM + 8); ctx.lineTo(x2 + 16, RIM - 8); ctx.stroke();
    ctx.fillStyle = PAL.soft; ctx.beginPath(); ctx.moveTo(x1 - 6, FLOOR + 2); ctx.lineTo(x2 + 6, FLOOR + 2); ctx.lineTo(x2 + 42, BENCH); ctx.lineTo(x1 - 42, BENCH); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore();
    /* the surface, a shallow meniscus, and the level carried out to its label */
    ctx.save(); ctx.strokeStyle = C('volume'); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x1 + 2, top - 2); ctx.quadraticCurveTo(cx, top + 3, x2 - 2, top - 2); ctx.stroke(); ctx.restore();
    line(ctx, x2 + 8, top, x2 + 52, top, C('volume'), 2, [4, 8]);
    text(ctx, `V${sub} = ${sig3(vol)} L`, x2 + 28, top - 20, C('volume'), { size: 22, weight: 600 });
    text(ctx, `C${sub} = ${sig3(conc)} M`, cx, BENCH + 30, C('concentration'), { size: 22, weight: 600, align: 'center' });
    text(ctx, name, cx, RIM - 34, rc, { size: 20, align: 'center' });
    hits.push({ x: cx, y: top, r: 14, name: `${sig3(vol)} L of ${sig3(conc)} M copper nitrate, ${sig3(n)} mol` });
  }
  function draw() {
    if (V2.v < V1.v) V2.set(V1.v);
    const { ctx } = begin(d.c); hits = [];
    const c1 = C1.v, v1 = V1.v, v2 = V2.v, n = c1 * v1, c2 = n / v2, fold = v2 / v1, same = fold - 1 < 1e-9;
    const cc = C('concentration'), cv = C('volume'), cn = C('amount'), rs = F.ref('stock'), rd = F.ref('diluted');
    topline(ctx, same ? 'No water has been added, so the solution is still the stock.'
      : `Diluted to ${sig3(fold)} times the volume, the solution has 1/${sig3(fold)} of the stock’s concentration.`);
    line(ctx, 60, BENCH, 800, BENCH, PAL.rule, 2);
    cylinder(ctx, XS[0], v1, c1, n, '₁', 'the stock solution', rs);
    cylinder(ctx, XS[1], v2, c2, n, '₂', 'the diluted solution', rd);
    arrow(ctx, 310, RIM - 34, 460, RIM - 34, PAL.ink, 4);
    text(ctx, same ? 'no water added' : 'water added', 385, RIM - 10, PAL.ink, { size: 20, align: 'center' });
    F.legend(ctx, { l: 238, r: 515, t: 269, b: 305 }, [{ s: '0.25 mol of Cu(NO₃)₂', draw: (c, x, y) => disc(c, x, y, 6, 'Cu') }], { corner: 'bl', panel: false });
    /* C against V: the curve of constant moles, and under each solution's point the rectangle whose area is its moles */
    const ax = axes(ctx, box, [0, 2.5], [0, 5], { xl: 'V (L)', xc: cv, yl: 'C (M)', yc: cc, nx: 5, ny: 5 });
    const rect = (v, c, col, dash) => {
      const x = ax.X(0), y = ax.Y(c), w = ax.X(v) - x, h = ax.Y(0) - y;
      ctx.save(); ctx.fillStyle = alpha(cn, 0.16); ctx.fillRect(x, y, w, h); ctx.strokeStyle = col; ctx.lineWidth = 2.5; ctx.setLineDash(dash); ctx.strokeRect(x, y, w, h); ctx.restore();
    };
    rect(v1, c1, rs, [8, 7]); if (!same) rect(v2, c2, rd, []);
    plot(ctx, ax, (x) => n / x, cc, { w: 4, x: [0.01, 2.5] });
    F.dot(ctx, ax.X(v1), ax.Y(c1), rs, false, 10);
    if (!same) F.dot(ctx, ax.X(v2), ax.Y(c2), rd, true, 9);
    hits.push({ x: ax.X(v1), y: ax.Y(c1), r: 14, name: `the stock solution: ${sig3(c1)} M in ${sig3(v1)} L` });
    if (!same) hits.push({ x: ax.X(v2), y: ax.Y(c2), r: 14, name: `the diluted solution: ${sig3(c2)} M in ${sig3(v2)} L` });
    F.legend(ctx, { l: box.l, r: box.r, t: 96, b: box.t - 14 }, [{ s: 'C = n/V', color: cc }, { kind: 'swatch', color: alpha(cn, 0.3), s: `C × V = ${sig3(n)} mol` }], { corner: 'br', panel: false });
    const cT = (c) => hue('concentration', `${sig3(c)}\\ \\text{M}`), vT = (v) => hue('volume', `${sig3(v)}\\ \\text{L}`);
    tex(d.readout, `\\kCone\\kVone=(${cT(c1)})(${vT(v1)})=${hue('amount', `${sig3(n)}\\ \\text{mol}`)}=(${cT(c2)})(${vT(v2)})=\\kCtwo\\kVtwo`);
  }
  register(d.fig, { update: () => {}, draw });
})();
};
