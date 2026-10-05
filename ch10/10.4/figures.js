/* Figures for section 10.4 Phase Diagrams. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['10.4'] = function (root, F) {
const { fmt, C, PAL, alpha, ctl, register, begin, line, dot, text, headline } = F;
const sim = (id, H) => F.sim(root, id, H);

/* =====================================================================
   FIGURE 10.30 + 10.31 + 10.34: the phase diagram of water or carbon
   dioxide on a logarithmic pressure axis, a state point set by T and P,
   the isobar through it with the temperatures where it crosses a curve,
   and a window on the molecules of the sample in that state. Still: the
   figure answers its controls; the molecules move between arrangements
   when the state changes, and a change of substance bends one diagram
   into the other. The three curves and the triple and critical points
   are the section's referents, each in its F.ref; the regions stay ink.
===================================================================== */
(function () {
  const d = sim('sim-phase', 640);
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
      name: 'water', mol: 'H_{2}O', Tt: 0.01, Pt: 0.6117, Tc: 374, Pc: 22089,
      /* steam-table vapor pressures, °C and kPa */
      vap: table([[0.01, 0.6117], [20, 2.339], [40, 7.384], [60, 19.95], [80, 47.41], [100, 101.325], [150, 476.2], [200, 1554.9], [250, 3976], [300, 8588], [350, 16529], [374, 22089]]),
      /* the vapor pressure of ice */
      sub: table([[-60, 0.00108], [-40, 0.01285], [-20, 0.1035], [-10, 0.2601], [0.01, 0.6117]]),
      /* the melting point of ice falls about 1 °C for every 13,000 kPa at first, and 10 °C by 110,000 kPa */
      melt: (P) => 0.01 - 7.6e-5 * P - 1.37e-10 * P * P,
      T: [-50, 600], nT: 13, lP: [-2, 5],
      s: 'ice', l: 'liquid water', g: 'water vapor',
      at: { solid: [-25, 3.2], liquid: [150, 4], gas: [260, 0], scf: [487, 4.68] },
      start: [-10, 50],
    },
    co2: {
      name: 'carbon dioxide', mol: 'CO_{2}', Tt: -56.6, Pt: 518, Tc: 31.1, Pc: 7380,
      vap: cc(-56.6, 518, ln(7380 / 518) / (1 / (K - 56.6) - 1 / (K + 31.1))),
      sub: cc(-56.6, 518, 26100 / 8.314),
      /* rising 83 °C over 10⁶ kPa, as the book's Figure 10.34 draws it */
      melt: (P) => -56.6 + (83 * (P - 518)) / 1e6,
      T: [-100, 100], nT: 8, lP: [1, 6],
      s: 'solid carbon dioxide', l: 'liquid carbon dioxide', g: 'gaseous carbon dioxide',
      at: { solid: [-86, 4], liquid: [-12, 5.2], gas: [45, 2.4], scf: [66, 5] },
      start: [-30, 2000],
    },
  };
  /* the pressures the slider walks, a geometric series with the diagram's named pressures set in */
  const PS = (() => {
    const m = [1, 1.5, 2, 2.5, 3, 4, 5, 6, 7, 8, 9], out = [];
    for (let e = -2; e <= 5; e++) m.forEach((k) => out.push(+(k * 10 ** e).toPrecision(3)));
    out.push(1e6, 0.6117, 101.325, 518, 7380, 22089);
    return [...new Set(out)].sort((a, b) => a - b);
  })();
  const pIdx = (p) => PS.reduce((best, q, i) => (Math.abs(L10(q / p)) < Math.abs(L10(PS[best] / p)) ? i : best), 0);
  /* the slider walks only the pressures of the substance's own axis */
  const pRange = (k, p) => ({ min: pIdx(10 ** S[k].lP[0]), max: pIdx(10 ** S[k].lP[1]), step: 1, value: pIdx(p) });
  const fmtP = (p) => p >= 10000 ? Math.round(p).toLocaleString('en-US') : p >= 100 ? (Number.isInteger(p) ? String(p) : p.toFixed(1)) : String(+p.toPrecision(p >= 1 ? 3 : 2));
  const fmtT = (t, dec = 1) => fmt(t, dec).replace('-', '−');

  const sub = F.choice(d.controls, { label: '\\text{substance}', aria: 'the substance', value: 'water',
    options: [{ value: 'water', label: 'water' }, { value: 'co2', label: 'carbon dioxide' }],
    onInput: (v) => { TS[v].set(S[v].start[0]); TS.water.show(v === 'water'); TS.co2.show(v === 'co2'); Psl.range(pRange(v, S[v].start[1])); TS[v].refresh(); } });
  const cur = () => S[sub.value];
  /* the temperatures where the isobar at P crosses a curve, in order of rising temperature */
  function crossings(s, P) {
    if (P < s.Pt) return [{ T: F.solve((t) => s.sub(t) - P, -150, s.Tt) ?? s.T[0] - 100, kind: 'sub' }];
    const out = [{ T: s.melt(P), kind: 'melt' }];
    if (P < s.Pc) out.push({ T: F.solve((t) => s.vap(t) - P, s.Tt, s.Tc) ?? s.Tc, kind: 'boil' });
    return out;
  }
  let Psl = null;
  /* one temperature slider per substance, each spanning its own diagram's axis */
  const tSlider = (key) => { const s = S[key]; return ctl(d.controls, { label: '\\kT', cls: 'temperature', min: s.T[0], max: s.T[1], step: 0.1, value: s.start[0], unit: '°C', dec: 1, aria: 'temperature in degrees Celsius',
    specials: [{ at: s.Tt, label: 'triple point' }, { at: s.Tc, label: 'critical point' },
      { at: () => (Psl ? crossings(s, PS[Psl.v])[0]?.T ?? null : null) }, { at: () => (Psl ? crossings(s, PS[Psl.v])[1]?.T ?? null : null) }] }); };
  const TS = { water: tSlider('water'), co2: tSlider('co2') };
  TS.co2.show(false, { ms: 0 });
  const Tsl = () => TS[sub.value];
  Psl = ctl(d.controls, { label: '\\kP', cls: 'pressure', min: pRange('water').min, max: pRange('water').max, step: 1, value: pIdx(50), unit: 'kPa', dec: 0, aria: 'pressure in kilopascals',
    specials: [{ at: () => pIdx(cur().Pt), label: 'triple point' }, { at: () => pIdx(101.325), label: '1 atm' }, { at: () => pIdx(cur().Pc), label: 'critical point' }] });
  const pVal = Psl.el.querySelector('.ctl-val'), pInp = Psl.el.querySelector('input');
  const showP = () => { const s = fmtP(PS[Math.round(Psl.v)]) + ' kPa'; if (pVal.textContent !== s) pVal.textContent = s; pInp.setAttribute('aria-valuetext', s); };

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
      if (T < s.Tc) return P > (T < s.Tt ? 0 : s.vap(T)) ? { key: 'liquid', bands: ['liquid'] } : { key: 'gas', bands: ['gas'] };
      return P >= s.Pc ? { key: 'scf', bands: ['scf'] } : { key: 'gas', bands: ['gas'] };
    }
    return T < s.Tt && P > s.sub(T) ? { key: 'solid', bands: ['solid'] } : { key: 'gas', bands: ['gas'] };
  }

  /* ---------- the diagram ---------- */
  const B = { l: 130, r: 890, t: 132, b: 548 };
  const scales = (s) => ({
    X: (t) => B.l + ((t - s.T[0]) / (s.T[1] - s.T[0])) * (B.r - B.l),
    Y: (lp) => B.b - ((lp - s.lP[0]) / (s.lP[1] - s.lP[0])) * (B.b - B.t),
  });
  /* the three curves of a substance as polylines in canvas units, each of 60 points */
  function curvesOf(s) {
    const { X, Y } = scales(s), n = 60, pts = (f, a, b) => Array.from({ length: n + 1 }, (_, i) => f(a + ((b - a) * i) / n));
    return {
      sub: pts((t) => [X(t), Y(L10(s.sub(t)))], s.T[0] - 20, s.Tt),
      vap: pts((t) => [X(t), Y(L10(s.vap(t)))], s.Tt, s.Tc),
      melt: pts((lp) => [X(s.melt(10 ** lp)), Y(lp)], L10(s.Pt), s.lP[1] + 0.2),
      tp: [X(s.Tt), Y(L10(s.Pt))], cp: [X(s.Tc), Y(L10(s.Pc))],
    };
  }
  const CURVES = { water: curvesOf(S.water), co2: curvesOf(S.co2) };
  const stroke = (ctx, pts, color, w, dash) => {
    ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = w; ctx.lineJoin = 'round'; if (dash) ctx.setLineDash(dash);
    ctx.beginPath(); pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.stroke(); ctx.restore();
  };
  const decade = (e) => { const v = 10 ** e; return v >= 1 ? Math.round(v).toLocaleString('en-US') : String(+v.toPrecision(1)); };
  function frame(ctx, v) {
    const s = S[v], { X, Y } = scales(s), step = (s.T[1] - s.T[0]) / s.nT;
    for (let i = 0; i <= s.nT; i++) { const t = s.T[0] + i * step; if (i) line(ctx, X(t), B.t, X(t), B.b, PAL.rule, 1.5); text(ctx, fmtT(t, 0), X(t), B.b + 26, PAL.muted, { size: 17, align: 'center' }); }
    for (let e = s.lP[0]; e <= s.lP[1]; e++) { if (e > s.lP[0]) line(ctx, B.l, Y(e), B.r, Y(e), PAL.rule, 1.5); text(ctx, decade(e), B.l - 14, Y(e), PAL.muted, { size: 17, align: 'right' }); }
  }
  const NAMES = { melt: ['melting', 'freezing'], boil: ['vaporization', 'condensation'], sub: ['sublimation', 'deposition'] };

  /* ---------- the molecule window ---------- */
  const W = { l: 1000, r: 1340, t: 150, b: 490 }, N = 49;
  const rnd = (i, k) => { const x = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453; return x - Math.floor(x); };
  /* the slots one phase fills in a band of the window, bottom row first */
  function slots(phase, y0, y1, seed, f) {
    const out = [], w = W.r - W.l;
    if (phase === 'gas') {
      const n = Math.max(1, Math.round((5 * (y0 - y1)) / (W.b - W.t)));
      for (let i = 0; i < n; i++) out.push([W.l + 26 + rnd(i, seed) * (w - 52), y1 + 24 + rnd(i, seed + 1) * (y0 - y1 - 48), rnd(i, seed + 2) * 6.28]);
      return out;
    }
    const gap = (phase === 'scf' ? 64 : 47) * f, jit = phase === 'solid' ? 0 : phase === 'liquid' ? 11 : 18;
    const cols = Math.floor((w - 20) / gap), rows = Math.max(1, Math.floor((y0 - y1 - 6) / gap)), x0 = W.l + (w - (cols - 1) * gap) / 2;
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      const i = r * cols + c;
      if (phase === 'liquid' && rnd(i, seed + 5) < 0.12) continue;
      out.push([x0 + c * gap + (rnd(i, seed) - 0.5) * 2 * jit, y0 - gap / 2 - 3 - r * gap + (rnd(i, seed + 1) - 0.5) * 2 * jit, phase === 'solid' ? 0.6 : rnd(i, seed + 2) * 6.28]);
    }
    return out;
  }
  /* the arrangement of a state: its bands stacked from the bottom of the window, and the heights of the surfaces between them */
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
  const ro = F.readout(d);

  function draw() {
    const { ctx } = begin(d.c);
    showP();
    const v = sub.value, s = S[v], T = Tsl().v, P = PS[Math.round(Psl.v)];
    const { X, Y } = scales(s), k = sub.k;

    /* the frame: the ticks of the old substance fade as the new ones arrive */
    ['water', 'co2'].forEach((key) => sub.only(ctx, key, () => frame(ctx, key), [0, 0]));
    line(ctx, B.l, B.t, B.l, B.b, PAL.muted, 2); line(ctx, B.l, B.b, B.r, B.b, PAL.muted, 2);
    text(ctx, 'Temperature (°C)', B.r, B.b + 60, C('temperature'), { align: 'right', weight: 600, size: 20 });
    text(ctx, 'Pressure (kPa)', B.l, B.t - 26, C('pressure'), { align: 'left', weight: 600, size: 20 });

    /* the curves, one substance's bending into the other's */
    const a = CURVES[sub.from ?? v], b = CURVES[v], mixP = (p, q) => [p[0] + (q[0] - p[0]) * F.ease.smooth(k), p[1] + (q[1] - p[1]) * F.ease.smooth(k)];
    const cv = k >= 1 ? b : { sub: F.lerpPts(a.sub, b.sub, F.ease.smooth(k)), vap: F.lerpPts(a.vap, b.vap, F.ease.smooth(k)), melt: F.lerpPts(a.melt, b.melt, F.ease.smooth(k)), tp: mixP(a.tp, b.tp), cp: mixP(a.cp, b.cp) };
    ctx.save(); ctx.beginPath(); ctx.rect(B.l, B.t, B.r - B.l, B.b - B.t); ctx.clip();
    stroke(ctx, [cv.cp, [cv.cp[0], B.t]], alpha(PAL.ink, 0.4), 2.5, [10, 10]);
    stroke(ctx, [cv.cp, [B.r, cv.cp[1]]], alpha(PAL.ink, 0.4), 2.5, [10, 10]);
    stroke(ctx, cv.sub, F.ref('sub-curve'), 4); stroke(ctx, cv.vap, F.ref('vap-curve'), 4); stroke(ctx, cv.melt, F.ref('melt-curve'), 4);
    ctx.restore();
    dot(ctx, cv.tp[0], cv.tp[1], F.ref('triple-point'), true, 8); dot(ctx, cv.cp[0], cv.cp[1], F.ref('critical-point'), true, 8);

    /* the region names and the two points, for the substance shown */
    ['water', 'co2'].forEach((key) => sub.only(ctx, key, () => {
      const q = S[key], sc = scales(q), c = CURVES[key];
      text(ctx, 'solid', sc.X(q.at.solid[0]), sc.Y(q.at.solid[1]), PAL.ink, { size: 22, align: 'center' });
      text(ctx, 'liquid', sc.X(q.at.liquid[0]), sc.Y(q.at.liquid[1]), PAL.ink, { size: 22, align: 'center' });
      text(ctx, 'gas', sc.X(q.at.gas[0]), sc.Y(q.at.gas[1]), PAL.ink, { size: 22, align: 'center' });
      text(ctx, 'supercritical fluid', (c.cp[0] + B.r) / 2, (c.cp[1] + B.t) / 2, PAL.ink, { size: 17, align: 'center' });
      const tpUp = key === v && Math.abs(Y(L10(P)) - c.tp[1]) < 40;
      text(ctx, 'triple point', c.tp[0] + 14, c.tp[1] + (tpUp ? -22 : 24), F.ref('triple-point'), { size: 17, align: 'left', bg: PAL.panel });
      text(ctx, 'critical point', c.cp[0] + 12, c.cp[1] + 22, F.ref('critical-point'), { size: 17, align: 'left', bg: PAL.panel });
    }, [0, 0]));

    /* the isobar through the state point, the temperatures where it crosses a curve, and the point itself */
    const st = stateOf(s, T, P), cr = crossings(s, P).filter((c) => c.T >= s.T[0] && c.T <= s.T[1]);
    ctx.save(); ctx.globalAlpha *= F.ease.smooth(k);
    const yP = Y(L10(P)), inY = yP >= B.t && yP <= B.b;
    const nearTp = Math.abs(yP - Y(L10(s.Pt))) < 40;
    if (inY) {
      line(ctx, B.l, yP, B.r, yP, alpha(C('pressure'), 0.7), 2.5, [10, 10]);
      const close = cr.length === 2 && X(cr[1].T) - X(cr[0].T) < 170;
      cr.forEach((c, i) => {
        const x = X(c.T);
        dot(ctx, x, yP, C('temperature'), false, 8);
        if (nearTp && Math.abs(c.T - s.Tt) < 3) return;
        let up = nearTp || close ? 1 : i % 2 === 0 ? -1 : 1;
        if (yP + up * 26 < B.t + 10) up = 1; else if (yP + up * 26 > B.b - 10) up = -1;
        const name = NAMES[c.kind][0] + ' ' + fmtT(c.T, 0) + ' °C';
        let align = close ? (i ? 'left' : 'right') : x < B.l + 90 ? 'left' : x > B.r - 90 ? 'right' : 'center';
        let tx = close ? x + (i ? 10 : -10) : Math.min(B.r - 8, Math.max(B.l + 8, x));
        /* a name that would run into the pressure ticks goes right of its point, on the other side of the isobar */
        if (align === 'right' && tx - F.measure(ctx, name, { size: 17, weight: 600 }) < B.l + 8) { align = 'left'; tx = x + 10; up = -up; if (yP + up * 26 < B.t + 10 || yP + up * 26 > B.b - 10) up = -up; }
        text(ctx, name, tx, yP + up * 26, C('temperature'), { size: 17, weight: 600, align, bg: PAL.panel });
      });
    }
    const pt = F.pinned(ctx, B, X, (lp) => Y(lp), T, L10(P), PAL.ink);
    if (!pt.out) {
      line(ctx, pt.x, pt.y + 10, pt.x, B.b, alpha(PAL.ink, 0.35), 2, [4, 8]);
      line(ctx, B.l, pt.y, pt.x - 10, pt.y, alpha(PAL.ink, 0.35), 2, [4, 8]);
    }
    ctx.restore();

    /* the window on the sample: the molecules move to the new arrangement when the state changes */
    const key = v + ':' + st.key;
    if (key !== shown) { from = lay ? current() : null; lay = layout(st, v); shown = key; if (from) { tw.set(0); tw.to(1, 900); } }
    function current() { const e = F.ease.smooth(tw.v); return lay.mols.map((m, i) => (from ? m.map((x, j) => from[i][j] + (x - from[i][j]) * e) : m)); }
    const mols = current();
    ctx.save(); ctx.fillStyle = PAL.panel; ctx.fillRect(W.l, W.t, W.r - W.l, W.b - W.t); ctx.restore();
    ctx.save(); ctx.beginPath(); ctx.rect(W.l, W.t, W.r - W.l, W.b - W.t); ctx.clip();
    lay.seams.forEach((sm) => { if (sm.upper === 'gas' || sm.lower === 'solid') line(ctx, W.l, sm.y, W.r, sm.y, alpha(PAL.ink, sm.upper === 'gas' ? 0.6 : 0.3), 2, sm.upper === 'gas' ? undefined : [4, 8]); });
    mols.forEach(([x, y, ang, on]) => { if (on < 0.02) return; ctx.save(); ctx.globalAlpha *= on; molecule(ctx, v, x, y, ang); ctx.restore(); });
    ctx.restore();
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2; ctx.strokeRect(W.l, W.t, W.r - W.l, W.b - W.t); ctx.restore();
    text(ctx, s.mol + ' molecules in the sample', (W.l + W.r) / 2, W.t - 22, PAL.muted, { size: 17, align: 'center' });
    const WORD = { solid: 'solid', liquid: 'liquid', gas: 'gas', scf: 'supercritical fluid' };
    const bandName = st.key === 'critical' ? 'at the critical point' : st.bands.map((ph) => WORD[ph]).reverse().join(' over ');
    text(ctx, bandName, (W.l + W.r) / 2, W.b + 28, PAL.ink, { size: 20, align: 'center' });

    /* the sentence at the top and the readout */
    const Tw = fmtT(T) + ' °C', Pw = fmtP(P) + ' kPa', cap = (w) => w[0].toUpperCase() + w.slice(1);
    const where = `At ${Tw} and ${Pw}`;
    const H = {
      solid: `${where}, ${s.name} is a solid${v === 'water' ? ' (ice)' : ''}.`,
      liquid: `${where}, ${s.name} is a liquid.`,
      gas: `${where}, ${s.name} is a gas.`,
      scf: `${where}, above its critical point, ${s.name} is a supercritical fluid.`,
      melt: `${where}, ${s.s} and ${s.l} are in equilibrium, so ${s.name} melts or freezes here.`,
      boil: `${where}, ${s.l} and ${s.g} are in equilibrium, so ${s.name} boils or condenses here.`,
      sub: `${where}, ${s.s} and ${s.g} are in equilibrium, so ${s.name} sublimes or is deposited here.`,
      triple: `At the triple point, ${fmtT(s.Tt, 2)} °C and ${fmtP(s.Pt)} kPa, ${s.s}, ${s.l}, and ${s.g} are all in equilibrium.`,
      critical: `At the critical point, ${fmtT(s.Tc)} °C and ${fmtP(s.Pc)} kPa, the boundary between ${s.l} and ${s.g} disappears.`,
    };
    headline(ctx, H[st.key]);
    const PH = { solid: '\\text{solid}', liquid: '\\text{liquid}', gas: '\\text{gas}', scf: '\\text{supercritical fluid}', melt: '\\text{solid} \\rightleftharpoons \\text{liquid}', boil: '\\text{liquid} \\rightleftharpoons \\text{gas}', sub: '\\text{solid} \\rightleftharpoons \\text{gas}', triple: '\\text{solid},\\ \\text{liquid},\\ \\text{gas}', critical: '\\text{critical point}' };
    const all = crossings(s, P), heat = P < s.Pt
      ? `Heated at ${Pw}, below the triple-point pressure, ${s.s} sublimes at ${fmtT(all[0].T, 0)} °C, and ${s.name} never forms a liquid.`
      : P < s.Pc
        ? `Heated at ${Pw}, ${s.s} melts at ${fmtT(all[0].T, 0)} °C and the liquid boils at ${fmtT(all[1].T, 0)} °C.`
        : `Heated at ${Pw}, above the critical pressure, ${s.s} melts at ${fmtT(all[0].T, 0)} °C, and above ${fmtT(s.Tc)} °C the liquid becomes a supercritical fluid without boiling.`;
    ro.set(`\\kT = ${fmt(T, 1)}\\ ^\\circ\\text{C},\\quad \\kP = ${fmtP(P).replace(/,/g, '{,}')}\\ \\text{kPa}\\quad \\Longrightarrow \\quad ${PH[st.key]}`, cap(heat));
  }
  register(d.fig, { update: () => {}, draw });
})();
};
