/* Figures for section 18.7 Occurrence, Preparation, and Properties of Nitrogen. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['18.7'] = function (root, F) {
const { C, PAL, ctl, tex, register, begin, line, text, topline, alpha } = F;
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;
const NO2_BROWN = '#8b4a1c';                         /* the colour of nitrogen dioxide gas */
const TAU = 2 * Math.PI;
function rng(seed) { let a = seed >>> 0; return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

/* =====================================================================
   SIM: 2NO₂ ⇌ N₂O₄ in a graduated cylinder closed by a piston, drawn flat
   so every molecule is seen, beside the share of the molecules that are
   NO₂ against temperature at the volume set. K_P = 6.86 at 298 K (the
   book's), and K_P(T) by van 't Hoff from ΔH = −57.20 kJ for the
   dimerization (13.3's +57.20 kJ for N₂O₄ ⟶ 2NO₂). The vessel holds A0
   mol of N₂O₄ units, A0 chosen so the total pressure is 1.000 atm at
   298 K and 1.00 L. With S = A0 RT/V: P_N2O4 + P_NO2/2 = S and
   P_N2O4 = K P_NO2². Sixteen pair slots, eight columns by two rows, the
   number joined the nearest whole number to 16 × the share of nitrogen in
   N₂O₄; a tween walks the count so the pairs join or split one after
   another. Each NO₂ carries a glow of its brown, so the gas is as brown
   as its NO₂ is many and crowded. The gas's height is 245 units a litre.
   Axes fixed: 270 to 370 K (the slider's range) and 0 to 100%.
===================================================================== */
(function () {
  const d = F.sim(root, 'sim-no2-dimer', 700);
  const R = 0.082057, R8 = 8.314, DH = 57200, K0 = 6.86, T0 = 298, NS = 16, COLS = 8;
  const x0 = (-1 + Math.sqrt(1 + 4 * K0)) / (2 * K0), A0 = (1 - x0 / 2) / (R * T0);
  const KP = (t) => K0 * Math.exp((DH / R8) * (1 / t - 1 / T0));
  function at(t, v) {
    const k = KP(t), S = (A0 * R * t) / v;
    const no2 = (-0.5 + Math.sqrt(0.25 + 4 * k * S)) / (2 * k), n2o4 = k * no2 * no2;
    return { t, k, no2, n2o4, share: (100 * no2) / (no2 + n2o4), joined: Math.round((NS * n2o4) / (n2o4 + no2 / 2)) };
  }
  const tS = ctl(d.controls, { label: '\\kT', cls: 'temperature', min: 270, max: 370, step: 1, value: 298, unit: 'K', dec: 0, specials: [{ at: 298, label: 'room temperature' }], onInput: settle, aria: 'temperature in kelvins' });
  const vS = ctl(d.controls, { label: '\\kV', cls: 'volume', min: 0.5, max: 2, step: 0.01, value: 1, unit: 'L', dec: 2, onInput: settle, aria: 'volume of the gas in liters' });
  const state = () => at(tS.v, vS.v);
  let target = state().joined;
  const jt = F.tween(d, target);
  function settle() { const j = state().joined; if (j !== target) { target = j; jt.to(j, 900); } }
  const P = F.drag(d, { x: tS, y: (t) => at(t, vS.v).share });
  /* the cylinder: walls, floor, the gas's height per litre; the graph beside it */
  const WL = 100, WR = 644, FLOOR = 650, PERL = 245, WT = 148, Z = 0.85, G = { l: 965, r: 1330, t: 190, b: 610 };
  /* sixteen slots, each with its place in its cell, its tilt, the turn of its two free molecules and its rank in the joining */
  const rand = rng(1807);
  const slots = Array.from({ length: NS }, (_, i) => ({ c: i % COLS, r: Math.floor(i / COLS), fx: rand() - 0.5, fy: rand() - 0.5, th: (rand() - 0.5) * 0.6, ra: (rand() - 0.5) * 2.6, rb: (rand() - 0.5) * 2.6, k: 0 }));
  slots.map((_, i) => i).sort(() => rand() - 0.5).forEach((i, k) => { slots[i].k = k; });
  /* the molecules as the book draws them, space-filling */
  const ball = (ctx, e, x, y, r) => { ctx.save(); ctx.fillStyle = F.el(e); ctx.strokeStyle = alpha(PAL.ink, 0.55); ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore(); };
  /* one NO₂, its N at (x, y) and its two O on the side away from th, 134° apart */
  function no2(ctx, x, y, th, z = 1) {
    [1, -1].forEach((sg) => { const a = th + Math.PI + sg * 1.17; ball(ctx, 'O', x + 15 * z * Math.cos(a), y + 15 * z * Math.sin(a), 10 * z); });
    ball(ctx, 'N', x, y, 10.5 * z);
  }
  function n2o4(ctx, x, y, th, z = 1) { [1, -1].forEach((sg) => no2(ctx, x + sg * 9 * z * Math.cos(th), y + sg * 9 * z * Math.sin(th), th + (sg > 0 ? Math.PI : 0), z)); }
  let hits = [];
  F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c); hits = [];
    const s = state(), top = FLOOR - PERL * vS.v, gh = FLOOR - top, brown = F.fact(NO2_BROWN);
    const cN = F.ref('no2'), cD = F.ref('n2o4'), cV = C('volume'), cT = C('temperature');
    /* where every molecule is: a pair's axis stands upright in its cell, and the two NO₂ part along it by what the height allows */
    const cw = (WR - WL - 8) / COLS, ch = (gh - 8) / 2, gap = Math.max(10, Math.min(36, ch - 46)), room = Math.max(0, Math.min(1, (gap - 12) / 20));
    const free = [], pairs = [];
    let joined = 0;
    slots.forEach((q) => {
      const j = Math.max(0, Math.min(1, jt.v - q.k)), e = j * j * (3 - 2 * j);
      const cx = WL + 4 + (q.c + 0.5) * cw + q.fx * 10, cy = top + 4 + (q.r + 0.5) * ch + q.fy * Math.max(0, ch - 56 - gap);
      const th = Math.PI / 2 + q.th * 1.6 * Math.max(room, e), ux = Math.cos(th), uy = Math.sin(th);
      if (j >= 1) { joined += 1; pairs.push({ x: cx, y: cy, th }); return; }
      const off = 9 * Z + (gap / 2) * (1 - e);
      [1, -1].forEach((sg) => free.push({ x: cx + sg * off * ux, y: cy + sg * off * uy, th: th + (sg > 0 ? Math.PI : 0) + (sg > 0 ? q.ra : q.rb) * room * (1 - e), glow: 1 - e }));
    });
    /* the brown of the gas: a glow round each NO₂, none round N₂O₄ */
    ctx.save(); ctx.beginPath(); ctx.rect(WL, top, WR - WL, gh); ctx.clip();
    free.forEach((m) => { const g = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, 120); g.addColorStop(0, alpha(brown, 0.32 * m.glow)); g.addColorStop(0.5, alpha(brown, 0.16 * m.glow)); g.addColorStop(1, alpha(brown, 0)); ctx.fillStyle = g; ctx.fillRect(m.x - 120, m.y - 120, 240, 240); });
    ctx.restore();
    pairs.forEach((m) => { n2o4(ctx, m.x, m.y, m.th, Z); hits.push({ x: m.x, y: m.y, r: 26, name: 'N₂O₄, colorless' }); });
    free.forEach((m) => { no2(ctx, m.x, m.y, m.th, Z); hits.push({ x: m.x, y: m.y, r: 20, name: 'NO₂, brown' }); });
    /* the cylinder with its graduations, the piston, its rod and handle */
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 4; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(WL - 2, WT); ctx.lineTo(WL - 2, FLOOR + 2); ctx.lineTo(WR + 2, FLOOR + 2); ctx.lineTo(WR + 2, WT); ctx.stroke(); ctx.restore();
    for (let v = 0.25; v <= 2.001; v += 0.25) { const y = FLOOR - PERL * v, whole = Math.abs(v * 2 - Math.round(v * 2)) < 1e-6; line(ctx, WL - (whole ? 20 : 12), y, WL - 4, y, cV, 2); if (whole) text(ctx, `${v.toFixed(1)} L`, WL - 28, y, cV, { size: 17, align: 'right', base: 'middle' }); }
    hits.push({ x: WL - 30, y: (WT + FLOOR) / 2, r: 30, name: 'the volume of the gas, read at the piston' });
    const mid = (WL + WR) / 2;
    ctx.save(); ctx.fillStyle = F.mixColor(PAL.ink, PAL.panel, 0.6); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2; ctx.lineJoin = 'round';
    [[mid - 8, top - 76, 16, 58], [mid - 50, top - 88, 100, 12], [WL + 1, top - 20, WR - WL - 2, 20]].forEach(([x, y, w, h]) => { ctx.beginPath(); ctx.roundRect(x, y, w, h, 3); ctx.fill(); ctx.stroke(); });
    ctx.restore();
    hits.push({ x: mid - 160, y: top - 10, r: 16, name: 'the piston' }, { x: mid + 160, y: top - 10, r: 16, name: 'the piston' }, { x: mid, y: top - 50, r: 30, name: 'the piston' }, { x: WR, y: FLOOR - 30, r: 16, name: 'the sealed cylinder' });
    const drawn = Math.round(jt.v);
    F.rich(ctx, [[String(2 * (NS - drawn)), cN], ' NO₂ and ', [String(drawn), cD], ' N₂O₄'], mid, FLOOR + 34, { size: 20, align: 'center' });
    /* the reaction and the key, between the cylinder and the graph */
    text(ctx, '2NO₂ ⇌ N₂O₄', 780, 330, PAL.ink, { size: 24, weight: 600, align: 'center' });
    F.legend(ctx, { l: 690, r: 870, t: 360, b: 470 }, [
      { s: 'NO₂, brown', draw: (g, x, y) => { const gr = g.createRadialGradient(x + 8, y + 11, 0, x + 8, y + 11, 30); gr.addColorStop(0, alpha(brown, 0.55)); gr.addColorStop(1, alpha(brown, 0)); g.fillStyle = gr; g.fillRect(x - 22, y - 19, 60, 60); no2(g, x + 8, y + 8, -Math.PI / 2, 0.62); } },
      { s: 'N₂O₄, colorless', draw: (g, x, y) => n2o4(g, x + 8, y + 11, 0, 0.62) },
    ], { corner: 'top', panel: false });
    /* the share of the molecules that are NO₂ against temperature, at this volume */
    const ax = F.axes(ctx, G, [270, 370], [0, 100], { nx: 5, ny: 5, xl: 'temperature (K)', xc: cT, yl: `molecules that are NO₂ (%), at ${vS.v.toFixed(2)} L`, yc: PAL.ink });
    const f = (t) => at(t, vS.v).share;
    F.shade(ctx, ax, f, 0, 270, 370, brown, { alpha: 0.32 });
    line(ctx, ax.X(298), G.t, ax.X(298), G.b, alpha(PAL.ink, 0.4), 2, [10, 10]);
    text(ctx, 'room temperature', ax.X(298) + 10, G.t + 16, PAL.muted, { size: 17 });
    F.plot(ctx, ax, f, cN, { w: 5 });
    text(ctx, 'NO₂', ax.X(352), ax.Y(f(352) / 2), cN, { size: 22, weight: 600, align: 'center', base: 'middle' });
    text(ctx, 'N₂O₄', ax.X(289), ax.Y((100 + f(289)) / 2), cD, { size: 22, weight: 600, align: 'center', base: 'middle', bg: PAL.panel });
    const px = ax.X(s.t), py = ax.Y(s.share);
    line(ctx, G.l, py, px, py, alpha(PAL.ink, 0.4), 2, [4, 8]); line(ctx, px, py, px, G.b, alpha(PAL.ink, 0.4), 2, [4, 8]);
    P.draw(ctx, ax, cN);
    const pct = `${Math.round(s.share)}%`;
    const lf = px < G.l + 80;
    text(ctx, pct, px + (lf ? 18 : -16), py + (lf ? 26 : -22), cN, { size: 22, weight: 600, align: lf ? 'left' : 'right', bg: PAL.panel });
    hits.push({ x: px, y: py, r: 18, name: `${pct} of the molecules are NO₂ at ${s.t} K` });
    topline(ctx, `At ${s.t} K and ${(s.no2 + s.n2o4).toFixed(2)} atm, ${pct} of the molecules are brown NO_{2}.`);
    const f4 = (q) => `${q.toPrecision(4)}\\ \\text{atm}`;
    tex(d.readout, `\\kKP = \\dfrac{\\kP_{\\text{N}_2\\text{O}_4}}{\\kP_{\\text{NO}_2}^{2}} = \\dfrac{${hue('pressure', f4(s.n2o4))}}{(${hue('pressure', f4(s.no2))})^{2}} = ${hue('equilibrium-constant', s.k.toPrecision(3))}`);
  }
  register(d.fig, { update: () => {}, draw });
})();
};
