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
  H2: { atoms: [['H', -9, 0, 11], ['H', 9, 0, 11]], name: '氢分子 H₂' },
  Cl2: { atoms: [['Cl', -13, 0, 17], ['Cl', 13, 0, 17]], name: '氯分子 Cl₂' },
  HCl: { atoms: [['Cl', -5, 0, 17], ['H', 16, 0, 11]], name: '氯化氢分子 HCl' },
};
function molecule(ctx, f, x, y) { for (const [e, dx, dy, r] of MOLS[f].atoms) disc(ctx, e, x + dx, y + dy, r); }
/* a fixed shuffle of slot indices, so that the mixture looks mixed but never jumps between redraws */
const shuffled = (n, seed) => { const a = [...Array(n).keys()]; let s = seed; for (let i = n - 1; i > 0; i--) { s = (s * 9301 + 49297) % 233280; const j = Math.floor((s / 233280) * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

/* =====================================================================
   FIGURE 4.13: the grilled cheese sandwiches. The slices provided in two
   rows, the sandwiches the recipe makes from them below, and the slices
   left over. Bread and cheese are the section's referents, each slice and
   its count in its own colour, since they are ingredients with no element
   and no type. Still: the picture answers its sliders and nothing here
   has a clock.
===================================================================== */
(function () {
  const d = sim('sim-sandwich', 600);
  const Bs = ctl(d.controls, { label: '\\text{面包片}', cls: '', min: 0, max: 30, step: 1, value: 28, unit: '', dec: 0, aria: '所提供的面包片数',
    specials: [{ at: () => (2 * Ch.v <= 30 ? 2 * Ch.v : null), label: '每片奶酪配 2 片' }] });
  const Ch = ctl(d.controls, { label: '\\text{奶酪片}', cls: '', min: 0, max: 15, step: 1, value: 11, unit: '', dec: 0, aria: '所提供的奶酪片数',
    specials: [{ at: () => (Bs.v % 2 === 0 && Bs.v / 2 <= 15 ? Bs.v / 2 : null), label: '每 2 片面包配 1 片' }] });
  const X0 = 250, DX = 54;
  /* a slice of bread face on: a square body under the domed crust */
  function bread(ctx, x, y) {
    const c = F.ref('bread'), w = 44, h = 44;
    ctx.save(); ctx.beginPath(); ctx.moveTo(x + 0.12 * w, y + h); ctx.lineTo(x + 0.88 * w, y + h); ctx.lineTo(x + 0.88 * w, y + 0.42 * h);
    ctx.bezierCurveTo(x + 1.1 * w, y + 0.3 * h, x + 1.02 * w, y - 0.06 * h, x + 0.5 * w, y);
    ctx.bezierCurveTo(x - 0.02 * w, y - 0.06 * h, x - 0.1 * w, y + 0.3 * h, x + 0.12 * w, y + 0.42 * h); ctx.closePath();
    ctx.fillStyle = alpha(c, 0.35); ctx.fill(); ctx.strokeStyle = c; ctx.lineWidth = 3; ctx.lineJoin = 'round'; ctx.stroke(); ctx.restore();
  }
  function cheese(ctx, x, y) { const c = F.ref('cheese'); rrect(ctx, x + 3, y + 3, 38, 38, 3, alpha(c, 0.55), c, 2); }
  function sandwich(ctx, x, y) {
    const b = F.ref('bread'), c = F.ref('cheese');
    rrect(ctx, x, y, 54, 13, 5, alpha(b, 0.35), b, 2.5);
    rrect(ctx, x - 3, y + 15, 60, 7, 2, alpha(c, 0.55), c, 2);
    rrect(ctx, x, y + 24, 54, 13, 5, alpha(b, 0.35), b, 2.5);
  }
  function draw() {
    const { ctx } = begin(d.c);
    const nb = Bs.v, nc = Ch.v, s = Math.min(Math.floor(nb / 2), nc), lb = nb - 2 * s, lc = nc - s;
    /* what is provided */
    text(ctx, '提供：', 60, 104, PAL.ink, { size: 22, weight: 600 });
    text(ctx, nb + ' 片面包', 60, 150, F.ref('bread'), { size: 20 });
    text(ctx, nc + ' 片奶酪', 60, 262, F.ref('cheese'), { size: 20 });
    for (let i = 0; i < nb; i++) bread(ctx, X0 + (i % 15) * DX, 128 + Math.floor(i / 15) * 54);
    for (let i = 0; i < nc; i++) cheese(ctx, X0 + i * DX, 240);
    arrow(ctx, 700, 300, 700, 348, PAL.muted, 4);
    /* what the recipe makes of it */
    text(ctx, '可以做出：', 60, 380, PAL.ink, { size: 22, weight: 600 });
    text(ctx, s + ' 份三明治', 60, 430, PAL.ink, { size: 20 });
    for (let i = 0; i < s; i++) sandwich(ctx, X0 + i * 70, 410);
    const left = lb ? '剩下 ' + lb + ' 片面包' : lc ? '剩下 ' + lc + ' 片奶酪' : '没有剩下';
    text(ctx, left, 60, 520, PAL.ink, { size: 20 });
    for (let i = 0; i < lb; i++) bread(ctx, X0 + 120 + (i % 15) * DX, 498 + Math.floor(i / 15) * 50);
    for (let i = 0; i < lc; i++) cheese(ctx, X0 + 120 + i * DX, 498);
    const who = lb === 0 && lc === 0 ? (s ? '；二者符合食谱的 2:1 比例，所以没有剩下' : '')
      : lc > 0 ? '；面包限制了三明治的数量，奶酪过量'
      : '；奶酪限制了三明治的数量，面包过量';
    topline(ctx, nb + ' 片面包和 ' + nc + ' 片奶酪可做出 ' + s + ' 份三明治' + who + '。');
    readout(d.readout, `\\text{三明治份数} = \\text{取较小者：}\\ \\frac{${nb}\\ \\text{面包}}{2}\\ \\text{与}\\ \\frac{${nc}\\ \\text{奶酪}}{1} = ${s}`);
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
  const Hn = ctl(d.controls, { label: '\\text{H}_2\\ \\text{分子数}', cls: '', min: 1, max: 10, step: 1, value: 6, unit: '', dec: 0, aria: '氢分子数',
    specials: [{ at: () => Cl.v, label: '相等' }] });
  const Cl = ctl(d.controls, { label: '\\text{Cl}_2\\ \\text{分子数}', cls: '', min: 1, max: 10, step: 1, value: 4, unit: '', dec: 0, aria: '氯分子数',
    specials: [{ at: () => Hn.v, label: '相等' }] });
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
  const count = (n, f) => n + ' 个 ' + f.replace('2', '₂') + ' 分子';
  function draw() {
    const { ctx } = begin(d.c);
    hits = [];
    const h = Hn.v, c = Cl.v, used = Math.min(h, c), hcl = 2 * used, lh = h - used, lc = c - used;
    const before = [...Array(h).fill('H2'), ...Array(c).fill('Cl2')];
    const after = [...Array(hcl).fill('HCl'), ...Array(lh).fill('H2'), ...Array(lc).fill('Cl2')];
    panel(ctx, LX, '反应前', before, 5, 4, 7);
    panel(ctx, RX, '反应后', after, 6, 5, 11);
    arrow(ctx, LX + PB.w + 30, PB.y + PB.h / 2, RX - 30, PB.y + PB.h / 2, PAL.ink, 4);
    text(ctx, count(h, 'H2') + '和 ' + count(c, 'Cl2'), LX + PB.w / 2, PB.y + PB.h + 40, PAL.ink, { size: 22, weight: 600, align: 'center' });
    const rest = lh ? '和 ' + count(lh, 'H2') : lc ? '和 ' + count(lc, 'Cl2') : '';
    text(ctx, hcl + ' 个 HCl 分子' + rest, RX + PB.w / 2, PB.y + PB.h + 40, PAL.ink, { size: 22, weight: 600, align: 'center' });
    const tail = lh ? '；氯是限量反应物，氢过量' : lc ? '；氢是限量反应物，氯过量' : '；反应物处于 1:1 的化学计量比，都没有剩下';
    topline(ctx, count(h, 'H2') + '和 ' + count(c, 'Cl2') + '生成 ' + hcl + ' 个 HCl 分子' + (lh ? '，并剩下 ' + count(lh, 'H2') : lc ? '，并剩下 ' + count(lc, 'Cl2') : '') + tail + '。');
    readout(d.readout, `\\text{由 H}_2:\\ ${h} \\times \\frac{2\\ \\text{HCl}}{1\\ \\text{H}_2} = ${2 * h}\\ \\text{HCl}\\qquad \\text{由 Cl}_2:\\ ${c} \\times \\frac{2\\ \\text{HCl}}{1\\ \\text{Cl}_2} = ${2 * c}\\ \\text{HCl}`);
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
  const mSi = ctl(d.controls, { label: '\\km_{\\text{Si}}', cls: 'mass', min: 0.5, max: 4, step: 0.01, value: 2, unit: 'g', dec: 2, aria: '硅的质量，单位克' });
  const mN = ctl(d.controls, { label: '\\km_{\\text{N}_2}', cls: 'mass', min: 0.5, max: 3, step: 0.01, value: 1.5, unit: 'g', dec: 2, aria: '氮的质量，单位克',
    specials: [{ at: () => { const v = ((mSi.v / MSI) * 2 / 3) * MN2; return v >= 0.5 && v <= 3 ? Math.round(v * 100) / 100 : null; }, label: '化学计量比' }] });
  /* the product axis runs 0 to 0.06 mol, past the most either slider can give (4.00 g Si gives 0.0475 mol, 3.00 g N2 0.0535 mol) */
  const BX = 860, BW = 440, PMAX = 0.06, PX = (n) => BX + (n / PMAX) * BW;
  function box(ctx, x, y, w, s, type) { const c = C(type); rrect(ctx, x, y - 26, w, 52, 6, alpha(c, 0.12), c, 2.5); text(ctx, s, x + w / 2, y, c, { size: 21, weight: 600, align: 'center', base: 'middle' }); }
  function step(ctx, x1, x2, y, s) { arrow(ctx, x1, y, x2, y, PAL.muted, 3); text(ctx, s, (x1 + x2) / 2, y - 40, PAL.muted, { size: 15, align: 'center' }); }
  function draw() {
    const { ctx } = begin(d.c);
    const cm = C('mass'), cn = C('amount');
    const nSi = mSi.v / MSI, nN = mN.v / MN2, pSi = nSi / 3, pN = nN / 2;
    const eq = Math.abs(pSi - pN) / Math.max(pSi, pN) < 0.004, siLim = !eq && pSi < pN;
    const rows = [
      { y: 150, m: fmt(mSi.v, 2) + ' g Si', n: sig(nSi, 3) + ' mol Si', mm: '÷ 28.09 g/mol', f: '× 1/3', p: pSi, name: '硅' },
      { y: 290, m: fmt(mN.v, 2) + ' g N₂', n: sig(nN, 3) + ' mol N₂', mm: '÷ 28.02 g/mol', f: '× 1/2', p: pN, name: '氮' },
    ];
    const lesser = Math.min(pSi, pN);
    F.axes(ctx, { l: BX, r: BX + BW, t: 110, b: 340 }, [0, PMAX], [0, 1], { xl: '每种反应物所能生成的 mol Si₃N₄', xc: cn, nx: 3, ny: 0, fx: (v) => fmt(v, 2), fy: () => '' });
    rows.forEach((r, i) => {
      box(ctx, 40, r.y, 190, r.m, 'mass');
      step(ctx, 236, 384, r.y, r.mm);
      box(ctx, 390, r.y, 220, r.n, 'amount');
      step(ctx, 620, BX - 20, r.y, r.f);
      const lim = eq || (i === 0 ? siLim : !siLim);
      rrect(ctx, BX, r.y - 22, PX(r.p) - BX, 44, 4, lim ? alpha(cn, 0.55) : alpha(cn, 0.15), cn, 2.5, lim ? null : [8, 6]);
      text(ctx, sig(r.p, 3) + ' mol Si₃N₄（来自' + r.name + '）', BX + 6, r.y - 38, cn, { size: 19, weight: 600 });
      text(ctx, eq ? '用完' : lim ? '限量反应物' : '过量反应物', 40, r.y + 46, PAL.ink, { size: 18 });
    });
    /* the amount that actually forms, a level across both bars */
    rows.forEach((r) => line(ctx, PX(lesser), r.y - 28, PX(lesser), r.y + 28, PAL.ink, 2, [4, 8]));
    topline(ctx, eq ? '两种反应物都会生成 ' + sig(pSi, 3) + ' mol Si₃N₄，所以它们处于化学计量比，都不过量。'
      : '硅会生成 ' + sig(pSi, 3) + ' mol Si₃N₄，氮会生成 ' + sig(pN, 3) + ' mol，所以' + (siLim ? '硅' : '氮') + '是限量反应物。');
    const ratio = nSi / nN;
    readout(d.readout, `\\frac{\\kn_{\\text{Si}}}{\\kn_{\\text{N}_2}} = \\frac{${hue('amount', sig(nSi, 3))}\\ \\text{mol Si}}{${hue('amount', sig(nN, 3))}\\ \\text{mol N}_2} = \\frac{${sig(ratio, 3)}\\ \\text{mol Si}}{1\\ \\text{mol N}_2}`,
      '化学计量比为 1.5 mol Si 比 1 mol N₂。');
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
  const mS = ctl(d.controls, { label: '\\km_{\\text{CuSO}_4}', cls: 'mass', min: 0.5, max: 2.5, step: 0.001, value: 1.274, unit: 'g', dec: 3, aria: '硫酸铜的质量，单位克' });
  const mA = ctl(d.controls, { label: '\\km_{\\text{Cu, 实际}}', cls: 'mass', min: 0, max: 1, step: 0.001, value: 0.392, unit: 'g', dec: 3, aria: '所得铜的质量，单位克',
    specials: [{ at: () => { const t = Math.round(theoOf(mS.v) * 1000) / 1000; return t <= 1 ? t : null; }, label: '理论产量' }] });
  /* the mass axis runs 0 to 1.0 g, past the 0.995 g that 2.5 g of copper sulfate can give */
  const AX = 180, AW = 1000, X = (g) => AX + g * AW;
  function box(ctx, x, y, w, s, type) { const c = C(type); rrect(ctx, x, y - 26, w, 52, 6, alpha(c, 0.12), c, 2.5); text(ctx, s, x + w / 2, y, c, { size: 20, weight: 600, align: 'center', base: 'middle' }); }
  function step(ctx, x1, x2, y, s) { arrow(ctx, x1, y, x2, y, PAL.muted, 3); text(ctx, s, (x1 + x2) / 2, y - 40, PAL.muted, { size: 15, align: 'center' }); }
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
    F.axes(ctx, { l: AX, r: AX + AW, t: 210, b: 370 }, [0, 1], [0, 1], { xl: '铜的质量（g）', xc: cm, nx: 5, ny: 0, fx: (v) => fmt(v, 1), fy: () => '' });
    rrect(ctx, X(0), by, X(act) - X(0), bh, 4, alpha(cm, 0.5), null);
    rrect(ctx, X(0), by, X(theo) - X(0), bh, 4, null, cm, 3, [10, 8]);
    text(ctx, '理论产量 ' + sig(theo, 4) + ' g', X(theo), by - 14, cm, { size: 19, weight: 600, align: X(theo) > 1050 ? 'right' : 'center' });
    if (act > 0) text(ctx, '实际产量 ' + fmt(act, 3) + ' g', Math.max(X(act), X(0) + 90), by + bh + 30, cm, { size: 19, weight: 600, align: 'center' });
    text(ctx, fmt(pct, 1) + '%', X(theo) + 18, by + bh / 2, PAL.ink, { size: 24, weight: 600, base: 'middle' });
    topline(ctx, '由 ' + fmt(mS.v, 3) + ' g CuSO₄ 算得 Cu 的理论产量为 ' + sig(theo, 4) + ' g，收集到 ' + fmt(act, 3) + ' g，产率为 ' + fmt(pct, 1) + '%。');
    readout(d.readout, `\\text{产率} = \\frac{${hue('mass', fmt(act, 3))}\\ \\text{g Cu}}{${hue('mass', sig(theo, 4))}\\ \\text{g Cu}} \\times 100\\% = ${fmt(pct, 1)}\\%`,
      pct > 99.95 ? '化学计量所允许的铜已全部收集。' : '两种产量都以克铜计，所以单位约去。');
  }
  register(d.fig, { update: () => {}, draw });
})();
};
