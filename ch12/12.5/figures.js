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
   FIGURE 12.13 + 12.14: one collision of CO with O2, drawn flat and
   space-filling as the book draws it, across the top band, above the
   reaction diagram it traces (the molecules meet on one line, so turning
   would show nothing). Moving: the pair runs along one path coordinate s
   with the potential U(s) drawn below, s from 0 to 3.4 the reactants'
   plateau, 3.4 to 4.25 the climb to the transition state, 4.25 to 5.25
   the descent, then the products' plateau to 8.25. Speed is
   v0 √((E − U)/E) with v0 ∝ √E, so the molecules slow as they climb and
   turn back where U reaches E. Oxygen first, the climb is a wall 1.9 E_a
   high with no top on the chart. E_a = 200 kJ/mol (CO + O2 → CO2 + O,
   k ∝ e^(−24 000 K/T)); ΔH = −34 kJ/mol from Appendix G. The energy axis
   is fixed at −100 to 300 kJ/mol, over the slider's 280.
===================================================================== */
(function () {
  const d = sim('sim-collision', 780);
  const EA = 200, DH = -34, WALL = 1.9, DT = 1 / 120;
  let traj = [0];
  const cy = cycle(() => (traj.length - 1) * DT, 1.2);
  const side = F.choice(d.controls, { label: '\\text{strikes}', options: [{ value: 'O', label: 'oxygen end first' }, { value: 'C', label: 'carbon end first' }], value: 'C', aria: 'which end of the carbon monoxide molecule strikes the oxygen molecule', onInput: () => { plan(); cy.reset(); } });
  const eS = ctl(d.controls, { label: '\\text{collision energy}', cls: 'energy', min: 50, max: 280, step: 5, value: 240, unit: 'kJ/mol', dec: 0, specials: [{ at: EA, label: 'activation energy' }], aria: 'the energy the collision brings, in kilojoules per mole', onInput: () => { plan(); cy.reset(); } });
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
  /* the atoms' x along the line of approach, in scene units; joined atoms overlap, as space-filling atoms do */
  const CLOSE = 0.66, CO = 0.5, OO = 0.55;
  function atomsAt(s, o) {
    const g = s <= 3.4 ? 5 - s : s <= 4.25 ? 1.6 - (s - 3.4) / 0.85 * (1.6 - CLOSE) : CLOSE;
    if (o === 'O') return { C: -g / 2 - CO, Oa: -g / 2, Ob: g / 2, Oc: g / 2 + OO };
    if (s <= 4.25) return { Oa: -g / 2 - CO, C: -g / 2, Ob: g / 2, Oc: g / 2 + OO + 0.1 * S((s - 3.4) / 0.85) };
    const h = s - 4.25, xC = -CLOSE / 2 - 0.45 * h, Ob = xC + CLOSE - (CLOSE - CO) * S(h);
    return { C: xC, Oa: xC - CO, Ob, Oc: Ob + OO + 0.1 + 0.9 * h };
  }
  /* the scene: the line of approach across the top band, 1 scene unit = 150 canvas units, centred */
  const XC = 700, SC = 150, YM = 192, RAD = { C: 54, O: 48 };
  const NAMES = { Oa: 'the oxygen atom of the carbon monoxide molecule', C: 'the carbon atom of the carbon monoxide molecule', Ob: 'an oxygen atom of the oxygen molecule', Oc: 'an oxygen atom of the oxygen molecule' };
  let hits = []; F.hover(d.stage, () => hits);
  function atom(ctx, x, k) {
    const r = RAD[k === 'C' ? 'C' : 'O'];
    ctx.save(); ctx.fillStyle = F.el(k === 'C' ? 'C' : 'O'); ctx.strokeStyle = alpha(PAL.ink, 0.55); ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(x, YM, r, 0, 2 * Math.PI); ctx.fill(); ctx.stroke(); ctx.restore();
    hits.push({ x, y: YM, r, name: NAMES[k] });
  }
  const swatch = (el) => (c, x, y) => { c.save(); c.fillStyle = F.el(el); c.beginPath(); c.arc(x, y, 10, 0, 2 * Math.PI); c.fill(); c.restore(); };
  const B = { l: 150, r: 1290, t: 340, b: 690 };
  function draw() {
    const o = side.value, E = eS.v, s = traj[Math.min(traj.length - 1, Math.round(cy.now() / DT))] ?? 0;
    const { ctx } = begin(d.c), ce = C('energy'), cC = side.a('C'), guide = alpha(PAL.ink, 0.35);
    hits = [];
    F.topline(ctx, o === 'O'
      ? 'Oxygen strikes oxygen: no arrangement of these atoms leads to CO_{2}, and the molecules bounce apart.'
      : E >= EA ? 'The carbon end strikes with at least $\\kEa$: the molecules pass the transition state and part as CO_{2} and O.'
        : 'The carbon end strikes with less than $\\kEa$: the molecules climb part of the way to the transition state and bounce apart.');
    /* drawn back to front: the O of CO and the far O behind, so the joined atoms overlap as the book draws them */
    const a = atomsAt(s, o);
    for (const k of (o === 'C' ? ['Oa', 'C', 'Oc', 'Ob'] : ['C', 'Oa', 'Oc', 'Ob'])) atom(ctx, XC + SC * a[k], k);
    /* what the four atoms are at this moment, named under them */
    const passing = o === 'C' && E >= EA;
    text(ctx, passing && s > 5 ? 'CO_{2} + O' : passing && s > 3.95 ? 'activated complex' : 'CO + O_{2}', XC, 286, PAL.ink, { size: 22, align: 'center' });
    F.legend(ctx, { l: 1010, r: 1340, t: 268, b: 304 }, [{ s: 'carbon', draw: swatch('C') }, { s: 'oxygen', draw: swatch('O') }], { corner: 'tr', row: true, panel: false });
    const { X, Y } = F.axes(ctx, B, [0, 1], [-100, 300], { nx: 4, ny: 4, fx: () => '', fy: (y) => minus(fmt(y, 0)), xl: 'extent of reaction', yl: 'energy (kJ/mol)', yc: ce });
    line(ctx, B.l, Y(0), B.r, Y(0), guide, 2, [10, 10]);
    clipTo(ctx, B, () => side.curve(ctx, (val) => (x) => U(sOf(x), val), 0, 1, X, Y, PAL.ink, 5, 240));
    line(ctx, B.l, Y(E), B.r, Y(E), ce, 3, [12, 9]);
    F.faded(ctx, cC, [0, 0], () => {
      F.vbracket(ctx, X(0.5), Y(0), Y(EA), ce, 'E_{a}', 1);
      F.vbracket(ctx, X(0.95), Y(0), Y(DH), ce, 'ΔH', 1);
      /* the name stands over the peak, lifted over the collision energy's line when that line would cross it */
      const ty = E > EA + 10 && E < EA + 66 ? Y(E) - 28 : Y(EA) - 32;
      text(ctx, 'transition state', X(0.5), ty, PAL.ink, { size: 22, align: 'center', bg: PAL.panel });
      text(ctx, 'CO_{2} + O', X(0.86), Y(DH) + 30, PAL.ink, { size: 22, align: 'center', bg: PAL.panel });
    });
    text(ctx, 'CO + O_{2}', X(0.02), Y(0) - 30, PAL.ink, { size: 22, align: 'left', bg: PAL.panel });
    text(ctx, 'collision energy', B.r - 6, Y(E) - 24, ce, { size: 22, align: 'right', weight: 600, bg: PAL.panel });
    dot(ctx, X(xiOf(s)), Y(U(s, o)), ce, true, 11);
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
   reference; T2 runs 300 to 900 K and E_a 2 to 19 kJ/mol, default 8, so
   both tails show as in the book's (b). Energy axis fixed at 0 to 20 kJ/mol; the height fixed at 0.24 per kJ/mol, over the
   300 K peak of 0.194. The two curves are unnamed instances, F.cat(0) and
   F.cat(1), named in the legend with the dotted drop at each one's average
   kinetic energy, 3/2 RT.
===================================================================== */
(function () {
  const d = sim('sim-distribution', 560);
  const RK = 8.314e-3, T1 = 300;
  const eaS = ctl(d.controls, { label: '\\kEa', cls: 'energy', min: 2, max: 19, step: 1, value: 8, unit: 'kJ/mol', dec: 0, aria: 'activation energy, in kilojoules per mole' });
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
    const { X, Y } = F.axes(ctx, B, [0, 20], [0, 0.24], { nx: 4, ny: 4, fy: () => '', xl: 'kinetic energy (kJ/mol)', xc: ce, yl: 'number of molecules' });
    const k = F.arrival(d), curves = [[T1, F.cat(0), 'T_{1}'], [T2, F.cat(1), 'T_{2}']];
    for (const [T, col] of curves) {
      ctx.save(); ctx.globalAlpha *= 0.3 * k; ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(X(Ea), Y(0));
      for (let i = 0; i <= 80; i++) { const E = Ea + (20 - Ea) * i / 80; ctx.lineTo(X(E), Y(f(E, T))); }
      ctx.lineTo(X(20), Y(0)); ctx.closePath(); ctx.fill(); ctx.restore();
    }
    for (const [T, col] of curves) F.curve(ctx, (E) => f(E, T), 0, 20, X, Y, col, 5, 240);
    line(ctx, X(Ea), B.b, X(Ea), B.t + 30, ce, 3, [10, 10]);
    lab.add('E_{a}', X(Ea), B.t + 30, 0, -1, ce, 22, 14);
    lab.flush();
    /* each curve's average kinetic energy, 3/2 RT, dropped from the curve to the axis */
    for (const [T, col] of curves) { const E = 1.5 * RK * T; line(ctx, X(E), Y(0), X(E), Y(f(E, T)), col, 3, [4, 8]); }
    /* the key keeps to the left of the E_a line when that line reaches its corner */
    F.legend(ctx, Ea > 14.5 ? { l: B.l, r: X(Ea) - 16, t: B.t, b: B.b } : B, [...curves.map(([T, col, name]) => ({ s: `${name} = ${T} K`, color: col, w: 5 })), { s: 'average kinetic energy', color: PAL.ink, w: 3, dash: [4, 8] }], { corner: 'tr' });
    const val = Ea * 1000 / 8.314 * (1 / T2 - 1 / T1), ratio = Math.exp(-val);
    tex(d.readout, `\\ln\\frac{\\kkone}{\\kktwo} = \\frac{\\kEa}{R}\\left(\\frac{1}{\\kTtwo}-\\frac{1}{\\kTone}\\right) = \\frac{${hue('energy', Ea * 1000 + '\\ \\text{J mol}^{-1}')}}{8.314\\ \\text{J mol}^{-1}\\,\\text{K}^{-1}}\\left(\\frac{1}{${hue('temperature', T2 + '\\ \\text{K}')}}-\\frac{1}{${hue('temperature', T1 + '\\ \\text{K}')}}\\right) = ${minus(fmt(val, 2))} \\\\ \\frac{\\kktwo}{\\kkone} = e^{${fmt(-val, 2)}} = ${ratio >= 10 ? fmt(ratio, 0) : fmt(ratio, 2)}`);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 12.16: ln k against 1/T for 2HI → H2 + I2, the five rows of
   Example 12.13's tables as printed (1/T to three figures). Still: two
   sliders pick the two measurements, T1 the cooler; the line is drawn
   through those two, so the reader sees how well it passes the other
   three, and the triangle's legs carry the differences the slope is
   made of. The slope is rounded to two figures before it is multiplied
   by R, as the book does, so the opening pair (the first and the last)
   gives the book's −2.2 × 10⁴ K and 1.8 × 10⁵ J/mol and the readout's
   numbers multiply to its result. ln k and 1/T stay in ink (the chapter's
   COLOR.md); T1, T2 wear temperature and E_a energy. Axes fixed: 1/T 1.1 to 1.9 × 10⁻³ K⁻¹
   (the book's runs from about 1.2), ln k −18 to −2.
===================================================================== */
(function () {
  const d = sim('sim-arrhenius-plot', 640);
  const Ts = [555, 575, 645, 700, 781], ks = ['3.52 × 10⁻⁷', '1.22 × 10⁻⁶', '8.59 × 10⁻⁵', '1.16 × 10⁻³', '3.95 × 10⁻²'];
  const inv = [1.80, 1.74, 1.55, 1.43, 1.28], lk = [-14.860, -13.617, -9.362, -6.759, -3.231];
  const t1 = ctl(d.controls, { label: '\\kTone', cls: 'temperature', min: 0, max: 3, step: 1, value: 0, unit: '', fmt: (i) => `${Ts[Math.round(i)]} K`, aria: 'the cooler of the two measurements', onInput: () => { if (t2.v <= t1.v) t2.set(t1.v + 1); } });
  const t2 = ctl(d.controls, { label: '\\kTtwo', cls: 'temperature', min: 1, max: 4, step: 1, value: 4, unit: '', fmt: (i) => `${Ts[Math.round(i)]} K`, aria: 'the warmer of the two measurements', onInput: () => { if (t1.v >= t2.v) t1.set(t2.v - 1); } });
  let hits = []; F.hover(d.stage, () => hits);
  const B = { l: 170, r: 1290, t: 120, b: 520 };
  function draw() {
    const { ctx, H } = begin(d.c), i = Math.round(t1.v), j = Math.round(t2.v), ct = C('temperature'), leg = PAL.muted;
    const dl = lk[i] - lk[j], dx = +(inv[i] - inv[j]).toFixed(2), exact = dl / (dx * 1e-3), sr = sci(exact, 2), slope = sr.m * 10 ** sr.e;
    const Ea = -slope * 8.314, through = (x) => lk[j] + exact * 1e-3 * (x - inv[j]);
    /* how far the line through the two picked points passes from the worst of the other three, in ln k */
    let worst = -1, miss = 0;
    inv.forEach((x, m) => { const r = Math.abs(lk[m] - through(x)); if (m !== i && m !== j && r > miss) { miss = r; worst = m; } });
    const head = F.headline(ctx, miss < 0.4
      ? `The line through ${Ts[i]} K and ${Ts[j]} K passes close to the other three points, and its slope gives $\\kEa$ = ${sciText(Ea, 2)} J/mol.`
      : `The line through ${Ts[i]} K and ${Ts[j]} K misses the point at ${Ts[worst]} K, and its slope gives $\\kEa$ = ${sciText(Ea, 2)} J/mol.`);
    const lab = F.labeller(ctx, H, { headline: head });
    const { X, Y } = F.axes(ctx, B, [1.1, 1.9], [-18, -2], { nx: 8, ny: 8, fx: (x) => fmt(x, 1), fy: (y) => minus(fmt(y, 0)), xl: '1/T (10⁻³ K⁻¹)', yl: 'ln k' });
    const k = F.arrival(d);
    hits = [];
    clipTo(ctx, B, () => F.curve(ctx, through, 1.1, 1.9, X, Y, PAL.ink, 4, 2));
    /* the slope triangle, its right angle under the line as the book draws it: down from the warmer point, across to the cooler */
    const xa = X(inv[j]), ya = Y(lk[j]), xb = X(inv[i]), yb = Y(lk[i]);
    ctx.save(); ctx.globalAlpha *= k;
    line(ctx, xa, ya, xa, yb, leg, 3, [10, 8]);
    line(ctx, xa, yb, xb, yb, leg, 3, [10, 8]);
    ctx.restore();
    inv.forEach((x, m) => {
      const on = m === i || m === j;
      dot(ctx, X(x), Y(lk[m]), PAL.ink, true, on ? 12 : 8);
      hits.push({ x: X(x), y: Y(lk[m]), r: 16, name: `${Ts[m]} K: k = ${ks[m]} L/mol/s, so 1/T = ${inv[m].toFixed(2)} × 10⁻³ K⁻¹ and ln k = ${minus(lk[m].toFixed(3))}` });
    });
    lab.add(`T_{2} = ${Ts[j]} K`, xa, ya, 0.7, -0.7, ct, 22, 22);
    lab.add(`T_{1} = ${Ts[i]} K`, xb, yb, 0.9, -0.45, ct, 22, 26);
    lab.add(`Δ(ln k) = ${minus(dl.toFixed(3))}`, xa, (ya + yb) / 2, -1, 0, PAL.ink, 22, 18);
    /* set toward the corner, clear of the line falling away on the right */
    lab.add(`Δ(1/T) = ${dx.toFixed(2)} × 10⁻³ K⁻¹`, xb - xa < 260 ? xa - 40 : xa + 0.2 * (xb - xa), yb, 0, 1, PAL.ink, 22, 34);
    lab.flush();
    const kv = (v) => `(${v.toFixed(3)})`, tv = (v) => `${v.toFixed(2)}\\times10^{-3}\\ \\text{K}^{-1}`;
    tex(d.readout, `\\text{slope} = \\frac{\\Delta(\\ln \\kk)}{\\Delta(1/\\kT)} = \\frac{${kv(lk[i])}-${kv(lk[j])}}{${tv(inv[i])}-${tv(inv[j])}} = ${sciTex(slope, 2)}\\ \\text{K} \\\\ \\kEa = -\\text{slope}\\times R = -(${sciTex(slope, 2)}\\ \\text{K})(8.314\\ \\text{J/mol/K}) = ${hue('energy', sciTex(Ea, 2) + '\\ \\text{J/mol}')}`);
  }
  register(d.fig, { update: () => {}, draw });
})();

};
