/* Figures for section 17.6 Corrosion. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['17.6'] = function (root, F) {
const { PAL, alpha, register, begin, line, text, topline } = F;
const sim = (id, H) => F.sim(root, id, H);
const frac = (x) => x - Math.floor(x);
const clamp01 = (x) => Math.min(1, Math.max(0, x));
const lerp = (a, b, k) => a + (b - a) * k;

/* =====================================================================
   FIGURE 17.16 + 17.17: an iron plate in cross section under a choice of
   protection. Moving on a 6 s clock: electrons run through the metal from
   the anodic site to the cathodic site, O₂ enters the upper drop and leaves
   as water, and the anode metal's ions leave it while the anode is used up
   (the pit deepens and rust gathers, the zinc coat thins, or the magnesium
   block shrinks). Flat, a cross section; the iron plate is what stays.
===================================================================== */
(function () {
  const H = 680, d = sim('sim-corrosion', H);
  const RUST = '#7b3f1d';                       /* the brown of rust, Fe₂O₃·xH₂O */
  const T = 6;
  const L = 60, R = 1340, CT = 300, FT = 314, FB = 424, CB = 438;   /* coat top, iron top, iron bottom, coat bottom */
  const SC = [350, 450], BR = [890, 990];        /* the scratch in the top coat, the breach in the bottom coat */
  const UP = { x: 400, l: 240, r: 560, h: 110 }, DN = { x: 940, l: 760, r: 1120, h: 105 };
  const MG = { x: 1125, y: 520, w: 130, h: 100 };
  const OPT = {
    paint: { label: 'scratched paint', el: 'Fe', ion: 'Fe²⁺', E: '-0.44', couple: '\\text{Fe}^{2+}/\\text{Fe}', cell: '+1.67',
      head: 'Iron dissolves at the anodic site, and its electrons reduce oxygen at the scratch.',
      note: 'No metal with a potential below $\\kEo{}_{\\text{Fe}^{2+}/\\text{Fe}} = -0.44\\ \\text{V}$ touches the iron, so the iron itself is oxidized.' },
    zinc: { label: 'zinc coating', el: 'Zn', ion: 'Zn²⁺', E: '-0.7618', couple: '\\text{Zn}^{2+}/\\text{Zn}', cell: '+1.99',
      head: 'Zinc dissolves in place of the iron, and the scratch only passes electrons to oxygen.',
      note: 'Zinc’s $\\kEo$ lies below $\\kEo{}_{\\text{Fe}^{2+}/\\text{Fe}} = -0.44\\ \\text{V}$, so zinc is oxidized and the iron is not.' },
    mg: { label: 'magnesium anode', el: 'Mg', ion: 'Mg²⁺', E: '-2.372', couple: '\\text{Mg}^{2+}/\\text{Mg}', cell: '+3.60',
      head: 'The magnesium anode dissolves, and its electrons reach the iron through the wire.',
      note: 'Magnesium’s $\\kEo$ lies below $\\kEo{}_{\\text{Fe}^{2+}/\\text{Fe}} = -0.44\\ \\text{V}$, so magnesium is oxidized and the iron is not.' },
  };
  const cy = F.cycle(() => T, 1.2);
  const pick = F.choice(d.controls, { label: '\\text{protection}', options: Object.keys(OPT).map((k) => ({ value: k, label: OPT[k].label })), value: 'paint', aria: 'how the iron is protected', onInput: () => cy.reset() });
  const ro = F.readout(d);
  let hits = [];
  F.hover(d.stage, () => hits);

  /* a soil stipple fixed once, so the soil does not shimmer */
  const hash = (i) => frac(Math.sin(i * 127.1 + 311.7) * 43758.5453);
  const STIP = Array.from({ length: 140 }, (_, i) => [L + hash(i) * (R - L), 110 + hash(i + 500) * 470]).filter(([, y]) => y < CT - 8 || y > CB + 8);

  function ball(ctx, x, y, r, c, a = 1, plus = false) {
    if (a <= 0.01) return;
    ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = c; ctx.strokeStyle = alpha(PAL.ink, 0.45); ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(x, y, r, 0, 2 * Math.PI); ctx.fill(); ctx.stroke();
    if (plus) { ctx.strokeStyle = PAL.panel; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x - r * 0.5, y); ctx.lineTo(x + r * 0.5, y); ctx.moveTo(x, y - r * 0.5); ctx.lineTo(x, y + r * 0.5); ctx.stroke(); }
    ctx.restore();
  }
  const o2 = (ctx, x, y, a = 1) => { ball(ctx, x - 6, y, 8, F.el('O'), a); ball(ctx, x + 6, y, 8, F.el('O'), a); };
  const h2o = (ctx, x, y, a = 1) => { ball(ctx, x - 9, y + 5, 5, F.el('H'), a); ball(ctx, x + 9, y + 5, 5, F.el('H'), a); ball(ctx, x, y, 8, F.el('O'), a); };
  function fillPath(ctx, build, fill, stroke, w = 2) {
    ctx.beginPath(); build(); ctx.closePath();
    if (fill) { ctx.fillStyle = fill; ctx.fill(); }
    if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = w; ctx.stroke(); }
  }
  function along(pts, s) {
    const seg = pts.slice(1).map((p, i) => Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]));
    let r = s * seg.reduce((a, b) => a + b, 0);
    for (let i = 0; i < seg.length; i++) {
      if (r <= seg[i] || i === seg.length - 1) { const k = Math.min(1, r / seg[i]); return [lerp(pts[i][0], pts[i + 1][0], k), lerp(pts[i][1], pts[i + 1][1], k)]; }
      r -= seg[i];
    }
    return pts[pts.length - 1];
  }
  const lenOf = (pts) => pts.slice(1).reduce((a, p, i) => a + Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]), 0);

  function draw() {
    const { ctx } = begin(d.c);
    const v = pick.value, o = OPT[v], t = cy.now(), s = t / T;
    const water = alpha(PAL.ink, 0.08), waterLine = alpha(PAL.ink, 0.45);
    const iron = F.el('Fe'), zinc = F.el('Zn'), mag = F.el('Mg');
    const aSoil = pick.a('mg'), aDrop = 1 - aSoil;
    const pitD = 18 + 50 * s, pitW = 46 + 14 * s;
    hits = [];

    /* moist soil around the buried plate */
    F.faded(ctx, aSoil, [0, 0], () => {
      ctx.fillStyle = alpha(PAL.ink, 0.05); ctx.fillRect(L - 40, 96, R - L + 80, 500);
      ctx.fillStyle = alpha(PAL.ink, 0.22); STIP.forEach(([x, y]) => { ctx.beginPath(); ctx.arc(x, y, 3, 0, 2 * Math.PI); ctx.fill(); });
    });

    /* the two drops: the upper one over the scratch, the lower one under the anodic site */
    F.faded(ctx, aDrop, [0, 0], () => {
      fillPath(ctx, () => { ctx.moveTo(UP.l, CT); ctx.bezierCurveTo(UP.l - 30, CT - UP.h * 1.2, UP.r + 30, CT - UP.h * 1.2, UP.r, CT); }, water, waterLine);
      ctx.fillStyle = water; ctx.fillRect(SC[0], CT, SC[1] - SC[0], FT - CT);
      fillPath(ctx, () => { ctx.moveTo(DN.l, CB); ctx.bezierCurveTo(DN.l - 30, CB + DN.h * 1.25, DN.r + 30, CB + DN.h * 1.25, DN.r, CB); }, water, waterLine);
    });

    /* the iron plate, with its pit at the anodic site under scratched paint */
    ctx.fillStyle = alpha(iron, 0.32); ctx.fillRect(L, FT, R - L, FB - FT);
    line(ctx, L, FT, R, FT, iron, 2); line(ctx, L, FB, R, FB, iron, 2);
    pick.only(ctx, 'paint', () => {
      fillPath(ctx, () => { ctx.moveTo(DN.x - pitW, FB); ctx.bezierCurveTo(DN.x - pitW, FB - pitD * 1.1, DN.x - 12, FB - pitD * 1.4, DN.x + 6, FB - pitD); ctx.bezierCurveTo(DN.x + 30, FB - pitD * 0.8, DN.x + pitW + 8, FB - pitD * 0.9, DN.x + pitW, FB); }, PAL.panel, null);
      fillPath(ctx, () => { ctx.moveTo(DN.x - pitW, FB); ctx.bezierCurveTo(DN.x - pitW, FB - pitD * 1.1, DN.x - 12, FB - pitD * 1.4, DN.x + 6, FB - pitD); ctx.bezierCurveTo(DN.x + 30, FB - pitD * 0.8, DN.x + pitW + 8, FB - pitD * 0.9, DN.x + pitW, FB); }, water, iron, 2);
      ctx.fillStyle = water; ctx.fillRect(BR[0], FB, BR[1] - BR[0], CB - FB);
    }, [0, 0]);

    /* the coats: paint or zinc, both scratched on top; the paint breached below, the zinc thinning there */
    const topCoat = (c) => { ctx.fillStyle = c; ctx.fillRect(L, CT, SC[0] - L, FT - CT); ctx.fillRect(SC[1], CT, R - SC[1], FT - CT); };
    pick.only(ctx, 'paint', () => {
      topCoat(PAL.muted);
      ctx.fillStyle = PAL.muted; ctx.fillRect(L, FB, BR[0] - L, CB - FB); ctx.fillRect(BR[1], FB, R - BR[1], CB - FB);
    }, [0, 0]);
    pick.only(ctx, 'zinc', () => {
      topCoat(zinc);
      const thin = (x) => 10 * s * Math.pow(Math.max(0, 1 - Math.abs(x - DN.x) / 150), 1.5);
      fillPath(ctx, () => { ctx.moveTo(L, FB); ctx.lineTo(R, FB); ctx.lineTo(R, CB); for (let x = R; x >= L; x -= 10) ctx.lineTo(x, CB - thin(x)); }, zinc, null);
    }, [0, 0]);

    /* rust gathering at the edge of the lower drop */
    pick.only(ctx, 'paint', () => {
      const k = clamp01(s * 1.15), w = 20 + 60 * k, h = 8 + 24 * k, cx = 1078;
      fillPath(ctx, () => { ctx.moveTo(cx - w / 2, CB); ctx.bezierCurveTo(cx - w / 2, CB + h, cx - w / 6, CB + h * 1.2, cx + w / 8, CB + h * 0.9); ctx.bezierCurveTo(cx + w / 3, CB + h * 1.1, cx + w / 2, CB + h * 0.7, cx + w / 2, CB); }, F.fact(RUST), alpha(PAL.ink, 0.5), 1.5);
    }, [0, 0]);

    /* the magnesium anode and its wire */
    const mgW = MG.w * (1 - 0.32 * s), mgH = MG.h * (1 - 0.18 * s);
    pick.only(ctx, 'mg', () => {
      const wire = [[MG.x, MG.y - MG.h / 2], [MG.x, 455], [960, 455], [960, FB]];
      for (let i = 0; i < wire.length - 1; i++) line(ctx, wire[i][0], wire[i][1], wire[i + 1][0], wire[i + 1][1], PAL.ink, 4);
      ctx.fillStyle = PAL.panel; ctx.fillRect(MG.x - MG.w / 2 - 2, MG.y - MG.h / 2 - 2, MG.w + 4, MG.h + 4);
      ctx.fillStyle = alpha(PAL.ink, 0.05); ctx.fillRect(MG.x - MG.w / 2 - 2, MG.y - MG.h / 2 - 2, MG.w + 4, MG.h + 4);
      fillPath(ctx, () => ctx.roundRect(MG.x - mgW / 2, MG.y - mgH / 2, mgW, mgH, 12), alpha(mag, 0.55), mag, 2.5);
    }, [0, 10]);

    /* electrons through the metal, from the anodic site to the cathodic site */
    const tail = [[900, 345], [455, 345], [SC[0] + 50, FT + 4]];
    const path = v === 'paint' ? [[DN.x + 4, FB - pitD - 2], ...tail] : v === 'zinc' ? [[DN.x, FB + 6], ...tail] : [[MG.x, MG.y], [MG.x, 455], [960, 455], [960, FB - 4], ...tail];
    const NE = 10, len = lenOf(path), eA = clamp01(pick.k * 2 - 1);
    for (let i = 0; i < NE; i++) {
      const [x, y] = along(path, frac(i / NE + t * 130 / len));
      ball(ctx, x, y, 6, F.el('e-'), eA); hits.push({ x, y, r: 10, name: 'an electron, e⁻' });
    }

    /* O₂ reaching the iron at the scratch and leaving as water */
    for (let i = 0; i < 4; i++) {
      const u = frac(t / 2.4 + i / 4), x0 = 200 + 22 * i, y0 = 205 + 14 * (i % 2), x1 = SC[0] + 18 + 22 * i;
      if (u < 0.65) { const k = u / 0.65, x = lerp(x0, x1, k), y = lerp(y0, FT - 9, k); o2(ctx, x, y, clamp01(u / 0.08)); hits.push({ x, y, r: 14, name: 'an oxygen molecule, O₂' }); }
      else { const k = (u - 0.65) / 0.35, x = x1 + 50 * k, y = FT - 12 - 70 * k; h2o(ctx, x, y, 1 - clamp01((k - 0.6) / 0.4)); hits.push({ x, y, r: 14, name: 'a water molecule, H₂O' }); }
    }

    /* the anode metal's ions leaving it */
    pick.only(ctx, 'paint', () => {
      for (let i = 0; i < 5; i++) {
        const u = frac(t / 2 + i / 5), dx = (i - 2) * 16;
        let x, y;
        if (u < 0.35) { const k = u / 0.35; x = DN.x + dx; y = lerp(FB - pitD + 10, CB + 34, k); }
        else { const k = (u - 0.35) / 0.65; x = lerp(DN.x + dx, 1070, k); y = lerp(CB + 34, CB + 22, k) + 18 * Math.sin(Math.PI * k); }
        ball(ctx, x, y, 9, F.el('Fe'), clamp01(u / 0.06) * (1 - clamp01((u - 0.9) / 0.1)), true); hits.push({ x, y, r: 12, name: 'an iron(II) ion, Fe²⁺' });
      }
      for (let i = 0; i < 2; i++) {
        const u = frac(t / 2.4 + i / 2 + 0.2), k = clamp01(u / 0.9), x = lerp(1200, 1100, k), y = lerp(560, CB + 26, k);
        o2(ctx, x, y, clamp01(u / 0.08) * (1 - clamp01((u - 0.85) / 0.15))); hits.push({ x, y, r: 14, name: 'an oxygen molecule, O₂' });
      }
    }, [0, 0]);
    pick.only(ctx, 'zinc', () => {
      for (let i = 0; i < 5; i++) {
        const u = frac(t / 2 + i / 5), x0 = DN.x + (i - 2) * 46, k = u, x = x0 + (i - 2) * 10 * k, y = lerp(CB + 2, CB + 80, k);
        ball(ctx, x, y, 9, zinc, clamp01(u / 0.06) * (1 - clamp01((u - 0.7) / 0.3)), true); hits.push({ x, y, r: 12, name: 'a zinc ion, Zn²⁺' });
      }
    }, [0, 0]);
    pick.only(ctx, 'mg', () => {
      for (let i = 0; i < 5; i++) {
        const u = frac(t / 2 + i / 5), k = u, y = MG.y - 36 + 18 * i, x = lerp(MG.x - mgW / 2 - 4, MG.x - mgW / 2 - 110, k);
        ball(ctx, x, y, 9, mag, clamp01(u / 0.06) * (1 - clamp01((u - 0.7) / 0.3)), true); hits.push({ x, y, r: 12, name: 'a magnesium ion, Mg²⁺' });
      }
    }, [0, 0]);

    /* names of the parts, for the pointer */
    hits.push({ x: 700, y: (FT + FB) / 2, r: 40, name: 'iron' }, { x: 200, y: (FT + FB) / 2, r: 40, name: 'iron' }, { x: 1250, y: (FT + FB) / 2, r: 40, name: 'iron' });
    if (v === 'paint') hits.push({ x: 650, y: CT + 7, r: 10, name: 'paint layer' }, { x: 1078, y: CB + 14, r: 26, name: 'rust, Fe₂O₃·xH₂O' }, { x: DN.x, y: FB - pitD / 2, r: 30, name: 'the pit at the anodic site' });
    if (v === 'zinc') hits.push({ x: 650, y: CT + 7, r: 10, name: 'zinc coating' }, { x: 650, y: FB + 7, r: 10, name: 'zinc coating' });
    if (v === 'mg') hits.push({ x: MG.x, y: MG.y, r: 50, name: 'magnesium anode' }, { x: 1040, y: 455, r: 12, name: 'the wire' }, { x: 700, y: 200, r: 60, name: 'moist soil' });
    else hits.push({ x: UP.x, y: CT - 40, r: 60, name: 'a drop of water' }, { x: DN.x + 80, y: CB + 50, r: 50, name: 'a drop of water' });

    /* labels: the surroundings, the coat or anode, the iron, and the two sites */
    pick.only(ctx, 'mg', () => text(ctx, 'moist soil', 700, 205, PAL.ink, { size: 20, weight: 600, align: 'center', bg: PAL.panel }), [0, 0]);
    F.faded(ctx, aDrop, [0, 0], () => F.label(ctx, 'water', 535, 250, { side: 'right', gap: 90, size: 20 }));
    pick.only(ctx, 'paint', () => F.label(ctx, 'paint layer', 760, CT + 4, { side: 'above', gap: 50, size: 20 }), [0, 0]);
    pick.only(ctx, 'zinc', () => F.label(ctx, 'zinc coating', 760, CT + 4, { side: 'above', gap: 50, size: 20 }), [0, 0]);
    pick.only(ctx, 'mg', () => text(ctx, 'magnesium anode', MG.x + MG.w / 2 + 14, MG.y, PAL.ink, { size: 20, weight: 600, bg: PAL.panel }), [0, 0]);
    pick.only(ctx, 'paint', () => F.label(ctx, 'rust', 1100, CB + 30, { side: 'right', gap: 70, size: 20 }), [0, 0]);
    F.label(ctx, 'iron', 1240, FT + 20, { side: 'above', gap: 70, size: 20 });
    text(ctx, 'cathodic site:  O_2 + 4H⁺ + 4e⁻ ⟶ 2H_2O', UP.x, 158, PAL.ink, { size: 20, align: 'center', bg: PAL.panel });
    const ax = pick.mix((q) => (q === 'mg' ? MG.x - 40 : DN.x));
    text(ctx, `anodic site:  ${o.el} ⟶ ${o.ion} + 2e⁻`, ax, 604, PAL.ink, { size: 20, align: 'center', bg: PAL.panel });

    /* the particles, once each */
    const items = [['electron, e⁻', (x, y) => ball(ctx, x, y, 6, F.el('e-'))], ['O₂', (x, y) => o2(ctx, x, y)], ['H₂O', (x, y) => h2o(ctx, x, y)], [`${o.ion} ion`, (x, y) => ball(ctx, x, y, 9, F.el(o.el), 1, true)]];
    const w = items.map(([str]) => F.measure(ctx, str, { size: 17 }) + 56);
    let lx = 700 - w.reduce((a, b) => a + b, 0) / 2;
    items.forEach(([str, mark], i) => { mark(lx + 14, 652); text(ctx, str, lx + 34, 652, PAL.ink, { size: 17 }); lx += w[i]; });

    topline(ctx, o.head);
    ro.set(`\\kEocell = \\mk{c}{\\kEo{}_{\\text{O}_2/\\text{H}_2\\text{O}}} - \\mk{a}{\\kEo{}_{${o.couple}}} = \\mk{cv}{+1.23\\ \\text{V}} - \\mk{av}{(${o.E}\\ \\text{V})} = \\mk{r}{${o.cell}\\ \\text{V}}`, o.note, { form: v });
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();
};
