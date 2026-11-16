/* Figures for section 17.3 Electrode and Cell Potentials. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['17.3'] = function (root, F) {
const { fmt, tex, C, PAL, alpha, register, begin, line, arrow, text, dot, topline } = F;
const sim = (id, H) => F.sim(root, id, H);
const MINUS = '−';
const signed = (x, d) => (Math.abs(x) < 1e-9 ? fmt(0, d) : (x > 0 ? '+' : MINUS) + fmt(Math.abs(x), d));
const frac = (x) => x - Math.floor(x);
const clamp01 = (x) => Math.min(1, Math.max(0, x));
const inTex = (s) => s.replace(MINUS, '-');

/* =====================================================================
   FIGURE 17.5 + 17.6: the SHE wired against a half-cell X, flat, as the
   book draws 17.6. Left beaker: 1 M H⁺ holding the SHE (a glass jacket
   with its H₂ inlet, the platinum wire down its middle, the platinum
   plate at its mouth). Right beaker: a strip of the metal X in 1 M of
   its ion. A salt bridge between, a voltmeter on the wire, the SHE on
   its black (−) input and X on its red (+) input. Beneath, each electrode
   surface magnified as 17.5 magnifies the platinum, and between them the
   two half-reactions and the cell reaction. Moving on a continuous
   clock: H₂ bubbles rise from the jacket's mouth, the electrons run
   through the wire (SHE to X for a positive reading, X to SHE for a
   negative one), and particles meet each surface.
===================================================================== */
(function () {
  const H = 1150, d = sim('sim-she-cell', H);
  const CU_BLUE = '#3c9ad6';                    /* the blue of Cu²⁺(aq) */
  const RED_IN = '#c62828', BLACK_IN = '#1f1f1f';   /* the voltmeter's own red and black inputs */
  const X = {
    ag: { el: 'Ag', name: 'silver', ion: 'Ag⁺', n: 1, E: 0.7996, dec: 4, label: 'Ag⁺/Ag' },
    cu: { el: 'Cu', name: 'copper', ion: 'Cu²⁺', n: 2, E: 0.337, dec: 3, label: 'Cu²⁺/Cu' },
    pb: { el: 'Pb', name: 'lead', ion: 'Pb²⁺', n: 2, E: -0.1262, dec: 4, label: 'Pb²⁺/Pb' },
    zn: { el: 'Zn', name: 'zinc', ion: 'Zn²⁺', n: 2, E: -0.7618, dec: 4, label: 'Zn²⁺/Zn' },
  };
  const pick = F.choice(d.controls, { label: '\\text{half-cell X}', options: Object.keys(X).map((k) => ({ value: k, label: X[k].label })), value: 'cu', aria: 'the half-cell wired to the red input' });
  const cy = F.cycle(() => Infinity, 0);
  let hits = []; F.hover(d.stage, () => hits);

  /* the bench: beakers, the SHE's jacket and plate, the strip, the bridge, the voltmeter, the wire */
  const LX = 360, RX = 1040, HW = 210, RIM = 330, FLOOR = 700, LEVEL = 452;
  const JX = 290, JW = 30, JTOP = 250, JBOT = 606, ARM = 292, PLATE = { t: 594, b: 664, w: 58 };
  const XC = 1130, TOP = 268, BOT = 650, SW = 46;
  const VM = { x: 700, y: 150, w: 340, h: 104 }, WY = VM.y;
  const BL = 490, BR = 910, BT = 292, BW = 62, PLUG = 562;
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
  const wire = walker(rounded([[JX, JTOP], [JX, WY], [XC, WY], [XC, TOP]], 50));
  const bridgeLine = rounded([[BL, PLUG], [BL, BT], [BR, BT], [BR, PLUG]], 70);

  function beaker(ctx, cx, tint) {
    const l = cx - HW, r = cx + HW, rc = 24;
    const body = (y0) => { ctx.beginPath(); ctx.moveTo(l, y0); ctx.lineTo(l, FLOOR - rc); ctx.quadraticCurveTo(l, FLOOR, l + rc, FLOOR); ctx.lineTo(r - rc, FLOOR); ctx.quadraticCurveTo(r, FLOOR, r, FLOOR - rc); ctx.lineTo(r, y0); };
    ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.03); body(RIM); ctx.fill(); ctx.fillStyle = tint; body(LEVEL); ctx.fill(); ctx.restore();
  }
  function glass(ctx, cx) {
    const l = cx - HW, r = cx + HW, rc = 24;
    ctx.save(); ctx.strokeStyle = alpha(PAL.ink, 0.6); ctx.lineWidth = 4; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.moveTo(l - 18, RIM - 12); ctx.quadraticCurveTo(l, RIM - 8, l, RIM + 16); ctx.lineTo(l, FLOOR - rc); ctx.quadraticCurveTo(l, FLOOR, l + rc, FLOOR);
    ctx.lineTo(r - rc, FLOOR); ctx.quadraticCurveTo(r, FLOOR, r, FLOOR - rc); ctx.lineTo(r, RIM); ctx.stroke(); ctx.restore();
    line(ctx, l + 2, LEVEL, r - 2, LEVEL, alpha(PAL.ink, 0.35), 2);
  }
  const lead = (ctx, x1, y1, x2, y2) => line(ctx, x1, y1, x2, y2, alpha(PAL.ink, 0.55), 1.5);

  /* One meeting of particles with an electrode surface, at progress u of a
     reduction; an oxidation is the same meeting played backwards. Drawn in
     the magnified circle's own units, the surface at x = 0, the solution to
     its right. */
  const lerp = (a, b, k) => a + (b - a) * k;
  function ball(ctx, x, y, r, c, a = 1) {
    if (a <= 0.01) return;
    ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = c; ctx.strokeStyle = alpha(PAL.ink, 0.55); ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(x, y, r, 0, 2 * Math.PI); ctx.fill(); ctx.stroke(); ctx.restore();
  }
  function meetH(ctx, ly, u) {
    const ce = F.el('e-'), ch = F.el('H');
    if (u < 0.5) {
      const k = clamp01(u / 0.5), a = clamp01(u / 0.08);
      for (const s of [-1, 1]) ball(ctx, lerp(200, 16, k), ly + s * 20, 9, ch, a);
      const ke = clamp01((u - 0.22) / 0.28);
      if (ke > 0) for (const s of [-1, 1]) ball(ctx, lerp(-84, 2, ke), ly + s * 20, 6.5, ce);
    } else if (u < 0.62) {
      const k = (u - 0.5) / 0.12;
      for (const s of [-1, 1]) ball(ctx, 24, ly + s * lerp(20, 9, k), 12, ch);
    } else {
      const k = (u - 0.62) / 0.38, a = 1 - clamp01((u - 0.86) / 0.14);
      for (const s of [-1, 1]) ball(ctx, lerp(24, 210, k), ly + s * 9, 12, ch, a);
    }
  }
  function meetM(ctx, ly, u, el, n) {
    const ce = F.el('e-'), cm = F.el(el);
    if (u < 0.5) {
      ball(ctx, lerp(200, 24, u / 0.5), ly, 14, cm, clamp01(u / 0.08));
      const ke = clamp01((u - 0.22) / 0.28);
      if (ke > 0) for (let j = 0; j < n; j++) ball(ctx, lerp(-84, 4, ke), ly + (j - (n - 1) / 2) * 16, 6.5, ce);
    } else {
      ball(ctx, 22, ly, lerp(14, 22, clamp01((u - 0.5) / 0.1)), cm, 1 - clamp01((u - 0.8) / 0.2));
    }
  }
  function surface(ctx, cx, cyy, R, metal, fill, u0, meet) {
    const xs = cx - 46;
    ctx.save(); ctx.beginPath(); ctx.arc(cx, cyy, R, 0, 2 * Math.PI); ctx.fillStyle = PAL.panel; ctx.fill(); ctx.clip();
    if (fill) { ctx.fillStyle = fill; ctx.fillRect(cx - R, cyy - R, 2 * R, 2 * R); }
    const cm = F.el(metal);
    for (let row = -6; row <= 6; row++) {
      const y = cyy + row * 35, off = (row & 1) ? 21 : 0;
      for (let x = xs - 21 - off; x > cx - R - 36; x -= 42) ball(ctx, x, y, 22, cm);
    }
    ctx.translate(xs, 0);
    [-94, 0, 94].forEach((dy, i) => meet(cyy + dy, frac(u0 + i / 3)));
    ctx.restore();
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(cx, cyy, R, 0, 2 * Math.PI); ctx.stroke(); ctx.restore();
  }
  /* the small ring round an electrode's surface and the two lines that carry it to its magnified circle */
  function callout(ctx, sx, sy, sr, cx, cyy, R) {
    const g = alpha(PAL.ink, 0.35);
    ctx.save(); ctx.strokeStyle = g; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(sx, sy, sr, 0, 2 * Math.PI); ctx.stroke(); ctx.restore();
    line(ctx, sx - sr, sy, cx - R, cyy, g, 2); line(ctx, sx + sr, sy, cx + R, cyy, g, 2);
  }

  const CXS = [200, 1200], CYS = 958, R = 165, PERIOD = 3.6, MID = 700;
  function draw() {
    const { ctx } = begin(d.c);
    hits = [];
    const k = pick.value, x = X[k], t = cy.now(), dir = Math.sign(x.E), reduceAtX = dir > 0;
    const right = pick.mixColor((q) => (q === 'cu' ? alpha(F.fact(CU_BLUE), 0.32) : alpha(PAL.muted, 0.13))), left = alpha(PAL.muted, 0.13);
    const reading = `${signed(x.E, x.dec)} V`;
    topline(ctx, reduceAtX ? `Electrons run from the SHE to the ${x.name}, ${x.ion} is reduced, and the voltmeter reads ${reading}.`
      : `Electrons run from the ${x.name} to the SHE, ${x.name} is oxidized, and the voltmeter reads ${reading}.`);

    /* the magnified surfaces first, so the bench's callout lines run under nothing */
    const RING = [[JX, 632], [XC, 606]];
    callout(ctx, RING[0][0], RING[0][1], 46, CXS[0], CYS, R);
    callout(ctx, RING[1][0], RING[1][1], 46, CXS[1], CYS, R);
    const u = t / PERIOD;
    surface(ctx, CXS[0], CYS, R, 'Pt', alpha(PAL.muted, 0.08), u, (ly, w) => meetH(ctx, ly, reduceAtX ? 1 - w : w));
    surface(ctx, CXS[1], CYS, R, x.el, k === 'cu' ? alpha(F.fact(CU_BLUE), 0.22) : alpha(PAL.muted, 0.08), u, (ly, w) => meetM(ctx, ly, reduceAtX ? w : 1 - w, x.el, x.n));
    hits.push({ x: CXS[0] - 105, y: CYS, r: 60, name: 'platinum atoms at the electrode’s surface' }, { x: CXS[1] - 105, y: CYS, r: 60, name: `${x.name} atoms at the electrode’s surface` },
      { x: CXS[0] + 60, y: CYS, r: 80, name: '1 M H⁺(aq) at the platinum' }, { x: CXS[1] + 60, y: CYS, r: 80, name: `1 M ${x.ion}(aq) at the ${x.name}` });

    /* between the circles: what happens at each electrode, and their sum */
    const e = x.n === 1 ? 'e⁻' : `${x.n}e⁻`, c2 = x.n === 1 ? '2' : '';
    const two = (y, a, b) => { text(ctx, a, MID, y, PAL.ink, { size: 22, weight: 600, align: 'center' }); text(ctx, b, MID, y + 34, PAL.ink, { size: 23, align: 'center' }); };
    two(826, reduceAtX ? 'anode, oxidation at the platinum' : 'cathode, reduction at the platinum', reduceAtX ? 'H₂(g) ⟶ 2H⁺(aq) + 2e⁻' : '2H⁺(aq) + 2e⁻ ⟶ H₂(g)');
    two(920, reduceAtX ? `cathode, reduction at the ${x.name}` : `anode, oxidation at the ${x.name}`, reduceAtX ? `${x.ion}(aq) + ${e} ⟶ ${x.el}(s)` : `${x.el}(s) ⟶ ${x.ion}(aq) + ${e}`);
    line(ctx, MID - 190, 984, MID + 190, 984, alpha(PAL.ink, 0.3), 1.5);
    two(1014, 'cell reaction', reduceAtX ? `H₂(g) + ${c2}${x.ion}(aq) ⟶ 2H⁺(aq) + ${c2}${x.el}(s)` : `${c2}${x.el}(s) + 2H⁺(aq) ⟶ ${c2}${x.ion}(aq) + H₂(g)`);
    const hyd = (g, px, py) => { ball(g, px - 6, py, 8, F.el('H')); ball(g, px + 6, py, 8, F.el('H')); };
    F.legend(ctx, { l: 380, r: 1020, t: 1070, b: 1144 }, [{ s: 'e⁻', draw: (g, px, py) => ball(g, px, py, 6, F.el('e-')) }, { s: 'H⁺', draw: (g, px, py) => ball(g, px, py, 7, F.el('H')) },
      { s: 'H₂', draw: hyd }, { s: 'Pt', draw: (g, px, py) => ball(g, px, py, 10, F.el('Pt')) }, { s: x.el, draw: (g, px, py) => ball(g, px, py, 10, F.el(x.el)) }, { s: x.ion, draw: (g, px, py) => ball(g, px, py, 8, F.el(x.el)) }],
      { corner: 'bottom', row: true, size: 20 });

    beaker(ctx, LX, left); beaker(ctx, RX, right);
    hits.push({ x: LX + 110, y: 640, r: 50, name: '1 M H⁺(aq)' }, { x: RX - 60, y: 640, r: 50, name: `1 M ${x.ion}(aq)` });
    /* the SHE: the glass jacket, closed at its top and open at its foot, full of H₂; its inlet; the platinum wire down its middle and the plate at its mouth */
    ctx.save(); ctx.fillStyle = PAL.panel; ctx.strokeStyle = alpha(PAL.ink, 0.6); ctx.lineWidth = 3; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.moveTo(JX - JW - 9, JBOT); ctx.lineTo(JX - JW, JBOT - 34); ctx.lineTo(JX - JW, JTOP + JW); ctx.arc(JX, JTOP + JW, JW, Math.PI, 0); ctx.lineTo(JX + JW, JBOT - 34); ctx.lineTo(JX + JW + 9, JBOT); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(JX - JW, ARM - 11); ctx.lineTo(JX - JW - 46, ARM - 11); ctx.moveTo(JX - JW, ARM + 11); ctx.lineTo(JX - JW - 46, ARM + 11); ctx.stroke();
    ctx.fillRect(JX - JW - 2, ARM - 9.5, 5, 19); ctx.restore();
    line(ctx, JX, JTOP, JX, PLATE.t, PAL.ink, 3.5);
    ctx.save(); ctx.fillStyle = F.el('Pt'); ctx.strokeStyle = alpha(PAL.ink, 0.7); ctx.lineWidth = 2;
    ctx.fillRect(JX - PLATE.w / 2, PLATE.t, PLATE.w, PLATE.b - PLATE.t); ctx.strokeRect(JX - PLATE.w / 2, PLATE.t, PLATE.w, PLATE.b - PLATE.t); ctx.restore();
    hits.push({ x: JX, y: 360, r: 30, name: 'the glass jacket, full of H₂ gas' }, { x: JX, y: 500, r: 30, name: 'the glass jacket, full of H₂ gas' }, { x: JX - JW - 24, y: ARM, r: 20, name: 'the H₂ inlet' },
      { x: JX, y: (PLATE.t + PLATE.b) / 2, r: 30, name: 'the platinum electrode' });
    /* the metal strip of X */
    ctx.save(); ctx.fillStyle = pick.mixColor((q) => F.el(X[q].el)); ctx.strokeStyle = alpha(PAL.ink, 0.7); ctx.lineWidth = 2;
    ctx.fillRect(XC - SW / 2, TOP, SW, BOT - TOP); ctx.strokeRect(XC - SW / 2, TOP, SW, BOT - TOP); ctx.restore();
    hits.push({ x: XC, y: 420, r: 28, name: `the ${x.name} electrode` }, { x: XC, y: 540, r: 28, name: `the ${x.name} electrode` });
    /* the salt bridge, a porous plug in each foot */
    stroke(ctx, bridgeLine, alpha(PAL.ink, 0.55), BW + 4, 'butt'); stroke(ctx, bridgeLine, PAL.panel, BW - 4, 'butt'); stroke(ctx, bridgeLine, alpha(PAL.muted, 0.14), BW - 4, 'butt');
    for (const bx of [BL, BR]) { ctx.save(); ctx.fillStyle = PAL.muted; ctx.fillRect(bx - BW / 2 + 2, PLUG - 18, BW - 4, 18); ctx.restore(); hits.push({ x: bx, y: PLUG - 9, r: 22, name: 'a porous plug' }); }
    hits.push({ x: MID, y: BT, r: 40, name: 'the salt bridge' });
    for (const [cx, tint] of [[LX, left], [RX, right]]) { ctx.save(); ctx.fillStyle = tint; ctx.globalAlpha = 0.5; ctx.fillRect(cx - HW + 2, LEVEL, 2 * HW - 4, FLOOR - LEVEL - 2); ctx.restore(); glass(ctx, cx); }
    /* H₂ bubbles out of the jacket's mouth, rising either side of it to the surface */
    for (let i = 0; i < 16; i++) {
      const h = frac(t * 0.42 + i / 16), side = i % 2 ? 1 : -1, x0 = JX + side * (JW + 14 + ((i * 37) % 26)), y = JBOT + 8 - h * (JBOT + 8 - LEVEL - 10);
      ball(ctx, x0 + side * 16 * h + 4 * Math.sin(7 * h + i), y, 6 + (i % 3) * 1.5, PAL.panel, 0.95);
      if (i < 2) hits.push({ x: x0, y, r: 16, name: 'a bubble of H₂ gas' });
    }
    /* X's ions meeting its strip in the cell: arriving for a reduction, leaving for an oxidation */
    for (let i = 0; i < 3; i++) {
      const w = frac(t / 1.6 + i / 3), p = reduceAtX ? w : 1 - w, y0 = 500 + i * 46, xs = XC - SW / 2 - 12, xf = xs - 120;
      ball(ctx, lerp(xf, xs, p), y0 + 18 * Math.sin(3 * p + i) * (1 - p), 11, F.el(x.el), Math.min(1, (reduceAtX ? w : 1 - w) / 0.15, (reduceAtX ? 1 - w : w) / 0.1 + 0.2));
    }

    /* the wire, the voltmeter with its two inputs, and the electrons */
    stroke(ctx, wire.pts, PAL.ink, 5);
    const NE = 24, sp = wire.L / NE;
    for (let i = 0; i < NE; i++) {
      const s = ((i * sp + dir * t * 150) % wire.L + wire.L) % wire.L, [ex, ey] = wire.at(s);
      if (Math.abs(ex - VM.x) < VM.w / 2 + 14 && Math.abs(ey - VM.y) < VM.h) continue;
      if (ey > JTOP - 4 && ex < MID) continue;
      dot(ctx, ex, ey, F.el('e-'), true, 8);
      hits.push({ x: ex, y: ey, r: 12, name: 'an electron, e⁻, in the wire' });
    }
    ctx.save(); ctx.fillStyle = PAL.soft; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.roundRect(VM.x - VM.w / 2, VM.y - VM.h / 2, VM.w, VM.h, 16); ctx.fill(); ctx.stroke();
    ctx.fillStyle = alpha(C('potential'), 0.1); ctx.strokeStyle = alpha(PAL.ink, 0.5); ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.roundRect(VM.x - VM.w / 2 + 40, VM.y - VM.h / 2 + 14, VM.w - 80, VM.h - 28, 8); ctx.fill(); ctx.stroke(); ctx.restore();
    text(ctx, reading, VM.x, VM.y, C('potential'), { size: 42, weight: 600, align: 'center' });
    const TB = VM.x - VM.w / 2 + 20, TR = VM.x + VM.w / 2 - 20;
    ball(ctx, TB, VM.y, 11, F.fact(BLACK_IN)); ball(ctx, TR, VM.y, 11, F.fact(RED_IN));
    hits.push({ x: VM.x, y: VM.y, r: 50, name: 'the voltmeter' }, { x: TB, y: VM.y, r: 16, name: 'the black (negative) input, wired to the SHE' }, { x: TR, y: VM.y, r: 16, name: 'the red (positive) input, wired to half-cell X' });
    text(ctx, 'black (−)', TB, 226, PAL.ink, { size: 19, align: 'center' }); text(ctx, 'Voltmeter', VM.x, 226, PAL.ink, { size: 22, align: 'center' }); text(ctx, 'red (+)', TR, 226, PAL.ink, { size: 19, align: 'center' });
    /* the electrons' direction, as the book marks it on both sides of the meter */
    text(ctx, 'e⁻ flow', 392, 112, PAL.ink, { size: 22, align: 'right' });
    for (const x0 of [406, 916]) { if (dir > 0) arrow(ctx, x0, 112, x0 + 80, 112, PAL.ink, 3); else arrow(ctx, x0 + 80, 112, x0, 112, PAL.ink, 3); }

    /* labels on the parts that hold still */
    text(ctx, 'Standard hydrogen', 22, 186, PAL.ink, { size: 22, weight: 600 }); text(ctx, 'electrode (SHE)', 22, 214, PAL.ink, { size: 22, weight: 600 });
    text(ctx, '1 bar H₂(g)', 132, ARM, PAL.ink, { size: 22, align: 'right' }); arrow(ctx, 142, ARM, JX - JW - 52, ARM, PAL.ink, 3);
    text(ctx, 'Pt wire', 132, 392, PAL.ink, { size: 22, align: 'right' }); lead(ctx, 140, 392, JX - 3, 392);
    text(ctx, 'H₂(g)', 132, 520, PAL.ink, { size: 22, align: 'right' }); lead(ctx, 140, 520, JX - JW - 22, 520);
    text(ctx, 'Pt electrode', 132, 640, PAL.ink, { size: 22, align: 'right' }); lead(ctx, 140, 640, JX - PLATE.w / 2, 640);
    text(ctx, `${x.el} electrode`, XC + 56, 296, PAL.ink, { size: 22 }); lead(ctx, XC + 50, 296, XC + SW / 2, 304);
    text(ctx, 'T = 298 K', MID, 640, PAL.ink, { size: 22, align: 'center' });
    text(ctx, '1 M H⁺(aq)', 384, 732, PAL.ink, { size: 22 }); text(ctx, `1 M ${x.ion}(aq)`, 1040, 732, PAL.ink, { size: 22, align: 'right' });

    tex(d.readout, `\\kEocell = \\kEoX - \\kEshe = ${inTex(signed(x.E, x.dec))}\\ \\text{V} - 0\\ \\text{V} = ${inTex(signed(x.E, x.dec))}\\ \\text{V}`);
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();

/* =====================================================================
   SIM: Table 17.1 ranked by E°, strongest oxidant at the top. Each row
   holds its oxidant, its reductant, E° as printed and a bar from the
   SHE's 0 V to E° on one scale, +3.0 V to −3.1 V (every value of the
   table fits). The book prints Zn²⁺/Zn (−0.7618 V) below Mn²⁺ and
   Zn(OH)₂; here the rows stand in the order of their values. Still: the
   reader takes an oxidant (the cathode) and a reductant (the anode), and
   E°cell is how far the cathode's bar end lies to the right of the
   anode's.
===================================================================== */
(function () {
  const ROWH = 29, Y1 = 208, H = 1278, d = sim('sim-ladder', H);
  /* [id, oxidant, reductant, half-reaction, E° as printed] in the table's order */
  const ROWS = [
    ['f2', 'F₂', 'F⁻', 'F₂(g) + 2e⁻ ⟶ 2F⁻(aq)', '+2.866'],
    ['pbo2', 'PbO₂', 'PbSO₄', 'PbO₂(s) + SO₄²⁻(aq) + 4H⁺(aq) + 2e⁻ ⟶ PbSO₄(s) + 2H₂O(l)', '+1.69'],
    ['mno4-mn', 'MnO₄⁻', 'Mn²⁺', 'MnO₄⁻(aq) + 8H⁺(aq) + 5e⁻ ⟶ Mn²⁺(aq) + 4H₂O(l)', '+1.507'],
    ['au', 'Au³⁺', 'Au', 'Au³⁺(aq) + 3e⁻ ⟶ Au(s)', '+1.498'],
    ['cl2', 'Cl₂', 'Cl⁻', 'Cl₂(g) + 2e⁻ ⟶ 2Cl⁻(aq)', '+1.35827'],
    ['o2', 'O₂', 'H₂O', 'O₂(g) + 4H⁺(aq) + 4e⁻ ⟶ 2H₂O(l)', '+1.229'],
    ['pt', 'Pt²⁺', 'Pt', 'Pt²⁺(aq) + 2e⁻ ⟶ Pt(s)', '+1.20'],
    ['br2', 'Br₂', 'Br⁻', 'Br₂(aq) + 2e⁻ ⟶ 2Br⁻(aq)', '+1.0873'],
    ['ag', 'Ag⁺', 'Ag', 'Ag⁺(aq) + e⁻ ⟶ Ag(s)', '+0.7996'],
    ['hg2', 'Hg₂²⁺', 'Hg', 'Hg₂²⁺(aq) + 2e⁻ ⟶ 2Hg(l)', '+0.7973'],
    ['fe3', 'Fe³⁺', 'Fe²⁺', 'Fe³⁺(aq) + e⁻ ⟶ Fe²⁺(aq)', '+0.771'],
    ['mno4-mno2', 'MnO₄⁻', 'MnO₂', 'MnO₄⁻(aq) + 2H₂O(l) + 3e⁻ ⟶ MnO₂(s) + 4OH⁻(aq)', '+0.558'],
    ['i2', 'I₂', 'I⁻', 'I₂(s) + 2e⁻ ⟶ 2I⁻(aq)', '+0.5355'],
    ['nio2', 'NiO₂', 'Ni(OH)₂', 'NiO₂(s) + 2H₂O(l) + 2e⁻ ⟶ Ni(OH)₂(s) + 2OH⁻(aq)', '+0.49'],
    ['cu', 'Cu²⁺', 'Cu', 'Cu²⁺(aq) + 2e⁻ ⟶ Cu(s)', '+0.34'],
    ['hg2cl2', 'Hg₂Cl₂', 'Hg', 'Hg₂Cl₂(s) + 2e⁻ ⟶ 2Hg(l) + 2Cl⁻(aq)', '+0.26808'],
    ['agcl', 'AgCl', 'Ag', 'AgCl(s) + e⁻ ⟶ Ag(s) + Cl⁻(aq)', '+0.22233'],
    ['sn4', 'Sn⁴⁺', 'Sn²⁺', 'Sn⁴⁺(aq) + 2e⁻ ⟶ Sn²⁺(aq)', '+0.151'],
    ['h', 'H⁺', 'H₂', '2H⁺(aq) + 2e⁻ ⟶ H₂(g)', '0.00'],
    ['pb', 'Pb²⁺', 'Pb', 'Pb²⁺(aq) + 2e⁻ ⟶ Pb(s)', '−0.1262'],
    ['sn2', 'Sn²⁺', 'Sn', 'Sn²⁺(aq) + 2e⁻ ⟶ Sn(s)', '−0.1375'],
    ['ni', 'Ni²⁺', 'Ni', 'Ni²⁺(aq) + 2e⁻ ⟶ Ni(s)', '−0.257'],
    ['co', 'Co²⁺', 'Co', 'Co²⁺(aq) + 2e⁻ ⟶ Co(s)', '−0.28'],
    ['pbso4', 'PbSO₄', 'Pb', 'PbSO₄(s) + 2e⁻ ⟶ Pb(s) + SO₄²⁻(aq)', '−0.3505'],
    ['cd', 'Cd²⁺', 'Cd', 'Cd²⁺(aq) + 2e⁻ ⟶ Cd(s)', '−0.4030'],
    ['fe2', 'Fe²⁺', 'Fe', 'Fe²⁺(aq) + 2e⁻ ⟶ Fe(s)', '−0.447'],
    ['cr', 'Cr³⁺', 'Cr', 'Cr³⁺(aq) + 3e⁻ ⟶ Cr(s)', '−0.744'],
    ['mn', 'Mn²⁺', 'Mn', 'Mn²⁺(aq) + 2e⁻ ⟶ Mn(s)', '−1.185'],
    ['znoh2', 'Zn(OH)₂', 'Zn', 'Zn(OH)₂(s) + 2e⁻ ⟶ Zn(s) + 2OH⁻(aq)', '−1.245'],
    ['zn', 'Zn²⁺', 'Zn', 'Zn²⁺(aq) + 2e⁻ ⟶ Zn(s)', '−0.7618'],
    ['al', 'Al³⁺', 'Al', 'Al³⁺(aq) + 3e⁻ ⟶ Al(s)', '−1.662'],
    ['mg', 'Mg²⁺', 'Mg', 'Mg²⁺(aq) + 2e⁻ ⟶ Mg(s)', '−2.372'],
    ['na', 'Na⁺', 'Na', 'Na⁺(aq) + e⁻ ⟶ Na(s)', '−2.71'],
    ['ca', 'Ca²⁺', 'Ca', 'Ca²⁺(aq) + 2e⁻ ⟶ Ca(s)', '−2.868'],
    ['ba', 'Ba²⁺', 'Ba', 'Ba²⁺(aq) + 2e⁻ ⟶ Ba(s)', '−2.912'],
    ['k', 'K⁺', 'K', 'K⁺(aq) + e⁻ ⟶ K(s)', '−2.931'],
    ['li', 'Li⁺', 'Li', 'Li⁺(aq) + e⁻ ⟶ Li(s)', '−3.04'],
  ].map(([id, ox, red, half, s]) => ({ id, ox, red, half, s, E: parseFloat(s.replace(MINUS, '-')), dec: (s.split('.')[1] || '').length }));
  const BY = Object.fromEntries(ROWS.map((r) => [r.id, r]));
  const RANK = ROWS.slice().sort((a, b) => b.E - a.E);
  RANK.forEach((r, i) => { r.y = Y1 + i * ROWH; });
  const opts = RANK.map((r) => ({ value: r.id, label: `${r.ox}/${r.red}, ${r.s} V` }));
  const cat = F.select(d.controls, { label: '\\text{cathode}', options: opts, value: 'ag', aria: 'the cathode half-cell', key: 'cathode' });
  const an = F.select(d.controls, { label: '\\text{anode}', options: opts, value: 'cu', aria: 'the anode half-cell', key: 'anode' });
  /* columns: oxidant | reductant about CX, E° ending at XV, then the scale, 114 units a volt about the SHE at X0 */
  const CX = 330, XV = 606, X0 = 1004, U = 114, XL = X0 - 3.1 * U, XR = X0 + 3.0 * U, YAX = 144, YARR = 176, BH = 15, YB = Y1 + 36 * ROWH + ROWH / 2;
  const X = (e) => X0 + e * U;
  let hits = [];
  F.hover(d.stage, () => hits);
  /* a tap on an oxidant takes it for the cathode; a tap on a reductant takes it for the anode */
  d.c.style.cursor = 'pointer';
  d.c.addEventListener('click', (ev) => {
    const b = d.c.getBoundingClientRect(); if (!b.width) return;
    const px = ((ev.clientX - b.left) * 1400) / b.width, py = ((ev.clientY - b.top) * 1400) / b.width;
    const r = RANK.find((q) => Math.abs(py - q.y) <= ROWH / 2); if (!r) return;
    if (px > 160 && px <= CX) { if (r.id !== cat.value) cat.drive(r.id); } else if (px > CX && px < 500) { if (r.id !== an.value) an.drive(r.id); }
  });
  const value = (r) => fmt(r.E, r.dec);
  const round = (v, dec) => { const m = 10 ** dec; return Math.sign(v) * Math.round(Math.abs(v) * m + 1e-6) / m; };
  function pill(ctx, x0, x1, y, color) {
    ctx.save(); ctx.fillStyle = color; ctx.beginPath(); ctx.roundRect(Math.min(x0, x1), y - ROWH / 2 + 2, Math.abs(x1 - x0), ROWH - 4, 6); ctx.fill(); ctx.restore();
  }
  function draw() {
    const { ctx } = begin(d.c);
    const cp = C('potential'), cC = F.ref('cathode-half-cell'), cA = F.ref('anode-half-cell');
    const rc = BY[cat.value], ra = BY[an.value], same = rc === ra;
    const xc = X(cat.mix((q) => BY[q].E)), xa = X(an.mix((q) => BY[q].E)), yc = cat.mix((q) => BY[q].y), ya = an.mix((q) => BY[q].y);
    const dec = Math.min(rc.dec, ra.dec), ec = round(rc.E - ra.E, dec);
    topline(ctx, same ? 'The same half-reaction at both electrodes gives a cell potential of zero and no net reaction.'
      : ec > 0 ? `The entry for ${rc.ox} is above the entry for ${ra.red}, so ${rc.ox} oxidizes ${ra.red} spontaneously.`
        : `The entry for ${rc.ox} is below the entry for ${ra.red}, so ${rc.ox} does not oxidize ${ra.red} spontaneously.`);
    /* the frame: column heads, the scale with a faint rule at each volt, the SHE's zero */
    text(ctx, 'oxidant', CX - 14, 118, PAL.ink, { size: 23, weight: 600, align: 'right' });
    text(ctx, 'reductant', CX + 14, 118, PAL.ink, { size: 23, weight: 600 });
    text(ctx, '$\\kEo$ (V)', XV, 118, cp, { size: 23, weight: 600, align: 'right', tex: true });
    line(ctx, CX, 100, CX, YB, alpha(PAL.ink, 0.3), 2);
    line(ctx, XL, YAX, XR, YAX, cp, 3);
    for (let e = -3; e <= 3; e++) {
      line(ctx, X(e), YAX - 8, X(e), YAX, cp, 3);
      text(ctx, e === 0 ? '0' : signed(e, 0), X(e), YAX - 26, cp, { size: 21, align: 'center' });
      line(ctx, X(e), YAX, X(e), YB, alpha(PAL.ink, e === 0 ? 0.45 : 0.12), e === 0 ? 2 : 1.5);
    }
    arrow(ctx, 84, 566, 84, 264, alpha(PAL.ink, 0.5), 3);
    text(ctx, 'stronger', 84, 208, PAL.ink, { size: 21, align: 'center' }); text(ctx, 'oxidant', 84, 234, PAL.ink, { size: 21, align: 'center' });
    arrow(ctx, 84, 890, 84, 1192, alpha(PAL.ink, 0.5), 3);
    text(ctx, 'stronger', 84, 1222, PAL.ink, { size: 21, align: 'center' }); text(ctx, 'reductant', 84, 1248, PAL.ink, { size: 21, align: 'center' });
    hits = [];
    RANK.forEach((r) => {
      const wc = cat.a(r.id), wa = an.a(r.id), w = Math.max(wc, wa), y = r.y;
      if (w > 0) { ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.07 * w); ctx.fillRect(160, y - ROWH / 2, XR - 150, ROWH); ctx.restore(); }
      if (r.id === 'h') { ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.1); ctx.fillRect(CX - 62, y - ROWH / 2 + 2, 124, ROWH - 4); ctx.restore(); }
      /* the bar from the SHE's zero to E° */
      const col = F.mixColor(F.mixColor(alpha(cp, 0.38), cA, wa), cC, wc), x1 = X(r.E);
      ctx.save(); ctx.fillStyle = col; ctx.fillRect(Math.min(X0, x1), y - BH / 2, Math.abs(x1 - X0), BH); ctx.restore();
      const wo = F.measure(ctx, r.ox, { size: 22, weight: wc > 0.5 ? 600 : 400 }), wr = F.measure(ctx, r.red, { size: 22, weight: wa > 0.5 ? 600 : 400 });
      if (wc > 0) pill(ctx, CX - 6, CX - 22 - wo, y, alpha(cC, 0.18 * wc));
      if (wa > 0) pill(ctx, CX + 6, CX + 22 + wr, y, alpha(cA, 0.18 * wa));
      text(ctx, r.ox, CX - 14, y, F.mixColor(PAL.ink, cC, wc), { size: 22, weight: wc > 0.5 ? 600 : 400, align: 'right' });
      text(ctx, r.red, CX + 14, y, F.mixColor(PAL.ink, cA, wa), { size: 22, weight: wa > 0.5 ? 600 : 400 });
      text(ctx, r.s, XV, y, F.mixColor(PAL.muted, cp, w), { size: 20, weight: w > 0.5 ? 600 : 400, align: 'right' });
      const name = `${r.half},  E° = ${r.s} V`;
      hits.push({ x: CX - 50, y, r: 13, name }, { x: CX + 50, y, r: 13, name }, { x: XV - 40, y, r: 13, name }, { x: (X0 + x1) / 2, y, r: 13, name });
    });
    /* what the sign of E° says, each where no bar and no guide line ever runs */
    ['E° > 0:', 'a stronger oxidant', 'than H⁺'].forEach((w, i) => text(ctx, w, X(1.82), Y1 + (5 + i) * ROWH, PAL.ink, { size: 20 }));
    text(ctx, 'E° < 0: a weaker oxidant than H⁺', X0 + 26, Y1 + 30 * ROWH, PAL.ink, { size: 21, bg: PAL.panel });
    text(ctx, 'the SHE, 0 V by definition', X0 + 26, BY.h.y, PAL.ink, { size: 21, bg: PAL.panel });
    /* the electrons' way, from the reductant up or down the centre line to the oxidant: solid where they go of themselves */
    if (!same && Math.abs(yc - ya) > 20) {
      const s = Math.sign(yc - ya), y0 = ya + s * (ROWH / 2 - 1), y1 = yc - s * (ROWH / 2 - 1), ink = ec > 0 ? PAL.ink : alpha(PAL.ink, 0.55);
      if (Math.abs(y1 - y0) > 22) { line(ctx, CX, y0, CX, y1 - s * 16, ink, 4, ec > 0 ? undefined : [7, 7]); arrow(ctx, CX, y1 - s * 18, CX, y1, ink, 4); }
      hits.push({ x: CX, y: (y0 + y1) / 2, r: 12, name: ec > 0 ? `electrons pass from ${ra.red} to ${rc.ox}` : `electrons do not pass from ${ra.red} to ${rc.ox} of themselves` });
    }
    /* E°cell on the scale: each chosen bar's end carried up to the band under the axis, and the arrow from the anode's to the cathode's */
    line(ctx, xa, ya - BH / 2, xa, YARR, cA, 2.5, [4, 8]); line(ctx, xc, yc - BH / 2, xc, YARR, cC, 2.5, [4, 8]);
    dot(ctx, xa, YARR, cA, true, 6); dot(ctx, xc, YARR, cC, true, 6);
    if (!same) {
      if (Math.abs(xc - xa) > 18) arrow(ctx, xa, YARR, xc, YARR, cp, 5);
      const hi = Math.max(xa, xc), lo = Math.min(xa, xc), s = `$\\kEocell$ = ${signed(ec, dec)} V`;
      if (hi + 230 < 1396) text(ctx, s, hi + 16, YARR, cp, { size: 23, weight: 600, tex: true, bg: PAL.panel });
      else text(ctx, s, lo - 16, YARR, cp, { size: 23, weight: 600, align: 'right', tex: true, bg: PAL.panel });
    }
    const aTerm = ra.E < 0 ? `(${value(ra)}\\ \\text{V})` : `${value(ra)}\\ \\text{V}`;
    tex(d.readout, `\\kEocell = \\kEocathode - \\kEoanode = ${value(rc)}\\ \\text{V} - ${aTerm} = ${inTex(signed(ec, dec))}\\ \\text{V}`);
  }
  register(d.fig, { update: () => {}, draw });
})();
};
