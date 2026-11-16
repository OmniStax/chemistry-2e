/* Figures for section 13.3 Shifting Equilibria: Le Châtelier’s Principle. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['13.3'] = function (root, F) {
const { fmt, C, PAL, alpha, ctl, cycle, register, begin, line, dot, text, topline } = F;
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;
const TAU = 2 * Math.PI, R8 = 8.314;
function rng(seed) { let a = seed >>> 0; return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
const sci = (v, n = 2) => { const e = Math.floor(Math.log10(Math.abs(v))), m = v / 10 ** e; return e >= -1 && e <= 2 ? v.toPrecision(n) : `${m.toFixed(n - 1)} \\times 10^{${e}}`; };
const fold = (x) => { const m = (((x + 1) % 4) + 4) % 4; return m < 2 ? m - 1 : 3 - m; };
function disc(ctx, x, y, r, fill) { ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fillStyle = fill; ctx.fill(); ctx.lineWidth = 1.2; ctx.strokeStyle = alpha(PAL.ink, 0.55); ctx.stroke(); ctx.restore(); }

/* =====================================================================
   SIM: a gas mixture at equilibrium in a vessel closed by a piston, given
   one stress at TS. H2 + I2 ⇌ 2HI at 400 °C, Kc = 50.0, each molecule
   0.020 M (2 H2, 4 I2, 20 HI: Qc = 0.400² / (0.040 × 0.080) = 50.0
   exactly); N2O4 ⇌ 2NO2 at 25 °C, each molecule 0.0020 M (21 N2O4,
   8 NO2: the 0.042 M and 0.016 M of the 13.2 example, Kc = 6.1 × 10⁻³),
   ΔH = +57.20 kJ, Kc at 50 °C and 0 °C by van 't Hoff. The net reaction
   runs by k_f = Kc k_r, the rates scaled so the shift settles with time
   constant TAUK; the molecules follow the rounded extent, and a forward
   and a reverse reaction every 0.7 s keep the balance dynamic. A run is
   computed whole when a choice changes, so the transport scrubs it
   exactly. Flat (book rule: every molecule must be seen and turning the
   vessel shows nothing): the vessel in side view, its piston at the
   height h(t) sets; positions fold into it. Beside it two graphs share
   one unscaled time axis: every concentration, its range fixed per run
   from the largest concentration it reaches, and under it Qc (dashed,
   the variant away from equilibrium) against Kc (solid), on a range
   fixed per reaction (0 to 120 for HI, where Qc reaches 112.5 on adding
   HI; 0 to 0.04 for N2O4, where Kc reaches 0.036 at 50 °C), so the
   reader sees which of the two a stress moves.
===================================================================== */
(function () {
  const d = F.sim(root, 'sim-le-chatelier', 680);
  /* each molecule's atoms [element, dx, dy, r] in canvas units, space-filling */
  const MOLS = {
    H2: { name: 'hydrogen, H₂', atoms: [['H', -6, 0, 8.5], ['H', 6, 0, 8.5]] },
    I2: { name: 'iodine, I₂', atoms: [['I', -11, 0, 13], ['I', 11, 0, 13]] },
    HI: { name: 'hydrogen iodide, HI', atoms: [['H', -13, 0, 8.5], ['I', 3, 0, 13]] },
    N2O4: { name: 'dinitrogen tetroxide, N₂O₄', atoms: [['O', -12.8, -7.2, 6.8], ['O', -12.8, 7.2, 6.8], ['O', 12.8, -7.2, 6.8], ['O', 12.8, 7.2, 6.8], ['N', -5.6, 0, 7.2], ['N', 5.6, 0, 7.2]] },
    NO2: { name: 'nitrogen dioxide, NO₂', atoms: [['O', -8.8, 4, 6.8], ['O', 8.8, 4, 6.8], ['N', 0, -2.4, 7.2]] },
  };
  const RX = {
    hi: { label: 'H_{2} + I_{2} ⇌ 2HI', T: 673.15, deg: 400, K: 50, u: 0.02, sig: 3, qr: [0, 120, 3],
      sp: [{ k: 'H2', nu: -1, n: 2, M: 2.016, f: 'H_{2}', t: '\\text{H}_{2}' }, { k: 'I2', nu: -1, n: 4, M: 253.8, f: 'I_{2}', t: '\\text{I}_{2}' }, { k: 'HI', nu: 2, n: 20, M: 127.9, f: 'HI', t: '\\text{HI}' }],
      stresses: [
        { value: 'add-H2', label: 'add H₂', add: { H2: 4 } }, { value: 'add-I2', label: 'add I₂', add: { I2: 4 } },
        { value: 'remove-HI', label: 'remove HI', add: { HI: -10 } }, { value: 'add-HI', label: 'add HI', add: { HI: 10 } },
        { value: 'compress', label: 'compress to V/3', vol: 1 / 3 }] },
    n2o4: { label: 'N_{2}O_{4} ⇌ 2NO_{2}', T: 298.15, deg: 25, K: (0.016 * 0.016) / 0.042, u: 0.002, sig: 2, dH: 57200, qr: [0, 0.04, 4],
      sp: [{ k: 'N2O4', nu: -1, n: 21, M: 92.01, f: 'N_{2}O_{4}', t: '\\text{N}_{2}\\text{O}_{4}' }, { k: 'NO2', nu: 2, n: 8, M: 46.01, f: 'NO_{2}', t: '\\text{NO}_{2}' }],
      stresses: [
        { value: 'add-N2O4', label: 'add N₂O₄', add: { N2O4: 10 } }, { value: 'add-NO2', label: 'add NO₂', add: { NO2: 8 } },
        { value: 'remove-NO2', label: 'remove NO₂', add: { NO2: -4 } }, { value: 'compress', label: 'compress to V/3', vol: 1 / 3 },
        { value: 'heat', label: 'heat to 50 °C', T: 323.15, deg: 50 }, { value: 'cool', label: 'cool to 0 °C', T: 273.15, deg: 0 }] },
  };
  const opts = (key) => RX[key].stresses.map(({ value, label }) => ({ value, label }));
  const rxn = F.choice(d.controls, { label: '\\text{reaction}', options: [{ value: 'hi', label: 'H₂ + I₂ ⇌ 2HI' }, { value: 'n2o4', label: 'N₂O₄ ⇌ 2NO₂' }], value: 'hi', aria: 'the equilibrium in the vessel',
    onInput: () => { pick.options(opts(rxn.value), RX[rxn.value].stresses[0].value); rerun(); } });
  const pick = F.select(d.controls, { label: '\\text{stress}', key: 'stress', options: opts('hi'), value: 'add-H2', aria: 'the stress applied at the dashed line', onInput: () => rerun() });
  const picks = { get hi() { return pick; }, get n2o4() { return pick; } };

  const RC = 0.2, TS = 1.5, TRUN = 7, DT = 1 / 60, NF = Math.round(TRUN / DT), TAUK = 0.6, PISTON = 0.6, GROW = 0.3;
  /* the vessel's inside, in canvas units: full height at h = 1 */
  const VL = 70, VR = 500, VB = 570, VT = 160, PAD = 22;
  const cy = cycle(() => TRUN, 1.5);
  let run = null, hits = [];
  F.hover(d.stage, () => hits);
  function simulate() {
    const R = RX[rxn.value], st = R.stresses.find((s) => s.value === picks[rxn.value].value) ?? R.stresses[0];
    const rand = rng(R.sp.length * 977 + R.stresses.indexOf(st) * 131 + 7);
    const vol = st.vol ?? 1, T2 = st.T ?? R.T, K2 = st.T ? R.K * Math.exp((R.dH / R8) * (1 / R.T - 1 / T2)) : R.K;
    const speed = Math.sqrt(T2 / R.T);
    const hOf = (t) => (vol === 1 || t <= TS ? 1 : 1 + (vol - 1) * F.ease.smooth(Math.min(1, (t - TS) / PISTON)));
    const D = (t) => (t <= TS ? t : TS + speed * (t - TS));
    const n0 = R.sp.map((s) => s.n), n1 = R.sp.map((s) => s.n + ((st.add ?? {})[s.k] ?? 0));
    const conc = (n, xi, h) => n.map((q, i) => ((q + R.sp[i].nu * xi) * R.u) / h);
    const gap = (n, xi, h, K) => { const c = conc(n, xi, h); let f = K, r = 1; R.sp.forEach((s, i) => { if (s.nu < 0) f *= c[i] ** -s.nu; else r *= c[i] ** s.nu; }); return f - r; };
    let lo = -Infinity, hi = Infinity;
    R.sp.forEach((s, i) => { if (s.nu < 0) hi = Math.min(hi, n1[i] / -s.nu); else lo = Math.max(lo, -n1[i] / s.nu); });
    let a = lo + 1e-9, b = hi - 1e-9;
    for (let i = 0; i < 80; i++) { const m = (a + b) / 2; if (gap(n1, m, vol, K2) > 0) a = m; else b = m; }
    const xe = (a + b) / 2, dx = 1e-4, lam = -(gap(n1, xe + dx, vol, K2) - gap(n1, xe - dx, vol, K2)) / (2 * dx), kap = 1 / (TAUK * lam);
    const xi = new Float64Array(NF + 1), fs = Math.round(TS / DT);
    const rate = (x, t) => kap * gap(n1, x, hOf(t), K2);
    for (let f = fs; f < NF; f++) {
      const t = f * DT, x = xi[f];
      const k1 = rate(x, t), k2 = rate(x + (DT / 2) * k1, t + DT / 2), k3 = rate(x + (DT / 2) * k2, t + DT / 2), k4 = rate(x + DT * k3, t + DT);
      xi[f + 1] = x + (DT / 6) * (k1 + 2 * k2 + 2 * k3 + k4);
    }
    const cAt = (f) => (f < fs ? conc(n0, 0, 1) : conc(n1, xi[f], hOf(f * DT)));
    const series = Array.from({ length: NF + 1 }, (_, f) => cAt(f));
    const Q = (c) => { let num = 1, den = 1; R.sp.forEach((s, i) => { if (s.nu < 0) den *= c[i] ** -s.nu; else num *= c[i] ** s.nu; }); return num / den; };
    const qs = series.map(Q);
    const kf = (x) => (R.sig === 3 ? x.toFixed(1) : sci(x));
    let settled = Infinity;
    for (let f = fs + Math.round((PISTON + 0.2) / DT); f <= NF; f++) if (kf(Q(series[f])) === kf(K2)) { settled = f * DT; break; }
    const cmax = Math.max(...series.flat());

    /* the molecules: each slot a ballistic path folded into the vessel, its kind changing at events */
    const slots = [], halos = [];
    const dir = () => { const z = 2 * rand() - 1, p = TAU * rand(), s = Math.sqrt(1 - z * z); return [s * Math.cos(p), s * Math.sin(p), z]; };
    const spawn = (k, born, p0) => {
      const M = R.sp.find((s) => s.k === k)?.M ?? 50, sp = (0.35 + 0.5 * rand()) * Math.min(1.6, Math.sqrt(R.T / M) / 1.1), u = dir();
      const s = { kinds: [[born, k]], born, died: Infinity, p0: p0 ?? [0, 1, 2].map(() => 2 * rand() - 1), vel: u.map((q) => q * sp), rot: [TAU * rand(), TAU * rand(), TAU * rand()], spin: [rand() - 0.5, rand() - 0.5, rand() - 0.5] };
      slots.push(s); return s;
    };
    const posN = (s, t) => s.p0.map((p, k) => fold(p + s.vel[k] * (D(t) - D(s.born))));
    const kindAt = (s, t) => { let k = s.kinds[0][1]; for (const [t0, kk] of s.kinds) if (t0 <= t) k = kk; return k; };
    const alive = (k, t) => slots.filter((s) => s.born <= t && t < s.died && kindAt(s, t) === k);
    const pick = (list) => list[Math.floor(rand() * list.length)];
    R.sp.forEach((s, i) => { for (let j = 0; j < n0[i]; j++) spawn(s.k, -1); });
    const evs = [];
    for (let f = fs + 1, m = 0; f <= NF; f++) { const r = Math.round(xi[f]); while (r > m) { evs.push({ t: f * DT, dir: 1 }); m++; } while (r < m) { evs.push({ t: f * DT, dir: -1 }); m--; } }
    for (let t = 0.4; t < TRUN - 0.4; t += 0.7) { if (Math.abs(t - TS) < 0.25) continue; evs.push({ t, dir: 1 }, { t: t + 0.3, dir: -1 }); }
    evs.sort((p, q) => p.t - q.t);
    let stressed = false;
    const stress = () => {
      stressed = true;
      R.sp.forEach((s, i) => {
        const dn = n1[i] - n0[i];
        for (let j = 0; j < dn; j++) spawn(s.k, TS);
        for (let j = 0; j < -dn; j++) { const g = pick(alive(s.k, TS)); if (g) g.died = TS; }
      });
    };
    const [rA, rB] = R.sp.filter((s) => s.nu < 0).map((s) => s.k), pK = R.sp.find((s) => s.nu > 0).k;
    for (const e of evs) {
      if (!stressed && e.t >= TS) stress();
      const t = e.t;
      if (rxn.value === 'hi') {
        if (e.dir > 0) { const a1 = pick(alive(rA, t)), b1 = pick(alive(rB, t)); if (!a1 || !b1) continue; a1.kinds.push([t, pK]); b1.kinds.push([t, pK]); halos.push({ t, s: a1 }); }
        else { const ps = alive(pK, t); if (ps.length < 2) continue; const a1 = pick(ps), b1 = pick(ps.filter((q) => q !== a1)); a1.kinds.push([t, rA]); b1.kinds.push([t, rB]); halos.push({ t, s: a1 }); }
      } else if (e.dir > 0) { const a1 = pick(alive(rA, t)); if (!a1) continue; a1.kinds.push([t, pK]); spawn(pK, t, posN(a1, t)); halos.push({ t, s: a1 }); }
      else { const ps = alive(pK, t); if (ps.length < 2) continue; const a1 = pick(ps), b1 = pick(ps.filter((q) => q !== a1)); a1.kinds.push([t, rA]); b1.died = t; halos.push({ t, s: a1 }); }
    }
    if (!stressed) stress();
    return { R, st, vol, K1: R.K, K2, hOf, series, qs, settled, cmax, slots, halos, posN, kindAt, xe, id: Math.random() };
  }
  function rerun() { run = simulate(); cy.reset(); }
  rerun();

  function molecule(ctx, k, x, y, th, s = 1) {
    const c = Math.cos(th), sn = Math.sin(th);
    MOLS[k].atoms.forEach(([e, dx, dy, r]) => {
      ctx.save(); ctx.fillStyle = F.el(e); ctx.strokeStyle = alpha(PAL.ink, 0.55); ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.arc(x + s * (dx * c - dy * sn), y + s * (dx * sn + dy * c), r * s, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore();
    });
  }
  /* a folded position [-1, 1]² to the canvas, inside a vessel whose piston stands at h */
  const top = (h) => VB - (VB - VT) * h;
  const place = (q, h) => [VL + PAD + ((q[0] + 1) / 2) * (VR - VL - 2 * PAD), VB - PAD - ((q[1] + 1) / 2) * (VB - top(h) - 2 * PAD)];

  function draw() {
    const { ctx } = begin(d.c);
    const t = cy.now(), f = Math.min(NF, Math.max(0, Math.round(t / DT))), { R, st, series, hOf, slots, halos, posN, kindAt } = run, h = hOf(t);
    hits = [];
    /* the vessel: walls and floor, the piston at its height, the rod above */
    const yp = top(h), deg = t < TS || !st.T ? R.deg : st.deg;
    ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.04); ctx.fillRect(VL, yp, VR - VL, VB - yp); ctx.restore();
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 4; ctx.lineJoin = 'round'; ctx.beginPath();
    ctx.moveTo(VL - 2, VT - 40); ctx.lineTo(VL - 2, VB + 2); ctx.lineTo(VR + 2, VB + 2); ctx.lineTo(VR + 2, VT - 40); ctx.stroke(); ctx.restore();
    ctx.save(); ctx.fillStyle = alpha(PAL.muted, 0.55); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2;
    ctx.fillRect(VL + 1, yp - 18, VR - VL - 2, 18); ctx.strokeRect(VL + 1, yp - 18, VR - VL - 2, 18);
    ctx.fillRect((VL + VR) / 2 - 9, VT - 62, 18, yp - 18 - (VT - 62)); ctx.strokeRect((VL + VR) / 2 - 9, VT - 62, 18, yp - 18 - (VT - 62)); ctx.restore();
    hits.push({ x: (VL + VR) / 2, y: yp - 9, r: 30, name: 'the piston' });
    text(ctx, `${deg} °C`, VR + 16, VB - 14, C('temperature'), { size: 20, weight: 600, bg: PAL.panel });

    /* the molecules, and a faint ring where one has just reacted */
    ctx.save(); ctx.beginPath(); ctx.rect(VL, yp, VR - VL, VB - yp); ctx.clip();
    halos.forEach(({ t: te, s }) => { const k = (t - te) / 0.6; if (k < 0 || k >= 1) return; const [x, y] = place(posN(s, te), hOf(te)); ctx.save(); ctx.strokeStyle = alpha(PAL.ink, 0.45 * (1 - k)); ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y, 22 + 16 * k, 0, TAU); ctx.stroke(); ctx.restore(); });
    slots.forEach((s) => {
      const k = kindAt(s, t), on = t >= s.born && t < s.died + GROW;
      if (!on) return;
      const sc = s.born > 0 && t < s.born + GROW ? (t - s.born) / GROW : t >= s.died ? 1 - (t - s.died) / GROW : 1;
      const [x, y] = place(posN(s, Math.min(t, s.died)), h);
      molecule(ctx, k, x, y, s.rot[0] + s.spin[0] * 2 * t, Math.max(0.01, sc));
      hits.push({ x, y, r: 18, name: MOLS[k].name });
    });
    ctx.restore();
    const ring = (c, x, y) => { c.save(); c.strokeStyle = alpha(PAL.ink, 0.45); c.lineWidth = 3; c.beginPath(); c.arc(x, y, 12, 0, TAU); c.stroke(); c.restore(); };
    F.legend(ctx, { l: VL, r: VR, t: VB + 16, b: VB + 52 }, [...R.sp.map((s) => ({ s: s.f, draw: (c, x, y) => molecule(c, s.k, x, y, 0, 0.75) })), { s: 'just reacted', draw: ring }], { corner: 'top', row: true, panel: false });

    /* the concentrations against time, the stress at the dashed line */
    const c = series[f], c0 = series[0], cEnd = series[NF], K = t < TS ? run.K1 : run.K2;
    const G = { l: 660, r: 1240, t: 150, b: 370 }, GQ = { l: 660, r: 1240, t: 450, b: 600 }, yr = F.nice(0, run.cmax * 1.08, 4);
    const g = F.axes(ctx, G, [0, TRUN], [0, yr.hi], { nx: 7, ny: yr.n, fx: () => '', fy: (q) => (q ? fmt(q, R.sig === 3 ? 2 : 3) : '0'), yl: 'concentration (M)', yc: C('concentration') });
    const gq = F.axes(ctx, GQ, [0, TRUN], [R.qr[0], R.qr[1]], { nx: 7, ny: R.qr[2], fx: () => '', fy: (q) => (q ? String(+q.toPrecision(2)) : '0'), xl: 'time' });
    line(ctx, g.X(TS), G.t, g.X(TS), GQ.b, alpha(PAL.ink, 0.4), 2, [10, 10]);
    text(ctx, st.label, g.X(TS) + 10, G.t + 16, PAL.muted, { size: 17, bg: PAL.panel });
    /* Qc against Kc: the solid level is Kc, stepping only when the temperature changes; the dashed curve is Qc */
    const cK = C('equilibrium-constant'), tn = f * DT;
    line(ctx, gq.X(0), gq.Y(run.K1), gq.X(Math.min(tn, TS)), gq.Y(run.K1), cK, 3);
    if (tn > TS) { if (run.K2 !== run.K1) line(ctx, gq.X(TS), gq.Y(run.K1), gq.X(TS), gq.Y(run.K2), alpha(cK, 0.5), 2, [4, 8]); line(ctx, gq.X(TS), gq.Y(run.K2), gq.X(tn), gq.Y(run.K2), cK, 3); }
    if (f > 0) F.plot(ctx, gq, (x) => run.qs[Math.min(NF, Math.max(0, Math.round(x / DT)))], cK, { w: 5, x: [0, tn], dash: [10, 10] });
    dot(ctx, gq.X(tn), gq.Y(run.qs[f]), cK, false, 8);
    F.legend(ctx, gq, [{ s: 'Q_{c}', color: cK, w: 5, dash: [10, 10] }, { s: 'K_{c}', color: cK, w: 3 }], { corner: 'above' });
    R.sp.forEach((s, i) => {
      const col = F.cat(i);
      ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = 5; ctx.lineJoin = 'round'; ctx.beginPath();
      for (let q = 0; q <= f; q++) { const x = g.X(q * DT), y = g.Y(series[q][i]); if (q) ctx.lineTo(x, y); else ctx.moveTo(x, y); }
      ctx.stroke(); ctx.restore();
      dot(ctx, g.X(f * DT), g.Y(c[i]), col, true, 8);
    });
    /* each curve named at the right edge, at its final value, stepped apart where two would touch */
    const tags = R.sp.map((s, i) => ({ s: `[${s.f}]`, y0: g.Y(cEnd[i]), y: g.Y(cEnd[i]), col: F.cat(i) })).sort((p, q) => p.y0 - q.y0);
    for (let k = 1; k < tags.length; k++) tags[k].y = Math.max(tags[k].y, tags[k - 1].y + 26);
    const over = tags[tags.length - 1].y - (G.b + 8);
    if (over > 0) tags.forEach((q) => { q.y -= over; });
    for (let k = tags.length - 2; k >= 0; k--) tags[k].y = Math.min(tags[k].y, tags[k + 1].y - 26);
    tags.forEach((q) => { if (Math.abs(q.y - q.y0) > 3) line(ctx, G.r + 4, q.y0, G.r + 22, q.y, alpha(q.col, 0.6), 1.5); text(ctx, q.s, G.r + 26, q.y, q.col, { size: 20, weight: 600 }); });

    const Q = (cc) => { let num = 1, den = 1; R.sp.forEach((s, i) => { if (s.nu < 0) den *= cc[i] ** -s.nu; else num *= cc[i] ** s.nu; }); return num / den; };
    const q = Q(c), kfmt = (x) => (R.sig === 3 ? x.toFixed(1) : sci(x)), rel = kfmt(q) === kfmt(K) ? '=' : q < K ? '<' : '>';
    const word = (s) => s.f;
    const phrase = st.add ? Object.entries(st.add).map(([k, n]) => `${word(R.sp.find((p) => p.k === k))} is ${n > 0 ? 'added' : 'removed'}`)[0] : st.vol ? 'the volume is cut to a third' : `the mixture is ${st.T > R.T ? 'heated' : 'cooled'} to ${st.deg} °C`;
    let head;
    if (t < TS) head = `At equilibrium, $\\kratef = \\krater$; at the dashed line, ${phrase}.`;
    else if (t < run.settled) {
      const right = run.xe > 0.01, left = run.xe < -0.01;
      if (st.add) { const [k, n] = Object.entries(st.add)[0]; head = `${n > 0 ? 'Adding' : 'Removing'} ${word(R.sp.find((p) => p.k === k))} makes $\\kratef ${right ? '>' : '<'} \\krater$, and the equilibrium shifts ${right ? 'right' : 'left'}.`; }
      else if (st.vol) head = right || left ? 'Compressing to a third of the volume makes $\\kQc > \\kKc$, and the equilibrium shifts left, toward fewer moles of gas.' : 'Compressing to a third of the volume triples every concentration, but $\\kQc$ is unchanged, so no shift occurs.';
      else head = st.T > R.T ? `Heating to ${st.deg} °C raises $\\kKc$ above $\\kQc$, and the equilibrium shifts right.` : `Cooling to ${st.deg} °C lowers $\\kKc$ below $\\kQc$, and the equilibrium shifts left.`;
    } else {
      const more = [], less = [];
      R.sp.forEach((s, i) => { const r = cEnd[i] / c0[i]; if (r > 1.01) more.push(word(s)); else if (r < 0.99) less.push(word(s)); });
      const list = (a) => (a.length < 3 ? a.join(' and ') : `${a.slice(0, -1).join(', ')} and ${a[a.length - 1]}`);
      const comp = [more.length ? `more ${list(more)}` : '', less.length ? `less ${list(less)}` : ''].filter(Boolean).join(' and ');
      const kk = st.T ? `a ${st.T > R.T ? 'larger' : 'smaller'} $\\kKc$` : `the same $\\kKc$`;
      head = Math.abs(run.xe) < 0.01 ? `Every concentration has tripled, and the mixture is still at equilibrium with ${kk}.` : `Equilibrium is re-established with ${comp} than before, and ${kk}.`;
    }
    topline(ctx, head);

    const cc = (i) => hue('concentration', (R.sig === 3 ? c[i].toFixed(3) : c[i].toPrecision(2)) + '\\,M');
    const kv = (x) => hue('equilibrium-constant', kfmt(x));
    const tex = R.sp.length === 3
      ? `\\kQc = \\frac{[${R.sp[2].t}]^{2}}{[${R.sp[0].t}][${R.sp[1].t}]} = \\frac{(${cc(2)})^{2}}{(${cc(0)})(${cc(1)})} = ${kv(q)} ${rel} \\kKc = ${kv(K)}`
      : `\\kQc = \\frac{[${R.sp[1].t}]^{2}}{[${R.sp[0].t}]} = \\frac{(${cc(1)})^{2}}{${cc(0)}} = ${kv(q)} ${rel} \\kKc = ${kv(K)}`;
    F.tex(d.readout, tex, false, { values: false });
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();

/* =====================================================================
   FIGURE 13.8: reaction diagrams of one elementary process without and
   with a catalyst, and under them the four rate constants the diagrams
   fix. Energies are illustrative, since the book prints none: reactants
   0, products −60 kJ/mol, the uncatalyzed peak 100 kJ/mol, the catalyzed
   peak on the slider (20 to 100 kJ/mol, default 63, the book's
   proportion). Each path is flat, rises on a half cosine from 0.25 to its
   peak at 0.52, and falls on another to the products at 0.80. The energy
   axis runs −95 to 120 kJ/mol (drawn as 0 to 215 from a base B, so that
   no zero line crosses it) and carries no numbers, as the book's does.
   Below, k/A = e^(−Ea/RT) at 298 K on a logarithmic axis fixed at 10⁻³⁰
   to 1 (the smallest is the uncatalyzed reverse, 10⁻²⁸; the largest the
   catalyzed forward at 20 kJ/mol, 10⁻³·⁵), every rate constant given one
   frequency factor A. On that axis the span from k_r to k_f is K, the
   same length on both rows, and the catalyst moves both ends one distance.
===================================================================== */
(function () {
  const d = F.sim(root, 'sim-catalyst-diagram', 780);
  const Ec = ctl(d.controls, { label: '\\kEa\\ \\text{forward, catalyzed}', cls: 'energy', min: 20, max: 100, step: 1, value: 63, unit: 'kJ/mol', dec: 0, specials: [{ at: 100, label: 'no catalyst' }], aria: 'forward activation energy of the catalyzed path, in kilojoules per mole' });
  const ro = F.readout(d);
  const G = { l: 170, r: 1290, t: 100, b: 420 }, B = 95, ER = 0, EP = -60, EU = 100, X0 = 0.25, XP = 0.52, X1 = 0.8;
  const S = { l: 170, r: 1290, t: 510, b: 706 }, TK = 298, RT = (R8 * TK) / 1000, LN10 = Math.log(10);
  const lg = (ea) => -ea / (RT * LN10);
  const SUP = '⁰¹²³⁴⁵⁶⁷⁸⁹', pow = (e) => '10' + (e < 0 ? '⁻' : '') + String(Math.abs(e)).split('').map((c) => SUP[+c]).join('');
  const sciU = (v) => { let e = Math.floor(Math.log10(v)), m = +(v / 10 ** e).toFixed(1); if (m >= 10) { m = 1; e += 1; } return e < 2 ? String(+v.toPrecision(2)) : `${m.toFixed(1)} × ${pow(e)}`; };
  const prof = (pk) => (x) => (x < X0 ? ER : x < XP ? ER + ((pk - ER) * (1 - Math.cos((Math.PI * (x - X0)) / (XP - X0)))) / 2 : x < X1 ? pk + ((EP - pk) * (1 - Math.cos((Math.PI * (x - XP)) / (X1 - XP)))) / 2 : EP);
  function bracket(ctx, x, y1, y2, side, lines, below) {
    const col = C('energy');
    if (Math.abs(y2 - y1) > 4) { F.arrow(ctx, x, (y1 + y2) / 2, x, y1, col, 3); F.arrow(ctx, x, (y1 + y2) / 2, x, y2, col, 3); }
    const ym = below ?? (y1 + y2) / 2, ax = side > 0 ? 'left' : 'right';
    lines.forEach(([s, c], i) => text(ctx, s, x + side * 12, ym + (i - (lines.length - 1) / 2) * 24, c, { size: 19, weight: c === col ? 600 : 400, align: ax, bg: PAL.panel }));
  }
  function draw() {
    const { ctx } = begin(d.c), pk = Ec.v, drop = EU - pk, on = drop > 0.5;
    const a = F.axes(ctx, G, [0, 1], [0, 215], { nx: 1, ny: 1, fx: () => '', fy: () => '', xl: 'extent of reaction', yl: 'energy', yc: C('energy') });
    const g = { X: a.X, Y: (e) => a.Y(e + B) }, c0 = F.cat(0), c1 = F.cat(1), ce = C('energy'), ck = C('rate-constant'), cK = C('equilibrium-constant');
    line(ctx, g.X(0.13), g.Y(EU), g.X(0.93), g.Y(EU), alpha(c0, 0.8), 3, [10, 10]);
    if (on) line(ctx, g.X(0.18), g.Y(pk), g.X(0.86), g.Y(pk), alpha(c1, 0.8), 3, [10, 10]);
    F.curve(ctx, prof(EU), 0, 1, g.X, g.Y, c0, 5, 200);
    F.curve(ctx, prof(pk), 0, 1, g.X, g.Y, c1, 5, 200);
    text(ctx, 'transition state', g.X(XP), g.Y(EU) - 22, PAL.ink, { size: 19, align: 'center', bg: PAL.panel });
    text(ctx, 'reactants', g.X(0.02), g.Y(ER) - 22, PAL.ink, { size: 19 });
    text(ctx, 'products', g.X(0.98), g.Y(EP) + 20, PAL.ink, { size: 19, align: 'right' });
    const kj = (x) => [fmt(x, 0) + ' kJ/mol', ce];
    bracket(ctx, g.X(0.13), g.Y(ER), g.Y(EU), -1, [['E_{a} forward', PAL.ink], kj(EU)]);
    bracket(ctx, g.X(0.93), g.Y(EP), g.Y(EU), 1, [['E_{a} reverse', PAL.ink], kj(EU - EP)]);
    if (on) {
      bracket(ctx, g.X(0.18), g.Y(ER), g.Y(pk), 1, [['E_{a} forward', PAL.ink], kj(pk)], g.Y(ER) - g.Y(pk) < 64 ? g.Y(ER) + 40 : undefined);
      bracket(ctx, g.X(0.86), g.Y(EP), g.Y(pk), -1, [['E_{a} reverse', PAL.ink], kj(pk - EP)]);
    }

    /* the rate constants: each row's span from k_r to k_f is K */
    const s = F.axes(ctx, S, [-30, 0], [0, 1], { nx: 6, ny: 0, fx: (v) => (v ? pow(v) : '1'), xl: 'k / A at 298 K', xc: ck });
    const K = Math.exp(-EP / RT), fac = Math.exp(drop / RT), Kt = `K_{c} = ${sciU(K)}`;
    const rows = [{ name: 'uncatalyzed', col: c0, y: 560, f: lg(EU), r: lg(EU - EP) }, { name: 'catalyzed', col: c1, y: 664, f: lg(pk), r: lg(pk - EP) }];
    if (on) [['r', 0], ['f', 1]].forEach(([k]) => line(ctx, s.X(rows[0][k]), rows[0].y + 12, s.X(rows[1][k]), rows[1].y - 12, alpha(PAL.ink, 0.4), 2, [4, 8]));
    rows.forEach((q) => {
      const xr = s.X(q.r), xf = s.X(q.f);
      text(ctx, q.name, S.l - 14, q.y, q.col, { size: 19, weight: 600, align: 'right' });
      line(ctx, xr, q.y, xf, q.y, cK, 5);
      dot(ctx, xr, q.y, q.col, true, 10); dot(ctx, xf, q.y, q.col, true, 10);
      text(ctx, 'k_{r}', xr - 18, q.y, ck, { size: 22, weight: 600, align: 'right', bg: PAL.panel });
      text(ctx, 'k_{f}', xf + 18, q.y, ck, { size: 22, weight: 600, bg: PAL.panel });
      text(ctx, Kt, (xr + xf) / 2, q.y - 24, cK, { size: 20, weight: 600, align: 'center', bg: PAL.panel });
    });
    if (on) F.rich(ctx, ['each ', [`× ${sciU(fac)}`, ck]], (s.X(rows[0].f) + s.X(rows[1].f)) / 2 + 22, (rows[0].y + rows[1].y) / 2 - 14, { size: 19, bg: PAL.panel });

    F.legend(ctx, a, [{ s: 'uncatalyzed', color: c0, w: 5 }, { s: 'catalyzed', color: c1, w: 5 }], { corner: 'bl' });
    topline(ctx, on ? `The catalyst makes $\\kkf$ and $\\kkr$ each ${sciU(fac)} times larger, so their ratio $\\kKc$ is unchanged.` : 'Without a catalyst, the two paths are one.');
    const en = (x) => hue('energy', fmt(x, 0));
    ro.set(`\\kKc = \\frac{\\kkf}{\\kkr} = \\frac{A e^{-\\kEa(\\text{forward})/R\\kT}}{A e^{-\\kEa(\\text{reverse})/R\\kT}} = \\exp\\left(\\frac{(${en(pk - EP)} - ${en(pk)})\\ \\text{kJ/mol}}{(8.314 \\times 10^{-3}\\ \\text{kJ mol}^{-1}\\,\\text{K}^{-1})(${hue('temperature', '298\\ \\text{K}')})}\\right) = ${hue('equilibrium-constant', sci(K))}`,
      'Every rate constant is given the same frequency factor $A$.');
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 13.9: the Haber-Bosch plant in section, its gases moving on an
   8 s loop with no hold. Every molecule is followed all the way round:
   a ticket j passes the foot of the catalyst chamber at time j S / V,
   and its kind repeats every eight tickets, fresh feed on the even ones
   (N2, H2, H2, H2) and recycled gas on the odd ones (the same), so the
   chamber is fed N2 : H2 as 1 : 3 and half of what it is fed has been
   round before. Over the catalyst the four fresh molecules of each eight
   become two NH3 (N2 + 3H2 → 2NH3); the recycled four pass unreacted.
   Below the condenser the NH3 falls to storage and the other four take
   the recycle line, which is as long as it must be for them to arrive
   back as the odd tickets they were: each path's length is rounded to a
   whole number of spacings (the recycle so that chamber + recycle is a
   multiple of eight), and a molecule's place along it is scaled to the
   path drawn, which changes its speed by a few percent at most. V LOOP
   is 32 spacings, so the loop is seamless. Cooling water runs on its own.
===================================================================== */
(function () {
  const d = F.sim(root, 'sim-haber-bosch', 850);
  const LOOP = 8, S = 40, V = 160, OY = 26, PW = 38;
  const cy = cycle(() => LOOP, 0);
  const COIL = [[1070, 220], [1070, 246], [1104, 284], [1036, 336], [1104, 388], [1036, 440], [1104, 492], [1070, 530], [1070, 600]];
  const mk = (pts) => { const cum = [0]; for (let i = 1; i < pts.length; i++) cum.push(cum[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1])); return { pts, cum, L: cum[cum.length - 1] }; };
  const at = (p, s) => { const c = p.cum; let i = 1; while (i < c.length - 1 && c[i] < s) i++; const f = Math.min(1, Math.max(0, (s - c[i - 1]) / (c[i] - c[i - 1] || 1))); return [p.pts[i - 1][0] + f * (p.pts[i][0] - p.pts[i - 1][0]), p.pts[i - 1][1] + f * (p.pts[i][1] - p.pts[i - 1][1])]; };
  const PATH = {
    feedL: mk([[20, 150], [380, 150], [380, 270], [370, 296], [370, 700], [398, 740], [460, 740]]),
    feedR: mk([[20, 150], [380, 150], [380, 270], [524, 270], [550, 300], [550, 700], [522, 740], [460, 740]]),
    react: mk([[460, 740], [460, 90], [1070, 90], ...COIL]),
    liquid: mk([[1070, 600], [1070, 716]]),
    recycle: mk([[1070, 600], [900, 600], [900, 140], [720, 140], [720, 740], [460, 740]]),
    water: mk([[1350, 510], [1152, 510], [1152, 270], [1350, 270]]),
  };
  const near = (x, m) => Math.round(x / m) * m;
  const Lr = near(PATH.react.L, S), LfL = near(PATH.feedL.L, S), LfR = LfL + near(PATH.feedR.L - PATH.feedL.L, 4 * S);
  const Lrec = near(PATH.recycle.L + Lr, 8 * S) - Lr, Lw = near(PATH.water.L, 64);
  const CAT0 = 740 - 552, CAT1 = 740 - 458;
  const ANG = [0.3, 2.1, 4.4, 1.2, 5.3, 3.5, 0.9, 2.8];
  const NAMES = { N2: 'nitrogen, N₂', H2: 'hydrogen, H₂', NH3: 'ammonia, NH₃', H2O: 'cooling water, H₂O' };
  function glyph(ctx, kind, x, y, th = 0) {
    const c = Math.cos(th), s = Math.sin(th), a = (dx, dy, r, el) => disc(ctx, x + dx * c - dy * s, y + dx * s + dy * c, r, F.el(el));
    if (kind === 'N2') { a(-7, 0, 8, 'N'); a(7, 0, 8, 'N'); }
    else if (kind === 'H2') { a(-5, 0, 5.5, 'H'); a(5, 0, 5.5, 'H'); }
    else if (kind === 'NH3') { a(-8, 5, 5, 'H'); a(8, 5, 5, 'H'); a(0, -9, 5, 'H'); a(0, 0, 8.5, 'N'); }
    else { a(-7, 5, 4.5, 'H'); a(7, 5, 4.5, 'H'); a(0, 0, 7, 'O'); }
  }
  const steel = () => alpha(PAL.muted, 0.5), edge = () => alpha(PAL.ink, 0.65);
  function pipe(ctx, pts, w = PW) {
    for (const [col, ww] of [[edge(), w], [PAL.panel, w - 5]]) {
      ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = ww; ctx.lineJoin = 'round'; ctx.lineCap = 'butt'; ctx.beginPath();
      pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.stroke(); ctx.restore();
    }
  }
  /* a pressure vessel in section: a steel wall round its inside */
  function tank(ctx, x, y, w, h, r, wall, fill) {
    ctx.save(); ctx.beginPath(); ctx.roundRect(x, y, w, h, r); ctx.fillStyle = steel(); ctx.fill(); ctx.lineWidth = 2.5; ctx.strokeStyle = edge(); ctx.stroke();
    ctx.beginPath(); ctx.roundRect(x + wall, y + wall, w - 2 * wall, h - 2 * wall, Math.max(2, r - wall)); ctx.fillStyle = fill; ctx.fill(); ctx.lineWidth = 1.5; ctx.strokeStyle = alpha(PAL.ink, 0.4); ctx.stroke(); ctx.restore();
  }
  function flange(ctx, x, y, across) {
    ctx.save(); ctx.fillStyle = PAL.muted; ctx.strokeStyle = edge(); ctx.lineWidth = 1.5;
    const [w, h] = across ? [PW + 12, 10] : [10, PW + 12];
    ctx.beginPath(); ctx.rect(x - w / 2, y - h / 2, w, h); ctx.fill(); ctx.stroke(); ctx.restore();
  }
  function compressor(ctx, x, y, a) {
    ctx.save(); ctx.beginPath(); ctx.arc(x, y, 34, 0, TAU); ctx.fillStyle = PAL.panel; ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = edge(); ctx.stroke();
    ctx.fillStyle = steel(); ctx.strokeStyle = edge(); ctx.lineWidth = 2;
    for (let i = 0; i < 3; i++) { const b = a + (i * TAU) / 3; ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + 24 * Math.cos(b - 0.9), y + 24 * Math.sin(b - 0.9), x + 27 * Math.cos(b), y + 27 * Math.sin(b)); ctx.quadraticCurveTo(x + 16 * Math.cos(b + 0.5), y + 16 * Math.sin(b + 0.5), x, y); ctx.fill(); ctx.stroke(); }
    ctx.beginPath(); ctx.arc(x, y, 5, 0, TAU); ctx.fillStyle = PAL.ink; ctx.fill(); ctx.restore();
  }
  function zig(ctx, pts, w, col) { ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = w; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.beginPath(); pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.stroke(); ctx.restore(); }
  let hits = [];
  F.hover(d.stage, () => hits);
  const PARTS = [
    { x: 240, y: 150, r: 36, name: 'compressor: raises the feed gases to 150 to 250 atm' }, { x: 655, y: 740, r: 36, name: 'compressor for the recycled gases' },
    { x: 460, y: 380, r: 48, name: 'heat exchanger: the hot gases leaving warm the feed gases in the jacket' }, { x: 460, y: 505, r: 52, name: 'catalyst' },
    { x: 460, y: 640, r: 50, name: 'heater' }, { x: 370, y: 500, r: 28, name: 'feed gases, preheated on the way down' }, { x: 550, y: 500, r: 28, name: 'feed gases, preheated on the way down' },
    { x: 460, y: 740, r: 26, name: 'preheated feed gases' }, { x: 810, y: 115, r: 70, name: 'heat exchanger: the hot mixture warms the recycled gases' },
    { x: 1070, y: 390, r: 60, name: 'condenser' }, { x: 1070, y: 632, r: 34, name: 'refrigeration' }, { x: 1070, y: 735, r: 60, name: 'liquid ammonia, NH₃(l), in storage' },
    { x: 1290, y: 510, r: 24, name: 'cold water in' }, { x: 1290, y: 270, r: 24, name: 'hot water out' }, { x: 336, y: 600, r: 14, name: 'catalyst chamber, 400 to 500 °C' }, { x: 584, y: 600, r: 14, name: 'catalyst chamber, 400 to 500 °C' },
  ];
  function draw() {
    const { ctx } = begin(d.c), t = cy.now(), spin = (t / LOOP) * TAU * 6, vt = V * t;
    ctx.save(); ctx.translate(0, OY);
    /* the vessels */
    tank(ctx, 660, 40, 300, 150, 40, 10, PAL.soft);
    tank(ctx, 330, 240, 260, 530, 64, 12, PAL.panel);
    tank(ctx, 990, 220, 200, 340, 50, 10, PAL.soft);
    tank(ctx, 1042, 556, 56, 118, 4, 8, PAL.panel);
    tank(ctx, 950, 668, 240, 96, 14, 10, PAL.panel);
    ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.07); ctx.fillRect(961, 716, 218, 37); ctx.restore();
    /* the pipes */
    pipe(ctx, [[20, 150], [380, 150], [380, 246]]);
    pipe(ctx, [[460, 246], [460, 90], [1070, 90], [1070, 226]]);
    pipe(ctx, [[1046, 600], [900, 600], [900, 140], [720, 140], [720, 740], [584, 740]]);
    pipe(ctx, COIL.slice(0, -1).concat([[1070, 560]]));
    pipe(ctx, [[1350, 510], [1186, 510]], 34); pipe(ctx, [[1186, 270], [1350, 270]], 34);
    [[380, 240, 1], [460, 240, 1], [720, 190, 1], [900, 190, 1], [1070, 220, 1], [660, 90, 0], [960, 90, 0], [1190, 510, 0], [1190, 270, 0], [1042, 600, 0], [586, 740, 0]].forEach(([x, y, a]) => flange(ctx, x, y, a));
    for (let y = 614; y <= 662; y += 12) line(ctx, 1046, y, 1094, y + 7, alpha(PAL.ink, 0.45), 4);

    /* every gas molecule, by its ticket */
    const pre = [], main = [], seen = [];
    for (let j = Math.floor((vt - Lr - PATH.liquid.L) / S); j <= Math.ceil((vt + Math.max(Lrec, LfR)) / S); j++) {
      const a = vt - j * S, m = ((j % 8) + 8) % 8, fresh = m % 2 === 0, th = ANG[m], base = m < 2 ? 'N2' : 'H2';
      if (a < 0) {
        if (fresh) { const R = m === 2 || m === 6, Lf = R ? LfR : LfL, p = R ? PATH.feedR : PATH.feedL, s = a + Lf; if (s >= 0) pre.push({ k: base, p: at(p, (s / Lf) * p.L), al: Math.min(1, s / 30), th }); }
        else { const s = a + Lrec; if (s >= 0) pre.push({ k: base, p: at(PATH.recycle, (s / Lrec) * PATH.recycle.L), al: 1, th }); }
      } else if (a <= Lr) {
        const s = (a / Lr) * PATH.react.L, p = at(PATH.react, s), mix = Math.min(1, Math.max(0, (s - CAT0) / (CAT1 - CAT0)));
        if (!fresh || mix <= 0) main.push({ k: base, p, al: 1, th });
        else { main.push({ k: base, p, al: 1 - mix, th }); if (m < 4) main.push({ k: 'NH3', p, al: mix, th }); }
      } else if (m === 0 || m === 2) { const s = a - Lr; if (s <= PATH.liquid.L) main.push({ k: 'NH3', p: at(PATH.liquid, s), al: Math.min(1, (PATH.liquid.L - s) / 24), th }); }
    }
    const put = (q) => { if (q.al <= 0.02) return; F.faded(ctx, q.al, [0, 0], () => glyph(ctx, q.k, q.p[0], q.p[1], q.th)); if (q.al > 0.5) seen.push({ x: q.p[0], y: q.p[1] + OY, r: 15, name: NAMES[q.k] }); };
    pre.forEach(put);

    /* inside the chamber: the inner vessel, open at its foot, with its exchanger tubes, catalyst beds and heater */
    ctx.save(); ctx.fillStyle = PAL.soft; ctx.fillRect(402, 304, 116, 412); ctx.restore();
    pipe(ctx, [[460, 252], [460, 306]]);
    ctx.save(); ctx.strokeStyle = edge(); ctx.lineWidth = 4; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(402, 716); ctx.lineTo(402, 304); ctx.lineTo(442, 304); ctx.moveTo(478, 304); ctx.lineTo(518, 304); ctx.lineTo(518, 716); ctx.stroke(); ctx.restore();
    [414, 428, 492, 506].forEach((x) => zig(ctx, [[x, 334], [x, 426]], 7, alpha(PAL.ink, 0.4)));
    [470, 505, 540].forEach((y) => {
      ctx.save(); ctx.beginPath(); ctx.roundRect(408, y - 12, 104, 24, 6); ctx.fillStyle = alpha(PAL.ink, 0.12); ctx.fill(); ctx.lineWidth = 1.5; ctx.strokeStyle = alpha(PAL.ink, 0.5); ctx.stroke();
      ctx.fillStyle = alpha(PAL.ink, 0.5); for (let i = 0; i < 12; i++) { ctx.beginPath(); ctx.arc(416 + i * 8, y + (i % 2 ? 5 : -5), 2.6, 0, TAU); ctx.fill(); } ctx.restore();
    });
    zig(ctx, Array.from({ length: 9 }, (_, i) => [i % 2 ? 500 : 420, 592 + i * 12]), 7, alpha(PAL.ink, 0.5));

    main.forEach(put);
    /* liquid ammonia in storage, and the cooling water */
    for (let i = 0; i < 15; i++) { const x = 976 + (i >> 1) * 28 + (i % 2 ? 14 : 0), y = i % 2 ? 744 : 728; glyph(ctx, 'NH3', x, y, ANG[i % 8]); }
    const nw = Lw / 64;
    for (let i = 0; i < nw; i++) { const s = (((vt + i * 64) % Lw) + Lw) % Lw, p = at(PATH.water, (s / Lw) * PATH.water.L), al = Math.min(1, s / 25, (Lw - s) / 25); if (al > 0.02) { F.faded(ctx, al, [0, 0], () => glyph(ctx, 'H2O', p[0], p[1], ANG[i % 8])); if (al > 0.5) seen.push({ x: p[0], y: p[1] + OY, r: 14, name: NAMES.H2O }); } }
    compressor(ctx, 240, 150, spin); compressor(ctx, 655, 740, -spin);

    const lab = (s, x, y, align = 'left') => text(ctx, s, x, y, PAL.ink, { size: 19, align, bg: PAL.panel });
    const lead = (x1, y1, x2, y2) => line(ctx, x1, y1, x2, y2, alpha(PAL.ink, 0.6), 1.5);
    lab('N_{2}, H_{2} feed gases', 22, 192);
    F.rich(ctx, ['compressor, ', ['150 to 250 atm', C('pressure')]], 240, 98, { size: 19, align: 'center', bg: PAL.panel });
    lab('NH_{3} and unreacted N_{2}, H_{2}', 432, 48, 'right');
    lead(436, 52, 452, 70);
    lab('heat exchanger', 810, 16, 'center');
    lab('heat exchanger', 296, 380, 'right'); lead(302, 380, 412, 380);
    lab('catalyst chamber,', 296, 440, 'right'); F.rich(ctx, [['400 to 500 °C', C('temperature')]], 296, 466, { size: 19, align: 'right', bg: PAL.panel }); lead(302, 452, 334, 452);
    lab('catalyst', 296, 505, 'right'); lead(302, 505, 410, 505);
    lab('heater', 296, 640, 'right'); lead(302, 640, 420, 640);
    lab('recycled', 810, 400, 'center'); lab('N_{2}, H_{2}', 810, 426, 'center');
    lab('compressor', 655, 794, 'center');
    lab('hot water out', 1204, 232); lab('cold water in', 1204, 548);
    lab('condenser', 1204, 390);
    lab('refrigeration', 1112, 632);
    lab('NH_{3}(l) storage', 1204, 716);
    F.legend(ctx, { l: 850, r: 1380, t: 14, b: 50 }, [['N2', 'N_{2}'], ['H2', 'H_{2}'], ['NH3', 'NH_{3}'], ['H2O', 'water']].map(([k, s]) => ({ s, draw: (c, x, y) => glyph(c, k, x, y) })), { corner: 'top', row: true, panel: false });
    ctx.restore();
    hits = [...seen, ...PARTS.map((q) => ({ ...q, y: q.y + OY }))];
  }
  F.tex(d.readout, '\\text{N}_{2}(g) + 3\\text{H}_{2}(g) \\rightleftharpoons 2\\text{NH}_{3}(g) \\\\ \\kdH = -92.2\\ \\text{kJ}');
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();
};
