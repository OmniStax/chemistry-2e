/* Figures for section 17.2 Galvanic Cells. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['17.2'] = function (root, F) {
const { PAL, C, alpha, cycle, register, begin, line, arrow, text } = F;
const sim = (id, H) => F.sim(root, id, H);
const TAU = 2 * Math.PI;
const clamp01 = (x) => Math.max(0, Math.min(1, x));
const smooth = F.ease.smooth;
const lerp2 = (a, b, k) => [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k];
/* the page's ink or panel colour, whichever has the greater contrast on a ball of colour col */
function onBall(ctx, col) {
  const lin = (v) => (v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
  const lum = (c) => { ctx.save(); ctx.fillStyle = c; const h = String(ctx.fillStyle); ctx.restore(); const m = /^#(..)(..)(..)$/.exec(h); return m ? 0.2126 * lin(parseInt(m[1], 16) / 255) + 0.7152 * lin(parseInt(m[2], 16) / 255) + 0.0722 * lin(parseInt(m[3], 16) / 255) : 0.2; };
  const l = lum(col), ratio = (c) => { const k = lum(c); return (Math.max(k, l) + 0.05) / (Math.min(k, l) + 0.05); };
  return ratio(PAL.ink) >= ratio(PAL.panel) ? PAL.ink : PAL.panel;
}

/* =====================================================================
   FIGURE 17.3 + 17.4: a galvanic cell, flat, from the book's two images.
   Two beakers joined by a wire (electrode, external circuit, electrode)
   and by a salt bridge, an inverted U of electrolyte with a porous plug
   under the liquid at each foot. The cell runs in NB beats of P seconds.
   In each beat two electrons pass along the wire from the anode (left)
   to the cathode (right); one Cu²⁺ (Mg²⁺) leaves the anode; two Ag⁺ reach
   the cathode and stay as silver atoms (two Fe³⁺ touch the platinum and
   leave as Fe²⁺); two anions leave the bridge's left foot and two cations
   its right foot. Every ion that arrives stays drawn, wearing its charge,
   so the charge added to each solution can be counted: it is 0 after
   every beat. The count n steps at the middle of a beat, when the ions
   cross. The salt bridge taken out stops the clock: the circuit is open.
   The schematic under the cell writes the book's notation, each term
   under its part; one Cu²⁺ drawn is 0.05 M and one Mg²⁺ 0.01 M, the two
   half-cells of equal volume. CU_BLUE is the colour of Cu²⁺(aq), a fact.
===================================================================== */
(function () {
  const H = 830, d = sim('sim-galvanic-cell', H);
  const CU_BLUE = '#3b8fd9';                    /* the blue of Cu²⁺(aq) */
  const NB = 4, P = 1.75, T = NB * P, FLY = 0.9;
  /* beakers: centres, inner half-width, rim, floor, liquid level */
  const LX = 315, RX = 1085, HW = 215, RIM = 318, FLOOR = 692, LEVEL = 440;
  /* the wire's height, the external circuit's box; the bridge's legs, centreline top, width, feet, and its lift when taken out */
  const WY = 84, BOX = { x: 700, y: 84, w: 250, h: 64 }, BL = 472, BR = 928, BT = 252, BW = 88, FOOT = 500, LIFT = 80;
  const XA = 152, XC = 1248, SW = 46, TOP = 258, BOT = 652;   /* the electrodes' x, the strips' width, top and foot */
  const NS = 14;                                             /* ions of each sign drawn in the bridge at the start */
  /* an ion: its element, radius and charge mark; nitrate is drawn atom by atom */
  const ION = {
    Cu: { el: 'Cu', r: 15, q: '2+', s: 'Cu²⁺' }, Mg: { el: 'Mg', r: 14, q: '2+', s: 'Mg²⁺' }, Ag: { el: 'Ag', r: 16, q: '+', s: 'Ag⁺' },
    Fe3: { el: 'Fe', r: 15, q: '3+', s: 'Fe³⁺' }, Fe2: { el: 'Fe', r: 15, q: '2+', s: 'Fe²⁺' }, Na: { el: 'Na', r: 15, q: '+', s: 'Na⁺' },
    Cl: { el: 'Cl', r: 19, q: '−', s: 'Cl⁻' }, NO3: { r: 18.5, q: '−', s: 'NO₃⁻' },
  };
  /* where the ions come to rest: anions under the left foot, cations under the right, the anode's ions beside it */
  const AN_SLOTS = [[372, 664], [432, 664], [342, 612], [462, 612], [402, 612], [492, 556], [372, 556], [432, 556]];
  const CAT_SLOTS = AN_SLOTS.map(([x, y]) => [1400 - x, y]);
  const CELLS = {
    cu: {
      anode: 'Cu', cathode: 'Ag', anion: 'NO3', cation: 'Na', made: 'Cu', used: 'Ag',
      ox: 'Cu(s) → Cu²⁺(aq) + 2e⁻', red: '2Ag⁺(aq) + 2e⁻ → 2Ag(s)', bridge: 'Salt bridge (NaNO₃)',
      /* each Cu²⁺ leaves the strip's face at the height of its slot */
      from: [[175, 478], [175, 548], [175, 612], [175, 655]], madeSlots: [[232, 478], [282, 548], [226, 612], [290, 655]],
      /* silver atoms stack up the cathode's face; each Ag⁺ comes out of the solution a little way off */
      sites: Array.from({ length: 2 * NB }, (_, i) => [XC - SW / 2 - 12, 462 + 25 * i]),
      origin: (i, s) => [s[0] - 96 - 22 * (i % 3), s[1] + (i % 2 ? 34 : -30)],
      an: (n) => [[(1 + 0.05 * n).toFixed(2) + ' M', ' Cu(NO₃)₂(aq)']], cat: (n) => [[(1 - 0.1 * n).toFixed(2) + ' M', ' AgNO₃(aq)']],
      tally: (n) => `\\text{charge added to the anode solution} = \\underbrace{${n}(+2)}_{\\text{Cu}^{2+}} + \\underbrace{${2 * n}(-1)}_{\\text{NO}_3^{-}} = 0 \\\\ \\text{charge added to the cathode solution} = \\underbrace{-${2 * n}(+1)}_{\\text{Ag}^{+}\\text{ plated out}} + \\underbrace{${2 * n}(+1)}_{\\text{Na}^{+}} = 0`,
      stop: 'With the salt bridge out, one more Cu²⁺ would leave the anode solution with a charge of 2+ and the cathode solution with 2−. Nothing can balance them, so no electrons flow.',
      names: { anode: 'the copper anode, where copper is oxidized', cathode: 'the silver cathode, where silver(I) ions are reduced', left: 'the anode half-cell: copper(II) nitrate solution', right: 'the cathode half-cell: silver nitrate solution', bridge: 'the salt bridge, filled with sodium nitrate solution',
        made: 'a copper(II) ion, Cu²⁺, that left the anode', used: 'a silver(I) ion, Ag⁺, on its way to the cathode', anion: 'a nitrate ion, NO₃⁻', cation: 'a sodium ion, Na⁺', solid: 'a silver atom plated onto the cathode' },
    },
    mg: {
      anode: 'Mg', cathode: 'Pt', anion: 'Cl', cation: 'Na', made: 'Mg', used: 'Fe3',
      ox: 'Mg(s) → Mg²⁺(aq) + 2e⁻', red: '2Fe³⁺(aq) + 2e⁻ → 2Fe²⁺(aq)', bridge: 'Salt bridge (NaCl)',
      from: [[222, 543], [261, 557], [280, 596], [265, 639]], madeSlots: [[215, 478], [292, 486], [326, 548], [322, 668]],
      /* each Fe³⁺ touches the top of the platinum coil and goes back into the solution as Fe²⁺ */
      sites: Array.from({ length: 2 * NB }, (_, i) => [1112 + 17.5 * i, 586]),
      origin: (i, s) => [s[0] - 30, s[1] - 34],
      redSlots: [[1216, 468], [1174, 468], [1132, 468], [1090, 468], [1195, 518], [1153, 518], [1111, 518], [1069, 518]],
      an: (n) => [[(0.1 + 0.01 * n).toFixed(2) + ' M', ' MgCl₂(aq)']], cat: (n) => [[(0.2 - 0.02 * n).toFixed(2) + ' M', ' FeCl₃(aq), '], [(0.3 + 0.02 * n).toFixed(2) + ' M', ' FeCl₂(aq)']],
      tally: (n) => `\\text{charge added to the anode solution} = \\underbrace{${n}(+2)}_{\\text{Mg}^{2+}} + \\underbrace{${2 * n}(-1)}_{\\text{Cl}^{-}} = 0 \\\\ \\text{charge added to the cathode solution} = \\underbrace{${2 * n}(-1)}_{\\text{Fe}^{3+}\\,\\to\\,\\text{Fe}^{2+}} + \\underbrace{${2 * n}(+1)}_{\\text{Na}^{+}} = 0`,
      stop: 'With the salt bridge out, one more Mg²⁺ would leave the anode solution with a charge of 2+ and the cathode solution with 2−. Nothing can balance them, so no electrons flow.',
      names: { anode: 'the magnesium anode, an active electrode, where magnesium is oxidized', cathode: 'the platinum cathode, an inert electrode, where iron(III) ions are reduced', left: 'the anode half-cell: magnesium chloride solution', right: 'the cathode half-cell: iron(III) chloride and iron(II) chloride solution', bridge: 'the salt bridge, filled with sodium chloride solution',
        made: 'a magnesium ion, Mg²⁺, that left the anode', used: 'an iron(III) ion, Fe³⁺, on its way to the platinum', anion: 'a chloride ion, Cl⁻', cation: 'a sodium ion, Na⁺', solid: 'an iron(II) ion, Fe²⁺, made at the platinum' },
    },
  };
  const cy = cycle(() => T, 1.5);
  const cell = F.choice(d.controls, { label: '\\text{cell}', options: [{ value: 'cu', label: 'copper and silver(I)' }, { value: 'mg', label: 'magnesium and iron(III)' }], value: 'cu', aria: 'the galvanic cell', onInput: () => cy.reset() });
  const br = F.choice(d.controls, { label: '\\text{salt bridge}', key: 'bridge', options: [{ value: 'in', label: 'in place' }, { value: 'out', label: 'taken out' }], value: 'in', aria: 'the salt bridge' });
  const ro = F.readout(d);
  let hits = []; F.hover(d.stage, () => hits);

  /* a polyline with each corner rounded to radius r, and a walker along it by arc length */
  function rounded(pts, r) {
    const out = [pts[0]];
    for (let i = 1; i < pts.length - 1; i++) {
      const p = pts[i], a = pts[i - 1], b = pts[i + 1];
      const la = Math.hypot(a[0] - p[0], a[1] - p[1]), lb = Math.hypot(b[0] - p[0], b[1] - p[1]);
      const A = [p[0] + (a[0] - p[0]) * r / la, p[1] + (a[1] - p[1]) * r / la], B = [p[0] + (b[0] - p[0]) * r / lb, p[1] + (b[1] - p[1]) * r / lb];
      for (let s = 0; s <= 14; s++) { const t = s / 14; out.push([(1 - t) ** 2 * A[0] + 2 * (1 - t) * t * p[0] + t * t * B[0], (1 - t) ** 2 * A[1] + 2 * (1 - t) * t * p[1] + t * t * B[1]]); }
    }
    out.push(pts[pts.length - 1]); return out;
  }
  function walker(pts) {
    const seg = pts.slice(1).map((p, i) => Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1])), L = seg.reduce((a, b) => a + b, 0);
    /* the point at arc length s, pushed off the line by `off` toward the outside of the arch */
    const at = (s, off = 0) => {
      s = Math.max(0, Math.min(L, s)); let i = 0; while (i < seg.length - 1 && s > seg[i]) { s -= seg[i]; i++; }
      const t = seg[i] ? s / seg[i] : 0, dx = (pts[i + 1][0] - pts[i][0]) / (seg[i] || 1), dy = (pts[i + 1][1] - pts[i][1]) / (seg[i] || 1);
      return [pts[i][0] + (pts[i + 1][0] - pts[i][0]) * t + dy * off, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * t - dx * off];
    };
    return { L, at, pts };
  }
  const stroke = (ctx, pts, color, w, cap = 'round') => {
    ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = w; ctx.lineCap = cap; ctx.lineJoin = 'round';
    ctx.beginPath(); pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.stroke(); ctx.restore();
  };
  const wire = walker(rounded([[XA, TOP], [XA, WY], [XC, WY], [XC, TOP]], 44));
  const tube = walker(rounded([[BL, FOOT], [BL, BT], [BR, BT], [BR, FOOT]], 70));
  /* the Mg ribbon: down from the wire, then a flat spiral; the Pt wire: down, then a coil lying along the floor */
  const SP = { x: XA + 70, y: 596, r0: 70, r1: 14, turns: 2.4 };
  const spiral = (u) => { const a = Math.PI - u * SP.turns * TAU, r = SP.r0 - u * (SP.r0 - SP.r1); return [SP.x + r * Math.cos(a), SP.y + r * Math.sin(a)]; };
  const ribbon = [[XA, TOP], ...Array.from({ length: 160 }, (_, i) => spiral(i / 159))];
  const COIL = { x0: XC, x1: 1105, y: 630, r: 28, turns: 6 };
  const coil = (u) => { const p = u * COIL.turns * TAU; return [COIL.x0 - u * (COIL.x0 - COIL.x1) - 11 * Math.sin(p), COIL.y - COIL.r * Math.cos(p)]; };
  const ptWire = [[XC, TOP], [XC, COIL.y - COIL.r], ...Array.from({ length: 240 }, (_, i) => coil(i / 239))];

  function ball(ctx, x, y, r, col) { ctx.save(); ctx.fillStyle = col; ctx.strokeStyle = alpha(PAL.ink, 0.55); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore(); }
  /* an ion with its charge written on it; a < 1 fades it, mark false leaves a bare atom */
  function ion(ctx, kind, x, y, a = 1, mark = true, name) {
    if (a <= 0.02) return;
    const k = ION[kind];
    ctx.save(); ctx.globalAlpha *= a;
    if (kind === 'NO3') {
      for (let i = 0; i < 3; i++) { const an = i * TAU / 3 - Math.PI / 2; ball(ctx, x + 11 * Math.cos(an), y + 11 * Math.sin(an), 7.5, F.el('O')); }
      ball(ctx, x, y, 8, F.el('N'));
      text(ctx, '−', x, y, onBall(ctx, F.el('N')), { size: 17, weight: 700, align: 'center' });
    } else {
      ball(ctx, x, y, k.r, F.el(k.el));
      if (mark) text(ctx, k.q, x, y + 1, onBall(ctx, F.el(k.el)), { size: 17, weight: 700, align: 'center' });
    }
    ctx.restore();
    if (name && a > 0.5) hits.push({ x, y, r: k.r + 4, name });
  }
  /* the fraction of the way to rest of an ion that crossed at time t0 */
  const flown = (t, t0) => smooth(clamp01((t - t0) / FLY));
  const wob = (t, i, k) => [2.2 * Math.sin(1.7 * t + 2.4 * i) * k, 2.2 * Math.cos(1.3 * t + 1.9 * i) * k];

  function beaker(ctx, cx, tint, name) {
    const l = cx - HW, r = cx + HW, rc = 26;
    const body = (top) => { ctx.beginPath(); ctx.moveTo(l, top); ctx.lineTo(l, FLOOR - rc); ctx.quadraticCurveTo(l, FLOOR, l + rc, FLOOR); ctx.lineTo(r - rc, FLOOR); ctx.quadraticCurveTo(r, FLOOR, r, FLOOR - rc); ctx.lineTo(r, top); ctx.closePath(); };
    ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.03); body(RIM); ctx.fill();
    ctx.fillStyle = tint; body(LEVEL); ctx.fill(); ctx.restore();
    hits.push({ x: cx, y: 480, r: 36, name });
  }
  function glass(ctx, cx) {
    const l = cx - HW, r = cx + HW, rc = 26, g = alpha(PAL.ink, 0.6), lip = cx < 700 ? -1 : 1;
    ctx.save(); ctx.strokeStyle = g; ctx.lineWidth = 4; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    /* the pouring lip is on the outer side, as the book draws it */
    const xo = lip < 0 ? l : r, xi = lip < 0 ? r : l;
    ctx.beginPath(); ctx.moveTo(xo + lip * 20, RIM - 12); ctx.quadraticCurveTo(xo, RIM - 8, xo, RIM + 16); ctx.lineTo(xo, FLOOR - rc); ctx.quadraticCurveTo(xo, FLOOR, xo - lip * rc, FLOOR);
    ctx.lineTo(xi + lip * rc, FLOOR); ctx.quadraticCurveTo(xi, FLOOR, xi, FLOOR - rc); ctx.lineTo(xi, RIM); ctx.stroke(); ctx.restore();
    line(ctx, l + 2, LEVEL, r - 2, LEVEL, alpha(PAL.ink, 0.4), 2);
  }
  const lead = (ctx, x1, y1, x2, y2) => line(ctx, x1, y1, x2, y2, alpha(PAL.ink, 0.55), 1.5);

  /* everything that belongs to one cell: electrodes, ions, labels */
  function electrodes(ctx, c, t, tints) {
    const K = CELLS[c];
    if (c === 'cu') {
      ctx.save(); ctx.strokeStyle = alpha(PAL.ink, 0.6); ctx.lineWidth = 1.5;
      ctx.fillStyle = F.el('Cu'); ctx.fillRect(XA - SW / 2, TOP, SW, BOT - TOP); ctx.strokeRect(XA - SW / 2, TOP, SW, BOT - TOP);
      ctx.fillStyle = F.el('Ag'); ctx.fillRect(XC - SW / 2, TOP, SW, BOT - TOP); ctx.strokeRect(XC - SW / 2, TOP, SW, BOT - TOP);
      /* a bite out of the copper's face where each Cu²⁺ has left */
      ctx.beginPath(); ctx.rect(XA - SW / 2, TOP, SW + 2, BOT - TOP); ctx.clip();
      K.from.forEach(([fx, fy], j) => {
        const g = clamp01((t - (j + 0.3) * P) / (0.2 * P)); if (g <= 0) return;
        ctx.beginPath(); ctx.arc(fx + 3, fy, 15 * g, 0, TAU);
        ctx.fillStyle = PAL.panel; ctx.fill(); ctx.fillStyle = tints[0]; ctx.fill(); ctx.stroke();
      });
      ctx.restore();
    } else {
      const done = clamp01(t / T), w = 14 - 5 * done;
      stroke(ctx, ribbon, alpha(PAL.ink, 0.6), w + 3); stroke(ctx, ribbon, F.el('Mg'), w);
      stroke(ctx, ptWire, alpha(PAL.ink, 0.6), 9); stroke(ctx, ptWire, F.el('Pt'), 6);
    }
  }
  function tubeIons(ctx, c, t, lift) {
    const K = CELLS[c];
    /* e ions of each sign have left so far: two a beat, eased, crossing the plugs about mid-beat */
    const j = Math.min(NB - 1, Math.floor(t / P)), e = t >= T ? 2 * NB : 2 * j + 2 * smooth(clamp01((t / P - j - 0.2) / 0.6));
    /* smooth(x) = 0.25 and 0.75 at x = 0.3264 and 0.6736: when ion k crosses its plug */
    const cross = (k) => (Math.floor(k / 2) + 0.2 + 0.6 * (k % 2 ? 0.6736 : 0.3264)) * P;
    for (let k = NS - 1; k >= 0; k--) {
      const s = (k + 0.5 - e) * tube.L / (NS - e);
      if (s > 0) {
        const pa = tube.at(s, 18.5), pc = tube.at(tube.L - s, -22);
        ion(ctx, K.anion, pa[0], pa[1] - lift, 1, true, K.names.anion + ', in the salt bridge'); ion(ctx, K.cation, pc[0], pc[1] - lift, 1, true, K.names.cation + ', in the salt bridge');
      } else {
        const g = flown(t, cross(k)), w = wob(t, k, g);
        const pa = lerp2([BL - 18.5, FOOT + 6], AN_SLOTS[k], g), pc = lerp2([BR + 22, FOOT + 6], CAT_SLOTS[k], g);
        ion(ctx, K.anion, pa[0] + w[0], pa[1] + w[1], 1, true, K.names.anion + ', from the salt bridge'); ion(ctx, K.cation, pc[0] - w[0], pc[1] + w[1], 1, true, K.names.cation + ', from the salt bridge');
      }
    }
  }
  function cellIons(ctx, c, t) {
    const K = CELLS[c];
    /* the anode's ions: each leaves the metal over 0.3 to 0.5 of its beat, then drifts to rest */
    K.from.forEach((f, j) => {
      const t0 = (j + 0.3) * P; if (t < t0) return;
      const out = clamp01((t - t0) / (0.2 * P)), g = flown(t, t0 + 0.2 * P), w = wob(t, j + 20, g);
      const p = lerp2([f[0] + 18 * out, f[1]], K.madeSlots[j], g);
      ion(ctx, K.made, p[0] + w[0], p[1] + w[1], out, true, K.names.made);
    });
    /* the cathode's ions: each comes out of the solution, reaches the metal at mid-beat, and is reduced there */
    K.sites.forEach((s, i) => {
      const j = Math.floor(i / 2), u = t / P - j, o = K.origin(i, s);
      if (u < -0.35) return;
      if (u < 0.5) {
        const p = lerp2(o, s, smooth(clamp01((u - 0.08) / 0.42)));
        ion(ctx, K.used, p[0], p[1], clamp01((u + 0.35) / 0.4), true, K.names.used);
      } else if (c === 'cu') ion(ctx, 'Ag', s[0], s[1], 1, false, K.names.solid);
      else {
        const g = flown(t, (j + 0.56) * P), w = wob(t, i + 40, g), p = lerp2(s, K.redSlots[i], g);
        ion(ctx, 'Fe2', p[0] + w[0], p[1] + w[1], 1, true, K.names.solid);
      }
    });
  }
  /* the cell schematic, each term under the part it names */
  function schematic(ctx, c, n) {
    const K = CELLS[c], y = 752, cc = C('concentration'), size = 22;
    const parts = (rows) => rows.flatMap(([v, s]) => [[v, cc], s]);
    const width = (ps) => ps.reduce((a, p) => a + F.measure(ctx, typeof p === 'string' ? p : p[0], { size, weight: typeof p === 'string' ? 400 : 600 }), 0);
    const a = `${K.anode}(s)`, k = `${K.cathode}(s)`, wa = F.measure(ctx, a, { size }), wk = F.measure(ctx, k, { size });
    const an = parts(K.an(n)), cat = parts(K.cat(n));
    const xb1 = XA + wa / 2 + 24, xb2 = XC - wk / 2 - 24;
    text(ctx, a, XA, y, PAL.ink, { size, align: 'center' }); text(ctx, k, XC, y, PAL.ink, { size, align: 'center' });
    text(ctx, '|', xb1, y - 1, PAL.ink, { size: 26, align: 'center' }); text(ctx, '|', xb2, y - 1, PAL.ink, { size: 26, align: 'center' });
    F.rich(ctx, an, xb1 + 22, y, { size }); F.rich(ctx, cat, xb2 - 22, y, { size, align: 'right' });
    text(ctx, '‖', 700, y - 1, PAL.ink, { size: 26, align: 'center' });
    hits.push({ x: XA, y, r: 24, name: `${a}: the ${c === 'cu' ? 'copper' : 'magnesium'} anode, written first` }, { x: XC, y, r: 24, name: `${k}: the ${c === 'cu' ? 'silver' : 'platinum'} cathode, written last` },
      { x: xb1, y, r: 14, name: 'a single line: the boundary between the electrode and its solution' }, { x: xb2, y, r: 14, name: 'a single line: the boundary between the solution and its electrode' },
      { x: 700, y, r: 18, name: 'a double line: the salt bridge' },
      { x: xb1 + 22 + width(an) / 2, y, r: 40, name: 'the anode half-cell’s solution' }, { x: xb2 - 22 - width(cat) / 2, y, r: 40, name: 'the cathode half-cell’s solution' });
  }
  function labels(ctx, c) {
    const K = CELLS[c];
    text(ctx, K.ox, 34, 26, PAL.ink, { size: 22, align: 'left' }); text(ctx, K.red, 1366, 26, PAL.ink, { size: 22, align: 'right' });
    text(ctx, `${K.anode} anode`, XA + 34, 190, PAL.ink, { size: 22, align: 'left' }); text(ctx, 'oxidation', XA + 34, 219, PAL.muted, { size: 19, align: 'left' });
    text(ctx, `${K.cathode} cathode`, XC - 34, 190, PAL.ink, { size: 22, align: 'right' }); text(ctx, 'reduction', XC - 34, 219, PAL.muted, { size: 19, align: 'right' });
    text(ctx, K.bridge, 700, 350, PAL.ink, { size: 22, align: 'center', bg: PAL.panel });
  }

  let lastTex = '', lastNote = null;
  function draw() {
    const { ctx } = begin(d.c);
    hits = [];
    const c = cell.value, K = CELLS[c], t = cy.now(), n = Math.min(NB, Math.floor(t / P + 0.5));
    const out = br.mix((v) => (v === 'out' ? 1 : 0)), lift = LIFT * out;
    const blue = cell.mix((v) => (v === 'cu' ? 1 : 0));
    const left = F.mixColor(alpha(PAL.muted, 0.13), alpha(F.fact(CU_BLUE), 0.2 + 0.2 * t / T), blue), right = alpha(PAL.muted, 0.13);
    beaker(ctx, LX, left, K.names.left); beaker(ctx, RX, right, K.names.right);
    for (const v of ['cu', 'mg']) cell.only(ctx, v, () => electrodes(ctx, v, v === c ? t : 0, [left, right]), [0, 0]);
    hits.push({ x: XA, y: 380, r: 30, name: K.names.anode }, { x: XC, y: 380, r: 30, name: K.names.cathode });
    if (c === 'mg') hits.push({ x: SP.x, y: SP.y, r: 70, name: K.names.anode }, { x: (COIL.x0 + COIL.x1) / 2, y: COIL.y, r: 40, name: K.names.cathode });

    /* the salt bridge: glass, its electrolyte, a porous plug at each foot; lifted clear of the liquid when taken out */
    ctx.save(); ctx.translate(0, -lift);
    stroke(ctx, tube.pts, alpha(PAL.ink, 0.6), BW, 'butt');
    stroke(ctx, tube.pts, PAL.panel, BW - 8, 'butt');
    stroke(ctx, tube.pts, alpha(PAL.muted, 0.12), BW - 8, 'butt');
    for (const bx of [BL, BR]) {
      ctx.fillStyle = alpha(PAL.muted, 0.75); ctx.fillRect(bx - BW / 2 + 4, FOOT - 18, BW - 8, 18);
      ctx.fillStyle = PAL.panel; for (let i = 0; i < 9; i++) { ctx.beginPath(); ctx.arc(bx - 32 + 8 * i, FOOT - 9 + (i % 2 ? 4 : -4), 2, 0, TAU); ctx.fill(); }
      ctx.strokeStyle = alpha(PAL.ink, 0.6); ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(bx - BW / 2, FOOT); ctx.lineTo(bx + BW / 2, FOOT); ctx.stroke();
    }
    ctx.restore();
    hits.push({ x: 700, y: BT - lift, r: 40, name: K.names.bridge }, { x: BL, y: FOOT - 9 - lift, r: 20, name: 'a porous plug: ions pass through it, the solutions do not mix' }, { x: BR, y: FOOT - 9 - lift, r: 20, name: 'a porous plug: ions pass through it, the solutions do not mix' });
    /* the liquid over everything below its surface, then the glass */
    for (const [cx, tint] of [[LX, left], [RX, right]]) { ctx.save(); ctx.fillStyle = tint; ctx.globalAlpha = 0.45; ctx.fillRect(cx - HW + 2, LEVEL, 2 * HW - 4, FLOOR - LEVEL - 2); ctx.restore(); glass(ctx, cx); }
    for (const v of ['cu', 'mg']) cell.only(ctx, v, () => { tubeIons(ctx, v, v === c ? t : 0, lift); cellIons(ctx, v, v === c ? t : 0); }, [0, 0]);

    /* the wire and the external circuit, and the electrons: two pass every beat, anode to cathode */
    stroke(ctx, wire.pts, PAL.ink, 5);
    const NE = 20, sp = wire.L / NE;
    for (let i = 0; i < NE; i++) {
      const s = (i * sp + 2 * sp * t / P) % wire.L, [ex, ey] = wire.at(s);
      if (Math.abs(ex - BOX.x) < BOX.w / 2 + 8 && ey < BOX.y + BOX.h) continue;
      ball(ctx, ex, ey, 8.5, F.el('e-'));
      hits.push({ x: ex, y: ey, r: 12, name: 'an electron, e⁻, in the wire' });
    }
    ctx.save(); ctx.fillStyle = PAL.soft; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.roundRect(BOX.x - BOX.w / 2, BOX.y - BOX.h / 2, BOX.w, BOX.h, 12); ctx.fill(); ctx.stroke(); ctx.restore();
    text(ctx, 'external circuit', BOX.x, BOX.y - 13, PAL.ink, { size: 22, align: 'center' });
    text(ctx, `${2 * n} e⁻ have passed`, BOX.x, BOX.y + 14, PAL.ink, { size: 19, align: 'center' });
    hits.push({ x: BOX.x, y: BOX.y, r: 40, name: 'the external circuit' });

    /* labels, all on parts that hold still; the flow labels go when the bridge does */
    br.only(ctx, 'in', () => {
      text(ctx, 'flow of electrons', 716, 26, PAL.ink, { size: 22, align: 'right' }); arrow(ctx, 732, 26, 802, 26, PAL.ink, 3);
      text(ctx, 'Flow of anions', 690, 166, PAL.ink, { size: 22, align: 'right' }); arrow(ctx, 548, 166, 492, 166, PAL.ink, 3);
      text(ctx, 'Flow of cations', 710, 166, PAL.ink, { size: 22, align: 'left' }); arrow(ctx, 852, 166, 908, 166, PAL.ink, 3);
    }, [0, 0]);
    br.only(ctx, 'out', () => text(ctx, 'no electrons flow', 700, 26, PAL.ink, { size: 22, align: 'center' }), [0, 0]);
    /* the dashed guide from the bridge down to its double line, and from each electrode to its symbol */
    line(ctx, 700, BT + BW / 2 - lift + 2, 700, 334, alpha(PAL.ink, 0.55), 1.5);
    line(ctx, 700, 368, 700, 732, alpha(PAL.ink, 0.35), 2, [4, 8]);
    line(ctx, XA, FLOOR + 8, XA, 734, alpha(PAL.ink, 0.35), 2, [4, 8]); line(ctx, XC, FLOOR + 8, XC, 734, alpha(PAL.ink, 0.35), 2, [4, 8]);
    lead(ctx, 636, 560, BL + BW / 2 - 6, FOOT - 9 - lift); lead(ctx, 764, 560, BR - BW / 2 + 6, FOOT - 9 - lift);
    text(ctx, 'Porous plug', 700, 560, PAL.ink, { size: 22, align: 'center', bg: PAL.panel });
    for (const v of ['cu', 'mg']) cell.only(ctx, v, () => { labels(ctx, v); schematic(ctx, v, v === c ? n : 0); }, [0, 0]);

    /* the key: each particle once */
    const sample = (kind) => (g, px, py) => {
      if (kind === 'e-') return ball(g, px, py, 8.5, F.el('e-'));
      if (kind === 'NO3') { for (let i = 0; i < 3; i++) { const an = i * TAU / 3 - Math.PI / 2; ball(g, px + 7.5 * Math.cos(an), py + 7.5 * Math.sin(an), 5.5, F.el('O')); } return ball(g, px, py, 5.5, F.el('N')); }
      return ball(g, px, py, Math.min(11, ION[kind].r * 0.65), F.el(ION[kind].el));
    };
    const keys = [{ s: 'electron, e⁻', draw: sample('e-') }, ...(c === 'cu' ? ['Cu', 'Ag', 'NO3', 'Na'] : ['Mg', 'Fe3', 'Fe2', 'Cl', 'Na']).map((k) => ({ s: ION[k].s, draw: sample(k) }))];
    F.legend(ctx, { l: 0, r: 1400, t: 0, b: H }, keys, { corner: 'bottom', row: true, size: 20 });

    const s = K.tally(n), note = br.value === 'out' ? K.stop : '';
    if (s !== lastTex || note !== lastNote) { lastTex = s; lastNote = note; ro.set(s, note, { form: c, values: false }); }
  }
  register(d.fig, { update: (dt) => { if (br.value === 'in') cy.step(dt, () => 1); }, draw });
})();
};
