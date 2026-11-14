/* Figures for section 10.3 Phase Transitions. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['10.3'] = function (root, F) {
const { fmt, tex, C, PAL, alpha, ctl, cycle, register, begin, line, dot, text, topline, axes, label, legend, plot } = F;
const sim = (id, H) => F.sim(root, id, H);
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;
const R = 8.3145;
const TAU2 = 2 * Math.PI;
const clamp = (x, a, b) => Math.min(Math.max(x, a), b);
const frac = (x) => x - Math.floor(x);
/* three significant figures, the way the book rounds its steps */
const sig3 = (x) => { if (x === 0) return 0; const e = Math.floor(Math.log10(Math.abs(x))) - 2; return Math.round(x / 10 ** e) * 10 ** e; };
const show3 = (x) => { if (x === 0) return '0'; const e = Math.floor(Math.log10(Math.abs(x))); return x.toFixed(Math.max(0, 2 - e)); };
const minus = (s) => s.replace(/^-/, '−');
const cap = (s) => s[0].toUpperCase() + s.slice(1);

/* The four liquids of Example 10.5. For Figure 10.24: the normal boiling point in °C and the
   enthalpy of vaporization in kJ/mol that its Clausius-Clapeyron curve uses (water's 40.67 and
   ethanol's 41.4 are the book's, ether's 26.5 and ethylene glycol's 53.2 handbook values at the
   boiling point). For Figure 10.22: the measured vapor pressure at 20 °C in kPa (ethanol's 5.95
   is the book's table; water's 2.34 is the book's 17.5 torr; the others handbook values). */
const LIQ = {
  ether: { name: 'diethyl ether', ref: 'diethyl-ether', bp: 34.6, dH: 26.5, p20: 58.7 },
  ethanol: { name: 'ethanol', ref: 'ethanol', bp: 78.4, dH: 41.4, p20: 5.95 },
  water: { name: 'water', ref: 'water', bp: 100.0, dH: 40.67, p20: 2.34 },
  glycol: { name: 'ethylene glycol', ref: 'ethylene-glycol', bp: 197.3, dH: 53.2, p20: 0.007 },
};
const KEYS = Object.keys(LIQ);
const pOf = (k, tc) => { const q = LIQ[k]; return 101.3 * Math.exp((-q.dH * 1000 / R) * (1 / (tc + 273.15) - 1 / (q.bp + 273.15))); };
const bpAt = (k, p) => { const q = LIQ[k]; return 1 / (1 / (q.bp + 273.15) - (R * Math.log(p / 101.3)) / (q.dH * 1000)) - 273.15; };

/* =====================================================================
   FIGURE 10.22: a liquid in a round flask that was evacuated and sealed,
   its side arm running to a closed-end mercury manometer, as the book
   draws it. From the moment the flask is closed, molecules leave the
   surface at a steady rate; each flies in a straight line, turns at the
   glass, and returns to the liquid at the first strike on the surface
   after a least time aloft drawn from an exponential spread. Births are
   evenly spaced at the rate that keeps P_vap / PER molecules aloft on
   average, so the count climbs and levels off where as many return each
   second as leave; the graph, the manometer and the readout are the
   expected count and rate from the same flights. The paths are worked out once per
   liquid (fixed sequences, no randomness), so the clock scrubs exactly.
   One molecule drawn stands for 2 kPa. Flat: every molecule must be seen.
   Canvas units: flask centre (FX, FY), radius FR; liquid surface at SY.
===================================================================== */
(function () {
  const d = sim('sim-vapor', 540);
  const L = F.choice(d.controls, { label: '\\text{liquid}', options: KEYS.map((k) => ({ value: k, label: LIQ[k].name })), value: 'ether', aria: 'the liquid in the flask', onInput: () => { paths = run(L.value); cy.reset(); } });
  const PER = 2, TT = 9, DT = 1 / 240, SAMPLE = 4;
  const FX = 215, FY = 295, FR = 172, RI = FR - 6, SY = FY + 62;
  const TW = 10, AY = 225, MXL = 490, MXR = 580, MXC = (MXL + MXR) / 2, BOT = 455, CAPY = 105, Y0 = 315;
  const MMHG = 0.4;                                       /* canvas units per mmHg of mercury */
  /* each molecule's atoms [element, dx, dy] in canvas units, every hydrogen drawn; mr its reach from the centre */
  const MOL = {
    ether: { f: 'C₄H₁₀O', mr: 24, atoms: [['C', -17, 3.5], ['C', -8.5, -3.5], ['O', 0, 3.5], ['C', 8.5, -3.5], ['C', 17, 3.5],
      ['H', -24, 3], ['H', -20, 10], ['H', -13.5, 10], ['H', -12, -10], ['H', -5, -10], ['H', 5, -10], ['H', 12, -10], ['H', 24, 3], ['H', 20, 10], ['H', 13.5, 10]] },
    ethanol: { f: 'C₂H₅OH', mr: 17, atoms: [['C', -9, 2], ['C', -1, -3], ['O', 7, 2], ['H', 13.5, -1.5], ['H', -16, 1.5], ['H', -12, 8.5], ['H', -6, 8.5], ['H', -4.5, -9.5], ['H', 2.5, -9.5]] },
    water: { f: 'H₂O', mr: 10, atoms: [['O', 0, 0], ['H', -6, 4.5], ['H', 6, 4.5]] },
    glycol: { f: 'C₂H₄(OH)₂', mr: 21, atoms: [['O', -12, 2], ['C', -4, -3], ['C', 4, 3], ['O', 12, -2], ['H', -18.5, -1.5], ['H', 18.5, 1.5], ['H', -7.5, -9.5], ['H', -0.5, -9.5], ['H', 0.5, 9.5], ['H', 7.5, 9.5]] },
  };
  const cy = cycle(() => TT, 2.5);
  const peq = () => LIQ[L.value].p20;
  /* the pressure is the molecules expected aloft times PER */
  const pAt = (t) => (paths.re ? tab(paths.n, t) * PER : peq());
  /* one molecule's flight from the liquid, its i-th: a straight path from a point under the surface, turned at the glass,
     back into the liquid at the first strike on the surface after its least time aloft; positions every SAMPLE steps */
  function flight(key, i) {
    const mr = MOL[key].mr, half = Math.sqrt((RI - mr) ** 2 - (SY - FY) ** 2) * 0.8;
    const least = Math.max(0.1, -0.6 * Math.log(1 - frac(0.5 + i * 0.6180339887)));
    let x = FX + (frac(0.27 + i * 0.41421356) - 0.5) * 2 * half, y = SY + 14;
    const a = -Math.PI / 2 + (frac(0.11 + i * 0.7548777) - 0.5) * 2.2, sp = 230 + 170 * frac(0.37 + i * 0.5698403);
    let vx = sp * Math.cos(a), vy = sp * Math.sin(a), t = 0, risen = false, life = Infinity, k = 0;
    const pts = [];
    while (t < Math.min(life + 0.3, 14)) {
      if (k % SAMPLE === 0) pts.push(x, y);
      x += vx * DT; y += vy * DT; t += DT; k++;
      if (life !== Infinity) continue;
      if (!risen && y < SY - 6) risen = true;
      const dx = x - FX, dy = y - FY, r = Math.hypot(dx, dy);
      if (r > RI - mr) { const nx = dx / r, ny = dy / r, dd = vx * nx + vy * ny; if (dd > 0) { vx -= 2 * dd * nx; vy -= 2 * dd * ny; } x = FX + nx * (RI - mr); y = FY + ny * (RI - mr); }
      if (risen && vy > 0 && y > SY - 6) { if (t >= least) life = t; else { vy = -vy; y = SY - 6; } }
    }
    return { life: Math.min(life, 14), pts, a0: frac(i * 0.31) * TAU2, w: (frac(i * 0.77) - 0.5) * 5 };
  }
  /* the flights of one liquid, born evenly at the rate that keeps P_vap / PER molecules aloft on average; the count
     expected at t, the rate of return and the pressure follow from the same flights, tabulated every 0.02 s */
  function run(key) {
    const neq = LIQ[key].p20 / PER, S = { list: [], re: 0, n: [], fr: [], neq };
    if (neq < 0.5) return S;
    const lives = Array.from({ length: 64 }, (_, i) => flight(key, i));
    const ta = lives.reduce((a, q) => a + q.life, 0) / lives.length, re = neq / ta;
    S.re = re;
    for (let i = 0; (i + 0.5) / re <= TT; i++) S.list.push({ b: (i + 0.5) / re, ...(i < 64 ? lives[i] : flight(key, i)) });
    /* the share of flights back by u, the step at each life smoothed over 0.5 s; the count aloft is the rate of
       leaving times the time still to come back, scaled so that it settles on P_vap / PER exactly */
    const back = (u) => lives.reduce((a, q) => a + clamp((u - q.life) / 0.5 + 0.5, 0, 1), 0) / lives.length;
    let n = 0;
    for (let j = 0; j <= 15 / 0.02; j++) { const f = back(j * 0.02); S.fr.push(f); S.n.push(n); n += re * (1 - f) * 0.02; }
    S.n = S.n.map((x) => (x * neq) / n);
    return S;
  }
  const tab = (arr, t) => { const j = clamp(t / 0.02, 0, arr.length - 1.001), i = Math.floor(j); return arr[i] + (arr[i + 1] - arr[i]) * (j - i); };
  const RMAX = run('ether').re * 1.3;                     /* the rate axis, fixed by diethyl ether's so the liquids compare */
  let paths = run(L.value), hits = [];
  F.hover(d.stage, () => hits);
  function molecule(ctx, key, x, y, a) {
    const c = Math.cos(a), s = Math.sin(a);
    MOL[key].atoms.slice().sort((p, q) => (p[0] === 'H') - (q[0] === 'H')).reverse().forEach(([e, dx, dy]) => {
      ctx.save(); ctx.fillStyle = F.el(e); ctx.strokeStyle = alpha(PAL.ink, 0.5); ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(x + dx * c - dy * s, y + dx * s + dy * c, e === 'H' ? 3.6 : 5.6, 0, TAU2); ctx.fill(); ctx.stroke(); ctx.restore();
    });
  }
  function draw() {
    const { ctx } = begin(d.c);
    const t = cy.now(), key = L.value, q = LIQ[key], pe = peq(), p = pAt(t), cp = C('pressure'), ctm = C('time');
    const cf = F.ref('flask'), cm = F.ref('manometer'), glass = 4;
    /* the liquid, then the molecules, clipped to the inside of the flask */
    ctx.save(); ctx.beginPath(); ctx.arc(FX, FY, RI, 0, TAU2); ctx.clip();
    ctx.fillStyle = alpha(PAL.ink, 0.13); ctx.fillRect(FX - FR, SY, 2 * FR, FR);
    line(ctx, FX - FR, SY, FX + FR, SY, alpha(PAL.ink, 0.45), 2);
    hits = [];
    const nm = 'a molecule of ' + q.name + ', ' + MOL[key].f;
    paths.list.forEach((m) => {
      if (t < m.b) return;
      const j = (t - m.b) / (DT * SAMPLE), i0 = Math.floor(j), n = m.pts.length / 2;
      if (i0 >= n - 1) return;
      if (t > m.b + m.life + 0.3) return;
      const f = j - i0, x = m.pts[2 * i0] + (m.pts[2 * i0 + 2] - m.pts[2 * i0]) * f, y = m.pts[2 * i0 + 1] + (m.pts[2 * i0 + 3] - m.pts[2 * i0 + 1]) * f;
      const under = y - SY, k = under > 0 ? clamp(1 - under / 16, 0, 1) : 1;
      if (k <= 0) return;
      ctx.save(); ctx.globalAlpha *= k; molecule(ctx, key, x, y, m.a0 + m.w * (t - m.b)); ctx.restore();
      if (under < 0) hits.push({ x, y, r: 16, name: nm });
    });
    ctx.restore();
    /* the flask: a sphere of glass cut where the side arm leaves it */
    const aTop = Math.atan2(AY - TW - FY, Math.sqrt(FR ** 2 - (AY - TW - FY) ** 2)), aBot = Math.atan2(AY + TW - FY, Math.sqrt(FR ** 2 - (AY + TW - FY) ** 2));
    ctx.save(); ctx.strokeStyle = cf; ctx.lineWidth = glass; ctx.beginPath(); ctx.arc(FX, FY, FR, aBot, aTop + TAU2, false); ctx.stroke(); ctx.restore();
    /* the side arm and the U of the closed-end manometer */
    const xTop = FX + Math.sqrt(FR ** 2 - (AY - TW - FY) ** 2), xBot = FX + Math.sqrt(FR ** 2 - (AY + TW - FY) ** 2);
    const hpx = pe >= 0 ? p * 7.5006 * MMHG : 0, yl = Y0 + hpx / 2, yr = Y0 - hpx / 2;
    ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.38);
    ctx.fillRect(MXL - TW, yl, 2 * TW, BOT - yl); ctx.fillRect(MXR - TW, yr, 2 * TW, BOT - yr);
    ctx.beginPath(); ctx.arc(MXC, BOT, MXC - MXL + TW, 0, Math.PI, false); ctx.arc(MXC, BOT, MXC - MXL - TW, Math.PI, 0, true); ctx.closePath(); ctx.fill(); ctx.restore();
    ctx.save(); ctx.strokeStyle = cm; ctx.lineWidth = 3; ctx.lineJoin = 'round'; ctx.beginPath();
    ctx.moveTo(xTop, AY - TW); ctx.lineTo(MXL + TW, AY - TW); ctx.lineTo(MXL + TW, BOT); ctx.arc(MXC, BOT, MXC - MXL - TW, Math.PI, 0, true); ctx.lineTo(MXR - TW, CAPY);
    ctx.arc(MXR, CAPY, TW, Math.PI, 0, false); ctx.lineTo(MXR + TW, BOT); ctx.arc(MXC, BOT, MXR + TW - MXC, 0, Math.PI, false); ctx.lineTo(MXL - TW, AY + TW); ctx.lineTo(xBot, AY + TW);
    ctx.stroke(); ctx.restore();
    /* the reading: the difference in mercury levels is the pressure of the vapor */
    if (hpx > 1) { line(ctx, MXL + TW + 4, yl, MXR + TW + 30, yl, alpha(cp, 0.6), 2, [4, 6]); }
    const pv = (x) => (x < 0.1 ? x.toFixed(3) : x < 10 ? x.toFixed(2) : fmt(x, 1));
    F.vbracket(ctx, MXR + TW + 30, yr, Math.max(yl, yr + 0.01), cp, 'P = ' + pv(p >= 0.995 * pe ? pe : p) + ' kPa', 1, { size: 20 });
    label(ctx, 'liquid', FX, SY + 70, { side: 'below', size: 18, gap: 0, weight: 400 });
    label(ctx, 'vacuum', MXR, CAPY + 24, { side: 'right', size: 17, gap: 26, weight: 400, color: PAL.muted });
    label(ctx, 'mercury', MXC, BOT + 52, { side: 'below', size: 17, gap: 0, weight: 400, color: PAL.muted });

    /* the two rates against time, 0 to TT s; the rate axis fixed by diethyl ether's, so the liquids compare */
    const box = { l: 850, r: 1320, t: 130, b: 440 }, re = paths.re;
    const ax = axes(ctx, box, [0, TT], [0, RMAX], { nx: 3, ny: 0, xl: 't (s)', xc: ctm, yl: 'molecules per second' });
    const cv = F.cat(0), cc = F.cat(3);
    const rc = (u) => (re ? re * tab(paths.fr, u) : 0);
    plot(ctx, ax, () => re, alpha(cv, 0.3), { w: 4, x: [0, TT] }); plot(ctx, ax, rc, alpha(cc, 0.3), { w: 4, x: [0, TT] });
    if (t > 0.01) { plot(ctx, ax, () => re, cv, { w: 5, x: [0, t] }); plot(ctx, ax, rc, cc, { w: 5, x: [0, t] }); }
    dot(ctx, ax.X(t), ax.Y(rc(t)), cc, true, 8); dot(ctx, ax.X(t), ax.Y(re), cv, true, 8);
    legend(ctx, ax, [{ s: 'vaporization', color: cv, w: 5 }, { s: 'condensation', color: cc, w: 5 }], { corner: 'br' });

    const eq = !re || p >= 0.995 * pe, name = cap(q.name);
    topline(ctx, !re
      ? `${name} at 20 °C has a vapor pressure of only ${pv(pe)} kPa, too little for one molecule of the drawing.`
      : eq ? `${name}: molecules leave and return at equal rates, and the vapor pressure holds at ${pv(pe)} kPa.`
        : `${name}: more molecules leave the liquid than return, and the pressure is still rising.`);
    const pk = hue('pressure', pv(eq ? pe : p) + '\\ \\text{kPa}');
    tex(d.readout, `\\text{rate of vaporization} ${eq ? '=' : '>'} \\text{rate of condensation} \\\\ \\kP = ${pk}`, false, { values: false });
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();

/* =====================================================================
   FIGURE 10.23: the distribution of kinetic energies at two temperatures,
   with the tails beyond the minimum needed to escape filled. Still: the
   curve answers the temperature. The distribution is f(E) = 2/√π ·
   √E /(RT)^{3/2} · e^{−E/RT}, the one the book draws in Chapter 9, and the
   filled fraction its exact tail. Axes 0 to 15 kJ/mol, so the peak sits a
   tenth of the way along, as the book draws it; heights fixed by the
   tallest curve, 250 K.
===================================================================== */
(function () {
  const d = sim('sim-ke', 500);
  const T = ctl(d.controls, { label: '\\kT', cls: 'temperature', min: 250, max: 500, step: 1, value: 400, unit: 'K', dec: 0, aria: 'temperature in kelvin', specials: [{ at: 300, label: '300 K' }] });
  const E = ctl(d.controls, { label: 'KE_{\\min}', cls: 'energy', min: 3, max: 12, step: 0.5, value: 7.5, unit: 'kJ/mol', dec: 1, aria: 'minimum kinetic energy needed to escape, in kilojoules per mole' });
  const T0 = 300, EMAX = 15;
  const f = (tk) => (e) => { const rt = R * tk / 1000; return (2 / Math.sqrt(Math.PI)) * Math.sqrt(Math.max(e, 0)) / rt ** 1.5 * Math.exp(-e / rt); };
  /* erfc by Abramowitz and Stegun 7.1.26 */
  const erfc = (x) => { const t = 1 / (1 + 0.3275911 * x); return t * (0.254829592 + t * (-0.284496736 + t * (1.421413741 + t * (-1.453152027 + t * 1.061405429)))) * Math.exp(-x * x); };
  const tail = (tk, e) => { const x = e / (R * tk / 1000); return erfc(Math.sqrt(x)) + 2 * Math.sqrt(x / Math.PI) * Math.exp(-x); };
  const pct = (x) => (x < 0.1 ? fmt(100 * x, 1) : fmt(100 * x, 0)) + '%';
  function region(ctx, fn, e0, X, Y) {
    ctx.beginPath(); ctx.moveTo(X(e0), Y(0));
    for (let i = 0; i <= 60; i++) { const e = e0 + ((EMAX - e0) * i) / 60; ctx.lineTo(X(e), Y(fn(e))); }
    ctx.lineTo(X(EMAX), Y(0)); ctx.closePath();
  }
  function draw() {
    const { ctx, H } = begin(d.c);
    const tk = T.v, em = E.v, ct = C('temperature'), ce = C('energy');
    const box = { l: 150, r: 1300, t: 110, b: 420 };
    const ax = axes(ctx, box, [0, EMAX], [0, 0.25], { nx: 3, ny: 0, xl: 'kinetic energy (kJ/mol)', xc: ce, yl: 'number of molecules' });
    const { X, Y } = ax, lo = f(T0), hi = f(tk);
    ctx.save(); ctx.fillStyle = alpha(ct, 0.28); region(ctx, hi, em, X, Y); ctx.fill(); ctx.restore();
    /* the 300 K tail hatched, so it shows through the shaded tail of the live curve */
    ctx.save(); region(ctx, lo, em, X, Y); ctx.clip(); ctx.strokeStyle = alpha(ct, 0.75); ctx.lineWidth = 2; ctx.beginPath();
    for (let x = X(em) - 400; x < X(EMAX); x += 14) { ctx.moveTo(x, Y(0)); ctx.lineTo(x + 400, Y(0) - 400); }
    ctx.stroke(); ctx.restore();
    plot(ctx, ax, lo, alpha(ct, 0.85), { w: 3, dash: [10, 10] });
    plot(ctx, ax, hi, ct, { w: 5 });
    line(ctx, X(em), box.t + 20, X(em), box.b, PAL.ink, 3, [10, 10]);
    const fl = tail(T0, em), fh = tail(tk, em), r = fh / fl;
    const lines = topline(ctx, tk === T0 ? `At 300 K, ${pct(fl)} of the molecules have at least ${fmt(em, 1)} kJ/mol of kinetic energy.`
      : `At ${tk} K, ${pct(fh)} of the molecules have at least ${fmt(em, 1)} kJ/mol, ${fmt(r, r < 10 ? 2 : 1)} times the fraction at 300 K.`);
    const lab = F.labeller(ctx, H, { headline: lines });
    lab.place(label(ctx, 'minimum KE needed to escape', X(em), box.t + 20, { side: em > 9 ? 'left' : 'right', size: 18, gap: 14 }));
    lab.block(X(em) - 6, box.t + 20, X(em) + 6, box.b);
    const name = (k) => (k === T0 ? '300 K' : k + ' K');
    const [cold, warm] = tk < T0 ? [tk, T0] : [T0, tk], peak = (R * cold) / 2000;
    lab.add(name(cold), X(peak), Y(f(cold)(peak)), 0.45, -0.89, ct, 18, 16);
    if (warm !== cold) {
      const ec = (1.5 * Math.log(warm / cold)) / (1000 / (R * cold) - 1000 / (R * warm));
      const e = [ec + 1.2, ec + 3, ec + 5].find((x) => Math.abs(X(x) - X(em)) > 150) ?? ec + 1.2;
      lab.add(name(warm), X(e), Y(f(warm)(e)), 0.5, -0.87, ct, 18, 18);
    }
    lab.flush();
    const ek = hue('energy', fmt(em, 1) + '\\ \\text{kJ/mol}');
    const row = (tt, x) => `\\text{fraction with } KE \\ge ${ek} \\text{ at } ${hue('temperature', tt + '\\ \\text{K}')} = ${pct(x).replace('%', '\\%')}`;
    tex(d.readout, tk === T0 ? row(T0, fl) : `${row(tk, fh)} \\\\ ${row(T0, fl)}`);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 10.24: the vapor pressures of four liquids against temperature,
   and the boiling point of each where its curve meets the pressure of the
   surroundings. Still: the curves answer the pressure. Axes 0 to 140 °C
   and 0 to 140 kPa, fixed, the book's frame; ethylene glycol's crossing
   above 15 kPa falls to the right and is pinned at the edge. Each
   liquid's curve is its referent's F.ref.
===================================================================== */
(function () {
  const d = sim('sim-bp', 560);
  const P = ctl(d.controls, { label: '\\kP', cls: 'pressure', min: 20, max: 140, step: 0.1, value: 101.3, unit: 'kPa', dec: 1, aria: 'pressure of the surroundings in kilopascals',
    detents: [40, 68], specials: [{ at: 101.3, label: '1 atm' }] });
  const Lq = F.select(d.controls, { label: '\\text{liquid}', options: KEYS.map((k) => ({ value: k, label: LIQ[k].name })), value: 'water', aria: 'the liquid whose boiling point is worked out' });
  function draw() {
    const { ctx } = begin(d.c);
    const p = P.v, sel = Lq.value, cp = C('pressure'), ct = C('temperature');
    const box = { l: 150, r: 1290, t: 110, b: 470 };
    const ax = axes(ctx, box, [0, 140], [0, 140], { nx: 7, ny: 7, xl: 'T (°C)', xc: ct, yl: 'P (kPa)', yc: cp });
    const { X, Y } = ax;
    line(ctx, box.l, Y(p), box.r, Y(p), cp, 3, [10, 10]);
    text(ctx, fmt(p, 1) + ' kPa', box.l + 12, Y(p) + 20, cp, { size: 18, weight: 600, bg: PAL.panel });
    KEYS.forEach((k) => {
      const on = k === sel, col = F.ref(LIQ[k].ref);
      plot(ctx, ax, (tc) => pOf(k, tc), on ? col : alpha(col, 0.75), { w: on ? 5 : 3 });
      const tb = bpAt(k, p);
      if (tb >= 0 && tb <= 140) { line(ctx, X(tb), Y(p), X(tb), box.b, alpha(col, 0.8), 2, [4, 8]); dot(ctx, X(tb), Y(p), col, true, on ? 10 : 8); }
      else F.pinned(ctx, box, X, Y, tb, p, col, fmt(tb, 0) + ' °C');
      /* each curve named where it leaves the top of the box, or at its right end */
      const tTop = bpAt(k, 140), top = tTop <= 140, lx = top ? X(tTop) : box.r, ly = top ? box.t : Y(pOf(k, 140));
      label(ctx, LIQ[k].name, lx, ly, { side: top ? 'above' : 'left', size: 18, color: col, gap: top ? 14 : 24, weight: on ? 600 : 400 });
    });
    const tb = bpAt(sel, p), q = LIQ[sel];
    if (tb >= 0 && tb <= 140) text(ctx, fmt(tb, 1) + ' °C', X(tb), box.b + 50, ct, { size: 18, weight: 600, align: 'center', bg: PAL.panel });
    topline(ctx, `At ${fmt(p, 1)} kPa, ${q.name} boils at ${fmt(tb, 1)} °C${tb > 140 ? ', off the right of the graph' : tb < 0 ? ', off the left of the graph' : ''}.`);
    const tk = tb + 273.15, t1 = q.bp + 273.15;
    tex(d.readout, `\\kTtwo={\\left(\\frac{1}{\\kTone}-\\frac{R\\ln(\\kPtwo/\\kPone)}{\\kdHvap}\\right)}^{-1}={\\left(\\frac{1}{${hue('temperature', fmt(t1, 1) + '\\ \\text{K}')}}-\\frac{(8.3145\\ \\text{J/mol·K})\\ln(${hue('pressure', fmt(p, 1) + '\\ \\text{kPa}')}/${hue('pressure', '101.3\\ \\text{kPa}')})}{${hue('energy', fmt(q.dH * 1000, 0) + '\\ \\text{J/mol}')}}\\right)}^{-1}=${hue('temperature', fmt(tk, 1) + '\\ \\text{K}')}=${hue('temperature', fmt(tb, 1) + '\\ ^{\\circ}\\text{C}')}`);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 10.29: the heating curve of water, with the book's specific heats
   and enthalpies of Example 10.10. Heat is added at a steady rate and the
   marker runs along the curve, holding on each plateau. Moving: a steady
   burner is a clock. A final temperature below the starting one draws the
   cooling curve, heat removed on the same axis. Axes 0 to 500 kJ, fixed
   from the slider maxima (150 g from −40 to 140 °C takes 475 kJ), and
   −40 to 140 °C.
===================================================================== */
(function () {
  const d = sim('sim-heat', 540);
  const reset = () => cy.reset();
  const M = ctl(d.controls, { label: '\\km', cls: 'mass', min: 10, max: 150, step: 1, value: 135, unit: 'g', dec: 0, aria: 'mass of water in grams', onInput: reset });
  const TA = ctl(d.controls, { label: '\\kTone', cls: 'temperature', min: -40, max: 140, step: 1, value: -15, unit: '°C', dec: 0, aria: 'starting temperature in degrees Celsius', onInput: reset });
  const TB = ctl(d.controls, { label: '\\kTtwo', cls: 'temperature', min: -40, max: 140, step: 1, value: 120, unit: '°C', dec: 0, aria: 'final temperature in degrees Celsius', onInput: reset });
  const cy = cycle(() => 6, 1.5);
  const CS = { s: 2.09, l: 4.18, g: 1.86 }, NAME = { s: 'ice', l: 'water', g: 'steam' }, FORM = { s: 'H₂O(s)', l: 'H₂O(l)', g: 'H₂O(g)' };
  const MM = 18.02, FUS = 6.01, VAP = 40.67;
  /* the steps from ta to tb: warming or cooling within a phase (q = mcΔT) and the transitions (q = nΔH), each in kJ */
  function path(m, ta, tb) {
    const steps = [], up = tb > ta, n = m / MM;
    if (ta === tb) return steps;
    let ph = up ? (ta <= 0 ? 's' : ta <= 100 ? 'l' : 'g') : (ta >= 100 ? 'g' : ta >= 0 ? 'l' : 's'), cur = ta;
    const warm = (t1) => { if (t1 !== cur) steps.push({ kind: 'warm', ph, t0: cur, t1, q: (m * CS[ph] * (t1 - cur)) / 1000 }); cur = t1; };
    for (;;) {
      const next = up ? { s: 0, l: 100, g: Infinity }[ph] : { g: 100, l: 0, s: -Infinity }[ph];
      if (up ? tb <= next : tb >= next) { warm(tb); break; }
      warm(next);
      const melt = (up && ph === 's') || (!up && ph === 'l');
      steps.push({ kind: 'change', ph, t0: cur, t1: cur, q: (up ? 1 : -1) * n * (melt ? FUS : VAP), melt });
      ph = up ? (ph === 's' ? 'l' : 'g') : (ph === 'g' ? 'l' : 's');
    }
    return steps;
  }
  const WORD = (s, up) => (s.kind === 'warm' ? `the ${NAME[s.ph]} is ${up ? 'warming' : 'cooling'}` : s.melt ? (up ? 'the ice is melting at 0 °C' : 'the water is freezing at 0 °C') : (up ? 'the water is boiling at 100 °C' : 'the steam is condensing at 100 °C'));
  const BRACE = (s, up) => (s.kind === 'warm' ? NAME[s.ph] : s.melt ? (up ? 'melting' : 'freezing') : (up ? 'boiling' : 'condensing'));
  function draw() {
    const { ctx } = begin(d.c);
    const m = M.v, ta = TA.v, tb = TB.v, up = tb >= ta, steps = path(m, ta, tb), ct = C('temperature'), ce = C('energy');
    const box = { l: 150, r: 1290, t: 100, b: 460 };
    const { X, Y } = axes(ctx, box, [0, 500], [-40, 140], { nx: 5, ny: 9, xl: up ? 'heat added (kJ)' : 'heat removed (kJ)', xc: ce, yl: 'T (°C)', yc: ct });
    const pts = [[0, ta]]; let acc = 0;
    steps.forEach((s) => { acc += Math.abs(s.q); s.x0 = acc - Math.abs(s.q); s.x1 = acc; pts.push([acc, s.t1]); });
    const total = acc, k = total > 0 ? clamp(cy.now() / 6, 0, 1) : 1, qNow = k * total;
    const at = (x) => { for (let i = 1; i < pts.length; i++) if (x <= pts[i][0] + 1e-9) { const [x0, y0] = pts[i - 1], [x1, y1] = pts[i]; return x1 > x0 ? y0 + ((y1 - y0) * (x - x0)) / (x1 - x0) : y1; } return pts[pts.length - 1][1]; };
    const poly = (upto, col, w) => {
      ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = w; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(X(0), Y(ta));
      for (let i = 1; i < pts.length && pts[i - 1][0] < upto; i++) { const x = Math.min(pts[i][0], upto); ctx.lineTo(X(x), Y(at(x))); }
      ctx.stroke(); ctx.restore();
    };
    const arr = F.ease.smooth(F.arrival(d));
    poly(total * arr, alpha(ct, 0.3), 4); poly(qNow, ct, 5);
    /* each stretch named as the book names it: one phase on a slope, the two that coexist on a plateau */
    steps.forEach((s) => {
      const xm = X((s.x0 + s.x1) / 2), ym = Y((s.t0 + s.t1) / 2), wide = X(s.x1) - X(s.x0), tall = Math.abs(Y(s.t1) - Y(s.t0));
      /* a short stretch of ice is named at its cold end, below the melting plateau's name */
      const yw = s.ph === 's' && tall < 60 ? Math.max(Y(s.t0), Y(s.t1)) : ym;
      if (s.kind === 'warm' && (wide > 6 || tall > 24)) label(ctx, FORM[s.ph], xm, yw, { side: 'right', size: 18, gap: 22, weight: 400 });
      if (s.kind === 'change' && wide > (s.melt ? 40 : 180)) {
        const both = s.melt ? 'H₂O(s) and H₂O(l)' : 'H₂O(l) and H₂O(g)';
        if (s.melt && wide < 260) {
          /* a short melting plateau: its name above and to the right on a leader, clear of the water's slope and of the ice */
          const lx = X(s.x1) + 62, ly = ym - 50;
          line(ctx, X(s.x1) - 12, ym - 6, lx - 6, ly + 8, alpha(PAL.ink, 0.5), 1.5, [5, 6]);
          label(ctx, both, lx, ly, { side: 'right', size: 18, gap: 0, weight: 400 });
        } else label(ctx, both, xm, ym, { side: 'below', size: 18, gap: 24, weight: 400 });
      }
    });
    if (steps.length) dot(ctx, X(qNow), Y(at(qNow)), ct, true, 10);
    const cur = steps.find((s) => qNow <= s.x1 + 1e-9) || steps[steps.length - 1];
    const terms = steps.map((s) => sig3(s.q)), sum = terms.reduce((a, b) => a + b, 0);
    /* the total the headline names is the readout's rounded sum, so the two agree */
    const done = k >= 1, verb = up ? 'added' : 'removed', word = (x) => show3(sig3(x)), all = word(Math.abs(sum));
    topline(ctx, !steps.length ? 'The starting and final temperatures are the same, so no heat flows.'
      : done ? `All ${all} kJ ${verb}: ${fmt(m, 0)} g of ${NAME[steps[steps.length - 1].ph]} at ${minus(String(tb))} °C.`
        : `${word(k * Math.abs(sum))} kJ of ${all} kJ ${verb}: ${WORD(cur, up)}.`);
    const kj = (x) => hue('energy', (x < 0 ? '-' : '') + show3(Math.abs(x)) + '\\ \\text{kJ}');
    const term = (x, i) => `\\underbrace{${x < 0 ? '(' + kj(x) + ')' : kj(x)}}_{\\text{${BRACE(steps[i], up)}}}`;
    const body = terms.length ? terms.map((x, i) => (i ? '+' : '') + term(x, i)).join('') + '=' + kj(sig3(sum)) : hue('energy', '0\\ \\text{kJ}');
    tex(d.readout, `\\kq_{\\text{total}}=${body}`);
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();
};
