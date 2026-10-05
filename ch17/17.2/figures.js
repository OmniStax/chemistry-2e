/* Figures for section 17.2 Galvanic Cells. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['17.2'] = function (root, F) {
const { PAL, cycle, register, begin, text, dot } = F;
const sim = (id, H) => F.sim(root, id, H);
const TAU = 2 * Math.PI;
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;
/* a fixed pseudo-random number in [0, 1) for event k and draw j, so every run draws the same */
const rnd = (k, j) => { const s = Math.sin(k * 127.1 + j * 311.7) * 43758.5453; return s - Math.floor(s); };

/* =====================================================================
   FIGURE 17.3 + 17.4: two galvanic cells on a bench, in three dimensions.
   Two beakers of equal volume joined by a salt bridge and by a wire through
   the external circuit. Moving: the cell runs for T = 6 s of model time and
   holds. Every τ = 0.6 s two electrons cross the wire and one event happens
   in each half-cell: one Cu²⁺ (Mg²⁺) leaves the anode, two Ag⁺ plate onto
   the cathode (two Fe³⁺ arrive at the platinum and leave as Fe²⁺), and two
   anions and two cations leave the bridge's plugs. The extent ξ (mol/L)
   grows linearly to XMAX: [Cu²⁺] = 1 + ξ, [Ag⁺] = 1 − 2ξ; [Mg²⁺] = 0.1 + ξ,
   [Fe³⁺] = 0.2 − 2ξ, [Fe²⁺] = 0.3 + 2ξ. CU_BLUE is the color of Cu²⁺(aq),
   a physical fact. The cells stand on a bench, so the pitch stays between
   2° and 70° above level.
===================================================================== */
(function () {
  const T3D = window.THREE;
  const d = sim('sim-galvanic-cell');
  const v = F.view3d(d.stage, { spin: 'off', pitch: [0.035, 1.22], views: [{ label: 'front', yaw: 0, pitch: 0.16 }, { label: 'above', yaw: 0, pitch: 1.1 }], h: 660, dist: 8.4, tilt: 0.16 });
  const grp = v.part(0), cnv = F.makeCanvas(d.stage, 100);
  grp.position.y = -0.35;
  const CU_BLUE = '#3b8fd9';
  const T = 6, TAU_E = 0.6, LIFE = 1.8;
  const XA = -1.7, XC = 1.7, RB = 0.8, YB = -1.3, YT = 0.35, YL = 0, XS = 1.15, YP = -0.5, YW = 1.45;
  const CELLS = {
    cu: {
      xmax: 0.25, dec: 2,
      head: 'Electrons flow from the copper anode to the silver cathode.',
      labels: ['Cu anode (−)', 'Ag cathode (+)', 'salt bridge (NaNO<sub>3</sub>)', 'Cu(NO<sub>3</sub>)<sub>2</sub>(<em>aq</em>)', 'AgNO<sub>3</sub>(<em>aq</em>)'],
      kinds: [
        { el: 'Cu', role: 'out', at: 'anode', m: 1, name: 'a copper(II) ion, Cu²⁺, entering the solution from the anode' },
        { el: 'Ag', role: 'in', at: 'cathode', m: 2, name: 'a silver(I) ion, Ag⁺, about to plate onto the cathode as silver' },
        { el: 'NO3', role: 'out', at: 'left plug', m: 2, name: 'a nitrate ion, NO₃⁻, leaving the salt bridge' },
        { el: 'Na', role: 'out', at: 'right plug', m: 2, name: 'a sodium ion, Na⁺, leaving the salt bridge' },
      ],
      legend: [['e-', 'electron, e⁻'], ['Cu', 'Cu²⁺'], ['Ag', 'Ag⁺'], ['NO3', 'NO₃⁻'], ['Na', 'Na⁺']],
      tex: (x, f) => `\\mk{an}{\\text{Cu}(s)}\\,|\\,\\mk{as}{${hue('concentration', f(1 + x) + '\\;M')}\\;\\text{Cu}^{2+}(aq)}\\,\\|\\,\\mk{cs}{${hue('concentration', f(1 - 2 * x) + '\\;M')}\\;\\text{Ag}^{+}(aq)}\\,|\\,\\mk{ca}{\\text{Ag}(s)}`,
      note: 'For every two electrons through the wire, one Cu²⁺ ion enters the anode solution, two Ag⁺ ions plate onto the cathode, and two NO₃⁻ and two Na⁺ ions leave the salt bridge.',
    },
    mg: {
      xmax: 0.075, dec: 3,
      head: 'Electrons flow from the magnesium anode to the platinum.',
      labels: ['Mg anode (−)', 'Pt cathode (+)', 'salt bridge', 'MgCl<sub>2</sub>(<em>aq</em>)', 'FeCl<sub>3</sub>(<em>aq</em>), FeCl<sub>2</sub>(<em>aq</em>)'],
      kinds: [
        { el: 'Mg', role: 'out', at: 'anode', m: 1, name: 'a magnesium ion, Mg²⁺, entering the solution from the anode' },
        { el: 'Fe', role: 'in', at: 'cathode', m: 2, name: 'an iron(III) ion, Fe³⁺, about to take an electron at the platinum' },
        { el: 'Fe', role: 'out', at: 'cathode', m: 2, name: 'an iron(II) ion, Fe²⁺, leaving the platinum' },
        { el: 'Cl', role: 'out', at: 'left plug', m: 2, name: 'a chloride ion, Cl⁻, leaving the salt bridge' },
        { el: 'Na', role: 'out', at: 'right plug', m: 2, name: 'a sodium ion, Na⁺, leaving the salt bridge' },
      ],
      legend: [['e-', 'electron, e⁻'], ['Mg', 'Mg²⁺'], ['Fe', 'Fe³⁺ in, Fe²⁺ out'], ['Cl', 'Cl⁻'], ['Na', 'Na⁺']],
      tex: (x, f) => `\\mk{an}{\\text{Mg}(s)}\\,|\\,\\mk{as}{${hue('concentration', f(0.1 + x) + '\\;M')}\\;\\text{Mg}^{2+}(aq)}\\,\\|\\,\\mk{cs}{${hue('concentration', f(0.2 - 2 * x) + '\\;M')}\\;\\text{Fe}^{3+}(aq),\\,${hue('concentration', f(0.3 + 2 * x) + '\\;M')}\\;\\text{Fe}^{2+}(aq)}\\,|\\,\\mk{ca}{\\text{Pt}(s)}`,
      note: 'For every two electrons through the wire, one Mg²⁺ ion enters the anode solution, two Fe³⁺ ions become Fe²⁺ at the platinum, which does not change, and two Cl⁻ and two Na⁺ ions leave the salt bridge.',
    },
  };
  const cy = cycle(() => T, 1.2);
  const cell = F.choice(d.controls, { label: '\\text{cell}', options: [{ value: 'cu', label: 'copper and silver(I)' }, { value: 'mg', label: 'magnesium and iron(III)' }], value: 'cu', ms: 0, aria: 'the galvanic cell', onInput: () => cy.reset() });
  const ro = F.readout(d);

  /* the electrodes: where each one's top meets the wire, and the points ions leave from or arrive at */
  const PLATE = { w: 0.32, d: 0.06, y0: -0.95, y1: 0.75 };
  const AX = XA - 0.25, CX = XC + 0.25;
  const MG = { x: XA - 0.35, c: [XA - 0.03, -0.86], r0: 0.32, r1: 0.06, turns: 2.5 };
  const PT = { x: XC + 0.45, yc: -0.86, r: 0.14, len: 0.85, turns: 8 };
  const spiral = (u) => { const a = Math.PI + u * MG.turns * TAU, r = MG.r0 - u * (MG.r0 - MG.r1); return [MG.c[0] + r * Math.cos(a), MG.c[1] + r * Math.sin(a), 0]; };
  const helix = (u) => { const p = u * PT.turns * TAU; return [PT.x - u * PT.len, PT.yc + PT.r * Math.cos(p), PT.r * Math.sin(p)]; };
  const top = (c) => (c === 'cu' ? [[AX, PLATE.y1, 0], [CX, PLATE.y1, 0]] : [[MG.x, 0.75, 0], [PT.x, 0.75, 0]]);
  function surface(c, at, k, j) {
    const a = rnd(k, j), b = rnd(k, j + 7), s = rnd(k, j + 13) < 0.5 ? -1 : 1;
    if (at === 'left plug' || at === 'right plug') return [(at === 'left plug' ? -XS : XS) + (a - 0.5) * 0.12, YP - 0.06, (b - 0.5) * 0.12];
    if (c === 'cu') return [(at === 'anode' ? AX : CX) + (a - 0.5) * PLATE.w, PLATE.y0 + 0.1 + b * (YL - PLATE.y0 - 0.25), s * 0.05];
    if (at === 'anode') { const p = spiral(0.05 + 0.9 * a); return [p[0], p[1], s * 0.06]; }
    const p = helix(0.05 + 0.9 * a); return [p[0], p[1] + (b - 0.5) * 0.06, p[2] + s * 0.05];
  }
  /* a point in the solution about half a unit from p, kept inside its beaker */
  function away(p, k, j) {
    const xc = p[0] < 0 ? XA : XC, a = rnd(k, j + 21) * TAU, e = (rnd(k, j + 29) - 0.5) * 1.2;
    let q = [p[0] + 0.5 * Math.cos(a) * Math.cos(e), p[1] + 0.5 * Math.sin(e) - 0.12, p[2] + 0.5 * Math.sin(a) * Math.cos(e)];
    const dx = q[0] - xc, dz = q[2], r = Math.hypot(dx, dz), lim = RB - 0.18;
    if (r > lim) q = [xc + dx * lim / r, q[1], dz * lim / r];
    q[1] = Math.max(YB + 0.15, Math.min(YL - 0.12, q[1]));
    return q;
  }

  /* the tube along a path of points, smoothed */
  const tube = (pts, r, color, extra) => {
    const m = new T3D.Mesh(new T3D.TubeGeometry(new T3D.CatmullRomCurve3(pts.map((p) => new T3D.Vector3(p[0], p[1], p[2]))), Math.max(48, pts.length * 3), r, 12, false), F.mesh.mat(color, extra));
    grp.add(m); return m;
  };
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
  /* even samples along a straight-run path, for the electrons and the tubes */
  function along(pts, n) {
    const seg = pts.slice(1).map((p, i) => Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1], p[2] - pts[i][2])), L = seg.reduce((a, b) => a + b, 0);
    const at = (s) => { let i = 0; while (i < seg.length - 1 && s > seg[i]) { s -= seg[i]; i++; } const t = Math.min(1, s / seg[i]); return pts[i].map((c, k) => c + (pts[i + 1][k] - c) * t); };
    return { L, at, pts: Array.from({ length: n + 1 }, (_, i) => at((i / n) * L)) };
  }

  let sig = '', parts = {}, pools = [], electrons = [], wire = null, coils = [];
  /* ionic radii, drawn as 0.04 + 0.00033 × the radius in pm: Mg²⁺ 72, Cu²⁺ 73, Fe²⁺ 78, Na⁺ 102, Ag⁺ 115, Cl⁻ 181 */
  const ION_R = { Mg: 0.064, Cu: 0.064, Fe: 0.066, Na: 0.074, Ag: 0.078, Cl: 0.1 }, NE = 16;
  const palSig = () => [PAL.ink, PAL.soft, PAL.muted, PAL.panel, F.fact(CU_BLUE), ...['Cu', 'Ag', 'Mg', 'Pt', 'Fe', 'Na', 'Cl', 'N', 'O', 'e-'].map((s) => F.el(s)), cell.value].join('|');
  function ion(kind, name) {
    const g = new T3D.Group(); grp.add(g);
    if (kind === 'NO3') {
      v.pickable(F.mesh.sphere(g, [0, 0, 0], 0.05, F.el('N')), name);
      for (let i = 0; i < 3; i++) { const a = i * TAU / 3; v.pickable(F.mesh.sphere(g, [0.075 * Math.cos(a), 0.075 * Math.sin(a), 0], 0.045, F.el('O')), name); }
    } else v.pickable(F.mesh.sphere(g, [0, 0, 0], ION_R[kind], F.el(kind)), name);
    g.traverse((o) => { if (o.material) { o.material.transparent = true; } });
    g.position.set(0, -50, 0); return g;
  }
  /* the magnesium ribbon at nine thicknesses, one shown at a time, the rest kept out of sight */
  const mgCoil = (lv) => {
    const r = 0.042 * (1 - 0.4 * lv / 8), pts = [[MG.x, 0.75, 0], [MG.x, MG.c[1] + 0.12, 0], ...Array.from({ length: 80 }, (_, i) => spiral(i / 79))];
    return v.pickable(tube(pts, r, F.el('Mg')), 'the magnesium anode, an active electrode');
  };
  function build() {
    if (!v.scene || palSig() === sig) return; sig = palSig();
    v.clear(); parts = {}; coils = [];
    const c = cell.value, C0 = CELLS[c];
    const glass = { transparent: true, opacity: 0.1, depthWrite: false, side: T3D.DoubleSide };
    v.pickable(F.mesh.box(grp, [0, YB - 0.06, 0], [6.4, 0.1, 2.2], PAL.soft), 'bench');
    for (const [x, who] of [[XA, 'anode'], [XC, 'cathode']]) {
      const b = new T3D.Mesh(new T3D.CylinderGeometry(RB, RB, YT - YB, 40, 1, true), F.mesh.mat(PAL.ink, glass)); b.position.set(x, (YT + YB) / 2, 0); grp.add(b);
      const floor = new T3D.Mesh(new T3D.CircleGeometry(RB, 40), F.mesh.mat(PAL.ink, glass)); floor.rotation.x = -Math.PI / 2; floor.position.set(x, YB + 0.005, 0); grp.add(floor);
      const liq = new T3D.Mesh(new T3D.CylinderGeometry(RB - 0.02, RB - 0.02, YL - YB - 0.01, 40), F.mesh.mat(PAL.muted, { transparent: true, opacity: 0.14, depthWrite: false })); liq.position.set(x, (YL + YB) / 2, 0); grp.add(liq);
      v.pickable(liq, who === 'anode' ? 'the anode half-cell’s solution' : 'the cathode half-cell’s solution');
      parts[who + 'Liq'] = liq;
    }
    /* the salt bridge, an inverted U of glass with a porous plug at each end */
    const bridge = rounded([[-XS, YP, 0], [-XS, 0.9, 0], [XS, 0.9, 0], [XS, YP, 0]], 0.3);
    v.pickable(tube(bridge, 0.13, PAL.ink, glass), 'the salt bridge');
    tube(bridge, 0.105, PAL.muted, { transparent: true, opacity: 0.16, depthWrite: false });
    for (const s of [-1, 1]) v.pickable(F.mesh.stick(grp, [s * XS, YP - 0.04, 0], [s * XS, YP + 0.08, 0], 0.12, PAL.muted), 'a porous plug');
    /* the wire through the external circuit, and the path the electrons follow */
    const [ta, tc] = top(c);
    const path = [ta, [ta[0], YW, 0], [tc[0], YW, 0], tc];
    const smooth = rounded(path, 0.35);
    v.pickable(tube(smooth, 0.025, PAL.ink), 'the wire of the external circuit');
    v.pickable(F.mesh.box(grp, [0, YW, 0], [1.1, 0.46, 0.3], PAL.panel), 'the external circuit');
    F.mesh.box(grp, [0, YW, 0], [1.14, 0.5, 0.26], PAL.muted);
    wire = along(smooth.map((p) => [p[0], p[1], 0]), 200);
    electrons = Array.from({ length: NE }, () => v.pickable(F.mesh.sphere(grp, [0, -50, 0], 0.05, F.el('e-')), 'an electron, e⁻, in the wire'));
    /* the electrodes */
    if (c === 'cu') {
      for (const [x, el, who] of [[AX, 'Cu', 'anode'], [CX, 'Ag', 'cathode']]) {
        const name = who === 'anode' ? 'the copper anode, an active electrode' : 'the silver cathode, an active electrode';
        v.pickable(F.mesh.box(grp, [x, (YL + PLATE.y1) / 2, 0], [PLATE.w, PLATE.y1 - YL, PLATE.d], F.el(el)), name);
        parts[who] = v.pickable(F.mesh.box(grp, [x, (YL + PLATE.y0) / 2, 0], [PLATE.w, YL - PLATE.y0, PLATE.d], F.el(el)), name);
      }
    } else {
      coils = Array.from({ length: 9 }, (_, lv) => mgCoil(lv));
      const pt = [[PT.x, 0.75, 0], [PT.x, PT.yc + PT.r + 0.1, 0], ...Array.from({ length: 160 }, (_, i) => helix(i / 159))];
      v.pickable(tube(pt, 0.022, F.el('Pt')), 'the platinum cathode, an inert electrode');
    }
    pools = C0.kinds.map((k) => {
      const n = k.m * (Math.ceil(LIFE / TAU_E) + 1);
      return { ...k, meshes: Array.from({ length: n }, () => ion(k.el, k.name)) };
    });
    const spots = [[XA - 1.35, 0.55, 0], [XC + 1.35, 0.55, 0], [0, 0.4, 0], [XA, YB - 0.3, 1.0], [XC, YB - 0.3, 1.0]];
    C0.labels.forEach((s, i) => v.label(s, spots[i], grp, 0));
    v.label('external circuit', [0, YW + 0.4, 0], grp, 0);
    v.headline(C0.head);
  }
  function placeIons(t) {
    const c = cell.value, K = Math.floor(T / TAU_E);
    pools.forEach((pool, pi) => {
      pool.meshes.forEach((m) => m.position.set(0, -50, 0));
      for (let k = 0; k < K; k++) {
        const tk = (k + 0.5) * TAU_E, out = pool.role === 'out';
        const f = out ? (t - tk) / LIFE : 1 + (t - tk) / LIFE;
        if (f < 0 || f >= 1 || (!out && t > tk)) continue;
        for (let j = 0; j < pool.m; j++) {
          /* an Fe²⁺ leaves from where its Fe³⁺ arrived, so both use the cathode's draw for that event */
          const seed = pool.at === 'cathode' ? 100 + j : pi * 10 + j;
          const p = surface(c, pool.at, k, seed), q = away(p, k, seed);
          const a = out ? p : q, b = out ? q : p, g = pool.meshes[(k * pool.m + j) % pool.meshes.length];
          g.position.set(a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f);
          const o = out ? Math.min(1, (1 - f) / 0.35) : Math.min(1, f / 0.3);
          g.traverse((x) => { if (x.material) x.material.opacity = o; });
        }
      }
    });
  }
  let lastTex = '';
  function draw() {
    build();
    const c = cell.value, C0 = CELLS[c], t = cy.now(), x = C0.xmax * t / T, run = x / C0.xmax;
    if (v.scene) {
      placeIons(t);
      const sp = wire.L / NE, vel = 2 * sp / TAU_E;
      electrons.forEach((m, i) => {
        const s = (i * sp + vel * t) % wire.L, p = wire.at(s), inBox = Math.abs(p[0]) < 0.55 && p[1] > YW - 0.3;
        if (inBox) m.position.set(0, -50, 0); else m.position.set(p[0], p[1], p[2]);
      });
      if (c === 'cu') {
        parts.anode.scale.z = 1 - 0.5 * run; parts.cathode.scale.z = 1 + 0.9 * run;
        parts.anodeLiq.material.color.set(F.fact(CU_BLUE)); parts.anodeLiq.material.opacity = 0.26 + 0.14 * run;
      } else {
        const lv = Math.round(run * 8);
        coils.forEach((m, i) => m.position.set(0, i === lv ? 0 : -50, 0));
      }
      v.invalidate();
    }
    const fx = (y) => y.toFixed(C0.dec);
    const s = C0.tex(x, fx);
    if (s !== lastTex) { lastTex = s; ro.set(s, C0.note, { form: c, values: false }); }
    /* the legend: every particle the cell moves, named once */
    const { ctx } = begin(cnv);
    const items = C0.legend, gap = 270, x0 = 700 - (items.length - 1) * gap / 2, y = 50;
    items.forEach(([s0, name], i) => {
      const cx = x0 + i * gap;
      if (s0 === 'NO3') {
        dot(ctx, cx - 30, y, F.el('N'), true, 9);
        for (let k = 0; k < 3; k++) { const a = k * TAU / 3 - Math.PI / 2; dot(ctx, cx - 30 + 15 * Math.cos(a), y + 15 * Math.sin(a), F.el('O'), true, 8); }
      } else dot(ctx, cx - 30, y, F.el(s0), true, s0 === 'e-' ? 8 : 160 * ION_R[s0]);
      text(ctx, name, cx - 8, y, PAL.ink, { size: 26, align: 'left' });
    });
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();
};
