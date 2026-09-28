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
   FIGURE 9.2: a force pressed on an area, P = F/A. Still: the pressure
   answers two sliders. The arrows under the block are the pressure,
   each as long as the force on one square inch.
===================================================================== */
(function () {
  const d = sim('sim-force-area', 500);
  const Fs = ctl(d.controls, { label: 'F', cls: '', min: 1, max: 150, step: 0.1, value: 14.7, unit: 'lb', dec: 1, aria: 'force in pounds', detents: [{ v: 14.7, label: 'air' }, { v: 60, label: 'skater' }] });
  const As = ctl(d.controls, { label: 'A', cls: '', min: 0.5, max: 30, step: 0.5, value: 1, unit: 'in²', dec: 1, aria: 'area in square inches', detents: [{ v: 1, label: 'thumbnail' }, 2, { v: 30, label: 'foot' }] });
  const PMAX = 100;                                  /* the bar runs 0 to 100 lb/in², beyond which it is pinned */
  function draw() {
    const { ctx } = begin(d.c);
    const f = Fs.v, a = As.v, p = f / a, cp = C('pressure');
    const cx = 520, ground = 330, w = 30 + 860 * (a / 30), bh = 70;
    ctx.fillStyle = alpha(PAL.ink, 0.08); ctx.fillRect(60, ground, 920, 60);
    line(ctx, 60, ground, 980, ground, PAL.ink, 3);
    ctx.fillStyle = PAL.panel; ctx.fillRect(cx - w / 2, ground - bh, w, bh);
    ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.strokeRect(cx - w / 2, ground - bh, w, bh);
    const fl = 20 + 150 * (f / 150);
    arrow(ctx, cx, ground - bh - 20 - fl, cx, ground - bh - 12, PAL.ink, 5);
    text(ctx, 'F = ' + fmt(f, 1) + ' lb', cx + 18, ground - bh - 30 - fl / 2, PAL.ink, { size: 22, weight: 600 });
    const n = Math.max(2, Math.min(14, Math.round(w / 60))), pl = 12 + 58 * Math.min(p, PMAX) / PMAX;
    for (let i = 0; i < n; i++) { const x = cx - w / 2 + (i + 0.5) * w / n; arrow(ctx, x, ground + 4, x, ground + 4 + pl, cp, 3); }
    F.hbracket(ctx, cx - w / 2, cx + w / 2, ground + 100, PAL.muted, 'A = ' + fmt(a, 1) + ' in²', { side: 'below' });
    /* the pressure bar, 0 to 100 lb/in² */
    const bx = 1150, bt = 110, bb = 400, yOf = (v) => bb - (bb - bt) * Math.min(v, PMAX) / PMAX;
    ctx.fillStyle = alpha(PAL.ink, 0.06); ctx.fillRect(bx, bt, 70, bb - bt);
    ctx.fillStyle = cp; ctx.fillRect(bx, yOf(p), 70, bb - yOf(p));
    ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2; ctx.strokeRect(bx, bt, 70, bb - bt);
    for (let v = 0; v <= PMAX; v += 20) { line(ctx, bx - 8, yOf(v), bx, yOf(v), PAL.muted, 2); text(ctx, String(v), bx - 14, yOf(v), PAL.muted, { size: 17, align: 'right', base: 'middle' }); }
    text(ctx, 'P (lb/in²)', bx + 35, bb + 34, cp, { size: 20, weight: 600, align: 'center' });
    text(ctx, (p > PMAX ? '▲ ' : '') + fmt(p, p < 10 ? 2 : 1), bx + 84, yOf(p), cp, { size: 20, weight: 600, base: 'middle' });
    topline(ctx, 'A force of ' + fmt(f, 1) + ' lb on ' + fmt(a, 1) + ' in² gives a pressure of ' + fmt(p, p < 10 ? 2 : 1) + ' lb/in².');
    readout(d.readout, `\\kP = \\frac{F}{A} = \\frac{${fmt(f, 1)}\\ \\text{lb}}{${fmt(a, 1)}\\ \\text{in}^2} = ${hue('pressure', fmt(p, p < 10 ? 2 : 1) + '\\ \\text{lb/in}^2')}`);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 9.4: a mercury and a water barometer on one scale of height,
   0 to 12 m. Still: each column stands where hρg equals the pressure of
   the atmosphere set on the slider.
===================================================================== */
(function () {
  const d = sim('sim-barometer', 600);
  const Ps = ctl(d.controls, { label: '\\kPatm', cls: 'pressure', min: 60, max: 110, step: 0.1, value: 101.3, unit: 'kPa', dec: 1, aria: 'atmospheric pressure in kilopascals', detents: [{ v: 101.325, label: '1 atm' }] });
  const G = 9.81, RHO = { Hg: 13600, water: 1000 };
  const top = 70, base = 520, perM = (base - top) / 12;
  const Y = (m) => base - m * perM;
  function tube(ctx, x, hM, fill, name, hLabel) {
    const tw = 34, dishW = 190, dishH = 44;
    ctx.fillStyle = fill; ctx.fillRect(x - dishW / 2, base, dishW, dishH);
    line(ctx, x - dishW / 2, base - 20, x - dishW / 2, base + dishH, PAL.ink, 3); line(ctx, x + dishW / 2, base - 20, x + dishW / 2, base + dishH, PAL.ink, 3); line(ctx, x - dishW / 2, base + dishH, x + dishW / 2, base + dishH, PAL.ink, 3);
    ctx.fillStyle = fill; ctx.fillRect(x - tw / 2, Y(hM), tw, base - Y(hM) + 30);
    line(ctx, x - tw / 2, Y(11.8), x - tw / 2, base + 30, PAL.ink, 3); line(ctx, x + tw / 2, Y(11.8), x + tw / 2, base + 30, PAL.ink, 3); line(ctx, x - tw / 2, Y(11.8), x + tw / 2, Y(11.8), PAL.ink, 3);
    line(ctx, x + tw / 2 + 8, Y(hM), x + 150, Y(hM), alpha(PAL.ink, 0.35), 2, [4, 8]);
    vbracket(ctx, x + 130, Y(hM), base, PAL.ink, hLabel, 1);
    text(ctx, name, x, base + dishH + 30, PAL.ink, { size: 20, weight: 600, align: 'center' });
    text(ctx, 'vacuum', x - tw / 2 - 10, Y(11.3), PAL.muted, { size: 17, align: 'right' });
  }
  function draw() {
    const { ctx } = begin(d.c);
    const p = Ps.v * 1000, cp = C('pressure');
    const hHg = p / (RHO.Hg * G), hW = p / (RHO.water * G);
    for (let m = 0; m <= 12; m += 2) { line(ctx, 110, Y(m), 122, Y(m), PAL.muted, 2); text(ctx, m + ' m', 100, Y(m), PAL.muted, { size: 17, align: 'right', base: 'middle' }); }
    line(ctx, 122, Y(0), 122, Y(12), PAL.muted, 2);
    tube(ctx, 380, hHg, F.el('Hg'), 'mercury', 'h = ' + fmt(hHg * 1000, 0) + ' mm');
    tube(ctx, 850, hW, alpha(PAL.ink, 0.16), 'water', 'h = ' + fmt(hW, 2) + ' m');
    for (const x of [380, 850]) for (const dx of [-70, 70]) arrow(ctx, x + dx, base - 70, x + dx, base - 6, cp, 4);
    text(ctx, 'atmosphere', 1180, base - 50, cp, { size: 20, weight: 600, align: 'center' });
    arrow(ctx, 1180, base - 36, 1180, base - 4, cp, 4);
    topline(ctx, 'An atmospheric pressure of ' + fmt(Ps.v, 1) + ' kPa holds up ' + fmt(hHg * 1000, 0) + ' mm of mercury or ' + fmt(hW, 2) + ' m of water.');
    readout(d.readout, `\\kphyd = h\\rho g = (${fmt(hHg, 3)}\\ \\text{m})(13{,}600\\ \\text{kg/m}^3)(9.81\\ \\text{m/s}^2) = ${hue('pressure', commas(p).replace(',', '{,}') + '\\ \\text{Pa}')}`,
      'The same pressure holds up ' + fmt(hW, 2) + ' m of water, whose density is 1000 kg/m³, a column 13.6 times as tall.');
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
    vbracket(ctx, R + tw / 2 + 50, hi, lo, PAL.ink, hLabel, 1);
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
    if (!closed) { const cp = C('pressure'); arrow(ctx, 850, 96, 850, 128, cp, 4); text(ctx, 'P_{atm} = ' + pa + ' torr', 900, 150, cp, { size: 20, weight: 600, base: 'middle' }); }
    const side = dMm > 0 ? 'the far arm' : 'the gas arm';
    topline(ctx, closed ? 'With a closed end the mercury stands ' + h + ' mm higher in the far arm, so the gas pressure is ' + pg + ' torr.'
      : dMm === 0 ? 'The gas and the atmosphere press equally, so the mercury is level in both arms.'
      : 'The mercury stands ' + h + ' mm higher in ' + side + ', so the gas is ' + h + ' torr ' + (dMm > 0 ? 'above' : 'below') + ' the atmosphere.');
    const G = '\\kPgas', A = '\\kPatm', hv = hue('pressure', pg + '\\ \\text{torr}');
    const main = closed ? `${G} = h\\rho g = ${h}\\ \\text{mm Hg} = ${hv}`
      : dMm >= 0 ? `${G} = ${A} + h\\rho g = ${hue('pressure', pa + '\\ \\text{torr}')} + ${h}\\ \\text{mm Hg} = ${hv}`
      : `${G} = ${A} - h\\rho g = ${hue('pressure', pa + '\\ \\text{torr}')} - ${h}\\ \\text{mm Hg} = ${hv}`;
    readout(d.readout, main, closed ? 'A column of mercury h millimeters high exerts h mm Hg, about h torr, so h reads the pressure directly.' : null);
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
