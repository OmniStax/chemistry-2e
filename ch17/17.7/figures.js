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
