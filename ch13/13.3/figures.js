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
   height h(t) sets; positions fold into it. The graph beside plots every
   concentration against unscaled time, its range fixed per run from the
   largest concentration it reaches.
===================================================================== */
(function () {
  const d = F.sim(root, 'sim-le-chatelier', 600);
  /* each molecule's atoms [element, dx, dy, r] in canvas units, space-filling */
  const MOLS = {
    H2: { name: 'hydrogen, H₂', atoms: [['H', -5, 0, 7], ['H', 5, 0, 7]] },
    I2: { name: 'iodine, I₂', atoms: [['I', -11, 0, 13], ['I', 11, 0, 13]] },
    HI: { name: 'hydrogen iodide, HI', atoms: [['H', -12, 0, 7], ['I', 3, 0, 13]] },
    N2O4: { name: 'dinitrogen tetroxide, N₂O₄', atoms: [['O', -12.8, -7.2, 6.8], ['O', -12.8, 7.2, 6.8], ['O', 12.8, -7.2, 6.8], ['O', 12.8, 7.2, 6.8], ['N', -5.6, 0, 7.2], ['N', 5.6, 0, 7.2]] },
    NO2: { name: 'nitrogen dioxide, NO₂', atoms: [['O', -8.8, 4, 6.8], ['O', 8.8, 4, 6.8], ['N', 0, -2.4, 7.2]] },
  };
  const RX = {
    hi: { label: 'H_{2} + I_{2} ⇌ 2HI', T: 673.15, deg: 400, K: 50, u: 0.02, sig: 3,
      sp: [{ k: 'H2', nu: -1, n: 2, M: 2.016, f: 'H_{2}', t: '\\text{H}_{2}' }, { k: 'I2', nu: -1, n: 4, M: 253.8, f: 'I_{2}', t: '\\text{I}_{2}' }, { k: 'HI', nu: 2, n: 20, M: 127.9, f: 'HI', t: '\\text{HI}' }],
      stresses: [
        { value: 'add-H2', label: 'add H₂', add: { H2: 4 } }, { value: 'add-I2', label: 'add I₂', add: { I2: 4 } },
        { value: 'remove-HI', label: 'remove HI', add: { HI: -10 } }, { value: 'add-HI', label: 'add HI', add: { HI: 10 } },
        { value: 'compress', label: 'compress to V/3', vol: 1 / 3 }] },
    n2o4: { label: 'N_{2}O_{4} ⇌ 2NO_{2}', T: 298.15, deg: 25, K: (0.016 * 0.016) / 0.042, u: 0.002, sig: 2, dH: 57200,
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
  const VL = 70, VR = 500, VB = 520, VT = 150, PAD = 22;
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
    return { R, st, vol, K1: R.K, K2, hOf, series, settled, cmax, slots, halos, posN, kindAt, xe, id: Math.random() };
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
    F.legend(ctx, { l: VL, r: VR, t: VB + 14, b: VB + 50 }, R.sp.map((s) => ({ s: s.f, draw: (c, x, y) => molecule(c, s.k, x, y, 0, 0.75) })), { corner: 'top', row: true, panel: false });

    /* the concentrations against time, the stress at the dashed line */
    const c = series[f], c0 = series[0], cEnd = series[NF], K = t < TS ? run.K1 : run.K2;
    const G = { l: 650, r: 1240, t: 150, b: 480 }, yr = F.nice(0, run.cmax * 1.08, 4);
    const g = F.axes(ctx, G, [0, TRUN], [0, yr.hi], { nx: 7, ny: yr.n, fx: () => '', fy: (q) => (q ? fmt(q, R.sig === 3 ? 2 : 3) : '0'), xl: 'time', yl: 'concentration (M)', yc: C('concentration') });
    line(ctx, g.X(TS), G.t, g.X(TS), G.b, alpha(PAL.ink, 0.4), 2, [10, 10]);
    text(ctx, st.label, g.X(TS) + 10, G.t + 16, PAL.muted, { size: 17, bg: PAL.panel });
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
    const over = tags[tags.length - 1].y - (G.b + 12);
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

    const cc = (i) => hue('concentration', R.sig === 3 ? c[i].toFixed(3) : c[i].toPrecision(2));
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
   with a catalyst. Energies are illustrative, since the book prints
   none: reactants 0 kJ, products −60 kJ, (each bracket carries its value) the uncatalyzed peak 100 kJ, the
   catalyzed peak on the slider (20 to 100 kJ, default 63 kJ, the book's
   proportion). Each path is flat, rises on a half cosine from 0.25 to its peak at
   0.52, and falls on another to the products at 0.80. The energy axis
   runs −80 to 120 kJ (drawn as 0 to 200 from a base B, so that no zero
   line crosses it) and carries no numbers, as the book's does. A catalyzed
   forward bracket too short for its label puts the label under its foot.
===================================================================== */
(function () {
  const d = F.sim(root, 'sim-catalyst-diagram', 560);
  const Ec = ctl(d.controls, { label: '\\kEa\\ \\text{forward, catalyzed}', cls: 'energy', min: 20, max: 100, step: 1, value: 63, unit: 'kJ', dec: 0, specials: [{ at: 100, label: 'no catalyst' }], aria: 'forward activation energy of the catalyzed path, in kilojoules' });
  const ro = F.readout(d);
  const G = { l: 170, r: 1290, t: 110, b: 500 }, B = 80, ER = 0, EP = -60, EU = 100, X0 = 0.25, XP = 0.52, X1 = 0.8;
  const prof = (pk) => (x) => (x < X0 ? ER : x < XP ? ER + ((pk - ER) * (1 - Math.cos((Math.PI * (x - X0)) / (XP - X0)))) / 2 : x < X1 ? pk + ((EP - pk) * (1 - Math.cos((Math.PI * (x - XP)) / (X1 - XP)))) / 2 : EP);
  function bracket(ctx, x, y1, y2, side, lines, below) {
    const col = C('energy');
    if (Math.abs(y2 - y1) > 4) { F.arrow(ctx, x, (y1 + y2) / 2, x, y1, col, 3); F.arrow(ctx, x, (y1 + y2) / 2, x, y2, col, 3); }
    const ym = below ?? (y1 + y2) / 2, ax = side > 0 ? 'left' : 'right';
    lines.forEach(([s, c], i) => text(ctx, s, x + side * 12, ym + (i - (lines.length - 1) / 2) * 24, c, { size: 19, weight: c === col ? 600 : 400, align: ax, bg: PAL.panel }));
  }
  function draw() {
    const { ctx } = begin(d.c), pk = Ec.v, drop = EU - pk;
    const a = F.axes(ctx, G, [0, 1], [0, 200], { nx: 1, ny: 1, fx: () => '', fy: () => '', xl: 'extent of reaction', yl: 'energy', yc: C('energy') });
    const g = { X: a.X, Y: (e) => a.Y(e + B) }, c0 = F.cat(0), c1 = F.cat(1);
    line(ctx, g.X(0.13), g.Y(EU), g.X(0.93), g.Y(EU), alpha(c0, 0.8), 3, [10, 10]);
    if (drop > 0.5) line(ctx, g.X(0.18), g.Y(pk), g.X(0.86), g.Y(pk), alpha(c1, 0.8), 3, [10, 10]);
    F.curve(ctx, prof(EU), 0, 1, g.X, g.Y, c0, 5, 200);
    F.curve(ctx, prof(pk), 0, 1, g.X, g.Y, c1, 5, 200);
    text(ctx, 'transition state', g.X(XP), g.Y(EU) - 22, PAL.ink, { size: 19, align: 'center', bg: PAL.panel });
    const ce = C('energy'), kj = (x) => [fmt(x, 0) + ' kJ', ce];
    bracket(ctx, g.X(0.13), g.Y(ER), g.Y(EU), -1, [['E_{a} forward', PAL.ink], kj(EU)]);
    bracket(ctx, g.X(0.93), g.Y(EP), g.Y(EU), 1, [['E_{a} reverse', PAL.ink], kj(EU - EP)]);
    if (drop > 0.5) {
      bracket(ctx, g.X(0.18), g.Y(ER), g.Y(pk), 1, [['E_{a} forward', PAL.ink], kj(pk)], g.Y(ER) - g.Y(pk) < 64 ? g.Y(ER) + 40 : undefined);
      bracket(ctx, g.X(0.86), g.Y(EP), g.Y(pk), -1, [['E_{a} reverse', PAL.ink], kj(pk - EP)]);
    }
    F.legend(ctx, a, [{ s: 'uncatalyzed', color: c0, w: 5 }, { s: 'catalyzed', color: c1, w: 5 }], { corner: 'bl' });
    topline(ctx, drop > 0.5 ? `Both activation energies of the catalyzed path are ${fmt(drop, 0)} kJ lower than without the catalyst.` : 'Without a catalyst, the two paths are one.');
    const en = (x) => hue('energy', fmt(x, 0) + '\\ \\text{kJ}');
    ro.set(`\\kEa(\\text{forward}) - \\kEa(\\text{reverse}) = ${en(pk)} - ${en(pk - EP)} = ${en(EP)}`,
      `Without the catalyst, $\\kEa(\\text{forward}) - \\kEa(\\text{reverse}) = ${en(EU)} - ${en(EU - EP)} = ${en(EP)}$ as well.`);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 13.9: the Haber-Bosch plant as a flow diagram on an 8 s loop
   with no hold. Each stream is a polyline its molecules travel at about
   120 units a second, the speed rounded so that every stream laps a
   whole number of times in the loop and the loop is seamless. Feed and
   recycled gases (N2 : H2 as 1 : 3) run down the jacket of the catalyst
   chamber and up its middle; past the catalyst, of each eight molecules
   one N2 and one H2 become NH3 and two H2 are used up (N2 + 3H2 → 2NH3),
   the other four going through unreacted. NH3 drops from the
   refrigeration to storage; N2 and H2 return through the heat exchanger.
   Molecules fade in and out over the first and last 20 units of their
   stream, where streams meet.
===================================================================== */
(function () {
  const d = F.sim(root, 'sim-haber-bosch', 880);
  const LOOP = 8, SPACE = 40, SPEED = 120;
  const cy = cycle(() => LOOP, 0);
  const COIL = [[1060, 350], [1035, 372], [1125, 402], [1035, 432], [1125, 462], [1035, 492], [1125, 522], [1035, 552], [1125, 582], [1060, 612], [1060, 700]];
  const PATHS = {
    feedL: [[40, 270], [390, 270], [390, 370], [335, 370], [335, 790], [420, 795]],
    feedR: [[40, 270], [390, 270], [390, 370], [505, 370], [505, 770], [420, 795]],
    react: [[420, 795], [420, 400], [450, 378], [450, 180], [1060, 180], ...COIL],
    liquid: [[1060, 700], [1060, 800]],
    recycle: [[1060, 700], [870, 700], [870, 214], [680, 214], [680, 790], [420, 795]],
    water: [[1300, 600], [1178, 600], [1178, 380], [1300, 380]],
  };
  const CAT = 540;
  const lens = {}, cum = {};
  for (const [k, p] of Object.entries(PATHS)) { let s = 0; cum[k] = [0]; for (let i = 1; i < p.length; i++) { s += Math.hypot(p[i][0] - p[i - 1][0], p[i][1] - p[i - 1][1]); cum[k].push(s); } lens[k] = s; }
  const at = (k, s) => { const p = PATHS[k], c = cum[k]; let i = 1; while (i < c.length - 1 && c[i] < s) i++; const f = (s - c[i - 1]) / (c[i] - c[i - 1] || 1); return [p[i - 1][0] + f * (p[i][0] - p[i - 1][0]), p[i - 1][1] + f * (p[i][1] - p[i - 1][1])]; };
  const sCat = 795 - CAT;
  const STREAMS = Object.keys(PATHS).map((k) => ({ k, n: Math.max(2, Math.floor(lens[k] / SPACE)), laps: Math.max(1, Math.round((SPEED * LOOP) / lens[k])) }));
  const NAMES = { N2: 'nitrogen, N₂', H2: 'hydrogen, H₂', NH3: 'ammonia, NH₃', H2O: 'cooling water, H₂O' };
  function glyph(ctx, kind, x, y) {
    const N = F.el('N'), Hh = F.el('H'), O = F.el('O');
    if (kind === 'N2') { disc(ctx, x - 6, y, 7, N); disc(ctx, x + 6, y, 7, N); }
    else if (kind === 'H2') { disc(ctx, x - 4.5, y, 5, Hh); disc(ctx, x + 4.5, y, 5, Hh); }
    else if (kind === 'NH3') { disc(ctx, x - 7, y + 5, 4.5, Hh); disc(ctx, x + 7, y + 5, 4.5, Hh); disc(ctx, x, y - 8, 4.5, Hh); disc(ctx, x, y + 1, 7.5, N); }
    else { disc(ctx, x - 6, y + 4, 4, Hh); disc(ctx, x + 6, y + 4, 4, Hh); disc(ctx, x, y, 6.5, O); }
  }
  function pipe(ctx, pts, w = 26) {
    for (const [col, ww] of [[PAL.muted, w], [PAL.panel, w - 5]]) {
      ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = ww; ctx.lineJoin = 'round'; ctx.lineCap = 'butt'; ctx.beginPath();
      pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.stroke(); ctx.restore();
    }
  }
  function vessel(ctx, x, y, w, h, r, fill) {
    ctx.save(); ctx.beginPath(); ctx.roundRect(x, y, w, h, r); ctx.fillStyle = fill; ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = PAL.muted; ctx.stroke(); ctx.restore();
  }
  function compressor(ctx, x, y, a) {
    ctx.save(); ctx.beginPath(); ctx.arc(x, y, 28, 0, TAU); ctx.fillStyle = PAL.panel; ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = PAL.muted; ctx.stroke();
    ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3;
    for (let i = 0; i < 3; i++) { const b = a + (i * TAU) / 3; ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + 14 * Math.cos(b + 0.6), y + 14 * Math.sin(b + 0.6), x + 22 * Math.cos(b), y + 22 * Math.sin(b)); ctx.stroke(); }
    ctx.restore();
  }
  let hits = [];
  F.hover(d.stage, () => hits);
  const PARTS = [
    { x: 250, y: 270, r: 30, name: 'compressor for the feed gases' }, { x: 600, y: 790, r: 30, name: 'compressor for the recycled gases' },
    { x: 420, y: 450, r: 45, name: 'heat exchanger inside the catalyst chamber' }, { x: 420, y: 580, r: 40, name: 'catalyst' },
    { x: 420, y: 705, r: 50, name: 'heater' }, { x: 320, y: 560, r: 25, name: 'catalyst chamber, 400 to 500 °C' }, { x: 520, y: 560, r: 25, name: 'catalyst chamber, 400 to 500 °C' },
    { x: 770, y: 195, r: 60, name: 'heat exchanger: the hot mixture warms the recycled gases' }, { x: 1060, y: 700, r: 35, name: 'refrigeration' }, { x: 1090, y: 820, r: 60, name: 'liquid ammonia, NH₃(l), in storage' },
    { x: 1280, y: 600, r: 22, name: 'cold water in' }, { x: 1280, y: 380, r: 22, name: 'hot water out' },
  ];
  function draw() {
    const { ctx } = begin(d.c), t = cy.now(), a = (t / LOOP) * TAU * 6;
    pipe(ctx, [[40, 270], [390, 270], [390, 344]]);
    pipe(ctx, [[450, 344], [450, 180], [1060, 180], [1060, 344]]);
    pipe(ctx, [[1060, 700], [870, 700], [870, 214]]);
    pipe(ctx, [[680, 214], [680, 790], [540, 790]]);
    pipe(ctx, [[1300, 600], [1198, 600]], 22); pipe(ctx, [[1300, 380], [1198, 380]], 22);
    vessel(ctx, 640, 150, 260, 90, 30, PAL.soft);
    [180, 214].forEach((y) => line(ctx, 660, y, 880, y, alpha(PAL.ink, 0.3), 14));
    vessel(ctx, 300, 340, 240, 480, 70, PAL.soft);
    vessel(ctx, 372, 395, 96, 380, 14, PAL.panel);
    for (let x = 384; x <= 456; x += 12) line(ctx, x, 408, x, 492, alpha(PAL.ink, 0.35), 3);
    [548, 582, 616].forEach((y) => vessel(ctx, 378, y - 9, 84, 18, 8, alpha(PAL.ink, 0.22)));
    ctx.save(); ctx.strokeStyle = alpha(PAL.ink, 0.45); ctx.lineWidth = 5; ctx.beginPath();
    for (let i = 0; i <= 8; i++) { const y = 650 + i * 14, x = i % 2 ? 452 : 388; if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y); } ctx.stroke(); ctx.restore();
    vessel(ctx, 990, 340, 210, 300, 50, alpha(PAL.ink, 0.07));
    ctx.save(); ctx.strokeStyle = alpha(PAL.ink, 0.25); ctx.lineWidth = 18; ctx.lineJoin = 'round'; ctx.beginPath(); COIL.slice(0, -1).forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.stroke(); ctx.restore();
    vessel(ctx, 960, 760, 260, 90, 18, PAL.soft);
    ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.14); ctx.fillRect(966, 802, 248, 42); ctx.restore();
    pipe(ctx, [[1060, 640], [1060, 760]], 30);
    vessel(ctx, 1030, 668, 60, 64, 10, PAL.soft);
    for (let y = 676; y <= 724; y += 12) line(ctx, 1036, y, 1084, y + 6, alpha(PAL.ink, 0.35), 3);
    compressor(ctx, 250, 270, a); compressor(ctx, 600, 790, -a);

    const seen = [];
    for (const { k, n, laps } of STREAMS) {
      const Lk = lens[k];
      for (let i = 0; i < n; i++) {
        const s = ((((i / n) + (laps * t) / LOOP) % 1) + 1) % 1 * Lk;
        const edge = Math.min(1, s / 20, (Lk - s) / 20);
        if (edge <= 0) continue;
        const [x, y] = at(k, s);
        let kind = k === 'liquid' ? 'NH3' : k === 'water' ? 'H2O' : i % 4 === 0 ? 'N2' : 'H2', alt = null, mix = 0;
        if (k === 'react' && s > sCat && i % 8 < 4) { mix = Math.min(1, (s - sCat) / 30); alt = i % 8 < 2 ? 'NH3' : null; }
        F.faded(ctx, edge * (1 - mix), [0, 0], () => glyph(ctx, kind, x, y));
        if (mix > 0 && alt) F.faded(ctx, edge * mix, [0, 0], () => glyph(ctx, alt, x, y));
        if (edge > 0.5) seen.push({ x, y, r: 12, name: NAMES[mix > 0.5 ? alt ?? kind : kind] });
      }
    }
    hits = [...seen.filter((h) => h.name), ...PARTS];

    const lab = (s, x, y, align = 'left') => text(ctx, s, x, y, PAL.ink, { size: 19, align, bg: PAL.panel });
    lab('N_{2}, H_{2} feed gases', 40, 236);
    lab('catalyst chamber,', 286, 440, 'right'); lab('400 to 500 °C', 286, 464, 'right');
    line(ctx, 292, 452, 304, 452, alpha(PAL.ink, 0.5), 1.5);
    lab('catalyst', 250, 582, 'right');
    line(ctx, 258, 582, 376, 582, alpha(PAL.ink, 0.5), 1.5);
    lab('condenser', 1214, 490);
    lab('NH_{3}(l) storage', 1232, 812);
    lab('recycled N_{2}, H_{2}', 775, 460, 'center');
    F.legend(ctx, { l: 1000, r: 1380, t: 110, b: 146 }, [['N2', 'N_{2}'], ['H2', 'H_{2}'], ['NH3', 'NH_{3}']].map(([k, s]) => ({ s, draw: (c, x, y) => glyph(c, k, x, y) })), { corner: 'top', row: true, panel: false });
    topline(ctx, 'NH_{3} forms over the catalyst and is condensed out of the stream, while the unreacted N_{2} and H_{2} go round again.');
  }
  F.tex(d.readout, '\\text{N}_{2}(g) + 3\\text{H}_{2}(g) \\rightleftharpoons 2\\text{NH}_{3}(g) \\\\ \\kdH = -92.2\\ \\text{kJ}');
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();
};
