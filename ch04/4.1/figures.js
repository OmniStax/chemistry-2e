/* Figures for section 4.1 Writing and Balancing Chemical Equations. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['4.1'] = function (root, F) {
const { el, tex, PAL, alpha, ctl, register, begin, line, dot, text, headline, measure } = F;
const sim = (id, H) => F.sim(root, id, H);
function readout(host, main, small) { tex(host, main); if (small) host.appendChild(el('small', null, small)); }

const TAU = 2 * Math.PI;
const NAME = { H: 'hydrogen', C: 'carbon', N: 'nitrogen', O: 'oxygen' };
const cap = (s) => s[0].toUpperCase() + s.slice(1);
/* a deterministic scatter, the same on every redraw */
const rnd = (i) => { const s = Math.sin(i * 12.9898 + 78.233) * 43758.5453; return s - Math.floor(s); };
/* one atom of a space-filling model: a disc in its element's colour, hydrogen outlined so that it reads on a light page */
function atom(ctx, x, y, sym, r) {
  ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fillStyle = F.el(sym); ctx.fill();
  ctx.lineWidth = sym === 'H' ? 2 : 1.2; ctx.strokeStyle = sym === 'H' ? PAL.ink : alpha(PAL.ink, 0.4); ctx.stroke(); ctx.restore();
}

/* =====================================================================
   FIGURE 4.2 + 4.3: methane and oxygen before reaction, carbon dioxide
   and water after, in space-filling models. The book draws the reaction
   once at one methane molecule and again at three; the slider sets the
   number of methane molecules and the other three species follow in
   the ratio 1:2:1:2, with the atoms of each element tallied under each
   mixture. Still: nothing in the idea has a time in it, so no cycle is
   registered and no transport is added. Coefficients and counts are
   ink; every atom is in its element's colour and names itself under
   the pointer.
===================================================================== */
(function () {
  const d = sim('sim-methane', 600);
  const N = ctl(d.controls, { label: '\\text{methane molecules}', cls: '', min: 1, max: 6, step: 1, value: 1, unit: '', dec: 0, detents: [1, 3], aria: 'number of methane molecules' });
  let hits = []; F.hover(d.stage, () => hits);
  /* each molecule as its atoms about its centre, in canvas units, turned by a; back atoms first */
  const at = (x, y, a, dx, dy) => [x + dx * Math.cos(a) - dy * Math.sin(a), y + dx * Math.sin(a) + dy * Math.cos(a)];
  const MOL = {
    CH4: { of: 'a methane molecule, CH₄', atoms: (x, y, a) => [['H', ...at(x, y, a, -14, -14), 11], ['H', ...at(x, y, a, 14, -14), 11], ['C', x, y, 19], ['H', ...at(x, y, a, -15, 15), 11], ['H', ...at(x, y, a, 15, 15), 11]] },
    O2: { of: 'an oxygen molecule, O₂', atoms: (x, y, a) => [['O', ...at(x, y, a, -12, 0), 16], ['O', ...at(x, y, a, 12, 0), 16]] },
    CO2: { of: 'a carbon dioxide molecule, CO₂', atoms: (x, y, a) => [['O', ...at(x, y, a, -25, 0), 16], ['O', ...at(x, y, a, 25, 0), 16], ['C', x, y, 17]] },
    H2O: { of: 'a water molecule, H₂O', atoms: (x, y, a) => [['O', x, y, 17], ['H', ...at(x, y, a, -15, 13), 11], ['H', ...at(x, y, a, 15, 13), 11]] },
  };
  function molecule(ctx, key, x, y, a) {
    const m = MOL[key];
    m.atoms(x, y, a).forEach(([s, ax, ay, r]) => { atom(ctx, ax, ay, s, r); hits.push({ x: ax, y: ay, r: r + 2, name: NAME[s] + ' atom of ' + m.of }); });
  }
  /* the molecules of one mixture laid on a grid inside its box, the two species mixed as the book mixes them */
  function mixture(ctx, box, keys, seed) {
    const cols = Math.min(keys.length, 6), rows = Math.ceil(keys.length / cols), cw = 100, rh = 92;
    const x0 = (box.l + box.r) / 2 - ((cols - 1) * cw) / 2, y0 = (box.t + box.b) / 2 + 30 - ((rows - 1) * rh) / 2;
    keys.forEach((k, i) => {
      const c = i % cols, r = Math.floor(i / cols);
      molecule(ctx, k, x0 + c * cw + (rnd(seed + i) - 0.5) * 18, y0 + r * rh + (rnd(seed + 40 + i) - 0.5) * 16, (rnd(seed + 80 + i) - 0.5) * 1.6);
    });
  }
  /* reactants and products interleaved one of the first to two of the second, as 1:2 */
  const order = (a, b, n) => Array.from({ length: n }, () => [a, b, b]).flat();
  /* the atom tally of one side: a disc of each element and its count */
  function tally(ctx, cx, y, counts) {
    const parts = counts.map(([s, n]) => n + ' ' + NAME[s]), gap = 34;
    const ws = parts.map((p) => measure(ctx, p, { size: 20 }) + 26), total = ws.reduce((a, b) => a + b, 0) + gap * (ws.length - 1);
    let x = cx - total / 2;
    counts.forEach(([s], i) => { atom(ctx, x + 9, y, s, s === 'H' ? 7 : 9); text(ctx, parts[i], x + 26, y, PAL.ink, { size: 20 }); x += ws[i] + gap; });
  }
  function draw() {
    const { ctx } = begin(d.c); hits = [];
    const n = Math.round(N.v);
    const L = { l: 30, r: 680, t: 92, b: 420 }, R = { l: 720, r: 1370, t: 92, b: 420 };
    line(ctx, 700, 96, 700, 470, alpha(PAL.ink, 0.45), 2, [10, 10]);
    text(ctx, 'Mixture before reaction', (L.l + L.r) / 2, 128, PAL.ink, { size: 22, weight: 600, align: 'center' });
    text(ctx, 'Mixture after reaction', (R.l + R.r) / 2, 128, PAL.ink, { size: 22, weight: 600, align: 'center' });
    mixture(ctx, L, order('CH4', 'O2', n), 1);
    mixture(ctx, R, order('CO2', 'H2O', n), 7);
    const counts = [['C', n], ['H', 4 * n], ['O', 4 * n]];
    tally(ctx, (L.l + L.r) / 2, 448, counts);
    tally(ctx, (R.l + R.r) / 2, 448, counts);
    /* the legend: each species drawn once with its name */
    [['CH4', 'methane, CH_{4}'], ['O2', 'oxygen, O_{2}'], ['CO2', 'carbon dioxide, CO_{2}'], ['H2O', 'water, H_{2}O']].forEach(([k, s], i) => {
      const x = 110 + i * 330; molecule(ctx, k, x, 540, 0); text(ctx, s, x + 58, 540, PAL.ink, { size: 20 });
    });
    const mol = (k, one, many) => k + ' ' + (k === 1 ? one : many);
    headline(ctx, mol(n, 'methane molecule', 'methane molecules') + ' and ' + 2 * n + ' oxygen molecules react to yield ' + mol(n, 'carbon dioxide molecule', 'carbon dioxide molecules') + ' and ' + 2 * n + ' water molecules.');
    const c = (k) => (k === 1 ? '' : String(k));
    readout(d.readout, `${c(n)}{\\text{CH}}_{4}+${2 * n}{\\text{O}}_{2}\\;\\longrightarrow\\;${c(n)}{\\text{CO}}_{2}+${2 * n}{\\text{H}}_{2}\\text{O}`,
      'Each side holds ' + n + ' carbon, ' + 4 * n + ' hydrogen and ' + 4 * n + ' oxygen atoms' + (n > 1 ? ', and the numbers of molecules, ' + [n, 2 * n, n, 2 * n].join(':') + ', stand in the ratio 1:2:1:2.' : ', and the molecules react in the ratio 1:2:1:2.'));
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   SIM: balancing by inspection. One of the section's four reactions is
   chosen and its coefficients are set one species at a time; the
   subscripts are fixed. Each element is a row of atoms, the reactant
   side growing left from the centre line and the product side right,
   so a balanced element is a row symmetric about the line. The dashed
   circle on each slider is the balanced coefficient the text names.
   Still: no clock. Counts are ink; atoms are in their element colours.
===================================================================== */
(function () {
  const d = sim('sim-balance', 570);
  /* each species: its formula for the canvas, its TeX, its atoms, and whether it is a product */
  const S = (f, t, atoms, prod) => ({ f, t, atoms, prod });
  const RX = {
    water: { name: 'Water', bal: [2, 2, 1], sp: [S('H_{2}O', '{\\text{H}}_{2}\\text{O}', { H: 2, O: 1 }, 0), S('H_{2}', '{\\text{H}}_{2}', { H: 2 }, 1), S('O_{2}', '{\\text{O}}_{2}', { O: 2 }, 1)] },
    n2o5: { name: 'Dinitrogen pentoxide', bal: [2, 5, 2], sp: [S('N_{2}', '{\\text{N}}_{2}', { N: 2 }, 0), S('O_{2}', '{\\text{O}}_{2}', { O: 2 }, 0), S('N_{2}O_{5}', '{\\text{N}}_{2}{\\text{O}}_{5}', { N: 2, O: 5 }, 1)] },
    ethane: { name: 'Ethane', bal: [2, 7, 6, 4], sp: [S('C_{2}H_{6}', '{\\text{C}}_{2}{\\text{H}}_{6}', { C: 2, H: 6 }, 0), S('O_{2}', '{\\text{O}}_{2}', { O: 2 }, 0), S('H_{2}O', '{\\text{H}}_{2}\\text{O}', { H: 2, O: 1 }, 1), S('CO_{2}', '{\\text{CO}}_{2}', { C: 1, O: 2 }, 1)] },
    ammonia: { name: 'Ammonia', bal: [1, 3, 2], sp: [S('N_{2}', '{\\text{N}}_{2}', { N: 2 }, 0), S('H_{2}', '{\\text{H}}_{2}', { H: 2 }, 0), S('NH_{3}', '{\\text{NH}}_{3}', { N: 1, H: 3 }, 1)] },
  };
  const rx = () => RX[pick.value];
  const pick = F.select(d.controls, { label: '\\text{reaction}', options: Object.entries(RX).map(([value, r]) => ({ value, label: r.name })), value: 'water', aria: 'the reaction to balance', onInput: choose });
  const K = [0, 1, 2, 3].map((i) => ctl(d.controls, { label: RX.water.sp[Math.min(i, 2)].t, cls: '', min: 1, max: 9, step: 1, value: 1, unit: '', dec: 0,
    aria: 'coefficient of ' + RX.water.sp[Math.min(i, 2)].f.replace(/[_{}]/g, '') }));
  function choose() {
    const r = rx();
    K.forEach((k, i) => {
      const s = r.sp[i];
      if (s) { k.relabel(s.t, 'coefficient of ' + s.f.replace(/[_{}]/g, '')); k.set(1); k.mark([{ at: r.bal[i] }]); }
      k.show(!!s);
    });
  }
  choose();
  let hits = []; F.hover(d.stage, () => hits);
  const gcd = (a, b) => (b ? gcd(b, a % b) : a);
  const MID = 700, REACH = 440;
  function draw() {
    const { ctx } = begin(d.c); hits = [];
    const r = rx(), co = r.sp.map((_, i) => Math.round(K[i].v));
    const els = [...new Set(r.sp.flatMap((s) => Object.keys(s.atoms)))];
    const side = (e, p) => r.sp.map((s, i) => [s, co[i]]).filter(([s]) => s.prod === p && s.atoms[e]);
    const count = (e, p) => side(e, p).reduce((t, [s, c]) => t + c * s.atoms[e], 0);
    const rows = els.map((e) => ({ e, l: count(e, 0), r: count(e, 1) }));
    /* the equation across the top, coefficients in bold */
    const parts = [];
    r.sp.forEach((s, i) => {
      if (i && s.prod && !r.sp[i - 1].prod) parts.push(['  ⟶  ', 400]); else if (i) parts.push(['  +  ', 400]);
      parts.push([String(co[i]) + ' ', 700], [s.f, 400]);
    });
    const ws = parts.map(([s, w]) => measure(ctx, s, { size: 30, weight: w }));
    let x = MID - ws.reduce((a, b) => a + b, 0) / 2;
    parts.forEach(([s, w], i) => { text(ctx, s, x, 134, PAL.ink, { size: 30, weight: w }); x += ws[i]; });
    text(ctx, 'reactant atoms', MID - 30, 190, PAL.muted, { size: 20, align: 'right' });
    text(ctx, 'product atoms', MID + 30, 190, PAL.muted, { size: 20 });
    const top = 256, gap = Math.min(120, 300 / Math.max(1, rows.length - 1 || 1));
    line(ctx, MID, 212, MID, top + gap * (rows.length - 1) + 50, alpha(PAL.ink, 0.5), 2);
    /* one row of atoms per element; the spacing is one for the chosen reaction, set by the most atoms any of its rows can reach */
    const most = Math.max(...els.flatMap((e) => [0, 1].map((p) => r.sp.filter((s) => s.prod === p).reduce((t, s) => t + 9 * (s.atoms[e] || 0), 0))));
    const step = Math.min(30, REACH / most), rad = Math.max(4, Math.min(11, step * 0.62));
    rows.forEach(({ e, l, r: n }, j) => {
      const y = top + j * gap, rr = e === 'H' ? rad * 0.8 : rad;
      atom(ctx, 46, y, e, 12); text(ctx, cap(NAME[e]), 66, y, PAL.ink, { size: 20, weight: 600 });
      for (let i = 0; i < l; i++) { const ax = MID - 22 - i * step; atom(ctx, ax, y, e, rr); }
      for (let i = 0; i < n; i++) { const ax = MID + 22 + i * step; atom(ctx, ax, y, e, rr); }
      if (l) hits.push(...Array.from({ length: l }, (_, i) => ({ x: MID - 22 - i * step, y, r: Math.max(rr, step / 2), name: l + ' ' + NAME[e] + ' atoms on the reactant side' })));
      if (n) hits.push(...Array.from({ length: n }, (_, i) => ({ x: MID + 22 + i * step, y, r: Math.max(rr, step / 2), name: n + ' ' + NAME[e] + ' atoms on the product side' })));
      text(ctx, String(l), MID - 22 - Math.max(0, l - 1) * step - rr - 12, y, PAL.ink, { size: 22, weight: 600, align: 'right' });
      text(ctx, String(n), MID + 22 + Math.max(0, n - 1) * step + rr + 12, y, PAL.ink, { size: 22, weight: 600 });
      dot(ctx, MID, y - 30, PAL.panel, true, 14);
      text(ctx, l === n ? '=' : '≠', MID, y - 30, PAL.ink, { size: 24, weight: 600, align: 'center' });
    });
    const off = rows.filter((q) => q.l !== q.r), ok = rows.filter((q) => q.l === q.r);
    const g = co.reduce(gcd);
    const atoms = (k) => k + (k === 1 ? ' atom' : ' atoms');
    const list = (xs) => xs.length < 3 ? xs.join(' and ') : xs.slice(0, -1).join(', ') + ' and ' + xs[xs.length - 1];
    headline(ctx, !off.length
      ? (g > 1 ? 'Every element balances, but all the coefficients share the factor ' + g + ', and dividing by it gives the smallest whole numbers.' : 'Every element balances, and these are the smallest whole-number coefficients.')
      : (ok.length ? cap(list(ok.map((q) => NAME[q.e]))) + (ok.length > 1 ? ' balance' : ' balances') + ', but ' : '') + (ok.length ? NAME[off[0].e] : cap(NAME[off[0].e])) + ' has ' + atoms(off[0].l) + ' on the reactant side and ' + off[0].r + ' on the product side.');
    const c = (k) => (k === 1 ? '' : String(k));
    const eq = r.sp.map((s, i) => (i && s.prod && !r.sp[i - 1].prod ? '\\;\\longrightarrow\\;' : i ? '+' : '') + c(co[i]) + s.t).join('');
    const sum = (e, p) => { const t = side(e, p).map(([s, k]) => k + ' × ' + s.atoms[e]); return (t.length > 1 ? t.map((q) => '(' + q + ')').join(' + ') : t[0]) + ' = ' + count(e, p); };
    readout(d.readout, eq + (off.length ? '\\hspace{2em}\\text{(unbalanced)}' : '\\hspace{2em}\\text{(balanced)}'),
      rows.map((q) => cap(NAME[q.e]) + ': ' + sum(q.e, 0) + ' reactant and ' + sum(q.e, 1) + ' product atoms.').join(' '));
  }
  register(d.fig, { update: () => {}, draw });
})();
};
