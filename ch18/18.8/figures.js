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
const KEYNAME = { P: 'phosphorus', S: 'sulfur', O: 'oxygen', Cl: 'chlorine' };
const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
const fade = (a) => (a < 0.999 ? { transparent: true, opacity: a } : undefined);
/* the key under a scene: one entry per element shown, then whatever else the scene draws */
function key(cnv, syms, more = []) {
  const { ctx } = F.begin(cnv);
  const e = syms.map((s) => ({ s: KEYNAME[s], draw: (c, x, y) => F.dot(c, x, y, F.el(s), true, 10) }));
  F.legend(ctx, { l: 60, r: 1340, t: 0, b: 60 }, [...e, ...more], { corner: 'top', row: true, panel: false, size: 20 });
}
/* a 3D stage that keeps a line of words at its foot under each part, whichever way the part is turned */
function stage3(d, o) {
  const unders = [];
  let v = null;
  function place() {
    if (!v || !v.wrap || !v.wrap.clientHeight) return;
    const w = v.wrap.clientWidth, h = v.wrap.clientHeight;
    unders.forEach((l) => { const c = v.project([0, 0, 0], l.g), bw = l.el.offsetWidth / 2; l.el.style.left = clamp(c[0], bw + 2, w - bw - 2) + 'px'; l.el.style.top = (h - l.el.offsetHeight / 2 - 4) + 'px'; });
  }
  v = F.view3d(d.stage, { ...o, spin: 'idle', onRender: place });
  return {
    v,
    under(s, g) { const e = v.label(s, [0, 0, 0], g, 0, 'bare'); unders.push({ el: e, g }); return e; },
    clear() { v.clear(); unders.length = 0; },
  };
}
/* an atom, named under the pointer; p in ångströms, a its presence 0..1 */
function atom(v, g, sym, p, a, name, col) {
  if (a <= 0.01) return;
  v.pickable(sphere(g, V.mul(p, K), RADIUS[sym] * (0.3 + 0.7 * a), col ?? F.el(sym), fade(a)), name);
}
/* a bond as two half sticks in its atoms' colours */
function bond(g, pa, pb, ca, cb, a, r = 0.075) {
  if (a <= 0.01) return;
  const m = V.mid(pa, pb);
  stick(g, V.mul(pa, K), V.mul(m, K), r, ca, fade(a));
  stick(g, V.mul(m, K), V.mul(pb, K), r, cb, fade(a));
}

/* =====================================================================
   FIGURE 18.39 + 18.40: P4, P4S3, P4O6 and P4O10 as one cage. Fourteen
   sites: the four P atoms of a tetrahedron, an atom on each of its six
   edges and an oxygen atom at each corner. The edges of the tetrahedron
   stay drawn as thin lines where the P–P bond has gone, and each P atom
   carries its oxidation number. Still: a choice is one morph, each P–P
   bond fading as the atom of its edge grows from its midpoint.
===================================================================== */
(function () {
  const d = sim('sim-phosphorus-cage');
  const S = stage3(d, { h: 600, dist: 10.6 }), v = S.v;
  const g = v.part(0);
  const kc = F.makeCanvas(d.stage, 60);
  const EDGES = [[0, 1], [0, 2], [0, 3], [1, 2], [2, 3], [1, 3]];      /* top to base first, then the base */
  const AZ = [90, 210, 330];
  /* a tetrahedron of edge a, one corner up, centred on its centroid */
  function tetra(a) {
    const H = a * Math.sqrt(2 / 3), R = a / Math.sqrt(3);
    return [[0, 0.75 * H, 0], ...AZ.map((z) => [R * Math.cos(z * RAD), -0.25 * H, R * Math.sin(z * RAD)])];
  }
  /* the cage of P4O6: P–O 1.65 Å and P–O–P 127°, so the P atoms are 2.95 Å apart and each O stands 0.74 Å out from its edge */
  const P6 = tetra(2.95), edgeO = EDGES.map(([i, j]) => { const m = V.mid(P6[i], P6[j]); return V.add(m, V.mul(V.unit(m), 0.74)); });
  /* P4S3: base P–P 2.24 Å, P–S 2.09 Å, each S above its base P, the top P above all three */
  const S3 = (() => {
    const pts = [[0, 3.18, 0], ...AZ.map((z) => [1.29 * Math.cos(z * RAD), 0, 1.29 * Math.sin(z * RAD)])];
    const s = AZ.map((z) => [1.75 * Math.cos(z * RAD), 2.04, 1.75 * Math.sin(z * RAD)]);
    const c = [0, 1.55, 0];                                           /* half way up, so the molecule turns about its middle */
    return { P: pts.map((p) => V.sub(p, c)), S: s.map((p) => V.sub(p, c)) };
  })();
  const P4 = tetra(2.21);
  const site = (sym, p, a) => ({ sym, p, a });
  /* ox: the oxidation number of each P atom; zoom: the scene's scale, so every molecule fills the stage; y: its lift */
  const STATES = {
    P4: {
      atoms: [...P4.map((p) => site('P', p, 1)), ...EDGES.map(([i, j]) => site('O', V.mid(P4[i], P4[j]), 0)), ...P4.map((p) => site('O', p, 0))],
      pp: [1, 1, 1, 1, 1, 1], term: 0, ox: ['0', '0', '0', '0'], zoom: 1.75, y: -0.2,
      head: 'White phosphorus, P₄, is four phosphorus atoms at the corners of a tetrahedron, joined along its six edges by P–P bonds.',
      tex: '\\text{oxidation number of P} = 3(0) = 0',
      note: 'A bond between two atoms of the same element counts 0.',
    },
    P4S3: {
      atoms: [...S3.P.map((p) => site('P', p, 1)), ...EDGES.map(([i, j], e) => (e < 3 ? site('S', S3.S[e], 1) : site('S', V.mid(S3.P[i], S3.P[j]), 0))), ...S3.P.map((p) => site('O', p, 0))],
      pp: [0, 0, 0, 1, 1, 1], term: 0, ox: ['+3', '+1', '+1', '+1'], zoom: 1.5, y: -0.3,
      head: 'In P₄S₃ a sulfur atom has gone into three of the six edges of the P₄ tetrahedron, and the three P–P bonds of the base remain.',
      tex: '\\text{top P: } 3(+1) = +3 \\\\ \\text{base P: } 1(+1) + 2(0) = +1',
      note: 'Each bond to sulfur counts +1 for phosphorus and each P–P bond counts 0.',
    },
    P4O6: {
      atoms: [...P6.map((p) => site('P', p, 1)), ...edgeO.map((p) => site('O', p, 1)), ...P6.map((p) => site('O', p, 0))],
      pp: [0, 0, 0, 0, 0, 0], term: 0, ox: ['+3', '+3', '+3', '+3'], zoom: 1.42, y: -0.2,
      head: 'In P₄O₆ an oxygen atom has gone into every one of the six edges of the P₄ tetrahedron, so no P–P bond remains.',
      tex: '\\text{oxidation number of P} = 3(+1) = +3',
      note: 'Each bond to oxygen counts +1 for phosphorus.',
    },
    P4O10: {
      atoms: [...P6.map((p) => site('P', p, 1)), ...edgeO.map((p) => site('O', p, 1)), ...P6.map((p) => site('O', V.add(p, V.mul(V.unit(p), 1.43)), 1))],
      pp: [0, 0, 0, 0, 0, 0], term: 1, ox: ['+5', '+5', '+5', '+5'], zoom: 1.2, y: -0.25,
      head: 'P₄O₁₀ is the cage of P₄O₆ with one more oxygen atom on each phosphorus atom.',
      tex: '\\text{oxidation number of P} = 3(+1) + 2 = +5',
      note: 'The oxygen atom at a corner is held by one phosphorus atom alone and counts +2 for it.',
    },
  };
  /* the bonds of a state as presences: P–P on an empty edge, P–X–P on a filled one, P–O to each corner O */
  function bondsOf(s) {
    const out = [];
    EDGES.forEach(([i, j], e) => {
      out.push({ i, j, a: s.pp[e] });
      out.push({ i, j: 4 + e, a: s.atoms[4 + e].a }, { i: 4 + e, j, a: s.atoms[4 + e].a });
    });
    [0, 1, 2, 3].forEach((i) => out.push({ i, j: 10 + i, a: s.term }));
    return out;
  }
  const NAME = { P: 'phosphorus atom', S: 'sulfur atom', O: 'oxygen atom' };
  const pick = F.choice(d.controls, { label: '\\text{molecule}', aria: 'the molecule', options: [{ value: 'P4', label: 'P₄' }, { value: 'P4S3', label: 'P₄S₃' }, { value: 'P4O6', label: 'P₄O₆' }, { value: 'P4O10', label: 'P₄O₁₀' }], value: 'P4S3' });
  const R = F.readout(d);
  function draw() {
    const k = pick.k, A = STATES[pick.from], B = STATES[pick.value], near = k < 0.5 ? A : B;
    const zoom = A.zoom + (B.zoom - A.zoom) * k;
    g.scale.setScalar(zoom); g.position.y = A.y + (B.y - A.y) * k;
    const atoms = B.atoms.map((b, n) => {
      /* an empty site stands at the middle of its P–P bond or on its P atom, so an atom grows out of the place it takes */
      const a = A.atoms[n], turning = a.a && b.a && a.sym !== b.sym;
      return { sym: turning && k < 0.5 ? a.sym : b.sym, col: turning ? F.mixColor(F.el(a.sym), F.el(b.sym), k) : F.el(b.sym), p: V.lerp(a.p, b.p, k), a: a.a + (b.a - a.a) * k };
    });
    const ba = bondsOf(A), bb = bondsOf(B);
    S.clear();
    atoms.forEach((t, n) => atom(v, g, t.sym, t.p, t.a, n < 4 ? `phosphorus atom, oxidation number ${near.ox[n]}` : NAME[t.sym], t.col));
    bb.forEach((x, n) => bond(g, atoms[x.i].p, atoms[x.j].p, atoms[x.i].col, atoms[x.j].col, ba[n].a + (x.a - ba[n].a) * k));
    /* the edges of the P4 tetrahedron, thin where the P–P bond has gone */
    const edge = F.alpha(PAL.ink, 0.3);
    let ghost = 0;
    EDGES.forEach(([i, j], e) => {
      const gone = 1 - (A.pp[e] + (B.pp[e] - A.pp[e]) * k); ghost = Math.max(ghost, gone);
      if (gone > 0.01) v.pickable(stick(g, V.mul(atoms[i].p, K), V.mul(atoms[j].p, K), 0.018 / zoom, edge, fade(gone)), 'an edge of the P₄ tetrahedron');
    });
    key(kc, ['P', 'S', 'O'].filter((s) => B.atoms.some((t) => t.a && t.sym === s)), B.pp.includes(0) ? [{ s: 'edge of the P₄ tetrahedron', color: edge, w: 2 }] : []);
    v.headline(B.head);
    R.set(B.tex, B.note, { form: pick.value });
  }
  still(d, draw);
})();

/* =====================================================================
   FIGURE 18.41: two phosphorus atoms and ten chlorine atoms through three
   states: PCl3 with Cl2 beside it, PCl5 as the gas, PCl5 as the solid,
   where one chlorine has crossed from one phosphorus atom to the other
   and left PCl4+ and PCl6−. Each molecule turns about its own centre.
   Still: a choice is one morph of the same twelve atoms.
===================================================================== */
(function () {
  const d = sim('sim-phosphorus-chlorides');
  const X = 2.9;
  const S = stage3(d, { h: 560, dist: 9.6 }), v = S.v;
  const G = [v.part(-X), v.part(X)];
  G.forEach((g) => { g.position.y = -0.18; });
  const kc = F.makeCanvas(d.stage, 60);
  const AZ = [90, 210, 330], AX = 2.14, EQ = 2.02;
  const side = dirOf(90, 150);                                         /* where Cl2 stands beside PCl3, between two of its chlorine atoms */
  /* each state: for the five chlorine atoms that start on a phosphorus atom (top, bottom, three round the middle),
     the part they belong to (0 its own, 1 the other), the place in that part, and whether a P–Cl bond holds them */
  const own = (p, b = 1) => ({ other: 0, p, b });
  const STATES = {
    pcl3: {
      cl: () => [own(V.add(V.mul(side, 3.2), [0, 0.995, 0]), 0), own(V.add(V.mul(side, 3.2), [0, -0.995, 0]), 0), ...AZ.map((z) => own(V.mul(dirOf(117.8, z), 2.04)))],
      cl2: 1, lone: 1, names: ['PCl<sub>3</sub>, trigonal pyramidal', 'PCl<sub>3</sub>, trigonal pyramidal'],
      head: 'PCl₃ keeps a lone pair on its phosphorus atom. Excess chlorine oxidizes it to PCl₅.',
      tex: '\\mk{a}{\\text{PCl}_3} + \\mk{c}{\\text{Cl}_2} \\mk{r}{\\rightleftharpoons} \\mk{b}{\\text{PCl}_5}',
    },
    gas: {
      cl: () => [own([0, AX, 0]), own([0, -AX, 0]), ...AZ.map((z) => own(V.mul(dirOf(90, z), EQ)))],
      cl2: 0, lone: 0, names: ['PCl<sub>5</sub>, trigonal bipyramidal', 'PCl<sub>5</sub>, trigonal bipyramidal'],
      head: 'In the gas phase PCl₅ is a molecule: three chlorine atoms round the phosphorus atom, one above it and one below.',
      tex: '\\mk{a}{\\text{PCl}_3} + \\mk{c}{\\text{Cl}_2} \\mk{r}{\\rightleftharpoons} \\mk{b}{\\text{PCl}_5}',
    },
    solid: {
      /* the left PCl5 gives its bottom chlorine to the right one: a tetrahedron is left, and an octahedron made */
      cl: (m) => (m === 0
        ? [own([0, 1.97, 0]), { other: 1, p: V.mul(dirOf(90, 270), AX), b: 1 }, ...AZ.map((z) => own(V.mul(dirOf(109.47, z), 1.97)))]
        : [own([0, AX, 0]), own([0, -AX, 0]), ...[90, 180, 360].map((z) => own(V.mul(dirOf(90, z), AX)))]),
      cl2: 0, lone: 0, names: ['PCl<sub>4</sub><sup>+</sup>, tetrahedral', 'PCl<sub>6</sub><sup>−</sup>, octahedral'],
      head: 'In the solid one PCl₅ has given a chloride ion to its neighbor, which leaves the ions $\\text{PCl}_4{}^{+}$ and $\\text{PCl}_6{}^{-}$.',
      tex: '\\mk{b}{2\\text{PCl}_5} \\mk{r}{\\longrightarrow} \\mk{x}{\\text{PCl}_4{}^{+}} + \\mk{y}{\\text{PCl}_6{}^{-}}',
    },
  };
  const pick = F.choice(d.controls, { label: '\\text{substance}', aria: 'the substance', options: [{ value: 'pcl3', label: 'PCl₃ and Cl₂' }, { value: 'gas', label: 'PCl₅ gas' }, { value: 'solid', label: 'PCl₅ solid' }], value: 'pcl3' });
  const R = F.readout(d);
  function draw() {
    const k = pick.k, A = STATES[pick.from], B = STATES[pick.value], near = k < 0.5 ? A : B;
    const cP = F.el('P'), cCl = F.el('Cl');
    /* the other part's centre and the screen's upward direction, in a part's own axes (the orbit is a pitch after a yaw) */
    const { yaw, pitch } = v.at, D = (2 * X) / K;
    const across = (m) => V.mul([Math.cos(yaw), 0, Math.sin(yaw)], m === 0 ? D : -D);
    const up = [Math.sin(pitch) * Math.sin(yaw), Math.cos(pitch), -Math.sin(pitch) * Math.cos(yaw)];
    S.clear();
    G.forEach((g, m) => {
      const a = A.cl(m), b = B.cl(m), pos = [];
      atom(v, g, 'P', [0, 0, 0], 1, 'phosphorus atom', cP);
      b.forEach((tb, n) => {
        const ta = a[n], cross = ta.other !== tb.other, flying = cross && k > 0 && k < 1;
        /* at rest an atom is drawn in the part it belongs to; one changing sides is drawn from the part it leaves or arrives at, in a shallow dip */
        const there = !flying && (k >= 1 ? tb.other : ta.other), host = there ? G[1 - m] : g;
        const pa = ta.other && !there ? V.add(ta.p, across(m)) : ta.p, pb = tb.other && !there ? V.add(tb.p, across(m)) : tb.p;
        let p;
        if (flying) p = V.add(V.lerp(pa, pb, k), V.mul(up, -1.1 * Math.sin(Math.PI * k)));
        else if (!cross && ta.b && tb.b) { const la = Math.hypot(...ta.p), lb = Math.hypot(...tb.p); p = V.mul(slerp(V.unit(ta.p), V.unit(tb.p), k), la + (lb - la) * k); }
        else p = k >= 1 ? pb : k <= 0 ? pa : V.lerp(pa, pb, k);
        pos.push(p);
        atom(v, host, 'Cl', p, 1, 'chlorine atom', cCl);
        if (flying) {
          bond(g, ta.other ? across(m) : [0, 0, 0], p, cP, cCl, ta.b * clamp(1 - 2 * k, 0, 1));
          bond(g, tb.other ? across(m) : [0, 0, 0], p, cP, cCl, tb.b * clamp(2 * k - 1, 0, 1));
        } else bond(host, [0, 0, 0], p, cP, cCl, cross ? (k >= 1 ? tb.b : ta.b) : ta.b + (tb.b - ta.b) * k);
      });
      bond(g, pos[0], pos[1], cCl, cCl, A.cl2 + (B.cl2 - A.cl2) * k);
      const lone = A.lone + (B.lone - A.lone) * k;
      if (lone > 0.01) { const l = lobe(g, [0, 0, 0], [0, 1, 0], 1.0, PAL.ink); l.material.opacity = 0.35 * lone; v.pickable(l, 'lone pair'); }
      S.under(near.names[m], g);
    });
    key(kc, ['P', 'Cl'], B.lone ? [{ s: 'lone pair', draw: (c, x, y) => F.dot(c, x, y, F.alpha(PAL.ink, 0.35), true, 10) }] : []);
    v.headline(B.head);
    R.set(B.tex, undefined, { form: pick.value === 'solid' ? 'solid' : 'gas' });
  }
  still(d, draw);
})();
};
