/* Figures for section 12.5 Collision Theory. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['12.5'] = function (root, F) {
const { fmt, tex, C, PAL, alpha, ctl, cycle, register, begin, line, text, dot } = F;
const sim = (id, H) => F.sim(root, id, H);
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;
const minus = (s) => String(s).replace(/^-/, '−');
const S = (x) => { const t = Math.min(1, Math.max(0, x)); return t * t * (3 - 2 * t); };
function clipTo(ctx, b, f) { ctx.save(); ctx.beginPath(); ctx.rect(b.l, b.t, b.r - b.l, b.b - b.t); ctx.clip(); f(); ctx.restore(); }
/* x as a mantissa to sig figures and a power of ten */
function sci(x, sig) {
  const e = Math.floor(Math.log10(Math.abs(x))), m = +(x / 10 ** e).toFixed(sig - 1);
  return m === 10 ? { m: 1, e: e + 1 } : { m, e };
}
const sciTex = (x, sig) => { const { m, e } = sci(x, sig); return `${m.toFixed(sig - 1)}\\times10^{${e}}`; };
const sciText = (x, sig) => { const { m, e } = sci(x, sig); return `${minus(m.toFixed(sig - 1))} × 10${String(e).replace('-', '⁻').replace(/\d/g, (c) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[c])}`; };

/* =====================================================================
   FIGURE 12.13 + 12.14: one collision of CO with O2, in three dimensions,
   above the reaction diagram it traces. Moving: the pair runs along one
   path coordinate s with the potential U(s) drawn below, s from 0 to 3.4
   the reactants' plateau, 3.4 to 4.25 the climb to the transition state,
   4.25 to 5.25 the descent, then the products' plateau to 8.25. Speed is
   v0 √((E − U)/E) with v0 ∝ √E, so the molecules slow as they climb and
   turn back where U reaches E. Oxygen first, the climb is a wall 1.9 E_a
   high with no top on the chart. E_a = 200 kJ/mol (CO + O2 → CO2 + O,
   k ∝ e^(−24 000 K/T)); ΔH = −34 kJ/mol from Appendix G. The energy axis
   is fixed at −100 to 350 kJ/mol, over the slider's 320.
===================================================================== */
(function () {
  const d = sim('sim-collision');
  const EA = 200, DH = -34, WALL = 1.9, DT = 1 / 120;
  let traj = [0];
  const cy = cycle(() => (traj.length - 1) * DT, 1.2);
  const side = F.choice(d.controls, { label: '\\text{strikes}', options: [{ value: 'O', label: 'oxygen end first' }, { value: 'C', label: 'carbon end first' }], value: 'C', aria: 'which end of the carbon monoxide molecule strikes the oxygen molecule', onInput: () => { plan(); cy.reset(); } });
  const eS = ctl(d.controls, { label: '\\text{collision energy}', cls: 'energy', min: 50, max: 320, step: 5, value: 240, unit: 'kJ/mol', dec: 0, specials: [{ at: EA, label: 'activation energy' }], aria: 'the energy the collision brings, in kilojoules per mole', onInput: () => { plan(); cy.reset(); } });
  const U = (s, o) => {
    if (s <= 3.4) return 0;
    if (o === 'O') return s <= 4.25 ? WALL * EA * S((s - 3.4) / 0.85) : WALL * EA + (s - 4.25) * 4000;
    if (s <= 4.25) return EA * S((s - 3.4) / 0.85);
    if (s <= 5.25) return EA + (DH - EA) * S(s - 4.25);
    return DH;
  };
  const xiOf = (s) => (s <= 3.4 ? 0.15 * s / 3.4 : s <= 4.25 ? 0.15 + 0.35 * (s - 3.4) / 0.85 : s <= 5.25 ? 0.5 + 0.35 * (s - 4.25) : Math.min(1, 0.85 + 0.15 * (s - 5.25) / 3));
  const sOf = (x) => (x <= 0.15 ? x / 0.15 * 3.4 : x <= 0.5 ? 3.4 + (x - 0.15) / 0.35 * 0.85 : x <= 0.85 ? 4.25 + (x - 0.5) / 0.35 : 5.25 + (x - 0.85) / 0.15 * 3);
  function plan() {
    const o = side.value, E = eS.v, v0 = 2.2 * Math.sqrt(E / 200), out = [0];
    let s = 0, dir = 1;
    for (let n = 0; n < 6000; n++) {
      const sp = v0 * Math.max(0.04, Math.sqrt(Math.max(0, E - U(s, o)) / E));
      let ns = s + dir * sp * DT;
      if (dir > 0 && U(ns, o) > E) { dir = -1; ns = s; }
      s = Math.max(0, ns); out.push(s);
      if (s >= 8.25 || (dir < 0 && s <= 0)) break;
    }
    traj = out;
  }
  plan();
  /* the atoms' x along the line of approach, space-filling as the book draws them */
  function atomsAt(s, o) {
    const close = o === 'C' ? 0.75 : 0.62;
    const g = s <= 3.4 ? 5 - s : s <= 4.25 ? 1.6 - (s - 3.4) / 0.85 * (1.6 - close) : close;
    if (o === 'O') return { C: -g / 2 - 0.5, Oa: -g / 2, Ob: g / 2, Oc: g / 2 + 0.55 };
    if (s <= 4.25) return { Oa: -g / 2 - 0.5, C: -g / 2, Ob: g / 2, Oc: g / 2 + 0.55 + 0.1 * S((s - 3.4) / 0.85) };
    const h = s - 4.25, xC = -0.375 - 0.45 * h, Ob = xC + 0.75 - 0.23 * S(h);
    return { C: xC, Oa: xC - 0.5 - 0.02 * S(h), Ob, Oc: Ob + 0.65 + 0.9 * h };
  }
  const v = F.view3d(d.stage, { spin: 'none', pitch: [-1.22, 1.22], views: [{ label: 'side', yaw: 0, pitch: 0.18 }, { label: 'above', yaw: 0, pitch: 1.2 }], h: 300, dist: 5.6, tilt: 0.18 });
  const grp = v.part(0), cnv = F.makeCanvas(d.stage, 470);
  if (grp) grp.position.y = -0.4;
  const NAMES = { Oa: 'an oxygen atom from the carbon monoxide molecule', C: 'the carbon atom from the carbon monoxide molecule', Ob: 'an oxygen atom from the oxygen molecule', Oc: 'an oxygen atom from the oxygen molecule' };
  let sig = '', balls = {};
  function build() {
    if (!grp) return;
    const now = [F.el('C'), F.el('O')].join('|'); if (now === sig) return; sig = now;
    v.clear(); balls = {};
    for (const k of ['Oa', 'C', 'Ob', 'Oc']) balls[k] = v.pickable(F.mesh.sphere(grp, [0, 0, 0], k === 'C' ? 0.34 : 0.3, F.el(k === 'C' ? 'C' : 'O')), NAMES[k]);
  }
  const B = { l: 150, r: 1290, t: 60, b: 390 };
  function draw() {
    const o = side.value, E = eS.v, s = traj[Math.min(traj.length - 1, Math.round(cy.now() / DT))] ?? 0;
    build();
    if (grp) { const a = atomsAt(s, o); for (const k in balls) balls[k].position.set(a[k], 0, 0); v.invalidate(); }
    v.headline(o === 'O'
      ? 'Oxygen strikes oxygen: no arrangement of these atoms leads to CO<sub>2</sub>, and the molecules bounce apart.'
      : E >= EA ? 'The carbon end strikes with at least $\\kEa$: the molecules pass the transition state and part as CO<sub>2</sub> and O.'
        : 'The carbon end strikes with less than $\\kEa$: the molecules climb part of the way to the transition state and bounce apart.');
    const { ctx } = begin(cnv), ce = C('energy'), cC = side.a('C'), guide = alpha(PAL.ink, 0.35);
    const { X, Y } = F.axes(ctx, B, [0, 1], [-100, 350], { nx: 4, ny: 9, fx: () => '', fy: (y) => minus(fmt(y, 0)), xl: 'extent of reaction', yl: 'energy (kJ/mol)', yc: ce });
    line(ctx, B.l, Y(0), B.r, Y(0), guide, 2, [10, 10]);
    F.faded(ctx, cC, [0, 0], () => line(ctx, X(0.5), Y(DH), B.r, Y(DH), guide, 2, [10, 10]));
    clipTo(ctx, B, () => side.curve(ctx, (val) => (x) => U(sOf(x), val), 0, 1, X, Y, PAL.ink, 5, 240));
    line(ctx, B.l, Y(E), B.r, Y(E), ce, 3, [12, 9]);
    F.faded(ctx, cC, [0, 0], () => {
      F.vbracket(ctx, X(0.5), Y(0), Y(EA), ce, 'E_{a}', 1);
      F.vbracket(ctx, X(0.5), Y(0), Y(DH), ce, 'ΔH', 1);
      text(ctx, 'transition state', X(0.5), Y(EA) - 30, PAL.ink, { size: 20, align: 'center', bg: PAL.panel });
      text(ctx, 'CO_{2} + O', X(0.8), Y(DH) + 30, PAL.ink, { size: 20, align: 'center', bg: PAL.panel });
    });
    text(ctx, 'CO + O_{2}', X(0.06), Y(0) - 26, PAL.ink, { size: 20, align: 'left', bg: PAL.panel });
    text(ctx, 'collision energy', B.r - 4, Y(E) - 20, ce, { size: 18, align: 'right', weight: 600, bg: PAL.panel });
    dot(ctx, X(xiOf(s)), Y(U(s, o)), ce, true, 10);
    const rel = E > EA ? '>' : E < EA ? '<' : '=';
    tex(d.readout, `\\text{collision energy} = ${hue('energy', E + '\\ \\text{kJ/mol}')} ${rel} \\kEa = ${hue('energy', EA + '\\ \\text{kJ/mol}')}`);
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();

/* =====================================================================
   FIGURE 12.15: the distribution of molecular kinetic energies at two
   temperatures, f(E) = (2/√π)(RT)^(−3/2) √E e^(−E/RT) per kJ/mol, and the
   fraction of each beyond E_a, erfc(√x) + 2√(x/π) e^(−x) with x = E_a/RT.
   Still: the curves answer the sliders. T1 is held at 300 K as the
   reference; T2 runs 300 to 900 K and E_a 2 to 28 kJ/mol. Energy axis
   fixed at 0 to 30 kJ/mol; the height fixed at 0.24 per kJ/mol, over the
   300 K peak of 0.194. The two curves are unnamed instances, F.cat(0) and
   F.cat(1).
===================================================================== */
(function () {
  const d = sim('sim-distribution', 560);
  const RK = 8.314e-3, T1 = 300;
  const eaS = ctl(d.controls, { label: '\\kEa', cls: 'energy', min: 2, max: 28, step: 1, value: 12, unit: 'kJ/mol', dec: 0, aria: 'activation energy, in kilojoules per mole' });
  const tS = ctl(d.controls, { label: '\\kTtwo', cls: 'temperature', min: 300, max: 900, step: 10, value: 600, unit: 'K', dec: 0, aria: 'the second temperature, in kelvin' });
  const f = (E, T) => { const rt = RK * T; return E <= 0 ? 0 : 2 / Math.sqrt(Math.PI) * rt ** -1.5 * Math.sqrt(E) * Math.exp(-E / rt); };
  function erfc(x) {
    const z = Math.abs(x), t = 1 / (1 + 0.5 * z);
    const r = t * Math.exp(-z * z - 1.26551223 + t * (1.00002368 + t * (0.37409196 + t * (0.09678418 + t * (-0.18628806 + t * (0.27886807 + t * (-1.13520398 + t * (1.48851587 + t * (-0.82215223 + t * 0.17087277)))))))));
    return x >= 0 ? r : 2 - r;
  }
  const above = (Ea, T) => { const x = Ea / (RK * T); return erfc(Math.sqrt(x)) + 2 * Math.sqrt(x / Math.PI) * Math.exp(-x); };
  const pct = (p) => { const q = p * 100; return q >= 9.5 ? fmt(q, 0) : q >= 0.95 ? fmt(q, 1) : String(+q.toPrecision(2)); };
  const B = { l: 130, r: 1300, t: 110, b: 470 };
  function draw() {
    const { ctx, H } = begin(d.c), Ea = eaS.v, T2 = tS.v, ce = C('energy');
    const head = F.headline(ctx, `At $\\kTtwo$ = ${T2} K, ${pct(above(Ea, T2))}% of the molecules reach $\\kEa$ = ${Ea} kJ/mol, against ${pct(above(Ea, T1))}% at $\\kTone$ = ${T1} K.`);
    const lab = F.labeller(ctx, H, { headline: head });
    const { X, Y } = F.axes(ctx, B, [0, 30], [0, 0.24], { nx: 6, ny: 4, fy: () => '', xl: 'kinetic energy (kJ/mol)', xc: ce, yl: 'number of molecules' });
    const k = F.arrival(d), curves = [[T1, F.cat(0), 'T_{1}'], [T2, F.cat(1), 'T_{2}']];
    for (const [T, col] of curves) {
      ctx.save(); ctx.globalAlpha *= 0.3 * k; ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(X(Ea), Y(0));
      for (let i = 0; i <= 80; i++) { const E = Ea + (30 - Ea) * i / 80; ctx.lineTo(X(E), Y(f(E, T))); }
      ctx.lineTo(X(30), Y(0)); ctx.closePath(); ctx.fill(); ctx.restore();
    }
    for (const [T, col] of curves) F.curve(ctx, (E) => f(E, T), 0, 30, X, Y, col, 5, 240);
    line(ctx, X(Ea), B.b, X(Ea), B.t + 30, ce, 3, [10, 10]);
    lab.add('E_{a}', X(Ea), B.t + 30, 0, -1, ce, 22, 14);
    for (const [T, col, name] of curves) { const E = 2.2 * RK * T; lab.add(`${name} = ${T} K`, X(E), Y(f(E, T)), 0.7, -0.7, col, 20, 26); }
    lab.flush();
    const val = Ea * 1000 / 8.314 * (1 / T2 - 1 / T1), ratio = Math.exp(-val);
    tex(d.readout, `\\ln\\frac{\\kkone}{\\kktwo} = \\frac{\\kEa}{R}\\left(\\frac{1}{\\kTtwo}-\\frac{1}{\\kTone}\\right) = \\frac{${hue('energy', Ea * 1000 + '\\ \\text{J mol}^{-1}')}}{8.314\\ \\text{J mol}^{-1}\\,\\text{K}^{-1}}\\left(\\frac{1}{${hue('temperature', T2 + '\\ \\text{K}')}}-\\frac{1}{${hue('temperature', T1 + '\\ \\text{K}')}}\\right) = ${fmt(val, 2)},\\ \\text{so}\\ \\kktwo = ${ratio >= 10 ? fmt(ratio, 0) : fmt(ratio, 2)}\\,\\kkone`);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 12.16: ln k against 1/T for 2HI → H2 + I2, the five rows of
   Example 12.13's table as printed (1/T to three figures). Still: a
   choice of two rows redraws the slope triangle. The slope is rounded to
   two figures before it is multiplied by R, as the book does, so the
   default gives the book's 1.8 × 10⁵ J/mol and the readout's numbers
   multiply to its result. Axes fixed: 1/T 1.2 to 1.9 × 10⁻³ K⁻¹, ln k
   −16 to −2. Ink throughout but the energy of the result.
===================================================================== */
(function () {
  const d = sim('sim-arrhenius-plot', 600);
  const Ts = [555, 575, 645, 700, 781], inv = [1.80, 1.74, 1.55, 1.43, 1.28], lk = [-14.860, -13.617, -9.362, -6.759, -3.231];
  const opts = [];
  for (let i = 0; i < 5; i++) for (let j = i + 1; j < 5; j++) opts.push({ value: `${i}-${j}`, label: `${Ts[i]} K and ${Ts[j]} K` });
  const pair = F.select(d.controls, { label: '\\text{points}', options: opts, value: '0-4', aria: 'the two measurements the slope is taken between' });
  const n = 5, mx = inv.reduce((a, b) => a + b) / n, my = lk.reduce((a, b) => a + b) / n;
  const fit = inv.reduce((a, x, i) => a + (x - mx) * (lk[i] - my), 0) / inv.reduce((a, x) => a + (x - mx) ** 2, 0);
  const lineAt = (x) => my + fit * (x - mx);
  const B = { l: 170, r: 1290, t: 136, b: 510 };
  function draw() {
    const { ctx, H } = begin(d.c), [i, j] = pair.value.split('-').map(Number);
    const dl = lk[i] - lk[j], dx = +(inv[i] - inv[j]).toFixed(2), sr = sci(dl / (dx * 1e-3), 2), slope = sr.m * 10 ** sr.e;
    const Ea = -slope * 8.314;
    const head = F.headline(ctx, `Between ${Ts[i]} K and ${Ts[j]} K, $\\Delta\\ln\\kk$ = ${minus(dl.toFixed(3))} over $\\Delta(1/\\kT)$ = ${dx.toFixed(2)} × 10⁻³ K⁻¹: a slope of ${sciText(slope, 2)} K.`);
    const lab = F.labeller(ctx, H, { headline: head });
    const { X, Y } = F.axes(ctx, B, [1.2, 1.9], [-16, -2], { nx: 7, ny: 7, fx: (x) => fmt(x, 1), fy: (y) => minus(fmt(y, 0)), xl: '1/T (10⁻³ K⁻¹)', yl: 'ln k' });
    clipTo(ctx, B, () => F.curve(ctx, lineAt, 1.22, 1.88, X, Y, PAL.ink, 4, 2));
    const k = F.arrival(d);
    ctx.save(); ctx.globalAlpha *= k;
    line(ctx, X(inv[j]), Y(lk[j]), X(inv[j]), Y(lk[i]), PAL.muted, 3, [10, 8]);
    line(ctx, X(inv[j]), Y(lk[i]), X(inv[i]), Y(lk[i]), PAL.muted, 3, [10, 8]);
    ctx.restore();
    inv.forEach((x, m) => { const on = m === i || m === j; dot(ctx, X(x), Y(lk[m]), on ? PAL.ink : PAL.muted, true, on ? 11 : 8); });
    lab.beside({ x1: X(inv[j]), y1: Y(lk[i]), x2: X(inv[j]), y2: Y(lk[j]) }, 'left', 'Δ ln k', PAL.ink, 20);
    lab.beside({ x1: X(inv[j]), y1: Y(lk[i]), x2: X(inv[i]), y2: Y(lk[i]) }, 'right', 'Δ(1/T)', PAL.ink, 20);
    lab.flush();
    tex(d.readout, `\\kEa = -\\text{slope}\\times R = -(${sciTex(slope, 2)}\\ \\text{K})(8.314\\ \\text{J mol}^{-1}\\,\\text{K}^{-1}) = ${hue('energy', sciTex(Ea, 2) + '\\ \\text{J mol}^{-1}')}`);
  }
  register(d.fig, { update: () => {}, draw });
})();
};
