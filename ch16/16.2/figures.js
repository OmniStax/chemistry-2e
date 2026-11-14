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
/* the probability column of both counting figures: W at XW, the fraction right-aligned at XF, the bar from XB,
   on one scale where a probability of 1 is BAR units, so the largest, 2/4, ends at the canvas edge */
const XW = 1100, XF = 1236, XB = 1248, BAR = 270;
/* the readout of both counting figures, ΔS = k ln(W_f/W_i) with the live counts */
function deltaS(ro, wi, wf) {
  const ds = KB * Math.log(wf / wi);
  ro.set(`\\kdS = k\\ln\\frac{W_{\\text{f}}}{W_{\\text{i}}} = 1.38\\times 10^{-23}\\ \\mathrm{J/K}\\times\\ln\\frac{\\mk{wf}{${wf}}}{\\mk{wi}{${wi}}} = \\mk{ds}{${hue('entropy', sci(ds))}}\\ \\mathrm{J/K}`);
}
/* one microstate as the book draws it: two boxes side by side, each bw by bh, top left at (x, y) */
function domino(ctx, x, y, bw, bh) {
  ctx.save(); ctx.strokeStyle = PAL.muted; ctx.lineWidth = 2.5;
  ctx.strokeRect(x, y, 2 * bw, bh); line(ctx, x + bw, y, x + bw, y + bh, PAL.muted, 2.5); ctx.restore();
}
/* the row a distribution occupies, marked as the initial state (dashed outline) or the final one (filled) */
function rowMark(ctx, y0, y1, initial, final) {
  ctx.save();
  if (final) { ctx.fillStyle = alpha(PAL.ink, 0.07); ctx.fillRect(16, y0, 1368, y1 - y0); }
  if (initial) { ctx.strokeStyle = alpha(PAL.ink, 0.55); ctx.lineWidth = 2; ctx.setLineDash([10, 10]); ctx.strokeRect(16, y0, 1368, y1 - y0); }
  ctx.restore();
}
/* the key to the two row marks and the column heads, on the line at y */
function heads(ctx, y) {
  text(ctx, 'microstates', 96, y, PAL.muted, { size: 17 });
  const x = 600;
  ctx.save(); ctx.strokeStyle = alpha(PAL.ink, 0.55); ctx.lineWidth = 2; ctx.setLineDash([6, 5]); ctx.strokeRect(x, y - 9, 34, 18);
  ctx.setLineDash([]); ctx.fillStyle = alpha(PAL.ink, 0.12); ctx.fillRect(x + 130, y - 9, 34, 18); ctx.restore();
  text(ctx, 'initial', x + 42, y, PAL.muted, { size: 17 });
  text(ctx, 'final', x + 172, y, PAL.muted, { size: 17 });
  text(ctx, 'probability', XW, y, PAL.muted, { size: 17 });
}
/* a distribution's letter at the left, and W with its probability bar at the right */
function rowFrame(ctx, k, yc, W, total, final) {
  text(ctx, `(${LET[k]})`, 48, yc, PAL.ink, { size: 22, weight: 600, align: 'center' });
  text(ctx, `W = ${W}`, XW, yc, PAL.ink, { size: 20, weight: 600 });
  text(ctx, `${W}/${total}`, XF, yc, PAL.muted, { size: 18, align: 'right' });
  ctx.save(); ctx.fillStyle = alpha(PAL.ink, final ? 0.55 : 0.3); ctx.fillRect(XB, yc - 9, Math.max(2, (BAR * W) / total), 18); ctx.restore();
}

/* =====================================================================
   FIGURE 16.8: N particles in two boxes, every microstate drawn and
   grouped by distribution, row k holding the C(N, k) microstates with k
   particles in the right box, ordered by which particles those are (the
   book's order). Two, four or six particles: 4, 16 or 64 microstates;
   rows of more than ten wrapped at six particles. Still: a count has no
   time in it. The particles are told apart by colour and named on hover;
   the text names none, so they are instances (F.cat), not referents.
===================================================================== */
(function () {
  const H = 620, d = sim('sim-microstates', H);
  const N = F.choice(d.controls, { label: 'N', key: 'N', aria: 'the number of particles', value: '4',
    options: ['2', '4', '6'].map((v) => ({ value: v, label: v })), onInput: () => fit() });
  const pick = (label, key, aria, value) => F.select(d.controls, { label, key, aria, value, options: [...LET].map((c) => ({ value: c, label: `(${c})` })), onInput: () => draw() });
  const A = pick('\\text{initial}', 'from', 'the initial distribution', 'a');
  const B = pick('\\text{final}', 'to', 'the final distribution', 'c');
  const ro = F.readout(d);
  function fit(redraw = true) {
    const n = +N.value, offered = [...LET].slice(0, n + 1).map((c) => ({ value: c, label: `(${c})` }));
    A.options(offered, 'a'); B.options(offered, LET[n / 2]);
    if (redraw) { A.set('a'); B.set(LET[n / 2]); }   /* a new count opens on Example 16.2's pair: all in one box to the even split */
    if (redraw) draw();
  }
  let hits = []; F.hover(d.stage, () => hits);
  const word = { 2: 'Both', 4: 'All four', 6: 'All six' };
  /* per particle count: microstates a line, slot width, half-domino w and h, particle radius, particle spacing, columns a box */
  const LAY = { 2: [6, 165, 70, 62, 13, 30, 2], 4: [6, 165, 70, 62, 11, 26, 2], 6: [10, 98, 42, 42, 6.5, 13, 3] };
  function draw() {
    const { ctx } = begin(d.c), n = +N.value, total = 2 ** n;
    const rows = Array.from({ length: n + 1 }, () => []);
    for (let m = 0; m < total; m++) { let k = 0; for (let i = 0; i < n; i++) if (m >> i & 1) k++; rows[k].push(m); }
    const [per, slot, bw, bh, r, gap, cols] = LAY[n];
    const lines = rows.map((row) => Math.ceil(row.length / per)), nl = lines.reduce((a, b) => a + b, 0);
    const top = 112, lh = Math.min(96, (H - top - 10) / nl);
    let y = top + ((H - top - 10) - nl * lh) / 2;
    const ia = LET.indexOf(A.value), ib = LET.indexOf(B.value);
    hits = [];
    heads(ctx, 92);
    rows.forEach((row, k) => {
      const y0 = y, y1 = y + lines[k] * lh;
      rowMark(ctx, y0 + 2, y1 - 2, k === ia, k === ib);
      row.forEach((m, j) => {
        const x = 96 + (j % per) * slot, yt = y0 + Math.floor(j / per) * lh + (lh - bh) / 2;
        domino(ctx, x, yt, bw, bh);
        /* each particle keeps its own place in whichever box it is, as the book draws them */
        for (let i = 0; i < n; i++) {
          const s = m >> i & 1, cx = x + s * bw + bw / 2 + ((i % cols) - (cols - 1) / 2) * gap, cy = yt + bh / 2 + (Math.floor(i / cols) - (Math.ceil(n / cols) - 1) / 2) * gap;
          dot(ctx, cx, cy, F.cat(i), true, r);
          hits.push({ x: cx, y: cy, r: r + 4, name: `particle ${i + 1}, in the ${s ? 'right' : 'left'} box` });
        }
      });
      rowFrame(ctx, k, (y0 + y1) / 2, row.length, total, k === ib);
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
  const H = 470, d = sim('sim-energy-microstates', H);
  const opts = ['a', 'b', 'c'].map((c) => ({ value: c, label: `(${c})` }));
  const A = F.choice(d.controls, { label: '\\text{initial}', key: 'from', aria: 'the initial distribution', value: 'a', options: opts, onInput: () => draw() });
  const B = F.choice(d.controls, { label: '\\text{final}', key: 'to', aria: 'the final distribution', value: 'b', options: opts, onInput: () => draw() });
  const ro = F.readout(d);
  const P = ['A', 'B', 'C', 'D'];
  const ROWS = [[[0, 0], [0, 1], [1, 1]], [[0, 2], [0, 3], [1, 2], [1, 3]], [[2, 2], [2, 3], [3, 3]]];
  let hits = []; F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c), hot = F.ref('hot-object'), cold = F.ref('cold-object');
    const ia = LET.indexOf(A.value), ib = LET.indexOf(B.value), bw = 104, bh = 90, slot = 248;
    hits = [];
    heads(ctx, 92);
    ROWS.forEach((row, k) => {
      const yc = 172 + k * 116;
      rowMark(ctx, yc - 56, yc + 56, k === ia, k === ib);
      row.forEach((units, j) => {
        const x = 96 + j * slot, yt = yc - bh / 2;
        domino(ctx, x, yt, bw, bh);
        P.forEach((p, i) => {
          const px = x + (i < 2 ? 0 : bw) + bw / 2 + (i % 2 ? 22 : -22), c = i < 2 ? hot : cold;
          text(ctx, p, px, yc + 3, c, { size: 32, weight: 600, align: 'center' });
          const q = units.filter((u) => u === i).length;
          if (q) text(ctx, '*', px, yc - 26, PAL.ink, { size: 32, weight: 600, align: 'center' });
          if (q === 2) text(ctx, '*', px, yc + 34, PAL.ink, { size: 32, weight: 600, align: 'center' });
          hits.push({ x: px, y: yc, r: 20, name: `particle ${p} of the ${i < 2 ? 'hot' : 'cold'} object, ${['no unit', 'one unit', 'two units'][q]} of energy` });
        });
      });
      rowFrame(ctx, k, yc, row.length, 10, k === ib);
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
