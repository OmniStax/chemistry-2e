/* Figures for section 11.2 Electrolytes. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['11.2'] = function (root, F) {
const { tex, PAL, alpha, cycle, register, begin, line, text, legend, ctl } = F;
const sim = (id, H) => F.sim(root, id, H);
const TAU = 2 * Math.PI;
const clamp01 = (x) => Math.max(0, Math.min(1, x));
const smooth = F.ease.smooth;
/* one atom: a filled ball in its element colour, ink rim */
function ball(ctx, x, y, r, col) { ctx.save(); ctx.fillStyle = col; ctx.strokeStyle = alpha(PAL.ink, 0.55); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore(); }
/* the page's ink or panel colour, whichever has the greater contrast on a ball of colour col */
function onBall(ctx, col) {
  const lin = (v) => (v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
  const lum = (c) => { ctx.save(); ctx.fillStyle = c; const h = String(ctx.fillStyle); ctx.restore(); const m = /^#(..)(..)(..)$/.exec(h); return m ? 0.2126 * lin(parseInt(m[1], 16) / 255) + 0.7152 * lin(parseInt(m[2], 16) / 255) + 0.0722 * lin(parseInt(m[3], 16) / 255) : 0.2; };
  const l = lum(col), ratio = (c) => { const k = lum(c); return (Math.max(k, l) + 0.05) / (Math.min(k, l) + 0.05); };
  return ratio(PAL.ink) >= ratio(PAL.panel) ? PAL.ink : PAL.panel;
}
/* a particle drawn from its atoms [element, dx, dy, r], turned by a and scaled by k; hydrogens behind */
function particle(ctx, atoms, x, y, a, k = 1) {
  const c = Math.cos(a), s = Math.sin(a);
  atoms.slice().sort((p, q) => (q[0] === 'H') - (p[0] === 'H')).forEach(([e, dx, dy, r]) => ball(ctx, x + (dx * c - dy * s) * k, y + (dx * s + dy * c) * k, r * k, F.el(e)));
}

/* =====================================================================
   FIGURE 11.6: the book's three conductivity tests side by side, each a
   closed circuit drawn flat from the image: a beaker of solution, two
   plate electrodes (− left, + right, as the book marks them), a source
   of voltage wired to the − plate and, through a light bulb, to the +
   plate. The book draws a wall plug; a plug gives no fixed + and −, so
   the source is drawn as a battery, its − end on the − plate's wire.
   Moving: in the wires the electrons carry the current, leaving the
   battery's − end for the − plate and returning from the + plate through
   the bulb; in the solution the ions carry it, cations to the − plate
   and anions to the + plate (the book's arrows). Molecules only jostle.
   One slider dissolves n units of solute in every beaker: ethanol gives
   n molecules and no ions, KCl gives n K⁺ and n Cl⁻, acetic acid stays
   molecules but for one pair of ions (two from n = 6). Each bulb's glow
   and each wire's electron speed follow that beaker's ion count. The
   share of acetic acid ionized near 0.1 M is about 1 %, too small to
   draw; the book draws 1 pair among 3. BULB_LIGHT is the warm light of a
   glowing filament, a physical colour.
   Canvas units, per station centred cx: rail y 180, plates cx ± 125 from
   y 240 to 545, beaker inside cx ± 175 from y 270 to 570, liquid from 330.
===================================================================== */
(function () {
  const BULB_LIGHT = '#ffc94d';
  const d = sim('sim-conductivity', 745);
  const RAIL = 180, PT = 240, PB = 545, LS = 330, BT = 270, BB = 570, PX = 125, HALF = 175;
  const CX = [233, 700, 1167];
  const MOL = {
    ethanol: { word: 'an ethanol molecule, C₂H₅OH', key: 'ethanol', atoms: [['C', -9, 2, 6], ['C', -1, -3, 6], ['O', 7, 2, 6], ['H', 13.5, -1.5, 3.8], ['H', -16, 1.5, 3.8], ['H', -12, 8.5, 3.8], ['H', -6, 8.5, 3.8], ['H', -4.5, -9.5, 3.8], ['H', 2.5, -9.5, 3.8]] },
    acid: { word: 'an acetic acid molecule, CH₃CO₂H', key: 'acetic acid', atoms: [['C', -8, 0, 6], ['C', 3, 0, 6], ['O', 9, -9, 6], ['O', 10, 8, 6], ['H', 17, 9, 3.8], ['H', -14, -6, 3.8], ['H', -14, 6, 3.8], ['H', -9, 1, 3.8]] },
    acetate: { word: 'an acetate ion, CH₃CO₂⁻', key: 'CH₃CO₂⁻', q: -1, atoms: [['C', -8, 0, 6], ['C', 3, 0, 6], ['O', 9, -9, 6], ['O', 10, 8, 6], ['H', -14, -6, 3.8], ['H', -14, 6, 3.8], ['H', -9, 1, 3.8]] },
    hydronium: { word: 'a hydronium ion, H₃O⁺', key: 'H₃O⁺', q: 1, atoms: [['O', 0, 0, 6.5], ['H', -8, 5, 3.8], ['H', 8, 5, 3.8], ['H', 0, -9, 3.8]] },
    K: { word: 'a potassium ion, K⁺', key: 'K⁺', q: 1, atoms: [['K', 0, 0, 11]] },
    Cl: { word: 'a chloride ion, Cl⁻', key: 'Cl⁻', q: -1, atoms: [['Cl', 0, 0, 14]] },
  };
  const KS = 1.3;                                           /* the scale the particles are drawn at */
  const pairs = (n) => (n >= 6 ? 2 : 1);                    /* the acetic acid molecules that have ionized */
  const STATIONS = [
    { name: 'ethanol', cls: 'nonelectrolyte, no conductivity', mix: (n) => ({ ethanol: n }), count: (n) => [n + ' molecules, ', '0 ions'] },
    { name: 'KCl', cls: 'strong electrolyte, high conductivity', mix: (n) => ({ K: n, Cl: n }), count: (n) => [n + ' K⁺ and ' + n + ' Cl⁻, ', 2 * n + ' ions'] },
    { name: 'acetic acid', cls: 'weak electrolyte, low conductivity', mix: (n) => ({ acid: n - pairs(n), hydronium: pairs(n), acetate: pairs(n) }), count: (n) => [n - pairs(n) + ' molecules, ', 2 * pairs(n) + ' ions'] },
  ];
  const rnd = (a, b) => a + Math.random() * (b - a);
  const box = (cx) => ({ l: cx - PX + 36, r: cx + PX - 36, t: LS + 26, b: PB - 22 });
  const lists = STATIONS.map(() => []);
  const ionsIn = (i) => lists[i].reduce((s, p) => s + (MOL[p.kind].q ? 1 : 0), 0);
  /* bring each beaker to the slider's count: surplus particles of a kind go, missing ones arrive where there is room */
  function fill() {
    const n = N.v;
    STATIONS.forEach((s, i) => {
      const want = s.mix(n), B = box(CX[i]), list = lists[i];
      for (const kind of Object.keys(MOL)) {
        const have = list.filter((p) => p.kind === kind), w = want[kind] || 0;
        for (let j = have.length; j > w; j--) list.splice(list.lastIndexOf(have[j - 1]), 1);
        for (let j = have.length; j < w; j++) {
          let best = null, bd = -1;
          for (let k = 0; k < 24; k++) { const c = { x: rnd(B.l, B.r), y: rnd(B.t, B.b) }, dd = Math.min(1e9, ...list.map((o) => Math.hypot(o.x - c.x, o.y - c.y))); if (dd > bd) { bd = dd; best = c; } }
          list.push({ kind, x: best.x, y: best.y, a: rnd(0, TAU), vx: 0, vy: 0, w: rnd(-1, 1), born: 0 });
        }
      }
    });
  }
  const N = ctl(d.controls, { label: '\\text{solute dissolved in each beaker}', cls: '', min: 3, max: 8, step: 1, value: 4, fmt: (v) => v + ' units', aria: 'units of solute dissolved in each beaker', key: 'units', onInput: () => fill() });
  fill();
  const DRIFT = 46, JIG = 34, SEP = 36;
  const flow = [0, 0, 0];                                   /* how far each circuit's electrons have moved along the wire */
  function step(dt) {
    lists.forEach((list, i) => {
      const B = box(CX[i]);
      flow[i] += dt * 9 * ionsIn(i);
      for (const p of list) {
        const q = MOL[p.kind].q || 0;
        p.born = Math.min(1, p.born + dt / 0.45);
        if (Math.random() < dt * 3) { const h = rnd(0, TAU); p.vx = JIG * Math.cos(h); p.vy = JIG * Math.sin(h); p.w = rnd(-1.2, 1.2); }
        p.x += (p.vx - q * DRIFT) * dt; p.y += p.vy * dt; p.a += p.w * dt;
        /* a cation drifts left to the − plate, an anion right to the + plate; one that arrives is replaced at the far plate */
        if (q > 0 && p.x <= B.l) { p.x = B.r; p.y = rnd(B.t, B.b); p.born = 0; }
        if (q < 0 && p.x >= B.r) { p.x = B.l; p.y = rnd(B.t, B.b); p.born = 0; }
        p.x = Math.max(B.l, Math.min(B.r, p.x)); p.y = Math.max(B.t, Math.min(B.b, p.y));
      }
      for (let a = 0; a < list.length; a++) for (let b = a + 1; b < list.length; b++) {
        const p = list[a], o = list[b], dx = o.x - p.x, dy = o.y - p.y, r = Math.hypot(dx, dy) || 1;
        if (r < SEP) { const k = (SEP - r) / 2 / r; p.x -= dx * k; p.y -= dy * k * 1.5; o.x += dx * k; o.y += dy * k * 1.5; }
      }
      for (const p of list) { p.x = Math.max(B.l, Math.min(B.r, p.x)); p.y = Math.max(B.t, Math.min(B.b, p.y)); }
    });
  }
  const cy = cycle(() => Infinity, 0);
  let hits = [];
  F.hover(d.stage, () => hits);
  const wire = (ctx, pts) => { ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 4; ctx.lineJoin = 'round'; ctx.beginPath(); pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.stroke(); ctx.restore(); };
  /* electrons along a wire, 44 units apart, moved on by s */
  function electrons(ctx, pts, s) {
    const seg = pts.slice(1).map((p, i) => Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1])), L = seg.reduce((a, b) => a + b, 0), ce = F.el('e-');
    for (let u = ((s % 44) + 44) % 44; u < L; u += 44) {
      let v = u, i = 0; while (i < seg.length - 1 && v > seg[i]) { v -= seg[i]; i++; }
      const k = v / seg[i], x = pts[i][0] + (pts[i + 1][0] - pts[i][0]) * k, y = pts[i][1] + (pts[i + 1][1] - pts[i][1]) * k;
      ctx.save(); ctx.fillStyle = ce; ctx.strokeStyle = PAL.panel; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x, y, 6.5, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore();
    }
  }
  function beaker(ctx, cx) {
    const l = cx - HALF, r = cx + HALF, t = BT, b = BB;
    ctx.save();
    ctx.fillStyle = alpha(PAL.ink, 0.07); ctx.fillRect(l + 2, LS, r - l - 4, b - LS - 2);
    ctx.strokeStyle = alpha(PAL.ink, 0.35); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(l + 2, LS); ctx.lineTo(r - 2, LS); ctx.stroke();
    ctx.strokeStyle = PAL.ink; ctx.lineWidth = 4; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.moveTo(l - 20, t - 8); ctx.quadraticCurveTo(l - 3, t, l, t + 16); ctx.lineTo(l, b - 14); ctx.quadraticCurveTo(l, b, l + 14, b); ctx.lineTo(r - 14, b); ctx.quadraticCurveTo(r, b, r, b - 14); ctx.lineTo(r, t); ctx.lineTo(r + 8, t - 6); ctx.stroke();
    ctx.restore();
    hits.push({ x: l + 22, y: (LS + b) / 2, r: 22, name: 'the solution' }, { x: r - 22, y: (LS + b) / 2, r: 22, name: 'the solution' });
  }
  function plate(ctx, x, q) {
    const c = F.ref('electrodes'), name = q > 0 ? 'the positive electrode' : 'the negative electrode';
    ctx.save(); ctx.fillStyle = F.mixColor(PAL.panel, c, 0.3); ctx.strokeStyle = c; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.rect(x - 11, PT, 22, PB - PT); ctx.fill(); ctx.stroke(); ctx.restore();
    text(ctx, q > 0 ? '+' : '−', x - q * 30, PT + 10, PAL.ink, { size: 30, weight: 700, align: 'center' });
    for (let y = PT + 20; y < PB; y += 40) hits.push({ x, y, r: 20, name });
  }
  /* the battery lying in the rail, its − end left and its + end (the cap) right */
  function battery(ctx, l, r) {
    const y = RAIL, h = 23;
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.lineJoin = 'round';
    ctx.fillStyle = PAL.panel; ctx.beginPath(); ctx.roundRect(l, y - h, r - l, 2 * h, 6); ctx.fill();
    ctx.fillStyle = alpha(PAL.ink, 0.14); ctx.beginPath(); ctx.roundRect(l, y - h, r - l, 2 * h, 6); ctx.fill(); ctx.stroke();
    ctx.fillStyle = PAL.ink; ctx.beginPath(); ctx.roundRect(r, y - 9, 8, 18, 2); ctx.fill();
    ctx.restore();
    text(ctx, '−', l + 17, y, PAL.ink, { size: 24, weight: 700, align: 'center' });
    text(ctx, '+', r - 17, y, PAL.ink, { size: 24, weight: 700, align: 'center' });
    hits.push({ x: (l + r) / 2, y, r: 34, name: 'the battery, the source of the voltage' });
  }
  /* the bulb standing on the rail at BX: glow behind, then glass, filament, screw base and socket; b is its brightness 0..1 */
  function bulb(ctx, BX, b) {
    const R = 40, BY = RAIL - 82, glow = F.fact(BULB_LIGHT), cb = F.ref('bulb');
    if (b > 0.01) {
      const G = R + 80 * Math.pow(b, 0.9);
      ctx.save(); const g = ctx.createRadialGradient(BX, BY, 6, BX, BY, G);
      g.addColorStop(0, alpha(glow, Math.min(1, 1.5 * b))); g.addColorStop(0.5, alpha(glow, Math.min(0.75, 0.9 * b))); g.addColorStop(1, alpha(glow, 0));
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(BX, BY, G, 0, TAU); ctx.fill(); ctx.restore();
    }
    ctx.save(); ctx.strokeStyle = cb; ctx.lineWidth = 3.5; ctx.lineJoin = 'round'; ctx.fillStyle = b > 0.01 ? alpha(glow, Math.min(0.95, 1.6 * Math.pow(b, 1.3))) : alpha(PAL.panel, 0.4);
    ctx.beginPath(); ctx.arc(BX, BY, R, Math.PI * 0.7, Math.PI * 2.3); ctx.lineTo(BX + 16, BY + R + 8); ctx.lineTo(BX - 16, BY + R + 8); ctx.closePath(); ctx.fill(); ctx.stroke();
    /* the filament on its two leads */
    ctx.strokeStyle = b > 0.01 ? F.mixColor(PAL.ink, glow, Math.min(0.85, 0.3 + b)) : alpha(PAL.ink, 0.8); ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(BX - 8, BY + R + 8); ctx.lineTo(BX - 12, BY); ctx.moveTo(BX + 8, BY + R + 8); ctx.lineTo(BX + 12, BY); ctx.stroke();
    ctx.lineWidth = 2.5; ctx.beginPath(); for (let i = 0; i <= 24; i++) { const u = i / 24, x = BX - 12 + 24 * u, y = BY - 5 * Math.abs(Math.sin(u * Math.PI * 4)); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke();
    /* screw base, then the socket the rail runs into */
    ctx.fillStyle = PAL.panel; ctx.strokeStyle = cb; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.rect(BX - 16, BY + R + 8, 32, 20); ctx.fill(); ctx.stroke();
    for (let i = 1; i < 3; i++) line(ctx, BX - 16, BY + R + 8 + i * 7, BX + 16, BY + R + 8 + i * 7, cb, 1.5);
    ctx.beginPath(); ctx.roundRect(BX - 30, RAIL - 14, 60, 28, 4); ctx.fill(); ctx.stroke();
    ctx.restore();
    hits.push({ x: BX, y: BY, r: R + 8, name: 'the light bulb' }, { x: BX, y: RAIL - 10, r: 30, name: 'the light bulb' });
  }
  function draw() {
    const { ctx } = begin(d.c);
    hits = [];
    const n = N.v;
    STATIONS.forEach((s, i) => {
      const cx = CX[i], XL = cx - PX, XR = cx + PX, ions = ionsIn(i), b = ions / 16;
      /* the loop: battery − end → − plate; + plate → bulb → battery + end. The electrons run that way round */
      const toPlate = [[cx - 100, RAIL], [XL, RAIL], [XL, PT]], fromPlate = [[XR, PT], [XR, RAIL], [cx - 6, RAIL]];
      wire(ctx, toPlate); wire(ctx, fromPlate);
      electrons(ctx, toPlate, flow[i]); electrons(ctx, fromPlate, flow[i]);
      hits.push({ x: XL, y: 210, r: 22, name: 'a wire: electrons carry the current here' }, { x: XR, y: 210, r: 22, name: 'a wire: electrons carry the current here' });
      battery(ctx, cx - 100, cx - 14);
      bulb(ctx, cx + 62, b);
      beaker(ctx, cx);
      for (const p of lists[i]) {
        const m = MOL[p.kind], one = m.atoms.length === 1, r = one ? m.atoms[0][3] * KS : 16;
        ctx.save(); ctx.globalAlpha = p.born;
        particle(ctx, m.atoms, p.x, p.y, one ? 0 : p.a, KS);
        ctx.restore();
        if (m.q && p.born > 0.6) {
          if (one) text(ctx, m.q > 0 ? '+' : '−', p.x, p.y + 1, onBall(ctx, F.el(m.atoms[0][0])), { size: 22, weight: 700, align: 'center' });
          else text(ctx, m.q > 0 ? '+' : '−', p.x + 17, p.y - 17, PAL.ink, { size: 22, weight: 700, align: 'center' });
        }
        hits.push({ x: p.x, y: p.y, r: r + 6, name: m.word });
      }
      plate(ctx, XL, -1); plate(ctx, XR, 1);
      text(ctx, s.name, cx, 606, PAL.ink, { size: 26, weight: 600, align: 'center' });
      const [a, c] = s.count(n);
      F.rich(ctx, [a, [c, PAL.ink]], cx, 640, { size: 21, align: 'center' });
      text(ctx, s.cls, cx, 670, PAL.muted, { size: 19, align: 'center' });
    });
    text(ctx, 'battery', CX[0] - 57, RAIL - 40, PAL.muted, { size: 17, align: 'center' });
    const mol = (kind) => (c, x, y) => { const m = MOL[kind]; particle(c, m.atoms, x, y, 0, m.atoms.length === 1 ? 0.8 : 0.95); };
    legend(ctx, { l: 0, r: 1400, t: 688, b: 745 }, [
      { s: 'electron', draw: (c, x, y) => { c.save(); c.fillStyle = F.el('e-'); c.strokeStyle = alpha(PAL.ink, 0.55); c.lineWidth = 1.5; c.beginPath(); c.arc(x, y, 6.5, 0, TAU); c.fill(); c.stroke(); c.restore(); } },
      ...['ethanol', 'K', 'Cl', 'acid', 'hydronium', 'acetate'].map((k) => ({ s: MOL[k].key, draw: mol(k) })),
    ], { corner: 'bottom', row: true, panel: false });
    tex(d.readout, `${n}\\,\\text{C}_{2}\\text{H}_{5}\\text{OH}(l) \\longrightarrow ${n}\\,\\text{C}_{2}\\text{H}_{5}\\text{OH}(aq) \\\\ ${n}\\,\\text{KCl}(s) \\longrightarrow ${n}\\,\\text{K}^{+}(aq) + ${n}\\,\\text{Cl}^{-}(aq) \\\\ \\text{CH}_{3}\\text{CO}_{2}\\text{H}(aq) + \\text{H}_{2}\\text{O}(l) \\rightleftharpoons \\text{H}_{3}\\text{O}^{+}(aq) + \\text{CH}_{3}\\text{CO}_{2}{}^{-}(aq)`);
  }
  register(d.fig, { update: (dt) => { cy.step(dt, () => 1); step(Math.min(dt, 0.05)); }, draw });
})();

/* =====================================================================
   FIGURE 11.7: KCl dissolving, drawn flat as the book draws it (a slice:
   the water molecules in front of and behind the ions are not drawn). A
   crystal slice of 6 × 4 ions stands on the floor, K⁺ and Cl⁻ in turn.
   Two ions are already hydrated and at rest, named for the way their
   waters face. Six more leave one at a time from the corners: two water
   molecules close in on the ion's exposed side, turning as they come
   (oxygen toward K⁺, one hydrogen toward Cl⁻), the ion lifts off, two
   more waters close the shell behind it and the cluster moves off into
   the solution. Moving: dissolving has a time, so the clock runs 0 to
   TEND and holds; the transport scrubs it, and every frame is a function
   of the time alone. Radii K⁺ 26 and Cl⁻ 34 (138 and 181 pm), O 15,
   H 9; lattice spacing 60, unlike ions touching.
===================================================================== */
(function () {
  const HH = 660;
  const d = sim('sim-hydration', HH);
  const A = 60, C0 = 550, R0 = 426, R = { K: 26, Cl: 34, O: 15, H: 9 }, OH = 17, HALF = (104.5 / 2) * Math.PI / 180;
  const NAME = { K: 'a potassium ion, K⁺', Cl: 'a chloride ion, Cl⁻' }, SYM = { K: 'K⁺', Cl: 'Cl⁻' };
  const ions = [];
  for (let r = 0; r < 4; r++) for (let c = 0; c < 6; c++) ions.push({ f: (r + c) % 2 ? 'K' : 'Cl', x: C0 + c * A, y: R0 + r * A, r, c, n: -1 });
  const at = (r, c) => ions.find((q) => q.r === r && q.c === c);
  /* the leaving order, each a corner ion when its turn comes, with its way out and where its cluster comes to rest */
  const PLAN = [[0, 0, [-0.8, -0.6], [130, 400]], [0, 5, [0.8, -0.6], [1270, 400]], [1, 0, [-1, -0.25], [335, 425]], [1, 5, [1, -0.25], [1075, 440]], [0, 1, [-0.25, -1], [560, 190]], [0, 4, [0.25, -1], [860, 200]]];
  /* the two that dissolved before the clock starts */
  const DONE = [{ f: 'Cl', x: 215, y: 190, says: 'hydrogen ends face Cl⁻' }, { f: 'K', x: 1185, y: 190, says: 'oxygen ends face K⁺' }];
  const START = 0.8, GAP = 2.0, DUR = 3.4, TEND = START + GAP * (PLAN.length - 1) + DUR + 0.4;
  /* a water molecule's atoms: O at the origin, the two H at ±HALF about the direction a (from the O toward the H's) */
  const waterAtoms = (a) => [['O', 0, 0, R.O], ['H', OH * Math.cos(a + HALF), OH * Math.sin(a + HALF), R.H], ['H', OH * Math.cos(a - HALF), OH * Math.sin(a - HALF), R.H]];
  /* where a water sits in an ion's shell at the angle u round it, and how it is turned:
     K⁺: oxygen against the ion, both hydrogens away. Cl⁻: one O–H bond along the line to the ion */
  const seat = (f, u) => { const dO = f === 'K' ? R.K + R.O + 2 : R.Cl + R.H + 1 + OH; return { off: [dO * Math.cos(u), dO * Math.sin(u)], a: f === 'K' ? u : u + Math.PI + HALF }; };
  const fr = (i) => { const v = Math.sin(i * 12.9898 + 4.1) * 43758.5453; return v - Math.floor(v); };
  const waters = [];                                        /* every water: {x, y, a0} its place in the solution, ph its wobble */
  PLAN.forEach(([r, c, nrm, dest], n) => {
    const q = at(r, c), nl = Math.hypot(nrm[0], nrm[1]);
    q.n = n; q.out = [nrm[0] / nl, nrm[1] / nl]; q.dest = dest;
    const o = Math.atan2(q.out[1], q.out[0]);
    /* two waters on the exposed side first, then two behind once the ion is off the surface */
    q.shell = [-0.62, 0.62, Math.PI - 0.8, Math.PI + 0.8].map((du, m) => {
      const s = seat(q.f, o + du), far = m < 2 ? 150 + 50 * fr(n * 7 + m) : 120 + 40 * fr(n * 7 + m), ua = o + (m < 2 ? du * 1.3 : (m === 2 ? 1.5 : -1.5));
      const w = { x: q.x + q.out[0] * (m < 2 ? 40 : 90) + far * Math.cos(ua), y: q.y + q.out[1] * (m < 2 ? 40 : 90) + far * Math.sin(ua), a0: fr(n * 13 + m) * TAU, i: waters.length };
      waters.push(w);
      return { ...s, w, win: m < 2 ? [0, 0.3] : [0.42, 0.8] };
    });
  });
  DONE.forEach((e) => { e.shell = [0.25, 0.75, 1.25, 1.75].map((k) => seat(e.f, k * Math.PI)); });
  const NSHELL = waters.length;
  for (let j = 0; j < 36; j++) waters.push({ x: 60 + 1280 * fr(j * 3 + 100), y: 50 + (HH - 100) * fr(j * 5 + 200), a0: fr(j * 9 + 300) * TAU, i: waters.length });
  /* spread the waters once: 76 apart, clear of the crystal, of every cluster's resting place, of the two names and the key */
  {
    const fixed = [...ions.map((q) => [q.x, q.y, 74]), ...PLAN.map((p) => [p[3][0], p[3][1], 122]), ...DONE.map((e) => [e.x, e.y, 122])];
    const rects = [[40, 20, 395, 128], [1005, 20, 1360, 128], [20, 522, 470, HH]];
    for (let it = 0; it < 200; it++) {
      for (let i = 0; i < waters.length; i++) {
        const p = waters[i];
        for (let j = i + 1; j < waters.length; j++) { const o = waters[j], dx = o.x - p.x, dy = o.y - p.y, r = Math.hypot(dx, dy) || 1; if (r < 76) { const k = (76 - r) / 2 / r; p.x -= dx * k; p.y -= dy * k; o.x += dx * k; o.y += dy * k; } }
        for (const [fx, fy, f0] of fixed) { const dx = p.x - fx, dy = p.y - fy, r = Math.hypot(dx, dy) || 1; if (r < f0) { p.x = fx + dx / r * f0; p.y = fy + dy / r * f0; } }
        for (const [l, t, r, b] of rects) if (p.x > l && p.x < r && p.y > t && p.y < b) { const e = [p.x - l, r - p.x, p.y - t, b - p.y], m = e.indexOf(Math.min(...e)); if (m === 0) p.x = l; else if (m === 1) p.x = r; else if (m === 2) p.y = t; else p.y = b; }
        p.x = Math.min(Math.max(p.x, 50), 1350); p.y = Math.min(Math.max(p.y, 44), HH - 44);
      }
    }
  }
  /* where a leaving ion is at time t, and how far along its own clock (w) */
  function state(q, t) {
    if (q.n < 0) return { x: q.x, y: q.y, w: -1 };
    const w = clamp01((t - (START + q.n * GAP)) / DUR);
    const lift = smooth(clamp01((w - 0.3) / 0.2)), go = smooth(clamp01((w - 0.48) / 0.52));
    const lx = q.x + q.out[0] * 78 * lift, ly = q.y + q.out[1] * 78 * lift;
    return { x: lx + (q.dest[0] - lx) * go, y: ly + (q.dest[1] - ly) * go, w };
  }
  const cy = cycle(() => TEND, 2);
  let hits = [];
  F.hover(d.stage, () => hits);
  const turn = (a0, a1, k) => { const da = ((a1 - a0) % TAU + 3 * Math.PI) % TAU - Math.PI; return a0 + da * k; };
  const water = (ctx, x, y, a, name) => { particle(ctx, waterAtoms(a), x, y, 0, 1); hits.push({ x: x + 6 * Math.cos(a), y: y + 6 * Math.sin(a), r: 22, name }); };
  const faces = (f) => 'a water molecule, ' + (f === 'K' ? 'its oxygen end toward the K⁺' : 'a hydrogen end toward the Cl⁻');
  function ion(ctx, f, x, y, name) {
    ball(ctx, x, y, R[f], F.el(f));
    text(ctx, SYM[f], x, y + 1, onBall(ctx, F.el(f)), { size: 21, weight: 700, align: 'center' });
    hits.push({ x, y, r: R[f], name });
  }
  function draw() {
    const { ctx } = begin(d.c);
    const t = cy.now(), free = 'a water molecule, H₂O';
    hits = [];
    /* each water's place in the solution, rocking a little */
    const home = (w) => ({ x: w.x + 5 * Math.sin(t * 0.9 + w.i * 1.7), y: w.y + 5 * Math.cos(t * 0.7 + w.i * 2.3), a: w.a0 + 0.45 * Math.sin(t * 0.6 + w.i) });
    for (let i = NSHELL; i < waters.length; i++) { const h = home(waters[i]); water(ctx, h.x, h.y, h.a, free); }
    const S = ions.map((q) => ({ q, s: state(q, t) }));
    S.filter(({ s }) => s.w <= 0).forEach(({ q, s }) => ion(ctx, q.f, s.x, s.y, NAME[q.f] + ' in the crystal'));
    DONE.forEach((e) => {
      ion(ctx, e.f, e.x, e.y, NAME[e.f] + ', hydrated');
      e.shell.forEach((h) => water(ctx, e.x + h.off[0], e.y + h.off[1], h.a, faces(e.f)));
      text(ctx, e.says, e.x, 70, PAL.ink, { size: 22, align: 'center' });
    });
    S.filter(({ q }) => q.n >= 0).forEach(({ q, s }) => {
      if (s.w > 0) ion(ctx, q.f, s.x, s.y, NAME[q.f] + (s.w >= 0.5 ? ', hydrated' : ' leaving the crystal'));
      q.shell.forEach((h) => {
        const k = smooth(clamp01((s.w - h.win[0]) / (h.win[1] - h.win[0]))), b = home(h.w);
        water(ctx, b.x + (s.x + h.off[0] - b.x) * k, b.y + (s.y + h.off[1] - b.y) * k, turn(b.a, h.a, k), k > 0.95 ? faces(q.f) : free);
      });
    });
    const dot = (f, r) => (c, x, y) => ball(c, x, y, r, F.el(f));
    legend(ctx, { l: 20, r: 440, t: 540, b: HH - 8 }, [{ s: 'oxygen, the negative end of water', draw: dot('O', 10) }, { s: 'hydrogen, the positive end of water', draw: dot('H', 7) }], { corner: 'bl' });
    tex(d.readout, '\\text{KCl}(s) \\longrightarrow \\text{K}^{+}(aq) + \\text{Cl}^{-}(aq)');
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();
};
