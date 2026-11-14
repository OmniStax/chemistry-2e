/* Figures for section 18.7 Occurrence, Preparation, and Properties of Nitrogen. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['18.7'] = function (root, F) {
const { C, PAL, ctl, tex, register, begin, line, text, topline, alpha } = F;
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;
const NO2_BROWN = '#8b4a1c';                         /* the colour of nitrogen dioxide gas */
const TAU = 2 * Math.PI;
function rng(seed) { let a = seed >>> 0; return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

/* =====================================================================
   SIM: 2NO₂ ⇌ N₂O₄ in a sealed cylinder closed by a piston, drawn flat so
   every molecule is seen. K_P = 6.86 at 298 K (the book's), and K_P(T) by
   van 't Hoff from ΔH = −57.20 kJ for the dimerization (13.3's +57.20 kJ
   for N₂O₄ ⟶ 2NO₂). The vessel holds A0 mol of N₂O₄ units, A0 chosen so
   the total pressure is 1.000 atm at 298 K and 1.00 L. With S = A0 RT/V:
   P_N2O4 + P_NO2/2 = S and P_N2O4 = K P_NO2². Sixteen pair slots, the
   number joined the nearest whole number to 16 × the share of nitrogen in
   N₂O₄; a tween walks the count so the pairs join or split one after
   another. The gas's height is 220 units per litre. Beside it, the two
   partial pressures as bars on 0 to 3.5 atm (largest, P_NO2 = 3.01 atm at
   373 K and 0.50 L). The tint follows [NO₂] = P_NO2 / RT.
===================================================================== */
(function () {
  const d = F.sim(root, 'sim-no2-dimer', 640);
  const R = 0.082057, R8 = 8.314, DH = 57200, K0 = 6.86, T0 = 298, NS = 16;
  const x0 = (-1 + Math.sqrt(1 + 4 * K0)) / (2 * K0), A0 = (1 - x0 / 2) / (R * T0);
  const KP = (t) => K0 * Math.exp((DH / R8) * (1 / t - 1 / T0));
  const tS = ctl(d.controls, { label: '\\kT', cls: 'temperature', min: 273, max: 373, step: 1, value: 298, unit: 'K', dec: 0, specials: [{ at: 298, label: 'room temperature' }], onInput: settle, aria: 'temperature in kelvins' });
  const vS = ctl(d.controls, { label: '\\kV', cls: 'volume', min: 0.5, max: 2, step: 0.01, value: 1, unit: 'L', dec: 2, onInput: settle, aria: 'volume of the vessel in liters' });
  function state() {
    const t = tS.v, k = KP(t), S = (A0 * R * t) / vS.v;
    const no2 = (-0.5 + Math.sqrt(0.25 + 4 * k * S)) / (2 * k), n2o4 = k * no2 * no2;
    return { t, k, no2, n2o4, joined: Math.round((NS * n2o4) / (n2o4 + no2 / 2)), conc: no2 / (R * t) };
  }
  let target = state().joined;
  const jt = F.tween(d, target);
  function settle() { const j = state().joined; if (j !== target) { target = j; jt.to(j, 900); } }
  /* the cylinder: walls, floor, the gas's height per litre */
  const WL = 130, WR = 650, FLOOR = 600, PERL = 220;
  /* sixteen slots on a jittered 6 × 3 grid of the gas, as fractions of its width and height */
  const rand = rng(1807), cells = [];
  for (let r = 0; r < 3; r++) for (let c = 0; c < 6; c++) cells.push([(c + 0.5) / 6 + (rand() - 0.5) * 0.04, (r + 0.5) / 3 + (rand() - 0.5) * 0.12]);
  for (let i = cells.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [cells[i], cells[j]] = [cells[j], cells[i]]; }
  const slots = cells.slice(0, NS).map((p) => ({ p, a: [(rand() - 0.5) * 1.2, (rand() - 0.5) * 1.2, (rand() - 0.5) * 1.2], dy: (rand() - 0.5) * 0.5 }));
  const order = slots.map((_, i) => i);
  for (let i = NS - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [order[i], order[j]] = [order[j], order[i]]; }
  /* the molecules as the book draws them, space-filling: atoms [element, radius, dx, dy] */
  const NO2 = [['O', 10, -13, 7], ['O', 10, 13, 7], ['N', 10.5, 0, -2]];
  const N2O4 = [['O', 10, -22, -12], ['O', 10, -22, 12], ['O', 10, 22, -12], ['O', 10, 22, 12], ['N', 10.5, -9, 0], ['N', 10.5, 9, 0]];
  function mol(ctx, x, y, atoms, a = 0) {
    const co = Math.cos(a), si = Math.sin(a);
    atoms.forEach(([e, r, dx, dy]) => { const px = x + dx * co - dy * si, py = y + dx * si + dy * co;
      ctx.save(); ctx.beginPath(); ctx.arc(px, py, r, 0, TAU); ctx.fillStyle = F.el(e); ctx.fill(); ctx.lineWidth = 1.2; ctx.strokeStyle = alpha(PAL.ink, 0.5); ctx.stroke(); ctx.restore(); });
  }
  const hits = []; F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c); hits.length = 0;
    const s = state(), top = FLOOR - PERL * vS.v, gh = FLOOR - top;
    /* the gas, tinted by NO₂'s brown in proportion to how much of it there is */
    ctx.save(); ctx.fillStyle = alpha(F.fact(NO2_BROWN), 0.04 + 0.6 * (1 - Math.exp(-s.conc / 0.03))); ctx.fillRect(WL, top, WR - WL, gh); ctx.restore();
    hits.push({ x: WL + 30, y: FLOOR - 30, r: 24, name: 'the gas in the sealed cylinder' });
    /* the molecules: pair i joined while the count has passed it, two NO₂ drawn apart otherwise */
    const pad = 22, X = (f) => WL + pad + f * (WR - WL - 2 * pad), Y = (f) => top + pad + f * (gh - 2 * pad);
    order.forEach((i, rank) => {
      const sl = slots[i], p = Math.max(0, Math.min(1, jt.v - rank)), cx = X(sl.p[0]), cy = Y(sl.p[1]);
      if (p >= 1) { mol(ctx, cx, cy, N2O4, sl.a[0]); hits.push({ x: cx, y: cy, r: 30, name: 'a molecule of dinitrogen tetraoxide, N₂O₄' }); return; }
      const spread = 1 - 0.6 * p, dx = 26 * spread, dy = sl.dy * Math.min(gh - 2 * pad, 120) * 0.5 * spread;
      [-1, 1].forEach((sg, j) => { const x = cx + sg * dx, y = Math.max(top + pad, Math.min(FLOOR - pad, cy + sg * dy));
        mol(ctx, x, y, NO2, sl.a[1 + j]); hits.push({ x, y, r: 18, name: 'a molecule of nitrogen dioxide, NO₂' }); });
    });
    /* the cylinder, the piston and its rod */
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(WL, 96); ctx.lineTo(WL, FLOOR); ctx.lineTo(WR, FLOOR); ctx.lineTo(WR, 96); ctx.stroke(); ctx.restore();
    ctx.save(); ctx.fillStyle = F.mixColor(PAL.ink, PAL.panel, 0.55); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2;
    ctx.fillRect(WL + 2, top - 20, WR - WL - 4, 20); ctx.strokeRect(WL + 2, top - 20, WR - WL - 4, 20);
    ctx.fillRect((WL + WR) / 2 - 9, 70, 18, top - 90); ctx.strokeRect((WL + WR) / 2 - 9, 70, 18, top - 90); ctx.restore();
    hits.push({ x: WL + 60, y: top - 10, r: 14, name: 'the piston' }, { x: (WL + WR) / 2, y: (top + 70) / 2, r: 14, name: 'the piston rod' });
    text(ctx, '2NO₂ ⇌ N₂O₄', WR + 22, 112, PAL.ink, { size: 24, weight: 600 });
    /* the partial pressures as two bars beside the cylinder, on 0 to 3.5 atm */
    const ax = F.axes(ctx, { l: 900, r: 1300, t: 190, b: FLOOR }, [0, 1], [0, 3.5], { nx: 0, ny: 7, yl: 'partial pressure (atm)', yc: C('pressure') });
    [[s.n2o4, 'n2o4', 'N₂O₄', 1000], [s.no2, 'no2', 'NO₂', 1200]].forEach(([p, id, name, x]) => {
      ctx.save(); ctx.fillStyle = F.ref(id); ctx.fillRect(x - 50, ax.Y(p), 100, FLOOR - ax.Y(p)); ctx.restore();
      text(ctx, name, x, FLOOR + 26, F.ref(id), { size: 22, weight: 600, align: 'center' });
      text(ctx, `${p.toPrecision(3)} atm`, x, ax.Y(p) - 16, PAL.ink, { size: 19, align: 'center', bg: PAL.panel });
      hits.push({ x, y: (ax.Y(p) + FLOOR) / 2, r: 40, name: `the partial pressure of ${name}, ${p.toPrecision(3)} atm` });
    });
    const share = Math.round((100 * s.no2) / (s.no2 + s.n2o4));
    topline(ctx, `At ${s.t} K and ${vS.v.toFixed(2)} L, ${share}% of the molecules are brown NO₂ and ${100 - share}% colorless N₂O₄.`);
    const f4 = (q) => q.toPrecision(4);
    tex(d.readout, `\\kKP = \\dfrac{\\kP_{\\text{N}_2\\text{O}_4}}{\\kP_{\\text{NO}_2}^{2}} = \\dfrac{${hue('pressure', f4(s.n2o4))}}{(${hue('pressure', f4(s.no2))})^{2}} = ${hue('equilibrium-constant', s.k.toPrecision(3))}`);
  }
  register(d.fig, { update: () => {}, draw });
})();
};
