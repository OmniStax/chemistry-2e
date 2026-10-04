/* Figures for section 4.3 Reaction Stoichiometry. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['4.3'] = function (root, F) {
const { el, fmt, tex, C, PAL, alpha, ctl, register, begin, line, arrow, text, headline } = F;
const sim = (id, H) => F.sim(root, id, H);
const still = (d, draw) => register(d.fig, { update: () => {}, draw });
function readout(host, main, small) { tex(host, main); if (small) host.appendChild(el('small', null, small)); }
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;
const NA = 6.022e23;

/* ---------- numbers to three significant figures, in exponent form outside 0.01 to 10 000 ---------- */
const SUP = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
function parts(x) {
  if (x === 0) return { m: '0', e: 0 };
  const e = Math.floor(Math.log10(Math.abs(x)));
  x *= 1 + 1e-12;
  if (e >= -2 && e < 3) return { m: x.toFixed(Math.max(0, 2 - e)), e: 0 };
  const m = x / 10 ** e; if (Number(m.toFixed(2)) >= 10) return { m: '1.00', e: e + 1 };
  return { m: m.toFixed(2), e };
}
const sciTex = (x) => { const p = parts(x); return p.e ? `${p.m}\\times 10^{${p.e}}` : p.m; };
const sciTxt = (x) => { const p = parts(x); return p.e ? `${p.m} × 10${String(p.e).split('').map((c) => SUP[c]).join('')}` : p.m; };

/* ---------- a box of the route: its border and fill in the hue of what it holds, a count in ink ---------- */
const hueOf = (kind) => (kind === 'm' ? C('mass') : kind === 'n' ? C('amount') : kind === 'v' ? C('volume') : PAL.ink);
function box(ctx, x, y, w, h, kind, name, value, on = 1) {
  const c = hueOf(kind);
  ctx.save(); ctx.globalAlpha = 0.35 + 0.65 * on;
  ctx.beginPath(); ctx.roundRect(x - w / 2, y - h / 2, w, h, 8);
  ctx.fillStyle = kind === 'N' ? PAL.soft : alpha(c, 0.10 + 0.12 * on); ctx.fill();
  ctx.lineWidth = on > 0.5 ? 3 : 2; ctx.strokeStyle = c; ctx.stroke(); ctx.restore();
  const size = Math.min(17, (17 * (w - 18)) / F.measure(ctx, name, { size: 17 }));
  if (value) {
    text(ctx, name, x, y - 13, PAL.ink, { size, align: 'center' });
    text(ctx, value, x, y + 14, kind === 'N' ? PAL.ink : c, { size: 19, weight: 600, align: 'center' });
  } else text(ctx, name, x, y, on > 0.5 ? PAL.ink : PAL.muted, { size, align: 'center' });
}
/* a double-headed arrow between two boxes, the symbolic arrow of the book's chart */
function link(ctx, x1, y1, x2, y2, color, w) {
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
  arrow(ctx, mx, my, x1, y1, color, w); arrow(ctx, mx, my, x2, y2, color, w);
}

/* =====================================================================
   The four route boxes of Examples 4.8 to 4.11, copied faithfully: a row
   of boxes joined by arrows, each named by the factor it uses. Still, no
   controls.
===================================================================== */
function route(id, steps) {
  const d = sim(id, 170);
  const n = steps.length, w = n > 2 ? 250 : 300, gap = (1400 - n * w) / (n + 1);
  function draw() {
    const { ctx } = begin(d.c);
    const xs = steps.map((_, i) => gap + w / 2 + i * (w + gap)), y = 100;
    steps.forEach((s, i) => {
      if (i) {
        const x1 = xs[i - 1] + w / 2 + 8, x2 = xs[i] - w / 2 - 8;
        arrow(ctx, x1, y, x2, y, PAL.ink, 4);
        text(ctx, s.via, (x1 + x2) / 2, y - 48, PAL.muted, { size: 17, align: 'center' });
      }
      box(ctx, xs[i], y, w, 64, s.kind, s.name);
    });
  }
  still(d, draw);
}
route('fig-route-al', [{ kind: 'n', name: 'moles of Al' }, { kind: 'n', name: 'moles of I_{2}', via: 'stoichiometric factor' }]);
route('fig-route-propane', [{ kind: 'n', name: 'moles of C_{3}H_{8}' }, { kind: 'n', name: 'moles of CO_{2}', via: 'stoichiometric factor' }]);
route('fig-route-naoh', [{ kind: 'm', name: 'mass of Mg(OH)_{2}' }, { kind: 'n', name: 'moles of Mg(OH)_{2}', via: 'molar mass' },
  { kind: 'n', name: 'moles of NaOH', via: 'stoichiometric factor' }, { kind: 'm', name: 'mass of NaOH', via: 'molar mass' }]);
route('fig-route-octane', [{ kind: 'm', name: 'mass of C_{8}H_{18}' }, { kind: 'n', name: 'moles of C_{8}H_{18}', via: 'molar mass' },
  { kind: 'n', name: 'moles of O_{2}', via: 'stoichiometric factor' }, { kind: 'm', name: 'mass of O_{2}', via: 'molar mass' }]);

/* =====================================================================
   SIM: N2 + 3 H2 -> 2 NH3 counted in molecules, dozens or moles. The
   reacting molecules on the left, the ammonia on the right, in element
   colours. Still: the counts answer the slider and the unit choice.
===================================================================== */
(function () {
  const d = sim('sim-ammonia', 440);
  const H2 = ctl(d.controls, { label: '\\text{H}_2\\ \\text{taken}', cls: '', min: 3, max: 18, step: 3, value: 9, unit: '', dec: 0, aria: 'number of hydrogen molecules that react', detents: [3, 6, 9, 12, 15, 18] });
  const U = F.choice(d.controls, { label: '\\text{unit}', aria: 'unit of amount', value: 'molecules',
    options: [{ value: 'molecules', label: 'molecules' }, { value: 'doz', label: 'dozen' }, { value: 'mol', label: 'mol' }] });
  const R = 14, hits = [];
  F.hover(d.stage, () => hits);
  function atom(ctx, x, y, sym, r = R) {
    ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fillStyle = F.el(sym); ctx.fill();
    ctx.lineWidth = 1.5; ctx.strokeStyle = PAL.ink; ctx.stroke(); ctx.restore();
  }
  const pair = (ctx, x, y, sym, name) => { atom(ctx, x - R * 0.8, y, sym); atom(ctx, x + R * 0.8, y, sym); hits.push({ x, y, r: 2 * R, name }); };
  function ammonia(ctx, x, y) {
    [[-1, 0.7], [1, 0.7], [0, -1.1]].forEach(([dx, dy]) => atom(ctx, x + dx * 17, y + dy * 17, 'H', 10));
    atom(ctx, x, y, 'N', 15); hits.push({ x, y, r: 30, name: 'NH₃, ammonia' });
  }
  const grid = (n, x0, y0, cols, dx, dy, f) => { for (let i = 0; i < n; i++) f(x0 + (i % cols) * dx, y0 + Math.floor(i / cols) * dy); };
  function draw() {
    const { ctx } = begin(d.c); hits.length = 0;
    const h = H2.v, n2 = h / 3, nh3 = (2 * h) / 3, u = U.value;
    const word = (k, f) => (u === 'molecules' ? `${k} ${f} molecule${k === 1 ? '' : 's'}` : u === 'doz' ? `${k} doz ${f}` : `${k} mol ${f}`);
    /* reactants: nitrogen in a column at the left, hydrogen in rows of six beside it */
    const top = 130, row = 56;
    grid(n2, 80, top, 2, 64, row, (x, y) => pair(ctx, x, y, 'N', 'N₂, nitrogen'));
    grid(h, 250, top, 6, 70, row, (x, y) => pair(ctx, x, y, 'H', 'H₂, hydrogen'));
    const yLab = top + 3 * row + 44;
    text(ctx, word(n2, 'N_{2}'), 112, yLab, PAL.ink, { size: 20, weight: 600, align: 'center' });
    text(ctx, word(h, 'H_{2}'), 425, yLab, PAL.ink, { size: 20, weight: 600, align: 'center' });
    text(ctx, '+', 190, top + row, PAL.ink, { size: 30, align: 'center' });
    arrow(ctx, 760, top + row, 880, top + row, PAL.ink, 4);
    /* product: ammonia in rows of six */
    grid(nh3, 940, top, 6, 72, row + 14, (x, y) => ammonia(ctx, x, y));
    text(ctx, word(nh3, 'NH_{3}'), 1120, yLab, PAL.ink, { size: 20, weight: 600, align: 'center' });
    if (u !== 'molecules') text(ctx, u === 'doz' ? 'Each molecule drawn stands for one dozen molecules.' : 'Each molecule drawn stands for one mole of molecules.', 700, 404, PAL.muted, { size: 17, align: 'center' });
    headline(ctx, `${word(h, 'H_{2}')} react with ${word(n2, 'N_{2}')} to give ${word(nh3, 'NH_{3}')}.`.replace(/^./, (c) => c.toUpperCase()));
    const unitTex = u === 'molecules' ? '' : u === 'doz' ? '\\text{doz}\\ ' : '\\text{mol}\\ ';
    const lhs = u === 'mol' ? '\\kn_{\\text{NH}_3}' : u === 'doz' ? '\\text{dozens of NH}_{3}' : '\\text{NH}_3\\ \\text{molecules}';
    const q = (k) => (u === 'mol' ? hue('amount', `${k}\\ \\text{mol}`) : `${k}\\ ${unitTex}`);
    readout(d.readout, `${lhs} = ${q(h)}\\ \\text{H}_{2} \\times \\frac{2\\ ${unitTex}\\text{NH}_3}{3\\ ${unitTex}\\text{H}_2} = ${q(nh3)}\\ \\text{NH}_{3}`,
      'The factor 2 to 3 comes from the coefficients, so it is the same for molecules, dozens and moles.');
  }
  still(d, draw);
})();

/* =====================================================================
   FIGURE 4.11: the general route of a stoichiometry calculation. The
   book's chart of ten boxes, substance A on the left and B on the right,
   with the route of the chosen example lit and each box on it showing its
   value. Still: a route is chosen and computed, nothing runs; a new route
   draws along its length. Substances A and B are the caption's referents,
   each named under its half of the chart in its own colour.
===================================================================== */
(function () {
  const d = sim('sim-flowchart', 560);
  /* molar masses in g/mol as the book's examples use them */
  const SP = {
    Al: { tex: '\\text{Al}', txt: 'Al', MM: 26.98, unit: 'atoms' },
    I2: { tex: '\\text{I}_{2}', txt: 'I_{2}', MM: 253.8, unit: 'molecules' },
    C3H8: { tex: '\\text{C}_3\\text{H}_{8}', txt: 'C_{3}H_{8}', MM: 44.10, unit: 'molecules' },
    CO2: { tex: '\\text{CO}_{2}', txt: 'CO_{2}', MM: 44.01, unit: 'molecules' },
    MgOH2: { tex: '\\text{Mg(OH)}_{2}', txt: 'Mg(OH)_{2}', MM: 58.3, unit: 'formula units' },
    NaOH: { tex: '\\text{NaOH}', txt: 'NaOH', MM: 40.0, unit: 'formula units' },
    C8H18: { tex: '\\text{C}_8\\text{H}_{18}', txt: 'C_{8}H_{18}', MM: 114.23, unit: 'molecules' },
    O2: { tex: '\\text{O}_{2}', txt: 'O_{2}', MM: 32.00, unit: 'molecules' },
  };
  const EX = {
    '4.8': { A: 'Al', B: 'I2', cA: 2, cB: 3, give: 'n', want: 'n', value: 0.429, verb: 'reacts with' },
    '4.9': { A: 'C3H8', B: 'CO2', cA: 1, cB: 3, give: 'n', want: 'N', value: 0.75, verb: 'produces' },
    '4.10': { A: 'MgOH2', B: 'NaOH', cA: 1, cB: 2, give: 'm', want: 'm', value: 16, verb: 'is produced from' },
    '4.11': { A: 'C8H18', B: 'O2', cA: 2, cB: 25, give: 'm', want: 'm', value: 702, verb: 'consumes' },
  };
  const KINDS = [{ value: 'm', label: 'mass' }, { value: 'n', label: 'moles' }, { value: 'N', label: 'particles' }];
  const ex = F.select(d.controls, { label: '\\text{example}', aria: 'worked example', value: '4.8',
    options: Object.keys(EX).map((k) => ({ value: k, label: 'Example ' + k })), onInput: () => load() });
  const give = F.choice(d.controls, { label: '\\text{given (A)}', aria: 'quantity given', value: 'n', options: KINDS, onInput: () => swapGiven() });
  const want = F.choice(d.controls, { label: '\\text{sought (B)}', aria: 'quantity sought', value: 'n', options: KINDS, onInput: () => relight() });
  const S = {
    m: ctl(d.controls, { label: '\\km_A', cls: 'mass', min: 1, max: 1000, step: 0.5, value: 16, unit: 'g', dec: 1, aria: 'mass of A in grams' }),
    n: ctl(d.controls, { label: '\\kn_A', cls: 'amount', min: 0.01, max: 10, step: 0.001, value: 0.429, unit: 'mol', dec: 3, aria: 'moles of A' }),
    N: ctl(d.controls, { label: 'N_A', cls: '', min: 0.1, max: 100, step: 0.1, value: 4.5, unit: '× 10²³', dec: 1, aria: 'particles of A in units of ten to the twenty-third' }),
  };
  const reveal = F.tween(d, 1);
  let shownKind = 'n';
  ['m', 'N'].forEach((k) => S[k].show(false, { ms: 0 }));
  function showSlider(k) { if (k === shownKind) return; S[shownKind].show(false); S[k].show(true); shownKind = k; }
  const relight = () => { reveal.set(0); reveal.to(1, 900); };
  function nA() { const e = EX[ex.value], a = SP[e.A], k = give.value; return k === 'm' ? S.m.v / a.MM : k === 'n' ? S.n.v : (S.N.v * 1e23) / NA; }
  function swapGiven() {
    const e = EX[ex.value], n = nA_of(shownKind), k = give.value, a = SP[e.A];
    if (k === 'm') S.m.set(Math.min(1000, Math.max(1, Math.round(n * a.MM * 2) / 2)));
    if (k === 'n') S.n.set(Math.min(10, Math.max(0.01, Number(n.toFixed(3)))));
    if (k === 'N') S.N.set(Math.min(100, Math.max(0.1, Number(((n * NA) / 1e23).toFixed(1)))));
    showSlider(k); relight();
  }
  function nA_of(k) { const a = SP[EX[ex.value].A]; return k === 'm' ? S.m.v / a.MM : k === 'n' ? S.n.v : (S.N.v * 1e23) / NA; }
  function load() {
    const e = EX[ex.value];
    give.set(e.give); want.set(e.want); S[e.give].set(e.value); showSlider(e.give); relight();
  }
  /* box centres: A in the two left columns, B mirrored in the two right */
  const W = 210, HB = 64;
  const P = { vpA: [120, 150], mA: [440, 150], vsA: [120, 300], nA: [440, 300], NA: [440, 450],
    nB: [960, 300], mB: [960, 150], vpB: [1280, 150], vsB: [1280, 300], NB: [960, 450] };
  function draw() {
    const { ctx } = begin(d.c);
    const e = EX[ex.value], a = SP[e.A], b = SP[e.B], g = give.value, w = want.value;
    const na = nA(), nb = (na * e.cB) / e.cA;
    const val = { mA: na * a.MM, nA: na, NA: na * NA, mB: nb * b.MM, nB: nb, NB: nb * NA };
    const txt = { m: (x) => sciTxt(x) + ' g', n: (x) => sciTxt(x) + ' mol', N: (x) => sciTxt(x) };
    /* the route as a list of box keys, and the edges it runs along */
    const path = [g + 'A', ...(g === 'n' ? [] : ['nA']), 'nB', ...(w === 'n' ? [] : [w + 'B'])];
    const on = new Set(path), k = F.ease.smooth(reveal.v), steps = path.length - 1;
    const edge = (p, q, lab, side) => {
      const [x1, y1] = P[p], [x2, y2] = P[q], i = path.indexOf(p), j = path.indexOf(q);
      const lit = i >= 0 && j >= 0 && Math.abs(i - j) === 1 ? Math.min(1, Math.max(0, k * steps - Math.min(i, j))) : 0;
      const hor = y1 === y2, s = Math.sign(x2 - x1) || 1, t = Math.sign(y2 - y1) || 1;
      const ax = hor ? x1 + s * (W / 2 + 6) : x1, ay = hor ? y1 : y1 + t * (HB / 2 + 6), bx = hor ? x2 - s * (W / 2 + 6) : x2, by = hor ? y2 : y2 - t * (HB / 2 + 6);
      link(ctx, ax, ay, bx, by, lit > 0.99 ? PAL.ink : alpha(PAL.ink, 0.45), lit > 0.99 ? 5 : 3);
      if (lit > 0 && lit < 1) line(ctx, ax, ay, ax + (bx - ax) * lit, ay + (by - ay) * lit, PAL.ink, 5);
      const mx = (ax + bx) / 2, my = (ay + by) / 2;
      if (hor) text(ctx, lab, mx, my + (side || 22), lit ? PAL.ink : PAL.muted, { size: 15, align: 'center' });
      else text(ctx, lab, mx + 12, my, lit ? PAL.ink : PAL.muted, { size: 15 });
    };
    edge('vpA', 'mA', 'density'); edge('vsA', 'nA', 'molarity'); edge('mA', 'nA', 'molar mass'); edge('nA', 'NA', 'Avogadro’s number');
    edge('mB', 'vpB', 'density'); edge('nB', 'vsB', 'molarity'); edge('mB', 'nB', 'molar mass'); edge('nB', 'NB', 'Avogadro’s number');
    edge('nA', 'nB', 'stoichiometric factor', -24);
    text(ctx, `${e.cB} mol ${b.txt} per ${e.cA} mol ${a.txt}`, 700, 324, PAL.ink, { size: 17, weight: 600, align: 'center' });
    const nm = { vpA: `volume of pure ${a.txt}`, vsA: `volume of ${a.txt} solution`, mA: `mass of ${a.txt}`, nA: `moles of ${a.txt}`, NA: `${a.unit} of ${a.txt}`,
      vpB: `volume of pure ${b.txt}`, vsB: `volume of ${b.txt} solution`, mB: `mass of ${b.txt}`, nB: `moles of ${b.txt}`, NB: `${b.unit} of ${b.txt}` };
    Object.keys(P).forEach((key) => {
      const kind = key.startsWith('v') ? 'v' : key[0], lit = on.has(key);
      const at = path.indexOf(key), shown = lit && k * steps >= at - 0.02;
      box(ctx, P[key][0], P[key][1], W, HB, kind, nm[key], shown ? txt[kind](val[key]) : '', lit ? 1 : 0);
    });
    text(ctx, 'substance A: ' + a.txt, 280, 526, F.ref('substance-a'), { size: 20, weight: 600, align: 'center' });
    text(ctx, 'substance B: ' + b.txt, 1120, 526, F.ref('substance-b'), { size: 20, weight: 600, align: 'center' });
    const giveTxt = txt[g](val[g + 'A']) + (g === 'N' ? ` ${a.unit} of ` : ' of ') + a.txt;
    const wantTxt = txt[w](val[w + 'B']) + (w === 'N' ? ` ${b.unit} of ` : ' of ') + b.txt;
    headline(ctx, e.verb === 'is produced from' ? `${giveTxt} is produced from ${wantTxt}.` : `${giveTxt} ${e.verb} ${wantTxt}.`);
    /* the chain of factors, written with the live numbers */
    const unitsA = { m: `\\text{g}\\ ${a.tex}`, n: `\\text{mol}\\ ${a.tex}`, N: `${a.tex}` };
    const startTex = g === 'N' ? `${sciTex(val.NA)}\\ ${a.tex}` : hue(g === 'm' ? 'mass' : 'amount', `${sciTex(val[g + 'A'])}\\ ${g === 'm' ? '\\text{g}' : '\\text{mol}'}`) + `\\ ${a.tex}`;
    const f = [];
    if (g === 'm') f.push(`\\frac{1\\ \\text{mol}\\ ${a.tex}}{${a.MM}\\ ${unitsA.m}}`);
    if (g === 'N') f.push(`\\frac{1\\ \\text{mol}\\ ${a.tex}}{6.022\\times 10^{23}\\ ${a.tex}}`);
    f.push(`\\frac{${e.cB}\\ \\text{mol}\\ ${b.tex}}{${e.cA}\\ \\text{mol}\\ ${a.tex}}`);
    if (w === 'm') f.push(`\\frac{${b.MM}\\ \\text{g}\\ ${b.tex}}{1\\ \\text{mol}\\ ${b.tex}}`);
    if (w === 'N') f.push(`\\frac{6.022\\times 10^{23}\\ ${b.tex}}{1\\ \\text{mol}\\ ${b.tex}}`);
    const lhs = w === 'm' ? `\\km_{${b.tex}}` : w === 'n' ? `\\kn_{${b.tex}}` : `N_{${b.tex}}`;
    const res = w === 'N' ? `${sciTex(val.NB)}\\ ${b.tex}` : hue(w === 'm' ? 'mass' : 'amount', `${sciTex(val[w + 'B'])}\\ ${w === 'm' ? '\\text{g}' : '\\text{mol}'}`) + `\\ ${b.tex}`;
    readout(d.readout, `${lhs} = ${startTex} \\times ${f.join(' \\times ')} = ${res}`);
  }
  register(d.fig, { update: () => {}, draw });
})();
};
