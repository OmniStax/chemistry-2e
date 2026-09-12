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
/* a state the reader switches between rather than slides through (rule 26.1): a row of buttons with the current one marked, or
   a dropdown where the list is long enough that a row would wrap; the figure reads it as the index it always read */
function pick(controls, o, names) {
  const make = names.length > 5 ? F.select : F.choice;
  const c = make(controls, { label: o.label, aria: o.aria, options: names.map((n, i) => ({ value: String(i), label: n })), value: String(o.value ?? 0), onInput: () => o.onInput?.() });
  return { get v() { return +c.value; }, set(x) { c.set(String(x)); } };
}
/* ---------- the gases, drawn as molecules in the element palette (rule 7.2) ----------
   Every particle a figure of this section draws is a molecule of a named gas: a single disc for helium and argon, two blue discs
   for nitrogen, two red for oxygen, a black carbon between two red oxygens for carbon dioxide, and so on. Each entry is the
   name, the molar mass in g/mol, and the atoms of one molecule as [element, dx, dy, radius] about its centre in a unit space,
   with a hint of the molecule's shape. A molecule is drawn turned by the angle it travels along, so that a diatomic tumbles. */
const MOLS = {
  'He': { m: 4.003, atoms: [['He', 0, 0, 7]] },
  'H₂': { m: 2.016, atoms: [['H', -5, 0, 5], ['H', 5, 0, 5]] },
  'N₂': { m: 28.01, atoms: [['N', -6, 0, 7], ['N', 6, 0, 7]] },
  'O₂': { m: 32.00, atoms: [['O', -6, 0, 7], ['O', 6, 0, 7]] },
  'NH₃': { m: 17.03, atoms: [['H', -9, 5, 4.5], ['H', 9, 5, 4.5], ['H', 0, -10, 4.5], ['N', 0, 0, 7]] },
  'CH₄': { m: 16.04, atoms: [['H', -9, -8, 4.5], ['H', 9, -8, 4.5], ['H', -9, 8, 4.5], ['H', 9, 8, 4.5], ['C', 0, 0, 7]] },
  'CO₂': { m: 44.01, atoms: [['O', -13, 0, 7], ['O', 13, 0, 7], ['C', 0, 0, 6.5]] },
  'Ar': { m: 39.95, atoms: [['Ar', 0, 0, 8]] },
};
const WORD = { 'He': 'helium', 'H₂': 'hydrogen', 'N₂': 'nitrogen', 'O₂': 'oxygen', 'NH₃': 'ammonia', 'CH₄': 'methane', 'CO₂': 'carbon dioxide', 'Ar': 'argon' };
const molName = (f) => (MOLS[f].atoms.length === 1 ? 'a ' + WORD[f] + ' atom, ' + f : 'a ' + WORD[f] + ' molecule, ' + f);
/* one molecule of the gas f centred on (x, y), scaled by k and turned by a; hydrogen takes an ink outline so that its light disc
   reads on a light page; returns the radius that covers it, for the hover tooltip */
function molecule(ctx, f, x, y, k = 1, a = 0) {
  const c = Math.cos(a), s = Math.sin(a); let reach = 0;
  for (const [elm, dx, dy, rr] of MOLS[f].atoms) {
    const px = x + (dx * c - dy * s) * k, py = y + (dx * s + dy * c) * k;
    ctx.save(); ctx.fillStyle = F.el(elm); ctx.strokeStyle = elm === 'H' ? PAL.ink : alpha(PAL.ink, 0.35); ctx.lineWidth = elm === 'H' ? 1.5 : 1; ctx.beginPath(); ctx.arc(px, py, rr * k, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore();
    reach = Math.max(reach, Math.hypot(dx, dy) * k + rr * k);
  }
  return reach;
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
/* air, as the book fills its vessels: four molecules of nitrogen to one of oxygen */
const AIR = (i) => (i % 5 === 4 ? 'O₂' : 'N₂');

/* ---------- three dimensions ----------
   The book's rule for this chapter (Chemistry 2e RULES.md, Figures): a
   particle picture is three-dimensional, spheres in a vessel the reader
   turns, with its readings on a flat strip beneath; a molecule inset in an
   otherwise flat figure is built both ways behind a view choice. The viewer,
   the meshes and the navigation buttons come from the library: F.view3d
   mounts the transparent WebGL scene in the figure's stage with auto-rotate,
   the snap-to-view buttons and zoom, and F.mesh draws the balls, sticks and
   boxes. What stays here is the chemistry: which gas is in the vessel, how a
   molecule of it is built from the same MOLS table the flat drawings read,
   and how the strikes on the walls are counted. */
const T3D = window.THREE;
const { sphere: sphere3, stick: stick3, box: box3, mat: mat3, polyline: polyline3 } = F.mesh;
/* the signature of everything a scene's colours are read from, so a theme change rebuilds it */
const palSig = () => [PAL.ink, PAL.panel, PAL.soft, PAL.muted, F.CC, F.el('O'), F.el('N'), C('volume'), C('temperature')].join('|');
/* a figlib canvas beneath the viewer: the gauge, the headline and the readings on a flat strip */
const strip = (d, H) => F.makeCanvas(d.stage, H);
/* the glass of a vessel: the ink at a tenth, both faces, never hiding what is inside */
const glass = (extra = {}) => ({ transparent: true, opacity: 0.1, depthWrite: false, side: T3D.DoubleSide, ...extra });
/* the edges of a box, in ink, so a transparent vessel keeps its outline */
function edges3(g, size, at = [0, 0, 0]) {
  const e = new T3D.LineSegments(new T3D.EdgesGeometry(new T3D.BoxGeometry(size[0], size[1], size[2])), new T3D.LineBasicMaterial({ color: new T3D.Color(PAL.ink) }));
  e.position.set(at[0], at[1], at[2]); g.add(e); return e;
}
/* a gas of molecules in three dimensions, the same engine as the flat one: each keeps a position, a unit heading and the
   formula of the gas it is; its speed is set from the temperature every step, `inside` puts a molecule back in the vessel
   and returns the wall normal where it left, and every strike is counted, so the count on the strip is honest */
function gas3() {
  const g = { p: [], hits: 0, t: 0, rate: 0 };
  g.fill = (N, spawn) => { while (g.p.length < N) g.p.push(spawn(g.p.length)); if (g.p.length > N) g.p.length = N; };
  g.retag = (of) => { g.p.forEach((q, i) => { q.f = of(i); }); };
  g.step = (dt, speed, inside) => {
    let hits = 0;
    for (const q of g.p) {
      for (let k = 0; k < 3; k++) q.x[k] += q.u[k] * speed * dt;
      const n = inside(q);
      if (n) { const dd = q.u[0] * n[0] + q.u[1] * n[1] + q.u[2] * n[2]; if (dd < 0) for (let k = 0; k < 3; k++) q.u[k] -= 2 * dd * n[k]; hits++; }
    }
    g.hits += hits; g.t += dt; if (g.t >= 1) { g.rate = Math.round(g.hits / g.t); g.hits = 0; g.t = 0; }
  };
  return g;
}
const heading3 = () => { const z = 2 * Math.random() - 1, a = Math.random() * TAU, r = Math.sqrt(1 - z * z); return [r * Math.cos(a), r * Math.sin(a), z]; };
/* the speed of a molecule in scene units per second, rising as the square root of the kelvin temperature as the flat speed does */
const speed3 = (T) => 0.045 * Math.sqrt(T);
/* one molecule of the gas f as a group of spheres in the element palette, k scene units per unit of the MOLS table, every
   sphere named for the pointer (rule 26.6); the group is placed and turned by the figure */
function molecule3(v, parent, f, k) {
  const m = new T3D.Group(); parent.add(m);
  MOLS[f].atoms.forEach(([elm, dx, dy, rr]) => v.pickable(sphere3(m, [dx * k, dy * k, 0], rr * k * 1.15, F.el(elm)), molName(f)));
  return m;
}
/* a molecule's group set to where its particle is and turned along its heading, so a diatomic tumbles as the flat one does */
function place3(m, q) { m.position.set(q.x[0], q.x[1], q.x[2]); m.rotation.set(0, Math.atan2(q.u[0], q.u[2]), Math.asin(Math.max(-1, Math.min(1, q.u[1])))); }
/* the meshes of a moving gas: one group per particle, rebuilt only when the gas, the count or the palette changes */
function flock(v, grp, g, k) {
  const f = { sig: '', ms: [] };
  f.sync = (of) => {
    const key = [g.p.length, of, palSig()].join('|');
    if (key !== f.sig) { f.sig = key; f.ms.forEach((m) => { m.traverse((o) => { if (o.material) o.material.dispose(); }); grp.remove(m); }); f.ms = g.p.map((q) => molecule3(v, grp, q.f, k)); }
    g.p.forEach((q, i) => place3(f.ms[i], q));
  };
  f.drop = () => { f.sig = ''; f.ms = []; };
  return f;
}
/* the view presets: a particle picture turns freely and does not spin on its own, since its particles already move; a vessel
   over a hot plate has a ground and is never seen from beneath */
const PICTURE = { spin: 'off', views: [{ label: 'front', yaw: 0, pitch: 0.18 }, { label: 'corner', yaw: 0.7, pitch: 0.42 }] };
const OVERPLATE = { spin: 'off', pitch: [0.02, 1.25], views: [{ label: 'front', yaw: 0, pitch: 0.22 }, { label: 'above', yaw: 0, pitch: 1.1 }] };

/* =====================================================================
   FIGURE 9.10: the sealed sphere over a hot plate, in three dimensions.
   A glass sphere of air stands in a water bath on a hot plate, and the
   molecules inside it travel and quicken as the sphere warms; the gauge
   on the strip beneath reads nRT/V for the fixed litre it holds. Moving:
   the particles are what the gauge reads, so the figure runs continuously
   and carries the transport without a scrubber. The orbit keeps the pitch
   between 1° and 72° above level, since the plate is a ground and the
   scene is never seen from beneath; the yaw is free.
===================================================================== */
(function () {
  const d = sim('sim-amontons-sphere');
  const v = F.view3d(d.stage, { ...OVERPLATE, h: 420, dist: 7.2, tilt: 0.22 });
  const grp = v.part(0), cnv = strip(d, 250);
  const T = ctl(d.controls, { label: '\\kT', cls: 'temperature', min: 150, max: 600, step: 1, value: 298, unit: 'K', dec: 0, aria: 'temperature of the gas in kelvin' });
  const N = ctl(d.controls, { label: '\\kn', cls: 'amount', min: 0.25, max: 2, step: 0.05, value: 1, unit: 'mol', dec: 2, aria: 'amount of gas in moles' });
  const V = 1.0;                                            /* the sphere holds one litre and cannot change */
  const RS = 1.0, RM = 0.09, LIM = RS - RM - 0.02;           /* the sphere, a molecule's reach, and how far a centre may go */
  const g = gas3();
  /* the sphere holds air, drawn as the nitrogen and oxygen it is */
  const spawn = (i) => { const u = heading3(), rr = Math.cbrt(Math.random()) * LIM; return { x: [u[0] * rr, u[1] * rr, u[2] * rr], f: AIR(i), u: heading3() }; };
  const inside = (q) => { const dd = Math.hypot(q.x[0], q.x[1], q.x[2]); if (dd < LIM) return null; const n = q.x.map((c) => -c / dd); q.x = q.x.map((c) => (c / dd) * LIM); return n; };
  const cy = cycle(() => Infinity, 0);
  const birds = flock(v, grp, g, 0.012);
  let sig = '', bath = null, glow = null;
  /* the apparatus is built once and rebuilt on a theme change; the bath and the glow take their tint from the temperature every frame */
  function build() {
    const key = palSig(); if (key === sig) return; sig = key;
    v.clear(); birds.drop();
    v.pickable(box3(grp, [0, -1.42, 0], [3.8, 0.16, 3.8], PAL.soft), 'hot plate');                 /* the hot plate */
    glow = box3(grp, [0, -1.33, 0], [3.0, 0.02, 3.0], C('temperature'), { transparent: true, opacity: 0.2 });
    const beaker = new T3D.Mesh(new T3D.CylinderGeometry(1.5, 1.5, 1.9, 36, 1, true), mat3(PAL.ink, glass())); beaker.position.set(0, -0.4, 0); grp.add(beaker);
    bath = new T3D.Mesh(new T3D.CylinderGeometry(1.48, 1.48, 1.5, 36), mat3(C('temperature'), { transparent: true, opacity: 0.2, depthWrite: false })); bath.position.set(0, -0.6, 0); grp.add(bath);
    v.pickable(bath, 'water bath');
    const ball = new T3D.Mesh(new T3D.SphereGeometry(RS, 36, 24), mat3(PAL.ink, glass())); ball.renderOrder = 2; grp.add(ball);
    const neck = new T3D.Mesh(new T3D.CylinderGeometry(0.12, 0.12, 0.7, 18, 1, true), mat3(PAL.ink, glass())); neck.position.set(0, RS + 0.3, 0); grp.add(neck);
    v.pickable(box3(grp, [0, RS + 0.72, 0], [0.5, 0.16, 0.16], C('pressure')), 'pressure gauge, on the neck of the sphere; its reading is on the dial beneath');
    v.label('sealed sphere, 1 L', [0, RS + 0.95, 0], grp, 6);
    v.label('water bath', [1.5, -0.55, 0], grp, 0);
    v.label('hot plate', [-1.9, -1.42, 0], grp, 0);
  }
  function draw() {
    build();
    const t = T.v, n = N.v, P = (n * R * t) / V, k = Math.max(0, Math.min(1, (t - 150) / 450)), cp = C('pressure'), ct = C('temperature'), ca = C('amount');
    g.fill(Math.round(n * 12), spawn);
    birds.sync('air');
    if (bath) bath.material.opacity = 0.12 + 0.3 * k;
    if (glow) glow.material.opacity = 0.05 + 0.7 * k;
    v.invalidate();
    /* the strip beneath: the gauge, the readings and the ratio that does not change */
    const { ctx } = begin(cnv);
    gauge(ctx, 130, 130, 62, P, 100, 'atm');
    text(ctx, 'pressure gauge', 130, 214, PAL.muted, { size: 16, align: 'center' });
    text(ctx, fmt(P, 1) + ' atm', 230, 118, cp, { size: 30, weight: 600 });
    text(ctx, 'about ' + g.rate + ' strikes on the wall each second', 230, 156, PAL.muted, { size: 17 });
    const rx = 700;
    text(ctx, 'held constant', rx, 92, PAL.muted, { size: 17 });
    text(ctx, 'V = ' + fmt(V, 2) + ' L, the sealed sphere', rx, 122, C('volume'), { size: 22, weight: 600 });
    text(ctx, 'n = ' + fmt(n, 2) + ' mol of air, ' + g.p.length + ' molecules drawn', rx, 152, ca, { size: 22, weight: 600 });
    text(ctx, 'T = ' + t + ' K, the bath', rx, 182, ct, { size: 22, weight: 600 });
    text(ctx, 'P / T = ' + fmt(P / t, 4) + ' atm/K · the molecules move ' + fmt(Math.sqrt(t / 298), 2) + ' times as fast as at 298 K', rx, 218, PAL.ink, { size: 17, weight: 600 });
    topline(ctx, 'At ' + t + ' K the gauge reads ' + fmt(P, 1) + ' atm; the ratio P/T stays at ' + fmt(P / t, 4) + ' atm/K for this filling of the sphere. Drag to turn the sphere.');
    readout(d.readout, `\\frac{\\kP}{\\kT} = \\frac{${hue('pressure', fmt(P, 1) + '\\ \\text{atm}')}}{${hue('temperature', t + '\\ \\text{K}')}} = ${fmt(P / t, 4)}\\ \\text{atm/K} = \\frac{\\kn R}{\\kV}`,
      'The sphere is rigid and sealed, so the volume and the amount of gas cannot change; doubling the kelvin temperature to ' + 2 * t + ' K would double the pressure to ' + fmt(2 * P, 1) + ' atm.');
  }
  register(d.fig, { update: (dt) => { cy.step(dt, () => 1); g.step(dt, speed3(T.v), inside); }, draw });
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
   SIM: the gas box, in three dimensions. A glass box closed by a piston,
   its molecules travelling and striking the walls, with sliders for
   volume, temperature and amount and the pressure computed from the
   ideal gas law on the gauge of the strip beneath; a fourth control locks
   the two quantities one of the four laws holds constant. Moving: the
   particles travel and strike the walls, so the figure runs continuously
   and carries the transport without a scrubber. The orbit is free, since
   a box of gas has no up to keep, and the box does not spin on its own,
   since its molecules already move.
===================================================================== */
(function () {
  const d = sim('sim-gas-box');
  const v = F.view3d(d.stage, { ...PICTURE, h: 440, dist: 7.6, tilt: 0.18 });
  const grp = v.part(0), cnv = strip(d, 250);
  const LAWS = ['free', 'Amontons: V and n held', 'Charles: P and n held', 'Boyle: T and n held', 'Avogadro: P and T held'];
  const GASES = ['He', 'N₂', 'O₂', 'Ar', 'CO₂'];
  /* the gas is chosen by name (rule 7.2): every molecule in the box is a molecule of that gas in its element's colours */
  const Gc = pick(d.controls, { label: '\\text{gas}', value: 1, aria: 'the gas in the box', onInput: () => g.retag(() => GASES[Gc.v]) }, GASES);
  const Vc = ctl(d.controls, { label: '\\kV', cls: 'volume', min: 1, max: 30, step: 0.1, value: 22.4, unit: 'L', dec: 1, onInput: () => apply('V'), aria: 'volume of the gas in litres' });
  const Tc = ctl(d.controls, { label: '\\kT', cls: 'temperature', min: 100, max: 600, step: 1, value: 273, unit: 'K', dec: 0, onInput: () => apply('T'), aria: 'temperature of the gas in kelvin' });
  const Nc = ctl(d.controls, { label: '\\kn', cls: 'amount', min: 0.2, max: 4, step: 0.05, value: 1, unit: 'mol', dec: 2, onInput: () => apply('n'), aria: 'amount of gas in moles' });
  /* the four laws are states, not a quantity (rule 26.1): a row of buttons, the one held marked */
  const Lc = pick(d.controls, { label: '\\text{law held}', value: 0, aria: 'the gas law being held', onInput: snapshot }, LAWS.map((l) => l.split(':')[0]));
  const pressure = () => (Nc.v * R * Tc.v) / Vc.v;
  let snap = { V: Vc.v, T: Tc.v, n: Nc.v, P: pressure() };
  function snapshot() { snap = { V: Vc.v, T: Tc.v, n: Nc.v, P: pressure() }; }
  /* the two quantities a law holds constant are put back when a slider moves; where the pressure is held, the piston finds the volume */
  const clampV = (x) => Math.min(30, Math.max(1, x));
  function apply() {
    const law = Lc.v;
    if (law === 1) { Vc.set(snap.V); Nc.set(snap.n); }
    if (law === 2) { Nc.set(snap.n); Vc.set(clampV((Nc.v * R * Tc.v) / snap.P)); }
    if (law === 3) { Tc.set(snap.T); Nc.set(snap.n); }
    if (law === 4) { Tc.set(snap.T); Vc.set(clampV((Nc.v * R * Tc.v) / snap.P)); }
  }
  /* the box: a fixed height and depth, a width that follows the volume, its left wall fixed and the piston at its right */
  const HB = 1.6, DB = 1.6, X0 = -1.7, width = (V) => 0.36 + 0.095 * V, RM = 0.1;
  const walls = (V) => { const w = width(V); return { l: X0 + RM, r: X0 + w - RM, t: HB / 2 - RM, b: -HB / 2 + RM, f: DB / 2 - RM, k: -DB / 2 + RM }; };
  const g = gas3();
  const spawn = () => { const b = walls(Vc.v); return { x: [b.l + Math.random() * (b.r - b.l), b.b + Math.random() * (b.t - b.b), b.k + Math.random() * (b.f - b.k)], f: GASES[Gc.v], u: heading3() }; };
  const inside = (q) => {
    const b = walls(Vc.v); let n = null;
    if (q.x[0] < b.l) { q.x[0] = b.l; n = [1, 0, 0]; } else if (q.x[0] > b.r) { q.x[0] = b.r; n = [-1, 0, 0]; }
    if (q.x[1] < b.b) { q.x[1] = b.b; n = [0, 1, 0]; } else if (q.x[1] > b.t) { q.x[1] = b.t; n = [0, -1, 0]; }
    if (q.x[2] < b.k) { q.x[2] = b.k; n = [0, 0, 1]; } else if (q.x[2] > b.f) { q.x[2] = b.f; n = [0, 0, -1]; }
    return n;
  };
  const cy = cycle(() => Infinity, 0);
  const birds = flock(v, grp, g, 0.012);
  let sig = '';
  /* the vessel is rebuilt when the volume or the palette changes; the molecules are moved every frame */
  function build() {
    const key = [Vc.v, palSig()].join('|'); if (key === sig) return; sig = key;
    v.clear(); birds.drop();
    const w = width(Vc.v), cx = X0 + w / 2;
    const body = box3(grp, [cx, 0, 0], [w, HB, DB], C('volume'), { transparent: true, opacity: 0.12, depthWrite: false, side: T3D.DoubleSide });
    v.pickable(body, 'the gas, ' + fmt(Vc.v, 1) + ' L');
    edges3(grp, [w, HB, DB], [cx, 0, 0]);
    v.pickable(box3(grp, [X0 + w + 0.05, 0, 0], [0.1, HB + 0.08, DB + 0.08], PAL.muted), 'piston');
    stick3(grp, [X0 + w + 0.1, 0, 0], [X0 + w + 1.1, 0, 0], 0.05, PAL.ink);
    v.label('piston', [X0 + w + 0.6, 0.1, 0], grp, 6);
    const lab = v.label('V = ' + fmt(Vc.v, 1) + ' L', [cx, -HB / 2 - 0.12, DB / 2], grp, -8); lab.style.color = C('volume');
  }
  function draw() {
    build();
    const V = Vc.v, T = Tc.v, n = Nc.v, P = pressure(), law = Lc.v, cv = C('volume'), ct = C('temperature'), cp = C('pressure'), ca = C('amount');
    g.fill(Math.round(n * 10), spawn);
    birds.sync(GASES[Gc.v]);
    v.invalidate();
    /* the strip beneath: the gauge, the readings and what is being held */
    const { ctx } = begin(cnv);
    gauge(ctx, 130, 130, 62, P, 10, 'atm');
    text(ctx, 'pressure gauge', 130, 214, PAL.muted, { size: 16, align: 'center' });
    text(ctx, 'P = ' + fmt(P, 2) + ' atm' + (P > 10 ? ', off the dial' : ''), 230, 118, cp, { size: 30, weight: 600 });
    text(ctx, 'about ' + g.rate + ' strikes on the walls each second', 230, 156, PAL.muted, { size: 17 });
    const rx = 700;
    text(ctx, 'V = ' + fmt(V, 1) + ' L', rx, 92, cv, { size: 22, weight: 600 });
    text(ctx, 'T = ' + T + ' K', rx, 122, ct, { size: 22, weight: 600 });
    text(ctx, 'n = ' + fmt(n, 2) + ' mol of ' + WORD[GASES[Gc.v]] + ', ' + g.p.length + ' molecules drawn', rx, 152, ca, { size: 22, weight: 600 });
    if (law) {
      text(ctx, LAWS[law].split(':')[0] + '’s law, held: ' + LAWS[law].split(': ')[1], rx, 192, PAL.ink, { size: 18, weight: 600 });
      const ratio = law === 1 ? 'P/T = ' + fmt(P / T, 4) + ' atm/K' : law === 2 ? 'V/T = ' + fmt(V / T, 4) + ' L/K' : law === 3 ? 'PV = ' + fmt(P * V, 1) + ' L atm' : 'V/n = ' + fmt(V / n, 1) + ' L/mol';
      text(ctx, 'constant: ' + ratio, rx, 220, PAL.muted, { size: 17 });
    } else text(ctx, 'all three sliders free · drag the box to turn it', rx, 192, PAL.muted, { size: 17 });
    const stp = Math.abs(V - 22.4) < 0.05 && T === 273 && Math.abs(n - 1) < 0.001;
    topline(ctx, fmt(n, 2) + ' mol of ' + WORD[GASES[Gc.v]] + ' at ' + T + ' K in ' + fmt(V, 1) + ' L presses at ' + fmt(P, 2) + ' atm' + (stp ? '; this is the standard molar volume, one mole at STP, whichever gas it is.' : law === 2 || law === 4 ? '; the piston has moved so that the pressure stays at ' + fmt(snap.P, 2) + ' atm.' : '.'));
    readout(d.readout, `\\kP = \\frac{\\kn R\\kT}{\\kV} = \\frac{(${hue('amount', fmt(n, 2) + '\\ \\text{mol}')})(${RTEX})(${hue('temperature', T + '\\ \\text{K}')})}{${hue('volume', fmt(V, 1) + '\\ \\text{L}')}} = ${hue('pressure', fmt(P, 2) + '\\ \\text{atm}')}`,
      law === 1 ? 'With the volume and the amount held, the pressure and the kelvin temperature rise and fall together, which is Amontons’s law.'
      : law === 2 ? 'With the pressure and the amount held, the volume and the kelvin temperature rise and fall together, which is Charles’s law: the piston moves out as the gas warms.'
      : law === 3 ? 'With the temperature and the amount held, the product of pressure and volume does not change, which is Boyle’s law: pushing the piston in raises the gauge.'
      : law === 4 ? 'With the pressure and the temperature held, the volume follows the amount of gas, which is Avogadro’s law: more particles need more room at the same pressure.'
      : 'The particles move faster as the temperature rises and there are more of them as the amount rises, so they strike the walls more often; a wider box spreads the same strikes over more wall. That is what the gauge reads.');
  }
  register(d.fig, { update: (dt) => { cy.step(dt, () => 1); g.step(dt, speed3(Tc.v), inside); }, draw });
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
   their sliders. The molecules inside are drawn in the element palette,
   and the figure is built both ways behind a view choice (book rule: a
   molecule inset in a flat figure), the flat drawing the default and the
   3D scene mounted on the first switch, sharing the sliders and the
   readout; the scene turns freely, since hanging balloons have no ground.
===================================================================== */
(function () {
  const d = sim('sim-balloons', 560);
  /* the view is a state (rule 26.1): the flat drawing, which the book teaches, or the same balloons turned in three dimensions */
  const VIEW = F.choice(d.controls, { label: '\\text{view}', options: [{ value: '2d', label: '2D' }, { value: '3d', label: '3D' }], value: '2d', aria: 'a flat drawing or a scene to turn', onInput: show });
  /* the eight gases of the dropdowns: each balloon's gas is a state the reader picks (rule 26.1), a dropdown since a row of eight
     would wrap, and the molecules drawn inside are the gas in its element's colours (rule 7.2) */
  const GASES = Object.keys(MOLS).map((f) => [f, MOLS[f].m]);
  const names = GASES.map((g) => g[0]);
  const A = pick(d.controls, { label: '\\text{first balloon}', value: 0, aria: 'gas in the first balloon' }, names);
  const B = pick(d.controls, { label: '\\text{second balloon}', value: 4, aria: 'gas in the second balloon' }, names);
  const Cc = pick(d.controls, { label: '\\text{third balloon}', value: 3, aria: 'gas in the third balloon' }, names);
  const N = ctl(d.controls, { label: '\\kn', cls: 'amount', min: 0.25, max: 2, step: 0.05, value: 1, unit: 'mol', dec: 2, aria: 'amount of gas in each balloon' });
  const TSTP = 273.15, PSTP = 1;
  /* eight fixed places inside a unit balloon for the molecules, so nothing jumps when a gas is changed; the third coordinate is for the scene */
  const SPOTS = [[-0.45, -0.5, 0.2], [0.4, -0.55, -0.3], [-0.1, -0.15, 0.5], [0.5, 0.05, 0.1], [-0.55, 0.2, -0.4], [0.1, 0.4, -0.5], [-0.3, 0.65, 0.3], [0.45, 0.6, -0.1]];
  let hits = []; F.hover(d.stage, () => hits);
  const picks = () => [GASES[A.v], GASES[B.v], GASES[Cc.v]];
  const label = (gas, n) => gas[0] + ' (' + fmt(n * gas[1], 1) + ' g)';
  function balloon(ctx, x, y, r, gas, n) {
    const cv = C('volume');
    ctx.save(); ctx.fillStyle = alpha(cv, 0.16); ctx.strokeStyle = cv; ctx.lineWidth = 3.5; ctx.beginPath();
    ctx.moveTo(x, y + r * 1.15); ctx.bezierCurveTo(x - r * 0.9, y + r * 0.7, x - r * 1.05, y - r * 0.9, x, y - r); ctx.bezierCurveTo(x + r * 1.05, y - r * 0.9, x + r * 0.9, y + r * 0.7, x, y + r * 1.15); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x - 8, y + r * 1.15 + 14); ctx.lineTo(x, y + r * 1.15); ctx.lineTo(x + 8, y + r * 1.15 + 14); ctx.closePath(); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x, y + r * 1.15 + 14); ctx.quadraticCurveTo(x + 22, y + r * 1.15 + 50, x, y + r * 1.15 + 90); ctx.stroke(); ctx.restore();
    const k = 0.9 + 0.5 * (n - 0.25) / 1.75;
    SPOTS.forEach(([sx, sy], i) => {
      const mx = x + sx * r * 0.72, my = y + sy * r * 0.8, reach = molecule(ctx, gas[0], mx, my, k, (i * 0.7) % TAU);
      hits.push({ x: mx, y: my, r: reach + 3, name: molName(gas[0]) });
    });
    hits.push({ x, y, r: r * 1.05, name: 'a balloon of ' + WORD[gas[0]] + ', ' + fmt(n, 2) + ' mol' });   /* after its molecules, which the tooltip finds first */
  }
  /* the flat drawing */
  function draw2d() {
    const { ctx } = begin(d.c);
    hits.length = 0;
    const n = N.v, V = (n * R * TSTP) / PSTP, r = 118 * Math.cbrt(n), ps = picks();
    ps.forEach((gas, i) => {
      const x = 300 + i * 400, y = 250;
      balloon(ctx, x, y, r, gas, n);
      text(ctx, label(gas, n), x, 490, PAL.ink, { size: 22, weight: 600, align: 'center' });
      text(ctx, fmt(n, 2) + ' mol, ' + fmt(V, 1) + ' L', x, 520, PAL.ink, { size: 17, align: 'center' });
    });
    text(ctx, 'at STP: 273.15 K and 1 atm', 1330, 548, PAL.muted, { size: 16, align: 'right' });
    topline(ctx, head());
  }
  /* the scene: three translucent spheres in the volume hue, each with its knot and string and its molecules inside, mounted on the first switch to 3D */
  let v = null, grp = null, cnv = null, sig = '';
  function mount() {
    v = F.view3d(d.stage, { ...PICTURE, h: 440, dist: 8 });
    grp = v.part(0); cnv = strip(d, 100);
  }
  function build() {
    const n = N.v, ps = picks(), key = [n, ps.map((g) => g[0]).join(), palSig()].join('|'); if (key === sig) return; sig = key;
    v.clear();
    const r = 0.72 * Math.cbrt(n), k = 0.008 * (0.9 + 0.5 * (n - 0.25) / 1.75);
    ps.forEach((gas, i) => {
      const x = (i - 1) * 2.3, y = 0.35;
      const skin = new T3D.Mesh(new T3D.SphereGeometry(r, 36, 24), mat3(C('volume'), { transparent: true, opacity: 0.22, depthWrite: false, side: T3D.DoubleSide })); skin.position.set(x, y, 0); skin.renderOrder = 2; grp.add(skin);
      const knot = new T3D.Mesh(new T3D.ConeGeometry(0.09, 0.16, 12), mat3(PAL.ink)); knot.position.set(x, y - r - 0.06, 0); grp.add(knot);
      polyline3(grp, [[x, y - r - 0.14, 0], [x + 0.12, y - r - 0.5, 0], [x - 0.05, y - r - 0.9, 0], [x + 0.08, y - r - 1.3, 0]], PAL.ink);
      SPOTS.forEach(([sx, sy, sz], j) => { const m = molecule3(v, grp, gas[0], k); m.position.set(x + sx * r * 0.72, y + sy * r * 0.72, sz * r * 0.72); m.rotation.set(j * 0.7, j * 1.1, 0); });
      v.pickable(skin, 'a balloon of ' + WORD[gas[0]] + ', ' + fmt(n, 2) + ' mol');
      v.label(label(gas, n), [x, y - r - 0.2, 0], grp, -30);
    });
  }
  function draw3d() {
    build(); v.invalidate();
    const { ctx } = begin(cnv);
    topline(ctx, head());
    text(ctx, 'at STP: 273.15 K and 1 atm · ' + fmt(N.v, 2) + ' mol and ' + fmt((N.v * R * TSTP) / PSTP, 1) + ' L in each balloon · drag to turn the balloons', 700, 82, PAL.muted, { size: 16, align: 'center' });
  }
  function head() {
    const n = N.v, V = (n * R * TSTP) / PSTP, ps = picks(), same = ps[0] === ps[1] && ps[1] === ps[2];
    return (same ? 'Three balloons of ' + ps[0][0] : 'Balloons of ' + ps.map((g) => g[0]).join(', ')) + ', ' + fmt(n, 2) + ' mol each at STP: ' + ps.map((g) => fmt(n * g[1], 1) + ' g').join(', ') + ', and every balloon holds ' + fmt(V, 1) + ' L.';
  }
  /* one stage shows at a time: the canvas, or the scene with its button row and its strip */
  function show() {
    const three = VIEW.value === '3d';
    if (three && !v) mount();
    d.c.style.display = three ? 'none' : '';
    if (v) [v.wrap, d.stage.querySelector('.view3d-bar'), cnv].forEach((e) => { if (e) e.style.display = three ? '' : 'none'; });
    draw();
  }
  function draw() {
    const n = N.v, V = (n * R * TSTP) / PSTP;
    if (VIEW.value === '3d') draw3d(); else draw2d();
    readout(d.readout, `\\kV = \\frac{\\kn R\\kT}{\\kP} = \\frac{(${hue('amount', fmt(n, 2) + '\\ \\text{mol}')})(${RTEX})(${hue('temperature', '273.15\\ \\text{K}')})}{${hue('pressure', '1\\ \\text{atm}')}} = ${hue('volume', fmt(V, 1) + '\\ \\text{L}')}`,
      Math.abs(n - 1) < 0.001 ? 'One mole of any gas behaving ideally occupies about 22.4 L at STP, the standard molar volume; the gas decides only the mass in the balloon, not its size.'
        : 'The volume follows the amount alone, ' + fmt(22.4 * n, 1) + ' L for ' + fmt(n, 2) + ' mol, whatever the gas; equal volumes of the three gases hold equal numbers of molecules, as Avogadro proposed.');
  }
  register(d.fig, { update: () => {}, draw });
})();
};
