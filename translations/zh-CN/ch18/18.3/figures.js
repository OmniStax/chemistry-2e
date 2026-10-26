/* Figures for section 18.3 Structure and General Properties of the Metalloids. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['18.3'] = function (root, F) {
const { tex, PAL, alpha, register, begin, line, arrow, text, topline, label, dot } = F;
const sim = (id, H) => F.sim(root, id, H);
const R3 = Math.sqrt(3), TAU = 2 * Math.PI;
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;
const dist3 = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
const mid3 = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2];
const clamp01 = (x) => Math.min(1, Math.max(0, x));
function bondsBy(atoms, len, ok = () => true) {
  const b = [];
  for (let i = 0; i < atoms.length; i++) for (let j = i + 1; j < atoms.length; j++) if (Math.abs(dist3(atoms[i].p, atoms[j].p) - len) < 0.03 && ok(atoms[i], atoms[j])) b.push([i, j]);
  return b;
}
function centre(atoms) {
  const c = [0, 1, 2].map((q) => (Math.min(...atoms.map((a) => a.p[q])) + Math.max(...atoms.map((a) => a.p[q]))) / 2);
  atoms.forEach((a) => { a.p = a.p.map((x, q) => x - c[q]); });
  return atoms;
}
/* keep the atoms that have at least `min` bonds, renumbering the bonds */
function prune(s, min) {
  const deg = s.atoms.map(() => 0); s.bonds.forEach(([i, j]) => { deg[i]++; deg[j]++; });
  const map = []; let n = 0; deg.forEach((k, i) => { map[i] = k >= min ? n++ : -1; });
  return { ...s, atoms: s.atoms.filter((_, i) => deg[i] >= min), bonds: s.bonds.filter(([i, j]) => map[i] >= 0 && map[j] >= 0).map(([i, j]) => [map[i], map[j]]) };
}
/* the atom nearest the centre with `deg` bonds; its bonds are drawn in ink so the count per atom can be read */
function hub(s, deg) {
  const n = s.atoms.map(() => 0); s.bonds.forEach(([i, j]) => { n[i]++; n[j]++; });
  let best = -1, bd = Infinity;
  s.atoms.forEach((a, i) => { const r = Math.hypot(...a.p); if (n[i] === deg && r < bd) { bd = r; best = i; } });
  return best;
}

/* =====================================================================
   FIGURE 18.12 + 18.13: the structures of the metalloids, one solid at a
   time, with graphite beside them as the book draws it. Bonds are 0.6
   units long throughout (proportions within each solid are kept; the
   tellurium chains are set a little wider apart than in the crystal so
   that each chain reads on its own). Still: a solid answers its choice.
   No ground; pitch bounded to ±1.45 rad so the solid never flips past its
   poles. Layers lie flat and chains stand upright, so "side" sees the
   pucker and the spirals and "top" looks down onto the sheets and chains.
===================================================================== */
(function () {
  const d = sim('sim-structures');
  const v = F.view3d(d.stage, { spin: 'idle', pitch: [-1.45, 1.45], tilt: 0.3, h: 500, dist: 11, views: [{ label: 'side', yaw: 0, pitch: 0 }, { label: 'top', yaw: 0, pitch: 1.45 }] });
  const grp = v.part(0); if (grp) grp.position.y = -0.3;
  const B = 0.6;
  /* a honeycomb sheet in the x–z plane, the two sublattices lifted ±h out of it */
  function sheet(y, h, shift, half) {
    const a = Math.sqrt(B * B - 4 * h * h), out = [];
    for (let j = -6; j <= 6; j++) for (let i = -7; i <= 7; i++) for (const s of [0, 1]) {
      const x = (i + j / 2) * R3 * a + shift, z = j * 1.5 * a + s * a;
      if (Math.hypot(x, z - a / 2) <= half) out.push({ p: [x, y + (s ? h : -h), z - a / 2] });
    }
    return { pts: out, a };
  }
  function layered(el, h, gap) {
    const atoms = [];
    [-1, 0, 1].forEach((k) => { const s = sheet(k * gap, h, k === 0 ? R3 * Math.sqrt(B * B - 4 * h * h) / 2 : 0, 1.6); s.pts.forEach((q) => atoms.push({ el, p: q.p })); });
    return prune({ atoms, bonds: bondsBy(atoms, B, (p, q) => Math.abs(p.p[1] - q.p[1]) < gap / 2) }, 2);
  }
  const BUILD = {
    B() {
      const phi = (1 + Math.sqrt(5)) / 2, pts = [];
      [[0, 1, phi]].forEach((b) => [0, 1, 2].forEach((r) => { const q = [b[r], b[(r + 1) % 3], b[(r + 2) % 3]];
        for (let m = 0; m < 8; m++) { const p = q.map((x, n) => ((m >> n) & 1 ? -x : x)); if (!pts.some((r2) => dist3(r2, p) < 1e-6)) pts.push(p); } }));
      const s = 1.6 / 2, atoms = pts.map((p) => ({ el: 'B', p: p.map((x) => x * s) }));
      return { atoms, bonds: bondsBy(atoms, 1.6), r: 0.2 };
    },
    Si() {
      const a = (4 * B) / R3, base = [[0, 0, 0], [0.5, 0.5, 0], [0.5, 0, 0.5], [0, 0.5, 0.5]], atoms = [];
      for (let i = -2; i <= 2; i++) for (let j = -2; j <= 2; j++) for (let k = -2; k <= 2; k++) base.forEach((f) => [0, 0.25].forEach((o) => {
        const p = [(i + f[0] + o) * a, (j + f[1] + o) * a, (k + f[2] + o) * a].map((x) => x - a * 0.125);
        if (p.every((x) => Math.abs(x) <= 1.45)) atoms.push({ el: 'Si', p });
      }));
      return prune({ atoms, bonds: bondsBy(atoms, B) }, 2);
    },
    As() { return layered('As', 0.13, 1.0); },
    C() { return layered('C', 0, 1.42); },
    Te() {
      const c = 3 * Math.sqrt((B * B - 3 * 0.248 * 0.248) / 1) / 1, rh = 0.248, sp = 1.2, atoms = [], bonds = [];
      const step = c / 3, centres = [[0, 0]];
      for (let k = 0; k < 6; k++) centres.push([sp * Math.cos((k * TAU) / 6), sp * Math.sin((k * TAU) / 6)]);
      centres.forEach(([cx, cz]) => {
        const first = atoms.length;
        for (let n = 0; n < 6; n++) {
          const th = (n * TAU) / 3;
          atoms.push({ el: 'Te', p: [cx + rh * Math.cos(th), (n - 2.5) * step, cz + rh * Math.sin(th)] });
          if (n) bonds.push([first + n - 1, first + n]);
        }
      });
      return { atoms, bonds };
    },
  };
  const INFO = {
    B: { label: 'boron', name: 'a boron atom, B', head: 'Boron crystals are built of icosahedra, with a boron atom at each of the 12 corners.', ro: `12\\ \\text{B atoms},\\ 20\\ \\text{faces},\\ 30\\ \\text{B–B bonds of about}\\ ${hue('length', '176\\ \\text{pm}')}` },
    Si: { label: 'silicon, germanium', name: 'a silicon atom, Si', deg: 4, head: 'Silicon and germanium crystallize with a diamond structure: each atom bonds to four neighbors at the corners of a regular tetrahedron.', ro: '\\text{bonds per atom} = 4\\ \\text{(to the corners of a regular tetrahedron)}' },
    As: { label: 'arsenic, antimony', name: 'an arsenic atom, As', deg: 3, head: 'Arsenic and antimony form puckered sheets in which each atom bonds to three others.', ro: '\\text{bonds per atom} = 3\\ \\text{(within a puckered sheet)}' },
    C: { label: 'graphite', name: 'a carbon atom, C', deg: 3, head: 'In graphite each carbon atom bonds to three others, and the sheets are planar.', ro: '\\text{bonds per atom} = 3\\ \\text{(within a planar sheet)}' },
    Te: { label: 'tellurium', name: 'a tellurium atom, Te', deg: 2, head: 'Tellurium forms infinite spiral chains in which each atom bonds to two others.', ro: '\\text{bonds per atom} = 2\\ \\text{(along a spiral chain)}' },
  };
  const S = F.select(d.controls, { label: '\\text{solid}', options: Object.keys(INFO).map((k) => ({ value: k, label: INFO[k].label })), value: 'As', aria: 'the solid whose structure is shown' });
  let sig = '';
  const palSig = () => [PAL.ink, PAL.muted, ...['B', 'Si', 'As', 'C', 'Te'].map((e) => F.el(e))].join('|');
  function draw() {
    const key = S.value + '|' + palSig();
    if (key !== sig && grp) {
      sig = key; v.clear();
      const info = INFO[S.value], s = BUILD[S.value](); centre(s.atoms);
      const h = info.deg ? hub(s, info.deg) : -1;
      s.atoms.forEach((a, i) => v.pickable(F.mesh.sphere(grp, a.p, i === h ? (s.r || 0.13) * 1.25 : s.r || 0.13, F.el(a.el)), info.name));
      s.bonds.forEach(([i, j]) => { const on = i === h || j === h; F.mesh.stick(grp, s.atoms[i].p, s.atoms[j].p, on ? 0.075 : 0.04, on ? PAL.ink : PAL.muted); });
      v.headline(info.head);
    }
    if (grp) F.fade3(grp, S.a(S.value));
    v.invalidate();
    tex(d.readout, INFO[S.value].ro);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 18.14: zone refining. Moving on a 7 s clock: for 5.5 s the rod
   is lowered through the fixed heat source, so the thin molten zone moves
   from the bottom of the rod to the top; each impurity atom stays put
   until the zone reaches it and then rides in the melt. For the last
   1.5 s the impure top end is cut off and set aside. Flat side view; the
   heat source, and so the zone, stay where they are in the frame.
===================================================================== */
(function () {
  const H = 680, d = sim('sim-zone-refining', H);
  const MOLTEN = '#ffb347';                       /* the orange glow of molten silicon */
  const CX = 640, HY = 360, RL = 240, RW = 64, ZH = 28, A = ZH / (2 * RL), TP = 5.5, T = 7;
  const N = 22;
  let seed = 1814; const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  const IMP = Array.from({ length: N }, (_, i) => ({ u: 0.06 + (0.92 * (i + rnd())) / N, w: (rnd() - 0.5) * 0.76, o: (rnd() - 0.5) * 1.3 * A, ph: rnd() * TAU }));
  const cy = F.cycle(() => T, 1.5);
  const hits = []; F.hover(d.stage, () => hits);
  const ro = d.readout;
  function draw() {
    const { ctx } = begin(d.c); hits.length = 0;
    const t = cy.now(), s = clamp01(t / TP), cut = clamp01((t - TP) / (T - TP));
    const uz = A + s * (1 - 2 * A);                 /* the zone's centre, as a fraction of the rod from its bottom */
    const yB = HY + uz * RL, yT = yB - RL;            /* the rod's bottom and top in the frame */
    const yOf = (u) => yB - u * RL;
    const UC = 1 - 2 * A - 0.02;                    /* where the impure end is cut */
    const k = F.ease.smooth(cut), dx = 190 * k, dy = -30 * k;
    /* the tube, cut away in front */
    ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.04); ctx.fillRect(CX - 52, 96, 104, H - 120); ctx.restore();
    line(ctx, CX - 52, 96, CX - 52, H - 24, alpha(PAL.ink, 0.35), 2);
    line(ctx, CX + 52, 96, CX + 52, H - 24, alpha(PAL.ink, 0.35), 2);
    /* the rod: pure below the cut, the impure end above it (set aside once cut) */
    const body = (y1, y2, ox, oy) => { ctx.save(); ctx.fillStyle = PAL.soft; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2; ctx.beginPath(); ctx.rect(CX - RW / 2 + ox, y1 + oy, RW, y2 - y1); ctx.fill(); ctx.stroke(); ctx.restore(); };
    if (cut > 0) { body(yOf(UC), yB, 0, 0); body(yT, yOf(UC), dx, dy); }
    else body(yT, yB, 0, 0);
    hits.push({ x: CX, y: (yT + yB) / 2, r: RW / 2, name: 'the silicon rod' });
    /* the molten zone at the heat source, glowing; it freezes as the cut is made */
    const zt = Math.max(HY - ZH / 2, yT), zb = Math.min(HY + ZH / 2, yB), glow = 1 - k;
    if (zb > zt && glow > 0) F.faded(ctx, glow, [0, 0], () => {
      ctx.save(); ctx.fillStyle = alpha(F.fact(MOLTEN), 0.25); ctx.fillRect(CX - RW / 2 - 6, zt - 6, RW + 12, zb - zt + 12);
      ctx.fillStyle = F.fact(MOLTEN); ctx.fillRect(CX - RW / 2 + 1, zt, RW - 2, zb - zt); ctx.restore();
    });
    /* the impurity atoms: in place until the zone reaches them, then carried in the melt */
    let inMelt = 0;
    IMP.forEach((m) => {
      const ride = uz + m.o, carried = m.u <= uz + A, u = Math.max(m.u, ride);
      if (carried) inMelt++;
      const sway = carried && cut === 0 ? Math.sin(t * 5 + m.ph) * 0.06 : 0;
      const piece = u > UC && cut > 0;
      const x = CX + (m.w + sway) * RW + (piece ? dx : 0), y = yOf(u) + (piece ? dy : 0);
      dot(ctx, x, y, F.cat(0), true, 5);
      hits.push({ x, y, r: 7, name: 'an impurity atom' });
    });
    /* the heat source, a coil round the tube */
    [-12, 0, 12].forEach((o) => { ctx.save(); ctx.strokeStyle = PAL.muted; ctx.lineWidth = 4; ctx.beginPath(); ctx.ellipse(CX, HY + o, 74, 9, 0, 0, TAU); ctx.stroke(); ctx.restore(); });
    hits.push({ x: CX - 70, y: HY, r: 14, name: 'the heat source' });
    /* the rod's motion while it is lowered */
    if (cut === 0 && s < 1) arrow(ctx, CX, yB + 12, CX, yB + 56, PAL.ink, 4);
    /* region names at fixed places in the frame, shown where the rod is there */
    const at = (y) => (yT < y && y < yB ? 1 : 0);
    label(ctx, 'heat source', CX - 76, HY, { side: 'left', leader: true, gap: 70, size: 20 });
    F.faded(ctx, at(HY - 90) * (1 - k), [0, 0], () => label(ctx, 'impure silicon', CX + RW / 2, HY - 90, { side: 'right', leader: true, gap: 110, size: 20 }));
    F.faded(ctx, at(HY) * (1 - k), [0, 0], () => label(ctx, 'molten silicon', CX + RW / 2, HY, { side: 'right', leader: true, gap: 110, size: 20 }));
    F.faded(ctx, at(HY + 90), [0, 0], () => label(ctx, 'pure silicon', CX + RW / 2, HY + 90, { side: 'right', leader: true, gap: 110, size: 20 }));
    if (cut > 0) F.faded(ctx, k, [0, 0], () => label(ctx, 'impure end, cut off', CX + RW / 2 + dx, (yT + yOf(UC)) / 2 + dy, { side: 'right', leader: true, gap: 40, size: 20 }));
    dot(ctx, 860, 620, F.cat(0), true, 5); text(ctx, 'impurity atom', 876, 620, PAL.ink, { size: 18, base: 'middle' });
    topline(ctx, cut > 0 ? 'The impure top end of the rod is cut off, leaving pure silicon.' : 'As the rod is lowered through the heat source, the molten zone moves up the rod and carries the impurities with it.');
    const main = cut > 0
      ? `\\text{impure end cut off:}\\ ${N}\\ \\text{of}\\ ${N}\\ \\text{impurity atoms removed},\\ 0\\ \\text{left in the pure silicon}`
      : `\\text{zone at}\\ ${Math.round(100 * s)}\\%\\ \\text{of the rod:}\\ ${inMelt}\\ \\text{of}\\ ${N}\\ \\text{impurity atoms in the melt},\\ 0\\ \\text{left in the pure silicon}`;
    tex(ro, main, false, { values: false });
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();

/* =====================================================================
   FIGURE 18.18: solid carbon dioxide against silicon dioxide. Dry ice is
   drawn as its crystal of separate linear molecules, each with two C=O
   double bonds; silica as the simplest network of corner-sharing SiO₄
   tetrahedra (the cristobalite pattern), one tetrahedron's bonds in ink.
   Still: a choice of solid. No ground; pitch bounded to ±1.3 rad.
===================================================================== */
(function () {
  const d = sim('sim-co2-sio2');
  const v = F.view3d(d.stage, { spin: 'idle', pitch: [-1.3, 1.3], tilt: 0.35, h: 500, dist: 10.5, views: [{ label: 'along an axis', yaw: 0, pitch: 0 }, { label: 'along a diagonal', yaw: Math.PI / 4, pitch: 0.6155 }] });
  const grp = v.part(0); if (grp) grp.position.y = -0.3;
  const FCC = [[0, 0, 0], [0.5, 0.5, 0], [0.5, 0, 0.5], [0, 0.5, 0.5]];
  const inCell = (p) => p.every((x) => x > -1e-6 && x < 1 + 1e-6);
  function fccCell() { const s = []; [0, 1].forEach((i) => [0, 1].forEach((j) => [0, 1].forEach((k) => FCC.forEach((f) => { const p = [f[0] + i, f[1] + j, f[2] + k]; if (inCell(p) && !s.some((q) => dist3(q, p) < 1e-6)) s.push(p); })))); return s; }
  const NM = { C: 'a carbon atom, C', O: 'an oxygen atom, O', Si: 'a silicon atom, Si' };
  const BUILD = {
    CO2() {
      const a = 2.3, dir = [[1, 1, 1], [1, -1, -1], [-1, -1, 1], [-1, 1, -1]].map((u) => u.map((x) => x / R3)), atoms = [], bonds = [];
      fccCell().forEach((p) => {
        const q = p.map((x) => Math.round(2 * x) % 2), kind = q[0] === 0 && q[1] === 0 ? (q[2] ? 3 : 0) : q[0] && q[1] ? 1 : q[0] ? 2 : 3;
        const c = p.map((x) => x * a), u = dir[kind], L = 0.5;
        atoms.push({ el: 'C', p: c, r: 0.12 }, { el: 'O', p: c.map((x, n) => x + u[n] * L), r: 0.13 }, { el: 'O', p: c.map((x, n) => x - u[n] * L), r: 0.13 });
        const n = atoms.length; bonds.push([n - 3, n - 2, 2], [n - 3, n - 1, 2]);
      });
      return { atoms, bonds };
    },
    SiO2() {
      const a = 2.5, DIA = [[0.25, 0.25, 0.25], [0.75, 0.75, 0.25], [0.75, 0.25, 0.75], [0.25, 0.75, 0.75]];
      const si = [...fccCell(), ...DIA].map((p) => ({ el: 'Si', p: p.map((x) => x * a), r: 0.2 }));
      const sb = bondsBy(si, (R3 / 4) * a), keep = si.map((_, i) => sb.some((b) => b.includes(i))), map = []; let n = 0;
      keep.forEach((k, i) => { map[i] = k ? n++ : -1; });
      const atoms = si.filter((_, i) => keep[i]), bonds = [];
      sb.forEach(([i, j]) => { const A = atoms[map[i]], B = atoms[map[j]]; atoms.push({ el: 'O', p: mid3(A.p, B.p), r: 0.14 }); const o = atoms.length - 1; bonds.push([map[i], o, 1], [o, map[j], 1]); });
      return { atoms, bonds };
    },
  };
  const INFO = {
    CO2: { label: 'carbon dioxide', head: 'Solid carbon dioxide is built of separate CO₂ molecules, each with two C=O double bonds.', ro: '\\text{O=C=O:}\\ 2\\ \\sigma + 2\\ \\pi\\ \\text{bonds},\\quad 2\\ \\text{O per C} \\quad\\Rightarrow\\quad \\text{CO}_{2}' },
    SiO2: { label: 'silicon dioxide', head: 'In silicon dioxide every silicon atom bonds to four oxygen atoms, and every oxygen atom bridges two silicon atoms.', ro: '\\text{Si:}\\ 4\\ \\sigma\\ \\text{bonds},\\ 0\\ \\pi,\\quad 4 \\times \\tfrac{1}{2}\\ \\text{O} = 2\\ \\text{O per Si} \\quad\\Rightarrow\\quad \\text{SiO}_{2}' },
  };
  const S = F.choice(d.controls, { label: '\\text{solid}', options: Object.keys(INFO).map((k) => ({ value: k, label: INFO[k].label })), value: 'CO2', aria: 'carbon dioxide or silicon dioxide' });
  let sig = '';
  const palSig = () => [PAL.ink, PAL.muted, ...['C', 'O', 'Si'].map((e) => F.el(e))].join('|');
  function draw() {
    const key = S.value + '|' + palSig();
    if (key !== sig && grp) {
      sig = key; v.clear();
      const s = BUILD[S.value](); centre(s.atoms);
      const h = S.value === 'SiO2' ? hub({ atoms: s.atoms.map((a) => (a.el === 'Si' ? a : { p: [99, 99, 99] })), bonds: s.bonds }, 4) : -1;
      s.atoms.forEach((a) => v.pickable(F.mesh.sphere(grp, a.p, a.r, F.el(a.el)), NM[a.el]));
      s.bonds.forEach(([i, j, o]) => { const on = i === h || j === h; if (o === 2) F.mesh.bond(grp, s.atoms[i].p, s.atoms[j].p, 2, 0.04, PAL.muted); else F.mesh.stick(grp, s.atoms[i].p, s.atoms[j].p, on ? 0.075 : 0.04, on ? PAL.ink : PAL.muted); });
      v.headline(INFO[S.value].head);
    }
    if (grp) F.fade3(grp, S.a(S.value));
    v.invalidate();
    tex(d.readout, INFO[S.value].ro);
  }
  register(d.fig, { update: () => {}, draw });
})();
};
