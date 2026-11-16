/* Figures for section 9.2 Relating Pressure, Volume, Amount, and Temperature: The Ideal Gas Law. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['9.2'] = function (root, F) {
const { el, fmt, tex, C, PAL, alpha, ctl, cycle, register, begin, line, dot, text, topline, axes, pinned, plot, legend, label, measure } = F;
const sim = (id, H) => F.sim(root, id, H);
function readout(host, main, small) { tex(host, main); if (small) host.appendChild(el('small', null, small)); }

/* ---------- small helpers shared by the figures ---------- */
const TAU = 2 * Math.PI;
const R = 0.08206;                                   /* L atm mol⁻¹ K⁻¹, the value the book uses with atm, L and K */
const RTEX = '0.08206\\ \\text{L atm mol}^{-1}\\ \\text{K}^{-1}';
/* three significant figures, never in exponent form */
const sig3 = (x) => { const s = Math.abs(x).toPrecision(3); return s.includes('e') ? String(Math.round(Number(s))) : s; };
/* a live number wrapped in the hue of its type, for the readouts */
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;
/* ---------- the gases, drawn as molecules in the element palette (rule 7.2) ----------
   Every particle a figure of this section draws is a molecule of a named gas: a single disc for helium and argon, two blue discs
   for nitrogen, two red for oxygen, a black carbon between two red oxygens for carbon dioxide, and so on. Each entry is the
   name, the molar mass in g/mol, and the atoms of one molecule as [element, dx, dy, radius] about its centre in a unit space,
   with a hint of the molecule's shape. A molecule is drawn turned by the angle it travels along, so that a diatomic tumbles. */
const MOLS = {
  'He': { m: 4.003, atoms: [['He', 0, 0, 7]] },
  'H₂': { m: 2.016, atoms: [['H', -5, 0, 5], ['H', 5, 0, 5]] },
  'N₂': { m: 28.01, atoms: [['N', -6, 0, 7], ['N', 6, 0, 7]] },
  'O₂': { m: 32.00, atoms: [['O', -6, 0, 7], ['O', 6, 0, 7]] },
  'NH₃': { m: 17.03, atoms: [['H', -9, 5, 4.5], ['H', 9, 5, 4.5], ['H', 0, -10, 4.5], ['N', 0, 0, 7]] },
  'CH₄': { m: 16.04, atoms: [['H', -9, -8, 4.5], ['H', 9, -8, 4.5], ['H', -9, 8, 4.5], ['H', 9, 8, 4.5], ['C', 0, 0, 7]] },
  'CO₂': { m: 44.01, atoms: [['O', -13, 0, 7], ['O', 13, 0, 7], ['C', 0, 0, 6.5]] },
  'Ar': { m: 39.95, atoms: [['Ar', 0, 0, 8]] },
};
const WORD = { 'He': 'helium', 'H₂': 'hydrogen', 'N₂': 'nitrogen', 'O₂': 'oxygen', 'NH₃': 'ammonia', 'CH₄': 'methane', 'CO₂': 'carbon dioxide', 'Ar': 'argon' };
const molName = (f) => (MOLS[f].atoms.length === 1 ? 'a ' + WORD[f] + ' atom, ' + f : 'a ' + WORD[f] + ' molecule, ' + f);
/* one molecule of the gas f centred on (x, y), scaled by k and turned by a; hydrogen takes an ink outline so that its light disc
   reads on a light page; returns the radius that covers it, for the hover tooltip */
function molecule(ctx, f, x, y, k = 1, a = 0) {
  const c = Math.cos(a), s = Math.sin(a); let reach = 0;
  for (const [elm, dx, dy, rr] of MOLS[f].atoms) {
    const px = x + (dx * c - dy * s) * k, py = y + (dx * s + dy * c) * k;
    ctx.save(); ctx.fillStyle = F.el(elm); ctx.strokeStyle = elm === 'H' ? PAL.ink : alpha(PAL.ink, 0.35); ctx.lineWidth = elm === 'H' ? 1.5 : 1; ctx.beginPath(); ctx.arc(px, py, rr * k, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore();
    reach = Math.max(reach, Math.hypot(dx, dy) * k + rr * k);
  }
  return reach;
}
/* a pressure gauge: a dial centred on (x, y) of radius r, reading `value` on a scale 0..max in the pressure hue, a numeral at every `major` and a
   tick at every `minor`; the needle pegs at the end of the scale */
function gauge(ctx, x, y, r, value, max, unit, major = max / 2, minor = max / 10) {
  const cp = C('pressure'), a0 = 0.75 * Math.PI, a1 = 2.25 * Math.PI, f = Math.min(1, Math.max(0, value / max)), dec = major % 1 ? 1 : 0;
  ctx.save(); ctx.fillStyle = PAL.panel; ctx.strokeStyle = cp; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore();
  for (let i = 0; i <= Math.round(max / minor); i++) {
    const v = i * minor, a = a0 + ((a1 - a0) * v) / max, big = Math.abs(v / major - Math.round(v / major)) < 1e-6, t = big ? 16 : 9;
    line(ctx, x + (r - t) * Math.cos(a), y + (r - t) * Math.sin(a), x + (r - 4) * Math.cos(a), y + (r - 4) * Math.sin(a), cp, big ? 2.5 : 1.5);
    if (big) text(ctx, v ? fmt(v, dec) : '0', x + (r - 31) * Math.cos(a), y + (r - 31) * Math.sin(a), cp, { size: 15, align: 'center' });
  }
  const a = a0 + (a1 - a0) * f;
  ctx.save(); ctx.strokeStyle = cp; ctx.fillStyle = cp; ctx.lineWidth = 3.5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - 10 * Math.cos(a), y - 10 * Math.sin(a)); ctx.lineTo(x + (r - 20) * Math.cos(a), y + (r - 20) * Math.sin(a)); ctx.stroke(); ctx.beginPath(); ctx.arc(x, y, 5, 0, TAU); ctx.fill(); ctx.restore();
  text(ctx, unit, x, y + r * 0.7, cp, { size: 15, align: 'center' });
}
/* air, as the book fills its vessels: four molecules of nitrogen to one of oxygen */
const AIR = (i) => (i % 5 === 4 ? 'O₂' : 'N₂');
/* a gas of molecules on the flat canvas: each keeps a position, a unit heading and the formula of the gas it is; `speed` gives its
   canvas units per second and `inside` puts it back in the vessel, returning the wall's inward normal where it left */
function gas2() {
  const g = { p: [] };
  g.fill = (N, spawn) => { while (g.p.length < N) g.p.push(spawn(g.p.length)); if (g.p.length > N) g.p.length = N; };
  g.step = (dt, speed, inside) => {
    for (const q of g.p) {
      const s = speed(q) * dt; q.x += q.ux * s; q.y += q.uy * s;
      const n = inside(q);
      if (n) { const dd = q.ux * n[0] + q.uy * n[1]; if (dd < 0) { q.ux -= 2 * dd * n[0]; q.uy -= 2 * dd * n[1]; } }
    }
  };
  return g;
}
const heading2 = () => { const a = Math.random() * TAU; return { ux: Math.cos(a), uy: Math.sin(a) }; };
/* the value labels of two states on a rising line: each stands up and to the left of its point, where neither the line nor a drop
   line runs; where the two would overlap, the lower point's is stacked above the other's, or set to its left where that would leave the frame */
function stateLabels(ctx, pts, color, top) {
  const size = 17, h = 44;
  const bs = pts.map((p) => ({ ...p, r: p.x - 12, l: p.x - 12 - measure(ctx, p.s, { size, weight: 600 }) - 14, ly: p.y - 24 }));
  const [up, low] = bs[0].ly <= bs[1].ly ? bs : [bs[1], bs[0]];
  if (low.l < up.r && up.l < low.r && low.ly - up.ly < h) { if (up.ly - 30 > top + 14) low.ly = up.ly - 30; else { low.ly = up.ly; low.r = up.l - 10; } }
  bs.forEach((b) => text(ctx, b.s, b.r - 7, b.ly, color, { size, weight: 600, align: 'right', bg: PAL.panel }));
}

/* =====================================================================
   FIGURE 9.10: a sealed flask of air in a water bath on a hot plate, the
   pressure gauge on its neck, drawn flat as the book draws it. The flask
   is sealed at 1.00 atm with the plate off, at 298 K; the bath then runs
   up to boiling, 373 K, and the gauge reads P = (1.00 atm)(T / 298 K).
   Moving: the molecules travel and quicken as the bath warms, so the
   figure runs continuously and carries the transport without a scrubber.
   From 298 K to 373 K the molecules gain only 12 % in speed, too little
   to see, so the gain over 298 K is drawn four times its size and the
   canvas says so (rule 28.4). The glow of the plate's element is the one
   fact colour (rule 7.1).
===================================================================== */
(function () {
  const H = 730, DY = 30, d = sim('sim-amontons-sphere', H);   /* the apparatus is drawn DY below its own coordinates, under the gauge */
  const T = ctl(d.controls, { label: '\\kT', cls: 'temperature', min: 298, max: 373, step: 1, value: 298, unit: 'K', dec: 0, aria: 'temperature of the water bath in kelvin' });
  const T0 = 298, P0 = 1, EX = 4, GLOW = '#e2532b';          /* sealed at room temperature and one atmosphere; the speed gain drawn EX times; a heating element's glow */
  const CX = 700, B = { x: CX, y: 424, r: 120 }, NW = 24, NTOP = 212, YJ = B.y - Math.sqrt(B.r * B.r - NW * NW);   /* the bulb, the neck's half-width and top, and where they join */
  const BK = { l: 500, r: 900, rim: 250, b: 548 }, WATER = 292;                                                   /* the beaker and the water's surface, above the bulb */
  const TH = { x: 540, top: 168, bulb: 404 }, yT = (t) => 320 - (t - 273) * 1.35;                                 /* the thermometer and its scale */
  const LIM = B.r - 14, g = gas2();
  g.fill(20, (i) => { const a = Math.random() * TAU, rr = Math.sqrt(Math.random()) * LIM; return { x: B.x + rr * Math.cos(a), y: B.y + rr * Math.sin(a), f: AIR(i), ...heading2() }; });
  const inside = (q) => { const dx = q.x - B.x, dy = q.y - B.y, dd = Math.hypot(dx, dy); if (dd < LIM) return null; q.x = B.x + (dx / dd) * LIM; q.y = B.y + (dy / dd) * LIM; return [-dx / dd, -dy / dd]; };
  const drawn = () => 1 + EX * (Math.sqrt(T.v / T0) - 1);
  const cy = cycle(() => Infinity, 0);
  let clock = 0, hits = []; F.hover(d.stage, () => hits);
  const rnd = (i, k) => { const s = Math.sin(i * 127.1 + k * 311.7) * 43758.5453; return s - Math.floor(s); };
  function flaskPath(ctx) { ctx.beginPath(); ctx.moveTo(CX - NW, NTOP); ctx.lineTo(CX - NW, YJ); ctx.arc(B.x, B.y, B.r, Math.atan2(YJ - B.y, -NW), Math.atan2(YJ - B.y, NW), true); ctx.lineTo(CX + NW, NTOP); }
  function beakerPath(ctx) {
    ctx.beginPath(); ctx.moveTo(BK.l - 12, BK.rim - 4); ctx.lineTo(BK.l, BK.rim + 6); ctx.lineTo(BK.l, BK.b - 18); ctx.quadraticCurveTo(BK.l, BK.b, BK.l + 18, BK.b);
    ctx.lineTo(BK.r - 18, BK.b); ctx.quadraticCurveTo(BK.r, BK.b, BK.r, BK.b - 18); ctx.lineTo(BK.r, BK.rim + 6); ctx.lineTo(BK.r + 12, BK.rim - 4);
  }
  function draw() {
    const { ctx } = begin(d.c);
    const t = T.v, P = (P0 * t) / T0, heat = (t - T0) / (373 - T0), cp = C('pressure'), ct = C('temperature'), cg = F.ref('sphere');
    hits = [];
    ctx.save(); ctx.translate(0, DY);
    /* the hot plate: its heating surface under the beaker, the body with its control and lamp, the feet */
    ctx.save();
    ctx.fillStyle = PAL.muted; ctx.fillRect(476, 628, 44, 16); ctx.fillRect(880, 628, 44, 16);
    ctx.fillStyle = PAL.soft; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.roundRect(440, 564, 520, 66, 10); ctx.fill(); ctx.stroke();
    ctx.fillStyle = F.mixColor(PAL.muted, F.fact(GLOW), heat); ctx.beginPath(); ctx.roundRect(468, 550, 464, 14, 4); ctx.fill(); ctx.stroke();
    const ka = (-0.75 + 1.5 * heat) * Math.PI;
    ctx.fillStyle = PAL.panel; ctx.beginPath(); ctx.arc(906, 597, 16, 0, TAU); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(906, 597); ctx.lineTo(906 + 16 * Math.sin(ka), 597 - 16 * Math.cos(ka)); ctx.stroke();
    ctx.fillStyle = heat > 0 ? F.fact(GLOW) : PAL.panel; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(862, 597, 6, 0, TAU); ctx.fill(); ctx.stroke();
    ctx.restore();
    /* the water in the beaker, and the bubbles it forms as it nears the boil */
    ctx.save(); beakerPath(ctx); ctx.closePath(); ctx.clip(); ctx.fillStyle = alpha(PAL.ink, 0.08); ctx.fillRect(BK.l, WATER, BK.r - BK.l, BK.b - WATER); ctx.restore();
    const boil = Math.max(0, Math.min(1, (t - 363) / 10));
    ctx.save(); ctx.strokeStyle = alpha(PAL.ink, 0.5); ctx.lineWidth = 1.5;
    for (let i = 0; i < Math.round(boil * 18); i++) {
      const x = BK.l + 16 + rnd(i, 1) * (BK.r - BK.l - 32), y = BK.b - 8 - ((clock * (55 + 30 * rnd(i, 2)) + rnd(i, 3) * 240) % (BK.b - WATER - 14));
      if (Math.hypot(x - B.x, y - B.y) < B.r + 8 || (Math.abs(x - TH.x) < 18 && y < TH.bulb + 24) || (Math.abs(x - CX) < NW + 8 && y < B.y)) continue;
      ctx.beginPath(); ctx.arc(x, y, 3 + 2.5 * rnd(i, 4), 0, TAU); ctx.stroke();
    }
    ctx.restore();
    line(ctx, BK.l, WATER, BK.r, WATER, alpha(PAL.ink, 0.4), 2);
    /* the flask: it displaces the water, holds the gas in the volume hue, and its glass is the referent */
    ctx.save(); flaskPath(ctx); ctx.closePath(); ctx.fillStyle = PAL.panel; ctx.fill(); ctx.fillStyle = alpha(C('volume'), 0.14); ctx.fill(); ctx.restore();
    const k = drawn();
    for (const q of g.p) {
      const a = Math.atan2(q.uy, q.ux);
      line(ctx, q.x, q.y, q.x - q.ux * 15 * k, q.y - q.uy * 15 * k, alpha(PAL.ink, 0.22), 2);
      hits.push({ x: q.x, y: q.y, r: molecule(ctx, q.f, q.x, q.y, 0.8, a) + 4, name: molName(q.f) });
    }
    ctx.save(); flaskPath(ctx); ctx.strokeStyle = cg; ctx.lineWidth = 4; ctx.lineJoin = 'round'; ctx.stroke(); ctx.restore();
    /* the thermometer standing in the bath */
    ctx.save(); ctx.fillStyle = PAL.panel; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.roundRect(TH.x - 7, TH.top, 14, TH.bulb - TH.top + 6, 7); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.arc(TH.x, TH.bulb + 8, 12, 0, TAU); ctx.fill(); ctx.stroke();
    ctx.fillStyle = ct; ctx.beginPath(); ctx.arc(TH.x, TH.bulb + 8, 8, 0, TAU); ctx.fill(); ctx.fillRect(TH.x - 2.5, yT(t), 5, TH.bulb + 8 - yT(t)); ctx.restore();
    for (let v = 280; v <= 370; v += 10) { const big = v % 50 === 0; line(ctx, TH.x + 7, yT(v), TH.x + (big ? 18 : 13), yT(v), PAL.ink, big ? 2 : 1.2); if (big) text(ctx, String(v), TH.x + 22, yT(v), PAL.muted, { size: 14 }); }
    text(ctx, 'T = ' + t + ' K', TH.x - 24, 196, ct, { size: 26, weight: 600, align: 'right' });
    /* the beaker's glass, over the water and the flask */
    ctx.save(); beakerPath(ctx); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.stroke(); ctx.restore();
    /* water vapour off the bath once it is well above room temperature */
    const steam = Math.max(0, Math.min(1, (t - 318) / 45));
    if (steam > 0) {
      ctx.save(); ctx.lineWidth = 2.5; ctx.lineCap = 'round';
      [614, 648, 766, 812, 858].forEach((x0, i) => {
        const rise = (clock * 22 + i * 31) % 70, y0 = WATER - 10 - rise;
        ctx.strokeStyle = alpha(PAL.ink, 0.5 * steam * (1 - rise / 70)); ctx.beginPath();
        for (let s = 0; s <= 1.001; s += 0.1) { const x = x0 + 7 * Math.sin(TAU * (s * 1.2 + i * 0.37)), y = y0 - 46 * s; if (s) ctx.lineTo(x, y); else ctx.moveTo(x, y); }
        ctx.stroke();
      });
      ctx.restore();
      hits.push({ x: 810, y: 230, r: 60, name: 'water vapor leaving the bath' }, { x: 630, y: 230, r: 34, name: 'water vapor leaving the bath' });
    }
    /* the stopper in the neck, the gauge's tube through it into the gas, and the gauge */
    ctx.save(); ctx.fillStyle = PAL.muted; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(CX - 29, 198); ctx.lineTo(CX + 29, 198); ctx.lineTo(CX + NW - 2, 232); ctx.lineTo(CX - NW + 2, 232); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.fillStyle = PAL.panel; ctx.beginPath(); ctx.rect(CX - 5, 184, 10, 54); ctx.fill(); line(ctx, CX - 5, 184, CX - 5, 238, PAL.ink, 2); line(ctx, CX + 5, 184, CX + 5, 238, PAL.ink, 2); ctx.restore();

    /* names: the three bodies once each, the two gases in a key, the rest under the pointer */
    label(ctx, 'water bath', BK.l + 16, 476, { side: 'left', gap: 90 });
    label(ctx, 'sealed flask of air', B.x + 108, 476, { side: 'right', gap: 150, color: cg });
    label(ctx, heat > 0 ? 'hot plate, on' : 'hot plate, off', 962, 597, { side: 'right', gap: 48 });
    legend(ctx, { l: 28, r: 428, t: 540, b: 634 }, ['N₂', 'O₂'].map((f) => ({ s: WORD[f] + ', ' + f, draw: (c, x, y) => molecule(c, f, x, y, 0.8) })), { corner: 'bl' });
    if (t > T0) {
      text(ctx, 'Molecules move ' + fmt(Math.sqrt(t / T0), 2) + ' times as fast as at 298 K;', 40, 656, PAL.muted, { size: 17 });
      text(ctx, 'the drawing shows ' + EX + ' times that gain.', 40, 680, PAL.muted, { size: 17 });
    }
    hits.push({ x: CX, y: 214, r: 24, name: 'stopper, with the gauge’s tube through it' }, { x: TH.x, y: 290, r: 16, name: 'thermometer' }, { x: TH.x, y: 215, r: 16, name: 'thermometer' },
      { x: 906, y: 597, r: 18, name: 'heat control' }, { x: 862, y: 597, r: 9, name: 'lamp, lit while the plate heats' }, { x: 700, y: 557, r: 14, name: 'heating surface' }, { x: 560, y: 557, r: 14, name: 'heating surface' }, { x: 840, y: 557, r: 14, name: 'heating surface' });
    ctx.restore();
    hits = hits.map((h) => ({ ...h, y: h.y + DY }));
    gauge(ctx, CX, 118, 96, P, 1.5, 'atm', 0.5, 0.1);
    text(ctx, 'P = ' + fmt(P, 2) + ' atm', CX + 120, 118, cp, { size: 26, weight: 600 });
    hits.push({ x: CX, y: 118, r: 96, name: 'pressure gauge' });
    readout(d.readout, `\\frac{\\kP}{\\kT} = \\frac{${hue('pressure', fmt(P, 2) + '\\ \\text{atm}')}}{${hue('temperature', t + '\\ \\text{K}')}} = ${sig3(P / t)}\\ \\text{atm/K}`);
  }
  register(d.fig, { update: (dt) => { cy.step(dt, () => 1); clock += dt; g.step(dt, () => 150 * drawn(), inside); }, draw });
})();

/* =====================================================================
   FIGURE 9.11: the pressure of a sample of air against its temperature at
   constant volume, the book's six measurements as a table and a graph on
   the book's axes, the line through them extrapolated to absolute zero.
   Still: two states on the measured line answer their sliders.
===================================================================== */
/* what the second state's kelvin temperature is to the first's, said of the quantity that follows it */
const scaled = (t1, t2, what) => (t1 === t2 ? 'Both states are at ' + t1 + ' K.' : 'From ' + t1 + ' K to ' + t2 + ' K the kelvin temperature is multiplied by ' + fmt(t2 / t1, 2) + ', and so is the ' + what + '.');
(function () {
  const d = sim('sim-amontons-graph', 560);
  const DATA = [[-100, 173, 36.0], [-50, 223, 46.4], [0, 273, 56.7], [50, 323, 67.1], [100, 373, 77.5], [150, 423, 88.0]];
  const T1 = ctl(d.controls, { label: '\\kTone', cls: 'temperature', min: 173, max: 423, step: 1, value: 273, unit: 'K', dec: 0, aria: 'first temperature in kelvin' });
  const T2 = ctl(d.controls, { label: '\\kTtwo', cls: 'temperature', min: 173, max: 423, step: 1, value: 373, unit: 'K', dec: 0, aria: 'second temperature in kelvin' });
  const K = DATA.reduce((s, r) => s + r[1] * r[2], 0) / DATA.reduce((s, r) => s + r[1] * r[1], 0);   /* the line through the origin that fits the data, 0.208 kPa/K */
  const P = (t) => K * t;
  function draw() {
    const { ctx } = begin(d.c);
    const t1 = T1.v, t2 = T2.v, p1 = P(t1), p2 = P(t2), cp = C('pressure'), ct = C('temperature');
    /* the book's table on the left */
    const tx = [110, 265, 415], ty = 130;
    text(ctx, 'Temperature', tx[0], ty, PAL.ink, { size: 17, weight: 600, align: 'center' }); text(ctx, '(°C)', tx[0], ty + 22, PAL.ink, { size: 15, align: 'center' });
    text(ctx, 'Temperature', tx[1], ty, ct, { size: 17, weight: 600, align: 'center' }); text(ctx, '(K)', tx[1], ty + 22, ct, { size: 15, align: 'center' });
    text(ctx, 'Pressure', tx[2], ty, cp, { size: 17, weight: 600, align: 'center' }); text(ctx, '(kPa)', tx[2], ty + 22, cp, { size: 15, align: 'center' });
    line(ctx, 50, ty + 40, 480, ty + 40, PAL.muted, 2);
    DATA.forEach((r, i) => { const y = ty + 76 + i * 40; text(ctx, String(r[0]).replace('-', '−'), tx[0], y, PAL.ink, { size: 18, align: 'center' }); text(ctx, String(r[1]), tx[1], y, ct, { size: 18, align: 'center' }); text(ctx, fmt(r[2], 1), tx[2], y, cp, { size: 18, align: 'center' }); });
    text(ctx, 'air at constant volume', 265, ty + 76 + DATA.length * 40 + 4, PAL.muted, { size: 16, align: 'center' });
    /* the graph on the book's axes: 0 to 500 K by 100, 0 to 100 kPa by 20; the sliders stay on the measured stretch, 173 K to 423 K */
    const box = { l: 640, r: 1320, t: 130, b: 460 };
    const g = axes(ctx, box, [0, 500], [0, 100], { xl: 'Temperature (K)', xc: ct, yl: 'Pressure (kPa)', yc: cp, nx: 5, ny: 5 });
    plot(ctx, g, P, cp, { w: 3, x: [0, 173], dash: [10, 10] });
    plot(ctx, g, P, cp, { w: 5, x: [173, 423] });
    DATA.forEach((r) => dot(ctx, g.X(r[1]), g.Y(r[2]), cp, true, 7));
    dot(ctx, g.X(0), g.Y(0), PAL.ink, false, 9);
    /* the two states, the first hollow and the second filled */
    for (const [t, p, filled] of [[t1, p1, false], [t2, p2, true]]) {
      line(ctx, g.X(t), box.b, g.X(t), g.Y(p), ct, 2, [4, 8]); line(ctx, box.l, g.Y(p), g.X(t), g.Y(p), cp, 2, [4, 8]);
      dot(ctx, g.X(t), g.Y(p), cp, filled, 10);
    }
    stateLabels(ctx, [{ x: g.X(t1), y: g.Y(p1), s: 'P₁ = ' + fmt(p1, 1) + ' kPa' }, { x: g.X(t2), y: g.Y(p2), s: 'P₂ = ' + fmt(p2, 1) + ' kPa' }], cp, box.t);
    legend(ctx, g, [{ s: 'extrapolated: the air condenses below 173 K', color: cp, dash: [10, 10], w: 3 }], { corner: 'above' });
    legend(ctx, g, [{ s: 'measured', kind: 'dot', color: cp }, { s: 'absolute zero, 0 K (−273 °C)', kind: 'dot', hollow: true, color: PAL.ink }], { corner: 'below' });
    topline(ctx, scaled(t1, t2, 'pressure'));
    readout(d.readout, `\\frac{\\kPone}{\\kTone} = \\frac{\\kPtwo}{\\kTtwo} = \\frac{${hue('pressure', fmt(p1, 1) + '\\ \\text{kPa}')}}{${hue('temperature', t1 + '\\ \\text{K}')}} = \\frac{${hue('pressure', fmt(p2, 1) + '\\ \\text{kPa}')}}{${hue('temperature', t2 + '\\ \\text{K}')}} = ${fmt(K, 3)}\\ \\text{kPa/K}`);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 9.12: the volume of one mole of methane at 1 atm against its
   temperature. The table and the axes are the ones the book's image
   prints: four measurements from 270 K down to 111 K, where methane
   liquefies and the line stops, 0 to 300 K and 0 to 30 L. Still: two
   states on the measured line answer their sliders.
===================================================================== */
(function () {
  const d = sim('sim-charles-graph', 560);
  const DATA = [[-3, 270, 22], [-23, 250, 21], [-53, 220, 18], [-162, 111, 9]];
  const T1 = ctl(d.controls, { label: '\\kTone', cls: 'temperature', min: 111, max: 270, step: 1, value: 220, unit: 'K', dec: 0, aria: 'first temperature in kelvin' });
  const T2 = ctl(d.controls, { label: '\\kTtwo', cls: 'temperature', min: 111, max: 270, step: 1, value: 270, unit: 'K', dec: 0, aria: 'second temperature in kelvin' });
  const K = DATA.reduce((s, r) => s + r[1] * r[2], 0) / DATA.reduce((s, r) => s + r[1] * r[1], 0);   /* the line through the origin that fits the data, 0.0823 L/K */
  const Vof = (t) => K * t;
  function draw() {
    const { ctx } = begin(d.c);
    const t1 = T1.v, t2 = T2.v, v1 = Vof(t1), v2 = Vof(t2), cv = C('volume'), ct = C('temperature');
    const tx = [110, 265, 415], ty = 150;
    text(ctx, 'Temperature', tx[0], ty, PAL.ink, { size: 17, weight: 600, align: 'center' }); text(ctx, '(°C)', tx[0], ty + 22, PAL.ink, { size: 15, align: 'center' });
    text(ctx, 'Temperature', tx[1], ty, ct, { size: 17, weight: 600, align: 'center' }); text(ctx, '(K)', tx[1], ty + 22, ct, { size: 15, align: 'center' });
    text(ctx, 'Volume', tx[2], ty, cv, { size: 17, weight: 600, align: 'center' }); text(ctx, '(L)', tx[2], ty + 22, cv, { size: 15, align: 'center' });
    line(ctx, 50, ty + 40, 480, ty + 40, PAL.muted, 2);
    DATA.forEach((r, i) => { const y = ty + 80 + i * 48; text(ctx, String(r[0]).replace('-', '−'), tx[0], y, PAL.ink, { size: 18, align: 'center' }); text(ctx, String(r[1]), tx[1], y, ct, { size: 18, align: 'center' }); text(ctx, String(r[2]), tx[2], y, cv, { size: 18, align: 'center' }); });
    text(ctx, '1 mol of methane at 1 atm', 265, ty + 80 + DATA.length * 48 + 4, PAL.muted, { size: 16, align: 'center' });
    /* the graph on the book's axes and grid: 0 to 300 K by 50, 0 to 30 L by 5 */
    const box = { l: 640, r: 1320, t: 130, b: 460 };
    const g = axes(ctx, box, [0, 300], [0, 30], { xl: 'Temperature (K)', xc: ct, yl: 'Volume (L)', yc: cv, nx: 6, ny: 6 });
    plot(ctx, g, Vof, cv, { w: 3, x: [0, 111], dash: [10, 10] });
    plot(ctx, g, Vof, cv, { w: 5, x: [111, 270] });
    DATA.forEach((r) => dot(ctx, g.X(r[1]), g.Y(r[2]), cv, true, 7));
    dot(ctx, g.X(0), g.Y(0), PAL.ink, false, 9);
    for (const [t, v, filled] of [[t1, v1, false], [t2, v2, true]]) {
      line(ctx, g.X(t), box.b, g.X(t), g.Y(v), ct, 2, [4, 8]); line(ctx, box.l, g.Y(v), g.X(t), g.Y(v), cv, 2, [4, 8]);
      dot(ctx, g.X(t), g.Y(v), cv, filled, 10);
    }
    stateLabels(ctx, [{ x: g.X(t1), y: g.Y(v1), s: 'V₁ = ' + fmt(v1, 1) + ' L' }, { x: g.X(t2), y: g.Y(v2), s: 'V₂ = ' + fmt(v2, 1) + ' L' }], cv, box.t);
    legend(ctx, g, [{ s: 'extrapolated: methane liquefies at 111 K', color: cv, dash: [10, 10], w: 3 }], { corner: 'above' });
    legend(ctx, g, [{ s: 'measured', kind: 'dot', color: cv }, { s: 'absolute zero, 0 K', kind: 'dot', hollow: true, color: PAL.ink }], { corner: 'below' });
    topline(ctx, scaled(t1, t2, 'volume'));
    readout(d.readout, `\\frac{\\kVone}{\\kTone} = \\frac{\\kVtwo}{\\kTtwo} = \\frac{${hue('volume', fmt(v1, 1) + '\\ \\text{L}')}}{${hue('temperature', t1 + '\\ \\text{K}')}} = \\frac{${hue('volume', fmt(v2, 1) + '\\ \\text{L}')}}{${hue('temperature', t2 + '\\ \\text{K}')}} = ${fmt(K, 4)}\\ \\text{L/K}`);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 9.13 + 9.14: the syringe with its gauge, and the two graphs the
   book draws beside it and then alone. The plunger sits at the second
   volume with the first drawn dashed; the pressure is PV = 195 psi·mL
   from the book's data. Still: the plunger answers its sliders.
===================================================================== */
(function () {
  const d = sim('sim-boyle', 790);
  const V1 = ctl(d.controls, { label: '\\kVone', cls: 'volume', min: 5, max: 30, step: 0.1, value: 15, unit: 'mL', dec: 1, aria: 'volume before the plunger is moved' });
  const V2 = ctl(d.controls, { label: '\\kVtwo', cls: 'volume', min: 5, max: 30, step: 0.1, value: 7.5, unit: 'mL', dec: 1, aria: 'volume after the plunger is moved' });
  const K = 13.0 * 15.0;                                     /* psi·mL, the product the book's sample keeps: 13.0 psi at 15.0 mL */
  const DATA = [[5, 39.0], [10, 19.5], [15, 13.0], [20, 9.8], [25, 7.8], [30, 6.5]];
  const P = (v) => K / v;
  let hits = []; F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c);
    const v1 = V1.v, v2 = V2.v, p1 = P(v1), p2 = P(v2), cv = C('volume'), cp = C('pressure');
    /* the syringe across the top: the tip at the left with the gauge on it, the barrel marked in millilitres, the plunger from the right */
    const X = (mL) => 330 + mL * 22, yc = 190, hh = 40;
    gauge(ctx, 140, yc, 80, p2, 40, 'psi', 20, 4);
    text(ctx, fmt(p2, 1) + ' psi', 140, yc + 106, cp, { size: 22, weight: 600, align: 'center' });
    line(ctx, 220, yc, 300, yc, PAL.ink, 8);
    ctx.save(); ctx.fillStyle = alpha(cv, 0.2); ctx.fillRect(X(0) - 28, yc - hh + 3, X(v2) - X(0) + 28, 2 * hh - 6); ctx.restore();
    ctx.save(); ctx.strokeStyle = F.ref('syringe'); ctx.lineWidth = 3.5; ctx.strokeRect(X(0) - 30, yc - hh, X(32) - X(0) + 30, 2 * hh); ctx.restore();
    for (let m = 0; m <= 30; m += 1) { const big = m % 5 === 0; line(ctx, X(m), yc + hh, X(m), yc + hh - (big ? 18 : 9), PAL.ink, big ? 2 : 1.2); if (big && m) text(ctx, String(m), X(m), yc + hh + 22, PAL.ink, { size: 16, align: 'center' }); }
    text(ctx, 'mL', X(31.5), yc + hh + 22, PAL.muted, { size: 15, align: 'center' });
    /* the plunger at V2, and the first position dashed */
    ctx.save(); ctx.fillStyle = PAL.ink; ctx.fillRect(X(v2), yc - hh + 4, 12, 2 * hh - 8); ctx.fillRect(X(v2) + 12, yc - 7, X(34) - X(v2), 14); ctx.fillRect(X(34), yc - 30, 14, 60); ctx.restore();
    line(ctx, X(v1), yc - hh + 4, X(v1), yc + hh - 4, cv, 3, [6, 6]);
    text(ctx, 'V₁ = ' + fmt(v1, 1) + ' mL', X(v1), yc - hh - 20, cv, { size: 18, weight: 600, align: 'center', bg: PAL.panel });
    text(ctx, 'V₂ = ' + fmt(v2, 1) + ' mL', X(v2), yc - hh - (Math.abs(v2 - v1) < 5.5 ? 48 : 20), cv, { size: 18, weight: 600, align: 'center', bg: PAL.panel });
    hits = [{ x: 140, y: yc, r: 80, name: 'pressure gauge' }, { x: X(v2) + 6, y: yc, r: 30, name: 'plunger' }, { x: X(v2 / 2), y: yc, r: 30, name: 'the air in the syringe' }, { x: X(v1), y: yc, r: 12, name: 'where the plunger stood at V₁' }];
    /* P against V: 0 to 35 mL by 5, 0 to 40 psi by 10, fixed from the slider range and the data */
    const bl = { l: 150, r: 630, t: 390, b: 700 };
    const gl = axes(ctx, bl, [0, 35], [0, 40], { xl: 'V (mL)', xc: cv, yl: 'P (psi)', yc: cp, nx: 7, ny: 4 });
    plot(ctx, gl, P, cp, { w: 4, x: [4.9, 35] });
    DATA.forEach(([v, p]) => dot(ctx, gl.X(v), gl.Y(p), cp, true, 7));
    text(ctx, 'a hyperbola: PV = ' + fmt(K, 0) + ' psi·mL', bl.r, bl.t - 24, PAL.muted, { size: 17, align: 'right' });
    legend(ctx, gl, [{ s: 'measured', kind: 'dot', color: cp }], { corner: 'below' });
    /* 1/P against V: 0 to 35 mL by 5, 0 to 0.18 psi⁻¹ by 0.06 */
    const br = { l: 860, r: 1330, t: 390, b: 700 };
    const gr = axes(ctx, br, [0, 35], [0, 0.18], { xl: 'V (mL)', xc: cv, yl: '1/P (psi⁻¹)', yc: cp, nx: 7, ny: 3, fy: (v) => fmt(v, 2) });
    plot(ctx, gr, (v) => v / K, cp, { w: 4, x: [0, 35] });
    DATA.forEach(([v, p]) => dot(ctx, gr.X(v), gr.Y(1 / p), cp, true, 7));
    text(ctx, 'a straight line through the origin', br.r, br.t - 24, PAL.muted, { size: 17, align: 'right' });
    for (const [v, p, filled] of [[v1, p1, false], [v2, p2, true]]) {
      line(ctx, gl.X(v), bl.b, gl.X(v), gl.Y(p), cv, 2, [4, 8]); line(ctx, bl.l, gl.Y(p), gl.X(v), gl.Y(p), cp, 2, [4, 8]); dot(ctx, gl.X(v), gl.Y(p), cp, filled, 10);
      line(ctx, gr.X(v), br.b, gr.X(v), gr.Y(1 / p), cv, 2, [4, 8]); line(ctx, br.l, gr.Y(1 / p), gr.X(v), gr.Y(1 / p), cp, 2, [4, 8]); dot(ctx, gr.X(v), gr.Y(1 / p), cp, filled, 10);
    }
    /* each pressure stands up and to the right of its point, where the falling curve never runs; the lower point's label is stacked when the two are close */
    const close = Math.abs(gl.X(v1) - gl.X(v2)) < 150 && Math.abs(gl.Y(p1) - gl.Y(p2)) < 30, hi = p1 >= p2 ? 1 : 2;
    [[v1, p1, 'P₁', 1], [v2, p2, 'P₂', 2]].forEach(([v, p, s, i]) => text(ctx, s + ' = ' + fmt(p, 1) + ' psi', gl.X(v) + (p > 30 ? 20 : 14), gl.Y(p) + (p > 30 ? 0 : -22) + (close && hi === i ? -30 : 0), cp, { size: 17, weight: 600, bg: PAL.panel }));
    const ratio = v2 / v1;
    topline(ctx, Math.abs(ratio - 1) < 0.005 ? 'The plunger has not moved, so the gauge reads the same.' : 'The volume is ' + fmt(ratio, 2) + ' times what it was, and the pressure is ' + fmt(1 / ratio, 2) + ' times.');
    readout(d.readout, `\\kPone\\kVone = \\kPtwo\\kVtwo = (${hue('pressure', fmt(p1, 1) + '\\ \\text{psi}')})(${hue('volume', fmt(v1, 1) + '\\ \\text{mL}')}) = (${hue('pressure', fmt(p2, 1) + '\\ \\text{psi}')})(${hue('volume', fmt(v2, 1) + '\\ \\text{mL}')}) = ${fmt(K, 0)}\\ \\text{psi·mL}`);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   SIM: the gas box. A cylinder of gas closed by a piston, drawn flat: the
   gauge on the end wall reads the pressure the ideal gas law gives, the
   piston stands at the volume, and the molecules of the chosen gas travel
   at speeds that follow the temperature and their molar mass. A law may
   be held: its two held quantities lock, the equation morphs by meaning
   into the law's own form and then into its two-state form, with the
   state when the law was chosen as state 1. Under Charles's and
   Avogadro's laws the pressure is held, so the piston finds the volume.
   Moving: the molecules travel, so the figure runs continuously and
   carries the transport without a scrubber. One mole at 273 K and 1 atm
   fills the standard molar volume, so 273 K is a dashed circle on the
   temperature and the volume that amount fills at STP is one on the
   volume.
===================================================================== */
(function () {
  const H = 540, d = sim('sim-gas-box', H);
  const GASES = ['He', 'N₂', 'O₂', 'Ar', 'CO₂'];
  const LAWS = [null, { name: 'Amontons', held: 'V and n', key: 'A' }, { name: 'Charles', held: 'P and n', key: 'C' }, { name: 'Boyle', held: 'T and n', key: 'B' }, { name: 'Avogadro', held: 'P and T', key: 'Av' }];
  let Nc = null;
  const Vc = ctl(d.controls, { label: '\\kV', cls: 'volume', min: 2, max: 30, step: 0.1, value: 22.4, unit: 'L', dec: 1, onInput: () => apply(), aria: 'volume of the gas in liters',
    specials: [{ at: () => (Nc ? Nc.v * R * 273 : null), label: 'STP' }] });
  const Tc = ctl(d.controls, { label: '\\kT', cls: 'temperature', min: 100, max: 600, step: 1, value: 273, unit: 'K', dec: 0, onInput: () => apply(), aria: 'temperature of the gas in kelvin',
    specials: [{ at: 273, label: '273 K' }] });
  Nc = ctl(d.controls, { label: '\\kn', cls: 'amount', min: 0.2, max: 4, step: 0.05, value: 1, unit: 'mol', dec: 2, onInput: () => apply(), aria: 'amount of gas in moles' });
  [Vc, Tc, Nc].forEach((c) => { c.el.style.transition = 'opacity 0.6s cubic-bezier(0.45, 0, 0.55, 1)'; });
  const g = gas2();
  /* the gas is chosen by name (rule 7.2): every molecule in the cylinder is a molecule of that gas in its element's colours */
  const Gc = F.choice(d.controls, { label: '\\text{gas}', options: GASES.map((f) => ({ value: f, label: f })), value: 'N₂', aria: 'the gas in the cylinder', onInput: (f) => g.p.forEach((q) => { q.f = f; }) });
  /* the laws are states, not a quantity (rule 26.1), and a row of five would wrap, so they are a dropdown that says what each holds */
  const Lc = F.select(d.controls, { label: '\\text{law held}', options: [{ value: '0', label: 'none' }, ...LAWS.slice(1).map((l, i) => ({ value: String(i + 1), label: l.name + '’s: ' + l.held + ' fixed' }))], value: '0', aria: 'the gas law being held', onInput: hold });
  const law = () => +Lc.value;
  let snap = { V: Vc.v, T: Tc.v, n: Nc.v, P: (Nc.v * R * Tc.v) / Vc.v }, since = 0;
  /* the state: under Charles's and Avogadro's laws the pressure is the one held and the piston finds the volume */
  const state = () => { const n = Nc.v, T = Tc.v, held = law() === 2 || law() === 4, V = held ? (n * R * T) / snap.P : Vc.v; return { n, T, V, P: held ? snap.P : (n * R * T) / V }; };
  /* A quantity a law holds still, and a quantity the law then decides, are both taken out of the reader's hands: their
     sliders are disabled and greyed rather than moved and snapped back (rule 24.6). */
  function hold() {
    const s = state(); snap = { ...s, V: Vc.v, P: (s.n * R * s.T) / Vc.v };
    const L = law(); Vc.disable(L === 1 || L === 2 || L === 4); Tc.disable(L === 3 || L === 4); Nc.disable(L >= 1 && L <= 3);
    since = performance.now();
  }
  /* with the pressure held, the piston stops at the ends of its travel, 2 L and 30 L, and the slider that drives it stops there with it */
  function apply() {
    const L = law(); if (L !== 2 && L !== 4) return;
    let V = (Nc.v * R * Tc.v) / snap.P;
    if (V > 30 || V < 2) {
      const up = V > 30, Vb = up ? 30 : 2;
      if (L === 2) { const t = (Vb * snap.P) / (Nc.v * R); Tc.set(up ? Math.floor(t) : Math.ceil(t)); }
      else { const n = (Vb * snap.P) / (R * Tc.v); Nc.set(up ? Math.floor(n * 20) / 20 : Math.ceil(n * 20) / 20); }
      V = (Nc.v * R * Tc.v) / snap.P;
    }
    Vc.set(Math.min(30, Math.max(2, V)));
  }
  /* the cylinder: its end wall fixed at the left with the gauge on it, the piston at the right, 26 canvas units to the litre */
  const X0 = 330, PX = 26, YT = 140, YB = 420, XE = 1140, GY = (YT + YB) / 2, M = 16, wall = (V) => X0 + V * PX;
  const bounds = () => { const w = wall(state().V); let l = X0 + M, r = w - M; if (r < l) l = r = (X0 + w) / 2; return { l, r, t: YT + M, b: YB - M }; };
  const spawn = () => { const b = bounds(); return { x: b.l + Math.random() * (b.r - b.l), y: b.t + Math.random() * (b.b - b.t), f: Gc.value, ...heading2() }; };
  const inside = (q) => {
    const b = bounds(); let n = null;
    if (q.x < b.l) { q.x = b.l; n = [1, 0]; } else if (q.x > b.r) { q.x = b.r; n = [-1, 0]; }
    if (q.y < b.t) { q.y = b.t; n = [0, 1]; } else if (q.y > b.b) { q.y = b.b; n = [0, -1]; }
    return n;
  };
  /* canvas units per second: the speed follows the square root of T over the molar mass, so helium outruns carbon dioxide at one temperature */
  const speed = (q) => 60 * Math.sqrt(Tc.v / MOLS[q.f].m);
  /* the law in symbols, one line that morphs by meaning, and its numbers on the line beneath; each law's constant has its own key */
  const ro = F.readout(d), nums = el('div'); ro.formula.after(nums);
  const mk = (k, x) => `\\mk{${k}}{${x}}`, fr = (a, b) => `\\frac{${a}}{${b}}`;
  const FORM = {
    free: `${mk('P', '\\kP')}${mk('V', '\\kV')} = ${mk('n', '\\kn')}\\,${mk('R', 'R')}\\,${mk('T', '\\kT')}`,
    B: `${mk('P', '\\kP')}${mk('V', '\\kV')} = ${mk('kB', 'k')}`, B2: `${mk('P', '\\kPone')}${mk('V', '\\kVone')} = ${mk('P2', '\\kPtwo')}${mk('V2', '\\kVtwo')}`,
    A: `${fr(mk('P', '\\kP'), mk('T', '\\kT'))} = ${mk('kA', 'k')}`, A2: `${fr(mk('P', '\\kPone'), mk('T', '\\kTone'))} = ${fr(mk('P2', '\\kPtwo'), mk('T2', '\\kTtwo'))}`,
    C: `${fr(mk('V', '\\kV'), mk('T', '\\kT'))} = ${mk('kC', 'k')}`, C2: `${fr(mk('V', '\\kVone'), mk('T', '\\kTone'))} = ${fr(mk('V2', '\\kVtwo'), mk('T2', '\\kTtwo'))}`,
    Av: `${fr(mk('V', '\\kV'), mk('n', '\\kn'))} = ${mk('kAv', 'k')}`, Av2: `${fr(mk('V', '\\kVone'), mk('n', '\\knone'))} = ${fr(mk('V2', '\\kVtwo'), mk('n2', '\\kntwo'))}`,
  };
  const HELD = { A: ['n', 'R', 'V'], C: ['n', 'R', 'P'], B: ['n', 'R', 'T'], Av: ['P', 'R', 'T'] }, SECOND = { A: ['P2', 'T2'], C: ['V2', 'T2'], B: ['P2', 'V2'], Av: ['V2', 'n2'] };
  /* none to a law: the held terms bend together into its k; a law back to none: k opens into them; k then opens into the second state */
  function keyMap(from, to) {
    if (from === 'free' && HELD[to]) return Object.fromEntries(HELD[to].map((q) => [q, 'k' + to]));
    if (to === 'free' && HELD[from]) return { ['k' + from]: HELD[from] };
    if (to === from + '2') return { ['k' + from]: SECOND[from] };
    return {};
  }
  let shown = '', form = 'free';
  const cy = cycle(() => Infinity, 0);
  let hits = []; F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c);
    const { V, T, n, P } = state(), L = law(), cv = C('volume'), cp = C('pressure'), w = wall(V), gas = Gc.value;
    g.fill(Math.round(n * 10), spawn);
    hits = [];
    /* the gauge on the end wall, its tube opening into the gas */
    gauge(ctx, 150, GY, 80, P, 10, 'atm', 5, 1);
    ctx.save(); ctx.fillStyle = PAL.panel; ctx.fillRect(228, GY - 6, X0 - 226, 12); ctx.restore();
    line(ctx, 229, GY - 6, X0, GY - 6, PAL.ink, 2); line(ctx, 229, GY + 6, X0, GY + 6, PAL.ink, 2);
    text(ctx, 'P = ' + sig3(P) + ' atm', 150, GY + 108, cp, { size: 24, weight: 600, align: 'center' });
    if (P > 10) text(ctx, 'off the dial', 150, GY + 136, PAL.muted, { size: 16, align: 'center' });
    /* the gas, in the volume hue, and its molecules */
    ctx.save(); ctx.fillStyle = alpha(cv, 0.14); ctx.fillRect(X0, YT, w - X0, YB - YT); ctx.restore();
    for (const q of g.p) hits.push({ x: q.x, y: q.y, r: molecule(ctx, q.f, q.x, q.y, 0.85, Math.atan2(q.uy, q.ux)) + 4, name: molName(q.f) });
    /* the cylinder: the end wall, broken where the gauge's tube enters, and the barrel open at the right */
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 4; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(XE, YT); ctx.lineTo(X0, YT); ctx.lineTo(X0, GY - 6); ctx.moveTo(X0, GY + 6); ctx.lineTo(X0, YB); ctx.lineTo(XE, YB); ctx.stroke();
    /* the piston, its rod and its handle */
    ctx.fillStyle = PAL.muted; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.rect(w, YT + 3, 18, YB - YT - 6); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.rect(w + 18, GY - 8, 104, 16); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.roundRect(w + 122, GY - 46, 14, 92, 4); ctx.fill(); ctx.stroke(); ctx.restore();
    F.hbracket(ctx, X0, w, YB + 30, cv, 'V = ' + fmt(V, 1) + ' L', { side: 'below', size: 24 });
    hits.push({ x: 150, y: GY, r: 80, name: 'pressure gauge' }, { x: w + 9, y: GY - 80, r: 30, name: 'piston' }, { x: w + 9, y: GY + 80, r: 30, name: 'piston' }, { x: w + 70, y: GY, r: 40, name: 'piston' });
    const stp = T === 273 && Math.abs(n - 1) < 0.001 && Math.abs(V - 22.4) < 0.05;
    topline(ctx, fmt(n, 2) + ' mol of ' + WORD[gas] + (stp ? ' at 273 K and 1.00 atm fills 22.4 L, the standard molar volume.' : ' at ' + T + ' K in ' + fmt(V, 1) + ' L presses at ' + sig3(P) + ' atm.'));
    /* the equation: the law's own form for a moment, then its two states */
    const key = L ? LAWS[L].key : '', next = !L ? 'free' : performance.now() - since > 1600 ? key + '2' : key;
    if (next !== form) { F.morph(ro.formula, FORM[next], { keyMap: keyMap(form, next) }); form = next; } else if (!shown) F.morph(ro.formula, FORM[next]);
    const Pn = (x) => hue('pressure', sig3(x) + '\\ \\text{atm}'), Vn = (x, dec = 1) => hue('volume', fmt(x, dec) + '\\ \\text{L}'), Tn = (x) => hue('temperature', x + '\\ \\text{K}'), Nn = (x) => hue('amount', fmt(x, 2) + '\\ \\text{mol}');
    const two = next.endsWith('2');
    const line2 = next === 'free' ? `(${Pn(P)})(${Vn(V)}) = (${Nn(n)})(${RTEX})(${Tn(T)}) = ${sig3(P * V)}\\ \\text{L atm}`
      : key === 'B' ? `${two ? `(${Pn(snap.P)})(${Vn(snap.V)}) = ` : ''}(${Pn(P)})(${Vn(V)}) = ${sig3(P * V)}\\ \\text{L atm}`
      : key === 'A' ? `${two ? fr(Pn(snap.P), Tn(snap.T)) + ' = ' : ''}${fr(Pn(P), Tn(T))} = ${fmt(P / T, 5)}\\ \\text{atm/K}`
      : key === 'C' ? `${two ? fr(Vn(snap.V, 2), Tn(snap.T)) + ' = ' : ''}${fr(Vn(V, 2), Tn(T))} = ${fmt(V / T, 4)}\\ \\text{L/K}`
      : `${two ? fr(Vn(snap.V, 2), Nn(snap.n)) + ' = ' : ''}${fr(Vn(V, 2), Nn(n))} = ${fmt(V / n, 1)}\\ \\text{L/mol}`;
    if (line2 !== shown) { shown = line2; tex(nums, line2); }
    const says = two ? 'State 1 is the gas as it was when the law was chosen.' : '';
    if (ro.note.textContent !== says) ro.note.textContent = says;
  }
  register(d.fig, { update: (dt) => { cy.step(dt, () => 1); g.step(dt, speed, inside); }, draw });
})();

/* =====================================================================
   SIM: one state on four graphs. The same gas drawn on P against V, V
   against T, P against T and 1/P against V, with the curve through the
   state on each for the other two quantities held. Still: the marker
   answers its sliders.
===================================================================== */
(function () {
  const d = sim('sim-four-graphs', 690);
  const Vc = ctl(d.controls, { label: '\\kV', cls: 'volume', min: 1, max: 30, step: 0.1, value: 22.4, unit: 'L', dec: 1, aria: 'volume of the gas in liters' });
  const Tc = ctl(d.controls, { label: '\\kT', cls: 'temperature', min: 100, max: 600, step: 1, value: 273, unit: 'K', dec: 0, aria: 'temperature of the gas in kelvin' });
  const Nc = ctl(d.controls, { label: '\\kn', cls: 'amount', min: 0.2, max: 4, step: 0.05, value: 1, unit: 'mol', dec: 2, aria: 'amount of gas in moles' });
  function draw() {
    const { ctx } = begin(d.c);
    const V = Vc.v, T = Tc.v, n = Nc.v, P = (n * R * T) / V, cv = C('volume'), ct = C('temperature'), cp = C('pressure');
    /* the four frames, fixed from the slider ranges: V 0 to 30 L, T 0 to 600 K, P 0 to 5 atm, so that one atmosphere is not lost at the foot of the axis (pinned beyond), 1/P 0 to 2 atm⁻¹ */
    const boxes = [{ l: 130, r: 620, t: 80, b: 290 }, { l: 850, r: 1340, t: 80, b: 290 }, { l: 130, r: 620, t: 410, b: 620 }, { l: 850, r: 1340, t: 410, b: 620 }];
    /* one graph: its frame, the curve with the other two quantities held, the state with its drop lines, and the law it is */
    function graph(box, xr, yr, o, f, x, y, cx, cyc, law) {
      const g = axes(ctx, box, xr, yr, o);
      plot(ctx, g, f, cyc, { w: 4 });
      if (y <= yr[1] && x <= xr[1]) { line(ctx, g.X(x), box.b, g.X(x), g.Y(y), cx, 2, [4, 8]); line(ctx, box.l, g.Y(y), g.X(x), g.Y(y), cyc, 2, [4, 8]); }
      pinned(ctx, box, g.X, g.Y, x, y, cyc, o.out);
      text(ctx, law, box.r, box.t - 24, PAL.muted, { size: 17, align: 'right' });
    }
    graph(boxes[0], [0, 30], [0, 5], { xl: 'V (L)', xc: cv, yl: 'P (atm)', yc: cp, nx: 3, ny: 5, out: sig3(P) + ' atm' }, (v) => (v > 0.2 ? (n * R * T) / v : NaN), V, P, cv, cp, 'T and n fixed: Boyle’s law');
    graph(boxes[1], [0, 600], [0, 30], { xl: 'T (K)', xc: ct, yl: 'V (L)', yc: cv, nx: 3, ny: 3 }, (t) => (n * R * t) / P, T, V, ct, cv, 'P and n fixed: Charles’s law');
    graph(boxes[2], [0, 600], [0, 5], { xl: 'T (K)', xc: ct, yl: 'P (atm)', yc: cp, nx: 3, ny: 5, out: sig3(P) + ' atm' }, (t) => (n * R * t) / V, T, P, ct, cp, 'V and n fixed: Amontons’s law');
    graph(boxes[3], [0, 30], [0, 2], { xl: 'V (L)', xc: cv, yl: '1/P (atm⁻¹)', yc: cp, nx: 3, ny: 2, fy: (v) => fmt(v, 1) }, (v) => v / (n * R * T), V, 1 / P, cv, cp, 'T and n fixed: Boyle’s law again');
    readout(d.readout, `\\kP = \\frac{\\kn R\\kT}{\\kV} = \\frac{(${hue('amount', fmt(n, 2) + '\\ \\text{mol}')})(${RTEX})(${hue('temperature', T + '\\ \\text{K}')})}{${hue('volume', fmt(V, 1) + '\\ \\text{L}')}} = ${hue('pressure', sig3(P) + '\\ \\text{atm}')}`);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 9.18: three balloons holding the same amount of gas at STP,
   drawn flat as the book draws them. Helium and oxygen are the book's
   first and third; the middle balloon's gas is chosen, ammonia to begin
   with as in the book. The amount scales all three together: the
   balloons stay one size, each shows the same number of molecules (nine
   to the mole, as the book draws), and only the masses differ. Still: the balloons answer
   their controls.
===================================================================== */
(function () {
  const H = 650, d = sim('sim-balloons', H);
  const names = Object.keys(MOLS);
  const Mid = F.select(d.controls, { label: '\\text{middle balloon}', options: names.map((f) => ({ value: f, label: f + ', ' + WORD[f] })), value: 'NH₃', aria: 'gas in the middle balloon' });
  const N = ctl(d.controls, { label: '\\kn', cls: 'amount', min: 0.25, max: 2, step: 0.05, value: 1, unit: 'mol', dec: 2, aria: 'amount of gas in each balloon',
    specials: [{ at: 1, label: '1 mol' }] });
  const TSTP = 273.15, PSTP = 1;
  /* eighteen fixed places inside a unit balloon, spread on a sunflower spiral and taken in an order that keeps any first few apart */
  const ORDER = [5, 12, 0, 16, 9, 14, 3, 7, 10, 1, 17, 15, 6, 11, 2, 13, 4, 8];
  const SPOTS = ORDER.map((i) => { const rr = 0.86 * Math.sqrt((i + 0.6) / 18), a = i * 2.39996; return [rr * Math.cos(a), rr * Math.sin(a)]; });
  let hits = []; F.hover(d.stage, () => hits);
  function balloon(ctx, x, y, r, f, n) {
    const cv = C('volume'), tip = y + r * 1.15;
    ctx.save(); ctx.fillStyle = alpha(cv, 0.16); ctx.strokeStyle = cv; ctx.lineWidth = 3.5; ctx.lineJoin = 'round'; ctx.beginPath();
    ctx.moveTo(x, tip); ctx.bezierCurveTo(x - r * 0.9, y + r * 0.7, x - r * 1.05, y - r * 0.9, x, y - r); ctx.bezierCurveTo(x + r * 1.05, y - r * 0.9, x + r * 0.9, y + r * 0.7, x, tip); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.fillStyle = alpha(cv, 0.5); ctx.beginPath(); ctx.moveTo(x - 9, tip + 14); ctx.lineTo(x, tip); ctx.lineTo(x + 9, tip + 14); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, tip + 14); ctx.bezierCurveTo(x + 18, tip + 30, x - 16, tip + 44, x + 4, tip + 62); ctx.stroke(); ctx.restore();
    SPOTS.slice(0, Math.round(9 * n)).forEach(([sx, sy], i) => {
      const mx = x + sx * r * 0.74, my = y - r * 0.02 + sy * r * 0.8, reach = molecule(ctx, f, mx, my, 1, (i * 0.7) % TAU);
      hits.push({ x: mx, y: my, r: reach + 3, name: molName(f) });
    });
    hits.push({ x, y, r: r * 1.05, name: 'a balloon of ' + WORD[f] + ', ' + fmt(n, 2) + ' mol' });   /* after its molecules, which the tooltip finds first */
  }
  function draw() {
    const { ctx } = begin(d.c);
    hits = [];
    const n = N.v, V = (n * R * TSTP) / PSTP, r = 132 * Math.cbrt(n);
    ['He', Mid.value, 'O₂'].forEach((f, i) => {
      const x = 290 + i * 410, y = 290;
      balloon(ctx, x, y, r, f, n);
      F.rich(ctx, [f + ' ', ['(' + fmt(n * MOLS[f].m, 1) + ' g)', C('mass')]], x, 578, { size: 26, weight: 600, align: 'center' });
      F.rich(ctx, [[fmt(n, 2) + ' mol', C('amount')], ', ', [fmt(V, 1) + ' L', C('volume')]], x, 614, { size: 21, align: 'center' });
    });
    topline(ctx, 'At STP, ' + fmt(n, 2) + ' mol of any of these gases fills ' + fmt(V, 1) + ' L.');
    readout(d.readout, `\\kV = \\frac{\\kn R\\kT}{\\kP} = \\frac{(${hue('amount', fmt(n, 2) + '\\ \\text{mol}')})(${RTEX})(${hue('temperature', '273.15\\ \\text{K}')})}{${hue('pressure', '1\\ \\text{atm}')}} = ${hue('volume', fmt(V, 1) + '\\ \\text{L}')}`);
  }
  register(d.fig, { update: () => {}, draw });
})();
};
