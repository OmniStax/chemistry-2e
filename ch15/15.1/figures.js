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
   FIGURE 15.2: silver chloride dissolving in a beaker of water, in
   three dimensions. A rock-salt block of 24 Ag+ and 24 Cl- (edge 5.55 Å,
   ionic radii 1.15 and 1.81 Å drawn at 0.9) stands on the floor of the
   beaker among 22 water molecules; the scene is in units of 10 Å.
   Moving: ion pairs leave the top of the block at a steady rate, 2.5
   per unit time, and dissolved ions return at k n², so the number in
   solution follows n = 4 tanh(0.625 t) and settles at four pairs. Each
   return is scheduled where the smooth count returned, 2.5 t − n,
   passes a half-integer, so the step counts beneath track the smooth
   ones; positions are a function of the clock alone, and the timeline
   scrubs exactly. The beaker stands on a bench: pitch 0.05 to 1.2 rad.
===================================================================== */
(function () {
  const T3D = window.THREE;
  const d = sim('sim-agcl');
  const v = F.view3d(d.stage, { spin: 'off', h: 520, dist: 7.4, tilt: 0.3, pitch: [0.05, 1.2],
    views: [{ label: 'front', yaw: 0, pitch: 0.3 }, { label: 'above', yaw: 0, pitch: 1.15 }] });
  const grp = v.part(0), strip = F.makeCanvas(d.stage, 250);
  const T = 6, TR = 0.8, RD = 2.5, NEQ = 4, G = Math.sqrt(RD * RD / (NEQ * NEQ));
  const S = 0.2775, Y0 = -0.78, RAD = { Ag: 0.104, Cl: 0.163 };
  const NAME = { Ag: 'a silver ion, Ag⁺', Cl: 'a chloride ion, Cl⁻' };
  const R = 1.35, FLOOR = -0.95, SURF = 0.55, TOP = 0.95;

  /* the lattice: 4 × 4 × 3 sites, alternating Ag+ and Cl- */
  const sites = [];
  for (let k = 0; k < 3; k++) for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) {
    sites.push({ kind: (i + j + k) % 2 ? 'Cl' : 'Ag', p: [(i - 1.5) * S, Y0 + k * S, (j - 1.5) * S], top: k === 2 });
  }
  const rand = rng(1501);
  const outside = (p, m) => Math.abs(p[0]) > 0.62 + m || Math.abs(p[2]) > 0.62 + m || p[1] > Y0 + 2 * S + 0.2 + m;
  function inWater(lo, hi, rMax, m) {
    for (;;) {
      const a = rand() * TAU, r = Math.sqrt(rand()) * rMax, p = [r * Math.cos(a), lo + rand() * (hi - lo), r * Math.sin(a)];
      if (outside(p, m)) return p;
    }
  }

  /* the schedule: departures every 1/RD from 0.2, arrivals where the smooth count returned passes j − 1/2 */
  const nSmooth = (t) => NEQ * Math.tanh(G * t), back = (t) => RD * t - nSmooth(t);
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
  const freed = [];                          /* sites in the order they were vacated */
  const order = sites.map((s, i) => i).filter((i) => sites[i].top);
  for (let i = order.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [order[i], order[j]] = [order[j], order[i]]; }
  const events = [...outs.flatMap((t) => [[t, 'out', 'Ag'], [t + 0.12, 'out', 'Cl']]), ...ins.flatMap((t) => [[t, 'in', 'Ag'], [t + 0.12, 'in', 'Cl']])].sort((a, b) => a[0] - b[0]);
  const away = [];
  for (const [t, what, kind] of events) {
    if (what === 'out') {
      const s = order.find((i) => sites[i].kind === kind && at[i] >= 0);
      const ion = ions[at[s]]; at[s] = -1; freed.push(s);
      ion.trips.push({ t0: t, from: s, c: inWater(0.05, 0.4, 1.05, 0.15), ph: [rand() * TAU, rand() * TAU, rand() * TAU] });
      away.push(ion);
    } else {
      const k = away.findIndex((ion) => ion.kind === kind && ion.trips[ion.trips.length - 1].t0 + TR <= t - TR);
      if (k < 0) continue;
      const ion = away.splice(k, 1)[0], f = freed.findIndex((i) => sites[i].kind === kind);
      const s = freed.splice(f, 1)[0], tr = ion.trips[ion.trips.length - 1];
      tr.t1 = t; tr.to = s; at[s] = ions.indexOf(ion);
    }
  }
  const dissolved = (t) => outs.filter((x) => x <= t).length;
  const returned = (t) => ins.filter((x) => x <= t).length;

  const smooth = F.ease.smooth;
  const bez = (a, c, b, k) => [0, 1, 2].map((i) => (1 - k) * (1 - k) * a[i] + 2 * k * (1 - k) * c[i] + k * k * b[i]);
  const wander = (tr, t) => [tr.c[0] + 0.12 * Math.sin(1.3 * t + tr.ph[0]), tr.c[1] + 0.08 * Math.sin(1.1 * t + tr.ph[1]), tr.c[2] + 0.12 * Math.sin(0.9 * t + tr.ph[2])];
  const lift = (p) => [p[0] * 1.15, p[1] + 0.45, p[2] * 1.15];
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

  /* water: bent molecules (O–H 0.96 Å, 104.5°) placed once, each jiggling about its place */
  const HW = 52.25 * Math.PI / 180, waters = [];
  for (let n = 0; n < 22; n++) {
    const p = inWater(FLOOR + 0.15, SURF - 0.12, 1.18, 0.12), a = rand() * TAU, b = rand() * TAU;
    const u = [Math.cos(a) * Math.cos(b), Math.sin(b), Math.sin(a) * Math.cos(b)];
    const w = [-Math.sin(a), 0, Math.cos(a)];
    waters.push({ p, u, w, ph: rand() * TAU });
  }
  const wpos = (m, t) => {
    const j = 0.035, c = [m.p[0] + j * Math.sin(2.1 * t + m.ph), m.p[1] + j * Math.sin(1.7 * t + 2 * m.ph), m.p[2] + j * Math.sin(1.9 * t + 3 * m.ph)];
    const h = (s) => [0, 1, 2].map((i) => c[i] + 0.096 * (Math.cos(HW) * m.u[i] + s * Math.sin(HW) * m.w[i]));
    return [c, h(1), h(-1)];
  };

  const cy = F.cycle(() => T, 1.2);
  let sig = '', ionMesh = [], waterMesh = [];
  const palSig = () => [PAL.ink, PAL.panel, PAL.soft, PAL.muted, F.el('Ag'), F.el('Cl'), F.el('O'), F.el('H')].join('|');
  function build() {
    if (palSig() === sig) return; sig = palSig();
    v.clear();
    v.pickable(F.mesh.box(grp, [0, FLOOR - 0.08, 0], [3.6, 0.06, 3.0], PAL.soft), 'the bench');
    const glass = new T3D.Mesh(new T3D.CylinderGeometry(R, R, TOP - FLOOR, 48, 1, true), F.mesh.mat(PAL.ink, { transparent: true, opacity: 0.1, depthWrite: false, side: T3D.DoubleSide }));
    glass.position.set(0, (TOP + FLOOR) / 2, 0); grp.add(glass); v.pickable(glass, 'the beaker');
    const water = new T3D.Mesh(new T3D.CylinderGeometry(R - 0.01, R - 0.01, SURF - FLOOR, 48), F.mesh.mat(PAL.ink, { transparent: true, opacity: 0.05, depthWrite: false }));
    water.position.set(0, (SURF + FLOOR) / 2, 0); grp.add(water);
    const base = new T3D.Mesh(new T3D.CylinderGeometry(R, R, 0.03, 48), F.mesh.mat(PAL.ink, { transparent: true, opacity: 0.18 }));
    base.position.set(0, FLOOR - 0.015, 0); grp.add(base);
    ionMesh = ions.map((ion) => v.pickable(F.mesh.sphere(grp, sites[ion.home].p, RAD[ion.kind], F.el(ion.kind)), NAME[ion.kind]));
    waterMesh = waters.map(() => {
      const o = v.pickable(F.mesh.sphere(grp, [0, 0, 0], 0.12, F.el('O')), 'a water molecule, H₂O');
      const h1 = v.pickable(F.mesh.sphere(grp, [0, 0, 0], 0.075, F.el('H')), 'a water molecule, H₂O');
      const h2 = v.pickable(F.mesh.sphere(grp, [0, 0, 0], 0.075, F.el('H')), 'a water molecule, H₂O');
      return [o, h1, h2];
    });
  }

  /* the strip: the counts of pairs dissolved and returned so far against the clock */
  const B = { l: 190, r: 980, t: 78, b: 222 };
  function drawStrip(t) {
    const { ctx } = begin(strip);
    const legend = [['Ag', 'Ag⁺ ion', RAD.Ag], ['Cl', 'Cl⁻ ion', RAD.Cl], ['O', 'water molecule', 0.12]];
    legend.forEach(([s, name, r], i) => {
      const x = 230 + i * 260, y = 30, rr = 70 * r;
      ctx.save(); ctx.beginPath(); ctx.arc(x, y, rr, 0, TAU); ctx.fillStyle = F.el(s); ctx.fill(); ctx.lineWidth = 1.5; ctx.strokeStyle = alpha(PAL.ink, 0.45); ctx.stroke();
      if (s === 'O') [-1, 1].forEach((sg) => { ctx.beginPath(); ctx.arc(x + sg * 8, y - 7, 5, 0, TAU); ctx.fillStyle = F.el('H'); ctx.fill(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 1.5; ctx.stroke(); });
      ctx.restore();
      text(ctx, name, x + rr + 14, y, PAL.ink, { size: 18 });
    });
    const X = (s) => B.l + (s / T) * (B.r - B.l), Y = (n) => B.b - (n / 16) * (B.b - B.t);
    line(ctx, B.l, B.b, B.r, B.b, PAL.muted, 2); line(ctx, B.l, B.t, B.l, B.b, PAL.muted, 2);
    [0, 4, 8, 12, 16].forEach((n) => { line(ctx, B.l - 6, Y(n), B.l, Y(n), PAL.muted, 2); text(ctx, String(n), B.l - 12, Y(n), PAL.muted, { size: 16, align: 'right' }); });
    text(ctx, 'ion pairs', B.l - 52, B.t - 22, PAL.ink, { size: 17, weight: 600, align: 'center' });
    text(ctx, 'time →', B.r, B.b + 18, PAL.muted, { size: 16, align: 'right' });
    const steps = (times, upto, dash) => {
      ctx.save(); ctx.strokeStyle = dash ? PAL.muted : PAL.ink; ctx.lineWidth = 4; if (dash) ctx.setLineDash([10, 8]);
      ctx.beginPath(); ctx.moveTo(X(0), Y(0)); let n = 0;
      for (const s of times) { if (s > upto) break; ctx.lineTo(X(s), Y(n)); n += 1; ctx.lineTo(X(s), Y(n)); }
      ctx.lineTo(X(upto), Y(n)); ctx.stroke(); ctx.restore();
    };
    steps(outs, t, false); steps(ins, t, true);
    const D = dissolved(t), P = returned(t);
    line(ctx, X(t), B.t, X(t), B.b, alpha(PAL.ink, 0.25), 2, [4, 8]);
    if (D - P > 0) F.vbracket(ctx, X(t) + 10, Y(D), Y(P), PAL.ink, '', 1);
    const L = 1030;
    line(ctx, L, 104, L + 44, 104, PAL.ink, 4); text(ctx, `dissolved, ${D}`, L + 58, 104, PAL.ink, { size: 18 });
    line(ctx, L, 146, L + 44, 146, PAL.muted, 4, [10, 8]); text(ctx, `returned, ${P}`, L + 58, 146, PAL.ink, { size: 18 });
    F.vbracket(ctx, L + 22, 172, 204, PAL.ink, '', 1); text(ctx, `in solution, ${D - P}`, L + 58, 188, PAL.ink, { size: 18 });
  }
  function draw() {
    build();
    const t = cy.now();
    ions.forEach((ion, i) => { const p = where(ion, t); ionMesh[i].position.set(p[0], p[1], p[2]); });
    waters.forEach((m, i) => wpos(m, t).forEach((p, j) => waterMesh[i][j].position.set(p[0], p[1], p[2])));
    v.headline(nSmooth(t) < 0.95 * NEQ ? 'Ag⁺ and Cl⁻ ions leave the solid faster than they return.' : 'Ions now leave the solid and return to it at the same rate: the solution is saturated.');
    v.invalidate();
    drawStrip(t);
    ro.set(SAT, NOTE, { values: false });
  }
  const ro = F.readout(d);
  const SAT = `\\kKsp = [\\text{Ag}^{+}][\\text{Cl}^{-}] = (${hue('concentration', '1.26 \\times 10^{-5}')})(${hue('concentration', '1.26 \\times 10^{-5}')}) = ${hue('equilibrium-constant', '1.6 \\times 10^{-10}')}`;
  const NOTE = 'A saturated solution holds one Ag⁺ ion for every 4.4 million water molecules; the beaker draws one for every five.';
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
  const H = 640, d = sim('sim-ksp-plane', H);
  const KS = { cl: 1.6e-10, br: 5.0e-13 }, LK = { cl: Math.log10(1.6e-10), br: Math.log10(5.0e-13) };
  const START = { one: { a: -4, c: -4, r: -4 }, two: { a: -9, c: -1, r: -4 } };
  const pick = F.choice(d.controls, {
    label: '\\text{mixture}', key: 'mixture', aria: 'the mixture of ions', value: 'one',
    options: [{ value: 'one', label: 'AgCl' }, { value: 'two', label: 'AgCl and AgBr' }],
    onInput: (m) => { const s = START[m]; ag.set(s.a); cl.set(s.c); br.set(s.r); br.show(m === 'two'); [ag, cl, br].forEach((h) => h.refresh()); draw(); },
  });
  const ag = ctl(d.controls, { label: '[\\text{Ag}^{+}]', cls: 'concentration', key: 'ag', min: -12, max: -2, step: 0.01, value: -4, unit: 'M', dec: 2,
    aria: 'the silver ion concentration, on a logarithmic scale',
    specials: [{ at: () => LK.cl - cl.v, label: 'AgCl' }, { at: () => (pick.value === 'two' ? LK.br - br.v : null), label: 'AgBr' }], onInput: () => draw() });
  const cl = ctl(d.controls, { label: '[\\text{Cl}^{-}]', cls: 'concentration', key: 'cl', min: -10, max: 0, step: 0.01, value: -4, unit: 'M', dec: 2,
    aria: 'the chloride ion concentration, on a logarithmic scale', specials: [{ at: () => LK.cl - ag.v, label: 'saturated' }], onInput: () => draw() });
  const br = ctl(d.controls, { label: '[\\text{Br}^{-}]', cls: 'concentration', key: 'br', min: -10, max: 0, step: 0.01, value: -4, unit: 'M', dec: 2,
    aria: 'the bromide ion concentration, on a logarithmic scale', specials: [{ at: () => LK.br - ag.v, label: 'saturated' }], onInput: () => draw() });
  br.show(false, { ms: 0 });
  const box = (h) => h.el.querySelector('.ctl-val');
  const ro = F.readout(d);
  let hits = [];
  F.hover(d.stage, () => hits);

  const G = { l: 210, r: 1250, t: 120, b: 560 }, XR = [-12, -2], YR = [-12, 0];
  /* a product shown from rounded factors, so the numbers on screen multiply to the number on screen */
  const rel = (q, k) => (Math.abs(q / k - 1) < 0.03 ? '=' : q > k ? '>' : '<');
  function draw() {
    const { ctx } = begin(d.c);
    const two = pick.value === 'two', a = 10 ** ag.v, c = 10 ** cl.v, r = 10 ** br.v;
    [[ag, a], [cl, c], [br, r]].forEach(([h, x]) => { const b = box(h); if (b) b.textContent = sciText(x); });
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
      ro.set(`\\kQsp = [\\text{Ag}^{+}][\\text{Cl}^{-}] = (\\mk{a}{${hue('concentration', sciTex(ar))}})(\\mk{c}{${hue('concentration', sciTex(cr))}}) = \\mk{q}{${hue('equilibrium-constant', sciTex(q))}} \\mk{rel}{${how === '>' ? '\\gt' : how === '<' ? '\\lt' : '='}} \\mk{K}{\\kKsp}`, undefined, { form: 'one' });
    } else {
      const k = LK.cl - cl.v <= LK.br - br.v ? 'cl' : 'br', xr = k === 'cl' ? cr : rr, ion = k === 'cl' ? '[\\text{Cl}^{-}]' : '[\\text{Br}^{-}]';
      const t = round2(KS[k] / xr);
      ro.set(`[\\text{Ag}^{+}] = \\frac{\\kKsp}{${ion}} = \\frac{\\mk{K}{${hue('equilibrium-constant', sciTex(KS[k]))}}}{\\mk{x}{${hue('concentration', sciTex(xr))}}} = \\mk{t}{${hue('concentration', sciTex(t))}}\\ \\text{M}`, undefined, { form: 'two-' + k });
    }
  }
  register(d.fig, { update: () => {}, draw });
})();
};
