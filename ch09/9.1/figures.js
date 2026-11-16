/* Figures for section 9.1 Gas Pressure. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['9.1'] = function (root, F) {
const { el, fmt, tex, C, PAL, alpha, ctl, register, begin, line, arrow, dot, text, topline, vbracket, scale } = F;
const sim = (id, H) => F.sim(root, id, H);
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;
const commas = (x) => Math.round(x).toLocaleString('en-US');

/* =====================================================================
   FIGURE 9.2: a load standing on a foot, P = F/A. Still: the pressure
   answers two sliders, both logarithmic so that the book's air column
   (14.7 lb on 1 in²), skate blade (60 lb on 2 in²), bare foot (60 lb on
   30 in²) and elephant's foot (3500 lb on 250 in²) are all on them.
   Side view on the left, the contact area from below on a grid of
   square inches at the same scale (18 units to the inch), and a
   pressure bar, 0 to 100 lb/in², with the atmosphere marked on it.
===================================================================== */
(function () {
  const d = sim('sim-force-area', 540);
  const lg = Math.log10;
  const Fs = ctl(d.controls, { label: '\\kforce', cls: 'force', min: 0, max: lg(3500), step: lg(3500) / 3544, value: lg(14.7), unit: 'lb', fmt: (v) => lbs(fOf(v)) + ' lb', aria: 'force in pounds', detents: [{ v: lg(14.7), label: 'air' }, { v: lg(60), label: 'skater' }, { v: lg(3500), label: 'elephant' }] });
  const As = ctl(d.controls, { label: '\\karea', cls: 'area', min: lg(0.5), max: lg(250), step: lg(500) / 2699, value: 0, unit: 'in²', fmt: (v) => sq(aOf(v)) + ' in²', aria: 'area in square inches', detents: [0, { v: lg(2), label: 'blade' }, { v: lg(30), label: 'bare foot' }, { v: lg(250), label: 'elephant' }] });
  /* the values as the slider shows them, so the readout divides the numbers the reader sees */
  function fOf(v) { const f = 10 ** v; return f < 100 ? Math.round(f * 10) / 10 : Number(f.toPrecision(3)); }
  function aOf(v) { const a = 10 ** v; return a < 10 ? Math.round(a * 10) / 10 : Math.round(a); }
  function lbs(f) { return f < 100 ? fmt(f, 1) : commas(f); }
  function sq(a) { return a < 10 ? fmt(a, 1) : String(a); }
  const pStr = (p) => (p < 1 ? p.toPrecision(2) : p < 10 ? fmt(p, 2) : p < 100 ? fmt(p, 1) : commas(Number(p.toPrecision(3))));
  const ATM = 14.7, PMAX = 100, U = 18, SX = 290, GY = 410, FOOT = 30;
  const G = { l: 620, t: 150, n: 16 };
  /* the cases the text works, named in the headline when both sliders rest on one */
  const CASES = [
    [60, 2, 'One blade under the 120 lb skater'],
    [60, 30, 'One bare foot under the 120 lb skater'], [3500, 250, 'One foot under the 14,000 lb elephant'],
  ];
  function draw() {
    const { ctx } = begin(d.c);
    const f = fOf(Fs.v), a = aOf(As.v), p = f / a, cp = C('pressure'), cf = C('force'), ca = C('area');
    const w = Math.sqrt(a) * U, x0 = SX - w / 2, x1 = SX + w / 2;
    /* the ground and the pressure on it: arrows a fixed distance apart, each as long as the pressure */
    ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.06); ctx.fillRect(60, GY, 460, 112); ctx.restore();
    line(ctx, 60, GY, 520, GY, PAL.ink, 3);
    text(ctx, 'ground', 76, GY + 92, PAL.muted, { size: 17, base: 'middle' });
    const n = Math.max(1, Math.round(w / 20)), pl = 14 + 0.8 * Math.min(p, PMAX);
    for (let i = 0; i < n; i++) { const x = x0 + (i + 0.5) * w / n; arrow(ctx, x, GY + 4, x, GY + 4 + pl, cp, 3); }
    text(ctx, 'P', x1 + 14, GY + 6 + pl / 2, cp, { size: 24, weight: 600, base: 'middle' });
    /* the foot, as wide as the side of a square of area A */
    ctx.save(); ctx.fillStyle = alpha(ca, 0.35); ctx.strokeStyle = ca; ctx.lineWidth = 3;
    ctx.fillRect(x0, GY - FOOT, w, FOOT); ctx.strokeRect(x0, GY - FOOT, w, FOOT); ctx.restore();
    text(ctx, 'A', x0 - 14, GY - FOOT / 2, ca, { size: 24, weight: 600, align: 'right', base: 'middle' });
    /* the load on it, larger as it is heavier, and its weight */
    const k = lg(f), bw = 130 + 38 * k, bh = 66 + 24 * k, top = GY - FOOT - bh;
    ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.12); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3;
    ctx.fillRect(SX - bw / 2, top, bw, bh); ctx.strokeRect(SX - bw / 2, top, bw, bh); ctx.restore();
    text(ctx, 'load', SX, top + bh / 2, PAL.ink, { size: 20, align: 'center', base: 'middle' });
    const fl = 34 + 20 * k;
    arrow(ctx, SX, top - 6 - fl, SX, top - 6, cf, 5);
    text(ctx, 'F = ' + lbs(f) + ' lb', SX + 16, top - 6 - fl / 2, cf, { size: 22, weight: 600, base: 'middle' });
    /* the contact area from below, on square inches */
    const { l, t, n: gn } = G, r = l + gn * U, b = t + gn * U, cx = (l + r) / 2, cy = (t + b) / 2;
    for (let i = 0; i <= gn; i++) { line(ctx, l + i * U, t, l + i * U, b, alpha(PAL.ink, 0.18), 1.5); line(ctx, l, t + i * U, r, t + i * U, alpha(PAL.ink, 0.18), 1.5); }
    ctx.save(); ctx.fillStyle = alpha(ca, 0.35); ctx.strokeStyle = ca; ctx.lineWidth = 3;
    ctx.fillRect(cx - w / 2, cy - w / 2, w, w); ctx.strokeRect(cx - w / 2, cy - w / 2, w, w); ctx.restore();
    text(ctx, 'from below, on 1 in² squares', cx, t - 22, PAL.muted, { size: 17, align: 'center' });
    F.rich(ctx, ['contact area ', ['A = ' + sq(a) + ' in²', ca]], cx, b + 30, { size: 22, align: 'center' });
    /* the pressure bar, 0 to 100 lb/in², the atmosphere marked */
    const bx = 1090, bwid = 70, bt = 150, bb = 438, yOf = (v) => bb - (bb - bt) * Math.min(v, PMAX) / PMAX;
    ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.06); ctx.fillRect(bx, bt, bwid, bb - bt);
    ctx.fillStyle = cp; ctx.fillRect(bx, yOf(p), bwid, bb - yOf(p));
    ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2; ctx.strokeRect(bx, bt, bwid, bb - bt); ctx.restore();
    for (let v = 0; v <= PMAX; v += 20) { line(ctx, bx - 8, yOf(v), bx, yOf(v), PAL.muted, 2); text(ctx, String(v), bx - 14, yOf(v), PAL.muted, { size: 17, align: 'right', base: 'middle' }); }
    line(ctx, bx - 8, yOf(ATM), bx + bwid + 16, yOf(ATM), PAL.ink, 2, [10, 10]);
    text(ctx, 'atmosphere, 14.7', bx + bwid + 24, yOf(ATM), PAL.muted, { size: 17, base: 'middle' });
    F.rich(ctx, [['P = ' + pStr(p), cp], ' lb/in²'], bx + bwid / 2, bt - 26, { size: 22, align: 'center' });
    if (p > PMAX) text(ctx, 'off the scale', bx + bwid + 24, bt, PAL.muted, { size: 17, base: 'middle' });
    const named = CASES.find(([cf0, ca0]) => cf0 === f && ca0 === a), q = p / ATM;
    const times = q >= 10 ? commas(Number(q.toPrecision(2))) : q.toPrecision(2);
    topline(ctx, f === ATM && a === 1 ? 'A column of air one inch square weighs 14.7 lb, so the atmosphere presses with 14.7 lb/in².'
      : Math.abs(q - 1) < 0.005 ? lbs(f) + ' lb on ' + sq(a) + ' in² presses exactly as hard as the atmosphere.'
      : (named ? named[2] : lbs(f) + ' lb spread over ' + sq(a) + ' in²') + ' presses ' + times + ' times as hard as the atmosphere.');
    tex(d.readout, `\\kP = \\frac{\\kforce}{\\karea} = \\frac{${hue('force', lbs(f).replace(',', '{,}') + '\\ \\text{lb}')}}{${hue('area', sq(a) + '\\ \\text{in}^2')}} = ${hue('pressure', pStr(p).replace(',', '{,}') + '\\ \\text{lb/in}^2')}`);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 9.4: a mercury and a water barometer on one scale of height,
   0 to 12 m. Still: each column stands where hρg equals the pressure of
   the atmosphere set on the slider. Mercury at 0 °C (13,595 kg/m³) and
   standard gravity, so 1 atm holds the book's 760 mm and 10.33 m.
===================================================================== */
(function () {
  const d = sim('sim-barometer', 650);
  const Ps = ctl(d.controls, { label: '\\kPatm', cls: 'pressure', min: 60, max: 110, step: 0.1, value: 101.3, unit: 'kPa', dec: 1, aria: 'atmospheric pressure in kilopascals', detents: [{ v: 101.325, label: '1 atm' }] });
  const G = 9.80665, RHO = { Hg: 13595, water: 1000 };
  const top = 100, base = 540, perM = (base - top) / 12;
  const Y = (m) => base - m * perM;
  function tube(ctx, x, hM, fill, name, hLabel, who) {
    const tw = 34, dishW = 190, dishH = 44, wall = F.ref(who), ch = C('length'), cp = C('pressure');
    ctx.fillStyle = fill; ctx.fillRect(x - dishW / 2, base, dishW, dishH);
    line(ctx, x - dishW / 2, base - 20, x - dishW / 2, base + dishH, PAL.ink, 3); line(ctx, x + dishW / 2, base - 20, x + dishW / 2, base + dishH, PAL.ink, 3); line(ctx, x - dishW / 2, base + dishH, x + dishW / 2, base + dishH, PAL.ink, 3);
    ctx.fillStyle = fill; ctx.fillRect(x - tw / 2, Y(hM), tw, base - Y(hM) + 30);
    line(ctx, x - tw / 2, Y(11.8), x - tw / 2, base + 30, wall, 3); line(ctx, x + tw / 2, Y(11.8), x + tw / 2, base + 30, wall, 3); line(ctx, x - tw / 2, Y(11.8), x + tw / 2, Y(11.8), wall, 3);
    line(ctx, x + tw / 2 + 8, Y(hM), x + 150, Y(hM), alpha(PAL.ink, 0.35), 2, [4, 8]);
    vbracket(ctx, x + 130, Y(hM), base, ch, hLabel, 1);
    text(ctx, name, x, base + dishH + 30, wall, { size: 20, weight: 600, align: 'center' });
    text(ctx, 'vacuum', x - tw / 2 - 10, Y(11.3), PAL.muted, { size: 17, align: 'right' });
    /* the atmosphere on the open dish, either side of the tube */
    for (const dx of [-70, 70]) arrow(ctx, x + dx, base - 70, x + dx, base - 6, cp, 4);
    text(ctx, 'atmospheric pressure', x - 44, base - 88, cp, { size: 20, weight: 600, align: 'right', base: 'middle' });
  }
  function draw() {
    const { ctx } = begin(d.c);
    const p = Ps.v * 1000;
    const hHg = p / (RHO.Hg * G), hW = p / (RHO.water * G);
    for (let m = 0; m <= 12; m += 2) { line(ctx, 110, Y(m), 122, Y(m), PAL.muted, 2); text(ctx, m + ' m', 100, Y(m), PAL.muted, { size: 17, align: 'right', base: 'middle' }); }
    line(ctx, 122, Y(0), 122, Y(12), PAL.muted, 2);
    tube(ctx, 440, hHg, F.el('Hg'), 'mercury', 'h = ' + fmt(hHg * 1000, 0) + ' mm', 'mercury-barometer');
    tube(ctx, 940, hW, alpha(PAL.ink, 0.16), 'water', 'h = ' + fmt(hW, 2) + ' m', 'water-barometer');
    topline(ctx, 'An atmospheric pressure of ' + fmt(Ps.v, 1) + ' kPa holds up ' + fmt(hHg * 1000, 0) + ' mm of mercury or ' + fmt(hW, 2) + ' m of water.');
    const pa = hue('pressure', commas(p).replace(',', '{,}') + '\\ \\text{Pa}'), g = hue('acceleration', '9.81\\ \\text{m/s}^2');
    tex(d.readout, `\\text{mercury: }\\ \\kphyd = \\khcol\\krho\\kgrav = (${hue('length', fmt(hHg, 3) + '\\ \\text{m}')})(${hue('density', '13{,}595\\ \\text{kg/m}^3')})(${g}) = ${pa} \\\\ \\text{water: }\\ \\kphyd = \\khcol\\krho\\kgrav = (${hue('length', fmt(hW, 2) + '\\ \\text{m}')})(${hue('density', '1{,}000\\ \\text{kg/m}^3')})(${g}) = ${pa}`);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 9.5: one manometer, closed or open at its far end, the gas
   pressure and the atmosphere on sliders. The book's three cases are
   three states of it. Still: the levels stand at equilibrium. A bulb of
   gas opens through a stopcock and an elbow into the left arm of a
   U-tube of mercury. The tube draws 0.23 units per mm of mercury, the
   two levels moving equally and oppositely about y0, so the mercury
   stays below the elbow and inside the arms from −800 to +1200 mm.
===================================================================== */
(function () {
  const d = sim('sim-manometer', 650);
  const end = F.choice(d.controls, { label: 'end', options: [{ value: 'closed', label: 'closed' }, { value: 'open', label: 'open' }], value: 'open', aria: 'the far end of the manometer', onInput: () => { atm.disable(end.value === 'closed'); gas.refresh(); } });
  const gas = ctl(d.controls, { label: '\\kPgas', cls: 'pressure', min: 0, max: 1200, step: 1, value: 897, unit: 'mm Hg', dec: 0, aria: 'pressure of the gas in millimetres of mercury', specials: [{ at: () => (end.value === 'open' ? atm.v : null), label: 'equal' }] });
  const atm = ctl(d.controls, { label: '\\kPatm', cls: 'pressure', min: 600, max: 800, step: 1, value: 760, unit: 'mm Hg', dec: 0, aria: 'atmospheric pressure in millimetres of mercury', onInput: () => gas.refresh() });
  const X = 780, SEP = 110, TW = 44, L = X - SEP, R = X + SEP, TOP = 160, BY = 230, B = 490, Y0 = 350, S = 0.23, BR = 84, BX = L - 330;
  function draw() {
    const { ctx } = begin(d.c);
    const closed = end.value === 'closed', pg = gas.v, pa = atm.v, cp = C('pressure'), Hg = F.el('Hg');
    const dMm = closed ? pg : pg - pa, h = Math.abs(dMm), half = dMm * S / 2, yL = Y0 + half, yR = Y0 - half;
    const ex = L - TW / 2, ey = BY + TW / 2;                       /* the elbow's inner corner */
    const mouth = Math.asin(TW / 2 / BR), px0 = BX + BR * Math.cos(mouth);   /* where the pipe leaves the bulb */
    /* the gas: bulb, pipe, elbow and the left arm down to the mercury, one body */
    ctx.save(); ctx.fillStyle = alpha(cp, 0.18); ctx.beginPath();
    ctx.arc(BX, BY, BR, 0, 2 * Math.PI); ctx.rect(BX + BR - 20, BY - TW / 2, ex - (BX + BR - 20), TW);
    ctx.moveTo(ex, ey); ctx.lineTo(ex, ey - TW); ctx.arc(ex, ey, TW, -Math.PI / 2, 0); ctx.closePath();
    ctx.rect(ex, ey, TW, yL - ey); ctx.fill('nonzero'); ctx.restore();
    /* the mercury: both arms and the bend */
    ctx.save(); ctx.fillStyle = Hg;
    ctx.fillRect(L - TW / 2, yL, TW, B + 2 - yL); ctx.fillRect(R - TW / 2, yR, TW, B + 2 - yR);
    ctx.beginPath(); ctx.arc(X, B, SEP + TW / 2, 0, Math.PI); ctx.arc(X, B, SEP - TW / 2, Math.PI, 0, true); ctx.closePath(); ctx.fill(); ctx.restore();
    /* the glass */
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.arc(BX, BY, BR, mouth, 2 * Math.PI - mouth); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(px0, BY - TW / 2); ctx.lineTo(ex, BY - TW / 2); ctx.arc(ex, ey, TW, -Math.PI / 2, 0); ctx.lineTo(L + TW / 2, B); ctx.arc(X, B, SEP - TW / 2, Math.PI, 0, true); ctx.lineTo(R - TW / 2, TOP);
    if (closed) ctx.arc(R, TOP, TW / 2, Math.PI, 0);
    else ctx.moveTo(R + TW / 2, TOP);
    ctx.lineTo(R + TW / 2, B); ctx.arc(X, B, SEP + TW / 2, 0, Math.PI); ctx.lineTo(ex, ey); ctx.lineTo(px0, ey); ctx.stroke();
    /* the stopcock on the pipe, open: a plug across the bore with its handle above */
    const vx = (BX + BR + ex) / 2;
    ctx.fillStyle = PAL.panel; ctx.fillRect(vx - 13, BY - 34, 26, 68);
    ctx.fillStyle = alpha(cp, 0.18); ctx.fillRect(vx - 13, BY - 10, 26, 20);
    ctx.strokeRect(vx - 13, BY - 34, 26, 68); ctx.restore();
    line(ctx, vx - 13, BY - 10, vx + 13, BY - 10, PAL.ink, 2); line(ctx, vx - 13, BY + 10, vx + 13, BY + 10, PAL.ink, 2);
    line(ctx, vx, BY - 34, vx, BY - 50, PAL.ink, 5); line(ctx, vx - 26, BY - 52, vx + 26, BY - 52, PAL.ink, 8);
    text(ctx, 'stopcock', vx, BY + 54, PAL.muted, { size: 17, align: 'center', base: 'middle' });
    text(ctx, 'gas', BX, BY, PAL.ink, { size: 22, weight: 600, align: 'center', base: 'middle' });
    text(ctx, 'P_{gas} = ' + pg + ' mm Hg', BX, BY + BR + 28, cp, { size: 20, weight: 600, align: 'center', base: 'middle' });
    text(ctx, 'mercury', L - TW / 2 - 16, B + 36, PAL.muted, { size: 17, align: 'right', base: 'middle' });
    const rx = R + TW / 2 + 16;
    if (closed) {
      text(ctx, 'closed end', rx, TOP - 10, PAL.muted, { size: 17, base: 'middle' });
      text(ctx, 'vacuum', rx, Math.max(TOP + 26, (TOP + yR) / 2 - 6), PAL.muted, { size: 17, base: 'middle' });
    } else {
      arrow(ctx, R, TOP - 56, R, TOP - 6, cp, 4);
      text(ctx, 'P_{atm} = ' + pa + ' mm Hg', rx, TOP - 34, cp, { size: 20, weight: 600, base: 'middle' });
      text(ctx, 'open end', rx, TOP + 8, PAL.muted, { size: 17, base: 'middle' });
    }
    /* the two levels and h between them */
    const hi = Math.min(yL, yR), lo = Math.max(yL, yR), bxr = R + TW / 2 + 60;
    if (h > 0) {
      line(ctx, (yL < yR ? L : R) + TW / 2, hi, bxr, hi, alpha(PAL.ink, 0.4), 2, [4, 8]);
      line(ctx, L - TW / 2, lo, bxr, lo, alpha(PAL.ink, 0.4), 2, [4, 8]);
      vbracket(ctx, bxr, hi, lo, C('length'), 'h = ' + h + ' mm', 1);
    } else {
      line(ctx, L - TW / 2, yL, bxr, yL, alpha(PAL.ink, 0.4), 2, [4, 8]);
      text(ctx, 'level, h = 0', bxr + 10, yR, C('length'), { size: 22, weight: 600, base: 'middle' });
    }
    topline(ctx, closed ? (h === 0 ? 'Nothing presses on either arm, so the mercury stands level.' : 'Against a vacuum, the gas holds the mercury ' + h + ' mm higher in the closed arm.')
      : dMm === 0 ? 'The gas and the atmosphere press equally, and the mercury stands level.'
      : 'The mercury stands ' + h + ' mm higher in the ' + (dMm > 0 ? 'open' : 'gas') + ' arm, so the gas is ' + h + ' mm Hg ' + (dMm > 0 ? 'above' : 'below') + ' the atmosphere.');
    const G = '\\kPgas', A = '\\kPatm', mm = (v) => hue('pressure', v + '\\ \\text{mm Hg}');
    tex(d.readout, closed ? `${G} = \\khcol\\krho\\kgrav = ${mm(pg)}`
      : `${G} = ${A} ${dMm >= 0 ? '+' : '-'} \\khcol\\krho\\kgrav = ${mm(pa)} ${dMm >= 0 ? '+' : '-'} ${mm(h)} = ${mm(pg)}`);
  }
  register(d.fig, { update: () => {}, draw });
})();
};
