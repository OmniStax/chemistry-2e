/* Figures for section 4.4 Reaction Yields. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['4.4'] = function (root, F) {
const { el, fmt, tex, C, PAL, alpha, ctl, register, begin, line, arrow, text, topline } = F;
const sim = (id, H) => F.sim(root, id, H);
function readout(host, main, small) { tex(host, main); if (small) host.appendChild(el('small', null, small)); }

/* ---------- small helpers shared by the figures ---------- */
const TAU = 2 * Math.PI;
/* n significant figures, never in exponent form */
const sig = (x, n) => { const s = Math.abs(x).toPrecision(n); return s.includes('e') ? String(Number(s)) : s; };
/* a live number wrapped in the hue of its type, for the readouts */
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;
function rrect(ctx, x, y, w, h, r, fill, stroke, lw = 2, dash) {
  ctx.save(); ctx.beginPath(); ctx.roundRect(x, y, w, h, r);
  if (fill) { ctx.fillStyle = fill; ctx.fill(); }
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; if (dash) ctx.setLineDash(dash); ctx.stroke(); }
  ctx.restore();
}
function disc(ctx, elm, x, y, r) {
  ctx.save(); ctx.fillStyle = F.el(elm); ctx.strokeStyle = elm === 'H' ? PAL.ink : alpha(PAL.ink, 0.35); ctx.lineWidth = elm === 'H' ? 1.5 : 1;
  ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore();
}
/* the three molecules of the hydrogen-chlorine reaction as [element, dx, dy, radius], drawn in the element palette (rule 7) */
const MOLS = {
  H2: { atoms: [['H', -9, 0, 11], ['H', 9, 0, 11]], name: 'a hydrogen molecule, H₂' },
  Cl2: { atoms: [['Cl', -13, 0, 17], ['Cl', 13, 0, 17]], name: 'a chlorine molecule, Cl₂' },
  HCl: { atoms: [['Cl', -5, 0, 17], ['H', 16, 0, 11]], name: 'a hydrogen chloride molecule, HCl' },
};
function molecule(ctx, f, x, y) { for (const [e, dx, dy, r] of MOLS[f].atoms) disc(ctx, e, x + dx, y + dy, r); }
/* a fixed shuffle of slot indices, so that the mixture looks mixed but never jumps between redraws */
const shuffled = (n, seed) => { const a = [...Array(n).keys()]; let s = seed; for (let i = n - 1; i > 0; i--) { s = (s * 9301 + 49297) % 233280; const j = Math.floor((s / 233280) * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

/* =====================================================================
   FIGURE 4.13: the grilled cheese sandwiches. The slices provided in two
   rows, the sandwiches the recipe makes from them below, and the slices
   left over. Bread and cheese are told apart by the categorical palette,
   since they are ingredients with no element and no type. Still: the
   picture answers its sliders and nothing here has a clock.
===================================================================== */
(function () {
  const d = sim('sim-sandwich', 600);
  const Bs = ctl(d.controls, { label: '\\text{bread slices}', cls: '', min: 0, max: 30, step: 1, value: 28, unit: '', dec: 0, aria: 'slices of bread provided',
    specials: [{ at: () => (2 * Ch.v <= 30 ? 2 * Ch.v : null), label: '2 per cheese' }] });
  const Ch = ctl(d.controls, { label: '\\text{cheese slices}', cls: '', min: 0, max: 15, step: 1, value: 11, unit: '', dec: 0, aria: 'slices of cheese provided',
    specials: [{ at: () => (Bs.v % 2 === 0 && Bs.v / 2 <= 15 ? Bs.v / 2 : null), label: '1 per 2 bread' }] });
  const X0 = 250, DX = 54;
  function bread(ctx, x, y) { const c = F.cat(0); rrect(ctx, x, y, 44, 44, 12, alpha(c, 0.35), c, 3); }
  function cheese(ctx, x, y) { const c = F.cat(1); rrect(ctx, x + 3, y + 3, 38, 38, 3, alpha(c, 0.55), c, 2); }
  function sandwich(ctx, x, y) {
    const b = F.cat(0), c = F.cat(1);
    rrect(ctx, x, y, 54, 13, 5, alpha(b, 0.35), b, 2.5);
    rrect(ctx, x - 3, y + 15, 60, 7, 2, alpha(c, 0.55), c, 2);
    rrect(ctx, x, y + 24, 54, 13, 5, alpha(b, 0.35), b, 2.5);
  }
  function draw() {
    const { ctx } = begin(d.c);
    const nb = Bs.v, nc = Ch.v, s = Math.min(Math.floor(nb / 2), nc), lb = nb - 2 * s, lc = nc - s;
    /* what is provided */
    text(ctx, 'Provided with:', 60, 104, PAL.ink, { size: 22, weight: 600 });
    text(ctx, nb + ' slices of bread', 60, 150, PAL.ink, { size: 20 });
    text(ctx, nc + ' slices of cheese', 60, 262, PAL.ink, { size: 20 });
    for (let i = 0; i < nb; i++) bread(ctx, X0 + (i % 15) * DX, 128 + Math.floor(i / 15) * 54);
    for (let i = 0; i < nc; i++) cheese(ctx, X0 + i * DX, 240);
    arrow(ctx, 700, 300, 700, 348, PAL.muted, 4);
    /* what the recipe makes of it */
    text(ctx, 'We can make:', 60, 380, PAL.ink, { size: 22, weight: 600 });
    text(ctx, s + (s === 1 ? ' sandwich' : ' sandwiches'), 60, 430, PAL.ink, { size: 20 });
    for (let i = 0; i < s; i++) sandwich(ctx, X0 + i * 70, 410);
    const left = lb ? lb + (lb === 1 ? ' slice' : ' slices') + ' of bread left over' : lc ? lc + (lc === 1 ? ' slice' : ' slices') + ' of cheese left over' : 'nothing left over';
    text(ctx, left, 60, 520, PAL.ink, { size: 20 });
    for (let i = 0; i < lb; i++) bread(ctx, X0 + 120 + (i % 15) * DX, 498 + Math.floor(i / 15) * 50);
    for (let i = 0; i < lc; i++) cheese(ctx, X0 + 120 + i * DX, 498);
    const who = lb === 0 && lc === 0 ? (s ? '; the two are in the 2:1 ratio of the recipe, so nothing is left over' : '')
      : lc > 0 ? '; the bread limits the number of sandwiches and the cheese is in excess'
      : '; the cheese limits the number of sandwiches and the bread is in excess';
    topline(ctx, nb + ' slices of bread and ' + nc + ' slices of cheese make ' + s + (s === 1 ? ' sandwich' : ' sandwiches') + who + '.');
    readout(d.readout, `\\text{sandwiches} = \\text{the lesser of}\\ \\frac{${nb}\\ \\text{bread}}{2}\\ \\text{and}\\ \\frac{${nc}\\ \\text{cheese}}{1} = ${s}`,
      'Each sandwich uses two slices of bread and one slice of cheese, so the ingredient that would make fewer sandwiches decides how many are made.');
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 4.14: hydrogen and chlorine before and after reaction. The two
   panels are drawn flat, molecules in rows, because the lesson is a count
   before and after and not an arrangement in space. Each H2 takes one Cl2
   to give two HCl; the leftovers are the excess reactant. Still.
===================================================================== */
(function () {
  const d = sim('sim-hcl-limiting', 500);
  const Hn = ctl(d.controls, { label: '\\text{H}_2\\ \\text{molecules}', cls: '', min: 1, max: 10, step: 1, value: 6, unit: '', dec: 0, aria: 'molecules of hydrogen',
    specials: [{ at: () => Cl.v, label: 'equal' }] });
  const Cl = ctl(d.controls, { label: '\\text{Cl}_2\\ \\text{molecules}', cls: '', min: 1, max: 10, step: 1, value: 4, unit: '', dec: 0, aria: 'molecules of chlorine',
    specials: [{ at: () => Hn.v, label: 'equal' }] });
  let hits = []; F.hover(d.stage, () => hits);
  const PB = { y: 90, h: 340, w: 540 }, LX = 60, RX = 800;
  function panel(ctx, x, title, list, cols, rows, seed) {
    rrect(ctx, x, PB.y, PB.w, PB.h, 6, alpha(PAL.soft, 0.6), PAL.rule, 1.5);
    text(ctx, title, x + PB.w / 2, PB.y + 30, PAL.muted, { size: 20, align: 'center' });
    const gx = PB.w / cols, gy = (PB.h - 60) / rows, order = shuffled(cols * rows, seed);
    list.forEach((f, i) => {
      const k = order[i], cx = x + gx * (k % cols + 0.5), cy = PB.y + 60 + gy * (Math.floor(k / cols) + 0.5) + ((k % cols) % 2 ? 8 : -8);
      molecule(ctx, f, cx, cy); hits.push({ x: cx, y: cy, r: 28, name: MOLS[f].name });
    });
  }
  const count = (n, f) => n + ' ' + f.replace('2', '₂');
  function draw() {
    const { ctx } = begin(d.c);
    hits = [];
    const h = Hn.v, c = Cl.v, used = Math.min(h, c), hcl = 2 * used, lh = h - used, lc = c - used;
    const before = [...Array(h).fill('H2'), ...Array(c).fill('Cl2')];
    const after = [...Array(hcl).fill('HCl'), ...Array(lh).fill('H2'), ...Array(lc).fill('Cl2')];
    panel(ctx, LX, 'Before reaction', before, 5, 4, 7);
    panel(ctx, RX, 'After reaction', after, 6, 5, 11);
    arrow(ctx, LX + PB.w + 30, PB.y + PB.h / 2, RX - 30, PB.y + PB.h / 2, PAL.ink, 4);
    text(ctx, count(h, 'H2') + ' and ' + count(c, 'Cl2'), LX + PB.w / 2, PB.y + PB.h + 40, PAL.ink, { size: 22, weight: 600, align: 'center' });
    const rest = lh ? ' and ' + count(lh, 'H2') : lc ? ' and ' + count(lc, 'Cl2') : '';
    text(ctx, hcl + ' HCl' + rest, RX + PB.w / 2, PB.y + PB.h + 40, PAL.ink, { size: 22, weight: 600, align: 'center' });
    const tail = lh ? '; chlorine is the limiting reactant and hydrogen is in excess' : lc ? '; hydrogen is the limiting reactant and chlorine is in excess' : '; the reactants are in the 1:1 stoichiometric ratio and neither is left over';
    topline(ctx, count(h, 'H2') + ' and ' + count(c, 'Cl2') + ' give ' + hcl + ' HCl' + (lh ? ' and leave ' + count(lh, 'H2') : lc ? ' and leave ' + count(lc, 'Cl2') : '') + tail + '.');
    readout(d.readout, `\\text{from H}_2:\\ ${h} \\times \\frac{2\\ \\text{HCl}}{1\\ \\text{H}_2} = ${2 * h}\\ \\text{HCl}\\qquad \\text{from Cl}_2:\\ ${c} \\times \\frac{2\\ \\text{HCl}}{1\\ \\text{Cl}_2} = ${2 * c}\\ \\text{HCl}`,
      h === c ? 'Both reactants would give the same amount of HCl, so both are used up completely.' : (lh ? 'Chlorine' : 'Hydrogen') + ' would give the lesser amount of HCl, so it is the limiting reactant.');
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   SIM: Example 4.12 as a live route. Each reactant's mass is carried
   through its molar mass to moles and through the balanced equation to
   the silicon nitride it could give on its own; the bars compare the two.
   Masses in the mass hue, moles in the amount hue. Still.
===================================================================== */
(function () {
  const d = sim('sim-silicon-nitride', 470);
  const MSI = 28.09, MN2 = 28.02;
  const mSi = ctl(d.controls, { label: '\\km_{\\text{Si}}', cls: 'mass', min: 0.5, max: 4, step: 0.01, value: 2, unit: 'g', dec: 2, aria: 'mass of silicon in grams' });
  const mN = ctl(d.controls, { label: '\\km_{\\text{N}_2}', cls: 'mass', min: 0.5, max: 3, step: 0.01, value: 1.5, unit: 'g', dec: 2, aria: 'mass of nitrogen in grams',
    specials: [{ at: () => { const v = ((mSi.v / MSI) * 2 / 3) * MN2; return v >= 0.5 && v <= 3 ? Math.round(v * 100) / 100 : null; }, label: 'stoichiometric' }] });
  /* the product axis runs 0 to 0.06 mol, past the most either slider can give (4.00 g Si gives 0.0475 mol, 3.00 g N2 0.0535 mol) */
  const BX = 860, BW = 440, PMAX = 0.06, PX = (n) => BX + (n / PMAX) * BW;
  function box(ctx, x, y, w, s, type) { const c = C(type); rrect(ctx, x, y - 26, w, 52, 6, alpha(c, 0.12), c, 2.5); text(ctx, s, x + w / 2, y, c, { size: 21, weight: 600, align: 'center', base: 'middle' }); }
  function step(ctx, x1, x2, y, s) { arrow(ctx, x1, y, x2, y, PAL.muted, 3); text(ctx, s, (x1 + x2) / 2, y - 16, PAL.muted, { size: 15, align: 'center' }); }
  function draw() {
    const { ctx } = begin(d.c);
    const cm = C('mass'), cn = C('amount');
    const nSi = mSi.v / MSI, nN = mN.v / MN2, pSi = nSi / 3, pN = nN / 2;
    const eq = Math.abs(pSi - pN) / Math.max(pSi, pN) < 0.004, siLim = !eq && pSi < pN;
    const rows = [
      { y: 150, m: fmt(mSi.v, 2) + ' g Si', n: sig(nSi, 3) + ' mol Si', mm: '÷ 28.09 g/mol', f: '× 1/3', p: pSi, name: 'silicon' },
      { y: 290, m: fmt(mN.v, 2) + ' g N₂', n: sig(nN, 3) + ' mol N₂', mm: '÷ 28.02 g/mol', f: '× 1/2', p: pN, name: 'nitrogen' },
    ];
    const lesser = Math.min(pSi, pN);
    F.axes(ctx, { l: BX, r: BX + BW, t: 110, b: 340 }, [0, PMAX], [0, 1], { xl: 'mol Si₃N₄ each reactant could give', xc: cn, nx: 3, ny: 0, fx: (v) => fmt(v, 2), fy: () => '' });
    rows.forEach((r, i) => {
      box(ctx, 40, r.y, 190, r.m, 'mass');
      step(ctx, 236, 384, r.y, r.mm);
      box(ctx, 390, r.y, 220, r.n, 'amount');
      step(ctx, 620, BX - 20, r.y, r.f);
      const lim = eq || (i === 0 ? siLim : !siLim);
      rrect(ctx, BX, r.y - 22, PX(r.p) - BX, 44, 4, lim ? alpha(cn, 0.55) : alpha(cn, 0.15), cn, 2.5, lim ? null : [8, 6]);
      text(ctx, sig(r.p, 3) + ' mol Si₃N₄ from ' + r.name, BX + 6, r.y - 38, cn, { size: 19, weight: 600 });
      text(ctx, eq ? 'used up' : lim ? 'limiting reactant' : 'excess reactant', 40, r.y + 46, PAL.ink, { size: 18 });
    });
    /* the amount that actually forms, a level across both bars */
    line(ctx, PX(lesser), 110, PX(lesser), 340, PAL.ink, 2, [4, 8]);
    topline(ctx, eq ? 'Both reactants would give ' + sig(pSi, 3) + ' mol of Si₃N₄, so they are in the stoichiometric ratio and neither is in excess.'
      : 'Silicon would give ' + sig(pSi, 3) + ' mol of Si₃N₄ and nitrogen ' + sig(pN, 3) + ' mol, so ' + (siLim ? 'silicon' : 'nitrogen') + ' is the limiting reactant.');
    const ratio = nSi / nN;
    readout(d.readout, `\\frac{\\kn_{\\text{Si}}}{\\kn_{\\text{N}_2}} = \\frac{${hue('amount', sig(nSi, 3))}\\ \\text{mol Si}}{${hue('amount', sig(nN, 3))}\\ \\text{mol N}_2} = \\frac{${sig(ratio, 3)}\\ \\text{mol Si}}{1\\ \\text{mol N}_2}`,
      eq ? 'The provided ratio equals the stoichiometric ratio of 1.5 mol Si to 1 mol N₂.' : 'The stoichiometric ratio is 1.5 mol Si to 1 mol N₂, so ' + (siLim ? 'silicon is provided in less than the stoichiometric amount.' : 'nitrogen is provided in less than the stoichiometric amount.'));
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   SIM: percent yield of copper, Example 4.13. The route from grams of
   copper sulfate to grams of copper gives the theoretical yield, a dashed
   outline; the copper collected fills it. Masses in the mass hue, moles in
   the amount hue, the percent in ink. Still.
===================================================================== */
(function () {
  const d = sim('sim-percent-yield', 460);
  const MCUSO4 = 159.62, MCU = 63.55;
  const theoOf = (m) => (m / MCUSO4) * MCU;
  const mS = ctl(d.controls, { label: '\\km_{\\text{CuSO}_4}', cls: 'mass', min: 0.5, max: 2.5, step: 0.001, value: 1.274, unit: 'g', dec: 3, aria: 'mass of copper sulfate in grams' });
  const mA = ctl(d.controls, { label: '\\km_{\\text{Cu, actual}}', cls: 'mass', min: 0, max: 1, step: 0.001, value: 0.392, unit: 'g', dec: 3, aria: 'mass of copper obtained in grams',
    specials: [{ at: () => { const t = Math.round(theoOf(mS.v) * 1000) / 1000; return t <= 1 ? t : null; }, label: 'theoretical yield' }] });
  /* the mass axis runs 0 to 1.0 g, past the 0.995 g that 2.5 g of copper sulfate can give */
  const AX = 180, AW = 1000, X = (g) => AX + g * AW;
  function box(ctx, x, y, w, s, type) { const c = C(type); rrect(ctx, x, y - 26, w, 52, 6, alpha(c, 0.12), c, 2.5); text(ctx, s, x + w / 2, y, c, { size: 20, weight: 600, align: 'center', base: 'middle' }); }
  function step(ctx, x1, x2, y, s) { arrow(ctx, x1, y, x2, y, PAL.muted, 3); text(ctx, s, (x1 + x2) / 2, y - 16, PAL.muted, { size: 15, align: 'center' }); }
  function draw() {
    const { ctx } = begin(d.c);
    const cm = C('mass');
    const theo = theoOf(mS.v), n = mS.v / MCUSO4;
    if (mA.v > theo + 1e-9) mA.set(Math.floor(theo * 1000) / 1000);
    const act = mA.v, pct = theo > 0 ? (act / theo) * 100 : 0;
    /* the route to the theoretical yield */
    const y = 130;
    box(ctx, 20, y, 180, fmt(mS.v, 3) + ' g CuSO₄', 'mass');
    step(ctx, 205, 365, y, '÷ 159.62 g/mol');
    box(ctx, 370, y, 230, sig(n, 4) + ' mol CuSO₄', 'amount');
    step(ctx, 605, 695, y, '× 1/1');
    box(ctx, 700, y, 210, sig(n, 4) + ' mol Cu', 'amount');
    step(ctx, 915, 1075, y, '× 63.55 g/mol');
    box(ctx, 1080, y, 170, sig(theo, 4) + ' g Cu', 'mass');
    /* the theoretical yield as an outline, the actual yield filling it */
    const by = 230, bh = 64;
    F.axes(ctx, { l: AX, r: AX + AW, t: 210, b: 370 }, [0, 1], [0, 1], { xl: 'mass of copper (g)', xc: cm, nx: 5, ny: 0, fx: (v) => fmt(v, 1), fy: () => '' });
    rrect(ctx, X(0), by, X(act) - X(0), bh, 4, alpha(cm, 0.5), null);
    rrect(ctx, X(0), by, X(theo) - X(0), bh, 4, null, cm, 3, [10, 8]);
    text(ctx, 'theoretical yield ' + sig(theo, 4) + ' g', X(theo), by - 14, cm, { size: 19, weight: 600, align: X(theo) > 1050 ? 'right' : 'center' });
    if (act > 0) text(ctx, 'actual yield ' + fmt(act, 3) + ' g', Math.max(X(act), X(0) + 90), by + bh + 30, cm, { size: 19, weight: 600, align: 'center' });
    text(ctx, fmt(pct, 1) + '%', X(theo) + 18, by + bh / 2, PAL.ink, { size: 24, weight: 600, base: 'middle' });
    topline(ctx, 'From ' + fmt(mS.v, 3) + ' g of CuSO₄ the theoretical yield is ' + sig(theo, 4) + ' g of Cu, and ' + fmt(act, 3) + ' g collected is a ' + fmt(pct, 1) + '% yield.');
    readout(d.readout, `\\text{percent yield} = \\frac{${hue('mass', fmt(act, 3))}\\ \\text{g Cu}}{${hue('mass', sig(theo, 4))}\\ \\text{g Cu}} \\times 100\\% = ${fmt(pct, 1)}\\%`,
      pct > 99.95 ? 'All of the copper the stoichiometry allows has been collected.' : 'Both yields are in grams of copper, so the units cancel.');
  }
  register(d.fig, { update: () => {}, draw });
})();
};
