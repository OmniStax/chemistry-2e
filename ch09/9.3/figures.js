/* Figures for section 9.3 Stoichiometry of Gaseous Substances, Mixtures, and Reactions. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['9.3'] = function (root, F) {
const { fmt, tex, C, PAL, alpha, ctl, cycle, register, begin, line, arrow, dot, text, topline, axes, pinned, hbracket } = F;
const sim = (id, H) => F.sim(root, id, H);

const TAU = 2 * Math.PI;
const R = 0.08206;                                   /* L atm mol⁻¹ K⁻¹ */
const RTEX = '0.08206\\ \\text{L atm mol}^{-1}\\ \\text{K}^{-1}';
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;
/* each gas: its molar mass in g/mol and the atoms of one molecule as [element, dx, dy, radius] about its centre */
const MOLS = {
  'H₂': { m: 2.016, atoms: [['H', -5, 0, 5.5], ['H', 5, 0, 5.5]] },
  'Ar': { m: 39.95, atoms: [['Ar', 0, 0, 8]] },
  'N₂': { m: 28.01, atoms: [['N', -6, 0, 7], ['N', 6, 0, 7]] },
  'O₂': { m: 32.00, atoms: [['O', -6, 0, 7], ['O', 6, 0, 7]] },
  'Cl₂': { m: 70.90, atoms: [['Cl', -7, 0, 8.5], ['Cl', 7, 0, 8.5]] },
  'CH₄': { m: 16.04, atoms: [['H', -9, -8, 5], ['H', 9, -8, 5], ['H', -9, 8, 5], ['H', 9, 8, 5], ['C', 0, 0, 7]] },
  'NH₃': { m: 17.03, atoms: [['H', -9, 5, 5], ['H', 9, 5, 5], ['H', 0, -10, 5], ['N', 0, 0, 7]] },
  'H₂O': { m: 18.02, atoms: [['H', -8, 6, 5], ['H', 8, 6, 5], ['O', 0, 0, 7]] },
  'CO₂': { m: 44.01, atoms: [['O', -13, 0, 7], ['O', 13, 0, 7], ['C', 0, 0, 6.5]] },
  'NO': { m: 30.01, atoms: [['N', -6, 0, 7], ['O', 6, 0, 7]] },
  'NO₂': { m: 46.01, atoms: [['O', -11, 5, 7], ['O', 11, 5, 7], ['N', 0, -2, 7]] },
  'HCl': { m: 36.46, atoms: [['H', -8, 0, 5.5], ['Cl', 5, 0, 8.5]] },
  'CF₂Cl₂': { m: 120.91, atoms: [['F', -10, -9, 6], ['F', 10, -9, 6], ['Cl', -11, 9, 8], ['Cl', 11, 9, 8], ['C', 0, 0, 7]] },
};
const WORD = { 'H₂': 'hydrogen', 'Ar': 'argon', 'N₂': 'nitrogen', 'O₂': 'oxygen', 'Cl₂': 'chlorine', 'CH₄': 'methane', 'NH₃': 'ammonia', 'H₂O': 'water', 'CO₂': 'carbon dioxide', 'NO': 'nitrogen monoxide', 'NO₂': 'nitrogen dioxide', 'HCl': 'hydrogen chloride', 'CF₂Cl₂': 'Freon 12' };
const molName = (f) => (MOLS[f].atoms.length === 1 ? 'an atom of ' : 'a molecule of ') + WORD[f] + ', ' + f;
/* one molecule of the gas f centred on (x, y), scaled by k and turned by a. Hydrogen is a light disc, so it takes a full ink
   outline and reads on a light page; the other atoms take a faint one. Returns the molecule's reach from its centre. */
function molecule(ctx, f, x, y, k = 1, a = 0) {
  const c = Math.cos(a), s = Math.sin(a); let reach = 0;
  for (const [elm, dx, dy, rr] of MOLS[f].atoms) {
    const px = x + (dx * c - dy * s) * k, py = y + (dx * s + dy * c) * k;
    ctx.save(); ctx.fillStyle = F.el(elm); ctx.strokeStyle = elm === 'H' ? PAL.ink : alpha(PAL.ink, 0.4); ctx.lineWidth = elm === 'H' ? 1.6 : 1; ctx.beginPath(); ctx.arc(px, py, rr * k, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore();
    reach = Math.max(reach, Math.hypot(dx, dy) * k + rr * k);
  }
  return reach;
}

/* =====================================================================
   SIM: the density of a gas against its molar mass. At one pressure and
   temperature every gas sits on the line d = ℳP/RT through the origin.
   Still: the line and the chosen gas answer their sliders. Axes fixed:
   ℳ 0 to 130 g/mol, d 0 to 15 g/L (the steepest line, 2 atm and 200 K,
   gives Freon 12 about 14.7 g/L). Six gases, each named beside its point.
===================================================================== */
(function () {
  const d = sim('sim-gas-density', 590);
  const GASES = ['H₂', 'CH₄', 'N₂', 'CO₂', 'Cl₂', 'CF₂Cl₂'];
  const G = F.select(d.controls, { label: '\\text{gas}', aria: 'the gas whose density is read', options: GASES.map((n) => ({ value: n, label: n })), value: 'N₂' });
  const P = ctl(d.controls, { label: '\\kP', cls: 'pressure', min: 0.5, max: 2, step: 0.01, value: 1, unit: 'atm', dec: 2, aria: 'pressure in atmospheres', specials: [{ at: 1, label: '1 atm' }] });
  const T = ctl(d.controls, { label: '\\kT', cls: 'temperature', min: 200, max: 600, step: 1, value: 273, unit: 'K', dec: 0, aria: 'temperature in kelvin', specials: [{ at: 273, label: '273 K' }] });
  const hits = []; F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c);
    hits.length = 0;
    const p = P.v, t = T.v, slope = p / (R * t), cm = C('mass'), cd = C('density');
    const box = { l: 150, r: 1300, t: 180, b: 500 };
    const { X, Y } = axes(ctx, box, [0, 130], [0, 15], { xl: 'ℳ (g/mol)', xc: cm, yl: 'd (g/L)', yc: cd, nx: 13, ny: 3 });
    ctx.save(); ctx.beginPath(); ctx.rect(box.l, box.t, box.r - box.l, box.b - box.t); ctx.clip();
    line(ctx, X(0), Y(0), X(130), Y(130 * slope), cd, 4);
    ctx.restore();
    const sel = G.value, dOf = (f) => MOLS[f].m * slope, dTxt = (v) => fmt(v, v < 1 ? 3 : 2) + ' g/L';
    GASES.forEach((f) => {
      const m = MOLS[f].m, on = f === sel, q = pinned(ctx, box, X, Y, m, m * slope, on ? cd : alpha(PAL.ink, 0.45));
      const k = on ? 1.15 : 0.85, my = q.y - 30;
      const reach = molecule(ctx, f, q.x, my, k, 0);
      hits.push({ x: q.x, y: my, r: reach + 4, name: molName(f) + ', ' + fmt(m, 2) + ' g/mol' });
      const top = my - Math.max(...MOLS[f].atoms.map(([, , dy, rr]) => rr - dy)) * k - 16;
      if (!on) { text(ctx, f, q.x, top, PAL.ink, { size: 18, align: 'center' }); return; }
      text(ctx, f, q.x, top - 1, PAL.ink, { size: 20, weight: 600, align: 'center' });
      text(ctx, dTxt(dOf(f)), Math.max(q.x, box.l + 50), top - 26, cd, { size: 20, weight: 600, align: 'center' });
    });
    topline(ctx, 'At ' + fmt(p, 2) + ' atm and ' + t + ' K one liter of any gas holds ' + fmt(slope, 4) + ' mol.');
    const m = MOLS[sel].m;
    tex(d.readout, `${hue('density', 'd')} = \\frac{\\kMM\\kP}{R\\kT} = \\frac{(${hue('mass', fmt(m, 2) + '\\ \\text{g/mol}')})(${hue('pressure', fmt(p, 2) + '\\ \\text{atm}')})}{(${RTEX})(${hue('temperature', t + '\\ \\text{K}')})} = ${hue('density', dTxt(dOf(sel)).replace(' g/L', '\\ \\text{g/L}'))}`);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 9.20: Dalton's cylinders, flat. Three equal cylinders hold gas A,
   gas B and gas C alone (the text's names; the book names no substances
   here) and a fourth of the same size holds all three. A particle of the
   mixture is the twin of one in its own cylinder: it is drawn from the
   same position and velocity, so each gas moves, and presses, in the
   mixture exactly as it does alone. Moving: the particles travel and
   strike the walls, so the figure runs continuously with the transport.
   One particle per 25 kPa. Gauges and the bar share one fixed scale,
   0 to 3000 kPa, past the 2700 kPa the three sliders can add to.
===================================================================== */
(function () {
  const d = sim('sim-dalton', 640);
  const ID = ['gas-a', 'gas-b', 'gas-c'], LET = ['A', 'B', 'C'], SYM = ['\\kPA', '\\kPB', '\\kPC'];
  const Ps = [300, 600, 450].map((val, i) => ctl(d.controls, { label: SYM[i], cls: 'pressure', min: 0, max: 900, step: 50, value: val, unit: 'kPa', dec: 0, aria: 'pressure of gas ' + LET[i] + ' alone, in kilopascals' }));
  /* a cylinder's body in its own coordinates: BW wide and BH tall, shoulders of radius RS, a foot of radius RF */
  const BW = 210, BH = 290, RS = 52, RF = 16, RP = 6, TOP = 142, XS = [115, 370, 625, 1075], MAXP = 3000;
  const CORNERS = [[RS, RS, RS], [BW - RS, RS, RS], [RF, BH - RF, RF], [BW - RF, BH - RF, RF]];
  const gas = [[], [], []];
  const spawn = () => {
    for (;;) {
      const x = RP + Math.random() * (BW - 2 * RP), y = RP + Math.random() * (BH - 2 * RP);
      if (CORNERS.every(([cx, cy, r]) => !((x < cx) === (cx < BW / 2) && (y < cy) === (cy < BH / 2)) || Math.hypot(x - cx, y - cy) < r - RP)) { const a = Math.random() * TAU; return { x, y, vx: Math.cos(a), vy: Math.sin(a) }; }
    }
  };
  const sync = () => Ps.forEach((s, i) => { const n = Math.round(s.v / 25); while (gas[i].length < n) gas[i].push(spawn()); gas[i].length = n; });
  sync();
  const SPEED = 95;
  function step(dt) {
    for (const list of gas) for (const q of list) {
      q.x += q.vx * SPEED * dt; q.y += q.vy * SPEED * dt;
      if (q.x < RP) { q.x = RP; q.vx = Math.abs(q.vx); } else if (q.x > BW - RP) { q.x = BW - RP; q.vx = -Math.abs(q.vx); }
      if (q.y < RP) { q.y = RP; q.vy = Math.abs(q.vy); } else if (q.y > BH - RP) { q.y = BH - RP; q.vy = -Math.abs(q.vy); }
      for (const [cx, cy, r] of CORNERS) {
        if ((q.x < cx) !== (cx < BW / 2) || (q.y < cy) !== (cy < BH / 2)) continue;
        const dx = q.x - cx, dy = q.y - cy, dist = Math.hypot(dx, dy); if (dist <= r - RP) continue;
        const nx = dx / dist, ny = dy / dist, dn = q.vx * nx + q.vy * ny;
        q.x = cx + nx * (r - RP); q.y = cy + ny * (r - RP); if (dn > 0) { q.vx -= 2 * dn * nx; q.vy -= 2 * dn * ny; }
      }
    }
  }
  const cy = cycle(() => Infinity, 0);
  const hits = []; F.hover(d.stage, () => hits);
  function body(ctx, x) {
    ctx.beginPath(); ctx.moveTo(x + RS, TOP); ctx.arcTo(x + BW, TOP, x + BW, TOP + BH, RS); ctx.arcTo(x + BW, TOP + BH, x, TOP + BH, RF); ctx.arcTo(x, TOP + BH, x, TOP, RF); ctx.arcTo(x, TOP, x + BW, TOP, RS); ctx.closePath();
  }
  /* the gauge on a cylinder's top: a dial on a stem, 0 at lower left round to 3000 kPa at lower right */
  function gauge(ctx, cx, kpa, who) {
    const cp = C('pressure'), gy = 62, r = 34, ang = (v) => (0.75 + 1.5 * (v / MAXP)) * Math.PI;
    ctx.save();
    ctx.fillStyle = PAL.muted; ctx.fillRect(cx - 5, gy + r - 2, 10, TOP - 22 - (gy + r) + 4);
    ctx.fillStyle = PAL.panel; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.beginPath(); ctx.rect(cx - 30, TOP - 22, 60, 22); ctx.fill(); ctx.stroke();
    ctx.strokeStyle = cp; ctx.lineWidth = 3.5; ctx.beginPath(); ctx.arc(cx, gy, r, 0, TAU); ctx.fill(); ctx.stroke();
    ctx.lineWidth = 2; ctx.beginPath(); for (let v = 0; v <= MAXP; v += 500) { const a = ang(v); ctx.moveTo(cx + Math.cos(a) * (r - 9), gy + Math.sin(a) * (r - 9)); ctx.lineTo(cx + Math.cos(a) * (r - 3), gy + Math.sin(a) * (r - 3)); } ctx.stroke();
    const a = ang(kpa); ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(cx - Math.cos(a) * 6, gy - Math.sin(a) * 6); ctx.lineTo(cx + Math.cos(a) * (r - 11), gy + Math.sin(a) * (r - 11)); ctx.stroke();
    ctx.fillStyle = cp; ctx.beginPath(); ctx.arc(cx, gy, 4.5, 0, TAU); ctx.fill();
    ctx.restore();
    text(ctx, kpa + ' kPa', cx + r + 12, gy, cp, { size: 22, weight: 600 });
    hits.push({ x: cx, y: gy, r, name: 'the gauge on the cylinder of ' + who + ', reading ' + kpa + ' kPa on a dial that runs to 3000 kPa' });
  }
  function draw() {
    sync();
    const { ctx } = begin(d.c);
    hits.length = 0;
    const p = Ps.map((s) => s.v), tot = p[0] + p[1] + p[2], cp = C('pressure'), col = ID.map((id) => F.ref(id));
    XS.forEach((x, c) => {
      ctx.save(); body(ctx, x); ctx.fillStyle = c < 3 ? alpha(col[c], 0.07) : PAL.panel; ctx.fill(); ctx.restore();
      ctx.save(); body(ctx, x); ctx.clip();
      (c < 3 ? [c] : [0, 1, 2]).forEach((i) => { ctx.fillStyle = col[i]; gas[i].forEach((q) => { ctx.beginPath(); ctx.arc(x + q.x, TOP + q.y, RP, 0, TAU); ctx.fill(); }); });
      ctx.restore();
      ctx.save(); body(ctx, x); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.stroke(); ctx.restore();
      gauge(ctx, x + BW / 2, c < 3 ? p[c] : tot, c < 3 ? 'gas ' + LET[c] : 'the mixture');
      const ny = TOP + BH + 30;
      if (c < 3) F.rich(ctx, [['gas ' + LET[c], col[c]], ' alone'], x + BW / 2, ny, { size: 20, align: 'center' });
      else F.rich(ctx, [['A', col[0]], ', ', ['B', col[1]], ' and ', ['C', col[2]], ' together'], x + BW / 2, ny, { size: 20, align: 'center' });
      hits.push({ x: x + BW / 2, y: TOP + BH / 2, r: BW / 2, name: c < 3 ? Math.round(p[c] / 25) + ' particles of gas ' + LET[c] + ', one for each 25 kPa' : Math.round(tot / 25) + ' particles: every particle of gas A, gas B and gas C' });
    });
    const ax = XS[2] + BW + 28, bx = XS[3] - 28, ay = TOP + BH / 2;
    arrow(ctx, ax, ay, bx, ay, PAL.ink, 4);
    text(ctx, 'combined in a', (ax + bx) / 2, ay - 44, PAL.ink, { size: 18, align: 'center' });
    text(ctx, 'same-size cylinder', (ax + bx) / 2, ay - 20, PAL.ink, { size: 18, align: 'center' });
    /* the three pressures laid end to end on the gauges' scale */
    const x0 = XS[0], x1 = XS[3] + BW, X = (kpa) => x0 + ((x1 - x0) * kpa) / MAXP, by = 548, bh = 30;
    for (let k = 0; k <= 6; k++) { const xv = X(k * 500); line(ctx, xv, by - bh / 2 - 8, xv, by + bh / 2 + 8, PAL.rule, 1.5); text(ctx, String(k * 500), xv, by + bh / 2 + 26, PAL.muted, { size: 17, align: 'center' }); }
    text(ctx, 'pressure (kPa)', x1, by + bh / 2 + 58, cp, { size: 20, weight: 600, align: 'right' });
    let acc = 0;
    p.forEach((v, i) => {
      if (!v) return;
      ctx.save(); ctx.fillStyle = col[i]; ctx.fillRect(X(acc), by - bh / 2, X(acc + v) - X(acc), bh); ctx.restore();
      if (X(acc + v) - X(acc) > 34) text(ctx, LET[i], (X(acc) + X(acc + v)) / 2, by, PAL.panel, { size: 18, weight: 600, align: 'center' });
      hits.push({ x: (X(acc) + X(acc + v)) / 2, y: by, r: Math.max(bh / 2, (X(acc + v) - X(acc)) / 2), name: 'gas ' + LET[i] + '’s share of the pressure in the mixture, ' + v + ' kPa' });
      acc += v;
    });
    text(ctx, tot + ' kPa', X(tot) + 12, by, cp, { size: 20, weight: 600 });
    tex(d.readout, `\\kPtot = \\kPA + \\kPB + \\kPC = ${p.map((v) => hue('pressure', v + '\\ \\text{kPa}')).join(' + ')} = ${hue('pressure', tot + '\\ \\text{kPa}')}`);
  }
  register(d.fig, { update: (dt) => { cy.step(dt, () => 1); step(dt); }, draw });
})();

/* =====================================================================
   FIGURE 9.21 + 9.22: collecting a gas over water, and the vapor pressure
   of water. Left, the apparatus in section: a stoppered reaction flask, a
   delivery tube from the gas space above its liquid to the mouth of an
   inverted collection flask standing in a pan, the water at one level
   inside and out. The trapped gas is drawn as 24 molecules, water's share
   of them its share of the pressure. Right, the vapor-pressure curve
   through the points of Table 9.2 and, on the same scale, the total split
   into water vapor and argon. The gas is argon, as in Example 9.16, whose
   26 °C and 750 torr are the opening state. Still: the reading is taken
   once the levels are equal. Axes fixed: T 0 to 100 °C, pressure 0 to
   800 torr.
===================================================================== */
(function () {
  const d = sim('sim-over-water', 620);
  const GAS = 'Ar', GTEX = '\\text{Ar}';
  const Tc = ctl(d.controls, { label: '\\kT', cls: 'temperature', min: 0, max: 90, step: 1, value: 26, unit: '°C', dec: 0, aria: 'temperature of the water in degrees Celsius' });
  const Pt = ctl(d.controls, { label: '\\kP_{\\text{T}}', cls: 'pressure', min: 700, max: 800, step: 1, value: 750, unit: 'torr', dec: 0, aria: 'total pressure, read on a barometer, in torr' });
  /* Table 9.2 from 0 °C up; between two rows the logarithm of the pressure is taken as linear */
  const TAB = [[0, 4.6], [2, 5.3], [4, 6.1], [6, 7.0], [8, 8.0], [10, 9.2], [12, 10.5], [14, 12.0], [16, 13.6], [18, 15.5], [19, 16.5], [20, 17.5], [21, 18.7], [22, 19.8], [23, 21.1], [24, 22.4], [25, 23.8], [26, 25.2], [27, 26.7], [28, 28.3], [29, 30.0], [30, 31.8], [35, 42.2], [40, 55.3], [50, 92.5], [60, 149.4], [70, 233.7], [80, 355.1], [90, 525.8], [95, 633.9], [99, 733.2], [100, 760.0]];
  const vp = (t) => { for (let i = 1; i < TAB.length; i++) if (t <= TAB[i][0]) { const [t0, p0] = TAB[i - 1], [t1, p1] = TAB[i]; return Math.exp(Math.log(p0) + ((t - t0) / (t1 - t0)) * (Math.log(p1) - Math.log(p0))); } return 760; };
  /* the apparatus, in canvas units */
  const FX = 140, RIM = 235, NECK = 305, BASE = 540, NW = 26, FW = 100, LIQ = 440;      /* reaction flask: centre, rim, foot of the neck, base, half widths, liquid surface */
  const PL = 300, PR = 780, PRIM = 330, PB = 560, LEVEL = 385;                          /* pan: walls, rim, base; the water's surface */
  const CX = 580, MOUTH = 490, CNECK = 430, CTOP = 200, CN = 34, CW = 118;              /* inverted collection flask: centre, mouth, top of its neck, its base (uppermost), half widths */
  const TUBE = [[FX, 350], [FX, 140], [250, 140], [420, 520], [CX, 520], [CX, 456]];    /* delivery tube: from the gas above the liquid to inside the collection flask's mouth */
  const flaskHalf = (y) => (y <= NECK ? NW : NW + ((y - NECK) / (BASE - NECK)) * (FW - NW));
  const collHalf = (y) => (y >= CNECK ? CN : CN + ((CNECK - y) / (CNECK - CTOP)) * (CW - CN));
  function flaskPath(ctx, lip) {
    ctx.beginPath();
    if (lip) ctx.moveTo(FX - NW - 6, RIM - 5); else ctx.moveTo(FX - NW, RIM);
    ctx.lineTo(FX - NW, RIM + (lip ? 2 : 0)); ctx.lineTo(FX - NW, NECK); ctx.arcTo(FX - FW, BASE, FX + FW, BASE, 18); ctx.arcTo(FX + FW, BASE, FX + NW, NECK, 18); ctx.lineTo(FX + NW, NECK); ctx.lineTo(FX + NW, RIM + (lip ? 2 : 0));
    if (lip) ctx.lineTo(FX + NW + 6, RIM - 5);
  }
  function collPath(ctx, lip) {
    ctx.beginPath();
    if (lip) ctx.moveTo(CX - CN - 6, MOUTH + 5); else ctx.moveTo(CX - CN, MOUTH);
    ctx.lineTo(CX - CN, MOUTH - (lip ? 2 : 0)); ctx.lineTo(CX - CN, CNECK); ctx.arcTo(CX - CW, CTOP, CX + CW, CTOP, 16); ctx.arcTo(CX + CW, CTOP, CX + CN, CNECK, 16); ctx.lineTo(CX + CN, CNECK); ctx.lineTo(CX + CN, MOUTH - (lip ? 2 : 0));
    if (lip) ctx.lineTo(CX + CN + 6, MOUTH + 5);
  }
  function panPath(ctx, lip) {
    ctx.beginPath();
    if (lip) ctx.moveTo(PL - 9, PRIM - 4); else ctx.moveTo(PL, PRIM);
    ctx.lineTo(PL, PRIM + (lip ? 3 : 0)); ctx.arcTo(PL, PB, PR, PB, 16); ctx.arcTo(PR, PB, PR, PRIM, 16); ctx.lineTo(PR, PRIM + (lip ? 3 : 0));
    if (lip) ctx.lineTo(PR + 9, PRIM - 4);
  }
  /* 24 fixed places for the molecules of the trapped gas, in the space above the water inside the collection flask */
  const SPOTS = [];
  [[228, 6], [258, 6], [288, 5], [318, 4], [348, 3]].forEach(([y, n], r) => { const half = collHalf(y) - 24; for (let i = 0; i < n; i++) SPOTS.push([CX - half + (2 * half * i) / (n - 1) + ((i * 7 + r * 3) % 5) - 2, y + ((i * 5 + r) % 4) * 2 - 3]); });
  const WATER_FIRST = [11, 3, 19, 6, 22, 14, 0, 9, 17, 21, 5, 12, 2, 16, 8, 23, 10, 20, 1, 15, 4, 13, 18, 7];   /* the order in which places turn to water as its share grows, spread through the space */
  const BUBBLES = [[104, 508, 4], [150, 492, 5], [126, 470, 5], [176, 514, 4], [142, 452, 6], [192, 478, 4], [84, 522, 3.5], [CX - 1, 444, 4], [CX - 8, 428, 5], [CX + 7, 411, 5.5], [CX - 3, 395, 6]];
  const hits = []; F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c);
    hits.length = 0;
    const t = Tc.v, PT = Pt.v, pw = vp(t), pg = PT - pw, cp = C('pressure'), ct = C('temperature');
    const water = alpha(PAL.muted, 0.2), glass = PAL.ink, rf = F.ref('reaction-flask'), cf = F.ref('collection-flask');
    /* liquids first: the reacting liquid in its flask, the water in the pan (and so in the lower part of the collection flask, at the same level) */
    ctx.save(); flaskPath(ctx, false); ctx.closePath(); ctx.clip(); ctx.fillStyle = alpha(PAL.muted, 0.32); ctx.fillRect(FX - FW, LIQ, 2 * FW, BASE - LIQ); ctx.restore();
    ctx.save(); panPath(ctx, false); ctx.closePath(); ctx.clip(); ctx.fillStyle = water; ctx.fillRect(PL, LEVEL, PR - PL, PB - LEVEL); ctx.restore();
    line(ctx, FX - flaskHalf(LIQ) + 2, LIQ, FX + flaskHalf(LIQ) - 2, LIQ, alpha(PAL.ink, 0.45), 1.5);
    line(ctx, PL + 2, LEVEL, PR - 2, LEVEL, alpha(PAL.ink, 0.45), 1.5);
    /* the stopper, wedged in the neck */
    ctx.save(); ctx.fillStyle = PAL.muted; ctx.beginPath(); ctx.moveTo(FX - 31, 206); ctx.lineTo(FX + 31, 206); ctx.lineTo(FX + 23, 270); ctx.lineTo(FX - 23, 270); ctx.closePath(); ctx.fill(); ctx.restore();
    /* glass: the two flasks and the pan */
    ctx.save(); ctx.lineWidth = 3; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    ctx.strokeStyle = rf; flaskPath(ctx, true); ctx.stroke();
    ctx.strokeStyle = glass; panPath(ctx, true); ctx.stroke();
    /* the delivery tube: a wall of ink round a bore the colour of the page, since the tube holds gas along its whole length */
    const tube = () => { ctx.beginPath(); TUBE.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); };
    ctx.lineCap = 'butt'; ctx.strokeStyle = glass; ctx.lineWidth = 11; tube(); ctx.stroke();
    ctx.strokeStyle = PAL.panel; ctx.lineWidth = 5.5; ctx.beginPath(); ctx.moveTo(TUBE[0][0], TUBE[0][1] + 2); TUBE.slice(1, -1).forEach(([x, y]) => ctx.lineTo(x, y)); ctx.lineTo(TUBE[5][0], TUBE[5][1] - 2); ctx.stroke();
    ctx.lineCap = 'round'; ctx.lineWidth = 3; ctx.strokeStyle = cf; collPath(ctx, true); ctx.stroke();
    ctx.restore();
    /* bubbles: up through the reacting liquid, and from the tube's outlet up to the gas in the collection flask */
    BUBBLES.forEach(([bx, by, br]) => { ctx.save(); ctx.fillStyle = PAL.panel; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(bx, by, br, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore(); hits.push({ x: bx, y: by, r: br + 5, name: 'a bubble of argon' }); });
    /* the trapped gas: argon and water vapor in the ratio of their partial pressures */
    const nw = Math.max(1, Math.round((SPOTS.length * pw) / PT)), wet = new Set(WATER_FIRST.slice(0, nw));
    SPOTS.forEach(([x, y], i) => {
      const f = wet.has(i) ? 'H₂O' : GAS;
      const reach = molecule(ctx, f, x, y, f === GAS ? 0.9 : 0.82, (i * 1.3) % TAU);
      hits.push({ x, y, r: reach + 3, name: f === GAS ? 'an argon atom, Ar' : 'a water molecule, H₂O, in the vapor' });
    });
    /* the air on the open water: with the levels equal, the trapped gas is at this pressure too */
    arrow(ctx, 400, 292, 400, LEVEL - 5, cp, 4);
    F.rich(ctx, ['air, ', [PT + ' torr', cp]], 400, 266, { size: 18, align: 'center' });
    text(ctx, 'levels equal', 712, LEVEL - 22, PAL.ink, { size: 17, align: 'center' });
    text(ctx, 'water', 700, 528, PAL.ink, { size: 17, align: 'center' });
    text(ctx, 'reaction producing gas', FX, BASE + 32, rf, { size: 18, align: 'center', weight: 600 });
    text(ctx, 'collection flask', CX, CTOP - 24, cf, { size: 18, align: 'center', weight: 600 });
    hits.push({ x: FX, y: 238, r: 32, name: 'the stopper, with the delivery tube through it' });
    [[PR, 450], [PL, 450], [540, PB], [700, PB]].forEach(([x, y]) => hits.push({ x, y, r: 16, name: 'the pan of water, open to the air' }));
    for (let i = 1; i < TUBE.length; i++) { const [x0, y0] = TUBE[i - 1], [x1, y1] = TUBE[i], n = Math.ceil(Math.hypot(x1 - x0, y1 - y0) / 24); for (let k = 0; k <= n; k++) hits.push({ x: x0 + ((x1 - x0) * k) / n, y: y0 + ((y1 - y0) * k) / n, r: 13, name: 'the delivery tube, open to the gas above the liquid at one end and under the collection flask at the other' }); }
    /* the vapor pressure of water against temperature, and the total split in two beside it */
    const box = { l: 865, r: 1150, t: 130, b: 500 };
    const { X, Y } = axes(ctx, box, [0, 100], [0, 800], { xl: 'T (°C)', xc: ct, yl: 'pressure (torr)', yc: cp, nx: 5, ny: 4 });
    F.curve(ctx, vp, 0, 100, X, Y, cp, 5, 120);
    text(ctx, 'vapor pressure', box.l + 14, Y(650), cp, { size: 17 });
    text(ctx, 'of water', box.l + 14, Y(650) + 22, cp, { size: 17 });
    dot(ctx, X(100), Y(760), PAL.muted, true, 6); hits.push({ x: X(100), y: Y(760), r: 12, name: 'the vapor pressure of water at 100 °C, 760 torr' });
    const bl = box.r + 26, br = box.r + 56, lx = br + 12;
    line(ctx, box.l, Y(PT), br, Y(PT), cp, 3, [10, 10]);
    line(ctx, X(t), box.b, X(t), Y(pw), alpha(PAL.ink, 0.4), 2, [4, 8]);
    line(ctx, X(t), Y(pw), bl, Y(pw), alpha(PAL.ink, 0.4), 2, [4, 8]);
    ctx.save(); ctx.fillStyle = alpha(cp, 0.4); ctx.fillRect(bl, Y(pw), br - bl, Y(0) - Y(pw)); ctx.fillStyle = cp; ctx.fillRect(bl, Y(PT), br - bl, Y(pw) - Y(PT)); ctx.restore();
    pinned(ctx, box, X, Y, t, pw, cp);
    const part = (f, name, v, dec, y) => {
      molecule(ctx, f, lx + 13, y - 11, 0.75, 0);
      text(ctx, name, lx + 32, y - 11, PAL.ink, { size: 16 });
      text(ctx, fmt(v, dec) + ' torr', lx, y + 11, cp, { size: 17, weight: 600 });
    };
    part(GAS, 'argon', pg, 0, (Y(PT) + Y(pw)) / 2);
    part('H₂O', 'water vapor', pw, 1, (Y(pw) + Y(0)) / 2);
    F.rich(ctx, ['total ', [PT + ' torr', cp]], box.r + 14, Y(PT) - 18, { size: 17 });
    hits.push({ x: (bl + br) / 2, y: (Y(PT) + Y(pw)) / 2, r: 24, name: 'the pressure of the argon alone, ' + fmt(pg, 0) + ' torr' }, { x: (bl + br) / 2, y: (Y(pw) + Y(0)) / 2, r: 24, name: 'the pressure of the water vapor, ' + fmt(pw, 1) + ' torr' });
    topline(ctx, 'At ' + t + ' °C water vapor is ' + fmt((100 * pw) / PT, 1) + '% of the gas trapped above the water.');
    tex(d.readout, `\\kP_{${GTEX}} = \\kP_{\\text{T}} - \\kP_{\\text{H}_2\\text{O}} = ${hue('pressure', PT + '\\ \\text{torr}')} - ${hue('pressure', fmt(pw, 1) + '\\ \\text{torr}')} = ${hue('pressure', fmt(pg, 0) + '\\ \\text{torr}')}`);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 9.23: combining volumes. One balloon per coefficient, each
   holding the same volume and so the same number of molecules, drawn as
   one. A bracket under each substance's balloons carries its formula and
   its whole volume. Still, flat: a balloon with one molecule in it shows
   nothing more when turned.
===================================================================== */
(function () {
  const d = sim('sim-combining-volumes', 420);
  const RX = {
    nh3: { label: 'N₂ + 3H₂ → 2NH₃', left: [['N₂', 1], ['H₂', 3]], right: [['NH₃', 2]] },
    no2: { label: '2NO + O₂ → 2NO₂', left: [['NO', 2], ['O₂', 1]], right: [['NO₂', 2]] },
    hcl: { label: 'H₂ + Cl₂ → 2HCl', left: [['H₂', 1], ['Cl₂', 1]], right: [['HCl', 2]] },
  };
  const Rc = F.select(d.controls, { label: '\\text{reaction}', options: Object.keys(RX).map((k) => ({ value: k, label: RX[k].label })), value: 'nh3', aria: 'the reaction of gases' });
  const Vc = ctl(d.controls, { label: '\\kV', cls: 'volume', min: 0.25, max: 3, step: 0.05, value: 1, unit: 'L', dec: 2, aria: 'volume of one balloon in liters', specials: [{ at: 1, label: '1 L' }] });
  const hits = []; F.hover(d.stage, () => hits);
  const coef = (k) => [...RX[k].left, ...RX[k].right];
  function balloon(ctx, x, y, r, f) {
    const cv = C('volume');
    ctx.save(); ctx.fillStyle = alpha(cv, 0.26); ctx.strokeStyle = cv; ctx.lineWidth = 3.5; ctx.beginPath();
    ctx.moveTo(x, y + r * 1.15); ctx.bezierCurveTo(x - r * 0.9, y + r * 0.7, x - r * 1.05, y - r * 0.9, x, y - r); ctx.bezierCurveTo(x + r * 1.05, y - r * 0.9, x + r * 0.9, y + r * 0.7, x, y + r * 1.15); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.strokeStyle = alpha(PAL.ink, 0.6); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y + r * 1.15); ctx.quadraticCurveTo(x + 10, y + r * 1.15 + 12, x, y + r * 1.15 + 24); ctx.stroke(); ctx.restore();
    const reach = molecule(ctx, f, x, y - r * 0.05, 1.8 * Math.min(1, r / 56), 0);
    hits.push({ x, y: y - r * 0.05, r: reach + 3, name: molName(f) });
    hits.push({ x, y, r: r * 1.05, name: 'a balloon of ' + WORD[f] + ', ' + fmt(Vc.v, 2) + ' L' });
  }
  /* the balloons of one reaction: a group per substance, plus signs between the groups of a side and the arrow between the sides */
  function drawRow(ctx, k) {
    const V = Vc.v, r = 56 * Math.cbrt(V), slot = 2 * r + 34, gap = 56, cv = C('volume'), y = 150, GY = 300;
    const groups = coef(k), nl = RX[k].left.length;
    let x = 700 - (groups.reduce((s, [, n]) => s + n * slot, 0) + (groups.length - 1) * gap) / 2;
    groups.forEach(([f, n], g) => {
      if (g) { text(ctx, g === nl ? '→' : '+', x + gap / 2, y, PAL.ink, { size: 34, align: 'center' }); x += gap; }
      for (let i = 0; i < n; i++) balloon(ctx, x + slot * (i + 0.5), y, r, f);
      const mid = x + (n * slot) / 2;
      hbracket(ctx, x + 14, x + n * slot - 14, GY, alpha(PAL.ink, 0.5));
      text(ctx, f, mid, GY + 32, PAL.ink, { size: 22, weight: 600, align: 'center' });
      text(ctx, fmt(n * V, 2) + ' L', mid, GY + 62, cv, { size: 20, weight: 600, align: 'center' });
      x += n * slot;
    });
  }
  function draw() {
    const { ctx } = begin(d.c);
    hits.length = 0;
    Object.keys(RX).forEach((k) => Rc.only(ctx, k, () => drawRow(ctx, k)));
    const c = coef(Rc.value), V = Vc.v;
    const sym = c.map(([f]) => `\\kV_{\\text{${f.replace(/₂/g, '_2').replace(/₃/g, '_3').replace(/_(\d)/g, '}_{$1}\\text{')}}}`).join(' : ');
    tex(d.readout, `${sym} = ${c.map(([, n]) => n).join(' : ')} = ${c.map(([, n]) => hue('volume', fmt(n * V, 2) + '\\ \\text{L}')).join(' : ')}`);
  }
  register(d.fig, { update: () => {}, draw });
})();
};
