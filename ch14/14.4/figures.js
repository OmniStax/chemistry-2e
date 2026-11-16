/* Figures for section 14.4 Hydrolysis of Salts. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['14.4'] = function (root, F) {
const { tex, C, PAL, alpha, register, begin, line, text, topline, cycle } = F;
const sim = (id, H) => F.sim(root, id, H);
const still = (d, draw) => register(d.fig, { update: () => {}, draw });
const TAU = 2 * Math.PI;

/* =====================================================================
   SIM: the two reactions a salt's ions can have with water, back to back.
   On the left the acid ionization that makes H3O+, on the right the base
   ionization that makes OH-; each has a bar as long as its constant on a
   logarithmic scale that starts at 10^-14 in the middle and runs outward
   to 10^-4 on both sides, so the bar that reaches further is the reaction
   that goes further and its side names the solution. An inert ion has no
   bar. Every constant is the book's: NH4+ 5.6e-10 and F- 1.6e-11 (Example
   14.17 d), anilinium 2.3e-5 from aniline's 4.3e-10 (14.15), acetate
   5.6e-10 from acetic acid's 1.8e-5 (14.16), HCO3- 4.7e-11 and 2.3e-8
   from 4.3e-7, HPO4 2- 4.2e-13 and 1.6e-7 from 6.2e-8 (14.17 b, c); the
   two parents the section leaves to the appendix are ammonia's K_b
   1.8e-5 (14.3) and HF's K_a 6.4e-4 (14.3's exercises). The largest
   constant drawn is 2.3e-5, so each half ends at 10^-4. Still: a salt has
   no clock; the bars bend from one salt's lengths to the next.
===================================================================== */
(function () {
  const H = 424;
  const d = sim('sim-salt-ions', H);
  /* one side of a salt: the ion, its reaction with water, where it comes from, its constant, and the parent
     whose constant gives it (K 0: a strong parent, so the ion's constant is about 0) */
  const NH4 = { s: 'NH₄⁺', t: '\\text{NH}_{4}{}^{+}', eq: 'NH₄⁺ + H₂O ⇌ H₃O⁺ + NH₃', why: 'conjugate acid of the weak base NH₃', K: 5.6e-10, p: { t: '\\text{NH}_{3}', K: 1.8e-5 } };
  const CL = { s: 'Cl⁻', t: '\\text{Cl}^{-}', eq: 'Cl⁻ + H₂O ⇌ HCl + OH⁻', why: 'conjugate base of the strong acid HCl', K: 0, p: { t: '\\text{HCl}', K: 0 } };
  const NA = { s: 'Na⁺', t: '\\text{Na}^{+}', eq: 'Na⁺', why: 'inert: no acid ionization', K: 0 };
  const SALTS = {
    nh4cl: { name: 'NH₄Cl', a: NH4, b: CL },
    anil: { name: '[C₆H₅NH₃]Cl', a: { s: 'C₆H₅NH₃⁺', t: '\\text{C}_{6}\\text{H}_{5}\\text{NH}_{3}{}^{+}', eq: 'C₆H₅NH₃⁺ + H₂O ⇌ H₃O⁺ + C₆H₅NH₂', why: 'conjugate acid of the weak base C₆H₅NH₂', K: 2.3e-5, p: { t: '\\text{C}_{6}\\text{H}_{5}\\text{NH}_{2}', K: 4.3e-10 } }, b: CL },
    naac: { name: 'NaCH₃CO₂', a: NA, b: { s: 'CH₃CO₂⁻', t: '\\text{CH}_{3}\\text{CO}_{2}{}^{-}', eq: 'CH₃CO₂⁻ + H₂O ⇌ CH₃CO₂H + OH⁻', why: 'conjugate base of the weak acid CH₃CO₂H', K: 5.6e-10, p: { t: '\\text{CH}_{3}\\text{CO}_{2}\\text{H}', K: 1.8e-5 } } },
    kbr: { name: 'KBr', a: { s: 'K⁺', t: '\\text{K}^{+}', eq: 'K⁺', why: 'inert: no acid ionization', K: 0 }, b: { s: 'Br⁻', t: '\\text{Br}^{-}', eq: 'Br⁻ + H₂O ⇌ HBr + OH⁻', why: 'conjugate base of the strong acid HBr', K: 0, p: { t: '\\text{HBr}', K: 0 } } },
    nahco3: { name: 'NaHCO₃', inert: 'Na⁺',
      a: { s: 'HCO₃⁻', t: '\\text{HCO}_{3}{}^{-}', eq: 'HCO₃⁻ + H₂O ⇌ H₃O⁺ + CO₃²⁻', why: 'HCO₃⁻ acting as an acid', K: 4.7e-11 },
      b: { s: 'HCO₃⁻', t: '\\text{HCO}_{3}{}^{-}', eq: 'HCO₃⁻ + H₂O ⇌ H₂CO₃ + OH⁻', why: 'HCO₃⁻ acting as a base', K: 2.3e-8, p: { t: '\\text{H}_{2}\\text{CO}_{3}', K: 4.3e-7 } } },
    na2hpo4: { name: 'Na₂HPO₄', inert: 'Na⁺',
      a: { s: 'HPO₄²⁻', t: '\\text{HPO}_{4}{}^{2-}', eq: 'HPO₄²⁻ + H₂O ⇌ H₃O⁺ + PO₄³⁻', why: 'HPO₄²⁻ acting as an acid', K: 4.2e-13 },
      b: { s: 'HPO₄²⁻', t: '\\text{HPO}_{4}{}^{2-}', eq: 'HPO₄²⁻ + H₂O ⇌ H₂PO₄⁻ + OH⁻', why: 'HPO₄²⁻ acting as a base', K: 1.6e-7, p: { t: '\\text{H}_{2}\\text{PO}_{4}{}^{-}', K: 6.2e-8 } } },
    nh4f: { name: 'NH₄F', a: NH4, b: { s: 'F⁻', t: '\\text{F}^{-}', eq: 'F⁻ + H₂O ⇌ HF + OH⁻', why: 'conjugate base of the weak acid HF', K: 1.6e-11, p: { t: '\\text{HF}', K: 6.4e-4 } } },
  };
  const salt = F.select(d.controls, { label: '\\text{salt}', key: 'salt', options: Object.keys(SALTS).map((k) => ({ value: k, label: SALTS[k].name })), value: 'nh4f', aria: 'the salt dissolved' });
  const LO = -14, HI = -4, CX = 700, HALF = 470, BY = 266, BH = 80, AY = 352;
  const len = (lg) => ((lg - LO) / (HI - LO)) * HALF;
  const lg = (K) => (K > 0 ? Math.log10(K) : LO);
  const sci = (K) => { let e = Math.floor(Math.log10(K)), m = K / Math.pow(10, e); if (+m.toFixed(1) >= 10) { m /= 10; e += 1; } return `${m.toFixed(1)} \\times 10^{${e}}`; };
  function verdict(s) {
    const { a, b } = s;
    if (!(a.K > 0) && !(b.K > 0)) return `${s.name}: neither ion reacts with water, so the solution is neutral.`;
    if (!(b.K > 0)) return `${s.name}: ${a.s} is a weak acid and ${b.s} is inert, so the solution is acidic.`;
    if (!(a.K > 0)) return `${s.name}: ${a.s} is inert and ${b.s} is a weak base, so the solution is basic.`;
    const acid = a.K > b.K;
    if (a.s === b.s) return `${s.name}: ${s.inert} is inert, and $${acid ? '\\kKa' : '\\kKbion'}$ of ${a.s} is larger than its $${acid ? '\\kKbion' : '\\kKa'}$, so the solution is ${acid ? 'acidic' : 'basic'}.`;
    return `${s.name}: $\\kKa$ of ${a.s} is ${acid ? 'larger' : 'smaller'} than $\\kKbion$ of ${b.s}, so the solution is ${acid ? 'acidic' : 'basic'}.`;
  }
  /* one ion's constant as the section finds it: from its conjugate partner's through K_w, or as given */
  function chain(io, sym, psym) {
    const L = `${sym}(${io.t})`;
    if (!io.p) return io.K > 0 ? `${L} = ${sci(io.K)}` : `${L} \\approx 0`;
    const frac = `\\frac{\\kKw}{${psym}(${io.p.t})}`;
    return io.p.K > 0 ? `${L} = ${frac} = \\frac{1.0 \\times 10^{-14}}{${sci(io.p.K)}} = ${sci(io.K)}` : `${L} = ${frac} \\approx 0`;
  }
  let hits = [];
  F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c), s = SALTS[salt.value], ck = C('equilibrium-constant');
    topline(ctx, verdict(s));
    const L = salt.mix((v) => [len(lg(SALTS[v].a.K)), len(lg(SALTS[v].b.K))]);
    const win = s.a.K > s.b.K ? 0 : s.b.K > s.a.K ? 1 : -1;
    hits = [];
    [[s.a, -1, '\\kKa', 'acid ionization makes H₃O⁺'], [s.b, 1, '\\kKbion', 'base ionization makes OH⁻']].forEach(([io, sg, sym, head], i) => {
      const mx = CX + sg * 350, xe = CX + sg * L[i];
      text(ctx, head, mx, 104, PAL.muted, { size: 22, align: 'center' });
      text(ctx, io.eq, mx, 148, PAL.ink, { size: 26, weight: 600, align: 'center' });
      text(ctx, io.why, mx, 188, PAL.muted, { size: 22, align: 'center' });
      if (L[i] > 1) {
        ctx.save(); ctx.fillStyle = alpha(ck, i === win ? 0.42 : 0.16); ctx.strokeStyle = ck; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.rect(Math.min(CX, xe), BY - BH / 2, Math.abs(xe - CX), BH); ctx.fill(); ctx.stroke(); ctx.restore();
      }
      const lab = io.K > 0 ? `$${sym} = ${sci(io.K)}$` : `$${sym} \\approx 0$`;
      text(ctx, lab, xe + sg * 16, BY, PAL.ink, { size: 24, tex: true, align: sg < 0 ? 'right' : 'left' });
      /* the mirrored axis of this half: 10^-14 in the middle, 10^-4 at the outer end */
      for (let e = LO + 1; e <= HI; e++) {
        const x = CX + sg * len(e);
        line(ctx, x, AY, x, AY + (e % 2 ? 6 : 11), PAL.muted, 2);
        if (!(e % 2)) text(ctx, `$10^{${e}}$`, x, AY + 32, PAL.muted, { size: 18, align: 'center', tex: true });
      }
      text(ctx, `$${sym}$`, CX + sg * (HALF + 44), AY, ck, { size: 26, weight: 600, align: 'center', tex: true });
    });
    /* where the shorter bar would end on the longer one's side */
    if (win >= 0 && L[1 - win] > 1) {
      const x = CX + (win ? 1 : -1) * L[1 - win];
      line(ctx, x, BY - BH / 2, x, BY + BH / 2, ck, 3, [4, 8]);
      hits.push({ x, y: BY, r: 26, name: `the length of the other bar, ${(win ? s.a : s.b).s}` });
    }
    line(ctx, CX - HALF, AY, CX + HALF, AY, PAL.muted, 3);
    line(ctx, CX, BY - BH / 2 - 14, CX, AY + 11, PAL.ink, 3);
    text(ctx, '$10^{-14}$', CX, AY + 32, PAL.muted, { size: 18, align: 'center', tex: true });
    tex(d.readout, `${chain(s.a, '\\kKa', '\\kKbion')} \\\\ ${chain(s.b, '\\kKbion', '\\kKa')}`);
  }
  still(d, draw);
})();

/* =====================================================================
   FIGURE 14.13: the hydrated aluminum ion giving up hydrogen ions, drawn
   flat from the book's ball-and-stick image in its view (the Al-O axis of
   the top and bottom water molecules upright, the other four in a
   flattened cross). The book's image sets the two sides of the first
   ionization side by side; here the hydrogen ion is seen to leave a
   bonded water molecule, cross the brackets of the complex ion and join
   a free water molecule, and the charge written on the brackets falls as
   it goes. The choice takes the same step again from the second and the
   third bonded molecule, the three equations the text prints. Flat: the
   passage is about which hydrogen leaves and what charge is left, and
   every atom has to be seen; the octahedron is the subject of the
   coordination chapter. Lengths are schematic, in angstroms: Al-O 1.9,
   O-H 0.96, H-O-H 104.5 degrees.
===================================================================== */
(function () {
  const H = 670, T = 5, T0 = 0.8, T1 = 3.4;
  const d = sim('fig-hydrated-al', H);
  const cy = cycle(() => T, 1.2);
  const step = F.choice(d.controls, { label: '\\text{ionization}', key: 'step', options: [{ value: '1', label: 'first' }, { value: '2', label: 'second' }, { value: '3', label: 'third' }], value: '1', aria: 'which of the three acid ionizations is shown', onInput: () => cy.reset() });
  const K = 86, CX = 560, CY = 352, YAW = 30 * Math.PI / 180, PITCH = 25 * Math.PI / 180;
  const AO = 1.9, OH = 0.96, HA = 52.25 * Math.PI / 180;
  const add = (p, q, k = 1) => [p[0] + q[0] * k, p[1] + q[1] * k, p[2] + q[2] * k];
  const dot3 = (p, q) => p[0] * q[0] + p[1] * q[1] + p[2] * q[2];
  const unit = (p) => { const l = Math.hypot(p[0], p[1], p[2]); return [p[0] / l, p[1] / l, p[2] / l]; };
  /* the book's view: turned about the upright axis, then tipped toward the reader; returns [x right, y up, depth] */
  const view = (p) => {
    const x = p[0] * Math.cos(YAW) + p[2] * Math.sin(YAW), z = -p[0] * Math.sin(YAW) + p[2] * Math.cos(YAW);
    return [x, p[1] * Math.cos(PITCH) - z * Math.sin(PITCH), p[1] * Math.sin(PITCH) + z * Math.cos(PITCH)];
  };
  const world = (q) => {
    const y = q[1] * Math.cos(PITCH) + q[2] * Math.sin(PITCH), z = -q[1] * Math.sin(PITCH) + q[2] * Math.cos(PITCH);
    return [q[0] * Math.cos(YAW) - z * Math.sin(YAW), y, q[0] * Math.sin(YAW) + z * Math.cos(YAW)];
  };
  /* the three free water molecules, a column to the right of the complex, placed in the view */
  const FREE = [[5.2, 0.15, 0.3], [4.95, 2.2, 0.3], [4.95, -1.95, 0.3]].map(world);
  /* the six bonded water molecules, each with the direction in the view its two hydrogens fan out along, so that
     both show; the first three (right, top, bottom) give up the hydrogen on their right, one per ionization */
  const AXES = [[[1, 0, 0], [0.3, -1, 0]], [[0, 1, 0], [1, 0, 0]], [[0, -1, 0], [1, 0, 0]], [[-1, 0, 0], [0, 1, 0]], [[0, 0, 1], [0.6, 0.8, 0]], [[0, 0, -1], [0.6, 0.8, 0]]];
  const waters = AXES.map(([u, fan], i) => {
    const o = add([0, 0, 0], u, AO), t = world(fan), w = unit(add(t, u, -dot3(t, u)));
    return { o, h: [1, -1].map((sg) => add(o, add(add([0, 0, 0], u, Math.cos(HA)), w, sg * Math.sin(HA)), OH)), gives: i < 3 ? i : -1 };
  });
  /* each free water molecule: its own two hydrogens turned away from the complex, and the place the third takes */
  const free = FREE.map((o, j) => {
    const from = waters[j].h[0], back = unit(add(from, o, -1));
    const out = world([1, 0, 0]), tilt = world([0, 0.45, 0.89]);
    return { o, h: [1, -1].map((sg) => add(o, add(add([0, 0, 0], out, Math.cos(HA)), tilt, sg * Math.sin(HA)), OH)), from, to: add(o, back, 0.98) };
  });
  const R = { Al: 0.52 * K, O: 0.4 * K, H: 0.25 * K };
  const NAME = { Al: 'the aluminum atom, Al', O: 'an oxygen atom, O', H: 'a hydrogen atom, H' };
  const FORM = ['[Al(H₂O)₆]³⁺', '[Al(H₂O)₅OH]²⁺', '[Al(H₂O)₄(OH)₂]⁺', '[Al(H₂O)₃(OH)₃]'], CHARGE = ['3+', '2+', '+', ''];
  const HEAD = [
    'A bonded water molecule gives H⁺ to a free one.',
    'A second bonded water molecule gives up H⁺.',
    'A third gives up H⁺, and the complex has no charge.',
  ];
  const EQ = [
    '\\text{Al}(\\text{H}_{2}\\text{O})_{6}{}^{3+} + \\text{H}_{2}\\text{O} \\rightleftharpoons \\text{H}_{3}\\text{O}^{+} + \\text{Al}(\\text{H}_{2}\\text{O})_{5}(\\text{OH})^{2+} \\\\ \\kKa = \\frac{\\kconcHyd[\\text{Al}(\\text{H}_{2}\\text{O})_{5}(\\text{OH})^{2+}]}{[\\text{Al}(\\text{H}_{2}\\text{O})_{6}{}^{3+}]} = 1.4 \\times 10^{-5}',
    '\\text{Al}(\\text{H}_{2}\\text{O})_{5}(\\text{OH})^{2+} + \\text{H}_{2}\\text{O} \\rightleftharpoons \\text{H}_{3}\\text{O}^{+} + \\text{Al}(\\text{H}_{2}\\text{O})_{4}(\\text{OH})_{2}{}^{+}',
    '\\text{Al}(\\text{H}_{2}\\text{O})_{4}(\\text{OH})_{2}{}^{+} + \\text{H}_{2}\\text{O} \\rightleftharpoons \\text{H}_{3}\\text{O}^{+} + \\text{Al}(\\text{H}_{2}\\text{O})_{3}(\\text{OH})_{3}',
  ];
  const BX = 3.2, BYT = 3.05;                  /* the brackets round the complex, in angstroms from Al */
  const X = (q) => CX + q[0] * K, Y = (q) => CY - q[1] * K;
  let hits = [];
  F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c), n = +step.value, t = cy.now();
    const k = F.ease.smooth(Math.max(0, Math.min(1, (t - T0) / (T1 - T0))));
    const moved = (j) => (j < n - 1 ? 1 : j === n - 1 ? k : 0);          /* how far hydrogen ion j has gone */
    topline(ctx, HEAD[n - 1]);
    /* everything drawn, far to near: balls and the sticks between them */
    const balls = [], sticks = [];
    const ball = (el, p, name) => { const q = view(p); balls.push({ el, q, name: name ?? NAME[el] }); return q; };
    const stick = (a, b, col, w) => sticks.push({ a, b, col, w, z: (a[2] + b[2]) / 2 });
    const al = ball('Al', [0, 0, 0]);
    let inTransit = null, lost = 0;
    waters.forEach((w) => {
      const o = ball('O', w.o);
      stick(al, o, PAL.muted, 6);
      w.h.forEach((h, i) => {
        if (i === 0 && w.gives >= 0 && moved(w.gives) > 0) return;
        stick(o, ball('H', h), PAL.ink, 5);
      });
    });
    free.forEach((f, j) => {
      const o = ball('O', f.o), m = moved(j);
      f.h.forEach((h) => stick(o, ball('H', h), PAL.ink, 5));
      if (m <= 0) return;
      const q = ball('H', add(f.from, add(f.to, f.from, -1), m), m < 1 ? 'the hydrogen ion on its way, H⁺' : undefined);
      if (m >= 1) stick(o, q, PAL.ink, 5); else inTransit = q;
      if (q[0] > BX) lost++;
    });
    const all = sticks.map((s) => ({ z: s.z - 0.01, s })).concat(balls.map((b) => ({ z: b.q[2], b }))).sort((p, q) => p.z - q.z);
    hits = [];
    all.forEach(({ s, b }) => {
      if (s) { line(ctx, X(s.a), Y(s.a), X(s.b), Y(s.b), s.col, s.w); return; }
      const r = R[b.el] * (1 + 0.035 * b.q[2]);
      ctx.save(); ctx.fillStyle = F.el(b.el); ctx.strokeStyle = alpha(PAL.ink, 0.6); ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(X(b.q), Y(b.q), r, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore();
      hits.push({ x: X(b.q), y: Y(b.q), r, name: b.name });
    });
    /* the brackets of the complex ion and the charge on them */
    const xl = CX - BX * K, xr = CX + BX * K, yt = CY - BYT * K, yb = CY + BYT * K, lip = 26;
    [[xl, 1], [xr, -1]].forEach(([x, sg]) => { line(ctx, x + sg * lip, yt, x, yt, PAL.ink, 4); line(ctx, x, yt, x, yb, PAL.ink, 4); line(ctx, x, yb, x + sg * lip, yb, PAL.ink, 4); });
    text(ctx, CHARGE[lost], xr + 14, yt + 6, PAL.ink, { size: 34, weight: 600 });
    text(ctx, FORM[lost], CX, yb + 34, PAL.ink, { size: 26, weight: 600, align: 'center' });
    free.forEach((f, j) => { const q = view(f.o); text(ctx, moved(j) >= 1 ? 'H₃O⁺' : 'H₂O', X(q) + 1.5 * K, Y(q), PAL.ink, { size: 26, weight: 600 }); });
    if (inTransit) text(ctx, 'H⁺', X(inTransit), Y(inTransit) - R.H - 16, PAL.ink, { size: 22, weight: 600, align: 'center' });
    const key = (el) => ({ s: { Al: 'aluminum', O: 'oxygen', H: 'hydrogen' }[el], draw: (c, x, y) => { c.save(); c.fillStyle = F.el(el); c.strokeStyle = alpha(PAL.ink, 0.6); c.lineWidth = 1.5; c.beginPath(); c.arc(x, y, 10, 0, TAU); c.fill(); c.stroke(); c.restore(); } });
    F.legend(ctx, { l: 24, r: 260, t: 84, b: 300 }, ['Al', 'O', 'H'].map(key), { corner: 'tl', panel: false, size: 20 });
    tex(d.readout, EQ[n - 1], false, { values: false });
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();

};
