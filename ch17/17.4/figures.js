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
  const H = 600, d = sim('sim-relations', H);
  const G = { l: 830, r: 1340, t: 140, b: 480 };
  const V = { K: [380, 205], G: [150, 470], E: [610, 470] };
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
    text(ctx, '$\\kdGo = -R\\kT\\ln\\kK$', 250, 330, PAL.ink, { size: 22, align: 'right', tex: true });
    text(ctx, '$\\kEocell = \\frac{R\\kT}{\\kn\\kFaraday}\\ln\\kK$', 512, 330, PAL.ink, { size: 22, align: 'left', tex: true });
    text(ctx, '$\\kdGo = -\\kn\\kFaraday\\kEocell$', 380, 436, PAL.ink, { size: 22, align: 'center', tex: true });
    dot(ctx, V.K[0], V.K[1], cK, true, 11);
    dot(ctx, V.G[0], V.G[1], cG, true, 11);
    dot(ctx, V.E[0], V.E[1], cE, true, 11);
    const kTex = zero ? '1' : sci(lk);
    text(ctx, `$\\kK = ${kTex}$`, V.K[0], V.K[1] - 40, PAL.ink, { size: 24, align: 'center', tex: true });
    text(ctx, `$\\kdGo = ${g.toFixed(1)}$ kJ/mol`, V.G[0] - 60, V.G[1] + 46, PAL.ink, { size: 24, align: 'left', tex: true });
    text(ctx, `$\\kEocell = ${signedT(E, 3)}$ V`, V.E[0] + 60, V.E[1] + 46, PAL.ink, { size: 24, align: 'right', tex: true });
    hits.push({ x: V.K[0], y: V.K[1], r: 18, name: `K, the equilibrium constant: ${kTex.replace('\\times', '×')}` });
    hits.push({ x: V.G[0], y: V.G[1], r: 18, name: `ΔG°, the standard free energy change: ${minus(g.toFixed(1))} kJ/mol` });
    hits.push({ x: V.E[0], y: V.E[1], r: 18, name: `E°cell, the standard cell potential: ${signed(E, 3)} V` });

    /* K against E°cell on a logarithmic axis */
    const { X, Y } = F.axes(ctx, G, [-1.5, 1.5], [-60, 60], {
      nx: 6, ny: 4, xl: 'E°_{cell} (V)', xc: cE, yl: 'K', yc: cK,
      fx: (v) => (v > 0 ? '+' : '') + minus(v.toFixed(1)), fy: (v) => pow10(Math.round(v)),
    });
    text(ctx, 'spontaneous', G.r - 12, Y(10), PAL.muted, { size: 17, align: 'right' });
    text(ctx, 'nonspontaneous', G.l + 12, Y(-10), PAL.muted, { size: 17, align: 'left' });
    ctx.save(); ctx.beginPath(); ctx.rect(G.l, G.t, G.r - G.l, G.b - G.t); ctx.clip();
    nPick.curve(ctx, (v) => (x) => +v * x / NERNST, -1.5, 1.5, X, Y, cK, 5, 2);
    ctx.restore();
    const p = F.pinned(ctx, G, X, Y, E, lk, cK, pow10(Math.round(lk)));
    if (!p.out) line(ctx, p.x, p.y + 11, p.x, G.b, alpha(cE, 0.7), 2, [4, 8]);
    hits.push({ x: p.x, y: p.y, r: 16, name: `K = ${kTex.replace('\\times', '×')} at E°cell = ${signed(E, 3)} V, n = ${n}` });

    const nv = hue('amount', n), Fv = hue('charge', '96{,}485') + '\\ \\text{C/mol}';
    const Ev = hue('potential', E < 0 ? `(${E.toFixed(3)}` : E.toFixed(3)) + '\\ \\text{J/C}' + (E < 0 ? ')' : '');
    const tex = zero
      ? `\\mk{G}{\\kdGo} = 0,\\quad \\mk{K}{\\kK} = 1`
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
      tex = `\\mk{E}{\\kEcell} = 0,\\quad \\mk{Q}{\\kQrxn} = \\mk{K}{\\kK} = 10^{\\mk{n}{\\kn}\\mk{Eo}{\\kEocell}/0.0592\\ \\text{V}} = 10^{\\mk{x}{${xk.toFixed(2)}}} = \\mk{k}{${hue('equilibrium-constant', sci(xk))}}`;
    } else {
      const E0v = hue('potential', E0r.toFixed(2)) + '\\ \\text{V}';
      tex = `\\mk{E}{\\kEcell} = \\mk{Eo}{\\kEocell} - \\frac{0.0592\\ \\text{V}}{\\mk{n}{\\kn}}\\log\\mk{Q}{\\kQrxn} = \\mk{eo}{${E0v}} - \\frac{0.0592\\ \\text{V}}{\\mk{nv}{${nv}}}\\log\\mk{q}{${hue('equilibrium-constant', qs)}} = \\mk{e}{${hue('potential', signedT(Ec, 3))}}\\ \\text{V}`;
    }
    ro.set(tex, `Each tenfold rise in $\\kQrxn$ lowers $\\kEcell$ by ${slope.toFixed(4)} V.`, { form: at });
  }
  still(d, draw);
})();

/* =====================================================================
   SIM: the zinc concentration cell of Example 17.8 running down, on a
   bench in three dimensions with its graphs beneath. Anode [Zn²⁺] =
   0.10 + ξ, cathode [Zn²⁺] = 0.50 − ξ, E_cell = −(0.0592 V/2)
   log([Zn²⁺]anode/[Zn²⁺]cathode). The extent follows dξ/dt = kE_cell, k
   set so ξ reaches 0.199 M at T = 6 s, both solutions then 0.30 M. Ten
   events of 0.02 M each way, one Zn²⁺ out of the anode and one into the
   cathode, and two electrons per event; the electrons travel in step with
   ξ, so they slow as E_cell falls. The bench is never seen from beneath:
   pitch between 2° and 70° above level. Graph axes fixed: [Zn²⁺] 0 to
   0.6 M, E_cell 0 to 0.025 V, time 0 to T with no numbers.
===================================================================== */
(function () {
  const T3D = window.THREE;
  const d = sim('sim-concentration-cell');
  const v = F.view3d(d.stage, { spin: 'off', pitch: [0.035, 1.22], views: [{ label: 'front', yaw: 0, pitch: 0.16 }, { label: 'above', yaw: 0, pitch: 1.1 }], h: 660, dist: 8.4, tilt: 0.16 });
  const grp = v.part(0), H2 = 300, cnv = F.makeCanvas(d.stage, H2);
  grp.position.y = -0.35;
  const T = 6, LIFE = 1.2, NEV = 10, DXI = 0.02, XI_END = 0.199;
  const XA = -1.7, XC = 1.7, RB = 0.8, YB = -1.3, YT = 0.35, YL = 0, XS = 1.15, YP = -0.5, YW = 1.45;
  const PLATE = { w: 0.32, d: 0.06, y0: -0.95, y1: 0.75 }, AX = XA - 0.25, CX = XC + 0.25;
  const rnd = (k, j) => { const s = Math.sin(k * 127.1 + j * 311.7) * 43758.5453; return s - Math.floor(s); };
  const TAU = 2 * Math.PI;
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

  function surface(at, k, j) {
    const a = rnd(k, j), b = rnd(k, j + 7), s = rnd(k, j + 13) < 0.5 ? -1 : 1;
    return [(at === 'anode' ? AX : CX) + (a - 0.5) * PLATE.w, PLATE.y0 + 0.1 + b * (YL - PLATE.y0 - 0.25), s * 0.05];
  }
  function away(p, k, j) {
    const xc = p[0] < 0 ? XA : XC, a = rnd(k, j + 21) * TAU, e = (rnd(k, j + 29) - 0.5) * 1.2;
    let q = [p[0] + 0.5 * Math.cos(a) * Math.cos(e), p[1] + 0.5 * Math.sin(e) - 0.12, p[2] + 0.5 * Math.sin(a) * Math.cos(e)];
    const dx = q[0] - xc, dz = q[2], r = Math.hypot(dx, dz), lim = RB - 0.18;
    if (r > lim) q = [xc + dx * lim / r, q[1], dz * lim / r];
    q[1] = Math.max(YB + 0.15, Math.min(YL - 0.12, q[1]));
    return q;
  }
  const tube = (pts, r, color, extra) => {
    const m = new T3D.Mesh(new T3D.TubeGeometry(new T3D.CatmullRomCurve3(pts.map((p) => new T3D.Vector3(p[0], p[1], p[2]))), Math.max(48, pts.length * 3), r, 12, false), F.mesh.mat(color, extra));
    grp.add(m); return m;
  };
  function rounded(pts, rc) {
    const out = [pts[0]];
    for (let i = 1; i < pts.length - 1; i++) {
      const p = pts[i], a = pts[i - 1], b = pts[i + 1];
      const ua = [a[0] - p[0], a[1] - p[1]].map((x, _, u) => x / Math.hypot(...u)), ub = [b[0] - p[0], b[1] - p[1]].map((x, _, u) => x / Math.hypot(...u));
      for (let s = 0; s <= 8; s++) {
        const t = s / 8, A = [p[0] + ua[0] * rc, p[1] + ua[1] * rc], B = [p[0] + ub[0] * rc, p[1] + ub[1] * rc];
        out.push([(1 - t) ** 2 * A[0] + 2 * (1 - t) * t * p[0] + t * t * B[0], (1 - t) ** 2 * A[1] + 2 * (1 - t) * t * p[1] + t * t * B[1], 0]);
      }
    }
    out.push(pts[pts.length - 1]); return out;
  }
  function along(pts, n) {
    const seg = pts.slice(1).map((p, i) => Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1], p[2] - pts[i][2])), L = seg.reduce((a, b) => a + b, 0);
    const at = (s) => { let i = 0; while (i < seg.length - 1 && s > seg[i]) { s -= seg[i]; i++; } const t = Math.min(1, s / seg[i]); return pts[i].map((c, k) => c + (pts[i + 1][k] - c) * t); };
    return { L, at };
  }

  /* Zn²⁺ drawn at 0.04 + 0.00033 × its ionic radius, 74 pm */
  const ZN_R = 0.064, NE = 16;
  let sig = '', parts = {}, outs = [], ins = [], electrons = [], wire = null;
  const palSig = () => [PAL.ink, PAL.soft, PAL.muted, PAL.panel, F.el('Zn'), F.el('e-')].join('|');
  function ion(name) {
    const m = v.pickable(F.mesh.sphere(grp, [0, -50, 0], ZN_R, F.el('Zn')), name);
    m.material.transparent = true; return m;
  }
  function build() {
    if (!v.scene || palSig() === sig) return; sig = palSig();
    v.clear(); parts = {};
    const glass = { transparent: true, opacity: 0.1, depthWrite: false, side: T3D.DoubleSide };
    v.pickable(F.mesh.box(grp, [0, YB - 0.06, 0], [6.4, 0.1, 2.2], PAL.soft), 'bench');
    for (const [x, who] of [[XA, 'anode'], [XC, 'cathode']]) {
      const b = new T3D.Mesh(new T3D.CylinderGeometry(RB, RB, YT - YB, 40, 1, true), F.mesh.mat(PAL.ink, glass)); b.position.set(x, (YT + YB) / 2, 0); grp.add(b);
      const floor = new T3D.Mesh(new T3D.CircleGeometry(RB, 40), F.mesh.mat(PAL.ink, glass)); floor.rotation.x = -Math.PI / 2; floor.position.set(x, YB + 0.005, 0); grp.add(floor);
      const liq = new T3D.Mesh(new T3D.CylinderGeometry(RB - 0.02, RB - 0.02, YL - YB - 0.01, 40), F.mesh.mat(PAL.muted, { transparent: true, opacity: 0.14, depthWrite: false })); liq.position.set(x, (YL + YB) / 2, 0); grp.add(liq);
      v.pickable(liq, who === 'anode' ? 'the anode half-cell’s solution, the dilute one at the start' : 'the cathode half-cell’s solution, the concentrated one at the start');
    }
    const bridge = rounded([[-XS, YP, 0], [-XS, 0.9, 0], [XS, 0.9, 0], [XS, YP, 0]], 0.3);
    v.pickable(tube(bridge, 0.13, PAL.ink, glass), 'the salt bridge');
    tube(bridge, 0.105, PAL.muted, { transparent: true, opacity: 0.16, depthWrite: false });
    for (const s of [-1, 1]) v.pickable(F.mesh.stick(grp, [s * XS, YP - 0.04, 0], [s * XS, YP + 0.08, 0], 0.12, PAL.muted), 'a porous plug');
    const ta = [AX, PLATE.y1, 0], tc = [CX, PLATE.y1, 0];
    const smooth = rounded([ta, [ta[0], YW, 0], [tc[0], YW, 0], tc], 0.35);
    v.pickable(tube(smooth, 0.025, PAL.ink), 'the wire of the external circuit');
    v.pickable(F.mesh.box(grp, [0, YW, 0], [1.1, 0.46, 0.3], PAL.panel), 'the external circuit');
    F.mesh.box(grp, [0, YW, 0], [1.14, 0.5, 0.26], PAL.muted);
    wire = along(smooth.map((p) => [p[0], p[1], 0]), 200);
    electrons = Array.from({ length: NE }, () => v.pickable(F.mesh.sphere(grp, [0, -50, 0], 0.05, F.el('e-')), 'an electron, e⁻, in the wire'));
    for (const [x, who] of [[AX, 'anode'], [CX, 'cathode']]) {
      const name = who === 'anode' ? 'the zinc anode, which dissolves' : 'the zinc cathode, onto which zinc plates';
      v.pickable(F.mesh.box(grp, [x, (YL + PLATE.y1) / 2, 0], [PLATE.w, PLATE.y1 - YL, PLATE.d], F.el('Zn')), name);
      parts[who] = v.pickable(F.mesh.box(grp, [x, (YL + PLATE.y0) / 2, 0], [PLATE.w, YL - PLATE.y0, PLATE.d], F.el('Zn')), name);
    }
    outs = Array.from({ length: NEV }, () => ion('a zinc ion, Zn²⁺, entering the anode solution'));
    ins = Array.from({ length: NEV }, () => ion('a zinc ion, Zn²⁺, about to plate onto the cathode as zinc'));
    const spots = [[XA - 1.35, 0.55, 0], [XC + 1.35, 0.55, 0], [0, 0.4, 0], [XA, YB - 0.3, 1.0], [XC, YB - 0.3, 1.0]];
    ['Zn anode (−)', 'Zn cathode (+)', 'salt bridge', 'dilute Zn<sup>2+</sup>(<em>aq</em>)', 'concentrated Zn<sup>2+</sup>(<em>aq</em>)'].forEach((s, i) => v.label(s, spots[i], grp, 0));
    v.label('external circuit', [0, YW + 0.4, 0], grp, 0);
    v.headline('Electrons flow until the two Zn<sup>2+</sup> concentrations are equal.');
  }
  function placeIons(t) {
    EV.forEach((tk, k) => {
      for (const [list, out] of [[outs, true], [ins, false]]) {
        const m = list[k], f = out ? (t - tk) / LIFE : 1 + (t - tk) / LIFE;
        if (f < 0 || f >= 1) { m.position.set(0, -50, 0); continue; }
        const p = surface(out ? 'anode' : 'cathode', k, out ? 1 : 2), q = away(p, k, out ? 1 : 2);
        const a = out ? p : q, b = out ? q : p;
        m.position.set(a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f);
        m.material.opacity = out ? Math.min(1, (1 - f) / 0.35) : Math.min(1, f / 0.3);
      }
    });
  }

  let lastTex = '';
  function draw() {
    build();
    const t = cy.now(), xi = xiAt(t), run = xi / 0.2;
    if (v.scene) {
      placeIons(t);
      const sp = wire.L / NE;
      electrons.forEach((m, i) => {
        const s = (i * sp + 2 * sp * xi / DXI) % wire.L, p = wire.at(s), inBox = Math.abs(p[0]) < 0.55 && p[1] > YW - 0.3;
        if (inBox) m.position.set(0, -50, 0); else m.position.set(p[0], p[1], p[2]);
      });
      parts.anode.scale.z = 1 - 0.5 * run; parts.cathode.scale.z = 1 + 0.5 * run;
      v.invalidate();
    }
    const ca = (0.10 + xi).toFixed(2), cc = (0.50 - xi).toFixed(2);
    const E = -(NERNST / 2) * Math.log10(+ca / +cc), Es = signedT(E, 3);
    const tex = `\\mk{E}{\\kEcell} = \\mk{Eo}{\\kEocell} - \\frac{0.0592\\ \\text{V}}{\\mk{n}{\\kn}}\\log\\mk{Q}{\\kQrxn} = \\mk{eo}{${hue('potential', '0.000')}\\ \\text{V}} - \\frac{0.0592\\ \\text{V}}{\\mk{nv}{${hue('amount', 2)}}}\\log\\frac{\\mk{ca}{${hue('concentration', ca)}}}{\\mk{cc}{${hue('concentration', cc)}}} = \\mk{e}{${hue('potential', Es)}}\\ \\text{V}`;
    if (tex !== lastTex) { lastTex = tex; ro.set(tex, 'For every two electrons through the wire, one Zn²⁺ ion enters the anode solution and one plates onto the cathode as zinc.', { values: false }); }

    /* the legend and the two graphs, drawn to the present moment */
    const { ctx } = begin(cnv);
    const cT = C('time'), cC = C('concentration'), cE = C('potential');
    const rA = F.ref('anode-half-cell'), rC = F.ref('cathode-half-cell');
    dot(ctx, 250, 34, F.el('e-'), true, 8); text(ctx, 'electron, e⁻', 270, 34, PAL.ink, { size: 22 });
    dot(ctx, 520, 34, F.el('Zn'), true, 10); text(ctx, 'Zn²⁺', 540, 34, PAL.ink, { size: 22 });
    line(ctx, 720, 34, 760, 34, rA, 5); text(ctx, 'anode half-cell', 772, 34, rA, { size: 22 });
    line(ctx, 1010, 34, 1050, 34, rC, 5); text(ctx, 'cathode half-cell', 1062, 34, rC, { size: 22 });
    const L = { l: 150, r: 640, t: 100, b: 230 }, R = { l: 850, r: 1340, t: 100, b: 230 };
    const a1 = F.axes(ctx, L, [0, T], [0, 0.6], { nx: 4, ny: 3, xl: 't', xc: cT, yl: '[Zn²⁺] (M)', yc: cC, fx: () => '', fy: (y) => y.toFixed(1) });
    line(ctx, L.l, a1.Y(0.3), L.r, a1.Y(0.3), alpha(PAL.ink, 0.4), 2, [10, 10]);
    if (t > 0) {
      F.curve(ctx, (s) => 0.10 + xiAt(s), 0, t, a1.X, a1.Y, rA, 5, 120);
      F.curve(ctx, (s) => 0.50 - xiAt(s), 0, t, a1.X, a1.Y, rC, 5, 120);
    }
    dot(ctx, a1.X(0), a1.Y(0.10), rA, false, 9); dot(ctx, a1.X(0), a1.Y(0.50), rC, false, 9);
    dot(ctx, a1.X(t), a1.Y(0.10 + xi), rA, true, 9); dot(ctx, a1.X(t), a1.Y(0.50 - xi), rC, true, 9);
    const a2 = F.axes(ctx, R, [0, T], [0, 0.025], { nx: 4, ny: 5, xl: 't', xc: cT, yl: 'E_{cell} (V)', yc: cE, fx: () => '', fy: (y) => y.toFixed(3) });
    if (t > 0) F.curve(ctx, (s) => Ecell(xiAt(s)), 0, t, a2.X, a2.Y, cE, 5, 120);
    dot(ctx, a2.X(0), a2.Y(Ecell(0)), cE, false, 9);
    dot(ctx, a2.X(t), a2.Y(Ecell(xi)), cE, true, 9);
  }
  register(d.fig, { update: (dt2) => cy.step(dt2, () => 1), draw });
})();
};
