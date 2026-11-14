/* Figures for section 1.4 Measurements. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['1.4'] = function (root, F) {
const { fmt, tex, C, PAL, alpha, ctl, register, begin, line, dot, text, hbracket, vbracket, cycle } = F;
const sim = (id, H) => F.sim(root, id, H);

/* ---------- small helpers shared by the figures ---------- */
const clamp = (x, lo, hi) => Math.min(hi, Math.max(lo, x));
const commas = (s) => s.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
/* a number to n significant figures, never in exponent form, with commas above a thousand */
const sig = (x, n) => { const s = Math.abs(x).toPrecision(n); return s.includes('e') || Math.abs(x) >= 1000 ? commas(String(Math.round(Number(s)))) : s; };
const sig3 = (x) => sig(x, 3);
/* a number to at most n significant figures with no trailing zeros: 39.37, 0.3937, 1 */
const trim = (x, n) => String(Number(x.toPrecision(n)));
/* the significant figures a decimal string carries, for a reading that limits a result */
const sigOf = (s) => s.replace('.', '').replace(/^0+/, '').length;
/* a value in its category's colour inside a readout: the number wears the hue, the signs around it stay ink (rule 26.17) */
const hue = (cls, s) => `\\htmlClass{kv-${cls}}{${s}}`;
/* a readout is written when its numbers change, not on every frame of a moving figure */
const once = (host) => { let last = ''; return (s) => { if (s !== last) { last = s; tex(host, s); } }; };

/* ---------- the two locked views of the section's solids (rule 28.2) ----------
   The book prints its cubes as solids seen from one corner, so Figure 1.25 projects them through the
   drawing layer's locked view: one fixed viewpoint, one fixed lamp, shaded faces and no orbit, which
   keeps the figure flat in cost and in chrome. Coordinates keep the names the figure uses: x runs to
   the right and front, y to the left and front, z up, with (ox, oy) the front bottom vertex on the
   canvas; the view's own axes are y up and z toward the reader, so the three are handed over as
   [-y, z, -x]. A body takes no type hue (rule 7): a face is the page colour under the share of ink its
   angle to the lamp earns it. */
const CORNER = F.view({ yaw: Math.PI / 4, pitch: 0.6155, dist: 3000, cx: 0, cy: 0 });
const iso = (ox, oy, x, y, z) => { const q = CORNER.P([-y, z, -x]); return [ox + q[0], oy + q[1]]; };
/* The cube on the balance is seen from the front and a little above instead, so that the balance's
   display faces the reader and its reading is set square: x right, y up, z toward the reader. */
const FRONT = F.view({ yaw: 0, pitch: 0.36, dist: 3000, cx: 0, cy: 0 });
/* a box in the front view, its top and its front face (the sides are edge-on from here) */
function slab(ctx, P, x0, x1, y0, y1, z0, z1, w = 2.5) {
  F.face(ctx, [P(x0, y1, z1), P(x1, y1, z1), P(x1, y1, z0), P(x0, y1, z0)], FRONT.shade([0, 1, 0]), w);
  F.face(ctx, [P(x0, y0, z1), P(x1, y0, z1), P(x1, y1, z1), P(x0, y1, z1)], FRONT.shade([0, 0, 1]), w);
}
/* a wooden rule from x1 to x2 across the top edge y, h tall; ticks and labels are drawn by the caller */
function rule(ctx, x1, x2, y, h) {
  ctx.save(); ctx.fillStyle = PAL.soft; ctx.strokeStyle = PAL.muted; ctx.lineWidth = 2; ctx.fillRect(x1, y, x2 - x1, h); ctx.strokeRect(x1, y, x2 - x1, h); ctx.restore();
}

/* =====================================================================
   FIGURE 1.23: a meter, a yard, a centimeter and an inch on one rule.
   The book's rule carries centimeters along its top edge and inches and
   feet along its bottom edge; the chosen length lies over it as a bar,
   and the stretch of the rule round the bar's end is drawn again ten
   times larger, as the book's inset draws the first inch. Still: a
   length answers its slider and nothing here has a clock.
===================================================================== */
(function () {
  const d = sim('sim-length', 556);
  const IN = 2.54, YD = 91.44;
  const cmText = (v) => trim(v, 4) + ' cm';
  /* the book's four lengths: 1 cm is where the track starts, and the inch, the yard and the meter are its dashed circles (rule 26.1) */
  const L = ctl(d.controls, { label: '\\text{length}', cls: 'length', min: 1, max: 100, step: 1, value: 100, unit: 'cm', fmt: cmText, aria: 'length in centimeters',
    specials: [{ at: IN, label: '1 in.' }, { at: YD, label: '1 yd' }, { at: 100, label: '1 m' }] });
  const X = (cm) => 100 + 12 * cm;                /* the rule: 12 logical units to the centimeter, fixed */
  const yBar = 84, yT = 124, yB = 244;
  const K = 120, SPAN = 7.5, LENS = K * SPAN, lBar = 336, lT = 356, lB = 496;   /* the lens: 7.5 cm of the rule, ten times larger */
  const say = once(d.readout);
  function draw() {
    const { ctx } = begin(d.c);
    const l = L.v, inches = l / IN, cl = C('length');
    /* the rule: centimeters down from the top edge, inches up from the bottom edge, both from one zero */
    rule(ctx, X(0), X(100), yT, yB - yT);
    for (let c = 0; c <= 100; c++) { const big = c % 10 === 0, mid = c % 5 === 0; line(ctx, X(c), yT, X(c), yT + (big ? 30 : mid ? 20 : 12), PAL.ink, big ? 2 : 1.2); if (big && c) text(ctx, String(c), X(c) - (c === 100 ? 6 : 0), yT + 46, PAL.ink, { size: 17, align: c === 100 ? 'right' : 'center' }); }
    for (let i = 0; i <= 39; i++) { const ft = i % 12 === 0, six = i % 6 === 0; line(ctx, X(i * IN), yB, X(i * IN), yB - (ft ? 30 : six ? 22 : 14), PAL.ink, ft ? 2 : 1.2); if (six && i) text(ctx, String(i), X(i * IN), yB - 46, PAL.ink, { size: 17, align: 'center' }); }
    text(ctx, 'cm', X(0) - 12, yT + 20, PAL.muted, { size: 17, align: 'right' });
    text(ctx, 'in.', X(0) - 12, yB - 20, PAL.muted, { size: 17, align: 'right' });
    text(ctx, '1 ft', X(12 * IN), yB + 24, PAL.ink, { size: 17, align: 'center' });
    text(ctx, '2 ft', X(24 * IN), yB + 24, PAL.ink, { size: 17, align: 'center' });
    text(ctx, '3 ft = 1 yd', X(YD), yB + 24, PAL.ink, { size: 17, weight: 600, align: 'center' });
    text(ctx, '1 m', X(100) + 12, yT + 20, PAL.ink, { size: 20, weight: 600 });
    /* the length as a bar over the rule */
    line(ctx, X(0), yBar, X(l), yBar, cl, 7);
    line(ctx, X(0), yBar - 12, X(0), yBar + 12, cl, 3); line(ctx, X(l), yBar - 12, X(l), yBar + 12, cl, 3);
    line(ctx, X(l), yBar + 12, X(l), yT, cl, 2, [4, 8]);
    text(ctx, cmText(l), Math.max(X(l / 2), 130), yBar - 26, cl, { size: 22, weight: 600, align: 'center' });
    /* what the length has over a yard, once it is longer than one */
    if (l > YD + 0.5) {
      line(ctx, X(YD), 34, X(YD), yT, alpha(PAL.ink, 0.35), 2, [4, 8]);
      hbracket(ctx, X(YD), X(l), 44, cl);
      F.rich(ctx, [[trim((l - YD) / IN, 3) + ' in.', cl], ' longer than a yard'], X(YD) - 16, 44, { size: 20, align: 'right' });
    }
    /* the lens: the rule round the bar's end ten times larger, millimeters above and sixteenths of an inch below */
    const mid = clamp(X(l), 100 + LENS / 2, 1300 - LENS / 2), left = mid - LENS / 2, right = mid + LENS / 2;
    const lo = clamp(l - SPAN / 2, -0.3, 100.3 - SPAN), LX = (cm) => left + (cm - lo) * K;
    const guide = alpha(PAL.ink, 0.4);
    line(ctx, X(l), yB + 44, left, lBar - 22, guide, 1.5, [8, 8]); line(ctx, X(l), yB + 44, right, lBar - 22, guide, 1.5, [8, 8]);
    line(ctx, X(l), yB, X(l), yB + 44, guide, 1.5, [8, 8]);
    ctx.save(); ctx.beginPath(); ctx.rect(left, lBar - 20, LENS, lB - lBar + 22); ctx.clip();
    rule(ctx, LX(0), LX(100), lT, lB - lT);
    for (let mm = Math.max(0, Math.ceil(lo * 10)); mm <= Math.min(1000, Math.floor((lo + SPAN) * 10)); mm++) {
      const c = mm % 10 === 0, h = mm % 5 === 0, x = LX(mm / 10);
      line(ctx, x, lT, x, lT + (c ? 34 : h ? 24 : 13), PAL.ink, c ? 2 : 1.2);
    }
    for (let i = Math.max(0, Math.ceil((lo / IN) * 16)); i <= Math.min(629, Math.floor(((lo + SPAN) / IN) * 16)); i++) {
      const x = LX((i * IN) / 16);
      line(ctx, x, lB, x, lB - (i % 16 === 0 ? 38 : i % 8 === 0 ? 29 : i % 4 === 0 ? 22 : i % 2 === 0 ? 16 : 11), PAL.ink, i % 16 === 0 ? 2 : 1.2);
    }
    line(ctx, LX(0), lBar, LX(l), lBar, cl, 7);
    line(ctx, LX(0), lBar - 12, LX(0), lBar + 12, cl, 3); line(ctx, LX(l), lBar - 12, LX(l), lBar + 12, cl, 3);
    line(ctx, LX(l), lBar + 12, LX(l), lT, cl, 2, [4, 8]);
    ctx.restore();
    /* the lens's numbers are page text, which the clip does not reach, so only those inside it are set */
    const inside = (x) => x > left + 16 && x < right - 16;
    for (let c = Math.max(0, Math.ceil(lo)); c <= Math.min(100, Math.floor(lo + SPAN)); c++) if (inside(LX(c))) text(ctx, String(c), LX(c), lT + 52, PAL.ink, { size: 18, align: 'center' });
    for (let i = Math.max(0, Math.ceil(lo / IN)); i <= Math.min(39, Math.floor((lo + SPAN) / IN)); i++) if (inside(LX(i * IN))) text(ctx, String(i), LX(i * IN), lB - 56, PAL.ink, { size: 18, align: 'center' });
    ctx.save(); ctx.strokeStyle = guide; ctx.lineWidth = 1.5; ctx.strokeRect(left, lBar - 22, LENS, lB - lBar + 24); ctx.restore();
    text(ctx, 'cm', left - 12, lT + 22, PAL.muted, { size: 17, align: 'right' });
    text(ctx, 'in.', left - 12, lB - 22, PAL.muted, { size: 17, align: 'right' });
    text(ctx, '×10', right + 12, (lT + lB) / 2, PAL.muted, { size: 18 });
    F.rich(ctx, [[cmText(l), cl], ' = ', [trim(inches, 4) + ' in.', cl]], clamp(LX(l), left + 110, right - 110), lB + 30, { size: 20, align: 'center' });
    say([cmText(l).replace(' cm', '\\ \\text{cm}'), trim(l / 100, 4) + '\\ \\text{m}', trim(l / YD, 4) + '\\ \\text{yd}', trim(inches, 4) + '\\ \\text{in.}'].map((s) => hue('length', s)).join(' = '));
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 1.25: the milliliter, the liter and the cubic meter. A cube is
   built of small cubes and seen from the book's corner, its three faces
   ruled into them, so the count along an edge is read off the drawing.
   Up to 10 cm the small cube is the cubic centimeter and a dime stands
   beside it at the same scale; past 10 cm the view pulls back ten times
   and the small cube is the liter. Still: the cube answers its slider,
   and the view eases once as the edge passes 10 cm (manim 7).
===================================================================== */
(function () {
  const d = sim('sim-volume', 620);
  /* nineteen stops: 1 to 10 cm by ones, then 20 to 100 cm by tens, so every cube is a whole number of small cubes */
  const edgeOf = (i) => { const n = Math.round(i); return n <= 10 ? n : (n - 9) * 10; };
  const NEAR = 33, FAR = 3.3;                     /* logical units per centimeter in the two frames */
  const zoom = F.tween(d, Math.log10(NEAR));
  let frame = NEAR;
  const I = ctl(d.controls, { label: '\\text{edge length}', cls: 'length', min: 1, max: 19, step: 1, value: 10, unit: 'cm', fmt: (i) => edgeOf(i) + ' cm', aria: 'edge length of the cube in centimeters',
    specials: [{ at: 1, label: '1 mL' }, { at: 10, label: '1 L' }, { at: 19, label: '1 m³' }],
    onInput: () => { const want = edgeOf(I.v) <= 10 ? NEAR : FAR; if (want !== frame) { frame = want; zoom.to(Math.log10(want), 1100); } } });
  const say = once(d.readout);
  function draw() {
    const { ctx } = begin(d.c);
    const a = edgeOf(I.v), s = 10 ** zoom.v, far = clamp(Math.log10(NEAR) - zoom.v, 0, 1), fine = clamp((s - 6) / 10, 0, 1);
    const u = a > 10 ? 10 : 1, cl = C('length'), cv = C('volume');
    const ox = 560 + 140 * far, oy = 590;
    const P = (x, y, z) => iso(ox, oy, x * s, y * s, z * s);
    const quad = (pts, k, w) => F.face(ctx, pts.map((p) => P(...p)), k, w);
    const seg = (p, q, color, w) => { const [x1, y1] = P(...p), [x2, y2] = P(...q); line(ctx, x1, y1, x2, y2, color, w); };
    /* the three faces the corner view shows */
    quad([[0, 0, 0], [a, 0, 0], [a, 0, a], [0, 0, a]], CORNER.shade([1, 0, 0]), 0);
    quad([[0, 0, 0], [0, a, 0], [0, a, a], [0, 0, a]], CORNER.shade([0, 0, 1]), 0);
    quad([[0, 0, a], [a, 0, a], [a, a, a], [0, a, a]], CORNER.shade([0, 1, 0]), 0);
    /* one small cube at the top front corner, tinted as the book tints one */
    ctx.save(); ctx.fillStyle = alpha(cv, 0.4);
    [[[0, 0, a - u], [u, 0, a - u], [u, 0, a], [0, 0, a]], [[0, 0, a - u], [0, u, a - u], [0, u, a], [0, 0, a]], [[0, 0, a], [u, 0, a], [u, u, a], [0, u, a]]].forEach((pts) => {
      ctx.beginPath(); pts.forEach((p, i) => { const [x, y] = P(...p); if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y); }); ctx.closePath(); ctx.fill();
    });
    ctx.restore();
    /* the faces ruled into small cubes: every centimeter while the view is near, every decimeter beyond 10 cm */
    const ruleFaces = (st, color, w) => {
      for (let j = st; j < a; j += st) {
        seg([j, 0, 0], [j, 0, a], color, w); seg([0, 0, j], [a, 0, j], color, w);
        seg([0, j, 0], [0, j, a], color, w); seg([0, 0, j], [0, a, j], color, w);
        seg([j, 0, a], [j, a, a], color, w); seg([0, j, a], [a, j, a], color, w);
      }
    };
    if (fine > 0) ruleFaces(1, alpha(PAL.ink, 0.55 * fine), 1.2);
    if (a > 10) ruleFaces(10, alpha(PAL.ink, 0.55 + 0.25 * fine), 1.2 + 0.8 * fine);
    [[[0, 0, 0], [a, 0, 0]], [[0, 0, 0], [0, a, 0]], [[0, 0, 0], [0, 0, a]], [[a, 0, 0], [a, 0, a]], [[0, a, 0], [0, a, a]], [[0, 0, a], [a, 0, a]], [[0, 0, a], [0, a, a]], [[a, 0, a], [a, a, a]], [[0, a, a], [a, a, a]]]
      .forEach(([p, q]) => seg(p, q, PAL.ink, 2.5));
    /* the edge, measured up the right-hand corner */
    const [ex, e0] = P(a, 0, 0), e1 = P(a, 0, a)[1];
    vbracket(ctx, ex + 24, e1, e0, cl, a + ' cm', 1);
    /* a dime at the same scale, as the book's part (b) sets one beside the cubic centimeter */
    if (fine > 0) {
      const r = 0.9 * s, dx = ox + 430, dy = oy - r;
      ctx.save(); ctx.globalAlpha *= fine;
      ctx.fillStyle = PAL.soft; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(dx, dy, r, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      ctx.strokeStyle = PAL.muted; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(dx, dy, r * 0.86, 0, Math.PI * 2); ctx.stroke();
      hbracket(ctx, dx - r, dx + r, dy - r - 20, cl);
      F.rich(ctx, ['dime, ', ['1.8 cm', cl], ' across'], dx, dy - r - 48, { size: 20, align: 'center' });
      ctx.restore();
    }
    /* the key to the tinted cube */
    F.legend(ctx, { l: 940, r: 1370, t: 30, b: 200 }, [{ s: u === 1 ? '1 cm³ = 1 mL' : '1 dm³ = 1 L', draw: (c, x, y) => { c.save(); c.fillStyle = PAL.soft; c.fillRect(x - 11, y - 11, 22, 22); c.fillStyle = alpha(cv, 0.4); c.fillRect(x - 11, y - 11, 22, 22); c.strokeStyle = PAL.ink; c.lineWidth = 1.5; c.strokeRect(x - 11, y - 11, 22, 22); c.restore(); } }], { corner: 'tr', size: 20 });
    const V = a * a * a, tc = (x) => commas(String(x)).replace(/,/g, '{,}'), side = hue('length', a + '\\ \\text{cm}');
    const more = a < 10 ? [tc(V) + '\\ \\text{mL}'] : a === 10 ? ['1{,}000\\ \\text{mL}', '1\\ \\text{L}'] : a < 100 ? [tc(V / 1000) + '\\ \\text{L}'] : ['1{,}000\\ \\text{L}', '1\\ \\text{m}^3'];
    say(`\\text{volume} = ${side} \\times ${side} \\times ${side} = ` + [tc(V) + '\\ \\text{cm}^3', ...more].map((x) => hue('volume', x)).join(' = '));
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   SIM: density from a cube on a balance. The solid is one of the seven
   of Table 1.4, the edge sets the volume and the balance reads the mass;
   beside it mass is plotted against volume, a line for each solid, so
   the cube's point climbs its solid's line as the cube grows. Still: the
   picture answers its controls.
===================================================================== */
(function () {
  const d = sim('sim-density', 560);
  /* Table 1.4's solids in the table's order and at its values; oak at the middle of the table's range, and lead at
     11.34 g/cm³ so that the cube of Example 1.1 weighs the example's 90.7 g (11.34 still reads 11.3 to three figures) */
  const MATS = [['ice', 0.92], ['oak', 0.75], ['iron', 7.9], ['copper', 9.0], ['lead', 11.34, 'lead'], ['silver', 10.5], ['gold', 19.3, 'gold']];
  /* seven solids are states the reader picks (rule 26.1): a dropdown, since a row of seven buttons would wrap */
  const M = F.select(d.controls, { label: '\\text{solid}', aria: 'the solid the cube is made of', options: MATS.map((m, i) => ({ value: String(i), label: m[0] })), value: '4', ms: 0 });
  const A = ctl(d.controls, { label: '\\text{edge length}', cls: 'length', min: 0.5, max: 3, step: 0.01, value: 2, unit: 'cm', dec: 2, aria: 'edge length of the cube in centimeters' });
  const box = { l: 800, r: 1240, t: 90, b: 450 };   /* axes fixed from the slider's maximum: a 3 cm cube is 27 cm³, and of gold 521 g */
  const hits = []; F.hover(d.stage, () => hits);
  const say = once(d.readout);
  function draw() {
    const { ctx } = begin(d.c);
    const which = +M.value, [name, rho] = MATS[which], a = A.v, V = a * a * a, m = rho * V;
    const cm = C('mass'), cv = C('volume'), cl = C('length');
    /* the cube of lead and the cube of gold are the section's referents; the other solids are told apart by the palette after them */
    const hueOf = (i) => (MATS[i][2] ? F.ref(MATS[i][2]) : F.cat(2 + i - MATS.slice(0, i).filter((x) => x[2]).length)), mine = hueOf(which);
    /* the balance, and the cube on its pan, at 78 logical units to the centimeter (60 in the model, drawn 1.3 times larger) */
    const ox = 370, oy = 400, e = a * 60, Z = 1.3, P = (x, y, z) => { const q = FRONT.P([x * Z, y * Z, z * Z]); return [ox + q[0], oy + q[1]]; };
    slab(ctx, P, -175, 175, -100, -24, -120, 120);
    slab(ctx, P, -24, 24, -24, -8, -24, 24, 2);
    slab(ctx, P, -135, 135, -8, 0, -105, 105);
    const [dl, dt] = P(-95, -44, 120), [dr, db] = P(95, -86, 120);
    ctx.save(); ctx.fillStyle = PAL.panel; ctx.strokeStyle = cm; ctx.lineWidth = 3; ctx.fillRect(dl, dt, dr - dl, db - dt); ctx.strokeRect(dl, dt, dr - dl, db - dt); ctx.restore();
    text(ctx, sig3(m) + ' g', (dl + dr) / 2, (dt + db) / 2, cm, { size: 24, weight: 600, align: 'center' });
    slab(ctx, P, -e / 2, e / 2, 0, e, -e / 2, e / 2);
    const [fx, f0] = P(e / 2, 0, e / 2), f1 = P(e / 2, e, e / 2)[1], top = P(0, e, -e / 2)[1];
    vbracket(ctx, fx + 22, f1, f0, cl);
    F.rich(ctx, ['a cube of ', [name, mine], ', ', [fmt(a, 2) + ' cm', cl], ' on an edge'], ox, top - 30, { size: 22, align: 'center' });
    /* mass against volume: a line through the origin for each solid, the chosen one heavy, and the cube's point on it */
    const ax = F.axes(ctx, box, [0, 27], [0, 600], { xl: 'volume (cm³)', xc: cv, yl: 'mass (g)', yc: cm, nx: 3, ny: 3 });
    MATS.forEach(([, r], i) => { if (i !== which) line(ctx, ax.X(0), ax.Y(0), ax.X(27), ax.Y(r * 27), alpha(hueOf(i), 0.6), 2.5); });
    line(ctx, ax.X(0), ax.Y(0), ax.X(27), ax.Y(rho * 27), mine, 5);
    line(ctx, ax.X(V), ax.Y(m), ax.X(V), box.b, cv, 2, [4, 8]); line(ctx, box.l, ax.Y(m), ax.X(V), ax.Y(m), cm, 2, [4, 8]);
    hits.length = 0;
    /* what a cube of each other solid would weigh at this volume: a ring on its line, named under the pointer */
    MATS.forEach(([n, r], i) => { if (i === which) return; dot(ctx, ax.X(V), ax.Y(r * V), hueOf(i), false, 5); hits.push({ x: ax.X(V), y: ax.Y(r * V), r: 11, name: n + ', ' + sig3(r * V) + ' g at ' + sig3(V) + ' cm³' }); });
    dot(ctx, ax.X(V), ax.Y(m), mine, true, 9);
    hits.push({ x: ax.X(V), y: ax.Y(m), r: 14, name: name + ', ' + sig3(m) + ' g at ' + sig3(V) + ' cm³' },
      { x: ox, y: (top + f0) / 2, r: e * 0.9, name: 'a cube of ' + name + ', ' + fmt(a, 2) + ' cm on an edge' }, { x: (dl + dr) / 2, y: (dt + db) / 2, r: 70, name: 'balance, reading ' + sig3(m) + ' g' });
    /* each line named at its right end, the names stepped apart where the lines end close together */
    const ends = MATS.map(([n, r], i) => ({ n, i, y0: ax.Y(r * 27), y: ax.Y(r * 27) })).sort((p, q) => p.y0 - q.y0);
    ends.forEach((t, j) => { if (j) t.y = Math.max(t.y, ends[j - 1].y + 30); });
    for (let j = ends.length - 1; j >= 0; j--) ends[j].y = Math.min(ends[j].y, j === ends.length - 1 ? box.b - 4 : ends[j + 1].y - 30);
    ends.forEach((t) => { line(ctx, box.r + 2, t.y0, box.r + 16, t.y, alpha(hueOf(t.i), 0.7), 1.5); text(ctx, t.n, box.r + 22, t.y, hueOf(t.i), { size: 18, weight: t.i === which ? 600 : 400 }); });
    const side = hue('length', fmt(a, 2) + '\\ \\text{cm}'), vol = hue('volume', sig3(V) + '\\ \\text{cm}^3');
    say(`${hue('volume', '\\text{volume}')} = ${side} \\times ${side} \\times ${side} = ${vol} \\\\ ` +
      `${hue('density', '\\text{density}')} = \\frac{${hue('mass', '\\text{mass}')}}{${hue('volume', '\\text{volume}')}} = \\frac{${hue('mass', sig3(m) + '\\ \\text{g}')}}{${vol}} = ${hue('density', sig3(Number(sig3(m)) / Number(sig3(V))) + '\\ \\text{g/cm}^3')}`);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   SIM: the volume of a block by displacement of water, and its density.
   The block is weighed on the balance, lifted, carried over the
   graduated cylinder and lowered into the water, which rises by the
   block's volume. Moving: the rise is the idea, and it happens while
   the block goes under. Five seconds, then a hold.
===================================================================== */
(function () {
  const d = sim('sim-displacement', 620);
  /* the samples Example 1.2, its Check Your Learning and exercise s1 measure, each with the density that gives the book's
     mass and the volume the book gives it (foam at 10.0 mL, so that its density carries the answer's three figures) */
  const SAMPLES = { iron: { rho: 7.87, vol: 4.0, ref: 'iron-block' }, wood: { rho: 0.65, vol: 3.0, ref: 'wood-block' }, foam: { rho: 0.230, vol: 10.0 }, unknown: { rho: 3.26, vol: 5.7 } };
  const T = 5, cy = cycle(() => T, 1.6);
  const M = F.choice(d.controls, { label: '\\text{sample}', aria: 'the sample the block is made of', options: Object.keys(SAMPLES).map((n) => ({ value: n, label: n })), value: 'iron', ms: 0, onInput: (v) => { VB.set(SAMPLES[v].vol); cy.reset(); } });
  const VB = ctl(d.controls, { label: '\\text{block volume}', cls: 'volume', min: 1, max: 15, step: 0.1, value: 4, unit: 'mL', dec: 1, aria: 'volume of the block in milliliters', onInput: () => cy.reset() });
  const V1 = 25.5;                                /* the water before the block goes in, as Example 1.2 reads it */
  const BENCH = 606, PANX = 380, PANY = 470;
  const CL = 900, CR = 1020, FLOOR = 590, PXML = 8, Y = (mL) => FLOOR - PXML * mL, RIM = Y(50) - 24, CX = (CL + CR) / 2;
  const hits = []; F.hover(d.stage, () => hits);
  const say = once(d.readout);
  const during = (p, a, b) => F.ease.smooth(clamp((p - a) / (b - a), 0, 1));
  function draw() {
    const { ctx } = begin(d.c);
    const name = M.value, S = SAMPLES[name], V = VB.v, mass = fmt(S.rho * V, 2), floats = S.rho < 1, p = cy.now() / T;
    const cm = C('mass'), cv = C('volume'), rc = S.ref ? F.ref(S.ref) : PAL.ink;
    /* the block in section: its width is a share of the cylinder's bore and its height its volume over that share, so the
       water it pushes aside is exactly the water that rises */
    const wb = Math.min(Math.sqrt((PXML * V * (CR - CL)) / 0.8), 100), hb = (PXML * V * (CR - CL)) / wb, share = wb / (CR - CL);
    /* where the block's foot is: on the pan, lifted clear, carried over the cylinder, lowered to the bottom or held just under */
    const rest = floats ? Y(V1 + V) + 14 + hb : FLOOR - 2, lift = during(p, 0.12, 0.34), over = during(p, 0.34, 0.56), down = during(p, 0.56, 0.92);
    const bx = PANX + (CX - PANX) * over, by = PANY + (RIM - 12 - PANY) * lift + (rest - (RIM - 12)) * down;
    /* the water level with the block's foot that far below the first level */
    const under = clamp((by - Y(V1)) / (1 - share), 0, hb), level = V1 + (V * under) / hb, risen = level - V1;
    line(ctx, 60, BENCH, 1340, BENCH, PAL.rule, 2);
    /* the balance: a pan on a stem over a body with a display, which reads the block only while it rests on the pan */
    ctx.save(); ctx.fillStyle = PAL.soft; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2.5; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.roundRect(PANX - 165, PANY + 26, 330, BENCH - PANY - 26, [14, 14, 4, 4]); ctx.fill(); ctx.stroke();
    ctx.fillRect(PANX - 14, PANY + 8, 28, 18); ctx.strokeRect(PANX - 14, PANY + 8, 28, 18);
    ctx.beginPath(); ctx.roundRect(PANX - 135, PANY, 270, 8, 3); ctx.fill(); ctx.stroke();
    ctx.fillStyle = PAL.panel; ctx.strokeStyle = cm; ctx.lineWidth = 3; ctx.fillRect(PANX - 95, PANY + 56, 190, 50); ctx.strokeRect(PANX - 95, PANY + 56, 190, 50); ctx.restore();
    const onPan = lift < 0.02;
    text(ctx, (onPan ? mass : '0.00') + ' g', PANX, PANY + 81, cm, { size: 24, weight: 600, align: 'center' });
    /* where the block was weighed, dashed once it has left, and the mass that was read there */
    if (!onPan) { ctx.save(); ctx.strokeStyle = alpha(rc, 0.6); ctx.lineWidth = 2; ctx.setLineDash([7, 7]); ctx.strokeRect(PANX - wb / 2, PANY - hb, wb, hb); ctx.restore(); }
    F.rich(ctx, [[name + ' block', rc], ', ', [mass + ' g', cm]], PANX - wb / 2 - 18, PANY - Math.min(hb, 70) / 2, { size: 20, align: 'right' });
    /* the water, then the block in front of it */
    ctx.save(); ctx.fillStyle = alpha(cv, 0.22); ctx.fillRect(CL, Y(level), CR - CL, FLOOR - Y(level)); ctx.restore();
    const hold = during(p, 0.12, 0.2);
    if (hold > 0) { ctx.save(); ctx.globalAlpha *= hold; line(ctx, bx, 0, bx, by - hb, PAL.ink, floats ? 4 : 1.5); ctx.restore(); }
    ctx.save(); ctx.fillStyle = PAL.panel; ctx.fillRect(bx - wb / 2, by - hb, wb, hb); ctx.fillStyle = alpha(rc, 0.3); ctx.strokeStyle = rc; ctx.lineWidth = 3; ctx.fillRect(bx - wb / 2, by - hb, wb, hb); ctx.strokeRect(bx - wb / 2, by - hb, wb, hb); ctx.restore();
    if (under > 0) { ctx.save(); ctx.fillStyle = alpha(cv, 0.16); ctx.fillRect(bx - wb / 2, by - under, wb, under); ctx.restore(); }
    /* the graduated cylinder: glass walls with a pouring lip, a foot, a mark at every milliliter */
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(CL - 16, RIM - 8); ctx.lineTo(CL, RIM + 8); ctx.lineTo(CL, FLOOR - 8); ctx.quadraticCurveTo(CL, FLOOR, CL + 8, FLOOR); ctx.lineTo(CR - 8, FLOOR); ctx.quadraticCurveTo(CR, FLOOR, CR, FLOOR - 8); ctx.lineTo(CR, RIM); ctx.stroke();
    ctx.fillStyle = PAL.soft; ctx.beginPath(); ctx.moveTo(CL - 6, FLOOR + 2); ctx.lineTo(CR + 6, FLOOR + 2); ctx.lineTo(CR + 44, BENCH); ctx.lineTo(CL - 44, BENCH); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore();
    for (let mL = 1; mL <= 50; mL++) { const big = mL % 10 === 0, mid = mL % 5 === 0; line(ctx, CL, Y(mL), CL + (big ? 30 : mid ? 20 : 11), Y(mL), PAL.ink, big ? 2 : 1.2); if (big) text(ctx, String(mL), CL - 14, Y(mL), PAL.muted, { size: 17, align: 'right' }); }
    text(ctx, 'mL', CL - 44, Y(50) - 30, PAL.muted, { size: 17, align: 'right' });
    /* the surface, a shallow meniscus read at its lowest point, and the two levels carried out to the right */
    ctx.save(); ctx.strokeStyle = cv; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(CL + 2, Y(level) - 3);
    if (under > 0 && under < hb) { ctx.quadraticCurveTo((CL + bx - wb / 2) / 2, Y(level) + 2, bx - wb / 2, Y(level)); ctx.moveTo(bx + wb / 2, Y(level)); ctx.quadraticCurveTo((CR + bx + wb / 2) / 2, Y(level) + 2, CR - 2, Y(level) - 3); }
    else ctx.quadraticCurveTo(CX, Y(level) + 3, CR - 2, Y(level) - 3);
    ctx.stroke(); ctx.restore();
    const XR = CR + 200;
    line(ctx, CR + 6, Y(V1), XR, Y(V1), cv, 2, [10, 10]);
    F.rich(ctx, ['before, ', [fmt(V1, 1) + ' mL', cv]], CR + 16, Y(V1) + 20, { size: 20 });
    if (risen > 0.04) {
      line(ctx, CR + 6, Y(level), XR, Y(level), cv, 2.5);
      F.rich(ctx, [under < hb ? 'now, ' : 'after, ', [fmt(level, 1) + ' mL', cv]], CR + 16, Y(level) - 20, { size: 20 });
      vbracket(ctx, XR + 14, Y(level), Y(V1), cv);
      F.rich(ctx, ['rise, ', [fmt(risen, 1) + ' mL', cv]], XR + 34, (Y(level) + Y(V1)) / 2, { size: 20 });
    }
    if (floats && down > 0.98) text(ctx, 'held under', CX + 14, RIM - 40, PAL.ink, { size: 18 });
    hits.length = 0;
    hits.push({ x: bx, y: by - hb / 2, r: Math.max(wb, hb) / 2 + 4, name: 'the ' + name + ' block, ' + mass + ' g' }, { x: PANX, y: PANY + 70, r: 80, name: 'balance, reading ' + (onPan ? mass : '0.00') + ' g' },
      { x: CX, y: (Y(level) + FLOOR) / 2, r: 60, name: 'water in the graduated cylinder, at ' + fmt(level, 1) + ' mL' });
    if (hold > 0) hits.push({ x: bx, y: (by - hb) / 2, r: 14, name: floats ? 'rod that holds the block under the water' : 'thread the block hangs on' });
    /* the readout is the measurement's result: the two readings subtracted, then the density to the figures the readings allow */
    const vs = fmt(V, 1), n = Math.min(sigOf(mass), sigOf(vs)), vol = hue('volume', vs + '\\ \\text{mL}');
    say(`${hue('volume', '\\text{volume}')} = ${hue('volume', fmt(V1 + V, 1) + '\\ \\text{mL}')} - ${hue('volume', fmt(V1, 1) + '\\ \\text{mL}')} = ${vol} \\\\ ` +
      `${hue('density', '\\text{density}')} = \\frac{${hue('mass', '\\text{mass}')}}{${hue('volume', '\\text{volume}')}} = \\frac{${hue('mass', mass + '\\ \\text{g}')}}{${vol}} = ${hue('density', sig(Number(mass) / Number(vs), n) + '\\ \\text{g/mL}')}`);
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();
};
