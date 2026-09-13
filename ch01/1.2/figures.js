/* Figures for section 1.2 Phases and Classification of Matter. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['1.2'] = function (root, F) {
const { el, fmt, tex, C, PAL, alpha, ctl, register, begin, line, arrow, dot, text, headline, topline } = F;
const sim = (id, H) => F.sim(root, id, H);
function readout(host, main, small) { tex(host, main); if (small) host.appendChild(el('small', null, small)); }

/* ---------- small helpers shared by the figures ---------- */
/* a rounded box with a label inside, centred on (x, y) */
function box(ctx, x, y, w, h, label, fill, color, size = 22) {
  const r = 10; ctx.save(); ctx.fillStyle = fill; ctx.strokeStyle = color; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(x - w / 2 + r, y - h / 2); ctx.arcTo(x + w / 2, y - h / 2, x + w / 2, y + h / 2, r); ctx.arcTo(x + w / 2, y + h / 2, x - w / 2, y + h / 2, r);
  ctx.arcTo(x - w / 2, y + h / 2, x - w / 2, y - h / 2, r); ctx.arcTo(x - w / 2, y - h / 2, x + w / 2, y - h / 2, r); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore();
  const lines = label.split('\n'); lines.forEach((s, i) => text(ctx, s, x, y + (i - (lines.length - 1) / 2) * (size + 6), PAL.ink, { size, align: 'center', weight: 600 }));
}
/* an open-topped container: walls and floor, with (x1, x2) the walls and (top, bot) the rim and the floor */
function beaker(ctx, x1, x2, top, bot) {
  ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x1, top); ctx.lineTo(x1, bot); ctx.lineTo(x2, bot); ctx.lineTo(x2, top); ctx.stroke();
  ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x1 - 14, top); ctx.lineTo(x1, top); ctx.moveTo(x2, top); ctx.lineTo(x2 + 14, top); ctx.stroke(); ctx.restore();
}
/* a balance under an object: a platform on a base with a display reading the mass in the mass hue */
function balance(ctx, x, y, w, reading) {
  ctx.save(); ctx.fillStyle = PAL.soft; ctx.strokeStyle = PAL.muted; ctx.lineWidth = 3;
  ctx.fillRect(x - w / 2, y, w, 14); ctx.strokeRect(x - w / 2, y, w, 14);
  ctx.fillRect(x - w / 2 + 30, y + 14, w - 60, 54); ctx.strokeRect(x - w / 2 + 30, y + 14, w - 60, 54); ctx.restore();
  text(ctx, reading, x, y + 42, C('mass'), { size: 24, weight: 600, align: 'center', bg: PAL.panel });
}
/* a deterministic scatter, the same on every redraw */
const rnd = (i) => { const s = Math.sin(i * 12.9898 + 78.233) * 43758.5453; return s - Math.floor(s); };
const TAU = 2 * Math.PI;
/* ---------- atoms in the element palette (rule 7.2) ----------
   Every atom is a filled disc in its element's colour through F.el; hydrogen is a light disc and takes an ink outline so that
   it reads on a light page. Each figure keeps a list of the discs it drew this frame and hands it to F.hover, so that every
   atom names itself under the pointer (rule 26.6). `named` draws one atom and records it. */
const NAME = { H: 'hydrogen', O: 'oxygen', C: 'carbon', P: 'phosphorus', S: 'sulfur' };
function atom(ctx, x, y, sym, r) {
  ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fillStyle = F.el(sym); ctx.fill();
  ctx.lineWidth = sym === 'H' ? 2 : 1.2; ctx.strokeStyle = sym === 'H' ? PAL.ink : alpha(PAL.ink, 0.4); ctx.stroke(); ctx.restore();
}
function namer(hits) { return (ctx, x, y, sym, r, of) => { atom(ctx, x, y, sym, r); hits.push({ x, y, r: r + 3, name: NAME[sym] + ' atom' + (of ? ' of ' + of : '') }); }; }
/* a molecule of two atoms of one element side by side; r the atom radius */
function diatomic(named, ctx, x, y, r, sym) { const of = sym === 'H' ? 'a hydrogen molecule, H₂' : 'an oxygen molecule, O₂'; line(ctx, x - r * 0.9, y, x + r * 0.9, y, PAL.ink, 3); named(ctx, x - r * 0.9, y, sym, r, of); named(ctx, x + r * 0.9, y, sym, r, of); }
/* a water molecule: one oxygen and two hydrogens at the book's bent angle, turned by a */
function water(named, ctx, x, y, a = 0, k = 1) {
  const b = 15 * k, h = 0.912, hs = [a + Math.PI / 2 - h, a + Math.PI / 2 + h].map((q) => [x + b * Math.cos(q), y + b * Math.sin(q)]);
  hs.forEach(([hx, hy]) => line(ctx, x, y, hx, hy, PAL.ink, 2.5));
  named(ctx, x, y, 'O', 10 * k, 'a water molecule, H₂O'); hs.forEach(([hx, hy]) => named(ctx, hx, hy, 'H', 6.5 * k, 'a water molecule, H₂O'));
}

/* ---------- three dimensions ----------
   The book's rule for this chapter (Chemistry 2e RULES.md, Figures): a
   particle picture is three-dimensional, spheres in a vessel the reader
   turns, its readings on a flat strip beneath; an experiment or apparatus
   is a bench with a bounded orbit that never shows its underside. The
   viewer, the meshes and the buttons come from the library (F.view3d,
   F.mesh); what stays here is how a water, hydrogen or oxygen molecule is
   built and how a glass vessel is drawn. */
const T3D = window.THREE;
const { sphere: sphere3, stick: stick3, box: box3, mat: mat3 } = F.mesh;
/* the signature of everything a scene's colours are read from, so a theme change rebuilds it */
const palSig = () => [PAL.ink, PAL.panel, PAL.soft, PAL.muted, F.CC, F.el('O'), F.el('H'), C('volume')].join('|');
/* a figlib canvas beneath the viewer: the headline and the readings on a flat strip */
const strip = (d, H) => F.makeCanvas(d.stage, H);
/* the glass of a vessel: the ink at a tenth, both faces, never hiding what is inside */
const glass = (extra = {}) => ({ transparent: true, opacity: 0.1, depthWrite: false, side: T3D.DoubleSide, ...extra });
/* the edges of a box, in ink, so a transparent vessel keeps its outline */
function edges3(g, size, at = [0, 0, 0]) {
  const e = new T3D.LineSegments(new T3D.EdgesGeometry(new T3D.BoxGeometry(size[0], size[1], size[2])), new T3D.LineBasicMaterial({ color: new T3D.Color(PAL.ink) }));
  e.position.set(at[0], at[1], at[2]); g.add(e); return e;
}
/* an open cylinder of glass standing on its base: a tube or a beaker of radius r and height h whose bottom is at y0 */
function tube3(g, x, y0, z, r, h, open = 'top') {
  const m = new T3D.Mesh(new T3D.CylinderGeometry(r, r, h, 28, 1, true), mat3(PAL.ink, glass())); m.position.set(x, y0 + h / 2, z); m.renderOrder = 2; g.add(m);
  const cap = new T3D.Mesh(new T3D.CircleGeometry(r, 28), mat3(PAL.ink, glass())); cap.rotation.x = open === 'top' ? Math.PI / 2 : -Math.PI / 2; cap.position.set(x, open === 'top' ? y0 : y0 + h, z); cap.renderOrder = 2; g.add(cap);
  return m;
}
/* a column of liquid or gas inside a tube: a solid cylinder of radius r from y0 up h, in a colour at an opacity */
function column3(g, x, y0, z, r, h, color, opacity) {
  const m = new T3D.Mesh(new T3D.CylinderGeometry(r, r, Math.max(h, 1e-3), 28), mat3(color, { transparent: true, opacity, depthWrite: false })); m.position.set(x, y0 + h / 2, z); g.add(m); return m;
}
const V3 = {
  add: (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]],
  mul: (a, k) => [a[0] * k, a[1] * k, a[2] * k],
  cross: (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]],
  unit: (a) => { const l = Math.hypot(a[0], a[1], a[2]) || 1; return [a[0] / l, a[1] / l, a[2] / l]; },
};
/* a frame of two perpendicular unit vectors from three numbers in 0..1, so a molecule is turned the same way on every rebuild */
function frame(a0, a1, a2) {
  const a = V3.unit([a0 - 0.5, a1 - 0.5, a2 - 0.5]), t = Math.abs(a[1]) < 0.9 ? [0, 1, 0] : [1, 0, 0];
  const u = V3.unit(V3.cross(a, t)); return [u, V3.cross(a, u)];
}
/* one water molecule in the scene at p, turned by the frame (u, w), every sphere named for the pointer (rule 26.6); k scales it */
function water3(v, g, p, u, w, k = 1, of = 'a water molecule, H₂O') {
  const h = 0.912, b = 0.2 * k;
  v.pickable(sphere3(g, p, 0.1 * k, F.el('O')), NAME.O + ' atom of ' + of);
  [-h, h].forEach((q) => {
    const hp = V3.add(p, V3.mul(V3.add(V3.mul(u, Math.cos(q)), V3.mul(w, Math.sin(q))), b));
    stick3(g, p, hp, 0.028 * k, PAL.ink); v.pickable(sphere3(g, hp, 0.065 * k, F.el('H')), NAME.H + ' atom of ' + of);
  });
}
/* a molecule of two atoms of one element at p along the unit vector u, r the atom radius */
function diatomic3(v, g, p, u, sym, r) {
  const of = sym === 'H' ? 'a hydrogen molecule, H₂' : 'an oxygen molecule, O₂', a = V3.add(p, V3.mul(u, -r * 0.9)), b = V3.add(p, V3.mul(u, r * 0.9));
  stick3(g, a, b, r * 0.3, PAL.ink); v.pickable(sphere3(g, a, r, F.el(sym)), NAME[sym] + ' atom of ' + of); v.pickable(sphere3(g, b, r, F.el(sym)), NAME[sym] + ' atom of ' + of);
}

/* =====================================================================
   FIGURE 1.6: one sample in two containers, in three dimensions. A state
   choice moves the sample from solid to liquid to gas, and a volume
   slider sizes it. The solid keeps its shape in both containers, the
   liquid keeps its volume at two different heights, the gas fills both,
   and the water molecules inside each say why, packed as a lattice, a
   crowd or a few far apart. Still: the idea has no time in it, so the
   scene spins idly until taken hold of. The containers stand on a
   ground, so the pitch is kept between level and 72° above it and the
   scene is never seen from beneath; the yaw is free.
===================================================================== */
(function () {
  const d = sim('sim-states');
  const v = F.view3d(d.stage, { spin: 'idle', pitch: [0.0, 1.25], views: [{ label: 'front', yaw: 0, pitch: 0.16 }, { label: 'above', yaw: 0, pitch: 1.1 }], h: 440, dist: 8, tilt: 0.22 });
  const grp = v.part(0), cnv = strip(d, 200);
  const NAMES = ['solid', 'liquid', 'gas'];
  /* the state is a thing the reader switches between, never slides through (rule 26.1): three buttons, the current one marked */
  const Sc = F.choice(d.controls, { label: '\\text{state}', options: NAMES.map((n, i) => ({ value: String(i), label: n })), value: '0', aria: 'state of the sample' });
  const S = { get v() { return +Sc.value; } };
  const V = ctl(d.controls, { label: '\\kV', cls: 'volume', min: 50, max: 200, step: 10, value: 100, unit: 'mL', dec: 0, aria: 'volume of the sample' });
  /* the containers: the narrow one holds 300 mL in its full height, so one mL is its volume over 300 in either; a solid of two thirds of it is a cube narrower than the container, since the height is under one and a half times the width */
  const HT = 1.4, DP = 1.1, NARROW = { x: -1.55, w: 1.1 }, WIDE = { x: 1.05, w: 2.2 }, FLOOR = -0.75, K = (NARROW.w * DP * HT) / 300;
  const ICE = 1.09, NMOL = 27;   /* ice takes about a tenth more room than the water it froze from; the sample is the same 27 molecules in every state */
  const cap = (c) => (c.w * DP * HT) / K;
  /* the sample is given an identity so that its particles can have one (rule 7.2): it is water, drawn molecule by molecule
     in the element palette inside each container, and the phase is told by how the molecules pack, never by a tint alone */
  function sample(c, state, vol) {
    const hue = C('volume'), tint = (p, size, op) => box3(grp, p, size, hue, { transparent: true, opacity: op, depthWrite: false });
    const pts = [];
    if (state === 0) {
      /* water is one of the few substances that expand on freezing, by about a tenth, so the ice of a sample is larger than the liquid */
      const s = Math.cbrt(K * vol * ICE), n = 3, sp = s / n;
      v.pickable(tint([c.x, FLOOR + s / 2, 0], [s, s, s], 0.28), 'the water as a solid, ' + fmt(vol * ICE, 0) + ' mL of ice');
      edges3(grp, [s, s, s], [c.x, FLOOR + s / 2, 0]);
      for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) for (let k = 0; k < n; k++) pts.push({ p: [c.x - s / 2 + sp * (i + 0.5), FLOOR + sp * (j + 0.5), -s / 2 + sp * (k + 0.5)], f: frame(0.5, 0.9, (i + j + k) % 2 ? 0.2 : 0.8), k: sp / 0.5 });
    } else if (state === 1) {
      const h = (K * vol) / (c.w * DP), n = NMOL;
      v.pickable(tint([c.x, FLOOR + h / 2, 0], [c.w - 0.02, h, DP - 0.02], 0.28), 'the water as a liquid, ' + vol + ' mL');
      for (let i = 0; i < n; i++) pts.push({ p: [c.x - c.w / 2 + 0.12 + rnd(i * 5) * (c.w - 0.24), FLOOR + 0.1 + rnd(i * 5 + 1) * Math.max(0.02, h - 0.2), -DP / 2 + 0.12 + rnd(i * 5 + 2) * (DP - 0.24)], f: frame(rnd(i * 5 + 3), rnd(i * 5 + 4), rnd(i * 5 + 5)), k: Math.min(1, Math.cbrt((c.w * DP * h) / n) / 0.5) });
    } else {
      /* the same sample in both vessels, so the wide one holds the same molecules more sparsely (it is one sample, not two) */
      const n = NMOL;
      v.pickable(tint([c.x, FLOOR + HT / 2, 0], [c.w - 0.02, HT - 0.02, DP - 0.02], 0.1), 'the water as a gas, ' + fmt(cap(c), 0) + ' mL');
      for (let i = 0; i < n; i++) pts.push({ p: [c.x - c.w / 2 + 0.15 + rnd(i * 7) * (c.w - 0.3), FLOOR + 0.15 + rnd(i * 7 + 1) * (HT - 0.3), -DP / 2 + 0.15 + rnd(i * 7 + 2) * (DP - 0.3)], f: frame(rnd(i * 7 + 3), rnd(i * 7 + 4), rnd(i * 7 + 5)), k: 1 });
    }
    pts.forEach(({ p, f, k }) => water3(v, grp, p, f[0], f[1], Math.max(0.6, Math.min(1.1, k))));
  }
  let sig = '';
  function build() {
    const key = [S.v, V.v, palSig()].join('|'); if (key === sig) return; sig = key;
    v.clear();
    box3(grp, [0, FLOOR - 0.1, 0], [5.2, 0.14, 2.2], PAL.soft);                                    /* the ground the containers stand on */
    for (const c of [NARROW, WIDE]) {
      const wallsOf = box3(grp, [c.x, FLOOR + HT / 2, 0], [c.w, HT, DP], PAL.ink, glass()); wallsOf.renderOrder = 2;
      edges3(grp, [c.w, HT, DP], [c.x, FLOOR + HT / 2, 0]);
      v.pickable(wallsOf, (c === NARROW ? 'a narrow container, ' : 'a wide container, ') + fmt(cap(c), 0) + ' mL');
      sample(c, S.v, V.v);
      v.label((c === NARROW ? 'a narrow container, ' : 'a wide container, ') + fmt(cap(c), 0) + ' mL', [c.x, FLOOR + HT + 0.06, 0], grp, c === NARROW ? 4 : 36);   /* above each container, the wide one's a line higher, so the two never meet as the scene turns */
    }
  }
  function draw() {
    build(); v.invalidate();
    const { ctx } = begin(cnv);
    const s = S.v, vol = V.v;
    text(ctx, 'the water as a ' + NAMES[s], 700, 92, PAL.ink, { size: 20, weight: 600, align: 'center' });
    const rows = [['They are packed in a fixed', 'arrangement and only vibrate,', 'so the sample keeps its shape.'], ['They stay close together but', 'slide past one another, so the', 'sample flows and keeps its volume.'], ['They are far apart and move', 'freely, so the sample spreads', 'to fill whatever holds it.']][s];
    rows.forEach((r, i) => text(ctx, r, 700, 124 + i * 22, PAL.muted, { size: 17, align: 'center' }));
    const H = [`A solid keeps its shape and its volume in either container, and the ${fmt(vol * ICE, 0)} mL of ice here is the same sample as the ${vol} mL of liquid, since water expands by about a tenth on freezing`,
      `A liquid takes the shape of each container but keeps its volume of ${vol} mL, forming a horizontal surface`,
      `A gas expands to fill its container, so the same ${NMOL} molecules occupy ${fmt(cap(NARROW), 0)} mL in one and ${fmt(cap(WIDE), 0)} mL in the other`][s];
    topline(ctx, H + '. Drag to turn the containers.');
    const R = [`\\kV = ${fmt(vol * ICE, 0)}\\ \\text{mL of ice in both containers, with the same shape in both}`,
      `\\kV = ${vol}\\ \\text{mL in both containers, at two heights}`,
      `\\kV = ${fmt(cap(NARROW), 0)}\\ \\text{mL in the narrow container and } ${fmt(cap(WIDE), 0)}\\ \\text{mL in the wide one}`][s];
    readout(d.readout, R, ['A solid is rigid and possesses a definite shape.', 'A liquid flows and takes the shape of its container, except that it forms a flat or slightly curved upper surface when acted upon by gravity.', 'A gas takes both the shape and volume of its container.'][s]);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 1.8: conservation of matter, twice. A sealed bottle ferments
   on one balance and a lead-acid battery discharges on another; the bars
   show the kinds of matter changing while each balance holds its
   reading. Still: each slider sets how far the change has run.
===================================================================== */
(function () {
  const d = sim('sim-conservation', 600);
  const Fm = ctl(d.controls, { label: '\\text{fermented}', cls: '', min: 0, max: 100, step: 1, value: 0, unit: '%', dec: 0, aria: 'fraction of the sugar fermented' });
  const Ds = ctl(d.controls, { label: '\\text{discharged}', cls: '', min: 0, max: 100, step: 1, value: 0, unit: '%', dec: 0, aria: 'fraction of the battery discharged' });
  /* the bottle: 960 g of water and the rest, 40 g of sugar; glucose becomes ethanol and carbon dioxide in the ratio 92.1 to 88.0 of its 180.2 */
  const SUGAR = 40, WATER = 960, ETH = 92.14 / 180.16, CO2 = 88.02 / 180.16;
  /* the battery: one reaction's worth of lead, lead oxide and sulfuric acid, 642.6 g, becomes lead sulfate and water */
  const PB = 207.2, PBO2 = 239.2, ACID = 196.2, PBSO4 = 606.6, H2O = 36.0;
  function bottle(ctx, x, y, fill) {
    ctx.save(); ctx.fillStyle = fill; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 4; ctx.beginPath();
    ctx.moveTo(x - 46, y); ctx.lineTo(x - 46, y - 150); ctx.quadraticCurveTo(x - 46, y - 190, x - 16, y - 210); ctx.lineTo(x - 16, y - 250); ctx.lineTo(x + 16, y - 250); ctx.lineTo(x + 16, y - 210);
    ctx.quadraticCurveTo(x + 46, y - 190, x + 46, y - 150); ctx.lineTo(x + 46, y); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.fillStyle = PAL.ink; ctx.fillRect(x - 20, y - 262, 40, 14); ctx.restore();
  }
  function battery(ctx, x, y) {
    ctx.save(); ctx.fillStyle = PAL.soft; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 4; ctx.fillRect(x - 110, y - 150, 220, 150); ctx.strokeRect(x - 110, y - 150, 220, 150);
    ctx.fillStyle = PAL.ink; ctx.fillRect(x - 70, y - 170, 24, 20); ctx.fillRect(x + 46, y - 170, 24, 20);
    ctx.strokeStyle = PAL.muted; ctx.lineWidth = 3; for (let i = 0; i < 6; i++) { const px = x - 90 + i * 36; ctx.beginPath(); ctx.moveTo(px, y - 130); ctx.lineTo(px, y - 20); ctx.stroke(); } ctx.restore();
    text(ctx, '−', x - 58, y - 186, PAL.ink, { size: 22, weight: 600, align: 'center' }); text(ctx, '+', x + 58, y - 186, PAL.ink, { size: 22, weight: 600, align: 'center' });
  }
  /* a labelled bar of mass: the name in ink, a bar drawn to scale in the mass hue, since its length is a mass and the bars of
     one balance add up to what that balance reads, and the grams */
  const BK = 0.22;   /* one scale for every bar of the figure: 0.22 canvas units to the gram, chosen so the longest bar and its number both fit */
  function bar(ctx, x, y, name, g, k) {
    text(ctx, name, x, y, PAL.ink, { size: 17, align: 'right' });
    if (g > 0.05) { ctx.save(); ctx.fillStyle = alpha(C('mass'), 0.35); ctx.fillRect(x + 12, y - 10, g * k, 20); ctx.restore(); }
    text(ctx, fmt(g, 1) + ' g', x + 12 + g * k + 8, y, C('mass'), { size: 17, weight: 600 });
  }
  function draw() {
    const { ctx } = begin(d.c);
    const f = Fm.v / 100, q = Ds.v / 100;
    /* (a) the bottle */
    bottle(ctx, 250, 410, alpha(PAL.ink, 0.06 + 0.08 * f));
    balance(ctx, 250, 412, 200, fmt(WATER + SUGAR, 1) + ' g');
    text(ctx, '(a)', 250, 520, PAL.muted, { size: 20, align: 'center' });
    bar(ctx, 500, 190, 'water and the rest', WATER, BK);
    bar(ctx, 500, 236, 'sugar', SUGAR * (1 - f), BK);
    bar(ctx, 500, 282, 'ethanol', SUGAR * f * ETH, BK);
    bar(ctx, 500, 328, 'carbon dioxide', SUGAR * f * CO2, BK);
    /* (b) the battery */
    battery(ctx, 900, 410);
    balance(ctx, 900, 412, 260, fmt(PB + PBO2 + ACID, 1) + ' g');
    text(ctx, '(b)', 900, 520, PAL.muted, { size: 20, align: 'center' });
    bar(ctx, 1150, 170, 'lead', PB * (1 - q), BK);
    bar(ctx, 1150, 216, 'lead oxide', PBO2 * (1 - q), BK);
    bar(ctx, 1150, 262, 'sulfuric acid', ACID * (1 - q), BK);
    bar(ctx, 1150, 308, 'lead sulfate', PBSO4 * q, BK);
    bar(ctx, 1150, 354, 'water', H2O * q, BK);
    text(ctx, 'every bar of both panels is drawn to one scale', 500, 384, PAL.muted, { size: 16 });
    text(ctx, 'sugar → ethanol + carbon dioxide', 250, 120, PAL.ink, { size: 17, align: 'center' });
    text(ctx, 'lead + lead oxide + sulfuric acid → lead sulfate + water', 900, 120, PAL.ink, { size: 17, align: 'center' });
    const fs = Fm.v, ds = Ds.v;
    headline(ctx, fs === 0 && ds === 0 ? 'Nothing has changed yet, so the bottle weighs 1000.0 g and the battery’s reacting substances 642.6 g.'
      : `With the sugar ${fs}% fermented and the battery ${ds}% discharged, the kinds of matter have changed and neither balance has moved.`);
    readout(d.readout, `\\km_{\\text{before}} = \\km_{\\text{after}} = ${fmt(WATER + SUGAR, 1)}\\ \\text{g and } ${fmt(PB + PBO2 + ACID, 1)}\\ \\text{g}`,
      'The bottle is sealed, so the carbon dioxide stays inside and is weighed with the rest; if the bottle were open, the gas would escape and the balance would read less, though no matter would have been destroyed.');
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 1.11: the classification of matter, redrawn faithfully as the
   book's flowchart. No sliders, no motion.
===================================================================== */
(function () {
  const d = sim('fig-classify', 470);
  const Q = PAL.soft, B = PAL.panel;
  function down(ctx, x1, y1, x2, y2, label) {
    /* an elbowed arrow: across from (x1, y1) to x2, then down to y2, with its word above the horizontal run */
    line(ctx, x1, y1, x2, y1, PAL.muted, 4); arrow(ctx, x2, y1, x2, y2, PAL.muted, 4);
    text(ctx, label, (x1 + x2) / 2, y1 - 20, PAL.ink, { size: 20, weight: 600, align: 'center' });
  }
  function draw() {
    const { ctx } = begin(d.c);
    box(ctx, 700, 50, 280, 52, 'Matter', B, PAL.muted);
    box(ctx, 700, 122, 380, 84, 'Does it have constant\nproperties and composition?', Q, PAL.muted, 20);
    down(ctx, 510, 122, 340, 176, 'No'); down(ctx, 890, 122, 1060, 176, 'Yes');
    box(ctx, 340, 210, 280, 52, 'Mixture', B, PAL.muted);
    box(ctx, 340, 282, 280, 84, 'Is it uniform\nthroughout?', Q, PAL.muted, 20);
    box(ctx, 1060, 210, 280, 52, 'Pure substance', B, PAL.muted);
    box(ctx, 1060, 282, 280, 84, 'Can it be simplified\nchemically?', Q, PAL.muted, 20);
    down(ctx, 200, 282, 150, 384, 'No'); down(ctx, 480, 282, 530, 384, 'Yes');
    down(ctx, 920, 282, 870, 384, 'No'); down(ctx, 1200, 282, 1250, 384, 'Yes');
    box(ctx, 150, 418, 260, 52, 'Heterogeneous', B, PAL.muted); box(ctx, 530, 418, 260, 52, 'Homogeneous', B, PAL.muted);
    box(ctx, 870, 418, 260, 52, 'Element', B, PAL.muted); box(ctx, 1250, 418, 260, 52, 'Compound', B, PAL.muted);
    readout(d.readout, '\\text{matter} \\longrightarrow \\text{mixture or pure substance}', 'A mixture is heterogeneous or homogeneous, and a pure substance is an element or a compound, so two questions are enough to place any sample.');
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 1.14: the molecules the book draws, redrawn live. Two atoms of
   one element make hydrogen and oxygen, four make a phosphorus molecule
   and eight a sulfur one; water, carbon dioxide and glucose are made of
   atoms of different elements. Every atom is a disc in its element's
   colour through F.el and names itself under the pointer (rule 26.6).
   The book prints the flat ball-and-stick pictures it teaches from, so
   the figure is built both ways behind a view choice (Chemistry 2e
   RULES.md, Figures): the flat drawing is the default, and the scene
   mounts on the first switch, where the tetrahedron of phosphorus and
   the crown of sulfur are shapes no flat drawing can hold. Still: a
   molecule has no clock in it, and the molecules turn freely, since a
   molecule has no ground to keep.
===================================================================== */
/* the radius each element is drawn with, in Ångstroms, in the proportions the book's pictures keep */
const BALL = { H: 0.30, C: 0.42, O: 0.40, P: 0.52, S: 0.52 };
/* an open chain of six carbons, each carrying what glucose hangs on it: the aldehyde oxygen on the first,
   a hydroxyl on every other, and the hydrogens that make up C6H12O6 */
function glucose() {
  const A = [], B = [], CX = (i) => [i * 1.26, i % 2 ? 0.43 : -0.43, 0];
  const U = (v) => { const l = Math.hypot(v[0], v[1], v[2]) || 1; return [v[0] / l, v[1] / l, v[2] / l]; };
  const add = (sym, from, dir, len) => { const u = U(dir); A.push([sym, from[0] + u[0] * len, from[1] + u[1] * len, from[2] + u[2] * len]); return A.length - 1; };
  for (let i = 0; i < 6; i++) { A.push(['C', ...CX(i)]); if (i) B.push([i - 1, i, 1]); }
  for (let i = 0; i < 6; i++) {
    const c = CX(i), sy = i % 2 ? 1 : -1, d1 = [0, sy * 0.5, 0.85], d2 = [0, sy * 0.5, -0.85];
    if (i === 0) { B.push([i, add('O', c, d1, 1.21), 2]); B.push([i, add('H', c, d2, 1.09), 1]); continue; }
    const o = add('O', c, d1, 1.43); B.push([i, o, 1]);
    B.push([o, add('H', A[o].slice(1), [d1[0] + 0.9, d1[1], d1[2]], 0.96), 1]);
    B.push([i, add('H', c, d2, 1.09), 1]);
    if (i === 5) B.push([i, add('H', c, [1, sy * 0.3, 0], 1.09), 1]);
  }
  return { atoms: A, bonds: B };
}
const TET = 0.781;                                         /* half the body diagonal that gives P4 its 2.21 Å edge */
const HALF = 0.912;                                        /* half of water's 104.5° bond angle, in radians */
const GLU = glucose();
const MOLECULES = [
  { f: 'H₂', of: 'a hydrogen molecule, H₂', row: 0, atoms: [['H', -0.37, 0, 0], ['H', 0.37, 0, 0]], bonds: [[0, 1, 1]] },
  { f: 'O₂', of: 'an oxygen molecule, O₂', row: 0, atoms: [['O', -0.6, 0, 0], ['O', 0.6, 0, 0]], bonds: [[0, 1, 2]] },
  { f: 'P₄', of: 'a phosphorus molecule, P₄', row: 0, atoms: [['P', TET, TET, TET], ['P', TET, -TET, -TET], ['P', -TET, TET, -TET], ['P', -TET, -TET, TET]], bonds: [[0, 1, 1], [0, 2, 1], [0, 3, 1], [1, 2, 1], [1, 3, 1], [2, 3, 1]] },
  { f: 'S₈', of: 'a sulfur molecule, S₈', row: 0, atoms: Array.from({ length: 8 }, (_, i) => ['S', 2.3 * Math.cos((i * Math.PI) / 4), 2.3 * Math.sin((i * Math.PI) / 4), i % 2 ? 0.49 : -0.49]), bonds: Array.from({ length: 8 }, (_, i) => [i, (i + 1) % 8, 1]) },
  { f: 'H₂O', of: 'a water molecule, H₂O', row: 1, atoms: [['O', 0, 0, 0], ['H', 0.96 * Math.sin(HALF), -0.96 * Math.cos(HALF), 0], ['H', -0.96 * Math.sin(HALF), -0.96 * Math.cos(HALF), 0]], bonds: [[0, 1, 1], [0, 2, 1]] },
  { f: 'CO₂', of: 'a carbon dioxide molecule, CO₂', row: 1, atoms: [['C', 0, 0, 0], ['O', -1.16, 0, 0], ['O', 1.16, 0, 0]], bonds: [[0, 1, 2], [0, 2, 2]] },
  { f: 'C₆H₁₂O₆', of: 'a glucose molecule, C₆H₁₂O₆', row: 1, atoms: GLU.atoms, bonds: GLU.bonds },
];
/* the centre of each molecule in Ångstroms, so a drawing can be laid out about it */
function centre(m) {
  const ax = m.atoms.map((a) => a[1]), ay = m.atoms.map((a) => a[2]);
  return [(Math.min(...ax) + Math.max(...ax)) / 2, (Math.min(...ay) + Math.max(...ay)) / 2];
}
(function () {
  const d = sim('fig-molecules', 660);
  /* the view is a state the reader switches between, never slides through (rule 26.1) */
  const VIEW = F.choice(d.controls, { label: '\\text{view}', options: [{ value: '2d', label: '2D' }, { value: '3d', label: '3D' }], value: '2d', aria: 'a flat drawing or a scene to turn', onInput: show });
  const K = 50;                                            /* canvas units to the Ångstrom, one scale for every molecule */
  const SC = 0.34;                                         /* scene units to the Ångstrom */
  /* where each molecule stands, on the canvas and in the scene; the two rows are the elements and the compounds */
  const SPOT = [[200, 220, -2.6, 0.95], [400, 220, -1.7, 0.95], [640, 220, -0.6, 0.95], [1010, 220, 1.5, 0.95],
    [180, 500, -3.1, -0.95], [420, 500, -1.9, -0.95], [950, 500, 1.5, -0.95]];
  let hits = []; F.hover(d.stage, () => hits);
  function bond2(ctx, p, q, order) {
    const dx = q[0] - p[0], dy = q[1] - p[1], L = Math.hypot(dx, dy) || 1, px = (-dy / L) * K * 0.09, py = (dx / L) * K * 0.09;
    (order === 2 ? [-1, 1] : [0]).forEach((o) => line(ctx, p[0] + px * o, p[1] + py * o, q[0] + px * o, q[1] + py * o, PAL.ink, order === 2 ? K * 0.07 : K * 0.11));
  }
  /* one molecule on the canvas about (cx, cy): the bonds first, then the atoms from the back forward */
  function flat(ctx, m, cx, cy) {
    const [mx, my] = centre(m), P = (a) => [cx + (a[1] - mx) * K, cy - (a[2] - my) * K];
    m.bonds.forEach(([i, j, o]) => bond2(ctx, P(m.atoms[i]), P(m.atoms[j]), o));
    m.atoms.map((a, i) => i).sort((i, j) => m.atoms[i][3] - m.atoms[j][3]).forEach((i) => {
      const a = m.atoms[i], [x, y] = P(a), r = BALL[a[0]] * K;
      atom(ctx, x, y, a[0], r); hits.push({ x, y, r: r + 3, name: NAME[a[0]] + ' atom of ' + m.of });
    });
  }
  function draw2d() {
    const { ctx } = begin(d.c);
    hits.length = 0;
    headline(ctx, 'A molecule is two or more atoms joined by chemical bonds, and it may be built of one element or of several.');
    MOLECULES.forEach((m, i) => { flat(ctx, m, SPOT[i][0], SPOT[i][1]); text(ctx, m.f, SPOT[i][0], m.row ? 606 : 386, PAL.ink, { size: 24, weight: 600, align: 'center' }); });
    text(ctx, 'Each of these is a molecule of an element, built of atoms of one kind.', 40, 416, PAL.muted, { size: 18 });
    text(ctx, 'Each of these is a molecule of a compound, built of atoms of more than one kind.', 40, 636, PAL.muted, { size: 18 });
  }
  /* the scene: the same seven molecules as balls and sticks, each turning about its own centre */
  let v = null, parts = null, cnv = null, sig = '';
  function mount() {
    v = F.view3d(d.stage, { spin: 'idle', views: [{ label: 'front', yaw: 0, pitch: 0.2 }, { label: 'above', yaw: 0, pitch: 1.2 }], h: 460, dist: 8 });
    parts = MOLECULES.map((m, i) => { const g = v.part(SPOT[i][2]); g.position.set(SPOT[i][2], SPOT[i][3], 0); return g; });
    cnv = strip(d, 170);
  }
  function build() {
    const key = palSig(); if (key === sig) return; sig = key;
    v.clear();
    MOLECULES.forEach((m, i) => {
      const g = parts[i], [mx, my] = centre(m), P = (a) => [(a[1] - mx) * SC, (a[2] - my) * SC, a[3] * SC];
      m.bonds.forEach(([a, b]) => stick3(g, P(m.atoms[a]), P(m.atoms[b]), 0.03, PAL.ink));
      m.atoms.forEach((a) => v.pickable(sphere3(g, P(a), BALL[a[0]] * SC, F.el(a[0])), NAME[a[0]] + ' atom of ' + m.of));
    });
  }
  function draw3d() {
    build(); v.invalidate();
    const { ctx } = begin(cnv);
    topline(ctx, 'A molecule is two or more atoms joined by chemical bonds, and it may be built of one element or of several. Drag any molecule to turn them all.');
    const w = v.wrap.clientWidth || 1400;
    text(ctx, 'elements', 40, 112, PAL.muted, { size: 17 });
    text(ctx, 'compounds', 40, 146, PAL.muted, { size: 17 });
    MOLECULES.forEach((m, i) => text(ctx, m.f, (v.project([0, 0, 0], parts[i])[0] / w) * 1400, m.row ? 146 : 112, PAL.ink, { size: 22, weight: 600, align: 'center' }));
  }
  /* one stage shows at a time: the canvas, or the scene with its button row and its strip */
  function show() {
    const three = VIEW.value === '3d';
    if (three && !v) mount();
    d.c.style.display = three ? 'none' : '';
    if (v) [v.wrap, d.stage.querySelector('.view3d-bar'), cnv].forEach((e) => { if (e) e.style.display = three ? '' : 'none'; });
    draw();
  }
  function draw() {
    if (VIEW.value === '3d') draw3d(); else draw2d();
    readout(d.readout, '\\text{H}_2 \\quad \\text{O}_2 \\quad \\text{P}_4 \\quad \\text{S}_8 \\qquad \\text{H}_2\\text{O} \\quad \\text{CO}_2 \\quad \\text{C}_6\\text{H}_{12}\\text{O}_6',
      'The subscript counts the atoms of each element in one molecule, so a water molecule holds two hydrogen atoms and one oxygen atom, and a glucose molecule holds six carbon atoms, twelve hydrogen atoms and six oxygen atoms.');
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 1.15: the decomposition of water at three levels, on a bench.
   A battery in a beaker of water, an inverted test tube over each
   terminal, hydrogen collecting over the negative one at twice the
   volume of the oxygen over the positive one; the molecules that formed
   drawn in the gas each tube holds and the water that remains in the
   beaker, and the equation counting them on the strip beneath. Still:
   the slider sets how many molecules have decomposed. The apparatus
   stands on a bench, so the pitch is kept between 2° and 54° above the
   bench top and the yaw within the front half, a quarter turn each way;
   the scene is never seen from beneath, and it does not spin on its own,
   since a bench has a front.
===================================================================== */
(function () {
  const d = sim('sim-electrolysis');
  const v = F.view3d(d.stage, { spin: 'none', pitch: [0.04, 0.95], yaw: [-Math.PI / 2, Math.PI / 2], views: [{ label: 'front', yaw: 0, pitch: 0.12 }, { label: 'above', yaw: 0, pitch: 0.9 }], h: 460, dist: 7.4, tilt: 0.3 });
  const grp = v.part(0), cnv = strip(d, 170);
  const N = ctl(d.controls, { label: '\\text{water molecules decomposed}', cls: '', min: 0, max: 12, step: 2, value: 6, unit: '', dec: 0, aria: 'number of water molecules decomposed' });
  /* the bench, the beaker on it, the battery on its floor and the two tubes over the terminals */
  const BENCH = -1.3, BR = 1.35, BH = 2.1, LEVEL = BENCH + 1.65, TX = [-0.42, 0.42], TR = 0.2, TB = BENCH + 0.5, TH = 1.55;
  let sig = '';
  function build() {
    const key = [N.v, palSig()].join('|'); if (key === sig) return; sig = key;
    v.clear();
    const n = N.v, h2 = n, o2 = n / 2, hue = C('volume');
    v.pickable(box3(grp, [0, BENCH - 0.09, 0], [6, 0.18, 3.2], PAL.soft), 'the bench');
    tube3(grp, 0, BENCH, 0, BR, BH, 'top');                                                       /* the beaker */
    const water = column3(grp, 0, BENCH + 0.02, 0, BR - 0.02, LEVEL - BENCH, PAL.muted, 0.16); v.pickable(water, 'water in the beaker');
    v.pickable(box3(grp, [0, BENCH + 0.2, 0], [1.5, 0.4, 0.7], PAL.soft), 'battery');            /* the battery on the floor of the beaker */
    TX.forEach((x, i) => {
      v.pickable(box3(grp, [x, BENCH + 0.44, 0], [0.16, 0.1, 0.16], PAL.ink), i ? 'positive terminal of the battery' : 'negative terminal of the battery');
      const full = TH - 0.15, gas = (full * (i === 0 ? h2 : o2)) / 12;
      tube3(grp, x, TB, 0, TR, TH, 'bottom');                                                       /* an inverted test tube, closed at its top */
      column3(grp, x, TB, 0, TR - 0.015, TH - gas, PAL.muted, 0.16);                                /* the water still in it */
      const g = column3(grp, x, TB + TH - gas, 0, TR - 0.015, gas, hue, 0.3);                       /* the gas collected at its top */
      v.pickable(g, (i ? 'oxygen' : 'hydrogen') + ' collected, ' + fmt((100 * (i === 0 ? h2 : o2)) / 12, 0) + '% of the tube');
      /* the molecules that formed, drawn in the gas they are: two hydrogens per oxygen */
      const count = i === 0 ? h2 : o2, r = i === 0 ? 0.045 : 0.06;
      for (let k = 0; k < count; k++) {
        const p = [x + (rnd(k * 3 + i * 40) - 0.5) * 0.2, TB + TH - 0.1 - rnd(k * 3 + 1 + i * 40) * Math.max(0.05, gas - 0.2), (rnd(k * 3 + 2 + i * 40) - 0.5) * 0.2];
        diatomic3(v, grp, p, V3.unit([rnd(k * 7 + i * 40) - 0.5, rnd(k * 7 + 1 + i * 40) - 0.5, rnd(k * 7 + 2 + i * 40) - 0.5]), i ? 'O' : 'H', r);
      }
      v.label(i ? 'oxygen, over the + terminal' : 'hydrogen, over the − terminal', [x, TB + TH + 0.08, 0], grp, i ? 4 : 34);   /* the two tubes stand close, so the hydrogen label sits a line above the oxygen one */
    });
    /* the water that remains, drawn molecule by molecule in the beaker about the tubes */
    for (let k = 0; k < 12 - n; k++) {
      const a = (k / 12) * TAU + 0.4, rr = 0.85 + 0.35 * rnd(k * 11 + 1);
      const p = [rr * Math.cos(a), BENCH + 0.55 + rnd(k * 11 + 2) * (LEVEL - BENCH - 0.75), rr * Math.sin(a)];
      water3(v, grp, p, ...frame(rnd(k * 11 + 3), rnd(k * 11 + 4), rnd(k * 11 + 5)), 0.6);
    }
    v.label('battery', [0, BENCH + 0.2, 0.36], grp, -22);
    v.label('water', [-1.05, LEVEL, 0.7], grp, 0);
  }
  function draw() {
    build(); v.invalidate();
    const n = N.v, h2 = n, o2 = n / 2, hue = C('volume');
    const { ctx } = begin(cnv);
    text(ctx, 'hydrogen collected: ' + fmt((100 * h2) / 12, 0) + '% of its tube', 40, 96, hue, { size: 20, weight: 600 });
    text(ctx, 'oxygen collected: ' + fmt((100 * o2) / 12, 0) + '% of its tube', 40, 128, hue, { size: 20, weight: 600 });
    text(ctx, 'the hydrogen tube holds twice the volume of gas the oxygen tube does', 40, 158, PAL.muted, { size: 17 });
    const rx = 760;
    text(ctx, (12 - n) + ' water molecule' + (12 - n === 1 ? '' : 's') + ' left in the beaker', rx, 96, PAL.ink, { size: 18 });
    text(ctx, h2 + ' hydrogen molecule' + (h2 === 1 ? '' : 's') + ' in the left tube', rx, 128, PAL.ink, { size: 18 });
    text(ctx, o2 + ' oxygen molecule' + (o2 === 1 ? '' : 's') + ' in the right tube', rx, 158, PAL.ink, { size: 18 });
    text(ctx, 'Drag the bench to turn it.', rx, 188, PAL.muted, { size: 17 });
    topline(ctx, n === 0 ? 'No water has been decomposed yet, so both tubes are still full of water and every molecule in the beaker is a water molecule.'
      : `Of the water, ${n} molecules have become ${h2} hydrogen molecules and ${o2} oxygen molecules, and the hydrogen tube holds twice the gas the oxygen tube does.`);
    readout(d.readout, `${n}\\,\\text{H}_2\\text{O}(l) \\longrightarrow ${h2}\\,\\text{H}_2(g) + ${o2}\\,\\text{O}_2(g) \\qquad \\kV_{\\text{H}_2} = 2\\,\\kV_{\\text{O}_2}`,
      'Every atom is accounted for: the ' + 2 * n + ' hydrogen atoms and ' + n + ' oxygen atoms of the water that decomposed are the atoms of the hydrogen and oxygen molecules that formed.');
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 1.16: a hydrogen fuel cell, redrawn faithfully. Hydrogen in on
   the left, oxygen on the right, the anode, the proton exchange membrane
   and the cathode between, electrons round the outer circuit and water
   out at the bottom right. No sliders, no motion.
===================================================================== */
(function () {
  const d = sim('fig-fuel-cell', 660);
  let hits = []; const named = namer(hits);
  F.hover(d.stage, () => hits);
  /* an electron: a hollow ink disc with its sign, since an electron has no element to take a colour from; a proton is a hydrogen
     ion and keeps hydrogen's colour with its charge as a mark (rule 7.2) */
  function electron(ctx, x, y) { dot(ctx, x, y, PAL.ink, false, 12); text(ctx, '−', x, y + 1, PAL.ink, { size: 20, weight: 600, align: 'center' }); hits.push({ x, y, r: 15, name: 'electron, e⁻' }); }
  function proton(ctx, x, y) { atom(ctx, x, y, 'H', 12); text(ctx, '+', x, y + 1, PAL.ink, { size: 20, weight: 600, align: 'center' }); hits.push({ x, y, r: 15, name: 'hydrogen ion, H⁺ (a proton)' }); }
  function slab(ctx, x1, x2, y1, y2, fill, label) {
    ctx.save(); ctx.fillStyle = fill; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.fillRect(x1, y1, x2 - x1, y2 - y1); ctx.strokeRect(x1, y1, x2 - x1, y2 - y1); ctx.restore();
    const ls = label.split('\n'); ls.forEach((s, i) => text(ctx, s, (x1 + x2) / 2, y2 + 26 + i * 22, PAL.ink, { size: 17, align: 'center' }));
  }
  function channel(ctx, pts) { ctx.save(); ctx.strokeStyle = PAL.muted; ctx.lineWidth = 44; ctx.lineCap = 'butt'; ctx.lineJoin = 'miter'; ctx.beginPath(); pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.stroke(); ctx.strokeStyle = PAL.soft; ctx.lineWidth = 36; ctx.stroke(); ctx.restore(); }
  function draw() {
    const { ctx } = begin(d.c);
    hits.length = 0;
    /* the housing and the flow channels */
    ctx.save(); ctx.fillStyle = PAL.soft; ctx.fillRect(340, 170, 220, 380); ctx.fillRect(840, 170, 220, 380); ctx.restore();
    channel(ctx, [[200, 240], [520, 240], [520, 480], [200, 480]]);
    channel(ctx, [[1200, 240], [880, 240], [880, 480], [1200, 480]]);
    /* the anode, the membrane, the cathode */
    slab(ctx, 560, 630, 170, 550, alpha(PAL.ink, 0.12), 'Anode');
    slab(ctx, 650, 750, 170, 550, alpha(PAL.ink, 0.28), 'Proton\nexchange\nmembrane');
    slab(ctx, 770, 840, 170, 550, alpha(PAL.ink, 0.12), 'Cathode');
    /* the outer circuit, with its load at the top */
    line(ctx, 595, 170, 595, 90, PAL.ink, 4); line(ctx, 805, 170, 805, 90, PAL.ink, 4);
    line(ctx, 595, 90, 640, 90, PAL.ink, 4); line(ctx, 760, 90, 805, 90, PAL.ink, 4);
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(640, 90); for (let i = 0; i < 6; i++) ctx.lineTo(650 + i * 20, i % 2 ? 108 : 72); ctx.lineTo(760, 90); ctx.stroke(); ctx.restore();
    text(ctx, 'Electric power', 700, 46, PAL.ink, { size: 22, weight: 600, align: 'center' });
    arrow(ctx, 575, 160, 575, 110, PAL.ink, 3); arrow(ctx, 825, 110, 825, 160, PAL.ink, 3);
    electron(ctx, 595, 90); electron(ctx, 805, 90);
    hits.push({ x: 595, y: 360, r: 34, name: 'anode' }, { x: 700, y: 360, r: 48, name: 'proton exchange membrane' }, { x: 805, y: 360, r: 34, name: 'cathode' }, { x: 700, y: 90, r: 60, name: 'the load: the electric power the cell delivers' });
    /* hydrogen in, split at the anode into protons that cross and electrons that go round */
    text(ctx, 'Hydrogen', 150, 240, PAL.ink, { size: 20, align: 'right' }); arrow(ctx, 160, 240, 200, 240, PAL.ink, 3);
    diatomic(named, ctx, 250, 240, 9, 'H'); diatomic(named, ctx, 330, 240, 9, 'H'); diatomic(named, ctx, 440, 300, 9, 'H'); diatomic(named, ctx, 440, 420, 9, 'H');
    arrow(ctx, 470, 300, 540, 300, PAL.ink, 3); arrow(ctx, 470, 420, 540, 420, PAL.ink, 3);
    proton(ctx, 700, 290); proton(ctx, 700, 320); proton(ctx, 700, 410); proton(ctx, 700, 440);
    arrow(ctx, 720, 305, 760, 305, PAL.ink, 3); arrow(ctx, 720, 425, 760, 425, PAL.ink, 3);
    electron(ctx, 595, 250); electron(ctx, 595, 370); arrow(ctx, 595, 230, 595, 200, PAL.ink, 3); arrow(ctx, 595, 350, 595, 280, PAL.ink, 3);
    text(ctx, 'Unused', 150, 466, PAL.ink, { size: 20, align: 'right' }); text(ctx, 'hydrogen', 150, 490, PAL.ink, { size: 20, align: 'right' }); arrow(ctx, 260, 480, 200, 480, PAL.ink, 3);
    diatomic(named, ctx, 330, 480, 9, 'H');
    /* oxygen in, meeting protons and electrons at the cathode to make water */
    text(ctx, 'Oxygen', 1250, 240, PAL.ink, { size: 20 }); arrow(ctx, 1240, 240, 1200, 240, PAL.ink, 3);
    diatomic(named, ctx, 1140, 240, 11, 'O'); diatomic(named, ctx, 1060, 240, 11, 'O');
    electron(ctx, 805, 250); electron(ctx, 805, 290); electron(ctx, 805, 330); electron(ctx, 805, 370);
    named(ctx, 960, 330, 'O', 11, 'the oxygen molecule split at the cathode'); proton(ctx, 925, 305); proton(ctx, 925, 355);
    arrow(ctx, 960, 360, 960, 410, PAL.ink, 3); water(named, ctx, 960, 440); arrow(ctx, 990, 480, 1040, 480, PAL.ink, 3); water(named, ctx, 1090, 480);
    text(ctx, 'Water', 1250, 480, PAL.ink, { size: 20 }); arrow(ctx, 1200, 480, 1240, 480, PAL.ink, 3);
    readout(d.readout, '2\\,\\text{H}_2(g) + \\text{O}_2(g) \\longrightarrow 2\\,\\text{H}_2\\text{O}(l)', 'Hydrogen gives up its electrons at the anode and oxygen takes them up at the cathode, so the electrons must travel round the outer circuit, and that current is the electric power the cell delivers.');
  }
  register(d.fig, { update: () => {}, draw });
})();
};
