/* Figures for section 17.7 Electrolysis. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['17.7'] = function (root, F) {
const { PAL, alpha, cycle, register, begin, line, arrow, text, dot } = F;
const sim = (id, H) => F.sim(root, id, H);
const TAU = 2 * Math.PI;
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;
/* a fixed pseudo-random number in [0, 1) for event k and draw j, so every run draws the same */
const rnd = (k, j) => { const s = Math.sin(k * 127.1 + j * 311.7) * 43758.5453; return s - Math.floor(s); };
const clamp01 = (x) => Math.min(1, Math.max(0, x));
const lerp = (a, b, k) => a + (b - a) * k;

/* a polyline with each corner rounded to radius r, and a walker along it by arc length */
function rounded(pts, r) {
  const out = [pts[0]];
  for (let i = 1; i < pts.length - 1; i++) {
    const p = pts[i], a = pts[i - 1], b = pts[i + 1];
    const la = Math.hypot(a[0] - p[0], a[1] - p[1]), lb = Math.hypot(b[0] - p[0], b[1] - p[1]);
    const A = [p[0] + (a[0] - p[0]) * r / la, p[1] + (a[1] - p[1]) * r / la], B = [p[0] + (b[0] - p[0]) * r / lb, p[1] + (b[1] - p[1]) * r / lb];
    for (let s = 0; s <= 10; s++) { const t = s / 10; out.push([(1 - t) ** 2 * A[0] + 2 * (1 - t) * t * p[0] + t * t * B[0], (1 - t) ** 2 * A[1] + 2 * (1 - t) * t * p[1] + t * t * B[1]]); }
  }
  out.push(pts[pts.length - 1]); return out;
}
function walker(pts) {
  const seg = pts.slice(1).map((p, i) => Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1])), L = seg.reduce((a, b) => a + b, 0);
  const at = (s) => { s = Math.max(0, Math.min(L, s)); let i = 0; while (i < seg.length - 1 && s > seg[i]) { s -= seg[i]; i++; } const t = seg[i] ? s / seg[i] : 0; return [pts[i][0] + (pts[i + 1][0] - pts[i][0]) * t, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * t]; };
  return { L, at, pts };
}
const stroke = (ctx, pts, color, w, cap = 'round') => {
  ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = w; ctx.lineCap = cap; ctx.lineJoin = 'round';
  ctx.beginPath(); pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.stroke(); ctx.restore();
};
function ball(ctx, x, y, r, c, a = 1, w = 1.5) {
  if (a <= 0.01) return;
  ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = c; ctx.strokeStyle = alpha(PAL.ink, 0.5); ctx.lineWidth = w;
  ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore();
}
/* the voltage source: a box on the wire with + on the side the anode is wired to and − on the cathode's */
function source(ctx, x, y, w, h, plusLeft = true) {
  ctx.save(); ctx.fillStyle = PAL.soft; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.roundRect(x - w / 2, y - h / 2, w, h, 10); ctx.fill(); ctx.stroke(); ctx.restore();
  text(ctx, 'Voltage source', x, y, PAL.ink, { size: 22, align: 'center' });
  text(ctx, plusLeft ? '+' : '−', x - w / 2 - 22, y - h / 2 - 4, PAL.ink, { size: 30, weight: 600, align: 'center' });
  text(ctx, plusLeft ? '−' : '+', x + w / 2 + 22, y - h / 2 - 4, PAL.ink, { size: 30, weight: 600, align: 'center' });
}
/* electrons along a wire: n of them spaced evenly, moved s units along it, skipping the box the source sits in */
function electrons(ctx, wk, n, s, box, hits) {
  const sp = wk.L / n;
  for (let i = 0; i < n; i++) {
    const [x, y] = wk.at(((i * sp + s) % wk.L + wk.L) % wk.L);
    if (box && Math.abs(x - box.x) < box.w / 2 + 8 && Math.abs(y - box.y) < box.h / 2 + 8) continue;
    dot(ctx, x, y, F.el('e-'), true, 8); hits.push({ x, y, r: 12, name: 'an electron, e⁻, in the wire' });
  }
}
const tag = (ctx, s, x, y, align, to) => {
  if (to) line(ctx, align === 'right' ? x + 8 : align === 'left' ? x - 8 : x, align === 'center' ? y + (to[1] > y ? 16 : -16) : y, to[0], to[1], alpha(PAL.ink, 0.6), 1.5);
  text(ctx, s, x, y, PAL.ink, { size: 22, align });
};

/* =====================================================================
   FIGURE 17.18: the electrolysis of molten NaCl, flat, as the book draws
   it: a tank of melt split by a porous screen, a carbon anode on the left
   and an iron cathode on the right, wired to the + and − of a voltage
   source above. Moving: the cell runs T = 6 s and holds. Ten events, each
   two Cl⁻ drifting to the anode and leaving it as one Cl₂ bubble, two Na⁺
   drifting to the cathode and rising from it as two drops of liquid
   sodium, and two electrons through the source: out of the anode up to
   the + terminal, out of the − terminal down to the cathode. The sodium
   gathers on the melt beside the cathode.
===================================================================== */
(function () {
  const H = 760, d = sim('sim-downs-cell', H);
  const T = 6, NEV = 10, MOVE = 1.1, RISE = 0.9;
  const TL = 150, TR = 1250, RIM = 250, FLOOR = 610, MELT = 300, SCR = 700, SW = 18;
  const XA = 400, XC = 1000, EW = 70, ETOP = 220, EBOT = 530;
  const BOX = { x: 700, y: 90, w: 220, h: 72 };
  const wire = walker(rounded([[XA, ETOP], [XA, BOX.y], [XC, BOX.y], [XC, ETOP]], 40));
  const cy = cycle(() => T, 1.2);
  const ro = F.readout(d);
  let hits = []; F.hover(d.stage, () => hits);
  const tk = (k) => 0.2 + (k + 0.5) * (T - MOVE - RISE - 0.4) / NEV;     /* when event k's ions reach the electrodes */
  /* the melt's own ions, jiggling in place on both sides of the screen */
  const BG = Array.from({ length: 22 }, (_, i) => {
    const left = i < 11, x0 = left ? TL + 40 : SCR + 40, x1 = left ? SCR - 40 : TR - 40;
    let x = lerp(x0, x1, rnd(i, 1)); if (Math.abs(x - (left ? XA : XC)) < EW / 2 + 22) x += (left ? 1 : -1) * 90;
    return { x, y: lerp(MELT + 40, FLOOR - 30, rnd(i, 2)), na: i % 2 === 0, ph: rnd(i, 3) * TAU };
  });
  const cl2 = (ctx, x, y, a) => { ball(ctx, x - 9, y, 11, F.el('Cl'), a); ball(ctx, x + 9, y, 11, F.el('Cl'), a); };
  const naL = (ctx, x, y, a) => ball(ctx, x, y, 10, alpha(F.el('Na'), 0.55), a, 3);
  let lastTex = '';
  function draw() {
    const { ctx } = begin(d.c);
    hits = [];
    const t = cy.now();
    /* the tank and its melt */
    ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.03); ctx.fillRect(TL, RIM, TR - TL, FLOOR - RIM);
    ctx.fillStyle = alpha(PAL.muted, 0.16); ctx.fillRect(TL, MELT, TR - TL, FLOOR - MELT); ctx.restore();
    hits.push({ x: 560, y: 590, r: 30, name: 'molten sodium chloride, NaCl(l)' }, { x: 840, y: 590, r: 30, name: 'molten sodium chloride, NaCl(l)' });
    /* the sodium that has gathered on the melt beside the cathode */
    const pooled = Array.from({ length: NEV }, (_, k) => k).filter((k) => tk(k) + RISE <= t).length;
    if (pooled) {
      const th = 1.6 * pooled;
      ctx.save(); ctx.fillStyle = alpha(F.el('Na'), 0.45); ctx.fillRect(SCR + SW / 2, MELT - th, TR - SCR - SW / 2, th); ctx.restore();
      hits.push({ x: 1150, y: MELT - th / 2, r: 14, name: 'liquid sodium, Na(l), floating on the melt' });
    }
    /* the porous screen, stippled, standing above the melt */
    ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.12); ctx.strokeStyle = alpha(PAL.ink, 0.6); ctx.lineWidth = 1.5;
    ctx.fillRect(SCR - SW / 2, 200, SW, FLOOR - 4 - 200); ctx.strokeRect(SCR - SW / 2, 200, SW, FLOOR - 4 - 200);
    ctx.fillStyle = alpha(PAL.ink, 0.5);
    for (let y = 208; y < FLOOR - 8; y += 10) for (const dx of (Math.round(y / 10) % 2 ? [-4, 4] : [0])) { ctx.beginPath(); ctx.arc(SCR + dx, y, 1.6, 0, TAU); ctx.fill(); }
    ctx.restore();
    hits.push({ x: SCR, y: 420, r: 14, name: 'the porous screen, which keeps the sodium and the chlorine apart' });
    /* the electrodes */
    ctx.save(); ctx.strokeStyle = alpha(PAL.ink, 0.6); ctx.lineWidth = 1.5;
    ctx.fillStyle = F.el('C'); ctx.fillRect(XA - EW / 2, ETOP, EW, EBOT - ETOP); ctx.strokeRect(XA - EW / 2, ETOP, EW, EBOT - ETOP);
    ctx.fillStyle = F.el('Fe'); ctx.fillRect(XC - EW / 2, ETOP, EW, EBOT - ETOP); ctx.strokeRect(XC - EW / 2, ETOP, EW, EBOT - ETOP); ctx.restore();
    hits.push({ x: XA, y: 420, r: 34, name: 'the carbon anode, where chloride ions are oxidized' }, { x: XC, y: 420, r: 34, name: 'the iron cathode, where sodium ions are reduced' });
    /* the melt drawn over the electrodes' immersed parts, then the tank's walls */
    ctx.save(); ctx.fillStyle = alpha(PAL.muted, 0.12); ctx.fillRect(TL, MELT, TR - TL, FLOOR - MELT); ctx.restore();
    ctx.save(); ctx.strokeStyle = alpha(PAL.ink, 0.6); ctx.lineWidth = 4; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.moveTo(TL, RIM); ctx.lineTo(TL, FLOOR - 16); ctx.quadraticCurveTo(TL, FLOOR, TL + 16, FLOOR); ctx.lineTo(TR - 16, FLOOR); ctx.quadraticCurveTo(TR, FLOOR, TR, FLOOR - 16); ctx.lineTo(TR, RIM); ctx.stroke(); ctx.restore();
    line(ctx, TL + 2, MELT, TR - 2, MELT, alpha(PAL.ink, 0.35), 2);

    BG.forEach((b, i) => {
      const x = b.x + 5 * Math.sin(2.1 * t + b.ph), y = b.y + 5 * Math.cos(1.7 * t + b.ph);
      if (b.na) ball(ctx, x, y, 11, F.el('Na')); else ball(ctx, x, y, 16, F.el('Cl'));
      if (i < 2) hits.push({ x, y, r: 16, name: b.na ? 'a sodium ion, Na⁺, of the melt' : 'a chloride ion, Cl⁻, of the melt' });
    });
    /* each event: two Cl⁻ to the anode, one Cl₂ bubble up; two Na⁺ to the cathode, two Na drops up */
    for (let k = 0; k < NEV; k++) {
      const t1 = tk(k), f = (t - (t1 - MOVE)) / MOVE, g = (t - t1) / RISE;
      const ya = lerp(MELT + 50, EBOT - 20, rnd(k, 5)), yc = lerp(MELT + 50, EBOT - 20, rnd(k, 6));
      if (f >= 0 && f < 1) for (let j = 0; j < 2; j++) {
        const y = ya + (j ? 18 : -18), xa = lerp(SCR - 60 - 40 * rnd(k, 7 + j), XA + EW / 2 + 16, f), xc = lerp(SCR + 60 + 40 * rnd(k, 9 + j), XC - EW / 2 - 12, f);
        ball(ctx, xa, y, 16, F.el('Cl'), Math.min(1, f / 0.15)); ball(ctx, xc, yc + (j ? 18 : -18), 11, F.el('Na'), Math.min(1, f / 0.15));
        hits.push({ x: xa, y, r: 18, name: 'a chloride ion, Cl⁻, drifting to the anode' }, { x: xc, y: yc, r: 14, name: 'a sodium ion, Na⁺, drifting to the cathode' });
      }
      if (g >= 0 && g < 1) {
        const x = XA + EW / 2 + 16 + 10 * Math.sin(5 * g + k), y = lerp(ya, MELT - 4, g);
        cl2(ctx, x, y, Math.min(1, (1 - g) / 0.2)); hits.push({ x, y, r: 18, name: 'a bubble of chlorine gas, Cl₂, rising from the anode' });
        for (let j = 0; j < 2; j++) { const xn = XC - EW / 2 - 14 - 10 * j, yn = lerp(yc + (j ? 18 : -18), MELT - 6, g); naL(ctx, xn, yn, 1); hits.push({ x: xn, y: yn, r: 12, name: 'a drop of liquid sodium, Na(l), rising from the cathode' }); }
      }
      /* chlorine leaving the melt */
      if (g >= 1 && g < 1.6) { const y = MELT - 10 - 120 * (g - 1); cl2(ctx, XA + EW / 2 + 16, y, 1 - (g - 1) / 0.6); }
    }
    /* the wire, the source and the electrons: out of the anode to +, out of − to the cathode */
    stroke(ctx, wire.pts, PAL.ink, 5);
    const done = Array.from({ length: NEV }, (_, k) => k).filter((k) => tk(k) <= t).length;
    electrons(ctx, wire, 20, 2 * NEV * clamp01(t / (T - RISE)) * wire.L / 20, BOX, hits);
    source(ctx, BOX.x, BOX.y, BOX.w, BOX.h, true);
    hits.push({ x: BOX.x, y: BOX.y, r: 40, name: 'the voltage source, which drives the nonspontaneous reaction' });
    text(ctx, 'e⁻', XA - 64, 150, PAL.ink, { size: 22, align: 'center' }); arrow(ctx, XA - 36, 190, XA - 36, 110, PAL.ink, 3);
    text(ctx, 'e⁻', XC + 64, 150, PAL.ink, { size: 22, align: 'center' }); arrow(ctx, XC + 36, 110, XC + 36, 190, PAL.ink, 3);
    /* labels on the parts that hold still */
    tag(ctx, 'Anode', 190, 200, 'right', [XA - EW / 2, 250]);
    tag(ctx, 'Cathode', 1210, 200, 'left', [XC + EW / 2, 250]);
    tag(ctx, 'Porous screen', SCR, 166, 'center');
    tag(ctx, '2Cl⁻ ⟶ Cl₂(g) + 2e⁻', XA, 650, 'center');
    tag(ctx, 'Molten NaCl', SCR, 650, 'center');
    tag(ctx, '2Na⁺ + 2e⁻ ⟶ 2Na(l)', XC, 650, 'center');
    F.legend(ctx, { l: 0, r: 1400, t: 0, b: H }, [{ s: 'electron, e⁻', kind: 'dot', color: F.el('e-') }, { s: 'Cl⁻', draw: (g, x, y) => ball(g, x, y, 16, F.el('Cl')) },
      { s: 'Cl₂', draw: (g, x, y) => cl2(g, x, y, 1) }, { s: 'Na⁺', draw: (g, x, y) => ball(g, x, y, 11, F.el('Na')) }, { s: 'Na(l)', draw: (g, x, y) => naL(g, x, y, 1) }], { corner: 'bottom', row: true, size: 20 });

    const tex = `N_{\\text{e}^{-}} = N_{\\text{Na}} = 2\\,N_{\\text{Cl}_2} = 2 \\times ${done} = ${2 * done}`;
    if (tex !== lastTex) { lastTex = tex; ro.set(tex, undefined, { values: false }); }
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();

/* =====================================================================
   FIGURE 17.19: the electrolysis of water in a Hofmann apparatus, flat,
   as the book draws it: two closed arms with stopcocks joined at the foot
   to a central column that rises into an open reservoir bulb, a platinum
   electrode stoppered into the foot of each arm and wired to the voltage
   source below, the left arm's to + (the anode), the right arm's to − (the
   cathode). Moving: 6 s of clock. Up to 1.229 V nothing happens; above it
   the extent grows at a rate set by the excess voltage, O₂ collects at the
   top of the left arm and twice its volume of H₂ at the top of the right,
   and the liquid they push down rises in the reservoir. Four electrons
   through the source for each O₂ and two H₂.
===================================================================== */
(function () {
  const H = 860, d = sim('sim-water-electrolysis', H);
  const T = 6, NEVMAX = 12, RISE = 0.9, VT = 1.229, VMAX = 3;
  const cy = cycle(() => T, 1.2);
  const volt = F.ctl(d.controls, { label: '\\text{applied voltage}', cls: 'potential', min: 0, max: VMAX, step: 0.001, value: 2, unit: 'V', dec: 3, specials: [{ at: VT, label: '−E°cell' }], onInput: () => cy.reset() });
  const ro = F.readout(d);
  let hits = []; F.hover(d.stage, () => hits);
  /* the glass: arms at XA and XC, their bodies from ATOP to AFOOT; the cross tube; the column and the bulb */
  const XA = 470, XC = 930, AW = 76, ATOP = 250, AFOOT = 700, NECK = 200, COCK = 170, TIP = 90;
  const CROSS = { t: 600, b: 646 }, CX = 700, CW = 52, BULB = { y: 190, rx: 150, ry: 120, neck: 64 };
  const ELEC = 640, BOX = { x: 700, y: 800, w: 220, h: 64 };
  const FULL = ATOP + 20;                          /* the liquid's level in the arms when the run starts */
  const rate = () => Math.max(0, volt.v - VT) / (VMAX - VT);
  const wireL = walker(rounded([[XA, AFOOT + 40], [XA, BOX.y], [BOX.x - BOX.w / 2, BOX.y]], 30));
  const wireR = walker(rounded([[BOX.x + BOX.w / 2, BOX.y], [XC, BOX.y], [XC, AFOOT + 40]], 30));
  function glass(ctx, fillGas, LA, LC, LR) {
    const g = alpha(PAL.ink, 0.6), liq = alpha(PAL.muted, 0.22), gas = alpha(PAL.ink, 0.04);
    const arm = (x, level) => {
      ctx.save(); ctx.fillStyle = gas; ctx.fillRect(x - AW / 2, ATOP, AW, level - ATOP);
      ctx.fillStyle = liq; ctx.fillRect(x - AW / 2, level, AW, AFOOT - level); ctx.restore();
      line(ctx, x - AW / 2 + 2, level, x + AW / 2 - 2, level, alpha(PAL.ink, 0.4), 2);
    };
    arm(XA, LA); arm(XC, LC);
    /* the cross tube and the column, full of liquid up into the bulb */
    ctx.save(); ctx.fillStyle = liq; ctx.fillRect(XA + AW / 2, CROSS.t, XC - XA - AW, CROSS.b - CROSS.t); ctx.fillRect(CX - CW / 2, BULB.y + BULB.ry - 10, CW, CROSS.t - BULB.y - BULB.ry + 10);
    /* the bulb, filled to LR */
    ctx.beginPath(); ctx.ellipse(CX, BULB.y, BULB.rx, BULB.ry, 0, 0, TAU); ctx.clip();
    ctx.fillRect(CX - BULB.rx, LR, 2 * BULB.rx, BULB.y + BULB.ry - LR); ctx.restore();
    ctx.save(); ctx.beginPath(); ctx.ellipse(CX, BULB.y, BULB.rx, BULB.ry, 0, 0, TAU); ctx.clip(); line(ctx, CX - BULB.rx, LR, CX + BULB.rx, LR, alpha(PAL.ink, 0.4), 2); ctx.restore();
    /* outlines: each arm's outer wall whole, its inner wall broken where the cross tube joins; the column; the bulb */
    ctx.save(); ctx.strokeStyle = g; ctx.lineWidth = 3; ctx.lineJoin = 'round';
    const poly = (pts) => { ctx.beginPath(); pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.stroke(); };
    for (const [x, sIn] of [[XA, 1], [XC, -1]]) {
      poly([[x - sIn * 6, TIP], [x - sIn * 6, NECK], [x - sIn * AW / 2, ATOP], [x - sIn * AW / 2, AFOOT]]);
      poly([[x + sIn * 6, TIP], [x + sIn * 6, NECK], [x + sIn * AW / 2, ATOP], [x + sIn * AW / 2, CROSS.t]]);
      poly([[x + sIn * AW / 2, CROSS.b], [x + sIn * AW / 2, AFOOT]]);
    }
    poly([[XA + AW / 2, CROSS.b], [XC - AW / 2, CROSS.b]]);
    poly([[XA + AW / 2, CROSS.t], [CX - CW / 2, CROSS.t], [CX - CW / 2, BULB.y + BULB.ry - 6]]);
    poly([[XC - AW / 2, CROSS.t], [CX + CW / 2, CROSS.t], [CX + CW / 2, BULB.y + BULB.ry - 6]]);
    const gap = (half) => Math.asin(half / BULB.rx);
    ctx.beginPath(); ctx.ellipse(CX, BULB.y, BULB.rx, BULB.ry, 0, Math.PI / 2 + gap(CW / 2), 3 * Math.PI / 2 - gap(BULB.neck / 2)); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(CX, BULB.y, BULB.rx, BULB.ry, 0, -Math.PI / 2 + gap(BULB.neck / 2), Math.PI / 2 - gap(CW / 2)); ctx.stroke();
    ctx.restore();
    /* the bulb's open neck, the stopcocks closed, the stoppers with the electrodes through them */
    ctx.save(); ctx.fillStyle = PAL.panel; ctx.fillRect(CX - BULB.neck / 2, BULB.y - BULB.ry - 30, BULB.neck, 34); ctx.restore();
    line(ctx, CX - BULB.neck / 2, BULB.y - BULB.ry - 30, CX - BULB.neck / 2, BULB.y - BULB.ry + 6, g, 3); line(ctx, CX + BULB.neck / 2, BULB.y - BULB.ry - 30, CX + BULB.neck / 2, BULB.y - BULB.ry + 6, g, 3);
    for (const x of [XA, XC]) {
      ctx.save(); ctx.fillStyle = PAL.soft; ctx.strokeStyle = g; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.roundRect(x - 26, COCK - 12, 52, 24, 6); ctx.fill(); ctx.stroke(); ctx.restore();
      line(ctx, x - 4, COCK - 10, x + 4, COCK + 10, PAL.ink, 3);
      ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.35); ctx.strokeStyle = g; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(x - AW / 2 - 4, AFOOT); ctx.lineTo(x + AW / 2 + 4, AFOOT); ctx.lineTo(x + AW / 2 - 6, AFOOT + 40); ctx.lineTo(x - AW / 2 + 6, AFOOT + 40); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore();
      line(ctx, x, AFOOT + 40, x, ELEC + 20, PAL.ink, 3);
      ctx.save(); ctx.fillStyle = F.el('Pt'); ctx.strokeStyle = g; ctx.lineWidth = 1.5; ctx.fillRect(x - 18, ELEC - 20, 36, 40); ctx.strokeRect(x - 18, ELEC - 20, 36, 40); ctx.restore();
    }
  }
  const o2 = (ctx, x, y, a) => { ball(ctx, x - 6, y, 8, F.el('O'), a); ball(ctx, x + 6, y, 8, F.el('O'), a); };
  const h2 = (ctx, x, y, a) => { ball(ctx, x - 5, y, 6.5, F.el('H'), a); ball(ctx, x + 5, y, 6.5, F.el('H'), a); };
  let lastTex = '';
  function draw() {
    const { ctx } = begin(d.c);
    hits = [];
    const r = rate(), t = cy.now(), xi = r * t / T, V = volt.v;
    const gO = 95 * xi, gH = 2 * gO, LA = FULL + gO, LC = FULL + gH, LR = BULB.y + 40 - 0.42 * (gO + gH);
    glass(ctx, true, LA, LC, LR);
    hits.push({ x: XA, y: (ATOP + LA) / 2, r: 30, name: 'oxygen gas, O₂(g), collected over the anode' }, { x: XC, y: (ATOP + LC) / 2, r: 30, name: 'hydrogen gas, H₂(g), collected over the cathode' },
      { x: CX, y: BULB.y + 50, r: 70, name: 'the reservoir, open to the air, holding water with some sulfuric acid' }, { x: XA, y: ELEC, r: 22, name: 'the platinum anode' }, { x: XC, y: ELEC, r: 22, name: 'the platinum cathode' },
      { x: XA, y: COCK, r: 24, name: 'a stopcock, closed' }, { x: XC, y: COCK, r: 24, name: 'a stopcock, closed' });
    /* bubbles: one O₂ and two H₂ per event, rising from the platinum to the gas above */
    if (r > 0) for (let k = 0; k < NEVMAX; k++) {
      const t1 = ((k + 0.5) / NEVMAX) * T / r; if (t1 > t) break;
      const f = (t - t1) / RISE; if (f < 0 || f >= 1) continue;
      const xo = XA + (rnd(k, 1) - 0.5) * 30, yo = lerp(ELEC - 26, LA + 10, f);
      o2(ctx, xo, yo, Math.min(1, (1 - f) / 0.2)); hits.push({ x: xo, y: yo, r: 14, name: 'a bubble of oxygen, O₂, rising from the anode' });
      for (let j = 0; j < 2; j++) { const xh = XC + (j - 0.5) * 26 + (rnd(k, 3 + j) - 0.5) * 10, yh = lerp(ELEC - 26, LC + 10, f); h2(ctx, xh, yh, Math.min(1, (1 - f) / 0.2)); hits.push({ x: xh, y: yh, r: 12, name: 'a bubble of hydrogen, H₂, rising from the cathode' }); }
    }
    /* the wires and the source: electrons leave the anode for + and come from − to the cathode */
    stroke(ctx, wireL.pts, PAL.ink, 5); stroke(ctx, wireR.pts, PAL.ink, 5);
    const s = 4 * NEVMAX * xi * 26;
    electrons(ctx, wireL, 7, s, BOX, hits); electrons(ctx, wireR, 7, s, BOX, hits);
    source(ctx, BOX.x, BOX.y, BOX.w, BOX.h, true);
    hits.push({ x: BOX.x, y: BOX.y, r: 40, name: 'the voltage source' });
    /* labels */
    tag(ctx, 'O₂(g)', 330, LA - 40 < ATOP + 20 ? ATOP + 30 : (ATOP + LA) / 2, 'right', [XA - AW / 2, LA - 40 < ATOP + 20 ? ATOP + 30 : (ATOP + LA) / 2]);
    tag(ctx, 'H₂(g)', 1070, (ATOP + LC) / 2, 'left', [XC + AW / 2, (ATOP + LC) / 2]);
    tag(ctx, 'H₂O + H₂SO₄', 1000, 150, 'left', [CX + 90, BULB.y + 60]);
    tag(ctx, 'Anode', 330, ELEC, 'right', [XA - AW / 2, ELEC]); text(ctx, '+', 300, ELEC + 30, PAL.ink, { size: 26, align: 'center' });
    tag(ctx, 'Cathode', 1070, ELEC, 'left', [XC + AW / 2, ELEC]); text(ctx, '−', 1110, ELEC + 30, PAL.ink, { size: 26, align: 'center' });
    F.legend(ctx, { l: 0, r: 1400, t: 0, b: H }, [{ s: 'electron, e⁻', kind: 'dot', color: F.el('e-') }, { s: 'O₂', draw: (g, x, y) => o2(g, x, y, 1) }, { s: 'H₂', draw: (g, x, y) => h2(g, x, y, 1) }], { corner: 'bl', size: 20 });
    const rel = V > VT + 1e-9 ? '>' : V > VT - 1e-9 ? '=' : '<';
    const tex = `\\text{applied voltage} = ${hue('potential', V.toFixed(3) + '\\ \\text{V}')} ${rel} ${hue('potential', '1.229\\ \\text{V}')} = -\\kEocell`;
    if (tex !== lastTex) { lastTex = tex; ro.set(tex, 'Four electrons pass through the source for every O₂ and every two H₂, so the hydrogen arm fills twice as fast.'); }
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();

/* =====================================================================
   FIGURE 17.20: silver plating a spoon, flat, as the book draws it: a
   beaker of AgNO₃(aq) holding a silver strip wired to the + of a voltage
   source (the anode) and a spoon wired to its − (the cathode). Moving: the
   clock plays the run from 0 to t in T = 6 s and holds; the model time is
   t·(clock/T). n = It/F, the silver deposited is 107.9n g, the anode
   loses as much as the spoon gains. Ag⁺ leave the strip's face and land
   on the spoon's bowl, one for each electron drawn through the wire. The
   strip thins to 1 − 0.6·m/161 g of its width (161 g is the most the
   sliders reach); the spoon's silver coat thickens with m.
===================================================================== */
(function () {
  const H = 720, d = sim('sim-silver-plating', H);
  const T = 6, LIFE = 1.0, NEV = 14, FARADAY = 96485, M_AG = 107.9, M_MAX = 20 * 7200 / FARADAY * M_AG;
  const cy = cycle(() => T, 1.2);
  const cur = F.ctl(d.controls, { label: '\\kI', cls: 'current', min: 0.5, max: 20, step: 0.01, value: 10.23, unit: 'A', dec: 2, onInput: () => cy.reset() });
  const tmin = F.ctl(d.controls, { label: '\\kt', cls: 'time', min: 5, max: 120, step: 1, value: 60, unit: 'min', dec: 0, onInput: () => cy.reset() });
  const ro = F.readout(d);
  let hits = []; F.hover(d.stage, () => hits);
  const sig4 = (x) => (x === 0 ? '0' : x.toPrecision(4));
  const BL = 400, BR = 1000, RIM = 280, FLOOR = 660, LEVEL = 380;
  const XA = 540, SW = 48, STOP = 250, SBOT = 590, XS = 860, BOWL = { y: 560, rx: 34, ry: 56 }, HTOP = 250;
  const BOX = { x: 700, y: 100, w: 220, h: 72 };
  const wire = walker(rounded([[XA, STOP], [XA, BOX.y], [XS, BOX.y], [XS, HTOP]], 34));
  let lastTex = '';
  function draw() {
    const { ctx } = begin(d.c);
    hits = [];
    const I = cur.v, ts = tmin.v * 60, clock = cy.now(), tm = ts * clock / T;
    const n = I * tm / FARADAY, m = +sig4(n) * M_AG, k = Math.min(1, m / M_MAX);
    /* the beaker and its solution */
    const rc = 22, body = (y0) => { ctx.beginPath(); ctx.moveTo(BL, y0); ctx.lineTo(BL, FLOOR - rc); ctx.quadraticCurveTo(BL, FLOOR, BL + rc, FLOOR); ctx.lineTo(BR - rc, FLOOR); ctx.quadraticCurveTo(BR, FLOOR, BR, FLOOR - rc); ctx.lineTo(BR, y0); };
    ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.03); body(RIM); ctx.fill(); ctx.fillStyle = alpha(PAL.muted, 0.15); body(LEVEL); ctx.fill(); ctx.restore();
    hits.push({ x: 700, y: 620, r: 40, name: 'silver nitrate solution, AgNO₃(aq)' });
    /* the silver strip, thinning from its immersed face */
    const w = SW * (1 - 0.6 * k);
    ctx.save(); ctx.fillStyle = F.el('Ag'); ctx.strokeStyle = alpha(PAL.ink, 0.6); ctx.lineWidth = 1.5;
    ctx.fillRect(XA - SW / 2, STOP, SW, LEVEL - STOP); ctx.strokeRect(XA - SW / 2, STOP, SW, LEVEL - STOP);
    ctx.fillRect(XA - SW / 2, LEVEL, w, SBOT - LEVEL); ctx.strokeRect(XA - SW / 2, LEVEL, w, SBOT - LEVEL); ctx.restore();
    hits.push({ x: XA, y: 480, r: 28, name: 'the silver anode, which dissolves as Ag⁺' });
    /* the spoon: handle and bowl in a plain metal, silvered from the bowl up as m grows */
    const coat = 7 * Math.sqrt(k);
    const spoon = (c, grow) => {
      ctx.save(); ctx.fillStyle = c; ctx.strokeStyle = alpha(PAL.ink, 0.6); ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.roundRect(XS - 7 - grow, HTOP - 6, 14 + 2 * grow, BOWL.y - BOWL.ry - HTOP + 16, 7); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.ellipse(XS, HTOP + 8, 13 + grow, 18 + grow, 0, 0, TAU); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.ellipse(XS, BOWL.y, BOWL.rx + grow, BOWL.ry + grow, 0, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore();
    };
    if (coat > 0.3) spoon(F.el('Ag'), coat);
    spoon(F.mixColor(PAL.muted, F.el('Ag'), Math.min(1, 4 * k)), 0);
    hits.push({ x: XS, y: BOWL.y, r: 40, name: m > 0 ? `the spoon, the cathode, silvered with ${sig4(m)} g of silver` : 'the spoon, the cathode' });
    /* the solution over the immersed parts, then the glass */
    ctx.save(); ctx.fillStyle = alpha(PAL.muted, 0.1); ctx.fillRect(BL + 2, LEVEL, BR - BL - 4, FLOOR - LEVEL - 2); ctx.restore();
    ctx.save(); ctx.strokeStyle = alpha(PAL.ink, 0.6); ctx.lineWidth = 4; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.moveTo(BL - 16, RIM - 10); ctx.quadraticCurveTo(BL, RIM - 6, BL, RIM + 14); ctx.lineTo(BL, FLOOR - rc); ctx.quadraticCurveTo(BL, FLOOR, BL + rc, FLOOR);
    ctx.lineTo(BR - rc, FLOOR); ctx.quadraticCurveTo(BR, FLOOR, BR, FLOOR - rc); ctx.lineTo(BR, RIM); ctx.stroke(); ctx.restore();
    line(ctx, BL + 2, LEVEL, BR - 2, LEVEL, alpha(PAL.ink, 0.35), 2);
    /* Ag⁺ from the strip's face to the spoon's bowl */
    for (let e = 0; e < NEV; e++) {
      const t1 = LIFE + ((e + 0.5) / NEV) * (T - LIFE), f = (clock - (t1 - LIFE)) / LIFE;
      if (f < 0 || f >= 1) continue;
      const y0 = lerp(LEVEL + 40, SBOT - 30, rnd(e, 1)), a = (rnd(e, 2) - 0.5) * 2.2, p = [XA - SW / 2 + w + 12, y0], q = [XS - (BOWL.rx + coat + 12) * Math.cos(a), BOWL.y + (BOWL.ry + coat + 12) * Math.sin(a)];
      const g = F.ease.smooth(f), x = lerp(p[0], q[0], g), y = lerp(p[1], q[1], g) - 30 * Math.sin(Math.PI * g);
      ball(ctx, x, y, 12, F.el('Ag'), Math.min(1, f / 0.2, (1 - f) / 0.15)); hits.push({ x, y, r: 14, name: 'a silver ion, Ag⁺, moving from the anode to the spoon' });
    }
    /* the wire, the source and the electrons */
    stroke(ctx, wire.pts, PAL.ink, 5);
    electrons(ctx, wire, 16, NEV * clock / T * wire.L / 16, BOX, hits);
    source(ctx, BOX.x, BOX.y, BOX.w, BOX.h, true);
    hits.push({ x: BOX.x, y: BOX.y, r: 40, name: 'the voltage source' });
    text(ctx, 'e⁻', XA - 60, 160, PAL.ink, { size: 22, align: 'center' }); arrow(ctx, XA - 34, 200, XA - 34, 130, PAL.ink, 3);
    text(ctx, 'e⁻', XS + 60, 160, PAL.ink, { size: 22, align: 'center' }); arrow(ctx, XS + 34, 130, XS + 34, 200, PAL.ink, 3);
    tag(ctx, 'silver (anode)', 330, 470, 'right', [XA - SW / 2, 470]);
    tag(ctx, 'Spoon (cathode)', 1070, BOWL.y, 'left', [XS + BOWL.rx + coat + 4, BOWL.y]);
    tag(ctx, 'AgNO₃(aq)', 700, 628, 'center');
    F.legend(ctx, { l: 0, r: 1400, t: 0, b: H }, [{ s: 'electron, e⁻', kind: 'dot', color: F.el('e-') }, { s: 'Ag⁺', draw: (g, x, y) => ball(g, x, y, 12, F.el('Ag')) }], { corner: 'bottom', row: true, size: 20 });
    const tex = `\\kn = \\frac{\\kI\\,\\kt}{\\kFaraday} = \\frac{(${hue('current', I.toFixed(2) + '\\ \\text{A}')})(${hue('time', Math.round(tm) + '\\ \\text{s}')})}{${hue('charge', '96\\,485\\ \\text{C/mol}')}} = ${hue('amount', sig4(n) + '\\ \\text{mol}')}`;
    const note = `One mole of silver plates onto the spoon for each mole of electrons, so the spoon has gained $${hue('mass', sig4(m) + '\\ \\text{g}')}$.`;
    if (tex !== lastTex) { lastTex = tex; ro.set(tex, note, { values: false }); }
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();
};
