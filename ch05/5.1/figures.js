/* Figures for section 5.1 Energy Basics. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['5.1'] = function (root, F) {
const { el, fmt, tex, C, PAL, alpha, ctl, cycle, register, begin, line, arrow, dot, text, topline, axes, pinned, plot } = F;
const sim = (id, H) => F.sim(root, id, H);
function readout(host, main, small, o) { tex(host, main, false, o); if (small) host.appendChild(el('small', null, small)); }
/* a live number wrapped in the hue of its type, for the readouts */
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;
/* a deterministic scatter in 0..1, so a rebuild puts every molecule back where it was */
const rnd = (i) => { const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453; return x - Math.floor(x); };
/* n significant figures with thousands separators, as the book writes 18,140 J */
const sig = (x, n) => { const r = Number(Math.abs(x).toPrecision(n)); return (x < 0 ? '−' : '') + r.toLocaleString('en-US', { maximumFractionDigits: Math.max(0, n - 1 - Math.floor(Math.log10(r || 1))) }); };
const TAU = 2 * Math.PI;

/* =====================================================================
   FIGURE 5.4 + 5.6: two equal samples of water, H and L, each a box of
   fourteen molecules seen from the front. For the first second they
   stand apart at their own temperatures; then they slide into contact
   and heat passes from the hotter to the cooler, each temperature
   relaxing exponentially to the mean (equal masses of one substance),
   while the heat arrow over the shared wall shrinks with the difference.
   The molecules jiggle about fixed places, the rate and the reach of the
   motion set by their box's temperature; the phase is the time integral
   of that rate, so the motion is a pure function of the clock and scrubs
   both ways. Each drags a short trail, the path of its last half
   second, which stands for the book's motion lines: a longer trail is a
   faster molecule. The speeds are drawn much further apart than they
   are (root rule 28.4); the note under the readout gives the true ratio.
   Moving: heat flow has a clock, 7 s a loop. Flat: every molecule is in
   view and turning the boxes shows nothing more (root rule 28.5).
===================================================================== */
(function () {
  const d = sim('sim-heat-flow', 560);
  let TL = null;
  const TH = ctl(d.controls, { label: '\\kT_{\\htmlData{ref=sample-h}{\\text{H}}}', cls: 'temperature', min: 0, max: 100, step: 1, value: 80, unit: '°C', dec: 0, aria: 'starting temperature of sample H',
    specials: [{ at: () => (TL ? TL.v : null), label: 'same as L' }], onInput: () => cy.reset() });
  TL = ctl(d.controls, { label: '\\kT_{\\htmlData{ref=sample-l}{\\text{L}}}', cls: 'temperature', min: 0, max: 100, step: 1, value: 10, unit: '°C', dec: 0, aria: 'starting temperature of sample L',
    specials: [{ at: () => TH.v, label: 'same as H' }], onInput: () => cy.reset() });
  const LOOP = 7, TC = 1, SLIDE = 0.6, RELAX = 1.1, R0 = 1.5, R1 = 0.07;
  /* the boxes: S on a side, wall to wall at x = CX once in contact, GAP apart before */
  const S = 330, CX = 410, TOP = 140, BOT = TOP + S, GAP = 70, PAD = 14, CELL = (S - 2 * PAD) / 4;
  const cy = cycle(() => LOOP, 1.2);
  const mean = () => (TH.v + TL.v) / 2;
  /* the temperature of a sample that started at T0, t seconds into the loop */
  const temp = (T0, t) => (t < TC ? T0 : mean() + (T0 - mean()) * Math.exp(-(t - TC) / RELAX));
  /* the jiggle's phase, the integral of its rate R0 + R1 T rad/s from the start of the loop */
  const phase = (T0, t) => {
    const Tm = mean(), a = Math.min(t, TC), b = Math.max(0, t - TC);
    return R0 * t + R1 * (T0 * a + Tm * b + (T0 - Tm) * RELAX * (1 - Math.exp(-b / RELAX)));
  };
  const reach = (T) => 9 + 0.09 * T;
  /* half the gap between the two boxes, closing over the SLIDE seconds before contact */
  const half = (t) => (GAP / 2) * Math.min(1, Math.max(0, (TC - t) / SLIDE));
  /* fourteen places on a jittered 4 by 4 grid less two cells; each molecule has two rates and two offsets for its jiggle, and a tumble */
  const SITES = [];
  for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) {
    if (i * 4 + j === 2 || i * 4 + j === 13) continue;
    const q = SITES.length;
    SITES.push({ x: PAD + (j + 0.5) * CELL + (rnd(q * 7) - 0.5) * 12, y: PAD + (i + 0.5) * CELL + (rnd(q * 7 + 1) - 0.5) * 12,
      f: [0.7 + 0.6 * rnd(q * 7 + 3), 0.7 + 0.6 * rnd(q * 7 + 4)], a: [rnd(q * 3 + 40) * TAU, rnd(q * 3 + 41) * TAU], r: rnd(q * 7 + 6) * TAU });
  }
  const offset = (s, ph, A) => s.f.map((f, i) => A * (Math.sin(f * ph + s.a[i]) * 0.7 + Math.sin(1.9 * f * ph + 2 * s.a[i]) * 0.3));
  /* one water molecule centred on its oxygen at (x, y), turned by a: oxygen and hydrogen in the element palette, hydrogen rimmed in ink so it reads on a light page */
  function water(ctx, x, y, a) {
    [-0.912, 0.912].forEach((q) => {
      ctx.save(); ctx.fillStyle = F.el('H'); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 1.4;
      ctx.beginPath(); ctx.arc(x + 16 * Math.sin(a + q), y + 16 * Math.cos(a + q), 9.5, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore();
    });
    ctx.save(); ctx.fillStyle = F.el('O'); ctx.strokeStyle = alpha(PAL.ink, 0.45); ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(x, y, 15, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore();
  }
  let hits = []; F.hover(d.stage, () => hits);
  function draw() {
    const t = cy.now(), h = temp(TH.v, t), l = temp(TL.v, t), dT = h - l;
    const hs = fmt(h, 0), ls = fmt(l, 0), same = hs === ls, touching = t >= TC, flowing = touching && !same;
    const { ctx } = begin(d.c); hits = [];
    const rH = F.ref('sample-h'), rL = F.ref('sample-l'), ce = C('energy'), ct = C('temperature');
    /* ---------- the two samples ---------- */
    [[TH.v, CX - half(t) - S, 'H', rH], [TL.v, CX + half(t), 'L', rL]].forEach(([T0, x0, who, rc]) => {
      ctx.save(); ctx.fillStyle = PAL.panel; ctx.strokeStyle = rc; ctx.lineWidth = 5; ctx.fillRect(x0, TOP, S, S); ctx.strokeRect(x0 + 2.5, TOP + 2.5, S - 5, S - 5); ctx.restore();
      const A = reach(temp(T0, t));
      const at = (s, tt) => { const o = offset(s, phase(T0, tt), A); return [x0 + s.x + o[0], TOP + s.y + o[1]]; };
      /* the trails first, under every molecule: where each oxygen has been over the last 0.48 s */
      SITES.forEach((s) => {
        const pts = [6, 5, 4, 3, 2, 1, 0].map((j) => at(s, t - j * 0.08));
        for (let i = 1; i < pts.length; i++) {
          const k = i / (pts.length - 1);
          ctx.save(); ctx.strokeStyle = alpha(F.el('O'), 0.06 + 0.3 * k); ctx.lineWidth = 26 * (0.4 + 0.6 * k); ctx.lineCap = 'round';
          ctx.beginPath(); ctx.moveTo(pts[i - 1][0], pts[i - 1][1]); ctx.lineTo(pts[i][0], pts[i][1]); ctx.stroke(); ctx.restore();
        }
      });
      SITES.forEach((s) => { const [x, y] = at(s, t); water(ctx, x, y, s.r + 0.5 * phase(T0, t) * s.f[0]); hits.push({ x, y, r: 25, name: 'a water molecule of sample ' + who }); });
      text(ctx, who, x0 + S / 2, BOT + 36, rc, { size: 24, weight: 600, align: 'center' });
    });
    /* the heat arrow over the shared wall: its length the temperature difference, 100 °C drawn 240 long, from the hotter sample to the cooler */
    if (flowing) {
      const L = Math.max(34, 240 * Math.abs(dT) / 100), sgn = Math.sign(dT);
      arrow(ctx, CX - sgn * L / 2, TOP - 26, CX + sgn * L / 2, TOP - 26, ce, 5);
      text(ctx, 'heat, q', CX, TOP - 50, ce, { size: 20, weight: 600, align: 'center' });
      hits.push({ x: CX, y: TOP - 26, r: 22, name: 'heat passing from ' + (sgn > 0 ? 'H to L' : 'L to H') + ' through the wall they share' });
    }
    /* ---------- the graph: temperature 0 to 100 °C by 20, from the slider range; time is the loop, unnumbered ---------- */
    const box = { l: 900, r: 1330, t: TOP, b: BOT };
    const g = axes(ctx, box, [0, LOOP], [0, 100], { xl: 'time', yl: 'temperature (°C)', yc: ct, nx: 0, ny: 5 });
    line(ctx, g.X(TC), box.t, g.X(TC), box.b, alpha(PAL.ink, 0.35), 2, [4, 8]);
    text(ctx, 'contact', g.X(TC), box.b + 26, PAL.muted, { size: 17, align: 'center' });
    if (touching && same) {
      line(ctx, g.X(TC), g.Y(mean()), box.r, g.Y(mean()), alpha(PAL.ink, 0.35), 2, [10, 10]);
      text(ctx, 'thermal equilibrium', box.r - 6, g.Y(mean()) + (mean() > 80 ? 1 : -1) * (TH.v === TL.v ? 42 : 22), PAL.muted, { size: 17, align: 'right' });
    }
    if (t > 0.02) { plot(ctx, g, (s) => temp(TH.v, s), rH, { w: 5, x: [0, t] }); plot(ctx, g, (s) => temp(TL.v, s), rL, { w: 5, x: [0, t] }); }
    dot(ctx, g.X(t), g.Y(h), rH, true, 9); dot(ctx, g.X(t), g.Y(l), rL, true, 9);
    const apart = Math.abs(g.Y(h) - g.Y(l)) > 30, up = h >= l ? -1 : 1;
    text(ctx, 'H', g.X(t) + 16, g.Y(h) + (apart ? 0 : 13 * up), rH, { size: 20, weight: 600, bg: PAL.panel });
    text(ctx, 'L', g.X(t) + 16, g.Y(l) - (apart ? 0 : 13 * up), rL, { size: 20, weight: 600, bg: PAL.panel });
    const hot = dT >= 0 ? 'H' : 'L', cold = dT >= 0 ? 'L' : 'H';
    topline(ctx, !touching ? (same ? 'H and L are at the same temperature and not yet in contact.' : 'H and L are at different temperatures and not yet in contact.')
      : flowing ? `In contact, heat flows from ${hot} to ${cold}: ${hot} cools and ${cold} warms.`
      : TH.v === TL.v ? 'H and L were already at the same temperature, so no heat flows between them.'
      : 'Thermal equilibrium: H and L are at the same temperature and heat no longer flows.');
    /* the true ratio of the molecules' average speeds, the square root of the ratio of the kelvin temperatures the samples started at */
    const hi = Math.max(TH.v, TL.v), lo = Math.min(TH.v, TL.v), pct = Math.round((Math.sqrt((hi + 273.15) / (lo + 273.15)) - 1) * 100);
    const TeX = (who, v) => `\\kT_{\\htmlData{ref=sample-${who.toLowerCase()}}{\\text{${who}}}}` + (v == null ? '' : ` = ${hue('temperature', v + '\\ {}^{\\circ}\\text{C}')}`);
    readout(d.readout, same ? `${TeX('H')} = ${TeX('L', hs)}` : `${TeX(hot, dT >= 0 ? hs : ls)} > ${TeX(cold, dT >= 0 ? ls : hs)}`,
      hi === lo ? '' : `The difference in speed is drawn larger than it is: at ${hi} °C a water molecule moves on average only ${pct < 1 ? 'a fraction of a percent' : pct + '%'} faster than at ${lo} °C.`, { values: false });
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();

/* =====================================================================
   SIM: heating a sample, q = c × m × ΔT. A substance from Table 5.1, a
   mass and a temperature change; the heat is a point on the straight
   line q = C ΔT whose slope is the heat capacity. The two cast iron
   frying pans of the text (808 g and 4040 g) are fixed dashed lines with
   the book's heats at 50.0 °C marked on them, and detents on the mass
   slider: the sample's line lies on a pan's when it is that mass of iron.
   Still: the relation has no clock. Flat: a relation between quantities.
===================================================================== */
(function () {
  const d = sim('sim-heating', 520);
  /* Table 5.1: name, state, specific heat in J/g °C */
  const SUBS = [['helium', 'g', 5.193], ['water', 'l', 4.184], ['ethanol', 'l', 2.376], ['ice', 's', 2.093], ['water vapor', 'g', 1.864],
    ['nitrogen', 'g', 1.040], ['air', 'g', 1.007], ['oxygen', 'g', 0.918], ['aluminum', 's', 0.897], ['carbon dioxide', 'g', 0.853], ['argon', 'g', 0.522],
    ['iron', 's', 0.449], ['copper', 's', 0.385], ['lead', 's', 0.130], ['gold', 's', 0.129], ['silicon', 's', 0.712]];
  const IRON = 0.449;
  /* the text's two pans: mass in g and the heat in J the book gives for 50.0 °C */
  const PANS = [{ ref: 'small-pan', name: 'small pan', m: 808, q: 18140 }, { ref: 'large-pan', name: 'large pan', m: 4040, q: 90700 }];
  const sub = F.select(d.controls, { label: '\\text{substance}', aria: 'substance heated', value: '11', options: SUBS.map((s, i) => ({ value: String(i), label: s[0] })) });
  const M = ctl(d.controls, { label: '\\km', cls: 'mass', min: 100, max: 5000, step: 1, value: 808, unit: 'g', dec: 0, aria: 'mass of the sample', detents: PANS.map((p) => ({ v: p.m, label: p.name })) });
  const DT = ctl(d.controls, { label: '\\kdT', cls: 'temperature', min: 1, max: 100, step: 0.5, value: 50, unit: '°C', dec: 1, aria: 'temperature change' });
  /* a heat capacity as the book writes one: 363 and 1814 J/°C, a comma from 10,000, three figures below 100 */
  const capS = (c) => (c >= 10000 ? Math.round(c).toLocaleString('en-US') : c >= 100 ? String(Math.round(c)) : sig(c, 3));
  let hits = []; F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c); hits = [];
    const [name, , c] = SUBS[+sub.value], m = M.v, dt = DT.v, q = c * m * dt, Cap = c * m;
    const ce = C('energy'), ct = C('temperature');
    /* the graph: ΔT 0 to 100 °C by 20 from the slider range; q 0 to 100,000 J by 20,000, which holds the large pan's 90,700 J */
    const box = { l: 190, r: 1300, t: 60, b: 430 };
    const g = axes(ctx, box, [0, 100], [0, 100000], { xl: 'ΔT (°C)', xc: ct, yl: 'q (J)', yc: ce, nx: 5, ny: 5, fy: (v) => v.toLocaleString('en-US') });
    /* the sample's line first, the pans' dashes over it, so a sample that is a pan shows both */
    plot(ctx, g, (x) => Cap * x, ce, { w: 5 });
    const entries = PANS.map((p) => {
      const col = F.ref(p.ref), cap = IRON * p.m;
      plot(ctx, g, (x) => cap * x, col, { w: 3, dash: [10, 10] });
      dot(ctx, g.X(50), g.Y(p.q), col, false, 8);
      hits.push({ x: g.X(50), y: g.Y(p.q), r: 14, name: `the ${p.name}: ${p.q.toLocaleString('en-US')} J warms its ${p.m} g of iron by 50.0 °C` });
      return { s: `${p.name}, ${p.m} g of iron`, color: col, w: 3, dash: [10, 10], f: (x) => cap * x };
    });
    line(ctx, g.X(dt), box.b, g.X(dt), g.Y(Math.min(100000, q)), alpha(ct, 0.7), 2, [4, 8]);
    /* the point, dropped to both axes so its heat reads on the q axis; past the frame it is pinned at the edge */
    const p = pinned(ctx, box, g.X, g.Y, dt, q, ce);
    if (!p.out) {
      line(ctx, box.l, p.y, p.x, p.y, alpha(ce, 0.7), 2, [4, 8]);
      hits.push({ x: p.x, y: p.y, r: 12, name: `${fmt(m, 0)} g of ${name} warmed by ${fmt(dt, 1)} °C takes ${sig(q, 4)} J` });
    } else hits.push({ x: p.x, y: p.y, r: 16, name: `${sig(q, 4)} J, above the top of the graph` });
    F.legend(ctx, g, [{ s: 'the sample, slope C', color: ce, w: 5, f: (x) => Cap * x }, ...entries]);
    const J = (s) => s.replace(/,/g, '{,}') + '\\ \\text{J}', deg = (s) => s + '\\ {}^{\\circ}\\text{C}';
    tex(d.readout, `\\kq = \\kcspec \\times \\km \\times \\kdT = ${hue('heat-capacity', fmt(c, 3) + '\\ \\text{J/g}\\,{}^{\\circ}\\text{C}')} \\times ${hue('mass', fmt(m, 0) + '\\ \\text{g}')} \\times ${hue('temperature', deg(fmt(dt, 1)))} = ${hue('energy', J(sig(q, 4)))}`
      + ` \\\\ \\kC = \\frac{\\kq}{\\kdT} = \\frac{${hue('energy', J(sig(q, 4)))}}{${hue('temperature', deg(fmt(dt, 1)))}} = ${hue('heat-capacity', capS(Cap).replace(/,/g, '{,}') + '\\ \\text{J/}{}^{\\circ}\\text{C}')}`);
  }
  register(d.fig, { update: () => {}, draw });
})();
};
