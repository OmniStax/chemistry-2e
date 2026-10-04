/* Figures for section 7.5 Strengths of Ionic and Covalent Bonds. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['7.5'] = function (root, F) {
const { fmt, C, PAL, alpha, ctl, register, begin, line, arrow, dot, text, headline, axes, labeller } = F;
const sim = (id, H) => F.sim(root, id, H);
const still = (d, draw) => register(d.fig, { update: () => {}, draw });
const TAU = 2 * Math.PI;
const minus = (s) => String(s).replace('-', '−');
const clamp = (x) => Math.max(0, Math.min(1, x));

/* =====================================================================
   SIM: the nine bonds of Table 7.3, bond energy against bond length,
   the single, double and triple bond of each pair of atoms joined.
   Still: a table has no clock and there are no controls.
===================================================================== */
(function () {
  const d = sim('sim-length', 560);
  const PAIRS = [
    { name: 'C–C', bonds: [['C–C', 1.54, 345], ['C=C', 1.34, 611], ['C≡C', 1.20, 837]] },
    { name: 'C–N', bonds: [['C–N', 1.43, 290], ['C=N', 1.38, 615], ['C≡N', 1.16, 891]] },
    { name: 'C–O', bonds: [['C–O', 1.43, 350], ['C=O', 1.23, 741], ['C≡O', 1.13, 1080]] },
  ];
  const ORDER = ['single', 'double', 'triple'];
  /* fixed axes: 1.0 to 1.6 Å holds every length of the table, 0 to 1200 kJ/mol every energy */
  const box = { l: 170, r: 1060, t: 150, b: 490 };
  let hits = []; F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c);
    const cE = C('energy');
    const { X, Y } = axes(ctx, box, [1.0, 1.6], [0, 1200], { nx: 6, ny: 6, xl: 'bond length (Å)', xc: C('length'), yl: 'bond energy (kJ/mol)', yc: cE, fx: (v) => fmt(v, 1) });
    hits = [];
    PAIRS.forEach((p, i) => {
      const col = F.cat(i);
      for (let k = 0; k < 2; k++) {
        const [, x1, y1] = p.bonds[k], [, x2, y2] = p.bonds[k + 1];
        line(ctx, X(x1), Y(y1), X(x2), Y(y2), alpha(col, 0.7), 3);
      }
      p.bonds.forEach(([n, x, y], k) => {
        dot(ctx, X(x), Y(y), col, true, 10);
        hits.push({ x: X(x), y: Y(y), r: 16, name: `${n}, a ${ORDER[k]} bond: ${fmt(x, 2)} Å and ${y} kJ/mol` });
      });
      /* the legend beside the graph, one entry per pair of atoms */
      const ly = 170 + i * 46;
      dot(ctx, 1130, ly, col, true, 10);
      text(ctx, `${p.name} bonds`, 1152, ly, PAL.ink, { size: 22, base: 'middle' });
    });
    headline(ctx, 'Between the same two atoms, the triple bond is the shortest and the strongest, and the single bond the longest and the weakest.');
    F.tex(d.readout, '\\text{C–C}: \\kDbond = 345,\\ 611,\\ 837\\ \\text{kJ/mol at } 1.54,\\ 1.34,\\ 1.20\\ \\text{Å}');
  }
  still(d, draw);
})();

/* =====================================================================
   SIM: the energy to break the bonds of the reactants stacked beside
   the energy released by the bonds of the products, their difference
   drawn as ΔH, for the reaction chosen. Still: a choice of reaction has
   no clock.
===================================================================== */
(function () {
  const d = sim('sim-enthalpy', 600);
  const RX = {
    hcl: { label: 'H₂ + Cl₂ → 2HCl', tex: '\\text{H}_2 + \\text{Cl}_2 \\longrightarrow 2\\text{HCl}',
      broken: [['H–H', 436], ['Cl–Cl', 243]], formed: [['H–Cl', 432], ['H–Cl', 432]],
      sb: '436 + 243', sf: '2(432)' },
    meoh: { label: 'CO + 2H₂ → CH₃OH', tex: '\\text{CO} + 2\\text{H}_2 \\longrightarrow \\text{CH}_3\\text{OH}',
      broken: [['C≡O', 1080], ['H–H', 436], ['H–H', 436]], formed: [['C–H', 415], ['C–H', 415], ['C–H', 415], ['C–O', 350], ['O–H', 464]],
      sb: '1080 + 2(436)', sf: '3(415) + 350 + 464' },
  };
  const rc = F.choice(d.controls, { label: '\\text{reaction}', aria: 'the reaction', value: 'hcl',
    options: Object.keys(RX).map((k) => ({ value: k, label: RX[k].label })) });
  /* fixed scale: 0 to 2200 kJ holds the larger stack of either reaction, 2059 kJ */
  const box = { l: 200, r: 1300, t: 110, b: 540 };
  const KY = (box.b - box.t) / 2200;
  const BW = 220, XB = 470, XF = 830;
  const sum = (a) => a.reduce((s, [, v]) => s + v, 0);
  let hits = []; F.hover(d.stage, () => hits);
  function stack(ctx, list, x, cE, kind) {
    let y = box.b;
    list.forEach(([n, v], i) => {
      const h = v * KY;
      ctx.save(); ctx.fillStyle = alpha(cE, i % 2 ? 0.16 : 0.28); ctx.fillRect(x, y - h, BW, h);
      ctx.strokeStyle = cE; ctx.lineWidth = 2; ctx.strokeRect(x, y - h, BW, h); ctx.restore();
      if (h >= 30) text(ctx, `${n}  ${v}`, x + BW / 2, y - h / 2, PAL.ink, { size: 18, align: 'center', base: 'middle' });
      hits.push({ x: x + BW / 2, y: y - h / 2, r: Math.min(h / 2, 60), name: `${n} bond ${kind}, ${v} kJ/mol` });
      y -= h;
    });
    return y;
  }
  function panel(ctx, r) {
    const cE = C('energy');
    const b = sum(r.broken), f = sum(r.formed), dH = b - f;
    const yb = stack(ctx, r.broken, XB, cE, 'broken'), yf = stack(ctx, r.formed, XF, cE, 'formed');
    text(ctx, `${b} kJ`, XB + BW / 2, yb - 18, cE, { size: 22, weight: 600, align: 'center' });
    text(ctx, `${f} kJ`, XF + BW / 2, yf - 18, cE, { size: 22, weight: 600, align: 'center' });
    /* ΔH: the level of the bonds broken carried across, and the gap to the level of the bonds formed */
    const xa = XF + BW + 50;
    line(ctx, XB + BW, yb, XF, yb, alpha(PAL.ink, 0.4), 2, [10, 10]);
    line(ctx, XF + BW, yb, xa + 20, yb, alpha(PAL.ink, 0.4), 2, [10, 10]);
    line(ctx, XF + BW, yf, xa + 20, yf, alpha(PAL.ink, 0.4), 2, [10, 10]);
    if (Math.abs(yf - yb) > 8) arrow(ctx, xa, yf, xa, yb, cE, 4);
    text(ctx, `ΔH = ${minus(dH)} kJ`, xa + 18, (yb + yf) / 2, cE, { size: 22, weight: 600, base: 'middle' });
    return { b, f, dH };
  }
  function draw() {
    const { ctx } = begin(d.c);
    hits = [];
    line(ctx, box.l, box.b, box.r, box.b, PAL.ink, 3);
    text(ctx, 'bonds broken (energy in)', XB + BW / 2, box.b + 30, PAL.ink, { size: 20, align: 'center' });
    text(ctx, 'bonds formed (energy out)', XF + BW / 2, box.b + 30, PAL.ink, { size: 20, align: 'center' });
    Object.keys(RX).forEach((k) => rc.only(ctx, k, () => panel(ctx, RX[k]), [0, 0]));
    const r = RX[rc.value], b = sum(r.broken), f = sum(r.formed), dH = b - f;
    headline(ctx, `Breaking the bonds takes ${b} kJ and forming the new bonds releases ${f} kJ, so ΔH is ${minus(dH)} kJ and the reaction is ${dH < 0 ? 'exothermic' : 'endothermic'}.`);
    F.tex(d.readout, `${r.tex}\\qquad \\kdH = \\textstyle\\sum \\kDbond_{\\text{broken}} - \\sum \\kDbond_{\\text{formed}} = [${r.sb}] - [${r.sf}] = ${minus(dH)}\\ \\text{kJ}`);
  }
  still(d, draw);
})();

/* =====================================================================
   SIM: a cation and an anion touching at the interionic distance R_o,
   above a bar of the lattice energy C(Z+)(Z−)/R_o. C is fixed so that
   charges of 1 and 1 at 201 pm give LiF's 1023 kJ/mol. Still: the
   relation answers its controls and has no clock.
===================================================================== */
(function () {
  const d = sim('sim-lattice', 640);
  const Z = ['1', '2', '3'].map((v) => ({ value: v, label: v }));
  const zp = F.choice(d.controls, { label: 'Z^{+}', aria: 'the charge of the cation', value: '1', options: Z });
  const zm = F.choice(d.controls, { label: 'Z^{-}', aria: 'the charge of the anion', value: '1', options: Z });
  const Ro = ctl(d.controls, { label: '\\kRo', cls: 'length', min: 150, max: 400, step: 1, value: 201, unit: 'pm', dec: 0, aria: 'the interionic distance in picometers',
    detents: [{ v: 201, label: 'LiF' }] });
  const CL = 1023 * 201;   /* kJ·pm/mol */
  const LIF = 1023;
  /* the scene: 0.55 units per picometer, the cation taking 40 % of R_o; the bar 0 to 13 000 kJ/mol, which holds 3 × 3 at 150 pm (12 300) */
  const S = 0.7, CY = 280, CX = 620;
  const bar = { l: 170, r: 1320, y: 530, h: 44 };
  const BX = (v) => bar.l + (v / 13000) * (bar.r - bar.l);
  let hits = []; F.hover(d.stage, () => hits);
  const SUP = { 1: '', 2: '²', 3: '³' };
  function ion(ctx, x, y, r, sym, name) {
    ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fillStyle = alpha(PAL.ink, 0.12); ctx.fill();
    ctx.lineWidth = 2; ctx.strokeStyle = alpha(PAL.ink, 0.6); ctx.stroke(); ctx.restore();
    text(ctx, sym, x, y - r - 18, PAL.ink, { size: 24, weight: 600, align: 'center', base: 'middle' });
    hits.push({ x, y, r, name });
  }
  function draw() {
    const { ctx } = begin(d.c);
    const cE = C('energy'), cL = C('length');
    const p = +zp.value, m = +zm.value, R = Ro.v, E = (CL * p * m) / R;
    hits = [];
    const rc = 0.4 * R * S, ra = 0.6 * R * S, xc = CX - (rc + ra) / 2, xa = xc + rc + ra;
    ion(ctx, xc, CY, rc, 'M' + SUP[p] + '⁺', `the cation M, charge +${p}`);
    ion(ctx, xa, CY, ra, 'X' + SUP[m] + '⁻', `the anion X, charge −${m}`);
    dot(ctx, xc, CY, PAL.ink, true, 4); dot(ctx, xa, CY, PAL.ink, true, 4);
    const by = CY + ra + 26;
    line(ctx, xc, CY, xc, by + 6, alpha(PAL.ink, 0.35), 2, [4, 8]);
    line(ctx, xa, CY, xa, by + 6, alpha(PAL.ink, 0.35), 2, [4, 8]);
    F.hbracket(ctx, xc, xa, by, cL, `R_{o} = ${R} pm`, { side: 'below' });
    /* the bar of the lattice energy, with LiF's value marked */
    ctx.save(); ctx.fillStyle = alpha(cE, 0.3); ctx.fillRect(bar.l, bar.y, BX(E) - bar.l, bar.h);
    ctx.strokeStyle = cE; ctx.lineWidth = 2; ctx.strokeRect(bar.l, bar.y, BX(E) - bar.l, bar.h); ctx.restore();
    line(ctx, bar.l, bar.y + bar.h, bar.r, bar.y + bar.h, PAL.ink, 2);
    for (let v = 0; v <= 13000; v += 1000) {
      line(ctx, BX(v), bar.y + bar.h, BX(v), bar.y + bar.h + 8, PAL.muted, 2);
      if (v % 2000 === 0) text(ctx, fmt(v, 0), BX(v), bar.y + bar.h + 28, PAL.muted, { size: 17, align: 'center' });
    }
    text(ctx, 'ΔH_{lattice}', bar.l - 20, bar.y + bar.h / 2 - 8, cE, { size: 22, weight: 600, align: 'right', base: 'middle' });
    text(ctx, '(kJ/mol)', bar.l - 20, bar.y + bar.h / 2 + 14, cE, { size: 15, align: 'right', base: 'middle' });
    line(ctx, BX(LIF), bar.y - 14, BX(LIF), bar.y + bar.h, PAL.ink, 2, [4, 4]);
    text(ctx, 'LiF, 1023', BX(LIF), bar.y - 24, PAL.ink, { size: 17, align: 'center' });
    const Es = fmt(E, 0);
    if (BX(E) - BX(LIF) > 150) text(ctx, `${Es}`, BX(E) + 10, bar.y + bar.h / 2, cE, { size: 20, weight: 600, base: 'middle' });
    const ratio = E / LIF;
    headline(ctx, `With charges of ${p} and ${m} at ${R} pm, the lattice energy is ${Es} kJ/mol, ${fmt(ratio, 1)} times that of LiF.`);
    F.tex(d.readout, `\\kdHlat = \\frac{C(Z^{+})(Z^{-})}{\\kRo} = \\frac{(2.056\\times 10^{5}\\ \\text{kJ pm/mol})(${p})(${m})}{${R}\\ \\text{pm}} = ${Es}\\ \\text{kJ/mol}`);
  }
  still(d, draw);
})();

/* =====================================================================
   FIGURE 7.13: the Born-Haber cycle for CsF as an energy ladder, built
   one step at a time on a story slider. Levels are the species in ink;
   the step arrows are energy, up when the step absorbs energy and down
   when it releases it. Story time only: the book walks the cycle in
   order, and nothing here has a physical clock.
===================================================================== */
(function () {
  const d = sim('sim-born-haber', 700);
  const st = ctl(d.controls, { label: '\\text{step}', cls: '', min: 0, max: 5, step: 0.01, value: 0, unit: '', dec: 2, aria: 'the steps of the Born-Haber cycle' });
  F.story(d, st, { stops: [{ v: 0, label: 'elements' }, { v: 1, label: 'sublimation' }, { v: 2, label: 'ionization' }, { v: 3, label: '½ D' }, { v: 4, label: 'EA' }, { v: 5, label: 'lattice' }], ms: 1400 });
  const STEPS = [
    { dh: 76.5, name: 'ΔH_{s}° = 76.5', what: 'Solid cesium sublimes to gaseous atoms, absorbing 76.5 kJ/mol.', tex: '\\kdHs', num: '76.5' },
    { dh: 375.7, name: 'IE = 375.7', what: 'The gaseous cesium atoms are ionized, absorbing 375.7 kJ/mol.', tex: '\\kIE', num: '375.7' },
    { dh: 79.4, name: '½D = 79.4', what: 'Half a mole of F–F bonds is broken, absorbing 79.4 kJ/mol.', tex: '\\tfrac{1}{2}\\kDbond', num: '79.4' },
    { dh: -328.2, name: 'EA = −328.2', what: 'The fluorine atoms gain electrons, releasing 328.2 kJ/mol.', tex: '\\kEA', num: '(-328.2)' },
    { dh: -756.9, name: '−ΔH_{lattice} = −756.9', what: 'The gaseous ions come together as solid CsF, releasing the lattice energy, 756.9 kJ/mol.', tex: '(-\\kdHlat)', num: '(-756.9)' },
  ];
  const LEVELS = ['Cs(s) + ½F₂(g)', 'Cs(g) + ½F₂(g)', 'Cs⁺(g) + ½F₂(g)', 'Cs⁺(g) + F(g)', 'Cs⁺(g) + F⁻(g)', 'CsF(s)'];
  const E = [0]; STEPS.forEach((s) => E.push(E[E.length - 1] + s.dh));
  /* fixed scale: −600 to +600 kJ/mol over the ladder's height */
  const top = 120, bot = 660, Y = (v) => top + ((600 - v) / 1200) * (bot - top);
  /* each level's span; each step's arrow stands at the right end of the level it leaves */
  const SPAN = [[150, 330], [320, 520], [510, 720], [710, 1010], [1000, 1210], [150, 1330]];
  const AX = [320, 510, 710, 1000, 1200];
  function draw() {
    const { ctx } = begin(d.c);
    const cE = C('energy'), s = st.v, done = Math.floor(s + 1e-6);
    /* the enthalpy axis, pointing up */
    arrow(ctx, 70, bot, 70, top - 10, PAL.muted, 3);
    text(ctx, 'H', 50, top, PAL.muted, { size: 22, weight: 600, align: 'right' });
    const level = (i, a) => F.faded(ctx, a, [0, 0], () => {
      const [x1, x2] = SPAN[i];
      line(ctx, x1, Y(E[i]), x2, Y(E[i]), PAL.ink, 3);
      text(ctx, LEVELS[i], i === 5 ? x2 - 10 : x1 + 12, Y(E[i]) - 16, PAL.ink, { size: 19, align: i === 5 ? 'right' : 'left' });
    });
    level(0, 1); level(5, 1);
    /* the measured enthalpy of formation, from the elements straight down to the solid */
    arrow(ctx, 110, Y(0), 110, Y(E[5]), alpha(cE, 0.8), 4);
    text(ctx, 'ΔH_{f}° = −553.5 kJ/mol', 124, (Y(0) + Y(E[5])) / 2, cE, { size: 19, weight: 600, base: 'middle' });
    STEPS.forEach((stp, i) => {
      const k = F.ease.smooth(clamp(s - i));
      if (k <= 0) return;
      const x = AX[i], y0 = Y(E[i]), y1 = Y(E[i + 1]);
      arrow(ctx, x, y0, x, y0 + (y1 - y0) * k, cE, 4);
      if (k > 0.85) level(i + 1, (k - 0.85) / 0.15);
      F.faded(ctx, clamp((k - 0.5) * 2), [0, 0], () => text(ctx, `${stp.name}`, x + 12, (y0 + y1) / 2 + (stp.dh > 0 ? 8 : 0), cE, { size: 18, weight: 600, base: 'middle' }));
    });
    const sumTo = E[done];
    headline(ctx, done === 0 ? 'The cycle starts from cesium metal and fluorine gas, whose enthalpy of formation to CsF(s) is −553.5 kJ/mol.'
      : done < 5 ? STEPS[done - 1].what
      : 'The five steps add up to the enthalpy of formation, −553.5 kJ/mol, so the lattice energy of CsF is 756.9 kJ/mol.');
    const terms = STEPS.slice(0, done);
    const tex = done === 0 ? '\\kdHf = -553.5\\ \\text{kJ/mol}'
      : done < 5 ? `\\kdH = ${terms.map((t) => t.tex).join(' + ')} = ${terms.map((t) => t.num).join(' + ')} = ${minus(fmt(sumTo, 1))}\\ \\text{kJ/mol}`
      : `\\kdHf = ${terms.map((t) => t.tex).join(' + ')} = ${terms.map((t) => t.num).join(' + ')} = -553.5\\ \\text{kJ/mol}`;
    F.tex(d.readout, tex, false, { values: false });
  }
  still(d, draw);
})();

};
