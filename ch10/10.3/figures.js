/* Figures for section 10.3 Phase Transitions. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['10.3'] = function (root, F) {
const { el, fmt, tex, C, PAL, alpha, ctl, cycle, register, begin, line, arrow, dot, text, topline, axes, label } = F;
const sim = (id, H) => F.sim(root, id, H);
function readout(host, main, small, o) { tex(host, main, false, o); if (small) host.appendChild(el('small', null, small)); }
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;
const T3D = window.THREE;
const R = 8.3145;
const clamp = (x, a, b) => Math.min(Math.max(x, a), b);
/* three significant figures, the way the book rounds its steps */
const sig3 = (x) => { if (x === 0) return 0; const e = Math.floor(Math.log10(Math.abs(x))) - 2; return Math.round(x / 10 ** e) * 10 ** e; };
const show3 = (x) => { if (x === 0) return '0'; const e = Math.floor(Math.log10(Math.abs(x))); return x.toFixed(Math.max(0, 2 - e)); };
const minus = (s) => s.replace(/^-/, '−');

/* The four liquids of Example 10.5, each with its normal boiling point in °C and its
   enthalpy of vaporization in kJ/mol: water's 40.67 and ethanol's 41.4 are the book's,
   the rest handbook values. Every vapor pressure on the page comes from the
   Clausius-Clapeyron equation through the normal boiling point, so the figures agree. */
const LIQ = {
  ether: { name: 'diethyl ether', ref: 'diethyl-ether', bp: 34.6, dH: 26.5 },
  ethanol: { name: 'ethanol', ref: 'ethanol', bp: 78.4, dH: 41.4 },
  water: { name: 'water', ref: 'water', bp: 100.0, dH: 40.67 },
  glycol: { name: 'ethylene glycol', ref: 'ethylene-glycol', bp: 197.3, dH: 50.5 },
};
const KEYS = Object.keys(LIQ);
const pOf = (k, tc) => { const q = LIQ[k]; return 101.3 * Math.exp((-q.dH * 1000 / R) * (1 / (tc + 273.15) - 1 / (q.bp + 273.15))); };
const bpAt = (k, p) => { const q = LIQ[k]; return 1 / (1 / (q.bp + 273.15) - (R * Math.log(p / 101.3)) / (q.dH * 1000)) - 273.15; };
const cap = (s) => s[0].toUpperCase() + s.slice(1);

/* =====================================================================
   FIGURE 10.22: vapor over a liquid in a sealed, evacuated flask. From the
   moment the flask is closed, molecules leave the liquid at a steady rate
   and return at a rate that grows with the vapor, so the pressure rises
   and levels off where the two rates are equal. Moving: the approach to
   equilibrium is a process in time. The flask stands on a floor, so the
   pitch stays between 1° and 69° above level; the yaw is free and there is
   no idle spin, since the molecules already move. The strip beneath holds
   the manometer and the pressure against time. The flask and the
   manometer are referents, in F.ref.
===================================================================== */
(function () {
  const d = sim('sim-vapor');
  const v = F.view3d(d.stage, { spin: 'none', pitch: [0.02, 1.2], tilt: 0.3, views: [{ label: 'front', yaw: 0, pitch: 0.12 }, { label: 'corner', yaw: 0.7, pitch: 0.45 }], h: 380, dist: 4.8 });
  const grp = v.part(0), cnv = F.makeCanvas(d.stage, 340);
  /* each molecule by its carbon and oxygen atoms and the hydrogen atoms of its O–H groups, in box units */
  const SHAPES = {
    ether: { f: 'C₄H₁₀O', atoms: [['C', -0.16, -0.02], ['C', -0.08, 0.03], ['O', 0, -0.02], ['C', 0.08, 0.03], ['C', 0.16, -0.02]] },
    ethanol: { f: 'C₂H₅OH', atoms: [['C', -0.09, -0.02], ['C', -0.01, 0.03], ['O', 0.07, -0.02], ['H', 0.12, 0.02]] },
    water: { f: 'H₂O', atoms: [['O', 0, 0], ['H', -0.05, 0.035], ['H', 0.05, 0.035]] },
    glycol: { f: 'C₂H₄(OH)₂', atoms: [['H', -0.17, 0.05], ['O', -0.12, 0.02], ['C', -0.04, -0.02], ['C', 0.04, 0.03], ['O', 0.12, -0.01], ['H', 0.17, -0.05]] },
  };
  const L = F.choice(d.controls, { label: '\\text{liquid}', options: KEYS.map((k) => ({ value: k, label: LIQ[k].name })), value: 'ether', aria: 'the liquid in the flask', onInput: () => cy.reset() });
  const TC = 20, PER = 2, TAU = 1.6, TT = 8, NMAX = 32;
  const W = 0.62, FLOOR = -0.9, TOP = 0.9, SURF = FLOOR + 0.42;
  const cy = cycle(() => TT, 2.5);
  const peq = () => pOf(L.value, TC);
  const pAt = (t) => peq() * (1 - Math.exp(-t / TAU));
  /* the triangle wave that folds a straight path back and forth between a and b */
  const fold = (x, a, b) => { const w = b - a, u = ((((x - a) % (2 * w)) + 2 * w) % (2 * w)); return a + (u < w ? u : 2 * w - u); };
  const slots = Array.from({ length: NMAX }, (_, i) => ({
    x0: -0.45 + 0.9 * ((i * 0.618) % 1), z0: -0.45 + 0.9 * ((i * 0.377 + 0.2) % 1),
    vx: 0.25 * Math.sin(i * 2.3 + 0.4), vy: 0.35 + 0.2 * ((i * 0.53) % 1), vz: 0.25 * Math.cos(i * 1.7),
    spin: [(i * 0.7) % 3, (i * 1.3) % 3],
  }));
  const born = (i, n) => (i < n ? -TAU * Math.log(1 - (i + 0.5) / n) : Infinity);
  let sig = '', ms = [];
  function build() {
    const key = L.value + '|' + [PAL.ink, F.ref('flask'), F.el('C'), F.el('O'), F.el('H')].join('|'); if (key === sig || !grp) return; sig = key;
    v.clear(); ms = [];
    const glass = new T3D.Mesh(new T3D.BoxGeometry(2 * W, TOP - FLOOR, 2 * W), F.mesh.mat(F.ref('flask'), { transparent: true, opacity: 0.05, depthWrite: false, side: T3D.DoubleSide }));
    glass.position.set(0, (TOP + FLOOR) / 2, 0); grp.add(glass);
    const e = new T3D.LineSegments(new T3D.EdgesGeometry(new T3D.BoxGeometry(2 * W, TOP - FLOOR, 2 * W)), new T3D.LineBasicMaterial({ color: new T3D.Color(F.ref('flask')) }));
    e.position.copy(glass.position); grp.add(e);
    const liq = new T3D.Mesh(new T3D.BoxGeometry(2 * W - 0.02, SURF - FLOOR, 2 * W - 0.02), F.mesh.mat(PAL.ink, { transparent: true, opacity: 0.16, depthWrite: false }));
    liq.position.set(0, (SURF + FLOOR) / 2, 0); grp.add(liq);
    const sh = SHAPES[L.value], nm = LIQ[L.value].name + ' molecule, ' + sh.f;
    slots.forEach(() => {
      const m = new T3D.Group(); grp.add(m);
      sh.atoms.forEach(([s, x, y]) => v.pickable(F.mesh.sphere(m, [x, y, 0], s === 'H' ? 0.026 : 0.042, F.el(s)), 'a ' + nm));
      ms.push(m);
    });
    v.label('liquid', [W, SURF - 0.2, W], grp, 0);
    v.label('vapor', [W, TOP - 0.2, W], grp, 0);
  }
  function draw() {
    build();
    const t = cy.now(), pe = peq(), n = Math.min(NMAX, Math.round(pe / PER)), p = pAt(t), q = LIQ[L.value];
    ms.forEach((m, i) => {
      const tb = born(i, n), s = slots[i];
      if (!(t >= tb)) { m.visible = false; return; }
      const u = t - tb; m.visible = true;
      m.position.set(fold(s.x0 + s.vx * u, -W + 0.2, W - 0.2), fold(SURF + 0.04 + s.vy * u, SURF + 0.04, TOP - 0.06), fold(s.z0 + s.vz * u, -W + 0.06, W - 0.06));
      m.rotation.set(s.spin[0] * u, s.spin[1] * u, 0);
    });
    v.invalidate();

    const { ctx } = begin(cnv), cp = C('pressure'), ctm = C('time');
    /* the manometer: 60 kPa parts the arms by 120 units */
    const MX = 170, MB = 290, MK = 2, lift = clamp(p, 0, 70) * MK / 2, arm = 60;
    ctx.save(); ctx.strokeStyle = F.ref('manometer'); ctx.lineWidth = 3; ctx.beginPath();
    ctx.moveTo(MX - arm - 14, 120); ctx.lineTo(MX - arm - 14, MB); ctx.arc(MX, MB, arm + 14, Math.PI, 0, true); ctx.lineTo(MX + arm + 14, 120);
    ctx.moveTo(MX - arm + 14, 120); ctx.lineTo(MX - arm + 14, MB); ctx.arc(MX, MB, arm - 14, Math.PI, 0, true); ctx.lineTo(MX + arm - 14, 120);
    ctx.stroke(); ctx.restore();
    const lvl = 220, yl = lvl + lift, yr = lvl - lift;
    ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.25);
    ctx.fillRect(MX - arm - 12, yl, 24, MB - yl); ctx.fillRect(MX + arm - 12, yr, 24, MB - yr);
    ctx.beginPath(); ctx.arc(MX, MB, arm + 12, Math.PI, 0, true); ctx.arc(MX, MB, arm - 12, 0, Math.PI, false); ctx.closePath(); ctx.fill(); ctx.restore();
    text(ctx, 'to the flask', MX - arm, 100, PAL.muted, { size: 16, align: 'center' });
    text(ctx, 'sealed', MX + arm, 100, PAL.muted, { size: 16, align: 'center' });
    if (lift > 4) { F.vbracket(ctx, MX + arm + 34, yr, yl, cp, 'P', 1, { side: 'right' }); }

    /* pressure against time, 0 to 8 s and 0 to 80 kPa, fixed: ether's 60 kPa is the highest */
    const box = { l: 440, r: 1300, t: 130, b: 280 };
    const { X, Y } = axes(ctx, box, [0, TT], [0, 80], { nx: 4, ny: 4, xl: 't (s)', xc: ctm, yl: 'P (kPa)', yc: cp });
    line(ctx, box.l, Y(pe), box.r, Y(pe), alpha(cp, 0.6), 2, [10, 10]);
    ctx.save(); ctx.beginPath(); ctx.rect(box.l, box.t - 6, box.r - box.l, box.b - box.t + 6); ctx.clip();
    F.curve(ctx, pAt, 0, t, X, Y, cp, 4, 60); ctx.restore();
    dot(ctx, X(t), Y(Math.min(p, 80)), cp, true, 8);
    label(ctx, 'vapor pressure ' + (pe < 0.1 ? pe.toFixed(2) : fmt(pe, 1)) + ' kPa', box.r - 10, Y(pe), { side: 'above', size: 17, color: cp, gap: 16 });

    const eq = t >= TT - 0.4, name = cap(q.name);
    topline(ctx, n === 0
      ? `${name} at 20 °C has a vapor pressure of only ${pe.toFixed(2)} kPa, too little for one molecule of the drawing.`
      : eq ? `${name}: molecules leave and return at equal rates, and the vapor pressure holds at ${fmt(pe, 1)} kPa.`
        : `${name}: more molecules leave the liquid than return, and the vapor pressure is still rising (${fmt(p, 1)} kPa).`);
    const pv = hue('pressure', (p < 0.1 ? p.toFixed(2) : fmt(p, 1)) + '\\ \\text{kPa}');
    readout(d.readout, `\\text{rate of vaporization} ${eq ? '=' : '>'} \\text{rate of condensation},\\quad \\kP_{\\text{vap}} = ${pv}`,
      'Each molecule drawn in the vapor stands for 2 kPa. The weaker the intermolecular attractions, the more molecules escape before the returning ones balance them, and the higher the vapor pressure.', { values: false });
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();

/* =====================================================================
   FIGURE 10.23: the distribution of kinetic energies at two temperatures,
   with the tails beyond the minimum needed to escape filled. Still: the
   curve answers the temperature. The distribution is f(E) = 2/√π ·
   √E /(RT)^{3/2} · e^{−E/RT}, and the filled fraction its exact tail.
===================================================================== */
(function () {
  const d = sim('sim-ke', 520);
  const T = ctl(d.controls, { label: '\\kT', cls: 'temperature', min: 250, max: 400, step: 1, value: 350, unit: 'K', dec: 0, aria: 'temperature in kelvin', specials: [{ at: 300, label: '300 K' }] });
  const E = ctl(d.controls, { label: 'KE_{\\min}', cls: 'energy', min: 4, max: 18, step: 0.5, value: 10, unit: 'kJ/mol', dec: 1, aria: 'minimum kinetic energy needed to escape, in kilojoules per mole' });
  const T0 = 300;
  const f = (tk) => (e) => { const rt = R * tk / 1000; return (2 / Math.sqrt(Math.PI)) * Math.sqrt(Math.max(e, 0)) / rt ** 1.5 * Math.exp(-e / rt); };
  /* erfc by Abramowitz and Stegun 7.1.26 */
  const erfc = (x) => { const t = 1 / (1 + 0.3275911 * x); return t * (0.254829592 + t * (-0.284496736 + t * (1.421413741 + t * (-1.453152027 + t * 1.061405429)))) * Math.exp(-x * x); };
  const tail = (tk, e) => { const x = e / (R * tk / 1000); return erfc(Math.sqrt(x)) + 2 * Math.sqrt(x / Math.PI) * Math.exp(-x); };
  const pct = (x) => (x < 0.1 ? fmt(100 * x, 1) : fmt(100 * x, 0)) + '%';
  function fill(ctx, fn, e0, X, Y, color) {
    ctx.save(); ctx.fillStyle = color; ctx.beginPath(); ctx.moveTo(X(e0), Y(0));
    for (let i = 0; i <= 60; i++) { const e = e0 + ((20 - e0) * i) / 60; ctx.lineTo(X(e), Y(fn(e))); }
    ctx.lineTo(X(20), Y(0)); ctx.closePath(); ctx.fill(); ctx.restore();
  }
  function draw() {
    const { ctx } = begin(d.c);
    const tk = T.v, em = E.v, ct = C('temperature'), ce = C('energy');
    /* 0 to 20 kJ/mol; the height fixed from the tallest curve, 250 K */
    const box = { l: 150, r: 1300, t: 110, b: 440 };
    const { X, Y } = axes(ctx, box, [0, 20], [0, 0.25], { nx: 4, ny: 4, fy: () => '', xl: 'kinetic energy (kJ/mol)', xc: ce, yl: 'number of molecules' });
    const lo = f(T0), hi = f(tk);
    fill(ctx, lo, em, X, Y, alpha(ct, 0.14));
    fill(ctx, hi, em, X, Y, alpha(ct, 0.38));
    ctx.save(); ctx.setLineDash([10, 10]); F.curve(ctx, lo, 0, 20, X, Y, alpha(ct, 0.8), 3, 120); ctx.restore();
    F.curve(ctx, hi, 0, 20, X, Y, ct, 5, 120);
    line(ctx, X(em), box.t + 20, X(em), box.b, PAL.ink, 3, [10, 10]);
    label(ctx, 'minimum KE needed to escape', X(em), box.t + 20, { side: em > 12 ? 'left' : 'right', size: 18, gap: 14 });
    const rl = R * T0 / 1000 / 2, rh = R * tk / 1000 / 2;
    label(ctx, '300 K', X(rl), Y(lo(rl)), { side: tk > T0 ? 'above' : 'left', size: 18, color: ct, weight: 400 });
    label(ctx, 'T = ' + tk + ' K', X(rh) + 70, Y(hi(rh)) - 16, { side: 'right', size: 18, color: ct, gap: 0, leader: false });
    const fl = tail(T0, em), fh = tail(tk, em), r = fh / fl;
    topline(ctx, tk === T0 ? `At 300 K, ${pct(fl)} of the molecules have at least ${fmt(em, 1)} kJ/mol of kinetic energy.`
      : `At ${tk} K, ${pct(fh)} of the molecules have at least ${fmt(em, 1)} kJ/mol, ${fmt(r, r < 10 ? 2 : 1)} times the fraction at 300 K.`);
    readout(d.readout, `\\text{fraction with } KE \\ge ${hue('energy', fmt(em, 1) + '\\ \\text{kJ/mol}')}:\\ ${pct(fh).replace('%', '\\%')}\\ \\text{at}\\ \\kT = ${hue('temperature', tk + '\\ \\text{K}')},\\ ${pct(fl).replace('%', '\\%')}\\ \\text{at}\\ ${hue('temperature', '300\\ \\text{K}')}`,
      'The dashed line is the fixed curve at 300 K; stronger intermolecular attractions raise the minimum and shrink both tails.');
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 10.24: the vapor pressures of four liquids against temperature,
   and the boiling point of each where its curve meets the pressure of the
   surroundings. Still: the curves answer the pressure. Axes 0 to 120 °C
   and 0 to 120 kPa, fixed; ethylene glycol's crossings fall to the right
   and are pinned at the edge. Each liquid's curve is its referent's F.ref.
===================================================================== */
(function () {
  const d = sim('sim-bp', 560);
  const P = ctl(d.controls, { label: '\\kP', cls: 'pressure', min: 20, max: 120, step: 0.1, value: 101.3, unit: 'kPa', dec: 1, aria: 'pressure of the surroundings in kilopascals',
    detents: [40, 68], specials: [{ at: 101.3, label: '1 atm' }] });
  const Lq = F.select(d.controls, { label: '\\text{liquid}', options: KEYS.map((k) => ({ value: k, label: LIQ[k].name })), value: 'water', aria: 'the liquid whose boiling point is worked out' });
  function draw() {
    const { ctx } = begin(d.c);
    const p = P.v, sel = Lq.value, cp = C('pressure'), ct = C('temperature');
    const box = { l: 150, r: 1290, t: 110, b: 470 };
    const { X, Y } = axes(ctx, box, [0, 120], [0, 120], { nx: 6, ny: 6, xl: 'T (°C)', xc: ct, yl: 'P (kPa)', yc: cp });
    line(ctx, box.l, Y(p), box.r, Y(p), cp, 3, [10, 10]);
    text(ctx, fmt(p, 1) + ' kPa', box.l + 12, Y(p) + 20, cp, { size: 18, weight: 600, bg: PAL.panel });
    KEYS.forEach((k, i) => {
      const on = k === sel, col = F.ref(LIQ[k].ref);
      ctx.save(); ctx.beginPath(); ctx.rect(box.l, box.t, box.r - box.l, box.b - box.t); ctx.clip();
      F.curve(ctx, (tc) => pOf(k, tc), 0, 120, X, Y, on ? col : alpha(col, 0.75), on ? 5 : 3, 120); ctx.restore();
      const tb = bpAt(k, p);
      if (tb >= 0 && tb <= 120) { line(ctx, X(tb), Y(p), X(tb), box.b, alpha(col, 0.8), 2, [4, 8]); dot(ctx, X(tb), Y(p), col, true, on ? 10 : 8); }
      else F.pinned(ctx, box, X, Y, tb, p, col, fmt(tb, 0) + ' °C');
      /* each curve named where it leaves the top of the box, or at its right end */
      const tTop = bpAt(k, 120), lx = tTop <= 120 ? X(tTop) : box.r, ly = tTop <= 120 ? box.t : Y(pOf(k, 120));
      label(ctx, LIQ[k].name, lx, ly, { side: tTop <= 120 ? 'above' : 'left', size: 18, color: col, gap: tTop <= 120 ? 14 : 20, weight: on ? 600 : 400 });
    });
    const tb = bpAt(sel, p), q = LIQ[sel];
    if (tb >= 0 && tb <= 120) text(ctx, fmt(tb, 1) + ' °C', X(tb), box.b + 50, ct, { size: 18, weight: 600, align: 'center', bg: PAL.panel });
    topline(ctx, `At ${fmt(p, 1)} kPa, ${q.name} boils at ${fmt(tb, 1)} °C${tb > 120 ? ', off the right of the graph' : tb < 0 ? ', off the left of the graph' : ''}.`);
    const tk = tb + 273.15, t1 = q.bp + 273.15;
    tex(d.readout, `\\kTtwo={\\left(\\frac{-R\\cdot\\ln\\left(\\frac{\\kPtwo}{\\kPone}\\right)}{\\kdHvap}+\\frac{1}{\\kTone}\\right)}^{-1}={\\left(\\frac{-(8.3145\\ \\text{J/mol·K})\\ln\\left(\\frac{${hue('pressure', fmt(p, 1) + '\\ \\text{kPa}')}}{${hue('pressure', '101.3\\ \\text{kPa}')}}\\right)}{${hue('energy', fmt(q.dH * 1000, 0) + '\\ \\text{J/mol}')}}+\\frac{1}{${hue('temperature', fmt(t1, 1) + '\\ \\text{K}')}}\\right)}^{-1}=${hue('temperature', fmt(tk, 1) + '\\ \\text{K}')}=${hue('temperature', fmt(tb, 1) + '^{\\circ}\\text{C}')}`);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 10.28: the enthalpies of fusion, vaporization and sublimation as
   steps on an energy ladder, drawn to scale for water with the text's
   values. Still, a faithful redraw: nothing in the idea varies.
===================================================================== */
(function () {
  const d = sim('fig-ladder', 460);
  const FUS = 6.01, VAP = 44.01, S = 5.8, Y0 = 420;
  function draw() {
    const { ctx } = begin(d.c), ce = C('energy'), k = F.ease.smooth(F.arrival(d));
    const ys = Y0, yl = Y0 - FUS * S, yg = Y0 - (FUS + VAP) * S;
    arrow(ctx, 150, Y0 + 20, 150, yg - 20, ce, 4);
    text(ctx, 'Energy', 150, yg - 40, ce, { size: 20, weight: 600, align: 'center' });
    [[ys, 'solid'], [yl, 'liquid'], [yg, 'gas']].forEach(([y, s]) => { line(ctx, 260, y, 1100, y, PAL.ink, 3); text(ctx, s, 1120, y, PAL.ink, { size: 20 }); });
    const grow = (x, y1, y2, i) => { const g = F.stagger(k, i, 3); if (g > 0) arrow(ctx, x, y1, x, y1 + (y2 - y1) * g, ce, 4); };
    grow(600, ys, yg, 0); grow(760, ys, yl, 1); grow(760, yl, yg, 2);
    text(ctx, 'sublimation', 580, (ys + yg) / 2 - 14, ce, { size: 20, weight: 600, align: 'right', bg: PAL.panel });
    text(ctx, 'ΔH_{sub} = 50.02 kJ/mol', 580, (ys + yg) / 2 + 14, ce, { size: 20, weight: 600, align: 'right', bg: PAL.panel });
    text(ctx, 'fusion, ΔH_{fus} = 6.01 kJ/mol', 780, (ys + yl) / 2, ce, { size: 17, weight: 600, bg: PAL.panel });
    text(ctx, 'vaporization', 780, (yl + yg) / 2 - 14, ce, { size: 20, weight: 600, bg: PAL.panel });
    text(ctx, 'ΔH_{vap} = 44.01 kJ/mol', 780, (yl + yg) / 2 + 14, ce, { size: 20, weight: 600, bg: PAL.panel });
    topline(ctx, 'For water, melting (6.01 kJ/mol) and then vaporizing (44.01 kJ/mol) add to an estimate of 50.02 kJ/mol for sublimation.');
    tex(d.readout, `\\kdHsub\\approx\\kdHfus+\\kdHvap=${hue('energy', '6.01\\ \\text{kJ/mol}')}+${hue('energy', '44.01\\ \\text{kJ/mol}')}=${hue('energy', '50.02\\ \\text{kJ/mol}')}`);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 10.29: the heating curve of water, with the book's specific heats
   and enthalpies of Example 10.10. Heat is added at a steady rate and the
   marker runs along the curve, holding on each plateau. Moving: a steady
   burner is a clock. A final temperature below the starting one draws the
   cooling curve, heat removed on the same axis. Axes 0 to 700 kJ, fixed
   from the slider maxima (200 g from −40 to 140 °C takes 633 kJ), and
   −40 to 140 °C.
===================================================================== */
(function () {
  const d = sim('sim-heat', 560);
  const reset = () => cy.reset();
  const M = ctl(d.controls, { label: '\\km', cls: 'mass', min: 10, max: 200, step: 1, value: 135, unit: 'g', dec: 0, aria: 'mass of water in grams', onInput: reset });
  const TA = ctl(d.controls, { label: '\\kTone', cls: 'temperature', min: -40, max: 140, step: 1, value: -15, unit: '°C', dec: 0, aria: 'starting temperature in degrees Celsius', onInput: reset });
  const TB = ctl(d.controls, { label: '\\kTtwo', cls: 'temperature', min: -40, max: 140, step: 1, value: 120, unit: '°C', dec: 0, aria: 'final temperature in degrees Celsius', onInput: reset });
  const cy = cycle(() => 6, 1.5);
  const CS = { s: 2.09, l: 4.18, g: 1.86 }, NAME = { s: 'ice', l: 'water', g: 'steam' }, FORM = { s: 'H_{2}O(s)', l: 'H_{2}O(l)', g: 'H_{2}O(g)' };
  const MM = 18.02, FUS = 6.01, VAP = 40.67;
  /* the steps from ta to tb: warming or cooling within a phase (q = mcΔT) and the transitions (q = nΔH), each in kJ */
  function path(m, ta, tb) {
    const steps = [], up = tb > ta, n = m / MM;
    if (ta === tb) return steps;
    let ph = up ? (ta <= 0 ? 's' : ta <= 100 ? 'l' : 'g') : (ta >= 100 ? 'g' : ta >= 0 ? 'l' : 's'), cur = ta;
    const warm = (t1) => { if (t1 !== cur) steps.push({ kind: 'warm', ph, t0: cur, t1, q: (m * CS[ph] * (t1 - cur)) / 1000 }); cur = t1; };
    for (;;) {
      const next = up ? { s: 0, l: 100, g: Infinity }[ph] : { g: 100, l: 0, s: -Infinity }[ph];
      if (up ? tb <= next : tb >= next) { warm(tb); break; }
      warm(next);
      const melt = (up && ph === 's') || (!up && ph === 'l');
      steps.push({ kind: 'change', ph, t0: cur, t1: cur, q: (up ? 1 : -1) * n * (melt ? FUS : VAP), melt });
      ph = up ? (ph === 's' ? 'l' : 'g') : (ph === 'g' ? 'l' : 's');
    }
    return steps;
  }
  const WORD = (s, up) => (s.kind === 'warm' ? `the ${NAME[s.ph]} is ${up ? 'warming' : 'cooling'}` : s.melt ? (up ? 'the ice is melting at 0 °C' : 'the water is freezing at 0 °C') : (up ? 'the water is boiling at 100 °C' : 'the steam is condensing at 100 °C'));
  function draw() {
    const { ctx } = begin(d.c);
    const m = M.v, ta = TA.v, tb = TB.v, up = tb >= ta, steps = path(m, ta, tb), ct = C('temperature'), ce = C('energy');
    const box = { l: 150, r: 1290, t: 110, b: 470 };
    const { X, Y } = axes(ctx, box, [0, 700], [-40, 140], { nx: 7, ny: 9, xl: up ? 'heat added (kJ)' : 'heat removed (kJ)', xc: ce, yl: 'T (°C)', yc: ct });
    const pts = [[0, ta]]; let acc = 0;
    steps.forEach((s) => { acc += Math.abs(s.q); s.x0 = acc - Math.abs(s.q); s.x1 = acc; pts.push([acc, s.t1]); });
    const total = acc, k = total > 0 ? clamp(cy.now() / 6, 0, 1) : 1, qNow = k * total;
    const at = (x) => { for (let i = 1; i < pts.length; i++) if (x <= pts[i][0] + 1e-9) { const [x0, y0] = pts[i - 1], [x1, y1] = pts[i]; return x1 > x0 ? y0 + ((y1 - y0) * (x - x0)) / (x1 - x0) : y1; } return pts[pts.length - 1][1]; };
    const poly = (upto, col, w) => {
      ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = w; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(X(0), Y(ta));
      for (let i = 1; i < pts.length && pts[i - 1][0] < upto; i++) { const x = Math.min(pts[i][0], upto); ctx.lineTo(X(x), Y(at(x))); }
      ctx.stroke(); ctx.restore();
    };
    const arr = F.ease.smooth(F.arrival(d));
    ctx.save(); ctx.beginPath(); ctx.rect(box.l - 10, box.t - 10, box.r - box.l + 20, box.b - box.t + 20); ctx.clip();
    poly(total * arr, alpha(ct, 0.3), 4); poly(qNow, ct, 5); ctx.restore();
    const cur = steps.find((s) => qNow <= s.x1 + 1e-9) || steps[steps.length - 1];
    steps.forEach((s) => {
      const xm = X((s.x0 + s.x1) / 2), ym = Y((s.t0 + s.t1) / 2), wide = X(s.x1) - X(s.x0);
      if (s.kind === 'warm' && (wide > 30 || Math.abs(Y(s.t1) - Y(s.t0)) > 40)) label(ctx, FORM[s.ph], xm, ym, { side: xm - box.l < 110 ? 'right' : 'left', size: 18, gap: 18, weight: 400 });
      if (s.kind === 'change' && wide > 110) label(ctx, s.melt ? (up ? 'melting' : 'freezing') : (up ? 'boiling' : 'condensing'), xm, ym, { side: 'below', size: 18, gap: 18, weight: 400 });
    });
    const xq = Math.min(qNow, 700);
    if (steps.length) dot(ctx, X(xq), Y(at(qNow)), ct, true, 10);
    const done = k >= 1, verb = up ? 'added' : 'removed', word = (x) => show3(sig3(x));
    topline(ctx, !steps.length ? 'The starting and final temperatures are the same, so no heat flows.'
      : done ? `All ${word(total)} kJ ${verb}: ${fmt(m, 0)} g of ${NAME[steps[steps.length - 1].ph]} at ${minus(String(tb))} °C.`
        : `${word(qNow)} kJ of ${word(total)} kJ ${verb}: ${WORD(cur, up)}.`);
    const terms = steps.map((s) => sig3(s.q)), sum = terms.reduce((a, b) => a + b, 0);
    const kj = (x) => hue('energy', (x < 0 ? '-' : '') + show3(Math.abs(x)) + '\\ \\text{kJ}');
    const body = terms.length ? terms.map((x, i) => (i && x >= 0 ? '+' : i ? '+(' : x < 0 ? '(' : '') + kj(x) + (x < 0 ? ')' : '')).join('') + '=' + kj(sig3(sum)) : hue('energy', '0\\ \\text{kJ}');
    const kinds = steps.map((s) => (s.kind === 'warm' ? `${up ? 'warming' : 'cooling'} the ${NAME[s.ph]}` : s.melt ? (up ? 'melting' : 'freezing') : (up ? 'boiling' : 'condensing'))).join(', ');
    readout(d.readout, `\\kq_{\\text{total}}=${body}`, steps.length ? `The steps are ${kinds}, in that order; each is rounded to three figures before the sum.` : '');
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();
};
