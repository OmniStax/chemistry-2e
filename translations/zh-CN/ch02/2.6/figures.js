/* Figures for section 2.6 Ionic and Molecular Compounds. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['2.6'] = function (root, F) {
const { el, tex, C, PAL, alpha, register, begin, line, text, headline } = F;
const sim = (id, H) => F.sim(root, id, H);
function readout(host, main, small) { host.textContent = ''; tex(host, main); if (small) host.appendChild(el('small', null, small)); }

/* a particle or an atom as the chapter draws it: a filled disc with an ink rim */
function disc(ctx, x, y, r, fill, w = 1.5) {
  ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, 2 * Math.PI); ctx.fillStyle = fill; ctx.fill();
  ctx.lineWidth = w; ctx.strokeStyle = PAL.ink; ctx.stroke(); ctx.restore();
}
/* the sign a particle carries, drawn as strokes in ink */
function sign(ctx, x, y, r, plus) {
  const s = r * 0.5;
  line(ctx, x - s, y, x + s, y, PAL.ink, 2);
  if (plus) line(ctx, x, y - s, x, y + s, PAL.ink, 2);
}
const SUP = { 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', '+': '⁺', '-': '⁻' };
/* a charge as a superscript on a symbol: Na⁺, Ca²⁺, O²⁻ */
const chargeSup = (q) => (Math.abs(q) === 1 ? '' : SUP[Math.abs(q)]) + (q > 0 ? SUP['+'] : SUP['-']);
/* a charge as the book writes it in prose: 2+, 1− */
const chargeWord = (q) => Math.abs(q) + (q > 0 ? '+' : '−');
const WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six'];

/* =====================================================================
   FIGURE 2.28: an atom beside the ion it usually forms. The nucleus is
   an ink disc with its counts beside it, the electrons sit on one dashed
   ring for counting (shells are not yet taught), and the cloud is tinted
   in the element's colour, smaller for a cation and larger for an
   anion. Still: an atom and its ion have no clock.
===================================================================== */
(function () {
  const d = sim('sim-na-cation', 600);
  /* protons, neutrons of the commonest isotope, the usual ion's charge and the noble gas it matches */
  const ELEMENTS = {
    sodium: { sym: 'Na', Z: 11, N: 12, q: 1, noble: 'neon', ion: 'sodium ion' },
    magnesium: { sym: 'Mg', Z: 12, N: 12, q: 2, noble: 'neon', ion: 'magnesium ion' },
    aluminum: { sym: 'Al', Z: 13, N: 14, q: 3, noble: 'neon', ion: 'aluminum ion' },
    calcium: { sym: 'Ca', Z: 20, N: 20, q: 2, noble: 'argon', ion: 'calcium ion' },
    nitrogen: { sym: 'N', Z: 7, N: 7, q: -3, noble: 'neon', ion: 'nitride ion' },
    oxygen: { sym: 'O', Z: 8, N: 8, q: -2, noble: 'neon', ion: 'oxide ion' },
    sulfur: { sym: 'S', Z: 16, N: 16, q: -2, noble: 'argon', ion: 'sulfide ion' },
    chlorine: { sym: 'Cl', Z: 17, N: 18, q: -1, noble: 'argon', ion: 'chloride ion' },
    selenium: { sym: 'Se', Z: 34, N: 45, q: -2, noble: 'krypton', ion: 'selenide ion' },
    bromine: { sym: 'Br', Z: 35, N: 44, q: -1, noble: 'krypton', ion: 'bromide ion' },
  };
  const pick = F.select(d.controls, { label: 'element', aria: 'element', value: 'sodium',
    options: Object.keys(ELEMENTS).map((k) => ({ value: k, label: k })) });
  let hits = [];
  F.hover(d.stage, () => hits);
  let last = '';
  /* one panel: the cloud, the electrons on their ring, the nucleus and its counts */
  function atom(ctx, cx, cy, e, E, R, a) {
    ctx.save(); ctx.globalAlpha = a;
    ctx.beginPath(); ctx.arc(cx, cy, R + 26, 0, 2 * Math.PI);
    ctx.fillStyle = alpha(F.el(E.sym), 0.16); ctx.fill();
    ctx.setLineDash([6, 10]); ctx.lineWidth = 2; ctx.strokeStyle = alpha(PAL.ink, 0.35);
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, 2 * Math.PI); ctx.stroke();
    ctx.restore();
    const re = e > 24 ? 7 : 9;
    for (let k = 0; k < e; k++) {
      const t = -Math.PI / 2 + (k * 2 * Math.PI) / e;
      const x = cx + R * Math.cos(t), y = cy + R * Math.sin(t);
      F.faded(ctx, a, [0, 0], () => { disc(ctx, x, y, re, F.el('e-')); sign(ctx, x, y, re, false); });
      hits.push({ x, y, r: re + 3, name: 'electron' });
    }
    F.faded(ctx, a, [0, 0], () => disc(ctx, cx, cy, 16, PAL.ink));
    hits.push({ x: cx, y: cy, r: 18, name: `nucleus: ${E.Z} protons and ${E.N} neutrons` });
    text(ctx, `${E.Z} p⁺, ${E.N} n⁰`, cx, cy + 44, PAL.ink, { size: 20, align: 'center', bg: alpha(PAL.panel, 0.85) });
  }
  function draw() {
    const { ctx } = begin(d.c);
    const name = pick.value, E = ELEMENTS[name], a = F.ease.smooth(pick.k);
    const eIon = E.Z - E.q, n = Math.abs(E.q);
    hits = [];
    /* the ring's radius grows with the electron count; the ion's cloud is drawn about a fifth smaller or larger */
    const base = 118 + Math.min(E.Z, 36) * 1.1;
    const Rion = E.q > 0 ? base * 0.8 : base * 1.18;
    const cy = 320, xa = 330, xi = 1070;
    atom(ctx, xa, cy, E.Z, E, base, a);
    atom(ctx, xi, cy, eIon, E, Rion, a);
    text(ctx, `(a) ${name} atom, ${E.sym}`, xa, 560, PAL.ink, { size: 22, weight: 600, align: 'center' });
    text(ctx, `(b) ${E.ion}, ${E.sym}${chargeSup(E.q)}`, xi, 560, PAL.ink, { size: 22, weight: 600, align: 'center' });
    /* the electrons that move: lost into the gap for a cation, taken from it for an anion */
    const mx = 700;
    F.arrow(ctx, 590, cy, 810, cy, PAL.ink, 4);
    for (let k = 0; k < n; k++) {
      const x = mx + (k - (n - 1) / 2) * 32, y = cy - 40;
      F.faded(ctx, a, [0, 0], () => { disc(ctx, x, y, 9, F.el('e-')); sign(ctx, x, y, 9, false); });
      hits.push({ x, y, r: 12, name: E.q > 0 ? 'electron lost' : 'electron gained' });
    }
    text(ctx, `${E.q > 0 ? 'loses' : 'gains'} ${n} e⁻`, mx, cy + 36, PAL.ink, { size: 20, align: 'center' });
    headline(ctx, `A ${name} atom ${E.q > 0 ? 'loses' : 'gains'} ${WORDS[n]} electron${n > 1 ? 's' : ''} to form ${E.sym}${chargeSup(E.q)}, which has ${eIon} electrons, as many as an atom of ${E.noble}.`);
    const s = `\\text{charge} = \\text{protons} - \\text{electrons} = ${E.Z} - ${eIon} = \\htmlClass{kv-charge}{${chargeWord(E.q)}}`;
    const small = `The ${E.ion} is ${E.q > 0 ? 'a cation' : 'an anion'}; its nucleus is unchanged, so it is still ${name}.`;
    if (s + small !== last) { last = s + small; readout(d.readout, s, small); }
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   SIM: the formula of an ionic compound from the charges of its ions.
   The cations stand in one row and the anions in the next, as many of
   each as make the positive and negative charges equal, and a strip of
   unit charges beneath counts the two totals against each other. Still:
   the balance is a count and nothing here has a clock.
===================================================================== */
(function () {
  const d = sim('sim-ionic-formula', 600);
  /* an ion: its formula for the canvas (subscripts after _), its charge, and its atoms as a centre with a ring and the H each ring atom carries */
  const CATIONS = {
    Na: { f: 'Na', q: 1, name: 'sodium ion', c: 'Na' },
    K: { f: 'K', q: 1, name: 'potassium ion', c: 'K' },
    Li: { f: 'Li', q: 1, name: 'lithium ion', c: 'Li' },
    Mg: { f: 'Mg', q: 2, name: 'magnesium ion', c: 'Mg' },
    Ca: { f: 'Ca', q: 2, name: 'calcium ion', c: 'Ca' },
    Sr: { f: 'Sr', q: 2, name: 'strontium ion', c: 'Sr' },
    Ba: { f: 'Ba', q: 2, name: 'barium ion', c: 'Ba' },
    Al: { f: 'Al', q: 3, name: 'aluminum ion', c: 'Al' },
    NH4: { f: 'NH_{4}', q: 1, name: 'ammonium ion', c: 'N', ring: ['H', 'H', 'H', 'H'], poly: true },
  };
  const ANIONS = {
    F: { f: 'F', q: -1, name: 'fluoride ion', c: 'F' },
    Cl: { f: 'Cl', q: -1, name: 'chloride ion', c: 'Cl' },
    Br: { f: 'Br', q: -1, name: 'bromide ion', c: 'Br' },
    I: { f: 'I', q: -1, name: 'iodide ion', c: 'I' },
    O: { f: 'O', q: -2, name: 'oxide ion', c: 'O' },
    S: { f: 'S', q: -2, name: 'sulfide ion', c: 'S' },
    N: { f: 'N', q: -3, name: 'nitride ion', c: 'N' },
    OH: { f: 'OH', q: -1, name: 'hydroxide ion', c: 'O', ring: ['H'], poly: true },
    CN: { f: 'CN', q: -1, name: 'cyanide ion', c: 'C', ring: ['N'], poly: true },
    NO3: { f: 'NO_{3}', q: -1, name: 'nitrate ion', c: 'N', ring: ['O', 'O', 'O'], poly: true },
    ClO4: { f: 'ClO_{4}', q: -1, name: 'perchlorate ion', c: 'Cl', ring: ['O', 'O', 'O', 'O'], poly: true },
    H2PO4: { f: 'H_{2}PO_{4}', q: -1, name: 'dihydrogen phosphate ion', c: 'P', ring: ['O', 'O', 'O', 'O'], hs: [0, 1], poly: true },
    O2: { f: 'O_{2}', q: -2, name: 'peroxide ion', c: 'O', ring: ['O'], poly: true },
    CO3: { f: 'CO_{3}', q: -2, name: 'carbonate ion', c: 'C', ring: ['O', 'O', 'O'], poly: true },
    SO4: { f: 'SO_{4}', q: -2, name: 'sulfate ion', c: 'S', ring: ['O', 'O', 'O', 'O'], poly: true },
    HPO4: { f: 'HPO_{4}', q: -2, name: 'hydrogen phosphate ion', c: 'P', ring: ['O', 'O', 'O', 'O'], hs: [0], poly: true },
    PO4: { f: 'PO_{4}', q: -3, name: 'phosphate ion', c: 'P', ring: ['O', 'O', 'O', 'O'], poly: true },
  };
  const opt = (T) => Object.keys(T).map((k) => ({ value: k, label: T[k].f.replace(/_{(\d)}/g, (m, g) => '₀₁₂₃₄₅₆₇₈₉'[+g]) + chargeSup(T[k].q) }));
  const arrive = F.tween(d, 1);
  const again = () => { arrive.set(0); arrive.to(1, 1100); };
  const cat = F.select(d.controls, { label: 'cation', aria: 'cation', value: 'Al', options: opt(CATIONS), ms: 0, onInput: again });
  const an = F.select(d.controls, { label: 'anion', aria: 'anion', value: 'O', options: opt(ANIONS), ms: 0, onInput: again });
  let hits = [];
  F.hover(d.stage, () => hits);
  let last = '';
  const gcd = (a, b) => (b ? gcd(b, a % b) : a);
  /* a part of the formula: a polyatomic ion needed more than once goes in parentheses */
  const part = (ion, k) => (k === 1 ? ion.f : ion.poly ? `(${ion.f})_{${k}}` : `${ion.f}_{${k}}`);
  /* one ion, drawn at (x, y) as its atoms in their element colours; returns its outer radius */
  function ion(ctx, x, y, I) {
    if (!I.ring) { disc(ctx, x, y, 30, F.el(I.c)); return 30; }
    const rc = 20, pts = [];
    const n = I.ring.length, shift = n === 1 ? -14 : 0;
    I.ring.forEach((s, i) => {
      const t = -Math.PI / 2 + (i * 2 * Math.PI) / n + (n === 1 ? Math.PI / 2 : 0);
      const r = s === 'H' ? 10 : 15, dd = rc + r - 5;
      pts.push({ s, r, x: x + shift + dd * Math.cos(t), y: y + dd * Math.sin(t), t });
    });
    /* the atoms behind the centre first, then the centre, then those in front, so the cluster reads as a solid */
    (I.hs || []).forEach((i) => { const p = pts[i]; disc(ctx, p.x + 18 * Math.cos(p.t), p.y + 18 * Math.sin(p.t), 10, F.el('H')); });
    pts.filter((p) => p.y < y).forEach((p) => disc(ctx, p.x, p.y, p.r, F.el(p.s)));
    disc(ctx, x + shift, y, rc, F.el(I.c));
    pts.filter((p) => p.y >= y).forEach((p) => disc(ctx, p.x, p.y, p.r, F.el(p.s)));
    return 48;
  }
  function draw() {
    const { ctx } = begin(d.c);
    const P = CATIONS[cat.value], N = ANIONS[an.value];
    const qp = P.q, qn = -N.q, g = gcd(qp, qn), np = qn / g, nn = qp / g, tot = np * qp;
    const k = F.ease.smooth(arrive.v);
    hits = [];
    const formula = part(P, np) + part(N, nn);
    /* the two rows, each labelled once with its ion and its count */
    const rows = [{ I: P, n: np, y: 170 }, { I: N, n: nn, y: 310 }];
    rows.forEach((row, ri) => {
      text(ctx, `${row.n} × ${row.I.f}${chargeSup(row.I.q)}`, 120, row.y, PAL.ink, { size: 24, weight: 600, base: 'middle' });
      for (let i = 0; i < row.n; i++) {
        const x = 380 + i * 150, a = F.stagger(k, ri * 3 + i, 6, 0.12);
        F.faded(ctx, a, [0, (1 - a) * 14], () => {
          const r = ion(ctx, x, row.y, row.I);
          text(ctx, chargeWord(row.I.q), x + r + 6, row.y - r + 4, C('charge'), { size: 22, weight: 600 });
        });
        hits.push({ x, y: row.y, r: 44, name: `${row.I.name}, charge ${chargeWord(row.I.q)}` });
      }
    });
    /* the formula, large, beside the rows */
    text(ctx, formula, 1130, 230, PAL.ink, { size: 60, weight: 600, align: 'center', base: 'middle' });
    text(ctx, 'formula', 1130, 300, PAL.muted, { size: 20, align: 'center' });
    /* the strip of unit charges: positive filled above, negative outlined below */
    const s = 40, x0 = 380, yp = 420, yn = 470;
    text(ctx, `${tot} positive`, 120, yp + s / 2, C('charge'), { size: 22, weight: 600, base: 'middle' });
    text(ctx, `${tot} negative`, 120, yn + s / 2, C('charge'), { size: 22, weight: 600, base: 'middle' });
    for (let i = 0; i < tot; i++) {
      const x = x0 + i * (s + 8), a = F.stagger(k, i, tot, 0.1);
      F.faded(ctx, a, [0, 0], () => {
        ctx.save(); ctx.fillStyle = alpha(C('charge'), 0.85); ctx.fillRect(x, yp, s, s); ctx.restore();
        sign(ctx, x + s / 2, yp + s / 2, 16, true);
        ctx.save(); ctx.lineWidth = 3; ctx.strokeStyle = C('charge'); ctx.strokeRect(x + 1.5, yn + 1.5, s - 3, s - 3); ctx.restore();
        sign(ctx, x + s / 2, yn + s / 2, 16, false);
      });
    }
    const w = (n) => WORDS[n], ionW = (n) => (n === 1 ? 'ion' : 'ions');
    headline(ctx, `${w(np)[0].toUpperCase() + w(np).slice(1)} ${P.f}${chargeSup(P.q)} ${ionW(np)} and ${w(nn)} ${N.f}${chargeSup(N.q)} ${ionW(nn)} carry ${w(tot)} positive and ${w(tot)} negative charge${tot > 1 ? 's' : ''}, so the formula is ${formula}.`);
    const t = `${np} \\times (\\htmlClass{kv-charge}{+${qp}}) + ${nn} \\times (\\htmlClass{kv-charge}{-${qn}}) = \\htmlClass{kv-charge}{+${tot}} \\htmlClass{kv-charge}{-${tot}} = \\htmlClass{kv-charge}{0}`;
    const small = `The compound is made of the ${P.name} and the ${N.name}${N.poly && nn > 1 ? ', set in parentheses because it is needed more than once' : ''}.`;
    if (t + small !== last) { last = t + small; readout(d.readout, t, small); }
  }
  register(d.fig, { update: () => {}, draw });
})();
};
