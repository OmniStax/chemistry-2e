/* Figures for section 8.1 Valence Bond Theory. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['8.1'] = function (root, F) {
const { el, fmt, tex, C, PAL, alpha, ctl, register, begin, line, dot, text, headline, topline, axes, curve, pinned } = F;
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
  const R = ctl(d.controls, { label: 'r', cls: 'length', min: 30, max: 300, step: 1, value: 74, unit: 'pm', dec: 0, aria: '以皮米为单位的核间距',
    specials: [{ at: 74, label: '键长' }] });
  /* a Morse curve with the book's depth, 7.24 × 10⁻¹⁹ J at 74 pm; energies in units of 10⁻¹⁹ J */
  const DEPTH = 7.24, RE = 74, A = 0.0194, NA = 6.022e23;
  const E = (r) => DEPTH * ((1 - Math.exp(-A * (r - RE))) ** 2 - 1);
  /* fixed axes: 0 to 300 pm across the slider's reach, −8 to +8 × 10⁻¹⁹ J to hold the curve from 30 pm clear of the axis title */
  const box = { l: 170, r: 1320, t: 250, b: 580 };
  const S = 1.3, RA = 46;                         /* the atoms above: 1.3 units per picometer, a drawn radius of 46 units */
  let hits = []; F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c);
    const r = R.v, e = E(r), cE = C('energy'), cL = C('length');
    const { X, Y } = axes(ctx, box, [0, 300], [-8, 8], { nx: 6, ny: 8, xl: '核间距（pm）', xc: cL, fy: (v) => minus(fmt(v, 0)) });
    line(ctx, box.l, Y(0), box.r, Y(0), alpha(PAL.ink, 0.35), 2, [10, 10]);
    line(ctx, box.l, Y(-DEPTH), X(RE), Y(-DEPTH), alpha(PAL.ink, 0.35), 2, [4, 8]);
    line(ctx, X(RE), Y(-DEPTH), X(RE), box.b, alpha(PAL.ink, 0.35), 2, [4, 8]);
    curve(ctx, E, 30, 300, X, Y, cE, 5, 160);
    text(ctx, '74 pm 处为 −7.24 × 10⁻¹⁹ J，即 H–H 键长', X(RE) + 90, Y(-DEPTH) + 4, cE, { size: 18, weight: 600, bg: PAL.panel });
    const p = pinned(ctx, box, X, Y, r, e, cE);
    /* the pair of atoms, centred over the point where the band allows, a leader down to the point */
    const half = (r * S) / 2, cx = Math.min(Math.max(X(r), box.l + half + RA + 10), 1380 - half - RA - 40), cy = 150;
    line(ctx, cx, cy + RA + 6, p.x, p.y - 12, alpha(PAL.ink, 0.35), 2, [4, 8]);
    text(ctx, '能量（10⁻¹⁹ J）', box.l, box.t - 24, cE, { weight: 600, size: 20, bg: PAL.panel });
    const over = Math.max(0, 1 - r / (2 * RA / S + 60));
    cloud(ctx, cx, cy, RA * 1.6 + half * over, over);
    cloud(ctx, cx - half, cy, RA * 1.5, 1 - over);
    cloud(ctx, cx + half, cy, RA * 1.5, 1 - over);
    atom(ctx, cx - half, cy, 'H', RA, 0.8); atom(ctx, cx + half, cy, 'H', RA, 0.8);
    dot(ctx, cx - half, cy, PAL.ink, true, 4); dot(ctx, cx + half, cy, PAL.ink, true, 4);
    text(ctx, 'H', cx - half - RA - 14, cy, PAL.ink, { size: 22, weight: 600, align: 'right' });
    text(ctx, 'H', cx + half + RA + 14, cy, PAL.ink, { size: 22, weight: 600 });
    hits = [{ x: cx - half, y: cy, r: RA, name: '氢原子，圆点为其原子核' }, { x: cx + half, y: cy, r: RA, name: '氢原子，圆点为其原子核' }];
    const eS = minus(fmt(e, 2)), kj = (e * 1e-19 * NA) / 1000;
    headline(ctx, r === RE ? '在 74 pm 处，能量为 −7.24 × 10⁻¹⁹ J，是其最低值，所以 74 pm 就是 H₂ 的键长。'
      : r < RE ? '在 ' + r + ' pm 处，排斥作用强于吸引作用，能量已升高到 ' + eS + ' × 10⁻¹⁹ J。'
      : e > -0.25 ? '在 ' + r + ' pm 处，原子相距足够远，几乎没有相互作用，能量接近于零。'
      : '在 ' + r + ' pm 处，原子开始相互作用，吸引作用强于排斥作用，能量为 ' + eS + ' × 10⁻¹⁹ J。');
    readout(d.readout, `\\kE = ${eS}\\times 10^{-19}\\ \\text{J},\\quad \\kE\\times N_{\\text{A}} = ${minus(fmt(kj, 0))}\\ \\text{kJ/mol}`,
      '键能就是极小值的深度：一个 H–H 键为 7.24 × 10⁻¹⁹ J，1 摩尔 H–H 键为 436 kJ。');
  }
  still(d, draw);
})();

/* =====================================================================
   FIGURE 8.3 + 8.4 + 8.5: two atomic orbitals overlapping. One choice
   walks the book's panels: two s orbitals, an s and a p, two p end to
   end, two p at an angle, two p side by side. A change of pair is one
   morph, the nuclei sliding and the p orbitals swinging to their new
   directions while an orbital that changes kind crossfades. Still: the
   pair only answers the choice. Built both ways (the book's RULES): the
   flat panels the book draws, the default, with the nuclei as dots; and
   the same lobes in three dimensions, mounted on the first switch, where
   turning the pair shows σ density on the axis and π density above and
   below a node. The pitch stays within 60° of level so the lobes never
   stand end on; no idle spin, since the side-on view is the book's.
   The lobes wear the two categorical colours for the book's two, the
   two signs of the orbital; phase is not yet the lesson.
===================================================================== */
(function () {
  const H2 = 500;
  const d = sim('sim-overlap', H2);
  const { sphere, lobe, stick } = F.mesh;
  const VIEW = F.choice(d.controls, { label: '\\text{视图}', options: [{ value: '2d', label: '2D' }, { value: '3d', label: '3D' }], value: '2d', aria: '平面图或可转动的场景', onInput: () => show() });
  /* each state: two atoms, each an s orbital or a p orbital along a direction in degrees; c is the categorical colour index of the lobe along +dir, as the book colours it */
  const STATES = {
    ss: { label: 's + s', names: ['H', 'H'], x: [-0.5, 0.5], k: ['s', 's'], dir: [0, 0], c: [0, 0], bond: 'σ',
      eq: '1s\\,(\\text{H}) + 1s\\,(\\text{H}) \\rightarrow \\text{一个 }\\sigma\\text{ 键}', head: '两个 $s$ 轨道在原子核之间重叠，形成 σ 键，如 H₂ 中。' },
    sp: { label: 's + p', names: ['H', 'Cl'], x: [-1.35, 0.55], k: ['s', 'p'], dir: [0, 180], c: [0, 0], bond: 'σ',
      eq: '1s\\,(\\text{H}) + 3p\\,(\\text{Cl}) \\rightarrow \\text{一个 }\\sigma\\text{ 键}', head: '一个 $s$ 轨道与一个 $p$ 轨道的一个瓣头碰头重叠：形成 σ 键，如 HCl 中。' },
    pp: { label: 'p + p 头碰头', names: ['Cl', 'Cl'], x: [-0.95, 0.95], k: ['p', 'p'], dir: [0, 180], c: [1, 1], bond: 'σ',
      eq: '3p\\,(\\text{Cl}) + 3p\\,(\\text{Cl}) \\rightarrow \\text{一个 }\\sigma\\text{ 键}', head: '头碰头的两个 $p$ 轨道重叠最多：形成 σ 键，如 Cl₂ 中。' },
    tilt: { label: 'p + p 成一定角度', names: ['Cl', 'Cl'], x: [-0.95, 0.95], k: ['p', 'p'], dir: [45, 135], c: [1, 1], bond: '',
      eq: '3p\\,(\\text{Cl}) + 3p\\,(\\text{Cl}) \\rightarrow \\text{重叠较少}', head: '偏离核间轴时，同样的两个 $p$ 轨道重叠较少。' },
    pi: { label: 'p + p 肩并肩', names: ['C', 'C'], x: [-0.28, 0.28], k: ['p', 'p'], dir: [90, 90], c: [1, 1], bond: 'π',
      eq: '2p\\,(\\text{C}) + 2p\\,(\\text{C}) \\rightarrow \\text{一个 }\\pi\\text{ 键}', head: '两个平行的 $p$ 轨道在轴的上方和下方重叠，形成 π 键。' },
  };
  const pick = F.choice(d.controls, { label: '\\text{轨道}', options: Object.keys(STATES).map((k) => ({ value: k, label: STATES[k].label })), value: 'ss', aria: '哪一对轨道发生重叠', onInput: () => draw() });
  const LEN = 1.25, RS = 0.78, AX = 3.0;          /* a p lobe's reach, an s orbital's radius, the axis's half length, in scene units */
  const NAME = { H: '氢', Cl: '氯', C: '碳' };
  const SHELL = { H: '1s', Cl: '3p', C: '2p' };
  /* the morph between the state the pair left and the one it is going to: per atom its position, direction, kinds with their weights, colours and name */
  function frame() {
    const A = STATES[pick.from ?? pick.value] ?? STATES[pick.value], B = STATES[pick.value];
    const q = F.ease.smooth(Math.min(1, Math.max(0, pick.k)));
    const atoms = [0, 1].map((i) => {
      const who = q < 0.5 ? A.names[i] : B.names[i];
      return { x: A.x[i] + (B.x[i] - A.x[i]) * q, ang: A.dir[i] + (B.dir[i] - A.dir[i]) * q, who,
        kinds: A.k[i] === B.k[i] ? [[B.k[i], 1]] : [[A.k[i], 1 - q], [B.k[i], q]],
        c: F.mixColor(F.cat(A.c[i]), F.cat(B.c[i]), q), c2: F.mixColor(F.cat(1 - A.c[i]), F.cat(1 - B.c[i]), q) };
    });
    const orb = (who, kind) => `${NAME[who]}原子的 ${kind === 's' ? '1s' : SHELL[who]} 轨道`;
    return { B, atoms, orb, node: (A.bond === 'π' ? 1 - q : 0) + (B.bond === 'π' ? q : 0) };
  }

  /* ---------- the flat panels, as the book draws them: lobes seen side on, the nuclei as dots ---------- */
  const U = 118, CX = 700, CY = 262;             /* 118 units per scene unit: the end-to-end pair spans ±2.4, the π pair ±1.45 up and down */
  let hits = []; F.hover(d.stage, () => hits);
  function shape(ctx, x, y, ang, col, a, draw) {
    ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(-ang * RAD);
    ctx.beginPath(); draw(); ctx.globalAlpha *= 0.5; ctx.fillStyle = col; ctx.fill();
    ctx.globalAlpha /= 0.5; ctx.lineWidth = 2.5; ctx.strokeStyle = col; ctx.stroke(); ctx.restore();
  }
  /* a p lobe is the side view of the scene's ellipsoid: from 0.04 L to 1.16 L along its direction, 0.3 L either side */
  const lobe2 = (ctx, x, y, ang, col, a) => shape(ctx, x, y, ang, col, a, () => ctx.ellipse(0.6 * LEN * U, 0, 0.56 * LEN * U, 0.3 * LEN * U, 0, 0, TAU));
  function draw2d(f) {
    const { ctx } = begin(d.c);
    const lab = F.labeller(ctx, H2, { headline: headline(ctx, f.B.head) });
    hits = [];
    const xl = CX - AX * U, xr = CX + AX * U;
    line(ctx, xl, CY, xr, CY, alpha(PAL.ink, 0.45), 2, [10, 10]);
    f.atoms.forEach((t) => {
      const x = CX + t.x * U;
      t.kinds.forEach(([kind, a]) => {
        if (a <= 0.01) return;
        if (kind === 's') { shape(ctx, x, CY, 0, F.cat(0), a, () => ctx.arc(0, 0, RS * U, 0, TAU)); hits.push({ x, y: CY, r: RS * U, name: f.orb(t.who, 's') }); return; }
        lobe2(ctx, x, CY, t.ang, t.c, a); lobe2(ctx, x, CY, t.ang + 180, t.c2, a);
        [t.ang, t.ang + 180].forEach((g) => hits.push({ x: x + Math.cos(g * RAD) * 0.6 * LEN * U, y: CY - Math.sin(g * RAD) * 0.6 * LEN * U, r: 0.3 * LEN * U, name: f.orb(t.who, 'p') + '，一个瓣' }));
      });
    });
    f.atoms.forEach((t) => { dot(ctx, CX + t.x * U, CY, PAL.ink, true, 7); hits.unshift({ x: CX + t.x * U, y: CY, r: 12, name: `${NAME[t.who]}原子的原子核` }); });
    /* the atoms named in a row under the drawing, each under its own nucleus, a gap below the lowest orbital */
    const reach = (φ) => { const s = Math.sin(φ * RAD), c = Math.cos(φ * RAD); return -0.6 * LEN * s + Math.hypot(0.56 * LEN * s, 0.3 * LEN * c); };
    const low = Math.max(...f.atoms.flatMap((t) => t.kinds.filter(([, a]) => a > 0.01).map(([kind]) => (kind === 's' ? RS : Math.max(reach(t.ang), reach(t.ang + 180))))));
    f.atoms.forEach((t) => lab.add(t.who, CX + t.x * U, Math.min(H2 - 28, CY + low * U + 34), 0, 0, PAL.ink, 24, 0.01));
    lab.add('核间轴', xr, CY, 1, 0, PAL.muted, 20, 14);
    if (f.node > 0.5) lab.add('节面', xl, CY, -1, 0, PAL.ink, 20, 14);
    lab.flush();
  }

  /* ---------- the same lobes in three dimensions, mounted on the first switch ---------- */
  let v = null, g = null, strip = null;
  function mount() {
    v = F.view3d(d.stage, { spin: 'off', h: 420, dist: 6.5, tilt: 0.35, pitch: [-Math.PI / 3, Math.PI / 3],
      views: [{ label: '侧视', yaw: 0, pitch: 0 }, { label: '沿轴向', yaw: Math.PI / 2, pitch: 0 }] });
    g = v.part(0);
    strip = F.makeCanvas(d.stage, 84); d.stage.insertBefore(strip, v.wrap);   /* the headline above the scene, never on the lobes */
  }
  function fade(m, a) { m.material.transparent = true; m.material.opacity *= a; m.material.depthWrite = a > 0.9 && m.material.opacity > 0.6; m.visible = a > 0.01; return m; }
  function draw3d(f) {
    v.clear();
    f.atoms.forEach((t) => {
      const n = [t.x, 0, 0], u = [Math.cos(t.ang * RAD), Math.sin(t.ang * RAD), 0];
      v.pickable(sphere(g, n, 0.07, PAL.ink), `${NAME[t.who]}原子的原子核`);
      t.kinds.forEach(([kind, a]) => {
        if (a <= 0.01) return;
        if (kind === 's') { v.pickable(fade(sphere(g, n, RS, F.cat(0), { transparent: true, opacity: 0.5 }), a), f.orb(t.who, 's')); return; }
        v.pickable(fade(lobe(g, n, u, LEN, t.c), a), f.orb(t.who, 'p') + '，一个瓣');
        v.pickable(fade(lobe(g, n, [-u[0], -u[1], -u[2]], LEN, t.c2), a), f.orb(t.who, 'p') + '，另一个瓣');
      });
    });
    /* the node of the π bond: the plane of the internuclear axis, a faint ink sheet */
    if (f.node > 0.02) v.pickable(F.mesh.box(g, [0, 0, 0], [4.4, 0.004, 2.4], PAL.ink, { transparent: true, opacity: 0.12 * f.node, depthWrite: false }), '节面，一个通过核间轴的平面');
    v.pickable(stick(g, [-AX, 0, 0], [AX, 0, 0], 0.025, PAL.muted), '核间轴');
    v.invalidate();
    topline(begin(strip).ctx, f.B.head);
  }

  function show() {
    const three = VIEW.value === '3d';
    if (three && !v) mount();
    d.c.style.display = three ? 'none' : '';
    if (v) [v.wrap, strip, d.stage.querySelector('.view3d-bar')].forEach((e) => { if (e) e.style.display = three ? '' : 'none'; });
    draw();
  }
  function draw() {
    const f = frame();
    if (VIEW.value === '3d' && v) { hits = []; draw3d(f); } else draw2d(f);
    tex(d.readout, f.B.eq);
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
    [[250, '一个 σ 键', '没有 π 键'], [700, '一个 σ 键', '一个 π 键'], [1150, '一个 σ 键', '两个 π 键']].forEach(([x, a, b]) => {
      text(ctx, a, x, 180, PAL.ink, { size: 24, align: 'center' });
      text(ctx, b, x, 215, PAL.ink, { size: 24, align: 'center' });
    });
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
