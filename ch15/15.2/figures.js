/* Figures for section 15.2 Lewis Acids and Bases. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['15.2'] = function (root, F) {
const { C, PAL, alpha, ctl, register, begin, line, text, topline } = F;
const sim = (id, H) => F.sim(root, id, H);
const still = (d, draw) => register(d.fig, { update: () => {}, draw });
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;
const RAD = Math.PI / 180;

/* =====================================================================
   SIM: the lone pair a Lewis base donates, followed into the bond it
   becomes, across the section's five combination reactions. Every
   electron pair is one object with a place before (a lone pair on an
   atom, or a line of a bond) and a place after, so no electron appears
   or vanishes: the donated pair leaves the base's atom and becomes the
   new bond, and in SO3 one pair of the S=O double bond moves onto its
   oxygen as the book's two drawings require. The structures are the
   book's images (lone pairs on the sides the images show), turned only
   so that the donated pair faces the acid. Two states, so a choice; the
   change of state is the morph, and there is no clock.
===================================================================== */
(function () {
  const H = 616, SX = 700, SY = 300, B = 130;
  const U = -90, R = 0, D = 90, L = 180;
  const NAMES = { H: 'hydrogen', O: 'oxygen', N: 'nitrogen', F: 'fluorine', B: 'boron', Ag: 'silver', S: 'sulfur' };
  const at = (s, a, b) => ({ s, a, b: b || a });
  const lone = (i, angs) => angs.map((g) => ({ a: ['lp', i, g], b: ['lp', i, g] }));
  const bond = (i, j) => ({ a: ['bond', i, j, 0], b: ['bond', i, j, 0] });
  const give = (i, g, j) => ({ a: ['lp', i, g], b: ['bond', i, j, 0], role: 'give' });
  /* atoms in bond lengths, before and after; pairs: every valence pair drawn; marks: the charges of the separate ions;
     groups: what the book's labels stand under; from, link: the donor as the headline names it and the new bond */
  const RX = [
    { value: 'h2o', label: 'H₂O + H⁺', eq: '\\text{H}_2\\text{O} + \\text{H}^{+} \\longrightarrow \\text{H}_3\\text{O}^{+}',
      atoms: [at('O', [0, 0]), at('H', [-1, 0]), at('H', [0, 1]), at('H', [2.3, 0], [1, 0])],
      pairs: [bond(0, 1), bond(0, 2), ...lone(0, [U]), give(0, R, 3)],
      marks: [[3, '+']], charge: '+', groups: [['Lewis base', [0, 1, 2]], ['Lewis acid', [3]]],
      before: 'H₂O donates a lone pair of its oxygen atom to H⁺.', link: 'the new O–H bond', from: 'oxygen', note: '' },
    { value: 'nh3', label: 'NH₃ + H⁺', eq: '\\text{NH}_3 + \\text{H}^{+} \\longrightarrow \\text{NH}_4{}^{+}',
      atoms: [at('N', [0, 0]), at('H', [-1, 0]), at('H', [0, -1]), at('H', [0, 1]), at('H', [2.3, 0], [1, 0])],
      pairs: [bond(0, 1), bond(0, 2), bond(0, 3), give(0, R, 4)],
      marks: [[4, '+']], charge: '+', groups: [['Lewis base', [0, 1, 2, 3]], ['Lewis acid', [4]]],
      before: 'NH₃ donates the lone pair of its nitrogen atom to H⁺.', link: 'the new N–H bond', from: 'nitrogen', note: '' },
    { value: 'bf3', label: 'F⁻ + BF₃', eq: '\\text{F}^{-} + \\text{BF}_3 \\longrightarrow \\text{BF}_4{}^{-}',
      atoms: [at('B', [0, 0]), at('F', [0, -1]), at('F', [1, 0]), at('F', [0, 1]), at('F', [-2.45, 0], [-1, 0])],
      pairs: [bond(0, 1), bond(0, 2), bond(0, 3), ...lone(1, [L, U, R]), ...lone(2, [U, R, D]), ...lone(3, [L, D, R]), ...lone(4, [U, L, D]), give(4, R, 0)],
      marks: [[4, '−']], charge: '−', groups: [['Lewis base', [4]], ['Lewis acid', [0, 1, 2, 3]]],
      before: 'F⁻ donates one of its four lone pairs to the boron atom of BF₃.', link: 'the new F–B bond', from: 'the fluoride ion',
      note: 'Boron has 6 electrons in its valence shell before the reaction and 8 after.' },
    { value: 'ag', label: '2NH₃ + Ag⁺', eq: '2\\,\\text{NH}_3 + \\text{Ag}^{+} \\longrightarrow \\text{Ag}(\\text{NH}_3)_2{}^{+}',
      atoms: [at('Ag', [0, 0]),
        at('N', [-2.6, 0], [-1.15, 0]), at('H', [-3.6, 0], [-2.15, 0]), at('H', [-2.6, -1], [-1.15, -1]), at('H', [-2.6, 1], [-1.15, 1]),
        at('N', [2.6, 0], [1.15, 0]), at('H', [3.6, 0], [2.15, 0]), at('H', [2.6, -1], [1.15, -1]), at('H', [2.6, 1], [1.15, 1])],
      pairs: [bond(1, 2), bond(1, 3), bond(1, 4), bond(5, 6), bond(5, 7), bond(5, 8), give(1, R, 0), give(5, L, 0)],
      marks: [[0, '+']], charge: '+', groups: [['Lewis base', [1, 2, 3, 4]], ['Lewis acid', [0]], ['Lewis base', [5, 6, 7, 8]]],
      before: 'Each NH₃ donates the lone pair of its nitrogen atom to Ag⁺.', link: 'each new N–Ag bond', from: 'nitrogen', each: true, note: '' },
    { value: 'so3', label: 'O²⁻ + SO₃', eq: '\\text{O}^{2-} + \\text{SO}_3 \\longrightarrow \\text{SO}_4{}^{2-}',
      atoms: [at('S', [0, 0]), at('O', [0, -1]), at('O', [1, 0]), at('O', [0, 1]), at('O', [-2.45, 0], [-1, 0])],
      pairs: [bond(0, 1), bond(0, 3), { a: ['bond', 0, 2, -6], b: ['bond', 0, 2, 0] }, { a: ['bond', 0, 2, 6], b: ['lp', 2, D], role: 'shift' },
        ...lone(1, [L, U, R]), ...lone(2, [U, R]), ...lone(3, [L, D, R]), ...lone(4, [U, L, D]), give(4, R, 0)],
      marks: [[4, '2−']], charge: '2−', groups: [['Lewis base', [4]], ['Lewis acid', [0, 1, 2, 3]]],
      before: 'O²⁻ donates one of its four lone pairs to the sulfur atom of SO₃.', link: 'the new O–S bond', from: 'the oxide ion',
      note: 'As the new bond forms, one pair of the S=O double bond moves onto its oxygen atom, so sulfur keeps 8 electrons.' },
  ];
  const gapOf = (s) => (s.length > 1 ? 42 : 28), ringOf = (s) => (s.length > 1 ? 48 : 38);
  /* each state centred on the stage; the labels' line is the same in both, under the lowest atom of either */
  RX.forEach((r) => {
    ['a', 'b'].forEach((q) => {
      const xs = r.atoms.map((t) => t[q][0]), ys = r.atoms.map((t) => t[q][1]);
      const ox = (Math.min(...xs) + Math.max(...xs)) / 2, oy = (Math.min(...ys) + Math.max(...ys)) / 2;
      r['P' + q] = r.atoms.map((t) => [SX + (t[q][0] - ox) * B, SY + (t[q][1] - oy) * B]);
    });
    r.base = Math.max(...r.Pa.map((p) => p[1]), ...r.Pb.map((p) => p[1])) + 104;
  });

  const d = sim('sim-lewis-pair', H);
  const pickR = F.select(d.controls, { label: '\\text{reaction}', options: RX.map((r) => ({ value: r.value, label: r.label })), value: 'h2o', aria: 'the Lewis acid-base reaction' });
  const pickS = F.choice(d.controls, { label: '\\text{lone pair}', options: [{ value: 'a', label: 'on the base' }, { value: 'b', label: 'donated' }], value: 'a', ms: 1100, aria: 'where the donated lone pair is' });
  const ro = F.readout(d);
  let hits = []; F.hover(d.stage, () => hits);

  const mix = (p, q, k) => [p[0] + (q[0] - p[0]) * k, p[1] + (q[1] - p[1]) * k];
  function dots(ctx, x, y, ux, uy, color, a) {      /* the two dots of a pair, 9 either side of (x, y) along (ux, uy) */
    if (a <= 0) return;
    ctx.save(); ctx.globalAlpha *= a; F.dot(ctx, x - ux * 8.5, y - uy * 8.5, color, true, 5.5); F.dot(ctx, x + ux * 8.5, y + uy * 8.5, color, true, 5.5); ctx.restore();
  }
  /* where a form puts its pair: the centre of the two dots and the way they lie, or the ends of the bond's line */
  function seat(r, P, f) {
    if (f[0] === 'lp') { const [x, y] = P[f[1]], g = f[2] * RAD, rr = ringOf(r.atoms[f[1]].s); return { x: x + Math.cos(g) * rr, y: y + Math.sin(g) * rr, ux: -Math.sin(g), uy: Math.cos(g) }; }
    const p = P[f[1]], q = P[f[2]], dx = q[0] - p[0], dy = q[1] - p[1], len = Math.hypot(dx, dy), ux = dx / len, uy = dy / len, off = f[3];
    const g1 = Math.min(gapOf(r.atoms[f[1]].s), len / 2 - 6), g2 = Math.min(gapOf(r.atoms[f[2]].s), len / 2 - 6);
    return { x: (p[0] + q[0]) / 2 - uy * off, y: (p[1] + q[1]) / 2 + ux * off, ux, uy, x1: p[0] + ux * g1 - uy * off, y1: p[1] + uy * g1 + ux * off, x2: q[0] - ux * g2 - uy * off, y2: q[1] - uy * g2 + ux * off };
  }
  const colourOf = (pr) => (pr.role === 'give' ? F.cat(0) : pr.role === 'shift' ? F.cat(2) : PAL.ink);
  function structure(ctx, r, k, live) {
    const P = r.Pa.map((p, i) => mix(p, r.Pb[i], k));
    r.pairs.forEach((pr) => {
      const col = colourOf(pr), A = seat(r, P, pr.a), Z = seat(r, P, pr.b), la = pr.a[0] === 'lp', lb = pr.b[0] === 'lp';
      if (la && lb) dots(ctx, Z.x, Z.y, Z.ux, Z.uy, col, 1);
      else if (!la && !lb) {
        const o = pr.a[3] + (pr.b[3] - pr.a[3]) * k, S = seat(r, P, ['bond', pr.a[1], pr.a[2], o]);
        line(ctx, S.x1, S.y1, S.x2, S.y2, col, 4);
      } else {
        const t = la ? k : 1 - k, pair = la ? A : Z, bd = la ? Z : A;      /* t = 0: a lone pair; t = 1: a bond */
        dots(ctx, pair.x + (bd.x - pair.x) * t, pair.y + (bd.y - pair.y) * t, pair.ux + (bd.ux - pair.ux) * t, pair.uy + (bd.uy - pair.uy) * t, col, 1 - t * t);
        if (t > 0) { ctx.save(); ctx.globalAlpha *= t * t; line(ctx, bd.x1, bd.y1, bd.x2, bd.y2, col, pr.role ? 5 : 4); ctx.restore(); }
      }
      if (!live) return;
      const now = k < 0.5 ? pr.a : pr.b, S = k < 0.5 ? A : Z, own = r.atoms[now[1]].s;
      if (now[0] === 'lp') hits.push({ x: S.x, y: S.y, r: 16, name: pr.role === 'give' ? `the lone pair ${NAMES[own]} donates` : pr.role === 'shift' ? `lone pair on ${NAMES[own]}, once in the double bond` : `lone pair on ${NAMES[own]}` });
      else if (pr.role === 'give') hits.push({ x: S.x, y: S.y, r: 24, name: `coordinate covalent bond: both electrons from ${NAMES[r.atoms[pr.a[1]].s]}` });
      else if (pr.role === 'shift') hits.push({ x: S.x, y: S.y + 8, r: 14, name: 'the pair of the double bond that moves onto oxygen' });
    });
    /* the donation written as the field writes it, an arrow from the pair to the atom that accepts it; notation, gone once the bond is drawn */
    const fade = Math.max(0, 1 - 2.5 * k);
    if (fade > 0) {
      ctx.save(); ctx.globalAlpha *= fade;
      r.pairs.filter((pr) => pr.role === 'give').forEach((pr) => {
        const S = seat(r, P, pr.a), to = P[pr.b[2]], sgn = Math.sign(to[0] - S.x), acc = r.atoms[pr.b[2]].s;
        F.arrow(ctx, S.x + sgn * 20, S.y, to[0] - sgn * (acc.length > 1 ? 50 : 34), S.y, PAL.ink, 3.5);
      });
      r.pairs.filter((pr) => pr.role === 'shift').forEach((pr) => {      /* from the double bond round to the side of oxygen the pair lands on */
        const S = seat(r, P, pr.a), T = seat(r, P, pr.b);
        ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3.5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(S.x, S.y + 10); ctx.quadraticCurveTo(S.x + 6, T.y + 16, T.x - 34, T.y + 10); ctx.stroke();
        F.arrow(ctx, T.x - 36, T.y + 10.5, T.x - 22, T.y + 8, PAL.ink, 3.5);
      });
      ctx.restore();
    }
    r.atoms.forEach((t, i) => text(ctx, t.s, P[i][0], P[i][1] + 1, PAL.ink, { size: 48, weight: 600, align: 'center' }));
    /* charges: on the separate ions before, on the bracketed adduct after */
    if (k < 1) { ctx.save(); ctx.globalAlpha *= 1 - k; r.marks.forEach(([i, s]) => { const lp = r.pairs.some((pr) => pr.a[0] === 'lp' && pr.a[1] === i && !pr.role); text(ctx, s, P[i][0] + (lp ? 52 : r.atoms[i].s.length > 1 ? 40 : 22), P[i][1] - (lp ? 46 : 26), PAL.ink, { size: 32, weight: 600 }); }); ctx.restore(); }
    const xs = r.Pb.map((p) => p[0]), ys = r.Pb.map((p) => p[1]), bl = Math.min(...xs) - 80, br = Math.max(...xs) + 80, bt = Math.min(...ys) - 76, bb = Math.max(...ys) + 76;
    if (k > 0) {
      ctx.save(); ctx.globalAlpha *= k * k; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3.5; ctx.lineJoin = 'miter'; ctx.beginPath();
      ctx.moveTo(bl + 18, bt); ctx.lineTo(bl, bt); ctx.lineTo(bl, bb); ctx.lineTo(bl + 18, bb); ctx.moveTo(br - 18, bt); ctx.lineTo(br, bt); ctx.lineTo(br, bb); ctx.lineTo(br - 18, bb); ctx.stroke();
      text(ctx, r.charge, br + 10, bt + 4, PAL.ink, { size: 34, weight: 600 }); ctx.restore();
    }
    /* the book's labels under the species */
    const ly = Math.max(r.base, bb + 34);
    if (k < 1) { ctx.save(); ctx.globalAlpha *= (1 - k) * (1 - k); r.groups.forEach(([s, ix]) => { const gx = ix.map((i) => P[i][0]); text(ctx, s, (Math.min(...gx) + Math.max(...gx)) / 2, ly, PAL.ink, { size: 26, align: 'center' }); }); ctx.restore(); }
    if (k > 0) { ctx.save(); ctx.globalAlpha *= k * k; text(ctx, 'acid-base adduct', SX, ly, PAL.ink, { size: 26, align: 'center' }); ctx.restore(); }
    if (live) r.atoms.forEach((t, i) => hits.push({ x: P[i][0], y: P[i][1], r: 26, name: `${NAMES[t.s]} atom` }));
    return ly;
  }
  function draw() {
    const { ctx } = begin(d.c); hits = [];
    const r = RX.find((x) => x.value === pickR.value), ks = pickS.value === 'b' ? pickS.k : 1 - pickS.k, kr = pickR.k;
    const old = kr < 1 && RX.find((x) => x.value === pickR.from);
    if (old && old !== r) F.faded(ctx, 1 - kr, [0, 0], () => structure(ctx, old, ks, false));
    let ly = 0;
    F.faded(ctx, old && old !== r ? kr : 1, [0, 0], () => { ly = structure(ctx, r, ks, true); });
    const after = pickS.value === 'b', c0 = F.cat(0), c1 = F.cat(2);
    const pairKey = (c) => (cx, x, y) => dots(cx, x, y, 1, 0, c, 1), bondKey = (c) => (cx, x, y) => line(cx, x - 18, y, x + 18, y, c, 5);
    const key = after ? [{ s: 'coordinate covalent bond', draw: bondKey(c0) }] : [{ s: 'lone pair the base donates', draw: pairKey(c0) }];
    if (r.value === 'so3') key.push(after ? { s: 'lone pair that was in the double bond', draw: pairKey(c1) } : { s: 'pair of the double bond that moves onto oxygen', draw: bondKey(c1) });
    F.legend(ctx, { l: 100, r: 1300, t: 0, b: H - 6 }, key, { corner: 'bottom', row: true, panel: false, size: 22 });
    topline(ctx, after ? `Both electrons of ${r.link} came from ${r.from}, so ${r.each ? 'each' : 'it'} is a coordinate covalent bond.` : r.before);
    ro.set(r.eq, r.note, { form: r.value });
  }
  still(d, draw);
})();

/* =====================================================================
   SIM: silver chloride dissolving as ammonia is added. Ksp = 1.6e-10
   (Appendix J), Kf = 1.7e7 (the text). With N mol/L of ammonia added
   and n mol of solid in 1.00 L: while solid remains, s = [Cl-] is the
   amount dissolved, a = [Ag+] = Ksp/s, the complex c = s - a, the free
   ammonia f = N - 2c = sqrt(c/(Kf a)), so N(s) = 2c + sqrt(c/(Kf a)),
   rising from N = 0 at s = sqrt(Ksp); s is found from N by bisection.
   The last solid dissolves at N* = N(n), the slider's circle; past it
   s = n and a solves n - a = Kf a (N - 2(n - a))^2.
   The graph is the plane of 15.1, [Ag+] against [Cl-], both logarithmic,
   on which Ksp is a straight line: the solution moves down the line as
   the solid dissolves and leaves it, straight down, once none is left.
   Axes fixed: [Cl-] from 1e-6 to 1e-1 M (the slider maximum is 0.040 M),
   [Ag+] from 1e-10 to 1e-4 M (the least is 3.0e-10 M, with 0.005 mol of
   solid in 1.00 M ammonia). Still: each equilibrium answers its sliders.
===================================================================== */
(function () {
  const H = 600, d = sim('sim-agcl-ammonia', H);
  const KSP = 1.6e-10, KF = 1.7e7, S0 = Math.sqrt(KSP), NMAX = 0.04;
  const Nof = (s) => { const a = KSP / s, c = Math.max(0, s - a); return 2 * c + Math.sqrt(c / (KF * a)); };
  const bisect = (g, lo, hi) => { for (let i = 0; i < 60; i++) { const m = (lo + hi) / 2; if (g(m) > 0) hi = m; else lo = m; } return (lo + hi) / 2; };
  const satS = (N) => (N <= 0 ? S0 : 10 ** bisect((ls) => Nof(10 ** ls) - N, Math.log10(S0), 0.5));
  function state(N, n) {
    if (N <= Nof(n)) { const s = satS(N); return { s, a: KSP / s, sat: true }; }
    const a = 10 ** bisect((la) => { const x = 10 ** la, c = n - x; return KF * x * (N - 2 * c) ** 2 - c; }, -40, Math.log10(n));
    return { s: n, a, sat: false };
  }
  const nS = ctl(d.controls, { label: '\\text{AgCl}(s)', cls: 'amount', key: 'n', min: 0.005, max: NMAX, step: 0.001, value: 0.02, unit: 'mol', dec: 3,
    aria: 'the amount of solid silver chloride put in the water, in moles', onInput: () => draw() });
  const nh3 = ctl(d.controls, { label: '\\text{NH}_{3}\\text{ added}', cls: 'concentration', key: 'N', min: 0, max: 1, step: 0.005, value: 0.1, unit: 'M', dec: 3,
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
  const conc = (v) => (v >= 0.01 ? `${v.toPrecision(2)} M` : `${sciTxt(v)} M`);      /* a concentration as the list writes it */

  const BK = { l: 70, r: 350, t: 128, b: 500 }, LV = BK.t + 64;
  const LX = 392;
  const G = { l: 760, r: 1330, t: 150, b: 492 };
  /* a beaker standing on its base: straight walls, a rounded foot, a flared rim with a spout at the left */
  function beakerPath(ctx) {
    ctx.beginPath();
    ctx.moveTo(BK.l - 18, BK.t - 8); ctx.quadraticCurveTo(BK.l - 2, BK.t - 2, BK.l, BK.t + 16);
    ctx.lineTo(BK.l, BK.b - 16); ctx.quadraticCurveTo(BK.l, BK.b, BK.l + 16, BK.b);
    ctx.lineTo(BK.r - 16, BK.b); ctx.quadraticCurveTo(BK.r, BK.b, BK.r, BK.b - 16);
    ctx.lineTo(BK.r, BK.t + 8); ctx.quadraticCurveTo(BK.r, BK.t, BK.r + 6, BK.t - 2);
  }
  /* the solid heaped on the bottom, its area the amount still undissolved; the whole floor at the slider's 0.040 mol */
  function heap(ctx, rest) {
    const k = Math.sqrt(rest / NMAX), w = (BK.r - BK.l - 26) * k, h = 118 * k, cx = (BK.l + BK.r) / 2, y0 = BK.b - 3;
    ctx.save(); ctx.beginPath(); ctx.moveTo(cx - w / 2, y0);
    ctx.bezierCurveTo(cx - w * 0.3, y0 - h * 0.15, cx - w * 0.24, y0 - h, cx - w * 0.02, y0 - h);
    ctx.bezierCurveTo(cx + w * 0.2, y0 - h, cx + w * 0.3, y0 - h * 0.2, cx + w / 2, y0); ctx.closePath();
    ctx.fillStyle = F.fact('#f4f4f2'); ctx.fill(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2; ctx.lineJoin = 'round'; ctx.stroke(); ctx.restore();
    hits.push({ x: cx, y: y0 - h / 2, r: Math.max(18, w / 2), name: 'solid silver chloride, white' });
  }
  function beaker(ctx, rest, n) {
    ctx.save(); beakerPath(ctx); ctx.closePath(); ctx.clip(); ctx.fillStyle = alpha(PAL.muted, 0.16); ctx.fillRect(BK.l, LV, BK.r - BK.l, BK.b - LV); ctx.restore();
    line(ctx, BK.l + 2, LV, BK.r - 2, LV, alpha(PAL.ink, 0.45), 1.5);
    hits.push({ x: (BK.l + BK.r) / 2, y: LV + 90, r: 80, name: 'the solution, 1.00 L' });
    if (rest > 1e-6) heap(ctx, rest);
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; beakerPath(ctx); ctx.stroke(); ctx.restore();
    const cx = (BK.l + BK.r) / 2, ac = C('amount');
    F.rich(ctx, rest > 1e-6 ? ['AgCl(s) left: ', [`${rest.toFixed(4)} mol`, ac], ` of ${n.toFixed(3)}`] : ['AgCl(s) left: ', ['none', ac], ` of ${n.toFixed(3)} mol`], cx, BK.b + 34, { size: 22, align: 'center' });
  }
  /* what the litre of solution holds, the greatest first as the reader meets them */
  function contents(ctx, st, N) {
    const cc = C('concentration'), c = Math.max(0, st.s - st.a), f = Math.max(0, N - 2 * c);
    text(ctx, 'in the solution', LX, LV + 6, PAL.muted, { size: 21 });
    line(ctx, LX, LV + 24, LX + 290, LV + 24, PAL.rule, 1.5);
    const rows = [['NH₃, free', f], ['Cl⁻', st.s], ['Ag(NH₃)₂⁺', c], ['Ag⁺, free', st.a]];
    rows.forEach(([name, v], i) => {
      const y = LV + 62 + i * 52;
      text(ctx, name, LX, y, PAL.ink, { size: 24, weight: 600 });
      text(ctx, v > 0 ? conc(v) : '0 M', LX + 290, y, cc, { size: 24, weight: 600, align: 'right' });
    });
  }
  function draw() {
    const { ctx } = begin(d.c); hits = [];
    const N = nh3.v, n = nS.v, st = state(N, n), Nstar = Nof(n);
    const onCircle = Math.abs(N - Nstar) < 1e-9, done = !st.sat || onCircle;
    const cc = C('concentration'), ke = C('equilibrium-constant');
    beaker(ctx, done ? 0 : n - st.s, n); contents(ctx, st, N);
    const ft = (v) => (Math.round(v) % 2 ? '' : '10' + sup(Math.round(v)));
    const g = F.axes(ctx, G, [-6, -1], [-10, -4], { nx: 5, ny: 6, fx: (v) => '10' + sup(Math.round(v)), fy: ft, xl: '[Cl⁻] (M)', xc: cc, yl: '[Ag⁺] (M)', yc: cc });
    /* the Ksp line, and the two sides of it */
    const X = (v) => g.X(Math.log10(v)), Y = (v) => g.Y(Math.log10(v));
    line(ctx, X(KSP / 1e-4), Y(1e-4), X(1e-1), Y(KSP / 1e-1), ke, 3);
    text(ctx, 'Q > K_{sp}: AgCl precipitates', G.r - 14, G.t + 26, PAL.muted, { size: 20, align: 'right' });
    text(ctx, 'Q < K_{sp}: more AgCl can dissolve', G.l + 16, G.b - 24, PAL.muted, { size: 20 });
    text(ctx, 'Q = K_{sp}', G.r - 14, G.b - 24, ke, { size: 22, weight: 600, align: 'right' });
    /* the path of the solution as ammonia goes in: down the line while solid is left, then straight down; the part still ahead is dashed */
    const corner = Math.min(n, satS(1)), endA = state(1, n).a, sNow = st.s, aNow = st.a, ink = PAL.ink, ahead = alpha(PAL.ink, 0.4);
    line(ctx, X(S0), Y(S0), X(sNow), Y(KSP / sNow), ink, 6);
    if (done && !onCircle) line(ctx, X(n), Y(KSP / n), X(n), Y(aNow), ink, 6);
    if (!done) line(ctx, X(sNow), Y(KSP / sNow), X(corner), Y(KSP / corner), ahead, 3, [4, 8]);
    if (Nstar <= 1) {
      line(ctx, X(n), Y(done ? aNow : KSP / n), X(n), Y(endA), ahead, 3, [4, 8]);
      if (!onCircle) F.dot(ctx, X(n), Y(KSP / n), ink, false, 6);
      F.label(ctx, 'last solid dissolves', X(n), Y(KSP / n), { side: 'above', size: 20, gap: 64, leader: true });
      hits.push({ x: X(n), y: Y(KSP / n), r: 12, name: `the last solid dissolves here, at ${Nstar.toFixed(2)} M ammonia` });
    }
    F.dot(ctx, X(S0), Y(S0), ink, false, 9);
    text(ctx, 'in pure water', X(S0) + 12, Y(S0) - 26, PAL.ink, { size: 20, bg: PAL.panel });
    hits.push({ x: X(S0), y: Y(S0), r: 14, name: `pure water: [Ag⁺] = [Cl⁻] = ${sciTxt(S0)} M` });
    F.dot(ctx, X(sNow), Y(aNow), ink, true, 10);
    hits.push({ x: X(sNow), y: Y(aNow), r: 16, name: `the solution: [Cl⁻] = ${sciTxt(sNow, 3)} M, [Ag⁺] = ${sciTxt(aNow, 3)} M` });
    const NTxt = N.toFixed(N < 0.1 ? 3 : 2);
    if (N > 0) text(ctx, `in ${NTxt} M NH₃`, X(sNow) - 16, Y(aNow) + (done && !onCircle ? 14 : 28), PAL.ink, { size: 20, align: 'right', bg: PAL.panel });
    topline(ctx, N <= 0 ? `In pure water, only ${sciTxt(st.s)} mol of the silver chloride dissolves.`
      : done ? `All ${n.toFixed(3)} mol of the silver chloride has dissolved in ${NTxt} M ammonia.`
        : `In ${NTxt} M ammonia, ${sciTxt(st.s)} mol of AgCl dissolves, ${big(st.s / S0)} times as much as in pure water.`);
    /* both equilibria hold at once: the numbers are the list's, to three figures, so each product rounds to its constant */
    const aR = round(st.a, 3), sR = round(st.s, 3), cR = round(Math.max(st.s - st.a, 1e-300), 3), fR = round(Math.max(N - 2 * (st.s - st.a), 1e-300), 3);
    const cv = (v) => hue('concentration', v >= 0.01 ? v.toPrecision(3) : sciTex(v, 3)), kv = (v) => hue('equilibrium-constant', sciTex(v, 2));
    const prod = `[\\text{Ag}^{+}][\\text{Cl}^{-}] = (\\mk{a}{${cv(aR)}})(\\mk{s}{${cv(sR)}})`;
    const lineSp = done
      ? `\\mk{K}{\\kQrxn} = ${prod} = \\mk{v}{${kv(aR * sR)}} \\mk{rel}{${onCircle ? '=' : '<'}} \\mk{k}{\\kKsp}`
      : `\\mk{K}{\\kKsp} = ${prod} = \\mk{v}{${kv(KSP)}}`;
    const lineF = N > 0 ? ` \\\\ \\kKfform = \\dfrac{[\\text{Ag}(\\text{NH}_3)_2{}^{+}]}{[\\text{Ag}^{+}][\\text{NH}_3]^{2}} = \\dfrac{\\mk{c}{${cv(cR)}}}{(\\mk{a2}{${cv(aR)}})(\\mk{f}{${cv(fR)}})^{2}} = \\mk{kf}{${kv(cR / (aR * fR * fR))}}` : '';
    ro.set(lineSp + lineF, undefined, { form: `${done}${N > 0}` });
  }
  still(d, draw);
})();
};
