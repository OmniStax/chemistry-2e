/* Figures for section 14.3 Relative Strengths of Acids and Bases. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['14.3'] = function (root, F) {
const { fmt, tex, C, PAL, alpha, ctl, register, begin, line, dot, text, topline } = F;
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;
/* a small seeded generator, so a slider position always draws the same arrangement */
const rng = (seed) => () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
/* a number to n significant figures as TeX: 4.6 \times 10^{-4}; plain decimals from 0.01 up */
function sci(v, n = 2) {
  let e = Math.floor(Math.log10(v) + 1e-9), m = v / 10 ** e;
  if (+m.toFixed(n - 1) >= 10) { m /= 10; e += 1; }
  return e === 0 ? m.toFixed(n - 1) : `${m.toFixed(n - 1)} \\times 10^{${e}}`;
}
const KW = 1.0e-14;
const sup = (t) => t.replace(/[0-9−+-]/g, (ch) => '⁰¹²³⁴⁵⁶⁷⁸⁹'['0123456789'.indexOf(ch)] || (ch === '+' ? '⁺' : '⁻'));
/* the same number as figure text: 4.6 × 10⁻⁴ */
const plain = (q) => sci(q).replace(/ \\times 10\^\{(-?\d+)\}/, (_, e) => ' × 10' + sup(e.replace('-', '−')));

/* =====================================================================
   SIM: an acid in water, flat. Still: the beaker answers its choice and
   its slider. One hundred formula units of the chosen acid at every
   concentration, each drawn space-filling by its atoms; x from
   x²/([HA]₀ − x) = K_a solved exactly at the concentration the slider
   shows (HCl complete), water's own ionization neglected as the text
   does. The slots drawn ionized are the first round(100x/[HA]₀) of a
   fixed shuffled order, so dilution ionizes more of the same molecules:
   each one's proton leaves for a water molecule, which becomes H₃O⁺
   beside the ringed conjugate base. Graph: percent ionization against
   [HA]₀, both logarithmic, 0.01 to 1 M and 0.1 to 100 %, a curve per
   acid (acetic acid's 0.42 % at 1 M is the lowest value, HCl's 100 %
   the highest), each named with its K_a.
===================================================================== */
(function () {
  const d = F.sim(root, 'sim-acid-water', 690);
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
  /* the concentration the slider shows is the one solved for, so the readout's numbers are the model's */
  const cOf = (lg) => +cM(10 ** lg);
  const pick = F.choice(d.controls, { label: '\\text{acid}', options: [{ value: 'HCl', label: 'HCl' }, { value: 'HSO4', label: 'HSO₄⁻' }, { value: 'HNO2', label: 'HNO₂' }, { value: 'CH3CO2H', label: 'CH₃CO₂H' }], value: 'CH3CO2H', aria: 'acid dissolved in the water', onInput: () => shown.set(solve(pick.value, cOf(c0.v)).n) });
  const c0 = ctl(d.controls, { label: '\\kconcHAz', cls: 'concentration', key: 'c0', min: -2, max: 0, step: 0.001, value: -1, fmt: (lg) => `${cM(10 ** lg)} M`,
    detents: [{ v: Math.log10(0.0516), label: '0.0516' }, { v: Math.log10(0.5), label: '0.50' }], snap: true, aria: 'initial concentration of the acid', onInput: () => moved() });
  const N = 100, R = rng(29);
  function cM(c) { return c < 0.0995 ? c.toPrecision(2 + (Math.abs(c - 0.0516) < 2e-4 ? 1 : 0)) : c.toPrecision(3); }
  /* the beaker: glass from BX0 to BX1, liquid from LY to BY; 10 by 10 slots, jittered */
  const BX0 = 60, BX1 = 740, BY = 608, LY = 150, TOPY = 104, SC = 0.96, RING = 30;
  const slots = [];
  for (let i = 0; i < N; i++) {
    const col = i % 10, row = Math.floor(i / 10);
    const x = BX0 + 62 + col * 61.5 + (R() - 0.5) * 12, y = LY + 36 + row * 42 + (R() - 0.5) * 6;   /* a ringed pair reaches ~42 out from its slot: keep it clear of the glass */
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
  function moved() { shown.to(solve(pick.value, cOf(c0.v)).n, 500); }
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
  let ringA = 1;   /* the rings pick out the ionized few; where most are ionized they fade, since every pair would wear one */
  function slot(ctx, A, i, k) {
    const s = slots[i], hAt = A.atoms[A.atoms.length - 1];
    const bx = s.x - 5 * k, ox = s.x + s.hx * SC, oy = s.y + s.hy * SC;
    if (k > 0) {
      ctx.save(); ctx.setLineDash([5, 5]); ctx.strokeStyle = alpha(F.ref('base'), k * ringA); ctx.lineWidth = 3;
      ctx.beginPath(); ctx.arc((bx + ox) / 2, (s.y + oy) / 2, RING, 0, 2 * Math.PI); ctx.stroke(); ctx.restore();
      atoms(ctx, H3O, ox, oy, 0.8 * SC, 1, false, k);
    }
    atoms(ctx, A.atoms, bx, s.y, SC, s.flip, true, 0.5 + 0.5 * k);   /* the molecules still whole stand back, the ions forward */
    if (k < 1) {
      const hx = bx + s.flip * hAt[1] * SC, hy = s.y + hAt[2] * SC;
      atoms(ctx, [['H', 0, 0, hAt[3]]], hx + (ox - hx) * k, hy + (oy - 6 - hy) * k, SC, 1, false, 0.5 * (1 - k * k));
    }
  }
  /* graph: % ionization against [HA]₀, log both, drawn on log10 + 2 and log10 + 1 so that no zero line falls inside the frame */
  const G = { l: 890, r: 1180, t: 150, b: 560 };
  const pct = (acid, c) => (100 * solve(acid, c).x) / c;
  let hits = [];
  F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c), A = ACIDS[pick.value], c = cOf(c0.v), s = solve(pick.value, c), nk = shown.v;
    hits = [];
    /* the beaker: a lip flaring out at the top, a pouring spout at the left, rounded foot; the liquid inside */
    const glass = alpha(PAL.ink, 0.75);
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
    F.legend(ctx, { l: BX0, r: BX1, t: LY, b: BY - 26 }, [
      { s: A.a, draw: (cx, x, y) => atoms(cx, A.atoms, x, y, 0.7, 1, false, 0.5) },
      { s: `${A.b} + H_{3}O⁺`, draw: (cx, x, y) => {
        cx.save(); cx.setLineDash([4, 4]); cx.strokeStyle = alpha(F.ref('base'), ringA); cx.lineWidth = 2.5; cx.beginPath(); cx.arc(x + 2, y + 2, 20, 0, 2 * Math.PI); cx.stroke(); cx.restore();
        atoms(cx, A.atoms, x - 5, y - 2, 0.55, 1, true); atoms(cx, H3O, x + 10, y + 9, 0.45, 1, false);
      } },
    ], { corner: 'below', size: 22 });
    /* the graph */
    const cc = C('concentration'), kc = C('equilibrium-constant');
    const g = F.axes(ctx, G, [0, 2], [0, 3], { nx: 2, ny: 3, fx: (v) => ['0.01', '0.1', '1'][Math.round(v)], fy: (v) => ['0.1', '1', '10', '100'][Math.round(v)],
      xl: '[HA]_{0} (M)', xc: cc, yl: '% ionization', yc: PAL.ink });
    Object.keys(ACIDS).forEach((k) => {
      const on = k === pick.value, col = on ? PAL.ink : alpha(PAL.ink, 0.32);
      F.plot(ctx, g, (u) => Math.log10(pct(k, 10 ** (u - 2))) + 1, col, { w: on ? 5 : 3 });
      const yEnd = g.Y(Math.log10(pct(k, 1)) + 1), K = ACIDS[k].K;
      text(ctx, ACIDS[k].a, G.r + 14, yEnd - 13, on ? PAL.ink : PAL.muted, { size: 22, weight: on ? 600 : 400 });
      text(ctx, K === Infinity ? '$\\kKa \\approx \\infty$' : `$\\kKa = ${hue('equilibrium-constant', sci(K))}$`, G.r + 14, yEnd + 15, on ? kc : alpha(kc, 0.7), { size: 20, tex: true });
    });
    const P = (100 * s.x) / c, px = g.X(Math.log10(c) + 2), py = g.Y(Math.log10(P) + 1);
    line(ctx, px, py, px, G.b, alpha(cc, 0.6), 2.5, [4, 8]);
    line(ctx, G.l, py, px, py, alpha(PAL.ink, 0.45), 2.5, [4, 8]);
    dot(ctx, px, py, PAL.ink, true, 9);
    const Ps = fmt(P, P >= 10 ? 0 : 1);
    hits.push({ x: px, y: py, r: 14, name: `${A.name}, ${cM(c)} M: ${Ps} % ionized` });

    const cs = cM(c), n = s.n;
    const one = A.unit.slice(0, -1), who = n >= N ? `every ${one} has` : n === 0 ? `fewer than 1 of every 100 ${A.unit} has` : `${n} of every 100 ${A.unit} ${n === 1 ? 'has' : 'have'}`;
    topline(ctx, `In ${cs} M ${A.name}, ${who} given ${n > 1 && n < N ? 'their protons' : 'its proton'} to water.`);
    /* the readout: K_a from the equilibrium mixture (three figures in, two out, as the text reports its constants), then the percent */
    const kv = (q) => hue('equilibrium-constant', q), cv = (q) => hue('concentration', q);
    const num = (q, nsig) => (q < 0.00995 ? sci(q, nsig) : q.toPrecision(nsig));
    const conc = (q) => (q < 0.0095 ? sci(q) : cM(q)) + '\\ M';
    const ka = A.K === Infinity
      ? `\\kKa = \\dfrac{\\kconcHyd\\kconcAm}{\\kconcHA} \\approx \\infty`
      : `\\kKa = \\dfrac{\\kconcHyd\\kconcAm}{\\kconcHA} = \\dfrac{(${cv(num(s.x, 3))})(${cv(num(s.x, 3))})}{${cv(num(c - s.x, 3))}} = ${kv(sci(A.K))}`;
    tex(d.readout, `${ka} \\\\ \\text{\\% ionization} = \\dfrac{\\kconcHydeq}{\\kconcHAz}\\times 100 = \\dfrac{${cv(conc(s.x))}}{${cv(conc(c))}}\\times 100 = ${Ps}\\%`);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 14.7 + 14.8: conjugate acid-base pairs, the ranked table of
   Figure 14.8 carrying the constants of Figure 14.7 as bars. Still: a
   choice of pair. Each row is one pair, the acid's formula left of the
   centre and its conjugate base's right. Left of the acid a bar on a
   logarithmic K_a scale, 10⁻¹⁴ at the formula out to 1.0, 30 units a
   decade; right of the base the mirrored K_b scale, K_b = K_w/K_a, so in
   every weak pair the two bars together span fourteen decades. Constants:
   Appendix H; NH₄⁺ from Appendix I's K_b of NH₃; HClO₂, H₃O⁺ and H₂O at
   Figure 14.7's own 10⁻², 1.0 and 10⁻¹⁴. The six strong acids above H₃O⁺
   and the five strong bases below OH⁻ run off their scales, as Figure 14.8
   brackets them.
===================================================================== */
(function () {
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
  /* rows 34 apart in three groups; the bars start beside the formulas and run outward, 30 units a decade */
  const ROW = 32, GAP = 14, Y1 = 214, DEC = 30, BH = 16;
  const CX = 700, XA0 = 536, XB0 = 864, XA1 = XA0 - 14 * DEC, XB1 = XB0 + 14 * DEC;   /* 116 and 1284 */
  let y = Y1, last = 'top';
  PAIRS.forEach((p) => {
    const grp = p.band === 'top' ? 'top' : p.band === 'low' ? 'low' : 'mid';
    if (grp !== last) { y += GAP; last = grp; }
    p.grp = grp; p.y = y; y += ROW;
  });
  const YB = y - ROW / 2 + 12, H = YB + 52;   /* the lower scale's line, and the canvas */
  const d = F.sim(root, 'sim-conjugate-ladder', H);
  const xa = (K) => XA0 - (14 + Math.log10(K)) * DEC, xb = (K) => XB0 + (14 + Math.log10(K)) * DEC;

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
  /* a tap on a row chooses its pair */
  d.c.style.cursor = 'pointer';
  d.c.addEventListener('click', (e) => {
    const r = d.c.getBoundingClientRect(); if (!r.width) return;
    const py = ((e.clientY - r.top) * 1400) / r.width;
    const p = PAIRS.find((q) => Math.abs(py - q.y) <= ROW / 2);
    if (p && p.id !== pick.value) pick.drive(p.id);
  });
  /* a bar from x0 to x1 about row y; off the scale it runs on into an arrowhead */
  function bar(ctx, x0, x1, yy, color, off) {
    ctx.save(); ctx.fillStyle = color;
    const lo = Math.min(x0, x1), w = Math.abs(x1 - x0);
    if (w > 0) ctx.fillRect(lo, yy - BH / 2, w, BH);
    if (off) {
      const s = Math.sign(x1 - x0);
      ctx.beginPath(); ctx.moveTo(x1, yy - BH / 2 - 5); ctx.lineTo(x1 + s * 26, yy); ctx.lineTo(x1, yy + BH / 2 + 5); ctx.closePath(); ctx.fill();
    }
    ctx.restore();
  }
  function scale(ctx, yy, up, hc) {
    line(ctx, XA1, yy, XA0, yy, hc, 3); line(ctx, XB0, yy, XB1, yy, hc, 3);
    for (let e = 0; e <= 14; e += 2) {
      const lx = XA0 - (14 - e) * DEC, rx = XB0 + (14 - e) * DEC, t = up ? -8 : 8, s = e === 0 ? '1.0' : '10' + sup('−' + e);
      line(ctx, lx, yy, lx, yy + t, hc, 3); line(ctx, rx, yy, rx, yy + t, hc, 3);
      if (e === 0) { text(ctx, s, lx, yy + (up ? -24 : 26), hc, { size: 21, align: 'center' }); text(ctx, s, rx, yy + (up ? -24 : 26), hc, { size: 21, align: 'center' }); }
      if (e % 4 === 0) continue;   /* 1.0, then every fourth decade, in to 10⁻¹⁴ at the formulas */
      text(ctx, s, lx, yy + (up ? -24 : 26), hc, { size: 21, align: 'center' });
      text(ctx, s, rx, yy + (up ? -24 : 26), hc, { size: 21, align: 'center' });
    }
  }
  function draw() {
    const { ctx } = begin(d.c);
    const sel = byId[pick.value], hc = C('equilibrium-constant'), ca = F.ref('acid'), cb = F.ref('base');
    const YT = Y1 - ROW / 2 - 12;
    topline(ctx, headline(sel));
    /* the two bands of Figure 14.8's brackets */
    const top = PAIRS.filter((p) => p.grp === 'top'), low = PAIRS.filter((p) => p.grp === 'low');
    ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.05);
    ctx.fillRect(20, top[0].y - ROW / 2, 1360, top.length * ROW); ctx.fillRect(20, low[0].y - ROW / 2, 1360, low.length * ROW);
    ctx.restore();
    /* faint rules every two decades, the scales above and below */
    for (let e = 0; e <= 14; e += 2) {
      const lx = XA0 - (14 - e) * DEC, rx = XB0 + (14 - e) * DEC;
      line(ctx, lx, YT, lx, YB, alpha(PAL.ink, 0.12), 1.5); line(ctx, rx, YT, rx, YB, alpha(PAL.ink, 0.12), 1.5);
    }
    scale(ctx, YT, true, hc); scale(ctx, YB, false, hc);
    text(ctx, 'acid', CX - 12, YT - 62, PAL.ink, { size: 24, weight: 600, align: 'right' });
    text(ctx, 'conjugate base', CX + 12, YT - 62, PAL.ink, { size: 24, weight: 600 });
    text(ctx, '$\\kKa$', (XA0 + XA1) / 2, YT - 62, PAL.ink, { size: 26, align: 'center', tex: true });
    text(ctx, '$\\kKbion$', (XB0 + XB1) / 2, YT - 62, PAL.ink, { size: 26, align: 'center', tex: true });
    line(ctx, CX, YT - 44, CX, YB, alpha(PAL.ink, 0.3), 2);
    /* the band notes, each in the half of its band that holds no bars */
    const nt = top[0].y + 2.5 * ROW, nl = low[0].y + 2 * ROW;
    const mid = PAIRS.filter((p) => p.grp === 'mid'), NX = 1092;
    text(ctx, 'strong acids', NX, nt - 30, PAL.ink, { size: 22, weight: 600 });
    text(ctx, 'ionize completely in water;', NX, nt, PAL.ink, { size: 21 });
    text(ctx, 'their bases do not ionize', NX, nt + 28, PAL.ink, { size: 21 });
    text(ctx, 'weak acids, weak bases', NX, mid[0].y + 2, PAL.ink, { size: 22, weight: 600 });
    text(ctx, 'ionize in part', NX, mid[0].y + 32, PAL.ink, { size: 21 });
    text(ctx, 'strong bases', 410, nl - 30, PAL.ink, { size: 22, weight: 600, align: 'right' });
    text(ctx, 'ionize completely in water;', 410, nl, PAL.ink, { size: 21, align: 'right' });
    text(ctx, 'their acids do not ionize', 410, nl + 28, PAL.ink, { size: 21, align: 'right' });
    hits = [];
    PAIRS.forEach((p) => {
      const w = pick.a(p.id), on = w > 0.5;
      const fa = F.mixColor(PAL.ink, ca, w), fb = F.mixColor(PAL.ink, cb, w);
      const ba = F.mixColor(alpha(hc, 0.4), ca, w), bb = F.mixColor(alpha(hc, 0.4), cb, w);
      if (w > 0) { ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.09 * w); ctx.fillRect(20, p.y - ROW / 2, 1360, ROW); ctx.restore(); }
      /* water, the reference, on a soft panel wherever it stands */
      if (p.id === 'H3O' || p.id === 'H2O') {
        ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.1);
        if (p.id === 'H2O') ctx.fillRect(XA0 + 6, p.y - ROW / 2 + 3, CX - XA0 - 8, ROW - 6); else ctx.fillRect(CX + 2, p.y - ROW / 2 + 3, XB0 - CX - 8, ROW - 6);
        ctx.restore();
      }
      const offA = p.band === 'top', offB = p.band === 'low';
      const ea = offA ? XA1 : p.K ? xa(p.K) : XA0, eb = offB ? XB1 : p.Kb ? xb(p.Kb) : XB0;
      bar(ctx, XA0, ea, p.y, ba, offA); bar(ctx, XB0, eb, p.y, bb, offB);
      text(ctx, p.a, CX - 12, p.y, fa, { size: 26, weight: on ? 600 : 400, align: 'right' });
      text(ctx, p.b, CX + 12, p.y, fb, { size: 26, weight: on ? 600 : 400 });
      /* the chosen pair's two constants, written past the ends of its bars */
      if (w > 0.02) {
        const va = offA ? '≈ ∞' : p.K ? plain(p.K) : '≈ 0', vb = offB ? '≈ ∞' : p.Kb ? plain(p.Kb) : '≈ 0';
        text(ctx, va, ea - (offA ? 36 : 10), p.y, alpha(ca, w), { size: 23, weight: 600, align: 'right' });
        text(ctx, vb, eb + (offB ? 36 : 10), p.y, alpha(cb, w), { size: 23, weight: 600 });
      }
      const ka = p.K ? 'Ka = ' + plain(p.K) : (p.band === 'top' ? 'a strong acid, Ka too large to measure in water' : 'not an acid in water');
      const kb = p.Kb ? 'Kb = ' + plain(p.Kb) : (p.band === 'low' ? 'a strong base, Kb too large to measure in water' : 'not a base in water');
      hits.push({ x: CX - 60, y: p.y, r: 17, name: `${p.an}, ${ka}` }, { x: CX + 60, y: p.y, r: 17, name: `${p.bn}, ${kb}` },
        { x: (XA0 + ea) / 2, y: p.y, r: 14, name: `${p.an}, ${ka}` }, { x: (XB0 + eb) / 2, y: p.y, r: 14, name: `${p.bn}, ${kb}` });
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
