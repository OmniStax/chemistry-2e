/* Figures for section 20.3 Aldehydes, Ketones, Carboxylic Acids, and Esters. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['20.3'] = function (root, F) {
const { PAL, alpha, register, begin, line, text, headline, tex } = F;
const lerp = (a, b, k) => a + (b - a) * k;

/* =====================================================================
   FIGURE 20.14: the carbonyl group. The strip holds the book's drawing:
   the C=O with δ+ on carbon and δ− on oxygen, R¹ and R² on the carbon,
   and the ~120° angle. Under it the group turns in three dimensions, so
   the reader sees the three σ bonds of the sp² carbon lie in one plane,
   with the unhybridized p orbitals of carbon and oxygen standing square
   to that plane; a choice lets the two overlap into the π bond above and
   below the C–O axis, as the text describes. Still: a structure has no
   clock. Free orbit, idle spin. C=O 1.21 Å, C–R 1.5 Å, angles 120°.
===================================================================== */
(function () {
  const H = 270, d = F.sim(root, 'sim-carbonyl', H);
  const pick = F.choice(d.controls, { label: '\\text{the two } p \\text{ orbitals}', key: 'orbitals', aria: 'the p orbitals of carbon and oxygen apart or overlapping', value: 'p',
    options: [{ value: 'p', label: 'one on each atom' }, { value: 'pi', label: 'overlapping' }] });
  const HEAD = {
    p: 'The three σ bonds lie in one plane; the p orbitals of C and O stand perpendicular to it.',
    pi: 'Side by side, the two p orbitals overlap above and below the C–O axis: the π bond.',
  };
  let hits = []; F.hover(d.stage, () => hits);
  const ro = F.readout(d);
  const NAME = { C: 'carbonyl carbon atom, sp² hybridized', O: 'carbonyl oxygen atom', R: 'R group, a carbon chain or a hydrogen atom' };
  /* ---------- the strip: the book's drawing ---------- */
  const CX = 700, CY = 180, B = 120, A = Math.PI / 6, GAP = 20;
  const at = (x, y, ang, r) => [x + r * Math.cos(ang), y - r * Math.sin(ang)];
  function bondLine(ctx, p, q, order = 1, g1 = GAP, g2 = GAP) {
    const dx = q[0] - p[0], dy = q[1] - p[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L;
    const a = [p[0] + ux * g1, p[1] + uy * g1], b = [q[0] - ux * g2, q[1] - uy * g2];
    (order === 2 ? [-5, 5] : [0]).forEach((o) => line(ctx, a[0] - uy * o, a[1] + ux * o, b[0] - uy * o, b[1] + ux * o, PAL.ink, 3));
  }
  function draw2d(ctx) {
    const C0 = [CX, CY], O0 = [CX, CY - B], L0 = at(CX, CY, Math.PI + A, B), R0 = at(CX, CY, -A, B);
    bondLine(ctx, C0, O0, 2); bondLine(ctx, C0, L0, 1, GAP, 26); bondLine(ctx, C0, R0, 1, GAP, 26);
    [['C', C0, NAME.C], ['O', O0, NAME.O], ['R¹', L0, NAME.R], ['R²', R0, NAME.R]].forEach(([s, p, name]) => {
      text(ctx, s, p[0], p[1] + 1, PAL.ink, { size: 30, align: 'center' }); hits.push({ x: p[0], y: p[1], r: 22, name });
    });
    text(ctx, 'δ+', CX - 26, CY - 26, PAL.ink, { size: 24, align: 'right' });
    text(ctx, 'δ−', CX - 24, CY - B - 4, PAL.ink, { size: 24, align: 'right' });
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(CX, CY, 58, -Math.PI / 2 + 0.14, -A - 0.14); ctx.stroke(); ctx.restore();
    text(ctx, '~120°', CX + 70, CY - 56, PAL.ink, { size: 22, align: 'left' });
  }
  /* ---------- the group in three dimensions: its plane is xy, the p orbitals run along z ---------- */
  const P3 = { C: [0, 0, 0], O: [0, 1.21, 0], L: [-1.5 * Math.cos(A), -1.5 * Math.sin(A), 0], R: [1.5 * Math.cos(A), -1.5 * Math.sin(A), 0] };
  const v = F.view3d(d.stage, { spin: 'idle', h: 480, dist: 10, tilt: 0.3 });
  v.setView(0.6, 0.3);
  const g = v.part(0); g.position.set(0, -0.45, 0);
  let sig = '', lobes = null, cloud = null;
  const palSig = () => [PAL.ink, PAL.panel, PAL.muted, F.el('C'), F.el('O'), F.el('R')].join('|');
  function build() {
    const s = palSig(); if (s === sig) return; sig = s;
    v.clear();
    const T = window.THREE;
    lobes = new T.Group(); cloud = new T.Group(); g.add(lobes); g.add(cloud);
    v.pickable(F.mesh.sphere(g, P3.C, 0.32, F.el('C')), NAME.C);
    v.pickable(F.mesh.sphere(g, P3.O, 0.3, F.el('O')), NAME.O);
    v.pickable(F.mesh.sphere(g, P3.L, 0.36, F.el('R')), NAME.R);
    v.pickable(F.mesh.sphere(g, P3.R, 0.36, F.el('R')), NAME.R);
    F.mesh.bond(g, P3.C, P3.O, 1, 0.08); F.mesh.bond(g, P3.C, P3.L, 1, 0.08); F.mesh.bond(g, P3.C, P3.R, 1, 0.08);
    v.label('R¹', [P3.L[0] * 1.95, P3.L[1] * 1.95, 0], g); v.label('R²', [P3.R[0] * 1.95, P3.R[1] * 1.95, 0], g);
    [[P3.C, 'lobe of the unhybridized p orbital on carbon'], [P3.O, 'lobe of a p orbital on oxygen']].forEach(([p, name]) =>
      [1, -1].forEach((z) => v.pickable(F.mesh.lobe(lobes, p, [0, 0, z], 0.9, PAL.ink), name)));
    [1, -1].forEach((z) => {
      const m = F.mesh.sphere(cloud, [0, 0.6, 0.55 * z], 1, PAL.ink, { transparent: true, opacity: 0.4 });
      m.scale.set(0.34, 0.95, 0.3); v.pickable(m, `π bond, ${z > 0 ? 'one side' : 'the other side'} of the plane`);
    });
  }
  function draw() {
    const { ctx } = begin(d.c); hits = [];
    draw2d(ctx);
    ro.set('\\text{C=O} = 1\\ \\sigma\\ \\text{bond}\\ (sp^{2}\\text{ on C}) + 1\\ \\pi\\ \\text{bond}\\ (p\\text{ on C} + p\\text{ on O})');
    if (!v.scene) return;
    build();
    const k = pick.mix((x) => (x === 'pi' ? 1 : 0));
    F.fade3(lobes, 1 - k); F.fade3(cloud, k);
    lobes.visible = k < 0.99; cloud.visible = k > 0.01;
    v.headline(HEAD[pick.value]);
    v.invalidate();
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   SIM (Example 20.10): CH4 -> CH3OH -> CH2O -> HCO2H -> CO2, each step
   one C-H bond traded for a C-O bond. The molecule is drawn flat with
   its atoms in their element colours; beneath it, carbon's oxidation
   number on a fixed scale from -4 to +4. Still: a series of states;
   the choice morphs, atoms that stay gliding to their new places, a
   leaving hydrogen fading where the oxygen arrives.
===================================================================== */
(function () {
  const d = F.sim(root, 'sim-carbon-oxidation', 480);
  const ORDER = ['CH4', 'CH3OH', 'CH2O', 'HCO2H', 'CO2'];
  const c30 = Math.cos(Math.PI / 6), s30 = 0.5;
  /* atoms by key in bond lengths about carbon, y down; bonds by key pair and order */
  const MOL = {
    CH4: { label: 'CH₄', tex: '\\text{CH}_{4}', name: 'methane', ox: -4, nH: 4, nO: 0,
      atoms: { C: [0, 0], Ha: [0, -1], Hb: [-1, 0], Hc: [0, 1], Hd: [1, 0] },
      bonds: [['C', 'Ha', 1], ['C', 'Hb', 1], ['C', 'Hc', 1], ['C', 'Hd', 1]] },
    CH3OH: { label: 'CH₃OH', tex: '\\text{CH}_{3}\\text{OH}', name: 'methanol', ox: -2, nH: 4, nO: 1,
      atoms: { C: [0, 0], Ha: [0, -1], Hb: [-1, 0], Hc: [0, 1], O1: [1, 0], Ho1: [1.8, 0] },
      bonds: [['C', 'Ha', 1], ['C', 'Hb', 1], ['C', 'Hc', 1], ['C', 'O1', 1], ['O1', 'Ho1', 1]] },
    CH2O: { label: 'CH₂O', tex: '\\text{CH}_{2}\\text{O}', name: 'formaldehyde', ox: 0, nH: 2, nO: 1,
      atoms: { C: [0, 0], O1: [0, -1.05], Hb: [-c30, s30], Hc: [c30, s30] },
      bonds: [['C', 'O1', 2], ['C', 'Hb', 1], ['C', 'Hc', 1]] },
    HCO2H: { label: 'HCO₂H', tex: '\\text{HCO}_{2}\\text{H}', name: 'formic acid', ox: 2, nH: 2, nO: 2,
      atoms: { C: [0, 0], O1: [0, -1.05], Hb: [-c30, s30], O2: [c30, s30], Ho2: [c30 + 0.8, s30] },
      bonds: [['C', 'O1', 2], ['C', 'Hb', 1], ['C', 'O2', 1], ['O2', 'Ho2', 1]] },
    CO2: { label: 'CO₂', tex: '\\text{CO}_{2}', name: 'carbon dioxide', ox: 4, nH: 0, nO: 2,
      atoms: { C: [0, 0], O1: [-1.1, 0], O2: [1.1, 0] },
      bonds: [['C', 'O1', 2], ['C', 'O2', 2]] },
  };
  const COUNT = ['no', 'one', 'two', 'three', 'four'];
  const tally = (m) => {
    const ch = MOL[m].bonds.filter(([a, b]) => a === 'C' && b[0] === 'H').length;
    const co = MOL[m].bonds.filter(([a, b]) => a === 'C' && b[0] === 'O').reduce((s, b) => s + b[2], 0);
    return [ch, co];
  };
  const HEAD = Object.fromEntries(ORDER.map((m) => {
    const [ch, co] = tally(m), t = MOL[m];
    const bonds = (n, w) => `${COUNT[n]} ${w}${n === 1 ? '' : 's'}`;
    return [m, `In ${t.name}, $${t.tex}$, carbon has ${bonds(ch, 'C–H bond')} and ${bonds(co, 'bond')} to oxygen.`];
  }));
  const mol = F.choice(d.controls, { label: '\\text{molecule}', key: 'molecule', aria: 'the molecule on the oxidation ladder',
    options: ORDER.map((v) => ({ value: v, label: MOL[v].label })), value: 'CH4', onInput: () => draw() });
  const ro = F.readout(d);
  let hits = []; F.hover(d.stage, () => hits);

  const MX = 640, MY = 200, BL = 112, RAD = { C: 22, O: 21, H: 14 };
  const NAME = { C: 'carbon atom', O: 'oxygen atom', H: 'hydrogen atom' };
  const P = (p) => [MX + p[0] * BL, MY + p[1] * BL];
  function disc(ctx, x, y, s, a) {
    if (a <= 0.01) return;
    ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.arc(x, y, RAD[s], 0, 2 * Math.PI); ctx.fillStyle = F.el(s); ctx.fill();
    ctx.lineWidth = s === 'H' ? 2 : 1.2; ctx.strokeStyle = s === 'H' ? PAL.ink : alpha(PAL.ink, 0.4); ctx.stroke(); ctx.restore();
  }
  function stick(ctx, p, q, sa, sb, order2, a) {
    if (a <= 0.01) return;
    const dx = q[0] - p[0], dy = q[1] - p[1], L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L;
    const x1 = p[0] + ux * (RAD[sa] - 4), y1 = p[1] + uy * (RAD[sa] - 4), x2 = q[0] - ux * (RAD[sb] - 4), y2 = q[1] - uy * (RAD[sb] - 4);
    const o = 5 * order2;
    ctx.save(); ctx.globalAlpha *= a;
    line(ctx, x1 + uy * o, y1 - ux * o, x2 + uy * o, y2 - ux * o, PAL.ink, 3.5);
    if (order2 > 0.01) { ctx.save(); ctx.globalAlpha *= order2; line(ctx, x1 - uy * o, y1 + ux * o, x2 - uy * o, y2 + ux * o, PAL.ink, 3.5); ctx.restore(); }
    ctx.restore();
  }

  /* the oxidation-number scale, fixed from -4 to +4 */
  const SY = 400, XA = 300, XB = 1100, X = (n) => XA + ((n + 4) / 8) * (XB - XA);
  function drawScale(ctx) {
    line(ctx, XA, SY, XB, SY, PAL.muted, 3);
    for (let n = -4; n <= 4; n++) {
      line(ctx, X(n), SY, X(n), SY + 9, PAL.muted, 2);
      text(ctx, n > 0 ? `+${n}` : n < 0 ? `−${-n}` : '0', X(n), SY + 30, PAL.muted, { size: 17, align: 'center' });
    }
    text(ctx, 'oxidation number of carbon', (XA + XB) / 2, SY + 60, PAL.ink, { size: 20, align: 'center' });
    text(ctx, 'more reduced', XA - 20, SY + 2, PAL.muted, { size: 17, align: 'right' });
    text(ctx, 'more oxidized', XB + 20, SY + 2, PAL.muted, { size: 17, align: 'left' });
    ORDER.forEach((m) => {
      const on = mol.a(m) > 0.5 && m === mol.value;
      F.dot(ctx, X(MOL[m].ox), SY, PAL.ink, false, 9);
      text(ctx, MOL[m].label, X(MOL[m].ox), SY - 34, PAL.ink, { size: 22, align: 'center', weight: on ? 600 : 400 });
    });
    F.dot(ctx, X(mol.mix((m) => MOL[m].ox)), SY, PAL.ink, true, 11);
  }
  function legend(ctx) {
    [['C', 'carbon'], ['H', 'hydrogen'], ['O', 'oxygen']].forEach(([s, n], i) => {
      const y = 130 + i * 44; disc(ctx, 1120, y, s, 1); text(ctx, n, 1150, y + 1, PAL.ink, { size: 20, align: 'left' });
    });
  }

  function draw() {
    const { ctx } = begin(d.c); hits = [];
    const A = MOL[mol.from] ?? MOL[mol.value], Z = MOL[mol.value], k = mol.from === mol.value ? 1 : mol.k;
    headline(ctx, HEAD[mol.value]);
    const keys = [...new Set([...Object.keys(A.atoms), ...Object.keys(Z.atoms)])];
    const pos = {}, op = {};
    keys.forEach((key) => {
      const a = A.atoms[key], z = Z.atoms[key];
      pos[key] = P(a && z ? [lerp(a[0], z[0], k), lerp(a[1], z[1], k)] : (a ?? z));
      op[key] = a && z ? 1 : a ? mol.a(mol.from) : mol.a(mol.value);
    });
    const bkey = ([a, b]) => `${a}-${b}`;
    const BA = Object.fromEntries(A.bonds.map((b) => [bkey(b), b[2]])), BZ = Object.fromEntries(Z.bonds.map((b) => [bkey(b), b[2]]));
    [...new Set([...Object.keys(BA), ...Object.keys(BZ)])].forEach((bk) => {
      const [a, b] = bk.split('-'), oa = BA[bk], oz = BZ[bk];
      const al = oa && oz ? 1 : oa ? mol.a(mol.from) : mol.a(mol.value);
      const second = oa && oz ? lerp(oa === 2 ? 1 : 0, oz === 2 ? 1 : 0, k) : (oa ?? oz) === 2 ? 1 : 0;
      stick(ctx, pos[a], pos[b], a[0], b[0], second, Math.min(al, op[a], op[b]));
    });
    keys.forEach((key) => {
      const s = key[0]; disc(ctx, ...pos[key], s, op[key]);
      if (op[key] > 0.5) hits.push({ x: pos[key][0], y: pos[key][1], r: RAD[s] + 4, name: NAME[s] });
    });
    legend(ctx);
    drawScale(ctx);
    const t = Z, ox = t.ox, sgn = (n) => (n > 0 ? `+${n}` : n < 0 ? `-${-n}` : '0');
    const terms = [t.nH ? `\\mk{h}{${t.nH}(+1)}` : '', t.nO ? `\\mk{o}{${t.nO}(-2)}` : ''].filter(Boolean).join(' + ');
    ro.set(`\\mk{x}{x_{\\text{C}}} = 0 - (${terms}) = \\mk{r}{${sgn(ox)}}`, undefined, { form: `${!!t.nH}${!!t.nO}` });
  }
  register(d.fig, { update: () => {}, draw });
})();
};
