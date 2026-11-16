/* Figures for section 16.3 The Second and Third Laws of Thermodynamics. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['16.3'] = function (root, F) {
const { C, PAL, alpha, ctl, register, begin, line, text, headline } = F;
const sim = (id, H) => F.sim(root, id, H);
const still = (d, draw) => register(d.fig, { update: () => {}, draw });
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;

/* =====================================================================
   Example 16.4: ice melting, dS_sys = 22.1 J/K, q_surr = -6.00 kJ.
   Above, the sum laid tail to head on one scale (40 units a J/K, zero at
   x = 330 for melting and 1098 for freezing, so the stage holds -2.9 to
   +22.1 J/K either way): dS_sys from zero, dS_surr = q_surr/T from its
   head, and dS_univ, solid, from zero to where they end.
   Below, the sizes of the two against T (240 to 310 K, 19 to 26 J/K, keyed above the box:
   6000/T runs 25.0 to 19.35): the level 22.1 and the curve 6000/T cross
   at T = 6000/22.1 = 271.5 K, and the gap between them is dS_univ.
   Freezing reverses every sign; the sizes, and so the graph's curves, stay.
   Still: the temperature and the process are states, not a clock.
===================================================================== */
(function () {
  const H = 768, d = sim('sim-ice-universe', H);
  const DS = 22.1, Q = 6.00e3, TX = Q / DS;
  const PROC = F.choice(d.controls, { label: '\\text{process}', key: 'process', aria: 'the process, melting of ice or freezing of water',
    options: [{ value: 'melting', label: 'melting' }, { value: 'freezing', label: 'freezing' }], value: 'melting', onInput: () => draw() });
  const T = ctl(d.controls, { label: '\\kT', cls: 'temperature', key: 'T', min: 240, max: 310, step: 0.05, value: 263.15, unit: 'K', dec: 2,
    aria: 'the temperature of the surroundings in kelvin',
    detents: [{ v: 263.15, label: '−10.00 °C' }, { v: 283.15, label: '10.00 °C' }],
    specials: [{ at: TX, label: 'equilibrium' }], onInput: () => draw() });
  const ro = F.readout(d);
  const K = 40, ROW = [140, 218, 296], BH = 36, AXY = 334;
  const G = { l: 200, r: 1280, t: 446, b: 700 };
  const signed = (u) => (Math.abs(u) < 0.05 ? '0.0' : (u > 0 ? '+' : '−') + Math.abs(u).toFixed(1));
  let hits = [];
  F.hover(d.stage, () => hits);

  /* a bar from tail to head, pointed at the head: the way the change runs */
  function bar(ctx, x1, x2, yc, c, solid) {
    const len = Math.abs(x2 - x1), dir = x2 >= x1 ? 1 : -1, tip = Math.min(14, len), h = BH / 2;
    ctx.save(); ctx.fillStyle = solid ? c : alpha(c, 0.25); ctx.strokeStyle = c; ctx.lineWidth = 3; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.moveTo(x1, yc - h); ctx.lineTo(x2 - dir * tip, yc - h); ctx.lineTo(x2, yc); ctx.lineTo(x2 - dir * tip, yc + h); ctx.lineTo(x1, yc + h); ctx.closePath();
    ctx.fill(); ctx.stroke(); ctx.restore();
  }

  function draw() {
    const { ctx } = begin(d.c);
    const ce = C('entropy'), ct = C('temperature'), guide = alpha(PAL.ink, 0.4);
    const p = PROC.value, melt = p === 'melting', sg = melt ? 1 : -1;
    const s = PROC.mix((q) => (q === 'melting' ? 1 : -1)), X0 = PROC.mix((q) => (q === 'melting' ? 330 : 1098));
    const t = T.v, sys = s * DS, surr = -s * Q / t, univ = sys + surr;
    const X = (v) => X0 + v * K;
    hits = [];

    /* the scale and its zero */
    line(ctx, 205, AXY, 1225, AXY, PAL.muted, 2);
    for (let v = -25; v <= 25; v += 5) {
      const x = X(v); if (x < 205 || x > 1225) continue;
      line(ctx, x, AXY - 7, x, AXY + 7, PAL.muted, 2);
      text(ctx, v === 0 ? '0' : (v > 0 ? '+' : '−') + Math.abs(v), x, AXY + 26, v === 0 ? PAL.ink : PAL.muted, { size: 17, align: 'center', weight: v === 0 ? 600 : 400 });
    }
    text(ctx, 'ΔS (J/K)', 1244, AXY + 26, ce, { size: 17, weight: 600 });
    line(ctx, X0, ROW[0] - 40, X0, AXY, PAL.ink, 2.5);
    /* where one bar ends the next begins */
    line(ctx, X(sys), ROW[0] + BH / 2, X(sys), ROW[1] - BH / 2, guide, 2.5, [4, 8]);
    line(ctx, X(univ), ROW[1] + BH / 2, X(univ), ROW[2] - BH / 2, guide, 2.5, [4, 8]);

    const who = [melt ? 'ice' : 'water', 'surroundings', 'universe'];
    ['$\\kdSsys$', '$\\kdSsurr$', '$\\kdSuniv$'].forEach((name, i) => {
      text(ctx, name, 36, ROW[i] - 11, PAL.ink, { size: 24, tex: true });
      text(ctx, who[i], 36, ROW[i] + 17, PAL.muted, { size: 17 });
    });
    bar(ctx, X0, X(sys), ROW[0], ce, false);
    bar(ctx, X(sys), X(univ), ROW[1], ce, false);
    bar(ctx, X0, X(univ), ROW[2], ce, true);
    text(ctx, `${signed(sys)} J/K`, X(sys), ROW[0] - BH / 2 - 17, ce, { size: 20, weight: 600, align: sg > 0 ? 'right' : 'left' });
    text(ctx, `${signed(surr)} J/K`, sg > 0 ? Math.max(X(univ), X0 + 12) : Math.min(X(univ), X0 - 12), ROW[1] - BH / 2 - 17, ce, { size: 20, weight: 600, align: sg > 0 ? 'left' : 'right' });
    const shown = signed(univ), zero = shown === '0.0';
    const verdict = zero ? 'equilibrium' : univ > 0 ? 'spontaneous' : 'nonspontaneous';
    const edge = sg > 0 ? Math.max(X0, X(univ)) + 18 : Math.min(X0, X(univ)) - 18;
    F.rich(ctx, sg > 0 ? [[`${shown} J/K`, ce, 700], `   ${verdict}`] : [`${verdict}   `, [`${shown} J/K`, ce, 700]], edge, ROW[2], { size: 22, align: sg > 0 ? 'left' : 'right' });
    hits.push({ x: (X0 + X(sys)) / 2, y: ROW[0], r: 30, name: melt ? 'entropy the ice gains as it melts' : 'entropy the water loses as it freezes' },
      { x: (X(sys) + X(univ)) / 2, y: ROW[1], r: 30, name: melt ? 'entropy the surroundings lose, q_surr/T' : 'entropy the surroundings gain, q_surr/T' },
      { x: (X0 + X(univ)) / 2, y: ROW[2], r: 30, name: 'what is left of the two: the entropy change of the universe' });

    /* the sizes of the two against T */
    const g = F.axes(ctx, G, [240, 310], [19, 26], { nx: 7, ny: 7, xl: 'T (K)', xc: ct, yl: 'entropy gained or lost (J/K)', yc: ce });
    const fs = (x) => Q / x;
    F.shade(ctx, g, fs, DS, 240, 310, ce, { alpha: 0.13 });
    line(ctx, g.X(TX), G.t, g.X(TX), G.b, alpha(ct, 0.7), 2.5, [10, 10]);
    text(ctx, `${TX.toFixed(1)} K`, g.X(TX) + 10, G.b - 18, ct, { size: 17, weight: 600, bg: PAL.panel });
    F.plot(ctx, g, () => DS, ce, { w: 4, dash: [10, 10] });
    F.plot(ctx, g, fs, ce, { w: 5 });
    ['melting', 'freezing'].forEach((q) => PROC.only(ctx, q, () => {
      const m = q === 'melting';
      text(ctx, m ? 'nonspontaneous' : 'spontaneous', G.l + 16, G.b - 18, PAL.muted, { size: 17 });
      text(ctx, m ? 'spontaneous' : 'nonspontaneous', G.r - 16, G.t + 18, PAL.muted, { size: 17, align: 'right' });
    }, [0, 0]));
    F.legend(ctx, g, [{ s: melt ? 'the ice gains 22.1 J/K' : 'the water loses 22.1 J/K', color: ce, w: 4, dash: [10, 10] },
      { s: melt ? 'the surroundings lose 6.00 kJ / T' : 'the surroundings gain 6.00 kJ / T', color: ce, w: 5 }], { corner: 'above' });
    /* the gap at this T is dS_univ, solid like its bar */
    const px = g.X(t), ya = g.Y(DS), yb = g.Y(fs(t)), top = Math.min(ya, yb);
    line(ctx, px, Math.max(ya, yb), px, G.b, alpha(ct, 0.6), 2.5, [4, 8]);
    line(ctx, px, ya, px, yb, ce, 9);
    F.dot(ctx, px, ya, ce, true, 8); F.dot(ctx, px, yb, ce, true, 8);
    const lx = Math.min(Math.max(px, G.l + 52), G.r - 52);
    text(ctx, '$\\kdSuniv$', lx, top - 28, PAL.ink, { size: 22, align: 'center', tex: true, bg: PAL.panel });
    hits.push({ x: px, y: (ya + yb) / 2, r: 22, name: `the gap between the two: ${shown} J/K` },
      { x: g.X(TX), y: ya, r: 18, name: 'the two are equal: equilibrium' });

    const at = `At ${t.toFixed(2)} K`;
    headline(ctx, zero ? `${at} the two entropy changes cancel: ice and water are at equilibrium.`
      : melt
        ? (univ < 0 ? `${at} the surroundings lose more entropy than the ice gains: melting is nonspontaneous.`
          : `${at} the ice gains more entropy than the surroundings lose: melting is spontaneous.`)
        : (univ > 0 ? `${at} the surroundings gain more entropy than the water loses: freezing is spontaneous.`
          : `${at} the water loses more entropy than the surroundings gain: freezing is nonspontaneous.`));
    const u = sg * (DS - Q / t);
    const sv = hue('entropy', `${sg > 0 ? '' : '-'}22.1\\ \\text{J/K}`);
    const qv = hue('energy', `${sg > 0 ? '-' : ''}6.00\\times 10^{3}\\ \\text{J}`);
    const tv = hue('temperature', `${t.toFixed(2)}\\ \\text{K}`);
    const uv = hue('entropy', `${signed(u).replace('−', '-')}\\ \\text{J/K}`);
    ro.set(`\\mk{U}{\\kdSuniv}=\\mk{S}{\\kdSsys}+\\frac{\\mk{q}{\\kqsurr}}{\\mk{T}{\\kT}}=\\mk{Sv}{${sv}}+\\frac{\\mk{qv}{${qv}}}{\\mk{Tv}{${tv}}}=\\mk{Uv}{${uv}}`,
      'With the example’s rounded values the two cancel at 271.5 K; ice melts at 273.15 K.', { form: p });
  }
  still(d, draw);
})();
};
