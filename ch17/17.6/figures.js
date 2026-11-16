/* Figures for section 17.6 Corrosion. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['17.6'] = function (root, F) {
const { PAL, C, alpha, register, begin, line, text } = F;
const sim = (id, H) => F.sim(root, id, H);
const TAU = 2 * Math.PI;
const frac = (x) => x - Math.floor(x);
const clamp01 = (x) => Math.min(1, Math.max(0, x));
const lerp = (a, b, k) => a + (b - a) * k;
const RUST = '#7b3f1d';                         /* the brown of rust, Fe₂O₃·xH₂O */
const hash = (i) => frac(Math.sin(i * 127.1 + 311.7) * 43758.5453);

/* one atom or ion: a filled ball in its element colour, ink rim */
function ball(ctx, x, y, r, c, a = 1) {
  if (a <= 0.01) return;
  ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = c; ctx.strokeStyle = alpha(PAL.ink, 0.55); ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore();
}
/* the page's ink or panel colour, whichever has the greater contrast on a ball of colour col */
function onBall(ctx, col) {
  const lin = (v) => (v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
  const lum = (c) => { ctx.save(); ctx.fillStyle = c; const h = String(ctx.fillStyle); ctx.restore(); const m = /^#(..)(..)(..)$/.exec(h); return m ? 0.2126 * lin(parseInt(m[1], 16) / 255) + 0.7152 * lin(parseInt(m[2], 16) / 255) + 0.0722 * lin(parseInt(m[3], 16) / 255) : 0.2; };
  const l = lum(col), ratio = (c) => { const k = lum(c); return (Math.max(k, l) + 0.05) / (Math.min(k, l) + 0.05); };
  return ratio(PAL.ink) >= ratio(PAL.panel) ? PAL.ink : PAL.panel;
}
/* a metal ion: its element's ball with the formula written on it */
function ion(ctx, x, y, e, s, a = 1) {
  if (a <= 0.01) return;
  const c = F.el(e);
  ball(ctx, x, y, 24, c, a);
  ctx.save(); ctx.globalAlpha *= a; text(ctx, s, x, y, onBall(ctx, c), { size: 15, weight: 600, align: 'center' }); ctx.restore();
}
const electron = (ctx, x, y, a = 1) => ball(ctx, x, y, 8, F.el('e-'), a);
const o2 = (ctx, x, y, a = 1) => { ball(ctx, x - 9, y, 11, F.el('O'), a); ball(ctx, x + 9, y, 11, F.el('O'), a); };
const h2o = (ctx, x, y, a = 1) => { ball(ctx, x - 11, y + 7, 7, F.el('H'), a); ball(ctx, x + 11, y + 7, 7, F.el('H'), a); ball(ctx, x, y, 11, F.el('O'), a); };
function fillPath(ctx, build, fill, stroke, w = 2, dash) {
  ctx.save(); ctx.beginPath(); build(); ctx.closePath();
  if (fill) { ctx.fillStyle = fill; ctx.fill(); }
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = w; if (dash) ctx.setLineDash(dash); ctx.stroke(); }
  ctx.restore();
}
/* the point a fraction s of the way along a polyline, by length */
function along(pts, s) {
  const seg = pts.slice(1).map((p, i) => Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]));
  let r = clamp01(s) * seg.reduce((a, b) => a + b, 0);
  for (let i = 0; i < seg.length; i++) {
    if (r <= seg[i] || i === seg.length - 1) { const k = Math.min(1, r / seg[i]); return [lerp(pts[i][0], pts[i + 1][0], k), lerp(pts[i][1], pts[i + 1][1], k)]; }
    r -= seg[i];
  }
  return pts[pts.length - 1];
}
/* a cubic Bézier sampled as a polyline */
const bezier = (p0, p1, p2, p3, n = 24) => Array.from({ length: n + 1 }, (_, i) => { const u = i / n, v = 1 - u; return [v * v * v * p0[0] + 3 * v * v * u * p1[0] + 3 * v * u * u * p2[0] + u * u * u * p3[0], v * v * v * p0[1] + 3 * v * v * u * p1[1] + 3 * v * u * u * p2[1] + u * u * u * p3[1]]; });
/* fading in over the first part of a journey and out over the last */
const ends = (u, a = 0.08, b = 0.1) => clamp01(u / a) * clamp01((1 - u) / b);
/* a patch of rust: a lumpy blob on a surface, w wide and h thick, hanging below (dir 1) or standing above (dir −1) the line y */
function rust(ctx, cx, y, w, h, dir = 1) {
  fillPath(ctx, () => { ctx.moveTo(cx - w / 2, y); ctx.bezierCurveTo(cx - w / 2, y + dir * h, cx - w / 6, y + dir * h * 1.25, cx + w / 8, y + dir * h * 0.9); ctx.bezierCurveTo(cx + w / 3, y + dir * h * 1.15, cx + w / 2, y + dir * h * 0.7, cx + w / 2, y); }, F.fact(RUST), alpha(PAL.ink, 0.5), 1.5);
}

/* =====================================================================
   FIGURE 17.16: a coated iron plate in cross section, as the book draws
   it: a drop of water over a scratch in the top coat (the cathodic site,
   bare iron) and a drop under the lower face (the anodic site). Moving
   on a 6 s clock: electrons run through the iron from the anodic site to
   the scratch, O₂ enters the upper drop and leaves as two H₂O, and the
   anode metal's ions leave it. Under paint the iron is the anode: a pit
   eats into it behind the breach and rust gathers where Fe²⁺ meets O₂.
   Under zinc the zinc is the anode: the coat thins and the iron stays
   whole. E° values: the section's −0.44 V and +1.23 V, Table 17.1's
   −0.7618 V for zinc.
===================================================================== */
(function () {
  const H = 640, d = sim('sim-corrosion', H);
  const T = 6;
  const CT = 236, FT = 258, FB = 418, CB = 440;          /* coat top, iron top, iron bottom, coat bottom */
  const SC = [300, 420], BR = [830, 910];                /* the scratch in the top coat, the breach in the bottom paint */
  const OPT = {
    paint: { coat: 'paint layer', el: 'Fe', ion: 'Fe²⁺', E: '-0.44', couple: '\\text{Fe}^{2+}/\\text{Fe}', cell: '+1.67',
      note: 'Iron is the only metal here, so the iron is oxidized.' },
    zinc: { coat: 'zinc coating', el: 'Zn', ion: 'Zn²⁺', E: '-0.7618', couple: '\\text{Zn}^{2+}/\\text{Zn}', cell: '+1.99',
      note: 'Zinc’s $\\kEo$ is below iron’s $-0.44\\ \\text{V}$, so the zinc is oxidized and the iron is not.' },
  };
  const cy = F.cycle(() => T, 1.2);
  const pick = F.choice(d.controls, { label: '\\text{coating}', options: [{ value: 'paint', label: 'paint' }, { value: 'zinc', label: 'zinc' }], value: 'paint', aria: 'the coating on the iron', onInput: () => cy.reset() });
  const ro = F.readout(d);
  let hits = [], lastRo = '';
  F.hover(d.stage, () => hits);

  /* the pit behind the breach, D deep; it undercuts the paint as it grows (g from 0 to 1) */
  const pitPts = (g) => {
    const D = 44 + 70 * g;
    return [[BR[0] - 6 - 18 * g, 0], [BR[0] - 16 - 22 * g, 0.42], [BR[0] + 2 - 10 * g, 0.78], [BR[0] + 26, 1], [BR[0] + 48, 0.84], [BR[0] + 68, 0.97], [BR[1] + 6 + 16 * g, 0.74], [BR[1] + 20 + 22 * g, 0.4], [BR[1] + 6 + 16 * g, 0]].map(([x, f]) => [x, FB - f * D]);
  };
  const pitPath = (ctx, P) => {
    ctx.moveTo(P[0][0], P[0][1]);
    for (let i = 1; i < P.length - 1; i++) ctx.quadraticCurveTo(P[i][0], P[i][1], (P[i][0] + P[i + 1][0]) / 2, (P[i][1] + P[i + 1][1]) / 2);
    ctx.lineTo(P[P.length - 1][0], P[P.length - 1][1]);
  };

  function draw() {
    const { ctx } = begin(d.c);
    const v = pick.value, o = OPT[v], t = cy.now(), s = t / T;
    const water = alpha(PAL.ink, 0.09), waterLine = alpha(PAL.ink, 0.5);
    const iron = F.el('Fe'), zinc = F.el('Zn');
    const D = 44 + 70 * s;
    hits = [];

    /* the two drops: the upper one over the scratch, the lower one under the anodic site */
    fillPath(ctx, () => { ctx.moveTo(170, CT); ctx.bezierCurveTo(140, 56, 670, 56, 640, CT); }, water, waterLine);
    ctx.fillStyle = water; ctx.fillRect(SC[0], CT, SC[1] - SC[0], FT - CT);
    fillPath(ctx, () => { ctx.moveTo(650, CB); ctx.bezierCurveTo(615, 642, 1165, 642, 1130, CB); }, water, waterLine);

    /* the iron, running off both edges, with its pit at the anodic site under scratched paint */
    ctx.fillStyle = PAL.panel; ctx.fillRect(0, FT, 1400, FB - FT);
    ctx.fillStyle = alpha(iron, 0.3); ctx.fillRect(0, FT, 1400, FB - FT);
    line(ctx, 0, FT, 1400, FT, iron, 2); line(ctx, 0, FB, 1400, FB, iron, 2);
    pick.only(ctx, 'paint', () => {
      const P = pitPts(s);
      fillPath(ctx, () => pitPath(ctx, P), PAL.panel, null);
      fillPath(ctx, () => pitPath(ctx, P), water, null);
      ctx.save(); ctx.beginPath(); pitPath(ctx, P); ctx.strokeStyle = iron; ctx.lineWidth = 2.5; ctx.stroke(); ctx.restore();
      ctx.fillStyle = PAL.panel; ctx.fillRect(BR[0], FB - 2, BR[1] - BR[0], CB - FB + 4);
      ctx.fillStyle = water; ctx.fillRect(BR[0], FB - 2, BR[1] - BR[0], CB - FB + 4);
    }, [0, 0]);

    /* the coats: paint or zinc, both scratched on top; the paint breached below, the zinc thinning under the drop */
    const topCoat = (c) => { ctx.fillStyle = c; ctx.fillRect(0, CT, SC[0], FT - CT); ctx.fillRect(SC[1], CT, 1400 - SC[1], FT - CT); };
    pick.only(ctx, 'paint', () => {
      topCoat(PAL.muted);
      ctx.fillStyle = PAL.muted; ctx.fillRect(0, FB, BR[0], CB - FB); ctx.fillRect(BR[1], FB, 1400 - BR[1], CB - FB);
    }, [0, 0]);
    pick.only(ctx, 'zinc', () => {
      topCoat(zinc);
      ctx.fillStyle = water; ctx.fillRect(652, CB - 18, 476, 18);
      const thin = (x) => 16 * s * Math.pow(Math.max(0, 1 - Math.pow((x - 890) / 235, 2)), 1.5);
      fillPath(ctx, () => { ctx.moveTo(0, FB); ctx.lineTo(1400, FB); ctx.lineTo(1400, CB); for (let x = 1400; x >= 0; x -= 10) ctx.lineTo(x, CB - thin(x)); }, zinc, null);
    }, [0, 0]);

    /* rust gathering under the paint at the edge of the lower drop */
    pick.only(ctx, 'paint', () => { const k = clamp01(s * 1.1); rust(ctx, 1050, CB, 44 + 80 * k, 12 + 30 * k); }, [0, 0]);

    /* electrons through the iron, from the anodic site to the bare iron at the scratch */
    const from = v === 'paint' ? [BR[0] + 14, FB - D * 0.86] : [880, FB - 8];
    const path = bezier(from, [760, 300], [540, 340], [374, FT + 12]);
    const eA = clamp01(pick.k * 2 - 1);
    for (let i = 0; i < 9; i++) {
      const u = frac(i / 9 + t / 3), [x, y] = along(path, u);
      electron(ctx, x, y, eA * ends(u, 0.05, 0.05)); hits.push({ x, y, r: 12, name: 'an electron, e⁻' });
    }

    /* O₂ reaching the bare iron at the scratch and leaving as two H₂O */
    for (let i = 0; i < 3; i++) {
      const u = frac(t / 3 + i / 3), x1 = SC[0] + 26 + 34 * i, y1 = FT - 14;
      if (u < 0.55) { const k = u / 0.55, x = lerp(96 + 30 * i, x1, k), y = lerp(70 + 26 * i, y1, k); o2(ctx, x, y, clamp01(u / 0.06)); hits.push({ x, y, r: 20, name: 'an oxygen molecule, O₂' }); }
      else {
        const k = (u - 0.55) / 0.45, a = 1 - clamp01((k - 0.65) / 0.35);
        [[x1 + 30 + 70 * i, 150 - 14 * i], [x1 + 150 + 40 * i, 196 - 20 * i]].forEach(([x2, y2]) => { const x = lerp(x1, x2, k), y = lerp(y1, y2, k); h2o(ctx, x, y, a); hits.push({ x, y, r: 18, name: 'a water molecule, H₂O' }); });
      }
    }

    /* the anode metal's ions leaving it */
    pick.only(ctx, 'paint', () => {
      for (let i = 0; i < 4; i++) {
        const u = frac(t / 3 + i / 4), p = [[BR[0] + 40, FB - D * 0.45], [BR[0] + 40, CB + 34], [950, CB + 78], [1046, CB + 50]];
        const [x, y] = along(p, u);
        ion(ctx, x, y, 'Fe', 'Fe²⁺', ends(u, 0.06, 0.08)); hits.push({ x, y, r: 22, name: 'an iron(II) ion, Fe²⁺' });
      }
      for (let i = 0; i < 2; i++) {
        const u = frac(t / 3 + i / 2 + 0.25), k = clamp01(u / 0.9), x = lerp(1290, 1082, k), y = lerp(600, CB + 52, k);
        o2(ctx, x, y, clamp01(u / 0.06) * (1 - clamp01((u - 0.8) / 0.2))); hits.push({ x, y, r: 20, name: 'an oxygen molecule, O₂' });
      }
    }, [0, 0]);
    pick.only(ctx, 'zinc', () => {
      for (let i = 0; i < 5; i++) {
        const u = frac(t / 3 + i / 5), x0 = 730 + 80 * i, x = x0 + (i - 2) * 8 * u, y = lerp(CB + 14, CB + 118 - 14 * Math.abs(i - 2), u);
        ion(ctx, x, y, 'Zn', 'Zn²⁺', ends(u, 0.06, 0.3)); hits.push({ x, y, r: 22, name: 'a zinc ion, Zn²⁺' });
      }
    }, [0, 0]);

    /* names of the parts, for the pointer */
    hits.push({ x: 150, y: (FT + FB) / 2, r: 60, name: 'iron' }, { x: 620, y: (FT + FB) / 2 + 30, r: 50, name: 'iron' }, { x: 1180, y: (FT + FB) / 2, r: 70, name: 'iron' },
      { x: 400, y: 150, r: 70, name: 'a drop of water' }, { x: 890, y: 540, r: 60, name: 'a drop of water' }, { x: (SC[0] + SC[1]) / 2, y: FT, r: 30, name: 'the cathodic site, bare iron under the scratch' });
    [100, 620, 820, 1100, 1300].forEach((x) => hits.push({ x, y: CT + 11, r: 14, name: o.coat }, { x: x - 60, y: FB + 11, r: 14, name: o.coat }));
    if (v === 'paint') hits.push({ x: 1050, y: CB + 18, r: 34, name: 'rust, Fe₂O₃·xH₂O' }, { x: BR[0] + 30, y: FB - D / 2, r: 36, name: 'the anodic site, a pit in the iron' });
    else hits.push({ x: 890, y: FB + 8, r: 22, name: 'the anodic site, zinc under the drop' });

    /* labels: each site with its half-reaction beside its drop, then the parts */
    F.rich(ctx, [['cathodic site', PAL.ink], '   O₂ + 4H⁺ + 4e⁻ ⟶ 2H₂O'], 405, 34, { size: 22, align: 'center' });
    F.rich(ctx, [['anodic site', PAL.ink], `   ${o.el} ⟶ ${o.ion} + 2e⁻`], 890, 616, { size: 22, align: 'center' });
    F.label(ctx, 'water', 606, 150, { side: 'right', gap: 90, size: 22 });
    pick.only(ctx, 'paint', () => F.label(ctx, 'paint layer', 960, CT + 6, { side: 'above', gap: 62, size: 22 }), [0, 0]);
    pick.only(ctx, 'zinc', () => F.label(ctx, 'zinc coating', 960, CT + 6, { side: 'above', gap: 62, size: 22 }), [0, 0]);
    text(ctx, 'iron', 1210, (FT + FB) / 2, PAL.ink, { size: 24, weight: 600, align: 'center' });
    pick.only(ctx, 'paint', () => F.label(ctx, 'rust', 1100, CB + 26, { side: 'right', gap: 120, size: 22 }), [0, 0]);

    /* the particles with no formula written on them */
    F.legend(ctx, { l: 30, r: 560, t: 476, b: 620 }, [{ s: 'electron, e⁻', draw: (g, x, y) => electron(g, x, y) }, { s: 'oxygen, O₂', draw: (g, x, y) => o2(g, x, y) },
      { s: 'water, H₂O', draw: (g, x, y) => h2o(g, x, y - 3) }], { corner: 'bl', panel: false, size: 20 });

    const rtex = `\\kEocell = \\mk{c}{\\kEo{}_{\\text{O}_2/\\text{H}_2\\text{O}}} - \\mk{a}{\\kEo{}_{${o.couple}}} = \\mk{cv}{+1.23\\ \\text{V}} - \\mk{av}{(${o.E}\\ \\text{V})} = \\mk{r}{${o.cell}\\ \\text{V}}`;
    if (rtex !== lastRo) { lastRo = rtex; ro.set(rtex, o.note, { form: v }); }
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();

/* =====================================================================
   FIGURE 17.17: the book's buried iron tank wired to a block of another
   metal, drawn flat from the image: the block on the left with a neck
   where the wire is fastened, the wire up, across and down to a lug on
   the tank, moist soil all round. The choice is the metal of the block.
   Magnesium (the book's) and zinc lie below iron on the E° scale, so the
   block is the anode: it dissolves, its electrons run along the wire to
   the tank and reduce O₂ at the tank's surface, and the tank stays
   whole. Copper lies above iron (exercise 40), so the tank is the anode:
   it pits and rusts, and its electrons run the other way to reduce O₂
   on the copper. Beside the scene the couples stand on one E° scale,
   the arrow from the anode's rung to O₂/H₂O being E°cell. Moving on a
   6 s clock. E° values: the section's −0.44 V and +1.23 V, Table 17.1's
   −2.372 V, −0.7618 V and +0.34 V.
===================================================================== */
(function () {
  const H = 640, d = sim('sim-protection', H);
  const T = 6;
  const GY = 84, SR = 1040;                                    /* the ground line, the right edge of the soil */
  const AX = 220, NT = 186, NB = 224, AW = 160, AB = 545;      /* the block: centre, neck top and bottom, body width, bottom */
  const TL = 500, TR = 990, TT = 262, TB = 482, TC = (TT + TB) / 2, RY = (TB - TT) / 2, RX = 44, LUG = 700, WY = 130;
  const M = {
    mg: { name: 'magnesium', Name: 'Magnesium', el: 'Mg', ion: 'Mg²⁺', E: -2.372, s: '−2.372', anode: true, couple: '\\text{Mg}^{2+}/\\text{Mg}', Etex: '-2.372', cell: '+3.60' },
    zn: { name: 'zinc', Name: 'Zinc', el: 'Zn', ion: 'Zn²⁺', E: -0.7618, s: '−0.7618', anode: true, couple: '\\text{Zn}^{2+}/\\text{Zn}', Etex: '-0.7618', cell: '+1.99' },
    cu: { name: 'copper', Name: 'Copper', el: 'Cu', ion: 'Cu²⁺', E: 0.34, s: '+0.34', anode: false, couple: '\\text{Fe}^{2+}/\\text{Fe}', Etex: '-0.44', cell: '+1.67' },
  };
  const FE = -0.44, O2E = 1.23;
  const cy = F.cycle(() => T, 1.2);
  const pick = F.choice(d.controls, { label: '\\text{metal wired to the tank}', options: Object.keys(M).map((k) => ({ value: k, label: M[k].name })), value: 'mg', aria: 'the metal wired to the tank', onInput: () => cy.reset() });
  const ro = F.readout(d);
  let hits = [], lastRo = '';
  F.hover(d.stage, () => hits);

  /* pebbles fixed once, none under a label */
  const PEB = Array.from({ length: 110 }, (_, i) => [hash(i) * SR, GY + 26 + hash(i + 500) * (H - GY - 40), 3 + 3 * hash(i + 900)])
    .filter(([x, y]) => !(y > 556 && x < 420) && !(y > 150 && y < 228 && x > 340 && x < 1040));
  const GRASS = Array.from({ length: 52 }, (_, i) => [10 + i * 20 + 8 * hash(i + 40), 9 + 7 * hash(i + 70)]);
  /* the block: a cast cylinder seen from the side, w wide and ending at bot, with shoulders up to its neck */
  const block = (ctx, w, bot) => {
    const l = AX - w / 2, r = AX + w / 2;
    ctx.moveTo(AX - 22, NT); ctx.lineTo(AX + 22, NT); ctx.lineTo(AX + 22, NB);
    ctx.bezierCurveTo(AX + 30, NB + 22, r, NB + 26, r, NB + 78); ctx.lineTo(r, bot - 16); ctx.quadraticCurveTo(r, bot, r - 16, bot);
    ctx.lineTo(l + 16, bot); ctx.quadraticCurveTo(l, bot, l, bot - 16); ctx.lineTo(l, NB + 78); ctx.bezierCurveTo(l, NB + 26, AX - 30, NB + 22, AX - 22, NB);
  };
  const tank = (ctx) => { ctx.moveTo(TL + RX, TT); ctx.lineTo(TR - RX, TT); ctx.ellipse(TR - RX, TC, RX, RY, 0, -Math.PI / 2, Math.PI / 2); ctx.lineTo(TL + RX, TB); ctx.ellipse(TL + RX, TC, RX, RY, 0, Math.PI / 2, 1.5 * Math.PI); };
  const PITS = [610, 760, 900];
  const EY = (e) => 176 + (O2E - e) * 108;                     /* the E° scale: 108 units to the volt */

  function draw() {
    const { ctx } = begin(d.c);
    const v = pick.value, m = M[v], t = cy.now(), s = t / T;
    const iron = F.el('Fe'), metal = pick.mixColor((q) => F.el(M[q].el)), cp = C('potential');
    const soil = alpha(PAL.ink, 0.06);
    const lose = m.anode ? s : 0, w = AW * (1 - 0.34 * lose), bot = AB - 46 * lose;
    hits = [];

    /* moist soil under the ground line */
    ctx.fillStyle = soil; ctx.fillRect(0, GY, SR, H - GY);
    ctx.fillStyle = alpha(PAL.ink, 0.2); PEB.forEach(([x, y, r]) => { ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); });
    line(ctx, 0, GY, SR, GY, PAL.ink, 3);
    GRASS.forEach(([x, h]) => { line(ctx, x, GY, x - 5, GY - h, alpha(PAL.ink, 0.55), 2); line(ctx, x, GY, x + 1, GY - h - 3, alpha(PAL.ink, 0.55), 2); line(ctx, x, GY, x + 7, GY - h + 2, alpha(PAL.ink, 0.55), 2); });

    /* the wire, from the block's neck up, across and down to the lug on the tank */
    const WIRE = [[AX, NT + 8], [AX, WY], [LUG, WY], [LUG, TT - 4]];
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 6; ctx.lineJoin = 'round'; ctx.beginPath(); WIRE.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.stroke(); ctx.restore();

    /* the block, with its first outline dashed once it has begun to dissolve */
    if (lose > 0.02) fillPath(ctx, () => block(ctx, AW, AB), null, alpha(PAL.ink, 0.45), 2, [7, 7]);
    fillPath(ctx, () => block(ctx, w, bot), PAL.panel, null);
    fillPath(ctx, () => block(ctx, w, bot), alpha(metal, 0.5), metal, 3);

    /* the tank: an iron cylinder on its side, its near end cap, a seam with rivets, the lug */
    fillPath(ctx, () => tank(ctx), PAL.panel, null);
    fillPath(ctx, () => tank(ctx), alpha(iron, 0.3), iron, 3);
    ctx.save(); ctx.strokeStyle = alpha(iron, 0.8); ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(TL + RX, TC, RX, RY, 0, -Math.PI / 2, Math.PI / 2); ctx.stroke(); ctx.restore();
    line(ctx, TL + RX + 26, TT + 30, TR - RX + 22, TT + 30, alpha(iron, 0.8), 2);
    for (let x = TL + RX + 60; x < TR - RX; x += 62) ball(ctx, x, TT + 16, 4, alpha(iron, 0.7));
    fillPath(ctx, () => ctx.roundRect(LUG - 16, TT - 12, 32, 16, 4), alpha(iron, 0.6), iron, 2);

    /* with copper the tank is the anode: pits in its underside and rust beside them */
    pick.only(ctx, 'cu', () => {
      PITS.forEach((x, i) => {
        const r = 10 + (20 - 3 * i) * s;
        fillPath(ctx, () => { ctx.moveTo(x - r, TB + 2); ctx.bezierCurveTo(x - r * 0.9, TB - r * 1.1, x - r * 0.1, TB - r * 1.3, x + r * 0.2, TB - r * 0.9); ctx.bezierCurveTo(x + r * 0.5, TB - r * 1.1, x + r, TB - r * 0.6, x + r, TB + 2); }, PAL.panel, null);
        fillPath(ctx, () => { ctx.moveTo(x - r, TB + 2); ctx.bezierCurveTo(x - r * 0.9, TB - r * 1.1, x - r * 0.1, TB - r * 1.3, x + r * 0.2, TB - r * 0.9); ctx.bezierCurveTo(x + r * 0.5, TB - r * 1.1, x + r, TB - r * 0.6, x + r, TB + 2); }, soil, null);
        ctx.save(); ctx.strokeStyle = iron; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x - r, TB); ctx.bezierCurveTo(x - r * 0.9, TB - r * 1.1, x - r * 0.1, TB - r * 1.3, x + r * 0.2, TB - r * 0.9); ctx.bezierCurveTo(x + r * 0.5, TB - r * 1.1, x + r, TB - r * 0.6, x + r, TB); ctx.stroke(); ctx.restore();
        rust(ctx, x + 62, TB, 30 + 44 * s, 6 + 14 * s);
      });
    }, [0, 0]);

    /* electrons: from the anode, along the wire, to where oxygen is reduced */
    const toTank = [[AX, 400], ...WIRE, [LUG + 24, TC], [770, TB - 14]], toBlock = [[760, TB - 30], [LUG + 14, TC], ...WIRE.slice().reverse(), [AX, 330], [AX + AW / 2 - 14, 400]];
    const path = m.anode ? toTank : toBlock, eA = clamp01(pick.k * 2 - 1);
    for (let i = 0; i < 14; i++) {
      const u = frac(i / 14 + t / 6), [x, y] = along(path, u);
      electron(ctx, x, y, eA * ends(u, 0.04, 0.04)); hits.push({ x, y, r: 12, name: 'an electron, e⁻' });
    }

    /* O₂ reduced to two H₂O on the cathode's surface: the tank's underside, or the copper's side */
    const site = m.anode ? { at: [770, TB + 16], from: [960, 622], out: [[600, 590], [680, 626]] } : { at: [AX + AW / 2 + 18, 400], from: [450, 300], out: [[420, 500], [380, 590]] };
    for (let i = 0; i < 3; i++) {
      const u = frac(t / 3 + i / 3), x1 = site.at[0] + (m.anode ? 44 * (i - 1) : 0), y1 = site.at[1] + (m.anode ? 0 : 44 * (i - 1));
      if (u < 0.55) { const k = u / 0.55, x = lerp(site.from[0] + 30 * i, x1, k), y = lerp(site.from[1] - 10 * i, y1, k); o2(ctx, x, y, eA * clamp01(u / 0.06)); hits.push({ x, y, r: 20, name: 'an oxygen molecule, O₂' }); }
      else {
        const k = (u - 0.55) / 0.45, a = eA * (1 - clamp01((k - 0.65) / 0.35));
        site.out.forEach(([x2, y2]) => { const x = lerp(x1, x2 + 30 * i, k), y = lerp(y1, y2, k); h2o(ctx, x, y, a); hits.push({ x, y, r: 18, name: 'a water molecule, H₂O' }); });
      }
    }

    /* the anode metal's ions leaving it for the soil */
    ['mg', 'zn'].forEach((q) => pick.only(ctx, q, () => {
      for (let i = 0; i < 4; i++) {
        const u = frac(t / 3 + i / 4), y = 322 + 50 * i, x = lerp(AX + w / 2 - 6, AX + w / 2 + 190 - 20 * (i % 2), u);
        ion(ctx, x, y, M[q].el, M[q].ion, ends(u, 0.06, 0.3)); hits.push({ x, y, r: 22, name: `a ${M[q].name} ion, ${M[q].ion}` });
      }
    }, [0, 0]));
    pick.only(ctx, 'cu', () => {
      for (let i = 0; i < 3; i++) {
        const u = frac(t / 3 + i / 3), x0 = PITS[i], x = x0 - 30 * u, y = lerp(TB - 4, TB + 120, u);
        ion(ctx, x, y, 'Fe', 'Fe²⁺', ends(u, 0.06, 0.3)); hits.push({ x, y, r: 22, name: 'an iron(II) ion, Fe²⁺' });
      }
    }, [0, 0]);

    /* names of the parts, for the pointer */
    hits.push({ x: AX, y: 400, r: 70, name: m.anode ? `the ${m.name} block, the sacrificial anode` : 'the copper block, the cathode' }, { x: 745, y: TC, r: 100, name: m.anode ? 'the iron tank, the cathode' : 'the iron tank, the anode' },
      { x: 460, y: WY, r: 16, name: 'the wire' }, { x: LUG, y: TT - 4, r: 16, name: 'the lug the wire is fastened to' }, { x: 420, y: 190, r: 50, name: 'moist soil' }, { x: 900, y: GY, r: 20, name: 'the ground surface' });
    if (m.anode && lose > 0.02) hits.push({ x: AX - AW / 2, y: 450, r: 12, name: 'the block when new' }, { x: AX + AW / 2, y: 450, r: 12, name: 'the block when new' }, { x: AX, y: AB, r: 14, name: 'the block when new' });
    if (!m.anode) PITS.forEach((x) => hits.push({ x, y: TB - 8, r: 18, name: 'a pit in the iron' }, { x: x + 62, y: TB + 8, r: 22, name: 'rust, Fe₂O₃·xH₂O' }));

    /* labels: each metal with its part in the cell and its half-reaction */
    const red = 'O₂ + 4H⁺ + 4e⁻ ⟶ 2H₂O';
    text(ctx, 'moist soil', 430, 186, PAL.ink, { size: 22, weight: 600, align: 'center' });
    ['mg', 'zn', 'cu'].forEach((q) => pick.only(ctx, q, () => {
      F.rich(ctx, [[M[q].name, PAL.ink], M[q].anode ? ', the sacrificial anode' : ', the cathode'], AX, 580, { size: 22, align: 'center' });
      text(ctx, M[q].anode ? `${M[q].el} ⟶ ${M[q].ion} + 2e⁻` : red, AX, 614, PAL.ink, { size: 22, align: 'center' });
      F.rich(ctx, [['iron tank', PAL.ink], M[q].anode ? ', the cathode' : ', the anode'], 880, 172, { size: 22, align: 'center' });
      text(ctx, M[q].anode ? red : 'Fe ⟶ Fe²⁺ + 2e⁻', 880, 206, PAL.ink, { size: 22, align: 'center' });
    }, [0, 0]));

    /* the particles with no formula written on them */
    F.legend(ctx, { l: 16, r: SR, t: 6, b: 66 }, [{ s: 'electron, e⁻', draw: (g, x, y) => electron(g, x, y) }, { s: 'oxygen, O₂', draw: (g, x, y) => o2(g, x, y) },
      { s: 'water, H₂O', draw: (g, x, y) => h2o(g, x, y - 3) }], { corner: 'tl', row: true, panel: false, size: 20 });

    /* the couples on one E° scale; the arrow from the anode's rung up to O₂/H₂O is E°cell */
    const X0 = 1150;
    text(ctx, '$\\kEo$ (V)', X0, 126, cp, { size: 22, weight: 600, align: 'center', tex: true });
    line(ctx, X0, 150, X0, 604, PAL.ink, 3);
    const rung = (e, name, val, on, dot) => {
      const y = EY(e);
      line(ctx, X0, y, X0 + 40, y, on ? PAL.ink : alpha(PAL.ink, 0.4), on ? 4 : 2);
      if (dot) ball(ctx, X0 + 40, y, 7, dot);
      ctx.save(); ctx.globalAlpha *= on ? 1 : 0.6; F.rich(ctx, [name + '  ', [val, cp, on ? 600 : 400], ' V'], X0 + 56, y, { size: 19, weight: on ? 600 : 400 }); ctx.restore();
      hits.push({ x: X0 + 20, y, r: 14, name: `${name}, E° = ${val} V` });
    };
    rung(O2E, 'O₂/H₂O', '+1.23', true, null);
    rung(FE, 'Fe²⁺/Fe', '−0.44', true, iron);
    Object.keys(M).forEach((q) => rung(M[q].E, `${M[q].ion}/${M[q].el}`, M[q].s, q === v, q === v ? F.el(M[q].el) : null));
    const ya = pick.mix((q) => EY(M[q].anode ? M[q].E : FE));
    F.arrow(ctx, X0 - 28, ya, X0 - 28, EY(O2E), cp, 4);
    text(ctx, '$\\kEocell$', X0 - 44, (ya + EY(O2E)) / 2, cp, { size: 22, weight: 600, align: 'right', tex: true });
    hits.push({ x: X0 - 28, y: (ya + EY(O2E)) / 2, r: 30, name: 'E°cell, from the anode’s couple up to O₂/H₂O' });

    const rtex = `\\kEocell = \\mk{c}{\\kEo{}_{\\text{O}_2/\\text{H}_2\\text{O}}} - \\mk{a}{\\kEo{}_{${m.couple}}} = \\mk{cv}{+1.23\\ \\text{V}} - \\mk{av}{(${m.Etex}\\ \\text{V})} = \\mk{r}{${m.cell}\\ \\text{V}}`;
    const note = m.anode ? `${m.Name}’s $\\kEo$ is below iron’s, so the ${m.name} is oxidized and the tank is not.` : 'Copper’s $\\kEo$ is above iron’s, so the tank is oxidized and the copper is not.';
    if (rtex + v !== lastRo) { lastRo = rtex + v; ro.set(rtex, note, { form: v }); }
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();
};
