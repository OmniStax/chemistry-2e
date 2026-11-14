/* Figures for section 12.2 Factors Affecting Reaction Rates. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['12.2'] = function (root, F) {
const { el, fmt, tex, C, PAL, alpha, ctl, cycle, register, begin, line, dot, topline, axes, legend } = F;
const TAU = 2 * Math.PI;
const R8 = 8.314;                                    /* J mol⁻¹ K⁻¹ */
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;

/* =====================================================================
   SIM: a closed box of nitric oxide and ozone, NO + O₃ ⟶ NO₂ + O₂, drawn
   flat so every molecule is seen. Speeds are drawn from the 2D
   Maxwell-Boltzmann distribution at T with the real molar masses; every
   pair bounces elastically, except an NO meeting an O₃ whose energy of
   approach along the line of centres passes EA, a model threshold, which
   react. Molecule i keeps its own seeded place, direction and speed draw
   whatever the sliders, so a hotter run is the same molecules faster by
   √(T/300 K) and a richer one the same molecules and some more. A run of
   TRUN seconds is computed whole when a slider moves, so the transport
   scrubs it exactly. Each molecule stands for 0.050 M. The strip beneath
   plots [O₃] against t (0 to 5 s, 0 to 2.0 M, the slider maximum) with
   the secant whose slope is −rate. Lengths are canvas units.
===================================================================== */
(function () {
  const d = F.sim(root, 'sim-collisions', 650);
  const Tc = ctl(d.controls, { label: '\\kT', cls: 'temperature', min: 200, max: 600, step: 10, value: 300, unit: 'K', dec: 0, onInput: rerun, aria: 'temperature of the gases in kelvin' });
  const cA = ctl(d.controls, { label: hue('concentration', '[\\text{NO}]_{0}'), cls: 'concentration', key: 'no', min: 0.5, max: 2, step: 0.1, value: 1, unit: 'M', dec: 2, onInput: rerun, aria: 'initial concentration of nitric oxide in mol per liter' });
  const cB = ctl(d.controls, { label: hue('concentration', '[\\text{O}_{3}]_{0}'), cls: 'concentration', key: 'o3', min: 0.5, max: 2, step: 0.1, value: 1, unit: 'M', dec: 2, onInput: rerun, aria: 'initial concentration of ozone in mol per liter' });
  const fx = el('div'), nt = el('small'); d.readout.append(fx, nt);
  nt.textContent = 'Each molecule drawn stands for 0.050 M of its gas; real molecules collide billions of times a second.';

  /* each molecule as [element, dx, dy, radius] about its centre, canvas units */
  const MOLS = {
    NO: { M: 30.01, name: 'nitric oxide, NO', atoms: [['N', -10, 0, 11], ['O', 10, 0, 10.5]] },
    O3: { M: 48.00, name: 'ozone, O₃', atoms: [['O', -17, 6, 10.5], ['O', 17, 6, 10.5], ['O', 0, -6, 10.5]] },
    NO2: { M: 46.01, name: 'nitrogen dioxide, NO₂', atoms: [['O', -18, 6, 10.5], ['O', 18, 6, 10.5], ['N', 0, -6, 11]] },
    O2: { M: 32.00, name: 'oxygen, O₂', atoms: [['O', -10, 0, 10.5], ['O', 10, 0, 10.5]] },
  };
  const BOX = { l: 70, r: 1330, t: 118, b: 372 }, RC = 22, KS = 0.3, TRUN = 5, DT = 1 / 120, NF = Math.round(TRUN / DT), EA = 3000, PER = 0.05, HALO = 0.7;
  const XL = [BOX.l + RC + 4, BOX.r - RC - 4], YL = [BOX.t + RC + 4, BOX.b - RC - 4];
  /* a small seeded generator per molecule: the same draws for molecule i at every setting */
  const rng = (seed) => () => { seed = (seed + 0x6D2B79F5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  const gauss = (r) => { let a = 0; while (!a) a = r(); return Math.sqrt(-2 * Math.log(a)) * Math.cos(TAU * r()); };

  let run = null;
  function simulate() {
    const nA = Math.round(cA.v / PER), nB = Math.round(cB.v / PER), T = Tc.v;
    /* NO and O₃ placed in turn, NO i from stream 1000 + i and O₃ j from stream 2000 + j */
    const order = []; for (let i = 0; i < Math.max(nA, nB); i++) { if (i < nA) order.push(['NO', 1000 + i]); if (i < nB) order.push(['O3', 2000 + i]); }
    const kind = [], x = [], u = [], a0 = [], w = [];
    for (const [k, s] of order) {
      const r = rng(s * 7919); let p, tries = 0;
      do { p = [XL[0] + r() * (XL[1] - XL[0]), YL[0] + r() * (YL[1] - YL[0])]; tries++; } while (tries < 80 && x.some((q) => Math.hypot(q[0] - p[0], q[1] - p[1]) < 2.3 * RC));
      const sd = Math.sqrt((R8 * T) / (MOLS[k].M / 1000)) * KS;
      kind.push(k); x.push(p); u.push([gauss(r) * sd, gauss(r) * sd]); a0.push(r() * TAU); w.push((r() - 0.5) * 2.4);
    }
    const n = kind.length, pos = new Float32Array((NF + 1) * n * 2), at = new Array(n).fill(Infinity), events = [];
    const mass = (i, t) => MOLS[t >= at[i] ? (kind[i] === 'NO' ? 'NO2' : 'O2') : kind[i]].M;
    for (let f = 0; f <= NF; f++) {
      for (let i = 0; i < n; i++) { pos[(f * n + i) * 2] = x[i][0]; pos[(f * n + i) * 2 + 1] = x[i][1]; }
      if (f === NF) break;
      const t = (f + 1) * DT;
      for (let i = 0; i < n; i++) for (let k = 0; k < 2; k++) {
        x[i][k] += u[i][k] * DT;
        const L = k ? YL : XL;
        if (x[i][k] > L[1] && u[i][k] > 0) u[i][k] = -u[i][k];
        if (x[i][k] < L[0] && u[i][k] < 0) u[i][k] = -u[i][k];
      }
      for (let a = 0; a < n; a++) for (let b = a + 1; b < n; b++) {
        const dx = x[b][0] - x[a][0], dy = x[b][1] - x[a][1], r = Math.hypot(dx, dy);
        if (r >= 2 * RC || r === 0) continue;
        const nx = dx / r, ny = dy / r, vn = (u[b][0] - u[a][0]) * nx + (u[b][1] - u[a][1]) * ny;
        if (vn >= 0) continue;
        const live = at[a] === Infinity && at[b] === Infinity, pair = live && kind[a] !== kind[b];
        const mA = mass(a, t) / 1000, mB = mass(b, t) / 1000, mu = (mA * mB) / (mA + mB);
        if (pair) {
          const react = 0.5 * mu * (vn / KS) ** 2 > EA;
          events.push({ t, p: [(x[a][0] + x[b][0]) / 2, (x[a][1] + x[b][1]) / 2], react });
          if (react) { at[a] = at[b] = t; continue; }
        }
        for (const [i, m, sgn] of [[a, mB, 1], [b, mA, -1]]) { const q = ((2 * m) / (mA + mB)) * vn * sgn; u[i][0] += q * nx; u[i][1] += q * ny; }
      }
    }
    return { n, nB, kind, pos, at, a0, w, events };
  }
  const cy = cycle(() => TRUN, 1.2);
  function rerun() { run = simulate(); cy.reset(); }
  run = simulate();

  function molecule(ctx, k, x, y, a, z = 1) {
    const c = Math.cos(a) * z, s = Math.sin(a) * z;
    for (const [e, dx, dy, rr] of MOLS[k].atoms) {
      ctx.save(); ctx.fillStyle = F.el(e); ctx.strokeStyle = alpha(PAL.ink, 0.5); ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.arc(x + dx * c - dy * s, y + dx * s + dy * c, rr * z, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore();
    }
  }
  let hits = []; F.hover(d.stage, () => hits);

  function draw() {
    const { ctx } = begin(d.c);
    const t = cy.now(), f = Math.min(NF, Math.round(t / DT)), { n, pos, at, a0, w, kind } = run;
    const seen = run.events.filter((e) => e.t <= t), reacted = seen.filter((e) => e.react);
    topline(ctx, `${seen.length} ${seen.length === 1 ? 'collision' : 'collisions'} of NO with O_{3} so far, and ${reacted.length} of them reacted.`);
    /* the closed box */
    ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.035); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.roundRect(BOX.l, BOX.t, BOX.r - BOX.l, BOX.b - BOX.t, 6); ctx.fill(); ctx.stroke(); ctx.restore();
    const sample = (k) => (c, sx, sy) => molecule(c, k, sx, sy, 0, 0.75);
    legend(ctx, BOX, ['NO', 'O3', 'NO2', 'O2'].map((k) => ({ s: { NO: 'NO', O3: 'O_{3}', NO2: 'NO_{2}', O2: 'O_{2}' }[k], draw: sample(k) })), { corner: 'above' });
    hits = [];
    /* a ring where a collision reacted, widening and fading */
    for (const e of reacted) {
      const k = (t - e.t) / HALO; if (k >= 1) continue;
      ctx.save(); ctx.strokeStyle = alpha(PAL.ink, 0.45 * (1 - k)); ctx.lineWidth = 4;
      ctx.beginPath(); ctx.arc(e.p[0], e.p[1], RC * (1.3 + 1.2 * k), 0, TAU); ctx.stroke(); ctx.restore();
      hits.push({ x: e.p[0], y: e.p[1], r: RC * 2, name: 'a collision that reacted' });
    }
    for (let i = 0; i < n; i++) {
      const k = t >= at[i] ? (kind[i] === 'NO' ? 'NO2' : 'O2') : kind[i], x = pos[(f * n + i) * 2], y = pos[(f * n + i) * 2 + 1];
      molecule(ctx, k, x, y, a0[i] + w[i] * t);
      hits.push({ x, y, r: RC, name: MOLS[k].name });
    }
    /* the strip: [O₃] against t */
    const c0 = run.nB * PER, ct = (run.nB - reacted.length) * PER, cc = C('concentration'), cr = C('rate');
    const g = axes(ctx, { l: 150, r: 1300, t: 452, b: 582 }, [0, TRUN], [0, 2], { nx: 5, ny: 4, fy: (q) => fmt(q, 1), xl: 'time (s)', xc: C('time'), yl: '[O_{3}] (M)', yc: cc });
    let px = 0, py = c0;
    reacted.forEach((e) => { line(ctx, g.X(px), g.Y(py), g.X(e.t), g.Y(py), cc, 5); line(ctx, g.X(e.t), g.Y(py), g.X(e.t), g.Y(py - PER), cc, 5); px = e.t; py -= PER; });
    line(ctx, g.X(px), g.Y(py), g.X(t), g.Y(py), cc, 5);
    line(ctx, g.X(0), g.Y(c0), g.X(t), g.Y(ct), cr, 3, [10, 10]);
    dot(ctx, g.X(0), g.Y(c0), cc, false, 10);
    dot(ctx, g.X(t), g.Y(ct), cc, true, 9);
    legend(ctx, g, [{ s: 'secant', color: cr, w: 3, dash: [10, 10] }], { corner: 'tr' });
    const tt = Math.max(t, 0.1), rate = (c0 - ct) / tt;
    tex(fx, `\\krate = -\\frac{${hue('concentration', '\\Delta[\\text{O}_{3}]')}}{\\kdt} = -\\frac{${hue('concentration', fmt(ct, 2) + '\\ \\text{M}')} - ${hue('concentration', fmt(c0, 2) + '\\ \\text{M}')}}{${hue('time', fmt(tt, 1) + '\\ \\text{s}')} - ${hue('time', '0.0\\ \\text{s}')}} = ${hue('rate', fmt(rate, 3) + '\\ \\text{M/s}')}`);
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();
};
