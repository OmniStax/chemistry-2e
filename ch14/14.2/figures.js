/* Figures for section 14.2 pH and pOH. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['14.2'] = function (root, F) {
const { tex, C, PAL, alpha, register, begin, line, text, dot, arrow, topline } = F;
const sim = (id, H) => F.sim(root, id, H);
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;
const minus = (s) => String(s).replace(/^-/, '−');
const clamp01 = (x) => Math.max(0, Math.min(1, x));

/* =====================================================================
   FIGURE 14.2: the book's pH and pOH chart with its two concentration
   columns drawn as a graph. Rows are pH −1 to 15, top to bottom, as the
   book has them; across, a log axis 10⁻¹⁵ to 10¹ M. [H3O+] = 10^−pH and
   [OH−] = 10^(pH − pKw) are two straight lines that cross on the neutral
   row. Still: the pH slider moves one solution's row, a dot where it
   cuts each line; the temperature choice slides the [OH−] line and the
   pOH column 1.38 rows (pKw 14.00 at 25 °C, 12.62 at 80 °C from the
   text's 4.9 × 10⁻⁷ M), and the crossing moves to pH 6.31. The sample
   solutions sit at the pH read off the book's scale, at 25 °C only;
   pure water stays, at the neutral pH. Opens on Example 14.4's solution.
===================================================================== */
(function () {
  const d = sim('sim-ph-scale', 984);
  const PKW = { 25: 14.0, 80: 12.62 };
  const TOP = 150, ROW = 46, BOT = TOP + 17 * ROW, L = 40, R = 1360, HEAD = 104;
  const GC = 672, CP = 772, CS = 872, SX = 940;       /* column edges: graph | pH | pOH | samples; the scale's line */
  const y = (p) => TOP + (p + 1.5) * ROW;
  const X = (lg) => 84 + (lg + 15) * 34;              /* log₁₀ of a concentration, −15 … 1, fixed */
  const SOL = [
    ['1 M HCl', 0, 0], ['gastric juice', 1.5, 1.15], ['lime juice', 2.0, 1.72], ['1 M CH₃CO₂H (vinegar)', 2.4, 2.35],
    ['stomach acid', 2.9, 2.9], ['wine', 3.5, 3.55], ['orange juice', 4.2, 4.2], ['coffee', 5.0, 5.05], ['rain water', 5.7, 5.7],
    ['blood', 7.4, 7.6], ['ocean water', 8.0, 8.2], ['baking soda', 8.4, 8.8],
    ['Milk of Magnesia', 10.5, 10.5], ['household ammonia, NH₃', 11.9, 11.85], ['bleach', 12.6, 12.6], ['1 M NaOH', 14.0, 14.0],
  ];
  let tc = null;
  const ph = F.ctl(d.controls, {
    label: '\\kpH', cls: 'concentration', min: -1, max: 15, step: 0.01, value: 2.92, unit: '', dec: 2,
    aria: 'pH of the solution', specials: [{ at: () => PKW[tc ? tc.value : '25'] / 2, label: 'neutral' }],
  });
  tc = F.choice(d.controls, { label: '\\kT', options: [{ value: '25', label: '25 °C' }, { value: '80', label: '80 °C' }], value: '25', aria: 'temperature of the solutions' });
  let hits = [];
  F.hover(d.stage, () => hits);
  /* a concentration to three significant figures, so that its logarithm gives back the pH shown: [mantissa, exponent] */
  function parts(p) {
    let e = Math.floor(-p + 1e-9), m = 10 ** (-p - e);
    if (+m.toFixed(2) >= 10) { m /= 10; e += 1; }
    return e === 1 ? [(m * 10).toFixed(1), 0] : [m.toFixed(2), e];
  }
  const SUP = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
  const plain = (p) => { const [m, e] = parts(p); return (e === 0 ? m : `${m} × 10${String(e).replace(/./g, (c) => SUP[c])}`) + ' M'; };
  const texed = (p) => { const [m, e] = parts(p); return e === 0 ? m : `${m}\\times10^{${e}}`; };
  function draw() {
    const { ctx } = begin(d.c), cC = C('concentration'), cH = F.cat(0), cO = F.cat(1);
    const pkw = tc.mix((v) => PKW[v]), pkwNow = PKW[tc.value], p = ph.v, ym = y(p), poh = pkwNow - p;
    hits = [];
    const near = (yy) => clamp01((Math.abs(yy - ym) - 24) / 12);   /* a row value the marker's panels would touch fades */
    const inside = (yy) => clamp01((yy - TOP - 12) / 12) * clamp01((BOT - yy - 12) / 12);
    const yN = y(pkw / 2);
    ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.07); ctx.fillRect(L, yN - ROW * 0.45, R - L, ROW * 0.9); ctx.restore();

    /* the frame: header, columns, and the graph's grid, a line per row and per power of ten */
    const rule = alpha(PAL.ink, 0.3), grid = alpha(PAL.ink, 0.1);
    for (let k = -1; k <= 15; k++) line(ctx, X(-15), y(k), X(1), y(k), grid, 2);
    for (let k = -15; k <= 1; k++) line(ctx, X(k), y(-1), X(k), y(15), grid, 2);
    line(ctx, L, HEAD, R, HEAD, rule, 2); line(ctx, L, TOP, R, TOP, rule, 2); line(ctx, L, BOT, R, BOT, rule, 2);
    [L, GC, CP, CS, R].forEach((x) => line(ctx, x, HEAD, x, BOT, rule, 2));
    text(ctx, 'concentration (M)', (L + GC) / 2, 127, cC, { size: 22, weight: 600, align: 'center' });
    text(ctx, '$\\kpH$', (GC + CP) / 2, 127, cC, { size: 22, weight: 600, align: 'center', tex: true });
    text(ctx, '$\\kpOH$', (CP + CS) / 2, 127, cC, { size: 22, weight: 600, align: 'center', tex: true });
    text(ctx, 'Sample Solution', (CS + R) / 2, 127, PAL.ink, { size: 22, weight: 600, align: 'center' });
    for (let k = -15; k <= 1; k += 2) {
      line(ctx, X(k), BOT, X(k), BOT + 8, rule, 2);
      text(ctx, `$10^{${k}}$`, X(k), BOT + 28, PAL.muted, { size: 19, align: 'center', tex: true });
    }
    for (let k = -1; k <= 15; k++) {
      const a = near(y(k));
      if (a > 0) F.faded(ctx, a, [0, 0], () => text(ctx, minus(k), (GC + CP) / 2, y(k), PAL.ink, { size: 22, align: 'center' }));
    }
    for (let k = -3; k <= 16; k++) {
      const yy = y(pkw - k), a = near(yy) * inside(yy);
      if (a > 0) F.faded(ctx, a, [0, 0], () => text(ctx, minus(k), (CP + CS) / 2, yy, PAL.ink, { size: 22, align: 'center' }));
    }

    /* the two lines: [H3O+] falls a power of ten a row, [OH−] rises one, and they cross on the neutral row */
    const xH = (pp) => X(-pp), xO = (pp) => X(pp - pkw), pO1 = Math.min(15, pkw + 1);
    line(ctx, xH(-1), y(-1), xH(15), y(15), cH, 5);
    line(ctx, xO(-1), y(-1), xO(pO1), y(pO1), cO, 5);
    const named = clamp01((Math.abs(y(0.3) - ym) - 80) / 16);
    if (named > 0) F.faded(ctx, named, [0, 0], () => {
      text(ctx, '[H₃O⁺]', xH(0.3) - 20, y(0.3), cH, { size: 24, weight: 600, align: 'right' });
      text(ctx, '[OH⁻]', xO(0.3) + 20, y(0.3), cO, { size: 24, weight: 600 });
    });

    /* the sample solutions on the book's scale */
    line(ctx, SX, TOP, SX, BOT, PAL.ink, 3);
    for (let k = -1; k <= 15; k++) line(ctx, SX - 12, y(k), SX, y(k), PAL.ink, 3);
    const sample = (name, pv, lp, say) => {
      const on = Math.abs(p - pv) < 0.05, yl = y(lp);
      arrow(ctx, SX + 80, yl, SX + 4, y(pv), on ? cC : PAL.ink, 2);
      text(ctx, name, SX + 90, yl, on ? cC : PAL.ink, { size: 21, weight: on ? 600 : 400 });
      hits.push({ x: SX + 150, y: yl, r: 22, name: `${name}: ${say}` });
    };
    tc.only(ctx, '25', () => { for (const [name, pv, lp] of SOL) sample(name, pv, lp, `pH about ${pv.toFixed(1)} at 25 °C`); }, [0, 0]);
    sample('pure water', pkw / 2, pkw / 2, `pH ${(pkwNow / 2).toFixed(2)} at ${tc.value} °C`);
    const AX = 1326;
    arrow(ctx, AX, yN - 16, AX, y(-0.6), PAL.ink, 4);
    arrow(ctx, AX, yN + 16, AX, y(14.6), PAL.ink, 4);
    text(ctx, 'acidic', AX - 22, y(0.2), PAL.ink, { size: 22, align: 'right' });
    text(ctx, 'neutral', AX - 22, yN, PAL.ink, { size: 22, align: 'right' });
    text(ctx, 'basic', AX - 22, y(13.8), PAL.ink, { size: 22, align: 'right' });

    /* the solution's row: a dot on each line, dropped to the axis, its value beside the line it belongs to */
    const hx = xH(p), oRaw = xO(p), ox = Math.min(oRaw, X(1)), off = oRaw > X(1) + 0.5;
    line(ctx, hx, ym, hx, BOT, alpha(cH, 0.7), 2, [4, 8]);
    if (!off) line(ctx, ox, ym, ox, BOT, alpha(cO, 0.7), 2, [4, 8]);
    line(ctx, L, ym, SX, ym, cC, 3);
    dot(ctx, SX, ym, cC, true, 9);
    dot(ctx, hx, ym, cH, true, 10);
    dot(ctx, ox, ym, cO, !off, 10);
    const up = ym - 30 >= TOP + 16, down = ym + 30 <= BOT - 16;
    const span = (f, yc) => { const a = f((yc - 15 - TOP) / ROW - 1.5), b = f((yc + 15 - TOP) / ROW - 1.5); return [Math.min(a, b), Math.max(a, b)]; };
    /* a value stands beside its own line, on the side that keeps it off the other line and inside the graph */
    function value(s, color, xd, own, other, otherDrop, dy) {
      const yc = ym + dy, w = F.measure(ctx, s, { size: 22, weight: 600 }) + 12;
      const [a, b] = span(own, yc), avoid = [span(other, yc)];
      if (dy > 0) avoid.push([otherDrop, otherDrop]);
      const lo = L + 8, hi = GC - 8;
      const ok = (x0) => x0 >= lo && x0 + w <= hi && avoid.every(([c, e]) => x0 + w < c - 8 || x0 > e + 8);
      const cands = [Math.min(a, xd) - 14 - w, Math.max(b, xd) + 14];
      const far = (x0) => Math.min(...avoid.map(([c, e]) => Math.min(Math.abs(x0 - e), Math.abs(x0 + w - c))));
      const good = cands.filter(ok).sort((u, v) => far(v) - far(u));
      const x0 = good.length ? good[0] : Math.max(lo, Math.min(hi - w, cands[xd > (lo + hi) / 2 ? 0 : 1]));
      text(ctx, s, x0 + w / 2, yc, color, { size: 22, weight: 600, align: 'center', bg: PAL.panel });
    }
    const xOc = (pp) => Math.min(xO(pp), X(1));
    value(plain(p), cH, hx, xH, xOc, ox, up ? -30 : 30);
    value(plain(poh), cO, ox, xOc, xH, hx, down ? 30 : -30);
    hits.push({ x: hx, y: ym, r: 16, name: `[H₃O⁺] = ${plain(p)}` }, { x: ox, y: ym, r: 16, name: `[OH⁻] = ${plain(poh)}` });
    const chip = { size: 22, weight: 600, bg: PAL.panel, align: 'center' };
    text(ctx, minus(p.toFixed(2)), (GC + CP) / 2, ym, cC, chip);
    text(ctx, minus(poh.toFixed(2)), (CP + CS) / 2, ym, cC, chip);

    const diff = p - pkwNow / 2, kind = Math.abs(diff) < 0.005 ? 'neutral' : diff < 0 ? 'acidic' : 'basic';
    const rel = kind === 'neutral' ? 'equals' : kind === 'acidic' ? 'is greater than' : 'is less than';
    topline(ctx, `At ${tc.value} °C, pH ${minus(p.toFixed(2))} is ${kind}: $\\kconcHyd$ ${rel} $\\kconcOH$.`);
    const Hc = (s) => hue('concentration', s), n2 = (v) => (v < 0 ? `(${Hc(minus(v.toFixed(2)))})` : Hc(v.toFixed(2)));
    tex(d.readout,
      `\\kpH = -\\log\\kconcHyd = -\\log(${Hc(texed(p))}) = ${Hc(minus(p.toFixed(2)))} \\\\ ` +
      `\\kpOH = -\\log\\kconcOH = -\\log(${Hc(texed(poh))}) = ${Hc(minus(poh.toFixed(2)))} \\\\ ` +
      `\\kpKw = \\kpH + \\kpOH = ${n2(p)} + ${n2(poh)} = ${hue('equilibrium-constant', pkwNow.toFixed(2))}`);
  }
  register(d.fig, { update: () => {}, draw });
})();
};
