/* Figures for section 8.1 Valence Bond Theory. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['8.1'] = function (root, F) {
const { el, fmt, tex, C, PAL, alpha, ctl, register, begin, line, dot, text, headline, axes, curve, pinned } = F;
const sim = (id, H) => F.sim(root, id, H);
const still = (d, draw) => register(d.fig, { update: () => {}, draw });
function readout(host, main, small) { tex(host, main); if (small) host.appendChild(el('small', null, small)); }
const TAU = 2 * Math.PI, RAD = Math.PI / 180;
const minus = (s) => s.replace('-', '−');

/* an atom as a filled disc in its element colour, hydrogen's white held by an ink outline */
function atom(ctx, x, y, sym, r, a = 1) {
  ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU);
  ctx.fillStyle = F.el(sym); ctx.fill();
  ctx.lineWidth = sym === 'H' ? 2.5 : 1.5; ctx.strokeStyle = sym === 'H' ? PAL.ink : alpha(PAL.ink, 0.45); ctx.stroke(); ctx.restore();
}
/* a soft cloud of electron density: a disc shaded from its centre outward */
function cloud(ctx, x, y, r, a) {
  if (!(r > 1) || !(a > 0)) return;
  const g = ctx.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, alpha(PAL.ink, 0.34 * a)); g.addColorStop(0.6, alpha(PAL.ink, 0.2 * a)); g.addColorStop(1, alpha(PAL.ink, 0));
  ctx.save(); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.restore();
}

/* ---------- Lewis structures, in ink ---------- */
function bondLine(ctx, x1, y1, x2, y2, order) {
  const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy) || 1, px = -dy / L * 7, py = dx / L * 7;
  const offs = order === 1 ? [0] : order === 2 ? [-1, 1] : [-1.4, 0, 1.4];
  offs.forEach((o) => line(ctx, x1 + px * o, y1 + py * o, x2 + px * o, y2 + py * o, PAL.ink, 3.5));
}
/* atoms: [{sym, x, y, lp: [angles in degrees]}]; bonds: [[i, j, order]]; drawn about (cx, cy) */
function lewis(ctx, cx, cy, atoms, bonds) {
  const gap = 20;
  bonds.forEach(([i, j, order]) => {
    const a = atoms[i], b = atoms[j], x1 = cx + a.x, y1 = cy + a.y, x2 = cx + b.x, y2 = cy + b.y, dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy) || 1;
    bondLine(ctx, x1 + dx * gap / L, y1 + dy * gap / L, x2 - dx * gap / L, y2 - dy * gap / L, order);
  });
  atoms.forEach((a) => {
    const x = cx + a.x, y = cy + a.y;
    text(ctx, a.sym, x, y + 1, PAL.ink, { size: 30, weight: 600, align: 'center' });
    (a.lp ?? []).forEach((ang) => {
      const c = Math.cos(ang * RAD), s = -Math.sin(ang * RAD), d = a.sym.length > 1 ? 34 : 28, px = -s, py = c;
      dot(ctx, x + c * d + px * 7, y + s * d + py * 7, PAL.ink, true, 4);
      dot(ctx, x + c * d - px * 7, y + s * d - py * 7, PAL.ink, true, 4);
    });
  });
}

/* =====================================================================
   FIGURE 8.2: the energy of two hydrogen atoms against the distance
   between their nuclei. The pair is drawn above the curve at the chosen
   distance and the point rides the curve. Still: the energy answers the
   distance, and nothing here has a clock.
===================================================================== */
(function () {
  const d = sim('sim-morse', 640);
  const R = ctl(d.controls, { label: 'r', cls: 'length', min: 30, max: 300, step: 1, value: 74, unit: 'pm', dec: 0, aria: 'internuclear distance in picometers',
    specials: [{ at: 74, label: 'bond length' }] });
  /* a Morse curve with the book's depth, 7.24 × 10⁻¹⁹ J at 74 pm; energies in units of 10⁻¹⁹ J */
  const DEPTH = 7.24, RE = 74, A = 0.0194, NA = 6.022e23;
  const E = (r) => DEPTH * ((1 - Math.exp(-A * (r - RE))) ** 2 - 1);
  /* fixed axes: 0 to 300 pm across the slider's reach, −8 to +6 × 10⁻¹⁹ J to hold the curve from 30 pm */
  const box = { l: 170, r: 1320, t: 250, b: 580 };
  const S = 1.3, RA = 46;                         /* the atoms above: 1.3 units per picometer, a drawn radius of 46 units */
  let hits = []; F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c);
    const r = R.v, e = E(r), cE = C('energy'), cL = C('length');
    const { X, Y } = axes(ctx, box, [0, 300], [-8, 6], { nx: 6, ny: 7, xl: 'internuclear distance (pm)', xc: cL, yl: 'energy (10⁻¹⁹ J)', yc: cE, fy: (v) => minus(fmt(v, 0)) });
    line(ctx, box.l, Y(0), box.r, Y(0), alpha(PAL.ink, 0.35), 2, [10, 10]);
    line(ctx, box.l, Y(-DEPTH), X(RE), Y(-DEPTH), alpha(PAL.ink, 0.35), 2, [4, 8]);
    line(ctx, X(RE), Y(-DEPTH), X(RE), box.b, alpha(PAL.ink, 0.35), 2, [4, 8]);
    curve(ctx, E, 30, 300, X, Y, cE, 5, 160);
    text(ctx, '−7.24 × 10⁻¹⁹ J at 74 pm, the H–H bond length', X(RE) + 34, Y(-DEPTH) + 4, cE, { size: 18, weight: 600, bg: PAL.panel });
    const p = pinned(ctx, box, X, Y, r, e, cE);
    /* the pair of atoms, centred over the point where the band allows, a leader down to the point */
    const half = (r * S) / 2, cx = Math.min(Math.max(X(r), box.l + half + RA + 10), 1380 - half - RA), cy = 150;
    line(ctx, cx, cy + RA + 6, p.x, p.y - 12, alpha(PAL.ink, 0.35), 2, [4, 8]);
    const over = Math.max(0, 1 - r / (2 * RA / S + 60));
    cloud(ctx, cx, cy, RA * 1.6 + half * over, 0.4 + 0.6 * over);
    cloud(ctx, cx - half, cy, RA * 1.5, 1 - over);
    cloud(ctx, cx + half, cy, RA * 1.5, 1 - over);
    atom(ctx, cx - half, cy, 'H', RA, 0.8); atom(ctx, cx + half, cy, 'H', RA, 0.8);
    dot(ctx, cx - half, cy, PAL.ink, true, 4); dot(ctx, cx + half, cy, PAL.ink, true, 4);
    text(ctx, 'H', cx - half - RA - 14, cy, PAL.ink, { size: 22, weight: 600, align: 'right' });
    text(ctx, 'H', cx + half + RA + 14, cy, PAL.ink, { size: 22, weight: 600 });
    hits = [{ x: cx - half, y: cy, r: RA, name: 'a hydrogen atom, its nucleus the dot' }, { x: cx + half, y: cy, r: RA, name: 'a hydrogen atom, its nucleus the dot' }];
    const eS = minus(fmt(e, 2)), kj = (e * 1e-19 * NA) / 1000;
    headline(ctx, r === RE ? 'At 74 pm the energy is −7.24 × 10⁻¹⁹ J, its lowest value, so 74 pm is the bond distance of H₂.'
      : r < RE ? 'At ' + r + ' pm the repulsions are stronger than the attractions, and the energy has risen to ' + eS + ' × 10⁻¹⁹ J.'
      : e > -0.15 ? 'At ' + r + ' pm the atoms are far enough apart to have almost no interaction, and the energy is close to zero.'
      : 'At ' + r + ' pm the atoms begin to interact, the attractions are stronger than the repulsions, and the energy is ' + eS + ' × 10⁻¹⁹ J.');
    readout(d.readout, `\\kE = ${eS}\\times 10^{-19}\\ \\text{J},\\quad \\kE\\times N_{\\text{A}} = ${minus(fmt(kj, 0))}\\ \\text{kJ/mol}`,
      'The bond energy is the depth of the minimum: 7.24 × 10⁻¹⁹ J for one H–H bond, or 436 kJ for a mole of them.');
  }
  still(d, draw);
})();

/* =====================================================================
   FIGURE 8.3 + 8.4 + 8.5: two atomic orbitals overlapping, in three
   dimensions. One choice walks the book's panels: two s orbitals, an s
   and a p, two p end to end, two p at an angle, two p side by side. A
   change of pair is one morph, the nuclei sliding and the p orbitals
   swinging to their new directions while an orbital that changes kind
   crossfades. Still: the pair only answers the choice and the drag.
   The lobes wear the book's two colours as the two categorical colours,
   the two signs of the orbital; phase is not yet the lesson.
===================================================================== */
(function () {
  const d = sim('sim-overlap');
  const { sphere, lobe, polyline } = F.mesh;
  const v = F.view3d(d.stage, { spin: 'idle', h: 500, dist: 9, tilt: 0.25, pitch: [-1.2, 1.2],
    views: [{ label: 'side on', yaw: 0, pitch: 0 }, { label: 'along the axis', yaw: Math.PI / 2, pitch: 0 }] });
  const g = v.part(0);
  const up = (a) => [Math.cos(a * RAD), Math.sin(a * RAD), 0];
  /* each state: two atoms, each an s orbital or a p orbital along a direction; c is the categorical colour index of the lobe along +dir, as the book colours it */
  const STATES = {
    ss: { label: 's + s', names: ['H', 'H'], x: [-0.5, 0.5], k: ['s', 's'], dir: [0, 0], c: [0, 0], bond: 'σ',
      eq: '1s\\,(\\text{H}) + 1s\\,(\\text{H}) \\rightarrow \\text{one }\\sigma\\text{ bond}', head: 'Two s orbitals overlap on the line between the nuclei and form a σ bond, as in H₂.' },
    sp: { label: 's + p', names: ['H', 'Cl'], x: [-1.35, 0.55], k: ['s', 'p'], dir: [0, 180], c: [0, 0], bond: 'σ',
      eq: '1s\\,(\\text{H}) + 3p\\,(\\text{Cl}) \\rightarrow \\text{one }\\sigma\\text{ bond}', head: 'An s orbital overlaps one lobe of a p orbital end on and forms a σ bond, as in HCl.' },
    pp: { label: 'p + p end to end', names: ['Cl', 'Cl'], x: [-1.25, 1.25], k: ['p', 'p'], dir: [0, 180], c: [1, 1], bond: 'σ',
      eq: '3p\\,(\\text{Cl}) + 3p\\,(\\text{Cl}) \\rightarrow \\text{one }\\sigma\\text{ bond}', head: 'Two p orbitals directed end to end overlap on the internuclear axis as much as they can and form a σ bond, as in Cl₂.' },
    tilt: { label: 'p + p at an angle', names: ['Cl', 'Cl'], x: [-1.25, 1.25], k: ['p', 'p'], dir: [45, 135], c: [1, 1], bond: '',
      eq: '3p\\,(\\text{Cl}) + 3p\\,(\\text{Cl}) \\rightarrow \\text{less overlap}', head: 'Turned away from the line between the nuclei, the same two p orbitals overlap much less.' },
    pi: { label: 'p + p side by side', names: ['C', 'C'], x: [-0.62, 0.62], k: ['p', 'p'], dir: [90, 90], c: [1, 1], bond: 'π',
      eq: '2p\\,(\\text{C}) + 2p\\,(\\text{C}) \\rightarrow \\text{one }\\pi\\text{ bond}', head: 'Two parallel p orbitals overlap side by side above and below the internuclear axis and form a π bond, with a node along the axis.' },
  };
  const NOTE = { σ: 'The electron density of a σ bond is concentrated on the internuclear axis.', π: 'The two regions of overlap of a π bond lie on opposite sides of the internuclear axis.', '': 'Any arrangement other than end to end results in less overlap.' };
  const pick = F.choice(d.controls, { label: '\\text{orbitals}', options: Object.keys(STATES).map((k) => ({ value: k, label: STATES[k].label })), value: 'ss', aria: 'which pair of orbitals overlaps', onInput: () => draw() });
  const LEN = 1.25, RS = 0.78;
  const NAME = { H: 'hydrogen', Cl: 'chlorine', C: 'carbon' };
  const SHELL = { H: '1s', Cl: '3p', C: '2p' };
  function fade(m, a) { m.material.transparent = true; m.material.opacity *= a; m.material.depthWrite = a > 0.9 && m.material.opacity > 0.6; m.visible = a > 0.01; return m; }
  function draw() {
    v.clear();
    const A = STATES[pick.from ?? pick.value] ?? STATES[pick.value], B = STATES[pick.value], k = pick.k;
    const q = F.ease.smooth(Math.min(1, Math.max(0, k)));
    [0, 1].forEach((i) => {
      const x = A.x[i] + (B.x[i] - A.x[i]) * q, n = [x, 0, 0];
      sphere(g, n, 0.07, PAL.ink);
      const sym = q < 0.5 ? A.names[i] : B.names[i];
      v.label(sym, [x, -0.28, 0.3], g, 0);
      /* the orbital: an s sphere, a p pair of lobes, or both crossfading when the kind changes */
      const kinds = A.k[i] === B.k[i] ? [[B.k[i], 1]] : [[A.k[i], 1 - q], [B.k[i], q]];
      const a0 = A.dir[i], a1 = B.dir[i], ang = a0 + (a1 - a0) * q;
      kinds.forEach(([kind, a]) => {
        if (a <= 0.01) return;
        const who = q < 0.5 ? A.names[i] : B.names[i], orb = kind === 's' ? '1s' : SHELL[who];
        const name = `the ${orb} orbital of a ${NAME[who]} atom`;
        if (kind === 's') { v.pickable(fade(sphere(g, n, RS, F.cat(0), { transparent: true, opacity: 0.5 }), a), name); return; }
        const u = up(ang), c = F.mixColor(F.cat(A.c[i]), F.cat(B.c[i]), q), c2 = F.mixColor(F.cat(1 - A.c[i]), F.cat(1 - B.c[i]), q);
        v.pickable(fade(lobe(g, n, u, LEN, c), a), name + ', one lobe');
        v.pickable(fade(lobe(g, n, [-u[0], -u[1], -u[2]], LEN, c2), a), name + ', the other lobe');
      });
    });
    /* the node of the π bond: the plane of the internuclear axis, drawn as a faint ink sheet with a dashed rim */
    const pa = (A.bond === 'π' ? 1 - q : 0) + (B.bond === 'π' ? q : 0);
    if (pa > 0.02) {
      const w = 2.2, dz = 1.2, rim = [[-w, 0, -dz], [w, 0, -dz], [w, 0, dz], [-w, 0, dz], [-w, 0, -dz]];
      F.mesh.box(g, [0, 0, 0], [2 * w, 0.004, 2 * dz], PAL.ink, { transparent: true, opacity: 0.1 * pa, depthWrite: false });
      polyline(g, rim, alpha(PAL.ink, 0.6));
      v.label('node', [w, 0, -dz], g, 0);
    }
    polyline(g, [[-2.3, 0, 0], [2.3, 0, 0]], alpha(PAL.ink, 0.5));
    v.label('internuclear axis', [-2.3, 0, 0], g, 18);
    v.headline(B.head);
    readout(d.readout, B.eq, NOTE[B.bond]);
  }
  still(d, draw);
})();

/* =====================================================================
   The Lewis structures of HCl, O2 and N2 with their σ and π counts, a
   faithful still copy of the book's image.
===================================================================== */
(function () {
  const H = 260;
  const d = sim('fig-bond-types', H);
  function draw() {
    const { ctx } = begin(d.c);
    const y = 90;
    lewis(ctx, 250, y, [{ sym: 'H', x: -60, y: 0 }, { sym: 'Cl', x: 60, y: 0, lp: [0, 90, 270] }], [[0, 1, 1]]);
    lewis(ctx, 700, y, [{ sym: 'O', x: -60, y: 0, lp: [90, 180] }, { sym: 'O', x: 60, y: 0, lp: [90, 0] }], [[0, 1, 2]]);
    lewis(ctx, 1150, y, [{ sym: 'N', x: -60, y: 0, lp: [180] }, { sym: 'N', x: 60, y: 0, lp: [0] }], [[0, 1, 3]]);
    [[250, 'One σ bond', 'No π bonds'], [700, 'One σ bond', 'One π bond'], [1150, 'One σ bond', 'Two π bonds']].forEach(([x, a, b]) => {
      text(ctx, a, x, 180, PAL.ink, { size: 24, align: 'center' });
      text(ctx, b, x, 215, PAL.ink, { size: 24, align: 'center' });
    });
    tex(d.readout, '\\text{HCl} \\qquad \\text{O}_2 \\qquad \\text{N}_2');
  }
  still(d, draw);
})();

/* =====================================================================
   EXAMPLE 8.1: the Lewis structure of butadiene, a faithful still copy.
===================================================================== */
(function () {
  const H = 300;
  const d = sim('fig-butadiene', H);
  function draw() {
    const { ctx } = begin(d.c);
    const cx = 700, cy = 160, s = 105, c30 = Math.cos(30 * RAD) * s, s30 = s / 2;
    /* the zigzag chain C1=C2–C3=C4, then the hydrogens */
    const C1 = { sym: 'C', x: -1.5 * c30, y: -s30 / 2 }, C2 = { sym: 'C', x: -0.5 * c30, y: s30 / 2 }, C3 = { sym: 'C', x: 0.5 * c30, y: -s30 / 2 }, C4 = { sym: 'C', x: 1.5 * c30, y: s30 / 2 };
    const atoms = [C1, C2, C3, C4,
      { sym: 'H', x: C1.x, y: C1.y - s * 0.95 }, { sym: 'H', x: C1.x - c30, y: C1.y + s30 },
      { sym: 'H', x: C2.x, y: C2.y + s * 0.95 },
      { sym: 'H', x: C3.x, y: C3.y - s * 0.95 },
      { sym: 'H', x: C4.x + c30, y: C4.y - s30 }, { sym: 'H', x: C4.x, y: C4.y + s * 0.95 }];
    lewis(ctx, cx, cy, atoms, [[0, 1, 2], [1, 2, 1], [2, 3, 2], [0, 4, 1], [0, 5, 1], [1, 6, 1], [2, 7, 1], [3, 8, 1], [3, 9, 1]]);
    tex(d.readout, '\\text{C}_4\\text{H}_6');
  }
  still(d, draw);
})();
};
