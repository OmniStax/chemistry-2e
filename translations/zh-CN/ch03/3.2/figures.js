/* Figures for section 3.2 Determining Empirical and Molecular Formulas. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['3.2'] = function (root, F) {
const { el, tex, C, PAL, alpha, ctl, register, begin, line, arrow, text, headline } = F;
const sim = (id, H) => F.sim(root, id, H);
const still = (d, draw) => register(d.fig, { update: () => {}, draw });
function readout(host, main, small) { tex(host, main); if (small) host.appendChild(el('small', null, small)); }
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;
const sig = (x, n = 4) => { const e = Math.floor(Math.log10(Math.abs(x))); return x.toFixed(Math.max(0, n - 1 - e)); };

/* =====================================================================
   FIGURE 3.11: the book's six-box chart for elements A and X, each box
   showing its live value, with the sample's percent composition as a bar
   above it and the empirical formula unit drawn in element colours.
   Still: the values answer the sliders and the sample choice.
===================================================================== */
(function () {
  const d = sim('sim-empirical', 540);
  const MM = { Fe: 55.85, O: 16.00, C: 12.01, H: 1.008, Cl: 35.45 };
  const MMS = { Fe: '55.85', O: '16.00', C: '12.01', H: '1.008', Cl: '35.45' };
  const NAME = { Fe: '铁', O: '氧', C: '碳', H: '氢', Cl: '氯' };
  /* the book's samples; each slider runs from about a fifth to twice the book's mass */
  const SAMPLES = [
    { label: '赤铁矿', ref: 'hematite', name: '赤铁矿样品', a: 'Fe', x: 'O', ma: 34.97, mx: 15.03, ra: [5, 70, 0.01, 2], rx: [2, 40, 0.01, 2] },
    { label: '碳和氢', ref: 'ch-sample', name: '碳和氢的样品', a: 'C', x: 'H', ma: 1.71, mx: 0.287, ra: [0.2, 4, 0.01, 2], rx: [0.03, 0.6, 0.001, 3] },
    { label: '氯和氧', ref: 'clo-sample', name: '氯和氧的样品', a: 'Cl', x: 'O', ma: 5.31, mx: 8.40, ra: [0.5, 12, 0.01, 2], rx: [1, 20, 0.01, 2] },
    { label: '发酵产生的气体', ref: 'gas', name: '发酵产生的气体', a: 'C', x: 'O', ma: 27.29, mx: 72.71, ra: [5, 60, 0.01, 2], rx: [10, 150, 0.01, 2] },
  ];
  let S = SAMPLES[0];
  const mLabel = (sym) => `\\km_{\\text{${sym}}}`;
  const rangeOf = (r, v) => ({ min: r[0], max: r[1], step: r[2], dec: r[3], unit: 'g', value: v });
  const pick = F.select(d.controls, { label: '\\text{样品}', aria: '所分析的样品',
    options: SAMPLES.map((s, i) => ({ value: String(i), label: s.label })), value: '0',
    onInput: () => {
      S = SAMPLES[+pick.value];
      mA.relabel(mLabel(S.a), `${NAME[S.a]}的质量`); mX.relabel(mLabel(S.x), `${NAME[S.x]}的质量`);
      mA.range(rangeOf(S.ra, S.ma)); mX.range(rangeOf(S.rx, S.mx));
    } });
  const mA = ctl(d.controls, { label: mLabel('Fe'), cls: 'mass', min: 5, max: 70, step: 0.01, value: 34.97, unit: 'g', dec: 2, aria: '铁的质量' });
  const mX = ctl(d.controls, { label: mLabel('O'), cls: 'mass', min: 2, max: 40, step: 0.01, value: 15.03, unit: 'g', dec: 2, aria: '氧的质量' });
  const hits = [];
  F.hover(d.stage, () => hits);

  /* the smallest whole multiplier up to 6 that brings every subscript within 0.08 of a whole number */
  function whole(r) {
    for (let k = 1; k <= 6; k++) if (r.every((x) => Math.abs(x * k - Math.round(x * k)) <= 0.08)) return { k, n: r.map((x) => Math.round(x * k)) };
    return null;
  }
  const sub = (sym, n) => (n === 1 ? sym : `${sym}_{${n}}`);

  function box(ctx, x, y, w, h, color, name, value, valueColor) {
    ctx.save(); ctx.beginPath(); ctx.roundRect(x - w / 2, y - h / 2, w, h, 8);
    ctx.fillStyle = color === PAL.ink ? PAL.soft : alpha(color, 0.12); ctx.fill();
    ctx.lineWidth = 3; ctx.strokeStyle = color; ctx.stroke(); ctx.restore();
    text(ctx, name, x, y - 15, PAL.ink, { size: 17, align: 'center' });
    text(ctx, value, x, y + 16, valueColor ?? color, { size: 21, weight: 600, align: 'center' });
  }
  function step(ctx, x1, x2, y, words, value) {
    arrow(ctx, x1, y, x2, y, PAL.ink, 4);
    text(ctx, value, (x1 + x2) / 2, y - 17, PAL.ink, { size: 17, align: 'center' });
    words.forEach((w, i) => text(ctx, w, (x1 + x2) / 2, y + 22 + 20 * i, PAL.muted, { size: 17, align: 'center' }));
  }
  function atom(ctx, x, y, sym) {
    ctx.save(); ctx.beginPath(); ctx.arc(x, y, 15, 0, Math.PI * 2); ctx.fillStyle = F.el(sym); ctx.fill();
    ctx.lineWidth = 1.5; ctx.strokeStyle = PAL.ink; ctx.stroke(); ctx.restore();
    hits.push({ x, y, r: 16, name: `${sym}，${NAME[sym]}` });
  }

  function draw() {
    const { ctx } = begin(d.c); hits.length = 0;
    const A = S.a, X = S.x, ma = mA.v, mx = mX.v, total = ma + mx;
    const na = ma / MM[A], nx = mx / MM[X], low = Math.min(na, nx);
    const ra = na / low, rx = nx / low, w = whole([ra, rx]);
    const formula = w ? sub(A, w.n[0]) + sub(X, w.n[1]) : null;
    const fmtM = (m, r) => m.toFixed(r[3]);

    /* percent composition: the sample's mass split by element (bar 140 to 1260) */
    const bx0 = 140, bx1 = 1260, by = 112, bh = 36, split = bx0 + (bx1 - bx0) * (ma / total);
    [[bx0, split, A], [split, bx1, X]].forEach(([x0, x1, sym]) => {
      ctx.save(); ctx.fillStyle = alpha(F.el(sym), 0.45); ctx.fillRect(x0, by, x1 - x0, bh);
      ctx.lineWidth = 2; ctx.strokeStyle = PAL.ink; ctx.strokeRect(x0, by, x1 - x0, bh); ctx.restore();
      if (x1 - x0 > 50) text(ctx, sym, (x0 + x1) / 2, by + bh / 2, PAL.ink, { size: 20, weight: 600, align: 'center' });
    });
    /* the sample itself, outlined in its referent's colour */
    ctx.save(); ctx.lineWidth = 4; ctx.strokeStyle = F.ref(S.ref); ctx.strokeRect(bx0 - 3, by - 3, bx1 - bx0 + 6, bh + 6); ctx.restore();
    for (let x = bx0 + 18; x < bx1; x += 36) hits.push({ x, y: by + bh / 2, r: 18, name: S.name });
    const pa = (100 * ma) / total;
    text(ctx, `% ${A} = ${pa.toFixed(2)}%`, bx0, by + bh + 24, PAL.ink, { size: 19 });
    text(ctx, `% ${X} = ${(100 - pa).toFixed(2)}%`, bx1, by + bh + 24, PAL.ink, { size: 19, align: 'right' });
    text(ctx, `样品质量 ${total.toFixed(2)} g`, 700, by + bh + 24, C('mass'), { size: 19, weight: 600, align: 'center' });

    /* the chart: mass to moles for each element, joined, divided by the lower, made whole */
    const yA = 262, yX = 402, yM = 332, bw = 200, bhh = 76;
    const xMass = 120, xMol = 480, xJoin = 620, xRatio = 890, xForm = 1240;
    [[A, ma, na, yA, S.ra], [X, mx, nx, yX, S.rx]].forEach(([sym, m, n, y, r]) => {
      box(ctx, xMass, y, bw, bhh, C('mass'), `${sym} 原子的质量`, `${fmtM(m, r)} g`);
      box(ctx, xMol, y, bw, bhh, C('amount'), `${sym} 原子的物质的量`, `${sig(n)} mol`);
      step(ctx, xMass + bw / 2 + 6, xMol - bw / 2 - 6, y, ['除以', '摩尔质量'], `÷ ${MMS[sym]} g/mol`);
      line(ctx, xMol + bw / 2, y, xJoin, y, PAL.ink, 3);
    });
    line(ctx, xJoin, yA, xJoin, yX, PAL.ink, 3);
    step(ctx, xJoin, xRatio - bw / 2 - 6, yM, ['除以最小的', '物质的量'], `÷ ${sig(low)} mol`);
    box(ctx, xRatio, yM, bw, bhh, PAL.ink, `${A} : ${X} 物质的量之比`, `${ra.toFixed(3)} : ${rx.toFixed(3)}`, PAL.ink);
    step(ctx, xRatio + bw / 2 + 6, xForm - bw / 2 - 6, yM, ['化为最小的', '整数'], w ? `× ${w.k}` : '× ?');
    box(ctx, xForm, yM, bw, bhh, PAL.ink, '实验式', formula ?? '无简单整数比', formula ? PAL.ink : PAL.muted);

    /* the empirical formula unit in the book's atom colours */
    if (w && w.n[0] + w.n[1] <= 14) {
      const atoms = [...Array(w.n[0]).fill(A), ...Array(w.n[1]).fill(X)], per = 7;
      atoms.forEach((sym, i) => {
        const row = Math.floor(i / per), inRow = Math.min(per, atoms.length - row * per), j = i % per;
        atom(ctx, xForm + (j - (inRow - 1) / 2) * 34, yM + 76 + row * 34, sym);
      });
    }

    headline(ctx, formula
      ? `${fmtM(ma, S.ra)} g ${A} 和 ${fmtM(mx, S.rx)} g ${X} 含有 ${sig(na)} mol ${A} 和 ${sig(nx)} mol ${X}，所以实验式为 ${formula}。`
      : `${fmtM(ma, S.ra)} g ${A} 和 ${fmtM(mx, S.rx)} g ${X} 含有 ${sig(na)} mol ${A} 和 ${sig(nx)} mol ${X}，这个比值找不到合适的小整数。`);
    readout(d.readout,
      `\\kn_{\\text{${A}}} = \\frac{\\km_{\\text{${A}}}}{\\kMM_{\\text{${A}}}} = \\frac{${hue('mass', `${fmtM(ma, S.ra)}\\ \\text{g}`)}}{${hue('mass', `${MMS[A]}\\ \\text{g/mol}`)}} = ${hue('amount', `${sig(na)}\\ \\text{mol}`)}`,
      w ? `用 ${sig(low)} mol 去除两个物质的量，得到 ${ra.toFixed(3)} 比 ${rx.toFixed(3)}${w.k > 1 ? `，再乘以 ${w.k} 得到整数` : ''}。`
        : `用 ${sig(low)} mol 去除两个物质的量，得到 ${ra.toFixed(3)} 比 ${rx.toFixed(3)}，乘以不超过 6 的任何倍数都不能使两者同时为整数。`);
  }
  still(d, draw);
})();
};
