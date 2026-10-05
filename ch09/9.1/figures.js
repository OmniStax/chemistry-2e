/* Figures for section 9.1 Gas Pressure. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['9.1'] = function (root, F) {
const { el, fmt, tex, C, PAL, alpha, ctl, register, begin, line, arrow, dot, text, topline, vbracket, scale } = F;
const sim = (id, H) => F.sim(root, id, H);
function readout(host, main, small) { tex(host, main); if (small) host.appendChild(el('small', null, small)); }
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;
const sig3 = (x) => { const s = Math.abs(x).toPrecision(3); return s.includes('e') ? String(Math.round(Number(s))) : s; };
const commas = (x) => Math.round(x).toLocaleString('en-US');

/* =====================================================================
   FIGURE 9.2: one load pressed on a thumbnail, a skate blade or a bare
   foot, P = F/A. Still: the pressure answers two sliders. The area
   decides what bears the load: the book's column of air on a bowling
   ball over a thumbnail below 1.5 in², a skater on a blade below 6 in²,
   the same skater barefoot above. The footprint is drawn to scale on a
   grid of square inches; the bar beside runs 0 to 100 lb/in².
===================================================================== */
(function () {
  const d = sim('sim-force-area', 540);
  const Fs = ctl(d.controls, { label: '\\kforce', cls: 'force', min: 1, max: 150, step: 0.1, value: 14.7, unit: 'lb', dec: 1, aria: 'force in pounds', detents: [{ v: 14.7, label: 'air' }, { v: 60, label: 'skater' }] });
  const As = ctl(d.controls, { label: '\\karea', cls: 'area', min: 0.5, max: 30, step: 0.5, value: 1, unit: 'in²', dec: 1, aria: 'area in square inches', detents: [{ v: 1, label: 'thumbnail' }, 2, { v: 30, label: 'foot' }] });
  const PMAX = 100, GROUND = 420;
  /* a sole about 10 in long, heel at the origin, toes along +x, lateral side up; scaled to the area set */
  const SOLE = [[0, 0], [0.2, -0.7], [1, -1.2], [2.5, -1.3], [5, -1.35], [7, -1.6], [8.5, -1.7], [9.6, -1.2], [10.1, -0.4], [10.2, 0.4], [9.9, 1.2], [9, 1.7], [7.5, 1.8], [6.5, 1.2], [5, 0.5], [3.5, 0.5], [2, 0.9], [1, 1.1], [0.2, 0.7]];
  const SOLE_A = Math.abs(SOLE.reduce((s, p, i) => { const q = SOLE[(i + 1) % SOLE.length]; return s + p[0] * q[1] - q[0] * p[1]; }, 0)) / 2;
  const smooth = (ctx, pts) => {
    const mid = (i) => { const p = pts[i % pts.length], q = pts[(i + 1) % pts.length]; return [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2]; };
    ctx.beginPath(); ctx.moveTo(...mid(0));
    for (let i = 1; i <= pts.length; i++) ctx.quadraticCurveTo(...pts[i % pts.length], ...mid(i));
    ctx.closePath();
  };
  const kindOf = (a) => (a < 1.5 ? 'nail' : a < 6 ? 'blade' : 'foot');
  const NAME = { nail: 'thumbnail', blade: 'skate blade', foot: 'bare foot' };
  /* the footprint, seen from below on a 12 in by 5 in grid of square inches */
  const G = { l: 690, t: 230, u: 28, nx: 12, ny: 5 };
  function footprint(ctx, kind, a, ca, lab) {
    const { l, t, u, nx, ny } = G, r = l + nx * u, b = t + ny * u, cx = (l + r) / 2, cy = (t + b) / 2;
    for (let i = 0; i <= nx; i++) line(ctx, l + i * u, t, l + i * u, b, alpha(PAL.ink, 0.18), 1.5);
    for (let j = 0; j <= ny; j++) line(ctx, l, t + j * u, r, t + j * u, alpha(PAL.ink, 0.18), 1.5);
    ctx.save(); ctx.fillStyle = alpha(ca, 0.35); ctx.strokeStyle = ca; ctx.lineWidth = 3;
    if (kind === 'nail') {
      const ry = Math.sqrt(a / (Math.PI * 1.15)), rx = 1.15 * ry;
      ctx.beginPath(); ctx.ellipse(cx, cy, rx * u, ry * u, 0, 0, Math.PI * 2);
    } else if (kind === 'blade') {
      const L = 10, w = a / L, x0 = cx - (L / 2) * u, x1 = cx + (L / 2) * u, h = (w * u) / 2;
      ctx.beginPath(); ctx.moveTo(x0, cy - h); ctx.lineTo(x1 - 0.4 * u, cy - h); ctx.quadraticCurveTo(x1, cy - h, x1, cy); ctx.quadraticCurveTo(x1, cy + h, x1 - 0.4 * u, cy + h); ctx.lineTo(x0, cy + h); ctx.closePath();
    } else {
      const k = Math.sqrt(a / SOLE_A), len = 10.2 * k;
      smooth(ctx, SOLE.map(([x, y]) => [cx + (x * k - len / 2) * u, cy + y * k * u]));
    }
    ctx.fill(); ctx.stroke(); ctx.restore();
    lab.place({ l, t, r, b });
    text(ctx, 'footprint, 1 in² squares', cx, t - 22, PAL.muted, { size: 17, align: 'center' });
    text(ctx, NAME[kind] + ', A = ' + fmt(a, 1) + ' in²', cx, b + 26, ca, { size: 22, weight: 600, align: 'center' });
  }
  /* pressure arrows under the patch that bears the load, each as long as the pressure */
  function pressArrows(ctx, x0, x1, y, p, cp, n) {
    const pl = 14 + 50 * Math.min(p, PMAX) / PMAX;
    for (let i = 0; i < n; i++) { const x = x0 + (i + 0.5) * (x1 - x0) / n; arrow(ctx, x, y + 3, x, y + 3 + pl, cp, 3); }
  }
  function draw() {
    const { ctx } = begin(d.c);
    const lab = F.labeller(ctx, 540, { headline: 1 });
    const f = Fs.v, a = As.v, p = f / a, kind = kindOf(a), cp = C('pressure'), cf = C('force'), ca = C('area');
    const fl = 20 + 90 * (f / 150);
    if (kind === 'nail') {
      /* a thumbs-up seen from the back; the thumbnail at (NX, NY) bears the ball */
      const NX = 330, NY = 350, R = 72, by = NY - R;
      F.hand(ctx, NX - 90, NY + 114, { aim: [1, 0], view: 'back', curl: 0.9, thumb: 'up', s: 1.9 });
      ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.07); ctx.fillRect(NX - 20, 80, 40, by - R - 80); ctx.restore();
      line(ctx, NX - 20, 80, NX - 20, by - R, alpha(PAL.ink, 0.4), 2, [10, 10]); line(ctx, NX + 20, 80, NX + 20, by - R, alpha(PAL.ink, 0.4), 2, [10, 10]);
      ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.22); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(NX, by, R, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      ctx.fillStyle = PAL.ink; [[-16, -40], [10, -42], [-2, -18]].forEach(([dx, dy]) => { ctx.beginPath(); ctx.arc(NX + dx, by + dy, 7, 0, Math.PI * 2); ctx.fill(); }); ctx.restore();
      arrow(ctx, NX, by - R - 10 - fl, NX, by - R - 8, cf, 5);
      pressArrows(ctx, NX - 14, NX + 14, NY, p, cp, 3);
      lab.add('F = ' + fmt(f, 1) + ' lb', NX + 6, by - R - 10 - fl / 2, 1, 0, cf, 22, 24);
      lab.add('column of air', NX - 20, 150, -1, 0, PAL.muted, 20, 16);
      lab.add('bowling ball', NX + R * 0.7, by - R * 0.7, 1, -0.4, PAL.ink, 20, 16);
      lab.add('thumbnail', NX + 22, NY + 6, 1, 0.3, ca, 20, 30);
    } else {
      /* the skater stands on the ice; the near foot's patch is the one the load is on */
      const SX = 300, s = 2, fx = SX + 9 * s, lift = kind === 'blade' ? 26 : 6, fy = GROUND - lift, half = 30;
      ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.06); ctx.fillRect(40, GROUND, 600, 90); ctx.restore();
      line(ctx, 40, GROUND, 640, GROUND, PAL.ink, 3);
      F.silhouette(ctx, { x: SX, y: fy, s, pose: 'stand', color: PAL.muted });
      for (const [x, c] of [[SX - 9 * s, alpha(PAL.ink, 0.45)], [fx, PAL.ink]]) {
        if (kind === 'blade') {
          line(ctx, x - 12, fy, x + 22, fy, c, 12); line(ctx, x - 8, fy + 4, x - 8, GROUND - 3, c, 3); line(ctx, x + 16, fy + 4, x + 16, GROUND - 3, c, 3);
          line(ctx, x - half, GROUND - 2, x + half, GROUND - 2, c, 4);
        } else {
          ctx.save(); ctx.fillStyle = c; ctx.beginPath(); ctx.moveTo(x - 10, fy - 4); ctx.lineTo(x - 14, GROUND); ctx.lineTo(x + 34, GROUND); ctx.quadraticCurveTo(x + 30, fy - 4, x + 6, fy - 6); ctx.closePath(); ctx.fill(); ctx.restore();
        }
      }
      const x0 = kind === 'blade' ? fx - half : fx - 14, x1 = kind === 'blade' ? fx + half : fx + 34;
      const ax = fx + 44;
      arrow(ctx, ax, fy - 2 - fl, ax, fy, cf, 5);
      pressArrows(ctx, x0, x1, GROUND, p, cp, 4);
      lab.add('F = ' + fmt(f, 1) + ' lb', ax + 6, fy - 2 - fl / 2, 1, 0, cf, 22, 20);
      lab.add(NAME[kind], x0, GROUND + 10, -1, 0.2, ca, 20, 26);
      lab.add('skater', SX + 6 * s, fy - 140 * s, 1, 0, PAL.muted, 20, 24);
      lab.add('ice', 600, GROUND + 60, 0, 0, PAL.muted, 20, 0);
    }
    footprint(ctx, kind, a, ca, lab);
    /* the pressure bar, 0 to 100 lb/in² */
    const bx = 1190, bt = 120, bb = 430, yOf = (v) => bb - (bb - bt) * Math.min(v, PMAX) / PMAX;
    ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.06); ctx.fillRect(bx, bt, 70, bb - bt);
    ctx.fillStyle = cp; ctx.fillRect(bx, yOf(p), 70, bb - yOf(p));
    ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2; ctx.strokeRect(bx, bt, 70, bb - bt); ctx.restore();
    for (let v = 0; v <= PMAX; v += 20) { line(ctx, bx - 8, yOf(v), bx, yOf(v), PAL.muted, 2); text(ctx, String(v), bx - 14, yOf(v), PAL.muted, { size: 17, align: 'right', base: 'middle' }); }
    text(ctx, 'P (lb/in²)', bx + 35, bb + 34, cp, { size: 20, weight: 600, align: 'center' });
    text(ctx, (p > PMAX ? '▲ ' : '') + fmt(p, p < 10 ? 2 : 1), bx + 84, yOf(p), cp, { size: 20, weight: 600, base: 'middle' });
    lab.flush();
    topline(ctx, 'A load of ' + fmt(f, 1) + ' lb on a ' + fmt(a, 1) + ' in² ' + NAME[kind] + ' presses with $\\kP$ = ' + fmt(p, p < 10 ? 2 : 1) + ' lb/in².');
    readout(d.readout, `\\kP = \\frac{\\kforce}{\\karea} = \\frac{${hue('force', fmt(f, 1) + '\\ \\text{lb}')}}{${hue('area', fmt(a, 1) + '\\ \\text{in}^2')}} = ${hue('pressure', fmt(p, p < 10 ? 2 : 1) + '\\ \\text{lb/in}^2')}`);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 9.4: a mercury and a water barometer on one scale of height,
   0 to 12 m. Still: each column stands where hρg equals the pressure of
   the atmosphere set on the slider.
===================================================================== */
(function () {
  const d = sim('sim-barometer', 630);
  const Ps = ctl(d.controls, { label: '\\kPatm', cls: 'pressure', min: 60, max: 110, step: 0.1, value: 101.3, unit: 'kPa', dec: 1, aria: 'atmospheric pressure in kilopascals', detents: [{ v: 101.325, label: '1 atm' }] });
  const G = 9.81, RHO = { Hg: 13600, water: 1000 };
  const top = 70, base = 520, perM = (base - top) / 12;
  const Y = (m) => base - m * perM;
  function tube(ctx, x, hM, fill, name, hLabel, who) {
    const tw = 34, dishW = 190, dishH = 44, wall = F.ref(who), ch = C('length');
    ctx.fillStyle = fill; ctx.fillRect(x - dishW / 2, base, dishW, dishH);
    line(ctx, x - dishW / 2, base - 20, x - dishW / 2, base + dishH, PAL.ink, 3); line(ctx, x + dishW / 2, base - 20, x + dishW / 2, base + dishH, PAL.ink, 3); line(ctx, x - dishW / 2, base + dishH, x + dishW / 2, base + dishH, PAL.ink, 3);
    ctx.fillStyle = fill; ctx.fillRect(x - tw / 2, Y(hM), tw, base - Y(hM) + 30);
    line(ctx, x - tw / 2, Y(11.8), x - tw / 2, base + 30, wall, 3); line(ctx, x + tw / 2, Y(11.8), x + tw / 2, base + 30, wall, 3); line(ctx, x - tw / 2, Y(11.8), x + tw / 2, Y(11.8), wall, 3);
    line(ctx, x + tw / 2 + 8, Y(hM), x + 150, Y(hM), alpha(PAL.ink, 0.35), 2, [4, 8]);
    vbracket(ctx, x + 130, Y(hM), base, ch, hLabel, 1);
    text(ctx, name, x, base + dishH + 30, wall, { size: 20, weight: 600, align: 'center' });
    text(ctx, 'vacuum', x - tw / 2 - 10, Y(11.3), PAL.muted, { size: 17, align: 'right' });
  }
  function draw() {
    const { ctx } = begin(d.c);
    const p = Ps.v * 1000, cp = C('pressure');
    const hHg = p / (RHO.Hg * G), hW = p / (RHO.water * G);
    for (let m = 0; m <= 12; m += 2) { line(ctx, 110, Y(m), 122, Y(m), PAL.muted, 2); text(ctx, m + ' m', 100, Y(m), PAL.muted, { size: 17, align: 'right', base: 'middle' }); }
    line(ctx, 122, Y(0), 122, Y(12), PAL.muted, 2);
    tube(ctx, 380, hHg, F.el('Hg'), 'mercury', 'h = ' + fmt(hHg * 1000, 0) + ' mm', 'mercury-barometer');
    tube(ctx, 850, hW, alpha(PAL.ink, 0.16), 'water', 'h = ' + fmt(hW, 2) + ' m', 'water-barometer');
    for (const x of [380, 850]) for (const dx of [-70, 70]) arrow(ctx, x + dx, base - 70, x + dx, base - 6, cp, 4);
    text(ctx, 'atmosphere', 1180, base - 50, cp, { size: 20, weight: 600, align: 'center' });
    arrow(ctx, 1180, base - 36, 1180, base - 4, cp, 4);
    topline(ctx, 'An atmospheric pressure of ' + fmt(Ps.v, 1) + ' kPa holds up ' + fmt(hHg * 1000, 0) + ' mm of mercury or ' + fmt(hW, 2) + ' m of water.');
    readout(d.readout, `\\kphyd = \\khcol\\krho\\kgrav = (${hue('length', fmt(hHg, 3) + '\\ \\text{m}')})(${hue('density', '13{,}600\\ \\text{kg/m}^3')})(${hue('acceleration', '9.81\\ \\text{m/s}^2')}) = ${hue('pressure', commas(p).replace(',', '{,}') + '\\ \\text{Pa}')}`);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* ---------- the manometer painter, shared by Figure 9.5 and the images of Examples 9.3 and 9.4 ----------
   A bulb of gas on the left joined through a valve to a U-tube of mercury; dMm is how far the mercury in the far arm stands
   above that in the gas arm, in millimetres of mercury, negative when the gas arm is higher. */
function manometer(ctx, o) {
  const { x = 700, y0, s, dMm, closed, hLabel, gasTop = 110, bottom } = o;
  const cp = C('pressure'), tw = 36, L = x - 90, R = x + 90, half = dMm * s / 2;
  const yL = y0 + half, yR = y0 - half, armTop = gasTop - 30;
  const bx = x - 360, by = gasTop + 40;
  /* the gas: the bulb, the pipe and the gas arm above the mercury */
  ctx.fillStyle = alpha(cp, 0.18);
  ctx.beginPath(); ctx.arc(bx, by, 70, 0, 2 * Math.PI); ctx.fill();
  ctx.fillRect(bx + 60, by - tw / 2, L + tw / 2 - bx - 60, tw);
  ctx.fillRect(L - tw / 2, by - tw / 2, tw, yL - by + tw / 2);
  ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(bx, by, 70, 0, 2 * Math.PI); ctx.stroke();
  line(ctx, bx + 68, by - tw / 2, L + tw / 2, by - tw / 2, PAL.ink, 3); line(ctx, bx + 68, by + tw / 2, L - tw / 2, by + tw / 2, PAL.ink, 3);
  /* the valve */
  const vx = (bx + L) / 2;
  ctx.fillStyle = PAL.ink; ctx.beginPath(); ctx.moveTo(vx - 16, by - 24); ctx.lineTo(vx + 16, by + 24); ctx.lineTo(vx + 16, by - 24); ctx.lineTo(vx - 16, by + 24); ctx.closePath(); ctx.fill();
  /* the mercury in the U */
  const Hg = F.el('Hg');
  ctx.fillStyle = Hg;
  ctx.fillRect(L - tw / 2, yL, tw, bottom - yL); ctx.fillRect(R - tw / 2, yR, tw, bottom - yR);
  ctx.beginPath(); ctx.arc(x, bottom, 90 + tw / 2, 0, Math.PI); ctx.arc(x, bottom, 90 - tw / 2, Math.PI, 0, true); ctx.closePath(); ctx.fill();
  /* the tube's walls */
  ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3;
  line(ctx, L - tw / 2, by + tw / 2, L - tw / 2, bottom, PAL.ink, 3); line(ctx, L + tw / 2, by - tw / 2, L + tw / 2, bottom, PAL.ink, 3);
  line(ctx, R - tw / 2, armTop, R - tw / 2, bottom, PAL.ink, 3); line(ctx, R + tw / 2, armTop, R + tw / 2, bottom, PAL.ink, 3);
  ctx.beginPath(); ctx.arc(x, bottom, 90 + tw / 2, 0, Math.PI); ctx.stroke(); ctx.beginPath(); ctx.arc(x, bottom, 90 - tw / 2, 0, Math.PI); ctx.stroke();
  line(ctx, L - tw / 2, by - tw / 2, L - tw / 2, armTop, PAL.ink, 3); line(ctx, L + tw / 2, armTop, L + tw / 2, by - tw / 2, PAL.ink, 3); line(ctx, L - tw / 2, armTop, L + tw / 2, armTop, PAL.ink, 3);
  if (closed) { line(ctx, R - tw / 2, armTop, R + tw / 2, armTop, PAL.ink, 3); text(ctx, 'closed end (vacuum)', R + tw / 2 + 14, armTop + 4, PAL.muted, { size: 17, base: 'middle' }); }
  else text(ctx, 'open end', R + tw / 2 + 14, armTop + 4, PAL.muted, { size: 17, base: 'middle' });
  text(ctx, 'gas', bx, by, PAL.ink, { size: 22, weight: 600, align: 'center', base: 'middle' });
  /* the two levels and h between them */
  const hi = Math.min(yL, yR), lo = Math.max(yL, yR);
  line(ctx, L - tw / 2 - 30, yL, L + tw / 2, yL, alpha(PAL.ink, 0.4), 2, [4, 8]);
  line(ctx, R - tw / 2, yR, R + tw / 2 + 60, yR, alpha(PAL.ink, 0.4), 2, [4, 8]);
  if (Math.abs(yL - yR) > 3) {
    line(ctx, L + tw / 2, hi, R + tw / 2 + 60, hi, alpha(PAL.ink, 0.4), 2, [4, 8]); line(ctx, L - tw / 2 - 30, lo, R + tw / 2 + 60, lo, alpha(PAL.ink, 0.4), 2, [4, 8]);
    vbracket(ctx, R + tw / 2 + 50, hi, lo, C('length'), hLabel, 1);
  } else text(ctx, 'level', R + tw / 2 + 64, yR, PAL.ink, { size: 18, weight: 600, base: 'middle' });
}

/* =====================================================================
   FIGURE 9.5: one manometer, closed or open at its far end, the gas
   pressure and the atmosphere on sliders. The book's three cases are
   three states of it. Still: the levels stand at equilibrium. The tube
   draws 0.317 units per mm of mercury, so 1200 mm fits the arms.
===================================================================== */
(function () {
  const d = sim('sim-manometer', 580);
  const end = F.choice(d.controls, { label: 'end', options: [{ value: 'closed', label: 'closed' }, { value: 'open', label: 'open' }], value: 'open', aria: 'the far end of the manometer', onInput: () => { atm.disable(end.value === 'closed'); gas.refresh(); } });
  const gas = ctl(d.controls, { label: '\\kPgas', cls: 'pressure', min: 0, max: 1200, step: 1, value: 897, unit: 'torr', dec: 0, aria: 'pressure of the gas in torr', specials: [{ at: () => (end.value === 'open' ? atm.v : null), label: 'equal' }] });
  const atm = ctl(d.controls, { label: '\\kPatm', cls: 'pressure', min: 600, max: 800, step: 1, value: 760, unit: 'torr', dec: 0, aria: 'atmospheric pressure in torr', onInput: () => gas.refresh() });
  function draw() {
    const { ctx } = begin(d.c);
    const closed = end.value === 'closed', pg = gas.v, pa = atm.v;
    const dMm = closed ? pg : pg - pa, h = Math.abs(dMm);
    manometer(ctx, { x: 760, y0: 270, s: 0.3, dMm, closed, hLabel: 'h = ' + h + ' mm', gasTop: 110, bottom: 450 });
    if (!closed) { const cp = C('pressure'); arrow(ctx, 850, 96, 850, 128, cp, 4); text(ctx, 'P_{atm} = ' + pa + ' torr', 950, 150, cp, { size: 20, weight: 600, base: 'middle' }); }
    const side = dMm > 0 ? 'the far arm' : 'the gas arm';
    topline(ctx, closed ? 'With a closed end the mercury stands ' + h + ' mm higher in the far arm, so the gas pressure is ' + pg + ' torr.'
      : dMm === 0 ? 'The gas and the atmosphere press equally, so the mercury is level in both arms.'
      : 'The mercury stands ' + h + ' mm higher in ' + side + ', so the gas is ' + h + ' torr ' + (dMm > 0 ? 'above' : 'below') + ' the atmosphere.');
    const G = '\\kPgas', A = '\\kPatm', hv = hue('pressure', pg + '\\ \\text{torr}');
    const main = closed ? `${G} = \\khcol\\krho\\kgrav = ${h}\\ \\text{mm Hg} = ${hv}`
      : dMm >= 0 ? `${G} = ${A} + \\khcol\\krho\\kgrav = ${hue('pressure', pa + '\\ \\text{torr}')} + ${h}\\ \\text{mm Hg} = ${hv}`
      : `${G} = ${A} - \\khcol\\krho\\kgrav = ${hue('pressure', pa + '\\ \\text{torr}')} - ${h}\\ \\text{mm Hg} = ${hv}`;
    readout(d.readout, main);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* ---------- the images of Examples 9.3 and 9.4 and their Check Your Learning, faithful still copies ---------- */
for (const [id, closed, dMm, lab] of [
  ['fig-manometer-ex3', true, 264, 'h = 26.4 cm'],
  ['fig-manometer-cyl3', true, 152, 'h = 6.0 in.'],
  ['fig-manometer-ex4', false, 137, 'h = 13.7 cm'],
  ['fig-manometer-cyl4', false, -118, 'h = 4.63 in.'],
]) {
  const d = sim(id, 480);
  register(d.fig, { update: () => {}, draw: () => { const { ctx } = begin(d.c); manometer(ctx, { x: 760, y0: 250, s: 0.55, dMm, closed, hLabel: lab, gasTop: 90, bottom: 350 }); } });
}
};
