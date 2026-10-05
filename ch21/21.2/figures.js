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
   FIGURE 21.4: the six particles of nuclear reactions as the book
   tabulates them, name, symbols, representation and description, each
   particle drawn in the element palette (proton p+, neutron n0, electron
   e-, positron e+, photon gamma). A faithful copy: nothing varies.
===================================================================== */
(function () {
  const H = 680, d = sim('sim-particles', H);
  const COLS = [20, 230, 480, 680, 1380], HEAD = 70, ROW = 96, TOP = 20;
  const ROWS = [
    { name: 'Alpha particle', sym: '${}^{4}_{2}\\text{He}$  or  ${}^{4}_{2}\\alpha$', desc: ['(High-energy) helium nuclei consisting of two', 'protons and two neutrons'], rep: 'alpha' },
    { name: 'Beta particle', sym: '${}^{\\;0}_{-1}\\text{e}$  or  ${}^{\\;0}_{-1}\\beta$', desc: ['(High-energy) electrons'], rep: 'beta' },
    { name: 'Positron', sym: '${}^{\\;0}_{+1}\\text{e}$  or  ${}^{\\;0}_{+1}\\beta$', desc: ['Particles with the same mass as an electron', 'but with 1 unit of positive charge'], rep: 'positron' },
    { name: 'Proton', sym: '${}^{1}_{1}\\text{H}$  or  ${}^{1}_{1}\\text{p}$', desc: ['Nuclei of hydrogen atoms'], rep: 'proton' },
    { name: 'Neutron', sym: '${}^{1}_{0}\\text{n}$', desc: ['Particles with a mass approximately equal to', 'that of a proton but with no charge'], rep: 'neutron' },
    { name: 'Gamma ray', sym: '$\\gamma$', desc: ['Very high-energy electromagnetic radiation'], rep: 'gamma' },
  ];
  const rowY = (i) => TOP + HEAD + ROW * i + ROW / 2;
  function rep(ctx, kind, x, y) {
    const P = F.el('p+'), N = F.el('n0');
    if (kind === 'alpha') {
      const r = 15, o = 11;
      disc(ctx, x - o, y - o, r, N); disc(ctx, x + o, y - o, r, P, 1);
      disc(ctx, x - o, y + o, r, P, 1); disc(ctx, x + o, y + o, r, N);
    } else if (kind === 'beta') disc(ctx, x, y, 11, F.el('e-'), -1);
    else if (kind === 'positron') disc(ctx, x, y, 11, F.el('e+'), 1);
    else if (kind === 'proton') disc(ctx, x, y, 15, P, 1);
    else if (kind === 'neutron') disc(ctx, x, y, 15, N);
    else {
      const G = F.el('gamma'), x0 = x - 72, x1 = x + 30;
      ctx.save(); ctx.strokeStyle = G; ctx.lineWidth = 3; ctx.beginPath();
      for (let u = x0; u <= x1; u += 2) { const yy = y + 7 * Math.sin(((u - x0) / 11) * Math.PI); u === x0 ? ctx.moveTo(u, yy) : ctx.lineTo(u, yy); }
      ctx.stroke(); ctx.restore();
      F.arrow(ctx, x1 - 2, y, x1 + 22, y, G, 3);
      text(ctx, '$\\gamma$', x + 66, y, PAL.ink, { size: 26, align: 'center', tex: true });
    }
  }
  function draw() {
    const { ctx } = begin(d.c);
    ctx.save(); ctx.fillStyle = PAL.soft; ctx.fillRect(COLS[0], TOP, COLS[4] - COLS[0], HEAD); ctx.restore();
    const bottom = TOP + HEAD + ROW * ROWS.length;
    for (let i = 0; i <= ROWS.length; i++) line(ctx, COLS[0], TOP + HEAD + ROW * i, COLS[4], TOP + HEAD + ROW * i, PAL.rule, 2);
    line(ctx, COLS[0], TOP, COLS[4], TOP, PAL.rule, 2);
    COLS.forEach((x) => line(ctx, x, TOP, x, bottom, PAL.rule, 2));
    ['Name', 'Symbol(s)', 'Representation', 'Description'].forEach((h, j) =>
      text(ctx, h, (COLS[j] + COLS[j + 1]) / 2, TOP + HEAD / 2, PAL.ink, { size: 26, weight: 600, align: 'center' }));
    ROWS.forEach((r, i) => {
      const y = rowY(i);
      text(ctx, r.name, COLS[0] + 20, y, PAL.ink, { size: 26 });
      text(ctx, r.sym, COLS[1] + 20, y, PAL.ink, { size: 28, tex: true });
      rep(ctx, r.rep, (COLS[2] + COLS[3]) / 2, y);
      const n = r.desc.length;
      r.desc.forEach((s, k) => text(ctx, s, COLS[3] + 20, y + (k - (n - 1) / 2) * 32, PAL.ink, { size: 25 }));
    });
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   SIM: balancing a nuclear equation. One of the section's six reactions
   (Example 21.4 and the five of the history list), every nuclide drawn
   as a packing of its A nucleons, Z of them protons. The reader sets A
   and Z of the product X the book solves for; the sums of mass numbers
   and of charges are written under each side, and the equation balances
   only where both agree, the element then named from Z. The defaults are
   the book's answers. Discs pack on a sunflower spiral, so a nucleus's
   area grows with A. Still: a balance has no clock; a change of reaction
   crossfades the scene, and landing on both circles morphs the arrow.
===================================================================== */
(function () {
  const H = 620, d = sim('sim-nuclear-balance', H);
  const SYM = ' H He Li Be B C N O F Ne Na Mg Al Si P S Cl Ar K Ca Sc Ti V Cr Mn Fe Co Ni Cu Zn Ga Ge As Se Br Kr Rb Sr Y Zr Nb Mo Tc Ru Rh Pd Ag Cd In Sn Sb Te I Xe Cs Ba La Ce Pr Nd Pm Sm Eu Gd Tb Dy Ho Er Tm Yb Lu Hf Ta W Re Os Ir Pt Au Hg Tl Pb Bi Po At Rn Fr Ra Ac Th Pa U Np Pu Am Cm Bk Cf Es Fm'.split(' ');
  const NAME = ' hydrogen helium lithium beryllium boron carbon nitrogen oxygen fluorine neon sodium magnesium aluminum silicon phosphorus sulfur chlorine argon potassium calcium scandium titanium vanadium chromium manganese iron cobalt nickel copper zinc gallium germanium arsenic selenium bromine krypton rubidium strontium yttrium zirconium niobium molybdenum technetium ruthenium rhodium palladium silver cadmium indium tin antimony tellurium iodine xenon cesium barium lanthanum cerium praseodymium neodymium promethium samarium europium gadolinium terbium dysprosium holmium erbium thulium ytterbium lutetium hafnium tantalum tungsten rhenium osmium iridium platinum gold mercury thallium lead bismuth polonium astatine radon francium radium actinium thorium protactinium uranium neptunium plutonium americium curium berkelium californium einsteinium fermium'.split(' ');
  /* a species is [symbol, A, Z, coefficient]; 'X' is the product the reader sets */
  const n = (k = 1) => ['n', 1, 0, k];
  const RX = {
    mg: { label: 'Example 21.4', L: [['Mg', 25, 12, 1], ['He', 4, 2, 1]], R: [['H', 1, 1, 1], 'X'], X: [28, 13] },
    po: { label: 'Curie, 1898', L: [['Po', 212, 84, 1]], R: ['X', ['He', 4, 2, 1]], X: [208, 82] },
    n14: { label: 'Rutherford, 1919', L: [['N', 14, 7, 1], ['He', 4, 2, 1]], R: ['X', ['H', 1, 1, 1]], X: [17, 8] },
    be: { label: 'Chadwick, 1932', L: [['Be', 9, 4, 1], ['He', 4, 2, 1]], R: ['X', n()], X: [12, 6] },
    mo: { label: 'Segre and Perrier, 1937', L: [['H', 2, 1, 1], ['Mo', 97, 42, 1]], R: [n(2), 'X'], X: [97, 43] },
    u: { label: 'Chicago, 1942', L: [['U', 235, 92, 1], n()], R: [['Br', 87, 35, 1], 'X', n(3)], X: [146, 57] },
  };
  const pick = F.select(d.controls, { label: '\\text{reaction}', key: 'reaction', options: Object.entries(RX).map(([value, r]) => ({ value, label: r.label })), value: 'mg',
    aria: 'the nuclear reaction to balance', onInput: () => { const r = RX[pick.value]; A.set(r.X[0]); Z.set(r.X[1]); A.refresh(); Z.refresh(); } });
  const A = F.ctl(d.controls, { label: '\\text{A}', cls: '', key: 'A', min: 1, max: 240, step: 1, value: 28, unit: '', dec: 0, aria: 'mass number A of the product X',
    specials: [{ at: () => RX[pick.value].X[0], label: 'balanced' }] });
  const Z = F.ctl(d.controls, { label: '\\text{Z}', cls: '', key: 'Z', min: 1, max: 100, step: 1, value: 13, unit: '', dec: 0, aria: 'atomic number Z of the product X',
    specials: [{ at: () => RX[pick.value].X[1], label: 'balanced' }] });

  const sp = (s, key) => (s === 'X' ? ['X', key === pick.value ? A.v : RX[key].X[0], key === pick.value ? Z.v : RX[key].X[1], 1] : s);
  const symOf = (s) => (s[0] === 'X' ? SYM[s[2]] ?? 'X' : s[0]);
  const nuc = (s) => `{}^{${s[1]}}_{${s[2]}}\\text{${symOf(s)}}`;
  const term = (s) => (s[3] > 1 ? s[3] : '') + nuc(s);

  /* the nucleons of a nucleus on a sunflower spiral: radius of the disc RN, spacing C */
  const RN = 8, C = 8.6, GOLD = Math.PI * (3 - Math.sqrt(5));
  const radius = (a) => (a <= 1 ? RN : C * Math.sqrt(a - 0.5) + RN);
  function nucleus(ctx, x, y, a, z) {
    const P = F.el('p+'), N = F.el('n0'), zz = Math.min(z, a), order = shuffled(a, a * 131 + zz);
    for (let i = 0; i < a; i++) {
      const r = a <= 1 ? 0 : C * Math.sqrt(i + 0.5), t = i * GOLD;
      disc(ctx, x + r * Math.cos(t), y + r * Math.sin(t), RN, order[i] < zz ? P : N);
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
  const YC = 250;
  /* positions of every species of one reaction, centred on the canvas */
  function layout(key) {
    const r = RX[key], GAP = 34, PLUS = 26, ARR = 130;
    const items = [];
    const side = (list, s) => list.forEach((x, i) => {
      const q = sp(x, key), R = radius(q[1]), w = q[3] * 2 * R + (q[3] - 1) * 8;
      if (i) items.push({ plus: true, w: PLUS });
      items.push({ q, R, w, side: s });
    });
    side(r.L, 'L'); items.push({ arrow: true, w: ARR }); side(r.R, 'R');
    const total = items.reduce((t, it) => t + it.w, 0) + GAP * (items.length - 1);
    let x = 700 - total / 2;
    items.forEach((it) => { it.x = x + it.w / 2; x += it.w + GAP; });
    return items;
  }
  const sums = (list, key, j) => list.map((x) => sp(x, key)).map((q) => ({ c: q[3], v: q[j] }));
  const sumOf = (t) => t.reduce((s, q) => s + q.c * q.v, 0);
  const sumTex = (t) => t.map((q) => (q.c > 1 ? `${q.c} \\times ${q.v}` : `${q.v}`)).join(' + ') + (t.length > 1 || t[0].c > 1 ? ` = ${sumOf(t)}` : '');

  function scene(ctx, key) {
    const items = layout(key), r = RX[key], hits = [];
    const YL = YC + Math.max(...items.map((it) => it.R ?? 0)) + 44;
    items.forEach((it) => {
      if (it.plus) { text(ctx, '+', it.x, YC, PAL.ink, { size: 38, align: 'center' }); return; }
      if (it.arrow) { F.arrow(ctx, it.x - it.w / 2, YC, it.x + it.w / 2, YC, PAL.ink, 4); return; }
      const q = it.q, k = q[3];
      for (let i = 0; i < k; i++) {
        const cx = it.x - it.w / 2 + it.R + i * (2 * it.R + 8);
        nucleus(ctx, cx, YC, q[1], q[2]);
        const who = q[1] === 1 && q[2] === 0 ? 'a neutron' : q[1] === 1 ? 'a proton' : `${NAME[q[2]] ?? 'X'}-${q[1]}: ${Math.min(q[2], q[1])} protons, ${Math.max(q[1] - q[2], 0)} neutrons`;
        hits.push({ x: cx, y: YC, r: Math.max(it.R, 14), name: who });
      }
      if (q[0] === 'X') {
        ctx.save(); ctx.setLineDash(balanced(key) ? [] : [8, 8]); ctx.strokeStyle = alpha(PAL.ink, 0.6); ctx.lineWidth = 2.5;
        ctx.beginPath(); ctx.arc(it.x, YC, it.R + 9, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
      }
      text(ctx, `$${term(q)}$`, it.x, YL, PAL.ink, { size: 32, align: 'center', tex: true });
    });
    /* the two sums under the two sides, = or ≠ under the arrow */
    const arrow = items.find((it) => it.arrow), left = items.filter((it) => it.side === 'L'), right = items.filter((it) => it.side === 'R');
    const mid = (list) => (Math.min(...list.map((it) => it.x - it.w / 2)) + Math.max(...list.map((it) => it.x + it.w / 2))) / 2;
    const lx = Math.min(mid(left), arrow.x - 150), rx = Math.max(mid(right), arrow.x + 150);
    [['mass numbers', 1, H - 132], ['charges', 2, H - 86]].forEach(([what, j, y]) => {
      const a = sums(r.L, key, j), b = sums(r.R, key, j), ok = sumOf(a) === sumOf(b);
      text(ctx, `$${sumTex(a)}$`, lx, y, PAL.ink, { size: 26, align: 'center', tex: true });
      text(ctx, `$${sumTex(b)}$`, rx, y, PAL.ink, { size: 26, align: 'center', tex: true });
      text(ctx, ok ? '=' : '≠', arrow.x, y, ok ? PAL.ink : PAL.muted, { size: 32, align: 'center', weight: 600 });
      text(ctx, what, 24, y, PAL.muted, { size: 21 });
    });
    return hits;
  }
  const balanced = (key) => {
    const r = RX[key];
    return [1, 2].every((j) => sumOf(sums(r.L, key, j)) === sumOf(sums(r.R, key, j))) && sp('X', key)[2] <= sp('X', key)[1];
  };
  function headlineOf() {
    const key = pick.value, r = RX[key], a = A.v, z = Z.v;
    if (z > a) return `With A = ${a} and Z = ${z}, X would hold more protons than nucleons.`;
    const mL = sumOf(sums(r.L, key, 1)), mR = sumOf(sums(r.R, key, 1)), cL = sumOf(sums(r.L, key, 2)), cR = sumOf(sums(r.R, key, 2));
    if (mL === mR && cL === cR) return `With A = ${a} and Z = ${z}, the mass numbers and the charges both balance: X is ${NAME[z]}-${a}.`;
    if (mL !== mR && cL !== cR) return `With A = ${a} and Z = ${z}, the mass numbers come to ${mL} and ${mR}, the charges to ${cL} and ${cR}.`;
    if (mL !== mR) return `With A = ${a}, the mass numbers come to ${mL} on the left and ${mR} on the right.`;
    return `With Z = ${z}, the charges come to ${cL} on the left and ${cR} on the right.`;
  }
  let hits = [];
  F.hover(d.stage, () => hits);
  const ro = F.readout(d);
  function draw() {
    const { ctx } = begin(d.c), key = pick.value, r = RX[key];
    topline(ctx, headlineOf());
    if (pick.k < 1 && pick.from !== key) pick.only(ctx, pick.from, () => scene(ctx, pick.from));
    pick.only(ctx, key, () => { hits = scene(ctx, key); });
    const P = F.el('p+'), N = F.el('n0'), ly = H - 32;
    disc(ctx, 36, ly, RN + 2, P); text(ctx, 'proton', 56, ly, PAL.ink, { size: 21 });
    const nx = 56 + measure(ctx, 'proton', { size: 21 }) + 36;
    disc(ctx, nx, ly, RN + 2, N); text(ctx, 'neutron', nx + 20, ly, PAL.ink, { size: 21 });
    const ok = balanced(key);
    const side = (list, p) => list.map((s, i) => `\\mk{${key}${p}${i}}{${term(sp(s, key))}}`).join(' + ');
    ro.set(`${side(r.L, 'l')} \\;\\mk{arr}{${ok ? '\\longrightarrow' : '\\not\\longrightarrow'}}\\; ${side(r.R, 'r')}`, undefined, { form: `${key}${ok}` });
  }
  register(d.fig, { update: () => {}, draw });
})();
};
