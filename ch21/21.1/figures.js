/* Figures for section 21.1 Nuclear Structure and Stability. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['21.1'] = function (root, F) {
const { tex, C, PAL, alpha, ctl, register, begin, line, arrow, dot, text, topline, axes, curve, labeller } = F;
const sim = (id, H) => F.sim(root, id, H);

const NAME = 'hydrogen helium lithium beryllium boron carbon nitrogen oxygen fluorine neon sodium magnesium aluminum silicon phosphorus sulfur chlorine argon potassium calcium scandium titanium vanadium chromium manganese iron cobalt nickel copper zinc gallium germanium arsenic selenium bromine krypton rubidium strontium yttrium zirconium niobium molybdenum technetium ruthenium rhodium palladium silver cadmium indium tin antimony tellurium iodine xenon cesium barium lanthanum cerium praseodymium neodymium promethium samarium europium gadolinium terbium dysprosium holmium erbium thulium ytterbium lutetium hafnium tantalum tungsten rhenium osmium iridium platinum gold mercury thallium lead bismuth polonium astatine radon francium radium actinium thorium protactinium uranium neptunium plutonium americium curium berkelium californium einsteinium fermium mendelevium nobelium lawrencium rutherfordium dubnium seaborgium bohrium hassium meitnerium darmstadtium roentgenium copernicium nihonium flerovium moscovium livermorium tennessine oganesson'.split(' ');
const SYM = 'H He Li Be B C N O F Ne Na Mg Al Si P S Cl Ar K Ca Sc Ti V Cr Mn Fe Co Ni Cu Zn Ga Ge As Se Br Kr Rb Sr Y Zr Nb Mo Tc Ru Rh Pd Ag Cd In Sn Sb Te I Xe Cs Ba La Ce Pr Nd Pm Sm Eu Gd Tb Dy Ho Er Tm Yb Lu Hf Ta W Re Os Ir Pt Au Hg Tl Pb Bi Po At Rn Fr Ra Ac Th Pa U Np Pu Am Cm Bk Cf Es Fm Md No Lr Rf Db Sg Bh Hs Mt Ds Rg Cn Nh Fl Mc Lv Ts Og'.split(' ');

/* =====================================================================
   FIGURE 21.2: the band of stability. The book's chart on its own equal
   scale, protons across and neutrons up: every stable nuclide a point,
   the known radioactive nuclides a shaded band, the line n = Z. A slider
   on Z picks one element; its stable nuclide (the text's nitrogen-14,
   iron-56 and lead-207, else the most abundant) is joined to the origin,
   so the slope of that line is its n:p ratio, and beside the chart the
   ratio of every stable nuclide is plotted against Z, climbing from 1
   toward 1.5. Still: the chart answers the slider.
===================================================================== */
(function () {
  const d = sim('sim-band-stability', 820);
  /* the mass numbers of the stable nuclides of each element, Z = 1 to 83 (none for 43 and 61) */
  const STABLE = [
    [1, 2], [3, 4], [6, 7], [9], [10, 11], [12, 13], [14, 15], [16, 17, 18], [19], [20, 21, 22],
    [23], [24, 25, 26], [27], [28, 29, 30], [31], [32, 33, 34, 36], [35, 37], [36, 38, 40], [39, 41], [40, 42, 43, 44, 46],
    [45], [46, 47, 48, 49, 50], [51], [50, 52, 53, 54], [55], [54, 56, 57, 58], [59], [58, 60, 61, 62, 64], [63, 65], [64, 66, 67, 68, 70],
    [69, 71], [70, 72, 73, 74], [75], [74, 76, 77, 78, 80], [79, 81], [80, 82, 83, 84, 86], [85], [84, 86, 87, 88], [89], [90, 91, 92, 94],
    [93], [92, 94, 95, 96, 97, 98], [], [96, 98, 99, 100, 101, 102, 104], [103], [102, 104, 105, 106, 108, 110], [107, 109], [106, 108, 110, 111, 112, 114], [113], [112, 114, 115, 116, 117, 118, 119, 120, 122, 124],
    [121, 123], [120, 122, 123, 124, 125, 126], [127], [124, 126, 128, 129, 130, 131, 132, 134], [133], [132, 134, 135, 136, 137, 138], [139], [136, 138, 140, 142], [141], [142, 143, 145, 146, 148],
    [], [144, 149, 150, 152, 154], [153], [154, 155, 156, 157, 158, 160], [159], [156, 158, 160, 161, 162, 163, 164], [165], [162, 164, 166, 167, 168, 170], [169], [168, 170, 171, 172, 173, 174, 176],
    [175], [176, 177, 178, 179, 180], [181], [182, 183, 184, 186], [185], [184, 187, 188, 189, 190, 192], [191, 193], [192, 194, 195, 196, 198], [197], [196, 198, 199, 200, 201, 202, 204],
    [203, 205], [204, 206, 207, 208], [209],
  ];
  /* the nuclide read for each element: the most abundant stable one, except the text's three (nitrogen-14, iron-56, lead-207) */
  const MAIN = [1, 4, 7, 9, 11, 12, 14, 16, 19, 20, 23, 24, 27, 28, 31, 32, 35, 40, 39, 40, 45, 48, 51, 52, 55, 56, 59, 58, 63, 64,
    69, 74, 75, 80, 79, 84, 85, 88, 89, 90, 93, 98, 0, 102, 103, 106, 107, 114, 113, 120, 121, 126, 127, 132, 133, 138, 139, 140, 141, 142,
    0, 152, 153, 158, 159, 164, 165, 166, 169, 174, 175, 180, 181, 184, 185, 192, 193, 195, 197, 202, 205, 207, 209];
  const REF = { 7: 'nitrogen-14', 26: 'iron-56', 82: 'lead-207' };
  /* the edges of the book's band of known nuclides, [Z, n], read off its figure */
  const LO = [[1, 0], [5, 2], [10, 5], [15, 8], [20, 16], [25, 20], [30, 26], [35, 32], [40, 39], [45, 44], [50, 50], [55, 56], [60, 61], [65, 68], [70, 77], [75, 85], [80, 95], [83, 97], [85, 114], [90, 121], [95, 131], [100, 141], [105, 149], [110, 157], [115, 166], [118, 172]];
  const HI = [[1, 3], [3, 8], [5, 15], [10, 19], [15, 28], [20, 40], [25, 45], [30, 54], [35, 61], [40, 67], [45, 77], [50, 88], [55, 92], [60, 101], [65, 106], [70, 110], [75, 118], [80, 127], [85, 136], [90, 149], [95, 154], [100, 159], [105, 166], [110, 171], [115, 176], [118, 178]];
  const edge = (E, z) => { for (let i = 1; i < E.length; i++) if (z <= E[i][0]) { const [z0, n0] = E[i - 1], [z1, n1] = E[i]; return n0 + ((n1 - n0) * (z - z0)) / (z1 - z0); } return E[E.length - 1][1]; };
  const Zs = ctl(d.controls, { label: 'Z', cls: '', min: 1, max: 118, step: 1, value: 26, unit: '', dec: 0, aria: 'number of protons, Z',
    detents: [{ v: 7, label: 'N-14' }, { v: 26, label: 'Fe-56' }, { v: 82, label: 'Pb-207' }] });
  /* the chart on one scale for both axes, as the book draws it: 3.7 units per nucleon, Z 0 to 120 by n 0 to 180 */
  const u = 3.7, boxA = { l: 92, t: 110, b: 70 + 180 * u, r: 92 + 120 * u };
  /* the ratio n/Z of every stable nuclide against Z, Z 0 to 120 and n:p 0.4 to 1.6, hydrogen-1 (0) pinned at the floor */
  const boxB = { l: 680, r: 1340, t: 150, b: boxA.b };
  let hits = []; F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c);
    const lab = labeller(ctx, 820);
    const Z = Zs.v, A = Z <= 83 ? MAIN[Z - 1] : 0, n = A - Z, name = NAME[Z - 1];
    const ref = REF[Z], col = ref ? F.ref(ref) : PAL.ink;
    hits = [];
    const a = axes(ctx, boxA, [0, 120], [0, 180], { nx: 6, ny: 9, xl: 'number of protons (Z)', yl: 'number of neutrons (n)' });
    const { X, Y } = a;
    /* the band of known nuclides */
    ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.13); ctx.beginPath();
    LO.forEach(([z, m], i) => (i ? ctx.lineTo(X(z), Y(m)) : ctx.moveTo(X(z), Y(m))));
    HI.slice().reverse().forEach(([z, m]) => ctx.lineTo(X(z), Y(m)));
    ctx.closePath(); ctx.fill(); ctx.restore();
    line(ctx, X(0), Y(0), X(120), Y(120), PAL.ink, 3);
    text(ctx, 'n = Z', X(119), Y(106), PAL.ink, { size: 20, align: 'right' });
    /* the chosen element's column of known nuclides */
    const lo = edge(LO, Z), hi = edge(HI, Z);
    line(ctx, X(Z), Y(Math.max(0, lo - 6)), X(Z), Y(Math.min(180, hi + 6)), alpha(PAL.ink, 0.45), 2, [4, 8]);
    STABLE.forEach((as, i) => as.forEach((M) => {
      const z = i + 1, x = X(z), y = Y(M - z);
      dot(ctx, x, y, PAL.ink, true, z === Z ? 4 : 2.6);
      hits.push({ x, y, r: 6, name: `${NAME[i]}-${M}: ${z} protons, ${M - z} neutrons, stable` });
    }));
    if (A) {
      /* the line from the origin through the nuclide: its slope is n:p */
      const k = n / Z, zEnd = Math.min(120, 180 / k);
      line(ctx, X(0), Y(0), X(zEnd), Y(k * zEnd), alpha(col, 0.7), 3, [10, 10]);
      dot(ctx, X(Z), Y(n), col, true, 9);
      lab.add(`${name}-${A}`, X(Z), Y(n), Z < 12 ? 0.3 : 0.8, Z < 12 ? -1 : 0.6, col, 20, Z < 12 ? 70 : 40);
    }
    F.legend(ctx, a, [{ s: 'stable', kind: 'dot', color: PAL.ink }, { s: 'radioactive', kind: 'swatch', color: alpha(PAL.ink, 0.13) }], { corner: 'br' });
    /* the ratio graph */
    const b = axes(ctx, boxB, [0, 120], [0.4, 1.6], { nx: 6, ny: 6, xl: 'number of protons (Z)', yl: 'n:p ratio of stable nuclides' });
    line(ctx, b.X(0), b.Y(1), b.X(120), b.Y(1), PAL.ink, 3);
    text(ctx, 'n = Z', b.X(118), b.Y(1) + 22, PAL.ink, { size: 20, align: 'right' });
    STABLE.forEach((as, i) => as.forEach((M) => {
      const z = i + 1, r = (M - z) / z, x = b.X(z), y = b.Y(Math.max(0.4, r));
      if (r < 0.4) { F.pinned(ctx, boxB, b.X, b.Y, z, r, PAL.ink); hits.push({ x, y, r: 8, name: `${NAME[i]}-${M}: n:p = 0, below the axis` }); return; }
      dot(ctx, x, y, PAL.ink, true, z === Z ? 5 : 3.5);
      hits.push({ x, y, r: 6, name: `${NAME[i]}-${M}: n:p = ${M - z}/${z} = ${((M - z) / z).toFixed(2)}` });
    }));
    line(ctx, b.X(Z), boxB.t, b.X(Z), boxB.b, alpha(PAL.ink, 0.45), 2, [4, 8]);
    if (A) {
      const yb = b.Y(Math.max(0.4, n / Z));
      dot(ctx, b.X(Z), yb, col, true, 9);
      lab.add(`${name}-${A}`, b.X(Z), yb, 0.7, -0.7, col, 20, 46);
    }
    lab.flush();
    const Nm = name[0].toUpperCase() + name.slice(1);
    if (A) {
      topline(ctx, `${Nm}-${A} has ${n} neutron${n === 1 ? '' : 's'} for its ${Z} proton${Z === 1 ? '' : 's'}, an n:p ratio of ${(n / Z).toFixed(2)}.`);
      tex(d.readout, `{}^{${A}}_{${Z}}\\text{${SYM[Z - 1]}}:\\ \\text{n:p} = \\frac{n}{Z} = \\frac{${n}}{${Z}} = ${(n / Z).toFixed(2)}`);
    } else {
      topline(ctx, `${Nm} (Z = ${Z}) has no stable nuclide: every one of its nuclides is radioactive.`);
      tex(d.readout, `\\text{${name}},\\ Z = ${Z}:\\ \\text{known nuclides from } n \\approx ${Math.round(lo)} \\text{ to } ${Math.round(hi)},\\ \\text{none stable}`);
    }
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 21.3: binding energy per nucleon. The book's curve with its
   fusion and fission arrows, the points stable nuclides whose binding
   energy is found from their atomic masses as Examples 21.2 and 21.3
   find it; a choice of nuclide places it on the curve, its nucleus a
   flat packing of its protons and neutrons beside the graph. Still.
===================================================================== */
(function () {
  const d = sim('sim-binding-curve', 600);
  /* the book's masses and constants: proton, neutron, electron (amu), kg per amu, c (m/s), J per MeV */
  const MP = 1.0073, MN = 1.0087, ME = 0.00055, KG = 1.6605e-27, CL = 2.998e8, JMEV = 1.602e-13;
  /* stable nuclides: name, Z, A, atomic mass (amu) */
  const NUC = [
    ['hydrogen-2', 1, 2, 2.0141], ['helium-4', 2, 4, 4.0026], ['lithium-7', 3, 7, 7.0160], ['beryllium-9', 4, 9, 9.0122],
    ['carbon-12', 6, 12, 12.0000], ['nitrogen-14', 7, 14, 14.0031], ['oxygen-16', 8, 16, 15.9949], ['neon-20', 10, 20, 19.9924],
    ['magnesium-24', 12, 24, 23.9850], ['silicon-28', 14, 28, 27.9769], ['sulfur-32', 16, 32, 31.9721], ['argon-40', 18, 40, 39.9624],
    ['calcium-40', 20, 40, 39.9626], ['titanium-48', 22, 48, 47.9479], ['iron-56', 26, 56, 55.9349], ['nickel-62', 28, 62, 61.9283],
    ['zinc-64', 30, 64, 63.9291], ['krypton-84', 36, 84, 83.9115], ['zirconium-90', 40, 90, 89.9047], ['molybdenum-98', 42, 98, 97.9054],
    ['tin-120', 50, 120, 119.9022], ['xenon-132', 54, 132, 131.9042], ['barium-138', 56, 138, 137.9052], ['neodymium-142', 60, 142, 141.9077],
    ['gadolinium-158', 64, 158, 157.9241], ['erbium-166', 68, 166, 165.9303], ['tungsten-184', 74, 184, 183.9509], ['platinum-195', 78, 195, 194.9648],
    ['gold-197', 79, 197, 196.9666], ['lead-208', 82, 208, 207.9767], ['bismuth-209', 83, 209, 208.9804], ['uranium-235', 92, 235, 235.0439],
    ['uranium-238', 92, 238, 238.0508],
  ].map(([name, Z, A, M]) => {
    const dm = Math.round((Z * (MP + ME) + (A - Z) * MN - M) * 1e4) / 1e4;
    const kg = dm * KG, J = kg * CL * CL, MeV = Math.round((J / JMEV) * 10) / 10;
    return { name, Z, A, N: A - Z, M, dm, kg, J, MeV, per: MeV / A };
  });
  const BY = Object.fromEntries(NUC.map((q) => [q.name, q]));
  const CHOICES = ['helium-4', 'lithium-7', 'carbon-12', 'oxygen-16', 'magnesium-24', 'calcium-40', 'iron-56', 'nickel-62', 'krypton-84', 'tin-120', 'barium-138', 'gold-197', 'lead-208', 'uranium-235', 'uranium-238'];
  const pick = F.select(d.controls, {
    label: '\\text{nuclide}', aria: 'the nuclide placed on the curve', value: 'iron-56',
    options: CHOICES.map((v) => ({ value: v, label: v })),
  });
  /* the semi-empirical fit drawn as the book's smooth curve, Z on the line of stability */
  const fit = (A) => {
    if (A < 1) return 0;
    const Z = A / (1.98 + 0.0155 * Math.pow(A, 2 / 3));
    const B = 15.75 * A - 17.8 * Math.pow(A, 2 / 3) - (0.711 * Z * (Z - 1)) / Math.cbrt(A) - (23.7 * (A - 2 * Z) ** 2) / A;
    return Math.max(0, B / A);
  };
  const sci = (v, n = 4) => { const e = Math.floor(Math.log10(v)); return `${(v / 10 ** e).toFixed(n - 1)}\\times10^{${e}}`; };
  /* the graph on the right; the nucleus on the left, sized so that uranium-238 just fills its square */
  const box = { l: 520, r: 1340, t: 130, b: 520 };
  const CX = 230, CY = 310, S = 12.2, R = 7, GOLD = 2.39996;
  const isP = (i, q) => Math.floor(((i + 1) * q.Z) / q.A) > Math.floor((i * q.Z) / q.A);
  let hits = []; F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c);
    const q = BY[pick.value], ce = C('energy');
    hits = [];
    const { X, Y } = axes(ctx, box, [0, 260], [0, 10], { nx: 13, ny: 10, xl: 'mass number (A)', yl: 'binding energy per nucleon (MeV)', yc: ce });
    curve(ctx, fit, 1, 260, X, Y, ce, 5, 520);
    NUC.forEach((p) => {
      dot(ctx, X(p.A), Y(p.per), alpha(PAL.ink, 0.55), true, 6);
      hits.push({ x: X(p.A), y: Y(p.per), r: 9, name: `${p.name}: ${p.per.toFixed(3)} MeV per nucleon` });
    });
    arrow(ctx, X(20), Y(2.0), X(24), Y(5.3), PAL.ink, 3);
    text(ctx, 'fusion', X(20), Y(2.0) + 22, PAL.ink, { size: 20, align: 'center' });
    arrow(ctx, X(222), Y(7.05), X(150), Y(7.55), PAL.ink, 3);
    text(ctx, 'fission', X(226), Y(6.75), PAL.ink, { size: 20, align: 'center' });
    const [px, py] = pick.mix((v) => [X(BY[v].A), Y(BY[v].per)]);
    line(ctx, px, py, px, box.b, alpha(ce, 0.6), 2, [4, 8]);
    line(ctx, box.l, py, px, py, alpha(ce, 0.6), 2, [4, 8]);
    dot(ctx, px, py, ce, true, 10);
    /* the nucleus, a sunflower packing of A discs, protons spread evenly among them */
    const cp = F.el('p+'), cn = F.el('n0');
    const most = Math.max(BY[pick.value].A, BY[pick.from ?? pick.value].A);
    ctx.save(); ctx.lineWidth = 1.2; ctx.strokeStyle = alpha(PAL.ink, 0.55);
    for (let i = 0; i < most; i++) {
      const a = pick.mix((v) => (i < BY[v].A ? 1 : 0));
      if (a <= 0) continue;
      const r = S * Math.sqrt(i), t = i * GOLD;
      ctx.globalAlpha = a;
      ctx.fillStyle = pick.mixColor((v) => (isP(i, BY[v]) ? cp : cn));
      ctx.beginPath(); ctx.arc(CX + r * Math.cos(t), CY + r * Math.sin(t), R, 0, 2 * Math.PI); ctx.fill(); ctx.stroke();
    }
    ctx.restore();
    hits.push({ x: CX, y: CY, r: S * Math.sqrt(q.A) + 4, name: `${q.name} nucleus: ${q.Z} protons and ${q.N} neutrons` });
    F.legend(ctx, { l: CX - 200, r: CX + 200, t: 528, b: 588 }, [
      { s: `${q.Z} protons`, draw: (c, x, y) => dot(c, x, y, cp, true, 8) },
      { s: `${q.N} neutrons`, draw: (c, x, y) => dot(c, x, y, cn, true, 8) },
    ], { corner: 'top', row: true, panel: false, size: 20 });
    topline(ctx, `${q.name[0].toUpperCase() + q.name.slice(1)} is ${q.dm.toFixed(4)} amu lighter than its ${q.Z} protons, ${q.N} neutrons and ${q.Z} electrons.`);
    tex(d.readout, `\\kE=\\km\\kc^{2}=(${sci(q.kg)}\\ \\text{kg})(2.998\\times10^{8}\\ \\text{m/s})^{2}=${q.MeV.toFixed(1)}\\ \\text{MeV}`
      + ` \\\\ \\frac{\\kE}{A}=\\frac{${q.MeV.toFixed(1)}\\ \\text{MeV}}{${q.A}\\ \\text{nucleons}}=${q.per.toFixed(3)}\\ \\text{MeV per nucleon}`);
  }
  register(d.fig, { update: () => {}, draw });
})();
};
