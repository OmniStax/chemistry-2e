/* Figures for section 4.5 Quantitative Chemical Analysis. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['4.5'] = function (root, F) {
const { fmt, tex, C, PAL, alpha, ctl, cycle, register, begin, line, arrow, dot, text, headline, axes } = F;
const sim = (id, H) => F.sim(root, id, H);
const TAU = 2 * Math.PI;
const clamp = (x, lo, hi) => Math.min(hi, Math.max(lo, x));
const smooth = (k) => { const t = clamp(k, 0, 1); return t * t * (3 - 2 * t); };
/* a value in its category's colour inside a readout: the number wears the hue, the signs around it stay ink (rule 26.17) */
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;
/* a readout is written when its numbers change, not on every frame of a moving figure */
const once = (host) => { let last = ''; return (s) => { if (s !== last) { last = s; tex(host, s); } }; };
/* a deterministic scatter, the same on every redraw */
const rnd = (i) => { const s = Math.sin(i * 12.9898 + 78.233) * 43758.5453; return s - Math.floor(s); };
const sub = (n) => (n === 1 ? '' : String(n).split('').map((c) => '₀₁₂₃₄₅₆₇₈₉'[c]).join(''));

/* colours that are physical facts (book RULES, Files): the pink an acid-base indicator such as phenolphthalein takes
   at the end point, the green and blue grains the book draws in the two absorbers, and the glow of the furnace;
   each is drawn through F.fact */
const INDICATOR_PINK = '#e8559b';
const H2O_ABSORBER = '#8cc63f';
const CO2_ABSORBER = '#4a6fe0';
const FURNACE = '#e2462a';

/* =====================================================================
   SIM: a titration of HCl with NaOH, run to its end point.
   A buret clamped to a stand delivers titrant through its stopcock into
   a flask of sample; the graph beside it sets the millimoles of NaOH
   delivered against the millimoles of HCl in the sample, and the
   indicator turns when the two are equal. Moving: a titration has a
   clock, and the stopcock is closed at the end point. Flat: the lesson
   is the volume read against the amounts, and a turn of the bench would
   show nothing more (root rule 28.5). The buret and the flask of sample
   are the caption's referents, their glass in their own colours.
===================================================================== */
(function () {
  const d = sim('sim-titration', 720);
  const MT = ctl(d.controls, { label: '\\kM_{\\text{NaOH}}', cls: 'concentration', min: 0.1, max: 0.5, step: 0.001, value: 0.25, unit: 'M', dec: 3, onInput: reset, aria: 'molarity of the sodium hydroxide titrant' });
  const VS = ctl(d.controls, { label: '\\kV_{\\text{sample}}', cls: 'volume', min: 10, max: 50, step: 0.5, value: 50, unit: 'mL', dec: 2, onInput: reset, aria: 'volume of the hydrochloric acid sample' });
  const MA = ctl(d.controls, { label: '\\kM_{\\text{HCl}}', cls: 'concentration', key: 'acid', min: 0.05, max: 0.3, step: 0.001, value: 0.176, unit: 'M', dec: 3, onInput: reset, aria: 'molarity of the hydrochloric acid' });
  /* Example 4.14 reads 35.23 mL of 0.250 M NaOH into 50.00 mL, which is 0.17615 M and is given as 0.176 M. At the
     slider's 0.176 M the acid is therefore the example's 0.17615 M, so that the figure opens on the book's 35.23 mL and
     8.81 mmol; every other setting is the molarity shown */
  const acid = () => (Math.abs(MA.v - 0.176) < 1e-9 ? 0.17615 : MA.v);
  const RATE = 8, CAP = 50;                                  /* mL delivered per second of the figure's clock; the buret holds 50 mL */
  const veq = () => (VS.v * acid()) / MT.v;
  const vend = () => Math.min(veq(), CAP);
  const cy = cycle(() => Math.max(vend() / RATE, 1.2), 1.6);
  function reset() { cy.reset(); }
  const hits = []; F.hover(d.stage, () => hits);
  const say = once(d.readout);
  /* the bench: a stand (base and rod), a clamp, the buret with its stopcock and tip, and the flask on the base */
  const BENCH = 700, BX = 330, BW = 30, RODX = 150, Y = (mL) => 136 + 7 * mL, COCK = Y(CAP) + 34, TIP = COCK + 52;
  const FB = BENCH - 28, FN = FB - 96, FM = FN - 30, WB = 92, WN = 23;      /* the flask: bottom, base of the neck, mouth; half-widths at bottom and neck */
  /* the level a volume stands at in the conical flask, which holds 125 mL to the base of its neck: the volume under a
     level goes as the cube of the half-width there, so the drawn liquid is the volume named */
  const levelOf = (mL) => { const w = Math.cbrt(WB ** 3 - clamp(mL / 125, 0, 1) * (WB ** 3 - WN ** 3)); return { y: FB - ((WB - w) / (WB - WN)) * (FB - FN), w }; };
  const flaskPath = (ctx) => { ctx.beginPath(); ctx.moveTo(BX - WN - 5, FM); ctx.lineTo(BX - WN, FM + 6); ctx.lineTo(BX - WN, FN); ctx.lineTo(BX - WB + 3, FB - 10); ctx.quadraticCurveTo(BX - WB, FB, BX - WB + 12, FB); ctx.lineTo(BX + WB - 12, FB); ctx.quadraticCurveTo(BX + WB, FB, BX + WB - 3, FB - 10); ctx.lineTo(BX + WN, FN); ctx.lineTo(BX + WN, FM + 6); ctx.lineTo(BX + WN + 5, FM); };
  function draw() {
    const { ctx } = begin(d.c);
    const cv = C('volume'), cc = C('concentration'), cn = C('amount'), rb = F.ref('buret'), rs = F.ref('sample'), pink = F.fact(INDICATOR_PINK);
    const Veq = veq(), Vend = vend(), T = Math.max(Vend / RATE, 1.2), tau = isFinite(cy.now()) ? cy.now() : T;
    const V = Math.min(Vend, (tau / T) * Vend), done = tau >= T - 1e-9, reached = done && Veq <= CAP;
    const nA = VS.v * acid(), nT = V * MT.v;
    hits.length = 0;
    /* the stand */
    line(ctx, 60, BENCH, 640, BENCH, PAL.rule, 2);
    ctx.save(); ctx.fillStyle = PAL.soft; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2.5; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.roundRect(RODX - 50, FB, BX + WB + 40 - (RODX - 50), BENCH - FB, 5); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.roundRect(RODX - 5, 56, 10, FB - 56, 3); ctx.fill(); ctx.stroke();
    /* the clamp: a boss on the rod, an arm, and two jaws that grip the tube above and below the arm */
    const CY = Y(25);
    ctx.beginPath(); ctx.roundRect(RODX - 14, CY - 16, 28, 32, 4); ctx.fill(); ctx.stroke();
    ctx.fillRect(RODX + 14, CY - 5, BX - BW / 2 - 12 - RODX - 14, 10); ctx.strokeRect(RODX + 14, CY - 5, BX - BW / 2 - 12 - RODX - 14, 10);
    [-1, 1].forEach((s) => { ctx.beginPath(); ctx.moveTo(BX - BW / 2 - 12, CY + s * 4); ctx.lineTo(BX - BW / 2 - 12, CY + s * 21); ctx.lineTo(BX + BW / 2 + 7, CY + s * 21); ctx.lineTo(BX + BW / 2 + 7, CY + s * 13); ctx.lineTo(BX - BW / 2 - 3, CY + s * 13); ctx.lineTo(BX - BW / 2 - 3, CY + s * 4); ctx.closePath(); ctx.fill(); ctx.stroke(); });
    ctx.restore();
    /* the titrant left in the buret, down through the taper to the stopcock */
    ctx.save(); ctx.fillStyle = alpha(cv, 0.24); ctx.beginPath(); ctx.moveTo(BX - BW / 2, Y(V)); ctx.lineTo(BX + BW / 2, Y(V)); ctx.lineTo(BX + BW / 2, Y(CAP) + 10); ctx.lineTo(BX + 5, COCK - 8); ctx.lineTo(BX - 5, COCK - 8); ctx.lineTo(BX - BW / 2, Y(CAP) + 10); ctx.closePath(); ctx.fill(); ctx.restore();
    /* the buret's glass: an open tube, a taper to the stopcock, and the tip below it */
    ctx.save(); ctx.strokeStyle = rb; ctx.lineWidth = 3; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    [-1, 1].forEach((s) => { ctx.beginPath(); ctx.moveTo(BX + s * (BW / 2 + 4), Y(0) - 66); ctx.lineTo(BX + s * BW / 2, Y(0) - 60); ctx.lineTo(BX + s * BW / 2, Y(CAP) + 10); ctx.lineTo(BX + s * 5, COCK - 8); ctx.moveTo(BX + s * 5, COCK + 8); ctx.lineTo(BX + s * 5, TIP - 22); ctx.lineTo(BX + s * 2.5, TIP); ctx.stroke(); });
    ctx.restore();
    for (let mL = 0; mL <= CAP; mL++) { const big = mL % 10 === 0, mid = mL % 5 === 0; line(ctx, BX + BW / 2, Y(mL), BX + BW / 2 - (big ? BW : mid ? 19 : 11), Y(mL), PAL.ink, big ? 2 : 1.1); if (big) text(ctx, String(mL), BX + BW / 2 + 10, Y(mL), PAL.muted, { size: 17 }); }
    text(ctx, 'mL', BX + BW / 2 + 10, Y(0) - 24, PAL.muted, { size: 17 });
    /* the stopcock: a barrel across the tube and a key, in line with the tube while it is open and across it once closed */
    ctx.save(); ctx.fillStyle = PAL.soft; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2.5; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.roundRect(BX - 20, COCK - 8, 40, 16, 4); ctx.fill(); ctx.stroke();
    ctx.fillStyle = PAL.ink; ctx.beginPath(); if (done) ctx.roundRect(BX - 15, COCK - 3.5, 30, 7, 3); else ctx.roundRect(BX - 3.5, COCK - 15, 7, 30, 3); ctx.fill(); ctx.restore();
    /* the surface in the buret, read at the bottom of its meniscus, and the reading carried out to the right */
    ctx.save(); ctx.strokeStyle = cv; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(BX - BW / 2 + 2, Y(V) - 3); ctx.quadraticCurveTo(BX, Y(V) + 3, BX + BW / 2 - 2, Y(V) - 3); ctx.stroke(); ctx.restore();
    line(ctx, BX + BW / 2 + 40, Y(V), BX + BW / 2 + 62, Y(V), cv, 2.5);
    F.rich(ctx, [[fmt(V, 2) + ' mL', cv], ' delivered'], BX + BW / 2 + 70, Y(V), { size: 21, weight: 600 });
    F.rich(ctx, [['buret', rb], ' of ', [fmt(MT.v, 3) + ' M', cc], ' NaOH'], BX + BW / 2 + 22, Y(0) - 56, { size: 21 });
    text(ctx, done ? 'stopcock, closed' : 'stopcock, open', BX + 34, COCK, PAL.ink, { size: 18 });
    /* the flask under the tip: its liquid stands at the level the sample and the titrant added come to, colourless
       until the end point and pink from it; near the end point the pink shows where each drop lands and fades */
    const lv = levelOf(VS.v + V);
    ctx.save(); flaskPath(ctx); ctx.clip();
    ctx.fillStyle = reached ? alpha(pink, 0.55) : alpha(cv, 0.2); ctx.fillRect(BX - WB - 4, lv.y, 2 * WB + 8, FB - lv.y + 4);
    const near = done ? 0 : smooth((V / Veq - 0.8) / 0.2);
    if (near > 0) { const g = ctx.createRadialGradient(BX, lv.y, 2, BX, lv.y, 46); g.addColorStop(0, alpha(pink, 0.6 * near)); g.addColorStop(1, alpha(pink, 0)); ctx.fillStyle = g; ctx.fillRect(BX - WB, lv.y, 2 * WB, FB - lv.y); }
    ctx.restore();
    ctx.save(); ctx.strokeStyle = rs; ctx.lineWidth = 3; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; flaskPath(ctx); ctx.stroke(); ctx.restore();
    line(ctx, BX - lv.w + 3, lv.y, BX + lv.w - 3, lv.y, reached ? pink : cv, 2.5);
    F.rich(ctx, [['sample', rs], ': ', [fmt(VS.v, 2) + ' mL', cv], ' of HCl'], BX + WB + 36, FB - 62, { size: 21 });
    text(ctx, reached ? 'the indicator is pink' : 'and a few drops of indicator', BX + WB + 36, FB - 34, reached ? pink : PAL.ink, { size: 18 });
    /* drops falling from the tip while the stopcock is open */
    if (!done) for (let i = 0; i < 3; i++) { const ph = (tau * 2.4 + i / 3) % 1, y = TIP + 8 + ph * (lv.y - TIP - 12); dot(ctx, BX, y, alpha(cv, 0.75), true, 5); hits.push({ x: BX, y, r: 10, name: 'a drop of NaOH titrant' }); }
    hits.push({ x: BX, y: (Y(V) + Y(CAP)) / 2, r: 26, name: 'buret of ' + fmt(MT.v, 3) + ' M NaOH, ' + fmt(V, 2) + ' mL delivered' },
      { x: BX, y: COCK, r: 22, name: done ? 'stopcock, closed at the end point' : 'stopcock, open' },
      { x: BX, y: TIP - 14, r: 12, name: 'tip of the buret' },
      { x: (RODX + BX) / 2, y: CY, r: 30, name: 'clamp that holds the buret upright' },
      { x: RODX, y: 380, r: 18, name: 'stand' }, { x: RODX, y: BENCH - 14, r: 26, name: 'stand' },
      { x: BX, y: (lv.y + FB) / 2, r: 60, name: 'flask of HCl sample and indicator, ' + fmt(nA, 2) + ' mmol HCl' });
    /* the graph: mmol against mL of NaOH delivered; axes fixed at 0–50 mL (the buret) and 0–25 mmol (50 mL of 0.5 M NaOH;
       the most the sliders put in the sample is 15 mmol) */
    const box = { l: 800, r: 1340, t: 160, b: 610 };
    const ax = axes(ctx, box, [0, 50], [0, 25], { nx: 5, ny: 5, xl: 'NaOH delivered (mL)', xc: cv, yl: 'amount (mmol)', yc: cn });
    const { X, Y: GY } = ax;
    line(ctx, box.l, GY(nA), box.r, GY(nA), cn, 3, [10, 10]);
    line(ctx, X(0), GY(0), X(CAP), GY(MT.v * CAP), alpha(cn, 0.3), 3);
    line(ctx, X(0), GY(0), X(V), GY(nT), cn, 5);
    F.legend(ctx, ax, [{ s: 'NaOH delivered', color: cn, w: 5 }, { s: 'HCl in the sample', color: cn, w: 3, dash: [10, 10] }], { corner: 'tl' });
    const left = Veq >= 12;
    F.rich(ctx, [[fmt(nA, 2) + ' mmol', cn], ' HCl'], left ? box.l + 14 : box.r - 10, GY(nA) - 18, { size: 19, weight: 600, align: left ? 'left' : 'right' });
    if (Veq <= CAP) {
      line(ctx, X(Veq), GY(nA), X(Veq), box.b, alpha(PAL.ink, 0.4), 2.5, [4, 8]);
      dot(ctx, X(Veq), GY(nA), cn, false, 10);
      const tw = F.measure(ctx, 'end point ' + fmt(Veq, 2) + ' mL', { size: 19 }), room = GY(nA) < box.b - 44;
      const lx = clamp(X(Veq) + 12, box.l + 8, box.r - tw - 8), flip = X(Veq) + 12 + tw > box.r - 8;
      F.rich(ctx, ['end point ', [fmt(Veq, 2) + ' mL', cv]], flip ? X(Veq) - 12 - tw : lx, room ? box.b - 22 : GY(nA) - 46, { size: 19 });
    }
    F.pinned(ctx, box, X, GY, V, nT, cn);
    headline(ctx, reached ? 'The indicator turns pink at ' + fmt(Veq, 2) + ' mL: ' + fmt(nA, 2) + ' mmol of NaOH has met ' + fmt(nA, 2) + ' mmol of HCl.'
      : Veq > CAP && done ? 'The buret is empty at 50.00 mL: ' + fmt(CAP * MT.v, 2) + ' mmol of NaOH, short of the ' + fmt(nA, 2) + ' mmol of HCl.'
      : fmt(V, 2) + ' mL of NaOH delivered: ' + fmt(nT, 2) + ' mmol, against ' + fmt(nA, 2) + ' mmol of HCl.');
    say(Veq <= CAP
      ? `\\kM_{\\text{HCl}} = \\frac{\\kV_{\\text{NaOH}}\\times\\kM_{\\text{NaOH}}\\times\\frac{1\\ \\text{mmol HCl}}{1\\ \\text{mmol NaOH}}}{\\kV_{\\text{sample}}} = \\frac{${hue('volume', fmt(Veq, 2) + '\\ \\text{mL}')}\\times ${hue('concentration', fmt(MT.v, 3) + '\\ \\text{M}')}\\times 1}{${hue('volume', fmt(VS.v, 2) + '\\ \\text{mL}')}} = ${hue('concentration', fmt(MA.v, 3) + '\\ \\text{M}')}`
      : `\\kV_{\\text{NaOH}} = \\frac{\\kV_{\\text{sample}}\\times\\kM_{\\text{HCl}}}{\\kM_{\\text{NaOH}}} = \\frac{${hue('volume', fmt(VS.v, 2) + '\\ \\text{mL}')}\\times ${hue('concentration', fmt(MA.v, 3) + '\\ \\text{M}')}}{${hue('concentration', fmt(MT.v, 3) + '\\ \\text{M}')}} = ${hue('volume', fmt(Veq, 2) + '\\ \\text{mL}')} > ${hue('volume', '50.00\\ \\text{mL}')}`);
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();

/* =====================================================================
   FIGURE 4.18: a combustion analysis train, drawn flat as the book draws
   it. Oxygen enters at the left; the sample burns in a tube inside the
   furnace; the gases pass through the water absorber and then the carbon
   dioxide absorber and leave at the right. Moving: the book's arrows are
   a gas flowing, so the molecules flow: water stops in the first
   absorber, carbon dioxide in the second, oxygen passes through both.
   The reader sets the mass each absorber gains, and the molecules drawn
   are in proportion to the moles those masses are. The furnace, the
   sample and the two absorbers are the caption's referents; the furnace
   glow and the absorber grains stay facts.
===================================================================== */
(function () {
  const d = sim('sim-combustion', 540);
  const T = 6, cy = cycle(() => T, 1.8);
  const MH = ctl(d.controls, { label: '\\km_{\\text{H}_2\\text{O}}', cls: 'mass', key: 'water', min: 0.5, max: 5, step: 0.01, value: 1.61, unit: 'mg', dec: 2, onInput: () => cy.reset(), aria: 'mass gained by the water absorber' });
  const MC = ctl(d.controls, { label: '\\km_{\\text{CO}_2}', cls: 'mass', key: 'carbon-dioxide', min: 1, max: 10, step: 0.01, value: 3.94, unit: 'mg', dec: 2, onInput: () => cy.reset(), aria: 'mass gained by the carbon dioxide absorber' });
  const hits = []; F.hover(d.stage, () => hits);
  const say = once(d.readout);
  /* the train along one axis: narrow tubes of half-height TH joining three wide tubes of half-height R */
  const YC = 268, TH = 15, R = 64, X0 = 124, X1 = 1172;
  const WIDE = [{ a: 226, b: 478 }, { a: 604, b: 830 }, { a: 892, b: 1118 }];          /* combustion tube, water absorber, carbon dioxide absorber */
  const SX = 330;                                                                          /* the middle of the sample */
  /* half the bore at x: the narrow tube, or a wide tube with its round ends */
  const bore = (x) => { for (const w of WIDE) if (x > w.a && x < w.b) { const e = Math.min(x - w.a, w.b - x); return e >= R ? R : Math.max(TH, Math.sqrt(R * R - (R - e) * (R - e))); } return TH; };
  const dip = Math.asin(TH / R), lip = R - R * Math.cos(dip);
  /* one wall of the glass (s = −1 the upper, 1 the lower) from x = a to x = b, round ends on every wide tube */
  function wall(ctx, s, a, b) {
    ctx.moveTo(a, YC + s * TH);
    WIDE.forEach((w) => {
      if (w.b < a || w.a > b) return;
      ctx.lineTo(w.a + lip, YC + s * TH);
      if (s < 0) { ctx.arc(w.a + R, YC, R, Math.PI + dip, 1.5 * Math.PI); ctx.lineTo(w.b - R, YC - R); ctx.arc(w.b - R, YC, R, 1.5 * Math.PI, TAU - dip); }
      else { ctx.arc(w.a + R, YC, R, Math.PI - dip, 0.5 * Math.PI, true); ctx.lineTo(w.b - R, YC + R); ctx.arc(w.b - R, YC, R, 0.5 * Math.PI, dip, true); }
    });
    ctx.lineTo(b, YC + s * TH);
  }
  function atom(ctx, x, y, sym, r) {
    ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fillStyle = F.el(sym); ctx.fill();
    ctx.lineWidth = sym === 'H' ? 1.6 : 1; ctx.strokeStyle = sym === 'H' ? PAL.ink : alpha(PAL.ink, 0.4); ctx.stroke(); ctx.restore();
  }
  const MOL = {
    O2: { of: 'an oxygen molecule, O₂', atoms: [['O', -7.5, 0, 8.5], ['O', 7.5, 0, 8.5]] },
    CO2: { of: 'a carbon dioxide molecule, CO₂', atoms: [['O', -14, 0, 8.5], ['O', 14, 0, 8.5], ['C', 0, 0, 9]] },
    H2O: { of: 'a water molecule, H₂O', atoms: [['O', 0, -3, 8.5], ['H', -8.5, 5, 5.5], ['H', 8.5, 5, 5.5]] },
  };
  function molecule(ctx, key, x, y, a, named) {
    const co = Math.cos(a), si = Math.sin(a);
    MOL[key].atoms.forEach(([s, dx, dy, r]) => atom(ctx, x + dx * co - dy * si, y + dx * si + dy * co, s, r));
    if (named) hits.push({ x, y, r: 17, name: MOL[key].of + named });
  }
  /* grains in an absorber, at fixed places so the drawing never shimmers */
  function grains(ctx, w, color, seed) {
    for (let i = 0; i < 64; i++) { const x = w.a + 30 + rnd(seed + i) * (w.b - w.a - 60), y = YC + (rnd(seed + 200 + i) - 0.5) * 2 * (bore(x) - 12); dot(ctx, x, y, alpha(color, 0.3 + 0.4 * rnd(seed + 400 + i)), true, 6.5); }
  }
  function formula(nC, nH) {
    const r = nH / nC;
    for (let k = 1; k <= 6; k++) { const h = r * k; if (Math.abs(h - Math.round(h)) < 0.06 && Math.round(h) >= 1) return { c: k, h: Math.round(h) }; }
    return null;
  }
  /* the lump of sample in its boat, drawn s of its full size about the boat's floor */
  const LUMP = [[-74, 0], [-70, -12], [-52, -20], [-40, -14], [-26, -26], [-8, -30], [6, -20], [20, -28], [38, -24], [50, -12], [66, -14], [74, 0]];
  const lump = (ctx, s, y) => { ctx.beginPath(); LUMP.forEach(([dx, dy], i) => (i ? ctx.lineTo(SX + dx * s, y + dy * s) : ctx.moveTo(SX + dx * s, y + dy * s))); ctx.closePath(); };
  function draw() {
    const { ctx } = begin(d.c);
    const cm = C('mass'), rf = F.ref('furnace'), rs = F.ref('combustion-sample'), glow = F.fact(FURNACE);
    const tau = isFinite(cy.now()) ? cy.now() : T, p = tau / T;
    const nC = MC.v / 44.01, nH = (2 * MH.v) / 18.02, f = formula(nC, nH);              /* mmol of C and of H */
    const name = f ? 'C' + sub(f.c) + 'H' + sub(f.h) : null;
    hits.length = 0;
    /* the furnace: a block cut away to show its glowing lining round the combustion tube */
    const FL = 178, FR = 526, FT = YC - 152, FBM = YC + 152;
    ctx.save(); ctx.fillStyle = PAL.soft; ctx.strokeStyle = rf; ctx.lineWidth = 3; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.roundRect(FL, FT, FR - FL, FBM - FT, 6); ctx.fill(); ctx.stroke();
    const g = ctx.createLinearGradient(0, YC - 110, 0, YC + 110);
    g.addColorStop(0, alpha(glow, 0.2)); g.addColorStop(0.3, alpha(glow, 0.7)); g.addColorStop(0.7, alpha(glow, 0.7)); g.addColorStop(1, alpha(glow, 0.2));
    ctx.fillStyle = g; ctx.beginPath(); ctx.roundRect(FL + 26, YC - 110, FR - FL - 52, 220, 10); ctx.fill();
    ctx.strokeStyle = alpha(glow, 0.9); ctx.lineWidth = 2; ctx.stroke(); ctx.restore();
    /* the glass, filled with the page so the lining does not show through it, then its two walls */
    ctx.save(); ctx.fillStyle = PAL.panel; ctx.beginPath(); wall(ctx, -1, X0, X1); ctx.lineTo(X1, YC + TH);
    const lower = new Path2D(); wall(lower, 1, X0, X1); ctx.fill(); ctx.fill(lower);
    ctx.fillRect(X0, YC - TH, X1 - X0, 2 * TH); ctx.restore();
    /* the absorbers' grains under everything that moves */
    grains(ctx, WIDE[1], F.fact(H2O_ABSORBER), 7); grains(ctx, WIDE[2], F.fact(CO2_ABSORBER), 19);
    /* the sample in its boat: it burns away over the first part of the run, a dashed outline keeping its first size */
    const FLOOR = YC + R - 12, left = 1 - smooth((p - 0.03) / 0.6);
    ctx.save(); ctx.strokeStyle = alpha(rs, 0.7); ctx.lineWidth = 1.8; ctx.setLineDash([6, 6]); lump(ctx, 1, FLOOR); if (left < 0.97) ctx.stroke(); ctx.setLineDash([]);
    if (left > 0.01) {
      if (left < 0.99) { const hg = ctx.createRadialGradient(SX, FLOOR - 12, 4, SX, FLOOR - 12, 30 + 70 * left); hg.addColorStop(0, alpha(glow, 0.55)); hg.addColorStop(1, alpha(glow, 0)); ctx.fillStyle = hg; ctx.fillRect(SX - 110, FLOOR - 70, 220, 74); }
      ctx.fillStyle = alpha(rs, 0.6); ctx.strokeStyle = rs; ctx.lineWidth = 2.5; ctx.lineJoin = 'round'; lump(ctx, left, FLOOR); ctx.fill(); ctx.stroke();
    }
    ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2.5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(SX - 88, FLOOR - 8); ctx.quadraticCurveTo(SX - 86, FLOOR + 2, SX - 74, FLOOR + 2); ctx.lineTo(SX + 74, FLOOR + 2); ctx.quadraticCurveTo(SX + 86, FLOOR + 2, SX + 88, FLOOR - 8); ctx.stroke(); ctx.restore();
    /* the molecules. Oxygen streams through the whole train. Each product leaves the sample at its own moment, is carried
       along, and stops at a place among the grains of the absorber that takes it up: one drawn molecule for each
       0.01 mmol, so their numbers are in the ratio of the moles the two gains are */
    const lane = (x, k) => YC + Math.sin(x / 47 + k * 2.4) * Math.max(0, bore(x) - 19) * 0.62;
    const SPAN = X1 - X0;
    for (let i = 0; i < 9; i++) { const x = X0 + ((tau * 150 + (i * SPAN) / 9) % SPAN); molecule(ctx, 'O2', x, lane(x, i), Math.sin(x / 60 + i) * (bore(x) > TH ? 1 : 0.3), ', passing through'); }
    const SPEED = 760 / (0.33 * T);
    const caught = [0, 0];
    [{ key: 'H2O', n: clamp(Math.round((MH.v / 18.02) * 100), 1, 40), w: WIDE[1], seed: 31 }, { key: 'CO2', n: clamp(Math.round(nC * 100), 1, 40), w: WIDE[2], seed: 57 }].forEach((k, j) => {
      for (let i = 0; i < k.n; i++) {
        const born = T * (0.05 + (0.57 * (i + 0.5)) / k.n), x0 = SX - 50 + 100 * rnd(k.seed + i);
        if (tau < born) continue;
        /* its resting place: columns filled from the far end of the absorber back, so the first to arrive go deepest */
        const sx = k.w.b - 36 - ((i + 0.5) / k.n) * (k.w.b - k.w.a - 72), sy = YC + (rnd(k.seed + 100 + i) - 0.5) * 2 * (bore(sx) - 16);
        const x = Math.min(sx, x0 + (tau - born) * SPEED), stopped = x >= sx;
        const rise = smooth((x - x0) / 70), settle = smooth((x - k.w.a) / Math.max(40, sx - k.w.a));
        const y0 = FLOOR - 26, yl = lane(x, i + 3 * j), y = stopped ? sy : (y0 + (yl - y0) * rise) * (1 - settle) + sy * settle;
        if (stopped) caught[j]++;
        molecule(ctx, k.key, x, y, stopped ? (rnd(k.seed + 300 + i) - 0.5) * 2 : Math.sin(x / 50 + i), stopped ? ', taken up by the absorber' : ', carried by the oxygen');
      }
      k.gain = (j ? MC.v : MH.v) * (caught[j] / k.n);
      caught[j] = k.gain;
    });
    /* the glass walls and the joints between the parts, over the molecules */
    ctx.save(); ctx.strokeStyle = alpha(PAL.ink, 0.75); ctx.lineWidth = 2.5; ctx.lineJoin = 'round';
    [-1, 1].forEach((s) => { ctx.beginPath(); wall(ctx, s, X0, X1); ctx.stroke(); });
    [[WIDE[1], F.ref('h2o-absorber')], [WIDE[2], F.ref('co2-absorber')]].forEach(([w, col]) => { ctx.strokeStyle = col; ctx.lineWidth = 3.5; [-1, 1].forEach((s) => { ctx.beginPath(); wall(ctx, s, w.a + 1, w.b - 1); ctx.stroke(); }); });
    ctx.fillStyle = PAL.panel; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2;
    [X0, 566, 861, X1].forEach((x) => { [-1, 1].forEach((s) => { ctx.beginPath(); ctx.roundRect(x - 4, YC + s * (TH + 2) - 5, 8, 10, 2.5); ctx.fill(); ctx.stroke(); }); hits.push({ x, y: YC, r: 14, name: x === X0 ? 'inlet for the oxygen' : x === X1 ? 'outlet' : 'joint between two parts of the train' }); });
    ctx.restore();
    /* what goes in and what comes out, as the book writes them */
    text(ctx, 'O₂', 30, YC, PAL.ink, { size: 22, weight: 600 }); arrow(ctx, 66, YC, 112, YC, PAL.ink, 4);
    arrow(ctx, X1 + 12, YC, X1 + 58, YC, PAL.ink, 4); text(ctx, 'O₂ and', X1 + 68, YC - 13, PAL.ink, { size: 19 }); text(ctx, 'other gases', X1 + 68, YC + 13, PAL.ink, { size: 19 });
    /* the names, each beside its part */
    text(ctx, 'Furnace', (FL + FR) / 2, FT - 22, rf, { size: 21, weight: 600, align: 'center' });
    line(ctx, SX, FLOOR + 6, SX, FBM + 14, rs, 1.8); text(ctx, 'Sample', SX, FBM + 30, rs, { size: 21, weight: 600, align: 'center' });
    line(ctx, 566, YC - TH - 10, 590, FT + 6, PAL.ink, 1.8); text(ctx, 'CO₂, H₂O, O₂, and other gases', 580, FT - 12, PAL.ink, { size: 19 });
    [{ w: WIDE[1], who: 'h2o-absorber', head: 'H₂O absorber', such: 'such as Mg(ClO₄)₂', what: 'H₂O', gain: caught[0] }, { w: WIDE[2], who: 'co2-absorber', head: 'CO₂ absorber', such: 'such as NaOH', what: 'CO₂', gain: caught[1] }].forEach((a) => {
      const cx = (a.w.a + a.w.b) / 2;
      text(ctx, a.head, cx, YC + R + 30, F.ref(a.who), { size: 21, weight: 600, align: 'center' });
      text(ctx, a.such, cx, YC + R + 56, PAL.ink, { size: 17, align: 'center' });
      const s = fmt(a.gain, 2) + ' mg', wt = F.measure(ctx, 'gained ' + s + ' of ' + a.what, { size: 21 });
      F.rich(ctx, ['gained ', [s, cm], ' of ' + a.what], cx - wt / 2, YC + R + 88, { size: 21, weight: 600 });
      hits.push({ x: cx, y: YC + R - 6, r: 20, name: a.head + ' ' + a.such + ', ' + s + ' heavier' });
    });
    hits.push({ x: SX, y: FLOOR - 10, r: 40, name: 'the sample, burning in the stream of oxygen' }, { x: (FL + FR) / 2, y: FT + 20, r: 30, name: 'furnace' }, { x: (FL + FR) / 2, y: FBM - 20, r: 30, name: 'furnace' },
      { x: 400, y: YC - R + 4, r: 14, name: 'combustion tube' }, { x: SX + 82, y: FLOOR, r: 12, name: 'boat that holds the sample' });
    F.legend(ctx, { l: 24, r: 1376, t: 450, b: 528 }, ['O2', 'H2O', 'CO2'].map((k) => ({ s: { O2: 'oxygen, O₂', H2O: 'water, H₂O', CO2: 'carbon dioxide, CO₂' }[k], draw: (c, x, y) => molecule(c, k, x, y, 0) })), { corner: 'bottom', row: true });
    const ratio = nH / nC;
    headline(ctx, fmt(ratio, 2) + ' mol H for every mol C'
      + (ratio > 4.05 ? ': more hydrogen than any hydrocarbon holds, since CH₄ has 4.' : name ? ': the empirical formula is ' + name + '.' : ', a ratio that no small whole numbers fit.'));
    say(`\\frac{\\kn_{\\text{H}}}{\\kn_{\\text{C}}} = \\frac{${hue('mass', fmt(MH.v, 2) + '\\ \\text{mg H}_2\\text{O}')}\\times\\frac{2\\ \\text{mmol H}}{18.02\\ \\text{mg H}_2\\text{O}}}{${hue('mass', fmt(MC.v, 2) + '\\ \\text{mg CO}_2')}\\times\\frac{1\\ \\text{mmol C}}{44.01\\ \\text{mg CO}_2}} = \\frac{${hue('amount', nH.toPrecision(3) + '\\ \\text{mmol H}')}}{${hue('amount', nC.toPrecision(3) + '\\ \\text{mmol C}')}} = ${fmt(ratio, 2)}`);
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();
};
