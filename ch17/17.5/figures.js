/* Figures for section 17.5 Batteries and Fuel Cells. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['17.5'] = function (root, F) {
const { el, fmt, tex, PAL, alpha, cycle, register, begin, line, text } = F;
const sim = (id, H) => F.sim(root, id, H);
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;
const TAU = 2 * Math.PI;
/* LAMP_LIGHT is the warm light of a glowing filament, a physical colour */
const LAMP_LIGHT = '#ffc94d';
/* a polyline measured by arc length, and the point a distance s along it */
const mk = (pts) => { const cum = [0]; for (let i = 1; i < pts.length; i++) cum.push(cum[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1])); return { pts, cum, L: cum[cum.length - 1] }; };
const along = (p, s) => { const c = p.cum; let i = 1; while (i < c.length - 1 && c[i] < s) i++; const f = Math.min(1, Math.max(0, (s - c[i - 1]) / (c[i] - c[i - 1] || 1))); return [p.pts[i - 1][0] + f * (p.pts[i][0] - p.pts[i - 1][0]), p.pts[i - 1][1] + f * (p.pts[i][1] - p.pts[i - 1][1])]; };
const clamp = (x) => Math.max(0, Math.min(1, x));
function atom(ctx, x, y, r, sym) {
  ctx.save(); ctx.fillStyle = F.el(sym); ctx.strokeStyle = alpha(PAL.ink, sym === 'H' ? 0.8 : 0.55); ctx.lineWidth = sym === 'H' ? 1.8 : 1.5;
  ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore();
}
/* an ion's charge, a small + or − set just above and right of its disc */
function charge(ctx, x, y, r, plus) {
  const cx = x + r + 3, cy = y - r, s = 4.5;
  line(ctx, cx - s, cy, cx + s, cy, PAL.ink, 2.2); if (plus) line(ctx, cx, cy - s, cx, cy + s, PAL.ink, 2.2);
}
/* a lone electron: its disc on a ring of the page colour, so it shows on a dark atom as on the wire */
function electron(ctx, x, y) {
  ctx.save(); ctx.fillStyle = PAL.panel; ctx.beginPath(); ctx.arc(x, y, 9.5, 0, TAU); ctx.fill(); ctx.restore();
  atom(ctx, x, y, 7, 'e-'); charge(ctx, x, y, 7, false);
}
/* a lamp whose socket sits in the wire at (x, wy), the bulb above it; b is its brightness 0..1 */
function lamp(ctx, x, wy, b) {
  const R = 30, by = wy - 54, glow = F.fact(LAMP_LIGHT);
  if (b > 0.01) {
    const G = R + 54 * b;
    ctx.save(); const g = ctx.createRadialGradient(x, by, 6, x, by, G);
    g.addColorStop(0, alpha(glow, Math.min(1, 1.4 * b))); g.addColorStop(0.5, alpha(glow, 0.7 * b)); g.addColorStop(1, alpha(glow, 0));
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, by, G, 0, TAU); ctx.fill(); ctx.restore();
  }
  ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.lineJoin = 'round'; ctx.fillStyle = F.mixColor(PAL.panel, glow, 0.9 * b);
  ctx.beginPath(); ctx.arc(x, by, R, Math.PI * 0.68, Math.PI * 2.32); ctx.lineTo(x + 14, by + R + 6); ctx.lineTo(x - 14, by + R + 6); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.lineWidth = 2; ctx.strokeStyle = alpha(PAL.ink, 0.8);
  ctx.beginPath(); ctx.moveTo(x - 7, by + R + 6); ctx.lineTo(x - 10, by + 2); ctx.moveTo(x + 7, by + R + 6); ctx.lineTo(x + 10, by + 2); ctx.stroke();
  ctx.beginPath(); for (let i = 0; i <= 20; i++) { const u = i / 20, px = x - 10 + 20 * u, py = by + 2 - 5 * Math.abs(Math.sin(u * Math.PI * 3)); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke();
  ctx.fillStyle = PAL.panel; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.roundRect(x - 22, wy - 18, 44, 30, 4); ctx.fill(); ctx.stroke();
  line(ctx, x - 22, wy - 8, x + 22, wy - 8, PAL.ink, 1.5); line(ctx, x - 22, wy + 2, x + 22, wy + 2, PAL.ink, 1.5);
  ctx.restore();
}

/* =====================================================================
   FIGURE 17.12: a lithium ion battery, discharging or being charged.
   Flat, side on as the book draws it, inside one cell: a metal contact
   at each end, the positive electrode (left) as three CoO2 layers with
   a row of six lithium sites under each, the negative electrode (right)
   as four graphite layers with three sites in each gap, the electrolyte
   between and around them. Drawn to the formula: 18 Co, 36 O and 18
   lithium sites, so with n lithium in the graphite x = n/18, and x runs
   between 0.50 and 0.00 as the text says it does. Moving: nine Li+
   cross, one every 0.45 s, each taking 2.4 s, and with each one electron
   leaves the same site, runs the external circuit and reaches the
   cobalt above the site its ion fills.
===================================================================== */
(function () {
  const d = sim('sim-li-ion', 792);
  const mode = F.choice(d.controls, { label: '\\text{process}', options: [{ value: 'discharge', label: 'discharge' }, { value: 'charge', label: 'charge' }], value: 'discharge', aria: 'whether the battery discharges or is being charged', onInput: () => cy.reset() });
  const N = 9, D = 2.4, S0 = 0.2, DS = 0.45, T = S0 + (N - 1) * DS + D + 0.1;
  const WY = 98, TOP = 196, BOT = 606, PLX = 153, PRX = 1247, PT = 168, FACE_OX = 606, FACE_GR = 806;
  const CO_Y = [244, 374, 504], LI_Y = [309, 439, 569], COX = (i) => 214 + 64 * i;
  const GR_Y = [236, 346, 456, 566], GAL_Y = [291, 401, 511], GX = (c) => 906 + 120 * c;
  /* the nine that move, in the order they leave: on discharge the graphite sites nearest the electrolyte first, into the
     deepest empty oxide sites; on charge the oxide sites nearest the electrolyte first, into the deepest graphite sites */
  const pair = (r, gc, oi) => {
    const g = [GX(gc), GAL_Y[r]], o = [COX(oi), LI_Y[r]];
    return { g, o, ion: mk([g, [FACE_GR, g[1]], [FACE_OX, o[1]], o]),
      wire: mk([g, [g[0], GR_Y[r]], [PRX, GR_Y[r]], [PRX, WY], [PLX, WY], [PLX, CO_Y[r]], [o[0], CO_Y[r]]]) };
  };
  const ORDER = { discharge: Array.from({ length: N }, (_, m) => pair(m % 3, Math.floor(m / 3), 3 + Math.floor(m / 3))),
    charge: Array.from({ length: N }, (_, m) => pair(m % 3, 2 - Math.floor(m / 3), 5 - Math.floor(m / 3))) };
  const RX = {
    discharge: ['cathode: reduction', '$\\text{Li}_{1-x}\\text{CoO}_{2}+x\\,\\text{Li}^{+}+x\\,\\text{e}^{-}\\longrightarrow\\text{LiCoO}_{2}$', 'anode: oxidation', '$x\\,\\text{LiC}_{6}\\longrightarrow x\\,\\text{Li}^{+}+x\\,\\text{e}^{-}+x\\,\\text{C}_{6}$'],
    charge: ['anode: oxidation', '$\\text{LiCoO}_{2}\\longrightarrow\\text{Li}_{1-x}\\text{CoO}_{2}+x\\,\\text{Li}^{+}+x\\,\\text{e}^{-}$', 'cathode: reduction', '$x\\,\\text{Li}^{+}+x\\,\\text{e}^{-}+x\\,\\text{C}_{6}\\longrightarrow x\\,\\text{LiC}_{6}$'],
  };
  const cy = cycle(() => T, 1.2);
  const site = (ctx, x, y) => { ctx.save(); ctx.strokeStyle = alpha(PAL.ink, 0.6); ctx.lineWidth = 2; ctx.setLineDash([5, 5]); ctx.beginPath(); ctx.arc(x, y, 14, 0, TAU); ctx.stroke(); ctx.restore(); };
  let said = '';
  function draw() {
    const { ctx } = begin(d.c), t = cy.now(), dis = mode.value === 'discharge', ink = PAL.ink, hits = [];
    const steel = alpha(PAL.muted, 0.5), edge = alpha(ink, 0.65);
    /* the external circuit, behind the cell */
    for (const [a, b] of [[[PLX, PT + 4], [PLX, WY]], [[PLX, WY], [PRX, WY]], [[PRX, WY], [PRX, PT + 4]]]) line(ctx, a[0], a[1], b[0], b[1], ink, 3.5);
    /* the cell: its case, the electrolyte that fills it, a metal contact at each end */
    ctx.save(); ctx.beginPath(); ctx.roundRect(126, 184, 1148, 434, 16); ctx.fillStyle = steel; ctx.fill(); ctx.strokeStyle = edge; ctx.lineWidth = 2.5; ctx.stroke();
    ctx.beginPath(); ctx.roundRect(136, TOP, 1128, BOT - TOP, 8); ctx.fillStyle = PAL.panel; ctx.fill(); ctx.fillStyle = alpha(ink, 0.045); ctx.fill(); ctx.strokeStyle = alpha(ink, 0.4); ctx.lineWidth = 1.5; ctx.stroke();
    for (const x of [PLX, PRX]) { ctx.beginPath(); ctx.rect(x - 13, PT, 26, BOT - PT); ctx.fillStyle = PAL.panel; ctx.fill(); ctx.fillStyle = alpha(PAL.muted, 0.6); ctx.fill(); ctx.strokeStyle = edge; ctx.lineWidth = 2; ctx.stroke(); }
    ctx.restore();
    hits.push({ x: 706, y: 250, r: 44, name: 'the electrolyte, which carries lithium ions between the electrodes' }, { x: 706, y: 560, r: 40, name: 'the electrolyte, which carries lithium ions between the electrodes' });
    for (let y = 230; y < BOT; y += 60) hits.push({ x: PLX, y, r: 16, name: 'a metal contact, joining the positive electrode to the circuit' }, { x: PRX, y, r: 16, name: 'a metal contact, joining the negative electrode to the circuit' });
    /* the positive electrode: CoO2 layers, each a row of cobalt between two rows of oxygen */
    CO_Y.forEach((y) => {
      for (let i = 0; i < 6; i++) for (const [dx, dy] of [[32, -25], [-32, 25]]) { atom(ctx, COX(i) + dx, y + dy, 12, 'O'); hits.push({ x: COX(i) + dx, y: y + dy, r: 12, name: 'an oxygen atom of a CoO₂ layer' }); }
      for (let i = 0; i < 6; i++) { atom(ctx, COX(i), y, 15, 'Co'); hits.push({ x: COX(i), y, r: 15, name: 'a cobalt atom of a CoO₂ layer' }); }
    });
    /* the negative electrode: graphite layers seen edge on */
    GR_Y.forEach((y) => {
      const pts = Array.from({ length: 14 }, (_, j) => [826 + 30 * j, y + (j % 2 ? 6 : -6)]);
      for (let j = 1; j < pts.length; j++) line(ctx, pts[j - 1][0], pts[j - 1][1], pts[j][0], pts[j][1], alpha(ink, 0.6), 4);
      pts.forEach(([x, yy]) => { atom(ctx, x, yy, 10, 'C'); hits.push({ x, y: yy, r: 10, name: 'a carbon atom of a graphite layer' }); });
    });
    /* lithium that stays in the oxide */
    for (let r = 0; r < 3; r++) for (let i = 0; i < 3; i++) { atom(ctx, COX(i), LI_Y[r], 14, 'Li'); hits.push({ x: COX(i), y: LI_Y[r], r: 14, name: 'a lithium ion between the CoO₂ layers' }); }
    /* the nine that cross, each with its electron */
    const list = ORDER[mode.value]; let arrived = 0; const flying = [];
    list.forEach((m, i) => {
      const k = (t - (S0 + DS * i)) / D, from = dis ? m.g : m.o, to = dis ? m.o : m.g;
      if (k >= 1) arrived++;
      for (const [q, empty] of [[from, k > 0], [to, k < 1]]) if (empty) { site(ctx, q[0], q[1]); hits.push({ x: q[0], y: q[1], r: 14, name: 'an empty lithium site' }); }
      if (k <= 0 || k >= 1) {
        const [x, y] = k <= 0 ? from : to, inGraphite = (k >= 1) !== dis;
        atom(ctx, x, y, 14, 'Li'); hits.push({ x, y, r: 14, name: inGraphite ? 'a lithium atom held between graphite layers, as LiC₆' : 'a lithium ion between the CoO₂ layers' });
      } else flying.push([m, k]);
    });
    flying.forEach(([m, k]) => {
      const [x, y] = along(m.ion, (dis ? k : 1 - k) * m.ion.L), [ex, ey] = along(m.wire, (dis ? k : 1 - k) * m.wire.L);
      atom(ctx, x, y, 14, 'Li'); charge(ctx, x, y, 14, true); hits.push({ x, y, r: 16, name: 'a lithium ion, Li⁺' });
      if (!(Math.abs(ey - WY) < 1 && Math.abs(ex - 700) < (dis ? 24 : 106))) { electron(ctx, ex, ey); hits.push({ x: ex, y: ey, r: 12, name: 'an electron, e⁻' }); }
    });
    /* what the circuit holds: a lamp the cell lights, or the charger that drives it */
    const on = clamp((t - S0) / 0.3) * clamp((T - 0.1 - t) / 0.3);
    mode.only(ctx, 'discharge', () => lamp(ctx, 700, WY, on), [0, 0]);
    mode.only(ctx, 'charge', () => {
      ctx.save(); ctx.fillStyle = PAL.panel; ctx.strokeStyle = ink; ctx.lineWidth = 3; ctx.beginPath(); ctx.roundRect(596, WY - 32, 208, 64, 8); ctx.fill(); ctx.stroke(); ctx.restore();
      text(ctx, 'charger', 700, WY, ink, { size: 22, align: 'center' });
      text(ctx, '+', 620, WY, ink, { size: 26, align: 'center', weight: 600 }); text(ctx, '−', 780, WY, ink, { size: 26, align: 'center', weight: 600 });
    }, [0, 0]);
    hits.push({ x: 700, y: WY - 30, r: 50, name: dis ? 'a lamp the battery lights' : 'a charger, an external source of power that drives the cell reaction backward' });
    text(ctx, '+', PLX - 34, PT + 2, ink, { size: 30, align: 'center', weight: 600 });
    text(ctx, '−', PRX + 34, PT + 2, ink, { size: 30, align: 'center', weight: 600 });
    /* which way each carrier goes */
    const way = (v) => { const s = v === 'discharge' ? -1 : 1;
      for (const x of [400, 1000]) { F.arrow(ctx, x - 44 * s, WY + 30, x + 44 * s, WY + 30, alpha(ink, 0.75), 3); text(ctx, 'e⁻', x, WY + 58, ink, { size: 24, align: 'center' }); }
      F.arrow(ctx, 706 - 54 * s, 240, 706 + 54 * s, 240, alpha(ink, 0.75), 3); text(ctx, 'Li⁺', 706, 216, ink, { size: 24, align: 'center' }); };
    mode.only(ctx, 'discharge', () => way('discharge'), [0, 0]); mode.only(ctx, 'charge', () => way('charge'), [0, 0]);
    /* names, and the half-reaction each electrode runs now */
    text(ctx, 'positive electrode', 375, 648, ink, { size: 24, align: 'center', weight: 600 });
    text(ctx, 'negative electrode', 1021, 648, ink, { size: 24, align: 'center', weight: 600 });
    text(ctx, 'electrolyte', 706, 648, ink, { size: 24, align: 'center' });
    for (const v of ['discharge', 'charge']) mode.only(ctx, v, () => {
      const [a, ra, b, rb] = RX[v];
      text(ctx, a, 375, 680, ink, { size: 22, align: 'center' }); text(ctx, ra, 375, 714, ink, { size: 22, align: 'center', tex: true });
      text(ctx, b, 1021, 680, ink, { size: 22, align: 'center' }); text(ctx, rb, 1021, 714, ink, { size: 22, align: 'center', tex: true });
    }, [0, 0]);
    F.legend(ctx, { l: 0, r: 1400, t: 738, b: 792 }, [
      { s: 'lithium', draw: (c, x, y) => atom(c, x, y, 11, 'Li') },
      { s: 'cobalt', draw: (c, x, y) => atom(c, x, y, 11, 'Co') },
      { s: 'oxygen', draw: (c, x, y) => atom(c, x, y, 10, 'O') },
      { s: 'carbon', draw: (c, x, y) => atom(c, x, y, 10, 'C') },
      { s: 'electron', draw: (c, x, y) => electron(c, x, y) },
      { s: 'empty lithium site', draw: (c, x, y) => { c.save(); c.strokeStyle = alpha(PAL.ink, 0.6); c.lineWidth = 2; c.setLineDash([4, 4]); c.beginPath(); c.arc(x, y, 10, 0, TAU); c.stroke(); c.restore(); } },
    ], { corner: 'bottom', row: true, panel: false, size: 21 });
    d.hits = hits;
    const x = (dis ? N - arrived : arrived) / 18;
    const s = dis
      ? `\\text{Li}_{1-x}\\text{CoO}_{2}+x\\,\\text{LiC}_{6}\\longrightarrow\\text{LiCoO}_{2}+x\\,\\text{C}_{6} \\\\ x = ${fmt(x, 2)} \\\\ \\kEcell\\sim ${hue('potential', '3.7\\ \\text{V}')}`
      : `\\text{LiCoO}_{2}+x\\,\\text{C}_{6}\\longrightarrow\\text{Li}_{1-x}\\text{CoO}_{2}+x\\,\\text{LiC}_{6} \\\\ x = ${fmt(x, 2)} \\\\ \\text{charger's voltage}> ${hue('potential', '3.7\\ \\text{V}')}`;
    if (s !== said) { said = s; tex(d.readout, s, false, { values: false }); }
  }
  F.hover(d.stage, () => d.hits || []);
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();

/* =====================================================================
   FIGURE 17.14: a hydrogen fuel cell in section, as the book draws it.
   Fuel enters the left channel and air the right; each runs down beside
   its electrode and out. Both streams move at 140 units a second with a
   molecule every 70, so twelve pass in the 6 s loop, which closes on
   itself. Of the twelve H2, four turn into the anode (two every 3 s) and
   eight leave as excess fuel; of the air's twelve (nine N2, three O2) two
   O2 turn into the cathode. A turn of the cell reaction: two H2 reach
   platinum in the anode at the same moment and split, each atom giving
   an H+ to the electrolyte and an e- to the wire; 1.5 s later the four
   H+ and four e- meet the O2 waiting on platinum in the cathode, and two
   H2O leave down the air channel with the unused gases. The choice shuts
   off the hydrogen or opens the circuit, and either stops the current.
===================================================================== */
(function () {
  const d = sim('sim-fuel-cell', 814);
  const mode = F.choice(d.controls, { label: '\\text{cell}', options: [{ value: 'run', label: 'running' }, { value: 'off', label: 'hydrogen shut off' }, { value: 'open', label: 'circuit open' }], value: 'run', aria: 'the cell running, with its hydrogen shut off, or with its circuit open' });
  const out = F.readout(d);
  const T = 6, V = 140, S = 70, NS = 12, WY = 92, AX = 545, CX = 855, ET = 196, EB = 654, DX = 1.5;
  const XS = 560, XO = 840, LANE = 964, FX = 410, GX = 1016;
  /* the two anode sites and the cathode site of each parity of turn, and the stream tickets that feed them */
  const SITES = [{ ya: [300, 370], yc: 335, h2: [1, 0], o2: 2 }, { ya: [510, 580], yc: 545, h2: [4, 3], o2: 5 }];
  const FUEL = mk([[20, 254], [FX, 254], [FX, 591], [20, 591]]), AIR = mk([[1380, 254], [GX, 254], [GX, 569], [1380, 569]]);
  const toAnode = (y) => mk([[20, 254], [FX, 254], [FX, y], [XS, y]]), toCathode = (y) => mk([[1380, 254], [GX, 254], [GX, y], [XO, y]]);
  const BR_H = {}, BR_O = {};
  SITES.forEach((s) => { s.ya.forEach((y, i) => { BR_H[s.h2[i]] = toAnode(y); }); BR_O[s.o2] = toCathode(s.yc); });
  const TAU0 = (BR_H[1].L + S) / V;                      /* when the even turn's two H2 reach the anode */
  const AIRKIND = (m) => (m === 2 || m === 5 || m === 9 ? 'O2' : 'N2');
  const ATT = [[-29, -14], [-29, 14], [29, -14], [29, 14]];   /* where the four H join the O2, two to each O */
  const NAMES = { H2: 'a hydrogen molecule, H₂', O2: 'an oxygen molecule, O₂', N2: 'a nitrogen molecule, N₂, which takes no part', H2O: 'a water molecule, H₂O' };
  const PT_AT = [[XS, 300], [XS, 370], [XS, 510], [XS, 580], [XO, 335], [XO, 545], [510, 420], [585, 216], [500, 600], [890, 240], [890, 440], [820, 600]];
  const cy = cycle(() => T, 0);
  function glyph(ctx, kind, x, y, th = 0) {
    const c = Math.cos(th), s = Math.sin(th), a = (dx, dy, r, e) => atom(ctx, x + dx * c - dy * s, y + dx * s + dy * c, r, e);
    if (kind === 'H2') { a(-8.5, 0, 9.5, 'H'); a(8.5, 0, 9.5, 'H'); }
    else if (kind === 'O2') { a(-11.5, 0, 13, 'O'); a(11.5, 0, 13, 'O'); }
    else if (kind === 'N2') { a(-11, 0, 13, 'N'); a(11, 0, 13, 'N'); }
    else { a(-12, 9, 8.5, 'H'); a(12, 9, 8.5, 'H'); a(0, 0, 13, 'O'); }
  }
  const hplus = (ctx, x, y) => { atom(ctx, x, y, 9.5, 'H'); charge(ctx, x, y, 9.5, true); };
  const island = (ctx, x, y) => { ctx.save(); ctx.fillStyle = F.el('Pt'); ctx.strokeStyle = alpha(PAL.ink, 0.6); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.ellipse(x, y, 20, 8, 0, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore(); };
  /* the way a path runs at s, for a molecule carried along it */
  const heading = (p, s) => { const a = along(p, Math.max(0, s - 22)), b = along(p, Math.min(p.L, s + 22)); return Math.atan2(b[1] - a[1], b[0] - a[0]); };
  function draw() {
    const { ctx } = begin(d.c), t = cy.now(), ink = PAL.ink, hits = [], run = mode.a('run'), open = mode.a('open'), off = mode.a('off');
    const edge = alpha(ink, 0.6);
    const put = (kind, x, y, th, al, name) => { if (al <= 0.02) return; F.faded(ctx, al, [0, 0], () => glyph(ctx, kind, x, y, th)); if (al > 0.5) hits.push({ x, y, r: 18, name: name || NAMES[kind] }); };
    /* the plates that hold the gas channels, and the pipes in and out */
    ctx.save(); ctx.fillStyle = alpha(PAL.muted, 0.38); ctx.strokeStyle = edge; ctx.lineWidth = 2;
    for (const [l, tp, r, b] of [[240, 180, 470, 214], [240, 294, 350, 546], [240, 636, 470, 670], [930, 180, 1160, 214], [1050, 294, 1160, 546], [930, 636, 1160, 670]]) { ctx.beginPath(); ctx.rect(l, tp, r - l, b - tp); ctx.fill(); ctx.stroke(); }
    ctx.restore();
    for (const y of [214, 294, 546, 636]) { line(ctx, 20, y, 240, y, edge, 2); line(ctx, 1160, y, 1380, y, edge, 2); }
    /* the electrodes, porous graphite, and the electrolyte between them */
    ctx.save();
    for (const [l, r, a] of [[470, 620, 0.13], [620, 780, 0.04], [780, 930, 0.13]]) { ctx.beginPath(); ctx.rect(l, ET, r - l, EB - ET); ctx.fillStyle = PAL.panel; ctx.fill(); ctx.fillStyle = alpha(ink, a); ctx.fill(); ctx.strokeStyle = edge; ctx.lineWidth = 2; ctx.stroke(); }
    ctx.fillStyle = alpha(ink, 0.2);
    for (let r = 0, y = ET + 14; y < EB - 6; y += 20, r++) for (const x0 of [470, 780]) for (let x = x0 + 12 + (r % 2 ? 10 : 0); x < x0 + 142; x += 20) { ctx.beginPath(); ctx.arc(x, y, 2.4, 0, TAU); ctx.fill(); }
    ctx.restore();
    PT_AT.forEach(([x, y]) => { island(ctx, x, y + 24); hits.push({ x, y: y + 24, r: 14, name: 'platinum catalyst in the graphite electrode' }); });
    hits.push({ x: 700, y: 420, r: 70, name: 'the electrolyte, which lets H⁺ ions through from the anode to the cathode' });
    for (const y of [330, 420, 600]) hits.push({ x: 500, y, r: 30, name: 'the anode, porous graphite holding a platinum catalyst' }, { x: 900, y, r: 30, name: 'the cathode, porous graphite holding a platinum catalyst' });
    /* the external circuit: a switch and a lamp */
    const lever = -0.6 * open;
    for (const [a, b] of [[[AX, ET], [AX, WY]], [[AX, WY], [770, WY]], [[822, WY], [CX, WY]], [[CX, WY], [CX, ET]]]) line(ctx, a[0], a[1], b[0], b[1], ink, 3.5);
    line(ctx, 770, WY, 770 + 52 * Math.cos(lever), WY + 52 * Math.sin(lever), ink, 3.5);
    for (const x of [770, 822]) { ctx.save(); ctx.fillStyle = PAL.panel; ctx.strokeStyle = ink; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(x, WY, 5.5, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore(); }
    hits.push({ x: 796, y: WY - 8, r: 30, name: 'a switch that closes or opens the circuit' });

    /* the gas streams, a molecule every S along each channel */
    const vt = V * t;
    for (let j = Math.floor((vt - FUEL.L) / S); j <= Math.ceil(vt / S); j++) {
      const s = vt - j * S, m = ((j % NS) + NS) % NS, th = 0.35 * Math.sin(j * 2.4), br = BR_H[m];
      if (s < 0) continue;
      const alOn = run + open;
      if (!br) { if (s <= FUEL.L) { const p = along(FUEL, s); put('H2', p[0], p[1], heading(FUEL, s) + th, alOn * Math.min(1, (FUEL.L - s) / 30), 'a hydrogen molecule, H₂, leaving unreacted'); } continue; }
      if (s <= br.L) { const p = along(br, s), e = clamp((s - br.L + 60) / 60); put('H2', p[0], p[1], heading(br, s) + th * (1 - e) + (Math.PI / 2) * e, run); }
      if (s <= FUEL.L) { const p = along(FUEL, s); put('H2', p[0], p[1], heading(FUEL, s) + th, open * Math.min(1, (FUEL.L - s) / 30), 'a hydrogen molecule, H₂, leaving unreacted'); }
    }
    for (let j = Math.floor((vt - AIR.L) / S); j <= Math.ceil(vt / S); j++) {
      const s = vt - j * S, m = ((j % NS) + NS) % NS, th = 0.35 * Math.sin(j * 1.7), br = BR_O[m], kind = AIRKIND(m);
      if (s < 0) continue;
      const fade = Math.min(1, (AIR.L - s) / 30);
      if (!br) { if (s <= AIR.L) { const p = along(AIR, s); put(kind, p[0], p[1], heading(AIR, s) + th, fade, kind === 'O2' ? 'an oxygen molecule, O₂, leaving unused' : ''); } continue; }
      if (s <= br.L) { const p = along(br, s); put('O2', p[0], p[1], heading(br, s) + th * (1 - clamp((s - br.L + 60) / 60)), run); }
      if (s <= AIR.L) { const p = along(AIR, s); put('O2', p[0], p[1], heading(AIR, s) + th, (open + off) * fade, 'an oxygen molecule, O₂, leaving unused'); }
    }
    /* the cell reaction, turn by turn: turn n starts at TAU0 + 3n and uses the sites of its parity */
    if (run > 0.02) for (let n = -5; n <= 1; n++) {
      const u = t - (TAU0 + 3 * n), g = SITES[((n % 2) + 2) % 2], O = [XO, g.yc];
      if (u < -0.8 || u > 9.5) continue;
      F.faded(ctx, run, [0, 0], () => {
        /* the O2 waiting on the catalyst, the H that have joined it, then the two H2O that leave */
        const tO = u - (BR_O[g.o2].L + g.o2 * S) / V + TAU0 + (g === SITES[1] ? 3 : 0);   /* time since this turn's O2 landed */
        const TW = 0.35 + 0.36 + DX + 0.2;
        if (tO >= 0 && u < TW) { glyph(ctx, 'O2', O[0], O[1]); hits.push({ x: O[0], y: O[1], r: 22, name: 'an oxygen molecule, O₂, on the catalyst, taking up H⁺ and electrons' }); }
        if (u >= 0 && u < 0.35) g.ya.forEach((y) => { const k = u / 0.35; atom(ctx, XS, y - 8.5 - 1.5 * k, 9.5, 'H'); atom(ctx, XS, y + 8.5 + 1.5 * k, 9.5, 'H'); hits.push({ x: XS, y, r: 16, name: 'a hydrogen molecule splitting on the catalyst' }); });
        for (let q = 0; q < 4; q++) {
          const y0 = g.ya[q >> 1] + (q % 2 ? 10 : -10), k = (u - 0.35 - 0.12 * q) / DX, to = [O[0] + ATT[q][0], O[1] + ATT[q][1]];
          if (u < 0.35 || u >= TW) continue;
          if (k >= 1) { atom(ctx, to[0], to[1], 8.5, 'H'); continue; }
          if (k < 0) { atom(ctx, XS, y0, 9.5, 'H'); continue; }
          const ion = mk([[XS, y0], [620, y0], [780, to[1]], to]), wire = mk([[XS, y0], [AX, y0], [AX, WY], [CX, WY], [CX, to[1]], to]);
          const [hx, hy] = along(ion, k * ion.L), [ex, ey] = along(wire, k * wire.L);
          hplus(ctx, hx, hy); hits.push({ x: hx, y: hy, r: 12, name: 'a hydrogen ion, H⁺, crossing the electrolyte' });
          if (!(Math.abs(ey - WY) < 1 && Math.abs(ex - 700) < 24)) { electron(ctx, ex, ey); hits.push({ x: ex, y: ey, r: 12, name: 'an electron, e⁻, in the external circuit' }); }
        }
        if (u >= TW) [-1, 1].forEach((sg, i) => {
          const w = mk([[O[0] + 11.5 * sg, O[1]], [O[0] + 11.5 * sg, O[1] + 16 * sg], [LANE, O[1] + 16 * sg], [LANE, 613], [1380, 613]]), s = V * (u - TW - 0.25 * i);
          if (s > w.L) return; const p = along(w, Math.max(0, s)); const al = Math.min(1, (w.L - s) / 30);
          F.faded(ctx, al, [0, 0], () => glyph(ctx, 'H2O', p[0], p[1])); hits.push({ x: p[0], y: p[1], r: 18, name: 'a water molecule, H₂O, formed at the cathode' });
        });
      });
    }
    lamp(ctx, 700, WY, run);
    hits.push({ x: 700, y: WY - 34, r: 46, name: 'a lamp, lit by the electric current' });

    /* names */
    text(ctx, 'fuel in', 24, 190, ink, { size: 24 }); text(ctx, 'excess', 24, 494, ink, { size: 24 }); text(ctx, 'fuel out', 24, 522, ink, { size: 24 });
    text(ctx, 'air in', 1376, 190, ink, { size: 24, align: 'right' }); text(ctx, 'unused', 1376, 494, ink, { size: 24, align: 'right' }); text(ctx, 'gases out', 1376, 522, ink, { size: 24, align: 'right' });
    text(ctx, 'electric current', 700, WY + 32, ink, { size: 24, align: 'center' });
    F.faded(ctx, run, [0, 0], () => {
      F.arrow(ctx, AX - 24, 172, AX - 24, 118, alpha(ink, 0.75), 3); text(ctx, 'e⁻', AX - 52, 145, ink, { size: 24, align: 'center' });
      F.arrow(ctx, CX + 24, 118, CX + 24, 172, alpha(ink, 0.75), 3); text(ctx, 'e⁻', CX + 52, 145, ink, { size: 24, align: 'center' });
      F.arrow(ctx, 664, 222, 736, 222, alpha(ink, 0.75), 3); text(ctx, 'H⁺', 700, 248, ink, { size: 24, align: 'center' });
    });
    text(ctx, 'anode', AX, 700, ink, { size: 24, align: 'center', weight: 600 });
    text(ctx, 'electrolyte', 700, 700, ink, { size: 24, align: 'center' });
    text(ctx, 'cathode', CX, 700, ink, { size: 24, align: 'center', weight: 600 });
    text(ctx, 'oxidation: $2\\text{H}_{2}\\longrightarrow 4\\text{H}^{+}+4\\text{e}^{-}$', 620, 736, ink, { size: 22, align: 'right', tex: true });
    text(ctx, 'reduction: $\\text{O}_{2}+4\\text{H}^{+}+4\\text{e}^{-}\\longrightarrow 2\\text{H}_{2}\\text{O}$', 780, 736, ink, { size: 22, align: 'left', tex: true });
    F.legend(ctx, { l: 0, r: 1400, t: 760, b: 814 }, [
      { s: 'H_{2}', draw: (c, x, y) => glyph(c, 'H2', x, y) }, { s: 'O_{2}', draw: (c, x, y) => glyph(c, 'O2', x, y) },
      { s: 'N_{2}', draw: (c, x, y) => glyph(c, 'N2', x, y) }, { s: 'H_{2}O', draw: (c, x, y) => glyph(c, 'H2O', x, y - 4) },
      { s: 'H⁺', draw: (c, x, y) => hplus(c, x, y) }, { s: 'e⁻', draw: (c, x, y) => electron(c, x, y) },
      { s: 'platinum catalyst', draw: (c, x, y) => island(c, x, y) },
    ], { corner: 'bottom', row: true, panel: false, size: 21 });
    d.hits = hits;
    const rxn = '2\\text{H}_{2}(g)+\\text{O}_{2}(g)\\longrightarrow 2\\text{H}_{2}\\text{O}(g)';
    out.set(mode.value === 'off' ? rxn : `${rxn} \\\\ \\kEcell\\sim ${hue('potential', '1.2\\ \\text{V}')}`,
      mode.value === 'off' ? 'With no hydrogen coming in the current stops: the cell stores no fuel of its own.' : mode.value === 'open' ? 'With the circuit open the electrons have no path to the cathode, so the hydrogen leaves unreacted.' : '');
  }
  F.hover(d.stage, () => d.hits || []);
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();
};
