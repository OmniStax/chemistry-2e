/* Figures for section 4.3 Reaction Stoichiometry. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['4.3'] = function (root, F) {
const { tex, C, PAL, alpha, ctl, register, begin, line, arrow, text } = F;
const sim = (id, H) => F.sim(root, id, H);
const still = (d, draw) => register(d.fig, { update: () => {}, draw });
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;
const NA = 6.022e23;

/* ---------- a number to sf significant figures: plain where its digits fit, else in powers of ten ---------- */
const SUP = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
function parts(x, sf) {
  if (x === 0) return { m: '0', e: 0 };
  x *= 1 + 1e-12;
  let e = Math.floor(Math.log10(Math.abs(x)));
  if (Number((x / 10 ** e).toFixed(sf - 1)) >= 10) e += 1;
  if (e >= -2 && e < sf) return { m: x.toFixed(sf - 1 - e), e: 0 };
  return { m: (x / 10 ** e).toFixed(sf - 1), e };
}
const sciTex = (x, sf) => { const p = parts(x, sf); return p.e ? `${p.m}\\times 10^{${p.e}}` : p.m; };
const sciTxt = (x, sf) => { const p = parts(x, sf); return p.e ? `${p.m} × 10${String(p.e).split('').map((c) => SUP[c]).join('')}` : p.m; };

/* =====================================================================
   SIM: N2 + 3 H2 -> 2 NH3 counted in molecules, dozens or moles. Each
   row is the equation once: one N2 and three H2 give two NH3. The slider
   sets how many rows react, the choice the unit they are counted in.
   Still: the rows answer the slider. Molecules in element colours.
===================================================================== */
(function () {
  const d = sim('sim-ammonia', 550);
  const unitWord = (k, u) => (u === 'molecules' ? `${k} molecule${k === 1 ? '' : 's'}` : u === 'doz' ? `${k} doz` : `${k} mol`);
  let U = null;
  const H2 = ctl(d.controls, { label: '\\text{H}_2', cls: '', min: 3, max: 18, step: 3, value: 9, unit: '', fmt: (v) => unitWord(v, U ? U.value : 'molecules'),
    aria: 'amount of hydrogen that reacts', detents: [3, 6, 9, 12, 15, 18] });
  U = F.choice(d.controls, { label: '\\text{counted in}', aria: 'unit the molecules are counted in', value: 'molecules',
    options: [{ value: 'molecules', label: 'molecules' }, { value: 'doz', label: 'dozens' }, { value: 'mol', label: 'moles' }], onInput: () => H2.refresh() });
  const hits = [];
  F.hover(d.stage, () => hits);
  function atom(ctx, x, y, sym, r) {
    ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fillStyle = F.el(sym); ctx.fill();
    ctx.lineWidth = 2; ctx.strokeStyle = PAL.ink; ctx.stroke(); ctx.restore();
  }
  const pair = (ctx, x, y, sym, r, name) => { atom(ctx, x - r * 0.8, y, sym, r); atom(ctx, x + r * 0.8, y, sym, r); hits.push({ x, y, r: 2 * r, name }); };
  function ammonia(ctx, x, y) {
    [[-1, 0.62], [1, 0.62], [0, -1.05]].forEach(([dx, dy]) => atom(ctx, x + dx * 21, y + dy * 21, 'H', 12));
    atom(ctx, x, y, 'N', 19); hits.push({ x, y, r: 36, name: 'NH₃, ammonia' });
  }
  /* columns: N2, the plus, three H2, the arrow, two NH3 */
  const XN = 200, XP = 345, XH = [470, 590, 710], XA = [810, 930], XM = [1045, 1190], PITCH = 70, TOP = 84, ROWS = 6;
  function draw() {
    const { ctx } = begin(d.c); hits.length = 0;
    const h = H2.v, rows = h / 3, n2 = rows, nh3 = 2 * rows, u = U.value;
    const head = (k, f, x) => F.rich(ctx, u === 'molecules' ? [`${k} ${f} molecule${k === 1 ? '' : 's'}`] : [[unitWord(k, u), u === 'mol' ? C('amount') : PAL.ink], ' ' + f], x, 46, { size: 25, weight: 600, align: 'center' });
    head(n2, 'N_{2}', XN); text(ctx, '+', XP, 46, PAL.ink, { size: 28, align: 'center' });
    head(h, 'H_{2}', XH[1]); arrow(ctx, XA[0], 46, XA[1], 46, PAL.ink, 4);
    head(nh3, 'NH_{3}', (XM[0] + XM[1]) / 2);
    const y0 = TOP + PITCH / 2;
    /* six places, filled from the top: an empty one is only its band */
    for (let i = 0; i < ROWS; i++) {
      const y = y0 + i * PITCH;
      ctx.save(); ctx.globalAlpha = i < rows ? 1 : 0.45; ctx.beginPath(); ctx.roundRect(90, y - PITCH / 2 + 4, 1220, PITCH - 8, 10); ctx.fillStyle = PAL.soft; ctx.fill(); ctx.restore();
      if (i >= rows) continue;
      pair(ctx, XN, y, 'N', 19, 'N₂, nitrogen');
      text(ctx, '+', XP, y, PAL.muted, { size: 24, align: 'center' });
      XH.forEach((x) => pair(ctx, x, y, 'H', 15, 'H₂, hydrogen'));
      arrow(ctx, XA[0] + 10, y, XA[1] - 10, y, PAL.muted, 3);
      XM.forEach((x) => ammonia(ctx, x, y + 4));
    }
    if (u !== 'molecules') text(ctx, u === 'doz' ? 'Each molecule drawn stands for a dozen molecules.' : 'Each molecule drawn stands for a mole of molecules.', 700, 526, PAL.muted, { size: 21, align: 'center' });
    const ut = u === 'molecules' ? '' : u === 'doz' ? '\\text{doz}\\ ' : '\\text{mol}\\ ', mol = u === 'molecules' ? '\\ \\text{molecules}' : '';
    const q = (k) => (u === 'mol' ? hue('amount', `${k}\\ \\text{mol}`) + '\\ ' : `${k}\\ ${ut}`);
    tex(d.readout, `{${q(h)}\\text{H}_{2}${mol} \\times \\frac{2\\ ${ut}\\text{NH}_3${mol}}{3\\ ${ut}\\text{H}_2${mol}} = ${q(nh3)}\\text{NH}_{3}${mol}}`);
  }
  still(d, draw);
})();

/* =====================================================================
   FIGURE 4.11: the general route of a stoichiometry calculation. The
   book's chart of ten boxes, substance A on the left and B on the right,
   with the route of the chosen example lit and each box on it showing its
   value. Still: a route is chosen and computed, nothing runs; a new route
   draws along its length. Substances A and B are the caption's referents,
   each named over its half of the chart in its own colour.
===================================================================== */
(function () {
  const d = sim('sim-flowchart', 590);
  /* molar masses in g/mol as the book's examples print them; R holds each example's slider ranges, its own given quantity
     stepped and shown to the digits the book gives it */
  const SP = {
    Al: { tex: '\\text{Al}', txt: 'Al', MM: '26.98', unit: 'atoms' },
    I2: { tex: '\\text{I}_{2}', txt: 'I_{2}', MM: '253.8', unit: 'molecules' },
    C3H8: { tex: '\\text{C}_3\\text{H}_{8}', txt: 'C_{3}H_{8}', MM: '44.10', unit: 'molecules' },
    CO2: { tex: '\\text{CO}_{2}', txt: 'CO_{2}', MM: '44.01', unit: 'molecules' },
    MgOH2: { tex: '\\text{Mg(OH)}_{2}', txt: 'Mg(OH)_{2}', MM: '58.3', unit: 'formula units' },
    NaOH: { tex: '\\text{NaOH}', txt: 'NaOH', MM: '40.0', unit: 'formula units' },
    C8H18: { tex: '\\text{C}_8\\text{H}_{18}', txt: 'C_{8}H_{18}', MM: '114.23', unit: 'molecules' },
    O2: { tex: '\\text{O}_{2}', txt: 'O_{2}', MM: '32.00', unit: 'molecules' },
  };
  const EX = {
    '4.8': { A: 'Al', B: 'I2', cA: 2, cB: 3, give: 'n', want: 'n', value: 0.429,
      R: { m: [1, 50, 0.1, 1], n: [0.05, 2, 0.001, 3], N: [0.5, 10, 0.01, 2] } },
    '4.9': { A: 'C3H8', B: 'CO2', cA: 1, cB: 3, give: 'n', want: 'N', value: 0.75,
      R: { m: [1, 200, 0.1, 1], n: [0.05, 5, 0.01, 2], N: [0.5, 30, 0.01, 2] } },
    '4.10': { A: 'MgOH2', B: 'NaOH', cA: 1, cB: 2, give: 'm', want: 'm', value: 16,
      R: { m: [10, 100, 1, 0], n: [0.05, 2, 0.001, 3], N: [0.5, 10, 0.01, 2] } },
    '4.11': { A: 'C8H18', B: 'O2', cA: 2, cB: 25, give: 'm', want: 'm', value: 702,
      R: { m: [100, 1000, 1, 0], n: [0.5, 10, 0.01, 2], N: [5, 60, 0.1, 1] } },
  };
  const UNIT = { m: 'g', n: 'mol', N: '× 10²³' };
  const KINDS = [{ value: 'm', label: 'mass' }, { value: 'n', label: 'moles' }, { value: 'N', label: 'particles' }];
  const ex = F.select(d.controls, { label: '\\text{example}', aria: 'worked example', value: '4.8',
    options: Object.keys(EX).map((k) => ({ value: k, label: 'Example ' + k })), onInput: () => load() });
  const give = F.select(d.controls, { label: '\\text{given, of A}', aria: 'quantity given', value: 'n', options: KINDS, onInput: () => swapGiven() });
  const want = F.select(d.controls, { label: '\\text{sought, of B}', aria: 'quantity sought', value: 'n', options: KINDS, onInput: () => relight() });
  const r0 = EX['4.8'].R;
  const S = {
    m: ctl(d.controls, { label: '\\km_A', cls: 'mass', min: r0.m[0], max: r0.m[1], step: r0.m[2], value: 11.6, unit: 'g', dec: r0.m[3], aria: 'mass of A in grams' }),
    n: ctl(d.controls, { label: '\\kn_A', cls: 'amount', min: r0.n[0], max: r0.n[1], step: r0.n[2], value: 0.429, unit: 'mol', dec: r0.n[3], aria: 'moles of A' }),
    N: ctl(d.controls, { label: '\\text{particles of A}', cls: '', min: r0.N[0], max: r0.N[1], step: r0.N[2], value: 2.58, unit: '× 10²³', dec: r0.N[3], aria: 'particles of A in units of ten to the twenty-third' }),
  };
  const reveal = F.tween(d, 1);
  let shownKind = 'n';
  ['m', 'N'].forEach((k) => S[k].show(false, { ms: 0 }));
  function showSlider(k) { if (k === shownKind) return; S[shownKind].show(false); S[k].show(true); shownKind = k; }
  const relight = () => { reveal.set(0); reveal.to(1, 900); };
  const MMof = (key) => Number(SP[key].MM);
  /* moles of A from a slider's value, and the value a slider takes for some moles of A, on its own step */
  const toMol = (k, v) => { const e = EX[ex.value]; return k === 'm' ? v / MMof(e.A) : k === 'n' ? v : (v * 1e23) / NA; };
  const fromMol = (k, n) => {
    const e = EX[ex.value], [lo, hi, step, dec] = e.R[k], v = k === 'm' ? n * MMof(e.A) : k === 'n' ? n : (n * NA) / 1e23;
    return Math.min(hi, Math.max(lo, Number((Math.round(v / step) * step).toFixed(dec))));
  };
  function swapGiven() { const k = give.value; S[k].set(fromMol(k, toMol(shownKind, S[shownKind].v))); showSlider(k); relight(); }
  function load() {
    const e = EX[ex.value], n0 = toMol(e.give, e.value);
    ['m', 'n', 'N'].forEach((k) => { const [min, max, step, dec] = e.R[k]; S[k].range({ min, max, step, dec, unit: UNIT[k], value: k === e.give ? e.value : fromMol(k, n0) }); });
    give.set(e.give); want.set(e.want); showSlider(e.give); relight();
  }
  /* box centres: A in the two left columns, B mirrored in the two right */
  const W = 230, HB = 104;
  const P = { vpA: [135, 170], mA: [465, 170], vsA: [135, 340], nA: [465, 340], NA: [465, 510],
    nB: [935, 340], mB: [935, 170], vpB: [1265, 170], vsB: [1265, 340], NB: [935, 510] };
  const hueOf = (kind) => (kind === 'm' ? C('mass') : kind === 'n' ? C('amount') : kind === 'v' ? C('volume') : PAL.ink);
  /* a name on one line, or on two split at the space that keeps the longer line shortest */
  function fit(ctx, name, room) {
    const wd = (s) => F.measure(ctx, s, { size: 21 }), ws = name.split(' ');
    if (wd(name) <= room || ws.length < 2) return [name];
    let best = null;
    for (let i = 1; i < ws.length; i++) { const a = ws.slice(0, i).join(' '), b = ws.slice(i).join(' '), m = Math.max(wd(a), wd(b)); if (!best || m < best[2]) best = [a, b, m]; }
    return best.slice(0, 2);
  }
  /* a box in the hue of what it holds (a count in ink), its name and, on the route, its value */
  function box(ctx, x, y, kind, name, value, on) {
    const c = hueOf(kind);
    ctx.save(); ctx.globalAlpha = 0.5 + 0.5 * on;
    ctx.beginPath(); ctx.roundRect(x - W / 2, y - HB / 2, W, HB, 10);
    ctx.fillStyle = kind === 'N' ? PAL.soft : alpha(c, 0.08 + 0.14 * on); ctx.fill();
    ctx.lineWidth = on > 0.5 ? 4 : 2; ctx.strokeStyle = c; ctx.stroke(); ctx.restore();
    /* page text never sets below 11 px, so on a narrow pane a line stands taller than its logical size */
    const px = (ctx.canvas.clientWidth || 1400) / 1400, lh = Math.max(27, 14 / px);
    const lines = fit(ctx, name, W - 16), n = lines.length + (value ? 1 : 0), up = value ? 6 : 0, y0 = y - ((n - 1) * lh + up) / 2;
    lines.forEach((s, i) => text(ctx, s, x, y0 + i * lh, on > 0.5 ? PAL.ink : PAL.muted, { size: 21, align: 'center' }));
    if (value) text(ctx, value, x, y0 + lines.length * lh + up, kind === 'N' ? PAL.ink : c, { size: 23, weight: 600, align: 'center' });
  }
  /* a double-headed arrow between two boxes, the symbolic arrow of the book's chart */
  function link(ctx, x1, y1, x2, y2, color, w) {
    const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
    arrow(ctx, mx, my, x1, y1, color, w); arrow(ctx, mx, my, x2, y2, color, w);
  }
  function draw() {
    const { ctx } = begin(d.c);
    const e = EX[ex.value], a = SP[e.A], b = SP[e.B], g = give.value, w = want.value;
    const na = toMol(g, S[g].v), nb = (na * e.cB) / e.cA;
    /* the given value keeps the digits its slider shows; the answer takes as many, the steps between one more */
    const [, , , dec] = e.R[g], sf = Math.min(4, Math.max(2, S[g].v.toFixed(dec).replace(/^[0.]+/, '').replace('.', '').length));
    const val = { mA: na * MMof(e.A), nA: na, NA: na * NA, mB: nb * MMof(e.B), nB: nb, NB: nb * NA };
    const sfOf = (key) => (key === g + 'A' || key === w + 'B' ? sf : sf + 1);
    const unit = { m: ' g', n: ' mol', N: '' };
    /* the route as a list of box keys, and the edges it runs along */
    const path = [g + 'A', ...(g === 'n' ? [] : ['nA']), 'nB', ...(w === 'n' ? [] : [w + 'B'])];
    const on = new Set(path), k = F.ease.smooth(reveal.v), steps = path.length - 1;
    const edge = (p, q, lab) => {
      const [x1, y1] = P[p], [x2, y2] = P[q], i = path.indexOf(p), j = path.indexOf(q);
      const lit = i >= 0 && j >= 0 && Math.abs(i - j) === 1 ? Math.min(1, Math.max(0, k * steps - Math.min(i, j))) : 0;
      const hor = y1 === y2, s = Math.sign(x2 - x1) || 1, t = Math.sign(y2 - y1) || 1;
      const ax = hor ? x1 + s * (W / 2 + 8) : x1, ay = hor ? y1 : y1 + t * (HB / 2 + 8), bx = hor ? x2 - s * (W / 2 + 8) : x2, by = hor ? y2 : y2 - t * (HB / 2 + 8);
      link(ctx, ax, ay, bx, by, lit > 0.99 ? PAL.ink : alpha(PAL.ink, 0.45), lit > 0.99 ? 5 : 3);
      if (lit > 0 && lit < 1) line(ctx, ax, ay, ax + (bx - ax) * lit, ay + (by - ay) * lit, PAL.ink, 5);
      const mx = (ax + bx) / 2, my = (ay + by) / 2;
      if (hor) text(ctx, lab, mx, my - 24, lit ? PAL.ink : PAL.muted, { size: 20, align: 'center' });
      else text(ctx, lab, mx + (x1 < 700 ? -16 : 16), my, lit ? PAL.ink : PAL.muted, { size: 20, align: x1 < 700 ? 'right' : 'left' });
    };
    edge('vpA', 'mA', 'density'); edge('vsA', 'nA', 'molarity'); edge('mA', 'nA', 'molar mass'); edge('nA', 'NA', 'Avogadro’s number');
    edge('mB', 'vpB', 'density'); edge('nB', 'vsB', 'molarity'); edge('mB', 'nB', 'molar mass'); edge('nB', 'NB', 'Avogadro’s number');
    edge('nA', 'nB', 'stoichiometric factor');
    /* the factor itself under its arrow, set as the fraction the readout multiplies by */
    text(ctx, `${e.cB} mol ${b.txt}`, 700, 374, PAL.ink, { size: 21, weight: 600, align: 'center' });
    line(ctx, 610, 390, 790, 390, PAL.ink, 2);
    text(ctx, `${e.cA} mol ${a.txt}`, 700, 408, PAL.ink, { size: 21, weight: 600, align: 'center' });
    const nm = { vpA: `volume of pure ${a.txt}`, vsA: `volume of ${a.txt} solution`, mA: `mass of ${a.txt}`, nA: `moles of ${a.txt}`, NA: `${a.unit} of ${a.txt}`,
      vpB: `volume of pure ${b.txt}`, vsB: `volume of ${b.txt} solution`, mB: `mass of ${b.txt}`, nB: `moles of ${b.txt}`, NB: `${b.unit} of ${b.txt}` };
    Object.keys(P).forEach((key) => {
      const kind = key.startsWith('v') ? 'v' : key[0], lit = on.has(key);
      const at = path.indexOf(key), shown = lit && k * steps >= at - 0.02;
      box(ctx, P[key][0], P[key][1], kind, nm[key], shown ? sciTxt(val[key], sfOf(key)) + unit[kind] : '', lit ? 1 : 0);
    });
    F.rich(ctx, [['substance A', F.ref('substance-a')], ', given: ' + a.txt], 300, 60, { size: 24, align: 'center' });
    F.rich(ctx, [['substance B', F.ref('substance-b')], ', sought: ' + b.txt], 1100, 60, { size: 24, align: 'center' });
    /* the chain of factors with the live numbers, one line: a brace keeps it whole and the readout sets it to fit */
    const q = (key, kind, sp) => (kind === 'N' ? `${sciTex(val[key], sf)}\\ ${sp.tex}\\ \\text{${sp.unit}}`
      : hue(kind === 'm' ? 'mass' : 'amount', `${sciTex(val[key], sf)}\\ ${kind === 'm' ? '\\text{g}' : '\\text{mol}'}`) + `\\ ${sp.tex}`);
    const f = [];
    if (g === 'm') f.push(`\\frac{1\\ \\text{mol}\\ ${a.tex}}{${a.MM}\\ \\text{g}\\ ${a.tex}}`);
    if (g === 'N') f.push(`\\frac{1\\ \\text{mol}\\ ${a.tex}}{6.022\\times 10^{23}\\ ${a.tex}\\ \\text{${a.unit}}}`);
    f.push(`\\frac{${e.cB}\\ \\text{mol}\\ ${b.tex}}{${e.cA}\\ \\text{mol}\\ ${a.tex}}`);
    if (w === 'm') f.push(`\\frac{${b.MM}\\ \\text{g}\\ ${b.tex}}{1\\ \\text{mol}\\ ${b.tex}}`);
    if (w === 'N') f.push(`\\frac{6.022\\times 10^{23}\\ ${b.tex}\\ \\text{${b.unit}}}{1\\ \\text{mol}\\ ${b.tex}}`);
    tex(d.readout, `{${q(g + 'A', g, a)} \\times ${f.join(' \\times ')} = ${q(w + 'B', w, b)}}`);
  }
  register(d.fig, { update: () => {}, draw });
})();
};
