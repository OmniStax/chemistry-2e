/* Figures for section 4.5 Quantitative Chemical Analysis. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['4.5'] = function (root, F) {
const { el, fmt, tex, C, PAL, alpha, ctl, cycle, register, begin, line, arrow, dot, text, headline, axes } = F;
const sim = (id, H) => F.sim(root, id, H);
const still = (d, draw) => register(d.fig, { update: () => {}, draw });
function readout(host, main, small) { tex(host, main); if (small) host.appendChild(el('small', null, small)); }
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;

/* colours that are physical facts (book RULES, Files): the pink an acid-base indicator such as phenolphthalein takes
   at the end point, the green and blue grains the book draws in the two absorbers, and the glow of the furnace;
   each is drawn through F.fact */
const INDICATOR_PINK = '#e8559b';
const H2O_ABSORBER = '#8cc63f';
const CO2_ABSORBER = '#4a6fe0';
const FURNACE = '#e2462a';

/* a number in scientific notation for figure text */
const SUP = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
function sciText(x, n = 3) { const e = Math.floor(Math.log10(Math.abs(x))); const m = x / Math.pow(10, e); return fmt(m, n - 1) + ' × 10' + String(e).split('').map((c) => SUP[c]).join(''); }
const SUB = ['', '', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉'];

/* =====================================================================
   SIM: a titration of HCl with NaOH, run to its end point.
   The buret delivers titrant at a steady rate; the graph beside it counts
   the millimoles of NaOH delivered against the millimoles of HCl in the
   sample, and the indicator turns when the two are equal. Moving: a
   titration has a clock, and the delivery stops at the end point. The
   buret and the flask of sample are the caption's referents, their glass
   in their own colours.
===================================================================== */
(function () {
  const d = sim('sim-titration', 620);
  const MT = ctl(d.controls, { label: '\\kM_{\\text{NaOH}}', cls: 'concentration', min: 0.1, max: 0.5, step: 0.001, value: 0.25, unit: 'M', dec: 3, onInput: reset, aria: 'molarity of the sodium hydroxide titrant' });
  const VS = ctl(d.controls, { label: '\\kV_{\\text{sample}}', cls: 'volume', min: 10, max: 50, step: 0.01, value: 50, unit: 'mL', dec: 2, onInput: reset, aria: 'volume of the hydrochloric acid sample' });
  const MA = ctl(d.controls, { label: '\\kM_{\\text{HCl}}', cls: 'concentration', min: 0.05, max: 0.3, step: 0.001, value: 0.176, unit: 'M', dec: 3, onInput: reset, aria: 'molarity of the hydrochloric acid' });
  const RATE = 8, CAP = 50;                                  /* mL delivered per second of the figure's clock; the buret holds 50 mL */
  const veq = () => (VS.v * MA.v) / MT.v;
  const vend = () => Math.min(veq(), CAP);
  const cy = cycle(() => Math.max(vend() / RATE, 1.2), 1.6);
  function reset() { cy.reset(); }
  let hits = []; F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c);
    const cv = C('volume'), cc = C('concentration'), cn = C('amount');
    const Veq = veq(), Vend = vend(), T = Math.max(Vend / RATE, 1.2), tau = isFinite(cy.now()) ? cy.now() : T;
    const V = Math.min(Vend, (tau / T) * Vend), done = tau >= T - 1e-9, reached = done && Veq <= CAP;
    const nA = VS.v * MA.v, nT = V * MT.v;
    /* the buret: 0 mL at the top of its scale, 50 mL at the bottom */
    const bx = 250, bw = 36, Y = (mL) => 130 + 5.4 * mL;
    ctx.save(); ctx.fillStyle = alpha(cc, 0.18); ctx.fillRect(bx - bw / 2, Y(V), bw, Y(CAP) - Y(V) + 16); ctx.restore();
    ctx.save(); ctx.strokeStyle = F.ref('buret'); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(bx - bw / 2, Y(0) - 30); ctx.lineTo(bx - bw / 2, Y(CAP) + 16); ctx.lineTo(bx - 6, Y(CAP) + 40); ctx.lineTo(bx - 3, Y(CAP) + 62);
    ctx.moveTo(bx + bw / 2, Y(0) - 30); ctx.lineTo(bx + bw / 2, Y(CAP) + 16); ctx.lineTo(bx + 6, Y(CAP) + 40); ctx.lineTo(bx + 3, Y(CAP) + 62); ctx.stroke(); ctx.restore();
    ctx.save(); ctx.fillStyle = PAL.soft; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2.5; ctx.fillRect(bx - 34, Y(CAP) + 26, 68, 12); ctx.strokeRect(bx - 34, Y(CAP) + 26, 68, 12); ctx.restore();
    for (let mL = 0; mL <= CAP; mL++) { const big = mL % 10 === 0, mid = mL % 5 === 0; line(ctx, bx - bw / 2, Y(mL), bx - bw / 2 + (big ? 18 : mid ? 12 : 7), Y(mL), PAL.ink, big ? 2 : 1); if (big) text(ctx, String(mL), bx - bw / 2 - 12, Y(mL), PAL.muted, { size: 16, align: 'right' }); }
    text(ctx, 'mL', bx - bw / 2 - 12, Y(0) - 26, PAL.muted, { size: 16, align: 'right' });
    line(ctx, bx + bw / 2, Y(V), bx + bw / 2 + 30, Y(V), cv, 3);
    text(ctx, fmt(V, 2) + ' mL delivered', bx + bw / 2 + 38, Y(V), cv, { size: 20, weight: 600 });
    text(ctx, fmt(MT.v, 3) + ' M NaOH', bx + bw / 2 + 38, Y(0) - 20, cc, { size: 20, weight: 600 });
    /* the flask under the tip, its liquid rising with the titrant, pink once the end point is reached */
    const fx = bx, ftop = 470, fbot = 596, liquid = (VS.v + V) / 100;
    const shape = (y) => (y < ftop + 26 ? 22 : 22 + (y - ftop - 26) * 0.95);
    const ly = fbot - (fbot - ftop - 30) * Math.min(1, liquid);
    ctx.save(); ctx.fillStyle = reached ? alpha(F.fact(INDICATOR_PINK), 0.55) : alpha(PAL.muted, 0.14); ctx.beginPath(); ctx.moveTo(fx - shape(ly), ly); ctx.lineTo(fx + shape(ly), ly); ctx.lineTo(fx + shape(fbot), fbot); ctx.lineTo(fx - shape(fbot), fbot); ctx.closePath(); ctx.fill(); ctx.restore();
    ctx.save(); ctx.strokeStyle = F.ref('sample'); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(fx - 22, ftop); ctx.lineTo(fx - 22, ftop + 26); ctx.lineTo(fx - shape(fbot), fbot); ctx.lineTo(fx + shape(fbot), fbot); ctx.lineTo(fx + 22, ftop + 26); ctx.lineTo(fx + 22, ftop); ctx.stroke(); ctx.restore();
    text(ctx, fmt(VS.v, 2) + ' mL HCl sample', fx + shape(fbot) + 16, fbot - 40, cv, { size: 20, weight: 600 });
    text(ctx, reached ? 'the indicator has turned' : 'with a few drops of indicator', fx + shape(fbot) + 16, fbot - 12, PAL.muted, { size: 17 });
    /* drops falling from the tip while the stopcock is open */
    hits.length = 0;
    if (!done) for (let i = 0; i < 3; i++) { const ph = (tau * 2.4 + i / 3) % 1, y = Y(CAP) + 70 + ph * (ly - Y(CAP) - 74); dot(ctx, bx, y, alpha(cc, 0.8), true, 5); hits.push({ x: bx, y, r: 10, name: 'a drop of NaOH titrant' }); }
    hits.push({ x: bx, y: (Y(V) + Y(CAP)) / 2, r: 30, name: 'buret of ' + fmt(MT.v, 3) + ' M NaOH, ' + fmt(V, 2) + ' mL delivered' }, { x: fx, y: (ly + fbot) / 2, r: 60, name: 'flask of HCl sample, ' + fmt(nA, 2) + ' mmol HCl' });
    /* the graph: mmol against mL of NaOH delivered; axes fixed at 0–50 mL and 0–20 mmol, the most the sliders put in the sample being 15 mmol */
    const box = { l: 640, r: 1320, t: 170, b: 520 };
    const { X, Y: GY } = axes(ctx, box, [0, 50], [0, 20], { nx: 5, ny: 4, xl: 'NaOH delivered (mL)', xc: cv, yl: 'amount (mmol)', yc: cn });
    const top = Math.min(CAP, 20 / MT.v);
    F.curve(ctx, (v) => MT.v * v, 0, top, X, GY, cn, 4);
    line(ctx, box.l, GY(nA), box.r, GY(nA), cn, 3, [10, 10]);
    text(ctx, fmt(nA, 2) + ' mmol HCl in the sample', box.r, GY(nA) - 18, cn, { size: 18, weight: 600, align: 'right', bg: PAL.panel });
    text(ctx, 'mmol NaOH delivered', X(Math.min(top, 50)) - 10, GY(MT.v * Math.min(top, 50)) + (MT.v * top > 17 ? 26 : -22), cn, { size: 18, align: 'right', bg: PAL.panel });
    if (Veq <= CAP) { line(ctx, X(Veq), GY(nA), X(Veq), box.b, alpha(PAL.ink, 0.4), 2.5, [4, 8]); text(ctx, 'end point ' + fmt(Veq, 2) + ' mL', X(Veq), box.b - 18, PAL.ink, { size: 17, align: Veq > 40 ? 'right' : 'center', bg: PAL.panel }); }
    F.pinned(ctx, box, X, GY, V, nT, cn);
    headline(ctx, reached ? 'The indicator turns after ' + fmt(Veq, 2) + ' mL of ' + fmt(MT.v, 3) + ' M NaOH, which is ' + fmt(nA, 2) + ' mmol, so the ' + fmt(VS.v, 2) + '-mL sample of HCl is ' + fmt(MA.v, 3) + ' M.'
      : Veq > CAP && done ? 'The buret empties after 50.00 mL, ' + fmt(CAP * MT.v, 2) + ' mmol of NaOH, before it has matched the ' + fmt(nA, 2) + ' mmol of HCl in the sample, so no end point is reached.'
      : 'The buret has delivered ' + fmt(V, 2) + ' mL of ' + fmt(MT.v, 3) + ' M NaOH, which is ' + fmt(nT, 2) + ' mmol, into ' + fmt(nA, 2) + ' mmol of HCl.');
    readout(d.readout, Veq <= CAP
      ? `\\kM_{\\text{HCl}} = \\frac{\\kV_{\\text{NaOH}}\\times\\kM_{\\text{NaOH}}\\times\\frac{1\\ \\text{mmol HCl}}{1\\ \\text{mmol NaOH}}}{\\kV_{\\text{sample}}} = \\frac{${hue('volume', fmt(Veq, 2) + '\\ \\text{mL}')}\\times ${hue('concentration', fmt(MT.v, 3) + '\\ \\text{M}')}\\times 1}{${hue('volume', fmt(VS.v, 2) + '\\ \\text{mL}')}} = ${hue('concentration', fmt(MA.v, 3) + '\\ \\text{M}')}`
      : `\\kV_{\\text{NaOH}} = \\frac{${hue('volume', fmt(VS.v, 2) + '\\ \\text{mL}')}\\times ${hue('concentration', fmt(MA.v, 3) + '\\ \\text{M}')}}{${hue('concentration', fmt(MT.v, 3) + '\\ \\text{M}')}} = ${hue('volume', fmt(Veq, 2) + '\\ \\text{mL}')} > 50\\ \\text{mL}`,
      'A molarity is also millimoles per milliliter, so milliliters times molarity gives millimoles, and the end point is where the millimoles of NaOH delivered equal the millimoles of HCl in the sample, one for one by the equation.');
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();

/* =====================================================================
   The route boxes of Examples 4.14, 4.15 and 4.16, faithful copies.
   A box takes the hue of the quantity it holds, which is the book's own
   shading by kind in the scheme's colours; a percent, a ratio and a
   formula are untyped and ink. Still.
===================================================================== */
function routeFigure(id, H, boxes, edges, head, ro) {
  const d = sim(id, H);
  const BW = 210, BH = 90, GX = 150, Y0 = 120, GY = 60, cols = Math.max(...boxes.map((b) => b.c)) + 1, X0 = (1400 - cols * BW - (cols - 1) * GX) / 2;
  const at = (b) => ({ x: X0 + b.c * (BW + GX), y: Y0 + b.r * (BH + GY) });
  function draw() {
    const { ctx } = begin(d.c);
    edges.forEach(([a, b, lab]) => {
      const p = at(boxes[a]), q = at(boxes[b]);
      if (boxes[a].r === boxes[b].r) {
        const right = q.x > p.x, x1 = right ? p.x + BW : p.x, x2 = right ? q.x : q.x + BW, y = p.y + BH / 2;
        arrow(ctx, x1 + 6, y, x2 - 6, y, PAL.ink, 4);
        if (lab) lab.split('\n').forEach((s, i, all) => text(ctx, s, (x1 + x2) / 2, y + 28 + i * 22, PAL.ink, { size: 18, align: 'center' }));
      } else {
        const x = p.x + BW / 2, y1 = p.y + BH, y2 = q.y;
        arrow(ctx, x, y1 + 6, x, y2 - 6, PAL.ink, 4);
        if (lab) text(ctx, lab, x + 14, (y1 + y2) / 2, PAL.ink, { size: 18 });
      }
    });
    boxes.forEach((b) => {
      const p = at(b), col = b.type ? C(b.type) : PAL.ink;
      ctx.save(); ctx.fillStyle = b.type ? alpha(col, 0.16) : PAL.soft; ctx.strokeStyle = col; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.roundRect(p.x, p.y, BW, BH, 8); ctx.fill(); ctx.stroke(); ctx.restore();
      const ls = b.t.split('\n');
      ls.forEach((s, i) => text(ctx, s, p.x + BW / 2, p.y + BH / 2 + (i - (ls.length - 1) / 2) * 28, PAL.ink, { size: 23, weight: 600, align: 'center' }));
    });
    headline(ctx, head);
    readout(d.readout, ro);
  }
  still(d, draw);
}
routeFigure('fig-map7', 280,
  [{ c: 0, r: 0, t: 'Volume of NaOH', type: 'volume' }, { c: 1, r: 0, t: 'Moles of NaOH', type: 'amount' }, { c: 2, r: 0, t: 'Moles of HCl', type: 'amount' }, { c: 3, r: 0, t: 'Concentration\nof HCl', type: 'concentration' }],
  [[0, 1, 'Molar\nconcentration'], [1, 2, 'Stoichiometric\nfactor'], [2, 3, 'Solution\nvolume']],
  'A volume of titrant leads through moles of each substance to the concentration of the analyte.',
  `\\frac{${hue('volume', '35.23\\ \\text{mL NaOH}')}\\times ${hue('concentration', '0.250\\ \\text{mmol/mL}')}\\times\\frac{1\\ \\text{mmol HCl}}{1\\ \\text{mmol NaOH}}}{${hue('volume', '50.00\\ \\text{mL}')}} = ${hue('concentration', '0.176\\ \\text{M HCl}')}`);
routeFigure('fig-map8', 420,
  [{ c: 0, r: 0, t: 'Mass of BaSO₄', type: 'mass' }, { c: 1, r: 0, t: 'Moles of BaSO₄', type: 'amount' }, { c: 2, r: 0, t: 'Moles of MgSO₄', type: 'amount' }, { c: 2, r: 1, t: 'Mass of MgSO₄', type: 'mass' }, { c: 1, r: 1, t: 'Percent MgSO₄' }],
  [[0, 1, 'Molar mass'], [1, 2, 'Stoichiometric\nfactor'], [2, 3, 'Molar mass'], [3, 4, 'Sample\nmass']],
  'The mass of the precipitate leads through moles to the mass of the analyte and its percent of the sample.',
  `\\frac{${hue('mass', '0.3181\\ \\text{g MgSO}_4')}}{${hue('mass', '0.4550\\ \\text{g sample}')}}\\times 100\\% = 69.91\\%`);
routeFigure('fig-combmap', 690,
  [{ c: 0, r: 0, t: 'Mass of CO₂', type: 'mass' }, { c: 1, r: 0, t: 'Moles of CO₂', type: 'amount' }, { c: 2, r: 0, t: 'Moles of C', type: 'amount' }, { c: 3, r: 0, t: 'Mass of C', type: 'mass' },
   { c: 0, r: 1, t: 'Mass of H₂O', type: 'mass' }, { c: 1, r: 1, t: 'Moles of H₂O', type: 'amount' }, { c: 2, r: 1, t: 'Moles of H', type: 'amount' }, { c: 3, r: 1, t: 'Mass of H', type: 'mass' },
   { c: 2, r: 2, t: 'C to H\nmole ratio' }, { c: 3, r: 2, t: 'Percent\ncomposition' }, { c: 2, r: 3, t: 'Empirical\nformula' }],
  [[0, 1, 'Molar mass'], [1, 2, 'Stoichiometric\nfactor'], [2, 3, ''], [4, 5, 'Molar mass'], [5, 6, 'Stoichiometric\nfactor'], [6, 7, ''], [6, 8, ''], [7, 9, ''], [8, 10, '']],
  'The masses of the two products lead to the moles of carbon and hydrogen, their ratio, and the empirical formula.',
  `\\frac{\\text{mol H}}{\\text{mol C}} = \\frac{${hue('amount', '1.79\\times 10^{-4}\\ \\text{mol H}')}}{${hue('amount', '8.95\\times 10^{-5}\\ \\text{mol C}')}} = \\frac{2\\ \\text{mol H}}{1\\ \\text{mol C}}`);

/* =====================================================================
   FIGURE 4.18: a combustion analysis train, drawn flat as the book draws
   it. The reader sets the mass each absorber gains; beneath each the
   moles of H or C it stands for, and the headline the ratio and the
   empirical formula. Still: the readings answer the sliders; the gas
   stream is notation, drawn once. The furnace, the sample and the two
   absorbers are the caption's referents, outlined and named in their own
   colours; the furnace glow and the absorber grains stay facts.
===================================================================== */
(function () {
  const d = sim('sim-combustion', 470);
  const MC = ctl(d.controls, { label: '\\km_{\\text{CO}_2}', cls: 'mass', min: 1, max: 10, step: 0.01, value: 3.94, unit: 'mg', dec: 2, aria: 'mass gained by the carbon dioxide absorber' });
  const MH = ctl(d.controls, { label: '\\km_{\\text{H}_2\\text{O}}', cls: 'mass', min: 0.5, max: 5, step: 0.01, value: 1.61, unit: 'mg', dec: 2, aria: 'mass gained by the water absorber' });
  let hits = []; F.hover(d.stage, () => hits);
  /* grains in an absorber, at fixed places so the drawing never shimmers */
  function grains(ctx, x0, x1, y0, y1, color, n, seed) {
    let s = seed; const rnd = () => { s = (s * 16807) % 2147483647; return s / 2147483647; };
    for (let i = 0; i < n; i++) { const x = x0 + rnd() * (x1 - x0), y = y0 + rnd() * (y1 - y0); dot(ctx, x, y, alpha(color, 0.45 + 0.5 * rnd()), true, 6); }
  }
  function capsule(ctx, x0, x1, yc, h, rim = PAL.muted) {
    ctx.save(); ctx.strokeStyle = rim; ctx.lineWidth = 3; ctx.fillStyle = alpha(PAL.panel, 0.4); ctx.beginPath(); ctx.roundRect(x0, yc - h / 2, x1 - x0, h, h / 2); ctx.fill(); ctx.stroke(); ctx.restore();
  }
  function formula(nC, nH) {
    const r = nH / nC;
    for (let k = 1; k <= 8; k++) { const h = r * k; if (Math.abs(h - Math.round(h)) < 0.08 * k && Math.round(h) >= 1) return { c: k, h: Math.round(h) }; }
    return null;
  }
  function draw() {
    const { ctx } = begin(d.c);
    const cm = C('mass'), cn = C('amount');
    const yc = 250;
    const nC = MC.v / 1000 / 44.01, nH = (2 * MH.v) / 1000 / 18.02, f = formula(nC, nH);
    const name = f ? 'C' + SUB[f.c] + 'H' + SUB[f.h] : null;
    /* the oxygen stream in, the furnace and the sample boat */
    arrow(ctx, 40, yc, 150, yc, PAL.ink, 4); text(ctx, 'O₂', 40, yc - 30, PAL.ink, { size: 22, weight: 600 });
    const rf = F.ref('furnace'), rs = F.ref('combustion-sample');
    ctx.save(); ctx.fillStyle = alpha(F.fact(FURNACE), 0.28); ctx.strokeStyle = rf; ctx.lineWidth = 3; ctx.fillRect(170, 130, 300, 240); ctx.strokeRect(170, 130, 300, 240); ctx.restore();
    ctx.save(); ctx.fillStyle = PAL.panel; ctx.fillRect(200, 180, 240, 140); ctx.restore();
    line(ctx, 150, yc - 10, 540, yc - 10, PAL.muted, 3); line(ctx, 150, yc + 10, 540, yc + 10, PAL.muted, 3);
    capsule(ctx, 210, 430, yc, 100);
    ctx.save(); ctx.fillStyle = alpha(rs, 0.55); ctx.beginPath(); ctx.ellipse(320, yc + 30, 80, 12, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore();
    text(ctx, 'Furnace', 320, 106, rf, { size: 20, align: 'center' });
    text(ctx, 'Sample', 320, 400, rs, { size: 20, align: 'center' }); line(ctx, 320, 382, 320, yc + 44, rs, 1.5);
    arrow(ctx, 250, yc, 380, yc, PAL.ink, 4);
    text(ctx, 'CO₂, H₂O, O₂, and other gases', 500, 120, PAL.ink, { size: 18 }); line(ctx, 540, 132, 515, yc - 12, PAL.ink, 1.5);
    /* the water absorber, then the carbon dioxide absorber */
    const A = [{ x0: 560, x1: 800, color: F.fact(H2O_ABSORBER), who: 'h2o-absorber', seed: 7, head: 'H₂O absorber', sub: 'such as Mg(ClO₄)₂', gain: MH.v, what: 'H₂O', n: nH, el: 'H' },
               { x0: 880, x1: 1120, color: F.fact(CO2_ABSORBER), who: 'co2-absorber', seed: 19, head: 'CO₂ absorber', sub: 'such as NaOH', gain: MC.v, what: 'CO₂', n: nC, el: 'C' }];
    line(ctx, 800, yc - 10, 880, yc - 10, PAL.muted, 3); line(ctx, 800, yc + 10, 880, yc + 10, PAL.muted, 3);
    line(ctx, 1120, yc - 10, 1180, yc - 10, PAL.muted, 3); line(ctx, 1120, yc + 10, 1180, yc + 10, PAL.muted, 3);
    arrow(ctx, 470, yc, 560, yc, PAL.ink, 4); arrow(ctx, 790, yc, 880, yc, PAL.ink, 4); arrow(ctx, 1110, yc, 1230, yc, PAL.ink, 4);
    text(ctx, 'O₂ and', 1240, yc - 14, PAL.ink, { size: 18 }); text(ctx, 'other gases', 1240, yc + 12, PAL.ink, { size: 18 });
    hits.length = 0;
    A.forEach((a) => {
      const rc = F.ref(a.who);
      capsule(ctx, a.x0, a.x1, yc, 100, rc);
      grains(ctx, a.x0 + 24, a.x1 - 24, yc - 38, yc + 38, a.color, 70, a.seed);
      arrow(ctx, a.x0 + 40, yc, a.x1 - 40, yc, PAL.ink, 4);
      const cx = (a.x0 + a.x1) / 2;
      text(ctx, a.head, cx, 334, rc, { size: 19, align: 'center' });
      text(ctx, a.sub, cx, 358, PAL.muted, { size: 16, align: 'center' });
      text(ctx, 'gains ' + fmt(a.gain, 2) + ' mg ' + a.what, cx, 396, cm, { size: 19, weight: 600, align: 'center' });
      text(ctx, sciText(a.n) + ' mol ' + a.el, cx, 426, cn, { size: 19, weight: 600, align: 'center' });
      hits.push({ x: cx, y: yc, r: 60, name: a.head + ' ' + a.sub + ', gaining ' + fmt(a.gain, 2) + ' mg of ' + a.what });
    });
    hits.push({ x: 320, y: yc + 30, r: 50, name: 'the sample burning in the stream of oxygen' });
    const ratio = nH / nC;
    headline(ctx, 'The absorbers gain ' + fmt(MH.v, 2) + ' mg of water and ' + fmt(MC.v, 2) + ' mg of carbon dioxide, so the sample held ' + fmt(ratio, 2) + ' mol H for every mol C'
      + (name ? ' and its empirical formula is ' + name + '.' : ', a ratio no small whole numbers give.'));
    readout(d.readout, `\\frac{\\kn_{\\text{H}}}{\\kn_{\\text{C}}} = \\frac{${hue('mass', fmt(MH.v, 2) + '\\ \\text{mg}')}\\times\\frac{2}{18.02\\ \\text{mg/mmol}}}{${hue('mass', fmt(MC.v, 2) + '\\ \\text{mg}')}\\times\\frac{1}{44.01\\ \\text{mg/mmol}}} = \\frac{${hue('amount', (nH * 1000).toPrecision(3) + '\\ \\text{mmol}')}}{${hue('amount', (nC * 1000).toPrecision(3) + '\\ \\text{mmol}')}} = ${fmt(ratio, 2)}`,
      'Each mole of water carries two moles of hydrogen and each mole of carbon dioxide one mole of carbon, and the smallest whole numbers in the ratio of the two are the subscripts of the empirical formula.');
  }
  still(d, draw);
})();
};
