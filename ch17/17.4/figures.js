/* Figures for section 17.4 Potential, Free Energy, and Equilibrium. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['17.4'] = function (root, F) {
const { C, PAL, alpha, cycle, register, begin, line, text, dot, arrow, topline } = F;
const sim = (id, H) => F.sim(root, id, H);
const still = (d, draw) => register(d.fig, { update: () => {}, draw });
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;
const minus = (s) => String(s).replace('-', '−');
const signed = (v, dec) => (+v.toFixed(dec) > 0 ? '+' : '') + minus(v.toFixed(dec));
/* the same inside TeX, where the minus is the hyphen */
const signedT = (v, dec) => (+v.toFixed(dec) > 0 ? '+' : '') + (+v.toFixed(dec) === 0 ? (0).toFixed(dec) : v.toFixed(dec));
const SUP = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
const pow10 = (e) => (e === 0 ? '1' : `10${String(e).split('').map((c) => SUP[c]).join('')}`);
/* 10^x to two significant figures, as TeX: 1.3 \times 10^{42}, or a plain number between 0.01 and 1000 */
function sci(x) {
  if (x >= -2 && x < 3) return String(+(10 ** x).toPrecision(2));
  let e = Math.floor(x), m = +(10 ** (x - e)).toFixed(1);
  if (m >= 10) { m = 1; e += 1; }
  return `${m.toFixed(1)} \\times 10^{${e}}`;
}
/* 10^x to two figures in the figure font: 1.3 × 10⁴² */
const sciU = (x) => sci(x).replace(/ \\times 10\^\{(-?\d+)\}/, (_, e) => ` × ${pow10(+e)}`);
/* a fixed-point number that never reads −0.0 */
const fx0 = (v, dec) => { const s = v.toFixed(dec); return /^-0\.?0*$/.test(s) ? s.slice(1) : s; };
const FARADAY = 96485, NERNST = 0.0592;
const N_OPTS = ['1', '2', '3', '4', '6'].map((v) => ({ value: v, label: v }));

/* =====================================================================
   FIGURE 17.7: one reaction read on three scales at 298 K. E°cell runs
   from −1.5 to +1.5 V along the top scale; under it, on the same
   positions, ΔG° = −nFE°cell and K = 10^(nE°cell/0.0592 V), so one
   upright cursor crosses all three at the values that belong together
   and the column E°cell = 0, ΔG° = 0, K = 1 divides Table 17.2's two
   sides. The book's triangle is unfolded at the right: each scale's
   name is a vertex and the three double-headed arrows carry the book's
   three relations. Changing n slides the ΔG° and K ticks under the
   fixed E°cell scale. Defaults are Example 17.6: E°cell = +1.247 V,
   n = 2, ΔG° = −240.6 kJ/mol, K = 1.3 × 10⁴². Still: a relation.
===================================================================== */
(function () {
  const H = 610, d = sim('sim-relations', H);
  const X0 = 70, X1 = 850, YE = 215, YG = 365, YK = 515, EMAX = 1.5, NX = 880, EX = 1150;
  const X = (E) => X0 + (E + EMAX) / (2 * EMAX) * (X1 - X0);
  const e0 = F.ctl(d.controls, {
    label: '\\kEocell', cls: 'potential', min: -EMAX, max: EMAX, step: 0.001, value: 1.247, unit: 'V', dec: 3,
    aria: 'standard cell potential, in volts', specials: [{ at: 0, label: 'K = 1' }],
  });
  const nPick = F.choice(d.controls, { label: '\\kn', options: N_OPTS, value: '2', aria: 'moles of electrons transferred' });
  const ro = F.readout(d);
  let hits = [];
  F.hover(d.stage, () => hits);
  const stepFor = (max, list) => list.find((s) => max / s <= 5.1) || list[list.length - 1];
  const both = (ctx, x1, y1, x2, y2) => { const mx = (x1 + x2) / 2, my = (y1 + y2) / 2; arrow(ctx, mx, my, x1, y1, PAL.ink, 3); arrow(ctx, mx, my, x2, y2, PAL.ink, 3); };
  function row(ctx, y, ticks) {
    line(ctx, X0, y, X1, y, PAL.ink, 3);
    ticks.forEach(([E, s]) => {
      const x = X(E); if (x < X0 - 0.5 || x > X1 + 0.5) return;
      line(ctx, x, y - 9, x, y + 9, PAL.ink, 2);
      text(ctx, s, x, y + 31, PAL.muted, { size: 17, align: 'center', bg: PAL.panel });
    });
  }

  function draw() {
    const { ctx } = begin(d.c);
    const E = +e0.v.toFixed(3), n = +nPick.value, nE = nPick.mix((v) => +v);
    const g = -n * FARADAY * E / 1000, lk = n * E / NERNST;
    const cE = C('potential'), cG = C('energy'), cK = C('equilibrium-constant');
    hits = [];
    const zx = X(0), cx = X(E), side = Math.sign(E);

    /* Table 17.2's three cases, the one the cursor is in set in ink */
    const word = (s1, s2, x, on) => {
      text(ctx, s1, x, 58, on ? PAL.ink : PAL.muted, { size: 24, align: 'center', weight: on ? 600 : 400 });
      text(ctx, s2, x, 92, on ? PAL.ink : PAL.muted, { size: 19, align: 'center' });
    };
    word('nonspontaneous', 'reactants more abundant at equilibrium', (X0 + zx) / 2, side < 0);
    word('spontaneous', 'products more abundant at equilibrium', (zx + X1) / 2, side > 0);
    line(ctx, zx, 40, zx, YK + 46, alpha(PAL.ink, 0.5), 2, [10, 10]);
    text(ctx, 'at equilibrium under standard conditions', zx, YK + 66, side === 0 ? PAL.ink : PAL.muted, { size: 19, align: 'center', weight: side === 0 ? 600 : 400 });

    /* the cursor through all three scales, under the scales and their tick labels */
    line(ctx, cx, YE - 26, cx, YK, alpha(PAL.ink, 0.75), 3);

    const tE = []; for (let v = -1.5; v <= 1.5001; v += 0.5) tE.push([v, signed(v, 1)]);
    const gMax = nE * FARADAY * EMAX / 1000, gs = stepFor(n * FARADAY * EMAX / 1000, [50, 100, 200, 500]);
    const tG = []; for (let v = -Math.floor(gMax / gs) * gs; v <= gMax + 1e-6; v += gs) tG.push([-v * 1000 / (nE * FARADAY), v === 0 ? '0' : signed(v, 0)]);
    const kMax = nE * EMAX / NERNST, ks = stepFor(n * EMAX / NERNST, [5, 10, 20, 50]);
    const tK = []; for (let v = -Math.floor(kMax / ks) * ks; v <= kMax + 1e-6; v += ks) tK.push([v * NERNST / nE, pow10(v)]);
    row(ctx, YE, tE); row(ctx, YG, tG); row(ctx, YK, tK);

    /* the three values that belong together */
    const gS = (g > 0.05 ? '+' : '') + fx0(g, 1), kU = sciU(lk), right = cx < 470, lx = cx + (right ? 22 : -22), al = right ? 'left' : 'right';
    const val = (sym, s, y, col) => F.rich(ctx, [`$${sym}$ = `, [s, col]], lx, y - 44, { size: 28, align: al, tex: true, bg: PAL.panel });
    val('\\kEocell', `${signed(E, 3)} V`, YE, cE);
    val('\\kdGo', `${minus(gS)} kJ/mol`, YG, cG);
    val('\\kK', kU, YK, cK);
    dot(ctx, cx, YE, cE, true, 11); dot(ctx, cx, YG, cG, true, 11); dot(ctx, cx, YK, cK, true, 11);
    hits.push({ x: cx, y: YE, r: 18, name: `E°cell, the standard cell potential: ${signed(E, 3)} V` });
    hits.push({ x: cx, y: YG, r: 18, name: `ΔG°, the standard free energy change: ${minus(gS)} kJ/mol` });
    hits.push({ x: cx, y: YK, r: 18, name: `K, the equilibrium constant: ${kU}` });

    /* the book's triangle, unfolded: a scale's name is a vertex, each arrow a relation */
    text(ctx, '$\\kEocell$ (V)', NX, YE, PAL.ink, { size: 24, align: 'left', tex: true });
    text(ctx, '$\\kdGo$ (kJ/mol)', NX, YG, PAL.ink, { size: 24, align: 'left', tex: true });
    text(ctx, '$\\kK$', NX, YK, PAL.ink, { size: 24, align: 'left', tex: true });
    both(ctx, NX + 22, YE + 28, NX + 22, YG - 28); both(ctx, NX + 22, YG + 28, NX + 22, YK - 28);
    text(ctx, '$\\kdGo = -\\kn\\kFaraday\\kEocell$', NX + 46, (YE + YG) / 2, PAL.ink, { size: 22, align: 'left', tex: true });
    text(ctx, '$\\kdGo = -R\\kT\\ln\\kK$', NX + 46, (YG + YK) / 2, PAL.ink, { size: 22, align: 'left', tex: true });
    line(ctx, NX + 150, YE, EX, YE, PAL.ink, 3); line(ctx, EX, YE, EX, YK, PAL.ink, 3); line(ctx, NX + 70, YK, EX, YK, PAL.ink, 3);
    arrow(ctx, NX + 170, YE, NX + 132, YE, PAL.ink, 3); arrow(ctx, NX + 90, YK, NX + 52, YK, PAL.ink, 3);
    text(ctx, '$\\kEocell = \\frac{R\\kT}{\\kn\\kFaraday}\\ln\\kK$', EX + 16, YG, PAL.ink, { size: 25, align: 'left', tex: true });
    hits.push({ x: NX + 22, y: (YE + YG) / 2, r: 30, name: 'free energy change from potential: ΔG° = −nFE°cell' });
    hits.push({ x: NX + 22, y: (YG + YK) / 2, r: 30, name: 'free energy change from the equilibrium constant: ΔG° = −RT ln K' });
    hits.push({ x: EX, y: YG, r: 30, name: 'potential from the equilibrium constant: E°cell = (RT/nF) ln K' });

    const nv = hue('amount', n), Fv = hue('charge', '96{,}485') + '\\ \\text{C/mol}';
    const Ev = (u) => hue('potential', E < 0 ? `(${E.toFixed(3)}` : E.toFixed(3)) + `\\ \\text{${u}}` + (E < 0 ? ')' : '');
    ro.set(`\\mk{G}{\\kdGo} = -\\mk{n}{\\kn}\\mk{F}{\\kFaraday}\\mk{E}{\\kEocell} = -\\mk{nv}{${nv}} \\times \\mk{Fv}{${Fv}} \\times \\mk{Ev}{${Ev('J/C')}} = \\mk{g}{${hue('energy', gS)}}\\ \\text{kJ/mol}`
      + ` \\\\ \\mk{K}{\\kK} = 10^{\\mk{n2}{\\kn}\\mk{E2}{\\kEocell}/0.0592\\ \\text{V}} = 10^{\\mk{nv2}{${nv}} \\times \\mk{Ev2}{${Ev('V')}}/0.0592\\ \\text{V}} = 10^{\\mk{x}{${fx0(lk, 2)}}} = \\mk{k}{${hue('equilibrium-constant', E === 0 ? '1' : sci(lk))}}`);
  }
  still(d, draw);
})();

/* =====================================================================
   SIM: the Nernst equation at 298 K for the section's three cells, each
   with the concentrations of its two solutions on the sliders (log
   scale). Q is worked from them and E_cell = E°cell − (0.0592 V/n) log Q
   is the point on the cell's line against Q. Example 17.7 (Co, Fe²⁺):
   n = 2, E°cell = −0.17 V, 0.15 M and 1.94 M give Q = 0.0773 and
   E_cell = −0.137 V (the book's −0.14 V); the line meets zero at
   Q = K = 1.8 × 10⁻⁶. Its Check Your Learning (Al, Cu²⁺): n = 6,
   E°cell = 0.337 V + 1.662 V = 2.00 V, Q = (0.15)²/(0.025)³ = 1440,
   E_cell = +1.969 V (the book's +1.97 V). Example 17.8 (Zn, Zn²⁺):
   n = 2, E°cell = 0.000 V, Q = 0.10/0.50 = 0.200, E_cell = +0.021 V.
   Each concentration is rounded as it is shown and Q to three figures,
   so the readout is true as written. Axes fixed per cell: Q from 10⁻¹⁰
   to 10¹⁰ for all three, E_cell over 0.6 to 0.7 V about E°cell, so the
   slopes compare; the sliders reach no Q outside it. Still: a relation.
===================================================================== */
(function () {
  const H = 640, d = sim('sim-nernst', H);
  const G = { l: 150, r: 1320, t: 130, b: 540 }, LMAX = 0.301;
  const CELLS = {
    cofe: { name: 'Co and Fe²⁺ (Example 17.7)', n: 2, E0: -0.17, E0s: '-0.17', an: 'Co', anIon: 'Co²⁺', cat: 'Fe', catIon: 'Fe²⁺', anT: '[\\text{Co}^{2+}]', catT: '[\\text{Fe}^{2+}]', pa: 1, pc: 1, ca: 0.15, cc: 1.94, lmin: -6, yr: [-0.5, 0.2], ny: 7 },
    alcu: { name: 'Al and Cu²⁺ (17.7’s check)', n: 6, E0: 2.00, E0s: '2.00', an: 'Al', anIon: 'Al³⁺', cat: 'Cu', catIon: 'Cu²⁺', anT: '[\\text{Al}^{3+}]', catT: '[\\text{Cu}^{2+}]', pa: 2, pc: 3, ca: 0.15, cc: 0.025, lmin: -3, yr: [1.7, 2.3], ny: 6 },
    zn: { name: 'Zn and Zn²⁺ (Example 17.8)', n: 2, E0: 0, E0s: '0.000', an: 'Zn', anIon: 'Zn²⁺', cat: 'Zn', catIon: 'Zn²⁺', anT: '[\\text{Zn}^{2+}]_{\\text{anode}}', catT: '[\\text{Zn}^{2+}]_{\\text{cathode}}', pa: 1, pc: 1, ca: 0.10, cc: 0.50, lmin: -6, yr: [-0.3, 0.3], ny: 6 },
  };
  let cell = null, ca = null, cc = null;
  const cur = () => CELLS[cell ? cell.value : 'cofe'];
  const logK = () => cur().n * cur().E0 / NERNST;
  const ready = () => cell && ca && cc;
  /* a concentration as it is shown: two figures below 1 M, two decimals above */
  const conc = (lg) => { const c = 10 ** lg; return c >= 1 ? +c.toFixed(2) : +c.toPrecision(2); };
  const parts = (c) => { const [m, e] = c.toExponential(1).split('e'); return [m, +e]; };
  const concU = (c) => (c >= 1 ? c.toFixed(2) : c >= 0.001 ? c.toPrecision(2) : `${parts(c)[0]} × ${pow10(parts(c)[1])}`);
  const concT = (c) => (c >= 0.001 ? concU(c) : `${parts(c)[0]} \\times 10^{${parts(c)[1]}}`);
  /* Q to three figures, as a number, as text and as TeX */
  function q3(q) {
    if (q >= 0.001 && q < 1e5) { const s = q >= 1000 ? String(Math.round(+q.toPrecision(3))) : q.toPrecision(3); return { v: +s, u: s, t: s }; }
    const [m, e] = q.toExponential(2).split('e'); return { v: +`${m}e${e}`, u: `${m} × ${pow10(+e)}`, t: `${m} \\times 10^{${+e}}` };
  }
  const inRange = (c, v) => (v >= c.lmin && v <= LMAX ? v : null);
  cell = F.select(d.controls, {
    label: '\\text{cell}', key: 'cell', options: Object.keys(CELLS).map((k) => ({ value: k, label: CELLS[k].name })), value: 'cofe', aria: 'the cell, one of the three this section works',
    onInput: () => {
      if (!ready()) return; const c = cur();
      ca.range({ min: c.lmin, max: LMAX, step: 0.001, value: Math.log10(c.ca) }); cc.range({ min: c.lmin, max: LMAX, step: 0.001, value: Math.log10(c.cc) });
      ca.refresh(); cc.refresh();
    },
  });
  ca = F.ctl(d.controls, {
    label: '\\text{anode}', cls: 'concentration', key: 'anode', min: -6, max: LMAX, step: 0.001, value: Math.log10(0.15), unit: 'M',
    fmt: (lg) => `${concU(conc(lg))} M ${cur().anIon}`, aria: 'concentration of the ion in the anode solution, on a logarithmic scale',
    specials: [{ at: () => (ready() ? inRange(cur(), (logK() + cur().pc * cc.v) / cur().pa) : null), label: 'Q = K' }],
  });
  cc = F.ctl(d.controls, {
    label: '\\text{cathode}', cls: 'concentration', key: 'cathode', min: -6, max: LMAX, step: 0.001, value: Math.log10(1.94), unit: 'M',
    fmt: (lg) => `${concU(conc(lg))} M ${cur().catIon}`, aria: 'concentration of the ion in the cathode solution, on a logarithmic scale',
    specials: [{ at: () => (ready() ? inRange(cur(), (cur().pa * ca.v - logK()) / cur().pc) : null), label: 'Q = K' }],
  });
  [ca, cc].forEach((c) => c.refresh());
  const ro = F.readout(d);
  let hits = [];
  F.hover(d.stage, () => hits);

  function draw() {
    const { ctx } = begin(d.c);
    const c = cur(), A = conc(ca.v), B = conc(cc.v), lK = logK(), slope = NERNST / c.n;
    const at = Math.abs(c.pa * ca.v - c.pc * cc.v - lK) < 1e-6;
    const q = q3(A ** c.pa / B ** c.pc), x = at ? lK : Math.log10(q.v), Ec = at ? 0 : c.E0 - slope * Math.log10(q.v);
    const cE = C('potential'), cK = C('equilibrium-constant'), cC = C('concentration');
    const E0u = `${c.E0 > 0 ? '+' : ''}${minus(c.E0s)} V`, kU = lK === 0 ? '1' : sciU(lK);
    hits = [];

    /* the cell as the book writes one, its two concentrations live */
    F.rich(ctx, [`${c.an}(s) | ${c.anIon}(aq, `, [`${concU(A)} M`, cC], `) ‖ ${c.catIon}(aq, `, [`${concU(B)} M`, cC], `) | ${c.cat}(s)`], 700, 56, { size: 26, align: 'center' });
    const lab = F.labeller(ctx, H, {});
    const { X, Y } = F.axes(ctx, G, [-10, 10], c.yr, {
      nx: 10, ny: c.ny, xl: 'Q', xc: cK, yl: 'E_{cell} (V)', yc: cE,
      fx: (v) => pow10(Math.round(v)), fy: (v) => signed(v, 1),
    });
    const f = (s) => c.E0 - slope * s, zeroIn = c.yr[0] < 0 && c.yr[1] > 0;
    ctx.save(); ctx.fillStyle = alpha(cE, 0.07); ctx.fillRect(G.l, G.t, G.r - G.l, (zeroIn ? Y(0) : G.b) - G.t); ctx.restore();
    if (zeroIn) line(ctx, G.l, Y(0), G.r, Y(0), PAL.ink, 2.5);
    const sp = Ec > 0, ns = Ec < 0;
    text(ctx, 'spontaneous', G.r - 16, G.t + 24, sp ? PAL.ink : PAL.muted, { size: 22, align: 'right', weight: sp ? 600 : 400 });
    lab.block(G.r - 170, G.t + 6, G.r, G.t + 42);
    if (zeroIn) text(ctx, 'nonspontaneous', G.l + 16, G.b - 24, ns ? PAL.ink : PAL.muted, { size: 22, align: 'left', weight: ns ? 600 : 400 });
    else text(ctx, `E_{cell} is zero only at Q = K = ${kU}, far off this scale`, G.l + 16, G.b - 24, PAL.muted, { size: 20, align: 'left' });
    lab.block(G.l, G.b - 42, G.l + (zeroIn ? 200 : 560), G.b - 6);
    ctx.save(); ctx.beginPath(); ctx.rect(G.l, G.t, G.r - G.l, G.b - G.t); ctx.clip();
    F.curve(ctx, f, -10, 10, X, Y, cE, 5, 2);
    ctx.restore();

    /* E°cell where Q = 1, and Q = K where the line meets zero */
    dot(ctx, X(0), Y(c.E0), cE, false, 10);
    lab.add(`E°_{cell} = ${E0u}`, X(0), Y(c.E0), -0.5, 0.85, cE, 22, 26);
    hits.push({ x: X(0), y: Y(c.E0), r: 16, name: `E°cell = ${E0u}, where Q = 1` });
    if (zeroIn && lK >= -10 && lK <= 10) {
      if (lK !== 0) dot(ctx, X(lK), Y(0), cK, false, 10);
      if (!at && lK !== 0) { text(ctx, `Q = K = ${kU}`, X(lK) - 20, Y(0) + 30, cK, { size: 22, align: 'right', bg: PAL.panel }); lab.block(X(lK) - 250, Y(0) + 14, X(lK), Y(0) + 46); }
      else if (!at) lab.add('Q = K = 1', X(lK), Y(0), -0.5, 0.85, cK, 22, 30);
      hits.push({ x: X(lK), y: Y(0), r: 16, name: `Q = K = ${kU}, where E_cell = 0` });
    }

    /* the mixture the sliders make */
    const px = X(x), py = Y(f(x));
    line(ctx, px, py, px, G.b, alpha(cK, 0.7), 2, [4, 8]);
    line(ctx, G.l, py, px, py, alpha(cE, 0.7), 2, [4, 8]);
    dot(ctx, px, py, cE, true, 11);
    lab.add(at ? 'Q = K, E_{cell} = 0' : `E_{cell} = ${signed(Ec, 3)} V`, px, py, 0.5, -0.85, cE, 26, 30);
    hits.push({ x: px, y: py, r: 18, name: `this mixture: Q = ${q.u}, E_cell = ${signed(Ec, 3)} V` });
    lab.flush();

    const nv = hue('amount', c.n), cv = (s, p) => (p > 1 ? `(${hue('concentration', s + '\\ M')})^{${p}}` : hue('concentration', s + '\\ M'));
    const pw = (s, p) => (p > 1 ? `${s}^{${p}}` : s);
    let tex;
    if (at) {
      tex = `\\mk{E}{\\kEcell} = 0 \\\\ \\mk{Q}{\\kQrxn} = \\mk{K}{\\kK} = 10^{\\mk{n}{\\kn}\\mk{Eo}{\\kEocell}/0.0592\\ \\text{V}} = 10^{\\mk{x}{${fx0(lK, 2)}}} = \\mk{k}{${hue('equilibrium-constant', lK === 0 ? '1' : sci(lK))}}`;
    } else {
      tex = `\\mk{Q}{\\kQrxn} = \\frac{${pw(c.anT, c.pa)}}{${pw(c.catT, c.pc)}} = \\frac{\\mk{a}{${cv(concT(A), c.pa)}}}{\\mk{b}{${cv(concT(B), c.pc)}}} = \\mk{q}{${hue('equilibrium-constant', q.t)}}`
        + ` \\\\ \\mk{E}{\\kEcell} = \\mk{Eo}{\\kEocell} - \\frac{0.0592\\ \\text{V}}{\\mk{n}{\\kn}}\\log\\mk{Q2}{\\kQrxn} = \\mk{eo}{${hue('potential', c.E0s)}\\ \\text{V}} - \\frac{0.0592\\ \\text{V}}{\\mk{nv}{${nv}}}\\log\\mk{q2}{${hue('equilibrium-constant', q.t)}} = \\mk{e}{${hue('potential', signedT(Ec, 3))}}\\ \\text{V}`;
    }
    ro.set(tex, `Each tenfold rise in $\\kQrxn$ lowers $\\kEcell$ by ${slope.toFixed(4)} V.`, { form: at });
  }
  still(d, draw);
})();

/* =====================================================================
   SIM: the zinc concentration cell of Example 17.8 running down, flat,
   drawn as the galvanic cells of 17.2 are, with its graphs beneath.
   Anode [Zn²⁺] = 0.10 + ξ, cathode [Zn²⁺] = 0.50 − ξ, E_cell =
   −(0.0592 V/2) log([Zn²⁺]anode/[Zn²⁺]cathode). The extent follows
   dξ/dt = kE_cell, k set so ξ reaches 0.199 M at T = 6 s, both solutions
   then 0.30 M. Each beaker shows one Zn²⁺ for every 0.02 M (5 and 25 at
   the start, 15 and 15 at the end); ten events of 0.02 M each way, one
   Zn²⁺ out of the anode and one into the cathode, two electrons per
   event; the electrons travel in step with ξ, so they slow as E_cell
   falls. Graph axes fixed: [Zn²⁺] 0 to 0.6 M, E_cell 0 to 0.025 V, time
   0 to T with no numbers.
===================================================================== */
(function () {
  const H = 1090, d = sim('sim-concentration-cell', H);
  const T = 6, LIFE = 1.2, NEV = 10, DXI = 0.02, XI_END = 0.199;
  const rnd = (k, j) => { const s = Math.sin(k * 127.1 + j * 311.7) * 43758.5453; return s - Math.floor(s); };
  const Ecell = (xi) => -(NERNST / 2) * Math.log10((0.10 + xi) / (0.50 - xi));
  /* ξ(t) on a grid, from dξ/dt = kE_cell with k found by bisection */
  const NS = 600, dt = T / NS;
  const run = (k) => { const a = [0]; for (let i = 0; i < NS; i++) a.push(a[i] + k * Ecell(a[i]) * dt); return a; };
  let lo = 0, hi = 50;
  for (let i = 0; i < 50; i++) { const m = (lo + hi) / 2; if (run(m)[NS] < XI_END) lo = m; else hi = m; }
  const XI = run((lo + hi) / 2);
  const xiAt = (t) => { const u = Math.max(0, Math.min(NS, t / dt)), i = Math.min(NS - 1, Math.floor(u)); return XI[i] + (XI[i + 1] - XI[i]) * (u - i); };
  const tAt = (xi) => { let i = 0; while (i < NS && XI[i + 1] < xi) i++; return (i + (xi - XI[i]) / (XI[i + 1] - XI[i])) * dt; };
  const EV = Array.from({ length: NEV }, (_, k) => tAt(DXI * (k + 0.5)));
  const cy = cycle(() => T, 1.2);
  const ro = F.readout(d);
  let hits = []; F.hover(d.stage, () => hits);

  /* the cell, in the layout of 17.2 */
  const LX = 330, RX = 1070, HW = 175, RIM = 300, FLOOR = 640, LEVEL = 410;
  const WY = 100, BOX = { x: 700, y: 100, w: 280, h: 96 }, BL = 445, BR = 955, BT = 222, BW = 60, PLUG = 500;
  const XA = 240, XC = 1160, TOP = 250, BOT = 590;
  function rounded(pts, r) {
    const out = [pts[0]];
    for (let i = 1; i < pts.length - 1; i++) {
      const p = pts[i], a = pts[i - 1], b = pts[i + 1];
      const la = Math.hypot(a[0] - p[0], a[1] - p[1]), lb = Math.hypot(b[0] - p[0], b[1] - p[1]);
      const A = [p[0] + (a[0] - p[0]) * r / la, p[1] + (a[1] - p[1]) * r / la], B = [p[0] + (b[0] - p[0]) * r / lb, p[1] + (b[1] - p[1]) * r / lb];
      for (let s = 0; s <= 10; s++) { const t = s / 10; out.push([(1 - t) ** 2 * A[0] + 2 * (1 - t) * t * p[0] + t * t * B[0], (1 - t) ** 2 * A[1] + 2 * (1 - t) * t * p[1] + t * t * B[1]]); }
    }
    out.push(pts[pts.length - 1]); return out;
  }
  function walker(pts) {
    const seg = pts.slice(1).map((p, i) => Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1])), L = seg.reduce((a, b) => a + b, 0);
    const at = (s) => { s = Math.max(0, Math.min(L, s)); let i = 0; while (i < seg.length - 1 && s > seg[i]) { s -= seg[i]; i++; } const t = seg[i] ? s / seg[i] : 0; return [pts[i][0] + (pts[i + 1][0] - pts[i][0]) * t, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * t]; };
    return { L, at, pts };
  }
  const stroke = (ctx, pts, color, w, cap = 'round') => {
    ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = w; ctx.lineCap = cap; ctx.lineJoin = 'round';
    ctx.beginPath(); pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.stroke(); ctx.restore();
  };
  const wire = walker(rounded([[XA, TOP], [XA, WY], [XC, WY], [XC, TOP]], 46));
  const bridgeLine = rounded([[BL, PLUG], [BL, BT], [BR, BT], [BR, PLUG]], 64);
  function beaker(ctx, cx) {
    const l = cx - HW, r = cx + HW, rc = 22;
    const body = (y0) => { ctx.beginPath(); ctx.moveTo(l, y0); ctx.lineTo(l, FLOOR - rc); ctx.quadraticCurveTo(l, FLOOR, l + rc, FLOOR); ctx.lineTo(r - rc, FLOOR); ctx.quadraticCurveTo(r, FLOOR, r, FLOOR - rc); ctx.lineTo(r, y0); };
    ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.03); body(RIM); ctx.fill(); ctx.fillStyle = alpha(PAL.muted, 0.13); body(LEVEL); ctx.fill(); ctx.restore();
  }
  function glass(ctx, cx) {
    const l = cx - HW, r = cx + HW, rc = 22;
    ctx.save(); ctx.strokeStyle = alpha(PAL.ink, 0.6); ctx.lineWidth = 4; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.moveTo(l - 16, RIM - 10); ctx.quadraticCurveTo(l, RIM - 6, l, RIM + 14); ctx.lineTo(l, FLOOR - rc); ctx.quadraticCurveTo(l, FLOOR, l + rc, FLOOR);
    ctx.lineTo(r - rc, FLOOR); ctx.quadraticCurveTo(r, FLOOR, r, FLOOR - rc); ctx.lineTo(r, RIM); ctx.stroke(); ctx.restore();
    line(ctx, l + 2, LEVEL, r - 2, LEVEL, alpha(PAL.ink, 0.35), 2);
  }
  /* the dissolved Zn²⁺: fixed places in each beaker, kept clear of the electrode and the bridge's leg */
  function slots(cx, side, seed) {
    const out = [];
    for (let k = 0; out.length < 30 && k < 400; k++) {
      const x = cx - HW + 26 + rnd(seed, k) * (2 * HW - 52), y = LEVEL + 24 + rnd(seed + 1, k) * (FLOOR - LEVEL - 48);
      if (Math.abs(x - (side < 0 ? XA : XC)) < 46 || (y < PLUG + 26 && Math.abs(x - (side < 0 ? BL : BR)) < 42)) continue;
      if (out.some(([a, b]) => Math.hypot(a - x, b - y) < 30)) continue;
      out.push([x, y]);
    }
    return out;
  }
  const SA = slots(LX, -1, 3), SC = slots(RX, 1, 9), ZR = 10;
  const zn = (ctx, x, y, o, name) => { ctx.save(); ctx.globalAlpha = o; dot(ctx, x, y, F.el('Zn'), true, ZR); ctx.restore(); if (o > 0.4) hits.push({ x, y, r: 13, name }); };

  let lastTex = '';
  function draw() {
    const { ctx } = begin(d.c);
    hits = [];
    const t = cy.now(), xi = xiAt(t), run = xi / 0.2;
    const rA = F.ref('anode-half-cell'), rC = F.ref('cathode-half-cell');
    beaker(ctx, LX); beaker(ctx, RX);
    hits.push({ x: LX, y: 620, r: 30, name: 'the anode half-cell, the dilute solution at the start' }, { x: RX, y: 620, r: 30, name: 'the cathode half-cell, the concentrated solution at the start' });
    /* the zinc electrodes: the anode thins as it dissolves, the cathode thickens as zinc plates onto it */
    const wa = 44 - 14 * run, wc = 44 + 14 * run;
    ctx.save(); ctx.fillStyle = F.el('Zn'); ctx.strokeStyle = alpha(PAL.ink, 0.6); ctx.lineWidth = 1.5;
    ctx.fillRect(XA - wa / 2, TOP, wa, BOT - TOP); ctx.strokeRect(XA - wa / 2, TOP, wa, BOT - TOP);
    ctx.fillRect(XC - wc / 2, TOP, wc, BOT - TOP); ctx.strokeRect(XC - wc / 2, TOP, wc, BOT - TOP); ctx.restore();
    hits.push({ x: XA, y: 480, r: 24, name: 'the zinc anode, which dissolves' }, { x: XC, y: 480, r: 30, name: 'the zinc cathode, onto which zinc plates' });
    stroke(ctx, bridgeLine, alpha(PAL.ink, 0.55), BW + 4, 'butt'); stroke(ctx, bridgeLine, PAL.panel, BW - 4, 'butt'); stroke(ctx, bridgeLine, alpha(PAL.muted, 0.14), BW - 4, 'butt');
    for (const bx of [BL, BR]) { ctx.save(); ctx.fillStyle = PAL.muted; ctx.fillRect(bx - BW / 2 + 2, PLUG - 16, BW - 4, 16); ctx.restore(); }
    hits.push({ x: 700, y: BT, r: 36, name: 'the salt bridge' });
    for (const cx of [LX, RX]) { ctx.save(); ctx.fillStyle = alpha(PAL.muted, 0.13); ctx.globalAlpha = 0.5; ctx.fillRect(cx - HW + 2, LEVEL, 2 * HW - 4, FLOOR - LEVEL - 2); ctx.restore(); glass(ctx, cx); }

    /* the dissolved ions: one per 0.02 M; event k adds one to the anode as its ion settles and takes one from the cathode as it sets off */
    let nA = 5, nC = 25;
    EV.forEach((tk, k) => {
      const fo = (t - tk) / LIFE, fi = 1 + (t - tk) / LIFE;
      if (fo >= 1) nA += 1;
      if (t >= tk - LIFE) nC -= 1;
      if (fo >= 0 && fo < 1) {
        const p = [XA + wa / 2 + 10, LEVEL + 40 + rnd(k, 5) * (BOT - LEVEL - 70)], q = SA[5 + k];
        zn(ctx, p[0] + (q[0] - p[0]) * fo, p[1] + (q[1] - p[1]) * fo, 1, 'a zinc ion, Zn²⁺, entering the anode solution');
      }
      if (fi >= 0 && fi < 1) {
        const q = SC[24 - k], p = [XC - wc / 2 - 10, LEVEL + 40 + rnd(k, 6) * (BOT - LEVEL - 70)];
        zn(ctx, q[0] + (p[0] - q[0]) * fi, q[1] + (p[1] - q[1]) * fi, 1 - Math.max(0, (fi - 0.85) / 0.15), 'a zinc ion, Zn²⁺, about to plate onto the cathode as zinc');
      }
    });
    for (let i = 0; i < nA; i++) zn(ctx, SA[i][0], SA[i][1], 1, 'a zinc ion, Zn²⁺, in the anode solution');
    for (let i = 0; i < nC; i++) zn(ctx, SC[i][0], SC[i][1], 1, 'a zinc ion, Zn²⁺, in the cathode solution');

    /* the wire and the external circuit; the electrons travel two per 0.02 M, so they slow as the cell runs down */
    stroke(ctx, wire.pts, PAL.ink, 5);
    const NE = 22, sp = wire.L / NE;
    for (let i = 0; i < NE; i++) {
      const s = (i * sp + 2 * sp * xi / DXI) % wire.L, [ex, ey] = wire.at(s);
      if (Math.abs(ex - BOX.x) < BOX.w / 2 + 6 && Math.abs(ey - BOX.y) < BOX.h) continue;
      dot(ctx, ex, ey, F.el('e-'), true, 8); hits.push({ x: ex, y: ey, r: 12, name: 'an electron, e⁻, in the wire' });
    }
    ctx.save(); ctx.fillStyle = PAL.soft; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.roundRect(BOX.x - BOX.w / 2, BOX.y - BOX.h / 2, BOX.w, BOX.h, 12); ctx.fill(); ctx.stroke(); ctx.restore();
    text(ctx, 'external circuit', BOX.x, BOX.y - 22, PAL.ink, { size: 20, align: 'center' });
    hits.push({ x: BOX.x, y: BOX.y, r: 46, name: 'the external circuit, with the potential the cell drives it at' });
    text(ctx, 'flow of electrons', 690, 30, PAL.ink, { size: 22, align: 'right' }); arrow(ctx, 706, 30, 776, 30, PAL.ink, 3);
    text(ctx, 'Zn anode', XA - 34, 268, PAL.ink, { size: 22, align: 'right' });
    text(ctx, 'Zn cathode', XC + 38, 268, PAL.ink, { size: 22, align: 'left' });
    text(ctx, 'Salt bridge', 700, 330, PAL.ink, { size: 22, align: 'center' }); line(ctx, 700, 314, 700, BT + BW / 2 + 2, alpha(PAL.ink, 0.55), 1.5);

    /* the readout, written from the rounded concentrations so that it is true as shown */
    const ca = (0.10 + xi).toFixed(2), cc = (0.50 - xi).toFixed(2);
    const E = -(NERNST / 2) * Math.log10(+ca / +cc), Es = signedT(E, 3);
    const tx = `\\mk{E}{\\kEcell} = \\mk{Eo}{\\kEocell} - \\frac{0.0592\\ \\text{V}}{\\mk{n}{\\kn}}\\log\\mk{Q}{\\kQrxn} = \\mk{eo}{${hue('potential', '0.000')}\\ \\text{V}} - \\frac{0.0592\\ \\text{V}}{\\mk{nv}{${hue('amount', 2)}}}\\log\\frac{\\mk{ca}{${hue('concentration', ca + '\\ M')}}}{\\mk{cc}{${hue('concentration', cc + '\\ M')}}} = \\mk{e}{${hue('potential', Es)}}\\ \\text{V}`;
    if (tx !== lastTex) { lastTex = tx; ro.set(tx, undefined, { values: false }); }
    F.rich(ctx, ['E_{cell} = ', [`${signed(E, 3)} V`, C('potential')]], BOX.x, BOX.y + 16, { size: 26, align: 'center' });
    F.rich(ctx, ['anode solution, ', [`${ca} M`, rA], ' Zn²⁺'], LX, 678, { size: 24, align: 'center' });
    F.rich(ctx, ['cathode solution, ', [`${cc} M`, rC], ' Zn²⁺'], RX, 678, { size: 24, align: 'center' });

    /* the key, then the two graphs drawn to the present moment */
    const cT = C('time'), cC = C('concentration'), cE = C('potential');
    F.legend(ctx, { l: 0, r: 1400, t: 716, b: 780 }, [{ s: 'electron, e⁻', kind: 'dot', color: F.el('e-') }, { s: 'Zn²⁺', kind: 'dot', color: F.el('Zn') },
      { s: 'anode half-cell', color: rA, w: 5 }, { s: 'cathode half-cell', color: rC, w: 5 }], { corner: 'top', row: true, size: 20 });
    const L = { l: 110, r: 650, t: 840, b: 1030 }, R = { l: 830, r: 1370, t: 840, b: 1030 };
    const a1 = F.axes(ctx, L, [0, T], [0, 0.6], { nx: 0, ny: 3, xl: 'time', xc: cT, yl: '[Zn²⁺] (M)', yc: cC, fy: (y) => y.toFixed(1) });
    line(ctx, L.l, a1.Y(0.3), L.r, a1.Y(0.3), alpha(PAL.ink, 0.4), 2, [10, 10]);
    text(ctx, '0.30 M', L.l + 14, a1.Y(0.3) - 16, PAL.muted, { size: 17, align: 'left' });
    if (t > 0) { F.curve(ctx, (s) => 0.10 + xiAt(s), 0, t, a1.X, a1.Y, rA, 5, 120); F.curve(ctx, (s) => 0.50 - xiAt(s), 0, t, a1.X, a1.Y, rC, 5, 120); }
    dot(ctx, a1.X(0), a1.Y(0.10), rA, false, 9); dot(ctx, a1.X(0), a1.Y(0.50), rC, false, 9);
    dot(ctx, a1.X(t), a1.Y(0.10 + xi), rA, true, 9); dot(ctx, a1.X(t), a1.Y(0.50 - xi), rC, true, 9);
    const a2 = F.axes(ctx, R, [0, T], [0, 0.025], { nx: 0, ny: 5, xl: 'time', xc: cT, yl: 'E_{cell} (V)', yc: cE, fy: (y) => y.toFixed(3) });
    if (t > 0) F.curve(ctx, (s) => Ecell(xiAt(s)), 0, t, a2.X, a2.Y, cE, 5, 120);
    dot(ctx, a2.X(0), a2.Y(Ecell(0)), cE, false, 9); dot(ctx, a2.X(t), a2.Y(Ecell(xi)), cE, true, 9);
  }
  register(d.fig, { update: (dt2) => cy.step(dt2, () => 1), draw });
})();
};
