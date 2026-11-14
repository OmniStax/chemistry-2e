/* Figures for section 7.6 Molecular Structure and Polarity. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['7.6'] = function (root, F) {
const { el, fmt, tex, PAL, alpha, cycle, register, begin, line, text, topline } = F;
const sim = (id, H) => F.sim(root, id, H);
/* a still figure answers its controls, or a drag, and has no clock */
const still = (d, draw) => register(d.fig, { update: () => {}, draw });
const hued = (e, type) => { e.style.color = F.C(type); return e; };
const RAD = Math.PI / 180, TAU = 2 * Math.PI;
const clamp = (x, a, b) => Math.max(a, Math.min(b, x));

/* ---------- vectors ---------- */
const V = {
  add: (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]],
  sub: (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]],
  mul: (a, k) => [a[0] * k, a[1] * k, a[2] * k],
  dot: (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2],
  len: (a) => Math.hypot(a[0], a[1], a[2]),
  unit: (a) => { const l = Math.hypot(a[0], a[1], a[2]) || 1; return [a[0] / l, a[1] / l, a[2] / l]; },
  angle: (a, b) => Math.acos(Math.max(-1, Math.min(1, V.dot(V.unit(a), V.unit(b))))) / RAD,
};
/* a point on the great circle from unit a to unit b, t from 0 to 1 */
function slerp(a, b, t) {
  const w = Math.acos(Math.max(-1, Math.min(1, V.dot(a, b)))); if (w < 1e-6) return a;
  const s = Math.sin(w); return V.add(V.mul(a, Math.sin((1 - t) * w) / s), V.mul(b, Math.sin(t * w) / s));
}
/* a rotation of v by a degrees about the y axis */
const rotY = (v, a) => { const c = Math.cos(a * RAD), s = Math.sin(a * RAD); return [v[0] * c + v[2] * s, v[1], -v[0] * s + v[2] * c]; };
/* the perpendicular to u that leans up the page, or across it where u itself stands upright */
const upPerp = (u) => { const w = V.sub([0, 1, 0], V.mul(u, u[1])); return V.len(w) > 0.2 ? V.unit(w) : V.unit(V.sub([1, 0, 0], V.mul(u, u[0]))); };

/* ---------- atoms: the element palette, the radii and the names ---------- */
const RADIUS = { H: 0.24, C: 0.39, N: 0.39, O: 0.39, F: 0.34, Cl: 0.44, S: 0.44, B: 0.39, P: 0.44, Xe: 0.5, E: 0.36, X: 0.27 };
const rOf = (sym) => RADIUS[sym] ?? 0.39;
const NAMES = { H: 'hydrogen', C: 'carbon', N: 'nitrogen', O: 'oxygen', F: 'fluorine', Cl: 'chlorine', S: 'sulfur', B: 'boron', P: 'phosphorus', Xe: 'xenon', E: 'central atom E', X: 'bonded atom X' };
const nameOf = (sym) => NAMES[sym] ?? sym;
const hex = (c) => [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16));
const blend = (a, b, k) => { const A = hex(a), B = hex(b); return '#' + A.map((x, i) => Math.round(x + (B[i] - x) * k).toString(16).padStart(2, '0')).join(''); };
/* a generic E or X is no element: two greys of the panel, the central atom the darker */
const atomColor = (sym) => (sym === 'E' ? blend(PAL.ink, PAL.panel, 0.45) : sym === 'X' ? blend(PAL.ink, PAL.panel, 0.78) : F.el(sym));
/* everything a scene's colours are read from, so a theme or a colour switch rebuilds it */
const palSig = () => [PAL.ink, PAL.panel, PAL.muted, F.C('angle'), F.C('dipole-moment'), F.el('C'), F.el('H'), F.el('O'), F.el('F')].join('|');
/* an atom on the flat canvas: a disc in its element colour, for a key or a flat drawing */
function atom(ctx, x, y, sym, r) {
  ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, TAU);
  ctx.fillStyle = atomColor(sym); ctx.fill();
  ctx.lineWidth = 1.5; ctx.strokeStyle = alpha(PAL.ink, sym === 'H' ? 0.8 : 0.45); ctx.stroke(); ctx.restore();
}
/* key entries: an atom by its name, and a lone pair as the lobe the scenes draw */
const keyAtom = (sym) => ({ s: nameOf(sym), draw: (c, x, y) => atom(c, x, y, sym, sym === 'H' || sym === 'X' ? 8 : 11) });
const KEY_LONE = { s: 'lone pair', draw: (c, x, y) => { c.save(); c.fillStyle = alpha(PAL.ink, 0.45); c.beginPath(); c.ellipse(x, y, 16, 9, 0, 0, TAU); c.fill(); c.restore(); } };
const keyRow = (c, H, entries) => F.legend(c, { l: 60, r: 1340, t: 0, b: H }, entries, { corner: 'top', row: true, panel: false, size: 20 });

/* ---------- the ideal sites of the five electron-pair geometries, as unit directions ---------- */
const T3 = Math.sqrt(8 / 9), T1 = -1 / 3;
const SITES = {
  2: [[1, 0, 0], [-1, 0, 0]],
  3: [[0, 1, 0], [Math.cos(210 * RAD), Math.sin(210 * RAD), 0], [Math.cos(330 * RAD), Math.sin(330 * RAD), 0]],
  4: [[0, 1, 0], [T3, T1, 0], rotY([T3, T1, 0], 120), rotY([T3, T1, 0], 240)],
  5: [[0, 1, 0], [0, -1, 0], [1, 0, 0], rotY([1, 0, 0], 120), rotY([1, 0, 0], 240)],
  6: [[0, 1, 0], [0, -1, 0], [1, 0, 0], [-1, 0, 0], [0, 0, 1], [0, 0, -1]],
};
/* which sites the lone pairs take: equatorial in a trigonal bipyramid, opposite one another in an octahedron */
const LONE_AT = { 2: [[]], 3: [[], [0]], 4: [[], [0], [0, 1]], 5: [[], [2], [2, 3], [2, 3, 4]], 6: [[], [0], [0, 1], [0, 1, 2], [0, 1, 2, 3]] };
const MAX_LONE = { 2: 0, 3: 1, 4: 2, 5: 3, 6: 4 };
const GEOM = { 2: 'linear', 3: 'trigonal planar', 4: 'tetrahedral', 5: 'trigonal bipyramidal', 6: 'octahedral' };
const STRUCT = { 2: ['linear'], 3: ['trigonal planar', 'bent'], 4: ['tetrahedral', 'trigonal pyramidal', 'bent'], 5: ['trigonal bipyramidal', 'seesaw', 'T-shaped', 'linear'], 6: ['octahedral', 'square pyramidal', 'square planar', 'T-shaped', 'linear'] };
const IDEAL = { 2: '180°', 3: '120°', 4: '109.5°', 5: '90° and 120°', 6: '90° and 180°' };
/* the molecules the text itself gives for a case, where it gives one */
const EXAMPLE = { 2: ['BeF₂'], 3: ['BCl₃', ''], 4: ['CH₄', 'NH₃', 'H₂O'], 5: ['PF₅', 'SF₄', 'ClF₃', ''], 6: ['SF₆', '', 'XeF₄', '', ''] };
const COUNT = ['no', 'one', 'two', 'three', 'four', 'five', 'six'];
const Cap = (s) => s[0].toUpperCase() + s.slice(1);
/* A lone pair takes more room than a bond (the book's size order), so each bond leans a little away from the lone pairs:
   the drawing closes the angles between bonds by two or three degrees, as Figure 7.19 marks with its "<" signs. Lone pairs
   set opposite one another push equally from both sides and leave the bonds where they were. */
const squeeze = (dirs, lone, k = 0.04) => { const s = lone.reduce((a, i) => V.add(a, dirs[i]), [0, 0, 0]); return dirs.map((u, i) => (lone.includes(i) ? u : V.unit(V.sub(u, V.mul(s, k))))); };
/* the angles worth marking among the bonds: one arc for each ideal angle the bonded sites make with one another, written
   as Figure 7.19 writes it, "<" where the lone pairs have closed it; a 180° is marked only where it is the only angle */
function bondArcs(ideal, shown, lone, n) {
  const bonds = ideal.map((_, i) => i).filter((i) => !lone.includes(i)), seen = new Map();
  for (let a = 0; a < bonds.length; a++) for (let b = a + 1; b < bonds.length; b++) {
    const i = bonds[a], j = bonds[b], th = V.angle(ideal[i], ideal[j]), cls = [90, 109.5, 120, 180].find((x) => Math.abs(x - th) < 1);
    if (cls && !seen.has(cls)) seen.set(cls, [i, j]);
  }
  if (seen.size > 1) seen.delete(180);
  return [...seen].sort((a, b) => a[0] - b[0]).map(([cls, [i, j]]) => {
    const less = V.angle(shown[i], shown[j]) < cls - 0.3;
    return { i, j, label: (less ? (n === 4 && lone.length === 2 ? '<<' : '<') : '') + cls + '°' };
  });
}

/* ---------- three dimensions ----------
   Every scene is an F.view3d stage the reader turns by dragging; it turns slowly by itself until taken hold of, since
   a tetrahedron reads as a solid only once it moves (root rule 26.2), and carries no other button. Nothing is written
   on an atom: the elements are named in a key under the scene and under the pointer, and a number or a name that
   belongs to one place in the scene stands outside it, set after every frame on the line from the molecule's centre
   through that place. */
const { vec, sphere, stick, setStick, setLobe, lobe: lobe3, bond: bond3, arrow: arrow3, polyline } = F.mesh;
function stage3(d, o) {
  const outs = [], unders = [];
  let v = null;
  function place() {
    if (!v || !v.wrap || !v.wrap.clientHeight) return;
    const w = v.wrap.clientWidth, h = v.wrap.clientHeight, u = h / (2 * Math.tan(15 * RAD) * o.dist / (v.at.zoom || 1));
    outs.forEach((l) => {
      const p = typeof l.p === 'function' ? l.p() : l.p;
      if (!p) { l.el.style.visibility = 'hidden'; return; }
      l.el.style.visibility = '';
      const q = v.project(p, l.g), c = v.project(l.c, l.g);
      let dx = q[0] - c[0], dy = q[1] - c[1]; const n = Math.hypot(dx, dy);
      if (n < 6) { dx = 0; dy = -1; } else { dx /= n; dy /= n; }
      const bw = l.el.offsetWidth / 2, bh = l.el.offsetHeight / 2, push = l.r * u + l.gap + Math.abs(dx) * bw + Math.abs(dy) * bh;
      l.el.style.left = clamp(q[0] + dx * push, bw + 2, w - bw - 2) + 'px';
      l.el.style.top = clamp(q[1] + dy * push, bh + 2, h - bh - 2) + 'px';
    });
    unders.forEach((l) => { const c = v.project([0, 0, 0], l.g); l.el.style.left = clamp(c[0], l.el.offsetWidth / 2 + 2, w - l.el.offsetWidth / 2 - 2) + 'px'; l.el.style.top = (h - l.el.offsetHeight / 2 - 6) + 'px'; });
  }
  v = F.view3d(d.stage, { h: o.h, dist: o.dist, tilt: o.tilt, spin: o.spin ?? 'idle', onRender: () => { place(); o.onRender?.(); } });
  return {
    v,
    /* a label outside the thing at p: clear of a ball of radius r there, on the side away from the centre c of its part */
    out(s, p, g, { r = 0, gap = 6, c = [0, 0, 0] } = {}) { const e = v.label(s, [0, 0, 0], g, 0, 'bare'); outs.push({ el: e, p, g, r, gap, c }); return e; },
    /* a line of words under a part, at the stage's foot, whichever way the part is turned */
    under(s, g) { const e = v.label(s, [0, 0, 0], g, 0, 'bare'); unders.push({ el: e, g }); return e; },
    clear() { v.clear(); outs.length = 0; unders.length = 0; },
  };
}
/* an atom as a ball in its element colour, named under the pointer */
function ball(S, g, p, sym, extra) { const m = sphere(g, p, rOf(sym), atomColor(sym), extra); S.v.pickable(m, nameOf(sym) + (sym === 'E' || sym === 'X' ? '' : ' atom')); return m; }
/* the arc of an angle as a thin tube, so it keeps its weight on a large stage; returns its midpoint */
function arcTube(g, a, b, R, color, n = 14) {
  const ua = V.unit(a), ub = V.unit(b), pts = [];
  for (let i = 0; i <= n; i++) pts.push(V.mul(slerp(ua, ub, i / n), R));
  for (let i = 0; i < n; i++) stick(g, pts[i], pts[i + 1], 0.016, color);
  return V.mul(V.unit(V.add(ua, ub)), R);
}
const weak = (s) => `<span style="font-weight:400">${s}</span>`;

/* =====================================================================
   FIGURE 7.16 + 7.19 + 7.20: the VSEPR bench. A central atom E with its
   regions of electron density in three dimensions: bonds ending in atoms
   X, lone pairs as lobes, the angles between the bonds marked as Figure
   7.19 marks them, the axial and equatorial positions named at five
   regions, and the two names in the headline. Still: a change of the
   regions, the lone pairs or the placement of ClF3's two lone pairs is
   one morph, each region swinging along its great circle to its new
   place and a bond becoming a lobe as its atom fades.
===================================================================== */
(function () {
  const d = sim('sim-vsepr');
  const top = F.makeCanvas(d.stage, 104);
  const S = stage3(d, { h: 640, dist: 7.1 }), v = S.v, g = v.part(0);
  const key = F.makeCanvas(d.stage, 60);
  v.setView(0.45, 0.24);
  const nums = (a, b) => { const o = []; for (let i = a; i <= b; i++) o.push({ value: String(i), label: String(i) }); return o; };
  const N = F.choice(d.controls, { label: '\\text{regions}', options: nums(2, 6), value: '4', aria: 'regions of electron density around the central atom', ms: 0, onInput: () => { LP.options(nums(0, MAX_LONE[+N.value]), String(MAX_LONE[+N.value])); shift(); } });
  const LP = F.choice(d.controls, { label: '\\text{lone pairs}', key: 'lone', options: nums(0, 2), value: '1', aria: 'how many of the regions are lone pairs', ms: 0, onInput: () => shift() });
  /* Figure 7.20: the three ways two lone pairs could sit in a trigonal bipyramid. Only that case has the choice, so the
     control stands there only then (rule 24.6) */
  const CLF = {
    eq: { label: 'both equatorial', at: [2, 3], why: 'This is what ClF₃ does. In an equatorial position a lone pair has two neighbors at 90° and two at 120°; in an axial position it would have three at 90°.' },
    one: { label: 'one axial, one equatorial', at: [0, 2], why: 'The axial lone pair has three neighbors at 90° where an equatorial one has two, so this arrangement is less stable and ClF₃ does not take it.' },
    both: { label: 'both axial', at: [0, 1], why: 'Each lone pair now has three neighbors at 90°. This is the most crowded of the three arrangements, and ClF₃ does not take it.' },
  };
  const PL = F.select(d.controls, { label: '\\text{lone pairs sit}', key: 'place', options: Object.keys(CLF).map((k) => ({ value: k, label: CLF[k].label })), value: 'eq', aria: 'where the two lone pairs sit in the trigonal bipyramid', ms: 0, onInput: () => shift() });
  const PLBOX = d.controls.lastElementChild;
  const { formula: fx, note } = F.readout(d);
  const L = 1.4;

  /* a state of the bench: its regions as directions, each a bond (w 0) or a lone pair (w 1), and its names */
  function state(n, lone, place) {
    const clf = n === 5 && lone === 2, at = clf ? CLF[place].at : LONE_AT[n][lone], shown = squeeze(SITES[n], at);
    return { n, lone, place: clf ? place : 'eq', clf, at, ideal: SITES[n], regions: shown.map((s, i) => ({ dir: s, w: at.includes(i) ? 1 : 0 })), struct: clf && place !== 'eq' ? '' : STRUCT[n][lone] };
  }
  /* regions of two states paired by direction, nearest first; a region without a partner grows from or shrinks into E */
  function pair(a, b) {
    const pairs = [], ua = new Set(a.regions.keys()), ub = new Set(b.regions.keys()), all = [];
    a.regions.forEach((r, i) => b.regions.forEach((s, j) => all.push([V.dot(r.dir, s.dir), i, j])));
    all.sort((x, y) => y[0] - x[0]).forEach(([, i, j]) => { if (ua.has(i) && ub.has(j)) { ua.delete(i); ub.delete(j); pairs.push([a.regions[i], b.regions[j]]); } });
    ua.forEach((i) => pairs.push([a.regions[i], null])); ub.forEach((j) => pairs.push([null, b.regions[j]]));
    return pairs;
  }
  /* the regions part way from a to b: a direction swings along its great circle, a bond becoming a lone pair loses
     its atom as its lobe fills, and a region with no partner grows or shrinks */
  function between(a, b, q) {
    return pair(a, b).map(([r, s]) => {
      if (!s) return { dir: r.dir, w: r.w, p: 1 - q };
      if (!r) return { dir: s.dir, w: s.w, p: q };
      return { dir: V.dot(r.dir, s.dir) > -0.999 ? slerp(r.dir, s.dir, q) : s.dir, w: r.w + (s.w - r.w) * q, p: 1 };
    });
  }
  let from = state(+N.value, +LP.value, 'eq'), to = from, sig = '';
  const mt = F.tween(d, 1);
  function shift() {
    const next = state(+N.value, +LP.value, PL.value);
    if (next.n === to.n && next.lone === to.lone && next.place === to.place) return;
    from = mt.v >= 1 ? to : snapshot(); to = next; mt.set(0); mt.to(1, 900);
  }
  /* a morph interrupted part way starts the next one from where it stood */
  function snapshot() {
    const q = mt.v, s = q < 0.5 ? from : to;
    return { ...s, regions: between(from, to, q).filter((r) => r.p > 0.5).map((r) => ({ dir: r.dir, w: r.w > 0.5 ? 1 : 0 })) };
  }
  function headlineOf(t) {
    const lone = t.lone, lp = lone === 0 ? 'none of them a lone pair' : lone === 1 ? 'one of them a lone pair' : COUNT[lone] + ' of them lone pairs';
    const open = Cap(COUNT[t.n]) + ' regions of electron density, ' + lp;
    if (t.clf && t.place !== 'eq') return open + ', with ' + (t.place === 'one' ? 'one lone pair moved to an axial position' : 'both lone pairs moved to axial positions') + ': an arrangement ClF₃ does not take.';
    const ex = EXAMPLE[t.n][lone], as = ex ? ', as in ' + ex : '';
    return GEOM[t.n] === t.struct ? open + ': the electron-pair geometry and the molecular structure are both ' + t.struct + as + '.'
      : open + ': the electron-pair geometry is ' + GEOM[t.n] + ' and the molecular structure is ' + t.struct + as + '.';
  }
  function draw() {
    const q = Math.max(0, Math.min(1, mt.v)), t = to;
    PLBOX.style.display = t.clf ? '' : 'none';
    const s = [t.n, t.lone, t.place, q.toFixed(3), palSig()].join('|');
    if (s !== sig) {
      sig = s; S.clear();
      ball(S, g, [0, 0, 0], 'E');
      between(from, to, q).forEach((r) => {
        const len = L * r.p, tip = V.mul(r.dir, len), bond = 1 - r.w;
        if (bond > 0.01 && len > 0.01) stick(g, [0, 0, 0], V.mul(r.dir, len * (0.25 + 0.75 * bond)), 0.06, PAL.ink, bond < 1 ? { transparent: true, opacity: bond } : undefined);
        if (bond > 0.01) { const m = ball(S, g, tip, 'X', bond < 1 ? { transparent: true, opacity: bond } : undefined); m.scale.setScalar(rOf('X') * Math.min(1, r.p * 1.4)); }
        if (r.w > 0.01) { const lb = lobe3(g, [0, 0, 0], r.dir, len * 0.8 * (0.35 + 0.65 * r.w)); lb.material.opacity = 0.5 * r.w; v.pickable(lb, 'lone pair'); }
      });
      /* at rest: the angles between the bonds, and at five regions the two kinds of position */
      if (q >= 1) {
        const dirs = t.regions.map((r) => r.dir), cA = F.C('angle');
        bondArcs(t.ideal, dirs, t.at, t.n).forEach(({ i, j, label }) => hued(S.out(label, arcTube(g, dirs[i], dirs[j], L * 0.52, cA), g, { gap: 5 }), 'angle'));
        if (t.n === 5) [['axial', 0], ['equatorial', t.regions.findIndex((r, i) => i > 1 && r.w < 0.5) > 0 ? t.regions.findIndex((r, i) => i > 1 && r.w < 0.5) : 2]].forEach(([name, i]) => {
          const lonePair = t.regions[i].w > 0.5;
          S.out(weak(name), V.mul(dirs[i], lonePair ? L * 0.93 : L), g, { r: lonePair ? 0 : rOf('X'), gap: 6 });
        });
      }
      v.invalidate();
    }
    const { ctx } = begin(top);
    topline(ctx, headlineOf(t));
    const k = begin(key);
    keyRow(k.ctx, 60, [keyAtom('E'), keyAtom('X'), KEY_LONE]);
    const lone = t.lone, bonds = t.n - lone;
    F.morph(fx, `\\mk{n}{${t.n}\\ \\text{regions}} = \\mk{b}{${bonds}\\ \\text{bond${bonds === 1 ? '' : 's'}}}` + (lone ? ` + \\mk{lp}{${lone}\\ \\text{lone pair${lone === 1 ? '' : 's'}}}` : ''));
    const ideal = 'Ideal angle' + (t.n > 4 ? 's ' : ' ') + IDEAL[t.n] + '. ';
    note.textContent = ideal + (t.clf ? CLF[t.place].why
      : lone === 0 ? ''
      : t.n === 5 ? 'A lone pair takes an equatorial position, where it has two neighbors at 90° and not three.'
      : t.n === 6 && (lone === 2 || lone === 4) ? 'Lone pairs sit opposite one another, so the bonds between them keep their ideal angle.'
      : 'A lone pair takes more room than a bond, so the angle between the bonds is a little smaller.');
  }
  still(d, draw);
})();

/* =====================================================================
   SIM: the regions of electron density finding their places. Points on
   a sphere about the central atom repel one another and settle into the
   arrangement that keeps them farthest apart; a lone pair pushes harder.
   Moving: the regions travel and the smallest angle grows as a clock
   runs, and the run is finite, so it has the transport and its scrubber.
===================================================================== */
(function () {
  const d = sim('sim-domains');
  const S = stage3(d, { h: 560, dist: 6.5 }), v = S.v, g = v.part(0);
  const c2 = F.makeCanvas(d.stage, 390);
  v.setView(0.4, 0.3);
  const nums = (a, b) => { const o = []; for (let i = a; i <= b; i++) o.push({ value: String(i), label: String(i) }); return o; };
  /* A repulsion alone puts a lone pair in the right place only at three and four regions, where every site is alike;
     at five and six it cannot tell an axial site from an equatorial one, so the choice stands there only for three and four */
  const maxLone = (n) => (n === 3 ? 1 : n === 4 ? 2 : 0);
  const N = F.choice(d.controls, { label: '\\text{regions}', options: nums(2, 6), value: '4', aria: 'regions of electron density around the central atom', ms: 0, onInput: () => { fit(); reset(); } });
  const LP = F.choice(d.controls, { label: '\\text{lone pairs}', key: 'lone', options: nums(0, 2), value: '0', aria: 'how many of the regions are lone pairs', ms: 0, onInput: reset });
  const LPBOX = d.controls.lastElementChild;
  function fit() { const m = maxLone(+N.value); LP.options(nums(0, m), String(m)); LPBOX.style.display = m ? '' : 'none'; }
  const T = 5, cy = cycle(() => T, 1.4), L = 1.4;
  /* a seeded generator, so that a run starts the same way every time and the scrubber can replay it */
  function rng(seed) { let s = seed >>> 0; return () => { s += 0x6D2B79F5; let z = s; z = Math.imul(z ^ (z >>> 15), z | 1); z ^= z + Math.imul(z ^ (z >>> 7), z | 61); return ((z ^ (z >>> 14)) >>> 0) / 4294967296; }; }
  let st = null, sig = '';   /* st: {p: unit positions, v: velocities, q: charges, tau: model time reached, trace: [[tau, angle]], meshes} */
  function init() {
    const n = +N.value, lone = Math.min(+LP.value, maxLone(n)), r = rng(97 + n * 31 + lone * 7);
    const p = [], vel = [], q = [];
    for (let i = 0; i < n; i++) {   /* scattered over one side of the sphere, so they have somewhere to go */
      const a = r() * TAU, b = (0.15 + 0.5 * r()) * Math.PI;
      p.push([Math.sin(b) * Math.cos(a), Math.cos(b), Math.sin(b) * Math.sin(a)]); vel.push([0, 0, 0]); q.push(i < lone ? 1.35 : 1);
    }
    st = { p, v: vel, q, tau: 0, trace: [], lone }; sig = '';
  }
  function reset() { cy.reset(); st = null; }
  const smallest = (p) => { let m = [0, 1, 180]; for (let i = 0; i < p.length; i++) for (let j = i + 1; j < p.length; j++) { const a = V.angle(p[i], p[j]); if (a < m[2]) m = [i, j, a]; } return m; };
  /* advance the regions to model time tau with fixed steps: a repulsion along the sphere, damped */
  function advance(tau) {
    if (!st || tau < st.tau) init();
    const h = 1 / 120, n = st.p.length;
    while (st.tau + h <= tau + 1e-9) {
      const f = st.p.map(() => [0, 0, 0]);
      for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) {
        const dvec = V.sub(st.p[i], st.p[j]), r = Math.max(0.08, V.len(dvec)), k = (st.q[i] * st.q[j]) / (r * r * r);
        f[i] = V.add(f[i], V.mul(dvec, k)); f[j] = V.sub(f[j], V.mul(dvec, k));
      }
      for (let i = 0; i < n; i++) {
        const tan = V.sub(f[i], V.mul(st.p[i], V.dot(f[i], st.p[i])));
        st.v[i] = V.add(V.mul(st.v[i], 1 - 8 * h), V.mul(tan, 24 * h));
        st.p[i] = V.unit(V.add(st.p[i], V.mul(st.v[i], h)));
      }
      st.tau += h;
      if (st.trace.length === 0 || st.tau - st.trace[st.trace.length - 1][0] > 0.04) st.trace.push([st.tau, smallest(st.p)[2]]);
    }
    if (st.trace.length === 0) st.trace.push([0, smallest(st.p)[2]]);
  }
  /* the scene is built once per run and its regions moved every frame */
  const ARC = 12;
  function build() {
    S.clear();
    ball(S, g, [0, 0, 0], 'E');
    st.meshes = st.p.map((u, i) => (st.q[i] > 1 ? { lobe: v.pickable(lobe3(g, [0, 0, 0], u, L * 0.8), 'lone pair') } : { atom: ball(S, g, V.mul(u, L), 'X'), bond: stick(g, [0, 0, 0], V.mul(u, L), 0.06, PAL.ink) }));
    st.arc = []; for (let i = 0; i < ARC; i++) st.arc.push(stick(g, [0, 0, 0], [0, 0.01, 0], 0.016, F.C('angle')));
    st.mid = [0, 1, 0];
    st.lab = hued(S.out('', () => st && st.mid, g, { gap: 5 }), 'angle');
  }
  function draw() {
    const { ctx } = begin(c2);
    const n = +N.value;
    const tau = cy.now(); advance(tau);
    const lone = st.lone, s = palSig(); if (s !== sig) { sig = s; build(); }
    st.p.forEach((u, i) => { const m = st.meshes[i]; if (m.lobe) setLobe(m.lobe, [0, 0, 0], u, L * 0.8); else { m.atom.position.copy(vec(V.mul(u, L))); setStick(m.bond, [0, 0, 0], V.mul(u, L)); } });
    /* the smallest angle, marked between the two regions that make it */
    const best = smallest(st.p), ang = best[2], a = st.p[best[0]], b = st.p[best[1]], R = L * 0.5;
    const settled = tau >= T - 1e-9 || (tau > 1.5 && st.v.every((w) => V.len(w) < 0.02));
    for (let i = 0; i < ARC; i++) setStick(st.arc[i], V.mul(slerp(a, b, i / ARC), R), V.mul(slerp(a, b, (i + 1) / ARC), R));
    st.mid = V.mul(V.unit(V.add(a, b)), R);
    st.lab.textContent = fmt(ang, 0) + '°';
    v.invalidate();
    /* the smallest angle against time, on a fixed frame: 0 to 180°, 0 to 5 s */
    const box = { l: 520, r: 1300, t: 150, b: 310 };
    const cA = F.C('angle');
    const { X, Y } = F.axes(ctx, box, [0, T], [0, 180], { xl: 'time (s)', xc: F.C('time'), yl: 'smallest angle between two regions', yc: cA, nx: 5, ny: 3, fy: (q) => fmt(q, 0) + '°' });
    ctx.save(); ctx.strokeStyle = cA; ctx.lineWidth = 4; ctx.beginPath(); st.trace.forEach(([tt, an], i) => { if (i) ctx.lineTo(X(tt), Y(an)); else ctx.moveTo(X(tt), Y(an)); }); ctx.stroke(); ctx.restore();
    F.dot(ctx, X(Math.min(tau, T)), Y(ang), cA, true, 8);
    const ideal = { 2: 180, 3: 120, 4: 109.5, 5: 90, 6: 90 }[n];
    line(ctx, box.l, Y(ideal), box.r, Y(ideal), alpha(PAL.ink, 0.4), 2, [10, 10]);
    text(ctx, 'ideal ' + ideal + '°', box.r - 6, Y(ideal) + (lone ? -16 : 18), PAL.muted, { size: 17, align: 'right' });
    F.legend(ctx, { l: 60, r: 400, t: 150, b: 310 }, [keyAtom('E'), keyAtom('X')].concat(lone ? [KEY_LONE] : []), { corner: 'tl', panel: false, size: 20 });
    const bondsLeft = n - lone;
    topline(ctx, !settled ? 'The ' + COUNT[n] + ' regions are pushing one another apart, and the smallest angle between two of them has grown to ' + fmt(ang, 0) + '°.'
      : lone ? 'The lone pair' + (lone > 1 ? 's push' : ' pushes') + ' harder than a bond, so the ' + COUNT[bondsLeft] + ' bonds settle ' + fmt(ang, 0) + '° apart, less than the ideal ' + ideal + '°.'
      : 'The ' + COUNT[n] + ' regions have settled into a ' + GEOM[n] + ' arrangement, the nearest of them ' + fmt(ang, 0) + '° apart.');
    tex(d.readout, `\\htmlClass{kv-angle}{\\text{smallest angle}} = ${fmt(ang, 1)}^\\circ`);
  }
  fit();
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();

/* =====================================================================
   FIGURE 7.17: methane as a model the reader turns, and beneath it the
   wedge and dash drawing of the model as it now stands. A bond lying
   near the plane of the page is a line, one coming toward the reader a
   wedge, one going away a row of dashes; as the model turns the drawing
   is made again, so each bond changes its notation as it swings forward
   or back. Still: it answers the turn and has no clock of its own.
===================================================================== */
(function () {
  const d = sim('fig-methane');
  let counts = '';
  const S = stage3(d, { h: 500, dist: 5.3, onRender: () => draw2d() }), v = S.v, g = v.part(0);
  const c2 = F.makeCanvas(d.stage, 360);
  /* the book's view: one bond straight up and one down to the left, both near the page; one toward the reader; one away */
  v.setView(-0.17, 0.21);
  const HS = [[0, 1, 0], [-0.943, -0.333, 0], [0.471, -0.333, 0.816], [0.471, -0.333, -0.816]];
  const NEAR = 0.28;   /* a bond whose depth is under this share of its length counts as lying in the page */
  let sig = '';
  function build() {
    const s = palSig(); if (s === sig) return; sig = s;
    S.clear();
    ball(S, g, [0, 0, 0], 'C');
    HS.forEach((h) => { bond3(g, [0, 0, 0], h, 1, 0.07); ball(S, g, h, 'H'); });
  }
  const sampleLine = (c, x, y) => line(c, x - 18, y, x + 18, y, PAL.ink, 3.5);
  function wedge(c, x1, y1, x2, y2, w = 9) {
    const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy) || 1, px = -dy / len * w, py = dx / len * w;
    c.save(); c.fillStyle = PAL.ink; c.beginPath(); c.moveTo(x1, y1); c.lineTo(x2 + px, y2 + py); c.lineTo(x2 - px, y2 - py); c.closePath(); c.fill(); c.restore();
  }
  function dashes(c, x1, y1, x2, y2, w = 9, n = 7) {
    const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy) || 1, px = -dy / len, py = dx / len;
    c.save(); c.strokeStyle = PAL.ink; c.lineWidth = 3; c.lineCap = 'butt';
    for (let i = 1; i <= n; i++) { const t = i / (n + 0.5), ww = 1.5 + (w - 1.5) * t, x = x1 + dx * t, y = y1 + dy * t; c.beginPath(); c.moveTo(x + px * ww, y + py * ww); c.lineTo(x - px * ww, y - py * ww); c.stroke(); }
    c.restore();
  }
  function draw2d() {
    const { ctx } = begin(c2);
    const cx = 430, cyy = 175, K = 150;
    /* each hydrogen where the model now has it: across, up, and toward the reader */
    const at = HS.map((h) => { const w = vec(h); g.localToWorld(w); return [w.x, w.y, w.z]; });
    const kind = (p) => (Math.abs(p[2]) < NEAR ? 'line' : p[2] > 0 ? 'wedge' : 'dash');
    const order = at.map((p, i) => i).sort((i, j) => at[i][2] - at[j][2]);
    order.forEach((i) => {
      const p = at[i], x2 = cx + p[0] * K, y2 = cyy - p[1] * K, len = Math.hypot(x2 - cx, y2 - cyy);
      if (len > 46) {
        const ux = (x2 - cx) / len, uy = (y2 - cyy) / len, ax = cx + ux * 21, ay = cyy + uy * 21, bx = x2 - ux * 19, by = y2 - uy * 19, k = kind(p);
        if (k === 'line') line(ctx, ax, ay, bx, by, PAL.ink, 3.5); else if (k === 'wedge') wedge(ctx, ax, ay, bx, by); else dashes(ctx, ax, ay, bx, by);
      }
      text(ctx, 'H', x2, y2 + 1, PAL.ink, { size: 30, align: 'center', bg: PAL.panel });
    });
    text(ctx, 'C', cx, cyy + 1, PAL.ink, { size: 30, align: 'center' });
    text(ctx, 'the model above, in wedge and dash notation', cx, 342, PAL.muted, { size: 19, align: 'center' });
    F.legend(ctx, { l: 760, r: 1340, t: 70, b: 310 }, [
      keyAtom('C'), keyAtom('H'),
      { s: 'bond in the plane of the page', draw: sampleLine },
      { s: 'bond coming toward you', draw: (c, x, y) => wedge(c, x - 18, y, x + 18, y, 7) },
      { s: 'bond going away from you', draw: (c, x, y) => dashes(c, x - 18, y, x + 18, y, 7, 5) },
    ], { corner: 'tl', panel: false, size: 22 });
    const n = { line: 0, wedge: 0, dash: 0 }; at.forEach((p) => { n[kind(p)] += 1; });
    const now = [n.line, n.wedge, n.dash].join(',');
    if (now !== counts) { counts = now; tex(d.readout, `4\\ \\text{bonds} = ${n.line}\\ \\text{in the plane} + ${n.wedge}\\ \\text{toward you} + ${n.dash}\\ \\text{away from you}`); }
  }
  still(d, () => { build(); draw2d(); v.invalidate(); });
})();

/* =====================================================================
   FIGURES 7.18, 7.23, 7.24 and 7.25: ammonia, water, SF4 and XeF4, each
   as two models that turn together. On the left the regions of electron
   density about the central atom, bonds as sticks and lone pairs as
   lobes, with the solid their ends mark out: the electron-pair geometry.
   On the right the atoms alone: the molecular structure. Still.
===================================================================== */
function geometryPair(id, m) {
  const d = sim(id);
  const S = stage3(d, { h: 560, dist: m.dist ?? 6.6 }), v = S.v, gA = v.part(-2.25), gB = v.part(2.25);
  const key = F.makeCanvas(d.stage, 60);
  v.setView(m.yaw ?? 0.5, m.pitch ?? 0.26);
  let sig = '';
  function build() {
    const s = palSig(); if (s === sig) return; sig = s;
    S.clear();
    const P = m.dirs.map((u) => V.mul(u, m.L));
    /* left: every region, and the edges of the solid whose corners they point to */
    ball(S, gA, [0, 0, 0], m.c);
    m.dirs.forEach((u, i) => {
      if (m.lone.includes(i)) v.pickable(lobe3(gA, [0, 0, 0], u, m.L * 0.86), 'lone pair');
      else { v.pickable(stick(gA, [0, 0, 0], P[i], 0.06, PAL.ink), `bond to ${nameOf(m.x)}`); sphere(gA, P[i], 0.06, PAL.ink); }
    });
    for (let i = 0; i < P.length; i++) for (let j = i + 1; j < P.length; j++) if (V.angle(m.dirs[i], m.dirs[j]) < 150) polyline(gA, [P[i], P[j]], PAL.muted);
    S.under(weak('electron-pair geometry: ') + m.geom, gA);
    /* right: the atoms and their bonds, with the angle the text gives */
    ball(S, gB, [0, 0, 0], m.c);
    m.dirs.forEach((u, i) => { if (m.lone.includes(i)) return; bond3(gB, [0, 0, 0], P[i], 1, 0.07); ball(S, gB, P[i], m.x); });
    if (m.arc) hued(S.out(m.arc[2], arcTube(gB, m.dirs[m.arc[0]], m.dirs[m.arc[1]], m.L * 0.5, F.C('angle')), gB, { gap: 5 }), 'angle');
    S.under(weak('molecular structure: ') + m.struct, gB);
  }
  function draw() {
    build(); v.invalidate();
    const { ctx } = begin(key);
    keyRow(ctx, 60, [keyAtom(m.c), keyAtom(m.x), KEY_LONE]);
    const n = m.dirs.length, lone = m.lone.length, bonds = n - lone;
    tex(d.readout, `${m.formula}\\text{: }${n}\\ \\text{regions} = ${bonds}\\ \\text{bonds} + ${lone}\\ \\text{lone pair${lone === 1 ? '' : 's'}}`);
  }
  still(d, draw);
}
/* ammonia with its real H–N–H angle of 106.8°: three bonds at one polar angle from the axis of the lone pair */
(function () {
  const cosA = Math.sqrt((1 + 2 * Math.cos(106.8 * RAD)) / 3), sinA = Math.sqrt(1 - cosA * cosA);
  const hs = [90, 210, 330].map((az) => [sinA * Math.cos(az * RAD), -cosA, sinA * Math.sin(az * RAD)]);
  geometryPair('fig-ammonia', { c: 'N', x: 'H', L: 1.05, dirs: [[0, 1, 0], ...hs], lone: [0], geom: 'tetrahedral', struct: 'trigonal pyramidal', arc: [1, 2, '106.8°'], formula: '\\text{NH}_3' });
})();
/* water with the 104.5° of Example 7.13: the two bonds in one plane, the two lone pairs in the plane across it */
(function () {
  const hb = 104.5 / 2 * RAD, lp = 57 * RAD;
  const dirs = [[0, Math.cos(lp), Math.sin(lp)], [0, Math.cos(lp), -Math.sin(lp)], [Math.sin(hb), -Math.cos(hb), 0], [-Math.sin(hb), -Math.cos(hb), 0]];
  geometryPair('fig-water', { c: 'O', x: 'H', L: 1.05, dirs, lone: [0, 1], geom: 'tetrahedral', struct: 'bent', arc: [2, 3, '104.5°'], formula: '\\text{H}_2\\text{O}', yaw: 0.6 });
})();
/* SF4: the lone pair in an equatorial position of the trigonal bipyramid; XeF4: the two lone pairs across the octahedron */
geometryPair('fig-sf4', { c: 'S', x: 'F', L: 1.25, dirs: SITES[5], lone: [2], geom: 'trigonal bipyramidal', struct: 'seesaw', arc: null, formula: '\\text{SF}_4', dist: 7.7, yaw: 2.3 });
geometryPair('fig-xef4', { c: 'Xe', x: 'F', L: 1.3, dirs: SITES[6], lone: [0, 1], geom: 'octahedral', struct: 'square planar', arc: [2, 4, '90°'], formula: '\\text{XeF}_4', dist: 7.7, yaw: 0.5, pitch: 0.36 });

/* =====================================================================
   FIGURE 7.26 + 7.27: the bond-moment bench. On the left the molecule
   with a bond moment beside each bond: an arrow from the less
   electronegative atom toward the more, its tail crossed as the book
   crosses it, its length the difference in electronegativity. On the
   right the same arrows moved tail to tip, and from the first tail to
   the last tip the heavier arrow of their sum, the dipole moment of the
   molecule; where the chain closes on itself there is none. Both turn
   together, so every arrow on the right stays parallel to its bond.
   Still: a vector sum has no time in it.
===================================================================== */
(function () {
  const d = sim('sim-bond-moments');
  const top = F.makeCanvas(d.stage, 104);
  const S = stage3(d, { h: 600, dist: 7.9 }), v = S.v, gA = v.part(-2.3), gB = v.part(2.3);
  const key = F.makeCanvas(d.stage, 60);
  v.setView(0.3, 0.2);
  /* the electronegativities the book prints in Figure 7.6 */
  const EN = { H: 2.1, B: 2.0, C: 2.5, N: 3.0, O: 3.5, F: 4.0, P: 2.1, S: 2.5, Cl: 3.0 };
  const K = 0.5;   /* scene units of arrow for each unit of electronegativity difference */
  /* three bonds at one polar angle from the upright axis that make the given angle with one another, and two in one plane */
  const pyramid = (angle) => { const cosA = Math.sqrt((1 + 2 * Math.cos(angle * RAD)) / 3), s = Math.sqrt(1 - cosA * cosA); return [90, 210, 330].map((az) => [s * Math.cos(az * RAD), -cosA, s * Math.sin(az * RAD)]); };
  const bent = (angle) => [[-Math.sin(angle / 2 * RAD), -Math.cos(angle / 2 * RAD), 0], [Math.sin(angle / 2 * RAD), -Math.cos(angle / 2 * RAD), 0]];
  const mk = (c, terms, o = {}) => ({ c, terms: terms.map(([x, u]) => ({ x, u, L: x === 'H' ? 1.05 : 1.25 })), order: o.order ?? 1, chain: o.chain });
  const MOLS = {
    pair: { label: 'C–H and B–F bonds', pairs: [['C', 'H'], ['B', 'F']], say: 'The difference in electronegativity is small between C and H and large between B and F, so the C–H bond moment is a short vector and the B–F bond moment a long one.' },
    co2: { label: 'CO₂', ...mk('C', [['O', [1, 0, 0]], ['O', [-1, 0, 0]]], { order: 2 }), say: 'CO₂ is linear, and its two C=O bond moments are equal and point in opposite directions, so they cancel: the molecule is nonpolar.' },
    h2o: { label: 'H₂O', ...mk('O', bent(104.5).map((u) => ['H', u])), say: 'H₂O is bent, so its two O–H bond moments do not cancel: the molecule is polar, and its negative end is the oxygen atom.' },
    ocs: { label: 'OCS', ...mk('C', [['O', [-1, 0, 0]], ['S', [1, 0, 0]]], { order: 2 }), say: 'OCS is linear, but the C=O bond moment is far larger than the C=S bond moment, so they do not cancel: the molecule is polar, and its negative end is the oxygen atom.' },
    ch3cl: { label: 'CH₃Cl', ...mk('C', SITES[4].map((u, i) => [i === 0 ? 'Cl' : 'H', u])), say: 'In CH₃Cl the C–Cl bond moment and the three C–H bond moments all point toward the chlorine end, so they add: the molecule is polar.' },
    h2s: { label: 'H₂S', ...mk('S', bent(92).map((u) => ['H', u])), say: 'H₂S is bent, so its two S–H bond moments do not cancel: the molecule is polar, and its negative end is the sulfur atom.' },
    nh3: { label: 'NH₃', ...mk('N', pyramid(106.8).map((u) => ['H', u])), say: 'NH₃ is trigonal pyramidal, so its three N–H bond moments do not cancel: the molecule is polar, and its negative end is the nitrogen atom.' },
    bf3: { label: 'BF₃', ...mk('B', SITES[3].map((u) => ['F', u])), say: 'BF₃ is trigonal planar with three equal B–F bond moments 120° apart, so they cancel: the molecule is nonpolar.' },
    ch4: { label: 'CH₄', ...mk('C', SITES[4].map((u) => ['H', u])), say: 'CH₄ is tetrahedral with four equal C–H bond moments, so they cancel: the molecule is nonpolar.' },
    pf5: { label: 'PF₅', ...mk('P', SITES[5].map((u) => ['F', u]), { chain: [0, 2, 3, 1, 4] }), say: 'PF₅ is trigonal bipyramidal with five equal P–F bond moments, so they cancel: the molecule is nonpolar.' },
    sf6: { label: 'SF₆', ...mk('S', SITES[6].map((u) => ['F', u]), { chain: [0, 2, 4, 1, 3, 5] }), say: 'SF₆ is octahedral with six equal S–F bond moments, so they cancel: the molecule is nonpolar.' },
  };
  const M = F.select(d.controls, { label: '\\text{molecule}', options: Object.keys(MOLS).map((k) => ({ value: k, label: MOLS[k].label })), value: 'h2o', aria: 'the molecule, or the two bonds of Figure 7.26', ms: 0 });
  /* a bond moment from a to b (a the less electronegative end): shaft, head and the crossed tail that is the book's plus sign */
  function moment(g, a, b, heavy) {
    const cM = F.C('dipole-moment'), u = V.unit(V.sub(b, a)), w = upPerp(u), r = heavy ? 0.07 : 0.035;
    arrow3(g, a, b, r, cM);
    if (!heavy) { const bar = V.add(a, V.mul(u, 0.07)); stick(g, V.sub(bar, V.mul(w, 0.1)), V.add(bar, V.mul(w, 0.1)), 0.03, cM); }
  }
  /* the size of a bond's moment on the scale of Figure 7.6 and the atom it points to; carbon and sulfur tie there, and
     the text says sulfur is slightly the more electronegative, so that arrow is drawn at a least length toward sulfur */
  function momentOf(a, b) { const dEN = EN[b] - EN[a], tie = Math.abs(dEN) < 0.05; return { dEN: Math.abs(dEN), to: tie ? (b === 'S' ? b : a) : dEN > 0 ? b : a, len: Math.max(0.16, Math.abs(dEN) * K), tie }; }
  let sig = '';
  function build(mol, id) {
    const s = id + '|' + palSig(); if (s === sig) return; sig = s;
    S.clear();
    if (mol.pairs) {   /* Figure 7.26: the two bonds side by side, each with its one arrow */
      mol.pairs.forEach(([a, b], k) => {
        const g = k ? gB : gA, pa = [-0.6, -0.15, 0], pb = [0.6, -0.15, 0], mo = momentOf(a, b);
        bond3(g, pa, pb, 1, 0.07); ball(S, g, pa, a); ball(S, g, pb, b);
        const dir = mo.to === b ? 1 : -1, y = 0.62, x0 = -dir * mo.len / 2;
        moment(g, [x0, y, 0], [x0 + dir * mo.len, y, 0], false);
        S.under(weak(`${a}–${b}: a difference of `) + fmt(mo.dEN, 1), g);
      });
      return;
    }
    /* left: the molecule, and beside each bond its moment, on the side away from the other bonds */
    ball(S, gA, [0, 0, 0], mol.c);
    const vecs = mol.terms.map((t, i) => {
      const P = V.mul(t.u, t.L), mo = momentOf(mol.c, t.x), dir = mo.to === t.x ? 1 : -1;
      bond3(gA, [0, 0, 0], P, Array.isArray(mol.order) ? mol.order[i] : mol.order, 0.07); ball(S, gA, P, t.x);
      const w = upPerp(t.u), off = Math.max(rOf(mol.c), rOf(t.x)) + 0.16, mid = V.add(V.mul(t.u, t.L * 0.55), V.mul(w, off));
      const a = V.sub(mid, V.mul(t.u, dir * mo.len / 2)), b = V.add(mid, V.mul(t.u, dir * mo.len / 2));
      moment(gA, a, b, false);
      return V.mul(t.u, dir * mo.len);
    });
    /* right: the same arrows tail to tip, in an order that keeps two opposite arrows from lying on one another */
    const order = mol.chain ?? vecs.map((_, i) => i), pts = [[0, 0, 0]];
    order.forEach((i) => pts.push(V.add(pts[pts.length - 1], vecs[i])));
    const lo = [0, 1, 2].map((k) => Math.min(...pts.map((p) => p[k]))), hi = [0, 1, 2].map((k) => Math.max(...pts.map((p) => p[k])));
    const shift = V.mul(V.add(lo, hi), -0.5), Q = pts.map((p) => V.add(p, shift));
    order.forEach((i, k) => {
      /* an arrow that runs straight back along the one before it is set a little to one side, so both can be seen */
      const back = k > 0 && V.dot(V.unit(vecs[i]), V.unit(vecs[order[k - 1]])) < -0.98, side = back ? V.mul(upPerp(V.unit(vecs[i])), 0.16) : [0, 0, 0];
      moment(gB, V.add(Q[k], side), V.add(Q[k + 1], side), false);
    });
    const net = V.len(V.sub(Q[Q.length - 1], Q[0]));
    if (net > 0.08) { const side = V.mul(upPerp(V.unit(V.sub(Q[Q.length - 1], Q[0]))), mol.terms.length === 2 && Math.abs(V.dot(V.unit(vecs[0]), V.unit(vecs[1]))) > 0.98 ? -0.2 : 0); moment(gB, V.add(Q[0], side), V.add(Q[Q.length - 1], side), true); }
    S.under(weak('the bond moments, tail to tip: ') + (net > 0.08 ? 'they leave a dipole moment' : 'they cancel'), gB);
  }
  function draw() {
    const id = M.value, mol = MOLS[id];
    build(mol, id); v.invalidate();
    const { ctx } = begin(top);
    topline(ctx, mol.say);
    /* the key: the atoms of this molecule, and the two weights of arrow */
    const syms = mol.pairs ? [...new Set(mol.pairs.flat())] : [...new Set([mol.c, ...mol.terms.map((t) => t.x)])];
    const cM = F.C('dipole-moment');
    const entries = syms.map(keyAtom).concat([{ s: 'bond moment', draw: (c, x, y) => { F.arrow(c, x - 20, y, x + 20, y, cM, 2.5); line(c, x - 13, y - 6, x - 13, y + 6, cM, 2.5); } }]);
    if (!mol.pairs) entries.push({ s: 'dipole moment of the molecule', draw: (c, x, y) => F.arrow(c, x - 20, y, x + 20, y, cM, 5) });
    const k = begin(key); keyRow(k.ctx, 60, entries);
    /* the readout: the difference in electronegativity behind each kind of arrow, from Figure 7.6 */
    const kinds = mol.pairs ? mol.pairs : [...new Map(mol.terms.map((t) => [t.x, [mol.c, t.x]])).values()];
    const bondSym = (a, b) => `${a}${!mol.pairs && mol.order === 2 ? '=' : '–'}${b}`;
    const lines = kinds.map(([a, b]) => { const hi = EN[a] >= EN[b] ? a : b, lo = hi === a ? b : a; return `\\Delta\\text{EN}_{\\text{${bondSym(a, b)}}} = ${fmt(EN[hi], 1)} - ${fmt(EN[lo], 1)} = ${fmt(EN[hi] - EN[lo], 1)}`; });
    tex(d.readout, lines.join(' \\\\ '));
    if (id === 'ocs') d.readout.appendChild(el('small', null, 'Figure 7.6 gives carbon and sulfur the same value. Sulfur is very slightly the more electronegative, so the C=S arrow is short and points to sulfur.'));
  }
  still(d, draw);
})();

/* =====================================================================
   FIGURE 7.28: molecules between two plates. With the field off they
   point every way; when it comes on, polar HF turns its hydrogen end to
   the negative plate, and nonpolar F2 goes on as before. Moving: three
   seconds with the field off, three with it on, then a hold; finite, so
   it has the transport and its scrubber. Flat, as the book draws it:
   every molecule is seen whole and none gains from a turn.
===================================================================== */
(function () {
  const d = sim('sim-field', 600);
  const MOLS = { hf: { name: 'HF', a: 'H', b: 'F', polar: true }, f2: { name: 'F₂', a: 'F', b: 'F', polar: false } };
  const M = F.choice(d.controls, { label: '\\text{molecule}', options: [{ value: 'hf', label: 'HF, polar' }, { value: 'f2', label: 'F₂, nonpolar' }], value: 'hf', aria: 'the molecule between the plates', ms: 0, onInput: () => cy.reset() });
  const T = 6, ON = 3, cy = cycle(() => T, 1.5);
  let hits = []; F.hover(d.stage, () => hits);
  function rng(seed) { let s = seed >>> 0; return () => { s += 0x6D2B79F5; let z = s; z = Math.imul(z ^ (z >>> 15), z | 1); z ^= z + Math.imul(z ^ (z >>> 7), z | 61); return ((z ^ (z >>> 14)) >>> 0) / 4294967296; }; }
  /* eight molecules in two staggered rows, their random turning fixed by the seed so that a replay repeats */
  const SPOTS = (() => { const r = rng(11), out = []; for (let i = 0; i < 8; i++) { const col = i % 4, row = Math.floor(i / 4); out.push({ x: 430 + col * 180 + (row ? 60 : 0) + (r() - 0.5) * 36, y: 210 + row * 170 + (r() - 0.5) * 44, th0: r() * TAU, w: (r() - 0.5) * 2.0, ph: r() * TAU, amp: 0.4 + 0.5 * r() }); } return out; })();
  const tumble = (m, tau) => m.th0 + m.w * tau + m.amp * Math.sin(1.7 * tau + m.ph);
  const norm = (a) => Math.atan2(Math.sin(a), Math.cos(a));
  const X0 = 250, X1 = 1150, PW = 30, Y0 = 110, Y1 = 470;
  function draw() {
    const { ctx } = begin(d.c);
    const m = MOLS[M.value], tau = cy.now(), on = tau >= ON;
    const cNeg = F.ref('negative-plate'), cPos = F.ref('positive-plate'), cQ = F.C('charge');
    /* the field fills the space between the plates while it is on */
    if (on) { ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.06); ctx.fillRect(X0 + PW, Y0, X1 - X0 - PW, Y1 - Y0); ctx.restore(); }
    [[X0, cNeg], [X1, cPos]].forEach(([x, c]) => { ctx.save(); ctx.fillStyle = alpha(c, on ? 0.45 : 0.18); ctx.strokeStyle = c; ctx.lineWidth = 3; ctx.fillRect(x, Y0, PW, Y1 - Y0); ctx.strokeRect(x, Y0, PW, Y1 - Y0); ctx.restore(); });
    if (on) { text(ctx, '−', X0 - 34, Y0 + 24, cNeg, { size: 44, weight: 600, align: 'center' }); text(ctx, '+', X1 + PW + 34, Y0 + 24, cPos, { size: 40, weight: 600, align: 'center' }); }
    text(ctx, on ? 'negative plate' : 'plate', X0 + PW / 2, Y1 + 28, cNeg, { size: 20, align: 'center' }); text(ctx, on ? 'positive plate' : 'plate', X1 + PW / 2, Y1 + 28, cPos, { size: 20, align: 'center' });
    text(ctx, on ? 'electric field on' : 'electric field off', 700, Y1 + 28, on ? PAL.ink : PAL.muted, { size: 20, align: 'center' });
    /* the molecules, space-filling as the book draws them: a (hydrogen in HF) carries δ+, and with the field on a polar
       molecule turns that end toward the negative plate on the left and keeps a slight tremble */
    hits = [];
    const R = { H: 21, F: 31 }, half = 19;
    SPOTS.forEach((sp, i) => {
      let th = tumble(sp, tau);
      if (on && m.polar) { const th3 = norm(tumble(sp, ON)), k = 1 - Math.exp(-3.2 * (tau - ON)); th = th3 + norm(Math.PI - th3) * k + 0.07 * k * Math.sin(5 * tau + sp.ph); }
      const ax = sp.x + Math.cos(th) * half, ay = sp.y + Math.sin(th) * half, bx = sp.x - Math.cos(th) * half, by = sp.y - Math.sin(th) * half;
      atom(ctx, ax, ay, m.a, R[m.a]); atom(ctx, bx, by, m.b, R[m.b]);
      hits.push({ x: bx, y: by, r: R[m.b], name: m.polar ? 'fluorine atom, the δ− end' : 'fluorine atom' }, { x: ax, y: ay, r: R[m.a], name: m.polar ? 'hydrogen atom, the δ+ end' : 'fluorine atom' });
      /* the partial charges are written on one molecule, for the kind (rule 26.7); the pointer names the rest */
      if (m.polar && i === 0) { text(ctx, 'δ+', ax + Math.cos(th) * (R.H + 20), ay + Math.sin(th) * (R.H + 20), cQ, { size: 22, weight: 600, align: 'center' }); text(ctx, 'δ−', bx - Math.cos(th) * (R.F + 20), by - Math.sin(th) * (R.F + 20), cQ, { size: 22, weight: 600, align: 'center' }); }
    });
    F.legend(ctx, { l: 60, r: 1340, t: Y1 + 52, b: 600 }, m.polar ? [{ s: 'hydrogen, δ+', draw: (c, x, y) => atom(c, x, y, 'H', 8) }, { s: 'fluorine, δ−', draw: (c, x, y) => atom(c, x, y, 'F', 11) }] : [keyAtom('F')], { corner: 'top', row: true, panel: false, size: 20 });
    const turned = on && m.polar && tau - ON > 1.2;
    topline(ctx, !on ? 'With the field off, the ' + m.name + ' molecules point every way.'
      : !m.polar ? 'The field is on, but F₂ has no dipole moment, so its molecules go on as before.'
      : turned ? 'The field is on, and every HF molecule has turned its hydrogen end toward the negative plate.'
      : 'The field has come on, and the HF molecules are turning.');
    tex(d.readout, m.polar ? '\\kmu = \\kQpart\\krbond > 0' : '\\kmu = \\kQpart\\krbond = 0');
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();
};
