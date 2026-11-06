/* Figures for section 2.3 Atomic Structure and Symbolism. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['2.3'] = function (root, F) {
const { el, fmt, tex, C, PAL, alpha, ctl, register, begin, line, text, headline, cycle } = F;
const sim = (id, H) => F.sim(root, id, H);
function readout(host, main, small) { host.textContent = ''; tex(host, main); if (small) host.appendChild(el('small', null, small)); }

/* a particle as the chapter draws it: a filled disc with an ink rim */
function disc(ctx, x, y, r, fill, w = 1.5) {
  ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, 2 * Math.PI); ctx.fillStyle = fill; ctx.fill();
  ctx.lineWidth = w; ctx.strokeStyle = PAL.ink; ctx.stroke(); ctx.restore();
}
/* the sign a particle carries, drawn as strokes in ink rather than as text */
function sign(ctx, x, y, r, plus) {
  const s = r * 0.5;
  line(ctx, x - s, y, x + s, y, PAL.ink, 2);
  if (plus) line(ctx, x, y - s, x, y + s, PAL.ink, 2);
}
/* a charge as the book writes it: 2+, 1−, or a bare sign on a symbol */
const chargeWord = (q) => (q === 0 ? '0' : Math.abs(q) + (q > 0 ? '+' : '−'));
const chargeSup = (q) => (q === 0 ? '' : (Math.abs(q) === 1 ? '' : String(Math.abs(q))) + (q > 0 ? '+' : '−'));
/* a fraction written as the book writes it, without trailing zeros */
const frac = (pct) => String(+(pct / 100).toFixed(4));

/* =====================================================================
   FIGURE 2.14: the symbol for an atom, built from its particles. The
   protons and neutrons pack into a nucleus, the electrons sit on a
   dashed ring round it (for counting only; shells are not yet taught),
   and the symbol beside writes the mass number, the atomic number and
   the charge from the counts. Still: the atom answers its sliders and
   nothing here has a clock.
===================================================================== */
(function () {
  const d = sim('sim-atom-symbol', 600);
  const NAMES = ['氢', '氦', '锂', '铍', '硼', '碳', '氮', '氧', '氟', '氖', '钠', '镁'];
  const SYMS = ['H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne', 'Na', 'Mg'];
  /* the stable isotopes of hydrogen to magnesium, by mass number */
  const STABLE = [[1, 2], [3, 4], [6, 7], [9], [10, 11], [12, 13], [14, 15], [16, 17, 18], [19], [20, 21, 22], [23], [24, 25, 26]];
  const P = ctl(d.controls, { label: '\\text{质子}', cls: '', min: 1, max: 12, step: 1, value: 2, unit: '', dec: 0, aria: '质子数' });
  const N = ctl(d.controls, { label: '\\text{中子}', cls: '', min: 0, max: 14, step: 1, value: 2, unit: '', dec: 0, aria: '中子数' });
  const E = ctl(d.controls, { label: '\\text{电子}', cls: '', min: 0, max: 14, step: 1, value: 0, unit: '', dec: 0, aria: '电子数',
    specials: [{ at: () => P.v, label: '中性' }] });
  let hits = [];
  F.hover(d.stage, () => hits);
  let last = '';
  function draw() {
    const { ctx } = begin(d.c);
    const p = P.v, n = N.v, e = E.v, A = p + n, q = p - e;
    const name = NAMES[p - 1], sym = SYMS[p - 1], stable = STABLE[p - 1].includes(A);
    hits = [];
    /* the nucleus: protons and neutrons interleaved evenly and packed outward from the centre */
    const cx = 330, cy = 330, r = 14, tot = p + n;
    const spots = [];
    for (let k = 0; k < tot; k++) {
      const isP = Math.floor(((k + 1) * p) / tot) > Math.floor((k * p) / tot);
      const rr = k === 0 ? 0 : 17 * Math.sqrt(k + 0.8), a = k * 2.39996;
      spots.push({ x: cx + rr * Math.cos(a), y: cy + rr * Math.sin(a), isP });
    }
    for (let k = spots.length - 1; k >= 0; k--) {
      const s = spots[k];
      disc(ctx, s.x, s.y, r, F.el(s.isP ? 'p+' : 'n0'));
      if (s.isP) sign(ctx, s.x, s.y, r, true);
      hits.push({ x: s.x, y: s.y, r, name: s.isP ? '质子' : '中子' });
    }
    /* the electrons, evenly round a dashed ring */
    const R = 200;
    ctx.save(); ctx.setLineDash([6, 10]); ctx.lineWidth = 2; ctx.strokeStyle = alpha(PAL.ink, 0.35);
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, 2 * Math.PI); ctx.stroke(); ctx.restore();
    for (let k = 0; k < e; k++) {
      const a = -Math.PI / 2 + (k * 2 * Math.PI) / Math.max(e, 1);
      const x = cx + R * Math.cos(a), y = cy + R * Math.sin(a);
      disc(ctx, x, y, 10, F.el('e-'));
      sign(ctx, x, y, 10, false);
      hits.push({ x, y, r: 12, name: '电子' });
    }
    /* the legend, one representative of each kind */
    const ly = 568;
    [['p+', '质子', true], ['n0', '中子', null], ['e-', '电子', false]].forEach(([k, s, pl], i) => {
      const x = 90 + i * 170, rr = k === 'e-' ? 10 : r;
      disc(ctx, x, ly, rr, F.el(k));
      if (pl !== null) sign(ctx, x, ly, rr, pl);
      text(ctx, s, x + 24, ly, PAL.ink, { size: 20 });
    });
    /* the symbol: mass number up left, atomic number down left, charge up right */
    const sx = 980, sy = 300, big = 132;
    const w = F.measure(ctx, sym, { size: big });
    text(ctx, sym, sx, sy, PAL.ink, { size: big, align: 'center' });
    const left = sx - w / 2 - 10, right = sx + w / 2 + 10, up = sy - 52, down = sy + 56;
    text(ctx, String(A), left, up, PAL.ink, { size: 56, align: 'right', weight: 600 });
    text(ctx, String(p), left, down, PAL.ink, { size: 56, align: 'right', weight: 600 });
    if (q !== 0) text(ctx, chargeSup(q), right, up, C('charge'), { size: 56, weight: 600 });
    /* the three parts named, as the book labels them */
    const aw = F.measure(ctx, String(A), { size: 56, weight: 600 });
    const zw = F.measure(ctx, String(p), { size: 56, weight: 600 });
    line(ctx, left - aw - 12, up, 730, up - 40, alpha(PAL.ink, 0.4), 2);
    text(ctx, '质量数', 720, up - 40, PAL.ink, { size: 20, align: 'right' });
    line(ctx, left - zw - 12, down, 730, down + 40, alpha(PAL.ink, 0.4), 2);
    text(ctx, '原子序数', 720, down + 40, PAL.ink, { size: 20, align: 'right' });
    text(ctx, '（常省略）', 720, down + 64, PAL.muted, { size: 17, align: 'right' });
    const cw = q !== 0 ? F.measure(ctx, chargeSup(q), { size: 56, weight: 600 }) : 0;
    line(ctx, right + cw + 10, up, 1250, up - 40, alpha(PAL.ink, 0.4), 2);
    text(ctx, q === 0 ? '电荷（无）' : '电荷', 1260, up - 40, q === 0 ? PAL.muted : C('charge'), { size: 20 });
    /* what the atom is */
    const kind = q === 0 ? '中性原子' : q > 0 ? '阳离子' : '阴离子';
    text(ctx, name + '-' + A + '（' + sym + '-' + A + '）', sx, 440, PAL.ink, { size: 24, weight: 600, align: 'center' });
    text(ctx, kind + '，' + (stable ? '稳定同位素' : '不稳定同位素'), sx, 476, PAL.muted, { size: 20, align: 'center' });
    headline(ctx, q === 0
      ? `中性的${name}-${A} 原子有 ${p} 个质子、${n} 个中子和 ${e} 个电子。`
      : `有 ${p} 个质子和 ${e} 个电子的${name}-${A} 离子，电荷为 ${chargeWord(q)}。`);
    const s = `\\text{原子电荷} = \\text{质子数} - \\text{电子数} = ${p} - ${e} = \\htmlClass{kv-charge}{${chargeWord(q)}}`;
    const small = `A = Z + 中子数 = ${p} + ${n} = ${A}。${q === 0 ? '原子呈电中性，因为质子数与电子数相等。' : q > 0 ? '原子失去了电子，所以它是阳离子。' : '原子得到了电子，所以它是阴离子。'}`;
    if (s + small !== last) { last = s + small; readout(d.readout, s, small); }
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   SIM: the average atomic mass as a balance point. Each isotope is a bar
   on a mass axis, as tall as its percent abundance, and the average sits
   under the bars where they would balance. Still: the average answers
   the mix and nothing here has a clock.
===================================================================== */
(function () {
  const d = sim('sim-average-mass', 520);
  /* isotopic masses and natural abundances from the text, Examples 2.4 and 2.5, and Table 2.4; start is the mix on load;
     an isotope the text names is a referent of the section, and lithium's, named only in Table 2.4, are told apart by F.cat */
  const ELEMENTS = {
    boron: { sym: 'B', iso: [{ A: 10, m: 10.0129, nat: 19.9, ref: 'b-10' }, { A: 11, m: 11.0093, nat: 80.1, ref: 'b-11' }], start: [19.9] },
    neon: { sym: 'Ne', iso: [{ A: 20, m: 19.9924, nat: 90.48, ref: 'ne-20' }, { A: 21, m: 20.9940, nat: 0.27, ref: 'ne-21' }, { A: 22, m: 21.9914, nat: 9.25, ref: 'ne-22' }], start: [91.84, 0.47] },
    chlorine: { sym: 'Cl', iso: [{ A: 35, m: 34.96885, nat: 75.76, ref: 'cl-35' }, { A: 37, m: 36.96590, nat: 24.24, ref: 'cl-37' }], start: [75.76] },
    lithium: { sym: 'Li', iso: [{ A: 6, m: 6.0151, nat: 7.59 }, { A: 7, m: 7.0160, nat: 92.41 }], start: [7.59] },
  };
  /* each mass also kept as the book prints it, trailing zeros included */
  Object.values(ELEMENTS).forEach((e) => e.iso.forEach((s) => { s.ms = s.m.toFixed(Math.max(4, (String(s.m).split('.')[1] || '').length)); }));
  const ZH = { boron: '硼', neon: '氖', chlorine: '氯', lithium: '锂' };
  const cur = () => ELEMENTS[pick.value];
  const lab = (el, i) => `{}^{${el.iso[i].A}}\\text{${el.sym}}\\ (\\%)`;
  const pick = F.select(d.controls, { label: '元素', aria: '元素', value: 'boron',
    options: Object.keys(ELEMENTS).map((k) => ({ value: k, label: ZH[k] })), onInput: () => setup() });
  const S1 = ctl(d.controls, { label: lab(ELEMENTS.boron, 0), cls: '', min: 0, max: 100, step: 0.01, value: 19.9, unit: '%', dec: 2, aria: '第一种同位素的百分数',
    specials: [{ at: () => cur().iso[0].nat, label: '天然' }],
    onInput: () => { if (cur().iso.length === 3 && S1.v + S2.v > 100) S2.set(100 - S1.v); } });
  const S2 = ctl(d.controls, { label: lab(ELEMENTS.neon, 1), cls: '', min: 0, max: 10, step: 0.01, value: 0.47, unit: '%', dec: 2, aria: '第二种同位素的百分数',
    specials: [{ at: () => (cur().iso.length === 3 ? cur().iso[1].nat : null), label: '天然' }],
    onInput: () => { if (S1.v + S2.v > 100) S1.set(100 - S2.v); } });
  S2.show(false, { ms: 0 });
  function setup() {
    const e = cur(), three = e.iso.length === 3;
    S1.relabel(lab(e, 0)); S1.range({ min: 0, max: 100, step: 0.01, value: e.start[0], unit: '%', dec: 2 });
    if (three) { S2.relabel(lab(e, 1)); S2.range({ min: 0, max: 10, step: 0.01, value: e.start[1], unit: '%', dec: 2 }); }
    S2.show(three);
    S1.refresh(); S2.refresh();
  }
  let last = '';
  function draw() {
    const { ctx } = begin(d.c);
    const e = cur(), n = e.iso.length;
    const pct = n === 3 ? [S1.v, S2.v, Math.max(0, 100 - S1.v - S2.v)] : [S1.v, 100 - S1.v];
    const prod = e.iso.map((s, i) => +((pct[i] / 100) * s.m).toFixed(2));
    const avg = +prod.reduce((a, b) => a + b, 0).toFixed(2);
    const lo = Math.round(e.iso[0].m) - 0.5, hi = Math.round(e.iso[n - 1].m) + 0.5;
    /* the mass axis spans half a mass unit either side of the isotopes; abundance 0 to 120 %, headroom for a bar's label at 100 % */
    const box = { l: 170, r: 1250, t: 120, b: 400 };
    const { X, Y } = F.axes(ctx, box, [lo, hi], [0, 120], { nx: Math.round((hi - lo) * 2), ny: 4, fx: (v) => fmt(v, 1),
      xl: '同位素质量（amu）', xc: C('mass'), yl: '丰度（%）' });
    e.iso.forEach((s, i) => {
      const x = X(s.m), y = Y(pct[i]);
      const col = s.ref ? F.ref(s.ref) : F.cat(i);
      ctx.save(); ctx.fillStyle = col; ctx.fillRect(x - 14, y, 28, box.b - y); ctx.restore();
      F.label(ctx, `${e.sym}-${s.A}, ${fmt(pct[i], 2)} %`, x, Math.min(y, box.b - 10) - 8, { side: 'above', size: 20, color: col });
    });
    /* the balance point: a fulcrum under the axis and a dashed line up through the bars */
    const xa = X(avg);
    line(ctx, xa, Y(Math.max(...pct)), xa, box.b, C('mass'), 3, [10, 10]);
    ctx.save(); ctx.beginPath(); ctx.moveTo(xa, box.b + 2); ctx.lineTo(xa - 11, box.b + 15); ctx.lineTo(xa + 11, box.b + 15); ctx.closePath();
    ctx.fillStyle = C('mass'); ctx.fill(); ctx.restore();
    text(ctx, `平均 ${fmt(avg, 2)} amu`, xa, box.b + 90, C('mass'), { size: 22, weight: 600, align: 'center', bg: alpha(PAL.panel, 0.9) });
    const name = ZH[pick.value];
    const only = e.iso.find((s, i) => pct[i] >= 99.995);
    headline(ctx, only ? `这个混合物中的每个原子都是${name}-${only.A}，所以平均质量就是它自己的质量，${fmt(avg, 2)} amu。`
      : `这个混合物中${name}的平均质量为 ${fmt(avg, 2)} amu，尽管没有哪个${name}原子具有这个质量。`);
    const terms = e.iso.map((s, i) => `(${frac(pct[i])} \\times \\htmlClass{kv-mass}{${s.ms}\\ \\text{amu}})`).join(' + ');
    const sums = prod.map((v) => `\\htmlClass{kv-mass}{${fmt(v, 2)}\\ \\text{amu}}`).join(' + ');
    const t = `\\text{平均质量} = ${terms} = ${sums} = \\htmlClass{kv-mass}{${fmt(avg, 2)}\\ \\text{amu}}`;
    const small = n === 3 ? `${e.sym}-${e.iso[2].A} 的百分数等于另外两种剩下的部分，${fmt(pct[2], 2)} %。` : `${e.sym}-${e.iso[1].A} 的百分数等于第一种剩下的部分，${fmt(pct[1], 2)} %。`;
    if (t + small !== last) { last = t + small; readout(d.readout, t, small); }
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 2.15: a mass spectrometer and the spectrum it writes. The
   sample is vaporized and ionized at the left, the cations are
   accelerated through two plates and bent by the magnetic field, the
   lightest most, and each isotope lands on the detector at its own
   place and adds to its own peak. Moving: the ions fly and the peaks
   grow over one cycle, which is the clock of the idea.
===================================================================== */
(function () {
  const d = sim('sim-mass-spec', 560);
  /* isotopic masses (amu) and natural abundances (%) */
  const ELEMENTS = {
    zirconium: { sym: 'Zr', iso: [{ A: 90, m: 89.9047, nat: 51.45 }, { A: 91, m: 90.9056, nat: 11.22 }, { A: 92, m: 91.9050, nat: 17.15 }, { A: 94, m: 93.9063, nat: 17.38 }, { A: 96, m: 95.9083, nat: 2.80 }] },
    boron: { sym: 'B', iso: [{ A: 10, m: 10.0129, nat: 19.9 }, { A: 11, m: 11.0093, nat: 80.1 }] },
    neon: { sym: 'Ne', iso: [{ A: 20, m: 19.9924, nat: 90.48 }, { A: 21, m: 20.9938, nat: 0.27 }, { A: 22, m: 21.9914, nat: 9.25 }] },
    chlorine: { sym: 'Cl', iso: [{ A: 35, m: 34.96885, nat: 75.76 }, { A: 37, m: 36.96590, nat: 24.24 }] },
  };
  const ZH = { zirconium: '锆', boron: '硼', neon: '氖', chlorine: '氯' };
  const pick = F.choice(d.controls, { label: '元素', aria: '元素', value: 'zirconium',
    options: Object.keys(ELEMENTS).map((k) => ({ value: k, label: ZH[k] })), onInput: () => cy.reset() });
  const T = 5, SPREAD = 6;                       /* one cycle of 5 s; path spread drawn six times its true size */
  const cy = cycle(() => T, 1.2);
  const Y0 = 230, XS = 150, XA = 470, XB = 610, R0 = 200, V0 = 700;
  const AN = 0.7, NX = Math.cos(AN), NY = Math.sin(AN);          /* the detector plate faces rays leaving at 40° */
  const DET = { x: XB + 250 * NX, y: Y0 + 50 + 250 * NY };      /* a point on the plate */
  /* the path of one isotope: straight to the field, an arc in it, straight out to the detector plate */
  function path(mMin, m) {
    const r = R0 * (1 + 0.5 * SPREAD * (m - mMin) / mMin);
    const th = Math.asin((XB - XA) / r), ex = XB, ey = Y0 + r * (1 - Math.cos(th));
    const ux = Math.cos(th), uy = Math.sin(th);
    const L1 = XA - XS, L2 = r * th, L3 = ((DET.x - ex) * NX + (DET.y - ey) * NY) / (ux * NX + uy * NY);
    const at = (l) => {
      if (l <= L1) return [XS + l, Y0];
      if (l <= L1 + L2) { const a = (l - L1) / r; return [XA + r * Math.sin(a), Y0 + r * (1 - Math.cos(a))]; }
      const k = l - L1 - L2; return [ex + ux * k, ey + uy * k];
    };
    return { at, L: L1 + L2 + L3, v: V0 * Math.sqrt(mMin / m) };
  }
  function stroke(ctx, P, l0, l1, color, w) {
    ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = w; ctx.lineJoin = 'round'; ctx.beginPath();
    for (let l = l0; l <= l1; l += 6) { const [x, y] = l < 0 ? [XS + l, Y0] : P.at(l); if (l === l0) ctx.moveTo(x, y); else ctx.lineTo(x, y); }
    const [x, y] = P.at(l1); ctx.lineTo(x, y); ctx.stroke(); ctx.restore();
  }
  let last = '';
  function draw() {
    const { ctx } = begin(d.c);
    const e = ELEMENTS[pick.value], t = cy.now(), mMin = e.iso[0].m;
    const paths = e.iso.map((s) => path(mMin, s.m));
    /* the tube, bent along the middle path, in ink */
    const mid = path(mMin, (mMin + e.iso[e.iso.length - 1].m) / 2);
    stroke(ctx, mid, -100, mid.L + 20, alpha(PAL.ink, 0.4), 94);
    stroke(ctx, mid, -98, mid.L + 18, PAL.panel, 90);
    stroke(ctx, mid, -98, mid.L + 18, alpha(PAL.ink, 0.05), 90);
    /* the heater coil, the electron beam and the accelerating plates */
    for (let i = 0; i < 5; i++) { ctx.save(); ctx.strokeStyle = PAL.muted; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(84 + i * 9, Y0 - 22, 6, 12, 0, 0, 2 * Math.PI); ctx.stroke(); ctx.restore(); }
    for (let i = -2; i <= 2; i++) line(ctx, 104, Y0 + 90, 104 + i * 9, Y0 + 20, alpha(PAL.ink, 0.45), 2);
    ctx.save(); ctx.fillStyle = PAL.muted; ctx.fillRect(92, Y0 + 90, 24, 40); ctx.restore();
    [250, 330].forEach((x) => { line(ctx, x, Y0 - 40, x, Y0 - 8, PAL.ink, 5); line(ctx, x, Y0 + 8, x, Y0 + 40, PAL.ink, 5); });
    /* the magnetic field region */
    const cfld = F.ref('field'), csam = F.ref('sample');
    ctx.save(); ctx.fillStyle = alpha(cfld, 0.16); ctx.fillRect(XA, Y0 - 70, XB - XA, 200); ctx.restore();
    /* the detector plate, centred on where the beams land */
    const hitsAt = paths.map((P) => P.at(P.L)), px = -NY, py = NX;
    const along = hitsAt.map(([x, y]) => (x - DET.x) * px + (y - DET.y) * py);
    const c0 = (Math.min(...along) + Math.max(...along)) / 2, half = (Math.max(...along) - Math.min(...along)) / 2 + 50;
    line(ctx, DET.x + (c0 - half) * px, DET.y + (c0 - half) * py, DET.x + (c0 + half) * px, DET.y + (c0 + half) * py, PAL.ink, 7);
    /* the paths, one per isotope in its categorical colour, drawn faintly */
    paths.forEach((P, i) => stroke(ctx, P, 0, P.L, alpha(F.cat(i), 0.6), 3));
    /* the ions: each isotope launches ions at a rate in proportion to its abundance */
    const ionColor = F.el(e.sym), RATE = 16;
    e.iso.forEach((s, i) => {
      const P = paths[i], rate = (RATE * s.nat) / 100, lag = (i * 0.13) % (1 / rate);
      for (let j = 0; j / rate + lag <= t; j++) {
        const l = (t - j / rate - lag) * P.v;
        if (l > P.L) continue;
        const [x, y] = P.at(l);
        disc(ctx, x, y, 7, ionColor, 1.2);
      }
    });
    /* the frame labels */
    text(ctx, '样品', 40, Y0 - 76, csam, { size: 18, weight: 600 });
    line(ctx, 64, Y0 - 62, 64, Y0 - 44, alpha(csam, 0.6), 2);
    text(ctx, '加热器', 150, Y0 - 76, PAL.ink, { size: 18 });
    line(ctx, 140, Y0 - 62, 120, Y0 - 36, alpha(PAL.ink, 0.4), 2);
    text(ctx, '电子束', 128, Y0 + 116, PAL.ink, { size: 18 });
    text(ctx, '加速极板', 290, Y0 + 70, PAL.ink, { size: 18, align: 'center' });
    text(ctx, '磁场', (XA + XB) / 2, Y0 - 90, cfld, { size: 18, weight: 600, align: 'center' });
    const [dx, dy] = [DET.x + (c0 + half) * px, DET.y + (c0 + half) * py];
    text(ctx, '探测器', dx - 20, dy + 26, PAL.ink, { size: 18, align: 'right' });
    /* the spectrum: relative abundance 0 to 100 % against mass-to-charge ratio, a unit either side of the isotopes */
    const lo = e.iso[0].A - 1, hi = e.iso[e.iso.length - 1].A + 1, wide = hi - lo > 4;
    const box = { l: 960, r: 1360, t: 150, b: 440 };
    const { X, Y } = F.axes(ctx, box, [lo, hi], [0, 100], { nx: hi - lo, ny: 4, fx: (v) => (!wide || (v - lo) % 2 === 1 ? fmt(v, 0) : ''),
      xl: '质荷比', yl: '相对丰度（%）' });
    e.iso.forEach((s, i) => {
      const travel = paths[i].L / paths[i].v, k = Math.max(0, Math.min(1, (t - travel) / (T - travel)));
      const h = s.nat * k, x = X(s.A);
      ctx.save(); ctx.fillStyle = F.cat(i); ctx.fillRect(x - 9, Y(h), 18, box.b - Y(h)); ctx.restore();
      if (k > 0) text(ctx, `${e.sym}-${s.A}`, x, Y(h) - 16 - (wide && i % 2 ? 24 : 0), PAL.ink, { size: 17, align: 'center' });
    });
    text(ctx, `路径的散布按其真实大小的 ${SPREAD} 倍绘制。`, box.l, box.b + 90, PAL.muted, { size: 16 });
    headline(ctx, `${e.iso.map((s) => e.sym + '-' + s.A).join('、')} 的离子被磁场偏转，最轻的偏转得最厉害，并被分选成各个峰。`);
    const prod = e.iso.map((s) => +((s.nat / 100) * s.m).toFixed(2));
    const avg = prod.reduce((a, b) => a + b, 0);
    const str = `\\text{平均质量} = (${prod.map((v) => fmt(v, 2)).join(' + ')})\\ \\text{amu} = \\htmlClass{kv-mass}{${fmt(avg, 2)}\\ \\text{amu}}`;
    if (str !== last) { last = str; readout(d.readout, str, '每一项都是一种同位素的丰度分数（即其峰的高度）乘以它的同位素质量。'); }
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();
};
