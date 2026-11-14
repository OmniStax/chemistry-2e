/* Figures for section 4.2 Classifying Chemical Reactions. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['4.2'] = function (root, F) {
const { el, tex, PAL, alpha, cycle, register, begin, line, arrow, text, topline } = F;
const sim = (id, H) => F.sim(root, id, H);
function readout(host, main, small) { tex(host, main); if (small) host.appendChild(el('small', null, small)); }
const TAU = 2 * Math.PI;
/* a reproducible scatter, so the particles stand in the same places on every visit */
function rng(seed) { let a = seed >>> 0; return () => { a = (a + 0x6d2b79f5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
const shuffled = (xs, r) => { const a = xs.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const SUB = { 1: '', 2: '₂', 3: '₃', 4: '₄' };
/* one atom of a molecule or an ion, in the element palette; hydrogen keeps an ink rim so that it shows on the page */
function atom(ctx, e, x, y, r) {
  ctx.save(); ctx.fillStyle = F.el(e); ctx.strokeStyle = e === 'H' ? PAL.ink : alpha(PAL.ink, 0.45); ctx.lineWidth = e === 'H' ? 1.5 : 1;
  ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore();
}
/* atoms [element, along, across, radius] about (x, y), the "along" axis turned to the angle a, each drawn over the one before */
function cluster(ctx, atoms, x, y, a = 0, k = 1) {
  const c = Math.cos(a), s = Math.sin(a);
  atoms.forEach(([e, dx, dy, r]) => atom(ctx, e, x + (dx * c - dy * s) * k, y + (dx * s + dy * c) * k, r * k));
}

/* =====================================================================
   SIM: mixing two solutions of soluble ionic compounds. Each beaker shows
   the ions of its salt; the large beaker holds all of them. The four ions
   can pair in two new ways, each judged by the guidelines of Table 4.1,
   and the ions of an insoluble pairing lie packed on the bottom as the
   solid while the spectator ions stay spread through the liquid. Still:
   the choices redraw the bench, and the solid settles in the choice's
   own morph. Each solution holds ions worth six charges of each sign, so
   a new pairing uses its two ions up exactly.
===================================================================== */
(function () {
  const d = sim('sim-precipitation', 620);
  /* the ions of the twelve salts: formula as drawn, as written in the readout, charge, name, its atoms and the radius it fills */
  const one = (e, r) => ({ shape: [[e, 0, 0, r]], R: r });
  const tri = (e) => ({ shape: [['O', 0, -11, 7.5], ['O', -9.5, 5.5, 7.5], ['O', 9.5, 5.5, 7.5], [e, 0, 0, 8]], R: 19 });
  const CAT = {
    K: { u: 'K', t: '\\text{K}', q: 1, g1: true, name: 'potassium', ...one('K', 13) }, Na: { u: 'Na', t: '\\text{Na}', q: 1, g1: true, name: 'sodium', ...one('Na', 11) },
    Li: { u: 'Li', t: '\\text{Li}', q: 1, g1: true, name: 'lithium', ...one('Li', 9) },
    NH4: { u: 'NH₄', t: '\\text{NH}_{4}', q: 1, g1: true, poly: true, name: 'ammonium', shape: [['H', 0, -11, 5.5], ['H', -11, 0, 5.5], ['H', 11, 0, 5.5], ['H', 0, 11, 5.5], ['N', 0, 0, 9]], R: 17 },
    Pb: { u: 'Pb', t: '\\text{Pb}', q: 2, name: 'lead(II)', ...one('Pb', 14) }, Ag: { u: 'Ag', t: '\\text{Ag}', q: 1, name: 'silver', ...one('Ag', 13) }, Ba: { u: 'Ba', t: '\\text{Ba}', q: 2, name: 'barium', ...one('Ba', 15) },
  };
  const AN = {
    I: { u: 'I', t: '\\text{I}', q: 1, kind: 'halide', name: 'iodide', ...one('I', 17) }, Cl: { u: 'Cl', t: '\\text{Cl}', q: 1, kind: 'halide', name: 'chloride', ...one('Cl', 14) },
    NO3: { u: 'NO₃', t: '\\text{NO}_{3}', q: 1, poly: true, kind: 'always', name: 'nitrate', ...tri('N') },
    Ac: { u: 'C₂H₃O₂', t: '\\text{C}_{2}\\text{H}_{3}\\text{O}_{2}', q: 1, poly: true, kind: 'always', name: 'acetate', shape: [['H', -15, -8, 4.5], ['H', -15, 8, 4.5], ['H', -19, 0, 4.5], ['O', 15, -9, 7], ['O', 15, 9, 7], ['C', -7, 0, 8], ['C', 7, 0, 8]], R: 23 },
    SO4: { u: 'SO₄', t: '\\text{SO}_{4}', q: 2, poly: true, kind: 'sulfate', name: 'sulfate', shape: [['O', -9, -9, 7.5], ['O', 9, -9, 7.5], ['O', -9, 9, 7.5], ['O', 9, 9, 7.5], ['S', 0, 0, 9]], R: 20 },
    CO3: { u: 'CO₃', t: '\\text{CO}_{3}', q: 2, poly: true, kind: 'carbonate', name: 'carbonate', ...tri('C') },
  };
  const SALTS = [['KI', 'K', 'I'], ['Pb(NO₃)₂', 'Pb', 'NO3'], ['NaCl', 'Na', 'Cl'], ['AgNO₃', 'Ag', 'NO3'], ['K₂SO₄', 'K', 'SO4'], ['Ba(NO₃)₂', 'Ba', 'NO3'],
    ['LiCl', 'Li', 'Cl'], ['AgC₂H₃O₂', 'Ag', 'Ac'], ['(NH₄)₂CO₃', 'NH4', 'CO3'], ['Na₂SO₄', 'Na', 'SO4'], ['BaCl₂', 'Ba', 'Cl'], ['Na₂CO₃', 'Na', 'CO3']];
  const CHARGE = 6;      /* the charge of each sign that each solution holds: six 1+ ions or three 2+ ions */
  /* the colour of each solid as it is seen, a physical fact in both themes: lead iodide bright yellow, silver iodide and silver
     carbonate pale yellow, and every other precipitate these salts can give white; drawn through F.fact */
  const PPT_COLOR = { 'PbI₂': '#f2c300', 'AgI': '#ece29a', 'Ag₂CO₃': '#e8e1ae' };
  const WHITE_SOLID = '#f5f5f0';
  const pick = (label, value, aria) => F.select(d.controls, { label, aria, value: String(value), options: SALTS.map((s, i) => ({ value: String(i), label: s[0] })) });
  const A = pick('\\text{first solution}', 0, 'the first solution');
  const B = pick('\\text{second solution}', 1, 'the second solution');
  let hits = []; F.hover(d.stage, () => hits);
  const chargeU = (q, s) => (q === 1 ? '' : { 2: '²', 3: '³' }[q]) + (s > 0 ? '⁺' : '⁻');
  const chargeT = (q, s) => (q === 1 ? '' : q) + (s > 0 ? '+' : '-');
  const signOf = (q, s) => (q === 1 ? '' : q) + (s > 0 ? '+' : '−');
  const gcd = (a, b) => (b ? gcd(b, a % b) : a);
  /* a cation and an anion as a neutral compound, as drawn and as written */
  function compound(c, a) {
    const g = gcd(c.q, a.q), x = a.q / g, y = c.q / g;
    const part = (ion, n) => (n > 1 ? (ion.poly ? '(' + ion.u + ')' + SUB[n] : ion.u + SUB[n]) : ion.u);
    const partT = (ion, n) => (n > 1 ? (ion.poly ? '(' + ion.t + ')_{' + n + '}' : ion.t + '_{' + n + '}') : ion.t);
    return { u: part(c, x) + part(a, y), t: partT(c, x) + partT(a, y), x, y };
  }
  /* Table 4.1 read for one pairing: whether it is insoluble, and the guideline that decides it */
  function judge(c, a) {
    if (c.g1) return { out: false, why: ['Compounds of group 1 cations and NH₄⁺', 'are soluble.'] };
    if (a.kind === 'always') return { out: false, why: [a.u + '⁻ compounds are soluble, with no exceptions.'] };
    if (a.kind === 'halide') return ['Ag', 'Pb'].includes(c.u) ? { out: true, why: ['Cl⁻, Br⁻ and I⁻ compounds are soluble,', 'except with Ag⁺, Hg₂²⁺ and Pb²⁺.'] } : { out: false, why: ['Cl⁻, Br⁻ and I⁻ compounds are soluble.'] };
    if (a.kind === 'sulfate') return ['Ag', 'Pb', 'Ba'].includes(c.u) ? { out: true, why: ['SO₄²⁻ compounds are soluble, except with', 'Ag⁺, Ba²⁺, Ca²⁺, Hg₂²⁺, Pb²⁺ and Sr²⁺.'] } : { out: false, why: ['SO₄²⁻ compounds are soluble.'] };
    return { out: true, why: ['CO₃²⁻ compounds are insoluble, except with', 'group 1 cations and NH₄⁺.'] };
  }
  const ionU = (ion, s) => ion.u + chargeU(ion.q, s);
  const list = (xs) => (xs.length < 3 ? xs.join(' and ') : xs.slice(0, -1).join(', ') + ' and ' + xs[xs.length - 1]);
  const ionT = (ion, s) => ion.t + '^{' + chargeT(ion.q, s) + '}';
  /* the bench: two beakers of solution stacked at the left, the mixture in the middle. Each is its centre, half width, rim and base;
     the liquid stands at lv, and the ions take places on a grid of cols by rows inside it */
  const BK = {
    a: { x: 200, half: 140, top: 40, base: 240, lv: 92, cols: 5, rows: [120, 162, 204] },
    b: { x: 200, half: 140, top: 340, base: 540, lv: 392, cols: 5, rows: [420, 462, 504] },
    mix: { x: 680, half: 210, top: 40, base: 540, lv: 140, cols: 8, rows: [180, 228, 276, 324, 372] },
  };
  /* a beaker standing on its base: straight walls, a rounded foot, a flared rim with a spout at the left */
  function beakerPath(ctx, b) {
    const l = b.x - b.half, r = b.x + b.half;
    ctx.beginPath();
    ctx.moveTo(l - 14, b.top - 6); ctx.quadraticCurveTo(l - 2, b.top - 2, l, b.top + 12);
    ctx.lineTo(l, b.base - 12); ctx.quadraticCurveTo(l, b.base, l + 12, b.base);
    ctx.lineTo(r - 12, b.base); ctx.quadraticCurveTo(r, b.base, r, b.base - 12);
    ctx.lineTo(r, b.top + 8); ctx.quadraticCurveTo(r, b.top, r + 6, b.top - 2);
  }
  function liquid(ctx, b) {
    ctx.save(); beakerPath(ctx, b); ctx.closePath(); ctx.clip(); ctx.fillStyle = alpha(PAL.muted, 0.16); ctx.fillRect(b.x - b.half, b.lv, 2 * b.half, b.base - b.lv); ctx.restore();
    line(ctx, b.x - b.half + 2, b.lv, b.x + b.half - 2, b.lv, alpha(PAL.ink, 0.45), 1.5);
  }
  function glass(ctx, b, color) { ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = 3; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; beakerPath(ctx, b); ctx.stroke(); ctx.restore(); }
  /* the grid places of a beaker in a shuffled order, each nudged a little off its centre */
  function places(b, seed) {
    const r = rng(seed), w = 2 * b.half - 44, all = [];
    b.rows.forEach((y, j) => { for (let i = 0; i < b.cols; i++) all.push([b.x - w / 2 + (w * (i + 0.5)) / b.cols + (r() - 0.5) * 8, y + (r() - 0.5) * 8 + (j % 2 ? 3 : -3)]); });
    return shuffled(all, r);
  }
  /* the ions of one salt: CHARGE / q of each, cations and anions taken turn about */
  function ionsOf(s) {
    const c = CAT[s[1]], a = AN[s[2]], nc = CHARGE / c.q, na = CHARGE / a.q, out = [];
    for (let i = 0; i < Math.max(nc, na); i++) { if (i < nc) out.push({ ion: c, key: s[1], s: 1 }); if (i < na) out.push({ ion: a, key: s[2], s: -1 }); }
    return { c, a, nc, na, list: out };
  }
  function drawIon(ctx, p, x, y, signAlpha = 1) {
    cluster(ctx, p.ion.shape, x, y);
    if (signAlpha > 0.02) F.faded(ctx, signAlpha, [0, 0], () => text(ctx, signOf(p.ion.q, p.s), x + p.ion.R * 0.72 + 2, y - p.ion.R * 0.72 - 5, PAL.ink, { size: 15, weight: 600 }));
    hits.push({ x, y, r: p.ion.R + 2, name: (/^[aeiou]/.test(p.ion.name) ? 'an ' : 'a ') + p.ion.name + ' ion, ' + ionU(p.ion, p.s) });
  }
  function draw() {
    const { ctx } = begin(d.c);
    hits = [];
    const ia = +A.value, ib = +B.value, sa = SALTS[ia], sb = SALTS[ib];
    const SA = ionsOf(sa), SB = ionsOf(sb), ca = SA.c, aa = SA.a, cb = SB.c, ab = SB.a;
    /* the two new pairings, leaving out any that is one of the compounds poured in */
    const pairs = [];
    [[sa[1], sb[2]], [sb[1], sa[2]]].forEach(([c, a]) => {
      if ((c === sa[1] && a === sa[2]) || (c === sb[1] && a === sb[2]) || pairs.some((p) => p.c === c && p.a === a)) return;
      pairs.push({ c, a, f: compound(CAT[c], AN[a]), j: judge(CAT[c], AN[a]) });
    });
    const solids = pairs.filter((p) => p.j.out);
    const k = Math.min(A.k, B.k);
    /* liquids, then what is in them, then the glass */
    liquid(ctx, BK.a); liquid(ctx, BK.b); liquid(ctx, BK.mix);
    [[SA, BK.a, ia, 'first-solution', sa], [SB, BK.b, ib, 'second-solution', sb]].forEach(([S, b, idx, who, s], n) => {
      const pl = places(b, 31 + idx * 7 + n);
      S.list.forEach((p, i) => drawIon(ctx, p, pl[i][0], pl[i][1]));
      const rc = F.ref(who);
      glass(ctx, b, rc);
      text(ctx, s[0] + '(aq)', b.x, b.base + 30, rc, { size: 22, weight: 600, align: 'center' });
      text(ctx, S.nc + ' ' + ionU(S.c, 1) + ' and ' + S.na + ' ' + ionU(S.a, -1), b.x, b.base + 58, PAL.muted, { size: 17, align: 'center' });
      hits.push({ x: b.x, y: (b.lv + b.base) / 2, r: b.half, name: s[0] + '(aq), a solution of ' + ionU(S.c, 1) + ' and ' + ionU(S.a, -1) + ' ions' });
    });
    arrow(ctx, 366, 150, 446, 196, PAL.ink, 4);
    arrow(ctx, 366, 440, 446, 394, PAL.ink, 4);
    /* the mixture: every ion of both solutions; the ions of an insoluble pairing packed on the bottom, the rest spread through the liquid */
    const M = BK.mix, all = SA.list.concat(SB.list), pl = places(M, 97 + ia * 13 + ib);
    const inSolid = (p) => solids.some((q) => (p.s > 0 ? q.c === p.key : q.a === p.key));
    const packed = new Map();
    let heap = null;
    if (solids.length) {
      /* the solid's ions in two rows, the upper sitting in the hollows of the lower, cations and anions in the order of the formula */
      const q = solids[0], C1 = CAT[q.c], A1 = AN[q.a];
      const cs = all.filter((p) => p.s > 0 && p.key === q.c), as = all.filter((p) => p.s < 0 && p.key === q.a);
      const unit = q.f.x === 1 && q.f.y === 2 ? ['a', 'c', 'a'] : q.f.x === 2 && q.f.y === 1 ? ['c', 'a', 'c'] : ['c', 'a'];
      const seq = []; let ci = 0, ai = 0;
      while (ci < cs.length || ai < as.length) unit.forEach((w) => { if (w === 'c' && ci < cs.length) seq.push(cs[ci++]); if (w === 'a' && ai < as.length) seq.push(as[ai++]); });
      const pitch = 2 * Math.max(C1.R, A1.R) + 2, lower = Math.ceil(seq.length / 2), y0 = M.base - 6 - Math.max(C1.R, A1.R), y1 = y0 - pitch * 0.87;
      seq.forEach((p, i) => packed.set(p, i < lower ? [M.x + (i - (lower - 1) / 2) * pitch, y0] : [M.x + (i - lower - (seq.length - lower - 1) / 2) * pitch, y1]));
      const hw = (lower * pitch) / 2 + 14, top = y1 - pitch / 2 - 6;
      heap = { l: M.x - hw, r: M.x + hw, t: top, name: q.f.u };
      ctx.save(); ctx.globalAlpha = k; ctx.fillStyle = F.fact(PPT_COLOR[q.f.u] || WHITE_SOLID); ctx.strokeStyle = alpha(PAL.ink, 0.55); ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(heap.l - 44, M.base - 2); ctx.bezierCurveTo(heap.l - 6, M.base - 2, heap.l - 10, top, heap.l + 40, top); ctx.lineTo(heap.r - 40, top);
      ctx.bezierCurveTo(heap.r + 10, top, heap.r + 6, M.base - 2, heap.r + 44, M.base - 2); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore();
    }
    all.forEach((p, i) => {
      const [x0, y0] = pl[i], to = packed.get(p);
      if (to) drawIon(ctx, p, x0 + (to[0] - x0) * k, y0 + (to[1] - y0) * k, 1 - k); else drawIon(ctx, p, x0, y0);
    });
    if (heap) hits.push({ x: M.x, y: (heap.t + M.base) / 2, r: (heap.r - heap.l) / 2, name: 'the precipitate, solid ' + heap.name });
    glass(ctx, M, PAL.ink);
    hits.push({ x: M.x, y: (M.lv + M.base) / 2, r: M.half, name: 'the mixture of the two solutions' });
    text(ctx, solids.length ? solids.map((p) => p.f.u + '(s)').join(' and ') + ' precipitates' : 'no precipitate', M.x, M.base + 30, PAL.ink, { size: 22, weight: 600, align: 'center' });
    /* the new pairings, each with the guideline that decides it, and the key of the ions */
    const px = 950, pr = 1380;
    text(ctx, 'new pairings of the ions', px, 44, PAL.muted, { size: 17 });
    line(ctx, px, 60, pr, 60, alpha(PAL.ink, 0.3), 2);
    if (!pairs.length) text(ctx, 'None: the two solutions share an ion.', px, 100, PAL.ink, { size: 20 });
    pairs.forEach((p, i) => {
      const y = 100 + i * 136;
      text(ctx, p.f.u, px, y, PAL.ink, { size: 26, weight: 600 });
      text(ctx, p.j.out ? 'insoluble' : 'soluble', pr, y, PAL.ink, { size: 22, weight: p.j.out ? 600 : 400, align: 'right' });
      p.j.why.forEach((s, m) => text(ctx, s, px, y + 38 + m * 26, PAL.muted, { size: 17 }));
    });
    const kinds = [];
    all.forEach((p) => { if (!kinds.some((q) => q.key === p.key && q.s === p.s)) kinds.push(p); });
    F.legend(ctx, { l: px - 12, r: pr, t: 380, b: 612 }, kinds.map((p) => ({ s: ionU(p.ion, p.s) + ', ' + p.ion.name, draw: (c, x, y) => cluster(c, p.ion.shape, x, y, 0, Math.min(1, 11 / p.ion.R + 0.25)) })), { corner: 'bl', size: 18 });
    const key = sa[0] + '|' + sb[0];
    if (key !== d.key) {
      d.key = key;
      const ions = []; all.forEach((p) => { const s = ionU(p.ion, p.s); if (!ions.includes(s)) ions.push(s); });
      if (solids.length) {
        const eqs = solids.map((p) => (p.f.x > 1 ? p.f.x : '') + ionT(CAT[p.c], 1) + '(aq)+' + (p.f.y > 1 ? p.f.y : '') + ionT(AN[p.a], -1) + '(aq)\\;\\longrightarrow\\;' + p.f.t + '(s)');
        const spect = ions.filter((s) => !solids.some((p) => s === ionU(CAT[p.c], 1) || s === ionU(AN[p.a], -1)));
        readout(d.readout, eqs.join(' \\\\ '), spect.length ? list(spect) + ' stay in solution as spectator ions.' : '');
      } else {
        const allT = [ionT(ca, 1), ionT(aa, -1), ionT(cb, 1), ionT(ab, -1)].filter((s, i, arr) => arr.indexOf(s) === i).map((s) => s + '(aq)');
        readout(d.readout, allT.join('+') + '\\;\\longrightarrow\\;\\text{no reaction}');
      }
    }
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 4.5: hydrogen chloride dissolving in water, beside ammonia. The
   book's arrow carries the gas down into the water, so the figure moves:
   ten molecules leave the gas above the water one after another and each
   comes to rest beside a water molecule. Every HCl gives that water
   molecule its hydrogen ion. Of ten NH₃ one takes a hydrogen ion from its
   water molecule, and later gives it back while another takes one (about
   one in a hundred is the true share). A clock, so a cycle and the
   transport; the choice of gas starts it over.
===================================================================== */
(function () {
  const d = sim('sim-hcl', 690);
  const GAS = F.choice(d.controls, { label: '\\text{gas}', aria: 'the gas that dissolves', value: 'HCl', options: [{ value: 'HCl', label: 'HCl' }, { value: 'NH3', label: 'NH₃' }], onInput: () => cy.reset() });
  const S = 1.15, N = 10;
  /* the flask: its centre, the top of the glass, the foot of the neck, the base, the half widths of neck and base, the water's surface */
  const FX = 430, RIM = 128, NECK = 225, BASE = 650, NW = 60, BW = 400, LY = 392;
  const hw = (y) => (y <= NECK ? NW : NW + ((y - NECK) / (BASE - NECK)) * (BW - NW));
  function flaskPath(ctx, lip) {
    ctx.beginPath();
    if (lip) ctx.moveTo(FX - NW - 9, RIM - 6); else ctx.moveTo(FX - NW, RIM);
    ctx.lineTo(FX - NW, RIM + (lip ? 3 : 0)); ctx.arcTo(FX - NW, NECK, FX - BW, BASE, 16); ctx.arcTo(FX - BW, BASE, FX + BW, BASE, 26); ctx.arcTo(FX + BW, BASE, FX + NW, NECK, 26); ctx.arcTo(FX + NW, NECK, FX + NW, RIM, 16); ctx.lineTo(FX + NW, RIM + (lip ? 3 : 0));
    if (lip) ctx.lineTo(FX + NW + 9, RIM - 6);
  }
  /* places in the water on a triangular grid, 50 apart, each nudged a little; ten neighbouring pairs of them take a gas molecule and
     the water molecule it meets, a dozen more hold water, the rest stay empty */
  const r = rng(4205), PITCH = 56, sites = [];
  for (let j = 0, y = LY + 38; y < BASE - 24; j++, y += PITCH * 0.866) {
    const half = hw(y) - (y > BASE - 60 ? 44 : 30), n = Math.floor((2 * half) / PITCH), x0 = FX - (n * PITCH) / 2 + (j % 2 ? PITCH / 4 : -PITCH / 4);
    for (let i = 0; i <= n; i++) { const x = x0 + i * PITCH; if (Math.abs(x - FX) < half) sites.push({ x: x + (r() - 0.5) * 7, y: y + (r() - 0.5) * 7, gx: x, gy: y }); }
  }
  const near = (a, b) => Math.hypot(a.gx - b.gx, a.gy - b.gy) < PITCH * 1.2;
  const pairs = [];
  for (const s of shuffled(sites, r)) {
    if (pairs.length === N) break;
    if (s.used) continue;
    const m = shuffled(sites.filter((q) => !q.used && q !== s && near(s, q)), r)[0];
    if (m) { s.used = m.used = true; pairs.push({ e: s, p: m }); }
  }
  const waters = shuffled(sites.filter((s) => !s.used), r).slice(0, 12).map((s) => ({ x: s.x, y: s.y, a: r() * TAU }));
  /* ten places in the gas above the water, below the stopper: rows of one, two, three and four */
  const starts = [];
  [[242, 1], [280, 2], [318, 3], [356, 4]].forEach(([y, n]) => { for (let i = 0; i < n; i++) starts.push({ x: FX + (i - (n - 1) / 2) * 64 + (r() - 0.5) * 8, y: y + (r() - 0.5) * 6, a: r() * TAU }); });
  /* each gas molecule goes to the pair most nearly below it, and the lowest leave first */
  pairs.sort((a, b) => a.e.x - b.e.x);
  const byX = starts.slice().sort((a, b) => a.x - b.x);
  const MOLS = pairs.map((pr, i) => ({ s: byX[i], e: pr.e, p: pr.p, phi: Math.atan2(pr.p.y - pr.e.y, pr.p.x - pr.e.x) }));
  MOLS.slice().sort((a, b) => b.s.y - a.s.y).forEach((m, i) => { m.rank = i; });
  const LAG = 0.45, FALL = 1.5, PASS = 0.6, T = LAG * (N - 1) + FALL + PASS;
  /* ammonia: the molecule of rank 2 takes a hydrogen ion as soon as it arrives and gives it back at TX, just as the molecule of rank 6 takes one */
  const RA = 2, RB = 6, TX = LAG * RB + FALL + 0.3;
  const cy = cycle(() => T, 1.6);
  let hits = []; F.hover(d.stage, () => hits);
  const ease = F.ease.smooth, clamp = (x) => Math.max(0, Math.min(1, x));
  /* the atoms of each particle, [element, along, across, radius]: "along" points from the molecule to the partner it trades with */
  const H = 6.5;
  const SHAPE = {
    H2O: [['O', 0, 0, 11], ['H', 8, 10, H], ['H', 8, -10, H]],                       /* seen from the HCl it meets: both hydrogens on the far side */
    H3O: [['O', 0, 0, 11], ['H', 8, 10, H], ['H', 8, -10, H], ['H', -13, 0, H]],
    H2Od: [['O', 0, 0, 11], ['H', 3.2, 12.4, H], ['H', -13, 0, H]],                   /* seen from the NH₃ it meets: one hydrogen pointing at it */
    OH: [['O', 0, 0, 11], ['H', 3.2, 12.4, H]],
    HCl: [['Cl', 0, 0, 13], ['H', 17, 0, H]],
    Cl: [['Cl', 0, 0, 13]],
    NH3: [['N', 0, 0, 11], ['H', -13, 0, H], ['H', -2, 12.5, H], ['H', -2, -12.5, H]],
    NH4: [['N', 0, 0, 11], ['H', -13, 0, H], ['H', 0, 13, H], ['H', 0, -13, H], ['H', 13, 0, H]],
  };
  const NAME = { H2O: 'a water molecule, H₂O', H3O: 'a hydronium ion, H₃O⁺', OH: 'a hydroxide ion, OH⁻', HCl: 'a hydrogen chloride molecule, HCl', Cl: 'a chloride ion, Cl⁻', NH3: 'an ammonia molecule, NH₃', NH4: 'an ammonium ion, NH₄⁺' };
  const mol = (ctx, key, x, y, a = 0) => cluster(ctx, SHAPE[key], x, y, a, S);
  const sign = (ctx, x, y, s) => text(ctx, s, x + 13 * S, y - 19 * S, PAL.ink, { size: 18, weight: 600 });
  let rkey = '';
  function draw() {
    const { ctx } = begin(d.c);
    hits = [];
    const gas = GAS.value, t = cy.now(), acid = gas === 'HCl';
    /* the water, the stopper wedged in the neck, then the glass */
    ctx.save(); flaskPath(ctx, false); ctx.closePath(); ctx.clip(); ctx.fillStyle = alpha(PAL.muted, 0.16); ctx.fillRect(FX - BW, LY, 2 * BW, BASE - LY); ctx.restore();
    line(ctx, FX - hw(LY) + 2, LY, FX + hw(LY) - 2, LY, alpha(PAL.ink, 0.45), 1.5);
    ctx.save(); ctx.fillStyle = PAL.muted; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.moveTo(FX - 70, 96); ctx.lineTo(FX + 70, 96); ctx.lineTo(FX + NW - 2, 190); ctx.lineTo(FX - NW + 2, 190); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore();
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; flaskPath(ctx, true); ctx.stroke(); ctx.restore();
    hits.push({ x: FX, y: 140, r: 56, name: 'the stopper' });
    /* the particles: the water molecules that meet nothing, then each gas molecule, its partner and the hydrogen that passes between them */
    let nGas = 0, nAq = 0, nR = 0;
    waters.forEach((w) => { mol(ctx, 'H2O', w.x, w.y, w.a); hits.push({ x: w.x, y: w.y, r: 20, name: NAME.H2O }); });
    const late = [];
    MOLS.forEach((m) => {
      const s0 = LAG * m.rank, u = ease(clamp((t - s0) / FALL));
      /* v: how far the hydrogen has passed, 0 with its first owner and 1 with its second */
      let v = 0;
      if (acid) v = ease(clamp((t - s0 - FALL) / PASS));
      else if (m.rank === RA) v = ease(clamp((t - s0 - FALL) / PASS)) - ease(clamp((t - TX) / PASS));
      else if (m.rank === RB) v = ease(clamp((t - TX) / PASS));
      const x = m.s.x + (m.e.x - m.s.x) * u + 12 * Math.sin(u * TAU) * (1 - u), y = m.s.y + (m.e.y - m.s.y) * u;
      let da = (m.phi - m.s.a) % TAU; if (da > Math.PI) da -= TAU; if (da < -Math.PI) da += TAU;
      const a = m.s.a + da * u, c = Math.cos(m.phi), sn = Math.sin(m.phi), ion = v >= 0.5;
      if (y < LY) nGas++; else if (ion) nR++; else nAq++;
      const where = y < LY ? ', in the gas' : ', dissolved';
      if (acid) {
        /* the hydrogen leaves the chlorine for the near side of the water molecule */
        const hx0 = x + 17 * S * Math.cos(a), hy0 = y + 17 * S * Math.sin(a), hx1 = m.p.x - 13 * S * c, hy1 = m.p.y - 13 * S * sn;
        mol(ctx, 'H2O', m.p.x, m.p.y, m.phi);
        late.push(() => { mol(ctx, 'Cl', x, y, a); atom(ctx, 'H', hx0 + (hx1 - hx0) * v, hy0 + (hy1 - hy0) * v, H * S); if (ion) { sign(ctx, x, y, '−'); sign(ctx, m.p.x, m.p.y, '+'); } });
        hits.push({ x, y, r: 22, name: ion ? NAME.Cl : NAME.HCl + where }, { x: m.p.x, y: m.p.y, r: 22, name: ion ? NAME.H3O : NAME.H2O });
      } else {
        /* a hydrogen leaves the water molecule for the free side of the nitrogen, and the other three make room */
        const hx0 = m.p.x - 13 * S * c, hy0 = m.p.y - 13 * S * sn, side = 12.5 + 0.5 * v, back = -2 + 2 * v;
        mol(ctx, 'OH', m.p.x, m.p.y, m.phi);
        late.push(() => {
          cluster(ctx, [['N', 0, 0, 11], ['H', -13, 0, H], ['H', back, side, H], ['H', back, -side, H]], x, y, a, S);
          const hx1 = x + 13 * S * Math.cos(a), hy1 = y + 13 * S * Math.sin(a);
          atom(ctx, 'H', hx0 + (hx1 - hx0) * v, hy0 + (hy1 - hy0) * v, H * S);
          if (ion) { sign(ctx, x, y, '+'); sign(ctx, m.p.x, m.p.y, '−'); }
        });
        hits.push({ x, y, r: 22, name: ion ? NAME.NH4 : NAME.NH3 + where }, { x: m.p.x, y: m.p.y, r: 22, name: ion ? NAME.OH : NAME.H2O });
      }
    });
    late.forEach((f) => f());
    F.label(ctx, acid ? 'HCl(g)' : 'NH₃(g)', FX - 116, 318, { side: 'left', gap: 70, leader: true, size: 20 });
    F.label(ctx, 'H₂O(l)', FX - hw(500) + 26, 500, { side: 'left', gap: 60, leader: true, size: 20 });
    /* the key beside the flask, which also counts each kind */
    const nW = waters.length + N - nR;
    const rows = acid
      ? [['HCl', 'HCl(g)', nGas], ['HCl', 'HCl(aq)', nAq], ['H2O', 'H₂O(l)', nW], ['H3O', 'H₃O⁺(aq)', nR], ['Cl', 'Cl⁻(aq)', nR]]
      : [['NH3', 'NH₃(g)', nGas], ['NH3', 'NH₃(aq)', nAq], ['H2O', 'H₂O(l)', nW], ['NH4', 'NH₄⁺(aq)', nR], ['OH', 'OH⁻(aq)', nR]];
    const lx = 920, rx = 1340;
    text(ctx, 'in the flask', lx, 196, PAL.muted, { size: 17 });
    line(ctx, lx, 212, rx, 212, alpha(PAL.ink, 0.3), 2);
    rows.forEach(([key, name, n], i) => {
      const y = 262 + i * 74;
      mol(ctx, key, lx + 30, y, key === 'H2O' || key === 'H3O' ? Math.PI / 2 : key === 'OH' ? -Math.PI / 2 : 0);
      text(ctx, name, lx + 84, y, PAL.ink, { size: 24 });
      text(ctx, String(n), rx, y, PAL.ink, { size: 24, weight: 600, align: 'right' });
    });
    topline(ctx, nR + ' of 10 ' + (acid ? 'HCl' : 'NH₃') + ' molecules ' + (nR === 1 ? 'has' : 'have') + (acid ? ' given a hydrogen ion to water.' : ' taken a hydrogen ion from water.'));
    if (rkey !== gas) {
      rkey = gas;
      if (acid) readout(d.readout, '\\text{HCl}(aq)+\\text{H}_{2}\\text{O}(l)\\;\\longrightarrow\\;\\text{H}_{3}\\text{O}^{+}(aq)+\\text{Cl}^{-}(aq)');
      else readout(d.readout, '\\text{NH}_{3}(aq)+\\text{H}_{2}\\text{O}(l)\\;\\rightleftharpoons\\;\\text{NH}_{4}^{+}(aq)+\\text{OH}^{-}(aq)',
        'About 1% of dissolved ammonia is present as NH₄⁺, so one ion in ten is ten times the true share.');
    }
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();
};
