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
function sign(ctx, x, y, r, plus, color = PAL.ink) {
  const s = r * 0.5;
  line(ctx, x - s, y, x + s, y, color, 2.5);
  if (plus) line(ctx, x, y - s, x, y + s, color, 2.5);
}
const SUP = { 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', '+': '⁺', '-': '⁻' };
/* a charge as a superscript on a symbol: Na⁺, Ca²⁺, O²⁻ */
const chargeSup = (q) => (Math.abs(q) === 1 ? '' : SUP[Math.abs(q)]) + (q > 0 ? SUP['+'] : SUP['-']);
/* a charge as the book writes it in prose: 2+, 1− */
const chargeWord = (q) => Math.abs(q) + (q > 0 ? '+' : '−');
const WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six'];

/* =====================================================================
   FIGURE 2.28: an atom beside the ion it usually forms. The electrons
   sit on one dashed ring for counting (shells are not yet taught) inside
   a cloud tinted in the element's colour, the same size for every atom,
   smaller for a cation and larger for an anion as the book draws it. In
   the ion the places of the electrons lost stand empty and the electrons
   gained wear a ring. Still: an atom and its ion have no clock.
===================================================================== */
(function () {
  const d = sim('sim-na-cation', 590);
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
    selenium: { sym: 'Se', Z: 34, N: 46, q: -2, noble: 'krypton', ion: 'selenide ion' },
    bromine: { sym: 'Br', Z: 35, N: 44, q: -1, noble: 'krypton', ion: 'bromide ion' },
  };
  const pick = F.select(d.controls, { label: 'element', aria: 'element', value: 'sodium',
    options: Object.keys(ELEMENTS).map((k) => ({ value: k, label: `${k}, ${ELEMENTS[k].sym}` })) });
  let hits = [];
  F.hover(d.stage, () => hits);
  let last = '';
  const CY = 305, XA = 300, XI = 1050, R0 = 140;
  const electron = (ctx, x, y, r, a) => F.faded(ctx, a, [0, 0], () => { disc(ctx, x, y, r, F.el('e-')); sign(ctx, x, y, r, false); });
  /* one panel: the cloud, `slots` places on the ring of which the first `empty` stand empty (electrons lost) and the
     first `fresh` of the rest wear a ring (electrons gained), and the nucleus. `t0` is where the first place sits. */
  function atom(ctx, cx, E, R, a, slots, empty, fresh, t0) {
    ctx.save(); ctx.globalAlpha = a;
    ctx.beginPath(); ctx.arc(cx, CY, R + 28, 0, 2 * Math.PI);
    ctx.fillStyle = alpha(F.el(E.sym), 0.16); ctx.fill();
    ctx.setLineDash([6, 10]); ctx.lineWidth = 2; ctx.strokeStyle = alpha(PAL.ink, 0.35);
    ctx.beginPath(); ctx.arc(cx, CY, R, 0, 2 * Math.PI); ctx.stroke();
    ctx.restore();
    const re = slots > 24 ? 7 : 9, n = empty + fresh, pts = [];
    for (let k = 0; k < slots; k++) {
      const t = t0 + ((k - (n - 1) / 2) * 2 * Math.PI) / slots;
      const x = cx + R * Math.cos(t), y = CY + R * Math.sin(t);
      if (k < empty) {
        ctx.save(); ctx.globalAlpha = a; ctx.setLineDash([4, 4]); ctx.lineWidth = 2.5; ctx.strokeStyle = alpha(PAL.ink, 0.85);
        ctx.beginPath(); ctx.arc(x, y, re, 0, 2 * Math.PI); ctx.stroke(); ctx.restore();
        hits.push({ x, y, r: re + 3, name: 'place of an electron lost' });
        continue;
      }
      if (k < n) {
        ctx.save(); ctx.globalAlpha = a; ctx.lineWidth = 2.5; ctx.strokeStyle = PAL.ink;
        ctx.beginPath(); ctx.arc(x, y, re + 6, 0, 2 * Math.PI); ctx.stroke(); ctx.restore();
      }
      electron(ctx, x, y, re, a);
      hits.push({ x, y, r: re + 3, name: k < n ? 'electron gained' : 'electron' });
      pts.push([x, y]);
    }
    F.faded(ctx, a, [0, 0], () => disc(ctx, cx, CY, 16, PAL.ink));
    hits.push({ x: cx, y: CY, r: 18, name: `nucleus: ${E.Z} protons and ${E.N} neutrons` });
    return pts;
  }
  function draw() {
    const { ctx } = begin(d.c);
    const name = pick.value, E = ELEMENTS[name], a = F.ease.smooth(pick.k);
    const eIon = E.Z - E.q, n = Math.abs(E.q), cation = E.q > 0;
    hits = [];
    /* every atom is drawn the same size; the ion's ring is a fifth smaller for a cation and larger for an anion */
    const Rion = cation ? R0 * 0.8 : R0 * 1.18;
    const pts = atom(ctx, XA, E, R0, a, E.Z, 0, 0, 0);
    atom(ctx, XI, E, Rion, a, cation ? E.Z : eIon, cation ? n : 0, cation ? 0 : n, Math.PI);
    /* the two kinds, named once on the atom */
    const lead = (x1, y1, x2, y2) => line(ctx, x1, y1, x2, y2, alpha(PAL.ink, 0.55), 2);
    lead(XA + 12, CY - 8, 492, 196); text(ctx, 'nucleus', 500, 190, PAL.ink, { size: 20, base: 'middle' });
    const pe = pts.reduce((b, p) => (Math.hypot(p[0] - (XA + 115), p[1] - (CY + 80)) < Math.hypot(b[0] - (XA + 115), b[1] - (CY + 80)) ? p : b));
    lead(pe[0] + 9, pe[1] + 5, 492, 420); text(ctx, 'electron', 500, 422, PAL.ink, { size: 20, base: 'middle' });
    /* under each panel its name and its counts */
    const under = (x, title, e) => {
      text(ctx, title, x, 532, PAL.ink, { size: 22, weight: 600, align: 'center' });
      text(ctx, `${E.Z} protons, ${E.N} neutrons, ${e} electrons`, x, 566, PAL.ink, { size: 20, align: 'center' });
    };
    under(XA, `(a) ${name} atom, ${E.sym}`, E.Z);
    under(XI, `(b) ${E.ion}, ${E.sym}${chargeSup(E.q)}, ${cation ? 'a cation' : 'an anion'}`, eIon);
    /* the electrons that move: lost into the gap for a cation, taken from it for an anion */
    const mx = 690;
    F.arrow(ctx, 590, CY, 790, CY, PAL.ink, 4);
    for (let k = 0; k < n; k++) {
      const x = mx + (k - (n - 1) / 2) * 32, y = CY - 40;
      electron(ctx, x, y, 9, a);
      hits.push({ x, y, r: 12, name: cation ? 'electron lost' : 'electron gained' });
    }
    text(ctx, `${cation ? 'loses' : 'gains'} ${n} e⁻`, mx, CY + 36, PAL.ink, { size: 20, align: 'center' });
    headline(ctx, `${/^[aeiou]/.test(name) ? 'An' : 'A'} ${name} atom ${cation ? 'loses' : 'gains'} ${WORDS[n]} electron${n > 1 ? 's' : ''} to form ${E.sym}${chargeSup(E.q)}, which has ${eIon} electrons, as many as an atom of ${E.noble}.`);
    const s = `\\text{charge} = \\text{protons} - \\text{electrons} = ${E.Z} - ${eIon} = \\htmlClass{kv-charge}{${chargeWord(E.q)}}`;
    if (s !== last) { last = s; readout(d.readout, s); }
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   SIM: the formula of an ionic compound from the charges of its ions.
   Two bars of unit charges lie one over the other, positive above and
   negative below; each ion stands at the block of the bar that is its
   own charge, cations above and anions beneath, and the ions are as
   many as make the two bars the same length. Still: the balance is a
   count; new ions fade in one after another when the choice changes.
===================================================================== */
(function () {
  const d = sim('sim-ionic-formula', 500);
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
    return n === 1 ? 32 : I.hs ? 56 : I.ring[0] === 'H' ? 38 : 46;
  }
  /* the bars: U wide for each unit of charge, from X0; the cations' row above, the anions' beneath */
  const X0 = 310, CH = 46, YP = 232, YN = YP + CH + 8;
  function draw() {
    const { ctx } = begin(d.c);
    const P = CATIONS[cat.value], N = ANIONS[an.value];
    const qp = P.q, qn = -N.q, g = gcd(qp, qn), np = qn / g, nn = qp / g, tot = np * qp;
    const k = F.ease.smooth(arrive.v);
    /* a unit of charge is as wide as lets the longest bar, six units, fill the stage, and no wider than 180 */
    const U = Math.min(180, 696 / tot);
    hits = [];
    const formula = part(P, np) + part(N, nn);
    const guide = alpha(PAL.ink, 0.4), hue = C('charge');
    /* one row of ions with the bar of their charges: each ion over (or under) the block of q cells that is its charge */
    const rows = [{ I: P, n: np, q: qp, y: 150, yc: YP, up: true }, { I: N, n: nn, q: qn, y: 428, yc: YN, up: false }];
    rows.forEach((row, ri) => {
      text(ctx, `${row.n} × ${row.I.f}${chargeSup(row.I.q)}`, 40, row.y - 12, PAL.ink, { size: 24, weight: 600, base: 'middle' });
      text(ctx, row.I.name, 40, row.y + 18, PAL.muted, { size: 17, base: 'middle' });
      F.rich(ctx, ['charge ', [`${tot}${row.up ? '+' : '−'}`, hue]], 40, row.yc + CH / 2, { size: 20, base: 'middle' });
      for (let i = 0; i < row.n; i++) {
        const gl = X0 + i * row.q * U, gr = gl + row.q * U, x = (gl + gr) / 2, a = F.stagger(k, ri * 3 + i, 6, 0.12);
        F.faded(ctx, a, [0, (1 - a) * (row.up ? -14 : 14)], () => {
          const r = ion(ctx, x, row.y, row.I);
          text(ctx, chargeWord(row.I.q), x + (row.I.ring ? r : r + 4), row.y - (row.I.ring ? r - 4 : r - 6), hue, { size: 22, weight: 600 });
          /* the tie from the ion to its block */
          const yb = row.up ? row.yc - 9 : row.yc + CH + 9, ys = row.up ? row.y + r + 6 : row.y - r - 6;
          line(ctx, gl + 12, yb, gr - 12, yb, guide, 2); line(ctx, x, ys, x, yb, guide, 2);
          line(ctx, gl + 12, yb, gl + 12, yb + (row.up ? 5 : -5), guide, 2); line(ctx, gr - 12, yb, gr - 12, yb + (row.up ? 5 : -5), guide, 2);
          for (let j = 0; j < row.q; j++) {
            const cl = gl + j * U + (j === 0 ? 12 : 3), cr = gl + (j + 1) * U - (j === row.q - 1 ? 12 : 3);
            ctx.save();
            if (row.up) { ctx.fillStyle = alpha(hue, 0.85); ctx.fillRect(cl, row.yc, cr - cl, CH); }
            else { ctx.lineWidth = 3; ctx.strokeStyle = hue; ctx.strokeRect(cl + 1.5, row.yc + 1.5, cr - cl - 3, CH - 3); }
            ctx.restore();
            sign(ctx, (cl + cr) / 2, row.yc + CH / 2, 18, row.up, row.up ? PAL.panel : PAL.ink);
          }
        });
        hits.push({ x, y: row.y, r: 46, name: `${row.I.name}, charge ${chargeWord(row.I.q)}` });
        hits.push({ x, y: row.yc + CH / 2, r: CH / 2 + 2, name: `the ${chargeWord(row.I.q)} charge of one ${row.I.name}` });
      }
    });
    /* the formula, large, beside the bars */
    const fs = Math.min(64, (64 * 310) / F.measure(ctx, formula, { size: 64, weight: 600 }));
    text(ctx, formula, 1215, YP + CH + 4, PAL.ink, { size: fs, weight: 600, align: 'center', base: 'middle' });
    const w = (n) => WORDS[n], ionW = (n) => (n === 1 ? 'ion' : 'ions');
    headline(ctx, `${w(np)[0].toUpperCase() + w(np).slice(1)} ${P.f}${chargeSup(P.q)} ${ionW(np)} and ${w(nn)} ${N.f}${chargeSup(N.q)} ${ionW(nn)} carry ${w(tot)} positive and ${w(tot)} negative charge${tot > 1 ? 's' : ''}, so the formula is ${formula}.`);
    const t = `${np} \\times (\\htmlClass{kv-charge}{+${qp}}) + ${nn} \\times (\\htmlClass{kv-charge}{-${qn}}) = \\htmlClass{kv-charge}{+${tot}} \\htmlClass{kv-charge}{-${tot}} = \\htmlClass{kv-charge}{0}`;
    const twice = [P.poly && np > 1 ? [P, np] : null, N.poly && nn > 1 ? [N, nn] : null].filter(Boolean);
    const small = twice.length ? `${twice.map(([I]) => `The ${I.name}`).join(' and the ').replace('and the The', 'and the')} ${twice.length > 1 ? 'are each' : 'is'} needed more than once, so ${twice.length > 1 ? 'each goes' : 'it goes'} in parentheses.` : '';
    if (t + small !== last) { last = t + small; readout(d.readout, t, small); }
  }
  register(d.fig, { update: () => {}, draw });
})();
};
