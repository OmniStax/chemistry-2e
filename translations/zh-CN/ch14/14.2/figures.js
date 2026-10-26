/* Figures for section 14.2 pH and pOH. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['14.2'] = function (root, F) {
const { tex, C, PAL, alpha, register, begin, line, text, dot, arrow, topline } = F;
const sim = (id, H) => F.sim(root, id, H);
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;
const minus = (s) => String(s).replace(/^-/, '−');
const clamp01 = (x) => Math.max(0, Math.min(1, x));

/* =====================================================================
   FIGURE 14.2: the book's pH and pOH chart, rows pH −1 to 15 top to
   bottom, columns [H3O+], [OH−], pH, pOH and the sample-solution scale.
   Still: a pH slider moves one solution's row marker, its four values
   on panels; the temperature choice slides the [OH−] and pOH columns
   against the pH column (pOH = pKw − pH; pKw 14.00 at 25 °C, 12.62 at
   80 °C from the text's 4.9 × 10⁻⁷ M), the neutral band with them. The
   solutions sit at the pH read off the book's scale, at 25 °C only.
===================================================================== */
(function () {
  const d = sim('sim-ph-scale', 952);
  const PKW = { 25: 14.0, 80: 12.62 };
  const TOP = 150, ROW = 46, BOT = TOP + 17 * ROW, L = 40, R = 1360, HEAD = 104;
  const COL = [L, 230, 420, 550, 680];
  const SX = 760;
  const y = (p) => TOP + (p + 1.5) * ROW;
  const SOL = [
    ['1 M HCl', 0, 0], ['gastric juice', 1.5, 1.25], ['lime juice', 2.0, 1.8], ['1 M CH_{3}CO_{2}H (vinegar)', 2.4, 2.35],
    ['stomach acid', 2.9, 2.9], ['wine', 3.5, 3.55], ['orange juice', 4.2, 4.2], ['coffee', 5.0, 5.05], ['rain water', 5.7, 5.7],
    ['pure water', 7.0, 7.0], ['blood', 7.4, 7.6], ['ocean water', 8.0, 8.2], ['baking soda', 8.4, 8.75],
    ['Milk of Magnesia', 10.5, 10.5], ['household ammonia, NH_{3}', 11.9, 11.85], ['bleach', 12.6, 12.6], ['1 M NaOH', 14.0, 14.0],
  ];
  let tc = null;
  const ph = F.ctl(d.controls, {
    label: '\\kpH', cls: 'concentration', min: -1, max: 15, step: 0.01, value: 7, unit: '', dec: 2,
    aria: 'pH of the solution', specials: [{ at: () => PKW[tc ? tc.value : '25'] / 2, label: 'neutral' }],
  });
  tc = F.choice(d.controls, { label: '\\kT', options: [{ value: '25', label: '25 °C' }, { value: '80', label: '80 °C' }], value: '25', aria: 'temperature of the solutions' });
  let hits = [];
  F.hover(d.stage, () => hits);
  /* a concentration to two significant figures as TeX */
  function conc(p) {
    let e = Math.floor(-p + 1e-9), m = 10 ** (-p - e);
    if (+m.toFixed(1) >= 10) { m /= 10; e += 1; }
    return e === 0 ? m.toFixed(1) : `${m.toFixed(1)}\\times10^{${e}}`;
  }
  const power = (k) => (k === 0 ? '$10^{0}$ or 1' : `$10^{${-k}}$`);
  function draw() {
    const { ctx } = begin(d.c), cC = C('concentration'), pkw = tc.mix((v) => PKW[v]), pkwNow = PKW[tc.value], p = ph.v, ym = y(p);
    hits = [];
    const near = (yy) => clamp01((Math.abs(yy - ym) - 18) / 14);
    const inside = (yy) => clamp01((yy - TOP - 12) / 12) * clamp01((BOT - yy - 12) / 12);
    const yN = y(pkw / 2);
    ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.07); ctx.fillRect(L, yN - ROW * 0.45, R - L, ROW * 0.9); ctx.restore();
    const rule = alpha(PAL.ink, 0.3);
    line(ctx, L, HEAD, R, HEAD, rule, 2); line(ctx, L, TOP, R, TOP, rule, 2); line(ctx, L, BOT, R, BOT, rule, 2);
    [...COL, R].forEach((x) => line(ctx, x, HEAD, x, BOT, rule, 2));
    text(ctx, '$\\kconcHyd$ (M)', (COL[0] + COL[1]) / 2, 127, cC, { size: 22, weight: 600, align: 'center', tex: true });
    text(ctx, '$\\kconcOH$ (M)', (COL[1] + COL[2]) / 2, 127, cC, { size: 22, weight: 600, align: 'center', tex: true });
    text(ctx, '$\\kpH$', (COL[2] + COL[3]) / 2, 127, cC, { size: 22, weight: 600, align: 'center', tex: true });
    text(ctx, '$\\kpOH$', (COL[3] + COL[4]) / 2, 127, cC, { size: 22, weight: 600, align: 'center', tex: true });
    text(ctx, 'Sample Solution', (COL[4] + R) / 2, 127, PAL.ink, { size: 22, weight: 600, align: 'center' });
    for (let k = -1; k <= 15; k++) {
      const yy = y(k), a = near(yy);
      if (a <= 0) continue;
      F.faded(ctx, a, [0, 0], () => {
        text(ctx, power(k), COL[0] + 22, yy, PAL.ink, { size: 22, tex: true });
        text(ctx, minus(k), (COL[2] + COL[3]) / 2, yy, PAL.ink, { size: 22, align: 'center' });
      });
    }
    for (let k = -3; k <= 16; k++) {
      const yy = y(pkw - k), a = near(yy) * inside(yy);
      if (a <= 0) continue;
      F.faded(ctx, a, [0, 0], () => {
        text(ctx, power(k), COL[1] + 22, yy, PAL.ink, { size: 22, tex: true });
        text(ctx, minus(k), (COL[3] + COL[4]) / 2, yy, PAL.ink, { size: 22, align: 'center' });
      });
    }
    line(ctx, SX, TOP, SX, BOT, PAL.ink, 3);
    for (let k = -1; k <= 15; k++) line(ctx, SX - 12, y(k), SX, y(k), PAL.ink, 3);
    tc.only(ctx, '25', () => {
      for (const [name, pv, lp] of SOL) {
        const yl = y(lp);
        arrow(ctx, SX + 80, yl, SX + 4, y(pv), PAL.ink, 2);
        text(ctx, name, SX + 90, yl, PAL.ink, { size: 21 });
        hits.push({ x: SX + 150, y: yl, r: 22, name: `${name.replace(/_\{(\d)\}/g, (m, n) => '₀₁₂₃₄₅₆₇₈₉'[n])}: pH about ${pv.toFixed(1)} at 25 °C` });
      }
    }, [0, 0]);
    const AX = 1320;
    arrow(ctx, AX, yN - 16, AX, y(-0.6), PAL.ink, 4);
    arrow(ctx, AX, yN + 16, AX, y(14.6), PAL.ink, 4);
    text(ctx, 'acidic', AX - 22, y(0.2), PAL.ink, { size: 22, align: 'right' });
    text(ctx, 'neutral', AX - 22, yN, PAL.ink, { size: 22, align: 'right' });
    text(ctx, 'basic', AX - 22, y(13.8), PAL.ink, { size: 22, align: 'right' });
    line(ctx, L, ym, SX, ym, cC, 3);
    dot(ctx, SX, ym, cC, true, 9);
    const poh = pkwNow - p, chip = { size: 22, weight: 600, bg: PAL.panel };
    text(ctx, `$${conc(p)}$`, COL[0] + 22, ym, cC, { ...chip, tex: true });
    text(ctx, `$${conc(poh)}$`, COL[1] + 22, ym, cC, { ...chip, tex: true });
    text(ctx, minus(p.toFixed(2)), (COL[2] + COL[3]) / 2, ym, cC, { ...chip, align: 'center' });
    text(ctx, minus(poh.toFixed(2)), (COL[3] + COL[4]) / 2, ym, cC, { ...chip, align: 'center' });
    const diff = p - pkwNow / 2, kind = Math.abs(diff) < 0.005 ? 'neutral' : diff < 0 ? 'acidic' : 'basic';
    const rel = kind === 'neutral' ? 'equals' : kind === 'acidic' ? 'is greater than' : 'is less than';
    topline(ctx, `At ${tc.value} °C, pH ${minus(p.toFixed(2))} is ${kind}: $\\kconcHyd$ ${rel} $\\kconcOH$.`);
    const H = (v) => (v < 0 ? `(${hue('concentration', minus(v.toFixed(2)))})` : hue('concentration', v.toFixed(2)));
    tex(d.readout, `\\kpH + \\kpOH = ${H(p)} + ${H(poh)} = \\kpKw = ${hue('equilibrium-constant', pkwNow.toFixed(2))}`);
  }
  register(d.fig, { update: () => {}, draw });
})();
};
