/* Figures for section 15.2 Lewis Acids and Bases. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['15.2'] = function (root, F) {
const { C, PAL, alpha, ctl, register, begin, line, text, headline } = F;
const sim = (id, H) => F.sim(root, id, H);
const still = (d, draw) => register(d.fig, { update: () => {}, draw });
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;
const RAD = Math.PI / 180;
const BASE = () => F.ref('base'), ACID = () => F.ref('acid');

/* ---------- Lewis structures, flat, each atom in the colour of the species it came from ----------
   atoms: [{ s, x, y, c, lp: [angles in degrees, 0 to the right, 90 up] }]; bonds: [[i, j, order, colour]] */
function lewis(ctx, atoms, bonds, size = 28) {
  const gap = (a) => (a.s.length > 1 ? size * 0.95 : size * 0.68);
  bonds.forEach(([i, j, order, c]) => {
    const a = atoms[i], b = atoms[j], dx = b.x - a.x, dy = b.y - a.y, L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L;
    const ga = gap(a), gb = gap(b);
    ({ 1: [0], 2: [-5, 5], 3: [-7, 0, 7] })[order].forEach((o) => line(ctx, a.x + ux * ga - uy * o, a.y + uy * ga + ux * o, b.x - ux * gb - uy * o, b.y - uy * gb + ux * o, c, 3));
  });
  atoms.forEach((a) => {
    text(ctx, a.s, a.x, a.y + 1, a.c, { size, weight: 600, align: 'center' });
    (a.lp ?? []).forEach((ang) => {
      const cx = Math.cos(ang * RAD), cy = -Math.sin(ang * RAD), r = size * 0.9, o = size * 0.23;
      [-o, o].forEach((k) => F.dot(ctx, a.x + cx * r - cy * k, a.y + cy * r + cx * k, a.c, true, 3.5));
    });
  });
}
/* square brackets round an ion, its charge at the top right */
function brackets(ctx, x1, x2, y1, y2, q) {
  [[x1, 1], [x2, -1]].forEach(([x, s]) => {
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.beginPath();
    ctx.moveTo(x + s * 12, y1); ctx.lineTo(x, y1); ctx.lineTo(x, y2); ctx.lineTo(x + s * 12, y2); ctx.stroke(); ctx.restore();
  });
  text(ctx, q, x2 + 10, y1 + 8, PAL.ink, { size: 22, weight: 600 });
}
const plus = (ctx, x, y) => text(ctx, '+', x, y, PAL.ink, { size: 30, align: 'center' });
const yields = (ctx, x1, x2, y) => F.arrow(ctx, x1, y, x2, y, PAL.ink, 3);
const role = (ctx, s, x, y, c) => text(ctx, s, x, y, c, { size: 22, weight: 600, align: 'center' });
/* the lone pairs of a terminal atom, named by the side of the central atom it sits on */
const lpOf = { top: [0, 90, 180], right: [0, 90, 270], bottom: [0, 180, 270], left: [90, 180, 270] };

/* =====================================================================
   H2O + H+ -> H3O+ and NH3 + H+ -> NH4+, the book's hydronium image,
   faithful. The base and everything it brings to the adduct in the
   base's colour, H+ in the acid's; the new bond in the base's colour,
   since both of its electrons were the base's lone pair.
===================================================================== */
(function () {
  const H = 460, d = sim('fig-hydronium', H);
  function draw() {
    const { ctx } = begin(d.c), B = BASE(), A = ACID(), L = 72;
    const Y1 = 110, Y2 = 330;
    lewis(ctx, [{ s: 'O', x: 330, y: Y1, c: B, lp: [90, 0] }, { s: 'H', x: 330 - L, y: Y1, c: B }, { s: 'H', x: 330, y: Y1 + L, c: B }], [[0, 1, 1, B], [0, 2, 1, B]]);
    plus(ctx, 470, Y1);
    lewis(ctx, [{ s: 'H⁺', x: 560, y: Y1, c: A }], []);
    yields(ctx, 650, 830, Y1);
    lewis(ctx, [{ s: 'O', x: 1010, y: Y1, c: B, lp: [90] }, { s: 'H', x: 1010 - L, y: Y1, c: B }, { s: 'H', x: 1010, y: Y1 + L, c: B }, { s: 'H', x: 1010 + L, y: Y1, c: A }],
      [[0, 1, 1, B], [0, 2, 1, B], [0, 3, 1, B]]);
    brackets(ctx, 905, 1115, Y1 - 52, Y1 + 104, '+');
    lewis(ctx, [{ s: 'N', x: 330, y: Y2, c: B, lp: [90] }, { s: 'H', x: 330 - L, y: Y2, c: B }, { s: 'H', x: 330 + L, y: Y2, c: B }, { s: 'H', x: 330, y: Y2 + L, c: B }],
      [[0, 1, 1, B], [0, 2, 1, B], [0, 3, 1, B]]);
    plus(ctx, 470, Y2);
    lewis(ctx, [{ s: 'H⁺', x: 560, y: Y2, c: A }], []);
    yields(ctx, 650, 830, Y2);
    lewis(ctx, [{ s: 'N', x: 1010, y: Y2, c: B }, { s: 'H', x: 1010 - L, y: Y2, c: B }, { s: 'H', x: 1010 + L, y: Y2, c: B }, { s: 'H', x: 1010, y: Y2 + L, c: B }, { s: 'H', x: 1010, y: Y2 - L, c: A }],
      [[0, 1, 1, B], [0, 2, 1, B], [0, 3, 1, B], [0, 4, 1, B]]);
    brackets(ctx, 905, 1115, Y2 - 104, Y2 + 104, '+');
  }
  still(d, draw);
})();

/* =====================================================================
   F- + BF3 -> BF4-, the book's BF3-LA image, faithful, with its three
   role labels.
===================================================================== */
(function () {
  const H = 330, d = sim('fig-bf3', H);
  function draw() {
    const { ctx } = begin(d.c), B = BASE(), A = ACID(), L = 72, Y = 130;
    lewis(ctx, [{ s: 'F', x: 170, y: Y, c: B, lp: [0, 90, 180, 270] }], []);
    text(ctx, '−', 205, Y - 26, B, { size: 24, weight: 600 });
    plus(ctx, 290, Y);
    lewis(ctx, [{ s: 'B', x: 420, y: Y, c: A }, { s: 'F', x: 420, y: Y - L, c: A, lp: lpOf.top }, { s: 'F', x: 420 + L, y: Y, c: A, lp: lpOf.right }, { s: 'F', x: 420, y: Y + L, c: A, lp: lpOf.bottom }],
      [[0, 1, 1, A], [0, 2, 1, A], [0, 3, 1, A]]);
    yields(ctx, 600, 780, Y);
    lewis(ctx, [{ s: 'B', x: 1030, y: Y, c: A }, { s: 'F', x: 1030 - L, y: Y, c: B, lp: lpOf.left }, { s: 'F', x: 1030, y: Y - L, c: A, lp: lpOf.top }, { s: 'F', x: 1030 + L, y: Y, c: A, lp: lpOf.right }, { s: 'F', x: 1030, y: Y + L, c: A, lp: lpOf.bottom }],
      [[0, 1, 1, B], [0, 2, 1, A], [0, 3, 1, A], [0, 4, 1, A]]);
    brackets(ctx, 905, 1155, Y - 112, Y + 112, '−');
    role(ctx, 'Lewis base', 170, 290, B); role(ctx, 'Lewis acid', 430, 290, A); role(ctx, 'Acid-base adduct', 1030, 290, PAL.ink);
  }
  still(d, draw);
})();

/* =====================================================================
   2 NH3 + Ag+ -> Ag(NH3)2+, the book's NH3-LBase image, faithful.
===================================================================== */
(function () {
  const H = 330, d = sim('fig-silver-ammonia', H);
  const ammonia = (x, y, c, side, lp) => {
    const s = side === 'left' ? -1 : 1;
    return [{ s: 'N', x, y, c, lp }, { s: 'H', x: x + s * 72, y, c }, { s: 'H', x, y: y - 72, c }, { s: 'H', x, y: y + 72, c }];
  };
  function draw() {
    const { ctx } = begin(d.c), B = BASE(), A = ACID(), Y = 130;
    text(ctx, '2', 120, Y, PAL.ink, { size: 28, align: 'center' });
    lewis(ctx, ammonia(250, Y, B, 'left', [0]), [[0, 1, 1, B], [0, 2, 1, B], [0, 3, 1, B]]);
    plus(ctx, 370, Y);
    lewis(ctx, [{ s: 'Ag⁺', x: 470, y: Y, c: A }], []);
    yields(ctx, 590, 760, Y);
    const left = ammonia(940, Y, B, 'left'), right = ammonia(1140, Y, B, 'right');
    const atoms = [{ s: 'Ag', x: 1040, y: Y, c: A }, ...left, ...right];
    lewis(ctx, atoms, [[0, 1, 1, B], [0, 5, 1, B], [1, 2, 1, B], [1, 3, 1, B], [1, 4, 1, B], [5, 6, 1, B], [5, 7, 1, B], [5, 8, 1, B]]);
    brackets(ctx, 835, 1245, Y - 112, Y + 112, '+');
    role(ctx, 'Lewis base', 230, 290, B); role(ctx, 'Lewis acid', 470, 290, A); role(ctx, 'Acid-base adduct', 1040, 290, PAL.ink);
  }
  still(d, draw);
})();

/* =====================================================================
   O2- + SO3 -> SO4 2-, the book's NonmetalOx image, faithful.
===================================================================== */
(function () {
  const H = 330, d = sim('fig-oxide', H);
  function draw() {
    const { ctx } = begin(d.c), B = BASE(), A = ACID(), L = 72, Y = 130;
    lewis(ctx, [{ s: 'O', x: 170, y: Y, c: B, lp: [0, 90, 180, 270] }], []);
    text(ctx, '2−', 205, Y - 26, B, { size: 22, weight: 600 });
    plus(ctx, 300, Y);
    lewis(ctx, [{ s: 'S', x: 420, y: Y, c: A }, { s: 'O', x: 420, y: Y - L, c: A, lp: lpOf.top }, { s: 'O', x: 420 + L, y: Y, c: A, lp: [90, 0] }, { s: 'O', x: 420, y: Y + L, c: A, lp: lpOf.bottom }],
      [[0, 1, 1, A], [0, 2, 2, A], [0, 3, 1, A]]);
    yields(ctx, 600, 780, Y);
    lewis(ctx, [{ s: 'S', x: 1030, y: Y, c: A }, { s: 'O', x: 1030 - L, y: Y, c: B, lp: lpOf.left }, { s: 'O', x: 1030, y: Y - L, c: A, lp: lpOf.top }, { s: 'O', x: 1030 + L, y: Y, c: A, lp: lpOf.right }, { s: 'O', x: 1030, y: Y + L, c: A, lp: lpOf.bottom }],
      [[0, 1, 1, B], [0, 2, 1, A], [0, 3, 1, A], [0, 4, 1, A]]);
    brackets(ctx, 905, 1155, Y - 112, Y + 112, '2−');
    role(ctx, 'Lewis base', 170, 290, B); role(ctx, 'Lewis acid', 430, 290, A); role(ctx, 'Acid-base adduct', 1030, 290, PAL.ink);
  }
  still(d, draw);
})();

/* =====================================================================
   The two displacements, the book's Displace image, faithful. Above,
   cyanide (the displacer) takes ammonia's place on Ag+; below, SO3 (the
   displacer) takes the oxide ion, drawn as carbonate's upper oxygen,
   from CO2. Bonds a little shorter so four species fit each row.
===================================================================== */
(function () {
  const H = 600, d = sim('fig-displace', H), S = 25, L = 62, LA = 78;
  const ammonia = (x, y, c, side, lp) => {
    const s = side === 'left' ? -1 : 1;
    return [{ s: 'N', x, y, c, lp }, { s: 'H', x: x + s * L, y, c }, { s: 'H', x, y: y - L, c }, { s: 'H', x, y: y + L, c }];
  };
  const nh3Bonds = (k, c) => [[k, k + 1, 1, c], [k, k + 2, 1, c], [k, k + 3, 1, c]];
  function draw() {
    const { ctx } = begin(d.c), B = BASE(), A = ACID(), N = F.ref('displacer'), Y1 = 120, Y2 = 420, R1 = 240, R2 = 545;
    /* row 1: [Ag(NH3)2]+ + 2 CN- -> [Ag(CN)2]- + 2 NH3 */
    lewis(ctx, [{ s: 'Ag', x: 200, y: Y1, c: A }, ...ammonia(200 - LA, Y1, B, 'left'), ...ammonia(200 + LA, Y1, B, 'right')],
      [[0, 1, 1, B], [0, 5, 1, B], ...nh3Bonds(1, B), ...nh3Bonds(5, B)], S);
    brackets(ctx, 38, 362, Y1 - 92, Y1 + 92, '+');
    plus(ctx, 412, Y1);
    text(ctx, '2', 452, Y1, PAL.ink, { size: S, align: 'center' });
    lewis(ctx, [{ s: 'C', x: 510, y: Y1, c: N, lp: [180] }, { s: 'N', x: 510 + L, y: Y1, c: N, lp: [0] }], [[0, 1, 3, N]], S);
    brackets(ctx, 470, 612, Y1 - 34, Y1 + 34, '−');
    yields(ctx, 655, 760, Y1);
    lewis(ctx, [{ s: 'Ag', x: 940, y: Y1, c: A }, { s: 'C', x: 940 - LA, y: Y1, c: N }, { s: 'N', x: 940 - LA - L, y: Y1, c: N, lp: [180] }, { s: 'C', x: 940 + LA, y: Y1, c: N }, { s: 'N', x: 940 + LA + L, y: Y1, c: N, lp: [0] }],
      [[0, 1, 1, N], [1, 2, 3, N], [0, 3, 1, N], [3, 4, 3, N]], S);
    brackets(ctx, 766, 1114, Y1 - 34, Y1 + 34, '−');
    plus(ctx, 1160, Y1);
    text(ctx, '2', 1198, Y1, PAL.ink, { size: S, align: 'center' });
    lewis(ctx, ammonia(1250, Y1, B, 'right', [180]), nh3Bonds(0, B), S);
    role(ctx, 'Acid-base adduct', 200, R1, PAL.ink); role(ctx, 'Base', 540, R1, N); role(ctx, 'New adduct', 940, R1, PAL.ink); role(ctx, 'New base', 1265, R1, B);
    /* row 2: CO3 2- + SO3 -> SO4 2- + CO2 */
    lewis(ctx, [{ s: 'C', x: 150, y: Y2, c: A }, { s: 'O', x: 150, y: Y2 - L, c: B, lp: lpOf.top }, { s: 'O', x: 150 + L, y: Y2, c: A, lp: [90, 0] }, { s: 'O', x: 150, y: Y2 + L, c: A, lp: lpOf.bottom }],
      [[0, 1, 1, B], [0, 2, 2, A], [0, 3, 1, A]], S);
    brackets(ctx, 82, 258, Y2 - 92, Y2 + 92, '2−');
    plus(ctx, 320, Y2);
    lewis(ctx, [{ s: 'S', x: 400, y: Y2, c: N }, { s: 'O', x: 400, y: Y2 - L, c: N, lp: lpOf.top }, { s: 'O', x: 400 + L, y: Y2, c: N, lp: [90, 0] }, { s: 'O', x: 400, y: Y2 + L, c: N, lp: lpOf.bottom }],
      [[0, 1, 1, N], [0, 2, 2, N], [0, 3, 1, N]], S);
    yields(ctx, 540, 680, Y2);
    lewis(ctx, [{ s: 'S', x: 860, y: Y2, c: N }, { s: 'O', x: 860 - L, y: Y2, c: B, lp: lpOf.left }, { s: 'O', x: 860, y: Y2 - L, c: N, lp: lpOf.top }, { s: 'O', x: 860 + L, y: Y2, c: N, lp: lpOf.right }, { s: 'O', x: 860, y: Y2 + L, c: N, lp: lpOf.bottom }],
      [[0, 1, 1, B], [0, 2, 1, N], [0, 3, 1, N], [0, 4, 1, N]], S);
    brackets(ctx, 755, 965, Y2 - 92, Y2 + 92, '2−');
    plus(ctx, 1040, Y2);
    lewis(ctx, [{ s: 'O', x: 1120, y: Y2, c: A, lp: [90, 180] }, { s: 'C', x: 1120 + L, y: Y2, c: A }, { s: 'O', x: 1120 + 2 * L, y: Y2, c: A, lp: [90, 0] }],
      [[0, 1, 2, A], [1, 2, 2, A]], S);
    role(ctx, 'Acid-base adduct', 150, R2, PAL.ink); role(ctx, 'Acid', 420, R2, N); role(ctx, 'New adduct', 860, R2, PAL.ink); role(ctx, 'New acid', 1182, R2, A);
  }
  still(d, draw);
})();

/* =====================================================================
   Cu(CN)2-, the book's CuCN2- image, faithful: linear, so flat.
===================================================================== */
(function () {
  const H = 160, d = sim('fig-cucn2', H);
  function draw() {
    const { ctx } = begin(d.c), B = BASE(), A = ACID(), Y = 80, L = 72, LA = 92, X = 700;
    lewis(ctx, [{ s: 'Cu', x: X, y: Y, c: A }, { s: 'C', x: X - LA, y: Y, c: B }, { s: 'N', x: X - LA - L, y: Y, c: B, lp: [180] }, { s: 'C', x: X + LA, y: Y, c: B }, { s: 'N', x: X + LA + L, y: Y, c: B, lp: [0] }],
      [[0, 1, 1, B], [1, 2, 3, B], [0, 3, 1, B], [3, 4, 3, B]]);
    brackets(ctx, X - LA - L - 58, X + LA + L + 58, Y - 40, Y + 40, '−');
  }
  still(d, draw);
})();

/* =====================================================================
   SIM: silver chloride dissolving as ammonia is added. Ksp = 1.6e-10
   (Appendix J), Kf = 1.7e7 (the text). With N mol/L of ammonia added
   and n mol of solid in 1.00 L: while solid remains, s = [Cl-] is the
   amount dissolved, a = [Ag+] = Ksp/s, the complex c = s - a, the free
   ammonia f = N - 2c = sqrt(c/(Kf a)), so N(s) = 2c + sqrt(c/(Kf a)),
   rising from N = 0 at s = sqrt(Ksp); s is found from N by bisection.
   The last solid dissolves at N* = N(n), the slider's circle; past it
   s = n and a solves n - a = Kf a (N - 2(n - a))^2. Axes fixed: N from
   0 to 1.0 M; log concentration from -12 to 0, since at the slider
   extremes [Cl-] reaches 0.040 M and [Ag+] falls to 1.5e-10 M. Still:
   each equilibrium answers its sliders.
===================================================================== */
(function () {
  const H = 550, d = sim('sim-agcl-ammonia', H);
  const KSP = 1.6e-10, KF = 1.7e7, S0 = Math.sqrt(KSP);
  const Nof = (s) => { const a = KSP / s, c = Math.max(0, s - a); return 2 * c + Math.sqrt(c / (KF * a)); };
  const bisect = (g, lo, hi) => { for (let i = 0; i < 60; i++) { const m = (lo + hi) / 2; if (g(m) > 0) hi = m; else lo = m; } return (lo + hi) / 2; };
  const satS = (N) => (N <= 0 ? S0 : 10 ** bisect((ls) => Nof(10 ** ls) - N, Math.log10(S0), 0.5));
  function state(N, n) {
    if (N <= Nof(n)) { const s = satS(N); return { s, a: KSP / s, sat: true }; }
    const a = 10 ** bisect((la) => { const x = 10 ** la, c = n - x; return KF * x * (N - 2 * c) ** 2 - c; }, -40, Math.log10(n));
    return { s: n, a, sat: false };
  }
  const nS = ctl(d.controls, { label: '\\text{AgCl}(s)', cls: 'amount', key: 'n', min: 0.001, max: 0.04, step: 0.001, value: 0.01, unit: 'mol', dec: 3,
    aria: 'the amount of solid silver chloride in the beaker, in moles', onInput: () => draw() });
  const nh3 = ctl(d.controls, { label: '\\text{NH}_{3}', cls: 'concentration', key: 'N', min: 0, max: 1, step: 0.005, value: 0, unit: 'M', dec: 3,
    aria: 'the concentration of ammonia added, in molar',
    specials: [{ at: () => { const v = Nof(nS.v); return v <= 1 ? v : null; }, label: 'all dissolved' }], onInput: () => draw() });
  const ro = F.readout(d);
  let hits = []; F.hover(d.stage, () => hits);

  const SUP = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
  const sup = (k) => String(k).split('').map((c) => SUP[c]).join('');
  const parts = (v, f) => { let e = Math.floor(Math.log10(v)), m = +(v / 10 ** e).toFixed(f - 1); if (m >= 10) { m = 1; e += 1; } return [m, e]; };
  const round = (v, f) => { const [m, e] = parts(v, f); return m * 10 ** e; };
  const sciTxt = (v, f = 2) => { const [m, e] = parts(v, f); return `${m.toFixed(f - 1)} × 10${sup(e)}`; };
  const sciTex = (v, f = 2) => { const [m, e] = parts(v, f); return `${m.toFixed(f - 1)}\\times 10^{${e}}`; };
  const big = (r) => (r >= 1e4 ? sciTxt(r) : String(+r.toPrecision(2)));

  const G = { l: 560, r: 1300, t: 150, b: 450 };
  const BK = { l: 90, r: 360, t: 180, b: 450 };
  function beaker(ctx, rest) {
    const lip = 14;
    ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.06); ctx.fillRect(BK.l, BK.t + 40, BK.r - BK.l, BK.b - BK.t - 40); ctx.restore();
    line(ctx, BK.l - lip, BK.t, BK.l, BK.t + 10, PAL.ink, 3); line(ctx, BK.l, BK.t + 10, BK.l, BK.b, PAL.ink, 3);
    line(ctx, BK.l, BK.b, BK.r, BK.b, PAL.ink, 3); line(ctx, BK.r, BK.b, BK.r, BK.t + 10, PAL.ink, 3); line(ctx, BK.r, BK.t + 10, BK.r + lip, BK.t, PAL.ink, 3);
    line(ctx, BK.l, BK.t + 40, BK.r, BK.t + 40, alpha(PAL.ink, 0.35), 2);
    hits.push({ x: (BK.l + BK.r) / 2, y: BK.t + 110, r: 90, name: 'the solution, 1.00 L' });
    if (!(rest > 1e-6)) return;
    const k = Math.sqrt(rest / 0.04), w = 230 * k, h = 70 * k, cx = (BK.l + BK.r) / 2, y0 = BK.b - 2;
    ctx.save(); ctx.beginPath(); ctx.ellipse(cx, y0, w / 2, h, 0, Math.PI, 2 * Math.PI); ctx.closePath();
    ctx.fillStyle = F.fact('#f4f4f2'); ctx.fill(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2; ctx.stroke(); ctx.restore();
    hits.push({ x: cx, y: y0 - h / 2, r: Math.max(16, w / 2), name: `solid silver chloride, ${(rest).toFixed(4)} mol left` });
    F.label(ctx, 'AgCl(s)', cx, BK.b + 4, { side: 'below', size: 20, gap: 26 });
  }
  function draw() {
    const { ctx } = begin(d.c); hits = [];
    const N = nh3.v, n = nS.v, st = state(N, n), Nstar = Nof(n);
    const onCircle = Math.abs(N - Nstar) < 1e-9, done = !st.sat || onCircle;
    const cc = C('concentration'), c0 = F.cat(0), c1 = F.cat(1);
    beaker(ctx, done ? 0 : n - st.s);
    const fy = (v) => (Math.round(v) === 0 ? '1' : Math.round(v) % 2 ? '' : '10' + sup(Math.round(v)));
    const g = F.axes(ctx, G, [0, 1], [-12, 0], { nx: 5, ny: 12, fx: (v) => v.toFixed(1), fy, xl: 'NH_{3} added (M)', xc: cc, yl: 'concentration (M)', yc: cc });
    if (Nstar <= 1) {
      line(ctx, g.X(Nstar), G.t, g.X(Nstar), G.b, alpha(PAL.ink, 0.35), 2, [4, 8]);
      hits.push({ x: g.X(Nstar), y: (G.t + G.b) / 2, r: 10, name: `${Nstar.toFixed(3)} M ammonia: the last of the solid dissolves` });
    }
    const logCl = (x) => Math.log10(state(x, n).s), logAg = (x) => Math.log10(state(x, n).a);
    F.curve(ctx, logCl, 0, 1, g.X, g.Y, c0, 5, 140);
    F.curve(ctx, logAg, 0, 1, g.X, g.Y, c1, 5, 140);
    const xl = N > 0.7 ? 0.45 : 0.92;
    text(ctx, '[Cl⁻]', g.X(xl), g.Y(logCl(xl)) - 22, c0, { size: 22, weight: 600, align: 'center', bg: PAL.panel });
    text(ctx, '[Ag⁺]', g.X(xl), g.Y(logAg(xl)) + 26, c1, { size: 22, weight: 600, align: 'center', bg: PAL.panel });
    const xs = g.X(N), ys = g.Y(Math.log10(st.s)), ya = g.Y(Math.log10(st.a));
    F.dot(ctx, xs, ys, c0, true, 9); F.dot(ctx, xs, ya, c1, true, 9);
    hits.push({ x: xs, y: ys, r: 14, name: `[Cl⁻] = ${sciTxt(st.s, 3)} M, the silver chloride dissolved` }, { x: xs, y: ya, r: 14, name: `[Ag⁺] = ${sciTxt(st.a, 3)} M, the free silver ion` });
    const nTxt = n.toFixed(3), NTxt = N.toFixed(N < 0.1 ? 3 : 2);
    headline(ctx, N <= 0 ? `In pure water, only ${sciTxt(st.s)} mol of the silver chloride dissolves.`
      : done ? `All ${nTxt} mol of the silver chloride has dissolved in ${NTxt} M ammonia.`
        : `In ${NTxt} M ammonia, ${sciTxt(st.s)} mol of the silver chloride dissolves, ${big(st.s / S0)} times as much as in pure water.`);
    const aR = round(st.a, 3), sR = round(st.s, 3);
    const A = hue('concentration', sciTex(aR, 3)), Sv = hue('concentration', sciTex(sR, 3));
    const prod = `[\\text{Ag}^{+}][\\text{Cl}^{-}] = (\\mk{a}{${A}})(\\mk{s}{${Sv}})`;
    const tex = done
      ? `\\mk{K}{\\kQrxn} = ${prod} = \\mk{v}{${hue('equilibrium-constant', sciTex(aR * sR, 2))}} \\mk{rel}{${onCircle ? '=' : '<'}} \\mk{k}{\\kKsp}`
      : `\\mk{K}{\\kKsp} = ${prod} = \\mk{v}{${hue('equilibrium-constant', sciTex(KSP, 2))}}`;
    const free = st.s / st.a;
    const note = N <= 0 ? 'Without ammonia, every dissolved silver ion is free Ag⁺.'
      : `Only one dissolved silver ion in ${big(free)} is free Ag⁺; the rest are Ag(NH₃)₂⁺.`;
    ro.set(tex, note, { form: done });
  }
  still(d, draw);
})();
};
