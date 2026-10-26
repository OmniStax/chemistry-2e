/* Figures for section 9.6 Non-Ideal Gas Behavior. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['9.6'] = function (root, F) {
const { fmt, tex, C, PAL, alpha, ctl, cycle, register, begin, line, text, topline, axes, curve, pinned, dot, scale } = F;
const sim = (id, H) => F.sim(root, id, H);
const TAU = 2 * Math.PI;
const T3D = window.THREE;
const { sphere: sphere3, mat: mat3 } = F.mesh;
const R = 0.08206;
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;
const sig3 = (x) => (x >= 100 ? fmt(x, 0) : x >= 10 ? fmt(x, 1) : x >= 1 ? fmt(x, 2) : fmt(x, 3));

/* The molar volume from the van der Waals equation, P = RT/(V − b) − a/V², by bisection. Above the
   critical temperature the right side falls steadily with V, so there is one root between b and RT/P + b. */
function molarVolume(a, b, P, T) {
  let lo = b * (1 + 1e-9), hi = (R * T) / P + b;
  for (let i = 0; i < 60; i++) { const m = (lo + hi) / 2; if ((R * T) / (m - b) - a / (m * m) - P > 0) lo = m; else hi = m; }
  return (lo + hi) / 2;
}
const zOf = (g, P, T) => (P * molarVolume(g.a, g.b, P, T)) / (R * T);

/* =====================================================================
   FIGURE 9.35: Z against P for five gases, each curve the van der Waals
   equation solved for the molar volume at the slider's temperature. Axes
   fixed: P 0 to 1000 atm, Z 0 to 2.5 (the highest curve, CH₄ at 310 K and
   1000 atm, reaches 2.3). 310 K is the floor because it is just above the
   critical temperature of CO₂. Still: a state is a place on the curves.
===================================================================== */
(function () {
  const ZG = [
    { f: 'H₂', a: 0.244, b: 0.0266 },
    { f: 'N₂', a: 1.39, b: 0.0391 },
    { f: 'O₂', a: 1.36, b: 0.0318 },
    { f: 'CH₄', a: 2.25, b: 0.0428 },
    { f: 'CO₂', a: 3.59, b: 0.0427 },
  ];
  /* Z = 1 where PV = RT, which the van der Waals equation meets at V = ab/(a − RTb), below the Boyle temperature a/(Rb) */
  const crossing = (g, T) => { const den = g.a - R * T * g.b; if (den <= 0) return null; const V = (g.a * g.b) / den; return (R * T) / V; };
  const WHO = ['h2', 'n2', 'o2', 'ch4', 'co2'];
  const d = sim('sim-z-graph', 560);
  const gas = F.select(d.controls, { label: '\\text{gas}', aria: 'the gas the readout follows', options: ZG.map((g, i) => ({ value: String(i), label: g.f })), value: '4', ms: 0 });
  let Tc = null;
  const Pc = ctl(d.controls, { label: '\\kP', cls: 'pressure', min: 0, max: 1000, step: 5, value: 200, unit: 'atm', dec: 0, aria: 'pressure in atmospheres',
    specials: [{ at: () => (Tc ? crossing(ZG[+gas.value], Tc.v) : null), label: 'Z = 1' }] });
  Tc = ctl(d.controls, { label: '\\kT', cls: 'temperature', min: 310, max: 800, step: 5, value: 310, unit: 'K', dec: 0, aria: 'temperature in kelvin' });
  const box = { l: 150, r: 1060, t: 120, b: 480 };
  function draw() {
    const { ctx } = begin(d.c);
    const P = Pc.v, T = Tc.v, Pe = Math.max(P, 0.5), gi = +gas.value, g = ZG[gi];
    const { X, Y } = axes(ctx, box, [0, 1000], [0, 2.5], { xl: 'P (atm)', xc: C('pressure'), yl: 'Z', yc: PAL.ink, nx: 5, ny: 5, fy: (v) => fmt(v, 1) });
    ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.05); ctx.fillRect(box.l, Y(1), box.r - box.l, box.b - Y(1)); ctx.restore();
    line(ctx, box.l, Y(1), box.r, Y(1), PAL.ink, 3, [10, 10]);
    text(ctx, 'ideal gas', box.r - 8, Y(1) - 12, PAL.ink, { size: 18, align: 'right', bg: PAL.panel });
    ctx.save(); ctx.beginPath(); ctx.rect(box.l, box.t - 4, box.r - box.l, box.b - box.t + 4); ctx.clip();
    ZG.forEach((q, i) => { if (i !== gi) curve(ctx, (p) => zOf(q, Math.max(p, 0.5), T), 0, 1000, X, Y, F.ref(WHO[i]), 3, 100); });
    curve(ctx, (p) => zOf(g, Math.max(p, 0.5), T), 0, 1000, X, Y, F.ref(WHO[gi]), 5, 100);
    ctx.restore();
    line(ctx, X(P), box.b, X(P), box.t, alpha(C('pressure'), 0.45), 2, [4, 8]);
    ZG.forEach((q, i) => { if (i === gi) return; const z = zOf(q, Pe, T); if (z <= 2.5) dot(ctx, X(P), Y(z), F.ref(WHO[i]), true, 6); });
    const z = zOf(g, Pe, T);
    pinned(ctx, box, X, Y, P, z, F.ref(WHO[gi]), 'Z = ' + fmt(z, 2));
    ZG.forEach((q, i) => {
      const y = 170 + i * 44;
      line(ctx, 1100, y, 1150, y, F.ref(WHO[i]), i === gi ? 5 : 3);
      text(ctx, q.f, 1164, y + 7, F.ref(WHO[i]), { size: 20, weight: i === gi ? 700 : 400 });
    });
    const Vm = molarVolume(g.a, g.b, Pe, T), VmS = +Vm.toPrecision(4), zS = (Pe * VmS) / (R * T);
    topline(ctx, P < 1 ? 'At a pressure near zero, every gas has Z = 1 and behaves as an ideal gas.'
      : 'At ' + fmt(P, 0) + ' atm and ' + fmt(T, 0) + ' K, Z for ' + g.f + ' is ' + fmt(zS, 2) + ', so its molar volume is ' + fmt(100 * zS, 0) + '% of an ideal gas’s.');
    tex(d.readout, P < 1 ? 'Z = \\frac{\\kP\\kVm}{R\\kT} = 1'
      : `Z = \\frac{\\kP\\kVm}{R\\kT} = \\frac{(${hue('pressure', fmt(P, 0))}\\ \\text{atm})(${hue('volume', String(VmS))}\\ \\text{L/mol})}{(0.08206\\ \\text{L atm/(mol K)})(${hue('temperature', fmt(T, 0))}\\ \\text{K})} = ${fmt(zS, 2)}`);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 9.36: an ideal gas and a real gas side by side in three
   dimensions, in the 4.25-L flask of Example 9.24. Held at constant
   volume, the real gas's pressure is the van der Waals value; held at
   constant pressure (the ideal gas's), the real box takes the volume the
   van der Waals equation gives and its width follows. Four molecules per
   mole. The ideal molecules are drawn at a fifth of their size. In the
   real box each molecule is pulled toward its neighbours in proportion to
   the attraction correction's share of the pressure, so a molecule near a
   wall is drawn back toward the rest; a gentle thermostat keeps the
   temperature. Moving: a continuous cycle with the transport and no
   scrubber. The orbit turns freely in yaw and holds the pitch within 70°
   of level; no idle spin, since the molecules already move.
===================================================================== */
(function () {
  const GASES = [
    { f: 'He', word: 'helium', m: 4.0, a: 0.0342, b: 0.0237, atoms: [['He', 0, 0, 6]] },
    { f: 'N₂', word: 'nitrogen', m: 28.0, a: 1.39, b: 0.0391, atoms: [['N', -6, 0, 7], ['N', 6, 0, 7]] },
    { f: 'O₂', word: 'oxygen', m: 32.0, a: 1.36, b: 0.0318, atoms: [['O', -6, 0, 7], ['O', 6, 0, 7]] },
    { f: 'CO₂', word: 'carbon dioxide', m: 44.0, a: 3.59, b: 0.0427, atoms: [['O', -13, 0, 7], ['O', 13, 0, 7], ['C', 0, 0, 6.5]] },
  ];
  const V0 = 4.25, HW = 1.1, HH = 0.85, HD = 0.85, CXI = -1.45, CXR = 1.45, K = 0.011;
  const palSig = () => [PAL.ink, PAL.panel, PAL.muted, F.el('He'), F.el('N'), F.el('O'), F.el('C'), F.ref('ideal-gas'), F.ref('real-gas')].join('|');
  const glass = (extra = {}) => ({ transparent: true, opacity: 0.1, depthWrite: false, side: T3D.DoubleSide, ...extra });
  const heading3 = () => { const z = 2 * Math.random() - 1, a = Math.random() * TAU, r = Math.sqrt(1 - z * z); return [r * Math.cos(a), r * Math.sin(a), z]; };

  const d = sim('sim-real-boxes');
  const v = F.view3d(d.stage, { spin: 'off', pitch: [-1.22, 1.22], views: [{ label: 'front', yaw: 0, pitch: 0.1 }, { label: 'corner', yaw: 0.6, pitch: 0.3 }], h: 360, dist: 7.6, tilt: 0.1 });
  const grp = v.part(0), cnv = F.makeCanvas(d.stage, 300);
  const held = F.choice(d.controls, { label: '\\text{held constant}', aria: 'the quantity held constant', options: [{ value: 'P', label: 'pressure' }, { value: 'V', label: 'volume' }], value: 'V', ms: 0, onInput: restart });
  const gas = F.choice(d.controls, { label: '\\text{gas}', aria: 'the gas in both boxes', options: GASES.map((g, i) => ({ value: String(i), label: g.f })), value: '3', ms: 0, onInput: restart });
  const Nc = ctl(d.controls, { label: '\\kn', cls: 'amount', min: 0.5, max: 10, step: 0.01, value: 3.46, unit: 'mol', dec: 2, aria: 'amount of gas in moles' });
  const Tc = ctl(d.controls, { label: '\\kT', cls: 'temperature', min: 310, max: 600, step: 1, value: 502, unit: 'K', dec: 0, aria: 'temperature in kelvin' });

  const g = () => GASES[+gas.value];
  function state() {
    const q = g(), n = Nc.v, T = Tc.v, nRT = n * R * T, Pi = nRT / V0;
    const rep = nRT / (V0 - n * q.b), att = (n * n * q.a) / (V0 * V0);
    const Vr = held.value === 'P' ? n * molarVolume(q.a, q.b, Pi, T) : V0;
    const attP = (n * n * q.a) / (Vr * Vr);
    return { q, n, T, nRT, Pi, rep, att, Pr: rep - att, Vr, attP, pull: Math.min(1.6, 6 * attP / Pi) };
  }

  const boxes = [{ id: 'ideal', cx: CXI, P: [] }, { id: 'real', cx: CXR, P: [] }];
  const halfW = (b, s) => (b.id === 'real' ? HW * s.Vr / V0 : HW);
  const inside = (hw) => [(2 * Math.random() - 1) * (hw - 0.1), (2 * Math.random() - 1) * (HH - 0.1), (2 * Math.random() - 1) * (HD - 0.1)];
  function sync() {
    const s = state(), N = Math.max(2, Math.round(4 * s.n));
    for (const b of boxes) {
      const hw = halfW(b, s);
      while (b.P.length < N) b.P.push({ x: inside(hw), u: heading3() });
      b.P.length = N;
      for (const p of b.P) p.x[0] = Math.max(-hw + 0.05, Math.min(hw - 0.05, p.x[0]));
    }
  }
  function restart() { for (const b of boxes) b.P = []; sync(); sig = ''; }

  function step(dt) {
    sync();
    const s = state(), s0 = 0.8 * Math.sqrt((s.T / 400) * (28 / s.q.m)), lim = [0, HH, HD];
    for (const b of boxes) {
      const hw = halfW(b, s); lim[0] = hw;
      const real = b.id === 'real';
      for (const p of b.P) {
        if (real && s.pull > 0) {
          const acc = [0, 0, 0];
          let seen = 0;
          for (const o of b.P) {
            if (o === p) continue;
            const dx = o.x[0] - p.x[0], dy = o.x[1] - p.x[1], dz = o.x[2] - p.x[2], r = Math.hypot(dx, dy, dz);
            if (r >= 1.1 || r < 1e-6) continue;
            const w = r < 0.28 ? -4 : 1;
            acc[0] += (w * dx) / r; acc[1] += (w * dy) / r; acc[2] += (w * dz) / r; seen++;
          }
          const vel = p.u.map((c) => c * s0);
          if (seen) for (let k = 0; k < 3; k++) vel[k] += (acc[k] / seen) * s.pull * 0.6 * dt;
          const sp = Math.hypot(vel[0], vel[1], vel[2]) || 1, target = sp + (s0 - sp) * Math.min(1, dt * 0.8);
          p.u = vel.map((c) => (c / sp) * (target / s0));
        }
        const spd = s0 * Math.hypot(p.u[0], p.u[1], p.u[2]), dir = p.u.map((c) => c / (Math.hypot(p.u[0], p.u[1], p.u[2]) || 1));
        for (let k = 0; k < 3; k++) {
          p.x[k] += dir[k] * spd * dt;
          const m = lim[k] - 0.05;
          if (p.x[k] > m) { p.x[k] = m; p.u[k] = -Math.abs(p.u[k]); }
          if (p.x[k] < -m) { p.x[k] = -m; p.u[k] = Math.abs(p.u[k]); }
        }
      }
    }
  }
  const cy = cycle(() => Infinity, 0);

  let sig = '', ms = [[], []];
  function build(s) {
    const key = [held.value, gas.value, boxes[0].P.length, fmt(s.Vr, 2), palSig()].join('|'); if (key === sig) return; sig = key;
    v.clear(); ms = [[], []];
    const q = s.q, name = (q.atoms.length === 1 ? 'an atom of ' : 'a molecule of ') + q.word + ', ' + q.f;
    boxes.forEach((b, bi) => {
      const hw = halfW(b, s);
      const who = F.ref(b.id === 'ideal' ? 'ideal-gas' : 'real-gas');
      const glassBox = new T3D.Mesh(new T3D.BoxGeometry(2 * hw, 2 * HH, 2 * HD), mat3(who, glass({ opacity: 0.14 }))); glassBox.position.set(b.cx, 0, 0); glassBox.renderOrder = 2; grp.add(glassBox);
      const edges = new T3D.LineSegments(new T3D.EdgesGeometry(glassBox.geometry), new T3D.LineBasicMaterial({ color: who, transparent: true, opacity: 0.7 })); edges.position.copy(glassBox.position); grp.add(edges);
      v.pickable(glassBox, b.id === 'ideal' ? 'the ideal gas' : 'the real gas, ' + q.word);
      v.label(b.id === 'ideal' ? 'ideal' : 'real', [b.cx, HH + 0.14, 0], grp, 6).style.color = who;
      const sc = b.id === 'ideal' ? 0.2 : 1;
      ms[bi] = b.P.map(() => {
        const m = new T3D.Group(); grp.add(m);
        q.atoms.forEach(([elm, dx, dy, rr]) => v.pickable(sphere3(m, [dx * K * sc, dy * K * sc, 0], rr * K * 1.3 * sc + (sc < 1 ? 0.012 : 0), F.el(elm)), (b.id === 'ideal' ? 'an ideal particle standing for ' : '') + name));
        return m;
      });
    });
  }
  restart();

  function draw() {
    const s = state();
    build(s);
    boxes.forEach((b, bi) => b.P.forEach((p, i) => { const m = ms[bi][i]; if (!m) return; m.position.set(b.cx + p.x[0], p.x[1], p.x[2]); m.rotation.set(0, Math.atan2(p.u[0], p.u[2]), Math.asin(Math.max(-1, Math.min(1, p.u[1] / (Math.hypot(p.u[0], p.u[1], p.u[2]) || 1))))); }));
    v.invalidate();
    const { ctx } = begin(cnv);
    const q = s.q, cp = C('pressure'), cv = C('volume'), atP = held.value === 'P';
    if (!atP) {
      const diff = +sig3(s.Pr) - +sig3(s.Pi);
      topline(ctx, 'At ' + fmt(s.T, 0) + ' K, ' + fmt(s.n, 2) + ' mol of ' + q.f + ' in 4.25 L exerts ' + sig3(s.Pr) + ' atm, ' + fmt(Math.abs(diff), Math.abs(diff) < 1 ? 2 : 1) + ' atm ' + (diff < 0 ? 'less' : 'more') + ' than an ideal gas would.');
      /* pressure axis fixed at 0 to 140 atm, above the largest nRT/(V − nb), 129 atm for 10 mol of CO₂ at 600 K */
      const X = (p) => 250 + (p / 140) * 1000;
      const bar = (y, p0, p1, fill) => { ctx.save(); ctx.fillStyle = fill; ctx.fillRect(X(p0), y - 16, X(p1) - X(p0), 32); ctx.restore(); };
      text(ctx, 'ideal gas', 230, 118, F.ref('ideal-gas'), { size: 20, align: 'right' });
      bar(111, 0, s.Pi, alpha(cp, 0.75));
      text(ctx, 'nRT/V = ' + sig3(s.Pi) + ' atm', X(s.Pi) + 12, 118, cp, { size: 18, weight: 600 });
      text(ctx, 'real gas', 230, 188, F.ref('real-gas'), { size: 20, align: 'right' });
      bar(181, 0, s.Pr, alpha(cp, 0.75));
      ctx.save(); ctx.strokeStyle = cp; ctx.lineWidth = 2; ctx.setLineDash([6, 6]); ctx.strokeRect(X(Math.min(s.Pr, s.rep)), 165, Math.abs(X(s.rep) - X(s.Pr)), 32); ctx.restore();
      text(ctx, 'nRT/(V − nb) = ' + sig3(s.rep) + ' atm, less n²a/V² = ' + sig3(s.att) + ' atm', X(0), 151, cp, { size: 18, weight: 600 });
      line(ctx, X(0), 222, X(140), 222, PAL.muted, 2);
      scale(ctx, X, 0, 140, 20, 222, '', 1);
      text(ctx, 'P (atm)', X(140), 276, cp, { size: 18, weight: 600, align: 'right' });
    } else {
      const diff = +fmt(s.Vr, 2) - V0, nb = s.n * q.b;
      topline(ctx, 'At ' + sig3(s.Pi) + ' atm and ' + fmt(s.T, 0) + ' K, ' + fmt(s.n, 2) + ' mol of ' + q.f + ' fills ' + fmt(s.Vr, 2) + ' L, ' + fmt(Math.abs(diff), 2) + ' L ' + (diff < 0 ? 'less' : 'more') + ' than the 4.25 L an ideal gas would fill.');
      /* volume axis fixed at 0 to 5 L; the real volume stays below 4.6 L across the sliders */
      const X = (V) => 250 + (V / 5) * 1000;
      const bar = (y, a0, a1, fill) => { ctx.save(); ctx.fillStyle = fill; ctx.fillRect(X(a0), y - 16, X(a1) - X(a0), 32); ctx.restore(); };
      text(ctx, 'ideal gas', 230, 118, F.ref('ideal-gas'), { size: 20, align: 'right' });
      bar(111, 0, V0, alpha(cv, 0.75));
      text(ctx, 'V = nRT/P = 4.25 L', X(V0) + 12, 118, cv, { size: 18, weight: 600 });
      text(ctx, 'real gas', 230, 188, F.ref('real-gas'), { size: 20, align: 'right' });
      bar(181, 0, s.Vr, alpha(cv, 0.75));
      bar(181, 0, nb, alpha(PAL.ink, 0.35));
      text(ctx, 'V = ' + fmt(s.Vr, 2) + ' L, of which nb = ' + fmt(nb, 3) + ' L', X(0), 151, cv, { size: 18, weight: 600 });
      line(ctx, X(0), 222, X(5), 222, PAL.muted, 2);
      scale(ctx, X, 0, 5, 1, 222, '', 1);
      text(ctx, 'V (L)', X(5), 276, cv, { size: 18, weight: 600, align: 'right' });
    }
    text(ctx, 'molecules drawn: four per mole; the ideal particles are drawn at a fifth of their size', 250, 294, PAL.muted, { size: 16 });
    const n = hue('amount', fmt(s.n, 2)), T = hue('temperature', fmt(s.T, 0)), a = String(q.a), b = String(q.b);
    if (!atP) {
      ro.set(`\\kP = \\frac{\\kn R\\kT}{\\kV-\\kn b}-\\frac{\\kn^{2}a}{\\kV^{2}} = \\frac{(${n})(0.08206)(${T})}{${hue('volume', '4.25')}-(${n})(${b})}-\\frac{(${n})^{2}(${a})}{(${hue('volume', '4.25')})^{2}} = ${hue('pressure', sig3(s.Pr))}\\ \\text{atm}`,
        'An ideal gas in the same flask would exert ' + sig3(s.Pi) + ' atm.', { form: 'V' });
    } else {
      const Ps = hue('pressure', sig3(s.Pi)), Vs = hue('volume', fmt(s.Vr, 3));
      ro.set(`\\left(\\kP+\\frac{\\kn^{2}a}{\\kV^{2}}\\right)(\\kV-\\kn b) = (${Ps}+${sig3(s.attP)})(${Vs}-${fmt(s.n * q.b, 3)}) = (${n})(0.08206)(${T}) = ${fmt(s.nRT, 1)}\\ \\text{L atm}`,
        'An ideal gas at the same pressure would fill 4.25 L.', { form: 'P' });
    }
  }
  const ro = F.readout(d);
  register(d.fig, { update: (dt) => { cy.step(dt, () => 1); step(Math.min(dt, 0.05)); }, draw });
})();
};
