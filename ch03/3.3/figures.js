/* Figures for section 3.3 Molarity. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['3.3'] = function (root, F) {
const { tex, C, PAL, alpha, ctl, register, begin, line, arrow, text, topline } = F;
const sim = (id, H) => F.sim(root, id, H);

const TAU = 2 * Math.PI;
const rnd = (i) => { const s = Math.sin(i * 12.9898 + 78.233) * 43758.5453; return s - Math.floor(s); };
const sig3 = (x) => { const s = Math.abs(x) >= 1000 ? String(Math.round(x)) : x.toPrecision(3); return s.includes('e') ? String(Number(s)) : s; };
/* water, and copper nitrate dissolved in it: the colours of the liquids are physical facts, the same in both themes */
const WATER = '#8fc6e8';
const CU_NITRATE = '#1f6fc5';

function disc(ctx, x, y, r, sym) {
  ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fillStyle = F.el(sym); ctx.fill();
  ctx.lineWidth = 1.2; ctx.strokeStyle = alpha(PAL.ink, 0.45); ctx.stroke(); ctx.restore();
}
/* one particle of a solute: its two characteristic elements side by side */
function glyph(ctx, x, y, pair, r = 6) { disc(ctx, x - r * 0.8, y, r, pair[0]); disc(ctx, x + r * 0.8, y, r, pair[1]); }
/* an open vessel: walls and floor from x1 to x2 between the rim and the floor, with a lip at the rim */
function vessel(ctx, x1, x2, top, bot) {
  ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x1, top); ctx.lineTo(x1, bot); ctx.lineTo(x2, bot); ctx.lineTo(x2, top); ctx.stroke();
  ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x1 - 12, top); ctx.lineTo(x1, top); ctx.moveTo(x2, top); ctx.lineTo(x2 + 12, top); ctx.stroke(); ctx.restore();
}
function liquid(ctx, x1, x2, top, bot, color, a) {
  ctx.save(); ctx.fillStyle = color; ctx.globalAlpha = a; ctx.fillRect(x1 + 2, top, x2 - x1 - 4, bot - top - 2); ctx.restore();
  line(ctx, x1 + 2, top, x2 - 2, top, alpha(PAL.ink, 0.5), 2);
}
/* particles scattered through a column of liquid, particle i always at the same fraction of the column */
function scatter(n, x1, x2, top, bot, pad = 10) {
  const out = [];
  for (let i = 0; i < n; i++) out.push([x1 + pad + rnd(i * 3 + 1) * (x2 - x1 - 2 * pad), bot - pad - rnd(i * 3 + 2) * Math.max(0, bot - top - 2 * pad)]);
  return out;
}

/* =====================================================================
   SIM: molarity from a weighed solute. A balance reads the mass of the
   solute, the molar mass turns it into moles, and the beaker holds the
   volume of solution it is dissolved in; the particles in the beaker, one
   for each 0.04 mol, thin out as the volume grows. Still: nothing in the
   definition has a clock. Flat: the lesson is the relation of three
   quantities, and the particles are counted more easily in a flat beaker.
===================================================================== */
(function () {
  const d = sim('sim-molarity', 540);
  /* the solutes of Examples 3.14 to 3.18 and their Check Your Learning, each with the example's mass and volume */
  const SOLUTES = [
    { name: 'sucrose', f: 'C₁₂H₂₂O₁₁', mm: 342.30, pair: ['C', 'O'], m: 45.5, V: 0.355 },
    { name: 'acetic acid', f: 'CH₃CO₂H', mm: 60.052, pair: ['C', 'O'], m: 25.2, V: 0.500 },
    { name: 'sodium chloride', f: 'NaCl', mm: 58.44, pair: ['Na', 'Cl'], m: 77.4, V: 0.250 },
    { name: 'cobalt chloride', f: 'CoCl₂', mm: 128.9, pair: ['Co', 'Cl'], m: 6.52, V: 0.075 },
    { name: 'calcium chloride', f: 'CaCl₂', mm: 110.98, pair: ['Ca', 'Cl'], m: 5.55, V: 0.250 },
    { name: 'potassium bromide', f: 'KBr', mm: 119.00, pair: ['K', 'Br'], m: 66.0, V: 0.370 },
  ];
  const S = F.select(d.controls, { label: '\\text{solute}', aria: 'the solute', value: '1', options: SOLUTES.map((s, i) => ({ value: String(i), label: s.name })),
    onInput: () => { const s = SOLUTES[+S.value]; m.set(s.m); V.set(s.V); } });
  const m = ctl(d.controls, { label: '\\km', cls: 'mass', min: 0.5, max: 100, step: 0.01, value: 25.2, unit: 'g', dec: 2, aria: 'mass of solute' });
  const V = ctl(d.controls, { label: '\\kV', cls: 'volume', min: 0.05, max: 1, step: 0.005, value: 0.5, unit: 'L', dec: 3, aria: 'volume of solution',
    specials: [{ at: 1, label: '1 L' }] });
  const PER = 0.04;
  /* the beaker holds 1.000 L at its top mark, 300 units above its floor */
  const BX1 = 860, BX2 = 1200, BOT = 470, PERL = 300;
  let hits = []; F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c); hits = [];
    const s = SOLUTES[+S.value], mass = m.v, vol = V.v, n = mass / s.mm, M = n / vol;
    topline(ctx, `${sig3(mass)} g of ${s.name} is ${sig3(n)} mol, and dissolved to make ${sig3(vol)} L of solution it is ${sig3(M)} M.`);
    /* the balance and the solute weighed on it */
    const bx = 250, by = 380;
    ctx.save(); ctx.fillStyle = PAL.soft; ctx.strokeStyle = PAL.muted; ctx.lineWidth = 3;
    ctx.fillRect(bx - 130, by, 260, 14); ctx.strokeRect(bx - 130, by, 260, 14);
    ctx.fillRect(bx - 100, by + 14, 200, 62); ctx.strokeRect(bx - 100, by + 14, 200, 62);
    const hgt = 18 + 60 * Math.cbrt(mass / 100), wid = 60 + 80 * Math.cbrt(mass / 100);
    ctx.beginPath(); ctx.moveTo(bx - wid, by); ctx.quadraticCurveTo(bx, by - hgt * 2, bx + wid, by); ctx.closePath();
    ctx.fillStyle = alpha(PAL.ink, 0.12); ctx.fill(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2; ctx.stroke(); ctx.restore();
    text(ctx, `${mass.toFixed(2)} g`, bx, by + 46, C('mass'), { size: 26, weight: 600, align: 'center' });
    text(ctx, `${s.name}, ${s.f}`, bx, by - hgt - 26, PAL.ink, { size: 20, align: 'center' });
    hits.push({ x: bx, y: by - hgt / 2, r: wid * 0.6, name: `${sig3(mass)} g of ${s.name}, ${s.f}, on the balance` });
    hits.push({ x: bx, y: by + 45, r: 60, name: 'a balance reading the mass of solute' });
    /* the step from grams to moles */
    arrow(ctx, 430, 300, 790, 300, PAL.ink, 4);
    text(ctx, `÷ ${s.mm} g/mol`, 610, 272, C('mass'), { size: 22, weight: 600, align: 'center' });
    text(ctx, `${sig3(n)} mol`, 610, 330, C('amount'), { size: 24, weight: 600, align: 'center' });
    text(ctx, 'dissolved in water', 610, 362, PAL.muted, { size: 17, align: 'center' });
    /* the beaker, its marks every 0.1 L and the solution in it */
    const top = BOT - PERL * vol;
    liquid(ctx, BX1, BX2, top, BOT, WATER, 0.35);
    for (let k = 1; k <= 10; k++) {
      const y = BOT - PERL * k / 10; line(ctx, BX1, y, BX1 + (k % 5 ? 14 : 24), y, PAL.muted, 2);
      if (k % 2 === 0) text(ctx, `${(k / 10).toFixed(1)}`, BX1 - 14, y, PAL.muted, { size: 17, align: 'right' });
    }
    text(ctx, 'L', BX1 - 14, BOT - PERL - 30, PAL.muted, { size: 17, align: 'right' });
    const count = Math.round(n / PER);
    scatter(count, BX1, BX2, top, BOT, 14).forEach(([x, y]) => { glyph(ctx, x, y, s.pair); hits.push({ x, y, r: 12, name: `${s.name}, ${s.f}, one particle for each 0.04 mol` }); });
    vessel(ctx, BX1, BX2, BOT - PERL - 20, BOT);
    text(ctx, `${sig3(vol)} L`, BX2 + 20, top, C('volume'), { size: 22, weight: 600, bg: PAL.panel });
    hits.push({ x: (BX1 + BX2) / 2, y: BOT - 20, r: 30, name: `${sig3(vol)} L of solution` });
    /* the legend: what one particle stands for */
    glyph(ctx, 90, 505, s.pair);
    text(ctx, `one particle in the beaker stands for 0.04 mol of ${s.name}`, 110, 505, PAL.muted, { size: 17 });
    tex(d.readout, `\\kM=\\frac{\\km/\\kMM}{\\kV}=\\frac{${mass.toFixed(2)}\\ \\text{g}\\,/\\,${s.mm}\\ \\text{g/mol}}{${sig3(vol)}\\ \\text{L}}=\\frac{${sig3(n)}\\ \\text{mol}}{${sig3(vol)}\\ \\text{L}}=${sig3(M)}\\ M`);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 3.16: a stock solution of copper nitrate and the same solute
   after dilution, in two graduated cylinders. The same particles, one
   for each 0.25 mol, spread through the larger volume, and the blue of
   the solution pales with its concentration. Below the stock volume the
   solution has been evaporated. Still: nothing in the relation has a
   clock. Flat, for the same reason as the molarity figure.
===================================================================== */
(function () {
  const d = sim('sim-dilution', 560);
  const C1 = ctl(d.controls, { label: '\\kCone', cls: 'concentration', min: 0.1, max: 6, step: 0.01, value: 5, unit: 'M', dec: 2, aria: 'concentration of the stock solution' });
  const V1 = ctl(d.controls, { label: '\\kVone', cls: 'volume', min: 0.1, max: 2, step: 0.005, value: 0.85, unit: 'L', dec: 3, aria: 'volume of the stock solution' });
  const V2 = ctl(d.controls, { label: '\\kVtwo', cls: 'volume', min: 0.25, max: 4, step: 0.01, value: 1.8, unit: 'L', dec: 2, aria: 'volume after dilution',
    specials: [{ at: () => V1.v, label: 'no change' }] });
  const PER = 0.25;
  /* both cylinders hold 4.00 L at their top mark, 340 units above the floor */
  const BOT = 480, PERL = 85, W = 140, XS = [380, 980];
  let hits = []; F.hover(d.stage, () => hits);
  function cylinder(ctx, cx, vol, conc, n, sub, name) {
    const x1 = cx - W / 2, x2 = cx + W / 2, top = BOT - PERL * vol;
    liquid(ctx, x1, x2, top, BOT, CU_NITRATE, Math.min(0.9, 0.1 + 0.8 * conc / 6));
    for (let k = 1; k <= 8; k++) {
      const y = BOT - PERL * k / 2; line(ctx, x1, y, x1 + (k % 2 ? 14 : 26), y, PAL.muted, 2);
      if (k % 2 === 0) text(ctx, `${k / 2}`, x1 - 14, y, PAL.muted, { size: 17, align: 'right' });
    }
    text(ctx, 'L', x1 - 14, BOT - PERL * 4 - 30, PAL.muted, { size: 17, align: 'right' });
    scatter(Math.round(n / PER), x1, x2, top, BOT, 12).forEach(([x, y]) => { disc(ctx, x, y, 7, 'Cu'); hits.push({ x, y, r: 10, name: 'copper nitrate, Cu(NO₃)₂, one particle for each 0.25 mol' }); });
    vessel(ctx, x1, x2, BOT - PERL * 4 - 16, BOT);
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x1 - 30, BOT + 12); ctx.lineTo(x2 + 30, BOT + 12); ctx.stroke(); ctx.restore();
    text(ctx, `V${sub} = ${sig3(vol)} L`, x2 + 18, top, C('volume'), { size: 22, weight: 600, bg: PAL.panel });
    text(ctx, `C${sub} = ${sig3(conc)} M`, cx, BOT + 38, C('concentration'), { size: 22, weight: 600, align: 'center' });
    text(ctx, `n${sub} = ${sig3(n)} mol`, cx, BOT + 66, C('amount'), { size: 20, weight: 600, align: 'center' });
    text(ctx, name, cx + 20, BOT - PERL * 4 - 50, PAL.ink, { size: 20, align: 'center' });
    hits.push({ x: cx, y: BOT - 16, r: 30, name: `${sig3(vol)} L of ${sig3(conc)} M copper nitrate` });
  }
  function draw() {
    const { ctx } = begin(d.c); hits = [];
    const c1 = C1.v, v1 = V1.v, v2 = V2.v, n = c1 * v1, c2 = n / v2;
    const same = Math.abs(v2 - v1) < 1e-9, evap = v2 < v1 && !same;
    topline(ctx, same ? `The volume is unchanged, so the ${sig3(n)} mol of copper nitrate is still ${sig3(c1)} M.`
      : `${sig3(v1)} L of ${sig3(c1)} M copper nitrate ${evap ? 'evaporated' : 'diluted'} to ${sig3(v2)} L is ${sig3(c2)} M; the ${sig3(n)} mol of solute is unchanged.`);
    cylinder(ctx, XS[0], v1, c1, n, '₁', 'the stock solution');
    cylinder(ctx, XS[1], v2, c2, n, '₂', evap ? 'after evaporation' : 'after dilution');
    arrow(ctx, 580, 250, 780, 250, PAL.ink, 4);
    text(ctx, same ? 'no change' : evap ? 'water evaporated' : 'water added', 680, 222, PAL.ink, { size: 20, align: 'center' });
    tex(d.readout, `\\kCone\\kVone=(${sig3(c1)}\\ M)(${sig3(v1)}\\ \\text{L})=${sig3(n)}\\ \\text{mol}=(${sig3(c2)}\\ M)(${sig3(v2)}\\ \\text{L})=\\kCtwo\\kVtwo`);
  }
  register(d.fig, { update: () => {}, draw });
})();
};
