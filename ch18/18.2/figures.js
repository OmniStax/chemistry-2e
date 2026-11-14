/* Figures for section 18.2 Occurrence and Preparation of the Representative Metals. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['18.2'] = function (root, F) {
const { PAL, alpha, register, begin, text, line, arrow, headline } = F;
const sim = (id, H) => F.sim(root, id, H);
const TAU = 2 * Math.PI;
const clamp01 = (x) => Math.min(1, Math.max(0, x));
const lerp = (a, b, k) => a + (b - a) * k;
const rnd = (k, j) => { const s = Math.sin(k * 127.1 + j * 311.7) * 43758.5453; return s - Math.floor(s); };
const ease = F.ease.smooth;
/* graphite and the molten metals in their own colours, the same in both themes; chlorine's yellow-green for the gas in the hood */
const GRAPHITE = '#3a3d42', MOLTEN_METAL = '#c9ced6', CHLORINE = '#c9dc6a';

/* a polyline walked by arc length: at(k) for k in 0..1 */
function path(pts) {
  const seg = pts.slice(1).map((p, i) => Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1])), L = seg.reduce((a, b) => a + b, 0);
  return { L, at(k) { let s = clamp01(k) * L, i = 0; while (i < seg.length - 1 && s > seg[i]) { s -= seg[i]; i++; } const f = Math.min(1, s / (seg[i] || 1)); return [lerp(pts[i][0], pts[i + 1][0], f), lerp(pts[i][1], pts[i + 1][1], f)]; } };
}
/* where a particle is at time t on timed legs [[t0, t1, from, to | fn]]: eased along each, or null outside them */
function legs(list, t) {
  for (const [t0, t1, a, b] of list) if (t >= t0 && t <= t1) { const k = ease((t - t0) / (t1 - t0)); return typeof a === 'function' ? a(k) : [lerp(a[0], b[0], k), lerp(a[1], b[1], k)]; }
  return null;
}
/* an atom or ion as a shaded ball in the element palette; an ion carries its charge as a small mark at its upper right */
function ball(ctx, x, y, sym, r, a = 1, charge = 0) {
  if (a <= 0.01) return;
  ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fillStyle = F.el(sym); ctx.fill();
  ctx.lineWidth = sym === 'H' ? 1.6 : 1.2; ctx.strokeStyle = sym === 'H' ? PAL.ink : alpha(PAL.ink, 0.45); ctx.stroke();
  if (charge) {
    const mx = x + r * 0.78 + 5, my = y - r * 0.78 - 5;
    ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(mx - 4, my); ctx.lineTo(mx + 4, my);
    if (charge > 0) { ctx.moveTo(mx, my - 4); ctx.lineTo(mx, my + 4); }
    ctx.stroke();
  }
  ctx.restore();
}
/* a molecule: atoms [symbol, radius, dx, dy] about (x, y) */
function mol(ctx, x, y, atoms, a = 1, charge = 0) {
  atoms.forEach(([s, r, dx, dy], i) => ball(ctx, x + dx, y + (dy || 0), s, r, a, i === atoms.length - 1 ? charge : 0));
}
const CL2 = [['Cl', 10, -8], ['Cl', 10, 8]], H2 = [['H', 6, -5], ['H', 6, 5]], H2O = [['O', 9, 0, -2], ['H', 5.5, -9, 5], ['H', 5.5, 9, 5]];
const OH = [['H', 5.5, -9, 3], ['O', 9, 0, 0]];
const O2 = [['O', 9, -7], ['O', 9, 7]], CO = [['C', 9.5, -7.5], ['O', 9, 7.5]], CO2 = [['O', 9, -15], ['C', 9.5, 0], ['O', 9, 15]];
/* a part's name: a leader from the part to the text */
function callout(ctx, s, x0, y0, x1, y1, o = {}) {
  line(ctx, x0, y0, x1, y1, PAL.ink, 1.8);
  text(ctx, s, x1 + (o.align === 'right' ? -8 : o.align === 'center' ? 0 : 8), y1 + (o.dy || 0), o.color || PAL.ink, { size: o.size || 22, align: o.align || 'left', bg: PAL.panel });
}
function stroke(ctx, pts, color, w, close) {
  ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = w; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  ctx.beginPath(); pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); if (close) ctx.closePath(); ctx.stroke(); ctx.restore();
}
function fill(ctx, pts, color) {
  ctx.save(); ctx.fillStyle = color; ctx.beginPath(); pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.closePath(); ctx.fill(); ctx.restore();
}
function rect(ctx, l, t, r, b, fillC, strokeC, w = 2) {
  ctx.save(); if (fillC) { ctx.fillStyle = fillC; ctx.fillRect(l, t, r - l, b - t); }
  if (strokeC) { ctx.strokeStyle = strokeC; ctx.lineWidth = w; ctx.strokeRect(l, t, r - l, b - t); } ctx.restore();
}
/* a pipe of bore 2h along a polyline: an ink wall round a bore of the given colour */
function pipe(ctx, pts, h, bore) {
  ctx.save(); ctx.lineJoin = 'round'; ctx.lineCap = 'butt';
  ctx.beginPath(); pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
  ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2 * h + 5; ctx.stroke(); ctx.strokeStyle = bore; ctx.lineWidth = 2 * h; ctx.stroke(); ctx.restore();
}

/* =====================================================================
   FIGURE 18.10: a Downs cell in section, flat as the book draws it. A
   steel shell holds the melt; the graphite anode stands up through the
   floor in the middle, the iron screen round it, the ring cathode
   outside the screen (cut twice by the section, so a bar each side) with
   its connection through the wall; the hood over the screen carries
   chlorine up and out of the Cl₂ outlet; a collector over the cathode
   gathers the liquid sodium, which rises up a pipe to the reservoir and
   leaves by the Na outlet. Moving on a 6.4 s clock: eight events, each
   one Na⁺ to each side of the cathode and two Cl⁻ to the anode, where
   they pair as Cl₂ and rise up the hood; electrons run round the wire
   from the anode to the source and on to the cathode. Aqueous: the Na⁺
   ions wait at the cathode while water there gives H₂ and OH⁻.
===================================================================== */
(function () {
  const d = sim('sim-downs-cell', 800);
  const T = 6.4, NEV = 8, MIG = 1.1;
  const tk = (k) => 1.0 + k * 0.56;
  /* the cell, in canvas units */
  const CX = 620, SL = 330, SR = 930, ST = 300, SB = 650, W = 24;               /* shell outside; wall */
  const IL = SL + W, IR = SR - W, IT = ST + W, IB = SB - W;                     /* inside */
  const MS = 372;                                                                /* the melt's surface */
  const SCR = 122, SCT = 468, SCB = 604;                                         /* iron screen: half width, top, bottom */
  const AW = 62, AT = 506, AB = 548, RW = 18;                                    /* anode block half width, top, bottom; rod half width */
  const KX = 190, KW = 11, KT = 514, KB = 598;                                   /* cathode bars: centre offset, half width, top, bottom */
  const COLW = 30, COLT = 452, COLB = 492;                                       /* collector: half width, top, bottom of its skirt */
  const NECK = 34, PT = 118, PB = 162, PX = 1010;                               /* hood neck half width; Cl₂ pipe top, bottom, end */
  const RIS = 8, RY = 262, RES = { l: 1004, r: 1086, t: 222, m: 322, b: 380 };  /* Na riser half bore and its run; reservoir */
  const ROD = 556;                                                               /* height of the cathode's connection */
  const VS = { l: 1040, r: 1190, t: 600, b: 680 };                               /* voltage source */
  const VX = (VS.l + VS.r) / 2, WY = 732;
  const WIRE = path([[CX, 700], [CX, WY], [VX, WY], [VX, VS.b], [VX, VS.t], [VX, ROD], [SR + 46, ROD]]);
  const hoodHalf = (y) => (y >= 410 ? lerp(NECK, SCR + 4, (y - 410) / (SCT - 410)) : NECK);
  const pick = F.choice(d.controls, {
    label: '\\text{electrolyte}', options: [{ value: 'molten', label: 'molten NaCl' }, { value: 'aqueous', label: 'aqueous NaCl' }],
    value: 'molten', aria: 'the electrolyte in the cell', onInput: () => cy.reset(),
  });
  const cy = F.cycle(() => T, 1.4);
  const ro = F.readout(d);
  const hits = []; F.hover(d.stage, () => hits);

  /* the ions that stay in the melt, at fixed places with a small thermal jitter */
  const free = (x, y) => !(Math.abs(x - CX) < AW + 16 && y > AT - 14) && !(Math.abs(Math.abs(x - CX) - KX) < KW + 18 && y > COLT - 10)
    && !(Math.abs(Math.abs(x - CX) - SCR) < 14 && y > SCT - 8) && !(Math.abs(x - CX) < SCR + 8 && y < SCT && y > MS - 4 && Math.abs(x - CX) > hoodHalf(y) - 16);
  const STAY = [];
  for (let i = 0; STAY.length < 22 && i < 400; i++) {
    const x = IL + 20 + rnd(i, 1) * (IR - IL - 40), y = MS + 26 + rnd(i, 2) * (IB - MS - 40);
    if (free(x, y) && STAY.every((s) => Math.hypot(s.x - x, s.y - y) > 40)) STAY.push({ x, y, na: STAY.length % 2 === 0, ph: rnd(i, 3) * TAU });
  }
  /* the events: one Na⁺ to each side of the cathode, two Cl⁻ to the anode */
  const EV = Array.from({ length: NEV }, (_, k) => {
    const na = [-1, 1].map((s, i) => {
      const y = KT + 14 + rnd(k, 5 + i) * (KB - KT - 28), inside = rnd(k, 9 + i) < 0.5;
      const x0 = CX + s * (inside ? AW + 22 + rnd(k, 11 + i) * 26 : SCR + 18 + rnd(k, 13 + i) * 20);
      return { s, y, p0: [x0, y + (rnd(k, 15 + i) - 0.5) * 30], p1: [CX + s * (KX - KW - 9), y], stop: [CX + s * (KX - KW - 30), y] };
    });
    const s = k % 2 ? 1 : -1, ax = CX + s * (8 + rnd(k, 21) * (AW - 22));
    const cl = [0, 1].map((i) => {
      const out = rnd(k, 23 + i) < 0.6, y0 = SCT + 20 + rnd(k, 25 + i) * (SCB - SCT - 40);
      const x0 = CX + s * (out ? SCR + 18 + rnd(k, 27 + i) * 26 : AW + 26 + rnd(k, 29 + i) * 22) * (i ? 1 : 1) + (i ? 14 : -14) * s;
      return { p0: [x0, y0], p1: [ax + (i ? 9 : -9), AT - 12] };
    });
    const up = path([[ax, AT - 14], [lerp(ax, CX, 0.6), 420], [CX + s * 8, 380], [CX + s * 6, 200], [CX + 40, PT + 22], [PX + 10, PT + 22]]);
    return { na, cl, ax, up, side: s };
  });

  function draw() {
    const { ctx } = begin(d.c);
    hits.length = 0;
    const t = cy.now(), aq = pick.value === 'aqueous';
    const carbon = F.fact(GRAPHITE), metal = F.fact(MOLTEN_METAL), cl2gas = alpha(F.fact(CHLORINE), 0.32), steel = F.mixColor(PAL.ink, PAL.panel, 0.55);
    const done = EV.filter((_, k) => tk(k) + 0.05 <= t).length;
    const melt = alpha(PAL.muted, aq ? 0.13 : 0.2);
    /* the melt, and the gas above it inside the hood and its pipe */
    rect(ctx, IL, MS, IR, IB, melt);
    line(ctx, IL, MS, CX - NECK - 1, MS, alpha(PAL.ink, 0.45), 1.5); line(ctx, CX + NECK + 1, MS, IR, MS, alpha(PAL.ink, 0.45), 1.5);
    fill(ctx, [[CX - NECK, MS], [CX - NECK, PB - 20], [CX - NECK + 20, PT], [PX, PT], [PX, PB], [CX + NECK, PB], [CX + NECK, MS]], cl2gas);
    /* the collectors: liquid sodium gathered under each, deeper as it comes */
    const pool = aq ? 0 : 6 + 22 * clamp01(done / NEV);
    [-1, 1].forEach((s) => {
      const x = CX + s * KX;
      rect(ctx, x - COLW + 3, COLT + 3, x + COLW - 3, COLT + 3 + pool, metal);
      stroke(ctx, [[x - COLW, COLB], [x - COLW, COLT], [x + COLW, COLT], [x + COLW, COLB]], steel, 5);
      hits.push({ x, y: COLT + 14, r: 26, name: aq ? 'the collector over the cathode' : 'the collector over the cathode, where liquid sodium gathers' });
    });
    /* the hood over the screen, its neck and the Cl₂ pipe */
    stroke(ctx, [[CX - SCR - 4, SCT], [CX - NECK, 410], [CX - NECK, PB - 20], [CX - NECK + 20, PT], [PX, PT]], PAL.ink, 3);
    stroke(ctx, [[CX + SCR + 4, SCT], [CX + NECK, 410], [CX + NECK, PB], [PX, PB]], PAL.ink, 3);
    stroke(ctx, [[PX, PT], [PX, PB]], alpha(PAL.ink, 0.4), 1.5);
    arrow(ctx, PX + 18, (PT + PB) / 2, PX + 92, (PT + PB) / 2, PAL.ink, 4);
    text(ctx, 'Cl₂ outlet', PX + 104, (PT + PB) / 2, PAL.ink, { size: 22 });
    for (let y = 420; y < SCT; y += 12) hits.push({ x: CX - hoodHalf(y), y, r: 10, name: 'the hood, which carries chlorine to its outlet' }, { x: CX + hoodHalf(y), y, r: 10, name: 'the hood, which carries chlorine to its outlet' });
    for (let x = CX + 60; x < PX; x += 40) hits.push({ x, y: (PT + PB) / 2, r: 22, name: 'the pipe to the chlorine outlet' });
    /* the sodium riser, the reservoir and the Na outlet */
    pipe(ctx, [[CX + KX, COLT], [CX + KX, RY], [RES.l + 6, RY]], RIS, aq ? PAL.panel : alpha(metal, 0.55));
    const resPath = [[RES.l, RES.t], [RES.r, RES.t], [RES.r, RES.m], [(RES.l + RES.r) / 2 + 12, RES.b], [(RES.l + RES.r) / 2 - 12, RES.b], [RES.l, RES.m]];
    pipe(ctx, [[(RES.l + RES.r) / 2, RES.b - 4], [(RES.l + RES.r) / 2, 410], [1120, 410]], RIS, aq ? PAL.panel : alpha(metal, 0.55));
    fill(ctx, resPath, PAL.panel);
    const level = aq ? 0 : clamp01(0.25 + 0.6 * clamp01((done - 0.5) / NEV));
    if (level > 0) {
      ctx.save(); ctx.beginPath(); resPath.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.closePath(); ctx.clip();
      const top = RES.b - level * (RES.b - RES.t); rect(ctx, RES.l, top, RES.r, RES.b, metal); line(ctx, RES.l, top, RES.r, top, alpha(PAL.ink, 0.4), 1.5); ctx.restore();
    }
    stroke(ctx, resPath, PAL.ink, 3, true);
    arrow(ctx, 1128, 410, 1196, 410, PAL.ink, 4);
    text(ctx, 'Na outlet', 1206, 410, PAL.ink, { size: 22 });
    text(ctx, aq ? 'reservoir' : 'liquid Na', RES.r + 14, (RES.t + RES.m) / 2, PAL.ink, { size: 22 });
    hits.push({ x: (RES.l + RES.r) / 2, y: (RES.t + RES.m) / 2, r: 40, name: aq ? 'the reservoir for liquid sodium, empty' : 'the reservoir of liquid sodium' });
    for (let y = RY; y < COLT; y += 30) hits.push({ x: CX + KX, y, r: 12, name: 'the pipe that carries liquid sodium up to the reservoir' });
    /* the steel shell: walls, floor and the lid, through which the neck, the riser and the NaCl inlet pass */
    ctx.save(); ctx.fillStyle = steel; ctx.beginPath(); ctx.rect(SL, ST, SR - SL, SB - ST); ctx.rect(IR, IT, IL - IR, IB - IT); ctx.fill('evenodd'); ctx.restore();
    rect(ctx, CX - NECK, ST - 1, CX + NECK, IT + 1, PAL.panel); fill(ctx, [[CX - NECK, ST - 1], [CX + NECK, ST - 1], [CX + NECK, IT + 1], [CX - NECK, IT + 1]], cl2gas);
    rect(ctx, CX + KX - RIS, ST - 1, CX + KX + RIS, IT + 1, aq ? PAL.panel : alpha(metal, 0.55));
    line(ctx, CX - NECK, ST - 2, CX - NECK, IT + 2, PAL.ink, 3); line(ctx, CX + NECK, ST - 2, CX + NECK, IT + 2, PAL.ink, 3);
    line(ctx, CX + KX - RIS - 2.5, ST - 2, CX + KX - RIS - 2.5, IT + 2, PAL.ink, 3); line(ctx, CX + KX + RIS + 2.5, ST - 2, CX + KX + RIS + 2.5, IT + 2, PAL.ink, 3);
    const NI = CX + 112;
    rect(ctx, NI - 30, ST - 14, NI + 30, ST, steel); rect(ctx, NI - 7, ST - 50, NI + 7, ST - 14, PAL.panel, PAL.ink, 2.5);
    text(ctx, 'NaCl inlet', NI, ST - 74, PAL.ink, { size: 22, align: 'center' });
    hits.push({ x: NI, y: ST - 24, r: 26, name: 'the inlet for NaCl' });
    [[SL + 12, 460], [SR - 12, 460], [480, SB - 12], [780, SB - 12], [470, ST + 12], [800, ST + 12]].forEach(([x, y]) => hits.push({ x, y, r: 14, name: 'the steel shell of the cell' }));
    /* the iron screen, a mesh round the anode */
    ctx.save(); ctx.strokeStyle = alpha(PAL.ink, 0.5); ctx.lineWidth = 1.5; ctx.beginPath();
    for (let i = 0; i <= 14; i++) { const x = CX + SCR * Math.sin(-Math.PI / 2 + (Math.PI * i) / 14); ctx.moveTo(x, SCT); ctx.lineTo(x, SCB); }
    for (let y = SCT; y <= SCB + 1; y += 12) { ctx.moveTo(CX - SCR, y); ctx.quadraticCurveTo(CX, y + 22, CX + SCR, y); }
    ctx.stroke(); ctx.restore();
    line(ctx, CX - SCR, SCT, CX - SCR, SCB, PAL.ink, 2.5); line(ctx, CX + SCR, SCT, CX + SCR, SCB, PAL.ink, 2.5);
    for (let y = SCT + 10; y < SCB; y += 24) [-1, 1].forEach((s) => hits.push({ x: CX + s * SCR, y, r: 10, name: 'the iron screen, which lets the ions through and keeps sodium and chlorine apart' }));
    /* the cathode, a ring cut twice by the section, and its connection through the wall */
    [-1, 1].forEach((s) => {
      const x = CX + s * KX;
      rect(ctx, x - KW, KT, x + KW, KB, steel, PAL.ink, 2);
      hits.push({ x, y: (KT + KB) / 2, r: 22, name: 'the cathode (−), a ring round the screen, where ' + (aq ? 'water is reduced' : 'Na⁺ ions are reduced') });
      const x1 = s < 0 ? SL - 46 : SR + 46, xa = s < 0 ? x - KW : x + KW;
      rect(ctx, Math.min(xa, x1), ROD - 7, Math.max(xa, x1), ROD + 7, steel, PAL.ink, 2);
      hits.push({ x: s < 0 ? SL - 20 : SR + 22, y: ROD, r: 16, name: 'the cathode’s connection through the wall' });
    });
    /* the anode: a graphite block on a rod through the floor */
    rect(ctx, CX - RW, AB, CX + RW, 700, carbon, PAL.ink, 2); rect(ctx, CX - AW, AT, CX + AW, AB, carbon, PAL.ink, 2);
    hits.push({ x: CX, y: (AT + AB) / 2, r: 40, name: 'the graphite anode (+), where Cl⁻ ions are oxidized to Cl₂' }, { x: CX, y: 620, r: 20, name: 'the rod of the anode' });
    /* the external circuit and the voltage source */
    stroke(ctx, [[CX, 700], [CX, WY], [VX, WY], [VX, VS.b]], PAL.ink, 3); stroke(ctx, [[VX, VS.t], [VX, ROD], [SR + 46, ROD]], PAL.ink, 3);
    ctx.save(); ctx.fillStyle = PAL.panel; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.roundRect(VS.l, VS.t, VS.r - VS.l, VS.b - VS.t, 6); ctx.fill(); ctx.stroke(); ctx.restore();
    text(ctx, 'voltage', VX, VS.t + 26, PAL.ink, { size: 19, align: 'center' }); text(ctx, 'source', VX, VS.t + 52, PAL.ink, { size: 19, align: 'center' });
    hits.push({ x: VX, y: (VS.t + VS.b) / 2, r: 50, name: 'the voltage source' });
    for (let x = CX + 40; x < VX; x += 60) hits.push({ x, y: WY, r: 12, name: 'the wire of the external circuit' });

    /* the particles */
    const jig = (s, a) => [s.x + 3 * Math.sin(t * 5.1 + s.ph) * a, s.y + 3 * Math.cos(t * 4.3 + s.ph * 1.7) * a];
    STAY.forEach((s) => { const [x, y] = jig(s, 1); if (s.na) ball(ctx, x, y, 'Na', 8, 1, 1); else ball(ctx, x, y, 'Cl', 13, 1, -1); hits.push({ x, y, r: 14, name: s.na ? 'a sodium ion, Na⁺' : 'a chloride ion, Cl⁻' }); });
    if (aq) STAY.forEach((s, i) => { if (i % 3) return; const x = s.x + 26, y = s.y - 18; if (!free(x, y)) return; mol(ctx, x, y, H2O); hits.push({ x, y, r: 12, name: 'a water molecule, H₂O' }); });
    EV.forEach((ev, k) => {
      const t0 = tk(k);
      ev.na.forEach((s) => {
        if (aq) {
          const p = legs([[0, t0 - MIG, s.p0, s.p0], [t0 - MIG, t0, s.p0, s.stop], [t0, 99, s.stop, s.stop]], t);
          ball(ctx, p[0], p[1], 'Na', 8, 1, 1); hits.push({ x: p[0], y: p[1], r: 12, name: 'a sodium ion, Na⁺, not reduced' });
          return;
        }
        if (t < t0) { const p = legs([[0, t0 - MIG, s.p0, s.p0], [t0 - MIG, t0, s.p0, s.p1]], t); ball(ctx, p[0], p[1], 'Na', 8, 1, 1); hits.push({ x: p[0], y: p[1], r: 12, name: 'a sodium ion, Na⁺, moving to the cathode' }); return; }
        const top = [CX + s.s * KX, COLT + 10 + pool * 0.5];
        const p = legs([[t0, t0 + 0.25, s.p1, s.p1], [t0 + 0.25, t0 + 1.0, s.p1, [s.p1[0], COLB + 6]], [t0 + 1.0, t0 + 1.4, [s.p1[0], COLB + 6], top]], t);
        if (p) { ball(ctx, p[0], p[1], 'Na', 12, t > t0 + 1.1 ? clamp01((t0 + 1.4 - t) / 0.3) : 1); hits.push({ x: p[0], y: p[1], r: 14, name: 'a sodium atom, Na, rising as liquid sodium' }); }
        if (s.s > 0) {
          /* a drop of liquid sodium up the riser to the reservoir */
          const rp = path([[CX + KX, COLT - 2], [CX + KX, RY], [RES.l + 10, RY], [(RES.l + RES.r) / 2, RY + 40]]);
          const q = legs([[t0 + 1.4, t0 + 2.4, rp.at, null]], t);
          if (q) ball(ctx, q[0], q[1], 'Na', 7, t > t0 + 2.2 ? clamp01((t0 + 2.4 - t) / 0.2) : 1);
        }
      });
      if (aq) {
        /* at the cathode two water molecules give H₂, which rises into the collector, and two OH⁻ ions that stay */
        const s = ev.side, x = CX + s * (KX - KW - 12), y = KT + 18 + rnd(k, 41) * (KB - KT - 36);
        if (t < t0) [[0, -10], [-4, 12]].forEach(([dx, dy]) => mol(ctx, x - s * 4 + dx, y + dy, H2O));
        else {
          [[-s * 14, -10], [-s * 18, 14]].forEach(([dx, dy]) => { mol(ctx, x + dx, y + dy, OH, 1, -1); hits.push({ x: x + dx, y: y + dy, r: 12, name: 'a hydroxide ion, OH⁻' }); });
          const q = legs([[t0, t0 + 1.0, [x, y], [CX + s * KX, COLB + 4]], [t0 + 1.0, t0 + 1.3, [CX + s * KX, COLB + 4], [CX + s * KX, COLT + 14]]], t);
          if (q) { mol(ctx, q[0], q[1], H2, Math.min(clamp01((t - t0) / 0.2), clamp01((t0 + 1.3 - t) / 0.25))); hits.push({ x: q[0], y: q[1], r: 12, name: 'a hydrogen molecule, H₂' }); }
        }
      }
      if (t < t0) ev.cl.forEach((c) => { const p = legs([[0, t0 - MIG, c.p0, c.p0], [t0 - MIG, t0, c.p0, c.p1]], t); ball(ctx, p[0], p[1], 'Cl', 13, 1, -1); hits.push({ x: p[0], y: p[1], r: 14, name: 'a chloride ion, Cl⁻, moving to the anode' }); });
      else {
        const q = legs([[t0, t0 + 2.0, ev.up.at, null]], t);
        if (q) { mol(ctx, q[0], q[1], CL2, t > t0 + 1.8 ? clamp01((t0 + 2.0 - t) / 0.2) : 1); hits.push({ x: q[0], y: q[1], r: 18, name: 'a chlorine molecule, Cl₂' }); }
      }
    });
    /* electrons round the circuit, from the anode through the source to the cathode */
    for (let i = 0; i < 18; i++) {
      const p = WIRE.at(((i / 18) + t * 0.09) % 1);
      if (p[0] > VS.l - 4 && p[0] < VS.r + 4 && p[1] > VS.t - 4 && p[1] < VS.b + 4) continue;
      F.dot(ctx, p[0], p[1], F.el('e-'), true, 5.5); hits.push({ x: p[0], y: p[1], r: 9, name: 'an electron, e⁻, in the wire' });
    }

    /* names of the parts */
    callout(ctx, aq ? 'aqueous NaCl' : 'molten NaCl', IL + 40, 420, SL - 30, 420, { align: 'right' });
    callout(ctx, 'iron screen', CX - SCR, 501, SL - 30, 501, { align: 'right' });
    callout(ctx, 'cathode (−)', CX - KX, KB, CX - KX - 40, 690, { align: 'right', dy: 8 });
    callout(ctx, 'anode (+)', CX + RW, 672, CX + 92, 690, { dy: 0 });
    hits.push({ x: IL + 70, y: 590, r: 30, name: aq ? 'a solution of NaCl in water' : 'molten sodium chloride, with calcium chloride to lower its melting point' });

    headline(ctx, aq
      ? 'In aqueous solution water is reduced at the cathode in place of Na⁺, so hydrogen forms instead of sodium.'
      : 'Na⁺ is reduced at the cathode and Cl⁻ is oxidized at the anode; the iron screen keeps the sodium and the chlorine apart.');
    F.legend(ctx, { l: 20, r: 1380, t: 744, b: 798 }, (aq
      ? [['Na⁺', (c, x, y) => ball(c, x, y, 'Na', 8, 1, 1)], ['Cl⁻', (c, x, y) => ball(c, x, y, 'Cl', 11, 1, -1)], ['H₂O', (c, x, y) => mol(c, x, y, H2O)], ['H₂', (c, x, y) => mol(c, x, y, H2)], ['OH⁻', (c, x, y) => mol(c, x, y, OH, 1, -1)], ['Cl₂', (c, x, y) => mol(c, x, y, CL2)], ['e⁻', (c, x, y) => F.dot(c, x, y, F.el('e-'), true, 5.5)]]
      : [['Na⁺', (c, x, y) => ball(c, x, y, 'Na', 8, 1, 1)], ['Cl⁻', (c, x, y) => ball(c, x, y, 'Cl', 11, 1, -1)], ['Na', (c, x, y) => ball(c, x, y, 'Na', 11)], ['Cl₂', (c, x, y) => mol(c, x, y, CL2)], ['e⁻', (c, x, y) => F.dot(c, x, y, F.el('e-'), true, 5.5)]]
    ).map(([s, draw]) => ({ s, draw })), { corner: 'bottom', row: true, panel: false });

    const n = Math.max(1, done), co = (x) => (x === 1 ? '' : String(x));
    const tex = aq
      ? `\\mk{w}{${co(2 * n)}\\text{H}_{2}\\text{O}(l)} + \\mk{cl}{${co(2 * n)}\\text{Cl}^{-}} \\longrightarrow \\mk{h}{${co(n)}\\text{H}_{2}(g)} + \\mk{c2}{${co(n)}\\text{Cl}_{2}(g)} + \\mk{oh}{${co(2 * n)}\\text{OH}^{-}}`
      : `\\mk{na}{${co(2 * n)}\\text{Na}^{+}} + \\mk{cl}{${co(2 * n)}\\text{Cl}^{-}} \\longrightarrow \\mk{nal}{${co(2 * n)}\\text{Na}(l)} + \\mk{c2}{${co(n)}\\text{Cl}_{2}(g)}`;
    if (tex !== draw.last) { draw.last = tex; ro.set(tex, '', { form: aq, values: false }); }
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();

/* =====================================================================
   FIGURE 18.11: a Hall–Héroult cell in section, flat as the book draws
   it: a steel shell lined with ceramic, the carbon cathode on its floor
   with its collector bar out through the side, the pool of molten
   aluminum on the cathode, Al₂O₃ dissolved in molten cryolite above it
   under a crust, two carbon anodes dipping into the melt on their rods
   and the bus bar to the + terminal, and the hood whose exhaust leads
   up to the filter plant. Moving on a 6.4 s clock: twelve Al³⁺ ions
   drift down and join the pool, which deepens; nine O²⁻ ions drift up to
   the anodes, where O₂, CO or CO₂ forms and rises past the anode,
   through the crust and out of the exhaust. The book draws no external
   circuit, only the two terminals, so no electrons are drawn.
===================================================================== */
(function () {
  const d = sim('sim-hall-heroult', 820);
  const T = 6.4, NA = 12, NO = 9, MIG = 1.2;
  const ta = (k) => 0.5 + k * 0.4, to = (k) => 0.4 + k * 0.5;
  /* the cell, in canvas units */
  const SL = 250, SR = 1030, ST = 360, SB = 740;                  /* steel shell outside */
  const CL = 292, CR = 988, CB = 700;                              /* ceramic lining outside (its floor's top at CB − 34) */
  const ML = 352, MR = 928;                                        /* the melt's walls (ceramic inside) */
  const CT = 368;                                                  /* top of the ceramic and of the melt's crust */
  const KT = 618, KB = 664;                                        /* carbon cathode */
  const AL0 = 580, AL1 = 548;                                      /* the aluminum's surface at the start and at the end */
  const CRB = 384;                                                 /* the crust's underside */
  const AN = [{ l: 410, r: 590 }, { l: 690, r: 870 }], AT = 330, ABOT = 520;
  const BUS = 200, HT = 130, EX = [326, 412];                      /* bus bar; hood top; exhaust opening */
  const yAl = (t) => lerp(AL0, AL1, clamp01((t - ta(0)) / (ta(NA - 1) - ta(0) + 0.3)));
  const KINDS = [[O2, 'an oxygen molecule, O₂'], [CO, 'a carbon monoxide molecule, CO'], [CO2, 'a carbon dioxide molecule, CO₂']];
  const cy = F.cycle(() => T, 1.4);
  const ro = F.readout(d);
  const hits = []; F.hover(d.stage, () => hits);
  const inAnode = (x, y, m) => AN.some((a) => x > a.l - m && x < a.r + m && y < ABOT + m);
  const STAY = [];
  for (let i = 0; STAY.length < 16 && i < 300; i++) {
    const x = ML + 24 + rnd(i, 51) * (MR - ML - 48), y = CRB + 24 + rnd(i, 52) * (AL0 - CRB - 44);
    if (!inAnode(x, y, 18) && STAY.every((s) => Math.hypot(s.x - x, s.y - y) > 44)) STAY.push({ x, y, al: STAY.length % 3 === 0, ph: rnd(i, 53) * TAU });
  }
  const ALS = Array.from({ length: NA }, (_, k) => {
    let x, y, j = 0;
    do { x = ML + 24 + rnd(k, 61 + j) * (MR - ML - 48); y = CRB + 30 + rnd(k, 62 + j) * (AL0 - CRB - 70); j += 2; } while (inAnode(x, y, 16) && j < 40);
    return { p0: [x, y], x };
  });
  const OS = Array.from({ length: NO }, (_, k) => {
    const a = AN[k % 2], under = rnd(k, 71) < 0.55, s = rnd(k, 72) < 0.5 ? -1 : 1;
    const ex = s < 0 ? a.l - 13 : a.r + 13;
    const p1 = under ? [lerp(a.l + 20, a.r - 20, rnd(k, 73)), ABOT + 12] : [ex, lerp(CRB + 40, ABOT - 20, rnd(k, 74))];
    const p0 = under ? [p1[0] + (rnd(k, 75) - 0.5) * 60, p1[1] + 34 + rnd(k, 76) * 22] : [ex + s * (30 + rnd(k, 77) * 40), p1[1] + (rnd(k, 78) - 0.5) * 50];
    const up = path([p1, ...(under ? [[ex, ABOT + 12]] : []), [ex, CT - 4], [ex, 300], [lerp(ex, (EX[0] + EX[1]) / 2, 0.6), 190], [(EX[0] + EX[1]) / 2, HT - 6], [(EX[0] + EX[1]) / 2, 64]]);
    return { p0, p1, up, kind: KINDS[k % 3] };
  });

  function draw() {
    const { ctx } = begin(d.c);
    hits.length = 0;
    const t = cy.now(), y = yAl(t), n = Math.max(1, ALS.filter((_, k) => ta(k) <= t).length);
    const carbon = F.fact(GRAPHITE), metal = F.fact(MOLTEN_METAL), steel = F.mixColor(PAL.ink, PAL.panel, 0.55), ceramic = F.mixColor(PAL.ink, PAL.panel, 0.82);
    /* the shell, the lining, the cathode, the aluminum, the melt and its crust */
    rect(ctx, SL, ST, SR, SB, steel, PAL.ink, 2);
    rect(ctx, CL, ST, CR, CB, ceramic, PAL.ink, 1.5);
    ctx.save(); const g = ctx.createLinearGradient(ML, 0, MR, 0);
    [[0, 0.3], [0.35, 0], [0.6, 0.22], [1, 0.05]].forEach(([at, k]) => g.addColorStop(at, F.mixColor(metal, PAL.ink, k)));
    ctx.fillStyle = g; ctx.fillRect(ML, y, MR - ML, KT - y); ctx.restore();
    line(ctx, ML, y, MR, y, alpha(PAL.ink, 0.6), 2);
    rect(ctx, ML, CRB, MR, y, alpha(PAL.muted, 0.12));
    rect(ctx, ML, CT, MR, CRB, F.mixColor(PAL.muted, PAL.panel, 0.55));
    line(ctx, ML, CT, ML, KT, PAL.ink, 1.5); line(ctx, MR, CT, MR, KT, PAL.ink, 1.5);
    rect(ctx, ML - 30, KT, MR + 30, KB, carbon, PAL.ink, 2);
    rect(ctx, SR - 20, KT + 12, SR + 70, KT + 26, steel, PAL.ink, 2); rect(ctx, SL - 70, KT + 22, ML - 30, KT + 36, steel, PAL.ink, 2);
    text(ctx, '−', SL - 84, KT + 29, PAL.ink, { size: 26, align: 'right', weight: 600 });
    hits.push({ x: SL - 40, y: KT + 29, r: 18, name: 'the cathode’s collector bar, to the negative terminal' }, { x: SR + 30, y: KT + 19, r: 16, name: 'the cathode’s collector bar' });
    /* the anodes on their rods, and the bus bar to the + terminal */
    AN.forEach((a) => {
      const c = (a.l + a.r) / 2;
      rect(ctx, a.l, AT, a.r, ABOT, carbon, PAL.ink, 2);
      [-48, 0, 48].forEach((dx) => rect(ctx, c + dx - 11, 262, c + dx + 11, AT + 30, F.mixColor(carbon, PAL.panel, 0.25), PAL.ink, 1.5));
      rect(ctx, c - 59, 250, c + 59, 268, F.mixColor(carbon, PAL.panel, 0.25), PAL.ink, 1.5);
      rect(ctx, c - 12, BUS, c + 12, 252, F.mixColor(carbon, PAL.panel, 0.25), PAL.ink, 1.5);
      text(ctx, 'carbon', c, (CT + ABOT) / 2 - 4, PAL.ink, { size: 20, align: 'center', bg: PAL.panel });
      text(ctx, 'anode (+)', c, (CT + ABOT) / 2 + 26, PAL.ink, { size: 20, align: 'center', bg: PAL.panel });
      hits.push({ x: c, y: (AT + ABOT) / 2, r: 70, name: 'a carbon anode (+), where O₂, CO and CO₂ form' }, { x: c, y: 255, r: 30, name: 'the anode’s rods' });
    });
    rect(ctx, (AN[0].l + AN[0].r) / 2 - 12, BUS - 8, 1120, BUS + 8, PAL.panel, PAL.ink, 2);
    text(ctx, '+', 1134, BUS, PAL.ink, { size: 26, weight: 600 });
    hits.push({ x: 1060, y: BUS, r: 20, name: 'the bus bar, to the positive terminal' });
    /* the hood and its exhaust, in outline as the book draws them */
    stroke(ctx, [[CL + 8, ST], [CL + 8, HT], [EX[0], HT], [EX[0], 88]], PAL.ink, 2.5);
    stroke(ctx, [[EX[1], 88], [EX[1], HT], [CR - 8, HT], [CR - 8, ST]], PAL.ink, 2.5);
    arrow(ctx, (EX[0] + EX[1]) / 2, 96, (EX[0] + EX[1]) / 2, 30, PAL.ink, 4);
    text(ctx, 'HF and particulates', EX[1] + 22, 52, PAL.ink, { size: 19 }); text(ctx, 'exhaust to filter plant', EX[1] + 22, 76, PAL.ink, { size: 19 });
    hits.push({ x: CL + 8, y: 250, r: 14, name: 'the hood over the cell' }, { x: CR - 8, y: 250, r: 14, name: 'the hood over the cell' }, { x: 700, y: HT, r: 14, name: 'the hood over the cell' });

    /* the ions that stay, Al³⁺ down to the aluminum, O²⁻ up to the anodes, and the gases off the anodes */
    STAY.forEach((s) => {
      const x = s.x + 3 * Math.sin(t * 5 + s.ph), yy = s.y + 3 * Math.cos(t * 4.2 + s.ph);
      if (s.al) ball(ctx, x, yy, 'Al', 7, 1, 1); else ball(ctx, x, yy, 'O', 11, 1, -1);
      hits.push({ x, y: yy, r: 13, name: s.al ? 'an aluminum ion, Al³⁺' : 'an oxide ion, O²⁻' });
    });
    ALS.forEach((s, k) => {
      const t0 = ta(k), land = [s.x, yAl(t0) - 2];
      const p = legs([[0, t0 - MIG, s.p0, s.p0], [t0 - MIG, t0, s.p0, land], [t0, t0 + 0.3, land, land]], t);
      if (p) { ball(ctx, p[0], p[1], 'Al', 7, t > t0 ? clamp01((t0 + 0.3 - t) / 0.3) : 1, t > t0 ? 0 : 1); hits.push({ x: p[0], y: p[1], r: 12, name: t > t0 ? 'an aluminum atom joining the molten aluminum' : 'an aluminum ion, Al³⁺, moving to the cathode' }); }
    });
    OS.forEach((s, k) => {
      const t0 = to(k);
      if (t < t0) { const p = legs([[0, t0 - MIG, s.p0, s.p0], [t0 - MIG, t0, s.p0, s.p1]], t); ball(ctx, p[0], p[1], 'O', 11, 1, -1); hits.push({ x: p[0], y: p[1], r: 13, name: 'an oxide ion, O²⁻, moving to an anode' }); return; }
      const q = legs([[t0, t0 + 2.4, s.up.at, null]], t);
      if (q) { mol(ctx, q[0], q[1], s.kind[0], Math.min(clamp01((t - t0) / 0.2), q[1] < 110 ? clamp01((q[1] - 64) / 46) : 1)); hits.push({ x: q[0], y: q[1], r: 18, name: s.kind[1] }); }
    });

    /* names of the parts, outside the cell as the book sets them */
    callout(ctx, 'ceramic', CL + 30, 440, 150, 440, { align: 'right' });
    callout(ctx, 'steel shell', SL + 18, 500, 150, 500, { align: 'right' });
    text(ctx, 'carbon cathode (−)', 640, (KT + KB) / 2, PAL.ink, { size: 20, align: 'center', bg: PAL.panel });
    callout(ctx, 'crust', 900, (CT + CRB) / 2, 1080, (CT + CRB) / 2);
    callout(ctx, 'Al₂O₃ in molten Na₃AlF₆', 905, 470, 1080, 470);
    callout(ctx, 'molten aluminum', 905, (AL0 + KT) / 2, 1080, (AL0 + KT) / 2);
    hits.push({ x: 640, y: KT + 22, r: 40, name: 'the carbon cathode (−), on which Al³⁺ ions are reduced' }, { x: 300, y: 600, r: 24, name: 'the ceramic lining' },
      { x: 780, y: (y + KT) / 2, r: 20, name: 'molten aluminum' }, { x: 640, y: 560, r: 24, name: 'aluminum oxide, Al₂O₃, dissolved in molten cryolite, Na₃AlF₆, with calcium fluoride' }, { x: 640, y: (CT + CRB) / 2, r: 14, name: 'the crust over the molten electrolyte' });
    F.legend(ctx, { l: 20, r: 1380, t: 762, b: 818 }, [
      ['Al³⁺', (c, x, yy) => ball(c, x, yy, 'Al', 7, 1, 1)], ['O²⁻', (c, x, yy) => ball(c, x, yy, 'O', 10, 1, -1)],
      ['O₂', (c, x, yy) => mol(c, x, yy, O2)], ['CO', (c, x, yy) => mol(c, x, yy, CO)], ['CO₂', (c, x, yy) => mol(c, x, yy, CO2)],
    ].map(([s, dr]) => ({ s, draw: dr })), { corner: 'bottom', row: true, panel: false });
    const co = (x) => (x === 1 ? '' : String(x));
    const tex = `\\mk{al}{${co(n)}\\text{Al}^{3+}} + \\mk{e}{${3 * n}\\text{e}^{-}} \\longrightarrow \\mk{all}{${co(n)}\\text{Al}(l)}`;
    if (tex !== draw.last) { draw.last = tex; ro.set(tex, '', { values: false }); }
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();
};
