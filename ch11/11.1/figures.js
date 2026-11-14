/* Figures for section 11.1 The Dissolution Process. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['11.1'] = function (root, F) {
const { tex, C, PAL, alpha, ctl, cycle, register, begin, line, arrow, text, topline, label, legend } = F;
const sim = (id, H) => F.sim(root, id, H);
const TAU = 2 * Math.PI;
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;

/* =====================================================================
   FIGURE 11.3: helium and argon mixing, drawn flat as the book draws it
   so that every atom is in view: two glass bulbs joined by a short tube
   with a valve, thirty atoms of each gas. An atom travels in a straight
   line at a speed proportional to 1/√ℳ (helium √10 ≈ 3.2 times faster
   than argon) and leaves the glass at an angle drawn from the cosine law,
   which keeps a gas spread evenly through the space it can reach. No
   attraction acts between the atoms, so nothing but their wandering
   mixes them. Moving: the mixing has a time in it, so the atoms run on
   the transport; closing the valve starts again from the book's left
   panel, helium on the left and argon on the right.
   Canvas units: the valve's centre (X0, Y0), bulbs of inner radius RB
   centred OFF to either side, a tube of inner half-height HN.
===================================================================== */
(function () {
  const d = sim('sim-he-ar', 500);
  const cock = F.choice(d.controls, { label: '\\text{valve}', aria: 'the valve closed or open', options: [{ value: 'closed', label: 'closed' }, { value: 'open', label: 'open' }], value: 'open', ms: 500, onInput: (v) => { if (v === 'closed') restart(); } });
  const X0 = 700, Y0 = 285, OFF = 262, RB = 192, HN = 46, PW = 30, N = 30, DS = 2;
  const GAS = {
    He: { m: 4.00, r: 9, word: 'helium', name: 'a helium atom, He', ref: 'helium-bulb' },
    Ar: { m: 39.95, r: 13, word: 'argon', name: 'an argon atom, Ar', ref: 'argon-bulb' },
  };
  const speed = (f) => 700 * Math.sqrt(GAS.He.m / GAS[f].m);      /* units a second: 700 for He, as 1/√ℳ for Ar */
  const turn = () => (cock.value === 'open' ? cock.k : 1 - cock.k);   /* 0 closed, 1 open, eased while the plug turns */
  const open = () => cock.value === 'open' && cock.k >= 0.5;
  /* a centre keeps the atom's radius from every wall */
  const inside = (x, y, r) => (Math.abs(y) < HN - r && Math.abs(x) < OFF) || Math.hypot(x + OFF, y) < RB - r || Math.hypot(x - OFF, y) < RB - r;
  const leave = (q, nx, ny) => { const s = 2 * Math.random() - 1, c = Math.sqrt(1 - s * s); q.ux = nx * c - ny * s; q.uy = ny * c + nx * s; };
  function move(q, dist) {
    const r = GAS[q.f].r, wall = PW + r;
    for (let it = 0; it < 6 && dist > 1e-6; it++) {
      let x1 = q.x + q.ux * dist, y1 = q.y + q.uy * dist;
      /* the closed plug: a wall on either side of the valve */
      if (!open() && Math.abs(q.x) >= wall && Math.abs(x1) < wall) { const xw = Math.sign(q.x) * wall, t = (xw - q.x) / (x1 - q.x); q.x = xw + Math.sign(q.x) * 0.01; q.y += q.uy * dist * t; dist *= 1 - t; leave(q, Math.sign(q.x), 0); continue; }
      if (inside(x1, y1, r)) { q.x = x1; q.y = y1; return; }
      let a = 0, b = 1;
      for (let i = 0; i < 12; i++) { const m = (a + b) / 2; if (inside(q.x + q.ux * dist * m, q.y + q.uy * dist * m, r)) a = m; else b = m; }
      q.x += q.ux * dist * a; q.y += q.uy * dist * a; dist *= 1 - a;
      const dl = Math.hypot(q.x + OFF, q.y), dr = Math.hypot(q.x - OFF, q.y);
      if (Math.abs(q.y) > HN - r - 1 && dl > RB - r - 0.5 && dr > RB - r - 0.5) leave(q, 0, -Math.sign(q.y));
      else { const cx = dl < dr ? -OFF : OFF, rr = Math.min(dl, dr) || 1; leave(q, (cx - q.x) / rr, -q.y / rr); }
    }
  }
  const place = (side, r) => { for (;;) { const x = side * (PW + r + Math.random() * (OFF + RB - PW - 2 * r)), y = (2 * Math.random() - 1) * RB; if (inside(x, y, r)) return [x, y]; } };
  let P = [];
  function restart() {
    P = [];
    [['He', -1], ['Ar', 1]].forEach(([f, side]) => { for (let i = 0; i < N; i++) { const [x, y] = place(side, GAS[f].r), h = Math.random() * TAU; P.push({ f, x, y, ux: Math.cos(h), uy: Math.sin(h), left: 0 }); } });
    cy.reset();
  }
  function step(dt) {
    for (const q of P) { q.left += speed(q.f) * dt; while (q.left >= DS) { q.left -= DS; move(q, DS); } }
  }
  const cy = cycle(() => Infinity, 0);
  restart();
  const atom = (ctx, f, x, y) => { ctx.save(); ctx.fillStyle = F.el(f); ctx.strokeStyle = alpha(PAL.ink, 0.55); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(x, y, GAS[f].r, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore(); };
  F.hover(d.stage, () => [
    ...P.map((q) => ({ x: X0 + q.x, y: Y0 + q.y, r: 14, name: GAS[q.f].name })),
    { x: X0, y: Y0 - HN - 40, r: 44, name: 'the valve, ' + cock.value }, { x: X0, y: Y0, r: HN + 20, name: 'the valve, ' + cock.value },
    { x: X0 - OFF, y: Y0 - RB, r: 30, name: 'the bulb that first held helium' }, { x: X0 + OFF, y: Y0 - RB, r: 30, name: 'the bulb that first held argon' },
  ]);
  /* the glass: one outline round both bulbs and the tube, each bulb's wall in its referent colour */
  function glassware(ctx) {
    const RG = RB + 2, a = Math.asin((HN + 2) / RG), xl = X0 - OFF, xr = X0 + OFF, nx = RG * Math.cos(a);
    ctx.save();
    ctx.beginPath(); ctx.arc(xl, Y0, RG, a, TAU - a); ctx.arc(xr, Y0, RG, Math.PI + a, 3 * Math.PI - a); ctx.closePath();
    ctx.fillStyle = alpha(PAL.ink, 0.05); ctx.fill();
    ctx.lineWidth = 4; ctx.lineCap = 'round';
    ctx.strokeStyle = F.ref('helium-bulb'); ctx.beginPath(); ctx.arc(xl, Y0, RG, a, TAU - a); ctx.stroke();
    ctx.strokeStyle = F.ref('argon-bulb'); ctx.beginPath(); ctx.arc(xr, Y0, RG, Math.PI + a, 3 * Math.PI - a); ctx.stroke();
    ctx.restore();
    for (const sy of [-1, 1]) line(ctx, xl + nx, Y0 + sy * (HN + 2), xr - nx, Y0 + sy * (HN + 2), PAL.ink, 4);
  }
  /* the valve from the side, as the book draws it: a tapered plug through the tube, its bore in line with the tube
     when open and seen end-on when closed, and a handle on top that lies along the tube when open */
  function valve(ctx, k) {
    const top = Y0 - HN - 20, bot = Y0 + HN + 20, wt = PW + 5, wb = PW - 3;
    const body = () => { ctx.beginPath(); ctx.moveTo(X0 - wt, top); ctx.lineTo(X0 + wt, top); ctx.lineTo(X0 + wb, bot); ctx.lineTo(X0 - wb, bot); ctx.closePath(); };
    ctx.save();
    ctx.fillStyle = PAL.panel; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.roundRect(X0 - 17, bot, 34, 14, 3); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.rect(X0 - 7, top - 18, 14, 18); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(X0, top - 28, 13 + 37 * k, 12 - 2 * k, 0, 0, TAU); ctx.fill(); ctx.stroke();
    body(); ctx.fill();
    ctx.save(); body(); ctx.clip();
    ctx.fillStyle = alpha(PAL.ink, 0.05); ctx.lineWidth = 2.5;
    if (k >= 1) { ctx.fillRect(X0 - wt, Y0 - HN, 2 * wt, 2 * HN); line(ctx, X0 - wt, Y0 - HN, X0 + wt, Y0 - HN, PAL.ink, 2.5); line(ctx, X0 - wt, Y0 + HN, X0 + wt, Y0 + HN, PAL.ink, 2.5); }
    else { ctx.beginPath(); ctx.ellipse(X0, Y0, 20 + (wt + 16 - 20) * k, 20 + (HN - 20) * k, 0, 0, TAU); ctx.fill(); ctx.stroke(); }
    ctx.restore();
    body(); ctx.stroke();
    ctx.restore();
  }
  function draw() {
    const { ctx } = begin(d.c);
    const fresh = cock.value === 'closed' ? cock.k : 1;
    glassware(ctx);
    valve(ctx, turn());
    ctx.save(); ctx.globalAlpha = fresh;
    for (const q of P) atom(ctx, q.f, X0 + q.x, Y0 + q.y);
    ctx.restore();
    label(ctx, 'valve', X0, Y0 - HN - 60, { side: 'above', size: 20, gap: 22, leader: false, weight: 400 });
    /* beside each bulb, what it holds now; the sample atom beside each name is the key */
    const count = (f, right) => P.filter((q) => q.f === f && (q.x > 0) === right).length;
    [false, true].forEach((right) => {
      const x = right ? 1222 : 22;
      text(ctx, right ? 'right bulb' : 'left bulb', x, Y0 - 52, F.ref(right ? 'argon-bulb' : 'helium-bulb'), { size: 20, weight: 600 });
      ['He', 'Ar'].forEach((f, g) => {
        const y = Y0 - 6 + g * 40;
        atom(ctx, f, x + 12, y);
        text(ctx, f, x + 32, y, PAL.ink, { size: 20 });
        text(ctx, String(count(f, right)), x + 150, y, PAL.ink, { size: 22, weight: 600, align: 'right' });
      });
    });
    const he = count('He', true), ar = count('Ar', false);
    const even = (n) => Math.abs(n - N / 2) <= 4;
    topline(ctx, cock.value === 'closed'
      ? 'Valve closed: helium fills the left bulb and argon the right.'
      : even(he) && even(ar) ? 'Each gas has spread evenly through both bulbs, with no energy exchanged.'
        : he >= ar ? 'Helium, the lighter atom, crosses faster than argon.' : 'The two gases are spreading into each other\u2019s bulb.');
    const pc = (n) => Math.round((100 * n) / N) + '\\%';
    tex(d.readout, `\\text{helium in the right bulb} = \\frac{${he}}{${N}} = ${pc(he)} \\\\ \\text{argon in the left bulb} = \\frac{${ar}}{${N}} = ${pc(ar)}`, false, { values: false });
  }
  register(d.fig, { update: (dt) => { cy.step(dt, () => 1); step(Math.min(dt, 0.05)); }, draw });
})();

/* =====================================================================
   FIGURE 11.4: dissolution as three steps on an energy ladder. The book
   draws the three steps as a cycle of boxes with no energies; here each
   box stands on its energy level, so the sum of the steps is where the
   solution lands. Step 1 spreads out the solute, step 2 the solvent,
   step 3 mixes them (solvation); the dashed arrow is the direct
   formation of the solution, the sum. Still: the ladder answers its
   sliders. Energy axis fixed, −200 to 200 kJ/mol, from the slider limits
   (levels reach 0 + 100 + 100 = 200 and 0 − 200 = −200).
===================================================================== */
(function () {
  const d = sim('sim-steps', 700);
  const H1 = ctl(d.controls, { label: '\\kdH_{1}', cls: 'energy', min: 0, max: 100, step: 1, value: 60, unit: 'kJ/mol', dec: 0, aria: 'energy of step 1, spreading out the solute, in kilojoules per mole' });
  const H2 = ctl(d.controls, { label: '\\kdH_{2}', cls: 'energy', min: 0, max: 100, step: 1, value: 40, unit: 'kJ/mol', dec: 0, aria: 'energy of step 2, spreading out the solvent, in kilojoules per mole' });
  const H3 = ctl(d.controls, { label: '\\kdH_{3}', cls: 'energy', min: -200, max: 0, step: 1, value: -130, unit: 'kJ/mol', dec: 0, aria: 'energy of step 3, solvation, in kilojoules per mole', specials: [{ at: () => -(H1.v + H2.v), label: 'ideal' }] });
  let hits = []; F.hover(d.stage, () => hits);
  const BW = 118, BH = 102;                                  /* one particle box */
  /* packed: a hexagonal cluster; spread: the same particles far apart, as the book's boxes draw them */
  const PACK = {
    solute: [[0, 0], [-15, -8], [15, -8], [-15, 9], [15, 9], [0, -17], [0, 17]],
    solvent: [[-30, 30], [-10, 30], [10, 30], [30, 30], [-20, 13], [0, 13], [20, 13], [-30, -4], [-10, -4], [10, -4], [30, -4], [-20, -21], [0, -21], [20, -21], [-10, -38], [10, -38]],
  };
  const SPREAD = {
    solute: [[-30, -26], [6, -32], [32, -14], [-24, 6], [4, 0], [-30, 32], [26, 26]],
    solvent: [[-36, -34], [-12, -36], [14, -34], [38, -32], [-26, -12], [0, -14], [24, -10], [-38, 8], [-12, 10], [12, 8], [36, 12], [-26, 32], [-2, 30], [22, 32], [40, 34], [-40, 34]],
  };
  const R = { solute: 9, solvent: 8 };
  function particles(ctx, pts, kind, cx, cy, k = 1) {
    const col = F.ref(kind), rr = R[kind] * k;
    for (const [dx, dy] of pts) {
      const x = cx + dx * k, y = cy + dy * k;
      ctx.save(); ctx.fillStyle = col; ctx.strokeStyle = alpha(PAL.ink, 0.45); ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(x, y, rr, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore();
      hits.push({ x, y, r: rr + 2, name: kind === 'solute' ? 'a solute particle' : 'a solvent particle' });
    }
  }
  function frame(ctx, cx, b, w) { ctx.save(); ctx.fillStyle = PAL.panel; ctx.strokeStyle = alpha(PAL.ink, 0.55); ctx.lineWidth = 2; ctx.beginPath(); ctx.roundRect(cx - w / 2, b - BH, w, BH, 6); ctx.fill(); ctx.stroke(); ctx.restore(); }
  /* the boxes standing on the level at y, centred on x: stage 0 both packed, 1 solute spread, 2 both spread, 3 mixed */
  function scene(ctx, stage, x, y) {
    const b = y - 8, cy = b - BH / 2;
    if (stage === 3) {
      const w = 164; frame(ctx, x, b, w);
      /* the solution: the two kinds packed together, as in the book's bottom box */
      const pts = []; for (let r = 0; r < 4; r++) for (let c = 0; c < 6; c++) pts.push([-55 + c * 20 + (r % 2) * 10, -30 + r * 20]);
      const sol = new Set([1, 4, 8, 11, 13, 18, 22]);
      particles(ctx, pts.filter((_, i) => sol.has(i)), 'solute', x, cy, 1.05);
      particles(ctx, pts.filter((_, i) => !sol.has(i)), 'solvent', x, cy, 1.05);
      return;
    }
    const xa = x - BW / 2 - 4, xb = x + BW / 2 + 4;
    frame(ctx, xa, b, BW); particles(ctx, stage >= 1 ? SPREAD.solute : PACK.solute, 'solute', xa, cy, stage >= 1 ? 1.12 : 1.25);
    frame(ctx, xb, b, BW); particles(ctx, stage >= 2 ? SPREAD.solvent : PACK.solvent, 'solvent', xb, cy, stage >= 2 ? 1.12 : 0.97);
  }
  const sgn = (x) => (x > 0 ? '+' : x < 0 ? '−' : '') + Math.abs(x);
  function draw() {
    const { ctx } = begin(d.c);
    hits = [];
    const h = [H1.v, H2.v, H3.v], E = [0, h[0], h[0] + h[1], h[0] + h[1] + h[2]], s = E[3], ce = C('energy');
    const box = { l: 92, t: 236, b: 640 }, Y = (e) => box.t + ((200 - e) / 400) * (box.b - box.t);
    line(ctx, box.l, box.t - 10, box.l, box.b, PAL.muted, 2);
    for (let e = -200; e <= 200; e += 50) { line(ctx, box.l - 6, Y(e), box.l, Y(e), PAL.muted, 2); text(ctx, e < 0 ? '−' + -e : String(e), box.l - 12, Y(e), PAL.muted, { size: 17, align: 'right' }); }
    text(ctx, 'energy (kJ/mol)', 20, box.t - 44, ce, { size: 18, weight: 600 });
    line(ctx, box.l, Y(0), 1360, Y(0), alpha(PAL.ink, 0.3), 2, [10, 10]);
    const XS = [270, 550, 830, 1110], NAMES = ['solute + solvent', 'spread-out solute', 'both spread out', 'solution'];
    XS.forEach((x, i) => {
      line(ctx, x - 126, Y(E[i]), x + 126, Y(E[i]), PAL.ink, 4);
      scene(ctx, i, x, Y(E[i]));
      text(ctx, NAMES[i], x, Y(E[i]) + 20, PAL.ink, { size: 18, align: 'center' });
    });
    for (let i = 0; i < 3; i++) {
      const xa = (XS[i] + XS[i + 1]) / 2;
      line(ctx, XS[i] + 126, Y(E[i]), xa + 4, Y(E[i]), alpha(PAL.ink, 0.35), 2, [4, 8]);
      if (Math.abs(h[i]) >= 2) arrow(ctx, xa, Y(E[i]), xa, Y(E[i + 1]), ce, 4);
      /* beside the arrow, below the start level and clear of the next level's name */
      const up = i < 2, y0 = up ? Math.max(Y(E[i]) + 34, Y(E[i + 1]) + 60) : Y(E[i]) + 60, xl = up ? xa + 10 : xa - 10, al = up ? 'left' : 'right';
      text(ctx, 'step ' + (i + 1), xl, y0 - 12, PAL.ink, { size: 17, align: al, bg: PAL.panel });
      text(ctx, sgn(h[i]), xl, y0 + 12, ce, { size: 18, weight: 600, align: al, bg: PAL.panel });
    }
    const xd = 1300;
    line(ctx, XS[3] + 126, Y(s), xd + 10, Y(s), alpha(PAL.ink, 0.35), 2, [4, 8]);
    if (Math.abs(s) >= 2) { line(ctx, xd, Y(0), xd, Y(s) + (s < 0 ? -14 : 14), ce, 4, [10, 8]); arrow(ctx, xd, Y(s) + (s < 0 ? -16 : 16), xd, Y(s), ce, 4); }
    text(ctx, 'direct', xd, Y(Math.max(s, 0)) - 46, PAL.ink, { size: 17, align: 'center', bg: PAL.panel });
    text(ctx, sgn(s), xd, Y(Math.max(s, 0)) - 22, ce, { size: 18, weight: 600, align: 'center', bg: PAL.panel });
    const dot = (kind) => (c, x, y) => { c.save(); c.fillStyle = F.ref(kind); c.strokeStyle = alpha(PAL.ink, 0.45); c.lineWidth = 1.2; c.beginPath(); c.arc(x, y, R[kind] * 1.1, 0, TAU); c.fill(); c.stroke(); c.restore(); };
    legend(ctx, { l: box.l + 10, r: 420, t: 500, b: box.b + 50 }, [{ s: 'solute', draw: dot('solute') }, { s: 'solvent', draw: dot('solvent') }], { corner: 'bl' });
    const cost = h[0] + h[1], back = -h[2];
    topline(ctx, s < 0
      ? `Spreading out costs ${cost} kJ/mol and solvation returns ${back} kJ/mol: the solution forms exothermically.`
      : s > 0
        ? `Spreading out costs ${cost} kJ/mol and solvation returns only ${back} kJ/mol: the solution forms endothermically.`
        : `Solvation returns exactly the ${cost} kJ/mol spent spreading out: no energy change, as in an ideal solution.`);
    const kj = (x) => hue('energy', (x < 0 ? '(−' + -x + '\\ \\text{kJ/mol})' : x + '\\ \\text{kJ/mol}'));
    tex(d.readout, `\\kdH_{\\text{soln}} = \\kdH_{1} + \\kdH_{2} + \\kdH_{3} = ${kj(h[0])} + ${kj(h[1])} + ${kj(h[2])} = ${hue('energy', sgn(s).replace('+', '') + '\\ \\text{kJ/mol}')}`);
  }
  register(d.fig, { update: () => {}, draw });
})();
};
