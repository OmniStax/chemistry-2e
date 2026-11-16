/* Figures for section 11.1 The Dissolution Process. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['11.1'] = function (root, F) {
const { tex, C, PAL, alpha, ctl, cycle, register, begin, line, arrow, text, topline, axes, legend } = F;
const sim = (id, H) => F.sim(root, id, H);
const TAU = 2 * Math.PI;
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;

/* =====================================================================
   FIGURE 11.3: helium and argon mixing, the book's two bulbs and valve
   drawn flat so that every atom is in view, with the count of each gas
   that has reached the other bulb traced beneath. The passage's point is
   that nothing but the atoms' own motion mixes them (no attraction acts,
   no energy changes) and that the mixing goes one way: each count climbs
   to half and stays near it.
   The run is one fixed experiment, worked out once: the valve stays shut
   for T0 seconds, opens, and the gases mix until T. An atom travels in a
   straight line at a speed proportional to 1/√ℳ (helium √(39.95/4.00) =
   3.2 times faster than argon) and leaves the glass at an angle drawn
   from the cosine law, which keeps a gas spread evenly through the space
   it can reach. Every frame is a function of the transport's time, so the
   reader can scrub back to the closed valve; the random numbers come from
   a seeded generator and the arithmetic uses only + − × ÷ and √, so the
   run is the same in every browser.
   Canvas units: the valve's centre (X0, Y0), bulbs of inner radius RB
   centred OFF to either side, a tube of inner half-height HN, the plug
   PW to either side of the centre.
===================================================================== */
(function () {
  const d = sim('sim-he-ar', 798);
  const X0 = 700, Y0 = 305, OFF = 280, RB = 210, HN = 62, PW = 30, N = 30;
  const T0 = 2, T = 30, FPS = 60, FR = T * FPS + 1, VHE = 1000, DS = 2, SEED = 40;
  const GAS = {
    He: { m: 4.00, r: 11, name: 'a helium atom, He' },
    Ar: { m: 39.95, r: 16, name: 'an argon atom, Ar' },
  };
  const KIND = (i) => (i < N ? 'He' : 'Ar');                    /* atoms 0 … N − 1 are helium, the rest argon */
  /* a centre keeps the atom's radius from every wall */
  const inside = (x, y, r) => (Math.abs(y) < HN - r && Math.abs(x) < OFF) || Math.sqrt((x + OFF) * (x + OFF) + y * y) < RB - r || Math.sqrt((x - OFF) * (x - OFF) + y * y) < RB - r;
  function build() {
    let a = SEED;
    const rnd = () => { a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
    const leave = (q, nx, ny) => { const s = 2 * rnd() - 1, c = Math.sqrt(1 - s * s); q.ux = nx * c - ny * s; q.uy = ny * c + nx * s; };
    function move(q, dist, open) {
      const r = GAS[q.f].r, wall = PW + r;
      for (let it = 0; it < 6 && dist > 1e-6; it++) {
        const x1 = q.x + q.ux * dist, y1 = q.y + q.uy * dist;
        /* the closed plug: a wall on either side of the valve */
        if (!open && Math.abs(q.x) >= wall && Math.abs(x1) < wall) { const sg = Math.sign(q.x), xw = sg * wall, t = (xw - q.x) / (x1 - q.x); q.x = xw + sg * 0.01; q.y += q.uy * dist * t; dist *= 1 - t; leave(q, sg, 0); continue; }
        if (inside(x1, y1, r)) { q.x = x1; q.y = y1; return; }
        let lo = 0, hi = 1;
        for (let i = 0; i < 12; i++) { const m = (lo + hi) / 2; if (inside(q.x + q.ux * dist * m, q.y + q.uy * dist * m, r)) lo = m; else hi = m; }
        q.x += q.ux * dist * lo; q.y += q.uy * dist * lo; dist *= 1 - lo;
        const dl = Math.sqrt((q.x + OFF) * (q.x + OFF) + q.y * q.y), dr = Math.sqrt((q.x - OFF) * (q.x - OFF) + q.y * q.y);
        if (Math.abs(q.y) > HN - r - 1 && dl > RB - r - 0.5 && dr > RB - r - 0.5) leave(q, 0, -Math.sign(q.y));
        else { const cx = dl < dr ? -OFF : OFF, rr = Math.min(dl, dr) || 1; leave(q, (cx - q.x) / rr, -q.y / rr); }
      }
    }
    const P = [];
    [['He', -1], ['Ar', 1]].forEach(([f, side]) => {
      for (let i = 0; i < N; i++) {
        const r = GAS[f].r; let x, y, ux, uy, n2;
        for (;;) { x = side * (PW + r + rnd() * (OFF + RB - PW - 2 * r)); y = (2 * rnd() - 1) * RB; if (inside(x, y, r) && P.every((p) => (p.x - x) * (p.x - x) + (p.y - y) * (p.y - y) > 4.84 * r * r)) break; }
        do { ux = 2 * rnd() - 1; uy = 2 * rnd() - 1; n2 = ux * ux + uy * uy; } while (n2 > 1 || n2 < 1e-4);
        P.push({ f, x, y, ux: ux / Math.sqrt(n2), uy: uy / Math.sqrt(n2), left: 0 });
      }
    });
    const xy = new Float32Array(FR * 4 * N), he = new Uint8Array(FR), ar = new Uint8Array(FR);
    for (let k = 0; k < FR; k++) {
      P.forEach((q, i) => { xy[(k * 2 * N + i) * 2] = q.x; xy[(k * 2 * N + i) * 2 + 1] = q.y; if (q.f === 'He' ? q.x > 0 : q.x < 0) (q.f === 'He' ? he : ar)[k]++; });
      const open = k / FPS >= T0;
      for (const q of P) { q.left += VHE * Math.sqrt(GAS.He.m / GAS[q.f].m) / FPS; while (q.left >= DS) { q.left -= DS; move(q, DS, open); } }
    }
    /* from this frame on, both counts stay within 5 of half: the gases have spread through both bulbs */
    let even = FR; for (let k = FR - 1; k >= 0 && Math.abs(he[k] - N / 2) <= 5 && Math.abs(ar[k] - N / 2) <= 5; k--) even = k;
    return { xy, he, ar, even };
  }
  let RUN = null; const run = () => RUN || (RUN = build());
  const cy = cycle(() => T, 3);
  const at = (t) => {                                           /* every atom's place at time t, between two stored frames */
    const { xy } = run(), f = Math.min(FR - 1, Math.max(0, t * FPS)), k = Math.min(FR - 2, Math.floor(f)), u = f - k, out = [];
    for (let i = 0; i < 2 * N; i++) { const a = (k * 2 * N + i) * 2, b = a + 4 * N; out.push([xy[a] + (xy[b] - xy[a]) * u, xy[a + 1] + (xy[b + 1] - xy[a + 1]) * u]); }
    return out;
  };
  const atom = (ctx, f, x, y) => { ctx.save(); ctx.fillStyle = F.el(f); ctx.strokeStyle = alpha(PAL.ink, 0.55); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(x, y, GAS[f].r, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore(); };
  let hits = []; F.hover(d.stage, () => hits);
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
    const top = Y0 - HN - 20, bot = Y0 + HN + 20, wt = PW + 6, wb = PW - 4;
    const body = () => { ctx.beginPath(); ctx.moveTo(X0 - wt, top); ctx.lineTo(X0 + wt, top); ctx.lineTo(X0 + wb, bot); ctx.lineTo(X0 - wb, bot); ctx.closePath(); };
    ctx.save();
    ctx.fillStyle = PAL.panel; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.roundRect(X0 - 19, bot, 38, 15, 3); ctx.fill(); ctx.stroke();           /* the retaining nut under the plug */
    ctx.beginPath(); ctx.rect(X0 - 8, top - 20, 16, 20); ctx.fill(); ctx.stroke();               /* the stem */
    ctx.beginPath(); ctx.ellipse(X0, top - 31, 14 + 40 * k, 13 - 2 * k, 0, 0, TAU); ctx.fill(); ctx.stroke();   /* the handle */
    body(); ctx.fill();
    ctx.save(); body(); ctx.clip();
    ctx.fillStyle = alpha(PAL.ink, 0.05);
    if (k >= 1) { ctx.fillRect(X0 - wt, Y0 - HN, 2 * wt, 2 * HN); line(ctx, X0 - wt, Y0 - HN, X0 + wt, Y0 - HN, PAL.ink, 2.5); line(ctx, X0 - wt, Y0 + HN, X0 + wt, Y0 + HN, PAL.ink, 2.5); }
    else { ctx.lineWidth = 2.5; ctx.beginPath(); ctx.ellipse(X0, Y0, 22 + (wt + 16 - 22) * k, 22 + (HN - 22) * k, 0, 0, TAU); ctx.fill(); ctx.stroke(); }
    ctx.restore();
    body(); ctx.stroke();
    ctx.restore();
  }
  const G = { l: 150, r: 1250, t: 602, b: 750 };
  function draw() {
    const { ctx } = begin(d.c);
    const t = cy.now(), R = run(), k = Math.min(FR - 1, Math.floor(t * FPS)), P = at(t);
    const turn = F.ease.smooth(Math.min(1, Math.max(0, (t - T0 + 0.3) / 0.6)));     /* the plug turns as the valve opens */
    const he = R.he[k], ar = R.ar[k];
    glassware(ctx);
    valve(ctx, turn);
    P.forEach(([x, y], i) => atom(ctx, KIND(i), X0 + x, Y0 + y));
    const state = t < T0 ? 'closed' : 'open';
    text(ctx, 'valve ' + state, X0, Y0 - HN - 84, PAL.ink, { size: 20, align: 'center' });
    hits = [
      ...P.map(([x, y], i) => ({ x: X0 + x, y: Y0 + y, r: GAS[KIND(i)].r + 3, name: GAS[KIND(i)].name })),
      { x: X0, y: Y0 - HN - 40, r: 44, name: 'the valve, ' + state }, { x: X0, y: Y0 + HN + 10, r: 34, name: 'the valve, ' + state },
      { x: X0 - OFF, y: Y0 - RB, r: 30, name: 'the bulb that first held helium' }, { x: X0 + OFF, y: Y0 - RB, r: 30, name: 'the bulb that first held argon' },
    ];
    /* beside each bulb, what it holds now; the sample atom beside each symbol is the key */
    [false, true].forEach((right) => {
      const x = right ? 1216 : 20;
      text(ctx, right ? 'right bulb' : 'left bulb', x, Y0 - 54, F.ref(right ? 'argon-bulb' : 'helium-bulb'), { size: 20, weight: 600 });
      ['He', 'Ar'].forEach((f, g) => {
        const y = Y0 - 6 + g * 44, n = f === 'He' ? (right ? he : N - he) : (right ? N - ar : ar);
        atom(ctx, f, x + 16, y);
        text(ctx, f, x + 42, y, PAL.ink, { size: 20 });
        text(ctx, String(n), x + 160, y, PAL.ink, { size: 22, weight: 600, align: 'right' });
      });
    });
    /* beneath, how many atoms of each gas are in the bulb they did not start in; no time scale, since the model's seconds are not the gases' */
    const ax = axes(ctx, G, [0, T], [0, N], { nx: 0, ny: 2, yl: 'atoms in the other bulb' });
    text(ctx, 'time', G.r, G.b + 24, PAL.ink, { size: 20, weight: 600, align: 'right' });
    line(ctx, G.l, ax.Y(N / 2), G.r, ax.Y(N / 2), alpha(PAL.ink, 0.4), 2, [10, 10]);
    text(ctx, 'evenly spread', G.r + 10, ax.Y(N / 2), PAL.muted, { size: 17 });
    line(ctx, ax.X(T0), G.t, ax.X(T0), G.b, alpha(PAL.ink, 0.4), 2, [4, 8]);
    text(ctx, 'valve opens', ax.X(T0) + 10, G.t + 12, PAL.muted, { size: 17 });
    [['He', R.he], ['Ar', R.ar]].forEach(([f, c]) => {
      ctx.save(); ctx.strokeStyle = F.el(f); ctx.lineWidth = 4; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(ax.X(0), ax.Y(c[0]));
      for (let j = 1; j <= k; j++) if (c[j] !== c[j - 1] || j === k) { ctx.lineTo(ax.X(j / FPS), ax.Y(c[j - 1])); ctx.lineTo(ax.X(j / FPS), ax.Y(c[j])); }
      ctx.stroke(); ctx.restore();
    });
    atom(ctx, 'Ar', ax.X(k / FPS), ax.Y(ar)); atom(ctx, 'He', ax.X(k / FPS), ax.Y(he));
    const key = (f) => (c, x, y) => { c.save(); c.strokeStyle = F.el(f); c.lineWidth = 4; c.lineCap = 'round'; c.beginPath(); c.moveTo(x - 20, y); c.lineTo(x + 20, y); c.stroke(); c.restore(); atom(c, f, x, y); };
    legend(ctx, ax, [{ s: 'helium in the right bulb', draw: key('He') }, { s: 'argon in the left bulb', draw: key('Ar') }], { corner: 'above' });
    topline(ctx, t < T0 ? 'Valve closed: helium fills the left bulb and argon the right.'
      : k >= R.even ? 'Each gas has spread through both bulbs, twice the volume it began in, with no change in energy.'
        : 'No atom attracts another. Each wanders through the open valve on its own.');
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw, arrive: false });
})();

/* =====================================================================
   FIGURE 11.4: dissolution as three steps, with the energy of each. The
   book draws the steps as a cycle of particle boxes with no energies, so
   whether the solution ends above or below its start is left to words.
   Here the book's boxes stand in a row, one frame per state (solute and
   solvent apart, the solute expanded, the solvent expanded, the
   solution), and under each frame is the energy level of that state:
   steps 1 and 2 climb, step 3 (solvation) falls, and the arrow at the
   right is the direct formation of the solution, the sum of the three.
   Still: the ladder answers its sliders. The energies are the reader's,
   in kJ/mol; the book gives none. Energy axis fixed, −150 to 150 kJ/mol,
   from the slider limits (the levels reach 0 + 100 + 50 = 150 and
   0 − 150 = −150).
===================================================================== */
(function () {
  const d = sim('sim-steps', 700);
  const H1 = ctl(d.controls, { label: '\\text{step 1}', cls: 'energy', key: 'step-1', min: 0, max: 100, step: 1, value: 70, unit: 'kJ/mol', dec: 0, aria: 'energy of step 1, separating the solute particles, in kilojoules per mole' });
  const H2 = ctl(d.controls, { label: '\\text{step 2}', cls: 'energy', key: 'step-2', min: 0, max: 50, step: 1, value: 20, unit: 'kJ/mol', dec: 0, aria: 'energy of step 2, separating the solvent particles, in kilojoules per mole' });
  const H3 = ctl(d.controls, { label: '\\text{step 3}', cls: 'energy', key: 'step-3', min: -150, max: 0, step: 1, value: -110, unit: 'kJ/mol', dec: 0, aria: 'energy of step 3, solvation, in kilojoules per mole', specials: [{ at: () => -(H1.v + H2.v), label: 'ideal' }] });
  let hits = []; F.hover(d.stage, () => hits);
  /* the four frames, left to right; in the first three the solute's box (SW wide) stands beside the solvent's */
  const FL = 116, FW = 236, GP = 56, FT = 124, FH = 176, SW = 88, RP = 12;
  const fx = (i) => FL + i * (FW + GP);
  /* where the particles sit, about their box's centre: packed, a touching cluster; spread, the same particles apart */
  const hexRows = (rows, dx, dy) => rows.flatMap((n, j) => Array.from({ length: n }, (_, c) => [(c - (n - 1) / 2) * dx, (j - (rows.length - 1) / 2) * dy]));
  const PACK = { solute: hexRows([2, 3, 2], 24.5, 21.3), solvent: hexRows([3, 4, 5, 4], 24.5, 21.3) };
  const SPREAD = {
    solute: [[-22, -66], [20, -44], [-20, -18], [22, 4], [-20, 28], [22, 50], [-10, 70]],
    solvent: [[-50, -62], [-16, -66], [18, -60], [50, -64], [-46, -22], [-14, -26], [16, -18], [48, -24], [-50, 18], [-18, 22], [14, 18], [50, 24], [-44, 62], [-12, 66], [20, 60], [48, 66]],
  };
  const MIX = hexRows([5, 4, 5, 4, 5], 24.5, 21.3), SOLUTE_AT = new Set([1, 4, 7, 9, 13, 15, 21]);
  function particles(ctx, pts, kind, cx, cy) {
    const col = F.ref(kind);
    for (const [dx, dy] of pts) {
      ctx.save(); ctx.fillStyle = col; ctx.strokeStyle = alpha(PAL.ink, 0.5); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(cx + dx, cy + dy, RP, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore();
      hits.push({ x: cx + dx, y: cy + dy, r: RP + 2, name: kind === 'solute' ? 'a solute particle' : 'a solvent particle' });
    }
  }
  const frame = (ctx, l, w) => { ctx.save(); ctx.fillStyle = PAL.panel; ctx.strokeStyle = alpha(PAL.ink, 0.6); ctx.lineWidth = 2.5; ctx.beginPath(); ctx.roundRect(l, FT, w, FH, 8); ctx.fill(); ctx.stroke(); ctx.restore(); };
  const NAMES = ['solute and solvent apart', 'expanded solute', 'expanded solvent', 'solution'];
  function scene(ctx, i) {
    const l = fx(i), cy = FT + FH / 2;
    if (i === 3) {
      frame(ctx, l, FW);
      particles(ctx, MIX.filter((_, j) => !SOLUTE_AT.has(j)), 'solvent', l + FW / 2, cy);
      particles(ctx, MIX.filter((_, j) => SOLUTE_AT.has(j)), 'solute', l + FW / 2, cy);
    } else {
      frame(ctx, l, SW); particles(ctx, i >= 1 ? SPREAD.solute : PACK.solute, 'solute', l + SW / 2, cy);
      frame(ctx, l + SW + 8, FW - SW - 8); particles(ctx, i >= 2 ? SPREAD.solvent : PACK.solvent, 'solvent', l + SW + 8 + (FW - SW - 8) / 2, cy);
    }
    text(ctx, NAMES[i], l + FW / 2, FT + FH + 22, PAL.ink, { size: 19, align: 'center' });
    if (i < 3) arrow(ctx, l + FW + 9, cy, l + FW + GP - 9, cy, PAL.ink, 4);
  }
  const sgn = (x) => (x > 0 ? '+' : x < 0 ? '−' : '') + Math.abs(x);
  function draw() {
    const { ctx } = begin(d.c);
    hits = [];
    const h = [H1.v, H2.v, H3.v], E = [0, h[0], h[0] + h[1], h[0] + h[1] + h[2]], s = E[3], ce = C('energy');
    for (let i = 0; i < 4; i++) scene(ctx, i);
    text(ctx, 'solute', fx(0) + SW / 2, FT - 16, F.ref('solute'), { size: 19, weight: 600, align: 'center' });
    text(ctx, 'solvent', fx(0) + SW + 8 + (FW - SW - 8) / 2, FT - 16, F.ref('solvent'), { size: 19, weight: 600, align: 'center' });
    /* the ladder: one unit a kJ/mol, zero where the solute and solvent start */
    const AX = 92, YT = 372, Y = (e) => YT + 150 - e, XD = 1242;
    line(ctx, AX, YT - 10, AX, Y(-150), PAL.muted, 2);
    for (let e = -150; e <= 150; e += 50) { line(ctx, AX - 6, Y(e), AX, Y(e), PAL.muted, 2); text(ctx, e < 0 ? '−' + -e : String(e), AX - 12, Y(e), PAL.muted, { size: 17, align: 'right' }); }
    text(ctx, 'energy (kJ/mol)', 16, YT - 30, ce, { size: 19, weight: 600 });
    line(ctx, AX, Y(0), 1392, Y(0), alpha(PAL.ink, 0.35), 2, [10, 10]);
    /* each state's level runs under its frame, and a step's arrow joins the end of one level to the start of the next */
    const xa = (i) => fx(i) + FW + GP / 2;
    for (let i = 0; i < 4; i++) line(ctx, i ? xa(i - 1) : fx(0), Y(E[i]), i < 3 ? xa(i) : XD + 14, Y(E[i]), PAL.ink, 4);
    for (let i = 0; i < 3; i++) {
      const y0 = Y(E[i]), y1 = Y(E[i + 1]), L = Math.abs(y1 - y0), up = i < 2;
      if (L >= 2) arrow(ctx, xa(i), y0, xa(i), y1, ce, 5);
      /* the step's name and energy beside its arrow: left of a climb, right of the fall, clear of both levels */
      const yl = L >= 52 ? (y0 + y1) / 2 : up ? y0 - 26 : y1 + 26;
      F.rich(ctx, ['step ' + (i + 1) + '  ', [sgn(h[i]) + ' kJ/mol', ce]], xa(i) + (up ? -14 : 14), yl, { size: 19, align: up ? 'right' : 'left' });
    }
    if (Math.abs(s) >= 2) arrow(ctx, XD, Y(0), XD, Y(s), ce, 5);
    text(ctx, 'direct', XD + 16, Y(0) + (s < 0 ? -48 : 26), PAL.ink, { size: 19 });
    text(ctx, sgn(s) + ' kJ/mol', XD + 16, Y(0) + (s < 0 ? -24 : 50), ce, { size: 19, weight: 600 });
    const cost = h[0] + h[1], back = -h[2];
    topline(ctx, s < 0
      ? `Solvation returns ${back} kJ/mol, more than the ${cost} kJ/mol spent separating the particles: the solution forms exothermically.`
      : s > 0
        ? `Solvation returns ${back} kJ/mol, less than the ${cost} kJ/mol spent separating the particles: the solution forms endothermically.`
        : cost > 0
          ? `Solvation returns exactly the ${cost} kJ/mol spent separating the particles: no energy change, as in an ideal solution.`
          : 'No attractions to overcome and none to form: no energy change, as when helium and argon mix.');
    const v = (x) => hue('energy', String(Math.abs(x)));
    tex(d.readout, `\\text{step 1} + \\text{step 2} + \\text{step 3} = (${v(h[0])} + ${v(h[1])} - ${v(h[2])})\\ \\text{kJ/mol} = ${hue('energy', (s < 0 ? '-' : '') + Math.abs(s))}\\ \\text{kJ/mol}`);
  }
  register(d.fig, { update: () => {}, draw });
})();
};
