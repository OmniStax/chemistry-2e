/* Figures for section 20.3 Aldehydes, Ketones, Carboxylic Acids, and Esters. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['20.3'] = function (root, F) {
const { PAL, alpha, register, begin, line, text, headline } = F;

/* =====================================================================
   FIGURE 20.14: the carbonyl group and the orbitals that make its
   double bond, in three dimensions. Mathematical 3D over a physical
   frame: the plane of the three σ bonds is the xz plane, oxygen along
   −z, R¹ and R² at 120° toward the reader, and the p orbitals stand
   along y. The choice walks the text's sentence: carbon's three sp²
   hybrids and their σ bonds, the two p orbitals side by side, and their
   overlap into the π bond, whose cloud is fatter at oxygen because
   oxygen pulls the shared electrons closer (δ− on O, δ+ on C, as the
   book marks them). Still: a structure has no clock. Free orbit.
   C=O 1.21, C–R 1.5 (Å), angles 120°.
===================================================================== */
(function () {
  const d = F.sim(root, 'sim-carbonyl');
  const T3 = window.THREE;
  const DIST = 12.4, FOV = 16, RAD = Math.PI / 180;
  const v = F.view3d(d.stage, { spin: 'off', h: 560, dist: DIST, tilt: 0.42, pitch: [-1.3, 1.3], onRender: () => place() });
  if (v.camera && 'fov' in v.camera) { v.camera.fov = FOV; v.camera.updateProjectionMatrix(); }   /* a long lens: the near R group is not drawn larger than the far one */
  v.setView(-1.12, 0.42);
  const g = v.part(0); if (g && g.position) g.position.set(0, -0.12, 0.2);
  const key = F.makeCanvas(d.stage, 64);
  const step = F.choice(d.controls, { label: '\\text{the C=O bond}', key: 'bond', aria: 'how far the double bond is built: σ bonds, p orbitals, π bond', value: 'pi',
    options: [{ value: 'sigma', label: 'σ bonds' }, { value: 'p', label: 'two p orbitals' }, { value: 'pi', label: 'π bond' }] });
  const ro = F.readout(d);
  const HEAD = {
    sigma: 'Three sp² hybrid orbitals on carbon point 120° apart in one plane and form its three σ bonds.',
    p: 'Carbon’s unhybridized p orbital and a p orbital on oxygen stand perpendicular to that plane, side by side.',
    pi: 'The two p orbitals overlap above and below the plane: the π bond, its electrons pulled toward oxygen.',
  };
  const READ = {
    sigma: '\\mk{s}{3\\ sp^{2}\\text{ orbitals on C}} \\to \\mk{g}{3\\ \\sigma\\text{ bonds}}',
    p: '\\mk{s}{1\\ p\\text{ orbital on C}} + 1\\ p\\text{ orbital on O} \\to \\mk{q}{1\\ \\pi\\text{ bond}}',
    pi: '\\text{C=O} = \\mk{g}{1\\ \\sigma\\text{ bond}} + \\mk{q}{1\\ \\pi\\text{ bond}}',
  };
  const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]], mul = (a, k) => [a[0] * k, a[1] * k, a[2] * k];
  const S60 = Math.sin(60 * RAD);
  const DIR = { O: [0, 0, -1], L: [-S60, 0, 0.5], R: [S60, 0, 0.5] };
  const AT = { C: [0, 0, 0], O: mul(DIR.O, 1.21), L: mul(DIR.L, 1.5), R: mul(DIR.R, 1.5) };
  const HYB = () => F.cat(2), PLUS = () => F.cat(0), MINUS = () => F.cat(1);
  const palSig = () => [PAL.ink, PAL.panel, PAL.muted, F.el('C'), F.el('O'), F.el('R'), HYB(), PLUS(), MINUS()].join('|');

  /* the shapes, made once: a teardrop lobe pointed at its nucleus, and the π cloud, a rounded bar fatter at its +x end */
  let DROP = null, CLOUD = null;
  if (T3 && v.scene) {
    const prof = [];
    for (let i = 0; i <= 40; i++) { const u = i / 40; prof.push(new T3.Vector2(Math.max(1e-4, 0.5 * Math.pow(u, 0.62) * Math.sqrt(Math.max(0, 1 - u * u))), u)); }
    DROP = new T3.LatheGeometry(prof, 36);
    const sp = (a, e) => Math.sign(a) * Math.pow(Math.abs(a), e), NU = 48, NV = 40, pos = [], idx = [];
    for (let i = 0; i <= NU; i++) {
      const th = -Math.PI / 2 + (Math.PI * i) / NU, x = sp(Math.sin(th), 0.45), c = sp(Math.cos(th), 0.45) * (0.74 + 0.4 * x);
      for (let j = 0; j <= NV; j++) { const ph = -Math.PI + (2 * Math.PI * j) / NV; pos.push(x, c * Math.cos(ph), c * Math.sin(ph)); }
    }
    for (let i = 0; i < NU; i++) for (let j = 0; j < NV; j++) { const a = i * (NV + 1) + j, b = a + NV + 1; idx.push(a, a + 1, b, b, a + 1, b + 1); }
    CLOUD = new T3.BufferGeometry(); CLOUD.setAttribute('position', new T3.Float32BufferAttribute(pos, 3)); CLOUD.setIndex(idx); CLOUD.computeVertexNormals();
  }
  let sig = '', gP = null, gPi = null;
  function lobe(grp, from, dir, len, c, name, wide = 1) {
    const m = new T3.Mesh(DROP, F.mesh.mat(c));
    m.position.set(...add(from, mul(dir, 0.07))); m.quaternion.setFromUnitVectors(new T3.Vector3(0, 1, 0), new T3.Vector3(...dir)); m.scale.set(len * wide, len, len * wide);
    grp.add(m); v.pickable(m, name); return m;
  }
  function build() {
    const s = palSig(); if (s === sig || !T3 || !v.scene || !DROP) return; sig = s;
    g.children.slice().forEach((c) => { g.remove(c); });
    gP = new T3.Group(); gPi = new T3.Group(); g.add(gP, gPi);
    /* the plane of the σ bonds */
    const X = 1.75, Z0 = -1.9, Z1 = 1.15, pts = [[-X, 0, Z0], [X, 0, Z0], [X, 0, Z1], [-X, 0, Z1]];
    const geo = new T3.BufferGeometry(); geo.setAttribute('position', new T3.Float32BufferAttribute(pts.flat(), 3)); geo.setIndex([0, 1, 2, 0, 2, 3]); geo.computeVertexNormals();
    const sheet = new T3.Mesh(geo, new T3.MeshBasicMaterial({ color: new T3.Color(PAL.muted), transparent: true, opacity: 0.16, depthWrite: false, side: T3.DoubleSide }));
    sheet.renderOrder = 1; g.add(sheet); v.pickable(sheet, 'the plane of the three σ bonds');
    F.mesh.polyline(g, pts.concat([pts[0]]), PAL.muted);
    /* atoms and σ bonds */
    v.pickable(F.mesh.sphere(g, AT.C, 0.13, F.el('C')), 'carbonyl carbon atom, sp² hybridized, δ+');
    v.pickable(F.mesh.sphere(g, AT.O, 0.17, F.el('O')), 'carbonyl oxygen atom, δ−');
    ['L', 'R'].forEach((k) => {
      v.pickable(F.mesh.sphere(g, AT[k], 0.27, F.el('R')), 'R group: a carbon chain or a hydrogen atom');
      v.pickable(F.mesh.stick(g, AT.C, AT[k], 0.035, PAL.muted), 'σ bond from carbon to an R group');
      lobe(g, AT.C, DIR[k], 0.95, HYB(), 'sp² hybrid orbital on carbon: a σ bond to an R group', 1.25);
    });
    v.pickable(F.mesh.stick(g, AT.C, AT.O, 0.035, PAL.muted), 'σ bond from carbon to oxygen');
    lobe(g, AT.C, DIR.O, 0.9, HYB(), 'sp² hybrid orbital on carbon: the σ bond to oxygen', 1.25);
    /* the ~120° angle the book marks, between C=O and C–R² */
    const N = 20, RA = 1.02, arc = [];
    for (let i = 0; i <= N; i++) { const a = (-90 + (120 * i) / N) * RAD; arc.push([RA * Math.cos(a), 0.012, RA * Math.sin(a)]); }
    for (let i = 0; i < N; i++) F.mesh.stick(g, arc[i], arc[i + 1], 0.014, PAL.ink);
    /* the two p orbitals */
    [[AT.C, 'unhybridized p orbital on carbon'], [AT.O, 'p orbital on oxygen']].forEach(([p, name]) => {
      lobe(gP, p, [0, 1, 0], 1.05, PLUS(), `${name}, + phase`);
      lobe(gP, p, [0, -1, 0], 1.05, MINUS(), `${name}, − phase`);
    });
    /* the π bond: one cloud above the plane and one below, fatter over oxygen */
    [[1, PLUS(), '+'], [-1, MINUS(), '−']].forEach(([y, c, ph]) => {
      const m = new T3.Mesh(CLOUD, F.mesh.mat(c, { transparent: true, opacity: 0.6, depthWrite: false }));
      m.position.set(0, 0.64 * y, -0.605); m.rotation.y = Math.PI / 2; m.scale.set(1.2, 0.58, 0.42); m.renderOrder = 2;
      gPi.add(m); v.pickable(m, `the π bond, ${ph} phase: denser at oxygen`);
    });
  }
  /* labels, each pushed on the screen away from the group's centre until it clears its thing */
  const outs = [
    { el: v.label('R¹', [0, 0, 0], g, 0, 'bare'), p: AT.L, r: 0.3 },
    { el: v.label('R²', [0, 0, 0], g, 0, 'bare'), p: AT.R, r: 0.3 },
    { el: v.label('δ−', [0, 0, 0], g, 0, 'bare'), p: add(AT.O, [0.2, 0, -0.15]), r: 0.34 },
    { el: v.label('δ+', [0, 0, 0], g, 0, 'bare'), p: [-0.12, 0, 0.6], r: 0.04 },
    { el: v.label('~120°', [0, 0, 0], g, 0, 'bare'), p: [1.2 * Math.cos(-30 * RAD), 0, 1.2 * Math.sin(-30 * RAD)], r: 0.04 },
  ];
  function place() {
    if (!v.wrap || !v.wrap.clientHeight) return;
    const w = v.wrap.clientWidth, h = v.wrap.clientHeight, u = h / (2 * Math.tan((FOV / 2) * RAD) * DIST / (v.at.zoom || 1));
    const c = v.project([0, 0, -0.2], g);
    outs.forEach((l) => {
      const q = v.project(l.p, g);
      let dx = q[0] - c[0], dy = q[1] - c[1]; const n = Math.hypot(dx, dy);
      if (n < 6) { dx = 0; dy = -1; } else { dx /= n; dy /= n; }
      const bw = l.el.offsetWidth / 2, bh = l.el.offsetHeight / 2, push = l.r * u + 5 + Math.abs(dx) * bw + Math.abs(dy) * bh;
      l.el.style.left = Math.min(Math.max(q[0] + dx * push, bw + 2), w - bw - 2) + 'px';
      l.el.style.top = Math.min(Math.max(q[1] + dy * push, bh + 2), h - bh - 2) + 'px';
    });
  }
  function draw() {
    build();
    v.headline(HEAD[step.value]);
    ro.set(READ[step.value], undefined, { form: step.value });
    const { ctx } = begin(key);
    const ball = (sym, r, s) => ({ s, draw: (c, x, y) => { c.save(); c.beginPath(); c.arc(x, y, r, 0, 2 * Math.PI); c.fillStyle = F.el(sym); c.fill(); c.lineWidth = 1.5; c.strokeStyle = alpha(PAL.ink, 0.5); c.stroke(); c.restore(); } });
    const drop = (col, s) => ({ s, draw: (c, x, y) => { c.save(); c.fillStyle = col; c.beginPath(); c.moveTo(x - 16, y); c.bezierCurveTo(x - 4, y - 12, x + 16, y - 12, x + 16, y); c.bezierCurveTo(x + 16, y + 12, x - 4, y + 12, x - 16, y); c.fill(); c.restore(); } });
    F.legend(ctx, { l: 40, r: 1360, t: 0, b: 64 }, [ball('C', 7, 'carbon'), ball('O', 8, 'oxygen'), ball('R', 10, 'R group'), drop(HYB(), 'sp² hybrid orbital'), drop(PLUS(), 'p orbital, + phase'), drop(MINUS(), 'p orbital, − phase')], { corner: 'top', row: true, panel: false, size: 20 });
    if (!gP) return;
    F.fade3(gP, step.mix((x) => (x === 'sigma' ? 0 : 1)));
    F.fade3(gPi, step.mix((x) => (x === 'pi' ? 1 : 0)));
    v.invalidate();
  }
  register(d.fig, { update: () => {}, draw });
})();

const lerp = (a, b, k) => a + (b - a) * k;
/* =====================================================================
   SIM (Example 20.10): CH4 -> CH3OH -> CH2O -> HCO2H -> CO2, each step
   one C-H bond traded for a C-O bond. The molecule is drawn flat with
   its atoms in their element colours; beneath it, carbon's oxidation
   number on a fixed scale from -4 to +4. Still: a series of states;
   the choice morphs, atoms that stay gliding to their new places, a
   leaving hydrogen fading where the oxygen arrives.
===================================================================== */
(function () {
  const d = F.sim(root, 'sim-carbon-oxidation', 480);
  const ORDER = ['CH4', 'CH3OH', 'CH2O', 'HCO2H', 'CO2'];
  const c30 = Math.cos(Math.PI / 6), s30 = 0.5;
  /* atoms by key in bond lengths about carbon, y down; bonds by key pair and order */
  const MOL = {
    CH4: { label: 'CH₄', tex: '\\text{CH}_{4}', name: 'methane', ox: -4, nH: 4, nO: 0,
      atoms: { C: [0, 0], Ha: [0, -1], Hb: [-1, 0], Hc: [0, 1], Hd: [1, 0] },
      bonds: [['C', 'Ha', 1], ['C', 'Hb', 1], ['C', 'Hc', 1], ['C', 'Hd', 1]] },
    CH3OH: { label: 'CH₃OH', tex: '\\text{CH}_{3}\\text{OH}', name: 'methanol', ox: -2, nH: 4, nO: 1,
      atoms: { C: [0, 0], Ha: [0, -1], Hb: [-1, 0], Hc: [0, 1], O1: [1, 0], Ho1: [1.8, 0] },
      bonds: [['C', 'Ha', 1], ['C', 'Hb', 1], ['C', 'Hc', 1], ['C', 'O1', 1], ['O1', 'Ho1', 1]] },
    CH2O: { label: 'CH₂O', tex: '\\text{CH}_{2}\\text{O}', name: 'formaldehyde', ox: 0, nH: 2, nO: 1,
      atoms: { C: [0, 0], O1: [0, -1.05], Hb: [-c30, s30], Hc: [c30, s30] },
      bonds: [['C', 'O1', 2], ['C', 'Hb', 1], ['C', 'Hc', 1]] },
    HCO2H: { label: 'HCO₂H', tex: '\\text{HCO}_{2}\\text{H}', name: 'formic acid', ox: 2, nH: 2, nO: 2,
      atoms: { C: [0, 0], O1: [0, -1.05], Hb: [-c30, s30], O2: [c30, s30], Ho2: [c30 + 0.8, s30] },
      bonds: [['C', 'O1', 2], ['C', 'Hb', 1], ['C', 'O2', 1], ['O2', 'Ho2', 1]] },
    CO2: { label: 'CO₂', tex: '\\text{CO}_{2}', name: 'carbon dioxide', ox: 4, nH: 0, nO: 2,
      atoms: { C: [0, 0], O1: [-1.1, 0], O2: [1.1, 0] },
      bonds: [['C', 'O1', 2], ['C', 'O2', 2]] },
  };
  const COUNT = ['no', 'one', 'two', 'three', 'four'];
  const tally = (m) => {
    const ch = MOL[m].bonds.filter(([a, b]) => a === 'C' && b[0] === 'H').length;
    const co = MOL[m].bonds.filter(([a, b]) => a === 'C' && b[0] === 'O').reduce((s, b) => s + b[2], 0);
    return [ch, co];
  };
  const HEAD = Object.fromEntries(ORDER.map((m) => {
    const [ch, co] = tally(m), t = MOL[m];
    const bonds = (n, w) => `${COUNT[n]} ${w}${n === 1 ? '' : 's'}`;
    return [m, `In ${t.name}, $${t.tex}$, carbon has ${bonds(ch, 'C–H bond')} and ${bonds(co, 'bond')} to oxygen.`];
  }));
  const mol = F.choice(d.controls, { label: '\\text{molecule}', key: 'molecule', aria: 'the molecule on the oxidation ladder',
    options: ORDER.map((v) => ({ value: v, label: MOL[v].label })), value: 'CH4', onInput: () => draw() });
  const ro = F.readout(d);
  let hits = []; F.hover(d.stage, () => hits);

  const MX = 640, MY = 200, BL = 112, RAD = { C: 22, O: 21, H: 14 };
  const NAME = { C: 'carbon atom', O: 'oxygen atom', H: 'hydrogen atom' };
  const P = (p) => [MX + p[0] * BL, MY + p[1] * BL];
  function disc(ctx, x, y, s, a) {
    if (a <= 0.01) return;
    ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.arc(x, y, RAD[s], 0, 2 * Math.PI); ctx.fillStyle = F.el(s); ctx.fill();
    ctx.lineWidth = s === 'H' ? 2 : 1.2; ctx.strokeStyle = s === 'H' ? PAL.ink : alpha(PAL.ink, 0.4); ctx.stroke(); ctx.restore();
  }
  function stick(ctx, p, q, sa, sb, order2, a) {
    if (a <= 0.01) return;
    const dx = q[0] - p[0], dy = q[1] - p[1], L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L;
    const x1 = p[0] + ux * (RAD[sa] - 4), y1 = p[1] + uy * (RAD[sa] - 4), x2 = q[0] - ux * (RAD[sb] - 4), y2 = q[1] - uy * (RAD[sb] - 4);
    const o = 5 * order2;
    ctx.save(); ctx.globalAlpha *= a;
    line(ctx, x1 + uy * o, y1 - ux * o, x2 + uy * o, y2 - ux * o, PAL.ink, 3.5);
    if (order2 > 0.01) { ctx.save(); ctx.globalAlpha *= order2; line(ctx, x1 - uy * o, y1 + ux * o, x2 - uy * o, y2 + ux * o, PAL.ink, 3.5); ctx.restore(); }
    ctx.restore();
  }

  /* the oxidation-number scale, fixed from -4 to +4 */
  const SY = 400, XA = 300, XB = 1100, X = (n) => XA + ((n + 4) / 8) * (XB - XA);
  function drawScale(ctx) {
    line(ctx, XA, SY, XB, SY, PAL.muted, 3);
    for (let n = -4; n <= 4; n++) {
      line(ctx, X(n), SY, X(n), SY + 9, PAL.muted, 2);
      text(ctx, n > 0 ? `+${n}` : n < 0 ? `−${-n}` : '0', X(n), SY + 30, PAL.muted, { size: 17, align: 'center' });
    }
    text(ctx, 'oxidation number of carbon', (XA + XB) / 2, SY + 60, PAL.ink, { size: 20, align: 'center' });
    text(ctx, 'more reduced', XA - 20, SY + 2, PAL.muted, { size: 17, align: 'right' });
    text(ctx, 'more oxidized', XB + 20, SY + 2, PAL.muted, { size: 17, align: 'left' });
    ORDER.forEach((m) => {
      const on = mol.a(m) > 0.5 && m === mol.value;
      F.dot(ctx, X(MOL[m].ox), SY, PAL.ink, false, 9);
      text(ctx, MOL[m].label, X(MOL[m].ox), SY - 34, PAL.ink, { size: 22, align: 'center', weight: on ? 600 : 400 });
    });
    F.dot(ctx, X(mol.mix((m) => MOL[m].ox)), SY, PAL.ink, true, 11);
  }
  function legend(ctx) {
    [['C', 'carbon'], ['H', 'hydrogen'], ['O', 'oxygen']].forEach(([s, n], i) => {
      const y = 130 + i * 44; disc(ctx, 1120, y, s, 1); text(ctx, n, 1150, y + 1, PAL.ink, { size: 20, align: 'left' });
    });
  }

  function draw() {
    const { ctx } = begin(d.c); hits = [];
    const A = MOL[mol.from] ?? MOL[mol.value], Z = MOL[mol.value], k = mol.from === mol.value ? 1 : mol.k;
    headline(ctx, HEAD[mol.value]);
    const keys = [...new Set([...Object.keys(A.atoms), ...Object.keys(Z.atoms)])];
    const pos = {}, op = {};
    keys.forEach((key) => {
      const a = A.atoms[key], z = Z.atoms[key];
      pos[key] = P(a && z ? [lerp(a[0], z[0], k), lerp(a[1], z[1], k)] : (a ?? z));
      op[key] = a && z ? 1 : a ? mol.a(mol.from) : mol.a(mol.value);
    });
    const bkey = ([a, b]) => `${a}-${b}`;
    const BA = Object.fromEntries(A.bonds.map((b) => [bkey(b), b[2]])), BZ = Object.fromEntries(Z.bonds.map((b) => [bkey(b), b[2]]));
    [...new Set([...Object.keys(BA), ...Object.keys(BZ)])].forEach((bk) => {
      const [a, b] = bk.split('-'), oa = BA[bk], oz = BZ[bk];
      const al = oa && oz ? 1 : oa ? mol.a(mol.from) : mol.a(mol.value);
      const second = oa && oz ? lerp(oa === 2 ? 1 : 0, oz === 2 ? 1 : 0, k) : (oa ?? oz) === 2 ? 1 : 0;
      stick(ctx, pos[a], pos[b], a[0], b[0], second, Math.min(al, op[a], op[b]));
    });
    keys.forEach((key) => {
      const s = key[0]; disc(ctx, ...pos[key], s, op[key]);
      if (op[key] > 0.5) hits.push({ x: pos[key][0], y: pos[key][1], r: RAD[s] + 4, name: NAME[s] });
    });
    legend(ctx);
    drawScale(ctx);
    const t = Z, ox = t.ox, sgn = (n) => (n > 0 ? `+${n}` : n < 0 ? `-${-n}` : '0');
    const terms = [t.nH ? `\\mk{h}{${t.nH}(+1)}` : '', t.nO ? `\\mk{o}{${t.nO}(-2)}` : ''].filter(Boolean).join(' + ');
    ro.set(`\\mk{x}{x_{\\text{C}}} = 0 - (${terms}) = \\mk{r}{${sgn(ox)}}`, undefined, { form: `${!!t.nH}${!!t.nO}` });
  }
  register(d.fig, { update: () => {}, draw });
})();
};
