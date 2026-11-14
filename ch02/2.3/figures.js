/* Figures for section 2.3 Atomic Structure and Symbolism. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['2.3'] = function (root, F) {
const { fmt, tex, C, PAL, alpha, ctl, register, begin, line, text, headline, cycle } = F;
const sim = (id, H) => F.sim(root, id, H);

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
   the charge from the counts. Opens on the book's ⁴₂He²⁺; 12, 12 and 10
   give its ²⁴₁₂Mg²⁺. Still: the atom answers its sliders and nothing
   here has a clock.
===================================================================== */
(function () {
  const d = sim('sim-atom-symbol', 620);
  const NAMES = ['hydrogen', 'helium', 'lithium', 'beryllium', 'boron', 'carbon', 'nitrogen', 'oxygen', 'fluorine', 'neon', 'sodium', 'magnesium'];
  const SYMS = ['H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne', 'Na', 'Mg'];
  /* the stable isotopes of hydrogen to magnesium, by mass number */
  const STABLE = [[1, 2], [3, 4], [6, 7], [9], [10, 11], [12, 13], [14, 15], [16, 17, 18], [19], [20, 21, 22], [23], [24, 25, 26]];
  const P = ctl(d.controls, { label: '\\text{protons}', cls: '', min: 1, max: 12, step: 1, value: 2, unit: '', dec: 0, aria: 'number of protons' });
  const N = ctl(d.controls, { label: '\\text{neutrons}', cls: '', min: 0, max: 14, step: 1, value: 2, unit: '', dec: 0, aria: 'number of neutrons' });
  const E = ctl(d.controls, { label: '\\text{electrons}', cls: '', min: 0, max: 14, step: 1, value: 0, unit: '', dec: 0, aria: 'number of electrons',
    specials: [{ at: () => P.v, label: 'neutral' }] });
  let hits = [];
  F.hover(d.stage, () => hits);
  const count = (k, one, many) => (k === 0 ? 'no ' + many : k + ' ' + (k === 1 ? one : many));
  function draw() {
    const { ctx } = begin(d.c);
    const p = P.v, n = N.v, e = E.v, A = p + n, q = p - e;
    const name = NAMES[p - 1], sym = SYMS[p - 1], stable = STABLE[p - 1].includes(A);
    hits = [];
    /* the nucleus: protons and neutrons interleaved evenly and packed outward from the centre */
    const cx = 330, cy = 345, r = 19, tot = p + n;
    const spots = [];
    for (let k = 0; k < tot; k++) {
      const isP = Math.floor(((k + 1) * p) / tot) > Math.floor((k * p) / tot);
      const rr = k === 0 ? 0 : 23 * Math.sqrt(k + 0.8), a = k * 2.39996;
      spots.push({ x: cx + rr * Math.cos(a), y: cy + rr * Math.sin(a), isP });
    }
    for (let k = spots.length - 1; k >= 0; k--) {
      const s = spots[k];
      disc(ctx, s.x, s.y, r, F.el(s.isP ? 'p+' : 'n0'));
      if (s.isP) sign(ctx, s.x, s.y, r, true);
      hits.push({ x: s.x, y: s.y, r, name: s.isP ? 'proton' : 'neutron' });
    }
    /* the electrons, evenly round a dashed ring */
    const R = 205;
    ctx.save(); ctx.setLineDash([6, 10]); ctx.lineWidth = 2; ctx.strokeStyle = alpha(PAL.ink, 0.35);
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, 2 * Math.PI); ctx.stroke(); ctx.restore();
    for (let k = 0; k < e; k++) {
      const a = -Math.PI / 2 + (k * 2 * Math.PI) / Math.max(e, 1);
      const x = cx + R * Math.cos(a), y = cy + R * Math.sin(a);
      disc(ctx, x, y, 13, F.el('e-'));
      sign(ctx, x, y, 13, false);
      hits.push({ x, y, r: 15, name: 'electron' });
    }
    /* the key: one of each kind */
    F.legend(ctx, { l: 40, r: 620, t: 560, b: 612 }, [['p+', 'proton', true], ['n0', 'neutron', null], ['e-', 'electron', false]].map(([k, s, pl]) => ({
      s, draw: (c, x, y) => { disc(c, x, y, 10, F.el(k)); if (pl !== null) sign(c, x, y, 10, pl); } })), { corner: 'bottom', row: true, panel: false, size: 20 });
    /* the symbol: mass number up left, atomic number down left, charge up right */
    const sx = 1010, sy = 320, big = 170, sm = 68;
    const w = F.measure(ctx, sym, { size: big });
    text(ctx, sym, sx, sy, PAL.ink, { size: big, align: 'center' });
    const left = sx - w / 2 - 12, right = sx + w / 2 + 12, up = sy - 68, down = sy + 72;
    text(ctx, String(A), left, up, PAL.ink, { size: sm, align: 'right', weight: 600 });
    text(ctx, String(p), left, down, PAL.ink, { size: sm, align: 'right', weight: 600 });
    if (q !== 0) text(ctx, chargeSup(q), right, up, C('charge'), { size: sm, weight: 600 });
    /* the three parts named, as the book labels them */
    const aw = F.measure(ctx, String(A), { size: sm, weight: 600 });
    const zw = F.measure(ctx, String(p), { size: sm, weight: 600 });
    const lx = 740, guide = alpha(PAL.ink, 0.4);
    line(ctx, left - aw - 14, up, lx + 10, up - 46, guide, 2);
    text(ctx, 'mass number', lx, up - 46, PAL.ink, { size: 22, align: 'right' });
    line(ctx, left - zw - 14, down, lx + 10, down + 46, guide, 2);
    text(ctx, 'atomic number', lx, down + 46, PAL.ink, { size: 22, align: 'right' });
    text(ctx, '(often omitted)', lx, down + 72, PAL.muted, { size: 18, align: 'right' });
    const cw = q !== 0 ? F.measure(ctx, chargeSup(q), { size: sm, weight: 600 }) : 0;
    const rx = Math.min(1270, right + cw + 110);
    line(ctx, right + cw + 14, up, rx - 10, up - 46, guide, 2);
    text(ctx, q === 0 ? 'charge (none)' : 'charge', rx, up - 46, q === 0 ? PAL.muted : C('charge'), { size: 22 });
    text(ctx, name + '-' + A + ' is ' + (stable ? 'a stable' : 'an unstable') + ' isotope', sx, 540, PAL.muted, { size: 20, align: 'center' });
    const kind = q === 0 ? 'a neutral atom' : q > 0 ? 'a cation' : 'an anion';
    headline(ctx, `${count(p, 'proton makes', 'protons make')} this ${name}. With ${count(n, 'neutron', 'neutrons')} it is ${name}-${A}, and with ${count(e, 'electron', 'electrons')} it is ${kind}.`);
    tex(d.readout, `\\text{mass number} = \\text{number of protons} + \\text{number of neutrons} = ${p} + ${n} = ${A} \\\\ `
      + `\\text{atomic charge} = \\text{number of protons} - \\text{number of electrons} = ${p} - ${e} = \\htmlClass{kv-charge}{${chargeWord(q)}}`);
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
  const d = sim('sim-average-mass', 540);
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
  const cur = () => ELEMENTS[pick.value];
  const lab = (el, i) => `{}^{${el.iso[i].A}}\\text{${el.sym}}`;
  const pick = F.select(d.controls, { label: 'element', aria: 'element', value: 'boron',
    options: Object.keys(ELEMENTS).map((k) => ({ value: k, label: k })), onInput: () => setup() });
  const S1 = ctl(d.controls, { label: lab(ELEMENTS.boron, 0), cls: '', min: 0, max: 100, step: 0.01, value: 19.9, unit: '%', dec: 2, aria: 'percent of the first isotope',
    specials: [{ at: () => cur().iso[0].nat, label: 'nature' }],
    onInput: () => { if (cur().iso.length === 3 && S1.v + S2.v > 100) S2.set(100 - S1.v); } });
  const S2 = ctl(d.controls, { label: lab(ELEMENTS.neon, 1), cls: '', min: 0, max: 10, step: 0.01, value: 0.47, unit: '%', dec: 2, aria: 'percent of the second isotope',
    specials: [{ at: () => (cur().iso.length === 3 ? cur().iso[1].nat : null), label: 'nature' }],
    onInput: () => { if (S1.v + S2.v > 100) S1.set(100 - S2.v); } });
  S2.show(false, { ms: 0 });
  function setup() {
    const e = cur(), three = e.iso.length === 3;
    S1.relabel(lab(e, 0)); S1.range({ min: 0, max: 100, step: 0.01, value: e.start[0], unit: '%', dec: 2 });
    if (three) { S2.relabel(lab(e, 1)); S2.range({ min: 0, max: 10, step: 0.01, value: e.start[1], unit: '%', dec: 2 }); }
    S2.show(three);
    S1.refresh(); S2.refresh();
  }
  function draw() {
    const { ctx } = begin(d.c);
    const e = cur(), n = e.iso.length, cm = C('mass');
    const pct = n === 3 ? [S1.v, S2.v, Math.max(0, 100 - S1.v - S2.v)] : [S1.v, 100 - S1.v];
    const prod = e.iso.map((s, i) => +((pct[i] / 100) * s.m).toFixed(2));
    const avg = +prod.reduce((a, b) => a + b, 0).toFixed(2);
    const lo = Math.round(e.iso[0].m) - 0.5, hi = Math.round(e.iso[n - 1].m) + 0.5;
    /* the mass axis spans half a mass unit either side of the isotopes; abundance 0 to 100 %, with room above the box for the name over a full bar */
    const box = { l: 150, r: 1300, t: 150, b: 420 };
    const { X, Y } = F.axes(ctx, box, [lo, hi], [0, 100], { nx: Math.round((hi - lo) * 2), ny: 4, fx: (v) => fmt(v, 1),
      xl: 'isotopic mass (amu)', xc: cm, yl: 'abundance (%)' });
    e.iso.forEach((s, i) => {
      const x = X(s.m), y = Y(pct[i]);
      const col = s.ref ? F.ref(s.ref) : F.cat(i);
      ctx.save(); ctx.fillStyle = col; ctx.fillRect(x - 20, y, 40, box.b - y); ctx.restore();
      F.rich(ctx, [[`${e.sym}-${s.A}`, col, 600], `  ${fmt(pct[i], 2)} %`], x, y - 20, { size: 20, align: 'center' });
    });
    /* the balance point: a fulcrum under the axis and a dashed line up through the bars */
    const xa = X(avg);
    line(ctx, xa, Y(Math.max(...pct)), xa, box.b, cm, 3, [10, 10]);
    ctx.save(); ctx.beginPath(); ctx.moveTo(xa, box.b + 2); ctx.lineTo(xa - 13, box.b + 18); ctx.lineTo(xa + 13, box.b + 18); ctx.closePath();
    ctx.fillStyle = cm; ctx.fill(); ctx.restore();
    F.rich(ctx, ['average ', [`${fmt(avg, 2)} amu`, cm, 600]], xa, box.b + 96, { size: 22, align: 'center' });
    const name = pick.value;
    const only = e.iso.find((s, i) => pct[i] >= 99.995);
    const here = e.iso.filter((s, i) => pct[i] > 0.004).map((s) => `${name}-${s.A}`);
    const list = here.length === 2 ? here.join(' or ') : here.slice(0, -1).join(', ') + ', or ' + here[here.length - 1];
    headline(ctx, only ? `Every atom here is ${name}-${only.A}, so the average mass is the mass of one atom.`
      : `No single atom of ${name} has the average mass. Each one is ${list}.`);
    const term = e.iso.map((s, i) => `(${frac(pct[i])} \\times \\htmlClass{kv-mass}{${s.ms}\\ \\text{amu}})`);
    /* three terms are wider than the readout, so the third takes a line of its own */
    const terms = n === 3 ? `${term[0]} + ${term[1]} \\\\ {} + ${term[2]}` : term.join(' + ');
    const sums = prod.map((v) => `\\htmlClass{kv-mass}{${fmt(v, 2)}\\ \\text{amu}}`).join(' + ');
    /* the chain is wider than the readout, so it breaks before a relation sign (root rule 26.14) */
    tex(d.readout, `\\text{average mass} = ${terms} \\\\ = ${sums} = \\htmlClass{kv-mass}{${fmt(avg, 2)}\\ \\text{amu}}`);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 2.15: a mass spectrometer and the spectrum it writes, drawn as
   a flat section through the tube. The sample enters at the left and is
   vaporized under the heater; electrons from the source below knock
   electrons off its atoms; the cations pass the slits of two plates,
   which accelerate them; the field between the poles of the magnet bends
   their paths, the lightest most; and each ion that reaches the detector
   at the far end adds to the peak of its isotope. Moving: the ions fly
   and the peaks grow over one cycle, which is the clock of the idea.
   The tube is the same for every element: an ion of the middle mass
   follows its axis, and the others part from it `spread` times as far as
   they truly would (the radius of a path goes as the square root of the
   mass, so Zr-90 and Zr-96 truly differ by about 3 %); the factor is
   chosen per element so that every beam lands on the detector, and the
   stage says it (root rule 28.4).
===================================================================== */
(function () {
  const d = sim('sim-mass-spec', 600);
  /* isotopic masses (amu) and natural abundances (%); an isotope the text names wears its referent's colour, as in the Sim above */
  const ELEMENTS = {
    zirconium: { sym: 'Zr', spread: 8, iso: [{ A: 90, m: 89.9047, nat: 51.45 }, { A: 91, m: 90.9056, nat: 11.22 }, { A: 92, m: 91.9050, nat: 17.15 }, { A: 94, m: 93.9063, nat: 17.38 }, { A: 96, m: 95.9083, nat: 2.80 }] },
    boron: { sym: 'B', spread: 4, iso: [{ A: 10, m: 10.0129, nat: 19.9, ref: 'b-10' }, { A: 11, m: 11.0093, nat: 80.1, ref: 'b-11' }] },
    neon: { sym: 'Ne', spread: 4, iso: [{ A: 20, m: 19.9924, nat: 90.48, ref: 'ne-20' }, { A: 21, m: 20.9938, nat: 0.27, ref: 'ne-21' }, { A: 22, m: 21.9914, nat: 9.25, ref: 'ne-22' }] },
    chlorine: { sym: 'Cl', spread: 8, iso: [{ A: 35, m: 34.96885, nat: 75.76, ref: 'cl-35' }, { A: 37, m: 36.96590, nat: 24.24, ref: 'cl-37' }] },
  };
  const T = 6, IONS = 90;                        /* one cycle of 6 s; about 90 ions a cycle */
  const cy = cycle(() => T, 1.2);
  const pick = F.choice(d.controls, { label: 'element', aria: 'element', value: 'zirconium',
    options: Object.keys(ELEMENTS).map((k) => ({ value: k, label: k })), onInput: () => cy.reset() });
  /* the tube: its axis runs from X0 straight to the field at XA, round an arc of radius RM to XB, then FLY further to the detector */
  const Y0 = 240, TW = 120, X0 = 110, XS = 215, XP = [330, 420], XA = 520, XB = 670, RM = 250, FLY = 300, V = 620;
  function path(r) {
    const th = Math.asin((XB - XA) / r), ex = XB, ey = Y0 + r * (1 - Math.cos(th)), ux = Math.cos(th), uy = Math.sin(th);
    const L1 = XA - X0, L2 = r * th;
    const at = (l) => {
      if (l <= L1) return [X0 + l, Y0, 1, 0];
      if (l <= L1 + L2) { const a = (l - L1) / r; return [XA + r * Math.sin(a), Y0 + r * (1 - Math.cos(a)), Math.cos(a), Math.sin(a)]; }
      const k = l - L1 - L2; return [ex + ux * k, ey + uy * k, ux, uy];
    };
    return { at, L1, L2, ex, ey, ux, uy };
  }
  const MID = path(RM), LM = MID.L1 + MID.L2 + FLY;
  const [DX, DY, NX, NY] = MID.at(LM);            /* the centre of the detector and the way the axis meets it */
  /* the glass wall: the axis offset by half the tube's width either side, a round end at the left, a flat one at the detector */
  function tube(ctx) {
    const top = [], bot = [];
    for (let l = 0; l <= LM + 0.01; l += Math.min(8, LM - l) || 8) { const [x, y, ux, uy] = MID.at(l); top.push([x + uy * TW / 2, y - ux * TW / 2]); bot.push([x - uy * TW / 2, y + ux * TW / 2]); if (l >= LM) break; }
    ctx.beginPath(); ctx.moveTo(X0, Y0 + TW / 2); ctx.arc(X0, Y0, TW / 2, Math.PI / 2, 1.5 * Math.PI);
    top.forEach(([x, y]) => ctx.lineTo(x, y));
    for (let i = bot.length - 1; i >= 0; i--) ctx.lineTo(bot[i][0], bot[i][1]);
    ctx.closePath();
  }
  const rnd = (i, j) => { const s = Math.sin(i * 12.9898 + j * 78.233) * 43758.5453; return s - Math.floor(s); };
  /* the vaporized sample: a loose cloud of atoms under the heater */
  const CLOUD = Array.from({ length: 16 }, (_, k) => [XS - 8 + (rnd(k, 1) - 0.5) * 84, Y0 + 2 + (rnd(k, 2) - 0.5) * 26]);
  const hits = [
    { x: 36, y: Y0, r: 22, name: 'inlet for the sample' }, { x: XS - 8, y: Y0 + 2, r: 30, name: 'vaporized sample' },
    { x: XS - 8, y: Y0 - 38, r: 22, name: 'heater' }, { x: XS - 8, y: Y0 + 96, r: 34, name: 'electron beam source' },
    { x: XP[0], y: Y0 - 34, r: 24, name: 'accelerating plate' }, { x: XP[0], y: Y0 + 34, r: 24, name: 'accelerating plate' },
    { x: XP[1], y: Y0 - 34, r: 24, name: 'accelerating plate' }, { x: XP[1], y: Y0 + 34, r: 24, name: 'accelerating plate' },
    { x: (XA + XB) / 2, y: Y0 + 110, r: 40, name: 'magnetic field between the poles of a magnet' }, { x: DX + NX * 10, y: DY + NY * 10, r: 40, name: 'detector' },
  ];
  F.hover(d.stage, () => hits);
  const ro = F.readout(d);
  function draw() {
    const { ctx } = begin(d.c);
    const e = ELEMENTS[pick.value], t = cy.now(), mMid = (e.iso[0].m + e.iso[e.iso.length - 1].m) / 2;
    const cfld = F.ref('field'), csam = F.ref('sample'), guide = alpha(PAL.ink, 0.4);
    const isoCol = e.iso.map((s, i) => (s.ref ? F.ref(s.ref) : F.cat(i)));
    /* each isotope: its path, where it meets the detector, its speed past the plates, and when each of its ions leaves and lands */
    const W0 = XS - X0, a = XP[0] - XS, b = XP[1] - XP[0];
    const iso = e.iso.map((s, i) => {
      const P = path(RM * (1 + 0.5 * e.spread * (s.m - mMid) / mMid));
      const L3 = ((DX - P.ex) * NX + (DY - P.ey) * NY) / (P.ux * NX + P.uy * NY), L = P.L1 + P.L2 + L3;
      const v = V * Math.sqrt(mMid / s.m), v0 = 0.45 * v, tA = a / v0, tB = (2 * b) / (v0 + v), acc = (v - v0) / tB;
      const fly = tA + tB + (L - W0 - a - b) / v;
      /* the length travelled a time q after leaving the sample: drifting to the first plate, speeding up between the two, coasting after */
      const lAt = (q) => W0 + (q <= tA ? v0 * q : q <= tA + tB ? a + v0 * (q - tA) + 0.5 * acc * (q - tA) ** 2 : a + b + v * (q - tA - tB));
      return { P, L, fly, lAt, n: Math.max(1, Math.round((IONS * s.nat) / 100)) };
    });
    const win = T - 0.15 - Math.max(...iso.map((z) => z.fly));     /* ions leave during win, so the last has landed when the cycle ends */
    /* the inlet, the glass tube and the detector across its end */
    ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.06); ctx.strokeStyle = alpha(PAL.ink, 0.6); ctx.lineWidth = 3;
    ctx.beginPath(); ctx.rect(18, Y0 - 17, 36, 34); ctx.fill(); ctx.stroke();
    tube(ctx); ctx.fillStyle = PAL.panel; ctx.fill(); ctx.fillStyle = alpha(PAL.ink, 0.045); ctx.fill(); ctx.stroke(); ctx.restore();
    const px = -NY, py = NX, hw = TW / 2 + 8;
    line(ctx, DX + NX * 6 - px * hw, DY + NY * 6 - py * hw, DX + NX * 6 + px * hw, DY + NY * 6 + py * hw, PAL.ink, 12);
    /* the field between the poles of the magnet */
    ctx.save(); ctx.fillStyle = alpha(cfld, 0.16); ctx.strokeStyle = alpha(cfld, 0.7); ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.roundRect(XA, Y0 - 84, XB - XA, 244, 10); ctx.fill(); ctx.stroke(); ctx.restore();
    /* the heater: a coil above the sample, its two leads passing out through the glass */
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2.5;
    for (let i = 0; i < 7; i++) { ctx.beginPath(); ctx.ellipse(XS - 44 + i * 12, Y0 - 38, 7, 13, 0, 0, 2 * Math.PI); ctx.stroke(); }
    ctx.restore();
    line(ctx, XS - 51, Y0 - 38, XS - 51, Y0 - 84, PAL.ink, 2.5); line(ctx, XS + 35, Y0 - 38, XS + 35, Y0 - 84, PAL.ink, 2.5);
    /* the electron beam source under the tube, its electrons rising into the sample */
    ctx.save(); ctx.fillStyle = PAL.muted; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2; ctx.beginPath(); ctx.rect(XS - 26, Y0 + TW / 2 + 2, 36, 62); ctx.fill(); ctx.stroke(); ctx.restore();
    for (let k = 0; k < 5; k++) {
      const x1 = XS - 8, y1 = Y0 + TW / 2, x2 = XS - 8 + (k - 2) * 15, y2 = Y0 + 16;
      line(ctx, x1, y1, x2, y2, guide, 1.5);
      const f = (t * 1.6 + k * 0.37) % 1;
      disc(ctx, x1 + (x2 - x1) * f, y1 + (y2 - y1) * f, 4.5, F.el('e-'), 1);
    }
    /* the two plates, each with a slit on the axis */
    XP.forEach((x) => { line(ctx, x, Y0 - 54, x, Y0 - 11, PAL.ink, 8); line(ctx, x, Y0 + 11, x, Y0 + 54, PAL.ink, 8); });
    /* the paths: one beam as far as the field, then one path for each isotope in its own colour */
    line(ctx, XS, Y0, XA, Y0, guide, 3);
    iso.forEach((z, i) => {
      ctx.save(); ctx.strokeStyle = alpha(isoCol[i], 0.75); ctx.lineWidth = 3; ctx.lineJoin = 'round'; ctx.beginPath();
      for (let l = z.P.L1; l < z.L; l += 6) { const [x, y] = z.P.at(l); if (l === z.P.L1) ctx.moveTo(x, y); else ctx.lineTo(x, y); }
      const [x, y] = z.P.at(z.L); ctx.lineTo(x, y); ctx.stroke(); ctx.restore();
    });
    /* the sample and the ions in flight; an ion that has landed is counted, not drawn */
    const fill = F.el(e.sym);
    CLOUD.forEach(([x, y]) => disc(ctx, x, y, 7, fill, 1));
    const landed = iso.map((z, i) => {
      let c = 0;
      for (let j = 0; j < z.n; j++) {
        const q = t - (win * (j + rnd(i + 3, j))) / z.n;
        if (q < 0) continue;
        if (q >= z.fly) { c++; continue; }
        const [x, y] = z.P.at(z.lAt(q));
        disc(ctx, x, y, 8, fill, 1.2); sign(ctx, x, y, 9, true);
      }
      return c;
    });
    /* the parts named */
    text(ctx, 'sample enters', 20, Y0 - 108, PAL.ink, { size: 18 });
    line(ctx, 36, Y0 - 92, 36, Y0 - 22, guide, 2);
    F.rich(ctx, ['heater vaporizes ', ['the sample', csam, 600]], XS - 56, Y0 - 108, { size: 18 });
    text(ctx, 'electron beam source', XS - 8, Y0 + 150, PAL.ink, { size: 18, align: 'center' });
    text(ctx, 'plates accelerate the ions', (XP[0] + XP[1]) / 2 + 20, Y0 + 96, PAL.ink, { size: 18, align: 'center' });
    line(ctx, (XP[0] + XP[1]) / 2, Y0 + 82, (XP[0] + XP[1]) / 2, Y0 + 30, guide, 2);
    text(ctx, 'magnetic field', XA + 40, Y0 + 186, cfld, { size: 18, weight: 600, align: 'center' });
    text(ctx, 'between the poles of a magnet', XA + 40, Y0 + 210, PAL.ink, { size: 17, align: 'center' });
    text(ctx, 'detector', DX + px * hw + 10, DY + py * hw + 36, PAL.ink, { size: 18, align: 'center' });
    F.legend(ctx, { l: 20, r: 520, t: 470, b: 560 }, [
      { s: `${e.sym}^{+} ion`, draw: (c, x, y) => { disc(c, x, y, 9, fill, 1.2); sign(c, x, y, 10, true); } },
      { s: 'electron', draw: (c, x, y) => disc(c, x, y, 5, F.el('e-'), 1) }], { corner: 'bl', row: true, panel: false, size: 18 });
    text(ctx, `The paths are drawn ${e.spread} times as far apart as they are.`, 30, 572, PAL.muted, { size: 17 });
    /* the spectrum: relative abundance 0 to 100 % against mass-to-charge ratio, a unit either side of the isotopes */
    const lo = e.iso[0].A - 1, hi = e.iso[e.iso.length - 1].A + 1, wide = hi - lo > 4;
    const box = { l: 1020, r: 1375, t: 170, b: 470 };
    const { X, Y } = F.axes(ctx, box, [lo, hi], [0, 100], { nx: hi - lo, ny: 4, fx: (v) => (!wide || (v - lo) % 2 === 1 ? fmt(v, 0) : ''),
      xl: 'mass-to-charge ratio', yl: 'relative abundance (%)' });
    const taken = [];                               /* each name stands over its peak, raised clear of a neighbour's name */
    e.iso.forEach((s, i) => {
      const h = (s.nat * landed[i]) / iso[i].n, x = X(s.A), nm = `${e.sym}-${s.A}`;
      ctx.save(); ctx.fillStyle = isoCol[i]; ctx.fillRect(x - 10, Y(h), 20, box.b - Y(h)); ctx.restore();
      if (!landed[i]) return;
      const w = F.measure(ctx, nm, { size: 17, weight: 600 }) / 2 + 4;
      let y = Y(h) - 16;
      while (taken.some((b) => Math.abs(b.x - x) < b.w + w && Math.abs(b.y - y) < 22)) y -= 4;
      taken.push({ x, y, w });
      text(ctx, nm, x, y, isoCol[i], { size: 17, weight: 600, align: 'center' });
    });
    const sum = landed.reduce((p, c) => p + c, 0), all = iso.reduce((p, z) => p + z.n, 0);
    headline(ctx, sum < all ? `${sum} of ${all} ions have reached the detector. Each one adds to the peak of its isotope.`
      : `All ${all} ions have reached the detector. Each peak is its isotope’s share of them.`);
    const prod = e.iso.map((s) => +((s.nat / 100) * s.m).toFixed(3));
    const avg = prod.reduce((p, c) => p + c, 0);
    const str = `\\text{average mass} = (${prod.map((v) => fmt(v, 3)).join(' + ')})\\ \\text{amu} = \\htmlClass{kv-mass}{${fmt(avg, 3)}\\ \\text{amu}}`;
    ro.set(str, 'Each term is an isotope’s fractional abundance, the height of its finished peak, times its isotopic mass.');
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();
};
