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
   the slow neutron flies in from the left to the empty leftmost seat
   (0 to 0.9 s) and the nucleus is ²³⁶U by 1.3 s; it stretches into the
   book's upright dumbbell (1.3 to 2.1 s) and splits: each proton and
   neutron glides to its seat in the light fragment (up) or the heavy one
   (down), the n neutrons nearest the waist fly off right between them at
   330 units/s, the fragments fly apart until 3.3 s; hold 1.2 s. The five
   reactions are the book's 21.15(a), with ⁹⁶Rb + ¹³⁷Cs as its image prints
   them. Graph: the book's yield curve read from its points, on its axes,
   60 to 180 by 0 to 9 %; the ten fragments of the five reactions stand on
   it as hollow points, the chosen pair filled in their referent colours.
===================================================================== */
(function () {
  const H = 700, A0 = 0.9, U6 = 1.3, S0 = 2.1, FL = 1.2, T = S0 + FL + 0.2;
  const RX = {
    'Ba-Kr': { l: ['Kr', 92, 36], h: ['Ba', 141, 56], n: 3, light: false, word: 'krypton-92 and barium-141' },
    'Sr-Xe': { l: ['Sr', 90, 38], h: ['Xe', 144, 54], n: 2, light: true, word: 'strontium-90 and xenon-144' },
    'Br-La': { l: ['Br', 87, 35], h: ['La', 146, 57], n: 3, light: true, word: 'bromine-87 and lanthanum-146' },
    'Rb-Cs': { l: ['Rb', 96, 37], h: ['Cs', 137, 55], n: 3, light: true, word: 'rubidium-96 and cesium-137' },
    'Te-Zr': { l: ['Zr', 97, 40], h: ['Te', 137, 52], n: 2, light: false, word: 'zirconium-97 and tellurium-137' },
  };
  const NUM = ['', 'one', 'two', 'three'];
  const SUP = (n) => String(n).replace(/\d/g, (c) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[+c]);
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

  /* the nucleus: 236 seats, the leftmost one empty until the neutron takes it */
  const CX = 340, CY = 368, R = 150, NN = 236, RD = R / Math.sqrt(NN) * 0.98;
  const SEAT = Array.from({ length: NN }, (_, i) => { const rr = Math.sqrt((i + 0.5) / NN), a = i * GOLD; return { u: rr * Math.cos(a), v: rr * Math.sin(a) }; });
  let ABS = 0; SEAT.forEach((s, i) => { if (s.u < SEAT[ABS].u) ABS = i; });
  const PROT = new Set(Array.from({ length: NN }, (_, i) => i).filter((i) => i !== ABS).sort((a, b) => hash(a, 3) - hash(b, 3)).slice(0, 92));
  const LC = { x: CX, y: 214 }, HC = { x: CX, y: 540 }, BURST = { x: CX, y: CY - 2 }, VFREE = 330;
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
    free.forEach((i, j) => { const a = (j - (r.n - 1) / 2) * 0.11; role[i] = { g: 'n', ux: Math.cos(a), uy: Math.sin(a), j }; });
    ROLE = { role, rl: rad(A1), rh: rad(A2), nl: light.length, nh: heavy.length };
    return ROLE;
  }
  const deformed = (s, k) => [CX + R * s.u * (1 - 0.2 * k) * (1 - 0.5 * k * Math.exp(-((s.v / 0.42) ** 2))), CY + R * s.v * (1 + 0.6 * k)];
  const nuc = (A, Z, sym) => `{}^{${A}}_{${Z < 100 && Z >= 10 ? '\\;' : ''}${Z}}\\text{${sym}}`;

  function draw() {
    const { ctx } = begin(d.c);
    const t = cy.now(), key = rx.value, r = RX[key], RL = roles(key), FLc = F.ref('light-fragment'), FHc = F.ref('heavy-fragment');
    const P = F.el('p+'), N = F.el('n0'), E = C('energy'), INK = PAL.ink;
    const [sl, Al, Zl] = r.l, [sh, Ah, Zh] = r.h;
    hits = [];
    topline(ctx, 'Uranium-236 splits into ' + r.word + ' and sets ' + NUM[r.n] + ' neutrons free.');

    const k1 = smooth((t - U6) / (S0 - U6)), k2 = smooth((t - S0) / 0.35), sep = smooth((t - S0) / FL), rest = t >= S0 + FL;
    const lc = { x: CX + (LC.x - CX) * sep, y: CY - R * 0.62 + (LC.y - CY + R * 0.62) * sep }, hc = { x: CX + (HC.x - CX) * sep, y: CY + R * 0.75 + (HC.y - CY - R * 0.75) * sep };
    ctx.save(); ctx.beginPath(); ctx.rect(0, 96, 960, H - 96); ctx.clip();
    burst(ctx, BURST.x, BURST.y, 56, k2, E);
    let nEnd = null;
    SEAT.forEach((s, i) => {
      if (i === ABS && t < A0) return;
      const [dx, dy] = deformed(s, k1), ro0 = RL.role[i], prot = PROT.has(i);
      let x = dx, y = dy;
      if (t > S0) {
        if (ro0.g === 'n') { const q = VFREE * (t - S0); x = dx + ro0.ux * q; y = dy + ro0.uy * q; if (!nEnd || x > nEnd.x) nEnd = { x, y }; }
        else { const c = ro0.g === 'l' ? lc : hc; x = dx + (c.x + ro0.tx - dx) * k2; y = dy + (c.y + ro0.ty - dy) * k2; if (k2 >= 1) { x = c.x + ro0.tx; y = c.y + ro0.ty; } }
      }
      if (ro0.g === 'n' && t > S0) {
        const q = Math.min(VFREE * (t - S0), 60);
        if (q > RD + 6) arrow(ctx, x - ro0.ux * q, y - ro0.uy * q, x - ro0.ux * (RD + 3), y - ro0.uy * (RD + 3), alpha(INK, 0.5), 2.5);
        hits.push({ x, y, r: 14, name: 'a neutron set free by the fission' });
      }
      disc(ctx, x, y, RD, prot ? P : N, alpha(INK, 0.45), 0.9);
    });
    if (k2 > 0) {
      ctx.save(); ctx.globalAlpha *= k2;
      disc(ctx, lc.x, lc.y, RL.rl + 6, null, FLc, 3.5); disc(ctx, hc.x, hc.y, RL.rh + 6, null, FHc, 3.5);
      ctx.restore();
    }
    const s0 = SEAT[ABS], tx = CX + R * s0.u, ty = CY + R * s0.v;
    if (t < A0) {
      const x = 30 + (tx - 30) * (t / A0);
      arrow(ctx, x - 50, ty, x - RD - 3, ty, alpha(INK, 0.5), 2.5);
      disc(ctx, x, ty, RD, N, alpha(INK, 0.45), 0.9);
      hits.push({ x, y: ty, r: 14, name: 'a slow neutron' });
      text(ctx, 'slow neutron', 16, ty - 36, INK, { size: 19, weight: 600 });
    }
    ctx.restore();

    if (t < S0) {
      const yb = CY + R * (1 + 0.6 * k1) + 30;
      text(ctx, t < U6 ? '²³⁵U' : '²³⁶U, unstable', CX, yb, INK, { size: 26, weight: 600, align: 'center' });
      text(ctx, '92 protons + ' + (t < A0 ? 143 : 144) + ' neutrons', CX, yb + 30, PAL.muted, { size: 19, align: 'center' });
      hits.push({ x: CX, y: CY, r: R, name: t < A0 ? 'a uranium-235 nucleus: 92 protons and 143 neutrons' : t < U6 ? 'the neutron absorbed: uranium-236' : 'an unstable uranium-236 nucleus, stretching' });
    } else {
      hits.push({ x: lc.x, y: lc.y, r: RL.rl, name: 'the lighter fission fragment, ' + sl + '-' + Al }, { x: hc.x, y: hc.y, r: RL.rh, name: 'the heavier fission fragment, ' + sh + '-' + Ah });
      hits.push({ x: BURST.x, y: BURST.y, r: 44, name: 'the energy released' });
      if (k2 >= 1) text(ctx, 'energy', BURST.x - 70, BURST.y, E, { size: 22, weight: 600, align: 'right' });
      if (rest) {
        [[lc, RL.rl, sl, Al, Zl, FLc], [hc, RL.rh, sh, Ah, Zh, FHc]].forEach(([c, rr, sym, A, Z, col]) => {
          text(ctx, SUP(A) + sym, c.x + rr + 24, c.y - 30, col, { size: 28, weight: 600 });
          text(ctx, Z + ' protons', c.x + rr + 24, c.y + 4, PAL.muted, { size: 19 });
          text(ctx, (A - Z) + ' neutrons', c.x + rr + 24, c.y + 30, PAL.muted, { size: 19 });
        });
        if (nEnd) text(ctx, r.n + ' neutrons', nEnd.x + 22, CY, INK, { size: 20, weight: 600 });
      }
    }

    F.legend(ctx, { l: 20, r: 420, t: 100, b: 140 }, [
      { s: 'proton', draw: (c, x, y) => disc(c, x, y, 8, P, alpha(INK, 0.45), 0.9) },
      { s: 'neutron', draw: (c, x, y) => disc(c, x, y, 8, N, alpha(INK, 0.45), 0.9) },
    ], { corner: 'tl', row: true, panel: false, size: 18 });

    /* fission yield against mass number */
    const GB = { l: 1010, r: 1360, t: 170, b: 580 };
    const { X, Y } = axes(ctx, GB, [60, 180], [0, 9], { nx: 6, ny: 9, xl: 'mass number', yl: 'fission yield (%)' });
    F.curve(ctx, (a) => yieldAt(a), 64, 172, X, Y, INK, 3.5, 216);
    Object.keys(RX).forEach((k) => { if (k === key) return; const o = RX[k]; [o.l, o.h].forEach(([sym, A]) => {
      dot(ctx, X(A), Y(yieldAt(A)), alpha(INK, 0.55), false, 6);
      hits.push({ x: X(A), y: Y(yieldAt(A)), r: 10, name: sym + '-' + A + ', a fragment of another of the five reactions' });
    }); });
    [[Al, FLc, sl], [Ah, FHc, sh]].forEach(([A, col, sym]) => {
      const y = yieldAt(A);
      line(ctx, X(A), Y(8.25), X(A), GB.b, alpha(col, 0.8), 2.5, [4, 8]);
      dot(ctx, X(A), Y(y), col, true, 10);
      text(ctx, SUP(A) + sym, X(A), Y(8.6), col, { size: 22, weight: 600, align: 'center' });
      hits.push({ x: X(A), y: Y(y), r: 14, name: sym + '-' + A + ': a fission yield of about ' + fmt(y, 1) + '%' });
    });

    const eq = nuc(235, 92, 'U') + '+' + nuc(1, 0, 'n') + '\\longrightarrow ' + nuc(236, 92, 'U') + '\\longrightarrow ';
    const L = '\\mk{l}{' + nuc(Al, Zl, sl) + '}', Hh = '\\mk{h}{' + nuc(Ah, Zh, sh) + '}', Nn = '\\mk{n}{' + r.n + '\\,' + nuc(1, 0, 'n') + '}';
    ro.set(eq + (r.light ? L + '+' + Hh : Hh + '+' + L) + '+' + Nn, undefined, { form: key });
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();

/* =====================================================================
   FIGURE 21.16 + 21.17 · sim-chain · moving · flat (rule 28.5)
   A slice through a lump of ²³⁵U, as Figure 21.17 draws it: a disc whose
   radius, relative to the critical one, is r = m^⅓ for a mass m in
   critical masses, so the lump grows and shrinks with the slider beside a
   dashed circle the size of a critical mass. Each fission releases 3
   neutrons; the share escaping through the surface is (2/3)/r, the
   surface-to-volume ratio of a sphere scaled so that 1 of 3 goes on at the
   critical mass (a simple model; the caption states it). Nuclei: 100 r² of
   them in the slice, spread evenly on a sunflower. Generation 0 is the
   nucleus the first neutron strikes at 0.6 s; generation g splits at
   0.6 + 0.7 g s. The number that go on is carried from 3 × (1 − share) by
   error diffusion, so the critical mass holds exactly one per generation;
   each goes to an unstruck nucleus 40 to 105 units away, and the rest fly
   out through the surface. Neutrons fly linearly at 330 units/s and leave
   their tracks, so the finished picture is the book's Figure 21.17 for
   that mass. Graph: fissions per generation, 0 to 6, fixed 0 to 25,
   pinned() past it.
===================================================================== */
(function () {
  const S0 = 0.6, G = 0.7, NG = 7, T = S0 + (NG - 1) * G + 1.1, VN = 330, YMAX = 25, H = 720;
  const CX = 320, CY = 352, RC = 168, OUT = 26;              /* the centre of the slice, the critical radius and how far past the surface a track runs, in canvas units */
  const d = sim('sim-chain', H);
  const ms = ctl(d.controls, { label: '\\text{mass}', cls: '', key: 'mass', min: 0.3, max: 3, step: 0.01, value: 1, unit: '× critical mass', dec: 2,
    aria: 'the mass of the lump as a multiple of the critical mass', specials: [{ at: 1, label: 'critical mass' }], onInput: () => { key = ''; cy.reset(); } });
  const cy = cycle(() => T, 1.2);
  let hits = [];
  hover(d.stage, () => hits);
  const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
  function model(m) {
    const r = Math.cbrt(m), esc = Math.min(1, (2 / 3) / r), k = Math.abs(m - 1) < 1e-9 ? 1 : r2(3 * (1 - esc));
    return { r, R: RC * r, k, e: r2(3 - k), n: Math.round(100 * r * r) };
  }
  function chain(M) {
    /* evenly spread on a sunflower, a little jittered so the slice does not look ruled */
    const pts = Array.from({ length: M.n }, (_, k) => { const rr = (M.R - 14) * Math.sqrt((k + 0.5) / M.n), a = k * GOLD; return [CX + rr * Math.cos(a) + 6 * (hash(k, 4) - 0.5), CY + rr * Math.sin(a) + 6 * (hash(k, 5) - 0.5)]; });
    const gen = new Array(M.n).fill(-1), flights = [], counts = [], avail = new Set(pts.map((p, i) => i));
    const e0 = [CX - M.R * 0.45, CY - M.R * 0.3], first = [...avail].sort((a, b) => dist(pts[a], e0) - dist(pts[b], e0))[0];
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
            const near = [...avail].filter((i) => { const L = dist(pts[i], P); return L > 40 && L < 105; });
            const pool = near.length ? near : [...avail].sort((a, b) => dist(pts[a], P) - dist(pts[b], P)).slice(0, 3);
            const tgt = pool[Math.floor(hash(f * 5 + q, g + 3) * pool.length)];
            avail.delete(tgt); gen[tgt] = g + 1; next.push(tgt);
            flights.push({ g, a: P, b: pts[tgt], hit: true });
          } else {
            /* an escaping neutron leaves outward, never back across the slice, and its track ends OUT past the surface */
            const ox = P[0] - CX, oy = P[1] - CY, far = Math.hypot(ox, oy) > 20;
            const a = (far ? Math.atan2(oy, ox) : 0) + (hash(f * 7 + q, 2 * g + 5) - 0.5) * (far ? 2.3 : 2 * Math.PI) + (q - 1) * (far ? 0.5 : 0);
            const u = [Math.cos(a), Math.sin(a)], bq = ox * u[0] + oy * u[1], Ro = M.R + OUT;
            const s = -bq + Math.sqrt(bq * bq - (ox * ox + oy * oy) + Ro * Ro);
            flights.push({ g, a: P, b: [P[0] + u[0] * s, P[1] + u[1] * s], hit: false });
          }
        }
      });
      cur = next;
    }
    return { pts, gen, flights, counts, first };
  }
  const sOf = (g) => S0 + g * G;
  let key = '', M = null, CH = null;
  function draw() {
    const { ctx } = begin(d.c);
    if (key !== ms.v.toFixed(2)) { key = ms.v.toFixed(2); M = model(ms.v); CH = chain(M); }
    const t = cy.now(), crit = M.k === 1, U = F.el('U'), NE = F.el('n0'), FRc = F.cat(0), E = C('energy'), INK = PAL.ink, TR = alpha(INK, 0.42);
    hits = [];
    topline(ctx, crit ? 'Each fission sends exactly one neutron on to split another nucleus, so the chain holds steady.'
      : M.k < 1 ? 'Each fission sends only ' + fmt(M.k, 2) + ' neutrons on to split another nucleus, so the chain dies out.'
        : 'Each fission sends ' + fmt(M.k, 2) + ' neutrons on to split other nuclei, so the fissions grow.');
    /* the slice of the lump, and the size of a critical mass beside it */
    ctx.save(); ctx.beginPath(); ctx.arc(CX, CY, M.R, 0, 2 * Math.PI); ctx.fillStyle = alpha(U, 0.12); ctx.fill();
    ctx.strokeStyle = alpha(INK, 0.6); ctx.lineWidth = 3; ctx.stroke();
    if (!crit) { ctx.beginPath(); ctx.arc(CX, CY, RC, 0, 2 * Math.PI); ctx.setLineDash([10, 10]); ctx.strokeStyle = alpha(INK, 0.45); ctx.lineWidth = 2.5; ctx.stroke(); }
    ctx.restore();
    hits.push({ x: CX + M.R * 0.85, y: CY + M.R * 0.4, r: 26, name: 'a lump of uranium-235, ' + fmt(ms.v, 2) + ' times the critical mass' });
    text(ctx, crit ? 'critical mass' : M.k < 1 ? 'subcritical mass' : 'supercritical mass', CX, 656, INK, { size: 22, weight: 600, align: 'center' });
    /* the tracks the neutrons have flown: one that strikes ends at its nucleus, one that escapes ends in an arrowhead outside */
    const P0 = CH.pts[CH.first], e = [Math.max(14, CX - M.R - 100), CY - M.R * 0.75 - 30], d0 = dist(e, P0), tin = S0 - d0 / VN;
    const track = (a, b, w, hit) => {
      const L = dist(a, b), k = Math.min(1, w / L), x = a[0] + (b[0] - a[0]) * k, y = a[1] + (b[1] - a[1]) * k;
      line(ctx, a[0], a[1], x, y, TR, 2);
      if (k >= 1 && !hit) { const an = Math.atan2(b[1] - a[1], b[0] - a[0]); ctx.save(); ctx.fillStyle = alpha(INK, 0.6); ctx.beginPath(); ctx.moveTo(b[0] + 4 * Math.cos(an), b[1] + 4 * Math.sin(an)); ctx.lineTo(b[0] - 9 * Math.cos(an - 0.45), b[1] - 9 * Math.sin(an - 0.45)); ctx.lineTo(b[0] - 9 * Math.cos(an + 0.45), b[1] - 9 * Math.sin(an + 0.45)); ctx.closePath(); ctx.fill(); ctx.restore(); }
      return k < 1 ? [x, y] : null;
    };
    const flying = [];
    if (t >= tin) { const p = track(e, P0, VN * (t - tin), true); if (p) flying.push([p, 'the neutron that starts the chain']); }
    CH.flights.forEach((f) => {
      const dt = t - sOf(f.g); if (dt < 0) return;
      const p = track(f.a, f.b, VN * dt, f.hit);
      if (p) flying.push([p, f.hit ? 'a neutron that goes on to split another nucleus' : 'a neutron escaping through the surface']);
    });
    /* the nuclei: whole until struck, then two fragments on a burst of energy */
    CH.pts.forEach((p, i) => {
      const g = CH.gen[i], s = g < 0 ? Infinity : sOf(g);
      if (t < s) { disc(ctx, p[0], p[1], 7.5, U, alpha(INK, 0.45)); hits.push({ x: p[0], y: p[1], r: 10, name: 'a uranium-235 nucleus' }); return; }
      const q = smooth((t - s) / 0.3), a = i * 1.7, ux = Math.cos(a), uy = Math.sin(a), f = clamp(1 - (t - s) / 0.5, 0, 1);
      burst(ctx, p[0], p[1], 15 + 13 * f, 1, E);
      disc(ctx, p[0] + ux * (2 + 5 * q), p[1] + uy * (2 + 5 * q), 5.5, FRc, alpha(INK, 0.45));
      disc(ctx, p[0] - ux * (2 + 5 * q), p[1] - uy * (2 + 5 * q), 5, FRc, alpha(INK, 0.45));
      hits.push({ x: p[0], y: p[1], r: 14, name: 'a fission in generation ' + g + ': two fragments, three neutrons and energy' });
    });
    flying.forEach(([p, name]) => { disc(ctx, p[0], p[1], 6, NE, alpha(INK, 0.55)); hits.push({ x: p[0], y: p[1], r: 10, name }); });
    F.legend(ctx, { l: 20, r: 800, t: H - 50, b: H - 6 }, [
      { s: '²³⁵U nucleus', draw: (c, x, y) => disc(c, x, y, 7.5, U, alpha(INK, 0.45)) },
      { s: 'neutron and its track', draw: (c, x, y) => { line(c, x - 18, y, x + 6, y, TR, 2); disc(c, x + 10, y, 6, NE, alpha(INK, 0.55)); } },
      { s: 'fission', draw: (c, x, y) => { burst(c, x, y, 13, 1, E); disc(c, x - 5, y, 5, FRc, alpha(INK, 0.45)); disc(c, x + 5, y, 4.5, FRc, alpha(INK, 0.45)); } },
      { s: 'size of a critical mass', color: alpha(INK, 0.45), w: 2.5, dash: [10, 10] },
    ], { corner: 'bl', row: true, panel: false, size: 18 });
    /* fissions per generation */
    const GB = { l: 850, r: 1350, t: 170, b: 580 };
    const { X, Y } = axes(ctx, GB, [0, NG], [0, YMAX], { nx: NG, ny: 5, fx: () => '', xl: 'generation', yl: 'fissions' });
    for (let g = 0; g < NG; g++) {
      text(ctx, String(g), X(g + 0.5), GB.b + 22, PAL.muted, { size: 17, align: 'center' });
      if (t < sOf(g)) continue;
      const n = CH.counts[g], top = Y(Math.min(n, YMAX));
      if (n > 0) { ctx.save(); ctx.fillStyle = alpha(INK, 0.45); ctx.fillRect(X(g) + 10, top, X(g + 1) - X(g) - 20, GB.b - top); ctx.restore(); }
      if (n <= YMAX) text(ctx, String(n), X(g + 0.5), top - 16, INK, { size: 18, align: 'center' });
      if (n > YMAX) pinned(ctx, GB, X, Y, g + 0.5, n, INK, String(n));
      hits.push({ x: X(g + 0.5), y: Math.min(top + 20, GB.b - 10), r: 24, name: n + (n === 1 ? ' fission' : ' fissions') + ' in generation ' + g });
    }
    const kT = fmt(M.k, 2), eT = fmt(M.e, 2);
    F.tex(d.readout, '\\text{neutrons per fission} = \\text{to fission} + \\text{escaping} = ' + kT + ' + ' + eT + ' = 3');
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();

/* =====================================================================
   FIGURE 21.20 · sim-reactor · moving · flat (rule 28.1)
   The reactor of 21.20(a) in section: a thick steel pressure vessel with a
   domed head, a belt above the nozzles and a rounded bottom; the drive
   housing on top with the control rods hanging from it; inside, a core
   barrel hung from a ledge, holding the fuel rods between two grids. Water
   enters by the left nozzle into the gap between the vessel and the barrel,
   flows down, turns under the barrel, rises between the fuel rods and
   leaves through the barrel by the right nozzle.
   Each fission releases 3 neutrons: 1.80 are lost from the core and 1.20
   are slowed by the water (0.06 with no moderator, left too fast), of
   which the control rods take (2/3) × rods in and the fuel the rest; both
   rounded as shown, the lost share 3 less the two, so the readout adds up.
   Steady at 25% in. Ten generations over 5 s (0.5 s each), hold 1.2 s; the
   fission rate after g generations is k^g of its start, on a graph fixed
   at 0 to 3 with pinned() past it. Neutrons in the core come at 24 a
   second times the rate (capped at 3); the coolant flows at a fixed rate
   while there is water.
===================================================================== */
(function () {
  const H = 790, OY = 20, T = 5, NGEN = 10, TAU = T / NGEN, RMAX = 3;
  const d = sim('sim-reactor', H);
  const mod = F.choice(d.controls, { label: '\\text{moderator}', key: 'moderator', options: [{ value: 'water', label: 'water' }, { value: 'none', label: 'none' }], value: 'water',
    aria: 'the moderator in the core', onInput: () => { rods.refresh(); cy.reset(); } });
  const rods = ctl(d.controls, { label: '\\text{rods in}', cls: '', key: 'rods', min: 0, max: 100, step: 1, value: 25, unit: '%', dec: 0,
    aria: 'how far the control rods are lowered into the core', specials: [{ at: () => (mod.value === 'water' ? 25 : null), label: 'steady' }], onInput: () => cy.reset() });
  const cy = cycle(() => T, 1.2);
  const ro = readout(d);
  let hits = [];
  hover(d.stage, () => hits);

  const AX = 400, NY = 370;                                  /* the vessel's axis and the height of the two nozzles */
  const BL = 300, BR = 500, BT = 335, BB = 668;              /* the core barrel */
  const GT = 430, GB2 = 650, FT = 436, FB = 644;             /* the two grids and the fuel between them */
  const FUEL = [-3, -2, -1, 0, 1, 2, 3].map((k) => AX + 28 * k), RODX = [-70, -14, 14, 70].map((x) => AX + x);
  const HS = { l: 330, r: 470, t: 96, b: 150 };              /* the drive housing */
  function outer(ctx) {
    ctx.moveTo(314, 150); ctx.bezierCurveTo(272, 156, 248, 205, 248, 270);
    ctx.lineTo(222, 270); ctx.lineTo(222, 322); ctx.lineTo(248, 322);
    ctx.lineTo(248, NY - 24); ctx.lineTo(120, NY - 24); ctx.lineTo(120, NY + 24); ctx.lineTo(248, NY + 24);
    ctx.lineTo(248, 655); ctx.bezierCurveTo(248, 712, 312, 742, 400, 742); ctx.bezierCurveTo(488, 742, 552, 712, 552, 655);
    ctx.lineTo(552, NY + 24); ctx.lineTo(680, NY + 24); ctx.lineTo(680, NY - 24); ctx.lineTo(552, NY - 24);
    ctx.lineTo(552, 322); ctx.lineTo(578, 322); ctx.lineTo(578, 270); ctx.lineTo(552, 270);
    ctx.bezierCurveTo(552, 205, 528, 156, 486, 150); ctx.closePath();
  }
  function inner(ctx) {
    ctx.moveTo(338, 150); ctx.bezierCurveTo(300, 166, 272, 215, 272, 280);
    ctx.lineTo(272, NY - 16); ctx.lineTo(120, NY - 16); ctx.lineTo(120, NY + 16); ctx.lineTo(272, NY + 16);
    ctx.lineTo(272, 650); ctx.bezierCurveTo(272, 696, 326, 718, 400, 718); ctx.bezierCurveTo(474, 718, 528, 696, 528, 650);
    ctx.lineTo(528, NY + 16); ctx.lineTo(680, NY + 16); ctx.lineTo(680, NY - 16); ctx.lineTo(528, NY - 16);
    ctx.lineTo(528, 280); ctx.bezierCurveTo(528, 215, 500, 166, 462, 150); ctx.closePath();
  }
  function along(pts) {
    const segs = []; let L = 0;
    for (let i = 1; i < pts.length; i++) { const l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); segs.push({ a: pts[i - 1], b: pts[i], s: L, l }); L += l; }
    return { L, at: (s) => { const q = segs.find((g) => s <= g.s + g.l) || segs[segs.length - 1], k = clamp((s - q.s) / q.l, 0, 1); return [q.a[0] + (q.b[0] - q.a[0]) * k, q.a[1] + (q.b[1] - q.a[1]) * k, Math.atan2(q.b[1] - q.a[1], q.b[0] - q.a[0])]; } };
  }
  /* the coolant's two paths: in at the left nozzle, down outside the barrel, under it, up between the fuel rods, out at the right */
  const FLOWS = [[358, 364, 281, 686], [442, 376, 291, 698]].map(([cx, y, xd, yb]) => along([[126, y], [xd, y], [xd, yb], [cx, yb], [cx, y], [674, y]]));
  const chevron = (ctx, x, y, a, col) => { ctx.save(); ctx.translate(x, y); ctx.rotate(a); ctx.strokeStyle = col; ctx.lineWidth = 2.5; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(-4, -5); ctx.lineTo(3, 0); ctx.lineTo(-4, 5); ctx.stroke(); ctx.restore(); };

  function draw() {
    const { ctx } = begin(d.c);
    const t = cy.now(), wet = mod.value === 'water', iv = rods.v / 100, slow = wet ? 1.2 : 0.06;
    const crit = wet && rods.v === 25, kf = crit ? 1 : r2(slow * (1 - (2 / 3) * iv)), kr = r2(slow - kf), kl = r2(3 - kf - kr);
    const g = t / TAU, INK = PAL.ink, U = F.el('U'), N = F.el('n0'), RC = C('rate'), E = C('energy');
    const level = mod.mix((v) => (v === 'water' ? 1 : 0));
    hits = [];
    topline(ctx, !wet ? 'With no moderator the neutrons stay too fast to cause fission, and the chain reaction stops.'
      : crit ? 'With the control rods 25% in, each fission leads to exactly one more, and the fission rate holds steady.'
        : 'With the control rods ' + fmt(rods.v, 0) + '% in, each fission leads to ' + fmt(kf, 2) + ' more, and the fission rate ' + (kf < 1 ? 'dies away.' : 'climbs.'));

    /* the scene, set OY down so the headline has the top to itself */
    ctx.save(); ctx.translate(0, OY);
    /* the water, then the steel round it */
    ctx.save(); ctx.beginPath(); inner(ctx); ctx.fillStyle = PAL.panel; ctx.fill();
    if (level > 0) { ctx.fillStyle = alpha(INK, 0.09 * level); ctx.fill(); }
    ctx.restore();
    ctx.save(); ctx.beginPath(); outer(ctx); inner(ctx); ctx.fillStyle = alpha(INK, 0.3); ctx.fill('evenodd');
    ctx.strokeStyle = alpha(INK, 0.7); ctx.lineWidth = 2; ctx.lineJoin = 'round';
    ctx.beginPath(); outer(ctx); ctx.stroke(); ctx.beginPath(); inner(ctx); ctx.stroke(); ctx.restore();
    hits.push({ x: 260, y: 520, r: 16, name: 'the steel pressure vessel' }, { x: 540, y: 520, r: 16, name: 'the steel pressure vessel' }, { x: AX, y: 730, r: 16, name: 'the steel pressure vessel' });
    hits.push({ x: 180, y: NY, r: 22, name: wet ? 'cooler water flowing in' : 'the inlet nozzle' }, { x: 620, y: NY, r: 22, name: wet ? 'hot water flowing out to the steam generator' : 'the outlet nozzle' });

    /* the core barrel: hung from a ledge on the vessel wall, open at the bottom, the outlet nozzle passing through it */
    const BC = alpha(INK, 0.6);
    line(ctx, 272, BT, BL, BT, BC, 3); line(ctx, BL, BT, BL, BB, BC, 3);
    line(ctx, BR, BT, 528, BT, BC, 3); line(ctx, BR, BT, BR, NY - 16, BC, 3); line(ctx, BR, NY + 16, BR, BB, BC, 3);
    line(ctx, BR, NY - 16, 528, NY - 16, BC, 3); line(ctx, BR, NY + 16, 528, NY + 16, BC, 3);
    hits.push({ x: 286, y: 520, r: 14, name: wet ? 'water flowing down between the vessel and the core barrel' : 'the gap between the vessel and the core barrel' },
      { x: 514, y: 520, r: 14, name: wet ? 'water flowing down between the vessel and the core barrel' : 'the gap between the vessel and the core barrel' },
      { x: BL, y: 400, r: 10, name: 'the core barrel, which keeps the water coming in apart from the water rising through the core' });

    /* fuel rods, grids, control rods and their drive housing */
    FUEL.forEach((x) => { ctx.save(); ctx.fillStyle = alpha(U, 0.85); ctx.strokeStyle = alpha(INK, 0.55); ctx.lineWidth = 1.2; ctx.fillRect(x - 6, FT, 12, FB - FT); ctx.strokeRect(x - 6, FT, 12, FB - FT); ctx.restore(); hits.push({ x, y: 580, r: 9, name: 'a fuel rod of enriched uranium oxide pellets' }); });
    [GT, GB2].forEach((y) => { ctx.save(); ctx.fillStyle = alpha(INK, 0.3); ctx.strokeStyle = alpha(INK, 0.65); ctx.lineWidth = 1.5; ctx.fillRect(BL, y - 6, BR - BL, 12); ctx.strokeRect(BL, y - 6, BR - BL, 12); ctx.restore(); hits.push({ x: AX, y, r: 10, name: 'a grid holding the fuel rods' }); });
    const tip = GT + (FB - GT) * iv, stub = 6 + 26 * (1 - iv);
    RODX.forEach((x) => { ctx.save(); ctx.fillStyle = alpha(INK, 0.82); ctx.fillRect(x - 3.5, HS.t - stub, 7, tip - HS.t + stub); ctx.restore(); hits.push({ x, y: Math.max(tip - 16, 200), r: 9, name: 'a control rod, ' + fmt(rods.v, 0) + '% in, absorbing slow neutrons' }); });
    ctx.save(); ctx.fillStyle = PAL.panel; ctx.fillRect(HS.l, HS.t, HS.r - HS.l, HS.b - HS.t); ctx.fillStyle = alpha(INK, 0.3); ctx.strokeStyle = alpha(INK, 0.7); ctx.lineWidth = 2; ctx.fillRect(HS.l, HS.t, HS.r - HS.l, HS.b - HS.t); ctx.strokeRect(HS.l, HS.t, HS.r - HS.l, HS.b - HS.t); ctx.restore();
    hits.push({ x: AX, y: 123, r: 30, name: 'the drive that raises and lowers the control rods' });

    /* the coolant */
    if (level > 0.02) {
      const col = alpha(INK, 0.6 * level);
      FLOWS.forEach((P, j) => { const n = Math.floor(P.L / 30); for (let i = 0; i < n; i++) { const s = (i * 30 + 70 * t + j * 15) % (n * 30); if (s > P.L) continue; const [x, y, a] = P.at(s); chevron(ctx, x, y, a, col); } });
      arrow(ctx, 44, NY, 112, NY, alpha(INK, 0.75 * level), 4); arrow(ctx, 690, NY, 758, NY, alpha(INK, 0.75 * level), 4);
      text(ctx, 'cooler water in', 132, 318, alpha(INK, level), { size: 20, weight: 600, align: 'center' });
      text(ctx, 'hot water out', 690, 318, alpha(INK, level), { size: 20, weight: 600, align: 'center' });
    }

    /* neutrons between the rods */
    const RATE = 24, FLY = 0.42;
    for (let j = Math.floor((t - FLY) * RATE * RMAX); j <= Math.floor(t * RATE * RMAX); j++) {
      if (j < 0) continue;
      const tj = j / (RATE * RMAX), q = (t - tj) / FLY;
      if (q < 0 || q > 1 || hash(j, 1) * RMAX > Math.min(Math.pow(kf, tj / TAU), RMAX)) continue;
      const f = Math.floor(hash(j, 2) * FUEL.length), dir = hash(j, 3) < 0.5 ? -1 : 1, pick = hash(j, 5) * 3;
      const fate = pick < kf ? 'f' : pick < kf + kr ? 'r' : 'l';
      let y0 = FT + 12 + (FB - FT - 24) * hash(j, 4), y1 = clamp(y0 + (hash(j, 6) - 0.5) * 90, FT + 8, FB - 8), x0 = FUEL[f] + dir * 7, x1;
      if (fate === 'r') {
        const rx = RODX.filter((x) => (x - FUEL[f]) * dir > 0).sort((a, b) => Math.abs(a - FUEL[f]) - Math.abs(b - FUEL[f]))[0];
        if (rx === undefined || tip <= FT + 10) continue;
        x1 = rx - dir * 4; y0 = FT + 6 + (tip - FT - 10) * hash(j, 4); y1 = FT + 6 + (tip - FT - 10) * hash(j, 6);
      } else if (fate === 'f') {
        const f2 = clamp(f + dir * (1 + Math.floor(hash(j, 7) * 3)), 0, FUEL.length - 1);
        x1 = f2 === f ? FUEL[f - dir] + dir * 7 : FUEL[f2] - dir * 7; if (f2 === f) x0 = FUEL[f] - dir * 7;
      } else x1 = x0 + dir * 110;
      const x = x0 + (x1 - x0) * q, y = y0 + (y1 - y0) * q;
      if (fate === 'l' && (x < BL + 6 || x > BR - 6)) continue;
      ctx.save(); ctx.globalAlpha *= fate === 'l' ? 1 - q * q : 1;
      disc(ctx, x, y, 5.5, N, alpha(INK, 0.5), 1);
      ctx.restore();
      if (fate === 'f' && q > 0.8) burst(ctx, x1, y1, 12, 1, E);
      hits.push({ x, y, r: 9, name: fate === 'f' ? 'a slow neutron on its way to split another nucleus' : fate === 'r' ? 'a neutron about to be absorbed by a control rod' : 'a neutron lost from the core' });
    }

    label(ctx, 'steel pressure vessel', 546, 212, { side: 'right', size: 20, gap: 100, H: H - OY });
    label(ctx, 'control rods', RODX[3] + 4, 258, { side: 'right', size: 20, gap: 172, H: H - OY });
    label(ctx, 'grid', BR, GT, { side: 'right', size: 20, gap: 146, H: H - OY });
    label(ctx, 'fuel rods', FUEL[6] + 6, 560, { side: 'right', size: 20, gap: 156, H: H - OY });
    ctx.restore();
    hits.forEach((h) => { h.y += OY; });

    /* the fission rate over ten generations */
    const GRB = { l: 1010, r: 1350, t: 220, b: 600 };
    const { X, Y } = axes(ctx, GRB, [0, NGEN], [0, RMAX], { nx: 5, ny: 3, xl: 'neutron generations', yl: 'fission rate ÷ starting rate', yc: RC });
    line(ctx, GRB.l, Y(1), GRB.r, Y(1), alpha(INK, 0.4), 2, [10, 10]);
    const gEnd = Math.min(g, NGEN), pts = [];
    for (let i = 0; i <= 120; i++) { const gi = gEnd * i / 120, p = Math.pow(kf, gi); if (p > RMAX) break; pts.push([X(gi), Y(p)]); }
    if (pts.length > 1) { ctx.save(); ctx.strokeStyle = RC; ctx.lineWidth = 5; ctx.lineJoin = 'round'; ctx.beginPath(); pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.stroke(); ctx.restore(); }
    const pv = Math.pow(kf, gEnd);
    if (pv > RMAX) pinned(ctx, GRB, X, Y, gEnd, pv, RC, fmt(pv, 1));
    else dot(ctx, X(gEnd), Y(pv), RC, true, 9);
    hits.push({ x: X(gEnd), y: Y(Math.min(pv, RMAX)), r: 14, name: 'the fission rate after ' + fmt(gEnd, 1) + ' generations: ' + (pv < 0.01 ? 'almost nothing' : fmt(pv, 2) + ' times its start') });

    ro.set('\\mk{f}{\\text{to fission}} + \\mk{r}{\\text{to control rods}} + \\mk{l}{\\text{lost}} = \\mk{fv}{' + fmt(kf, 2) + '} + \\mk{rv}{' + fmt(kr, 2) + '} + \\mk{lv}{' + fmt(kl, 2) + '} = 3\\ \\text{neutrons}', undefined,
      { form: !wet ? 'none' : crit ? 'c' : kf < 1 ? 'sub' : 'super' });
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();
};
