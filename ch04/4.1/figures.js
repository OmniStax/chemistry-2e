/* Figures for section 4.1 Writing and Balancing Chemical Equations. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['4.1'] = function (root, F) {
const { tex, PAL, alpha, ctl, cycle, register, begin, line, arrow, text, measure } = F;
const sim = (id, H) => F.sim(root, id, H);

const TAU = 2 * Math.PI;
const NAME = { H: 'hydrogen', C: 'carbon', N: 'nitrogen', O: 'oxygen' };
const RAD = { H: 11, C: 19, N: 16, O: 16 };
/* a deterministic scatter, the same on every redraw */
const rnd = (i) => { const s = Math.sin(i * 12.9898 + 78.233) * 43758.5453; return s - Math.floor(s); };
/* one atom of a space-filling model: a disc in its element's colour, hydrogen outlined so that it reads on a light page */
function atom(ctx, x, y, sym, r) {
  ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fillStyle = F.el(sym); ctx.fill();
  ctx.lineWidth = sym === 'H' ? 2 : 1.2; ctx.strokeStyle = sym === 'H' ? PAL.ink : alpha(PAL.ink, 0.4); ctx.stroke(); ctx.restore();
}
/* each molecule as its atoms about its centre, the atoms behind listed first, so that the spheres overlap as the book's models do */
const MOL = {
  CH4: { of: 'a methane molecule, CH₄', at: [['H', -14, -14], ['H', 14, -14], ['C', 0, 0], ['H', -15, 15], ['H', 15, 15]] },
  O2: { of: 'an oxygen molecule, O₂', at: [['O', -12, 0], ['O', 12, 0]] },
  CO2: { of: 'a carbon dioxide molecule, CO₂', at: [['O', -26, 0], ['O', 26, 0], ['C', 0, 0]] },
  H2O: { of: 'a water molecule, H₂O', at: [['O', 0, 0], ['H', -15, 13], ['H', 15, 13]] },
  H2: { of: 'a hydrogen molecule, H₂', at: [['H', -8, 0], ['H', 8, 0]] },
  N2: { of: 'a nitrogen molecule, N₂', at: [['N', -12, 0], ['N', 12, 0]] },
  NH3: { of: 'an ammonia molecule, NH₃', at: [['N', 0, 0], ['H', -17, 10], ['H', 17, 10], ['H', 0, 18]] },
  C2H6: { of: 'an ethane molecule, C₂H₆', at: [['H', -22, -19], ['H', 22, -19], ['C', -15, 0], ['C', 15, 0], ['H', -35, 0], ['H', 35, 0], ['H', -22, 19], ['H', 22, 19]] },
  N2O5: { of: 'a dinitrogen pentoxide molecule, N₂O₅', at: [['O', -39, -17], ['O', -39, 17], ['O', 39, -17], ['O', 39, 17], ['N', -22, 0], ['N', 22, 0], ['O', 0, 7]] },
};
/* where the atoms of one molecule stand: centre (x, y), turned by a, drawn at scale s */
const place = (key, x, y, a, s = 1) => MOL[key].at.map(([e, dx, dy]) => [e, x + s * (dx * Math.cos(a) - dy * Math.sin(a)), y + s * (dx * Math.sin(a) + dy * Math.cos(a)), s * RAD[e]]);
function molecule(ctx, key, x, y, a, s, hits) {
  place(key, x, y, a, s).forEach(([e, ax, ay, r]) => { atom(ctx, ax, ay, e, r); if (hits) hits.push({ x: ax, y: ay, r: r + 2, name: NAME[e] + ' atom of ' + MOL[key].of }); });
}

/* =====================================================================
   FIGURE 4.3: the mixture before reaction and the mixture after it, in
   space-filling models. Each row is one methane molecule and the two
   oxygen molecules it reacts with; row by row their nine atoms cross
   to the other mixture and stand there as one carbon dioxide and two
   water molecules. No atom appears and none is lost: the nine discs
   that leave are the nine that arrive. The slider sets the number of
   methane molecules (the book's picture has three). The two mixtures
   are the caption's referents, outlined and titled in their colours;
   atoms are in their element colours; counts are ink.
===================================================================== */
(function () {
  const d = sim('sim-methane', 720);
  const n = () => Math.round(N.v);
  const cy = cycle(() => n(), 1.4);
  const N = ctl(d.controls, { label: '\\text{methane molecules}', cls: '', key: 'methane', min: 1, max: 6, step: 1, value: 3, unit: '', dec: 0, aria: 'number of methane molecules', onInput: () => cy.reset() });
  let hits = []; F.hover(d.stage, () => hits);
  const L = { l: 30, r: 650 }, R = { l: 750, r: 1370 }, TOP = 62, BOT = 692, MIDY = 376, SM = 1.05;
  /* the columns: methane and its two oxygens on the left; carbon dioxide and the two waters on the right */
  const XL = [150, 350, 500], XR = [910, 1110, 1250];
  /* which reactant atom becomes which product atom: [molecule, atom] before, [molecule, atom] after.
     Molecules before: 0 CH4, 1 and 2 O2. After: 0 CO2, 1 and 2 H2O. */
  const MAP = [
    [[0, 2], [0, 2]],                                   /* the carbon */
    [[1, 0], [0, 0]], [[1, 1], [0, 1]],                 /* one O2 becomes the oxygens of CO2 */
    [[2, 0], [1, 0]], [[2, 1], [2, 0]],                 /* the other gives each water its oxygen */
    [[0, 0], [1, 1]], [[0, 3], [1, 2]], [[0, 1], [2, 1]], [[0, 4], [2, 2]],   /* four hydrogens, two to each water */
  ];
  const BEFORE = ['CH4', 'O2', 'O2'], AFTER = ['CO2', 'H2O', 'H2O'];
  const ease = (u) => u * u * (3 - 2 * u);
  /* the atom tally of one mixture: a disc of each element, its count and its name */
  function tally(ctx, cx, y, k) {
    const counts = [['C', k], ['H', 4 * k], ['O', 4 * k]], parts = counts.map(([s, c]) => c + ' ' + NAME[s]), gap = 34;
    const ws = parts.map((p) => measure(ctx, p, { size: 22 }) + 28), total = ws.reduce((a, b) => a + b, 0) + gap * (ws.length - 1);
    let x = cx - total / 2;
    counts.forEach(([s], i) => { atom(ctx, x + 9, y, s, s === 'H' ? 7 : 9); text(ctx, parts[i], x + 28, y, PAL.ink, { size: 22 }); x += ws[i] + gap; });
  }
  function draw() {
    const { ctx } = begin(d.c); hits = [];
    const m = n(), t = cy.now(), done = Math.min(m, Math.floor(t + 1e-9));
    const rb = F.ref('before'), ra = F.ref('after');
    [[L, rb, 'Mixture before reaction'], [R, ra, 'Mixture after reaction']].forEach(([b, c, s]) => {
      ctx.save(); ctx.strokeStyle = c; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.roundRect(b.l, TOP, b.r - b.l, BOT - TOP, 10); ctx.stroke(); ctx.restore();
      text(ctx, s, (b.l + b.r) / 2, 34, c, { size: 24, weight: 600, align: 'center' });
    });
    arrow(ctx, 668, MIDY, 732, MIDY, PAL.muted, 4);
    text(ctx, m + ' methane, CH_4', XL[0], 98, PAL.ink, { size: 22, align: 'center' });
    text(ctx, 2 * m + ' oxygen, O_2', (XL[1] + XL[2]) / 2, 98, PAL.ink, { size: 22, align: 'center' });
    text(ctx, done + ' carbon dioxide, CO_2', XR[0], 98, PAL.ink, { size: 22, align: 'center' });
    text(ctx, 2 * done + ' water, H_2O', (XR[1] + XR[2]) / 2, 98, PAL.ink, { size: 22, align: 'center' });
    const rh = Math.min(112, 486 / m), y0 = MIDY - ((m - 1) * rh) / 2;
    const flying = [];
    for (let i = 0; i < m; i++) {
      const y = y0 + i * rh, u = ease(Math.min(1, Math.max(0, t - i)));
      const turnB = [(rnd(i + 1) - 0.5) * 1.4, (rnd(i + 11) - 0.5) * 1.5, (rnd(i + 21) - 0.5) * 1.5], turnA = [(rnd(i + 31) - 0.5) * 0.5, (rnd(i + 41) - 0.5) * 0.9, (rnd(i + 51) - 0.5) * 0.9];
      const pb = BEFORE.map((k, j) => place(k, XL[j], y, turnB[j], SM)), pa = AFTER.map((k, j) => place(k, XR[j], y, turnA[j], SM));
      if (u <= 0) { BEFORE.forEach((k, j) => molecule(ctx, k, XL[j], y, turnB[j], SM, hits)); continue; }
      /* where the molecules stood, faint, so that the mixture before can still be counted */
      F.faded(ctx, 0.3, [0, 0], () => BEFORE.forEach((k, j) => molecule(ctx, k, XL[j], y, turnB[j], SM)));
      if (u >= 1) { AFTER.forEach((k, j) => molecule(ctx, k, XR[j], y, turnA[j], SM, hits)); continue; }
      MAP.forEach(([[bm, ba], [am, aa]], q) => {
        const a = pb[bm][ba], b = pa[am][aa], lift = Math.sin(Math.PI * u) * (q % 2 ? 1 : -1) * (14 + 30 * rnd(q + 7 * i));
        flying.push({ e: a[0], x: a[1] + (b[1] - a[1]) * u, y: a[2] + (b[2] - a[2]) * u + lift, r: a[3], z: u < 0.5 ? MOL[BEFORE[bm]].at.length * bm + ba : 10 * am + aa });
      });
    }
    flying.sort((p, q) => p.z - q.z).forEach((p) => { atom(ctx, p.x, p.y, p.e, p.r); hits.push({ x: p.x, y: p.y, r: p.r + 2, name: NAME[p.e] + ' atom' }); });
    tally(ctx, (L.l + L.r) / 2, 662, m);
    tally(ctx, (R.l + R.r) / 2, 662, done);
    const sp = '\\text{CH}_4 : \\text{O}_2 : \\text{CO}_2 : \\text{H}_2\\text{O} = ';
    tex(d.readout, sp + (m > 1 ? `${m}:${2 * m}:${m}:${2 * m} = ` : '') + '1:2:1:2');
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => n() / Math.min(6, 2.2 + 0.7 * n())), draw, arrive: false });
})();

/* =====================================================================
   SIM: balancing by inspection. One of the section's four reactions is
   chosen and its coefficients are set one species at a time; the
   subscripts are fixed. Each species stands as that many whole
   molecules under its name, the first row reading across as the
   equation does in Figure 4.2 and the rest stacked beneath it, and
   under them the book's own counting table (Element, Reactants,
   Products, Balanced?) is written with the live coefficients.
   Still: no clock. Counts are ink; atoms are in their element colours.
===================================================================== */
(function () {
  const d = sim('sim-balance', 660);
  /* each species: its model, its name for the canvas, its TeX, its atoms, and whether it is a product */
  const S = (m, f, t, atoms, prod) => ({ m, f, t, atoms, prod });
  const SP = {
    H2O: (p) => S('H2O', 'water, H_2O', '{\\text{H}}_{2}\\text{O}', { H: 2, O: 1 }, p),
    H2: (p) => S('H2', 'hydrogen, H_2', '{\\text{H}}_{2}', { H: 2 }, p),
    O2: (p) => S('O2', 'oxygen, O_2', '{\\text{O}}_{2}', { O: 2 }, p),
    N2: (p) => S('N2', 'nitrogen, N_2', '{\\text{N}}_{2}', { N: 2 }, p),
    N2O5: (p) => S('N2O5', 'dinitrogen pentoxide, N_2O_5', '{\\text{N}}_{2}{\\text{O}}_{5}', { N: 2, O: 5 }, p),
    C2H6: (p) => S('C2H6', 'ethane, C_2H_6', '{\\text{C}}_{2}{\\text{H}}_{6}', { C: 2, H: 6 }, p),
    CO2: (p) => S('CO2', 'carbon dioxide, CO_2', '{\\text{CO}}_{2}', { C: 1, O: 2 }, p),
    NH3: (p) => S('NH3', 'ammonia, NH_3', '{\\text{NH}}_{3}', { N: 1, H: 3 }, p),
  };
  const RX = {
    water: { name: 'H₂O decomposes', sp: [SP.H2O(0), SP.H2(1), SP.O2(1)] },
    n2o5: { name: 'N₂O₅ forms', sp: [SP.N2(0), SP.O2(0), SP.N2O5(1)] },
    ethane: { name: 'C₂H₆ burns', sp: [SP.C2H6(0), SP.O2(0), SP.H2O(1), SP.CO2(1)] },
    ammonia: { name: 'NH₃ forms', sp: [SP.N2(0), SP.H2(0), SP.NH3(1)] },
  };
  const rx = () => RX[pick.value];
  const plain = (s) => s.f.split(', ')[0];
  const pick = F.select(d.controls, { label: '\\text{reaction}', options: Object.entries(RX).map(([value, r]) => ({ value, label: r.name })), value: 'water', aria: 'the reaction to balance', onInput: choose });
  const K = [0, 1, 2, 3].map((i) => ctl(d.controls, { label: RX.water.sp[Math.min(i, 2)].t, cls: '', key: 'coefficient-' + (i + 1), min: 1, max: 9, step: 1, value: 1, unit: '', dec: 0,
    aria: 'coefficient of ' + plain(RX.water.sp[Math.min(i, 2)]) }));
  function choose() {
    const r = rx();
    /* a reaction of three species has three sliders: the fourth leaves the row, so that the row is laid out for the controls it holds */
    K.forEach((k, i) => { const s = r.sp[i]; if (s) { k.relabel(s.t, 'coefficient of ' + plain(s)); k.set(1); if (!k.el.isConnected) d.controls.appendChild(k.el); } else k.el.remove(); });
    /* each slider is measured again in the row it now stands in */
    K.forEach((k) => k.el.classList.remove('ctl-wrap'));
  }
  choose();
  let hits = []; F.hover(d.stage, () => hits);
  const gcd = (a, b) => (b ? gcd(b, a % b) : a);
  /* the room one model takes, at scale 1 */
  const span = (key) => { const a = MOL[key].at; return [2 * Math.max(...a.map(([e, dx]) => Math.abs(dx) + RAD[e])) + 14, 2 * Math.max(...a.map(([e, , dy]) => Math.abs(dy) + RAD[e])) + 14]; };
  const PY = 122, HT = 660;
  function draw() {
    const { ctx } = begin(d.c); hits = [];
    const r = rx(), co = r.sp.map((_, i) => Math.round(K[i].v)), m = r.sp.length;
    /* the piles: each species as that many whole molecules, three to a row, with + and the arrow between the species */
    const OP = 76, cw = (1340 - (m - 1) * OP) / m;
    /* one scale for the chosen reaction, so that three of its widest model fill a column and three rows fill the band */
    const sz = r.sp.map((s) => span(s.m)), SC = Math.min(1.7, ...sz.map(([w, h]) => Math.min(cw / 3.25 / w, 104 / h))), RH = 104;
    r.sp.forEach((s, i) => {
      const cx = 30 + cw / 2 + i * (cw + OP), wide = Math.max(sz[i][0] * SC, cw / 3.6);
      for (let k = 0; k < co[i]; k++) {
        const row = Math.floor(k / 3), inRow = Math.min(3, co[i] - 3 * row), col = k % 3;
        molecule(ctx, s.m, cx + (col - (inRow - 1) / 2) * wide, PY + row * RH, 0, SC, hits);
      }
      text(ctx, s.f, cx, 40, PAL.ink, { size: 22, align: 'center' });
      if (i) {
        const ox = cx - cw / 2 - OP / 2;
        if (s.prod && !r.sp[i - 1].prod) arrow(ctx, ox - 30, PY, ox + 30, PY, PAL.ink, 3); else text(ctx, '+', ox, PY, PAL.ink, { size: 34, align: 'center' });
      }
    });
    /* the book's counting table with the live coefficients */
    const els = [...new Set(r.sp.flatMap((s) => Object.keys(s.atoms)))];
    const side = (e, p) => r.sp.map((s, i) => [s, co[i]]).filter(([s]) => s.prod === p && s.atoms[e]);
    const count = (e, p) => side(e, p).reduce((t, [s, c]) => t + c * s.atoms[e], 0);
    const sum = (e, p) => { const t = side(e, p).map(([s, k]) => k + ' × ' + s.atoms[e]); return (t.length > 1 ? t.map((q) => '(' + q + ')').join(' + ') : t[0]) + ' = ' + count(e, p); };
    const X = [270, 520, 850, 1150], T0 = HT - 48 * els.length - 84;
    line(ctx, 190, T0 - 14, 1260, T0 - 14, PAL.rule, 2);
    ['Element', 'Reactants', 'Products', 'Balanced?'].forEach((h, i) => text(ctx, h, X[i], T0 + 12, PAL.ink, { size: 22, weight: 600, align: 'center' }));
    line(ctx, 190, T0 + 36, 1260, T0 + 36, PAL.rule, 2);
    let off = 0;
    els.forEach((e, j) => {
      const y = T0 + 68 + 48 * j, a = count(e, 0), b = count(e, 1);
      atom(ctx, X[0] - 24, y, e, 11); hits.push({ x: X[0] - 24, y, r: 14, name: NAME[e] });
      text(ctx, e, X[0] + 4, y, PAL.ink, { size: 24 });
      text(ctx, sum(e, 0), X[1], y, PAL.ink, { size: 24, align: 'center' });
      text(ctx, sum(e, 1), X[2], y, PAL.ink, { size: 24, align: 'center' });
      text(ctx, a === b ? a + ' = ' + b + ', yes' : a + ' ≠ ' + b + ', no', X[3], y, PAL.ink, { size: 24, weight: a === b ? 400 : 600, align: 'center' });
      if (a !== b) off++;
    });
    const g = co.reduce(gcd), c = (k) => (k === 1 ? '' : String(k));
    const eq = r.sp.map((s, i) => (i && s.prod && !r.sp[i - 1].prod ? '\\;\\longrightarrow\\;' : i ? '+' : '') + c(co[i]) + s.t).join('');
    tex(d.readout, eq + '\\hspace{2em}\\text{(' + (off ? 'unbalanced' : g > 1 ? 'balanced, but each coefficient can be divided by ' + g : 'balanced') + ')}');
  }
  register(d.fig, { update: () => {}, draw });
})();
};
