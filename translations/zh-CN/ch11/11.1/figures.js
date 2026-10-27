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
  const v = F.view3d(d.stage, { spin: 'off', pitch: [0.035, 1.22], views: [{ label: '正视', yaw: 0, pitch: 0.18 }, { label: '俯视', yaw: 0, pitch: 1.1 }], h: 330, dist: 4.8, tilt: 0.18 });
  const grp = v.part(0), cnv = F.makeCanvas(d.stage, 250);
  const RB = 0.8, XB = 1.1, RT = 0.4, XT = 0.5, N = 30;
  const hueOf = (f) => F.el(f);
  const GAS = { He: { r: 0.06, speed: 4.7, name: '氦原子 He', word: '氦' }, Ar: { r: 0.09, speed: 1.5, name: '氩原子 Ar', word: '氩' } };
  const cock = F.choice(d.controls, { label: '\\text{旋塞}', options: [{ value: 'closed', label: '关闭' }, { value: 'open', label: '打开' }], value: 'open', aria: '两个玻璃泡之间的旋塞', onInput: () => { if (cock.value === 'closed') seed(); } });
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
  const BULB = (s) => F.ref(s < 0 ? 'helium-bulb' : 'argon-bulb');
  const palSig = () => [PAL.ink, PAL.panel, PAL.soft, PAL.muted, hueOf('He'), hueOf('Ar'), BULB(-1), BULB(1)].join('|');
  const glass = { transparent: true, opacity: 0.1, depthWrite: false, side: T3D.DoubleSide };
  function build() {
    if (palSig() === sig) return; sig = palSig();
    v.clear(); meshes = [];
    v.pickable(F.mesh.box(grp, [0, -RB - 0.26, 0], [4.4, 0.1, 1.6], PAL.soft), '工作台');
    for (const s of [-1, 1]) {
      const b = new T3D.Mesh(new T3D.SphereGeometry(RB, 40, 24), F.mesh.mat(BULB(s), { ...glass, opacity: 0.16 })); b.position.set(s * XB, 0, 0); grp.add(b);
      v.pickable(b, s < 0 ? '最初盛氦的玻璃泡' : '最初盛氩的玻璃泡');
      F.mesh.stick(grp, [s * XB, -RB, 0], [s * XB, -RB - 0.21, 0], 0.05, PAL.muted);
      v.label(s < 0 ? 'He' : 'Ar', [s * XB, -RB - 0.34, 0.85], grp, 16).style.color = BULB(s);
    }
    const tube = new T3D.Mesh(new T3D.CylinderGeometry(RT, RT, 2 * XT, 32, 1, true), F.mesh.mat(PAL.ink, glass)); tube.rotation.z = Math.PI / 2; grp.add(tube);
    v.pickable(tube, '连接两个玻璃泡的管');
    v.pickable(F.mesh.stick(grp, [0, RT - 0.05, 0], [0, RT + 0.3, 0], 0.07, PAL.muted), '旋塞');
    v.pickable(F.mesh.box(grp, [0, RT + 0.34, 0], [0.5, 0.08, 0.1], PAL.muted), '旋塞手柄');
    meshes = atoms.map((q) => { const m = F.mesh.sphere(grp, q.x, GAS[q.f].r * 1.3, hueOf(q.f)); v.pickable(m, GAS[q.f].name); return m; });
  }
  function draw() {
    build();
    atoms.forEach((q, i) => meshes[i].position.set(q.x[0], q.x[1], q.x[2]));
    v.invalidate();
    const { ctx } = begin(cnv);
    const cnt = (f, s) => atoms.filter((q) => q.f === f && (s < 0 ? q.x[0] < 0 : q.x[0] >= 0)).length;
    const X = (n) => 520 + n * 22, rows = [{ f: 'He', y: 120 }, { f: 'Ar', y: 175 }];
    text(ctx, '左侧玻璃泡', 520 - 30, 84, BULB(-1), { size: 17, align: 'right' });
    text(ctx, '右侧玻璃泡', 1210, 84, BULB(1), { size: 17, align: 'left' });
    line(ctx, X(N / 2) + 0, 96, X(N / 2), 200, alpha(PAL.ink, 0.35), 2, [10, 10]);
    for (const { f, y } of rows) {
      const l = cnt(f, -1), r = N - l;
      text(ctx, GAS[f].word + '：左 ' + l + ' 个，右 ' + r + ' 个', 480, y, PAL.ink, { size: 18, align: 'right' });
      ctx.save(); ctx.fillStyle = hueOf(f); ctx.strokeStyle = alpha(PAL.ink, 0.5); ctx.lineWidth = 1.5;
      ctx.fillRect(X(0), y - 12, X(l) - X(0), 24); ctx.strokeRect(X(0), y - 12, X(l) - X(0), 24);
      ctx.globalAlpha = 0.45; ctx.fillRect(X(l), y - 12, X(N) - X(l), 24); ctx.globalAlpha = 1; ctx.strokeRect(X(l), y - 12, X(N) - X(l), 24); ctx.restore();
    }
    text(ctx, '均分', X(N / 2), 222, PAL.muted, { size: 16, align: 'center' });
    const he = cnt('He', 1), ar = cnt('Ar', -1);
    topline(ctx, cock.value === 'closed'
      ? '旋塞关闭时，氦留在左侧玻璃泡中，氩留在右侧玻璃泡中。'
      : '30 个氦原子中有 ' + he + ' 个、30 个氩原子中有 ' + ar + ' 个已进入另一个玻璃泡。');
    readout(d.readout, `\\text{He: } ${N - he} + ${he} = ${N} \\qquad \\text{Ar: } ${ar} + ${N - ar} = ${N}`,
      '每个计数都是左侧玻璃泡加右侧玻璃泡；均匀混合后，每种气体充满的体积是原来的两倍。');
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
  const H1 = ctl(d.controls, { label: '\\kdH_{1}', cls: 'energy', min: 0, max: 100, step: 1, value: 60, unit: 'kJ/mol', dec: 0, aria: '步骤 1 的能量，即溶质膨胀，单位为千焦每摩尔' });
  const H2 = ctl(d.controls, { label: '\\kdH_{2}', cls: 'energy', min: 0, max: 100, step: 1, value: 40, unit: 'kJ/mol', dec: 0, aria: '步骤 2 的能量，即溶剂膨胀，单位为千焦每摩尔' });
  const H3 = ctl(d.controls, { label: '\\kdH_{3}', cls: 'energy', min: -250, max: 0, step: 1, value: -130, unit: 'kJ/mol', dec: 0, aria: '步骤 3 的能量，即溶剂化，单位为千焦每摩尔', specials: [{ at: () => -(H1.v + H2.v), label: '理想' }] });
  const hits = []; F.hover(d.stage, () => hits);
  /* particle arrangements in a box 64 tall: packed or expanded, solute (7) and solvent (16) */
  const hex = (n, cols, s, x0, y0) => Array.from({ length: n }, (_, i) => { const r = Math.floor(i / cols), c = i % cols; return [x0 + c * s + (r % 2) * s / 2, y0 - r * s * 0.87]; });
  function particles(ctx, pts, kind) {
    const col = F.ref(kind), rr = kind === 'solute' ? 8 : 6;
    for (const [x, y] of pts) {
      ctx.save(); ctx.fillStyle = col; ctx.strokeStyle = alpha(PAL.ink, 0.45); ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(x, y, rr, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore();
      hits.push({ x, y, r: rr + 2, name: kind === 'solute' ? '溶质粒子' : '溶剂粒子' });
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
    text(ctx, '能量（kJ/mol）', 40, box.t - 30, ce, { size: 18, weight: 600 });
    line(ctx, box.l, Y(0), 1310, Y(0), alpha(PAL.ink, 0.3), 2, [10, 10]);
    const XS = [290, 570, 850, 1110], NAMES = ['溶质 + 溶剂', '膨胀的溶质', '两者都膨胀', '溶液'];
    XS.forEach((x, i) => {
      line(ctx, x - 100, Y(E[i]), x + 100, Y(E[i]), PAL.ink, 4);
      scene(ctx, i, x, Y(E[i]));
      text(ctx, NAMES[i], x, Y(E[i]) + 20, PAL.ink, { size: 17, align: 'center' });
    });
    for (let i = 0; i < 3; i++) {
      const xa = (XS[i] + XS[i + 1]) / 2;
      line(ctx, XS[i] + 100, Y(E[i]), xa + 4, Y(E[i]), alpha(PAL.ink, 0.35), 2, [4, 8]);
      if (Math.abs(h[i]) >= 2) arrow(ctx, xa, Y(E[i]), xa, Y(E[i + 1]), ce, 4);
      /* under the start level, clear of the arrow: right of a rise and below the next level's name, left of solvation */
      const up = i < 2, y0 = up ? Math.max(Y(E[i]) + 28, Y(E[i + 1]) + 56) : Y(E[i]) + 56, xl = up ? xa + 8 : xa - 8, al = up ? 'left' : 'right';
      text(ctx, '步骤 ' + (i + 1), xl, y0 - 11, PAL.ink, { size: 16, align: al, bg: PAL.panel });
      text(ctx, (h[i] > 0 ? '+' : h[i] < 0 ? '−' : '') + Math.abs(h[i]), xl, y0 + 11, ce, { size: 17, weight: 600, align: al, bg: PAL.panel });
    }
    const xd = 1250;
    line(ctx, XS[3] + 100, Y(s), xd, Y(s), alpha(PAL.ink, 0.35), 2, [4, 8]);
    if (Math.abs(s) >= 2) { ctx.save(); ctx.setLineDash([10, 8]); line(ctx, xd, Y(0), xd, Y(s) + (s < 0 ? -14 : 14), ce, 4); ctx.restore(); arrow(ctx, xd, Y(s) + (s < 0 ? -16 : 16), xd, Y(s), ce, 4); }
    text(ctx, '直接：' + (s > 0 ? '+' : s < 0 ? '−' : '') + Math.abs(s), xd, Math.max(Y(Math.max(s, 0)) - 22, box.t), ce, { size: 17, weight: 600, align: 'center', bg: PAL.panel });
    /* legend */
    particles(ctx, [[1180, 150]], 'solute'); text(ctx, '溶质', 1194, 150, PAL.ink, { size: 17 });
    particles(ctx, [[1260, 150]], 'solvent'); text(ctx, '溶剂', 1274, 150, PAL.ink, { size: 17 });
    const cost = h[0] + h[1], back = -h[2];
    topline(ctx, s < 0
      ? '分离溶质和溶剂需要 ' + cost + ' kJ/mol，溶剂化放回 ' + back + ' kJ/mol，所以溶液的形成是放热的，放出 ' + (-s) + ' kJ/mol。'
      : s > 0
        ? '分离溶质和溶剂需要 ' + cost + ' kJ/mol，溶剂化只放回 ' + back + ' kJ/mol，所以溶液的形成是吸热的，吸收 ' + s + ' kJ/mol。'
        : '溶剂化放回的能量恰好等于分离溶质和溶剂所耗的 ' + cost + ' kJ/mol，所以溶液形成时没有能量变化，与理想溶液相同。');
    const kj = (x) => hue('energy', (x < 0 ? '(' + x + '\\ \\text{kJ/mol})' : x + '\\ \\text{kJ/mol}')).replace('-', '−');
    readout(d.readout, `\\kdH_{\\text{soln}} = \\kdH_{1} + \\kdH_{2} + \\kdH_{3} = ${kj(h[0])} + ${kj(h[1])} + ${kj(h[2])} = ${hue('energy', s + '\\ \\text{kJ/mol}').replace('-', '−')}`);
  }
  register(d.fig, { update: () => {}, draw });
})();
};
