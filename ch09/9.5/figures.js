/* Figures for section 9.5 The Kinetic-Molecular Theory. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['9.5'] = function (root, F) {
const { el, fmt, tex, C, PAL, alpha, ctl, cycle, register, begin, line, dot, text, topline, axes, plot, legend, measure } = F;
const sim = (id, H) => F.sim(root, id, H);
const TAU = 2 * Math.PI;
const R8 = 8.314;                                    /* J mol⁻¹ K⁻¹, the form the book uses for speeds and energies */
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;

/* the gases, each molecule as [element, dx, dy, radius] about its center, and its molar mass in g/mol */
const MOLS = {
  'O₂': { m: 32.00, word: 'oxygen', atoms: [['O', -4.5, 0, 6.5], ['O', 4.5, 0, 6.5]] },
  'N₂': { m: 28.01, word: 'nitrogen', atoms: [['N', -4.5, 0, 6.5], ['N', 4.5, 0, 6.5]] },
  'He': { m: 4.003, word: 'helium', atoms: [['He', 0, 0, 6]] },
  'Ne': { m: 20.18, word: 'neon', atoms: [['Ne', 0, 0, 7]] },
  'Ar': { m: 39.95, word: 'argon', atoms: [['Ar', 0, 0, 8]] },
  'Kr': { m: 83.80, word: 'krypton', atoms: [['Kr', 0, 0, 9]] },
  'Xe': { m: 131.29, word: 'xenon', atoms: [['Xe', 0, 0, 10]] },
};
const molName = (f) => (MOLS[f].atoms.length === 1 ? 'an atom of ' + MOLS[f].word + ', ' + f : 'a molecule of ' + MOLS[f].word + ', ' + f);
/* one molecule of the gas f centred on (x, y), turned by a and scaled by k; a thin ink rim keeps a light disc readable on a light page */
function molecule(ctx, f, x, y, a = 0, k = 1) {
  const c = Math.cos(a), s = Math.sin(a);
  for (const [elm, dx, dy, rr] of MOLS[f].atoms) {
    ctx.save(); ctx.fillStyle = F.el(elm); ctx.strokeStyle = alpha(PAL.ink, 0.45); ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(x + (dx * c - dy * s) * k, y + (dx * s + dy * c) * k, rr * k, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore();
  }
}
/* the path a molecule has just travelled, [x, y, age] newest last, fading toward its tail: a longer trail is a faster molecule */
function trail(ctx, pts, color, w) {
  for (let i = 1; i < pts.length; i++) {
    const k = i / (pts.length - 1);
    ctx.save(); ctx.strokeStyle = alpha(color, 0.08 + 0.3 * k); ctx.lineWidth = w * (0.4 + 0.6 * k); ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(pts[i - 1][0], pts[i - 1][1]); ctx.lineTo(pts[i][0], pts[i][1]); ctx.stroke(); ctx.restore();
  }
}

/* the Maxwell-Boltzmann distribution of speeds u (m/s) for molar mass M (g/mol) at T (K), per m/s */
const kg = (M) => M / 1000;
const mb = (u, M, T) => { const a = kg(M) / (2 * R8 * T); return 4 * Math.PI * Math.pow(a / Math.PI, 1.5) * u * u * Math.exp(-a * u * u); };
const up = (M, T) => Math.sqrt((2 * R8 * T) / kg(M));
const urms = (M, T) => Math.sqrt((3 * R8 * T) / kg(M));
const peak = (M, T) => mb(up(M, T), M, T);
/* the frame for one gas: speeds to 1.55 u_rms at 1000 K, rounded up to 500 m/s; heights to the round value above the peak at 100 K */
const xmaxFor = (M) => Math.ceil((1.55 * urms(M, 1000)) / 500) * 500;
const yFor = (M) => F.nice(0, peak(M, 100), 4);
const gauss = () => { let a = 0; while (!a) a = Math.random(); return Math.sqrt(-2 * Math.log(a)) * Math.cos(TAU * Math.random()); };
/* one velocity drawn from the distribution: three components, each normal with variance RT/M */
const draw3 = (M, T) => { const s = Math.sqrt((R8 * T) / kg(M)); return [gauss() * s, gauss() * s, gauss() * s]; };

/* =====================================================================
   FIGURE 9.31: the book's three pairs of piston cylinders as one pair, in
   section: the baseline on the left, the changed sample on the right, the
   law chosen above. Every molecule travels in a straight line and turns
   only at a wall, the floor or the piston, and every such collision is
   counted with its force (the component of the velocity it reverses), so
   the bars read collisions on a unit of wall each second, times the force
   of each, equals the pressure, each as the changed sample's count over
   the baseline's.
   The changed cylinder holds the baseline's own molecules: the same
   velocities, scaled by √(T/300 K). The molecules come in pairs of one
   speed a quarter turn apart, so Σ|v_x| = Σ|v_y| and Σv_x² = Σv_y² over
   the sample and the long-run counts are exactly an isotropic gas's. Each
   count opens on 3000 s of the same motion run ahead, so the ratios are
   settled when the figure appears. Lengths are canvas units: the centres
   move in a region WC wide and HC (baseline), HC / 2 or 2 HC tall, and
   the drawn gas is that region with a molecule's radius RC round it.
   Moving: the rate of striking is the idea, so the figure runs
   continuously with the transport and no scrubber.
===================================================================== */
(function () {
  const d = sim('sim-kmt', 620);
  const law = F.choice(d.controls, { label: '\\text{law}', aria: 'the gas law the kinetic-molecular theory explains', options: [{ value: 'amontons', label: 'Amontons’s law' }, { value: 'boyle', label: 'Boyle’s law' }, { value: 'avogadro', label: 'Avogadro’s law' }], value: 'amontons', ms: 900, onInput: change });
  const WC = 236, HC = 160, RC = 12, FLOOR = 510, TOP = 158, U0 = 170, AHEAD = 3000;
  const XL = [150, 500], WD = WC + 2 * RC;                         /* the inner left wall of each cylinder, and the drawn inner width */
  const SPEC = { amontons: { h: 1, T: 600, name: 'heated' }, boyle: { h: 0.5, T: 300, name: 'volume decreased' }, avogadro: { h: 2, T: 300, name: 'gas added' } };
  const fast = (L) => Math.sqrt(SPEC[L].T / 300);
  const sign = () => (Math.random() < 0.5 ? -1 : 1);
  /* three pairs of one speed each, the two of a pair a quarter turn apart; the speeds' root mean square is U0 */
  function pairs() {
    const out = [];
    for (const s of [0.72, 1, 1.22]) {
      const a = 0.25 + Math.random() * (Math.PI / 2 - 0.5), c = U0 * s * Math.cos(a), q = U0 * s * Math.sin(a);
      out.push({ v: [c * sign(), q * sign()] }, { v: [q * sign(), c * sign()] });
    }
    return out;
  }
  const scatter = (ms, h) => ms.forEach((m) => { m.x = [Math.random() * WC, Math.random() * h]; m.a = Math.random() * TAU; m.tr = []; });
  /* one step of free flight in a region WC by h; a collision reverses one component and is counted with that component's size */
  function fly(ms, h, dt, tally, mark) {
    for (const m of ms) {
      m.x[0] += m.v[0] * dt; m.x[1] += m.v[1] * dt;
      if (m.x[0] < 0) { m.x[0] = -m.x[0]; m.v[0] = -m.v[0]; tally.n++; tally.f += Math.abs(m.v[0]); if (mark) mark(0, m.x[1], 'v', Math.abs(m.v[0])); }
      else if (m.x[0] > WC) { m.x[0] = 2 * WC - m.x[0]; m.v[0] = -m.v[0]; tally.n++; tally.f += Math.abs(m.v[0]); if (mark) mark(WC, m.x[1], 'v', Math.abs(m.v[0])); }
      if (m.x[1] < 0) { m.x[1] = -m.x[1]; m.v[1] = -m.v[1]; tally.n++; tally.f += Math.abs(m.v[1]); if (mark) mark(m.x[0], 0, 'h', Math.abs(m.v[1])); }
      else if (m.x[1] > h) { m.x[1] = Math.max(0, 2 * h - m.x[1]); m.v[1] = -Math.abs(m.v[1]); tally.n++; tally.f += Math.abs(m.v[1]); if (mark) mark(m.x[0], h, 'h', Math.abs(m.v[1])); }
    }
    tally.t += dt;
  }
  /* the count a sample opens on: the same molecules run AHEAD seconds on, in a copy */
  function ahead(ms, h) {
    const copy = ms.map((m) => ({ x: [m.x[0], Math.min(m.x[1], h)], v: [m.v[0], m.v[1]] })), tally = { n: 0, f: 0, t: 0 };
    for (let i = 0; i < AHEAD * 60; i++) fly(copy, h, 1 / 60, tally, null);
    return tally;
  }
  const base = { ms: pairs(), h: HC, marks: [] }, chg = { ms: [], extra: [], h: HC, marks: [] };
  scatter(base.ms, HC); base.tally = ahead(base.ms, HC);
  /* the changed sample is the baseline's molecules where they stand, their velocities scaled; the six more of Avogadro's law repeat the six speeds */
  chg.ms = base.ms.map((m) => ({ x: [m.x[0], m.x[1]], v: [m.v[0] * fast(law.value), m.v[1] * fast(law.value)], a: m.a + 1, tr: [] }));
  chg.extra = base.ms.map((m) => ({ x: [0, 0], v: [m.v[1] * sign(), m.v[0] * sign()], a: 0, tr: [] }));
  let was = law.value;
  const counted = () => (law.value === 'avogadro' ? chg.ms.concat(chg.extra) : chg.ms);
  function settle() { chg.tally = ahead(counted(), SPEC[law.value].h * HC); }
  function change() {
    const k = fast(law.value) / fast(was); chg.ms.forEach((m) => { m.v[0] *= k; m.v[1] *= k; });
    if (law.value === 'avogadro') scatter(chg.extra, chg.h);
    was = law.value; settle();
  }
  settle();
  let clock = 0;
  const marker = (c) => (x, y, wall, f) => c.marks.push({ x, y, wall, f, t: clock });
  const track = (ms, dt) => ms.forEach((m) => { m.tr.push([m.x[0], m.x[1], clock]); while (m.tr.length > 1 && clock - m.tr[0][2] > 0.16) m.tr.shift(); m.a += 0.9 * dt; });
  function step(dt) {
    clock += dt;
    fly(base.ms, HC, dt, base.tally, marker(base)); track(base.ms, dt);
    /* the piston is on its way while the law changes: the molecules stay under it, and the count waits for it to arrive */
    chg.h = law.mix((L) => SPEC[L].h * HC);
    const moving = law.k < 1, here = law.a('avogadro') > 0 ? chg.ms.concat(chg.extra) : chg.ms;
    fly(here, chg.h, dt, moving ? { n: 0, f: 0, t: 0 } : chg.tally, marker(chg)); track(here, dt);
    for (const c of [base, chg]) c.marks = c.marks.filter((k) => clock - k.t < 0.7);
  }
  const cy = cycle(() => Infinity, 0);
  let hits = []; F.hover(d.stage, () => hits);
  /* one cylinder in section: walls and floor in the referent's hue, the gas in the volume hue under the piston, the plate and its rod in ink */
  function cylinder(ctx, i, c, ms, name, T, vol) {
    const x0 = XL[i], col = F.ref(i ? 'changed' : 'baseline'), pb = FLOOR - c.h - 2 * RC;   /* the piston's underside */
    ctx.save(); ctx.fillStyle = alpha(C('volume'), 0.14); ctx.fillRect(x0, pb, WD, FLOOR - pb); ctx.restore();
    ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = 10; ctx.lineJoin = 'round'; ctx.lineCap = 'butt';
    ctx.beginPath(); ctx.moveTo(x0 - 5, TOP); ctx.lineTo(x0 - 5, FLOOR + 5); ctx.lineTo(x0 + WD + 5, FLOOR + 5); ctx.lineTo(x0 + WD + 5, TOP); ctx.stroke(); ctx.restore();
    ctx.save(); ctx.fillStyle = PAL.soft; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.rect(x0 + WD / 2 - 6, pb - 14 - 50, 12, 50); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.rect(x0 + WD / 2 - 26, pb - 14 - 60, 52, 10); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.rect(x0 + 1, pb - 14, WD - 2, 14); ctx.fill(); ctx.stroke(); ctx.restore();
    const sx = (m) => x0 + RC + m.x[0], sy = (m) => FLOOR - RC - Math.min(m.x[1], c.h);
    ms.forEach((m) => {
      ctx.save(); ctx.globalAlpha = m.fade ?? 1;
      trail(ctx, m.tr.map((p) => [x0 + RC + p[0], FLOOR - RC - Math.min(p[1], c.h)]).concat([[sx(m), sy(m)]]), F.el('N'), 11);
      molecule(ctx, 'N₂', sx(m), sy(m), m.a, 1.3); ctx.restore();
      if ((m.fade ?? 1) > 0.5) hits.push({ x: sx(m), y: sy(m), r: 17, name: molName('N₂') });
    });
    /* a collision's mark lies along the wall where it struck, longer for a harder strike, and fades */
    c.marks.forEach((k) => {
      const a = 1 - (clock - k.t) / 0.7, len = 7 + 15 * (k.f / U0), px = k.wall === 'v' ? x0 + (k.x ? WD : 0) : x0 + RC + k.x, py = k.wall === 'h' ? (k.y ? pb : FLOOR) : FLOOR - RC - k.y;
      if (k.wall === 'v') line(ctx, px, Math.max(pb + 2, py - len), px, Math.min(FLOOR - 2, py + len), alpha(PAL.ink, 0.9 * a), 6);
      else line(ctx, Math.max(x0 + 2, px - len), py, Math.min(x0 + WD - 2, px + len), py, alpha(PAL.ink, 0.9 * a), 6);
    });
    for (let q = 0; q < 5; q++) hits.push({ x: x0 + 20 + (q * (WD - 40)) / 4, y: pb - 7, r: 22, name: 'the piston' });
    /* the bracket spans the gas; its volume is written under the cylinder with the temperature, clear of the gas at any width */
    const bx = i ? x0 + WD + 30 : x0 - 30;
    F.vbracket(ctx, bx, pb, FLOOR, C('volume'));
    for (let q = 0; q < 4; q++) hits.push({ x: bx, y: pb + ((FLOOR - pb) * (q + 0.5)) / 4, r: 24, name: 'the volume of the gas, ' + vol });
    text(ctx, name, x0 + WD / 2, 556, col, { size: 22, weight: 600, align: 'center' });
    F.rich(ctx, [[T + ' K', C('temperature')], ' · ', [vol, C('volume')]], x0 + WD / 2, 588, { size: 20, align: 'center' });
  }
  function draw() {
    const { ctx } = begin(d.c), L = law.value, S = SPEC[L];
    hits = [];
    chg.h = law.mix((v) => SPEC[v].h * HC);
    chg.extra.forEach((m) => { m.fade = law.a('avogadro'); });
    topline(ctx, L === 'amontons' ? `At $${hue('temperature', '600\\ \\text{K}')}$ the same molecules move 1.41 times as fast as at $${hue('temperature', '300\\ \\text{K}')}$.`
      : L === 'boyle' ? 'In half the volume the same molecules are twice as crowded and move no faster.'
      : 'Twice the molecules in twice the volume are no more crowded and move no faster.');
    cylinder(ctx, 0, base, base.ms, 'baseline', 300, '1.00 L');
    cylinder(ctx, 1, chg, law.a('avogadro') > 0 ? chg.ms.concat(chg.extra) : chg.ms, S.name, S.T, fmt(S.h, 2) + ' L');
    /* the bars: for each sample, collisions per unit of wall per second, the mean force of one, and their product, over the baseline's */
    const rate = (c, h) => c.tally.n / (c.tally.t * 2 * (WC + h)), force = (c) => c.tally.f / c.tally.n;
    const often = rate(chg, S.h * HC) / rate(base, HC), hard = force(chg) / force(base);
    /* each pair's name in full where it fits between its neighbours, and in two words where the pane is narrow */
    const full = (measure(ctx, 'of wall each second', { size: 18 }) + measure(ctx, 'each collision', { size: 18 })) / 2 < 158;
    const groups = [{ x: 975, v: often, t: full ? ['collisions on a unit', 'of wall each second'] : ['how often'] }, { x: 1140, v: hard, t: full ? ['force of', 'each collision'] : ['how hard'] }, { x: 1305, v: often * hard, t: ['pressure'], c: C('pressure') }];
    const UNIT = 130, cb = alpha(F.ref('baseline'), 0.85), cc = alpha(F.ref('changed'), 0.85);
    line(ctx, 895, FLOOR, 1375, FLOOR, PAL.muted, 2);
    groups.forEach((g) => {
      ctx.save(); ctx.fillStyle = cb; ctx.fillRect(g.x - 52, FLOOR - UNIT, 46, UNIT); ctx.fillStyle = cc; ctx.fillRect(g.x + 6, FLOOR - UNIT * g.v, 46, UNIT * g.v); ctx.restore();
      text(ctx, fmt(g.v, 2), g.x + 29, FLOOR - UNIT * g.v - 18, g.c ?? PAL.ink, { size: 20, align: 'center', weight: g.c ? 600 : 400 });
      g.t.forEach((s, j) => text(ctx, s, g.x, FLOOR + 28 + 24 * j, g.c ?? PAL.ink, { size: 18, align: 'center', weight: g.c ? 600 : 400 }));
    });
    text(ctx, '×', 1057, FLOOR - UNIT / 2, PAL.ink, { size: 30, align: 'center' });
    text(ctx, '=', 1222, FLOOR - UNIT / 2, PAL.ink, { size: 30, align: 'center' });
    const row = 150 + measure(ctx, 'baseline, counted as 1', { size: 17 }) + measure(ctx, S.name, { size: 17 }) < 480;
    legend(ctx, { l: 895, r: 1375, t: 112, b: FLOOR }, [{ s: 'baseline, counted as 1', kind: 'swatch', color: cb }, { s: S.name, kind: 'swatch', color: cc }], { corner: 'top', row });
    const K = (x) => hue('temperature', x + '\\ \\text{K}'), V = (x) => hue('volume', fmt(x, 2) + '\\ \\text{L}'), n = (x) => hue('amount', fmt(x, 4) + '\\ \\text{mol}');
    const n1 = 1 / (0.08206 * 300);
    tex(d.readout, L === 'amontons' ? `\\frac{\\kPtwo}{\\kPone} = \\frac{\\kTtwo}{\\kTone} = \\frac{${K(600)}}{${K(300)}} = 2`
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
   the book's five noble gases at the chosen temperature (9.34). Where
   the live curve is one of the family it is that member drawn heavy.
   The frame is fixed per gas from 100 K to 1000 K (xmaxFor and yFor);
   the gases keep the book's 0 to 3000 m/s, and 0 to 0.006 per m/s, which
   holds every peak but xenon's below 152 K; there its curve leaves the
   frame and its two points stand hollow at the edge. Still: a distribution
   answers its controls and has no clock.
===================================================================== */
(function () {
  const d = sim('sim-speeds', 520);
  const GASES = ['O₂', 'N₂', 'He', 'Ne', 'Ar', 'Kr', 'Xe'], NOBLE = ['Xe', 'Kr', 'Ar', 'Ne', 'He'], TEMPS = [100, 200, 500, 1000];
  const cmp = F.choice(d.controls, { label: '\\text{compare with}', aria: 'the curves drawn behind the live one', options: [{ value: 'one', label: 'none' }, { value: 'temps', label: 'temperatures' }, { value: 'gases', label: 'gases' }], value: 'one', ms: 0 });
  const gas = F.select(d.controls, { label: '\\text{gas}', aria: 'the gas', options: GASES.map((g) => ({ value: g, label: g })), value: 'O₂', ms: 0 });
  const Tc = ctl(d.controls, { label: '\\kT', cls: 'temperature', min: 100, max: 1000, step: 1, value: 300, unit: 'K', dec: 0, detents: [100, 200, 300, 500, 1000], aria: 'temperature of the gas in kelvin' });
  const REF = { Xe: 'xenon', Kr: 'krypton', Ar: 'argon', Ne: 'neon', He: 'helium' };
  const r1 = el('div'), r2 = el('div'); d.readout.append(r1, r2);
  const box = { l: 150, r: 1320, t: 70, b: 420 };
  function draw() {
    const { ctx } = begin(d.c);
    const g = gas.value, M = MOLS[g].m, T = Tc.v, mode = cmp.value, ny = yFor(M);
    const xmax = mode === 'gases' ? 3000 : xmaxFor(M), ymax = mode === 'gases' ? 0.006 : ny.hi;
    const ax = axes(ctx, box, [0, xmax], [0, ymax], { nx: xmax / 500, ny: mode === 'gases' ? 3 : ny.n, xl: 'speed u (m/s)', xc: C('velocity'), yl: 'fraction of molecules per m/s' });
    const { X, Y } = ax;
    /* the family behind the live curve; a member the live curve coincides with is the live curve */
    const fam = mode === 'temps' ? TEMPS.map((t, i) => ({ M, T: t, name: t + ' K', color: F.cat(i), live: t === T }))
      : mode === 'gases' ? NOBLE.map((n) => ({ M: MOLS[n].m, T, name: n, color: F.ref(REF[n]), live: n === g })) : [];
    const mine = fam.find((c) => c.live), liveColor = mode === 'gases' && mine ? mine.color : C('velocity');
    const f = (u) => mb(u, M, T);
    fam.forEach((c) => { if (!c.live) plot(ctx, ax, (u) => mb(u, c.M, c.T), c.color, { w: 3 }); });
    plot(ctx, ax, f, liveColor, { w: 5 });
    const p = up(M, T), q = urms(M, T), avoid = [];
    /* u_p's name stands to the left of its point and u_rms's to the right, each above the curve; where the left has no room, u_p's stands over u_rms's */
    const yp = Math.max(Y(f(p)), box.t), yq = Math.max(Y(f(q)), box.t), sp = 'u_{p} = ' + fmt(p, 0) + ' m/s', sq = 'u_{rms} = ' + fmt(q, 0) + ' m/s';
    const wp = measure(ctx, sp, { size: 20, weight: 600 }), wq = measure(ctx, sq, { size: 20, weight: 600 }), left = X(p) - 14 - wp > box.l + 8;
    const lp = left ? { x: X(p) - 14, y: Math.max(yp - 16, box.t + 14), align: 'right' } : { x: X(q) + 14, y: Math.max(yq - 48, box.t + 14), align: 'left' };
    const lq = { x: X(q) + 14, y: left ? Math.max(yq - 16, box.t + 14) : Math.max(yq - 16, lp.y + 30), align: 'left' };
    [[p, yp, sp, wp, lp], [q, yq, sq, wq, lq]].forEach(([u, y, str, w, at]) => {
      line(ctx, X(u), y, X(u), box.b, alpha(PAL.ink, 0.5), 2, [4, 8]);
      dot(ctx, X(u), y, PAL.ink, Y(f(u)) >= box.t, 6);   /* hollow at the frame's edge where the point lies above it */
      text(ctx, str, at.x, at.y, C('velocity'), { size: 20, weight: 600, align: at.align, bg: PAL.panel });
      const l = at.align === 'right' ? at.x - w : at.x; avoid.push({ l: l - 8, r: l + w + 8, t: at.y - 18, b: at.y + 18 });
    });
    if (fam.length) {
      const entries = fam.map((c) => ({ s: c.name, color: c.live ? liveColor : c.color, w: c.live ? 5 : 3, f: (u) => mb(u, c.M, c.T) }));
      if (!mine) entries.push({ s: mode === 'temps' ? T + ' K' : g, color: liveColor, w: 5, f });
      legend(ctx, ax, entries, { avoid });
    }
    tex(r1, `\\kurms = \\sqrt{\\frac{3R\\kT}{\\kMM}} = \\sqrt{\\frac{3(8.314\\ \\text{J/mol K})(${hue('temperature', T + '\\ \\text{K}')})}{${hue('mass', fmt(kg(M), 4) + '\\ \\text{kg/mol}')}}} = ${hue('velocity', fmt(q, 0) + '\\ \\text{m/s}')}`);
    tex(r2, `\\kKEavg = \\frac{3}{2}R\\kT = \\frac{3}{2}(8.314\\ \\text{J/mol K})(${hue('temperature', T + '\\ \\text{K}')}) = ${hue('energy', fmt(1.5 * R8 * T, 0) + '\\ \\text{J/mol}')}\\ \\text{for every gas}`);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   SIM: a box of gas and a count of its speeds. The molecules move in
   three dimensions in a box seen from the front; each collides at random
   about six times in five seconds and leaves with a velocity drawn from
   the Maxwell-Boltzmann distribution at the box's temperature, and every
   new speed adds one to the histogram beside the box, which builds up
   under the curve. A change of temperature or gas clears the count, and
   the molecules take up the new distribution one collision at a time.
   The speed axis is the gas's own (xmaxFor) in NB bins; the bars are a
   density (count over total and bin width) on the curve's fixed scale
   (yFor). On the canvas a molecule covers KS units a second for each m/s.
   Moving: the count grows with time.
===================================================================== */
(function () {
  const d = sim('sim-gasbox', 520);
  const GASES = ['He', 'N₂', 'Ar', 'Xe'];
  const gas = F.choice(d.controls, { label: '\\text{gas}', aria: 'the gas in the box', options: GASES.map((g) => ({ value: g, label: g })), value: 'N₂', ms: 0, onInput: clear });
  const Tc = ctl(d.controls, { label: '\\kT', cls: 'temperature', min: 100, max: 1000, step: 1, value: 300, unit: 'K', dec: 0, detents: [100, 300, 500, 1000], onInput: clear, aria: 'temperature of the gas in kelvin' });
  const BX = 70, BY = 100, S = 360, RM = 14, N = 30, KS = 0.28, RATE = 1.2, NB = 30;
  let P = [], bins = [], fresh = [], total = 0, sumsq = 0, xmax = 1500, clock = 0;
  function clear() { bins = new Array(NB).fill(0); fresh = new Array(NB).fill(0); total = 0; sumsq = 0; xmax = xmaxFor(MOLS[gas.value].m); }
  function tally(w) { const s = Math.hypot(w[0], w[1], w[2]), b = Math.floor((s / xmax) * NB); total++; sumsq += s * s; if (b < NB) { bins[b]++; fresh[b]++; } }
  function seed() {
    const M = MOLS[gas.value].m, span = S - 2 * RM; P = [];
    for (let i = 0; i < N; i++) { const w = draw3(M, Tc.v); P.push({ x: [Math.random() * span, Math.random() * span, Math.random() * span], w, a: Math.random() * TAU, tr: [], hit: -9 }); tally(w); }
  }
  clear(); seed();
  function step(dt) {
    const M = MOLS[gas.value].m, span = S - 2 * RM;
    clock += dt;
    for (const q of P) {
      for (let k = 0; k < 3; k++) { q.x[k] += q.w[k] * KS * dt; if (q.x[k] > span) { q.x[k] = Math.max(0, 2 * span - q.x[k]); q.w[k] = -Math.abs(q.w[k]); } else if (q.x[k] < 0) { q.x[k] = Math.min(span, -q.x[k]); q.w[k] = Math.abs(q.w[k]); } }
      if (Math.random() < RATE * dt) { q.w = draw3(M, Tc.v); tally(q.w); q.hit = clock; }
      q.tr.push([q.x[0], q.x[1], clock]); while (q.tr.length > 1 && clock - q.tr[0][2] > 0.12) q.tr.shift();
      q.a += 0.9 * dt;
    }
    /* the newest counts stand out on top of their bars for about half a second */
    const keep = Math.exp(-dt / 0.5); for (let i = 0; i < NB; i++) fresh[i] *= keep;
  }
  const cy = cycle(() => Infinity, 0);
  let hits = []; F.hover(d.stage, () => hits);
  const gbox = { l: 590, r: 1340, t: 150, b: 410 };
  function draw() {
    const { ctx } = begin(d.c), g = gas.value, M = MOLS[g].m, T = Tc.v, q = urms(M, T), ny = yFor(M), bw = xmax / NB;
    hits = [];
    const seen = total ? Math.sqrt(sumsq / total) : 0;
    topline(ctx, 'The root mean square of the ' + total + ' speeds counted so far is ' + fmt(seen, 0) + ' m/s.');
    /* the box, from the front */
    ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.04); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.beginPath(); ctx.rect(BX, BY, S, S); ctx.fill(); ctx.stroke(); ctx.restore();
    const sx = (x) => BX + RM + x, sy = (y) => BY + S - RM - y, colour = F.el(MOLS[g].atoms[0][0]);
    P.forEach((m) => {
      trail(ctx, m.tr.map((p) => [sx(p[0]), sy(p[1])]).concat([[sx(m.x[0]), sy(m.x[1])]]), colour, 9);
      molecule(ctx, g, sx(m.x[0]), sy(m.x[1]), m.a, 1.2);
      const age = clock - m.hit;
      if (age < 0.22) { ctx.save(); ctx.strokeStyle = alpha(PAL.ink, 0.6 * (1 - age / 0.22)); ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(sx(m.x[0]), sy(m.x[1]), 13 + 30 * age, 0, TAU); ctx.stroke(); ctx.restore(); }
      hits.push({ x: sx(m.x[0]), y: sy(m.x[1]), r: 15, name: molName(g) + ', at ' + fmt(Math.hypot(m.w[0], m.w[1], m.w[2]), 0) + ' m/s' });
    });
    text(ctx, MOLS[g].word + ', ' + g, BX + S / 2, BY + S + 30, PAL.ink, { size: 20, weight: 600, align: 'center' });
    /* the histogram of the speeds counted, with the distribution over it */
    const ax = axes(ctx, gbox, [0, xmax], [0, ny.hi], { nx: xmax / 500, ny: ny.n, xl: 'speed u (m/s)', xc: C('velocity'), yl: 'fraction of molecules per m/s' });
    const { X, Y } = ax, cr = F.ref('speed-count'), f = (u) => mb(u, M, T);
    ctx.save(); ctx.beginPath(); ctx.rect(gbox.l, gbox.t, gbox.r - gbox.l, gbox.b - gbox.t); ctx.clip();
    if (total) bins.forEach((c, i) => {
      const h = c / (total * bw), hf = Math.min(c, fresh[i]) / (total * bw), x = X(i * bw) + 1, w = X(bw) - X(0) - 2;
      ctx.fillStyle = alpha(cr, 0.6); ctx.fillRect(x, Y(h), w, gbox.b - Y(h));
      ctx.fillStyle = cr; ctx.fillRect(x, Y(h), w, Y(h - hf) - Y(h));
    });
    ctx.restore();
    plot(ctx, ax, f, C('velocity'), { w: 4 });
    line(ctx, X(q), gbox.t, X(q), gbox.b, C('velocity'), 2, [10, 10]);
    const right = X(q) + 12 + measure(ctx, 'u_{rms}', { size: 20, weight: 600 }) < gbox.r;
    text(ctx, 'u_{rms}', X(q) + (right ? 10 : -10), gbox.t + 16, C('velocity'), { size: 20, weight: 600, align: right ? 'left' : 'right', bg: PAL.panel });
    legend(ctx, ax, [{ s: 'speeds counted', kind: 'swatch', color: alpha(cr, 0.8) }, { s: 'Maxwell-Boltzmann distribution', color: C('velocity'), w: 4 }], { corner: 'below' });
    tex(d.readout, `\\kurms = \\sqrt{\\frac{3R\\kT}{\\kMM}} = \\sqrt{\\frac{3(8.314\\ \\text{J/mol K})(${hue('temperature', T + '\\ \\text{K}')})}{${hue('mass', fmt(kg(M), 4) + '\\ \\text{kg/mol}')}}} = ${hue('velocity', fmt(q, 0) + '\\ \\text{m/s}')}`);
  }
  register(d.fig, { update: (dt) => { cy.step(dt, () => 1); step(Math.min(dt, 0.05)); }, draw });
})();
};
