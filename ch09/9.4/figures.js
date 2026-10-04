/* Figures for section 9.4 Effusion and Diffusion of Gases. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['9.4'] = function (root, F) {
const { fmt, tex, C, PAL, alpha, cycle, register, begin, line, arrow, text, topline, label } = F;
const sim = (id, H) => F.sim(root, id, H);
const TAU = 2 * Math.PI;
const T3D = window.THREE;
const { sphere: sphere3, stick: stick3, mat: mat3 } = F.mesh;
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;
const palSig = () => [PAL.ink, PAL.panel, PAL.soft, PAL.muted, F.CC, F.el('O'), F.el('H'), F.el('Xe'), F.ref('left-bulb'), F.ref('right-bulb')].join('|');
const glass = (extra = {}) => ({ transparent: true, opacity: 0.1, depthWrite: false, side: T3D.DoubleSide, ...extra });

/* the gases, each molecule as [element, dx, dy, radius] about its center, and the molar mass the book uses for it */
const MOLS = {
  'H₂': { m: 2, word: 'hydrogen', atoms: [['H', -5, 0, 5], ['H', 5, 0, 5]] },
  'O₂': { m: 32, word: 'oxygen', atoms: [['O', -6, 0, 7], ['O', 6, 0, 7]] },
  'Ne': { m: 20.2, word: 'neon', atoms: [['Ne', 0, 0, 6]] },
  'Xe': { m: 131.3, word: 'xenon', atoms: [['Xe', 0, 0, 11]] },
  'CH₄': { m: 16.0, word: 'methane', atoms: [['H', -9, -8, 4.5], ['H', 9, -8, 4.5], ['H', -9, 8, 4.5], ['H', 9, 8, 4.5], ['C', 0, 0, 7]] },
  'CO₂': { m: 44.0, word: 'carbon dioxide', atoms: [['O', -13, 0, 7], ['O', 13, 0, 7], ['C', 0, 0, 6.5]] },
};
const TEXF = { 'H₂': '\\text{H}_2', 'O₂': '\\text{O}_2', 'Ne': '\\text{Ne}', 'Xe': '\\text{Xe}', 'CH₄': '\\text{CH}_4', 'CO₂': '\\text{CO}_2' };
const molName = (f) => (MOLS[f].atoms.length === 1 ? 'an atom of ' + MOLS[f].word + ', ' + f : 'a molecule of ' + MOLS[f].word + ', ' + f);
const heading3 = () => { const z = 2 * Math.random() - 1, a = Math.random() * TAU, r = Math.sqrt(1 - z * z); return [r * Math.cos(a), r * Math.sin(a), z]; };

/* =====================================================================
   FIGURE 9.27 + 9.28: two bulbs joined by a stopcock, in three dimensions.
   Every molecule travels in a straight line at a speed proportional to
   1/√ℳ and bounces off the glass in a random direction, so the lighter gas
   finds the opening more often and crosses first. Diffusion starts with
   one gas in each bulb and a wide opening; effusion starts with both gases
   in the left bulb, the right bulb empty and a pinhole in a barrier.
   Moving: the lag of the heavier gas is the idea, so the figure runs
   continuously with the transport and no scrubber, and any choice starts
   it again from the separated state. The orbit turns freely in yaw and
   holds the pitch within 70° of level so the stopcock stays in view; no
   idle spin, since the molecules already move.
===================================================================== */
(function () {
  const d = sim('sim-bulbs');
  const v = F.view3d(d.stage, { spin: 'off', pitch: [-1.22, 1.22], views: [{ label: 'front', yaw: 0, pitch: 0.12 }, { label: 'above', yaw: 0, pitch: 1.15 }], h: 380, dist: 6.6, tilt: 0.12 });
  const grp = v.part(0), cnv = F.makeCanvas(d.stage, 250);
  const PAIRS = [['H₂', 'O₂'], ['Ne', 'Xe'], ['CH₄', 'CO₂']];
  const mode = F.choice(d.controls, { label: '\\text{process}', aria: 'diffusion or effusion', options: [{ value: 'diff', label: 'diffusion' }, { value: 'eff', label: 'effusion' }], value: 'diff', ms: 0, onInput: restart });
  const cock = F.choice(d.controls, { label: '\\text{stopcock}', aria: 'the stopcock closed or open', options: [{ value: 'closed', label: 'closed' }, { value: 'open', label: 'open' }], value: 'open', ms: 0, onInput: restart });
  const pair = F.choice(d.controls, { label: '\\text{gases}', aria: 'the two gases', options: PAIRS.map((p, i) => ({ value: String(i), label: p[0] + ' and ' + p[1] })), value: '0', ms: 0, onInput: restart });
  const CX = 1.35, RB = 0.95, RT = 0.4, RH = 0.17, RM = 0.08, K = 0.011, N = 24;
  const speed = (f) => 2.0 * Math.sqrt(32 / MOLS[f].m);
  const gases = () => PAIRS[+pair.value];
  const eff = () => mode.value === 'eff';
  const open = () => cock.value === 'open';
  const inShape = (p) => {
    const r = Math.hypot(p[1], p[2]);
    if (Math.abs(p[0]) <= CX && r < RT - RM) return true;
    return Math.hypot(p[0] - CX, p[1], p[2]) < RB - RM || Math.hypot(p[0] + CX, p[1], p[2]) < RB - RM;
  };
  const passes = (a, b) => {
    if (Math.sign(a[0]) === Math.sign(b[0])) return true;
    if (!open()) return false;
    return Math.hypot(b[1], b[2]) < (eff() ? RH : RT - RM);
  };
  const inBulb = (side) => { for (;;) { const u = heading3(), r = Math.cbrt(Math.random()) * (RB - RM - 0.02), p = [side * CX + u[0] * r, u[1] * r, u[2] * r]; if (Math.abs(p[0]) > 0.5) return p; } };
  let P = [];
  function restart() {
    const [a, b] = gases();
    P = [];
    for (let i = 0; i < N; i++) P.push({ f: a, x: inBulb(-1), u: heading3() });
    for (let i = 0; i < N; i++) P.push({ f: b, x: inBulb(eff() ? -1 : 1), u: heading3() });
    sig = ''; cy.reset();
  }
  function step(dt) {
    for (const q of P) {
      const s = speed(q.f) * dt, nx = [q.x[0] + q.u[0] * s, q.x[1] + q.u[1] * s, q.x[2] + q.u[2] * s];
      if (inShape(nx) && passes(q.x, nx)) q.x = nx; else q.u = heading3();
    }
  }
  const cy = cycle(() => Infinity, 0);
  let sig = '', ms = [];
  function build() {
    const key = [mode.value, cock.value, pair.value, palSig()].join('|'); if (key === sig) return; sig = key;
    v.clear(); ms = [];
    for (const s of [-1, 1]) {
      const b = new T3D.Mesh(new T3D.SphereGeometry(RB, 36, 24), mat3(F.ref(s < 0 ? 'left-bulb' : 'right-bulb'), glass({ opacity: 0.16 }))); b.position.set(s * CX, 0, 0); b.renderOrder = 2; grp.add(b);
      v.pickable(b, s < 0 ? 'the left bulb' : 'the right bulb');
    }
    const tube = new T3D.Mesh(new T3D.CylinderGeometry(RT, RT, 2 * CX - 1.6, 24, 1, true), mat3(PAL.ink, glass())); tube.rotation.z = Math.PI / 2; grp.add(tube);
    if (eff()) {
      const g = open() ? new T3D.RingGeometry(RH, RT, 32) : new T3D.CircleGeometry(RT, 32);
      const bar = new T3D.Mesh(g, mat3(PAL.muted, { transparent: true, opacity: 0.55, side: T3D.DoubleSide, depthWrite: false })); bar.rotation.y = Math.PI / 2; grp.add(bar);
      v.pickable(bar, open() ? 'a barrier with a pinhole' : 'a barrier with its pinhole plugged');
      v.label(open() ? 'pinhole' : 'plugged', [0, -RT - 0.45, 0], grp, 0);
    } else {
      const key3 = new T3D.Mesh(new T3D.CylinderGeometry(RT + 0.06, RT + 0.06, 2 * RT + 0.2, 24), mat3(PAL.muted, glass({ opacity: open() ? 0.12 : 0.6 }))); grp.add(key3);
      v.pickable(key3, open() ? 'the stopcock, open' : 'the stopcock, closed');
      const hy = RT + 0.2;
      stick3(grp, open() ? [-0.45, hy, 0] : [0, hy, -0.45], open() ? [0.45, hy, 0] : [0, hy, 0.45], 0.05, PAL.ink);
      v.label('stopcock', [0, hy + 0.12, 0], grp, 6);
    }
    v.label(eff() ? 'vacuum at the start' : gases()[1], [CX, RB + 0.12, 0], grp, 6);
    v.label(eff() ? gases().join(' and ') : gases()[0], [-CX, RB + 0.12, 0], grp, 6);
    ms = P.map((q) => {
      const m = new T3D.Group(); grp.add(m);
      MOLS[q.f].atoms.forEach(([elm, dx, dy, rr]) => v.pickable(sphere3(m, [dx * K, dy * K, 0], rr * K * 1.15, F.el(elm)), molName(q.f)));
      return m;
    });
  }
  restart();
  function draw() {
    build();
    P.forEach((q, i) => { const m = ms[i]; if (!m) return; m.position.set(q.x[0], q.x[1], q.x[2]); m.rotation.set(0, Math.atan2(q.u[0], q.u[2]), Math.asin(Math.max(-1, Math.min(1, q.u[1])))); });
    v.invalidate();
    const [a, b] = gases(), cnt = (f, side) => P.filter((q) => q.f === f && Math.sign(q.x[0]) === side).length;
    const crossedA = cnt(a, 1), crossedB = eff() ? cnt(b, 1) : cnt(b, -1);
    const { ctx } = begin(cnv);
    topline(ctx, !open() ? (eff() ? 'The pinhole is plugged, so no molecule of either gas can leave the left bulb.' : 'The stopcock is closed, so each gas stays in its own bulb.')
      : eff() ? 'So far ' + crossedA + (crossedA === 1 ? ' molecule of ' : ' molecules of ') + a + ' and ' + crossedB + ' of ' + b + ' have effused through the pinhole into the right bulb.'
      : 'So far ' + crossedA + (crossedA === 1 ? ' molecule of ' : ' molecules of ') + a + ' have crossed to the right and ' + crossedB + ' of ' + b + ' to the left.');
    const GAS = ['lighter-gas', 'heavier-gas'];
    const bars = (x0, side, name) => {
      text(ctx, name, x0, 108, F.ref(side < 0 ? 'left-bulb' : 'right-bulb'), { size: 20, weight: 600 });
      [a, b].forEach((f, i) => {
        const n = cnt(f, side), y = 138 + i * 42, w = 440 * n / (2 * N);
        ctx.save(); ctx.fillStyle = alpha(F.ref(GAS[i]), 0.85); ctx.fillRect(x0 + 90, y - 13, w, 26); ctx.restore();
        line(ctx, x0 + 90, y - 18, x0 + 90, y + 18, PAL.ink, 2);
        text(ctx, f, x0, y + 7, F.ref(GAS[i]), { size: 20, weight: 600 });
        text(ctx, String(n), x0 + 100 + w, y + 7, PAL.ink, { size: 18 });
      });
    };
    bars(80, -1, 'left bulb');
    bars(740, 1, 'right bulb');
    text(ctx, 'molecules drawn: ' + N + ' of each gas; each moves at a speed proportional to 1/√ℳ', 80, 232, PAL.muted, { size: 16 });
    const MA = MOLS[a].m, MB = MOLS[b].m, mm = (x) => hue('mass', fmt(x, x < 10 ? 0 : 1) + '\\ \\text{g/mol}');
    tex(d.readout, `\\frac{\\text{rate of effusion of }${TEXF[a]}}{\\text{rate of effusion of }${TEXF[b]}} = \\frac{\\sqrt{\\kMMB}}{\\sqrt{\\kMMA}} = \\frac{\\sqrt{${mm(MB)}}}{\\sqrt{${mm(MA)}}} = ${fmt(Math.sqrt(MB / MA), 2)}`);
  }
  register(d.fig, { update: (dt) => { cy.step(dt, () => 1); step(Math.min(dt, 0.05)); }, draw });
})();

/* =====================================================================
   FIGURE 9.30: a gaseous diffuser, a faithful still copy of the book's
   drawing. Each UF₆ molecule is its uranium atom in the element colour,
   ringed in the referent colour of its isotope, since the isotope is
   the only difference between the two. The book's exaggerated separation
   is kept. Still: nothing in the idea has a clock, so no transport and no
   controls; the molecules are named under the pointer.
===================================================================== */
(function () {
  const d = sim('sim-diffuser', 470);
  const L = 300, R = 1060, TOP = 110, BOT = 350, TY = 205, TH = 42;
  let seed = 7;
  const rnd = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
  const mols = [];
  const put = (x, y, iso) => mols.push({ x, y, iso });
  for (let i = 0; i < 64; i++) { const x = 200 + rnd() * 960, f = (x - 200) / 960; put(x, TY + 8 + rnd() * (TH - 16), rnd() < 0.32 * (1 - f) ? 235 : 238); }
  for (let i = 0; i < 110; i++) { const x = L + 30 + rnd() * (R - L - 70), up = rnd() < 0.45, y = up ? TOP + 22 + rnd() * (TY - TOP - 40) : TY + TH + 18 + rnd() * (BOT - TY - TH - 40); put(x, y, rnd() < 0.06 ? 238 : 235); }
  for (let i = 0; i < 4; i++) put(1210 + i * 14, 338, 235);
  const ISO = { 235: { ref: 'uf6-235', name: 'a molecule of ²³⁵UF₆' }, 238: { ref: 'uf6-238', name: 'a molecule of ²³⁸UF₆' } };
  F.hover(d.stage, () => mols.map((m) => ({ x: m.x, y: m.y, r: 8, name: ISO[m.iso].name })));
  function draw() {
    const { ctx } = begin(d.c);
    ctx.save(); ctx.fillStyle = PAL.soft; ctx.fillRect(120, 352, 1020, 40); ctx.restore();
    ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.05); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.roundRect(L, TOP, R - L, BOT - TOP, 60); ctx.fill(); ctx.stroke(); ctx.restore();
    ctx.save(); ctx.fillStyle = PAL.panel; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3;
    ctx.fillRect(180, TY, 1020, TH); ctx.restore();
    line(ctx, 180, TY, L, TY, PAL.ink, 3); line(ctx, 180, TY + TH, L, TY + TH, PAL.ink, 3);
    line(ctx, R, TY, 1200, TY, PAL.ink, 3); line(ctx, R, TY + TH, 1200, TY + TH, PAL.ink, 3);
    line(ctx, L, TY, R, TY, PAL.ink, 3, [6, 8]); line(ctx, L, TY + TH, R, TY + TH, PAL.ink, 3, [6, 8]);
    line(ctx, 180, TY, 180, TY + TH, PAL.ink, 3); line(ctx, 1200, TY, 1200, TY + TH, PAL.ink, 3);
    ctx.save(); ctx.fillStyle = PAL.panel; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.fillRect(R - 20, 322, 170, 30); ctx.strokeRect(R - 20, 322, 170, 30); ctx.restore();
    for (const m of mols) {
      ctx.save(); ctx.fillStyle = F.el('U'); ctx.strokeStyle = F.ref(ISO[m.iso].ref); ctx.lineWidth = 3.5;
      ctx.beginPath(); ctx.arc(m.x, m.y, 8, 0, TAU); ctx.stroke(); ctx.fillStyle = F.el('U'); ctx.beginPath(); ctx.arc(m.x, m.y, 4.5, 0, TAU); ctx.fill(); ctx.restore();
    }
    [[420, -1], [640, 1], [820, -1], [520, 1], [900, 1], [700, -1]].forEach(([x, s]) => arrow(ctx, x, s < 0 ? TY - 4 : TY + TH + 4, x + 18, s < 0 ? TY - 46 : TY + TH + 46, PAL.ink, 3));
    arrow(ctx, 20, TY + TH / 2, 170, TY + TH / 2, PAL.ink, 4);
    arrow(ctx, 1210, TY + TH / 2, 1360, TY + TH / 2, PAL.ink, 4);
    arrow(ctx, 1270, 337, 1380, 337, PAL.ink, 4);
    text(ctx, 'uranium hexafluoride (UF_{6})', 20, TY + TH / 2 + 44, PAL.ink, { size: 20 });
    label(ctx, 'high pressure feed tube', 190, TY - 4, { side: 'above', size: 20, color: PAL.ink, gap: 60 });
    label(ctx, 'porous barrier', 600, TY, { side: 'above', size: 20, color: PAL.ink, gap: 112 });
    text(ctx, 'depleted ²³⁸UF_{6}', 1210, TY - 16, PAL.ink, { size: 20 });
    text(ctx, 'enriched ²³⁵UF_{6}', 1160, 385, PAL.ink, { size: 20 });
    text(ctx, 'higher speed ²³⁵UF_{6} diffuses through the barrier faster than ²³⁸UF_{6}', 640, 60, PAL.ink, { size: 20, align: 'center' });
    [['uf6-235', '²³⁵UF_{6}'], ['uf6-238', '²³⁸UF_{6}']].forEach(([c, s], i) => {
      const x = 330 + i * 200;
      ctx.save(); ctx.fillStyle = F.el('U'); ctx.strokeStyle = F.ref(c); ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, 440, 8, 0, TAU); ctx.stroke(); ctx.beginPath(); ctx.arc(x, 440, 4.5, 0, TAU); ctx.fill(); ctx.restore();
      text(ctx, s, x + 16, 447, F.ref(c), { size: 18, weight: 600 });
    });
  }
  register(d.fig, { update: () => {}, draw });
})();
};
