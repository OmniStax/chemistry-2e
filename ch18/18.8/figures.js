/* Figures for section 18.8 Occurrence, Preparation, and Properties of Phosphorus. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['18.8'] = function (root, F) {
const { PAL, register } = F;
const { sphere, stick, lobe } = F.mesh;
const sim = (id) => F.sim(root, id);
const still = (d, draw) => register(d.fig, { update: () => {}, draw });
const RAD = Math.PI / 180;

const V = {
  add: (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]],
  sub: (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]],
  mul: (a, k) => [a[0] * k, a[1] * k, a[2] * k],
  mid: (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2],
  lerp: (a, b, k) => [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k],
  unit: (a) => { const l = Math.hypot(a[0], a[1], a[2]) || 1; return [a[0] / l, a[1] / l, a[2] / l]; },
};
function slerp(a, b, t) {
  const w = Math.acos(Math.max(-1, Math.min(1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]))); if (w < 1e-6) return a;
  const s = Math.sin(w); return V.add(V.mul(a, Math.sin((1 - t) * w) / s), V.mul(b, Math.sin(t * w) / s));
}
/* a direction at polar angle th from +y and azimuth az, in degrees */
const dirOf = (th, az) => [Math.sin(th * RAD) * Math.cos(az * RAD), Math.cos(th * RAD), Math.sin(th * RAD) * Math.sin(az * RAD)];

/* ---------- atoms in the book's palette, each bond two half sticks in its atoms' colours ---------- */
const K = 0.62;                                  /* scene units per ångström */
const RADIUS = { P: 0.36, S: 0.34, O: 0.27, Cl: 0.34 };
const NAMES = { P: 'phosphorus (P)', S: 'sulfur (S)', O: 'oxygen (O)', Cl: 'chlorine (Cl)' };
const FREE = { spin: 'idle', views: [{ label: 'side', yaw: 0.35, pitch: 0.22 }, { label: 'down the axis', yaw: 0, pitch: Math.PI / 2 }] };
const fade = (a) => (a < 0.999 ? { transparent: true, opacity: a } : undefined);
/* atoms [{sym, from, p, a}] (p in ångströms, a its presence 0..1, from the element it is turning from) and bonds [{i, j, a}] */
function molecule(v, g, atoms, bonds, k) {
  atoms.forEach((t) => {
    if (t.a <= 0.01) return;
    const col = t.from && t.from !== t.sym ? F.mixColor(F.el(t.from), F.el(t.sym), k) : F.el(t.sym);
    const r = (t.from && t.from !== t.sym ? RADIUS[t.from] + (RADIUS[t.sym] - RADIUS[t.from]) * k : RADIUS[t.sym]) * (0.3 + 0.7 * t.a);
    v.pickable(sphere(g, V.mul(t.p, K), r, col, fade(t.a)), NAMES[k < 0.5 && t.from ? t.from : t.sym]);
  });
  bonds.forEach(({ i, j, a }) => {
    if (a <= 0.01) return;
    const A = atoms[i], B = atoms[j], m = V.mid(A.p, B.p), col = (t) => (t.from && t.from !== t.sym ? F.mixColor(F.el(t.from), F.el(t.sym), k) : F.el(t.sym));
    stick(g, V.mul(A.p, K), V.mul(m, K), 0.075, col(A), fade(a));
    stick(g, V.mul(m, K), V.mul(B.p, K), 0.075, col(B), fade(a));
  });
}
const plain = (e, a) => { e.style.opacity = String(Math.max(0, Math.min(1, a))); return e; };

/* =====================================================================
   FIGURE 18.39 + 18.40: P4, P4S3, P4O6 and P4O10 as one cage. Fourteen
   sites: the four P atoms of a tetrahedron, an atom on each of its six
   edges and a terminal oxygen on each P. Still: a choice is one morph,
   each P–P bond fading as the atom of its edge grows from its midpoint.
===================================================================== */
(function () {
  const d = sim('sim-phosphorus-cage');
  const v = F.view3d(d.stage, { ...FREE, h: 640, dist: 9.2 });
  const g = v.part(0); g.position.y = -0.45;
  const EDGES = [[0, 1], [0, 2], [0, 3], [1, 2], [2, 3], [1, 3]];      /* apex to base first, then the base */
  const AZ = [90, 210, 330];
  /* a tetrahedron of edge a, apex up, centred on its centroid */
  function tetra(a) {
    const H = a * Math.sqrt(2 / 3), R = a / Math.sqrt(3);
    return [[0, 0.75 * H, 0], ...AZ.map((z) => [R * Math.cos(z * RAD), -0.25 * H, R * Math.sin(z * RAD)])];
  }
  /* the cage of P4O6: P–O 1.65 Å and P–O–P 127°, so the P atoms are 2.95 Å apart and each O stands 0.74 Å out from its edge */
  const P6 = tetra(2.95), edgeO = EDGES.map(([i, j]) => { const m = V.mid(P6[i], P6[j]); return V.add(m, V.mul(V.unit(m), 0.74)); });
  /* P4S3: base P–P 2.24 Å, P–S 2.09 Å, each S above its base P, the apex P above all three */
  const S3 = (() => {
    const pts = [[0, 3.18, 0], ...AZ.map((z) => [1.29 * Math.cos(z * RAD), 0, 1.29 * Math.sin(z * RAD)])];
    const s = AZ.map((z) => [1.75 * Math.cos(z * RAD), 2.04, 1.75 * Math.sin(z * RAD)]);
    const all = [...pts, ...s], c = V.mul(all.reduce(V.add, [0, 0, 0]), 1 / all.length);
    return { P: pts.map((p) => V.sub(p, c)), S: s.map((p) => V.sub(p, c)) };
  })();
  const P4 = tetra(2.21);
  const site = (sym, p, a) => ({ sym, p, a });
  const STATES = {
    P4: {
      atoms: [...P4.map((p) => site('P', p, 1)), ...EDGES.map(([i, j]) => site('O', V.mid(P4[i], P4[j]), 0)), ...P4.map((p) => site('O', p, 0))],
      pp: [1, 1, 1, 1, 1, 1], term: 0,
      head: 'White phosphorus, P₄, is four phosphorus atoms at the corners of a tetrahedron, joined by six P–P bonds.',
      tex: '\\mk{a}{\\text{P}_4(s)}',
    },
    P4S3: {
      atoms: [...S3.P.map((p) => site('P', p, 1)), ...EDGES.map(([i, j], e) => (e < 3 ? site('S', S3.S[e], 1) : site('S', V.mid(S3.P[i], S3.P[j]), 0))), ...S3.P.map((p) => site('O', p, 0))],
      pp: [0, 0, 0, 1, 1, 1], term: 0,
      head: 'In P₄S₃ a sulfur atom sits in three of the six edges of the P₄ tetrahedron, and the three P–P bonds of its base remain.',
      tex: '\\mk{s}{\\text{P}_4\\text{S}_3(s)}',
    },
    P4O6: {
      atoms: [...P6.map((p) => site('P', p, 1)), ...edgeO.map((p) => site('O', p, 1)), ...P6.map((p) => site('O', p, 0))],
      pp: [0, 0, 0, 0, 0, 0], term: 0,
      head: 'In P₄O₆ an oxygen atom sits in every one of the six edges of the P₄ tetrahedron, so no P–P bond remains.',
      tex: '\\mk{a}{\\text{P}_4(s)} + \\mk{o}{3\\text{O}_2(g)} \\longrightarrow \\mk{b}{\\text{P}_4\\text{O}_6(s)}',
    },
    P4O10: {
      atoms: [...P6.map((p) => site('P', p, 1)), ...edgeO.map((p) => site('O', p, 1)), ...P6.map((p) => site('O', V.add(p, V.mul(V.unit(p), 1.43)), 1))],
      pp: [0, 0, 0, 0, 0, 0], term: 1,
      head: 'P₄O₁₀ is the cage of P₄O₆ with one more oxygen atom on each phosphorus atom.',
      tex: '\\mk{b}{\\text{P}_4\\text{O}_6(s)} + \\mk{o}{2\\text{O}_2(g)} \\longrightarrow \\mk{c}{\\text{P}_4\\text{O}_{10}(s)}',
    },
  };
  /* the bonds of a state as presences: P–P on an empty edge, P–X–P on a filled one, P–O to each terminal O */
  function bondsOf(s) {
    const out = [];
    EDGES.forEach(([i, j], e) => {
      out.push({ i, j, a: s.pp[e] });
      out.push({ i, j: 4 + e, a: s.atoms[4 + e].a }, { i: 4 + e, j, a: s.atoms[4 + e].a });
    });
    [0, 1, 2, 3].forEach((i) => out.push({ i, j: 10 + i, a: s.term }));
    return out;
  }
  const pick = F.choice(d.controls, { label: '\\text{molecule}', aria: 'the molecule', options: [{ value: 'P4', label: 'P₄' }, { value: 'P4S3', label: 'P₄S₃' }, { value: 'P4O6', label: 'P₄O₆' }, { value: 'P4O10', label: 'P₄O₁₀' }], value: 'P4S3' });
  const { formula: fx } = F.readout(d);
  function draw() {
    const k = pick.k, A = STATES[pick.from], B = STATES[pick.value];
    const atoms = B.atoms.map((b, n) => {
      /* an empty site stands at the middle of its P–P bond or on its P atom, so an atom grows out of the place it takes */
      const a = A.atoms[n];
      return { sym: b.sym, from: a.a && b.a ? a.sym : b.sym, p: V.lerp(a.p, b.p, k), a: a.a + (b.a - a.a) * k };
    });
    const ba = bondsOf(A), bb = bondsOf(B);
    const bonds = bb.map((x, n) => ({ i: x.i, j: x.j, a: ba[n].a + (x.a - ba[n].a) * k }));
    v.clear();
    molecule(v, g, atoms, bonds, k);
    v.label('P', V.mul(atoms[1].p, K), g, -34);
    const named = B.atoms.findIndex((t, n) => n >= 4 && t.a);
    if (named >= 0) plain(v.label(B.atoms[named].sym, V.mul(atoms[named].p, K), g, 28), A.atoms[named].a && A.atoms[named].sym === B.atoms[named].sym ? 1 : 2 * k - 1);
    v.headline(B.head);
    F.morph(fx, B.tex);
  }
  still(d, draw);
})();

/* =====================================================================
   FIGURE 18.41: phosphorus with three, four, five and six chlorine
   atoms. Six sites about P: up, down, three about the axis and a sixth
   for the octahedron. Still: a choice is one morph, each chlorine
   swinging along its great circle to its new place.
===================================================================== */
(function () {
  const d = sim('sim-phosphorus-chlorides');
  const v = F.view3d(d.stage, { ...FREE, h: 600, dist: 7.6 });
  const g = v.part(0); g.position.y = -0.35;
  const UP = [0, 1, 0], DOWN = [0, -1, 0];
  /* the three about the axis at polar angle th, the sixth at azimuth 270° on the equator; null for an empty site */
  const three = (th, az = [90, 210, 330]) => az.map((z) => dirOf(th, z));
  const STATES = {
    PCl3: {
      dirs: [UP, DOWN, ...three(117.6), dirOf(90, 270)], on: [0, 0, 1, 1, 1, 0], len: 2.04, lone: 1,
      head: 'PCl₃ is a trigonal pyramid: three chlorine atoms below the phosphorus atom, with its lone pair above.',
      tex: '\\mk{p}{\\text{P}_4} + \\mk{c}{6\\text{Cl}_2} \\longrightarrow \\mk{a}{4\\text{PCl}_3}',
    },
    PCl4: {
      dirs: [UP, DOWN, ...three(109.47), dirOf(90, 270)], on: [1, 0, 1, 1, 1, 0], len: 1.97, lone: 0,
      head: 'PCl₄⁺, the cation of solid phosphorus pentachloride, is tetrahedral.',
      tex: '\\mk{s}{\\text{PCl}_5(s)}:\\ [\\mk{x}{\\text{PCl}_4{}^{+}}][\\mk{y}{\\text{PCl}_6{}^{-}}]',
    },
    PCl5: {
      dirs: [UP, DOWN, ...three(90), dirOf(90, 270)], on: [1, 1, 1, 1, 1, 0], len: 2.07, lone: 0,
      head: 'PCl₅ in the gas phase is a trigonal bipyramid, with two axial and three equatorial chlorine atoms.',
      tex: '\\mk{a}{\\text{PCl}_3} + \\mk{c}{\\text{Cl}_2} \\longrightarrow \\mk{b}{\\text{PCl}_5}',
    },
    PCl6: {
      dirs: [UP, DOWN, ...three(90, [90, 180, 360]), dirOf(90, 270)], on: [1, 1, 1, 1, 1, 1], len: 2.14, lone: 0,
      head: 'PCl₆⁻, formed when PCl₅ accepts a chloride ion, is octahedral.',
      tex: '\\mk{b}{\\text{PCl}_5} + \\mk{c}{\\text{Cl}^{-}} \\longrightarrow \\mk{y}{\\text{PCl}_6{}^{-}}',
    },
  };
  const pick = F.choice(d.controls, { label: '\\text{species}', aria: 'the phosphorus chloride', options: [{ value: 'PCl3', label: 'PCl₃' }, { value: 'PCl4', label: 'PCl₄⁺' }, { value: 'PCl5', label: 'PCl₅' }, { value: 'PCl6', label: 'PCl₆⁻' }], value: 'PCl3' });
  const { formula: fx } = F.readout(d);
  function draw() {
    const k = pick.k, A = STATES[pick.from], B = STATES[pick.value], len = A.len + (B.len - A.len) * k;
    const atoms = [{ sym: 'P', p: [0, 0, 0], a: 1 }];
    const bonds = [];
    B.dirs.forEach((db, n) => {
      const on = A.on[n] + (B.on[n] - A.on[n]) * k;
      /* an arriving or leaving chlorine runs out of or into the phosphorus atom along the direction it ends or started at */
      const dir = A.on[n] && B.on[n] ? slerp(A.dirs[n], db, k) : B.on[n] ? db : A.dirs[n];
      atoms.push({ sym: 'Cl', p: V.mul(dir, len * (A.on[n] && B.on[n] ? 1 : 0.35 + 0.65 * on)), a: on });
      bonds.push({ i: 0, j: atoms.length - 1, a: on });
    });
    v.clear();
    molecule(v, g, atoms, bonds, 1);
    const lone = A.lone + (B.lone - A.lone) * k;
    if (lone > 0.01) {
      const m = lobe(g, [0, 0, 0], UP, 1.0, PAL.ink); m.material.opacity = 0.35 * lone;
      v.pickable(m, 'a lone pair');
      plain(v.label('lone pair', [0, 1.05, 0], g, 14), lone);
    }
    v.label('P', [0, 0, 0], g, -44);
    v.label('Cl', V.mul(atoms[3].p, K), g, 30);
    v.headline(B.head);
    F.morph(fx, B.tex);
  }
  still(d, draw);
})();
};
