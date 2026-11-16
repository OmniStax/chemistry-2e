/* Figures for section 12.2 Factors Affecting Reaction Rates. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['12.2'] = function (root, F) {
const { fmt, C, PAL, alpha, ctl, cycle, register, begin, line, dot, topline, axes, legend } = F;
const TAU = 2 * Math.PI;
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;

/* =====================================================================
   SIM: iron in hydrochloric acid, Fe + 2H⁺ ⟶ Fe²⁺ + H₂, the reaction of
   Figure 12.6, in two vessels. The left one never changes: 144 iron atoms
   in one piece, 1.0 M acid, 25 °C. The right one holds the same 144 atoms
   cut into the pieces chosen, in acid of the concentration and temperature
   set. Hydrogen ions fly straight and bounce; one that strikes an iron
   atom reacts with a chance of 1 in 2 at 25 °C, doubled with each 10 °C
   (the section's rule of thumb), and their speed goes as √T. Acid that
   reacts is replaced from above, so its concentration holds. A run of
   TRUN seconds is computed whole when a control moves, so the transport
   scrubs it exactly. The graph plots the iron atoms left in each vessel
   (0 to 144) against t (0 to 6 s). Lengths are canvas units.
===================================================================== */
(function () {
  const d = F.sim(root, 'sim-collisions', 870);
  const Pc = F.choice(d.controls, { label: '\\text{pieces of iron}', aria: 'the number of pieces the iron is cut into', options: ['1', '4', '16'].map((v) => ({ value: v, label: v })), value: '16', ms: 500, onInput: rerun });
  const Cc = ctl(d.controls, { label: hue('concentration', '[\\text{HCl}]'), cls: 'concentration', min: 0.5, max: 2, step: 0.5, value: 1, unit: 'M', dec: 1, onInput: rerun, aria: 'concentration of the hydrochloric acid in mol per liter' });
  const Tc = ctl(d.controls, { label: '\\kT', cls: 'temperature', min: 5, max: 35, step: 5, value: 25, unit: '°C', dec: 0, onInput: rerun, aria: 'temperature of the acid in degrees Celsius' });
  const ro = F.readout(d);

  /*MODEL*/
  const NC = 24, NR = 6, NA = NC * NR, DA = 14, RA = 7, RH = 6, RF = 4.5;      /* the bar of atoms, 24 by 6; radii of Fe, H⁺ and Fe²⁺ */
  const WB = 590, TOP = 130, BOT = 450;                                        /* a vessel's inside width, and the liquid drawn */
  const TRUN = 6, DT = 1 / 240, EVERY = 4, NF = Math.round(TRUN / DT / EVERY);
  const P25 = 0.5, VH = 420, PER = 40, SEED = 2;                              /* share reacting at 25 °C, ion speed, ions per 1.0 M */
  const MODES = { 1: { w: 24, h: 6, gx: 0, gy: 0 }, 4: { w: 6, h: 6, gx: 50, gy: 0 }, 16: { w: 3, h: 3, gx: 28, gy: 28 } };
  const rng = (seed) => () => { seed = (seed + 0x6D2B79F5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  const gauss = (r) => { let a = 0; while (!a) a = r(); return Math.sqrt(-2 * Math.log(a)) * Math.cos(TAU * r()); };
  /* atom i of the bar (column c, row r) once cut into a mode's pieces, measured from the vessel's left wall */
  function lattice(mode) {
    const m = MODES[mode], nx = NC / m.w, ny = NR / m.h, W = NC * DA + (nx - 1) * m.gx, H = NR * DA + (ny - 1) * m.gy;
    const x0 = (WB - W) / 2 + RA, y0 = BOT - 62 - H + RA, out = [];
    for (let r = 0; r < NR; r++) for (let c = 0; c < NC; c++) out.push({ x: x0 + c * DA + Math.floor(c / m.w) * m.gx, y: y0 + r * DA + Math.floor(r / m.h) * m.gy, piece: Math.floor(r / m.h) * nx + Math.floor(c / m.w), c, r });
    return out;
  }
  /* the neighbour of atom i one step along (dc, dr) in its own piece, or -1 */
  const beside = (at, i, dc, dr) => { const a = at[i], c = a.c + dc, r = a.r + dr; if (c < 0 || c >= NC || r < 0 || r >= NR) return -1; const j = r * NC + c; return at[j].piece === a.piece ? j : -1; };
  function simulate(mode, conc, Tc) {
    const at = lattice(mode), n = Math.round(conc * PER), p = Math.min(1, P25 * 2 ** ((Tc - 25) / 10)), vs = VH * Math.sqrt((Tc + 273.15) / 298.15);
    const gone = new Float32Array(NA).fill(Infinity), here = new Uint8Array(NA).fill(1), left = {};
    at.forEach((a) => { left[a.piece] = (left[a.piece] || 0) + 1; });
    /* hydrogen ion j keeps one stream of draws, so it is the same ion at every setting and in both vessels */
    const streams = [], hx = [], hy = [], hu = [], hv = [], born = [];
    const clear = (x, y) => at.every((a) => Math.hypot(a.x - x, a.y - y) > RA + RH + 2);
    for (let j = 0; j < n; j++) {
      const r = rng((SEED * 100 + j) * 7919); streams.push(r); let x, y;
      do { x = RH + 2 + r() * (WB - 2 * RH - 4); y = TOP + RH + 2 + r() * (BOT - TOP - 2 * RH - 4); } while (!clear(x, y));
      hx.push(x); hy.push(y); hu.push(gauss(r) * vs); hv.push(gauss(r) * vs); born.push([-1]);
    }
    const fx = new Float32Array(NA), fy = new Float32Array(NA), fu = new Float32Array(NA), fv = new Float32Array(NA);
    const waiting = {}, held = [], h2 = [], events = [], done = [];
    const frames = { h: new Float32Array((NF + 1) * n * 2), f: new Float32Array((NF + 1) * NA * 2) };
    const wall = (x, y, u, v, r) => [(x < r && u < 0) || (x > WB - r && u > 0) ? -u : u, (y < TOP + r && v < 0) || (y > BOT - r && v > 0) ? -v : v];
    for (let s = 0; s <= NF * EVERY; s++) {
      const t = s * DT, now = t + DT;
      if (s % EVERY === 0) {
        const f = s / EVERY;
        for (let j = 0; j < n; j++) { frames.h[(f * n + j) * 2] = hx[j]; frames.h[(f * n + j) * 2 + 1] = hy[j]; }
        for (let i = 0; i < NA; i++) { frames.f[(f * NA + i) * 2] = fx[i]; frames.f[(f * NA + i) * 2 + 1] = fy[i]; }
      }
      if (s === NF * EVERY) break;
      for (let j = 0; j < n; j++) {
        hx[j] += hu[j] * DT; hy[j] += hv[j] * DT; [hu[j], hv[j]] = wall(hx[j], hy[j], hu[j], hv[j], RH);
        hx[j] = Math.max(RH, Math.min(WB - RH, hx[j])); hy[j] = Math.max(TOP + RH, Math.min(BOT - RH, hy[j]));
        /* the atom the ion is deepest into is the one it struck; it is set back on that atom's surface, and one strike is one draw */
        for (let pass = 0; pass < 3; pass++) {
          let i = -1, q = RA + RH;
          for (let o = 0; o < NA; o++) {
            if (!here[o]) continue;
            const ex = hx[j] - at[o].x, ey = hy[j] - at[o].y; if (Math.abs(ex) > RA + RH || Math.abs(ey) > RA + RH) continue;
            const e = Math.hypot(ex, ey); if (e < q && e > 0) { q = e; i = o; }
          }
          if (i < 0) break;
          const nx = (hx[j] - at[i].x) / q, ny = (hy[j] - at[i].y) / q, vn = hu[j] * nx + hv[j] * ny;
          hx[j] = at[i].x + nx * (RA + RH); hy[j] = at[i].y + ny * (RA + RH);
          if (vn >= 0) continue;
          if (pass) { hu[j] -= 2 * vn * nx; hv[j] -= 2 * vn * ny; continue; }
          const r = streams[j], react = r() < p;
          events.push({ t: now, x: at[i].x + nx * RA, y: at[i].y + ny * RA, react });
          if (!react) { hu[j] -= 2 * vn * nx; hv[j] -= 2 * vn * ny; continue; }
          /* The ion takes an electron from the iron and stays on the piece as a hydrogen atom; the next ion to react on that
             piece joins it and the two leave as H₂. Each pair costs the piece one atom, which goes into the solution as Fe²⁺:
             on even pieces with the first ion of the pair, on odd pieces with the second, so the count favours neither few
             pieces nor many. A piece down to its last atom gives it up with the second. */
          const pc = at[i].piece, w = waiting[pc], lose = left[pc] === 1 ? !!w : (pc % 2 === 0) === !w;
          if (lose) {
            here[i] = 0; gone[i] = now; left[pc]--; done.push(now);
            const sf = vs * Math.sqrt(1.008 / 55.85) * 2.2, a = Math.atan2(ny, nx) + (r() - 0.5);
            fx[i] = at[i].x; fy[i] = at[i].y; fu[i] = Math.cos(a) * sf; fv[i] = Math.sin(a) * sf;
          }
          if (w) { w.t1 = now; waiting[pc] = null; h2.push({ t0: now, x: at[i].x + nx * (RA + 6), y: at[i].y + ny * (RA + 6), ph: r() * TAU }); }
          else {
            /* the hydrogen atom sits where the ion struck, or on the nearest atom still there when that one has just left */
            let k = i, kx = nx, ky = ny;
            if (lose) {
              let best = Infinity;
              for (let o = 0; o < NA; o++) { if (!here[o] || at[o].piece !== pc) continue; const q2 = Math.hypot(at[o].x - at[i].x, at[o].y - at[i].y); if (q2 < best) { best = q2; k = o; } }
              kx = (at[i].x - at[k].x) / best; ky = (at[i].y - at[k].y) / best;
            }
            const rec = { i: k, nx: kx, ny: ky, t0: now, t1: Infinity }; held.push(rec); waiting[pc] = rec;
          }
          /* fresh acid comes down from the solution above */
          hx[j] = RH + 2 + r() * (WB - 2 * RH - 4); hy[j] = TOP + RH + 1; const th = Math.PI * (0.15 + 0.7 * r()), sp = vs * (0.7 + 0.8 * r());
          hu[j] = Math.cos(th) * sp; hv[j] = Math.sin(th) * sp; born[j].push(now);
          break;
        }
      }
      for (let a = 0; a < n; a++) for (let b = a + 1; b < n; b++) {
        const dx = hx[b] - hx[a], dy = hy[b] - hy[a]; if (Math.abs(dx) > 2 * RH || Math.abs(dy) > 2 * RH) continue;
        const q = Math.hypot(dx, dy); if (q >= 2 * RH || q === 0) continue;
        const nx = dx / q, ny = dy / q, vn = (hu[b] - hu[a]) * nx + (hv[b] - hv[a]) * ny; if (vn >= 0) continue;
        hu[a] += vn * nx; hv[a] += vn * ny; hu[b] -= vn * nx; hv[b] -= vn * ny;
      }
      for (let i = 0; i < NA; i++) {
        if (here[i] || gone[i] === Infinity) continue;
        fx[i] += fu[i] * DT; fy[i] += fv[i] * DT; [fu[i], fv[i]] = wall(fx[i], fy[i], fu[i], fv[i], RF);
        for (let k = 0; k < NA; k++) {
          if (!here[k]) continue;
          const dx = fx[i] - at[k].x, dy = fy[i] - at[k].y; if (Math.abs(dx) > RA + RF || Math.abs(dy) > RA + RF) continue;
          const q = Math.hypot(dx, dy); if (q >= RA + RF || q === 0) continue;
          const nx = dx / q, ny = dy / q, vn = fu[i] * nx + fv[i] * ny; if (vn < 0) { fu[i] -= 2 * vn * nx; fv[i] -= 2 * vn * ny; }
        }
      }
    }
    return { mode, n, at, gone, held, h2, events, done, frames, born };
  }
  /*END MODEL*/

  const BASE = { mode: '1', conc: 1, T: 25 };
  const base = simulate(BASE.mode, BASE.conc, BASE.T);
  let run = null;
  const cy = cycle(() => TRUN, 1.2);
  function rerun() { run = simulate(Pc.value, Cc.v, Tc.v); cy.reset(); }
  run = simulate(Pc.value, Cc.v, Tc.v);

  const LX = [70, 740], RISE = 150, RING = 0.5;
  const ball = (ctx, x, y, r, fill, edge = 0.6, w = 1.2) => { ctx.save(); ctx.fillStyle = fill; ctx.strokeStyle = alpha(PAL.ink, edge); ctx.lineWidth = w; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore(); };
  const pair = (ctx, x, y, a) => { const c = Math.cos(a) * 4.2, s = Math.sin(a) * 4.2; ball(ctx, x - c, y - s, 4.6, F.el('H')); ball(ctx, x + c, y + s, 4.6, F.el('H')); };
  const pieces = (m) => (m === '1' ? '1 piece' : m + ' pieces');
  let hits = []; F.hover(d.stage, () => hits);

  /* one vessel at time t: its walls, the iron, the ions and what has formed; returns the atoms left and those at the surface */
  function vessel(ctx, L, R, t, col, set, from, k) {
    const f = Math.min(NF, Math.round(t / (DT * EVERY))), { n, at, gone, frames } = R, was = k < 1 ? lattice(from) : at;
    ctx.save(); ctx.fillStyle = alpha(col, 0.07); ctx.fillRect(L, TOP - 14, WB, BOT - TOP + 14); ctx.restore();
    ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(L - 2.5, TOP - 14); ctx.arcTo(L - 2.5, BOT + 2.5, L + WB + 2.5, BOT + 2.5, 12); ctx.arcTo(L + WB + 2.5, BOT + 2.5, L + WB + 2.5, TOP - 14, 12); ctx.lineTo(L + WB + 2.5, TOP - 14); ctx.stroke(); ctx.restore();
    const there = (i) => i >= 0 && gone[i] > t;
    let remain = 0, surface = 0;
    for (let i = 0; i < NA; i++) {
      if (!there(i)) continue;
      const out = !(there(beside(at, i, 1, 0)) && there(beside(at, i, -1, 0)) && there(beside(at, i, 0, 1)) && there(beside(at, i, 0, -1)));
      const x = L + was[i].x + (at[i].x - was[i].x) * k, y = was[i].y + (at[i].y - was[i].y) * k;
      remain++; if (out) surface++;
      ball(ctx, x, y, RA, alpha(F.el('Fe'), out ? 1 : 0.38), out ? 0.7 : 0.25, out ? 1.4 : 1);
      hits.push({ x, y, r: RA, name: out ? 'an iron atom at the surface' : 'an iron atom inside the piece, out of the acid’s reach' });
    }
    for (const h of R.held) {
      if (h.t0 > t || h.t1 <= t) continue;
      const x = L + at[h.i].x + h.nx * (RA + 3.5), y = at[h.i].y + h.ny * (RA + 3.5);
      ball(ctx, x, y, 4.6, F.el('H')); hits.push({ x, y, r: 8, name: 'a hydrogen atom held on the iron' });
    }
    for (let i = 0; i < NA; i++) {
      if (there(i)) continue;
      const x = L + frames.f[(f * NA + i) * 2], y = frames.f[(f * NA + i) * 2 + 1];
      ball(ctx, x, y, RF, F.el('Fe')); hits.push({ x, y, r: 9, name: 'an iron(II) ion, Fe²⁺, in the solution' });
    }
    for (const b of R.h2) {
      const y = b.y - RISE * (t - b.t0); if (b.t0 > t || y < TOP - 8) continue;
      const x = L + b.x + 6 * Math.sin(b.ph + 5 * (t - b.t0));
      ctx.save(); ctx.globalAlpha = Math.min(1, (y - TOP + 8) / 30); pair(ctx, x, y, b.ph + 2 * (t - b.t0)); ctx.restore();
      hits.push({ x, y, r: 10, name: 'a hydrogen molecule, H₂, rising out of the acid' });
    }
    for (let j = 0; j < n; j++) {
      const x = L + frames.h[(f * n + j) * 2], y = frames.h[(f * n + j) * 2 + 1];
      let b = -1; for (const q of R.born[j]) if (q <= t) b = q;
      ctx.save(); ctx.globalAlpha = Math.max(0, Math.min(1, (t - b) / 0.2)); ball(ctx, x, y, RH, F.el('H'), 0.75, 1.4); ctx.restore();
      hits.push({ x, y, r: 9, name: 'a hydrogen ion, H⁺, of the acid' });
    }
    /* a ring where an ion reacted, widening and fading */
    for (const e of R.events) {
      const q = (t - e.t) / RING; if (!e.react || q < 0 || q >= 1) continue;
      ctx.save(); ctx.strokeStyle = alpha(PAL.ink, 0.6 * (1 - q)); ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(L + e.x, e.y, 9 + 16 * q, 0, TAU); ctx.stroke(); ctx.restore();
    }
    F.rich(ctx, [[pieces(set.mode), col, 700], ', ', [fmt(set.conc, 1) + ' M', C('concentration')], ' HCl, ', [fmt(set.T, 0) + ' °C', C('temperature')]], L, TOP - 36, { size: 22 });
    F.rich(ctx, [[String(surface), col, 700], ' of ' + remain + ' atoms exposed'], L + WB, TOP - 36, { size: 22, align: 'right' });
    return remain;
  }

  function draw() {
    const { ctx } = begin(d.c);
    const t = cy.now(), cols = [F.cat(0), F.cat(1)], set = { mode: Pc.value, conc: Cc.v, T: Tc.v };
    hits = [];
    const a = vessel(ctx, LX[0], base, t, cols[0], BASE, BASE.mode, 1), b = vessel(ctx, LX[1], run, t, cols[1], set, Pc.from, Pc.k);
    topline(ctx, `After ${fmt(t, 1)} s, ${NA - a} iron ${NA - a === 1 ? 'atom has' : 'atoms have'} reacted on the left and ${NA - b} on the right.`);
    const fe = (edge, fillA) => (c, x, y) => ball(c, x, y, 8, alpha(F.el('Fe'), fillA), edge, 1.4);
    legend(ctx, { l: LX[0], r: LX[1] + WB, t: TOP, b: BOT + 8 }, [
      { s: 'Fe atom, exposed', draw: fe(0.7, 1) }, { s: 'Fe atom, inside', draw: fe(0.25, 0.38) },
      { s: 'H^+', draw: (c, x, y) => ball(c, x, y, 6.5, F.el('H'), 0.75, 1.4) },
      { s: 'H_2', draw: (c, x, y) => pair(c, x, y, 0) },
      { s: 'Fe^{2+}', draw: (c, x, y) => ball(c, x, y, 4.5, F.el('Fe')) },
    ], { corner: 'below' });
    /* the graph: iron atoms left against t, a step down as each atom leaves */
    const g = axes(ctx, { l: 150, r: 1300, t: 580, b: 800 }, [0, TRUN], [0, NA], { nx: 6, ny: 4, xl: 'time (s)', xc: C('time'), yl: 'iron atoms left' });
    [[base, a], [run, b]].forEach(([R, left], k) => {
      let px = 0, py = NA;
      for (const q of R.done) { if (q > t) break; line(ctx, g.X(px), g.Y(py), g.X(q), g.Y(py), cols[k], 5); line(ctx, g.X(q), g.Y(py), g.X(q), g.Y(py - 1), cols[k], 5); px = q; py--; }
      line(ctx, g.X(px), g.Y(py), g.X(t), g.Y(py), cols[k], 5);
      dot(ctx, g.X(t), g.Y(left), cols[k], true, 9);
    });
    legend(ctx, g, [{ s: 'left', color: cols[0], w: 5 }, { s: 'right', color: cols[1], w: 5 }], { corner: 'bl' });
    const tt = Math.max(t, 0.1);
    const rate = (name, left) => `\\text{${name}: }\\krate = -\\frac{\\Delta(\\text{iron atoms})}{\\kdt} = -\\frac{${left} - ${NA}}{${hue('time', fmt(tt, 1) + '\\ \\text{s}')} - ${hue('time', '0.0\\ \\text{s}')}} = ${hue('rate', fmt((NA - left) / tt, 1) + '\\ \\text{atoms/s}')}`;
    ro.set(`${rate('left', a)} \\\\ ${rate('right', b)}`, 'Water and chloride ions are not drawn, and acid that reacts is replaced from above. One hit in two reacts at 25 °C, and that share is made to double with each 10 °C.');
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => (Pc.k < 1 ? 0 : 1)), draw });
})();
};
