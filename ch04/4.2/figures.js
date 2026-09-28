/* Figures for section 4.2 Classifying Chemical Reactions. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['4.2'] = function (root, F) {
const { el, tex, PAL, alpha, cycle, register, begin, line, arrow, text, topline } = F;
const sim = (id, H) => F.sim(root, id, H);
function readout(host, main, small) { tex(host, main); if (small) host.appendChild(el('small', null, small)); }
const TAU = 2 * Math.PI;
/* a reproducible scatter, so the particles stand in the same places on every visit */
function rng(seed) { let a = seed >>> 0; return () => { a = (a + 0x6d2b79f5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
const SUB = { 1: '', 2: '₂', 3: '₃', 4: '₄' };

/* =====================================================================
   SIM: mixing two solutions of soluble ionic compounds. The four ions can
   pair in two new ways, and each new pairing is judged by the guidelines
   of Table 4.1; an insoluble one settles out. Still: the choices redraw
   the bench, and the precipitate settles in the choice's own morph.
===================================================================== */
(function () {
  const d = sim('sim-precipitation', 560);
  /* the ions of the twelve salts: formula as drawn, as written in the readout, charge, and whether it is polyatomic */
  const CAT = {
    K: { u: 'K', t: '\\text{K}', q: 1, g1: true, name: 'potassium' }, Na: { u: 'Na', t: '\\text{Na}', q: 1, g1: true, name: 'sodium' },
    Li: { u: 'Li', t: '\\text{Li}', q: 1, g1: true, name: 'lithium' }, NH4: { u: 'NH₄', t: '\\text{NH}_{4}', q: 1, g1: true, poly: true, name: 'ammonium' },
    Pb: { u: 'Pb', t: '\\text{Pb}', q: 2, name: 'lead(II)' }, Ag: { u: 'Ag', t: '\\text{Ag}', q: 1, name: 'silver' }, Ba: { u: 'Ba', t: '\\text{Ba}', q: 2, name: 'barium' },
  };
  const AN = {
    I: { u: 'I', t: '\\text{I}', q: 1, kind: 'halide' }, Cl: { u: 'Cl', t: '\\text{Cl}', q: 1, kind: 'halide' },
    NO3: { u: 'NO₃', t: '\\text{NO}_{3}', q: 1, poly: true, kind: 'always' }, Ac: { u: 'C₂H₃O₂', t: '\\text{C}_{2}\\text{H}_{3}\\text{O}_{2}', q: 1, poly: true, kind: 'always' },
    SO4: { u: 'SO₄', t: '\\text{SO}_{4}', q: 2, poly: true, kind: 'sulfate' }, CO3: { u: 'CO₃', t: '\\text{CO}_{3}', q: 2, poly: true, kind: 'carbonate' },
  };
  const SALTS = [['KI', 'K', 'I'], ['Pb(NO₃)₂', 'Pb', 'NO3'], ['NaCl', 'Na', 'Cl'], ['AgNO₃', 'Ag', 'NO3'], ['K₂SO₄', 'K', 'SO4'], ['Ba(NO₃)₂', 'Ba', 'NO3'],
    ['LiCl', 'Li', 'Cl'], ['AgC₂H₃O₂', 'Ag', 'Ac'], ['(NH₄)₂CO₃', 'NH4', 'CO3'], ['Na₂SO₄', 'Na', 'SO4'], ['BaCl₂', 'Ba', 'Cl'], ['Na₂CO₃', 'Na', 'CO3']];
  /* the colour of each solid as it is seen, a physical fact in both themes: lead iodide bright yellow, silver iodide and silver
     carbonate pale yellow, and every other precipitate these salts can give white */
  const PPT_COLOR = { 'PbI₂': '#f2c300', 'AgI': '#ece29a', 'Ag₂CO₃': '#e8e1ae' };
  const WHITE_SOLID = '#f5f5f0';
  const pick = (label, value, aria) => F.select(d.controls, { label, aria, value: String(value), options: SALTS.map((s, i) => ({ value: String(i), label: s[0] })) });
  const A = pick('\\text{first solution}', 0, 'the first solution');
  const B = pick('\\text{second solution}', 1, 'the second solution');
  let hits = []; F.hover(d.stage, () => hits);
  const chargeU = (q, s) => (q === 1 ? '' : { 2: '²', 3: '³' }[q]) + (s > 0 ? '⁺' : '⁻');
  const chargeT = (q, s) => (q === 1 ? '' : q) + (s > 0 ? '+' : '-');
  const gcd = (a, b) => (b ? gcd(b, a % b) : a);
  /* a cation and an anion as a neutral compound, as drawn and as written */
  function compound(c, a) {
    const g = gcd(c.q, a.q), x = a.q / g, y = c.q / g;
    const part = (ion, n, sub) => (n > 1 ? (ion.poly ? '(' + ion.u + ')' + SUB[n] : ion.u + SUB[n]) : ion.u);
    const partT = (ion, n) => (n > 1 ? (ion.poly ? '(' + ion.t + ')_{' + n + '}' : ion.t + '_{' + n + '}') : ion.t);
    return { u: part(c, x) + part(a, y), t: partT(c, x) + partT(a, y), x, y };
  }
  /* Table 4.1 read for one pairing: whether it is insoluble, and the guideline that decides it */
  function judge(c, a) {
    if (c.g1) return { out: false, why: ['Compounds of group 1 cations and NH₄⁺', 'are soluble.'] };
    if (a.kind === 'always') return { out: false, why: [a.u + '⁻ compounds are soluble,', 'with no exceptions.'] };
    if (a.kind === 'halide') return ['Ag', 'Pb'].includes(c.u) ? { out: true, why: ['Cl⁻, Br⁻ and I⁻ compounds are soluble,', 'except with Ag⁺, Hg₂²⁺ and Pb²⁺.'] } : { out: false, why: ['Cl⁻, Br⁻ and I⁻ compounds are soluble.'] };
    if (a.kind === 'sulfate') return ['Ag', 'Pb', 'Ba'].includes(c.u) ? { out: true, why: ['SO₄²⁻ compounds are soluble, except with', 'Ag⁺, Ba²⁺, Ca²⁺, Hg₂²⁺, Pb²⁺ and Sr²⁺.'] } : { out: false, why: ['SO₄²⁻ compounds are soluble.'] };
    return { out: true, why: ['CO₃²⁻ compounds are insoluble, except with', 'group 1 cations and NH₄⁺.'] };
  }
  const ionU = (ion, s) => ion.u + chargeU(ion.q, s);
  const ionT = (ion, s) => ion.t + '^{' + chargeT(ion.q, s) + '}';
  function beaker(ctx, x, base, w, h, name) {
    const lip = 8, top = base - h, lv = base - h * 0.72;
    ctx.save(); ctx.fillStyle = alpha(PAL.muted, 0.14); ctx.fillRect(x - w / 2, lv, w, base - lv); ctx.restore();
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.lineJoin = 'round'; ctx.beginPath();
    ctx.moveTo(x - w / 2 - lip, top); ctx.lineTo(x - w / 2, top + lip); ctx.lineTo(x - w / 2, base); ctx.lineTo(x + w / 2, base); ctx.lineTo(x + w / 2, top + lip); ctx.lineTo(x + w / 2 + lip, top); ctx.stroke(); ctx.restore();
    line(ctx, x - w / 2, lv, x + w / 2, lv, alpha(PAL.ink, 0.35), 2);
    hits.push({ x, y: (lv + base) / 2, r: w / 2, name });
    return lv;
  }
  function draw() {
    const { ctx } = begin(d.c);
    hits = [];
    const sa = SALTS[+A.value], sb = SALTS[+B.value];
    const ca = CAT[sa[1]], aa = AN[sa[2]], cb = CAT[sb[1]], ab = AN[sb[2]];
    /* the two new pairings, leaving out any that is one of the compounds poured in */
    const pairs = [];
    [[sa[1], sb[2]], [sb[1], sa[2]]].forEach(([c, a]) => {
      if ((c === sa[1] && a === sa[2]) || (c === sb[1] && a === sb[2]) || pairs.some((p) => p.c === c && p.a === a)) return;
      pairs.push({ c, a, f: compound(CAT[c], AN[a]), j: judge(CAT[c], AN[a]) });
    });
    const solids = pairs.filter((p) => p.j.out);
    const k = Math.min(A.k, B.k);
    /* the two solutions */
    [[sa, ca, aa, 180], [sb, cb, ab, 420]].forEach(([s, c, a, x]) => {
      beaker(ctx, x, 400, 150, 190, s[0] + '(aq), a solution of ' + ionU(c, 1) + ' and ' + ionU(a, -1) + ' ions');
      text(ctx, s[0] + '(aq)', x, 440, PAL.ink, { size: 22, weight: 600, align: 'center' });
      text(ctx, ionU(c, 1) + ' + ' + ionU(a, -1), x, 470, PAL.muted, { size: 17, align: 'center' });
    });
    text(ctx, '+', 300, 330, PAL.ink, { size: 30, align: 'center' });
    arrow(ctx, 530, 320, 610, 320, PAL.ink, 4);
    /* the mixture, with whatever settles out of it */
    const mx = 800, base = 470, w = 280;
    const lv = beaker(ctx, mx, base, w, 280, 'the mixture of the two solutions');
    const ions = [ionU(ca, 1), ionU(aa, -1)];
    [ionU(cb, 1), ionU(ab, -1)].forEach((s) => { if (!ions.includes(s)) ions.push(s); });
    text(ctx, ions.join(', '), mx, base + 34, PAL.muted, { size: 17, align: 'center' });
    if (solids.length) {
      const col = PPT_COLOR[solids[0].f.u] || WHITE_SOLID, hgt = 36 * k, r = rng(7);
      ctx.save(); ctx.fillStyle = col; ctx.strokeStyle = alpha(PAL.ink, 0.5); ctx.lineWidth = 1.5; ctx.beginPath();
      ctx.moveTo(mx - w / 2 + 2, base - 2); ctx.lineTo(mx - w / 2 + 2, base - hgt * 0.7);
      ctx.quadraticCurveTo(mx, base - hgt * 1.4, mx + w / 2 - 2, base - hgt * 0.7); ctx.lineTo(mx + w / 2 - 2, base - 2); ctx.closePath(); ctx.fill(); ctx.stroke();
      for (let i = 0; i < 26; i++) { const sx = mx - w / 2 + 14 + r() * (w - 28), sy = lv + 14 + r() * (base - lv - 70); ctx.globalAlpha = k * (0.5 + 0.5 * r()); ctx.beginPath(); ctx.arc(sx, sy + (1 - k) * -20, 3.2, 0, TAU); ctx.fill(); ctx.stroke(); }
      ctx.restore();
      hits.unshift({ x: mx, y: base - 18, r: 40, name: 'a precipitate of ' + solids.map((p) => p.f.u).join(' and ') + '(s)' });
      text(ctx, 'precipitate: ' + solids.map((p) => p.f.u + '(s)').join(', '), mx, base + 62, PAL.ink, { size: 22, weight: 600, align: 'center' });
    } else text(ctx, 'no precipitate', mx, base + 62, PAL.ink, { size: 22, weight: 600, align: 'center' });
    /* the new pairings, each with the guideline that decides it */
    const px = 1010;
    text(ctx, 'possible new compounds', px, 150, PAL.muted, { size: 17 });
    line(ctx, px, 162, 1380, 162, alpha(PAL.ink, 0.3), 2);
    if (!pairs.length) text(ctx, 'none: the ions can only pair as they were', px, 200, PAL.ink, { size: 17 });
    pairs.forEach((p, i) => {
      const y = 205 + i * 140;
      text(ctx, p.f.u, px, y, PAL.ink, { size: 24, weight: 600 });
      text(ctx, p.j.out ? 'insoluble' : 'soluble', 1380, y, PAL.ink, { size: 20, weight: p.j.out ? 600 : 400, align: 'right' });
      p.j.why.forEach((s, m) => text(ctx, s, px, y + 34 + m * 24, PAL.muted, { size: 16 }));
    });
    topline(ctx, solids.length ? 'Mixing ' + sa[0] + ' and ' + sb[0] + ' gives a precipitate of ' + solids.map((p) => p.f.u).join(' and ') + '.'
      : 'Mixing ' + sa[0] + ' and ' + sb[0] + ' gives no precipitate, since every pairing of their ions is soluble.');
    const key = sa[0] + '|' + sb[0];
    if (key !== d.key) {
      d.key = key;
      if (solids.length) {
        const eqs = solids.map((p) => (p.f.x > 1 ? p.f.x : '') + ionT(CAT[p.c], 1) + '(aq)+' + (p.f.y > 1 ? p.f.y : '') + ionT(AN[p.a], -1) + '(aq)\\;\\longrightarrow\\;' + p.f.t + '(s)');
        readout(d.readout, eqs.join('\\qquad '), solids.map((p) => p.f.u).join(' and ') + ' is insoluble by the guidelines of Table 4.1, so it precipitates; the other ions stay in solution as spectator ions.');
      } else {
        const all = [ionT(ca, 1), ionT(aa, -1), ionT(cb, 1), ionT(ab, -1)].filter((s, i, arr) => arr.indexOf(s) === i).map((s) => s + '(aq)');
        readout(d.readout, all.join('+') + '\\;\\longrightarrow\\;\\text{no reaction}', 'Every compound these ions can form is soluble, so nothing precipitates and the ions simply stay in solution.');
      }
    }
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 4.5: hydrogen chloride dissolving in water, beside ammonia. The
   book's arrow carries the gas down into the water, so the figure moves:
   twelve molecules drift from the space above the water into it one after
   another, and each hydrogen ion passes to a water molecule (hydrogen
   chloride, all twelve) or from one (ammonia, one in twelve, where about
   one in a hundred is the true figure). A clock, so a cycle and the
   transport; the choice of gas starts it over.
===================================================================== */
(function () {
  const d = sim('sim-hcl', 580);
  const GAS = F.choice(d.controls, { label: '\\text{gas}', aria: 'the gas that dissolves', value: 'HCl', options: [{ value: 'HCl', label: 'HCl' }, { value: 'NH3', label: 'NH₃' }], onInput: () => cy.reset() });
  const S = 1.25;
  /* the particles as atoms about their centre, [element, dx, dy, radius], drawn with the first atom's direction free to turn */
  const MOL = {
    H2O: [['O', 0, 0, 11], ['H', -10, 8, 6.5], ['H', 10, 8, 6.5]],
    H3O: [['O', 0, 0, 11], ['H', -11, 7, 6.5], ['H', 11, 7, 6.5]],
    OH: [['O', 0, 0, 11], ['H', 10, 8, 6.5]],
    HCl: [['Cl', 0, 0, 13]],
    Cl: [['Cl', 0, 0, 13]],
    NH3: [['N', 0, 0, 11], ['H', -11, 7, 6.5], ['H', 11, 7, 6.5], ['H', 0, -13, 6.5]],
  };
  const NAME = { H2O: 'a water molecule, H₂O', H3O: 'a hydronium ion, H₃O⁺', OH: 'a hydroxide ion, OH⁻', HCl: 'a hydrogen chloride molecule, HCl', Cl: 'a chloride ion, Cl⁻', NH3: 'an ammonia molecule, NH₃', NH4: 'an ammonium ion, NH₄⁺' };
  function atom(ctx, e, x, y, r) {
    ctx.save(); ctx.fillStyle = F.el(e); ctx.strokeStyle = e === 'H' ? PAL.ink : alpha(PAL.ink, 0.4); ctx.lineWidth = e === 'H' ? 1.5 : 1;
    ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore();
  }
  /* a particle at (x, y) turned by a, its hydrogens drawn behind the heavy atom */
  function mol(ctx, key, x, y, a = 0, k = S) {
    const c = Math.cos(a), s = Math.sin(a);
    const atoms = MOL[key].slice().reverse();
    atoms.forEach(([e, dx, dy, r]) => atom(ctx, e, x + (dx * c - dy * s) * k, y + (dx * s + dy * c) * k, r * k));
  }
  const sign = (ctx, x, y, s) => text(ctx, s, x + 17, y - 26, PAL.ink, { size: 18, weight: 600, align: 'center' });
  /* the flask: a neck under its stopper, a conical body, and water up to LY */
  const FX = 400, NECK = 170, BASE = 520, LY = 280;
  const hw = (y) => (y < NECK ? 48 : 48 + ((Math.min(y, BASE) - NECK) / (BASE - NECK)) * 207);
  const outline = () => [[FX - 48, 96], [FX - 48, NECK], [FX - hw(BASE), BASE], [FX - hw(BASE) + 22, BASE + 18], [FX + hw(BASE) - 22, BASE + 18], [FX + hw(BASE), BASE], [FX + 48, NECK], [FX + 48, 96]];
  /* the places: twelve final spots in the water, each with its partner water molecule close by, fourteen more water molecules,
     and twelve places in the gas above the water */
  const r = rng(269), N = 12;
  const inWater = (x, y, m) => y > LY + m && y < BASE + 4 - m && Math.abs(x - FX) < hw(y) - m;
  const far = (pts, x, y, m) => pts.every((p) => Math.hypot(p[0] - x, p[1] - y) > m);
  const ends = [], partners = [], waters = [], starts = [];
  for (let tries = 0; ends.length < N && tries < 20000; tries++) {
    const x = FX - 250 + r() * 500, y = LY + r() * (BASE - LY), a = r() * TAU, px = x + 44 * Math.cos(a), py = y + 44 * Math.sin(a);
    if (inWater(x, y, 26) && inWater(px, py, 24) && far(ends.concat(partners), x, y, 50) && far(ends.concat(partners), px, py, 40)) { ends.push([x, y, a]); partners.push([px, py]); }
  }
  for (let tries = 0; waters.length < 14 && tries < 5000; tries++) {
    const x = FX - 250 + r() * 500, y = LY + r() * (BASE - LY);
    if (inWater(x, y, 22) && far(ends.concat(partners, waters), x, y, 40)) waters.push([x, y, r() * TAU]);
  }
  for (let tries = 0; starts.length < N && tries < 20000; tries++) {
    const x = FX - 170 + r() * 340, y = NECK - 40 + r() * (LY - NECK + 16);
    if (Math.abs(x - FX) < hw(y) - 26 && far(starts, x, y, 28)) starts.push([x, y, r() * TAU]);
  }
  const LAG = 0.3, FALL = 1.4, PASS = 0.5, T = LAG * (N - 1) + FALL + PASS;
  const REACTS = { HCl: () => true, NH3: (i) => i === 5 };
  const cy = cycle(() => T, 1.6);
  let hits = []; F.hover(d.stage, () => hits);
  const ease = F.ease.smooth;
  let rkey = '';
  function draw() {
    const { ctx } = begin(d.c);
    hits = [];
    const gas = GAS.value, t = cy.now();
    /* the water, then the glass and its stopper */
    ctx.save(); ctx.fillStyle = alpha(PAL.muted, 0.14); ctx.beginPath();
    const o = outline(); ctx.moveTo(FX - hw(LY), LY); o.slice(2, 6).forEach((p) => ctx.lineTo(p[0], p[1])); ctx.lineTo(FX + hw(LY), LY); ctx.closePath(); ctx.fill(); ctx.restore();
    line(ctx, FX - hw(LY), LY, FX + hw(LY), LY, alpha(PAL.ink, 0.35), 2);
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.lineJoin = 'round'; ctx.beginPath(); o.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]))); ctx.stroke();
    ctx.fillStyle = PAL.soft; ctx.beginPath(); ctx.moveTo(FX - 58, 66); ctx.lineTo(FX + 58, 66); ctx.lineTo(FX + 50, 118); ctx.lineTo(FX - 50, 118); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore();
    hits.push({ x: FX, y: 92, r: 50, name: 'the stopper' });
    /* the particles */
    let nGas = 0, nAq = 0, nR = 0;
    const late = [];
    waters.forEach(([x, y, a]) => { mol(ctx, 'H2O', x, y, a); hits.push({ x, y, r: 20, name: NAME.H2O }); });
    for (let i = 0; i < N; i++) {
      const s0 = LAG * i, u = Math.max(0, Math.min(1, (t - s0) / FALL)), v = ease(Math.max(0, Math.min(1, (t - s0 - FALL) / PASS)));
      const [sx, sy, sa] = starts[i], [ex, ey, ea] = ends[i], [px, py] = partners[i];
      const reacts = REACTS[gas](i) && v > 0;
      const x = sx + (ex - sx) * u + 10 * Math.sin(u * Math.PI * 2) * (1 - u), y = sy + (ey - sy) * u, a = u < 1 ? sa + (ea - sa) * u : ea;
      const dx = Math.cos(ea), dy = Math.sin(ea);
      if (u === 0) nGas++; else if (v < 1 || !REACTS[gas](i)) nAq++; else nR++;
      if (gas === 'HCl') {
        /* the partner water, then the chlorine with its hydrogen pointing at it; the hydrogen passes over as v runs */
        const pw = v < 1 ? 'H2O' : 'H3O';
        mol(ctx, pw, px, py, ea + Math.PI / 2 + Math.PI);
        hits.push({ x: px, y: py, r: 22, name: NAME[pw] });
        const hx0 = x + 17 * Math.cos(a) * S, hy0 = y + 17 * Math.sin(a) * S, hx1 = px - 14 * dx * S, hy1 = py - 14 * dy * S;
        const hx = reacts ? hx0 + (hx1 - hx0) * v : hx0, hy = reacts ? hy0 + (hy1 - hy0) * v : hy0;
        late.push(() => { atom(ctx, 'H', hx, hy, 6.5 * S); mol(ctx, v < 1 ? 'HCl' : 'Cl', x, y, a); if (v >= 1) { sign(ctx, x, y, '−'); sign(ctx, px, py, '+'); } });
        hits.push({ x, y, r: 22, name: v < 1 ? NAME.HCl + (u === 0 ? ', a gas' : ', dissolved') : NAME.Cl });
      } else {
        /* ammonia: one molecule in twelve takes a hydrogen ion from its partner water, which is left a hydroxide ion */
        const R = REACTS[gas](i), pw = R ? 'OH' : 'H2O';
        const hx0 = px - 12 * dx * S, hy0 = py - 12 * dy * S, hx1 = ex + 15 * dx * S, hy1 = ey + 15 * dy * S;
        mol(ctx, pw, px, py, ea + Math.PI);
        hits.push({ x: px, y: py, r: 22, name: R && v >= 1 ? NAME.OH : NAME.H2O });
        late.push(() => {
          if (R) atom(ctx, 'H', hx0 + (hx1 - hx0) * v, hy0 + (hy1 - hy0) * v, 6.5 * S);
          mol(ctx, 'NH3', x, y, a + Math.PI);
          if (reacts && v >= 1) { sign(ctx, x, y, '+'); sign(ctx, px, py, '−'); }
        });
        hits.push({ x, y, r: 22, name: reacts && v >= 1 ? NAME.NH4 : NAME.NH3 + (u === 0 ? ', a gas' : ', dissolved') });
      }
    }
    late.forEach((f) => f());
    text(ctx, gas === 'HCl' ? 'HCl(g)' : 'NH₃(g)', FX - 120, NECK + 20, PAL.muted, { size: 17, align: 'right' });
    text(ctx, 'H₂O(l)', FX - hw(LY) - 16, LY + 10, PAL.muted, { size: 17, align: 'right' });
    /* the tally beside the flask */
    const rows = gas === 'HCl'
      ? [['HCl', 'HCl(g)', nGas, 0], ['HCl', 'HCl(aq)', nAq, 0], ['H2O', 'H₂O(l)', waters.length + N - nR, 0], ['H3O', 'H₃O⁺(aq)', nR, '+'], ['Cl', 'Cl⁻(aq)', nR, '−']]
      : [['NH3', 'NH₃(g)', nGas, 0], ['NH3', 'NH₃(aq)', nAq, 0], ['H2O', 'H₂O(l)', waters.length + N - nR, 0], ['NH3', 'NH₄⁺(aq)', nR, '+'], ['OH', 'OH⁻(aq)', nR, '−']];
    const lx = 860;
    text(ctx, 'particles drawn in the flask', lx, 158, PAL.muted, { size: 17 });
    line(ctx, lx, 170, 1330, 170, alpha(PAL.ink, 0.3), 2);
    rows.forEach(([key, name, n, ch], i) => {
      const y = 214 + i * 66;
      if (key === 'HCl') { atom(ctx, 'H', lx + 30 + 17 * S, y, 6.5 * S); mol(ctx, 'Cl', lx + 30, y); }
      else if (key === 'H3O') { mol(ctx, 'H3O', lx + 30, y); atom(ctx, 'H', lx + 30, y - 14 * S, 6.5 * S); }
      else if (name.startsWith('NH₄')) { atom(ctx, 'H', lx + 30, y + 15 * S, 6.5 * S); mol(ctx, 'NH3', lx + 30, y); }
      else mol(ctx, key, lx + 30, y);
      text(ctx, name, lx + 80, y + 8, PAL.ink, { size: 22 });
      text(ctx, String(n), 1330, y + 8, PAL.ink, { size: 22, weight: 600, align: 'right' });
    });
    const nIn = N - nGas;
    topline(ctx, gas === 'HCl'
      ? (nIn === N && nR === N ? 'All 12 HCl molecules have dissolved, and every one has given its hydrogen ion to a water molecule.' : nIn + ' of 12 HCl molecules have dissolved, and ' + nR + (nR === 1 ? ' has' : ' have') + ' given a hydrogen ion to a water molecule.')
      : nIn + ' of 12 NH₃ molecules have dissolved, and ' + nR + (nR === 1 ? ' has' : ' have') + ' taken a hydrogen ion from a water molecule.');
    if (rkey !== gas) {
      rkey = gas;
      if (gas === 'HCl') readout(d.readout, '\\text{HCl}(aq)+\\text{H}_{2}\\text{O}(l)\\;\\longrightarrow\\;\\text{H}_{3}\\text{O}^{+}(aq)+\\text{Cl}^{-}(aq)',
        'Hydrogen chloride is a strong acid: virtually every molecule that dissolves transfers its hydrogen ion to a water molecule.');
      else readout(d.readout, '\\text{NH}_{3}(aq)+\\text{H}_{2}\\text{O}(l)\\;\\rightleftharpoons\\;\\text{NH}_{4}^{+}(aq)+\\text{OH}^{-}(aq)',
        'Ammonia is a weak base: only about 1% of the dissolved ammonia is present as NH₄⁺ ions, so the one ion in twelve drawn here is more than a real solution holds.');
    }
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();
};
