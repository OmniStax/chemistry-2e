/* Figures for section 7.2 Covalent Bonding. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['7.2'] = function (root, F) {
const { fmt, C, PAL, alpha, ctl, register, begin, line, arrow, dot, text, headline, axes, curve, pinned } = F;
const sim = (id, H) => F.sim(root, id, H);
const still = (d, draw) => register(d.fig, { update: () => {}, draw });
const TAU = 2 * Math.PI;
const minus = (s) => s.replace('-', '−');

/* an atom as a filled disc in its element colour, hydrogen's white held by an ink outline */
function atom(ctx, x, y, sym, r, a = 1) {
  ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU);
  ctx.fillStyle = F.el(sym); ctx.fill();
  ctx.lineWidth = sym === 'H' ? 2.5 : 1.5; ctx.strokeStyle = sym === 'H' ? PAL.ink : alpha(PAL.ink, 0.45); ctx.stroke(); ctx.restore();
}
/* a soft cloud of electron density: a disc shaded from its centre outward */
function cloud(ctx, x, y, r, a) {
  if (!(r > 1) || !(a > 0)) return;
  const g = ctx.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, alpha(PAL.ink, 0.34 * a)); g.addColorStop(0.6, alpha(PAL.ink, 0.2 * a)); g.addColorStop(1, alpha(PAL.ink, 0));
  ctx.save(); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.restore();
}

/* =====================================================================
   FIGURE 7.4: the potential energy of two hydrogen atoms against the
   distance between their nuclei. The pair is drawn above the curve at the
   chosen distance and the point rides the curve. Still: the energy
   answers the distance, and nothing here has a clock.
===================================================================== */
(function () {
  const d = sim('sim-bond', 640);
  const R = ctl(d.controls, { label: 'r', cls: '', min: 30, max: 300, step: 1, value: 74, unit: 'pm', dec: 0, aria: 'internuclear distance in picometers',
    specials: [{ at: 74, label: 'bond length' }] });
  /* a Morse curve with the book's depth, 7.24 × 10⁻¹⁹ J at 74 pm; energies in units of 10⁻¹⁹ J */
  const DEPTH = 7.24, RE = 74, A = 0.0194, NA = 6.022e23;
  const E = (r) => DEPTH * ((1 - Math.exp(-A * (r - RE))) ** 2 - 1);
  /* fixed axes: 0 to 300 pm across the slider's reach, −8 to +6 × 10⁻¹⁹ J to hold the curve from 30 pm */
  const box = { l: 170, r: 1320, t: 250, b: 580 };
  const S = 1.3, RA = 46;                         /* the atoms above: 1.3 units per picometer, a drawn radius of 46 units */
  let hits = []; F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c);
    const r = R.v, e = E(r), cE = C('energy');
    const { X, Y } = axes(ctx, box, [0, 300], [-8, 6], { nx: 6, ny: 7, xl: 'internuclear distance (pm)', yl: 'energy (10⁻¹⁹ J)', yc: cE, fy: (v) => minus(fmt(v, 0)) });
    line(ctx, box.l, Y(-DEPTH), X(RE), Y(-DEPTH), alpha(PAL.ink, 0.35), 2, [4, 8]);
    line(ctx, X(RE), Y(-DEPTH), X(RE), box.b, alpha(PAL.ink, 0.35), 2, [4, 8]);
    curve(ctx, E, 30, 300, X, Y, cE, 5, 160);
    text(ctx, '−7.24 × 10⁻¹⁹ J at 74 pm', X(RE) + 34, Y(-DEPTH) + 4, cE, { size: 18, weight: 600, bg: PAL.panel });
    const p = pinned(ctx, box, X, Y, r, e, cE);
    /* the pair of atoms, centred over the point where the band allows, a leader down to the point */
    const half = (r * S) / 2, cx = Math.min(Math.max(X(r), box.l + half + RA + 10), 1380 - half - RA), cy = 140;
    line(ctx, cx, cy + RA + 6, p.x, p.y - 12, alpha(PAL.ink, 0.35), 2, [4, 8]);
    const over = Math.max(0, 1 - r / (2 * RA / S + 60));
    cloud(ctx, cx, cy, RA * 1.6 + half * over, 0.4 + 0.6 * over);
    cloud(ctx, cx - half, cy, RA * 1.5, 1 - over);
    cloud(ctx, cx + half, cy, RA * 1.5, 1 - over);
    atom(ctx, cx - half, cy, 'H', RA, 0.8); atom(ctx, cx + half, cy, 'H', RA, 0.8);
    dot(ctx, cx - half, cy, PAL.ink, true, 4); dot(ctx, cx + half, cy, PAL.ink, true, 4);
    text(ctx, 'H', cx - half - RA - 14, cy, PAL.ink, { size: 22, weight: 600, align: 'right' });
    text(ctx, 'H', cx + half + RA + 14, cy, PAL.ink, { size: 22, weight: 600 });
    hits = [{ x: cx - half, y: cy, r: RA, name: 'a hydrogen atom, its nucleus the dot' }, { x: cx + half, y: cy, r: RA, name: 'a hydrogen atom, its nucleus the dot' }];
    const eS = minus(fmt(e, 2)), kj = (e * 1e-19 * NA) / 1000;
    const at = r === RE, near = r < RE;
    headline(ctx, at ? 'At 74 pm the energy of the pair is −7.24 × 10⁻¹⁹ J, the lowest it reaches, so 74 pm is the bond length of H₂.'
      : near ? 'At ' + r + ' pm the nuclei repel each other and the energy has risen to ' + eS + ' × 10⁻¹⁹ J.'
      : 'At ' + r + ' pm the shared electrons are drawn to both nuclei and the energy is ' + eS + ' × 10⁻¹⁹ J.');
    F.tex(d.readout, `\\kE = ${eS}\\times 10^{-19}\\ \\text{J},\\quad \\kE\\times N_{\\text{A}} = ${minus(fmt(kj, 0))}\\ \\text{kJ/mol}`);
  }
  still(d, draw);
})();

/* =====================================================================
   FIGURE 7.6: Pauling's electronegativities, laid out as the book prints
   them. Still, a faithful copy with no controls: the metals, metalloids
   and nonmetals tinted as the book tints them, with categorical colours.
===================================================================== */
(function () {
  const d = sim('fig-en', 620);
  /* [symbol, value, column 1 to 17, row 0 to 6, class: 0 metal, 1 metalloid, 2 nonmetal] */
  const ROWS = [
    [['H', '2.1', 1, 2]],
    [['Li', '1.0'], ['Be', '1.5'], ['B', '2.0', 13, 1], ['C', '2.5', 14, 2], ['N', '3.0', 15, 2], ['O', '3.5', 16, 2], ['F', '4.0', 17, 2]],
    [['Na', '0.9'], ['Mg', '1.2'], ['Al', '1.5', 13], ['Si', '1.8', 14, 1], ['P', '2.1', 15, 2], ['S', '2.5', 16, 2], ['Cl', '3.0', 17, 2]],
    [['K', '0.8'], ['Ca', '1.0'], ['Sc', '1.3'], ['Ti', '1.5'], ['V', '1.6'], ['Cr', '1.6'], ['Mn', '1.5'], ['Fe', '1.8'], ['Co', '1.9'], ['Ni', '1.9'], ['Cu', '1.9'], ['Zn', '1.6'], ['Ga', '1.6'], ['Ge', '1.8', 14, 1], ['As', '2.0', 15, 2], ['Se', '2.4', 16, 2], ['Br', '2.8', 17, 2]],
    [['Rb', '0.8'], ['Sr', '1.0'], ['Y', '1.2'], ['Zr', '1.4'], ['Nb', '1.6'], ['Mo', '1.8'], ['Tc', '1.9'], ['Ru', '2.2'], ['Rh', '2.2'], ['Pd', '2.2'], ['Ag', '1.9'], ['Cd', '1.7'], ['In', '1.7'], ['Sn', '1.8'], ['Sb', '1.9', 15, 1], ['Te', '2.1', 16, 1], ['I', '2.5', 17, 2]],
    [['Cs', '0.7'], ['Ba', '0.9'], ['La–Lu', '1.0–1.2'], ['Hf', '1.3'], ['Ta', '1.5'], ['W', '1.7'], ['Re', '1.9'], ['Os', '2.2'], ['Ir', '2.2'], ['Pt', '2.2'], ['Au', '2.4'], ['Hg', '1.9'], ['Tl', '1.8'], ['Pb', '1.9'], ['Bi', '1.9'], ['Po', '2.0'], ['At', '2.2', 17, 2]],
    [['Fr', '0.7'], ['Ra', '0.9'], ['Ac', '1.1'], ['Th', '1.3'], ['Pa', '1.4'], ['U', '1.4'], ['Np–No', '1.4–1.3']],
  ];
  const CLASS = ['metals', 'metalloids', 'nonmetals'];
  const CW = 66, CH = 66, X0 = 150, Y0 = 118;
  function draw() {
    const { ctx } = begin(d.c);
    ROWS.forEach((row, ri) => {
      row.forEach(([s, v, col, cls], i) => {
        /* the p-block cells of the second and third rows carry their own column past the gap */
        const c = col ?? i + 1;
        const x = X0 + (c - 1) * CW, y = Y0 + ri * CH;
        ctx.save(); ctx.fillStyle = alpha(F.cat(cls ?? 0), 0.22); ctx.fillRect(x + 2, y + 2, CW - 4, CH - 4);
        ctx.strokeStyle = alpha(PAL.ink, 0.55); ctx.lineWidth = 1.5; ctx.strokeRect(x + 2, y + 2, CW - 4, CH - 4); ctx.restore();
        const long = s.length > 2;
        text(ctx, s, x + CW / 2, y + 26, PAL.ink, { size: long ? 15 : 22, weight: 600, align: 'center' });
        text(ctx, v, x + CW / 2, y + 50, PAL.ink, { size: long ? 12 : 15, align: 'center' });
      });
    });
    const xr = X0 + 17 * CW;
    arrow(ctx, X0, 62, xr, 62, PAL.ink, 3);
    text(ctx, 'Increasing electronegativity', (X0 + xr) / 2, 44, PAL.ink, { size: 20, weight: 600, align: 'center', bg: PAL.panel });
    arrow(ctx, 110, Y0, 110, Y0 + 7 * CH, PAL.ink, 3);
    text(ctx, 'Decreasing', 96, Y0 + 3.2 * CH, PAL.ink, { size: 17, weight: 600, align: 'right' });
    text(ctx, 'electro-', 96, Y0 + 3.2 * CH + 22, PAL.ink, { size: 17, weight: 600, align: 'right' });
    text(ctx, 'negativity', 96, Y0 + 3.2 * CH + 44, PAL.ink, { size: 17, weight: 600, align: 'right' });
    /* the legend of the three kinds, in the empty block above the transition metals */
    CLASS.forEach((n, i) => {
      const x = X0 + 3 * CW + i * 200, y = Y0 + 28;
      ctx.save(); ctx.fillStyle = alpha(F.cat(i), 0.22); ctx.strokeStyle = alpha(PAL.ink, 0.55); ctx.lineWidth = 1.5; ctx.fillRect(x, y - 12, 24, 24); ctx.strokeRect(x, y - 12, 24, 24); ctx.restore();
      text(ctx, n, x + 34, y, PAL.ink, { size: 18 });
    });
  }
  still(d, draw);
})();

/* =====================================================================
   FIGURE 7.5 + 7.8: a bond between two chosen atoms, its shared electron
   density drawn toward the more electronegative atom with the partial
   charges marked, and the electronegativity difference on the book's
   scale of bond type. Still: a choice of pair has no clock.
===================================================================== */
(function () {
  const d = sim('sim-polarity', 560);
  /* Pauling's values from Figure 7.6 and radii in picometers, for the elements the section and its exercises name */
  const EL = {
    H: [2.1, 37], Li: [1.0, 134], Na: [0.9, 154], K: [0.8, 196], Cs: [0.7, 225], Mg: [1.2, 130], Ca: [1.0, 174], Ba: [0.9, 198], Mn: [1.5, 139],
    B: [2.0, 82], C: [2.5, 77], Si: [1.8, 111], N: [3.0, 75], P: [2.1, 106], O: [3.5, 73], S: [2.5, 102], Se: [2.4, 116], F: [4.0, 71], Cl: [3.0, 99], Br: [2.8, 114], I: [2.5, 133],
  };
  const NAMES = { H: 'hydrogen', Li: 'lithium', Na: 'sodium', K: 'potassium', Cs: 'cesium', Mg: 'magnesium', Ca: 'calcium', Ba: 'barium', Mn: 'manganese', B: 'boron', C: 'carbon', Si: 'silicon', N: 'nitrogen', P: 'phosphorus', O: 'oxygen', S: 'sulfur', Se: 'selenium', F: 'fluorine', Cl: 'chlorine', Br: 'bromine', I: 'iodine' };
  const opts = Object.keys(EL).map((s) => ({ value: s, label: s }));
  const SA = F.select(d.controls, { label: '\\text{atom A}', aria: 'first atom of the bond', options: opts, value: 'H' });
  const SB = F.select(d.controls, { label: '\\text{atom B}', aria: 'second atom of the bond', options: opts, value: 'Cl' });
  const rad = (pm) => 18 + 0.2 * pm;
  let hits = []; F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c);
    const a = SA.value, b = SB.value, enA = EL[a][0], enB = EL[b][0], dEN = Math.abs(enB - enA);
    /* blended through each choice's morph, so the cloud slides from one pair to the next */
    const eA = SA.mix((s) => EL[s][0]), eB = SB.mix((s) => EL[s][0]), rA = SA.mix((s) => rad(EL[s][1])), rB = SB.mix((s) => rad(EL[s][1]));
    const f = 0.5 + 0.5 * Math.tanh((eB - eA) / 1.1);          /* the share of the pair held near B */
    const xA = 520, xB = 880, y = 210;
    const cov = 1 - Math.abs(2 * f - 1);
    cloud(ctx, (xA + xB) / 2 + (f - 0.5) * 260, y, 150 + 40 * cov, 0.5 * cov + 0.1);
    cloud(ctx, xA, y, (rA + 40) * Math.sqrt(2 * (1 - f)) + 10, 1);
    cloud(ctx, xB, y, (rB + 40) * Math.sqrt(2 * f) + 10, 1);
    line(ctx, xA, y, xB, y, alpha(PAL.ink, 0.5), 3);
    atom(ctx, xA, y, a, rA * 0.55); atom(ctx, xB, y, b, rB * 0.55);
    dot(ctx, xA, y, PAL.ink, true, 4); dot(ctx, xB, y, PAL.ink, true, 4);
    text(ctx, a, xA - 130, y, PAL.ink, { size: 26, weight: 600, align: 'right' });
    text(ctx, b, xB + 130, y, PAL.ink, { size: 26, weight: 600 });
    text(ctx, 'EN = ' + fmt(enA, 1), xA - 130, y + 34, PAL.muted, { size: 17, align: 'right' });
    text(ctx, 'EN = ' + fmt(enB, 1), xB + 130, y + 34, PAL.muted, { size: 17 });
    hits = [{ x: xA, y, r: 60, name: NAMES[a] + ', electronegativity ' + fmt(enA, 1) }, { x: xB, y, r: 60, name: NAMES[b] + ', electronegativity ' + fmt(enB, 1) }];
    if (dEN > 0) {
      const negB = enB > enA, xn = negB ? xB : xA, xp = negB ? xA : xB;
      text(ctx, 'δ–', xn, y - 92, PAL.ink, { size: 26, weight: 600, align: 'center' });
      text(ctx, 'δ+', xp, y - 92, PAL.ink, { size: 26, weight: 600, align: 'center' });
      /* the book's crossed arrow, pointing from the positive end to the negative end */
      const s = negB ? 1 : -1, x1 = (xA + xB) / 2 - s * 90, x2 = (xA + xB) / 2 + s * 90, ya = y - 88;
      arrow(ctx, x1, ya, x2, ya, PAL.ink, 3);
      line(ctx, x1 + s * 22, ya - 12, x1 + s * 22, ya + 12, PAL.ink, 3);
    }
    /* the scale of Figure 7.8: ΔEN from 0 to 3.5, cut at 0.4 and 1.8 */
    const l = 180, r = 1260, ys = 430, X = (v) => l + ((r - l) * v) / 3.5;
    const BANDS = [[0, 0.4, 'pure covalent', 0.05], [0.4, 1.8, 'polar covalent', 0.12], [1.8, 3.5, 'ionic', 0.22]];
    BANDS.forEach(([u, v, n, k]) => {
      ctx.save(); ctx.fillStyle = alpha(PAL.ink, k); ctx.fillRect(X(u), ys - 24, X(v) - X(u), 48); ctx.restore();
      text(ctx, n, (X(u) + X(v)) / 2, ys - 48, PAL.ink, { size: 18, weight: 600, align: 'center' });
    });
    for (let v = 0; v <= 3.5 + 1e-9; v += 0.5) { line(ctx, X(v), ys + 24, X(v), ys + 34, PAL.muted, 2); text(ctx, fmt(v, 1), X(v), ys + 52, PAL.muted, { size: 17, align: 'center' }); }
    text(ctx, 'ΔEN', l - 20, ys, PAL.ink, { size: 22, weight: 600, align: 'right' });
    const m = X(Math.abs(eB - eA));
    ctx.save(); ctx.fillStyle = PAL.ink; ctx.beginPath(); ctx.moveTo(m, ys + 22); ctx.lineTo(m - 11, ys + 40); ctx.lineTo(m + 11, ys + 40); ctx.closePath(); ctx.fill(); ctx.restore();
    line(ctx, m, ys - 24, m, ys + 22, PAL.ink, 4);
    text(ctx, 'covalent character decreases, ionic character increases →', r, ys + 92, PAL.muted, { size: 16, align: 'right' });
    const type = dEN < 0.4 ? 'pure covalent' : dEN <= 1.8 ? 'polar covalent' : 'ionic';
    const bond = a + '–' + b;
    headline(ctx, dEN === 0 ? 'The two ' + NAMES[a] + ' atoms have the same electronegativity, so the ' + bond + ' bond is pure covalent and its electrons are shared equally.'
      : 'The ' + bond + ' bond has ΔEN = ' + fmt(dEN, 1) + ', so the scale reads ' + type + ', and ' + NAMES[enB > enA ? b : a] + ' carries the partial negative charge.');
    const hi = enB >= enA ? [b, enB, a, enA] : [a, enA, b, enB];
    F.tex(d.readout, `\\Delta\\text{EN} = |\\text{EN}_{\\text{${hi[0]}}} - \\text{EN}_{\\text{${hi[2]}}}| = |${fmt(hi[1], 1)} - ${fmt(hi[3], 1)}| = ${fmt(dEN, 1)}`);
  }
  still(d, draw);
})();
};
