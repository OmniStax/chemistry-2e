/* Figures for section 1.2 Phases and Classification of Matter. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['1.2'] = function (root, F) {
const { el, fmt, tex, C, PAL, alpha, ctl, register, begin, line, arrow, dot, text, headline, topline } = F;
const sim = (id, H) => F.sim(root, id, H);
function readout(host, main, small) { tex(host, main); if (small) host.appendChild(el('small', null, small)); }

const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;
const TAU = 2 * Math.PI;
/* ---------- atoms in the element palette (rule 7.2) ----------
   Every atom is a filled disc in its element's colour through F.el; hydrogen is a light disc and takes an ink outline so that
   it reads on a light page. `namer` returns a function that draws one atom and records it for F.hover (rule 26.6). */
const NAME = { H: 'hydrogen', O: 'oxygen' };
function atom(ctx, x, y, sym, r) {
  ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fillStyle = F.el(sym); ctx.fill();
  ctx.lineWidth = sym === 'H' ? 2 : 1.2; ctx.strokeStyle = sym === 'H' ? PAL.ink : alpha(PAL.ink, 0.4); ctx.stroke(); ctx.restore();
}
function namer(hits) { return (ctx, x, y, sym, r, of) => { atom(ctx, x, y, sym, r); hits.push({ x, y, r: r + 3, name: NAME[sym] + ' atom of ' + of }); }; }
/* a molecule of two atoms of one element, turned by a; r the atom radius */
function diatomic(named, ctx, x, y, r, sym, a = 0) {
  const of = sym === 'H' ? 'a hydrogen molecule, H₂' : 'an oxygen molecule, O₂', dx = r * 0.85 * Math.cos(a), dy = r * 0.85 * Math.sin(a);
  named(ctx, x - dx, y - dy, sym, r, of); named(ctx, x + dx, y + dy, sym, r, of);
}
/* a water molecule: one oxygen and two hydrogens at the book's bent angle, turned by a */
function water(named, ctx, x, y, a = 0, k = 1) {
  const b = 13 * k, h = 0.912, hs = [a + Math.PI / 2 - h, a + Math.PI / 2 + h].map((q) => [x + b * Math.cos(q), y + b * Math.sin(q)]);
  hs.forEach(([hx, hy]) => named(ctx, hx, hy, 'H', 6.5 * k, 'a water molecule, H₂O'));
  named(ctx, x, y, 'O', 10 * k, 'a water molecule, H₂O');
}
const poly = (ctx, pts) => { ctx.beginPath(); pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.closePath(); };

/* =====================================================================
   FIGURE 1.6: one sample in two stoppered containers, a conical flask
   (the book's) and a cylinder, as a solid, a liquid or a gas, on wedges
   the reader tips. The solid keeps its shape, the liquid takes each
   container's shape under a surface that stays horizontal, the gas
   fills both. Flat (root rule 28.5): a section through each container
   shows every part of this; a turn added nothing. Still: the picture
   answers the state and the tilt; a change of state morphs the sample.
   Volumes are areas of the section, 320 square units to the millilitre,
   so the flask holds 250 mL, the cylinder 150 mL and the sample 80 mL.
===================================================================== */
(function () {
  const d = sim('sim-states', 660);
  const NAMES = ['solid', 'liquid', 'gas'];
  const Sc = F.choice(d.controls, { label: '\\text{state}', options: NAMES.map((n) => ({ value: n, label: n })), value: 'liquid', aria: 'state of the sample' });
  const Tilt = ctl(d.controls, { label: '\\text{tilt}', cls: '', min: 0, max: 20, step: 1, value: 12, unit: '°', dec: 0, aria: 'how far the containers are tipped' });
  const UNIT = 320, SAMPLE = 80, SIDE = Math.sqrt(SAMPLE * UNIT), BENCH = 570;
  /* each container in its own frame: origin at the middle of its base, y up. `inside` is the space under the stopper;
     `glass` the wall from the rim down one side, across the base and up the other; px the canvas x of its low corner */
  const VES = [
    { ref: 'wide', name: 'flask', cap: 250, px: 265, half: 216, neck: 38, top: 350, rim: 388, low: -216 + (178 / 300) * SIDE,
      inside: [[-216, 0], [216, 0], [38, 300], [38, 350], [-38, 350], [-38, 300]],
      glass: [[-44, 392], [-38, 386], [-38, 300], [-216, 0], [216, 0], [38, 300], [38, 386], [44, 392]] },
    { ref: 'narrow', name: 'cylinder', cap: 150, px: 965, half: 85, neck: 85, top: 282.35, rim: 320, low: -85,
      inside: [[-85, 0], [85, 0], [85, 282.35], [-85, 282.35]],
      glass: [[-91, 324], [-85, 318], [-85, 0], [85, 0], [85, 318], [91, 324]] },
  ];
  const area = (p) => Math.abs(p.reduce((s, a, i) => { const b = p[(i + 1) % p.length]; return s + a[0] * b[1] - b[0] * a[1]; }, 0)) / 2;
  /* the part of a polygon below the level c, measured along the true vertical of a frame tipped by th; `cut` the two points on the surface */
  function below(p, th, c) {
    const h = ([x, y]) => x * Math.sin(th) + y * Math.cos(th) - c, out = [], cut = [];
    p.forEach((a, i) => {
      const b = p[(i + 1) % p.length], ha = h(a), hb = h(b);
      if (ha <= 0) out.push(a);
      if ((ha < 0 && hb > 0) || (ha > 0 && hb < 0)) { const t = ha / (ha - hb), q = [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]; out.push(q); cut.push(q); }
    });
    return { out, cut };
  }
  /* the liquid: the level at which the part below it has the sample's volume */
  function liquid(v, th) {
    let lo = -300, hi = 700;
    for (let i = 0; i < 40; i++) { const mid = (lo + hi) / 2; if (area(below(v.inside, th, mid).out) < SAMPLE * UNIT) lo = mid; else hi = mid; }
    return below(v.inside, th, hi);
  }
  /* the solid: a square block on the floor, which slides to the low side as the container is tipped and keeps its shape */
  function solid(v, th) {
    const x0 = -SIDE / 2 + (v.low - -SIDE / 2) * F.ease.smooth(Math.min(1, th / 0.14));
    return [[x0, 0], [x0 + SIDE, 0], [x0 + SIDE, SIDE], [x0, SIDE]];
  }
  const shape = (v, th, s) => (s === 'solid' ? solid(v, th) : s === 'liquid' ? liquid(v, th).out : v.inside);
  const DEPTH = { solid: 0.78, liquid: 0.46, gas: 0.2 };
  const hits = []; F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c);
    hits.length = 0;
    const th = (Tilt.v * Math.PI) / 180, cs = Math.cos(th), sn = Math.sin(th), to = Sc.value, from = Sc.from, k = Sc.k, vol = C('volume');
    headline(ctx, { solid: 'A solid has a fixed shape and a fixed volume.', liquid: 'A liquid takes the shape of its container, with a horizontal surface and a fixed volume.', gas: 'A gas expands to fill its container.' }[to]);
    line(ctx, 60, BENCH, 1340, BENCH, PAL.muted, 3);
    for (const v of VES) {
      const W = ([x, y]) => [v.px + (x + v.half) * cs - y * sn, BENCH - ((x + v.half) * sn + y * cs)], rc = F.ref(v.ref);
      /* the wedge that tips it */
      if (th > 0) {
        const far = W([v.half, 0]);
        ctx.save(); ctx.fillStyle = PAL.soft; ctx.strokeStyle = PAL.muted; ctx.lineWidth = 2; poly(ctx, [[v.px, BENCH], far, [far[0], BENCH]]); ctx.fill(); ctx.stroke(); ctx.restore();
        hits.push({ x: far[0] - 30, y: (far[1] + BENCH) / 2 + 8, r: 26, name: 'a wedge under the ' + v.name });
      }
      /* the sample: the shape of the state shown, bending out of the one before it */
      const now = shape(v, th, to);
      const pts = (k < 1 && from !== to ? F.lerpPts(F.resample(shape(v, th, from), 72, true), F.resample(now, 72, true), k, true) : now).map(W);
      const depth = k < 1 ? DEPTH[from] + (DEPTH[to] - DEPTH[from]) * k : DEPTH[to];
      ctx.save(); poly(ctx, pts); ctx.fillStyle = alpha(vol, depth); ctx.fill();
      const edge = to === 'solid' ? k : from === 'solid' ? 1 - k : 0;
      if (edge > 0) { ctx.strokeStyle = alpha(vol, edge); ctx.lineWidth = 3; ctx.lineJoin = 'round'; ctx.stroke(); }
      ctx.restore();
      if (to === 'liquid' && k >= 1) { const c = liquid(v, th).cut.map(W); if (c.length === 2) line(ctx, c[0][0], c[0][1], c[1][0], c[1][1], vol, 3); }
      const mid = pts.reduce((s, p) => [s[0] + p[0] / pts.length, s[1] + p[1] / pts.length], [0, 0]);
      hits.push({ x: mid[0], y: mid[1], r: to === 'gas' ? 70 : 46, name: 'the ' + to + ', ' + (to === 'gas' ? v.cap : SAMPLE) + ' mL' });
      /* the stopper, wedged in the mouth, then the glass */
      const st = [[-v.neck + 2, v.top], [v.neck - 2, v.top], [v.neck + 7, v.rim + 26], [-v.neck - 7, v.rim + 26]].map(W);
      ctx.save(); poly(ctx, st); ctx.fillStyle = PAL.soft; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2.5; ctx.lineJoin = 'round'; ctx.fill(); ctx.stroke(); ctx.restore();
      const sm = W([0, v.rim]); hits.push({ x: sm[0], y: sm[1], r: 34, name: 'the stopper' });
      const g = v.glass.map(W);
      ctx.save(); ctx.strokeStyle = rc; ctx.lineWidth = 4; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.beginPath(); g.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.stroke(); ctx.restore();
      for (let i = 1; i < g.length; i++) { const n = Math.ceil(Math.hypot(g[i][0] - g[i - 1][0], g[i][1] - g[i - 1][1]) / 40); for (let j = 0; j <= n; j++) hits.push({ x: g[i - 1][0] + ((g[i][0] - g[i - 1][0]) * j) / n, y: g[i - 1][1] + ((g[i][1] - g[i - 1][1]) * j) / n, r: 12, name: 'the ' + v.name + ', ' + v.cap + ' mL' }); }
      const cx = v.px + v.half;
      text(ctx, v.name + ', ' + v.cap + ' mL', cx, BENCH + 32, rc, { size: 22, weight: 600, align: 'center' });
      F.rich(ctx, [[(to === 'gas' ? v.cap : SAMPLE) + ' mL', vol], ' of ' + to], cx, BENCH + 64, { size: 20, align: 'center' });
    }
    const mL = (n) => hue('volume', n + '\\ \\text{mL}');
    tex(d.readout, to === 'gas' ? `\\kV_{\\text{flask}} = ${mL(250)} \\\\ \\kV_{\\text{cylinder}} = ${mL(150)}` : `\\kV_{\\text{flask}} = \\kV_{\\text{cylinder}} = ${mL(SAMPLE)}`);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 1.8: conservation of matter, twice. A sealed bottle ferments
   on one balance and a lead-acid battery discharges on another. Beside
   each, one bar holds everything on that balance: its segments change
   as the sliders run and its two ends do not move. Still: each slider
   sets how far a change has run. The masses are the figure's own, in
   the ratios of the formula masses (glucose 180.16 to ethanol 92.14 and
   carbon dioxide 88.02; lead 207.2, lead oxide 239.2 and sulfuric acid
   196.2 to lead sulfate 606.6 and water 36.0); the book gives none.
===================================================================== */
(function () {
  const d = sim('sim-conservation', 640);
  const Fm = ctl(d.controls, { label: '\\text{fermented}', cls: '', key: 'fermented', min: 0, max: 100, step: 5, value: 50, unit: '%', dec: 0, aria: 'how much of the sugar has fermented' });
  const Ds = ctl(d.controls, { label: '\\text{discharged}', cls: '', key: 'discharged', min: 0, max: 100, step: 5, value: 50, unit: '%', dec: 0, aria: 'how far the battery has discharged' });
  const r1 = (x) => Math.max(0, Math.round(x * 10) / 10) + 0;
  const hits = []; F.hover(d.stage, () => hits);
  const AX = 200, BL = 430, BR = 1330;                      /* the apparatus column, and the two ends of each bar */
  /* a balance: a pan on a body whose display reads the mass, in the mass hue */
  function balance(ctx, y, w, reading) {
    ctx.save(); ctx.fillStyle = PAL.soft; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2.5; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.roundRect(AX - w / 2, y, w, 12, 4); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.roundRect(AX - w / 2 + 16, y + 12, w - 32, 50, 6); ctx.fill(); ctx.stroke();
    ctx.fillStyle = PAL.panel; ctx.strokeStyle = PAL.muted; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.roundRect(AX - 62, y + 21, 124, 32, 4); ctx.fill(); ctx.stroke(); ctx.restore();
    text(ctx, reading, AX, y + 38, C('mass'), { size: 22, weight: 600, align: 'center' });
    hits.push({ x: AX, y: y + 36, r: 40, name: 'a balance, reading ' + reading });
  }
  /* the bottle standing on y: liquid to the neck, the sugar on the floor in the sugar's colour, bubbles in the carbon dioxide's */
  function bottle(ctx, y, f, cSugar, cGas) {
    const path = () => { ctx.beginPath(); ctx.moveTo(AX - 38, y - 2); ctx.lineTo(AX - 38, y - 100); ctx.bezierCurveTo(AX - 38, y - 130, AX - 14, y - 134, AX - 14, y - 158); ctx.lineTo(AX - 14, y - 184); ctx.lineTo(AX + 14, y - 184); ctx.lineTo(AX + 14, y - 158); ctx.bezierCurveTo(AX + 14, y - 134, AX + 38, y - 130, AX + 38, y - 100); ctx.lineTo(AX + 38, y - 2); ctx.closePath(); };
    ctx.save(); path(); ctx.clip();
    ctx.fillStyle = alpha(PAL.ink, 0.1); ctx.fillRect(AX - 40, y - 150, 80, 150);
    const s = 20 * (1 - f); ctx.fillStyle = alpha(cSugar, 0.75); ctx.fillRect(AX - 40, y - 2 - s, 80, s);
    ctx.restore();
    const n = Math.round(16 * f);
    for (let i = 0; i < n; i++) { const bx = AX - 26 + ((i * 37) % 53), by = y - 30 - ((i * 53) % 105), br = 3 + (i % 3); if (Math.abs(bx - AX) > 10 && by < y - 118) continue; ctx.save(); ctx.strokeStyle = cGas; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(bx, by, br, 0, TAU); ctx.stroke(); ctx.restore(); }
    ctx.save(); ctx.strokeStyle = F.ref('bottle'); ctx.lineWidth = 4; ctx.lineJoin = 'round'; path(); ctx.stroke();
    ctx.fillStyle = F.ref('bottle'); ctx.beginPath(); ctx.roundRect(AX - 19, y - 198, 38, 16, 3); ctx.fill(); ctx.restore();
    hits.push({ x: AX, y: y - 190, r: 22, name: 'the cap that seals the bottle' }, { x: AX, y: y - 70, r: 44, name: 'the sealed bottle of beer precursor' });
    if (s > 2) hits.push({ x: AX, y: y - 8, r: 18, name: 'sugar' });
  }
  /* the battery standing on y: a case with its lid, posts and caps, cut away to show the plates in the acid; the plates wear
     the colours of lead and lead oxide and a coat of lead sulfate that thickens as the battery discharges */
  function battery(ctx, y, q, col) {
    const rc = F.ref('battery');
    ctx.save(); ctx.lineJoin = 'round';
    ctx.fillStyle = PAL.soft; ctx.strokeStyle = rc; ctx.lineWidth = 4; ctx.beginPath(); ctx.roundRect(AX - 115, y - 122, 230, 120, 6); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.roundRect(AX - 121, y - 140, 242, 18, 4); ctx.fill(); ctx.stroke();
    ctx.fillStyle = PAL.ink; [-84, 84].forEach((dx) => { ctx.beginPath(); ctx.roundRect(AX + dx - 9, y - 158, 18, 18, 2); ctx.fill(); });
    ctx.fillStyle = PAL.muted; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.roundRect(AX - 55 + i * 20, y - 147, 12, 7, 2); ctx.fill(); }
    /* the cutaway */
    ctx.beginPath(); ctx.roundRect(AX - 97, y - 106, 194, 90, 5); ctx.fillStyle = PAL.panel; ctx.fill(); ctx.save(); ctx.clip();
    ctx.fillStyle = alpha(col[2], 0.12 + 0.3 * (1 - q)); ctx.fillRect(AX - 97, y - 96, 194, 80);
    for (let i = 0; i < 10; i++) {
      const px = AX - 81 + i * 18;
      ctx.fillStyle = alpha(col[3], 0.85); ctx.fillRect(px - 2.5 - 4 * q, y - 90, 5 + 8 * q, 70);
      ctx.fillStyle = col[i % 2]; ctx.fillRect(px - 2.5 * (1 - 0.6 * q), y - 90, 5 * (1 - 0.6 * q), 70);
    }
    ctx.restore(); ctx.strokeStyle = PAL.muted; ctx.lineWidth = 2; ctx.stroke(); ctx.restore();
    text(ctx, '−', AX - 84, y - 174, PAL.ink, { size: 20, weight: 600, align: 'center' }); text(ctx, '+', AX + 84, y - 174, PAL.ink, { size: 20, weight: 600, align: 'center' });
    hits.push({ x: AX, y: y - 61, r: 46, name: 'plates of lead and lead oxide in sulfuric acid' }, { x: AX - 106, y: y - 60, r: 14, name: 'the lead-acid battery' }, { x: AX + 106, y: y - 60, r: 14, name: 'the lead-acid battery' }, { x: AX - 84, y: y - 150, r: 14, name: 'the negative post' }, { x: AX + 84, y: y - 150, r: 14, name: 'the positive post' });
  }
  /* one bar for everything on a balance: segments to scale between two fixed ends, the total bracketed above it in the
     mass hue, and beneath it the substances used up on one line and those formed, with the rest, on the next */
  function bar(ctx, y, where, total, segs) {
    const k = (BR - BL) / total; let x = BL;
    F.hbracket(ctx, BL, BR, y - 50, C('mass'), fmt(total, 1) + ' g', { size: 22 });
    text(ctx, where, BL, y - 74, PAL.ink, { size: 18 });
    segs.forEach((s) => {
      const w = s.g * k;
      if (w > 0.2) {
        ctx.save(); ctx.fillStyle = s.rest ? alpha(PAL.muted, 0.3) : s.color; ctx.fillRect(x, y - 28, w, 56);
        if (x > BL + 1) { ctx.fillStyle = PAL.panel; ctx.fillRect(x - 1, y - 28, 2, 56); } ctx.restore();
        for (let hx = x + Math.min(w / 2, 20); hx < x + w; hx += 40) hits.push({ x: hx, y, r: 24, name: s.name + ', ' + fmt(s.g, 1) + ' g' });
      }
      x += w;
    });
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2; ctx.strokeRect(BL, y - 28, BR - BL, 56); ctx.restore();
    const entry = (s) => ({ s: s.name + ' ' + fmt(s.g, 1) + ' g', color: s.rest ? alpha(PAL.muted, 0.3) : s.color, kind: 'swatch' });
    F.legend(ctx, { l: BL, r: BR, t: y - 28, b: y - 2 }, segs.filter((s) => s.used).map(entry), { corner: 'below', size: 18 });
    F.legend(ctx, { l: BL, r: BR, t: y - 28, b: y + 30 }, segs.filter((s) => !s.used).map(entry), { corner: 'below', size: 18 });
  }
  function draw() {
    const { ctx } = begin(d.c);
    hits.length = 0;
    const f = Fm.v / 100, q = Ds.v / 100, cm = (s) => hue('mass', fmt(s, 1) + '\\ \\text{g}');
    /* the bottle: 80 g of sugar in 500 g; the last product takes what the others leave, so the terms add up as written */
    const sugar = r1(80 * (1 - f)), eth = r1((80 * f * 92.14) / 180.16), co2 = r1(80 - sugar - eth);
    const A = [{ name: 'sugar', g: sugar, color: F.cat(0), used: true }, { name: 'ethanol', g: eth, color: F.cat(1) }, { name: 'carbon dioxide', g: co2, color: F.cat(2) }, { name: 'water and the rest', g: 420, rest: true }];
    bottle(ctx, 250, f, F.cat(0), F.cat(2)); balance(ctx, 250, 190, '500.0 g');
    bar(ctx, 150, 'in the sealed bottle', 500, A);
    /* the battery: one reaction's worth, 642.6 g, in 1000 g */
    const pb = r1(207.2 * (1 - q)), ox = r1(239.2 * (1 - q)), acid = r1(196.2 * (1 - q)), so4 = r1(606.6 * q), h2o = r1(642.6 - pb - ox - acid - so4);
    const col = [0, 1, 2, 3, 4].map((i) => F.cat(i));
    const B = [{ name: 'lead', g: pb, color: col[0], used: true }, { name: 'lead oxide', g: ox, color: col[1], used: true }, { name: 'sulfuric acid', g: acid, color: col[2], used: true },
      { name: 'lead sulfate', g: so4, color: col[3] }, { name: 'water', g: h2o, color: col[4] }, { name: 'the case and the rest', g: 357.4, rest: true }];
    battery(ctx, 548, q, col); balance(ctx, 548, 270, '1000.0 g');
    bar(ctx, 450, 'in the battery', 1000, B);
    tex(d.readout, `\\km_{\\text{bottle}} = ${A.map((s) => cm(s.g)).join(' + ')} = ${cm(500)} \\\\ \\km_{\\text{battery}} = ${B.map((s) => cm(s.g)).join(' + ')} = ${cm(1000)}`);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 1.11: the book's flowchart with a sample walked down it. A
   dropdown offers eight things the section's text names, two of each
   class; the questions it meets and the answers it gets are lit, and
   the two lines beneath give the book's reason for each answer. Still:
   a change of sample sends its tag down the new path.
===================================================================== */
(function () {
  const d = sim('fig-classify', 600);
  const SAMPLES = [
    { value: 'gold', label: 'gold', pure: true, yes: false, a1: 'every sample of gold has the same makeup and properties.', a2: 'no chemical change breaks gold down into simpler substances.' },
    { value: 'aluminum', label: 'aluminum', pure: true, yes: false, a1: 'every sample of aluminum has the same makeup and properties.', a2: 'no chemical change breaks aluminum down into simpler substances.' },
    { value: 'salt', label: 'table salt', pure: true, yes: true, a1: 'every sample of sodium chloride has the same makeup and properties.', a2: 'it is a combination of two elements, sodium and chlorine.' },
    { value: 'agcl', label: 'silver chloride', pure: true, yes: true, a1: 'every sample of silver chloride has the same makeup and properties.', a2: 'light breaks it down into its elements, silver and chlorine.' },
    { value: 'dressing', label: 'Italian dressing', pure: false, yes: false, a1: 'it may be prepared from varying amounts of oil, vinegar and herbs.', a2: 'one drop may be mostly vinegar and another mostly oil or herbs.' },
    { value: 'granite', label: 'granite', pure: false, yes: false, a1: 'its minerals can be present in varying amounts.', a2: 'the quartz, mica and feldspar can be seen as separate grains.' },
    { value: 'drink', label: 'a sports drink', pure: false, yes: true, a1: 'it could be made with somewhat more or less sugar or flavoring.', a2: 'each drop contains the same amounts of water, sugar and the other components.' },
    { value: 'brine', label: 'salt water', pure: false, yes: true, a1: 'it could be made with more or less salt.', a2: 'the salt is spread evenly through the water.' },
  ];
  const Pick = F.select(d.controls, { label: '\\text{sample}', options: SAMPLES.map(({ value, label }) => ({ value, label })), value: 'dressing', aria: 'the sample to classify' });
  const by = (v) => SAMPLES.find((s) => s.value === v) || SAMPLES[0];
  const END = [['Heterogeneous', 150], ['Homogeneous', 530], ['Element', 870], ['Compound', 1250]];
  const leaf = (s) => (s.pure ? 2 : 0) + (s.yes ? 1 : 0);
  /* the way down for a sample: through the first question, its class, the second question, to under its box */
  const route = (s) => { const cx = s.pure ? 1060 : 340, ex = END[leaf(s)][1]; return [[700, 50], [700, 122], [cx, 122], [cx, 282], [ex, 282], [ex, 484]]; };
  const along = (pts, k) => { const L = pts.slice(1).map((p, i) => Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1])); let r = k * L.reduce((a, b) => a + b, 0); for (let i = 0; i < L.length; i++) { if (r <= L[i]) return [pts[i][0] + ((pts[i + 1][0] - pts[i][0]) * r) / L[i], pts[i][1] + ((pts[i + 1][1] - pts[i][1]) * r) / L[i]]; r -= L[i]; } return pts[pts.length - 1]; };
  function box(ctx, x, y, w, h, label, fill, on, size = 22) {
    ctx.save(); ctx.fillStyle = fill; ctx.strokeStyle = on ? PAL.ink : alpha(PAL.muted, 0.55); ctx.lineWidth = on ? 4 : 2.5; ctx.beginPath(); ctx.roundRect(x - w / 2, y - h / 2, w, h, 10); ctx.fill(); ctx.stroke(); ctx.restore();
    const ls = label.split('\n'); ls.forEach((t, i) => text(ctx, t, x, y + (i - (ls.length - 1) / 2) * (size + 6), on ? PAL.ink : PAL.muted, { size, align: 'center', weight: 600 }));
  }
  /* an elbowed arrow: across from (x1, y) to x2, then down to y2, with its answer above the run */
  function turn(ctx, x1, y, x2, y2, word, on) {
    const c = on ? PAL.ink : alpha(PAL.muted, 0.55);
    line(ctx, x1, y, x2, y, c, on ? 5 : 3); arrow(ctx, x2, y, x2, y2, c, on ? 5 : 3);
    text(ctx, word, (x1 + x2) / 2, y - 22, on ? PAL.ink : PAL.muted, { size: 20, weight: 600, align: 'center' });
  }
  function draw() {
    const { ctx } = begin(d.c);
    const s = by(Pick.value), mix = !s.pure, n = leaf(s), Q = PAL.soft, B = PAL.panel;
    turn(ctx, 510, 122, 340, 180, 'No', mix); turn(ctx, 890, 122, 1060, 180, 'Yes', !mix);
    turn(ctx, 200, 282, 150, 388, 'No', n === 0); turn(ctx, 480, 282, 530, 388, 'Yes', n === 1);
    turn(ctx, 920, 282, 870, 388, 'No', n === 2); turn(ctx, 1200, 282, 1250, 388, 'Yes', n === 3);
    box(ctx, 700, 50, 280, 52, 'Matter', B, true);
    box(ctx, 700, 122, 400, 84, 'Does it have constant\nproperties and composition?', Q, true, 20);
    box(ctx, 340, 210, 280, 52, 'Mixture', B, mix); box(ctx, 340, 282, 280, 84, 'Is it uniform\nthroughout?', Q, mix, 20);
    box(ctx, 1060, 210, 280, 52, 'Pure substance', B, !mix); box(ctx, 1060, 282, 280, 84, 'Can it be simplified\nchemically?', Q, !mix, 20);
    END.forEach(([name, x], i) => box(ctx, x, 418, 260, 52, name, B, i === n));
    /* the sample's tag, on its way down or at rest under its class */
    const [tx, ty] = along(route(s), F.ease.smooth(Pick.k)), w = F.measure(ctx, s.label, { size: 22, weight: 600 }) + 36;
    ctx.save(); ctx.fillStyle = PAL.ink; ctx.beginPath(); ctx.roundRect(tx - w / 2, ty - 21, w, 42, 21); ctx.fill(); ctx.restore();
    text(ctx, s.label, tx, ty, PAL.panel, { size: 22, weight: 600, align: 'center' });
    const ans = (b) => [b ? 'Yes' : 'No', PAL.ink, 600];
    F.rich(ctx, ['Constant properties and composition? ', ans(s.pure), ': ' + s.a1], 700, 540, { size: 19, align: 'center' });
    F.rich(ctx, [(s.pure ? 'Can it be simplified chemically? ' : 'Uniform throughout? '), ans(s.yes), ': ' + s.a2], 700, 572, { size: 19, align: 'center' });
    tex(d.readout, `\\text{${s.label}} \\longrightarrow \\text{${s.pure ? 'pure substance' : 'mixture'}} \\longrightarrow \\text{${END[n][0].toLowerCase()}${s.pure ? '' : ' mixture'}}`);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 1.15: the decomposition of water, drawn flat as the book draws
   it. A battery stands in a beaker of water with an inverted test tube
   over each terminal; gas collects at the top of each tube, hydrogen
   over the negative terminal at twice the volume of the oxygen over the
   positive one. Beside it the book's three circles hold the molecules,
   counted: the water left, the hydrogen and the oxygen formed. Still:
   the slider sets how many of eight water molecules have decomposed.
   Flat (root rule 28.5): the lesson is two gas columns and three counts.
===================================================================== */
(function () {
  const d = sim('sim-electrolysis', 640);
  const ALL = 8;                                             /* the water molecules the picture starts with */
  const N = ctl(d.controls, { label: '\\text{water molecules decomposed}', cls: '', key: 'decomposed', min: 0, max: ALL, step: 2, value: 4, unit: '', dec: 0, aria: 'number of water molecules decomposed' });
  const hits = [], named = namer(hits); F.hover(d.stage, () => hits);
  const TUBE = [{ x: 262, ref: 'h2-tube', gas: 'hydrogen', sym: 'V_{H₂}', per: 36 }, { x: 338, ref: 'o2-tube', gas: 'oxygen', sym: 'V_{O₂}', per: 18 }];
  const TOP = 110, MOUTH = 412, TR = 30;                     /* a tube: the centre of its dome, its open mouth, its half width */
  const tubePath = (ctx, x) => { ctx.beginPath(); ctx.moveTo(x - TR, MOUTH); ctx.lineTo(x - TR, TOP); ctx.arc(x, TOP, TR, Math.PI, 0); ctx.lineTo(x + TR, MOUTH); };
  const CIRC = [{ x: 720, name: 'water' }, { x: 980, name: 'hydrogen', ref: 'h2-tube' }, { x: 1240, name: 'oxygen', ref: 'o2-tube' }], CY = 300, CR = 110;
  const S8 = [[0, 0]].concat(Array.from({ length: 7 }, (_, i) => [72 * Math.sin((i * TAU) / 7), -72 * Math.cos((i * TAU) / 7)]));
  const S4 = [[-38, -36], [38, -36], [-38, 36], [38, 36]];
  const turnOf = (i) => ((i * 2.4) % TAU);
  function draw() {
    const { ctx } = begin(d.c);
    hits.length = 0;
    const n = N.v, vol = C('volume'), wet = alpha(PAL.muted, 0.2), count = [ALL - n, n, n / 2];
    /* the beaker's water */
    ctx.save(); ctx.fillStyle = wet; ctx.beginPath(); ctx.roundRect(92, 335, 416, 263, [0, 0, 14, 14]); ctx.fill(); ctx.restore();
    line(ctx, 92, 335, 508, 335, alpha(PAL.ink, 0.45), 1.5);
    /* the battery standing on the floor of the beaker, its terminals on top */
    ctx.save(); ctx.lineJoin = 'round'; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2.5;
    ctx.fillStyle = PAL.soft; ctx.beginPath(); ctx.roundRect(225, 462, 150, 134, [0, 0, 6, 6]); ctx.fill(); ctx.stroke();
    ctx.fillStyle = PAL.ink; ctx.beginPath(); ctx.roundRect(225, 420, 150, 44, [6, 6, 0, 0]); ctx.fill(); ctx.stroke();
    ctx.fillStyle = PAL.muted; TUBE.forEach((t) => { ctx.beginPath(); ctx.roundRect(t.x - 13, 404, 26, 16, 3); ctx.fill(); ctx.stroke(); });
    ctx.restore();
    text(ctx, '−', 262, 442, PAL.panel, { size: 26, weight: 600, align: 'center' }); text(ctx, '+', 338, 442, PAL.panel, { size: 26, weight: 600, align: 'center' });
    text(ctx, 'battery', 300, 530, PAL.ink, { size: 20, align: 'center' });
    text(ctx, 'water', 445, 560, PAL.ink, { size: 20, align: 'center' });
    hits.push({ x: 300, y: 500, r: 60, name: 'the battery' }, { x: 262, y: 412, r: 14, name: 'the negative terminal' }, { x: 338, y: 412, r: 14, name: 'the positive terminal' }, { x: 150, y: 470, r: 50, name: 'water in the beaker' }, { x: 450, y: 440, r: 50, name: 'water in the beaker' });
    /* the two tubes: water held up inside each, and the gas collected above it */
    TUBE.forEach((t, i) => {
      const gb = TOP - TR + t.per * n, rc = F.ref(t.ref);
      ctx.save(); tubePath(ctx, t.x); ctx.closePath(); ctx.clip();
      ctx.fillStyle = PAL.panel; ctx.fillRect(t.x - TR, TOP - TR, 2 * TR, MOUTH - TOP + TR);
      ctx.fillStyle = wet; ctx.fillRect(t.x - TR, gb, 2 * TR, MOUTH - gb);
      if (n) { ctx.fillStyle = alpha(vol, 0.4); ctx.fillRect(t.x - TR, TOP - TR, 2 * TR, gb - TOP + TR); }
      ctx.restore();
      if (n) line(ctx, t.x - TR + 2, gb, t.x + TR - 2, gb, alpha(PAL.ink, 0.45), 1.5);
      /* bubbles rising from the terminal */
      if (n) [[-8, 392, 4], [7, 372, 5], [-4, 348, 4.5], [9, 322, 5.5], [-9, 296, 5], [5, 268, 5.5], [-6, 238, 5]].forEach(([dx, by, br]) => { if (by < gb + 14) return; ctx.save(); ctx.fillStyle = PAL.panel; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(t.x + dx, by, br, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore(); hits.push({ x: t.x + dx, y: by, r: br + 5, name: 'a bubble of ' + t.gas }); });
      ctx.save(); ctx.strokeStyle = rc; ctx.lineWidth = 3.5; ctx.lineCap = 'round'; tubePath(ctx, t.x); ctx.stroke(); ctx.restore();
      for (let y = TOP; y <= MOUTH; y += 30) hits.push({ x: t.x + (i ? TR : -TR), y, r: 10, name: 'the ' + t.gas + ' tube, over the ' + (i ? 'positive' : 'negative') + ' terminal' });
      text(ctx, t.gas, i ? t.x - TR + 6 : t.x + TR - 6, 50, rc, { size: 22, weight: 600, align: i ? 'left' : 'right' });
      if (n) { F.vbracket(ctx, i ? 396 : 204, TOP - TR, gb, vol, t.sym, i ? 1 : -1, { size: 22 }); hits.push({ x: t.x, y: (TOP - TR + gb) / 2, r: 26, name: t.gas + ' gas collected' }); }
    });
    /* the beaker's glass, drawn over the water */
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3.5; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(80, 296); ctx.lineTo(90, 302); ctx.lineTo(90, 584); ctx.arcTo(90, 600, 106, 600, 16); ctx.lineTo(494, 600); ctx.arcTo(510, 600, 510, 584, 16); ctx.lineTo(510, 302); ctx.lineTo(520, 296); ctx.stroke(); ctx.restore();
    [[90, 380], [90, 520], [510, 380], [510, 520], [200, 600], [400, 600]].forEach(([x, y]) => hits.push({ x, y, r: 14, name: 'the beaker' }));
    /* the molecules, counted: the water left, then the hydrogen and the oxygen formed, each circle in its tube's colour */
    CIRC.forEach((c, i) => {
      const rc = c.ref ? F.ref(c.ref) : PAL.ink;
      ctx.save(); ctx.strokeStyle = rc; ctx.lineWidth = 3.5; ctx.beginPath(); ctx.arc(c.x, CY, CR, 0, TAU); ctx.stroke(); ctx.restore();
      for (let j = 0; j < count[i]; j++) {
        if (i === 0) water(named, ctx, c.x + S8[j][0], CY + S8[j][1], turnOf(j), 1.3);
        else if (i === 1) diatomic(named, ctx, c.x + S8[j][0], CY + S8[j][1], 12, 'H', turnOf(j + 3));
        else diatomic(named, ctx, c.x + S4[j][0], CY + S4[j][1], 16, 'O', turnOf(j + 1));
      }
      text(ctx, c.name, c.x, CY + CR + 34, rc, { size: 24, weight: 600, align: 'center' });
      text(ctx, count[i] + ' ' + ['H₂O(l)', 'H₂(g)', 'O₂(g)'][i], c.x, CY + CR + 68, PAL.ink, { size: 24, align: 'center' });
    });
    arrow(ctx, 836, CY, 866, CY, PAL.ink, 4);
    text(ctx, '+', 1110, CY, PAL.ink, { size: 32, weight: 600, align: 'center' });
    const eq = n ? `${n}\\,\\text{H}_2\\text{O}(l) \\longrightarrow ${n}\\,\\text{H}_2(g) + ${n === 2 ? '' : n / 2 + '\\,'}\\text{O}_2(g)` : '2\\,\\text{H}_2\\text{O}(l) \\longrightarrow 2\\,\\text{H}_2(g) + \\text{O}_2(g)';
    tex(d.readout, eq + ' \\\\ \\kV_{\\text{H}_2} = 2\\,\\kV_{\\text{O}_2}');
  }
  register(d.fig, { update: () => {}, draw });
})();
};
