/* Figures for section 18.1 Periodicity. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['18.1'] = function (root, F) {
const { tex, C, PAL, alpha, register, begin, line, text, headline } = F;
const sim = (id, H) => F.sim(root, id, H);
const still = (d, draw) => register(d.fig, { update: () => {}, draw });

/* =====================================================================
   FIGURE 18.2: the periodic table shaded by class, as the text classes
   the elements, with one of its six groups of representative metals read
   down beneath it: each member's first ionization energy (the book's
   values of Figure 6.34) as a bar, the oxidation states the text gives
   each metal, and the way reactivity runs where the text states it.
   Still: nothing here has a clock; a choice morphs the bars and
   crossfades the rest.
===================================================================== */
(function () {
  const d = sim('sim-periodic', 940);
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

  /* each group the text takes, its members by period (2 to 6; the radioactive seventh is left out): IE₁ in kJ/mol as
     Figure 6.34 prints it, and the oxidation states the text gives each metal, a trailing * marking the state two below
     the group's. `react` is the run of periods along which the text says reactivity rises, tail to head. */
  const GROUPS = {
    1: { m: { 2: ['Li', 520, '1+'], 3: ['Na', 490, '1+'], 4: ['K', 420, '1+'], 5: ['Rb', 400, '1+'], 6: ['Cs', 380, '1+'] }, react: [2, 6],
      head: 'Down group 1 the first ionization energy falls, so each metal gives up its one valence electron more easily than the one above it.',
      ro: 'ns^{1}\\text{:}\\ \\ \\text{M}\\longrightarrow\\text{M}^{+}+\\text{e}^{-}' },
    2: { m: { 2: ['Be', 900, '2+'], 3: ['Mg', 730, '2+'], 4: ['Ca', 590, '2+'], 5: ['Sr', 550, '2+'], 6: ['Ba', 500, '2+'] }, react: [2, 6],
      head: 'Each alkaline earth metal has a higher first ionization energy than the alkali metal of its period and is less reactive than it.',
      ro: 'ns^{2}\\text{:}\\ \\ \\text{M}\\longrightarrow\\text{M}^{2+}+2\\,\\text{e}^{-}' },
    12: { m: { 4: ['Zn', 910, '2+'], 5: ['Cd', 870, '2+'], 6: ['Hg', 1000, '2+ 1+'] }, react: [6, 4],
      head: 'Group 12 runs the other way: zinc is the most reactive and mercury the least. Mercury also shows 1+, in $\\text{Hg}_{2}{}^{2+}$.',
      ro: 'ns^{2}\\text{:}\\ \\ \\text{M}\\longrightarrow\\text{M}^{2+}+2\\,\\text{e}^{-}' },
    13: { m: { 2: ['B', 800], 3: ['Al', 580, '3+'], 4: ['Ga', 580, '3+ 1+*'], 5: ['In', 560, '3+ 1+*'], 6: ['Tl', 590, '3+ 1+*'] },
      head: 'Aluminum normally shows 3+. Gallium, indium and thallium also form 1+ ions, two below the group oxidation state.',
      ro: 'ns^{2}np^{1}\\text{:}\\ \\ \\text{M}\\longrightarrow\\text{M}^{3+}+3\\,\\text{e}^{-}\\\\\\text{Ga, In and Tl, keeping the }ns^{2}\\text{ pair:}\\ \\ \\text{M}\\longrightarrow\\text{M}^{+}+\\text{e}^{-}' },
    14: { m: { 2: ['C', 1090], 3: ['Si', 780], 4: ['Ge', 780], 5: ['Sn', 700, '4+ 2+*'], 6: ['Pb', 710, '4+ 2+*'] },
      head: 'Tin and lead form stable 2+ cations, two below the group oxidation state of 4+, and covalent compounds in the 4+ state.',
      ro: '\\text{Sn and Pb, keeping the }ns^{2}\\text{ pair of }ns^{2}np^{2}\\text{:}\\ \\ \\text{M}\\longrightarrow\\text{M}^{2+}+2\\,\\text{e}^{-}' },
    15: { m: { 2: ['N', 1400], 3: ['P', 1060], 4: ['As', 960], 5: ['Sb', 830], 6: ['Bi', 800, '5+ 3+*'] },
      head: 'Bismuth readily gives up three of its five valence electrons as $\\text{Bi}^{3+}$ and reaches 5+ only with strong oxidizing agents.',
      ro: '\\text{Bi, keeping the }6s^{2}\\text{ pair of }6s^{2}6p^{3}\\text{:}\\ \\ \\text{Bi}\\longrightarrow\\text{Bi}^{3+}+3\\,\\text{e}^{-}' },
  };
  const KEYS = ['1', '2', '12', '13', '14', '15'], PERIODS = [2, 3, 4, 5, 6];
  const pick = F.choice(d.controls, { label: '\\text{group}', options: KEYS.map((k) => ({ value: k, label: k })), value: '1', aria: 'which group is read down' });

  /* the table: 18 columns of 70 units from x = 100, seven rows of 56 from y = 150 */
  const L = 100, PITCH = 70, T = 150, ROW = 56, CW = 64, CH = 50;
  const cx = (g) => L + (g - 0.5) * PITCH, cy = (p) => T + (p - 0.5) * ROW;
  const TOP = { 1: 1, 2: 2, 13: 2, 14: 2, 15: 2, 16: 2, 17: 2, 18: 1 };
  /* the chosen group below it, one row to a period: its square, its IE₁ as a bar on a fixed scale of 0 to 1500 kJ/mol
     (nitrogen's 1400 the longest), its oxidation states */
  const HEAD = 590, RY = (p) => 644 + (p - 2) * 56, SQ = 215, X0 = 290, PER = 0.44, XE = (ie) => X0 + ie * PER;
  const ST = 1110, AR = 1292, KEYLINE = 912;
  const fillOf = (cls) => (CLASS[cls].hex ? F.mixColor(PAL.panel, F.fact(CLASS[cls].hex), 0.5) : PAL.panel);
  const rbox = (ctx, x, y, w, h, stroke, dash, lw = 2) => {
    ctx.save(); ctx.beginPath(); ctx.roundRect(x, y, w, h, 6); ctx.lineWidth = lw; ctx.strokeStyle = stroke;
    if (dash) ctx.setLineDash([5, 4]); ctx.stroke(); ctx.restore();
  };
  const swatch = (cls) => (ctx, x, y) => {
    ctx.save(); ctx.fillStyle = fillOf(cls); ctx.fillRect(x - 15, y - 10, 30, 20);
    ctx.lineWidth = 1.5; ctx.strokeStyle = alpha(PAL.ink, 0.3); ctx.strokeRect(x - 15, y - 10, 30, 20); ctx.restore();
  };
  let hits = []; F.hover(d.stage, () => hits);
  /* a tap on a square of one of the six groups chooses that group */
  d.c.style.cursor = 'pointer';
  d.c.addEventListener('click', (ev) => {
    const r = d.c.getBoundingClientRect(); if (!r.width) return;
    const s = 1400 / r.width, px = (ev.clientX - r.left) * s, py = (ev.clientY - r.top) * s;
    if (py < T || py > T + 7 * ROW) return;
    const g = String(Math.floor((px - L) / PITCH) + 1);
    if (KEYS.includes(g) && g !== pick.value && py >= cy(TOP[+g] ?? 4) - ROW / 2) pick.drive(g);
  });

  still(d, () => {
    const { ctx } = begin(d.c);
    const v = pick.value, ce = C('energy'), G = GROUPS[v];
    headline(ctx, G.head);
    hits = [];
    text(ctx, 'period', L - 34, T - 40, PAL.muted, { size: 15, align: 'center' });
    text(ctx, 'group', cx(1), T - 40, PAL.muted, { size: 15, align: 'center' });
    for (let g = 1; g <= 18; g++) text(ctx, String(g), cx(g), T + ((TOP[g] ?? 4) - 1) * ROW - 14, PAL.muted, { size: 15, weight: 600, align: 'center' });
    for (let p = 1; p <= 7; p++) text(ctx, String(p), L - 34, cy(p), PAL.muted, { size: 15, weight: 600, align: 'center' });

    const cell = (cls, x, y, a, sym, corner, symSize = 21) => {
      ctx.save(); ctx.globalAlpha *= a;
      ctx.fillStyle = fillOf(cls); ctx.fillRect(x - CW / 2, y - CH / 2, CW, CH);
      ctx.lineWidth = 1.5; ctx.strokeStyle = alpha(PAL.ink, 0.3); ctx.strokeRect(x - CW / 2, y - CH / 2, CW, CH);
      if (corner) text(ctx, corner, x - CW / 2 + 4, y - CH / 2 + 10, PAL.ink, { size: 14 });
      text(ctx, sym, x, y + 6, PAL.ink, { size: symSize, weight: 600, align: 'center' });
      ctx.restore();
    };
    const nameOf = (e) => `${e.name} (${e.sym}, Z = ${e.Z}): ${CLASS[e.cls].name}${STATE[e.st] ? ', ' + STATE[e.st] : ''}`;
    const dim = (g) => pick.mix((w) => (g === +w ? 1 : 0.62));
    EL.forEach((e) => {
      if (e.f) return;
      const x = cx(e.g), y = cy(e.p);
      cell(e.cls, x, y, dim(e.g), e.sym, String(e.Z));
      hits.push({ x, y, r: 30, name: nameOf(e) });
    });
    /* the two places of the f-block in group 3 */
    [[6, 'La–Lu', 'trans', 'Lanthanum to lutetium (Z = 57 to 71): inner transition metals'],
      [7, 'Ac–Lr', 'radio', 'Actinium to lawrencium (Z = 89 to 103): inner transition metals, radioactive']].forEach(([p, s, cls, name]) => {
      cell(cls, cx(3), cy(p), dim(3), s, '', 15);
      hits.push({ x: cx(3), y: cy(p), r: 30, name });
    });
    /* the key to the shading, in the gap above the transition metals */
    const gap = { l: cx(3) - CW / 2 - 12, r: cx(12) + CW / 2, t: T - 22, b: T + 3 * ROW - 30 };
    F.legend(ctx, gap, ['rep', 'trans', 'radio'].map((c) => ({ s: CLASS[c].legend, draw: swatch(c) })), { corner: 'tl', panel: false });
    F.legend(ctx, { ...gap, l: gap.l + 440 }, ['metalloid', 'nonmetal'].map((c) => ({ s: CLASS[c].legend, draw: swatch(c) })), { corner: 'tl', panel: false });
    /* the chosen group's column, outlined from its first member down */
    KEYS.forEach((k) => pick.only(ctx, k, () => {
      const g = +k, p0 = Math.min(...Object.keys(GROUPS[k].m).map(Number));
      rbox(ctx, cx(g) - CW / 2 - 5, cy(p0) - CH / 2 - 5, CW + 10, cy(7) - cy(p0) + CH + 10, PAL.ink, false, 2.5);
    }, [0, 0]));

    /* the group read down: the frame every group shares */
    text(ctx, 'period', L - 34, HEAD, PAL.muted, { size: 15, align: 'center' });
    text(ctx, 'first ionization energy (kJ/mol)', X0, HEAD, ce, { size: 17 });
    text(ctx, 'oxidation states', ST, HEAD, PAL.muted, { size: 17, align: 'center' });
    PERIODS.forEach((p) => text(ctx, String(p), L - 34, RY(p), PAL.muted, { size: 15, weight: 600, align: 'center' }));
    [0, 500, 1000, 1500].forEach((t) => {
      line(ctx, XE(t), RY(2) - 28, XE(t), RY(6) + 28, t ? PAL.rule : alpha(PAL.ink, 0.6), t ? 1.5 : 2);
      text(ctx, String(t), XE(t), KEYLINE, PAL.muted, { size: 17, align: 'center' });
    });
    /* the bars lengthen and shorten from one group to the next; a metal's is filled, a metalloid's or nonmetal's hollow */
    PERIODS.forEach((p) => {
      const ie = pick.mix((w) => GROUPS[w].m[p]?.[1] ?? 0), solid = pick.mix((w) => (GROUPS[w].m[p]?.[2] ? 0.55 : 0));
      if (ie < 1) return;
      ctx.save(); ctx.fillStyle = alpha(ce, solid); ctx.fillRect(X0, RY(p) - 19, ie * PER, 24);
      ctx.lineWidth = 3; ctx.strokeStyle = ce; ctx.strokeRect(X0, RY(p) - 19, ie * PER, 24); ctx.restore();
    });
    KEYS.forEach((k) => pick.only(ctx, k, () => {
      const K = GROUPS[k];
      let inert = false;
      text(ctx, `group ${k}`, SQ, HEAD, PAL.ink, { size: 17, weight: 600, align: 'center' });
      PERIODS.forEach((p) => {
        const row = K.m[p]; if (!row) return;
        const [sym, ie, states] = row, e = BY[sym], y = RY(p), live = k === v;
        cell(e.cls, SQ, y, 1, sym, String(e.Z));
        text(ctx, String(ie), XE(ie) + 12, y - 7, ce, { size: 19, weight: 600 });
        if (live) hits.push({ x: SQ, y, r: 30, name: nameOf(e) }, { x: X0 + (ie * PER) / 2, y: y - 7, r: 16, name: `first ionization energy of ${e.name.toLowerCase()}, ${ie} kJ/mol` });
        /* group 2 beside group 1: the alkali metal of the same period as a thin bar under the row's own */
        if (k === '2') {
          const [s1, ie1] = GROUPS[1].m[p];
          ctx.save(); ctx.lineWidth = 1.5; ctx.strokeStyle = alpha(PAL.ink, 0.7); ctx.fillStyle = alpha(PAL.ink, 0.22);
          ctx.fillRect(X0, y + 11, ie1 * PER, 10); ctx.strokeRect(X0, y + 11, ie1 * PER, 10); ctx.restore();
          text(ctx, `${s1} ${ie1}`, XE(ie1) + 10, y + 17, PAL.muted, { size: 16 });
          if (live) hits.push({ x: X0 + (ie1 * PER) / 2, y: y + 16, r: 8, name: `first ionization energy of ${BY[s1].name.toLowerCase()}, ${ie1} kJ/mol` });
        }
        if (!states) { text(ctx, CLASS[e.cls].name, ST, y, PAL.muted, { size: 17, align: 'center' }); return; }
        const chips = states.split(' '), w = 54, sp = 12, x0 = ST - (chips.length * w + (chips.length - 1) * sp) / 2;
        chips.forEach((c, j) => {
          const two = c.endsWith('*'), cl = x0 + j * (w + sp), s = two ? c.slice(0, -1) : c;
          if (two) { inert = true; rbox(ctx, cl, y - 17, w, 34, PAL.ink, true); }
          text(ctx, s, cl + w / 2, y, PAL.ink, { size: 20, weight: 600, align: 'center' });
          if (live) hits.push({ x: cl + w / 2, y, r: 22, name: two ? `${e.name.toLowerCase()} in the ${s} state, two below the group oxidation state` : `${e.name.toLowerCase()} in the ${s} state` });
        });
      });
      if (K.react) {
        const [a, b] = K.react, ya = RY(a) + (a < b ? -18 : 18), yb = RY(b) + (a < b ? 18 : -18);
        F.arrow(ctx, AR, ya, AR, yb, PAL.ink, 3);
        ctx.save(); ctx.translate(AR + 34, (ya + yb) / 2); ctx.rotate(-Math.PI / 2);
        text(ctx, 'more reactive', 0, 0, PAL.ink, { size: 17, align: 'center' }); ctx.restore();
      }
      const keys = [];
      if (k === '2') keys.push({ s: 'the alkali metal of the same period', draw: (c2, x, y) => {
        c2.save(); c2.lineWidth = 1.5; c2.strokeStyle = alpha(PAL.ink, 0.7); c2.fillStyle = alpha(PAL.ink, 0.22);
        c2.fillRect(x - 20, y - 5, 40, 10); c2.strokeRect(x - 20, y - 5, 40, 10); c2.restore();
      } });
      if (inert) keys.push({ s: 'the inert pair effect', draw: (c2, x, y) => rbox(c2, x - 18, y - 10, 36, 20, PAL.ink, true) });
      if (keys.length) F.legend(ctx, { l: 1000, r: 1390, t: KEYLINE - 24, b: KEYLINE + 20 }, keys, { corner: 'top', panel: false });
    }, [0, 0]));

    tex(d.readout, G.ro);
  });
})();
};
