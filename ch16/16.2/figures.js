/* Figures for section 16.2 Entropy. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['16.2'] = function (root, F) {
const { C, PAL, alpha, ctl, cycle, register, begin, line, text, topline, dot } = F;
const sim = (id, H) => F.sim(root, id, H);
const still = (d, draw) => register(d.fig, { update: () => {}, draw });
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;
const KB = 1.38e-23, LET = 'abcdefg', TAU = 2 * Math.PI;
const clamp = (x, a, b) => Math.min(Math.max(x, a), b);
/* a value in scientific notation to three figures, as TeX: 2.47\times 10^{-23}; zero stays 0 */
function sci(x) {
  if (Math.abs(x) < 1e-40) return '0';
  let e = Math.floor(Math.log10(Math.abs(x))), m = +(x / 10 ** e).toFixed(2);
  if (Math.abs(m) >= 10) { m /= 10; e += 1; }
  return `${m < 0 ? '-' : ''}${Math.abs(m).toFixed(2)}\\times 10^{${e}}`;
}
/* a count as the page writes it: digits with commas below a million, three figures and a power of ten above */
const SUP = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
const parts = (x) => { let e = Math.floor(Math.log10(x)), m = +(x / 10 ** e).toFixed(2); if (m >= 10) { m /= 10; e += 1; } return [m.toFixed(2), e]; };
const count = (x) => (x < 1e6 ? Math.round(x).toLocaleString('en-US') : (([m, e]) => `${m} × 10${String(e).split('').map((c) => SUP[c]).join('')}`)(parts(x)));
const countTex = (x) => (x < 1e6 ? Math.round(x).toLocaleString('en-US').replace(/,/g, '{,}') : (([m, e]) => `${m}\\times 10^{${e}}`)(parts(x)));
const choose = (n, k) => { let c = 1; for (let i = 1; i <= k; i++) c = (c * (n - k + i)) / i; return Math.round(c); };
/* the readout of both counting figures, ΔS = k ln(W_f/W_i) with the live counts */
function deltaS(ro, wi, wf) {
  const ds = KB * Math.log(wf / wi);
  ro.set(`\\kdS = k\\ln\\frac{W_{\\text{f}}}{W_{\\text{i}}} = 1.38\\times 10^{-23}\\ \\mathrm{J/K}\\times\\ln\\frac{\\mk{wf}{${countTex(wf)}}}{\\mk{wi}{${countTex(wi)}}} = \\mk{ds}{${hue('entropy', sci(ds))}}\\ \\mathrm{J/K}`);
}
/* Both counting figures draw one pile per distribution along a number line: the microstates of a distribution
   stacked on its place, one tile each, so a pile's height is its W; where there are too many to draw, a bar of
   that height. The tallest pile fills the stage at every setting (the heights are relative; each pile carries
   its own W), so the frame is fixed and only the piles change.
   o: W [count per distribution], total, tiles (null for bars, else [per distribution [microstate …]]),
   tile(ctx, m, x, y, w, h) draws one microstate, letters (the book's (a), (b), … or null), ia, ib the initial
   and final distributions, title the number line's name, every the tick step, name(k) a bar's hover name.
   Returns the hover hits of the bars. */
const PX0 = 60, PX1 = 1340, PTOP = 168, PBASE = 560, PILE_H = 690;
function piles(ctx, o) {
  const n = o.W.length, slot = (PX1 - PX0) / n, xc = (k) => PX0 + (k + 0.5) * slot, wmax = Math.max(...o.W), hits = [];
  const tw = Math.min(slot - 36, 300), th = o.tiles ? Math.min(104, (PBASE - PTOP) / wmax) : 0;
  const band = (k) => [xc(k) - Math.max(slot, 10) / 2 + 3, PTOP - 76, Math.max(slot, 10) - 6, PBASE - PTOP + 76];
  /* the final distribution stands on a filled band, the initial one inside a dashed outline */
  ctx.save();
  ctx.fillStyle = alpha(PAL.ink, 0.08); ctx.fillRect(...band(o.ib));
  ctx.strokeStyle = alpha(PAL.ink, 0.6); ctx.lineWidth = 2; ctx.setLineDash([10, 8]); ctx.strokeRect(...band(o.ia));
  ctx.restore();
  line(ctx, PX0 - 10, PBASE, PX1 + 10, PBASE, PAL.muted, 2.5);
  o.W.forEach((w, k) => {
    const x = xc(k);
    let top;
    if (o.tiles) {
      o.tiles[k].forEach((m, j) => o.tile(ctx, m, x - tw / 2, PBASE - (j + 1) * th + Math.min(4, th * 0.12), tw, th - Math.min(8, th * 0.24)));
      top = PBASE - w * th;
    } else {
      const bw = Math.max(2, Math.min(slot * 0.78, 120)), h = Math.max(1.5, ((PBASE - PTOP) * w) / wmax);
      ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.34); ctx.fillRect(x - bw / 2, PBASE - h, bw, h); ctx.restore();
      top = PBASE - h;
      hits.push({ x, y: Math.min(PBASE - 14, top + h / 2), r: Math.max(8, Math.min(slot / 2, 40)), name: o.name(k) });
    }
    if (n <= 13) {
      text(ctx, `${count(w)}/${count(o.total)}`, x, top - 14, PAL.muted, { size: n > 9 ? 14 : 17, align: 'center' });
      text(ctx, n > 9 ? count(w) : `W = ${count(w)}`, x, top - 36, PAL.ink, { size: n > 9 ? 17 : 20, weight: 600, align: 'center' });
      if (o.letters) text(ctx, `(${o.letters[k]})`, x, top - 62, PAL.ink, { size: 21, weight: 600, align: 'center' });
    } else if (k === 0 || k === n - 1 || w === wmax) text(ctx, `W = ${count(w)}`, x, top - 18, PAL.ink, { size: 19, weight: 600, align: k === 0 ? 'left' : k === n - 1 ? 'right' : 'center' });
    if (k % o.every === 0) { line(ctx, x, PBASE, x, PBASE + 8, PAL.muted, 2); text(ctx, String(k), x, PBASE + 24, PAL.muted, { size: 17, align: 'center' }); }
  });
  /* the names of the two marks, under their piles; on one line unless they would touch */
  const xa = clamp(xc(o.ia), PX0 + 30, PX1 - 30), xb = clamp(xc(o.ib), PX0 + 22, PX1 - 22);
  if (o.ia === o.ib) text(ctx, 'initial and final', clamp(xa, PX0 + 70, PX1 - 70), PBASE + 54, PAL.ink, { size: 18, weight: 600, align: 'center' });
  else {
    text(ctx, 'initial', xa, PBASE + 54, PAL.ink, { size: 18, weight: 600, align: 'center' });
    text(ctx, 'final', xb, PBASE + (Math.abs(xa - xb) < 76 ? 78 : 54), PAL.ink, { size: 18, weight: 600, align: 'center' });
  }
  text(ctx, o.title, (PX0 + PX1) / 2, PBASE + 106, PAL.muted, { size: 18, align: 'center' });
  return hits;
}

/* =====================================================================
   FIGURE 16.8: N particles in two boxes, one pile per distribution on a
   number line of the count in the right box. Up to six particles every
   microstate is drawn as the book draws it, two boxes side by side with
   each particle in its own place, so the piles at N = 4 are the book's
   rows (a) to (e) stood on end: 1, 4, 6, 4, 1. From eight particles on a
   pile is a bar of height W = N!/(k!(N − k)!). N runs over the even
   numbers 2 to 100, so there is always an even split; 2¹⁰⁰ = 1.27 × 10³⁰
   and the even split of 100 holds 1.01 × 10²⁹. Still: a count has no time
   in it. The particles are told apart by colour and named on hover; the
   text names none, so they are instances (F.cat), not referents.
===================================================================== */
(function () {
  const d = sim('sim-microstates', PILE_H);
  const side = (label, key, aria, value) => ctl(d.controls, { label, cls: '', key, min: 0, max: 4, step: 1, value, unit: '', dec: 0, aria,
    fmt: (v) => `${N.v - v} left, ${v} right`, onInput: () => draw() });
  const N = ctl(d.controls, { label: 'N', cls: '', key: 'N', min: 2, max: 100, step: 2, value: 4, unit: '', dec: 0, aria: 'the number of particles',
    fmt: (v) => `${v} particles`, onInput: () => { A.range({ min: 0, max: N.v, step: 1, value: 0 }); B.range({ min: 0, max: N.v, step: 1, value: N.v / 2 }); draw(); } });
  const A = side('\\text{initial}', 'from', 'the initial distribution, as the number of particles in the right box', 0);
  const B = side('\\text{final}', 'to', 'the final distribution, as the number of particles in the right box', 2);
  const ro = F.readout(d);
  let hits = []; F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c), n = N.v, total = 2 ** n, ia = clamp(Math.round(A.v), 0, n), ib = clamp(Math.round(B.v), 0, n);
    const W = Array.from({ length: n + 1 }, (_, k) => choose(n, k));
    let tiles = null;
    if (n <= 6) {
      tiles = W.map(() => []);
      for (let m = 0; m < total; m++) { let k = 0; for (let i = 0; i < n; i++) if (m >> i & 1) k++; tiles[k].push(m); }
    }
    hits = [];
    /* one microstate: each particle keeps its own place in whichever box it is, as the book draws them */
    const cols = n === 6 ? 6 : 2, rows = n / cols;
    const tile = (c, m, x, y, w, h) => {
      const r = Math.min(13, h / (2 * rows) - 3, w / (4 * cols) - 2), gx = Math.min(w / 2 / (cols + 0.4), 3.2 * r), gy = Math.min(h / rows, 3 * r);
      c.save(); c.strokeStyle = PAL.muted; c.lineWidth = 2; c.strokeRect(x, y, w, h); c.restore(); line(c, x + w / 2, y, x + w / 2, y + h, PAL.muted, 2);
      for (let i = 0; i < n; i++) {
        const s = m >> i & 1, cx = x + (s ? 0.75 : 0.25) * w + ((i % cols) - (cols - 1) / 2) * gx, cy = y + h / 2 + (Math.floor(i / cols) - (rows - 1) / 2) * gy;
        dot(c, cx, cy, F.cat(i), true, r);
        hits.push({ x: cx, y: cy, r: r + 3, name: `particle ${i + 1}, in the ${s ? 'right' : 'left'} box` });
      }
    };
    const bars = piles(ctx, { W, total, tiles, tile, letters: n === 4 ? LET : null, ia, ib, title: 'particles in the right box',
      every: n <= 12 ? 1 : n <= 24 ? 2 : n <= 50 ? 5 : 10,
      name: (k) => `${n - k} in the left box and ${k} in the right: ${count(W[k])} microstates` });
    hits.push(...bars);
    topline(ctx, `With ${n} particles, ${count(W[n / 2])} of the ${count(total)} microstates split them evenly and 2 put them all in one box.`);
    deltaS(ro, W[ia], W[ib]);
  }
  still(d, draw);
})();

/* =====================================================================
   FIGURE 16.9: q units of thermal energy shared by the hot object
   (particles A, B) and the cold object (C, D), one pile per distribution
   on a number line of the units in the cold object. The units cannot be
   told apart, so a microstate is how many each particle holds: with j
   units in the cold object there are (q − j + 1)(j + 1) of them, and
   (q + 1)(q + 2)(q + 3)/6 in all. q = 2 is the book's figure, its rows
   (a), (b), (c) stood on end: 3, 4, 3 of 10. At 2 and 4 units every
   microstate is drawn, the units as the book's asterisks (ink) in a row
   over the particle that holds them; from 6 units on a pile is a bar.
   q runs over the even numbers 2 to 12, so an even sharing always
   exists. Still.
===================================================================== */
(function () {
  const d = sim('sim-energy-microstates', PILE_H);
  const side = (label, key, aria, value) => ctl(d.controls, { label, cls: '', key, min: 0, max: 2, step: 1, value, unit: '', dec: 0, aria,
    fmt: (v) => `${Q.v - v} hot, ${v} cold`, onInput: () => draw() });
  const Q = ctl(d.controls, { label: '\\text{energy}', cls: '', key: 'q', min: 2, max: 12, step: 2, value: 2, unit: '', dec: 0, aria: 'the number of units of energy',
    fmt: (v) => `${v} units`, onInput: () => { A.range({ min: 0, max: Q.v, step: 1, value: 0 }); B.range({ min: 0, max: Q.v, step: 1, value: Q.v / 2 }); draw(); } });
  const A = side('\\text{initial}', 'from', 'the initial distribution, as the units of energy in the cold object', 0);
  const B = side('\\text{final}', 'to', 'the final distribution, as the units of energy in the cold object', 1);
  const ro = F.readout(d);
  const P = ['A', 'B', 'C', 'D'], UNITS = ['no unit', 'one unit', 'two units', 'three units', 'four units'];
  let hits = []; F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c), q = Q.v, hot = F.ref('hot-object'), cold = F.ref('cold-object');
    const ia = clamp(Math.round(A.v), 0, q), ib = clamp(Math.round(B.v), 0, q);
    const W = Array.from({ length: q + 1 }, (_, j) => (q - j + 1) * (j + 1)), total = W.reduce((a, b) => a + b, 0);
    let tiles = null;
    /* in the book's order: the hot object's units on A first, then the cold object's on C first */
    if (q <= 4) tiles = W.map((_, j) => { const out = []; for (let a = q - j; a >= 0; a--) for (let c = j; c >= 0; c--) out.unshift([a, q - j - a, c, j - c]); return out.reverse(); });
    hits = [];
    const tile = (c, m, x, y, w, h) => {
      const fs = clamp(h * 0.44, 17, 36), ly = y + h - fs * 0.62, sy = ly - fs * 0.78, gap = fs * 0.42;
      c.save(); c.strokeStyle = PAL.muted; c.lineWidth = 2; c.strokeRect(x, y, w, h); c.restore(); line(c, x + w / 2, y, x + w / 2, y + h, PAL.muted, 2);
      P.forEach((p, i) => {
        const px = x + (i + 0.5) * (w / 4);
        text(c, p, px, ly, i < 2 ? hot : cold, { size: fs, weight: 600, align: 'center' });
        for (let u = 0; u < m[i]; u++) text(c, '*', px + (u - (m[i] - 1) / 2) * gap, sy + fs * 0.16, PAL.ink, { size: fs, weight: 600, align: 'center' });
        hits.push({ x: px, y: (ly + sy) / 2, r: w / 8, name: `particle ${p} of the ${i < 2 ? 'hot' : 'cold'} object, ${UNITS[m[i]]} of energy` });
      });
    };
    const bars = piles(ctx, { W, total, tiles, tile, letters: q === 2 ? LET : null, ia, ib, title: 'units of energy in the cold object', every: 1,
      name: (j) => `${q - j} units in the hot object and ${j} in the cold: ${W[j]} microstates` });
    hits.push(...bars);
    topline(ctx, `The ${q} units of energy all stay in the hot object in ${W[0]} of the ${total} microstates and are shared evenly in ${W[q / 2]}.`);
    deltaS(ro, W[ia], W[ib]);
  }
  still(d, draw);
})();

/* =====================================================================
   FIGURE 16.10 + 16.11: one mole of water heated from 100 to 1000 K,
   drawn flat. NM water molecules in a closed container whose inside is
   BW by BH. Solid: each molecule is pulled to its site in a compact block
   on the floor and vibrates about it. Liquid: the molecules collide as
   disks, a pull to the floor keeps them together at the bottom, and a
   thermostat holds their speed near VL·√(T/298). Gas: no pull, speed near
   VG·√(T/298), trails behind. Speeds are the drawing's, not water's.
   A change of phase tweens a phase coordinate; molecule i crosses when
   the coordinate passes its own threshold (LaggedStart); at 273.15 K and
   373.15 K, the dashed circles, half hold the old phase and half the new.
   Beside it, S against T (0 to 1000 K, 0 to 250 J/K, fixed) and the
   distribution of kinetic energies f(E) = 2/√π (RT)^(−3/2) √E e^(−E/RT)
   per mole (0 to 20 kJ/mol; its peak at 100 K, 0.58 per kJ/mol, under
   the 0.62 top). S of one mole: ΔH_fus 6.01 kJ and ΔH_vap 40.7 kJ
   (Chapter 10), liquid C_p 75.3 J/K, gas C_p 33.6 J/K, the solid's S
   proportional to T, fixed so that the liquid at 298.15 K has Appendix
   G's 70.0 J/K.
===================================================================== */
(function () {
  const H = 660, d = sim('sim-entropy-phase', H);
  const TM = 273.15, TB = 373.15, HF = 6010, HV = 40700, CL = 75.3, CG = 33.6, R = 8.3145;
  const SL0 = 70.0 - CL * Math.log(298.15 / TM), SS0 = SL0 - HF / TM, SLB = SL0 + CL * Math.log(TB / TM), SG0 = SLB + HV / TB;
  const Ss = (t) => (SS0 * t) / TM, Sl = (t) => SL0 + CL * Math.log(t / TM), Sg = (t) => SG0 + CG * Math.log(t / TB);
  const S = (t) => (t < TM ? Ss(t) : t < TB ? Sl(t) : Sg(t));
  const on = (t, x) => Math.abs(t - x) < 1e-6;
  const phaseOf = (t) => (on(t, TM) ? 0.5 : on(t, TB) ? 1.5 : t < TM ? 0 : t < TB ? 1 : 2);
  const T = ctl(d.controls, { label: '\\kT', cls: 'temperature', key: 'T', min: 100, max: 1000, step: 1, value: 298, unit: 'K', dec: 0,
    aria: 'the temperature of the water in kelvin',
    specials: [{ at: TM, label: 'melting' }, { at: TB, label: 'boiling' }],
    onInput: () => { const p = phaseOf(T.v); ph.to(p, 1400 * Math.max(0.5, Math.abs(p - ph.v))); } });
  const ph = F.tween(d, phaseOf(T.v));
  const cy = cycle(() => Infinity, 0);
  const ro = F.readout(d);

  /* the container's inside: left BX, top BY, BW by BH; a molecule is a disk of radius RM for collisions */
  const BX = 70, BY = 100, BW = 440, BH = 500, RM = 22, NM = 24, VL = 150, VG = 520, GL = 900;
  const rnd = (i) => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
  /* the solid's sites: a block six wide and four high on the floor, rows offset as in a close packing */
  const SITE = Array.from({ length: NM }, (_, i) => {
    const c = i % 6, r = Math.floor(i / 6);
    return [BW / 2 + (c - 2.5) * 46 + (r % 2 ? 11 : -11), BH - RM - 4 - r * 42];
  });
  const M = SITE.map((s, i) => ({ x: s[0], y: s[1], vx: 0, vy: 0, a: rnd(i + 7) * TAU, w: (i % 2 ? 0.5 : 0) + (Math.floor(i / 2) / 12) * 0.45, f: [5 + (i % 4), 6 + ((i + 1) % 3)], q: [rnd(i + 3) * TAU, rnd(i + 5) * TAU], tr: [] }));
  /* molecule i's phase now: 0 solid, 1 liquid, 2 gas */
  const phaseI = (i) => { const pv = ph.v, k = Math.min(1, Math.floor(pv)); return pv - k > M[i].w + 1e-9 ? k + 1 : k; };
  let clock = 0;
  const kick = (m, v) => { const a = Math.random() * TAU; m.vx = v * Math.cos(a); m.vy = v * Math.sin(a); };
  /* start in the opening phase, already settled: a liquid spread over the floor, a gas through the box */
  (function seed() {
    const p0 = phaseOf(T.v);
    M.forEach((m, i) => {
      if (p0 >= 1) { m.x = RM + 4 + (i % 9) * ((BW - 2 * RM - 8) / 8); m.y = p0 >= 2 ? RM + rnd(i + 11) * (BH - 2 * RM) : BH - RM - 2 - Math.floor(i / 9) * 44 - rnd(i) * 6; kick(m, VL); }
    });
  })();
  function step(dt) {
    const s = Math.sqrt(T.v / 298), ps = M.map((_, i) => phaseI(i));
    clock += dt;
    M.forEach((m, i) => {
      const p = ps[i];
      if (p === 0) {
        const amp = 3 + 4 * Math.sqrt(T.v / 273), sx = SITE[i][0] + amp * Math.sin(m.f[0] * clock + m.q[0]), sy = SITE[i][1] + amp * Math.sin(m.f[1] * clock + m.q[1]);
        const k = Math.min(1, 5 * dt); m.vx = (sx - m.x) / Math.max(dt, 1e-3) * k; m.vy = (sy - m.y) / Math.max(dt, 1e-3) * k;
        m.x += (sx - m.x) * k; m.y += (sy - m.y) * k; return;
      }
      if (p === 1) m.vy += GL * dt;
      const v = Math.hypot(m.vx, m.vy), want = (p === 1 ? VL : VG) * s;
      if (v < 1) kick(m, want); else { const f = 1 + Math.min(0.5, 6 * dt) * (want / v - 1); m.vx *= f; m.vy *= f; }
      m.x += m.vx * dt; m.y += m.vy * dt;
      m.a += (p === 1 ? 1.2 : 2.5) * s * dt * (i % 2 ? 1 : -1);
      if (m.x < RM) { m.x = RM; m.vx = Math.abs(m.vx); } if (m.x > BW - RM) { m.x = BW - RM; m.vx = -Math.abs(m.vx); }
      if (m.y < RM) { m.y = RM; m.vy = Math.abs(m.vy); } if (m.y > BH - RM) { m.y = BH - RM; m.vy = -Math.abs(m.vy) * (p === 1 ? 0.6 : 1); }
    });
    /* disk collisions: two moving molecules exchange their velocities along the line of centres; a moving one
       bounces off a molecule held in the solid as off a wall */
    for (let i = 0; i < NM; i++) for (let j = i + 1; j < NM; j++) {
      const a = M[i], b = M[j], dx = b.x - a.x, dy = b.y - a.y, r = Math.hypot(dx, dy);
      if (r >= 2 * RM || r === 0) continue;
      const nx = dx / r, ny = dy / r, over = 2 * RM - r, sa = ps[i] === 0, sb = ps[j] === 0;
      if (sa && sb) continue;
      if (sa || sb) {
        const m = sa ? b : a, sg = sa ? 1 : -1;
        m.x += sg * nx * over; m.y += sg * ny * over;
        const vn = m.vx * nx + m.vy * ny; if (vn * sg < 0) { m.vx -= 2 * vn * nx; m.vy -= 2 * vn * ny; }
        continue;
      }
      a.x -= nx * over / 2; a.y -= ny * over / 2; b.x += nx * over / 2; b.y += ny * over / 2;
      const rel = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny;
      if (rel < 0) { a.vx += rel * nx; a.vy += rel * ny; b.vx -= rel * nx; b.vy -= rel * ny; }
    }
  }
  /* one water molecule centred on its oxygen at (x, y), turned by a: element colours, hydrogen rimmed in ink */
  function water(ctx, x, y, a) {
    [-0.912, 0.912].forEach((q) => {
      ctx.save(); ctx.fillStyle = F.el('H'); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 1.4;
      ctx.beginPath(); ctx.arc(x + 15 * Math.sin(a + q), y + 15 * Math.cos(a + q), 9, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore();
    });
    ctx.save(); ctx.fillStyle = F.el('O'); ctx.strokeStyle = alpha(PAL.ink, 0.45); ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(x, y, 14, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore();
  }
  const fE = (E, t) => { const rt = (R * t) / 1000; return (2 / Math.sqrt(Math.PI)) * Math.pow(rt, -1.5) * Math.sqrt(E) * Math.exp(-E / rt); };
  const GS = { l: 700, r: 1310, t: 110, b: 330 }, GE = { l: 700, r: 1310, t: 430, b: 570 };
  let hits = []; F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c), t = T.v, p = phaseOf(t), ce = C('entropy'), ct = C('temperature');
    const tt = p === 0.5 || p === 1.5 ? t.toFixed(2) : String(Math.round(t));
    hits = [];
    /* the container and its molecules: trails first, the last 0.15 s of each moving molecule */
    ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.04); ctx.fillRect(BX, BY, BW, BH); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 4; ctx.strokeRect(BX - 2, BY - 2, BW + 4, BH + 4); ctx.restore();
    M.forEach((m) => {
      m.tr.push([clock, m.x, m.y]); while (m.tr.length && m.tr[0][0] < clock - 0.15) m.tr.shift();
      const pts = m.tr;
      for (let i = 1; i < pts.length; i++) {
        const k = i / (pts.length - 1 || 1);
        ctx.save(); ctx.strokeStyle = alpha(F.el('O'), 0.05 + 0.25 * k); ctx.lineWidth = 24 * (0.35 + 0.65 * k); ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(BX + pts[i - 1][1], BY + pts[i - 1][2]); ctx.lineTo(BX + pts[i][1], BY + pts[i][2]); ctx.stroke(); ctx.restore();
      }
    });
    M.forEach((m, i) => { water(ctx, BX + m.x, BY + m.y, phaseI(i) === 0 ? 0.3 * Math.sin(m.f[0] * clock + m.q[1]) : m.a); hits.push({ x: BX + m.x, y: BY + m.y, r: 24, name: 'a water molecule, H₂O' }); });
    hits.push({ x: BX + BW / 2, y: BY + 16, r: 30, name: 'the closed container' });

    /* S against T, the three ranges shaded as the book does */
    const g = F.axes(ctx, GS, [0, 1000], [0, 250], { nx: 5, ny: 5, xl: 'T (K)', xc: ct, yl: 'S (J/K)', yc: ce });
    [[0, TM, 0.08], [TM, TB, 0.04], [TB, 1000, 0.08]].forEach(([a, b, k]) => { ctx.save(); ctx.fillStyle = alpha(PAL.ink, k); ctx.fillRect(g.X(a), GS.t, g.X(b) - g.X(a), GS.b - GS.t); ctx.restore(); });
    [['solid', TM / 2, GS.t + 16], ['liquid', (TM + TB) / 2, GS.t + 16], ['gas', (TB + 1000) / 2, GS.b - 18]].forEach(([s, x, y]) => text(ctx, s, g.X(x), y, PAL.muted, { size: 17, align: 'center' }));
    F.plot(ctx, g, Ss, ce, { w: 4, x: [0, TM] });
    F.plot(ctx, g, Sl, ce, { w: 4, x: [TM, TB] });
    F.plot(ctx, g, Sg, ce, { w: 4, x: [TB, 1000] });
    const jump = (x, lo, hi, hot) => line(ctx, g.X(x), g.Y(lo), g.X(x), g.Y(hi), ce, hot ? 6 : 4);
    jump(TM, SS0, SL0, p === 0.5); jump(TB, SLB, SG0, p === 1.5);
    text(ctx, 'melting', g.X(TM) + 12, g.Y(SS0 + 2), PAL.muted, { size: 17 });
    text(ctx, 'boiling', g.X(TB) + 14, g.Y((SLB + SG0) / 2), PAL.muted, { size: 17, bg: PAL.panel });
    const drop = (sv) => { line(ctx, g.X(t), g.Y(sv), g.X(t), GS.b, alpha(ce, 0.6), 2.5, [4, 8]); line(ctx, GS.l, g.Y(sv), g.X(t), g.Y(sv), alpha(ce, 0.6), 2.5, [4, 8]); };
    if (p === 0.5 || p === 1.5) {
      const [lo, hi] = p === 0.5 ? [SS0, SL0] : [SLB, SG0];
      drop(hi); dot(ctx, g.X(t), g.Y(lo), ce, false, 10); dot(ctx, g.X(t), g.Y(hi), ce, true, 10);
    } else { drop(S(t)); dot(ctx, g.X(t), g.Y(S(t)), ce, true, 10); }

    /* the spread of kinetic energies: the live temperature in ink over the faint 100 K curve */
    const e = F.axes(ctx, GE, [0, 20], [0, 0.62], { nx: 4, ny: 0, xl: 'kinetic energy (kJ/mol)', xc: C('energy'), yl: 'fraction of molecules' });
    F.plot(ctx, e, (E) => fE(E, 100), alpha(PAL.ink, 0.3), { w: 3 });
    F.plot(ctx, e, (E) => fE(E, t), PAL.ink, { w: 4 });
    F.legend(ctx, e, [{ s: `${tt} K`, color: PAL.ink, w: 4 }, { s: '100 K', color: alpha(PAL.ink, 0.3), w: 3 }], { corner: 'tr' });

    topline(ctx, p === 0 ? `At ${tt} K the molecules of ice only vibrate about fixed positions.`
      : p === 0.5 ? 'At 273.15 K ice melts, and its molecules gain the freedom to move over and around one another.'
        : p === 1 ? `At ${tt} K the molecules of liquid water move over and around one another.`
          : p === 1.5 ? 'At 373.15 K water boils, and its molecules spread through the whole container.'
            : `At ${tt} K the molecules of water vapor fly freely through the whole container.`);
    if (p === 0.5 || p === 1.5) {
      const q = p === 0.5 ? HF : HV, tm = p === 0.5 ? TM : TB;
      ro.set(`\\kdS = \\frac{\\kqrev}{\\kT} = \\frac{\\mk{q}{${hue('energy', q === HF ? '6010' : '40\\,700')}}\\ \\mathrm{J}}{\\mk{t}{${hue('temperature', tm.toFixed(2))}}\\ \\mathrm{K}} = \\mk{s}{${hue('entropy', (q / tm).toFixed(1))}}\\ \\mathrm{J/K}`, undefined, { form: 'jump' });
    } else {
      const sym = ['\\kSsolid', '', '\\kSliquid', '', '\\kSgas'][p * 2];
      ro.set(`\\mk{S}{${sym}} = \\mk{s}{${hue('entropy', S(t).toFixed(1))}}\\ \\mathrm{J/K}`, undefined, { form: 'state' });
    }
  }
  register(d.fig, { update: (dt) => { cy.step(dt, () => 1); const n = Math.ceil(dt / 0.008); for (let k = 0; k < n; k++) step(dt / n); }, draw });
})();
};
