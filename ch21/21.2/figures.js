/* Figures for section 21.2 Nuclear Equations. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['21.2'] = function (root, F) {
const { PAL, alpha, register, begin, line, text, topline, measure } = F;
const sim = (id, H) => F.sim(root, id, H);

/* A particle drawn as a disc in its palette colour, its charge as a sign drawn on it. */
function sign(ctx, x, y, r, s) {
  const a = r * 0.5;
  line(ctx, x - a, y, x + a, y, PAL.panel, Math.max(2, r * 0.2));
  if (s > 0) line(ctx, x, y - a, x, y + a, PAL.panel, Math.max(2, r * 0.2));
}
function disc(ctx, x, y, r, fill, s) {
  ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fillStyle = fill; ctx.fill();
  ctx.strokeStyle = alpha(PAL.ink, 0.45); ctx.lineWidth = Math.max(1, r * 0.09); ctx.stroke(); ctx.restore();
  if (s) sign(ctx, x, y, r, s);
}

/* =====================================================================
   SIM: balancing a nuclear equation. One of the section's six reactions
   (Example 21.4 and the five of the history list), every nuclide drawn
   as a packing of its A nucleons, Z of them protons, at one scale for
   the reaction so the row fills the stage. The reader sets A and Z of
   the product X the book solves for; X is redrawn nucleon by nucleon,
   the arrow is struck through until both sums agree, and the readout
   writes the two sums the book writes (mass numbers, charges) with each
   side's total under it. The sliders run up to the left side's totals,
   since X cannot hold more than the reactants bring. The defaults are
   the book's answers. Still: a balance has no clock.
===================================================================== */
(function () {
  const H = 590, d = sim('sim-nuclear-balance', H);
  const SYM = ' H He Li Be B C N O F Ne Na Mg Al Si P S Cl Ar K Ca Sc Ti V Cr Mn Fe Co Ni Cu Zn Ga Ge As Se Br Kr Rb Sr Y Zr Nb Mo Tc Ru Rh Pd Ag Cd In Sn Sb Te I Xe Cs Ba La Ce Pr Nd Pm Sm Eu Gd Tb Dy Ho Er Tm Yb Lu Hf Ta W Re Os Ir Pt Au Hg Tl Pb Bi Po At Rn Fr Ra Ac Th Pa U Np Pu Am Cm Bk Cf Es Fm'.split(' ');
  const NAME = ' hydrogen helium lithium beryllium boron carbon nitrogen oxygen fluorine neon sodium magnesium aluminum silicon phosphorus sulfur chlorine argon potassium calcium scandium titanium vanadium chromium manganese iron cobalt nickel copper zinc gallium germanium arsenic selenium bromine krypton rubidium strontium yttrium zirconium niobium molybdenum technetium ruthenium rhodium palladium silver cadmium indium tin antimony tellurium iodine xenon cesium barium lanthanum cerium praseodymium neodymium promethium samarium europium gadolinium terbium dysprosium holmium erbium thulium ytterbium lutetium hafnium tantalum tungsten rhenium osmium iridium platinum gold mercury thallium lead bismuth polonium astatine radon francium radium actinium thorium protactinium uranium neptunium plutonium americium curium berkelium californium einsteinium fermium'.split(' ');
  /* a species is [symbol, A, Z, coefficient]; 'X' is the product the reader sets */
  const n = (k = 1) => ['n', 1, 0, k];
  const RX = {
    mg: { label: 'Example 21.4', L: [['Mg', 25, 12, 1], ['He', 4, 2, 1]], R: [['H', 1, 1, 1], 'X'], X: [28, 13] },
    po: { label: '²¹²Po decays', L: [['Po', 212, 84, 1]], R: ['X', ['He', 4, 2, 1]], X: [208, 82] },
    n14: { label: '¹⁴N + α', L: [['N', 14, 7, 1], ['He', 4, 2, 1]], R: ['X', ['H', 1, 1, 1]], X: [17, 8] },
    be: { label: '⁹Be + α', L: [['Be', 9, 4, 1], ['He', 4, 2, 1]], R: ['X', n()], X: [12, 6] },
    mo: { label: '⁹⁷Mo + ²H', L: [['H', 2, 1, 1], ['Mo', 97, 42, 1]], R: [n(2), 'X'], X: [97, 43] },
    u: { label: '²³⁵U + n', L: [['U', 235, 92, 1], n()], R: [['Br', 87, 35, 1], 'X', n(3)], X: [146, 57] },
  };
  const tot = (key, j) => RX[key].L.reduce((t, q) => t + q[3] * q[j], 0);   /* the left side's total: the most X can hold */
  const rangeA = (key) => ({ min: 1, max: tot(key, 1), step: 1, value: RX[key].X[0], unit: '', dec: 0 });
  const rangeZ = (key) => ({ min: 1, max: tot(key, 2), step: 1, value: RX[key].X[1], unit: '', dec: 0 });
  const pick = F.select(d.controls, { label: '\\text{reaction}', key: 'reaction', options: Object.entries(RX).map(([value, r]) => ({ value, label: r.label })), value: 'mg',
    aria: 'the nuclear reaction to balance', onInput: () => { A.range(rangeA(pick.value)); Z.range(rangeZ(pick.value)); A.refresh(); Z.refresh(); } });
  const A = F.ctl(d.controls, { label: '\\text{A of X}', cls: '', key: 'A', ...rangeA('mg'), aria: 'mass number A of the product X',
    specials: [{ at: () => RX[pick.value].X[0], label: 'balanced' }] });
  const Z = F.ctl(d.controls, { label: '\\text{Z of X}', cls: '', key: 'Z', ...rangeZ('mg'), aria: 'atomic number Z of the product X',
    specials: [{ at: () => RX[pick.value].X[1], label: 'balanced' }] });

  const cur = (key) => (key === pick.value ? [A.v, Z.v] : RX[key].X);
  const sp = (s, key) => (s === 'X' ? ['X', ...cur(key), 1] : s);
  const symOf = (s) => (s[0] === 'X' ? SYM[s[2]] ?? 'X' : s[0]);
  const nuc = (s) => `{}^{${s[1]}}_{${s[2]}}\\text{${symOf(s)}}`;
  const term = (s) => (s[3] > 1 ? s[3] : '') + nuc(s);

  /* the nucleons of a nucleus on a sunflower spiral, in units of the spacing c: a disc is 0.95 c in radius */
  const RN = 0.95, GOLD = Math.PI * (3 - Math.sqrt(5)), BAND = 350, GAP = 40, PLUS = 30, ARR = 150, CO = 10;
  const radius = (a) => (a <= 1 ? RN : Math.sqrt(a - 0.5) + RN);
  function nucleus(ctx, x, y, a, z, c) {
    const P = F.el('p+'), N = F.el('n0'), zz = Math.min(z, a), order = shuffled(a, a * 131 + zz);
    for (let i = 0; i < a; i++) {
      const r = a <= 1 ? 0 : c * Math.sqrt(i + 0.5), t = i * GOLD, p = order[i] < zz;
      disc(ctx, x + r * Math.cos(t), y + r * Math.sin(t), RN * c, p ? P : N, p && c >= 9 ? 1 : 0);
    }
  }
  /* which places of a nucleus hold its protons: a fixed shuffle for each A and Z, so the two kinds mix */
  const shuffles = new Map();
  function shuffled(a, seed) {
    if (shuffles.has(seed)) return shuffles.get(seed);
    let s = seed % 2147483647 || 1;
    const o = Array.from({ length: a }, (_, i) => i);
    for (let i = a - 1; i > 0; i--) { s = (s * 48271) % 2147483647; const j = s % (i + 1); [o[i], o[j]] = [o[j], o[i]]; }
    shuffles.set(seed, o); return o;
  }
  /* One scale and one set of places for a reaction, whatever X is set to: X's place is as wide as the
     largest nucleus the slider reaches, so nothing else moves while the reader counts. */
  const plans = new Map();
  function plan(key) {
    if (plans.has(key)) return plans.get(key);
    const r = RX[key], items = [];
    const side = (list, s) => list.forEach((x, i) => {
      const q = x === 'X' ? ['X', tot(key, 1), 0, 1] : x;
      if (i) items.push({ plus: true, fixed: PLUS, u: 0 });
      items.push({ x0: x, side: s, R: radius(q[1]), k: q[3], u: q[3] * 2 * radius(q[1]), fixed: (q[3] - 1) * CO });
    });
    side(r.L, 'L'); items.push({ arrow: true, fixed: ARR, u: 0 }); side(r.R, 'R');
    const U = items.reduce((t, it) => t + it.u, 0), fixed = items.reduce((t, it) => t + it.fixed, 0) + GAP * (items.length - 1);
    const maxR = Math.max(...items.map((it) => it.R ?? 0));
    const c = Math.min(23, (1300 - fixed) / U, BAND / (2 * maxR));
    let x = 700 - (c * U + fixed) / 2;
    items.forEach((it) => { it.w = c * it.u + it.fixed; it.x = x + it.w / 2; x += it.w + GAP; });
    const p = { items, c, maxR: maxR * c };
    plans.set(key, p); return p;
  }
  const sums = (list, key, j) => list.map((x) => sp(x, key)).map((q) => ({ c: q[3], v: q[j] }));
  const sumOf = (t) => t.reduce((s, q) => s + q.c * q.v, 0);
  const sumTex = (t) => {
    const s = t.map((q) => (q.c > 1 ? `${q.c} \\times ${q.v}` : `${q.v}`)).join(' + ');
    return t.length > 1 || t[0].c > 1 ? `\\underbrace{${s}}_{${sumOf(t)}}` : s;
  };
  const balanced = (key) => {
    const r = RX[key], x = sp('X', key);
    return [1, 2].every((j) => sumOf(sums(r.L, key, j)) === sumOf(sums(r.R, key, j))) && x[2] <= x[1];
  };

  function scene(ctx, key) {
    const { items, c, maxR } = plan(key), hits = [], ok = balanced(key);
    /* the nuclei and their symbols stand as one block, centred between the headline and the key */
    const YC = 84 + (BAND + 64) / 2 - 32, YL = YC + maxR + 50;
    items.forEach((it) => {
      if (it.plus) { text(ctx, '+', it.x, YC, PAL.ink, { size: 44, align: 'center' }); return; }
      if (it.arrow) {
        F.arrow(ctx, it.x - it.w / 2, YC, it.x + it.w / 2, YC, ok ? PAL.ink : PAL.muted, 5);
        if (!ok) { line(ctx, it.x - 22, YC + 26, it.x + 2, YC - 26, PAL.ink, 5); text(ctx, 'not balanced', it.x, YC + 52, PAL.muted, { size: 20, align: 'center' }); }
        return;
      }
      const q = sp(it.x0, key), isX = q[0] === 'X';
      for (let i = 0; i < it.k; i++) {
        const cx = it.x - it.w / 2 + it.R * c + i * (2 * it.R * c + CO);
        nucleus(ctx, cx, YC, q[1], q[2], c);
        const who = q[1] === 1 && q[2] === 0 ? 'neutron' : q[1] === 1 && q[2] === 1 ? 'proton' : `${isX ? 'X, ' : ''}${NAME[q[2]] ?? 'no known element'}-${q[1]}: ${Math.min(q[2], q[1])} protons, ${Math.max(q[1] - q[2], 0)} neutrons`;
        hits.push({ x: cx, y: YC, r: Math.max(isX ? it.R * c : radius(q[1]) * c, 16), name: who });
      }
      if (isX) {
        ctx.save(); ctx.setLineDash(ok ? [] : [10, 10]); ctx.strokeStyle = alpha(PAL.ink, 0.6); ctx.lineWidth = 3;
        ctx.beginPath(); ctx.arc(it.x, YC, it.R * c + 8, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
        text(ctx, 'X', it.x + it.R * c * 0.74 + 20, YC - it.R * c * 0.74 - 16, PAL.ink, { size: 26, weight: 600, align: 'center' });
      }
      text(ctx, `$${term(q)}$`, it.x, YL, PAL.ink, { size: 38, align: 'center', tex: true });
    });
    return hits;
  }
  function headlineOf() {
    const key = pick.value, r = RX[key], a = A.v, z = Z.v;
    if (z > a) return `With A = ${a} and Z = ${z}, X would hold more protons than nucleons.`;
    const mL = sumOf(sums(r.L, key, 1)), mR = sumOf(sums(r.R, key, 1)), cL = sumOf(sums(r.L, key, 2)), cR = sumOf(sums(r.R, key, 2));
    if (mL === mR && cL === cR) return `With A = ${a} and Z = ${z}, the mass numbers and the charges both balance: X is ${NAME[z]}-${a}.`;
    if (mL !== mR && cL !== cR) return `With A = ${a} and Z = ${z}, the mass numbers come to ${mL} and ${mR}, the charges to ${cL} and ${cR}.`;
    if (mL !== mR) return `With A = ${a}, the mass numbers come to ${mL} on the left and ${mR} on the right.`;
    return `With Z = ${z}, the charges come to ${cL} on the left and ${cR} on the right.`;
  }
  const KEY = [
    { s: 'proton', draw: (ctx, x, y) => disc(ctx, x, y, 11, F.el('p+'), 1) },
    { s: 'neutron', draw: (ctx, x, y) => disc(ctx, x, y, 11, F.el('n0'), 0) },
  ];
  let hits = [];
  F.hover(d.stage, () => hits);
  const ro = F.readout(d);
  function draw() {
    const { ctx } = begin(d.c), key = pick.value, r = RX[key];
    topline(ctx, headlineOf());
    if (pick.k < 1 && pick.from !== key) pick.only(ctx, pick.from, () => scene(ctx, pick.from));
    pick.only(ctx, key, () => { hits = scene(ctx, key); });
    F.legend(ctx, { l: 0, r: 1400, t: 0, b: H - 4 }, KEY, { corner: 'bottom', row: true, size: 20 });
    const row = (what, j) => {
      const a = sums(r.L, key, j), b = sums(r.R, key, j);
      return `\\text{${what}:}\\;\\; ${sumTex(a)} ${sumOf(a) === sumOf(b) ? '\\;=\\;' : '\\;\\ne\\;'} ${sumTex(b)}`;
    };
    ro.set(`${row('mass numbers', 1)} \\\\ ${row('charges', 2)}`, undefined, { form: `${key}${balanced(key)}` });
  }
  register(d.fig, { update: () => {}, draw });
})();
};
