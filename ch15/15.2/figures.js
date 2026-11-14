/* Figures for section 15.2 Lewis Acids and Bases. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['15.2'] = function (root, F) {
const { C, PAL, alpha, ctl, register, begin, line, text, topline } = F;
const sim = (id, H) => F.sim(root, id, H);
const still = (d, draw) => register(d.fig, { update: () => {}, draw });
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;

/* =====================================================================
   SIM: silver chloride dissolving as ammonia is added. Ksp = 1.6e-10
   (Appendix J), Kf = 1.7e7 (the text). With N mol/L of ammonia added
   and n mol of solid in 1.00 L: while solid remains, s = [Cl-] is the
   amount dissolved, a = [Ag+] = Ksp/s, the complex c = s - a, the free
   ammonia f = N - 2c = sqrt(c/(Kf a)), so N(s) = 2c + sqrt(c/(Kf a)),
   rising from N = 0 at s = sqrt(Ksp); s is found from N by bisection.
   The last solid dissolves at N* = N(n), the slider's circle; past it
   s = n and a solves n - a = Kf a (N - 2(n - a))^2. Axes fixed: N from
   0 to 1.0 M; log concentration from -12 to 0, since at the slider
   extremes [Cl-] reaches 0.040 M and [Ag+] falls to 1.5e-10 M. Still:
   each equilibrium answers its sliders.
===================================================================== */
(function () {
  const H = 560, d = sim('sim-agcl-ammonia', H);
  const KSP = 1.6e-10, KF = 1.7e7, S0 = Math.sqrt(KSP);
  const Nof = (s) => { const a = KSP / s, c = Math.max(0, s - a); return 2 * c + Math.sqrt(c / (KF * a)); };
  const bisect = (g, lo, hi) => { for (let i = 0; i < 60; i++) { const m = (lo + hi) / 2; if (g(m) > 0) hi = m; else lo = m; } return (lo + hi) / 2; };
  const satS = (N) => (N <= 0 ? S0 : 10 ** bisect((ls) => Nof(10 ** ls) - N, Math.log10(S0), 0.5));
  function state(N, n) {
    if (N <= Nof(n)) { const s = satS(N); return { s, a: KSP / s, sat: true }; }
    const a = 10 ** bisect((la) => { const x = 10 ** la, c = n - x; return KF * x * (N - 2 * c) ** 2 - c; }, -40, Math.log10(n));
    return { s: n, a, sat: false };
  }
  const nS = ctl(d.controls, { label: '\\text{AgCl}(s)', cls: 'amount', key: 'n', min: 0.001, max: 0.04, step: 0.001, value: 0.01, unit: 'mol', dec: 3,
    aria: 'the amount of solid silver chloride in the beaker, in moles', onInput: () => draw() });
  const nh3 = ctl(d.controls, { label: '\\text{NH}_{3}', cls: 'concentration', key: 'N', min: 0, max: 1, step: 0.005, value: 0.1, unit: 'M', dec: 3,
    aria: 'the concentration of ammonia added, in molar',
    specials: [{ at: () => { const v = Nof(nS.v); return v <= 1 ? v : null; }, label: 'all dissolved' }], onInput: () => draw() });
  const ro = F.readout(d);
  let hits = []; F.hover(d.stage, () => hits);

  const SUP = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
  const sup = (k) => String(k).split('').map((c) => SUP[c]).join('');
  const parts = (v, f) => { let e = Math.floor(Math.log10(v)), m = +(v / 10 ** e).toFixed(f - 1); if (m >= 10) { m = 1; e += 1; } return [m, e]; };
  const round = (v, f) => { const [m, e] = parts(v, f); return m * 10 ** e; };
  const sciTxt = (v, f = 2) => { const [m, e] = parts(v, f); return `${m.toFixed(f - 1)} × 10${sup(e)}`; };
  const sciTex = (v, f = 2) => { const [m, e] = parts(v, f); return `${m.toFixed(f - 1)}\\times 10^{${e}}`; };
  const big = (r) => (r >= 1e4 ? sciTxt(r) : String(+r.toPrecision(2)));

  const G = { l: 560, r: 1320, t: 150, b: 470 };
  const BK = { l: 80, r: 380, t: 140, b: 470 };
  /* a beaker standing on its base: straight walls, a rounded foot, a flared rim with a spout at the left */
  function beakerPath(ctx) {
    ctx.beginPath();
    ctx.moveTo(BK.l - 16, BK.t - 8); ctx.quadraticCurveTo(BK.l - 2, BK.t - 2, BK.l, BK.t + 14);
    ctx.lineTo(BK.l, BK.b - 14); ctx.quadraticCurveTo(BK.l, BK.b, BK.l + 14, BK.b);
    ctx.lineTo(BK.r - 14, BK.b); ctx.quadraticCurveTo(BK.r, BK.b, BK.r, BK.b - 14);
    ctx.lineTo(BK.r, BK.t + 8); ctx.quadraticCurveTo(BK.r, BK.t, BK.r + 6, BK.t - 2);
  }
  function beaker(ctx, rest) {
    const lv = BK.t + 50;
    ctx.save(); beakerPath(ctx); ctx.closePath(); ctx.clip(); ctx.fillStyle = alpha(PAL.muted, 0.16); ctx.fillRect(BK.l, lv, BK.r - BK.l, BK.b - lv); ctx.restore();
    line(ctx, BK.l + 2, lv, BK.r - 2, lv, alpha(PAL.ink, 0.45), 1.5);
    hits.push({ x: (BK.l + BK.r) / 2, y: BK.t + 110, r: 90, name: 'the solution, 1.00 L' });
    if (!(rest > 1e-6)) return;
    const k = Math.sqrt(rest / 0.04), w = 230 * k, h = 70 * k, cx = (BK.l + BK.r) / 2, y0 = BK.b - 2;
    ctx.save(); ctx.beginPath(); ctx.ellipse(cx, y0, w / 2, h, 0, Math.PI, 2 * Math.PI); ctx.closePath();
    ctx.fillStyle = F.fact('#f4f4f2'); ctx.fill(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2; ctx.stroke(); ctx.restore();
    hits.push({ x: cx, y: y0 - h / 2, r: Math.max(16, w / 2), name: `solid silver chloride, ${(rest).toFixed(4)} mol left` });
    F.label(ctx, 'AgCl(s)', cx, BK.b + 4, { side: 'below', size: 20, gap: 26 });
  }
  function glass(ctx) { ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; beakerPath(ctx); ctx.stroke(); ctx.restore(); }
  function draw() {
    const { ctx } = begin(d.c); hits = [];
    const N = nh3.v, n = nS.v, st = state(N, n), Nstar = Nof(n);
    const onCircle = Math.abs(N - Nstar) < 1e-9, done = !st.sat || onCircle;
    const cc = C('concentration'), c0 = F.cat(0), c1 = F.cat(1);
    beaker(ctx, done ? 0 : n - st.s); glass(ctx);
    const fy = (v) => (Math.round(v) === 0 ? '1' : Math.round(v) % 2 ? '' : '10' + sup(Math.round(v)));
    const g = F.axes(ctx, G, [0, 1], [-12, 0], { nx: 5, ny: 12, fx: (v) => v.toFixed(1), fy, xl: 'NH_{3} added (M)', xc: cc, yl: 'concentration (M)', yc: cc });
    if (Nstar <= 1) {
      line(ctx, g.X(Nstar), G.t, g.X(Nstar), G.b, alpha(PAL.ink, 0.35), 2, [4, 8]);
      hits.push({ x: g.X(Nstar), y: (G.t + G.b) / 2, r: 10, name: `${Nstar.toFixed(3)} M ammonia: the last of the solid dissolves` });
    }
    const logCl = (x) => Math.log10(state(x, n).s), logAg = (x) => Math.log10(state(x, n).a);
    F.curve(ctx, logCl, 0, 1, g.X, g.Y, c0, 5, 140);
    F.curve(ctx, logAg, 0, 1, g.X, g.Y, c1, 5, 140);
    const xl = N > 0.7 ? 0.45 : 0.92;
    text(ctx, '[Cl⁻]', g.X(xl), g.Y(logCl(xl)) - 22, c0, { size: 22, weight: 600, align: 'center', bg: PAL.panel });
    text(ctx, '[Ag⁺]', g.X(xl), g.Y(logAg(xl)) + 26, c1, { size: 22, weight: 600, align: 'center', bg: PAL.panel });
    const xs = g.X(N), ys = g.Y(Math.log10(st.s)), ya = g.Y(Math.log10(st.a));
    F.dot(ctx, xs, ys, c0, true, 9); F.dot(ctx, xs, ya, c1, true, 9);
    hits.push({ x: xs, y: ys, r: 14, name: `[Cl⁻] = ${sciTxt(st.s, 3)} M, the silver chloride dissolved` }, { x: xs, y: ya, r: 14, name: `[Ag⁺] = ${sciTxt(st.a, 3)} M, the free silver ion` });
    const nTxt = n.toFixed(3), NTxt = N.toFixed(N < 0.1 ? 3 : 2);
    topline(ctx, N <= 0 ? `In pure water, only ${sciTxt(st.s)} mol of the silver chloride dissolves.`
      : done ? `All ${nTxt} mol of the silver chloride has dissolved in ${NTxt} M ammonia.`
        : `In ${NTxt} M ammonia, ${sciTxt(st.s)} mol of AgCl dissolves, ${big(st.s / S0)} times as much as in pure water.`);
    const aR = round(st.a, 3), sR = round(st.s, 3);
    const A = hue('concentration', sciTex(aR, 3)), Sv = hue('concentration', sciTex(sR, 3));
    const prod = `[\\text{Ag}^{+}][\\text{Cl}^{-}] = (\\mk{a}{${A}})(\\mk{s}{${Sv}})`;
    const tex = done
      ? `\\mk{K}{\\kQrxn} = ${prod} = \\mk{v}{${hue('equilibrium-constant', sciTex(aR * sR, 2))}} \\mk{rel}{${onCircle ? '=' : '<'}} \\mk{k}{\\kKsp}`
      : `\\mk{K}{\\kKsp} = ${prod} = \\mk{v}{${hue('equilibrium-constant', sciTex(KSP, 2))}}`;
    const free = st.s / st.a;
    const note = N <= 0 ? 'Without ammonia, every dissolved silver ion is free Ag⁺.'
      : `Only one dissolved silver ion in ${big(free)} is free Ag⁺; the rest are Ag(NH₃)₂⁺.`;
    ro.set(tex, note, { form: done });
  }
  still(d, draw);
})();
};
