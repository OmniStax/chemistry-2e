/* Figures for section 14.1 Brønsted-Lowry Acids and Bases. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['14.1'] = function (root, F) {
const { C, PAL, alpha, ctl, register, begin, line, text, headline } = F;
const sim = (id, H) => F.sim(root, id, H);
const still = (d, draw) => register(d.fig, { update: () => {}, draw });
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;
const RAD = Math.PI / 180;

/* ---------- Lewis structures, flat, each atom in its molecule's colour ----------
   atoms: [{ s, x, y, c, lp: [angles in degrees, 0 to the right, 90 up] }]; bonds: [[i, j, order, colour]] */
function lewis(ctx, atoms, bonds) {
  const gap = 19;
  bonds.forEach(([i, j, order, c]) => {
    const a = atoms[i], b = atoms[j], dx = b.x - a.x, dy = b.y - a.y, L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L;
    (order === 2 ? [-5, 5] : [0]).forEach((o) => line(ctx, a.x + ux * gap - uy * o, a.y + uy * gap + ux * o, b.x - ux * gap - uy * o, b.y - uy * gap + ux * o, c, 3));
  });
  atoms.forEach((a) => {
    text(ctx, a.s, a.x, a.y + 1, a.c, { size: 28, weight: 600, align: 'center' });
    (a.lp ?? []).forEach((ang) => {
      const cx = Math.cos(ang * RAD), cy = -Math.sin(ang * RAD), r = 25;
      [-6.5, 6.5].forEach((o) => F.dot(ctx, a.x + cx * r - cy * o, a.y + cy * r + cx * o, a.c, true, 3.5));
    });
  });
}
/* square brackets round an ion, its charge at the top right */
function brackets(ctx, x1, x2, y1, y2, q) {
  [[x1, 1], [x2, -1]].forEach(([x, s]) => {
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.beginPath();
    ctx.moveTo(x + s * 12, y1); ctx.lineTo(x, y1); ctx.lineTo(x, y2); ctx.lineTo(x + s * 12, y2); ctx.stroke(); ctx.restore();
  });
  text(ctx, q, x2 + 14, y1 + 6, PAL.ink, { size: 26, weight: 600 });
}
/* the equilibrium arrow, two half-arrows; back > 1 draws the reverse half longer */
function equilibrium(ctx, x1, x2, y, back = 1) {
  const ink = PAL.ink, gap = 6, m = (x1 + x2) / 2, half = (x2 - x1) / 2, f = half / Math.max(1, back), b = half;
  line(ctx, m - f, y - gap, m + f, y - gap, ink, 3); line(ctx, m + f, y - gap, m + f - 16, y - gap - 10, ink, 3);
  line(ctx, m - b, y + gap, m + b, y + gap, ink, 3); line(ctx, m - b, y + gap, m - b + 16, y + gap + 10, ink, 3);
}
/* the book's second row: formulas in ink, each with its role beneath in its pair's colour */
function equationRow(ctx, y, items, plus, arrowAt, back) {
  items.forEach(([s, x, role, c]) => {
    text(ctx, s, x, y, PAL.ink, { size: 26, align: 'center' });
    text(ctx, role, x, y + 40, c, { size: 22, weight: 600, align: 'center' });
  });
  plus.forEach((x) => text(ctx, '+', x, y, PAL.ink, { size: 28, align: 'center' }));
  equilibrium(ctx, arrowAt[0], arrowAt[1], y, back);
}

/* =====================================================================
   H2O + H2O ⇌ H3O+ + OH-, the book's Water_img, faithful: the reverse
   half of the arrow drawn the longer, as printed. The image puts the
   hydroxide's minus on its hydrogen; it is drawn on the bracket.
===================================================================== */
(function () {
  const H = 330, d = sim('fig-water-water', H);
  function draw() {
    const { ctx } = begin(d.c), A = F.ref('water-acid'), B = F.ref('water-base'), Y = 112, L = 72;
    const water = (x, c) => lewis(ctx, [{ s: 'O', x, y: Y, c, lp: [180, 270] }, { s: 'H', x, y: Y - L, c }, { s: 'H', x: x + L, y: Y, c }], [[0, 1, 1, c], [0, 2, 1, c]]);
    water(110, A);
    text(ctx, '+', 270, Y, PAL.ink, { size: 30, align: 'center' });
    water(390, B);
    equilibrium(ctx, 560, 730, Y, 1.6);
    const h3o = [{ s: 'O', x: 900, y: Y, c: B, lp: [270] }, { s: 'H', x: 900, y: Y - L, c: B }, { s: 'H', x: 900 + L, y: Y, c: B }, { s: 'H', x: 900 - L, y: Y, c: A }];
    lewis(ctx, h3o, [[0, 1, 1, B], [0, 2, 1, B], [0, 3, 1, A]]);
    brackets(ctx, 805, 995, Y - L - 26, Y + 48, '+');
    text(ctx, '+', 1085, Y, PAL.ink, { size: 30, align: 'center' });
    lewis(ctx, [{ s: 'O', x: 1180, y: Y, c: A, lp: [90, 180, 270] }, { s: 'H', x: 1180 + L, y: Y, c: A }], [[0, 1, 1, A]]);
    brackets(ctx, 1135, 1277, Y - 40, Y + 40, '⁻');
    equationRow(ctx, 238, [['H_{2}O', 130, 'Acid', A], ['H_{2}O', 410, 'Base', B], ['H_{3}O⁺', 900, 'Acid', B], ['OH⁻', 1206, 'Base', A]], [270, 1085], [560, 730], 1.6);
  }
  still(d, draw);
})();

/* =====================================================================
   SIM: Kw = [H3O+][OH-]. On logarithmic axes, log[OH-] = log Kw -
   log[H3O+], a line of slope -1 that the temperature lifts. Axes fixed
   at 1e-14 to 1 M both ways, so for the slider's 1e-12 to 1e-2 M the
   point stays in the box at every temperature (at 100 °C, [OH-] reaches
   10^-0.25 M). Kw only at the book's five temperatures: 25 and 100 °C
   from the text, 80 °C from the Check Your Learning, 40 and 60 °C from
   exercise 14; nothing is interpolated between them. The dashed circle
   is pure water, log sqrt(Kw). Still: the relation answers its controls.
===================================================================== */
(function () {
  const H = 520, d = sim('sim-kw', H);
  const KW = { 25: 1.0e-14, 40: 2.9e-14, 60: 9.3e-14, 80: 2.4e-13, 100: 5.6e-13 };
  const LOG = Object.fromEntries(Object.entries(KW).map(([t, k]) => [t, Math.log10(k)]));
  const ro = F.readout(d);
  const G = { l: 210, r: 1250, t: 112, b: 420 };
  const SUP = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
  const sup = (n) => String(n).split('').map((c) => SUP[c]).join('');
  const parts = (v) => { let e = Math.floor(Math.log10(v)), m = +(v / 10 ** e).toFixed(1); if (m >= 10) { m = 1; e += 1; } return [m, e]; };
  const round2 = (v) => { const [m, e] = parts(v); return m * 10 ** e; };
  const sciTxt = (v) => { const [m, e] = parts(v); return `${m.toFixed(1)} × 10${sup(e)}`; };
  const sciTex = (v) => { const [m, e] = parts(v); return `${m.toFixed(1)}\\times 10^{${e}}`; };
  const big = (r) => (r >= 1e4 ? sciTxt(r) : r >= 100 ? String(Math.round(r / 10 ** (Math.floor(Math.log10(r)) - 1)) * 10 ** (Math.floor(Math.log10(r)) - 1)) : r >= 10 ? String(Math.round(r)) : r.toFixed(1));
  const T = F.choice(d.controls, { label: '\\kT', key: 'T', aria: 'the temperature of the water', value: '25',
    options: Object.keys(KW).map((t) => ({ value: t, label: `${t} °C` })),
    onInput: (t) => { if (onWater) h.set(LOG[t] / 2); h.refresh(); draw(); } });
  const h = ctl(d.controls, { label: '\\kconcHyd', cls: 'concentration', key: 'logH', min: -12, max: -2, step: 0.01, value: -7, fmt: (lg) => `${sciTxt(10 ** lg)} M`,
    aria: 'the hydronium ion concentration',
    detents: [{ v: Math.log10(2.0e-6), label: '2.0 × 10⁻⁶ M' }],
    specials: [{ at: () => LOG[T.value] / 2, label: 'pure water' }], onInput: () => draw() });
  let onWater = true, hits = [];
  F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c);
    const t = T.value, K = KW[t], L = T.mix((v) => LOG[v]);
    onWater = Math.abs(h.v - LOG[t] / 2) < 0.006;
    const x = onWater ? LOG[t] / 2 : h.v;
    const cc = C('concentration'), ck = C('equilibrium-constant');
    const g = F.axes(ctx, G, [-14, 0], [-14, 0], { nx: 14, ny: 14, fx: (v) => (Math.round(v) % 2 ? '' : '10' + sup(Math.round(v))), fy: (v) => (Math.round(v) % 2 ? '' : '10' + sup(Math.round(v))),
      xl: '[H_{3}O⁺] (M)', xc: cc, yl: '[OH⁻] (M)', yc: cc });
    const seg = (lk) => [Math.max(-14, lk), Math.min(0, lk + 14)];
    line(ctx, g.X(-14), g.Y(-14), g.X(0), g.Y(0), alpha(PAL.ink, 0.35), 2.5, [10, 10]);
    text(ctx, '[OH⁻] = [H_{3}O⁺]', g.X(-3.6) + 14, g.Y(-3.6) + 8, PAL.muted, { size: 17, base: 'top' });
    const warm = t !== '25' || T.k < 1;
    if (warm) {
      const [a, b] = seg(LOG[25]);
      F.faded(ctx, t !== '25' ? 1 : 1 - T.k, [0, 0], () => line(ctx, g.X(a), g.Y(LOG[25] - a), g.X(b), g.Y(LOG[25] - b), alpha(ck, 0.45), 3, [10, 10]));
      F.legend(ctx, G, [{ s: `K_{w} at ${t} °C`, color: ck, w: 5 }, { s: 'K_{w} at 25 °C', color: alpha(ck, 0.45), w: 3, dash: [10, 10] }], { corner: 'above' });
    }
    const [a, b] = seg(L);
    F.curve(ctx, (u) => L - u, a, b, g.X, g.Y, ck, 5);
    const lx = x > L / 2 ? L + 3 : L + 10.5;   /* the value on the half of the line the point is not on */
    text(ctx, `$\\kKw = ${sciTex(K)}$`, g.X(lx) + 12, g.Y(L - lx) - 30, ck, { size: 22, tex: true, bg: PAL.panel });
    F.dot(ctx, g.X(L / 2), g.Y(L / 2), ck, false, 10);
    const y = L - x, inside = y <= 0;
    if (inside) {
      line(ctx, g.X(x), g.Y(y), g.X(x), G.b, alpha(cc, 0.6), 2.5, [4, 8]);
      line(ctx, G.l, g.Y(y), g.X(x), g.Y(y), alpha(cc, 0.6), 2.5, [4, 8]);
    }
    const p = F.pinned(ctx, G, g.X, g.Y, x, y, cc);
    const Hv = round2(10 ** x), Ov = round2(K / Hv);
    /* each value on its drop line at the frame's edge, or beside the point where the point is near that edge */
    const sH = `${sciTxt(Hv)} M`, sO = `${sciTxt(Ov)} M`, wO = F.measure(ctx, sO, { size: 17, weight: 600 });
    const xLow = G.b - p.y < 56, yLeft = p.x - G.l < wO + 40;
    text(ctx, sH, Math.min(Math.max(p.x, G.l + 80), G.r - 80), xLow ? p.y - 30 : G.b - 18, cc, { size: 17, weight: 600, align: 'center', bg: PAL.panel });
    text(ctx, sO, yLeft ? p.x + 18 : G.l + 12, Math.min(Math.max(p.y, G.t + 30), G.b - 46) + (yLeft ? -26 : 0), cc, { size: 17, weight: 600, bg: PAL.panel });
    hits = [{ x: g.X(L / 2), y: g.Y(L / 2), r: 16, name: `pure water at ${t} °C` },
      { x: p.x, y: p.y, r: 16, name: `the solution: [H₃O⁺] = ${sciTxt(Hv)} M, [OH⁻] = ${sciTxt(Ov)} M` }];
    const r = Hv / Ov;
    headline(ctx, onWater
      ? `At ${t} °C, pure water holds equal concentrations of hydronium and hydroxide ions, ${sciTxt(Hv)} M each.`
      : r >= 1 ? `At ${t} °C there is ${big(r)} times as much hydronium ion as hydroxide ion.`
        : `At ${t} °C there is ${big(1 / r)} times as much hydroxide ion as hydronium ion.`);
    const k = hue('equilibrium-constant', sciTex(K)), hv = hue('concentration', sciTex(Hv)), ov = hue('concentration', sciTex(Ov));
    ro.set(onWater
      ? `\\mk{H}{\\kconcHyd} = \\mk{O}{\\kconcOH} = \\sqrt{\\mk{K}{\\kKw}} = \\sqrt{\\mk{Kv}{${k}}} = \\mk{Ov}{${ov}}\\ M`
      : `\\mk{O}{\\kconcOH} = \\frac{\\mk{K}{\\kKw}}{\\mk{H}{\\kconcHyd}} = \\frac{\\mk{Kv}{${k}}}{\\mk{Hv}{${hv}}} = \\mk{Ov}{${ov}}\\ M`, undefined, { form: onWater });
  }
  still(d, draw);
})();
};
