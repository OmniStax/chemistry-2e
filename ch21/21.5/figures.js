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

/* a nucleus: nineteen nucleons packed in a disc of radius r; an excited one wears a dashed ring */
function nucleus(ctx, x, y, r, excited) {
  const q = r * 0.25, pr = F.el('p+'), ne = F.el('n0');
  for (let k = 0; k < 12; k++) disc(ctx, x + Math.cos((k * TAU) / 12) * r * 0.76, y + Math.sin((k * TAU) / 12) * r * 0.76, q, k % 2 ? pr : ne);
  for (let k = 0; k < 6; k++) disc(ctx, x + Math.cos((k + 0.5) * TAU / 6) * r * 0.4, y + Math.sin((k + 0.5) * TAU / 6) * r * 0.4, q, k % 2 ? ne : pr);
  disc(ctx, x, y, q, pr);
  if (excited) { ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2.5; ctx.setLineDash([6, 6]); ctx.beginPath(); ctx.arc(x, y, r + 7, 0, TAU); ctx.stroke(); ctx.restore(); }
}
const clamp = (v) => Math.max(0, Math.min(1, v));
const ease = (k) => k * k * (3 - 2 * k);
const lerp = (a, b, k) => a + (b - a) * k;

/* =====================================================================
   FIGURE 21.26: the head of a cobalt-60 machine swinging its γ beam
   through an arc round an axial slice of the patient's head (face up,
   on the headrest), the beam always crossing the target at the centre
   of the swing. The clock is the treatment, 10.0 min for one sweep
   (2 min of model time a second), then a hold. Each cell of the head
   is shaded by the time it has spent in the beam: a cell at distance r
   from the target and bearing a is in a beam of width w while the
   gantry angle is within asin(w / 2r) of a or of a + π, so its time is
   the overlap of those windows with the arc swept so far, over the
   arc. Three points on the line from the middle of the arc to the
   target (the skin, halfway in, the target) are timed; the bars give
   each one's time now (solid) and by the end (pale), axis fixed at 0
   to 10 min. The head is drawn 20 logical units to the centimetre; the
   machine's swing is drawn close in, not to that scale.
===================================================================== */
(function () {
  const H = 724, d = sim('sim-gantry', H);
  const O = { x: 420, y: 412 }, HC = { x: O.x - 30, y: O.y + 6 }, RX = 142, RY = 172, RG = 262, U = 20, TT = 10, FAR = 226;
  const cy = cycle(() => TT, 1.2);
  const arc = F.ctl(d.controls, { label: '\\text{arc}', cls: 'angle', key: 'arc', min: 0, max: 340, step: 5, value: 120, unit: '°', dec: 0,
    aria: 'the arc the gantry swings through', onInput: () => cy.reset() });
  const wid = F.ctl(d.controls, { label: '\\text{beam width}', cls: 'length', key: 'width', min: 1, max: 4, step: 0.1, value: 2, unit: 'cm', dec: 1,
    aria: 'the width of the beam', onInput: () => cy.reset() });
  const SKIN = { x: O.x, y: HC.y - RY * Math.sqrt(1 - ((O.x - HC.x) / RX) ** 2) }, MID = { x: O.x, y: (SKIN.y + O.y) / 2 };
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
  function share(p, th, s, w) {
    const dx = p.x - O.x, dy = p.y - O.y, r = Math.hypot(dx, dy);
    if (r <= w / 2) return s;
    const a = Math.atan2(dx, -dy);
    if (th < 1e-6) return Math.abs(r * Math.sin(a)) < w / 2 ? s : 0;
    const h = Math.asin(w / (2 * r)), lo = -th / 2, hi = lo + th * s;
    return (overlap(lo, hi, a, h) + overlap(lo, hi, a + Math.PI, h)) / th;
  }
  const minutes = (m) => m.toFixed(1);
  const PTS = [['skin', SKIN, 'the skin under the middle of the arc'], ['halfway in', MID, 'the brain halfway to the target'], ['target', O, 'the target, a tumor']];
  let hits = [];
  F.hover(d.stage, () => hits);
  const ro = F.readout(d);
  let lastRo = '';
  function housing(ctx, w, G) {
    ctx.fillStyle = PAL.soft; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2.5; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.moveTo(-34, 6); ctx.lineTo(-w / 2 - 7, 34); ctx.lineTo(w / 2 + 7, 34); ctx.lineTo(34, 6); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.roundRect(-52, -44, 104, 52, 12); ctx.fill(); ctx.stroke();
    ctx.fillStyle = alpha(G, 0.9); ctx.beginPath(); ctx.arc(0, -18, 11, 0, TAU); ctx.fill(); ctx.stroke();
  }
  function draw() {
    const { ctx } = begin(d.c), now = cy.now(), s = now / TT, th = (arc.v * Math.PI) / 180, w = wid.v * U;
    const phi = -th / 2 + th * s, ux = Math.sin(phi), uy = -Math.cos(phi), G = F.el('gamma'), tc = C('time');
    const fin = PTS.map(([, p]) => share(p, th, 1, w) * TT), live = PTS.map(([, p]) => share(p, th, s, w) * TT);
    topline(ctx, arc.v === 0
      ? `Held still, the beam stays on the skin for the whole ${minutes(TT)} min, as long as on the target.`
      : `Swung through ${arc.v}°, the beam is on the skin for ${minutes(fin[0])} min and on the target for all ${minutes(TT)} min.`);
    hits = [];
    /* the headrest, then the head in axial section: skin, nose and ears, the skull, the brain */
    ctx.save(); ctx.fillStyle = PAL.soft; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.roundRect(HC.x - 72, HC.y + RY + 3, 144, 15, 6); ctx.fill(); ctx.stroke(); ctx.restore();
    ctx.save(); ctx.fillStyle = PAL.panel; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.lineJoin = 'round';
    [-1, 1].forEach((k) => { ctx.beginPath(); ctx.ellipse(HC.x + k * (RX + 2), HC.y + 14, 11, 27, 0, 0, TAU); ctx.fill(); ctx.stroke(); });
    ctx.beginPath(); ctx.moveTo(HC.x - 20, HC.y - RY + 4); ctx.quadraticCurveTo(HC.x, HC.y - RY - 34, HC.x + 20, HC.y - RY + 4); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(HC.x, HC.y, RX, RY, 0, 0, TAU); ctx.fill(); ctx.restore();
    ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.13); ctx.beginPath(); ctx.ellipse(HC.x, HC.y, RX * 0.93, RY * 0.94, 0, 0, TAU); ctx.ellipse(HC.x, HC.y, RX * 0.84, RY * 0.87, 0, 0, TAU); ctx.fill('evenodd'); ctx.restore();
    /* the time each part of the head has spent in the beam */
    const g = grid.getContext('2d');
    g.clearRect(0, 0, grid.width, grid.height);
    for (const [x, y] of cells) {
      const v = share({ x: x + CELL / 2, y: y + CELL / 2 }, th, s, w);
      if (v > 0.002) { g.fillStyle = alpha(tc, 0.06 + 0.7 * v); g.fillRect((x - X0) / CELL, (y - Y0) / CELL, 1, 1); }
    }
    ctx.save(); ctx.beginPath(); ctx.ellipse(HC.x, HC.y, RX, RY, 0, 0, TAU); ctx.clip();
    ctx.imageSmoothingEnabled = true; ctx.drawImage(grid, X0 - CELL / 2, Y0 - CELL / 2, grid.width * CELL, grid.height * CELL); ctx.restore();
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(HC.x, HC.y, RX, RY, 0, 0, TAU); ctx.stroke();
    ctx.strokeStyle = alpha(PAL.ink, 0.45); ctx.lineWidth = 1.5;
    [[0.93, 0.94], [0.84, 0.87]].forEach(([a, b]) => { ctx.beginPath(); ctx.ellipse(HC.x, HC.y, RX * a, RY * b, 0, 0, TAU); ctx.stroke(); });
    ctx.restore();
    /* the target and the two points timed on the way in to it */
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2.5; ctx.fillStyle = alpha(PAL.ink, 0.3); ctx.beginPath(); ctx.arc(O.x, O.y, 15, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore();
    F.dot(ctx, SKIN.x, SKIN.y, PAL.ink, false, 7); F.dot(ctx, MID.x, MID.y, PAL.ink, false, 7);
    /* the gantry's path, the arc it swings through drawn solid */
    ctx.save(); ctx.strokeStyle = alpha(PAL.ink, 0.3); ctx.lineWidth = 2; ctx.setLineDash([6, 8]); ctx.beginPath(); ctx.arc(O.x, O.y, RG, 0, TAU); ctx.stroke(); ctx.restore();
    if (th > 0) {
      ctx.save(); ctx.strokeStyle = alpha(C('angle'), 0.9); ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath();
      ctx.arc(O.x, O.y, RG, -Math.PI / 2 - th / 2, -Math.PI / 2 + th / 2); ctx.stroke(); ctx.restore();
    }
    /* the beam, from the machine's head through the target and out the far side */
    const S = { x: O.x + ux * RG, y: O.y + uy * RG }, E = { x: O.x - ux * FAR, y: O.y - uy * FAR }, nx = -uy, ny = ux, hw = w / 2;
    const S0 = { x: S.x - ux * 34, y: S.y - uy * 34 };
    ctx.save(); ctx.fillStyle = alpha(G, 0.18); ctx.beginPath();
    ctx.moveTo(S0.x + nx * hw, S0.y + ny * hw); ctx.lineTo(E.x + nx * hw, E.y + ny * hw); ctx.lineTo(E.x - nx * hw, E.y - ny * hw); ctx.lineTo(S0.x - nx * hw, S0.y - ny * hw); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = alpha(G, 0.6); ctx.lineWidth = 1.5; ctx.stroke(); ctx.restore();
    /* γ rays travelling down the beam */
    const LB = RG - 34 + FAR, GAP = 96, run = now * 210;
    for (let k = 0; k < Math.ceil(LB / GAP) + 1; k++) {
      [-0.45, 0.45].forEach((f, j) => {
        const q = (((run + k * GAP + j * GAP / 2) % LB) + LB) % LB;
        if (q > LB - 44) return;
        const x0 = S0.x - ux * q + nx * f * hw, y0 = S0.y - uy * q + ny * f * hw;
        wavy(ctx, x0, y0, x0 - ux * 44, y0 - uy * 44, G, 4, 14, 2.5);
      });
    }
    ctx.save(); ctx.translate(S.x, S.y); ctx.rotate(phi); housing(ctx, w, G); ctx.restore();
    hits.push({ x: S.x, y: S.y, r: 52, name: 'the machine’s head, with the cobalt-60 source inside its shield' });
    hits.push({ x: (O.x + E.x) / 2, y: (O.y + E.y) / 2, r: 30, name: 'the beam of γ rays' });
    hits.push({ x: HC.x - 90, y: HC.y + 60, r: 60, name: 'the patient’s head in cross-section, face up' }, { x: HC.x, y: HC.y + RY + 10, r: 22, name: 'the headrest of the table' });
    PTS.forEach(([n, p, long], i) => hits.push({ x: p.x, y: p.y, r: 16, name: `${long}: ${minutes(live[i])} min in the beam so far` }));
    F.label(ctx, 'skin', SKIN.x, SKIN.y, { side: 'right', gap: 84, size: 21 });
    F.label(ctx, 'halfway in', MID.x, MID.y, { side: 'right', gap: 84, size: 21 });
    F.label(ctx, 'target', O.x, O.y, { side: 'right', gap: 84, size: 21 });
    /* the bars: time in the beam so far (solid) and by the end (pale), 0 to 10 min */
    const B = { l: 950, r: 1340, t: 196, b: 500 }, Y = (m) => B.b - (m / TT) * (B.b - B.t);
    text(ctx, 'time in the beam (min)', B.l - 34, B.t - 62, tc, { size: 21, weight: 600 });
    for (let m = 0; m <= TT; m += 2) {
      line(ctx, B.l, Y(m), B.r, Y(m), alpha(PAL.ink, m ? 0.12 : 0.6), m ? 1.5 : 2.5);
      text(ctx, String(m), B.l - 12, Y(m), PAL.muted, { size: 17, align: 'right' });
    }
    line(ctx, B.l, B.t - 10, B.l, B.b, PAL.muted, 2.5);
    PTS.forEach(([name], i) => {
      const x = 1030 + i * 120;
      ctx.save(); ctx.fillStyle = alpha(tc, 0.22); ctx.fillRect(x - 40, Y(fin[i]), 80, B.b - Y(fin[i]));
      ctx.fillStyle = alpha(tc, 0.85); ctx.fillRect(x - 40, Y(live[i]), 80, B.b - Y(live[i])); ctx.restore();
      text(ctx, `${minutes(fin[i])} min`, x, Y(fin[i]) - 18, tc, { size: 20, weight: 600, align: 'center' });
      text(ctx, name, x, B.b + 26, PAL.ink, { size: 21, align: 'center' });
      hits.push({ x, y: (Y(fin[i]) + B.b) / 2, r: 44, name: `${name}: ${minutes(live[i])} min so far, ${minutes(fin[i])} min by the end` });
    });
    F.legend(ctx, { l: 926, r: 1380, t: 566, b: 716 }, [
      { s: 'cobalt-60 source', draw: (c, x, y) => { c.save(); c.translate(x, y + 3); c.scale(0.36, 0.36); housing(c, 40, G); c.restore(); } },
      { s: 'γ rays', draw: (c, x, y) => wavy(c, x - 22, y, x + 22, y, G, 4, 13, 2.5) },
      { ramp: [alpha(tc, 0.06), alpha(tc, 0.76)], ends: ['0', `${TT} min`], s: 'time in the beam' },
    ], { corner: 'tl', panel: false, size: 19 });
    const rt = arc.v === 0
      ? `\\frac{\\kt_{\\text{skin}}}{\\kt_{\\text{target}}} = \\frac{${hue('time', `${minutes(TT)}\\ \\text{min}`)}}{${hue('time', `${minutes(TT)}\\ \\text{min}`)}} = 1.00`
      : `\\frac{\\kt_{\\text{skin}}}{\\kt_{\\text{target}}} = \\frac{${hue('time', `${minutes(fin[0])}\\ \\text{min}`)}}{${hue('time', `${minutes(TT)}\\ \\text{min}`)}} = ${(+minutes(fin[0]) / TT).toFixed(2)}`;
    if (rt !== lastRo) { lastRo = rt; ro.set(rt); }
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 2), draw });
})();

/* =====================================================================
   FIGURE 21.27: the decay scheme of cobalt-60 on an energy axis, 140
   logical units to the MeV, played. Co-60 (2.82 MeV above Ni-60's
   ground state) β-decays to Ni-60's level at 2.5057 MeV (0.31 MeV,
   99.88%) or at 1.3325 MeV (1.48 MeV, 0.12%), and the nickel nucleus
   falls to its ground state by γ rays of 1.1732 MeV and 1.3325 MeV.
   The choice picks the route; the nucleus rides it over a 6 s clock,
   each particle flies off as it leaves, and the column under the
   cobalt level grows by the energy given off, one segment a particle.
===================================================================== */
(function () {
  const H = 660, d = sim('sim-co60-decay', H);
  const AX = 96, Y0 = 566, K = 140, Y = (e) => Y0 - e * K, T = 6, DUR = 1.0, R = 26;
  const E0 = 2.8157, E1 = 2.5057, E2 = 1.3325;
  const CO = { l: 150, r: 420 }, NI = { l: 660, r: 1040 }, AS = CO.r - 30, AE = NI.l + 40, GX = 830;
  const ROUTES = {
    main: { steps: [{ k: 'b', mev: '0.31', from: E0, to: E1, t0: 0.7 }, { k: 'g', mev: '1.1732', from: E1, to: E2, t0: 2.5 }, { k: 'g', mev: '1.3325', from: E2, to: 0, t0: 4.3 }], sum: '2.82' },
    rare: { steps: [{ k: 'b', mev: '1.48', from: E0, to: E2, t0: 0.7 }, { k: 'g', mev: '1.3325', from: E2, to: 0, t0: 3.2 }], sum: '2.81' },
  };
  const cy = cycle(() => T, 1.2);
  const pick = F.choice(d.controls, { label: '\\text{route}', key: 'route', options: [{ value: 'main', label: '99.88% of decays' }, { value: 'rare', label: '0.12% of decays' }], value: 'main',
    aria: 'the route the decay takes', onInput: () => cy.reset() });
  const ro = F.readout(d);
  let lastRo = '', hits = [];
  F.hover(d.stage, () => hits);
  /* where the nucleus is at time t: its x, its energy, and how far along each step it is */
  function state(route, t) {
    let x = AS, e = E0;
    const fr = route.steps.map((s) => ease(clamp((t - s.t0) / DUR)));
    route.steps.forEach((s, i) => {
      if (fr[i] <= 0) return;
      e = lerp(s.from, s.to, fr[i]);
      if (s.k === 'b') x = lerp(lerp(AS, AE, fr[i]), GX, ease(clamp((t - s.t0 - DUR) / 0.6)));
    });
    return { x, e, fr };
  }
  function draw() {
    const { ctx } = begin(d.c), key = pick.value, route = ROUTES[key], now = cy.now(), ec = C('energy'), be = F.el('e-'), G = F.el('gamma');
    const st = state(route, now);
    hits = [];
    topline(ctx, key === 'main'
      ? 'In 99.88% of decays a 0.31 MeV β particle leaves nickel-60 excited, and the nickel gives off two γ rays on its way down.'
      : 'In 0.12% of decays the β particle carries 1.48 MeV, and the nickel gives off only the 1.3325 MeV γ ray.');
    /* the energy axis */
    line(ctx, AX, Y(0) + 6, AX, Y(3.1), PAL.muted, 2.5);
    for (let e = 0; e <= 3; e++) {
      line(ctx, AX - 8, Y(e), AX, Y(e), PAL.muted, 2.5);
      text(ctx, String(e), AX - 16, Y(e), PAL.muted, { size: 17, align: 'right' });
    }
    text(ctx, 'E (MeV)', AX - 40, Y(3.1) - 20, ec, { size: 21, weight: 600 });
    /* the column of energy given off, hanging from cobalt's level down to the level the nucleus is at */
    const BL = 170, BR = 226;
    route.steps.forEach((s, i) => {
      if (st.fr[i] <= 0) return;
      const yb = Y(lerp(s.from, s.to, st.fr[i]));
      ctx.save(); ctx.fillStyle = alpha(ec, 0.3 + 0.18 * (i % 2)); ctx.fillRect(BL, Y(s.from), BR - BL, yb - Y(s.from)); ctx.restore();
      line(ctx, BL, yb, BR, yb, ec, 2.5);
      F.faded(ctx, clamp(st.fr[i] * 2.5), [0, 0], () => F.rich(ctx, [s.k === 'b' ? 'β  ' : 'γ  ', [`${s.mev} MeV`, ec, 600]], BR + 12, (Y(s.from) + Y(s.to)) / 2, { size: 20 }));
    });
    if (st.e < E0 - 0.01) line(ctx, BR, Y(st.e), st.x - R - 8, Y(st.e), alpha(PAL.ink, 0.3), 2, [4, 8]);
    text(ctx, 'energy given off', BL - 10, Y0 + 34, ec, { size: 20, weight: 600 });
    hits.push({ x: (BL + BR) / 2, y: (Y(E0) + Y(st.e)) / 2, r: 34, name: `energy given off so far: ${(E0 - st.e).toFixed(2)} MeV` });
    /* the levels */
    line(ctx, CO.l, Y(E0), CO.r, Y(E0), PAL.ink, 5);
    text(ctx, '${}^{60}_{27}\\text{Co}$', CO.l, Y(E0) - 30, PAL.ink, { size: 28, tex: true });
    text(ctx, '5.272 a', CO.l + 86, Y(E0) - 26, C('time'), { size: 21, weight: 600 });
    hits.push({ x: CO.l + 110, y: Y(E0) - 26, r: 44, name: 'cobalt-60, half-life 5.272 a (years)' });
    [[E1, 'excited ⁶⁰Ni  ', '2.5057 MeV'], [E2, 'excited ⁶⁰Ni  ', '1.3325 MeV'], [0, '⁶⁰Ni in its ground state', '']].forEach(([e, name, val]) => {
      line(ctx, NI.l, Y(e), NI.r, Y(e), PAL.ink, 5);
      F.rich(ctx, [name, [val, ec, 600]], NI.r + 16, Y(e), { size: 20 });
      hits.push({ x: (NI.l + NI.r) / 2 + 100, y: Y(e), r: 30, name: e ? `nickel-60 in an excited state, ${e.toFixed(4)} MeV above its ground state` : 'nickel-60 in its ground state, stable' });
    });
    text(ctx, '${}^{60}_{28}\\text{Ni}$', NI.l - 78, Y(0), PAL.ink, { size: 28, tex: true });
    /* the scheme's arrows; the route not taken is pale */
    const lit = (r) => (key === r ? 1 : 0.3);
    const beta = (e1, mev, pct, lx, ly, a) => F.faded(ctx, a, [0, 0], () => {
      F.arrow(ctx, AS, Y(E0), AE, Y(e1), PAL.ink, 3);
      F.rich(ctx, [[`${mev} MeV`, ec, 600], `  β   ${pct}`], lx, ly, { size: 20 });
    });
    beta(E1, '0.31', '99.88%', 520, Y(E0) + 76, lit('main'));
    beta(E2, '1.48', '0.12%', 392, Y(E2) - 62, lit('rare'));
    const gam = (a, b, mev, f) => F.faded(ctx, f, [0, 0], () => {
      wavy(ctx, GX, Y(a) + 5, GX, Y(b) - 5, G, 6, 20, 3);
      F.rich(ctx, [[`${mev} MeV`, ec, 600], '  γ'], GX + 22, (Y(a) + Y(b)) / 2 + 44, { size: 20 });
    });
    gam(E1, E2, '1.1732', lit('main')); gam(E2, 0, '1.3325', 1);
    /* the particles that have left, in flight */
    route.steps.forEach((s) => {
      const t = now - (s.t0 + 0.4 * DUR), FLY = 1.5;
      if (t < 0 || t > FLY) return;
      const at = state(route, s.t0 + 0.4 * DUR), k = t / FLY, x = at.x + 30 + k * (s.k === 'b' ? 640 : 500), y = s.k === 'b' ? Y(E0) - 22 : Y(at.e) - R - 4, fade = clamp((1 - k) * 4);
      F.faded(ctx, fade, [0, 0], () => {
        if (s.k === 'b') { line(ctx, x - 46, y, x - 8, y, alpha(PAL.ink, 0.35), 2); disc(ctx, x, y, 9, be); } else wavy(ctx, x - 62, y, x, y, G, 6, 16, 3);
        F.rich(ctx, [s.k === 'b' ? 'β  ' : 'γ  ', [`${s.mev} MeV`, ec, 600]], x - 40, y - 26, { size: 19 });
      });
      if (fade > 0.5) hits.push({ x: x - 20, y, r: 26, name: s.k === 'b' ? 'a β particle, an electron from the nucleus' : 'a γ ray, a photon' });
    });
    /* the nucleus, riding the route */
    const isCo = st.fr[0] < 0.5, exc = !isCo && st.e > 0.005;
    nucleus(ctx, st.x, Y(st.e) - R - 4, R, exc);
    hits.push({ x: st.x, y: Y(st.e) - R - 4, r: R + 8, name: isCo ? 'a cobalt-60 nucleus' : exc ? 'a nickel-60 nucleus in an excited state' : 'a nickel-60 nucleus in its ground state' });
    F.legend(ctx, { l: 420, r: 1384, t: Y0 + 30, b: H - 6 }, [
      { s: 'nucleus', draw: (c, x, y) => nucleus(c, x, y, 10, false) },
      { s: 'excited nucleus', draw: (c, x, y) => { nucleus(c, x, y, 7, false); c.save(); c.strokeStyle = PAL.ink; c.lineWidth = 2; c.setLineDash([4, 4]); c.beginPath(); c.arc(x, y, 11, 0, TAU); c.stroke(); c.restore(); } },
      { s: 'β particle', draw: (c, x, y) => disc(c, x, y, 8, be) },
      { s: 'γ ray', draw: (c, x, y) => wavy(c, x - 22, y, x + 22, y, G, 4, 13, 2.5) },
    ], { corner: 'tr', row: true, panel: false, size: 20 });
    const terms = route.steps.map((s) => hue('energy', `${s.mev}\\ \\text{MeV}`)).join(' + ');
    const rt = `\\kE = ${terms} = ${hue('energy', `${route.sum}\\ \\text{MeV}`)}`;
    if (rt !== lastRo) { lastRo = rt; ro.set(rt, 'Both routes end at the same level, so they give off the same energy; the printed values are rounded.', { form: key }); }
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();

/* =====================================================================
   FIGURE 21.29: the ionization chamber of a smoke detector, cut open.
   Every 6.00 s (a loop that repeats seamlessly) americium-241 under the
   hole in the negative plate sends 18 α particles up into the air, at
   700 units a second between 16° and 42° off the vertical; each leaves three ion
   pairs along its track. The positive ions (N2+ four times in five,
   O2+ otherwise) drift down to the negative plate at 120 units a second
   and the electrons up to the positive plate at 340: the way the
   battery's field drives them (the book's drawing has the arrows the
   other way). The slider puts 0 to 24 smoke particles in the chamber,
   in a fixed order; an ion whose path meets one is caught there and
   fades. The charge Q is that of the positive ions reaching the
   negative plate in one loop, each ion drawn standing for 1e8, and
   I = Q / t. The meter reads 0 to 2e-10 A; the alarm sounds below its
   mark at 1.0e-10 A. Electrons in the wire move at a speed in
   proportion to the current.
===================================================================== */
(function () {
  const H = 650, d = sim('sim-smoke', H);
  const P = 6, NA = 18, NS = 24, SCALE = 1e8, QE = 1.602e-19, ALARM = 1e-10, IMAX = 2e-10;
  const CL = 70, CR = 860, CT = 112, CB = 540, WALL = 14, PL = 112, PR = 818, TOP = 176, BOT = 452, PT = 14, HOLE = 465, HW = 28, SY = 474;
  const VA = 700, VP = 120, VE = 340, RI = 10;
  const smoke = F.ctl(d.controls, { label: '\\text{smoke}', cls: '', key: 'smoke', min: 0, max: NS, step: 1, value: 0, dec: 0, fmt: (v) => `${v} ${v === 1 ? 'particle' : 'particles'}`,
    aria: 'the number of smoke particles in the chamber' });
  const cy = cycle(() => P, 0);
  const r = rng(90);
  /* the α particles and the ion pairs they leave, fixed once */
  const EVENTS = Array.from({ length: NA }, (_, k) => {
    const te = ((k + 0.15 + 0.7 * r()) * P) / NA, a = (k % 2 ? 1 : -1) * (16 + 26 * ((((k >> 1) * 4) % 9) + r()) / 9) * Math.PI / 180;
    const len = Math.min(250 + 70 * r(), (SY - TOP - 34) / Math.cos(a));
    const pairs = [0.36, 0.6, 0.84].map((f0) => {
      const f = f0 + (r() - 0.5) * 0.1;
      return { x: HOLE + Math.sin(a) * len * f, y: SY - Math.cos(a) * len * f, t: te + (len * f) / VA, kind: r() < 0.8 ? 'N' : 'O' };
    });
    return { te, a, len, pairs };
  });
  /* the smoke particles: none touching, spread over the air the ions cross */
  const POOL = [];
  for (let tries = 0; POOL.length < NS && tries < 20000; tries++) {
    const b = { x: 230 + r() * 470, y: TOP + 50 + r() * (BOT - TOP - 95), r: 17 + r() * 6 };
    if (POOL.every((o) => Math.hypot(o.x - b.x, o.y - b.y) > o.r + b.r + 8)) POOL.push(b);
  }
  /* where an ion moving straight up or down from (x, y) first meets one of the smoke particles of list, or null */
  function catcher(list, x, y, down) {
    let best = null;
    for (const b of list) {
      const dx = Math.abs(b.x - x), reach = b.r + RI;
      if (dx >= reach) continue;
      const yc = down ? b.y - Math.sqrt(reach * reach - dx * dx) : b.y + Math.sqrt(reach * reach - dx * dx);
      if (down ? yc <= y : yc >= y) continue;
      if (best === null || (down ? yc < best : yc > best)) best = yc;
    }
    return best;
  }
  function trace(list) {
    const out = [];
    for (const ev of EVENTS) for (const p of ev.pairs) [[true, VP, BOT - RI - 2], [false, VE, TOP + 8]].forEach(([down, v, end]) => {
      const c = catcher(list, p.x, p.y, down), stop = c ?? end;
      out.push({ x: p.x, y0: p.y, y1: stop, t0: p.t, t1: p.t + Math.abs(stop - p.y) / v, caught: c !== null, pos: down, kind: p.kind });
    });
    return out;
  }
  const count = (list) => trace(list).filter((q) => q.pos && !q.caught).length;
  /* the order the slider adds them in: each next particle the one that keeps the ions arriving nearest a steady fall to a third */
  const SMOKE = [], N0 = count([]);
  while (POOL.length) {
    const want = N0 * (1 - (2 / 3) * (SMOKE.length + 1) / NS);
    let bi = 0, bd = Infinity;
    POOL.forEach((b, i) => { const dv = Math.abs(count([...SMOKE, b]) - want); if (dv < bd) { bd = dv; bi = i; } });
    SMOKE.push(POOL.splice(bi, 1)[0]);
  }
  const memo = {};
  const paths = (n) => memo[n] || (memo[n] = trace(SMOKE.slice(0, n)));
  const arrived = (n) => paths(n).filter((q) => q.pos && !q.caught).length;
  const ALL = arrived(0);
  /* an α particle: two protons and two neutrons */
  function alphaP(ctx, x, y, s = 6) {
    const pr = F.el('p+'), ne = F.el('n0'), o = s * 0.82;
    disc(ctx, x - o, y - o, s, ne); disc(ctx, x + o, y - o, s, pr); disc(ctx, x - o, y + o, s, pr); disc(ctx, x + o, y + o, s, ne);
  }
  function ion(ctx, x, y, kind) {
    const c = F.el(kind);
    disc(ctx, x - 8, y, RI, c); disc(ctx, x + 8, y, RI, c);
    text(ctx, '+', x + 23, y - 11, PAL.ink, { size: 20, weight: 600, align: 'center' });
  }
  const electron = (ctx, x, y) => disc(ctx, x, y, 6, F.el('e-'));
  function smokeBlob(ctx, b) {
    ctx.save(); ctx.fillStyle = alpha(PAL.muted, 0.55);
    [[0, 0, 1], [0.55, -0.3, 0.62], [-0.5, 0.35, 0.64], [0.3, 0.5, 0.52], [-0.35, -0.5, 0.5]].forEach(([dx, dy, k]) => { ctx.beginPath(); ctx.arc(b.x + dx * b.r, b.y + dy * b.r, b.r * k, 0, TAU); ctx.fill(); });
    ctx.restore();
  }
  /* the wire, as the three runs the electrons take: positive plate to the battery, battery to the meter, meter to the negative plate */
  const BX = 930, BY = 300, BW = 120, BH = 120, TP = BX + 30, TM = BX + 90, MX = 1230, MY = 262, MR = 84, WR = 1352;
  const RUNS = [[[PR, TOP - PT / 2], [TP, TOP - PT / 2], [TP, BY - 14]], [[TM, BY - 14], [TM, MY], [MX - MR, MY]], [[MX + MR, MY], [WR, MY], [WR, BOT + PT / 2], [PR, BOT + PT / 2]]];
  const along = (pts, s) => {
    for (let i = 1; i < pts.length; i++) {
      const L = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
      if (s <= L) return [lerp(pts[i - 1][0], pts[i][0], s / L), lerp(pts[i - 1][1], pts[i][1], s / L)];
      s -= L;
    }
    return null;
  };
  let hits = [], flow = 0, shown = arrived(0);
  F.hover(d.stage, () => hits);
  const ro = F.readout(d);
  let lastRo = '';
  function draw() {
    const { ctx } = begin(d.c), now = cy.now(), n = Math.round(smoke.v), cc = C('current');
    hits = [];
    const got = arrived(n), Q = +(got * SCALE * QE).toPrecision(3), Qs = sci(Q), I = Q / P, Is = sci(I), on = I < ALARM;
    topline(ctx, n === 0
      ? `With no smoke, all ${ALL} ions drawn reach the negative plate and $${Is}$ A flows.`
      : `Smoke catches ${ALL - got} of the ${ALL} ions, and the current is $${Is}$ A, ${on ? 'below the alarm’s mark' : 'still above the alarm’s mark'}.`);
    /* the chamber's can, cut open, with slots that let the air in */
    ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.04); ctx.fillRect(CL, CT, CR - CL, CB - CT);
    ctx.fillStyle = PAL.soft; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2;
    const wall = (x, y, w, h) => { ctx.beginPath(); ctx.rect(x, y, w, h); ctx.fill(); ctx.stroke(); };
    wall(CL, CT, CR - CL, WALL); wall(CL, CB - WALL, CR - CL, WALL);
    [[CT + WALL, 232], [262, 322], [352, 412], [442, CB - WALL]].forEach(([a, b]) => { wall(CL, a, WALL, b - a); wall(CR - WALL, a, WALL, b - a); });
    ctx.restore();
    hits.push({ x: CL + 7, y: 337, r: 30, name: 'a slot that lets air and smoke into the chamber' }, { x: CR - 7, y: 337, r: 30, name: 'a slot that lets air and smoke into the chamber' });
    /* the two metal plates, the lower with the hole over the source */
    ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.6);
    ctx.fillRect(PL, TOP - PT, PR - PL, PT);
    ctx.fillRect(PL, BOT, HOLE - HW - PL, PT); ctx.fillRect(HOLE + HW, BOT, PR - HOLE - HW, PT);
    ctx.restore();
    text(ctx, 'metal plate, positive (+)', PL, TOP - PT - 20, PAL.ink, { size: 20 });
    text(ctx, 'metal plate, negative (−)', PL, BOT + PT + 26, PAL.ink, { size: 20 });
    hits.push({ x: 640, y: TOP - 7, r: 18, name: 'the positive plate' }, { x: 640, y: BOT + 7, r: 18, name: 'the negative plate' });
    /* the americium source under the hole */
    ctx.save(); ctx.fillStyle = PAL.soft; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2; ctx.beginPath(); ctx.roundRect(HOLE - 58, SY, 116, 24, 5); ctx.fill(); ctx.stroke();
    ctx.fillStyle = alpha(PAL.ink, 0.6); ctx.fillRect(HOLE - 30, SY - 4, 60, 6); ctx.restore();
    F.label(ctx, 'americium-241 source', HOLE + 58, SY + 12, { side: 'right', gap: 22, size: 20 });
    hits.push({ x: HOLE, y: SY + 10, r: 40, name: 'the americium-241 source, an α emitter' });
    /* smoke, then the moving particles */
    for (let i = 0; i < n; i++) { smokeBlob(ctx, SMOKE[i]); hits.push({ x: SMOKE[i].x, y: SMOKE[i].y, r: SMOKE[i].r, name: 'a smoke particle' }); }
    for (const ev of EVENTS) for (const shift of [0, -P]) {
      const t = now - (ev.te + shift), L = VA * t;
      if (t < 0 || L > ev.len + 60) continue;
      const s = Math.min(L, ev.len), x = HOLE + Math.sin(ev.a) * s, y = SY - Math.cos(ev.a) * s, tail = Math.max(0, s - 90);
      const fade = L > ev.len ? 1 - (L - ev.len) / 60 : 1;
      F.faded(ctx, fade, [0, 0], () => {
        line(ctx, HOLE + Math.sin(ev.a) * tail, SY - Math.cos(ev.a) * tail, x, y, alpha(PAL.ink, 0.4), 2.5);
        alphaP(ctx, x, y);
      });
      if (fade > 0.5) hits.push({ x, y, r: 16, name: 'an α particle' });
    }
    for (const q of paths(n)) for (const shift of [0, -P]) {
      const t = now - (q.t0 + shift), dur = q.t1 - q.t0;
      if (t < 0 || t > dur + 0.6) continue;
      const k = Math.min(1, t / (dur || 1)), y = q.y0 + (q.y1 - q.y0) * k, fade = t > dur ? 1 - (t - dur) / 0.6 : 1;
      F.faded(ctx, Math.min(1, fade * (q.caught ? 1 : 2)) * Math.min(1, t / 0.12), [0, 0], () => { if (q.pos) ion(ctx, q.x, y, q.kind); else electron(ctx, q.x, y); });
      if (fade > 0.5) hits.push({ x: q.x, y, r: 16, name: q.pos ? (q.kind === 'N' ? 'a nitrogen ion, N₂⁺, drifting to the negative plate' : 'an oxygen ion, O₂⁺, drifting to the negative plate') : 'an electron, drifting to the positive plate' });
    }
    /* the circuit: the battery and the meter in one loop with the plates, electrons moving round it */
    RUNS.forEach((pts) => { for (let i = 1; i < pts.length; i++) line(ctx, pts[i - 1][0], pts[i - 1][1], pts[i][0], pts[i][1], PAL.ink, 3); });
    RUNS.forEach((pts) => { for (let s = ((flow % 64) + 64) % 64; ; s += 64) { const p = along(pts, s); if (!p) break; electron(ctx, p[0], p[1]); } });
    hits.push({ x: 890, y: TOP - 7, r: 22, name: 'the wire: electrons leave the positive plate for the battery' }, { x: 1100, y: BOT + 7, r: 22, name: 'the wire: electrons reach the negative plate from the battery' });
    ctx.save(); ctx.fillStyle = PAL.soft; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2.5;
    [TP, TM].forEach((x) => { ctx.beginPath(); ctx.roundRect(x - 11, BY - 14, 22, 16, 3); ctx.fill(); ctx.stroke(); });
    ctx.beginPath(); ctx.roundRect(BX, BY, BW, BH, 8); ctx.fill(); ctx.stroke(); ctx.restore();
    text(ctx, '+', TP, BY + 22, PAL.ink, { size: 24, weight: 600, align: 'center' });
    text(ctx, '−', TM, BY + 22, PAL.ink, { size: 24, weight: 600, align: 'center' });
    text(ctx, 'battery', BX + BW / 2, BY + 76, PAL.ink, { size: 21, align: 'center' });
    hits.push({ x: BX + BW / 2, y: BY + BH / 2, r: 60, name: 'the battery, which keeps one plate positive and the other negative' });
    /* the meter, 0 to 2 × 10⁻¹⁰ A over a 180° dial, the alarm's mark at 1.0 */
    const PY = MY + 14, ang = (i) => Math.PI + (Math.min(i, IMAX) / IMAX) * Math.PI;
    ctx.save(); ctx.fillStyle = PAL.panel; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(MX, MY, MR, 0, TAU); ctx.fill(); ctx.stroke();
    ctx.strokeStyle = alpha(PAL.ink, 0.22); ctx.lineWidth = 9; ctx.beginPath(); ctx.arc(MX, PY, MR - 22, ang(0), ang(ALARM)); ctx.stroke(); ctx.restore();
    for (let i = 0; i <= 4; i++) {
      const a = ang(i * 0.5e-10), c = Math.cos(a), s = Math.sin(a);
      line(ctx, MX + c * (MR - 28), PY + s * (MR - 28), MX + c * (MR - 14), PY + s * (MR - 14), PAL.muted, 2.5);
      if (i % 2 === 0) text(ctx, String(i / 2), MX + c * (MR - 42), PY + s * (MR - 42) + (i === 2 ? 6 : 0), cc, { size: 18, weight: 600, align: 'center' });
    }
    const na = ang((shown * SCALE * QE) / P);
    line(ctx, MX, PY, MX + Math.cos(na) * (MR - 16), PY + Math.sin(na) * (MR - 16), cc, 4);
    F.dot(ctx, MX, PY, PAL.ink, true, 6);
    text(ctx, '$\\times 10^{-10}$ A', MX, PY + 36, cc, { size: 17, weight: 600, align: 'center', tex: true });
    F.label(ctx, 'alarm below this mark', MX, MY - MR, { side: 'above', gap: 30, size: 19 });
    hits.push({ x: MX, y: MY, r: MR, name: `the meter: ${sci((shown * SCALE * QE) / P).replace(' \\times 10^{', ' × 10^').replace('}', '')} A` });
    /* the alarm, sounding below its mark */
    const AX = 1106, AY = 384;
    ctx.save(); ctx.fillStyle = on ? PAL.ink : PAL.panel; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2.5; ctx.lineJoin = 'round'; ctx.beginPath();
    ctx.moveTo(AX - 32, AY - 11); ctx.lineTo(AX - 16, AY - 11); ctx.lineTo(AX + 2, AY - 28); ctx.lineTo(AX + 2, AY + 28); ctx.lineTo(AX - 16, AY + 11); ctx.lineTo(AX - 32, AY + 11); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore();
    if (on) [18, 34, 50].forEach((rr, i) => {
      const ph = (now * 2 + i / 3) % 1;
      ctx.save(); ctx.strokeStyle = alpha(PAL.ink, 0.8 - 0.6 * ph); ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(AX + 6, AY, rr + 6 * ph, -0.6, 0.6); ctx.stroke(); ctx.restore();
    });
    text(ctx, on ? 'alarm sounding' : 'alarm, silent', AX + 72, AY, PAL.ink, { size: 20, weight: on ? 600 : 400 });
    hits.push({ x: AX - 10, y: AY, r: 34, name: on ? 'the alarm, sounding' : 'the alarm, silent' });
    F.legend(ctx, { l: 58, r: 1100, t: CB + 30, b: H - 8 }, [
      { s: 'α particle', draw: (c, x, y) => alphaP(c, x, y, 5) },
      { s: '$\\text{N}_{2}^{+}$', draw: (c, x, y) => { disc(c, x - 7, y, 8, F.el('N')); disc(c, x + 7, y, 8, F.el('N')); } },
      { s: '$\\text{O}_{2}^{+}$', draw: (c, x, y) => { disc(c, x - 7, y, 8, F.el('O')); disc(c, x + 7, y, 8, F.el('O')); } },
      { s: 'electron', draw: (c, x, y) => electron(c, x, y) },
      { s: 'smoke particle', draw: (c, x, y) => smokeBlob(c, { x, y, r: 10 }) },
    ], { corner: 'tl', row: true, panel: false, size: 20 });
    const rt = `\\kI = \\frac{\\kQ}{\\kt} = \\frac{${hue('charge', Qs + '\\ \\text{C}')}}{${hue('time', P.toFixed(2) + '\\ \\text{s}')}} = ${hue('current', Is + '\\ \\text{A}')}`;
    if (rt !== lastRo) { lastRo = rt; ro.set(rt, 'Each ion drawn stands for 10⁸ ions.'); }
  }
  register(d.fig, {
    update: (dt) => {
      cy.step(dt, () => 1);
      const got = arrived(Math.round(smoke.v));
      shown += (got - shown) * Math.min(1, dt * 5); flow += dt * 70 * (shown / ALL);
    },
    draw,
  });
})();
};
