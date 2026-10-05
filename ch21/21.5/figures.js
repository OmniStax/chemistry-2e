/* Figures for section 21.5 Uses of Radioisotopes. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['21.5'] = function (root, F) {
const { C, PAL, alpha, cycle, register, begin, line, text, topline, measure, tex } = F;
const sim = (id, H) => F.sim(root, id, H);
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;
const TAU = Math.PI * 2;

/* x as a TeX number to three significant figures, in scientific notation outside 0.01 to 1000 */
function sci(x) {
  if (x === 0) return '0';
  const e = Math.floor(Math.log10(Math.abs(x)));
  if (e >= -2 && e < 3) return x.toPrecision(3);
  const m = x / 10 ** e;
  return `${m.toFixed(2)} \\times 10^{${e}}`;
}
function sign(ctx, x, y, r, s) {
  const a = r * 0.5;
  line(ctx, x - a, y, x + a, y, PAL.panel, Math.max(2, r * 0.2));
  if (s > 0) line(ctx, x, y - a, x, y + a, PAL.panel, Math.max(2, r * 0.2));
}
function disc(ctx, x, y, r, fill, s) {
  ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fillStyle = fill; ctx.fill();
  ctx.strokeStyle = alpha(PAL.ink, 0.45); ctx.lineWidth = Math.max(1, r * 0.09); ctx.stroke(); ctx.restore();
  if (s) sign(ctx, x, y, r, s);
}
/* a photon's wavy arrow from (x0, y0) to (x1, y1) */
function wavy(ctx, x0, y0, x1, y1, color, amp = 7, wl = 22, w = 3) {
  const L = Math.hypot(x1 - x0, y1 - y0), ux = (x1 - x0) / L, uy = (y1 - y0) / L, end = Math.max(0, L - 20);
  ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = w; ctx.lineJoin = 'round'; ctx.beginPath();
  for (let s = 0; s <= end; s += 2) {
    const o = amp * Math.sin((s / wl) * TAU), x = x0 + ux * s - uy * o, y = y0 + uy * s + ux * o;
    s === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.stroke(); ctx.restore();
  F.arrow(ctx, x0 + ux * (end - 4), y0 + uy * (end - 4), x1, y1, color, w);
}
/* a fixed sequence of numbers in [0, 1) */
function rng(seed) {
  let a = seed >>> 0;
  return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

/* =====================================================================
   FIGURE 21.26: the gantry of a cobalt-60 machine swinging its γ beam
   through an arc around a slice of the head, the beam always crossing
   the target at the centre of the swing. The clock is the treatment,
   10.0 min for one sweep (2 min of model time a second), then a hold.
   Each cell of the head is shaded by the time it has spent in the beam
   as a fraction of the whole treatment: a cell at distance r from the
   target and bearing a is in a beam of width w while the gantry angle
   is within asin(w / 2r) of a or of a + π, so its time is the overlap of
   those windows with the arc swept so far, divided by the arc. The bars
   beside give the target's time and the time of the skin straight above
   it; axis fixed at 0 to 10 min. 20 logical units to the centimetre.
===================================================================== */
(function () {
  const H = 640, d = sim('sim-gantry', H);
  const O = { x: 470, y: 368 }, HC = { x: 450, y: 380 }, RX = 150, RY = 178, RG = 236, U = 20, TT = 10, FAR = 205;
  const cy = cycle(() => TT, 1.2);
  const arc = F.ctl(d.controls, { label: '\\text{arc}', cls: 'angle', key: 'arc', min: 0, max: 360, step: 5, value: 120, unit: '°', dec: 0,
    aria: 'the arc the gantry swings through', onInput: () => cy.reset() });
  const wid = F.ctl(d.controls, { label: '\\text{beam width}', cls: 'length', key: 'width', min: 1, max: 4, step: 0.1, value: 2, unit: 'cm', dec: 1,
    aria: 'the width of the beam', onInput: () => cy.reset() });
  const inHead = (x, y) => ((x - HC.x) / RX) ** 2 + ((y - HC.y) / RY) ** 2 <= 1;
  const SKIN = { x: O.x, y: HC.y - RY * Math.sqrt(1 - ((O.x - HC.x) / RX) ** 2) };
  const CELL = 8, cells = [], X0 = HC.x - RX - CELL, Y0 = HC.y - RY - CELL;
  for (let x = X0; x < HC.x + RX + CELL; x += CELL) for (let y = Y0; y < HC.y + RY + CELL; y += CELL)
    if (((x + CELL / 2 - HC.x) / (RX + CELL)) ** 2 + ((y + CELL / 2 - HC.y) / (RY + CELL)) ** 2 <= 1) cells.push([x, y]);
  const grid = document.createElement('canvas');
  grid.width = Math.ceil((2 * RX + 2 * CELL) / CELL) + 1; grid.height = Math.ceil((2 * RY + 2 * CELL) / CELL) + 1;
  function overlap(a, b, c, h) {
    let m = 0;
    for (let k = -2; k <= 2; k++) { const lo = Math.max(a, c + k * TAU - h), hi = Math.min(b, c + k * TAU + h); if (hi > lo) m += hi - lo; }
    return m;
  }
  /* the fraction of the whole treatment a point has spent in the beam once a fraction s of it is over */
  function share(px, py, th, s, w) {
    const dx = px - O.x, dy = py - O.y, r = Math.hypot(dx, dy);
    if (r <= w / 2) return s;
    const a = Math.atan2(dx, -dy);
    if (th < 1e-6) return Math.abs(r * Math.sin(a)) < w / 2 ? s : 0;
    const h = Math.asin(w / (2 * r)), lo = -th / 2, hi = lo + th * s;
    return (overlap(lo, hi, a, h) + overlap(lo, hi, a + Math.PI, h)) / th;
  }
  const dir = (p) => [Math.sin(p), -Math.cos(p)];
  const minutes = (m) => m.toFixed(1);
  let hits = [];
  F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c), now = cy.now(), s = now / TT, th = (arc.v * Math.PI) / 180, w = wid.v * U;
    const phi = -th / 2 + th * s, [ux, uy] = dir(phi), G = F.el('gamma'), tc = C('time');
    const fin = share(SKIN.x, SKIN.y, th, 1, w) * TT;
    topline(ctx, arc.v === 0
      ? `Held still, the beam is on the skin above the target for the whole ${minutes(TT)} min, as long as on the target.`
      : `Swung through ${arc.v}°, the beam is on the skin above the target for ${minutes(fin)} min of the target’s ${minutes(TT)} min.`);
    hits = [];
    /* the time each part of the head has spent in the beam */
    const g = grid.getContext('2d');
    g.clearRect(0, 0, grid.width, grid.height);
    for (const [x, y] of cells) {
      const v = share(x + CELL / 2, y + CELL / 2, th, s, w);
      if (v > 0.002) { g.fillStyle = alpha(tc, 0.06 + 0.7 * v); g.fillRect((x - X0) / CELL, (y - Y0) / CELL, 1, 1); }
    }
    ctx.save(); ctx.beginPath(); ctx.ellipse(HC.x, HC.y, RX, RY, 0, 0, TAU); ctx.clip();
    ctx.imageSmoothingEnabled = true; ctx.drawImage(grid, X0 - CELL / 2, Y0 - CELL / 2, grid.width * CELL, grid.height * CELL); ctx.restore();
    /* the head, the target and the skin point */
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(HC.x, HC.y, RX, RY, 0, 0, TAU); ctx.stroke(); ctx.restore();
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2.5; ctx.fillStyle = alpha(PAL.ink, 0.25); ctx.beginPath(); ctx.arc(O.x, O.y, 14, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore();
    F.dot(ctx, SKIN.x, SKIN.y, PAL.ink, false, 7);
    /* the gantry's track, the arc it swings through drawn solid */
    ctx.save(); ctx.strokeStyle = alpha(PAL.ink, 0.3); ctx.lineWidth = 2; ctx.setLineDash([6, 8]); ctx.beginPath(); ctx.arc(O.x, O.y, RG, 0, TAU); ctx.stroke(); ctx.restore();
    if (th > 0) {
      ctx.save(); ctx.strokeStyle = alpha(C('angle'), 0.9); ctx.lineWidth = 5; ctx.beginPath();
      ctx.arc(O.x, O.y, RG, -Math.PI / 2 - th / 2, -Math.PI / 2 + th / 2); ctx.stroke(); ctx.restore();
    }
    /* the beam, from the source through the target and out the far side */
    const S = { x: O.x + ux * RG, y: O.y + uy * RG }, E = { x: O.x - ux * FAR, y: O.y - uy * FAR }, nx = -uy, ny = ux, hw = w / 2;
    const S0 = { x: S.x - ux * 26, y: S.y - uy * 26 };
    ctx.save(); ctx.fillStyle = alpha(G, 0.16); ctx.beginPath();
    ctx.moveTo(S0.x + nx * hw, S0.y + ny * hw); ctx.lineTo(E.x + nx * hw, E.y + ny * hw); ctx.lineTo(E.x - nx * hw, E.y - ny * hw); ctx.lineTo(S0.x - nx * hw, S0.y - ny * hw); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = alpha(G, 0.55); ctx.lineWidth = 1.5; ctx.stroke(); ctx.restore();
    /* γ rays travelling down the beam */
    const LB = RG - 26 + FAR, GAP = 92, run = now * 210;
    for (let k = 0; k < Math.ceil(LB / GAP) + 1; k++) {
      const p = ((run + k * GAP) % LB + LB) % LB;
      if (p > LB - 40) continue;
      [-0.45, 0.45].forEach((f, j) => {
        const q = (p + j * GAP / 2) % LB, x0 = S0.x - ux * q + nx * f * hw, y0 = S0.y - uy * q + ny * f * hw;
        if (q > LB - 40) return;
        wavy(ctx, x0, y0, x0 - ux * 40, y0 - uy * 40, G, 4, 13, 2.5);
      });
    }
    /* the cobalt-60 source on the gantry, facing the target */
    ctx.save(); ctx.translate(S.x, S.y); ctx.rotate(phi);
    ctx.fillStyle = PAL.soft; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.roundRect(-40, -30, 80, 56, 8); ctx.fill(); ctx.stroke();
    ctx.fillStyle = alpha(G, 0.85); ctx.fillRect(-hw * 0.5 - 4, 18, hw + 8, 8); ctx.restore();
    hits.push({ x: S.x, y: S.y, r: 40, name: 'the cobalt-60 source on the gantry' });
    hits.push({ x: O.x, y: O.y, r: 18, name: `the target: ${minutes(now)} min in the beam` });
    hits.push({ x: SKIN.x, y: SKIN.y, r: 12, name: `the skin above the target: ${minutes(share(SKIN.x, SKIN.y, th, s, w) * TT)} min in the beam` });
    hits.push({ x: (O.x + E.x) / 2, y: (O.y + E.y) / 2, r: 30, name: 'the beam of γ rays' });
    F.label(ctx, 'target', O.x, O.y, { side: 'right', gap: 70, size: 21 });
    F.label(ctx, 'skin', SKIN.x, SKIN.y, { side: 'left', gap: 64, size: 21 });
    /* the legend */
    const LX = 24, LY = 120;
    ctx.save(); ctx.fillStyle = PAL.soft; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2; ctx.beginPath(); ctx.roundRect(LX, LY - 13, 34, 26, 5); ctx.fill(); ctx.stroke(); ctx.restore();
    text(ctx, 'cobalt-60 source', LX + 46, LY, PAL.ink, { size: 20 });
    wavy(ctx, LX - 4, LY + 40, LX + 40, LY + 40, G, 4, 13, 2.5);
    text(ctx, 'γ rays', LX + 46, LY + 40, PAL.ink, { size: 20 });
    ctx.save(); ctx.fillStyle = alpha(tc, 0.5); ctx.fillRect(LX, LY + 68, 34, 24); ctx.restore();
    text(ctx, 'time in the beam', LX + 46, LY + 80, tc, { size: 20, weight: 600 });
    /* the bars: time in the beam, 0 to 10 min */
    const B = { l: 1010, r: 1320, t: 150, b: 520 }, Y = (m) => B.b - (m / TT) * (B.b - B.t);
    text(ctx, 'time in the beam (min)', B.l - 30, B.t - 46, tc, { size: 21, weight: 600 });
    for (let m = 0; m <= TT; m += 2) {
      line(ctx, B.l, Y(m), B.r, Y(m), alpha(PAL.ink, m ? 0.12 : 0.6), m ? 1.5 : 2.5);
      text(ctx, String(m), B.l - 12, Y(m), PAL.muted, { size: 17, align: 'right' });
    }
    line(ctx, B.l, B.t - 10, B.l, B.b, PAL.muted, 2.5);
    const bars = [['target', now, 1100], ['skin', share(SKIN.x, SKIN.y, th, s, w) * TT, 1230]];
    bars.forEach(([name, m, x]) => {
      ctx.save(); ctx.fillStyle = alpha(tc, 0.8); ctx.fillRect(x - 36, Y(m), 72, B.b - Y(m)); ctx.restore();
      text(ctx, `${minutes(m)} min`, x, Y(m) - 18, tc, { size: 19, weight: 600, align: 'center' });
      text(ctx, name, x, B.b + 26, PAL.ink, { size: 21, align: 'center' });
      hits.push({ x, y: (Y(m) + B.b) / 2, r: 40, name: `${name}: ${minutes(m)} min in the beam` });
    });
    const tT = minutes(now), tS = minutes(bars[1][1]);
    tex(d.readout, +tT === 0
      ? `\\kt_{\\text{skin}} = \\kt_{\\text{target}} = ${hue('time', '0\\ \\text{min}')}`
      : `\\frac{\\kt_{\\text{skin}}}{\\kt_{\\text{target}}} = \\frac{${hue('time', `${tS}\\ \\text{min}`)}}{${hue('time', `${tT}\\ \\text{min}`)}} = ${(+tS / +tT).toFixed(2)}`, false, { values: false });
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 2), draw });
})();

/* =====================================================================
   FIGURE 21.27: the decay scheme of cobalt-60, a faithful copy on an
   energy axis, 130 logical units to the MeV. Co-60 (2.82 MeV above
   Ni-60's ground state) β-decays to Ni-60's level at 2.5057 MeV
   (0.31 MeV, 99.88%) or at 1.3325 MeV (1.48 MeV, 0.12%), and the
   nucleus falls to its ground state by two γ rays, 1.1732 MeV and
   1.3325 MeV. Still: nothing varies.
===================================================================== */
(function () {
  const H = 540, d = sim('sim-co60-decay', H);
  const AX = 160, Y0 = 476, K = 130, Y = (e) => Y0 - e * K;
  const CO = { e: 2.82, l: 220, r: 470 }, NI = { l: 640, r: 1040 }, LV = [2.5057, 1.3325, 0];
  let hits = [];
  F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c), ec = C('energy'), be = F.el('e-'), G = F.el('gamma');
    hits = [];
    /* the energy axis */
    line(ctx, AX, Y(0) + 6, AX, Y(3.2), PAL.muted, 2.5);
    for (let e = 0; e <= 3; e++) {
      line(ctx, AX - 8, Y(e), AX, Y(e), PAL.muted, 2.5);
      text(ctx, String(e), AX - 16, Y(e), PAL.muted, { size: 17, align: 'right' });
    }
    text(ctx, 'E (MeV)', AX, Y(3.2) - 22, ec, { size: 21, weight: 600, align: 'center' });
    /* the levels */
    line(ctx, CO.l, Y(CO.e), CO.r, Y(CO.e), PAL.ink, 5);
    text(ctx, '${}^{60}_{27}\\text{Co}$', (CO.l + CO.r) / 2, Y(CO.e) - 30, PAL.ink, { size: 28, align: 'center', tex: true });
    text(ctx, '5.272 a', (CO.l + CO.r) / 2, Y(CO.e) + 24, C('time'), { size: 21, weight: 600, align: 'center' });
    hits.push({ x: (CO.l + CO.r) / 2, y: Y(CO.e), r: 60, name: 'cobalt-60, half-life 5.272 a' });
    LV.forEach((e) => {
      line(ctx, NI.l, Y(e), NI.r, Y(e), PAL.ink, 5);
      if (e > 0) text(ctx, `${e.toFixed(4)} MeV`, NI.r + 16, Y(e), ec, { size: 19, weight: 600 });
      hits.push({ x: (NI.l + NI.r) / 2, y: Y(e), r: 40, name: e ? `nickel-60 in an excited state, ${e.toFixed(4)} MeV above its ground state` : 'nickel-60 in its ground state' });
    });
    text(ctx, '${}^{60}_{28}\\text{Ni}$', (NI.l + NI.r) / 2, Y(0) + 32, PAL.ink, { size: 28, align: 'center', tex: true });
    /* the two β branches */
    const branch = (x1, e1, mev, pct, lx, ly) => {
      F.arrow(ctx, CO.r, Y(CO.e), x1, Y(e1), be, 4);
      text(ctx, 'β', lx, ly, be, { size: 24, weight: 600 });
      const bx = lx + measure(ctx, 'β', { size: 24, weight: 600 }) + 10;
      text(ctx, `${mev} MeV`, bx, ly, ec, { size: 20, weight: 600 });
      text(ctx, pct, bx + measure(ctx, `${mev} MeV`, { size: 20, weight: 600 }) + 10, ly, PAL.ink, { size: 20 });
    };
    branch(700, LV[0], '0.31', '99.88%', 560, Y(CO.e) - 18);
    branch(720, LV[1], '1.48', '0.12%', 410, Y(1.85));
    /* the two γ rays */
    [[LV[0], LV[1], '1.1732'], [LV[1], LV[2], '1.3325']].forEach(([a, b, mev]) => {
      wavy(ctx, 880, Y(a) + 4, 880, Y(b) - 4, G, 6, 20, 3);
      const ym = (Y(a) + Y(b)) / 2;
      text(ctx, 'γ', 910, ym, G, { size: 24, weight: 600 });
      text(ctx, `${mev} MeV`, 936, ym, ec, { size: 20, weight: 600 });
    });
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 21.29: the ionization chamber of a smoke detector. Every 6.00 s
   (a loop that repeats seamlessly) americium-241 below a hole in the
   negative plate sends 24 α particles up into the air, at 700 units a
   second within 35° of the vertical; each leaves three ion pairs along
   its track. The positive ions (N2+ four times in five, O2+ otherwise)
   drift down at 120 units a second and the electrons up at 360. With
   smoke, 26 smoke particles sit in the chamber, and an ion whose path
   crosses one is caught there and fades. The charge Q is that of the
   positive ions reaching the negative plate in one loop, each ion drawn
   standing for 1e8; I = Q / t. The meter reads 0 to 3e-10 A, the alarm
   mark at 1.0e-10 A. The choice crossfades the smoke and the needle.
===================================================================== */
(function () {
  const H = 600, d = sim('sim-smoke', H);
  const P = 6, SCALE = 1e8, QE = 1.602e-19, ALARM = 1e-10, IMAX = 3e-10;
  const CL = 110, CR = 900, TOP = 140, BOT = 460, HOLE = 500, VA = 700, VP = 120, VE = 360, RI = 8;
  const pick = F.choice(d.controls, { label: '\\text{air}', key: 'air', options: [{ value: 'clear', label: 'no smoke' }, { value: 'smoke', label: 'smoke' }], value: 'clear',
    aria: 'smoke in the chamber' });
  const cy = cycle(() => P, 0);
  const r = rng(2105);
  const SMOKE = Array.from({ length: 26 }, () => ({ x: 170 + r() * 680, y: 230 + r() * 205, r: 15 + r() * 7 }));
  /* the α particles and the ion pairs they leave, fixed once */
  const EVENTS = Array.from({ length: 24 }, (_, k) => {
    const te = ((k + 0.15 + 0.7 * r()) * P) / 24, a = (r() - 0.5) * (70 * Math.PI) / 180, len = Math.min(240 + 80 * r(), (BOT - TOP - 30) / Math.cos(a));
    const pairs = [0.3, 0.55, 0.8].map((f0) => {
      const f = f0 + (r() - 0.5) * 0.12, x = HOLE + Math.sin(a) * len * f, y = BOT - Math.cos(a) * len * f;
      return { x, y, t: te + (len * f) / VA, kind: r() < 0.8 ? 'N' : 'O' };
    });
    return { te, a, len, pairs };
  });
  /* where an ion moving straight up or down from (x, y) meets a smoke particle first, or null */
  function catcher(x, y, down) {
    let best = null;
    for (const b of SMOKE) {
      const dx = Math.abs(b.x - x), reach = b.r + RI;
      if (dx >= reach) continue;
      const yc = down ? b.y - Math.sqrt(reach * reach - dx * dx) : b.y + Math.sqrt(reach * reach - dx * dx);
      if (down ? yc <= y : yc >= y) continue;
      if (!best || (down ? yc < best : yc > best)) best = yc;
    }
    return best;
  }
  const PATHS = { clear: [], smoke: [] };
  for (const smoky of [false, true]) for (const ev of EVENTS) for (const p of ev.pairs) {
    [[true, VP, BOT - RI - 5], [false, VE, TOP + 5 + 5]].forEach(([down, v, end]) => {
      const c = smoky ? catcher(p.x, p.y, down) : null, stop = c ?? end;
      PATHS[smoky ? 'smoke' : 'clear'].push({ x: p.x, y0: p.y, y1: stop, t0: p.t, t1: p.t + Math.abs(stop - p.y) / v, caught: c !== null, pos: down, kind: p.kind });
    });
  }
  const arrived = (key) => PATHS[key].filter((q) => q.pos && !q.caught).length;
  const current = (key) => (arrived(key) * SCALE * QE) / P;
  /* an α particle: two protons and two neutrons */
  function alphaP(ctx, x, y) {
    const pr = F.el('p+'), ne = F.el('n0'), o = 4.2, s = 5;
    disc(ctx, x - o, y - o, s, ne); disc(ctx, x + o, y - o, s, pr); disc(ctx, x - o, y + o, s, pr); disc(ctx, x + o, y + o, s, ne);
  }
  function ion(ctx, x, y, kind) {
    const c = F.el(kind);
    disc(ctx, x - 6, y, RI, c); disc(ctx, x + 6, y, RI, c);
    text(ctx, '+', x + 17, y - 9, PAL.ink, { size: 17, weight: 600 });
  }
  function smokeBlob(ctx, b) {
    ctx.save(); ctx.fillStyle = alpha(PAL.muted, 0.5);
    [[0, 0, 1], [0.55, -0.3, 0.6], [-0.5, 0.35, 0.62], [0.3, 0.5, 0.5]].forEach(([dx, dy, k]) => { ctx.beginPath(); ctx.arc(b.x + dx * b.r, b.y + dy * b.r, b.r * k, 0, TAU); ctx.fill(); });
    ctx.restore();
  }
  let hits = [];
  F.hover(d.stage, () => hits);
  const ro = F.readout(d);
  function scene(ctx, key, now) {
    for (const ev of EVENTS) for (const shift of [0, -P]) {
      const t = now - (ev.te + shift), L = VA * t;
      if (t < 0 || L > ev.len + 60) continue;
      const s = Math.min(L, ev.len), x = HOLE + Math.sin(ev.a) * s, y = BOT - Math.cos(ev.a) * s, tail = Math.max(0, s - 60);
      const fade = L > ev.len ? 1 - (L - ev.len) / 60 : 1;
      F.faded(ctx, fade, [0, 0], () => {
        line(ctx, HOLE + Math.sin(ev.a) * tail, BOT - Math.cos(ev.a) * tail, x, y, alpha(PAL.ink, 0.35), 2);
        alphaP(ctx, x, y);
      });
      if (fade > 0.5) hits.push({ x, y, r: 14, name: 'an α particle' });
    }
    for (const q of PATHS[key]) for (const shift of [0, -P]) {
      const t = now - (q.t0 + shift);
      if (t < 0 || t > q.t1 - q.t0 + 0.6) continue;
      const k = Math.min(1, t / (q.t1 - q.t0 || 1)), y = q.y0 + (q.y1 - q.y0) * k, fade = t > q.t1 - q.t0 ? 1 - (t - (q.t1 - q.t0)) / 0.6 : 1;
      F.faded(ctx, q.caught || !q.pos ? fade : Math.min(1, fade * 2), [0, 0], () => {
        if (q.pos) ion(ctx, q.x, y, q.kind); else disc(ctx, q.x, y, 5, F.el('e-'));
      });
      if (fade > 0.5) hits.push({ x: q.x, y, r: 14, name: q.pos ? (q.kind === 'N' ? 'a nitrogen ion, N₂⁺' : 'an oxygen ion, O₂⁺') : 'an electron' });
    }
  }
  function draw() {
    const { ctx } = begin(d.c), now = cy.now(), key = pick.value, cc = C('current');
    hits = [];
    const I = current(key), Q = +(arrived(key) * SCALE * QE).toPrecision(3), Qs = sci(Q), Is = sci(Q / P);
    const caught = 1 - arrived('smoke') / arrived('clear');
    topline(ctx, key === 'clear'
      ? `With no smoke, every ion reaches a plate and $${Is}$ A flows.`
      : `Smoke catches ${Math.round(caught * 100)}% of the ions, and the current falls to $${Is}$ A, below the alarm’s mark.`);
    /* the chamber and its plates */
    ctx.save(); ctx.strokeStyle = alpha(PAL.ink, 0.35); ctx.lineWidth = 2; ctx.strokeRect(CL, TOP - 30, CR - CL, BOT - TOP + 60); ctx.restore();
    ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.55);
    ctx.fillRect(CL + 20, TOP - 10, CR - CL - 40, 10);
    ctx.fillRect(CL + 20, BOT, HOLE - 34 - CL - 20, 10); ctx.fillRect(HOLE + 34, BOT, CR - 20 - HOLE - 34, 10);
    ctx.restore();
    text(ctx, '+', CL + 2, TOP - 5, PAL.ink, { size: 28, weight: 600, align: 'center' });
    text(ctx, '−', CL + 2, BOT + 5, PAL.ink, { size: 28, weight: 600, align: 'center' });
    hits.push({ x: 300, y: TOP - 5, r: 16, name: 'the positive plate' }, { x: 300, y: BOT + 5, r: 16, name: 'the negative plate' });
    /* the americium source under the hole */
    ctx.save(); ctx.fillStyle = PAL.soft; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2; ctx.beginPath(); ctx.roundRect(HOLE - 44, BOT + 22, 88, 18, 4); ctx.fill(); ctx.stroke(); ctx.restore();
    F.label(ctx, 'americium-241', HOLE + 44, BOT + 31, { side: 'right', gap: 22, size: 20 });
    hits.push({ x: HOLE, y: BOT + 31, r: 40, name: 'the americium-241 source, an α emitter' });
    /* smoke, then the moving particles */
    pick.only(ctx, 'smoke', () => SMOKE.forEach((b) => smokeBlob(ctx, b)), [0, 0]);
    if (key === 'smoke') SMOKE.forEach((b) => hits.push({ x: b.x, y: b.y, r: b.r, name: 'a smoke particle' }));
    if (pick.k < 1 && pick.from !== key) pick.only(ctx, pick.from, () => scene(ctx, pick.from, now), [0, 0]);
    pick.only(ctx, key, () => scene(ctx, key, now), [0, 0]);
    /* the circuit: battery on the top wire, meter on the right */
    const WX = 1230, MY = 330, MR = 78;
    line(ctx, CR - 20, TOP - 5, 1062, TOP - 5, PAL.ink, 2.5);
    line(ctx, 1082, TOP - 5, WX, TOP - 5, PAL.ink, 2.5);
    line(ctx, WX, TOP - 5, WX, MY - MR, PAL.ink, 2.5);
    line(ctx, WX, MY + MR, WX, BOT + 5, PAL.ink, 2.5);
    line(ctx, WX, BOT + 5, CR - 20, BOT + 5, PAL.ink, 2.5);
    line(ctx, 1062, TOP - 33, 1062, TOP + 23, PAL.ink, 4);
    line(ctx, 1082, TOP - 19, 1082, TOP + 9, PAL.ink, 6);
    F.label(ctx, 'battery', 1072, TOP - 5, { side: 'above', gap: 50, size: 20 });
    hits.push({ x: 1072, y: TOP - 5, r: 30, name: 'the battery' });
    /* the meter, 0 to 3 × 10⁻¹⁰ A over a 180° dial */
    const ang = (i) => Math.PI + (Math.min(i, IMAX) / IMAX) * Math.PI;
    ctx.save(); ctx.fillStyle = PAL.panel; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(WX, MY, MR, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore();
    for (let i = 0; i <= 3; i++) {
      const a = ang(i * 1e-10), c = Math.cos(a), s = Math.sin(a);
      line(ctx, WX + c * (MR - 14), MY + 8 + s * (MR - 14), WX + c * (MR - 4), MY + 8 + s * (MR - 4), PAL.muted, 2.5);
      text(ctx, String(i), WX + c * (MR - 28), MY + 8 + s * (MR - 28), cc, { size: 16, weight: 600, align: 'center' });
    }
    const aa = ang(ALARM);
    line(ctx, WX + Math.cos(aa) * (MR - 16), MY + 8 + Math.sin(aa) * (MR - 16), WX + Math.cos(aa) * MR, MY + 8 + Math.sin(aa) * MR, PAL.ink, 2, [4, 4]);
    const shown = pick.mix((v) => current(v)), na = ang(shown);
    line(ctx, WX, MY + 8, WX + Math.cos(na) * (MR - 20), MY + 8 + Math.sin(na) * (MR - 20), cc, 4);
    F.dot(ctx, WX, MY + 8, PAL.ink, true, 6);
    text(ctx, '$\\times 10^{-10}$ A', WX, MY + 38, cc, { size: 16, weight: 600, align: 'center', tex: true });
    F.label(ctx, 'alarm mark', WX + Math.cos(aa) * MR, MY + 8 + Math.sin(aa) * MR, { side: 'left', gap: 40, size: 18 });
    hits.push({ x: WX, y: MY, r: MR, name: `the meter: ${sci(shown).replace(' \\times 10^{', ' × 10^').replace('}', '')} A` });
    /* the alarm, sounding below its mark */
    const AY = 540, on = I < ALARM;
    ctx.save(); ctx.fillStyle = on ? PAL.ink : PAL.panel; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2.5; ctx.beginPath();
    ctx.moveTo(WX - 30, AY - 10); ctx.lineTo(WX - 16, AY - 10); ctx.lineTo(WX, AY - 24); ctx.lineTo(WX, AY + 24); ctx.lineTo(WX - 16, AY + 10); ctx.lineTo(WX - 30, AY + 10); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore();
    if (on) [16, 30, 44].forEach((rr, i) => {
      const ph = (now * 2 + i / 3) % 1;
      ctx.save(); ctx.strokeStyle = alpha(PAL.ink, 0.8 - 0.6 * ph); ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(WX + 4, AY, rr + 6 * ph, -0.6, 0.6); ctx.stroke(); ctx.restore();
    });
    text(ctx, on ? 'alarm sounding' : 'alarm', WX - 46, AY, PAL.ink, { size: 20, weight: on ? 600 : 400, align: 'right' });
    hits.push({ x: WX - 10, y: AY, r: 30, name: on ? 'the alarm, sounding' : 'the alarm, silent' });
    /* the legend */
    const ly = H - 26;
    alphaP(ctx, 30, ly);
    let lx = 48; text(ctx, 'α particle', lx, ly, PAL.ink, { size: 19 }); lx += measure(ctx, 'α particle', { size: 19 }) + 34;
    [['N', '$\\text{N}_{2}^{+}$'], ['O', '$\\text{O}_{2}^{+}$']].forEach(([k, s]) => {
      const c = F.el(k); disc(ctx, lx, ly, 7, c); disc(ctx, lx + 11, ly, 7, c);
      text(ctx, s, lx + 26, ly, PAL.ink, { size: 19, tex: true }); lx += 26 + measure(ctx, s, { size: 19, tex: true }) + 30;
    });
    disc(ctx, lx, ly, 5, F.el('e-')); text(ctx, 'electron', lx + 14, ly, PAL.ink, { size: 19 }); lx += 14 + measure(ctx, 'electron', { size: 19 }) + 30;
    smokeBlob(ctx, { x: lx + 4, y: ly, r: 9 }); text(ctx, 'smoke particle', lx + 22, ly, PAL.ink, { size: 19 });
    ro.set(`\\kI = \\frac{\\kQ}{\\kt} = \\frac{${hue('charge', Qs + '\\ \\text{C}')}}{${hue('time', P.toFixed(2) + '\\ \\text{s}')}} = ${hue('current', Is + '\\ \\text{A}')}`, 'Each ion drawn stands for 10⁸ ions.');
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();
};
