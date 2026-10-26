/* Figures for section 14.3 Relative Strengths of Acids and Bases. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['14.3'] = function (root, F) {
const { el, fmt, tex, C, PAL, alpha, ctl, register, begin, line, dot, text, topline, arrow } = F;
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;
/* a small seeded generator, so a slider position always draws the same arrangement */
const rng = (seed) => () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
/* a constant to two significant figures, as TeX: 4.6 \times 10^{-4} */
function sci(v) {
  let e = Math.floor(Math.log10(v) + 1e-9), m = v / 10 ** e;
  if (+m.toFixed(1) >= 10) { m /= 10; e += 1; }
  return e === 0 ? m.toFixed(1) : `${m.toFixed(1)} \\times 10^{${e}}`;
}
const KW = 1.0e-14;
const sup = (t) => t.replace(/[0-9−+-]/g, (ch) => '⁰¹²³⁴⁵⁶⁷⁸⁹'['0123456789'.indexOf(ch)] || (ch === '+' ? '⁺' : '⁻'));

/* =====================================================================
   SIM: an acid in water, in three dimensions. Still: the box answers its
   choice and its slider. One hundred formula units of the chosen acid at
   every concentration; x from x²/([HA]₀ − x) = K_a solved exactly (HCl
   complete), water's own ionization neglected as the text does. The slots
   drawn ionized are the first round(100x/[HA]₀) of a fixed shuffled order,
   so dilution ionizes more of the same box. Strip: log concentration axis
   10⁻⁴ to 1 M (acetate at 0.010 M acetic acid is 4.1 × 10⁻⁴ M; 1 M HCl gives
   1 M), pH beneath it; HCl's [HA] ≈ 0 is pinned at the left end. No ground:
   yaw free, pitch within 70°; spin starts off, nothing else moves.
===================================================================== */
(function () {
  const d = F.sim(root, 'sim-acid-water');
  const v = F.view3d(d.stage, { spin: 'off', pitch: [-1.22, 1.22], views: [{ label: 'front', yaw: 0, pitch: 0.12 }, { label: 'corner', yaw: 0.65, pitch: 0.45 }], h: 400, dist: 6.6, tilt: 0.3 });
  const grp = v.part(0), cnv = F.makeCanvas(d.stage, 290);
  const ACIDS = {
    HCl: { name: 'hydrochloric acid', unit: 'molecules', K: Infinity, a: 'HCl', b: 'Cl⁻', an: 'a molecule of hydrogen chloride, HCl', bn: 'a chloride ion, Cl⁻',
      atoms: [['Cl', 0, 0, 0], ['H', 0.15, 0, 0, 1]] },
    HSO4: { name: 'hydrogen sulfate ion', unit: 'ions', K: 1.2e-2, a: 'HSO₄⁻', b: 'SO₄²⁻', an: 'a hydrogen sulfate ion, HSO₄⁻', bn: 'a sulfate ion, SO₄²⁻',
      atoms: [['S', 0, 0, 0], ['O', 0.087, 0.087, 0.087], ['O', 0.087, -0.087, -0.087], ['O', -0.087, 0.087, -0.087], ['O', -0.087, -0.087, 0.087], ['H', 0.15, 0.15, 0.15, 1]] },
    HNO2: { name: 'nitrous acid', unit: 'molecules', K: 4.6e-4, a: 'HNO₂', b: 'NO₂⁻', an: 'a molecule of nitrous acid, HNO₂', bn: 'a nitrite ion, NO₂⁻',
      atoms: [['O', -0.07, -0.03, 0], ['N', 0.05, 0.04, 0], ['O', 0.16, -0.02, 0], ['H', -0.15, 0.03, 0, 1]] },
    CH3CO2H: { name: 'acetic acid', unit: 'molecules', K: 1.8e-5, a: 'CH₃CO₂H', b: 'CH₃CO₂⁻', an: 'a molecule of acetic acid, CH₃CO₂H', bn: 'an acetate ion, CH₃CO₂⁻',
      atoms: [['C', -0.12, 0, 0], ['C', 0.03, 0, 0], ['O', 0.1, 0.11, 0], ['O', 0.1, -0.11, 0], ['H', -0.18, 0.09, 0], ['H', -0.18, -0.05, 0.08], ['H', -0.18, -0.05, -0.08], ['H', 0.2, -0.12, 0, 1]] },
  };
  const R_AT = { H: 0.045, C: 0.07, N: 0.068, O: 0.066, S: 0.09, Cl: 0.095 };
  const pick = F.choice(d.controls, { label: '\\text{acid}', options: [{ value: 'HCl', label: 'HCl' }, { value: 'HSO4', label: 'HSO₄⁻' }, { value: 'HNO2', label: 'HNO₂' }, { value: 'CH3CO2H', label: 'CH₃CO₂H' }], value: 'CH3CO2H', aria: 'acid dissolved in the water' });
  const c0 = ctl(d.controls, { label: '\\kconcHAz', cls: 'concentration', min: 0.01, max: 1, step: 0.005, value: 0.1, unit: 'M', dec: 3, detents: [0.125, 0.5], snap: true, aria: 'initial concentration of the acid, in moles per liter' });
  const fx = el('div'), nt = el('small'); d.readout.append(fx, nt);
  nt.textContent = 'Each molecule drawn stands for one hundredth of the acid dissolved.';
  const N = 100, HALF = 1.3, R = rng(29);
  /* slot centres kept apart, and a fixed order in which slots ionize */
  const slots = [];
  for (let i = 0; i < N; i++) {
    let p = null;
    for (let t = 0; t < 600 && !p; t++) { const q = [0, 0, 0].map(() => (R() * 2 - 1) * (HALF - 0.2)); if (slots.every((s) => Math.hypot(q[0] - s.p[0], q[1] - s.p[1], q[2] - s.p[2]) > 0.37)) p = q; }
    if (!p) p = [0, 0, 0].map(() => (R() * 2 - 1) * (HALF - 0.2));
    const u = [R() - 0.5, R() - 0.5, R() - 0.5], l = Math.hypot(...u) || 1;
    slots.push({ p, rot: [R() * 6.28, R() * 6.28, R() * 6.28], away: u.map((c) => c / l) });
  }
  const order = slots.map((_, i) => i);
  for (let i = N - 1; i > 0; i--) { const j = Math.floor(R() * (i + 1)); [order[i], order[j]] = [order[j], order[i]]; }
  slots[order[0]].away = [0.28, 0.92, 0.28];
  const T3D = window.THREE;
  const H3O = [['O', 0, 0, 0], ['H', 0.09, -0.04, 0], ['H', -0.045, -0.04, 0.078], ['H', -0.045, -0.04, -0.078]];
  function molecule(parent, atoms, at, rot, name) {
    const g = new T3D.Group(); g.position.set(...at); g.rotation.set(...rot); parent.add(g);
    atoms.forEach(([e, x, y, z]) => v.pickable(F.mesh.sphere(g, [x, y, z], R_AT[e], F.el(e)), name));
    return g;
  }
  function solve(acid, c) {
    const K = ACIDS[acid].K;
    const x = K === Infinity ? c : (-K + Math.sqrt(K * K + 4 * K * c)) / 2;
    return { x, ha: c - x, n: Math.round((N * x) / c) };
  }
  let sig = '', forms = [], labs = {}, fadeIn = F.tween(d, 1);
  const palSig = () => [pick.value, PAL.ink, F.CC, F.shown, F.ref('acid'), F.ref('base'), ...['H', 'C', 'N', 'O', 'S', 'Cl'].map((e) => F.el(e))].join('|');
  function build() {
    const key = palSig(); if (key === sig) return;
    const was = sig.split('|')[0]; sig = key;
    v.clear();
    const A = ACIDS[pick.value];
    F.mesh.box(grp, [0, 0, 0], [2 * HALF, 2 * HALF, 2 * HALF], PAL.ink, { transparent: true, opacity: 0.05, depthWrite: false });
    for (const [a, b] of [[-1, -1], [-1, 1], [1, -1], [1, 1]]) {
      F.mesh.stick(grp, [a * HALF, -HALF, b * HALF], [a * HALF, HALF, b * HALF], 0.01, PAL.muted);
      F.mesh.stick(grp, [-HALF, a * HALF, b * HALF], [HALF, a * HALF, b * HALF], 0.01, PAL.muted);
      F.mesh.stick(grp, [a * HALF, b * HALF, -HALF], [a * HALF, b * HALF, HALF], 0.01, PAL.muted);
    }
    const base = A.atoms.filter((t) => !t[4]);
    forms = slots.map((s) => {
      const whole = molecule(grp, A.atoms, s.p, s.rot, A.an);
      const ion = new T3D.Group(); grp.add(ion);
      molecule(ion, base, s.p, s.rot, A.bn);
      const h = s.p.map((c, k) => Math.max(-HALF + 0.12, Math.min(HALF - 0.12, c + s.away[k] * 0.3)));
      molecule(ion, H3O, h, s.rot, 'a hydronium ion, H₃O⁺');
      return { whole, ion, h };
    });
    const first = order[0], gap = (i) => Math.hypot(...slots[i].p.map((q, k) => q - slots[first].p[k]));
    const lastN = order.slice(N - 20).reduce((a, b) => (gap(b) > gap(a) ? b : a));
    labs = {
      acid: v.label(A.a, [slots[lastN].p[0], slots[lastN].p[1] + 0.2, slots[lastN].p[2]], grp, 6),
      base: v.label(A.b, [slots[first].p[0], slots[first].p[1] - 0.3, slots[first].p[2]], grp, 0),
      hyd: v.label('H₃O⁺', [forms[first].h[0], forms[first].h[1] + 0.16, forms[first].h[2]], grp, 6),
    };
    labs.acid.style.color = F.ref('acid'); labs.base.style.color = F.ref('base');
    if (was && was !== pick.value) { fadeIn.set(0); fadeIn.to(1, 600); }
  }
  /* strip: log axis 10⁻⁴ to 10⁰ M */
  const X = (c) => 170 + (Math.log10(c) + 4) * 260, AY = 196;
  function draw() {
    build();
    const A = ACIDS[pick.value], c = c0.v, s = solve(pick.value, c);
    forms.forEach((f, i) => { const on = order.indexOf(i) < s.n; f.whole.visible = !on; f.ion.visible = on; });
    labs.acid.style.display = s.n < N ? '' : 'none';
    labs.base.style.display = labs.hyd.style.display = s.n > 0 ? '' : 'none';
    F.fade3(grp, fadeIn.v);
    v.invalidate();

    const { ctx } = begin(cnv);
    const ph = -Math.log10(s.x), cs = fmt(c, 3);
    const one = A.unit.slice(0, -1), who = s.n >= N ? `every ${one} has` : s.n === 0 ? `fewer than 1 of every 100 ${A.unit} has` : `${s.n} of every 100 ${A.unit} ${s.n === 1 ? 'has' : 'have'}`;
    topline(ctx, `In a ${cs} M solution of ${A.name}, ${who} given ${s.n > 1 && s.n < N ? 'their protons' : 'its proton'} to water, and the pH is ${fmt(ph, 2)}.`);
    const box = { l: X(1e-4), r: X(1), t: AY - 12, b: AY + 12 };
    line(ctx, box.l, AY, box.r, AY, C('concentration'), 3);
    for (let e = -4; e <= 0; e++) {
      line(ctx, X(10 ** e), AY - 8, X(10 ** e), AY + 8, C('concentration'), 3);
      text(ctx, e === 0 ? '1' : '10' + sup(String(e)), X(10 ** e), AY + 30, C('concentration'), { size: 17, align: 'center' });
      text(ctx, String(-e), X(10 ** e), AY + 62, C('concentration'), { size: 17, align: 'center' });
    }
    text(ctx, 'concentration (M)', box.r + 24, AY + 30, C('concentration'), { size: 17 });
    text(ctx, 'pH', box.r + 24, AY + 62, C('concentration'), { size: 17 });
    const lab = F.labeller(ctx, 290);
    lab.block(box.l - 20, AY + 14, box.r + 200, AY + 76); lab.block(0, 0, 1400, 100);
    if (s.ha > 1e-4) {
      dot(ctx, X(s.ha), AY, F.ref('acid'), true, 9);
      lab.add('[HA]', X(s.ha), AY, s.ha < s.x ? -0.5 : 0.5, -0.87, F.ref('acid'), 20, 34);
    } else F.pinned(ctx, box, X, () => AY, 1e-4 / 2, 0, F.ref('acid'), '[HA] ≈ 0');
    dot(ctx, X(s.x), AY, F.ref('base'), true, 9);
    lab.add('[A⁻] = [H_{3}O⁺]', X(s.x), AY, s.ha > 1e-4 && s.ha < s.x ? 0.5 : -0.5, -0.87, F.ref('base'), 20, 34);
    lab.flush();

    const conc = (q) => (q < 0.0095 ? sci(q) : fmt(q, 3)) + '\\ M';
    tex(fx, `\\text{\\% ionization} = \\frac{\\kconcHydeq}{\\kconcHAz}\\times 100 = \\frac{${hue('concentration', conc(s.x))}}{${hue('concentration', conc(c))}}\\times 100 = ${fmt((100 * s.x) / c, (100 * s.x) / c >= 10 ? 0 : 1)}\\%`);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 14.7 + 14.8: conjugate acid-base pairs on one ladder. Still: a
   choice of pair. K_a axis 10⁰ (H₃O⁺, as Figure 14.7 places it) down to
   10⁻¹⁴ (H₂O), 31 units a decade; the K_b axis is its mirror, K_b = K_w/K_a,
   so each pair is one level rung. Constants: Appendix H; NH₄⁺ from Appendix
   I's K_b of NH₃; HClO₂, H₃O⁺ and H₂O at Figure 14.7's own 10⁻², 1.0 and
   10⁻¹⁴. Rows in a crowded decade are spread 27 units apart in blocks
   centred on their true places, with leaders to their marks. The six strong
   acids stack above H₃O⁺ and the five non-acids below H₂O, as Figure 14.8.
===================================================================== */
(function () {
  const H = 960;
  const d = F.sim(root, 'sim-conjugate-ladder', H);
  const P = (id, a, an, b, bn, band, K, Kb) => ({ id, a, an, b, bn, band, K, Kb });
  const PAIRS = [
    P('HClO4', 'HClO_{4}', 'perchloric acid', 'ClO_{4}⁻', 'perchlorate ion', 'top'),
    P('H2SO4', 'H_{2}SO_{4}', 'sulfuric acid', 'HSO_{4}⁻', 'hydrogen sulfate ion', 'top'),
    P('HI', 'HI', 'hydrogen iodide', 'I⁻', 'iodide ion', 'top'),
    P('HBr', 'HBr', 'hydrogen bromide', 'Br⁻', 'bromide ion', 'top'),
    P('HCl', 'HCl', 'hydrogen chloride', 'Cl⁻', 'chloride ion', 'top'),
    P('HNO3', 'HNO_{3}', 'nitric acid', 'NO_{3}⁻', 'nitrate ion', 'top'),
    P('H3O', 'H_{3}O⁺', 'hydronium ion', 'H_{2}O', 'water', 'hyd', 1.0),
    P('HSO4', 'HSO_{4}⁻', 'hydrogen sulfate ion', 'SO_{4}²⁻', 'sulfate ion', 'weak', 1.2e-2),
    P('HClO2', 'HClO_{2}', 'chlorous acid', 'ClO_{2}⁻', 'chlorite ion', 'weak', 1.0e-2),
    P('H3PO4', 'H_{3}PO_{4}', 'phosphoric acid', 'H_{2}PO_{4}⁻', 'dihydrogen phosphate ion', 'weak', 7.5e-3),
    P('HF', 'HF', 'hydrogen fluoride', 'F⁻', 'fluoride ion', 'weak', 6.4e-4),
    P('HNO2', 'HNO_{2}', 'nitrous acid', 'NO_{2}⁻', 'nitrite ion', 'weak', 4.6e-4),
    P('CH3CO2H', 'CH_{3}CO_{2}H', 'acetic acid', 'CH_{3}CO_{2}⁻', 'acetate ion', 'weak', 1.8e-5),
    P('H2CO3', 'H_{2}CO_{3}', 'carbonic acid', 'HCO_{3}⁻', 'hydrogen carbonate ion', 'weak', 4.3e-7),
    P('H2S', 'H_{2}S', 'hydrogen sulfide', 'HS⁻', 'hydrogen sulfide ion', 'weak', 8.9e-8),
    P('HClO', 'HClO', 'hypochlorous acid', 'ClO⁻', 'hypochlorite ion', 'weak', 2.9e-8),
    P('NH4', 'NH_{4}⁺', 'ammonium ion', 'NH_{3}', 'ammonia', 'weak', null, 1.8e-5),
    P('HCN', 'HCN', 'hydrogen cyanide', 'CN⁻', 'cyanide ion', 'weak', 4.9e-10),
    P('HCO3', 'HCO_{3}⁻', 'hydrogen carbonate ion', 'CO_{3}²⁻', 'carbonate ion', 'weak', 4.7e-11),
    P('HPO4', 'HPO_{4}²⁻', 'hydrogen phosphate ion', 'PO_{4}³⁻', 'phosphate ion', 'weak', 4.2e-13),
    P('H2O', 'H_{2}O', 'water', 'OH⁻', 'hydroxide ion', 'water', 1.0e-14),
    P('HS', 'HS⁻', 'hydrogen sulfide ion', 'S²⁻', 'sulfide ion', 'low'),
    P('C2H5OH', 'C_{2}H_{5}OH', 'ethanol', 'C_{2}H_{5}O⁻', 'ethoxide ion', 'low'),
    P('NH3', 'NH_{3}', 'ammonia', 'NH_{2}⁻', 'amide ion', 'low'),
    P('H2', 'H_{2}', 'hydrogen', 'H⁻', 'hydride ion', 'low'),
    P('CH4', 'CH_{4}', 'methane', 'CH_{3}⁻', 'methide ion', 'low'),
  ];
  PAIRS.forEach((p) => { if (p.K == null && p.Kb) p.K = KW / p.Kb; if (p.K && !p.Kb) p.Kb = KW / p.K; });
  const Y0 = 330, DEC = 31, ROW = 27, TOP0 = 150, LOW0 = 820;
  const XA = 535, XB = 865;
  /* true places on the axes, then rows spread into blocks */
  const axisRows = PAIRS.filter((p) => p.K);
  axisRows.forEach((p) => { p.ty = Y0 - Math.log10(p.K) * DEC; });
  let blocks = axisRows.map((p) => ({ items: [p], c: p.ty }));
  for (let moved = true; moved;) {
    moved = false;
    for (let i = 0; i + 1 < blocks.length; i++) {
      const a = blocks[i], b = blocks[i + 1];
      const aEnd = a.c + ((a.items.length - 1) * ROW) / 2, bTop = b.c - ((b.items.length - 1) * ROW) / 2;
      if (bTop - aEnd < ROW) {
        const items = a.items.concat(b.items);
        blocks.splice(i, 2, { items, c: items.reduce((s, p) => s + p.ty, 0) / items.length });
        moved = true; break;
      }
    }
  }
  blocks.forEach((b) => b.items.forEach((p, i) => { p.y = b.c + (i - (b.items.length - 1) / 2) * ROW; }));
  PAIRS.filter((p) => p.band === 'top').forEach((p, i) => { p.y = TOP0 + i * ROW; });
  PAIRS.filter((p) => p.band === 'low').forEach((p, i) => { p.y = LOW0 + i * ROW; });
  const YEND = Y0 + 14 * DEC;

  const pick = F.select(d.controls, { label: '\\text{pair}', options: PAIRS.map((p) => ({ value: p.id, label: `${p.an} / ${p.bn}` })), value: 'HNO2', aria: 'conjugate acid-base pair' });
  const byId = Object.fromEntries(PAIRS.map((p) => [p.id, p]));
  const cap = (s) => s[0].toUpperCase() + s.slice(1);
  function headline(p) {
    if (p.band === 'top') return `${cap(p.an)} is a strong acid, and its conjugate base, ${p.bn}, is of negligible strength.`;
    if (p.band === 'hyd') return 'Hydronium ion is the strongest acid that can exist in water, and its conjugate base is water.';
    if (p.band === 'water') return 'Water is the weakest acid on the scale, and its conjugate base, hydroxide ion, is the strongest base that can exist in water.';
    if (p.band === 'low') return `${cap(p.an)} does not ionize as an acid in water, and its conjugate base, ${p.bn}, is a strong base.`;
    return `${cap(p.an)} is a weak acid, and its conjugate base, ${p.bn}, is a weak base.`;
  }
  let hits = [];
  F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c);
    const sel = byId[pick.value], hc = C('equilibrium-constant'), bandBg = F.mixColor(PAL.panel, PAL.ink, 0.05);
    topline(ctx, headline(sel));
    text(ctx, 'acid', 400, 112, PAL.ink, { size: 22, weight: 600, align: 'right' });
    text(ctx, 'conjugate base', 1000, 112, PAL.ink, { size: 22, weight: 600 });
    /* bands */
    ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.05);
    ctx.fillRect(60, TOP0 - ROW / 2, 1280, 6 * ROW); ctx.fillRect(60, LOW0 - ROW / 2, 1280, 5 * ROW); ctx.restore();
    /* the symbolic arrows of increasing strength */
    arrow(ctx, 40, LOW0 + 4 * ROW, 40, TOP0 - 6, PAL.ink, 4);
    text(ctx, 'stronger acids', 24, TOP0 - 34, PAL.ink, { size: 17 });
    arrow(ctx, 1360, TOP0, 1360, LOW0 + 4 * ROW + 6, PAL.ink, 4);
    text(ctx, 'stronger bases', 1376, LOW0 + 4 * ROW + 32, PAL.ink, { size: 17, align: 'right' });
    /* the chosen rung, bending from the last pair's place to this one's */
    const ry = pick.mix((id) => byId[id].ty ?? byId[id].y), ly = pick.mix((id) => byId[id].y);
    const onAxis = sel.ty != null;
    /* rung: on the axes for a measured pair, between the columns for a band pair */
    if (onAxis) {
      line(ctx, XA, ry, XB, ry, PAL.ink, 3, [10, 10]);
    } else {
      line(ctx, 476, ly, 924, ly, PAL.ink, 3, [10, 10]);
    }
    /* the two axes */
    line(ctx, XA, Y0, XA, YEND, hc, 3); line(ctx, XB, Y0, XB, YEND, hc, 3);
    for (let e = 0; e <= 14; e += 2) {
      const y = Y0 + e * DEC;
      line(ctx, XA, y, XA + 10, y, hc, 3); line(ctx, XB - 10, y, XB, y, hc, 3);
      text(ctx, e === 0 ? '1.0' : '10' + sup('−' + e), XA + 18, y, hc, { size: 17, bg: PAL.panel });
      text(ctx, e === 14 ? '1.0' : '10' + sup('−' + (14 - e)), XB - 18, y, hc, { size: 17, align: 'right', bg: PAL.panel });
    }
    if (onAxis) { dot(ctx, XA, ry, F.ref('acid'), true, 8); dot(ctx, XB, ry, F.ref('base'), true, 8); }
    text(ctx, '$\\kKa$', XA, YEND + 30, PAL.ink, { size: 24, align: 'center', tex: true });
    text(ctx, '$\\kKbion$', XB, YEND + 30, PAL.ink, { size: 24, align: 'center', tex: true });
    text(ctx, 'acids ionize completely in water;', 700, TOP0 + 2.5 * ROW - 14, PAL.muted, { size: 17, align: 'center', bg: bandBg });
    text(ctx, 'their bases do not ionize', 700, TOP0 + 2.5 * ROW + 14, PAL.muted, { size: 17, align: 'center', bg: bandBg });
    text(ctx, 'acids do not ionize in water;', 700, LOW0 + 2 * ROW - 14, PAL.muted, { size: 17, align: 'center', bg: bandBg });
    text(ctx, 'their bases ionize completely', 700, LOW0 + 2 * ROW + 14, PAL.muted, { size: 17, align: 'center', bg: bandBg });
    hits = [];
    PAIRS.forEach((p) => {
      const w = pick.a(p.id), ca = F.mixColor(PAL.ink, F.ref('acid'), w), cb = F.mixColor(PAL.ink, F.ref('base'), w);
      const wt = w > 0.5 ? 600 : 400;
      if (p.ty != null) {
        line(ctx, 470, p.y, XA - 14, p.ty, alpha(PAL.ink, 0.35), 2); line(ctx, XA - 14, p.ty, XA, p.ty, PAL.ink, 2);
        line(ctx, XB + 14, p.ty, 930, p.y, alpha(PAL.ink, 0.35), 2); line(ctx, XB, p.ty, XB + 14, p.ty, PAL.ink, 2);
      }
      if (p.id === 'H3O' || p.id === 'H2O') {
        ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.06);
        if (p.id === 'H2O') ctx.fillRect(60, p.y - ROW / 2, 400, ROW); else ctx.fillRect(940, p.y - ROW / 2, 400, ROW);
        ctx.restore();
      }
      text(ctx, p.a, 462, p.y, ca, { size: 22, weight: wt, align: 'right' });
      text(ctx, p.an, 330, p.y, alpha(PAL.ink, 0.62), { size: 17, align: 'right' });
      text(ctx, p.b, 938, p.y, cb, { size: 22, weight: wt });
      text(ctx, p.bn, 1080, p.y, alpha(PAL.ink, 0.62), { size: 17 });
      const plain = (q) => sci(q).replace(/ \\times 10\^\{(-?\d+)\}/, (_, e) => ' × 10' + sup(e));
      const ka = p.K ? 'Ka = ' + plain(p.K) : (p.band === 'top' ? 'a strong acid' : 'not an acid in water');
      const kb = p.Kb ? 'Kb = ' + plain(p.Kb) : (p.band === 'low' ? 'a strong base' : 'not a base in water');
      hits.push({ x: 400, y: p.y, r: 14, name: `${p.an}, ${ka}` }, { x: 1000, y: p.y, r: 14, name: `${p.bn}, ${kb}` });
    });
    const kv = (s) => hue('equilibrium-constant', s);
    if (sel.band === 'top') tex(d.readout, `\\kKa \\approx \\infty, \\qquad \\kKbion = \\kKw/\\kKa \\approx 0`);
    else if (sel.band === 'low') tex(d.readout, `\\kKbion \\approx \\infty, \\qquad \\kKa = \\kKw/\\kKbion \\approx 0`);
    else {
      const r2 = (q) => { const e = Math.floor(Math.log10(q) + 1e-9); return +(q / 10 ** e).toFixed(1) * 10 ** e; };
      tex(d.readout, `\\kKa \\times \\kKbion = (${kv(sci(sel.K))})(${kv(sci(sel.Kb))}) = ${kv(sci(r2(sel.K) * r2(sel.Kb)))} = \\kKw`);
    }
  }
  register(d.fig, { update: () => {}, draw });
})();
};
