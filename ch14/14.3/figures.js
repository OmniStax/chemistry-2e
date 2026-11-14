/* Figures for section 14.3 Relative Strengths of Acids and Bases. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['14.3'] = function (root, F) {
const { fmt, tex, C, PAL, alpha, ctl, register, begin, line, dot, text, topline, arrow } = F;
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
   SIM: an acid in water, flat. Still: the beaker answers its choice and
   its slider. One hundred formula units of the chosen acid at every
   concentration, each drawn space-filling by its atoms; x from
   x²/([HA]₀ − x) = K_a solved exactly (HCl complete), water's own
   ionization neglected as the text does. The slots drawn ionized are the
   first round(100x/[HA]₀) of a fixed shuffled order, so dilution ionizes
   more of the same molecules: each one's proton leaves for a water
   molecule, which becomes H₃O⁺ beside the ringed conjugate base. Graph:
   percent ionization against [HA]₀, both logarithmic, 0.01 to 1 M and
   0.1 to 100 %, a curve per acid (acetic acid's 0.42 % at 1 M is the
   lowest value, HCl's 100 % the highest).
===================================================================== */
(function () {
  const d = F.sim(root, 'sim-acid-water', 620);
  /* atoms as [element, x, y, r] in canvas units about the molecule's centre; the acidic hydrogen is last */
  const ACIDS = {
    HCl: { name: 'hydrochloric acid', unit: 'molecules', K: Infinity, a: 'HCl', b: 'Cl⁻', an: 'hydrogen chloride, HCl', bn: 'chloride ion, Cl⁻',
      atoms: [['Cl', 0, 0, 12], ['H', 14, -6, 7]] },
    HSO4: { name: 'hydrogen sulfate ion', unit: 'ions', K: 1.2e-2, a: 'HSO₄⁻', b: 'SO₄²⁻', an: 'hydrogen sulfate ion, HSO₄⁻', bn: 'sulfate ion, SO₄²⁻',
      atoms: [['O', -8, -9, 8], ['O', 8, -9, 8], ['S', 0, 0, 9.5], ['O', -9, 8, 8], ['O', 9, 8, 8], ['H', 16, -16, 6]] },
    HNO2: { name: 'nitrous acid', unit: 'molecules', K: 4.6e-4, a: 'HNO₂', b: 'NO₂⁻', an: 'nitrous acid, HNO₂', bn: 'nitrite ion, NO₂⁻',
      atoms: [['O', -11, 5, 8], ['N', 0, -3, 8.5], ['O', 11, 5, 8], ['H', -19, -2, 6]] },
    CH3CO2H: { name: 'acetic acid', unit: 'molecules', K: 1.8e-5, a: 'CH₃CO₂H', b: 'CH₃CO₂⁻', an: 'acetic acid, CH₃CO₂H', bn: 'acetate ion, CH₃CO₂⁻',
      atoms: [['H', -19, -6, 6], ['H', -17, 8, 6], ['H', -10, -13, 6], ['C', -9, 0, 9], ['C', 5, 0, 9], ['O', 12, -10, 8], ['O', 13, 10, 8], ['H', 21, 14, 6]] },
  };
  const H3O = [['H', -9, -6, 6], ['H', 9, -6, 6], ['O', 0, 0, 9], ['H', 0, 11, 6]];
  const pick = F.choice(d.controls, { label: '\\text{acid}', options: [{ value: 'HCl', label: 'HCl' }, { value: 'HSO4', label: 'HSO₄⁻' }, { value: 'HNO2', label: 'HNO₂' }, { value: 'CH3CO2H', label: 'CH₃CO₂H' }], value: 'CH3CO2H', aria: 'acid dissolved in the water', onInput: () => shown.set(solve(pick.value, 10 ** c0.v).n) });
  const c0 = ctl(d.controls, { label: '\\kconcHAz', cls: 'concentration', key: 'c0', min: -2, max: 0, step: 0.001, value: -1, fmt: (lg) => `${cM(10 ** lg)} M`,
    detents: [{ v: Math.log10(0.125), label: '0.125' }, { v: Math.log10(0.5), label: '0.50' }], snap: true, aria: 'initial concentration of the acid', onInput: () => moved() });
  const N = 100, R = rng(29);
  function cM(c) { return c < 0.0995 ? c.toPrecision(2) : c.toPrecision(3); }
  /* the beaker: glass from BX0 to BX1, liquid from LY to BY; 10 by 10 slots, jittered */
  const BX0 = 70, BX1 = 650, BY = 556, LY = 150, TOPY = 104;
  const slots = [];
  for (let i = 0; i < N; i++) {
    const col = i % 10, row = Math.floor(i / 10);
    const x = BX0 + 65 + col * 50 + (R() - 0.5) * 12, y = LY + 30 + row * 36 + (R() - 0.5) * 8;   /* a ringed pair reaches ~38 out from its slot: keep it clear of the glass */
    slots.push({ x, y, flip: R() < 0.5 ? -1 : 1, hx: (R() < 0.5 ? -1 : 1) * (14 + R() * 6), hy: 15 + R() * 4 });
  }
  const order = slots.map((_, i) => i);
  for (let i = N - 1; i > 0; i--) { const j = Math.floor(R() * (i + 1)); [order[i], order[j]] = [order[j], order[i]]; }
  const rank = new Array(N); order.forEach((s, r) => { rank[s] = r; });
  function solve(acid, c) {
    const K = ACIDS[acid].K;
    const x = K === Infinity ? c : (-K + Math.sqrt(K * K + 4 * K * c)) / 2;
    return { x, n: Math.round((N * x) / c) };
  }
  /* the ionized count eases between slider positions, so a proton is seen to leave */
  const shown = F.tween(d, solve('CH3CO2H', 0.1).n);
  function moved() { shown.to(solve(pick.value, 10 ** c0.v).n, 500); }
  function atoms(ctx, list, x, y, s, flip, skipH, a = 1) {
    ctx.save(); ctx.globalAlpha *= a;
    list.forEach(([e, ax, ay, r], i) => {
      if (skipH && i === list.length - 1) return;
      ctx.beginPath(); ctx.arc(x + flip * ax * s, y + ay * s, r * s, 0, 2 * Math.PI);
      ctx.fillStyle = F.el(e); ctx.fill(); ctx.lineWidth = 1.5; ctx.strokeStyle = alpha(PAL.ink, e === 'H' ? 0.7 : 0.45); ctx.stroke();
    });
    ctx.restore();
  }
  /* slot i at ionization k (0 whole, 1 ionized): the acid's hydrogen travels to a water molecule that arrives as H3O+,
     and a ring in the conjugate base's colour gathers the two ions */
  const SC = 0.85;
  let ringA = 1;   /* the rings pick out the ionized few; where most are ionized they fade, since every pair would wear one */
  function slot(ctx, A, i, k) {
    const s = slots[i], hAt = A.atoms[A.atoms.length - 1];
    const bx = s.x - 5 * k, ox = s.x + s.hx * SC, oy = s.y + s.hy * SC;
    if (k > 0) {
      ctx.save(); ctx.setLineDash([5, 5]); ctx.strokeStyle = alpha(F.ref('base'), k * ringA); ctx.lineWidth = 3;
      ctx.beginPath(); ctx.arc((bx + ox) / 2, (s.y + oy) / 2, 27, 0, 2 * Math.PI); ctx.stroke(); ctx.restore();
      atoms(ctx, H3O, ox, oy, 0.8 * SC, 1, false, k);
    }
    atoms(ctx, A.atoms, bx, s.y, SC, s.flip, true, 0.5 + 0.5 * k);   /* the molecules still whole stand back, the ions forward */
    if (k < 1) {
      const hx = bx + s.flip * hAt[1] * SC, hy = s.y + hAt[2] * SC;
      atoms(ctx, [['H', 0, 0, hAt[3]]], hx + (ox - hx) * k, hy + (oy - 6 - hy) * k, SC, 1, false, 0.5 * (1 - k * k));
    }
  }
  /* graph: % ionization against [HA]₀, log both, drawn on log10 + 2 and log10 + 1 so that no zero line falls inside the frame */
  const G = { l: 830, r: 1240, t: 130, b: 480 };
  const pct = (acid, c) => (100 * solve(acid, c).x) / c;
  let hits = [];
  F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c), A = ACIDS[pick.value], c = 10 ** c0.v, s = solve(pick.value, c), nk = shown.v;
    hits = [];
    /* the beaker: a lip flaring out at the top, a pouring spout at the left, rounded foot; the liquid inside */
    const ink = PAL.ink, glass = alpha(PAL.ink, 0.75);
    ctx.save();
    ctx.fillStyle = alpha(PAL.ink, 0.045);
    ctx.beginPath(); ctx.moveTo(BX0, LY); ctx.lineTo(BX0, BY - 14); ctx.quadraticCurveTo(BX0, BY, BX0 + 14, BY); ctx.lineTo(BX1 - 14, BY); ctx.quadraticCurveTo(BX1, BY, BX1, BY - 14); ctx.lineTo(BX1, LY); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = glass; ctx.lineWidth = 4; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.moveTo(BX0 - 16, TOPY - 8); ctx.quadraticCurveTo(BX0, TOPY - 2, BX0, TOPY + 14); ctx.lineTo(BX0, BY - 14); ctx.quadraticCurveTo(BX0, BY, BX0 + 14, BY);
    ctx.lineTo(BX1 - 14, BY); ctx.quadraticCurveTo(BX1, BY, BX1, BY - 14); ctx.lineTo(BX1, TOPY + 6); ctx.quadraticCurveTo(BX1, TOPY, BX1 + 8, TOPY - 2); ctx.stroke();
    ctx.restore();
    line(ctx, BX0, LY, BX1, LY, alpha(PAL.ink, 0.35), 2);
    /* the molecules: whole ones first, then the ionized pairs above them */
    ringA = Math.max(0, Math.min(1, (60 - nk) / 30));
    const lo = Math.min(Math.floor(nk), N), frac = nk - Math.floor(nk);
    const kOf = (i) => (rank[i] < lo ? 1 : rank[i] === lo ? frac : 0);
    const draws = slots.map((_, i) => i).sort((a, b) => kOf(a) - kOf(b));
    pick.only(ctx, pick.value, () => draws.forEach((i) => slot(ctx, A, i, kOf(i))), [0, 0]);
    if (pick.k < 1 && pick.from && pick.from !== pick.value) {
      const B = ACIDS[pick.from], nb = solve(pick.from, c).n;
      pick.only(ctx, pick.from, () => slots.forEach((_, i) => slot(ctx, B, i, rank[i] < nb ? 1 : 0)), [0, 0]);
    }
    slots.forEach((sl, i) => {
      const on = kOf(i) >= 0.5;
      hits.push({ x: sl.x, y: sl.y, r: 18, name: on ? `${A.bn}, its proton given to water` : A.an });
      if (on) hits.push({ x: sl.x + sl.hx, y: sl.y + sl.hy, r: 10, name: 'hydronium ion, H₃O⁺' });
    });
    /* the key under the beaker */
    F.legend(ctx, { l: BX0, r: BX1, t: LY, b: BY - 28 }, [
      { s: A.a, draw: (cx, x, y) => atoms(cx, A.atoms, x, y, 0.7, 1, false, 0.5) },
      { s: `${A.b} + H_{3}O⁺`, draw: (cx, x, y) => {
        cx.save(); cx.setLineDash([4, 4]); cx.strokeStyle = F.ref('base'); cx.lineWidth = 2.5; cx.beginPath(); cx.arc(x + 2, y + 2, 20, 0, 2 * Math.PI); cx.stroke(); cx.restore();
        atoms(cx, A.atoms, x - 5, y - 2, 0.55, 1, true); atoms(cx, H3O, x + 10, y + 9, 0.45, 1, false);
      } },
    ], { corner: 'below' });
    /* the graph */
    const cc = C('concentration');
    const g = F.axes(ctx, G, [0, 2], [0, 3], { nx: 2, ny: 3, fx: (v) => ['0.01', '0.1', '1'][Math.round(v)], fy: (v) => ['0.1', '1', '10', '100'][Math.round(v)],
      xl: '[HA]_{0} (M)', xc: cc, yl: '% ionization', yc: PAL.ink });
    Object.keys(ACIDS).forEach((k) => {
      const on = k === pick.value, col = on ? PAL.ink : alpha(PAL.ink, 0.32);
      F.plot(ctx, g, (u) => Math.log10(pct(k, 10 ** (u - 2))) + 1, col, { w: on ? 5 : 3 });
      const yEnd = Math.log10(pct(k, 1)) + 1;
      text(ctx, ACIDS[k].a, G.r + 12, g.Y(yEnd), on ? PAL.ink : PAL.muted, { size: 20, weight: on ? 600 : 400 });
    });
    const P = (100 * s.x) / c, px = g.X(c0.v + 2), py = g.Y(Math.log10(P) + 1);
    line(ctx, px, py, px, G.b, alpha(cc, 0.6), 2.5, [4, 8]);
    line(ctx, G.l, py, px, py, alpha(PAL.ink, 0.45), 2.5, [4, 8]);
    dot(ctx, px, py, PAL.ink, true, 9);
    hits.push({ x: px, y: py, r: 14, name: `${A.name}, ${cM(c)} M: ${fmt(P, P >= 10 ? 0 : 1)} % ionized` });

    const ph = -Math.log10(s.x), cs = cM(c), n = s.n;
    const one = A.unit.slice(0, -1), who = n >= N ? `every ${one} has` : n === 0 ? `fewer than 1 of every 100 ${A.unit} has` : `${n} of every 100 ${A.unit} ${n === 1 ? 'has' : 'have'}`;
    topline(ctx, `In ${cs} M ${A.name}, ${who} given ${n > 1 && n < N ? 'their protons' : 'its proton'} to water; the pH is ${fmt(ph, 2)}.`);
    const conc = (q) => (q < 0.0095 ? sci(q) : cM(q)) + '\\ M';
    tex(d.readout, `\\text{\\% ionization} = \\frac{\\kconcHydeq}{\\kconcHAz}\\times 100 = \\frac{${hue('concentration', conc(s.x))}}{${hue('concentration', conc(c))}}\\times 100 = ${fmt(P, P >= 10 ? 0 : 1)}\\%`);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 14.7 + 14.8: conjugate acid-base pairs on one ladder. Still: a
   choice of pair. K_a axis 10⁰ (H₃O⁺, as Figure 14.7 places it) down to
   10⁻¹⁴ (H₂O), 40 units a decade; the K_b axis is its mirror, K_b = K_w/K_a,
   so each pair is one level rung. Constants: Appendix H; NH₄⁺ from Appendix
   I's K_b of NH₃; HClO₂, H₃O⁺ and H₂O at Figure 14.7's own 10⁻², 1.0 and
   10⁻¹⁴. Rows in a crowded decade are spread 34 units apart in blocks
   centred on their true places, with leaders to their marks. The six strong
   acids stack above H₃O⁺ and the five non-acids below H₂O, as Figure 14.8.
===================================================================== */
(function () {
  const H = 1190;
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
  const ROW = 34, DEC = 40, TOP0 = 150, Y0 = TOP0 + 6 * ROW + 14, LOW0 = Y0 + 14 * DEC + 76;
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
    text(ctx, 'acid', 462, 108, PAL.ink, { size: 24, weight: 600, align: 'right' });
    text(ctx, 'conjugate base', 938, 108, PAL.ink, { size: 24, weight: 600 });
    /* bands */
    ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.05);
    ctx.fillRect(60, TOP0 - ROW / 2, 1280, 6 * ROW); ctx.fillRect(60, LOW0 - ROW / 2, 1280, 5 * ROW); ctx.restore();
    /* the symbolic arrows of increasing strength */
    arrow(ctx, 40, LOW0 + 4 * ROW, 40, TOP0 - 6, PAL.ink, 4);
    text(ctx, 'stronger acids', 24, TOP0 - 42, PAL.ink, { size: 20 });
    arrow(ctx, 1360, TOP0, 1360, LOW0 + 4 * ROW + 6, PAL.ink, 4);
    text(ctx, 'stronger bases', 1376, LOW0 + 4 * ROW + 40, PAL.ink, { size: 20, align: 'right' });
    /* the chosen rung, bending from the last pair's place to this one's */
    const ry = pick.mix((id) => byId[id].ty ?? byId[id].y), ly = pick.mix((id) => byId[id].y);
    const onAxis = sel.ty != null;
    /* rung: on the axes for a measured pair, between the columns for a band pair */
    if (onAxis) {
      line(ctx, XA, ry, XB, ry, PAL.ink, 3, [10, 10]);
    } else {
      line(ctx, 470, ly, 930, ly, PAL.ink, 3, [10, 10]);
    }
    /* the two axes */
    line(ctx, XA, Y0, XA, YEND, hc, 3); line(ctx, XB, Y0, XB, YEND, hc, 3);
    for (let e = 0; e <= 14; e += 2) {
      const y = Y0 + e * DEC;
      line(ctx, XA, y, XA + 10, y, hc, 3); line(ctx, XB - 10, y, XB, y, hc, 3);
      text(ctx, e === 0 ? '1.0' : '10' + sup('−' + e), XA + 18, y, hc, { size: 20, bg: PAL.panel });
      text(ctx, e === 14 ? '1.0' : '10' + sup('−' + (14 - e)), XB - 18, y, hc, { size: 20, align: 'right', bg: PAL.panel });
    }
    if (onAxis) { dot(ctx, XA, ry, F.ref('acid'), true, 8); dot(ctx, XB, ry, F.ref('base'), true, 8); }
    text(ctx, '$\\kKa$', XA, YEND + 34, PAL.ink, { size: 24, align: 'center', tex: true });
    text(ctx, '$\\kKbion$', XB, YEND + 34, PAL.ink, { size: 24, align: 'center', tex: true });
    text(ctx, 'acids ionize completely in water;', 700, TOP0 + 2.5 * ROW - 16, PAL.muted, { size: 20, align: 'center', bg: bandBg });
    text(ctx, 'their bases do not ionize', 700, TOP0 + 2.5 * ROW + 16, PAL.muted, { size: 20, align: 'center', bg: bandBg });
    text(ctx, 'acids do not ionize in water;', 700, LOW0 + 2 * ROW - 16, PAL.muted, { size: 20, align: 'center', bg: bandBg });
    text(ctx, 'their bases ionize completely', 700, LOW0 + 2 * ROW + 16, PAL.muted, { size: 20, align: 'center', bg: bandBg });
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
      text(ctx, p.a, 462, p.y, ca, { size: 25, weight: wt, align: 'right' });
      text(ctx, p.an, 320, p.y, PAL.muted, { size: 20, align: 'right' });
      text(ctx, p.b, 938, p.y, cb, { size: 25, weight: wt });
      text(ctx, p.bn, 1085, p.y, PAL.muted, { size: 20 });
      const plain = (q) => sci(q).replace(/ \\times 10\^\{(-?\d+)\}/, (_, e) => ' × 10' + sup(e));
      const ka = p.K ? 'Ka = ' + plain(p.K) : (p.band === 'top' ? 'a strong acid' : 'not an acid in water');
      const kb = p.Kb ? 'Kb = ' + plain(p.Kb) : (p.band === 'low' ? 'a strong base' : 'not a base in water');
      hits.push({ x: 400, y: p.y, r: 14, name: `${p.an}, ${ka}` }, { x: 1000, y: p.y, r: 14, name: `${p.bn}, ${kb}` });
    });
    const kv = (s) => hue('equilibrium-constant', s);
    if (sel.band === 'top') tex(d.readout, `\\kKa \\approx \\infty \\\\ \\kKbion = \\kKw/\\kKa \\approx 0`);
    else if (sel.band === 'low') tex(d.readout, `\\kKbion \\approx \\infty \\\\ \\kKa = \\kKw/\\kKbion \\approx 0`);
    else {
      const r2 = (q) => { const e = Math.floor(Math.log10(q) + 1e-9); return +(q / 10 ** e).toFixed(1) * 10 ** e; };
      tex(d.readout, `\\kKa \\times \\kKbion = (${kv(sci(sel.K))})(${kv(sci(sel.Kb))}) = ${kv(sci(r2(sel.K) * r2(sel.Kb)))} = \\kKw`);
    }
  }
  register(d.fig, { update: () => {}, draw });
})();
};
