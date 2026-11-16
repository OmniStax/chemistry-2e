/* Figures for section 15.1 Precipitation and Dissolution. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['15.1'] = function (root, F) {
const { C, PAL, alpha, ctl, register, begin, line, text, dot, topline } = F;
const sim = (id, H) => F.sim(root, id, H);
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;
const TAU = 2 * Math.PI;
const SUP = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
const sup = (n) => String(n).split('').map((c) => SUP[c]).join('');
const pow10 = (k) => (k === 0 ? '1' : '10' + sup(k));
/* x to n significant figures as [mantissa, exponent], the mantissa a string */
function sig(x, n = 2) {
  let e = Math.floor(Math.log10(x)), m = (x / 10 ** e).toFixed(n - 1);
  if (+m >= 10) { e += 1; m = (x / 10 ** e).toFixed(n - 1); }
  return [m, e];
}
const round2 = (x) => { const [m, e] = sig(x); return +m * 10 ** e; };
const sciText = (x) => { const [m, e] = sig(x); return e >= -2 && e <= 0 ? (+m * 10 ** e).toFixed(1 - e) : `${m} × 10${sup(e)}`; };
const sciTex = (x, n = 2) => { const [m, e] = sig(x, n); return e >= -2 && e <= 0 ? (+m * 10 ** e).toFixed(n - 1 - e) : `${m} \\times 10^{${e}}`; };
/* a seeded generator, so a scene is the same on every load */
function rng(seed) { let a = seed >>> 0; return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
function ball(ctx, x, y, r, fill) {
  ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fillStyle = fill; ctx.fill();
  ctx.lineWidth = 1.5; ctx.strokeStyle = alpha(PAL.ink, 0.5); ctx.stroke(); ctx.restore();
}
/* a beaker standing on its base: straight walls, a rounded foot, a flared rim with a spout at the left */
function beakerPath(ctx, B) {
  const l = B.x - B.half, r = B.x + B.half;
  ctx.beginPath();
  ctx.moveTo(l - 16, B.top - 8); ctx.quadraticCurveTo(l - 2, B.top - 2, l, B.top + 14);
  ctx.lineTo(l, B.base - 14); ctx.quadraticCurveTo(l, B.base, l + 14, B.base);
  ctx.lineTo(r - 14, B.base); ctx.quadraticCurveTo(r, B.base, r, B.base - 14);
  ctx.lineTo(r, B.top + 8); ctx.quadraticCurveTo(r, B.top, r + 6, B.top - 2);
}
function beakerWater(ctx, B) {
  ctx.save(); beakerPath(ctx, B); ctx.closePath(); ctx.clip(); ctx.fillStyle = alpha(PAL.muted, 0.16); ctx.fillRect(B.x - B.half, B.lv, 2 * B.half, B.base - B.lv); ctx.restore();
  line(ctx, B.x - B.half + 2, B.lv, B.x + B.half - 2, B.lv, alpha(PAL.ink, 0.45), 1.5);
}
function beakerGlass(ctx, B) {
  ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; beakerPath(ctx, B); ctx.stroke(); ctx.restore();
}

/* =====================================================================
   FIGURE 15.2: silver chloride in a beaker of water, flat. A rock-salt
   face of 32 places (8 by 4, Ag+ and Cl- alternating, radii in the ratio
   of 1.15 to 1.81 Å) lies on the floor of the beaker among 15 water
   molecules, every particle in view. Ion pairs leave the surface of the
   solid at a steady rate, RD = 2 pairs per unit time, and dissolved ions
   return at RD (n/3)², the rate law of a step that needs one Ag+ and
   one Cl-, so the n pairs in solution obey dn/dt = RD (1 − n²/9) and
   settle at three (one Ag+ to five water molecules, as the note says).
   Two starts, the same 32 ions in each: the whole solid in pure water,
   n = 3 tanh(2t/3), and a supersaturated solution of five pairs over a
   smaller solid, n = 3 coth(2t/3 + atanh(3/5)). A return is scheduled
   where the smooth count returned, RD t + n(0) − n(t), passes a
   half-integer. Beside the beaker the two rates against time; the
   readout writes [Ag+][Cl-] from the smooth count, 1.26 × 10^-5 M each
   at three pairs, so it ends on K_sp = 1.6 × 10^-10 from either side.
   Positions are functions of the clock alone, so the timeline scrubs
   exactly. Rates and time are schematic: no ticks.
===================================================================== */
(function () {
  const H = 660, d = sim('sim-agcl', H);
  const T = 6, TR = 0.8, RD = 2, NEQ = 3, G = RD / NEQ, NSUPER = 5, CEQ = 1.26e-5, KSP = 1.6e-10;
  const NAME = { Ag: 'a silver ion, Ag⁺', Cl: 'a chloride ion, Cl⁻' };
  const RAD = { Ag: 15, Cl: 24 };
  /* the beaker: centre, half width, rim, base; the water stands at lv */
  const BK = { x: 330, half: 270, top: 96, base: 592, lv: 150 };
  /* the solid: an 8 by 4 face of the lattice resting on the floor, spacing 46 */
  const SP = 46, COLS = 8, ROWS = 4, sites = [];
  for (let j = 0; j < ROWS; j++) for (let i = 0; i < COLS; i++) {
    sites.push({ kind: (i + j) % 2 ? 'Cl' : 'Ag', i, j, p: [BK.x + (i - (COLS - 1) / 2) * SP, BK.base - 28 - j * SP] });
  }
  const siteAt = (i, j) => (i < 0 || i >= COLS || j < 0 || j >= ROWS ? -1 : j * COLS + i);
  /* places in the water on a staggered grid, nudged off their centres, clear of the solid: 15 for water molecules, the rest for dissolved ions */
  const place = rng(1502);
  const solidBox = { l: sites[0].p[0] - 40, r: sites[COLS - 1].p[0] + 40, t: sites[sites.length - 1].p[1] - 45 };
  const slots = [];
  for (let r = 0; BK.lv + 42 + r * 62 <= BK.base - 30; r++) for (let c = 0; ; c++) {
    const x = BK.x - BK.half + 40 + c * 74 + (r % 2 ? 37 : 0), y = BK.lv + 42 + r * 62;
    if (x > BK.x + BK.half - 38) break;
    if (x > solidBox.l && x < solidBox.r && y > solidBox.t) continue;
    slots.push([x + (place() - 0.5) * 8, y + (place() - 0.5) * 6]);
  }
  for (let i = slots.length - 1; i > 0; i--) { const j = Math.floor(place() * (i + 1)); [slots[i], slots[j]] = [slots[j], slots[i]]; }
  const waterSlots = slots.slice(0, 15), ionSlots = slots.slice(15);

  /* one run from n0 pairs in solution: who leaves and who returns, and when */
  function makeRun(n0, seed) {
    const rand = rng(seed), c0 = n0 ? Math.atanh(NEQ / n0) : 0;
    const nSmooth = n0 ? (t) => NEQ / Math.tanh(G * t + c0) : (t) => NEQ * Math.tanh(G * t);
    const back = (t) => RD * t + n0 - nSmooth(t), rateIn = (t) => RD * (nSmooth(t) / NEQ) ** 2;
    const outs = [], ins = [];
    for (let i = 0; (i + 0.5) / RD < T - 0.3; i++) outs.push((i + 0.5) / RD);
    for (let j = 1; back(T) >= j - 0.5; j++) {
      let lo = 0, hi = T;
      for (let n = 0; n < 50; n++) { const m = (lo + hi) / 2; if (back(m) < j - 0.5) lo = m; else hi = m; }
      ins.push(hi);
    }
    /* the ions that start in solution leave the top of the block: the top row, then the right end of the row beneath */
    const order = [];
    for (let j = ROWS - 1; j >= 0; j--) for (let i = COLS - 1; i >= 0; i--) order.push(siteAt(i, j));
    const startOut = new Set();
    ['Ag', 'Cl'].forEach((kind) => order.filter((s) => sites[s].kind === kind).slice(0, n0).forEach((s) => startOut.add(s)));
    const slotFree = ionSlots.map(() => true);
    const takeSlot = () => { const free = slotFree.map((f, k) => (f ? k : -1)).filter((k) => k >= 0), k = free.length ? free[Math.floor(rand() * free.length)] : 0; slotFree[k] = false; return k; };
    const ions = sites.map((s, i) => ({ kind: s.kind, home: startOut.has(i) ? -1 : i, trips: startOut.has(i) ? [{ t0: -99, from: -1, slot: takeSlot(), ph: [rand() * TAU, rand() * TAU] }] : [] }));
    const at = sites.map((_, i) => (startOut.has(i) ? -1 : i));         /* the ion on each site, or -1 */
    const away = ions.filter((o) => o.home < 0);
    const full = (i, j) => { const k = siteAt(i, j); return k >= 0 && at[k] >= 0; };
    const events = [...outs.flatMap((t) => [[t, 'out', 'Ag'], [t, 'out', 'Cl']]), ...ins.flatMap((t) => [[t, 'in', 'Ag'], [t, 'in', 'Cl']])].sort((a, b) => a[0] - b[0]);
    for (const [t, what, kind] of events) {
      if (what === 'out') {
        /* an ion leaves from the top of its column, the highest first */
        const cand = sites.map((_, i) => i).filter((i) => sites[i].kind === kind && at[i] >= 0 && !full(sites[i].i, sites[i].j + 1));
        if (!cand.length) continue;
        cand.sort((a, b) => sites[b].j - sites[a].j || rand() - 0.5);
        const s = cand[Math.floor(rand() * Math.min(3, cand.length))], ion = ions[at[s]];
        at[s] = -1; ion.trips.push({ t0: t, from: s, slot: takeSlot(), ph: [rand() * TAU, rand() * TAU] }); away.push(ion);
      } else {
        /* the ion longest in solution returns to a vacant place of its own kind that rests on the floor or on the ion below, the lowest first */
        const k = away.findIndex((o) => o.kind === kind && o.trips[o.trips.length - 1].t0 + TR <= t - TR);
        const cand = sites.map((_, i) => i).filter((i) => sites[i].kind === kind && at[i] < 0 && (sites[i].j === 0 || full(sites[i].i, sites[i].j - 1)));
        if (k < 0 || !cand.length) continue;
        cand.sort((a, b) => sites[a].j - sites[b].j || rand() - 0.5);
        const s = cand[0], ion = away.splice(k, 1)[0], tr = ion.trips[ion.trips.length - 1];
        tr.t1 = t; tr.to = s; at[s] = ions.indexOf(ion); slotFree[tr.slot] = true;
      }
    }
    const dissolved = (t, kind) => ions.filter((o) => o.kind === kind && o.trips.some((tr) => tr.t0 <= t && (tr.t1 === undefined || t < tr.t1))).length;
    return { ions, nSmooth, rateIn, dissolved };
  }
  const RUNS = { solid: makeRun(0, 1502), super: makeRun(NSUPER, 2051) };
  const start = F.choice(d.controls, {
    label: '\\text{start with}', key: 'start', aria: 'what the beaker starts with', value: 'solid',
    options: [{ value: 'solid', label: 'solid in pure water' }, { value: 'super', label: 'a supersaturated solution' }],
    onInput: () => cy.reset(),
  });

  const smooth = F.ease.smooth;
  const bez = (a, c, b, k) => [0, 1].map((i) => (1 - k) * (1 - k) * a[i] + 2 * k * (1 - k) * c[i] + k * k * b[i]);
  const wander = (tr, t) => { const c = ionSlots[tr.slot]; return [c[0] + 5 * Math.sin(1.3 * t + tr.ph[0]), c[1] + 4 * Math.sin(1.1 * t + tr.ph[1])]; };
  const lift = (p) => [p[0] + (p[0] - BK.x) * 0.3, p[1] - 70];
  /* where an ion is at t, and whether it sits in the solid */
  function where(ion, t) {
    let s = ion.home;
    for (const tr of ion.trips) {
      if (t < tr.t0) break;
      const w = wander(tr, t);
      if (tr.from >= 0 && t < tr.t0 + TR) { const p0 = sites[tr.from].p; return [bez(p0, lift(p0), w, smooth((t - tr.t0) / TR)), false]; }
      if (tr.t1 === undefined || t < tr.t1 - TR) return [w, false];
      const p1 = sites[tr.to].p;
      if (t < tr.t1) return [bez(w, lift(p1), p1, smooth((t - (tr.t1 - TR)) / TR)), false];
      s = tr.to;
    }
    return [sites[s].p, true];
  }
  /* water: bent molecules (104.5°) at their places, each jiggling and turning a little */
  const turn = rng(77), waters = waterSlots.map((p) => ({ p, a: turn() * TAU, ph: turn() * TAU }));
  const HW = 52.25 * Math.PI / 180;
  function water(ctx, x, y, a) {
    [-1, 1].forEach((s) => ball(ctx, x + 20 * Math.cos(a + s * HW), y + 20 * Math.sin(a + s * HW), 11, F.el('H')));
    ball(ctx, x, y, 19, F.el('O'));
  }
  function ion(ctx, kind, x, y) { ball(ctx, x, y, RAD[kind], F.el(kind)); hits.push({ x, y, r: RAD[kind] + 2, name: NAME[kind] }); }

  const cy = F.cycle(() => T, 1.2);
  let hits = [];
  F.hover(d.stage, () => hits);
  const ro = F.readout(d), NOTE = 'A saturated solution holds one Ag⁺ ion for every 4.4 million water molecules; the beaker draws one for every five.';
  /* rates from 0 to 6: the supersaturated start opens at RD (5/3)² = 5.6 */
  const GB = { l: 770, r: 1340, t: 170, b: 570 };
  function draw() {
    const { ctx } = begin(d.c);
    const run = RUNS[start.value], sup0 = start.value === 'super';
    const t = cy.now(), n = run.dissolved(t, 'Ag'), ns = run.nSmooth(t);
    hits = [];
    /* the ion product on its way to K_sp, from factors as they are written */
    const x = CEQ * ns / NEQ, cx = x > 1e-7 ? sciTex(x, 3) : '0', xr = x > 1e-7 ? +sig(x, 3)[0] * 10 ** sig(x, 3)[1] : 0;
    const q = xr * xr, qr = q > 0 ? round2(q) : 0, how = Math.abs(qr / KSP - 1) < 0.01 ? '=' : qr > KSP ? '\\gt' : '\\lt';
    const settled = how === '=';
    topline(ctx, settled ? 'Ions now leave the solid and return to it at the same rate, so the number dissolved holds steady.'
      : sup0 ? `Ions return to the solid faster than they leave it: ${n} Ag⁺ and ${n} Cl⁻ are still dissolved.`
        : `Ions leave the solid faster than they return: ${n} Ag⁺ and ${n} Cl⁻ are dissolved so far.`);
    /* the water, the particles, then the glass over them */
    beakerWater(ctx, BK);
    waters.forEach((m) => {
      const x = m.p[0] + 4 * Math.sin(2.1 * t + m.ph), y = m.p[1] + 3 * Math.sin(1.7 * t + 2 * m.ph);
      water(ctx, x, y, m.a + 0.25 * Math.sin(0.9 * t + m.ph)); hits.push({ x, y, r: 26, name: 'a water molecule, H₂O' });
    });
    /* the solid first, then the ions on their way or in solution, so a moving ion passes in front */
    const pos = run.ions.map((o) => where(o, t));
    run.ions.forEach((o, i) => { if (pos[i][1]) ion(ctx, o.kind, pos[i][0][0], pos[i][0][1]); });
    run.ions.forEach((o, i) => { if (!pos[i][1]) ion(ctx, o.kind, pos[i][0][0], pos[i][0][1]); });
    beakerGlass(ctx, BK);
    /* the solid named beside it, through the glass; the three kinds of particle under the beaker */
    const sx = sites[COLS - 1].p[0] + RAD.Cl + 6, sy = BK.base - 28 - SP / 2;
    line(ctx, sx, sy, BK.x + BK.half + 22, sy, alpha(PAL.ink, 0.5), 1.5, [4, 6]);
    text(ctx, 'solid AgCl', BK.x + BK.half + 30, sy, PAL.ink, { size: 20 });
    F.legend(ctx, { l: BK.x - BK.half, r: BK.x + BK.half, t: BK.base, b: H }, [
      { s: 'Ag⁺', draw: (c, x, y) => ball(c, x, y, 9, F.el('Ag')) }, { s: 'Cl⁻', draw: (c, x, y) => ball(c, x, y, 11, F.el('Cl')) },
      { s: 'water', draw: (c, x, y) => { [-1, 1].forEach((s) => ball(c, x + 9 * Math.cos(-Math.PI / 2 + s * HW), y - 1 + 9 * Math.sin(-Math.PI / 2 + s * HW), 5, F.el('H'))); ball(c, x, y + 2, 8, F.el('O')); } },
    ], { corner: 'top', row: true, panel: false, size: 18 });
    /* the two rates against time */
    const ax = F.axes(ctx, GB, [0, T], [0, 6], { nx: 0, ny: 0, xl: 'time', xc: C('time'), yl: 'rate', yc: C('rate') });
    const cOut = F.cat(0), cIn = F.cat(1), rateOut = () => RD;
    /* the precipitation rate of the other start, dashed and faint: from either side it ends on the dissolution rate */
    F.plot(ctx, ax, RUNS[sup0 ? 'solid' : 'super'].rateIn, alpha(cIn, 0.4), { w: 3, dash: [10, 10] });
    text(ctx, 'from a supersaturated solution', ax.X(0.62), ax.Y(5.2), sup0 ? PAL.ink : PAL.muted, { size: 18 });
    text(ctx, 'from the solid in pure water', ax.X(1.75), ax.Y(0.55), sup0 ? PAL.muted : PAL.ink, { size: 18 });
    if (t > 0.01) { F.plot(ctx, ax, rateOut, cOut, { w: 5, x: [0, t] }); F.plot(ctx, ax, run.rateIn, cIn, { w: 5, x: [0, t] }); }
    dot(ctx, ax.X(t), ax.Y(RD), cOut, true, 9); dot(ctx, ax.X(t), ax.Y(run.rateIn(t)), cIn, true, 9);
    hits.push({ x: ax.X(t), y: ax.Y(RD), r: 12, name: 'the rate of dissolution' }, { x: ax.X(t), y: ax.Y(run.rateIn(t)), r: 12, name: 'the rate of precipitation' });
    F.legend(ctx, ax, [{ s: 'dissolution', color: cOut, w: 5 }, { s: 'precipitation', color: cIn, w: 5 }], { corner: 'above' });
    ro.set(`[\\text{Ag}^{+}][\\text{Cl}^{-}] = (${hue('concentration', cx)})(${hue('concentration', cx)}) = ${hue('equilibrium-constant', q > 0 ? sciTex(qr) : '0')} ${how} \\kKsp = ${hue('equilibrium-constant', '1.6 \\times 10^{-10}')}`, NOTE, { values: false });
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();

/* =====================================================================
   SIM: the K_sp plane beside what the chemist sees. Left, [X-] against
   [Ag+] on logarithmic axes, ten decades each ([Ag+] 10^-12 to 10^-2 M,
   [X-] 10^-10 to 1 M, fixed; every slider state lies inside): the
   points with [Ag+][X-] = K_sp are a straight line, AgCl's at
   1.6 × 10^-10 and AgBr's at 5.0 × 10^-13, and a mixture above its line
   has Q_sp > K_sp. Right, a beaker in which the solid appears, and a
   bar for each ion split into the part still dissolved and the part in
   the solid. One salt (Example 15.8): the sliders are the concentrations
   as mixed; above the line precipitation removes equal amounts u of
   both ions, (a − u)(c − u) = K_sp, u = ((a + c) − √((a − c)² + 4K))/2,
   and the dashed path runs from the mixture to the line. Two salts
   (Example 15.11): [Cl-] and [Br-] are the starting concentrations and
   [Ag+] is the silver ion in solution as AgNO3 is added; each salt
   begins where [Ag+] = K_sp/[X-], and past that point its halide stays
   on the line, [X-] = K_sp/[Ag+]. Still: the comparison has no clock.
   The solids wear their own colours, facts in both themes: AgCl white,
   AgBr cream.
===================================================================== */
(function () {
  const H = 680, d = sim('sim-ksp-plane', H);
  const KS = { cl: 1.6e-10, br: 5.0e-13 }, LK = { cl: Math.log10(1.6e-10), br: Math.log10(5.0e-13) };
  const SOLID = { cl: '#f4f4f2', br: '#efe6b4' };
  const START = { one: { a: -4, c: -4, r: -4 }, two: { a: -9, c: -1, r: -4 } };
  const pick = F.choice(d.controls, {
    label: '\\text{mixture}', key: 'mixture', aria: 'the mixture of ions', value: 'one',
    options: [{ value: 'one', label: 'AgCl' }, { value: 'two', label: 'AgCl and AgBr' }],
    onInput: (m) => { const s = START[m]; ag.set(s.a); cl.set(s.c); br.set(s.r); br.show(m === 'two'); [ag, cl, br].forEach((h) => h.refresh()); draw(); },
  });
  const ag = ctl(d.controls, { label: '[\\text{Ag}^{+}]', cls: 'concentration', key: 'ag', min: -12, max: -2, step: 0.01, value: -4, fmt: (lg) => `${sciText(10 ** lg)} M`,
    aria: 'the silver ion concentration, on a logarithmic scale',
    specials: [{ at: () => LK.cl - cl.v, label: 'AgCl' }, { at: () => (pick.value === 'two' ? LK.br - br.v : null), label: 'AgBr' }], onInput: () => draw() });
  const cl = ctl(d.controls, { label: '[\\text{Cl}^{-}]', cls: 'concentration', key: 'cl', min: -10, max: 0, step: 0.01, value: -4, fmt: (lg) => `${sciText(10 ** lg)} M`,
    aria: 'the chloride ion concentration, on a logarithmic scale', specials: [{ at: () => LK.cl - ag.v, label: 'saturated' }], onInput: () => draw() });
  const br = ctl(d.controls, { label: '[\\text{Br}^{-}]', cls: 'concentration', key: 'br', min: -10, max: 0, step: 0.01, value: -4, fmt: (lg) => `${sciText(10 ** lg)} M`,
    aria: 'the bromide ion concentration, on a logarithmic scale', specials: [{ at: () => LK.br - ag.v, label: 'saturated' }], onInput: () => draw() });
  br.show(false, { ms: 0 });
  const ro = F.readout(d);
  let hits = [];
  F.hover(d.stage, () => hits);

  const G = { l: 170, r: 740, t: 150, b: 620 }, XR = [-12, -2], YR = [-10, 0];
  const BK = { x: 1075, half: 150, top: 142, base: 356, lv: 190 };
  const BAR = { l: 860, r: 1320, y: [452, 566], h: 26 };
  const rel = (q, k) => (Math.abs(q / k - 1) < 0.03 ? '=' : q > k ? '>' : '<');
  const pct = (f) => (f <= 0 ? '0%' : f >= 1 ? '100%' : f < 0.01 ? 'under 1%' : f > 0.99 ? 'over 99%' : `${Math.round(100 * f)}%`);
  /* a settled solid across the floor of the beaker, from height y0 up by th, its top uneven */
  function layer(ctx, y0, th, fill) {
    const l = BK.x - BK.half + 8, r = BK.x + BK.half - 8, n = 12;
    ctx.save(); ctx.beginPath(); ctx.moveTo(l, y0);
    for (let i = 0; i <= n; i++) { const x = l + ((r - l) * i) / n, e = Math.sin((Math.PI * i) / n) ** 0.35; ctx.lineTo(x, y0 - th * e * (0.86 + 0.14 * Math.sin(2.3 * i + th))); }
    ctx.lineTo(r, y0); ctx.closePath();
    ctx.fillStyle = F.fact(fill); ctx.fill(); ctx.strokeStyle = alpha(PAL.ink, 0.6); ctx.lineWidth = 1.5; ctx.lineJoin = 'round'; ctx.stroke(); ctx.restore();
  }
  function draw() {
    const { ctx } = begin(d.c);
    const two = pick.value === 'two', a = 10 ** ag.v, c = 10 ** cl.v, r = 10 ** br.v;
    const cC = C('concentration'), cK = C('equilibrium-constant');
    const colCl = pick.mixColor((m) => (m === 'two' ? F.ref('agcl') : cK)), colBr = F.ref('agbr'), aBr = pick.a('two'), aOne = pick.a('one');
    const ar = round2(a), cr = round2(c), rr = round2(r);
    /* one salt: Q against K_sp from the numbers as written, and the amount u of each ion that precipitates */
    const q1 = round2(ar * cr), how = rel(q1, KS.cl), above = how === '>';
    const u = above ? Math.max(0, ((a + c) - Math.sqrt((a - c) ** 2 + 4 * KS.cl)) / 2) : 0;
    /* two salts: where each begins, and what is left of each halide at this [Ag+] */
    const tc = LK.cl - cl.v, tb = LK.br - br.v, first = tc <= tb ? 'cl' : 'br', other = first === 'cl' ? 'br' : 'cl';
    const NAMES = { cl: 'AgCl', br: 'AgBr' }, ION = { cl: 'Cl⁻', br: 'Br⁻' }, thr = { cl: tc, br: tb }, y0 = { cl: cl.v, br: br.v }, col = { cl: colCl, br: colBr };
    const on = { cl: ag.v >= tc - 0.005, br: ag.v >= tb - 0.005 };
    const left = { cl: on.cl ? Math.min(c, KS.cl / a) : c, br: on.br ? Math.min(r, KS.br / a) : r };

    let head;
    if (!two) {
      if (above) {
        const fa = sciText(a - u), fc = sciText(c - u), ratio = q1 / KS.cl;
        head = `$\\kQsp$ is ${ratio >= 100 ? sciText(ratio) : Math.round(ratio)} times $\\kKsp$, so AgCl precipitates until ` + (fa === fc ? `[Ag⁺] and [Cl⁻] fall to ${fa} M.` : `[Ag⁺] falls to ${fa} M and [Cl⁻] to ${fc} M.`);
      } else if (how === '=') head = '$\\kQsp = \\kKsp$: the solution is saturated, and nothing precipitates.';
      else head = `$\\kQsp$ is ${q1 / KS.cl >= 0.01 ? String(+(100 * q1 / KS.cl).toPrecision(2)) + '%' : 'less than 1%'} of $\\kKsp$, so no precipitate forms.`;
    } else {
      const th = { cl: sciText(10 ** tc), br: sciText(10 ** tb) };
      head = !on[first] ? `Neither salt precipitates yet: ${NAMES[first]} begins at [Ag⁺] = ${th[first]} M, ${NAMES[other]} at ${th[other]} M.`
        : !on[other] ? `${NAMES[first]} is precipitating and [${ION[first]}] has fallen to ${sciText(left[first])} M; ${NAMES[other]} begins at [Ag⁺] = ${th[other]} M.`
          : `Both salts precipitate; ${NAMES[first]} began first, at [Ag⁺] = ${th[first]} M.`;
    }
    const lines = topline(ctx, head);
    const lab = F.labeller(ctx, H, { headline: lines });

    /* ---- the plane ---- */
    const g = F.axes(ctx, G, [0, XR[1] - XR[0]], [0, YR[1] - YR[0]], {
      nx: 10, ny: 10, fx: (s) => (Math.round(s) % 2 ? '' : pow10(Math.round(s) + XR[0])), fy: (s) => (Math.round(s) % 2 ? '' : pow10(Math.round(s) + YR[0])),
      xl: '[Ag⁺] (M)', xc: cC, yl: two ? '[Cl⁻], [Br⁻] (M)' : '[Cl⁻] (M)', yc: cC });
    const X = (s) => g.X(s - XR[0]), Y = (s) => g.Y(s - YR[0]);
    lab.block(G.l - 150, G.t - 50, G.l + 240, G.t - 4); lab.block(G.l - 150, G.t, G.l - 4, G.b + 40); lab.block(G.l, G.b + 4, G.r + 10, G.b + 70);
    const seg = (lk) => [Math.max(XR[0], lk - YR[1]), Math.min(XR[1], lk - YR[0])];
    const [c0, c1] = seg(LK.cl), [b0, b1] = seg(LK.br);
    /* one salt: the side of the line where Q_sp > K_sp, faint, and both sides named */
    if (aOne > 0) F.faded(ctx, aOne, [0, 0], () => {
      ctx.save(); ctx.globalAlpha *= 0.09; ctx.fillStyle = cK; ctx.beginPath();
      ctx.moveTo(X(c0), Y(LK.cl - c0)); ctx.lineTo(X(c1), Y(LK.cl - c1)); ctx.lineTo(X(XR[1]), Y(YR[1])); ctx.closePath(); ctx.fill(); ctx.restore();
      text(ctx, '$\\kQsp > \\kKsp$', X(-4.3), Y(-1.0), PAL.ink, { size: 22, align: 'center', tex: true });
      text(ctx, 'AgCl precipitates', X(-4.3), Y(-1.0) + 28, PAL.ink, { size: 19, align: 'center' });
      text(ctx, '$\\kQsp < \\kKsp$', X(-9.3), Y(-7.6), PAL.ink, { size: 22, align: 'center', tex: true });
      text(ctx, 'no precipitate', X(-9.3), Y(-7.6) + 28, PAL.ink, { size: 19, align: 'center' });
    });
    line(ctx, X(c0), Y(LK.cl - c0), X(c1), Y(LK.cl - c1), colCl, 5);
    if (aBr > 0) F.faded(ctx, aBr, [0, 0], () => line(ctx, X(b0), Y(LK.br - b0), X(b1), Y(LK.br - b1), colBr, 5));

    hits = [];
    const xa = ag.v, drop = (x, y, color) => { line(ctx, X(x), Y(y), X(x), G.b, color, 2, [4, 8]); line(ctx, G.l, Y(y), X(x), Y(y), color, 2, [4, 8]); };
    if (!two) {
      drop(xa, cl.v, alpha(cC, 0.6));
      if (above && u > 0) {
        const pts = [];
        for (let i = 0; i <= 60; i++) { const w = u * (i / 60); pts.push([X(Math.log10(a - w)), Y(Math.log10(c - w))]); }
        const [ex, ey] = pts[pts.length - 1], [px, py] = pts[pts.length - 2], L = Math.hypot(ex - px, ey - py) || 1, ux = (ex - px) / L, uy = (ey - py) / L;
        ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.setLineDash([9, 7]); ctx.beginPath();
        pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.stroke(); ctx.restore();
        if (Math.hypot(ex - X(xa), ey - Y(cl.v)) > 50) F.arrow(ctx, ex - 34 * ux, ey - 34 * uy, ex - 12 * ux, ey - 12 * uy, PAL.ink, 3);
        dot(ctx, ex, ey, PAL.ink, true, 9);
        hits.push({ x: ex, y: ey, r: 14, name: `at equilibrium: [Ag⁺] = ${sciText(a - u)} M, [Cl⁻] = ${sciText(c - u)} M` });
        lab.block(ex - 12, ey - 12, ex + 12, ey + 12);
        lab.add('at equilibrium', ex, ey, -0.71, 0.71, PAL.ink, 19, 16);
      }
      dot(ctx, X(xa), Y(cl.v), PAL.ink, !above, 10);
      hits.push({ x: X(xa), y: Y(cl.v), r: 14, name: `as mixed: [Ag⁺] = ${sciText(a)} M, [Cl⁻] = ${sciText(c)} M` });
      lab.block(X(xa) - 12, Y(cl.v) - 12, X(xa) + 12, Y(cl.v) + 12);
      lab.add('as mixed', X(xa), Y(cl.v), 0.71, -0.71, PAL.ink, 19, 16);
      lab.add('[Ag⁺][Cl⁻] = K_{sp}', X(-2.7), Y(LK.cl + 2.7), -0.6, 0.8, colCl, 20, 26);
    } else {
      line(ctx, X(xa), G.t, X(xa), G.b, alpha(cC, 0.6), 2.5, [4, 8]);
      ['cl', 'br'].forEach((k) => {
        const xt = thr[k];
        /* the halide's starting level out to its line, and down to the [Ag+] at which its salt begins */
        if (xt >= XR[0] && xt <= XR[1]) {
          line(ctx, G.l, Y(y0[k]), X(xt), Y(y0[k]), alpha(col[k], 0.75), 2.5, [10, 8]);
          line(ctx, X(xt), Y(y0[k]), X(xt), G.b, alpha(col[k], 0.75), 2.5, [10, 8]);
          dot(ctx, X(xt), G.b, col[k], true, 7);
          hits.push({ x: X(xt), y: G.b, r: 12, name: `${NAMES[k]} begins to precipitate at [Ag⁺] = ${sciText(10 ** xt)} M` });
          /* named just above the axis, the first to begin on the left of its line and the other on the right of its own */
          const room = thr[first] > XR[0] + 2.4, lft = k === first && room;
          text(ctx, `${NAMES[k]} begins`, X(xt) + (lft ? -10 : 10), G.b - (k === first && !room ? 44 : 18), col[k], { size: 18, align: lft ? 'right' : 'left', bg: PAL.panel });
        }
        const yk = Math.max(YR[0], Math.log10(left[k]));
        dot(ctx, X(xa), Y(yk), col[k], true, 10);
        hits.push({ x: X(xa), y: Y(yk), r: 14, name: `[${ION[k]}] = ${sciText(left[k])} M: ${NAMES[k]} ${on[k] ? 'is precipitating' : 'has not begun to precipitate'}` });
        lab.block(X(xa) - 12, Y(yk) - 12, X(xa) + 12, Y(yk) + 12);
        lab.add(ION[k], X(xa), Y(yk), 0.71, -0.71, col[k], 20, 14);
      });
      lab.add('AgCl', X(-3.0), Y(LK.cl + 3.0), 0.71, -0.71, colCl, 20, 22);
      lab.add('AgBr', X(-3.6), Y(LK.br + 3.6), -0.71, 0.71, colBr, 20, 22);
    }
    lab.flush();

    /* ---- the beaker: the solids that have formed, the first on the floor ---- */
    const solids = two ? [first, other].filter((k) => on[k] && left[k] < y0x(k)).map((k) => ({ k, f: 1 - left[k] / y0x(k) }))
      : above && u > 0 ? [{ k: 'cl', f: u / Math.min(a, c) }] : [];
    function y0x(k) { return k === 'cl' ? c : r; }
    beakerWater(ctx, BK);
    let floor = BK.base - 3;
    solids.forEach((s, i) => {
      const th = 9 + 24 * s.f, mid = floor - th / 2, ly = BK.base - 16 - i * 30;
      layer(ctx, floor, th, SOLID[s.k]);
      hits.push({ x: BK.x, y: mid, r: 60, name: `solid ${NAMES[s.k]}, the precipitate` });
      line(ctx, BK.x + BK.half - 30, mid, BK.x + BK.half + 26, ly, alpha(PAL.ink, 0.5), 1.5, [4, 6]);
      text(ctx, `${NAMES[s.k]}(s)`, BK.x + BK.half + 32, ly, two ? col[s.k] : PAL.ink, { size: 20, weight: 600 });
      floor -= th - 2;
    });
    if (!solids.length) text(ctx, 'no solid forms', BK.x, BK.base + 24, PAL.muted, { size: 18, align: 'center' });
    beakerGlass(ctx, BK);
    /* the ions in the solution, named in the water */
    F.rich(ctx, two ? ['Ag⁺, ', ['Cl⁻', col.cl], ' and ', ['Br⁻', col.br], ' in solution'] : ['Ag⁺ and Cl⁻ in solution'], BK.x, (BK.lv + BK.base) / 2 - 24, { size: 18, align: 'center' });

    /* ---- a bar for each ion: the part still dissolved and the part in the solid ---- */
    const rows = two
      ? ['cl', 'br'].map((k) => ({ ion: ION[k], el: k === 'cl' ? 'Cl' : 'Br', c0: y0x(k), f: left[k] / y0x(k), salt: NAMES[k], fill: SOLID[k], when: 'at the start', color: col[k] }))
      : [{ ion: 'Ag⁺', el: 'Ag', c0: a, f: (a - u) / a, salt: 'AgCl', fill: SOLID.cl, when: 'as mixed', color: PAL.ink }, { ion: 'Cl⁻', el: 'Cl', c0: c, f: (c - u) / c, salt: 'AgCl', fill: SOLID.cl, when: 'as mixed', color: PAL.ink }];
    rows.forEach((w, i) => {
      const y = BAR.y[i], W = BAR.r - BAR.l, f = Math.min(1, Math.max(0, w.f)), xm = BAR.l + W * f;
      F.rich(ctx, [[w.ion, w.color], ', ', [`${sciText(w.c0)} M`, cC], ` ${w.when}`], BAR.l, y - 22, { size: 19 });
      ctx.save();
      ctx.fillStyle = F.fact(w.fill); ctx.fillRect(BAR.l, y, W, BAR.h);
      ctx.fillStyle = F.el(w.el); ctx.fillRect(BAR.l, y, W * f, BAR.h);
      ctx.strokeStyle = alpha(PAL.ink, 0.7); ctx.lineWidth = 1.5; ctx.strokeRect(BAR.l, y, W, BAR.h);
      if (f < 1) { ctx.beginPath(); ctx.moveTo(xm, y); ctx.lineTo(xm, y + BAR.h); ctx.stroke(); }
      ctx.restore();
      text(ctx, f >= 1 ? 'all of it still dissolved' : `${pct(f)} still dissolved`, BAR.l, y + BAR.h + 20, PAL.ink, { size: 18 });
      if (f < 1) text(ctx, `${pct(1 - f)} in ${w.salt}(s)`, BAR.r, y + BAR.h + 20, PAL.ink, { size: 18, align: 'right' });
    });

    if (!two) {
      ro.set(`\\kQsp = [\\text{Ag}^{+}][\\text{Cl}^{-}] = (\\mk{a}{${hue('concentration', sciTex(ar))}})(\\mk{c}{${hue('concentration', sciTex(cr))}}) = \\mk{q}{${hue('equilibrium-constant', sciTex(q1))}} \\mk{rel}{${how === '>' ? '\\gt' : how === '<' ? '\\lt' : '='}} \\mk{K}{\\kKsp} = \\mk{Kv}{${hue('equilibrium-constant', '1.6 \\times 10^{-10}')}}`, undefined, { form: 'one' });
    } else {
      /* the [Ag+] at which each salt begins to precipitate, AgCl's line first as Example 15.11 works them */
      const line2 = (k, xr, ion) => `[\\text{Ag}^{+}] = \\frac{\\kKsp}{${ion}} = \\frac{\\mk{K${k}}{${hue('equilibrium-constant', sciTex(KS[k]))}}}{\\mk{x${k}}{${hue('concentration', sciTex(xr))}}} = \\mk{t${k}}{${hue('concentration', sciTex(round2(KS[k] / xr)))}}\\ \\text{M}`;
      ro.set(`${line2('cl', cr, '[\\text{Cl}^{-}]')} \\\\ ${line2('br', rr, '[\\text{Br}^{-}]')}`, undefined, { form: 'two' });
    }
  }
  register(d.fig, { update: () => {}, draw });
})();
};
