/* Figures for section 14.6 Buffers. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['14.6'] = function (root, F) {
const { C, PAL, alpha, ctl, register, begin, line, text, dot, topline } = F;
const sim = (id, H) => F.sim(root, id, H);
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;
const SUP = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
const sup = (n) => String(n).split('').map((c) => SUP[c]).join('');
/* x to three significant figures: plain from 0.001 up, otherwise m × 10ⁿ; as figure text and as TeX */
function sig(x, n = 3) {
  let e = Math.floor(Math.log10(Math.abs(x)));
  if (e >= -3) return { plain: x.toFixed(Math.max(0, n - 1 - e)) };
  let m = (x / 10 ** e).toFixed(n - 1);
  if (+m >= 10) { e += 1; m = (x / 10 ** e).toFixed(n - 1); }
  return { m, e };
}
const sigTex = (x, n) => { const s = sig(x, n); return s.plain ?? `${s.m} \\times 10^{${s.e}}`; };
const sigNum = (x, n) => { const s = sig(x, n); return +(s.plain ?? `${s.m}e${s.e}`); };
const amt = (x) => (x <= 0 ? '0' : x >= 100 ? x.toFixed(0) : x.toPrecision(3));

/* =====================================================================
   FIGURE 14.15 + 14.17: 100 mL of an acetate buffer, c in each partner
   (0.10 M, the book's, 0.050 M or 0.025 M), beside 100 mL of
   1.8 × 10⁻⁵ M HCl (pH 4.74, Example 14.20's unbuffered solution), each
   given the same volume of 0.10 M HCl or NaOH. Ka 1.8 × 10⁻⁵, Kw
   1.0 × 10⁻¹⁴. Above, what each solution holds, in mmol on one fixed
   scale (0 to 20): CH₃CO₂H, CH₃CO₂⁻ (the bars of 14.15) and the H₃O⁺ or
   OH⁻ left free, inside a dashed outline of what was added. Below, pH
   against the volume added (14.17 is the right half), HCl to the left of
   zero and NaOH to the right, for both solutions, each from the exact
   charge balance Na⁺ + H₃O⁺ = CH₃CO₂⁻ + OH⁻ + Cl⁻. Axes fixed: −120 to
   120 mL (the slider's range), pH 0 to 14; the unbuffered solution runs
   from 1.26 to 12.74, so nothing is pinned.
   Still: adding acid or base is an amount, not a clock.
===================================================================== */
(function () {
  const d = sim('sim-buffer', 910);
  const KA = 1.8e-5, KW = 1e-14, V0 = 100, CT = 0.1, H0 = 1.8e-5, PKA = '4.74', VMAX = 120, NTOP = 20;
  /* the volume that leaves the consumed partner at 11 % of the other, where the pH has moved one unit */
  const capOf = (c) => (c * V0 * (0.89 / 1.11)) / CT;
  let buf = null, vol = null;
  vol = ctl(d.controls, {
    label: '\\text{added}', cls: 'volume', key: 'added', min: -VMAX, max: VMAX, step: 0.1, value: 1, unit: 'mL',
    fmt: (v) => (Math.abs(v) < 0.05 ? 'nothing' : `${Math.abs(v).toFixed(1)} mL of ${v < 0 ? 'HCl' : 'NaOH'}`),
    aria: 'volume of 0.10 M strong acid or base added to each solution, hydrochloric acid below zero and sodium hydroxide above',
    specials: [
      { at: () => { const x = capOf(+buf.value); return x <= VMAX ? x : null; }, label: 'buffer capacity for base' },
      { at: () => { const x = capOf(+buf.value); return x <= VMAX ? -x : null; }, label: 'buffer capacity for acid' },
    ],
  });
  buf = F.choice(d.controls, {
    label: '\\text{each buffer partner}', aria: 'the concentration of acetic acid and of acetate in the buffer', value: '0.1',
    options: [{ value: '0.025', label: '0.025 M' }, { value: '0.05', label: '0.050 M' }, { value: '0.1', label: '0.10 M' }],
    onInput: () => vol && vol.refresh(),
  });
  const ro = F.readout(d);
  let hits = [];
  F.hover(d.stage, () => hits);

  /* the hydronium molarity where the charge balance closes, by bisection on log h */
  function solve(f) {
    let lo = -15, hi = 1;
    for (let i = 0; i < 60; i++) { const m = (lo + hi) / 2; if (f(10 ** m) > 0) hi = m; else lo = m; }
    return 10 ** ((lo + hi) / 2);
  }
  /* s is the volume added in mL: HCl below zero, NaOH above */
  function hBuf(c, s) {
    const x = Math.abs(s) * CT, V = V0 + Math.abs(s), CA = (2 * c * V0) / V, Na = (c * V0 + (s > 0 ? x : 0)) / V, Cl = (s < 0 ? x : 0) / V;
    return solve((h) => Na + h - Cl - (CA * KA) / (KA + h) - KW / h);
  }
  function hUn(s) {
    const V = V0 + Math.abs(s), D = (H0 * V0 - s * CT) / V, r = Math.sqrt(D * D + 4 * KW);
    return D >= 0 ? (D + r) / 2 : (2 * KW) / (r - D);
  }
  const pUn = (s) => -Math.log10(hUn(s));
  /* the buffer's curve is sampled once per concentration, finely where it is steep, and read by interpolation */
  const tables = new Map();
  function pBuf(c) {
    if (!tables.has(c)) {
      const N = 2400, t = Float64Array.from({ length: N + 1 }, (_, i) => -Math.log10(hBuf(c, -VMAX + (2 * VMAX * i) / N)));
      tables.set(c, (s) => { const u = Math.min(N, Math.max(0, ((s + VMAX) / (2 * VMAX)) * N)), i = Math.min(N - 1, Math.floor(u)); return t[i] + (t[i + 1] - t[i]) * (u - i); });
    }
    return tables.get(c);
  }

  /* an amount in mmol: three figures, or m × 10ⁿ below 0.0005 */
  const mmol = (m) => {
    if (m <= 0) return '0';
    if (m >= 0.0005) return m >= 100 ? m.toFixed(0) : m.toPrecision(3);
    const s = sig(m, 2); return `${s.m} × 10${sup(s.e)}`;
  };
  const molar = (x) => `${sigTex(x)}\\ \\text{M}`;

  const P = [{ l: 110 }, { l: 790 }], SLOT = [72, 236, 400], BW = 130, PW = 560, TOP = 112, BASE = 392;
  const G = { l: 110, r: 1350, t: 520, b: 826 };
  function draw() {
    const { ctx, H } = begin(d.c);
    hits = [];
    const c = +buf.value, s = Math.abs(vol.v) < 0.05 ? 0 : vol.v, x = Math.abs(s) * CT, V = V0 + Math.abs(s), base = s > 0;
    const cA = C('amount'), cC = C('concentration'), cV = C('volume'), cB = F.ref('buffer'), cU = F.ref('unbuffered');
    const a0 = c * V0;
    /* the strong acid or base turns one partner into the other until that partner is gone; past it the excess stays as H₃O⁺ or OH⁻ */
    const ha = Math.max(0, Math.min(2 * a0, a0 - (base ? x : -x))), ab = Math.max(0, Math.min(2 * a0, a0 + (base ? x : -x)));
    const spent = Math.min(ha, ab) <= 0, ratio = ab / ha, hh = !spent && ratio >= 0.01 && ratio <= 100;
    const hB = hBuf(c, s), hU = hUn(s);

    /* the buffer's pH as the book works it: Henderson-Hasselbalch on the stoichiometric concentrations while both partners remain */
    let pB, texB, form, note = '';
    if (hh) {
      pB = (+PKA + Math.log10(sigNum(ab / V) / sigNum(ha / V))).toFixed(2);
      texB = `\\mk{p}{\\kpH} = \\mk{k}{\\kpKa} + \\log\\frac{\\kconcAm}{\\kconcHA} = \\mk{kv}{${hue('equilibrium-constant', PKA)}} + \\log\\frac{\\mk{A}{${hue('concentration', molar(ab / V))}}}{\\mk{HA}{${hue('concentration', molar(ha / V))}}} = \\mk{v}{${hue('concentration', pB)}}`;
      form = 'hh';
    } else if (base) {
      const oh = sigNum(KW / hB);
      pB = (14 + Math.log10(oh)).toFixed(2);
      texB = `\\mk{p}{\\kpH} = ${hue('equilibrium-constant', '14.00')} + \\log\\kconcOH = ${hue('equilibrium-constant', '14.00')} + \\log(\\mk{c}{${hue('concentration', molar(oh))}}) = \\mk{v}{${hue('concentration', pB)}}`;
      form = 'base';
    } else {
      const hy = sigNum(hB);
      pB = (-Math.log10(hy)).toFixed(2);
      texB = `\\mk{p}{\\kpH} = -\\log\\kconcHyd = -\\log(\\mk{c}{${hue('concentration', molar(hy))}}) = \\mk{v}{${hue('concentration', pB)}}`;
      form = 'acid';
    }
    if (spent) note = base
      ? `All ${mmol(a0)} mmol of CH₃CO₂H is used up, so the OH⁻ added after that stays in the buffer too.`
      : `All ${mmol(a0)} mmol of CH₃CO₂⁻ is used up, so the H₃O⁺ added after that stays in the buffer too.`;
    /* the unbuffered solution's, from what is left of the strong acid or base, as Example 14.20(c) works it */
    let pU, texU;
    if (hU < 1e-7) {
      const oh = sigNum(KW / hU);
      pU = (14 + Math.log10(oh)).toFixed(2);
      texU = `\\kpH = ${hue('equilibrium-constant', '14.00')} + \\log\\kconcOH = ${hue('equilibrium-constant', '14.00')} + \\log(${hue('concentration', molar(oh))}) = ${hue('concentration', pU)}`;
    } else {
      const hy = sigNum(hU);
      pU = (-Math.log10(hy)).toFixed(2);
      texU = `\\kpH = -\\log\\kconcHyd = -\\log(${hue('concentration', molar(hy))}) = ${hue('concentration', pU)}`;
    }

    /* what each solution holds: the two partners and the strong acid or base still free, on one scale of amount */
    const free = base ? 'OH⁻' : 'H_{3}O⁺', freeU = free.replace('_{3}', '₃');
    const names = ['CH_{3}CO_{2}H', 'CH_{3}CO_{2}⁻', free], plain = ['CH₃CO₂H', 'CH₃CO₂⁻', freeU];
    const cols = [F.cat(0), F.cat(1), F.cat(base ? 2 : 3)];
    const k = buf.k < 1 ? buf.mix((v) => +v) / c : 1;          /* the bars slide to a new concentration; their numbers do not */
    const held = [
      { name: 'unbuffered solution', col: cU, pH: pU, m: [0, 0, (base ? KW / hU : hU) * V] },
      { name: 'acetate buffer', col: cB, pH: pB, m: [ha, ab, (base ? KW / hB : hB) * V] },
    ];
    held.forEach((S, j) => {
      const L = P[j].l, a = F.axes(ctx, { l: L, r: L + PW, t: TOP, b: BASE }, [0, 1], [0, NTOP], { nx: 0, ny: 4, yl: 'mmol', yc: cA });
      F.rich(ctx, [[S.name, S.col, 700], s === 0 ? '   pH ' : '   pH 4.74 → ', [S.pH, cC, 700]], L + PW / 2, 52, { size: 28, align: 'center' });
      S.m.forEach((m, i) => {
        const x0 = L + SLOT[i], col = cols[i], top = a.Y(Math.min(NTOP, m * (i < 2 ? k : 1))), none = j === 0 && i < 2;
        let over = top;
        if (i === 2 && x > 0) {
          /* the dashed outline is what was added; the fill inside it is what is still free */
          const yA = a.Y(x);
          ctx.save(); ctx.setLineDash([8, 7]); ctx.lineWidth = 2.5; ctx.strokeStyle = alpha(PAL.ink, 0.6); ctx.strokeRect(x0, yA, BW, BASE - yA); ctx.restore();
          over = Math.min(top, yA);
          hits.push({ x: x0 + BW / 2, y: (yA + BASE) / 2, r: Math.max(16, (BASE - yA) / 2), name: `${freeU} added to the ${S.name}: ${mmol(x)} mmol, of which ${mmol(m)} mmol is still ${freeU}` });
        }
        if (BASE - top > 0.5) {
          ctx.save(); ctx.fillStyle = alpha(col, 0.4); ctx.fillRect(x0, top, BW, BASE - top); ctx.restore();
          line(ctx, x0, BASE, x0, top, col, 3); line(ctx, x0, top, x0 + BW, top, col, 3); line(ctx, x0 + BW, top, x0 + BW, BASE, col, 3);
        }
        text(ctx, none ? 'none' : `${mmol(m)} mmol`, x0 + BW / 2, over - 20, none ? PAL.muted : cA, { size: 20, weight: none ? 400 : 600, align: 'center', bg: PAL.panel });
        text(ctx, names[i], x0 + BW / 2, BASE + 30, PAL.ink, { size: 22, weight: 600, align: 'center' });
        if (i < 2) hits.push({ x: x0 + BW / 2, y: (top + BASE) / 2, r: Math.max(16, (BASE - top) / 2), name: none ? `the unbuffered solution holds no ${plain[i]}` : `${plain[i]} in the buffer: ${mmol(m)} mmol` });
      });
      line(ctx, L, BASE, L + PW, BASE, PAL.ink, 3);
    });
    if (x > 0) F.legend(ctx, { l: P[1].l, r: P[1].l + PW, t: TOP, b: BASE }, [{ s: `${free} added`, color: alpha(PAL.ink, 0.6), dash: [8, 7], w: 2.5 }], { corner: 'tr' });

    /* pH against the volume added, acid to the left of zero and base to the right */
    const g = F.axes(ctx, G, [-VMAX, VMAX], [0, 14], { nx: 12, ny: 7, yl: 'pH', yc: cC, fx: (v) => String(Math.abs(v)) });
    text(ctx, 'mL of 0.10 M HCl added', G.l, G.b + 58, cV, { align: 'left', weight: 600, size: 20 });
    text(ctx, 'mL of 0.10 M NaOH added', G.r, G.b + 58, cV, { align: 'right', weight: 600, size: 20 });
    const lab = F.labeller(ctx, H);
    lab.block(0, 0, 1400, G.t - 2); lab.block(0, G.b + 2, 1400, H);
    line(ctx, G.l, g.Y(+PKA), G.r, g.Y(+PKA), alpha(PAL.ink, 0.4), 2, [10, 10]);
    const fB = (v) => buf.mix((cv) => pBuf(+cv)(v));
    /* sampled on t³, so the unbuffered solution's leap through zero is drawn as the one unbroken line it is */
    const warp = (t) => VMAX * t * t * t, Xw = (t) => g.X(warp(t));
    F.curve(ctx, (t) => pUn(warp(t)), -1, 1, Xw, g.Y, cU, 4, 1600);
    F.curve(ctx, fB, -VMAX, VMAX, g.X, g.Y, cB, 5, 2400);
    const key = F.legend(ctx, g, [{ s: 'unbuffered solution', color: cU, w: 4 }, { s: 'acetate buffer', color: cB, w: 5 }], { corner: 'tl', lab });
    text(ctx, 'both start at pH 4.74', G.l + 12, g.Y(+PKA) - 16, PAL.muted, { size: 18, align: 'left', bg: PAL.panel });
    lab.block(G.l, g.Y(+PKA) - 30, G.l + 230, g.Y(+PKA));
    const pb = { x: g.X(s), y: g.Y(fB(s)) }, pu = { x: g.X(s), y: g.Y(pUn(s)) };
    line(ctx, pb.x, Math.min(pb.y, pu.y), pb.x, G.b, alpha(PAL.ink, 0.45), 2, [4, 8]);
    const cap = capOf(c);
    if (cap <= VMAX && buf.k >= 1) [1, -1].forEach((sg) => {
      const pc = { x: g.X(sg * cap), y: g.Y(fB(sg * cap)) };
      dot(ctx, pc.x, pc.y, cB, false, 10);
      lab.block(pc.x - 12, pc.y - 12, pc.x + 12, pc.y + 12);
      if (sg > 0 === s >= 0) lab.add(sg > 0 ? '[CH_{3}CO_{2}H] is 11% of [CH_{3}CO_{2}⁻]' : '[CH_{3}CO_{2}⁻] is 11% of [CH_{3}CO_{2}H]', pc.x, pc.y, -0.5 * sg, -0.87, PAL.ink, 20, 56);
      hits.push({ x: pc.x, y: pc.y, r: 14, name: `the buffer capacity: ${cap.toFixed(1)} mL of ${sg > 0 ? 'NaOH' : 'HCl'}, where the pH has moved one unit to ${fB(sg * cap).toFixed(2)}` });
    });
    dot(ctx, pu.x, pu.y, cU, true, 9);
    dot(ctx, pb.x, pb.y, cB, true, 9);
    lab.block(pb.x - 14, pb.y - 14, pb.x + 14, pb.y + 14); lab.block(pu.x - 14, pu.y - 14, pu.x + 14, pu.y + 14);
    lab.flush();
    hits.push({ x: pb.x, y: pb.y, r: 14, name: `the buffer: pH ${pB}` }, { x: pu.x, y: pu.y, r: 14, name: `the unbuffered solution: pH ${pU}` });
    ro.set(`\\text{buffer: }${texB} \\\\ \\text{unbuffered: }${texU}`, note, { form: form + (hU < 1e-7 ? 'b' : 'a') });
  }
  register(d.fig, { update: () => {}, draw });
})();
};
