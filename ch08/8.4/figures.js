/* Figures for section 8.4 Molecular Orbital Theory. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['8.4'] = function (root, F) {
const { el, fmt, tex, C, PAL, alpha, ctl, register, begin, line, dot, text, headline, arrow } = F;
const sim = (id, H) => F.sim(root, id, H);
const still = (d, draw) => register(d.fig, { update: () => {}, draw });
const TAU = 2 * Math.PI, RAD = Math.PI / 180;
const clamp = (x, a, b) => Math.min(b, Math.max(a, x));
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;

/* the energy axis of a diagram: an upward arrow and its E, in the energy hue */
function eAxis(ctx, x, y0, y1) {
  const c = C('energy');
  arrow(ctx, x, y0, x, y1, c, 4);
  text(ctx, 'E', x - 22, (y0 + y1) / 2, c, { size: 26, weight: 600, align: 'right' });
}
/* one electron as the book's half-arrow standing on an orbital line at (x, y): up with its barb to the left at the top, down with its barb to the right at the foot */
function electron(ctx, x, y, up, a = 1, h = 34) {
  if (a <= 0.01) return;
  ctx.save(); ctx.globalAlpha *= a;
  const top = y - h - 4, foot = y - 4;
  line(ctx, x, foot, x, top, PAL.ink, 3);
  if (up) line(ctx, x, top, x - 9, top + 11, PAL.ink, 3); else line(ctx, x, foot, x + 9, foot - 11, PAL.ink, 3);
  ctx.restore();
}

/* =====================================================================
   FIGURE 8.27: a Gouy balance, drawn from the book's image. The sample tube
   hangs by a thread from the left end of the beam with its lower end
   between the pole pieces of two electromagnets; the dish of weights hangs
   from the right end; the beam rests on a knife edge on the pillar. The
   magnets stand on the bench and do not move with the beam. Switching the
   field on pulls a paramagnetic sample down into it (the beam tips toward
   the sample) and pushes a diamagnetic one weakly out. Still: the beam
   eases to its new tilt on a change.
   The masses: 10.0 cm of liquid in a tube 5.0 mm across, 0.50 T between the
   poles, F = χ A B² / 2μ₀ with the volume susceptibilities of liquid O₂
   (+7699 × 10⁻⁶ cm³/mol at 90 K) and liquid N₂ (−12.0 × 10⁻⁶ cm³/mol).
===================================================================== */
(function () {
  const d = sim('sim-gouy', 620);
  const sample = F.choice(d.controls, { label: '\\text{sample}', options: [{ value: 'o2', label: 'liquid O₂' }, { value: 'n2', label: 'liquid N₂' }], value: 'o2', aria: 'the liquid in the sample tube', onInput: () => go() });
  const field = F.choice(d.controls, { label: '\\text{electromagnets}', options: [{ value: 'off', label: 'off' }, { value: 'on', label: 'on' }], value: 'off', aria: 'electromagnets off or on', onInput: () => go() });
  /* the sample's mass and the change the field makes, in grams */
  const AREA = Math.PI * 0.25 * 0.25, COL = 10.0, B = 0.5, MU0 = 4e-7 * Math.PI, G = 9.80665;
  const LIQ = { o2: { rho: 1.141, M: 32.00, chiM: 7699e-6, name: 'liquid oxygen, O₂', tex: '\\text{O}_2' }, n2: { rho: 0.807, M: 28.01, chiM: -12.0e-6, name: 'liquid nitrogen, N₂', tex: '\\text{N}_2' } };
  const massOf = (k) => LIQ[k].rho * AREA * COL;
  const shiftOf = (k) => { const L = LIQ[k], chiV = 4 * Math.PI * L.chiM * (L.rho / L.M); return (1000 * chiV * AREA * 1e-4 * B * B) / (2 * MU0 * G); };
  const LOX_BLUE = '#7fa6e8';   /* the pale blue of liquid oxygen, as the book's image shows the sample */
  const target = () => (field.value === 'off' ? 0 : sample.value === 'o2' ? 4.2 : -1.2);
  const tilt = F.tween(d, 0);
  function go() { tilt.to(target(), 900); }
  /* where things stand: the pivot on the pillar, the half-length of the beam, the gap of the magnets */
  const PX = 820, PY = 132, L = 390, GX = PX - L, GY = 452, FACE = 52, POLE = 50, BODY = 150, BH = 84, PH = 56;
  let hits = []; F.hover(d.stage, () => hits);
  const shade = (ctx, x0, x1, base, k = 0.32) => {
    const g = ctx.createLinearGradient(0, x0, 0, x1);
    g.addColorStop(0, F.mixColor(base, PAL.panel, 0.35)); g.addColorStop(0.45, F.mixColor(base, PAL.panel, 0.7)); g.addColorStop(1, F.mixColor(base, PAL.ink, k));
    return g;
  };
  function magnet(ctx, side, c, on) {
    /* side −1 is the left magnet, its pole face toward the gap at GX − FACE; +1 the right one */
    const xf = GX + side * FACE, xp = xf + side * POLE, xb = xp + side * BODY;
    const fill = shade(ctx, GY - BH, GY + BH, alpha(c, on ? 0.9 : 0.6));
    ctx.save(); ctx.lineWidth = 2.5; ctx.strokeStyle = c; ctx.fillStyle = fill; ctx.lineJoin = 'round';
    /* the body, a cylinder seen from the side with its far end showing as an ellipse */
    ctx.beginPath(); ctx.moveTo(xp, GY - BH); ctx.lineTo(xb, GY - BH); ctx.ellipse(xb, GY, 26, BH, 0, -Math.PI / 2, Math.PI / 2, side < 0); ctx.lineTo(xp, GY + BH); ctx.closePath(); ctx.fill(); ctx.stroke();
    /* the tapered pole piece, narrowing to its face */
    ctx.beginPath(); ctx.moveTo(xp, GY - BH + 8); ctx.lineTo(xf, GY - PH); ctx.lineTo(xf, GY + PH); ctx.lineTo(xp, GY + BH - 8); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(xf, GY, 12, PH, 0, 0, TAU); ctx.fillStyle = F.mixColor(alpha(c, 0.7), PAL.panel, 0.4); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(xp, GY, 18, BH - 8, 0, side < 0 ? -Math.PI / 2 : Math.PI / 2, side < 0 ? Math.PI / 2 : 3 * Math.PI / 2); ctx.stroke();
    ctx.restore();
  }
  function fieldLines(ctx, k) {
    if (k <= 0.01) return;
    const c = alpha(PAL.ink, 0.55 * k), x0 = GX - FACE + 12, x1 = GX + FACE - 12;
    ctx.save(); ctx.strokeStyle = c; ctx.lineWidth = 2;
    const head = (x, y, ang) => { ctx.beginPath(); ctx.moveTo(x - 9 * Math.cos(ang - 0.45), y - 9 * Math.sin(ang - 0.45)); ctx.lineTo(x, y); ctx.lineTo(x - 9 * Math.cos(ang + 0.45), y - 9 * Math.sin(ang + 0.45)); ctx.stroke(); };
    /* straight across the gap, then bulging loops that leave the face's edge and return to the other face */
    [-40, -20, 0, 20, 40].forEach((dy) => { ctx.beginPath(); ctx.moveTo(x0, GY + dy); ctx.lineTo(x1, GY + dy); ctx.stroke(); head(GX + 12, GY + dy, 0); });
    [56, 104, 160].forEach((b, i) => [-1, 1].forEach((s) => {
      const y = GY + s * (PH - 6 + i * 4);
      ctx.beginPath(); ctx.moveTo(x0, y); ctx.bezierCurveTo(GX - FACE + 10 - i * 22, y + s * b, GX + FACE - 10 + i * 22, y + s * b, x1, y); ctx.stroke();
      head(GX + 6, y + s * b * 0.75, 0);
    }));
    ctx.restore();
  }
  function draw() {
    const { ctx } = begin(d.c);
    const th = tilt.v * RAD, on = field.value === 'on', kOn = field.k < 1 && field.from !== field.value ? (on ? field.k : 1 - field.k) : on ? 1 : 0;
    const cBal = F.ref('balance'), cSam = F.ref('sample'), cMag = F.ref('electromagnets'), cW = F.ref('weights');
    const lx = PX - L * Math.cos(th), ly = PY + L * Math.sin(th), rx = PX + L * Math.cos(th), ry = PY - L * Math.sin(th);
    hits = [];
    /* the base and the pillar, a knife edge at its top */
    ctx.save(); ctx.lineWidth = 2.5; ctx.strokeStyle = cBal;
    ctx.fillStyle = shade(ctx, 560, 590, alpha(cBal, 0.55)); ctx.beginPath(); ctx.ellipse(PX, 572, 150, 14, 0, Math.PI, 0); ctx.lineTo(PX + 150, 588); ctx.ellipse(PX, 588, 150, 14, 0, 0, Math.PI); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.fillStyle = F.mixColor(alpha(cBal, 0.5), PAL.panel, 0.5); ctx.beginPath(); ctx.ellipse(PX, 572, 150, 14, 0, 0, TAU); ctx.fill(); ctx.stroke();
    const pg = ctx.createLinearGradient(PX - 14, 0, PX + 14, 0); pg.addColorStop(0, F.mixColor(alpha(cBal, 0.6), PAL.panel, 0.2)); pg.addColorStop(0.4, F.mixColor(alpha(cBal, 0.6), PAL.panel, 0.65)); pg.addColorStop(1, F.mixColor(alpha(cBal, 0.8), PAL.ink, 0.2));
    ctx.fillStyle = pg; ctx.beginPath(); ctx.moveTo(PX - 13, 574); ctx.lineTo(PX - 13, PY + 34); ctx.lineTo(PX, PY + 4); ctx.lineTo(PX + 13, PY + 34); ctx.lineTo(PX + 13, 574); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.restore();
    hits.push({ x: PX, y: 360, r: 30, name: 'the pillar of the Gouy balance, with a knife edge at its top' }, { x: PX, y: 578, r: 40, name: 'the base of the balance' });
    /* the field, then the magnets over it */
    fieldLines(ctx, kOn);
    magnet(ctx, -1, cMag, on); magnet(ctx, 1, cMag, on);
    hits.push({ x: GX - FACE - POLE - BODY / 2, y: GY, r: 70, name: 'an electromagnet' + (on ? ', switched on' : ', switched off') }, { x: GX + FACE + POLE + BODY / 2, y: GY, r: 70, name: 'an electromagnet' + (on ? ', switched on' : ', switched off') });
    /* the sample tube on its thread from the left hook, its lower end between the pole faces */
    const tTop = ly + 150, tBot = tTop + 205, tw = 17, liq = tBot - 140;
    line(ctx, lx, ly + 10, lx, tTop - 10, PAL.ink, 2);
    const lc = sample.value === 'o2' ? F.fact(LOX_BLUE) : alpha(PAL.muted, 0.18);
    ctx.save();
    ctx.beginPath(); ctx.moveTo(lx - tw + 3, liq); ctx.lineTo(lx - tw + 3, tBot - tw); ctx.arc(lx, tBot - tw, tw - 3, Math.PI, 0, true); ctx.lineTo(lx + tw - 3, liq); ctx.closePath();
    ctx.fillStyle = lc; ctx.globalAlpha = sample.value === 'o2' ? 0.85 : 1; ctx.fill(); ctx.globalAlpha = 1;
    line(ctx, lx - tw + 4, liq, lx + tw - 4, liq, alpha(PAL.ink, 0.5), 1.5);
    ctx.fillStyle = alpha(cSam, 0.07); ctx.strokeStyle = cSam; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(lx - tw, tTop); ctx.lineTo(lx - tw, tBot - tw); ctx.arc(lx, tBot - tw, tw, Math.PI, 0, true); ctx.lineTo(lx + tw, tTop); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(lx, tTop, tw + 5, 6, 0, 0, TAU); ctx.fillStyle = PAL.panel; ctx.fill(); ctx.stroke();
    ctx.restore();
    hits.push({ x: lx, y: (liq + tBot) / 2, r: 24, name: LIQ[sample.value].name + ', ' + fmt(massOf(sample.value), 2) + ' g' }, { x: lx, y: tTop + 30, r: 24, name: 'the glass sample tube' }, { x: lx, y: (ly + tTop) / 2, r: 14, name: 'the thread from the end of the beam' });
    /* the beam over everything, with a hook curled at each end */
    ctx.save(); ctx.strokeStyle = cBal; ctx.lineCap = 'round';
    ctx.lineWidth = 11; ctx.beginPath(); ctx.moveTo(lx, ly); ctx.lineTo(rx, ry); ctx.stroke();
    ctx.lineWidth = 5; ctx.strokeStyle = F.mixColor(cBal, PAL.panel, 0.55); ctx.beginPath(); ctx.moveTo(lx + 6, ly - 2); ctx.lineTo(rx - 6, ry - 2); ctx.stroke();
    ctx.lineWidth = 4; ctx.strokeStyle = cBal;
    [[lx, ly, -1], [rx, ry, 1]].forEach(([x, y, s]) => { ctx.beginPath(); ctx.arc(x + s * 4, y - 5, 9, s < 0 ? 0.2 : Math.PI - 0.2, s < 0 ? Math.PI + 1.4 : -1.4, s < 0); ctx.stroke(); });
    ctx.restore();
    dot(ctx, PX, PY, PAL.ink, true, 5);
    hits.push({ x: (PX + lx) / 2, y: (PY + ly) / 2, r: 18, name: 'the beam of the balance' }, { x: (PX + rx) / 2, y: (PY + ry) / 2, r: 18, name: 'the beam of the balance' });
    /* the dish of weights from the right hook, on three cords */
    const dy = ry + 196, dw = 96;
    [-dw + 10, 0, dw - 10].forEach((o) => line(ctx, rx, ry + 6, rx + o, dy - (o === 0 ? 14 : 4), PAL.ink, 2));
    ctx.save(); ctx.strokeStyle = cW; ctx.lineWidth = 2.5;
    ctx.fillStyle = shade(ctx, dy - 10, dy + 22, alpha(cW, 0.6));
    ctx.beginPath(); ctx.ellipse(rx, dy, dw, 14, 0, Math.PI, 0); ctx.quadraticCurveTo(rx + dw - 14, dy + 26, rx + dw * 0.55, dy + 26); ctx.lineTo(rx - dw * 0.55, dy + 26); ctx.quadraticCurveTo(rx - dw + 14, dy + 26, rx - dw, dy); ctx.closePath(); ctx.fill(); ctx.stroke();
    /* two weights, each a cylinder with a knob */
    [[-28, 30], [28, 30]].forEach(([o, h]) => {
      const x = rx + o, w = 22;
      ctx.fillStyle = shade(ctx, x - w, x + w, alpha(PAL.muted, 0.7), 0.2);
      const gr = ctx.createLinearGradient(x - w, 0, x + w, 0); gr.addColorStop(0, F.mixColor(PAL.muted, PAL.panel, 0.2)); gr.addColorStop(0.4, F.mixColor(PAL.muted, PAL.panel, 0.75)); gr.addColorStop(1, F.mixColor(PAL.muted, PAL.ink, 0.25));
      ctx.fillStyle = gr; ctx.strokeStyle = cW;
      ctx.beginPath(); ctx.moveTo(x - w, dy - 2); ctx.lineTo(x - w, dy - 2 - h); ctx.ellipse(x, dy - 2 - h, w, 6, 0, Math.PI, 0); ctx.lineTo(x + w, dy - 2); ctx.ellipse(x, dy - 2, w, 6, 0, 0, Math.PI); ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.ellipse(x, dy - 2 - h, w, 6, 0, 0, TAU); ctx.stroke();
      ctx.beginPath(); ctx.rect(x - 7, dy - 2 - h - 12, 14, 10); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.ellipse(x, dy - 2 - h - 16, 11, 5, 0, 0, TAU); ctx.fill(); ctx.stroke();
    });
    ctx.restore();
    hits.push({ x: rx, y: dy - 20, r: 60, name: 'the weights on the dish, ' + fmt(massOf(sample.value), 2) + ' g' });
    /* labels, as the book's: sample, magnetic field, electromagnets, and the weights */
    F.label(ctx, 'sample', lx - tw, liq - 16, { side: 'left', color: cSam, gap: 60 });
    F.label(ctx, 'electromagnets', GX, GY + BH + 54, { side: 'below', color: cMag, gap: 0, leader: false });
    if (kOn > 0.5) F.label(ctx, 'magnetic field', GX + FACE + 18, GY - PH - 100, { side: 'right', color: PAL.ink, gap: 70 });
    F.label(ctx, 'weights', rx + dw, dy - 20, { side: 'right', color: cW, gap: 26 });
    F.label(ctx, 'Gouy balance', PX + 14, 300, { side: 'right', color: cBal, gap: 16, leader: false });
    hits.push({ x: GX, y: GY - PH - 60, r: 60, name: on ? 'the magnetic field between the poles, 0.50 T' : 'the gap between the poles; the field is off' });
    const m = massOf(sample.value), dm = shiftOf(sample.value), nm = sample.value === 'o2' ? 'O₂' : 'N₂';
    headline(ctx, !on ? 'With the electromagnets off, the sample and the weights balance.'
      : dm > 0 ? 'The field pulls the paramagnetic ' + nm + ' down into it, so the sample appears heavier.'
      : 'The field pushes the diamagnetic ' + nm + ' weakly out, so the sample appears slightly lighter.');
    const g = (x) => hue('mass', fmt(x, 4) + '\\ \\text{g}');
    tex(d.readout, on
      ? `\\text{mass of } ${LIQ[sample.value].tex} \\text{ in the field} = ${g(m)} ${dm >= 0 ? '+' : '-'} ${g(Math.abs(dm))} = ${g(m + dm)}`
      : `\\text{mass of } ${LIQ[sample.value].tex} = ${g(m)}`);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 8.28: two waves added point by point. The phase difference walks
   from the book's panel (a) to its panel (b). Faint guides drop from each
   crest of the first wave through the other two, so the reader sees a
   crest meet a crest or a trough. Still.
===================================================================== */
(function () {
  const d = sim('sim-waves', 600);
  const P = ctl(d.controls, { label: '\\Delta\\phi', cls: 'angle', min: 0, max: 180, step: 1, value: 0, unit: '°', dec: 0, fmt: (v) => Math.round(v) + '°', aria: 'phase difference in degrees',
    specials: [{ at: 0, label: 'in phase' }, { at: 180, label: 'out of phase' }] });
  const X0 = 250, X1 = 1290, A = 52, K = 2 * TAU / (X1 - X0), ROWS = [150, 300, 470];
  function wave(ctx, y, f, w, col) {
    ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = w; ctx.lineJoin = 'round'; ctx.beginPath();
    for (let x = X0; x <= X1; x += 3) { const v = y - f(x); x === X0 ? ctx.moveTo(x, v) : ctx.lineTo(x, v); }
    ctx.stroke(); ctx.restore();
  }
  function draw() {
    const { ctx } = begin(d.c);
    const ph = P.v * RAD, amp = 2 * Math.cos(ph / 2);
    const cA = F.ref('wave-a'), cB = F.ref('wave-b'), cS = F.ref('wave-sum');
    ROWS.forEach((y) => line(ctx, X0, y, X1, y, alpha(PAL.ink, 0.25), 2, [10, 10]));
    /* the crests of the first wave, carried down through the second wave and the sum */
    for (let n = 0; n < 2; n++) { const x = X0 + (0.25 + n) * (TAU / K); line(ctx, x, ROWS[0] - A - 8, x, ROWS[2] + 2 * A + 8, alpha(PAL.ink, 0.35), 2, [4, 8]); }
    wave(ctx, ROWS[0], (x) => A * Math.sin(K * (x - X0)), 4, cA);
    wave(ctx, ROWS[1], (x) => A * Math.sin(K * (x - X0) + ph), 4, cB);
    wave(ctx, ROWS[2], (x) => A * (Math.sin(K * (x - X0)) + Math.sin(K * (x - X0) + ph)), 5, cS);
    text(ctx, 'wave 1', 205, ROWS[0], cA, { size: 22, weight: 600, align: 'right' });
    text(ctx, '+', 130, (ROWS[0] + ROWS[1]) / 2, PAL.ink, { size: 26, align: 'center' });
    text(ctx, 'wave 2', 205, ROWS[1], cB, { size: 22, weight: 600, align: 'right' });
    text(ctx, '=', 130, (ROWS[1] + ROWS[2]) / 2 + 30, PAL.ink, { size: 26, align: 'center' });
    text(ctx, 'sum', 205, ROWS[2], cS, { size: 22, weight: 600, align: 'right' });
    const a = fmt(Math.abs(amp), 2);
    headline(ctx, P.v === 0 ? 'In phase, crests line up with crests: constructive interference doubles the amplitude.'
      : P.v === 180 ? 'Out of phase, crests line up with troughs: destructive interference leaves no wave.'
      : P.v < 90 ? 'Mostly in phase, the waves still add to a larger wave.' : P.v > 90 ? 'Mostly out of phase, the waves largely cancel.' : 'A quarter wave apart, the sum is only 1.41 times either wave.');
    tex(d.readout, `\\text{amplitude of the sum} = 2A\\cos\\frac{\\Delta\\phi}{2} = 2A\\cos\\frac{${hue('angle', Math.round(P.v) + '^\\circ')}}{2} = ${a}\\,A`);
  }
  still(d, draw);
})();

/* =====================================================================
   FIGURE 8.29 + 8.30 + 8.31: molecular orbitals as true contour surfaces.
   Ψ = ψ_A ± ψ_B of two hydrogen-like orbitals (1s for the s pair with H₂'s
   74 pm; 2p with nitrogen's Slater exponent and N₂'s 110 pm for the p
   pairs), one contour of |Ψ| found on a grid by marching tetrahedra and lit
   with its analytic normals. The two signs wear F.cat(0) and F.cat(1);
   nodal planes are faint ink. The distance slider brings the atoms in from
   apart, so the reader sees the orbitals merge or a node open, the step the
   book's "combine atomic orbitals" leaves to the imagination. Still; a
   change of pair or phase bends the old surface into the new.
===================================================================== */
(function () {
  const d = sim('sim-mo-shapes');
  const V = F.view3d(d.stage, { h: 560, dist: 12.5, tilt: 0.34, pitch: [-1.25, 1.25] });
  V.setView(-0.5, 0.34);
  const g = V.part(0);
  const T3 = window.THREE, live = !!(T3 && V.scene);
  const BOND = { s: 74, pe: 110, ps: 110 };
  const A0 = 52.92, ZN = 1.95;   /* pm per bohr; the Slater exponent of a nitrogen 2p orbital, per bohr */
  const SC = { s: 1.4, pe: 0.8, ps: 0.8 };   /* scene units per bohr (s) or per 1/ζ (p) */
  const ISO = { s: 0.45, pe: 0.35, ps: 0.35 };
  const pair = F.select(d.controls, { label: '\\text{orbitals}', options: [{ value: 's', label: 'two s' }, { value: 'pe', label: 'two p, end to end' }, { value: 'ps', label: 'two p, side by side' }], value: 's', aria: 'which atomic orbitals combine',
    onInput: (v) => { R.set(BOND[v]); morph(); } });
  const comb = F.choice(d.controls, { label: '\\text{phase}', options: [{ value: 'in', label: 'in phase' }, { value: 'out', label: 'out of phase' }], value: 'in', aria: 'in phase or out of phase', onInput: () => morph() });
  const R = ctl(d.controls, { label: '\\text{distance}', cls: 'length', min: 60, max: 300, step: 1, value: 74, unit: 'pm', dec: 0, aria: 'distance between the nuclei in picometers',
    specials: [{ at: () => BOND[pair.value], label: 'bond length' }] });
  const INFO = {
    sin: { tex: '\\sigma_s', head: 'In phase, two $s$ orbitals merge into the bonding $\\sigma_s$ orbital, its density between the nuclei.' },
    sout: { tex: '\\sigma_s^{*}', head: 'Out of phase, two $s$ orbitals give the antibonding $\\sigma_s^{*}$ orbital, with a node between the nuclei.' },
    pein: { tex: '\\sigma_p', head: 'In phase end to end, two $p$ orbitals give the bonding $\\sigma_p$ orbital, a large lobe between the nuclei.' },
    peout: { tex: '\\sigma_p^{*}', head: 'Out of phase end to end, two $p$ orbitals give the antibonding $\\sigma_p^{*}$ orbital, with a node between the nuclei.' },
    psin: { tex: '\\pi_p', head: 'In phase side by side, two $p$ orbitals give the bonding $\\pi_p$ orbital, above and below a node that holds the axis.' },
    psout: { tex: '\\pi_p^{*}', head: 'Out of phase side by side, two $p$ orbitals give the antibonding $\\pi_p^{*}$ orbital, with two nodes.' },
  };
  /* one atomic orbital at x = c (scene units): its value and gradient at (x, y, z) */
  function ao(kind, c, sgn, p, out) {
    const x = p[0] - c, y = p[1], z = p[2], r = Math.hypot(x, y, z) || 1e-9;
    if (kind === 's') {
      const a = SC.s, f = Math.exp(-r / a), k = -f / (a * r);
      out[0] += sgn * f; out[1] += sgn * k * x; out[2] += sgn * k * y; out[3] += sgn * k * z; return;
    }
    const b = SC.pe, e = Math.exp(1 - r / b), t = kind === 'pe' ? x : y, f = (t / b) * e, k = -f / (b * r);
    out[0] += sgn * f; out[1] += sgn * (k * x + (kind === 'pe' ? e / b : 0)); out[2] += sgn * (k * y + (kind === 'ps' ? e / b : 0)); out[3] += sgn * k * z;
  }
  /* Ψ for a state {pair, comb, R}: the p orbitals end to end point their positive lobes at each other */
  function field(st, p, out) {
    const h = st.Rs / 2, s = st.comb === 'in' ? 1 : -1;
    if (st.pair === 's') { ao('s', -h, 1, p, out); ao('s', h, s, p, out); }
    else if (st.pair === 'pe') { ao('pe', -h, 1, p, out); ao('pe', h, -s, p, out); }
    else { ao('ps', -h, 1, p, out); ao('ps', h, s, p, out); }
  }
  const scenePm = (k, pm) => (k === 's' ? (pm / A0) * SC.s : ((pm / A0) * ZN) * SC.pe);
  const REACH = { s: 2.6, pe: 3.4, ps: 3.4 };
  /* the corners of a cube and its six tetrahedra about the diagonal 0–6 */
  const CO = [[0, 0, 0], [1, 0, 0], [1, 1, 0], [0, 1, 0], [0, 0, 1], [1, 0, 1], [1, 1, 1], [0, 1, 1]];
  const TETS = [[0, 5, 1, 6], [0, 1, 2, 6], [0, 2, 3, 6], [0, 3, 7, 6], [0, 7, 4, 6], [0, 4, 5, 6]];
  /* the contour Ψ = sign × iso of f (blended over two states), as triangles with normals pointing out of the lobe */
  function surfaces(f, iso, box) {
    const [[x0, x1], [y0, y1], [z0, z1]] = box;
    const h = Math.max((x1 - x0) / 72, (y1 - y0) / 46), nx = Math.ceil((x1 - x0) / h), ny = Math.ceil((y1 - y0) / h), nz = Math.ceil((z1 - z0) / h);
    const vals = new Float32Array((nx + 1) * (ny + 1) * (nz + 1)), id = (i, j, k) => (k * (ny + 1) + j) * (nx + 1) + i, tmp = [0, 0, 0, 0];
    for (let k = 0; k <= nz; k++) for (let j = 0; j <= ny; j++) for (let i = 0; i <= nx; i++) { tmp[0] = 0; f([x0 + i * h, y0 + j * h, z0 + k * h], tmp); vals[id(i, j, k)] = tmp[0]; }
    const out = { pos: [[], []], nrm: [[], []] }, v = new Array(8), P = new Array(8), q = [0, 0, 0, 0];
    const vert = (side, a, b, va, vb) => {
      const t = va / (va - vb), p = [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
      q[0] = q[1] = q[2] = q[3] = 0; f(p, q); const s = side === 0 ? -1 : 1, n = Math.hypot(q[1], q[2], q[3]) || 1;
      return [p, [(s * q[1]) / n, (s * q[2]) / n, (s * q[3]) / n]];
    };
    const tri = (side, A, B, Cc) => {
      const e1 = [B[0][0] - A[0][0], B[0][1] - A[0][1], B[0][2] - A[0][2]], e2 = [Cc[0][0] - A[0][0], Cc[0][1] - A[0][1], Cc[0][2] - A[0][2]];
      const cr = [e1[1] * e2[2] - e1[2] * e2[1], e1[2] * e2[0] - e1[0] * e2[2], e1[0] * e2[1] - e1[1] * e2[0]];
      const nn = [A[1][0] + B[1][0] + Cc[1][0], A[1][1] + B[1][1] + Cc[1][1], A[1][2] + B[1][2] + Cc[1][2]];
      const list = cr[0] * nn[0] + cr[1] * nn[1] + cr[2] * nn[2] >= 0 ? [A, B, Cc] : [A, Cc, B];
      list.forEach(([p, n]) => { out.pos[side].push(p[0], p[1], p[2]); out.nrm[side].push(n[0], n[1], n[2]); });
    };
    for (let k = 0; k < nz; k++) for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) {
      let lo = Infinity, hi = -Infinity;
      for (let c = 0; c < 8; c++) { const w = vals[id(i + CO[c][0], j + CO[c][1], k + CO[c][2])]; v[c] = w; if (w < lo) lo = w; if (w > hi) hi = w; }
      const sides = []; if (hi > iso && lo < iso) sides.push(0); if (lo < -iso && hi > -iso) sides.push(1);
      if (!sides.length) continue;
      for (let c = 0; c < 8; c++) P[c] = [x0 + (i + CO[c][0]) * h, y0 + (j + CO[c][1]) * h, z0 + (k + CO[c][2]) * h];
      sides.forEach((side) => {
        const val = (c) => (side === 0 ? v[c] - iso : -v[c] - iso);
        TETS.forEach((T) => {
          const ins = T.filter((c) => val(c) > 0), outs = T.filter((c) => val(c) <= 0);
          const E = (a, b) => vert(side, P[a], P[b], val(a), val(b));
          if (ins.length === 1) tri(side, E(ins[0], outs[0]), E(ins[0], outs[1]), E(ins[0], outs[2]));
          else if (ins.length === 3) tri(side, E(ins[0], outs[0]), E(ins[1], outs[0]), E(ins[2], outs[0]));
          else if (ins.length === 2) {
            const a = E(ins[0], outs[0]), b = E(ins[0], outs[1]), c2 = E(ins[1], outs[1]), e = E(ins[1], outs[0]);
            tri(side, a, b, c2); tri(side, a, c2, e);
          }
        });
      });
    }
    return out;
  }
  const meshes = [null, null], planes = [], nuclei = [];
  let axisLine = null, axisLabel = null, sig = '';
  const tw = F.tween(d, 1);
  let from = { pair: 's', comb: 'in', pm: 74 };
  const now = () => ({ pair: pair.value, comb: comb.value, pm: R.v });
  function morph() { tw.set(0); tw.to(1, 900); }
  function geometry(pos, nrm) {
    const geo = new T3.BufferGeometry();
    geo.setAttribute('position', new T3.Float32BufferAttribute(pos, 3)); geo.setAttribute('normal', new T3.Float32BufferAttribute(nrm, 3));
    geo.computeBoundingSphere(); return geo;
  }
  function plane(axis, a) {
    const s = 3.1, pts = axis === 'x' ? [[0, -s, -s], [0, s, -s], [0, s, s], [0, -s, s]] : [[-s * 1.6, 0, -s], [s * 1.6, 0, -s], [s * 1.6, 0, s], [-s * 1.6, 0, s]];
    const geo = new T3.BufferGeometry(); geo.setAttribute('position', new T3.Float32BufferAttribute(pts.flat(), 3)); geo.setIndex([0, 1, 2, 0, 2, 3]);
    const m = new T3.Mesh(geo, new T3.MeshBasicMaterial({ color: PAL.ink, transparent: true, opacity: 0.1 * a, side: T3.DoubleSide, depthWrite: false })); g.add(m);
    const edge = F.mesh.polyline(g, [...pts, pts[0]], alpha(PAL.ink, 0.45 * a));
    V.pickable(m, axis === 'x' ? 'a node between the nuclei, where Ψ = 0' : 'a node that contains the internuclear axis, where Ψ = 0');
    planes.push(m, edge);
  }
  function build() {
    if (!live) return;
    const k = F.ease.smooth(clamp(tw.v, 0, 1)), to = now();
    const tag = [JSON.stringify(from), JSON.stringify(to), k.toFixed(3), F.cat(0), F.cat(1), PAL.ink, PAL.muted].join('|'); if (tag === sig) return; sig = tag;
    const stA = { pair: from.pair, comb: from.comb, Rs: scenePm(from.pair, to.pm) }, stB = { pair: to.pair, comb: to.comb, Rs: scenePm(to.pair, to.pm) };
    const blend = from.pair !== to.pair || from.comb !== to.comb ? k : 1;
    const tA = [0, 0, 0, 0];
    const f = blend >= 1 ? (p, o) => field(stB, p, o) : (p, o) => { tA[0] = tA[1] = tA[2] = tA[3] = 0; field(stA, p, tA); const b = [0, 0, 0, 0]; field(stB, p, b); for (let i = 0; i < 4; i++) o[i] += (1 - blend) * tA[i] + blend * b[i]; };
    const iso = (1 - blend) * ISO[from.pair] + blend * ISO[to.pair];
    const reach = Math.max(REACH[from.pair], REACH[to.pair]), half = Math.max(stA.Rs, stB.Rs) / 2 + reach;
    const S = surfaces(f, iso, [[-half, half], [-reach, reach], [-reach, reach]]);
    [0, 1].forEach((side) => {
      if (meshes[side]) { g.remove(meshes[side]); meshes[side].geometry.dispose(); meshes[side].material.dispose(); }
      const m = new T3.Mesh(geometry(S.pos[side], S.nrm[side]), new T3.MeshPhongMaterial({ color: side === 0 ? F.cat(0) : F.cat(1), shininess: 40, side: T3.DoubleSide }));
      g.add(m); meshes[side] = m; V.pickable(m, side === 0 ? 'one phase of the wave function, Ψ > 0' : 'the opposite phase, Ψ < 0');
    });
    planes.forEach((m) => { g.remove(m); m.geometry?.dispose(); m.material?.dispose(); }); planes.length = 0;
    const nodeX = to.comb === 'out' ? blend : from.comb === 'out' && from.pair === to.pair ? 1 - blend : 0;
    const nodeY = (to.pair === 'ps' ? blend : 0) + (from.pair === 'ps' ? 1 - blend : 0);
    if (nodeX > 0.05) plane('x', nodeX);
    if (nodeY > 0.05) plane('y', Math.min(1, nodeY));
    nuclei.forEach((m) => { g.remove(m); m.geometry.dispose(); m.material.dispose(); }); nuclei.length = 0;
    [-stB.Rs / 2, stB.Rs / 2].forEach((x) => { const m = F.mesh.sphere(g, [x, 0, 0], 0.075, PAL.ink); m.material.depthTest = false; m.renderOrder = 10; V.pickable(m, 'a nucleus'); nuclei.push(m); });
    if (axisLine) { g.remove(axisLine); axisLine.geometry.dispose(); axisLine.material.dispose(); }
    axisLine = F.mesh.polyline(g, [[-7.4, 0, 0], [7.4, 0, 0]], alpha(PAL.muted, 0.8));
    if (!axisLabel) axisLabel = V.label('internuclear axis', [6.6, 0, 0], g, 16);
    V.invalidate();
  }
  function draw() {
    if (tw.v >= 1) from = now();
    build();
    const st = now(), key = st.pair + st.comb, far = st.pm > 1.7 * BOND[st.pair];
    V.headline(far ? `At ${Math.round(st.pm)} pm the two orbitals barely overlap; each keeps its own shape and phase.` : INFO[key].head);
    tex(d.readout, `\\kPsi = \\kpsi_{A} ${st.comb === 'in' ? '+' : '-'} \\kpsi_{B} \\;\\Rightarrow\\; ${INFO[key].tex}\\ \\text{(${st.comb === 'in' ? 'bonding' : 'antibonding'})}`);
  }
  still(d, draw);
})();

/* ---------- molecular orbital diagrams: the book's schematic layouts ----------
   Heights read off the book's own diagrams (Figures 8.34 to 8.36 for one s
   pair, Figure 8.40 for the second period), larger higher. Without s-p
   mixing (O₂ to Ne₂) σ2px lies below the π2p pair; with it (Li₂ to N₂) the
   two trade places, as Figure 8.37 shows. */
const VAL = { H: 1, He: 2, Li: 1, Be: 2, B: 3, C: 4, N: 5, O: 6, F: 7, Ne: 8 };
function layout(X, withP) {
  if (X === 'H' || X === 'He' || !withP) {
    const n = X === 'H' || X === 'He' ? '1s' : '2s';
    return { atom: [{ id: n, E: 172, deg: 1 }], mo: [
      { id: 's', name: [`σ_{${n}}`], tex: `\\sigma_{${n}}`, E: 70, deg: 1, anti: false, from: n },
      { id: 's_', name: [`σ*_{${n}}`], tex: `\\sigma_{${n}}^{*}`, E: 274, deg: 1, anti: true, from: n }] };
  }
  const mix = ['Li', 'Be', 'B', 'C', 'N'].includes(X);
  const mo = [
    { id: 's', name: ['σ_{2s}'], tex: '\\sigma_{2s}', E: 57, deg: 1, anti: false, from: '2s' },
    { id: 's_', name: ['σ*_{2s}'], tex: '\\sigma_{2s}^{*}', E: 264, deg: 1, anti: true, from: '2s' },
    { id: 'p', name: ['σ_{2px}'], tex: '\\sigma_{2px}', E: mix ? 550 : 445, deg: 1, anti: false, from: '2p' },
    { id: 'pi', name: ['π_{2py}', 'π_{2pz}'], tex: '\\pi_{2py},\\,\\pi_{2pz}', E: mix ? 445 : 550, deg: 2, anti: false, from: '2p' },
    { id: 'pi_', name: ['π*_{2py}', 'π*_{2pz}'], tex: '\\pi_{2py}^{*},\\,\\pi_{2pz}^{*}', E: 725, deg: 2, anti: true, from: '2p' },
    { id: 'p_', name: ['σ*_{2px}'], tex: '\\sigma_{2px}^{*}', E: 830, deg: 1, anti: true, from: '2p' }];
  mo.sort((a, b) => a.E - b.E);
  return { atom: [{ id: '2s', E: 160, deg: 1 }, { id: '2p', E: 638, deg: 3 }], mo };
}
function fill(levels, n) { let left = n; return levels.map((l) => { const k = Math.min(left, 2 * l.deg); left -= k; return k; }); }
/* where the electrons of a level of deg orbitals stand: singly first (Hund's rule), then paired; [orbital, up] in the order they arrive */
function seats(k, deg) { const s = []; for (let i = 0; i < k; i++) s.push([i % deg, i < deg]); return s; }

/* =====================================================================
   FIGURE 8.34 + 8.35 + 8.36 + 8.40: the molecular orbital diagram of the
   chosen species, drawn as the book draws its four: atomic orbitals at the
   sides with their electrons, the molecular orbitals in a shaded column with
   dashed lines to the orbitals they come from, names under the lines. The
   electrons drop in by the Aufbau principle and Hund's rule after a change.
===================================================================== */
(function () {
  const d = sim('sim-mo-fill', 700);
  const SPECIES = [['H', 0], ['H', 1], ['H', -1], ['He', 0], ['Li', 0], ['Be', 0], ['Be', 1], ['Be', -2], ['B', 0], ['C', 0], ['C', -2], ['N', 0], ['N', 1], ['N', 2], ['O', 0], ['O', 1], ['O', 2], ['O', -2], ['F', 0], ['F', 1], ['Ne', 0]];
  const SUP = { 0: '', 1: '⁺', 2: '²⁺', '-1': '⁻', '-2': '²⁻' };
  const TSUP = { 0: '', 1: '^{+}', 2: '^{2+}', '-1': '^{-}', '-2': '^{2-}' };
  const nameOf = ([X, q]) => X + '₂' + SUP[q];
  const arrive = F.tween(d, 1);
  const pick = F.select(d.controls, { label: '\\text{species}', options: SPECIES.map((s, i) => ({ value: String(i), label: nameOf(s) })), value: '6', aria: 'molecule or ion', onInput: () => { arrive.set(0); arrive.to(1, 1600, F.ease.linear); } });
  const XL = 300, XM = 760, XR = 1220, PANEL = [XM - 250, XM + 250], YB = 610, YT = 170;
  const WORDS = ['no', 'one', 'two', 'three', 'four'];
  let hits = []; F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c);
    const [X, q] = SPECIES[+pick.value], n = 2 * VAL[X] - q, per1 = X === 'H' || X === 'He';
    const D = layout(X, !per1 && (['B', 'C', 'N', 'O', 'F', 'Ne'].includes(X) || n > 4));
    const occ = fill(D.mo, n), nl = Math.ceil(n / 2), nr = n - nl, occL = fill(D.atom, nl), occR = fill(D.atom, nr);
    const all = [...D.atom, ...D.mo].map((l) => l.E), lo = Math.min(...all), hi = Math.max(...all);
    const Y = (E) => YB - ((E - lo) / (hi - lo)) * (YB - YT);
    hits = [];
    ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.06); ctx.fillRect(PANEL[0], 92, PANEL[1] - PANEL[0], YB + 50 - 92); ctx.restore();
    eAxis(ctx, 80, YB + 40, 100);
    [[XL, 'Atomic orbitals'], [XM, 'Molecular orbitals'], [XR, 'Atomic orbitals']].forEach(([x, s]) => text(ctx, s, x, 118, PAL.ink, { size: 21, align: 'center' }));
    text(ctx, X, XL, YB + 76, PAL.ink, { size: 23, align: 'center' });
    text(ctx, X + '₂' + SUP[q], XM, YB + 76, PAL.ink, { size: 23, align: 'center' });
    text(ctx, X, XR, YB + 76, PAL.ink, { size: 23, align: 'center' });
    const W = 64, GAP = 14;
    const row = (x, deg) => { const tot = deg * W + (deg - 1) * GAP, x0 = x - tot / 2; return Array.from({ length: deg }, (_, i) => x0 + i * (W + GAP)); };
    /* the atomic orbitals and their electrons, a level's names under its lines */
    const ends = {};
    D.atom.forEach((l, i) => {
      const y = Y(l.E);
      [[XL, occL[i], 'one'], [XR, occR[i], 'the other']].forEach(([x, k, who]) => {
        const xs = row(x, l.deg);
        xs.forEach((xa) => line(ctx, xa, y, xa + W, y, PAL.ink, 6));
        seats(k, l.deg).forEach(([o, up]) => electron(ctx, xs[o] + W / 2 + (k > l.deg && o < k - l.deg ? (up ? -8 : 8) : 0), y, up));
        text(ctx, l.id, x, y + 26, PAL.ink, { size: 22, align: 'center' });
        hits.push({ x, y: y - 10, r: 50, name: 'the ' + l.id + ' orbital' + (l.deg > 1 ? 's' : '') + ' of ' + who + ' ' + X + ' atom, ' + k + ' electron' + (k === 1 ? '' : 's') });
      });
      ends[l.id] = { l: row(XL, l.deg).at(-1) + W, r: row(XR, l.deg)[0], y };
      line(ctx, ends[l.id].l + 4, y, PANEL[0], y, alpha(PAL.ink, 0.55), 2, [8, 6]);
      line(ctx, PANEL[1], y, ends[l.id].r - 4, y, alpha(PAL.ink, 0.55), 2, [8, 6]);
    });
    /* the molecular orbitals: dashed lines from the panel's edge, the lines, the names under them, then the electrons in the order they arrive */
    const k = arrive.v, total = Math.max(1, n); let seen = 0;
    D.mo.forEach((l, i) => {
      const y = Y(l.E), xs = row(XM, l.deg), a = ends[l.from];
      line(ctx, PANEL[0], a.y, xs[0] - 6, y, alpha(PAL.ink, 0.55), 2, [8, 6]);
      line(ctx, xs.at(-1) + W + 6, y, PANEL[1], a.y, alpha(PAL.ink, 0.55), 2, [8, 6]);
      xs.forEach((xa, j) => {
        line(ctx, xa, y, xa + W, y, l.anti ? F.mixColor(PAL.ink, PAL.panel, 0.45) : PAL.ink, 6);
        text(ctx, l.name[j] ?? l.name[0], xa + W / 2, y + 26, PAL.ink, { size: 22, align: 'center' });
      });
      const s = seats(occ[i], l.deg);
      s.forEach(([o, up]) => { const ap = clamp(k * total * 1.15 - seen, 0, 1); seen++; electron(ctx, xs[o] + W / 2 + (occ[i] > l.deg && o < occ[i] - l.deg ? (up ? -8 : 8) : 0), y, up, ap); });
      hits.push({ x: XM, y: y - 10, r: 60, name: 'the ' + l.name.join(', ').replace(/[_{}]/g, '') + (l.deg > 1 ? ' orbitals, ' : ' orbital, ') + (l.anti ? 'antibonding' : 'bonding') + ', ' + occ[i] + ' electron' + (occ[i] === 1 ? '' : 's') });
    });
    let b = 0, ab = 0, unp = 0;
    D.mo.forEach((l, i) => { if (l.anti) ab += occ[i]; else b += occ[i]; const pairs = Math.max(0, occ[i] - l.deg); unp += occ[i] - 2 * pairs; });
    const conf = D.mo.map((l, i) => (occ[i] ? `(${l.tex})^{${occ[i]}}` : '')).join('');
    const bo = (b - ab) / 2, nm = nameOf(SPECIES[+pick.value]);
    headline(ctx, `${nm} is $${conf}$: ` + (unp ? `${WORDS[unp] ?? unp} unpaired electron${unp > 1 ? 's' : ''}, so it is paramagnetic.` : 'every electron paired, so it is diamagnetic.'));
    tex(d.readout, `\\text{bond order in ${X}}_2${TSUP[q]} = \\frac{(${b} - ${ab})}{2} = ${fmt(bo, bo % 1 ? 1 : 0)}`);
    if (bo <= 0) { const s = el('small', null, 'With a bond order of zero, ' + nm + ' does not form.'); d.readout.appendChild(s); }
  }
  still(d, draw);
})();

/* =====================================================================
   FIGURE 8.38: s-p mixing. The slider moves the four σ orbitals from the
   book's left diagram to its right one (heights read off the image); σp
   crosses the π pair on the way. The π pair stands either side of the σ
   lines, so the three never overlap. Where a σ orbital has moved, its
   unmixed place stays as a faint line joined to it by a dotted trace, as
   the book draws the shift. Still.
===================================================================== */
(function () {
  const d = sim('sim-spmix', 660);
  /* the book's heights, unmixed and fully mixed */
  const SIG = { s: [104, 58], s_: [305, 259], p: [422, 579], p_: [792, 826] }, PI = 537, PI_ = 700, AT = { s: 205, p: 625 };
  const CROSS = (PI - SIG.p[0]) / (SIG.p[1] - SIG.p[0]);
  const M = ctl(d.controls, { label: '\\text{s-p mixing}', cls: '', min: 0, max: 1, step: 0.01, value: 0, unit: '', dec: 2, fmt: (v) => Math.round(v * 100) + '%', aria: 'extent of s-p mixing, from none to that of the book\'s right diagram',
    specials: [{ at: CROSS, label: 'σp meets πp' }] });
  const Y = (E) => 640 - E * 0.64;
  const XL = 300, XM = 720, XR = 1140;
  let hits = []; F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c);
    const m = M.v, cS = F.cat(1), ink = PAL.ink;
    const L = [
      { k: 's', n: 'σ_{s}', E: SIG.s[0] + (SIG.s[1] - SIG.s[0]) * m, E0: SIG.s[0], deg: 1, from: 's', c: cS },
      { k: 's_', n: 'σ*_{s}', E: SIG.s_[0] + (SIG.s_[1] - SIG.s_[0]) * m, E0: SIG.s_[0], deg: 1, from: 's', c: cS },
      { k: 'p', n: 'σ_{p}', E: SIG.p[0] + (SIG.p[1] - SIG.p[0]) * m, E0: SIG.p[0], deg: 1, from: 'p', c: cS },
      { k: 'pi', n: 'π_{p}', E: PI, deg: 2, from: 'p', c: ink },
      { k: 'pi_', n: 'π*_{p}', E: PI_, deg: 2, from: 'p', c: ink },
      { k: 'p_', n: 'σ*_{p}', E: SIG.p_[0] + (SIG.p_[1] - SIG.p_[0]) * m, E0: SIG.p_[0], deg: 1, from: 'p', c: cS }];
    eAxis(ctx, 70, 640, 70);
    ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.06); ctx.fillRect(XM - 170, 88, 340, 540); ctx.restore();
    hits = [];
    /* the atomic orbitals of the two atoms */
    Object.entries(AT).forEach(([k, E]) => {
      const deg = k === 'p' ? 3 : 1, w = 50, gap = 12, tot = deg * w + (deg - 1) * gap;
      [XL, XR].forEach((x) => { for (let i = 0; i < deg; i++) line(ctx, x - tot / 2 + i * (w + gap), Y(E), x - tot / 2 + i * (w + gap) + w, Y(E), ink, 6); text(ctx, '2' + k, x, Y(E) + 26, ink, { size: 22, align: 'center' }); hits.push({ x, y: Y(E), r: 50, name: 'the 2' + k + ' atomic orbital' + (deg > 1 ? 's' : '') + ' of one atom' }); });
    });
    /* each MO: σ lines in the middle, the π pair either side of them */
    L.forEach((l) => {
      const y = Y(l.E), xs = l.deg === 1 ? [XM - 32] : [XM - 132, XM + 68], w = 64;
      const left = xs[0], right = xs.at(-1) + w, ax = l.from === 'p' ? 100 : 30;
      line(ctx, XL + ax, Y(AT[l.from]), left - 6, y, alpha(ink, 0.45), 2, [8, 6]);
      line(ctx, right + 6, y, XR - ax, Y(AT[l.from]), alpha(ink, 0.45), 2, [8, 6]);
      if (l.E0 !== undefined && Math.abs(l.E - l.E0) > 6) {
        line(ctx, XM - 32, Y(l.E0), XM + 32, Y(l.E0), alpha(l.c, 0.35), 4, [6, 6]);
        line(ctx, XM, Y(l.E0), XM, y + (l.E > l.E0 ? 4 : -4), alpha(l.c, 0.6), 2, [2, 6]);
      }
      xs.forEach((x) => { line(ctx, x, y, x + w, y, l.c, 6); text(ctx, l.n, x + w / 2, y + 26, l.c, { size: 22, align: 'center', bg: PAL.panel }); });
      hits.push({ x: XM, y, r: 60, name: 'the ' + l.n.replace(/[_{}]/g, '') + ' molecular orbital' + (l.deg > 1 ? 's' : '') + (l.E0 !== undefined && Math.abs(l.E - l.E0) > 6 ? (l.E > l.E0 ? ', raised by the mixing' : ', lowered by the mixing') : '') });
    });
    const sp = L[2].E, at = Math.abs(m - CROSS) < 0.005;
    headline(ctx, m === 0 ? 'Without mixing, $\\sigma_p$ lies below the $\\pi_p$ pair, as in O₂, F₂ and Ne₂.'
      : at ? 'Here $\\sigma_p$ and the $\\pi_p$ pair have the same energy.'
      : sp > PI ? 'With enough s-p mixing, $\\sigma_p$ rises above the $\\pi_p$ pair, as in Li₂ through N₂.'
      : 'Mixing lowers $\\sigma_s$ and $\\sigma_s^{*}$ and raises $\\sigma_p$ and $\\sigma_p^{*}$; $\\sigma_p$ is still below $\\pi_p$.');
    tex(d.readout, at ? '\\sigma_s < \\sigma_s^{*} < \\sigma_p = \\pi_p < \\pi_p^{*} < \\sigma_p^{*}' : sp > PI ? '\\sigma_s < \\sigma_s^{*} < \\pi_p < \\sigma_p < \\pi_p^{*} < \\sigma_p^{*}' : '\\sigma_s < \\sigma_s^{*} < \\sigma_p < \\pi_p < \\pi_p^{*} < \\sigma_p^{*}');
  }
  still(d, draw);
})();

/* =====================================================================
   FIGURE 8.39: bands. N atoms in a row, each with one valence orbital and
   one electron, give N molecular orbitals: N/2 bonding, filled, and N/2
   antibonding, empty. The energies are those of a chain whose bonds
   alternate in strength (1 and β), the simplest model with a band gap;
   the solid sets β, so the gap 2(1 − β) is large in an insulator, moderate
   in a semiconductor and very small in a conductor. As N grows the levels
   crowd into the valence and conduction bands. Still.
===================================================================== */
(function () {
  const d = sim('sim-bands', 640);
  const NS = [['2', 2], ['4', 4], ['8', 8], ['20', 20], ['many', Infinity]];
  const nPick = F.choice(d.controls, { label: 'N', options: NS.map(([v, n]) => ({ value: v, label: n === Infinity ? 'very many' : String(n) })), value: 'many', aria: 'number of atoms' });
  const solid = F.choice(d.controls, { label: '\\text{solid}', options: [{ value: 'ins', label: 'insulator' }, { value: 'semi', label: 'semiconductor' }, { value: 'cond', label: 'conductor' }], value: 'ins', aria: 'kind of solid' });
  const BETA = { ins: 0.3, semi: 0.55, cond: 0.95 }, NAME = { ins: 'an insulator', semi: 'a semiconductor', cond: 'a conductor' }, SIZE = { ins: 'large', semi: 'moderate', cond: 'very small' };
  /* the eigenvalues of the chain's tridiagonal matrix (zero diagonal, bonds 1, β, 1, …), by bisection on the Sturm count */
  function levels(N, b) {
    const off = Array.from({ length: N - 1 }, (_, i) => (i % 2 ? b : 1));
    const below = (x) => { let c = 0, q = -x; if (q < 0) c++; for (let i = 1; i < N; i++) { q = -x - (off[i - 1] * off[i - 1]) / (q === 0 ? 1e-12 : q); if (q < 0) c++; } return c; };
    const out = [];
    for (let k = 0; k < N; k++) { let a = -2.2, z = 2.2; for (let it = 0; it < 50; it++) { const mid = (a + z) / 2; if (below(mid) > k) z = mid; else a = mid; } out.push((a + z) / 2); }
    return out;
  }
  const memo = {};
  const levelsOf = (N, s) => (memo[N + s] ??= levels(N, BETA[s]));
  const MID = 352, SC = 118, Y = (E) => MID - E * SC, XA = 330, X0 = 600, X1 = 900;
  let hits = []; F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c);
    const N = NS.find(([v]) => v === nPick.value)[1], b = solid.mix((s) => BETA[s]);
    const cV = F.ref('valence-band'), cC = F.ref('conduction-band'), cE = C('energy');
    eAxis(ctx, 110, 600, 90);
    hits = [];
    /* the N atomic orbitals, all at one energy, one electron each */
    line(ctx, XA - 70, Y(0), XA + 70, Y(0), PAL.ink, 6);
    text(ctx, N === Infinity ? 'N atomic orbitals' : N + ' atomic orbitals', XA, Y(0) + 28, PAL.ink, { size: 21, align: 'center' });
    text(ctx, 'one electron each', XA, Y(0) + 54, PAL.muted, { size: 18, align: 'center' });
    hits.push({ x: XA, y: Y(0), r: 60, name: 'the valence orbitals of the separate atoms, all at one energy' });
    const top = 1 + b, gap = 1 - b;
    let vt, ct, vb, cb;
    if (N === Infinity) {
      vt = Y(-gap); vb = Y(-top); cb = Y(gap); ct = Y(top);
      ctx.save();
      ctx.fillStyle = alpha(cV, 0.55); ctx.fillRect(X0, vt, X1 - X0, vb - vt); ctx.fillStyle = alpha(cC, 0.18); ctx.fillRect(X0, ct, X1 - X0, cb - ct);
      ctx.lineWidth = 3; ctx.strokeStyle = cV; ctx.strokeRect(X0, vt, X1 - X0, vb - vt); ctx.strokeStyle = cC; ctx.setLineDash([10, 8]); ctx.strokeRect(X0, ct, X1 - X0, cb - ct);
      ctx.restore();
    } else {
      const E = solid.k < 1 ? levelsOf(N, solid.from ?? solid.value).map((e, i) => e + (levelsOf(N, solid.value)[i] - e) * F.ease.smooth(solid.k)) : levelsOf(N, solid.value);
      E.forEach((e, i) => {
        const bond = i < N / 2, y = Y(e), c = bond ? cV : cC;
        line(ctx, X0, y, X1, y, c, N > 8 ? 3 : 5, bond ? undefined : [12, 8]);
        if (N <= 4 && bond) { electron(ctx, (X0 + X1) / 2 - 10, y, true, 1, 26); electron(ctx, (X0 + X1) / 2 + 10, y, false, 1, 26); }
      });
      vt = Y(E[N / 2 - 1]); vb = Y(E[0]); cb = Y(E[N / 2]); ct = Y(E[N - 1]);
    }
    /* dashed lines from the atomic level to the two sets */
    [[vt, vb], [cb, ct]].forEach(([a, z]) => { line(ctx, XA + 74, Y(0), X0 - 6, a, alpha(PAL.ink, 0.45), 2, [8, 6]); if (Math.abs(z - a) > 3) line(ctx, XA + 74, Y(0), X0 - 6, z, alpha(PAL.ink, 0.45), 2, [8, 6]); });
    const many = N === Infinity || N >= 20;
    F.rich(ctx, [[many ? 'conduction band' : 'antibonding orbitals', cC], ' (empty)'], X1 + 26, (ct + cb) / 2, { size: 22 });
    F.rich(ctx, [[many ? 'valence band' : 'bonding orbitals', cV], ' (filled)'], X1 + 26, (vt + vb) / 2, { size: 22 });
    /* the gap: an arrow both ways between the top of the valence set and the foot of the conduction set */
    const gx = X0 + 70;
    if (vt - cb > 26) { arrow(ctx, gx, (vt + cb) / 2, gx, cb + 3, cE, 3); arrow(ctx, gx, (vt + cb) / 2, gx, vt - 3, cE, 3); }
    else { line(ctx, gx, cb, gx, vt, cE, 3); }
    F.label(ctx, many ? 'band gap' : 'gap', gx + 14, (vt + cb) / 2, { side: 'right', color: cE, gap: 4, leader: false });
    hits.push({ x: (X0 + X1) / 2, y: (vt + vb) / 2, r: 70, name: many ? 'the valence band: the bonding orbitals, filled' : 'the bonding orbitals, each with two electrons' }, { x: (X0 + X1) / 2, y: (ct + cb) / 2, r: 70, name: many ? 'the conduction band: the antibonding orbitals, empty' : 'the antibonding orbitals, empty' });
    headline(ctx, N === Infinity ? `In ${NAME[solid.value]} the band gap is ${SIZE[solid.value]}.`
      : N === 2 ? 'Two atoms give one bonding and one antibonding orbital, far apart in energy.'
      : `${N} atoms give ${N / 2} bonding and ${N / 2} antibonding orbitals, each at a slightly different energy.`);
    tex(d.readout, N === Infinity ? '\\frac{N}{2} = \\frac{10^{23}}{2} = 5 \\times 10^{22}\\ \\text{bonding orbitals (filled)} = \\text{antibonding orbitals (empty)}'
      : `\\frac{N}{2} = \\frac{${N}}{2} = ${N / 2}\\ \\text{bonding orbital${N > 2 ? 's' : ''} (filled)} = \\text{antibonding orbital${N > 2 ? 's' : ''} (empty)}`);
  }
  still(d, draw);
})();
};
