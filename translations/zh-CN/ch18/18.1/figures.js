/* Figures for section 18.1 Periodicity. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['18.1'] = function (root, F) {
const { tex, C, PAL, alpha, register, begin, line, text, headline, axes } = F;
const sim = (id, H) => F.sim(root, id, H);
const still = (d, draw) => register(d.fig, { update: () => {}, draw });

/* =====================================================================
   FIGURE 18.2: the periodic table shaded by class, as the text classes
   the elements, with a choice of group. A group lights its column and
   sets its members' first ionization energies (the book's values of
   Figure 6.34) as bars, with the oxidation states the text gives each
   metal. Still: nothing here has a clock; the choice crossfades the
   shading, the bars and the f-block rows.
===================================================================== */
(function () {
  const d = sim('sim-periodic', 890);
  const ELEMENTS = [
    ['H','Hydrogen','g'], ['He','Helium','g'], ['Li','Lithium','s'], ['Be','Beryllium','s'], ['B','Boron','s'], ['C','Carbon','s'], ['N','Nitrogen','g'],
    ['O','Oxygen','g'], ['F','Fluorine','g'], ['Ne','Neon','g'], ['Na','Sodium','s'], ['Mg','Magnesium','s'], ['Al','Aluminum','s'], ['Si','Silicon','s'],
    ['P','Phosphorus','s'], ['S','Sulfur','s'], ['Cl','Chlorine','g'], ['Ar','Argon','g'], ['K','Potassium','s'], ['Ca','Calcium','s'],
    ['Sc','Scandium','s'], ['Ti','Titanium','s'], ['V','Vanadium','s'], ['Cr','Chromium','s'], ['Mn','Manganese','s'], ['Fe','Iron','s'],
    ['Co','Cobalt','s'], ['Ni','Nickel','s'], ['Cu','Copper','s'], ['Zn','Zinc','s'], ['Ga','Gallium','s'], ['Ge','Germanium','s'], ['As','Arsenic','s'],
    ['Se','Selenium','s'], ['Br','Bromine','l'], ['Kr','Krypton','g'], ['Rb','Rubidium','s'], ['Sr','Strontium','s'], ['Y','Yttrium','s'],
    ['Zr','Zirconium','s'], ['Nb','Niobium','s'], ['Mo','Molybdenum','s'], ['Tc','Technetium','s'], ['Ru','Ruthenium','s'], ['Rh','Rhodium','s'],
    ['Pd','Palladium','s'], ['Ag','Silver','s'], ['Cd','Cadmium','s'], ['In','Indium','s'], ['Sn','Tin','s'], ['Sb','Antimony','s'],
    ['Te','Tellurium','s'], ['I','Iodine','s'], ['Xe','Xenon','g'], ['Cs','Cesium','s'], ['Ba','Barium','s'], ['La','Lanthanum','s'], ['Ce','Cerium','s'],
    ['Pr','Praseodymium','s'], ['Nd','Neodymium','s'], ['Pm','Promethium','s'], ['Sm','Samarium','s'], ['Eu','Europium','s'], ['Gd','Gadolinium','s'],
    ['Tb','Terbium','s'], ['Dy','Dysprosium','s'], ['Ho','Holmium','s'], ['Er','Erbium','s'], ['Tm','Thulium','s'], ['Yb','Ytterbium','s'],
    ['Lu','Lutetium','s'], ['Hf','Hafnium','s'], ['Ta','Tantalum','s'], ['W','Tungsten','s'], ['Re','Rhenium','s'], ['Os','Osmium','s'],
    ['Ir','Iridium','s'], ['Pt','Platinum','s'], ['Au','Gold','s'], ['Hg','Mercury','l'], ['Tl','Thallium','s'], ['Pb','Lead','s'], ['Bi','Bismuth','s'],
    ['Po','Polonium','s'], ['At','Astatine','s'], ['Rn','Radon','g'], ['Fr','Francium','s'], ['Ra','Radium','s'], ['Ac','Actinium','s'],
    ['Th','Thorium','s'], ['Pa','Protactinium','s'], ['U','Uranium','s'], ['Np','Neptunium','s'], ['Pu','Plutonium','s'], ['Am','Americium','s'],
    ['Cm','Curium','s'], ['Bk','Berkelium','s'], ['Cf','Californium','s'], ['Es','Einsteinium','s'], ['Fm','Fermium',''], ['Md','Mendelevium',''],
    ['No','Nobelium',''], ['Lr','Lawrencium',''], ['Rf','Rutherfordium',''], ['Db','Dubnium',''], ['Sg','Seaborgium',''], ['Bh','Bohrium',''],
    ['Hs','Hassium',''], ['Mt','Meitnerium',''], ['Ds','Darmstadtium',''], ['Rg','Roentgenium',''], ['Cn','Copernicium',''], ['Nh','Nihonium',''],
    ['Fl','Flerovium',''], ['Mc','Moscovium',''], ['Lv','Livermorium',''], ['Ts','Tennessine',''], ['Og','Oganesson','']
  ];
  /* the place of element Z: a group and period in the table, or a column (0 to 14) of the f-block rows */
  const place = (Z) => {
    if (Z === 1) return { g: 1, p: 1 }; if (Z === 2) return { g: 18, p: 1 };
    if (Z <= 18) { const p = Z <= 10 ? 2 : 3, i = Z - (p === 2 ? 2 : 10); return { g: i <= 2 ? i : i + 10, p }; }
    if (Z <= 36) return { g: Z - 18, p: 4 }; if (Z <= 54) return { g: Z - 36, p: 5 };
    if (Z <= 56) return { g: Z - 54, p: 6 }; if (Z <= 71) return { f: 1, i: Z - 57 }; if (Z <= 86) return { g: Z - 68, p: 6 };
    if (Z <= 88) return { g: Z - 86, p: 7 }; if (Z <= 103) return { f: 2, i: Z - 89 }; return { g: Z - 100, p: 7 };
  };
  /* the classes as the text draws them: zinc, cadmium and mercury are representative metals, the lanthanides inner transition metals */
  const REP = 'Li Na K Rb Cs Be Mg Ca Sr Ba Zn Cd Hg Al Ga In Tl Sn Pb Bi'.split(' ');
  const METALLOID = 'B Si Ge As Sb Te'.split(' ');
  const NONMETAL = 'H He C N O F Ne P S Cl Ar Se Br Kr I Xe'.split(' ');
  const RADIO = 'Tc Pm Po At Rn Fr Ra'.split(' ');
  const classOf = (sym, Z) => (REP.includes(sym) ? 'rep' : METALLOID.includes(sym) ? 'metalloid' : NONMETAL.includes(sym) ? 'nonmetal'
    : RADIO.includes(sym) || (Z >= 89 && Z <= 103) || Z >= 109 ? 'radio' : 'trans');
  /* the book's legend colours, deepened from its printed tints so that half of each mixed into the panel reads in both themes */
  const LEGEND_REP = '#e3c46e', LEGEND_TRANS = '#7392cb', LEGEND_METALLOID = '#c49ac4', LEGEND_NONMETAL = '#8fb8aa';
  const CLASS = {
    rep: { hex: LEGEND_REP, name: 'representative metal', legend: 'representative metals' },
    trans: { hex: LEGEND_TRANS, name: 'transition or inner transition metal', legend: 'transition and inner transition metals' },
    radio: { hex: null, name: 'radioactive element', legend: 'radioactive elements' },
    metalloid: { hex: LEGEND_METALLOID, name: 'metalloid', legend: 'metalloids' },
    nonmetal: { hex: LEGEND_NONMETAL, name: 'nonmetal', legend: 'nonmetals' },
  };
  const STATE = { s: 'solid', l: 'liquid', g: 'gas' };
  const EL = ELEMENTS.map(([sym, name, st], i) => ({ sym, name, st, Z: i + 1, cls: classOf(sym, i + 1), ...place(i + 1) }));
  const BY = Object.fromEntries(EL.map((e) => [e.sym, e]));

  /* each group the text takes: its members from the top (the radioactive ones left out), IE₁ in kJ/mol as Figure 6.34
     prints it, and the oxidation states the text gives each metal, a trailing * marking the state two below the group's */
  const GROUPS = {
    1: { m: [['Li', 520, '1+'], ['Na', 490, '1+'], ['K', 420, '1+'], ['Rb', 400, '1+'], ['Cs', 380, '1+']],
      head: 'Down group 1 the first ionization energy falls from 520 to 380 kJ/mol, and each alkali metal forms a 1+ ion.' },
    2: { m: [['Be', 900, '2+'], ['Mg', 730, '2+'], ['Ca', 590, '2+'], ['Sr', 550, '2+'], ['Ba', 500, '2+']],
      head: 'Down group 2 the first ionization energy falls from 900 to 500 kJ/mol, above group 1 in each period, and each metal forms a 2+ ion.' },
    12: { m: [['Zn', 910, '2+'], ['Cd', 870, '2+'], ['Hg', 1000, '2+ 1+']],
      head: 'Zinc, cadmium and mercury form 2+ ions, and mercury also 1+ in $\\text{Hg}_{2}{}^{2+}$; zinc is the most reactive and mercury the least.' },
    13: { m: [['B', 800], ['Al', 580, '3+'], ['Ga', 580, '3+ 1+*'], ['In', 560, '3+ 1+*'], ['Tl', 590, '3+ 1+*']],
      head: 'Gallium, indium and thallium form 1+ ions as well as 3+, two below the group oxidation state: the inert pair effect.' },
    14: { m: [['C', 1090], ['Si', 780], ['Ge', 780], ['Sn', 700, '4+ 2+*'], ['Pb', 710, '4+ 2+*']],
      head: 'Tin and lead form stable 2+ cations, two below the group oxidation state of 4+, as well as covalent 4+ compounds.' },
    15: { m: [['N', 1400], ['P', 1060], ['As', 960], ['Sb', 830], ['Bi', 800, '5+ 3+*']],
      head: 'Bismuth readily gives up three of its five valence electrons as $\\text{Bi}^{3+}$, and reaches 5+ only with strong oxidizing agents.' },
  };
  const KEYS = ['all', '1', '2', '12', '13', '14', '15'];
  const pick = F.choice(d.controls, { label: '\\text{group}', options: KEYS.map((k) => ({ value: k, label: k })), value: 'all', aria: 'which group is lit' });

  /* the table: 18 columns of 70 units from x = 100, seven rows of 58 from y = 140; the f-block two rows below */
  const L = 100, PITCH = 70, T = 140, ROW = 58, CW = 64, CH = 52;
  const cx = (g) => L + (g - 0.5) * PITCH, cy = (p) => T + (p - 0.5) * ROW;
  const FY = (r) => T + 7 * ROW + 56 + (r - 1) * ROW;
  const TOP = { 1: 1, 2: 2, 13: 2, 14: 2, 15: 2, 16: 2, 17: 2, 18: 1 };
  /* the bars: one fixed axis, 0 to 2000 kJ/mol (nitrogen's 1400 the largest, its value clear of the axis title), slots 200 units apart about the centre */
  const box = { l: 230, r: 1300, t: 612, b: 800 }, SLOT = 200, BW = 84, MID = (box.l + box.r) / 2;
  const slotX = (i, n) => MID + (i - (n - 1) / 2) * SLOT;
  const fillOf = (cls) => (CLASS[cls].hex ? F.mixColor(PAL.panel, F.fact(CLASS[cls].hex), 0.5) : PAL.panel);
  const inGroup = (e, v) => v !== 'all' && e.g === +v;
  const box3 = (ctx, x, y, w, h, stroke, dash) => {
    ctx.save(); ctx.beginPath(); ctx.roundRect(x, y, w, h, 6); ctx.lineWidth = 2; ctx.strokeStyle = stroke;
    if (dash) ctx.setLineDash([5, 4]); ctx.stroke(); ctx.restore();
  };
  let hits = []; F.hover(d.stage, () => hits);

  still(d, () => {
    const { ctx } = begin(d.c);
    const v = pick.value, ce = C('energy');
    headline(ctx, v === 'all' ? 'The 20 nonradioactive representative metals lie in groups 1, 2, 12, 13, 14 and 15.' : GROUPS[v].head);
    hits = [];
    text(ctx, 'period', L - 34, T - 40, PAL.muted, { size: 15, align: 'center' });
    text(ctx, 'group', cx(1), T - 40, PAL.muted, { size: 15, align: 'center' });
    for (let g = 1; g <= 18; g++) text(ctx, String(g), cx(g), T + ((TOP[g] ?? 4) - 1) * ROW - 14, PAL.muted, { size: 15, weight: 600, align: 'center' });
    for (let p = 1; p <= 7; p++) text(ctx, String(p), L - 34, cy(p), PAL.muted, { size: 15, weight: 600, align: 'center' });

    const cell = (e, x, y, a) => {
      ctx.save(); ctx.globalAlpha *= a;
      ctx.fillStyle = fillOf(e.cls); ctx.fillRect(x - CW / 2, y - CH / 2, CW, CH);
      ctx.lineWidth = 1.5; ctx.strokeStyle = alpha(PAL.ink, 0.3); ctx.strokeRect(x - CW / 2, y - CH / 2, CW, CH);
      text(ctx, String(e.Z), x - CW / 2 + 4, y - CH / 2 + 10, PAL.ink, { size: 14 });
      text(ctx, e.sym, x, y + 6, PAL.ink, { size: 21, weight: 600, align: 'center' });
      ctx.restore();
    };
    const nameOf = (e) => `${e.name} (${e.sym}, Z = ${e.Z}): ${CLASS[e.cls].name}${STATE[e.st] ? ', ' + STATE[e.st] : ''}`;
    EL.forEach((e) => {
      if (e.f) return;
      const x = cx(e.g), y = cy(e.p), a = pick.mix((w) => (w === 'all' || inGroup(e, w) ? 1 : 0.35));
      cell(e, x, y, a);
      hits.push({ x, y, r: 30, name: nameOf(e) });
    });
    /* the two places of the f-block in group 3 */
    [[6, 'La–Lu', 'trans', '*'], [7, 'Ac–Lr', 'radio', '**']].forEach(([p, s, cls, mark]) => {
      const x = cx(3), y = cy(p), a = pick.mix((w) => (w === 'all' ? 1 : 0.35));
      ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = fillOf(cls); ctx.fillRect(x - CW / 2, y - CH / 2, CW, CH);
      ctx.lineWidth = 1.5; ctx.strokeStyle = alpha(PAL.ink, 0.3); ctx.strokeRect(x - CW / 2, y - CH / 2, CW, CH);
      text(ctx, s, x, y + 6, PAL.ink, { size: 15, weight: 600, align: 'center' });
      text(ctx, mark, x + CW / 2 - 4, y - CH / 2 + 10, PAL.ink, { size: 14, align: 'right' });
      ctx.restore();
    });
    /* the chosen group's column, outlined from its first period to its last */
    ['1', '2', '12', '13', '14', '15'].forEach((k) => pick.only(ctx, k, () => {
      const g = +k, p0 = TOP[g] ?? 4;
      box3(ctx, cx(g) - CW / 2 - 5, cy(p0) - CH / 2 - 5, CW + 10, cy(7) - cy(p0) + CH + 10, PAL.ink, false);
    }, [0, 0]));

    /* with every group shown: the f-block rows and the legend */
    pick.only(ctx, 'all', () => {
      text(ctx, '*', cx(4) - 46, FY(1), PAL.ink, { size: 20, align: 'center' });
      text(ctx, '**', cx(4) - 46, FY(2), PAL.ink, { size: 20, align: 'center' });
      EL.forEach((e) => { if (e.f) cell(e, cx(4 + e.i), FY(e.f), 1); });
      const rows = [['rep', 200, 750], ['trans', 560, 750], ['radio', 1010, 750], ['metalloid', 200, 794], ['nonmetal', 560, 794]];
      rows.forEach(([cls, x, y]) => {
        ctx.save(); ctx.fillStyle = fillOf(cls); ctx.fillRect(x, y - 13, 32, 26);
        ctx.lineWidth = 1.5; ctx.strokeStyle = alpha(PAL.ink, 0.3); ctx.strokeRect(x, y - 13, 32, 26); ctx.restore();
        text(ctx, CLASS[cls].legend, x + 44, y, PAL.ink, { size: 19 });
      });
    }, [0, 12]);
    if (v === 'all') EL.forEach((e) => { if (e.f) hits.push({ x: cx(4 + e.i), y: FY(e.f), r: 30, name: nameOf(e) }); });

    /* with one group chosen: its members' first ionization energies, top of the group at the left */
    const frame = 1 - pick.a('all');
    if (frame > 0) {
      ctx.save(); ctx.globalAlpha *= frame;
      axes(ctx, box, [0, 1], [0, 2000], { nx: 1, ny: 4, fx: () => '', yl: 'first ionization energy (kJ/mol)', yc: ce });
      ctx.restore();
    }
    ['1', '2', '12', '13', '14', '15'].forEach((k) => pick.only(ctx, k, () => {
      const G = GROUPS[k], n = G.m.length, Y = (val) => box.b - (val / 2000) * (box.b - box.t);
      let inert = false;
      G.m.forEach(([sym, ie, states], i) => {
        const x = slotX(i, n), top = Y(ie), e = BY[sym], metal = !!states;
        ctx.save(); ctx.fillStyle = metal ? alpha(ce, 0.55) : PAL.panel; ctx.fillRect(x - BW / 2, top, BW, box.b - top);
        ctx.lineWidth = 3; ctx.strokeStyle = ce; ctx.strokeRect(x - BW / 2, top, BW, box.b - top); ctx.restore();
        text(ctx, String(ie), x, top - 16, ce, { size: 17, align: 'center', bg: PAL.panel });
        text(ctx, sym, x, box.b + 26, PAL.ink, { size: 22, weight: 600, align: 'center' });
        if (!metal) text(ctx, CLASS[e.cls].name, x, box.b + 60, PAL.muted, { size: 17, align: 'center' });
        else {
          const chips = states.split(' '), w = 50, gap = 10, x0 = x - (chips.length * w + (chips.length - 1) * gap) / 2;
          chips.forEach((c, j) => {
            const two = c.endsWith('*'), cxp = x0 + j * (w + gap);
            if (two) { inert = true; box3(ctx, cxp, box.b + 44, w, 32, PAL.ink, true); }
            text(ctx, two ? c.slice(0, -1) : c, cxp + w / 2, box.b + 60, PAL.ink, { size: 19, weight: 600, align: 'center' });
          });
        }
        if (k === v) hits.push({ x, y: (top + box.b) / 2, r: BW / 2, name: `first ionization energy of ${e.name.toLowerCase()}, ${ie} kJ/mol` });
      });
      if (inert) {
        box3(ctx, box.r - 330, box.t - 38, 40, 26, PAL.ink, true);
        text(ctx, 'inert pair effect', box.r - 280, box.t - 25, PAL.ink, { size: 17 });
      }
    }, [0, 12]));

    if (v === 'all') {
      tex(d.readout, '\\text{representative metals: }\\underset{1}{5}+\\underset{2}{5}+\\underset{12}{3}+\\underset{13}{4}+\\underset{14}{2}+\\underset{15}{1}=20');
    } else {
      const m = GROUPS[v].m, a = m[0], b = m[m.length - 1];
      tex(d.readout, `\\kIE_{1}(\\text{${a[0]}})=${a[1]}\\ \\text{kJ/mol}\\qquad\\kIE_{1}(\\text{${b[0]}})=${b[1]}\\ \\text{kJ/mol}`);
    }
  });
})();
};
