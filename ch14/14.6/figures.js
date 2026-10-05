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
   (0.10 M, the book's, or 1.0 M), with n mmol of 0.10 M NaOH or HCl
   added, beside 100 mL of 1.8 × 10⁻⁵ M HCl (pH 4.74, Example 14.20's
   unbuffered solution) given the same addition. Ka 1.8 × 10⁻⁵, Kw
   1.0 × 10⁻¹⁴. Left, the two partners' amounts as bars relative to their
   start, which the dashed line marks (14.15); right, pH against n added
   (14.17) for both solutions, each from the exact charge balance
   Na⁺ + H₃O⁺ = CH₃CO₂⁻ + OH⁻ + Cl⁻. Axes fixed: n 0 to 11 mmol (the
   slider's range), pH 0 to 14; the unbuffered solution reaches 12.72
   with 11 mmol NaOH and 1.28 with 11 mmol HCl, so nothing is pinned.
   Still: adding acid or base is an amount, not a clock.
===================================================================== */
(function () {
  const d = sim('sim-buffer', 560);
  const KA = 1.8e-5, KW = 1e-14, V0 = 100, CT = 0.1, H0 = 1.8e-5, PKA = '4.74', NMAX = 11;
  const capOf = (c) => c * V0 * (0.89 / 1.11);
  let add = null, buf = null, n = null;
  add = F.choice(d.controls, {
    label: '\\text{add}', aria: 'the strong acid or base added', value: 'base',
    options: [{ value: 'acid', label: 'HCl' }, { value: 'base', label: 'NaOH' }],
    onInput: () => n && n.refresh(),
  });
  buf = F.choice(d.controls, {
    label: '\\text{buffer}', aria: 'the concentration of each buffer partner', value: '0.1',
    options: [{ value: '0.1', label: '0.10 M' }, { value: '1', label: '1.0 M' }],
    onInput: () => n && n.refresh(),
  });
  n = ctl(d.controls, {
    label: '\\kn', cls: 'amount', min: 0, max: NMAX, step: 0.01, value: 0.1, unit: 'mmol', dec: 2,
    aria: 'amount of strong acid or base added, in millimoles',
    specials: [{ at: () => { const x = capOf(+buf.value); return x <= NMAX ? x : null; }, label: 'capacity' }],
  });
  const ro = F.readout(d);
  let hits = [];
  F.hover(d.stage, () => hits);

  const vol = (x) => V0 + x / CT;
  /* the hydronium molarity where the charge balance closes, by bisection on log h */
  function solve(f) {
    let lo = -15, hi = 1;
    for (let i = 0; i < 60; i++) { const m = (lo + hi) / 2; if (f(10 ** m) > 0) hi = m; else lo = m; }
    return 10 ** ((lo + hi) / 2);
  }
  function hBuf(dir, c, x) {
    const V = vol(x), CA = (2 * c * V0) / V, Na = (c * V0 + (dir === 'base' ? x : 0)) / V, Cl = (dir === 'acid' ? x : 0) / V;
    return solve((h) => Na + h - Cl - (CA * KA) / (KA + h) - KW / h);
  }
  function hUn(dir, x) {
    const V = vol(x), D = (H0 * V0 + (dir === 'acid' ? x : 0) - (dir === 'base' ? x : 0)) / V, s = Math.sqrt(D * D + 4 * KW);
    return D >= 0 ? (D + s) / 2 : (2 * KW) / (s - D);
  }
  /* each curve sampled once per state and read by interpolation */
  const N = 1100, tables = new Map();
  function table(key, f) {
    if (!tables.has(key)) tables.set(key, Float64Array.from({ length: N + 1 }, (_, i) => -Math.log10(f((NMAX * i) / N))));
    return tables.get(key);
  }
  const at = (t, x) => { const u = Math.min(N, Math.max(0, (x / NMAX) * N)), i = Math.min(N - 1, Math.floor(u)); return t[i] + (t[i + 1] - t[i]) * (u - i); };
  const pBufOf = (dir, c) => table(`b|${dir}|${c}`, (x) => hBuf(dir, +c, x));
  const pUnOf = (dir) => table(`u|${dir}`, (x) => hUn(dir, x));
  /* a curve while the choices turn: the old state bent into the new one */
  function blended(fOf) {
    const fA = add.from ?? add.value, tA = add.value, fB = buf.from ?? buf.value, tB = buf.value, kA = add.k, kB = buf.k;
    const t00 = fOf(fA, fB), t10 = fOf(tA, fB), t01 = fOf(fA, tB), t11 = fOf(tA, tB);
    return (x) => { const a = at(t00, x) + (at(t10, x) - at(t00, x)) * kA, b = at(t01, x) + (at(t11, x) - at(t01, x)) * kA; return a + (b - a) * kB; };
  }

  const B = { l: 560, r: 1330, t: 128, b: 462 };
  const BAR = { base: 462, h: 140, w: 96, x: [150, 266] };
  function draw() {
    const { ctx, H } = begin(d.c);
    hits = [];
    const dir = add.value, c = +buf.value, x = n.v, cA = C('amount'), cC = C('concentration');
    const cB = F.ref('buffer'), cU = F.ref('unbuffered');
    const a0 = c * V0, V = vol(x);
    const ha = dir === 'base' ? a0 - x : a0 + x, ab = dir === 'base' ? a0 + x : a0 - x;
    const spent = Math.min(ha, ab) <= 0, ratio = ab / ha;
    const hh = !spent && ratio >= 0.01 && ratio <= 100;

    /* the readout's pH, which the headline repeats */
    let pH, tex, form, note = '';
    if (hh) {
      const sA = sig(ab / V).plain ?? sigTex(ab / V), sHA = sig(ha / V).plain ?? sigTex(ha / V);
      pH = (+PKA + Math.log10(sigNum(ab / V) / sigNum(ha / V))).toFixed(2);
      tex = `\\mk{p}{\\kpH} = \\mk{k}{\\kpKa} + \\log\\frac{\\kconcAm}{\\kconcHA} = \\mk{kv}{${hue('equilibrium-constant', PKA)}} + \\log\\frac{\\mk{A}{${hue('concentration', sA)}}}{\\mk{HA}{${hue('concentration', sHA)}}} = \\mk{v}{${hue('concentration', pH)}}`;
      form = 'hh';
    } else {
      const h = hBuf(dir, c, x);
      if (dir === 'base') {
        const oh = sigNum(KW / h);
        pH = (14 + Math.log10(oh)).toFixed(2);
        tex = `\\mk{p}{\\kpH} = ${hue('equilibrium-constant', '14.00')} - \\kpOH = ${hue('equilibrium-constant', '14.00')} + \\log\\kconcOH = ${hue('equilibrium-constant', '14.00')} + \\log(\\mk{c}{${hue('concentration', sigTex(oh))}}) = \\mk{v}{${hue('concentration', pH)}}`;
      } else {
        const hy = sigNum(h);
        pH = (-Math.log10(hy)).toFixed(2);
        tex = `\\mk{p}{\\kpH} = -\\log\\kconcHyd = -\\log(\\mk{c}{${hue('concentration', sigTex(hy))}}) = \\mk{v}{${hue('concentration', pH)}}`;
      }
      form = dir;
      if (spent) note = dir === 'base'
        ? `All ${amt(a0)} mmol of CH₃CO₂H is used up; the excess OH⁻ sets the pH.`
        : `All ${amt(a0)} mmol of CH₃CO₂⁻ is used up; the excess H₃O⁺ sets the pH.`;
    }
    const pU = (-Math.log10(hUn(dir, x))).toFixed(2), what = dir === 'base' ? 'NaOH' : 'HCl';
    const lines = topline(ctx, x < 0.005
      ? 'With nothing added, the buffer and the unbuffered solution both have pH 4.74.'
      : `Adding ${x.toFixed(2)} mmol of ${what} moves the buffer from pH 4.74 to ${pH} and the unbuffered solution from pH 4.74 to ${pU}.`);
    const lab = F.labeller(ctx, H, { headline: lines });

    /* the two partners, as the book's bars: heights relative to the start, which the dashed line marks */
    const yS = BAR.base - BAR.h, names = ['CH_{3}CO_{2}H', 'CH_{3}CO_{2}⁻'];
    line(ctx, BAR.x[0] - 30, yS, BAR.x[1] + BAR.w + 30, yS, alpha(PAL.ink, 0.45), 2, [10, 10]);
    text(ctx, 'start', BAR.x[0] - 38, yS, PAL.muted, { size: 17, align: 'right' });
    [ha, ab].forEach((m, i) => {
      const col = F.cat(i), hgt = (Math.max(0, m) / a0) * BAR.h, x0 = BAR.x[i];
      ctx.save(); ctx.fillStyle = alpha(col, 0.35); ctx.fillRect(x0, BAR.base - hgt, BAR.w, hgt); ctx.restore();
      if (hgt > 0) { line(ctx, x0, BAR.base, x0, BAR.base - hgt, col, 3); line(ctx, x0, BAR.base - hgt, x0 + BAR.w, BAR.base - hgt, col, 3); line(ctx, x0 + BAR.w, BAR.base - hgt, x0 + BAR.w, BAR.base, col, 3); }
      text(ctx, `${amt(m)} mmol`, x0 + BAR.w / 2, BAR.base - hgt - 20, cA, { size: 20, weight: 600, align: 'center', bg: PAL.panel });
      text(ctx, names[i], x0 + BAR.w / 2, BAR.base + 30, PAL.ink, { size: 22, weight: 600, align: 'center' });
      hits.push({ x: x0 + BAR.w / 2, y: BAR.base - hgt / 2, r: 40, name: `${names[i].replace('_{3}', '₃').replace('_{2}', '₂')}: ${amt(m)} mmol` });
    });
    line(ctx, BAR.x[0] - 30, BAR.base, BAR.x[1] + BAR.w + 30, BAR.base, PAL.ink, 3);

    /* pH against the strong acid or base added */
    const a = F.axes(ctx, B, [0, NMAX], [0, 14], { nx: 11, ny: 7, yl: 'pH', yc: cC });
    add.only(ctx, 'base', () => text(ctx, 'NaOH added (mmol)', B.r, B.b + 58, cA, { align: 'right', weight: 600, size: 20 }));
    add.only(ctx, 'acid', () => text(ctx, 'HCl added (mmol)', B.r, B.b + 58, cA, { align: 'right', weight: 600, size: 20 }));
    lab.block(B.l - 60, B.t - 44, B.l + 40, B.t - 6); lab.block(B.l - 60, B.t, B.l - 4, B.b + 40); lab.block(B.l, B.b + 4, B.r + 10, B.b + 76);
    const fB = blended(pBufOf), fU = blended((dd) => pUnOf(dd));
    ctx.save(); ctx.beginPath(); ctx.rect(B.l, B.t - 6, B.r - B.l, B.b - B.t + 12); ctx.clip();
    F.curve(ctx, fU, 0, NMAX, a.X, a.Y, cU, 4, 1100);
    F.curve(ctx, fB, 0, NMAX, a.X, a.Y, cB, 5, 1100);
    ctx.restore();
    const pb = { x: a.X(x), y: a.Y(fB(x)) }, pu = { x: a.X(x), y: a.Y(fU(x)) };
    line(ctx, pb.x, pb.y, pb.x, B.b, alpha(PAL.ink, 0.4), 2, [4, 8]);
    const cap = capOf(c);
    if (cap <= NMAX) {
      const pc = { x: a.X(cap), y: a.Y(fB(cap)) };
      dot(ctx, pc.x, pc.y, cB, false, 10);
      lab.block(pc.x - 12, pc.y - 12, pc.x + 12, pc.y + 12);
      lab.add(dir === 'base' ? '[CH_{3}CO_{2}H] is 11% of [CH_{3}CO_{2}⁻]' : '[CH_{3}CO_{2}⁻] is 11% of [CH_{3}CO_{2}H]', pc.x, pc.y, -0.5, -0.87, PAL.ink, 20, 60);
      hits.push({ x: pc.x, y: pc.y, r: 14, name: `the buffer capacity: ${cap.toFixed(2)} mmol, pH ${fB(cap).toFixed(2)}` });
    }
    dot(ctx, pu.x, pu.y, cU, true, 9);
    dot(ctx, pb.x, pb.y, cB, true, 9);
    lab.block(pb.x - 14, pb.y - 14, pb.x + 14, pb.y + 14); lab.block(pu.x - 14, pu.y - 14, pu.x + 14, pu.y + 14);
    const s = dir === 'base' ? 1 : -1;
    lab.add('buffer', a.X(2), a.Y(fB(2)), 0, -s, cB, 20, 26);
    lab.add('unbuffered', a.X(6), a.Y(fU(6)), 0, s, cU, 20, 26);
    lab.flush();
    hits.push({ x: pb.x, y: pb.y, r: 14, name: `the buffer: pH ${fB(x).toFixed(2)}` }, { x: pu.x, y: pu.y, r: 14, name: `the unbuffered solution: pH ${pU}` });
    ro.set(tex, note, { form });
  }
  register(d.fig, { update: () => {}, draw });
})();
};
