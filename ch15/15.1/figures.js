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
/* x to two significant figures as [mantissa, exponent], the mantissa a string */
function sig2(x) {
  let e = Math.floor(Math.log10(x)), m = (x / 10 ** e).toFixed(1);
  if (+m >= 10) { e += 1; m = (x / 10 ** e).toFixed(1); }
  return [m, e];
}
const round2 = (x) => { const [m, e] = sig2(x); return +m * 10 ** e; };
const sciText = (x) => { const [m, e] = sig2(x); return e >= -2 && e <= 0 ? (+m * 10 ** e).toFixed(1 - e) : `${m} × 10${sup(e)}`; };
const sciTex = (x) => { const [m, e] = sig2(x); return e >= -2 && e <= 0 ? (+m * 10 ** e).toFixed(1 - e) : `${m} \\times 10^{${e}}`; };
/* a seeded generator, so the scene is the same on every load */
function rng(seed) { let a = seed >>> 0; return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

/* =====================================================================
   FIGURE 15.2: silver chloride in a beaker of water, flat. A rock-salt
   face of 32 ions (8 by 4, Ag+ and Cl- alternating, radii in the ratio
   of 1.15 to 1.81 Å) lies on the floor of the beaker among 15 water
   molecules, every particle in view. Moving: ion pairs leave the
   surface of the solid at a steady rate, 2 pairs per unit time, and
   dissolved ions return at k n², so the number of pairs in solution
   follows n = 3 tanh(2t/3) and settles at three (one Ag+ to five water
   molecules, as the note says). Each return is scheduled where the
   smooth count returned, 2t − n, passes a half-integer. Beside the
   beaker the two rates against time: the dissolution rate is flat and
   the precipitation rate, 2 tanh²(2t/3),
   rises to meet it. Positions are functions of the clock alone, so the
   timeline scrubs exactly. Rates and time are schematic: no ticks.
===================================================================== */
(function () {
  const H = 640, d = sim('sim-agcl', H);
  const T = 6, TR = 0.8, RD = 2, NEQ = 3, G = RD / NEQ;
  const NAME = { Ag: 'a silver ion, Ag⁺', Cl: 'a chloride ion, Cl⁻' };
  const RAD = { Ag: 15, Cl: 24 };
  /* the beaker: centre, half width, rim, base; the water stands at lv */
  const BK = { x: 310, half: 250, top: 90, base: 600, lv: 150 };
  /* the solid: an 8 by 4 face of the lattice resting on the floor, spacing 46 */
  const SP = 46, COLS = 8, ROWS = 4, sites = [];
  for (let j = 0; j < ROWS; j++) for (let i = 0; i < COLS; i++) {
    sites.push({ kind: (i + j) % 2 ? 'Cl' : 'Ag', i, j, p: [BK.x + (i - (COLS - 1) / 2) * SP, BK.base - 28 - j * SP] });
  }
  const siteAt = (i, j) => sites.findIndex((s) => s.i === i && s.j === j);
  const rand = rng(1502);
  /* places in the water on a staggered grid, nudged off their centres, clear of the solid: 15 for water molecules, the rest for dissolved ions */
  const solidBox = { l: sites[0].p[0] - 40, r: sites[COLS - 1].p[0] + 40, t: sites[sites.length - 1].p[1] - 45 };
  const slots = [];
  for (let r = 0; BK.lv + 42 + r * 62 <= BK.base - 30; r++) for (let c = 0; ; c++) {
    const x = BK.x - BK.half + 40 + c * 74 + (r % 2 ? 37 : 0), y = BK.lv + 42 + r * 62;
    if (x > BK.x + BK.half - 38) break;
    if (x > solidBox.l && x < solidBox.r && y > solidBox.t) continue;
    slots.push([x + (rand() - 0.5) * 8, y + (rand() - 0.5) * 6]);
  }
  for (let i = slots.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [slots[i], slots[j]] = [slots[j], slots[i]]; }
  const waterSlots = slots.slice(0, 15), ionSlots = slots.slice(15);

  /* the schedule: departures every 1/RD from 0.2, arrivals where the smooth count returned passes j − 1/2 */
  const nSmooth = (t) => NEQ * Math.tanh(G * t), back = (t) => RD * t - nSmooth(t);
  const rateOut = () => RD, rateIn = (t) => RD * Math.tanh(G * t) ** 2;
  const outs = [], ins = [];
  for (let i = 0; (i + 0.5) / RD < T - 0.3; i++) outs.push((i + 0.5) / RD);
  for (let j = 1; ; j++) {
    if (back(T) < j - 0.5) break;
    let lo = 0, hi = T;
    for (let n = 0; n < 50; n++) { const m = (lo + hi) / 2; if (back(m) < j - 0.5) lo = m; else hi = m; }
    ins.push(hi);
  }
  const ions = sites.map((s, i) => ({ kind: s.kind, home: i, trips: [] }));
  const at = sites.map((_, i) => i);         /* the ion on each site, or -1 */
  /* a site is on the surface when it is on the top row, at either end, or beside a vacancy */
  const exposed = (s) => { const { i, j } = sites[s]; return j === ROWS - 1 || i === 0 || i === COLS - 1 || [[1, 0], [-1, 0], [0, 1]].some(([a, b]) => { const k = siteAt(i + a, j + b); return k >= 0 && at[k] < 0; }); };
  const freed = [], away = [], slotFree = ionSlots.map(() => true);
  const events = [...outs.flatMap((t) => [[t, 'out', 'Ag'], [t + 0.12, 'out', 'Cl']]), ...ins.flatMap((t) => [[t, 'in', 'Ag'], [t + 0.12, 'in', 'Cl']])].sort((a, b) => a[0] - b[0]);
  for (const [t, what, kind] of events) {
    if (what === 'out') {
      const cand = sites.map((_, i) => i).filter((i) => sites[i].kind === kind && at[i] >= 0 && exposed(i));
      const s = cand.sort((a, b) => sites[b].j - sites[a].j || rand() - 0.5)[Math.floor(rand() * Math.min(3, cand.length))];
      const ion = ions[at[s]]; at[s] = -1; freed.push(s);
      const free = slotFree.map((f, k) => (f ? k : -1)).filter((k) => k >= 0), slot = free.length ? free[Math.floor(rand() * free.length)] : 0;
      slotFree[slot] = false;
      ion.trips.push({ t0: t, from: s, slot, ph: [rand() * TAU, rand() * TAU] });
      away.push(ion);
    } else {
      const k = away.findIndex((ion) => ion.kind === kind && ion.trips[ion.trips.length - 1].t0 + TR <= t - TR);
      if (k < 0) continue;
      const ion = away.splice(k, 1)[0], f = freed.findIndex((i) => sites[i].kind === kind);
      const s = freed.splice(f, 1)[0], tr = ion.trips[ion.trips.length - 1];
      tr.t1 = t; tr.to = s; at[s] = ions.indexOf(ion); slotFree[tr.slot] = true;
    }
  }
  const inSolution = (t) => outs.filter((x) => x <= t).length - ins.filter((x) => x <= t).length;

  const smooth = F.ease.smooth;
  const bez = (a, c, b, k) => [0, 1].map((i) => (1 - k) * (1 - k) * a[i] + 2 * k * (1 - k) * c[i] + k * k * b[i]);
  const wander = (tr, t) => { const c = ionSlots[tr.slot]; return [c[0] + 5 * Math.sin(1.3 * t + tr.ph[0]), c[1] + 4 * Math.sin(1.1 * t + tr.ph[1])]; };
  const lift = (p) => [p[0] + (p[0] - BK.x) * 0.3, p[1] - 70];
  function where(ion, t) {
    let s = ion.home;
    for (const tr of ion.trips) {
      if (t < tr.t0) break;
      const w = wander(tr, t), p0 = sites[tr.from].p;
      if (t < tr.t0 + TR) return bez(p0, lift(p0), w, smooth((t - tr.t0) / TR));
      if (tr.t1 === undefined || t < tr.t1 - TR) return w;
      const p1 = sites[tr.to].p;
      if (t < tr.t1) return bez(w, lift(p1), p1, smooth((t - (tr.t1 - TR)) / TR));
      s = tr.to;
    }
    return sites[s].p;
  }
  /* water: bent molecules (104.5°) at their places, each jiggling and turning a little */
  const waters = waterSlots.map((p) => ({ p, a: rand() * TAU, ph: rand() * TAU }));
  const HW = 52.25 * Math.PI / 180;
  function water(ctx, m, t) {
    const c = [m.p[0] + 4 * Math.sin(2.1 * t + m.ph), m.p[1] + 3 * Math.sin(1.7 * t + 2 * m.ph)], a = m.a + 0.25 * Math.sin(0.9 * t + m.ph);
    [-1, 1].forEach((s) => ball(ctx, c[0] + 20 * Math.cos(a + s * HW), c[1] + 20 * Math.sin(a + s * HW), 11, F.el('H')));
    ball(ctx, c[0], c[1], 19, F.el('O'));
    hits.push({ x: c[0], y: c[1], r: 26, name: 'a water molecule, H₂O' });
  }
  function ball(ctx, x, y, r, fill) {
    ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fillStyle = fill; ctx.fill();
    ctx.lineWidth = 1.5; ctx.strokeStyle = alpha(PAL.ink, 0.5); ctx.stroke(); ctx.restore();
  }
  function ion(ctx, kind, x, y) { ball(ctx, x, y, RAD[kind], F.el(kind)); hits.push({ x, y, r: RAD[kind] + 2, name: NAME[kind] }); }
  /* a beaker standing on its base: straight walls, a rounded foot, a flared rim with a spout at the left */
  function beakerPath(ctx) {
    const l = BK.x - BK.half, r = BK.x + BK.half;
    ctx.beginPath();
    ctx.moveTo(l - 16, BK.top - 8); ctx.quadraticCurveTo(l - 2, BK.top - 2, l, BK.top + 14);
    ctx.lineTo(l, BK.base - 14); ctx.quadraticCurveTo(l, BK.base, l + 14, BK.base);
    ctx.lineTo(r - 14, BK.base); ctx.quadraticCurveTo(r, BK.base, r, BK.base - 14);
    ctx.lineTo(r, BK.top + 8); ctx.quadraticCurveTo(r, BK.top, r + 6, BK.top - 2);
  }

  const cy = F.cycle(() => T, 1.2);
  let hits = [];
  F.hover(d.stage, () => hits);
  const GB = { l: 680, r: 1340, t: 170, b: 540 };
  function draw() {
    const { ctx } = begin(d.c);
    const t = cy.now(), n = inSolution(t);
    hits = [];
    const head = nSmooth(t) < 0.95 * NEQ
      ? `Ions leave the solid faster than they return: ${n} Ag⁺ and ${n} Cl⁻ are dissolved so far.`
      : 'Ions now leave the solid and return to it at the same rate, so the number dissolved holds steady.';
    topline(ctx, head);
    /* the water, then the glass over it */
    ctx.save(); beakerPath(ctx); ctx.closePath(); ctx.clip(); ctx.fillStyle = alpha(PAL.muted, 0.16); ctx.fillRect(BK.x - BK.half, BK.lv, 2 * BK.half, BK.base - BK.lv); ctx.restore();
    line(ctx, BK.x - BK.half + 2, BK.lv, BK.x + BK.half - 2, BK.lv, alpha(PAL.ink, 0.45), 1.5);
    waters.forEach((m) => water(ctx, m, t));
    /* the solid first, then the ions on their way or in solution, so a moving ion passes in front */
    const pos = ions.map((o) => where(o, t)), home = ions.map((o, i) => { const p = pos[i]; return sites.some((s) => s.p[0] === p[0] && s.p[1] === p[1]); });
    ions.forEach((o, i) => { if (home[i]) ion(ctx, o.kind, pos[i][0], pos[i][1]); });
    ions.forEach((o, i) => { if (!home[i]) ion(ctx, o.kind, pos[i][0], pos[i][1]); });
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; beakerPath(ctx); ctx.stroke(); ctx.restore();
        text(ctx, 'AgCl(s)', BK.x, BK.base + 6, PAL.ink, { size: 20, align: 'center', base: 'top' });
    /* the two rates against time */
    const ax = F.axes(ctx, GB, [0, T], [0, 1.25 * RD], { nx: 0, ny: 0, xl: 'time', xc: C('time'), yl: 'rate', yc: C('rate') });
    const cOut = F.cat(0), cIn = F.cat(1);
    if (t > 0.01) { F.plot(ctx, ax, rateOut, cOut, { w: 5, x: [0, t] }); F.plot(ctx, ax, rateIn, cIn, { w: 5, x: [0, t] }); }
    dot(ctx, ax.X(t), ax.Y(rateOut()), cOut, true, 9); dot(ctx, ax.X(t), ax.Y(rateIn(t)), cIn, true, 9);
    hits.push({ x: ax.X(t), y: ax.Y(rateOut()), r: 12, name: 'the rate of dissolution' }, { x: ax.X(t), y: ax.Y(rateIn(t)), r: 12, name: 'the rate of precipitation' });
    ro.set(SAT, NOTE, { values: false });
    F.legend(ctx, ax, [{ s: 'dissolution', color: cOut, w: 5 }, { s: 'precipitation', color: cIn, w: 5 }], { corner: 'above' });
  }
  const ro = F.readout(d), NOTE = 'A saturated solution holds one Ag⁺ ion for every 4.4 million water molecules; the beaker draws one for every five.';
  const SAT = `\\kKsp = [\\text{Ag}^{+}][\\text{Cl}^{-}] = (${hue('concentration', '1.26 \\times 10^{-5}')})(${hue('concentration', '1.26 \\times 10^{-5}')}) = ${hue('equilibrium-constant', '1.6 \\times 10^{-10}')}`;
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();

/* =====================================================================
   SIM: the K_sp plane. log [X-] against log [Ag+] for AgCl (K_sp
   1.6 × 10^-10) and AgBr (5.0 × 10^-13), each a line of slope −1; the
   region above a line is supersaturated. One salt (Example 15.8): the
   mixture is a point, and above the line precipitation removes equal
   amounts u of both ions, (a − u)(b − u) = K_sp, so the dashed path runs
   from (a, b) to the line along u from 0 to ((a + b) − √((a − b)² +
   4K))/2. Two salts (Example 15.11): a point per halide on the vertical
   through [Ag+], and each salt begins where [Ag+] = K_sp/[X-]. Axes
   fixed: [Ag+] 10^-12 to 10^-2 M, [X-] 10^-12 to 1 M, the slider ranges
   ([Ag+] 10^-12 to 10^-2, [X-] 10^-10 to 1) inside them, so nothing is
   pinned. Still: the comparison has no clock.
===================================================================== */
(function () {
  const H = 660, d = sim('sim-ksp-plane', H);
  const KS = { cl: 1.6e-10, br: 5.0e-13 }, LK = { cl: Math.log10(1.6e-10), br: Math.log10(5.0e-13) };
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

  const G = { l: 210, r: 1250, t: 150, b: 580 }, XR = [-12, -2], YR = [-12, 0];
  /* a product shown from rounded factors, so the numbers on screen multiply to the number on screen */
  const rel = (q, k) => (Math.abs(q / k - 1) < 0.03 ? '=' : q > k ? '>' : '<');
  function draw() {
    const { ctx } = begin(d.c);
    const two = pick.value === 'two', a = 10 ** ag.v, c = 10 ** cl.v, r = 10 ** br.v;
    const cC = C('concentration'), cK = C('equilibrium-constant');
    const colCl = pick.mixColor((m) => (m === 'two' ? F.ref('agcl') : cK)), colBr = F.ref('agbr'), aBr = pick.a('two');
    const ar = round2(a), cr = round2(c), rr = round2(r);

    let head;
    if (!two) {
      const q = round2(ar * cr), how = rel(q, KS.cl);
      if (how === '>') {
        const u = ((a + c) - Math.sqrt((a - c) ** 2 + 4 * KS.cl)) / 2, fa = sciText(a - u), fc = sciText(c - u);
        const ratio = q / KS.cl;
        head = `$\\kQsp$ is ${ratio >= 100 ? sciText(ratio) : Math.round(ratio)} times $\\kKsp$, so AgCl precipitates until ` + (fa === fc ? `[Ag⁺] and [Cl⁻] fall to ${fa} M.` : `[Ag⁺] falls to ${fa} M and [Cl⁻] to ${fc} M.`);
      } else if (how === '=') head = '$\\kQsp = \\kKsp$: the solution is saturated, and nothing precipitates.';
      else head = `$\\kQsp$ is ${q / KS.cl >= 0.01 ? String(+(100 * q / KS.cl).toPrecision(2)) + '%' : 'less than 1%'} of $\\kKsp$, so no precipitate forms.`;
    } else {
      const tc = LK.cl - cl.v, tb = LK.br - br.v, first = tc <= tb ? 'cl' : 'br';
      const name = { cl: 'AgCl', br: 'AgBr' }, th = { cl: sciText(10 ** tc), br: sciText(10 ** tb) }, other = first === 'cl' ? 'br' : 'cl';
      const tf = first === 'cl' ? tc : tb, to = first === 'cl' ? tb : tc;
      head = ag.v < tf - 0.005 ? `Neither salt precipitates yet: ${name[first]} begins at [Ag⁺] = ${th[first]} M, ${name[other]} at ${th[other]} M.`
        : ag.v < to - 0.005 ? `${name[first]} precipitates; ${name[other]} waits until [Ag⁺] reaches ${th[other]} M.`
          : `Both salts precipitate; ${name[first]} began first, at [Ag⁺] = ${th[first]} M.`;
    }
    const lines = topline(ctx, head);
    const lab = F.labeller(ctx, H, { headline: lines });

    const g = F.axes(ctx, G, [0, XR[1] - XR[0]], [0, YR[1] - YR[0]], {
      nx: 10, ny: 12, fx: (s) => (Math.round(s) % 2 ? '' : pow10(Math.round(s) + XR[0])), fy: (s) => (Math.round(s) % 2 ? '' : pow10(Math.round(s) + YR[0])),
      xl: '[Ag⁺] (M)', xc: cC, yl: two ? '[Cl⁻], [Br⁻] (M)' : '[Cl⁻] (M)', yc: cC });
    const X = (s) => g.X(s - XR[0]), Y = (s) => g.Y(s - YR[0]);
    lab.block(G.l - 140, G.t - 50, G.l + 220, G.t - 4); lab.block(G.l - 120, G.t, G.l - 4, G.b + 40); lab.block(G.l, G.b + 4, G.r + 10, G.b + 70);

    /* the supersaturated side of each line, faint; the line itself; its name at the upper end */
    const seg = (lk) => [Math.max(XR[0], lk - YR[1]), Math.min(XR[1], lk - YR[0])];
    const region = (lk, col, k) => {
      const [x0, x1] = seg(lk);
      ctx.save(); ctx.globalAlpha = 0.08 * k; ctx.fillStyle = col; ctx.beginPath();
      ctx.moveTo(X(x0), Y(lk - x0)); ctx.lineTo(X(x1), Y(lk - x1)); ctx.lineTo(X(XR[1]), Y(YR[1])); ctx.lineTo(X(x0), Y(YR[1])); ctx.closePath(); ctx.fill(); ctx.restore();
    };
    region(LK.cl, colCl, 1);
    if (aBr > 0) region(LK.br, colBr, aBr);
    const [c0, c1] = seg(LK.cl);
    line(ctx, X(c0), Y(LK.cl - c0), X(c1), Y(LK.cl - c1), colCl, 5);
    if (aBr > 0) F.faded(ctx, aBr, [0, 0], () => { const [b0, b1] = seg(LK.br); line(ctx, X(b0), Y(LK.br - b0), X(b1), Y(LK.br - b1), colBr, 5); });
    text(ctx, 'precipitate', X(-3.2), Y(-1.2), PAL.muted, { size: 18, align: 'center' });
    text(ctx, 'no precipitate', X(-10.6), Y(-10.8), PAL.muted, { size: 18, align: 'center' });
    lab.block(X(-3.2) - 60, Y(-1.2) - 14, X(-3.2) + 60, Y(-1.2) + 14);
    lab.block(X(-10.6) - 80, Y(-10.8) - 14, X(-10.6) + 80, Y(-10.8) + 14);

    hits = [];
    const xa = ag.v;
    if (!two) {
      const q = a * c, above = q > KS.cl * 1.03;
      if (above) {
        const uMax = ((a + c) - Math.sqrt((a - c) ** 2 + 4 * KS.cl)) / 2, pts = [];
        for (let i = 0; i <= 60; i++) { const u = uMax * (i / 60); pts.push([X(Math.log10(a - u)), Y(Math.log10(c - u))]); }
        ctx.save(); ctx.strokeStyle = alpha(PAL.ink, 0.6); ctx.lineWidth = 3; ctx.setLineDash([10, 8]); ctx.beginPath();
        pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.stroke(); ctx.restore();
        const [ex, ey] = pts[pts.length - 1];
        dot(ctx, ex, ey, PAL.ink, true, 9);
        hits.push({ x: ex, y: ey, r: 14, name: `after precipitation: [Ag⁺] = ${sciText(a - uMax)} M, [Cl⁻] = ${sciText(c - uMax)} M` });
      }
      dot(ctx, X(xa), Y(cl.v), PAL.ink, !above, 10);
      hits.push({ x: X(xa), y: Y(cl.v), r: 14, name: `the mixture: [Ag⁺] = ${sciText(a)} M, [Cl⁻] = ${sciText(c)} M` });
    } else {
      line(ctx, X(xa), G.t, X(xa), G.b, alpha(C('concentration'), 0.45), 2.5, [4, 8]);
      [['cl', cl.v, colCl, 'AgCl', 'Cl⁻'], ['br', br.v, colBr, 'AgBr', 'Br⁻']].forEach(([k, ly, col, salt, ion]) => {
        const xt = LK[k] - ly;
        if (xt >= XR[0] && xt <= XR[1]) {
          line(ctx, X(xt), Y(ly), X(xt), G.b, alpha(col, 0.7), 2.5, [10, 8]);
          dot(ctx, X(xt), G.b, col, true, 6);
          hits.push({ x: X(xt), y: G.b, r: 12, name: `${salt} begins to precipitate at [Ag⁺] = ${sciText(10 ** xt)} M` });
        }
        const on = xa >= xt - 0.005;
        dot(ctx, X(xa), Y(ly), col, on, 10);
        hits.push({ x: X(xa), y: Y(ly), r: 14, name: `${ion} at ${sciText(10 ** ly)} M: ${salt} ${on ? 'precipitates' : 'does not precipitate'}` });
      });
    }
    hits.forEach((h) => lab.block(h.x - 14, h.y - 14, h.x + 14, h.y + 14));
    lab.add('AgCl', X(-2.8), Y(LK.cl + 2.8), 0.71, -0.71, colCl, 20, 26);
    if (two) lab.add('AgBr', X(-2.8), Y(LK.br + 2.8), 0.71, 0.71, colBr, 20, 26);
    lab.flush();

    if (!two) {
      const q = round2(ar * cr), how = rel(q, KS.cl);
      ro.set(`\\kQsp = [\\text{Ag}^{+}][\\text{Cl}^{-}] = (\\mk{a}{${hue('concentration', sciTex(ar))}})(\\mk{c}{${hue('concentration', sciTex(cr))}}) = \\mk{q}{${hue('equilibrium-constant', sciTex(q))}} \\mk{rel}{${how === '>' ? '\\gt' : how === '<' ? '\\lt' : '='}} \\mk{K}{\\kKsp} = \\mk{Kv}{${hue('equilibrium-constant', '1.6 \\times 10^{-10}')}}`, undefined, { form: 'one' });
    } else {
      /* the [Ag+] at which each salt begins to precipitate, AgCl's line first as Example 15.11 works them */
      const thr = (k, xr, ion) => `[\\text{Ag}^{+}] = \\frac{\\kKsp}{${ion}} = \\frac{\\mk{K${k}}{${hue('equilibrium-constant', sciTex(KS[k]))}}}{\\mk{x${k}}{${hue('concentration', sciTex(xr))}}} = \\mk{t${k}}{${hue('concentration', sciTex(round2(KS[k] / xr)))}}\\ \\text{M}`;
      ro.set(`${thr('cl', cr, '[\\text{Cl}^{-}]')} \\\\ ${thr('br', rr, '[\\text{Br}^{-}]')}`, undefined, { form: 'two' });
    }
  }
  register(d.fig, { update: () => {}, draw });
})();
};
