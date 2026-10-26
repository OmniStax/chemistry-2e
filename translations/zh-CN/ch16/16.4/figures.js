/* Figures for section 16.4 Free Energy. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['16.4'] = function (root, F) {
const { C, PAL, alpha, register, begin, line, text, dot, topline } = F;
const sim = (id, H) => F.sim(root, id, H);
const still = (d, draw) => register(d.fig, { update: () => {}, draw });
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;
const minus = (s) => String(s).replace('-', '−');

/* =====================================================================
   FIGURE 16.12 + 16.13: ΔG = ΔH − TΔS against T, one line the reader
   tilts with ΔH and ΔS, beside the book's table of the four sign cases,
   each cell carrying a sketch of its case's line. Defaults are water's
   vaporization (Examples 16.7 and 16.11): 44.01 kJ, 118.8 J/K, 298.0 K,
   crossing zero at 370.5 K. Axes fixed: T 0 to 1000 K, ΔG −150 to
   150 kJ; the line is clipped to the frame and the live point pinned
   past it. Still: a relation with no clock.
===================================================================== */
(function () {
  const H = 640, d = sim('sim-temp-spont', H);
  const G = { l: 130, r: 830, t: 130, b: 560 };
  const YR = [-150, 150];
  let dH = null, dS = null, T = null;
  const ready = () => dH && dS && T;
  dH = F.ctl(d.controls, {
    label: '\\kdH', cls: 'energy', min: -100, max: 100, step: 0.01, value: 44.01, unit: 'kJ', dec: 2, aria: 'enthalpy change, in kilojoules',
    specials: [{ at: () => (ready() ? T.v * dS.v / 1000 : null), label: 'ΔG = 0' }],
  });
  dS = F.ctl(d.controls, {
    label: '\\kdS', cls: 'entropy', min: -250, max: 250, step: 0.1, value: 118.8, unit: 'J/K', dec: 1, aria: 'entropy change, in joules per kelvin',
    specials: [{ at: () => (ready() ? 1000 * dH.v / T.v : null), label: 'ΔG = 0' }],
  });
  T = F.ctl(d.controls, {
    label: '\\kT', cls: 'temperature', min: 1, max: 1000, step: 0.1, value: 298, unit: 'K', dec: 1, aria: 'temperature, in kelvins',
    specials: [{ at: () => (ready() && dH.v * dS.v > 0 ? 1000 * dH.v / dS.v : null), label: 'ΔG = 0' }],
  });
  [dH, dS].forEach((c) => c.refresh());
  const ro = F.readout(d);
  let hits = [];
  F.hover(d.stage, () => hits);

  /* the four cases as the book's table sets them: columns ΔH > 0, ΔH < 0; rows ΔS > 0, ΔS < 0 */
  const CASES = [
    { h: 1, s: 1, a: 0.5, b: -0.35, words: ['spontaneous at', 'high temperature'], name: 'ΔH > 0 and ΔS > 0: spontaneous at high temperature' },
    { h: -1, s: 1, a: -0.5, b: -0.95, words: ['spontaneous at', 'any temperature'], name: 'ΔH < 0 and ΔS > 0: spontaneous at any temperature' },
    { h: 1, s: -1, a: 0.5, b: 0.95, words: ['nonspontaneous at', 'any temperature'], name: 'ΔH > 0 and ΔS < 0: nonspontaneous at any temperature' },
    { h: -1, s: -1, a: -0.5, b: 0.35, words: ['spontaneous at', 'low temperature'], name: 'ΔH < 0 and ΔS < 0: spontaneous at low temperature' },
  ];
  const TB = { l: 990, w: 185, gap: 8, t: 196, h: 176 };

  function table(ctx, sh, ss) {
    const cE = C('energy'), cS = C('entropy');
    text(ctx, 'ΔH > 0', TB.l + TB.w / 2, 146, cE, { size: 22, weight: 600, align: 'center' });
    text(ctx, 'ΔH < 0', TB.l + TB.w * 1.5 + TB.gap, 146, cE, { size: 22, weight: 600, align: 'center' });
    text(ctx, 'endothermic', TB.l + TB.w / 2, 174, PAL.muted, { size: 17, align: 'center' });
    text(ctx, 'exothermic', TB.l + TB.w * 1.5 + TB.gap, 174, PAL.muted, { size: 17, align: 'center' });
    text(ctx, 'ΔS > 0', TB.l - 12, TB.t + TB.h / 2, cS, { size: 22, weight: 600, align: 'right' });
    text(ctx, 'ΔS < 0', TB.l - 12, TB.t + TB.h * 1.5 + TB.gap, cS, { size: 22, weight: 600, align: 'right' });
    CASES.forEach((c, i) => {
      const col = c.h > 0 ? 0 : 1, row = c.s > 0 ? 0 : 1;
      const x0 = TB.l + col * (TB.w + TB.gap), y0 = TB.t + row * (TB.h + TB.gap), on = c.h === sh && c.s === ss;
      ctx.save();
      ctx.fillStyle = on ? alpha(cE, 0.08) : PAL.panel; ctx.fillRect(x0, y0, TB.w, TB.h);
      ctx.strokeStyle = on ? PAL.ink : PAL.rule; ctx.lineWidth = on ? 2.5 : 1.5; ctx.strokeRect(x0, y0, TB.w, TB.h);
      ctx.restore();
      const pl = x0 + 22, pr = x0 + TB.w - 22, pm = y0 + 58, ph = 38;
      line(ctx, pl, y0 + 16, pl, y0 + 100, alpha(PAL.ink, 0.4), 2);
      line(ctx, pl, pm, pr, pm, alpha(PAL.ink, 0.4), 2, [6, 6]);
      line(ctx, pl, pm - c.a * ph, pr, pm - c.b * ph, on ? cE : PAL.muted, on ? 4 : 3);
      text(ctx, c.words[0], x0 + TB.w / 2, y0 + 126, on ? PAL.ink : PAL.muted, { size: 17, align: 'center' });
      text(ctx, c.words[1], x0 + TB.w / 2, y0 + 150, on ? PAL.ink : PAL.muted, { size: 17, align: 'center' });
      hits.push({ x: x0 + TB.w / 2, y: y0 + TB.h / 2, r: 70, name: c.name });
    });
  }

  function draw() {
    const { ctx } = begin(d.c);
    const h = +dH.v.toFixed(2), sJ = +dS.v.toFixed(1), s = sJ / 1000, t = +T.v.toFixed(1);
    const g = h - t * s, cE = C('energy'), cT = C('temperature');
    const eq = Math.abs(dH.v - T.v * dS.v / 1000) < 1e-6 && Math.abs(sJ) > 1e-9;
    const tc = Math.abs(sJ) > 1e-9 ? h / s : null;
    hits = [];
    const ax = F.axes(ctx, G, [0, 1000], YR, { nx: 5, ny: 6, xl: 'T (K)', xc: cT, yl: 'ΔG (kJ)', yc: cE });
    const { X, Y } = ax;
    /* each region's name in the top or bottom corner farther from the line */
    const gap = (lvl, xs) => Math.min(...xs.map((x) => Math.abs(h - x * s - lvl)));
    const words = [['nonspontaneous', 135], ['spontaneous', -135]];
    const lines = topline(ctx, eq
      ? `At ${t.toFixed(1)} K, $\\kdG = 0$: the system is at equilibrium.`
      : `At ${t.toFixed(1)} K, $\\kdG ${g < 0 ? '<' : '>'} 0$: the process is ${g < 0 ? 'spontaneous' : 'nonspontaneous'}.`);
    const lab = F.labeller(ctx, H, { headline: lines });
    lab.block(G.l - 70, G.t - 40, G.l + 80, G.t - 8);
    for (const [w, lvl] of words) {
      const left = gap(lvl, [0, 100, 200]) >= gap(lvl, [800, 900, 1000]), wx = left ? G.l + 14 : G.r - 14, ww = F.measure(ctx, w, { size: 17 }) + 14;
      text(ctx, w, wx, Y(lvl), PAL.muted, { size: 17, align: left ? 'left' : 'right', bg: PAL.panel });
      lab.block(left ? wx - 7 : wx - ww, Y(lvl) - 14, left ? wx + ww : wx + 7, Y(lvl) + 14);
    }

    ctx.save(); ctx.beginPath(); ctx.rect(G.l, G.t, G.r - G.l, G.b - G.t); ctx.clip();
    line(ctx, G.l, Y(h), G.r, Y(h), alpha(cE, 0.8), 3, [10, 10]);
    F.curve(ctx, (x) => h - x * s, 0, 1000, X, Y, cE, 5, 2);
    ctx.restore();
    lab.add('ΔH', G.r - 60, Y(h), 0, h - (1000 * s) / 2 > h ? 1 : -1, cE, 22, 22);
    hits.push({ x: G.r - 60, y: Y(h), r: 18, name: `ΔH = ${minus(h.toFixed(2))} kJ, the value of ΔG at T = 0` });

    /* the ΔG label where the line is still inside the frame, toward the right */
    for (let x = 900; x >= 100; x -= 50) {
      const y = h - x * s;
      if (y > YR[0] + 15 && y < YR[1] - 15) { lab.add('ΔG', X(x), Y(y), 0, y > 0 ? 1 : -1, cE, 22, 26); break; }
    }

    /* the −TΔS term at the reader's temperature, from the ΔH level down to ΔG */
    const inside = (v) => v > YR[0] && v < YR[1];
    const px = X(t), bx = t > 880 ? px - 24 : px + 24;
    if (inside(h) && inside(g) && Math.abs(Y(g) - Y(h)) > 26) {
      F.vbracket(ctx, bx, Y(h), Y(g), cE, '−TΔS', t > 880 ? -1 : 1, { H });
      const ly = (Y(h) + Y(g)) / 2, w = F.measure(ctx, '−TΔS', { size: 22, weight: 600 }) + 20;
      if (t > 880) lab.block(bx - 16 - w, ly - 16, bx, ly + 16); else lab.block(bx, ly - 16, bx + 16 + w, ly + 16);
    }
    if (tc !== null && tc > 0 && tc <= 1000) {
      dot(ctx, X(tc), Y(0), PAL.ink, false, 9);
      lab.add(`${tc.toFixed(1)} K`, X(tc), Y(0), 0, h > 0 ? -1 : 1, cT, 20, 26);
      hits.push({ x: X(tc), y: Y(0), r: 16, name: `ΔG = 0 at T = ΔH/ΔS = ${tc.toFixed(1)} K` });
    }

    const p = F.pinned(ctx, G, X, Y, t, g, cE, `${minus(g.toFixed(1))} kJ`);
    if (!p.out) line(ctx, p.x, p.y + 11, p.x, G.b, alpha(cT, 0.7), 2, [4, 8]);
    hits.push({ x: p.x, y: p.y, r: 16, name: `ΔG = ${minus(g.toFixed(2))} kJ at ${t.toFixed(1)} K` });
    lab.flush();

    table(ctx, Math.sign(h), Math.sign(sJ));

    const H_ = hue('energy', h.toFixed(2)), S_ = hue('entropy', s.toFixed(4)), T_ = hue('temperature', t.toFixed(1));
    let tex, note;
    if (eq) {
      tex = `\\mk{T}{\\kT} = \\frac{\\mk{H}{\\kdH}}{\\mk{S}{\\kdS}} = \\frac{\\mk{h}{${H_}}\\ \\text{kJ}}{\\mk{s}{${S_}}\\ \\text{kJ/K}} = \\mk{t}{${hue('temperature', tc.toFixed(1))}}\\ \\text{K}`;
      note = h > 0 ? 'Above this temperature the process is spontaneous, and below it nonspontaneous.' : 'Below this temperature the process is spontaneous, and above it nonspontaneous.';
    } else {
      tex = `\\mk{G}{\\kdG} = \\mk{H}{\\kdH} - \\mk{T}{\\kT}\\mk{S}{\\kdS} = \\mk{h}{${H_}}\\ \\text{kJ} - (\\mk{t}{${T_}}\\ \\text{K})(\\mk{s}{${S_}}\\ \\text{kJ/K}) = \\mk{g}{${hue('energy', g.toFixed(2))}}\\ \\text{kJ}`;
      if (sJ === 0) note = 'With $\\kdS = 0$, $\\kdG = \\kdH$ at every temperature.';
      else if (h === 0) note = `With $\\kdH = 0$, $\\kdG$ is ${sJ > 0 ? 'negative' : 'positive'} at every temperature.`;
      else if (h * sJ > 0) note = `$\\kdG = 0$ at ${tc.toFixed(1)} K; ${h > 0 ? 'above' : 'below'} it the process is spontaneous.`;
      else note = `$\\kdH$ and $\\kdS$ have opposite signs, so $\\kdG$ is ${h > 0 ? 'positive' : 'negative'} at every temperature.`;
    }
    ro.set(tex, note, { form: eq });
  }
  still(d, draw);
})();

/* =====================================================================
   FIGURE 16.14: G against reaction progress for one mole of A turning
   into B at 298.15 K, G°(A) = 0: G(x) = xΔG° + RT[x ln x + (1−x) ln(1−x)],
   whose slope is ΔG° + RT ln Q with Q = x/(1 − x), lowest at Q = K =
   e^(−ΔG°/RT). ΔG° from −5 to 5 kJ/mol puts the minimum between 12 % and
   88 % products; the frame is fixed at G from −8 to 6 kJ/mol, which holds
   every curve the slider reaches (lowest −5.31) above the Q and K labels. No tick numbers on G, as
   the book prints none. Still: a relation with no clock.
===================================================================== */
(function () {
  const H = 600, d = sim('sim-gibbs', H);
  const G = { l: 165, r: 1080, t: 120, b: 500 };
  const RT = 8.314e-3 * 298.15, BX = 1110;
  const xlnx = (x) => (x > 0 ? x * Math.log(x) : 0);
  const Gof = (g0) => (x) => x * g0 + RT * (xlnx(x) + xlnx(1 - x));
  const Kof = (g0) => Math.exp(-g0 / RT);
  const xeq = (g0) => { const k = Kof(g0); return k / (1 + k); };
  const sig3 = (v) => (v >= 100 ? v.toFixed(1) : v.toPrecision(3));
  const g0c = F.ctl(d.controls, {
    label: '\\kdGo', cls: 'energy', min: -5, max: 5, step: 0.01, value: -2, unit: 'kJ/mol', dec: 2, detents: [-2, 2],
    aria: 'standard free energy change, in kilojoules per mole', specials: [{ at: 0, label: 'K = 1' }],
  });
  const xc = F.ctl(d.controls, {
    label: '\\text{progress}', cls: '', min: 0.01, max: 0.99, step: 0.01, value: 0.3, unit: '', dec: 2,
    aria: 'reaction progress, the fraction of the reactant turned into product', specials: [{ at: () => xeq(+g0c.v.toFixed(2)), label: 'Q = K' }],
  });
  const ro = F.readout(d);
  let hits = [];
  F.hover(d.stage, () => hits);

  function draw() {
    const { ctx } = begin(d.c);
    const g0 = +g0c.v.toFixed(2), x = xc.v, f = Gof(g0), xe = xeq(g0), at = Math.abs(x - xe) < 1e-6;
    const cE = C('energy'), cK = C('equilibrium-constant');
    hits = [];
    const { X, Y } = F.axes(ctx, G, [0, 1], [-8, 6], {
      nx: 4, ny: 7, xl: 'reaction progress', yl: 'Gibbs free energy (G)', yc: cE,
      fx: (v) => (v === 0 ? 'Reactants' : v === 1 ? 'Products' : ''), fy: () => '',
    });
    const q = x / (1 - x), qs = sig3(q), k = Kof(g0), ks = sig3(k);
    const head = at
      ? '$\\kQrxn = \\kK$: $\\kdG = 0$, the free energy is at its minimum, and the system is at equilibrium.'
      : `$\\kQrxn ${q < k ? '<' : '>'} \\kK$: $\\kdG ${q < k ? '<' : '>'} 0$, and the reaction proceeds ${q < k ? 'forward' : 'in reverse'}, down to the minimum.`;
    const lab = F.labeller(ctx, H, { headline: topline(ctx, head) });

    /* the two standard free energies and the bracket between them, beside the frame */
    const lev = alpha(PAL.ink, 0.45);
    line(ctx, G.l, Y(0), BX + 10, Y(0), lev, 2, [10, 10]);
    line(ctx, G.l, Y(g0), BX + 10, Y(g0), lev, 2, [10, 10]);
    text(ctx, 'G°(reactants)', G.l - 12, Y(0), PAL.ink, { size: 20, align: 'right' });
    const py0 = Y(g0) + (g0 > 0 ? -30 : 30);
    text(ctx, 'G°(products)', BX + 14, py0, PAL.ink, { size: 20, bg: PAL.panel });
    F.vbracket(ctx, BX, Y(0), Y(g0), cE, `ΔG° = ${minus(g0.toFixed(2))}`, 1, { H });
    hits.push({ x: BX, y: (Y(0) + Y(g0)) / 2, r: 24, name: `ΔG° = G°(products) − G°(reactants) = ${minus(g0.toFixed(2))} kJ/mol` });

    F.curve(ctx, f, 0, 1, X, Y, cE, 5, 240);

    /* the minimum, where Q = K */
    const mx = X(xe), my = Y(f(xe));
    line(ctx, mx, my + 8, mx, G.b, alpha(PAL.ink, 0.45), 2, [4, 8]);
    dot(ctx, mx, my, cE, false, 8);
    const room = (px) => (px - G.l < 150 ? 1 : G.r - px < 150 ? -1 : 0);
    const qx = X(x), qSide = room(qx) || (x < xe ? -1 : 1), kSide = room(mx) || -qSide;
    lab.add(at ? `Q = K = ${ks}` : `K = ${ks}`, mx, G.b - 6, 0.55 * kSide, -0.85, cK, 22, 34);
    hits.push({ x: mx, y: my, r: 16, name: `the minimum of G, where Q = K = ${ks}` });

    /* the reader's mixture */
    if (!at) {
      const px = X(x), py = Y(f(x));
      line(ctx, px, py + 10, px, G.b, alpha(PAL.ink, 0.45), 2, [4, 8]);
      lab.add(`Q = ${qs}`, px, G.b - 6, 0.55 * qSide, -0.85, cK, 22, 34);
      dot(ctx, px, py, cE, true, 9);
      hits.push({ x: px, y: py, r: 16, name: `the mixture: ${Math.round(x * 100)} % product, Q = ${qs}` });
    } else dot(ctx, mx, my, cE, true, 9);
    lab.flush();

    const G0 = hue('energy', g0.toFixed(2)), TT = hue('temperature', '298.15');
    let tex;
    if (at) {
      const e = (-g0 / RT).toFixed(3), kk = sig3(Math.exp(+e));
      tex = `\\mk{G}{\\kdG} = 0,\\quad \\mk{Q}{\\kQrxn} = \\mk{K}{\\kK} = e^{-\\mk{G0}{\\kdGo}/\\mk{RT}{R\\kT}} = e^{\\mk{e}{${e}}} = \\mk{k}{${hue('equilibrium-constant', kk)}}`;
    } else {
      const dg = g0 + RT * Math.log(+qs);
      tex = `\\mk{G}{\\kdG} = \\mk{G0}{\\kdGo} + \\mk{RT}{R\\kT}\\ln\\mk{Q}{\\kQrxn} = \\mk{g0}{${G0}} + (\\mk{r}{8.314\\times10^{-3}})(\\mk{t}{${TT}})\\ln\\mk{q}{${hue('equilibrium-constant', qs)}} = \\mk{g}{${hue('energy', dg.toFixed(2))}}\\ \\text{kJ/mol}`;
    }
    const note = g0 === 0 ? '$\\kK = 1$: reactants and products are comparably abundant at equilibrium.'
      : g0 < 0 ? '$\\kK > 1$: products are more abundant at equilibrium.' : '$\\kK < 1$: reactants are more abundant at equilibrium.';
    ro.set(tex, note, { form: at });
  }
  still(d, draw);
})();
};
