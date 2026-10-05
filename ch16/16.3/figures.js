/* Figures for section 16.3 The Second and Third Laws of Thermodynamics. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['16.3'] = function (root, F) {
const { C, PAL, alpha, ctl, register, begin, line, text, headline } = F;
const sim = (id, H) => F.sim(root, id, H);
const still = (d, draw) => register(d.fig, { update: () => {}, draw });
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;

/* =====================================================================
   Example 16.4: ice melting, dS_sys = 22.1 J/K, q_surr = -6.00 kJ.
   Bars of dS_sys, dS_surr = q_surr/T and dS_univ on one zero line
   (±28 J/K; |dS_surr| is 25.0 J/K at 240 K), beside dS_univ against T
   (240 to 310 K, -4 to +4 J/K; the curve reaches ±2.9 J/K at the ends).
   dS_univ = 0 at T = 6000/22.1 = 271.5 K. Freezing reverses both signs.
   Still: the temperature and the process are states, not a clock.
===================================================================== */
(function () {
  const H = 470, d = sim('sim-ice-universe', H);
  const DS = 22.1, Q = 6.00e3, TX = Q / DS;
  const PROC = F.choice(d.controls, { label: '\\text{process}', key: 'process', aria: 'the process, melting of ice or freezing of water',
    options: [{ value: 'melting', label: 'melting' }, { value: 'freezing', label: 'freezing' }], value: 'melting', onInput: () => draw() });
  const T = ctl(d.controls, { label: '\\kT', cls: 'temperature', key: 'T', min: 240, max: 310, step: 0.05, value: 263.15, unit: 'K', dec: 2,
    aria: 'the temperature in kelvin',
    detents: [{ v: 263.15, label: '−10.00 °C' }, { v: 283.15, label: '10.00 °C' }],
    specials: [{ at: TX, label: 'equilibrium' }], onInput: () => draw() });
  const ro = F.readout(d);
  const BAR = { zero: 290, k: 5, w: 100 }, COLS = [150, 310, 470];
  const G = { l: 720, r: 1330, t: 130, b: 390 };
  const minus = (s) => s.replace('-', '−');
  const one = (u) => (Math.abs(u) < 0.05 ? '0.0' : (u > 0 ? '+' : '') + u.toFixed(1));

  function bar(ctx, x, v, c, solid) {
    const y = BAR.zero - v * BAR.k, top = Math.min(y, BAR.zero), h = Math.abs(y - BAR.zero);
    ctx.save(); ctx.fillStyle = solid ? c : alpha(c, 0.3); ctx.strokeStyle = c; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.rect(x - BAR.w / 2, top, BAR.w, Math.max(h, 1)); ctx.fill(); if (!solid) ctx.stroke(); ctx.restore();
    const lab = Math.abs(v) < 0.05 ? '0.0 J/K' : `${minus(v.toFixed(1))} J/K`;
    text(ctx, lab, x, v >= 0 ? y - 18 : y + 20, c, { size: 20, weight: 600, align: 'center', bg: PAL.panel });
  }

  function draw() {
    const { ctx } = begin(d.c);
    const ce = C('entropy'), ct = C('temperature');
    const s = PROC.mix((p) => (p === 'melting' ? 1 : -1));
    const t = T.v, sys = s * DS, surr = -s * Q / t, univ = sys + surr;

    line(ctx, 70, BAR.zero, 550, BAR.zero, PAL.ink, 2);
    [['$\\kdSsys$', sys, false], ['$\\kdSsurr$', surr, false], ['$\\kdSuniv$', univ, true]].forEach(([name, v, solid], i) => {
      text(ctx, name, COLS[i], 122, PAL.ink, { size: 24, align: 'center', tex: true });
      bar(ctx, COLS[i], v, ce, solid);
    });

    const g = F.axes(ctx, G, [240, 310], [-4, 4], { nx: 7, ny: 8, fy: (v) => minus(String(Math.round(v))),
      xl: 'T (K)', xc: ct, yl: 'ΔS_{univ} (J/K)', yc: ce });
    line(ctx, G.l, g.Y(0), G.r, g.Y(0), alpha(PAL.ink, 0.6), 2.5);
    line(ctx, g.X(TX), G.t, g.X(TX), G.b, alpha(ct, 0.7), 2.5, [10, 10]);
    text(ctx, `${TX.toFixed(1)} K`, g.X(TX) + 10, G.b - 18, ct, { size: 17, weight: 600, bg: PAL.panel });
    ['melting', 'freezing'].forEach((p) => PROC.only(ctx, p, () => {
      const left = p === 'melting';
      text(ctx, 'spontaneous', left ? G.l + 14 : G.r - 14, G.t + 18, PAL.muted, { size: 17, align: left ? 'left' : 'right', bg: PAL.panel });
      text(ctx, 'nonspontaneous', left ? G.r - 14 : G.l + 14, G.b - 18, PAL.muted, { size: 17, align: left ? 'right' : 'left', bg: PAL.panel });
    }, [0, 0]));
    F.curve(ctx, (x) => s * (DS - Q / x), 240, 310, g.X, g.Y, ce, 5);
    const px = g.X(t), py = g.Y(univ);
    line(ctx, px, py, px, G.b, alpha(ct, 0.6), 2.5, [4, 8]);
    line(ctx, G.l, py, px, py, alpha(ce, 0.6), 2.5, [4, 8]);
    F.dot(ctx, px, py, ce, true, 10);

    const p = PROC.value, sg = p === 'melting' ? 1 : -1, u = sg * (DS - Q / t), shown = one(u);
    const c = t - 273.15, cs = `${c >= 0 ? '' : '−'}${Math.abs(c).toFixed(2)}`;
    const at = `At ${t.toFixed(2)} K (${cs} °C)`;
    headline(ctx, shown === '0.0' ? `At ${t.toFixed(2)} K the two entropy changes cancel, and ice and water are at equilibrium.`
      : p === 'melting'
        ? (u < 0 ? `${at} the surroundings lose more entropy than the ice gains, so melting is nonspontaneous.`
          : `${at} the ice gains more entropy than the surroundings lose, so melting is spontaneous.`)
        : (u > 0 ? `${at} the surroundings gain more entropy than the water loses, so freezing is spontaneous.`
          : `${at} the water loses more entropy than the surroundings gain, so freezing is nonspontaneous.`));
    const sv = hue('entropy', `${sg > 0 ? '' : '-'}22.1\\ \\text{J/K}`);
    const qv = hue('energy', `${sg > 0 ? '-' : ''}6.00\\times 10^{3}\\ \\text{J}`);
    const tv = hue('temperature', `${t.toFixed(2)}\\ \\text{K}`);
    const uv = hue('entropy', `${shown}\\ \\text{J/K}`);
    ro.set(`\\mk{U}{\\kdSuniv}=\\mk{S}{\\kdSsys}+\\frac{\\mk{q}{\\kqsurr}}{\\mk{T}{\\kT}}=\\mk{Sv}{${sv}}+\\frac{\\mk{qv}{${qv}}}{\\mk{Tv}{${tv}}}=\\mk{Uv}{${uv}}`, undefined, { form: p });
  }
  still(d, draw);
})();
};
