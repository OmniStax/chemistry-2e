/* Figures for section 14.7 Acid-Base Titrations. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['14.7'] = function (root, F) {
const { C, PAL, alpha, register, begin, line, text, dot, topline } = F;
const sim = (id, H) => F.sim(root, id, H);
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;
const clamp01 = (x) => Math.max(0, Math.min(1, x));

/* =====================================================================
   FIGURE 14.18 + 14.20: 25.00 mL of 0.100 M HCl and of 0.100 M acetic
   acid, each titrated with 0.100 M NaOH. Both curves come from the
   exact charge balance [Na+] + [H3O+] = [Cl- or A-] + [OH-] with
   Kw = 1.0e-14 and Ka = 10^-pKa, which gives Table 14.2 to ±0.01.
   Axes fixed at the book's 0–50 mL and pH 0–14; every curve the pKa
   slider reaches runs from pH 1.00 (HCl) or at most 5.0 (pKa 9.00) to
   12.52. Still: the curve is pH against volume, with no clock. The
   indicator bands, the flask and the color-change bar are the
   indicators' real colors, drawn through F.fact.
===================================================================== */
(function () {
  const d = sim('sim-titration', 680);
  const KW = 1e-14, CA = 0.1, CB = 0.1, VA = 25, VEQ = CA * VA / CB;
  const G = { l: 110, r: 960, t: 140, b: 600 };
  const MO_RED = '#d9342b', MO_YELLOW = '#f2c12e', LITMUS_RED = '#c8323c', LITMUS_BLUE = '#3a56b8', PHPH_PINK = '#e0479e';
  const IND = {
    mo: { name: 'methyl orange', lo: 3.0, hi: 4.2, acid: () => F.fact(MO_RED), base: () => F.fact(MO_YELLOW), words: ['red', 'orange', 'yellow'] },
    litmus: { name: 'litmus', lo: 4.6, hi: 8.0, acid: () => F.fact(LITMUS_RED), base: () => F.fact(LITMUS_BLUE), words: ['red', 'purple', 'blue'] },
    php: { name: 'phenolphthalein', lo: 8.4, hi: 10.0, acid: () => alpha(F.fact(PHPH_PINK), 0), base: () => F.fact(PHPH_PINK), words: ['colorless', 'pale pink', 'pink'] },
  };
  const REF = { strong: 'strong-titration', weak: 'weak-titration' };
  const V = F.ctl(d.controls, {
    label: '\\kV', cls: 'volume', min: 0, max: 50, step: 0.05, value: 25, unit: 'mL', dec: 2, detents: [0, 37.5],
    aria: 'volume of 0.100 M NaOH added, in milliliters',
    specials: [{ at: VEQ / 2, label: 'half-equivalence' }, { at: VEQ, label: 'equivalence' }],
  });
  const PK = F.ctl(d.controls, {
    label: '\\kpKa', cls: 'equilibrium-constant', min: 3, max: 9, step: 0.01, value: 4.74, unit: '', dec: 2,
    detents: [{ v: 4.74, label: 'CH₃CO₂H' }], aria: 'pKa of the weak acid',
  });
  const acid = F.choice(d.controls, { label: '\\text{acid}', options: [{ value: 'strong', label: 'strong acid' }, { value: 'weak', label: 'weak acid' }], value: 'strong', aria: 'the acid titrated' });
  const ind = F.select(d.controls, { label: '\\text{indicator}', options: Object.keys(IND).map((k) => ({ value: k, label: IND[k].name })), value: 'mo', aria: 'the indicator in the flask' });
  const ro = F.readout(d);
  let hits = [];
  F.hover(d.stage, () => hits);

  /* the solution after v mL of titrant: hydronium molarity h and the acid's own species */
  function state(v, which, pKa) {
    const vt = VA + v, ca = CA * VA / vt, cb = CB * v / vt;
    if (which === 'strong') {
      const dd = ca - cb, h = (dd + Math.sqrt(dd * dd + 4 * KW)) / 2;
      return { h, oh: KW / h };
    }
    const ka = 10 ** -pKa;
    let lo = -1.5, hi = 15.5;
    for (let i = 0; i < 60; i++) {
      const m = (lo + hi) / 2, h = 10 ** -m;
      if (cb + h - ca * ka / (ka + h) - KW / h > 0) lo = m; else hi = m;
    }
    const h = 10 ** -((lo + hi) / 2);
    return { h, oh: KW / h, a: ca * ka / (ka + h), ha: ca * h / (ka + h) };
  }
  const pHof = (v, which, pKa) => -Math.log10(state(v, which, pKa).h);
  /* titrant volume grows fastest away from equivalence, so the samples crowd the steep rise */
  const warp = (t) => VEQ + (t < 0 ? -VEQ : 50 - VEQ) * Math.abs(t) ** 3;
  /* the first volume at which the curve reaches a pH */
  function reach(which, pKa, level) {
    if (pHof(0, which, pKa) >= level) return 0;
    let lo = 0, hi = 50;
    for (let i = 0; i < 40; i++) { const m = (lo + hi) / 2; if (pHof(m, which, pKa) < level) lo = m; else hi = m; }
    return hi;
  }
  /* a concentration to three figures as TeX, and the number that TeX shows */
  function sig3(x) {
    if (x >= 1e-3) { const s = x.toPrecision(3); return { tex: s, v: +s }; }
    let e = Math.floor(Math.log10(x)), m = +(x / 10 ** e).toFixed(2);
    if (m >= 10) { m = +(m / 10).toFixed(2); e += 1; }
    return { tex: `${m.toFixed(2)}\\times10^{${e}}`, v: m * 10 ** e };
  }
  const tint = (key, p) => { const s = IND[key]; return F.mixColor(s.acid(), s.base(), clamp01((p - s.lo) / (s.hi - s.lo))); };

  function draw() {
    const { ctx, H } = begin(d.c), v = V.v, pKa = PK.v, which = acid.value, ic = IND[ind.value];
    const cV = C('volume'), cP = C('concentration');
    const g = F.axes(ctx, G, [0, 50], [0, 14], { nx: 10, ny: 14, xl: 'volume of 0.100 M NaOH added (mL)', xc: cV, yl: 'pH', yc: cP });
    const { X, Y } = g;
    hits = [];
    /* each indicator's color-change interval, shaded from its acid color to its base color */
    for (const key of Object.keys(IND)) {
      ind.only(ctx, key, () => {
        const s = IND[key], grad = ctx.createLinearGradient(0, Y(s.lo), 0, Y(s.hi));
        grad.addColorStop(0, alpha(s.acid(), 0.38)); grad.addColorStop(1, alpha(s.base(), 0.38));
        ctx.save(); ctx.fillStyle = grad; ctx.fillRect(G.l + 1, Y(s.hi), G.r - G.l - 1, Y(s.lo) - Y(s.hi)); ctx.restore();
        text(ctx, `${s.name} range`, G.r - 14, (Y(s.lo) + Y(s.hi)) / 2, PAL.ink, { size: 20, align: 'right', bg: PAL.panel });
      }, [0, 0]);
    }
    /* the titrant volumes over which the chosen sample turns the indicator, on the volume axis */
    const v0 = reach(which, pKa, ic.lo), v1 = reach(which, pKa, ic.hi);
    {
      const x0 = X(v0), x1 = Math.max(X(v1), x0 + 4), grad = ctx.createLinearGradient(x0, 0, x1, 0);
      grad.addColorStop(0, ic.acid()); grad.addColorStop(1, ic.base());
      ctx.save(); ctx.fillStyle = grad; ctx.fillRect(x0, G.b - 14, x1 - x0, 11); ctx.strokeStyle = alpha(PAL.ink, 0.5); ctx.lineWidth = 1.5; ctx.strokeRect(x0, G.b - 14, x1 - x0, 11); ctx.restore();
      hits.push({ x: (x0 + x1) / 2, y: G.b - 9, r: Math.max(14, (x1 - x0) / 2), name: `${ic.name} changes color from ${v0.toFixed(2)} to ${v1.toFixed(2)} mL` });
    }
    const ph = Math.abs(pKa - 4.74) < 0.005 ? 'acetic acid' : 'weak acid';
    const pExact = pHof(v, which, pKa), shade = clamp01((pExact - ic.lo) / (ic.hi - ic.lo)), word = ic.words[shade <= 0.15 ? 0 : shade >= 0.85 ? 2 : 1];
    /* the readout: the acid's own equation before the equivalence point, the excess hydroxide's from it on */
    const st = state(v, which, pKa), past = v >= VEQ - 1e-9;
    let tex, p;
    if (past) {
      const oh = sig3(st.oh);
      p = 14 + Math.log10(oh.v);
      tex = `\\kpH = ${hue('equilibrium-constant', '14.00')} + \\log\\kconcOH = ${hue('equilibrium-constant', '14.00')} + \\log(\\mk{oh}{${hue('concentration', oh.tex)}}) = \\mk{p}{${hue('concentration', p.toFixed(2))}}`;
    } else if (which === 'strong') {
      const h = sig3(st.h);
      p = -Math.log10(h.v);
      tex = `\\kpH = -\\log\\kconcHyd = -\\log(\\mk{h}{${hue('concentration', h.tex)}}) = \\mk{p}{${hue('concentration', p.toFixed(2))}}`;
    } else {
      const a = sig3(st.a), ha = sig3(st.ha), pk = pKa.toFixed(2);
      p = +pk + Math.log10(a.v / ha.v);
      tex = `\\kpH = \\kpKa + \\log\\frac{\\kconcAm}{\\kconcHA} = \\mk{pk}{${hue('equilibrium-constant', pk)}} + \\log\\frac{\\mk{a}{${hue('concentration', a.tex)}}}{\\mk{ha}{${hue('concentration', ha.tex)}}} = \\mk{p}{${hue('concentration', p.toFixed(2))}}`;
    }
    const to = (x) => x.toFixed(2);
    ro.set(tex, `${ic.name[0].toUpperCase() + ic.name.slice(1)} changes from ${ic.words[0]} to ${ic.words[2]} between ${to(v0)} and ${to(v1)} mL of NaOH.`, { form: `${which}-${past}` });
    const stage = v <= 1e-9 ? 'the initial state' : Math.abs(v - VEQ / 2) < 1e-9 ? 'halfway to the equivalence point' : v < VEQ - 1e-9 ? 'before the equivalence point' : past && v <= VEQ + 1e-9 ? 'the equivalence point' : 'past the equivalence point';
    const sample = which === 'strong' ? 'HCl' : ph;
    const lines = topline(ctx, `At ${to(v)} mL of NaOH, ${stage}, the ${sample} solution is at pH ${to(p)} and ${ic.name} is ${word}.`);
    const lab = F.labeller(ctx, H, { headline: lines });
    const bandW = F.measure(ctx, `${ic.name} range`, { size: 20 }), bandY = (Y(ic.lo) + Y(ic.hi)) / 2;
    lab.block(G.r - 24 - bandW, bandY - 16, G.r, bandY + 16);
    const weakName = Math.abs(pKa - 4.74) < 0.005 ? 'CH_{3}CO_{2}H' : 'weak acid HA';
    for (const key of ['weak', 'strong']) {
      const w = acid.mix((s) => (s === key ? 1 : 0)), col = F.ref(REF[key]);
      F.faded(ctx, 0.4 + 0.6 * w, [0, 0], () => F.curve(ctx, (t) => pHof(warp(t), key, pKa), -1, 1, (t) => X(warp(t)), Y, col, 3 + 2 * w, 420));
      const pe = pHof(VEQ, key, pKa);
      dot(ctx, X(VEQ), Y(pe), col, true, 7);
      lab.add(`equivalence point pH, ${pe.toFixed(2)}`, X(VEQ), Y(pe), key === 'weak' ? -0.9 : -1, key === 'weak' ? -0.44 : 0, PAL.ink, 20, 40);
      lab.add(key === 'weak' ? weakName : 'HCl', X(15), Y(pHof(15, key, pKa)), 0, -1, col, 22, 26);
      hits.push({ x: X(VEQ), y: Y(pe), r: 16, name: `equivalence point of the ${key === 'weak' ? 'weak' : 'strong'} acid titration, pH ${pe.toFixed(2)}` });
    }
    hits.push({ x: X(VEQ / 2), y: Y(pHof(VEQ / 2, 'weak', pKa)), r: 14, name: `half-equivalence point of the ${ph} titration, where pH = pKa = ${pKa.toFixed(2)}` });
    /* the chosen sample now */
    const pNow = acid.mix((s) => pHof(v, s, pKa)), mx = X(v), my = Y(pNow), mc = acid.mixColor((s) => F.ref(REF[s]));
    line(ctx, mx, my + 10, mx, G.b, alpha(cV, 0.7), 2, [4, 8]);
    dot(ctx, mx, my, mc, true, 9);
    hits.push({ x: mx, y: my, r: 16, name: `the ${which === 'strong' ? 'HCl' : ph} solution after ${v.toFixed(2)} mL of NaOH` });
    lab.flush();

    /* the bench, flat, as 4.5 draws it: a stand and clamp holding a 50 mL buret whose level has fallen by the
       volume delivered, its stopcock and tip inside the neck of a 125 mL conical flask; the flask's liquid stands
       at the level its 25.00 mL of sample plus the titrant come to, in the indicator's colour at that pH */
    const BX = 1236, BW = 26, RODX = 1078, BENCH = 652, Yb = (mL) => 156 + 5.6 * mL, COCK = Yb(50) + 32, TIP = COCK + 58;
    const FB = BENCH - 24, FN = FB - 92, FM = FN - 28, WB = 96, WN = 22;
    const levelOf = (mL) => { const w = Math.cbrt(WB ** 3 - clamp01(mL / 125) * (WB ** 3 - WN ** 3)); return { y: FB - ((WB - w) / (WB - WN)) * (FB - FN), w }; };
    const flaskPath = () => { ctx.beginPath(); ctx.moveTo(BX - WN - 5, FM); ctx.lineTo(BX - WN, FM + 6); ctx.lineTo(BX - WN, FN); ctx.lineTo(BX - WB + 3, FB - 10); ctx.quadraticCurveTo(BX - WB, FB, BX - WB + 12, FB); ctx.lineTo(BX + WB - 12, FB); ctx.quadraticCurveTo(BX + WB, FB, BX + WB - 3, FB - 10); ctx.lineTo(BX + WN, FN); ctx.lineTo(BX + WN, FM + 6); ctx.lineTo(BX + WN + 5, FM); };
    ctx.save(); ctx.fillStyle = PAL.soft; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2.5; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.roundRect(RODX - 40, FB, BX + WB + 24 - (RODX - 40), BENCH - FB, 5); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.roundRect(RODX - 5, 84, 10, FB - 84, 3); ctx.fill(); ctx.stroke();
    const CY = Yb(30);
    ctx.beginPath(); ctx.roundRect(RODX - 13, CY - 15, 26, 30, 4); ctx.fill(); ctx.stroke();
    ctx.fillRect(RODX + 13, CY - 5, BX - BW / 2 - 10 - RODX - 13, 10); ctx.strokeRect(RODX + 13, CY - 5, BX - BW / 2 - 10 - RODX - 13, 10);
    [-1, 1].forEach((s) => { ctx.beginPath(); ctx.moveTo(BX - BW / 2 - 10, CY + s * 4); ctx.lineTo(BX - BW / 2 - 10, CY + s * 19); ctx.lineTo(BX + BW / 2 + 6, CY + s * 19); ctx.lineTo(BX + BW / 2 + 6, CY + s * 12); ctx.lineTo(BX - BW / 2 - 3, CY + s * 12); ctx.lineTo(BX - BW / 2 - 3, CY + s * 4); ctx.closePath(); ctx.fill(); ctx.stroke(); });
    ctx.restore();
    ctx.save(); ctx.fillStyle = alpha(cV, 0.24); ctx.beginPath(); ctx.moveTo(BX - BW / 2, Yb(v)); ctx.lineTo(BX + BW / 2, Yb(v)); ctx.lineTo(BX + BW / 2, Yb(50) + 9); ctx.lineTo(BX + 5, COCK - 8); ctx.lineTo(BX - 5, COCK - 8); ctx.lineTo(BX - BW / 2, Yb(50) + 9); ctx.closePath(); ctx.fill(); ctx.restore();
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    [-1, 1].forEach((s) => { ctx.beginPath(); ctx.moveTo(BX + s * (BW / 2 + 4), Yb(0) - 42); ctx.lineTo(BX + s * BW / 2, Yb(0) - 36); ctx.lineTo(BX + s * BW / 2, Yb(50) + 9); ctx.lineTo(BX + s * 5, COCK - 8); ctx.moveTo(BX + s * 5, COCK + 8); ctx.lineTo(BX + s * 5, TIP - 20); ctx.lineTo(BX + s * 2.5, TIP); ctx.stroke(); });
    ctx.restore();
    for (let mL = 0; mL <= 50; mL += 1) { const big = mL % 10 === 0; if (mL % 5 && !big) continue; line(ctx, BX + BW / 2, Yb(mL), BX + BW / 2 - (big ? BW : 14), Yb(mL), PAL.ink, big ? 2 : 1.2); if (big) text(ctx, String(mL), BX + BW / 2 + 8, Yb(mL), PAL.muted, { size: 17 }); }
    ctx.save(); ctx.fillStyle = PAL.soft; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.roundRect(BX - 18, COCK - 7, 36, 14, 4); ctx.fill(); ctx.stroke();
    ctx.fillStyle = PAL.ink; ctx.beginPath(); ctx.roundRect(BX - 3, COCK - 13, 6, 26, 3); ctx.fill(); ctx.restore();
    ctx.save(); ctx.strokeStyle = cV; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(BX - BW / 2 + 2, Yb(v) - 3); ctx.quadraticCurveTo(BX, Yb(v) + 3, BX + BW / 2 - 2, Yb(v) - 3); ctx.stroke(); ctx.restore();
    text(ctx, '0.100 M NaOH', BX, Yb(0) - 60, PAL.ink, { size: 18, align: 'center' });
    const lv = levelOf(VA + v), tintNow = ind.mixColor((k) => tint(k, pExact));
    ctx.save(); flaskPath(); ctx.clip();
    ctx.fillStyle = alpha(PAL.muted, 0.14); ctx.fillRect(BX - WB - 4, lv.y, 2 * WB + 8, FB - lv.y + 4);
    ctx.fillStyle = alpha(tintNow, 0.75); ctx.fillRect(BX - WB - 4, lv.y, 2 * WB + 8, FB - lv.y + 4);
    ctx.restore();
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; flaskPath(); ctx.stroke(); ctx.restore();
    line(ctx, BX - lv.w + 3, lv.y, BX + lv.w - 3, lv.y, alpha(PAL.ink, 0.5), 2);
    hits.push({ x: BX, y: (Yb(v) + Yb(50)) / 2, r: 26, name: `buret of 0.100 M NaOH, ${v.toFixed(2)} mL delivered` },
      { x: BX, y: COCK, r: 20, name: 'stopcock' }, { x: (RODX + BX) / 2, y: CY, r: 28, name: 'clamp that holds the buret' }, { x: RODX, y: 380, r: 16, name: 'stand' },
      { x: BX, y: (lv.y + FB) / 2, r: 70, name: `flask of 25.00 mL of 0.100 M ${which === 'strong' ? 'HCl' : ph} with ${ic.name}, ${word}; ${(VA + v).toFixed(2)} mL in all` });
  }
  register(d.fig, { update: () => {}, draw });
})();
};
