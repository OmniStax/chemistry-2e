/* Figures for section 9.3 Stoichiometry of Gaseous Substances, Mixtures, and Reactions. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['9.3'] = function (root, F) {
const { el, fmt, tex, C, PAL, alpha, ctl, cycle, register, begin, line, arrow, dot, text, topline, axes, pinned, vbracket } = F;
const sim = (id, H) => F.sim(root, id, H);
function readout(host, main, small) { tex(host, main); if (small) host.appendChild(el('small', null, small)); }

const TAU = 2 * Math.PI;
const R = 0.08206;                                   /* L atm mol⁻¹ K⁻¹ */
const RTEX = '0.08206\\ \\text{L atm mol}^{-1}\\ \\text{K}^{-1}';
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;
function pick(controls, o, names) {
  const make = names.length > 5 ? F.select : F.choice;
  const c = make(controls, { label: o.label, aria: o.aria, options: names.map((n, i) => ({ value: String(i), label: n })), value: String(o.value ?? 0), onInput: () => o.onInput?.() });
  return { get v() { return +c.value; }, set(x) { c.set(String(x)); } };
}
/* each gas: its molar mass in g/mol and the atoms of one molecule as [element, dx, dy, radius] about its centre */
const MOLS = {
  'H₂': { m: 2.016, atoms: [['H', -5, 0, 5], ['H', 5, 0, 5]] },
  'He': { m: 4.003, atoms: [['He', 0, 0, 7]] },
  'Ne': { m: 20.18, atoms: [['Ne', 0, 0, 7.5]] },
  'Ar': { m: 39.95, atoms: [['Ar', 0, 0, 8]] },
  'N₂': { m: 28.01, atoms: [['N', -6, 0, 7], ['N', 6, 0, 7]] },
  'O₂': { m: 32.00, atoms: [['O', -6, 0, 7], ['O', 6, 0, 7]] },
  'Cl₂': { m: 70.90, atoms: [['Cl', -7, 0, 8.5], ['Cl', 7, 0, 8.5]] },
  'CH₄': { m: 16.04, atoms: [['H', -9, -8, 4.5], ['H', 9, -8, 4.5], ['H', -9, 8, 4.5], ['H', 9, 8, 4.5], ['C', 0, 0, 7]] },
  'NH₃': { m: 17.03, atoms: [['H', -9, 5, 4.5], ['H', 9, 5, 4.5], ['H', 0, -10, 4.5], ['N', 0, 0, 7]] },
  'H₂O': { m: 18.02, atoms: [['H', -8, 6, 4.5], ['H', 8, 6, 4.5], ['O', 0, 0, 7]] },
  'CO₂': { m: 44.01, atoms: [['O', -13, 0, 7], ['O', 13, 0, 7], ['C', 0, 0, 6.5]] },
  'NO': { m: 30.01, atoms: [['N', -6, 0, 7], ['O', 6, 0, 7]] },
  'NO₂': { m: 46.01, atoms: [['O', -11, 5, 7], ['O', 11, 5, 7], ['N', 0, -2, 7]] },
  'HCl': { m: 36.46, atoms: [['H', -8, 0, 5], ['Cl', 5, 0, 8.5]] },
  'CF₂Cl₂': { m: 120.91, atoms: [['F', -10, -9, 6], ['F', 10, -9, 6], ['Cl', -11, 9, 8], ['Cl', 11, 9, 8], ['C', 0, 0, 7]] },
};
const WORD = { 'H₂': 'hydrogen', 'He': 'helium', 'Ne': 'neon', 'Ar': 'argon', 'N₂': 'nitrogen', 'O₂': 'oxygen', 'Cl₂': 'chlorine', 'CH₄': 'methane', 'NH₃': 'ammonia', 'H₂O': 'water', 'CO₂': 'carbon dioxide', 'NO': 'nitrogen monoxide', 'NO₂': 'nitrogen dioxide', 'HCl': 'hydrogen chloride', 'CF₂Cl₂': 'Freon 12' };
const molName = (f) => (MOLS[f].atoms.length === 1 ? 'a ' + WORD[f] + ' atom, ' + f : 'a molecule of ' + WORD[f] + ', ' + f);
/* one molecule of the gas f centred on (x, y), scaled by k and turned by a; hydrogen takes an ink outline so that its light disc reads on a light page */
function molecule(ctx, f, x, y, k = 1, a = 0) {
  const c = Math.cos(a), s = Math.sin(a); let reach = 0;
  for (const [elm, dx, dy, rr] of MOLS[f].atoms) {
    const px = x + (dx * c - dy * s) * k, py = y + (dx * s + dy * c) * k;
    ctx.save(); ctx.fillStyle = F.el(elm); ctx.strokeStyle = elm === 'H' ? PAL.ink : alpha(PAL.ink, 0.35); ctx.lineWidth = elm === 'H' ? 1.5 : 1; ctx.beginPath(); ctx.arc(px, py, rr * k, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore();
    reach = Math.max(reach, Math.hypot(dx, dy) * k + rr * k);
  }
  return reach;
}

/* ---------- three dimensions, as in 9.2 ---------- */
const T3D = window.THREE;
const { sphere: sphere3, stick: stick3, box: box3, mat: mat3, polyline: polyline3 } = F.mesh;
const palSig = () => [PAL.ink, PAL.panel, PAL.soft, PAL.muted, F.CC, F.el('H'), F.el('Ne'), C('volume'), C('pressure')].join('|');
const strip = (d, H) => F.makeCanvas(d.stage, H);
const glass = (extra = {}) => ({ transparent: true, opacity: 0.1, depthWrite: false, side: T3D.DoubleSide, ...extra });
function gas3() {
  const g = { p: [] };
  g.step = (dt, speed, inside) => {
    for (const q of g.p) {
      for (let k = 0; k < 3; k++) q.x[k] += q.u[k] * speed * dt;
      const n = inside(q);
      if (n) { const dd = q.u[0] * n[0] + q.u[1] * n[1] + q.u[2] * n[2]; if (dd < 0) for (let k = 0; k < 3; k++) q.u[k] -= 2 * dd * n[k]; }
    }
  };
  return g;
}
const heading3 = () => { const z = 2 * Math.random() - 1, a = Math.random() * TAU, r = Math.sqrt(1 - z * z); return [r * Math.cos(a), r * Math.sin(a), z]; };
function molecule3(v, parent, f, k) {
  const m = new T3D.Group(); parent.add(m);
  MOLS[f].atoms.forEach(([elm, dx, dy, rr]) => v.pickable(sphere3(m, [dx * k, dy * k, 0], rr * k * 1.15, F.el(elm)), molName(f)));
  return m;
}
function place3(m, q) { m.position.set(q.x[0], q.x[1], q.x[2]); m.rotation.set(0, Math.atan2(q.u[0], q.u[2]), Math.asin(Math.max(-1, Math.min(1, q.u[1])))); }
function flock(v, grp, g, k) {
  const f = { sig: '', ms: [] };
  f.sync = (of) => {
    const key = [g.p.length, of, palSig()].join('|');
    if (key !== f.sig) { f.sig = key; f.ms.forEach((m) => { m.traverse((o) => { if (o.material) o.material.dispose(); }); grp.remove(m); }); f.ms = g.p.map((q) => molecule3(v, grp, q.f, k)); }
    g.p.forEach((q, i) => place3(f.ms[i], q));
  };
  f.drop = () => { f.sig = ''; f.ms = []; };
  return f;
}

/* =====================================================================
   SIM: the density of a gas against its molar mass. At one pressure and
   temperature every gas sits on the line d = ℳP/RT through the origin.
   Still: the line and the chosen gas answer their sliders. Axes fixed:
   ℳ 0 to 130 g/mol, d 0 to 15 g/L (the steepest line, 2 atm and 200 K,
   gives Freon 12 about 14.7 g/L).
===================================================================== */
(function () {
  const d = sim('sim-gas-density', 560);
  const GASES = ['H₂', 'CH₄', 'N₂', 'Ar', 'CO₂', 'Cl₂', 'CF₂Cl₂'];
  const G = pick(d.controls, { label: '\\text{gas}', value: 2, aria: 'the gas whose density is read' }, GASES);
  const P = ctl(d.controls, { label: '\\kP', cls: 'pressure', min: 0.5, max: 2, step: 0.01, value: 1, unit: 'atm', dec: 2, aria: 'pressure in atmospheres', specials: [{ at: 1, label: '1 atm' }] });
  const T = ctl(d.controls, { label: '\\kT', cls: 'temperature', min: 200, max: 600, step: 1, value: 273, unit: 'K', dec: 0, aria: 'temperature in kelvin', specials: [{ at: 273, label: '273 K' }] });
  const hits = []; F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c);
    hits.length = 0;
    const p = P.v, t = T.v, slope = p / (R * t), cm = C('mass'), cd = C('density');
    const box = { l: 150, r: 1300, t: 130, b: 460 };
    const { X, Y } = axes(ctx, box, [0, 130], [0, 15], { xl: 'ℳ (g/mol)', xc: cm, yl: 'd (g/L)', yc: cd, nx: 13, ny: 3 });
    ctx.save(); ctx.beginPath(); ctx.rect(box.l, box.t, box.r - box.l, box.b - box.t); ctx.clip();
    line(ctx, X(0), Y(0), X(130), Y(130 * slope), cd, 4);
    ctx.restore();
    const sel = GASES[G.v];
    GASES.forEach((f) => {
      const m = MOLS[f].m, q = pinned(ctx, box, X, Y, m, m * slope, f === sel ? PAL.ink : alpha(PAL.ink, 0.35));
      if (q.out) return;
      const reach = molecule(ctx, f, q.x, q.y - 26, f === sel ? 1.2 : 0.8, 0);
      hits.push({ x: q.x, y: q.y - 26, r: reach + 4, name: molName(f) + ', ' + fmt(m, 2) + ' g/mol, ' + fmt(m * slope, 2) + ' g/L' });
    });
    const m = MOLS[sel].m, dd = m * slope, q = { x: X(m), y: Y(Math.min(dd, 15)) };
    F.label(ctx, sel + ': ' + fmt(dd, dd < 1 ? 3 : 2) + ' g/L', q.x, q.y - 26, { side: dd > 11 ? 'right' : 'above', color: cd, gap: 22 });
    topline(ctx, 'At ' + fmt(p, 2) + ' atm and ' + t + ' K, a liter of ' + WORD[sel] + ' has a mass of ' + fmt(dd, dd < 1 ? 3 : 2) + ' g, and every other gas lies on the same line.');
    readout(d.readout, `${hue('density', 'd')} = \\frac{\\kMM\\kP}{R\\kT} = \\frac{(${hue('mass', fmt(m, 2) + '\\ \\text{g/mol}')})(${hue('pressure', fmt(p, 2) + '\\ \\text{atm}')})}{(${RTEX})(${hue('temperature', t + '\\ \\text{K}')})} = ${hue('density', fmt(dd, dd < 1 ? 3 : 2) + '\\ \\text{g/L}')}`,
      'The slope of the line is P/RT, the number of moles in one liter, which is the same for every gas; a gas of greater molar mass packs more grams into those moles and so lies higher on the line.');
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 9.20: Dalton's cylinders, in three dimensions. Three equal
   cylinders of hydrogen, helium and neon, and a fourth of the same size
   holding all three. Moving: the molecules travel and strike the walls,
   so the figure runs continuously with the transport. The cylinders
   stand on a bench, so the pitch stays between 2° and 72° above level.
===================================================================== */
(function () {
  const d = sim('sim-dalton');
  const v = F.view3d(d.stage, { spin: 'off', pitch: [0.035, 1.25], views: [{ label: 'front', yaw: 0, pitch: 0.2 }, { label: 'above', yaw: 0, pitch: 1.1 }], h: 330, dist: 8.4, tilt: 0.2 });
  const grp = v.part(0), cnv = strip(d, 300);
  const GAS = ['H₂', 'He', 'Ne'], WHO = ['hydrogen', 'helium', 'neon'], SYM = ['\\kPA', '\\kPB', '\\kPC'], NAME = ['P_{A}', 'P_{B}', 'P_{C}'];
  const Ps = [300, 450, 600].map((val, i) => ctl(d.controls, { label: SYM[i], cls: 'pressure', min: 0, max: 900, step: 10, value: val, unit: 'kPa', dec: 0, aria: 'partial pressure of ' + WORD[GAS[i]] + ' in kilopascals', onInput: refill }));
  const RC = 0.55, HC = 1.7, XS = [-3.3, -1.6, 0.1, 2.9], RM = 0.1, LIM = RC - RM - 0.02;
  const g = gas3();
  const count = (p) => Math.round(p / 50);
  function refill() {
    g.p = [];
    GAS.forEach((f, i) => { for (const c of [i, 3]) for (let j = 0; j < count(Ps[i].v); j++) { const a = Math.random() * TAU, rr = Math.sqrt(Math.random()) * LIM; g.p.push({ c, f, x: [XS[c] + rr * Math.cos(a), (Math.random() - 0.5) * (HC - 2 * RM), rr * Math.sin(a)], u: heading3() }); } });
  }
  refill();
  const inside = (q) => {
    const cx = XS[q.c], dx = q.x[0] - cx, dz = q.x[2], rr = Math.hypot(dx, dz); let n = null;
    if (rr > LIM) { q.x[0] = cx + (dx / rr) * LIM; q.x[2] = (dz / rr) * LIM; n = [-dx / rr, 0, -dz / rr]; }
    const top = HC / 2 - RM; if (q.x[1] > top) { q.x[1] = top; n = [0, -1, 0]; } else if (q.x[1] < -top) { q.x[1] = -top; n = [0, 1, 0]; }
    return n;
  };
  const cy = cycle(() => Infinity, 0);
  const birds = flock(v, grp, g, 0.011);
  let sig = '';
  function build() {
    const key = [Ps.map((p) => p.v).join(), palSig(), WHO.map((w) => F.ref(w)).join()].join('|'); if (key === sig) return; sig = key;
    v.clear(); birds.drop();
    v.pickable(box3(grp, [-0.2, -HC / 2 - 0.08, 0], [8.2, 0.12, 1.8], PAL.soft), 'bench');
    XS.forEach((x, i) => {
      const wall = i < 3 ? F.ref(WHO[i]) : PAL.ink, op = i < 3 ? 0.16 : 0.1;
      const body = new T3D.Mesh(new T3D.CylinderGeometry(RC, RC, HC, 36, 1, true), mat3(wall, glass({ opacity: op }))); body.position.set(x, 0, 0); grp.add(body);
      const cap = new T3D.Mesh(new T3D.SphereGeometry(RC, 36, 12, 0, TAU, 0, Math.PI / 2), mat3(wall, glass({ opacity: op }))); cap.position.set(x, HC / 2, 0); grp.add(cap);
      v.pickable(body, i < 3 ? 'a cylinder of ' + WORD[GAS[i]] + ' alone' : 'the same-size cylinder holding all three gases');
      stick3(grp, [x, HC / 2 + RC - 0.05, 0], [x, HC / 2 + RC + 0.22, 0], 0.06, PAL.muted);
      v.pickable(box3(grp, [x, HC / 2 + RC + 0.26, 0], [0.34, 0.1, 0.1], PAL.muted), 'valve');
      v.label(i < 3 ? GAS[i] : 'mixture', [x, -HC / 2 - 0.2, 0.9], grp, 16).style.color = wall;
    });
    F.mesh.arrow(grp, [XS[2] + 0.75, 0, 0], [XS[3] - 0.75, 0, 0], 0.035, PAL.ink);
    v.label('combined', [(XS[2] + XS[3]) / 2, 0.22, 0], grp, 0);
  }
  function draw() {
    build();
    birds.sync(Ps.map((p) => p.v).join());
    v.invalidate();
    const { ctx } = begin(cnv);
    const p = Ps.map((s) => s.v), tot = p[0] + p[1] + p[2], cp = C('pressure');
    /* one pressure scale for every bar, 0 to 3000 kPa, past the 2700 kPa the three sliders can add to */
    const x0 = 300, x1 = 1320, X = (kpa) => x0 + ((x1 - x0) * kpa) / 3000;
    const rows = [0, 1, 2, 3].map((i) => 110 + i * 38);
    for (let k = 0; k <= 6; k++) { const xv = X(k * 500); line(ctx, xv, rows[0] - 16, xv, rows[3] + 16, PAL.rule, 1.5); text(ctx, String(k * 500), xv, rows[3] + 40, PAL.muted, { size: 17, align: 'center' }); }
    text(ctx, 'pressure (kPa)', x1, rows[3] + 70, cp, { size: 20, weight: 600, align: 'right' });
    const bar = (y, a, b, i) => { ctx.save(); ctx.fillStyle = F.ref(WHO[i]); ctx.fillRect(X(a), y - 12, X(b) - X(a), 24); ctx.restore(); };
    GAS.forEach((f, i) => {
      text(ctx, WORD[GAS[i]] + ' alone, ' + NAME[i], x0 - 16, rows[i], F.ref(WHO[i]), { size: 18, align: 'right' });
      bar(rows[i], 0, p[i], i);
      text(ctx, p[i] + ' kPa', X(p[i]) + 10, rows[i], cp, { size: 17, weight: 600 });
    });
    text(ctx, 'the mixture', x0 - 16, rows[3], PAL.ink, { size: 18, align: 'right', weight: 600 });
    let acc = 0; GAS.forEach((f, i) => { bar(rows[3], acc, acc + p[i], i); acc += p[i]; });
    text(ctx, tot + ' kPa', X(tot) + 10, rows[3], cp, { size: 17, weight: 600 });
    const X_ = (i) => (tot ? fmt(p[i] / tot, 3) : '0');
    text(ctx, 'mole fractions in the mixture: hydrogen ' + X_(0) + ', helium ' + X_(1) + ', neon ' + X_(2), 700, 286, PAL.muted, { size: 17, align: 'center' });
    topline(ctx, p[0] + ' kPa of hydrogen, ' + p[1] + ' kPa of helium and ' + p[2] + ' kPa of neon, put together in one cylinder of the same size, press at ' + tot + ' kPa.');
    readout(d.readout, `\\kPtot = \\kPA + \\kPB + \\kPC = ${hue('pressure', p[0] + '\\ \\text{kPa}')} + ${hue('pressure', p[1] + '\\ \\text{kPa}')} + ${hue('pressure', p[2] + '\\ \\text{kPa}')} = ${hue('pressure', tot + '\\ \\text{kPa}')}`,
      'One molecule is drawn for every 50 kPa. Each gas keeps its own molecules and strikes the walls of the mixture’s cylinder as often as it struck the walls of its own, so its partial pressure is its mole fraction times the total.');
  }
  register(d.fig, { update: (dt) => { cy.step(dt, () => 1); g.step(dt, 0.78, inside); }, draw });
})();

/* =====================================================================
   FIGURE 9.21 + 9.22: collecting a gas over water, and the vapor pressure
   of water. The apparatus on the left, the trapped gas drawn as argon
   atoms and water molecules in proportion to their partial pressures;
   the vapor-pressure curve on the right through the points of Table 9.2.
   Still: the scene and the graph answer their sliders. Axes fixed: T 0
   to 100 °C, vapor pressure 0 to 800 torr.
===================================================================== */
(function () {
  const d = sim('sim-over-water', 600);
  const Tc = ctl(d.controls, { label: '\\kT', cls: 'temperature', min: 0, max: 90, step: 1, value: 26, unit: '°C', dec: 0, aria: 'temperature of the water in degrees Celsius' });
  const Pt = ctl(d.controls, { label: '\\kP_{\\text{T}}', cls: 'pressure', min: 700, max: 800, step: 1, value: 750, unit: 'torr', dec: 0, aria: 'total pressure, read on a barometer, in torr' });
  /* Table 9.2 from 0 °C up; between two rows the logarithm of the pressure is taken as linear */
  const TAB = [[0, 4.6], [2, 5.3], [4, 6.1], [6, 7.0], [8, 8.0], [10, 9.2], [12, 10.5], [14, 12.0], [16, 13.6], [18, 15.5], [19, 16.5], [20, 17.5], [21, 18.7], [22, 19.8], [23, 21.1], [24, 22.4], [25, 23.8], [26, 25.2], [27, 26.7], [28, 28.3], [29, 30.0], [30, 31.8], [35, 42.2], [40, 55.3], [50, 92.5], [60, 149.4], [70, 233.7], [80, 355.1], [90, 525.8], [95, 633.9], [99, 733.2], [100, 760.0]];
  const vp = (t) => { for (let i = 1; i < TAB.length; i++) if (t <= TAB[i][0]) { const [t0, p0] = TAB[i - 1], [t1, p1] = TAB[i]; return Math.exp(Math.log(p0) + ((t - t0) / (t1 - t0)) * (Math.log(p1) - Math.log(p0))); } return 760; };
  /* fixed places for the molecules of the trapped gas, inside the collection flask */
  const SPOTS = []; for (let r = 0; r < 4; r++) for (let c = 0; c < 5; c++) SPOTS.push([448 + c * 28 + (r % 2) * 12 + ((c * 7 + r * 3) % 5) - 2, 196 + r * 34 + ((c * 5 + r) % 4) * 3]);
  const hits = []; F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c);
    hits.length = 0;
    const t = Tc.v, PT = Pt.v, pw = vp(t), par = PT - pw, cp = C('pressure'), ct = C('temperature');
    const water = alpha(PAL.muted, 0.22), LEVEL = 380, rf = F.ref('reaction-flask'), cf = F.ref('collection-flask');
    /* the generating flask */
    ctx.save(); ctx.strokeStyle = rf; ctx.lineWidth = 3; ctx.fillStyle = water;
    ctx.beginPath(); ctx.moveTo(115, 200); ctx.lineTo(115, 300); ctx.lineTo(50, 520); ctx.lineTo(230, 520); ctx.lineTo(165, 300); ctx.lineTo(165, 200); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(95, 420); ctx.lineTo(200, 420); ctx.lineTo(230, 520); ctx.lineTo(50, 520); ctx.closePath(); ctx.fill();
    ctx.fillStyle = PAL.muted; ctx.fillRect(108, 186, 64, 22);
    /* the delivery tube: up from the stopper, across, down into the pan and up into the collection flask */
    ctx.strokeStyle = PAL.ink; ctx.lineWidth = 5; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(140, 190); ctx.lineTo(140, 150); ctx.lineTo(330, 150); ctx.lineTo(330, 520); ctx.lineTo(500, 520); ctx.lineTo(500, 400); ctx.stroke();
    /* the pan of water */
    ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.fillStyle = water; ctx.fillRect(280, LEVEL, 330, 170); ctx.beginPath(); ctx.moveTo(280, 330); ctx.lineTo(280, 550); ctx.lineTo(610, 550); ctx.lineTo(610, 330); ctx.stroke();
    /* the inverted collection flask, its mouth under water, the level inside the same as outside */
    ctx.fillStyle = water; ctx.fillRect(425, LEVEL, 150, 60);
    ctx.fillStyle = PAL.panel; ctx.globalAlpha = 0.6; ctx.fillRect(427, 172, 146, LEVEL - 172); ctx.globalAlpha = 1;
    ctx.strokeStyle = cf; ctx.beginPath(); ctx.moveTo(425, 440); ctx.lineTo(425, 200); ctx.quadraticCurveTo(425, 170, 455, 170); ctx.lineTo(545, 170); ctx.quadraticCurveTo(575, 170, 575, 200); ctx.lineTo(575, 440); ctx.stroke();
    ctx.restore();
    line(ctx, 262, LEVEL, 628, LEVEL, alpha(PAL.ink, 0.4), 2, [10, 10]);
    for (const [bx, by] of [[130, 470], [150, 445], [112, 492], [500, 450], [496, 420]]) dot(ctx, bx, by, PAL.ink, false, 5);
    /* the trapped gas: argon and water vapor in the ratio of their partial pressures */
    const nw = Math.max(1, Math.round((SPOTS.length * pw) / PT));
    SPOTS.forEach(([x, y], i) => {
      const f = (i * 7) % SPOTS.length < nw ? 'H₂O' : 'Ar';
      const reach = molecule(ctx, f, x, y, 0.95, (i * 1.3) % TAU);
      hits.push({ x, y, r: reach + 3, name: f === 'Ar' ? 'an argon atom, Ar' : 'a water molecule, H₂O, in the vapor' });
    });
    text(ctx, 'reaction producing gas', 140, 548, rf, { size: 18, align: 'center' });
    text(ctx, 'collection flask', 500, 150, cf, { size: 18, align: 'center' });
    text(ctx, 'levels equal', 416, LEVEL - 14, PAL.muted, { size: 16, align: 'right' });
    /* the vapor pressure of water against temperature */
    const box = { l: 800, r: 1320, t: 130, b: 500 };
    const { X, Y } = axes(ctx, box, [0, 100], [0, 800], { xl: 'T (°C)', xc: ct, yl: 'vapor pressure of water (torr)', yc: cp, nx: 5, ny: 4 });
    F.curve(ctx, vp, 0, 100, X, Y, cp, 5, 120);
    line(ctx, box.l, Y(PT), box.r, Y(PT), cp, 3, [10, 10]);
    text(ctx, 'total, ' + PT + ' torr', box.l + 10, Y(PT) + 22, cp, { size: 16 });
    dot(ctx, X(100), Y(760), PAL.muted, true, 6); hits.push({ x: X(100), y: Y(760), r: 12, name: 'the vapor pressure of water at 100 °C, 760 torr' });
    line(ctx, X(t), box.b, X(t), Y(pw), alpha(PAL.ink, 0.4), 2, [4, 8]);
    pinned(ctx, box, X, Y, t, pw, cp);
    vbracket(ctx, X(t) + 14, Y(PT), Y(pw), cp, 'argon, ' + fmt(par, 0) + ' torr', 1, { size: 18 });
    topline(ctx, 'At ' + t + ' °C the trapped gas is ' + fmt(par, 0) + ' torr of argon and ' + fmt(pw, 1) + ' torr of water vapor, ' + PT + ' torr in all.');
    readout(d.readout, `\\kP_{\\text{Ar}} = \\kP_{\\text{T}} - \\kP_{\\text{H}_2\\text{O}} = ${hue('pressure', PT + '\\ \\text{torr}')} - ${hue('pressure', fmt(pw, 1) + '\\ \\text{torr}')} = ${hue('pressure', fmt(par, 0) + '\\ \\text{torr}')}`,
      'The vapor pressure depends on the temperature of the water alone, so the warmer the water, the larger the share of the trapped gas that is water vapor and the less of the total that belongs to the argon.');
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 9.23: combining volumes. One balloon per coefficient, each
   holding the same volume and so the same number of molecules, drawn as
   one. Still. Built both ways behind a view choice (book rule: a molecule
   inset in a flat figure); balloons have no ground, so the orbit is free.
===================================================================== */
(function () {
  const d = sim('sim-combining-volumes', 470);
  const RX = {
    nh3: { label: 'N₂ + 3H₂ → 2NH₃', left: [['N₂', 1], ['H₂', 3]], right: [['NH₃', 2]] },
    no2: { label: '2NO + O₂ → 2NO₂', left: [['NO', 2], ['O₂', 1]], right: [['NO₂', 2]] },
    hcl: { label: 'H₂ + Cl₂ → 2HCl', left: [['H₂', 1], ['Cl₂', 1]], right: [['HCl', 2]] },
  };
  const VIEW = F.choice(d.controls, { label: '\\text{view}', options: [{ value: '2d', label: '2D' }, { value: '3d', label: '3D' }], value: '2d', aria: 'a flat drawing or a scene to turn', onInput: show });
  const Rc = F.choice(d.controls, { label: '\\text{reaction}', options: Object.keys(RX).map((k) => ({ value: k, label: RX[k].label })), value: 'nh3', aria: 'the reaction of gases' });
  const Vc = ctl(d.controls, { label: '\\kV', cls: 'volume', min: 0.25, max: 3, step: 0.05, value: 1, unit: 'L', dec: 2, aria: 'volume of one balloon in liters', specials: [{ at: 1, label: '1 L' }] });
  const hits = []; F.hover(d.stage, () => hits);
  /* the row of balloons and signs for a reaction, in order */
  const row = (k) => { const out = []; const side = (list) => list.forEach(([f, n], j) => { if (j) out.push('+'); for (let i = 0; i < n; i++) out.push(f); }); side(RX[k].left); out.push('→'); side(RX[k].right); return out; };
  const coef = (k) => [...RX[k].left, ...RX[k].right];
  function balloon(ctx, x, y, r, f) {
    const cv = C('volume');
    ctx.save(); ctx.fillStyle = alpha(cv, 0.16); ctx.strokeStyle = cv; ctx.lineWidth = 3.5; ctx.beginPath();
    ctx.moveTo(x, y + r * 1.15); ctx.bezierCurveTo(x - r * 0.9, y + r * 0.7, x - r * 1.05, y - r * 0.9, x, y - r); ctx.bezierCurveTo(x + r * 1.05, y - r * 0.9, x + r * 0.9, y + r * 0.7, x, y + r * 1.15); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x, y + r * 1.15); ctx.quadraticCurveTo(x + 12, y + r * 1.15 + 16, x, y + r * 1.15 + 30); ctx.stroke(); ctx.restore();
    const reach = molecule(ctx, f, x, y, 1.5, 0);
    hits.push({ x, y, r: reach + 3, name: molName(f) });
    hits.push({ x, y, r: r * 1.05, name: 'a balloon of ' + WORD[f] + ', ' + fmt(Vc.v, 2) + ' L' });
  }
  function drawRow(ctx, k) {
    const items = row(k), V = Vc.v, r = 56 * Math.cbrt(V), slot = 2 * r + 34, gap = 56;
    const w = items.reduce((s, it) => s + (it.length === 1 && '+→'.includes(it) ? gap : slot), 0);
    let x = 700 - w / 2; const y = 230;
    items.forEach((it) => {
      if (it === '+' || it === '→') { text(ctx, it, x + gap / 2, y, PAL.ink, { size: 34, align: 'center' }); x += gap; return; }
      balloon(ctx, x + slot / 2, y, r, it);
      text(ctx, it, x + slot / 2, y + r * 1.15 + 58, PAL.ink, { size: 22, weight: 600, align: 'center' });
      text(ctx, fmt(V, 2) + ' L', x + slot / 2, y + r * 1.15 + 84, C('volume'), { size: 17, align: 'center' });
      x += slot;
    });
  }
  function head() {
    const c = coef(Rc.value), V = Vc.v;
    const part = (list) => list.map(([f, n]) => fmt(n * V, 2) + ' L of ' + f).join(' and ');
    return part(c.slice(0, RX[Rc.value].left.length)) + ' give ' + part(c.slice(RX[Rc.value].left.length)) + ' at the same temperature and pressure.';
  }
  function draw2d() {
    const { ctx } = begin(d.c);
    hits.length = 0;
    Object.keys(RX).forEach((k) => Rc.only(ctx, k, () => drawRow(ctx, k)));
    topline(ctx, head());
  }
  let v = null, grp = null, cnv = null, sig = '';
  function mount() { v = F.view3d(d.stage, { spin: 'off', views: [{ label: 'front', yaw: 0, pitch: 0.15 }, { label: 'corner', yaw: 0.6, pitch: 0.4 }], h: 420, dist: 9 }); grp = v.part(0); cnv = strip(d, 100); }
  function build() {
    const key = [Vc.v, Rc.value, palSig()].join('|'); if (key === sig) return; sig = key;
    v.clear();
    const items = row(Rc.value), r = 0.5 * Math.cbrt(Vc.v), slot = 2 * r + 0.3, gap = 0.5;
    const w = items.reduce((s, it) => s + (it === '+' || it === '→' ? gap : slot), 0);
    let x = -w / 2; const y = 0.3;
    items.forEach((it) => {
      if (it === '+' || it === '→') { v.label(it, [x + gap / 2, y, 0], grp, 0); x += gap; return; }
      const cx = x + slot / 2;
      const skin = new T3D.Mesh(new T3D.SphereGeometry(r, 36, 24), mat3(C('volume'), { transparent: true, opacity: 0.22, depthWrite: false, side: T3D.DoubleSide })); skin.position.set(cx, y, 0); skin.renderOrder = 2; grp.add(skin);
      polyline3(grp, [[cx, y - r, 0], [cx + 0.08, y - r - 0.3, 0], [cx - 0.04, y - r - 0.6, 0]], PAL.ink);
      const m = molecule3(v, grp, it, 0.018); m.position.set(cx, y, 0);
      v.pickable(skin, 'a balloon of ' + WORD[it] + ', ' + fmt(Vc.v, 2) + ' L');
      v.label(it, [cx, y - r - 0.7, 0], grp, 0);
      x += slot;
    });
  }
  function draw3d() { build(); v.invalidate(); const { ctx } = begin(cnv); topline(ctx, head()); }
  function show() {
    const three = VIEW.value === '3d';
    if (three && !v) mount();
    d.c.style.display = three ? 'none' : '';
    if (v) [v.wrap, d.stage.querySelector('.view3d-bar'), cnv].forEach((e) => { if (e) e.style.display = three ? '' : 'none'; });
    draw();
  }
  function draw() {
    if (VIEW.value === '3d') draw3d(); else draw2d();
    const c = coef(Rc.value), V = Vc.v;
    const sym = c.map(([f]) => `\\kV_{\\text{${f.replace(/₂/g, '_2').replace(/₃/g, '_3').replace(/_(\d)/g, '}_{$1}\\text{')}}}`).join(' : ');
    readout(d.readout, `${sym} = ${c.map(([, n]) => n).join(' : ')} = ${c.map(([, n]) => hue('volume', fmt(n * V, 2) + '\\ \\text{L}')).join(' : ')}`,
      'Equal volumes of gases at the same temperature and pressure hold equal numbers of molecules, so the volumes that react and form stand in the ratio of the coefficients.');
  }
  register(d.fig, { update: () => {}, draw });
})();
};
