/* Figures for section 21.1 Nuclear Structure and Stability. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['21.1'] = function (root, F) {
const { tex, C, PAL, alpha, ctl, register, begin, line, arrow, dot, text, topline, axes, curve } = F;
const sim = (id, H) => F.sim(root, id, H);

const NAME = 'hydrogen helium lithium beryllium boron carbon nitrogen oxygen fluorine neon sodium magnesium aluminum silicon phosphorus sulfur chlorine argon potassium calcium scandium titanium vanadium chromium manganese iron cobalt nickel copper zinc gallium germanium arsenic selenium bromine krypton rubidium strontium yttrium zirconium niobium molybdenum technetium ruthenium rhodium palladium silver cadmium indium tin antimony tellurium iodine xenon cesium barium lanthanum cerium praseodymium neodymium promethium samarium europium gadolinium terbium dysprosium holmium erbium thulium ytterbium lutetium hafnium tantalum tungsten rhenium osmium iridium platinum gold mercury thallium lead bismuth polonium astatine radon francium radium actinium thorium protactinium uranium neptunium plutonium americium curium berkelium californium einsteinium fermium mendelevium nobelium lawrencium rutherfordium dubnium seaborgium bohrium hassium meitnerium darmstadtium roentgenium copernicium nihonium flerovium moscovium livermorium tennessine oganesson'.split(' ');
const SYM = 'H He Li Be B C N O F Ne Na Mg Al Si P S Cl Ar K Ca Sc Ti V Cr Mn Fe Co Ni Cu Zn Ga Ge As Se Br Kr Rb Sr Y Zr Nb Mo Tc Ru Rh Pd Ag Cd In Sn Sb Te I Xe Cs Ba La Ce Pr Nd Pm Sm Eu Gd Tb Dy Ho Er Tm Yb Lu Hf Ta W Re Os Ir Pt Au Hg Tl Pb Bi Po At Rn Fr Ra Ac Th Pa U Np Pu Am Cm Bk Cf Es Fm Md No Lr Rf Db Sg Bh Hs Mt Ds Rg Cn Nh Fl Mc Lv Ts Og'.split(' ');

/* =====================================================================
   FIGURE 21.2: the band of stability. Left, the book's chart on its own
   equal scale, protons across and neutrons up: the stable nuclides, the
   band of radioactive ones, the line n = Z. A ray from the origin through
   the chosen nuclide points at its n:p ratio on a scale along the frame.
   Right, a close-up of the eleven by eleven nuclides round it, one square
   each with its mass number, so the single nuclides, the even and odd
   pattern and the magic numbers can be read. Z picks the element and n
   its nuclide; a tap on a square or on the chart picks it too. Still.
===================================================================== */
(function () {
  const d = sim('sim-band-stability', 910);
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
  /* the nuclide each element opens on: the most abundant stable one, except the text's three (nitrogen-14, iron-56, lead-207) */
  const MAIN = [1, 4, 7, 9, 11, 12, 14, 16, 19, 20, 23, 24, 27, 28, 31, 32, 35, 40, 39, 40, 45, 48, 51, 52, 55, 56, 59, 58, 63, 64,
    69, 74, 75, 80, 79, 84, 85, 88, 89, 90, 93, 98, 0, 102, 103, 106, 107, 114, 113, 120, 121, 126, 127, 132, 133, 138, 139, 140, 141, 142,
    0, 152, 153, 158, 159, 164, 165, 166, 169, 174, 175, 180, 181, 184, 185, 192, 193, 195, 197, 202, 205, 207, 209];
  /* where no nuclide is stable, the longest-lived one */
  const LONG = { 43: 98, 61: 145, 84: 209, 85: 210, 86: 222, 87: 223, 88: 226, 89: 227, 90: 232, 91: 231, 92: 238, 93: 237, 94: 244, 95: 243, 96: 247, 97: 247, 98: 251, 99: 252, 100: 257,
    101: 258, 102: 259, 103: 266, 104: 267, 105: 268, 106: 269, 107: 270, 108: 277, 109: 278, 110: 281, 111: 282, 112: 285, 113: 286, 114: 289, 115: 290, 116: 293, 117: 294, 118: 294 };
  const REF = { '7-7': 'nitrogen-14', '26-30': 'iron-56', '82-125': 'lead-207' };
  const MAGIC = [2, 8, 20, 28, 50, 82, 126];
  /* the edges of the book's band of known nuclides, [Z, n], read off its figure and kept inside the nuclides that have been observed */
  const KLO = [[10, 5], [13, 8], [15, 10], [20, 14], [25, 20], [30, 26], [35, 32], [40, 39], [45, 44], [50, 50], [55, 56], [60, 61], [65, 68], [70, 77], [75, 85], [80, 95], [83, 97], [85, 114], [90, 121], [95, 131], [100, 141], [103, 146]];
  const KHI = [[10, 24], [15, 31], [20, 40], [25, 45], [30, 54], [35, 61], [40, 67], [45, 77], [50, 88], [55, 92], [60, 101], [65, 106], [70, 110], [75, 118], [80, 127], [85, 136], [90, 149], [95, 154], [100, 159], [103, 163]];
  /* the lightest and the heaviest elements one by one: [fewest, most] neutrons */
  const ENDS = { 1: [0, 2], 2: [1, 8], 3: [1, 8], 4: [2, 10], 5: [2, 14], 6: [2, 16], 7: [3, 16], 8: [4, 18], 9: [5, 22], 10: [5, 24],
    104: [149, 163], 105: [150, 165], 106: [152, 165], 107: [153, 167], 108: [155, 169], 109: [157, 169], 110: [157, 171], 111: [161, 175], 112: [165, 174], 113: [165, 177], 114: [170, 176], 115: [171, 175], 116: [172, 177], 117: [175, 177], 118: [175, 177] };
  const knot = (E, z) => { for (let i = 1; i < E.length; i++) if (z <= E[i][0]) { const [z0, n0] = E[i - 1], [z1, n1] = E[i]; return n0 + ((n1 - n0) * (z - z0)) / (z1 - z0); } return E[E.length - 1][1]; };
  const stableN = (z) => (STABLE[z - 1] || []).map((A) => A - z);
  const home = (z) => (MAIN[z - 1] || LONG[z]) - z;
  const LO = [0], HI = [0];
  for (let z = 1; z <= 118; z++) {
    const e = ENDS[z] || [Math.ceil(knot(KLO, z)), Math.floor(knot(KHI, z))], own = [...stableN(z), home(z)];
    LO[z] = Math.min(e[0], ...own); HI[z] = Math.max(e[1], ...own);
  }
  const isStable = (z, n) => z >= 1 && z <= 83 && STABLE[z - 1].includes(z + n);
  const known = (z, n) => z >= 1 && z <= 118 && n >= LO[z] && n <= HI[z];
  const cap = (s) => s[0].toUpperCase() + s.slice(1);
  let want = null;
  const Zs = ctl(d.controls, { label: 'Z', cls: '', key: 'Z', min: 1, max: 118, step: 1, value: 26, unit: '', dec: 0, fmt: (z) => `${z}, ${NAME[z - 1]}`, aria: 'number of protons, Z', snap: false,
    detents: [{ v: 7, label: 'N-14' }, { v: 26, label: 'Fe-56' }, { v: 82, label: 'Pb-207' }],
    onInput: () => { const z = Zs.v; Ns.mark(stableN(z).map((n) => ({ at: n }))); Ns.range({ min: LO[z], max: HI[z], step: 1, dec: 0, value: want ?? home(z) }); want = null; } });
  const Ns = ctl(d.controls, { label: 'n', cls: '', key: 'n', min: LO[26], max: HI[26], step: 1, value: 30, unit: '', dec: 0, aria: 'number of neutrons, n', specials: stableN(26).map((n) => ({ at: n })) });
  /* the chart on one scale for both axes, as the book draws it: 4 units a nucleon, Z 0 to 120 by n 0 to 180 */
  const u = 4, A0 = { l: 84, t: 134, r: 84 + 120 * u, b: 134 + 180 * u };
  /* the close-up: 11 by 11 squares of 56 */
  const cs = 56, GX = 740, GY = 150, GW = 11 * cs;
  let z0 = 21, n0 = 25, hits = [];
  F.hover(d.stage, () => hits);
  const choose = (z, n) => { if (!known(z, n)) return; if (z !== Zs.v) { want = n; Zs.drive(z); } else if (n !== Ns.v) Ns.drive(n); };
  d.c.style.cursor = 'pointer';
  d.c.addEventListener('click', (ev) => {
    const b = d.c.getBoundingClientRect(); if (!b.width) return;
    const px = ((ev.clientX - b.left) * 1400) / b.width, py = ((ev.clientY - b.top) * 1400) / b.width;
    if (px >= GX && px < GX + GW && py >= GY && py < GY + GW) { choose(z0 + Math.floor((px - GX) / cs), n0 + 10 - Math.floor((py - GY) / cs)); return; }
    if (px >= A0.l && px <= A0.r && py >= A0.t && py <= A0.b) {
      const z = Math.min(118, Math.max(1, Math.round((px - A0.l) / u)));
      choose(z, Math.min(HI[z], Math.max(LO[z], Math.round((A0.b - py) / u))));
    }
  });
  function boxed(ctx, x, y, w, h) { ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.roundRect(x - w / 2, y - h / 2, w, h, 5); ctx.stroke(); ctx.restore(); }
  function draw() {
    const { ctx } = begin(d.c);
    const Z = Zs.v, n = Math.round(Ns.v), A = Z + n, name = NAME[Z - 1], stable = isStable(Z, n), k = n / Z;
    const ref = REF[`${Z}-${n}`], col = ref ? F.ref(ref) : F.cat(0), soft = alpha(PAL.ink, 0.13), solid = alpha(PAL.ink, 0.82);
    hits = [];
    /* ---- the whole chart ---- */
    const a = axes(ctx, A0, [0, 120], [0, 180], { nx: 6, ny: 9, xl: 'number of protons (Z)', yl: 'number of neutrons (n)' });
    const { X, Y } = a;
    ctx.save(); ctx.beginPath(); ctx.rect(A0.l, A0.t, A0.r - A0.l, A0.b - A0.t); ctx.clip();
    ctx.fillStyle = soft; ctx.beginPath();
    for (let z = 1; z <= 118; z++) { ctx.lineTo(X(z - 0.5), Y(HI[z] + 0.5)); ctx.lineTo(X(z + 0.5), Y(HI[z] + 0.5)); }
    for (let z = 118; z >= 1; z--) { ctx.lineTo(X(z + 0.5), Y(LO[z] - 0.5)); ctx.lineTo(X(z - 0.5), Y(LO[z] - 0.5)); }
    ctx.closePath(); ctx.fill();
    ctx.fillStyle = PAL.ink; ctx.beginPath();
    STABLE.forEach((as, i) => as.forEach((M) => ctx.rect(X(i + 0.5), Y(M - i - 0.5), u, u)));
    ctx.fill(); ctx.restore();
    line(ctx, X(0), Y(0), X(120), Y(120), PAL.ink, 2.5);
    text(ctx, 'n = Z', X(118), Y(104), PAL.ink, { size: 19, align: 'right' });
    /* the n:p scale: where a ray from the origin leaves the frame, 120 r up the right edge and 180 / r along the top */
    const onRight = k <= 1.5, ex = onRight ? X(120) : X(180 / k), ey = onRight ? Y(120 * k) : Y(180);
    for (let i = 5; i <= 15; i++) line(ctx, A0.r, Y(12 * i), A0.r + (i % 5 ? 7 : 12), Y(12 * i), PAL.muted, 2);
    [0.5, 1, 1.5].forEach((r) => { if (!onRight || Math.abs(r - k) > 0.09) text(ctx, r.toFixed(1), A0.r + 18, Y(120 * r), PAL.muted, { size: 17, align: 'left', base: 'middle' }); });
    text(ctx, 'n:p ratio', A0.r + 18, Y(60) + 30, PAL.muted, { size: 17, align: 'left', base: 'middle' });
    /* the square the close-up shows */
    z0 = Math.min(108, Math.max(1, Z - 5)); n0 = Math.min(170, Math.max(0, n - 5));
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2; ctx.strokeRect(X(z0 - 0.5), Y(n0 + 10.5), 11 * u, 11 * u); ctx.restore();
    /* the ray through the chosen nuclide: its slope is n:p */
    line(ctx, X(0), Y(0), ex, ey, col, 3);
    if (onRight) text(ctx, k.toFixed(2), A0.r + 18, ey, col, { size: 20, weight: 600, align: 'left', base: 'middle', bg: PAL.panel });
    else text(ctx, k.toFixed(2), ex, A0.t - 24, col, { size: 20, weight: 600, align: 'center', base: 'middle', bg: PAL.panel });
    const px = X(Z), py = Y(n);
    dot(ctx, px, py, PAL.panel, true, 9); dot(ctx, px, py, col, true, 6.5);
    hits.push({ x: px, y: py, r: 10, name: `${name}-${A}: ${Z} protons, ${n} neutrons, ${stable ? 'stable' : 'radioactive'}` });
    /* its name, below the line n = Z for the light elements and above the band for the heavy ones */
    const low = Z < 40, lx = low ? X(Z + 12) : X(Z - 10), ly = low ? Y(Math.max(6, n - 14)) : Y(Math.min(174, n + 24));
    line(ctx, px + (low ? 8 : -8), py + (low ? 6 : -8), lx + (low ? -6 : 6), ly + (low ? -8 : 10), alpha(col, 0.6), 1.5, [5, 6]);
    text(ctx, `${name}-${A}`, lx, ly, col, { size: 20, weight: 600, align: low ? 'left' : 'right', base: 'middle', bg: PAL.panel });
    F.legend(ctx, a, [
      { s: 'stable', kind: 'swatch', color: solid }, { s: 'radioactive', kind: 'swatch', color: soft },
      { s: 'n = Z', draw: (c, x, y) => { c.save(); c.strokeStyle = PAL.ink; c.lineWidth = 2.5; c.strokeRect(x - 10, y - 10, 20, 20); c.restore(); } },
      { s: 'a magic number', draw: (c, x, y) => boxed(c, x, y, 32, 20) },
    ], { corner: 'br' });
    /* ---- the close-up ---- */
    ctx.save(); ctx.strokeStyle = PAL.rule; ctx.lineWidth = 1;
    for (let i = 0; i <= 11; i++) { ctx.beginPath(); ctx.moveTo(GX + i * cs, GY); ctx.lineTo(GX + i * cs, GY + GW); ctx.moveTo(GX, GY + i * cs); ctx.lineTo(GX + GW, GY + i * cs); ctx.stroke(); }
    ctx.restore();
    for (let i = 0; i < 11; i++) for (let j = 0; j < 11; j++) {
      const z = z0 + i, m = n0 + j, x = GX + i * cs, y = GY + (10 - j) * cs, me = z === Z && m === n;
      if (known(z, m)) {
        const st = isStable(z, m);
        ctx.save(); ctx.fillStyle = me ? (st ? col : alpha(col, 0.22)) : st ? solid : soft; ctx.fillRect(x + 2, y + 2, cs - 4, cs - 4);
        if (me) { ctx.strokeStyle = col; ctx.lineWidth = 4; ctx.strokeRect(x + 2, y + 2, cs - 4, cs - 4); }
        ctx.restore();
        text(ctx, String(z + m), x + cs / 2, y + cs / 2, st ? PAL.panel : me ? col : PAL.muted, { size: st || me ? 20 : 18, weight: st || me ? 600 : 400, align: 'center', base: 'middle' });
        hits.push({ x: x + cs / 2, y: y + cs / 2, r: cs / 2, name: `${NAME[z - 1]}-${z + m}: ${z} protons, ${m} neutrons, ${st ? 'stable' : 'radioactive'}` });
      }
      if (z === m) { ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2.5; ctx.strokeRect(x + 5.5, y + 5.5, cs - 11, cs - 11); ctx.restore(); }
    }
    for (let i = 0; i < 11; i++) {
      const z = z0 + i, m = n0 + i, x = GX + i * cs + cs / 2, y = GY + (10 - i) * cs + cs / 2;
      text(ctx, SYM[z - 1], x, GY + GW + 20, z === Z ? col : PAL.ink, { size: 20, weight: 600, align: 'center', base: 'middle' });
      text(ctx, String(z), x, GY + GW + 46, z === Z ? col : PAL.muted, { size: 17, weight: z === Z ? 600 : 400, align: 'center', base: 'middle' });
      if (MAGIC.includes(z)) boxed(ctx, x, GY + GW + 46, 36, 24);
      text(ctx, String(m), GX - 28, y, m === n ? col : PAL.muted, { size: 17, weight: m === n ? 600 : 400, align: 'center', base: 'middle' });
      if (MAGIC.includes(m)) boxed(ctx, GX - 28, y, 40, 24);
    }
    text(ctx, 'number of neutrons (n)', GX - 48, GY - 24, PAL.ink, { size: 17, align: 'left', base: 'middle' });
    text(ctx, 'number of protons (Z)', GX + GW, GY + GW + 80, PAL.ink, { size: 17, align: 'right', base: 'middle' });
    text(ctx, 'mass number in each square', GX + GW, GY - 24, PAL.muted, { size: 17, align: 'right', base: 'middle' });
    /* ---- the sentence and the ratio ---- */
    const own = stableN(Z), count = `${cap(name)}-${A} has ${n} neutron${n === 1 ? '' : 's'} for its ${Z} proton${Z === 1 ? '' : 's'}, an n:p ratio of ${k.toFixed(2)}`;
    topline(ctx, stable ? `${count}, and is stable.`
      : Z > 83 ? `${count}. It is radioactive, as is every nuclide past bismuth, Z = 83.`
        : !own.length ? `${count}. It is radioactive, as is every nuclide of ${name}.`
          : n > Math.max(...own) ? `${count}. It is radioactive, with more neutrons than any stable nuclide of ${name}.`
            : n < Math.min(...own) ? `${count}. It is radioactive, with fewer neutrons than any stable nuclide of ${name}.`
              : `${count}. It is radioactive, though it lies between stable nuclides of ${name}.`);
    tex(d.readout, `{}^{${A}}_{${Z}}\\text{${SYM[Z - 1]}}:\\quad \\text{n:p ratio} = \\frac{n}{Z} = \\frac{${n}\\ \\text{neutron${n === 1 ? '' : 's'}}}{${Z}\\ \\text{proton${Z === 1 ? '' : 's'}}} = ${k.toFixed(2)}`);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 21.3: binding energy per nucleon. The book's curve with its
   fusion and fission arrows; the points are stable nuclides whose binding
   energy is found from their atomic masses as Examples 21.2 and 21.3 find
   it. A slider walks the nuclides from hydrogen-2 to uranium-238. Beside
   the graph the chosen nucleus, a flat packing of its protons and
   neutrons, stands over the sum that gives its mass defect. Still.
===================================================================== */
(function () {
  const d = sim('sim-binding-curve', 704);
  /* the book's masses and constants: proton, neutron, electron (in 10⁻⁵ amu, so the sums are exact), kg per amu, c (m/s), J per MeV */
  const MP = 100730, MN = 100870, ME = 55, KG = 1.6605e-27, CL = 2.998e8, JMEV = 1.602e-13;
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
    const p = Z * MP, nn = (A - Z) * MN, e = Z * ME, parts = p + nn + e, atom = Math.round(M * 1e5);
    const dm = Math.floor((parts - atom) / 10 + 0.5) / 1e4;   /* to the fourth decimal, as the atomic mass is given */
    /* the significant figures the mass defect carries, four at most: 0.0305 amu gives 28.4 MeV and 0.5302 amu gives 493.9 MeV, as the book has them */
    const sf = Math.min(4, String(Math.round(dm * 1e4)).length);
    const kg = dm * KG, J = +(kg * CL * CL).toPrecision(sf), MeV = J / JMEV;
    /* protons scattered among the discs of the drawn nucleus: the Z discs a fixed shuffle puts first */
    const mix = Array.from({ length: A }, (_, i) => i).sort((a, b) => ((Math.sin(a * 12.9898 + Z) * 43758.5453) % 1) - ((Math.sin(b * 12.9898 + Z) * 43758.5453) % 1));
    return { name, Z, A, N: A - Z, M, p, nn, e, parts, dm, sf, kg, J, MeV, per: MeV / A, protons: new Set(mix.slice(0, Z)) };
  });
  /* a mass held in 10⁻⁵ amu, written to four decimals, or five where the fifth is not zero */
  const amu = (v) => (v % 10 ? (v / 1e5).toFixed(5) : (v / 1e5).toFixed(4));
  const at = (name) => NUC.findIndex((q) => q.name === name);
  const pick = ctl(d.controls, { label: '\\text{nuclide}', cls: '', key: 'nuclide', min: 0, max: NUC.length - 1, step: 1, value: at('iron-56'), unit: '', fmt: (i) => NUC[i].name, aria: 'the nuclide placed on the curve', snap: false,
    detents: [{ v: at('helium-4'), label: 'He-4' }, { v: at('iron-56'), label: 'Fe-56' }, { v: at('uranium-238'), label: 'U-238' }] });
  /* the semi-empirical fit drawn as the book's smooth curve, Z on the line of stability */
  const fit = (A) => {
    if (A < 1) return 0;
    const Z = A / (1.98 + 0.0155 * Math.pow(A, 2 / 3));
    const B = 15.75 * A - 17.8 * Math.pow(A, 2 / 3) - (0.711 * Z * (Z - 1)) / Math.cbrt(A) - (23.7 * (A - 2 * Z) ** 2) / A;
    return Math.max(0, B / A);
  };
  const sup = (e) => String(e).replace('-', '⁻').replace(/\d/g, (c) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[c]);
  const sciText = (v, n) => { const e = Math.floor(Math.log10(v)); return `${(v / 10 ** e).toFixed(n - 1)} × 10${sup(e)}`; };
  const sci = (v, n = 4) => { const e = Math.floor(Math.log10(v)); return `${(v / 10 ** e).toFixed(n - 1)}\\times10^{${e}}`; };
  /* the graph on the right; on the left the nucleus, on one scale that lets uranium-238 fill its square, over the sum */
  const box = { l: 600, r: 1350, t: 124, b: 610 };
  const CX = 265, CY = 264, S = 10.7, R = 9.4, GOLD = 2.39996, L0 = 36, L1 = 520;
  let hits = [], X = null, Y = null;
  F.hover(d.stage, () => hits);
  d.c.style.cursor = 'pointer';
  d.c.addEventListener('click', (ev) => {
    const b = d.c.getBoundingClientRect(); if (!b.width || !X) return;
    const px = ((ev.clientX - b.left) * 1400) / b.width, py = ((ev.clientY - b.top) * 1400) / b.width;
    let best = -1, bd = 22;
    NUC.forEach((q, i) => { const r = Math.hypot(X(q.A) - px, Y(q.per) - py); if (r < bd) { bd = r; best = i; } });
    if (best >= 0 && best !== pick.v) pick.drive(best);
  });
  function draw() {
    const { ctx } = begin(d.c);
    const q = NUC[Math.round(pick.v)], ce = C('energy'), cm = C('mass');
    hits = [];
    ({ X, Y } = axes(ctx, box, [0, 260], [0, 10], { nx: 13, ny: 10, xl: 'mass number (A)', yl: 'binding energy per nucleon (MeV)', yc: ce }));
    curve(ctx, fit, 1, 260, X, Y, ce, 5, 520);
    NUC.forEach((p) => {
      if (p !== q) dot(ctx, X(p.A), Y(p.per), alpha(PAL.ink, 0.55), true, 6);
      hits.push({ x: X(p.A), y: Y(p.per), r: 10, name: `${p.name}: ${p.per.toPrecision(p.sf)} MeV per nucleon` });
    });
    arrow(ctx, X(20), Y(2.0), X(24), Y(5.3), PAL.ink, 3);
    text(ctx, 'fusion', X(25) + 12, Y(3.4), PAL.ink, { size: 20, align: 'left', base: 'middle' });
    arrow(ctx, X(222), Y(7.05), X(150), Y(7.55), PAL.ink, 3);
    text(ctx, 'fission', X(226), Y(6.75), PAL.ink, { size: 20, align: 'center' });
    const px = X(q.A), py = Y(q.per);
    line(ctx, px, py, px, box.b, alpha(ce, 0.6), 2, [4, 8]);
    line(ctx, box.l, py, px, py, alpha(ce, 0.6), 2, [4, 8]);
    dot(ctx, px, py, ce, true, 10);
    F.label(ctx, q.name, px, py, q.A < 30 ? { side: 'right', gap: 22, size: 20 } : { side: 'above', gap: 30, size: 20 });
    /* the nucleus, a sunflower packing of A discs, protons spread evenly among them */
    const cp = F.el('p+'), cn = F.el('n0'), cel = F.el('e-');
    ctx.save(); ctx.lineWidth = 1.2; ctx.strokeStyle = alpha(PAL.ink, 0.6);
    for (let i = q.A - 1; i >= 0; i--) {
      const r = S * Math.sqrt(i + 0.5), t = i * GOLD;
      ctx.fillStyle = q.protons.has(i) ? cp : cn;
      ctx.beginPath(); ctx.arc(CX + r * Math.cos(t), CY + r * Math.sin(t), R, 0, 2 * Math.PI); ctx.fill(); ctx.stroke();
    }
    ctx.restore();
    hits.push({ x: CX, y: CY, r: S * Math.sqrt(q.A) + R, name: `${q.name} nucleus: ${q.Z} protons and ${q.N} neutrons` });
    /* the sum of Example 21.3: the separate particles, less the atom, leaves the mass defect */
    const row = (y, parts, value, color, mark) => {
      if (mark) dot(ctx, L0 + 10, y, mark, true, 8);
      F.rich(ctx, parts, L0 + 32, y, { size: 20, base: 'middle' });
      text(ctx, value, L1, y, color ?? PAL.ink, { size: 20, weight: color ? 600 : 400, align: 'right', base: 'middle' });
    };
    const plural = (k, w) => `${k} ${w}${k === 1 ? '' : 's'}`;
    row(478, [`${plural(q.Z, 'proton')} × 1.0073 amu`], `${amu(q.p)} amu`, null, cp);
    row(507, [`${plural(q.N, 'neutron')} × 1.0087 amu`], `${amu(q.nn)} amu`, null, cn);
    row(536, [`${plural(q.Z, 'electron')} × 0.00055 amu`], `${amu(q.e)} amu`, null, cel);
    line(ctx, L0 + 32, 553, L1, 553, PAL.muted, 1.5);
    row(571, ['the particles apart'], `${amu(q.parts)} amu`);
    row(600, [`one atom of ${q.name}`], `− ${q.M.toFixed(4)} amu`);
    line(ctx, L0 + 32, 617, L1, 617, PAL.muted, 1.5);
    row(636, [['mass defect', cm]], `${q.dm.toFixed(4)} amu`, cm);
    row(666, ['in kilograms'], `${sciText(q.kg, q.sf)} kg`, cm);
    topline(ctx, `Breaking ${q.name} into its ${q.A} nucleons takes ${q.MeV.toPrecision(q.sf)} MeV, ${q.per.toPrecision(q.sf)} MeV for each one.`);
    tex(d.readout, `\\kE=\\km\\kc^{2}=(${sci(q.kg, q.sf)}\\ \\text{kg})(2.998\\times10^{8}\\ \\text{m/s})^{2}=${sci(q.J, q.sf)}\\ \\text{J}`
      + ` \\\\ \\frac{\\kE}{A}=\\frac{${sci(q.J, q.sf)}\\ \\text{J}}{${q.A}\\ \\text{nucleons}}\\times\\frac{1\\ \\text{MeV}}{1.602\\times10^{-13}\\ \\text{J}}=${q.per.toPrecision(q.sf)}\\ \\text{MeV/nucleon}`);
  }
  register(d.fig, { update: () => {}, draw });
})();
};
