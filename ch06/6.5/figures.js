/* Figures for section 6.5 Periodic Variations in Element Properties. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['6.5'] = function (root, F) {
const { fmt, tex, C, PAL, alpha, register, begin, line, arrow, dot, text, headline, axes, curve, legend } = F;
const sim = (id, H) => F.sim(root, id, H);
const still = (d, draw) => register(d.fig, { update: () => {}, draw });

/* The elements through radium: symbol, name, group (0 for the lanthanides), period, IE₁ in kJ/mol,
   whether Figure 6.34 prints that IE₁, and the electron affinity Figure 6.35 prints (a string where
   it marks a calculated value with an asterisk; null where the cell is empty). The IE₁ of cerium to
   lutetium and of astatine, which Figure 6.34 leaves out and Figure 6.33 plots, are the measured
   values, rounded as the graph can be read. */
const ELEMENTS = [
  ['H','Hydrogen',1,1,1310,true,-72], ['He','Helium',18,1,2370,true,'20*'], ['Li','Lithium',1,2,520,true,-60], ['Be','Beryllium',2,2,900,true,'240*'], ['B','Boron',13,2,800,true,-23], ['C','Carbon',14,2,1090,true,-123],
  ['N','Nitrogen',15,2,1400,true,0], ['O','Oxygen',16,2,1310,true,-141], ['F','Fluorine',17,2,1680,true,-322], ['Ne','Neon',18,2,2080,true,'30*'], ['Na','Sodium',1,3,490,true,-53], ['Mg','Magnesium',2,3,730,true,'230*'],
  ['Al','Aluminum',13,3,580,true,-44], ['Si','Silicon',14,3,780,true,-120], ['P','Phosphorus',15,3,1060,true,-74], ['S','Sulfur',16,3,1000,true,-200], ['Cl','Chlorine',17,3,1250,true,-348], ['Ar','Argon',18,3,1520,true,'35*'],
  ['K','Potassium',1,4,420,true,-48], ['Ca','Calcium',2,4,590,true,'150*'], ['Sc','Scandium',3,4,630,true,null], ['Ti','Titanium',4,4,660,true,null], ['V','Vanadium',5,4,650,true,null], ['Cr','Chromium',6,4,660,true,null],
  ['Mn','Manganese',7,4,710,true,null], ['Fe','Iron',8,4,760,true,null], ['Co','Cobalt',9,4,760,true,null], ['Ni','Nickel',10,4,730,true,null], ['Cu','Copper',11,4,740,true,null], ['Zn','Zinc',12,4,910,true,null],
  ['Ga','Gallium',13,4,580,true,'-40*'], ['Ge','Germanium',14,4,780,true,-115], ['As','Arsenic',15,4,960,true,-7], ['Se','Selenium',16,4,950,true,-195], ['Br','Bromine',17,4,1140,true,-324], ['Kr','Krypton',18,4,1350,true,'40*'],
  ['Rb','Rubidium',1,5,400,true,-46], ['Sr','Strontium',2,5,550,true,'160*'], ['Y','Yttrium',3,5,620,true,null], ['Zr','Zirconium',4,5,660,true,null], ['Nb','Niobium',5,5,670,true,null], ['Mo','Molybdenum',6,5,680,true,null],
  ['Tc','Technetium',7,5,700,true,null], ['Ru','Ruthenium',8,5,710,true,null], ['Rh','Rhodium',9,5,720,true,null], ['Pd','Palladium',10,5,800,true,null], ['Ag','Silver',11,5,730,true,null], ['Cd','Cadmium',12,5,870,true,null],
  ['In','Indium',13,5,560,true,'-40*'], ['Sn','Tin',14,5,700,true,-121], ['Sb','Antimony',15,5,830,true,-101], ['Te','Tellurium',16,5,870,true,-190], ['I','Iodine',17,5,1010,true,-295], ['Xe','Xenon',18,5,1170,true,'40*'],
  ['Cs','Cesium',1,6,380,true,-45], ['Ba','Barium',2,6,500,true,'50*'], ['La','Lanthanum',3,6,540,true,null], ['Ce','Cerium',0,6,534,false,null], ['Pr','Praseodymium',0,6,527,false,null], ['Nd','Neodymium',0,6,533,false,null],
  ['Pm','Promethium',0,6,540,false,null], ['Sm','Samarium',0,6,545,false,null], ['Eu','Europium',0,6,547,false,null], ['Gd','Gadolinium',0,6,593,false,null], ['Tb','Terbium',0,6,566,false,null], ['Dy','Dysprosium',0,6,573,false,null],
  ['Ho','Holmium',0,6,581,false,null], ['Er','Erbium',0,6,589,false,null], ['Tm','Thulium',0,6,597,false,null], ['Yb','Ytterbium',0,6,603,false,null], ['Lu','Lutetium',0,6,524,false,null], ['Hf','Hafnium',4,6,700,true,null],
  ['Ta','Tantalum',5,6,760,true,null], ['W','Tungsten',6,6,770,true,null], ['Re','Rhenium',7,6,760,true,null], ['Os','Osmium',8,6,840,true,null], ['Ir','Iridium',9,6,890,true,null], ['Pt','Platinum',10,6,870,true,null],
  ['Au','Gold',11,6,890,true,null], ['Hg','Mercury',12,6,1000,true,null], ['Tl','Thallium',13,6,590,true,-50], ['Pb','Lead',14,6,710,true,-101], ['Bi','Bismuth',15,6,800,true,-101], ['Po','Polonium',16,6,810,true,-170],
  ['At','Astatine',17,6,890,false,'-270*'], ['Rn','Radon',18,6,1030,true,'40*'], ['Fr','Francium',1,7,380,false,null], ['Ra','Radium',2,7,510,true,null]
];
const EL = ELEMENTS.map(([sym, name, group, period, ie, ieBook, ea], i) => ({ sym, name, Z: i + 1, group, period, ie, ieBook, ea }));
const BY = Object.fromEntries(EL.map((e) => [e.sym, e]));
const eaNum = (e) => (e.ea === null ? null : parseFloat(e.ea));
const eaText = (e) => { const v = eaNum(e); if (v === null) return ''; return (v > 0 ? '+' : v < 0 ? '−' : '') + Math.abs(v) + (String(e.ea).includes('*') ? '*' : ''); };
/* The radii of hydrogen to lanthanum in pm, read off the points of Figure 6.31's graph (to about 1 pm:
   the points of Cl, Br and I fall on the 99, 114 and 133 pm of Table 6.2). The alt text's numbers
   for the alkali metals and noble gases (Li 167 … Xe 108) are not the ones the graph plots. */
const RADIUS = [37, 32, 151, 113, 86, 77, 70, 72, 72, 70, 186, 160, 143, 118, 110, 103, 99, 99, 228, 197, 162, 147, 134, 128, 130, 126, 125, 123, 128, 134, 135, 122, 120, 117, 114, 112, 248, 215, 180, 155, 146, 145, 136, 131, 135, 140, 153, 151, 166, 140, 141, 143, 133, 130, 265, 222, 195];
const PERIODS = { 2: [3, 10], 3: [11, 18], 4: [19, 36], 5: [37, 54], 6: [55, 86] };
const MAIN = (e) => e.group === 1 || e.group === 2 || e.group >= 13;

/* =====================================================================
   FIGURE 6.31 + 6.33: the atomic radius (hydrogen to lanthanum, as the
   book plots it) above the first ionization energy (to radon) on one
   axis of atomic number, with one period picked out on both. Still:
   nothing here has a clock; the period choice slides the band.
===================================================================== */
(function () {
  const d = sim('sim-trends-graph', 900);
  const per = F.choice(d.controls, { label: '\\text{period}', options: ['2', '3', '4', '5', '6'].map((p) => ({ value: p, label: p })), value: '4', aria: 'which period is picked out' });
  const ALK = ['Li', 'Na', 'K', 'Rb', 'Cs'], NOB = ['He', 'Ne', 'Ar', 'Kr', 'Xe', 'Rn'];
  const ieOf = (e) => (e.ieBook ? e.ie : Math.round(e.ie / 10) * 10);
  /* fixed axes: Z from 0 to 90 on both; radius 0 to 300 pm (Cs, 265 pm, the largest), IE₁ 0 to 2500 kJ/mol (He, 2370) */
  const P = [
    { key: 'r', box: { l: 150, r: 1330, t: 150, b: 440 }, zmax: RADIUS.length, get: (e) => RADIUS[e.Z - 1], yr: [0, 300], ny: 6, yl: 'atomic radius (pm)', col: () => C('length'), say: (e) => `about ${RADIUS[e.Z - 1]} pm` },
    { key: 'ie', box: { l: 150, r: 1330, t: 520, b: 810 }, zmax: 86, get: ieOf, yr: [0, 2500], ny: 5, yl: 'first ionization energy (kJ/mol)', col: () => C('energy'), say: (e) => `${e.ieBook ? '' : 'about '}${ieOf(e)} kJ/mol` },
  ];
  /* the main-group elements of a period whose IE₁ is lower than the element before them: the dips the text explains */
  const dips = (p) => EL.slice(PERIODS[p][0], PERIODS[p][1]).filter((e) => e.group >= 13 && e.ie < EL[e.Z - 2].ie);
  let hits = []; F.hover(d.stage, () => hits);
  still(d, () => {
    const { ctx } = begin(d.c);
    const p = per.value, [z0, z1] = PERIODS[p], [m0, m1] = per.mix((v) => PERIODS[v]);
    headline(ctx, `Across period ${p} the nuclear charge grows from +${z0} to +${z1} while the outer shell stays n = ${p}, so the atoms shrink and hold their electrons more tightly.`);
    const ax = P.map((Q) => axes(ctx, Q.box, [0, 90], Q.yr, { nx: 9, ny: Q.ny, xl: Q.key === 'ie' ? 'atomic number, Z' : '', yl: Q.yl, yc: Q.col(), fx: Q.key === 'ie' ? undefined : () => '' }));
    /* the period picked out: one band through both graphs */
    const X = ax[0].X, bl = X(m0 - 0.5), br = X(m1 + 0.5);
    ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.07); ctx.fillRect(bl, P[0].box.t, br - bl, P[1].box.b - P[0].box.t); ctx.restore();
    text(ctx, `period ${p}`, Math.max((bl + br) / 2, P[0].box.l + 50), P[0].box.t - 20, PAL.ink, { size: 20, weight: 600, align: 'center' });
    hits = [];
    P.forEach((Q, i) => {
      const { X, Y } = ax[i], col = Q.col(), last = Math.min(z1, Q.zmax);
      const f = (z) => { const j = Math.min(Math.max(Math.floor(z), 1), Q.zmax - 1), t = z - j; return Q.get(EL[j - 1]) * (1 - t) + Q.get(EL[j]) * t; };
      curve(ctx, f, 1, Q.zmax, X, Y, col, 3, (Q.zmax - 1) * 2);
      curve(ctx, f, Math.min(m0, Q.zmax), Math.min(m1, Q.zmax), X, Y, col, 6, 2 * Math.max(1, Math.round(Math.min(m1, Q.zmax) - Math.min(m0, Q.zmax))));
      EL.slice(0, Q.zmax).forEach((e) => {
        const x = X(e.Z), y = Y(Q.get(e)), named = ALK.includes(e.sym) || NOB.includes(e.sym);
        dot(ctx, x, y, col, true, named ? 7 : e.Z >= z0 && e.Z <= last ? 5 : 3.5);
        hits.push({ x, y, r: 9, name: `${e.name} (Z = ${e.Z}), ${Q.say(e)}` });
      });
      /* the alkali metals and the noble gases, named at their peaks and troughs */
      [...ALK, ...NOB].forEach((s) => {
        const e = BY[s]; if (e.Z > Q.zmax) return;
        const up = (Q.key === 'r') === ALK.includes(s);
        /* helium's peak stands under the axis title, so its name goes beside it */
        if (s === 'He' && Q.key === 'ie') text(ctx, s, X(e.Z) + 14, Y(Q.get(e)), col, { size: 19, weight: 600, bg: PAL.panel });
        else text(ctx, s, X(e.Z), Y(Q.get(e)) + (up ? -24 : 24), col, { size: 19, weight: 600, align: 'center', bg: PAL.panel });
      });
      if (Q.key === 'ie') Object.keys(PERIODS).forEach((v) => per.only(ctx, v, () => dips(v).forEach((e) => text(ctx, e.sym, X(e.Z), Y(e.ie) + 24, col, { size: 19, weight: 600, align: 'center', bg: PAL.panel })), [0, 8]));
    });
    const a = EL[z0 - 1], br2 = EL[Math.min(z1, RADIUS.length) - 1], b = EL[z1 - 1];
    tex(d.readout, `\\kr(\\text{${a.sym}})\\approx${RADIUS[a.Z - 1]}\\ \\text{pm}>\\kr(\\text{${br2.sym}})\\approx${RADIUS[br2.Z - 1]}\\ \\text{pm}\\\\`
      + `\\kIE_{1}(\\text{${a.sym}})=${a.ie}\\ \\text{kJ/mol}<\\kIE_{1}(\\text{${b.sym}})=${b.ie}\\ \\text{kJ/mol}`);
  });
})();

/* =====================================================================
   FIGURE 6.34 + 6.35: the book's first ionization energies and electron
   affinities in the places of the periodic table, shaded by value in the
   energy hue, the cells that break the trend across their period ringed,
   and one period's values written out as a chain. Still: the values are
   fixed; the property choice crossfades the shading and the numbers.
===================================================================== */
(function () {
  const d = sim('sim-ie-table', 690);
  const prop = F.choice(d.controls, { label: '\\text{property}', options: [{ value: 'ie', label: 'first ionization energy' }, { value: 'ea', label: 'electron affinity' }], value: 'ie', aria: 'which property the table shows' });
  const per = F.choice(d.controls, { label: '\\text{period}', options: ['2', '3', '4', '5', '6'].map((p) => ({ value: p, label: p })), value: '2', aria: 'which period is written out' });
  const L = 66, PITCH = 72, T = 124, ROW = 74, CW = 68, CH = 70;
  const cx = (g) => L + (g - 0.5) * PITCH, cy = (p) => T + (p - 0.5) * ROW;
  /* the cells the book prints: groups 1 and 2 to period 7, 3 to 12 in periods 4 to 6, 13 to 18 from period 2, H and He */
  const CELLS = EL.filter((e) => e.group && (e.group <= 2 || e.group === 18 || (e.group >= 13 && e.period >= 2) || (e.group >= 3 && e.group <= 12 && e.period >= 4)));
  const TOP = { 1: 1, 2: 2, 13: 2, 14: 2, 15: 2, 16: 2, 17: 2, 18: 1 };
  const val = (w, e) => (w === 'ie' ? (e.ieBook ? e.ie : null) : eaNum(e));
  /* shading: IE₁ from Cs, 380, to He, 2370; EA from 0 to Cl, −348 (a positive EA is left unshaded) */
  const depth = (w, t) => 0.05 + 0.6 * Math.pow(Math.min(Math.max(t, 0), 1), w === 'ie' ? 0.55 : 0.7);
  const frac = (w, v) => (w === 'ie' ? (v - 380) / 1990 : -v / 348);
  /* a main-group element breaks the trend when its value turns back from that of the element just before it in its period */
  const breaks = (w, e) => {
    const b = EL[e.Z - 2]; if (!b || b.period !== e.period || !MAIN(e)) return false;
    const v = val(w, e), u = val(w, b); if (v === null || u === null) return false;
    return w === 'ie' ? v < u : v > u;
  };
  const num = (w, e) => (w === 'ie' ? String(e.ie) : eaText(e).replace('−', '{-}').replace('+', '{+}').replace('*', '^{*}'));
  const chain = (w, p) => {
    const row = CELLS.filter((e) => e.period === +p && val(w, e) !== null && (MAIN(e) || e.group === 12));
    /* eight or nine values are wider than a narrow readout, so the chain breaks once, before the relation sign at its middle */
    return row.map((e, i) => {
      const b = row[i - 1], here = `\\text{${e.sym}}\\,${num(w, e)}`;
      if (!b) return here;
      const v = val(w, e), u = val(w, b);
      return (i === Math.ceil(row.length / 2) ? '\\\\' : '') + (e.Z - b.Z > 1 ? '\\cdots' : v > u ? '<' : v < u ? '>' : '=') + here;
    }).join('');
  };
  let hits = []; F.hover(d.stage, () => hits);
  still(d, () => {
    const { ctx } = begin(d.c);
    const v = prop.value, ce = C('energy');
    headline(ctx, v === 'ie'
      ? 'The first ionization energy rises across a period and falls down a group, with a dip where a p subshell begins (group 13) and where a p orbital first holds a pair (group 16).'
      : 'The electron affinity grows more negative across a period, except where the added electron starts a new subshell (group 2), pairs up in a half-filled one (group 15) or starts a new shell (group 18).');
    for (let g = 1; g <= 18; g++) text(ctx, String(g), cx(g), T + ((TOP[g] ?? 4) - 1) * ROW - 16, PAL.muted, { size: 17, align: 'center' });
    for (let p = 1; p <= 7; p++) text(ctx, String(p), L - 30, cy(p), PAL.muted, { size: 17, align: 'center' });
    const fillOf = (w, e) => { const n = val(w, e); if (n === null) return PAL.soft; return w === 'ea' && n >= 0 ? PAL.panel : alpha(ce, depth(w, frac(w, n))); };
    hits = [];
    CELLS.forEach((e) => {
      const x = cx(e.group), y = cy(e.period);
      ctx.save(); ctx.fillStyle = prop.mixColor((w) => fillOf(w, e)); ctx.fillRect(x - CW / 2, y - CH / 2, CW, CH);
      ctx.lineWidth = 1.5; ctx.strokeStyle = alpha(PAL.ink, 0.3); ctx.strokeRect(x - CW / 2, y - CH / 2, CW, CH); ctx.restore();
      ['ie', 'ea'].forEach((w) => prop.only(ctx, w, () => {
        if (breaks(w, e)) { ctx.save(); ctx.setLineDash([6, 4]); ctx.lineWidth = 3; ctx.strokeStyle = ce; ctx.strokeRect(x - CW / 2 + 4, y - CH / 2 + 4, CW - 8, CH - 8); ctx.restore(); }
        /* a value on a deeply shaded cell is set in ink, which reads against the shading where the energy hue does not */
        const n = val(w, e), deep = n !== null && depth(w, frac(w, n)) > 0.36 && !(w === 'ea' && n >= 0);
        const s = w === 'ie' ? (e.ieBook ? String(e.ie) : '…') : eaText(e);
        text(ctx, s, x, y + 15, deep ? PAL.ink : ce, { size: 19, align: 'center', weight: deep ? 600 : 400 });
      }, [0, 0]));
      text(ctx, e.sym, x, y - 14, PAL.ink, { size: 21, weight: 600, align: 'center' });
      const n = val(v, e), what = v === 'ie' ? 'first ionization energy' : 'electron affinity';
      hits.push({ x, y, r: 32, name: n === null ? `${e.name}, no ${what} given` : `${e.name}, ${what} ${v === 'ie' ? e.ie : eaText(e)} kJ/mol${v === 'ea' && String(e.ea).includes('*') ? ' (calculated)' : ''}` });
    });
    /* the period written out in the readout, framed */
    Object.keys(PERIODS).forEach((p) => per.only(ctx, p, () => {
      /* one frame round each unbroken run of cells: groups 1 and 2 and groups 13 to 18 where the row has a gap */
      (+p < 4 ? [[1, 2], [13, 18]] : [[1, 18]]).forEach(([g0, g1]) => {
        const x0 = cx(g0) - PITCH / 2, x1 = cx(g1) + PITCH / 2;
        ctx.save(); ctx.lineWidth = 3.5; ctx.strokeStyle = PAL.ink; ctx.strokeRect(x0 + 1, cy(+p) - ROW / 2 + 1, x1 - x0 - 2, ROW - 2); ctx.restore();
      });
    }, [0, 0]));
    /* the key, in the gap above the transition metals */
    const ramp = (w) => [0, 0.2, 0.4, 0.6, 0.8, 1].map((t) => alpha(ce, depth(w, t)));
    const mark = (c, x, y) => { c.save(); c.setLineDash([6, 4]); c.lineWidth = 3; c.strokeStyle = ce; c.strokeRect(x - 11, y - 11, 22, 22); c.restore(); };
    const where = { l: cx(3) - PITCH / 2, r: cx(12) + PITCH / 2, t: T - 6, b: T + 2.5 * ROW };
    prop.only(ctx, 'ie', () => legend(ctx, where, [{ ramp: ramp('ie'), ends: ['380', '2370 kJ/mol'], s: 'first ionization energy' }, { s: 'lower than the element to its left', draw: mark }], { corner: 'top', size: 18 }), [0, 0]);
    prop.only(ctx, 'ea', () => legend(ctx, where, [{ ramp: ramp('ea'), ends: ['0', '−348 kJ/mol'], s: 'electron affinity' }, { s: 'less negative than the element to its left', draw: mark }], { corner: 'top', size: 18 }), [0, 0]);
    prop.only(ctx, 'ea', () => text(ctx, '* calculated value', cx(3) - CW / 2, cy(7), PAL.muted, { size: 18 }), [0, 0]);
    tex(d.readout, `${v === 'ie' ? '\\kIE_{1}' : '\\kEA_{1}'}{:}\\ \\ ${chain(v, per.value)}\\ \\text{kJ/mol}`);
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
  const WORD = ['', 'one', 'two', 'three', 'four', 'five'], ORD = ['', 'first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh'];
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
    headline(ctx, `${BY[s].name} has ${WORD[n]} valence electron${n > 1 ? 's' : ''}, so the ${ORD[n + 1]} electron removed comes from the core.`);
    const { Y } = axes(ctx, box, [0, 7], [0, 14000], { nx: 7, ny: 7, yl: 'ionization energy (kJ/mol)', yc: ce, fx: () => '', fy: (y) => fmt(y, 0) });
    const k = F.arrival(d);
    hits = [];
    hs.forEach((h, i) => {
      const x = box.l + slot * (i + 0.5), grow = F.ease.smooth(F.stagger(k, i, 7));
      text(ctx, `IE_{${i + 1}}`, x, box.b + 28, ce, { size: 20, weight: 600, align: 'center' });
      if (vals[i] === null) { text(ctx, 'not available', x, box.b - 20, PAL.muted, { size: 15, align: 'center' }); if (!(h > 1)) return; }
      const top = Y(h * grow), core = i >= n;
      ctx.save(); ctx.fillStyle = core ? PAL.panel : alpha(ce, 0.55); ctx.fillRect(x - BW / 2, top, BW, box.b - top);
      ctx.lineWidth = 3; ctx.strokeStyle = ce; ctx.strokeRect(x - BW / 2, top, BW, box.b - top); ctx.restore();
      if (vals[i] !== null) text(ctx, String(vals[i]), x, top - 16, ce, { size: 17, align: 'center', bg: PAL.panel });
      hits.push({ x, y: (top + box.b) / 2, r: BW / 2, name: `${ORD[i + 1]} ionization energy of ${BY[s].name.toLowerCase()}, ${vals[i] ?? 'not available'}${vals[i] ? ' kJ/mol' : ''}` });
    });
    /* the jump, from the top of the last valence bar to the top of the first core bar */
    const xa = box.l + slot * (n - 0.5), xb = box.l + slot * (n + 0.5);
    arrow(ctx, xa + BW / 2 + 6, Y(vals[n - 1]) - 6, xb - BW / 2 - 6, Y(vals[n]) + 6, PAL.ink, 3);
    text(ctx, `× ${fmt(ratio, 2)}`, (xa + xb) / 2, Y(vals[n]) - 44, PAL.ink, { size: 20, weight: 600, align: 'center', bg: PAL.panel });
    text(ctx, 'valence', box.l + slot * n / 2, box.b + 60, PAL.muted, { size: 17, align: 'center' });
    text(ctx, 'core', box.l + slot * (n + (7 - n) / 2), box.b + 60, PAL.muted, { size: 17, align: 'center' });
    line(ctx, box.l + slot * n, box.b + 44, box.l + slot * n, box.b + 76, alpha(PAL.ink, 0.35), 2);
    tex(d.readout, `\\frac{\\kIE_{${n + 1}}}{\\kIE_{${n}}}=\\frac{${vals[n]}\\ \\text{kJ/mol}}{${vals[n - 1]}\\ \\text{kJ/mol}}=${fmt(ratio, 2)}`);
  });
})();
};
