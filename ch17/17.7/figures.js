/* Figures for section 17.7 Electrolysis. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['17.7'] = function (root, F) {
const { PAL, cycle, register, begin, text, dot } = F;
const sim = (id, H) => F.sim(root, id, H);
const T3D = window.THREE;
const TAU = 2 * Math.PI;
const OFF = [0, -50, 0];
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;
/* a fixed pseudo-random number in [0, 1) for event k and draw j, so every run draws the same */
const rnd = (k, j) => { const s = Math.sin(k * 127.1 + j * 311.7) * 43758.5453; return s - Math.floor(s); };
const lerp3 = (a, b, f) => a.map((x, i) => x + (b[i] - x) * f);
const put = (m, p) => m.position.set(p[0], p[1], p[2]);
const fade = (g, o) => g.traverse((x) => { if (x.material) { x.material.transparent = true; x.material.opacity = o; } });
const glass = (o = 0.1) => ({ transparent: true, opacity: o, depthWrite: false, side: T3D.DoubleSide });
const LIQ = { transparent: true, opacity: 0.14, depthWrite: false };
const LIQ_DEEP = { transparent: true, opacity: 0.5, depthWrite: false };

/* straight runs joined by quarter turns of radius rc */
function rounded(pts, rc) {
  const out = [pts[0]];
  for (let i = 1; i < pts.length - 1; i++) {
    const p = pts[i], a = pts[i - 1], b = pts[i + 1];
    const ua = [a[0] - p[0], a[1] - p[1]].map((x, _, u) => x / Math.hypot(...u)), ub = [b[0] - p[0], b[1] - p[1]].map((x, _, u) => x / Math.hypot(...u));
    for (let s = 0; s <= 8; s++) {
      const t = s / 8, A = [p[0] + ua[0] * rc, p[1] + ua[1] * rc], B = [p[0] + ub[0] * rc, p[1] + ub[1] * rc];
      out.push([(1 - t) ** 2 * A[0] + 2 * (1 - t) * t * p[0] + t * t * B[0], (1 - t) ** 2 * A[1] + 2 * (1 - t) * t * p[1] + t * t * B[1], 0]);
    }
  }
  out.push(pts[pts.length - 1]); return out;
}
/* the point at arc length s along a polyline */
function along(pts) {
  const seg = pts.slice(1).map((p, i) => Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1], p[2] - pts[i][2])), L = seg.reduce((a, b) => a + b, 0);
  const at = (s) => { let i = 0; while (i < seg.length - 1 && s > seg[i]) { s -= seg[i]; i++; } const t = Math.min(1, s / seg[i]); return lerp3(pts[i], pts[i + 1], t); };
  return { L, at };
}
const tube = (g, pts, r, color, extra) => {
  const m = new T3D.Mesh(new T3D.TubeGeometry(new T3D.CatmullRomCurve3(pts.map((p) => new T3D.Vector3(p[0], p[1], p[2]))), Math.max(48, pts.length * 3), r, 12, false), F.mesh.mat(color, extra));
  g.add(m); return m;
};
const cyl = (g, x, y0, y1, rTop, rBot, color, extra, open = true, z = 0) => {
  const m = new T3D.Mesh(new T3D.CylinderGeometry(rTop, rBot, y1 - y0, 40, 1, open), F.mesh.mat(color, extra));
  m.position.set(x, (y0 + y1) / 2, z); g.add(m); return m;
};
/* The external circuit: the wire along `corners`, the voltage source boxed at `src`, and nE
   electrons on the wire, hidden inside the source. place(k) sets them k spacings along. */
function circuit(v, g, corners, src, nE, rc = 0.3) {
  const path = rounded(corners, rc);
  v.pickable(tube(g, path, 0.025, PAL.ink), 'the wire of the external circuit');
  v.pickable(F.mesh.box(g, src, [1.1, 0.46, 0.3], PAL.panel), 'the voltage source');
  F.mesh.box(g, src, [1.14, 0.5, 0.26], PAL.muted);
  const w = along(path), sp = w.L / nE;
  const es = Array.from({ length: nE }, () => v.pickable(F.mesh.sphere(g, OFF, 0.05, F.el('e-')), 'an electron, e⁻, pushed through the wire by the source'));
  return (k) => es.forEach((m, i) => {
    const p = w.at((((i + k) * sp) % w.L + w.L) % w.L);
    put(m, Math.abs(p[0] - src[0]) < 0.58 && Math.abs(p[1] - src[1]) < 0.28 ? OFF : p);
  });
}
/* a molecule of two like atoms, for the gases */
function diatomic(v, g, el, r, name) {
  const m = new T3D.Group(); g.add(m);
  for (const s of [-1, 1]) v.pickable(F.mesh.sphere(m, [s * r * 0.8, 0, 0], r, F.el(el), { transparent: true }), name);
  put(m, OFF); return m;
}
/* the legend strip: every particle the figure moves, named once */
function legend(cnv, items, gap) {
  const { ctx } = begin(cnv), y = 50, x0 = 700 - (items.length - 1) * gap / 2;
  items.forEach(([s, name, r], i) => {
    const cx = x0 + i * gap - 40, two = /2$/.test(s), el = two ? s.slice(0, -1) : s;
    const disc = (x) => { if (el === 'H') dot(ctx, x, y, PAL.ink, true, r + 2); dot(ctx, x, y, F.el(el), true, r); };
    if (two) { disc(cx - r * 0.8); disc(cx + r * 0.8); } else disc(cx);
    text(ctx, name, cx + r * (two ? 1.8 : 1) + 12, y, PAL.ink, { size: 24, align: 'left' });
  });
}

/* =====================================================================
   FIGURE 17.18: a Downs cell on a bench, in three dimensions. A tank of
   molten NaCl split by a porous screen, a carbon anode on the left and an
   iron cathode on the right, the voltage source above. Moving: the cell
   runs for T = 6 s of model time and holds. Ten events at times t_k; in
   each, two Cl⁻ reach the anode and leave it as one Cl₂ bubble, two Na⁺
   reach the cathode and rise from it as two drops of liquid sodium, which
   gather on the melt, and two electrons cross the wire. The bench is
   never seen from beneath: pitch between 2° and 70° above level.
===================================================================== */
(function () {
  const d = sim('sim-downs-cell');
  const v = F.view3d(d.stage, { spin: 'off', pitch: [0.035, 1.22], views: [{ label: 'front', yaw: 0, pitch: 0.16 }, { label: 'above', yaw: 0, pitch: 1.1 }], h: 640, dist: 7.6, tilt: 0.16 });
  const grp = v.part(0), cnv = F.makeCanvas(d.stage, 100);
  grp.position.y = -0.45;
  const T = 6, NEV = 10, LIFE = 1.2, RISE = 0.9, T0 = 1.2, DT = 0.42;
  const XA = -1.25, XC = 1.25, YB = -1.3, YL = 0, YTOP = 0.35, YW = 1.45, EW = 0.3, EY0 = -1.0, EY1 = 0.85;
  const tk = (k) => T0 + k * DT;
  const cy = cycle(() => T, 1.2);
  const ro = F.readout(d);
  /* ionic radii drawn as 0.04 + 0.00033 × the radius in pm: Na⁺ 102, Cl⁻ 181 */
  const R_NA = 0.074, R_CL = 0.1;
  let sig = '', wire = null, pools = {}, naPool = null;
  const palSig = () => [PAL.ink, PAL.soft, PAL.muted, PAL.panel, ...['Na', 'Cl', 'C', 'Fe', 'e-'].map((s) => F.el(s))].join('|');

  /* a point on the electrode at x0 (a side face, the one toward the screen or away) and where its ion set out from */
  function site(x0, k, j) {
    const a = rnd(k, j), b = rnd(k, j + 7), c = rnd(k, j + 13), s = c < 0.5 ? -1 : 1;
    const p = [x0 + s * (EW / 2 + 0.03), -0.85 + b * 0.7, (a - 0.5) * 0.24];
    const lo = x0 < 0 ? -2.05 : 0.15, hi = x0 < 0 ? -0.15 : 2.05;
    const q = [Math.min(hi, Math.max(lo, p[0] + s * (0.55 + 0.35 * rnd(k, j + 21)))), Math.min(YL - 0.12, Math.max(YB + 0.15, p[1] + (rnd(k, j + 29) - 0.5) * 0.5)), (rnd(k, j + 37) - 0.5) * 1.1];
    return { p, q };
  }
  function build() {
    if (!v.scene || palSig() === sig) return; sig = palSig();
    v.clear();
    v.pickable(F.mesh.box(grp, [0, YB - 0.06, 0], [6.4, 0.1, 2.4], PAL.soft), 'bench');
    v.pickable(F.mesh.box(grp, [0, (YB + YTOP) / 2, 0], [4.4, YTOP - YB, 1.6], PAL.ink, glass()), 'the tank');
    v.pickable(F.mesh.box(grp, [0, (YB + YL) / 2, 0], [4.34, YL - YB - 0.02, 1.54], PAL.muted, LIQ), 'molten sodium chloride, Na⁺ and Cl⁻ ions in a liquid');
    v.pickable(F.mesh.box(grp, [0, (YB + 0.22) / 2, 0], [0.04, 0.22 - YB, 1.56], PAL.ink, { transparent: true, opacity: 0.32, depthWrite: false }), 'the porous screen, which keeps the sodium and the chlorine apart');
    v.pickable(F.mesh.box(grp, [XA, (EY0 + EY1) / 2, 0], [EW, EY1 - EY0, EW], F.el('C')), 'the carbon anode, where chloride ions are oxidized');
    v.pickable(F.mesh.box(grp, [XC, (EY0 + EY1) / 2, 0], [EW, EY1 - EY0, EW], F.el('Fe')), 'the iron cathode, where sodium ions are reduced');
    wire = circuit(v, grp, [[XA, EY1, 0], [XA, YW, 0], [XC, YW, 0], [XC, EY1, 0]], [0, YW, 0], 16);
    const ion = (el, r, name) => { const m = v.pickable(F.mesh.sphere(grp, OFF, r, F.el(el), { transparent: true }), name); return m; };
    const drop = () => { const m = v.pickable(F.mesh.sphere(grp, OFF, 0.07, F.el('Na'), { transparent: true }), 'a drop of liquid sodium, Na(l), rising from the cathode'); return m; };
    pools = {
      cl: Array.from({ length: 8 }, () => ion('Cl', R_CL, 'a chloride ion, Cl⁻, drifting to the anode')),
      na: Array.from({ length: 8 }, () => ion('Na', R_NA, 'a sodium ion, Na⁺, drifting to the cathode')),
      cl2: Array.from({ length: 4 }, () => diatomic(v, grp, 'Cl', 0.075, 'a bubble of chlorine gas, Cl₂, rising from the anode')),
      drops: Array.from({ length: 8 }, drop),
    };
    naPool = v.pickable(F.mesh.box(grp, [1.1, YL, 0], [1.98, 1, 1.5], F.el('Na'), { transparent: true, opacity: 0.4 }), 'liquid sodium gathered on the melt');
    [['anode (+)', [XA - 1.5, 0.55, 0]], ['cathode (−)', [XC + 1.5, 0.55, 0]], ['porous screen', [0, -1.0, 0.82]], ['molten NaCl', [-3.05, -0.65, 0]], ['voltage source', [0, YW - 0.45, 0]]]
      .forEach(([s, p]) => v.label(s, p, grp, 0));
    v.headline('Chloride ions give up electrons at the anode, and sodium ions take them at the cathode.');
  }
  function place(t) {
    Object.values(pools).flat().forEach((m) => put(m, OFF));
    let iCl = 0, iNa = 0, iB = 0, iD = 0;
    for (let k = 0; k < NEV; k++) {
      const t1 = tk(k), fIn = (t - (t1 - LIFE)) / LIFE, fUp = (t - t1) / RISE;
      for (let j = 0; j < 2; j++) {
        if (fIn >= 0 && fIn < 1) {
          for (const [x0, list, idx, seed] of [[XA, pools.cl, iCl++, 10 + j], [XC, pools.na, iNa++, 20 + j]]) {
            const { p, q } = site(x0, k, seed), m = list[idx % list.length];
            put(m, lerp3(q, p, F.ease.smooth(fIn))); m.material.opacity = Math.min(1, fIn / 0.3);
          }
        }
        if (fUp >= 0 && fUp < 1) {
          const { p } = site(XC, k, 20 + j), m = pools.drops[iD++ % pools.drops.length];
          put(m, [p[0] + (p[0] > XC ? 0.06 : -0.06) * fUp, p[1] + (YL - 0.05 - p[1]) * fUp, p[2]]); m.material.opacity = Math.min(1, (1 - fUp) / 0.25);
        }
      }
      if (fUp >= 0 && fUp < 1) {
        const { p } = site(XA, k, 10), m = pools.cl2[iB++ % pools.cl2.length];
        put(m, [p[0] + (p[0] > XA ? 0.08 : -0.08) * fUp, p[1] + (YL + 0.15 - p[1]) * fUp, p[2]]); fade(m, Math.min(1, (1 - fUp) / 0.3));
      }
    }
  }
  let lastTex = '';
  function draw() {
    build();
    const t = cy.now(), done = Array.from({ length: NEV }, (_, k) => k).filter((k) => tk(k) <= t).length;
    const pooled = Array.from({ length: NEV }, (_, k) => k).filter((k) => tk(k) + RISE <= t).length;
    if (v.scene) {
      place(t);
      wire(2 * NEV * t / T);
      const th = 0.007 * 2 * pooled;
      naPool.visible = th > 0; naPool.scale.y = Math.max(th, 1e-3); naPool.position.y = YL + th / 2;
      v.invalidate();
    }
    const tex = `N_{\\text{e}^{-}} = N_{\\text{Na}} = 2\\,N_{\\text{Cl}_2}:\\quad ${2 * done} = ${2 * done} = 2 \\times ${done}`;
    if (tex !== lastTex) { lastTex = tex; ro.set(tex, undefined, { values: false }); }
    legend(cnv, [['e-', 'electron, e⁻', 8], ['Cl', 'Cl⁻', 15], ['Cl2', 'Cl₂', 11], ['Na', 'Na⁺', 11], ['Na', 'Na(l)', 11]], 250);
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();

/* =====================================================================
   FIGURE 17.19: the book's electrolysis apparatus on a bench, in three
   dimensions: two stoppered arms with stopcocks, platinum electrodes at
   their feet, a cross tube to the central column and its reservoir, a
   clamp stand, and the voltage source on the bench. The applied voltage
   is a slider, 0 to 3.00 V, with a dashed circle at 1.229 V = −E°_cell.
   Moving: 6 s of clock. Up to 1.229 V nothing happens; above it the
   extent ξ = r·t/T grows with r = (V − 1.229)/(3.00 − 1.229), so the
   gases form faster the further the voltage is above the threshold (the
   book states no current). Twelve events at ξ = 1: in each, four
   electrons cross the wire, one O₂ bubble rises at the anode and two H₂
   bubbles at the cathode. The gas columns are 0.625ξ and 1.25ξ, and the
   solution they push out raises the reservoir by (0.18/0.5)² of their sum.
   Pitch between 2° and 70° above level.
===================================================================== */
(function () {
  const d = sim('sim-water-electrolysis');
  const v = F.view3d(d.stage, { spin: 'off', pitch: [0.035, 1.22], views: [{ label: 'front', yaw: 0, pitch: 0.12 }, { label: 'above', yaw: 0, pitch: 1.1 }], h: 760, dist: 9.8, tilt: 0.12 });
  const grp = v.part(0), cnv = F.makeCanvas(d.stage, 100);
  grp.position.y = -0.2;
  const T = 6, NEVMAX = 12, RISE = 0.9, VT = 1.229, VMAX = 3;
  const XA = -1.1, XC = 1.1, RA = 0.2, A0 = -1.2, A1 = 0.8, FULL = 0.78, YB = -2.0, YS = -1.77, YX = -0.65, YPT = -1.0;
  const PROF = [[0.09, 0.95], [0.2, 1.15], [0.42, 1.38], [0.52, 1.62], [0.48, 1.88], [0.3, 2.04], [0.13, 2.1], [0.13, 2.2]];
  const cy = cycle(() => T, 1.2);
  const volt = F.ctl(d.controls, { label: '\\text{applied voltage}', cls: 'potential', min: 0, max: VMAX, step: 0.01, value: 2, unit: 'V', dec: 3, specials: [{ at: VT, label: '−E°cell' }], onInput: () => cy.reset() });
  const ro = F.readout(d);
  const rate = () => Math.max(0, (volt.v - VT) / (VMAX - VT));
  let sig = '', wire = null, liqA = null, liqC = null, resLiq = null, resAt = -1, oB = [], hB = [];
  const palSig = () => [PAL.ink, PAL.soft, PAL.muted, PAL.panel, ...['O', 'H', 'Pt', 'e-'].map((s) => F.el(s))].join('|');
  /* the reservoir's profile up to height y, closed at the axis, for the solution inside it */
  function upTo(y) {
    const pts = [[0, PROF[0][1]]];
    for (let i = 0; i < PROF.length; i++) {
      const [r, h] = PROF[i];
      if (h <= y) { pts.push([r * 0.93, h]); continue; }
      const [r0, h0] = PROF[i - 1]; pts.push([(r0 + (r - r0) * (y - h0) / (h - h0)) * 0.93, y]); break;
    }
    pts.push([0, y]);
    return new T3D.LatheGeometry(pts.map(([r, h]) => new T3D.Vector2(r, h)), 40);
  }
  function build() {
    if (!v.scene || palSig() === sig) return; sig = palSig();
    v.clear(); resAt = -1;
    v.pickable(F.mesh.box(grp, [0, YB - 0.06, 0], [6, 0.1, 2.2], PAL.soft), 'bench');
    for (const [x, who] of [[XA, 'anode'], [XC, 'cathode']]) {
      v.pickable(cyl(grp, x, A0, A1, RA, RA, PAL.ink, glass(0.05)), `the ${who} arm`);
      cyl(grp, x, A1, A1 + 0.2, 0.05, RA, PAL.ink, glass(0.05));
      cyl(grp, x, A1 + 0.2, 1.62, 0.04, 0.05, PAL.ink, glass(0.05));
      v.pickable(F.mesh.box(grp, [x, 1.22, 0], [0.28, 0.07, 0.07], PAL.ink), 'a stopcock, closed');
      v.pickable(F.mesh.sphere(grp, [x, 1.22, 0], 0.06, PAL.ink), 'a stopcock, closed');
      v.pickable(cyl(grp, x, A0 - 0.22, A0, RA + 0.01, RA - 0.03, PAL.muted, {}, false), 'a rubber stopper');
      v.pickable(F.mesh.stick(grp, [x, A0, 0], [x, YPT - 0.1, 0], 0.012, F.el('Pt')), who === 'anode' ? 'the platinum anode, where water is oxidized to oxygen' : 'the platinum cathode, where hydrogen ions are reduced to hydrogen');
      v.pickable(F.mesh.box(grp, [x, YPT, 0], [0.2, 0.2, 0.02], F.el('Pt')), who === 'anode' ? 'the platinum anode, where water is oxidized to oxygen' : 'the platinum cathode, where hydrogen ions are reduced to hydrogen');
    }
    const name = 'water with sulfuric acid, H₂O + H₂SO₄';
    liqA = v.pickable(cyl(grp, XA, A0, A0 + 1, RA - 0.02, RA - 0.02, PAL.muted, LIQ_DEEP, false), name);
    liqC = v.pickable(cyl(grp, XC, A0, A0 + 1, RA - 0.02, RA - 0.02, PAL.muted, LIQ_DEEP, false), name);
    const cross = [[XA, YX, 0], [XC, YX, 0]];
    v.pickable(tube(grp, cross, 0.09, PAL.ink, glass(0.05)), 'the cross tube');
    tube(grp, cross, 0.075, PAL.muted, LIQ_DEEP);
    v.pickable(cyl(grp, 0, YX, PROF[0][1], 0.09, 0.09, PAL.ink, glass(0.05)), 'the central column');
    cyl(grp, 0, YX, PROF[0][1], 0.075, 0.075, PAL.muted, LIQ_DEEP, false);
    const bulb = new T3D.Mesh(new T3D.LatheGeometry(PROF.map(([r, h]) => new T3D.Vector2(r, h)), 40), F.mesh.mat(PAL.ink, glass(0.05)));
    grp.add(bulb); v.pickable(bulb, 'the reservoir');
    resLiq = new T3D.Mesh(upTo(1.4), F.mesh.mat(PAL.muted, LIQ_DEEP)); grp.add(resLiq); v.pickable(resLiq, name);
    wire = circuit(v, grp, [[XA, YPT - 0.1, 0], [XA, YS, 0], [XC, YS, 0], [XC, YPT - 0.1, 0]], [0, YS, 0.15], 18, 0.15);
    oB = Array.from({ length: 4 }, () => diatomic(v, grp, 'O', 0.05, 'a bubble of oxygen gas, O₂, rising from the anode'));
    hB = Array.from({ length: 8 }, () => diatomic(v, grp, 'H', 0.04, 'a bubble of hydrogen gas, H₂, rising from the cathode'));
    [['anode (+)', [XA - 0.75, YPT, 0]], ['cathode (−)', [XC + 0.8, YPT, 0]], ['O<sub>2</sub>(<em>g</em>)', [XA - 0.65, 0.62, 0]], ['H<sub>2</sub>(<em>g</em>)', [XC + 0.65, 0.62, 0]],
      ['H<sub>2</sub>O + H<sub>2</sub>SO<sub>4</sub>', [1.45, 1.5, 0]], ['voltage source', [0, YS - 0.42, 0.3]]].forEach(([s, p]) => v.label(s, p, grp, 0));
  }
  function bubbles(list, x, per, k0, t, tk, level, seed) {
    for (let j = 0; j < per; j++) {
      const f = (t - tk) / RISE; if (f < 0 || f >= 1) continue;
      const m = list[(k0 * per + j) % list.length], a = rnd(k0, seed + j), b = rnd(k0, seed + j + 9);
      const x0 = x + (a - 0.5) * 0.16, top = level - 0.04;
      put(m, [x0 + (b - 0.5) * 0.06 * f, YPT + 0.12 + (top - YPT - 0.12) * f, (b - 0.5) * 0.14]); fade(m, Math.min(1, (1 - f) / 0.3));
    }
  }
  let lastTex = '', lastHead = '';
  function draw() {
    build();
    const r = rate(), t = cy.now(), xi = r * t / T, V = volt.v;
    const gO = 0.625 * xi, gH = 1.25 * xi, LA = FULL - gO, LC = FULL - gH, LR = 1.4 + 0.1296 * (gO + gH);
    if (v.scene) {
      for (const [m, L] of [[liqA, LA], [liqC, LC]]) { m.scale.y = L - A0; m.position.y = (A0 + L) / 2; }
      if (Math.abs(LR - resAt) > 0.002) { resAt = LR; resLiq.geometry.dispose(); resLiq.geometry = upTo(LR); }
      [...oB, ...hB].forEach((m) => put(m, OFF));
      if (r > 0) for (let k = 0; k < NEVMAX; k++) {
        const t1 = ((k + 0.5) / NEVMAX) * T / r;
        if (t1 > t) break;
        bubbles(oB, XA, 1, k, t, t1, LA, 1);
        bubbles(hB, XC, 2, k, t, t1, LC, 5);
      }
      wire(4 * NEVMAX * xi);
      const head = V > VT + 1e-9 ? 'Above 1.229 V, oxygen forms at the anode and twice its volume of hydrogen at the cathode.'
        : V > VT - 1e-9 ? 'At 1.229 V, the applied voltage only balances the cell potential, and no gas forms.'
          : 'Below 1.229 V, the source cannot decompose water.';
      if (head !== lastHead) { lastHead = head; v.headline(head); }
      v.invalidate();
    }
    const rel = V > VT + 1e-9 ? '>' : V > VT - 1e-9 ? '=' : '<';
    const tex = `\\text{applied voltage} = ${hue('potential', V.toFixed(3) + '\\ \\text{V}')} ${rel} ${hue('potential', '1.229\\ \\text{V}')} = -\\kEocell`;
    if (tex !== lastTex) { lastTex = tex; ro.set(tex, 'Four electrons pass through the source for every O₂ and every two H₂, so the hydrogen arm fills twice as fast.'); }
    legend(cnv, [['e-', 'electron, e⁻', 8], ['O2', 'O₂', 10], ['H2', 'H₂', 8]], 300);
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();

/* =====================================================================
   FIGURE 17.20: silver plating a spoon, on a bench in three dimensions.
   A beaker of AgNO₃(aq), a silver strip on the left wired to the + side of
   the voltage source, a spoon of a base metal hung bowl down on the right
   wired to the − side. Sliders: current I (0.50 to 20.00 A, default
   10.23 A) and time t (5 to 120 min, default 60 min), Example 17.9's.
   Moving: the clock plays the run from 0 to t in T = 6 s and holds; the
   model time is t·(clock/T). n = It/F, the silver deposited is 107.9n g,
   the anode loses as much as the spoon gains. Ag⁺ events: one per 1/12 of
   Example 17.9's 0.3817 mol, between 3 and 36, each with one electron
   through the wire. The anode thins to 1 − 0.6·m/161 g of its thickness
   (161 g is the most the sliders reach); the spoon's silver coat grows
   in thickness and opacity with m. Pitch between 2° and 70° above level.
===================================================================== */
(function () {
  const d = sim('sim-silver-plating');
  const v = F.view3d(d.stage, { spin: 'off', pitch: [0.035, 1.22], views: [{ label: 'front', yaw: 0, pitch: 0.16 }, { label: 'above', yaw: 0, pitch: 1.1 }], h: 620, dist: 7.2, tilt: 0.16 });
  const grp = v.part(0), cnv = F.makeCanvas(d.stage, 100);
  grp.position.y = -0.4;
  const T = 6, LIFE = 1.0, FARADAY = 96485, M_AG = 107.9, M_MAX = 20 * 7200 / FARADAY * M_AG;
  const XA = -0.5, XC = 0.5, RB = 1.15, YB = -1.3, YT = 0.35, YL = 0, YW = 1.35, SW = 0.34, SD = 0.07, SY0 = -0.85, SY1 = 0.75;
  const BOWL = { c: [XC, -0.8, 0], s: [0.2, 0.3, 0.09] }, HY0 = -0.55, HY1 = 0.85, HR = 0.035;
  const cy = cycle(() => T, 1.2);
  const cur = F.ctl(d.controls, { label: '\\kI', cls: 'current', min: 0.5, max: 20, step: 0.01, value: 10.23, unit: 'A', dec: 2, onInput: () => cy.reset() });
  const tmin = F.ctl(d.controls, { label: '\\kt', cls: 'time', min: 5, max: 120, step: 1, value: 60, unit: 'min', dec: 0, onInput: () => cy.reset() });
  const ro = F.readout(d);
  let sig = '', wire = null, strip = null, coat = [], ions = [], coatR = 1;
  const palSig = () => [PAL.ink, PAL.soft, PAL.muted, PAL.panel, F.el('Ag'), F.el('e-')].join('|');
  const sig4 = (x) => (x === 0 ? '0' : x.toPrecision(4));
  const bowl = (color, extra, grow, name) => {
    const m = v.pickable(F.mesh.sphere(grp, BOWL.c, 1, color, extra), name);
    m.scale.set(BOWL.s[0] + grow, BOWL.s[1] + grow, BOWL.s[2] + grow); return m;
  };
  function build() {
    if (!v.scene || palSig() === sig) return; sig = palSig();
    v.clear();
    v.pickable(F.mesh.box(grp, [0, YB - 0.06, 0], [5.4, 0.1, 2.6], PAL.soft), 'bench');
    v.pickable(cyl(grp, 0, YB, YT, RB, RB, PAL.ink, glass()), 'the beaker');
    const floor = new T3D.Mesh(new T3D.CircleGeometry(RB, 40), F.mesh.mat(PAL.ink, glass())); floor.rotation.x = -Math.PI / 2; floor.position.set(0, YB + 0.005, 0); grp.add(floor);
    v.pickable(cyl(grp, 0, YB, YL, RB - 0.02, RB - 0.02, PAL.muted, LIQ, false), 'silver nitrate solution, AgNO₃(aq)');
    const anode = 'the silver anode, which dissolves as Ag⁺';
    v.pickable(F.mesh.box(grp, [XA, (YL + SY1) / 2, 0], [SW, SY1 - YL, SD], F.el('Ag')), anode);
    strip = v.pickable(F.mesh.box(grp, [XA, (YL + SY0) / 2, 0], [SW, YL - SY0, SD], F.el('Ag')), anode);
    const spoon = 'the spoon, of an inexpensive metal, the cathode';
    v.pickable(F.mesh.stick(grp, [XC, HY0, 0], [XC, HY1, 0], HR, PAL.muted), spoon);
    v.pickable(F.mesh.sphere(grp, [XC, HY1, 0], 0.06, PAL.muted), spoon);
    bowl(PAL.muted, {}, 0, spoon);
    const coatName = 'silver plated onto the spoon';
    coat = [v.pickable(F.mesh.stick(grp, [XC, HY0 + 0.05, 0], [XC, YL, 0], HR + 0.008, F.el('Ag'), { transparent: true }), coatName), bowl(F.el('Ag'), { transparent: true }, 0.012, coatName)];
    coatR = coat[0].scale.x;
    wire = circuit(v, grp, [[XA, SY1, 0], [XA, YW, 0], [XC, YW, 0], [XC, HY1, 0]], [0, YW, 0], 14);
    ions = Array.from({ length: 12 }, () => v.pickable(F.mesh.sphere(grp, OFF, 0.078, F.el('Ag'), { transparent: true }), 'a silver ion, Ag⁺, moving from the anode to the spoon'));
    [['silver (anode, +)', [-RB - 0.75, 0.45, 0]], ['spoon (cathode, −)', [RB + 0.8, 0.45, 0]], ['AgNO<sub>3</sub>(<em>aq</em>)', [0, YB - 0.28, RB + 0.1]], ['voltage source', [1.35, YW, 0]]]
      .forEach(([s, p]) => v.label(s, p, grp, 0));
    v.headline('Silver leaves the anode as Ag<sup>+</sup> and plates onto the spoon at the cathode.');
  }
  /* where the ion of event k leaves the strip's right face and where it lands on the spoon */
  function ends(k) {
    const a = rnd(k, 3), b = rnd(k, 5), z = (rnd(k, 7) - 0.5) * 0.14;
    const p = [XA + SW / 2 + 0.06, SY0 + 0.1 + a * (YL - SY0 - 0.2), z];
    const onBowl = b < 0.6, y = onBowl ? BOWL.c[1] + (b / 0.6 - 0.5) * 0.4 : HY0 + (b - 0.6) / 0.4 * (YL - 0.1 - HY0);
    const dx = onBowl ? BOWL.s[0] * Math.sqrt(Math.max(0, 1 - ((y - BOWL.c[1]) / BOWL.s[1]) ** 2)) : HR;
    return { p, q: [XC - dx - 0.09, y, z * 0.4] };
  }
  let lastTex = '';
  function draw() {
    build();
    const I = cur.v, ts = tmin.v * 60, clock = cy.now(), tm = ts * clock / T;
    const n = I * tm / FARADAY, m = +sig4(n) * M_AG + 1e-9, nEnd = I * ts / FARADAY;
    const NEV = Math.round(Math.min(36, Math.max(3, 12 * nEnd / 0.3817)));
    if (v.scene) {
      ions.forEach((g) => put(g, OFF));
      for (let k = 0; k < NEV; k++) {
        const t1 = LIFE + ((k + 0.5) / NEV) * (T - LIFE), f = (clock - (t1 - LIFE)) / LIFE;
        if (f < 0 || f >= 1) continue;
        const { p, q } = ends(k), g = ions[k % ions.length];
        put(g, lerp3(p, q, F.ease.smooth(f))); g.material.opacity = Math.min(1, f / 0.25, (1 - f) / 0.2);
      }
      wire(NEV * clock / T);
      strip.scale.z = 1 - 0.6 * m / M_MAX;
      const k = Math.min(1, m / M_MAX);
      coat.forEach((c) => { c.visible = m > 0; c.material.opacity = Math.min(1, 0.25 + 3 * k); });
      coat[0].scale.set(coatR * (1 + 2 * k), coat[0].scale.y, coatR * (1 + 2 * k));
      coat[1].scale.set(BOWL.s[0] + 0.012 + 0.05 * k, BOWL.s[1] + 0.012 + 0.05 * k, BOWL.s[2] + 0.012 + 0.05 * k);
      v.invalidate();
    }
    const tex = `\\kn = \\frac{\\kI\\,\\kt}{\\kFaraday} = \\frac{(${hue('current', I.toFixed(2) + '\\ \\text{A}')})(${hue('time', Math.round(tm) + '\\ \\text{s}')})}{${hue('charge', '96\\,485\\ \\text{C/mol}')}} = ${hue('amount', sig4(n) + '\\ \\text{mol}')}`;
    const note = `One mole of silver plates onto the spoon for each mole of electrons, so the spoon has gained $${hue('mass', sig4(m) + '\\ \\text{g}')}$.`;
    if (tex !== lastTex) { lastTex = tex; ro.set(tex, note, { values: false }); }
    legend(cnv, [['e-', 'electron, e⁻', 8], ['Ag', 'Ag⁺', 12]], 300);
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();
};
