/* Figures for section 10.1 Intermolecular Forces. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['10.1'] = function (root, F) {
const { el, fmt, tex, C, PAL, alpha, ctl, cycle, register, begin, line, dot, text, topline, hbracket, axes, label } = F;
const sim = (id, H) => F.sim(root, id, H);
function readout(host, main, small) { tex(host, main); if (small) host.appendChild(el('small', null, small)); }
const TAU = 2 * Math.PI;
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;
const neg = (x) => (x < 0 ? '−' + fmt(-x, 0) : fmt(x, 0));
const texNum = (x, d = 0) => (x < 0 ? '-' : '') + fmt(Math.abs(x), d);
const T3D = window.THREE;
const { sphere: sphere3, stick: stick3 } = F.mesh;
const palSig = () => [PAL.ink, PAL.panel, PAL.muted, F.el('H'), F.el('O'), F.el('Cl'), F.el('C')].join('|');

/* ---------- vectors, for building molecules in ångströms ---------- */
const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const mul = (a, k) => [a[0] * k, a[1] * k, a[2] * k];
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const unit = (a) => { const n = Math.hypot(a[0], a[1], a[2]) || 1; return mul(a, 1 / n); };
const COS_T = 1 / 3, SIN_T = Math.sqrt(8 / 9), HALF = (109.47 / 2) * Math.PI / 180;
/* the three directions that make the tetrahedral angle with the bond u, turned about u by phi0 from the reference ref */
function tetraOthers(u, ref, phi0 = 0) {
  const p = unit(cross(ref, u)), q = cross(u, p);
  return [0, 1, 2].map((k) => { const f = phi0 + (k * TAU) / 3; return add(mul(u, -COS_T), add(mul(p, SIN_T * Math.cos(f)), mul(q, SIN_T * Math.sin(f)))); });
}
/* the two directions left on a tetrahedral atom that has bonds along the unit vectors a and b */
function tetraPair(a, b) { const m = unit(mul(add(a, b), -1)), w = unit(cross(a, b)); return [add(mul(m, Math.cos(HALF)), mul(w, Math.sin(HALF))), add(mul(m, Math.cos(HALF)), mul(w, -Math.sin(HALF)))]; }
/* a view from yaw about the vertical and pitch about the horizontal: [x, y, depth], depth toward the reader */
function turn(p, yaw, pitch) {
  const x = p[0] * Math.cos(yaw) + p[2] * Math.sin(yaw), z1 = -p[0] * Math.sin(yaw) + p[2] * Math.cos(yaw);
  return [x, p[1] * Math.cos(pitch) - z1 * Math.sin(pitch), p[1] * Math.sin(pitch) + z1 * Math.cos(pitch)];
}
const NAME = { H: 'hydrogen', C: 'carbon', O: 'oxygen', N: 'nitrogen', F: 'fluorine', Cl: 'chlorine', Br: 'bromine', I: 'iodine', At: 'astatine', Ne: 'neon', Ar: 'argon', Kr: 'krypton' };

/* ---------- a molecular scene drawn both ways (book rule: intermolecular forces carry the 2D/3D view choice) ----------
   A scene is atoms {el, p, r, name}, bonds [i, j] drawn as sticks, and dots [a, b], an intermolecular attraction drawn as a
   dotted ink line between two points. The flat drawing is the scene seen from one fixed view, the atoms painted far to near
   so the nearer ones cover the farther; the 3D stage builds the same scene in meshes, mounted on the first switch. */
function drawScene(ctx, sc, o, hits) {
  const P = (p) => { const q = turn(p, o.yaw, o.pitch); return [o.cx + q[0] * o.s, o.cy - q[1] * o.s, q[2]]; };
  const at = sc.atoms.map((a) => ({ ...a, q: P(a.p) }));
  for (const [a, b] of sc.dots) { const A = P(a), B = P(b); line(ctx, A[0], A[1], B[0], B[1], PAL.ink, 5, [1, 11]); }
  for (const [i, j] of sc.bonds) { const A = at[i].q, B = at[j].q; line(ctx, A[0], A[1], B[0], B[1], PAL.muted, 10); }
  at.slice().sort((a, b) => a.q[2] - b.q[2]).forEach((a) => {
    ctx.save(); ctx.fillStyle = F.el(a.el); ctx.strokeStyle = a.el === 'H' ? PAL.ink : alpha(PAL.ink, 0.45); ctx.lineWidth = a.el === 'H' ? 1.6 : 1.2;
    ctx.beginPath(); ctx.arc(a.q[0], a.q[1], a.r * o.s, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore();
  });
  if (hits) at.slice().sort((a, b) => b.q[2] - a.q[2]).forEach((a) => hits.push({ x: a.q[0], y: a.q[1], r: a.r * o.s, name: a.name }));
  return P;
}
function buildScene(v, g, sc, o = {}) {
  sc.atoms.forEach((a) => v.pickable(sphere3(g, a.p, a.r, F.el(a.el)), a.name));
  sc.bonds.forEach(([i, j]) => stick3(g, sc.atoms[i].p, sc.atoms[j].p, 0.09, PAL.muted));
  sc.dots.forEach(([a, b]) => { const L = Math.hypot(...sub(b, a)), n = Math.max(2, Math.round(L / 0.28)); for (let k = 1; k < n; k++) sphere3(g, add(a, mul(sub(b, a), k / n)), o.dot ?? 0.055, PAL.ink); });
}
/* the view choice of such a figure: the flat canvas, or the stage with its buttons and a strip for the headline */
function twoWays(d, H, opts, onShow) {
  const VIEW = F.choice(d.controls, { label: '\\text{view}', options: [{ value: '2d', label: '2D' }, { value: '3d', label: '3D' }], value: '2d', aria: 'a flat drawing or a scene to turn', onInput: () => show() });
  const s = { v: null, g: null, get three() { return VIEW.value === '3d'; } };
  function show() {
    if (s.three && !s.v) { s.v = F.view3d(d.stage, { spin: 'idle', pitch: [-1.2, 1.2], ...opts }); s.g = s.v.part(0); }
    d.c.style.display = s.three ? 'none' : '';
    if (s.v) [s.v.wrap, d.stage.querySelector('.view3d-bar')].forEach((e) => { if (e) e.style.display = s.three ? '' : 'none'; });
    onShow();
  }
  return s;
}

/* =====================================================================
   FIGURE 10.2: three phases of one substance in a flask, in three
   dimensions. The temperature slider sets the average kinetic energy; the
   substance sets how strongly the particles attract, told by its melting
   and boiling points. Below the melting point the particles vibrate about
   the sites of a lattice, between the two points they slide past one
   another in a puddle on the floor, and above the boiling point they fly
   across the whole flask. Moving: the particles' motion is the idea. The
   flask stands on a floor, so the pitch stays between 1° and 69° above
   level; the yaw is free and there is no idle spin, since the particles
   already move.
===================================================================== */
(function () {
  const d = sim('sim-phases');
  const v = F.view3d(d.stage, { spin: 'none', pitch: [0.02, 1.2], tilt: 0.3, views: [{ label: 'front', yaw: 0, pitch: 0.12 }, { label: 'corner', yaw: 0.7, pitch: 0.45 }], h: 400, dist: 4.8 });
  const grp = v.part(0), cnv = F.makeCanvas(d.stage, 230);
  /* the book's halogens from Table 10.1 and three noble gases, each with its normal melting and boiling points in kelvin */
  const SUBS = {
    Ne: { name: 'neon', f: 'Ne', el: 'Ne', two: false, mp: 25, bp: 27 },
    Ar: { name: 'argon', f: 'Ar', el: 'Ar', two: false, mp: 84, bp: 87 },
    Kr: { name: 'krypton', f: 'Kr', el: 'Kr', two: false, mp: 116, bp: 120 },
    F2: { name: 'fluorine', f: 'F_{2}', el: 'F', two: true, mp: 53, bp: 85 },
    Cl2: { name: 'chlorine', f: 'Cl_{2}', el: 'Cl', two: true, mp: 172, bp: 238 },
  };
  const S = F.choice(d.controls, { label: '\\text{substance}', options: Object.keys(SUBS).map((k) => ({ value: k, label: SUBS[k].f.replace('_{2}', '₂') })), value: 'Cl2', aria: 'the substance in the flask', onInput: () => { T.refresh(); } });
  const sub_ = () => SUBS[S.value];
  const T = ctl(d.controls, { label: '\\kT', cls: 'temperature', min: 10, max: 260, step: 1, value: 200, unit: 'K', dec: 0, aria: 'temperature in kelvin',
    specials: [{ at: () => sub_().mp, label: 'melting point' }, { at: () => sub_().bp, label: 'boiling point' }] });
  const W = 0.62, FLOOR = -0.9, TOP = 0.9, R = 0.1, A = 0.23, SLAB = FLOOR + 0.5;
  const N = 27;
  const LAT = [], LIQ = [];
  for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) for (let k = 0; k < 3; k++) LAT.push([(i - 1) * A, FLOOR + R + j * A, (k - 1) * A]);
  const ps = LAT.map((p, i) => ({ x: p.slice(), u: unit([Math.sin(i * 2.3), Math.cos(i * 1.7), Math.sin(i * 0.9 + 1)]), o: unit([1, 0.2 * Math.sin(i), 0.2 * Math.cos(i)]), w: unit([Math.cos(i), Math.sin(i * 3), 0.5]), ph: [i * 1.1, i * 2.3, i * 0.7] }));
  let t = 0;
  const phase = () => { const s = sub_(), T0 = T.v; return T0 < s.mp ? 'solid' : T0 < s.bp ? 'liquid' : 'gas'; };
  function step(dt) {
    t += dt;
    const ph = phase(), T0 = T.v, s = sub_();
    const vg = 0.12 * Math.sqrt(T0 / 10) + 0.1, vl = 0.4 * vg, amp = 0.012 + 0.02 * Math.min(1.2, T0 / s.mp);
    ps.forEach((q, i) => {
      if (ph === 'solid') {
        const L = LAT[i], tg = [L[0] + amp * Math.sin(9 * t + q.ph[0]), L[1] + amp * Math.sin(11 * t + q.ph[1]), L[2] + amp * Math.sin(10 * t + q.ph[2])];
        for (let k = 0; k < 3; k++) q.x[k] += (tg[k] - q.x[k]) * Math.min(1, 5 * dt);
        q.o = unit(add(q.o, mul(sub([1, 0.15 * Math.sin(7 * t + i), 0.15 * Math.cos(8 * t + i)], q.o), Math.min(1, 5 * dt))));
        return;
      }
      const sp = ph === 'gas' ? vg : vl;
      for (let k = 0; k < 3; k++) q.x[k] += q.u[k] * sp * dt;
      const top = ph === 'gas' ? TOP - R : SLAB;
      if (q.x[1] > top) { if (ph === 'liquid') q.x[1] -= Math.min(q.x[1] - top, 1.2 * dt); if (q.u[1] > 0) q.u[1] = -q.u[1]; }
      if (q.x[1] < FLOOR + R) { q.x[1] = FLOOR + R; q.u[1] = Math.abs(q.u[1]); }
      for (const k of [0, 2]) { if (Math.abs(q.x[k]) > W - R) { q.x[k] = Math.sign(q.x[k]) * (W - R); q.u[k] = -Math.sign(q.x[k]) * Math.abs(q.u[k]); } }
      if (ph === 'liquid') q.u = unit(add(q.u, mul([Math.sin(3 * t + q.ph[0]), Math.sin(2.6 * t + q.ph[1]), Math.sin(3.4 * t + q.ph[2])], 0.6 * dt)));
      q.o = unit(add(q.o, mul(cross(q.w, q.o), 2.5 * sp * dt / 0.3)));
    });
    if (phase() === 'liquid') for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
      const a = ps[i].x, b = ps[j].x, dd = sub(b, a), L = Math.hypot(...dd), m = 2.1 * R;
      if (L < m && L > 1e-6) { const push = mul(dd, (m - L) / (2 * L)); for (let k = 0; k < 3; k++) { a[k] -= push[k]; b[k] += push[k]; } }
    }
  }
  let sig = '', ms = [];
  function build() {
    const s = sub_(), key = S.value + '|' + palSig() + F.el(s.el); if (key === sig || !grp) return; sig = key;
    v.clear(); ms = [];
    const glass = new T3D.Mesh(new T3D.BoxGeometry(2 * W, TOP - FLOOR, 2 * W), F.mesh.mat(PAL.ink, { transparent: true, opacity: 0.06, depthWrite: false, side: T3D.DoubleSide }));
    glass.position.set(0, (TOP + FLOOR) / 2, 0); grp.add(glass);
    const e = new T3D.LineSegments(new T3D.EdgesGeometry(new T3D.BoxGeometry(2 * W, TOP - FLOOR, 2 * W)), new T3D.LineBasicMaterial({ color: new T3D.Color(PAL.ink) }));
    e.position.copy(glass.position); grp.add(e);
    const nm = s.two ? 'a ' + s.name + ' molecule, ' + s.f.replace('_{2}', '₂') : 'a ' + s.name + ' atom, ' + s.f;
    ps.forEach(() => {
      const m = new T3D.Group(); grp.add(m);
      if (s.two) { v.pickable(sphere3(m, [-0.07, 0, 0], 0.085, F.el(s.el)), nm); v.pickable(sphere3(m, [0.07, 0, 0], 0.085, F.el(s.el)), nm); }
      else v.pickable(sphere3(m, [0, 0, 0], R, F.el(s.el)), nm);
      ms.push(m);
    });
    v.label('sealed flask', [W, TOP, 0], grp, 6);
  }
  const X1 = new T3D.Vector3(1, 0, 0), tmp = new T3D.Vector3();
  function draw() {
    build();
    ps.forEach((q, i) => { const m = ms[i]; if (!m) return; m.position.set(q.x[0], q.x[1], q.x[2]); m.quaternion.setFromUnitVectors(X1, tmp.set(q.o[0], q.o[1], q.o[2])); });
    v.invalidate();
    const s = sub_(), T0 = T.v, ph = phase(), ct = C('temperature');
    const { ctx } = begin(cnv);
    const X = (k) => 110 + (k / 260) * 1180, y = 150;
    line(ctx, X(0), y, X(260), y, PAL.ink, 3);
    for (let k = 0; k <= 260; k += 20) { line(ctx, X(k), y, X(k), y + 9, PAL.ink, 2); if (k % 40 === 0 && Math.abs(k - T0) > 12) text(ctx, String(k), X(k), y + 26, PAL.muted, { size: 16, align: 'center' }); }
    text(ctx, 'K', X(260) + 22, y + 26, ct, { size: 16 });
    line(ctx, X(s.mp), y - 34, X(s.mp), y, PAL.ink, 3); line(ctx, X(s.bp), y - 34, X(s.bp), y, PAL.ink, 3);
    const close = s.bp - s.mp < 25;
    text(ctx, 'melts ' + s.mp + ' K', X(s.mp) - 8, y - 48, PAL.ink, { size: 16, align: 'right' });
    text(ctx, 'boils ' + s.bp + ' K', X(s.bp) + 8, y - 48, PAL.ink, { size: 16, align: 'left' });
    text(ctx, 'solid', (X(10) + X(s.mp)) / 2, y - 16, PAL.muted, { size: 17, align: 'center' });
    if (!close) text(ctx, 'liquid', (X(s.mp) + X(s.bp)) / 2, y - 16, PAL.muted, { size: 17, align: 'center' });
    if (X(260) - X(s.bp) > 60) text(ctx, 'gas', (X(s.bp) + X(260)) / 2, y - 16, PAL.muted, { size: 17, align: 'center' });
    ctx.save(); ctx.fillStyle = ct; ctx.beginPath(); ctx.moveTo(X(T0), y + 4); ctx.lineTo(X(T0) - 11, y + 44); ctx.lineTo(X(T0) + 11, y + 44); ctx.closePath(); ctx.fill(); ctx.restore();
    text(ctx, 'T = ' + T0 + ' K', Math.min(Math.max(X(T0), 80), 1320), y + 62, ct, { size: 20, weight: 600, align: 'center' });
    const WHAT = { solid: 'a solid: the particles vibrate about fixed positions', liquid: 'a liquid: the particles move past each other but stay in contact', gas: 'a gas: the particles move independently and fill the flask' };
    topline(ctx, 'At ' + T0 + ' K ' + s.name + ' is ' + WHAT[ph] + '.');
    const mp = hue('temperature', s.mp + '\\ \\text{K}'), bp = hue('temperature', s.bp + '\\ \\text{K}'), tt = `\\kT = ${hue('temperature', T0 + '\\ \\text{K}')}`;
    const main = ph === 'solid' ? `${tt} < ${mp}\\ \\text{(melting point)}` : ph === 'liquid' ? `\\text{melting point } ${mp} \\le ${tt} < ${bp}\\ \\text{(boiling point)}` : `${tt} \\ge ${bp}\\ \\text{(boiling point)}`;
    readout(d.readout, main, 'The stronger the attractions between the particles of a substance, the higher the temperature, and so the greater the average kinetic energy, needed to melt it and to boil it.');
  }
  const clk = cycle(() => Infinity, 0);
  register(d.fig, { update: (dt) => { clk.step(dt, () => 1); step(dt); }, draw });
})();

/* =====================================================================
   FIGURE 10.5: two HCl molecules, the covalent bond within each and the
   weak attraction between them. Still: nothing in the idea varies. Built
   both ways behind the view choice, the flat drawing first; the scene has
   no ground and turns freely within 69° of level.
===================================================================== */
(function () {
  const d = sim('sim-intra-inter', 420);
  const sc = {
    atoms: [
      { el: 'Cl', p: [-2.6, 0, 0], r: 0.62, name: 'a chlorine atom, Cl' }, { el: 'H', p: [-1.33, 0, 0], r: 0.36, name: 'a hydrogen atom, H' },
      { el: 'Cl', p: [1.07, 0, 0], r: 0.62, name: 'a chlorine atom, Cl' }, { el: 'H', p: [2.34, 0, 0], r: 0.36, name: 'a hydrogen atom, H' },
    ],
    bonds: [[0, 1], [2, 3]], dots: [[[-0.93, 0, 0], [0.41, 0, 0]]],
  };
  sc.atoms.forEach((a) => { a.p[0] += 0.13; });
  sc.dots[0] = sc.dots[0].map((p) => [p[0] + 0.13, p[1], p[2]]);
  const hits = []; F.hover(d.stage, () => hits);
  const HEAD = 'Each HCl molecule is held together by a strong covalent bond; the two molecules attract each other only weakly.';
  const two = twoWays(d, 420, { h: 380, dist: 8, views: [{ label: 'side', yaw: 0, pitch: 0 }, { label: 'end on', yaw: Math.PI / 2, pitch: 0 }] }, () => draw());
  let sig = '';
  function draw() {
    if (two.three) {
      const key = palSig(); if (key !== sig && two.g) { sig = key; two.v.clear(); buildScene(two.v, two.g, sc);
        two.v.label('intramolecular force (strong)', [-1.84, -0.7, 0], two.g, -30); two.v.label('intermolecular force (weak)', [-0.1, -0.5, 0], two.g, -30); two.v.headline(HEAD); }
      two.v?.invalidate();
    } else {
      const { ctx } = begin(d.c); hits.length = 0;
      const o = { yaw: 0, pitch: 0, cx: 700, cy: 230, s: 130 };
      const P = drawScene(ctx, sc, o, hits);
      const [bx, by] = P([-1.84, 0, 0]), [ix, iy] = P([-0.1, 0, 0]);
      label(ctx, 'intramolecular force (strong)', bx, by + 8, { side: 'below', leader: true, size: 20, gap: 0.62 * o.s + 30 });
      label(ctx, 'intermolecular force (weak)', ix, iy - 8, { side: 'above', leader: true, size: 20, gap: 0.62 * o.s + 10 });
      text(ctx, 'H', P([2.47, 0, 0])[0], iy, PAL.ink, { size: 20, weight: 600, align: 'center' });
      text(ctx, 'Cl', P([1.2, 0, 0])[0], iy, PAL.panel, { size: 22, weight: 600, align: 'center' });
      text(ctx, 'H', P([-1.2, 0, 0])[0], iy, PAL.ink, { size: 20, weight: 600, align: 'center' });
      text(ctx, 'Cl', P([-2.47, 0, 0])[0], iy, PAL.panel, { size: 22, weight: 600, align: 'center' });
      topline(ctx, HEAD);
    }
    readout(d.readout, '17\\ \\text{kJ} \\ll 430\\ \\text{kJ}\\quad (\\text{about 25 times more})', 'About 17 kJ overcomes the intermolecular forces in one mole of liquid HCl, but breaking the covalent bonds in one mole of HCl takes about 430 kJ.');
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 10.6: the dispersion force between two nonpolar diatomic
   molecules. The electrons of the left molecule shift from end to end on
   a clock, and the neighbor's electrons follow a moment later, so that
   the facing ends always carry opposite partial charges. Moving: the
   dipoles are "rapidly fluctuating". The halogen choice sets the size of
   the molecules (Table 10.1's atomic radii) and how far the electrons
   shift, the polarizability; the readout gives the halogen's melting and
   boiling points. Flat: the charge shifts along one axis.
===================================================================== */
(function () {
  const d = sim('sim-dispersion', 470);
  const HAL = [
    { v: 'F', f: 'F_{2}', name: 'fluorine', r: 72, mp: 53, bp: 85 }, { v: 'Cl', f: 'Cl_{2}', name: 'chlorine', r: 99, mp: 172, bp: 238 },
    { v: 'Br', f: 'Br_{2}', name: 'bromine', r: 114, mp: 266, bp: 332 }, { v: 'I', f: 'I_{2}', name: 'iodine', r: 133, mp: 387, bp: 457 },
    { v: 'At', f: 'At_{2}', name: 'astatine', r: 150, mp: 575, bp: 610 },
  ];
  const X = F.choice(d.controls, { label: '\\text{halogen}', options: HAL.map((h) => ({ value: h.v, label: h.f.replace('_{2}', '₂') })), value: 'Cl', aria: 'the halogen' });
  const hal = () => HAL.find((h) => h.v === X.value);
  const hits = []; F.hover(d.stage, () => hits);
  let t = 0;
  const pulse = (u) => 0.62 * Math.sin(2.1 * u) + 0.38 * Math.sin(3.4 * u + 1.2);
  function molecule(ctx, cx, cy, ra, s, h) {
    const dx = ra * 0.62, x0 = cx - dx - ra, x1 = cx + dx + ra, xb = cx + s * dx;
    const shape = () => { ctx.beginPath(); ctx.arc(cx - dx, cy, ra, 0, TAU); ctx.arc(cx + dx, cy, ra, 0, TAU); };
    const a = Math.min(0.92, 0.18 + 0.9 * Math.abs(s));
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(cx - dx, cy, ra, 0, TAU); ctx.stroke(); ctx.beginPath(); ctx.arc(cx + dx, cy, ra, 0, TAU); ctx.stroke(); ctx.restore();
    ctx.save(); shape(); ctx.clip();
    ctx.fillStyle = PAL.panel; ctx.fillRect(x0 - 2, cy - ra - 2, x1 - x0 + 4, 2 * ra + 4);
    ctx.globalAlpha = a;
    ctx.fillStyle = s >= 0 ? F.cat(0) : F.cat(1); ctx.fillRect(x0 - 2, cy - ra - 2, xb - x0 + 2, 2 * ra + 4);
    ctx.fillStyle = s >= 0 ? F.cat(1) : F.cat(0); ctx.fillRect(xb, cy - ra - 2, x1 - xb + 2, 2 * ra + 4);
    ctx.restore();
    dot(ctx, cx - dx, cy, PAL.ink, true, 7); dot(ctx, cx + dx, cy, PAL.ink, true, 7);
    hits.push({ x: cx - dx, y: cy, r: ra, name: 'a ' + h.name + ' atom, ' + h.v }, { x: cx + dx, y: cy, r: ra, name: 'a ' + h.name + ' atom, ' + h.v });
    if (Math.abs(s) > 0.2) {
      text(ctx, s > 0 ? 'δ+' : 'δ−', x0 + 30, cy, PAL.ink, { size: 24, weight: 600, align: 'center' });
      text(ctx, s > 0 ? 'δ−' : 'δ+', x1 - 30, cy, PAL.ink, { size: 24, weight: 600, align: 'center' });
    }
    return { x0, x1 };
  }
  function draw() {
    const { ctx } = begin(d.c); hits.length = 0;
    const h = hal(), ra = h.r * 0.62, amp = Math.min(1, Math.pow(h.r / 150, 1.6));
    const s1 = amp * pulse(t), s2 = 0.85 * amp * pulse(t - 0.18), gap = 110;
    const width = 2 * (2 * ra * 1.62) + gap, cxA = 700 - width / 2 + ra * 1.62, cxB = 700 + width / 2 - ra * 1.62, cy = 230;
    const A = molecule(ctx, cxA, cy, ra, s1, h), B = molecule(ctx, cxB, cy, ra, s2, h);
    const k = Math.min(1, Math.abs(s1 * s2) / (0.25 * amp * amp + 0.02));
    F.faded(ctx, 0.15 + 0.85 * k, [0, 0], () => { line(ctx, A.x1 + 16, cy, B.x0 - 16, cy, PAL.ink, 7, [1, 16]); });
    label(ctx, 'attractive force', (A.x1 + B.x0) / 2, cy - 10, { side: 'above', leader: true, size: 20, gap: ra + 6 });
    const yb = cy + ra + 30;
    hbracket(ctx, A.x0, A.x1, yb, PAL.ink); hbracket(ctx, B.x0, B.x1, yb, PAL.ink);
    text(ctx, 'temporary dipoles', 700, yb + 34, PAL.ink, { size: 20, align: 'center' });
    const ly = 440;
    dot(ctx, 440, ly, F.cat(0), true, 11); text(ctx, 'δ+, fewer electrons', 460, ly, PAL.ink, { size: 18 });
    dot(ctx, 760, ly, F.cat(1), true, 11); text(ctx, 'δ−, more electrons', 780, ly, PAL.ink, { size: 18 });
    topline(ctx, 'Two ' + h.name + ' molecules, ' + h.f + ': the larger the atoms, the farther their electrons shift and the stronger the attraction.');
    readout(d.readout, `\\text{${h.f.replace('_{2}', '}_2\\text{')}}:\\ \\text{atomic radius } ${h.r}\\ \\text{pm},\\ \\text{melting point } ${hue('temperature', h.mp + '\\ \\text{K}')},\\ \\text{boiling point } ${hue('temperature', h.bp + '\\ \\text{K}')}`);
  }
  const clk = cycle(() => Infinity, 0);
  register(d.fig, { update: (dt) => { clk.step(dt, () => 1); t += dt; }, draw });
})();

/* =====================================================================
   FIGURE 10.7: the three pentane isomers, each molecule above its mirror
   image, space-filling in the element palette, with the contact between
   them drawn as the book's jagged band. Still: the atoms bend from one
   isomer into the next when the choice changes. Built both ways behind
   the view choice, the flat drawing first; the scene has no ground and
   turns freely within 69° of level.
===================================================================== */
(function () {
  const d = sim('sim-pentanes', 600);
  const CC = 1.54, CH = 1.09, RC = 1.7, RH = 1.2, Y = [0, 1, 0], XV = [1, 0, 0];
  /* carbons and their neighbors, then the hydrogens that complete each carbon's four bonds, in carbon order */
  function alkane(cs, nb) {
    const hs = [];
    cs.forEach((c, i) => {
      const us = nb[i].map((j) => unit(sub(cs[j], c)));
      let dirs = [];
      if (us.length === 1) dirs = tetraOthers(us[0], Math.abs(us[0][1]) > 0.9 ? XV : Y, 0.3);
      else if (us.length === 2) dirs = tetraPair(us[0], us[1]);
      else if (us.length === 3) dirs = [unit(mul(add(add(us[0], us[1]), us[2]), -1))];
      dirs.forEach((u) => hs.push(add(c, mul(u, CH))));
    });
    return [...cs, ...hs];
  }
  const zig = (i, n) => [(i - (n - 1) / 2) * CC * Math.sin(HALF), 0, (i % 2 ? 0.5 : -0.5) * CC * Math.cos(HALF)];
  const nC = [0, 1, 2, 3, 4].map((i) => zig(i, 5));
  const N_PENT = alkane(nC, [[1], [0, 2], [1, 3], [2, 4], [3]]);
  const iC = [0, 1, 2, 3].map((i) => zig(i, 4));
  const br = tetraPair(unit(sub(iC[0], iC[1])), unit(sub(iC[2], iC[1]))).find((u) => u[1] > 0);
  iC.push(add(iC[1], mul(br, CC)));
  const ISO = alkane(iC, [[1], [0, 2, 4], [1, 3], [2], [1]]);
  const tet = [[0, 1, 0], ...[90, 210, 330].map((a) => [SIN_T * Math.cos((a * Math.PI) / 180), -COS_T, SIN_T * Math.sin((a * Math.PI) / 180)])];
  const NEO = alkane([[0, 0, 0], ...tet.map((u) => mul(u, CC))], [[1, 2, 3, 4], [0], [0], [0], [0]]);
  /* each molecule is stood on its contact: centred across, its lowest surface a little above the plane of contact */
  function stand(pts) {
    const cx = pts.reduce((s, p) => s + p[0], 0) / pts.length, cz = pts.reduce((s, p) => s + p[2], 0) / pts.length;
    const low = Math.min(...pts.map((p, i) => p[1] - (i < 5 ? RC : RH)));
    return pts.map((p) => [p[0] - cx, p[1] - low + 0.1, p[2] - cz]);
  }
  const ISOS = {
    neo: { name: 'neopentane', f: 'neopentane', bp: 9.5, head: 'small contact area, weakest attraction', pts: stand(NEO) },
    iso: { name: 'isopentane', f: 'isopentane', bp: 27, head: 'less surface area, less attraction', pts: stand(ISO) },
    n: { name: 'n-pentane', f: 'n-pentane', bp: 36, head: 'large contact area, strong attraction', pts: stand(N_PENT) },
  };
  /* one scale for the flat drawing, from the tallest isomer: its molecule and its image span 2 × TALL Å, 470 units of the canvas */
  const TALL = Math.max(...Object.values(ISOS).map((q) => Math.max(...q.pts.map((p, i) => p[1] + (i < 5 ? RC : RH) + 0.1 * Math.abs(p[2])))));
  const K = F.choice(d.controls, { label: '\\text{isomer}', options: [{ value: 'neo', label: 'neopentane' }, { value: 'iso', label: 'isopentane' }, { value: 'n', label: 'n-pentane' }], value: 'n', aria: 'the pentane isomer', onInput: () => draw() });
  const hits = []; F.hover(d.stage, () => hits);
  const two = twoWays(d, 600, { h: 520, dist: 26, spin: 'off', views: [{ label: 'side', yaw: 0, pitch: 0 }, { label: 'end on', yaw: Math.PI / 2, pitch: 0 }] }, () => draw());
  const atomName = (i, m) => (i < 5 ? 'a carbon atom of ' : 'a hydrogen atom of ') + m;
  function sceneOf(pts, m) {
    const atoms = [];
    pts.forEach((p, i) => atoms.push({ el: i < 5 ? 'C' : 'H', p, r: i < 5 ? RC : RH, name: atomName(i, m) }));
    pts.forEach((p, i) => atoms.push({ el: i < 5 ? 'C' : 'H', p: [p[0], -p[1], p[2]], r: i < 5 ? RC : RH, name: atomName(i, m) }));
    return { atoms, bonds: [], dots: [] };
  }
  /* the width of the facing surface: the atoms whose undersides lie within 0.7 Å of the lowest */
  function contact(pts) {
    const low = pts.map((p, i) => p[1] - (i < 5 ? RC : RH)), m = Math.min(...low);
    const near = pts.filter((p, i) => low[i] < m + 0.7);
    return [Math.min(...near.map((p) => p[0])) - 0.8, Math.max(...near.map((p) => p[0])) + 0.8];
  }
  function band(ctx, x0, x1, y) {
    ctx.save(); ctx.strokeStyle = C('area'); ctx.lineWidth = 5; ctx.beginPath();
    for (let x = x0, i = 0; x <= x1; x += 9, i++) { const yy = y + (i % 2 ? -5 : 5); if (i) ctx.lineTo(x, yy); else ctx.moveTo(x, yy); }
    ctx.stroke(); ctx.restore();
  }
  let sig = '';
  function draw() {
    const iso = ISOS[K.value], flat = K.mix((v) => ISOS[v].pts.flat()), pts = [];
    for (let i = 0; i < flat.length; i += 3) pts.push([flat[i], flat[i + 1], flat[i + 2]]);
    const [c0, c1] = contact(pts), head = iso.name + ': ' + iso.head + ', boiling point ' + fmt(iso.bp, iso.bp % 1 ? 1 : 0) + ' °C.';
    if (two.three) {
      const key = K.value + palSig() + C('area');
      if (key !== sig && two.g) {
        sig = key; two.v.clear(); buildScene(two.v, two.g, sceneOf(iso.pts, iso.name));
        const cc = contact(iso.pts);
        F.mesh.box(two.g, [(cc[0] + cc[1]) / 2, 0, 0], [cc[1] - cc[0], 0.04, 3.2], C('area'), { transparent: true, opacity: 0.5 });
        two.v.label('contact', [Math.max(...iso.pts.map((p, i) => p[0] + (i < 5 ? RC : RH))) + 0.4, 0, 0], two.g, -12); two.v.headline(/^n-/.test(head) ? head : head.charAt(0).toUpperCase() + head.slice(1));
      }
      two.v?.invalidate();
    } else {
      const { ctx } = begin(d.c); hits.length = 0;
      const o = { yaw: 0.35, pitch: 0.1, cx: 700, cy: 340, s: Math.min(44, 235 / TALL) };
      drawScene(ctx, sceneOf(pts, iso.name), o, hits);
      const Pc0 = turn([c0, 0, 0], o.yaw, o.pitch), Pc1 = turn([c1, 0, 0], o.yaw, o.pitch);
      band(ctx, o.cx + Pc0[0] * o.s, o.cx + Pc1[0] * o.s, o.cy - Pc0[1] * o.s);
      label(ctx, 'contact', o.cx + Pc1[0] * o.s + 6, o.cy, { side: 'right', size: 20 });
      topline(ctx, /^n-/.test(head) ? head : head.charAt(0).toUpperCase() + head.slice(1));
    }
    readout(d.readout, `\\text{boiling point of ${iso.name.replace('n-', '\\textit{n}-')}} = ${hue('temperature', fmt(iso.bp, iso.bp % 1 ? 1 : 0) + '\\ ^\\circ\\text{C}')}`,
      'All three isomers are C₅H₁₂, so their molecules have the same mass; the longer the contact between neighboring molecules, the stronger the dispersion forces and the higher the boiling point.');
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 10.9: two arrangements of polar HCl molecules that bring the
   partial negative end of one molecule next to the partial positive end
   of another: in a line, and side by side and antiparallel. A faithful
   still: nothing in it varies. The ends take the categorical pair of the
   chapter, the δ+ end F.cat(0) and the δ− end F.cat(1).
===================================================================== */
(function () {
  const d = sim('fig-dipoles', 440);
  const hits = []; F.hover(d.stage, () => hits);
  function dipole(ctx, cx, cy, flip) {
    const rp = 34, rn = 52, dx = 40, sgn = flip ? -1 : 1, xp = cx - sgn * dx, xn = cx + sgn * dx;
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(xp, cy, rp, 0, TAU); ctx.stroke(); ctx.beginPath(); ctx.arc(xn, cy, rn, 0, TAU); ctx.stroke(); ctx.restore();
    ctx.save(); ctx.beginPath(); ctx.arc(xp, cy, rp, 0, TAU); ctx.arc(xn, cy, rn, 0, TAU); ctx.clip();
    ctx.fillStyle = flip ? F.cat(1) : F.cat(0); ctx.fillRect(cx - 200, cy - rn - 2, 200, 2 * rn + 4);
    ctx.fillStyle = flip ? F.cat(0) : F.cat(1); ctx.fillRect(cx, cy - rn - 2, 200, 2 * rn + 4);
    ctx.restore();
    text(ctx, 'δ+', xp - sgn * 4, cy, PAL.panel, { size: 24, weight: 600, align: 'center' });
    text(ctx, 'δ−', xn + sgn * 8, cy, PAL.panel, { size: 24, weight: 600, align: 'center' });
    hits.push({ x: xp, y: cy, r: rp, name: 'the hydrogen end of an HCl molecule, δ+' }, { x: xn, y: cy, r: rn, name: 'the chlorine end of an HCl molecule, δ−' });
    return { l: cx - dx - (flip ? rn : rp), r: cx + dx + (flip ? rp : rn), xp, xn };
  }
  function draw() {
    const { ctx } = begin(d.c); hits.length = 0;
    const cy = 200, a = dipole(ctx, 190, cy, false), b = dipole(ctx, 470, cy, false);
    line(ctx, a.r + 12, cy, b.l - 12, cy, PAL.ink, 6, [1, 14]);
    const u = dipole(ctx, 1000, 150, false), w = dipole(ctx, 1000, 290, true);
    line(ctx, u.xp, 150 + 40, w.xn, 290 - 56, PAL.ink, 6, [1, 14]);
    line(ctx, u.xn, 150 + 56, w.xp, 290 - 40, PAL.ink, 6, [1, 14]);
    label(ctx, 'attraction', (a.r + b.l) / 2, cy - 8, { side: 'above', leader: true, size: 20 });
    text(ctx, 'in a line', 330, 320, PAL.muted, { size: 18, align: 'center' });
    text(ctx, 'side by side', 1000, 390, PAL.muted, { size: 18, align: 'center' });
    dot(ctx, 470, 415, F.cat(0), true, 11); text(ctx, 'δ+ end (H)', 490, 415, PAL.ink, { size: 18 });
    dot(ctx, 700, 415, F.cat(1), true, 11); text(ctx, 'δ− end (Cl)', 720, 415, PAL.ink, { size: 18 });
    topline(ctx, 'Polar HCl molecules attract where the δ− end of one molecule meets the δ+ end of another.');
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 10.10: five water molecules joined by hydrogen bonds. The central
   molecule donates its two hydrogen atoms to two neighbors and accepts one
   from each of two others, so its four hydrogen bonds point toward the
   corners of a tetrahedron, as they do in ice; the free hydrogen atoms of
   the outer molecules reach toward molecules beyond. Still. Built both
   ways behind the view choice, the flat drawing first; the cluster has no
   ground and turns freely within 69° of level.
===================================================================== */
(function () {
  const d = sim('sim-hbond', 560);
  const OH = 0.96, OO = 2.8;
  const t = [[1, 1, 1], [-1, -1, 1], [1, -1, -1], [-1, 1, -1]].map(unit);
  const atoms = [], bonds = [], dots = [];
  const water = (o, h1, h2) => { const i = atoms.length; atoms.push({ el: 'O', p: o, r: 0.42, name: 'an oxygen atom of a water molecule' }, { el: 'H', p: h1, r: 0.28, name: 'a hydrogen atom of a water molecule' }, { el: 'H', p: h2, r: 0.28, name: 'a hydrogen atom of a water molecule' }); bonds.push([i, i + 1], [i, i + 2]); return i; };
  water([0, 0, 0], mul(t[0], OH), mul(t[1], OH));
  [0, 1].forEach((k) => {
    const o = mul(t[k], OO), hs = tetraOthers(mul(t[k], -1), Math.abs(t[k][1]) > 0.9 ? [1, 0, 0] : [0, 1, 0], 0.4).slice(0, 2).map((u) => add(o, mul(u, OH)));
    water(o, hs[0], hs[1]); dots.push([mul(t[k], OH + 0.3), sub(o, mul(t[k], 0.45))]);
    hs.forEach((h) => dots.push([add(h, mul(unit(sub(h, o)), 0.35)), add(h, mul(unit(sub(h, o)), 1.5))]));
  });
  [2, 3].forEach((k) => {
    const o = mul(t[k], OO), h1 = mul(t[k], OO - OH), h2 = add(o, mul(tetraOthers(mul(t[k], -1), [0, 1, 0], 0.9)[0], OH));
    water(o, h1, h2); dots.push([mul(t[k], OO - OH - 0.3), mul(t[k], 0.45)]);
    dots.push([add(h2, mul(unit(sub(h2, o)), 0.35)), add(h2, mul(unit(sub(h2, o)), 1.5))]);
  });
  const sc = { atoms, bonds, dots };
  const hits = []; F.hover(d.stage, () => hits);
  const HEAD = 'Hydrogen bonds join each hydrogen atom of one water molecule to an oxygen atom of another.';
  const two = twoWays(d, 560, { h: 480, dist: 20, views: [{ label: 'front', yaw: 0.5, pitch: 0.3 }, { label: 'down a bond', yaw: Math.PI / 4, pitch: Math.atan(1 / Math.SQRT2) }] }, () => draw());
  let sig = '';
  function draw() {
    if (two.three) {
      const key = palSig(); if (key !== sig && two.g) { sig = key; two.v.clear(); two.g.position.y = -0.6; buildScene(two.v, two.g, sc); two.v.headline(HEAD); two.v.setView(0.5, 0.3); }
      two.v?.invalidate();
    } else {
      const { ctx } = begin(d.c); hits.length = 0;
      const o = { yaw: 0.5, pitch: 0.3, cx: 640, cy: 345, s: 66 };
      const P = drawScene(ctx, sc, o, hits);
      const [hx, hy] = P(dots[0][0].map((c, i) => (c + dots[0][1][i]) / 2));
      label(ctx, 'hydrogen bond', hx, hy, { side: 'right', leader: true, size: 20, gap: 90 });
      const [bx, by] = P(mul(add(atoms[0].p, atoms[2].p), 0.5));
      label(ctx, 'covalent bond', bx, by, { side: 'left', leader: true, size: 20, gap: 110 });
      topline(ctx, HEAD);
    }
    readout(d.readout, '\\text{H}_2\\text{O}\\cdots\\text{HOH}', 'The central molecule forms four hydrogen bonds, two through its own hydrogen atoms and two through the lone pairs of its oxygen atom.');
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 10.11 + 10.12: the boiling points of the binary hydrides of
   groups 14 to 17 against the period. The choice moves the three
   period-2 points from where the heavier hydrides' trends predict them
   (the text's −120, −80 and −110 °C) to where they are measured, and the
   lines bend with them; the carbon family of Example 10.1, which has no
   hydrogen bonding, stays on its trend. Still. The families are the
   section's referents, each in its F.ref; the temperature axis wears its hue.
===================================================================== */
(function () {
  const d = sim('sim-hydrides', 560);
  /* measured normal boiling points, °C, periods 2 to 5; pred is the text's prediction for period 2 */
  const FAM = [
    { id: 'group-14', name: 'carbon family (group 14)', f: ['CH_{4}', 'SiH_{4}', 'GeH_{4}', 'SnH_{4}'], bp: [-161, -112, -88, -52], pred: -161 },
    { id: 'group-15', name: 'nitrogen family (group 15)', f: ['NH_{3}', 'PH_{3}', 'AsH_{3}', 'SbH_{3}'], bp: [-33, -88, -62, -17], pred: -120 },
    { id: 'group-16', name: 'oxygen family (group 16)', f: ['H_{2}O', 'H_{2}S', 'H_{2}Se', 'H_{2}Te'], bp: [100, -60, -41, -2], pred: -80 },
    { id: 'group-17', name: 'halogen family (group 17)', f: ['HF', 'HCl', 'HBr', 'HI'], bp: [20, -85, -67, -35], pred: -110 },
  ];
  const M = F.choice(d.controls, { label: '\\text{period 2}', options: [{ value: 'trend', label: 'predicted from the trend' }, { value: 'measured', label: 'measured' }], value: 'trend', aria: 'predicted or measured boiling points of the period 2 hydrides' });
  const hits = []; F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c); hits.length = 0;
    const ct = C('temperature'), box = { l: 170, r: 1000, t: 100, b: 490 };
    /* fixed axes: periods 1 to 6, −200 °C to 150 °C by 50 */
    const g = axes(ctx, box, [1, 6], [-200, 150], { xl: 'Period', yl: 'Boiling point (°C)', yc: ct, nx: 5, ny: 7 });
    const p2 = M.mix((v) => FAM.map((fm) => (v === 'trend' ? fm.pred : fm.bp[0])));
    const meas = M.value === 'measured';
    FAM.forEach((fm, i) => {
      const col = F.ref(fm.id), ys = [p2[i], ...fm.bp.slice(1)];
      for (let k = 0; k < 3; k++) line(ctx, g.X(k + 2), g.Y(ys[k]), g.X(k + 3), g.Y(ys[k + 1]), col, 4, k === 0 && !meas && i > 0 ? [10, 10] : undefined);
      ys.forEach((y, k) => {
        const hollow = k === 0 && !meas && i > 0;
        dot(ctx, g.X(k + 2), g.Y(y), col, !hollow, 9);
        hits.push({ x: g.X(k + 2), y: g.Y(y), r: 14, name: fm.f[k].replace(/_\{(\d)\}/g, (m, n) => '₀₁₂₃₄₅'[n]) + (hollow ? ', predicted about ' : ', boils at ') + neg(y) + ' °C' });
      });
    });
    /* the period-2 names beside their points, spread apart where two points lie close (HF and NH₃ as predicted) */
    const p2names = FAM.map((fm, i) => ({ s: i && !meas ? fm.f[0] + ' ?' : fm.f[0], y: g.Y(p2[i]), col: F.ref(fm.id) })).sort((a, b) => a.y - b.y);
    p2names.forEach((q, i) => { if (i && q.y < p2names[i - 1].y + 26) q.y = p2names[i - 1].y + 26; text(ctx, q.s, g.X(2) - 18, q.y, q.col, { size: 18, weight: 600, align: 'right', bg: PAL.panel }); });
    FAM.forEach((fm, i) => { const y = 150 + i * 40; dot(ctx, 1060, y, F.ref(fm.id), true, 9); text(ctx, fm.name, 1080, y, PAL.ink, { size: 17 }); });
    topline(ctx, meas ? 'Measured, H_{2}O boils at 100 °C, HF at 20 °C and NH_{3} at −33 °C, far above the trends of the heavier hydrides.'
      : 'The trends of the heavier hydrides predict that H_{2}O boils near −80 °C, HF near −110 °C and NH_{3} near −120 °C.');
    readout(d.readout, meas ? `\\text{boiling point of H}_2\\text{O} = ${hue('temperature', '100\\ ^\\circ\\text{C}')}` : `\\text{boiling point of H}_2\\text{O} \\approx ${hue('temperature', texNum(-80) + '\\ ^\\circ\\text{C}')}`,
      meas ? 'Hydrogen bonding lifts the boiling points of NH₃, H₂O and HF far above the trends; CH₄, which cannot form hydrogen bonds, stays on its trend.'
        : 'Down each group the molecules grow larger and their dispersion forces stronger, so the boiling points of periods 3 to 5 rise steadily.');
  }
  register(d.fig, { update: () => {}, draw });
})();
};
