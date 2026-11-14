/* Figures for section 9.4 Effusion and Diffusion of Gases. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['9.4'] = function (root, F) {
const { fmt, tex, C, PAL, alpha, cycle, register, begin, line, arrow, text, topline, label } = F;
const sim = (id, H) => F.sim(root, id, H);
const TAU = 2 * Math.PI;
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;

/* the gases, each molecule as [element, dx, dy, radius] along its heading, the scale it is drawn at (no molecule
   reaches more than 14 units from its centre), and the molar mass the book uses for it */
const MOLS = {
  'H₂': { m: 2.0, k: 1, word: 'hydrogen', atoms: [['H', -5, 0, 5], ['H', 5, 0, 5]] },
  'O₂': { m: 32.0, k: 1, word: 'oxygen', atoms: [['O', -6, 0, 7], ['O', 6, 0, 7]] },
  'Ne': { m: 20.2, k: 1, word: 'neon', atoms: [['Ne', 0, 0, 7]] },
  'Xe': { m: 131.3, k: 1, word: 'xenon', atoms: [['Xe', 0, 0, 11]] },
  'CH₄': { m: 16.0, k: 0.7, word: 'methane', atoms: [['H', -9, -8, 5], ['H', 9, -8, 5], ['H', -9, 8, 5], ['H', 9, 8, 5], ['C', 0, 0, 8]] },
  'CO₂': { m: 44.0, k: 0.7, word: 'carbon dioxide', atoms: [['O', -13, 0, 7], ['O', 13, 0, 7], ['C', 0, 0, 6.5]] },
};
const TEXF = { 'H₂': '\\text{H}_2', 'O₂': '\\text{O}_2', 'Ne': '\\text{Ne}', 'Xe': '\\text{Xe}', 'CH₄': '\\text{CH}_4', 'CO₂': '\\text{CO}_2' };
const molName = (f) => (MOLS[f].atoms.length === 1 ? 'an atom of ' + MOLS[f].word + ', ' + f : 'a molecule of ' + MOLS[f].word + ', ' + f);

/* =====================================================================
   FIGURE 9.27 + 9.28: two glass bulbs joined by a tube with a stopcock,
   drawn flat so that every molecule is in view. A molecule travels in a
   straight line at a speed proportional to 1/√ℳ and leaves the glass at
   an angle drawn from the cosine law, which keeps a gas spread evenly
   through the space it can reach. It moves in steps of one fixed length,
   so the two gases follow paths of the same kind and differ only in how
   fast they run along them: the heavier gas does what the lighter does,
   √(ℳ heavy/ℳ light) times later, and the passes through the opening
   come to the ratio the readout gives. Diffusion starts with one gas in
   each bulb; effusion starts with both in the left bulb, the right bulb
   evacuated and a plate with a pinhole seated against the stopcock.
   Moving: the lag of the heavier gas is the idea, so the molecules run
   on the transport with no scrubber. Closing the stopcock starts again
   from the separated state, as do the other two choices.
===================================================================== */
(function () {
  const d = sim('sim-bulbs', 550);
  const PAIRS = [['H₂', 'O₂'], ['Ne', 'Xe'], ['CH₄', 'CO₂']];
  const mode = F.choice(d.controls, { label: '\\text{process}', aria: 'diffusion or effusion', options: [{ value: 'diff', label: 'diffusion' }, { value: 'eff', label: 'effusion' }], value: 'diff', ms: 500, onInput: restart });
  const cock = F.choice(d.controls, { label: '\\text{stopcock}', aria: 'the stopcock closed or open', options: [{ value: 'closed', label: 'closed' }, { value: 'open', label: 'open' }], value: 'closed', ms: 500, onInput: (v) => { if (v === 'closed') restart(); } });
  const pair = F.select(d.controls, { label: '\\text{gases}', aria: 'the two gases', options: PAIRS.map((p, i) => ({ value: String(i), label: p[0] + ' and ' + p[1] })), value: '0', ms: 500, onInput: restart });
  /* the glass, about the stopcock's centre (X0, Y0): bulbs of inner radius RB centred OFF to either side, a neck of
     inner half-height HN, the stopcock's plug PW to either side, the pinhole plate at XP with a hole G to either side of
     the axis for a molecule's centre; a centre keeps RM from every wall */
  const X0 = 700, Y0 = 320, OFF = 262, RB = 205, HN = 40, RM = 14, PW = 30, XP = -36, G = 7, HOLE = 14, N = 40, DS = 2;
  const RI = RB - RM, HI = HN - RM;
  const speed = (f) => 800 * Math.sqrt(MOLS['H₂'].m / MOLS[f].m);   /* units a second: 800 for H₂, as 1/√ℳ for the rest */
  const gases = () => PAIRS[+pair.value];
  const eff = () => mode.value === 'eff';
  const turn = () => (cock.value === 'open' ? cock.k : 1 - cock.k);   /* 0 closed, 1 open, eased while the plug turns */
  const open = () => cock.value === 'open' && cock.k >= 0.5;
  const divide = () => (eff() ? XP : 0);                              /* the plane a pass is counted at */
  const inside = (x, y) => (Math.abs(y) < HI && Math.abs(x) < OFF) || Math.hypot(x + OFF, y) < RI || Math.hypot(x - OFF, y) < RI;
  /* the walls across the neck: the plug's two faces while it is closed, and the plate's two faces, open only on the hole */
  const walls = () => [
    ...(open() ? [] : [{ x: -(PW + RM), dir: 1 }, { x: PW + RM, dir: -1 }]),
    ...(eff() ? [{ x: XP - RM, dir: 1, hole: true }, { x: XP + RM, dir: -1, hole: true }] : []),
  ];
  const leave = (q, nx, ny) => { const s = 2 * Math.random() - 1, c = Math.sqrt(1 - s * s); q.ux = nx * c - ny * s; q.uy = ny * c + nx * s; };
  function move(q, dist, W) {
    for (let it = 0; it < 6 && dist > 1e-6; it++) {
      const x1 = q.x + q.ux * dist;
      let t = 1, hit = null;
      for (const w of W) {
        if (q.ux * w.dir <= 0 || (q.x - w.x) * w.dir >= 0 || (x1 - w.x) * w.dir < 0) continue;
        if (w.hole && Math.abs(q.y + (XP - q.x) * q.uy / q.ux) < G) continue;
        const tw = (w.x - q.x) / (x1 - q.x); if (tw < t) { t = tw; hit = w; }
      }
      const ex = q.x + q.ux * dist * t, ey = q.y + q.uy * dist * t;
      if (inside(ex, ey)) {
        if (!hit) { q.x = ex; q.y = ey; return; }
        q.x = ex - hit.dir * 0.01; q.y = ey; dist *= 1 - t; leave(q, -hit.dir, 0); continue;
      }
      let a = 0, b = t;
      for (let i = 0; i < 12; i++) { const m = (a + b) / 2; if (inside(q.x + q.ux * dist * m, q.y + q.uy * dist * m)) a = m; else b = m; }
      q.x += q.ux * dist * a; q.y += q.uy * dist * a; dist *= 1 - a;
      const dl = Math.hypot(q.x + OFF, q.y), dr = Math.hypot(q.x - OFF, q.y);
      if (Math.abs(q.y) > HI - 1 && dl > RI - 0.5 && dr > RI - 0.5) leave(q, 0, -Math.sign(q.y));
      else { const cx = dl < dr ? -OFF : OFF, r = Math.min(dl, dr) || 1; leave(q, (cx - q.x) / r, -q.y / r); }
    }
  }
  /* a place anywhere the gas reaches on its side of the closed stopcock, the tube up to the plug included */
  const place = (side) => {
    const edge = side < 0 && eff() ? RM - XP : PW + RM;
    for (;;) { const x = side * (edge + Math.random() * (OFF + RI - edge)), y = (2 * Math.random() - 1) * RI; if (inside(x, y)) return [x, y]; }
  };
  let P = [], passes = [0, 0];
  function restart() {
    P = []; passes = [0, 0];
    gases().forEach((f, g) => {
      for (let i = 0; i < N; i++) { const [x, y] = place(eff() || g === 0 ? -1 : 1), h = Math.random() * TAU; P.push({ f, g, x, y, ux: Math.cos(h), uy: Math.sin(h), left: 0 }); }
    });
    cy.reset();
  }
  function step(dt) {
    const W = walls(), dv = divide();
    for (const q of P) {
      q.left += speed(q.f) * dt;
      while (q.left >= DS) { q.left -= DS; const was = q.x > dv; move(q, DS, W); if ((q.x > dv) !== was) passes[q.g]++; }
    }
  }
  const cy = cycle(() => Infinity, 0);
  restart();
  const REF = ['lighter-gas', 'heavier-gas'];
  const molecule = (ctx, f, x, y, a) => {
    const { atoms, k } = MOLS[f], c = Math.cos(a), s = Math.sin(a);
    ctx.save(); ctx.strokeStyle = alpha(PAL.ink, 0.6); ctx.lineWidth = 1.5;
    atoms.forEach(([elm, dx, dy, r]) => { ctx.fillStyle = F.el(elm); ctx.beginPath(); ctx.arc(x + (dx * c - dy * s) * k, y + (dx * s + dy * c) * k, r * k, 0, TAU); ctx.fill(); ctx.stroke(); });
    ctx.restore();
  };
  F.hover(d.stage, () => [
    ...P.map((q) => ({ x: X0 + q.x, y: Y0 + q.y, r: 15, name: molName(q.f) })),
    ...(eff() ? [{ x: X0 + XP, y: Y0, r: 16, name: 'the pinhole' }, { x: X0 + XP, y: Y0 - 28, r: 13, name: 'a plate with a pinhole' }, { x: X0 + XP, y: Y0 + 28, r: 13, name: 'a plate with a pinhole' }] : []),
    { x: X0, y: Y0 - HN - 40, r: 50, name: 'the stopcock, ' + cock.value }, { x: X0, y: Y0, r: HN + 26, name: 'the stopcock, ' + cock.value },
  ]);
  /* the glass: one outline round both bulbs and the neck, each bulb's wall in its referent colour */
  function glassware(ctx) {
    const RG = RB + 2, a = Math.asin((HN + 2) / RG), xl = X0 - OFF, xr = X0 + OFF, nx = RG * Math.cos(a);
    ctx.save();
    ctx.beginPath(); ctx.arc(xl, Y0, RG, a, TAU - a); ctx.arc(xr, Y0, RG, Math.PI + a, 3 * Math.PI - a); ctx.closePath();
    ctx.fillStyle = alpha(PAL.ink, 0.05); ctx.fill();
    ctx.lineWidth = 4; ctx.lineCap = 'round';
    ctx.strokeStyle = F.ref('left-bulb'); ctx.beginPath(); ctx.arc(xl, Y0, RG, a, TAU - a); ctx.stroke();
    ctx.strokeStyle = F.ref('right-bulb'); ctx.beginPath(); ctx.arc(xr, Y0, RG, Math.PI + a, 3 * Math.PI - a); ctx.stroke();
    ctx.restore();
    for (const sy of [-1, 1]) line(ctx, xl + nx, Y0 + sy * (HN + 2), xr - nx, Y0 + sy * (HN + 2), PAL.ink, 4);
  }
  /* the stopcock from the side, as the book draws it: a tapered plug through the tube, its bore in line with the tube
     when open and seen end-on when closed, and a handle on top that lies along the tube when open */
  function stopcock(ctx, k) {
    const top = Y0 - HN - 20, bot = Y0 + HN + 20, wt = PW + 5, wb = PW - 3;
    const body = () => { ctx.beginPath(); ctx.moveTo(X0 - wt, top); ctx.lineTo(X0 + wt, top); ctx.lineTo(X0 + wb, bot); ctx.lineTo(X0 - wb, bot); ctx.closePath(); };
    ctx.save();
    ctx.fillStyle = PAL.panel; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.roundRect(X0 - 17, bot, 34, 14, 3); ctx.fill(); ctx.stroke();           /* the retaining nut under the plug */
    ctx.beginPath(); ctx.rect(X0 - 7, top - 18, 14, 18); ctx.fill(); ctx.stroke();               /* the stem */
    ctx.beginPath(); ctx.ellipse(X0, top - 28, 13 + 37 * k, 12 - 2 * k, 0, 0, TAU); ctx.fill(); ctx.stroke();   /* the handle */
    body(); ctx.fill();
    ctx.save(); body(); ctx.clip();
    ctx.fillStyle = alpha(PAL.ink, 0.05); ctx.lineWidth = 2.5;
    if (k >= 1) { ctx.fillRect(X0 - wt, Y0 - HN, 2 * wt, 2 * HN); line(ctx, X0 - wt, Y0 - HN, X0 + wt, Y0 - HN, PAL.ink, 2.5); line(ctx, X0 - wt, Y0 + HN, X0 + wt, Y0 + HN, PAL.ink, 2.5); }
    else { ctx.beginPath(); ctx.ellipse(X0, Y0, 22 + (wt + 16 - 22) * k, 22 + (HN - 22) * k, 0, 0, TAU); ctx.fill(); ctx.stroke(); }
    ctx.restore();
    body(); ctx.stroke();
    ctx.restore();
  }
  function plate(ctx) {
    ctx.save(); ctx.fillStyle = PAL.ink;
    ctx.fillRect(X0 + XP - 2.5, Y0 - HN, 5, HN - HOLE); ctx.fillRect(X0 + XP - 2.5, Y0 + HOLE, 5, HN - HOLE);
    ctx.restore();
  }
  let shown = '';
  function draw() {
    const { ctx } = begin(d.c), [a, b] = gases(), dv = divide();
    const fresh = Math.min(mode.k, pair.k, cock.value === 'closed' ? cock.k : 1);   /* a new filling fades in */
    glassware(ctx);
    stopcock(ctx, turn());
    if (eff()) plate(ctx);
    ctx.save(); ctx.globalAlpha = fresh;
    for (const q of P) molecule(ctx, q.f, X0 + q.x, Y0 + q.y, Math.atan2(q.uy, q.ux));
    ctx.restore();
    label(ctx, 'stopcock', X0, Y0 - HN - 62, { side: 'above', size: 20, color: PAL.ink, gap: 24, leader: false });
    if (eff()) label(ctx, 'pinhole', X0 + XP, Y0 + HN + 6, { side: 'below', size: 20, color: PAL.ink, gap: 62 });
    /* beside each bulb, what is in it now; the sample molecule beside each formula is the key */
    const count = (g, right) => P.filter((q) => q.g === g && (q.x > dv) === right).length;
    [false, true].forEach((right) => {
      const x = right ? 1196 : 36;
      text(ctx, right ? 'right bulb' : 'left bulb', x, Y0 - 48, F.ref(right ? 'right-bulb' : 'left-bulb'), { size: 20, weight: 600 });
      [a, b].forEach((f, g) => {
        const y = Y0 + g * 42;
        molecule(ctx, f, x + 16, y, 0);
        text(ctx, f, x + 40, y, PAL.ink, { size: 20 });
        text(ctx, String(count(g, right)), x + 168, y, F.ref(REF[g]), { size: 22, weight: 600, align: 'right' });
      });
    });
    const [na, nb] = passes;
    F.rich(ctx, ['Passes through the ' + (eff() ? 'pinhole' : 'stopcock') + ' so far: ' + a + ' ', [String(na), F.ref(REF[0])], ', ' + b + ' ', [String(nb), F.ref(REF[1])], nb > 0 ? ' (ratio ' + fmt(na / nb, 1) + ')' : ''], 700, 46, { size: 24, align: 'center' });
    const key = mode.value + pair.value; if (key === shown) return; shown = key;
    const MA = MOLS[a].m, MB = MOLS[b].m, mm = (x) => hue('mass', fmt(x, 1) + '\\ \\text{g/mol}'), word = eff() ? 'effusion' : 'diffusion';
    tex(d.readout, `\\frac{\\text{rate of ${word} of }${TEXF[a]}}{\\text{rate of ${word} of }${TEXF[b]}} = \\frac{\\sqrt{\\kMM_{${TEXF[b]}}}}{\\sqrt{\\kMM_{${TEXF[a]}}}} \\\\ = \\frac{\\sqrt{${mm(MB)}}}{\\sqrt{${mm(MA)}}} = ${fmt(Math.sqrt(MB / MA), 2)}`, undefined, { values: false });
  }
  register(d.fig, { update: (dt) => { cy.step(dt, () => 1); step(dt); }, draw });
})();

/* =====================================================================
   FIGURE 9.30: a gaseous diffuser. UF₆ flows in along the feed tube and
   on through the porous barrier tube. A molecule that passes through the
   barrier wanders the outer chamber in straight runs and leaves by the
   outlet low on the far end wall, the enriched stream; one that does not
   is carried on along the tube to the depleted outlet. Each molecule is
   its uranium atom in the element colour, ringed in the referent colour
   of its isotope. The separation is exaggerated (rule 28.4): the feed is
   drawn half ²³⁵UF₆ and three in four of its molecules cross against
   three in sixteen of ²³⁸UF₆, four times as often, where a real stage manages
   1.0043 times; the caption and the readout say so. Moving on a 5 s loop
   that runs straight on, since a steady flow has no end to hold on: the
   tube flows at one speed in two staggered lanes and the narrower
   enriched outlet at twice it, a path through the chamber lasts two
   loops and carries two molecules a loop apart, so the end of a loop
   is its start. The tubes run to the edges of the stage and a molecule
   fades in and out there, so none is cut by the edge or seen outside a
   tube. The book's flow arrows are carried by the motion and drawn faint
   only under reduced motion. A molecule going from the upper half of the
   chamber to the outlet passes behind the barrier tube.
===================================================================== */
(function () {
  const d = sim('sim-diffuser', 480);
  const L = 300, R = 1060, TOP = 98, BOT = 390, TY = 223, TH = 42, RC = 40;
  const T = 5, V = 1440 / T, X0 = -20, X1 = 1420, M = 32, PIPE = 331, PH = 15, K = 2;
  const REDUCED = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
  let seed = 7;
  const rnd = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
  const between = (a, b) => a + rnd() * (b - a);
  const ISO = { 235: { ref: 'uf6-235', name: 'a molecule of ²³⁵UF₆' }, 238: { ref: 'uf6-238', name: 'a molecule of ²³⁸UF₆' } };
  /* a path is keyframes [x, y, t, behind]: straight runs, `behind` true while the run is drawn under the tube. The last
     run, into the outlet, is taken briskly from anywhere in the lower half, so molecules do not pile up at the outlet. */
  function through(ly, xc) {
    const top = rnd() < 0.5, band = () => [between(L + 60, R - 60), top ? between(TOP + 18, TY - 18) : between(TY + TH + 18, BOT - 18)];
    const pts = [[xc, ly], [xc + 18, top ? TY - 18 : TY + TH + 18]];
    for (let n = 2 + Math.floor(rnd() * 2); n > 0; n--) pts.push(band());
    if (top) { const xb = between(R - 380, R - 160); pts.push([xb, TY - 18], [xb, TY + TH + 18]); }
    pts.push([between(R - 430, R - 70), between(TY + TH + 18, BOT - 18)], [R, PIPE]);
    const seg = pts.slice(1).map((p, i) => Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1])), last = seg[seg.length - 1];
    const len = seg.reduce((a, b) => a + b, 0) - last;
    const t0 = (xc - X0) / V, shell = K * T - t0 - (X1 - R) / (2 * V) - last / (1.2 * V);
    const keys = [[X0, ly, 0, false]];
    let t = t0;
    pts.forEach((p, i) => { if (i) t += i === pts.length - 1 ? last / (1.2 * V) : shell * seg[i - 1] / len; keys.push([p[0], p[1], t, i > 0 && i < pts.length - 1]); });
    keys.push([X1, PIPE, K * T, false]);
    return keys;
  }
  /* of 32 molecules of each isotope in a loop of feed, 24 of ²³⁵UF₆ and 6 of ²³⁸UF₆ pass through the barrier */
  const fates = [...Array(24).fill('235x'), ...Array(8).fill('235'), ...Array(6).fill('238x'), ...Array(26).fill('238')];
  for (let i = fates.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [fates[i], fates[j]] = [fates[j], fates[i]]; }
  const paths = fates.map((f, s) => {
    const lane = s % 2, ly = TY + 11 + 20 * lane, phi = (Math.floor(s / 2) + 0.5 * lane) / M, iso = +f.slice(0, 3);
    return f.endsWith('x') ? { iso, phi, k: K, keys: through(ly, between(L + 40, R - 120)) } : { iso, phi, k: 1, keys: [[X0, ly, 0, false], [X1, ly, T, false]] };
  });
  const at = (keys, tau) => {
    let i = 0; while (i < keys.length - 2 && keys[i + 1][2] <= tau) i++;
    const a = keys[i], b = keys[i + 1], f = Math.min(1, Math.max(0, (tau - a[2]) / (b[2] - a[2])));
    return { x: a[0] + (b[0] - a[0]) * f, y: a[1] + (b[1] - a[1]) * f, behind: a[3] };
  };
  const cy = cycle(() => T, 0);
  let live = [], said = false;
  F.hover(d.stage, () => live.map((m) => ({ x: m.x, y: m.y, r: 10, name: ISO[m.iso].name })));
  const mol = (ctx, x, y, iso) => {
    ctx.save(); ctx.globalAlpha *= Math.max(0, Math.min(1, (x - 4) / 50, (1396 - x) / 50));   /* arriving at one edge of the stage, leaving at the other */
    ctx.fillStyle = F.el('U'); ctx.strokeStyle = F.ref(ISO[iso].ref); ctx.lineWidth = 4.5;
    ctx.beginPath(); ctx.arc(x, y, 7.5, 0, TAU); ctx.stroke(); ctx.beginPath(); ctx.arc(x, y, 3.5, 0, TAU); ctx.fill(); ctx.restore();
  };
  function draw() {
    const { ctx } = begin(d.c), t = cy.now();
    live = [];
    for (const p of paths) for (let m = 0; m < p.k; m++) live.push({ ...at(p.keys, ((p.phi + m) * T + t) % (p.k * T)), iso: p.iso });
    /* the outer chamber, then the molecules passing behind the tube, then the tube and the outlet over its wall */
    ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.05); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.roundRect(L, TOP, R - L, BOT - TOP, RC); ctx.fill(); ctx.stroke(); ctx.restore();
    for (const m of live) if (m.behind) mol(ctx, m.x, m.y, m.iso);
    ctx.save(); ctx.fillStyle = PAL.panel;
    ctx.globalAlpha = 0.8; ctx.fillRect(L, TY, R - L, TH); ctx.globalAlpha = 1;
    ctx.fillRect(0, TY, L + 2, TH); ctx.fillRect(R - 1.5, TY, 1400 - R + 2, TH); ctx.fillRect(R - 1.5, PIPE - PH, 1400 - R + 2, 2 * PH); ctx.restore();
    for (const y of [TY, TY + TH]) { line(ctx, 0, y, L, y, PAL.ink, 3); line(ctx, R, y, 1400, y, PAL.ink, 3); line(ctx, L, y, R, y, PAL.ink, 3, [6, 8]); }
    for (const y of [PIPE - PH, PIPE + PH]) line(ctx, R, y, 1400, y, PAL.ink, 3);
    if (REDUCED) {
      const faint = alpha(PAL.ink, 0.35);
      [[420, -1], [640, 1], [820, -1], [520, 1], [900, 1], [700, -1]].forEach(([x, s]) => arrow(ctx, x, s < 0 ? TY - 4 : TY + TH + 4, x + 18, s < 0 ? TY - 46 : TY + TH + 46, faint, 3));
      arrow(ctx, 60, TY + TH / 2, 210, TY + TH / 2, faint, 4);
      arrow(ctx, 1190, TY + TH / 2, 1340, TY + TH / 2, faint, 4);
      arrow(ctx, 1230, PIPE, 1340, PIPE, faint, 4);
    }
    for (const m of live) if (!m.behind) mol(ctx, m.x, m.y, m.iso);
    text(ctx, 'uranium hexafluoride (UF_{6})', 20, TY + TH + 28, PAL.ink, { size: 20 });
    label(ctx, 'high pressure feed tube', 150, TY - 4, { side: 'above', size: 20, color: PAL.ink, gap: 60 });
    label(ctx, 'porous barrier', 600, TY, { side: 'above', size: 20, color: PAL.ink, gap: TY - 70 });
    text(ctx, 'depleted ²³⁸UF_{6}', 1380, TY - 26, PAL.ink, { size: 20, align: 'right' });
    text(ctx, 'enriched ²³⁵UF_{6}', 1380, PIPE + PH + 28, PAL.ink, { size: 20, align: 'right' });
    text(ctx, 'higher speed ²³⁵UF_{6} diffuses through the barrier faster than ²³⁸UF_{6}', 680, 30, PAL.ink, { size: 22, align: 'center' });
    F.legend(ctx, { l: L, r: R, t: TOP, b: BOT }, [235, 238].map((iso) => ({ s: iso === 235 ? '²³⁵UF_{6}' : '²³⁸UF_{6}', draw: (c, x, y) => mol(c, x, y, iso) })), { corner: 'below' });
    if (said) return; said = true;
    const mm = (x) => hue('mass', x + '\\ \\text{g/mol}'), iso = (a) => `{}^{${a}}\\text{UF}_6`;
    tex(d.readout, `\\frac{\\text{rate of diffusion of }${iso(235)}}{\\text{rate of diffusion of }${iso(238)}} = \\frac{\\sqrt{\\kMM_{${iso(238)}}}}{\\sqrt{\\kMM_{${iso(235)}}}} \\\\ = \\frac{\\sqrt{${mm('352.04')}}}{\\sqrt{${mm('349.03')}}} = 1.0043`, undefined, { values: false });
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();
};
