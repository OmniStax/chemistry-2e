/* Figures for section 7.5 Strengths of Ionic and Covalent Bonds. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['7.5'] = function (root, F) {
const { fmt, C, PAL, alpha, ctl, register, begin, line, arrow, dot, text, headline, axes } = F;
const sim = (id, H) => F.sim(root, id, H);
const still = (d, draw) => register(d.fig, { update: () => {}, draw });
const TAU = 2 * Math.PI;
const clamp = (x) => Math.max(0, Math.min(1, x));
const hueE = (s) => `\\htmlClass{kv-energy}{${s}}`;
const hueL = (s) => `\\htmlClass{kv-length}{${s}}`;

/* =====================================================================
   SIM: Table 7.3 as bond energy against bond length, one pair of atoms
   at a time. The chosen pair's single, double and triple bond are joined
   and labelled with the table's row; the other two pairs stay behind in
   grey. Still: a table has no clock.
===================================================================== */
(function () {
  const d = sim('sim-length', 560);
  /* Table 7.3: [bond, its name in TeX, length in Å, energy in kJ/mol], single, double, triple */
  const PAIRS = {
    cc: [['C–C', '\\text{C–C}', 1.54, 345], ['C=C', '\\text{C=C}', 1.34, 611], ['C≡C', '\\text{C}{\\equiv}\\text{C}', 1.20, 837]],
    cn: [['C–N', '\\text{C–N}', 1.43, 290], ['C=N', '\\text{C=N}', 1.38, 615], ['C≡N', '\\text{C}{\\equiv}\\text{N}', 1.16, 891]],
    co: [['C–O', '\\text{C–O}', 1.43, 350], ['C=O', '\\text{C=O}', 1.23, 741], ['C≡O', '\\text{C}{\\equiv}\\text{O}', 1.13, 1080]],
  };
  const ORDER = ['single', 'double', 'triple'];
  const pick = F.choice(d.controls, { label: '\\text{bonds between}', aria: 'the two bonded atoms', value: 'cc',
    options: [{ value: 'cc', label: 'C and C' }, { value: 'cn', label: 'C and N' }, { value: 'co', label: 'C and O' }] });
  /* fixed axes: 1.1 to 1.7 Å holds every length of the table and leaves room for the label of the longest bond; 0 to 1200 kJ/mol holds every energy */
  const box = { l: 150, r: 1330, t: 120, b: 470 };
  let hits = []; F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c);
    const cE = C('energy'), cL = C('length'), grey = alpha(PAL.ink, 0.3);
    const { X, Y } = axes(ctx, box, [1.1, 1.7], [0, 1200], { nx: 6, ny: 6, xl: 'bond length (Å)', xc: cL, yl: 'bond energy (kJ/mol)', yc: cE, fx: (v) => fmt(v, 1) });
    hits = [];
    const path = (B, col, w) => { for (let k = 0; k < 2; k++) line(ctx, X(B[k][2]), Y(B[k][3]), X(B[k + 1][2]), Y(B[k + 1][3]), col, w); };
    Object.keys(PAIRS).forEach((key) => {
      const B = PAIRS[key];
      path(B, grey, 2.5);
      B.forEach(([n, , x, y], k) => {
        dot(ctx, X(x), Y(y), PAL.muted, true, 7);
        hits.push({ x: X(x), y: Y(y), r: 16, name: `${n}, a ${ORDER[k]} bond: ${fmt(x, 2)} Å, ${y} kJ/mol` });
      });
    });
    Object.keys(PAIRS).forEach((key) => pick.only(ctx, key, () => {
      const B = PAIRS[key];
      path(B, cE, 5);
      B.forEach(([n, , x, y]) => {
        dot(ctx, X(x), Y(y), cE, true, 10);
        F.rich(ctx, [[n + '  ', PAL.ink, 600], [fmt(x, 2) + ' Å', cL], ',  ', [y + ' kJ/mol', cE]], X(x) + 18, Y(y) - 28, { size: 21, bg: PAL.panel });
      });
    }, [0, 0]));
    const B = PAIRS[pick.value], s = B[0], t = B[2];
    headline(ctx, `The ${t[0]} bond is ${fmt(s[2] - t[2], 2)} Å shorter than the ${s[0]} bond and takes ${t[3] - s[3]} kJ/mol more to break.`);
    F.tex(d.readout, B.map((b) => `\\kDbond_{${b[1]}} = ${hueE(b[3] + '\\ \\text{kJ/mol}')}`).join('\;<\;'));
  }
  still(d, draw);
})();

/* =====================================================================
   SIM: a reaction as a climb and a fall. The reactants' level, the
   separate atoms above it, the products' level. The bonds broken are
   stacked from the reactants up to the atoms, the bonds formed from the
   atoms down to the products, and ΔH is what is left between the
   reactants and the products. Each reaction is drawn to its own scale,
   the atoms at the top of the stage. Still: a choice has no clock.
===================================================================== */
(function () {
  const d = sim('sim-enthalpy', 640);
  const HH = ['H–H', 436], CLCL = ['Cl–Cl', 243], HCL = ['H–Cl', 432];
  const RX = {
    hcl: { label: 'H₂ + Cl₂ → 2HCl', from: 'H₂(g) + Cl₂(g)', atoms: '2H(g) + 2Cl(g)', to: '2HCl(g)',
      broken: [HH, CLCL], formed: [HCL, HCL], sb: '436 + 243', sf: '2(432)' },
    rev: { label: '2HCl → H₂ + Cl₂', from: '2HCl(g)', atoms: '2H(g) + 2Cl(g)', to: 'H₂(g) + Cl₂(g)',
      broken: [HCL, HCL], formed: [HH, CLCL], sb: '2(432)', sf: '436 + 243' },
    meoh: { label: 'CO + 2H₂ → CH₃OH', from: 'CO(g) + 2H₂(g)', atoms: 'C(g) + O(g) + 4H(g)', to: 'CH₃OH(g)',
      broken: [['C≡O', 1080], HH, HH], formed: [['C–H', 415], ['C–H', 415], ['C–H', 415], ['C–O', 350], ['O–H', 464]],
      sb: '1080 + 2(436)', sf: '3(415) + 350 + 464' },
  };
  const rc = F.choice(d.controls, { label: '\\text{reaction}', aria: 'the reaction', value: 'hcl',
    options: Object.keys(RX).map((k) => ({ value: k, label: RX[k].label })) });
  /* the atoms' level at YT, the lower of the other two levels at YB; the columns, their arrows and the ΔH arrow */
  const YT = 170, YB = 560, BW = 60, B1 = 400, A1 = 500, A2 = 850, B2 = 882, XE = 1170, XD = 1145;
  const sum = (a) => a.reduce((s, [, v]) => s + v, 0);
  let hits = []; F.hover(d.stage, () => hits);
  /* one column of bonds from y0, each segment as tall as its bond energy; dir −1 climbs, +1 falls */
  function column(ctx, list, x, y0, k, dir, cE, kind) {
    let y = y0;
    list.forEach(([n, v], i) => {
      const h = v * k, top = dir < 0 ? y - h : y;
      ctx.save(); ctx.fillStyle = alpha(cE, i % 2 ? 0.2 : 0.38); ctx.fillRect(x, top, BW, h);
      ctx.strokeStyle = cE; ctx.lineWidth = 2; ctx.strokeRect(x, top, BW, h); ctx.restore();
      const parts = [[n + '  ', PAL.ink, 600], [v + ' kJ', cE]];
      if (dir < 0) F.rich(ctx, parts, x - 16, top + h / 2, { size: 21, align: 'right' });
      else F.rich(ctx, parts, x + BW + 16, top + h / 2, { size: 21, bg: PAL.panel });
      hits.push({ x: x + BW / 2, y: top + h / 2, r: Math.min(h / 2, 40), name: `one mole of ${n} bonds ${kind}, ${v} kJ` });
      y += dir * h;
    });
  }
  function panel(ctx, r) {
    const cE = C('energy'), guide = alpha(PAL.ink, 0.4);
    const b = sum(r.broken), f = sum(r.formed), dH = b - f, k = (YB - YT) / Math.max(b, f);
    const yR = YT + b * k, yP = YT + f * k;
    /* the reactants' level carried across to the ΔH arrow; it steps round the products' column where it would cross it */
    if (yR < yP) { line(ctx, 540, yR, A2 - 30, yR, guide, 2, [10, 10]); line(ctx, XD - 25, yR, XE, yR, guide, 2, [10, 10]); }
    else line(ctx, 540, yR, XE, yR, guide, 2, [10, 10]);
    column(ctx, r.broken, B1, yR, k, -1, cE, 'broken');
    column(ctx, r.formed, B2, YT, k, 1, cE, 'formed');
    line(ctx, 160, yR, 540, yR, PAL.ink, 4);
    line(ctx, B1 - 20, YT, B2 + BW + 20, YT, PAL.ink, 4);
    line(ctx, A2 - 20, yP, XE, yP, PAL.ink, 4);
    text(ctx, r.from, 164, yR + 26, PAL.ink, { size: 22 });
    text(ctx, r.atoms, (B1 + B2 + BW) / 2, YT - 24, PAL.ink, { size: 22, align: 'center' });
    text(ctx, r.to, XE, yP + 26, PAL.ink, { size: 22, align: 'right' });
    /* the climb and the fall, with their totals */
    arrow(ctx, A1, yR, A1, YT + 4, cE, 4);
    text(ctx, 'bonds broken', A1 + 18, (yR + YT) / 2 - 15, PAL.ink, { size: 21 });
    F.rich(ctx, [[b + ' kJ', cE], ' in'], A1 + 18, (yR + YT) / 2 + 15, { size: 21 });
    arrow(ctx, A2, YT, A2, yP - 4, cE, 4);
    text(ctx, 'bonds formed', A2 - 18, (YT + yP) / 2 - 15, PAL.ink, { size: 21, align: 'right' });
    F.rich(ctx, [[f + ' kJ', cE], ' out'], A2 - 18, (YT + yP) / 2 + 15, { size: 21, align: 'right' });
    /* ΔH, from the reactants' level to the products' */
    arrow(ctx, XD, yR, XD, yP, cE, Math.abs(yP - yR) < 40 ? 3 : 5);
    F.rich(ctx, [['ΔH = ', PAL.ink, 600], [fmt(dH, 0) + ' kJ', cE]], XE + 16, (yR + yP) / 2, { size: 22 });
    hits.push({ x: XD, y: (yR + yP) / 2, r: 24, name: `the enthalpy change, ${fmt(dH, 0)} kJ` });
  }
  function draw() {
    const { ctx } = begin(d.c);
    hits = [];
    Object.keys(RX).forEach((key) => rc.only(ctx, key, () => panel(ctx, RX[key]), [0, 0]));
    const r = RX[rc.value], b = sum(r.broken), f = sum(r.formed), dH = b - f;
    headline(ctx, dH < 0 ? `Forming the new bonds releases ${-dH} kJ more than breaking the old ones takes, so the reaction is exothermic.`
      : `Breaking the old bonds takes ${dH} kJ more than forming the new ones releases, so the reaction is endothermic.`);
    F.tex(d.readout, `\\kdH = \\textstyle\\sum \\kDbond_{\\text{bonds broken}} - \\sum \\kDbond_{\\text{bonds formed}} = [${r.sb}]\\ \\text{kJ} - [${r.sf}]\\ \\text{kJ} = ${hueE((dH < 0 ? '-' : '') + Math.abs(dH) + '\\ \\text{kJ}')}`);
  }
  still(d, draw);
})();

/* =====================================================================
   SIM: a cation and an anion touching at the interionic distance R_o,
   beside the graph of the lattice energy C(Z+)(Z−)/R_o against R_o, one
   curve for each product of charges. The slider moves the point along
   its curve; the charges move it from curve to curve. C is fixed so that
   charges of 1 and 1 at 201 pm give LiF's 1023 kJ/mol; the text's MgO
   (3900 kJ/mol, at the 205 pm of the section's exercise) is marked.
   Still: the relation answers its controls and has no clock.
===================================================================== */
(function () {
  const d = sim('sim-lattice', 620);
  const Z = ['1', '2', '3'].map((v) => ({ value: v, label: v }));
  const zp = F.choice(d.controls, { label: 'Z^{+}', aria: 'the charge of the cation', value: '1', options: Z });
  const zm = F.choice(d.controls, { label: 'Z^{-}', aria: 'the charge of the anion', value: '1', options: Z });
  const Ro = ctl(d.controls, { label: '\\kRo', cls: 'length', min: 160, max: 300, step: 1, value: 201, unit: 'pm', dec: 0, aria: 'the interionic distance in picometers',
    detents: [{ v: 201, label: 'LiF' }] });
  const CL = 1023 * 201;   /* kJ·pm/mol */
  const MARKS = [{ n: 'LiF', R: 201, E: 1023 }, { n: 'MgO', R: 205, E: 3900 }];
  const PRODUCTS = [1, 2, 3, 4, 6, 9];
  /* the ions: 0.8 units per picometer, the cation taking 40 % of R_o, so the pair is 480 wide at 300 pm */
  const S = 0.8, CX = 300, CY = 310;
  /* fixed axes: R_o 160 to 300 pm (the slider's range), 0 to 12 000 kJ/mol, which holds 3 × 3 at 160 pm (11 566) */
  const box = { l: 760, r: 1260, t: 130, b: 510 };
  let hits = []; F.hover(d.stage, () => hits);
  const SUP = { 1: '', 2: '²', 3: '³' };
  function ion(ctx, x, y, r, sym, name) {
    ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fillStyle = alpha(PAL.ink, 0.12); ctx.fill();
    ctx.lineWidth = 2.5; ctx.strokeStyle = alpha(PAL.ink, 0.6); ctx.stroke(); ctx.restore();
    text(ctx, sym, x, y - r - 22, PAL.ink, { size: 26, weight: 600, align: 'center' });
    hits.push({ x, y, r, name });
  }
  function draw() {
    const { ctx } = begin(d.c);
    const cE = C('energy'), cL = C('length'), grey = alpha(PAL.ink, 0.3);
    const p = +zp.value, m = +zm.value, R = Ro.v, E = (CL * p * m) / R;
    hits = [];
    /* the ions, the pair centred on CX whatever R_o is */
    const rc = 0.4 * R * S, ra = 0.6 * R * S, xc = CX - 0.6 * R * S, xa = xc + R * S;
    ion(ctx, xc, CY, rc, 'M' + SUP[p] + '⁺', `the cation M, charge ${p}+`);
    ion(ctx, xa, CY, ra, 'X' + SUP[m] + '⁻', `the anion X, charge ${m}−`);
    dot(ctx, xc, CY, PAL.ink, true, 5); dot(ctx, xa, CY, PAL.ink, true, 5);
    const by = CY + ra + 28;
    line(ctx, xc, CY, xc, by + 8, alpha(PAL.ink, 0.4), 2, [4, 8]);
    line(ctx, xa, CY, xa, by + 8, alpha(PAL.ink, 0.4), 2, [4, 8]);
    F.hbracket(ctx, xc, xa, by, cL, `R_{o} = ${R} pm`, { side: 'below' });
    /* the graph: one curve per product of charges, the current one in the energy hue */
    const ax = axes(ctx, box, [160, 300], [0, 12000], { nx: 7, ny: 6, xl: 'R_{o} (pm)', xc: cL, yl: 'ΔH_{lattice} (kJ/mol)', yc: cE });
    const { X, Y } = ax;
    PRODUCTS.forEach((q) => {
      const on = q === p * m;
      F.plot(ctx, ax, (x) => (CL * q) / x, on ? cE : grey, { w: on ? 5 : 2.5 });
      text(ctx, String(q), box.r + 14, Y((CL * q) / 300), on ? cE : PAL.muted, { size: on ? 21 : 18, weight: on ? 600 : 400 });
      hits.push({ x: box.r + 20, y: Y((CL * q) / 300), r: 14, name: `the curve for charges whose product is ${q}` });
    });
    text(ctx, 'Z⁺ × Z⁻', box.r + 10, Y((CL * 9) / 300) - 34, PAL.ink, { size: 18 });
    /* the book's two compounds */
    MARKS.forEach((k) => {
      dot(ctx, X(k.R), Y(k.E), PAL.ink, false, 8);
      text(ctx, `${k.n}, ${k.E}`, X(k.R) + 15, Y(k.E) + 17, PAL.ink, { size: 18, bg: PAL.panel });
      hits.push({ x: X(k.R), y: Y(k.E), r: 14, name: `${k.n}: ${k.E} kJ/mol at ${k.R} pm` });
    });
    /* the point for the charges and distance chosen, dropped to both axes */
    const px = X(R), py = Y(E);
    line(ctx, px, py, px, box.b, alpha(cL, 0.7), 2, [4, 8]);
    line(ctx, box.l, py, px, py, alpha(cE, 0.7), 2, [4, 8]);
    dot(ctx, px, py, cE, true, 9);
    hits.push({ x: px, y: py, r: 16, name: `charges ${p}+ and ${m}− at ${R} pm: ${fmt(E, 0)} kJ/mol` });
    const lif = p * m === 1 && R === 201;
    headline(ctx, lif ? 'Charges of 1 and 1 at 201 pm give the lattice energy of LiF.'
      : `Charges of ${p} and ${m} at ${R} pm give ${fmt(E / 1023, 1)} times the lattice energy of LiF.`);
    F.tex(d.readout, `\\kdHlat = \\frac{C(Z^{+})(Z^{-})}{\\kRo} = \\frac{(2.056\\times 10^{5}\\ \\text{kJ pm/mol})(${p})(${m})}{${hueL(R + '\\ \\text{pm}')}} = ${hueE(fmt(E, 0) + '\\ \\text{kJ/mol}')}`);
  }
  still(d, draw);
})();

/* =====================================================================
   FIGURE 7.13: the Born-Haber cycle for CsF as an energy ladder to
   scale, laid out as the book's image and built one step at a time on a
   story slider. Levels are the species in ink; the step arrows are
   energy, up when the step absorbs energy and down when it releases it.
   Story time only: the book walks the cycle in order, and nothing here
   has a physical clock.
===================================================================== */
(function () {
  const d = sim('sim-born-haber', 700);
  const st = ctl(d.controls, { label: '\\text{step}', cls: '', min: 0, max: 5, step: 0.01, value: 0, unit: '', dec: 2, aria: 'the steps of the Born-Haber cycle' });
  F.story(d, st, { stops: [{ v: 0, label: 'elements' }, { v: 1, label: 'sublimation' }, { v: 2, label: 'ionization' }, { v: 3, label: '½ D' }, { v: 4, label: 'EA' }, { v: 5, label: 'lattice' }], ms: 1400 });
  /* the five steps in the image's order, with the image's values (kJ/mol) */
  const STEPS = [
    { dh: 76.5, sym: 'ΔH_{s}°', what: 'Solid cesium sublimes to gaseous atoms, absorbing 76.5 kJ/mol.', tex: '\\kdHs' },
    { dh: 375.7, sym: 'IE', what: 'The gaseous cesium atoms are ionized, absorbing 375.7 kJ/mol.', tex: '\\kIE' },
    { dh: 79.4, sym: '½D', what: 'Half a mole of F–F bonds is broken, absorbing 79.4 kJ/mol.', tex: '\\tfrac{1}{2}\\kDbond' },
    { dh: -328.2, sym: 'EA', what: 'The fluorine atoms gain electrons, releasing 328.2 kJ/mol.', tex: '\\kEA' },
    { dh: -756.9, sym: '−ΔH_{lattice}', what: '', tex: '' },
  ];
  const HF = -553.5;
  const LEVELS = ['Cs(s) + ½F₂(g)', 'Cs(g) + ½F₂(g)', 'Cs⁺(g) + ½F₂(g)', 'Cs⁺(g) + F(g)', 'Cs⁺(g) + F⁻(g)', 'CsF(s)'];
  const E = [0]; STEPS.forEach((s) => E.push(E[E.length - 1] + s.dh));
  /* to scale: the highest level (531.6 kJ/mol) at y = 140, the lowest (−553.5) at y = 650 */
  const top = 140, bot = 650, Y = (v) => top + ((E[3] - v) / (E[3] - HF)) * (bot - top);
  /* each level's span and where its name starts; the climbing steps share one column, the falling steps another, as in the image */
  const SPAN = [[170, 560], [170, 560], [170, 560], [430, 1010], [870, 1250], [170, 1010]];
  const LX = [182, 182, 182, 600, 962, 1000];
  const AX = [500, 500, 500, 940, 940];
  function draw() {
    const { ctx } = begin(d.c);
    const cE = C('energy'), s = st.v, done = Math.floor(s + 1e-6);
    /* the enthalpy axis, pointing up */
    arrow(ctx, 90, bot + 10, 90, top - 30, PAL.muted, 3);
    text(ctx, 'H', 70, top - 20, PAL.muted, { size: 24, weight: 600, align: 'right' });
    const level = (i, a) => F.faded(ctx, a, [0, 0], () => {
      const [x1, x2] = SPAN[i];
      line(ctx, x1, Y(E[i]), x2, Y(E[i]), PAL.ink, 4);
      text(ctx, LEVELS[i], LX[i], i === 5 ? Y(E[i]) + 24 : Y(E[i]) - 17, PAL.ink, { size: 21, align: i === 5 ? 'right' : 'left' });
    });
    level(0, 1); level(5, 1);
    /* the overall change, from the elements straight down to the solid */
    arrow(ctx, 230, Y(0), 230, Y(HF), cE, 5);
    F.rich(ctx, [['ΔH_{f}° = ', PAL.ink, 600], ['−553.5 kJ/mol', cE]], 250, (Y(0) + Y(HF)) / 2, { size: 22 });
    STEPS.forEach((stp, i) => {
      const k = F.ease.smooth(clamp(s - i));
      if (k <= 0) return;
      const x = AX[i], y0 = Y(E[i]), y1 = Y(E[i + 1]);
      arrow(ctx, x, y0, x, y0 + (y1 - y0) * k, cE, 5);
      if (k > 0.85) level(i + 1, (k - 0.85) / 0.15);
      F.faded(ctx, clamp((k - 0.5) * 2), [0, 0], () => F.rich(ctx, [[stp.sym + ' = ', PAL.ink, 600], [fmt(stp.dh, 1) + ' kJ/mol', cE]], x + 20, (y0 + y1) / 2, { size: 21 }));
    });
    headline(ctx, done === 0 ? 'Cesium metal and fluorine gas lie 553.5 kJ/mol above solid CsF.'
      : done < 5 ? STEPS[done - 1].what
      : 'The cycle closes on CsF(s) only if the last step releases 756.9 kJ/mol, the lattice energy.');
    const terms = STEPS.slice(0, Math.min(done, 4)), syms = terms.map((t) => t.tex).join(' + ');
    const nums = terms.map((t) => (t.dh < 0 ? '- ' : '+ ') + fmt(Math.abs(t.dh), 1)).join(' ').replace(/^\+ /, '');
    const kj = '\\ \\text{kJ/mol}';
    const tex = done === 0 ? `\\kdHf = ${hueE('-553.5' + kj)}`
      : done === 1 ? `\\kdHs = ${hueE('76.5' + kj)}`
      : done < 5 ? `${syms} = (${nums})${kj} = ${hueE(fmt(E[done], 1) + kj)}`
      : `\\kdHlat = ${syms} - \\kdHf = [${nums} - (-553.5)]${kj} = ${hueE('756.9' + kj)}`;
    F.tex(d.readout, tex, false, { values: false });
  }
  still(d, draw);
})();

};
