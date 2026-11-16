/* Figures for section 10.4 Phase Diagrams. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['10.4'] = function (root, F) {
const { fmt, C, PAL, alpha, ctl, register, begin, line, dot, text, headline } = F;
const sim = (id, H) => F.sim(root, id, H);
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;

/* =====================================================================
   FIGURE 10.30 + 10.31 + 10.34: the phase diagram of water or carbon
   dioxide, drawn to scale from measured data on a logarithmic pressure
   axis. Water adds a close-up strip of −12 to 3 °C on the same pressure
   axis, where the lean of its solid-liquid curve can be seen at its true
   size. A state point is set by T and P; the dashed line of constant
   pressure through it is marked where it crosses a curve, with the
   crossing temperature. A window beside the graph shows the molecules of
   the sample. Still: the figure answers its controls; the molecules ease
   between arrangements when the state changes, and a change of substance
   bends one diagram into the other. The three curves and the triple and
   critical points are the section's referents; the regions stay ink.
===================================================================== */
(function () {
  const d = sim('sim-phase', 660);
  const K = 273.15, ln = Math.log, L10 = Math.log10;
  /* interpolates ln P linearly in T through a table of measured points */
  const table = (pts) => (T) => {
    let i = 0; while (i < pts.length - 2 && T > pts[i + 1][0]) i++;
    const [t0, p0] = pts[i], [t1, p1] = pts[i + 1];
    return Math.exp(ln(p0) + ((T - t0) / (t1 - t0)) * (ln(p1) - ln(p0)));
  };
  /* Clausius-Clapeyron through (Ta, Pa) with slope B = ΔH/R in kelvins */
  const cc = (Ta, Pa, B) => (T) => Pa * Math.exp(B * (1 / (Ta + K) - 1 / (T + K)));
  const S = {
    water: {
      name: 'water', mol: 'H₂O', Tt: 0.01, Pt: 0.6117, Tc: 374, Pc: 22089,
      /* steam-table vapor pressures, °C and kPa; the critical pressure is the book's */
      vap: table([[0.01, 0.6117], [20, 2.339], [40, 7.384], [60, 19.95], [80, 47.41], [100, 101.325], [150, 476.2], [200, 1554.9], [250, 3976], [300, 8588], [350, 16529], [374, 22089]]),
      /* the vapor pressure of ice */
      sub: table([[-60, 0.00108], [-50, 0.00394], [-40, 0.01285], [-30, 0.0380], [-20, 0.1035], [-10, 0.2601], [-5, 0.4017], [0.01, 0.6117]]),
      /* the melting point of ice: 0 °C at 1 atm, −0.7 °C at 10,000 kPa, −9 °C at 100,000 kPa */
      melt: (P) => 0.01 - 7.6e-5 * P - 1.37e-10 * P * P,
      T: [-100, 600], tick: 100, lP: [-2, 5], mag: [-12, 3], magTick: 3,
      s: 'ice', l: 'liquid water', g: 'water vapor',
      at: { solid: ['ice (solid)', -4.5, 2], liquid: ['water (liquid)', 120, 3.6], gas: ['water vapor (gas)', 300, 0.9], scf: ['supercritical fluid', 0, 0] },
      ice: [-50, 3.3],
      start: [-10, 50],
    },
    co2: {
      name: 'carbon dioxide', mol: 'CO₂', Tt: -56.6, Pt: 518, Tc: 31.1, Pc: 7380,
      vap: cc(-56.6, 518, ln(7380 / 518) / (1 / (K - 56.6) - 1 / (K + 31.1))),
      sub: cc(-56.6, 518, 26100 / 8.314),
      /* the Span-Wagner melting equation, P/Pt = 1 + a x + b x², x = T/Tt − 1, solved for T */
      melt: (P) => { const a = 1955.539, b = 2055.4593, r = Math.max(0, P / 518 - 1), x = (-a + Math.sqrt(a * a + 4 * b * r)) / (2 * b); return (K - 56.6) * (1 + x) - K; },
      T: [-100, 100], tick: 25, lP: [1, 6], mag: null,
      s: 'solid carbon dioxide', l: 'liquid carbon dioxide', g: 'gaseous carbon dioxide',
      at: { solid: ['solid', -82, 4.3], liquid: ['liquid', -12, 4.5], gas: ['gas', 45, 2.2], scf: ['supercritical fluid', 0, 0] },
      start: [-30, 2000],
    },
  };
  /* the pressures the slider walks, 1, 1.5, 2, 2.5, 3, 4 … 9 of each decade with the diagram's named pressures set in */
  const PS = (() => {
    const m = [1, 1.5, 2, 2.5, 3, 4, 5, 6, 7, 8, 9], out = [];
    for (let e = -2; e <= 5; e++) m.forEach((k) => out.push(+(k * 10 ** e).toPrecision(3)));
    out.push(1e6, 0.6117, 101.325, 518, 7380, 22089);
    return [...new Set(out)].sort((a, b) => a - b);
  })();
  const pIdx = (p) => PS.reduce((best, q, i) => (Math.abs(L10(q / p)) < Math.abs(L10(PS[best] / p)) ? i : best), 0);
  const fmtP = (p) => p >= 10000 ? Math.round(p).toLocaleString('en-US') : p >= 100 ? (Number.isInteger(p) ? String(p) : p.toFixed(1)) : String(+p.toPrecision(p >= 1 ? 3 : 2));
  const fmtT = (t, dec = 1) => fmt(t, dec).replace('-', '−');
  /* the temperature slider's track: for water the stretch of the close-up, −12 to 3 °C, takes a quarter of it, so a drag
     there moves in hundredths of a degree while the rest runs at about a degree a step; carbon dioxide's track is even */
  const KNOTS = { water: [[0, -100], [150, -12], [400, 3], [1000, 600]], co2: [[0, -100], [1000, 100]] };
  const along = (pts, x, i, j) => { let k = 0; while (k < pts.length - 2 && x > pts[k + 1][i]) k++; const [p, q] = [pts[k], pts[k + 1]]; return p[j] + ((x - p[i]) / (q[i] - p[i])) * (q[j] - p[j]); };
  const uToT = (key, u) => along(KNOTS[key], u, 0, 1), tToU = (key, t) => along(KNOTS[key], t, 1, 0);
  const tRange = (k, t) => ({ min: 0, max: 1000, step: 1, value: tToU(k, t), fmt: (u) => fmtT(uToT(k, u)) + ' °C' });
  const pRange = (k, p) => ({ min: pIdx(10 ** S[k].lP[0]), max: pIdx(10 ** S[k].lP[1]), step: 1, value: pIdx(p), fmt: (i) => fmtP(PS[Math.round(i)]) + ' kPa' });

  const sub = F.choice(d.controls, { label: '\\text{substance}', aria: 'the substance', value: 'water',
    options: [{ value: 'water', label: 'water' }, { value: 'co2', label: 'carbon dioxide' }],
    onInput: (v) => { Tsl.range(tRange(v, S[v].start[0])); Psl.range(pRange(v, S[v].start[1])); } });
  const cur = () => S[sub.value];
  /* the temperatures where the isobar at P crosses a curve, in order of rising temperature */
  function crossings(s, P) {
    if (P < s.Pt) return [{ T: F.solve((t) => s.sub(t) - P, -150, s.Tt) ?? s.T[0] - 100, kind: 'sub' }];
    const out = [{ T: s.melt(P), kind: 'melt' }];
    if (P < s.Pc) out.push({ T: F.solve((t) => s.vap(t) - P, s.Tt, s.Tc) ?? s.Tc, kind: 'boil' });
    return out;
  }
  const Pnow = () => PS[Math.round(Psl.v)];
  const uOf = (t) => (t == null ? null : tToU(sub.value, t));
  const Tsl = ctl(d.controls, { label: '\\kT', cls: 'temperature', ...tRange('water', -10), unit: '°C', dec: 1, aria: 'temperature in degrees Celsius',
    specials: [{ at: () => uOf(cur().Tt), label: 'triple point' }, { at: () => uOf(cur().Tc), label: 'critical point' },
      { at: () => uOf(crossings(cur(), Pnow())[0]?.T) }, { at: () => uOf(crossings(cur(), Pnow())[1]?.T) }] });
  const Psl = ctl(d.controls, { label: '\\kP', cls: 'pressure', ...pRange('water', 50), unit: 'kPa', dec: 0, aria: 'pressure in kilopascals',
    specials: [{ at: () => pIdx(cur().Pt), label: 'triple point' }, { at: () => pIdx(101.325), label: '1 atm' }, { at: () => pIdx(cur().Pc), label: 'critical point' }] });

  /* the state at (T, P): one phase, two on a curve, three at the triple point */
  const TOL = 0.35;
  function stateOf(s, T, P) {
    const lp = L10(P);
    if (Math.abs(T - s.Tt) < TOL && Math.abs(lp - L10(s.Pt)) < 0.01) return { key: 'triple', bands: ['solid', 'liquid', 'gas'] };
    if (Math.abs(T - s.Tc) < TOL && Math.abs(lp - L10(s.Pc)) < 0.01) return { key: 'critical', bands: ['scf'] };
    const on = crossings(s, P).find((c) => Math.abs(T - c.T) < TOL);
    if (on) return on.kind === 'melt' ? { key: 'melt', bands: ['solid', 'liquid'] } : on.kind === 'boil' ? { key: 'boil', bands: ['liquid', 'gas'] } : { key: 'sub', bands: ['solid', 'gas'] };
    if (P >= s.Pt) {
      if (T < s.melt(P)) return { key: 'solid', bands: ['solid'] };
      if (T < s.Tc) return P > s.vap(T) ? { key: 'liquid', bands: ['liquid'] } : { key: 'gas', bands: ['gas'] };
      return P >= s.Pc ? { key: 'scf', bands: ['scf'] } : { key: 'gas', bands: ['gas'] };
    }
    return T < s.Tt && P > s.sub(T) ? { key: 'solid', bands: ['solid'] } : { key: 'gas', bands: ['gas'] };
  }

  /* ---------- the diagram: water's close-up strip and full diagram share one pressure axis ---------- */
  const TOP = 120, BOT = 530;
  const PANES = { water: { mag: [130, 330], main: [390, 1000] }, co2: { mag: null, main: [130, 1000] } };
  const scale = (s, [l, r], [t0, t1]) => (t) => l + ((t - t0) / (t1 - t0)) * (r - l);
  const Yof = (s) => (lp) => BOT - ((lp - s.lP[0]) / (s.lP[1] - s.lP[0])) * (BOT - TOP);
  const geo = (key) => { const s = S[key], p = PANES[key]; return { X: scale(s, p.main, s.T), Xm: p.mag ? scale(s, p.mag, s.mag) : null, Y: Yof(s), main: p.main, mag: p.mag }; };
  const G = { water: geo('water'), co2: geo('co2') };
  /* a substance's three curves as polylines in a panel, each of 80 points */
  function curvesOf(s, X, Y, t0, t1) {
    const n = 80, pts = (f, a, b) => Array.from({ length: n + 1 }, (_, i) => f(a + ((b - a) * i) / n));
    return {
      sub: pts((t) => [X(t), Y(L10(s.sub(t)))], t0 - 20, s.Tt),
      vap: pts((t) => [X(t), Y(L10(s.vap(t)))], s.Tt, Math.min(s.Tc, t1 + 20)),
      melt: pts((lp) => [X(s.melt(10 ** lp)), Y(lp)], L10(s.Pt), s.lP[1] + 0.2),
      tp: [X(s.Tt), Y(L10(s.Pt))], cp: [X(s.Tc), Y(L10(s.Pc))],
    };
  }
  const CURVES = { water: curvesOf(S.water, G.water.X, G.water.Y, ...S.water.T), co2: curvesOf(S.co2, G.co2.X, G.co2.Y, ...S.co2.T) };
  const MAG = curvesOf(S.water, G.water.Xm, G.water.Y, ...S.water.mag);
  const stroke = (ctx, pts, color, w, dash) => {
    ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = w; ctx.lineJoin = 'round'; if (dash) ctx.setLineDash(dash);
    ctx.beginPath(); pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.stroke(); ctx.restore();
  };
  const clip = (ctx, [l, r], f) => { ctx.save(); ctx.beginPath(); ctx.rect(l, TOP, r - l, BOT - TOP); ctx.clip(); f(); ctx.restore(); };
  const decade = (e) => { const v = 10 ** e; return v >= 1 ? Math.round(v).toLocaleString('en-US') : String(+v.toPrecision(1)); };
  /* one panel's frame: gridlines, its two axis lines and its temperature ticks */
  function pane(ctx, s, [l, r], [t0, t1], step, X, Y) {
    for (let t = t0; t <= t1 + 1e-9; t += step) { if (t > t0) line(ctx, X(t), TOP, X(t), BOT, PAL.rule, 1.5); text(ctx, fmtT(t, 0), X(t), BOT + 26, PAL.muted, { size: 17, align: 'center' }); }
    for (let e = s.lP[0] + 1; e <= s.lP[1]; e++) line(ctx, l, Y(e), r, Y(e), PAL.rule, 1.5);
    line(ctx, l, TOP, l, BOT, PAL.muted, 2); line(ctx, l, BOT, r, BOT, PAL.muted, 2);
  }
  function frame(ctx, key) {
    const s = S[key], g = G[key], left = (g.mag ?? g.main)[0];
    if (g.mag) {
      /* the strip the close-up magnifies, shaded alike in both panels */
      ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.05);
      ctx.fillRect(g.mag[0], TOP, g.mag[1] - g.mag[0], BOT - TOP); ctx.fillRect(g.X(s.mag[0]), TOP, g.X(s.mag[1]) - g.X(s.mag[0]), BOT - TOP); ctx.restore();
      pane(ctx, s, g.mag, s.mag, s.magTick, g.Xm, g.Y);
      text(ctx, 'close-up near 0 °C', (g.mag[0] + g.mag[1]) / 2, BOT + 60, PAL.muted, { size: 17, align: 'center' });
    }
    pane(ctx, s, g.main, s.T, s.tick, g.X, g.Y);
    for (let e = s.lP[0]; e <= s.lP[1]; e++) text(ctx, decade(e), left - 14, g.Y(e), PAL.muted, { size: 17, align: 'right' });
    text(ctx, 'Pressure (kPa)', left, TOP - 26, C('pressure'), { align: 'left', weight: 600, size: 20 });
  }
  /* a label kept off the boxes already placed: above or below its point, flipped or slid where it would collide */
  const boxes = [];
  const hits = [];
  const overlap = (a, b) => a.l < b.r && b.l < a.r && a.t < b.b && b.t < a.b;
  function place(ctx, parts, x, y, size, tries) {
    const w = parts.reduce((a, p) => a + F.measure(ctx, typeof p === 'string' ? p : p[0], { size, weight: typeof p === 'string' ? 400 : 600 }), 0), h = size + 6;
    let best = null;
    for (const [dx, dy, al] of tries) {
      const l = al === 'left' ? x + dx : al === 'right' ? x + dx - w : x + dx - w / 2, b = { l: l - 4, r: l + w + 4, t: y + dy - h / 2, b: y + dy + h / 2 };
      if (b.l < 6 || b.r > 1394 || b.t < TOP - 4 || b.b > BOT + 4) continue;
      if (!boxes.some((o) => overlap(b, o))) { best = { b, l }; break; }
      best = best ?? { b, l };
    }
    if (!best) return;
    boxes.push(best.b);
    F.rich(ctx, parts, best.l, (best.b.t + best.b.b) / 2, { size, bg: PAL.panel });
  }

  /* ---------- the molecule window ---------- */
  const W = { l: 1070, r: 1345, t: 150, b: 410 }, N = 49;
  const rnd = (i, k) => { const x = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453; return x - Math.floor(x); };
  /* the slots one phase fills in a band of the window, bottom row first */
  function slots(phase, y0, y1, seed, f) {
    const out = [], w = W.r - W.l;
    if (phase === 'gas') {
      const n = Math.max(1, Math.round((5 * (y0 - y1)) / (W.b - W.t)));
      for (let i = 0; i < n; i++) out.push([W.l + 26 + rnd(i, seed) * (w - 52), y1 + 24 + rnd(i, seed + 1) * (y0 - y1 - 48), rnd(i, seed + 2) * 6.28]);
      return out;
    }
    const gap = (phase === 'scf' ? 64 : 45) * f, jit = phase === 'solid' ? 0 : phase === 'liquid' ? 10 : 20;
    const cols = Math.floor((w - 20) / gap), rows = Math.max(1, Math.floor((y0 - y1 - 6) / gap)), x0 = W.l + (w - (cols - 1) * gap) / 2;
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      const i = r * cols + c;
      if (phase === 'liquid' && rnd(i, seed + 5) < 0.12) continue;
      out.push([x0 + c * gap + (rnd(i, seed) - 0.5) * 2 * jit, y0 - gap / 2 - 3 - r * gap + (rnd(i, seed + 1) - 0.5) * 2 * jit, phase === 'solid' ? 0.6 : rnd(i, seed + 2) * 6.28]);
    }
    return out;
  }
  /* the arrangement of a state: its bands stacked from the bottom of the window, and the surfaces between them */
  function layout(st, v) {
    const n = st.bands.length, h = (W.b - W.t) / n, all = [], seams = [];
    st.bands.forEach((ph, k) => { const y0 = W.b - k * h, y1 = y0 - h; all.push(...slots(ph, y0, y1, 11 * k + (ph === 'gas' ? 3 : 0), v === 'co2' ? 1.25 : 1)); if (k) seams.push({ y: y0, lower: st.bands[k - 1], upper: ph }); });
    return { mols: Array.from({ length: N }, (_, i) => (i < all.length ? [...all[i], 1] : [W.l + (W.r - W.l) / 2, W.t + 30, 0, 0])), seams };
  }
  function molecule(ctx, v, x, y, a) {
    const ball = (bx, by, r, el) => { ctx.beginPath(); ctx.arc(bx, by, r, 0, 2 * Math.PI); ctx.fillStyle = F.el(el); ctx.fill(); ctx.lineWidth = 1.2; ctx.strokeStyle = alpha(PAL.ink, 0.55); ctx.stroke(); };
    if (v === 'water') {
      [a - 0.91, a + 0.91].forEach((b) => ball(x + 13 * Math.cos(b), y + 13 * Math.sin(b), 6.5, 'H'));
      ball(x, y, 11, 'O');
    } else {
      ball(x, y, 9.5, 'C');
      [a, a + Math.PI].forEach((b) => ball(x + 16 * Math.cos(b), y + 16 * Math.sin(b), 9.5, 'O'));
    }
  }
  let shown = null, from = null, lay = null;
  const tw = F.tween(d, 1);
  F.hover(d.stage, () => hits);

  const CURVE = { sub: ['sub-curve', 'solid-gas curve: sublimation, deposition'], vap: ['vap-curve', 'liquid-gas curve: vaporization, condensation'], melt: ['melt-curve', 'solid-liquid curve: melting, freezing'] };
  function draw() {
    const { ctx } = begin(d.c);
    boxes.length = 0; hits.length = 0;
    const v = sub.value, s = S[v], g = G[v], T = uToT(v, Tsl.v), P = Pnow(), k = F.ease.smooth(sub.k);
    const Y = g.Y, lp = L10(P), yP = Y(lp);

    /* the frames cross-fade; the curves of one substance bend into the other's */
    ['water', 'co2'].forEach((key) => sub.only(ctx, key, () => frame(ctx, key), [0, 0]));
    text(ctx, 'Temperature (°C)', g.main[1], BOT + 60, C('temperature'), { align: 'right', weight: 600, size: 20 });
    const a = CURVES[sub.from ?? v], b = CURVES[v], mixP = (p, q) => [p[0] + (q[0] - p[0]) * k, p[1] + (q[1] - p[1]) * k];
    const cv = k >= 1 ? b : { sub: F.lerpPts(a.sub, b.sub, k), vap: F.lerpPts(a.vap, b.vap, k), melt: F.lerpPts(a.melt, b.melt, k), tp: mixP(a.tp, b.tp), cp: mixP(a.cp, b.cp) };
    const mainL = (G[sub.from ?? v].main[0]) + (g.main[0] - G[sub.from ?? v].main[0]) * k;
    const M = [mainL, 1000];
    clip(ctx, M, () => {
      /* the supercritical fluid's fence: up from the critical point to the solid-liquid curve or the top, and across to the right */
      const yTop = v === 'co2' && k >= 1 ? Y(F.solve((q) => s.melt(10 ** q) - s.Tc, 3, 7) ?? 6) : TOP;
      stroke(ctx, [cv.cp, [cv.cp[0], yTop]], alpha(PAL.ink, 0.4), 2.5, [10, 10]);
      stroke(ctx, [cv.cp, [M[1], cv.cp[1]]], alpha(PAL.ink, 0.4), 2.5, [10, 10]);
      ['sub', 'vap', 'melt'].forEach((c) => stroke(ctx, cv[c], F.ref(CURVE[c][0]), 4));
    });
    sub.only(ctx, 'water', () => clip(ctx, PANES.water.mag, () => ['sub', 'vap', 'melt'].forEach((c) => stroke(ctx, MAG[c], F.ref(CURVE[c][0]), 4))), [0, 0]);
    dot(ctx, cv.tp[0], cv.tp[1], F.ref('triple-point'), true, 8); dot(ctx, cv.cp[0], cv.cp[1], F.ref('critical-point'), true, 8);
    if (v === 'water') sub.only(ctx, 'water', () => dot(ctx, MAG.tp[0], MAG.tp[1], F.ref('triple-point'), true, 8), [0, 0]);
    if (k >= 1) {
      ['sub', 'vap', 'melt'].forEach((c) => [cv[c], g.mag ? MAG[c] : []].forEach((pts) => pts.forEach(([x, y], i) => { if (i % 4 === 0 && y >= TOP && y <= BOT && x >= (g.mag ?? M)[0] && x <= M[1]) hits.push({ x, y, r: 12, name: 'the ' + CURVE[c][1] }); })));
      hits.push({ x: cv.tp[0], y: cv.tp[1], r: 14, name: `the triple point, ${fmtT(s.Tt, 2)} °C and ${fmtP(s.Pt)} kPa` }, { x: cv.cp[0], y: cv.cp[1], r: 14, name: `the critical point, ${fmtT(s.Tc)} °C and ${fmtP(s.Pc)} kPa` });
      if (g.mag) hits.push({ x: MAG.tp[0], y: MAG.tp[1], r: 14, name: `the triple point, ${fmtT(s.Tt, 2)} °C and ${fmtP(s.Pt)} kPa` });
    }

    /* the curves are kept clear of the labels placed round the isobar */
    ['sub', 'vap', 'melt'].forEach((c) => [cv[c], g.mag && k >= 1 ? MAG[c] : []].forEach((pts) => pts.forEach(([x, y]) => boxes.push({ l: x - 5, r: x + 5, t: y - 5, b: y + 5, curve: true }))));
    /* the region names, the two points' labels and the key, for the substance shown */
    ctx.save(); ctx.globalAlpha *= k;
    const R = s.at, gx = g.X;
    const region = (name, x, y) => { text(ctx, name, x, y, PAL.ink, { size: 22, align: 'center' }); const w = F.measure(ctx, name, { size: 22 }); boxes.push({ l: x - w / 2 - 4, r: x + w / 2 + 4, t: y - 15, b: y + 15 }); };
    if (g.mag) region(R.solid[0], g.Xm(R.solid[1]), Y(R.solid[2])); else region(R.solid[0], gx(R.solid[1]), Y(R.solid[2]));
    if (v === 'water') region('ice', gx(s.ice[0]), Y(s.ice[1]));
    region(R.liquid[0], gx(R.liquid[1]), Y(R.liquid[2]));
    region(R.gas[0], gx(R.gas[1]), Y(R.gas[2]));
    const scx = (cv.cp[0] + M[1]) / 2, scy = (cv.cp[1] + TOP) / 2;
    if (M[1] - cv.cp[0] > 190) region('supercritical fluid', scx, scy);
    else { region('supercritical', scx, scy - 14); region('fluid', scx, scy + 14); }
    const vals = (t, p, dt = 1) => [[`${fmtT(t, dt)} °C`, C('temperature')], ', ', [`${fmtP(p)} kPa`, C('pressure')]];
    const pointLabel = (name, ref, x, y0, t, p, dt, up) => {
      const y = up ? y0 - 70 : y0;
      const w = Math.max(F.measure(ctx, name, { size: 17, weight: 600 }), F.measure(ctx, `${fmtT(t, dt)} °C, ${fmtP(p)} kPa`, { size: 17, weight: 600 }));
      const l = Math.min(x + 14, M[1] - 6 - w);
      text(ctx, name, l, y + 24, F.ref(ref), { size: 17, weight: 600, align: 'left', bg: PAL.panel });
      F.rich(ctx, vals(t, p, dt), l, y + 46, { size: 17, bg: PAL.panel });
      boxes.push({ l: l - 4, r: l + w + 4, t: y + 12, b: y + 58 });
    };
    pointLabel('triple point', 'triple-point', cv.tp[0], cv.tp[1], s.Tt, s.Pt, v === 'water' ? 2 : 1);
    pointLabel('critical point', 'critical-point', cv.cp[0], cv.cp[1], s.Tc, s.Pc, v === 'water' ? 0 : 1, v === 'co2');
    ctx.restore();
    /* the key under the window: each curve by the pair of changes that happen across it */
    F.legend(ctx, { l: W.l - 12, r: W.r + 12, t: W.b + 14, b: BOT + 12 }, [
      { s: 'sublimation, deposition', color: F.ref('sub-curve'), w: 4 },
      { s: 'melting, freezing', color: F.ref('melt-curve'), w: 4 },
      { s: 'vaporization, condensation', color: F.ref('vap-curve'), w: 4 },
    ], { corner: 'tl' });

    /* the isobar through the state point across every panel, its crossings and their temperatures, and the point itself */
    const panes = g.mag ? [[g.mag, g.Xm, s.mag], [M, gx, s.T]] : [[M, gx, s.T]];
    const cr = crossings(s, P);
    ctx.save(); ctx.globalAlpha *= k;
    if (yP >= TOP - 1 && yP <= BOT + 1) {
      panes.forEach(([[l, r]]) => line(ctx, l, yP, r, yP, alpha(C('pressure'), 0.75), 2.5, [10, 10]));
      hits.push({ x: (M[0] + M[1]) / 2, y: yP, r: 10, name: `constant pressure, ${fmtP(P)} kPa` });
      cr.forEach((c, ci) => {
        if (ci && Math.abs(c.T - cr[ci - 1].T) < TOL) return;
        /* a crossing is labelled once, in the close-up where it falls inside it */
        let labelled = false;
        panes.forEach(([[l, r], X, rg], pi) => {
          if (c.T < rg[0] || c.T > rg[1]) return;
          const x = X(c.T);
          dot(ctx, x, yP, C('temperature'), false, 8);
          const inMag = g.mag && pi === 0;
          if (labelled || (g.mag && !inMag && c.T >= s.mag[0] && c.T <= s.mag[1])) return;
          labelled = true;
          place(ctx, [[`${fmtT(c.T, inMag ? (Math.abs(c.T) < 1 ? 2 : 1) : 0)} °C`, C('temperature')]], x, yP, 17,
            [[0, -24, 'center'], [0, 24, 'center'], [10, -24, 'left'], [-10, -24, 'right'], [10, 24, 'left'], [-10, 24, 'right']]);
        });
      });
      place(ctx, [[`${fmtP(P)} kPa`, C('pressure')]], M[1] - 6, yP, 17, [0, 0.2, 0.35, 0.5, 0.65].flatMap((f) => [[-(M[1] - M[0]) * f, -18, 'right'], [-(M[1] - M[0]) * f, 18, 'right']]));
    }
    panes.forEach(([[l, r], X, rg]) => {
      if (T < rg[0] || T > rg[1]) return;
      const x = X(T), y = Math.min(BOT, Math.max(TOP, yP));
      line(ctx, x, y + 10, x, BOT, alpha(PAL.ink, 0.35), 2, [4, 8]);
      dot(ctx, x, y, PAL.ink, true, 9);
      hits.push({ x, y, r: 12, name: `the sample, ${fmtT(T)} °C and ${fmtP(P)} kPa` });
    });
    ctx.restore();

    /* the window on the sample: the molecules move to the new arrangement when the state changes */
    const st = stateOf(s, T, P), wkey = v + ':' + st.key;
    if (wkey !== shown) { from = lay ? current() : null; lay = layout(st, v); shown = wkey; if (from) { tw.set(0); tw.to(1, 900); } }
    function current() { const e = F.ease.smooth(tw.v); return lay.mols.map((m, i) => (from ? m.map((x, j) => from[i][j] + (x - from[i][j]) * e) : m)); }
    const mols = current();
    ctx.save(); ctx.fillStyle = PAL.panel; ctx.fillRect(W.l, W.t, W.r - W.l, W.b - W.t); ctx.restore();
    ctx.save(); ctx.beginPath(); ctx.rect(W.l, W.t, W.r - W.l, W.b - W.t); ctx.clip();
    lay.seams.forEach((sm) => { if (sm.upper === 'gas' || sm.lower === 'solid') line(ctx, W.l, sm.y, W.r, sm.y, alpha(PAL.ink, sm.upper === 'gas' ? 0.6 : 0.3), 2, sm.upper === 'gas' ? undefined : [4, 8]); });
    mols.forEach(([x, y, ang, on]) => { if (on < 0.02) return; ctx.save(); ctx.globalAlpha *= on; molecule(ctx, v, x, y, ang); ctx.restore(); });
    ctx.restore();
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2; ctx.strokeRect(W.l, W.t, W.r - W.l, W.b - W.t); ctx.restore();
    text(ctx, s.mol + ' molecules in the sample', (W.l + W.r) / 2, W.t - 22, PAL.muted, { size: 17, align: 'center' });
    hits.push({ x: (W.l + W.r) / 2, y: (W.t + W.b) / 2, r: 120, name: `${s.mol} molecules of the sample` });

    /* the sentence at the top and the reading in the readout */
    const where = `At ${fmtT(T)} °C and ${fmtP(P)} kPa`;
    const H = {
      solid: `${where}, ${s.name} is a solid${v === 'water' ? ', ice' : ''}.`,
      liquid: `${where}, ${s.name} is a liquid.`,
      gas: `${where}, ${s.name} is a gas.`,
      scf: `${where}, ${s.name} is a supercritical fluid.`,
      melt: `${where}, ${s.s} and ${s.l} are in equilibrium.`,
      boil: `${where}, ${s.l} and ${s.g} are in equilibrium.`,
      sub: `${where}, ${s.s} and ${s.g} are in equilibrium.`,
      triple: `At the triple point, ${s.s}, ${s.l} and ${s.g} are all in equilibrium.`,
      critical: `At the critical point, the boundary between ${s.l} and ${s.g} disappears.`,
    };
    headline(ctx, H[st.key]);
    /* the transition temperatures at this pressure in order, T set among them: = where it sits on one */
    const SYM = { melt: '\\kT_{\\text{melt}}', boil: '\\kT_{\\text{boil}}', sub: '\\kT_{\\text{sub}}', crit: '\\kT_{\\text{c}}' };
    const deg = (t, dec) => hue('temperature', `${fmt(t, dec)}\\ ^\\circ\\text{C}`);
    const dp = (t) => (Math.abs(t) < 1 ? 2 : 1);
    const items = cr.map((c) => ({ T: c.T, s: `${SYM[c.kind]} = ${deg(c.T, dp(c.T))}` }));
    if (P >= s.Pc) items.push({ T: s.Tc, s: `${SYM.crit} = ${deg(s.Tc, 1)}` });
    items.sort((p, q) => p.T - q.T);
    /* T sits among them in order; on a curve it stands first among the equal ones, written bare */
    const on = items.findIndex((it) => Math.abs(it.T - T) < TOL), next = items.findIndex((it) => it.T > T);
    items.splice(on >= 0 ? on : next < 0 ? items.length : next, 0, { T: on >= 0 ? items[on].T : T, s: on >= 0 ? '\\kT' : `\\kT = ${deg(T, dp(T))}` });
    const chain = items.map((it, i) => (i ? (Math.abs(it.T - items[i - 1].T) < TOL ? ' = ' : ' < ') : '') + it.s).join('');
    F.tex(d.readout, `\\text{at } \\kP = ${hue('pressure', `${fmtP(P).replace(/,/g, '{,}')}\\ \\text{kPa}`)}\\!:\\; ${chain}`);
  }
  register(d.fig, { update: () => {}, draw });
})();
};
