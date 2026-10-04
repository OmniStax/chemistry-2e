/* Figures for section 8.4 Molecular Orbital Theory. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['8.4'] = function (root, F) {
const { el, fmt, tex, C, PAL, alpha, ctl, register, begin, line, dot, text, headline, arrow } = F;
const sim = (id, H) => F.sim(root, id, H);
const still = (d, draw) => register(d.fig, { update: () => {}, draw });
function readout(host, main, small) { tex(host, main); if (small) host.appendChild(el('small', null, small)); }
const TAU = 2 * Math.PI, RAD = Math.PI / 180;
const clamp = (x, a, b) => Math.min(b, Math.max(a, x));

/* the energy axis of a diagram: an upward arrow and its E, in the energy hue */
function eAxis(ctx, x, y0, y1) {
  const c = C('energy');
  arrow(ctx, x, y0, x, y1, c, 4);
  text(ctx, 'E', x - 22, (y0 + y1) / 2, c, { size: 26, weight: 600, align: 'right' });
}
/* one electron as a half-arrow, up or down, centred on (x, y) */
function electron(ctx, x, y, up, a = 1) {
  ctx.save(); ctx.globalAlpha *= a;
  const s = up ? -1 : 1, t = y + s * 17, b = y - s * 17;
  line(ctx, x, b, x, t, PAL.ink, 3);
  line(ctx, x, t, x + (up ? -9 : 9), t - s * 11, PAL.ink, 3);
  ctx.restore();
}
/* electrons in a set of deg degenerate orbitals, filled singly before pairing */
function spread(k, deg) { const o = Array(deg).fill(0); for (let i = 0; i < k; i++) o[i % deg]++; return o; }
/* one level of deg orbitals centred on x: short lines side by side, with their electrons */
function level(ctx, x, y, deg, k, w, a = 1) {
  const gap = 14, tot = deg * w + (deg - 1) * gap, x0 = x - tot / 2, occ = spread(k, deg);
  const ends = [];
  for (let i = 0; i < deg; i++) {
    const xa = x0 + i * (w + gap);
    ctx.save(); ctx.globalAlpha *= a; line(ctx, xa, y, xa + w, y, PAL.ink, 5); ctx.restore();
    const cx = xa + w / 2;
    if (occ[i] >= 1) electron(ctx, occ[i] === 2 ? cx - 10 : cx, y, true, a);
    if (occ[i] === 2) electron(ctx, cx + 10, y, false, a);
    ends.push([xa, xa + w]);
  }
  return { l: x0, r: x0 + tot };
}
/* ---------- Lewis structures, in ink ---------- */
function lewis(ctx, cx, cy, atoms, order) {
  const [a, b] = atoms, x1 = cx + a.x + 22, x2 = cx + b.x - 22;
  [-1, 1].slice(0, order).forEach((o) => line(ctx, x1, cy + o * 7, x2, cy + o * 7, PAL.ink, 3.5));
  atoms.forEach((t) => {
    const x = cx + t.x;
    text(ctx, t.sym, x, cy + 1, PAL.ink, { size: 30, weight: 600, align: 'center' });
    t.lp.forEach((ang) => {
      const c = Math.cos(ang * RAD), s = -Math.sin(ang * RAD), px = -s, py = c;
      dot(ctx, x + c * 28 + px * 7, cy + s * 28 + py * 7, PAL.ink, true, 4);
      dot(ctx, x + c * 28 - px * 7, cy + s * 28 - py * 7, PAL.ink, true, 4);
    });
  });
}

/* =====================================================================
   The Lewis structure of O2, a faithful still copy.
===================================================================== */
(function () {
  const d = sim('fig-o2-lewis', 180);
  function draw() {
    const { ctx } = begin(d.c);
    lewis(ctx, 700, 90, [{ sym: 'O', x: -60, lp: [90, 270] }, { sym: 'O', x: 60, lp: [90, 270] }], 2);
    tex(d.readout, '\\text{O}_2');
  }
  still(d, draw);
})();

/* =====================================================================
   FIGURE 8.27: a Gouy balance. The beam tips toward the sample tube when
   a paramagnetic sample is pulled into the field and away, slightly, when
   a diamagnetic one is pushed out. Still: the tip answers the choices.
===================================================================== */
(function () {
  const d = sim('sim-gouy', 560);
  const sample = F.choice(d.controls, { label: '\\text{sample}', options: [{ value: 'o2', label: 'O₂ (paramagnetic)' }, { value: 'n2', label: 'N₂ (diamagnetic)' }], value: 'o2', aria: 'sample', onInput: () => go() });
  const field = F.choice(d.controls, { label: '\\text{electromagnets}', options: [{ value: 'off', label: 'off' }, { value: 'on', label: 'on' }], value: 'off', aria: 'electromagnets', onInput: () => go() });
  const target = () => (field.value === 'off' ? 0 : sample.value === 'o2' ? 7 : -1.5);
  const tilt = F.tween(d, 0);
  function go() { tilt.to(target(), 900); draw(); }
  let hits = []; F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c);
    const th = tilt.v * RAD, px = 700, py = 150, L = 330;
    const cBal = F.ref('balance'), cSam = F.ref('sample'), cMag = F.ref('electromagnets'), cW = F.ref('weights');
    const lx = px - L * Math.cos(th), ly = py + L * Math.sin(th), rx = px + L * Math.cos(th), ry = py - L * Math.sin(th);
    /* the stand */
    line(ctx, px, py, px, 520, cBal, 6); line(ctx, px - 120, 520, px + 120, 520, cBal, 6);
    line(ctx, lx, ly, rx, ry, cBal, 6); dot(ctx, px, py, cBal, true, 10);
    /* the electromagnets, one either side of the tube */
    const on = field.value === 'on';
    [[lx - 150, 'N'], [lx + 60, 'S']].forEach(([x, p]) => {
      ctx.save(); ctx.fillStyle = alpha(cMag, on ? 0.35 : 0.15); ctx.fillRect(x, 330, 90, 150); ctx.restore();
      ctx.save(); ctx.strokeStyle = cMag; ctx.lineWidth = 2; ctx.strokeRect(x, 330, 90, 150); ctx.restore();
      text(ctx, p, x + 45, 405, PAL.ink, { size: 26, weight: 600, align: 'center' });
    });
    if (on) for (let i = 0; i < 4; i++) line(ctx, lx - 58, 350 + i * 36, lx + 58, 350 + i * 36, alpha(PAL.ink, 0.4), 2, [6, 8]);
    text(ctx, 'electromagnets', lx - 105, 510, cMag, { size: 20, align: 'center' });
    /* the sample tube hanging from the left end */
    const ty = ly + 150;
    line(ctx, lx, ly, lx, ty, cBal, 2);
    ctx.save(); ctx.strokeStyle = cSam; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(lx - 16, ty); ctx.lineTo(lx - 16, ty + 160); ctx.arc(lx, ty + 160, 16, Math.PI, 0, true); ctx.lineTo(lx + 16, ty); ctx.stroke(); ctx.restore();
    ctx.save(); ctx.fillStyle = alpha(F.el(sample.value === 'o2' ? 'O' : 'N'), 0.8); ctx.fillRect(lx - 13, ty + 90, 26, 70); ctx.beginPath(); ctx.arc(lx, ty + 160, 13, 0, Math.PI); ctx.fill(); ctx.restore();
    F.label(ctx, 'sample tube', lx, ty + 20, { side: 'right', color: cSam });
    /* the dish and its weights on the right */
    const dy = ry + 200;
    line(ctx, rx, ry, rx - 70, dy, cW, 2); line(ctx, rx, ry, rx + 70, dy, cW, 2);
    line(ctx, rx - 90, dy, rx + 90, dy, cW, 5);
    ctx.save(); ctx.fillStyle = cW; ctx.fillRect(rx - 50, dy - 40, 40, 40); ctx.fillRect(rx + 5, dy - 28, 30, 28); ctx.restore();
    text(ctx, 'weights', rx + 110, dy - 10, cW, { size: 20 });
    hits = [{ x: lx, y: ty + 110, r: 40, name: sample.value === 'o2' ? 'liquid oxygen, O₂' : 'liquid nitrogen, N₂' }];
    const t = target(), name = sample.value === 'o2' ? 'O₂' : 'N₂';
    headline(ctx, !on ? 'With the electromagnets off, the sample and the weights balance.'
      : t > 0 ? 'The field pulls the paramagnetic ' + name + ' into it, so the sample appears heavier.'
      : 'The field weakly pushes the diamagnetic ' + name + ' out, so the sample appears slightly lighter.');
    readout(d.readout, sample.value === 'o2' ? '\\text{O}_2:\\ 2\\ \\text{unpaired electrons} \\Rightarrow \\text{paramagnetic}' : '\\text{N}_2:\\ 0\\ \\text{unpaired electrons} \\Rightarrow \\text{diamagnetic}',
      on ? 'Only in an applied magnetic field does the sample show attraction or repulsion.' : 'Switch the electromagnets on to compare the weights.');
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 8.28: two waves added point by point. The phase difference walks
   from the book's panel (a) to its panel (b). Still.
===================================================================== */
(function () {
  const d = sim('sim-waves', 620);
  const P = ctl(d.controls, { label: '\\text{phase difference}', cls: 'angle', min: 0, max: 180, step: 1, value: 0, unit: '°', dec: 0, aria: 'phase difference in degrees',
    specials: [{ at: 0, label: 'in phase' }, { at: 180, label: 'out of phase' }] });
  const X0 = 260, X1 = 1300, A = 55, K = 2 * TAU / (X1 - X0);
  function wave(ctx, y, amp, ph, w, col) {
    ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = w; ctx.beginPath();
    for (let x = X0; x <= X1; x += 4) { const v = y - amp * Math.sin(K * (x - X0) + ph); x === X0 ? ctx.moveTo(x, v) : ctx.lineTo(x, v); }
    ctx.stroke(); ctx.restore();
    line(ctx, X0, y, X1, y, alpha(PAL.ink, 0.3), 2, [10, 10]);
  }
  function draw() {
    const { ctx } = begin(d.c);
    const ph = P.v * RAD, amp = 2 * Math.cos(ph / 2);
    const cA = F.ref('wave-a'), cB = F.ref('wave-b'), cS = F.ref('wave-sum');
    wave(ctx, 150, A, 0, 3, cA); wave(ctx, 300, A, ph, 3, cB);
    ctx.save(); ctx.strokeStyle = cS; ctx.lineWidth = 5; ctx.beginPath();
    for (let x = X0; x <= X1; x += 4) { const v = 490 - A * (Math.sin(K * (x - X0)) + Math.sin(K * (x - X0) + ph)); x === X0 ? ctx.moveTo(x, v) : ctx.lineTo(x, v); }
    ctx.stroke(); ctx.restore();
    line(ctx, X0, 490, X1, 490, alpha(PAL.ink, 0.3), 2, [10, 10]);
    text(ctx, 'ψ_{A}', 200, 150, cA, { size: 26, align: 'right' });
    text(ctx, '+  ψ_{B}', 200, 300, cB, { size: 26, align: 'right' });
    text(ctx, '=  ψ_{A} + ψ_{B}', 225, 490, cS, { size: 26, align: 'right' });
    const a = fmt(Math.abs(amp), 2);
    headline(ctx, P.v === 0 ? 'In phase, peaks line up with peaks: constructive interference doubles the amplitude.'
      : P.v === 180 ? 'Out of phase, peaks line up with troughs: destructive interference leaves no wave.'
      : 'At a phase difference of ' + P.v + '°, the sum has ' + a + ' times the amplitude of either wave.');
    readout(d.readout, `\\text{amplitude of the sum} = 2\\cos\\left(\\frac{\\htmlClass{kv-angle}{${P.v}^\\circ}}{2}\\right) = ${a}`, 'The amplitude of the sum is given in units of the amplitude of either wave.');
  }
  still(d, draw);
})();

/* =====================================================================
   FIGURE 8.29 + 8.30 + 8.31: molecular orbitals in three dimensions, the
   two phases of the wave function as the chapter's two categorical colours,
   nodes as faint ink planes. A change crossfades the old orbital into the
   new. Still (idle spin).
===================================================================== */
(function () {
  const d = sim('sim-mo-shapes');
  const { sphere, lobe, polyline, box } = F.mesh;
  const v = F.view3d(d.stage, { spin: 'idle', h: 420, dist: 7.2, tilt: 0.25, pitch: [-1.2, 1.2],
    views: [{ label: 'side on', yaw: 0, pitch: 0 }, { label: 'along the axis', yaw: Math.PI / 2, pitch: 0 }] });
  const g = v.part(0);
  const pair = F.choice(d.controls, { label: '\\text{orbitals}', options: [{ value: 's', label: 'two s' }, { value: 'pe', label: 'two p end to end' }, { value: 'ps', label: 'two p side by side' }], value: 's', aria: 'which atomic orbitals combine', onInput: () => draw() });
  const comb = F.choice(d.controls, { label: '\\text{combination}', options: [{ value: 'in', label: 'in phase (add)' }, { value: 'out', label: 'out of phase (subtract)' }], value: 'in', aria: 'in phase or out of phase', onInput: () => draw() });
  const N = 0.7;
  const INFO = {
    'sin': { name: 'σ_s', tex: '\\sigma_s', head: 'In phase, two s orbitals give the bonding σs orbital, its density concentrated between the nuclei.', nodes: 'no node between the nuclei' },
    'sout': { name: 'σ*_s', tex: '\\sigma_s^{*}', head: 'Out of phase, two s orbitals give the antibonding σ*s orbital, with a node between the nuclei.', nodes: 'one node between the nuclei' },
    'pein': { name: 'σ_p', tex: '\\sigma_p', head: 'In phase, two p orbitals end to end give the bonding σp orbital, its density along the internuclear axis.', nodes: 'no node between the nuclei' },
    'peout': { name: 'σ*_p', tex: '\\sigma_p^{*}', head: 'Out of phase, two p orbitals end to end give the antibonding σ*p orbital, with a node between the nuclei.', nodes: 'one node between the nuclei' },
    'psin': { name: 'π_p', tex: '\\pi_p', head: 'In phase, two p orbitals side by side give the bonding πp orbital, above and below a node that contains the internuclear axis.', nodes: 'one node containing the internuclear axis' },
    'psout': { name: 'π*_p', tex: '\\pi_p^{*}', head: 'Out of phase, two p orbitals side by side give the antibonding π*p orbital, with two nodes.', nodes: 'two nodes, one containing the axis and one between the nuclei' },
  };
  function fade(m, a) { m.material.transparent = true; m.material.opacity *= a; m.material.depthWrite = a > 0.9 && m.material.opacity > 0.6; m.visible = a > 0.01; return m; }
  function blob(p, r, c, a, name) { const m = sphere(g, p, 1, c, { transparent: true, opacity: 0.55 }); m.scale.set(r[0], r[1], r[2]); v.pickable(fade(m, a), name); }
  function lb(from, dir, len, c, a, name) { v.pickable(fade(lobe(g, from, dir, len, c), a), name); }
  function plane(axis, a) {
    const w = 1.6, h = 1.4;
    const size = axis === 'x' ? [0.004, 2 * h, 2 * h] : [2 * w + 0.8, 0.004, 2 * h];
    box(g, [0, 0, 0], size, PAL.ink, { transparent: true, opacity: 0.12 * a, depthWrite: false });
    const r = axis === 'x' ? [[0, -h, -h], [0, h, -h], [0, h, h], [0, -h, h], [0, -h, -h]] : [[-w - 0.4, 0, -h], [w + 0.4, 0, -h], [w + 0.4, 0, h], [-w - 0.4, 0, h], [-w - 0.4, 0, -h]];
    if (a > 0.5) polyline(g, r, alpha(PAL.ink, 0.6));
  }
  function build(key, a) {
    if (a <= 0.01) return;
    const c0 = F.cat(0), c1 = F.cat(1), I = INFO[key], nm = 'the ' + I.name.replace('_', '') + ' molecular orbital';
    if (key === 'sin') blob([0, 0, 0], [1.45, 0.85, 0.85], c0, a, nm);
    if (key === 'sout') { blob([-1.0, 0, 0], [0.75, 0.75, 0.75], c0, a, nm + ', one phase'); blob([1.0, 0, 0], [0.75, 0.75, 0.75], c1, a, nm + ', the other phase'); plane('x', a); }
    if (key === 'pein') { blob([0, 0, 0], [1.05, 0.6, 0.6], c0, a, nm + ', its central lobe'); lb([-N, 0, 0], [-1, 0, 0], 0.7, c1, a, nm + ', an outer lobe'); lb([N, 0, 0], [1, 0, 0], 0.7, c1, a, nm + ', an outer lobe'); }
    if (key === 'peout') { lb([-N, 0, 0], [-1, 0, 0], 1.5, c0, a, nm + ', one phase'); lb([N, 0, 0], [1, 0, 0], 1.5, c1, a, nm + ', the other phase'); lb([-N, 0, 0], [1, 0, 0], 0.5, c1, a, nm + ', a small inner lobe'); lb([N, 0, 0], [-1, 0, 0], 0.5, c0, a, nm + ', a small inner lobe'); plane('x', a); }
    if (key === 'psin') { blob([0, 0.72, 0], [1.4, 0.55, 0.5], c0, a, nm + ', above the axis'); blob([0, -0.72, 0], [1.4, 0.55, 0.5], c1, a, nm + ', below the axis'); plane('y', a); }
    if (key === 'psout') {
      const t = 0.35;
      lb([-N, 0, 0], [-t, 1, 0], 1.2, c0, a, nm + ', one phase'); lb([-N, 0, 0], [-t, -1, 0], 1.2, c1, a, nm + ', the other phase');
      lb([N, 0, 0], [t, 1, 0], 1.2, c1, a, nm + ', the other phase'); lb([N, 0, 0], [t, -1, 0], 1.2, c0, a, nm + ', one phase');
      plane('x', a); plane('y', a);
    }
  }
  function draw() {
    v.clear();
    const now = pair.value + comb.value;
    const moving = pair.k < 1 ? pair : comb.k < 1 ? comb : null;
    const q = moving ? F.ease.smooth(clamp(moving.k, 0, 1)) : 1;
    const was = moving === pair ? (pair.from ?? pair.value) + comb.value : moving === comb ? pair.value + (comb.from ?? comb.value) : now;
    if (was !== now) build(was, 1 - q);
    build(now, was !== now ? q : 1);
    [-N, N].forEach((x) => F.mesh.sphere(g, [x, 0, 0], 0.07, PAL.ink));
    polyline(g, [[-2.4, 0, 0], [2.4, 0, 0]], alpha(PAL.ink, 0.5));
    v.label('internuclear axis', [2.4, 0, 0], g, -18);
    const I = INFO[now];
    v.headline(I.head);
    readout(d.readout, `\\text{${comb.value === 'in' ? 'in phase' : 'out of phase'}} \\Rightarrow ${I.tex}\\ \\text{(${comb.value === 'in' ? 'bonding' : 'antibonding'})}`, 'The orbital has ' + I.nodes + '.');
  }
  still(d, draw);
})();

/* =====================================================================
   EXAMPLE 8.5: the three pairs of 3p orbitals, a faithful still copy.
===================================================================== */
(function () {
  const d = sim('fig-ao-types', 320);
  function lobe2(ctx, x, y, ux, uy, c) {
    ctx.save(); ctx.translate(x + ux * 48, y + uy * 48); ctx.rotate(Math.atan2(uy, ux));
    ctx.beginPath(); ctx.ellipse(0, 0, 46, 27, 0, 0, TAU); ctx.fillStyle = alpha(c, 0.75); ctx.fill(); ctx.restore();
  }
  function p(ctx, x, y, horiz, first) {
    const [a, b] = first; const c = [F.cat(a), F.cat(b)];
    if (horiz) { lobe2(ctx, x, y, -1, 0, c[0]); lobe2(ctx, x, y, 1, 0, c[1]); } else { lobe2(ctx, x, y, 0, -1, c[0]); lobe2(ctx, x, y, 0, 1, c[1]); }
    dot(ctx, x, y, PAL.ink, true, 4);
  }
  function draw() {
    const { ctx } = begin(d.c);
    p(ctx, 130, 130, true, [1, 0]); p(ctx, 330, 130, true, [0, 1]);
    p(ctx, 620, 130, true, [1, 0]); p(ctx, 800, 130, false, [1, 0]);
    p(ctx, 1080, 130, false, [0, 1]); p(ctx, 1230, 130, false, [1, 0]);
    [[230, '3p_{x} and 3p_{x}', '(a)'], [710, '3p_{x} and 3p_{y}', '(b)'], [1155, '3p_{y} and 3p_{y}', '(c)']].forEach(([x, s, t]) => {
      text(ctx, s, x, 255, PAL.ink, { size: 22, align: 'center' }); text(ctx, t, x, 292, PAL.ink, { size: 22, align: 'center' });
    });
    readout(d.readout, '\\text{(a)}\\ 3p_x + 3p_x \\qquad \\text{(b)}\\ 3p_x + 3p_y \\qquad \\text{(c)}\\ 3p_y + 3p_y');
  }
  still(d, draw);
})();

/* ---------- the schematic valence energies of Figure 8.37, Li to Ne (larger is higher) ---------- */
const P2 = ['Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne'];
const E37 = {
  s2p_: [425, 415, 405, 397, 389, 380, 370, 358],
  pi_: [383, 378, 370, 359, 347, 336, 312, 284],
  s2p: [342, 329, 315, 293, 267, 203, 183, 157],
  pi: [229, 229, 223, 218, 214, 213, 212, 210],
  s2s_: [165, 165, 156, 151, 137, 124, 113, 100],
  s2s: [115, 100, 93, 88, 79, 64, 46, 28],
};
const VAL = { H: 1, He: 2, Li: 1, Be: 2, B: 3, C: 4, N: 5, O: 6, F: 7, Ne: 8 };
/* the valence molecular orbitals of X2 in order of energy, and its atomic levels */
function diagram(X, withP) {
  if (X === 'H' || X === 'He') return { atom: [{ id: '1s', E: 200, deg: 1 }], mo: [
    { id: 's', name: 'σ_{1s}', tex: '\\sigma_{1s}', E: 120, deg: 1, anti: false, from: '1s' },
    { id: 's_', name: 'σ*_{1s}', tex: '\\sigma_{1s}^{*}', E: 300, deg: 1, anti: true, from: '1s' }] };
  const i = P2.indexOf(X), e = (k) => E37[k][i];
  const mo = [
    { id: 's', name: 'σ_{2s}', tex: '\\sigma_{2s}', E: e('s2s'), deg: 1, anti: false, from: '2s' },
    { id: 's_', name: 'σ*_{2s}', tex: '\\sigma_{2s}^{*}', E: e('s2s_'), deg: 1, anti: true, from: '2s' }];
  const atom = [{ id: '2s', E: (e('s2s') + e('s2s_')) / 2, deg: 1 }];
  if (withP) {
    mo.push({ id: 'p', name: 'σ_{2px}', tex: '\\sigma_{2px}', E: e('s2p'), deg: 1, anti: false, from: '2p' },
      { id: 'pi', name: 'π_{2py}, π_{2pz}', tex: '\\pi_{2py},\\,\\pi_{2pz}', E: e('pi'), deg: 2, anti: false, from: '2p' },
      { id: 'pi_', name: 'π*_{2py}, π*_{2pz}', tex: '\\pi_{2py}^{*},\\,\\pi_{2pz}^{*}', E: e('pi_'), deg: 2, anti: true, from: '2p' },
      { id: 'p_', name: 'σ*_{2px}', tex: '\\sigma_{2px}^{*}', E: e('s2p_'), deg: 1, anti: true, from: '2p' });
    atom.push({ id: '2p', E: (e('pi') + e('pi_')) / 2, deg: 3 });
  }
  mo.sort((a, b) => a.E - b.E); atom.sort((a, b) => a.E - b.E);
  return { atom, mo };
}
function fill(levels, n) { let left = n; return levels.map((l) => { const k = Math.min(left, 2 * l.deg); left -= k; return k; }); }

/* =====================================================================
   FIGURE 8.34 + 8.35 + 8.36 + 8.40: a molecular orbital diagram filled
   with the valence electrons of the chosen species. The book's four
   diagrams (Be2+, H2, He2, O2) are four states of it. Still: the
   electrons arrive in order of energy after a change.
===================================================================== */
(function () {
  const d = sim('sim-mo-fill', 640);
  const SPECIES = [['H', 0], ['H', 1], ['H', -1], ['He', 0], ['Li', 0], ['Be', 0], ['Be', 1], ['Be', -2], ['B', 0], ['C', 0], ['C', -2], ['N', 0], ['N', 1], ['N', 2], ['O', 0], ['O', 1], ['O', 2], ['O', -2], ['F', 0], ['F', 1], ['Ne', 0]];
  const SUP = { 0: '', 1: '⁺', 2: '²⁺', '-1': '⁻', '-2': '²⁻' };
  const TSUP = { 0: '', 1: '^{+}', 2: '^{2+}', '-1': '^{-}', '-2': '^{2-}' };
  const nameOf = ([X, q]) => X + '₂' + SUP[q];
  const pick = F.select(d.controls, { label: '\\text{species}', options: SPECIES.map((s, i) => ({ value: String(i), label: nameOf(s) })), value: '6', aria: 'molecule or ion', onInput: () => { arrive.set(0); arrive.to(1, 1200); draw(); } });
  const arrive = F.tween(d, 1);
  const Y = (E) => 590 - E * 1.12;
  const XL = 260, XM = 700, XR = 1140;
  const SUPN = ['⁰', '¹', '²', '³', '⁴'];
  let hits = []; F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c);
    const [X, q] = SPECIES[+pick.value], n = 2 * VAL[X] - q, per1 = X === 'H' || X === 'He';
    const D = diagram(X, !per1 && (P2.indexOf(X) >= 2 || n > 4));
    const occ = fill(D.mo, n), nl = Math.ceil(n / 2), nr = n - nl;
    const occL = fill(D.atom, nl), occR = fill(D.atom, nr);
    eAxis(ctx, 70, 600, 110);
    const k = arrive.v, total = Math.max(1, n);
    let seen = 0;
    const show = (cnt) => { const a = clamp(k * total * 1.2 - seen, 0, 1); seen += cnt; return a; };
    hits = [];
    const atomEnds = {};
    D.atom.forEach((l, i) => {
      const w = l.deg === 3 ? 40 : 70;
      const L = level(ctx, XL, Y(l.E), l.deg, occL[i], w), R = level(ctx, XR, Y(l.E), l.deg, occR[i], w);
      atomEnds[l.id] = [L.r, R.l, Y(l.E)];
      text(ctx, l.id, L.l - 16, Y(l.E), PAL.ink, { size: 22, align: 'right' });
      text(ctx, l.id, R.r + 16, Y(l.E), PAL.ink, { size: 22 });
      hits.push({ x: XL, y: Y(l.E), r: 40, name: 'the ' + l.id + ' atomic orbital' + (l.deg > 1 ? 's' : '') + ' of one ' + X + ' atom' }, { x: XR, y: Y(l.E), r: 40, name: 'the ' + l.id + ' atomic orbital' + (l.deg > 1 ? 's' : '') + ' of the other ' + X + ' atom' });
    });
    let prev = Infinity;
    const ys = D.mo.map((l) => { const y = Math.min(Y(l.E), prev - 44); prev = y; return y; });
    D.mo.forEach((l, i) => {
      const y = ys[i], a = show(occ[i]);
      const box = level(ctx, XM, y, l.deg, 0, 70);
      const [ar, bl, ay] = atomEnds[l.from];
      line(ctx, ar + 6, ay, box.l - 6, y, alpha(PAL.ink, 0.45), 2, [6, 6]);
      line(ctx, box.r + 6, y, bl - 6, ay, alpha(PAL.ink, 0.45), 2, [6, 6]);
      level(ctx, XM, y, l.deg, occ[i], 70, a);
      text(ctx, l.name, box.r + 14, y - 16, PAL.ink, { size: 20, bg: PAL.panel });
      hits.push({ x: XM, y, r: 45, name: 'the ' + l.name.replace(/[_{}]/g, '') + ' ' + (l.anti ? 'antibonding' : 'bonding') + ' molecular orbital' });
    });
    text(ctx, 'Atomic orbitals', XL, 590, PAL.muted, { size: 20, align: 'center' });
    text(ctx, 'Molecular orbitals', XM, 590, PAL.muted, { size: 20, align: 'center' });
    text(ctx, 'Atomic orbitals', XR, 590, PAL.muted, { size: 20, align: 'center' });
    text(ctx, X, XL, 620, PAL.ink, { size: 22, weight: 600, align: 'center' });
    text(ctx, X + '_{2}' + SUP[q], XM, 620, PAL.ink, { size: 22, weight: 600, align: 'center' });
    text(ctx, X, XR, 620, PAL.ink, { size: 22, weight: 600, align: 'center' });
    let b = 0, ab = 0, unp = 0;
    D.mo.forEach((l, i) => { if (l.anti) ab += occ[i]; else b += occ[i]; spread(occ[i], l.deg).forEach((o) => { if (o === 1) unp++; }); });
    const conf = D.mo.map((l, i) => (occ[i] ? '(' + l.name + ')' + SUPN[occ[i]] : '')).join('');
    headline(ctx, nameOf(SPECIES[+pick.value]) + ': ' + conf);
    const bo = (b - ab) / 2;
    readout(d.readout, `\\text{bond order of } \\text{${X}}_2${TSUP[q]} = \\frac{(${b} - ${ab})}{2} = ${fmt(bo, bo % 1 ? 1 : 0)}`,
      (unp === 0 ? 'All the valence electrons are paired, so ' : unp === 1 ? 'One electron is unpaired, so ' : unp + ' electrons are unpaired, so ') + nameOf(SPECIES[+pick.value]) + (unp ? ' is paramagnetic' : ' is diamagnetic') + (bo <= 0 ? ', and with a bond order of zero it is not stable.' : '.'));
  }
  still(d, draw);
})();

/* =====================================================================
   FIGURE 8.37: the valence molecular orbitals of Li2 to Ne2 side by side
   on one scale. Still: the comparison across the period is the picture.
===================================================================== */
(function () {
  const d = sim('sim-period2', 620);
  const X0 = 190, DX = 132, Y = (E) => 580 - E * 1.18;
  const ROWS = [['s2p_', 'σ*_{2px}', 1], ['pi_', 'π*_{2py}, π*_{2pz}', 2], ['s2p', 'σ_{2px}', 1], ['pi', 'π_{2py}, π_{2pz}', 2], ['s2s_', 'σ*_{2s}', 1], ['s2s', 'σ_{2s}', 1]];
  let hits = []; F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c);
    eAxis(ctx, 70, 590, 90);
    hits = [];
    P2.forEach((X, i) => {
      const x = X0 + i * DX;
      ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.05); ctx.fillRect(x - 58, 80, 116, 510); ctx.restore();
      text(ctx, X + '_{2}', x, 60, PAL.ink, { size: 22, weight: 600, align: 'center' });
    });
    ROWS.forEach(([k, nm, deg]) => {
      P2.forEach((X, i) => {
        const x = X0 + i * DX, y = Y(E37[k][i]);
        if (deg === 1) line(ctx, x - 26, y, x + 26, y, PAL.ink, 5); else { line(ctx, x - 54, y, x - 6, y, PAL.ink, 5); line(ctx, x + 6, y, x + 54, y, PAL.ink, 5); }
        if (i < 7) line(ctx, x + (deg === 1 ? 26 : 54), y, X0 + (i + 1) * DX - (deg === 1 ? 26 : 54), Y(E37[k][i + 1]), alpha(PAL.ink, 0.45), 2, [6, 6]);
        hits.push({ x, y, r: 22, name: 'the ' + nm.replace(/[_{}]/g, '') + ' orbital' + (deg > 1 ? 's' : '') + ' of ' + X + '₂' });
      });
      text(ctx, nm, X0 + 7 * DX + 70, Y(E37[k][7]), PAL.ink, { size: 20 });
    });
    text(ctx, 'σ_{2px}', X0 - 72, Y(E37.s2p[0]), PAL.ink, { size: 20, align: 'right' });
    readout(d.readout, '\\text{Li}_2\\ \\text{to}\\ \\text{N}_2:\\ \\pi_{2p} < \\sigma_{2px} \\qquad \\text{O}_2\\ \\text{to}\\ \\text{Ne}_2:\\ \\sigma_{2px} < \\pi_{2p}',
      'The order changes between N₂ and O₂.');
  }
  still(d, draw);
})();

/* =====================================================================
   FIGURE 8.38: s-p mixing. The slider moves the four σ orbitals from the
   book's left diagram to its right one; σp crosses the π pair on the way.
   Still.
===================================================================== */
(function () {
  const d = sim('sim-spmix', 640);
  const M = ctl(d.controls, { label: '\\text{s-p mixing}', cls: '', min: 0, max: 1, step: 0.01, value: 0, unit: '', dec: 2, aria: 'extent of s-p mixing',
    specials: [{ at: 0.6, label: 'σp meets πp' }] });
  const Y = (E) => 600 - E;
  const XL = 300, XM = 700, XR = 1100;
  let hits = []; F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c);
    const m = M.v, cS = F.cat(1);
    const L = [
      { n: 'σ_{s}', E: 80 - 45 * m, deg: 1, from: 's', c: cS }, { n: 'σ*_{s}', E: 170 - 45 * m, deg: 1, from: 's', c: cS },
      { n: 'σ_{p}', E: 250 + 100 * m, deg: 1, from: 'p', c: cS }, { n: 'π_{p}', E: 310, deg: 2, from: 'p', c: PAL.ink },
      { n: 'π*_{p}', E: 420, deg: 2, from: 'p', c: PAL.ink }, { n: 'σ*_{p}', E: 480 + 30 * m, deg: 1, from: 'p', c: cS }];
    const AT = { s: 125, p: 365 };
    eAxis(ctx, 70, 610, 60);
    hits = [];
    Object.entries(AT).forEach(([k, E]) => {
      const deg = k === 'p' ? 3 : 1, w = deg === 3 ? 40 : 70;
      level(ctx, XL, Y(E), deg, 0, w); level(ctx, XR, Y(E), deg, 0, w);
      text(ctx, '2' + k, XL - 110, Y(E), PAL.ink, { size: 22, align: 'right' });
      text(ctx, '2' + k, XR + 110, Y(E), PAL.ink, { size: 22 });
    });
    L.forEach((l) => {
      const y = Y(l.E), gap = 14, w = 70, tot = l.deg * w + (l.deg - 1) * gap, x0 = XM - tot / 2;
      for (let i = 0; i < l.deg; i++) line(ctx, x0 + i * (w + gap), y, x0 + i * (w + gap) + w, y, l.c, 5);
      const ax = l.from === 'p' ? 90 : 35;
      line(ctx, XL + ax, Y(AT[l.from]), x0 - 6, y, alpha(PAL.ink, 0.4), 2, [6, 6]);
      line(ctx, x0 + tot + 6, y, XR - ax, Y(AT[l.from]), alpha(PAL.ink, 0.4), 2, [6, 6]);
      text(ctx, l.n, x0 + tot + (l.deg > 1 ? 14 : 110), y - 16, l.c, { size: 20, bg: PAL.panel });
      hits.push({ x: XM, y, r: 45, name: 'the ' + l.n.replace(/[_{}]/g, '') + ' molecular orbital' });
    });
    const above = 250 + 100 * m > 310;
    headline(ctx, m === 0 ? 'Without mixing, σ_{p} lies below the π_{p} pair, as in O₂, F₂ and Ne₂.'
      : above ? 'With enough s-p mixing, σ_{p} rises above the π_{p} pair, as in Li₂ through N₂.'
      : m === 0.6 ? 'Here σ_{p} and the π_{p} pair have the same energy.' : 'Mixing lowers σ_{s} and σ*_{s} and raises σ_{p} and σ*_{p}, but σ_{p} is still below π_{p}.');
    readout(d.readout, above ? '\\sigma_s < \\sigma_s^{*} < \\pi_p < \\sigma_p < \\pi_p^{*} < \\sigma_p^{*}' : '\\sigma_s < \\sigma_s^{*} < \\sigma_p ' + (m === 0.6 ? '=' : '<') + ' \\pi_p < \\pi_p^{*} < \\sigma_p^{*}',
      's-p mixing creates no new orbitals; it only moves the σ orbitals.');
  }
  still(d, draw);
})();

/* =====================================================================
   FIGURE 8.39: bands. N orbitals give N/2 bonding and N/2 antibonding
   levels that crowd into the valence and conduction bands; the solid sets
   the gap. Still.
===================================================================== */
(function () {
  const d = sim('sim-bands', 600);
  const nPick = F.choice(d.controls, { label: 'N', options: [{ value: '2', label: '2' }, { value: '6', label: '6' }, { value: '20', label: '20' }, { value: 'many', label: 'very many' }], value: 'many', aria: 'number of atoms', onInput: () => draw() });
  const solid = F.choice(d.controls, { label: '\\text{solid}', options: [{ value: 'ins', label: 'insulator' }, { value: 'semi', label: 'semiconductor' }, { value: 'cond', label: 'conductor' }], value: 'ins', aria: 'kind of solid', onInput: () => draw() });
  const GAP = { ins: 220, semi: 110, cond: 22 }, NAME = { ins: 'an insulator', semi: 'a semiconductor', cond: 'a conductor' };
  let hits = []; F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c);
    const g = solid.mix((s) => GAP[s]), mid = 330, W = 150, x0 = 520, x1 = 880;
    const nv = nPick.value === 'many' ? Infinity : +nPick.value, frac = nv === Infinity ? 1 : 1 - 2 / nv;
    const vt = mid + g / 2, vb = vt + W * frac, cb = mid - g / 2, ct = cb - W * frac;
    eAxis(ctx, 200, 560, 60);
    const cV = F.ref('valence-band'), cC = F.ref('conduction-band');
    if (nv === Infinity) {
      ctx.save(); ctx.fillStyle = alpha(cV, 0.45); ctx.fillRect(x0, vt, x1 - x0, vb - vt); ctx.fillStyle = alpha(cC, 0.25); ctx.fillRect(x0, ct, x1 - x0, cb - ct); ctx.restore();
      ctx.save(); ctx.strokeStyle = cV; ctx.lineWidth = 3; ctx.strokeRect(x0, vt, x1 - x0, vb - vt); ctx.strokeStyle = cC; ctx.strokeRect(x0, ct, x1 - x0, cb - ct); ctx.restore();
    } else {
      const h = nv / 2;
      for (let i = 0; i < h; i++) {
        const f = h === 1 ? 0 : i / (h - 1);
        line(ctx, x0, vt + (vb - vt) * f, x1, vt + (vb - vt) * f, cV, 4);
        line(ctx, x0, cb - (cb - ct) * f, x1, cb - (cb - ct) * f, cC, 4);
      }
    }
    text(ctx, 'conduction band (empty)', x1 + 30, (ct + cb) / 2, cC, { size: 22 });
    text(ctx, 'valence band (filled)', x1 + 30, (vt + vb) / 2, cV, { size: 22 });
    const cE = C('energy');
    line(ctx, x0 - 40, cb, x0 - 40, vt, cE, 3); line(ctx, x0 - 52, cb, x0 - 28, cb, cE, 3); line(ctx, x0 - 52, vt, x0 - 28, vt, cE, 3);
    text(ctx, 'band gap', x0 - 60, mid, cE, { size: 22, weight: 600, align: 'right' });
    hits = [{ x: (x0 + x1) / 2, y: (vt + vb) / 2, r: 60, name: 'the bonding orbitals, the valence band' }, { x: (x0 + x1) / 2, y: (ct + cb) / 2, r: 60, name: 'the antibonding orbitals, the conduction band' }];
    headline(ctx, 'In ' + NAME[solid.value] + ' the band gap is ' + (solid.value === 'ins' ? 'large' : solid.value === 'semi' ? 'moderate' : 'very small') + '.');
    const nS = String(nv), hS = String(nv / 2);
    readout(d.readout, nv === Infinity ? 'N/2\\ \\text{bonding (filled)},\\quad N/2\\ \\text{antibonding (empty)}' : `N = ${nS}:\\quad N/2 = ${hS}\\ \\text{bonding (filled)},\\quad N/2 = ${hS}\\ \\text{antibonding (empty)}`,
      nv === Infinity ? 'So many levels lie so close together that they form bands.' : 'Each bonding and each antibonding orbital has a slightly different energy.');
  }
  still(d, draw);
})();
};
