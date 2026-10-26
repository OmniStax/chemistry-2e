/* Figures for section 8.3 Multiple Bonds. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['8.3'] = function (root, F) {
const { tex, C, PAL, alpha, register, begin, line, arrow, text, topline } = F;
const sim = (id, H) => F.sim(root, id, H);
const still = (d, draw) => register(d.fig, { update: () => {}, draw });
const RAD = Math.PI / 180;

/* ---------- Lewis structures, flat and in ink ---------- */
function bondLine(ctx, x1, y1, x2, y2, order) {
  const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy) || 1, px = -dy / L * 6, py = dx / L * 6;
  const offs = order === 1 ? [0] : order === 2 ? [-1, 1] : [-1.5, 0, 1.5];
  offs.forEach((o) => line(ctx, x1 + px * o, y1 + py * o, x2 + px * o, y2 + py * o, PAL.ink, 3.5));
}
/* atoms: [{sym, x, y, lp: [angles in degrees, 0 to the right, 90 up], q: '+' | '−'}]; bonds: [[i, j, order]]; drawn about (cx, cy) */
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
      const c = Math.cos(ang * RAD), s = -Math.sin(ang * RAD), r = 28, px = -s, py = c;
      F.dot(ctx, x + c * r + px * 7, y + s * r + py * 7, PAL.ink, true, 4);
      F.dot(ctx, x + c * r - px * 7, y + s * r - py * 7, PAL.ink, true, 4);
    });
    if (a.q) text(ctx, a.q, x + (a.qx ?? 24), y - 26, PAL.ink, { size: 24, weight: 600, align: 'center' });
  });
}
/* the double-headed arrow between two resonance forms */
function resonanceArrow(ctx, x1, x2, y) {
  const m = (x1 + x2) / 2;
  arrow(ctx, m, y, x2, y, PAL.ink, 3.5); arrow(ctx, m, y, x1, y, PAL.ink, 3.5);
}

/* =====================================================================
   The Lewis structure of ethene, faithful.
===================================================================== */
(function () {
  const H = 220, d = sim('fig-lewis-ethene', H);
  function draw() {
    const { ctx } = begin(d.c);
    lewis(ctx, 700, H / 2, [
      { sym: 'C', x: -60, y: 0 }, { sym: 'C', x: 60, y: 0 },
      { sym: 'H', x: -140, y: -62 }, { sym: 'H', x: -140, y: 62 }, { sym: 'H', x: 140, y: -62 }, { sym: 'H', x: 140, y: 62 },
    ], [[0, 1, 2], [0, 2, 1], [0, 3, 1], [1, 4, 1], [1, 5, 1]]);
    tex(d.readout, '\\text{C}_2\\text{H}_4');
  }
  still(d, draw);
})();

/* =====================================================================
   FIGURE 8.22: the orbitals of an isolated carbon atom and of the
   hybridized carbon atom, on one energy axis. The book draws the sp2
   carbon of ethene; a choice switches to the sp carbon of acetylene,
   and the third orbital line leaves the hybrid set for the p set.
   Still: the choice morphs the lines and nothing else moves.
===================================================================== */
(function () {
  const H = 460, d = sim('sim-hybrid-levels', H);
  /* the two energies the book draws, and a hybrid level at the s and p shares of its mixture */
  const Y2S = 392, Y2P = 212, level = (sShare) => Y2S + (Y2P - Y2S) * (1 - sShare);
  const STATE = {
    sp2: { xs: [900, 980, 1060, 1200], ys: [level(1 / 3), level(1 / 3), level(1 / 3), Y2P], hyb: 3, name: 'sp²', mol: 'C_{2}H_{4}' },
    sp: { xs: [900, 980, 1120, 1200], ys: [level(1 / 2), level(1 / 2), Y2P, Y2P], hyb: 2, name: 'sp', mol: 'C_{2}H_{2}' },
  };
  const ro = F.readout(d);
  const pick = F.choice(d.controls, { label: '\\text{hybridization}', aria: 'the hybridization of the carbon atom', options: [{ value: 'sp2', label: 'sp² (C₂H₄)' }, { value: 'sp', label: 'sp (C₂H₂)' }], value: 'sp2' });
  const HALF = 34;
  function orbital(ctx, x, y) { line(ctx, x - HALF, y, x + HALF, y, PAL.ink, 4); }
  /* an electron as a half-arrow on its orbital line, up or down */
  function electron(ctx, x, y, up) {
    const y1 = up ? y - 6 : y - 46, y2 = up ? y - 46 : y - 6;
    line(ctx, x, y1, x, y2, PAL.ink, 3);
    line(ctx, x, y2, x + (up ? -10 : 10), y2 + (up ? 14 : -14), PAL.ink, 3);
  }
  function draw() {
    const { ctx } = begin(d.c);
    const st = STATE[pick.value];
    const WORD = ['', 'one', 'two', 'three'];
    topline(ctx, `In the ${st.name}-hybridized carbon atom, ${WORD[st.hyb]} ${st.name} hybrid orbitals and ${WORD[4 - st.hyb]} unhybridized p orbital${st.hyb === 3 ? '' : 's'} each hold one electron.`);
    /* the energy axis, the one quantity the figure draws */
    const E = C('energy');
    arrow(ctx, 110, 430, 110, 128, E, 4);
    text(ctx, 'E', 110, 108, E, { size: 24, weight: 600, align: 'center' });
    /* the isolated atom */
    text(ctx, 'Orbitals in an isolated C atom', 370, 130, PAL.ink, { size: 20, weight: 600, align: 'center' });
    orbital(ctx, 230, Y2S); electron(ctx, 220, Y2S, true); electron(ctx, 240, Y2S, false);
    text(ctx, '2s', 230, Y2S + 50, PAL.ink, { size: 20, align: 'center' });
    [390, 470, 550].forEach((x, i) => { orbital(ctx, x, Y2P); if (i < 2) electron(ctx, x, Y2P, true); });
    text(ctx, '2p', 470, Y2P + 50, PAL.ink, { size: 20, align: 'center' });
    /* hybridization */
    arrow(ctx, 650, 300, 800, 300, PAL.ink, 4);
    text(ctx, 'Hybridization', 725, 276, PAL.ink, { size: 20, align: 'center' });
    /* the hybridized atom: four lines that move between the two states */
    const m = pick.mix((v) => ({ xs: STATE[v].xs, ys: STATE[v].ys }));
    m.xs.forEach((x, i) => { orbital(ctx, x, m.ys[i]); electron(ctx, x, m.ys[i], true); });
    ['sp2', 'sp'].forEach((v) => pick.only(ctx, v, () => {
      const s = STATE[v];
      text(ctx, `Orbitals in the ${s.name} hybridized C atom in ${s.mol}`, 1050, 130, PAL.ink, { size: 20, weight: 600, align: 'center' });
      const hx = s.xs.slice(0, s.hyb), px = s.xs.slice(s.hyb);
      text(ctx, s.name, (hx[0] + hx[hx.length - 1]) / 2, s.ys[0] + 50, PAL.ink, { size: 20, align: 'center' });
      text(ctx, '2p', (px[0] + px[px.length - 1]) / 2, Y2P + 50, PAL.ink, { size: 20, align: 'center' });
    }, [0, 8]));
    if (pick.value === 'sp2') ro.set('\\mk{s}{2s} + \\mk{p}{2\\,(2p)} \\longrightarrow \\mk{h}{3\\,sp^2}', null, { form: 'sp2' });
    else ro.set('\\mk{s}{2s} + \\mk{p}{2p} \\longrightarrow \\mk{h}{2\\,sp}', null, { form: 'sp' });
  }
  still(d, draw);
})();

/* =====================================================================
   FIGURES 8.23 + 8.24 + 8.25: ethene and acetylene with their hybrid
   orbitals, unhybridized p orbitals and π bonds, in three dimensions.
   The twist turns one CH2 group of ethene about the C–C axis; the
   side-by-side overlap of the two p orbitals falls as cos θ. Still:
   the twist is a slider, not a clock.
===================================================================== */
(function () {
  const d = sim('sim-multiple-bonds');
  const { sphere, lobe } = F.mesh;
  const v = F.view3d(d.stage, { spin: 'idle', h: 440, dist: 5.4, tilt: 0.35, pitch: [-Math.PI / 2, Math.PI / 2],
    views: [{ label: 'side', yaw: 0, pitch: 0 }, { label: 'along the axis', yaw: -Math.PI / 2, pitch: 0 }] });
  const g = v.part(0), c2 = F.makeCanvas(d.stage, 150);
  const mol = F.choice(d.controls, { label: '\\text{molecule}', aria: 'the molecule', options: [{ value: 'ethene', label: 'ethene (C₂H₄)' }, { value: 'acetylene', label: 'acetylene (C₂H₂)' }], value: 'ethene',
    onInput: () => tw.show(mol.value === 'ethene') });
  const tw = F.ctl(d.controls, { label: '\\theta', cls: 'angle', aria: 'twist of one CH2 group about the C–C axis', min: 0, max: 90, step: 1, value: 0, unit: '°', dec: 0, specials: [{ at: 90, label: 'perpendicular' }] });
  const ro = F.readout(d);
  const rotX = (p, a) => [p[0], p[1] * Math.cos(a) - p[2] * Math.sin(a), p[1] * Math.sin(a) + p[2] * Math.cos(a)];
  const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]], mul = (a, k) => [a[0] * k, a[1] * k, a[2] * k], neg = (a) => mul(a, -1);
  const PLUS = () => F.cat(0), MINUS = () => F.cat(1), HYB = () => F.cat(2);
  const P_LEN = 1.0, H_LEN = 0.8;
  function atom(p, sym) { v.pickable(sphere(g, p, sym === 'H' ? 0.17 : 0.21, F.el(sym)), sym === 'H' ? 'hydrogen (H)' : 'carbon (C)'); }
  function hybrid(from, dir, name) { v.pickable(lobe(g, from, dir, H_LEN, HYB()), name); }
  function pOrbital(from, dir) {
    v.pickable(lobe(g, from, dir, P_LEN, PLUS()), 'unhybridized 2p orbital, one phase');
    v.pickable(lobe(g, from, neg(dir), P_LEN, MINUS()), 'unhybridized 2p orbital, the other phase');
  }
  /* a π cloud: the side-by-side overlap of two p lobes, as a long ellipsoid over the C–C axis */
  function cloud(dir, color, a, name) {
    const m = sphere(g, mul(dir, 0.74), 1, color, { transparent: true, opacity: a, depthWrite: false });
    m.scale.set(1.05, 0.3, 0.3); v.pickable(m, name); return m;
  }
  function ethene(theta) {
    const a = 0.67, L = [-a, 0, 0], R = [a, 0, 0], t = theta * RAD;
    const hl = [[Math.cos(121 * RAD), 0, Math.sin(121 * RAD)], [Math.cos(121 * RAD), 0, -Math.sin(121 * RAD)]];
    const hr = hl.map((u) => rotX([-u[0], u[1], u[2]], t));
    [L, R].forEach((p) => atom(p, 'C'));
    hl.forEach((u) => { atom(add(L, mul(u, 1.09)), 'H'); hybrid(L, u, 'sp² hybrid orbital'); });
    hr.forEach((u) => { atom(add(R, mul(u, 1.09)), 'H'); hybrid(R, u, 'sp² hybrid orbital'); });
    hybrid(L, [1, 0, 0], 'sp² hybrid orbital'); hybrid(R, [-1, 0, 0], 'sp² hybrid orbital');
    const pl = [0, 1, 0], pr = rotX([0, 1, 0], t);
    pOrbital(L, pl); pOrbital(R, pr);
    const s = Math.cos(t);
    if (s > 0.01) {
      const up = add(pl, pr), n = Math.hypot(...up) || 1, u = mul(up, 1 / n);
      cloud(u, PLUS(), 0.42 * s, 'the π bond, above the plane'); cloud(neg(u), MINUS(), 0.42 * s, 'the π bond, below the plane');
      if (s > 0.35) v.label('π bond', mul(u, 1.0), g, 0);
    }
    v.label('C', L, g, 30); v.label('H', add(L, mul(hl[0], 1.4)), g, 0);
    return s;
  }
  function acetylene() {
    const a = 0.6, L = [-a, 0, 0], R = [a, 0, 0];
    [L, R].forEach((p) => atom(p, 'C'));
    atom([-a - 1.06, 0, 0], 'H'); atom([a + 1.06, 0, 0], 'H');
    hybrid(L, [-1, 0, 0], 'sp hybrid orbital'); hybrid(L, [1, 0, 0], 'sp hybrid orbital');
    hybrid(R, [1, 0, 0], 'sp hybrid orbital'); hybrid(R, [-1, 0, 0], 'sp hybrid orbital');
    [[0, 1, 0], [0, 0, 1]].forEach((u) => { pOrbital(L, u); pOrbital(R, u); });
    cloud([0, 1, 0], PLUS(), 0.42, 'one π bond'); cloud([0, -1, 0], MINUS(), 0.42, 'one π bond');
    cloud([0, 0, 1], PLUS(), 0.42, 'the second π bond'); cloud([0, 0, -1], MINUS(), 0.42, 'the second π bond');
    v.label('π bond', [0, 1.0, 0], g, 0); v.label('second π bond', [0.95, 0, 1.3], g, 0);
    v.label('C', L, g, 30); v.label('H', [-a - 1.06, 0, 0], g, 30);
  }
  function legend(ctx, hybName) {
    const items = [[HYB(), `${hybName} hybrid orbital`], [PLUS(), 'p orbital, one phase'], [MINUS(), 'p orbital, the other phase']];
    const w = items.map(([, s]) => F.measure(ctx, s, { size: 18 }) * 1.35 + 60), total = w.reduce((a, b) => a + b, 0);
    let x = 700 - total / 2;
    items.forEach(([c, s], i) => { F.dot(ctx, x + 12, 124, c, true, 10); text(ctx, s, x + 30, 125, PAL.ink, { size: 18, align: 'left' }); x += w[i]; });
  }
  function draw() {
    const { ctx } = begin(c2);
    v.clear();
    if (mol.value === 'ethene') {
      const th = Math.round(tw.v), s = ethene(th);
      topline(ctx, th === 0 ? 'The two p orbitals are parallel and overlap side by side above and below the C–C axis, forming the π bond.'
        : th >= 90 ? 'At 90° the two p orbitals are perpendicular and do not overlap, so the π bond is broken and only the σ bond joins the carbon atoms.'
        : `One CH_{2} group is twisted ${th}° about the C–C axis, and the p orbitals overlap only ${Math.round(s * 100)}% as much as in the planar molecule.`);
      legend(ctx, 'sp²');
      if (th >= 90) ro.set('\\mk{b}{\\text{C–C}} = \\mk{s}{1\\,\\sigma} + \\mk{p}{0\\,\\pi}', null, { form: 'broken' });
      else ro.set(`\\mk{o}{\\text{overlap}} = \\mk{c}{\\cos \\htmlClass{kv-angle}{${th}^\\circ}} = \\mk{v}{${s.toFixed(2)}}`, 'The C=C double bond is one σ bond and one π bond, and the π bond is only as strong as the side-by-side overlap allows.', { form: 'ethene' });
    } else {
      acetylene();
      topline(ctx, 'Each carbon atom keeps two p orbitals at right angles, and the two pairs overlap side by side to form two π bonds around the C–C σ bond.');
      legend(ctx, 'sp');
      ro.set('\\mk{b}{\\text{C}\\equiv\\text{C}} = \\mk{s}{1\\,\\sigma} + \\mk{p}{2\\,\\pi}', null, { form: 'acetylene' });
    }
    v.invalidate();
  }
  still(d, draw);
})();

/* =====================================================================
   FIGURE 8.26: the two resonance forms of benzene, faithful.
===================================================================== */
(function () {
  const H = 380, d = sim('fig-benzene', H);
  const R = 88, RH = 152;
  function ring(ctx, cx, shift) {
    const atoms = [], bonds = [];
    for (let k = 0; k < 6; k++) {
      const a = (90 + 60 * k) * RAD;
      atoms.push({ sym: 'C', x: R * Math.cos(a), y: -R * Math.sin(a) });
    }
    for (let k = 0; k < 6; k++) {
      const a = (90 + 60 * k) * RAD;
      atoms.push({ sym: 'H', x: RH * Math.cos(a), y: -RH * Math.sin(a) });
      bonds.push([k, (k + 1) % 6, (k + shift) % 2 === 0 ? 2 : 1], [k, k + 6, 1]);
    }
    lewis(ctx, cx, H / 2, atoms, bonds);
  }
  function draw() {
    const { ctx } = begin(d.c);
    ring(ctx, 470, 0); ring(ctx, 930, 1);
    resonanceArrow(ctx, 640, 760, H / 2);
    tex(d.readout, '\\text{C}_6\\text{H}_6');
  }
  still(d, draw);
})();

/* =====================================================================
   Example 8.4: the two resonance structures of SO2, faithful.
===================================================================== */
(function () {
  const H = 260, d = sim('fig-lewis-so2', H);
  const left = [
    { sym: 'S', x: 0, y: -40, lp: [90], q: '+' },
    { sym: 'O', x: -115, y: 45, lp: [180, 270] },
    { sym: 'O', x: 115, y: 45, lp: [60, 0, 270], q: '−', qx: 46 },
  ];
  const right = [
    { sym: 'S', x: 0, y: -40, lp: [90], q: '+' },
    { sym: 'O', x: -115, y: 45, lp: [120, 180, 270], q: '−', qx: -46 },
    { sym: 'O', x: 115, y: 45, lp: [0, 270] },
  ];
  function draw() {
    const { ctx } = begin(d.c);
    lewis(ctx, 450, H / 2 + 10, left, [[0, 1, 2], [0, 2, 1]]);
    lewis(ctx, 950, H / 2 + 10, right, [[0, 1, 1], [0, 2, 2]]);
    resonanceArrow(ctx, 640, 760, H / 2 + 10);
    tex(d.readout, '\\text{SO}_2');
  }
  still(d, draw);
})();
};
