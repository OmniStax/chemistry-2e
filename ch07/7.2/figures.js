/* Figures for section 7.2 Covalent Bonding. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['7.2'] = function (root, F) {
const { fmt, tex, C, PAL, alpha, ctl, register, begin, line, arrow, dot, text, headline, axes, plot, pinned, hbracket, legend } = F;
const sim = (id, H) => F.sim(root, id, H);
const still = (d, draw) => register(d.fig, { update: () => {}, draw });
const TAU = 2 * Math.PI;
const minus = (s) => s.replace('-', '−');

/* =====================================================================
   FIGURE 7.4: the potential energy of two hydrogen atoms against the
   distance between their nuclei. The two atoms stand above the graph on
   the graph's own scale: the left nucleus over 0 pm, the right nucleus
   over the point on the curve, so the distance between the nuclei is the
   reading on the axis. Still: the energy answers the distance.
   Axes fixed: 0 to 400 pm, −8 to +4 × 10⁻¹⁹ J (the curve reaches +3.5 at 33 pm).
===================================================================== */
(function () {
  const d = sim('sim-bond', 800);
  const R = ctl(d.controls, { label: '\\text{internuclear distance}', cls: 'length', min: 33, max: 400, step: 1, value: 74, unit: 'pm', dec: 0, aria: 'internuclear distance in picometers',
    specials: [{ at: 74, label: 'bond length' }] });
  /* a Morse curve with the book's depth, 7.24 × 10⁻¹⁹ J at 74 pm; energies in units of 10⁻¹⁹ J */
  const DEPTH = 7.24, RE = 74, A = 0.0194, NA = 6.022e23;
  const E = (r) => DEPTH * ((1 - Math.exp(-A * (r - RE))) ** 2 - 1);
  const box = { l: 240, r: 1160, t: 470, b: 720 };
  const S = (box.r - box.l) / 400;                /* units per picometer, the same for the atoms and the axis */
  const RC = 80 * S, CY = 200;                    /* each 1s cloud is drawn out to 80 pm from its nucleus */
  /* the cloud of one 1s electron: densest at the nucleus, thinning outward with no edge */
  function cloud(ctx, x) {
    const g = ctx.createRadialGradient(x, CY, 0, x, CY, RC), n = 8, k = Math.exp(-3);
    for (let i = 0; i <= n; i += 1) g.addColorStop(i / n, alpha(PAL.ink, 0.62 * (Math.exp(-3 * i / n) - k) / (1 - k)));
    ctx.save(); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, CY, RC, 0, TAU); ctx.fill(); ctx.restore();
  }
  let hits = []; F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c);
    const r = R.v, e = E(r), cE = C('energy'), cL = C('length');
    const ax = axes(ctx, box, [0, 400], [-8, 4], { nx: 4, ny: 6, xl: 'internuclear distance (pm)', xc: cL, fy: (v) => minus(fmt(v, 0)) });
    const { X, Y } = ax;
    ctx.save(); ctx.translate(150, (box.t + box.b) / 2); ctx.rotate(-Math.PI / 2);
    text(ctx, 'energy (10⁻¹⁹ J)', 0, 0, cE, { size: 20, weight: 600, align: 'center' }); ctx.restore();
    /* the book's two guides: the lowest energy and the distance it is reached at */
    line(ctx, box.l, Y(-DEPTH), X(RE), Y(-DEPTH), alpha(PAL.ink, 0.35), 2, [4, 8]);
    line(ctx, X(RE), Y(-DEPTH), X(RE), box.b, alpha(PAL.ink, 0.35), 2, [4, 8]);
    plot(ctx, ax, E, cE, { w: 5, x: [33, 400] });
    text(ctx, '−7.24 × 10⁻¹⁹ J', X(100), Y(-DEPTH), cE, { size: 18, weight: 600, bg: PAL.panel });
    text(ctx, '74', X(RE), box.b + 26, cL, { size: 17, weight: 600, align: 'center', bg: PAL.panel });
    text(ctx, 'bond length of H₂', X(RE), box.b + 52, cL, { size: 17, weight: 600, align: 'center' });
    /* the two atoms on the axis's scale, the right nucleus over the point */
    const xa = X(0), xb = X(r), yb = CY + RC + 18;
    cloud(ctx, xa); cloud(ctx, xb);
    dot(ctx, xa, CY, PAL.ink, true, 5); dot(ctx, xb, CY, PAL.ink, true, 5);
    text(ctx, 'H', xa - RC - 6, CY, PAL.ink, { size: 24, weight: 600, align: 'right' });
    text(ctx, 'H', xb + RC + 6, CY, PAL.ink, { size: 24, weight: 600 });
    line(ctx, xa, CY + 10, xa, yb - 12, alpha(PAL.ink, 0.35), 2, [4, 8]);
    line(ctx, xb, CY + 10, xb, yb - 12, alpha(PAL.ink, 0.35), 2, [4, 8]);
    hbracket(ctx, xa, xb, yb, cL, r + ' pm', { side: 'below' });
    line(ctx, xb, yb + 12, xb, Y(Math.min(e, 4)) - 12, alpha(PAL.ink, 0.35), 2, [4, 8]);
    /* what holds on each side of the bond length; the side the atoms are on is set in ink */
    text(ctx, 'closer, the two nuclei repel', X(84), Y(2.6), r < RE ? PAL.ink : PAL.muted, { size: 18, bg: PAL.panel });
    text(ctx, 'each electron is attracted to both nuclei', X(250), Y(-3.7), r > RE ? PAL.ink : PAL.muted, { size: 18, align: 'center', bg: PAL.panel });
    pinned(ctx, box, X, Y, r, e, cE);
    const name = 'a hydrogen atom: its nucleus and the cloud of its 1s electron';
    hits = [{ x: xa, y: CY, r: RC * 0.6, name }, { x: xb, y: CY, r: RC * 0.6, name }];
    const eS = minus(fmt(e, 2)), kj = (e * 1e-19 * NA) / 1000;
    tex(d.readout, `\\kE \\times N_{\\text{A}} = (\\htmlClass{kv-energy}{${eS} \\times 10^{-19}\\ \\text{J}})(6.022 \\times 10^{23}\\ \\text{mol}^{-1}) = \\htmlClass{kv-energy}{${minus(fmt(kj, 0))}\\ \\text{kJ/mol}}`);
  }
  still(d, draw);
})();

/* =====================================================================
   FIGURE 7.5 + 7.8: a bond between two chosen atoms. The molecule is
   shaded by where the shared electrons are, darker round the more
   electronegative atom, with the partial charges and the book's crossed
   arrow; beneath it ΔEN stands on the scale of Figure 7.8, cut at 0.4
   and 1.8. Still: a choice of pair has no clock.
===================================================================== */
(function () {
  const d = sim('sim-polarity', 700);
  /* Pauling's values from Figure 7.6, radii in picometers and the kind of element (M metal, D metalloid, N nonmetal) as Figure 7.6 tints them */
  const EL = {
    H: [2.1, 37, 'N'], Li: [1.0, 134, 'M'], Na: [0.9, 154, 'M'], K: [0.8, 196, 'M'], Cs: [0.7, 225, 'M'], Mg: [1.2, 130, 'M'], Ca: [1.0, 174, 'M'], Ba: [0.9, 198, 'M'], Mn: [1.5, 139, 'M'],
    B: [2.0, 82, 'D'], C: [2.5, 77, 'N'], Si: [1.8, 111, 'D'], N: [3.0, 75, 'N'], P: [2.1, 106, 'N'], O: [3.5, 73, 'N'], S: [2.5, 102, 'N'], Se: [2.4, 116, 'N'], F: [4.0, 71, 'N'], Cl: [3.0, 99, 'N'], Br: [2.8, 114, 'N'], I: [2.5, 133, 'N'],
  };
  const NAMES = { H: 'hydrogen', Li: 'lithium', Na: 'sodium', K: 'potassium', Cs: 'cesium', Mg: 'magnesium', Ca: 'calcium', Ba: 'barium', Mn: 'manganese', B: 'boron', C: 'carbon', Si: 'silicon', N: 'nitrogen', P: 'phosphorus', O: 'oxygen', S: 'sulfur', Se: 'selenium', F: 'fluorine', Cl: 'chlorine', Br: 'bromine', I: 'iodine' };
  const KIND = { M: 'metal', D: 'metalloid', N: 'nonmetal' };
  const opt = (s) => ({ value: s, label: s });
  /* the second atom is never a metal, so no pair of two metals can be chosen: the scale is for bonds that hold a nonmetal */
  const SA = F.select(d.controls, { label: '\\text{atom A}', aria: 'first atom of the bond', options: Object.keys(EL).map(opt), value: 'H' });
  const SB = F.select(d.controls, { label: '\\text{atom B}', aria: 'second atom of the bond, a nonmetal or a metalloid', options: Object.keys(EL).filter((s) => EL[s][2] !== 'M').map(opt), value: 'Cl' });
  const rad = (pm) => 12 * Math.sqrt(pm);         /* drawn radius: larger atoms larger, hydrogen still large enough to shade */
  const cap = (s) => s[0].toUpperCase() + s.slice(1);
  const CX = 700, CY = 330;
  let hits = []; F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c);
    const a = SA.value, b = SB.value, enA = EL[a][0], enB = EL[b][0], d10 = Math.round(Math.abs(enB - enA) * 10), dEN = d10 / 10;
    /* blended through each choice's morph, so the shading slides from one pair to the next */
    const eA = SA.mix((s) => EL[s][0]), eB = SB.mix((s) => EL[s][0]), rA = SA.mix((s) => rad(EL[s][1])), rB = SB.mix((s) => rad(EL[s][1]));
    const f = 0.5 + 0.5 * Math.tanh((eB - eA) / 1.1);          /* the share of the bonding pair held near B */
    const sep = 0.8 * (rA + rB), xA = CX - sep / 2 + (rA - rB) / 2, xB = xA + sep, top = CY - Math.max(rA, rB);
    const dens = (share) => 0.08 + 0.6 * share;
    /* each atom in its element colour, then the shared electrons over it, darker where there are more of them */
    [[xA, rA, a, 1 - f], [xB, rB, b, f]].forEach(([x, r, s, share]) => {
      ctx.save(); ctx.beginPath(); ctx.arc(x, CY, r, 0, TAU); ctx.globalAlpha *= 0.5; ctx.fillStyle = F.el(s); ctx.fill(); ctx.restore();
      const g = ctx.createRadialGradient(x, CY, 0, x, CY, r);
      g.addColorStop(0, alpha(PAL.ink, dens(share))); g.addColorStop(1, alpha(PAL.ink, 0.55 * dens(share)));
      ctx.save(); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, CY, r, 0, TAU); ctx.fill(); ctx.restore();
    });
    [[xA, rA], [xB, rB]].forEach(([x, r]) => { ctx.save(); ctx.beginPath(); ctx.arc(x, CY, r, 0, TAU); ctx.lineWidth = 2; ctx.strokeStyle = alpha(PAL.ink, 0.6); ctx.stroke(); ctx.restore(); });
    dot(ctx, xA, CY, PAL.ink, true, 5); dot(ctx, xB, CY, PAL.ink, true, 5);
    [[xA - rA - 26, 'right', a, enA], [xB + rB + 26, 'left', b, enB]].forEach(([x, align, s, en]) => {
      text(ctx, s, x, CY - 30, PAL.ink, { size: 28, weight: 600, align });
      text(ctx, 'EN = ' + fmt(en, 1), x, CY + 4, PAL.ink, { size: 20, align });
      text(ctx, KIND[EL[s][2]], x, CY + 32, PAL.muted, { size: 18, align });
    });
    hits = [{ x: xA, y: CY, r: rA, name: NAMES[a] + ', a ' + KIND[EL[a][2]] + ': its nucleus is the dot' }, { x: xB, y: CY, r: rB, name: NAMES[b] + ', a ' + KIND[EL[b][2]] + ': its nucleus is the dot' }];
    if (d10 > 0) {
      const negB = enB > enA, xn = negB ? xB : xA, xp = negB ? xA : xB, cQ = C('charge'), cMu = C('dipole-moment');
      text(ctx, 'δ−', xn, top - 26, cQ, { size: 26, weight: 600, align: 'center' });
      text(ctx, 'δ+', xp, top - 26, cQ, { size: 26, weight: 600, align: 'center' });
      /* the book's crossed arrow, from the positive end to the negative end */
      const s = negB ? 1 : -1, x1 = xp - s * 34, x2 = xn + s * 34, ya = top - 62;
      arrow(ctx, x1, ya, x2, ya, cMu, 4);
      line(ctx, x1 + s * 22, ya - 12, x1 + s * 22, ya + 12, cMu, 4);
      hits.push({ x: (x1 + x2) / 2, y: ya, r: 40, name: 'points from the positive end of the bond to the negative end' });
    }
    legend(ctx, { l: 40, r: 460, t: 370, b: 510 }, [{ ramp: [alpha(PAL.ink, dens(0)), alpha(PAL.ink, dens(1))], ends: ['fewer', 'more'], s: 'shared electrons near the atom' }], { corner: 'bl' });
    /* the scale of Figure 7.8: ΔEN from 0 to 3.4 (cesium and fluorine differ by 3.3), cut at 0.4 and 1.8 */
    const l = 120, r = 1280, yt = 580, yb = 628, X = (v) => l + ((r - l) * v) / 3.4;
    const BANDS = [[0, 0.4, 'pure covalent', 0.05], [0.4, 1.8, 'polar covalent', 0.12], [1.8, 3.4, 'ionic', 0.22]];
    const type = d10 < 4 ? 0 : d10 <= 18 ? 1 : 2;
    BANDS.forEach(([u, v, n, k], i) => {
      ctx.save(); ctx.fillStyle = alpha(PAL.ink, k); ctx.fillRect(X(u), yt, X(v) - X(u), yb - yt); ctx.restore();
      text(ctx, n, (X(u) + X(v)) / 2, (yt + yb) / 2, PAL.ink, { size: 18, weight: i === type ? 600 : 400, align: 'center' });
    });
    [0, 0.4, 1, 1.8, 2, 3].forEach((v) => { line(ctx, X(v), yb, X(v), yb + 10, PAL.muted, 2); text(ctx, fmt(v, v === 0.4 || v === 1.8 ? 1 : 0), X(v), yb + 28, PAL.muted, { size: 17, align: 'center' }); });
    text(ctx, 'ΔEN', l - 18, (yt + yb) / 2, PAL.ink, { size: 22, weight: 600, align: 'right' });
    const m = X(Math.abs(eB - eA));
    ctx.save(); ctx.fillStyle = PAL.ink; ctx.beginPath(); ctx.moveTo(m, yt); ctx.lineTo(m - 13, yt - 22); ctx.lineTo(m + 13, yt - 22); ctx.closePath(); ctx.fill(); ctx.restore();
    text(ctx, fmt(dEN, 1), Math.min(Math.max(m, l + 20), r - 20), yt - 40, PAL.ink, { size: 22, weight: 600, align: 'center' });
    hits.push({ x: m, y: yt - 10, r: 26, name: 'the electronegativity difference of ' + a + ' and ' + b });
    arrow(ctx, l, yb + 62, r, yb + 62, PAL.muted, 2.5);
    text(ctx, 'covalent character decreases, ionic character increases', (l + r) / 2, yb + 62, PAL.muted, { size: 17, align: 'center', bg: PAL.panel });
    /* the verdict: what the scale reads, and what the kinds of atom say where the text's rule of thumb disagrees with it */
    const neg = enB > enA ? b : a, pos = enB > enA ? a : b, kinds = EL[a][2] + EL[b][2];
    const metal = EL[a][2] === 'M' ? a : null, mixed = metal && EL[b][2] === 'N', both = kinds === 'NN';
    headline(ctx, a === b ? 'Two ' + NAMES[a] + ' atoms attract the shared electrons equally: a pure covalent bond.'
      : d10 === 0 ? cap(NAMES[a]) + ' and ' + NAMES[b] + ' have the same electronegativity, so they share the electrons equally.'
      : type === 0 ? cap(NAMES[neg]) + ' attracts the shared electrons only a little more than ' + NAMES[pos] + ': close to a pure covalent bond.'
      : type === 1 && mixed ? 'The scale reads polar covalent, but ' + NAMES[a] + ' is a metal and ' + NAMES[b] + ' a nonmetal, a pair that is often ionic.'
      : type === 1 ? cap(NAMES[neg]) + ' attracts the shared electrons more strongly than ' + NAMES[pos] + ': a polar covalent bond.'
      : mixed ? cap(NAMES[a]) + ' is a metal, ' + NAMES[b] + ' a nonmetal, and the difference is large: an ionic bond.'
      : both ? 'The scale reads ionic, but ' + NAMES[a] + ' and ' + NAMES[b] + ' are both nonmetals, and two nonmetals generally share electrons.'
      : 'A difference above 1.8 reads as ionic on this rough scale.');
    const hi = enB >= enA ? [b, enB, a, enA] : [a, enA, b, enB];
    tex(d.readout, `\\Delta\\text{EN} = |\\text{EN}_{\\text{${hi[0]}}} - \\text{EN}_{\\text{${hi[2]}}}| = |${fmt(hi[1], 1)} - ${fmt(hi[3], 1)}| = ${fmt(dEN, 1)}`);
  }
  still(d, draw);
})();
};
