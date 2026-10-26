/* Figures for section 18.2 Occurrence and Preparation of the Representative Metals. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['18.2'] = function (root, F) {
const { PAL, alpha, register, begin, text, dot } = F;
const sim = (id, H) => F.sim(root, id, H);
const clamp01 = (x) => Math.min(1, Math.max(0, x));
const lerp = (a, b, k) => a + (b - a) * k;
const lerp3 = (a, b, k) => a.map((c, i) => lerp(c, b[i], k));
const rnd = (k, j) => { const s = Math.sin(k * 127.1 + j * 311.7) * 43758.5453; return s - Math.floor(s); };
const ease = F.ease.smooth;
/* a point at radius r and height y in the back half of a cell cut through its axis, a from 0 (right) to π (left) */
const polar = (r, y, a) => [r * Math.cos(a), y, -r * Math.sin(a)];
/* ion radii in scene units: 0.04 + 0.00035 × the radius in pm */
const rad = (pm) => 0.04 + 0.00035 * pm;
const HIDE = [0, -50, 0];

/* a path through points, walked by arc length */
function path(pts) {
  const seg = pts.slice(1).map((p, i) => Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1], p[2] - pts[i][2])), L = seg.reduce((a, b) => a + b, 0);
  return { L, at(k) { let s = clamp01(k) * L, i = 0; while (i < seg.length - 1 && s > seg[i]) { s -= seg[i]; i++; } return lerp3(pts[i], pts[i + 1], Math.min(1, s / (seg[i] || 1))); } };
}
/* a walk through timed legs: legs [[t0, t1, from, to]], the position at time t, or null outside them */
function legs(list, t) {
  for (const [t0, t1, a, b] of list) if (t >= t0 && t <= t1) return typeof a === 'function' ? a(ease((t - t0) / (t1 - t0))) : lerp3(a, b, ease((t - t0) / (t1 - t0)));
  return null;
}

/* the materials of a cut-away cell, recomputed when the theme or the colour switches change */
const grey = (k) => F.mixColor(PAL.ink, PAL.panel, k);
/* graphite and the molten metals in their own colours, the same in both themes */
const GRAPHITE = '#3a3d42', MOLTEN_METAL = '#c9ced6';
const palSig = (els) => [PAL.ink, PAL.panel, PAL.muted, PAL.soft, ...els.map((e) => F.el(e))].join('|');

function kit(v, grp) {
  const T3 = window.THREE;
  const mat = (color, extra = {}) => F.mesh.mat(color, { side: T3.DoubleSide, ...extra });
  const glass = { transparent: true, opacity: 0.12, depthWrite: false };
  /* a solid of revolution cut in half through its axis: the back half and its two cut faces */
  function lathe(prof, color, extra, name) {
    const pts = prof.map(([r, y]) => new T3.Vector2(r, y));
    const body = new T3.Mesh(new T3.LatheGeometry([...pts, pts[0]], 64, Math.PI / 2, Math.PI), mat(color, extra));
    grp.add(body);
    const cap = new T3.ShapeGeometry(new T3.Shape(pts));
    const faces = [1, -1].map((s) => { const m = new T3.Mesh(cap, mat(color, extra)); m.scale.x = s; grp.add(m); return m; });
    if (name) [body, ...faces].forEach((m) => v.pickable(m, name));
    return [body, ...faces];
  }
  function box(p, size, color, extra, name) {
    const m = new T3.Mesh(new T3.BoxGeometry(1, 1, 1), mat(color, extra));
    m.position.set(...p); m.scale.set(...size); grp.add(m);
    if (name) v.pickable(m, name);
    return m;
  }
  function tube(pts, r, color, extra, name) {
    const curve = new T3.CatmullRomCurve3(pts.map((p) => new T3.Vector3(...p)), false, 'catmullrom', 0.05);
    const m = new T3.Mesh(new T3.TubeGeometry(curve, Math.max(64, pts.length * 16), r, 14, false), mat(color, extra));
    grp.add(m); if (name) v.pickable(m, name); return m;
  }
  function stick(a, b, r, color, name) { const m = F.mesh.stick(grp, a, b, r, color); if (name) v.pickable(m, name); return m; }
  function ball(r, color, name) {
    const m = F.mesh.sphere(grp, HIDE, r, color, { transparent: true });
    if (name) v.pickable(m, name); return m;
  }
  /* a small molecule: atoms [element, radius, x offset] along x, its group placed and faded as one */
  function molecule(atoms, name) {
    const g = new T3.Group(); grp.add(g);
    atoms.forEach(([e, r, x]) => { const m = F.mesh.sphere(g, [x, 0, 0], r, F.el(e), { transparent: true }); v.pickable(m, name); });
    g.position.set(...HIDE);
    return g;
  }
  return { mat, glass, lathe, box, tube, stick, ball, molecule };
}

/* a particle or molecule at p with opacity a, or hidden */
function place(m, p, a = 1) {
  if (!p || a <= 0.01) { m.position.set(...HIDE); return; }
  m.position.set(...p);
  (m.isGroup ? m.children : [m]).forEach((o) => { o.material.opacity = a; });
}

function legend(cnv, items) {
  const { ctx } = begin(cnv);
  const w = items.map(([s]) => F.measure(ctx, s, { size: 20 }) + 74), total = w.reduce((a, b) => a + b, 0);
  let x = 700 - total / 2;
  items.forEach(([s, mark], i) => { mark(ctx, x + 22, 30); text(ctx, s, x + 48, 30, PAL.ink, { size: 20 }); x += w[i]; });
}
const atomMark = (ctx, x, y, els, r = 9) => els.forEach(([e, dx, rr]) => dot(ctx, x + dx, y, F.el(e), true, rr ?? r));

/* =====================================================================
   FIGURE 18.10: a Downs cell cut in half through its axis. Molten NaCl
   (with CaCl₂, 600 °C) round a central anode, an iron screen, a ring
   cathode, the hood over the anode and the collector over the cathode.
   Moving on a 6.2 s clock: eight events, each two Na⁺ crossing to the
   cathode and two Cl⁻ crossing to the anode; the Na rises into the
   collector and runs up the riser to the reservoir, the two Cl pair as
   Cl₂ and climb the hood to the outlet; electrons run round the circuit
   from the anode to the cathode. Aqueous: Na⁺ stops short of the cathode
   and H₂ forms there instead. Pitch 0.05 to 1.13 (3° to 65°), yaw ±1.2.
===================================================================== */
(function () {
  const d = sim('sim-downs-cell');
  const v = F.view3d(d.stage, { spin: 'off', pitch: [0.05, 1.13], yaw: [-1.2, 1.2], views: [{ label: 'front', yaw: 0, pitch: 0.2 }, { label: 'above', yaw: 0, pitch: 1.05 }], h: 900, dist: 10.4, tilt: 0.2 });
  const grp = v.part(-0.65);
  grp.position.y = -0.15;
  const legendCanvas = F.makeCanvas(d.stage, 60);
  const T = 6.2, NEV = 8, MIG = 0.9;
  const tk = (k) => 0.75 + k * 0.49;
  const YF = -1.32, YL = 0.45, RS = 0.85, RC = 1.2, RT = 1.33, AR = 0.97;
  const RISER = [polar(RT, 0.22, AR), polar(RT, 1.15, AR), [2.6, 1.15, -RT * Math.sin(AR)], [2.6, 0.82, -RT * Math.sin(AR)]];
  const RES = { x: 2.6, z: -RT * Math.sin(AR), y0: 0.2, y1: 0.86, r: 0.28 };
  const CL2 = path([[0, 1.0, -0.15], [0, 1.85, -0.1], [0.5, 1.95, -0.1], [2.0, 1.95, -0.1]]);
  const WIRE = path([[0, -1.95, -0.06], [0, -2.3, -0.06], [2.9, -2.3, -0.06], [2.9, -0.7, -0.06], [2.0, -0.7, -0.06]]);
  const SRC = [2.9, -1.6, -0.06];
  const pick = F.choice(d.controls, {
    label: '\\text{electrolyte}', options: [{ value: 'molten', label: 'molten NaCl' }, { value: 'aqueous', label: 'aqueous NaCl' }],
    value: 'molten', aria: 'the electrolyte in the cell', onInput: () => cy.reset(),
  });
  const cy = F.cycle(() => T, 1.2);
  const ro = F.readout(d);

  /* the ions of each event: side, angle, start and end */
  const side = (k, j) => (rnd(k, j) < 0.5 ? 0.14 + rnd(k, j + 1) * 0.62 : Math.PI - 0.14 - rnd(k, j + 1) * 0.62);
  const EV = Array.from({ length: NEV }, (_, k) => {
    const na = [0, 1].map((i) => { const a = side(k, 3 + i * 11), y = -1.05 + rnd(k, 5 + i) * 0.62; return { a, y, p0: polar(0.6 + rnd(k, 7 + i) * 0.18, y, a), p1: polar(RC - rad(186) * 0.6, y, a), stop: polar(RC - 0.2, y, a) }; });
    const a = side(k, 31), y = -0.85 + rnd(k, 33) * 0.42;
    const cl = [0, 1].map((i) => { const ai = a + (i ? 0.16 : -0.16), yi = y + (i ? 0.07 : -0.07); return { p0: polar(0.95 + rnd(k, 41 + i) * 0.18, yi, ai), p1: polar(0.5 + rad(181), yi, ai) }; });
    return { na, cl, mid: polar(0.5 + rad(181) + 0.04, y, a), a };
  });

  let sig = '', M = {};
  function build() {
    const els = ['Na', 'Cl', 'H', 'e-'];
    if (!v.scene || palSig(els) === sig) return; sig = palSig(els);
    v.clear(); M = {};
    const K = kit(v, grp), steel = grey(0.5), carbon = F.fact(GRAPHITE), metal = F.fact(MOLTEN_METAL);
    K.lathe([[0, -1.5], [2.0, -1.5], [2.0, 0.95], [1.82, 0.95], [1.82, YF], [0, YF]], steel, {}, 'the steel shell of the cell, lined with brick');
    M.melt = K.lathe([[0, YF], [1.82, YF], [1.82, YL], [0, YL]], PAL.muted, { transparent: true, opacity: 0.22, depthWrite: false }, '');
    M.melt.forEach((m) => v.pickable(m, 'the electrolyte'));
    K.lathe([[0, -1.95], [0.16, -1.95], [0.16, -0.95], [0.5, -0.95], [0.5, -0.35], [0, -0.35]], carbon, {}, 'the anode (+), where Cl⁻ ions are oxidized to Cl₂');
    K.lathe([[1.22, -1.05], [1.4, -1.05], [1.4, -0.35], [1.22, -0.35]], steel, {}, 'the ring-shaped cathode (−), where Na⁺ ions are reduced');
    K.stick([1.4, -0.7, -0.06], [2.1, -0.7, -0.06], 0.06, steel, 'the cathode’s connection through the wall');
    K.lathe([[0.9, 0.05], [0.95, 0.05], [0.37, 0.72], [0.37, 1.55], [0.32, 1.55], [0.32, 0.7]], steel, {}, 'the hood, which carries chlorine to its outlet');
    K.lathe([[1.06, -0.3], [1.1, -0.3], [1.1, 0.21], [1.56, 0.21], [1.56, -0.3], [1.6, -0.3], [1.6, 0.25], [1.06, 0.25]], steel, {}, 'the collector, under which liquid sodium gathers');
    M.pool = K.lathe([[1.1, 0.05], [1.56, 0.05], [1.56, 0.21], [1.1, 0.21]], metal, { transparent: true, shininess: 90 }, 'liquid sodium, floating on the melt');
    /* the iron screen, a mesh of wires round the anode */
    const T3 = window.THREE, seg = [];
    for (let i = 0; i <= 16; i++) { const a = Math.PI * i / 16; seg.push(polar(RS, -1.15, a), polar(RS, 0.05, a)); }
    for (let y = -1.15; y <= 0.06; y += 0.12) for (let i = 0; i < 32; i++) seg.push(polar(RS, y, Math.PI * i / 32), polar(RS, y, Math.PI * (i + 1) / 32));
    const screen = new T3.LineSegments(new T3.BufferGeometry().setFromPoints(seg.map((p) => new T3.Vector3(...p))), new T3.LineBasicMaterial({ color: new T3.Color(PAL.ink), transparent: true, opacity: 0.55 }));
    grp.add(screen);
    v.pickable(K.lathe([[RS - 0.01, -1.15], [RS + 0.01, -1.15], [RS + 0.01, 0.05], [RS - 0.01, 0.05]], PAL.ink, { transparent: true, opacity: 0.04, depthWrite: false })[0], 'the iron screen, which lets ions through but keeps sodium and chlorine apart');
    /* the outlets */
    K.tube([[0, 1.5, 0], [0, 1.9, 0], [0.45, 1.95, 0], [2.1, 1.95, 0]], 0.3, PAL.ink, K.glass, 'the chlorine outlet');
    K.tube(RISER, 0.12, PAL.ink, K.glass, 'the pipe that carries liquid sodium to the reservoir');
    const res = new T3.Mesh(new T3.CylinderGeometry(RES.r, RES.r, RES.y1 - RES.y0, 32, 1, false), K.mat(PAL.ink, K.glass));
    res.position.set(RES.x, (RES.y0 + RES.y1) / 2, RES.z); grp.add(res); v.pickable(res, 'the reservoir of liquid sodium');
    M.resNa = new T3.Mesh(new T3.CylinderGeometry(RES.r - 0.03, RES.r - 0.03, 1, 32), K.mat(metal, { shininess: 90 }));
    grp.add(M.resNa); v.pickable(M.resNa, 'liquid sodium');
    K.tube([[RES.x + 0.1, RES.y0 + 0.12, RES.z], [3.35, RES.y0 + 0.12, RES.z]], 0.07, PAL.ink, K.glass, 'the sodium outlet');
    /* the external circuit */
    K.tube([[0, -1.95, -0.06], [0, -2.3, -0.06], [2.9, -2.3, -0.06], [2.9, -0.7, -0.06], [2.05, -0.7, -0.06]], 0.025, PAL.ink, {}, 'the wire of the external circuit');
    K.box(SRC, [0.8, 0.5, 0.36], PAL.panel, {}, 'the voltage source');
    K.box(SRC, [0.84, 0.54, 0.32], PAL.muted);
    /* the particles */
    M.na = EV.flatMap(() => [0, 1].map(() => K.ball(rad(102), F.el('Na'), 'a sodium ion, Na⁺')));
    M.naAtom = EV.flatMap(() => [0, 1].map(() => K.ball(rad(186), F.el('Na'), 'a sodium atom, Na, in a droplet of liquid sodium')));
    M.cl = EV.flatMap(() => [0, 1].map(() => K.ball(rad(181), F.el('Cl'), 'a chloride ion, Cl⁻')));
    M.cl2 = EV.map(() => K.molecule([['Cl', rad(99) + 0.03, -0.08], ['Cl', rad(99) + 0.03, 0.08]], 'a chlorine molecule, Cl₂'));
    M.h2 = EV.map(() => K.molecule([['H', 0.075, -0.06], ['H', 0.075, 0.06]], 'a hydrogen molecule, H₂'));
    M.e = Array.from({ length: 16 }, () => K.ball(0.05, F.el('e-'), 'an electron, e⁻, in the wire'));
    v.label('anode (+)', [0.62, -1.68, 0], grp, 0);
    v.label('cathode (−)', [-1.31, -1.68, 0], grp, 0);
    v.label('iron screen', [-0.85, 0.12, 0], grp, 0);
    M.lab = v.label('', [-1.45, 0.62, 0], grp, 0);
    v.label('Cl<sub>2</sub> outlet', [2.75, 1.5, 0], grp, 0);
    v.label('Na outlet', [3.6, RES.y0 + 0.3, RES.z], grp, 0);
    lastLab = '';
  }

  let lastTex = '', lastLab = '';
  function draw() {
    build();
    const t = cy.now(), aq = pick.value === 'aqueous';
    const done = EV.filter((_, k) => tk(k) <= t).length, n = Math.max(1, done);
    if (v.scene) {
      EV.forEach((ev, k) => {
        const t0 = tk(k);
        ev.na.forEach((s, i) => {
          const ion = M.na[2 * k + i], atom = M.naAtom[2 * k + i];
          if (aq) {
            place(ion, legs([[0, t0 - MIG, s.p0, s.p0], [t0 - MIG, T, s.p0, s.stop]], t));
            place(atom, null);
            return;
          }
          place(ion, t < t0 ? legs([[0, t0 - MIG, s.p0, s.p0], [t0 - MIG, t0, s.p0, s.p1]], t) : null);
          const top = polar(RT, 0.12, s.a), arc = (q) => polar(RT, 0.12, lerp(s.a, AR, q)), up = path(RISER);
          const p = legs([[t0, t0 + 0.55, s.p1, top], [t0 + 0.55, t0 + 1.0, arc, null], [t0 + 1.0, t0 + 1.75, up.at, null]], t);
          place(atom, p);
        });
        const [c0, c1] = ev.cl;
        const pair = t >= t0;
        [c0, c1].forEach((s, i) => place(M.cl[2 * k + i], pair ? null : legs([[0, t0 - MIG, s.p0, s.p0], [t0 - MIG, t0, s.p0, s.p1]], t)));
        const rise = [t0 + 0.05, t0 + 0.8, ev.mid, polar(0.18, YL - 0.02, ev.a)], hood = [t0 + 0.8, t0 + 1.15, polar(0.18, YL - 0.02, ev.a), [0, 1.0, -0.15]];
        const q = legs([[t0, t0 + 0.05, ev.mid, ev.mid], rise, hood, [t0 + 1.15, t0 + 1.8, CL2.at, null]], t);
        place(M.cl2[k], q, t > t0 + 1.6 ? clamp01((t0 + 1.8 - t) / 0.2) : 1);
        if (q) M.cl2[k].rotation.set(0, ev.a, 0);
        const s = ev.na[0];
        const h = aq ? legs([[t0, t0 + 0.6, s.p1, polar(RT, 0.08, s.a)], [t0 + 0.6, t0 + 1.0, (r) => polar(RT, 0.08, lerp(s.a, AR, r)), null], [t0 + 1.0, t0 + 1.4, path(RISER.slice(0, 2)).at, null]], t) : null;
        place(M.h2[k], h, h ? Math.min(clamp01((t - t0) / 0.2), clamp01((t0 + 1.4 - t) / 0.25)) : 0);
      });
      const run = clamp01((t - tk(0) - 1.75) / (tk(NEV - 1) - tk(0)));
      const lvl = aq ? 0 : 0.12 + 0.42 * run;
      M.resNa.visible = lvl > 0.01; M.resNa.scale.y = Math.max(0.001, lvl); M.resNa.position.set(RES.x, RES.y0 + 0.02 + lvl / 2, RES.z);
      M.pool.forEach((m) => { m.visible = !aq; });
      const sp = WIRE.L / M.e.length;
      M.e.forEach((m, i) => {
        const p = WIRE.at(((i * sp + 0.55 * t) % WIRE.L) / WIRE.L);
        place(m, Math.abs(p[0] - SRC[0]) < 0.42 && Math.abs(p[1] - SRC[1]) < 0.3 ? null : p);
      });
      const lab = aq ? 'aqueous NaCl' : 'molten NaCl';
      if (lab !== lastLab) { lastLab = lab; M.lab.textContent = lab; }
      v.headline(aq
        ? 'In aqueous solution water is reduced at the cathode instead of Na<sup>+</sup>, so hydrogen forms in place of sodium.'
        : 'Na<sup>+</sup> is reduced at the cathode and Cl<sup>−</sup> oxidized at the anode, and the iron screen keeps sodium and chlorine apart.');
      v.invalidate();
    }
    const co = (x) => (x === 1 ? '' : String(x));
    const tex = aq
      ? `\\mk{w}{${co(2 * n)}\\text{H}_{2}\\text{O}(l)} + \\mk{cl}{${co(2 * n)}\\text{Cl}^{-}} \\longrightarrow \\mk{h}{${co(n)}\\text{H}_{2}(g)} + \\mk{c2}{${co(n)}\\text{Cl}_{2}(g)} + \\mk{oh}{${co(2 * n)}\\text{OH}^{-}}`
      : `\\mk{na}{${co(2 * n)}\\text{Na}^{+}} + \\mk{cl}{${co(2 * n)}\\text{Cl}^{-}} \\longrightarrow \\mk{nal}{${co(2 * n)}\\text{Na}(l)} + \\mk{c2}{${co(n)}\\text{Cl}_{2}(g)}`;
    if (tex !== lastTex) { lastTex = tex; ro.set(tex, '', { form: aq, values: false }); }
    legend(legendCanvas, aq
      ? [['Na⁺', (c, x, y) => atomMark(c, x, y, [['Na', 0, 7]])], ['Cl⁻', (c, x, y) => atomMark(c, x, y, [['Cl', 0, 10]])], ['H₂', (c, x, y) => atomMark(c, x, y, [['H', -5, 7], ['H', 5, 7]])], ['Cl₂', (c, x, y) => atomMark(c, x, y, [['Cl', -7, 9], ['Cl', 7, 9]])], ['e⁻', (c, x, y) => atomMark(c, x, y, [['e-', 0, 5]])]]
      : [['Na⁺', (c, x, y) => atomMark(c, x, y, [['Na', 0, 7]])], ['Cl⁻', (c, x, y) => atomMark(c, x, y, [['Cl', 0, 10]])], ['Na', (c, x, y) => atomMark(c, x, y, [['Na', 0, 10]])], ['Cl₂', (c, x, y) => atomMark(c, x, y, [['Cl', -7, 9], ['Cl', 7, 9]])], ['e⁻', (c, x, y) => atomMark(c, x, y, [['e-', 0, 5]])]]);
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();

/* =====================================================================
   FIGURE 18.11: a Hall–Héroult cell, its steel shell and ceramic lining
   cut away at the front. Al₂O₃ in molten cryolite between two carbon
   anodes above and a carbon cathode below, molten aluminum on the
   cathode. Moving on a 6.3 s clock: twelve Al³⁺ ions drift down and join
   the pool, which rises; nine O²⁻ ions drift up to the anodes, and a
   bubble of O₂, CO or CO₂ forms at each and rises past the anode, through
   the gap in the crust and out of the exhaust. The book draws no
   external circuit, so no electrons are drawn. Pitch 0.05 to 0.6 (3° to
   34°) and yaw ±0.8: the layers read from the side, and from higher the
   crust hides them.
===================================================================== */
(function () {
  const d = sim('sim-hall-heroult');
  const v = F.view3d(d.stage, { spin: 'off', pitch: [0.05, 0.6], yaw: [-0.8, 0.8], views: [{ label: 'front', yaw: 0, pitch: 0.2 }], h: 900, dist: 11.6, tilt: 0.2 });
  const grp = v.part(0);
  grp.position.y = -0.55;
  const legendCanvas = F.makeCanvas(d.stage, 60);
  const T = 6.3, NA = 12, NO = 9, MIG = 1.2;
  const ta = (k) => 0.4 + k * 0.4, to = (k) => 0.3 + k * 0.45;
  const XI = 2.55, ZI = -1.15, YC = -0.85, YA0 = -0.62, YA1 = -0.48, YE = 0.2, YAB = -0.3;
  const AN = [-1.1, 1.1], AW = 1.3;
  const DUCT = -1.45;
  const yAl = (t) => YA0 + (YA1 - YA0) * clamp01((t - ta(0)) / (ta(NA - 1) - ta(0)));
  const KINDS = [
    ['O₂', [['O', rad(66), -0.07], ['O', rad(66), 0.07]], 'an oxygen molecule, O₂'],
    ['CO', [['C', rad(70), -0.07], ['O', rad(66), 0.07]], 'a carbon monoxide molecule, CO'],
    ['CO₂', [['O', rad(66), -0.13], ['C', rad(70), 0], ['O', rad(66), 0.13]], 'a carbon dioxide molecule, CO₂'],
  ];
  const ro = F.readout(d);
  const cy = F.cycle(() => T, 1.2);

  const ALS = Array.from({ length: NA }, (_, k) => {
    const x = -2.3 + rnd(k, 1) * 4.6, under = AN.some((c) => Math.abs(x - c) < AW / 2 + 0.1);
    const y = under ? -0.42 - rnd(k, 2) * 0.08 : -0.4 + rnd(k, 2) * 0.45;
    return { p0: [x, y, -0.15 - rnd(k, 3) * 0.75], x, z: -0.15 - rnd(k, 3) * 0.75 };
  });
  const OS = Array.from({ length: NO }, (_, k) => {
    const c = AN[k % 2], x = c + (rnd(k, 11) - 0.5) * (AW - 0.3), z = -0.12 - rnd(k, 13) * 0.6;
    const edge = x < c ? c - AW / 2 - 0.09 : c + AW / 2 + 0.09;
    return { p0: [x, -0.72 + rnd(k, 12) * 0.14, z], p1: [x, YAB - rad(140), z], b0: [x, YAB - 0.1, z], b1: [edge, YAB - 0.1, z], b2: [edge, YE + 0.12, z], edge, z };
  });

  let sig = '', M = {};
  function build() {
    const els = ['Al', 'O', 'C'];
    if (!v.scene || palSig(els) === sig) return; sig = palSig(els);
    v.clear(); M = {};
    const K = kit(v, grp), steel = grey(0.5), ceramic = grey(0.75), carbon = F.fact(GRAPHITE), metal = F.fact(MOLTEN_METAL);
    const shell = 'the steel shell', lining = 'the ceramic lining';
    K.box([0, -1.525, -0.8], [6.0, 0.15, 1.6], steel, {}, shell);
    K.box([-2.925, -0.55, -0.8], [0.15, 2.1, 1.6], steel, {}, shell);
    K.box([2.925, -0.55, -0.8], [0.15, 2.1, 1.6], steel, {}, shell);
    K.box([0, -0.55, -1.525], [6.0, 2.1, 0.15], steel, {}, shell);
    K.box([0, -1.3, -0.725], [5.7, 0.3, 1.45], ceramic, {}, lining);
    K.box([-2.7, -0.325, -0.725], [0.3, 1.65, 1.45], ceramic, {}, lining);
    K.box([2.7, -0.325, -0.725], [0.3, 1.65, 1.45], ceramic, {}, lining);
    K.box([0, -0.325, -1.3], [5.1, 1.65, 0.3], ceramic, {}, lining);
    K.box([0, (YC - 1.15) / 2, ZI / 2], [2 * XI, YC + 1.15, -ZI], carbon, {}, 'the carbon cathode (−), on which aluminum ions are reduced');
    K.stick([-1.6, -1.0, -0.3], [-3.5, -1.0, -0.3], 0.07, steel, 'the cathode’s collector bar, the negative terminal');
    M.al = K.box([0, 0, ZI / 2], [2 * XI, 1, -ZI], metal, { shininess: 90 }, 'molten aluminum');
    M.bath = K.box([0, 0, ZI / 2], [2 * XI, 1, -ZI], PAL.muted, { transparent: true, opacity: 0.16, depthWrite: false }, 'aluminum oxide, Al₂O₃, dissolved in molten cryolite, Na₃AlF₆, with calcium fluoride');
    [[-XI, AN[0] - AW / 2 - 0.12], [AN[0] + AW / 2 + 0.12, AN[1] - AW / 2 - 0.12], [AN[1] + AW / 2 + 0.12, XI]].forEach(([a, b]) => K.box([(a + b) / 2, YE + 0.04, ZI / 2], [b - a, 0.08, -ZI], ceramic, { transparent: true, opacity: 0.55 }, 'the crust over the molten electrolyte'));
    AN.forEach((c) => {
      K.box([c, 0.25, -0.5], [AW, 1.1, 1.0], carbon, {}, 'a carbon anode (+), at which O₂, CO and CO₂ form');
      [-0.38, 0, 0.38].forEach((dx) => K.stick([c + dx, 0.78, -0.5], [c + dx, 1.08, -0.5], 0.07, steel, 'the anode’s rod'));
      K.stick([c - 0.42, 1.08, -0.5], [c + 0.42, 1.08, -0.5], 0.07, steel, 'the anode’s rod');
      K.stick([c, 1.08, -0.5], [c, 1.42, -0.5], 0.08, steel, 'the anode’s rod');
    });
    K.stick([AN[0] - 0.08, 1.42, -0.5], [3.5, 1.42, -0.5], 0.07, steel, 'the bus bar to the positive terminal');
    /* the hood and its exhaust duct, drawn as the book draws them, in outline */
    const hood = [[[-2.85, 0.5], [-2.85, 2.05], [DUCT - 0.32, 2.05], [DUCT - 0.32, 2.6]], [[DUCT + 0.32, 2.6], [DUCT + 0.32, 2.05], [2.85, 2.05], [2.85, 0.5]]];
    hood.forEach((ln) => ln.slice(1).forEach((p, i) => K.stick([ln[i][0], ln[i][1], 0], [p[0], p[1], 0], 0.025, PAL.muted, 'the hood, which carries HF and particulates to the exhaust and the filter plant')));
    M.al3 = ALS.map(() => K.ball(rad(54), F.el('Al'), 'an aluminum ion, Al³⁺'));
    M.o2m = OS.map(() => K.ball(rad(140), F.el('O'), 'an oxide ion, O²⁻'));
    M.gas = OS.map((_, k) => K.molecule(KINDS[k % 3][1], KINDS[k % 3][2]));
    v.label('carbon anode (+)', [AN[1] + 1.1, 0.98, 0], grp, 0);
    v.label('carbon cathode (−)', [-2.3, -1.95, 0], grp, 0);
    v.label('molten<br>aluminum', [3.6, -1.15, 0], grp, 0);
    v.label('Al<sub>2</sub>O<sub>3</sub> in<br>molten Na<sub>3</sub>AlF<sub>6</sub>', [3.8, -0.15, 0], grp, 0);
    v.label('ceramic', [-2.7, 0.62, 0], grp, 0);
    v.label('steel shell', [-3.6, -0.3, 0], grp, 0);
    v.headline('Al<sup>3+</sup> is reduced to molten aluminum at the carbon cathode while O<sub>2</sub>, CO and CO<sub>2</sub> bubble off the carbon anodes.');
  }

  let lastTex = '';
  function draw() {
    build();
    const t = cy.now(), y = yAl(t), n = Math.max(1, ALS.filter((_, k) => ta(k) <= t).length);
    if (v.scene) {
      M.al.scale.y = y - YC; M.al.position.y = (y + YC) / 2;
      M.bath.scale.y = YE - y; M.bath.position.y = (YE + y) / 2;
      ALS.forEach((s, k) => {
        const t0 = ta(k), land = [s.x, yAl(t0) + rad(54), s.z];
        place(M.al3[k], legs([[0, t0 - MIG, s.p0, s.p0], [t0 - MIG, t0, s.p0, land], [t0, t0 + 0.25, land, land]], t), t > t0 ? clamp01((t0 + 0.25 - t) / 0.25) : 1);
      });
      OS.forEach((s, k) => {
        const t0 = to(k);
        place(M.o2m[k], legs([[0, t0 - MIG, s.p0, s.p0], [t0 - MIG, t0, s.p0, s.p1], [t0, t0 + 0.2, s.p1, s.p1]], t), t > t0 ? clamp01((t0 + 0.2 - t) / 0.2) : 1);
        const up = path([s.b2, [s.edge, 1.75, s.z], [DUCT, 2.05, s.z * 0.5], [DUCT, 2.75, s.z * 0.5]]);
        const p = legs([[t0 + 0.05, t0 + 0.45, s.b0, s.b1], [t0 + 0.45, t0 + 1.05, s.b1, s.b2], [t0 + 1.05, t0 + 2.05, up.at, null]], t);
        place(M.gas[k], p, p ? Math.min(clamp01((t - t0) / 0.2), clamp01((t0 + 2.05 - t) / 0.25)) : 0);
      });
      v.invalidate();
    }
    const co = (x) => (x === 1 ? '' : String(x));
    const tex = `\\mk{al}{${co(n)}\\text{Al}^{3+}} + \\mk{e}{${3 * n}\\text{e}^{-}} \\longrightarrow \\mk{all}{${co(n)}\\text{Al}(l)}`;
    if (tex !== lastTex) { lastTex = tex; ro.set(tex, '', { values: false }); }
    legend(legendCanvas, [
      ['Al³⁺', (c, x, y2) => atomMark(c, x, y2, [['Al', 0, 6]])],
      ['O²⁻', (c, x, y2) => atomMark(c, x, y2, [['O', 0, 9]])],
      ['O₂', (c, x, y2) => atomMark(c, x, y2, [['O', -6, 7], ['O', 6, 7]])],
      ['CO', (c, x, y2) => atomMark(c, x, y2, [['C', -6, 7], ['O', 6, 7]])],
      ['CO₂', (c, x, y2) => atomMark(c, x, y2, [['O', -11, 7], ['C', 0, 7], ['O', 11, 7]])],
    ]);
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();
};
