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
   12.52. Under the volume axis one strip per indicator shows the colour
   of the chosen solution at every volume, so the stretch of titrant over
   which each indicator turns is seen against the equivalence point; the
   chosen indicator's pH range is carried through the curve down to its
   strip, and the flask on the bench wears that strip's colour at the
   volume delivered. Still: the curve is pH against volume, with no
   clock. The indicator bands, the strips and the flask are the
   indicators' real colours, drawn through F.fact.
===================================================================== */
(function () {
  const d = sim('sim-titration', 830);
  const KW = 1e-14, CA = 0.1, CB = 0.1, VA = 25, VEQ = CA * VA / CB;
  const G = { l: 96, r: 820, t: 136, b: 590 };
  const MO_RED = '#d9342b', MO_YELLOW = '#f2c12e', LITMUS_RED = '#c8323c', LITMUS_BLUE = '#3a56b8', PHPH_PINK = '#e0479e';
  /* the pH ranges are Figure 14.20's bands, measured on the image */
  const IND = {
    php: { name: 'phenolphthalein', lo: 8.4, hi: 10.0, acid: () => alpha(F.fact(PHPH_PINK), 0), base: () => F.fact(PHPH_PINK), words: ['colorless', 'pale pink', 'pink'] },
    litmus: { name: 'litmus', lo: 4.6, hi: 8.0, acid: () => F.fact(LITMUS_RED), base: () => F.fact(LITMUS_BLUE), words: ['red', 'purple', 'blue'] },
    mo: { name: 'methyl orange', lo: 3.0, hi: 4.3, acid: () => F.fact(MO_RED), base: () => F.fact(MO_YELLOW), words: ['red', 'orange', 'yellow'] },
  };
  const KEYS = Object.keys(IND);
  const REF = { strong: 'strong-titration', weak: 'weak-titration' };
  /* The volume slider is fine near the equivalence point, as a titration is run: its position u in [-1, 1] gives
     V = 25 mL ± 25 mL × u², read to the buret's 0.01 mL within 1.5 mL of the equivalence point, to 0.05 mL within
     6 mL and to 0.25 mL beyond, so every volume of Table 14.2 and of the two examples can be set and the color
     change of an indicator can be crossed drop by drop. */
  const Uof = (mL) => Math.sign(mL - VEQ) * Math.sqrt(Math.abs(mL - VEQ) / (mL < VEQ ? VEQ : 50 - VEQ));
  const Vof = (u) => {
    const raw = VEQ + (u < 0 ? -VEQ : 50 - VEQ) * u * u, far = Math.abs(raw - VEQ), g = far < 1.5 ? 0.01 : far < 6 ? 0.05 : 0.25;
    return Math.min(50, Math.max(0, +(Math.round(raw / g) * g).toFixed(2)));
  };
  const V = F.ctl(d.controls, {
    label: '\\kV', cls: 'volume', min: -1, max: 1, step: 0.002, value: 0, unit: 'mL', fmt: (u) => `${Vof(u).toFixed(2)} mL`,
    detents: [{ v: Uof(37.5), label: '37.50 mL' }], snap: true,
    aria: 'volume of 0.100 M NaOH added, in milliliters',
    specials: [{ at: Uof(VEQ / 2), label: 'half-equivalence' }, { at: 0, label: 'equivalence' }],
  });
  const PK = F.ctl(d.controls, {
    label: '\\kpKa', cls: 'equilibrium-constant', min: 3, max: 9, step: 0.01, value: 4.74, unit: '', dec: 2,
    detents: [{ v: 4.74, label: 'CH₃CO₂H' }], aria: 'pKa of the weak acid',
  });
  const acid = F.choice(d.controls, { label: '\\text{acid}', options: [{ value: 'strong', label: 'strong acid' }, { value: 'weak', label: 'weak acid' }], value: 'weak', aria: 'the acid titrated' });
  const ind = F.select(d.controls, { label: '\\text{indicator}', options: KEYS.map((k) => ({ value: k, label: IND[k].name })), value: 'php', aria: 'the indicator in the flask' });
  const ro = F.readout(d);
  let hits = [];
  F.hover(d.stage, () => hits);

  /* the solution after v mL of titrant: hydronium molarity h and the acid's own species */
  function state(v, which, pKa) {
    const vt = VA + v, ca = CA * VA / vt, cb = CB * v / vt;
    if (which === 'strong') {
      const dd = ca - cb, h = dd > 0 ? (dd + Math.sqrt(dd * dd + 4 * KW)) / 2 : (2 * KW) / (-dd + Math.sqrt(dd * dd + 4 * KW));
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
    for (let i = 0; i < 44; i++) { const m = (lo + hi) / 2; if (pHof(m, which, pKa) < level) lo = m; else hi = m; }
    return hi;
  }
  /* a concentration to three figures as TeX, and the number that TeX shows */
  function sig3(x) {
    if (x >= 1e-3) { const s = x.toPrecision(3); return { tex: s, v: +s }; }
    let e = Math.floor(Math.log10(x)), m = +(x / 10 ** e).toFixed(2);
    if (m >= 10) { m = +(m / 10).toFixed(2); e += 1; }
    return { tex: `${m.toFixed(2)}\\times10^{${e}}`, v: m * 10 ** e };
  }
  const shadeOf = (key, p) => clamp01((p - IND[key].lo) / (IND[key].hi - IND[key].lo));
  const tint = (key, p) => F.mixColor(IND[key].acid(), IND[key].base(), shadeOf(key, p));
  const cap = (s) => s[0].toUpperCase() + s.slice(1);

  /* the bench: stand, clamp, a 50 mL buret ruled 0 at the top, stopcock, tip inside the neck of a conical flask */
  const BX = 1165, BW = 28, RODX = 1015, BENCH = 812, Yb = (mL) => 172 + 7.2 * mL, COCK = Yb(50) + 34, TIP = COCK + 64;
  const FB = BENCH - 26, FN = FB - 122, FM = FN - 38, WB = 112, WN = 22;
  /* the level a volume stands at in the flask, a cone that holds 100 mL to the base of its neck: the volume above a
     level goes as the cube of the half-width there */
  const levelOf = (mL) => { const w = Math.cbrt(WB ** 3 - clamp01(mL / 100) * (WB ** 3 - WN ** 3)); return { y: FB - ((WB - w) / (WB - WN)) * (FB - FN), w }; };
  const flaskPath = (ctx) => { ctx.beginPath(); ctx.moveTo(BX - WN - 5, FM); ctx.lineTo(BX - WN, FM + 6); ctx.lineTo(BX - WN, FN); ctx.lineTo(BX - WB + 3, FB - 10); ctx.quadraticCurveTo(BX - WB, FB, BX - WB + 12, FB); ctx.lineTo(BX + WB - 12, FB); ctx.quadraticCurveTo(BX + WB, FB, BX + WB - 3, FB - 10); ctx.lineTo(BX + WN, FN); ctx.lineTo(BX + WN, FM + 6); ctx.lineTo(BX + WN + 5, FM); };
  const SY = (i) => 700 + 35 * i, SH = 27;            /* the three colour strips under the volume axis */

  function draw() {
    const { ctx, H } = begin(d.c), v = Vof(V.v), pKa = PK.v, which = acid.value, ik = ind.value, ic = IND[ik];
    const cV = C('volume'), cP = C('concentration');
    const g = F.axes(ctx, G, [0, 50], [0, 14], { nx: 10, ny: 14, xl: 'volume of 0.100 M NaOH added (mL)', xc: cV, yl: 'pH', yc: cP });
    const { X, Y } = g;
    hits = [];
    const acetic = Math.abs(pKa - 4.74) < 0.005, ph = acetic ? 'acetic acid' : 'weak acid';
    const sample = which === 'strong' ? 'HCl' : ph;
    const pExact = pHof(v, which, pKa), shade = shadeOf(ik, pExact), word = ic.words[shade <= 0.15 ? 0 : shade >= 0.85 ? 2 : 1];
    const st = state(v, which, pKa), past = v >= VEQ - 1e-9;
    const to = (x) => x.toFixed(2);

    /* Figure 14.20's three bands, each shaded from its acid colour to its base colour; the chosen one stronger */
    KEYS.forEach((key) => {
      const s = IND[key], w = ind.mix((k) => (k === key ? 1 : 0)), a = 0.2 + 0.3 * w, grad = ctx.createLinearGradient(0, Y(s.lo), 0, Y(s.hi));
      grad.addColorStop(0, alpha(key === 'php' ? s.base() : s.acid(), key === 'php' ? 0.04 : a)); grad.addColorStop(1, alpha(s.base(), a));
      ctx.save(); ctx.fillStyle = grad; ctx.fillRect(G.l + 1, Y(s.hi), G.r - G.l - 1, Y(s.lo) - Y(s.hi)); ctx.restore();
      line(ctx, G.l, Y(s.lo), G.r, Y(s.lo), alpha(PAL.ink, 0.12 + 0.3 * w), 1.5); line(ctx, G.l, Y(s.hi), G.r, Y(s.hi), alpha(PAL.ink, 0.12 + 0.3 * w), 1.5);
    });

    /* the chosen indicator's range carried through the chosen curve to the volumes between which it turns */
    const v0 = reach(which, pKa, ic.lo), v1 = reach(which, pKa, ic.hi), p0 = Math.max(ic.lo, pHof(0, which, pKa));
    const row = KEYS.indexOf(ik), x0 = X(v0), x1 = X(v1);
    if (v1 > 0) {
      ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.06); ctx.fillRect(x0, Y(ic.hi), Math.max(x1 - x0, 1.5), G.b - Y(ic.hi)); ctx.restore();
      line(ctx, x0, Y(Math.min(p0, ic.hi)), x0, SY(row), alpha(PAL.ink, 0.45), 1.5);
      line(ctx, x1, Y(ic.hi), x1, SY(row), alpha(PAL.ink, 0.45), 1.5);
    }

    /* the readout: the acid's own equation before the equivalence point, the excess hydroxide's from it on */
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
    const vol = (x) => hue('volume', `${to(x)}\\ \\text{mL}`);
    const off = +to(v1) - VEQ;
    const turns = v1 <= 0 ? `${cap(ic.name)} is ${ic.words[2]} before any NaOH is added.`
      : `${cap(ic.name)} turns ${ic.words[2]} between $${vol(v0)}$ and $${vol(v1)}$, ${Math.abs(off) < 0.005 ? 'at' : `$${vol(Math.abs(off))}$ ${off < 0 ? 'before' : 'past'}`} the equivalence point.`;
    ro.set(tex, turns, { form: `${which}-${past}` });

    const stage = v <= 1e-9 ? 'the initial state' : Math.abs(v - VEQ / 2) < 1e-6 ? 'halfway to the equivalence point' : v < VEQ - 1e-9 ? 'before the equivalence point' : past && v <= VEQ + 1e-9 ? 'the equivalence point' : 'past the equivalence point';
    const lines = topline(ctx, `At ${to(v)} mL of NaOH, ${stage}, the ${sample} solution is at pH ${to(p)} and ${ic.name} is ${word}.`);
    const lab = F.labeller(ctx, H, { headline: lines });

    /* the bands' names with their ranges, at the right end where no curve runs */
    KEYS.forEach((key) => {
      const s = IND[key], w = ind.mix((k) => (k === key ? 1 : 0)), my = (Y(s.lo) + Y(s.hi)) / 2, str = s.name;
      text(ctx, str, G.r - 12, my, PAL.ink, { size: 19, align: 'right', bg: PAL.panel, weight: w > 0.5 ? 600 : 400 });
      lab.block(G.r - 26 - F.measure(ctx, str, { size: 19, weight: 600 }), my - 16, G.r, my + 16);
      hits.push({ x: G.r - 12 - F.measure(ctx, str, { size: 19, weight: 600 }) / 2, y: my, r: 22, name: `${s.name} changes color from pH ${s.lo.toFixed(1)} to ${s.hi.toFixed(1)}: ${s.words[0]} below, ${s.words[2]} above` });
    });

    /* the two curves; the one not in the flask stays, fainter */
    const weakName = acetic ? 'weak acid, CH₃CO₂H' : 'weak acid, HA';
    for (const key of ['weak', 'strong']) {
      const w = acid.mix((s) => (s === key ? 1 : 0)), col = F.ref(REF[key]);
      F.faded(ctx, 0.4 + 0.6 * w, [0, 0], () => F.curve(ctx, (t) => pHof(warp(t), key, pKa), -1, 1, (t) => X(warp(t)), Y, col, 3 + 2 * w, 420));
      const pe = pHof(VEQ, key, pKa);
      dot(ctx, X(VEQ), Y(pe), col, true, 7);
      lab.add(`equivalence point pH, ${pe.toFixed(2)}`, X(VEQ), Y(pe), key === 'weak' ? -1 : 1, key === 'weak' ? -0.45 : 0.3, PAL.ink, 19, 40);
      if (key === 'weak') lab.add(weakName, X(9), Y(pHof(9, key, pKa)), 0, -1, col, 21, 30);
      else lab.add('strong acid, HCl', X(11), Y(pHof(11, key, pKa)), 0, 1, col, 21, 28);
      hits.push({ x: X(VEQ), y: Y(pe), r: 16, name: `equivalence point of the ${key === 'weak' ? ph : 'HCl'} titration, pH ${pe.toFixed(2)}` });
    }
    const pHalf = pHof(VEQ / 2, 'weak', pKa);
    dot(ctx, X(VEQ / 2), Y(pHalf), PAL.panel, true, 6); dot(ctx, X(VEQ / 2), Y(pHalf), F.ref(REF.weak), false, 6);
    hits.push({ x: X(VEQ / 2), y: Y(pHalf), r: 14, name: `half-equivalence point of the ${ph} titration, where pH = pKa = ${pKa.toFixed(2)}` });

    /* one strip per indicator: the colour of the chosen solution at every volume */
    text(ctx, 'color of the solution with each indicator', G.l, 679, PAL.ink, { size: 19 });
    const pAt = (vv) => acid.mix((s) => pHof(vv, s, pKa)), N = 220, samples = Array.from({ length: N + 1 }, (_, i) => { const vv = warp(-1 + (2 * i) / N); return [vv / 50, pAt(vv)]; });
    KEYS.forEach((key, i) => {
      const s = IND[key], w = ind.mix((k) => (k === key ? 1 : 0)), grad = ctx.createLinearGradient(G.l, 0, G.r, 0);
      samples.forEach(([f, pp]) => grad.addColorStop(clamp01(f), tint(key, pp)));
      ctx.save(); ctx.fillStyle = PAL.panel; ctx.fillRect(G.l, SY(i), G.r - G.l, SH); ctx.fillStyle = grad; ctx.fillRect(G.l, SY(i), G.r - G.l, SH);
      ctx.strokeStyle = alpha(PAL.ink, 0.35 + 0.65 * w); ctx.lineWidth = 1.5 + 1.5 * w; ctx.strokeRect(G.l, SY(i), G.r - G.l, SH); ctx.restore();
      text(ctx, s.name, G.r + 22, SY(i) + SH / 2, PAL.ink, { size: 19, weight: w > 0.5 ? 600 : 400 });
      const a = reach(which, pKa, s.lo), b = reach(which, pKa, s.hi);
      const name = b <= 0 ? `${s.name} in the ${sample} solution: ${s.words[2]} at every volume` : `${s.name} in the ${sample} solution: ${s.words[0]} up to ${to(a)} mL, ${s.words[2]} from ${to(b)} mL`;
      for (let x = G.l + 16; x < G.r; x += 32) hits.push({ x, y: SY(i) + SH / 2, r: 16, name });
    });

    /* the equivalence volume carried down across the strips, so each change of color is seen against it */
    line(ctx, X(VEQ), SY(0) - 7, X(VEQ), SY(2) + SH + 7, PAL.ink, 2);
    F.rich(ctx, ['equivalence point, ', ['25.00 mL', cV]], X(VEQ), SY(2) + SH + 21, { size: 19, align: 'center' });
    /* the chosen sample now: its point on the curve, dropped through the strips */
    const pNow = acid.mix((s) => pHof(v, s, pKa)), mx = X(v), my = Y(pNow), mc = acid.mixColor((s) => F.ref(REF[s]));
    line(ctx, mx, my + 10, mx, SY(2) + SH, alpha(cV, 0.8), 2, [4, 8]);
    dot(ctx, mx, my, mc, true, 9);
    hits.push({ x: mx, y: my, r: 16, name: `the ${sample} solution after ${to(v)} mL of NaOH, pH ${to(p)}` });
    const tintNow = ind.mixColor((k) => tint(k, pExact));
    ctx.save(); ctx.beginPath(); ctx.arc(mx, SY(row) + SH / 2, 11, 0, 2 * Math.PI); ctx.fillStyle = PAL.panel; ctx.fill(); ctx.fillStyle = tintNow; ctx.fill(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2.5; ctx.stroke(); ctx.restore();
    lab.flush();

    /* the bench, flat: the stand's base and rod, the clamp's boss, arm and jaws */
    ctx.save(); ctx.fillStyle = PAL.soft; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2.5; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.roundRect(RODX - 26, FB, BX + WB + 28 - (RODX - 26), BENCH - FB, 5); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.roundRect(RODX - 5, 96, 10, FB - 96, 3); ctx.fill(); ctx.stroke();
    const CY = Yb(0) - 36;
    ctx.beginPath(); ctx.roundRect(RODX - 14, CY - 16, 28, 32, 4); ctx.fill(); ctx.stroke();
    ctx.fillRect(RODX + 14, CY - 5, BX - BW / 2 - 12 - RODX - 14, 10); ctx.strokeRect(RODX + 14, CY - 5, BX - BW / 2 - 12 - RODX - 14, 10);
    [-1, 1].forEach((s) => { ctx.beginPath(); ctx.moveTo(BX - BW / 2 - 12, CY + s * 4); ctx.lineTo(BX - BW / 2 - 12, CY + s * 21); ctx.lineTo(BX + BW / 2 + 7, CY + s * 21); ctx.lineTo(BX + BW / 2 + 7, CY + s * 13); ctx.lineTo(BX - BW / 2 - 3, CY + s * 13); ctx.lineTo(BX - BW / 2 - 3, CY + s * 4); ctx.closePath(); ctx.fill(); ctx.stroke(); });
    ctx.restore();
    /* the titrant left in the buret, down through the taper to the stopcock and on into the tip */
    ctx.save(); ctx.fillStyle = alpha(cV, 0.24);
    ctx.beginPath(); ctx.moveTo(BX - BW / 2, Yb(v)); ctx.lineTo(BX + BW / 2, Yb(v)); ctx.lineTo(BX + BW / 2, Yb(50) + 10); ctx.lineTo(BX + 5, COCK - 8); ctx.lineTo(BX - 5, COCK - 8); ctx.lineTo(BX - BW / 2, Yb(50) + 10); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.moveTo(BX - 5, COCK + 8); ctx.lineTo(BX + 5, COCK + 8); ctx.lineTo(BX + 5, TIP - 22); ctx.lineTo(BX + 2.5, TIP); ctx.lineTo(BX - 2.5, TIP); ctx.lineTo(BX - 5, TIP - 22); ctx.closePath(); ctx.fill(); ctx.restore();
    /* the buret's glass: an open tube, a taper to the stopcock, and the tip below it */
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    [-1, 1].forEach((s) => { ctx.beginPath(); ctx.moveTo(BX + s * (BW / 2 + 4), Yb(0) - 70); ctx.lineTo(BX + s * BW / 2, Yb(0) - 64); ctx.lineTo(BX + s * BW / 2, Yb(50) + 10); ctx.lineTo(BX + s * 5, COCK - 8); ctx.moveTo(BX + s * 5, COCK + 8); ctx.lineTo(BX + s * 5, TIP - 22); ctx.lineTo(BX + s * 2.5, TIP); ctx.stroke(); });
    ctx.restore();
    for (let mL = 0; mL <= 50; mL++) { const big = mL % 10 === 0, mid = mL % 5 === 0; line(ctx, BX + BW / 2, Yb(mL), BX + BW / 2 - (big ? BW : mid ? 18 : 10), Yb(mL), PAL.ink, big ? 2 : 1.1); if (big) text(ctx, String(mL), BX + BW / 2 + 9, Yb(mL), PAL.muted, { size: 17 }); }
    /* the stopcock: a barrel across the tube and its key */
    ctx.save(); ctx.fillStyle = PAL.soft; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2.5; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.roundRect(BX - 20, COCK - 8, 40, 16, 4); ctx.fill(); ctx.stroke();
    ctx.fillStyle = PAL.ink; ctx.beginPath(); ctx.roundRect(BX - 15, COCK - 3.5, 30, 7, 3); ctx.fill(); ctx.restore();
    /* the surface in the buret, read at the bottom of its meniscus, and the reading carried out to the right */
    ctx.save(); ctx.strokeStyle = cV; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(BX - BW / 2 + 2, Yb(v) - 3); ctx.quadraticCurveTo(BX, Yb(v) + 3, BX + BW / 2 - 2, Yb(v) - 3); ctx.stroke(); ctx.restore();
    line(ctx, BX + BW / 2 + 40, Yb(v), BX + BW / 2 + 58, Yb(v), cV, 2.5);
    F.rich(ctx, [[`${to(v)} mL`, cV]], BX + BW / 2 + 66, Yb(v), { size: 20 });
    text(ctx, '0.100 M NaOH', BX + BW / 2 + 22, CY, PAL.ink, { size: 19 });
    /* the flask under the tip: the sample and the titrant delivered, at the level that volume takes, in the
       indicator's colour at the solution's pH */
    const lv = levelOf(VA + v);
    ctx.save(); flaskPath(ctx); ctx.clip();
    ctx.fillStyle = alpha(cV, 0.12); ctx.fillRect(BX - WB - 4, lv.y, 2 * WB + 8, FB - lv.y + 4);
    ctx.fillStyle = alpha(tintNow, 0.9); ctx.fillRect(BX - WB - 4, lv.y, 2 * WB + 8, FB - lv.y + 4);
    ctx.restore();
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; flaskPath(ctx); ctx.stroke(); ctx.restore();
    line(ctx, BX - lv.w + 3, lv.y, BX + lv.w - 3, lv.y, alpha(PAL.ink, 0.55), 2);
    F.rich(ctx, ['0.100 M ', [which === 'strong' ? 'HCl' : acetic ? 'CH₃CO₂H' : 'HA', mc]], BX + 44, FM - 2, { size: 19 });
    text(ctx, ic.name, BX + 44, FM + 24, PAL.ink, { size: 19 });
    hits.push({ x: BX, y: (Yb(v) + Yb(50)) / 2, r: 26, name: `buret of 0.100 M NaOH, ${to(v)} mL delivered` },
      { x: BX, y: Yb(v), r: 14, name: `meniscus at the ${to(v)} mL mark` },
      { x: BX, y: COCK, r: 22, name: 'stopcock' }, { x: BX, y: TIP - 14, r: 12, name: 'tip of the buret' },
      { x: (RODX + BX) / 2, y: CY, r: 30, name: 'clamp that holds the buret upright' },
      { x: RODX, y: 200, r: 18, name: 'stand' }, { x: RODX, y: 480, r: 18, name: 'stand' }, { x: RODX, y: BENCH - 13, r: 26, name: 'stand' },
      { x: BX, y: (lv.y + FB) / 2, r: 70, name: `flask: 25.00 mL of 0.100 M ${sample} with ${ic.name}, ${word} at pH ${to(p)}; ${to(VA + v)} mL in all` });
  }
  register(d.fig, { update: () => {}, draw });
})();
};
