/* Figures for section 21.4 Transmutation and Nuclear Energy.
   Neutrons are F.el('n0') and protons F.el('p+'); a uranium nucleus drawn whole
   and the fuel rods take F.el('U'). The two fission fragments of sim-fission are
   the section's referents: their nucleons keep the convention, their outlines,
   names and yield points wear F.ref; the unnamed fragments of sim-chain are
   F.cat(0). Counts, Z, A, shares of neutrons, the yield
   in percent and the lump's mass as a multiple of the critical mass are ink; the
   burst of a fission is energy and the reactor's fission rate is rate. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['21.4'] = function (root, F) {
const { fmt, C, PAL, alpha, ctl, register, cycle, begin, line, arrow, dot, text, topline, label, axes, hover, readout, pinned } = F;
const sim = (id, H) => F.sim(root, id, H);
const hash = (i, s) => { const x = Math.sin(i * 127.1 + s * 311.7) * 43758.5453; return x - Math.floor(x); };
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const smooth = (k) => F.ease.smooth(clamp(k, 0, 1));
const GOLD = 2.399963;
const r2 = (x) => Math.round(x * 100) / 100;
function disc(ctx, x, y, r, fill, stroke, w = 1.2) {
  ctx.beginPath(); ctx.arc(x, y, r, 0, 2 * Math.PI);
  if (fill) { ctx.fillStyle = fill; ctx.fill(); }
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = w; ctx.stroke(); }
}
function burst(ctx, x, y, R, k, color) {
  if (k <= 0) return;
  ctx.save(); ctx.beginPath();
  for (let i = 0; i < 24; i++) { const a = i * Math.PI / 12, rr = (i % 2 ? 0.45 : 1) * R * k; ctx.lineTo(x + rr * Math.cos(a), y + rr * Math.sin(a)); }
  ctx.closePath(); ctx.fillStyle = alpha(color, 0.3); ctx.strokeStyle = color; ctx.lineWidth = 2.5; ctx.fill(); ctx.stroke(); ctx.restore();
}

/* =====================================================================
   FIGURE 21.14 + 21.15 · sim-fission · moving · flat (rule 28.1)
   A ²³⁵U nucleus of 235 nucleon discs (92 protons) in a sunflower packing;
   the slow neutron flies to the empty outermost seat (0 to 0.9 s) and the
   nucleus is ²³⁶U by 1.3 s; it stretches into the book's upright dumbbell
   (1.3 to 2.1 s) and splits: each proton and neutron glides to its seat in
   the light fragment (up) or the heavy one (down), the n neutrons nearest
   the waist fly off right between them at 420 units/s, the fragments fly apart until
   3.2 s; hold 1.2 s. The five reactions are the book's 21.15(a), with 21.16's
   balanced ⁹⁶Rb in place of 21.15's ⁹⁷Rb. Graph: the book's yield curve read
   from its points, on its axes, 60 to 180 by 0 to 9 %.
===================================================================== */
(function () {
  const H = 640, A0 = 0.9, U6 = 1.3, S0 = 2.1, FL = 1.1, T = S0 + FL + 0.2;
  const RX = {
    'Ba-Kr': { l: ['Kr', 92, 36], h: ['Ba', 141, 56], n: 3, light: false, word: 'krypton-92 and barium-141' },
    'Sr-Xe': { l: ['Sr', 90, 38], h: ['Xe', 144, 54], n: 2, light: true, word: 'strontium-90 and xenon-144' },
    'Br-La': { l: ['Br', 87, 35], h: ['La', 146, 57], n: 3, light: true, word: 'bromine-87 and lanthanum-146' },
    'Rb-Cs': { l: ['Rb', 96, 37], h: ['Cs', 137, 55], n: 3, light: true, word: 'rubidium-96 and cesium-137' },
    'Te-Zr': { l: ['Zr', 97, 40], h: ['Te', 137, 52], n: 2, light: false, word: 'zirconium-97 and tellurium-137' },
  };
  const NUM = ['', 'one', 'two', 'three'];
  const d = sim('sim-fission', H);
  const rx = F.select(d.controls, { label: '\\text{reaction}', key: 'reaction', aria: 'the fission reaction',
    options: [{ value: 'Ba-Kr', label: 'Ba-141 + Kr-92 + 3n' }, { value: 'Sr-Xe', label: 'Sr-90 + Xe-144 + 2n' }, { value: 'Br-La', label: 'Br-87 + La-146 + 3n' },
      { value: 'Rb-Cs', label: 'Rb-96 + Cs-137 + 3n' }, { value: 'Te-Zr', label: 'Te-137 + Zr-97 + 2n' }],
    value: 'Ba-Kr', ms: 0, onInput: () => cy.reset() });
  const cy = cycle(() => T, 1.2);
  const ro = readout(d);
  let hits = [];
  hover(d.stage, () => hits);

  /* the yield curve of Figure 21.15(b), read from the book's points */
  const YIELD = [[64, 0.1], [77, 0.1], [79, 0.15], [80, 0.2], [81, 0.35], [82, 0.6], [83, 1.0], [84, 1.35], [85, 2.0], [86, 2.6], [87, 3.6], [88, 4.8], [89, 5.9],
    [90, 5.95], [91, 6.0], [92, 6.25], [93, 6.6], [94, 6.55], [95, 6.05], [96, 6.0], [97, 5.8], [98, 6.2], [99, 6.3], [100, 5.2], [101, 4.3], [102, 3.1],
    [103, 1.95], [104, 1.05], [105, 0.5], [106, 0.25], [107, 0.15], [108, 0.1], [125, 0.1], [126, 0.2], [127, 0.3], [128, 0.45], [129, 0.6], [130, 1.9],
    [131, 2.95], [132, 4.35], [133, 6.7], [134, 7.85], [135, 6.6], [136, 3.95], [137, 6.75], [138, 6.5], [139, 6.25], [140, 5.95], [141, 5.85], [142, 6.0],
    [143, 5.55], [144, 4.0], [145, 3.05], [146, 2.3], [147, 1.75], [148, 1.15], [149, 0.75], [150, 0.5], [151, 0.35], [152, 0.2], [153, 0.1], [172, 0.1]];
  const yieldAt = (A) => { for (let i = 1; i < YIELD.length; i++) if (A <= YIELD[i][0]) { const [a0, y0] = YIELD[i - 1], [a1, y1] = YIELD[i]; return y0 + (y1 - y0) * (A - a0) / (a1 - a0); } return 0.1; };

  /* the nucleus: 236 seats, the outermost one empty until the neutron takes it */
  const CX = 300, CY = 360, R = 100, NN = 236, ABS = NN - 1, RD = R / Math.sqrt(NN) * 0.98;
  const SEAT = Array.from({ length: NN }, (_, i) => { const rr = Math.sqrt((i + 0.5) / NN), a = i * GOLD; return { u: rr * Math.cos(a), v: rr * Math.sin(a) }; });
  const PROT = new Set(Array.from({ length: ABS }, (_, i) => i).sort((a, b) => hash(a, 3) - hash(b, 3)).slice(0, 92));
  const LC = { x: 640, y: 214 }, HC = { x: 640, y: 488 }, BURST = { x: CX + 36, y: CY };
  let rKey = '', ROLE = null;
  function roles(key) {
    if (rKey === key) return ROLE;
    rKey = key;
    const r = RX[key], [, A1, Z1] = r.l, [, A2] = r.h, N1 = A1 - Z1;
    const neu = SEAT.map((s, i) => i).filter((i) => !PROT.has(i)), pro = [...PROT];
    const free = neu.slice().sort((a, b) => Math.abs(SEAT[a].v) - Math.abs(SEAT[b].v)).slice(0, r.n);
    const restN = neu.filter((i) => !free.includes(i)).sort((a, b) => SEAT[a].v - SEAT[b].v);
    const byV = pro.slice().sort((a, b) => SEAT[a].v - SEAT[b].v);
    const light = byV.slice(0, Z1).concat(restN.slice(0, N1)), heavy = byV.slice(Z1).concat(restN.slice(N1));
    const role = new Array(NN), rad = (A) => RD * Math.sqrt(A) * 1.04;
    [[light, 'l', A1], [heavy, 'h', A2]].forEach(([set, g, A]) => {
      set.sort((a, b) => hash(a, 7) - hash(b, 7)).forEach((i, m) => { const rr = Math.sqrt((m + 0.5) / A) * rad(A) * 0.98, a = m * GOLD; role[i] = { g, tx: rr * Math.cos(a), ty: rr * Math.sin(a) }; });
    });
    free.forEach((i, j) => { const a = (j - (r.n - 1) / 2) * 0.12; role[i] = { g: 'n', ux: Math.cos(a), uy: Math.sin(a) }; });
    ROLE = { role, rl: rad(A1), rh: rad(A2) };
    return ROLE;
  }
  const deformed = (s, k) => [CX + R * s.u * (1 - 0.2 * k) * (1 - 0.5 * k * Math.exp(-((s.v / 0.42) ** 2))), CY + R * s.v * (1 + 0.6 * k)];
  const nuc = (A, Z, sym) => `{}^{${A}}_{${Z < 100 && Z >= 10 ? '\\;' : ''}${Z}}\\text{${sym}}`;

  function draw() {
    const { ctx } = begin(d.c);
    const t = cy.now(), key = rx.value, r = RX[key], RL = roles(key), FLc = F.ref('light-fragment'), FHc = F.ref('heavy-fragment');
    const P = F.el('p+'), N = F.el('n0'), E = C('energy'), INK = PAL.ink;
    const [sl, Al] = r.l, [sh, Ah] = r.h;
    hits = [];
    topline(ctx, 'Uranium-236 splits into ' + r.word + ' and sets ' + NUM[r.n] + ' neutrons free.');

    const k1 = smooth((t - U6) / (S0 - U6)), k2 = smooth((t - S0) / 0.35), sep = smooth((t - S0) / FL);
    const lc = { x: CX + (LC.x - CX) * sep, y: CY - R * 0.62 + (LC.y - CY + R * 0.62) * sep }, hc = { x: CX + (HC.x - CX) * sep, y: CY + R * 0.75 + (HC.y - CY - R * 0.75) * sep };
    ctx.save(); ctx.beginPath(); ctx.rect(0, 80, 900, H - 132); ctx.clip();
    burst(ctx, BURST.x, BURST.y, 46, k2, E);
    SEAT.forEach((s, i) => {
      if (i === ABS && t < A0) return;
      const [dx, dy] = deformed(s, k1), ro0 = RL.role[i], prot = PROT.has(i);
      let x = dx, y = dy;
      if (t > S0) {
        if (ro0.g === 'n') { const q = 420 * (t - S0); x = dx + ro0.ux * q; y = dy + ro0.uy * q; }
        else { const c = ro0.g === 'l' ? lc : hc; x = dx + (c.x + ro0.tx - dx) * k2; y = dy + (c.y + ro0.ty - dy) * k2; if (k2 >= 1) { x = c.x + ro0.tx; y = c.y + ro0.ty; } }
      }
      disc(ctx, x, y, RD, prot ? P : N, alpha(INK, 0.45), 0.9);
      if (ro0.g === 'n' && t > S0) hits.push({ x, y, r: 12, name: 'a neutron set free by the fission' });
    });
    if (k2 > 0) {
      ctx.save(); ctx.globalAlpha *= k2;
      disc(ctx, lc.x, lc.y, RL.rl + 6, null, FLc, 3.5); disc(ctx, hc.x, hc.y, RL.rh + 6, null, FHc, 3.5);
      ctx.restore();
    }
    if (t < A0) {
      const s = SEAT[ABS], tx = CX + R * s.u, ty = CY + R * s.v, q = t / A0, sx = 40, sy = CY - 150;
      const x = sx + (tx - sx) * q, y = sy + (ty - sy) * q, L = Math.hypot(tx - sx, ty - sy);
      arrow(ctx, x - (tx - sx) / L * 34, y - (ty - sy) / L * 34, x - (tx - sx) / L * (RD + 2), y - (ty - sy) / L * (RD + 2), alpha(INK, 0.55), 2.5);
      disc(ctx, x, y, RD, N, alpha(INK, 0.45), 0.9);
      hits.push({ x, y, r: 14, name: 'a slow neutron' });
    }
    ctx.restore();

    if (t < S0) {
      label(ctx, t < U6 ? '²³⁵U' : '²³⁶U', CX - R * 0.8, CY + R * 0.8, { side: 'left', size: 24, gap: 30 });
      hits.push({ x: CX, y: CY, r: R, name: t < A0 ? 'a uranium-235 nucleus: 92 protons and 143 neutrons' : t < U6 ? 'the neutron absorbed' : 'an unstable uranium-236 nucleus, stretching' });
    } else {
      hits.push({ x: lc.x, y: lc.y, r: RL.rl, name: 'the lighter fission fragment, ' + sl + '-' + Al }, { x: hc.x, y: hc.y, r: RL.rh, name: 'the heavier fission fragment, ' + sh + '-' + Ah });
      hits.push({ x: BURST.x, y: BURST.y, r: 40, name: 'the energy released' });
      if (k2 >= 1) label(ctx, 'energy', BURST.x, BURST.y - 40, { side: 'left', size: 20, gap: 34, color: E });
      if (t >= S0 + FL) {
        label(ctx, sl + '-' + Al, lc.x + RL.rl + 8, lc.y, { side: 'right', size: 24, gap: 22, color: FLc });
        label(ctx, sh + '-' + Ah, hc.x + RL.rh + 8, hc.y, { side: 'right', size: 24, gap: 22, color: FHc });
      }
    }

    /* the legend */
    const LY = H - 30;
    disc(ctx, 50, LY, 8, N, alpha(INK, 0.45), 0.9); text(ctx, 'neutron', 66, LY, INK, { size: 18 });
    disc(ctx, 180, LY, 8, P, alpha(INK, 0.45), 0.9); text(ctx, 'proton', 196, LY, INK, { size: 18 });

    /* fission yield against mass number */
    const GB = { l: 990, r: 1350, t: 150, b: 520 };
    const { X, Y } = axes(ctx, GB, [60, 180], [0, 9], { nx: 6, ny: 9, xl: 'mass number', yl: 'fission yield (%)' });
    F.curve(ctx, (a) => yieldAt(a), 64, 172, X, Y, INK, 3.5, 216);
    if (k2 > 0) {
      ctx.save(); ctx.globalAlpha *= k2;
      [[Al, FLc, 'l'], [Ah, FHc, 'h']].forEach(([A, col]) => {
        const y = yieldAt(A);
        line(ctx, X(A), Y(y), X(A), GB.b, alpha(col, 0.8), 2.5, [4, 8]);
        dot(ctx, X(A), Y(y), col, true, 10);
        text(ctx, String(A), X(A) + (A === Al ? -16 : 16), Y(y) - 20, col, { size: 20, weight: 600, align: A === Al ? 'right' : 'left' });
        hits.push({ x: X(A), y: Y(y), r: 14, name: (A === Al ? sl : sh) + '-' + A + ': a fission yield of about ' + fmt(y, 1) + '%' });
      });
      ctx.restore();
    }

    const eq = nuc(235, 92, 'U') + '+' + nuc(1, 0, 'n') + '\\longrightarrow ' + nuc(236, 92, 'U') + '\\longrightarrow ';
    const L = '\\mk{l}{' + nuc(Al, r.l[2], sl) + '}', Hh = '\\mk{h}{' + nuc(Ah, r.h[2], sh) + '}', Nn = '\\mk{n}{' + r.n + '\\,' + nuc(1, 0, 'n') + '}';
    ro.set(eq + (r.light ? L + '+' + Hh : Hh + '+' + L) + '+' + Nn, undefined, { form: key });
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();

/* =====================================================================
   FIGURE 21.16 + 21.17 · sim-chain · moving · 3D, physical (book rule: a
   particle picture), its readings on a flat strip beneath.
   A sphere of ²³⁵U whose radius, relative to the critical one, is r = m^⅓
   for a mass m in critical masses. Each fission releases 3 neutrons; the
   share escaping through the surface is (2/3)/r, the surface-to-volume
   ratio of the sphere scaled so that 1 of 3 goes on at the critical mass
   (a simple model; the caption says so). Nuclei: 36 m of them, the first
   of a fixed list of points uniform in the ball. Generation 0 is the
   nucleus the first neutron strikes at 0.6 s; generation g splits at
   0.6 + 0.7 g s. The number that go on is carried from 3 × (1 − share) by
   error diffusion, so the critical mass holds exactly one per generation;
   each goes to one of the three nearest unstruck nuclei. Neutrons fly at
   4.5 units/s, linearly. Orbit: free yaw, pitch within ±70°; the lump
   floats with nothing beneath it, and no idle spin since the chain moves.
   Strip: fissions per generation, 0 to 6, fixed 0 to 20, pinned() past it.
===================================================================== */
(function () {
  const S0 = 0.6, G = 0.7, NG = 7, T = S0 + (NG - 1) * G + 0.7, VN = 4.5, YMAX = 20, NMAX = 110, RU = 0.075;
  const d = sim('sim-chain');
  const V = F.view3d(d.stage, { spin: 'off', pitch: [-1.22, 1.22], h: 420, dist: 9, tilt: 0.3 });
  const grp = V.part(0), cnv = F.makeCanvas(d.stage, 340);
  const ms = ctl(d.controls, { label: '\\text{mass}', cls: '', key: 'mass', min: 0.3, max: 3, step: 0.01, value: 1, unit: '× critical mass', dec: 2,
    aria: 'the mass of the lump as a multiple of the critical mass', specials: [{ at: 1, label: 'critical mass' }], onInput: () => { sig = ''; cy.reset(); } });
  const cy = cycle(() => T, 1.2);
  const ro = readout(d);
  const T3 = window.THREE;

  const BALL = [];
  for (let i = 0; BALL.length < NMAX; i++) { const p = [2 * hash(i, 1) - 1, 2 * hash(i, 2) - 1, 2 * hash(i, 3) - 1]; if (Math.hypot(...p) < 1) BALL.push(p); }
  const unit = (i, s) => { const z = 2 * hash(i, s) - 1, a = 2 * Math.PI * hash(i, s + 1), q = Math.sqrt(1 - z * z); return [q * Math.cos(a), q * Math.sin(a), z]; };
  const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
  const ENTRY = [-0.82, 0.34, 0.46];

  function model(m) {
    const r = Math.cbrt(m), esc = Math.min(1, (2 / 3) / r), k = Math.abs(m - 1) < 1e-9 ? 1 : r2(3 * (1 - esc));
    return { r, R: 1.55 * r, k, e: r2(3 - k), n: Math.round(36 * m) };
  }
  function chain(M) {
    const pts = BALL.slice(0, M.n).map((p) => p.map((c) => c * (M.R - RU * 1.6)));
    const gen = new Array(M.n).fill(-1), flights = [], counts = [], avail = new Set(pts.map((p, i) => i));
    const e0 = ENTRY.map((c) => c * M.R * 0.55), first = [...avail].sort((a, b) => dist(pts[a], e0) - dist(pts[b], e0))[0];
    gen[first] = 0; avail.delete(first);
    let cur = [first], acc = 0.5;
    for (let g = 0; g < NG; g++) {
      counts.push(cur.length);
      const want = cur.length * M.k + acc;
      let S = Math.floor(want + 1e-9); acc = want - S;
      S = Math.min(S, cur.length * 3, g < NG - 1 ? avail.size : 0);
      const next = [];
      cur.forEach((f, j) => {
        const mine = Math.floor(S / cur.length) + (j < S % cur.length ? 1 : 0), P = pts[f];
        for (let q = 0; q < 3; q++) {
          if (q < mine && avail.size) {
            const cand = [...avail].sort((a, b) => dist(pts[a], P) - dist(pts[b], P)).slice(0, 3), tgt = cand[Math.floor(hash(f * 5 + q, g + 3) * cand.length)];
            avail.delete(tgt); gen[tgt] = g + 1; next.push(tgt);
            flights.push({ g, a: P, b: pts[tgt], hit: true });
          } else flights.push({ g, a: P, u: unit(f * 7 + q, 2 * g + 5), hit: false });
        }
      });
      cur = next;
    }
    return { pts, gen, flights, counts, first };
  }
  const sOf = (g) => S0 + g * G;

  let sig = '', CH = null, M = null, lump = null, NUC = [], FR = [], FX = [], NEU = [], IN = null;
  function build() {
    const key = [ms.v.toFixed(2), F.CC, F.el('U'), F.el('n0'), C('energy'), F.cat(0), PAL.ink].join('|');
    if (key === sig || !grp) return; sig = key;
    M = model(ms.v); CH = chain(M);
    V.clear();
    const SG = F.mesh.geo().sphere, mU = F.mesh.mat(F.el('U')), mN = F.mesh.mat(F.el('n0')), mF = F.mesh.mat(F.cat(0));
    lump = new T3.Mesh(SG, F.mesh.mat(F.el('U'), { transparent: true, opacity: 0.12, depthWrite: false })); lump.scale.setScalar(M.R); grp.add(lump);
    V.pickable(lump, 'a lump of uranium-235, ' + fmt(ms.v, 2) + ' times the critical mass');
    const mk = (mat, r, name) => { const o = new T3.Mesh(SG, mat); o.scale.setScalar(r); grp.add(o); if (name) V.pickable(o, name); return o; };
    NUC = CH.pts.map((p) => { const o = mk(mU, RU, 'a uranium-235 nucleus'); o.position.set(...p); return o; });
    FR = CH.pts.map(() => [mk(mF, RU * 0.75, 'a fission fragment'), mk(mF, RU * 0.65, 'a fission fragment')]);
    FX = CH.pts.map(() => mk(F.mesh.mat(C('energy'), { transparent: true, opacity: 0, depthWrite: false }), RU * 2.4, null));
    NEU = CH.flights.map((f) => mk(mN, RU * 0.5, f.hit ? 'a neutron that goes on to cause fission' : 'a neutron escaping through the surface'));
    IN = mk(mN, RU * 0.5, 'the neutron that starts the chain');
  }
  const add3 = (a, u, s) => [a[0] + u[0] * s, a[1] + u[1] * s, a[2] + u[2] * s];

  function draw() {
    build();
    const t = cy.now();
    if (grp && CH) {
      const P0 = CH.pts[CH.first], e = ENTRY.map((c) => c * (M.R + 1.2)), dd = dist(e, P0), dir = [(P0[0] - e[0]) / dd, (P0[1] - e[1]) / dd, (P0[2] - e[2]) / dd];
      const tin = S0 - dd / VN;
      IN.visible = t >= tin && t < S0; if (IN.visible) IN.position.set(...add3(e, dir, VN * (t - tin)));
      CH.pts.forEach((p, i) => {
        const g = CH.gen[i], s = g < 0 ? Infinity : sOf(g), q = smooth((t - s) / 0.3), u = [Math.cos(i * 1.7), Math.sin(i * 2.3), Math.cos(i * 0.9)];
        NUC[i].visible = t < s;
        FR[i].forEach((o, j) => { o.visible = t >= s; if (o.visible) o.position.set(...add3(p, u, (j ? -1 : 1) * (0.05 + 0.1 * q))); });
        const f = t >= s ? 1 - (t - s) / 0.45 : 0;
        FX[i].visible = f > 0; FX[i].material.opacity = 0.75 * clamp(f, 0, 1);
      });
      CH.flights.forEach((f, j) => {
        const s = sOf(f.g), o = NEU[j], dt = t - s;
        if (dt < 0) { o.visible = false; return; }
        if (f.hit) { const L = dist(f.a, f.b), w = VN * dt; o.visible = w < L; if (o.visible) o.position.set(...add3(f.a, [(f.b[0] - f.a[0]) / L, (f.b[1] - f.a[1]) / L, (f.b[2] - f.a[2]) / L], w)); }
        else { const p = add3(f.a, f.u, VN * dt); o.visible = Math.hypot(...p) < M.R + 0.9; if (o.visible) o.position.set(...p); }
      });
      V.invalidate();
    }

    const Mm = M || model(ms.v), CHc = CH || chain(Mm), crit = Mm.k === 1;
    const { ctx } = begin(cnv);
    topline(ctx, crit ? 'Each fission sends exactly one neutron on to split another nucleus, so the chain holds steady: a critical mass.'
      : Mm.k < 1 ? 'Each fission sends only ' + fmt(Mm.k, 2) + ' neutrons on to split another nucleus, so the chain dies out: a subcritical mass.'
        : 'Each fission sends ' + fmt(Mm.k, 2) + ' neutrons on to split other nuclei, so the fissions grow: a supercritical mass.');
    const GB = { l: 470, r: 1060, t: 140, b: 284 };
    const { X, Y } = axes(ctx, GB, [0, NG], [0, YMAX], { nx: NG, ny: 4, fx: () => '', xl: '', yl: 'fissions' });
    text(ctx, 'generation', (GB.l + GB.r) / 2, GB.b + 50, PAL.muted, { size: 17, align: 'center' });
    for (let g = 0; g < NG; g++) {
      text(ctx, String(g), X(g + 0.5), GB.b + 24, PAL.muted, { size: 17, align: 'center' });
      if (t < sOf(g)) continue;
      const n = CHc.counts[g], top = Y(Math.min(n, YMAX));
      if (n > 0) { ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.45); ctx.fillRect(X(g) + 8, top, X(g + 1) - X(g) - 16, GB.b - top); ctx.restore(); }
      if (n > YMAX) pinned(ctx, GB, X, Y, g + 0.5, n, PAL.ink, String(n));
    }
    const LX = 40, U = F.el('U');
    [[150, U, 0.85, 12, '²³⁵U nucleus'], [192, F.el('n0'), 1, 7, 'neutron'], [234, F.cat(0), 1, 9, 'fission fragments']].forEach(([y, col, a, r, s]) => {
      disc(ctx, LX + 12, y, r, alpha(col, a), alpha(PAL.ink, 0.4), 1); text(ctx, s, LX + 34, y, PAL.ink, { size: 18 });
    });
    burst(ctx, LX + 12, 276, 15, 1, C('energy')); text(ctx, 'a fission', LX + 34, 276, PAL.ink, { size: 18 });

    const kT = fmt(Mm.k, 2), eT = fmt(Mm.e, 2);
    ro.set('\\mk{f}{\\text{to fission}} + \\mk{e}{\\text{escaping}} = \\mk{fv}{' + kT + '} + \\mk{ev}{' + eT + '} = 3\\ \\text{neutrons}', undefined, { form: crit ? 'c' : Mm.k < 1 ? 'sub' : 'super' });
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();

/* =====================================================================
   FIGURE 21.20 · sim-reactor · moving · flat (rule 28.1)
   The core of 21.20(a) in section. Each fission releases 3 neutrons: 1.80
   are lost from the core and 1.20 are slowed by the water (0.06 with no
   moderator, left too fast), of which the control rods take (2/3) × rods in
   and the fuel the rest; both rounded as shown, the lost share 3 less the
   two, so the readout adds up. Steady at 25% in. Ten generations over 5 s
   (0.5 s each), hold 1.2 s; the fission rate after g generations is k^g of
   its start, on a graph fixed at 0 to 3 with pinned() past it. Neutrons in
   the core come at 24 a second times the rate (capped at 3); the coolant
   flows at a fixed rate while there is water.
===================================================================== */
(function () {
  const H = 680, OY = 36, T = 5, NGEN = 10, TAU = T / NGEN, RMAX = 3;
  const d = sim('sim-reactor', H);
  const mod = F.choice(d.controls, { label: '\\text{moderator}', key: 'moderator', options: [{ value: 'water', label: 'water' }, { value: 'none', label: 'none' }], value: 'water',
    aria: 'the moderator in the core', onInput: () => { rods.refresh(); cy.reset(); } });
  const rods = ctl(d.controls, { label: '\\text{rods in}', cls: '', key: 'rods', min: 0, max: 100, step: 1, value: 25, unit: '%', dec: 0,
    aria: 'how far the control rods are lowered into the core', specials: [{ at: () => (mod.value === 'water' ? 25 : null), label: 'steady' }], onInput: () => cy.reset() });
  const cy = cycle(() => T, 1.2);
  const ro = readout(d);
  let hits = [];
  hover(d.stage, () => hits);

  const VS = { l: 250, r: 590, t: 120, b: 600 }, CB = { l: 300, r: 540, t: 300, b: 566 };
  const FUEL = Array.from({ length: 9 }, (_, i) => 320 + 25 * i), RODX = [357.5, 407.5, 457.5, 507.5], GT = 352, GB2 = 546, FT = 362, FB = 540;
  const INY = 252;
  function along(pts) {
    const segs = []; let L = 0;
    for (let i = 1; i < pts.length; i++) { const l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); segs.push({ a: pts[i - 1], b: pts[i], s: L, l }); L += l; }
    return { L, at: (s) => { s = ((s % L) + L) % L; const q = segs.find((g) => s <= g.s + g.l) || segs[segs.length - 1], k = (s - q.s) / q.l; return [q.a[0] + (q.b[0] - q.a[0]) * k, q.a[1] + (q.b[1] - q.a[1]) * k]; } };
  }
  const FLOWS = [345, 420, 495].map((cx) => along([[150, INY], [276, INY], [276, 580], [cx, 580], [cx, 272], [564, 272], [564, INY], [690, INY]]));
  const outlet = (ctx, x0, x1, y) => { ctx.save(); ctx.fillStyle = PAL.panel; ctx.strokeStyle = alpha(PAL.ink, 0.6); ctx.lineWidth = 2.5; ctx.fillRect(x0, y - 16, x1 - x0, 32); ctx.beginPath(); ctx.moveTo(x0, y - 16); ctx.lineTo(x1, y - 16); ctx.moveTo(x0, y + 16); ctx.lineTo(x1, y + 16); ctx.stroke(); ctx.restore(); };

  function draw() {
    const { ctx } = begin(d.c);
    const t = cy.now(), wet = mod.value === 'water', iv = rods.v / 100, slow = wet ? 1.2 : 0.06;
    const crit = wet && rods.v === 25, kf = crit ? 1 : r2(slow * (1 - (2 / 3) * iv)), kr = r2(slow - kf), kl = r2(3 - kf - kr);
    const g = t / TAU, rate = Math.pow(kf, g), INK = PAL.ink, U = F.el('U'), N = F.el('n0'), RC = C('rate'), E = C('energy');
    const level = mod.mix((v) => (v === 'water' ? 1 : 0));
    hits = [];
    topline(ctx, !wet ? 'With no moderator the neutrons stay too fast to cause fission, and the chain reaction stops.'
      : crit ? 'With the control rods 25% in, each fission leads to exactly one more, and the fission rate holds steady.'
        : 'With the control rods ' + fmt(rods.v, 0) + '% in, each fission leads to ' + fmt(kf, 2) + ' more, and the fission rate ' + (kf < 1 ? 'dies away.' : 'climbs.'));

    /* the scene, drawn OY down so the headline has the top to itself */
    ctx.save(); ctx.translate(0, OY);
    /* the steel pressure vessel, its nozzles, the core barrel and the water */
    outlet(ctx, 150, VS.l + 8, INY); outlet(ctx, VS.r - 8, 690, INY);
    ctx.save(); ctx.fillStyle = PAL.panel; ctx.strokeStyle = alpha(INK, 0.45); ctx.lineWidth = 16;
    ctx.beginPath(); ctx.roundRect(VS.l, VS.t, VS.r - VS.l, VS.b - VS.t, [150, 150, 70, 70]); ctx.fill(); ctx.stroke();
    ctx.clip(); if (level > 0) { ctx.fillStyle = alpha(INK, 0.09 * level); ctx.fillRect(VS.l, VS.t, VS.r - VS.l, VS.b - VS.t); }
    ctx.restore();
    hits.push({ x: VS.l, y: 420, r: 16, name: 'the steel pressure vessel' }, { x: VS.r, y: 420, r: 16, name: 'the steel pressure vessel' });
    hits.push({ x: 175, y: INY, r: 18, name: 'cooler water flowing in' }, { x: 665, y: INY, r: 18, name: 'hot water flowing out to the steam generator' });
    line(ctx, CB.l, 280, CB.l, CB.b, alpha(INK, 0.5), 3); line(ctx, CB.r, 280, CB.r, CB.b, alpha(INK, 0.5), 3);
    hits.push({ x: 276, y: 420, r: 16, name: wet ? 'water flowing down between the vessel and the core' : 'the core, its water gone' });

    /* fuel rods, grids, control rods and their drive housing */
    FUEL.forEach((x) => { ctx.save(); ctx.fillStyle = alpha(U, 0.8); ctx.strokeStyle = alpha(INK, 0.5); ctx.lineWidth = 1; ctx.fillRect(x - 6, FT, 12, FB - FT); ctx.strokeRect(x - 6, FT, 12, FB - FT); ctx.restore(); hits.push({ x, y: 470, r: 9, name: 'a fuel rod of enriched uranium oxide pellets' }); });
    [GT, GB2].forEach((y) => { ctx.save(); ctx.fillStyle = alpha(INK, 0.25); ctx.strokeStyle = alpha(INK, 0.6); ctx.lineWidth = 1.5; ctx.fillRect(CB.l, y - 6, CB.r - CB.l, 12); ctx.strokeRect(CB.l, y - 6, CB.r - CB.l, 12); ctx.restore(); hits.push({ x: 420, y, r: 10, name: 'a grid holding the fuel rods' }); });
    const tip = GT - 10 + (FB - GT + 6) * iv;
    ctx.save(); ctx.fillStyle = alpha(INK, 0.2); ctx.strokeStyle = alpha(INK, 0.6); ctx.lineWidth = 2; ctx.fillRect(345, 48, 175, 46); ctx.strokeRect(345, 48, 175, 46); ctx.restore();
    hits.push({ x: 432, y: 70, r: 26, name: 'the drive that raises and lowers the control rods' });
    RODX.forEach((x) => { ctx.save(); ctx.fillStyle = alpha(INK, 0.78); ctx.fillRect(x - 4, 94, 8, tip - 94); ctx.restore(); hits.push({ x, y: Math.max(tip - 14, 200), r: 8, name: 'a control rod, ' + fmt(rods.v, 0) + '% in, absorbing slow neutrons' }); });

    /* the coolant */
    if (level > 0.02) FLOWS.forEach((P, j) => { for (let i = 0; i < 16; i++) { const [x, y] = P.at(i * P.L / 16 + 60 * t + j * 11); disc(ctx, x, y, 3.2, alpha(INK, 0.5 * level)); } });
    if (level > 0.02) { arrow(ctx, 160, INY, 200, INY, alpha(INK, 0.6 * level), 3); arrow(ctx, 630, INY, 675, INY, alpha(INK, 0.6 * level), 3); }

    /* neutrons between the rods */
    const RATE = 24;
    for (let j = Math.floor((t - 0.3) * RATE * RMAX); j <= Math.floor(t * RATE * RMAX); j++) {
      if (j < 0) continue;
      const tj = j / (RATE * RMAX), q = (t - tj) / 0.3;
      if (q < 0 || q > 1 || hash(j, 1) * RMAX > Math.min(Math.pow(kf, tj / TAU), RMAX)) continue;
      const f = Math.floor(hash(j, 2) * FUEL.length), dir = hash(j, 3) < 0.5 ? -1 : 1, pick = hash(j, 5) * 3;
      const fate = pick < kf ? 'f' : pick < kf + kr ? 'r' : 'l';
      let y = FT + 10 + (FB - FT - 20) * hash(j, 4), x0 = FUEL[f] + dir * 7, x1;
      if (fate === 'r') { const rx = RODX.filter((x) => (x - FUEL[f]) * dir > 0).sort((a, b) => Math.abs(a - FUEL[f]) - Math.abs(b - FUEL[f]))[0] ?? RODX[dir > 0 ? 3 : 0]; x1 = rx - dir * 4; y = FT + 6 + (tip - FT - 6) * hash(j, 4); if (tip <= FT + 6) continue; }
      else if (fate === 'f') x1 = FUEL[clamp(f + dir, 0, FUEL.length - 1)] - dir * 6;
      else x1 = x0 + dir * 70;
      if (x1 === x0 || (fate === 'f' && (x1 - x0) * dir <= 0)) x1 = x0 + dir * 18;
      const x = x0 + (x1 - x0) * q;
      ctx.save(); ctx.globalAlpha *= fate === 'l' ? 1 - q : 1;
      disc(ctx, x, y, 4.5, N, alpha(INK, 0.45), 1);
      ctx.restore();
      if (fate === 'f' && q > 0.85) burst(ctx, x1, y, 9, 1, E);
    }

    label(ctx, 'steel pressure vessel', VS.r - 22, VS.t + 40, { side: 'right', size: 20, gap: 80, H: H - OY });
    label(ctx, 'control rods', RODX[3] + 4, 230, { side: 'right', size: 20, gap: 110, H: H - OY });
    label(ctx, 'grid', CB.r, GT, { side: 'right', size: 20, gap: 92, H: H - OY });
    label(ctx, 'fuel rods', FUEL[8] + 6, 470, { side: 'right', size: 20, gap: 112, H: H - OY });
    ctx.restore();
    hits.forEach((h) => { h.y += OY; });

    /* the fission rate over ten generations */
    const GRB = { l: 1000, r: 1350, t: 150, b: 470 };
    const { X, Y } = axes(ctx, GRB, [0, NGEN], [0, RMAX], { nx: 5, ny: 3, xl: 'neutron generations', yl: 'fission rate ÷ starting rate', yc: RC });
    line(ctx, GRB.l, Y(1), GRB.r, Y(1), alpha(INK, 0.4), 2, [10, 10]);
    const gEnd = Math.min(g, NGEN), pts = [];
    for (let i = 0; i <= 120; i++) { const gi = gEnd * i / 120, p = Math.pow(kf, gi); if (p > RMAX) break; pts.push([X(gi), Y(p)]); }
    if (pts.length > 1) { ctx.save(); ctx.strokeStyle = RC; ctx.lineWidth = 5; ctx.lineJoin = 'round'; ctx.beginPath(); pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.stroke(); ctx.restore(); }
    const pv = Math.pow(kf, gEnd);
    if (pv > RMAX) pinned(ctx, GRB, X, Y, gEnd, pv, RC, fmt(pv, 1));
    else dot(ctx, X(gEnd), Y(pv), RC, true, 9);
    hits.push({ x: X(gEnd), y: Y(Math.min(pv, RMAX)), r: 14, name: 'the fission rate after ' + fmt(gEnd, 1) + ' generations: ' + (pv < 0.01 ? 'almost nothing' : fmt(pv, 2) + ' times its start') });

    ro.set('\\mk{f}{\\text{to fission}} + \\mk{r}{\\text{to rods}} + \\mk{l}{\\text{lost}} = \\mk{fv}{' + fmt(kf, 2) + '} + \\mk{rv}{' + fmt(kr, 2) + '} + \\mk{lv}{' + fmt(kl, 2) + '} = 3\\ \\text{neutrons}', undefined,
      { form: !wet ? 'none' : crit ? 'c' : kf < 1 ? 'sub' : 'super' });
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();
};
