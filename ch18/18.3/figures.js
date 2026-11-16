/* Figures for section 18.3 Structure and General Properties of the Metalloids. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['18.3'] = function (root, F) {
const { tex, C, PAL, alpha, register, begin, line, arrow, text, topline, dot } = F;
const sim = (id, H) => F.sim(root, id, H);
const R3 = Math.sqrt(3), TAU = 2 * Math.PI;
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;
const dist3 = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
const clamp01 = (x) => Math.min(1, Math.max(0, x));
function rng(seed) { let a = seed >>> 0; return () => { a = (a + 0x6d2b79f5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
function ball(ctx, x, y, r, fill) { ctx.save(); ctx.fillStyle = fill; ctx.strokeStyle = alpha(PAL.ink, 0.5); ctx.lineWidth = 1.4; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore(); }
function bondsBy(pts, len) {
  const b = [];
  for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) if (Math.abs(dist3(pts[i], pts[j]) - len) < 0.03) b.push([i, j]);
  return b;
}
/* keep the points that have at least `min` bonds, renumbering the bonds and whatever lists run beside the points */
function prune(pts, bonds, min, ...beside) {
  const deg = pts.map(() => 0); bonds.forEach(([i, j]) => { deg[i]++; deg[j]++; });
  const map = []; let n = 0; deg.forEach((k, i) => { map[i] = k >= min ? n++ : -1; });
  const keep = (list) => list.filter((_, i) => map[i] >= 0);
  return [keep(pts), bonds.filter(([i, j]) => map[i] >= 0 && map[j] >= 0).map(([i, j]) => [map[i], map[j]]), ...beside.map(keep)];
}
/* the point nearest the centre that has `deg` bonds (among those `ok` allows) */
function hubOf(pts, bonds, deg, ok = () => true) {
  const n = pts.map(() => 0); bonds.forEach(([i, j]) => { n[i]++; n[j]++; });
  let best = -1, bd = Infinity;
  pts.forEach((p, i) => { const r = Math.hypot(...p); if (n[i] === deg && ok(i) && r < bd) { bd = r; best = i; } });
  return best;
}

/* =====================================================================
   FIGURE 18.12 + 18.13: the structures of the metalloids, one solid at a
   time, with graphite beside them as the book draws it. One atom's bonds
   are drawn dark, and the atoms joined to it, directly or through other
   atoms, are drawn solid while the rest are pale: the whole crystal for
   silicon, one sheet for arsenic and graphite, one chain for tellurium.
   Bonds are 0.6 units long throughout, so proportions within each solid
   are kept (As–As–As 97°, the tellurium spiral three atoms to a turn);
   the arsenic sheets and the tellurium chains are set a little farther
   apart than in the crystal so that each reads on its own. Arsenic and
   graphite have the same net, so that choice flattens or puckers the
   sheets in place; the others fade. Still: a solid answers its choice.
   No ground; pitch bounded to ±1.3 rad so the solid never flips over.
===================================================================== */
(function () {
  const KH = 64;
  const d = sim('sim-structures', KH);
  const v = F.view3d(d.stage, { spin: 'idle', pitch: [-1.3, 1.3], tilt: 0.3, h: 620, dist: 9 });
  v.setView(-0.45, 0.3);
  const grp = v.part(0);
  const B = 0.6, HX = 3.45, HZ = 1.7;
  /* the layered pair: a honeycomb net in the x–z plane, its two sublattices lifted ±h; three sheets, each shifted along z */
  const LAY = { As: { h: 0.152, gap: 1.0, sh: [-1, 0, 1] }, C: { h: 0, gap: 1.42, sh: [0, 1, 0] } };
  const net = (() => {
    let ref = [], lay = [], sub = [];
    [0, 1, 2].forEach((k) => { for (let j = -6; j <= 6; j++) for (let i = -10; i <= 10; i++) for (const s of [0, 1]) {
      const x = (i + j / 2) * R3 * B, z = j * 1.5 * B + s * B - B / 2;
      if (Math.abs(x) <= HX && Math.abs(z) <= HZ) { ref.push([x, k * 9, z]); lay.push(k); sub.push(s); }
    } });
    let bonds = bondsBy(ref, B);
    [ref, bonds, lay, sub] = prune(ref, bonds, 2, lay, sub);
    const at = ([h, gap, s0, s1, s2]) => { const a = Math.sqrt(B * B - 4 * h * h), q = a / B, sh = [s0, s1, s2]; return ref.map((p, i) => [p[0] * q, (lay[i] - 1) * gap + (sub[i] ? h : -h), p[2] * q + sh[lay[i]] * a]); };
    const flat = ref.map((p, i) => [p[0], lay[i] === 1 ? 0 : 9, p[2]]);
    const hub = hubOf(flat, bonds, 3);
    return { at, bonds, hub, unit: lay.map((k) => k === 1) };
  })();
  const par = (k) => { const L = LAY[k]; return [L.h, L.gap, ...L.sh]; };
  const BUILD = {
    As: () => ({ pts: net.at(par('As')), bonds: net.bonds, hub: net.hub, unit: net.unit }),
    C: () => ({ pts: net.at(par('C')), bonds: net.bonds, hub: net.hub, unit: net.unit }),
    /* the diamond structure, a slab three cells long: every atom is joined to every other, so all are solid */
    Si() {
      const a = (4 * B) / R3, base = [[0, 0, 0], [0.5, 0.5, 0], [0.5, 0, 0.5], [0, 0.5, 0.5]];
      let pts = [];
      for (let i = -3; i <= 3; i++) for (let j = -2; j <= 2; j++) for (let k = -2; k <= 2; k++) base.forEach((f) => [0, 0.25].forEach((o) => {
        const p = [(i + f[0] + o) * a - a / 8, (j + f[1] + o) * a - a / 8, (k + f[2] + o) * a - a / 8];
        if (Math.abs(p[0]) <= 2.2 && Math.abs(p[1]) <= 1.1 && Math.abs(p[2]) <= 1.1) pts.push(p);
      }));
      let bonds = bondsBy(pts, B);
      [pts, bonds] = prune(pts, bonds, 2); [pts, bonds] = prune(pts, bonds, 2);
      return { pts, bonds, hub: hubOf(pts, bonds, 4), unit: pts.map(() => true) };
    },
    /* seven spiral chains lying along x on a hexagonal array, three atoms to a turn */
    Te() {
      const rh = 0.248, step = Math.sqrt(B * B - 3 * rh * rh), sp = 1.2, pts = [], bonds = [], unit = [];
      const centres = [[0, 0]]; for (let k = 0; k < 6; k++) centres.push([sp * Math.cos((k * TAU) / 6 + TAU / 12), sp * Math.sin((k * TAU) / 6 + TAU / 12)]);
      const n = 17;
      centres.forEach(([cy, cz], c) => { for (let m = 0; m < n; m++) {
        const th = (m * TAU) / 3;
        pts.push([(m - (n - 1) / 2) * step, cy + rh * Math.cos(th), cz + rh * Math.sin(th)]); unit.push(c === 0);
        if (m) bonds.push([pts.length - 2, pts.length - 1]);
      } });
      return { pts, bonds, hub: (n - 1) / 2, unit };
    },
    /* one icosahedron, its 12 corners, 30 edges and 20 faces */
    B() {
      const phi = (1 + Math.sqrt(5)) / 2, pts = [], E = 1.9;
      [0, 1, 2].forEach((r) => { const q = [0, 1, phi].map((_, n, b) => b[(n + r) % 3]);
        for (let m = 0; m < 8; m++) { const p = q.map((x, n) => ((m >> n) & 1 ? -x : x) * (E / 2)); if (!pts.some((r2) => dist3(r2, p) < 1e-6)) pts.push(p); } });
      const bonds = bondsBy(pts, E), faces = [];
      const joined = (i, j) => bonds.some(([a, b]) => (a === i && b === j) || (a === j && b === i));
      for (let i = 0; i < 12; i++) for (let j = i + 1; j < 12; j++) for (let k = j + 1; k < 12; k++) if (joined(i, j) && joined(j, k) && joined(i, k)) faces.push([i, j, k]);
      return { pts, bonds, hub: -1, unit: pts.map(() => true), faces, r: 0.21 };
    },
  };
  const INFO = {
    Si: { label: 'silicon', atom: 'silicon or germanium atom', name: 'a silicon or germanium atom', ro: '4\\ \\text{bonds per atom} \;\\Rightarrow\; \\text{one three-dimensional network}' },
    As: { label: 'arsenic', atom: 'arsenic or antimony atom', name: 'an arsenic or antimony atom', ro: '3\\ \\text{bonds per atom} \;\\Rightarrow\; \\text{puckered sheets}' },
    C: { label: 'graphite', atom: 'carbon atom', name: 'a carbon atom, C', ro: '3\\ \\text{bonds per atom} \;\\Rightarrow\; \\text{planar sheets}' },
    Te: { label: 'tellurium', atom: 'tellurium atom', name: 'a tellurium atom, Te', ro: '2\\ \\text{bonds per atom} \;\\Rightarrow\; \\text{spiral chains}' },
    B: { label: 'boron', atom: 'boron atom, one at each of the 12 corners', name: 'a boron atom, B', ro: `\\text{B–B bonds} = \\frac{20\\ \\text{faces} \\times 3\\ \\text{edges}}{2} = 30,\\ \\text{each about}\\ ${hue('length', '176\\ \\text{pm}')}` },
  };
  const S = F.choice(d.controls, { label: '\\text{solid}', options: Object.keys(INFO).map((k) => ({ value: k, label: INFO[k].label })), value: 'As', aria: 'the solid whose structure is shown' });
  let sig = '', atomM = [], bondM = [], cur = null;
  const palSig = () => [PAL.ink, PAL.muted, ...Object.keys(INFO).map((e) => F.el(e))].join('|');
  const pale = { transparent: true, opacity: 0.3, depthWrite: false };
  function build(kind) {
    v.clear(); atomM = []; bondM = [];
    const s = cur = BUILD[kind](), info = INFO[kind], r = s.r || 0.135;
    s.pts.forEach((p, i) => atomM.push(v.pickable(F.mesh.sphere(grp, p, i === s.hub ? r * 1.2 : r, F.el(kind), s.unit[i] ? undefined : pale), info.name)));
    s.bonds.forEach(([i, j]) => {
      const on = i === s.hub || j === s.hub || kind === 'B';
      bondM.push(v.pickable(F.mesh.stick(grp, s.pts[i], s.pts[j], on ? (kind === 'B' ? 0.045 : 0.075) : 0.04, on ? PAL.ink : PAL.muted, s.unit[i] ? undefined : pale), on && kind !== 'B' ? 'one of this atom’s bonds' : kind === 'B' ? 'a B–B bond, about 176 pm' : 'a covalent bond'));
    });
    if (s.faces) {
      const T = window.THREE, g = new T.BufferGeometry();
      g.setAttribute('position', new T.Float32BufferAttribute(s.faces.flatMap((f) => f.flatMap((i) => s.pts[i])), 3)); g.computeVertexNormals();
      v.pickable(grp.add(new T.Mesh(g, F.mesh.mat(F.el('B'), { transparent: true, opacity: 0.28, side: T.DoubleSide, depthWrite: false }))).children.at(-1), 'a face, an equilateral triangle');
    }
  }
  function draw() {
    const { ctx } = begin(d.c);
    const kind = S.value, key = kind + '|' + palSig();
    const twin = !!LAY[kind] && !!LAY[S.from] && S.from !== kind && S.k < 1;   /* arsenic and graphite: one net bends into the other */
    if (grp && window.THREE) {
      if (key !== sig) { sig = key; build(kind); }
      if (LAY[kind]) {
        const P = net.at(S.mix((k) => par(LAY[k] ? k : kind))), col = S.mixColor((k) => F.el(LAY[k] ? k : kind));
        atomM.forEach((m, i) => { m.position.set(P[i][0], P[i][1], P[i][2]); m.material.color.set(col); });
        bondM.forEach((m, i) => F.mesh.setStick(m, P[net.bonds[i][0]], P[net.bonds[i][1]]));
      }
      F.fade3(grp, twin ? 1 : S.a(kind));
    }
    v.invalidate();
    const info = INFO[kind];
    const key2 = [{ s: info.atom, draw: (c, x, y) => ball(c, x + 22, y + 11, 10, F.el(kind)) }, { s: kind === 'B' ? 'B–B bond' : 'covalent bond', color: kind === 'B' ? PAL.ink : PAL.muted, w: 5 }];
    if (kind !== 'B') key2.push({ s: 'the bonds of one atom', color: PAL.ink, w: 8 });
    F.legend(ctx, { l: 40, r: 1360, t: 6, b: KH - 4 }, key2, { corner: 'top', row: true, size: 22 });
    tex(d.readout, info.ro);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 18.14: zone refining, drawn from the book's image: a housing cut
   away to show the silicon rod hanging inside on a thin holder above and
   below, the ring of the heat source round it. Moving on a 7 s clock:
   for 5.5 s the rod is lowered through the fixed heat source, so the thin
   molten zone moves from the foot of the rod to its top; each impurity
   atom stays put until the zone reaches it and then rides in the melt.
   For the last 1.5 s the impure top end is cut off. Beside it, on the
   rod's own scale, the impurity atoms in each tenth of the rod, now
   (bars) and before the pass (dashed, two in every tenth).
===================================================================== */
(function () {
  const H = 700, d = sim('sim-zone-refining', H);
  const MOLTEN = '#ffb347';                       /* the orange glow of molten silicon */
  const CX = 345, HW = 178, TOP = 108, BOT = 672;   /* the housing */
  const HY = 384, RL = 236, RW = 112, ZH = RL / 10, A = ZH / (2 * RL), FOOT = 24, TP = 5.5, T = 7;
  const N = 20, UC = 1 - 2 * A - 0.012;           /* twenty impurity atoms; where the impure end is cut */
  const rnd = rng(1814);
  const IMP = Array.from({ length: N }, (_, i) => ({ u: (Math.floor(i / 2) + 0.2 + 0.6 * rnd()) / 10, w: (i % 2 ? 1 : -1) * (0.06 + 0.3 * rnd()), o: (rnd() - 0.5) * 1.3 * A, ph: rnd() * TAU }));
  const BOX = { l: 900, r: 1310, t: 150, b: 610 };
  const cy = F.cycle(() => T, 1.5);
  const hits = []; F.hover(d.stage, () => hits);
  const slices = (us) => { const n = Array(10).fill(0); us.forEach((u) => { n[Math.min(9, Math.max(0, Math.floor(u * 10)))]++; }); return n; };
  /* the opening cut in the housing, as the book draws it: a step on the left, a zigzag on the right */
  const CUT = [[-124, 132], [0, 122], [124, 132], [118, 300], [136, 330], [116, 396], [130, 430], [130, 644], [0, 656], [-130, 644], [-130, 420], [-118, 396]];
  const cutPath = (ctx) => { ctx.beginPath(); CUT.forEach(([x, y], i) => (i ? ctx.lineTo(CX + x, y) : ctx.moveTo(CX + x, y))); ctx.closePath(); };
  function draw() {
    const { ctx } = begin(d.c); hits.length = 0;
    const t = cy.now(), s = clamp01(t / TP), cut = clamp01((t - TP) / (T - TP));
    const uz = A + s * (1 - 2 * A);                 /* the zone's centre, as a fraction of the rod from its foot */
    const yB = HY + uz * RL, yT = yB - RL;            /* the rod's foot and top in the frame */
    const yOf = (u) => yB - u * RL;
    const k = F.ease.smooth(cut), lift = -44 * k;
    const steel = F.mixColor(PAL.ink, PAL.panel, 0.5), steelLit = F.mixColor(PAL.ink, PAL.panel, 0.72);
    /* the housing, a cylinder lit from the front, with the opening cut in it */
    ctx.save();
    const g = ctx.createLinearGradient(CX - HW, 0, CX + HW, 0); g.addColorStop(0, steel); g.addColorStop(0.45, steelLit); g.addColorStop(1, steel);
    ctx.fillStyle = g; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(CX - HW, TOP); ctx.lineTo(CX - HW, BOT); ctx.ellipse(CX, BOT, HW, 16, 0, Math.PI, 0, true); ctx.lineTo(CX + HW, TOP); ctx.ellipse(CX, TOP, HW, 16, 0, 0, Math.PI, true); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(CX, TOP, HW, 16, 0, 0, TAU); ctx.fillStyle = F.mixColor(steelLit, PAL.panel, 0.35); ctx.fill(); ctx.stroke();
    cutPath(ctx); ctx.fillStyle = F.mixColor(PAL.panel, PAL.ink, 0.06); ctx.fill();
    ctx.lineJoin = 'round'; ctx.strokeStyle = PAL.panel; ctx.lineWidth = 9; ctx.stroke(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 1.6; ctx.stroke();
    ctx.restore();
    hits.push({ x: CX - HW + 26, y: 300, r: 26, name: 'the housing, cut away to show the rod' }, { x: CX + HW - 22, y: 520, r: 22, name: 'the housing, cut away to show the rod' });
    ctx.save(); cutPath(ctx); ctx.clip();
    /* the holders above and below the rod, which move with it */
    line(ctx, CX, 100, CX, yT + lift, PAL.ink, 5);
    line(ctx, CX, yB + FOOT, CX, 680, PAL.ink, 5);
    hits.push({ x: CX, y: (124 + yT) / 2, r: 12, name: 'the holder, lowered with the rod' }, { x: CX, y: (yB + FOOT + 650) / 2, r: 12, name: 'the holder, lowered with the rod' });
    /* the back of the heat source's ring, behind the rod */
    const ring = (a0, a1) => { ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 12; ctx.beginPath(); ctx.ellipse(CX, HY, RW / 2 + 26, 15, 0, a0, a1); ctx.stroke(); ctx.strokeStyle = F.fact(MOLTEN); ctx.lineWidth = 8; ctx.beginPath(); ctx.ellipse(CX, HY, RW / 2 + 26, 15, 0, a0, a1); ctx.stroke(); ctx.restore(); };
    ring(Math.PI, TAU);
    /* the rod, a cylinder: impure silicon above the zone, the purer silicon that has frozen below it, the foot tapered to the holder */
    const impure = F.mixColor(PAL.soft, PAL.ink, 0.16), pure = F.mixColor(PAL.panel, PAL.soft, 0.35), E = 9;
    const piece = (y1, y2, oy, foot, top) => {   /* top: the piece that holds the zone */
      ctx.save(); ctx.beginPath();
      ctx.moveTo(CX - RW / 2, y1 + oy); ctx.ellipse(CX, y1 + oy, RW / 2, E, 0, Math.PI, TAU); ctx.lineTo(CX + RW / 2, y2 + oy);
      if (foot) { ctx.lineTo(CX + 7, y2 + FOOT); ctx.lineTo(CX - 7, y2 + FOOT); } else ctx.ellipse(CX, y2 + oy, RW / 2, E, 0, 0, Math.PI);
      ctx.lineTo(CX - RW / 2, y2 + oy); ctx.closePath();
      ctx.save(); ctx.clip();
      const zt = HY - ZH / 2 + oy, zb = HY + ZH / 2 + oy;
      ctx.fillStyle = impure; ctx.fillRect(CX - RW, y1 + oy - 20, 2 * RW, 900);
      if (!(top && cut > 0)) { ctx.fillStyle = pure; ctx.beginPath(); ctx.moveTo(CX - RW, zb); ctx.lineTo(CX - RW / 2, zb); ctx.ellipse(CX, zb, RW / 2, E, 0, Math.PI, 0, true); ctx.lineTo(CX + RW, zb); ctx.lineTo(CX + RW, 900); ctx.lineTo(CX - RW, 900); ctx.closePath(); ctx.fill(); }
      /* the molten zone at the heat source, glowing; it freezes as the cut is made */
      if (k < 1 && top) { ctx.globalAlpha = 1 - k; ctx.fillStyle = F.fact(MOLTEN); ctx.beginPath(); ctx.ellipse(CX, zt, RW / 2, E, 0, Math.PI, TAU); ctx.lineTo(CX + RW / 2, zb); ctx.ellipse(CX, zb, RW / 2, E, 0, 0, Math.PI); ctx.closePath(); ctx.fill(); ctx.globalAlpha = 1; }
      const sh = ctx.createLinearGradient(CX - RW / 2, 0, CX + RW / 2, 0); sh.addColorStop(0, alpha(PAL.ink, 0.16)); sh.addColorStop(0.4, alpha(PAL.ink, 0)); sh.addColorStop(1, alpha(PAL.ink, 0.2));
      ctx.fillStyle = sh; ctx.fillRect(CX - RW, y1 + oy - 20, 2 * RW, 900);
      ctx.restore();
      ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2; ctx.stroke();
      ctx.beginPath(); ctx.ellipse(CX, y1 + oy, RW / 2, E, 0, 0, TAU); ctx.fillStyle = F.mixColor(top ? impure : pure, PAL.panel, 0.35); ctx.fill(); ctx.stroke();
      ctx.restore();
    };
    if (cut > 0) { piece(yOf(UC), yB, 0, true, false); piece(yT, yOf(UC), lift, false, true); }
    else piece(yT, yB, 0, true, true);
    hits.push({ x: CX, y: (yT + yB) / 2, r: RW / 2, name: 'the silicon rod' });
    /* the impurity atoms: in place until the zone reaches them, then carried in the melt */
    let inMelt = 0, above = 0; const us = [];
    IMP.forEach((m) => {
      const carried = m.u <= uz + A, u = Math.max(m.u, uz + m.o);
      if (carried) inMelt++; else above++;
      us.push(u);
      const sway = carried && cut === 0 ? Math.sin(t * 5 + m.ph) * 0.05 : 0;
      const x = CX + (m.w + sway) * RW, y = yOf(u) + (cut > 0 ? lift : 0);
      ball(ctx, x, y, 7.5, F.cat(0));
      hits.push({ x, y, r: 10, name: carried ? 'an impurity atom, dissolved in the molten silicon' : 'an impurity atom' });
    });
    /* the front of the ring, over the rod */
    ring(0, Math.PI);
    hits.push({ x: CX - RW / 2 - 26, y: HY, r: 16, name: 'the heat source, a ring round the rod' }, { x: CX + RW / 2 + 26, y: HY, r: 16, name: 'the heat source, a ring round the rod' });
    ctx.restore();
    /* the rod's motion while it is lowered, as the book's arrow shows it */
    if (cut === 0 && s < 1) { arrow(ctx, CX - HW - 34, 470, CX - HW - 34, 560, PAL.ink, 4); text(ctx, 'rod', CX - HW - 34, 584, PAL.ink, { size: 22, align: 'center' }); text(ctx, 'lowered', CX - HW - 34, 610, PAL.ink, { size: 22, align: 'center' }); }
    /* the book's names, each beside its part of the rod */
    const LX = CX + HW + 26;
    const name = (s2, y, a, x0 = CX + RW / 2 + 2) => F.faded(ctx, clamp01(a), [0, 0], () => { line(ctx, x0, y, LX - 8, y, PAL.ink, 1.8); text(ctx, s2, LX, y, PAL.ink, { size: 22, align: 'left', base: 'middle' }); });
    const zt = HY - ZH / 2, zb = HY + ZH / 2;
    if (cut === 0) {
      name('impure silicon', Math.min((yT + zt) / 2, zt - 34), (zt - yT - 30) / 30);
      name('molten silicon', HY + 4, 1, CX + RW / 2 - 16);
      name('pure silicon', Math.max((zb + yB) / 2, zb + 34), (yB - zb - 30) / 30);
    } else {
      name('impure end, cut off', (yT + yOf(UC)) / 2 + lift, k);
      name('pure silicon', (yOf(UC) + yB) / 2, 1);
    }
    line(ctx, CX - RW / 2 - 40, HY, CX - HW - 12, HY - 70, PAL.ink, 1.8); text(ctx, 'heat source', CX - HW - 18, HY - 82, PAL.ink, { size: 22, align: 'right', base: 'middle' });
    /* the impurities in each tenth of the rod, on the rod's own scale */
    const ax = F.axes(ctx, BOX, [0, N], [0, 1], { nx: 4, ny: 0, xl: 'impurity atoms in each tenth of the rod' });
    text(ctx, 'top of the rod', BOX.l - 12, BOX.t + 6, PAL.muted, { size: 17, align: 'right' }); text(ctx, 'foot', BOX.l - 12, BOX.b - 6, PAL.muted, { size: 17, align: 'right' });
    const now = slices(cut > 0 ? us.filter((u) => u <= UC) : us), gone = cut > 0 ? us.filter((u) => u > UC).length : 0;
    const zy = ax.Y(uz), zh = (BOX.b - BOX.t) * A;
    if (k < 1) F.faded(ctx, 1 - k, [0, 0], () => { ctx.save(); ctx.fillStyle = alpha(F.fact(MOLTEN), 0.4); ctx.fillRect(BOX.l, zy - zh, BOX.r - BOX.l, 2 * zh); ctx.restore(); text(ctx, 'molten zone', BOX.r - 8, zy, PAL.ink, { size: 17, align: 'right', base: 'middle' }); });
    if (cut > 0) F.faded(ctx, k, [0, 0], () => { ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.08); ctx.fillRect(BOX.l, BOX.t, BOX.r - BOX.l, ax.Y(UC) - BOX.t); ctx.restore(); text(ctx, `cut off, with all ${gone}`, BOX.r - 8, (BOX.t + ax.Y(UC)) / 2, PAL.ink, { size: 17, align: 'right', base: 'middle' }); });
    now.forEach((n, i) => { if (!n) return; const y0 = ax.Y((i + 1) / 10), y1 = ax.Y(i / 10); ctx.save(); ctx.fillStyle = alpha(F.cat(0), 0.6); ctx.strokeStyle = F.cat(0); ctx.lineWidth = 2; ctx.fillRect(ax.X(0), y0 + 4, ax.X(n) - ax.X(0), y1 - y0 - 8); ctx.strokeRect(ax.X(0), y0 + 4, ax.X(n) - ax.X(0), y1 - y0 - 8); ctx.restore(); hits.push({ x: ax.X(n / 2), y: (y0 + y1) / 2, r: 20, name: `${n} impurity atom${n === 1 ? '' : 's'} in this tenth of the rod` }); });
    line(ctx, ax.X(2), BOX.t, ax.X(2), BOX.b, PAL.ink, 2.5, [8, 7]);
    F.legend(ctx, BOX, [{ s: 'impurity atoms now', kind: 'swatch', color: F.cat(0) }, { s: 'before the pass', color: PAL.ink, w: 2.5, dash: [8, 7] }], { corner: 'above' });
    topline(ctx, cut > 0 ? 'The impure top end is cut off, leaving pure silicon.' : 'Lowering the rod moves the molten zone up it, and the impurities go with the melt.');
    const main = cut > 0
      ? `\\text{impurity atoms: } ${N}\\ \\text{in the end cut off} + 0\\ \\text{in the pure silicon} = ${N}`
      : `\\text{impurity atoms: } ${above}\\ \\text{above the molten zone} + ${inMelt}\\ \\text{in it} + 0\\ \\text{below it} = ${N}`;
    tex(d.readout, main, false, { values: false });
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();

/* =====================================================================
   FIGURE 18.18: solid carbon dioxide beside silicon dioxide, to one scale
   (1 unit = 247 pm). Dry ice is its crystal of separate linear molecules
   (cubic, a = 562 pm, C=O 116 pm, each molecule along a body diagonal),
   every C=O a double bond; silica is the simplest network of SiO₄
   tetrahedra sharing corners (the ideal cristobalite pattern, a = 716 pm),
   every silicon drawn with its four oxygen atoms, one tetrahedron's bonds
   in ink. The temperature choice warms both from −100 °C to 25 °C: the
   CO₂ molecules leave one another whole, and the network does not change.
   Still: the choice morphs. No ground; pitch bounded to ±1.3 rad.
===================================================================== */
(function () {
  const KH = 112;
  const d = sim('sim-co2-sio2', KH);
  const DIST = 10.4, VH = 600;
  const v = F.view3d(d.stage, { spin: 'idle', pitch: [-1.3, 1.3], tilt: 0.3, h: VH, dist: DIST });
  v.setView(-0.5, 0.3);
  const PX = 2.85, gL = v.part(-PX), gR = v.part(PX);
  const U = 1 / 247, FCC = [[0, 0, 0], [0.5, 0.5, 0], [0.5, 0, 0.5], [0, 0.5, 0.5]];
  /* dry ice: 14 molecules of one cell, and where each has gone as a gas */
  const CO2 = (() => {
    const a = 562 * U, L = 116 * U, dir = [[1, 1, 1], [1, -1, -1], [-1, 1, -1], [-1, -1, 1]].map((u) => u.map((x) => x / R3)), mol = [], rnd = rng(1818);
    for (let i = 0; i <= 1; i++) for (let j = 0; j <= 1; j++) for (let k = 0; k <= 1; k++) FCC.forEach((f, q) => {
      const c = [f[0] + i, f[1] + j, f[2] + k]; if (c.some((x) => x > 1.01)) return;
      mol.push({ c: c.map((x) => (x - 0.5) * a), u: dir[q] });
    });
    /* as a gas: far apart inside a cylinder about the vertical axis, pointing any way */
    const far = [];
    mol.forEach((m) => {
      for (let tries = 0; tries < 400; tries++) {
        const th = rnd() * TAU, r = 2.3 * Math.sqrt(rnd()), p = [r * Math.cos(th), (rnd() - 0.5) * 3.9, r * Math.sin(th)];
        if (far.every((q) => dist3(q, p) > 1.25) || tries === 399) { far.push(p); break; }
      }
      const z = 2 * rnd() - 1, ph = rnd() * TAU, s = Math.sqrt(1 - z * z); m.u2 = [s * Math.cos(ph), z, s * Math.sin(ph)];
    });
    mol.forEach((m, i) => { m.c2 = far[i]; });
    return { mol, L };
  })();
  /* silica: the silicon atoms of one diamond cell that are bonded inside it, and all four oxygen atoms of each */
  const SIO2 = (() => {
    const a = 716 * U, si = [], o = [], bonds = [];
    const all = [...new Set([0, 1].flatMap((i) => [0, 1].flatMap((j) => [0, 1].flatMap((k) => FCC.map((f) => [f[0] + i, f[1] + j, f[2] + k].join())))))].map((s) => s.split(',').map(Number)).filter((p) => p.every((x) => x < 1.01));
    const DIA = [[0.25, 0.25, 0.25], [0.75, 0.75, 0.25], [0.75, 0.25, 0.75], [0.25, 0.75, 0.75]];
    const pts = [...all, ...DIA].map((p) => p.map((x) => (x - 0.5) * a)), sb = bondsBy(pts, (R3 / 4) * a);
    const used = pts.map((_, i) => sb.some((b) => b.includes(i)));
    pts.forEach((p, i) => { if (used[i]) si.push({ p, inner: i >= all.length, id: i }); });
    const idx = (id) => si.findIndex((x) => x.id === id);
    sb.forEach(([i, j]) => { o.push({ p: pts[i].map((x, n) => (x + pts[j][n]) / 2), bridge: true }); bonds.push([idx(i), o.length - 1], [idx(j), o.length - 1]); });
    /* the oxygen atoms that lead on into the rest of the network */
    const T4 = [[[1, 1, 1], [1, -1, -1], [-1, 1, -1], [-1, -1, 1]], [[-1, -1, -1], [-1, 1, 1], [1, -1, 1], [1, 1, -1]]];
    si.forEach((s2, n) => T4[s2.inner ? 1 : 0].forEach((u) => {
      const q = s2.p.map((x, m) => x + (u[m] * a) / 8);
      if (!o.some((x) => dist3(x.p, q) < 1e-6)) { o.push({ p: q, bridge: false }); bonds.push([n, o.length - 1]); }
    }));
    const hub = si.findIndex((x) => x.inner && x.p[0] < 0 && x.p[1] > 0);
    return { si, o, bonds, hub };
  })();
  const TEMP = F.choice(d.controls, { label: '\\text{temperature}', options: [{ value: 'cold', label: '−100 °C' }, { value: 'room', label: '25 °C' }], value: 'cold', aria: 'the temperature of both solids', ms: 1600 });
  let sig = '', mols = [];
  const palSig = () => [PAL.ink, PAL.muted, ...['C', 'O', 'Si'].map((e) => F.el(e))].join('|');
  function build() {
    v.clear(); mols = [];
    CO2.mol.forEach(() => {
      const c = v.pickable(F.mesh.sphere(gL, [0, 0, 0], 0.15, F.el('C')), 'a carbon atom, C');
      const os = [0, 1].map(() => v.pickable(F.mesh.sphere(gL, [0, 0, 0], 0.16, F.el('O')), 'an oxygen atom, O'));
      const st = [0, 1, 2, 3].map(() => v.pickable(F.mesh.stick(gL, [0, 0, 0], [0, 1, 0], 0.035, PAL.muted), 'a C=O double bond'));
      mols.push({ c, os, st });
    });
    const { si, o, bonds, hub } = SIO2;
    si.forEach((s2, i) => v.pickable(F.mesh.sphere(gR, s2.p, i === hub ? 0.24 : 0.21, F.el('Si')), 'a silicon atom, Si'));
    o.forEach((x) => v.pickable(F.mesh.sphere(gR, x.p, 0.16, F.el('O')), x.bridge ? 'an oxygen atom, O, between two silicon atoms' : 'an oxygen atom, O; its second silicon atom is not drawn'));
    bonds.forEach(([i, j]) => v.pickable(F.mesh.stick(gR, si[i].p, o[j].p, i === hub ? 0.075 : 0.045, i === hub ? PAL.ink : PAL.muted), 'an Si–O single bond'));
  }
  const mixv = (p, q, k) => p.map((x, n) => x + (q[n] - x) * k);
  function draw() {
    const { ctx } = begin(d.c);
    if (gL && window.THREE) {
      const key = palSig(); if (key !== sig) { sig = key; build(); }
      const k = TEMP.mix((t) => (t === 'room' ? 1 : 0));
      mols.forEach((m, i) => {
        const q = CO2.mol[i], c = mixv(q.c, q.c2, k), u0 = mixv(q.u, q.u2, k), n = Math.hypot(...u0) || 1, u = u0.map((x) => x / n);
        /* a side direction square to the axis, for the two sticks of each double bond */
        const ref = Math.abs(u[1]) < 0.9 ? [0, 1, 0] : [1, 0, 0], sd0 = [u[1] * ref[2] - u[2] * ref[1], u[2] * ref[0] - u[0] * ref[2], u[0] * ref[1] - u[1] * ref[0]], sn = Math.hypot(...sd0), sd = sd0.map((x) => (x / sn) * 0.05);
        m.c.position.set(c[0], c[1], c[2]);
        [1, -1].forEach((sg, e) => {
          const p = c.map((x, a2) => x + sg * u[a2] * CO2.L); m.os[e].position.set(p[0], p[1], p[2]);
          [1, -1].forEach((ss, f) => F.mesh.setStick(m.st[2 * e + f], c.map((x, a2) => x + ss * sd[a2]), p.map((x, a2) => x + ss * sd[a2])));
        });
      });
    }
    v.invalidate();
    /* each solid's name over it, and what it is at this temperature */
    const TT = (s2) => [s2, C('temperature')];
    const row = (x, parts) => F.rich(ctx, parts, x, 28, { size: 24, align: 'center', base: 'middle' });
    const XL = 700 * (1 - PX / (DIST * Math.tan(Math.PI / 12) * (1400 / VH))), XR = 1400 - XL;   /* the canvas x over each solid */
    TEMP.only(ctx, 'cold', () => { row(XL, ['carbon dioxide at ', TT('−100 °C'), ': separate molecules in a crystal']); row(XR, ['silicon dioxide at ', TT('−100 °C'), ': one network']); });
    TEMP.only(ctx, 'room', () => { row(XL, ['carbon dioxide at ', TT('25 °C'), ': the same molecules, now a gas']); row(XR, ['silicon dioxide at ', TT('25 °C'), ': the same network']); });
    const at = (sym) => (c, x, y) => ball(c, x + 22, y + 11, 10, F.el(sym));
    const dbl = (c, x, y) => { line(c, x, y + 7, x + 44, y + 7, PAL.muted, 4); line(c, x, y + 15, x + 44, y + 15, PAL.muted, 4); };
    F.legend(ctx, { l: XL - 340, r: XL + 340, t: 54, b: KH - 2 }, [{ s: 'carbon', draw: at('C') }, { s: 'oxygen', draw: at('O') }, { s: 'C=O double bond', draw: dbl }], { corner: 'top', row: true, size: 20 });
    F.legend(ctx, { l: XR - 340, r: XR + 340, t: 54, b: KH - 2 }, [{ s: 'silicon', draw: at('Si') }, { s: 'oxygen', draw: at('O') }, { s: 'Si–O single bond', color: PAL.muted, w: 5 }], { corner: 'top', row: true, size: 20 });
    tex(d.readout, '\\text{CO}_{2}\\text{: O atoms per C} = 2 \\times 1 = 2\\ \\text{(each O bonded to one C)} \\\\ \\text{SiO}_{2}\\text{: O atoms per Si} = 4 \\times \\tfrac{1}{2} = 2\\ \\text{(each O shared by two Si)}');
  }
  register(d.fig, { update: () => {}, draw });
})();
};
