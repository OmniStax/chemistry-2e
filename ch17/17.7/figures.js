/* Figures for section 17.7 Electrolysis. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['17.7'] = function (root, F) {
const { PAL, C, alpha, cycle, register, begin, line, arrow, text } = F;
const sim = (id, H) => F.sim(root, id, H);
const TAU = 2 * Math.PI;
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;
/* a fixed pseudo-random number in [0, 1) for item k and draw j, so every run draws the same */
const rnd = (k, j) => { const s = Math.sin(k * 127.1 + j * 311.7) * 43758.5453; return s - Math.floor(s); };
const clamp01 = (x) => Math.min(1, Math.max(0, x));
const lerp = (a, b, k) => a + (b - a) * k;
const smooth = F.ease.smooth;

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
const stroke = (ctx, pts, color, w) => {
  ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = w; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ctx.beginPath(); pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.stroke(); ctx.restore();
};
/* one atom: a filled ball in its element colour with an ink rim */
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
/* an ion: its ball and the mark of its charge (q = +1 or −1; 0 draws the bare atom); the mark fades with k */
function ion(ctx, x, y, r, el, q, a = 1, k = 1) {
  if (a <= 0.01) return;
  const col = F.el(el); ball(ctx, x, y, r, col, a);
  if (!q || k <= 0.01) return;
  const s = r * 0.52;
  ctx.save(); ctx.globalAlpha *= a * k; ctx.strokeStyle = onBall(ctx, col); ctx.lineWidth = Math.max(2.2, r * 0.2); ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(x - s, y); ctx.lineTo(x + s, y); if (q > 0) { ctx.moveTo(x, y - s); ctx.lineTo(x, y + s); } ctx.stroke(); ctx.restore();
}
/* an electron: a small ball in the electron's colour, rimmed in the page colour so it reads on a dark electrode */
function electron(ctx, x, y, a = 1) {
  if (a <= 0.01) return;
  ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = F.el('e-'); ctx.strokeStyle = PAL.panel; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.arc(x, y, 7.5, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore();
}
/* particles spaced sp apart along a path and moved on by s: they enter at its start and leave at its end */
function conveyor(wk, sp, s, each) {
  for (let u = ((s % sp) + sp) % sp; u < wk.L; u += sp) { const [x, y] = wk.at(u); each(x, y, u); }
}
/* the voltage source: a box in the wire, + outside the end the anode is wired to and − outside the cathode's */
function source(ctx, B, hits, name) {
  ctx.save(); ctx.fillStyle = PAL.panel; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3.5;
  ctx.beginPath(); ctx.roundRect(B.x - B.w / 2, B.y - B.h / 2, B.w, B.h, 10); ctx.fill();
  ctx.fillStyle = alpha(PAL.ink, 0.06); ctx.fill(); ctx.stroke();
  ctx.fillStyle = PAL.ink; for (const s of [-1, 1]) { ctx.beginPath(); ctx.roundRect(B.x + s * (B.w / 2 + 5) - 6, B.y - 11, 12, 22, 3); ctx.fill(); }
  ctx.restore();
  text(ctx, '+', B.x - B.w / 2 - 34, B.y - 30, PAL.ink, { size: 36, weight: 700, align: 'center' });
  text(ctx, '−', B.x + B.w / 2 + 34, B.y - 30, PAL.ink, { size: 36, weight: 700, align: 'center' });
  hits.push({ x: B.x - B.w / 4, y: B.y, r: B.h / 2 + 6, name }, { x: B.x + B.w / 4, y: B.y, r: B.h / 2 + 6, name });
}
/* a label and the thin line from it to the thing it names */
const lead = (ctx, x1, y1, x2, y2) => line(ctx, x1, y1, x2, y2, alpha(PAL.ink, 0.55), 1.5);

/* =====================================================================
   FIGURE 17.18: the electrolysis of molten NaCl, flat, from the book's
   image: a tank of melt split by a porous screen, a carbon anode in the
   left half wired to the + of a voltage source and an iron cathode in the
   right half wired to its −. A choice switches the source off and on.
   Off, the ions only jostle and nothing forms: the cell potential is
   negative. On, the run takes T = 8.4 s and holds. Six events, 0.95 s
   apart. In each, two Cl⁻ cross the melt to the anode (one of them
   through the screen) and two Na⁺ cross to the cathode; at the anode each
   Cl⁻ hands one electron to the carbon, shrinks to an atom and pairs into
   a Cl₂ that rises into the gas above the melt on the anode's side; at
   the cathode each Na⁺ takes one electron from the iron, swells to an
   atom and floats up onto the melt on the cathode's side. The wire and
   the electrodes hold a train of electrons that moves on by two places
   an event, out of the anode to + and out of − into the cathode. Every
   frame is a function of the run time alone, so the transport scrubs it.
   Radii: Cl⁻ 19 and Na⁺ 12 (181 and 102 pm), Cl 14, Na 15 (the sodium
   atom is larger than its ion, the chlorine atom smaller than its ion).
===================================================================== */
(function () {
  const H = 820, d = sim('sim-downs-cell', H);
  const T = 8.4, NEV = 6, T0 = 1.5, GAP = 0.95, SPEED = 330, SP = 46;
  const TL = 110, TR = 1290, RIM = 292, FLOOR = 690, MELT = 372, SCR = 700, SW = 20;
  const XA = 380, XC = 1020, EW = 96, ETOP = 232, EBOT = 612;
  const RCL = 19, RNA = 12, RCLA = 14, RNAA = 15;
  const BOX = { x: 700, y: 96, w: 290, h: 84 };
  const sw = F.choice(d.controls, { label: '\\text{voltage source}', options: [{ value: 'off', label: 'off' }, { value: 'on', label: 'on' }], value: 'on', aria: 'the voltage source', onInput: () => cy.reset() });
  const cy = cycle(() => T, 1.4);
  const ro = F.readout(d);
  let hits = []; F.hover(d.stage, () => hits);
  let wob = 0;                                                /* a clock that only jostles the ions */
  const train = walker(rounded([[XA, EBOT - 40], [XA, BOX.y], [XC, BOX.y], [XC, EBOT - 40]], 46));
  const tau = (k) => T0 + GAP * k;
  /* where the melt's ions start: four zones, clear of the electrodes' faces and of the screen */
  const ZONE = { L: [TL + 36, XA - EW / 2 - 64], M1: [XA + EW / 2 + 64, SCR - 42], M2: [SCR + 42, XC - EW / 2 - 64], R: [XC + EW / 2 + 64, TR - 36] };
  const placed = [];
  function home(zone, r, seed) {
    const [x0, x1] = ZONE[zone]; let best = null, bd = -1;
    for (let j = 0; j < 40; j++) {
      const c = { x: lerp(x0, x1, rnd(seed, 2 * j)), y: lerp(MELT + 36, FLOOR - 32, rnd(seed, 2 * j + 1)) };
      const dd = Math.min(1e9, ...placed.map((o) => Math.hypot(o.x - c.x, o.y - c.y) - o.r - r));
      if (dd > bd) { bd = dd; best = c; }
    }
    placed.push({ ...best, r }); return best;
  }
  /* the events: every third one takes its ions from the outer zones to the electrodes' outer faces */
  const EV = Array.from({ length: NEV }, (_, k) => {
    const outer = k % 3 === 2, ys = k % 2 ? 548 : 446;
    const fa = outer ? XA - EW / 2 : XA + EW / 2, sa = outer ? -1 : 1;         /* the anode's face and the way out of it */
    const fc = outer ? XC + EW / 2 : XC - EW / 2, sc = outer ? 1 : -1;
    const cl = [0, 1].map((j) => ({ h: home(outer ? 'L' : j ? 'M2' : 'M1', RCL, 10 + 2 * k + j), to: [fa + sa * (RCL + 1), ys + (j ? 21 : -21)], ph: rnd(k, 40 + j) * TAU }));
    const na = [0, 1].map((j) => ({ h: home(outer ? 'R' : j ? 'M1' : 'M2', RNA, 30 + 2 * k + j), to: [fc + sc * (RNA + 1), ys + (j ? 19 : -19)], ph: rnd(k, 50 + j) * TAU }));
    return { k, outer, ys, fa, sa, fc, sc, cl, na };
  });
  const BG = [['L', 'Na'], ['L', 'Na'], ['L', 'Na'], ['L', 'Na'], ['M1', 'Na'], ['M1', 'Cl'], ['M1', 'Cl'], ['M2', 'Na'], ['M2', 'Na'], ['M2', 'Cl'], ['R', 'Cl'], ['R', 'Cl'], ['R', 'Cl'], ['R', 'Cl'], ['M1', 'Na'], ['M2', 'Cl']]
    .map(([z, e], i) => ({ e, h: home(z, e === 'Cl' ? RCL : RNA, 70 + i), ph: rnd(i, 60) * TAU }));
  /* where the products come to rest: Cl₂ in the gas over the melt on the anode's side, Na afloat on the melt on the cathode's */
  const GAS = [[500, 330], [590, 314], [236, 326], [654, 340], [540, 300], [170, 312]];
  const inner = [0, 1, 2, 3, 4, 5, 6, 7].map((i) => XC - EW / 2 - 20 - 31 * i), outerS = [0, 1, 2, 3].map((i) => XC + EW / 2 + 20 + 31 * i);
  let ni = 0, no = 0;
  EV.forEach((e) => { e.gas = GAS[e.k]; e.pool = [0, 1].map(() => (e.outer ? outerS[no++] : inner[ni++])); });
  const jig = (p, a = 5) => [a * Math.sin(2.1 * wob + p), a * Math.cos(1.7 * wob + p)];
  const cl2 = (ctx, x, y, th, a = 1) => { const dx = 11 * Math.cos(th), dy = 11 * Math.sin(th); ball(ctx, x - dx, y - dy, RCLA, F.el('Cl'), a); ball(ctx, x + dx, y + dy, RCLA, F.el('Cl'), a); };
  let lastTex = '', lastNote = null;
  function draw() {
    const { ctx } = begin(d.c);
    hits = [];
    const on = sw.value === 'on', t = on ? cy.now() : -1;
    /* the melt, the electrodes standing in it, the tank */
    ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.075); ctx.fillRect(TL, MELT, TR - TL, FLOOR - MELT); ctx.restore();
    for (const [x, e, name] of [[XA, 'C', 'the carbon anode, where chloride ions are oxidized'], [XC, 'Fe', 'the iron cathode, where sodium ions are reduced']]) {
      ctx.save(); ctx.fillStyle = F.el(e); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.roundRect(x - EW / 2, ETOP, EW, EBOT - ETOP, 4); ctx.fill(); ctx.stroke(); ctx.restore();
      for (let y = ETOP + 30; y < EBOT; y += 60) hits.push({ x, y, r: 44, name });
    }
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 5; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.moveTo(TL, RIM); ctx.lineTo(TL, FLOOR - 18); ctx.quadraticCurveTo(TL, FLOOR, TL + 18, FLOOR); ctx.lineTo(TR - 18, FLOOR); ctx.quadraticCurveTo(TR, FLOOR, TR, FLOOR - 18); ctx.lineTo(TR, RIM); ctx.stroke(); ctx.restore();
    line(ctx, TL + 3, MELT, TR - 3, MELT, alpha(PAL.ink, 0.4), 2);
    for (const x of [200, 560, 840, 1200]) hits.push({ x, y: FLOOR - 26, r: 26, name: 'molten sodium chloride, NaCl(l)' });
    /* the melt's other ions, which only jostle */
    BG.forEach((b) => {
      const [jx, jy] = jig(b.ph), x = b.h.x + jx, y = b.h.y + jy;
      if (b.e === 'Na') ion(ctx, x, y, RNA, 'Na', 1); else ion(ctx, x, y, RCL, 'Cl', -1);
      hits.push({ x, y, r: 20, name: b.e === 'Na' ? 'a sodium ion, Na⁺, of the melt' : 'a chloride ion, Cl⁻, of the melt' });
    });
    /* the events */
    let done = 0, moved = 0, gasN = 0, poolN = 0;
    const hops = [];
    for (const e of EV) {
      const t1 = tau(e.k), u = t - t1;                       /* u ≥ 0 once the ions are at the electrodes */
      if (u >= 0.35) done++;
      moved += smooth(clamp01(u / 0.7));
      /* chlorine */
      if (u < 0.7) e.cl.forEach((p, j) => {
        const dist = Math.hypot(p.to[0] - p.h.x, p.to[1] - p.h.y), dur = Math.min(dist / SPEED, t1 - 0.1), f = on ? clamp01((t - (t1 - dur)) / dur) : 0;
        const [jx, jy] = jig(p.ph), w = 1 - smooth(f), g = smooth(f);
        const shrink = smooth(clamp01((u - 0.2) / 0.3)), join = smooth(clamp01((u - 0.35) / 0.35));
        const x = lerp(p.h.x, p.to[0], g) + jx * w - e.sa * (RCL - RCLA) * shrink, y = lerp(p.h.y, lerp(p.to[1], e.ys + (j ? 11 : -11), join), g) + jy * w;
        ion(ctx, x, y, lerp(RCL, RCLA, shrink), 'Cl', -1, 1, 1 - clamp01((u - 0.1) / 0.2));
        hits.push({ x, y, r: 22, name: u >= 0.3 ? 'a chlorine atom, Cl' : f > 0 ? 'a chloride ion, Cl⁻, drawn to the anode' : 'a chloride ion, Cl⁻, of the melt' });
        if (u >= 0 && u < 0.35) hops.push([p.to[0], p.to[1], XA, p.to[1], u / 0.35]);
      });
      else {
        const g = smooth(clamp01((u - 0.7) / 1.3)), x0 = e.fa + e.sa * (RCLA + 2), [jx, jy] = jig(e.cl[0].ph, 4 * g);
        const up = clamp01(g / 0.55), over = clamp01((g - 0.55) / 0.45);
        const x = lerp(x0 + 7 * Math.sin(9 * up + e.k) * (1 - over), e.gas[0], over) + jx, y = lerp(lerp(e.ys, MELT - 18, up), e.gas[1], over) + jy;
        cl2(ctx, x, y, lerp(Math.PI / 2, 0.5 * Math.sin(0.9 * wob + e.k) + e.k, over));
        hits.push({ x, y, r: 26, name: g < 0.55 ? 'a chlorine molecule, Cl₂, bubbling up the anode' : 'a chlorine molecule, Cl₂, of the gas over the melt' });
        if (g >= 1) gasN++;
      }
      /* sodium */
      e.na.forEach((p, j) => {
        const dist = Math.hypot(p.to[0] - p.h.x, p.to[1] - p.h.y), dur = Math.min(dist / SPEED, t1 - 0.1), f = on ? clamp01((t - (t1 - dur)) / dur) : 0;
        const [jx, jy] = jig(p.ph), w = 1 - smooth(f), g = smooth(f);
        const grow = smooth(clamp01((u - 0.2) / 0.3)), rise = smooth(clamp01((u - 0.6 - 0.18 * j) / 1.3));
        const xf = p.to[0] + e.sc * (RNAA - RNA) * grow, ytop = MELT - 5, len = (p.to[1] - ytop) + Math.abs(e.pool[j] - xf), s = rise * len;
        let x = lerp(p.h.x, p.to[0], g) + jx * w + e.sc * (RNAA - RNA) * grow, y = lerp(p.h.y, p.to[1], g) + jy * w;
        if (s > 0) { if (s <= p.to[1] - ytop) y = p.to[1] - s; else { y = ytop; x = xf + Math.sign(e.pool[j] - xf) * (s - (p.to[1] - ytop)); } }
        if (rise >= 1) { poolN++; y += 1.5 * Math.sin(1.3 * wob + p.ph); }
        ion(ctx, x, y, lerp(RNA, RNAA, grow), 'Na', 1, 1, 1 - clamp01((u - 0.15) / 0.2));
        hits.push({ x, y, r: 18, name: u >= 0.35 ? (rise >= 1 ? 'a sodium atom, Na, of the liquid sodium afloat on the melt' : 'a sodium atom, Na, of liquid sodium') : f > 0 ? 'a sodium ion, Na⁺, drawn to the cathode' : 'a sodium ion, Na⁺, of the melt' });
        if (u >= 0 && u < 0.35) hops.push([XC, p.to[1], p.to[0], p.to[1], u / 0.35]);
      });
    }
    /* the porous screen, over the ions that pass through it */
    ctx.save(); ctx.fillStyle = alpha(PAL.panel, 0.55); ctx.fillRect(SCR - SW / 2, 250, SW, FLOOR - 3 - 250);
    ctx.fillStyle = alpha(PAL.ink, 0.1); ctx.strokeStyle = alpha(PAL.ink, 0.7); ctx.lineWidth = 2;
    ctx.fillRect(SCR - SW / 2, 250, SW, FLOOR - 3 - 250); ctx.strokeRect(SCR - SW / 2, 250, SW, FLOOR - 3 - 250);
    ctx.fillStyle = alpha(PAL.ink, 0.6);
    for (let y = 260; y < FLOOR - 10; y += 11) for (const dx of (Math.round(y / 11) % 2 ? [-4.5, 4.5] : [0])) { ctx.beginPath(); ctx.arc(SCR + dx, y, 1.8, 0, TAU); ctx.fill(); }
    ctx.restore();
    for (let y = 270; y < FLOOR; y += 40) hits.push({ x: SCR, y, r: 20, name: 'the porous screen: ions pass through it, and it keeps the sodium and the chlorine apart' });
    /* the wire, the train of electrons in it and in the electrodes, the electrons handed over, the source */
    stroke(ctx, rounded([[XA, ETOP], [XA, BOX.y], [XC, BOX.y], [XC, ETOP]], 46), PAL.ink, 5);
    conveyor(train, SP, 2 * SP * moved, (x, y) => {
      if (Math.abs(x - BOX.x) < BOX.w / 2 + 10 && Math.abs(y - BOX.y) < BOX.h / 2) return;
      electron(ctx, x, y); hits.push({ x, y, r: 12, name: 'an electron, e⁻' });
    });
    hops.forEach(([x1, y1, x2, y2, k]) => { const g = smooth(k); electron(ctx, lerp(x1, x2, g), lerp(y1, y2, g), Math.min(1, 4 * (1 - k), 6 * k + 0.4)); });
    source(ctx, BOX, hits, on ? 'the voltage source, which forces the reaction to run' : 'the voltage source, switched off');
    text(ctx, 'Voltage source', BOX.x, BOX.y - (on ? 0 : 13), PAL.ink, { size: 25, align: 'center' });
    if (!on) text(ctx, 'off', BOX.x, BOX.y + 18, PAL.muted, { size: 22, align: 'center' });
    if (on) {
      text(ctx, 'e⁻', XA - 66, 160, PAL.ink, { size: 25, align: 'center' }); arrow(ctx, XA - 34, 200, XA - 34, 124, PAL.ink, 3);
      text(ctx, 'e⁻', XC + 66, 160, PAL.ink, { size: 25, align: 'center' }); arrow(ctx, XC + 34, 124, XC + 34, 200, PAL.ink, 3);
    }
    /* labels on the parts that hold still */
    text(ctx, 'Anode +', 222, 222, PAL.ink, { size: 25, weight: 600, align: 'right' }); text(ctx, 'carbon', 222, 252, PAL.muted, { size: 20, align: 'right' });
    lead(ctx, 232, 226, XA - EW / 2 - 4, 262);
    text(ctx, 'Cathode −', 1178, 222, PAL.ink, { size: 25, weight: 600 }); text(ctx, 'iron', 1178, 252, PAL.muted, { size: 20 });
    lead(ctx, 1168, 226, XC + EW / 2 + 4, 262);
    text(ctx, 'Porous screen', SCR, 214, PAL.ink, { size: 22, align: 'center' });
    text(ctx, '2Cl⁻ ⟶ Cl₂(g) + 2e⁻', XA, 730, PAL.ink, { size: 25, align: 'center' });
    text(ctx, 'Molten NaCl', SCR, 730, PAL.ink, { size: 22, align: 'center' });
    text(ctx, '2Na⁺ + 2e⁻ ⟶ 2Na(l)', XC, 730, PAL.ink, { size: 25, align: 'center' });
    if (gasN) { text(ctx, 'Cl₂(g)', 86, 262, PAL.ink, { size: 22, align: 'center' }); lead(ctx, 104, 276, 150, 304); }
    if (poolN) { text(ctx, 'Na(l)', 1322, 318, PAL.ink, { size: 22, align: 'center' }); lead(ctx, 1304, 332, TR - 24, MELT - 10); }
    F.legend(ctx, { l: 0, r: 1400, t: 756, b: H }, [
      { s: 'electron', draw: (g, x, y) => electron(g, x, y) }, { s: 'Cl⁻', draw: (g, x, y) => ion(g, x, y, 13, 'Cl', -1) }, { s: 'Na⁺', draw: (g, x, y) => ion(g, x, y, 10, 'Na', 1) },
      { s: 'Cl₂', draw: (g, x, y) => { ball(g, x - 7, y, 9, F.el('Cl')); ball(g, x + 7, y, 9, F.el('Cl')); } }, { s: 'Na', draw: (g, x, y) => ball(g, x, y, 11, F.el('Na')) },
    ], { corner: 'bottom', row: true, size: 20, panel: false });

    const tex = `N_{\\text{e}^{-}} = N_{\\text{Na}} = 2\\,N_{\\text{Cl}_2} = 2 \\times ${done} = ${2 * done}`;
    const note = on ? '' : 'With the source off nothing forms: the cell potential is negative, so the reaction does not run by itself.';
    if (tex !== lastTex || note !== lastNote) { lastTex = tex; lastNote = note; ro.set(tex, note, { values: false }); }
  }
  register(d.fig, { update: (dt) => { wob += dt; cy.step(dt, () => 1); }, draw });
})();

/* =====================================================================
   FIGURE 17.19: the electrolysis of water in a Hofmann apparatus, flat,
   from the book's image: two closed, graduated arms with stopcocks,
   joined near the foot by a cross tube to a central column that rises
   into an open reservoir bulb; a platinum electrode stoppered into the
   foot of each arm and wired to the voltage source below, the left arm's
   to + (the anode), the right arm's to − (the cathode). One slider, the
   applied voltage, with −E°cell = 1.229 V marked. Up to 1.229 V nothing
   happens. Above it the run (T = 8 s, then a hold) makes 1 to 12 events,
   more the greater the excess voltage (the book states no current, so
   the rate is the figure's own). An event: one O₂ leaves the anode and
   two H₂ leave the cathode, four electrons move on through the wire
   (anode → + … − → cathode) and four H⁺ move on through the cross tube
   (anode → cathode), closing the circuit. The three bubbles reach their
   gas together, so at every moment the hydrogen is twice the oxygen.
   Each molecule drawn stands for 1 mL on the arm's scale (14 units a
   mL), so equal volumes hold equal numbers. The gases push the liquid
   down the arms and up into the bulb.
===================================================================== */
(function () {
  const H = 990, d = sim('sim-water-electrolysis', H);
  const T = 8, TRUN = 5.6, VT = 1.229, VMAX = 3, PX = 14, RISE = 380, SPE = 44, SPH = 50, SETTLE = 0.35;
  const cy = cycle(() => T, 1.4);
  const volt = F.ctl(d.controls, { label: '\\text{applied voltage}', cls: 'potential', min: 0, max: VMAX, step: 0.001, value: 2, unit: 'V', dec: 3, specials: [{ at: VT, label: '−E°cell' }], onInput: () => cy.reset() });
  const ro = F.readout(d);
  let hits = []; F.hover(d.stage, () => hits);
  let wob = 0;
  const XA = 400, XC = 1000, AW = 104, TIP = 150, COCK = 236, NECK = 286, Y0 = 336, FOOT = 842, CT = 706, CB = 756, PT = 772, PB = 822, STOP = 886;
  const CX = 700, CW = 60, BN = 36, BNW = 84, BY = 205, BRX = 178, BJ = 420, YR0 = 236;
  const BOX = { x: 700, y: 932, w: 300, h: 84 };
  const wire = walker(rounded([[XA, PB], [XA, BOX.y], [XC, BOX.y], [XC, PB]], 40));
  const tube = walker(rounded([[XA, PT - 12], [XA, (CT + CB) / 2], [XC, (CT + CB) / 2], [XC, PT - 12]], 30));
  /* how many events a run holds at the slider's voltage (0 at or below the threshold, 1 just above it, 12 at 3 V) */
  const pace = () => (volt.v > VT + 1e-9 ? 1 + 11 * (volt.v - VT) / (VMAX - VT) : 0);
  const OX = [-26, 16, -6, 30, -18, 8, -30, 22, 0, -12, 28, -24];
  const armPath = (ctx, x) => {
    ctx.beginPath(); ctx.moveTo(x - 9, COCK); ctx.lineTo(x - 9, NECK); ctx.quadraticCurveTo(x - AW / 2, NECK + 8, x - AW / 2, Y0); ctx.lineTo(x - AW / 2, FOOT);
    ctx.lineTo(x + AW / 2, FOOT); ctx.lineTo(x + AW / 2, Y0); ctx.quadraticCurveTo(x + AW / 2, NECK + 8, x + 9, NECK); ctx.lineTo(x + 9, COCK); ctx.closePath();
  };
  const pear = (ctx, s) => {                                 /* one side of the bulb, from the column up to the lip */
    ctx.moveTo(CX + s * CW / 2, BJ); ctx.bezierCurveTo(CX + s * CW / 2, BJ - 90, CX + s * BRX, BY + 110, CX + s * BRX, BY);
    ctx.bezierCurveTo(CX + s * BRX, BY - 95, CX + s * BNW / 2, BY - 80, CX + s * BNW / 2, BN + 40); ctx.lineTo(CX + s * BNW / 2, BN);
  };
  /* the liquid's top in an arm holding v mL of gas: full to the stopcock at 0, on the scale from there */
  const top = (v) => (v < 0.2 ? lerp(COCK + 14, Y0 + PX * 0.2, v / 0.2) : Y0 + PX * v);
  const o2 = (ctx, x, y, th, a = 1) => { const dx = 7 * Math.cos(th), dy = 7 * Math.sin(th); ball(ctx, x - dx, y - dy, 8.5, F.el('O'), a); ball(ctx, x + dx, y + dy, 8.5, F.el('O'), a); };
  const h2 = (ctx, x, y, th, a = 1) => { const dx = 5.5 * Math.cos(th), dy = 5.5 * Math.sin(th); ball(ctx, x - dx, y - dy, 6.5, F.el('H'), a); ball(ctx, x + dx, y + dy, 6.5, F.el('H'), a); };
  let lastTex = '', lastNote = null;
  function draw() {
    const { ctx } = begin(d.c);
    hits = [];
    const V = volt.v, p = pace(), t = cy.now(), glass = alpha(PAL.ink, 0.8), liq = alpha(PAL.ink, 0.075);
    /* the events of this run: when each is made at the electrodes and when its bubbles reach the gas */
    const ev = [];
    for (let k = 0; k + 0.5 <= p; k++) { const made = (k + 0.5) / p * TRUN; ev.push({ k, made, at: made + (PT - 6 - (Y0 + PX * k)) / RISE }); }
    const VO = ev.reduce((s, e) => s + smooth(clamp01((t - e.at) / SETTLE)), 0), VH = 2 * VO, nO = ev.filter((e) => t >= e.at).length;
    const moved = ev.reduce((s, e) => s + smooth(clamp01((t - e.made) / 0.8)), 0);
    const LA = top(VO), LC = top(VH), LR = YR0 - 1.6 * (VO + VH);
    /* the liquid */
    ctx.save(); ctx.fillStyle = liq;
    for (const [x, L] of [[XA, LA], [XC, LC]]) { ctx.save(); armPath(ctx, x); ctx.clip(); ctx.fillRect(x - AW / 2, L, AW, FOOT - L); ctx.restore(); }
    ctx.fillRect(XA + AW / 2, CT, XC - XA - AW, CB - CT); ctx.fillRect(CX - CW / 2, BJ - 1, CW, CT - BJ + 1);
    ctx.save(); ctx.beginPath(); pear(ctx, -1); ctx.lineTo(CX + BNW / 2, BN); pear(ctx, 1); ctx.closePath(); ctx.clip(); ctx.fillRect(CX - BRX, LR, 2 * BRX, BJ - LR); ctx.restore();
    ctx.restore();
    /* the glass */
    ctx.save(); ctx.strokeStyle = glass; ctx.lineWidth = 3.5; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    for (const [x, s] of [[XA, 1], [XC, -1]]) {
      ctx.beginPath(); ctx.moveTo(x - s * 7, TIP); ctx.lineTo(x - s * 9, NECK); ctx.quadraticCurveTo(x - s * AW / 2, NECK + 8, x - s * AW / 2, Y0); ctx.lineTo(x - s * AW / 2, FOOT); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x + s * 7, TIP); ctx.lineTo(x + s * 9, NECK); ctx.quadraticCurveTo(x + s * AW / 2, NECK + 8, x + s * AW / 2, Y0); ctx.lineTo(x + s * AW / 2, CT); ctx.lineTo(CX - s * CW / 2, CT); ctx.lineTo(CX - s * CW / 2, BJ); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x + s * AW / 2, FOOT); ctx.lineTo(x + s * AW / 2, CB); ctx.lineTo(CX, CB); ctx.stroke();
    }
    ctx.beginPath(); pear(ctx, -1); ctx.stroke(); ctx.beginPath(); pear(ctx, 1); ctx.stroke();
    for (const s of [-1, 1]) { ctx.beginPath(); ctx.moveTo(CX + s * (BNW / 2 + 8), BN); ctx.lineTo(CX + s * BNW / 2, BN); ctx.stroke(); }
    ctx.restore();
    /* the liquid's surfaces */
    line(ctx, XA - AW / 2 + 3, LA, XA + AW / 2 - 3, LA, alpha(PAL.ink, VO > 0.2 ? 0.5 : 0), 2); line(ctx, XC - AW / 2 + 3, LC, XC + AW / 2 - 3, LC, alpha(PAL.ink, VH > 0.2 ? 0.5 : 0), 2);
    { const w = BRX * Math.sqrt(Math.max(0, 1 - ((LR - BY) / (LR > BY ? 250 : 135)) ** 2)) - 6; line(ctx, CX - w, LR, CX + w, LR, alpha(PAL.ink, 0.5), 2); }
    /* each arm's scale: a mark a mL, a longer one and its number every 5 mL, 0 at the top */
    for (const [x, s] of [[XA, 1], [XC, -1]]) {
      for (let m = 0; m <= 25; m++) { const y = Y0 + PX * m, big = m % 5 === 0; line(ctx, x - s * AW / 2, y, x - s * (AW / 2 - (big ? 24 : 12)), y, alpha(PAL.ink, big ? 0.7 : 0.4), big ? 2 : 1.5); if (big) text(ctx, String(m), x - s * (AW / 2 + 12), y, PAL.muted, { size: 18, align: s > 0 ? 'right' : 'left' }); }
      text(ctx, 'mL', x - s * (AW / 2 + 12), Y0 - 26, PAL.muted, { size: 18, align: s > 0 ? 'right' : 'left' });
    }
    /* stopcocks (closed), stoppers, the platinum electrodes and their leads */
    for (const [x, s] of [[XA, 1], [XC, -1]]) {
      ctx.save(); ctx.strokeStyle = glass; ctx.lineWidth = 2.5; ctx.fillStyle = PAL.panel;
      ctx.beginPath(); ctx.roundRect(x - 30, COCK - 13, 60, 26, 7); ctx.fill(); ctx.stroke();
      ctx.fillStyle = alpha(PAL.ink, 0.45); ctx.beginPath(); ctx.roundRect(x - s * 30 - (s > 0 ? 22 : 0), COCK - 19, 22, 38, 6); ctx.fill(); ctx.stroke();
      ctx.restore();
      line(ctx, x - 16, COCK, x + 16, COCK, PAL.ink, 3);
      hits.push({ x, y: COCK, r: 32, name: 'a stopcock, closed, so the gas stays in the arm' });
      line(ctx, x, PB, x, STOP, PAL.ink, 3.5);
      ctx.save(); ctx.fillStyle = F.mixColor(PAL.panel, PAL.ink, 0.4); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(x - AW / 2 + 4, FOOT - 16); ctx.lineTo(x + AW / 2 - 4, FOOT - 16); ctx.lineTo(x + AW / 2 + 8, STOP); ctx.lineTo(x - AW / 2 - 8, STOP); ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.fillStyle = F.el('Pt'); ctx.beginPath(); ctx.roundRect(x - 26, PT, 52, PB - PT, 3); ctx.fill(); ctx.stroke(); ctx.restore();
      hits.push({ x, y: (PT + PB) / 2, r: 30, name: s > 0 ? 'the platinum anode, where water is oxidized' : 'the platinum cathode, where hydrogen ions are reduced' }, { x, y: FOOT + 16, r: 30, name: 'a stopper' });
    }
    hits.push({ x: CX, y: LR + 60, r: 80, name: 'the reservoir, open to the air: water with some sulfuric acid' });
    /* H⁺ through the cross tube, from the anode where it is made to the cathode where it is used */
    conveyor(tube, SPH, 4 * SPH * moved, (x, y) => { ion(ctx, x, y, 9, 'H', 1); hits.push({ x, y, r: 13, name: 'a hydrogen ion, H⁺, carrying the current through the solution' }); });
    /* the bubbles on their way up, and the molecules of gas collected, one a mL */
    for (const e of ev) {
      const f = (t - e.made) / (e.at - e.made); if (f < 0) continue;
      const h = smooth(clamp01((t - e.at) / SETTLE)), g = clamp01(f), sway = 6 * Math.sin(11 * g + e.k);
      const from = PT - 8, surfO = Y0 + PX * e.k, surfH = Y0 + PX * 2 * e.k;
      const jx = (m) => 2.5 * Math.sin(1.9 * wob + m * 2.3) * h, jy = (m) => 2 * Math.cos(1.6 * wob + m * 1.7) * h, th = (m) => rnd(m, 5) * Math.PI + 0.5 * Math.sin(0.8 * wob + m) * h;
      { const x = lerp(XA + sway, XA + OX[e.k % 12], h) + jx(e.k), y = lerp(lerp(from, surfO, g), surfO + PX * 0.5, h) + jy(e.k); o2(ctx, x, y, th(e.k)); hits.push({ x, y, r: 16, name: h > 0 ? 'an oxygen molecule, O₂, of the gas collected' : 'oxygen, O₂, bubbling up from the anode' }); }
      for (let j = 0; j < 2; j++) {
        const m = 2 * e.k + j, x = lerp(XC + (j ? 17 : -17) + sway, XC + OX[(m + 5) % 12], h) + jx(m + 40), y = lerp(lerp(from, surfH, g), Y0 + PX * (m + 0.5), h) + jy(m + 40);
        h2(ctx, x, y, th(m + 40)); hits.push({ x, y, r: 13, name: h > 0 ? 'a hydrogen molecule, H₂, of the gas collected' : 'hydrogen, H₂, bubbling up from the cathode' });
      }
    }
    /* the wire, its electrons (anode → + and − → cathode) and the source with its setting */
    stroke(ctx, rounded([[XA, STOP], [XA, BOX.y], [XC, BOX.y], [XC, STOP]], 40), PAL.ink, 5);
    conveyor(wire, SPE, 4 * SPE * moved, (x, y) => {
      if (Math.abs(x - BOX.x) < BOX.w / 2 + 10 && Math.abs(y - BOX.y) < BOX.h / 2) return;
      electron(ctx, x, y); hits.push({ x, y, r: 12, name: 'an electron, e⁻' });
    });
    source(ctx, BOX, hits, 'the voltage source');
    text(ctx, 'Voltage source', BOX.x, BOX.y - 15, PAL.ink, { size: 23, align: 'center' });
    text(ctx, V.toFixed(3) + ' V', BOX.x, BOX.y + 17, C('potential'), { size: 26, weight: 600, align: 'center' });
    /* labels */
    text(ctx, 'H₂O + H₂SO₄', 944, 122, PAL.ink, { size: 23 }); lead(ctx, 936, 130, CX + 96, LR + 34);
    text(ctx, 'Anode +', 306, 786, PAL.ink, { size: 25, weight: 600, align: 'right' }); lead(ctx, 314, 788, XA - 28, 796);
    text(ctx, '2H₂O ⟶ O₂ + 4H⁺ + 4e⁻', 306, 822, PAL.ink, { size: 21, align: 'right' });
    text(ctx, 'Cathode −', 1094, 786, PAL.ink, { size: 25, weight: 600 }); lead(ctx, 1086, 788, XC + 28, 796);
    text(ctx, '2H⁺ + 2e⁻ ⟶ H₂', 1094, 822, PAL.ink, { size: 21 });
    if (VO > 0.05) {
      const a = clamp01(VO), vc = C('volume');
      ctx.save(); ctx.globalAlpha = a;
      text(ctx, 'O₂(g)', 270, 292, PAL.ink, { size: 25, weight: 600, align: 'right' }); lead(ctx, 278, 294, XA - 22, 318);
      text(ctx, 'H₂(g)', 1130, 292, PAL.ink, { size: 25, weight: 600 }); lead(ctx, 1122, 294, XC + 22, 318);
      if (VO > 0.3) {
        F.vbracket(ctx, XA + AW / 2 + 30, Y0, LA, vc, nO + ' mL', 1, { size: 24 });
        F.vbracket(ctx, XC - AW / 2 - 30, Y0, LC, vc, 2 * nO + ' mL', -1, { size: 24 });
      }
      ctx.restore();
    }
    F.legend(ctx, { l: 0, r: 1400, t: 0, b: H }, [
      { s: 'electron', draw: (g, x, y) => electron(g, x, y) }, { s: 'H⁺', draw: (g, x, y) => ion(g, x, y, 9, 'H', 1) },
      { s: 'O₂', draw: (g, x, y) => o2(g, x, y, 0) }, { s: 'H₂', draw: (g, x, y) => h2(g, x, y, 0) },
    ], { corner: 'tl', size: 20 });
    const rel = V > VT + 1e-9 ? '>' : V > VT - 1e-9 ? '=' : '<';
    const tex = `\\text{applied voltage} = ${hue('potential', V.toFixed(3) + '\\ \\text{V}')} ${rel} ${hue('potential', '1.229\\ \\text{V}')} = -\\kEocell \\\\ `
      + `\\kV_{\\text{H}_2} = 2\\,\\kV_{\\text{O}_2} = 2 \\times ${hue('volume', nO + '\\ \\text{mL}')} = ${hue('volume', 2 * nO + '\\ \\text{mL}')}`;
    const note = p > 0 ? 'Four electrons pass through the source for every O₂ and every two H₂.' : 'No gas forms until the applied voltage is greater than 1.229 V.';
    if (tex !== lastTex || note !== lastNote) { lastTex = tex; lastNote = note; ro.set(tex, note, { values: false }); }
  }
  register(d.fig, { update: (dt) => { wob += dt; cy.step(dt, () => 1); }, draw });
})();

/* =====================================================================
   FIGURE 17.20: silver plating a spoon, flat, from the book's image: a
   beaker of AgNO₃(aq) holding a silver bar wired to the + of a voltage
   source (the anode) and a spoon hung bowl down, wired to its − (the
   cathode). Two sliders, the current I and the time t, opening on
   Example 17.9 (10.23 A for 1 hour): n = Q/F = It/F and the mass of
   silver is n × 107.9 g/mol, each rounded to four figures as the book
   rounds it (0.3817 mol, 41.19 g). The state follows the sliders: the
   bar has lost that mass from the face in the solution (its first
   outline stays, dashed) and the spoon wears it as a coat on the part in
   the solution (its first outline dashed inside), both drawn in
   proportion to the mass (161 g, the most the sliders reach, takes 0.6
   of the bar's width and coats the spoon 16 units thick). Moving, and
   endlessly: Ag⁺ leave the bar's face and cross to the spoon while one
   electron for each goes round through the source; both go faster the
   larger the current.
===================================================================== */
(function () {
  const H = 800, d = sim('sim-silver-plating', H);
  const FARADAY = 96485, M_AG = 107.9, M_MAX = 20 * 7200 / FARADAY * M_AG, NION = 9, SP = 46, PACE = 0.2;
  const cy = cycle(() => Infinity, 0);
  const cur = F.ctl(d.controls, { label: '\\kI', cls: 'current', min: 0.5, max: 20, step: 0.01, value: 10.23, unit: 'A', dec: 2 });
  const tmin = F.ctl(d.controls, { label: '\\kt', cls: 'time', min: 5, max: 120, step: 1, value: 60, unit: 'min', dec: 0 });
  const ro = F.readout(d);
  let hits = []; F.hover(d.stage, () => hits);
  const sig4 = (x) => x.toPrecision(4);
  const BL = 310, BR = 1090, RIM = 300, FLOOR = 724, LEVEL = 404;
  const XA = 500, SW = 76, ATOP = 236, ABOT = 650;
  const XS = 900, HTOP = 250, NECKY = 506, BOWL = { y: 592, rx: 50, ry: 84 };
  const BOX = { x: 700, y: 104, w: 320, h: 96 };
  const wire = walker(rounded([[XA, ATOP + 40], [XA, BOX.y], [XS, BOX.y], [XS, HTOP + 30]], 44));
  let flow = 0;                                               /* Ag⁺ that have left the bar since the figure began, as a count */
  /* the spoon's outline grown by g: a handle that narrows down to the neck, and the bowl */
  const spoon = (ctx, g) => {
    ctx.beginPath(); ctx.moveTo(XS - 22 - g, HTOP + 22); ctx.arc(XS, HTOP + 22, 22 + g, Math.PI, 0); ctx.lineTo(XS + 8 + g, NECKY + 10); ctx.lineTo(XS - 8 - g, NECKY + 10); ctx.closePath();
    ctx.moveTo(XS + BOWL.rx + g, BOWL.y); ctx.ellipse(XS, BOWL.y, BOWL.rx + g, BOWL.ry + g, 0, 0, TAU);
  };
  /* the spoon's left edge at height y, where an Ag⁺ lands */
  const edge = (y, g) => { const u = (y - BOWL.y) / (BOWL.ry + g); return Math.abs(u) < 1 ? XS - Math.max(8 + g, (BOWL.rx + g) * Math.sqrt(1 - u * u)) : XS - lerp(22, 8, clamp01((y - HTOP - 22) / (NECKY - HTOP - 12))) - g; };
  let lastTex = '';
  function draw() {
    const { ctx } = begin(d.c);
    hits = [];
    const I = cur.v, ts = Math.round(tmin.v) * 60, Q = I * ts, n = +sig4(Q / FARADAY), m = +sig4(n * M_AG), k = Math.min(1, m / M_MAX);
    const mc = C('mass'), ag = F.el('Ag'), w = SW * (1 - 0.6 * k), coat = 16 * k, face = XA - SW / 2 + w;
    /* the solution */
    const rc = 26, body = (y0) => { ctx.beginPath(); ctx.moveTo(BL, y0); ctx.lineTo(BL, FLOOR - rc); ctx.quadraticCurveTo(BL, FLOOR, BL + rc, FLOOR); ctx.lineTo(BR - rc, FLOOR); ctx.quadraticCurveTo(BR, FLOOR, BR, FLOOR - rc); ctx.lineTo(BR, y0); };
    ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.075); body(LEVEL); ctx.closePath(); ctx.fill(); ctx.restore();
    for (const x of [380, 700, 1020]) hits.push({ x, y: FLOOR - 30, r: 30, name: 'silver nitrate solution, AgNO₃(aq)' });
    /* the silver bar: whole above the solution, eaten away below it on the face toward the spoon */
    ctx.save(); ctx.fillStyle = ag; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.moveTo(XA - SW / 2, ATOP); ctx.lineTo(XA + SW / 2, ATOP); ctx.lineTo(XA + SW / 2, LEVEL); ctx.lineTo(face, LEVEL); ctx.lineTo(face, ABOT); ctx.lineTo(XA - SW / 2, ABOT); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.setLineDash([7, 7]); ctx.strokeStyle = alpha(PAL.ink, 0.6); ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(XA + SW / 2, LEVEL); ctx.lineTo(XA + SW / 2, ABOT); ctx.lineTo(face, ABOT); ctx.stroke(); ctx.restore();
    for (let y = ATOP + 30; y < ABOT; y += 60) hits.push({ x: XA - SW / 2 + w / 2, y, r: 34, name: `the silver anode, which has lost ${sig4(m)} g as Ag⁺` });
    hits.push({ x: (face + XA + SW / 2) / 2, y: 520, r: Math.max(8, (XA + SW / 2 - face) / 2), name: 'the silver the anode has lost' });
    /* the spoon: its own metal above the solution, silvered below it */
    const base = F.mixColor(PAL.panel, PAL.ink, 0.16);
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 4; ctx.lineJoin = 'round';
    ctx.save(); ctx.beginPath(); ctx.rect(0, LEVEL, 1400, H); ctx.clip(); spoon(ctx, coat); ctx.stroke(); ctx.fillStyle = ag; ctx.fill(); ctx.restore();
    ctx.save(); ctx.beginPath(); ctx.rect(0, 0, 1400, LEVEL); ctx.clip(); spoon(ctx, 0); ctx.stroke(); ctx.fillStyle = base; ctx.fill(); ctx.restore();
    if (coat > 1.5) { ctx.save(); ctx.beginPath(); ctx.rect(0, LEVEL + 2, 1400, H); ctx.clip(); ctx.setLineDash([6, 6]); ctx.strokeStyle = alpha(onBall(ctx, ag), 0.75); ctx.lineWidth = 1.5; spoon(ctx, 0); ctx.stroke(); ctx.restore(); }
    ctx.restore();
    line(ctx, XS - 22, LEVEL, XS + 22, LEVEL, alpha(PAL.ink, 0), 1);
    for (let y = HTOP + 20; y < NECKY; y += 44) hits.push({ x: XS, y, r: 24, name: y < LEVEL ? 'the spoon’s handle, out of the solution and bare' : `the spoon, the cathode, coated with ${sig4(m)} g of silver` });
    hits.push({ x: XS, y: BOWL.y - 40, r: 46, name: `the spoon, the cathode, coated with ${sig4(m)} g of silver` }, { x: XS, y: BOWL.y + 40, r: 46, name: `the spoon, the cathode, coated with ${sig4(m)} g of silver` });
    /* the beaker */
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 5; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(BL - 26, RIM - 14); ctx.quadraticCurveTo(BL - 2, RIM - 8, BL, RIM + 18); ctx.lineTo(BL, FLOOR - rc); ctx.quadraticCurveTo(BL, FLOOR, BL + rc, FLOOR);
    ctx.lineTo(BR - rc, FLOOR); ctx.quadraticCurveTo(BR, FLOOR, BR, FLOOR - rc); ctx.lineTo(BR, RIM); ctx.lineTo(BR + 10, RIM - 8); ctx.stroke(); ctx.restore();
    line(ctx, BL + 3, LEVEL, BR - 3, LEVEL, alpha(PAL.ink, 0.4), 2);
    /* Ag⁺ on their way from the bar's face to the spoon */
    for (let i = 0; i < NION; i++) {
      const u = ((flow + i) / NION) % 1, lane = (i * 4) % NION / (NION - 1);
      const y0 = lerp(LEVEL + 34, ABOT - 26, lane), y1 = lerp(LEVEL + 40, BOWL.y + BOWL.ry - 30, lane), g = smooth(u);
      const x = lerp(face + 15, edge(y1, coat) - 15, g), y = lerp(y0, y1, g) - 14 * Math.sin(Math.PI * g) * (i % 2 ? 1 : -1);
      ion(ctx, x, y, 13, 'Ag', 1, Math.min(1, u / 0.1, (1 - u) / 0.08)); hits.push({ x, y, r: 16, name: 'a silver ion, Ag⁺, on its way from the anode to the spoon' });
    }
    /* the wire, its electrons, the source showing the run */
    stroke(ctx, rounded([[XA, ATOP], [XA, BOX.y], [XS, BOX.y], [XS, HTOP]], 44), PAL.ink, 5);
    conveyor(wire, SP, SP * flow, (x, y) => {
      if (Math.abs(x - BOX.x) < BOX.w / 2 + 10 && Math.abs(y - BOX.y) < BOX.h / 2) return;
      electron(ctx, x, y); hits.push({ x, y, r: 12, name: 'an electron, e⁻' });
    });
    source(ctx, BOX, hits, 'the voltage source');
    text(ctx, 'Voltage source', BOX.x, BOX.y - 20, PAL.ink, { size: 23, align: 'center' });
    F.rich(ctx, [[I.toFixed(2) + ' A', C('current')], ' for ', [Math.round(tmin.v) + ' min', C('time')]], BOX.x, BOX.y + 18, { size: 25, align: 'center' });
    text(ctx, 'e⁻', XA - 64, 166, PAL.ink, { size: 25, align: 'center' }); arrow(ctx, XA - 32, 206, XA - 32, 132, PAL.ink, 3);
    text(ctx, 'e⁻', XS + 64, 166, PAL.ink, { size: 25, align: 'center' }); arrow(ctx, XS + 32, 132, XS + 32, 206, PAL.ink, 3);
    /* labels: the book's names, and what each electrode has lost or gained */
    text(ctx, 'Silver (anode) +', 286, 470, PAL.ink, { size: 25, weight: 600, align: 'right' }); lead(ctx, 294, 472, XA - SW / 2 - 4, 480);
    F.rich(ctx, ['loses ', [sig4(m) + ' g', mc]], 286, 506, { size: 24, align: 'right' });
    text(ctx, 'Ag ⟶ Ag⁺ + e⁻', 286, 542, PAL.ink, { size: 21, align: 'right' });
    text(ctx, 'Spoon (cathode) −', 1114, 470, PAL.ink, { size: 25, weight: 600 }); lead(ctx, 1106, 472, XS + 14 + coat, 480);
    F.rich(ctx, ['gains ', [sig4(m) + ' g', mc]], 1114, 506, { size: 24 });
    text(ctx, 'Ag⁺ + e⁻ ⟶ Ag', 1114, 542, PAL.ink, { size: 21 });
    text(ctx, 'AgNO₃(aq)', 700, 690, PAL.ink, { size: 23, align: 'center' });
    F.legend(ctx, { l: 0, r: 1400, t: 744, b: H }, [{ s: 'electron', draw: (g, x, y) => electron(g, x, y) }, { s: 'Ag⁺', draw: (g, x, y) => ion(g, x, y, 11, 'Ag', 1) }], { corner: 'bottom', row: true, size: 20, panel: false });
    const tex = `\\kn = \\frac{\\kQ}{\\kFaraday} = \\frac{\\kI\\,\\kt}{\\kFaraday} = \\frac{(${hue('current', I.toFixed(2) + '\\ \\text{A}')})(${hue('time', ts + '\\ \\text{s}')})}{${hue('charge', '96\\,485\\ \\text{C/mol}')}} = ${hue('amount', sig4(n) + '\\ \\text{mol e}^{-}')} \\\\ `
      + `\\text{mass of Ag} = ${hue('amount', sig4(n) + '\\ \\text{mol e}^{-}')} \\times \\frac{1\\ \\text{mol Ag}}{1\\ \\text{mol e}^{-}} \\times \\frac{107.9\\ \\text{g}}{1\\ \\text{mol Ag}} = ${hue('mass', sig4(m) + '\\ \\text{g}')}`;
    if (tex !== lastTex) { lastTex = tex; ro.set(tex); }
  }
  register(d.fig, { update: (dt) => { cy.step(dt, () => 1); flow += dt * PACE * NION * cur.v / 10.23; }, draw });
})();
};
