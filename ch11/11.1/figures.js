/* Figures for section 11.1 The Dissolution Process. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['11.1'] = function (root, F) {
const { el, fmt, tex, C, PAL, alpha, ctl, cycle, register, begin, line, arrow, text, topline } = F;
const sim = (id, H) => F.sim(root, id, H);
function readout(host, main, small) { tex(host, main); if (small) host.appendChild(el('small', null, small)); }
const TAU = 2 * Math.PI;
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;

/* =====================================================================
   FIGURE 11.3: helium and argon mixing, in three dimensions. Two glass
   bulbs joined by a tube with a stopcock, thirty atoms of each gas.
   Moving: the atoms travel continuously, helium sqrt(10) times faster
   than argon, as their masses give. Closing the stopcock sets the gases
   apart again. The bulbs stand on a bench, so the pitch stays between
   2° and 70° above level.
===================================================================== */
(function () {
  const T3D = window.THREE;
  const d = sim('sim-he-ar');
  const v = F.view3d(d.stage, { spin: 'off', pitch: [0.035, 1.22], views: [{ label: 'front', yaw: 0, pitch: 0.18 }, { label: 'above', yaw: 0, pitch: 1.1 }], h: 330, dist: 4.8, tilt: 0.18 });
  const grp = v.part(0), cnv = F.makeCanvas(d.stage, 250);
  const RB = 0.8, XB = 1.1, RT = 0.4, XT = 0.5, N = 30;
  const hueOf = (f) => F.el(f);
  const GAS = { He: { r: 0.06, speed: 4.7, name: 'a helium atom, He', word: 'helium' }, Ar: { r: 0.09, speed: 1.5, name: 'an argon atom, Ar', word: 'argon' } };
  const cock = F.choice(d.controls, { label: '\\text{stopcock}', options: [{ value: 'closed', label: 'closed' }, { value: 'open', label: 'open' }], value: 'open', aria: 'the stopcock between the bulbs', onInput: () => { if (cock.value === 'closed') seed(); } });
  const heading = () => { const z = 2 * Math.random() - 1, a = Math.random() * TAU, r = Math.sqrt(1 - z * z); return [r * Math.cos(a), r * Math.sin(a), z]; };
  let atoms = [];
  function seed() {
    atoms = [];
    for (const [f, side] of [['He', -1], ['Ar', 1]]) for (let j = 0; j < N; j++) {
      const u = heading(), rr = Math.cbrt(Math.random()) * (RB - GAS[f].r - 0.02);
      atoms.push({ f, x: [side * XB + u[0] * rr, u[1] * rr, u[2] * rr], u: heading() });
    }
  }
  seed();
  const ok = (p, r) => {
    for (const s of [-1, 1]) if (Math.hypot(p[0] - s * XB, p[1], p[2]) < RB - r) return true;
    return cock.value === 'open' && Math.abs(p[0]) < XT && Math.hypot(p[1], p[2]) < RT - r;
  };
  function step(dt) {
    for (const q of atoms) {
      const g = GAS[q.f], nx = q.x.map((c, k) => c + q.u[k] * g.speed * dt);
      if (ok(nx, g.r)) q.x = nx; else q.u = heading();
    }
  }
  const cy = cycle(() => Infinity, 0);
  let sig = '', meshes = [];
  const palSig = () => [PAL.ink, PAL.panel, PAL.soft, PAL.muted, hueOf('He'), hueOf('Ar')].join('|');
  const glass = { transparent: true, opacity: 0.1, depthWrite: false, side: T3D.DoubleSide };
  function build() {
    if (palSig() === sig) return; sig = palSig();
    v.clear(); meshes = [];
    v.pickable(F.mesh.box(grp, [0, -RB - 0.26, 0], [4.4, 0.1, 1.6], PAL.soft), 'bench');
    for (const s of [-1, 1]) {
      const b = new T3D.Mesh(new T3D.SphereGeometry(RB, 40, 24), F.mesh.mat(PAL.ink, glass)); b.position.set(s * XB, 0, 0); grp.add(b);
      v.pickable(b, s < 0 ? 'the bulb that first held helium' : 'the bulb that first held argon');
      F.mesh.stick(grp, [s * XB, -RB, 0], [s * XB, -RB - 0.21, 0], 0.05, PAL.muted);
      v.label(s < 0 ? 'He' : 'Ar', [s * XB, -RB - 0.34, 0.85], grp, 16);
    }
    const tube = new T3D.Mesh(new T3D.CylinderGeometry(RT, RT, 2 * XT, 32, 1, true), F.mesh.mat(PAL.ink, glass)); tube.rotation.z = Math.PI / 2; grp.add(tube);
    v.pickable(tube, 'the tube joining the bulbs');
    v.pickable(F.mesh.stick(grp, [0, RT - 0.05, 0], [0, RT + 0.3, 0], 0.07, PAL.muted), 'the stopcock');
    v.pickable(F.mesh.box(grp, [0, RT + 0.34, 0], [0.5, 0.08, 0.1], PAL.muted), 'the stopcock handle');
    meshes = atoms.map((q) => { const m = F.mesh.sphere(grp, q.x, GAS[q.f].r * 1.3, hueOf(q.f)); v.pickable(m, GAS[q.f].name); return m; });
  }
  function draw() {
    build();
    atoms.forEach((q, i) => meshes[i].position.set(q.x[0], q.x[1], q.x[2]));
    v.invalidate();
    const { ctx } = begin(cnv);
    const cnt = (f, s) => atoms.filter((q) => q.f === f && (s < 0 ? q.x[0] < 0 : q.x[0] >= 0)).length;
    const X = (n) => 520 + n * 22, rows = [{ f: 'He', y: 120 }, { f: 'Ar', y: 175 }];
    text(ctx, 'left bulb', 520 - 30, 84, PAL.muted, { size: 17, align: 'right' });
    text(ctx, 'right bulb', 1210, 84, PAL.muted, { size: 17, align: 'left' });
    line(ctx, X(N / 2) + 0, 96, X(N / 2), 200, alpha(PAL.ink, 0.35), 2, [10, 10]);
    for (const { f, y } of rows) {
      const l = cnt(f, -1), r = N - l;
      text(ctx, GAS[f].word + ', ' + l + ' left and ' + r + ' right', 480, y, PAL.ink, { size: 18, align: 'right' });
      ctx.save(); ctx.fillStyle = hueOf(f); ctx.strokeStyle = alpha(PAL.ink, 0.5); ctx.lineWidth = 1.5;
      ctx.fillRect(X(0), y - 12, X(l) - X(0), 24); ctx.strokeRect(X(0), y - 12, X(l) - X(0), 24);
      ctx.globalAlpha = 0.45; ctx.fillRect(X(l), y - 12, X(N) - X(l), 24); ctx.globalAlpha = 1; ctx.strokeRect(X(l), y - 12, X(N) - X(l), 24); ctx.restore();
    }
    text(ctx, 'even split', X(N / 2), 222, PAL.muted, { size: 16, align: 'center' });
    const he = cnt('He', 1), ar = cnt('Ar', -1);
    topline(ctx, cock.value === 'closed'
      ? 'With the stopcock closed, the 30 helium atoms stay in the left bulb and the 30 argon atoms in the right.'
      : he + ' of 30 helium atoms and ' + ar + ' of 30 argon atoms have crossed into the other bulb.');
    readout(d.readout, `\\text{He: } ${N - he} + ${he} = ${N} \\qquad \\text{Ar: } ${ar} + ${N - ar} = ${N}`,
      'Each count is left bulb plus right bulb. Neither gas attracts the other, so no heat is exchanged as they mix; each simply spreads through twice the volume it held before.');
  }
  register(d.fig, { update: (dt) => { cy.step(dt, () => 1); step(Math.min(dt, 0.05)); }, draw });
})();

/* =====================================================================
   FIGURE 11.4: dissolution as three steps on an energy ladder. Step 1
   expands the solute, step 2 the solvent, step 3 mixes them (solvation);
   the dashed arrow is the direct formation of the solution, the sum.
   Still: the ladder answers its sliders. Energy axis fixed, −250 to
   300 kJ/mol, from the slider limits (0 to 200 up, down to −250).
===================================================================== */
(function () {
  const d = sim('sim-steps', 720);
  const H1 = ctl(d.controls, { label: '\\kdH_{1}', cls: 'energy', min: 0, max: 100, step: 1, value: 60, unit: 'kJ/mol', dec: 0, aria: 'energy of step 1, expanding the solute, in kilojoules per mole' });
  const H2 = ctl(d.controls, { label: '\\kdH_{2}', cls: 'energy', min: 0, max: 100, step: 1, value: 40, unit: 'kJ/mol', dec: 0, aria: 'energy of step 2, expanding the solvent, in kilojoules per mole' });
  const H3 = ctl(d.controls, { label: '\\kdH_{3}', cls: 'energy', min: -250, max: 0, step: 1, value: -130, unit: 'kJ/mol', dec: 0, aria: 'energy of step 3, solvation, in kilojoules per mole', specials: [{ at: () => -(H1.v + H2.v), label: 'ideal' }] });
  const hits = []; F.hover(d.stage, () => hits);
  /* particle arrangements in a box 64 tall: packed or expanded, solute (7) and solvent (16) */
  const hex = (n, cols, s, x0, y0) => Array.from({ length: n }, (_, i) => { const r = Math.floor(i / cols), c = i % cols; return [x0 + c * s + (r % 2) * s / 2, y0 - r * s * 0.87]; });
  function particles(ctx, pts, kind) {
    const col = F.cat(kind === 'solute' ? 0 : 1), rr = kind === 'solute' ? 8 : 6;
    for (const [x, y] of pts) {
      ctx.save(); ctx.fillStyle = col; ctx.strokeStyle = alpha(PAL.ink, 0.45); ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(x, y, rr, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore();
      hits.push({ x, y, r: rr + 2, name: 'a ' + kind + ' particle' });
    }
  }
  function frame(ctx, l, t, w, h) { ctx.save(); ctx.strokeStyle = alpha(PAL.ink, 0.5); ctx.lineWidth = 1.5; ctx.strokeRect(l, t, w, h); ctx.restore(); }
  /* a box of particles standing on the level at y, centred on x */
  function scene(ctx, stage, x, y) {
    const b = y - 10;
    const soluteBox = (cx, open) => { frame(ctx, cx - 38, b - 72, 76, 72); particles(ctx, open ? [[-24, -16], [0, -22], [24, -14], [-20, -52], [4, -46], [26, -56], [-4, -64 + 10]].map(([dx, dy]) => [cx + dx, b + dy]) : hex(7, 3, 17, cx - 17, b - 11), 'solute'); };
    const solventBox = (cx, open) => { frame(ctx, cx - 38, b - 72, 76, 72); particles(ctx, open ? Array.from({ length: 16 }, (_, i) => [cx - 27 + (i % 4) * 18 + (Math.floor(i / 4) % 2) * 5, b - 10 - Math.floor(i / 4) * 17]) : hex(16, 5, 12.5, cx - 27, b - 8), 'solvent'); };
    if (stage === 3) {
      frame(ctx, x - 55, b - 72, 110, 72);
      const pts = hex(23, 6, 15, x - 40, b - 9);
      const solute = new Set([2, 7, 9, 13, 16, 20, 11]);
      pts.forEach((p, i) => particles(ctx, [p], solute.has(i) ? 'solute' : 'solvent'));
      return;
    }
    soluteBox(x - 42, stage >= 1); solventBox(x + 42, stage >= 2);
  }
  function draw() {
    const { ctx } = begin(d.c);
    hits.length = 0;
    const h = [H1.v, H2.v, H3.v], E = [0, h[0], h[0] + h[1], h[0] + h[1] + h[2]], s = E[3], ce = C('energy');
    const box = { l: 150, r: 1340, t: 120, b: 680 }, Y = (e) => box.b - ((e + 250) / 550) * (box.b - box.t);
    line(ctx, box.l, box.t, box.l, box.b, PAL.muted, 2);
    for (let e = -250; e <= 300; e += 50) { line(ctx, box.l - 6, Y(e), box.l, Y(e), PAL.muted, 2); text(ctx, String(e), box.l - 12, Y(e), PAL.muted, { size: 16, align: 'right' }); }
    text(ctx, 'energy (kJ/mol)', 40, box.t - 30, ce, { size: 18, weight: 600 });
    line(ctx, box.l, Y(0), 1310, Y(0), alpha(PAL.ink, 0.3), 2, [10, 10]);
    const XS = [290, 570, 850, 1110], NAMES = ['solute + solvent', 'expanded solute', 'both expanded', 'solution'];
    XS.forEach((x, i) => {
      line(ctx, x - 100, Y(E[i]), x + 100, Y(E[i]), PAL.ink, 4);
      scene(ctx, i, x, Y(E[i]));
      text(ctx, NAMES[i], x, Y(E[i]) + 20, PAL.ink, { size: 17, align: 'center' });
    });
    for (let i = 0; i < 3; i++) {
      const xa = (XS[i] + XS[i + 1]) / 2;
      line(ctx, XS[i] + 100, Y(E[i]), xa + 4, Y(E[i]), alpha(PAL.ink, 0.35), 2, [4, 8]);
      if (Math.abs(h[i]) >= 2) arrow(ctx, xa, Y(E[i]), xa, Y(E[i + 1]), ce, 4);
      const ym = (Y(E[i]) + Y(E[i + 1])) / 2 + (Math.abs(h[i]) < 60 ? (i === 2 ? 34 : -34) : 0);
      text(ctx, 'step ' + (i + 1), xa, ym - 11, PAL.ink, { size: 16, align: 'center', bg: PAL.panel });
      text(ctx, (h[i] > 0 ? '+' : h[i] < 0 ? '−' : '') + Math.abs(h[i]), xa, ym + 11, ce, { size: 17, weight: 600, align: 'center', bg: PAL.panel });
    }
    const xd = 1250;
    line(ctx, XS[3] + 100, Y(s), xd, Y(s), alpha(PAL.ink, 0.35), 2, [4, 8]);
    if (Math.abs(s) >= 2) { ctx.save(); ctx.setLineDash([10, 8]); line(ctx, xd, Y(0), xd, Y(s) + (s < 0 ? -14 : 14), ce, 4); ctx.restore(); arrow(ctx, xd, Y(s) + (s < 0 ? -16 : 16), xd, Y(s), ce, 4); }
    text(ctx, 'direct, ' + (s > 0 ? '+' : s < 0 ? '−' : '') + Math.abs(s), xd, Math.max(Y(Math.max(s, 0)) - 22, box.t), ce, { size: 17, weight: 600, align: 'center', bg: PAL.panel });
    /* legend */
    particles(ctx, [[1180, 150]], 'solute'); text(ctx, 'solute', 1194, 150, PAL.ink, { size: 17 });
    particles(ctx, [[1260, 150]], 'solvent'); text(ctx, 'solvent', 1274, 150, PAL.ink, { size: 17 });
    const cost = h[0] + h[1], back = -h[2];
    topline(ctx, s < 0
      ? 'Separating the solute and the solvent costs ' + cost + ' kJ/mol and solvation returns ' + back + ' kJ/mol, so the solution forms exothermically and releases ' + (-s) + ' kJ/mol.'
      : s > 0
        ? 'Separating the solute and the solvent costs ' + cost + ' kJ/mol and solvation returns only ' + back + ' kJ/mol, so the solution forms endothermically and absorbs ' + s + ' kJ/mol.'
        : 'Solvation returns exactly the ' + cost + ' kJ/mol spent separating the solute and the solvent, so the solution forms with no change in energy, as an ideal solution does.');
    const kj = (x) => hue('energy', (x < 0 ? '(' + x + '\\ \\text{kJ/mol})' : x + '\\ \\text{kJ/mol}')).replace('-', '−');
    readout(d.readout, `\\kdH_{\\text{soln}} = \\kdH_{1} + \\kdH_{2} + \\kdH_{3} = ${kj(h[0])} + ${kj(h[1])} + ${kj(h[2])} = ${hue('energy', s + '\\ \\text{kJ/mol}').replace('-', '−')}`,
      'Steps 1 and 2 overcome the solute-solute and solvent-solvent attractions and are endothermic; step 3 establishes the solute-solvent attractions and is exothermic.');
  }
  register(d.fig, { update: () => {}, draw });
})();
};
