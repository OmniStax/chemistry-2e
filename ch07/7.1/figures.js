/* Figures for section 7.1 Ionic Bonding. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['7.1'] = function (root, F) {
const { tex, PAL, alpha, register, begin } = F;
const sim = (id, H) => F.sim(root, id, H);
const still = (d, draw) => register(d.fig, { update: () => {}, draw });
const TAU = 2 * Math.PI;

/* =====================================================================
   FIGURE 7.3: the sodium chloride lattice in three dimensions, the 27
   ions of the book's block: chloride at the corners and face centers,
   sodium between them. One choice morphs the block from packed to
   expanded and then picks out one Na⁺ and one Cl⁻ with the six ions
   around each; the sixth Na⁺ of the surface Cl⁻ is the next layer's.
   Still: the idle turn is not a clock, and there is no transport.
===================================================================== */
(function () {
  const H = 76;
  const d = sim('sim-nacl-lattice', H);
  /* one drawn unit is the Na–Cl distance, 283 pm; ionic radii 102 and 181 pm */
  const RNA = 102 / 283, RCL = 181 / 283;
  /* s spacing, k size of the spheres, rods their opacity, dim the opacity of ions outside the chosen seven,
     na and cl which ion is picked out, zoom and ty the camera */
  const STATE = {
    a: { s: 1, k: 1, rods: 0, dim: 1, na: 0, cl: 0, zoom: 1.42, ty: 0 },
    b: { s: 1.9, k: 0.6, rods: 1, dim: 1, na: 0, cl: 0, zoom: 1.12, ty: 0 },
    na: { s: 1.9, k: 0.6, rods: 1, dim: 0.1, na: 1, cl: 0, zoom: 1.12, ty: 0 },
    cl: { s: 1.9, k: 0.6, rods: 1, dim: 0.1, na: 0, cl: 1, zoom: 0.8, ty: 0.85 },
  };
  /* free yaw; pitch bounded so the layers of the crystal stay readable (rule 26.3) */
  const v = F.view3d(d.stage, { spin: 'idle', h: 640, dist: 13.4, tilt: 0.3, pitch: [-0.9, 0.9] });
  v.setView(-0.5, 0.3);
  const g = v.part(0);
  const aim = (x) => ({ zoom: STATE[x].zoom, target: [0, STATE[x].ty, 0] });
  const P = F.choice(d.controls, { label: '\\text{lattice}', aria: 'the whole lattice packed or expanded, or one ion and the six around it', value: 'b',
    options: [{ value: 'a', label: 'packed' }, { value: 'b', label: 'expanded' }, { value: 'na', label: 'six around Na⁺' }, { value: 'cl', label: 'six around Cl⁻' }],
    onInput: () => { v.glide(aim(P.value), 900); draw(); } });
  v.look(aim('b'));
  const ions = [];
  for (let i = -1; i <= 1; i++) for (let j = -1; j <= 1; j++) for (let k = -1; k <= 1; k++) ions.push({ q: [i, j, k], na: (i + j + k) % 2 === 0 });
  const NEXT = { q: [0, 2, 0], na: true };   /* the Na⁺ of the next layer, above the top face */
  const near = (a, b) => Math.abs(a.q[0] - b.q[0]) + Math.abs(a.q[1] - b.q[1]) + Math.abs(a.q[2] - b.q[2]) === 1;
  const MID = ions.find((x) => x.q.join() === '0,0,0'), TOP = ions.find((x) => x.q.join() === '0,1,0');
  const links = [];
  ions.forEach((a, ia) => ions.forEach((b, ib) => { if (ib > ia && near(a, b)) links.push([a, b]); }));
  const inSet = (c, ion) => (ion === c || near(c, ion) ? 1 : 0);
  const see = (o) => (o < 0.995 ? { transparent: true, opacity: o, depthWrite: o > 0.5 } : undefined);
  function draw() {
    const { ctx } = begin(d.c);
    const m = P.mix((x) => STATE[x]);
    v.clear();
    const pos = (ion) => ion.q.map((c) => c * m.s);
    const lit = (ion) => Math.min(1, m.na * inSet(MID, ion) + m.cl * inSet(TOP, ion));
    const rod = (a, b, e, o) => {
      if (o < 0.02) return;
      const st = F.mesh.stick(g, pos(a), pos(b), 0.04 + 0.035 * e, F.mixColor(PAL.muted, PAL.ink, e), see(o));
      v.pickable(st, 'attraction between an Na⁺ ion and a Cl⁻ ion next to it');
    };
    links.forEach(([a, b]) => {
      const e = Math.min(1, m.na * (a === MID || b === MID ? 1 : 0) + m.cl * (a === TOP || b === TOP ? 1 : 0));
      rod(a, b, e, m.rods * (m.dim + (1 - m.dim) * e));
    });
    rod(TOP, NEXT, 1, m.cl);
    ions.forEach((ion) => {
      const sph = F.mesh.sphere(g, pos(ion), (ion.na ? RNA : RCL) * m.k, F.el(ion.na ? 'Na' : 'Cl'), see(m.dim + (1 - m.dim) * lit(ion)));
      v.pickable(sph, ion.na ? 'sodium ion, Na⁺' : 'chloride ion, Cl⁻');
    });
    if (m.cl > 0.02) {
      const sph = F.mesh.sphere(g, pos(NEXT), RNA * m.k, F.el('Na'), see(m.cl));
      v.pickable(sph, 'sodium ion of the next layer, Na⁺');
      if (P.value === 'cl' && P.k > 0.6) v.label('Na⁺ of the next layer', pos(NEXT), g, 36);
    }
    const disc = (sym, r) => (c, x, y) => { c.save(); c.beginPath(); c.arc(x + 14, y + 11, r, 0, TAU); c.fillStyle = F.el(sym); c.fill(); c.lineWidth = 1.5; c.strokeStyle = alpha(PAL.ink, 0.45); c.stroke(); c.restore(); };
    const key = [{ s: 'Na⁺, sodium ion', draw: disc('Na', 6) }, { s: 'Cl⁻, chloride ion', draw: disc('Cl', 10.5) }];
    if (P.value !== 'a') key.push({ s: 'attraction between neighbors', color: PAL.muted, w: 4 });
    F.legend(ctx, { l: 40, r: 1360, t: 8, b: H - 4 }, key, { corner: 'top', row: true, size: 22 });
    const NA6 = '6\\ \\text{Cl}^{-}\\ \\text{ions around each Na}^{+}', CL6 = '6\\ \\text{Na}^{+}\\ \\text{ions around each Cl}^{-}';
    tex(d.readout, P.value === 'na' ? NA6 : P.value === 'cl' ? CL6 : `${NA6} \\\\ ${CL6}`);
  }
  still(d, draw);
})();
};
