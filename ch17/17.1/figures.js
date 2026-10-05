/* Figures for section 17.1 Review of Redox Chemistry. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['17.1'] = function (root, F) {
const { PAL, alpha, ctl, register, begin, line, dot, text, topline } = F;
const sim = (id, H) => F.sim(root, id, H);
const RAD = Math.PI / 180;

/* =====================================================================
   Sim: the polarization of each bond carried from equal sharing to
   complete transfer. Each atom counts its formal charge q0 at 0 % and
   gains one charge per bonding pair, + for the atom that gives the pair up
   and − for the one that takes it, at 100 %: q = q0 + p·dq, so the sum is
   the charge on the species at every p. Bonding pairs slide from the
   middle of the bond to the receiving atom; lone pairs hold. Still.
===================================================================== */
(function () {
  const H = 580, d = sim('sim-polarization', H);
  const R = { O: 38, H: 27, C: 38, Cl: 44, N: 38 }, GAP = 15, ER = 7.5;
  const NAME = { O: 'an oxygen atom, O', H: 'a hydrogen atom, H', C: 'the carbon atom, C', Cl: 'a chlorine atom, Cl', N: 'the nitrogen atom, N' };
  const at = (x, y, a, L) => [x + L * Math.cos(a * RAD), y + L * Math.sin(a * RAD)];
  /* atoms [element, x, y, formal charge, lone-pair angles, label direction]; bonds [giver, taker, order] */
  const MOL = {
    H2O: {
      to: 'O', charge: 0,
      atoms: [['O', 700, 250, 0, [-60, -120], -90], ['H', ...at(700, 250, 142, 190), 0, [], 142], ['H', ...at(700, 250, 38, 190), 0, [], 38]],
      bonds: [[1, 0, 1], [2, 0, 1]],
    },
    CCl4: {
      to: 'Cl', charge: 0,
      atoms: [['C', 700, 325, 0, [], -45], ...[-90, 0, 90, 180].map((a) => ['Cl', ...at(700, 325, a, 165), 0, [a - 90, a, a + 90], a + 45])],
      bonds: [[0, 1, 1], [0, 2, 1], [0, 3, 1], [0, 4, 1]],
    },
    NO3: {
      to: 'O', charge: -1,
      atoms: [['N', 700, 345, 1, [], 90], ['O', ...at(700, 345, -90, 170), 0, [-30, -150], -90],
        ['O', ...at(700, 345, 150, 170), -1, [60, 150, 240], 195], ['O', ...at(700, 345, 30, 170), -1, [-60, 30, 120], 75]],
      bonds: [[0, 1, 2], [0, 2, 1], [0, 3, 1]],
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
    const m = MOL[key], whole = p === 1, dec = whole ? 0 : 2, q = charges(m, p), s = (x) => sgn(x, dec);
    const term = (k, n, el, x) => `\\mk{${k}}{(\\text{${n} ${el}})(${s(x)})}`;
    const tot = (k, x) => `\\mk{${k}}{${s(x)}}`;
    const sum = `\\mk{q}{${sgn(m.charge, 0)}}`;
    if (key === 'H2O') return [`${term('O', 1, 'O', q[0])}+${term('H', 2, 'H', q[1])}=${tot('tO', q[0])}+${tot('tH', 2 * q[1])}=${sum}`, 'w'];
    if (key === 'CCl4') return [`${term('C', 1, 'C', q[0])}+${term('Cl', 4, 'Cl', q[1])}=${tot('tC', q[0])}+${tot('tCl', 4 * q[1])}=${sum}`, 'c'];
    if (whole) return [`${term('N', 1, 'N', q[0])}+${term('O3', 3, 'O', q[1])}=${tot('tN', q[0])}+${tot('tO3', 3 * q[1])}=${sum}`, 'n1'];
    return [`${term('N', 1, 'N', q[0])}+${term('Od', 1, 'O', q[1])}+${term('Os', 2, 'O', q[2])}=${tot('tN', q[0])}+${tot('tOd', q[1])}+${tot('tOs', 2 * q[2])}=${sum}`, 'n0'];
  }
  let lastForm = null;
  function setReadout() {
    const [s, form] = readout(mol.value, pol.v / 100);
    const keyMap = lastForm === 'n0' && form === 'n1' ? { Od: 'O3', Os: 'O3', tOd: 'tO3', tOs: 'tO3' }
      : lastForm === 'n1' && form === 'n0' ? { O3: ['Od', 'Os'], tO3: ['tOd', 'tOs'] } : undefined;
    ro.set(s, undefined, { form: mol.value + form, ...(keyMap ? { keyMap } : {}) });
    lastForm = form;
  }

  function scene(ctx, key, p, lab, live) {
    const m = MOL[key], q = charges(m, p), e = F.el('e-'), whole = p === 1;
    const pair = (cx, cy, nx, ny, offs, name) => offs.forEach((o) => { const x = cx + nx * o, y = cy + ny * o; dot(ctx, x, y, e, true, ER); if (live) hits.push({ x, y, r: 11, name }); });
    m.bonds.forEach(([g, t, n]) => {
      const [, ax, ay] = m.atoms[g], [te, bx, by] = m.atoms[t], L = Math.hypot(bx - ax, by - ay), ux = (bx - ax) / L, uy = (by - ay) / L;
      const ga = R[m.atoms[g][0]], gb = R[te];
      line(ctx, ax + ux * ga, ay + uy * ga, bx - ux * gb, by - uy * gb, alpha(PAL.ink, 0.35), 2, [4, 8]);
      const mx = (ax + ux * ga + bx - ux * gb) / 2, my = (ay + uy * ga + by - uy * gb) / 2;
      const ex = bx - ux * (gb + GAP), ey = by - uy * (gb + GAP);
      pair(mx + p * (ex - mx), my + p * (ey - my), -uy, ux, n === 2 ? [-26, -10, 10, 26] : [-8, 8], n === 2 ? 'two bonding pairs of electrons' : 'a bonding pair of electrons');
    });
    m.atoms.forEach(([el, x, y, , lone]) => lone.forEach((a) => {
      const [cx, cy] = at(x, y, a, R[el] + GAP);
      pair(cx, cy, -Math.sin(a * RAD), Math.cos(a * RAD), [-8, 8], 'a lone pair of electrons');
    }));
    m.atoms.forEach(([el, x, y, , , la], i) => {
      ctx.save(); ctx.fillStyle = F.el(el); ctx.strokeStyle = alpha(PAL.ink, 0.5); ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.arc(x, y, R[el], 0, 2 * Math.PI); ctx.fill(); ctx.stroke(); ctx.restore();
      if (live) hits.push({ x, y, r: R[el], name: NAME[el] });
      if (lab) { const ux = Math.cos(la * RAD), uy = Math.sin(la * RAD); lab.add(`${el} ${shown(q[i], whole ? 0 : 2)}`, x + ux * R[el], y + uy * R[el], ux, uy, PAL.ink, 22, 40); }
    });
  }

  function draw() {
    const { ctx } = begin(d.c), p = pol.v / 100, key = mol.value, X = MOL[key].to;
    hits = [];
    const lines = topline(ctx, p === 1 ? `Every bonding pair now belongs to ${X}, and each charge is an oxidation number.`
      : p === 0 ? 'Each bonding pair is shared equally, as between two atoms of the same element.'
      : `The bonding pairs lean toward ${X}, the more electronegative atom; at 100% each one belongs to ${X}.`);
    const lab = F.labeller(ctx, H, { headline: lines });
    for (const o of Object.keys(MOL)) {
      if (o === key) continue;
      mol.only(ctx, o, () => scene(ctx, o, p, null, false));
    }
    mol.only(ctx, key, () => { scene(ctx, key, p, lab, true); lab.flush(); });
    dot(ctx, 80, H - 30, F.el('e-'), true, ER);
    text(ctx, 'electron', 98, H - 30, PAL.ink, { size: 18, align: 'left' });
    setReadout();
  }
  register(d.fig, { update: () => {}, draw });
})();
};
