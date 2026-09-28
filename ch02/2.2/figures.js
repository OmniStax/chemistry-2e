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
/* x in scientific notation for a canvas string: "1.27 × 10⁻¹⁷" */
const SUP = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
const sci = (x, d) => { const p = Math.floor(Math.log10(Math.abs(x))), m = x / 10 ** p; return { m: fmt(m, d), p }; };
const sciText = (x, d) => { const s = sci(x, d); return s.m + ' × 10' + String(s.p).split('').map((c) => SUP[c]).join(''); };
const sciTex = (x, d) => { const s = sci(x, d); return `${s.m}\\times10^{${s.p}}`; };
const E_CHARGE = 1.602e-19;

/* =====================================================================
   FIGURE 2.6: Thomson's cathode ray tube, flat and in section. Electrons
   stream from the cathode past the anode and down the tube to the scale on
   the far bulb; charged plates bend them toward the positive plate, the
   magnets bend them the other way, and with both on the two cancel. Moving:
   the beam is a flow, so the electrons travel continuously and the figure
   has a transport without a scrubber. Three choices, each a discrete state.
===================================================================== */
(function () {
  const H = 520;
  const d = sim('sim-cathode-ray', H);
  const plates = F.choice(d.controls, { label: '\\text{plates}', aria: 'charge on the plates', value: 'off',
    options: [{ value: 'off', label: 'off' }, { value: 'up', label: '+ top' }, { value: 'down', label: '+ bottom' }] });
  const magnets = F.choice(d.controls, { label: '\\text{magnets}', aria: 'the magnets', value: 'off',
    options: [{ value: 'off', label: 'off' }, { value: 'on', label: 'on' }] });
  const METALS = { Cu: 'copper', Fe: 'iron', Zn: 'zinc' };
  const metal = F.choice(d.controls, { label: '\\text{cathode}', aria: 'metal of the cathode', value: 'Cu',
    options: Object.entries(METALS).map(([s, n]) => ({ value: s, label: n })) });
  const ro = F.readout(d);
  const Y0 = 300, CX = 215, AX = 392, P0 = 640, P1 = 800, BX = 1120, BR = 135, TH = 0.1;
  /* the angle the beam leaves the plates at, upward positive: the plates give ±0.1 rad, the magnets −0.1 rad */
  const tilt = () => plates.mix((v) => ({ off: 0, up: 1, down: -1 })[v]) * TH - magnets.mix((v) => (v === 'on' ? 1 : 0)) * TH;
  /* the beam's path from the cathode to the glass of the far bulb */
  function path(th) {
    const pts = [];
    for (let x = CX + 8; x <= P0; x += 8) pts.push([x, Y0]);
    for (let x = P0; x <= P1; x += 4) pts.push([x, Y0 - (th / (2 * (P1 - P0))) * (x - P0) ** 2]);
    const ye = Y0 - th * (P1 - P0) / 2;
    for (let x = P1 + 8; ; x += 8) {
      const y = ye - th * (x - P1);
      if ((x - BX) ** 2 + (y - Y0) ** 2 >= (BR - 3) ** 2 && x > BX) { pts.push([x, y]); break; }
      pts.push([x, y]);
    }
    return pts;
  }
  const lengths = (pts) => { const L = [0]; for (let i = 1; i < pts.length; i++) L.push(L[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1])); return L; };
  const at = (pts, L, s) => { let i = 1; while (i < L.length - 1 && L[i] < s) i++; const k = (s - L[i - 1]) / ((L[i] - L[i - 1]) || 1); return [pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * k, pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * k]; };
  const cy = cycle(() => Infinity, 0);
  /* the glass outline: a small bulb round the cathode, a neck, the long tube and the far bulb */
  function glass(ctx) {
    const a0 = Math.asin(16 / 58), b0 = Math.asin(50 / BR), arc = (cx, r, from, to, n) => Array.from({ length: n + 1 }, (_, i) => { const a = from + ((to - from) * i) / n; return [cx + r * Math.cos(a), Y0 + r * Math.sin(a)]; });
    shape(ctx, [
      [CX + 10 + 58 * Math.cos(a0), Y0 - 16], [455, Y0 - 16], [490, Y0 - 50],
      ...arc(BX, BR, Math.PI + b0, 3 * Math.PI - b0, 60),
      [490, Y0 + 50], [455, Y0 + 16],
      ...arc(CX + 10, 58, a0, TAU - a0, 40),
    ], alpha(PAL.ink, 0.04), alpha(PAL.ink, 0.55), 2.5);
  }
  function draw() {
    const { ctx } = begin(d.c);
    const th = tilt(), pts = path(th), L = lengths(pts), end = pts[pts.length - 1], ce = F.el('e-'), cq = C('charge');
    glass(ctx);
    /* the scale on the outside of the far bulb, a tick every 5° */
    for (let i = -8; i <= 8; i++) {
      const a = (i * 5 * Math.PI) / 180, r0 = BR + 3, r1 = BR + (i % 4 === 0 ? 20 : 11);
      line(ctx, BX + r0 * Math.cos(a), Y0 + r0 * Math.sin(a), BX + r1 * Math.cos(a), Y0 + r1 * Math.sin(a), PAL.ink, i === 0 ? 3 : 2);
    }
    /* the high-voltage supply: cathode to the negative terminal, anode to the positive */
    const wire = alpha(PAL.ink, 0.7);
    line(ctx, CX - 4, Y0, 110, Y0, wire, 2.5); line(ctx, 110, Y0, 110, 380, wire, 2.5); line(ctx, 110, 404, 110, 470, wire, 2.5);
    line(ctx, 88, 380, 132, 380, PAL.ink, 3); line(ctx, 98, 404, 122, 404, PAL.ink, 5);
    text(ctx, '−', 146, 374, cq, { size: 26, weight: 600, align: 'center' }); text(ctx, '+', 146, 412, cq, { size: 26, weight: 600, align: 'center' });
    line(ctx, 110, 470, AX, 470, wire, 2.5); line(ctx, AX, 470, AX, Y0 + 20, wire, 2.5);
    /* the cathode, a disc of the chosen metal, and the anode, a short open cylinder */
    ctx.save(); ctx.fillStyle = metal.mixColor((s) => F.el(s)); ctx.fillRect(CX - 6, Y0 - 20, 12, 40); ctx.restore();
    shape(ctx, [[AX - 12, Y0 - 16], [AX + 12, Y0 - 16], [AX + 12, Y0 - 5], [AX - 12, Y0 - 5]], PAL.muted, null);
    shape(ctx, [[AX - 12, Y0 + 5], [AX + 12, Y0 + 5], [AX + 12, Y0 + 16], [AX - 12, Y0 + 16]], PAL.muted, null);
    /* the magnets sit in front of and behind the tube at the plates; drawn only while they are on */
    const mA = magnets.a('on');
    F.faded(ctx, mA, [0, 0], () => {
      disc(ctx, 700, Y0 - 58, 46, PAL.soft, alpha(PAL.ink, 0.6), 2); text(ctx, 'S', 700, Y0 - 78, PAL.ink, { size: 24, weight: 600, align: 'center' });
    });
    /* the plates, and their signs where they are charged */
    const pc = PAL.ink;
    shape(ctx, [[P0, Y0 - 36], [P1, Y0 - 36], [P1, Y0 - 30], [P0, Y0 - 30]], PAL.muted, pc, 1.5);
    shape(ctx, [[P0, Y0 + 30], [P1, Y0 + 30], [P1, Y0 + 36], [P0, Y0 + 36]], PAL.muted, pc, 1.5);
    plates.only(ctx, 'up', () => { text(ctx, '+', P0 - 18, Y0 - 33, cq, { size: 28, weight: 600, align: 'center' }); text(ctx, '−', P0 - 18, Y0 + 33, cq, { size: 28, weight: 600, align: 'center' }); }, [0, 0]);
    plates.only(ctx, 'down', () => { text(ctx, '−', P0 - 18, Y0 - 33, cq, { size: 28, weight: 600, align: 'center' }); text(ctx, '+', P0 - 18, Y0 + 33, cq, { size: 28, weight: 600, align: 'center' }); }, [0, 0]);
    /* the beam: a faint band along the path, the electrons travelling it, the glow where it lands */
    ctx.save(); ctx.strokeStyle = alpha(ce, 0.3); ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.beginPath(); pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.stroke(); ctx.restore();
    const t = cy.now(), run = isFinite(t) ? t : 0, gap = 46, speed = 300, total = L[L.length - 1];
    for (let s = (run * speed) % gap; s < total; s += gap) { const [x, y] = at(pts, L, s); disc(ctx, x, y, 5, ce, null); }
    disc(ctx, end[0], end[1], 11, alpha(ce, 0.55), null); disc(ctx, end[0], end[1], 5, ce, null);
    F.faded(ctx, mA, [0, 0], () => {
      disc(ctx, 712, Y0 + 14, 46, alpha(PAL.soft, 0.85), alpha(PAL.ink, 0.6), 2); text(ctx, 'N', 712, Y0 + 14, PAL.ink, { size: 24, weight: 600, align: 'center' });
    });
    /* labels, one per part */
    label(ctx, 'cathode', CX, Y0 - 30, { side: 'above', gap: 70 });
    label(ctx, 'anode', AX, Y0 - 18, { side: 'above', gap: 70 });
    label(ctx, 'cathode ray', 520, Y0 + 2, { side: 'below', gap: 90 });
    label(ctx, 'charged plates', P1 - 40, Y0 + 36, { side: 'below', gap: 80 });
    if (mA > 0.5) label(ctx, 'magnets', 760, Y0 - 90, { side: 'right', gap: 60 });
    label(ctx, 'scale on the glass', BX + BR + 10, Y0 + 70, { side: 'below', gap: 70 });
    text(ctx, 'high voltage', 110, 496, PAL.ink, { size: 20, align: 'center' });
    /* where the spot lands, in degrees of the scale above or below its middle */
    const deg = Math.round((Math.atan2(Y0 - end[1], end[0] - BX) * 180) / Math.PI);
    const p = plates.value, m = magnets.value === 'on';
    const head = p === 'off' && !m ? 'With the plates uncharged and the magnets off, the beam runs straight to the middle of the scale.'
      : p === 'up' && m ? 'The pull toward the positive plate and the push of the magnets cancel, and the beam runs straight.'
      : p === 'up' ? 'The beam bends toward the positive plate above it and strikes the scale ' + deg + '° above the middle.'
      : p === 'down' && m ? 'The positive plate below and the magnets both bend the beam down, and it strikes the scale ' + -deg + '° below the middle.'
      : p === 'down' ? 'The beam bends toward the positive plate below it and strikes the scale ' + -deg + '° below the middle.'
      : 'The magnets alone bend the beam down, and it strikes the scale ' + -deg + '° below the middle.';
    topline(ctx, head);
    ro.set('\\text{charge-to-mass ratio} = 1.759\\times10^{11}\\ \\text{C/kg}',
      'The cathode is ' + METALS[metal.value] + '. Every metal gives the same beam and the same ratio, so its particles are the same in all atoms.');
  }
  F.hover(d.stage, () => [
    { x: 110, y: 392, r: 30, name: 'high-voltage supply' },
    { x: CX, y: Y0, r: 22, name: METALS[metal.value] + ' cathode, the negative electrode' },
    { x: AX, y: Y0, r: 20, name: 'anode, the positive electrode' },
  ]);
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();

/* =====================================================================
   FIGURE 2.7: Millikan's oil drops. A drop carrying n extra electrons
   falls between two charged plates, and the field between them pulls it
   upward; at the field where the pull balances gravity it hovers. Moving:
   the drop drifts for 5 s and the loop holds 1.2 s. All five drops of the
   book's table are drawn with one mass, so the hovering field is 30/n kN/C.
   Beside the chamber, the book's table and a number line of charge with a
   tick at every multiple of 1.6 × 10⁻¹⁹ C, in the charge hue.
===================================================================== */
(function () {
  const H = 600;
  const d = sim('sim-oil-drop', H);
  const DROPS = [['A', 3], ['B', 2], ['C', 4], ['D', 1], ['E', 3]];
  const EH = 30;                                              /* kN/C that holds a drop with one extra electron still */
  const drop = F.choice(d.controls, { label: '\\text{drop}', aria: 'the oil drop', value: 'A', ms: 0,
    options: DROPS.map(([k]) => ({ value: k, label: k })), onInput: () => cy.reset() });
  const n = () => DROPS.find(([k]) => k === drop.value)[1];
  const E = ctl(d.controls, { label: '\\text{field}', cls: '', min: 0, max: 40, step: 0.1, value: 10, unit: 'kN/C', dec: 1, aria: 'electric field strength between the plates in kilonewtons per coulomb',
    specials: [{ at: () => EH / n(), label: 'hovers' }], onInput: () => cy.reset() });
  const ro = F.readout(d);
  const T = 5, TOP = 214, BOT = 496, DX = 400, R = 17, V0 = 70;
  const cy = cycle(() => T, 1.2);
  const y = () => { const t = Math.min(cy.now(), T), v = V0 * (1 - E.v / (EH / n())); return Math.min(BOT - R, Math.max(TOP + R, 350 + v * t)); };
  function draw() {
    const { ctx } = begin(d.c);
    const cq = C('charge'), ce = F.el('e-'), k = n(), yd = y(), eh = EH / k, rel = E.v / eh;
    /* the chamber, the atomizer at its top, the plates, the X-rays and the telescope */
    shape(ctx, [[120, 120], [690, 120], [690, 560], [120, 560]], alpha(PAL.ink, 0.03), alpha(PAL.ink, 0.5), 2);
    disc(ctx, 190, 150, 20, PAL.soft, PAL.ink, 2); line(ctx, 208, 146, 260, 146, PAL.ink, 4);
    for (let i = 0; i < 9; i++) disc(ctx, 275 + (i % 3) * 18 + (i * 7) % 11, 138 + Math.floor(i / 3) * 10, 3, alpha(PAL.ink, 0.35), null);
    shape(ctx, [[150, TOP - 14], [DX - 10, TOP - 14], [DX - 10, TOP - 2], [150, TOP - 2]], PAL.muted, PAL.ink, 1.5);
    shape(ctx, [[DX + 10, TOP - 14], [660, TOP - 14], [660, TOP - 2], [DX + 10, TOP - 2]], PAL.muted, PAL.ink, 1.5);
    shape(ctx, [[150, BOT + 2], [660, BOT + 2], [660, BOT + 14], [150, BOT + 14]], PAL.muted, PAL.ink, 1.5);
    text(ctx, '+', 676, TOP - 8, cq, { size: 28, weight: 600, align: 'center' });
    text(ctx, '−', 676, BOT + 8, cq, { size: 28, weight: 600, align: 'center' });
    F.arrow(ctx, 135, 262, 250, 262, alpha(PAL.ink, 0.6), 3);
    shape(ctx, [[690, 330], [790, 322], [790, 358], [690, 350]], PAL.soft, PAL.ink, 2);
    label(ctx, 'atomizer', 190, 130, { side: 'above', gap: 38 });
    label(ctx, 'X-rays', 180, 262, { side: 'below', gap: 30 });
    label(ctx, 'telescope', 760, 322, { side: 'above', gap: 40 });
    label(ctx, 'brass plates', 560, BOT + 14, { side: 'below', gap: 34 });
    /* the drop and its extra electrons, the pull of gravity down and the field's pull up */
    const g = 64, up = Math.min(150, g * rel, yd - R - 6 - TOP);
    F.arrow(ctx, DX, yd + R + 2, DX, yd + R + 2 + g, alpha(PAL.ink, 0.7), 4);
    if (up > 6) F.arrow(ctx, DX, yd - R - 2, DX, yd - R - 2 - up, alpha(PAL.ink, 0.7), 4);
    disc(ctx, DX, yd, R, PAL.soft, PAL.ink, 2);
    for (let i = 0; i < k; i++) { const a = (i / k) * TAU + 0.4; disc(ctx, DX + (k > 1 ? 8 * Math.cos(a) : 0), yd + (k > 1 ? 8 * Math.sin(a) : 0), 4, ce, null); }
    text(ctx, 'gravity pulls down; the field pulls up', 405, 588, PAL.muted, { size: 17, align: 'center' });
    /* the book's table of the five drops */
    const tx = 860, ty = 150;
    text(ctx, 'oil drop', tx, ty, PAL.ink, { size: 20, weight: 600 });
    text(ctx, 'charge', tx + 330, ty, PAL.ink, { size: 20, weight: 600, align: 'right' });
    line(ctx, tx, ty + 18, tx + 340, ty + 18, alpha(PAL.ink, 0.4), 1.5);
    DROPS.forEach(([name, m], i) => {
      const yy = ty + 48 + i * 32, on = name === drop.value;
      if (on) shape(ctx, [[tx - 10, yy - 15], [tx + 350, yy - 15], [tx + 350, yy + 15], [tx - 10, yy + 15]], alpha(PAL.ink, 0.07), null);
      text(ctx, name, tx + 30, yy, PAL.ink, { size: 20, weight: on ? 600 : 400, align: 'center' });
      text(ctx, fmt(1.6 * m, 1) + ' × 10⁻¹⁹ C', tx + 330, yy, cq, { size: 20, weight: on ? 600 : 400, align: 'right' });
    });
    /* the number line of charge, 0 to 8.0 × 10⁻¹⁹ C, a tick at every multiple of 1.6 */
    const ax0 = 850, ax1 = 1330, ay = 490, X = (q) => ax0 + ((ax1 - ax0) * q) / 8;
    line(ctx, ax0, ay, ax1, ay, PAL.ink, 2.5);
    for (let m = 0; m <= 5; m++) {
      line(ctx, X(1.6 * m), ay - 8, X(1.6 * m), ay + 8, PAL.ink, 2);
      text(ctx, fmt(1.6 * m, 1), X(1.6 * m), ay + 26, PAL.muted, { size: 17, align: 'center' });
      if (m) text(ctx, m + 'e', X(1.6 * m), ay + 50, PAL.muted, { size: 17, align: 'center' });
    }
    text(ctx, 'charge (10⁻¹⁹ C)', (ax0 + ax1) / 2, ay + 84, cq, { size: 20, weight: 600, align: 'center' });
    const seen = {};
    DROPS.forEach(([name, m]) => {
      const lvl = seen[m] = (seen[m] ?? -1) + 1, on = name === drop.value, x = X(1.6 * m), yy = ay - 20 - lvl * 28;
      disc(ctx, x, yy, on ? 11 : 8, on ? cq : alpha(cq, 0.45), on ? PAL.ink : null, 2);
      text(ctx, name, x + 18, yy, PAL.ink, { size: 17, weight: on ? 600 : 400 });
    });
    const q = 1.6 * k, fate = Math.abs(rel - 1) < 0.004 ? 'hovers' : rel < 1 ? 'falls' : 'rises';
    topline(ctx, 'Drop ' + drop.value + ' carries ' + fmt(q, 1) + ' × 10⁻¹⁹ C, ' + ['', 'once', 'twice', 'three times', 'four times'][k] + ' 1.6 × 10⁻¹⁹ C; at ' + fmt(E.v, 1) + ' kN/C it ' + fate + '.');
    ro.set(`\\kQ = ${k}\\,\\ke = ${k} \\times ${hue('1.6\\times10^{-19}\\ \\text{C}')} = ${hue(fmt(q, 1) + '\\times10^{-19}\\ \\text{C}')}`,
      'Drop ' + drop.value + ' has picked up ' + ['', 'one extra electron', 'two extra electrons', 'three extra electrons', 'four extra electrons'][k] + ', and it hovers at ' + fmt(eh, 1) + ' kN/C.');
  }
  F.hover(d.stage, () => [{ x: DX, y: y(), r: R + 6, name: 'oil drop ' + drop.value + ', with ' + n() + ' extra electron' + (n() > 1 ? 's' : '') }]);
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();

/* =====================================================================
   FIGURE 2.9 + 2.10: the gold foil experiment as a bench in three
   dimensions, with the book's magnified patch of foil flat beneath it.
   The bench fires about forty α particles a second from a radium source in
   a lead block at a thin foil inside a ring-shaped luminescent screen; each
   is scattered through the angle its impact parameter gives (Rutherford's
   point nucleus, or the spread-out charge of a plum pudding atom) and the
   screen flashes where it lands. The panel replays nine particles through
   the foil on a 5 s loop, their paths integrated from the same force law.
   Moving and continuous. Physical 3D: a bench with a ground, pitch bounded
   to 0.15–1.35 rad so it is never seen from beneath, yaw free, spin off
   since the particles already move. Without WebGL the panel stands alone.
   Scale: the distance of closest approach is 0.028 of an atom's diameter
   for gold at the lower energy, hundreds of times the true value, so that
   a backward bounce comes about once a minute; the caption says so.
===================================================================== */
(function () {
  const d = sim('sim-gold-foil');
  const v = F.view3d(d.stage, { h: 400, dist: 5.2, tilt: 0.5, spin: 'off', pitch: [0.15, 1.35],
    views: [{ label: 'bench', yaw: 0.5, pitch: 0.5 }, { label: 'above', yaw: 0, pitch: 1.35 }] });
  const has3 = !!v.scene;
  if (!has3) v.wrap.style.display = 'none';
  const PH = 440, cnv = F.makeCanvas(d.stage, PH);
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
  function changed() { tally.through = tally.aside = tally.back = 0; flights.length = 0; flashes.forEach((f) => { f.age = 9; }); repath(); sig = ''; }

  /* ---------- the bench ---------- */
  const grp = has3 ? v.part(0) : null;
  const RING = 1.5, SRC = [-2.3, 0, 0], SPEED = 2.6, RATE = 40, LIFE = 1.6;
  const flights = [], flashes = [];
  let sig = '', pool = [], glows = [], spawnDebt = 0;
  const palSig = () => [PAL.ink, PAL.soft, PAL.muted, F.el(elc.value), F.el('He'), F.el('Ra')].join('|');
  function build() {
    if (!has3) return;
    const key = palSig(); if (key === sig) return; sig = key;
    const T3 = window.THREE;
    v.clear();
    F.mesh.box(grp, [0, -0.5, 0], [6.4, 0.08, 3.8], PAL.soft);
    v.pickable(F.mesh.box(grp, [-2.62, -0.14, 0], [0.64, 0.64, 0.64], PAL.muted), 'lead block, which absorbs the radiation the beam does not use');
    v.pickable(F.mesh.sphere(grp, SRC, 0.07, F.el('Ra')), 'radium, the source of the α particles');
    F.mesh.polyline(grp, [SRC, [0, 0, 0]], PAL.muted);
    v.pickable(F.mesh.box(grp, [0, 0, 0], [0.02, 0.56, 0.56], F.el(elc.value)), 'thin ' + ELS[elc.value][0] + ' foil');
    F.mesh.stick(grp, [0, -0.46, 0], [0, -0.28, 0], 0.03, PAL.muted);
    const ring = new T3.Mesh(new T3.CylinderGeometry(RING, RING, 0.5, 72, 1, true, 1.5 * Math.PI + 0.1, 2 * Math.PI - 0.2),
      F.mesh.mat(PAL.soft, { transparent: true, opacity: 0.35, depthWrite: false, side: T3.DoubleSide }));
    grp.add(ring); v.pickable(ring, 'luminescent screen, which glows briefly where an α particle strikes it');
    [-0.25, 0.25].forEach((yy) => F.mesh.polyline(grp, Array.from({ length: 73 }, (_, i) => { const a = 1.5 * Math.PI + 0.1 + ((2 * Math.PI - 0.2) * i) / 72; return [RING * Math.sin(a), yy, RING * Math.cos(a)]; }), PAL.muted));
    [0.5, 2.1, 3.6, 4.6].forEach((a) => F.mesh.stick(grp, [RING * Math.cos(a), -0.46, RING * Math.sin(a)], [RING * Math.cos(a), -0.25, RING * Math.sin(a)], 0.025, PAL.muted));
    pool = Array.from({ length: 90 }, () => { const m = F.mesh.sphere(grp, [0, -9, 0], 0.035, F.el('He')); m.visible = false; return m; });
    glows = Array.from({ length: 110 }, () => { const m = F.mesh.sphere(grp, [0, -9, 0], 0.045, GLOW, { transparent: true, opacity: 0, emissive: new T3.Color(GLOW), emissiveIntensity: 0.6 }); m.visible = false; return m; });
    v.label('radium in a lead block', [-2.62, -0.46, 0.32], grp, -14);
    v.label(ELS[elc.value][0] + ' foil', [0, 0.28, 0], grp, 34);
    v.label('luminescent screen', [RING, 0.25, 0], grp, 16);
    v.label('α particles', [-1.4, 0, 0], grp, 16);
  }
  function fire() {
    const D = Dof(), b = Math.sqrt(Math.random()), th = Math.max(0, Math.min(Math.PI, theta(b, D))), side = Math.random() < 0.5 ? -1 : 1, yy = (Math.random() - 0.5) * 0.12;
    const deg = (th * 180) / Math.PI;
    if (deg < 10) tally.through++; else if (deg < 90) tally.aside++; else tally.back++;
    flights.push({ t: 0, th, side, yy });
  }
  function step(dt) {
    spawnDebt += RATE * dt;
    while (spawnDebt >= 1) { spawnDebt -= 1; fire(); }
    const t1 = -SRC[0] / SPEED, t2 = t1 + RING / SPEED;
    for (let i = flights.length - 1; i >= 0; i--) {
      const f = flights[i]; f.t += dt;
      if (f.t >= t2) {
        flights.splice(i, 1);
        const a = Math.atan2(f.side * Math.sin(f.th), Math.cos(f.th));
        if (Math.abs(Math.abs(a) - Math.PI) > 0.08) flashes.push({ p: [RING * Math.cos(f.th) * 0.98, f.yy, RING * f.side * Math.sin(f.th) * 0.98], age: 0 });
      }
    }
    flashes.forEach((f) => { f.age += dt; });
    while (flashes.length && flashes[0].age > LIFE) flashes.shift();
    while (flashes.length > glows.length) flashes.shift();
  }
  function place() {
    if (!has3 || !pool.length) return;
    const t1 = -SRC[0] / SPEED;
    pool.forEach((m, i) => {
      const f = flights[i]; m.visible = !!f; if (!f) return;
      if (f.t < t1) m.position.set(SRC[0] + SPEED * f.t, f.yy, 0);
      else { const r = SPEED * (f.t - t1); m.position.set(r * Math.cos(f.th), f.yy, r * f.side * Math.sin(f.th)); }
    });
    glows.forEach((m, i) => {
      const f = flashes[i]; m.visible = !!f; if (!f) return;
      m.position.set(f.p[0], f.p[1], f.p[2]); m.material.opacity = Math.max(0, 1 - f.age / LIFE);
    });
    v.invalidate();
  }

  /* ---------- the magnified patch of foil ---------- */
  const R = 50, BOX = { l: 40, r: 1360, t: 104, b: 424 };
  const ATOMS = [];
  [560, 760].forEach((x) => [160, 260, 360].forEach((y) => ATOMS.push([x, y])));
  [110, 210, 310, 410].forEach((y) => ATOMS.push([660, y]));
  /* each atom's electrons: on a ring in the nuclear atom, scattered through the sphere in the plum pudding atom */
  const EL = ATOMS.map((_, i) => [0, 1, 2, 3].map((j) => { const a = j * 1.57 + i * 0.7, rr = 0.25 + ((i * 3 + j * 5) % 7) / 10; return { ring: [0.72 * Math.cos(a), 0.72 * Math.sin(a)], pud: [rr * Math.cos(a + 0.9), rr * Math.sin(a + 0.9)] }; }));
  const IMPACTS = [135, 159.8, 185, 235, 262.5, 285, 335, 364, 385];
  const NS = 240, SUB = 40, X0 = 30, VX = 1400;
  /* one path: NS samples evenly in time, the particle's acceleration D v²/(2r²) away from each point nucleus, or D v² r/(2R³) inside each atom-wide sphere of charge */
  function integrate(y0, Dpx, nuclear) {
    let x = X0, y = y0, vx = VX, vy = 0; const pts = [[x, y]], h = 1 / (NS * SUB), K = (Dpx * VX * VX) / 2;
    for (let s = 1; s <= NS * SUB; s++) {
      let ax = 0, ay = 0;
      for (const [nx, ny] of ATOMS) {
        const dx = x - nx, dy = y - ny, r2 = dx * dx + dy * dy, r = Math.sqrt(r2) || 1e-6;
        if (nuclear) { if (r < 3 * R) { const f = K / r2; ax += (f * dx) / r; ay += (f * dy) / r; } }
        else if (r < R) { const f = K / (R * R * R); ax += f * dx; ay += f * dy; }
      }
      vx += ax * h; vy += ay * h; x += vx * h; y += vy * h;
      if (s % SUB === 0) pts.push([x, y]);
    }
    return pts;
  }
  let shown = null, from = null, tw = F.tween(d, 1);
  function pathsNow() { const D = Dof() * R; return IMPACTS.map((y0) => integrate(y0, D, model.value === 'nuclear')); }
  function repath() { const next = pathsNow(); from = shown ? current() : next; shown = next; tw.set(0); tw.to(1, 900); }
  const current = () => { if (!from || tw.v >= 1) return shown; const k = F.ease.smooth(tw.v); return shown.map((p, i) => p.map(([x, y], j) => [from[i][j][0] + (x - from[i][j][0]) * k, from[i][j][1] + (y - from[i][j][1]) * k])); };
  const angleOf = (p) => { const a = p[p.length - 1], b = p[p.length - 2]; return (Math.abs(Math.atan2(a[1] - b[1], a[0] - b[0])) * 180) / Math.PI; };
  repath();
  const cy = cycle(() => Infinity, 0);
  const LOOP = 5, HOLD = 1.4;
  function panel() {
    const { ctx } = begin(cnv);
    const paths = current(), t = cy.now(), u = isFinite(t) ? Math.min(1, (t % (LOOP + HOLD)) / LOOP) : 1;
    const pud = model.mix((m) => (m === 'pudding' ? 1 : 0)), cn = F.el(elc.value), ce = F.el('e-'), ca = F.el('He');
    ctx.save(); ctx.beginPath(); ctx.rect(BOX.l, BOX.t, BOX.r - BOX.l, BOX.b - BOX.t); ctx.clip();
    ATOMS.forEach(([x, y], i) => {
      disc(ctx, x, y, R, F.mixColor(alpha(ce, 0.06), alpha(cn, 0.3), pud), alpha(PAL.ink, 0.25), 1.5);
      disc(ctx, x, y, 5 + (R - 5) * pud, alpha(cn, 0.35 + 0.65 * (1 - pud)), null);
      if (pud < 0.5) disc(ctx, x, y, 5, cn, alpha(PAL.ink, 0.5), 1);
      EL[i].forEach((e) => { const ex = e.ring[0] + (e.pud[0] - e.ring[0]) * pud, ey = e.ring[1] + (e.pud[1] - e.ring[1]) * pud; disc(ctx, x + ex * R, y + ey * R, 3.5, ce, null); });
    });
    const upto = Math.round(u * NS);
    paths.forEach((p) => {
      const seg = p.slice(0, upto + 1);
      ctx.save(); ctx.strokeStyle = alpha(PAL.ink, 0.5); ctx.lineWidth = 2.5; ctx.beginPath(); seg.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.stroke(); ctx.restore();
      const [x, y] = seg[seg.length - 1]; if (u < 1) disc(ctx, x, y, 7, ca, alpha(PAL.ink, 0.6), 1.5);
    });
    ctx.restore();
    shape(ctx, [[BOX.l, BOX.t], [BOX.r, BOX.t], [BOX.r, BOX.b], [BOX.l, BOX.b]], null, alpha(PAL.ink, 0.35), 1.5);
    label(ctx, 'α particles', 110, IMPACTS[0], { side: 'above', gap: 24 });
    label(ctx, pud < 0.5 ? ELS[elc.value][0] + ' nucleus' : 'sphere of positive charge', 760, 360 + (pud < 0.5 ? 5 : R), { side: 'below', gap: 34 });
    label(ctx, 'electrons', 560 + EL[0][0].ring[0] * R, 160 + EL[0][0].ring[1] * R, { side: 'left', gap: 60 });
    const ends = shown.map(angleOf), nT = ends.filter((a) => a < 10).length, nB = ends.filter((a) => a > 90).length, nA = ends.length - nT - nB;
    const words = ['none', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    topline(ctx, 'Of nine α particles, ' + words[nT] + ' pass' + (nT === 1 ? 'es' : '') + ' straight through, ' + words[nA] + ' ' + (nA === 1 ? 'is' : 'are') + ' turned aside, and ' + words[nB] + ' ' + (nB === 1 ? 'bounces' : 'bounce') + ' back.');
  }
  function draw() {
    build(); place(); panel();
    const [nm, Z] = ELS[elc.value], Q = Z * E_CHARGE, tot = tally.through + tally.aside + tally.back;
    ro.set(`\\kQ = ${Z}\\,\\ke = ${hue(sciTex(Q, 2) + '\\ \\text{C}')}`,
      (model.value === 'nuclear' ? 'The ' + nm + ' nucleus carries all of this positive charge in a tiny volume. ' : 'The plum pudding atom spreads this positive charge through the whole ' + nm + ' atom. ')
      + (tot ? 'Of ' + tot.toLocaleString('en-US') + ' α particles fired so far, ' + tally.through.toLocaleString('en-US') + ' went through within 10°, ' + tally.aside.toLocaleString('en-US') + ' were deflected further, and ' + tally.back.toLocaleString('en-US') + ' came back past 90°.' : ''),
      { values: false });
  }
  register(d.fig, { update: (dt) => { cy.step(dt, () => 1); step(dt); }, draw });
})();
};
