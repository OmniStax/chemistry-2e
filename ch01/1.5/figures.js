/* Figures for section 1.5 Measurement Uncertainty, Accuracy, and Precision. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['1.5'] = function (root, F) {
const { el, fmt, tex, C, PAL, alpha, ctl, register, begin, line, arrow, dot, text, headline, FONT } = F;
const sim = (id, H) => F.sim(root, id, H);
function readout(host, main, small) { tex(host, main); if (small) host.appendChild(el('small', null, small)); }
/* every figure of this section is a still picture: it answers its sliders, or nothing at all, and has no clock */
const still = (d, draw) => register(d.fig, { update: () => {}, draw });
const TAU = 2 * Math.PI;

/* ---------- lettering helpers ---------- */
/* the width of a string set at a size and weight */
function widthOf(ctx, s, size, weight = 600) { ctx.save(); ctx.font = `${weight} ${size}px ${FONT}`; const w = ctx.measureText(s).width; ctx.restore(); return w; }
/* a string drawn one character at a time from x, each in the colour colorOf(index, char) gives; returns the centre and edges of every character */
function chars(ctx, s, x, y, size, colorOf) {
  ctx.save(); ctx.font = `600 ${size}px ${FONT}`; ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
  const out = []; let cx = x;
  for (const ch of s) { const w = ctx.measureText(ch).width; ctx.fillStyle = colorOf(out.length, ch); ctx.fillText(ch, cx, y); out.push({ ch, x: cx + w / 2, l: cx, r: cx + w }); cx += w; }
  ctx.restore(); return out;
}
/* the same, centred on cx */
const charsCentred = (ctx, s, cx, y, size, colorOf) => chars(ctx, s, cx - widthOf(ctx, s, size) / 2, y, size, colorOf);
/* a bracket under a run of characters with its label beneath */
function ubracket(ctx, x1, x2, y, color, label, size = 20) {
  ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x1, y - 10); ctx.lineTo(x1, y); ctx.lineTo(x2, y); ctx.lineTo(x2, y - 10); ctx.stroke(); ctx.restore();
  if (label) text(ctx, label, (x1 + x2) / 2, y + 22, color, { align: 'center', weight: 600, size });
}
/* a tag hanging from a character: a short line down to a word */
function tag(ctx, cx, y1, y2, label, color) { line(ctx, cx, y1, cx, y2 - 14, color, 2); text(ctx, label, cx, y2, color, { align: 'center', size: 20, weight: 600 }); }
/* a note in the small size, centred */
const note = (ctx, s, x, y, color = PAL.muted) => text(ctx, s, x, y, color, { align: 'center', size: 19 });

/* ---------- the graduated cylinder, drawn in this file ---------- */
/* a cylinder standing on (cx, base), w wide, reading 0..vmax mL over h units of height; returns the scale Y(v) */
function cylinder(ctx, cx, base, w, h, vmax, labelEvery = 5) {
  const l = cx - w / 2, r = cx + w / 2, Y = (v) => base - (v / vmax) * h, top = Y(vmax) - 30;
  ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.beginPath();
  ctx.moveTo(l, top); ctx.lineTo(l, base); ctx.lineTo(r, base); ctx.lineTo(r, top); ctx.stroke();
  ctx.fillStyle = PAL.soft; ctx.fillRect(l - 30, base, w + 60, 14); ctx.strokeRect(l - 30, base, w + 60, 14); ctx.restore();
  for (let v = 0; v <= vmax; v++) {
    const major = v % labelEvery === 0; line(ctx, l, Y(v), l + (major ? 26 : 14), Y(v), PAL.muted, major ? 2.5 : 1.5);
    if (major && v > 0) text(ctx, String(v), l - 12, Y(v), PAL.muted, { size: 17, align: 'right' });
  }
  text(ctx, 'mL', l - 12, Y(vmax) - 26, PAL.muted, { size: 17, align: 'right' });
  return Y;
}
/* the liquid in a cylinder up to the reading v, its meniscus concave with its lowest point at exactly Y(v) */
function liquid(ctx, cx, base, w, Y, v, color) {
  const l = cx - w / 2 + 1.5, r = cx + w / 2 - 1.5, y = Y(v), lift = 10;
  ctx.save(); ctx.fillStyle = alpha(color, 0.22); ctx.beginPath();
  ctx.moveTo(l, base); ctx.lineTo(r, base); ctx.lineTo(r, y - lift); ctx.quadraticCurveTo(cx, y + lift, l, y - lift); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = color; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(r, y - lift); ctx.quadraticCurveTo(cx, y + lift, l, y - lift); ctx.stroke(); ctx.restore();
}
/* the two-reading scene of a displacement figure: the cylinder before and after an object goes in */
function displacement(d, before, after, mass, object, what) {
  const VMAX = 25, W = 110, BASE = 470, HT = 300;
  function draw() {
    const { ctx } = begin(d.c);
    const cv = C('volume'), cm = C('mass');
    [[380, before, false], [780, after, true]].forEach(([cx, v, sunk]) => {
      const Y = cylinder(ctx, cx, BASE, W, HT, VMAX);
      liquid(ctx, cx, BASE, W, Y, v, cv);
      if (sunk) object(ctx, cx, BASE - 40, 1);
      line(ctx, cx + W / 2, Y(v), cx + W / 2 + 40, Y(v), cv, 2, [4, 8]);
      text(ctx, fmt(v, 1) + ' mL', cx + W / 2 + 48, Y(v), cv, { size: 24, weight: 600 });
      note(ctx, sunk ? 'after' : 'before', cx, BASE + 44);
    });
    object(ctx, 640, 170, 1); text(ctx, fmt(mass, 3) + ' g', 640, 266, cm, { size: 24, weight: 600, align: 'center' });
    arrow(ctx, 660, 290, 735, 385, PAL.muted, 3);
    text(ctx, 'volume of the ' + what, 1160, 200, PAL.ink, { size: 22, weight: 600, align: 'center' });
    text(ctx, fmt(after, 1) + ' mL − ' + fmt(before, 1) + ' mL = ' + fmt(after - before, 1) + ' mL', 1160, 240, cv, { size: 24, weight: 600, align: 'center' });
    text(ctx, 'mass of the ' + what, 1160, 320, PAL.ink, { size: 22, weight: 600, align: 'center' });
    text(ctx, fmt(mass, 3) + ' g', 1160, 360, cm, { size: 24, weight: 600, align: 'center' });
    headline(ctx, 'the water rises from ' + fmt(before, 1) + ' mL to ' + fmt(after, 1) + ' mL when the ' + fmt(mass, 3) + '-g ' + what + ' is submerged');
    readout(d.readout, `\\kV = ${fmt(after, 1)}\\ \\text{mL} - ${fmt(before, 1)}\\ \\text{mL} = ${fmt(after - before, 1)}\\ \\text{mL}`,
      'The rise of the water is the volume of the ' + what + ', read to the nearest 0.1 mL as the rule for subtraction allows; the density is its mass divided by this volume.');
  }
  still(d, draw);
}
/* a piece of rebar, a ribbed rod, centred on (x, y) */
function rebar(ctx, x, y, s = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = PAL.muted; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.roundRect(-14, -70, 28, 140, 6); ctx.fill(); ctx.stroke();
  ctx.strokeStyle = PAL.panel; ctx.beginPath(); for (let k = -55; k <= 55; k += 18) { ctx.moveTo(-12, k - 4); ctx.lineTo(12, k + 4); } ctx.stroke(); ctx.restore();
}
/* an irregular nugget centred on (x, y) */
function nugget(ctx, x, y, s = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = PAL.muted; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2; ctx.beginPath();
  ctx.moveTo(-34, 6); ctx.lineTo(-22, -22); ctx.lineTo(4, -30); ctx.lineTo(30, -14); ctx.lineTo(36, 10); ctx.lineTo(16, 28); ctx.lineTo(-12, 26); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore();
}

/* =====================================================================
   FIGURE 1.26: the graduated cylinder and its meniscus. Still: the picture
   answers the liquid level and the digit the reader estimates.
===================================================================== */
(function () {
  const d = sim('sim-meniscus', 620);
  const V = ctl(d.controls, { label: '\\kV', cls: 'volume', min: 5, max: 24.9, step: 0.02, value: 21.62, unit: 'mL', dec: 2, aria: 'liquid volume' });
  const D = ctl(d.controls, { label: '\\text{tenths digit}', cls: '', min: 0, max: 9, step: 1, value: 6, unit: '', dec: 0, aria: 'the tenths digit you estimate' });
  const VMAX = 25, W = 120, BASE = 540, HT = 400, CX = 330;
  function draw() {
    const { ctx } = begin(d.c);
    const cv = C('volume'), v = V.v, whole = Math.floor(v + 1e-9), frac = v - whole, digit = D.v, reading = whole + digit / 10;
    /* the cylinder and its liquid */
    const Y = cylinder(ctx, CX, BASE, W, HT, VMAX);
    liquid(ctx, CX, BASE, W, Y, v, cv);
    /* the magnifier on the two marks the meniscus lies between */
    const MX = 800, MY = 330, MR = 200, PER = 190;   /* units per mL inside the glass */
    const mid = whole + 0.5, my = (u) => MY + (mid - u) * PER;
    line(ctx, CX + W / 2, Y(whole + 1), MX - MR + 6, MY - 70, PAL.rule, 2); line(ctx, CX + W / 2, Y(whole), MX - MR + 6, MY + 70, PAL.rule, 2);
    ctx.save(); ctx.beginPath(); ctx.arc(MX, MY, MR, 0, TAU); ctx.fillStyle = PAL.panel; ctx.fill(); ctx.clip();
    const gl = MX - 150, gr = MX + 150, lift = 24;
    ctx.fillStyle = alpha(cv, 0.22); ctx.beginPath(); ctx.moveTo(gl, MY + MR); ctx.lineTo(gr, MY + MR); ctx.lineTo(gr, my(v) - lift); ctx.quadraticCurveTo(MX, my(v) + lift, gl, my(v) - lift); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = cv; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(gr, my(v) - lift); ctx.quadraticCurveTo(MX, my(v) + lift, gl, my(v) - lift); ctx.stroke();
    line(ctx, gl, MY - MR, gl, MY + MR, PAL.ink, 3); line(ctx, gr, MY - MR, gr, MY + MR, PAL.ink, 3);
    for (let k = -1; k <= 2; k++) { const u = whole + k; if (u < 0 || u > VMAX) continue; line(ctx, gl, my(u), gl + 44, my(u), PAL.muted, 3); text(ctx, u + ' mL', gl + 54, my(u), PAL.ink, { size: 20, weight: 600 }); for (let t = 1; t < 10; t++) line(ctx, gl, my(u + t / 10), gl + 14, my(u + t / 10), PAL.rule, 1.5); }
    line(ctx, gl, my(reading), gr, my(reading), PAL.ink, 2.5, [8, 8]);
    text(ctx, 'your reading ' + fmt(reading, 1) + ' mL', gr - 8, my(reading) - 18, PAL.ink, { size: 18, weight: 600, align: 'right' });
    ctx.restore();
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(MX, MY, MR, 0, TAU); ctx.stroke(); ctx.restore();
    line(ctx, MX + MR * 0.72, MY + MR * 0.72, MX + MR * 0.72 + 70, MY + MR * 0.72 + 70, PAL.ink, 12);
    /* the reading written with its certain and estimated digits */
    const s = fmt(reading, 1), cs = charsCentred(ctx, s, 1190, 300, 96, (i) => (i === s.length - 1 ? cv : PAL.ink));
    text(ctx, 'mL', cs[cs.length - 1].r + 14, 312, PAL.ink, { size: 36, weight: 600 });
    ubracket(ctx, cs[0].l + 4, cs[s.length - 3].r - 4, 372, PAL.ink, 'certain');
    ubracket(ctx, cs[s.length - 1].l + 4, cs[s.length - 1].r - 4, 372, cv, 'estimated');
    note(ctx, '1-mL divisions: read to the nearest 0.1 mL', 1190, 460);
    note(ctx, 'no hundredths digit can be estimated', 1190, 490);
    /* the headline judges the reader's digit against where the meniscus lies */
    const ok = Math.abs(digit / 10 - frac) <= 0.15 + 1e-9;
    const near = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].filter((k) => Math.abs(k / 10 - frac) <= 0.15 + 1e-9);
    const list = near.length === 1 ? String(near[0]) : near.slice(0, -1).join(', ') + ' or ' + near[near.length - 1];
    const between = 'the meniscus lies between the ' + whole + ' and ' + (whole + 1) + ' mL marks';
    const where = frac < 0.35 ? ', nearer the ' + whole : frac > 0.65 ? ', nearer the ' + (whole + 1) : ', about midway';
    headline(ctx, ok ? between + '; a tenths digit of ' + digit + ' is reasonable, so the reading is ' + fmt(reading, 1) + ' mL'
      : between + where + '; a tenths digit of ' + list + ' would be more reasonable than ' + digit);
    readout(d.readout, `\\kV = ${fmt(reading, 1)}\\ \\text{mL}`,
      'The ' + s.slice(0, -2).split('').join(' and the ') + (whole >= 10 ? ' are' : ' is') + ' certain, since the meniscus clearly lies between the ' + whole + ' and ' + (whole + 1) + ' mL marks; the ' + digit + ' is an estimate, and the scale permits no digit beyond it.');
  }
  still(d, draw);
})();

/* =====================================================================
   The five significant-figure diagrams and the column sums: faithful still
   redrawings of the book's inline images, with no sliders.
===================================================================== */
(function () {
  const d = sim('fig-zeros', 320);
  function draw() {
    const { ctx } = begin(d.c);
    const a = charsCentred(ctx, '3090', 380, 130, 88, () => PAL.ink);
    tag(ctx, a[1].x, 178, 236, 'captive', PAL.ink); tag(ctx, a[3].x, 178, 236, 'trailing', PAL.ink);
    const b = charsCentred(ctx, '0.008020', 1000, 130, 88, () => PAL.ink);
    ubracket(ctx, b[0].l + 6, b[3].r - 6, 190, PAL.ink, 'leading');
    tag(ctx, b[5].x, 178, 236, 'captive', PAL.ink); tag(ctx, b[7].x, 178, 236, 'trailing', PAL.ink);
    headline(ctx, 'the three kinds of zero: leading, captive and trailing');
    readout(d.readout, '3090 \\qquad 0.008020', 'Only the zeros need thought: every nonzero digit is significant.');
  }
  still(d, draw);
})();

(function () {
  const d = sim('fig-count-digits', 340);
  function draw() {
    const { ctx } = begin(d.c);
    const a = charsCentred(ctx, '1267 m', 380, 150, 88, () => PAL.ink);
    arrow(ctx, a[0].x - 30, 92, a[0].x - 6, 116, PAL.ink, 3); text(ctx, 'first nonzero digit on the left', a[0].x - 40, 74, PAL.ink, { size: 19, weight: 600 });
    ubracket(ctx, a[0].l + 4, a[3].r - 4, 212, PAL.ink, '4 significant figures');
    const b = charsCentred(ctx, '55.0 g', 1000, 150, 88, () => PAL.ink);
    arrow(ctx, b[0].x - 30, 92, b[0].x - 6, 116, PAL.ink, 3); text(ctx, 'first nonzero digit on the left', b[0].x - 40, 74, PAL.ink, { size: 19, weight: 600 });
    ubracket(ctx, b[0].l + 4, b[3].r - 4, 212, PAL.ink, '3 significant figures');
    note(ctx, 'the 0 lies to the right of the decimal point, so it is a measured digit and counts', 1000, 290);
    headline(ctx, 'count from the first nonzero digit on the left, and count every digit to its right');
    readout(d.readout, '1267\\ \\text{m}: \\text{four significant figures} \\qquad 55.0\\ \\text{g}: \\text{three significant figures}');
  }
  still(d, draw);
})();

(function () {
  const d = sim('fig-captive-leading', 340);
  function draw() {
    const { ctx } = begin(d.c);
    const a = charsCentred(ctx, '70.607 mL', 380, 150, 84, () => PAL.ink);
    ubracket(ctx, a[0].l + 4, a[5].r - 4, 210, PAL.ink, '5 significant figures');
    note(ctx, 'the captive zeros are measured digits and count', 380, 290);
    const b = charsCentred(ctx, '0.00832407 mL', 1000, 150, 84, (i) => (i < 4 ? PAL.muted : PAL.ink));
    ubracket(ctx, b[4].l + 4, b[9].r - 4, 210, PAL.ink, '6 significant figures');
    ubracket(ctx, b[0].l + 4, b[3].r - 4, 210, PAL.muted, 'leading zeros');
    note(ctx, 'the leading zeros only locate the decimal point and do not count', 1000, 290);
    headline(ctx, 'captive zeros are always significant; leading zeros never are');
    readout(d.readout, '70.607\\ \\text{mL}: \\text{five significant figures} \\qquad 0.00832407\\ \\text{mL}: \\text{six significant figures}');
  }
  still(d, draw);
})();

(function () {
  const d = sim('fig-trailing', 400);
  function draw() {
    const { ctx } = begin(d.c);
    const a = charsCentred(ctx, '1300 g', 700, 130, 88, (i) => (i === 2 || i === 3 ? PAL.muted : PAL.ink));
    ubracket(ctx, a[0].l + 4, a[1].r - 4, 190, PAL.ink, 'measured');
    ubracket(ctx, a[2].l + 4, a[3].r - 4, 190, PAL.muted); text(ctx, 'measured digits, or placeholders?', a[3].r, 242, PAL.muted, { size: 20, weight: 600, align: 'center' });
    [['1.3 × 10³', 'two significant figures'], ['1.30 × 10³', 'three, if the tens place was measured'], ['1.300 × 10³', 'four, if the ones place was measured too']].forEach(([f, why], i) => {
      const x = 280 + i * 420; text(ctx, f, x, 300, PAL.ink, { size: 34, weight: 600, align: 'center' }); note(ctx, why, x, 345);
    });
    headline(ctx, 'trailing zeros left of the decimal point are ambiguous; exponential notation settles them');
    readout(d.readout, '1300\\ \\text{g}: \\text{two, three or four significant figures}', 'Where only the decimal form is available, it is prudent to assume that the trailing zeros are not significant.');
  }
  still(d, draw);
})();

(function () {
  const d = sim('fig-column-sums', 380);
  /* a number written about its decimal point at xd: the integer part to the left, the rest to the right */
  function aligned(ctx, s, xd, y, size, colorOf) {
    const i = s.indexOf('.'), head = i < 0 ? s : s.slice(0, i), tail = i < 0 ? '' : s.slice(i);
    const hw = widthOf(ctx, head, size); chars(ctx, head, xd - hw, y, size, (k) => colorOf(k)); if (tail) chars(ctx, tail, xd, y, size, (k) => colorOf(head.length + k));
  }
  function column(ctx, xd, rows, sign, result, keep, unit, answer, why) {
    const SZ = 40, y0 = 110, dy = 48;
    rows.forEach((r, i) => { aligned(ctx, r, xd, y0 + i * dy, SZ, () => PAL.ink); if (i === rows.length - 1) text(ctx, sign, xd - widthOf(ctx, r.split('.')[0], SZ) - 44, y0 + i * dy, PAL.ink, { size: SZ, weight: 600 }); });
    rows.forEach((r, i) => text(ctx, unit, xd + 112, y0 + i * dy, PAL.ink, { size: SZ, weight: 600 }));
    const yr = y0 + rows.length * dy - 24; line(ctx, xd - 150, yr, xd + 150, yr, PAL.ink, 3);
    const yres = yr + 30; aligned(ctx, result, xd, yres, SZ, (k) => (k < keep ? PAL.ink : PAL.muted)); text(ctx, unit, xd + 112, yres, PAL.ink, { size: SZ, weight: 600 });
    arrow(ctx, xd + 170, yres, xd + 220, yres, PAL.ink, 3); text(ctx, answer, xd + 232, yres, PAL.ink, { size: SZ, weight: 600 });
    note(ctx, why, xd + 60, yres + 60);
  }
  function draw() {
    const { ctx } = begin(d.c);
    text(ctx, '(a)', 60, 110, PAL.muted, { size: 24, weight: 600 });
    column(ctx, 230, ['1.0023', '4.383'], '+', '5.3853', 5, 'g', '5.385 g', '4.383 g stops at the thousandths, so the sum is rounded there');
    text(ctx, '(b)', 760, 110, PAL.muted, { size: 24, weight: 600 });
    column(ctx, 930, ['486', '421.23'], '−', '64.77', 2, 'g', '65 g', '486 g has no decimal places, so the difference is rounded to the ones');
    headline(ctx, 'a sum or difference is rounded to the decimal place of the least precise term');
    readout(d.readout, '5.3853\\ \\text{g} \\longrightarrow 5.385\\ \\text{g} \\qquad 64.77\\ \\text{g} \\longrightarrow 65\\ \\text{g}', 'The muted digits are the ones the rule for addition and subtraction drops.');
  }
  still(d, draw);
})();

/* =====================================================================
   The two graduated-cylinder readings of Example 1.7 and its Check Your
   Learning: faithful still redrawings with the book's numbers.
===================================================================== */
displacement(sim('fig-rebar', 520), 13.5, 22.4, 69.658, rebar, 'piece of rebar');
displacement(sim('fig-gold', 520), 17.1, 19.8, 51.842, nugget, 'piece of material');

/* =====================================================================
   FIGURE 1.27: the archery targets. Still: one live target whose group
   the reader moves off the bull's eye and spreads, and the four corners
   of accurate-or-not against precise-or-not beside it.
===================================================================== */
(function () {
  const d = sim('sim-targets', 620);
  const off = ctl(d.controls, { label: '\\text{offset}', cls: '', min: 0, max: 15, step: 0.5, value: 0, unit: 'cm', dec: 1, aria: 'distance of the group from the bull’s eye' });
  const spr = ctl(d.controls, { label: '\\text{spread}', cls: '', min: 0.5, max: 12, step: 0.5, value: 1.5, unit: 'cm', dec: 1, aria: 'spread of the group' });
  const n = ctl(d.controls, { label: '\\text{arrows}', cls: '', min: 3, max: 8, step: 1, value: 3, unit: '', dec: 0, aria: 'number of arrows' });
  const PAT = [[0.3, -0.8], [-0.9, 0.2], [0.7, 0.6], [-0.4, -0.5], [0.9, -0.3], [-0.6, 0.9], [0.1, 0.4], [-0.2, -1.0]];
  const DIR = [Math.cos(-0.9), Math.sin(-0.9)];          /* the group is pushed to the upper right, as the book draws it */
  const RCM = 25, LIMIT = 5;                              /* the target's radius in cm, and the ring inside which a group counts as close */
  const group = (o, s, k) => PAT.slice(0, k).map(([px, py]) => [o * DIR[0] + s * px, o * DIR[1] + s * py]);
  const meanDist = (pts) => pts.reduce((a, [x, y]) => a + Math.hypot(x, y), 0) / pts.length;
  const spread = (pts) => Math.max(...pts.flatMap((p, i) => pts.slice(i + 1).map((q) => Math.hypot(p[0] - q[0], p[1] - q[1]))));
  function target(ctx, cx, cy, R, pts, r) {
    for (let k = 5; k >= 1; k--) { ctx.save(); ctx.fillStyle = k % 2 ? PAL.soft : PAL.panel; ctx.strokeStyle = PAL.muted; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(cx, cy, (R * k) / 5, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore(); }
    line(ctx, cx - R, cy, cx + R, cy, PAL.rule, 1.5); line(ctx, cx, cy - R, cx, cy + R, PAL.rule, 1.5);
    const S = R / RCM; pts.forEach(([x, y]) => dot(ctx, cx + x * S, cy + y * S, PAL.ink, true, r));
  }
  function draw() {
    const { ctx } = begin(d.c);
    const pts = group(off.v, spr.v, n.v), md = meanDist(pts), sp = spread(pts), accurate = md <= LIMIT, precise = sp <= LIMIT;
    target(ctx, 360, 340, 230, pts, 8);
    text(ctx, 'bull’s eye', 360, 340 + 230 + 32, PAL.muted, { size: 17, align: 'center' });
    /* the four corners */
    const cells = [[true, true, '(a) accurate and precise', 0, 1.5], [false, true, '(b) precise but not accurate', 9, 1.5], [true, false, 'accurate but not precise', 0, 8], [false, false, '(c) neither accurate nor precise', 9, 8]];
    const L = 720, T = 120, CW = 330, CH = 230;
    text(ctx, 'precise', L + CW / 2, T - 16, PAL.ink, { size: 20, weight: 600, align: 'center' }); text(ctx, 'not precise', L + CW * 1.5, T - 16, PAL.ink, { size: 20, weight: 600, align: 'center' });
    cells.forEach(([acc, pre, label, o, s], i) => {
      const col = pre ? 0 : 1, row = acc ? 0 : 1, x = L + col * CW, y = T + row * CH, live = acc === accurate && pre === precise;
      if (live) { ctx.save(); ctx.fillStyle = alpha(PAL.muted, 0.12); ctx.fillRect(x, y, CW, CH); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.strokeRect(x, y, CW, CH); ctx.restore(); }
      target(ctx, x + CW / 2, y + 88, 72, group(o, s, 3), 4);
      text(ctx, label, x + CW / 2, y + CH - 34, live ? PAL.ink : PAL.muted, { size: 18, weight: live ? 600 : 400, align: 'center' });
    });
    headline(ctx, accurate && precise ? 'these arrows are close to both the bull’s eye and one another, so they are both accurate and precise'
      : precise ? 'these arrows are close to one another but not on target, so they are precise but not accurate'
      : accurate ? 'these arrows are scattered about the bull’s eye, so they are accurate on average but not precise'
      : 'these arrows are neither on target nor close to one another, so they are neither accurate nor precise');
    readout(d.readout, `\\text{mean distance from the bull's eye} = ${fmt(md, 1)}\\ \\text{cm} \\qquad \\text{greatest distance between two arrows} = ${fmt(sp, 1)}\\ \\text{cm}`,
      'The offset slider moves the whole group away from the bull’s eye and the spread slider scatters it; accuracy is the first and precision the second, and the two are independent.');
  }
  still(d, draw);
})();
};
