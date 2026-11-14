/* Figures for section 8.2 Hybrid Atomic Orbitals. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['8.2'] = function (root, F) {
const { tex, PAL, alpha, register, begin, topline } = F;
const sim = (id, H) => F.sim(root, id, H);
/* a still figure answers its controls and has no clock */
const still = (d, draw) => register(d.fig, { update: () => {}, draw });
const hued = (e, type) => { e.style.color = F.C(type); return e; };
const RAD = Math.PI / 180, TAU = 2 * Math.PI;
const clamp = (x, a, b) => Math.max(a, Math.min(b, x));

/* ---------- vectors (scene coordinates: x right, y up, z toward the reader) ---------- */
const V = {
  add: (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]],
  sub: (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]],
  mul: (a, k) => [a[0] * k, a[1] * k, a[2] * k],
  dot: (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2],
  len: (a) => Math.hypot(a[0], a[1], a[2]),
  unit: (a) => { const l = Math.hypot(a[0], a[1], a[2]) || 1; return [a[0] / l, a[1] / l, a[2] / l]; },
  lerp: (a, b, k) => [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k],
  angle: (a, b) => Math.acos(Math.max(-1, Math.min(1, V.dot(V.unit(a), V.unit(b))))) / RAD,
};
function slerp(a, b, t) {
  const w = Math.acos(Math.max(-1, Math.min(1, V.dot(a, b)))); if (w < 1e-6) return a;
  const s = Math.sin(w); return V.add(V.mul(a, Math.sin((1 - t) * w) / s), V.mul(b, Math.sin(t * w) / s));
}
const rotY = (v, a) => { const c = Math.cos(a * RAD), s = Math.sin(a * RAD); return [v[0] * c + v[2] * s, v[1], -v[0] * s + v[2] * c]; };
const rotX = (v, a) => { const c = Math.cos(a * RAD), s = Math.sin(a * RAD); return [v[0], v[1] * c - v[2] * s, v[1] * s + v[2] * c]; };
/* the chemist's axes as the book draws them: z up, x right, y away from the reader */
const chem = ([x, y, z]) => [x, z, -y];
const upPerp = (u) => { const w = V.sub([0, 1, 0], V.mul(u, u[1])); return V.len(w) > 0.2 ? V.unit(w) : V.unit(V.sub([1, 0, 0], V.mul(u, u[0]))); };

/* the ideal directions of the five hybrid sets (scene coordinates) */
const T3 = Math.sqrt(8 / 9), T1 = -1 / 3;
const SITES = {
  2: [[1, 0, 0], [-1, 0, 0]],
  3: [[0, 1, 0], [Math.cos(210 * RAD), Math.sin(210 * RAD), 0], [Math.cos(330 * RAD), Math.sin(330 * RAD), 0]],
  4: [[0, 1, 0], [T3, T1, 0], rotY([T3, T1, 0], 120), rotY([T3, T1, 0], 240)],
  5: [[0, 1, 0], [0, -1, 0], [1, 0, 0], rotY([1, 0, 0], 120), rotY([1, 0, 0], 240)],
  6: [[0, 1, 0], [0, -1, 0], [1, 0, 0], [-1, 0, 0], [0, 0, 1], [0, 0, -1]],
};
const ARRANGE = { 2: 'linear', 3: 'trigonal planar', 4: 'tetrahedral', 5: 'trigonal bipyramidal', 6: 'octahedral' };
const HYB = { 2: '<em>sp</em>', 3: '<em>sp</em><sup>2</sup>', 4: '<em>sp</em><sup>3</sup>', 5: '<em>sp</em><sup>3</sup><em>d</em>', 6: '<em>sp</em><sup>3</sup><em>d</em><sup>2</sup>' };
const HYB_U = { 2: 'sp', 3: 'sp²', 4: 'sp³', 5: 'sp³d', 6: 'sp³d²' };
const HYB_TEX = { 2: 'sp', 3: 'sp^2', 4: 'sp^3', 5: 'sp^3d', 6: 'sp^3d^2' };
/* the arcs each set marks, as the book's Figure 8.21 marks them: two site indices and the angle */
const ARCS = { 2: [[0, 1, '180°']], 3: [[0, 2, '120°']], 4: [[0, 1, '109.5°']], 5: [[0, 2, '90°'], [2, 3, '120°']], 6: [[0, 2, '90°']] };
const WORDS = { 2: 'Two', 3: 'Three', 4: 'Four', 5: 'Five', 6: 'Six' };

/* ---------- orbitals drawn from their wave functions ----------
   An orbital a·s + b·p (a² + |b|² = 1) has the angular part f(θ) = a + √3|b| cos θ about the direction
   of b. Its surface is drawn at r = L (|f|/2)^2.6: an s orbital is a sphere, a p orbital two lobes pinched
   at the nucleus, a hybrid one large lobe with a small one behind, in the book's proportions. Every
   state of a mixing is drawn by the same rule, so a morph passes only through real combinations. */
const NT = 60, NP = 40, Q = 2.6;
let INDEX = null;
function orbital(v, g, at, a, b, L, color, name, { opacity = 1 } = {}) {
  const T = window.THREE; if (!T || L < 1e-3 || opacity < 0.01) return null;
  const n = Math.hypot(a, V.len(b)) || 1, A = a / n, bl = V.len(b) / n, ax = bl > 1e-6 ? V.unit(b) : [0, 1, 0], k = Math.sqrt(3) * bl;
  const pos = new Float32Array((NT + 1) * (NP + 1) * 3);
  let i = 0;
  for (let it = 0; it <= NT; it++) {
    const th = (Math.PI * it) / NT, c = Math.cos(th), s = Math.sin(th), f = A + k * c, r = L * Math.pow(Math.abs(f) / 2, Q);
    for (let ip = 0; ip <= NP; ip++) { const ph = (TAU * ip) / NP; pos[i++] = r * s * Math.cos(ph); pos[i++] = r * c; pos[i++] = r * s * Math.sin(ph); }
  }
  if (!INDEX) { INDEX = []; for (let it = 0; it < NT; it++) for (let ip = 0; ip < NP; ip++) { const p = it * (NP + 1) + ip, q = p + NP + 1; INDEX.push(p, q, p + 1, q, q + 1, p + 1); } }
  const geo = new T.BufferGeometry(); geo.setAttribute('position', new T.BufferAttribute(pos, 3)); geo.setIndex(INDEX); geo.computeVertexNormals();
  const m = new T.Mesh(geo, F.mesh.mat(color, opacity < 1 ? { transparent: true, opacity, depthWrite: false, side: T.DoubleSide } : { side: T.DoubleSide, shininess: 30 }));
  /* lobes with p character drawn a little slimmer than the bare profile, as the book draws them; an s orbital stays round */
  const slim = 1 - 0.2 * bl; m.scale.set(slim, 1, slim);
  m.position.set(at[0], at[1], at[2]);
  m.quaternion.setFromUnitVectors(new T.Vector3(0, 1, 0), new T.Vector3(ax[0], ax[1], ax[2]));
  g.add(m); if (name && opacity > 0.3) v.pickable(m, name); return m;
}
/* the coefficients of the hybrids of a set of n made from s and n − 1 p orbitals */
const hybridAB = (n, u) => [1 / Math.sqrt(n), V.mul(u, Math.sqrt((n - 1) / n))];
const S_COL = () => F.cat(0), P_COL = () => F.cat(1), H_COL = () => F.cat(2);
/* the colours a scene is built from, so a theme or a colour switch rebuilds it */
const palSig = () => [PAL.ink, PAL.muted, PAL.panel, F.C('angle'), F.cat(0), F.cat(1), F.cat(2), F.el('H'), F.el('P'), F.el('Cl'), F.el('S'), F.el('F')].join('|');

/* ---------- the stage: a scene the reader turns, a headline canvas above it, a key canvas below ----------
   Labels stand outside what they name: `out` sets a label beyond the point p on the line from its part's
   centre; `under` sets one at the stage's foot under a part's centre; `axis` names an axis at its tip and
   hides the name while that tip is seen against a lobe. */
const { sphere, stick } = F.mesh;
function stage3(d, o) {
  const outs = [], unders = [], axes = [];
  let v = null;
  const ppu = () => v.wrap.clientHeight / (2 * Math.tan(15 * RAD) * o.dist / (v.at.zoom || 1));
  function place() {
    if (!v || !v.wrap || !v.wrap.clientHeight) return;
    const w = v.wrap.clientWidth, h = v.wrap.clientHeight, u = ppu();
    outs.forEach((l) => {
      const q = v.project(l.p, l.g), c = v.project(l.c, l.g);
      let dx = q[0] - c[0], dy = q[1] - c[1]; const n = Math.hypot(dx, dy);
      if (n < 6) { dx = 0; dy = -1; } else { dx /= n; dy /= n; }
      const bw = l.el.offsetWidth / 2, bh = l.el.offsetHeight / 2, push = l.r * u + l.gap + Math.abs(dx) * bw + Math.abs(dy) * bh;
      l.el.style.left = clamp(q[0] + dx * push, bw + 2, w - bw - 2) + 'px';
      l.el.style.top = clamp(q[1] + dy * push, bh + 2, h - bh - 2) + 'px';
    });
    unders.forEach((l) => { const c = v.project([0, 0, 0], l.g); l.el.style.left = clamp(c[0], l.el.offsetWidth / 2 + 2, w - l.el.offsetWidth / 2 - 2) + 'px'; l.el.style.top = (h - l.el.offsetHeight / 2 - 4) + 'px'; });
    axes.forEach((l) => {
      const q = v.project(l.p, l.g), c = v.project([0, 0, 0], l.g), s = l.g.scale.x;
      const off = q[0] < 8 || q[1] < 8 || q[0] > w - 8 || q[1] > h - 8;
      l.el.style.visibility = off || Math.hypot(q[0] - c[0], q[1] - c[1]) < l.reach * s * u ? 'hidden' : '';
      l.el.style.left = q[0] + 'px'; l.el.style.top = q[1] + 'px';
    });
  }
  v = F.view3d(d.stage, { h: o.h, dist: o.dist, tilt: o.tilt ?? 0.3, spin: 'idle', onRender: place });
  if (o.yaw != null) v.setView(o.yaw, o.tilt ?? 0.3);
  return {
    v,
    out(s, p, g, { r = 0, gap = 6, c = [0, 0, 0] } = {}) { const e = v.label(s, [0, 0, 0], g, 0, 'bare'); outs.push({ el: e, p, g, r, gap, c }); return e; },
    under(s, g) { const e = v.label(s, [0, 0, 0], g, 0, 'bare'); unders.push({ el: e, g }); return e; },
    axis(s, p, g, reach) { const e = v.label(s, [0, 0, 0], g, 0, 'bare'); e.style.color = PAL.muted; axes.push({ el: e, p, g, reach }); return e; },
    clear() { v.clear(); outs.length = 0; unders.length = 0; axes.length = 0; },
  };
}
/* the arc of an angle as a thin tube in the angle hue; returns the point its label stands beyond */
function arcTube(g, c, a, b, R, perp) {
  const ua = V.unit(a), ub = V.unit(b), pts = [], straight = V.dot(ua, ub) < -0.999, n = straight ? 30 : 18, col = F.C('angle');
  const side = straight ? V.unit(V.sub(perp ?? upPerp(ua), V.mul(ua, V.dot(perp ?? upPerp(ua), ua)))) : null;
  const at = (k) => (straight ? V.add(V.mul(ua, Math.cos(Math.PI * k)), V.mul(side, Math.sin(Math.PI * k))) : slerp(ua, ub, k));
  for (let i = 0; i <= n; i++) pts.push(V.add(c, V.mul(at(i / n), R)));
  for (let i = 0; i < n; i++) stick(g, pts[i], pts[i + 1], 0.018, col);
  return V.add(c, V.mul(V.unit(at(0.5)), R));
}
function angle3(S, g, a, b, R, label, { c = [0, 0, 0], perp } = {}) {
  const p = arcTube(g, c, a, b, R, perp);
  return hued(S.out(label, p, g, { c, gap: 4 }), 'angle');
}
/* thin muted axes through a panel's nucleus, and its nucleus */
function axes3(S, g, L, names) {
  const col = alpha(PAL.ink, 0.35);
  [[[1, 0, 0], 'x'], [[0, 0, -1], 'y'], [[0, 1, 0], 'z']].forEach(([u, nm]) => {
    F.mesh.polyline(g, [V.mul(u, -L), V.mul(u, L)], col);
    if (names) S.axis(`<em>${nm}</em>`, V.mul(u, L * 1.08), g, names);
  });
}
const nucleus = (S, g, p, name, r = 0.05) => S.v.pickable(sphere(g, p, r, PAL.ink), name);
/* a hydrogen atom: its 1s orbital, translucent, round its nucleus */
function hydrogen(S, g, p, R, a = 1, name = 'the 1s orbital of a hydrogen atom') {
  if (a < 0.01) return;
  const m = sphere(g, p, R, S_COL(), { transparent: true, opacity: 0.5 * a, depthWrite: false }); if (a > 0.3) S.v.pickable(m, name);
  if (a > 0.3) nucleus(S, g, p, 'the nucleus of a hydrogen atom', 0.04);
}

/* ---------- the key: one entry per kind, its sample drawn as the scene draws it ---------- */
function lobeSample(c, x, y, col, minor = 0) {
  c.save(); c.fillStyle = col; c.strokeStyle = alpha(PAL.ink, 0.35); c.lineWidth = 1;
  c.beginPath();
  for (let i = 0; i <= 60; i++) { const th = (Math.PI * i) / 60 - Math.PI / 2, r = 26 * Math.pow(Math.cos(th), 1.5); c.lineTo(x - 12 + r * Math.cos(th), y + r * Math.sin(th) * 0.9); }
  c.closePath(); c.fill(); c.stroke();
  if (minor) { c.beginPath(); c.ellipse(x - 15, y, 3.5, 3, 0, 0, TAU); c.fill(); }
  c.restore();
}
const KEY = {
  s: (s = 's orbital') => ({ s, draw: (c, x, y) => { c.save(); c.globalAlpha = 0.85; c.fillStyle = S_COL(); c.beginPath(); c.arc(x, y, 9, 0, TAU); c.fill(); c.restore(); } }),
  p: (s = 'p orbital') => ({ s, draw: (c, x, y) => { lobeSample(c, x + 6, y, P_COL()); c.save(); c.translate(2 * x - 12, 0); c.scale(-1, 1); lobeSample(c, x - 6, y, P_COL()); c.restore(); } }),
  h: (s = 'hybrid orbital') => ({ s, draw: (c, x, y) => lobeSample(c, x + 4, y, H_COL(), 1) }),
  atom: (sym, s) => ({ s, draw: (c, x, y) => { c.save(); c.fillStyle = F.el(sym); c.strokeStyle = alpha(PAL.ink, 0.45); c.lineWidth = 1.5; c.beginPath(); c.arc(x, y, 10, 0, TAU); c.fill(); c.stroke(); c.restore(); } }),
};
const keyRow = (cv, entries) => { const { ctx } = begin(cv); F.legend(ctx, { l: 40, r: 1360, t: 0, b: 56 }, entries, { corner: 'top', row: true, panel: false, size: 20 }); };
/* the figure's three layers: headline canvas, scene, key canvas */
function frame(id, o) {
  const d = sim(id);
  const top = F.makeCanvas(d.stage, o.top ?? 70);
  const S = stage3(d, o);
  const key = F.makeCanvas(d.stage, 56);
  return { d, S, v: S.v, top, key };
}
const headline = (cv, s) => { const { ctx } = begin(cv); topline(ctx, s); };

/* =====================================================================
   FIGURE 8.6 + 8.7: the oxygen of water with two perpendicular 2p orbitals
   (the hydrogen atoms 90° apart), with four sp³ hybrids (109.5°), and in
   H₂O, where the lone pairs close the angle to the observed 104.5°. Still:
   a choice of three models, each change one morph.
===================================================================== */
(function () {
  const { d, S, v, top, key } = frame('sim-water', { h: 540, dist: 6.6, tilt: 0.2, yaw: 0.12 });
  const g = v.part(0); g.position.y = 0.1;
  const model = F.choice(d.controls, { label: '\\text{model}', aria: 'the orbitals of oxygen', options: [{ value: 'p', label: '2<em>p</em> orbitals' }, { value: 'sp3', label: '<em>sp</em><sup>3</sup> hybrids' }, { value: 'h2o', label: 'in H<sub>2</sub>O' }], value: 'p' });
  const L = 1.3;
  /* the H–O–H bisector points down, the bonds in the page's plane, the lone pairs up and out of it */
  const u = [0, -1, 0], w = [1, 0, 0], z = [0, 0, 1];
  const bonds = (half) => [V.add(V.mul(u, Math.cos(half * RAD)), V.mul(w, Math.sin(half * RAD))), V.add(V.mul(u, Math.cos(half * RAD)), V.mul(w, -Math.sin(half * RAD)))];
  const lones = (half) => [V.add(V.mul(u, -Math.cos(half * RAD)), V.mul(z, Math.sin(half * RAD))), V.add(V.mul(u, -Math.cos(half * RAD)), V.mul(z, -Math.sin(half * RAD)))];
  const STATE = { p: { half: 45, lone: 54.74, hyb: 0, lp: 0, H: 1 }, sp3: { half: 54.74, lone: 54.74, hyb: 1, lp: 1, H: 0 }, h2o: { half: 52.25, lone: 57, hyb: 1, lp: 1, H: 1 } };
  const DEG = { p: '90°', sp3: '109.5°', h2o: '104.5°' };
  let sig = '';
  function draw() {
    const s = model.mix((m) => STATE[m]), at = model.k >= 1, m = model.value;
    const tag = [JSON.stringify(s), at, m, palSig()].join('|');
    if (tag !== sig) {
      sig = tag; S.clear();
      nucleus(S, g, [0, 0, 0], 'the nucleus of the oxygen atom', 0.06);
      const col = F.mixColor(P_COL(), H_COL(), s.hyb), B = bonds(s.half), Lp = lones(s.lone);
      /* a 2p orbital (a = 0) bends into an sp³ hybrid (a = ½) along the same axis */
      const a = 0.5 * s.hyb, b = Math.sqrt(1 - a * a);
      B.forEach((dir) => orbital(v, g, [0, 0, 0], a, V.mul(dir, b), L, col, s.hyb > 0.5 ? 'an sp³ hybrid orbital of oxygen, bonding' : 'a 2p orbital of oxygen'));
      Lp.forEach((dir) => orbital(v, g, [0, 0, 0], 0.5, V.mul(dir, Math.sqrt(0.75)), L * s.lp, H_COL(), 'an sp³ hybrid orbital of oxygen, holding a lone pair', { opacity: Math.min(1, s.lp * 1.5) }));
      B.forEach((dir) => hydrogen(S, g, V.mul(dir, L * 1.02), 0.42, s.H));
      if (at) {
        angle3(S, g, B[0], B[1], L * (m === 'sp3' ? 1.12 : 1.6), DEG[m]);
        if (m !== 'p') Lp.forEach((dir) => S.out('lone pair', V.mul(dir, L * 1.02), g, { gap: 4 }));
      }
      v.invalidate();
    }
    headline(top, {
      p: 'Two 2p orbitals of oxygen, 90° apart, would hold the hydrogen atoms at 90°.',
      sp3: 'Four sp³ hybrids point to the corners of a tetrahedron, 109.5° apart.',
      h2o: 'Two hybrids bond to hydrogen; the two lone pairs close the angle to 104.5°.',
    }[m]);
    keyRow(key, m === 'sp3' ? [KEY.h('sp³ hybrid of O')] : [KEY.s('1s orbital of H'), m === 'p' ? KEY.p('2p orbital of O') : KEY.h('sp³ hybrid of O')]);
    tex(d.readout, {
      p: '\\htmlClass{kv-angle}{\\angle\\text{HOH}} = 90^\\circ \\ne 104.5^\\circ\\ (\\text{observed})',
      sp3: '\\htmlClass{kv-angle}{\\angle\\text{HOH}} = 109.5^\\circ\\ (\\text{tetrahedral})',
      h2o: '\\htmlClass{kv-angle}{\\angle\\text{HOH}} = 104.5^\\circ < 109.5^\\circ',
    }[m]);
  }
  still(d, draw);
})();

/* =====================================================================
   FIGURES 8.8, 8.10 + 8.11 + 8.12 and 8.15: the four valence orbitals of
   the atom, one to a panel on its own axes. The orbitals that mix become
   hybrids in place, each panel turning into one hybrid; then the panels
   close onto one nucleus as the set. Still: a choice of states, each one
   morph. Figure 8.12's BH₃ adds a hydrogen atom to each sp² hybrid.
===================================================================== */
function bench(id, n, o) {
  const { d, S, v, top, key } = frame(id, { h: 520, dist: 9.4, tilt: 0.3, yaw: -0.42 });
  const L = 1.05, AX = 1.4, GAP = 3.05;
  const parts = [0, 1, 2, 3].map(() => v.part(0));
  const states = [{ value: 'atomic', label: 'atomic orbitals' }, { value: 'hybrid', label: 'hybrid orbitals' }, { value: 'set', label: 'the set' }].concat(o.bh3 ? [{ value: 'bh3', label: 'BH<sub>3</sub>' }] : []);
  const st = F.choice(d.controls, { label: '\\text{orbitals}', aria: 'the stage of the mixing', options: states, value: 'atomic' });
  /* the four valence orbitals in the chemist's frame: s, pₓ, p_y, p_z, and the n hybrids they make */
  const P_AX = [[1, 0, 0], [0, 1, 0], [0, 0, 1]].map(chem), P_NAME = ['<em>p</em><sub><em>x</em></sub>', '<em>p</em><sub><em>y</em></sub>', '<em>p</em><sub><em>z</em></sub>'];
  const hy = o.dirs.map(chem);
  /* panel i: from atomic (a, b) to its state after mixing; the p that a hybrid comes from is drawn with the
     phase that leans toward it, so the lobe swings the short way */
  const orbs = [0, 1, 2, 3].map((i) => {
    const atomic = i === 0 ? [1, [0, 0, 0]] : [0, V.mul(P_AX[i - 1], i < n && V.dot(P_AX[i - 1], hy[i]) < 0 ? -1 : 1)];
    const mixed = i < n ? hybridAB(n, hy[i]) : atomic;
    return { atomic, mixed, mixes: i < n, name: i === 0 ? '<em>s</em>' : P_NAME[i - 1] };
  });
  const STATE = { atomic: { mix: 0, close: 0, H: 0 }, hybrid: { mix: 1, close: 0, H: 0 }, set: { mix: 1, close: 1, H: 0 }, bh3: { mix: 1, close: 1, H: 1 } };
  let sig = '';
  function draw() {
    const s = st.mix((x) => STATE[x]), now = st.value, at = st.k >= 1;
    const tag = [JSON.stringify(s), now, at, palSig()].join('|');
    if (tag !== sig) {
      sig = tag; S.clear();
      const grow = 1 + 0.45 * s.close;
      parts.forEach((g, i) => {
        g.position.x = (i - 1.5) * GAP * (1 - s.close); g.scale.setScalar(grow);
        const q = orbs[i], a = q.atomic[0] + (q.mixed[0] - q.atomic[0]) * s.mix, b = V.lerp(q.atomic[1], q.mixed[1], s.mix);
        const col = !q.mixes ? P_COL() : F.mixColor(i === 0 ? S_COL() : P_COL(), H_COL(), s.mix);
        /* a p orbital that stays out of the mixing fades as the set closes, so the hybrids read first */
        const op = q.mixes ? 1 : 1 - 0.65 * s.mix;
        const nm = q.mixes && s.mix > 0.5 ? `an ${HYB_U[n]} hybrid orbital` : i === 0 ? 'the valence s orbital' : `a valence p orbital, ${['pₓ', 'p_y', 'p_z'][i - 1]}${q.mixes ? '' : ', unhybridized'}`;
        orbital(v, g, [0, 0, 0], a, b, L, col, nm, { opacity: op });
        if (i === 0 || s.close < 0.98) { axes3(S, g, AX, i === 0 ? L : 0); nucleus(S, g, [0, 0, 0], 'the nucleus'); }
        if (at && now !== 'set' && now !== 'bh3') S.under(q.mixes && now === 'hybrid' ? HYB[n] : q.name + (q.mixes || now === 'atomic' ? '' : ' (unhybridized)'), g);
      });
      const g0 = parts[0];
      if (s.H > 0.01) hy.slice(0, n).forEach((u) => hydrogen(S, g0, V.mul(u, L * 1.05), 0.36, s.H));
      if (at && (now === 'set' || now === 'bh3')) {
        o.arcs.forEach(([i, j, t]) => angle3(S, g0, hy[i], hy[j], L * (s.H ? 1.55 : 1.2), t, { perp: chem([0, 0, 1]) }));
        if (now === 'set' && n < 4) S.out(P_NAME[2] + ' (unhybridized)', V.mul(chem([0, 0, 1]), L * 0.9), g0, { gap: 4 });
      }
      v.invalidate();
    }
    headline(top, o.head[now]);
    keyRow(key, now === 'bh3' ? [KEY.h(`${HYB_U[n]} hybrid of B`), KEY.s('1s orbital of H'), KEY.p('unhybridized p')] : [KEY.s(), KEY.p(), KEY.h()]);
    tex(d.readout, now === 'bh3' ? o.bh3 : o.eq);
  }
  still(d, draw);
}
bench('sim-sp', 2, {
  dirs: [[1, 0, 0], [-1, 0, 0]], arcs: [[0, 1, '180°']],
  eq: '1\\ s + 3\\ p \\;\\longrightarrow\\; 2\\ sp + 2\\ p',
  head: { atomic: 'The s orbital and one p orbital mix; the other two p orbitals do not.', hybrid: 'Two sp hybrids, each with one large lobe and one small one.', set: 'The two sp hybrids point 180° apart along x.' },
});
bench('sim-sp2', 3, {
  dirs: [[1, 0, 0], [Math.cos(120 * RAD), Math.sin(120 * RAD), 0], [Math.cos(240 * RAD), Math.sin(240 * RAD), 0]], arcs: [[0, 1, '120°']],
  eq: '1\\ s + 3\\ p \\;\\longrightarrow\\; 3\\ sp^2 + 1\\ p',
  bh3: '3\\ sp^2\\ (\\text{B}) + 3\\ 1s\\ (\\text{H}) \\;\\longrightarrow\\; 3\\ \\sigma\\ \\text{bonds}',
  head: { atomic: 'The s orbital and two p orbitals mix; p_z does not.', hybrid: 'Three equivalent sp² hybrids.', set: 'Three sp² hybrids 120° apart in one plane, p_z square to it.', bh3: 'In BH₃ each sp² hybrid of boron overlaps a hydrogen 1s orbital.' },
});
bench('sim-sp3', 4, {
  dirs: [[0, 0, 1], [T3, 0, T1], [-Math.sqrt(2) / 3, Math.sqrt(6) / 3, T1], [-Math.sqrt(2) / 3, -Math.sqrt(6) / 3, T1]], arcs: [[0, 1, '109.5°']],
  eq: '1\\ s + 3\\ p \\;\\longrightarrow\\; 4\\ sp^3',
  head: { atomic: 'The s orbital and all three p orbitals mix.', hybrid: 'Four equivalent sp³ hybrids; no p orbital is left over.', set: 'The four sp³ hybrids point to the corners of a tetrahedron, 109.5° apart.' },
});

/* =====================================================================
   FIGURE 8.17: ethane. Each carbon has four sp³ hybrids; with the atoms
   apart (the book's a) nothing overlaps, and bonded (b) one C–C and six
   C–H overlaps make seven σ bonds. The slider turns the right-hand CH₃
   group about the C–C axis: the end-to-end overlap is the same at every
   angle. Still: a slider and a choice.
===================================================================== */
(function () {
  const { d, S, v, top, key } = frame('sim-ethane', { h: 560, dist: 9.2, tilt: 0.3, yaw: 0.3 });
  const g = v.part(0);
  const atoms = F.choice(d.controls, { label: '\\text{atoms}', aria: 'apart or bonded', options: [{ value: 'apart', label: 'apart' }, { value: 'bonded', label: 'bonded' }], value: 'bonded' });
  const phi = F.ctl(d.controls, { label: '\\varphi', cls: 'angle', min: 0, max: 120, step: 1, value: 60, unit: '°', dec: 0, detents: [0, 60, 120], aria: 'turn of the right-hand CH3 group about the C–C bond' });
  const L = 1.05;
  /* the three hybrids of a carbon that point away from the other carbon, turned by `turn` degrees about x */
  const outer = (sign, turn) => [90, 210, 330].map((a) => V.unit([sign / 3, T3 * Math.cos((a + turn) * RAD), T3 * Math.sin((a + turn) * RAD)]));
  let sig = '';
  function draw() {
    const k = atoms.mix((x) => (x === 'bonded' ? 1 : 0)), tw = phi.v;
    const tag = [k.toFixed(4), tw, palSig()].join('|');
    if (tag !== sig) {
      sig = tag; S.clear();
      const cx = 0.8 + 0.75 * (1 - k), hr = L * (1.05 + 0.6 * (1 - k));
      [[-1, 0], [1, tw]].forEach(([side, turn]) => {
        const c = [side * cx, 0, 0];
        nucleus(S, g, c, 'the nucleus of a carbon atom', 0.06);
        orbital(v, g, c, 0.5, V.mul([-side, 0, 0], Math.sqrt(0.75)), L, H_COL(), 'an sp³ hybrid orbital of carbon, toward the other carbon');
        outer(-side, turn).forEach((u) => {
          orbital(v, g, c, 0.5, V.mul(u, Math.sqrt(0.75)), L, H_COL(), 'an sp³ hybrid orbital of carbon, toward a hydrogen atom');
          hydrogen(S, g, V.add(c, V.mul(u, hr)), 0.38);
        });
      });
      F.mesh.polyline(g, [[-2.9, 0, 0], [2.9, 0, 0]], alpha(PAL.ink, 0.3));
      v.invalidate();
    }
    const bonded = atoms.value === 'bonded';
    headline(top, bonded ? `The right-hand CH₃ group turned ${Math.round(tw)}° about the C–C axis: the same seven σ bonds.` : 'Two carbon atoms, each with four sp³ hybrids, and six hydrogen atoms.');
    keyRow(key, [KEY.h('sp³ hybrid of C'), KEY.s('1s orbital of H')]);
    tex(d.readout, bonded ? '1\\ \\text{C–C} + 6\\ \\text{C–H} = 7\\ \\sigma\\ \\text{bonds}' : '2\\ \\text{C} \\times 4\\ sp^3 = 8\\ \\text{hybrid orbitals}');
  }
  still(d, draw);
})();

/* =====================================================================
   FIGURE 8.19 + 8.20: PCl₅ and SF₆ as ball-and-stick molecules and as the
   hybrid sets of their central atoms; each stick becomes the lobe that
   points along it as the outer atoms fade. Still: two choices.
===================================================================== */
(function () {
  const { d, S, v, top, key } = frame('sim-sp3d', { h: 560, dist: 8.2, tilt: 0.28, yaw: 0.42 });
  const g = v.part(0);
  const MOL = { pcl5: { n: 5, c: 'P', x: 'Cl', rc: 0.42, rx: 0.36, name: 'PCl<sub>5</sub>', cn: 'phosphorus', xn: 'chlorine' }, sf6: { n: 6, c: 'S', x: 'F', rc: 0.42, rx: 0.3, name: 'SF<sub>6</sub>', cn: 'sulfur', xn: 'fluorine' } };
  const mol = F.choice(d.controls, { label: '\\text{molecule}', aria: 'molecule', options: [{ value: 'pcl5', label: 'PCl<sub>5</sub>' }, { value: 'sf6', label: 'SF<sub>6</sub>' }], value: 'pcl5' });
  const how = F.choice(d.controls, { label: '\\text{drawn as}', aria: 'ball and stick or hybrid orbitals', options: [{ value: 'mol', label: 'ball and stick' }, { value: 'hyb', label: 'hybrid orbitals' }], value: 'mol' });
  const L = 1.35, R = 1.75;
  let sig = '';
  function one(key, a, h) {
    if (a < 0.01) return;
    const m = MOL[key];
    const c = sphere(g, [0, 0, 0], m.rc * (1 - h) + 0.06, h > 0.5 ? PAL.ink : F.el(m.c), { transparent: a < 1, opacity: a });
    v.pickable(c, h > 0.5 ? `the nucleus of the ${m.cn} atom` : `${m.cn} (${m.c})`);
    SITES[m.n].forEach((u) => {
      const b = a * (1 - h);
      if (b > 0.01) {
        stick(g, [0, 0, 0], V.mul(u, R), 0.07, F.el(m.c), { transparent: b < 1, opacity: b });
        v.pickable(sphere(g, V.mul(u, R), m.rx, F.el(m.x), { transparent: b < 1, opacity: b }), `${m.xn} (${m.x})`);
      }
      if (h > 0.01) orbital(v, g, [0, 0, 0], 0.5, V.mul(u, Math.sqrt(0.75)), L * (0.35 + 0.65 * h), H_COL(), `an ${HYB_U[m.n]} hybrid orbital of ${m.cn}`, { opacity: Math.min(1, a * h * 1.6) });
    });
  }
  function draw() {
    const h = how.mix((x) => (x === 'hyb' ? 1 : 0)), at = mol.k >= 1 && how.k >= 1, m = MOL[mol.value], hyb = how.value === 'hyb';
    const tag = [mol.a('pcl5').toFixed(4), h.toFixed(4), at, mol.value, palSig()].join('|');
    if (tag !== sig) {
      sig = tag; S.clear();
      one('pcl5', mol.a('pcl5'), h); one('sf6', mol.a('sf6'), h);
      if (at) ARCS[m.n].forEach(([i, j, t]) => angle3(S, g, SITES[m.n][i], SITES[m.n][j], hyb ? L * 1.12 : 0.95, t));
      v.invalidate();
    }
    const five = m.n === 5;
    headline(top, hyb
      ? `${WORDS[m.n]} ${HYB_U[m.n]} hybrids of ${m.cn}, a large lobe toward each corner of ${five ? 'a trigonal bipyramid' : 'an octahedron'}.`
      : `${m.name.replace('<sub>5</sub>', '₅').replace('<sub>6</sub>', '₆')}: ${WORDS[m.n].toLowerCase()} bonds to the corners of ${five ? 'a trigonal bipyramid' : 'an octahedron'}.`);
    keyRow(key, hyb ? [KEY.h(`${HYB_U[m.n]} hybrid of ${m.c}`)] : [KEY.atom(m.c, `${m.cn}`), KEY.atom(m.x, `${m.xn}`)]);
    tex(d.readout, five ? '1\\ s + 3\\ p + 1\\ d \\;\\longrightarrow\\; 5\\ sp^3d' : '1\\ s + 3\\ p + 2\\ d \\;\\longrightarrow\\; 6\\ sp^3d^2');
  }
  still(d, draw);
})();

/* =====================================================================
   FIGURE 8.21: the hybrid set for each number of regions of electron
   density, with the arrangement the book's middle column draws dashed
   through the lobes' tips. Still: a choice of two to six regions; the
   old set fades as the new one grows.
===================================================================== */
(function () {
  const { d, S, v, top, key } = frame('sim-hybrid-sets', { h: 560, dist: 7.6, tilt: 0.3, yaw: 0.42 });
  const g = v.part(0);
  const n = F.choice(d.controls, { label: '\\text{regions}', aria: 'number of regions of electron density', options: [2, 3, 4, 5, 6].map((i) => ({ value: String(i), label: String(i) })), value: '4' });
  const L = 1.25, TIP = L * 1.02;
  /* the edges of each arrangement: pairs of sites at its smallest angles (and the equatorial triangle of five) */
  function edges(i) {
    const s = SITES[i], out = [];
    if (i === 2) return [[0, 1]];
    for (let a = 0; a < s.length; a++) for (let b = a + 1; b < s.length; b++) { const th = V.angle(s[a], s[b]); if (th < 125) out.push([a, b]); }
    return out;
  }
  function dashed(p, q, col, a) {
    const N = Math.max(4, Math.round(V.len(V.sub(q, p)) / 0.16));
    for (let k = 0; k < N; k += 2) stick(g, V.lerp(p, q, k / N), V.lerp(p, q, Math.min(1, (k + 1) / N)), 0.012, col, { transparent: true, opacity: a });
  }
  let sig = '';
  function draw() {
    const i = +n.value, at = n.k >= 1;
    const tag = [n.from, i, n.k.toFixed(4), palSig()].join('|');
    if (tag !== sig) {
      sig = tag; S.clear();
      nucleus(S, g, [0, 0, 0], 'the nucleus');
      [2, 3, 4, 5, 6].forEach((j) => {
        const a = n.a(String(j)); if (a < 0.01) return;
        const nn = Math.min(j, 4);
        SITES[j].forEach((u) => { const [A, B] = hybridAB(nn, u); orbital(v, g, [0, 0, 0], A, B, L * (0.4 + 0.6 * a), H_COL(), `an ${HYB_U[j]} hybrid orbital`, { opacity: a < 1 ? a : 1 }); });
        const col = alpha(PAL.ink, 0.6);
        edges(j).forEach(([p, q]) => dashed(V.mul(SITES[j][p], TIP * (j === 2 ? 1.25 : 1)), V.mul(SITES[j][q], TIP * (j === 2 ? 1.25 : 1)), col, 0.7 * a));
      });
      if (at) ARCS[i].forEach(([a, b, t]) => angle3(S, g, SITES[i][a], SITES[i][b], L * 0.78, t, { perp: [0, 1, 0] }));
      v.invalidate();
    }
    headline(top, `${WORDS[i]} regions of electron density: ${HYB_U[i]} hybrids in a ${ARRANGE[i]} arrangement.`);
    keyRow(key, [KEY.h(`${HYB_U[i]} hybrid orbital`), { s: ARRANGE[i] + ' arrangement', dash: [6, 6], color: alpha(PAL.ink, 0.6), w: 2 }]);
    tex(d.readout, `${i}\\ \\text{regions} \\;\\longrightarrow\\; \\text{${ARRANGE[i]}} \\;\\longrightarrow\\; ${HYB_TEX[i]}`);
  }
  still(d, draw);
})();
};
