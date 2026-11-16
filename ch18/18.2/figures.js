/* Figures for section 18.2 Occurrence and Preparation of the Representative Metals. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['18.2'] = function (root, F) {
const { PAL, alpha, cycle, register, begin, text, line, arrow } = F;
const sim = (id, H) => F.sim(root, id, H);
const TAU = 2 * Math.PI;
const clamp01 = (x) => Math.min(1, Math.max(0, x));
const lerp = (a, b, k) => a + (b - a) * k;
/* a fixed pseudo-random number in [0, 1) for item k and draw j, so every run draws the same */
const rnd = (k, j) => { const s = Math.sin(k * 127.1 + j * 311.7) * 43758.5453; return s - Math.floor(s); };
const smooth = F.ease.smooth;
/* graphite and the molten metals in their own colours, the same in both themes; chlorine's yellow-green for the gas */
const GRAPHITE = '#3a3d42', MOLTEN_METAL = '#c9ced6', CHLORINE = '#c9dc6a';

/* a polyline with each corner rounded to radius r, and a walker along it by arc length */
function rounded(pts, r) {
  const out = [pts[0]];
  for (let i = 1; i < pts.length - 1; i++) {
    const p = pts[i], a = pts[i - 1], b = pts[i + 1];
    const la = Math.hypot(a[0] - p[0], a[1] - p[1]), lb = Math.hypot(b[0] - p[0], b[1] - p[1]), q = Math.min(r, la / 2, lb / 2);
    const A = [p[0] + (a[0] - p[0]) * q / la, p[1] + (a[1] - p[1]) * q / la], B = [p[0] + (b[0] - p[0]) * q / lb, p[1] + (b[1] - p[1]) * q / lb];
    for (let s = 0; s <= 10; s++) { const t = s / 10; out.push([(1 - t) ** 2 * A[0] + 2 * (1 - t) * t * p[0] + t * t * B[0], (1 - t) ** 2 * A[1] + 2 * (1 - t) * t * p[1] + t * t * B[1]]); }
  }
  out.push(pts[pts.length - 1]); return out;
}
function walker(pts) {
  const seg = pts.slice(1).map((p, i) => Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1])), L = seg.reduce((a, b) => a + b, 0);
  const at = (s) => { s = Math.max(0, Math.min(L, s)); let i = 0; while (i < seg.length - 1 && s > seg[i]) { s -= seg[i]; i++; } const t = seg[i] ? s / seg[i] : 0; return [pts[i][0] + (pts[i + 1][0] - pts[i][0]) * t, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * t]; };
  return { L, at, pts };
}
const trace = (ctx, pts, close) => { ctx.beginPath(); pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); if (close) ctx.closePath(); };
function stroke(ctx, pts, color, w, close) {
  ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = w; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; trace(ctx, pts, close); ctx.stroke(); ctx.restore();
}
function fill(ctx, pts, color, edge, w = 2) {
  ctx.save(); ctx.fillStyle = color; ctx.lineJoin = 'round'; trace(ctx, pts, true); ctx.fill();
  if (edge) { ctx.strokeStyle = edge; ctx.lineWidth = w; ctx.stroke(); } ctx.restore();
}
function rect(ctx, l, t, r, b, color, edge, w = 2) {
  ctx.save(); if (color) { ctx.fillStyle = color; ctx.fillRect(l, t, r - l, b - t); }
  if (edge) { ctx.strokeStyle = edge; ctx.lineWidth = w; ctx.strokeRect(l, t, r - l, b - t); } ctx.restore();
}
/* a pipe of bore 2h along a polyline: an ink wall round a bore of the given colour */
function pipe(ctx, pts, h, bore) {
  ctx.save(); ctx.lineJoin = 'round'; ctx.lineCap = 'butt'; trace(ctx, pts);
  ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2 * h + 6; ctx.stroke(); ctx.strokeStyle = PAL.panel; ctx.lineWidth = 2 * h; ctx.stroke();
  ctx.strokeStyle = bore; ctx.stroke(); ctx.restore();
}
/* short dashes that move along a path, for a fluid flowing in a pipe */
function flow(ctx, pts, off, a = 0.4) {
  ctx.save(); ctx.strokeStyle = alpha(PAL.ink, a); ctx.lineWidth = 2.5; ctx.lineCap = 'round'; ctx.setLineDash([12, 26]); ctx.lineDashOffset = -off;
  trace(ctx, pts); ctx.stroke(); ctx.restore();
}
/* one atom: a filled ball with an ink rim */
function ball(ctx, x, y, r, c, a = 1) {
  if (a <= 0.01) return;
  ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = c; ctx.strokeStyle = alpha(PAL.ink, 0.6); ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore();
}
/* the page's ink or panel colour, whichever has the greater contrast on a ball of colour col */
function onBall(ctx, col) {
  const lin = (v) => (v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
  const lum = (c) => { ctx.save(); ctx.fillStyle = c; const h = String(ctx.fillStyle); ctx.restore(); const m = /^#(..)(..)(..)$/.exec(h); return m ? 0.2126 * lin(parseInt(m[1], 16) / 255) + 0.7152 * lin(parseInt(m[2], 16) / 255) + 0.0722 * lin(parseInt(m[3], 16) / 255) : 0.2; };
  const l = lum(col), ratio = (c) => { const k = lum(c); return (Math.max(k, l) + 0.05) / (Math.min(k, l) + 0.05); };
  return ratio(PAL.ink) >= ratio(PAL.panel) ? PAL.ink : PAL.panel;
}
/* an ion: its ball and the sign of its charge on it (q > 0 or q < 0); the sign fades with k */
function ion(ctx, x, y, r, el, q, a = 1, k = 1) {
  if (a <= 0.01) return;
  const col = F.el(el); ball(ctx, x, y, r, col, a);
  if (!q || k <= 0.01) return;
  const s = r * 0.52;
  ctx.save(); ctx.globalAlpha *= a * k; ctx.strokeStyle = onBall(ctx, col); ctx.lineWidth = Math.max(2, r * 0.2); ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(x - s, y); ctx.lineTo(x + s, y); if (q > 0) { ctx.moveTo(x, y - s); ctx.lineTo(x, y + s); } ctx.stroke(); ctx.restore();
}
/* an electron: a small ball in the electron's colour, rimmed in the page colour so it reads on a dark part */
function electron(ctx, x, y, a = 1) {
  if (a <= 0.01) return;
  ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = F.el('e-'); ctx.strokeStyle = PAL.panel; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.arc(x, y, 7, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore();
}
/* a drop of liquid metal or a bubble of gas: a ball of the stuff's own colour with a glint */
function blob(ctx, x, y, r, col, a = 1) {
  if (a <= 0.01) return;
  ball(ctx, x, y, r, col, a);
  ctx.save(); ctx.globalAlpha *= a * 0.8; ctx.strokeStyle = PAL.panel; ctx.lineWidth = 1.6; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.arc(x, y, r * 0.55, 1.15 * Math.PI, 1.5 * Math.PI); ctx.stroke(); ctx.restore();
}
/* particles spaced sp apart along a path and moved on by s: they enter at its start and leave at its end */
function conveyor(wk, sp, s, each) {
  for (let u = ((s % sp) + sp) % sp; u < wk.L; u += sp) { const [x, y] = wk.at(u); each(x, y, u); }
}
/* a part's name beside it, with a thin line that ends in a dot on the part */
function lead(ctx, s, tx, ty, px, py, o = {}) {
  const right = o.align === 'right', a = o.a ?? 1;
  if (a <= 0.01) return;
  ctx.save(); ctx.globalAlpha *= a;
  line(ctx, tx + (right ? 8 : -8), ty, px, py, alpha(PAL.ink, 0.6), 1.5);
  ctx.fillStyle = PAL.ink; ctx.beginPath(); ctx.arc(px, py, 3.2, 0, TAU); ctx.fill();
  text(ctx, s, tx, ty, PAL.ink, { size: 22, align: right ? 'right' : 'left' });
  if (o.sub) text(ctx, o.sub, tx, ty + 27, PAL.muted, { size: 19, align: right ? 'right' : 'left' });
  ctx.restore();
}
/* homes for ions, each the candidate farthest from those already placed */
function homes() {
  const placed = [];
  return (xr, yr, r, seed) => {
    let best = null, bd = -1e9;
    for (let j = 0; j < 40; j++) {
      const c = { x: lerp(xr[0], xr[1], rnd(seed, 2 * j)), y: lerp(yr[0], yr[1], rnd(seed, 2 * j + 1)) };
      const dd = Math.min(1e9, ...placed.map((o) => Math.hypot(o.x - c.x, o.y - c.y) - o.r - r));
      if (dd > bd) { bd = dd; best = c; }
    }
    placed.push({ ...best, r }); return best;
  };
}

/* =====================================================================
   FIGURE 18.10: the Downs cell in section, flat, from the book's image.
   A steel shell holds the melt. The anode stands up through the floor at
   the centre, the iron screen round it, the ring cathode outside the
   screen (cut twice by the section, a bar each side) with a connection
   through each wall. A hood over the anode carries chlorine up through
   the lid and out; a collector over the cathode gathers the sodium, which
   floats, and a pipe leads it to the reservoir and the Na outlet. The
   source is wired + to the anode and − to the cathode.
   The cell runs in a steady state on a clock of T = 9 s. Each side has
   three events, each P = 3 s long: two Cl⁻ cross the screen to the anode
   and two Na⁺ cross it to the cathode; one bubble of Cl₂ and two drops of
   sodium form. With the screen in place the bubble rises into the hood
   and the drops into the collector. With the screen taken out (the
   choice), two events in three on each side end with the bubble and the
   drops meeting in the melt and going back to NaCl, as the text's
   "separation prevents recombination" says; the share is the figure's
   own, the book gives none. The reservoir fills in step with the sodium
   that arrives. Every frame is a function of the clock alone.
===================================================================== */
(function () {
  const DY = 70, H = 880, d = sim('sim-downs-cell', H);                 /* the drawing is laid out 70 units lower than it is shown */
  const T = 9, P = 3;
  const X0 = 230, X1 = 890, Y0 = 300, Y1 = 800, IL = 254, IR = 866, IT = 324, IB = 776, MLV = 356, CX = 560;
  const ROOF = 470, LAYER = 16, RNA = 6.5, RCL = 10.5;
  const sw = F.choice(d.controls, { label: '\\text{iron screen}', options: [{ value: 'in', label: 'in place' }, { value: 'out', label: 'taken out' }], value: 'in', aria: 'the iron screen', onInput: () => cy.reset() });
  const cy = cycle(() => T, 1.4);
  const ro = F.readout(d);
  let hits = []; F.hover(d.stage, () => hits);
  let wob = 0;
  const jig = (p, a = 4) => [a * Math.sin(2.1 * wob + p), a * Math.cos(1.7 * wob + p)];
  /* the events, laid out for the left side and mirrored for the right */
  const EVS = [];
  for (const s of [-1, 1]) {
    const home = homes(), X = (x) => (s < 0 ? x : 2 * CX - x);
    for (let j = 0; j < 3; j++) {
      const yc = [578, 622, 666][j], ya = [524, 550, 576][j], seed = (s > 0 ? 50 : 0) + 10 * j;
      EVS.push({ s, j, X, yc, ya, ph: j / 3 + (s > 0 ? 1 / 6 : 0), lost: j !== 1,
        na: [0, 1].map((i) => ({ h: home([416, 474], [618, 750], RNA, seed + i), to: [326 + RNA + 1, yc + (i ? 8 : -8)], ph: rnd(seed, 90 + i) * TAU })),
        cl: [0, 1].map((i) => ({ h: home([340, 384], i ? [700, 752] : [496, 530], RCL, seed + 2 + i), to: [490 - RCL - 1, ya + (i ? 10.5 : -10.5)], ph: rnd(seed, 95 + i) * TAU })),
        up: walker(rounded([[478, ya], [470, 474], [534 + 14 * j, 398], [546 + 12 * j, MLV + 4]], 30)), meet: [404, Math.min(yc, ya) - 44 + 30 * (j === 2)] });
    }
  }
  /* ions of the melt that only jostle, left side then mirrored */
  const BG = [[282, 384, 'Na'], [330, 420, 'Cl'], [378, 388, 'Na'], [446, 392, 'Cl'], [277, 742, 'Cl'], [281, 590, 'Na'], [506, 648, 'Cl'], [512, 730, 'Na'], [452, 500, 'Na']]
    .flatMap(([x, y, e], i) => [[x, y, e, i], [2 * CX - x, y + (i % 2 ? 14 : -8), e === 'Na' && i > 4 ? 'Cl' : e, i + 20]]);
  const WBOT = walker(rounded([[560, 858], [560, 886], [1150, 886], [1150, 790]], 16)), WTOP = walker(rounded([[1150, 696], [1150, 640], [962, 640]], 16));
  const GASLINE = rounded([[560, 340], [560, 150], [926, 150]], 44), NALINE = rounded([[760, 462], [760, 405], [936, 405]], 12);
  function hood(ctx, close) {
    ctx.beginPath(); ctx.moveTo(400, 456); ctx.lineTo(522, 392); ctx.lineTo(522, 156); ctx.quadraticCurveTo(522, 112, 566, 112); ctx.lineTo(930, 112);
    if (close) { ctx.lineTo(930, 188); ctx.lineTo(598, 188); ctx.lineTo(598, 392); ctx.lineTo(720, 456); ctx.closePath(); } else { ctx.moveTo(930, 188); ctx.lineTo(598, 188); ctx.lineTo(598, 392); ctx.lineTo(720, 456); }
  }
  let last = '';
  function draw() {
    const { ctx } = begin(d.c); hits = [];
    const t = cy.now(), out = sw.value === 'out', scr = sw.a('in');
    ctx.save(); ctx.translate(0, -DY);
    const steel = F.mixColor(PAL.ink, PAL.panel, 0.55), iron = F.mixColor(PAL.ink, PAL.panel, 0.38), carbon = F.fact(GRAPHITE), metal = F.fact(MOLTEN_METAL), cl2 = F.fact(CHLORINE);
    const melt = alpha(PAL.ink, 0.075);
    /* the shell, with its openings for the hood, the inlet, the sodium pipe, the anode and the cathode's connections */
    ctx.save(); ctx.fillStyle = steel; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2; ctx.beginPath(); ctx.rect(X0, Y0, X1 - X0, Y1 - Y0); ctx.rect(IL, IT, IR - IL, IB - IT); ctx.fill('evenodd'); ctx.stroke(); ctx.restore();
    rect(ctx, IL, IT, IR, IB, PAL.panel);
    rect(ctx, IL, MLV, IR, IB, melt); line(ctx, IL, MLV, IR, MLV, alpha(PAL.ink, 0.4), 2);
    /* the chlorine in the hood above the melt, and out along its pipe */
    ctx.save(); hood(ctx, true); ctx.fillStyle = PAL.panel; ctx.fill(); ctx.clip(); ctx.fillStyle = melt; ctx.fillRect(380, MLV, 360, 110); ctx.fillStyle = alpha(cl2, 0.5); ctx.fillRect(380, 100, 560, MLV - 100); ctx.restore();
    line(ctx, 522, MLV, 598, MLV, alpha(PAL.ink, 0.4), 2);
    flow(ctx, GASLINE, 80 * t);
    /* the sodium: afloat under the collector, up the pipe, in the reservoir */
    const frac = out ? 1 / 3 : 1, LV = 420 - 100 * (t / T) * frac;
    rect(ctx, 270, ROOF, 400, ROOF + LAYER, metal); rect(ctx, 720, ROOF, 850, ROOF + LAYER, metal);
    pipe(ctx, [[760, ROOF], [760, 405], [942, 405]], 11, metal);
    rect(ctx, 749, ROOF - 2, 771, ROOF + 4, metal);
    const RES = [[940, 440], [985, 505], [985, 575], [1170, 575], [1170, 545], [1015, 545], [1015, 505], [1060, 440]];
    ctx.save(); ctx.beginPath(); ctx.moveTo(940, 440); ctx.lineTo(940, 310); ctx.arc(1000, 310, 60, Math.PI, 0); ctx.lineTo(1060, 440); RES.slice(1, 7).reverse().forEach(([x, y]) => ctx.lineTo(x, y)); ctx.closePath();
    ctx.fillStyle = PAL.panel; ctx.fill(); ctx.save(); ctx.clip(); ctx.fillStyle = metal; ctx.fillRect(930, LV, 250, 300); ctx.restore();
    ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.lineJoin = 'round'; ctx.stroke(); ctx.restore();
    rect(ctx, 1166, 547, 1174, 573, metal); rect(ctx, 936, 395, 946, 415, metal);
    line(ctx, 942, LV, 1058, LV, alpha(PAL.ink, 0.5), 2);
    flow(ctx, NALINE, 50 * t * frac, 0.5);
    if (out) { line(ctx, 1062, 320, 1090, 320, alpha(PAL.ink, 0.6), 2, [5, 5]); text(ctx, 'the level with the screen in', 1098, 320, PAL.muted, { size: 19 }); }
    /* the cathode ring and its connections, the anode, the collector, the hood, the inlet */
    for (const s of [-1, 1]) {
      const X = (x) => (s < 0 ? x : 2 * CX - x), l = Math.min(X(160), X(300)), r = Math.max(X(160), X(300));
      rect(ctx, l, 628, r, 652, iron, PAL.ink); rect(ctx, Math.min(X(222), X(262)), 618, Math.max(X(222), X(262)), 662, PAL.panel, PAL.ink);
      rect(ctx, Math.min(X(300), X(326)), 540, Math.max(X(300), X(326)), 690, iron, PAL.ink);
      stroke(ctx, [[X(270), 524], [X(270), ROOF], [X(400), ROOF]], PAL.ink, 4);
      for (let y = 555; y < 690; y += 40) hits.push({ x: X(313), y, r: 22, name: 'the cathode (−), an iron ring round the screen: sodium ions are reduced on it' });
      hits.push({ x: X(200), y: 640, r: 20, name: 'the connection to the cathode, through the wall' }, { x: X(335), y: ROOF + 8, r: 22, name: 'liquid sodium afloat under the collector' }, { x: X(270), y: 500, r: 16, name: 'the collector, a hood over the cathode ring' });
    }
    fill(ctx, [[490, 500], [630, 500], [630, 600], [586, 600], [586, 858], [534, 858], [534, 600], [490, 600]], carbon, PAL.ink);
    rect(ctx, 520, 768, 600, 812, PAL.panel, PAL.ink); rect(ctx, 534, 768, 586, 812, carbon);
    hits.push({ x: 560, y: 550, r: 52, name: 'the anode (+), of graphite: chloride ions are oxidized on it' }, { x: 560, y: 690, r: 30, name: 'the anode (+), of graphite' });
    ctx.save(); hood(ctx, false); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 4; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.stroke(); ctx.restore();
    rect(ctx, 783, 258, 797, IT + 4, PAL.panel, PAL.ink); rect(ctx, 768, 290, 812, Y0, steel, PAL.ink);
    arrow(ctx, 560, 300, 560, 216, PAL.ink, 3); arrow(ctx, 946, 150, 1010, 150, PAL.ink, 3.5); arrow(ctx, 1184, 560, 1248, 560, PAL.ink, 3.5);
    hits.push({ x: 560, y: 250, r: 40, name: 'chlorine gas, Cl₂, on its way out' }, { x: 760, y: 150, r: 38, name: 'chlorine gas, Cl₂, on its way to the storage tanks' }, { x: 460, y: 424, r: 16, name: 'the hood over the anode, which gathers the chlorine' }, { x: 660, y: 424, r: 16, name: 'the hood over the anode, which gathers the chlorine' },
      { x: 850, y: 405, r: 18, name: 'liquid sodium on its way to the reservoir' }, { x: 1000, y: 470, r: 36, name: 'liquid sodium, Na(l)' }, { x: 1000, y: 300, r: 44, name: 'the reservoir for the liquid sodium' }, { x: 790, y: 280, r: 20, name: 'the inlet for fresh NaCl' },
      { x: 242, y: 440, r: 14, name: 'the steel shell' }, { x: 878, y: 500, r: 14, name: 'the steel shell' }, { x: 420, y: 312, r: 14, name: 'the steel shell' }, { x: 420, y: 788, r: 14, name: 'the steel shell' });
    /* the iron screen: a cylinder round the anode, cut twice by the section */
    if (scr > 0.01) {
      ctx.save(); ctx.globalAlpha = scr; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 9; ctx.setLineDash([9, 6]);
      for (const x of [400, 720]) { ctx.beginPath(); ctx.moveTo(x, 458); ctx.lineTo(x, 718); ctx.stroke(); }
      ctx.restore();
      for (const x of [400, 720]) for (let y = 480; y < 720; y += 40) hits.push({ x, y, r: 14, name: 'the iron screen: ions pass through it, and it keeps the sodium and the chlorine apart' });
    }
    BG.forEach(([x, y, e, i]) => { const [jx, jy] = jig(i * 1.3); ion(ctx, x + jx, y + jy, e === 'Na' ? RNA : RCL, e, e === 'Na' ? 1 : -1); hits.push({ x, y, r: 14, name: e === 'Na' ? 'a sodium ion, Na⁺, of the melt' : 'a chloride ion, Cl⁻, of the melt' }); });
    /* the events */
    for (const e of EVS) {
      const u = (((t / P + e.ph) % 1) + 1) % 1, X = e.X, lost = out && e.lost;
      const f = smooth(clamp01(u / 0.42)), ia = Math.min(clamp01(u / 0.06), 1 - clamp01((u - 0.42) / 0.08)), born = clamp01((u - 0.42) / 0.08);
      for (const [list, el, r, q, name] of [[e.na, 'Na', RNA, 1, 'a sodium ion, Na⁺, drawn to the cathode'], [e.cl, 'Cl', RCL, -1, 'a chloride ion, Cl⁻, drawn to the anode']]) list.forEach((p) => {
        const [jx, jy] = jig(p.ph), x = X(lerp(p.h.x, p.to[0], f)) + jx * (1 - f), y = lerp(p.h.y, p.to[1], f) + jy * (1 - f);
        ion(ctx, x, y, r, el, q, ia); if (ia > 0.3) hits.push({ x, y, r: 14, name });
      });
      if (born <= 0) continue;
      const [mx, my] = e.meet, qm = smooth(clamp01((u - 0.5) / 0.3)), gone = lost ? 1 - clamp01((u - 0.8) / 0.05) : 1 - clamp01((u - 0.93) / 0.06);
      /* two drops of sodium */
      e.na.forEach((p, i) => {
        const q = smooth(clamp01((u - 0.5) / 0.42));
        const x = lost ? lerp(335, mx - 9, qm) : 336 + 3 * Math.sin(8 * q + i * 2), y = lost ? lerp(p.to[1], my + (i ? 9 : -9), qm) : lerp(p.to[1], ROOF + LAYER - 4, q);
        blob(ctx, X(x), y, 9.5 * born, metal, gone); if (gone > 0.3) hits.push({ x: X(x), y, r: 14, name: 'a drop of liquid sodium, which floats on the melt' });
      });
      /* one bubble of chlorine */
      {
        const q = smooth(clamp01((u - 0.5) / 0.42)), [ux, uy] = e.up.at(q * e.up.L);
        const x = lost ? lerp(478, mx + 10, qm) : ux + 3 * Math.sin(10 * q + e.j), y = lost ? lerp(e.ya, my, qm) : uy;
        blob(ctx, X(x), y, 10.5 * born, cl2, gone); if (gone > 0.3) hits.push({ x: X(x), y, r: 15, name: 'a bubble of chlorine gas, Cl₂' });
      }
      if (lost && u > 0.8) {
        const k = clamp01((u - 0.8) / 0.18);
        ctx.save(); ctx.globalAlpha = 1 - k; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(X(mx), my, 10 + 22 * k, 0, TAU); ctx.stroke(); ctx.restore();
        ctx.save(); ctx.globalAlpha = Math.min(1, 3 * (1 - k)); text(ctx, 'NaCl', X(mx), my - 2, PAL.ink, { size: 19, weight: 600, align: 'center', bg: PAL.panel }); ctx.restore();
      }
    }
    /* the circuit */
    stroke(ctx, WBOT.pts, PAL.ink, 4.5); stroke(ctx, WTOP.pts, PAL.ink, 4.5);
    conveyor(WBOT, 52, 70 * t, (x, y) => { electron(ctx, x, y); hits.push({ x, y, r: 11, name: 'an electron, e⁻, leaving the anode' }); });
    conveyor(WTOP, 52, 70 * t, (x, y) => { electron(ctx, x, y); hits.push({ x, y, r: 11, name: 'an electron, e⁻, on its way to the cathode' }); });
    ctx.save(); ctx.fillStyle = PAL.panel; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3.5; ctx.beginPath(); ctx.roundRect(1045, 696, 210, 94, 10); ctx.fill(); ctx.fillStyle = alpha(PAL.ink, 0.06); ctx.fill(); ctx.stroke(); ctx.restore();
    text(ctx, 'voltage source', 1150, 743, PAL.ink, { size: 23, align: 'center' });
    text(ctx, '−', 1180, 672, PAL.ink, { size: 32, weight: 700, align: 'center' }); text(ctx, '+', 1180, 816, PAL.ink, { size: 32, weight: 700, align: 'center' });
    hits.push({ x: 1100, y: 743, r: 44, name: 'the voltage source, which drives the electrons from the anode round to the cathode' }, { x: 1200, y: 743, r: 44, name: 'the voltage source, which drives the electrons from the anode round to the cathode' });
    text(ctx, 'e⁻', 792, 862, PAL.ink, { size: 22, align: 'right' }); arrow(ctx, 802, 862, 868, 862, PAL.ink, 3);
    text(ctx, 'e⁻', 1092, 616, PAL.ink, { size: 22 }); arrow(ctx, 1082, 616, 1016, 616, PAL.ink, 3);
    /* names on the parts that hold still */
    lead(ctx, 'molten NaCl', 214, 392, 300, 392, { align: 'right', sub: 'with CaCl₂, at 600 °C' });
    lead(ctx, 'collector', 214, 496, 270, 496, { align: 'right' });
    text(ctx, 'cathode (−)', 150, 640, PAL.ink, { size: 22, align: 'right' });
    lead(ctx, 'iron screen', 214, 708, 400, 708, { align: 'right', a: scr });
    text(ctx, 'anode (+)', 516, 836, PAL.ink, { size: 22, align: 'right' });
    lead(ctx, 'inlet for NaCl', 762, 244, 783, 268, { align: 'right' });
    text(ctx, 'Cl₂ outlet', 1022, 150, PAL.ink, { size: 22 }); text(ctx, 'Na outlet', 1260, 560, PAL.ink, { size: 22 });
    lead(ctx, 'liquid Na', 1098, 470, 1024, 470);
    F.legend(ctx, { l: 0, r: 1400, t: 906, b: H + DY }, [
      { s: 'Na⁺', draw: (g, x, y) => ion(g, x, y, 9, 'Na', 1) }, { s: 'Cl⁻', draw: (g, x, y) => ion(g, x, y, 11, 'Cl', -1) },
      { s: 'liquid Na', draw: (g, x, y) => blob(g, x, y, 9.5, metal) }, { s: 'Cl₂ gas', draw: (g, x, y) => blob(g, x, y, 10.5, cl2) }, { s: 'electron', draw: (g, x, y) => electron(g, x, y) },
    ], { corner: 'bottom', row: true, size: 20, panel: false });
    ctx.restore(); hits.forEach((h) => { h.y -= DY; });
    const eq = '2\\text{Na}^{+} + 2\\text{Cl}^{-} \\longrightarrow 2\\text{Na}(l) + \\text{Cl}_2(g)';
    const tex = out ? `${eq} \\\\ 2\\text{Na}(l) + \\text{Cl}_2(g) \\longrightarrow 2\\text{NaCl}(l)` : eq;
    if (tex !== last) { last = tex; ro.set(tex, out ? 'With no screen the sodium and the chlorine meet in the melt and go back to NaCl, so less of each leaves the cell.' : '', { values: false }); }
  }
  register(d.fig, { update: (dt) => { wob += dt; cy.step(dt, () => 1); }, draw });
})();

/* =====================================================================
   FIGURE 18.11: the Hall–Héroult cell in section, flat, from the book's
   image. A steel shell lined with ceramic holds Al₂O₃ dissolved in molten
   Na₃AlF₆ under a crust. The carbon cathode is the floor, sloping to a
   tap hole through the right wall; molten aluminum lies on it. Two carbon
   anodes hang in the melt from forked rods on a bus bar (+); a bar (−)
   runs out of the cathode through the left wall. A hood covers the cell,
   with the exhaust at its top left.
   One run takes T = 9.5 s and holds. Five rounds, 1.4 s apart, the left
   anode and the right in turn. In a round two Al³⁺ sink to the aluminum,
   each takes three electrons that come up from the cathode, and joins
   the pool, which deepens; three O²⁻ rise to the anode's underside and
   give up two electrons each, a pair leaving as O₂ or (with a carbon atom
   of the anode) CO₂, the third as CO; the gases bubble up beside the
   anode, through the crust and out of the exhaust. So six electrons come
   in at − and six leave at + in every round: the charges of two Al³⁺ and
   three O²⁻ balance. The mix of gases is the figure's own; the book names
   the three and gives no proportions. Radii: Al³⁺ 7, O²⁻ 11.
===================================================================== */
(function () {
  const H = 930, d = sim('sim-hall-heroult', H);
  const T = 9.5, NR = 5, T0 = 1.0, GAP = 1.4, SP = 26, VG = 380;
  const CL = 320, CR = 940, TOP = 400, CRUST = 420, AL0 = 672, AB = 572, RAL = 7, RO = 11;
  const AN = [[376, 576], [684, 884]];
  const cy = cycle(() => T, 1.4);
  const ro = F.readout(d);
  let hits = []; F.hover(d.stage, () => hits);
  let wob = 0;
  const jig = (p, a = 4) => [a * Math.sin(2.1 * wob + p), a * Math.cos(1.7 * wob + p)];
  const floorY = (x) => lerp(696, 722, (x - CL) / (CR - CL));
  const home = homes();
  const zone = (k) => [[[332, 928], [600, 648]], [[332, 364], [440, 560]], [[592, 668], [440, 590]], [[896, 928], [440, 560]], [[332, 928], [600, 648]], [[332, 928], [600, 648]]][k % 6];
  const O2 = [['O', 9, -8], ['O', 9, 8]], CO = [['C', 9.5, -8], ['O', 9, 8]], CO2 = [['O', 9, -16], ['C', 9.5, 0], ['O', 9, 16]];
  const mol = (ctx, x, y, atoms, a = 1) => atoms.forEach(([s, r, dx]) => ball(ctx, x + dx, y, r, F.el(s), a));
  const WAY = [
    { pair: [[413, 588], [348, 596], [348, 400], [330, 300], [340, 170], [340, 44]], one: [[556, 588], [606, 596], [606, 400], [590, 290], [480, 165], [350, 150], [340, 44]] },
    { pair: [[847, 588], [912, 596], [912, 400], [925, 300], [880, 158], [380, 150], [340, 44]], one: [[704, 588], [654, 596], [654, 400], [670, 290], [640, 165], [380, 150], [340, 44]] },
  ].map((w) => ({ pair: walker(rounded(w.pair, 26)), one: walker(rounded(w.one, 26)) }));
  const RND = Array.from({ length: NR }, (_, r) => {
    const side = r % 2, co2 = r === 1 || r === 2, [al, ar] = AN[side], out = side ? ar : al, sgn = side ? -1 : 1;
    const xo = [out + sgn * 26, out + sgn * 48, (side ? al : ar) - sgn * 26];
    return { r, side, co2, tau: T0 + GAP * r,
      al: [0, 1].map((i) => { const x = 392 + 104 * r + 58 * i; return { h: home([Math.max(332, x - 90), Math.min(928, x + 90)], [600, 644], RAL, 3 * r + i), x, ph: rnd(r, 30 + i) * TAU }; }),
      o: xo.map((x, i) => { const z = zone(r + i); return { h: home(z[0], z[1], RO, 40 + 3 * r + i), x, ph: rnd(r, 60 + i) * TAU }; }) };
  });
  const BG = [['Al', 0], ['O', 1], ['Al', 2], ['O', 3], ['O', 4], ['O', 5], ['Al', 6], ['O', 7], ['Al', 8], ['O', 9]].map(([e, i]) => { const z = zone(i); return { e, h: home(z[0], z[1], e === 'O' ? RO : RAL, 80 + i), ph: i * 1.7 }; });
  const BAR = walker([[100, 733], [300, 733]]), BUS = walker(rounded([[476, 268], [476, 195], [1128, 195]], 10)), ROD = walker([[784, 268], [784, 207]]);
  let last = '';
  function draw() {
    const { ctx } = begin(d.c); hits = [];
    const t = cy.now();
    const steel = F.mixColor(PAL.ink, PAL.panel, 0.55), ceramic = F.mixColor(PAL.ink, PAL.panel, 0.86), carbon = F.fact(GRAPHITE), metal = F.fact(MOLTEN_METAL);
    let nAl = 0, moved = 0, movedR = 0;
    for (const R of RND) { const u = t - R.tau; if (u >= 0.35) nAl += 2; const m = smooth(clamp01(u / 0.7)); moved += m; if (R.side) movedR += m; }
    const landed = RND.reduce((a, R) => a + 2 * smooth(clamp01((t - R.tau - 0.45) / 0.6)), 0), AL = AL0 - 2.4 * landed;
    /* the hood and the exhaust */
    stroke(ctx, [[244, TOP], [244, 128], [290, 128], [290, 62]], PAL.ink, 3); stroke(ctx, [[390, 62], [390, 128], [1016, 128], [1016, TOP]], PAL.ink, 3);
    arrow(ctx, 340, 112, 340, 30, PAL.ink, 3.5);
    text(ctx, 'HF and particulates', 408, 62, PAL.ink, { size: 22 }); text(ctx, 'exhaust to filter plant', 408, 92, PAL.ink, { size: 22 });
    /* the steel shell, the ceramic lining, the cavity */
    fill(ctx, [[200, TOP], [244, TOP], [244, 810], [1016, 810], [1016, TOP], [1060, TOP], [1060, 850], [200, 850]], steel, PAL.ink);
    rect(ctx, 244, TOP, 1016, 810, ceramic);
    ctx.save(); ctx.beginPath(); ctx.rect(244, TOP, 772, 410); ctx.clip(); ctx.strokeStyle = alpha(PAL.ink, 0.16); ctx.lineWidth = 1.2; ctx.beginPath();
    for (let y = TOP + 26, k = 0; y < 810; y += 26, k++) { ctx.moveTo(244, y); ctx.lineTo(1016, y); for (let x = 244 + (k % 2 ? 26 : 0); x < 1016; x += 52) { ctx.moveTo(x, y - 26); ctx.lineTo(x, y); } }
    ctx.stroke(); ctx.restore();
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2; ctx.strokeRect(244, TOP, 772, 410); ctx.restore();
    fill(ctx, [[CL, TOP], [CR, TOP], [CR, 722], [CL, 696]], PAL.panel, PAL.ink);
    rect(ctx, CL + 1, CRUST, CR - 1, AL, alpha(PAL.ink, 0.075));
    rect(ctx, CL + 1, TOP, CR - 1, CRUST, alpha(PAL.ink, 0.28)); line(ctx, CL, CRUST, CR, CRUST, alpha(PAL.ink, 0.5), 1.5);
    /* the aluminum on the cathode, out to the tap hole; the cathode and its bar */
    fill(ctx, [[CL + 1, AL], [CR - 1, AL], [CR - 1, 722], [CL + 1, 696]], metal);
    fill(ctx, [[CR - 2, 698], [1110, 708], [1110, 734], [CR - 2, 722]], metal);
    line(ctx, CR, 698, 1110, 708, PAL.ink, 2); line(ctx, CR, 722, 1110, 734, PAL.ink, 2); line(ctx, CL, AL, CR, AL, alpha(PAL.ink, 0.5), 1.5);
    arrow(ctx, 1120, 722, 1176, 726, PAL.ink, 3.5);
    fill(ctx, [[300, 696], [CL, 696], [CR, 722], [CR, 770], [300, 770]], carbon, PAL.ink);
    rect(ctx, 100, 724, 300, 742, PAL.panel, PAL.ink);
    text(ctx, '−', 74, 733, PAL.ink, { size: 34, weight: 700, align: 'center' });
    /* the anodes on their forked rods, the bus bar */
    AN.forEach(([l, r], i) => {
      const c = (l + r) / 2;
      rect(ctx, l, 322, r, AB, carbon, PAL.ink);
      for (const x of [l + 42, c, r - 42]) rect(ctx, x - 12, 282, x + 12, 392, steel, PAL.ink);
      rect(ctx, l + 30, 262, r - 30, 284, steel, PAL.ink); rect(ctx, c - 15, 204, c + 15, 263, steel, PAL.ink);
      const name = 'a carbon anode (+): oxide ions give up electrons on it, and some leave with its carbon as CO and CO₂';
      for (const x of [l + 50, c, r - 50]) for (const y of [440, 520]) hits.push({ x, y, r: 48, name });
      hits.push({ x: c, y: 272, r: 26, name: i ? 'the rod that holds the anode and carries its current' : 'the rod that holds the anode and carries its current' });
    });
    rect(ctx, 461, 186, 1130, 204, PAL.panel, PAL.ink);
    text(ctx, '+', 1158, 195, PAL.ink, { size: 34, weight: 700, align: 'center' });
    /* ions of the melt that only jostle */
    BG.forEach((b) => { const [jx, jy] = jig(b.ph), x = b.h.x + jx, y = b.h.y + jy; ion(ctx, x, y, b.e === 'O' ? RO : RAL, b.e, b.e === 'O' ? -1 : 1); hits.push({ x, y, r: 14, name: b.e === 'O' ? 'an oxide ion, O²⁻, of the dissolved Al₂O₃' : 'an aluminum ion, Al³⁺, of the dissolved Al₂O₃' }); });
    /* the rounds */
    const hops = [];
    for (const R of RND) {
      const u = t - R.tau, W = WAY[R.side];
      R.al.forEach((p, i) => {
        const ys = AL0 - 2.4 * 2 * R.r - RAL, dist = Math.hypot(p.x - p.h.x, ys - p.h.y), dur = Math.min(dist / 150, R.tau - 0.1), f = smooth(clamp01((t - (R.tau - dur)) / dur));
        const [jx, jy] = jig(p.ph), sink = smooth(clamp01((u - 0.45) / 0.6)), x = lerp(p.h.x, p.x, f) + jx * (1 - f), y = lerp(p.h.y, ys, f) + jy * (1 - f) + 15 * sink;
        const neutral = clamp01((u - 0.15) / 0.25);
        if (sink < 1) { ion(ctx, x, y, lerp(RAL, 10, neutral), 'Al', 1, 1 - sink, 1 - neutral); hits.push({ x, y, r: 14, name: u >= 0.4 ? 'an aluminum atom, Al, joining the molten aluminum' : f > 0 ? 'an aluminum ion, Al³⁺, drawn to the cathode' : 'an aluminum ion, Al³⁺, of the dissolved Al₂O₃' }); }
        if (u >= 0 && u < 0.4) for (const dx of [-10, 0, 10]) hops.push([p.x + dx, floorY(p.x) - 4, p.x + dx * 0.4, ys + 3, u / 0.4]);
      });
      const pm = (R.o[0].x + R.o[1].x) / 2, sgn = R.side ? 1 : -1, form = smooth(clamp01((u - 0.2) / 0.4)), yF = AB + RO + 1;
      R.o.forEach((p, i) => {
        if (u >= 0.6) return;
        const dist = Math.hypot(p.x - p.h.x, yF - p.h.y), dur = Math.min(dist / 150, R.tau - 0.1), f = smooth(clamp01((t - (R.tau - dur)) / dur));
        const [jx, jy] = jig(p.ph), neutral = clamp01((u - 0.1) / 0.25);
        const tx = i < 2 ? pm + (p.x < pm ? -1 : 1) * (R.co2 ? 16 : 8) : p.x, x = lerp(lerp(p.h.x, p.x, f), tx, form) + jx * (1 - f), y = lerp(lerp(p.h.y, yF, f), 588, form) + jy * (1 - f);
        ion(ctx, x, y, lerp(RO, 9, neutral), 'O', -1, 1, 1 - neutral);
        hits.push({ x, y, r: 15, name: u >= 0.3 ? 'an oxygen atom, O' : f > 0 ? 'an oxide ion, O²⁻, drawn to the anode' : 'an oxide ion, O²⁻, of the dissolved Al₂O₃' });
        if (u >= 0 && u < 0.4) for (const dx of [-6, 6]) hops.push([p.x + dx, yF - 4, p.x + dx, AB - 26, u / 0.4]);
      });
      /* the carbon atoms that come out of the anode to join the oxygen */
      if (u >= 0.15 && u < 0.6) {
        const k = smooth(clamp01((u - 0.15) / 0.4));
        if (R.co2) ball(ctx, pm, lerp(AB + 2, 588, k), 9.5, F.el('C'), k);
        ball(ctx, R.o[2].x + 16 * sgn, lerp(AB + 2, 588, k), 9.5, F.el('C'), k);
      }
      if (u >= 0.6) {
        for (const [wk, atoms, name] of [[W.pair, R.co2 ? CO2 : O2, R.co2 ? 'a molecule of carbon dioxide, CO₂' : 'a molecule of oxygen, O₂'], [W.one, CO, 'a molecule of carbon monoxide, CO']]) {
          const s = (u - 0.6) * VG; if (s >= wk.L) continue;
          const [x, y] = wk.at(s), a = clamp01((wk.L - s) / 50);
          if (y > CRUST) { ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = alpha(PAL.panel, 0.75); ctx.strokeStyle = alpha(PAL.ink, 0.55); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(x, y, atoms.length > 2 ? 29 : 22, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore(); }
          mol(ctx, x, y, atoms, a); hits.push({ x, y, r: 24, name: y > CRUST ? name + ', in a bubble' : name + ', on its way to the exhaust' });
        }
      }
    }
    /* the electrons: in at −, up through the aluminum to each ion, out of the oxide ions into the anodes, away at + */
    conveyor(BAR, SP, 6 * SP * moved, (x, y) => { electron(ctx, x, y); hits.push({ x, y, r: 11, name: 'an electron, e⁻, on its way into the cathode' }); });
    conveyor(BUS, SP, 6 * SP * moved, (x, y) => { electron(ctx, x, y); hits.push({ x, y, r: 11, name: 'an electron, e⁻, leaving the anodes' }); });
    conveyor(ROD, SP, 6 * SP * movedR, (x, y) => { electron(ctx, x, y); });
    hops.forEach(([x1, y1, x2, y2, k]) => { const g = smooth(k); electron(ctx, lerp(x1, x2, g), lerp(y1, y2, g), Math.min(1, 4 * (1 - k), 6 * k + 0.4)); });
    text(ctx, 'e⁻', 112, 700, PAL.ink, { size: 22 }); arrow(ctx, 142, 700, 204, 700, PAL.ink, 3);
    text(ctx, 'e⁻', 1058, 234, PAL.ink, { size: 22, align: 'right' }); arrow(ctx, 1068, 234, 1128, 234, PAL.ink, 3);
    /* names */
    lead(ctx, 'ceramic', 176, 470, 282, 470, { align: 'right' });
    lead(ctx, 'steel shell', 176, 540, 222, 540, { align: 'right' });
    lead(ctx, 'carbon cathode (−)', 190, 776, 330, 752, { align: 'right' });
    lead(ctx, 'carbon anode (+)', 1092, 350, 872, 350);
    lead(ctx, 'crust', 1092, 410, 924, 410);
    lead(ctx, 'bubbles of O₂, CO', 1092, 470, 912, 500, { sub: null }); text(ctx, 'and CO₂', 1092, 498, PAL.ink, { size: 22 });
    lead(ctx, 'Al₂O₃ dissolved', 1092, 568, 924, 620); text(ctx, 'in molten Na₃AlF₆', 1092, 596, PAL.ink, { size: 22 });
    lead(ctx, 'molten aluminum', 1092, 668, 906, 694);
    hits.push({ x: 620, y: 746, r: 26, name: 'the carbon cathode (−), under the aluminum: aluminum ions are reduced here' }, { x: 420, y: 740, r: 26, name: 'the carbon cathode (−), under the aluminum: aluminum ions are reduced here' }, { x: 820, y: 748, r: 22, name: 'the carbon cathode (−), under the aluminum: aluminum ions are reduced here' },
      { x: 282, y: 600, r: 30, name: 'the ceramic lining' }, { x: 978, y: 560, r: 30, name: 'the ceramic lining' }, { x: 222, y: 620, r: 20, name: 'the steel shell' }, { x: 1038, y: 620, r: 20, name: 'the steel shell' }, { x: 630, y: 830, r: 20, name: 'the steel shell' },
      { x: 500, y: (AL + 700) / 2, r: 20, name: 'molten aluminum, Al(l), which collects on the cathode' }, { x: 760, y: (AL + 710) / 2, r: 20, name: 'molten aluminum, Al(l), which collects on the cathode' },
      { x: 1050, y: 716, r: 22, name: 'the tap hole, where the molten aluminum is drawn off' }, { x: 630, y: 410, r: 12, name: 'the crust over the melt' }, { x: 348, y: 410, r: 12, name: 'the crust over the melt' },
      { x: 200, y: 733, r: 16, name: 'the bar that carries electrons into the cathode' }, { x: 900, y: 195, r: 16, name: 'the bus bar, which carries electrons away from the anodes' }, { x: 340, y: 90, r: 40, name: 'the exhaust' });
    F.legend(ctx, { l: 0, r: 1400, t: 886, b: H }, [
      { s: 'Al³⁺', draw: (g, x, y) => ion(g, x, y, 8, 'Al', 1) }, { s: 'O²⁻', draw: (g, x, y) => ion(g, x, y, 11, 'O', -1) }, { s: 'Al', draw: (g, x, y) => ball(g, x, y, 10, F.el('Al')) },
      { s: 'O₂', draw: (g, x, y) => mol(g, x, y, O2.map(([s, r, dx]) => [s, 8, dx * 0.85])) }, { s: 'CO', draw: (g, x, y) => mol(g, x, y, CO.map(([s, r, dx]) => [s, 8, dx * 0.85])) },
      { s: 'CO₂', draw: (g, x, y) => mol(g, x + 6, y, CO2.map(([s, r, dx]) => [s, 7.5, dx * 0.8])) }, { s: 'electron', draw: (g, x, y) => electron(g, x, y) },
    ], { corner: 'bottom', row: true, size: 20, panel: false });
    const tex = `\\text{Al}^{3+} + 3\\text{e}^{-} \\longrightarrow \\text{Al}(l) \\\\ N_{\\text{e}^{-}} = 3\\,N_{\\text{Al}} = 3 \\times ${nAl} = ${3 * nAl}`;
    if (tex !== last) { last = tex; ro.set(tex, '', { values: false }); }
  }
  register(d.fig, { update: (dt) => { wob += dt; cy.step(dt, () => 1); }, draw });
})();
};
