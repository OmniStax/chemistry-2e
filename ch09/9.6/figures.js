/* Figures for section 9.6 Non-Ideal Gas Behavior. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['9.6'] = function (root, F) {
const { fmt, tex, C, PAL, alpha, ctl, cycle, register, begin, line, text, topline, axes, plot, pinned, dot, arrow } = F;
const sim = (id, H) => F.sim(root, id, H);
const TAU = 2 * Math.PI;
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
   fixed: P 0 to 1000 atm, Z 0 to 2.5 (the highest curve, CH₄ at 320 K and
   1000 atm, reaches 2.23). The temperature's floor is 320 K, where the CO₂
   curve dips to 0.38 near 100 atm, as the book's does, and it opens at
   330 K, where the dip turns smoothly. Nearer the van der Waals critical
   temperature of CO₂ (303.6 K) the isotherm drops almost straight down at
   about 75 atm, which is the model and reads as a fault in the drawing.
   Still: a state is a place on the curves.
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
  Tc = ctl(d.controls, { label: '\\kT', cls: 'temperature', min: 320, max: 800, step: 5, value: 330, unit: 'K', dec: 0, aria: 'temperature in kelvin' });
  const box = { l: 150, r: 1150, t: 120, b: 480 };
  let hits = []; F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c);
    const P = Pc.v, T = Tc.v, Pe = Math.max(P, 0.5), gi = +gas.value, g = ZG[gi];
    const ax = axes(ctx, box, [0, 1000], [0, 2.5], { xl: 'P (atm)', xc: C('pressure'), yl: 'Z', yc: PAL.ink, nx: 5, ny: 5, fy: (v) => fmt(v, 1) });
    const { X, Y } = ax;
    ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.05); ctx.fillRect(box.l, Y(1), box.r - box.l, box.b - Y(1)); ctx.restore();
    plot(ctx, ax, () => 1, PAL.ink, { w: 3, dash: [10, 10] });
    text(ctx, 'ideal gas', box.r - 8, Y(1) + 16, PAL.ink, { size: 18, align: 'right' });
    ZG.forEach((q, i) => { if (i !== gi) plot(ctx, ax, (p) => zOf(q, Math.max(p, 0.5), T), F.ref(WHO[i]), { w: 3 }); });
    plot(ctx, ax, (p) => zOf(g, Math.max(p, 0.5), T), F.ref(WHO[gi]), { w: 5 });
    /* each curve is named at its right end; the names step apart where the ends crowd, each tied to its curve by a short leader */
    const ends = ZG.map((q, i) => ({ i, y: Y(zOf(q, 1000, T)) })).sort((u, v) => u.y - v.y);
    const at = ends.map((e) => e.y);
    for (let k = 0; k < 8; k++) for (let j = 1; j < at.length; j++) { const lack = 28 - (at[j] - at[j - 1]); if (lack > 0) { at[j - 1] -= lack / 2; at[j] += lack / 2; } }
    if (F.arrival(d) >= 1) ends.forEach((e, j) => {
      line(ctx, box.r + 4, e.y, box.r + 30, at[j], alpha(F.ref(WHO[e.i]), 0.7), 2);
      text(ctx, ZG[e.i].f, box.r + 38, at[j], F.ref(WHO[e.i]), { size: 20, weight: e.i === gi ? 700 : 400 });
    });
    line(ctx, X(P), box.b, X(P), box.t, alpha(C('pressure'), 0.45), 2, [4, 8]);
    hits = [];
    ZG.forEach((q, i) => {
      const z = zOf(q, Pe, T);
      if (i !== gi && z <= 2.5) dot(ctx, X(P), Y(z), F.ref(WHO[i]), true, 6);
      if (z <= 2.5) hits.push({ x: X(P), y: Y(z), r: i === gi ? 14 : 10, name: q.f + ', Z = ' + fmt(z, 2) });
    });
    hits.reverse();
    const z = zOf(g, Pe, T);
    pinned(ctx, box, X, Y, P, z, F.ref(WHO[gi]), 'Z = ' + fmt(z, 2));
    const Vm = molarVolume(g.a, g.b, Pe, T), VmS = +Vm.toPrecision(3), zS = (Pe * VmS) / (R * T);
    topline(ctx, P < 1 ? 'At a pressure near zero, every gas has Z = 1 and behaves as an ideal gas.'
      : 'At ' + fmt(P, 0) + ' atm and ' + fmt(T, 0) + ' K, Z for ' + g.f + ' is ' + fmt(zS, 2) + ', so its molar volume is ' + fmt(100 * zS, 0) + '% of an ideal gas’s.');
    tex(d.readout, P < 1 ? 'Z = \\frac{\\kP\\kVm}{R\\kT} = 1'
      : `Z = \\frac{\\kP\\kVm}{R\\kT} = \\frac{(${hue('pressure', fmt(P, 0))}\\ \\text{atm})(${hue('volume', VmS.toPrecision(3))}\\ \\text{L/mol})}{(0.08206\\ \\text{L atm/(mol K)})(${hue('temperature', fmt(T, 0))}\\ \\text{K})} = ${fmt(zS, 2)}`);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 9.36: an ideal gas and a real gas side by side, flat, in the
   4.25-L flask of Example 9.24. One particle in each box is followed to
   the right wall. The ideal particle is a point and travels at one speed.
   The real molecule has its size and is pulled by the molecules within
   reach (the book's double-headed arrows): all round in the body of the
   gas, from one side only near the wall, so it slows, strikes later and
   more softly, and is drawn back. Every other molecule is still, as in
   the book's drawing. Four molecules per mole, the same in both boxes; a
   box is as wide as its volume. Beneath, three bars from the ideal gas's
   value: the molecules' own volume, the attractions, and their sum.
   Held at constant volume the bars are pressures; held at constant
   pressure (the ideal gas's) they are volumes and the real box takes the
   van der Waals volume. Moving: the strike has a time, so a cycle.
   How far the molecule slows is a picture: the drawn loss of speed grows
   with an/(VRT), the attraction's share of the ideal pressure, on a curve
   that saturates, and the note under the readout says it is drawn large.
===================================================================== */
(function () {
  const GASES = [
    { f: 'He', word: 'helium', one: 'an atom', a: 0.0342, b: 0.0237, atoms: [['He', 0, 6.5]] },
    { f: 'N₂', word: 'nitrogen', one: 'a molecule', a: 1.39, b: 0.0391, atoms: [['N', -5.5, 7], ['N', 5.5, 7]] },
    { f: 'O₂', word: 'oxygen', one: 'a molecule', a: 1.36, b: 0.0318, atoms: [['O', -5.5, 6.5], ['O', 5.5, 6.5]] },
    { f: 'CO₂', word: 'carbon dioxide', one: 'a molecule', a: 3.59, b: 0.0427, atoms: [['C', 0, 6], ['O', -9.5, 6.5], ['O', 9.5, 6.5]] },
  ];
  GASES.forEach((q) => { q.reach = Math.max(...q.atoms.map(([, dx, r]) => Math.abs(dx) + r)); });
  /* the scene: two boxes 290 tall, 500 wide for 4.25 L; the followed particle runs along the middle line */
  const V0 = 4.25, TOP = 150, HB = 290, W0 = 500, LI = 130, LR = 770, YP = TOP + HB / 2;
  const D0 = 200, ZONE = 130, REACH = 150, VREF = 95;
  /* where the still molecules stand: five rows of nine, alternate rows set half a place over, each jittered, the middle row kept
     clear from the fourth place on (the path). The first thirteen are chosen so that the default's fourteen stand as the book's
     do, with neighbours round the path's end; the rest follow in a fixed shuffle, the three behind the path's start last. */
  const CELLS = (() => {
    let seed = 96; const rnd = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
    const first = [[7, 1], [6, 3], [8, 3], [5, 1], [3, 3], [1, 1], [7, 0], [2, 4], [0, 3], [4, 0], [6, 4], [2, 0], [8, 1]];
    const last = [[2, 2], [1, 2], [0, 2]];
    const has = (list, c, r) => list.some(([x, y]) => x === c && y === r);
    const rest = [];
    for (let c = 0; c < 9; c++) for (let r = 0; r < 5; r++) if (!(r === 2 && c >= 3) && !has(first, c, r) && !has(last, c, r)) rest.push([c, r]);
    for (let i = rest.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [rest[i], rest[j]] = [rest[j], rest[i]]; }
    return [...first, ...rest, ...last].map(([c, r]) => ({
      nx: 0.06 + (0.88 * (c + (r % 2 ? 1 : 0.5))) / 9.5 + (rnd() - 0.5) * 0.024, ny: 0.07 + (0.86 * (r + 0.5)) / 5 + (rnd() - 0.5) * (r === 2 ? 0.03 : 0.07), th: (rnd() - 0.5) * 1.7,
    }));
  })();

  const d = sim('sim-real-boxes', 750);
  let cy = null;
  const again = () => { if (cy) cy.reset(); };
  const held = F.choice(d.controls, { label: '\\text{held constant}', aria: 'the quantity held constant', options: [{ value: 'V', label: 'volume' }, { value: 'P', label: 'pressure' }], value: 'V', ms: 0, onInput: again });
  const gas = F.choice(d.controls, { label: '\\text{gas}', aria: 'the gas in both boxes', options: GASES.map((g, i) => ({ value: String(i), label: g.f })), value: '3', ms: 0, onInput: again });
  const Nc = ctl(d.controls, { label: '\\kn', cls: 'amount', min: 0.5, max: 10, step: 0.01, value: 3.46, unit: 'mol', dec: 2, aria: 'amount of gas in moles', onInput: again });
  const Tc = ctl(d.controls, { label: '\\kT', cls: 'temperature', min: 310, max: 600, step: 1, value: 502, unit: 'K', dec: 0, aria: 'temperature in kelvin', onInput: again });

  function state() {
    const q = GASES[+gas.value], n = Nc.v, T = Tc.v, nRT = n * R * T, Pi = nRT / V0, atP = held.value === 'P';
    const rep = nRT / (V0 - n * q.b), att = (n * n * q.a) / (V0 * V0);
    const Vr = atP ? n * molarVolume(q.a, q.b, Pi, T) : V0, attP = (n * n * q.a) / (Vr * Vr);
    /* the drawn loss of speed at the wall, from the attraction's share of the ideal pressure, an/(VRT) */
    const share = (q.a * n) / (Vr * R * T), keep = 1 - 0.75 * (1 - Math.exp(-share / 0.11));
    return { q, n, T, nRT, Pi, rep, att, Pr: rep - att, Vr, attP, atP, keep, v0: VREF * Math.sqrt(T / 502), N: Math.max(2, Math.round(4 * n)), WR: (W0 * Vr) / V0 };
  }
  /* the followed particle sets out D0 from the wall. The real molecule slows inside ZONE of the wall and speeds up again as it
     leaves; the ideal particle keeps one speed. `strike` is when it reaches the wall and how fast; `at` is where it is at time t. */
  const DT = 1 / 240;
  function strike(real, s) {
    const c = real ? s.q.reach : 4;
    const speed = (x) => { if (!real) return s.v0; const h = Math.max(0, Math.min(1, 1 - (x - c) / ZONE)); return s.v0 * Math.sqrt(1 - (1 - s.keep * s.keep) * h * h); };
    let x = D0, hit = 0;
    while (x > c && hit < 30) { x -= speed(x) * DT; hit += DT; }
    return { c, speed, hit, vHit: speed(c) };
  }
  function at(real, s, t) {
    const k = strike(real, s); let x = D0, dir = -1;
    for (let time = 0; time < t; time += DT) { if (dir < 0) { x -= k.speed(x) * DT; if (x <= k.c) { x = k.c; dir = 1; } } else x += k.speed(x) * DT; }
    return { c: k.c, hit: k.hit, vHit: k.vHit, x, v: k.speed(x), dir, struck: t >= k.hit };
  }
  const period = () => { const s = state(); return Math.max(strike(false, s).hit, strike(true, s).hit) + 1.5; };
  cy = cycle(period, 1.2);

  let hits = [], said = false; F.hover(d.stage, () => hits);
  const ro = F.readout(d);
  const disc = (ctx, x, y, r, fill) => { ctx.save(); ctx.fillStyle = fill; ctx.strokeStyle = alpha(PAL.ink, 0.55); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore(); };
  const molecule = (ctx, q, x, y, th) => q.atoms.forEach(([elm, dx, r]) => disc(ctx, x + dx * Math.cos(th), y + dx * Math.sin(th), r, F.el(elm)));
  /* how far a molecule lying at angle th reaches from its centre along the direction (ux, uy) */
  const extent = (q, th, ux, uy) => Math.max(...q.atoms.map(([, dx, r]) => Math.abs(dx * (Math.cos(th) * ux + Math.sin(th) * uy)) + r));
  /* the book's double-headed arrow, with heads small enough for a short one */
  const both = (ctx, x1, y1, x2, y2, color, w) => {
    const L = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / L, uy = (y2 - y1) / L, hl = Math.min(11, L / 3), hw = hl * 0.45;
    ctx.save(); ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = w;
    ctx.beginPath(); ctx.moveTo(x1 + ux * hl * 0.7, y1 + uy * hl * 0.7); ctx.lineTo(x2 - ux * hl * 0.7, y2 - uy * hl * 0.7); ctx.stroke();
    [[x1, y1, 1], [x2, y2, -1]].forEach(([x, y, k]) => { ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + k * ux * hl - uy * hw, y + k * uy * hl + ux * hw); ctx.lineTo(x + k * ux * hl + uy * hw, y + k * uy * hl - ux * hw); ctx.closePath(); ctx.fill(); });
    ctx.restore();
  };
  const arcs = (ctx, x, y, k, color) => { ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = 4; ctx.lineCap = 'round'; [16, 28, 40].forEach((r) => { ctx.beginPath(); ctx.arc(x, y, r * k, -0.85, 0.85); ctx.stroke(); }); ctx.restore(); };

  function draw() {
    const { ctx } = begin(d.c);
    const s = state(), q = s.q, t = cy.now(), cp = C('pressure'), cv = C('volume'), cu = C('velocity'), cq = s.atP ? cv : cp;
    const who = { ideal: F.ref('ideal-gas'), real: F.ref('real-gas') }, name = q.one + ' of ' + q.word + ', ' + q.f;
    topline(ctx, s.atP
      ? 'At ' + sig3(s.Pi) + ' atm and ' + fmt(s.T, 0) + ' K, ' + fmt(s.n, 2) + ' mol of ' + q.f + ' fills ' + fmt(s.Vr, 2) + ' L; an ideal gas would fill 4.25 L.'
      : 'At ' + fmt(s.T, 0) + ' K, ' + fmt(s.n, 2) + ' mol of ' + q.f + ' in 4.25 L exerts ' + sig3(s.Pr) + ' atm; an ideal gas would exert ' + sig3(s.Pi) + ' atm.');
    hits = [];
    const late = [];
    [{ id: 'ideal', L: LI, W: W0, real: false }, { id: 'real', L: LR, W: s.WR, real: true }].forEach((b) => {
      const col = who[b.id], wall = b.L + b.W, m = at(b.real, s, t), fx = wall - m.x;
      F.rich(ctx, [[b.real ? 'real gas' : 'ideal gas', col, 700], s.atP ? '   V = ' : '   P = ',
        [s.atP ? (b.real ? fmt(s.Vr, 2) : '4.25') + ' L' : sig3(b.real ? s.Pr : s.Pi) + ' atm', cq]], b.L, 124, { size: 22 });
      ctx.save(); ctx.fillStyle = alpha(col, 0.07); ctx.fillRect(b.L, TOP, b.W, HB); ctx.strokeStyle = col; ctx.lineWidth = 5; ctx.strokeRect(b.L, TOP, b.W, HB); ctx.restore();
      /* in a box squeezed narrower than 4.25 L the molecules stand more upright, so that neighbours in a row do not overlap */
      const up = Math.max(0, Math.min(1, (1 - b.W / W0) / 0.3));
      const still = CELLS.slice(0, s.N - 1).map((c) => ({ x: b.L + c.nx * b.W, y: TOP + c.ny * HB, th: c.th * (1 - up) + Math.sign(c.th) * 1.2 * up }));
      still.forEach((p) => {
        if (b.real) { molecule(ctx, q, p.x, p.y, p.th); hits.push({ x: p.x, y: p.y, r: q.reach, name }); }
        else { dot(ctx, p.x, p.y, PAL.ink, true, 4); hits.push({ x: p.x, y: p.y, r: 10, name: 'a particle of the ideal gas, with no size and no attractions' }); }
      });
      /* the attractions on the followed molecule: a double-headed arrow to each molecule within reach, fainter with distance and with a smaller a */
      if (b.real) still.map((p) => ({ p, r: Math.hypot(p.x - fx, p.y - YP) })).filter((o) => o.r < REACH).sort((u, v) => u.r - v.r).slice(0, 6).forEach(({ p, r }) => {
        const ux = (p.x - fx) / r, uy = (p.y - YP) / r, a0 = extent(q, 0, ux, uy) + 5, a1 = r - extent(q, p.th, ux, uy) - 5;
        const k = (0.3 + 0.6 * Math.min(1, 1.8 * (1 - r / REACH))) * Math.min(1, Math.sqrt(q.a / 1.36));
        if (a1 - a0 < 12 || k < 0.1) return;
        ctx.save(); ctx.globalAlpha = k; both(ctx, fx + ux * a0, YP + uy * a0, fx + ux * a1, YP + uy * a1, PAL.ink, 2); ctx.restore();
        late.push({ x: fx + ux * (a0 + a1) / 2, y: YP + uy * (a0 + a1) / 2, r: 12, name: 'the attraction between two molecules' });
      });
      /* the push of the strike on the wall, as large as the speed at the wall */
      if (m.struck) { arcs(ctx, wall + 6, YP, m.vHit / (VREF * Math.sqrt(600 / 502)), alpha(cp, Math.max(0.7, 1 - (t - m.hit)))); late.push({ x: wall + 22, y: YP, r: 30, name: 'the push of this collision on the wall' }); }
      /* the velocity, behind the particle and as long as its speed; after the strike it is drawn once it fits between the particle and the wall */
      const len = (80 * m.v) / VREF, gap = m.c + 10;
      if (m.dir < 0) { arrow(ctx, fx - gap - len, YP, fx - gap, YP, cu, 4); late.push({ x: fx - gap - len / 2, y: YP, r: 12, name: 'the velocity of the ' + (b.real ? 'molecule' : 'particle') }); }
      else if (fx + gap + len < wall - 8) { arrow(ctx, fx + gap + len, YP, fx + gap, YP, cu, 4); late.push({ x: fx + gap + len / 2, y: YP, r: 12, name: 'the velocity of the ' + (b.real ? 'molecule' : 'particle') }); }
      if (b.real) molecule(ctx, q, fx, YP, 0); else dot(ctx, fx, YP, PAL.ink, true, 4);
      ctx.save(); ctx.strokeStyle = alpha(PAL.ink, 0.45); ctx.lineWidth = 2; ctx.setLineDash([4, 5]); ctx.beginPath(); ctx.arc(fx, YP, m.c + 8, 0, TAU); ctx.stroke(); ctx.restore();
      hits.unshift({ x: fx, y: YP, r: m.c + 8, name: (b.real ? name : 'a particle of the ideal gas') + ', followed to the wall' });
    });
    hits = [...late, ...hits];
    F.legend(ctx, { l: LI, r: LR + W0, t: TOP, b: TOP + HB }, [
      { s: 'attraction between molecules', draw: (c, x, y) => both(c, x - 20, y, x + 20, y, PAL.ink, 2) },
      { s: 'velocity', draw: (c, x, y) => arrow(c, x - 20, y, x + 20, y, cu, 4) },
      { s: 'push on the wall', draw: (c, x, y) => arcs(c, x - 14, y, 0.5, cp) },
    ], { corner: 'below' });

    /* the bars: what each correction adds to the ideal gas's value. Axes fixed at −20 to +15 atm (the largest are +12.9 and −19.9 atm,
       for 10 mol of CO₂) and −2.0 to +0.5 L (+0.43 and −1.75 L). */
    const lo = s.atP ? -2 : -20, hi = s.atP ? 0.5 : 15, stepT = s.atP ? 0.5 : 5, unit = s.atP ? ' L' : ' atm', dec = s.atP ? 3 : 2;
    const X = (v) => 470 + ((v - lo) / (hi - lo)) * 800, round = (v) => +v.toFixed(dec);
    const size = round(s.atP ? s.n * q.b : s.rep - s.Pi), pull = -round(s.atP ? V0 - s.nRT / (s.Pi + s.attP) : s.att), net = round(size + pull);
    const signed = (v) => (v < 0 ? '−' : '+') + fmt(Math.abs(v), dec) + unit;
    const rows = [
      { y: 552, v: size, parts: ['the molecules’ own volume'], a: 0.5 },
      { y: 596, v: pull, parts: ['the attractions between them'], a: 0.5 },
      { y: 640, v: net, parts: [['real gas', who.real, 700], ', both together'], a: 0.95 },
    ];
    rows.forEach((r) => {
      F.rich(ctx, r.parts, 440, r.y, { size: 20, align: 'right' });
      ctx.save(); ctx.fillStyle = alpha(cq, r.a); ctx.fillRect(Math.min(X(0), X(r.v)), r.y - 14, Math.abs(X(r.v) - X(0)), 28); ctx.restore();
      text(ctx, signed(r.v), X(0) + (r.v < 0 ? 12 : -12), r.y, cq, { size: 20, weight: 600, align: r.v < 0 ? 'left' : 'right' });
    });
    line(ctx, X(0), 526, X(0), 670, PAL.ink, 2);
    text(ctx, 'ideal gas', X(0), 512, who.ideal, { size: 20, weight: 700, align: 'center' });
    line(ctx, X(lo), 670, X(hi), 670, PAL.muted, 2);
    for (let v = lo; v <= hi + 1e-9; v += stepT) { line(ctx, X(v), 662, X(v), 678, PAL.muted, 2); text(ctx, fmt(v, s.atP ? 1 : 0), X(v), 698, PAL.muted, { size: 17, align: 'center' }); }
    text(ctx, (s.atP ? 'volume' : 'pressure') + ' above or below the ideal gas’s (' + unit.trim() + ')', X(hi), 730, PAL.ink, { size: 20, align: 'right' });

    const n = hue('amount', fmt(s.n, 2)), T = hue('temperature', fmt(s.T, 0)), a = String(q.a), b = hue('volume', String(q.b)), Rg = '(0.08206\\ \\text{L atm/(mol K)})';
    if (!said) { ro.note.textContent = 'The molecule’s slowing is drawn larger than it is.'; said = true; }
    if (!s.atP) {
      const rep = +s.rep.toFixed(2), att = +s.att.toFixed(2), V = hue('volume', '4.25');
      tex(ro.formula, `\\kP = \\frac{\\kn R\\kT}{\\kV-\\kn\\kbvdw}-\\frac{\\kn^{2}a}{\\kV^{2}} \\\\ `
        + `= \\frac{(${n}\\ \\text{mol})${Rg}(${T}\\ \\text{K})}{${V}\\ \\text{L}-(${n}\\ \\text{mol})(${b}\\ \\text{L/mol})}-\\frac{(${n}\\ \\text{mol})^{2}(${a}\\ \\text{L}^{2}\\ \\text{atm/mol}^{2})}{(${V}\\ \\text{L})^{2}} \\\\ `
        + `= ${fmt(rep, 2)}\\ \\text{atm}-${fmt(att, 2)}\\ \\text{atm} = ${hue('pressure', sig3(rep - att))}\\ \\text{atm}`);
    } else {
      tex(ro.formula, `\\left(\\kP+\\frac{\\kn^{2}a}{\\kV^{2}}\\right)(\\kV-\\kn\\kbvdw) = \\kn R\\kT \\\\ `
        + `(${hue('pressure', fmt(s.Pi, 2))}\\ \\text{atm}+${fmt(s.attP, 2)}\\ \\text{atm})(${hue('volume', fmt(s.Vr, 3))}\\ \\text{L}-${fmt(s.n * q.b, 3)}\\ \\text{L}) \\\\ `
        + `= (${n}\\ \\text{mol})${Rg}(${T}\\ \\text{K}) \\\\ `
        + `= ${fmt(s.nRT, 1)}\\ \\text{L atm}`);
    }
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();
};
