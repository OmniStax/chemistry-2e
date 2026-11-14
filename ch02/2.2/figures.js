/* Figures for section 2.2 Evolution of Atomic Theory. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['2.2'] = function (root, F) {
const { fmt, C, PAL, alpha, ctl, cycle, register, begin, line, text, topline, label } = F;
const sim = (id, H) => F.sim(root, id, H);
const TAU = 2 * Math.PI;
/* a number that states a charge, in the charge hue (chapter COLOR.md) */
const hue = (s) => `\\htmlClass{kv-charge}{${s}}`;
/* a filled disc with a thin ink rim: a drop, an atom's cloud, a particle */
function disc(ctx, x, y, r, fill, rim = alpha(PAL.ink, 0.45), w = 1.5) {
  ctx.save(); ctx.fillStyle = fill; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill();
  if (rim) { ctx.strokeStyle = rim; ctx.lineWidth = w; ctx.stroke(); }
  ctx.restore();
}
/* a closed outline through the points, filled and stroked */
function shape(ctx, pts, fill, stroke, w = 2) {
  ctx.save(); ctx.beginPath(); pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.closePath();
  if (fill) { ctx.fillStyle = fill; ctx.fill(); }
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = w; ctx.stroke(); }
  ctx.restore();
}
/* x in scientific notation for a readout */
const sci = (x, d) => { const p = Math.floor(Math.log10(Math.abs(x))), m = x / 10 ** p; return { m: fmt(m, d), p }; };
const sciTex = (x, d) => { const s = sci(x, d); return `${s.m}\\times10^{${s.p}}`; };
const E_CHARGE = 1.602e-19;

/* =====================================================================
   FIGURE 2.6: Thomson's cathode ray tube, flat and in section, drawn from
   the book's part (c). The high voltage drives electrons from the cathode
   through the hollow anode and down the tube; between the charged plates
   they bend toward the positive plate, the magnets beside the plates push
   them down, and the ray lands on the scale on the far glass. Moving: the
   ray is a flow, so the electrons travel continuously (a transport, no
   scrubber). The bends are those of Thomson's own tube: plates 5 cm long
   and 1.5 cm apart, particles at 2.7 × 10⁷ m/s, so 200 V bends the ray
   9.2° and 0.49 mT bends it back.
===================================================================== */
(function () {
  const H = 540;
  const d = sim('sim-cathode-ray', H);
  const KE = 0.161 / 200, KB = 0.3257;                       /* rad per volt on the plates, rad per millitesla */
  const pos = F.choice(d.controls, { label: '\\text{positive plate}', aria: 'which plate is positive', value: 'top',
    options: [{ value: 'top', label: 'top' }, { value: 'bottom', label: 'bottom' }] });
  const V = ctl(d.controls, { label: '\\text{plate voltage}', cls: '', key: 'voltage', min: 0, max: 200, step: 5, value: 200, unit: 'V', dec: 0, aria: 'voltage between the plates in volts' });
  const B = ctl(d.controls, { label: '\\text{magnetic field}', cls: '', key: 'field', min: 0, max: 0.6, step: 0.01, value: 0, unit: 'mT', dec: 2, aria: 'strength of the magnetic field in milliteslas',
    specials: [{ at: () => (pos.value === 'top' && V.v > 0 ? (V.v * KE) / KB : null), label: 'ray runs straight' }] });
  const ro = F.readout(d);
  const Y0 = 315, CX = 235, CR = 62, AX = 400, AW = 28, P0 = 720, P1 = 870, GAP = 30, BX = 1060, BR = 150, HN = 18, HW = 56, RX = 735;
  const PM = (P0 + P1) / 2;
  /* the angle the ray leaves the plates at, upward positive */
  const bend = () => pos.mix((v) => (v === 'top' ? 1 : -1)) * KE * V.v - KB * B.v;
  /* the ray's path from the anode's bore to the glass of the far bulb */
  function path(th) {
    const pts = [];
    for (let x = AX; x <= P0; x += 8) pts.push([x, Y0]);
    for (let x = P0; x <= P1; x += 4) pts.push([x, Y0 - (th / (2 * (P1 - P0))) * (x - P0) ** 2]);
    const ye = Y0 - (th * (P1 - P0)) / 2;
    for (let x = P1 + 6; ; x += 6) {
      const y = ye - th * (x - P1);
      pts.push([x, y]);
      if (x > BX && (x - BX) ** 2 + (y - Y0) ** 2 >= (BR - 4) ** 2) break;
    }
    return pts;
  }
  const lengths = (pts) => { const L = [0]; for (let i = 1; i < pts.length; i++) L.push(L[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1])); return L; };
  const at = (pts, L, s) => { let i = 1; while (i < L.length - 1 && L[i] < s) i++; const k = (s - L[i - 1]) / ((L[i] - L[i - 1]) || 1); return [pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * k, pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * k]; };
  const cy = cycle(() => Infinity, 0);
  /* the glass: a small bulb round the cathode with a stub where its lead enters, a neck with a side arm for the anode's lead, the wide tube and the far bulb */
  function glass(ctx) {
    const a0 = Math.asin(HN / CR), an = Math.asin(9 / CR), b0 = Math.asin(HW / BR);
    const arc = (cx, r, from, to, n) => Array.from({ length: n + 1 }, (_, i) => { const a = from + ((to - from) * i) / n; return [cx + r * Math.cos(a), Y0 + r * Math.sin(a)]; });
    const pts = [
      [CX + CR * Math.cos(a0), Y0 - HN], [545, Y0 - HN], [580, Y0 - HW],
      ...arc(BX, BR, Math.PI + b0, 3 * Math.PI - b0, 72),
      [580, Y0 + HW], [545, Y0 + HN], [368, Y0 + HN], [368, 410], [362, 420], [350, 420], [344, 410], [344, Y0 + HN],
      ...arc(CX, CR, a0, Math.PI - an, 24), [156, Y0 + 9], [150, Y0 + 4], [150, Y0 - 4], [156, Y0 - 9], ...arc(CX, CR, Math.PI + an, TAU - a0, 24),
    ];
    shape(ctx, pts, PAL.panel, null);
    shape(ctx, pts, alpha(F.ref('tube'), 0.07), F.ref('tube'), 2.5);
  }
  /* a cell of a battery across a wire: the long plate is the positive one */
  function cell(ctx, x, y, vertical, plusFirst) {
    const a = plusFirst ? 16 : 9, b = plusFirst ? 9 : 16;
    if (vertical) { line(ctx, x - a, y - 6, x + a, y - 6, PAL.ink, a > b ? 3 : 5); line(ctx, x - b, y + 6, x + b, y + 6, PAL.ink, b > a ? 3 : 5); }
    else { line(ctx, x - 6, y - a, x - 6, y + a, PAL.ink, a > b ? 3 : 5); line(ctx, x + 6, y - b, x + 6, y + b, PAL.ink, b > a ? 3 : 5); }
  }
  const hits = []; F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c);
    hits.length = 0;
    const th = bend(), pts = path(th), L = lengths(pts), end = pts[pts.length - 1], ce = F.el('e-'), cq = C('charge');
    const top = pos.value === 'top', wire = alpha(PAL.ink, 0.75), charged = V.v > 0;
    /* behind the tube: the wire from the lower plate round to the battery, and the magnet's far pole */
    line(ctx, 655, 175, 655, 455, wire, 2.5);
    disc(ctx, 800, Y0 - 34, 54, PAL.soft, alpha(PAL.ink, 0.6), 2);
    glass(ctx);
    text(ctx, 'S', 800, Y0 - 71, PAL.ink, { size: 22, weight: 600, align: 'center' });
    hits.push({ x: 800, y: Y0 - 70, r: 20, name: 'south pole of the magnet, behind the tube' });
    /* the scale on the outside of the far bulb, a mark every 5° round the glass */
    for (let i = -10; i <= 10; i++) {
      const a = (i * 5 * Math.PI) / 180, r0 = BR + 4, r1 = BR + (i % 2 === 0 ? 20 : 12);
      line(ctx, BX + r0 * Math.cos(a), Y0 + r0 * Math.sin(a), BX + r1 * Math.cos(a), Y0 + r1 * Math.sin(a), PAL.ink, i === 0 ? 3 : 2);
    }
    /* the high voltage: its negative terminal to the cathode through the stub, its positive terminal up the side arm to the anode */
    line(ctx, CX - 17, Y0, 100, Y0, wire, 2.5); line(ctx, 100, Y0, 100, 366, wire, 2.5); line(ctx, 100, 378, 100, 480, wire, 2.5);
    cell(ctx, 100, 372, true, false);
    line(ctx, 100, 480, 356, 480, wire, 2.5); line(ctx, 356, 480, 356, Y0 + 11, wire, 2.5); line(ctx, 356, Y0 + 11, AX, Y0 + 11, wire, 2.5);
    text(ctx, '−', 132, 362, cq, { size: 26, weight: 600, align: 'center' }); text(ctx, '+', 132, 384, cq, { size: 26, weight: 600, align: 'center' });
    hits.push({ x: 100, y: 372, r: 30, name: 'high voltage between the cathode and the anode' });
    /* the plates' battery: one terminal to each plate, turned round when the positive plate changes */
    line(ctx, RX, Y0 - GAP - 6, RX, 175, wire, 2.5); line(ctx, RX, 175, 700, 175, wire, 2.5); line(ctx, 688, 175, 655, 175, wire, 2.5);
    line(ctx, 655, 455, RX, 455, wire, 2.5); line(ctx, RX, 455, RX, Y0 + GAP + 6, wire, 2.5);
    cell(ctx, 694, 175, false, !top);
    hits.push({ x: 694, y: 175, r: 26, name: 'battery that charges the plates' });
    /* the cathode, a disc seen edge on, and the anode, a short hollow cylinder cut through */
    const cc = F.ref('cathode'), ca = F.ref('anode');
    shape(ctx, [[CX - 21, Y0 - 22], [CX - 13, Y0 - 22], [CX - 13, Y0 + 22], [CX - 21, Y0 + 22]], cc, null);
    shape(ctx, [[AX, Y0 - 16], [AX + AW, Y0 - 16], [AX + AW, Y0 - 5], [AX, Y0 - 5]], ca, null);
    shape(ctx, [[AX, Y0 + 5], [AX + AW, Y0 + 5], [AX + AW, Y0 + 16], [AX, Y0 + 16]], ca, null);
    /* the plates */
    shape(ctx, [[P0, Y0 - GAP - 6], [P1, Y0 - GAP - 6], [P1, Y0 - GAP], [P0, Y0 - GAP]], PAL.muted, PAL.ink, 1.5);
    shape(ctx, [[P0, Y0 + GAP], [P1, Y0 + GAP], [P1, Y0 + GAP + 6], [P0, Y0 + GAP + 6]], PAL.muted, PAL.ink, 1.5);
    if (charged) {
      text(ctx, top ? '+' : '−', P0 - 18, Y0 - GAP - 3, cq, { size: 28, weight: 600, align: 'center' });
      text(ctx, top ? '−' : '+', P0 - 18, Y0 + GAP + 3, cq, { size: 28, weight: 600, align: 'center' });
    }
    /* the path an undeflected ray would take, and the angle the ray has turned through */
    const deg = (th * 180) / Math.PI;
    if (Math.abs(deg) > 0.6) {
      line(ctx, P1, Y0, BX + BR - 4, Y0, alpha(PAL.ink, 0.45), 2, [10, 10]);
      ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(PM, Y0, 215, Math.min(0, -th), Math.max(0, -th)); ctx.stroke(); ctx.restore();
    }
    /* the ray: electrons leave the whole face of the cathode, the anode's bore lets a narrow ray through */
    shape(ctx, [[CX - 13, Y0 - 16], [AX, Y0 - 4], [AX, Y0 + 4], [CX - 13, Y0 + 16]], alpha(ce, 0.2), null);
    ctx.save(); ctx.strokeStyle = alpha(ce, 0.3); ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.stroke(); ctx.restore();
    const t = cy.now(), run = isFinite(t) ? t : 0, gap = 46, speed = 300, lead = AX - (CX - 13), total = lead + L[L.length - 1];
    for (let s = (run * speed) % gap; s < total; s += gap) { const [x, y] = s < lead ? [CX - 13 + s, Y0] : at(pts, L, s - lead); disc(ctx, x, y, 4.5, ce, null); }
    disc(ctx, end[0], end[1], 12, alpha(ce, 0.5), null); disc(ctx, end[0], end[1], 5, ce, null);
    /* the magnet's near pole, in front of the tube and seen through */
    disc(ctx, 812, Y0 + 34, 54, alpha(PAL.soft, 0.45), alpha(PAL.ink, 0.6), 2);
    text(ctx, 'N', 812, Y0 + 71, PAL.ink, { size: 22, weight: 600, align: 'center' });
    hits.push({ x: 812, y: Y0 + 70, r: 20, name: 'north pole of the magnet, in front of the tube' });
    /* labels, one per part */
    label(ctx, 'cathode', CX - 17, Y0 - 24, { side: 'above', gap: 76, color: cc });
    label(ctx, 'anode', AX + AW / 2, Y0 - 18, { side: 'above', gap: 58, color: ca });
    label(ctx, 'cathode ray', 500, Y0 + 6, { side: 'below', gap: 62 });
    label(ctx, 'charged plates', P1 + 4, Y0 - GAP - 6, { side: 'above', gap: 104 });
    label(ctx, 'magnets', 812, Y0 + 90, { side: 'below', gap: 32 });
    label(ctx, 'scale on the glass', BX + (BR + 12) * Math.cos(0.75), Y0 + (BR + 12) * Math.sin(0.75), { side: 'below', gap: 56 });
    /* the two bends in degrees, rounded once so that the numbers shown add up */
    const a = Math.round(((KE * V.v * 180) / Math.PI) * 10) / 10, b = Math.round(((KB * B.v * 180) / Math.PI) * 10) / 10;
    const net = Math.round((top ? a - b : a + b) * 10) / 10, D = (x) => fmt(Math.abs(x), 1) + '^\\circ';
    if (Math.abs(deg) > 0.6) text(ctx, fmt(Math.abs(net), 1) + '°', PM + 250 * Math.cos(th / 2), Y0 - 250 * Math.sin(th / 2), PAL.ink, { size: 22, weight: 600, align: 'center', bg: PAL.panel });
    const balanced = top && a > 0 && Math.abs(net) < 0.05;
    topline(ctx, a === 0 && b === 0 ? 'With the plates uncharged and no magnetic field, the cathode ray runs straight.'
      : balanced ? 'The magnetic field cancels the pull of the positive plate, and the ray runs straight again.'
      : b === 0 ? 'The ray bends toward the positive plate, so its particles are negatively charged.'
      : a === 0 ? 'The magnetic field alone bends the ray down.'
      : !top ? 'The positive plate and the magnetic field both bend the ray down.'
      : net > 0 ? 'The magnetic field pushes the ray down, but the positive plate still pulls it up harder.'
      : 'The magnetic field now pushes the ray down harder than the positive plate pulls it up.');
    ro.set(!top ? `\\text{bend down} = \\text{plates} + \\text{magnets} = ${D(a)} + ${D(b)} = ${D(net)}`
      : net >= 0 ? `\\text{bend up} = \\text{plates} - \\text{magnets} = ${D(a)} - ${D(b)} = ${D(net)}`
      : `\\text{bend down} = \\text{magnets} - \\text{plates} = ${D(b)} - ${D(a)} = ${D(net)}`,
      balanced ? 'From the field strengths at this balance and the bend with the plates alone, Thomson calculated the charge-to-mass ratio of the particles, 1.759 × 10¹¹ C/kg.' : '');
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();

/* =====================================================================
   FIGURE 2.7: Millikan's oil drops, the chamber in section as the book
   draws it. Oil is sprayed above the upper plate, a drop falls through
   the pinhole, X-rays charge it, and the field between the plates pulls
   it up against gravity; at the field where the two balance it hovers,
   and its charge is its weight over that field. Moving: the drop drifts
   for 5 s and the loop holds 1.2 s. The five drops of the book's table are
   drawn with one weight, 4.8 × 10⁻¹⁴ N, so a drop with n extra electrons
   hovers at 300/n kN/C. Beside the chamber, a ladder of charge with a
   rung at every multiple of 1.6 × 10⁻¹⁹ C and the five drops on it.
===================================================================== */
(function () {
  const H = 620;
  const d = sim('sim-oil-drop', H);
  const DROPS = [['A', 3], ['B', 2], ['C', 4], ['D', 1], ['E', 3]];
  const EH = 300;                                             /* kN/C that holds a drop with one extra electron still */
  const drop = F.choice(d.controls, { label: '\\text{drop}', aria: 'the oil drop', value: 'A', ms: 0,
    options: DROPS.map(([k]) => ({ value: k, label: k })), onInput: () => cy.reset() });
  const n = () => DROPS.find(([k]) => k === drop.value)[1];
  const E = ctl(d.controls, { label: '\\text{field}', cls: '', key: 'field', min: 0, max: 400, step: 1, value: 60, unit: 'kN/C', dec: 0, aria: 'electric field strength between the plates in kilonewtons per coulomb',
    specials: [{ at: () => EH / n(), label: 'hovers' }], onInput: () => cy.reset() });
  const T = 5, CL = 270, CR = 810, CT = 118, CB = 572, TOP = 238, BOT = 510, DX = 540, R = 16, V0 = 26, YS = 374;
  const cy = cycle(() => T, 1.2);
  const y = () => { const t = Math.min(cy.now(), T), v = V0 * (1 - E.v / (EH / n())); return Math.min(BOT - R, Math.max(TOP + R, YS + v * t)); };
  const rect = (ctx, l, t, r, b, fill, stroke, w = 2) => shape(ctx, [[l, t], [r, t], [r, b], [l, b]], fill, stroke, w);
  /* the fine droplets above the upper plate, placed once */
  const MIST = Array.from({ length: 22 }, (_, i) => [372 + ((i * 97) % 380), 150 + ((i * 53) % 66)]).filter(([x, yy]) => !(x > 470 && x < 610 && yy < 186));
  const hits = []; F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c);
    hits.length = 0;
    const cq = C('charge'), ce = F.el('e-'), rd = F.ref('drops'), k = n(), yd = y(), eh = EH / k, rel = E.v / eh;
    /* the chamber in section: walls, lid and base */
    rect(ctx, CL, CT, CR, CB, alpha(PAL.ink, 0.03), alpha(PAL.ink, 0.55), 2.5);
    rect(ctx, CL - 14, CT - 16, CR + 14, CT, PAL.muted, PAL.ink, 1.5);
    rect(ctx, CL - 22, CB, CR + 22, CB + 18, PAL.muted, PAL.ink, 1.5);
    /* the atomizer: a rubber bulb, a tube through the wall and the spray above the upper plate */
    line(ctx, 128, 186, CL + 34, 178, PAL.ink, 7); line(ctx, 128, 186, CL + 34, 178, PAL.soft, 3);
    ctx.save(); ctx.fillStyle = PAL.soft; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(92, 190, 42, 27, -0.1, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore();
    rect(ctx, CL - 8, 166, CL + 8, 190, PAL.muted, PAL.ink, 1.5);
    [-0.32, -0.16, 0, 0.16, 0.32].forEach((a) => line(ctx, CL + 38, 178, CL + 38 + 62 * Math.cos(a), 178 + 62 * Math.sin(a), alpha(rd, 0.7), 1.5));
    MIST.forEach(([x, yy]) => disc(ctx, x, yy, 3, alpha(rd, 0.65), null));
    hits.push({ x: 560, y: 196, r: 40, name: 'oil sprayed in fine droplets' }, { x: 380, y: 180, r: 40, name: 'oil sprayed in fine droplets' });
    /* the brass plates, the upper one with its pinhole */
    rect(ctx, 300, TOP - 12, DX - 9, TOP, PAL.muted, PAL.ink, 1.5); rect(ctx, DX + 9, TOP - 12, 772, TOP, PAL.muted, PAL.ink, 1.5);
    rect(ctx, 300, BOT, 772, BOT + 12, PAL.muted, PAL.ink, 1.5);
    text(ctx, '+', 792, TOP - 6, cq, { size: 28, weight: 600, align: 'center' });
    text(ctx, '−', 792, BOT + 6, cq, { size: 28, weight: 600, align: 'center' });
    /* the telescope through one wall, and the X-ray tube at the other */
    rect(ctx, 150, 362, CL + 46, 386, PAL.soft, PAL.ink, 2); rect(ctx, 116, 355, 150, 393, PAL.soft, PAL.ink, 2); rect(ctx, CL - 8, 356, CL + 8, 392, PAL.muted, PAL.ink, 1.5);
    rect(ctx, CR, 318, CR + 44, 346, PAL.soft, PAL.ink, 2); rect(ctx, CR - 14, 324, CR, 340, PAL.muted, PAL.ink, 1.5);
    ctx.save(); ctx.strokeStyle = alpha(PAL.ink, 0.6); ctx.lineWidth = 2.5; ctx.beginPath();
    for (let x = CR - 18; x >= DX + 34; x -= 3) { const yy = 332 + 7 * Math.sin((x - DX) / 9); if (x === CR - 18) ctx.moveTo(x, yy); else ctx.lineTo(x, yy); }
    ctx.stroke(); ctx.restore();
    F.arrow(ctx, DX + 36, 332, DX + 22, 332, alpha(PAL.ink, 0.6), 2.5);
    /* the line the drop moves on, from the pinhole to the lower plate */
    line(ctx, DX, TOP - 12, DX, BOT, alpha(rd, 0.45), 2, [3, 9]);
    /* the drop and its extra electrons, its weight down and the pull of the field up */
    const g = 60, up = Math.max(0, Math.min(150, g * rel, yd - R - 8 - TOP));
    F.arrow(ctx, DX, yd + R + 2, DX, yd + R + 2 + Math.min(g, Math.max(8, BOT - yd - R - 6)), PAL.ink, 4);
    if (up > 8) F.arrow(ctx, DX, yd - R - 2, DX, yd - R - 2 - up, PAL.ink, 4);
    disc(ctx, DX, yd, R, F.mixColor(PAL.panel, rd, 0.35), rd, 2.5);
    for (let i = 0; i < k; i++) { const a = (i / k) * TAU + 0.4; disc(ctx, DX + (k > 1 ? 7.5 * Math.cos(a) : 0), yd + (k > 1 ? 7.5 * Math.sin(a) : 0), 3.6, ce, null); }
    hits.push({ x: DX, y: yd, r: R + 8, name: 'oil drop ' + drop.value + ', carrying ' + k + ' extra electron' + (k > 1 ? 's' : '') });
    const pull = 1.6 * k * E.v / 100, f14 = (x) => fmt(x, 1) + ' × 10⁻¹⁴ N';
    text(ctx, '↑ pull of the field', DX + 44, 262, PAL.ink, { size: 18 }); text(ctx, f14(pull), DX + 62, 286, PAL.ink, { size: 19, weight: 600 });
    text(ctx, '↓ weight', DX + 44, 452, PAL.ink, { size: 18 }); text(ctx, f14(4.8), DX + 62, 475, PAL.ink, { size: 19, weight: 600 });
    label(ctx, 'atomizer', 92, 164, { side: 'above', gap: 30 });
    label(ctx, 'pinhole', DX, TOP - 12, { side: 'above', gap: 58 });
    label(ctx, 'telescope', 200, 386, { side: 'below', gap: 30 });
    label(ctx, 'X-rays', CR + 44, 332, { side: 'right', gap: 16 });
    label(ctx, 'brass plates', 680, BOT + 12, { side: 'below', gap: 28 });
    /* the ladder of charge, 0 to 8.0 × 10⁻¹⁹ C, a rung at every multiple of 1.6 */
    const ax0 = 1010, ax1 = 1340, Y = (q) => 548 - 49 * q;
    text(ctx, 'charge (10⁻¹⁹ C)', ax0 - 46, 112, cq, { size: 20, weight: 600 });
    line(ctx, ax0, Y(0), ax0, Y(8) - 14, PAL.ink, 2.5);
    for (let m = 0; m <= 5; m++) {
      const yy = Y(1.6 * m);
      line(ctx, ax0, yy, ax1, yy, m ? alpha(PAL.ink, 0.4) : PAL.ink, m ? 2 : 2.5, m ? [10, 10] : undefined);
      text(ctx, fmt(1.6 * m, 1), ax0 - 12, yy, PAL.muted, { size: 17, align: 'right' });
      if (m) text(ctx, m + (m > 1 ? ' electrons' : ' electron'), ax1, yy - 15, PAL.muted, { size: 17, align: 'right' });
    }
    const seen = {};
    DROPS.forEach(([name, m]) => {
      const i = seen[m] = (seen[m] ?? -1) + 1, on = name === drop.value, x = ax0 + 58 + i * 76, yy = Y(1.6 * m);
      disc(ctx, x, yy, on ? 12 : 8, on ? cq : F.mixColor(PAL.panel, cq, 0.5), on ? PAL.ink : null, 2);
      text(ctx, name, x, yy - 26, rd, { size: on ? 21 : 18, weight: on ? 600 : 400, align: 'center' });
      hits.push({ x, y: yy, r: 16, name: 'drop ' + name + ', ' + fmt(1.6 * m, 1) + ' × 10⁻¹⁹ C' });
    });
    const fate = Math.abs(rel - 1) < 0.004 ? 'hovers' : rel < 1 ? 'falls' : 'rises';
    topline(ctx, 'At ' + fmt(E.v, 0) + ' kN/C drop ' + drop.value + (fate === 'hovers' ? ' hovers: the pull of the field equals its weight.' : fate === 'falls' ? ' falls: the field pulls up less than gravity pulls down.' : ' rises: the field pulls up harder than gravity pulls down.'));
    F.tex(d.readout, `\\kQ = \\frac{\\text{weight}}{\\text{field that holds the drop}} = \\frac{4.8\\times10^{-14}\\ \\text{N}}{${fmt(eh, 0)}\\ \\text{kN/C}} = ${hue(fmt(1.6 * k, 1) + '\\times10^{-19}\\ \\text{C}')} = ${k} \\times ${hue('1.6\\times10^{-19}\\ \\text{C}')}`, false, { values: false });
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();

/* =====================================================================
   FIGURE 2.9 + 2.10: the gold foil experiment seen from above, with the
   book's enlarged cross-section of the foil beside it. A radium source in
   a lead block fires about forty α particles a second at a thin foil that
   stands at the centre of a ring-shaped luminescent screen; each particle
   is scattered through the angle its impact parameter gives (Rutherford's
   point nucleus, or the spread-out charge of a plum pudding atom) and the
   screen flashes where it lands. The cross-section replays nine particles
   through twenty atoms of the foil on a 5 s loop, their paths integrated
   from the same force law. Moving and continuous. Flat: every path lies
   in one plane, so a view from above shows the whole experiment and a
   turn would add nothing (root rule 28.5).
   Scale: the distance of closest approach is 0.028 of an atom's diameter
   for gold at the lower energy, hundreds of times the true value, so that
   a particle comes back about once in half a minute; the caption says so.
===================================================================== */
(function () {
  const H = 640;
  const d = sim('sim-gold-foil', H);
  const model = F.choice(d.controls, { label: '\\text{atom}', aria: 'model of the atom', value: 'nuclear',
    options: [{ value: 'nuclear', label: 'Rutherford atom' }, { value: 'pudding', label: 'plum pudding atom' }], onInput: changed });
  const ELS = { Au: ['gold', 79], Ag: ['silver', 47], Zr: ['zirconium', 40], Ca: ['calcium', 20] };
  const elc = F.choice(d.controls, { label: '\\text{element}', aria: 'element of the foil', value: 'Au',
    options: Object.entries(ELS).map(([s, [nm]]) => ({ value: s, label: nm })), onInput: changed });
  const energy = F.choice(d.controls, { label: '\\alpha\\ \\text{energy}', aria: 'energy of the alpha particles', value: 'low',
    options: [{ value: 'low', label: 'lower' }, { value: 'high', label: 'higher' }], onInput: changed });
  const ro = F.readout(d);
  /* the screen's glow is zinc sulfide's green, a physical fact rather than a type or an element */
  const GLOW = '#39d353';
  /* the distance of closest approach in atomic radii, proportional to the nuclear charge and inversely to the energy */
  const Dof = () => 0.056 * (ELS[elc.value][1] / 79) * (energy.value === 'high' ? 0.5 : 1);
  /* the scattering angle for impact parameter b (atomic radii): a point nucleus, or a uniform sphere of charge one atom wide */
  const theta = (b, D) => (model.value === 'nuclear' ? 2 * Math.atan(D / (2 * b)) : D * b * Math.sqrt(Math.max(0, 1 - b * b)));
  const tally = { through: 0, aside: 0, back: 0 };
  function changed() { tally.through = tally.aside = tally.back = 0; flights.length = 0; flashes.length = 0; repath(); }

  /* ---------- the apparatus from above ---------- */
  const CX = 470, CY = 350, RING = 212, SX = 118, SPEED = 520, RATE = 40, LIFE = 1.6, GAPA = 0.1;
  const flights = [], flashes = [];
  let debt = 0;
  function fire() {
    const b = Math.sqrt(Math.random()), th = Math.max(0, Math.min(Math.PI, theta(b, Dof())));
    flights.push({ s: 0, th, side: Math.random() < 0.5 ? -1 : 1, off: (Math.random() - 0.5) * 6 });
  }
  function step(dt) {
    debt += RATE * dt;
    while (debt >= 1) { debt -= 1; fire(); }
    const far = CX - SX + RING - 6;
    for (let i = flights.length - 1; i >= 0; i--) {
      const f = flights[i]; f.s += SPEED * dt;
      if (f.s < far) continue;
      flights.splice(i, 1);
      const deg = (f.th * 180) / Math.PI;
      if (deg < 10) tally.through++; else if (deg < 90) tally.aside++; else tally.back++;
      if (Math.PI - f.th > GAPA) flashes.push({ a: f.side * f.th, age: 0, back: deg >= 90 });
    }
    for (let i = flashes.length - 1; i >= 0; i--) { const f = flashes[i]; f.age += dt; if (f.age > (f.back ? 3 * LIFE : LIFE)) flashes.splice(i, 1); }
    if (flashes.length > 160) flashes.splice(0, flashes.length - 160);
  }
  function bench(ctx) {
    const cs = F.ref('screen'), cf = F.ref('foil'), cb = F.ref('lead-block'), ca = F.el('He'), glow = F.fact(GLOW), nm = ELS[elc.value][0];
    /* the lead block, the bore the beam leaves by, and the radium at its end */
    shape(ctx, [[36, CY - 62], [190, CY - 62], [190, CY + 62], [36, CY + 62]], F.el('Pb'), PAL.ink, 2);
    shape(ctx, [[SX - 12, CY - 9], [191, CY - 9], [191, CY + 9], [SX - 12, CY + 9]], PAL.panel, alpha(PAL.ink, 0.5), 1.5);
    disc(ctx, SX, CY, 8, F.el('Ra'), PAL.ink, 1.5);
    hits.push({ x: SX, y: CY, r: 14, name: 'radium, the source of the α particles' });
    hits.push({ x: 70, y: CY - 36, r: 30, name: 'lead block, which absorbs the radiation that does not leave by the bore' }, { x: 70, y: CY + 36, r: 30, name: 'lead block, which absorbs the radiation that does not leave by the bore' });
    line(ctx, SX, CY, CX, CY, alpha(ca, 0.28), 7);
    /* the screen: a ring round the foil, open where the beam comes in */
    ctx.save(); ctx.lineCap = 'butt';
    ctx.strokeStyle = F.mixColor(PAL.panel, cs, 0.45); ctx.lineWidth = 13; ctx.beginPath(); ctx.arc(CX, CY, RING, Math.PI + GAPA, 3 * Math.PI - GAPA); ctx.stroke();
    ctx.strokeStyle = cs; ctx.lineWidth = 2;
    [RING - 6.5, RING + 6.5].forEach((r) => { ctx.beginPath(); ctx.arc(CX, CY, r, Math.PI + GAPA * RING / r, 3 * Math.PI - GAPA * RING / r); ctx.stroke(); });
    ctx.restore();
    /* the flashes, fading; one behind the foil is held longer and ringed */
    flashes.forEach((f) => {
      const life = f.back ? 3 * LIFE : LIFE, k = Math.max(0, 1 - f.age / life), x = CX + RING * Math.cos(f.a), yy = CY + RING * Math.sin(f.a);
      disc(ctx, x, yy, f.back ? 13 : 9, alpha(glow, 0.85 * k), null);
      if (f.back) { ctx.save(); ctx.strokeStyle = alpha(glow, k); ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, yy, 16 + 26 * Math.min(1, f.age / 0.8), 0, TAU); ctx.stroke(); ctx.restore(); }
    });
    /* the α particles in flight */
    flights.forEach((f) => {
      const before = CX - SX, r = f.s - before;
      if (r < 0) disc(ctx, SX + f.s, CY + f.off * 0.5, 3.6, ca, null);
      else disc(ctx, CX + r * Math.cos(f.th), CY + f.off * 0.5 + f.side * r * Math.sin(f.th), 3.6, ca, null);
    });
    /* the foil, edge on, and the patch of it that is enlarged */
    shape(ctx, [[CX - 4, CY - 40], [CX + 4, CY - 40], [CX + 4, CY + 40], [CX - 4, CY + 40]], F.el(elc.value), cf, 2);
    line(ctx, CX + 6, CY - 6, BOX.l, BOX.t, alpha(PAL.ink, 0.3), 1.5, [3, 7]); line(ctx, CX + 6, CY + 6, BOX.l, BOX.b, alpha(PAL.ink, 0.3), 1.5, [3, 7]);
    label(ctx, 'radium in a lead block', 113, CY + 62, { side: 'below', gap: 30, color: cb });
    label(ctx, 'α particles', 350, CY + 8, { side: 'below', gap: 34 });
    label(ctx, nm + ' foil', CX, CY - 40, { side: 'above', gap: 34, color: cf });
    label(ctx, 'luminescent screen', CX, CY + RING + 7, { side: 'below', gap: 26, color: cs });
    hits.push({ x: CX + RING, y: CY, r: 30, name: 'luminescent screen, which glows briefly where an α particle strikes it' });
  }

  /* ---------- the enlarged cross-section of the foil ---------- */
  const R = 45, BOX = { l: 800, r: 1364, t: 118, b: 568 };
  const ATOMS = [];
  [1000, 1090, 1180, 1270].forEach((x) => [163, 253, 343, 433, 523].forEach((yy) => ATOMS.push([x, yy])));
  /* each atom's electrons: round the nucleus in the Rutherford atom, embedded through the sphere in the plum pudding atom */
  const EL = ATOMS.map((_, i) => [0, 1, 2].map((j) => { const a = j * 2.09 + i * 0.7, rr = 0.25 + ((i * 3 + j * 5) % 6) / 10; return { ring: [0.7 * Math.cos(a), 0.7 * Math.sin(a)], pud: [rr * Math.cos(a + 0.9), rr * Math.sin(a + 0.9)] }; }));
  const IMPACTS = [190, 208, 243, 298, 343.4, 388, 443, 478, 496];
  const NS = 240, SUB = 40, X0 = 790, VX = 1400;
  /* one path: NS samples evenly in time, the particle's acceleration D v²/(2r²) away from each point nucleus, or D v² r/(2R³) inside each atom-wide sphere of charge */
  function integrate(y0, Dpx, nuclear) {
    let x = X0, yy = y0, vx = VX, vy = 0; const pts = [[x, yy]], h = 1 / (NS * SUB), K = (Dpx * VX * VX) / 2;
    for (let s = 1; s <= NS * SUB; s++) {
      let ax = 0, ay = 0;
      for (const [nx, ny] of ATOMS) {
        const dx = x - nx, dy = yy - ny, r2 = dx * dx + dy * dy, r = Math.sqrt(r2) || 1e-6;
        if (nuclear) { if (r < 3 * R) { const f = K / r2; ax += (f * dx) / r; ay += (f * dy) / r; } }
        else if (r < R) { const f = K / (R * R * R); ax += f * dx; ay += f * dy; }
      }
      vx += ax * h; vy += ay * h; x += vx * h; yy += vy * h;
      if (s % SUB === 0) pts.push([x, yy]);
    }
    return pts;
  }
  let shown = null, from = null; const tw = F.tween(d, 1);
  function pathsNow() { const D = Dof() * R; return IMPACTS.map((y0) => integrate(y0, D, model.value === 'nuclear')); }
  const current = () => { if (!from || tw.v >= 1) return shown; const k = F.ease.smooth(tw.v); return shown.map((p, i) => p.map(([x, yy], j) => [from[i][j][0] + (x - from[i][j][0]) * k, from[i][j][1] + (yy - from[i][j][1]) * k])); };
  function repath() { const next = pathsNow(); from = shown ? current() : next; shown = next; tw.set(0); tw.to(1, 900); }
  repath();
  const cy = cycle(() => Infinity, 0);
  const LOOP = 5, HOLD = 1.4;
  function section(ctx) {
    const paths = current(), t = cy.now(), u = isFinite(t) ? Math.min(1, (t % (LOOP + HOLD)) / LOOP) : 1;
    const pud = model.mix((m) => (m === 'pudding' ? 1 : 0)), cn = F.el(elc.value), ce = F.el('e-'), ca = F.el('He'), nm = ELS[elc.value][0];
    shape(ctx, [[BOX.l, BOX.t], [BOX.r, BOX.t], [BOX.r, BOX.b], [BOX.l, BOX.b]], PAL.panel, null);
    ctx.save(); ctx.beginPath(); ctx.rect(BOX.l, BOX.t, BOX.r - BOX.l, BOX.b - BOX.t); ctx.clip();
    ATOMS.forEach(([x, yy], i) => {
      disc(ctx, x, yy, R, F.mixColor(alpha(ce, 0.07), alpha(cn, 0.3), pud), alpha(PAL.ink, 0.3), 1.5);
      disc(ctx, x, yy, 4.5 + (R - 4.5) * pud, alpha(cn, 0.35 + 0.65 * (1 - pud)), null);
      if (pud < 0.5) disc(ctx, x, yy, 4.5, cn, alpha(PAL.ink, 0.6), 1);
      EL[i].forEach((e) => { const ex = e.ring[0] + (e.pud[0] - e.ring[0]) * pud, ey = e.ring[1] + (e.pud[1] - e.ring[1]) * pud; disc(ctx, x + ex * R, yy + ey * R, 3.2, ce, null); });
    });
    const upto = Math.round(u * NS);
    paths.forEach((p) => {
      const seg = p.slice(0, upto + 1);
      ctx.save(); ctx.strokeStyle = alpha(ca, 0.75); ctx.lineWidth = 3; ctx.lineJoin = 'round'; ctx.beginPath(); seg.forEach(([x, yy], i) => (i ? ctx.lineTo(x, yy) : ctx.moveTo(x, yy))); ctx.stroke(); ctx.restore();
      const [x, yy] = seg[seg.length - 1]; if (u < 1) disc(ctx, x, yy, 7, ca, alpha(PAL.ink, 0.6), 1.5);
    });
    ctx.restore();
    shape(ctx, [[BOX.l, BOX.t], [BOX.r, BOX.t], [BOX.r, BOX.b], [BOX.l, BOX.b]], null, F.ref('foil'), 2);
    const e0 = EL[0][0], ex = e0.ring[0] + (e0.pud[0] - e0.ring[0]) * pud, ey = e0.ring[1] + (e0.pud[1] - e0.ring[1]) * pud;
    label(ctx, 'electrons', 1000 + ex * R, 163 + ey * R, { side: 'above', gap: 163 + ey * R - 94 });
    label(ctx, pud < 0.5 ? nm + ' nucleus' : 'sphere of positive charge', 1270, 163 - (pud < 0.5 ? 6 : R), { side: 'above', gap: 163 - (pud < 0.5 ? 6 : R) - 94 });
    text(ctx, 'enlarged cross-section of the foil', (BOX.l + BOX.r) / 2, 596, PAL.ink, { size: 20, align: 'center' });
    hits.push({ x: BOX.l + 40, y: 298, r: 40, name: 'α particles, entering from the left' });
  }
  const hits = []; F.hover(d.stage, () => hits);
  const num = (x) => x.toLocaleString('en-US');
  function draw() {
    const { ctx } = begin(d.c);
    hits.length = 0;
    bench(ctx); section(ctx);
    const [nm, Z] = ELS[elc.value], Q = Z * E_CHARGE, tot = tally.through + tally.aside + tally.back, w = 600;
    F.rich(ctx, ['Of ', [num(tot), PAL.ink, w], ' α particles so far, ', [num(tally.through), PAL.ink, w], ' went straight through, ', [num(tally.aside), PAL.ink, w], tally.aside === 1 ? ' was deflected and ' : ' were deflected and ', [num(tally.back), PAL.ink, w], ' came back.'], 700, 46, { size: 24, align: 'center' });
    ro.set(`\\kQ = ${Z}\\,\\ke = ${Z} \\times ${hue('1.602\\times10^{-19}\\ \\text{C}')} = ${hue(sciTex(Q, 2) + '\\ \\text{C}')}`,
      model.value === 'nuclear' ? 'All of this positive charge sits in the ' + nm + ' nucleus.' : 'This positive charge is spread through the whole ' + nm + ' atom.');
  }
  register(d.fig, { update: (dt) => { cy.step(dt, () => 1); step(dt); }, draw });
})();
};
