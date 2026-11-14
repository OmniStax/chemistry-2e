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
const FARADAY = 96485, NERNST = 0.0592;
const N_OPTS = ['1', '2', '3', '4', '6'].map((v) => ({ value: v, label: v }));

/* =====================================================================
   FIGURE 17.7: the triangle of K, ΔG° and E°cell at 298 K, each vertex
   carrying its live value, beside K on a logarithmic axis against E°cell.
   ΔG° = −nFE°cell and log K = nE°cell/0.0592 V. Defaults are Example 17.6:
   E°cell = +1.247 V, n = 2, so ΔG° = −240.6 kJ/mol and K = 1.3 × 10⁴².
   Axes fixed: E°cell −1.5 to +1.5 V, log K −60 to +60; n = 6 reaches
   ±152, so the point is pinned past the frame. Still: a relation.
===================================================================== */
(function () {
  const H = 620, d = sim('sim-relations', H);
  const G = { l: 880, r: 1340, t: 140, b: 500 };
  const V = { K: [400, 175], G: [120, 500], E: [680, 500] };
  const e0 = F.ctl(d.controls, {
    label: '\\kEocell', cls: 'potential', min: -1.5, max: 1.5, step: 0.001, value: 1.247, unit: 'V', dec: 3,
    aria: 'standard cell potential, in volts', specials: [{ at: 0, label: 'K = 1' }],
  });
  const nPick = F.choice(d.controls, { label: '\\kn', options: N_OPTS, value: '2', aria: 'moles of electrons transferred' });
  const ro = F.readout(d);
  let hits = [];
  F.hover(d.stage, () => hits);

  function edge(ctx, a, b) {
    const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, m = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    arrow(ctx, m[0], m[1], b[0] - ux * 30, b[1] - uy * 30, PAL.ink, 3);
    arrow(ctx, m[0], m[1], a[0] + ux * 30, a[1] + uy * 30, PAL.ink, 3);
  }

  function draw() {
    const { ctx } = begin(d.c);
    const E = +e0.v.toFixed(3), n = +nPick.value, zero = E === 0;
    const g = -n * FARADAY * E / 1000, lk = n * E / NERNST;
    const cE = C('potential'), cG = C('energy'), cK = C('equilibrium-constant');
    hits = [];
    const head = zero
      ? 'With $\\kEocell = 0$, $\\kdGo = 0$ and $\\kK = 1$: the reaction is at equilibrium under standard conditions.'
      : E > 0
        ? 'With $\\kEocell > 0$, $\\kdGo < 0$ and $\\kK > 1$: the reaction is spontaneous under standard conditions, and products are more abundant at equilibrium.'
        : 'With $\\kEocell < 0$, $\\kdGo > 0$ and $\\kK < 1$: the reaction is nonspontaneous under standard conditions, and reactants are more abundant at equilibrium.';
    topline(ctx, head);

    /* the triangle: three double-headed arrows of notation, each with its relation */
    edge(ctx, V.G, V.K); edge(ctx, V.K, V.E); edge(ctx, V.G, V.E);
    text(ctx, '$\\kdGo = -R\\kT\\ln\\kK$', 240, 330, PAL.ink, { size: 22, align: 'right', tex: true });
    text(ctx, '$\\kEocell = \\frac{R\\kT}{\\kn\\kFaraday}\\ln\\kK$', 560, 330, PAL.ink, { size: 22, align: 'left', tex: true });
    text(ctx, '$\\kdGo = -\\kn\\kFaraday\\kEocell$', 400, 466, PAL.ink, { size: 22, align: 'center', tex: true });
    dot(ctx, V.K[0], V.K[1], cK, true, 11);
    dot(ctx, V.G[0], V.G[1], cG, true, 11);
    dot(ctx, V.E[0], V.E[1], cE, true, 11);
    const kTex = zero ? '1' : sci(lk);
    text(ctx, `$\\kK = ${kTex}$`, V.K[0], V.K[1] - 40, PAL.ink, { size: 26, align: 'center', tex: true });
    text(ctx, `$\\kdGo = ${g.toFixed(1)}$ kJ/mol`, V.G[0] - 60, V.G[1] + 46, PAL.ink, { size: 26, align: 'left', tex: true });
    text(ctx, `$\\kEocell = ${signedT(E, 3)}$ V`, V.E[0] + 60, V.E[1] + 46, PAL.ink, { size: 26, align: 'right', tex: true });
    hits.push({ x: V.K[0], y: V.K[1], r: 18, name: `K, the equilibrium constant: ${kTex.replace('\\times', '×')}` });
    hits.push({ x: V.G[0], y: V.G[1], r: 18, name: `ΔG°, the standard free energy change: ${minus(g.toFixed(1))} kJ/mol` });
    hits.push({ x: V.E[0], y: V.E[1], r: 18, name: `E°cell, the standard cell potential: ${signed(E, 3)} V` });

    /* K against E°cell on a logarithmic axis */
    const { X, Y } = F.axes(ctx, G, [-1.5, 1.5], [-60, 60], {
      nx: 6, ny: 4, xl: 'E°_{cell} (V)', xc: cE, yl: 'K', yc: cK,
      fx: (v) => (v > 0 ? '+' : '') + minus(v.toFixed(1)), fy: (v) => pow10(Math.round(v)),
    });
    text(ctx, 'spontaneous', X(0.75), Y(-48), PAL.muted, { size: 17, align: 'center', bg: PAL.panel });
    text(ctx, 'nonspontaneous', X(-0.75), Y(48), PAL.muted, { size: 17, align: 'center', bg: PAL.panel });
    ctx.save(); ctx.beginPath(); ctx.rect(G.l, G.t, G.r - G.l, G.b - G.t); ctx.clip();
    nPick.curve(ctx, (v) => (x) => +v * x / NERNST, -1.5, 1.5, X, Y, cK, 5, 2);
    ctx.restore();
    const p = F.pinned(ctx, G, X, Y, E, lk, cK, pow10(Math.round(lk)));
    if (!p.out) line(ctx, p.x, p.y + 11, p.x, G.b, alpha(cE, 0.7), 2, [4, 8]);
    hits.push({ x: p.x, y: p.y, r: 16, name: `K = ${kTex.replace('\\times', '×')} at E°cell = ${signed(E, 3)} V, n = ${n}` });

    const nv = hue('amount', n), Fv = hue('charge', '96{,}485') + '\\ \\text{C/mol}';
    const Ev = hue('potential', E < 0 ? `(${E.toFixed(3)}` : E.toFixed(3)) + '\\ \\text{J/C}' + (E < 0 ? ')' : '');
    const tex = zero
      ? `\\mk{G}{\\kdGo} = 0 \\\\ \\mk{K}{\\kK} = 1`
      : `\\mk{G}{\\kdGo} = -\\mk{n}{\\kn}\\mk{F}{\\kFaraday}\\mk{E}{\\kEocell} = -\\mk{nv}{${nv}} \\times \\mk{Fv}{${Fv}} \\times \\mk{Ev}{${Ev}} = \\mk{g}{${hue('energy', g.toFixed(1))}}\\ \\text{kJ/mol}`;
    const note = zero ? '' : `$\\kK = 10^{\\kn\\kEocell/0.0592\\ \\text{V}} = 10^{${lk.toFixed(2)}}$`;
    ro.set(tex, note, { form: zero });
  }
  still(d, draw);
})();

/* =====================================================================
   SIM: the Nernst equation at 298 K as a line, E_cell = E°cell −
   (0.0592 V/n) log Q, against log Q. Defaults are Example 17.7:
   E°cell = −0.17 V, n = 2, Q = 0.077, E_cell = −0.137 V; the line crosses
   zero at log Q = log K = nE°cell/0.0592 V. Axes fixed: log Q −8 to +8,
   E_cell −1.5 to +1.5 V, which holds every line the controls reach
   (|E°cell| ≤ 1 V, slope at most 0.0592 V per decade). Still: a relation.
===================================================================== */
(function () {
  const H = 560, d = sim('sim-nernst', H);
  const G = { l: 170, r: 1300, t: 140, b: 470 };
  let lq = null, eo = null, nPick = null;
  const ready = () => lq && eo && nPick;
  lq = F.ctl(d.controls, {
    label: '\\log \\kQrxn', cls: 'equilibrium-constant', key: 'logQ', min: -8, max: 8, step: 0.001, value: -1.114, unit: '', dec: 3,
    aria: 'the logarithm of the reaction quotient',
    specials: [{ at: () => (ready() ? +nPick.value * eo.v / NERNST : null), label: 'Q = K' }],
  });
  eo = F.ctl(d.controls, {
    label: '\\kEocell', cls: 'potential', min: -1, max: 1, step: 0.01, value: -0.17, unit: 'V', dec: 2,
    aria: 'standard cell potential, in volts',
    specials: [{ at: () => (ready() ? NERNST * lq.v / +nPick.value : null), label: 'E = 0' }],
  });
  nPick = F.choice(d.controls, { label: '\\kn', options: ['1', '2', '3', '4', '5', '6'].map((v) => ({ value: v, label: v })), value: '2', aria: 'moles of electrons transferred' });
  [lq, eo].forEach((c) => c.refresh());
  const ro = F.readout(d);
  let hits = [];
  F.hover(d.stage, () => hits);

  function draw() {
    const { ctx } = begin(d.c);
    const n = +nPick.value, E0 = eo.v, E0r = +E0.toFixed(2), x = lq.v, slope = NERNST / n;
    const xk = n * E0 / NERNST, at = Math.abs(x - xk) < 1e-9;
    const qs = sci(x), qn = +qs.replace(' \\times 10^{', 'e').replace('}', '');
    const Ec = at ? 0 : E0r - slope * Math.log10(qn);
    const cE = C('potential'), cK = C('equilibrium-constant');
    hits = [];
    const head = at
      ? '$\\kQrxn = \\kK$: $\\kEcell = 0$, and the system is at equilibrium.'
      : `With $\\kQrxn = ${qs}$, $\\kEcell = ${signedT(Ec, 3)}$ V: the reaction is ${Ec > 0 ? 'spontaneous' : 'nonspontaneous'} in this mixture.`;
    const lab = F.labeller(ctx, H, { headline: topline(ctx, head) });
    const { X, Y } = F.axes(ctx, G, [-8, 8], [-1.5, 1.5], {
      nx: 8, ny: 6, xl: 'Q', xc: cK, yl: 'E_{cell} (V)', yc: cE,
      fx: (v) => pow10(Math.round(v)), fy: (v) => (v > 0 ? '+' : '') + minus(v.toFixed(1)),
    });
    text(ctx, 'spontaneous', G.r - 14, Y(1.38), PAL.muted, { size: 17, align: 'right' });
    text(ctx, 'nonspontaneous', G.r - 14, Y(-1.38), PAL.muted, { size: 17, align: 'right' });
    lab.block(G.r - 130, Y(1.38) - 14, G.r, Y(1.38) + 14);
    lab.block(G.r - 150, Y(-1.38) - 14, G.r, Y(-1.38) + 14);
    nPick.curve(ctx, (v) => (s) => E0 - NERNST / +v * s, -8, 8, X, Y, cE, 5, 2);

    /* E°cell where Q = 1, and Q = K where the line meets zero */
    dot(ctx, X(0), Y(E0), cE, false, 10);
    const side = x < 0 ? -1 : 1;
    lab.add('E°_{cell}', X(0), Y(E0), -0.5 * side, -0.85, cE, 22, 26);
    hits.push({ x: X(0), y: Y(E0), r: 16, name: `E°cell = ${signed(E0, 2)} V, where Q = 1` });
    if (xk >= -8 && xk <= 8) {
      dot(ctx, X(xk), Y(0), cK, false, 10);
      if (!at) lab.add('Q = K', X(xk), Y(0), 0.4, E0 >= 0 ? 0.9 : -0.9, cK, 22, 28);
      hits.push({ x: X(xk), y: Y(0), r: 16, name: `Q = K = ${sci(xk).replace('\\times', '×')}, where E_cell = 0` });
    }

    /* the reader's mixture */
    const py = Y(E0 - slope * x);
    line(ctx, X(x), py + 11, X(x), G.b, alpha(cK, 0.7), 2, [4, 8]);
    dot(ctx, X(x), py, cE, true, 9);
    lab.add(at ? 'Q = K' : `${signed(Ec, 3)} V`, X(x), py, 0.5 * side, 0.85, at ? cK : cE, 22, 30);
    hits.push({ x: X(x), y: py, r: 16, name: `the mixture: Q = ${qs.replace('\\times', '×')}, E_cell = ${signed(Ec, 3)} V` });
    lab.flush();

    const nv = hue('amount', n);
    let tex;
    if (at) {
      tex = `\\mk{E}{\\kEcell} = 0 \\\\ \\mk{Q}{\\kQrxn} = \\mk{K}{\\kK} = 10^{\\mk{n}{\\kn}\\mk{Eo}{\\kEocell}/0.0592\\ \\text{V}} = 10^{\\mk{x}{${xk.toFixed(2)}}} = \\mk{k}{${hue('equilibrium-constant', sci(xk))}}`;
    } else {
      const E0v = hue('potential', E0r.toFixed(2)) + '\\ \\text{V}';
      tex = `\\mk{E}{\\kEcell} = \\mk{Eo}{\\kEocell} - \\frac{0.0592\\ \\text{V}}{\\mk{n}{\\kn}}\\log\\mk{Q}{\\kQrxn} = \\mk{eo}{${E0v}} - \\frac{0.0592\\ \\text{V}}{\\mk{nv}{${nv}}}\\log\\mk{q}{${hue('equilibrium-constant', qs)}} = \\mk{e}{${hue('potential', signedT(Ec, 3))}}\\ \\text{V}`;
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
  const H = 1010, d = sim('sim-concentration-cell', H);
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
  const WY = 100, BOX = { x: 700, y: 100, w: 240, h: 72 }, BL = 445, BR = 955, BT = 222, BW = 60, PLUG = 500;
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
    text(ctx, 'external circuit', BOX.x, BOX.y, PAL.ink, { size: 22, align: 'center' });
    hits.push({ x: BOX.x, y: BOX.y, r: 40, name: 'the external circuit' });
    text(ctx, 'flow of electrons', 690, 30, PAL.ink, { size: 22, align: 'right' }); arrow(ctx, 706, 30, 776, 30, PAL.ink, 3);
    text(ctx, 'Zn anode', XA - 34, 268, PAL.ink, { size: 22, align: 'right' });
    text(ctx, 'Zn cathode', XC + 38, 268, PAL.ink, { size: 22, align: 'left' });
    text(ctx, 'Salt bridge', 700, 330, PAL.ink, { size: 22, align: 'center' }); line(ctx, 700, 314, 700, BT + BW / 2 + 2, alpha(PAL.ink, 0.55), 1.5);
    F.rich(ctx, [['dilute', rA], ' Zn²⁺(aq)'], LX, 676, { size: 22, align: 'center' });
    F.rich(ctx, [['concentrated', rC], ' Zn²⁺(aq)'], RX, 676, { size: 22, align: 'center' });

    /* the readout, written from the rounded concentrations so that it is true as shown */
    const ca = (0.10 + xi).toFixed(2), cc = (0.50 - xi).toFixed(2);
    const E = -(NERNST / 2) * Math.log10(+ca / +cc), Es = signedT(E, 3);
    const tx = `\\mk{E}{\\kEcell} = \\mk{Eo}{\\kEocell} - \\frac{0.0592\\ \\text{V}}{\\mk{n}{\\kn}}\\log\\mk{Q}{\\kQrxn} = \\mk{eo}{${hue('potential', '0.000')}\\ \\text{V}} - \\frac{0.0592\\ \\text{V}}{\\mk{nv}{${hue('amount', 2)}}}\\log\\frac{\\mk{ca}{${hue('concentration', ca + '\\ M')}}}{\\mk{cc}{${hue('concentration', cc + '\\ M')}}} = \\mk{e}{${hue('potential', Es)}}\\ \\text{V}`;
    if (tx !== lastTex) { lastTex = tx; ro.set(tx, undefined, { values: false }); }

    /* the key, then the two graphs drawn to the present moment */
    const cT = C('time'), cC = C('concentration'), cE = C('potential');
    F.legend(ctx, { l: 0, r: 1400, t: 696, b: 760 }, [{ s: 'electron, e⁻', kind: 'dot', color: F.el('e-') }, { s: 'Zn²⁺', kind: 'dot', color: F.el('Zn') },
      { s: 'anode half-cell', color: rA, w: 5 }, { s: 'cathode half-cell', color: rC, w: 5 }], { corner: 'top', row: true, size: 20 });
    const L = { l: 150, r: 640, t: 810, b: 950 }, R = { l: 850, r: 1340, t: 810, b: 950 };
    const a1 = F.axes(ctx, L, [0, T], [0, 0.6], { nx: 4, ny: 3, xl: 't', xc: cT, yl: '[Zn²⁺] (M)', yc: cC, fx: () => '', fy: (y) => y.toFixed(1) });
    line(ctx, L.l, a1.Y(0.3), L.r, a1.Y(0.3), alpha(PAL.ink, 0.4), 2, [10, 10]);
    if (t > 0) { F.curve(ctx, (s) => 0.10 + xiAt(s), 0, t, a1.X, a1.Y, rA, 5, 120); F.curve(ctx, (s) => 0.50 - xiAt(s), 0, t, a1.X, a1.Y, rC, 5, 120); }
    dot(ctx, a1.X(0), a1.Y(0.10), rA, false, 9); dot(ctx, a1.X(0), a1.Y(0.50), rC, false, 9);
    dot(ctx, a1.X(t), a1.Y(0.10 + xi), rA, true, 9); dot(ctx, a1.X(t), a1.Y(0.50 - xi), rC, true, 9);
    const a2 = F.axes(ctx, R, [0, T], [0, 0.025], { nx: 4, ny: 5, xl: 't', xc: cT, yl: 'E_{cell} (V)', yc: cE, fx: () => '', fy: (y) => y.toFixed(3) });
    if (t > 0) F.curve(ctx, (s) => Ecell(xiAt(s)), 0, t, a2.X, a2.Y, cE, 5, 120);
    dot(ctx, a2.X(0), a2.Y(Ecell(0)), cE, false, 9); dot(ctx, a2.X(t), a2.Y(Ecell(xi)), cE, true, 9);
  }
  register(d.fig, { update: (dt2) => cy.step(dt2, () => 1), draw });
})();
};
