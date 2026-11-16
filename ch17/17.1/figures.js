/* Figures for section 17.1 Review of Redox Chemistry. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['17.1'] = function (root, F) {
const { PAL, alpha, ctl, register, begin, line, dot, text, topline } = F;
const sim = (id, H) => F.sim(root, id, H);
const RAD = Math.PI / 180;

/* =====================================================================
   Sim: the polarization of each bond carried from equal sharing to
   complete transfer. A bonding pair counts 1 − p electrons to the atom
   that gives it up and 1 + p to the more electronegative one, so an atom's
   charge is its valence electrons less the electrons it counts: the formal
   charge at 0 %, the oxidation number at 100 %, and the charges sum to the
   charge on the species at every p. Bonding pairs slide from the middle of
   the bond to the receiving atom; lone pairs hold. The count is written
   out beside the molecule, one row per kind of atom. Still.
===================================================================== */
(function () {
  const H = 660, d = sim('sim-polarization', H);
  const R0 = { O: 48, H: 34, C: 48, Cl: 52, N: 48 };
  const NAME = { O: 'an oxygen atom, O', H: 'a hydrogen atom, H', C: 'the carbon atom, C', Cl: 'a chlorine atom, Cl', N: 'the nitrogen atom, N' };
  const at = (x, y, a, L) => [x + L * Math.cos(a * RAD), y + L * Math.sin(a * RAD)];
  /* k scales a species to its room; atoms [element, x, y, formal charge, lone-pair angles, label direction];
     bonds [giver, taker, order]; rows [atom index, name, valence electrons], one per kind of atom */
  const MOL = {
    H2O: {
      to: 'O', charge: 0, k: 1.35, formula: 'H₂O', ions: 'water would be O²⁻ and two H⁺ ions',
      atoms: [['O', 430, 290, 0, [-60, -120], -90], ['H', ...at(430, 290, 142, 315), 0, [], 142], ['H', ...at(430, 290, 38, 315), 0, [], 38]],
      bonds: [[1, 0, 1], [2, 0, 1]],
      rows: [[0, 'O', 6], [1, 'H', 1]],
    },
    CCl4: {
      to: 'Cl', charge: 0, k: 1, formula: 'CCl₄', ions: 'CCl₄ would be C⁴⁺ and four Cl⁻ ions',
      atoms: [['C', 430, 372, 0, [], -45], ...[-90, 0, 90, 180].map((a) => ['Cl', ...at(430, 372, a, 185), 0, [a - 90, a, a + 90], a + 45])],
      bonds: [[0, 1, 1], [0, 2, 1], [0, 3, 1], [0, 4, 1]],
      rows: [[0, 'C', 4], [1, 'Cl', 7]],
    },
    NO3: {
      to: 'O', charge: -1, k: 1.15, formula: 'NO₃⁻', ions: 'NO₃⁻ would be N⁵⁺ and three O²⁻ ions',
      atoms: [['N', 430, 425, 1, [], 90], ['O', ...at(430, 425, -90, 215), 0, [-30, -150], -90],
        ['O', ...at(430, 425, 150, 215), -1, [60, 150, 240], 195], ['O', ...at(430, 425, 30, 215), -1, [-60, 30, 120], -15]],
      bonds: [[0, 1, 2], [0, 2, 1], [0, 3, 1]],
      rows: [[0, 'N', 5], [1, 'O, double bond', 6], [2, 'O, single bond', 6]],
    },
  };
  const charges = (m, p) => {
    const q = m.atoms.map((a) => a[3]);
    m.bonds.forEach(([g, t, n]) => { q[g] += n * p; q[t] -= n * p; });
    return q;
  };
  const sgn = (x, dec) => { const v = +x.toFixed(dec); return v === 0 ? '0' : (v > 0 ? '+' : '-') + Math.abs(v).toFixed(dec); };
  const shown = (x, dec) => sgn(x, dec).replace('-', '−');

  const mol = F.choice(d.controls, { label: '\\text{species}', aria: 'the covalent species', value: 'H2O',
    options: [{ value: 'H2O', label: 'H₂O' }, { value: 'CCl4', label: 'CCl₄' }, { value: 'NO3', label: 'NO₃⁻' }], });
  const pol = ctl(d.controls, { label: '\\text{polarization}', cls: '', key: 'polarization', min: 0, max: 100, step: 1, value: 100, unit: '%', dec: 0,
    aria: 'polarization of each bond toward the more electronegative atom', specials: [{ at: 100, label: 'complete transfer' }] });
  const ro = F.readout(d);
  let hits = []; F.hover(d.stage, () => hits);

  function readout(key, p) {
    const m = MOL[key], whole = p === 1, dec = whole || p === 0 ? 0 : 2, q = charges(m, p), s = (x) => sgn(x, dec);
    const term = (k, n, el, x) => `\\mk{${k}}{(\\text{${n} ${el}})(${s(x)})}`;
    const tot = (k, x, first) => { const v = s(x); return `\\mk{${k}}{${first ? v : v.startsWith('-') ? `(${v})` : v.replace('+', '')}}`; };
    const sum = `\\mk{q}{${sgn(m.charge, 0)}}`;
    if (key === 'H2O') return [`${term('O', 1, 'O', q[0])}+${term('H', 2, 'H', q[1])}=${tot('tO', q[0], true)}+${tot('tH', 2 * q[1])}=${sum}`, 'w'];
    if (key === 'CCl4') return [`${term('C', 1, 'C', q[0])}+${term('Cl', 4, 'Cl', q[1])}=${tot('tC', q[0], true)}+${tot('tCl', 4 * q[1])}=${sum}`, 'c'];
    if (whole) return [`${term('N', 1, 'N', q[0])}+${term('O3', 3, 'O', q[1])}=${tot('tN', q[0], true)}+${tot('tO3', 3 * q[1])}=${sum}`, 'n1'];
    return [`${term('N', 1, 'N', q[0])}+${term('Od', 1, 'O', q[1])}+${term('Os', 2, 'O', q[2])}=${tot('tN', q[0], true)}+${tot('tOd', q[1])}+${tot('tOs', 2 * q[2])}=${sum}`, 'n0'];
  }
  let lastForm = null;
  function setReadout() {
    const [s, form] = readout(mol.value, pol.v / 100);
    const keyMap = lastForm === 'n0' && form === 'n1' ? { Od: 'O3', Os: 'O3', tOd: 'tO3', tOs: 'tO3' }
      : lastForm === 'n1' && form === 'n0' ? { O3: ['Od', 'Os'], tO3: ['tOd', 'tOs'] } : undefined;
    ro.set(s, undefined, { form: mol.value + form, ...(keyMap ? { keyMap } : {}) });
    lastForm = form;
  }

  const disc = (ctx, el, x, y, r) => {
    ctx.save(); ctx.fillStyle = F.el(el); ctx.strokeStyle = alpha(PAL.ink, 0.5); ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(x, y, r, 0, 2 * Math.PI); ctx.fill(); ctx.stroke(); ctx.restore();
  };

  function scene(ctx, key, p, lab, live) {
    const m = MOL[key], k = m.k, q = charges(m, p), e = F.el('e-'), whole = p === 1, ER = 9 * k, GAP = 18 * k, r = (el) => R0[el] * k;
    const pair = (cx, cy, nx, ny, offs, name) => offs.forEach((o) => { const x = cx + nx * o * k, y = cy + ny * o * k; dot(ctx, x, y, e, true, ER); if (lab) lab.block(x - ER, y - ER, x + ER, y + ER); if (live) hits.push({ x, y, r: ER + 2, name }); });
    m.bonds.forEach(([g, t, n]) => {
      const [ge, ax, ay] = m.atoms[g], [te, bx, by] = m.atoms[t], L = Math.hypot(bx - ax, by - ay), ux = (bx - ax) / L, uy = (by - ay) / L;
      const ga = r(ge), gb = r(te);
      /* the line the pair slides along, gone once the pair is wholly the taker's */
      if (p < 1) line(ctx, ax + ux * ga, ay + uy * ga, bx - ux * gb, by - uy * gb, alpha(PAL.ink, 0.4 * (1 - p * p)), 2, [4, 8]);
      const mx = (ax + ux * ga + bx - ux * gb) / 2, my = (ay + uy * ga + by - uy * gb) / 2;
      const ex = bx - ux * (gb + GAP), ey = by - uy * (gb + GAP);
      pair(mx + p * (ex - mx), my + p * (ey - my), -uy, ux, n === 2 ? [-32, -12, 12, 32] : [-11, 11], n === 2 ? 'two bonding pairs of electrons' : 'a bonding pair of electrons');
    });
    m.atoms.forEach(([el, x, y, , lone]) => lone.forEach((a) => {
      const [cx, cy] = at(x, y, a, r(el) + GAP);
      pair(cx, cy, -Math.sin(a * RAD), Math.cos(a * RAD), [-11, 11], 'a lone pair of electrons');
    }));
    m.atoms.forEach(([el, x, y, , , la], i) => {
      disc(ctx, el, x, y, r(el));
      if (live) hits.push({ x, y, r: r(el), name: NAME[el] });
      if (lab) lab.block(x - r(el), y - r(el), x + r(el), y + r(el));
      if (lab) { const ux = Math.cos(la * RAD), uy = Math.sin(la * RAD); lab.add(`${el} ${shown(q[i], whole || p === 0 ? 0 : 2)}`, x + ux * (r(el) + 12), y + uy * (r(el) + 12), ux, uy, PAL.ink, 28, 44); }
    });
  }

  /* the count behind each charge: valence electrons of the atom in its element, less the electrons it counts here */
  const COL = { sw: 902, name: 930, val: 1120, minus: 1178, cnt: 1235, eq: 1292, q: 1345 };
  function ledger(ctx, key, p) {
    const m = MOL[key], q = charges(m, p), dec = p === 1 || p === 0 ? 0 : 2, n = m.rows.length;
    const y0 = 345 - (n - 1) * 42, hy = y0 - 104;
    const head = (a, b, x, strong) => {
      text(ctx, a, x, hy, strong ? PAL.ink : PAL.muted, { size: 18, align: 'center', weight: strong ? 600 : 400 });
      if (b) text(ctx, b, x, hy + 24, strong ? PAL.ink : PAL.muted, { size: 18, align: 'center', weight: strong ? 600 : 400 });
    };
    head('valence e⁻', 'in the element', COL.val);
    head('e⁻ counted', `in ${m.formula}`, COL.cnt);
    if (p === 1) head('oxidation', 'number', COL.q, true); else if (p === 0) head('formal', 'charge', COL.q, true); else head('charge', '', COL.q);
    line(ctx, COL.sw - 22, hy + 48, 1388, hy + 48, PAL.rule, 1.5);
    m.rows.forEach(([i, name, val], j) => {
      const y = y0 + j * 84, o = { size: 30, align: 'center' };
      disc(ctx, m.atoms[i][0], COL.sw, y, 16);
      text(ctx, name, COL.name, y, PAL.ink, { size: 22, align: 'left', base: 'middle' });
      text(ctx, String(val), COL.val, y, PAL.ink, { ...o, base: 'middle' });
      text(ctx, '−', COL.minus, y, PAL.muted, { ...o, base: 'middle' });
      text(ctx, (val - q[i]).toFixed(dec), COL.cnt, y, PAL.ink, { ...o, base: 'middle' });
      text(ctx, '=', COL.eq, y, PAL.muted, { ...o, base: 'middle' });
      text(ctx, shown(q[i], dec), COL.q, y, PAL.ink, { ...o, base: 'middle', weight: 600 });
    });
  }

  function draw() {
    const { ctx } = begin(d.c), p = pol.v / 100, key = mol.value, m = MOL[key], X = m.to;
    hits = [];
    const lines = topline(ctx, p === 1 ? `With every bonding pair given to ${X}, ${m.ions}.`
      : p === 0 ? 'Shared equally, each bonding pair counts one electron to each atom it joins.'
      : `Each bonding pair leans toward ${X}, the more electronegative atom, and ${X} counts more of it.`);
    const lab = F.labeller(ctx, H, { headline: lines });
    for (const o of Object.keys(MOL)) {
      if (o === key) continue;
      mol.only(ctx, o, () => { scene(ctx, o, p, null, false); ledger(ctx, o, p); });
    }
    mol.only(ctx, key, () => { scene(ctx, key, p, lab, true); ledger(ctx, key, p); lab.flush(); });
    F.legend(ctx, { l: 0, r: 1400, t: 0, b: H }, [{ s: 'electron', kind: 'dot', color: F.el('e-') }], { corner: 'bl' });
    setReadout();
  }
  register(d.fig, { update: () => {}, draw });
})();
};
