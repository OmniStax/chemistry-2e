/* Figures for section 6.5 Periodic Variations in Element Properties. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['6.5'] = function (root, F) {
const { fmt, tex, C, PAL, alpha, register, begin, line, arrow, dot, text, headline, axes, curve, hbracket } = F;
const sim = (id, H) => F.sim(root, id, H);
const still = (d, draw) => register(d.fig, { update: () => {}, draw });
const TAU = 2 * Math.PI;
const minus = (s) => String(s).replace('-', '−');

/* The elements through radium: symbol, name, group (0 for the lanthanides), period, radius in pm,
   IE₁ in kJ/mol, whether the book prints that IE₁ (Figure 6.34), the electron affinity Figure 6.35
   prints (a string where it marks a calculated value with an asterisk), and whether the radius is
   one the book prints (Table 6.2, Figure 6.31 and the text of 6.5). The other radii and IE₁ values
   are those of the book's elements page. */
const ELEMENTS = [
  ['H','Hydrogen',1,1,31,1310,true,-72,0], ['He','Helium',18,1,31,2370,true,'20*',1], ['Li','Lithium',1,2,167,520,true,-60,1], ['Be','Beryllium',2,2,96,900,true,'240*',0], ['B','Boron',13,2,84,800,true,-23,0], ['C','Carbon',14,2,76,1090,true,-123,0],
  ['N','Nitrogen',15,2,71,1400,true,0,0], ['O','Oxygen',16,2,66,1310,true,-141,0], ['F','Fluorine',17,2,64,1680,true,-322,1], ['Ne','Neon',18,2,38,2080,true,'30*',1], ['Na','Sodium',1,3,190,490,true,-53,1], ['Mg','Magnesium',2,3,141,730,true,'230*',0],
  ['Al','Aluminum',13,3,118,580,true,-44,1], ['Si','Silicon',14,3,111,780,true,-120,0], ['P','Phosphorus',15,3,107,1060,true,-74,0], ['S','Sulfur',16,3,104,1000,true,-200,1], ['Cl','Chlorine',17,3,99,1250,true,-348,1], ['Ar','Argon',18,3,71,1520,true,'35*',1],
  ['K','Potassium',1,4,243,420,true,-48,1], ['Ca','Calcium',2,4,176,590,true,'150*',0], ['Sc','Scandium',3,4,170,630,true,null,0], ['Ti','Titanium',4,4,160,660,true,null,0], ['V','Vanadium',5,4,153,650,true,null,0], ['Cr','Chromium',6,4,139,660,true,null,0],
  ['Mn','Manganese',7,4,139,710,true,null,0], ['Fe','Iron',8,4,132,760,true,null,0], ['Co','Cobalt',9,4,126,760,true,null,0], ['Ni','Nickel',10,4,124,730,true,null,0], ['Cu','Copper',11,4,132,740,true,null,0], ['Zn','Zinc',12,4,122,910,true,null,0],
  ['Ga','Gallium',13,4,122,580,true,'-40*',0], ['Ge','Germanium',14,4,120,780,true,-115,0], ['As','Arsenic',15,4,119,960,true,-7,0], ['Se','Selenium',16,4,120,950,true,-195,0], ['Br','Bromine',17,4,114,1140,true,-324,1], ['Kr','Krypton',18,4,88,1350,true,'40*',1],
  ['Rb','Rubidium',1,5,265,400,true,-46,1], ['Sr','Strontium',2,5,195,550,true,'160*',0], ['Y','Yttrium',3,5,190,620,true,null,0], ['Zr','Zirconium',4,5,175,660,true,null,0], ['Nb','Niobium',5,5,164,670,true,null,0], ['Mo','Molybdenum',6,5,154,680,true,null,0],
  ['Tc','Technetium',7,5,147,700,true,null,0], ['Ru','Ruthenium',8,5,146,710,true,null,0], ['Rh','Rhodium',9,5,142,720,true,null,0], ['Pd','Palladium',10,5,139,800,true,null,0], ['Ag','Silver',11,5,145,730,true,null,0], ['Cd','Cadmium',12,5,144,870,true,null,0],
  ['In','Indium',13,5,142,560,true,'-40*',0], ['Sn','Tin',14,5,139,700,true,-121,0], ['Sb','Antimony',15,5,139,830,true,-101,0], ['Te','Tellurium',16,5,138,870,true,-190,0], ['I','Iodine',17,5,133,1010,true,-295,1], ['Xe','Xenon',18,5,108,1170,true,'40*',1],
  ['Cs','Cesium',1,6,298,380,true,-45,1], ['Ba','Barium',2,6,215,500,true,'50*',0], ['La','Lanthanum',3,6,207,540,true,null,0], ['Ce','Cerium',0,6,204,534,false,null,0], ['Pr','Praseodymium',0,6,203,527,false,null,0], ['Nd','Neodymium',0,6,201,533,false,null,0],
  ['Pm','Promethium',0,6,199,540,false,null,0], ['Sm','Samarium',0,6,198,545,false,null,0], ['Eu','Europium',0,6,198,547,false,null,0], ['Gd','Gadolinium',0,6,196,593,false,null,0], ['Tb','Terbium',0,6,194,566,false,null,0], ['Dy','Dysprosium',0,6,192,573,false,null,0],
  ['Ho','Holmium',0,6,192,581,false,null,0], ['Er','Erbium',0,6,189,589,false,null,0], ['Tm','Thulium',0,6,190,597,false,null,0], ['Yb','Ytterbium',0,6,187,603,false,null,0], ['Lu','Lutetium',0,6,187,524,false,null,0], ['Hf','Hafnium',4,6,175,700,true,null,0],
  ['Ta','Tantalum',5,6,170,760,true,null,0], ['W','Tungsten',6,6,162,770,true,null,0], ['Re','Rhenium',7,6,151,760,true,null,0], ['Os','Osmium',8,6,144,840,true,null,0], ['Ir','Iridium',9,6,141,890,true,null,0], ['Pt','Platinum',10,6,136,870,true,null,0],
  ['Au','Gold',11,6,136,890,true,null,0], ['Hg','Mercury',12,6,132,1000,true,null,0], ['Tl','Thallium',13,6,145,590,true,-50,0], ['Pb','Lead',14,6,146,710,true,-101,0], ['Bi','Bismuth',15,6,148,800,true,-101,0], ['Po','Polonium',16,6,140,810,true,-170,0],
  ['At','Astatine',17,6,148,890,false,'-270*',1], ['Rn','Radon',18,6,150,1030,true,'40*',0], ['Fr','Francium',1,7,260,380,false,null,0], ['Ra','Radium',2,7,221,510,true,null,0]
];
const EL = ELEMENTS.map(([sym, name, group, period, r, ie, ieBook, ea, rBook], i) => ({ sym, name, Z: i + 1, group, period, r, ie, ieBook, ea, rBook }));
const BY = Object.fromEntries(EL.map((e) => [e.sym, e]));
const eaNum = (e) => (e.ea === null ? null : parseFloat(e.ea));
const eaText = (e) => { const v = eaNum(e); if (v === null) return ''; return (v > 0 ? '+' : v < 0 ? '−' : '') + Math.abs(v) + (String(e.ea).includes('*') ? '*' : ''); };

/* an atom or ion as a sphere in its element colour, shaded as the book draws it in perspective */
function sphere(ctx, x, y, r, sym) {
  if (!(r > 0.5)) return;
  const base = F.el(sym);
  const g = ctx.createRadialGradient(x - r * 0.35, y - r * 0.4, r * 0.08, x, y, r);
  g.addColorStop(0, F.mixColor(base, PAL.soft, 0.5)); g.addColorStop(0.55, base); g.addColorStop(1, F.mixColor(base, PAL.muted, 0.35));
  ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fillStyle = g; ctx.fill();
  ctx.lineWidth = 1.5; ctx.strokeStyle = alpha(PAL.ink, 0.45); ctx.stroke(); ctx.restore();
}
function disc(ctx, x, y, r, sym) {
  ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fillStyle = F.el(sym); ctx.fill();
  ctx.lineWidth = 1.2; ctx.strokeStyle = alpha(PAL.ink, 0.45); ctx.stroke(); ctx.restore();
}

/* =====================================================================
   FIGURE 6.30: the covalent radius as half the distance between two
   identical nuclei, for the halogen chosen, above the covalent radii of
   the table drawn to scale. Still: a radius has no clock; the choice
   morphs the molecule from one halogen to the next.
===================================================================== */
(function () {
  const d = sim('sim-halogen-radii', 860);
  const HAL = { F: { d: 128, r: 64 }, Cl: { d: 198, r: 99 }, Br: { d: 228, r: 114 }, I: { d: 266, r: 133 } };
  const pick = F.choice(d.controls, { label: '\\text{halogen}', options: Object.keys(HAL).map((s) => ({ value: s, label: BY[s].name.toLowerCase() })), value: 'Cl', aria: 'which halogen' });
  const S = 0.9;                                           /* units per picometer in the molecule: iodine's 266 pm spans 240 units */
  const CX = 700, CY = 230;
  /* the table: groups 1 to 17 (the book draws no noble gas), periods 1 to 6, 0.1 unit per picometer */
  const TL = 110, PITCH = 70, TT = 500, ROW = 62, TS = 0.1;
  const cellX = (g) => TL + (g - 0.5) * PITCH, cellY = (p) => TT + (p - 0.5) * ROW;
  let hits = []; F.hover(d.stage, () => hits);
  still(d, () => {
    const { ctx, W } = begin(d.c);
    const s = pick.value, r = pick.mix((v) => HAL[v].r), sym = s;
    const R = r * S, x1 = CX - R, x2 = CX + R;
    headline(ctx, `The ${s}–${s} distance is ${HAL[s].d} pm, so the covalent radius of ${BY[s].name.toLowerCase()} is ${HAL[s].r} pm.`);
    /* the molecule: two spheres whose nuclei are the distance d apart, which is twice the radius */
    const colour = pick.mixColor((v) => F.el(v));
    [x1, x2].forEach((x) => {
      const g = ctx.createRadialGradient(x - R * 0.35, CY - R * 0.4, R * 0.08, x, CY, R);
      g.addColorStop(0, F.mixColor(colour, PAL.soft, 0.5)); g.addColorStop(0.55, colour); g.addColorStop(1, F.mixColor(colour, PAL.muted, 0.35));
      ctx.save(); ctx.beginPath(); ctx.arc(x, CY, R, 0, TAU); ctx.fillStyle = g; ctx.fill(); ctx.lineWidth = 1.5; ctx.strokeStyle = alpha(PAL.ink, 0.45); ctx.stroke(); ctx.restore();
    });
    dot(ctx, x1, CY, PAL.ink, true, 4); dot(ctx, x2, CY, PAL.ink, true, 4);
    text(ctx, sym, x1 - R - 16, CY, PAL.ink, { size: 24, weight: 600, align: 'right' });
    text(ctx, sym, x2 + R + 16, CY, PAL.ink, { size: 24, weight: 600 });
    const top = CY - Math.max(R, 60) - 34, bot = CY + Math.max(R, 60) + 34;
    line(ctx, x1, CY, x1, top, alpha(PAL.ink, 0.35), 2, [4, 8]); line(ctx, x2, CY, x2, top, alpha(PAL.ink, 0.35), 2, [4, 8]);
    hbracket(ctx, x1, x2, top, PAL.ink, `d = ${HAL[s].d} pm`);
    line(ctx, x1, CY, x1, bot, alpha(PAL.ink, 0.35), 2, [4, 8]); line(ctx, CX, CY, CX, bot, alpha(PAL.ink, 0.35), 2, [4, 8]);
    hbracket(ctx, x1, CX, bot, PAL.ink, `r = ${HAL[s].r} pm`, { side: 'below' });
    /* the table of radii to scale */
    const h = [];
    for (let g = 1; g <= 17; g++) text(ctx, String(g), cellX(g), TT - 16, PAL.muted, { size: 15, align: 'center' });
    for (let p = 1; p <= 6; p++) text(ctx, String(p), TL - 30, cellY(p), PAL.muted, { size: 15, align: 'center' });
    text(ctx, 'group', TL, TT - 44, PAL.muted, { size: 15 });
    text(ctx, 'period', TL - 30, TT - 44 + 0, PAL.muted, { size: 15, align: 'right' });
    EL.forEach((e) => {
      if (!e.group || e.group === 18 || e.period > 6) return;
      const x = cellX(e.group), y = cellY(e.period), rr = e.r * TS;
      disc(ctx, x, y, rr, e.sym);
      h.push({ x, y, r: Math.max(rr, 14), name: `${e.name}, ${e.r} pm` });
    });
    const c = BY[s];
    ctx.save(); ctx.setLineDash([6, 6]); ctx.lineWidth = 2.5; ctx.strokeStyle = PAL.ink; ctx.beginPath(); ctx.arc(cellX(c.group), cellY(c.period), c.r * TS + 9, 0, TAU); ctx.stroke(); ctx.restore();
    text(ctx, 'covalent radii to scale', W - 70, TT - 44, PAL.muted, { size: 15, align: 'right' });
    hits = [{ x: x1, y: CY, r: R, name: `a ${BY[s].name.toLowerCase()} atom` }, { x: x2, y: CY, r: R, name: `a ${BY[s].name.toLowerCase()} atom` }, ...h];
    tex(d.readout, `r=\\frac{d}{2}=\\frac{${HAL[s].d}\\ \\text{pm}}{2}=${HAL[s].r}\\ \\text{pm}`);
  });
})();

/* =====================================================================
   FIGURE 6.31 + 6.33: the atomic radius (to Z = 60) and the first
   ionization energy (to Z = 86) against the atomic number on one frame,
   with one period's run picked out. Still: nothing here has a clock; the
   property choice keeps the Z axis and replaces the curve and its axis.
===================================================================== */
(function () {
  const d = sim('sim-trends-graph', 660);
  const prop = F.choice(d.controls, { label: '\\text{property}', options: [{ value: 'r', label: 'atomic radius' }, { value: 'ie', label: 'first ionization energy' }], value: 'r', aria: 'which property is plotted' });
  const per = F.choice(d.controls, { label: '\\text{period}', options: ['2', '3', '4', '5', '6'].map((p) => ({ value: p, label: p })), value: '4', aria: 'which period is picked out' });
  const PER = { 2: [3, 10], 3: [11, 18], 4: [19, 36], 5: [37, 54], 6: [55, 86] };
  const P = {
    r: { zmax: 60, get: (e) => e.r, yr: [0, 300], ny: 6, yl: 'radius (pm)', unit: 'pm', name: 'the radius' },
    ie: { zmax: 86, get: (e) => e.ie, yr: [0, 2500], ny: 5, yl: 'first ionization energy (kJ/mol)', unit: 'kJ/mol', name: 'the first ionization energy' },
  };
  const ALK = ['Li', 'Na', 'K', 'Rb', 'Cs'], NOB = ['He', 'Ne', 'Ar', 'Kr', 'Xe', 'Rn'];
  /* fixed axes: Z from 0 to 90; radius 0 to 300 pm (Cs, 298 pm, the largest), IE₁ 0 to 2500 kJ/mol (He, 2370) */
  const box = { l: 150, r: 1320, t: 150, b: 560 };
  let hits = []; F.hover(d.stage, () => hits);
  still(d, () => {
    const { ctx } = begin(d.c);
    const pv = prop.value, q = P[pv], [z0, z1raw] = PER[per.value], z1 = Math.min(z1raw, q.zmax);
    const a = EL[z0 - 1], b = EL[z1 - 1], va = q.get(a), vb = q.get(b);
    const verb = vb < va ? 'falls' : 'rises';
    const cut = z1 < z1raw ? `, where the graph of radius stops at Z = ${q.zmax}` : '';
    headline(ctx, `Across period ${per.value}, from ${a.sym} to ${b.sym}${cut}, ${q.name} ${verb} from ${va} ${q.unit} to ${vb} ${q.unit}.`);
    ['r', 'ie'].forEach((k) => prop.only(ctx, k, () => {
      const Q = P[k], col = k === 'ie' ? C('energy') : PAL.ink;
      const { X, Y } = axes(ctx, box, [0, 90], Q.yr, { nx: 9, ny: Q.ny, xl: 'atomic number, Z', yl: Q.yl, yc: col });
      /* the period picked out, as a band behind the curve */
      ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.06); ctx.fillRect(X(z0 - 0.5), box.t, X(Math.min(z1raw, Q.zmax) + 0.5) - X(z0 - 0.5), box.b - box.t); ctx.restore();
      const f = (z) => { const i = Math.min(Math.max(Math.floor(z), 1), Q.zmax - 1); const t = z - i; return Q.get(EL[i - 1]) * (1 - t) + Q.get(EL[i]) * t; };
      curve(ctx, f, 1, Q.zmax, X, Y, col, 3, (Q.zmax - 1) * 2);
      curve(ctx, f, z0, Math.min(z1raw, Q.zmax), X, Y, col, 6, (Math.min(z1raw, Q.zmax) - z0) * 2 || 1);
      /* the alkali metals and the noble gases, named at their peaks and troughs */
      [...ALK, ...NOB].forEach((s) => {
        const e = BY[s]; if (e.Z > Q.zmax) return;
        const up = (k === 'r') === ALK.includes(s);
        const x = X(e.Z), y = Y(Q.get(e));
        dot(ctx, x, y, col, ALK.includes(s), 7);
        text(ctx, s, x, y + (up ? -24 : 24), col, { size: 18, weight: 600, align: 'center', bg: PAL.panel });
      });
      if (k === pv) hits = EL.slice(0, Q.zmax).map((e) => ({ x: X(e.Z), y: Y(Q.get(e)), r: 10, name: `${e.name} (Z = ${e.Z}): ${Q.get(e)} ${Q.unit}` }));
    }, [0, 12]));
    tex(d.readout, pv === 'ie'
      ? `\\kIE_{1}(\\text{${a.sym}})=${va}\\ \\text{kJ/mol}\\qquad\\kIE_{1}(\\text{${b.sym}})=${vb}\\ \\text{kJ/mol}`
      : `r(\\text{${a.sym}})=${va}\\ \\text{pm}\\qquad r(\\text{${b.sym}})=${vb}\\ \\text{pm}`);
  });
})();

/* =====================================================================
   FIGURE 6.32: aluminum and sulfur as atoms and as ions, to scale.
   Still: the choice of atom or ion morphs the spheres; the protons stay
   and only the electrons change.
===================================================================== */
(function () {
  const d = sim('sim-ions', 600);
  const st = F.choice(d.controls, { label: '\\text{state}', options: [{ value: 'atom', label: 'atom' }, { value: 'ion', label: 'ion' }], value: 'atom', aria: 'atom or ion' });
  const SP = {
    Al: { x: 400, Zp: 13, atom: { r: 118, e: 13, name: 'Al' }, ion: { r: 68, e: 10, name: 'Al³⁺' }, word: 'aluminum' },
    S: { x: 1000, Zp: 16, atom: { r: 104, e: 16, name: 'S' }, ion: { r: 170, e: 18, name: 'S²⁻' }, word: 'sulfur' },
  };
  const S = 1.05, CY = 300;                                /* units per picometer: the sulfide ion's 170 pm spans 179 units */
  let hits = []; F.hover(d.stage, () => hits);
  still(d, () => {
    const { ctx } = begin(d.c);
    const v = st.value;
    headline(ctx, v === 'atom'
      ? 'An aluminum atom has a covalent radius of 118 pm and a sulfur atom a covalent radius of 104 pm.'
      : 'Al³⁺ has lost three electrons and shrunk to 68 pm; S²⁻ has gained two and grown to 170 pm.');
    hits = [];
    Object.entries(SP).forEach(([sym, s]) => {
      const r = st.mix((w) => s[w].r), R = r * S, now = s[v];
      sphere(ctx, s.x, CY, R, sym);
      text(ctx, now.name, s.x, CY - R - 30, PAL.ink, { size: 26, weight: 600, align: 'center', bg: PAL.panel });
      line(ctx, s.x, CY, s.x + R, CY, alpha(PAL.ink, 0.6), 2, [4, 8]);
      dot(ctx, s.x, CY, PAL.ink, true, 4);
      hbracket(ctx, s.x, s.x + R, CY + R + 26, PAL.ink, `${now.r} pm`, { side: 'below' });
      text(ctx, `${s.Zp} protons, ${now.e} electrons`, s.x, 560, PAL.muted, { size: 19, align: 'center' });
      hits.push({ x: s.x, y: CY, r: R, name: `${v === 'atom' ? 'an atom of ' + s.word : 'the ' + (sym === 'Al' ? 'aluminum ion' : 'sulfide ion')}, ${now.r} pm` });
    });
    tex(d.readout, v === 'atom'
      ? 'r_{\\text{Al}}=118\\ \\text{pm}\\qquad r_{\\text{S}}=104\\ \\text{pm}'
      : 'r_{\\text{Al}^{3+}}=68\\ \\text{pm}\\qquad r_{\\text{S}^{2-}}=170\\ \\text{pm}');
  });
})();

/* =====================================================================
   FIGURE 6.34 + 6.35: the book's first ionization energies and electron
   affinities in the places of the periodic table, shaded in the energy
   hue. Still: the values are fixed; the property choice crossfades the
   shading and the numbers in the same cells.
===================================================================== */
(function () {
  const d = sim('sim-ie-table', 680);
  const prop = F.choice(d.controls, { label: '\\text{property}', options: [{ value: 'ie', label: 'first ionization energy' }, { value: 'ea', label: 'electron affinity' }], value: 'ie', aria: 'which property the table shows' });
  const L = 96, PITCH = 68, T = 150, ROW = 66, CW = 64, CH = 62;
  const cx = (g) => L + (g - 0.5) * PITCH, cy = (p) => T + (p - 0.5) * ROW;
  /* the cells the book prints: groups 1 and 2 to period 7, 3 to 12 in periods 4 to 6, 13 to 18 from period 2, H and He */
  const CELLS = EL.filter((e) => e.group && (e.group <= 2 || e.group === 18 || (e.group >= 13 && e.period >= 2) || (e.group >= 3 && e.group <= 12 && e.period >= 4)));
  const TOP = { 1: 1, 2: 2, 13: 2, 14: 2, 15: 2, 16: 2, 17: 2, 18: 1 };
  let hits = []; F.hover(d.stage, () => hits);
  still(d, () => {
    const { ctx } = begin(d.c);
    const v = prop.value, ce = C('energy');
    headline(ctx, v === 'ie'
      ? 'Helium has the largest first ionization energy, 2370 kJ/mol, and cesium the smallest, 380 kJ/mol.'
      : 'Chlorine has the most negative electron affinity, −348 kJ/mol, and beryllium the most positive, +240 kJ/mol.');
    for (let g = 1; g <= 18; g++) text(ctx, String(g), cx(g), T + ((TOP[g] ?? 4) - 1) * ROW - 16, PAL.muted, { size: 15, align: 'center' });
    for (let p = 1; p <= 7; p++) text(ctx, String(p), L - 34, cy(p), PAL.muted, { size: 15, align: 'center' });
    const fillOf = (w, e) => {
      if (w === 'ie') return e.ieBook ? alpha(ce, 0.08 + 0.55 * (e.ie - 350) / 2050) : PAL.soft;
      const n = eaNum(e); if (n === null) return PAL.soft;
      return n < 0 ? alpha(ce, 0.08 + 0.55 * (-n) / 350) : PAL.panel;
    };
    hits = [];
    CELLS.forEach((e) => {
      const x = cx(e.group), y = cy(e.period);
      ctx.save(); ctx.fillStyle = prop.mixColor((w) => fillOf(w, e)); ctx.fillRect(x - CW / 2, y - CH / 2, CW, CH);
      const n = eaNum(e), pos = n !== null && n > 0;
      ctx.lineWidth = 1.5; ctx.strokeStyle = alpha(PAL.ink, 0.3); ctx.strokeRect(x - CW / 2, y - CH / 2, CW, CH); ctx.restore();
      prop.only(ctx, 'ea', () => { if (pos) { ctx.save(); ctx.setLineDash([5, 4]); ctx.lineWidth = 2.5; ctx.strokeStyle = ce; ctx.strokeRect(x - CW / 2 + 3, y - CH / 2 + 3, CW - 6, CH - 6); ctx.restore(); } }, [0, 0]);
      text(ctx, e.sym, x, y - 12, PAL.ink, { size: 19, weight: 600, align: 'center' });
      prop.only(ctx, 'ie', () => text(ctx, e.ieBook ? String(e.ie) : '…', x, y + 14, ce, { size: 17, align: 'center' }), [0, 0]);
      prop.only(ctx, 'ea', () => text(ctx, eaText(e), x, y + 14, ce, { size: 17, align: 'center' }), [0, 0]);
      const val = v === 'ie' ? (e.ieBook ? `first ionization energy ${e.ie} kJ/mol` : 'no value printed') : (e.ea === null ? 'no value printed' : `electron affinity ${eaText(e)} kJ/mol`);
      hits.push({ x, y, r: 30, name: `${e.name}, ${val}` });
    });
    prop.only(ctx, 'ea', () => text(ctx, '* calculated value', cx(3) - CW / 2, cy(7), PAL.muted, { size: 17 }), [0, 0]);
    tex(d.readout, v === 'ie' ? '\\text{X}(g)\\longrightarrow\\text{X}^{+}(g)+\\text{e}^{-}\\qquad\\kIE_{1}' : '\\text{X}(g)+\\text{e}^{-}\\longrightarrow\\text{X}^{-}(g)\\qquad\\kEA_{1}');
  });
})();

/* =====================================================================
   SIM (Table 6.3): the successive ionization energies of one element as
   bars, the valence ones filled and the core ones hollow, with the jump
   between them measured. Still: the values are fixed; the element choice
   bends the bars from one element's heights to the next.
===================================================================== */
(function () {
  const d = sim('sim-successive', 620);
  const IE = {
    K: [418.8, 3051.8, 4419.6, 5876.9, 7975.5, 9590.6, 11343], Ca: [589.8, 1145.4, 4912.4, 6490.6, 8153.0, 10495.7, 12272.9],
    Sc: [633.1, 1235.0, 2388.7, 7090.6, 8842.9, 10679.0, 13315.0], Ga: [578.8, 1979.4, 2964.6, 6180, 8298.7, 10873.9, 13594.8],
    Ge: [762.2, 1537.5, 3302.1, 4410.6, 9021.4, null, null], As: [944.5, 1793.6, 2735.5, 4836.8, 6042.9, 12311.5, null],
  };
  const VAL = { K: 1, Ca: 2, Sc: 3, Ga: 3, Ge: 4, As: 5 };
  const WORD = ['', 'one', 'two', 'three', 'four', 'five'], ORD = ['', 'first', 'second', 'third', 'fourth', 'fifth'];
  const pick = F.choice(d.controls, { label: '\\text{element}', options: Object.keys(IE).map((s) => ({ value: s, label: s })), value: 'K', aria: 'which element' });
  /* fixed axes: 0 to 14 000 kJ/mol holds every value of Table 6.3 (Ga's IE₇, 13 594.8, the largest) */
  const box = { l: 190, r: 1300, t: 150, b: 520 };
  const slot = (box.r - box.l) / 7, BW = 96;
  let hits = []; F.hover(d.stage, () => hits);
  still(d, () => {
    const { ctx } = begin(d.c);
    const s = pick.value, ce = C('energy'), n = VAL[s], vals = IE[s];
    const hs = pick.mix((w) => IE[w].map((x) => x ?? 0));
    const ratio = vals[n] / vals[n - 1];
    headline(ctx, `${BY[s].name} has ${WORD[n]} valence electron${n > 1 ? 's' : ''}, so its ionization energies jump after the ${ORD[n]}: IE_{${n + 1}} is ${fmt(ratio, 2)} times IE_{${n}}.`);
    const { Y } = axes(ctx, box, [0, 7], [0, 14000], { nx: 7, ny: 7, yl: 'ionization energy (kJ/mol)', yc: ce, fx: () => '', fy: (y) => fmt(y, 0) });
    const k = F.arrival(d);
    hits = [];
    hs.forEach((h, i) => {
      const x = box.l + slot * (i + 0.5), grow = F.ease.smooth(F.stagger(k, i, 7));
      text(ctx, `IE_{${i + 1}}`, x, box.b + 28, PAL.ink, { size: 20, weight: 600, align: 'center' });
      if (vals[i] === null) { text(ctx, 'not available', x, box.b - 20, PAL.muted, { size: 15, align: 'center' }); if (!(h > 1)) return; }
      const top = Y(h * grow), core = i >= n;
      ctx.save(); ctx.fillStyle = core ? PAL.panel : alpha(ce, 0.55); ctx.fillRect(x - BW / 2, top, BW, box.b - top);
      ctx.lineWidth = 3; ctx.strokeStyle = ce; ctx.strokeRect(x - BW / 2, top, BW, box.b - top); ctx.restore();
      if (vals[i] !== null) text(ctx, String(vals[i]), x, top - 16, ce, { size: 17, align: 'center', bg: PAL.panel });
      hits.push({ x, y: (top + box.b) / 2, r: BW / 2, name: `${ORD[i + 1] || (i + 1) + 'th'} ionization energy of ${BY[s].name.toLowerCase()}, ${vals[i] ?? 'not available'}${vals[i] ? ' kJ/mol' : ''}` });
    });
    /* the jump, from the top of the last valence bar to the top of the first core bar */
    const xa = box.l + slot * (n - 0.5), xb = box.l + slot * (n + 0.5);
    arrow(ctx, xa + BW / 2 + 6, Y(vals[n - 1]) - 6, xb - BW / 2 - 6, Y(vals[n]) + 6, PAL.ink, 3);
    text(ctx, `× ${fmt(ratio, 2)}`, (xa + xb) / 2 + 14, (Y(vals[n - 1]) + Y(vals[n])) / 2 - 10, PAL.ink, { size: 20, weight: 600, bg: PAL.panel });
    text(ctx, 'valence', box.l + slot * n / 2, box.b + 60, PAL.muted, { size: 17, align: 'center' });
    text(ctx, 'core', box.l + slot * (n + (7 - n) / 2), box.b + 60, PAL.muted, { size: 17, align: 'center' });
    line(ctx, box.l + slot * n, box.b + 44, box.l + slot * n, box.b + 76, alpha(PAL.ink, 0.35), 2);
    tex(d.readout, `\\frac{\\kIE_{${n + 1}}}{\\kIE_{${n}}}=\\frac{${vals[n]}\\ \\text{kJ/mol}}{${vals[n - 1]}\\ \\text{kJ/mol}}=${fmt(ratio, 2)}`);
  });
})();
};
