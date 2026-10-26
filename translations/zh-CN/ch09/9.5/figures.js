/* Figures for section 9.5 The Kinetic-Molecular Theory. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['9.5'] = function (root, F) {
const { el, fmt, tex, C, PAL, alpha, ctl, cycle, register, begin, line, dot, text, topline, axes } = F;
const sim = (id, H) => F.sim(root, id, H);
const TAU = 2 * Math.PI;
const R8 = 8.314;                                    /* J mol⁻¹ K⁻¹, the form the book uses for speeds and energies */
const T3D = window.THREE;
const { sphere: sphere3, stick: stick3, box: box3, mat: mat3 } = F.mesh;
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;
const palSig = () => [PAL.ink, PAL.panel, PAL.soft, PAL.muted, F.CC, F.el('N'), F.el('He'), F.el('Xe'), F.ref('baseline'), F.ref('changed'), C('volume')].join('|');
const glass = (extra = {}) => ({ transparent: true, opacity: 0.1, depthWrite: false, side: T3D.DoubleSide, ...extra });

/* the gases, each molecule as [element, dx, dy, radius] about its center, and its molar mass in g/mol */
const MOLS = {
  'O₂': { m: 32.00, word: 'oxygen', atoms: [['O', -6, 0, 7], ['O', 6, 0, 7]] },
  'N₂': { m: 28.01, word: 'nitrogen', atoms: [['N', -6, 0, 7], ['N', 6, 0, 7]] },
  'He': { m: 4.003, word: 'helium', atoms: [['He', 0, 0, 6]] },
  'Ne': { m: 20.18, word: 'neon', atoms: [['Ne', 0, 0, 7]] },
  'Ar': { m: 39.95, word: 'argon', atoms: [['Ar', 0, 0, 8]] },
  'Xe': { m: 131.29, word: 'xenon', atoms: [['Xe', 0, 0, 10]] },
};
const molName = (f) => (MOLS[f].atoms.length === 1 ? 'an atom of ' + MOLS[f].word + ', ' + f : 'a molecule of ' + MOLS[f].word + ', ' + f);
const heading3 = () => { const z = 2 * Math.random() - 1, a = Math.random() * TAU, r = Math.sqrt(1 - z * z); return [r * Math.cos(a), r * Math.sin(a), z]; };
function molecule3(v, parent, f, k) {
  const m = new T3D.Group(); parent.add(m);
  MOLS[f].atoms.forEach(([elm, dx, dy, rr]) => v.pickable(sphere3(m, [dx * k, dy * k, 0], rr * k * 1.15, F.el(elm)), molName(f)));
  return m;
}
function place3(m, x, u) { m.position.set(x[0], x[1], x[2]); m.rotation.set(0, Math.atan2(u[0], u[2]), Math.asin(Math.max(-1, Math.min(1, u[1])))); }

/* the Maxwell-Boltzmann distribution of speeds u (m/s) for molar mass M (g/mol) at T (K), per m/s */
const kg = (M) => M / 1000;
const mb = (u, M, T) => { const a = kg(M) / (2 * R8 * T); return 4 * Math.PI * Math.pow(a / Math.PI, 1.5) * u * u * Math.exp(-a * u * u); };
const vp = (M, T) => Math.sqrt((2 * R8 * T) / kg(M));
const urms = (M, T) => Math.sqrt((3 * R8 * T) / kg(M));
const peak = (M, T) => mb(vp(M, T), M, T);
/* the frame for one gas: speeds to 1.55 u_rms at 1000 K, rounded up to 500 m/s; heights to the peak at 100 K */
const xmaxFor = (M) => Math.ceil((1.55 * urms(M, 1000)) / 500) * 500;
const ymaxFor = (M) => 1.08 * peak(M, 100);
const gauss = () => { let a = 0; while (!a) a = Math.random(); return Math.sqrt(-2 * Math.log(a)) * Math.cos(TAU * Math.random()); };
/* one velocity drawn from the distribution: three components, each normal with variance RT/M */
const draw3 = (M, T) => { const s = Math.sqrt((R8 * T) / kg(M)); return [gauss() * s, gauss() * s, gauss() * s]; };

/* =====================================================================
   FIGURE 9.31: the book's three pairs of piston cylinders, in three
   dimensions. Two cylinders of nitrogen stand on a bench, the baseline on
   the left and the changed sample on the right; every molecule travels in
   a straight line and every strike on the walls is counted, so the bars
   beneath give the strikes on each unit of wall area in each second.
   Moving: the rate of striking is the idea, so the figure runs
   continuously with the transport and no scrubber, and a new law starts it
   again. The bench is a ground, so the pitch is held between level and
   52° above it, past which the names cover the cylinders; the yaw is
   free and nothing spins on its own.
===================================================================== */
(function () {
  const d = sim('sim-kmt');
  const v = F.view3d(d.stage, { spin: 'off', pitch: [0, 0.9], views: [{ label: 'front', yaw: 0, pitch: 0.2 }, { label: 'above', yaw: 0, pitch: 0.75 }], h: 420, dist: 9.4, tilt: 0.1 });
  const grp = v.part(0), cnv = F.makeCanvas(d.stage, 250);
  grp.position.y = -0.25;                                   /* the names above the cylinders stay inside the stage */
  const law = F.choice(d.controls, { label: '\\text{law}', aria: 'the gas law the kinetic-molecular theory explains', options: [{ value: 'amontons', label: 'Amontons’s law' }, { value: 'boyle', label: 'Boyle’s law' }, { value: 'avogadro', label: 'Avogadro’s law' }], value: 'amontons', ms: 0, onInput: restart });
  const RC = 0.62, H0 = 1.1, YB = -1.25, RM = 0.08, K = 0.011, N0 = 10, XS = [-1.4, 1.4], U0 = 0.8;
  const SPEC = { amontons: { h: H0, n: N0, T: 600 }, boyle: { h: H0 / 2, n: N0, T: 300 }, avogadro: { h: 2 * H0, n: 2 * N0, T: 300 } };
  const area = (h) => TAU * RC * h + TAU * RC * RC;
  const theory = (n, h, T) => (n / (Math.PI * RC * RC * h)) * U0 * Math.sqrt(T / 300) / 4;
  const base = theory(N0, H0, 300);
  let cyl = [];
  function fill(c) {
    c.p = [];
    for (let i = 0; i < c.n; i++) { const a = Math.random() * TAU, r = Math.sqrt(Math.random()) * (RC - RM - 0.02); c.p.push({ x: [r * Math.cos(a), RM + Math.random() * (c.h - 2 * RM), r * Math.sin(a)], u: heading3() }); }
  }
  function restart() {
    const s = SPEC[law.value];
    cyl = [{ cx: XS[0], h: H0, n: N0, T: 300 }, { cx: XS[1], h: s.h, n: s.n, T: s.T }];
    cyl.forEach((c) => { fill(c); c.hits = 0; c.t = 0; c.flux = theory(c.n, c.h, c.T); });
    sig = '';
  }
  function step(dt) {
    for (const c of cyl) {
      const sp = U0 * Math.sqrt(c.T / 300) * dt, lim = RC - RM;
      for (const q of c.p) {
        for (let k = 0; k < 3; k++) q.x[k] += q.u[k] * sp;
        const r = Math.hypot(q.x[0], q.x[2]);
        if (r > lim) { const nx = q.x[0] / r, nz = q.x[2] / r, dd = q.u[0] * nx + q.u[2] * nz; if (dd > 0) { q.u[0] -= 2 * dd * nx; q.u[2] -= 2 * dd * nz; c.hits++; } q.x[0] = nx * lim; q.x[2] = nz * lim; }
        if (q.x[1] < RM && q.u[1] < 0) { q.u[1] = -q.u[1]; c.hits++; }
        if (q.x[1] > c.h - RM && q.u[1] > 0) { q.u[1] = -q.u[1]; c.hits++; }
      }
      c.t += dt;
      if (c.t >= 0.5) { c.flux = 0.9 * c.flux + 0.1 * (c.hits / (area(c.h) * c.t)); c.hits = 0; c.t = 0; }
    }
  }
  const cy = cycle(() => Infinity, 0);
  let sig = '', ms = [];
  function build() {
    const key = [law.value, palSig()].join('|'); if (key === sig) return; sig = key;
    v.clear(); ms = [];
    v.pickable(box3(grp, [0, YB - 0.08, 0], [5.4, 0.16, 2.0], PAL.soft), 'the bench');
    cyl.forEach((c, i) => {
      const wall = new T3D.Mesh(new T3D.CylinderGeometry(RC, RC, 2 * H0 + 0.5, 36, 1, true), mat3(F.ref(i ? 'changed' : 'baseline'), glass({ opacity: 0.16 }))); wall.position.set(c.cx, YB + H0 + 0.15, 0); wall.renderOrder = 2; grp.add(wall);
      const body = new T3D.Mesh(new T3D.CylinderGeometry(RC - 0.01, RC - 0.01, c.h, 36), mat3(C('volume'), { transparent: true, opacity: 0.12, depthWrite: false })); body.position.set(c.cx, YB + c.h / 2, 0); grp.add(body);
      v.pickable(body, 'the gas, ' + (c.h === H0 ? '1.00 L' : fmt(c.h / H0, 2) + ' L'));
      v.pickable(box3(grp, [c.cx, YB + c.h + 0.05, 0], [2 * RC - 0.02, 0.1, 2 * RC - 0.02], PAL.muted), 'the piston');
      stick3(grp, [c.cx, YB + c.h + 0.1, 0], [c.cx, YB + 2 * H0 + 0.7, 0], 0.04, PAL.ink);
      const lab = v.label(i === 0 ? 'baseline' : law.value === 'amontons' ? 'heated' : law.value === 'boyle' ? 'volume decreased' : 'increased gas', [c.cx, YB + 2 * H0 + 0.85, 0], grp, 6);
      lab.style.color = F.ref(i ? 'changed' : 'baseline');
      const vl = v.label(fmt(c.h / H0, 2) + ' L', [c.cx + RC + 0.1, YB + c.h / 2, 0], grp, 0); vl.style.color = C('volume');
      if (i === 1 && law.value === 'amontons') { const tl = v.label('600 K', [c.cx, YB - 0.3, 0.9], grp, 0); tl.style.color = C('temperature'); }
      else { const tl = v.label('300 K', [c.cx, YB - 0.3, 0.9], grp, 0); tl.style.color = C('temperature'); }
      ms.push(c.p.map(() => molecule3(v, grp, 'N₂', K)));
    });
  }
  restart();
  function draw() {
    build();
    cyl.forEach((c, i) => c.p.forEach((q, j) => { const m = ms[i] && ms[i][j]; if (m) place3(m, [c.cx + q.x[0], YB + q.x[1], q.x[2]], q.u); }));
    v.invalidate();
    const { ctx } = begin(cnv), L = law.value, c1 = cyl[1];
    const rel = (c) => (100 * c.flux) / base;
    topline(ctx, L === 'amontons' ? 'Heated from 300 K to 600 K at constant volume, the molecules move 1.41 times as fast, so each unit of wall is struck 1.41 times as often and each strike is 1.41 times as hard: the pressure doubles.'
      : L === 'boyle' ? 'With the volume halved at constant temperature, the same molecules strike each unit of wall twice as often, and the pressure doubles.'
      : 'With twice the gas at constant temperature and pressure, the volume doubles, and each unit of wall is struck as often as before.');
    text(ctx, 'strikes on each unit of wall area in each second, the baseline’s set at 100', 80, 110, PAL.muted, { size: 17 });
    const bmax = 260, x0 = 300, W = 820;
    cyl.forEach((c, i) => {
      const y = 150 + i * 50, w = (W * Math.min(rel(c), bmax)) / bmax;
      text(ctx, i === 0 ? 'baseline' : L === 'amontons' ? 'heated' : L === 'boyle' ? 'volume decreased' : 'increased gas', 80, y + 7, F.ref(i ? 'changed' : 'baseline'), { size: 20, weight: 600 });
      ctx.save(); ctx.fillStyle = alpha(F.ref(i ? 'changed' : 'baseline'), 0.85); ctx.fillRect(x0, y - 14, w, 28); ctx.restore();
      line(ctx, x0, y - 20, x0, y + 20, PAL.ink, 2);
      text(ctx, fmt(rel(c), 0), x0 + w + 10, y + 7, PAL.ink, { size: 18 });
    });
    text(ctx, 'molecules drawn: ' + N0 + ' in the baseline and ' + c1.n + ' in the changed cylinder', 80, 236, PAL.muted, { size: 16 });
    const T = (k, x) => hue('temperature', x + '\\ \\text{K}'), V = (x) => hue('volume', fmt(x, 2) + '\\ \\text{L}'), n = (x) => hue('amount', fmt(x, 4) + '\\ \\text{mol}');
    const n1 = 1 / (0.08206 * 300);
    tex(d.readout, L === 'amontons' ? `\\frac{\\kPtwo}{\\kPone} = \\frac{\\kTtwo}{\\kTone} = \\frac{${T(2, 600)}}{${T(1, 300)}} = 2`
      : L === 'boyle' ? `\\frac{\\kPtwo}{\\kPone} = \\frac{\\kVone}{\\kVtwo} = \\frac{${V(1)}}{${V(0.5)}} = 2`
      : `\\frac{\\kVtwo}{\\kVone} = \\frac{\\kntwo}{\\knone} = \\frac{${n(2 * n1)}}{${n(n1)}} = 2`);
  }
  register(d.fig, { update: (dt) => { cy.step(dt, () => 1); step(Math.min(dt, 0.05)); }, draw });
})();

/* =====================================================================
   FIGURE 9.32 + 9.33 + 9.34: the molecular speed distribution. One live
   curve for the chosen gas at the chosen temperature, with the most
   probable and root mean square speeds marked, and behind it either
   nothing (9.32), the same gas at the book's four temperatures (9.33) or
   the book's four noble gases at the chosen temperature (9.34). The frame
   is fixed per gas from 100 K to 1000 K (per the xmaxFor and ymaxFor
   rules); the four-gas comparison keeps the book's 0 to 3000 m/s and is
   clipped where xenon's curve runs above it below 300 K. Still: a
   distribution answers its controls and has no clock.
===================================================================== */
(function () {
  const d = sim('sim-speeds', 520);
  const GASES = ['O₂', 'N₂', 'He', 'Ne', 'Ar', 'Xe'], NOBLE = ['Xe', 'Ar', 'Ne', 'He'], TEMPS = [100, 200, 500, 1000];
  const cmp = F.choice(d.controls, { label: '\\text{compare with}', aria: 'the curves drawn behind the live one', options: [{ value: 'one', label: 'none' }, { value: 'temps', label: 'temperatures' }, { value: 'gases', label: 'gases' }], value: 'one' });
  const gas = F.select(d.controls, { label: '\\text{gas}', aria: 'the gas', options: GASES.map((g) => ({ value: g, label: g })), value: 'O₂' });
  const Tc = ctl(d.controls, { label: '\\kT', cls: 'temperature', min: 100, max: 1000, step: 1, value: 300, unit: 'K', dec: 0, detents: [100, 200, 300, 500, 1000], aria: 'temperature of the gas in kelvin' });
  const REF = { Xe: 'xenon', Ar: 'argon', Ne: 'neon', He: 'helium' };
  const r1 = el('div'), r2 = el('div'); d.readout.append(r1, r2);
  const box = { l: 130, r: 1300, t: 110, b: 420 };
  function draw() {
    const { ctx } = begin(d.c);
    const g = gas.value, M = MOLS[g].m, T = Tc.v, mode = cmp.value;
    const xmax = mode === 'gases' ? 3000 : xmaxFor(M), ymax = mode === 'gases' ? 1.1 * peak(131.29, 300) : ymaxFor(M);
    const { X, Y } = axes(ctx, box, [0, xmax], [0, ymax], { nx: xmax / 500, ny: 4, fy: () => '', xl: 'speed u (m/s)', xc: C('velocity'), yl: 'fraction of molecules' });
    const fam = mode === 'temps' ? TEMPS.map((t) => ({ M, T: t, name: t + ' K' })) : mode === 'gases' ? NOBLE.map((n) => ({ M: MOLS[n].m, T, name: n })) : [];
    const famC = (c, i) => (mode === 'gases' ? F.ref(REF[c.name]) : F.cat(i));
    ctx.save(); ctx.beginPath(); ctx.rect(box.l, box.t - 2, box.r - box.l, box.b - box.t + 2); ctx.clip();
    fam.forEach((c, i) => F.curve(ctx, (u) => mb(u, c.M, c.T), 0, xmax, X, Y, famC(c, i), 3, 160));
    F.curve(ctx, (u) => mb(u, M, T), 0, xmax, X, Y, PAL.ink, 5, 200);
    ctx.restore();
    const p = vp(M, T), q = urms(M, T), marks = [[p, 'v_{p}'], [q, 'u_{rms}']];
    marks.forEach(([u, s], i) => {
      if (u > xmax) return;
      const y = Math.max(Y(mb(u, M, T)), box.t);
      line(ctx, X(u), y, X(u), box.b, alpha(PAL.ink, 0.5), 2, [4, 8]);
      dot(ctx, X(u), y, C('velocity'), true, 8);
      text(ctx, s, X(u) + (i ? 12 : -12), y - 14, C('velocity'), { size: 20, weight: 600, align: i ? 'left' : 'right', bg: PAL.panel });
    });
    fam.forEach((c, i) => {
      const lx = box.r - 190, ly = box.t + 20 + i * 30;
      line(ctx, lx, ly - 6, lx + 36, ly - 6, famC(c, i), 4);
      text(ctx, mode === 'temps' ? g + ' at ' + c.name : c.name + ' at ' + T + ' K', lx + 46, ly, PAL.ink, { size: 18 });
    });
    const ly = box.t + 20 + fam.length * 30;
    line(ctx, box.r - 190, ly - 6, box.r - 154, ly - 6, PAL.ink, 5);
    text(ctx, g + ' at ' + T + ' K', box.r - 144, ly, PAL.ink, { size: 18, weight: 600 });
    topline(ctx, 'For ' + MOLS[g].word + ' at ' + T + ' K the most probable speed is ' + fmt(p, 0) + ' m/s and the root mean square speed is ' + fmt(q, 0) + ' m/s.');
    tex(r1, `\\kurms = \\sqrt{\\frac{3R\\kT}{\\kMM}} = \\sqrt{\\frac{3(8.314\\ \\text{J/mol K})(${hue('temperature', T + '\\ \\text{K}')})}{${hue('mass', fmt(kg(M), 4) + '\\ \\text{kg/mol}')}}} = ${hue('velocity', fmt(q, 0) + '\\ \\text{m/s}')}`);
    tex(r2, `\\kKEavg = \\frac{3}{2}R\\kT = \\frac{3}{2}(8.314\\ \\text{J/mol K})(${hue('temperature', T + '\\ \\text{K}')}) = ${hue('energy', fmt(1.5 * R8 * T, 0) + '\\ \\text{J/mol}')}\\ \\text{for every gas}`);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   SIM: a box of gas and a count of its speeds. Molecules travel in a glass
   box; each collides at random about three times a second and leaves with
   a velocity drawn from the Maxwell-Boltzmann distribution at the box's
   temperature, and every new speed is added to the histogram beneath,
   which builds up under the curve. A change of temperature or gas clears
   the count, and the molecules take up the new distribution one collision
   at a time. Moving: the count grows with time. No ground, so the yaw is
   free and the pitch held within 70° of level; no idle spin.
===================================================================== */
(function () {
  const d = sim('sim-gasbox');
  const v = F.view3d(d.stage, { spin: 'off', pitch: [-1.22, 1.22], views: [{ label: 'front', yaw: 0, pitch: 0.15 }, { label: 'corner', yaw: 0.7, pitch: 0.42 }], h: 360, dist: 6.4, tilt: 0.18 });
  const grp = v.part(0), cnv = F.makeCanvas(d.stage, 340);
  const GASES = ['He', 'N₂', 'Ar', 'Xe'];
  const gas = F.choice(d.controls, { label: '\\text{gas}', aria: 'the gas in the box', options: GASES.map((g) => ({ value: g, label: g })), value: 'N₂', ms: 0, onInput: clear });
  const Tc = ctl(d.controls, { label: '\\kT', cls: 'temperature', min: 100, max: 1000, step: 1, value: 300, unit: 'K', dec: 0, detents: [100, 300, 500, 1000], onInput: clear, aria: 'temperature of the gas in kelvin' });
  const L = 1.0, RM = 0.1, N = 40, KS = 0.0016, RATE = 3, NB = 40, K = 0.012;
  let P = [], bins = [], total = 0, sumsq = 0, sig = '', ms = [], xmax = 1500;
  function clear() { bins = new Array(NB).fill(0); total = 0; sumsq = 0; xmax = xmaxFor(MOLS[gas.value].m); }
  function tally(w) { const s = Math.hypot(w[0], w[1], w[2]), b = Math.floor((s / xmax) * NB); total++; sumsq += s * s; if (b < NB) bins[b]++; }
  function seed() {
    const M = MOLS[gas.value].m; P = [];
    for (let i = 0; i < N; i++) { const w = draw3(M, Tc.v); P.push({ x: [(Math.random() * 2 - 1) * (L - RM), (Math.random() * 2 - 1) * (L - RM), (Math.random() * 2 - 1) * (L - RM)], w }); tally(w); }
  }
  clear(); seed();
  function step(dt) {
    const M = MOLS[gas.value].m, lim = L - RM;
    for (const q of P) {
      for (let k = 0; k < 3; k++) { q.x[k] += q.w[k] * KS * dt; if (q.x[k] > lim && q.w[k] > 0) q.w[k] = -q.w[k]; if (q.x[k] < -lim && q.w[k] < 0) q.w[k] = -q.w[k]; }
      if (Math.random() < RATE * dt) { q.w = draw3(M, Tc.v); tally(q.w); }
    }
  }
  const cy = cycle(() => Infinity, 0);
  function build() {
    const key = [gas.value, palSig()].join('|'); if (key === sig) return; sig = key;
    v.clear();
    const b = new T3D.Mesh(new T3D.BoxGeometry(2 * L, 2 * L, 2 * L), mat3(PAL.ink, glass())); grp.add(b);
    const e = new T3D.LineSegments(new T3D.EdgesGeometry(new T3D.BoxGeometry(2 * L, 2 * L, 2 * L)), new T3D.LineBasicMaterial({ color: new T3D.Color(PAL.ink) })); grp.add(e);
    v.label(MOLS[gas.value].word + ', ' + gas.value, [0, L + 0.15, 0], grp, 6);
    ms = P.map(() => molecule3(v, grp, gas.value, K));
  }
  function draw() {
    build();
    P.forEach((q, i) => { const s = Math.hypot(q.w[0], q.w[1], q.w[2]) || 1; if (ms[i]) place3(ms[i], q.x, [q.w[0] / s, q.w[1] / s, q.w[2] / s]); });
    v.invalidate();
    const { ctx } = begin(cnv), g = gas.value, M = MOLS[g].m, T = Tc.v, q = urms(M, T);
    const box = { l: 130, r: 1300, t: 110, b: 270 }, ymax = ymaxFor(M), bw = xmax / NB;
    const { X, Y } = axes(ctx, box, [0, xmax], [0, ymax], { nx: xmax / 500, ny: 2, fy: () => '', xl: 'speed u (m/s)', xc: C('velocity'), yl: 'fraction of molecules' });
    ctx.save(); ctx.beginPath(); ctx.rect(box.l, box.t, box.r - box.l, box.b - box.t); ctx.clip();
    ctx.fillStyle = alpha(F.ref('speed-count'), 0.7);
    if (total) bins.forEach((c, i) => { const h = c / (total * bw); ctx.fillRect(X(i * bw) + 1, Y(h), X(bw) - X(0) - 2, box.b - Y(h)); });
    F.curve(ctx, (u) => mb(u, M, T), 0, xmax, X, Y, PAL.ink, 3, 160);
    ctx.restore();
    line(ctx, X(q), box.t, X(q), box.b, C('velocity'), 2, [10, 10]);
    text(ctx, 'u_{rms}', X(q) + 8, box.t + 18, C('velocity'), { size: 18, weight: 600, bg: PAL.panel });
    const seen = total ? Math.sqrt(sumsq / total) : 0;
    topline(ctx, total + ' speeds of ' + MOLS[g].word + ' at ' + T + ' K counted so far; their root mean square is ' + fmt(seen, 0) + ' m/s, and √(3RT/ℳ) gives ' + fmt(q, 0) + ' m/s.');
    tex(d.readout, `\\kKEavg = \\frac{3}{2}R\\kT = \\frac{3}{2}(8.314\\ \\text{J/mol K})(${hue('temperature', T + '\\ \\text{K}')}) = ${hue('energy', fmt(1.5 * R8 * T, 0) + '\\ \\text{J/mol}')}`);
  }
  register(d.fig, { update: (dt) => { cy.step(dt, () => 1); step(Math.min(dt, 0.05)); }, draw });
})();
};
