/* Figures for section 14.4 Hydrolysis of Salts. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['14.4'] = function (root, F) {
const { tex, C, PAL, alpha, register, begin, line, text, topline } = F;
const sim = (id, H) => F.sim(root, id, H);
const still = (d, draw) => register(d.fig, { update: () => {}, draw });

/* =====================================================================
   SIM: the two ions of a salt on one logarithmic scale of K. The acid
   ionization constant of the salt's acidic ion is the upper bar, the
   base ionization constant of its basic ion the lower; an inert ion has
   none (K taken as 0, drawn as no bar). Every constant is printed in the
   section: NH4+ 5.6e-10 and F- 1.6e-11 (Example 14.17 d), anilinium
   2.3e-5 (14.15), acetate 5.6e-10 (14.16), HCO3- 4.7e-11 and 2.3e-8,
   HPO4 2- 4.2e-13 and 1.6e-7 (14.17 b, c). Axis fixed at 10^-14 to
   10^-2: the largest constant drawn is 2.3e-5 and its label needs the
   room to its right. Still: a salt has no clock; the bars bend from one
   salt's lengths to the next on the choice.
===================================================================== */
(function () {
  const H = 440;
  const d = sim('sim-salt-ions', H);
  const ion = (s, t, K) => ({ s, t, K });
  const SALTS = {
    nh4f: { name: 'NH₄F', eq: 'NH₄F(s) ⇌ NH₄⁺(aq) + F⁻(aq)', a: ion('NH₄⁺', '\\text{NH}_{4}^{+}', 5.6e-10), b: ion('F⁻', '\\text{F}^{-}', 1.6e-11) },
    nh4cl: { name: 'NH₄Cl', eq: 'NH₄Cl(s) ⇌ NH₄⁺(aq) + Cl⁻(aq)', a: ion('NH₄⁺', '\\text{NH}_{4}^{+}', 5.6e-10), b: ion('Cl⁻', '\\text{Cl}^{-}', 0) },
    anil: { name: '[C₆H₅NH₃]Cl', eq: '[C₆H₅NH₃]Cl(s) ⇌ C₆H₅NH₃⁺(aq) + Cl⁻(aq)', a: ion('C₆H₅NH₃⁺', '\\text{C}_{6}\\text{H}_{5}\\text{NH}_{3}^{+}', 2.3e-5), b: ion('Cl⁻', '\\text{Cl}^{-}', 0) },
    naac: { name: 'NaCH₃CO₂', eq: 'NaCH₃CO₂(s) ⇌ Na⁺(aq) + CH₃CO₂⁻(aq)', a: ion('Na⁺', '\\text{Na}^{+}', 0), b: ion('CH₃CO₂⁻', '\\text{CH}_{3}\\text{CO}_{2}^{-}', 5.6e-10) },
    kbr: { name: 'KBr', eq: 'KBr(s) ⇌ K⁺(aq) + Br⁻(aq)', a: ion('K⁺', '\\text{K}^{+}', 0), b: ion('Br⁻', '\\text{Br}^{-}', 0) },
    nahco3: { name: 'NaHCO₃', eq: 'NaHCO₃(s) ⇌ Na⁺(aq) + HCO₃⁻(aq)', inert: 'Na⁺', a: ion('HCO₃⁻', '\\text{HCO}_{3}^{-}', 4.7e-11), b: ion('HCO₃⁻', '\\text{HCO}_{3}^{-}', 2.3e-8) },
    na2hpo4: { name: 'Na₂HPO₄', eq: 'Na₂HPO₄(s) ⇌ 2Na⁺(aq) + HPO₄²⁻(aq)', inert: 'Na⁺', a: ion('HPO₄²⁻', '\\text{HPO}_{4}^{2-}', 4.2e-13), b: ion('HPO₄²⁻', '\\text{HPO}_{4}^{2-}', 1.6e-7) },
  };
  const salt = F.select(d.controls, { label: '\\text{salt}', key: 'salt', options: Object.keys(SALTS).map((k) => ({ value: k, label: SALTS[k].name })), value: 'nh4f', aria: 'the salt dissolved' });
  const LO = -14, HI = -2, X0 = 380, X1 = 1300, AY = 360, ROWS = [205, 285], BH = 44;
  const X = (lg) => X0 + ((lg - LO) / (HI - LO)) * (X1 - X0);
  const lg = (K) => (K > 0 ? Math.log10(K) : LO);
  const sci = (K) => { let e = Math.floor(Math.log10(K)), m = K / Math.pow(10, e); if (+m.toFixed(1) >= 10) { m /= 10; e += 1; } return `${m.toFixed(1)} \\times 10^{${e}}`; };
  const inertOf = (s) => [s.a, s.b].filter((x) => !(x.K > 0)).map((x) => x.s).concat(s.inert ? [s.inert] : []);
  function verdict(s) {
    const { a, b } = s;
    if (!(a.K > 0) && !(b.K > 0)) return `In ${s.name}, both ions are inert, so the solution is neutral.`;
    if (!(b.K > 0)) return `In ${s.name}, ${a.s} is a weak acid and ${b.s} is inert, so the solution is acidic.`;
    if (!(a.K > 0)) return `In ${s.name}, ${a.s} is inert and ${b.s} is a weak base, so the solution is basic.`;
    const acid = a.K > b.K;
    if (a.s === b.s) return `In ${s.name}, ${a.s} is amphiprotic and its $${acid ? '\\kKa' : '\\kKbion'}$ is the larger, so the solution is ${acid ? 'acidic' : 'basic'}.`;
    return `In ${s.name}, $\\kKa$ of ${a.s} is ${acid ? 'larger' : 'smaller'} than $\\kKbion$ of ${b.s}, so the solution is ${acid ? 'acidic' : 'basic'}.`;
  }
  function readout(s) {
    const { a, b } = s, A = `\\kKa(${a.t})`, B = `\\kKbion(${b.t})`;
    if (!(a.K > 0) && !(b.K > 0)) return `${A} \\approx 0 \\approx ${B}`;
    const va = a.K > 0 ? `= ${sci(a.K)}` : '\\approx 0', vb = b.K > 0 ? `= ${sci(b.K)}` : '\\approx 0';
    return `${A} ${va} ${a.K > b.K ? '>' : '<'} ${B} ${vb}`;
  }
  function draw() {
    const { ctx } = begin(d.c), s = SALTS[salt.value], ck = C('equilibrium-constant');
    topline(ctx, verdict(s));
    text(ctx, s.eq, 700, 112, PAL.ink, { size: 24, align: 'center' });
    const inert = inertOf(s);
    if (inert.length) text(ctx, `inert: ${inert.join(', ')}`, 700, 148, PAL.muted, { size: 20, align: 'center' });
    const L = salt.mix((v) => [lg(SALTS[v].a.K), lg(SALTS[v].b.K)]);
    [[s.a, 'acid ionization', '\\kKa'], [s.b, 'base ionization', '\\kKbion']].forEach(([io, role, sym], i) => {
      const y = ROWS[i], xe = X(L[i]);
      text(ctx, io.s, X0 - 24, y - 11, PAL.ink, { size: 24, weight: 600, align: 'right' });
      text(ctx, role, X0 - 24, y + 15, PAL.muted, { size: 18, align: 'right' });
      if (xe > X0 + 1) {
        ctx.save(); ctx.fillStyle = alpha(ck, 0.28); ctx.strokeStyle = ck; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.rect(X0, y - BH / 2, xe - X0, BH); ctx.fill(); ctx.stroke(); ctx.restore();
      }
      const lab = io.K > 0 ? `$${sym} = ${sci(io.K)}$` : `$${sym} \\approx 0$`;
      text(ctx, lab, Math.max(xe, X0) + 16, y, PAL.ink, { size: 22, tex: true });
    });
    line(ctx, X0, ROWS[0] - BH, X0, AY, alpha(PAL.ink, 0.35), 2);
    line(ctx, X0, AY, X1, AY, PAL.muted, 3);
    for (let e = LO; e <= HI; e++) {
      line(ctx, X(e), AY, X(e), AY + (e % 2 ? 6 : 11), PAL.muted, 2);
      if (!(e % 2)) text(ctx, `$10^{${e}}$`, X(e), AY + 32, PAL.muted, { size: 17, align: 'center', tex: true });
    }
    text(ctx, '$K$', X1 + 30, AY, ck, { size: 24, weight: 600, align: 'center', tex: true });
    tex(d.readout, readout(s));
  }
  still(d, draw);
})();

/* =====================================================================
   FIGURE 14.13: [Al(H2O)6]3+ gives a hydrogen ion to a water molecule.
   Scene units are angstroms: Al-O 1.9, O-H 0.96, H-O-H 104.5 degrees,
   each bonded water's hydrogens pointing away from the metal. The water
   on +x donates: its hydrogen toward the viewer lies on the line to the free
   water's oxygen, 2.75 away (a hydrogen bond); afterwards that hydrogen
   sits 0.98 from the free oxygen and the new H3O+ stands 1.2 farther
   out. Physical 3D, a coordination geometry: yaw held within 1.4 rad and
   pitch within 1.2 rad of the front view, so the free molecule never
   passes behind the complex; no idle spin for the same reason. Still: the two
   sides of an equilibrium, the hydrogen gliding over the choice's morph.
   Without WebGL a front projection is drawn on a canvas.
===================================================================== */
(function () {
  const d = sim('fig-hydrated-al');
  const side = F.choice(d.controls, { label: '\\text{side}', key: 'side', options: [{ value: 'before', label: 'Al(H₂O)₆³⁺ + H₂O' }, { value: 'after', label: 'Al(H₂O)₅(OH)²⁺ + H₃O⁺' }], value: 'before', aria: 'the side of the equilibrium shown' });
  const FRONT = { label: 'front', yaw: 0.7, pitch: 0.25 };
  const v = F.view3d(d.stage, { h: 500, dist: 14.5, tilt: FRONT.pitch, spin: 'none', pitch: [-1.2, 1.2], yaw: [-1.4, 1.4],
    views: [FRONT, { label: 'above', yaw: 0.7, pitch: 1.2 }] });
  v.setView(FRONT.yaw, FRONT.pitch);
  const has3 = !!v.scene;
  if (!has3) d.stage.querySelectorAll('.three-wrap').forEach((w) => { w.style.display = 'none'; });
  const cnv = has3 ? null : F.makeCanvas(d.stage, 500);
  const add = (p, q, k = 1) => [p[0] + q[0] * k, p[1] + q[1] * k, p[2] + q[2] * k];
  const AXES = [[[1, 0, 0], [0, 0, 1]], [[-1, 0, 0], [0, 0, 1]], [[0, 1, 0], [1, 0, 0]], [[0, -1, 0], [0, 0, 1]], [[0, 0, 1], [0, 1, 0]], [[0, 0, -1], [1, 0, 0]]];
  const AO = 1.9, OH = 0.96, CA = Math.cos(52.25 * Math.PI / 180), SA = Math.sin(52.25 * Math.PI / 180);
  const SHIFT = [-1.3, -0.35, 0];
  const atoms = [{ el: 'Al', p: [0, 0, 0], name: 'the aluminum atom, Al' }], bonds = [];
  let OB = 0, HT = 0;                            /* the donating oxygen and the hydrogen it gives */
  AXES.forEach(([u, w], i) => {
    const o = add([0, 0, 0], u, AO), io = atoms.length;
    if (i === 0) { OB = io; HT = io + 1; }
    atoms.push({ el: 'O', p: o, name: i === 0 ? 'the oxygen atom of the bonded water molecule that donates a hydrogen ion' : 'an oxygen atom of a bonded water molecule' });
    bonds.push({ a: 0, b: io, metal: true });
    [1, -1].forEach((sg) => {
      const ih = atoms.length;
      atoms.push({ el: 'H', p: add(o, add(u, w, sg * SA / CA), OH * CA), name: i === 0 && sg === 1 ? 'the hydrogen atom that moves to the free water molecule' : 'a hydrogen atom of a bonded water molecule' });
      bonds.push({ a: io, b: ih });
    });
  });
  const D = (() => { const q = add(atoms[HT].p, atoms[OB].p, -1), l = Math.hypot(...q); return q.map((x) => x / l); })();
  const OF = add(atoms[OB].p, D, 2.75), IOF = atoms.length;
  atoms.push({ el: 'O', p: OF, name: 'the oxygen atom of the free water molecule', free: true });
  [1, -1].forEach((sg) => { atoms.push({ el: 'H', p: add(OF, add(D, [0, 1, 0], sg * SA / CA), OH * CA), name: 'a hydrogen atom of the free water molecule', free: true }); bonds.push({ a: IOF, b: atoms.length - 1 }); });
  const STATE = {
    before: atoms.flatMap((a) => a.p),
    after: atoms.flatMap((a, i) => (i === HT ? add(add(OF, D, 1.2), D, -0.98) : a.free ? add(a.p, D, 1.2) : a.p)),
  };
  const ht = bonds.findIndex((b) => b.b === HT);
  const at = (P, i) => add([P[3 * i], P[3 * i + 1], P[3 * i + 2]], SHIFT);
  const RAD = { Al: 0.5, O: 0.4, H: 0.24 };
  const LABEL = {
    before: ['[Al(H<sub>2</sub>O)<sub>6</sub>]<sup>3+</sup>', 'H<sub>2</sub>O'],
    after: ['[Al(H<sub>2</sub>O)<sub>5</sub>OH]<sup>2+</sup>', 'H<sub>3</sub>O<sup>+</sup>'],
  };
  const FLAT = { before: ['[Al(H₂O)₆]³⁺', 'H₂O'], after: ['[Al(H₂O)₅OH]²⁺', 'H₃O⁺'] };
  const HEAD = {
    before: 'Six water molecules are bonded to Al through their O atoms; a seventh water molecule stands free beside them.',
    after: 'One bonded water molecule has given a hydrogen ion to the free one, leaving OH bonded to Al and forming H₃O⁺.',
  };
  const g = has3 ? v.part(0) : null;
  let sig = '', meshes = [], sticks = [];
  function build(P) {
    const key = [side.value, PAL.ink, PAL.muted, F.el('Al'), F.el('O'), F.el('H')].join('|');
    if (key === sig) return; sig = key;
    v.clear(); meshes = []; sticks = [];
    atoms.forEach((a, i) => { meshes[i] = v.pickable(F.mesh.sphere(g, at(P, i), RAD[a.el], F.el(a.el)), a.name); });
    bonds.forEach((b) => sticks.push(F.mesh.stick(g, at(P, b.a), at(P, b.b), b.metal ? 0.07 : 0.06, b.metal ? PAL.muted : PAL.ink)));
    const S = STATE[side.value];
    v.label(LABEL[side.value][0], add([0, -3.45, 0], SHIFT), g);
    v.label(LABEL[side.value][1], add(at(S, IOF), [0, -1.9, 0]), g);
  }
  function draw() {
    const P = side.mix((s) => STATE[s]);
    const donor = side.k < 0.5 ? (side.from ?? side.value) : side.value;
    const to = donor === 'before' ? OB : IOF;
    if (has3) {
      build(P);
      atoms.forEach((a, i) => meshes[i].position.set(...at(P, i)));
      bonds.forEach((b, j) => F.mesh.setStick(sticks[j], at(P, j === ht ? to : b.a), at(P, b.b)));
      v.headline(HEAD[side.value]);
      v.invalidate();
    } else {
      const { ctx } = begin(cnv), K = 62, X = (p) => 700 + (p[0] + 0.45 * p[2]) * K, Y = (p) => 250 - (p[1] + 0.3 * p[2]) * K;
      topline(ctx, HEAD[side.value]);
      const ord = atoms.map((a, i) => i).sort((i, j) => at(P, i)[2] - at(P, j)[2]);
      bonds.forEach((b, j) => { const p = at(P, j === ht ? to : b.a), q = at(P, b.b); line(ctx, X(p), Y(p), X(q), Y(q), b.metal ? PAL.muted : PAL.ink, 4); });
      ord.forEach((i) => { const p = at(P, i); ctx.save(); ctx.fillStyle = F.el(atoms[i].el); ctx.strokeStyle = alpha(PAL.ink, 0.6); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(X(p), Y(p), RAD[atoms[i].el] * K, 0, 2 * Math.PI); ctx.fill(); ctx.stroke(); ctx.restore(); });
      const S = STATE[side.value], q = add(at(S, IOF), [0, -1.9, 0]);
      const c = add([0, -3.45, 0], SHIFT);
      text(ctx, FLAT[side.value][0], X(c), Y(c), PAL.ink, { size: 22, align: 'center' });
      text(ctx, FLAT[side.value][1], X(q), Y(q), PAL.ink, { size: 22, align: 'center' });
    }
  }
  tex(d.readout, '\\kKa = \\frac{\\kconcHyd[\\text{Al}(\\text{H}_{2}\\text{O})_{5}(\\text{OH})^{2+}]}{[\\text{Al}(\\text{H}_{2}\\text{O})_{6}{}^{3+}]} = 1.4 \\times 10^{-5}');
  still(d, draw);
})();
};
