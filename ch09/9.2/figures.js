/* Figures for section 9.2 Relating Pressure, Volume, Amount, and Temperature: The Ideal Gas Law. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['9.2'] = function (root, F) {
const { el, fmt, tex, C, PAL, alpha, ctl, cycle, register, begin, line, arrow, dot, text, topline, hbracket, axes, pinned } = F;
const sim = (id, H) => F.sim(root, id, H);
function readout(host, main, small) { tex(host, main); if (small) host.appendChild(el('small', null, small)); }

/* ---------- small helpers shared by the figures ---------- */
const TAU = 2 * Math.PI;
const R = 0.08206;                                   /* L atm mol⁻¹ K⁻¹, the value the book uses with atm, L and K */
const RTEX = '0.08206\\ \\text{L atm mol}^{-1}\\ \\text{K}^{-1}';
/* three significant figures, never in exponent form */
const sig3 = (x) => { const s = Math.abs(x).toPrecision(3); return s.includes('e') ? String(Math.round(Number(s))) : s; };
/* a live number wrapped in the hue of its type, for the readouts */
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;
/* a slider whose value is a name rather than a number: the name replaces the printed value */
function named(controls, o, names) {
  const c = ctl(controls, { ...o, unit: '', dec: 0, onInput: () => { show(); o.onInput?.(); } });
  const val = controls.lastElementChild.querySelector('.ctl-val');
  const show = () => { val.textContent = names[c.v]; };
  show(); return c;
}
/* a pressure gauge: a dial centred on (x, y) of radius r, reading `value` on a scale 0..max in the pressure hue; the needle pegs at the end of the scale */
function gauge(ctx, x, y, r, value, max, unit) {
  const cp = C('pressure'), a0 = 0.75 * Math.PI, a1 = 2.25 * Math.PI, f = Math.min(1, Math.max(0, value / max));
  ctx.save(); ctx.fillStyle = PAL.panel; ctx.strokeStyle = cp; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore();
  for (let i = 0; i <= 10; i++) { const a = a0 + ((a1 - a0) * i) / 10, big = i % 5 === 0; line(ctx, x + (r - (big ? 16 : 9)) * Math.cos(a), y + (r - (big ? 16 : 9)) * Math.sin(a), x + (r - 4) * Math.cos(a), y + (r - 4) * Math.sin(a), cp, big ? 2.5 : 1.5); if (big) text(ctx, String((max * i) / 10), x + (r - 30) * Math.cos(a), y + (r - 30) * Math.sin(a), cp, { size: 14, align: 'center' }); }
  const a = a0 + (a1 - a0) * f;
  ctx.save(); ctx.strokeStyle = cp; ctx.fillStyle = cp; ctx.lineWidth = 3.5; ctx.beginPath(); ctx.moveTo(x - 10 * Math.cos(a), y - 10 * Math.sin(a)); ctx.lineTo(x + (r - 14) * Math.cos(a), y + (r - 14) * Math.sin(a)); ctx.stroke(); ctx.beginPath(); ctx.arc(x, y, 5, 0, TAU); ctx.fill(); ctx.restore();
  text(ctx, unit, x, y + r * 0.55, cp, { size: 14, align: 'center' });
}
/* ---------- a gas of particles in ink ----------
   Each particle keeps a position and a unit direction; its speed is set from the temperature every step, so that speed tracks
   temperature, and every strike on a wall is counted, so that the count beside the gauge is an honest measure of what the
   gauge reads. `inside` keeps the particle in the vessel and returns the wall normal where it left it, or null. */
function particles() {
  const g = { p: [], hits: 0, t: 0, rate: 0 };
  g.fill = (N, spawn) => { while (g.p.length < N) g.p.push(spawn()); if (g.p.length > N) g.p.length = N; };
  g.step = (dt, speed, inside) => {
    let hits = 0;
    for (const q of g.p) {
      q.x += q.ux * speed * dt; q.y += q.uy * speed * dt;
      const n = inside(q);
      if (n) { const d = q.ux * n[0] + q.uy * n[1]; if (d < 0) { q.ux -= 2 * d * n[0]; q.uy -= 2 * d * n[1]; } hits++; }
    }
    g.hits += hits; g.t += dt; if (g.t >= 1) { g.rate = Math.round(g.hits / g.t); g.hits = 0; g.t = 0; }
  };
  g.draw = (ctx, r) => { ctx.save(); ctx.fillStyle = PAL.ink; for (const q of g.p) { ctx.beginPath(); ctx.arc(q.x, q.y, r, 0, TAU); ctx.fill(); } ctx.restore(); };
  return g;
}
const heading = () => { const a = Math.random() * TAU; return { ux: Math.cos(a), uy: Math.sin(a) }; };
/* the speed of a drawn particle, in logical units per second, rising as the square root of the kelvin temperature */
const speedOf = (T) => 10 * Math.sqrt(T);
/* a hot plate under a vessel: a slab in ink with a glow in the temperature hue that brightens with the temperature */
function hotplate(ctx, x, y, w, T, lo, hi) {
  const ct = C('temperature'), k = Math.max(0, Math.min(1, (T - lo) / (hi - lo)));
  ctx.save(); ctx.fillStyle = alpha(ct, 0.08 + 0.55 * k); ctx.beginPath(); ctx.ellipse(x, y, w * 0.34, 14, 0, 0, TAU); ctx.fill(); ctx.restore();
  ctx.save(); ctx.fillStyle = PAL.soft; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.fillRect(x - w / 2, y + 6, w, 36); ctx.strokeRect(x - w / 2, y + 6, w, 36); ctx.restore();
  ctx.save(); ctx.strokeStyle = ct; ctx.lineWidth = 2.5; ctx.setLineDash([]); ctx.globalAlpha = 0.25 + 0.75 * k;
  for (let i = -1; i <= 1; i++) { const sx = x + i * 60; ctx.beginPath(); ctx.moveTo(sx, y - 8); ctx.quadraticCurveTo(sx + 10, y - 22, sx, y - 36); ctx.quadraticCurveTo(sx - 10, y - 50, sx, y - 62); ctx.stroke(); }
  ctx.restore();
}

/* =====================================================================
   FIGURE 9.10: the sealed sphere over a hot plate. The particles inside
   travel and quicken as the sphere warms, and the gauge on its neck reads
   nRT/V for the fixed litre it holds. Moving: the particles are what the
   gauge reads, so the figure runs continuously and carries the transport
   without a scrubber.
===================================================================== */
(function () {
  const d = sim('sim-amontons-sphere', 560);
  const T = ctl(d.controls, { label: '\\kT', cls: 'temperature', min: 150, max: 600, step: 1, value: 298, unit: 'K', dec: 0, aria: 'temperature of the gas in kelvin' });
  const N = ctl(d.controls, { label: '\\kn', cls: 'amount', min: 0.25, max: 2, step: 0.05, value: 1, unit: 'mol', dec: 2, aria: 'amount of gas in moles' });
  const V = 1.0;                                            /* the sphere holds one litre and cannot change */
  const CX = 450, CY = 345, RS = 96;                         /* the sphere */
  const g = particles();
  const spawn = () => { const a = Math.random() * TAU, rr = Math.sqrt(Math.random()) * (RS - 12); return { x: CX + rr * Math.cos(a), y: CY + rr * Math.sin(a), ...heading() }; };
  const inside = (q) => { const dx = q.x - CX, dy = q.y - CY, dd = Math.hypot(dx, dy), lim = RS - 8; if (dd < lim) return null; q.x = CX + (dx / dd) * lim; q.y = CY + (dy / dd) * lim; return [-dx / dd, -dy / dd]; };
  const cy = cycle(() => Infinity, 0);
  function draw() {
    const { ctx } = begin(d.c);
    const t = T.v, n = N.v, P = (n * R * t) / V, cp = C('pressure'), ct = C('temperature'), ca = C('amount');
    g.fill(Math.round(n * 20), spawn);
    /* the hot plate, the beaker and the bath */
    hotplate(ctx, CX, 486, 420, t, 150, 600);
    const bl = 300, br = 600, bt = 215, bb = 470;
    ctx.save(); ctx.fillStyle = alpha(ct, 0.1 + 0.25 * Math.min(1, (t - 150) / 450)); ctx.fillRect(bl + 3, bt + 70, br - bl - 6, bb - bt - 73); ctx.restore();
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(bl, bt - 6); ctx.lineTo(bl, bb); ctx.lineTo(br, bb); ctx.lineTo(br, bt - 6); ctx.stroke(); ctx.restore();
    line(ctx, bl + 3, bt + 70, br - 3, bt + 70, ct, 2);
    if (t >= 373) for (let i = 0; i < 9; i++) { const bx = bl + 30 + ((i * 67) % (br - bl - 60)), by = bt + 90 + ((i * 53) % 120); dot(ctx, bx, by, ct, false, 4); }
    if (t > 330) { ctx.save(); ctx.strokeStyle = alpha(ct, 0.6); ctx.lineWidth = 2; for (let i = 0; i < 4; i++) { const sx = bl + 40 + i * 60; ctx.beginPath(); ctx.moveTo(sx, bt + 58); ctx.quadraticCurveTo(sx + 8, bt + 40, sx, bt + 22); ctx.quadraticCurveTo(sx - 8, bt + 4, sx, bt - 14); ctx.stroke(); } ctx.restore(); }
    text(ctx, 'bath', br + 14, bb - 20, ct, { size: 17 });
    /* the sphere, its neck and the gas inside */
    ctx.save(); ctx.fillStyle = PAL.panel; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3.5; ctx.beginPath(); ctx.arc(CX, CY, RS, 0, TAU); ctx.fill(); ctx.stroke();
    ctx.fillRect(CX - 12, 190, 24, CY - RS - 190 + 6); ctx.strokeRect(CX - 12, 190, 24, CY - RS - 190 + 6); ctx.restore();
    g.draw(ctx, 5.5);
    gauge(ctx, CX, 138, 50, P, 100, 'atm');
    text(ctx, fmt(P, 1) + ' atm', CX + 66, 138, cp, { size: 22, weight: 600 });
    /* the readings, and the ratio that does not change, on the right */
    const rx = 880;
    text(ctx, 'held constant', rx, 150, PAL.muted, { size: 17 });
    text(ctx, 'V = ' + fmt(V, 2) + ' L, the sealed sphere', rx, 182, C('volume'), { size: 22, weight: 600 });
    text(ctx, 'n = ' + fmt(n, 2) + ' mol, ' + g.p.length + ' particles drawn', rx, 214, ca, { size: 22, weight: 600 });
    text(ctx, 'T = ' + t + ' K, the bath', rx, 246, ct, { size: 22, weight: 600 });
    text(ctx, 'read on the gauge', rx, 290, PAL.muted, { size: 17 });
    text(ctx, 'P = ' + fmt(P, 1) + ' atm at T = ' + t + ' K', rx, 322, PAL.ink, { size: 22, weight: 600 });
    text(ctx, 'P / T = ' + fmt(P / t, 4) + ' atm/K', rx, 354, PAL.ink, { size: 22, weight: 600 });
    text(ctx, 'about ' + g.rate + ' strikes on the wall each second', rx, 400, PAL.muted, { size: 17 });
    text(ctx, 'the particles move ' + fmt(Math.sqrt(t / 298), 2) + ' times as fast as at 298 K', rx, 428, PAL.muted, { size: 17 });
    topline(ctx, 'At ' + t + ' K the gauge reads ' + fmt(P, 1) + ' atm; the ratio P/T stays at ' + fmt(P / t, 4) + ' atm/K for this filling of the sphere.');
    readout(d.readout, `\\frac{\\kP}{\\kT} = \\frac{${hue('pressure', fmt(P, 1) + '\\ \\text{atm}')}}{${hue('temperature', t + '\\ \\text{K}')}} = ${fmt(P / t, 4)}\\ \\text{atm/K} = \\frac{\\kn R}{\\kV}`,
      'The sphere is rigid and sealed, so the volume and the amount of gas cannot change; doubling the kelvin temperature to ' + 2 * t + ' K would double the pressure to ' + fmt(2 * P, 1) + ' atm.');
  }
  register(d.fig, { update: (dt) => { cy.step(dt, () => 1); g.step(dt, speedOf(T.v), inside); }, draw });
})();

/* =====================================================================
   FIGURE 9.11: the pressure of a sample of air against its temperature at
   constant volume, the book's six measurements as a table and a graph,
   the line through them extrapolated to absolute zero. Still: two states
   on one line answer their sliders.
===================================================================== */
(function () {
  const d = sim('sim-amontons-graph', 560);
  const T1 = ctl(d.controls, { label: '\\kTone', cls: 'temperature', min: 100, max: 500, step: 1, value: 273, unit: 'K', dec: 0, aria: 'first temperature in kelvin' });
  const T2 = ctl(d.controls, { label: '\\kTtwo', cls: 'temperature', min: 100, max: 500, step: 1, value: 373, unit: 'K', dec: 0, aria: 'second temperature in kelvin' });
  const DATA = [[-100, 173, 36.0], [-50, 223, 46.4], [0, 273, 56.7], [50, 323, 67.1], [100, 373, 77.5], [150, 423, 88.0]];
  const K = DATA.reduce((s, r) => s + r[1] * r[2], 0) / DATA.reduce((s, r) => s + r[1] * r[1], 0);   /* the line through the origin that fits the data, 0.208 kPa/K */
  const P = (t) => K * t;
  function draw() {
    const { ctx } = begin(d.c);
    const t1 = T1.v, t2 = T2.v, p1 = P(t1), p2 = P(t2), cp = C('pressure'), ct = C('temperature');
    /* the book's table on the left */
    const tx = [110, 265, 415], ty = 130;
    text(ctx, 'Temperature', tx[0], ty, PAL.ink, { size: 17, weight: 600, align: 'center' }); text(ctx, '(°C)', tx[0], ty + 22, PAL.ink, { size: 15, align: 'center' });
    text(ctx, 'Temperature', tx[1], ty, ct, { size: 17, weight: 600, align: 'center' }); text(ctx, '(K)', tx[1], ty + 22, ct, { size: 15, align: 'center' });
    text(ctx, 'Pressure', tx[2], ty, cp, { size: 17, weight: 600, align: 'center' }); text(ctx, '(kPa)', tx[2], ty + 22, cp, { size: 15, align: 'center' });
    line(ctx, 50, ty + 40, 480, ty + 40, PAL.muted, 2);
    DATA.forEach((r, i) => { const y = ty + 76 + i * 40; text(ctx, String(r[0]).replace('-', '−'), tx[0], y, PAL.ink, { size: 18, align: 'center' }); text(ctx, String(r[1]), tx[1], y, ct, { size: 18, align: 'center' }); text(ctx, fmt(r[2], 1), tx[2], y, cp, { size: 18, align: 'center' }); });
    text(ctx, 'air at constant volume', 265, ty + 76 + DATA.length * 40 + 4, PAL.muted, { size: 16, align: 'center' });
    /* the graph: 0 to 500 K by 100, 0 to 100 kPa by 20, fixed from the slider range and the data */
    const box = { l: 640, r: 1320, t: 110, b: 460 };
    const g = axes(ctx, box, [0, 500], [0, 100], { xl: 'Temperature (K)', xc: ct, yl: 'Pressure (kPa)', yc: cp, nx: 5, ny: 5 });
    line(ctx, g.X(0), g.Y(0), g.X(173), g.Y(P(173)), cp, 3, [10, 10]);
    line(ctx, g.X(423), g.Y(P(423)), g.X(480), g.Y(P(480)), cp, 3, [10, 10]);
    line(ctx, g.X(173), g.Y(P(173)), g.X(423), g.Y(P(423)), cp, 5);
    DATA.forEach((r) => dot(ctx, g.X(r[1]), g.Y(r[2]), cp, true, 7));
    dot(ctx, g.X(0), g.Y(0), PAL.ink, false, 9);
    text(ctx, 'absolute zero, 0 K (−273 °C)', g.X(0) + 18, g.Y(0) - 22, PAL.ink, { size: 16, weight: 600 });
    text(ctx, 'no measurements below 173 K: the air condenses', g.X(60), g.Y(70), PAL.muted, { size: 15 });
    /* the two states, the first hollow and the second filled */
    for (const [t, p, filled, lab] of [[t1, p1, false, '1'], [t2, p2, true, '2']]) {
      line(ctx, g.X(t), box.b, g.X(t), g.Y(p), ct, 2, [4, 8]); line(ctx, box.l, g.Y(p), g.X(t), g.Y(p), cp, 2, [4, 8]);
      dot(ctx, g.X(t), g.Y(p), cp, filled, 10);
      text(ctx, 'P' + lab + ' = ' + fmt(p, 1) + ' kPa', g.X(t) + (t > 420 ? -16 : 16), g.Y(p) - 20, cp, { size: 17, weight: 600, align: t > 420 ? 'right' : 'left', bg: PAL.panel });
    }
    topline(ctx, 'At ' + t1 + ' K the line gives ' + fmt(p1, 1) + ' kPa and at ' + t2 + ' K ' + fmt(p2, 1) + ' kPa; P/T is ' + fmt(K, 3) + ' kPa/K at both.');
    readout(d.readout, `\\frac{\\kPone}{\\kTone} = \\frac{${hue('pressure', fmt(p1, 1) + '\\ \\text{kPa}')}}{${hue('temperature', t1 + '\\ \\text{K}')}} = \\frac{\\kPtwo}{\\kTtwo} = \\frac{${hue('pressure', fmt(p2, 1) + '\\ \\text{kPa}')}}{${hue('temperature', t2 + '\\ \\text{K}')}} = ${fmt(K, 3)}\\ \\text{kPa/K}`,
      t1 === t2 ? 'The two states are the same point on the line.' : 'The kelvin temperature is ' + fmt(t2 / t1, 2) + ' times as great in the second state, and so is the pressure; the same change written in degrees Celsius, from ' + (t1 - 273) + ' °C to ' + (t2 - 273) + ' °C, is no simple ratio at all.');
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 9.12: the volume of one mole of methane at 1 atm against its
   temperature, the book's five measurements as a table and a graph, the
   line stopping at 111 K where methane liquefies and extrapolated to the
   origin. Still: two states on one line answer their sliders.
===================================================================== */
(function () {
  const d = sim('sim-charles-graph', 560);
  const T1 = ctl(d.controls, { label: '\\kTone', cls: 'temperature', min: 111, max: 500, step: 1, value: 283, unit: 'K', dec: 0, aria: 'first temperature in kelvin' });
  const T2 = ctl(d.controls, { label: '\\kTtwo', cls: 'temperature', min: 111, max: 500, step: 1, value: 303, unit: 'K', dec: 0, aria: 'second temperature in kelvin' });
  const DATA = [[-100, 173, 14.10], [-50, 223, 18.26], [0, 273, 22.40], [100, 373, 30.65], [200, 473, 38.88]];
  const K = DATA.reduce((s, r) => s + r[1] * r[2], 0) / DATA.reduce((s, r) => s + r[1] * r[1], 0);   /* the line through the origin that fits the data, 0.0821 L/K */
  const Vof = (t) => K * t;
  function draw() {
    const { ctx } = begin(d.c);
    const t1 = T1.v, t2 = T2.v, v1 = Vof(t1), v2 = Vof(t2), cv = C('volume'), ct = C('temperature');
    const tx = [110, 265, 415], ty = 130;
    text(ctx, 'Temperature', tx[0], ty, PAL.ink, { size: 17, weight: 600, align: 'center' }); text(ctx, '(°C)', tx[0], ty + 22, PAL.ink, { size: 15, align: 'center' });
    text(ctx, 'Temperature', tx[1], ty, ct, { size: 17, weight: 600, align: 'center' }); text(ctx, '(K)', tx[1], ty + 22, ct, { size: 15, align: 'center' });
    text(ctx, 'Volume', tx[2], ty, cv, { size: 17, weight: 600, align: 'center' }); text(ctx, '(L)', tx[2], ty + 22, cv, { size: 15, align: 'center' });
    line(ctx, 50, ty + 40, 480, ty + 40, PAL.muted, 2);
    DATA.forEach((r, i) => { const y = ty + 76 + i * 40; text(ctx, String(r[0]).replace('-', '−'), tx[0], y, PAL.ink, { size: 18, align: 'center' }); text(ctx, String(r[1]), tx[1], y, ct, { size: 18, align: 'center' }); text(ctx, fmt(r[2], 2), tx[2], y, cv, { size: 18, align: 'center' }); });
    text(ctx, '1 mol of methane at 1 atm', 265, ty + 76 + DATA.length * 40 + 4, PAL.muted, { size: 16, align: 'center' });
    /* the graph: 0 to 500 K by 100, 0 to 50 L by 10, fixed from the slider range and the data */
    const box = { l: 640, r: 1320, t: 110, b: 460 };
    const g = axes(ctx, box, [0, 500], [0, 50], { xl: 'Temperature (K)', xc: ct, yl: 'Volume (L)', yc: cv, nx: 5, ny: 5 });
    line(ctx, g.X(0), g.Y(0), g.X(111), g.Y(Vof(111)), cv, 3, [10, 10]);
    line(ctx, g.X(473), g.Y(Vof(473)), g.X(500), g.Y(Vof(500)), cv, 3, [10, 10]);
    line(ctx, g.X(111), g.Y(Vof(111)), g.X(473), g.Y(Vof(473)), cv, 5);
    DATA.forEach((r) => dot(ctx, g.X(r[1]), g.Y(r[2]), cv, true, 7));
    dot(ctx, g.X(0), g.Y(0), PAL.ink, false, 9);
    text(ctx, 'absolute zero, 0 K', g.X(0) + 18, g.Y(0) - 22, PAL.ink, { size: 16, weight: 600 });
    line(ctx, g.X(111), box.b, g.X(111), g.Y(Vof(111)), alpha(PAL.ink, 0.35), 2, [4, 8]);
    text(ctx, 'the line stops at 111 K, where methane liquefies', g.X(120), g.Y(44), PAL.muted, { size: 15 });
    for (const [t, v, filled, lab] of [[t1, v1, false, '1'], [t2, v2, true, '2']]) {
      line(ctx, g.X(t), box.b, g.X(t), g.Y(v), ct, 2, [4, 8]); line(ctx, box.l, g.Y(v), g.X(t), g.Y(v), cv, 2, [4, 8]);
      dot(ctx, g.X(t), g.Y(v), cv, filled, 10);
      const left = t > 420 || (lab === '1' && Math.abs(t2 - t1) < 50 && t2 >= t1) || (lab === '2' && Math.abs(t2 - t1) < 50 && t2 < t1);
      text(ctx, 'V' + lab + ' = ' + fmt(v, 1) + ' L', g.X(t) + (left ? -16 : 16), g.Y(v) - 20, cv, { size: 17, weight: 600, align: left ? 'right' : 'left', bg: PAL.panel });
    }
    topline(ctx, 'At ' + t1 + ' K the line gives ' + fmt(v1, 1) + ' L and at ' + t2 + ' K ' + fmt(v2, 1) + ' L; V/T is ' + fmt(K, 4) + ' L/K at both.');
    readout(d.readout, `\\frac{\\kVone}{\\kTone} = \\frac{${hue('volume', fmt(v1, 2) + '\\ \\text{L}')}}{${hue('temperature', t1 + '\\ \\text{K}')}} = \\frac{\\kVtwo}{\\kTtwo} = \\frac{${hue('volume', fmt(v2, 2) + '\\ \\text{L}')}}{${hue('temperature', t2 + '\\ \\text{K}')}} = ${fmt(K, 4)}\\ \\text{L/K}`,
      'Warming the mole of methane from ' + t1 + ' K to ' + t2 + ' K at 1 atm changes its volume by the factor ' + fmt(t2 / t1, 3) + ', the same factor as the kelvin temperature; extrapolated below 111 K, the line reaches zero volume at absolute zero.');
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 9.13 + 9.14: the syringe with its gauge, and the two graphs the
   book draws beside it and then alone. The plunger sits at the second
   volume with the first drawn dashed; the pressure is PV = 195 psi·mL
   from the book's data. Still: the plunger answers its sliders.
===================================================================== */
(function () {
  const d = sim('sim-boyle', 800);
  const V1 = ctl(d.controls, { label: '\\kVone', cls: 'volume', min: 5, max: 30, step: 0.1, value: 15, unit: 'mL', dec: 1, aria: 'volume before the plunger is moved' });
  const V2 = ctl(d.controls, { label: '\\kVtwo', cls: 'volume', min: 5, max: 30, step: 0.1, value: 7.5, unit: 'mL', dec: 1, aria: 'volume after the plunger is moved' });
  const K = 13.0 * 15.0;                                     /* psi·mL, the product the book's sample keeps: 13.0 psi at 15.0 mL */
  const DATA = [[5, 39.0], [10, 19.5], [15, 13.0], [20, 9.8], [25, 7.8], [30, 6.5]];
  const P = (v) => K / v;
  function draw() {
    const { ctx } = begin(d.c);
    const v1 = V1.v, v2 = V2.v, p1 = P(v1), p2 = P(v2), cv = C('volume'), cp = C('pressure');
    /* the syringe across the top: the tip at the left with the gauge on it, the barrel marked in millilitres, the plunger from the right */
    const X = (mL) => 330 + mL * 22, yc = 200, hh = 40;
    gauge(ctx, 150, yc, 66, p2, 40, 'psi');
    text(ctx, fmt(p2, 1) + ' psi', 150, yc + 96, cp, { size: 20, weight: 600, align: 'center' });
    line(ctx, 216, yc, 300, yc, PAL.ink, 8);
    ctx.save(); ctx.fillStyle = alpha(cv, 0.28); ctx.fillRect(X(0), yc - hh + 3, X(v2) - X(0), 2 * hh - 6); ctx.restore();
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3.5; ctx.strokeRect(X(0) - 30, yc - hh, X(32) - X(0) + 30, 2 * hh); ctx.restore();
    for (let m = 0; m <= 30; m += 1) { const big = m % 5 === 0; line(ctx, X(m), yc + hh, X(m), yc + hh - (big ? 18 : 9), PAL.ink, big ? 2 : 1.2); if (big && m) text(ctx, String(m), X(m), yc + hh + 22, PAL.ink, { size: 16, align: 'center' }); }
    text(ctx, 'mL', X(31.5), yc + hh + 22, PAL.muted, { size: 15, align: 'center' });
    /* the plunger at V2, and the first position dashed */
    ctx.save(); ctx.fillStyle = PAL.ink; ctx.fillRect(X(v2), yc - hh + 4, 12, 2 * hh - 8); ctx.fillRect(X(v2) + 12, yc - 7, X(34) - X(v2), 14); ctx.fillRect(X(34), yc - 30, 14, 60); ctx.restore();
    line(ctx, X(v1), yc - hh + 4, X(v1), yc + hh - 4, cv, 3, [6, 6]);
    text(ctx, 'V₁ = ' + fmt(v1, 1) + ' mL', X(v1), yc - hh - 20, cv, { size: 18, weight: 600, align: 'center', bg: PAL.panel });
    text(ctx, 'V₂ = ' + fmt(v2, 1) + ' mL', X(v2), yc - hh - (Math.abs(v2 - v1) < 4.5 ? 48 : 20), cv, { size: 18, weight: 600, align: 'center', bg: PAL.panel });
    text(ctx, 'gas', X(v2 / 2), yc, PAL.ink, { size: 16, align: 'center' });
    /* P against V: 0 to 35 mL by 5, 0 to 40 psi by 10, fixed from the slider range and the data */
    const bl = { l: 150, r: 630, t: 380, b: 700 };
    const gl = axes(ctx, bl, [0, 35], [0, 40], { xl: 'V (mL)', xc: cv, yl: 'P (psi)', yc: cp, nx: 7, ny: 4 });
    ctx.save(); ctx.strokeStyle = cp; ctx.lineWidth = 4; ctx.beginPath(); for (let i = 0; i <= 100; i++) { const v = 4.9 + (30.1 * i) / 100; const x = gl.X(v), y = gl.Y(P(v)); if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y); } ctx.stroke(); ctx.restore();
    DATA.forEach(([v, p]) => dot(ctx, gl.X(v), gl.Y(p), cp, true, 7));
    text(ctx, 'a hyperbola: PV = ' + fmt(K, 0) + ' psi·mL', gl.X(18), gl.Y(30), PAL.muted, { size: 16 });
    /* 1/P against V: 0 to 35 mL by 5, 0 to 0.18 psi⁻¹ by 0.06 */
    const br = { l: 860, r: 1330, t: 380, b: 700 };
    const gr = axes(ctx, br, [0, 35], [0, 0.18], { xl: 'V (mL)', xc: cv, yl: '1/P (psi⁻¹)', yc: cp, nx: 7, ny: 3, fy: (v) => fmt(v, 2) });
    line(ctx, gr.X(0), gr.Y(0), gr.X(34), gr.Y(34 / K), cp, 4);
    DATA.forEach(([v, p]) => dot(ctx, gr.X(v), gr.Y(1 / p), cp, true, 7));
    text(ctx, 'a straight line through the origin', gr.X(3), gr.Y(0.165), PAL.muted, { size: 16 });
    for (const [v, p, filled] of [[v1, p1, false], [v2, p2, true]]) {
      line(ctx, gl.X(v), bl.b, gl.X(v), gl.Y(p), cv, 2, [4, 8]); line(ctx, bl.l, gl.Y(p), gl.X(v), gl.Y(p), cp, 2, [4, 8]); dot(ctx, gl.X(v), gl.Y(p), cp, filled, 10);
      line(ctx, gr.X(v), br.b, gr.X(v), gr.Y(1 / p), cv, 2, [4, 8]); line(ctx, br.l, gr.Y(1 / p), gr.X(v), gr.Y(1 / p), cp, 2, [4, 8]); dot(ctx, gr.X(v), gr.Y(1 / p), cp, filled, 10);
    }
    text(ctx, 'P₁ = ' + fmt(p1, 1) + ' psi', gl.X(v1) + 14, gl.Y(p1) - 22, cp, { size: 16, weight: 600, bg: PAL.panel });
    text(ctx, 'P₂ = ' + fmt(p2, 1) + ' psi', gl.X(v2) + 14, gl.Y(p2) + (Math.abs(v2 - v1) < 3 ? 26 : -22), cp, { size: 16, weight: 600, bg: PAL.panel });
    const ratio = v1 / v2;
    topline(ctx, 'At ' + fmt(v2, 1) + ' mL the gauge reads ' + fmt(p2, 1) + ' psi; ' + (Math.abs(ratio - 1) < 0.005 ? 'the plunger has not moved, so the pressure is unchanged' : (ratio > 1 ? 'compressing' : 'expanding') + ' the gas from ' + fmt(v1, 1) + ' mL by the factor ' + fmt(Math.max(ratio, 1 / ratio), 2) + ' has ' + (ratio > 1 ? 'raised' : 'lowered') + ' the pressure by the same factor') + '.');
    readout(d.readout, `\\kPone\\kVone = (${hue('pressure', fmt(p1, 1) + '\\ \\text{psi}')})(${hue('volume', fmt(v1, 1) + '\\ \\text{mL}')}) = \\kPtwo\\kVtwo = (${hue('pressure', fmt(p2, 1) + '\\ \\text{psi}')})(${hue('volume', fmt(v2, 1) + '\\ \\text{mL}')}) = ${fmt(K, 0)}\\ \\text{psi·mL}`,
      'The product of pressure and volume is the same at every point of the hyperbola, which is why 1/P against V is a straight line through the origin with slope 1/' + fmt(K, 0) + ' mL⁻¹ psi⁻¹; the temperature and the amount of air are held constant throughout.');
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 9.15: a breath. The diaphragm contracts and flattens, the lungs
   swell, the pressure in them falls below the air outside and air flows
   in; then the reverse. Moving: one loop is one breath, at the rate the
   reader sets, and takes about 4.5 real seconds; the period is finite, so
   the transport carries a scrubber.
===================================================================== */
(function () {
  const d = sim('sim-breathing', 620);
  const TV = ctl(d.controls, { label: '\\text{air per breath}', cls: 'volume', min: 0.3, max: 3, step: 0.1, value: 0.5, unit: 'L', dec: 1, onInput: reset, aria: 'volume of air moved in one breath' });
  const BPM = ctl(d.controls, { label: '\\text{breaths per minute}', cls: '', min: 8, max: 30, step: 1, value: 20, unit: '/min', dec: 0, onInput: reset, aria: 'breaths per minute' });
  const REST = 2.4;                                         /* litres left in the lungs at the end of a quiet breath out */
  const period = () => 60 / BPM.v;
  const cy = cycle(period, 0);
  function reset() { cy.reset(); }
  function draw() {
    const { ctx } = begin(d.c);
    const T = period(), tau = isFinite(cy.now()) ? cy.now() : 0, ph = tau / T, f = (1 - Math.cos(TAU * ph)) / 2;   /* f: 0 at the end of a breath out, 1 at the end of a breath in */
    const V = REST + TV.v * f, dV = Math.sin(TAU * ph), inhaling = dV > 0.05, exhaling = dV < -0.05;
    const cv = C('volume'), cp = C('pressure');
    /* the torso in profile, facing left, in the page colour with an ink outline */
    ctx.save(); ctx.translate(0, 34); ctx.fillStyle = PAL.soft; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3.5; ctx.beginPath();
    ctx.moveTo(300, 600); ctx.lineTo(300, 330); ctx.quadraticCurveTo(300, 250, 380, 225); ctx.lineTo(400, 190);
    ctx.quadraticCurveTo(340, 175, 345, 120); ctx.quadraticCurveTo(360, 60, 430, 62); ctx.quadraticCurveTo(500, 66, 500, 130); ctx.quadraticCurveTo(500, 175, 470, 200);
    ctx.lineTo(480, 230); ctx.quadraticCurveTo(580, 260, 590, 360); ctx.lineTo(590, 600); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore();
    /* the airway from the nose and mouth to the lungs */
    ctx.save(); ctx.translate(0, 34); ctx.strokeStyle = PAL.muted; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(352, 150); ctx.quadraticCurveTo(410, 150, 430, 200); ctx.lineTo(432, 290); ctx.stroke(); ctx.restore();
    /* the lungs, whose drawn size follows the volume they hold */
    const s = Math.cbrt(V / REST), rx = 68 * s, ry = 92 * s, lx = 440, ly = 312 + ry;
    ctx.save(); ctx.fillStyle = alpha(cv, 0.35); ctx.strokeStyle = cv; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(lx, ly, rx, ry, 0, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore();
    text(ctx, fmt(V, 2) + ' L', lx, ly, cv, { size: 22, weight: 600, align: 'center', bg: alpha(PAL.panel, 0.85) });
    /* the diaphragm under the lungs: a dome that flattens as it contracts */
    const dy0 = ly + ry + 4, dome = 56 * (1 - f);
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(310, dy0 + 40); ctx.quadraticCurveTo(lx, dy0 - dome + 16, 585, dy0 + 40); ctx.stroke(); ctx.restore();
    if (inhaling || exhaling) { arrow(ctx, lx + 190, inhaling ? dy0 + 10 : dy0 + 80, lx + 190, inhaling ? dy0 + 80 : dy0 + 10, PAL.ink, 5); }
    text(ctx, inhaling ? 'diaphragm contracts' : exhaling ? 'diaphragm relaxes' : 'diaphragm at rest', lx + 40, dy0 + 88, PAL.ink, { size: 18, weight: 600, align: 'center' });
    /* the air, in through the nose and mouth or out */
    if (inhaling) { arrow(ctx, 240, 166, 340, 184, PAL.ink, 4); arrow(ctx, 230, 209, 340, 194, PAL.ink, 4); }
    if (exhaling) { arrow(ctx, 340, 184, 240, 166, PAL.ink, 4); arrow(ctx, 340, 194, 230, 209, PAL.ink, 4); }
    /* the pressure in the lungs against the air outside, in the book's words */
    const plab = inhaling ? 'P lungs = 1–3 torr lower' : exhaling ? 'P lungs = 1–3 torr higher' : 'P lungs = P outside';
    text(ctx, plab, 60, 274, cp, { size: 20, weight: 600 });
    text(ctx, inhaling ? 'air flows in' : exhaling ? 'air flows out' : 'no flow', 60, 304, PAL.muted, { size: 17 });
    /* the readings on the right */
    const rx0 = 780;
    text(ctx, inhaling ? 'Inspiration' : exhaling ? 'Expiration' : 'Between breaths', rx0, 140, PAL.ink, { size: 24, weight: 600 });
    text(ctx, 'lung volume V = ' + fmt(V, 2) + ' L', rx0, 190, cv, { size: 20, weight: 600 });
    text(ctx, 'of which ' + fmt(V - REST, 2) + ' L is this breath', rx0, 218, PAL.muted, { size: 17 });
    text(ctx, inhaling ? 'a larger volume, so a lower pressure (Boyle’s law)' : exhaling ? 'a smaller volume, so a higher pressure (Boyle’s law)' : 'the volume is not changing, so nothing flows', rx0, 262, cp, { size: 17 });
    text(ctx, BPM.v + ' breaths a minute, one every ' + fmt(T, 1) + ' s', rx0, 320, PAL.ink, { size: 18 });
    text(ctx, 'this breath: ' + fmt(tau, 1) + ' s of ' + fmt(T, 1) + ' s', rx0, 348, PAL.muted, { size: 17 });
    text(ctx, fmt(TV.v * BPM.v, 1) + ' L of air a minute pass through the lungs', rx0, 400, PAL.ink, { size: 18 });
    topline(ctx, inhaling ? 'Breathing in: the diaphragm contracts, the lungs expand to ' + fmt(V, 2) + ' L, the pressure in them falls 1 to 3 torr below the air outside, and air flows in.'
      : exhaling ? 'Breathing out: the diaphragm relaxes, the lungs shrink to ' + fmt(V, 2) + ' L, the pressure in them rises 1 to 3 torr above the air outside, and air flows out.'
      : 'Between breaths the lungs hold ' + fmt(V, 2) + ' L and their pressure matches the air outside, so for a moment nothing flows.');
    readout(d.readout, `\\kV_{\\text{lungs}} = ${hue('volume', fmt(REST, 1) + '\\ \\text{L}')} + ${hue('volume', fmt(V - REST, 2) + '\\ \\text{L}')} = ${hue('volume', fmt(V, 2) + '\\ \\text{L}')} \\qquad \\kP_{\\text{lungs}} ${inhaling ? '<' : exhaling ? '>' : '='} \\kP_{\\text{outside}}${inhaling || exhaling ? '\\ \\text{by 1 to 3 torr}' : ''}`,
      'Air flows from high pressure to low pressure, so a lung that has grown a little is filled by the air outside, and a lung that has shrunk a little empties into it; the difference of a few torr is small beside the 760 torr of the atmosphere, but it is enough.');
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => period() / 4.5), draw });
})();

/* =====================================================================
   SIM: the gas box. A cylinder closed by a piston and read by a gauge,
   with sliders for volume, temperature and amount and the pressure
   computed from the ideal gas law; a fourth control locks the two
   quantities one of the four laws holds constant. Moving: the particles
   travel and strike the walls, so the figure runs continuously and
   carries the transport without a scrubber.
===================================================================== */
(function () {
  const d = sim('sim-gas-box', 600);
  const LAWS = ['free', 'Amontons: V and n held', 'Charles: P and n held', 'Boyle: T and n held', 'Avogadro: P and T held'];
  const Vc = ctl(d.controls, { label: '\\kV', cls: 'volume', min: 1, max: 30, step: 0.1, value: 22.4, unit: 'L', dec: 1, onInput: () => apply('V'), aria: 'volume of the gas in litres' });
  const Tc = ctl(d.controls, { label: '\\kT', cls: 'temperature', min: 100, max: 600, step: 1, value: 273, unit: 'K', dec: 0, onInput: () => apply('T'), aria: 'temperature of the gas in kelvin' });
  const Nc = ctl(d.controls, { label: '\\kn', cls: 'amount', min: 0.2, max: 4, step: 0.05, value: 1, unit: 'mol', dec: 2, onInput: () => apply('n'), aria: 'amount of gas in moles' });
  const Lc = named(d.controls, { label: '\\text{law held}', cls: '', min: 0, max: LAWS.length - 1, step: 1, value: 0, aria: 'the gas law being held', onInput: snapshot }, LAWS);
  const pressure = () => (Nc.v * R * Tc.v) / Vc.v;
  let snap = { V: Vc.v, T: Tc.v, n: Nc.v, P: pressure() };
  function snapshot() { snap = { V: Vc.v, T: Tc.v, n: Nc.v, P: pressure() }; }
  /* the two quantities a law holds constant are put back when a slider moves; where the pressure is held, the piston finds the volume */
  const clampV = (v) => Math.min(30, Math.max(1, v));
  function apply() {
    const law = Lc.v;
    if (law === 1) { Vc.set(snap.V); Nc.set(snap.n); }
    if (law === 2) { Nc.set(snap.n); Vc.set(clampV((Nc.v * R * Tc.v) / snap.P)); }
    if (law === 3) { Tc.set(snap.T); Nc.set(snap.n); }
    if (law === 4) { Tc.set(snap.T); Vc.set(clampV((Nc.v * R * Tc.v) / snap.P)); }
  }
  const BL = 120, BT = 170, BB = 430, width = (V) => 60 + 30 * V;                        /* the cylinder: a fixed height, a width that follows the volume */
  const g = particles();
  const spawn = () => ({ x: BL + 12 + Math.random() * (width(Vc.v) - 24), y: BT + 12 + Math.random() * (BB - BT - 24), ...heading() });
  const inside = (q) => {
    const r = BL + width(Vc.v) - 8, l = BL + 8, t = BT + 8, b = BB - 8; let n = null;
    if (q.x < l) { q.x = l; n = [1, 0]; } else if (q.x > r) { q.x = r; n = [-1, 0]; }
    if (q.y < t) { q.y = t; n = [0, 1]; } else if (q.y > b) { q.y = b; n = [0, -1]; }
    return n;
  };
  const cy = cycle(() => Infinity, 0);
  function draw() {
    const { ctx } = begin(d.c);
    const V = Vc.v, T = Tc.v, n = Nc.v, P = pressure(), law = Lc.v, w = width(V), cv = C('volume'), ct = C('temperature'), cp = C('pressure'), ca = C('amount');
    g.fill(Math.round(n * 15), spawn);
    /* the heat under the cylinder, the gas body, the walls and the piston */
    hotplate(ctx, BL + w / 2, BB + 40, Math.min(w + 40, 1000), T, 100, 600);
    ctx.save(); ctx.fillStyle = alpha(cv, 0.16); ctx.fillRect(BL, BT, w, BB - BT); ctx.restore();
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(BL + w, BT); ctx.lineTo(BL, BT); ctx.lineTo(BL, BB); ctx.lineTo(BL + w, BB); ctx.stroke();
    ctx.fillStyle = PAL.ink; ctx.fillRect(BL + w, BT - 2, 16, BB - BT + 4); ctx.fillRect(BL + w + 16, (BT + BB) / 2 - 8, Math.max(40, 1300 - BL - w - 16), 16); ctx.restore();
    g.draw(ctx, 6);
    hbracket(ctx, BL, BL + w, BB + 96, cv, '');
    text(ctx, 'V = ' + fmt(V, 1) + ' L', BL + w / 2, BB + 124, cv, { size: 20, weight: 600, align: 'center' });
    text(ctx, 'T = ' + T + ' K', BL + w + 40, BB + 60, ct, { size: 20, weight: 600 });
    text(ctx, 'n = ' + fmt(n, 2) + ' mol, ' + g.p.length + ' particles drawn', BL + w + 40, BB + 90, ca, { size: 17, weight: 600 });
    text(ctx, 'piston', Math.min(1250, BL + w + 80), (BT + BB) / 2 - 24, PAL.muted, { size: 16 });
    /* the gauge on the top wall */
    ctx.save(); ctx.fillStyle = PAL.ink; ctx.fillRect(BL + 56, 112, 8, BT - 112); ctx.restore();
    gauge(ctx, BL + 60, 100, 46, P, 10, 'atm');
    text(ctx, 'P = ' + fmt(P, 2) + ' atm' + (P > 10 ? ', off the dial' : ''), BL + 120, 96, cp, { size: 20, weight: 600 });
    text(ctx, 'about ' + g.rate + ' strikes on the walls each second', BL + 120, 124, PAL.muted, { size: 16 });
    /* what is being held, on the right */
    const rx = 1000;
    if (law) {
      text(ctx, LAWS[law].split(':')[0] + '’s law', rx, 470, PAL.ink, { size: 20, weight: 600 });
      text(ctx, 'held: ' + LAWS[law].split(': ')[1], rx, 498, PAL.muted, { size: 17 });
      const ratio = law === 1 ? 'P/T = ' + fmt(P / T, 4) + ' atm/K' : law === 2 ? 'V/T = ' + fmt(V / T, 4) + ' L/K' : law === 3 ? 'PV = ' + fmt(P * V, 1) + ' L atm' : 'V/n = ' + fmt(V / n, 1) + ' L/mol';
      text(ctx, 'constant: ' + ratio, rx, 526, PAL.ink, { size: 17, weight: 600 });
    } else text(ctx, 'all three sliders free', rx, 470, PAL.muted, { size: 17 });
    const stp = Math.abs(V - 22.4) < 0.05 && T === 273 && Math.abs(n - 1) < 0.001;
    topline(ctx, fmt(n, 2) + ' mol at ' + T + ' K in ' + fmt(V, 1) + ' L presses at ' + fmt(P, 2) + ' atm' + (stp ? '; this is the standard molar volume, one mole at STP.' : law === 2 || law === 4 ? '; the piston has moved so that the pressure stays at ' + fmt(snap.P, 2) + ' atm.' : '.'));
    readout(d.readout, `\\kP = \\frac{\\kn R\\kT}{\\kV} = \\frac{(${hue('amount', fmt(n, 2) + '\\ \\text{mol}')})(${RTEX})(${hue('temperature', T + '\\ \\text{K}')})}{${hue('volume', fmt(V, 1) + '\\ \\text{L}')}} = ${hue('pressure', fmt(P, 2) + '\\ \\text{atm}')}`,
      law === 1 ? 'With the volume and the amount held, the pressure and the kelvin temperature rise and fall together, which is Amontons’s law.'
      : law === 2 ? 'With the pressure and the amount held, the volume and the kelvin temperature rise and fall together, which is Charles’s law: the piston moves out as the gas warms.'
      : law === 3 ? 'With the temperature and the amount held, the product of pressure and volume does not change, which is Boyle’s law: pushing the piston in raises the gauge.'
      : law === 4 ? 'With the pressure and the temperature held, the volume follows the amount of gas, which is Avogadro’s law: more particles need more room at the same pressure.'
      : 'The particles move faster as the temperature rises and there are more of them as the amount rises, so they strike the walls more often; a wider box spreads the same strikes over more wall. That is what the gauge reads.');
  }
  register(d.fig, { update: (dt) => { cy.step(dt, () => 1); g.step(dt, speedOf(Tc.v), inside); }, draw });
})();

/* =====================================================================
   SIM: one state on four graphs. The same gas drawn on P against V, V
   against T, P against T and 1/P against V, with the curve through the
   state on each for the other two quantities held. Still: the marker
   answers its sliders.
===================================================================== */
(function () {
  const d = sim('sim-four-graphs', 720);
  const Vc = ctl(d.controls, { label: '\\kV', cls: 'volume', min: 1, max: 30, step: 0.1, value: 22.4, unit: 'L', dec: 1, aria: 'volume of the gas in litres' });
  const Tc = ctl(d.controls, { label: '\\kT', cls: 'temperature', min: 100, max: 600, step: 1, value: 273, unit: 'K', dec: 0, aria: 'temperature of the gas in kelvin' });
  const Nc = ctl(d.controls, { label: '\\kn', cls: 'amount', min: 0.2, max: 4, step: 0.05, value: 1, unit: 'mol', dec: 2, aria: 'amount of gas in moles' });
  /* a curve clipped to its box, so a value the axis cannot hold leaves the frame rather than stretching it */
  function clipped(ctx, box, f, t0, t1, X, Y, color) {
    ctx.save(); ctx.beginPath(); ctx.rect(box.l, box.t, box.r - box.l, box.b - box.t); ctx.clip();
    ctx.strokeStyle = color; ctx.lineWidth = 4; ctx.beginPath(); for (let i = 0; i <= 120; i++) { const s = t0 + ((t1 - t0) * i) / 120, x = X(s), y = Y(f(s)); if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y); } ctx.stroke(); ctx.restore();
  }
  function draw() {
    const { ctx } = begin(d.c);
    const V = Vc.v, T = Tc.v, n = Nc.v, P = (n * R * T) / V, cv = C('volume'), ct = C('temperature'), cp = C('pressure');
    /* the four frames, fixed from the slider ranges: V 0 to 30 L, T 0 to 600 K, P 0 to 10 atm (pinned beyond), 1/P 0 to 2 atm⁻¹ */
    const boxes = [{ l: 130, r: 620, t: 140, b: 360 }, { l: 850, r: 1340, t: 140, b: 360 }, { l: 130, r: 620, t: 450, b: 690 }, { l: 850, r: 1340, t: 450, b: 690 }];
    const note = (box, s) => text(ctx, s, box.r - 8, box.t + 18, PAL.muted, { size: 15, align: 'right' });
    /* P against V, at this T and n */
    let g = axes(ctx, boxes[0], [0, 30], [0, 10], { xl: 'V (L)', xc: cv, yl: 'P (atm)', yc: cp, nx: 3, ny: 2 });
    clipped(ctx, boxes[0], (v) => (n * R * T) / v, 0.5, 30, g.X, g.Y, cp);
    pinned(ctx, boxes[0], g.X, g.Y, V, P, cp, fmt(P, 2) + ' atm'); note(boxes[0], 'T and n held: Boyle’s law');
    /* V against T, at this P and n */
    g = axes(ctx, boxes[1], [0, 600], [0, 30], { xl: 'T (K)', xc: ct, yl: 'V (L)', yc: cv, nx: 3, ny: 3 });
    clipped(ctx, boxes[1], (t) => (n * R * t) / P, 0, 600, g.X, g.Y, cv);
    pinned(ctx, boxes[1], g.X, g.Y, T, V, cv, fmt(V, 1) + ' L'); note(boxes[1], 'P and n held: Charles’s law');
    /* P against T, at this V and n */
    g = axes(ctx, boxes[2], [0, 600], [0, 10], { xl: 'T (K)', xc: ct, yl: 'P (atm)', yc: cp, nx: 3, ny: 2 });
    clipped(ctx, boxes[2], (t) => (n * R * t) / V, 0, 600, g.X, g.Y, cp);
    pinned(ctx, boxes[2], g.X, g.Y, T, P, cp, fmt(P, 2) + ' atm'); note(boxes[2], 'V and n held: Amontons’s law');
    /* 1/P against V, at this T and n */
    g = axes(ctx, boxes[3], [0, 30], [0, 2], { xl: 'V (L)', xc: cv, yl: '1/P (atm⁻¹)', yc: cp, nx: 3, ny: 2, fy: (v) => fmt(v, 1) });
    clipped(ctx, boxes[3], (v) => v / (n * R * T), 0, 30, g.X, g.Y, cp);
    pinned(ctx, boxes[3], g.X, g.Y, V, 1 / P, cp, fmt(1 / P, 2) + ' atm⁻¹'); note(boxes[3], 'T and n held: Boyle’s law, linearized');
    topline(ctx, 'V = ' + fmt(V, 1) + ' L, T = ' + T + ' K, n = ' + fmt(n, 2) + ' mol: the same state is one point on each of the four graphs, and P = ' + fmt(P, 2) + ' atm on all of them.');
    readout(d.readout, `\\kP = \\frac{\\kn R\\kT}{\\kV} = \\frac{(${hue('amount', fmt(n, 2) + '\\ \\text{mol}')})(${RTEX})(${hue('temperature', T + '\\ \\text{K}')})}{${hue('volume', fmt(V, 1) + '\\ \\text{L}')}} = ${hue('pressure', fmt(P, 2) + '\\ \\text{atm}')}`,
      'Each graph holds two of the four quantities still and draws the relation between the other two: a hyperbola where the relation is inverse, a straight line through the origin where it is direct. The temperature slider moves the marker on three of the graphs and leaves the first alone, since that graph is drawn at one temperature.');
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 9.18: three balloons holding the same amount of gas at STP. The
   gas in each is chosen and its mass follows, while the balloons stay one
   size; the amount scales all three together. Still: the balloons answer
   their sliders. The molecules inside are drawn in the element palette.
===================================================================== */
(function () {
  const d = sim('sim-balloons', 560);
  /* name, molar mass in g/mol, and the atoms of one molecule as [element, dx, dy, radius] about its centre */
  const GASES = [
    ['He', 4.003, [['He', 0, 0, 7]]],
    ['H₂', 2.016, [['H', -5, 0, 5], ['H', 5, 0, 5]]],
    ['N₂', 28.01, [['N', -6, 0, 7], ['N', 6, 0, 7]]],
    ['O₂', 32.00, [['O', -6, 0, 7], ['O', 6, 0, 7]]],
    ['NH₃', 17.03, [['H', -9, 5, 4.5], ['H', 9, 5, 4.5], ['H', 0, -10, 4.5], ['N', 0, 0, 7]]],
    ['CH₄', 16.04, [['H', -9, -8, 4.5], ['H', 9, -8, 4.5], ['H', -9, 8, 4.5], ['H', 9, 8, 4.5], ['C', 0, 0, 7]]],
    ['CO₂', 44.01, [['O', -13, 0, 7], ['O', 13, 0, 7], ['C', 0, 0, 6.5]]],
    ['Ar', 39.95, [['Ar', 0, 0, 8]]],
  ];
  const names = GASES.map((g) => g[0]);
  const A = named(d.controls, { label: '\\text{first balloon}', cls: '', min: 0, max: GASES.length - 1, step: 1, value: 0, aria: 'gas in the first balloon' }, names);
  const B = named(d.controls, { label: '\\text{second balloon}', cls: '', min: 0, max: GASES.length - 1, step: 1, value: 4, aria: 'gas in the second balloon' }, names);
  const Cc = named(d.controls, { label: '\\text{third balloon}', cls: '', min: 0, max: GASES.length - 1, step: 1, value: 3, aria: 'gas in the third balloon' }, names);
  const N = ctl(d.controls, { label: '\\kn', cls: 'amount', min: 0.25, max: 2, step: 0.05, value: 1, unit: 'mol', dec: 2, aria: 'amount of gas in each balloon' });
  const TSTP = 273.15, PSTP = 1;
  /* eight fixed places inside a unit balloon for the molecules, so nothing jumps when a gas is changed */
  const SPOTS = [[-0.45, -0.5], [0.4, -0.55], [-0.1, -0.15], [0.5, 0.05], [-0.55, 0.2], [0.1, 0.4], [-0.3, 0.65], [0.45, 0.6]];
  function balloon(ctx, x, y, r, gas, n) {
    const cv = C('volume');
    ctx.save(); ctx.fillStyle = alpha(cv, 0.16); ctx.strokeStyle = cv; ctx.lineWidth = 3.5; ctx.beginPath();
    ctx.moveTo(x, y + r * 1.15); ctx.bezierCurveTo(x - r * 0.9, y + r * 0.7, x - r * 1.05, y - r * 0.9, x, y - r); ctx.bezierCurveTo(x + r * 1.05, y - r * 0.9, x + r * 0.9, y + r * 0.7, x, y + r * 1.15); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x - 8, y + r * 1.15 + 14); ctx.lineTo(x, y + r * 1.15); ctx.lineTo(x + 8, y + r * 1.15 + 14); ctx.closePath(); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x, y + r * 1.15 + 14); ctx.quadraticCurveTo(x + 22, y + r * 1.15 + 50, x, y + r * 1.15 + 90); ctx.stroke(); ctx.restore();
    const k = 0.9 + 0.5 * (n - 0.25) / 1.75;
    for (const [sx, sy] of SPOTS) {
      const mx = x + sx * r * 0.72, my = y + sy * r * 0.8;
      for (const [elm, dx, dy, rr] of gas[2]) {
        ctx.save(); ctx.fillStyle = F.el(elm); ctx.strokeStyle = elm === 'H' ? PAL.ink : F.el(elm); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(mx + dx * k, my + dy * k, rr * k, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore();
      }
    }
  }
  function draw() {
    const { ctx } = begin(d.c);
    const n = N.v, V = (n * R * TSTP) / PSTP, r = 118 * Math.cbrt(n), picks = [GASES[A.v], GASES[B.v], GASES[Cc.v]], cv = C('volume'), ca = C('amount');
    picks.forEach((gas, i) => {
      const x = 300 + i * 400, y = 250;
      balloon(ctx, x, y, r, gas, n);
      text(ctx, gas[0] + ' (' + fmt(n * gas[1], 1) + ' g)', x, 490, PAL.ink, { size: 22, weight: 600, align: 'center' });
      text(ctx, fmt(n, 2) + ' mol, ' + fmt(V, 1) + ' L', x, 520, PAL.ink, { size: 17, align: 'center' });
    });
    text(ctx, 'at STP: 273.15 K and 1 atm', 1330, 548, PAL.muted, { size: 16, align: 'right' });
    const same = picks[0] === picks[1] && picks[1] === picks[2];
    topline(ctx, (same ? 'Three balloons of ' + picks[0][0] : 'Balloons of ' + picks.map((g) => g[0]).join(', ')) + ', ' + fmt(n, 2) + ' mol each at STP: ' + picks.map((g) => fmt(n * g[1], 1) + ' g').join(', ') + ', and every balloon holds ' + fmt(V, 1) + ' L.');
    readout(d.readout, `\\kV = \\frac{\\kn R\\kT}{\\kP} = \\frac{(${hue('amount', fmt(n, 2) + '\\ \\text{mol}')})(${RTEX})(${hue('temperature', '273.15\\ \\text{K}')})}{${hue('pressure', '1\\ \\text{atm}')}} = ${hue('volume', fmt(V, 1) + '\\ \\text{L}')}`,
      Math.abs(n - 1) < 0.001 ? 'One mole of any gas behaving ideally occupies about 22.4 L at STP, the standard molar volume; the gas decides only the mass in the balloon, not its size.'
        : 'The volume follows the amount alone, ' + fmt(22.4 * n, 1) + ' L for ' + fmt(n, 2) + ' mol, whatever the gas; equal volumes of the three gases hold equal numbers of molecules, as Avogadro proposed.');
  }
  register(d.fig, { update: () => {}, draw });
})();
};
