/* Figures for section 1.4 Measurements. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['1.4'] = function (root, F) {
const { el, fmt, tex, C, PAL, alpha, ctl, register, begin, line, arrow, dot, text, headline, vbracket } = F;
const sim = (id, H) => F.sim(root, id, H);
function readout(host, main, small) { tex(host, main); if (small) host.appendChild(el('small', null, small)); }

/* ---------- small helpers shared by the figures ---------- */
const commas = (s) => s.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
/* a number to n significant figures, never in exponent form, with commas above a thousand */
const sig = (x, n) => { const s = Math.abs(x).toPrecision(n); return s.includes('e') || Math.abs(x) >= 1000 ? commas(String(Math.round(Number(s)))) : s; };
const sig3 = (x) => sig(x, 3);
/* the significant figures a decimal string carries, for a reading that limits a result */
const sigOf = (s) => s.replace('.', '').replace(/^0+/, '').length;
/* a slider whose value is a name rather than a number: the name replaces the printed value */
function named(controls, o, names) {
  const c = ctl(controls, { ...o, unit: '', dec: 0, onInput: () => { show(); o.onInput?.(); } });
  const val = controls.lastElementChild.querySelector('.ctl-val');
  const show = () => { val.textContent = names[c.v]; };
  show(); return c;
}
/* an isometric cube of edge e (logical units) whose front bottom vertex is (ox, oy): three faces, the top lightest */
const ISO = { c: Math.cos(Math.PI / 6), s: Math.sin(Math.PI / 6) };
const iso = (ox, oy, x, y, z) => [ox + (x - y) * ISO.c, oy - (x + y) * ISO.s - z];
function cube(ctx, ox, oy, e, color, w = 2.5) {
  const P = (x, y, z) => iso(ox, oy, x, y, z);
  const faces = [
    [[0, 0, 0], [e, 0, 0], [e, 0, e], [0, 0, e]],         /* front right */
    [[0, 0, 0], [0, e, 0], [0, e, e], [0, 0, e]],         /* front left */
    [[0, 0, e], [e, 0, e], [e, e, e], [0, e, e]],         /* top */
  ];
  const fills = [alpha(color, 0.45), alpha(color, 0.3), alpha(color, 0.16)];
  ctx.save(); ctx.lineWidth = w; ctx.strokeStyle = color; ctx.lineJoin = 'round';
  faces.forEach((f, i) => { ctx.fillStyle = fills[i]; ctx.beginPath(); f.forEach(([x, y, z], j) => { const [px, py] = P(x, y, z); if (j) ctx.lineTo(px, py); else ctx.moveTo(px, py); }); ctx.closePath(); ctx.fill(); ctx.stroke(); });
  ctx.restore();
}
/* the twelve edges of a box of edge e, hidden ones dashed */
function boxOutline(ctx, ox, oy, e, color) {
  const P = (x, y, z) => iso(ox, oy, x, y, z);
  const seg = (a, b, dash) => { const [x1, y1] = P(...a), [x2, y2] = P(...b); line(ctx, x1, y1, x2, y2, color, 1.5, dash); };
  const hid = [4, 8];
  seg([0, 0, 0], [e, 0, 0]); seg([0, 0, 0], [0, e, 0]); seg([0, 0, 0], [0, 0, e]);
  seg([e, 0, 0], [e, 0, e]); seg([0, e, 0], [0, e, e]); seg([0, 0, e], [e, 0, e]); seg([0, 0, e], [0, e, e]);
  seg([e, 0, e], [e, e, e]); seg([0, e, e], [e, e, e]);
  seg([e, 0, 0], [e, e, 0], hid); seg([0, e, 0], [e, e, 0], hid); seg([e, e, 0], [e, e, e], hid);
}
/* a digital balance: a platform with (x, y) the centre of its top, and a display beneath reading the mass */
function balance(ctx, x, y, w, reading) {
  const cm = C('mass');
  ctx.save(); ctx.fillStyle = PAL.soft; ctx.strokeStyle = cm; ctx.lineWidth = 3;
  ctx.fillRect(x - w / 2, y, w, 14); ctx.strokeRect(x - w / 2, y, w, 14);
  ctx.fillRect(x - w * 0.36, y + 14, w * 0.72, 56); ctx.strokeRect(x - w * 0.36, y + 14, w * 0.72, 56);
  ctx.fillStyle = PAL.panel; ctx.fillRect(x - w * 0.3, y + 26, w * 0.6, 34); ctx.strokeRect(x - w * 0.3, y + 26, w * 0.6, 34);
  ctx.restore();
  text(ctx, reading, x, y + 43, cm, { size: 24, weight: 600, align: 'center' });
}
/* a balance whose platform is drawn in the same projection as the cube on it: (x, y) is the front vertex of the platform, S its side */
function isoBalance(ctx, x, y, S, reading) {
  const cm = C('mass'), P = (px, py, pz) => iso(x, y, px, py, pz);
  const poly = (pts, fill) => { ctx.save(); ctx.fillStyle = fill; ctx.strokeStyle = cm; ctx.lineWidth = 3; ctx.lineJoin = 'round'; ctx.beginPath(); pts.forEach(([px, py], i) => (i ? ctx.lineTo(px, py) : ctx.moveTo(px, py))); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore(); };
  poly([P(0, 0, -14), P(S, 0, -14), P(S, 0, 0), P(0, 0, 0)], alpha(cm, 0.25));
  poly([P(0, 0, -14), P(0, S, -14), P(0, S, 0), P(0, 0, 0)], alpha(cm, 0.18));
  poly([P(0, 0, 0), P(S, 0, 0), P(S, S, 0), P(0, S, 0)], PAL.soft);
  ctx.save(); ctx.fillStyle = PAL.soft; ctx.strokeStyle = cm; ctx.lineWidth = 3;
  ctx.fillRect(x - 150, y + 14, 300, 66); ctx.strokeRect(x - 150, y + 14, 300, 66);
  ctx.fillStyle = PAL.panel; ctx.fillRect(x - 90, y + 26, 180, 40); ctx.strokeRect(x - 90, y + 26, 180, 40); ctx.restore();
  text(ctx, reading, x, y + 46, cm, { size: 24, weight: 600, align: 'center' });
}
/* a wooden rule from x1 to x2 across the top edge y, h tall; ticks and labels are drawn by the caller */
function rule(ctx, x1, x2, y, h) {
  ctx.save(); ctx.fillStyle = PAL.soft; ctx.strokeStyle = PAL.muted; ctx.lineWidth = 2; ctx.fillRect(x1, y, x2 - x1, h); ctx.strokeRect(x1, y, x2 - x1, h); ctx.restore();
}

/* =====================================================================
   FIGURE 1.23: a meter beside a yard, a centimeter beside an inch. A
   metric rule above a yard rule, the chosen length drawn as a bar over
   both, and the book's inset of one inch against 2.54 cm. Still: a length
   answers its slider and nothing here has a clock.
===================================================================== */
(function () {
  const d = sim('sim-length', 600);
  const L = ctl(d.controls, { label: '\\text{length}', cls: '', min: 1, max: 100, step: 1, value: 100, unit: 'cm', dec: 0, aria: 'length in centimeters' });
  const X0 = 150, PX = 11;                       /* 11 logical units per centimeter */
  const X = (cm) => X0 + cm * PX;
  const IN = 2.54, YD = 91.44;
  function draw() {
    const { ctx } = begin(d.c);
    const l = L.v, inches = l / IN, yards = l / YD;
    /* the metric rule, 0 to 100 cm */
    const yM = 190;
    rule(ctx, X(0), X(100), yM, 70);
    for (let c = 0; c <= 100; c++) { const big = c % 10 === 0, mid = c % 5 === 0; line(ctx, X(c), yM, X(c), yM + (big ? 26 : mid ? 18 : 10), PAL.ink, big ? 2 : 1.2); if (big && c) text(ctx, String(c), X(c), yM + 44, PAL.ink, { size: 17, align: 'center' }); }
    text(ctx, 'centimeters', X(100) - 8, yM + 62, PAL.muted, { size: 15, align: 'right' });
    /* the yard rule, 0 to 36 in, at the same scale */
    const yY = 330;
    rule(ctx, X(0), X(YD), yY, 70);
    for (let i = 0; i <= 36; i++) { const ft = i % 12 === 0, six = i % 6 === 0; line(ctx, X(i * IN), yY, X(i * IN), yY + (ft ? 26 : six ? 18 : 10), PAL.ink, ft ? 2 : 1.2); if (six && i) text(ctx, String(i), X(i * IN), yY + 44, PAL.ink, { size: 17, align: 'center' }); }
    for (let f = 1; f <= 3; f++) text(ctx, f + ' ft', X(f * 12 * IN) - 6, yY + 62, PAL.muted, { size: 15, align: 'right' });
    text(ctx, 'inches', X(0) + 8, yY + 62, PAL.muted, { size: 15 });
    /* the ends of the two rules named */
    text(ctx, '1 m', X(100) + 14, yM + 16, PAL.ink, { size: 20, weight: 600 });
    text(ctx, '1 yd', X(YD) + 14, yY + 16, PAL.ink, { size: 20, weight: 600 });
    /* the chosen length as a bar above the metric rule, with drop lines through both rules */
    const yB = 130;
    line(ctx, X(0), yB, X(l), yB, PAL.ink, 7);
    line(ctx, X(0), yB - 12, X(0), yB + 12, PAL.ink, 3); line(ctx, X(l), yB - 12, X(l), yB + 12, PAL.ink, 3);
    line(ctx, X(l), yB + 12, X(l), yY + 70, PAL.ink, 2, [4, 8]);
    text(ctx, l + ' cm', X(l / 2), yB - 26, PAL.ink, { size: 22, weight: 600, align: 'center' });
    text(ctx, fmt(inches, 2) + ' in', X(l) + (l > 90 ? -10 : 10), yY + 88, PAL.ink, { size: 20, weight: 600, align: l > 90 ? 'right' : 'left' });
    /* the inset: one inch against 2.54 cm, magnified ten times */
    const iX0 = 150, K = 110, iy = 470;
    const IX = (cm) => iX0 + cm * K;
    rule(ctx, IX(0), IX(3), iy, 60);
    for (let mm = 0; mm <= 30; mm++) { const c = mm % 10 === 0, h = mm % 5 === 0; line(ctx, IX(mm / 10), iy, IX(mm / 10), iy + (c ? 24 : h ? 16 : 9), PAL.ink, c ? 2 : 1); if (c && mm && mm < 30) text(ctx, mm / 10 + ' cm', IX(mm / 10), iy + 42, PAL.ink, { size: 16, align: 'center' }); }
    line(ctx, IX(0), iy - 22, IX(IN), iy - 22, PAL.ink, 7);
    line(ctx, IX(0), iy - 32, IX(0), iy - 12, PAL.ink, 3); line(ctx, IX(IN), iy - 32, IX(IN), iy - 12, PAL.ink, 3);
    text(ctx, '1 in. = 2.54 cm', IX(1.5), iy + 84, PAL.ink, { size: 20, weight: 600, align: 'center' });
    text(ctx, 'magnified ten times', IX(3) + 16, iy + 30, PAL.muted, { size: 16 });
    /* the comparison the book prints under its rules */
    text(ctx, '1 m = 1.094 yd = 39.37 in.', 1300, iy + 30, PAL.ink, { size: 22, weight: 600, align: 'right' });
    text(ctx, 'A meter is about 3 inches longer than a yard.', 1300, iy + 62, PAL.muted, { size: 17, align: 'right' });
    headline(ctx, l + ' cm is ' + fmt(l / 100, 2) + ' m, which is ' + fmt(yards, 3) + ' yd or ' + fmt(inches, 2) + ' in.');
    readout(d.readout, `${l}\\ \\text{cm} = ${fmt(l / 100, 2)}\\ \\text{m} = ${fmt(yards, 3)}\\ \\text{yd} = ${fmt(inches, 2)}\\ \\text{in.}`,
      l === 100 ? 'One meter is about 39.37 inches or 1.094 yards, so a meter is about 3 inches longer than a yard.' : 'Every centimeter is 0.3937 inch, since 2.54 cm is exactly one inch.');
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 1.25: the cubic meter, the liter and the milliliter nested. A
   cube of the chosen edge stands inside the outline of the cubic meter,
   and beside it the same cube is magnified with the cubic centimeter and
   the dime for comparison. Still: a cube answers its edge slider.
===================================================================== */
(function () {
  const d = sim('sim-volume', 640);
  const A = ctl(d.controls, { label: '\\text{edge } a', cls: '', min: 1, max: 100, step: 1, value: 10, unit: 'cm', dec: 0, aria: 'edge of the cube in centimeters' });
  const cv = () => C('volume');
  function draw() {
    const { ctx } = begin(d.c);
    const a = A.v, V = a * a * a;
    /* the cubic meter and the cube inside it, to scale */
    const ox = 330, oy = 560, K = 210;
    boxOutline(ctx, ox, oy, K, PAL.muted);
    const [bxl, byl] = iso(ox, oy, K, 0, 0); text(ctx, '1 m³', bxl + 8, byl + 26, PAL.muted, { size: 20, weight: 600 });
    const e = (K * a) / 100;
    if (e >= 4) cube(ctx, ox, oy, e, cv()); else dot(ctx, ox, oy, cv(), true, 5);
    if (a < 100) { const [lx, ly] = iso(ox, oy, e, 0, e / 2); text(ctx, a + ' cm', lx + 16, ly + 4, cv(), { size: 18, weight: 600, bg: alpha(PAL.panel, 0.85) }); }
    text(ctx, 'to scale inside the cubic meter', 330, 618, PAL.muted, { size: 16, align: 'center' });
    /* the same cube magnified, with the cubic centimeter and the dime at the same magnification */
    const k = 220 / Math.max(a, 6), E = a * k, mx = 840, my = 430;
    cube(ctx, mx, my, E, cv());
    const [ax, ay] = iso(mx, my, E, 0, E / 2); text(ctx, 'a = ' + a + ' cm', ax + 14, ay, cv(), { size: 20, weight: 600 });
    if (a > 1) {
      const sx = mx + E * ISO.c + 110, sy = my - 30;
      if (k >= 5) cube(ctx, sx, sy, k, PAL.ink, 2); else dot(ctx, sx, sy, PAL.ink, true, 4);
      text(ctx, '1 cm³ = 1 mL', sx, sy + 40, PAL.ink, { size: 17, align: 'center' });
      const dx = sx + 130, r = (1.8 * k) / 2;
      ctx.save(); ctx.fillStyle = PAL.soft; ctx.strokeStyle = PAL.muted; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(dx, sy - r, Math.max(r, 3), 0, Math.PI * 2); ctx.fill(); ctx.stroke(); ctx.restore();
      text(ctx, '1.8 cm dime', dx, sy + 40, PAL.ink, { size: 17, align: 'center' });
    } else text(ctx, 'this is the cubic centimeter', mx + E * ISO.c + 40, my - 60, PAL.ink, { size: 17 });
    text(ctx, 'magnified ' + fmt(k / (K / 100), 1) + ' times', 1000, 618, PAL.muted, { size: 16, align: 'center' });
    /* the volume in the units the book names */
    const L = V / 1000, Ls = fmt(L, L === Math.round(L) ? 0 : 3);
    const words = a === 100 ? '1,000,000 cm³, which is 1,000 L or one cubic meter' : L >= 1 ? commas(String(V)) + ' cm³, which is ' + commas(String(V)) + ' mL or ' + Ls + ' L' : V + ' cm³, which is ' + V + ' mL';
    headline(ctx, 'A cube ' + a + ' cm on an edge holds ' + words + '.');
    const lit = L >= 1 ? ` = ${Ls}\\ \\text{L}` : '', cub = a === 100 ? ` = 1\\ \\text{m}^3` : '';
    readout(d.readout, `\\kV = a^3 = (${a}\\ \\text{cm})^3 = ${commas(String(V))}\\ \\text{cm}^3 = ${commas(String(V))}\\ \\text{mL}${lit}${cub}`,
      a === 10 ? 'A cube one decimeter on an edge is one cubic decimeter, the volume the book calls a liter.' : a === 100 ? 'The box holds a cubic meter, which is 1,000 liters or a million milliliters.' : 'Doubling the edge multiplies the volume by eight, since the volume is the edge cubed.');
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   SIM: density from a cube on a balance. The material is one of the seven
   solids of Table 1.4, the edge sets the volume, the balance reads the
   mass, and the readout divides. Beside it the seven densities as bars.
   Still: the picture answers its sliders.
===================================================================== */
(function () {
  const d = sim('sim-density', 540);
  const MATS = [['ice', 0.92], ['oak', 0.75], ['iron', 7.87], ['copper', 8.96], ['silver', 10.5], ['lead', 11.34], ['gold', 19.3]];
  const M = named(d.controls, { label: '\\text{material}', cls: '', min: 0, max: MATS.length - 1, step: 1, value: 5, aria: 'material of the cube' }, MATS.map((m) => m[0]));
  const A = ctl(d.controls, { label: '\\text{edge } a', cls: '', min: 0.5, max: 3, step: 0.01, value: 2, unit: 'cm', dec: 2, aria: 'edge of the cube in centimeters' });
  function draw() {
    const { ctx } = begin(d.c);
    const [name, rho] = MATS[M.v], a = A.v, V = a * a * a, m = rho * V, dens = m / V;
    const cm = C('mass'), cvol = C('volume');
    /* the cube on the balance */
    const bx = 330, by = 400, e = a * 60, S = 220;
    isoBalance(ctx, bx, by, S, sig3(m) + ' g');
    const [cx0, cy0] = iso(bx, by, (S - e) / 2, (S - e) / 2, 0);
    cube(ctx, cx0, cy0, e, cvol);
    const [lx, ly] = iso(cx0, cy0, e, 0, e / 2); text(ctx, 'a = ' + fmt(a, 2) + ' cm', lx + 16, ly, PAL.ink, { size: 20, weight: 600 });
    text(ctx, name, bx, by + 106, PAL.ink, { size: 22, weight: 600, align: 'center' });
    text(ctx, 'V = a³ = ' + sig3(V) + ' cm³', bx, by + 136, cvol, { size: 20, weight: 600, align: 'center' });
    /* the seven densities of Table 1.4, the chosen one filled */
    const gl = 760, gr = 1320, gt = 110, gb = 400, Y = (v) => gb - ((gb - gt) * v) / 20, bw = (gr - gl) / MATS.length;
    for (let v = 0; v <= 20; v += 5) { if (v) line(ctx, gl, Y(v), gr, Y(v), PAL.rule, 1.5); text(ctx, String(v), gl - 12, Y(v), PAL.muted, { size: 17, align: 'right' }); }
    line(ctx, gl, gt, gl, gb, PAL.muted, 2); line(ctx, gl, gb, gr, gb, PAL.muted, 2);
    text(ctx, 'density (g/cm³)', gl, gt - 24, PAL.ink, { size: 20, weight: 600 });
    MATS.forEach(([n, r], i) => {
      const x = gl + bw * (i + 0.5), on = i === M.v;
      ctx.save(); ctx.fillStyle = on ? PAL.ink : alpha(PAL.ink, 0.18); ctx.fillRect(x - bw * 0.3, Y(r), bw * 0.6, gb - Y(r)); ctx.restore();
      text(ctx, n, x, gb + 24, on ? PAL.ink : PAL.muted, { size: 17, align: 'center', weight: on ? 600 : 400 });
      text(ctx, sig3(r), x, Y(r) - 16, on ? PAL.ink : PAL.muted, { size: 15, align: 'center' });
    });
    text(ctx, 'the solids of Table 1.4', gr, gb + 52, PAL.muted, { size: 16, align: 'right' });
    headline(ctx, 'A ' + name + ' cube ' + fmt(a, 2) + ' cm on an edge has a volume of ' + sig3(V) + ' cm³ and a mass of ' + sig3(m) + ' g, so its density is ' + sig3(dens) + ' g/cm³.');
    const gold = 19.3 * V, other = name === 'gold' ? 'A lead cube of the same size would weigh only ' + sig3(11.34 * V) + ' g, which is why a lead-filled brick cannot pass for gold.' : 'A gold cube of the same size would weigh ' + sig3(gold) + ' g, since the volume is the same and the density is ' + sig3(19.3 / rho) + ' times as great.';
    readout(d.readout, `\\text{density} = \\frac{\\km}{\\kV} = \\frac{\\htmlClass{kv-mass}{${sig3(m)}\\ \\text{g}}}{\\htmlClass{kv-volume}{${sig3(V)}\\ \\text{cm}^3}} = ${sig3(dens)}\\ \\text{g/cm}^3`, other);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   SIM: the volume of a block by displacement of water, and its density.
   The block is weighed on the balance, then held under the water in the
   graduated cylinder; the water rises by the block's volume. Still: the
   levels answer the sliders.
===================================================================== */
(function () {
  const d = sim('sim-displacement', 640);
  const MATS = [['iron', 7.87], ['wood', 0.65], ['foam', 0.230], ['unknown', 3.26], ['copper', 8.96], ['lead', 11.34], ['gold', 19.3]];
  const M = named(d.controls, { label: '\\text{material}', cls: '', min: 0, max: MATS.length - 1, step: 1, value: 0, aria: 'material of the block' }, MATS.map((m) => m[0]));
  const VB = ctl(d.controls, { label: '\\kV', cls: 'volume', min: 1, max: 20, step: 0.1, value: 4, unit: 'mL', dec: 1, aria: 'volume of the block' });
  const V1 = ctl(d.controls, { label: 'V_1', cls: 'volume', min: 10, max: 40, step: 0.1, value: 25.5, unit: 'mL', dec: 1, aria: 'water in the cylinder before the block' });
  function draw() {
    const { ctx } = begin(d.c);
    const [name, rho] = MATS[M.v], V = VB.v, v1 = V1.v, v2 = v1 + V, m = rho * V, n = sigOf(fmt(V, 1)), dens = sig(m / V, n);
    const cm = C('mass'), cvol = C('volume'), floats = rho < 1;
    /* the block on the balance: a rectangle whose area follows the volume */
    const bx = 300, by = 380, side = 26 * Math.cbrt(V), bw = side * 1.6, bh = side * 0.9;
    balance(ctx, bx, by, 300, fmt(m, 2) + ' g');
    ctx.save(); ctx.fillStyle = alpha(cvol, 0.3); ctx.strokeStyle = cvol; ctx.lineWidth = 3; ctx.fillRect(bx - bw / 2, by - bh, bw, bh); ctx.strokeRect(bx - bw / 2, by - bh, bw, bh); ctx.restore();
    text(ctx, name + ' block', bx, by - bh - 24, PAL.ink, { size: 22, weight: 600, align: 'center' });
    text(ctx, 'weighed first, on the balance', bx, by + 100, PAL.muted, { size: 17, align: 'center' });
    /* the graduated cylinder, 0 to 60 mL */
    const cl = 900, cr = 1040, ct = 110, cb = 580, Y = (mL) => cb - ((cb - ct) * mL) / 60;
    ctx.save(); ctx.fillStyle = alpha(cvol, 0.22); ctx.fillRect(cl, Y(v2), cr - cl, cb - Y(v2)); ctx.restore();
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(cl, ct - 10); ctx.lineTo(cl, cb); ctx.lineTo(cr, cb); ctx.lineTo(cr, ct - 10); ctx.stroke(); ctx.restore();
    for (let mL = 0; mL <= 60; mL++) { const big = mL % 10 === 0, mid = mL % 5 === 0; line(ctx, cl, Y(mL), cl + (big ? 26 : mid ? 18 : 10), Y(mL), PAL.ink, big ? 2 : 1); if (big) text(ctx, String(mL), cl - 12, Y(mL), PAL.muted, { size: 16, align: 'right' }); }
    text(ctx, 'mL', cl - 12, ct - 26, PAL.muted, { size: 16, align: 'right' });
    /* the block under the water, held by a rod when it would float, and the two levels */
    const bw2 = 90, bh2 = ((cb - ct) / 60) * V * 0.72, byy = cb - 10 - bh2, bxx = (cl + cr) / 2 - bw2 / 2;
    ctx.save(); ctx.fillStyle = alpha(cvol, 0.35); ctx.strokeStyle = cvol; ctx.lineWidth = 2.5; ctx.fillRect(bxx, byy, bw2, bh2); ctx.strokeRect(bxx, byy, bw2, bh2); ctx.restore();
    if (floats) { line(ctx, (cl + cr) / 2, ct - 40, (cl + cr) / 2, byy, PAL.ink, 3); text(ctx, 'held under', (cl + cr) / 2 + 12, ct - 30, PAL.muted, { size: 16 }); }
    line(ctx, cl, Y(v1), cr + 40, Y(v1), cvol, 2.5, [10, 10]);
    line(ctx, cl, Y(v2), cr + 40, Y(v2), cvol, 3);
    text(ctx, 'before, V₁ = ' + fmt(v1, 1) + ' mL', cr + 150, Y(v1) + (V < 3 ? 22 : 0), cvol, { size: 18, weight: 600 });
    text(ctx, 'after, V₂ = ' + fmt(v2, 1) + ' mL', cr + 150, Y(v2) - (V < 3 ? 22 : 0), cvol, { size: 18, weight: 600 });
    vbracket(ctx, cr + 60, Y(v2), Y(v1), cvol, '', 1);
    text(ctx, 'rise = ' + fmt(V, 1) + ' mL', cr + 60, Y(v2) - (V < 3 ? 48 : 26), cvol, { size: 18, weight: 600, align: 'center' });
    text(ctx, 'then lowered into the cylinder', (cl + cr) / 2 + 60, cb + 40, PAL.muted, { size: 17, align: 'center' });
    headline(ctx, 'The water rises from ' + fmt(v1, 1) + ' mL to ' + fmt(v2, 1) + ' mL, so the ' + name + ' block has a volume of ' + fmt(V, 1) + ' mL; it weighs ' + fmt(m, 2) + ' g, so its density is ' + dens + ' g/mL.');
    readout(d.readout, `\\kV = ${fmt(v2, 1)}\\ \\text{mL} - ${fmt(v1, 1)}\\ \\text{mL} = \\htmlClass{kv-volume}{${fmt(V, 1)}\\ \\text{mL}} \\qquad \\text{density} = \\frac{\\km}{\\kV} = \\frac{\\htmlClass{kv-mass}{${fmt(m, 2)}\\ \\text{g}}}{\\htmlClass{kv-volume}{${fmt(V, 1)}\\ \\text{mL}}} = ${dens}\\ \\text{g/mL}`,
      floats ? 'A block less dense than water floats, so it is held under the surface until it is fully submerged; the water then rises by its whole volume.' : 'The block sinks, and the water rises by exactly the volume of the block, whatever its shape.');
  }
  register(d.fig, { update: () => {}, draw });
})();
};
