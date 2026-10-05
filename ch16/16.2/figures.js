/* Figures for section 16.2 Entropy. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['16.2'] = function (root, F) {
const { C, PAL, alpha, ctl, cycle, register, begin, line, text, topline, dot } = F;
const sim = (id, H) => F.sim(root, id, H);
const still = (d, draw) => register(d.fig, { update: () => {}, draw });
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;
const KB = 1.38e-23, LET = 'abcdefg';
const clamp = (x, a, b) => Math.min(Math.max(x, a), b);
/* a value in scientific notation to three figures, as TeX: 2.47\times 10^{-23}; zero stays 0 */
function sci(x) {
  if (Math.abs(x) < 1e-40) return '0';
  let e = Math.floor(Math.log10(Math.abs(x))), m = +(x / 10 ** e).toFixed(2);
  if (Math.abs(m) >= 10) { m /= 10; e += 1; }
  return `${m < 0 ? '-' : ''}${Math.abs(m).toFixed(2)}\\times 10^{${e}}`;
}
/* the probability bars of both counting figures share one scale: a probability of 1 is 300 units */
const BAR = 300;
/* the readout of both counting figures, ΔS = k ln(W_f/W_i) with the live counts */
function deltaS(ro, wi, wf) {
  const ds = KB * Math.log(wf / wi);
  ro.set(`\\kdS = k\\ln\\frac{W_{\\text{f}}}{W_{\\text{i}}} = 1.38\\times 10^{-23}\\ \\mathrm{J/K}\\times\\ln\\frac{\\mk{wf}{${wf}}}{\\mk{wi}{${wi}}} = \\mk{ds}{${hue('entropy', sci(ds))}}\\ \\mathrm{J/K}`);
}
/* one microstate as the book draws it: two boxes side by side, each bw by bh, top left at (x, y) */
function domino(ctx, x, y, bw, bh) {
  ctx.save(); ctx.strokeStyle = PAL.muted; ctx.lineWidth = 2;
  ctx.strokeRect(x, y, 2 * bw, bh); line(ctx, x + bw, y, x + bw, y + bh, PAL.muted, 2); ctx.restore();
}
/* the row a distribution occupies, marked as the initial state (hollow, dashed) or the final one (filled) */
function rowMark(ctx, y0, y1, initial, final) {
  ctx.save();
  if (final) { ctx.fillStyle = alpha(PAL.ink, 0.07); ctx.fillRect(22, y0, 1356, y1 - y0); }
  if (initial) { ctx.strokeStyle = alpha(PAL.ink, 0.55); ctx.lineWidth = 2; ctx.setLineDash([10, 10]); ctx.strokeRect(22, y0, 1356, y1 - y0); }
  ctx.restore();
}
/* the key to the two row marks, in the header line at (x, y) */
function markKey(ctx, x, y) {
  ctx.save(); ctx.strokeStyle = alpha(PAL.ink, 0.55); ctx.lineWidth = 2; ctx.setLineDash([6, 5]); ctx.strokeRect(x, y - 9, 34, 18);
  ctx.setLineDash([]); ctx.fillStyle = alpha(PAL.ink, 0.12); ctx.fillRect(x + 130, y - 9, 34, 18); ctx.restore();
  text(ctx, 'initial', x + 42, y, PAL.muted, { size: 17 });
  text(ctx, 'final', x + 172, y, PAL.muted, { size: 17 });
}
/* a distribution's letter at the left, and W with its probability bar at the right */
function rowFrame(ctx, k, yc, W, total, initial, final, xr) {
  text(ctx, `(${LET[k]})`, 66, yc, PAL.ink, { size: 22, weight: 600, align: 'center' });
  text(ctx, `W = ${W}`, xr, yc, PAL.ink, { size: 20, weight: 600 });
  text(ctx, `${W}/${total}`, xr + 190, yc, PAL.muted, { size: 18, align: 'right' });
  const w = (BAR * W) / total;
  ctx.save(); ctx.fillStyle = alpha(PAL.ink, final ? 0.55 : 0.3); ctx.fillRect(xr + 202, yc - 9, Math.max(2, w), 18); ctx.restore();
}
/* hide the entries of a dropdown that the current state does not offer */
const offer = (sel, ok) => sel.querySelectorAll('option').forEach((o) => { o.hidden = o.disabled = !ok(o.value); });

/* =====================================================================
   FIGURE 16.8: N particles in two boxes, every microstate drawn and
   grouped by distribution, row k holding the C(N, k) microstates with k
   particles in the right box, ordered by which particles those are (the
   book's order). Two, four or six particles: 4, 16 or 64 microstates,
   rows of more than ten wrapped. Still: a count has no time in it. The
   particles are told apart by colour and named on hover; the text names
   none, so they are instances (F.cat), not referents.
===================================================================== */
(function () {
  const H = 600, d = sim('sim-microstates', H);
  const N = F.choice(d.controls, { label: 'N', key: 'N', aria: 'the number of particles', value: '4',
    options: ['2', '4', '6'].map((v) => ({ value: v, label: v })), onInput: () => fit() });
  const pick = (label, key, aria, value) => F.select(d.controls, { label, key, aria, value, options: [...LET].map((c) => ({ value: c, label: `(${c})` })), onInput: () => draw() });
  const A = pick('\\text{initial}', 'from', 'the initial distribution', 'a');
  const B = pick('\\text{final}', 'to', 'the final distribution', 'c');
  const sels = d.controls.querySelectorAll('select');
  const ro = F.readout(d);
  function fit(redraw = true) {
    const n = +N.value;
    if (LET.indexOf(A.value) > n) A.set('a');
    if (LET.indexOf(B.value) > n) B.set(LET[n / 2]);
    sels.forEach((s) => offer(s, (v) => LET.indexOf(v) <= n));
    if (redraw) draw();
  }
  let hits = []; F.hover(d.stage, () => hits);
  const word = { 2: 'Both', 4: 'All four', 6: 'All six' };
  function draw() {
    const { ctx } = begin(d.c), n = +N.value, total = 2 ** n;
    const rows = Array.from({ length: n + 1 }, () => []);
    for (let m = 0; m < total; m++) { let k = 0; for (let i = 0; i < n; i++) if (m >> i & 1) k++; rows[k].push(m); }
    const big = n > 4, per = big ? 10 : 6, slot = big ? 84 : 140, bw = big ? 37 : 56, bh = big ? 34 : 46, r = big ? 5.5 : 8, gap = big ? 12 : 20;
    const lines = rows.map((row) => Math.ceil(row.length / per)), nl = lines.reduce((a, b) => a + b, 0);
    const top = 120, lh = Math.min(84, (H - top - 14) / nl);
    let y = top + ((H - top - 14) - nl * lh) / 2;
    const ia = LET.indexOf(A.value), ib = LET.indexOf(B.value);
    hits = [];
    text(ctx, 'microstates', 120, 100, PAL.muted, { size: 17 });
    text(ctx, 'probability of the distribution', 1000, 100, PAL.muted, { size: 17 });
    markKey(ctx, 560, 100);
    rows.forEach((row, k) => {
      const y0 = y, y1 = y + lines[k] * lh;
      rowMark(ctx, y0 + 2, y1 - 2, k === ia, k === ib);
      row.forEach((m, j) => {
        const x = 120 + (j % per) * slot, yt = y0 + Math.floor(j / per) * lh + (lh - bh) / 2;
        domino(ctx, x, yt, bw, bh);
        const box = [[], []];
        for (let i = 0; i < n; i++) box[m >> i & 1].push(i);
        box.forEach((ps, s) => ps.forEach((i, q) => {
          const cols = big ? 3 : 2, cx = x + s * bw + bw / 2 + ((q % cols) - (cols - 1) / 2) * gap, cy = yt + bh / 2 + (Math.floor(q / cols) - 0.5) * gap * (big ? 1.15 : 1);
          dot(ctx, cx, cy, F.cat(i), true, r);
          hits.push({ x: cx, y: cy, r: r + 4, name: `particle ${i + 1}, in the ${s ? 'right' : 'left'} box` });
        }));
      });
      rowFrame(ctx, k, (y0 + y1) / 2, row.length, total, k === ia, k === ib, 1000);
      y = y1;
    });
    topline(ctx, `${word[n]} particles sit in one box in 2 of the ${total} microstates, a probability of 1/${total / 2}.`);
    deltaS(ro, rows[ia].length, rows[ib].length);
  }
  fit(false);
  still(d, draw);
})();

/* =====================================================================
   FIGURE 16.9: two units of thermal energy shared by the hot object
   (particles A, B) and the cold object (C, D). The units cannot be told
   apart, so a microstate is a pair of particles, one particle taken twice
   when it holds both: (a) both units in the hot object, 3 microstates;
   (b) one in each, 4; (c) both in the cold one, 3. The energy units are
   the book's asterisks, in ink. Still.
===================================================================== */
(function () {
  const H = 410, d = sim('sim-energy-microstates', H);
  const opts = ['a', 'b', 'c'].map((c) => ({ value: c, label: `(${c})` }));
  const A = F.choice(d.controls, { label: '\\text{initial}', key: 'from', aria: 'the initial distribution', value: 'a', options: opts, onInput: () => draw() });
  const B = F.choice(d.controls, { label: '\\text{final}', key: 'to', aria: 'the final distribution', value: 'b', options: opts, onInput: () => draw() });
  const ro = F.readout(d);
  const P = ['A', 'B', 'C', 'D'];
  const ROWS = [[[0, 0], [0, 1], [1, 1]], [[0, 2], [0, 3], [1, 2], [1, 3]], [[2, 2], [2, 3], [3, 3]]];
  let hits = []; F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c), hot = F.ref('hot-object'), cold = F.ref('cold-object');
    const ia = LET.indexOf(A.value), ib = LET.indexOf(B.value), bw = 78, bh = 64, slot = 196;
    hits = [];
    text(ctx, 'microstates', 120, 100, PAL.muted, { size: 17 });
    text(ctx, 'probability of the distribution', 900, 100, PAL.muted, { size: 17 });
    markKey(ctx, 520, 100);
    ROWS.forEach((row, k) => {
      const yc = 160 + k * 96;
      rowMark(ctx, yc - 46, yc + 46, k === ia, k === ib);
      row.forEach((units, j) => {
        const x = 120 + j * slot, yt = yc - bh / 2;
        domino(ctx, x, yt, bw, bh);
        P.forEach((p, i) => {
          const px = x + (i < 2 ? 0 : bw) + bw / 2 + (i % 2 ? 15 : -15), c = i < 2 ? hot : cold;
          text(ctx, p, px, yc + 3, c, { size: 24, weight: 600, align: 'center' });
          const q = units.filter((u) => u === i).length;
          if (q) text(ctx, '*', px, yc - 20, PAL.ink, { size: 24, weight: 600, align: 'center' });
          if (q === 2) text(ctx, '*', px, yc + 30, PAL.ink, { size: 24, weight: 600, align: 'center' });
          hits.push({ x: px, y: yc, r: 16, name: `particle ${p} of the ${i < 2 ? 'hot' : 'cold'} object, ${['no unit', 'one unit', 'two units'][q]} of energy` });
        });
      });
      rowFrame(ctx, k, yc, row.length, 10, k === ia, k === ib, 900);
    });
    const wi = ROWS[ia].length, wf = ROWS[ib].length;
    topline(ctx, ia === ib
      ? `Distribution (${A.value}) holds ${wi} of the 10 microstates, a probability of ${wi}/10.`
      : `From (${A.value}) to (${B.value}) the number of microstates ${wf > wi ? 'rises' : wf < wi ? 'falls' : 'stays'} ${wf === wi ? `at ${wi}` : `from ${wi} to ${wf}`}, and the probability ${wf === wi ? `stays at ${wi}/10` : `from ${wi}/10 to ${wf}/10`}.`);
    deltaS(ro, wi, wf);
  }
  still(d, draw);
})();

/* =====================================================================
   Example 16.2's image, faithful: four particles in the left box, one
   microstate, spreading to the six microstates with two in each box, in
   the colours of Figure 16.8. The process arrow is notation. Still, no
   controls, no readout.
===================================================================== */
(function () {
  const H = 250, d = sim('fig-ex-matter', H);
  const bw = 56, bh = 46, r = 8, gap = 20;
  const SIX = [0b0011, 0b0101, 0b1001, 0b0110, 0b1010, 0b1100];
  let hits = []; F.hover(d.stage, () => hits);
  function micro(ctx, x, yt, m) {
    domino(ctx, x, yt, bw, bh);
    const box = [[], []];
    for (let i = 0; i < 4; i++) box[m >> i & 1].push(i);
    box.forEach((ps, s) => ps.forEach((i, q) => {
      const cx = x + s * bw + bw / 2 + ((q % 2) - 0.5) * gap, cy = yt + bh / 2 + (Math.floor(q / 2) - 0.5) * gap;
      dot(ctx, cx, cy, F.cat(i), true, r);
      hits.push({ x: cx, y: cy, r: r + 4, name: `particle ${i + 1}, in the ${s ? 'right' : 'left'} box` });
    }));
  }
  function draw() {
    const { ctx } = begin(d.c);
    hits = [];
    micro(ctx, 220, 125 - bh / 2, 0);
    F.arrow(ctx, 400, 125, 540, 125, PAL.ink, 4);
    SIX.forEach((m, j) => micro(ctx, 620 + (j % 3) * 190, (j < 3 ? 72 : 178) - bh / 2, m));
  }
  still(d, draw);
})();

/* =====================================================================
   FIGURE 16.10 + 16.11: one mole of water heated from 50 to 1000 K. In
   three dimensions (the book's rule for a particle picture), 27 water
   molecules in a closed glass box: a 3 × 3 × 3 lattice vibrating about
   its sites, a liquid wandering over the floor, a gas flying through the
   whole box. Moving: the thermal motion runs on a 6 s loop with no hold,
   every motion a whole number of periods per loop so it closes on itself;
   amplitudes or whole-number frequencies scale with √T. A change of phase
   tweens a phase coordinate, and each molecule crosses to the new packing
   in its own window (LaggedStart); at 273.15 K and 373.15 K, the dashed
   circles, half the molecules hold the old phase and half the new.
   The strip beneath: the Maxwell distribution of speeds for M = 18.02
   g/mol (0 to 2500 m/s, fixed; its peak at 50 K, 3.9 × 10⁻³ s/m, under
   the 4.2 × 10⁻³ top) and S against T (0 to 1000 K, 0 to 250 J/K, fixed).
   S of one mole: ΔH_fus 6.01 kJ and ΔH_vap 40.7 kJ (Chapter 10), liquid
   C_p 75.3 J/K, gas C_p 33.6 J/K, the solid's S taken proportional to T
   and fixed so that the liquid at 298.15 K has Appendix G's 70.0 J/K.
   The box stands on a ground: pitch 1° to 69°, yaw free, no idle spin.
===================================================================== */
(function () {
  const T3D = window.THREE;
  const d = sim('sim-entropy-phase');
  const v = F.view3d(d.stage, { spin: 'none', pitch: [0.02, 1.2], tilt: 0.3, views: [{ label: 'front', yaw: 0, pitch: 0.12 }, { label: 'corner', yaw: 0.7, pitch: 0.45 }], h: 360, dist: 3.1 });
  const grp = v.part(0), cnv = F.makeCanvas(d.stage, 430);
  const TM = 273.15, TB = 373.15, HF = 6010, HV = 40700, CL = 75.3, CG = 33.6, M = 0.01802, R = 8.3145;
  const SL0 = 70.0 - CL * Math.log(298.15 / TM), SS0 = SL0 - HF / TM, SLB = SL0 + CL * Math.log(TB / TM), SG0 = SLB + HV / TB;
  const Ss = (t) => (SS0 * t) / TM, Sl = (t) => SL0 + CL * Math.log(t / TM), Sg = (t) => SG0 + CG * Math.log(t / TB);
  const S = (t) => (t < TM ? Ss(t) : t < TB ? Sl(t) : Sg(t));
  const on = (t, x) => Math.abs(t - x) < 1e-6;
  const phaseOf = (t) => (on(t, TM) ? 0.5 : on(t, TB) ? 1.5 : t < TM ? 0 : t < TB ? 1 : 2);
  const T = ctl(d.controls, { label: '\\kT', cls: 'temperature', key: 'T', min: 50, max: 1000, step: 1, value: 298, unit: 'K', dec: 0,
    aria: 'the temperature of the water in kelvin', detents: [100, 200, 500, 1000],
    specials: [{ at: TM, label: 'melting' }, { at: TB, label: 'boiling' }],
    onInput: () => { const p = phaseOf(T.v); ph.to(p, 900 * Math.max(0.5, Math.abs(p - ph.v))); } });
  const ph = F.tween(d, phaseOf(T.v));
  const cy = cycle(() => 6, 0);
  const ro = F.readout(d);

  const W = 0.62, FLOOR = -0.6, TOP = 0.6, NM = 27, OM = (2 * Math.PI) / 6;
  /* fixed numbers per molecule, so every rebuild and every loop draws the same motion */
  const rnd = (i) => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
  const MOL = Array.from({ length: NM }, (_, i) => ({
    site: [(i % 3 - 1) * 0.16, FLOOR + 0.08 + Math.floor(i / 9) * 0.16, (Math.floor(i / 3) % 3 - 1) * 0.16],
    pool: [-W + 0.1 + rnd(i) * (2 * W - 0.2), FLOOR + 0.07 + rnd(i + 40) * 0.2, -W + 0.1 + rnd(i + 80) * (2 * W - 0.2)],
    gas: [-W + 0.06 + rnd(i + 120) * (2 * W - 0.12), FLOOR + 0.06 + rnd(i + 160) * (TOP - FLOOR - 0.12), -W + 0.06 + rnd(i + 200) * (2 * W - 0.12)],
    f: [5 + (i % 4), 6 + ((i + 1) % 3), 5 + ((i + 2) % 4)], q: [rnd(i + 240) * 6.3, rnd(i + 280) * 6.3, rnd(i + 320) * 6.3],
    g: [1 + (i % 2), 1 + ((i >> 1) % 2), 1 + ((i >> 2) % 2)], dir: [rnd(i + 360) < 0.5 ? -1 : 1, rnd(i + 400) < 0.5 ? -1 : 1, rnd(i + 440) < 0.5 ? -1 : 1],
    w: i % 2 ? 0.5 + ((i - 1) / 2 / 13) * 0.38 : (i / 2 / 14) * 0.38,
  }));
  const fold = (x, a, b) => { const w = b - a, u = ((((x - a) % (2 * w)) + 2 * w) % (2 * w)); return a + (u < w ? u : 2 * w - u); };
  /* where molecule i stands in phase p (0 solid, 1 liquid, 2 gas) at loop time u, s = √(T / 298) */
  function place(p, m, u, s, t) {
    if (p === 0) { const a = 0.014 * Math.sqrt(t / 100); return m.site.map((c, k) => c + a * Math.sin(m.f[k] * OM * u + m.q[k])); }
    if (p === 1) {
      const n = (k) => Math.max(1, Math.round((1 + (m.f[k] % 3)) * s));
      return [clamp(m.pool[0] + 0.07 * Math.sin(n(0) * OM * u + m.q[0]), -W + 0.06, W - 0.06), clamp(m.pool[1] + 0.03 * Math.sin(n(1) * OM * u + m.q[1]), FLOOR + 0.05, FLOOR + 0.3), clamp(m.pool[2] + 0.07 * Math.sin(n(2) * OM * u + m.q[2]), -W + 0.06, W - 0.06)];
    }
    const lo = [-W + 0.06, FLOOR + 0.06, -W + 0.06], hi = [W - 0.06, TOP - 0.06, W - 0.06];
    return m.gas.map((c, k) => fold(c + m.dir[k] * Math.max(1, Math.round(m.g[k] * s)) * 2 * (hi[k] - lo[k]) * (u / 6), lo[k], hi[k]));
  }
  let sig = '', ms = [];
  function build() {
    const key = [PAL.ink, PAL.soft, PAL.muted, F.el('O'), F.el('H'), F.CC].join('|'); if (key === sig || !grp) return; sig = key;
    v.clear(); ms = [];
    F.mesh.box(grp, [0, FLOOR - 0.05, 0], [2.4, 0.08, 2], PAL.soft);
    const glass = new T3D.Mesh(new T3D.BoxGeometry(2 * W, TOP - FLOOR, 2 * W), F.mesh.mat(PAL.ink, { transparent: true, opacity: 0.05, depthWrite: false, side: T3D.DoubleSide }));
    glass.position.set(0, (TOP + FLOOR) / 2, 0); grp.add(glass);
    const e = new T3D.LineSegments(new T3D.EdgesGeometry(new T3D.BoxGeometry(2 * W, TOP - FLOOR, 2 * W)), new T3D.LineBasicMaterial({ color: new T3D.Color(PAL.muted) }));
    e.position.copy(glass.position); grp.add(e);
    v.pickable(glass, 'a closed glass container');
    MOL.forEach(() => {
      const g = new T3D.Group(); grp.add(g);
      [['O', 0, 0, 0.056], ['H', -0.062, 0.044, 0.036], ['H', 0.062, 0.044, 0.036]].forEach(([s, x, y, r]) => v.pickable(F.mesh.sphere(g, [x, y, 0], r, F.el(s)), 'a water molecule, H₂O'));
      ms.push(g);
    });
  }
  const sm = F.ease.smooth;
  function move() {
    const u = cy.now(), t = T.v, s = Math.sqrt(t / 298), pv = ph.v, k = Math.min(1, Math.floor(pv)), f = pv - k;
    ms.forEach((g, i) => {
      const m = MOL[i], a = sm(clamp((f - m.w) / 0.12, 0, 1)), p0 = place(k, m, u, s, t), p1 = a > 0 ? place(k + 1, m, u, s, t) : p0;
      g.position.set(p0[0] + (p1[0] - p0[0]) * a, p0[1] + (p1[1] - p0[1]) * a, p0[2] + (p1[2] - p0[2]) * a);
      const spin = Math.round(pv * 1.5) * (1 + (i % 2));
      g.rotation.set(m.q[0], m.q[1] + spin * OM * u, 0);
    });
    v.invalidate();
  }
  const maxwell = (vv, t) => { const a = M / (2 * R * t); return 4 * Math.PI * (a / Math.PI) ** 1.5 * vv * vv * Math.exp(-a * vv * vv); };
  const vp = (t) => Math.sqrt((2 * R * t) / M);
  const BOOK = [100, 200, 500, 1000];
  const GV = { l: 110, r: 640, t: 140, b: 350 }, GS = { l: 800, r: 1320, t: 140, b: 350 };
  function draw() {
    build(); move();
    const { ctx } = begin(cnv), t = T.v, p = phaseOf(t), ce = C('entropy'), ct = C('temperature');
    const tt = p === 0.5 || p === 1.5 ? t.toFixed(2) : String(Math.round(t));

    const a = F.axes(ctx, GV, [0, 2500], [0, 4.2e-3], { nx: 5, ny: 3, fy: () => '', xl: 'v (m/s)', xc: C('velocity'), yl: 'fraction of molecules' });
    /* the curves cross near their feet, so they are named in a key in the empty upper right: the live one, then the four faint ones */
    BOOK.forEach((b) => F.curve(ctx, (x) => maxwell(x, b), 0, 2500, a.X, a.Y, alpha(PAL.ink, 0.28), 2, 120));
    F.curve(ctx, (x) => maxwell(x, t), 0, 2500, a.X, a.Y, PAL.ink, 4, 160);
    const kx = a.X(1250), ky = GV.t + 22;
    line(ctx, kx, ky, kx + 40, ky, PAL.ink, 4); text(ctx, `${tt} K`, kx + 52, ky, ct, { size: 17, weight: 600 });
    line(ctx, kx, ky + 28, kx + 40, ky + 28, alpha(PAL.ink, 0.35), 2); text(ctx, '100, 200, 500 and 1000 K', kx + 52, ky + 28, alpha(ct, 0.85), { size: 16 });

    const g = F.axes(ctx, GS, [0, 1000], [0, 250], { nx: 5, ny: 5, xl: 'T (K)', xc: ct, yl: 'S (J/K)', yc: ce });
    ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.05); ctx.fillRect(g.X(TM), GS.t, g.X(TB) - g.X(TM), GS.b - GS.t); ctx.restore();
    /* the column names where the curve leaves room: at the top over the solid and the liquid, at the foot under the gas */
    [['solid', TM / 2, GS.t + 16], ['liquid', (TM + TB) / 2, GS.t + 16], ['gas', (TB + 1000) / 2, GS.b - 16]].forEach(([s, x, y]) => text(ctx, s, g.X(x), y, PAL.muted, { size: 16, align: 'center', bg: PAL.panel }));
    F.curve(ctx, Ss, 1, TM, g.X, g.Y, ce, 4, 60);
    F.curve(ctx, Sl, TM, TB, g.X, g.Y, ce, 4, 40);
    F.curve(ctx, Sg, TB, 1000, g.X, g.Y, ce, 4, 80);
    const jump = (x, lo, hi, hot) => line(ctx, g.X(x), g.Y(lo), g.X(x), g.Y(hi), ce, hot ? 6 : 3, hot ? undefined : [6, 6]);
    jump(TM, SS0, SL0, p === 0.5); jump(TB, SLB, SG0, p === 1.5);
    text(ctx, 'melting', g.X(TM) - 18, g.Y((SS0 + SL0) / 2), PAL.muted, { size: 16, align: 'right' });
    text(ctx, 'boiling', g.X(TB) + 18, g.Y((SLB + SG0) / 2), PAL.muted, { size: 16 });
    const drop = (sv) => { line(ctx, g.X(t), g.Y(sv), g.X(t), GS.b, alpha(ce, 0.6), 2.5, [4, 8]); line(ctx, GS.l, g.Y(sv), g.X(t), g.Y(sv), alpha(ce, 0.6), 2.5, [4, 8]); };
    if (p === 0.5 || p === 1.5) {
      const [lo, hi] = p === 0.5 ? [SS0, SL0] : [SLB, SG0];
      drop(hi); dot(ctx, g.X(t), g.Y(lo), ce, false, 10); dot(ctx, g.X(t), g.Y(hi), ce, true, 10);
    } else { drop(S(t)); dot(ctx, g.X(t), g.Y(S(t)), ce, true, 10); }

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
      ro.set(`\\kT = \\mk{t}{${hue('temperature', tt)}}\\ \\mathrm{K}:\\quad \\mk{S}{${sym}} = \\mk{s}{${hue('entropy', S(t).toFixed(1))}}\\ \\mathrm{J/K}`, undefined, { form: 'state' });
    }
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();
};
