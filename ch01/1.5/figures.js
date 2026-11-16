/* Figures for section 1.5 Measurement Uncertainty, Accuracy, and Precision. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['1.5'] = function (root, F) {
const { fmt, tex, C, PAL, alpha, ctl, register, begin, line, dot, text, headline } = F;
const sim = (id, H) => F.sim(root, id, H);
/* both figures of this section are still pictures: they answer their sliders and have no clock */
const still = (d, draw) => register(d.fig, { update: () => {}, draw });
const TAU = 2 * Math.PI;

/* =====================================================================
   FIGURE 1.26: the 25-mL graduated cylinder and its meniscus. The zoom
   window holds the two marks the meniscus lies between and the nine
   tenths the reader divides the gap into; the reading is the certain
   millilitres plus the estimated tenths.
===================================================================== */
(function () {
  const d = sim('sim-meniscus', 640);
  const VMAX = 25;
  const V = ctl(d.controls, { label: '\\text{liquid level}', cls: 'volume', min: 5, max: 24.9, step: 0.02, value: 21.62, unit: '', aria: 'liquid level',
    fmt: (v) => { const w = Math.floor(v + 1e-9); return w + ' to ' + (w + 1) + ' mL'; } });
  const D = ctl(d.controls, { label: '\\text{your tenths digit}', cls: '', min: 0, max: 9, step: 1, value: 6, unit: '', dec: 0, aria: 'the tenths digit you estimate' });
  /* the cylinder: 16 units a millilitre, its floor at BASE */
  const CX = 200, W = 100, BASE = 556, PER = 16, L = CX - W / 2, R = CX + W / 2, RIM = 112;
  const Y = (v) => BASE - v * PER;
  /* the zoom window: 2 mL tall, 230 units a millilitre, the glass between GL and GR and a gutter either side for labels */
  const WX0 = 420, WX1 = 980, WY0 = 122, WY1 = 582, GL = 505, GR = 835, ZPER = (WY1 - WY0) / 2, MX = (GL + GR) / 2;
  let hits = []; F.hover(d.stage, () => hits);
  function surface(ctx, l, r, y, lift, bottom, cv, w) {   /* the liquid under a concave meniscus whose lowest point is exactly y */
    const cx = (l + r) / 2;
    ctx.save(); ctx.fillStyle = alpha(cv, 0.2); ctx.beginPath(); ctx.moveTo(l, bottom); ctx.lineTo(r, bottom); ctx.lineTo(r, y - lift); ctx.quadraticCurveTo(cx, y + lift, l, y - lift); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = cv; ctx.lineWidth = w; ctx.beginPath(); ctx.moveTo(r, y - lift); ctx.quadraticCurveTo(cx, y + lift, l, y - lift); ctx.stroke(); ctx.restore();
  }
  function draw() {
    const { ctx } = begin(d.c);
    hits.length = 0;
    const cv = C('volume'), v = V.v, whole = Math.floor(v + 1e-9), frac = v - whole, digit = D.v, reading = whole + digit / 10;
    /* ---- the cylinder: foot, collar, tube with its pouring lip, scale ---- */
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.fillStyle = PAL.soft; ctx.lineWidth = 3; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.moveTo(CX - 118, BASE + 34); ctx.lineTo(CX - 66, BASE + 20); ctx.lineTo(CX + 66, BASE + 20); ctx.lineTo(CX + 118, BASE + 34); ctx.lineTo(CX + 66, BASE + 50); ctx.lineTo(CX - 66, BASE + 50); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.rect(L - 6, BASE + 4, W + 12, 22); ctx.fill(); ctx.stroke();
    ctx.restore();
    surface(ctx, L + 1.5, R - 1.5, Y(v), 4, BASE, cv, 2.5);
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.lineJoin = 'round'; ctx.beginPath();
    ctx.moveTo(L - 26, RIM); ctx.lineTo(L, RIM + 44); ctx.lineTo(L, BASE + 4); ctx.lineTo(R, BASE + 4); ctx.lineTo(R, RIM); ctx.closePath(); ctx.stroke(); ctx.restore();
    for (let u = 1; u <= VMAX; u++) {
      const major = u % 5 === 0; line(ctx, L, Y(u), L + (major ? 60 : 34), Y(u), PAL.muted, major ? 2.5 : 1.5);
      if (major) text(ctx, String(u), R - 8, Y(u), PAL.ink, { size: 17, align: 'right', weight: 600 });
    }
    text(ctx, 'mL', CX + 14, RIM + 20, PAL.ink, { size: 17, align: 'center', weight: 600 });
    hits.push({ x: CX, y: (RIM + Y(v)) / 2, r: 60, name: '25-mL graduated cylinder, a mark every 1 mL' }, { x: CX, y: (Y(v) + BASE) / 2, r: 60, name: 'liquid' });
    /* ---- the part of the scale the window enlarges, and its two guide lines ---- */
    const top = whole + 1.5, my = (u) => WY0 + (top - u) * ZPER;
    const by0 = Math.max(Y(top), RIM + 2), by1 = Y(whole - 0.5);
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.strokeRect(L - 12, by0, W + 24, by1 - by0); ctx.restore();
    line(ctx, R + 12, by0, WX0, WY0, PAL.rule, 2); line(ctx, R + 12, by1, WX0, WY1, PAL.rule, 2);
    /* ---- the window ---- */
    ctx.save(); ctx.beginPath(); ctx.rect(WX0, WY0, WX1 - WX0, WY1 - WY0); ctx.fillStyle = PAL.panel; ctx.fill(); ctx.clip();
    surface(ctx, GL, GR, my(v), 22, WY1, cv, 4);
    line(ctx, GL, WY0, GL, WY1, PAL.ink, 3); line(ctx, GR, WY0, GR, WY1, PAL.ink, 3);
    ctx.restore();
    for (let u = whole; u <= whole + 1; u++) {
      if (u > VMAX) continue;
      line(ctx, GL, my(u), GL + 150, my(u), PAL.ink, 3); line(ctx, GL + 150, my(u), GR, my(u), alpha(PAL.ink, 0.45), 2, [10, 10]);
      text(ctx, u + ' mL', GL - 10, my(u), PAL.ink, { size: 20, weight: 600, align: 'right' });
    }
    /* the tenths the reader pictures between the two marks */
    for (let k = 1; k < 10; k++) {
      const y = my(whole + k / 10); line(ctx, GL, y, GR, y, alpha(PAL.ink, 0.3), 1.5, [4, 8]);
      text(ctx, '.' + k, GL - 10, y, PAL.muted, { size: 15, align: 'right' });
    }
    hits.push({ x: GL - 26, y: my(whole + 0.5), r: 34, name: 'tenths of a millilitre between the two marks, which the scale does not print' });
    /* the reader's estimate */
    const ry = my(reading);
    line(ctx, GL, ry, GR + 14, ry, PAL.ink, 3);
    text(ctx, 'your reading', GR + 22, ry - 13, PAL.ink, { size: 18 });
    text(ctx, fmt(reading, 1) + ' mL', GR + 22, ry + 13, cv, { size: 20, weight: 600 });
    /* where a reading is made */
    const ly = my(v) - 78;
    F.arrow(ctx, MX + 96, ly + 16, MX + 6, my(v) - 5, PAL.ink, 3);
    text(ctx, 'bottom of the meniscus', MX + 150, ly, PAL.ink, { size: 19, align: 'center', bg: PAL.panel });
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 4; ctx.strokeRect(WX0, WY0, WX1 - WX0, WY1 - WY0); ctx.restore();
    /* ---- the reading, its certain digits and its estimated one ---- */
    const s = fmt(reading, 1), SZ = 104, RX = 1185, RY = 320, w = F.measure(ctx, s, { size: SZ, weight: 600 }), x0 = RX - w / 2 - 30;
    const wHead = F.measure(ctx, s.slice(0, -2), { size: SZ, weight: 600 }), wDot = F.measure(ctx, '.', { size: SZ, weight: 600 });
    text(ctx, s, x0, RY, cv, { size: SZ, weight: 600 });
    text(ctx, 'mL', x0 + w + 14, RY + 16, cv, { size: 38, weight: 600 });
    const under = (x1, x2, label) => {
      ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x1, RY + 62); ctx.lineTo(x1, RY + 72); ctx.lineTo(x2, RY + 72); ctx.lineTo(x2, RY + 62); ctx.stroke(); ctx.restore();
      return label;
    };
    under(x0 + 4, x0 + wHead - 4); under(x0 + wHead + wDot + 4, x0 + w - 4);
    text(ctx, 'certain', x0 + wHead / 2, RY + 98, PAL.ink, { size: 20, weight: 600, align: 'center' });
    text(ctx, 'estimated', x0 + wHead + wDot + (w - wHead - wDot) / 2 + 40, RY + 98, PAL.ink, { size: 20, weight: 600, align: 'center' });
    /* ---- the headline judges the reader's digit against where the meniscus lies ---- */
    const fits = (k) => Math.abs(k / 10 - frac) <= 0.15 + 1e-9, near = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].filter(fits);
    const list = near.length === 1 ? String(near[0]) : near.slice(0, -1).join(', ') + ' or ' + near[near.length - 1];
    const where = frac < 0.03 ? 'The bottom of the meniscus sits on the ' + whole + ' mL mark'
      : 'The bottom of the meniscus lies between the ' + whole + ' and ' + (whole + 1) + ' mL marks' + (frac < 0.35 ? ', nearer the ' + whole : frac > 0.65 ? ', nearer the ' + (whole + 1) : '');
    headline(ctx, fits(digit) ? where + ', and a tenths digit of ' + digit + ' is a reasonable estimate.' : where + ', so a tenths digit of ' + list + ' fits better than ' + digit + '.');
    tex(d.readout, `\\kV = ${whole}\\ \\text{mL} + 0.${digit}\\ \\text{mL} = ${fmt(reading, 1)}\\ \\text{mL}`);
  }
  still(d, draw);
})();

/* =====================================================================
   FIGURE 1.27: the archery targets. One target whose group of three
   arrows the reader moves off the bull's eye and spreads, beside the
   book's (a), (b) and (c) and the fourth case the book leaves out.
===================================================================== */
(function () {
  const d = sim('sim-targets', 670);
  /* the target as the book draws it: a bull's eye, a white ring and an outer ring, 10, 17 and 25 cm from the centre.
     A group counts as accurate when its centre is inside the bull's eye, and as precise when no two arrows are farther
     apart than the bull's eye's radius. The book's three groups, measured on its image on this scale, fall on the right sides. */
  const ZONES = [25, 17, 10], LIMIT = 10;
  const off = ctl(d.controls, { label: '\\text{offset}', cls: 'length', key: 'offset', min: 0, max: 20, step: 0.5, value: 2, unit: 'cm', dec: 1, aria: 'distance of the centre of the group from the centre of the target', specials: [{ at: LIMIT, label: 'edge of the bull’s eye' }] });
  const spr = ctl(d.controls, { label: '\\text{spread}', cls: 'length', key: 'spread', min: 1, max: 20, step: 0.5, value: 2.5, unit: 'cm', dec: 1, aria: 'greatest distance between two arrows', specials: [{ at: LIMIT, label: 'radius of the bull’s eye' }] });
  /* the group is pushed up and to the right, as in the book's (b) and (c), and spreads across that direction, as (c) does.
     PAT has its centre at the origin and its two end arrows one unit apart, so the sliders are exactly the offset and the spread. */
  const DIR = [0.932, -0.362], ACROSS = [0.362, 0.932];
  const PAT = [[-0.5, -0.09], [0.04, 0.18], [0.46, -0.09]];
  const group = (o, s) => PAT.map(([a, b]) => [o * DIR[0] + s * (a * ACROSS[0] + b * DIR[0]), o * DIR[1] + s * (a * ACROSS[1] + b * DIR[1])]);
  /* the four cases are four archers, the referents the caption names; the group on the sliders wears the hue of the case it is in */
  const CASES = [
    { who: 'archer-a', name: 'archer (a)', label: '(a) accurate and precise', acc: true, pre: true, o: 2, s: 2.5 },
    { who: 'archer-b', name: 'archer (b)', label: '(b) precise, not accurate', acc: false, pre: true, o: 11, s: 6.5 },
    { who: 'archer-d', name: 'the fourth archer', label: 'accurate, not precise', acc: true, pre: false, o: 0, s: 19 },
    { who: 'archer-c', name: 'archer (c)', label: '(c) not accurate, not precise', acc: false, pre: false, o: 19, s: 19 },
  ];
  let hits = []; F.hover(d.stage, () => hits);
  function target(ctx, cx, cy, R) {
    ZONES.forEach((z, k) => { ctx.save(); ctx.fillStyle = k === 1 ? PAL.panel : PAL.soft; ctx.strokeStyle = PAL.muted; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(cx, cy, (R * z) / 25, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore(); });
  }
  function draw() {
    const { ctx } = begin(d.c);
    hits.length = 0;
    const cl = C('length'), accurate = off.v <= LIMIT, precise = spr.v <= LIMIT, live = CASES.findIndex((c) => c.acc === accurate && c.pre === precise);
    /* ---- the target on the sliders ---- */
    const CXT = 350, CYT = 345, RT = 225, S = RT / 25, pts = group(off.v, spr.v).map(([x, y]) => [CXT + x * S, CYT + y * S]);
    target(ctx, CXT, CYT, RT);
    line(ctx, CXT, CYT + 90 + 4, CXT, CYT + RT + 8, PAL.muted, 1.5);
    text(ctx, 'bull’s eye, 10 cm in radius', CXT, CYT + RT + 28, PAL.muted, { size: 18, align: 'center' });
    const gx = CXT + off.v * DIR[0] * S, gy = CYT + off.v * DIR[1] * S;
    line(ctx, pts[0][0], pts[0][1], pts[2][0], pts[2][1], cl, 2.5, [6, 6]);
    if (off.v > 0) line(ctx, CXT, CYT, gx, gy, cl, 4);
    dot(ctx, CXT, CYT, PAL.ink, true, 4);
    const hue = F.ref(CASES[live].who);
    pts.forEach(([x, y], k) => { dot(ctx, x, y, hue, true, 9); hits.push({ x, y, r: 13, name: 'arrow ' + (k + 1) + ' of 3' }); });
    ctx.save(); ctx.strokeStyle = cl; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(gx - 7, gy - 7); ctx.lineTo(gx + 7, gy + 7); ctx.moveTo(gx - 7, gy + 7); ctx.lineTo(gx + 7, gy - 7); ctx.stroke(); ctx.restore();
    hits.push({ x: gx, y: gy, r: 10, name: 'centre of the group, ' + fmt(off.v, 1) + ' cm from the centre of the target' }, { x: CXT, y: CYT, r: 90, name: 'bull’s eye' });
    F.legend(ctx, { l: 70, r: 690, t: 110, b: 596 }, [{ s: 'offset, centre to ×', color: cl, w: 4 }, { s: 'spread, farthest two arrows', color: cl, w: 2.5, dash: [6, 6] }], { corner: 'below', row: true });
    /* ---- the four cases ---- */
    const GX = 730, GY = 150, CW = 325, CH = 240;
    text(ctx, 'precise', GX + CW / 2, GY - 18, PAL.ink, { size: 20, weight: 600, align: 'center' }); text(ctx, 'not precise', GX + CW * 1.5, GY - 18, PAL.ink, { size: 20, weight: 600, align: 'center' });
    CASES.forEach((c, i) => {
      const x = GX + (c.pre ? 0 : 1) * CW, y = GY + (c.acc ? 0 : 1) * CH, on = i === live, h = F.ref(c.who), cx = x + CW / 2, cy = y + 102, r = 86;
      if (on) { ctx.save(); ctx.fillStyle = alpha(PAL.muted, 0.1); ctx.fillRect(x, y, CW, CH); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.strokeRect(x, y, CW, CH); ctx.restore(); }
      target(ctx, cx, cy, r);
      group(c.o, c.s).forEach(([px, py]) => dot(ctx, cx + (px * r) / 25, cy + (py * r) / 25, h, true, 4.5));
      hits.push({ x: cx, y: cy, r, name: c.name + ': offset ' + fmt(c.o, 1) + ' cm, spread ' + fmt(c.s, 1) + ' cm' });
      text(ctx, c.label, cx, y + CH - 26, PAL.ink, { size: 19, weight: on ? 600 : 400, align: 'center' });
    });
    headline(ctx, accurate && precise ? 'These arrows are close to both the bull’s eye and one another, so they are accurate and precise.'
      : precise ? 'These arrows are close to one another but not on target, so they are precise but not accurate.'
      : accurate ? 'These arrows are centered on the bull’s eye but far from one another, so they are accurate but not precise.'
      : 'These arrows are neither on target nor close to one another, so they are neither accurate nor precise.');
    const len = (x) => `\\htmlClass{kv-length}{${fmt(x, 1)}\\ \\text{cm}}`;
    tex(d.readout, `\\text{offset} = ${len(off.v)} ${accurate ? '\\le' : '>'} 10\\ \\text{cm}\\ \\ \\text{(${accurate ? 'accurate' : 'not accurate'})} \\\\ \\text{spread} = ${len(spr.v)} ${precise ? '\\le' : '>'} 10\\ \\text{cm}\\ \\ \\text{(${precise ? 'precise' : 'not precise'})}`);
  }
  still(d, draw);
})();
};
