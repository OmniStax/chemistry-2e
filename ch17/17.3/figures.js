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
   book draws 17.6: the SHE's glass jacket with its H₂ inlet and the
   platinum plate at its foot in 1 M H⁺, the half-cell X's metal strip in
   1 M of its ion, a salt bridge between, and a voltmeter on the wire, the
   SHE on its black (−) input and X on its red (+) input. Beneath, each
   electrode surface magnified as 17.5 magnifies the platinum. Moving on a
   continuous clock: H₂ bubbles rise off the platinum, the electrons run
   through the wire (SHE to X for a positive reading, X to SHE for a
   negative one), and particles meet each surface.
===================================================================== */
(function () {
  const H = 1100, d = sim('sim-she-cell', H);
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
  const LX = 330, RX = 1070, HW = 175, RIM = 300, FLOOR = 640, LEVEL = 410;
  const JX = 250, JW = 24, JTOP = 222, JBOT = 568, ARM = 262, PLATE = { t: 572, b: 616, w: 38 };
  const XC = 1160, TOP = 250, BOT = 590, SW = 44;
  const VM = { x: 700, y: 120, w: 300, h: 92 }, WY = VM.y;
  const BL = 445, BR = 955, BT = 222, BW = 60, PLUG = 500;
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
  const wire = walker(rounded([[JX, JTOP], [JX, WY], [XC, WY], [XC, TOP]], 46));
  const bridgeLine = rounded([[BL, PLUG], [BL, BT], [BR, BT], [BR, PLUG]], 64);

  function beaker(ctx, cx, tint) {
    const l = cx - HW, r = cx + HW, rc = 22;
    const body = (y0) => { ctx.beginPath(); ctx.moveTo(l, y0); ctx.lineTo(l, FLOOR - rc); ctx.quadraticCurveTo(l, FLOOR, l + rc, FLOOR); ctx.lineTo(r - rc, FLOOR); ctx.quadraticCurveTo(r, FLOOR, r, FLOOR - rc); ctx.lineTo(r, y0); };
    ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.03); body(RIM); ctx.fill(); ctx.fillStyle = tint; body(LEVEL); ctx.fill(); ctx.restore();
  }
  function glass(ctx, cx) {
    const l = cx - HW, r = cx + HW, rc = 22;
    ctx.save(); ctx.strokeStyle = alpha(PAL.ink, 0.6); ctx.lineWidth = 4; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.moveTo(l - 16, RIM - 10); ctx.quadraticCurveTo(l, RIM - 6, l, RIM + 14); ctx.lineTo(l, FLOOR - rc); ctx.quadraticCurveTo(l, FLOOR, l + rc, FLOOR);
    ctx.lineTo(r - rc, FLOOR); ctx.quadraticCurveTo(r, FLOOR, r, FLOOR - rc); ctx.lineTo(r, RIM); ctx.stroke(); ctx.restore();
    line(ctx, l + 2, LEVEL, r - 2, LEVEL, alpha(PAL.ink, 0.35), 2);
  }
  const tag = (ctx, s, x, y, align, to) => {
    if (to) line(ctx, align === 'right' ? x + 8 : x - 8, y, to[0], to[1], alpha(PAL.ink, 0.55), 1.5);
    text(ctx, s, x, y, PAL.ink, { size: 22, align });
  };

  /* One meeting of particles with an electrode surface, at progress u of a
     reduction; an oxidation is the same meeting played backwards. */
  const lerp = (a, b, k) => a + (b - a) * k;
  function ball(ctx, x, y, r, c, a = 1) {
    if (a <= 0.01) return;
    ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = c; ctx.strokeStyle = alpha(PAL.ink, 0.55); ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(x, y, r, 0, 2 * Math.PI); ctx.fill(); ctx.stroke(); ctx.restore();
  }
  function meetH(ctx, xs, ly, u) {
    const ce = F.el('e-'), ch = F.el('H');
    if (u < 0.5) {
      const k = clamp01(u / 0.5), a = clamp01(u / 0.08);
      for (const s of [-1, 1]) ball(ctx, lerp(xs + 190, xs + 14, k), ly + s * 20, 7, ch, a);
      const ke = clamp01((u - 0.22) / 0.28);
      if (ke > 0) for (const s of [-1, 1]) ball(ctx, lerp(xs - 70, xs + 2, ke), ly + s * 20, 5.5, ce);
    } else if (u < 0.62) {
      const k = (u - 0.5) / 0.12;
      for (const s of [-1, 1]) ball(ctx, xs + 22, ly + s * lerp(20, 7, k), 10, ch);
    } else {
      const k = (u - 0.62) / 0.38, a = 1 - clamp01((u - 0.86) / 0.14);
      for (const s of [-1, 1]) ball(ctx, lerp(xs + 22, xs + 200, k), ly + s * 7, 10, ch, a);
    }
  }
  function meetM(ctx, xs, ly, u, el, n) {
    const ce = F.el('e-'), cm = F.el(el);
    if (u < 0.5) {
      ball(ctx, lerp(xs + 190, xs + 22, u / 0.5), ly, 12, cm, clamp01(u / 0.08));
      const ke = clamp01((u - 0.22) / 0.28);
      if (ke > 0) for (let j = 0; j < n; j++) ball(ctx, lerp(xs - 70, xs + 4, ke), ly + (j - (n - 1) / 2) * 14, 5.5, ce);
    } else {
      ball(ctx, xs + 20, ly, lerp(12, 19, clamp01((u - 0.5) / 0.1)), cm, 1 - clamp01((u - 0.8) / 0.2));
    }
  }
  function surface(ctx, cx, cyy, R, metal, fill, u0, meet) {
    const xs = cx - 40;
    ctx.save(); ctx.beginPath(); ctx.arc(cx, cyy, R, 0, 2 * Math.PI); ctx.fillStyle = PAL.panel; ctx.fill(); ctx.clip();
    if (fill) { ctx.fillStyle = fill; ctx.fillRect(cx - R, cyy - R, 2 * R, 2 * R); }
    const cm = F.el(metal);
    for (let row = -6; row <= 6; row++) {
      const y = cyy + row * 30, off = (row & 1) ? 18 : 0;
      for (let x = xs - 18 - off; x > cx - R - 30; x -= 36) ball(ctx, x, y, 19, cm);
    }
    [-80, 0, 80].forEach((dy, i) => meet(xs, cyy + dy, frac(u0 + i / 3)));
    ctx.restore();
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(cx, cyy, R, 0, 2 * Math.PI); ctx.stroke(); ctx.restore();
  }
  /* the small ring round an electrode's surface and the two lines that carry it to its magnified circle */
  function callout(ctx, sx, sy, sr, cx, cyy, R) {
    const g = alpha(PAL.ink, 0.35);
    ctx.save(); ctx.strokeStyle = g; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(sx, sy, sr, 0, 2 * Math.PI); ctx.stroke(); ctx.restore();
    line(ctx, sx - sr, sy, cx - R, cyy, g, 2); line(ctx, sx + sr, sy, cx + R, cyy, g, 2);
  }

  const CXS = [330, 1070], CYS = 820, R = 140, PERIOD = 3.6;
  function draw() {
    const { ctx } = begin(d.c);
    hits = [];
    const k = pick.value, x = X[k], t = cy.now(), dir = Math.sign(x.E), reduceAtX = dir > 0;
    const right = pick.mixColor((q) => (q === 'cu' ? alpha(F.fact(CU_BLUE), 0.32) : alpha(PAL.muted, 0.13))), left = alpha(PAL.muted, 0.13);

    /* the magnified surfaces first, so the bench's callout lines run under nothing */
    callout(ctx, JX, PLATE.b - 10, 42, CXS[0], CYS, R);
    callout(ctx, XC, BOT - 30, 42, CXS[1], CYS, R);
    const u = t / PERIOD;
    surface(ctx, CXS[0], CYS, R, 'Pt', alpha(PAL.muted, 0.08), u, (xs, ly, w) => meetH(ctx, xs, ly, reduceAtX ? 1 - w : w));
    surface(ctx, CXS[1], CYS, R, x.el, k === 'cu' ? alpha(F.fact(CU_BLUE), 0.22) : alpha(PAL.muted, 0.08), u, (xs, ly, w) => meetM(ctx, xs, ly, reduceAtX ? w : 1 - w, x.el, x.n));
    hits.push({ x: CXS[0] - 90, y: CYS, r: 50, name: 'platinum atoms at the electrode’s surface' }, { x: CXS[1] - 90, y: CYS, r: 50, name: `${x.name} atoms at the electrode’s surface` });
    const e = x.n === 1 ? 'e⁻' : `${x.n}e⁻`;
    text(ctx, reduceAtX ? 'anode, oxidation:  H₂(g) ⟶ 2H⁺(aq) + 2e⁻' : 'cathode, reduction:  2H⁺(aq) + 2e⁻ ⟶ H₂(g)', CXS[0], CYS + R + 34, PAL.ink, { size: 22, align: 'center' });
    text(ctx, reduceAtX ? `cathode, reduction:  ${x.ion}(aq) + ${e} ⟶ ${x.el}(s)` : `anode, oxidation:  ${x.el}(s) ⟶ ${x.ion}(aq) + ${e}`, CXS[1], CYS + R + 34, PAL.ink, { size: 22, align: 'center' });

    const hyd = (g, px, py) => { ball(g, px - 5, py, 8, F.el('H')); ball(g, px + 5, py, 8, F.el('H')); };
    F.legend(ctx, { l: 0, r: 1400, t: 0, b: H }, [{ s: 'electron, e⁻', draw: (g, px, py) => ball(g, px, py, 5.5, F.el('e-')) }, { s: 'H⁺', draw: (g, px, py) => ball(g, px, py, 7, F.el('H')) },
      { s: 'H₂', draw: hyd }, { s: 'Pt atom', draw: (g, px, py) => ball(g, px, py, 10, F.el('Pt')) }, { s: `${x.el} atom`, draw: (g, px, py) => ball(g, px, py, 10, F.el(x.el)) }, { s: x.ion, draw: (g, px, py) => ball(g, px, py, 8, F.el(x.el)) }],
      { corner: 'bottom', row: true, size: 20 });
    beaker(ctx, LX, left); beaker(ctx, RX, right);
    hits.push({ x: LX + 60, y: 560, r: 50, name: '1 M H⁺(aq)' }, { x: RX - 30, y: 560, r: 50, name: `1 M ${x.ion}(aq)` });
    /* the SHE: the glass jacket, closed at its top, its H₂ inlet, the platinum wire down its middle and the plate at its foot */
    ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.05); ctx.strokeStyle = alpha(PAL.ink, 0.6); ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(JX - JW, JBOT); ctx.lineTo(JX - JW, JTOP + JW); ctx.arc(JX, JTOP + JW, JW, Math.PI, 0); ctx.lineTo(JX + JW, JBOT); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.rect(JX - JW - 30, ARM - 10, 30, 20); ctx.fill(); ctx.stroke(); ctx.restore();
    line(ctx, JX, JTOP, JX, PLATE.t, PAL.ink, 3);
    ctx.save(); ctx.fillStyle = F.el('Pt'); ctx.strokeStyle = alpha(PAL.ink, 0.6); ctx.lineWidth = 1.5;
    ctx.fillRect(JX - PLATE.w / 2, PLATE.t, PLATE.w, PLATE.b - PLATE.t); ctx.strokeRect(JX - PLATE.w / 2, PLATE.t, PLATE.w, PLATE.b - PLATE.t); ctx.restore();
    hits.push({ x: JX, y: 400, r: 26, name: 'the glass jacket that carries the H₂ down to the platinum' }, { x: JX - JW - 15, y: ARM, r: 18, name: 'the H₂ inlet' },
      { x: JX, y: (PLATE.t + PLATE.b) / 2, r: 24, name: 'the platinum electrode' });
    /* the metal strip of X */
    ctx.save(); ctx.fillStyle = pick.mixColor((q) => F.el(X[q].el)); ctx.strokeStyle = alpha(PAL.ink, 0.6); ctx.lineWidth = 1.5;
    ctx.fillRect(XC - SW / 2, TOP, SW, BOT - TOP); ctx.strokeRect(XC - SW / 2, TOP, SW, BOT - TOP); ctx.restore();
    hits.push({ x: XC, y: 480, r: 26, name: `the ${x.name} electrode` });
    /* the salt bridge */
    stroke(ctx, bridgeLine, alpha(PAL.ink, 0.55), BW + 4, 'butt'); stroke(ctx, bridgeLine, PAL.panel, BW - 4, 'butt'); stroke(ctx, bridgeLine, alpha(PAL.muted, 0.14), BW - 4, 'butt');
    for (const bx of [BL, BR]) { ctx.save(); ctx.fillStyle = PAL.muted; ctx.fillRect(bx - BW / 2 + 2, PLUG - 16, BW - 4, 16); ctx.restore(); }
    hits.push({ x: 700, y: BT, r: 36, name: 'the salt bridge' });
    for (const [cx, tint] of [[LX, left], [RX, right]]) { ctx.save(); ctx.fillStyle = tint; ctx.globalAlpha = 0.5; ctx.fillRect(cx - HW + 2, LEVEL, 2 * HW - 4, FLOOR - LEVEL - 2); ctx.restore(); glass(ctx, cx); }
    /* H₂ bubbles out of the jacket's foot, rising either side of it to the surface */
    for (let i = 0; i < 14; i++) {
      const h = frac(t * 0.42 + i / 14), side = i % 2 ? 1 : -1, x0 = JX + side * (JW + 8 + ((i * 37) % 23)), y = JBOT + 10 - h * (JBOT + 10 - LEVEL - 8);
      ball(ctx, x0 + side * 14 * h + 4 * Math.sin(7 * h + i), y, 5 + (i % 3), F.el('H'), 0.9);
      if (i === 0) hits.push({ x: x0, y, r: 14, name: 'a bubble of H₂ gas' });
    }
    /* X's ions meeting its strip in the cell: arriving for a reduction, leaving for an oxidation */
    for (let i = 0; i < 3; i++) {
      const w = frac(t / 1.6 + i / 3), p = reduceAtX ? w : 1 - w, y0 = 470 + i * 42, xs = XC - SW / 2 - 9, xf = xs - 120;
      ball(ctx, lerp(xf, xs, p), y0 + 18 * Math.sin(3 * p + i) * (1 - p), 10, F.el(x.el), Math.min(1, (reduceAtX ? w : 1 - w) / 0.15, (reduceAtX ? 1 - w : w) / 0.1 + 0.2));
    }

    /* the wire, the voltmeter with its two inputs, and the electrons */
    stroke(ctx, wire.pts, PAL.ink, 5);
    const NE = 22, sp = wire.L / NE;
    for (let i = 0; i < NE; i++) {
      const s = ((i * sp + dir * t * 150) % wire.L + wire.L) % wire.L, [ex, ey] = wire.at(s);
      if (Math.abs(ex - VM.x) < VM.w / 2 + 14 && Math.abs(ey - VM.y) < VM.h) continue;
      if (ey > JTOP - 4 && ex < 700) continue;
      dot(ctx, ex, ey, F.el('e-'), true, 8);
      hits.push({ x: ex, y: ey, r: 12, name: 'an electron, e⁻, in the wire' });
    }
    ctx.save(); ctx.fillStyle = PAL.soft; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.roundRect(VM.x - VM.w / 2, VM.y - VM.h / 2, VM.w, VM.h, 14); ctx.fill(); ctx.stroke();
    ctx.fillStyle = alpha(C('potential'), 0.1); ctx.strokeStyle = alpha(PAL.ink, 0.5); ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.roundRect(VM.x - VM.w / 2 + 34, VM.y - VM.h / 2 + 14, VM.w - 68, VM.h - 28, 6); ctx.fill(); ctx.stroke(); ctx.restore();
    text(ctx, `${signed(x.E, x.dec)} V`, VM.x, VM.y, C('potential'), { size: 36, weight: 600, align: 'center' });
    ball(ctx, VM.x - VM.w / 2 + 16, VM.y, 10, F.fact(BLACK_IN)); ball(ctx, VM.x + VM.w / 2 - 16, VM.y, 10, F.fact(RED_IN));
    hits.push({ x: VM.x, y: VM.y, r: 44, name: 'the voltmeter' }, { x: VM.x - VM.w / 2 + 16, y: VM.y, r: 14, name: 'the black (negative) input, wired to the SHE' }, { x: VM.x + VM.w / 2 - 16, y: VM.y, r: 14, name: 'the red (positive) input, wired to half-cell X' });
    tag(ctx, 'Voltmeter', VM.x, 30, 'center'); line(ctx, VM.x, 44, VM.x, VM.y - VM.h / 2, alpha(PAL.ink, 0.55), 1.5);
    /* the electrons' direction, as the book marks it on both sides of the meter */
    text(ctx, 'e⁻ flow', 400, 66, PAL.ink, { size: 22, align: 'right' });
    for (const x0 of [430, 885]) { if (dir > 0) arrow(ctx, x0, 66, x0 + 70, 66, PAL.ink, 3); else arrow(ctx, x0 + 70, 66, x0, 66, PAL.ink, 3); }

    /* labels on the parts that hold still */
    tag(ctx, '1 bar H₂(g)', 140, ARM, 'right'); arrow(ctx, 148, ARM, JX - JW - 34, ARM, PAL.ink, 3);
    ['Standard', 'hydrogen', 'electrode'].forEach((s, i) => text(ctx, s, 140, 470 + 28 * i, PAL.ink, { size: 22, align: 'right' }));
    line(ctx, 146, 498, LX - HW - 2, 498, alpha(PAL.ink, 0.55), 1.5);
    tag(ctx, `${x.el} electrode`, XC - 40, 226, 'right', [XC - SW / 2 + 4, TOP + 14]);
    tag(ctx, 'T = 298 K', 700, 350, 'center');
    tag(ctx, '1 M H⁺', LX + 50, 604, 'center'); tag(ctx, `1 M ${x.ion}`, RX - 40, 604, 'center');

    tex(d.readout, `\\kEocell = \\kEoX - \\kEshe = ${inTex(signed(x.E, x.dec))}\\ \\text{V} - 0\\ \\text{V} = ${inTex(signed(x.E, x.dec))}\\ \\text{V}`);
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();

/* =====================================================================
   SIM: Table 17.1 as a ladder of standard electrode potentials. Still:
   the reader picks a cathode couple and an anode couple, and the arrow
   from the anode's rung to the cathode's is E°cell. Axis fixed from
   +3.0 V to −3.1 V, which holds every value of the table.
===================================================================== */
(function () {
  const H = 780, d = sim('sim-ladder', H);
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
  const opts = ROWS.map((r) => ({ value: r.id, label: `${r.ox}/${r.red}, ${r.s} V` }));
  const cat = F.select(d.controls, { label: '\\text{cathode}', options: opts, value: 'ag', aria: 'the cathode half-cell', key: 'cathode' });
  const an = F.select(d.controls, { label: '\\text{anode}', options: opts, value: 'cu', aria: 'the anode half-cell', key: 'anode' });
  const TOP = 3.0, BOT = -3.1, Y0 = 140, Y1 = 730, AX = 330, RUNG = 690, LX = 706;
  const Y = (e) => Y0 + ((TOP - e) / (TOP - BOT)) * (Y1 - Y0);
  F.hover(d.stage, () => ROWS.map((r) => ({ x: AX + 16, y: Y(r.E), r: 9, name: `${r.half}, E° = ${r.s} V` })));
  const value = (r) => fmt(r.E, r.dec);
  function spread(items, gap, lo, hi) {
    const s = items.slice().sort((a, b) => a.y - b.y);
    for (let i = 1; i < s.length; i++) s[i].y = Math.max(s[i].y, s[i - 1].y + gap);
    const over = s.length ? s[s.length - 1].y - hi : 0;
    if (over > 0) s.forEach((it) => { it.y -= over; });
    for (let i = s.length - 2; i >= 0; i--) s[i].y = Math.min(s[i].y, s[i + 1].y - gap);
    if (s.length && s[0].y < lo) { const up = lo - s[0].y; s.forEach((it) => { it.y += up; }); }
    return items;
  }
  function draw() {
    const { ctx } = begin(d.c);
    const cp = C('potential'), cC = F.ref('cathode-half-cell'), cA = F.ref('anode-half-cell');
    const rc = BY[cat.value], ra = BY[an.value];
    const yc = Y(cat.mix((q) => BY[q].E)), ya = Y(an.mix((q) => BY[q].E));
    line(ctx, AX, Y0 - 10, AX, Y1 + 10, PAL.ink, 3);
    for (let e = -3; e <= 3.001; e += 0.5) {
      line(ctx, AX - 8, Y(e), AX, Y(e), PAL.muted, 2);
      text(ctx, e === 0 ? '0' : signed(e, 1), AX - 14, Y(e), PAL.muted, { size: 17, align: 'right' });
    }
    text(ctx, '$\\kEo$ (V)', AX, Y0 - 34, cp, { size: 22, weight: 600, align: 'center', tex: true });
    arrow(ctx, 150, 370, 150, 175, alpha(PAL.ink, 0.5), 3);
    text(ctx, 'stronger oxidants', 150, 155, PAL.muted, { size: 17, align: 'center' });
    arrow(ctx, 150, 500, 150, 695, alpha(PAL.ink, 0.5), 3);
    text(ctx, 'stronger reductants', 150, 715, PAL.muted, { size: 17, align: 'center' });
    ROWS.forEach((r) => line(ctx, AX, Y(r.E), AX + 32, Y(r.E), alpha(PAL.ink, 0.45), 2));
    line(ctx, AX, Y(0), RUNG, Y(0), alpha(PAL.ink, 0.45), 2, [10, 10]);
    const same = rc === ra;
    const tags = [];
    if (rc.id !== 'h' && ra.id !== 'h') tags.push({ y: Y(0), s: `${BY.h.half},  0.00 V`, c: PAL.muted, w: 400 });
    tags.push({ y: yc, parts: [['cathode', cC], `:  ${rc.half},  `, [`${rc.s} V`, cp]] });
    if (!same) tags.push({ y: ya, parts: [['anode', cA], `:  ${ra.half},  `, [`${ra.s} V`, cp]] });
    spread(tags, 34, Y0 - 12, Y1 + 12);
    line(ctx, AX, ya, RUNG, ya, cA, 4);
    line(ctx, AX, yc, RUNG, yc, cC, 4);
    tags.forEach((g) => (g.parts ? F.rich(ctx, g.parts, LX, g.y, { size: 22 }) : text(ctx, g.s, LX, g.y, g.c, { size: 22, weight: g.w, bg: PAL.panel })));
    const dec = Math.min(rc.dec, ra.dec), ec = +(rc.E - ra.E).toFixed(dec);
    if (!same) {
      if (Math.abs(yc - ya) > 16) arrow(ctx, 540, ya, 540, yc, cp, 4);
      text(ctx, `${signed(ec, dec)} V`, 524, (ya + yc) / 2, cp, { size: 22, weight: 600, align: 'right', bg: PAL.panel });
    }
    topline(ctx, same ? 'With the same half-cell on both sides, the cell potential is zero and there is no net reaction.'
      : ec > 0 ? `The oxidant ${rc.ox} sits above the reductant ${ra.red}, so the reaction is spontaneous.`
        : `The oxidant ${rc.ox} sits below the reductant ${ra.red}, so the reaction is nonspontaneous.`);
    const aTerm = ra.E < 0 ? `(${value(ra)}\\ \\text{V})` : `${value(ra)}\\ \\text{V}`;
    tex(d.readout, `\\kEocell = \\kEocathode - \\kEoanode = ${value(rc)}\\ \\text{V} - ${aTerm} = ${inTex(signed(ec, dec))}\\ \\text{V}`);
  }
  register(d.fig, { update: () => {}, draw });
})();
};
