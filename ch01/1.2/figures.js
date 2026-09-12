/* Figures for section 1.2 Phases and Classification of Matter. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['1.2'] = function (root, F) {
const { el, fmt, tex, C, PAL, alpha, ctl, register, begin, line, arrow, dot, text, headline } = F;
const sim = (id, H) => F.sim(root, id, H);
function readout(host, main, small) { tex(host, main); if (small) host.appendChild(el('small', null, small)); }

/* ---------- small helpers shared by the figures ---------- */
/* a rounded box with a label inside, centred on (x, y) */
function box(ctx, x, y, w, h, label, fill, color, size = 22) {
  const r = 10; ctx.save(); ctx.fillStyle = fill; ctx.strokeStyle = color; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(x - w / 2 + r, y - h / 2); ctx.arcTo(x + w / 2, y - h / 2, x + w / 2, y + h / 2, r); ctx.arcTo(x + w / 2, y + h / 2, x - w / 2, y + h / 2, r);
  ctx.arcTo(x - w / 2, y + h / 2, x - w / 2, y - h / 2, r); ctx.arcTo(x - w / 2, y - h / 2, x + w / 2, y - h / 2, r); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore();
  const lines = label.split('\n'); lines.forEach((s, i) => text(ctx, s, x, y + (i - (lines.length - 1) / 2) * (size + 6), PAL.ink, { size, align: 'center', weight: 600 }));
}
/* an open-topped container: walls and floor, with (x1, x2) the walls and (top, bot) the rim and the floor */
function beaker(ctx, x1, x2, top, bot) {
  ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x1, top); ctx.lineTo(x1, bot); ctx.lineTo(x2, bot); ctx.lineTo(x2, top); ctx.stroke();
  ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x1 - 14, top); ctx.lineTo(x1, top); ctx.moveTo(x2, top); ctx.lineTo(x2 + 14, top); ctx.stroke(); ctx.restore();
}
/* a balance under an object: a platform on a base with a display reading the mass in the mass hue */
function balance(ctx, x, y, w, reading) {
  ctx.save(); ctx.fillStyle = PAL.soft; ctx.strokeStyle = PAL.muted; ctx.lineWidth = 3;
  ctx.fillRect(x - w / 2, y, w, 14); ctx.strokeRect(x - w / 2, y, w, 14);
  ctx.fillRect(x - w / 2 + 30, y + 14, w - 60, 54); ctx.strokeRect(x - w / 2 + 30, y + 14, w - 60, 54); ctx.restore();
  text(ctx, reading, x, y + 42, C('mass'), { size: 24, weight: 600, align: 'center', bg: PAL.panel });
}
/* a deterministic scatter, the same on every redraw */
const rnd = (i) => { const s = Math.sin(i * 12.9898 + 78.233) * 43758.5453; return s - Math.floor(s); };
/* a molecule of two atoms side by side, in ink; r the atom radius, hollow for hydrogen */
function diatomic(ctx, x, y, r, hollow) { dot(ctx, x - r * 0.9, y, PAL.ink, !hollow, r); dot(ctx, x + r * 0.9, y, PAL.ink, !hollow, r); }
/* a water molecule: one oxygen and two hydrogens at the book's bent angle */
function water(ctx, x, y) { dot(ctx, x - 12, y + 9, PAL.ink, false, 7); dot(ctx, x + 12, y + 9, PAL.ink, false, 7); dot(ctx, x, y - 2, PAL.ink, true, 11); }

/* =====================================================================
   FIGURE 1.6: one sample in two containers. A state slider moves the
   sample from solid to liquid to gas, and a volume slider sizes it. The
   solid keeps its shape in both containers, the liquid keeps its volume
   at two different heights, the gas fills both. The particle picture
   beneath each container says why. Still: the idea has no time in it.
===================================================================== */
(function () {
  const d = sim('sim-states', 640);
  const NAMES = ['solid', 'liquid', 'gas'];
  const S = ctl(d.controls, { label: '\\text{state}', cls: '', min: 0, max: 2, step: 1, value: 0, unit: '', dec: 0, aria: 'state of the sample' });
  const V = ctl(d.controls, { label: '\\kV', cls: 'volume', min: 50, max: 200, step: 10, value: 100, unit: 'mL', dec: 0, aria: 'volume of the sample' });
  /* the state slider reads a word, not a number */
  const sval = d.controls.querySelector('.ctl-val'); const word = () => { sval.textContent = NAMES[S.v]; }; word(); d.controls.querySelector('input').addEventListener('input', word);
  /* the containers: the narrow one holds 300 mL over its 300 units of height, so one mL is 240 square units in either */
  const A = 240, TOP = 110, BOT = 410, NARROW = { x1: 200, x2: 440 }, WIDE = { x1: 720, x2: 1200 };
  const cap = (c) => ((c.x2 - c.x1) * (BOT - TOP)) / A;
  function sample(ctx, c, state, v) {
    const w = c.x2 - c.x1, cx = (c.x1 + c.x2) / 2, hue = C('volume');
    if (state === 0) { const s = Math.sqrt(A * v); ctx.save(); ctx.fillStyle = alpha(hue, 0.3); ctx.strokeStyle = hue; ctx.lineWidth = 4; ctx.fillRect(cx - s / 2, BOT - s, s, s); ctx.strokeRect(cx - s / 2, BOT - s, s, s); ctx.restore(); }
    else if (state === 1) { const h = (A * v) / w; ctx.save(); ctx.fillStyle = alpha(hue, 0.3); ctx.fillRect(c.x1, BOT - h, w, h); ctx.restore(); line(ctx, c.x1, BOT - h, c.x2, BOT - h, hue, 4); }
    else { ctx.save(); ctx.fillStyle = alpha(hue, 0.14); ctx.fillRect(c.x1, TOP, w, BOT - TOP); ctx.restore(); }
  }
  /* the particles beneath a container: a lattice, a crowd, or a few far apart */
  function particles(ctx, c, state) {
    const t = 470, b = 610, w = c.x2 - c.x1;
    ctx.save(); ctx.strokeStyle = PAL.rule; ctx.lineWidth = 1.5; ctx.strokeRect(c.x1, t, w, b - t); ctx.restore();
    if (state === 0) { for (let r = 0; r < 4; r++) for (let k = 0; k < Math.floor(w / 34); k++) dot(ctx, c.x1 + 20 + k * 34 + (r % 2) * 17, b - 18 - r * 32, PAL.ink, true, 11); }
    else if (state === 1) { for (let r = 0; r < 4; r++) for (let k = 0; k < Math.floor(w / 34) - 1; k++) dot(ctx, c.x1 + 26 + k * 36 + (rnd(r * 50 + k) - 0.5) * 14, b - 20 - r * 30 + (rnd(r * 50 + k + 7) - 0.5) * 12, PAL.ink, true, 11); }
    else { const n = Math.round(w / 60); for (let k = 0; k < n; k++) { const x = c.x1 + 24 + rnd(k * 3) * (w - 48), y = t + 20 + rnd(k * 3 + 1) * (b - t - 40), a = rnd(k * 3 + 2) * Math.PI * 2; dot(ctx, x, y, PAL.ink, true, 11); line(ctx, x + 14 * Math.cos(a), y + 14 * Math.sin(a), x + 34 * Math.cos(a), y + 34 * Math.sin(a), PAL.muted, 2); } }
  }
  function draw() {
    const { ctx } = begin(d.c);
    const s = S.v, v = V.v;
    for (const c of [NARROW, WIDE]) { sample(ctx, c, s, v); beaker(ctx, c.x1, c.x2, TOP, BOT); particles(ctx, c, s); }
    text(ctx, 'a narrow container, ' + fmt(cap(NARROW), 0) + ' mL', (NARROW.x1 + NARROW.x2) / 2, 440, PAL.muted, { size: 17, align: 'center' });
    text(ctx, 'a wide container, ' + fmt(cap(WIDE), 0) + ' mL', (WIDE.x1 + WIDE.x2) / 2, 440, PAL.muted, { size: 17, align: 'center' });
    text(ctx, 'the particles of a ' + NAMES[s], 580, 540, PAL.ink, { size: 20, weight: 600, align: 'center' });
    const rows = [['They are packed in a fixed', 'arrangement and only vibrate,', 'so the sample keeps its shape.'], ['They stay close together but', 'slide past one another, so the', 'sample flows and keeps its volume.'], ['They are far apart and move', 'freely, so the sample spreads', 'to fill whatever holds it.']][s];
    rows.forEach((r, i) => text(ctx, r, 580, 572 + i * 22, PAL.muted, { size: 17, align: 'center' }));
    const H = [`A solid keeps its shape and its volume of ${v} mL in either container`,
      `A liquid takes the shape of each container but keeps its volume of ${v} mL, forming a horizontal surface`,
      `A gas expands to fill its container, so its volume is ${fmt(cap(NARROW), 0)} mL in one and ${fmt(cap(WIDE), 0)} mL in the other`][s];
    headline(ctx, H);
    const R = [`\\kV = ${v}\\ \\text{mL in both containers, with the same shape in both}`,
      `\\kV = ${v}\\ \\text{mL in both containers, at two heights}`,
      `\\kV = ${fmt(cap(NARROW), 0)}\\ \\text{mL in the narrow container and } ${fmt(cap(WIDE), 0)}\\ \\text{mL in the wide one}`][s];
    readout(d.readout, R, ['A solid is rigid and possesses a definite shape.', 'A liquid flows and takes the shape of its container, except that it forms a flat or slightly curved upper surface when acted upon by gravity.', 'A gas takes both the shape and volume of its container.'][s]);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 1.8: conservation of matter, twice. A sealed bottle ferments
   on one balance and a lead-acid battery discharges on another; the bars
   show the kinds of matter changing while each balance holds its
   reading. Still: each slider sets how far the change has run.
===================================================================== */
(function () {
  const d = sim('sim-conservation', 600);
  const Fm = ctl(d.controls, { label: '\\text{fermented}', cls: '', min: 0, max: 100, step: 1, value: 0, unit: '%', dec: 0, aria: 'fraction of the sugar fermented' });
  const Ds = ctl(d.controls, { label: '\\text{discharged}', cls: '', min: 0, max: 100, step: 1, value: 0, unit: '%', dec: 0, aria: 'fraction of the battery discharged' });
  /* the bottle: 960 g of water and the rest, 40 g of sugar; glucose becomes ethanol and carbon dioxide in the ratio 92.1 to 88.0 of its 180.2 */
  const SUGAR = 40, WATER = 960, ETH = 92.14 / 180.16, CO2 = 88.02 / 180.16;
  /* the battery: one reaction's worth of lead, lead oxide and sulfuric acid, 642.6 g, becomes lead sulfate and water */
  const PB = 207.2, PBO2 = 239.2, ACID = 196.2, PBSO4 = 606.6, H2O = 36.0;
  function bottle(ctx, x, y, fill) {
    ctx.save(); ctx.fillStyle = fill; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 4; ctx.beginPath();
    ctx.moveTo(x - 46, y); ctx.lineTo(x - 46, y - 150); ctx.quadraticCurveTo(x - 46, y - 190, x - 16, y - 210); ctx.lineTo(x - 16, y - 250); ctx.lineTo(x + 16, y - 250); ctx.lineTo(x + 16, y - 210);
    ctx.quadraticCurveTo(x + 46, y - 190, x + 46, y - 150); ctx.lineTo(x + 46, y); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.fillStyle = PAL.ink; ctx.fillRect(x - 20, y - 262, 40, 14); ctx.restore();
  }
  function battery(ctx, x, y) {
    ctx.save(); ctx.fillStyle = PAL.soft; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 4; ctx.fillRect(x - 110, y - 150, 220, 150); ctx.strokeRect(x - 110, y - 150, 220, 150);
    ctx.fillStyle = PAL.ink; ctx.fillRect(x - 70, y - 170, 24, 20); ctx.fillRect(x + 46, y - 170, 24, 20);
    ctx.strokeStyle = PAL.muted; ctx.lineWidth = 3; for (let i = 0; i < 6; i++) { const px = x - 90 + i * 36; ctx.beginPath(); ctx.moveTo(px, y - 130); ctx.lineTo(px, y - 20); ctx.stroke(); } ctx.restore();
    text(ctx, '−', x - 58, y - 186, PAL.ink, { size: 22, weight: 600, align: 'center' }); text(ctx, '+', x + 58, y - 186, PAL.ink, { size: 22, weight: 600, align: 'center' });
  }
  /* a labelled bar of mass: the name, a bar drawn to scale and the grams */
  function bar(ctx, x, y, name, g, k) {
    text(ctx, name, x, y, PAL.ink, { size: 17, align: 'right' });
    if (g > 0.05) { ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.22); ctx.fillRect(x + 12, y - 10, g * k, 20); ctx.restore(); }
    text(ctx, fmt(g, 1) + ' g', x + 12 + g * k + 8, y, PAL.muted, { size: 17 });
  }
  function draw() {
    const { ctx } = begin(d.c);
    const f = Fm.v / 100, q = Ds.v / 100;
    /* (a) the bottle */
    bottle(ctx, 250, 410, alpha(PAL.ink, 0.06 + 0.08 * f));
    balance(ctx, 250, 412, 200, fmt(WATER + SUGAR, 1) + ' g');
    text(ctx, '(a)', 250, 520, PAL.muted, { size: 20, align: 'center' });
    bar(ctx, 500, 190, 'water and the rest', WATER, 0.06);
    bar(ctx, 500, 236, 'sugar', SUGAR * (1 - f), 4);
    bar(ctx, 500, 282, 'ethanol', SUGAR * f * ETH, 4);
    bar(ctx, 500, 328, 'carbon dioxide', SUGAR * f * CO2, 4);
    /* (b) the battery */
    battery(ctx, 900, 410);
    balance(ctx, 900, 412, 260, fmt(PB + PBO2 + ACID, 1) + ' g');
    text(ctx, '(b)', 900, 520, PAL.muted, { size: 20, align: 'center' });
    bar(ctx, 1150, 170, 'lead', PB * (1 - q), 0.32);
    bar(ctx, 1150, 216, 'lead oxide', PBO2 * (1 - q), 0.32);
    bar(ctx, 1150, 262, 'sulfuric acid', ACID * (1 - q), 0.32);
    bar(ctx, 1150, 308, 'lead sulfate', PBSO4 * q, 0.32);
    bar(ctx, 1150, 354, 'water', H2O * q, 0.32);
    text(ctx, 'sugar → ethanol + carbon dioxide', 250, 120, PAL.ink, { size: 17, align: 'center' });
    text(ctx, 'lead + lead oxide + sulfuric acid → lead sulfate + water', 900, 120, PAL.ink, { size: 17, align: 'center' });
    const fs = Fm.v, ds = Ds.v;
    headline(ctx, fs === 0 && ds === 0 ? 'Nothing has changed yet: the bottle weighs 1000.0 g and the battery’s reacting substances 642.6 g'
      : `${fs}% fermented and ${ds}% discharged: the kinds of matter have changed, and neither balance has moved`);
    readout(d.readout, `\\km_{\\text{before}} = \\km_{\\text{after}} = ${fmt(WATER + SUGAR, 1)}\\ \\text{g and } ${fmt(PB + PBO2 + ACID, 1)}\\ \\text{g}`,
      'The bottle is sealed, so the carbon dioxide stays inside and is weighed with the rest; if the bottle were open, the gas would escape and the balance would read less, though no matter would have been destroyed.');
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 1.11: the classification of matter, redrawn faithfully as the
   book's flowchart. No sliders, no motion.
===================================================================== */
(function () {
  const d = sim('fig-classify', 470);
  const Q = PAL.soft, B = PAL.panel;
  function down(ctx, x1, y1, x2, y2, label) {
    /* an elbowed arrow: across from (x1, y1) to x2, then down to y2, with its word above the horizontal run */
    line(ctx, x1, y1, x2, y1, PAL.muted, 4); arrow(ctx, x2, y1, x2, y2, PAL.muted, 4);
    text(ctx, label, (x1 + x2) / 2, y1 - 20, PAL.ink, { size: 20, weight: 600, align: 'center' });
  }
  function draw() {
    const { ctx } = begin(d.c);
    box(ctx, 700, 50, 280, 52, 'Matter', B, PAL.muted);
    box(ctx, 700, 122, 380, 84, 'Does it have constant\nproperties and composition?', Q, PAL.muted, 20);
    down(ctx, 510, 122, 340, 176, 'No'); down(ctx, 890, 122, 1060, 176, 'Yes');
    box(ctx, 340, 210, 280, 52, 'Mixture', B, PAL.muted);
    box(ctx, 340, 282, 280, 84, 'Is it uniform\nthroughout?', Q, PAL.muted, 20);
    box(ctx, 1060, 210, 280, 52, 'Pure substance', B, PAL.muted);
    box(ctx, 1060, 282, 280, 84, 'Can it be simplified\nchemically?', Q, PAL.muted, 20);
    down(ctx, 200, 282, 150, 384, 'No'); down(ctx, 480, 282, 530, 384, 'Yes');
    down(ctx, 920, 282, 870, 384, 'No'); down(ctx, 1200, 282, 1250, 384, 'Yes');
    box(ctx, 150, 418, 260, 52, 'Heterogeneous', B, PAL.muted); box(ctx, 530, 418, 260, 52, 'Homogeneous', B, PAL.muted);
    box(ctx, 870, 418, 260, 52, 'Element', B, PAL.muted); box(ctx, 1250, 418, 260, 52, 'Compound', B, PAL.muted);
    readout(d.readout, '\\text{mixture: heterogeneous or homogeneous} \\qquad \\text{pure substance: element or compound}', 'A sample answers the first question by whether every specimen of it has the same makeup and properties, and the second by whether a drop from one place matches a drop from another, or by whether a chemical change can break it into simpler substances.');
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 1.15: the decomposition of water at three levels. A battery in
   a beaker of water, a test tube over each terminal, hydrogen collecting
   over the negative one at twice the volume of the oxygen over the
   positive one; the molecules drawn beneath and the equation counting
   them. Still: the slider sets how many molecules have decomposed.
===================================================================== */
(function () {
  const d = sim('sim-electrolysis', 600);
  const N = ctl(d.controls, { label: '\\text{water molecules decomposed}', cls: '', min: 0, max: 12, step: 2, value: 6, unit: '', dec: 0, aria: 'number of water molecules decomposed' });
  const BX1 = 90, BX2 = 560, BTOP = 150, BBOT = 500, LEVEL = 210;
  const TUBES = [{ x1: 210, x2: 300, sign: '−' }, { x1: 350, x2: 440, sign: '+' }], TTOP = 100, TBOT = 430;
  function draw() {
    const { ctx } = begin(d.c);
    const n = N.v, h2 = n, o2 = n / 2, hue = C('volume');
    /* the water in the beaker */
    ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.07); ctx.fillRect(BX1, LEVEL, BX2 - BX1, BBOT - LEVEL); ctx.restore();
    line(ctx, BX1, LEVEL, BX2, LEVEL, PAL.muted, 2);
    beaker(ctx, BX1, BX2, BTOP, BBOT);
    /* the battery, its terminals under the tubes */
    ctx.save(); ctx.fillStyle = PAL.soft; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 4; ctx.fillRect(230, 440, 190, 50); ctx.strokeRect(230, 440, 190, 50); ctx.restore();
    text(ctx, 'battery', 325, 465, PAL.ink, { size: 17, align: 'center' });
    /* the two tubes, each full of water except for the gas collected at its top */
    TUBES.forEach((t, i) => {
      const w = t.x2 - t.x1, full = TBOT - TTOP - 30, gas = (full * (i === 0 ? h2 : o2)) / 12;
      ctx.save(); ctx.fillStyle = PAL.panel; ctx.fillRect(t.x1, TTOP, w, TBOT - TTOP);
      ctx.fillStyle = alpha(PAL.ink, 0.07); ctx.fillRect(t.x1, TTOP + gas, w, TBOT - TTOP - gas);
      if (gas > 0) { ctx.fillStyle = alpha(hue, 0.3); ctx.fillRect(t.x1, TTOP, w, gas); }
      ctx.strokeStyle = PAL.ink; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(t.x1, TBOT); ctx.lineTo(t.x1, TTOP); ctx.lineTo(t.x2, TTOP); ctx.lineTo(t.x2, TBOT); ctx.stroke(); ctx.restore();
      if (gas > 0) line(ctx, t.x1, TTOP + gas, t.x2, TTOP + gas, hue, 3);
      text(ctx, t.sign, (t.x1 + t.x2) / 2, 448, PAL.panel, { size: 24, weight: 600, align: 'center' });
      text(ctx, i === 0 ? 'hydrogen' : 'oxygen', (t.x1 + t.x2) / 2, 78, PAL.ink, { size: 17, align: 'center' });
    });
    text(ctx, 'hydrogen collected: ' + fmt((100 * h2) / 12, 0) + '% of its tube', 620, 220, hue, { size: 20, weight: 600 });
    text(ctx, 'oxygen collected: ' + fmt((100 * o2) / 12, 0) + '% of its tube', 620, 254, hue, { size: 20, weight: 600 });
    text(ctx, 'the hydrogen tube holds twice the volume of gas the oxygen tube does', 620, 288, PAL.muted, { size: 17 });
    /* the molecules: what remains and what has formed */
    const groups = [['water', 12 - n, (x, y) => water(ctx, x, y)], ['hydrogen', h2, (x, y) => diatomic(ctx, x, y, 8, true)], ['oxygen', o2, (x, y) => diatomic(ctx, x, y, 11, false)]];
    groups.forEach(([name, count, drawOne], g) => {
      const x0 = 640 + g * 250, y0 = 350;
      ctx.save(); ctx.strokeStyle = PAL.rule; ctx.lineWidth = 1.5; ctx.strokeRect(x0 - 10, y0 - 10, 220, 150); ctx.restore();
      text(ctx, count + ' ' + name + (count === 1 ? ' molecule' : ' molecules'), x0 + 100, y0 + 165, PAL.ink, { size: 17, align: 'center' });
      for (let k = 0; k < count; k++) drawOne(x0 + 30 + (k % 4) * 50, y0 + 26 + Math.floor(k / 4) * 46);
    });
    headline(ctx, n === 0 ? 'No water has been decomposed yet, so both tubes are still full of water and every molecule is a water molecule'
      : `${n} water molecules have become ${h2} hydrogen and ${o2} oxygen molecules, and the hydrogen tube holds twice the gas`);
    readout(d.readout, `${n}\\,\\text{H}_2\\text{O}(l) \\longrightarrow ${h2}\\,\\text{H}_2(g) + ${o2}\\,\\text{O}_2(g) \\qquad \\kV_{\\text{H}_2} = 2\\,\\kV_{\\text{O}_2}`,
      'Every atom is accounted for: the ' + 2 * n + ' hydrogen atoms and ' + n + ' oxygen atoms of the water that decomposed are the atoms of the hydrogen and oxygen molecules that formed.');
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 1.16: a hydrogen fuel cell, redrawn faithfully. Hydrogen in on
   the left, oxygen on the right, the anode, the proton exchange membrane
   and the cathode between, electrons round the outer circuit and water
   out at the bottom right. No sliders, no motion.
===================================================================== */
(function () {
  const d = sim('fig-fuel-cell', 660);
  function charged(ctx, x, y, sign) { dot(ctx, x, y, PAL.ink, false, 12); text(ctx, sign, x, y + 1, PAL.ink, { size: 20, weight: 600, align: 'center' }); }
  function slab(ctx, x1, x2, y1, y2, fill, label) {
    ctx.save(); ctx.fillStyle = fill; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.fillRect(x1, y1, x2 - x1, y2 - y1); ctx.strokeRect(x1, y1, x2 - x1, y2 - y1); ctx.restore();
    const ls = label.split('\n'); ls.forEach((s, i) => text(ctx, s, (x1 + x2) / 2, y2 + 26 + i * 22, PAL.ink, { size: 17, align: 'center' }));
  }
  function channel(ctx, pts) { ctx.save(); ctx.strokeStyle = PAL.muted; ctx.lineWidth = 44; ctx.lineCap = 'butt'; ctx.lineJoin = 'miter'; ctx.beginPath(); pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.stroke(); ctx.strokeStyle = PAL.soft; ctx.lineWidth = 36; ctx.stroke(); ctx.restore(); }
  function draw() {
    const { ctx } = begin(d.c);
    /* the housing and the flow channels */
    ctx.save(); ctx.fillStyle = PAL.soft; ctx.fillRect(340, 170, 220, 380); ctx.fillRect(840, 170, 220, 380); ctx.restore();
    channel(ctx, [[200, 240], [520, 240], [520, 480], [200, 480]]);
    channel(ctx, [[1200, 240], [880, 240], [880, 480], [1200, 480]]);
    /* the anode, the membrane, the cathode */
    slab(ctx, 560, 630, 170, 550, alpha(PAL.ink, 0.12), 'Anode');
    slab(ctx, 650, 750, 170, 550, alpha(PAL.ink, 0.28), 'Proton\nexchange\nmembrane');
    slab(ctx, 770, 840, 170, 550, alpha(PAL.ink, 0.12), 'Cathode');
    /* the outer circuit, with its load at the top */
    line(ctx, 595, 170, 595, 90, PAL.ink, 4); line(ctx, 805, 170, 805, 90, PAL.ink, 4);
    line(ctx, 595, 90, 640, 90, PAL.ink, 4); line(ctx, 760, 90, 805, 90, PAL.ink, 4);
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(640, 90); for (let i = 0; i < 6; i++) ctx.lineTo(650 + i * 20, i % 2 ? 108 : 72); ctx.lineTo(760, 90); ctx.stroke(); ctx.restore();
    text(ctx, 'Electric power', 700, 46, PAL.ink, { size: 22, weight: 600, align: 'center' });
    arrow(ctx, 575, 160, 575, 110, PAL.ink, 3); arrow(ctx, 825, 110, 825, 160, PAL.ink, 3);
    charged(ctx, 595, 90, '−'); charged(ctx, 805, 90, '−');
    /* hydrogen in, split at the anode into protons that cross and electrons that go round */
    text(ctx, 'Hydrogen', 150, 240, PAL.ink, { size: 20, align: 'right' }); arrow(ctx, 160, 240, 200, 240, PAL.ink, 3);
    diatomic(ctx, 250, 240, 9, true); diatomic(ctx, 330, 240, 9, true); diatomic(ctx, 440, 300, 9, true); diatomic(ctx, 440, 420, 9, true);
    arrow(ctx, 470, 300, 540, 300, PAL.ink, 3); arrow(ctx, 470, 420, 540, 420, PAL.ink, 3);
    charged(ctx, 700, 290, '+'); charged(ctx, 700, 320, '+'); charged(ctx, 700, 410, '+'); charged(ctx, 700, 440, '+');
    arrow(ctx, 720, 305, 760, 305, PAL.ink, 3); arrow(ctx, 720, 425, 760, 425, PAL.ink, 3);
    charged(ctx, 595, 250, '−'); charged(ctx, 595, 370, '−'); arrow(ctx, 595, 230, 595, 200, PAL.ink, 3); arrow(ctx, 595, 350, 595, 280, PAL.ink, 3);
    text(ctx, 'Unused', 150, 466, PAL.ink, { size: 20, align: 'right' }); text(ctx, 'hydrogen', 150, 490, PAL.ink, { size: 20, align: 'right' }); arrow(ctx, 260, 480, 200, 480, PAL.ink, 3);
    diatomic(ctx, 330, 480, 9, true);
    /* oxygen in, meeting protons and electrons at the cathode to make water */
    text(ctx, 'Oxygen', 1250, 240, PAL.ink, { size: 20 }); arrow(ctx, 1240, 240, 1200, 240, PAL.ink, 3);
    diatomic(ctx, 1140, 240, 11, false); diatomic(ctx, 1060, 240, 11, false);
    charged(ctx, 805, 250, '−'); charged(ctx, 805, 290, '−'); charged(ctx, 805, 330, '−'); charged(ctx, 805, 370, '−');
    dot(ctx, 960, 330, PAL.ink, true, 11); charged(ctx, 925, 305, '+'); charged(ctx, 925, 355, '+');
    arrow(ctx, 960, 360, 960, 410, PAL.ink, 3); water(ctx, 960, 440); arrow(ctx, 990, 480, 1040, 480, PAL.ink, 3); water(ctx, 1090, 480);
    text(ctx, 'Water', 1250, 480, PAL.ink, { size: 20 }); arrow(ctx, 1200, 480, 1240, 480, PAL.ink, 3);
    readout(d.readout, '2\\,\\text{H}_2(g) + \\text{O}_2(g) \\longrightarrow 2\\,\\text{H}_2\\text{O}(l)', 'Hydrogen gives up its electrons at the anode and oxygen takes them up at the cathode, so the electrons must travel round the outer circuit, and that current is the electric power the cell delivers.');
  }
  register(d.fig, { update: () => {}, draw });
})();
};
