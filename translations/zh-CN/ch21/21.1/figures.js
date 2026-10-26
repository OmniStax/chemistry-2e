/* Figures for section 21.1 Nuclear Structure and Stability. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['21.1'] = function (root, F) {
const { tex, C, PAL, alpha, register, begin, line, arrow, dot, text, topline, axes, curve, labeller } = F;
const sim = (id, H) => F.sim(root, id, H);

const NAME = 'hydrogen helium lithium beryllium boron carbon nitrogen oxygen fluorine neon sodium magnesium aluminum silicon phosphorus sulfur chlorine argon potassium calcium scandium titanium vanadium chromium manganese iron cobalt nickel copper zinc gallium germanium arsenic selenium bromine krypton rubidium strontium yttrium zirconium niobium molybdenum technetium ruthenium rhodium palladium silver cadmium indium tin antimony tellurium iodine xenon cesium barium lanthanum cerium praseodymium neodymium promethium samarium europium gadolinium terbium dysprosium holmium erbium thulium ytterbium lutetium hafnium tantalum tungsten rhenium osmium iridium platinum gold mercury thallium lead bismuth polonium astatine radon francium radium actinium thorium protactinium uranium'.split(' ');

/* =====================================================================
   FIGURE 21.2: the band of stability. The book's chart, protons across
   and neutrons up; every stable nuclide a point, the known radioactive
   nuclides a shaded band, the line n = Z, and the text's three examples
   marked. Still.
===================================================================== */
(function () {
  const d = sim('sim-band-stability', 800);
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
  /* the edges of the book's band of known nuclides, [Z, n], read off its figure */
  const LO = [[1, 0], [5, 2], [10, 5], [15, 8], [20, 16], [25, 20], [30, 26], [35, 32], [40, 39], [45, 44], [50, 50], [55, 56], [60, 61], [65, 68], [70, 77], [75, 85], [80, 95], [83, 97], [85, 114], [90, 121], [95, 131], [100, 141], [105, 149], [110, 157], [115, 166], [118, 172]];
  const HI = [[1, 3], [3, 8], [5, 15], [10, 19], [15, 28], [20, 40], [25, 45], [30, 54], [35, 61], [40, 67], [45, 77], [50, 88], [55, 92], [60, 101], [65, 106], [70, 110], [75, 118], [80, 127], [85, 136], [90, 149], [95, 154], [100, 159], [105, 166], [110, 171], [115, 176], [118, 178]];
  const REFS = [['nitrogen-14', 7, 7, -0.25, -1], ['iron-56', 26, 30, -0.55, -0.85], ['lead-207', 82, 125, -0.75, -0.65]];
  const box = { l: 130, r: 1330, t: 80, b: 690 };
  let hits = []; F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c);
    const lab = labeller(ctx, 800);
    const { X, Y } = axes(ctx, box, [0, 120], [0, 180], { nx: 12, ny: 9, xl: 'number of protons (Z)', yl: 'number of neutrons (n)' });
    hits = [];
    ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.13); ctx.beginPath();
    LO.forEach(([z, n], i) => (i ? ctx.lineTo(X(z), Y(n)) : ctx.moveTo(X(z), Y(n))));
    HI.slice().reverse().forEach(([z, n]) => ctx.lineTo(X(z), Y(n)));
    ctx.closePath(); ctx.fill(); ctx.restore();
    line(ctx, X(0), Y(0), X(120), Y(120), PAL.ink, 3);
    lab.beside({ x1: X(0), y1: Y(0), x2: X(120), y2: Y(120) }, 'right', 'n = Z', PAL.ink, 20, { offset: 0.9 });
    STABLE.forEach((as, i) => as.forEach((A) => {
      const Z = i + 1, x = X(Z), y = Y(A - Z);
      dot(ctx, x, y, PAL.ink, true, 4);
      hits.push({ x, y, r: 6, name: `${NAME[i]}-${A}: ${Z} protons, ${A - Z} neutrons, stable` });
    }));
    REFS.forEach(([id, Z, n, ux, uy]) => {
      const x = X(Z), y = Y(n), col = F.ref(id);
      dot(ctx, x, y, col, true, 8);
      lab.add(id, x, y, ux, uy, col, 20, 70);
    });
    const LX = X(88), LY = Y(34);
    ctx.save(); ctx.fillStyle = PAL.panel; ctx.fillRect(LX - 22, LY - 26, 250, 92); ctx.restore();
    dot(ctx, LX, LY, PAL.ink, true, 6);
    text(ctx, 'nonradioactive', LX + 22, LY, PAL.ink, { size: 19 });
    ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.13); ctx.fillRect(LX - 10, LY + 28, 20, 20); ctx.restore();
    text(ctx, 'radioactive', LX + 22, LY + 38, PAL.ink, { size: 19 });
    lab.flush();
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
  const box = { l: 470, r: 1340, t: 110, b: 470 };
  const CX = 200, CY = 300, S = 9.4, R = 5.4, GOLD = 2.39996;
  const isP = (i, q) => Math.floor(((i + 1) * q.Z) / q.A) > Math.floor((i * q.Z) / q.A);
  const ro = F.readout(d);
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
    const ly = 520;
    dot(ctx, CX - 90, ly, cp, true, 7); text(ctx, 'proton', CX - 76, ly, PAL.ink, { size: 19 });
    dot(ctx, CX + 20, ly, cn, true, 7); text(ctx, 'neutron', CX + 34, ly, PAL.ink, { size: 19 });
    topline(ctx, `${q.name[0].toUpperCase() + q.name.slice(1)} is ${q.dm.toFixed(4)} amu lighter than its ${q.Z} protons, ${q.N} neutrons and ${q.Z} electrons.`);
    ro.set(`\\kE=\\km\\kc^{2}=(${sci(q.kg)}\\ \\text{kg})(2.998\\times10^{8}\\ \\text{m/s})^{2}=${sci(q.J)}\\ \\text{J}=${q.MeV.toFixed(1)}\\ \\text{MeV}`,
      `$\\kE$ ÷ ${q.A} nucleons = ${q.per.toFixed(3)} MeV per nucleon, the height of the point on the curve`);
  }
  register(d.fig, { update: () => {}, draw });
})();
};
