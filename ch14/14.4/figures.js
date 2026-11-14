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

};
