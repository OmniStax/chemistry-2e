/* Figures for section 20.3 Aldehydes, Ketones, Carboxylic Acids, and Esters. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['20.3'] = function (root, F) {
const { PAL, alpha, register, begin, line, text, headline } = F;
const lerp = (a, b, k) => a + (b - a) * k;

/* =====================================================================
   FIGURE 20.14: the carbonyl group, polar and trigonal planar, with the
   two substituents of each family on its carbon: R and H (aldehyde),
   R1 and R2 (ketone, the book's drawing), R and OH (carboxylic acid),
   R1 and OR2 (ester). 2D is the book's drawing; 3D is the group as
   balls and sticks in one plane with the p orbitals of the pi bond
   above and below it, mounted on the first switch. Still: the families
   are states, not a clock.
===================================================================== */
(function () {
  const d = F.sim(root, 'sim-carbonyl', 420);
  const ORDER = ['aldehyde', 'ketone', 'acid', 'ester'];
  const FAM = {
    aldehyde: { label: 'aldehyde', left: 'R', head: 'In an aldehyde, the carbonyl carbon bonds to at least one hydrogen atom.',
      tex: '\\mk{n}{\\text{aldehyde:}}\\; \\mk{l}{\\text{R}}\\mk{c}{\\text{CHO}}' },
    ketone: { label: 'ketone', left: 'R¹', head: 'In a ketone, the carbonyl carbon bonds to two carbon groups, R¹ and R².',
      tex: '\\mk{n}{\\text{ketone:}}\\; \\mk{l}{\\text{R}^{1}}\\mk{c}{\\text{CO}}\\mk{r}{\\text{R}^{2}}' },
    acid: { label: 'carboxylic acid', left: 'R', head: 'In a carboxylic acid, a second oxygen atom on the carbonyl carbon carries a hydrogen atom.',
      tex: '\\mk{n}{\\text{carboxylic acid:}}\\; \\mk{l}{\\text{R}}\\mk{c}{\\text{CO}_{2}}\\mk{r}{\\text{H}}' },
    ester: { label: 'ester', left: 'R¹', head: 'In an ester, a second oxygen atom on the carbonyl carbon bonds to another carbon group, R².',
      tex: '\\mk{n}{\\text{ester:}}\\; \\mk{l}{\\text{R}^{1}}\\mk{c}{\\text{CO}_{2}}\\mk{r}{\\text{R}^{2}}' },
  };
  const grp = F.select(d.controls, { label: '\\text{family}', key: 'family', aria: 'the family of carbonyl compound',
    options: ORDER.map((v) => ({ value: v, label: FAM[v].label })), value: 'ketone', onInput: () => draw() });
  const VIEW = F.choice(d.controls, { label: '\\text{view}', key: 'view', aria: 'a flat structure or a scene to turn',
    options: [{ value: '2d', label: '2D' }, { value: '3d', label: '3D' }], value: '2d', ms: 0, onInput: () => show() });
  const ro = F.readout(d);
  let hits = []; F.hover(d.stage, () => hits);
  const NAME = { C: 'carbonyl carbon atom', O: 'carbonyl oxygen atom', H: 'hydrogen atom', O2: 'second oxygen atom', R: 'R group, a carbon chain' };

  /* ---------- the flat view: the book's drawing ---------- */
  const CX = 700, CY = 268, B = 140, A = Math.PI / 6;
  const at = (x, y, ang, r) => [x + r * Math.cos(ang), y - r * Math.sin(ang)];
  const GAP = 20;
  function bondLine(ctx, p, q, order = 1, g1 = GAP, g2 = GAP) {
    const dx = q[0] - p[0], dy = q[1] - p[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L;
    const a = [p[0] + ux * g1, p[1] + uy * g1], b = [q[0] - ux * g2, q[1] - uy * g2];
    const offs = order === 2 ? [-5, 5] : [0];
    offs.forEach((o) => line(ctx, a[0] - uy * o, a[1] + ux * o, b[0] - uy * o, b[1] + ux * o, PAL.ink, 3));
  }
  function sym(ctx, s, x, y, name) { text(ctx, s, x, y + 1, PAL.ink, { size: 30, align: 'center' }); if (name) hits.push({ x, y, r: 22, name }); }
  function draw2d() {
    const { ctx } = begin(d.c); hits = [];
    headline(ctx, FAM[grp.value].head);
    const C0 = [CX, CY], O0 = [CX, CY - B], L0 = at(CX, CY, Math.PI + A, B), R0 = at(CX, CY, -A, B);
    bondLine(ctx, C0, O0, 2); bondLine(ctx, C0, L0, 1, GAP, 26); bondLine(ctx, C0, R0, 1, GAP, 22);
    sym(ctx, 'C', ...C0, NAME.C); sym(ctx, 'O', ...O0, NAME.O);
    text(ctx, 'δ+', CX - 30, CY - 30, PAL.ink, { size: 24, align: 'right' });
    text(ctx, 'δ−', CX - 26, CY - B - 4, PAL.ink, { size: 24, align: 'right' });
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(CX, CY, 74, -Math.PI / 2 + 0.12, A - 0.12); ctx.stroke(); ctx.restore();
    text(ctx, '~120°', CX + 84, CY - 64, PAL.ink, { size: 22, align: 'left' });
    ORDER.forEach((v) => grp.only(ctx, v, () => {
      text(ctx, FAM[v].left, L0[0] - 6, L0[1] + 1, PAL.ink, { size: 30, align: 'center' });
      const R1 = at(R0[0], R0[1], 0, 118);
      if (v === 'aldehyde') sym(ctx, 'H', ...R0);
      if (v === 'ketone') text(ctx, 'R²', R0[0] + 6, R0[1] + 1, PAL.ink, { size: 30, align: 'center' });
      if (v === 'acid' || v === 'ester') {
        sym(ctx, 'O', ...R0); bondLine(ctx, R0, R1, 1, GAP, v === 'ester' ? 26 : 18);
        if (v === 'acid') sym(ctx, 'H', ...R1); else text(ctx, 'R²', R1[0] + 6, R1[1] + 1, PAL.ink, { size: 30, align: 'center' });
      }
    }, [0, 10]));
    const v = grp.value, R1 = at(R0[0], R0[1], 0, 118);
    hits.push({ x: L0[0], y: L0[1], r: 24, name: NAME.R });
    if (v === 'aldehyde') hits.push({ x: R0[0], y: R0[1], r: 22, name: NAME.H });
    if (v === 'ketone') hits.push({ x: R0[0], y: R0[1], r: 24, name: NAME.R });
    if (v === 'acid' || v === 'ester') { hits.push({ x: R0[0], y: R0[1], r: 22, name: NAME.O2 }); hits.push({ x: R1[0], y: R1[1], r: 24, name: v === 'acid' ? NAME.H : NAME.R }); }
  }

  /* ---------- the same group in three dimensions: the plane of the page is xy, the pi lobes run along z ---------- */
  const P3 = { C: [0, 0, 0], O: [0, 1.25, 0], L: [-1.35 * Math.cos(A), -1.35 * Math.sin(A), 0], R: [1.35 * Math.cos(A), -1.35 * Math.sin(A), 0] };
  P3.R2 = [P3.R[0] + 1.3 * Math.cos(A), P3.R[1] + 1.3 * Math.sin(A), 0];
  let V = null, g = null;
  function mount() {
    V = F.view3d(d.stage, { spin: 'idle', h: 540, dist: 9.5, tilt: 0.15, pitch: [-Math.PI / 2, Math.PI / 2],
      views: [{ label: 'front', yaw: 0, pitch: 0 }, { label: 'edge-on', yaw: Math.PI / 2, pitch: 0.15 }] });
    g = V.part(0); g.position.set(-0.3, -0.7, 0);
  }
  function draw3d() {
    V.clear(); hits = [];
    const { sphere, bond, lobe } = F.mesh, v = grp.value;
    const out = (a, b) => b.map((x, i) => x + (x - a[i]) * 0.5);
    const atom = (p, s, r, name) => V.pickable(sphere(g, p, r, F.el(s)), name);
    atom(P3.C, 'C', 0.3, NAME.C); atom(P3.O, 'O', 0.28, NAME.O);
    bond(g, P3.C, P3.O, 2); bond(g, P3.C, P3.L, 1); bond(g, P3.C, P3.R, 1);
    atom(P3.L, 'R', 0.34, NAME.R); V.label(FAM[v].left, out(P3.C, P3.L), g);
    if (v === 'aldehyde') atom(P3.R, 'H', 0.18, NAME.H);
    if (v === 'ketone') { atom(P3.R, 'R', 0.34, NAME.R); V.label('R²', out(P3.C, P3.R), g); }
    if (v === 'acid' || v === 'ester') {
      atom(P3.R, 'O', 0.28, NAME.O2); bond(g, P3.R, P3.R2, 1);
      if (v === 'acid') atom(P3.R2, 'H', 0.18, NAME.H); else { atom(P3.R2, 'R', 0.34, NAME.R); V.label('R²', out(P3.R, P3.R2), g); }
    }
    [[P3.C, 'p orbital on carbon, half of the π bond'], [P3.O, 'p orbital on oxygen, half of the π bond']].forEach(([p, name]) =>
      [1, -1].forEach((s) => V.pickable(lobe(g, p, [0, 0, s], 0.85), name)));
    V.label('δ+', P3.C, g, -38); V.label('δ−', P3.O, g, 32);
    V.headline(FAM[v].head);
    V.invalidate();
  }
  function show() {
    if (VIEW.value === '3d' && !V) mount();
    const three = VIEW.value === '3d' && !!V?.scene;
    d.c.style.display = three ? 'none' : '';
    if (V) [V.wrap, d.stage.querySelector('.view3d-bar')].forEach((e) => { if (e) e.style.display = VIEW.value === '3d' ? '' : 'none'; });
    draw();
  }
  function draw() {
    if (VIEW.value === '3d' && V?.scene) draw3d(); else draw2d();
    ro.set(FAM[grp.value].tex, undefined, { form: grp.value });
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
    ro.set(`\\mk{x}{x_{\\text{C}}} + ${terms} = 0,\\quad \\mk{r}{x_{\\text{C}} = ${sgn(ox)}}`, undefined, { form: `${!!t.nH}${!!t.nO}` });
  }
  register(d.fig, { update: () => {}, draw });
})();
};
