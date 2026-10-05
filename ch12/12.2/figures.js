/* Figures for section 12.2 Factors Affecting Reaction Rates. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['12.2'] = function (root, F) {
const { el, fmt, tex, C, PAL, ctl, cycle, register, begin, line, dot, text, topline, axes } = F;
const T3D = window.THREE;
const { sphere: sphere3, mat: mat3 } = F.mesh;
const TAU = 2 * Math.PI;
const R8 = 8.314;                                    /* J mol⁻¹ K⁻¹ */
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;

/* =====================================================================
   SIM: a box of nitric oxide and ozone, NO + O₃ ⟶ NO₂ + O₂. Speeds are
   drawn from the Maxwell-Boltzmann distribution at T with the real molar
   masses; an NO meeting an O₃ reacts when its energy of approach along the
   line of centres passes EA, a model threshold, and otherwise bounces off
   elastically. A run of TRUN seconds is computed whole when a slider moves,
   so the transport scrubs it exactly. Each molecule stands for 0.10 M. The
   strip beneath plots [O₃] against t (0 to 5 s, 0 to 2.5 M, fixed) with
   the secant whose slope is −rate. No ground, so the yaw is free and the
   pitch held within 70° of level; no idle spin.
===================================================================== */
(function () {
  const d = F.sim(root, 'sim-collisions');
  const v = F.view3d(d.stage, { spin: 'off', pitch: [-1.22, 1.22], views: [{ label: 'front', yaw: 0, pitch: 0.15 }, { label: 'corner', yaw: 0.7, pitch: 0.42 }], h: 360, dist: 5.6, tilt: 0.18 });
  const grp = v.part(0), cnv = F.makeCanvas(d.stage, 320);
  const Tc = ctl(d.controls, { label: '\\kT', cls: 'temperature', min: 200, max: 600, step: 10, value: 300, unit: 'K', dec: 0, onInput: rerun, aria: 'temperature of the gases in kelvin' });
  const cA = ctl(d.controls, { label: hue('concentration', '[\\text{NO}]_{0}'), cls: 'concentration', key: 'no', min: 0.5, max: 2, step: 0.1, value: 1, unit: 'M', dec: 2, onInput: rerun, aria: 'initial concentration of nitric oxide in mol per liter' });
  const cB = ctl(d.controls, { label: hue('concentration', '[\\text{O}_{3}]_{0}'), cls: 'concentration', key: 'o3', min: 0.5, max: 2, step: 0.1, value: 1, unit: 'M', dec: 2, onInput: rerun, aria: 'initial concentration of ozone in mol per liter' });
  const fx = el('div'), nt = el('small'); d.readout.append(fx, nt);
  nt.textContent = 'Each molecule drawn stands for 0.10 M of its gas, and in the real gases the collisions come billions of times a second.';

  /* each molecule as [element, x, y, radius] about its centre, scene units */
  const MOLS = {
    NO: { M: 30.01, name: 'nitric oxide, NO', atoms: [['N', -0.055, 0, 0.066], ['O', 0.055, 0, 0.062]] },
    O3: { M: 48.00, name: 'ozone, O₃', atoms: [['O', 0, 0.035, 0.062], ['O', -0.1, -0.025, 0.062], ['O', 0.1, -0.025, 0.062]] },
    NO2: { M: 46.01, name: 'nitrogen dioxide, NO₂', atoms: [['N', 0, 0.03, 0.066], ['O', -0.105, -0.015, 0.062], ['O', 0.105, -0.015, 0.062]] },
    O2: { M: 32.00, name: 'oxygen, O₂', atoms: [['O', -0.055, 0, 0.062], ['O', 0.055, 0, 0.062]] },
  };
  const L = 1, RC = 0.13, LIM = L - RC, KS = 0.0035, TRUN = 5, DT = 1 / 120, NF = Math.round(TRUN / DT), EA = 3000, PER = 0.1, HALO = 0.6;
  const gauss = () => { let a = 0; while (!a) a = Math.random(); return Math.sqrt(-2 * Math.log(a)) * Math.cos(TAU * Math.random()); };
  const draw3 = (M, T) => { const s = Math.sqrt((R8 * T) / (M / 1000)); return [gauss() * s, gauss() * s, gauss() * s]; };

  let run = null, sig = '', ms = [], halos = [], id = 0;
  function simulate() {
    const nA = Math.round(cA.v / PER), nB = Math.round(cB.v / PER), n = nA + nB, T = Tc.v;
    const kind = Array.from({ length: n }, (_, i) => (i < nA ? 'NO' : 'O3'));
    const x = [], u = [];
    for (let i = 0; i < n; i++) {
      let p, tries = 0;
      do { p = [0, 1, 2].map(() => (Math.random() * 2 - 1) * LIM); tries++; } while (tries < 60 && x.some((q) => Math.hypot(q[0] - p[0], q[1] - p[1], q[2] - p[2]) < 2.4 * RC));
      x.push(p); u.push(draw3(MOLS[kind[i]].M, T));
    }
    const pos = new Float32Array((NF + 1) * n * 3), dir = new Float32Array((NF + 1) * n * 3), at = new Array(n).fill(Infinity), events = [];
    for (let f = 0; f <= NF; f++) {
      for (let i = 0; i < n; i++) {
        const s = Math.hypot(u[i][0], u[i][1], u[i][2]) || 1;
        for (let k = 0; k < 3; k++) { pos[(f * n + i) * 3 + k] = x[i][k]; dir[(f * n + i) * 3 + k] = u[i][k] / s; }
      }
      if (f === NF) break;
      const t = (f + 1) * DT;
      for (let i = 0; i < n; i++) for (let k = 0; k < 3; k++) {
        x[i][k] += u[i][k] * KS * DT;
        if (x[i][k] > LIM && u[i][k] > 0) u[i][k] = -u[i][k];
        if (x[i][k] < -LIM && u[i][k] < 0) u[i][k] = -u[i][k];
      }
      for (let a = 0; a < nA; a++) {
        if (at[a] < Infinity) continue;
        for (let b = nA; b < n; b++) {
          if (at[b] < Infinity) continue;
          const dx = [0, 1, 2].map((k) => x[b][k] - x[a][k]), r = Math.hypot(dx[0], dx[1], dx[2]);
          if (r >= 2 * RC || r === 0) continue;
          const nn = dx.map((q) => q / r), vn = [0, 1, 2].reduce((s, k) => s + (u[b][k] - u[a][k]) * nn[k], 0);
          if (vn >= 0) continue;
          const mA = MOLS.NO.M / 1000, mB = MOLS.O3.M / 1000, mu = (mA * mB) / (mA + mB);
          const react = 0.5 * mu * vn * vn > EA;
          events.push({ t, p: [0, 1, 2].map((k) => (x[a][k] + x[b][k]) / 2), react });
          if (react) { at[a] = at[b] = t; break; }
          for (let k = 0; k < 3; k++) { u[a][k] += ((2 * mB) / (mA + mB)) * vn * nn[k]; u[b][k] -= ((2 * mA) / (mA + mB)) * vn * nn[k]; }
        }
      }
    }
    return { n, nA, nB, kind, pos, dir, at, events, id: ++id };
  }
  const cy = cycle(() => TRUN, 1.2);
  function rerun() { run = simulate(); cy.reset(); }
  run = simulate();

  const palSig = () => [PAL.ink, PAL.panel, PAL.muted, F.CC, F.el('N'), F.el('O')].join('|');
  function molecule3(kind) {
    const g = new T3D.Group(); grp.add(g);
    MOLS[kind].atoms.forEach(([e, ax, ay, r]) => v.pickable(sphere3(g, [ax, ay, 0], r, F.el(e)), MOLS[kind].name));
    return g;
  }
  function build() {
    const key = [run.id, palSig()].join('|'); if (key === sig) return; sig = key;
    v.clear(); grp.position.set(0, -0.22, 0);
    const box = new T3D.Mesh(new T3D.BoxGeometry(2 * L, 2 * L, 2 * L), mat3(PAL.ink, { transparent: true, opacity: 0.06, depthWrite: false, side: T3D.DoubleSide })); grp.add(box);
    v.pickable(box, 'a box of nitric oxide and ozone');
    grp.add(new T3D.LineSegments(new T3D.EdgesGeometry(new T3D.BoxGeometry(2 * L, 2 * L, 2 * L)), new T3D.LineBasicMaterial({ color: new T3D.Color(PAL.ink) })));
    v.label('NO + O₃ ⟶ NO₂ + O₂', [0, L + 0.15, 0], grp, 6);
    ms = run.kind.map((k) => ({ before: molecule3(k), after: molecule3(k === 'NO' ? 'NO2' : 'O2') }));
    halos = run.events.filter((e) => e.react).map((e) => {
      const h = sphere3(grp, e.p, 2 * RC, PAL.ink, { transparent: true, opacity: 0, depthWrite: false });
      v.pickable(h, 'a collision that reacted'); return { h, t: e.t };
    });
  }

  function draw() {
    build();
    const t = cy.now(), f = Math.min(NF, Math.round(t / DT)), { n, pos, dir, at } = run;
    ms.forEach((m, i) => {
      const done = t >= at[i], g = done ? m.after : m.before;
      m.before.visible = !done; m.after.visible = done;
      const o = (f * n + i) * 3;
      g.position.set(pos[o], pos[o + 1], pos[o + 2]);
      g.rotation.set(0, Math.atan2(dir[o], dir[o + 2]), Math.asin(Math.max(-1, Math.min(1, dir[o + 1]))));
    });
    halos.forEach(({ h, t: te }) => { const k = (t - te) / HALO; h.visible = k >= 0 && k < 1; h.material.opacity = 0.35 * (1 - Math.max(0, k)); });
    v.invalidate();

    const seen = run.events.filter((e) => e.t <= t), hits = seen.length, reacted = seen.filter((e) => e.react).length;
    const c0 = run.nB * PER, conc = (s) => (run.nB - run.events.filter((e) => e.react && e.t <= s).length) * PER;
    const { ctx } = begin(cnv);
    topline(ctx, hits + (hits === 1 ? ' collision' : ' collisions') + ' between NO and O_{3} so far, and ' + reacted + ' of them reacted.');
    const box = { l: 150, r: 1300, t: 100, b: 250 };
    const { X, Y } = axes(ctx, box, [0, TRUN], [0, 2.5], { nx: 5, ny: 5, fy: (q) => fmt(q, 1), xl: 'time t (s)', xc: C('time'), yl: '[O_{3}] (M)', yc: C('concentration') });
    const steps = run.events.filter((e) => e.react && e.t <= t).map((e) => e.t);
    let px = 0, py = c0;
    steps.forEach((s) => { line(ctx, X(px), Y(py), X(s), Y(py), C('concentration'), 5); line(ctx, X(s), Y(py), X(s), Y(py - PER), C('concentration'), 5); px = s; py -= PER; });
    line(ctx, X(px), Y(py), X(t), Y(py), C('concentration'), 5);
    const tt = Math.max(t, 0.1), ct = conc(t);
    line(ctx, X(0), Y(c0), X(t), Y(ct), C('rate'), 3, [10, 10]);
    dot(ctx, X(0), Y(c0), C('concentration'), false, 10);
    dot(ctx, X(t), Y(ct), C('concentration'), true, 9);
    const lx = box.r - 300, ly = box.t + 8;
    line(ctx, lx, ly, lx + 40, ly, C('rate'), 3, [10, 10]);
    text(ctx, 'secant, slope −rate', lx + 50, ly + 6, PAL.ink, { size: 17, bg: PAL.panel });
    const rate = (c0 - ct) / tt;
    tex(fx, `\\krate = -\\frac{${hue('concentration', '\\Delta[\\text{O}_{3}]')}}{\\kdt} = -\\frac{${hue('concentration', fmt(ct, 2) + '\\ \\text{M}')} - ${hue('concentration', fmt(c0, 2) + '\\ \\text{M}')}}{${hue('time', fmt(tt, 1) + '\\ \\text{s}')}} = ${hue('rate', fmt(rate, 3) + '\\ \\text{M/s}')}`);
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();
};
