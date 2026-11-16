/* Figures for section 19.1 Occurrence, Preparation, and Properties of Transition Metals and Their Compounds. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['19.1'] = function (root, F) {
const { tex, C, PAL, alpha, register, begin, line, arrow, dot, text, topline, hbracket } = F;
const sim = (id, H) => F.sim(root, id, H);
const TAU = 2 * Math.PI;
const clamp01 = (x) => Math.min(1, Math.max(0, x));
const WORD = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'];
const kv = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;

/* ---------- the elements, by atomic number ---------- */
const SYM = "H He Li Be B C N O F Ne Na Mg Al Si P S Cl Ar K Ca Sc Ti V Cr Mn Fe Co Ni Cu Zn Ga Ge As Se Br Kr Rb Sr Y Zr Nb Mo Tc Ru Rh Pd Ag Cd In Sn Sb Te I Xe Cs Ba La Ce Pr Nd Pm Sm Eu Gd Tb Dy Ho Er Tm Yb Lu Hf Ta W Re Os Ir Pt Au Hg Tl Pb Bi Po At Rn Fr Ra Ac Th Pa U Np Pu Am Cm Bk Cf Es Fm Md No Lr Rf Db Sg Bh Hs Mt Ds Rg Cn Nh Fl Mc Lv Ts Og".split(' ');
const NAME = "Hydrogen Helium Lithium Beryllium Boron Carbon Nitrogen Oxygen Fluorine Neon Sodium Magnesium Aluminum Silicon Phosphorus Sulfur Chlorine Argon Potassium Calcium Scandium Titanium Vanadium Chromium Manganese Iron Cobalt Nickel Copper Zinc Gallium Germanium Arsenic Selenium Bromine Krypton Rubidium Strontium Yttrium Zirconium Niobium Molybdenum Technetium Ruthenium Rhodium Palladium Silver Cadmium Indium Tin Antimony Tellurium Iodine Xenon Cesium Barium Lanthanum Cerium Praseodymium Neodymium Promethium Samarium Europium Gadolinium Terbium Dysprosium Holmium Erbium Thulium Ytterbium Lutetium Hafnium Tantalum Tungsten Rhenium Osmium Iridium Platinum Gold Mercury Thallium Lead Bismuth Polonium Astatine Radon Francium Radium Actinium Thorium Protactinium Uranium Neptunium Plutonium Americium Curium Berkelium Californium Einsteinium Fermium Mendelevium Nobelium Lawrencium Rutherfordium Dubnium Seaborgium Bohrium Hassium Meitnerium Darmstadtium Roentgenium Copernicium Nihonium Flerovium Moscovium Livermorium Tennessine Oganesson".split(' ');
/* group and period of an element; the lanthanides and actinides (57 to 71, 89 to 103) are in the f rows, as the book prints them */
function place(Z) {
  const starts = [1, 3, 11, 19, 37, 55, 87, 119];
  const p = starts.findIndex((s, i) => Z >= s && Z < starts[i + 1]) + 1, o = Z - starts[p - 1];
  if (p === 1) return { period: 1, group: Z === 1 ? 1 : 18 };
  if (p <= 3) return { period: p, group: o < 2 ? o + 1 : o + 11 };
  if (p <= 5) return { period: p, group: o + 1 };
  if (o < 2) return { period: p, group: o + 1 };
  if (o <= 16) return { period: p, f: o - 2 };
  return { period: p, group: o - 13 };
}

/* one electron in an orbital box: a half-arrow, up on the left of the box, down on the right */
function spin(ctx, x, y, up, h, color, w = 3) {
  const t = up ? y - h / 2 : y + h / 2, b = up ? y + h / 2 : y - h / 2, s = up ? 1 : -1;
  line(ctx, x, b, x, t, color, w);
  line(ctx, x, t, x - 0.28 * h, t + s * 0.3 * h, color, w);
}
const trace = (ctx, pts, close) => { ctx.beginPath(); pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); if (close) ctx.closePath(); };

/* =====================================================================
   FIGURE 19.2: the six series on the periodic table, and under the table
   the chosen series member by member: its outer electrons as a column of
   squares, the subshell the series fills solid and the electrons beside
   it open, over each member's configuration (those of Figure 6.29). The
   point the text makes in words is then seen: lanthanum and actinium
   hold a d electron and no f electron, so each opens a transition series
   by its configuration and an f series by its behavior. A choice, or a
   tap on a member in the table, picks the series. Still.
===================================================================== */
(function () {
  const d = sim('sim-transition-series', 1040);
  const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
  const cfgs = (s) => s.split(',').map((m) => m.trim().split(' ').map((t) => { const q = /^(\d[spdf])(\d+)$/.exec(t); return [q[1], +q[2]]; }));
  /* fill: the subshell the series fills; side: the subshell whose electrons are drawn open on top of it */
  const SERIES = {
    first: { z: range(21, 29), core: 'Ar', fill: '3d', side: '4s',
      cfg: cfgs('3d1 4s2, 3d2 4s2, 3d3 4s2, 3d5 4s1, 3d5 4s2, 3d6 4s2, 3d7 4s2, 3d8 4s2, 3d10 4s1'),
      head: 'The first transition series fills the $3d$ subshell, from one electron in scandium to ten in copper.',
      ro: '{}_{21}\\text{Sc}\\ \\text{to}\\ {}_{29}\\text{Cu:}\\ \\ [\\text{Ar}]\\,3d^{\\,1\\text{–}10}\\,4s^{\\,1\\text{–}2}' },
    second: { z: range(39, 47), core: 'Kr', fill: '4d', side: '5s',
      cfg: cfgs('4d1 5s2, 4d2 5s2, 4d4 5s1, 4d5 5s1, 4d5 5s2, 4d7 5s1, 4d8 5s1, 4d10, 4d10 5s1'),
      head: 'The second transition series fills the $4d$ subshell, from one electron in yttrium to ten in silver.',
      ro: '{}_{39}\\text{Y}\\ \\text{to}\\ {}_{47}\\text{Ag:}\\ \\ [\\text{Kr}]\\,4d^{\\,1\\text{–}10}\\,5s^{\\,0\\text{–}2}' },
    third: { z: [57, ...range(72, 79)], core: 'Xe', fill: '5d', side: '6s',
      cfg: cfgs('5d1 6s2, 4f14 5d2 6s2, 4f14 5d3 6s2, 4f14 5d4 6s2, 4f14 5d5 6s2, 4f14 5d6 6s2, 4f14 5d7 6s2, 4f14 5d9 6s1, 4f14 5d10 6s1'),
      head: 'Lanthanum holds the first $5d$ electron and hafnium the second, once the lanthanides have filled $4f$.',
      ro: '{}_{57}\\text{La}\\ \\text{and}\\ {}_{72}\\text{Hf}\\ \\text{to}\\ {}_{79}\\text{Au:}\\ \\ [\\text{Xe}]\\,4f^{\\,0\\text{ or }14}\\,5d^{\\,1\\text{–}10}\\,6s^{\\,1\\text{–}2}' },
    fourth: { z: [89, ...range(104, 111)], core: 'Rn', fill: '6d', side: '7s',
      cfg: cfgs('6d1 7s2, 5f14 6d2 7s2, 5f14 6d3 7s2, 5f14 6d4 7s2, 5f14 6d5 7s2, 5f14 6d6 7s2, 5f14 6d7 7s2, 5f14 6d8 7s2, 5f14 6d9 7s2'),
      head: 'Actinium holds the first $6d$ electron and rutherfordium the second, once the actinides have filled $5f$.',
      ro: '{}_{89}\\text{Ac}\\ \\text{and}\\ {}_{104}\\text{Rf}\\ \\text{to}\\ {}_{111}\\text{Rg:}\\ \\ [\\text{Rn}]\\,5f^{\\,0\\text{ or }14}\\,6d^{\\,1\\text{–}9}\\,7s^{\\,2}' },
    lanthanides: { z: range(57, 71), core: 'Xe', fill: '4f', side: '5d',
      cfg: cfgs('5d1 6s2, 4f1 5d1 6s2, 4f3 6s2, 4f4 6s2, 4f5 6s2, 4f6 6s2, 4f7 6s2, 4f7 5d1 6s2, 4f9 6s2, 4f10 6s2, 4f11 6s2, 4f12 6s2, 4f13 6s2, 4f14 6s2, 4f14 5d1 6s2'),
      head: 'Cerium to lutetium fill the $4f$ subshell. Lanthanum has no $4f$ electron and is a lanthanide by its behavior.',
      ro: '{}_{57}\\text{La}\\ \\text{to}\\ {}_{71}\\text{Lu:}\\ \\ [\\text{Xe}]\\,4f^{\\,0\\text{–}14}\\,5d^{\\,0\\text{–}1}\\,6s^{\\,2}' },
    actinides: { z: range(89, 103), core: 'Rn', fill: '5f', side: '6d',
      cfg: cfgs('6d1 7s2, 6d2 7s2, 5f2 6d1 7s2, 5f3 6d1 7s2, 5f4 6d1 7s2, 5f6 7s2, 5f7 7s2, 5f7 6d1 7s2, 5f8 6d1 7s2, 5f10 7s2, 5f11 7s2, 5f12 7s2, 5f13 7s2, 5f14 7s2, 5f14 6d1 7s2'),
      head: 'The actinides fill the $5f$ subshell. Actinium has no $5f$ electron and is an actinide by its behavior.',
      ro: '{}_{89}\\text{Ac}\\ \\text{to}\\ {}_{103}\\text{Lr:}\\ \\ [\\text{Rn}]\\,5f^{\\,0\\text{–}14}\\,6d^{\\,0\\text{–}2}\\,7s^{\\,2}' },
  };
  const KEYS = Object.keys(SERIES);
  const pick = F.choice(d.controls, {
    label: '\\text{series}', aria: 'the series read member by member', value: 'first',
    options: KEYS.map((value) => ({ value, label: value })),
  });
  const lit = (v) => Array.from({ length: 118 }, (_, i) => (SERIES[v].z.includes(i + 1) ? 1 : 0));
  /* the table: 18 columns of 70 from x = 100, seven rows of 50 from y = 150, the two f rows under groups 3 to 17 */
  const X0 = 100, CW = 70, CH = 44, PY = 50, TOP = 150, FTOP = 520;
  function cell(Z) {
    const q = place(Z);
    if (q.f !== undefined) return { x: X0 + (2 + q.f) * CW, y: FTOP + (q.period - 6) * PY };
    return { x: X0 + (q.group - 1) * CW, y: TOP + (q.period - 1) * PY };
  }
  const isD = (Z) => { const q = place(Z); return q.f === undefined && q.group >= 3 && q.group <= 11; };
  const seriesOf = (Z) => (Z === 57 ? 'lanthanides' : Z === 89 ? 'actinides' : KEYS.find((k) => SERIES[k].z.includes(Z)));
  const tx = (c) => '$' + c.map(([s, n]) => `${s[0]}${s[1]}^{${n}}`).join('\\,') + '$';
  const plain = (c) => c.map(([s, n]) => s + String(n).split('').map((ch) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[+ch]).join('')).join(' ');
  const DUAL = { 57: ', a lanthanide by its behavior and the first member of the third transition series by its configuration', 89: ', an actinide by its behavior and the first member of the fourth transition series by its configuration' };
  const cfgOf = {}; KEYS.forEach((k) => SERIES[k].z.forEach((Z, i) => { cfgOf[Z] = `[${SERIES[k].core}] ${plain(SERIES[k].cfg[i])}`; }));
  let hits = []; F.hover(d.stage, () => hits);
  /* a tap on a member of a series in the table chooses that series; the two places in group 3 choose the d series that starts there */
  d.c.style.cursor = 'pointer';
  d.c.addEventListener('click', (ev) => {
    const r = d.c.getBoundingClientRect(); if (!r.width) return;
    const s = 1400 / r.width, px = (ev.clientX - r.left) * s, py = (ev.clientY - r.top) * s;
    let k = null;
    for (let Z = 1; Z <= 118 && !k; Z++) { const c = cell(Z); if (px >= c.x && px < c.x + CW && py >= c.y && py < c.y + PY) k = seriesOf(Z); }
    [[6, 'third'], [7, 'fourth']].forEach(([p, v]) => { if (px >= X0 + 2 * CW && px < X0 + 3 * CW && py >= TOP + (p - 1) * PY && py < TOP + p * PY) k = v; });
    if (k && k !== pick.value) pick.drive(k);
  });
  /* the series below: columns from BASE up, one square to an electron */
  const BASE = 884, U = 13, SQ = 32;
  function draw() {
    const { ctx } = begin(d.c);
    const on = pick.mix(lit), v = pick.value;
    hits = [];
    text(ctx, 'period', X0 - 30, TOP - 36, PAL.muted, { size: 15, align: 'center' });
    text(ctx, 'group', X0 + CW / 2, TOP - 36, PAL.muted, { size: 15, align: 'center' });
    for (let p = 1; p <= 7; p++) text(ctx, String(p), X0 - 30, TOP + (p - 1) * PY + CH / 2, PAL.muted, { size: 16, weight: 600, align: 'center' });
    const firstRow = [1, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 2, 2, 2, 2, 1];
    firstRow.forEach((p, g) => text(ctx, String(g + 1), X0 + g * CW + CW / 2, TOP + (p - 1) * PY - 13, PAL.muted, { size: 16, weight: 600, align: 'center' }));
    hbracket(ctx, X0 + 2 * CW + 3, X0 + 11 * CW - 7, TOP + 3 * PY - 44, PAL.ink, 'transition elements', { side: 'above', size: 19 });
    const box = (x, y, k, soft, dash) => {
      ctx.save(); ctx.fillStyle = soft ? PAL.soft : PAL.panel; ctx.fillRect(x + 1, y, CW - 4, CH);
      if (k > 0) { ctx.fillStyle = alpha(PAL.ink, 0.22 * k); ctx.fillRect(x + 1, y, CW - 4, CH); }
      if (dash) ctx.setLineDash([6, 4]);
      ctx.strokeStyle = F.mixColor(alpha(PAL.ink, 0.3), PAL.ink, k); ctx.lineWidth = 1.5 + 1.5 * k; ctx.strokeRect(x + 1, y, CW - 4, CH); ctx.restore();
    };
    /* the two places in group 3 that the f rows stand for; each lights with the d series lanthanum or actinium opens */
    [[6, 'La–Lu', 'third', 'Lanthanum to lutetium, Z = 57 to 71'], [7, 'Ac–Lr', 'fourth', 'Actinium to lawrencium, Z = 89 to 103']].forEach(([p, s, key, name]) => {
      const x = X0 + 2 * CW, y = TOP + (p - 1) * PY, k = pick.mix((w) => (w === key ? 1 : 0));
      box(x, y, k, true, true);
      text(ctx, s, x + CW / 2 - 1, y + CH / 2, PAL.ink, { size: 16, align: 'center' });
      hits.push({ x: x + CW / 2, y: y + CH / 2, r: 24, name });
    });
    for (let Z = 1; Z <= 118; Z++) {
      const { x, y } = cell(Z), k = on[Z - 1], q = place(Z);
      box(x, y, k, q.f !== undefined || isD(Z), false);
      text(ctx, String(Z), x + 5, y + 10, PAL.muted, { size: 12 });
      text(ctx, SYM[Z - 1], x + CW / 2 + 2, y + 28, PAL.ink, { size: 19, weight: k > 0.5 ? 600 : 400, align: 'center' });
      hits.push({ x: x + CW / 2, y: y + CH / 2, r: 24, name: `${NAME[Z - 1]}, Z = ${Z}${cfgOf[Z] ? ', ' + cfgOf[Z] : ''}${DUAL[Z] ?? ''}` });
    }
    text(ctx, 'lanthanides', X0 + 2 * CW - 12, FTOP + CH / 2, PAL.ink, { size: 17, align: 'right' });
    text(ctx, 'actinides', X0 + 2 * CW - 12, FTOP + PY + CH / 2, PAL.ink, { size: 17, align: 'right' });
    hbracket(ctx, X0 + 2 * CW + 3, X0 + 17 * CW - 7, FTOP + PY + CH + 18, PAL.ink, 'inner transition elements', { side: 'below', size: 19 });

    /* the chosen series, member by member */
    KEYS.forEach((key) => pick.only(ctx, key, () => {
      const S = SERIES[key], n = S.z.length, P = n > 9 ? 80 : 128, x0 = 742 - (n * P) / 2, f = S.fill[1] === 'f';
      const u = f ? 10.5 : U, top = f ? 15 : 12;
      /* the count's scale */
      [0, 5, 10, ...(f ? [14] : [])].forEach((t) => {
        line(ctx, x0 - 6, BASE - t * u, x0 + n * P - 4, BASE - t * u, t ? PAL.rule : alpha(PAL.ink, 0.6), t ? 1.5 : 2);
        text(ctx, String(t), x0 - 16, BASE - t * u, PAL.muted, { size: 16, align: 'right' });
      });
      text(ctx, 'outer electrons', x0 - 16, BASE - top * u - 20, PAL.muted, { size: 17, align: 'left' });
      text(ctx, `[${S.core}]`, x0 - 16, BASE + (f ? 84 : 88), PAL.ink, { size: 19, align: 'right' });
      S.z.forEach((Z, i) => {
        const cx = x0 + i * P + P / 2 - 5, c = S.cfg[i], nf = (c.find(([s]) => s === S.fill) ?? [0, 0])[1], ns = (c.find(([s]) => s === S.side) ?? [0, 0])[1];
        const w = f ? 40 : 56;
        ctx.save();
        for (let e = 0; e < nf + ns; e++) {
          const y = BASE - (e + 1) * u;
          ctx.fillStyle = e < nf ? alpha(PAL.ink, 0.72) : PAL.panel; ctx.fillRect(cx - w / 2, y + 1, w, u - 2);
          ctx.strokeStyle = PAL.ink; ctx.lineWidth = 1.5; ctx.strokeRect(cx - w / 2, y + 1, w, u - 2);
        }
        ctx.restore();
        /* the member's square */
        ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.12); ctx.fillRect(cx - SQ, BASE + 10, 2 * SQ, 46);
        ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2; if (DUAL[Z]) ctx.setLineDash([6, 4]); ctx.strokeRect(cx - SQ, BASE + 10, 2 * SQ, 46); ctx.restore();
        text(ctx, String(Z), cx - SQ + 5, BASE + 21, PAL.muted, { size: 13 });
        text(ctx, SYM[Z - 1], cx + 3, BASE + 38, PAL.ink, { size: 21, weight: 600, align: 'center' });
        if (f) {   /* fifteen members stand close, so the 6s² or 7s² they all share goes on a line of its own */
          text(ctx, tx(c.slice(0, -1)), cx, BASE + 84, PAL.ink, { size: 17, align: 'center', tex: true });
          text(ctx, tx(c.slice(-1)), cx, BASE + 112, PAL.ink, { size: 17, align: 'center', tex: true });
        } else text(ctx, tx(c), cx, BASE + 88, PAL.ink, { size: 19, align: 'center', tex: true });
        if (key === v) hits.push({ x: cx, y: BASE - ((nf + ns) * u) / 2, r: 26, name: `${NAME[Z - 1]}: ${nf} ${S.fill} and ${ns} ${S.side} ${nf + ns === 1 ? 'electron' : 'electrons'}` },
          { x: cx, y: BASE + 40, r: 30, name: `${NAME[Z - 1]}, Z = ${Z}, ${cfgOf[Z]}${DUAL[Z] ?? ''}` });
      });
      const sw = (solid) => (c2, x, y) => { c2.save(); c2.fillStyle = solid ? alpha(PAL.ink, 0.72) : PAL.panel; c2.fillRect(x - 15, y - 6, 30, 12); c2.strokeStyle = PAL.ink; c2.lineWidth = 1.5; c2.strokeRect(x - 15, y - 6, 30, 12); c2.restore(); };
      F.legend(ctx, { l: 760, r: x0 + n * P - 4, t: BASE - top * u - 38, b: BASE - top * u - 2 },
        [{ s: `an electron in $${S.fill[0]}${S.fill[1]}$`, draw: sw(true) }, { s: `an electron in $${S.side[0]}${S.side[1]}$`, draw: sw(false) }], { corner: 'top', row: true, panel: false, size: 17 });
    }, [0, 10]));
    topline(ctx, SERIES[v].head);
    tex(d.readout, SERIES[v].ro);
  }
  register(d.fig, { update: () => {}, draw });
})();
/* =====================================================================
   FIGURE 19.4: the oxidation states of the first transition series.
   Each metal is a column as tall as its count of 4s and 3d electrons,
   one cell to an electron lost, with the book's chart of states marked
   in the cells: the highest states of scandium to manganese reach the
   top of their columns and those of iron to zinc stop short, which is
   the text's point. Beside it the chosen metal's 4s and 3d boxes above
   those of its ion in the chosen state, the electrons that state takes
   (the 4s first) left as faint ghosts numbered in the order they go.
   Still: a choice of metal and of state; a tap on a marked cell picks both.
===================================================================== */
(function () {
  const d = sim('sim-oxidation-states', 650);
  /* symbol, name, Z, 4s and 3d electrons of the atom, the states the book's chart prints */
  const M = [
    ['Sc', 'Scandium', 21, 2, 1, [3]], ['Ti', 'Titanium', 22, 2, 2, [3, 4]], ['V', 'Vanadium', 23, 2, 3, [2, 3, 4, 5]],
    ['Cr', 'Chromium', 24, 1, 5, [2, 3, 4, 6]], ['Mn', 'Manganese', 25, 2, 5, [2, 3, 4, 6, 7]], ['Fe', 'Iron', 26, 2, 6, [2, 3, 6]],
    ['Co', 'Cobalt', 27, 2, 7, [2, 3]], ['Ni', 'Nickel', 28, 2, 8, [2, 3]], ['Cu', 'Copper', 29, 1, 10, [1, 2, 3]], ['Zn', 'Zinc', 30, 2, 10, [2]],
  ].map(([sym, name, Z, s, dd, states]) => ({ sym, name, Z, s, d: dd, states, top: Math.max(...states), val: s + dd }));
  const of = (v) => M.find((m) => m.sym === v);
  const stOpts = (m) => m.states.map((n) => ({ value: String(n), label: n + '+' }));
  const pick = F.choice(d.controls, {
    label: '\\text{metal}', aria: 'the metal of the first transition series', value: 'Ti',
    options: M.map((m) => ({ value: m.sym, label: m.sym })),
    onInput: () => { const m = of(pick.value); st.options(stOpts(m), String(m.top)); },
  });
  const st = F.choice(d.controls, { label: '\\text{oxidation state}', aria: 'the oxidation state of the ion', value: '4', options: stOpts(of('Ti')), ms: 0 });
  const state = (m) => (m.states.includes(+st.value) ? +st.value : m.top);
  /* the chart: ten columns, a row to each electron lost, 1 at the bottom */
  const GX = 86, GW = 64, RH = 35, YB = 568, CWD = 54;
  const colX = (c) => GX + c * GW + GW / 2, rowY = (n) => YB - (n - 0.5) * RH;
  /* the orbital boxes: the atom's row above the ion's */
  const SX = 850, DX = 978, BW = 76, BH = 72, Y1 = 262, Y2 = 452;
  /* every electron of the atom: where it sits and the order it leaves in (4s first, then 3d from the last one placed) */
  function electrons(m) {
    const out = [];
    for (let i = 0; i < m.s; i++) out.push({ x: SX + (m.s === 1 ? 0.5 : i === 0 ? 0.36 : 0.64) * BW, up: i === 0, sub: 's', i });
    for (let i = 0; i < m.d; i++) {
      const box = i < 5 ? i : i - 5, up = i < 5, two = m.d > 5 && box < m.d - 5;
      out.push({ x: DX + box * BW + (two ? (up ? 0.36 : 0.64) : 0.5) * BW, up, sub: 'd', i });
    }
    const sOut = out.filter((e) => e.sub === 's').reverse(), dOut = out.filter((e) => e.sub === 'd').reverse();
    [...sOut, ...dOut].forEach((e, n) => { e.order = n + 1; });
    return out;
  }
  const ROMAN = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];
  const cfg = (s, dd) => (dd ? `3d^{${dd}}` : '') + (s ? `4s^{${s}}` : '');
  const boxes = (ctx, y) => {
    ctx.save(); ctx.fillStyle = PAL.panel; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2;
    ctx.strokeRect(SX, y - BH / 2, BW, BH);
    for (let b = 0; b < 5; b++) ctx.strokeRect(DX + b * BW, y - BH / 2, BW, BH);
    ctx.restore();
    text(ctx, '[Ar]', SX - 14, y + 16, PAL.ink, { size: 21, align: 'right' });
  };
  let hits = []; F.hover(d.stage, () => hits);
  d.c.style.cursor = 'pointer';
  d.c.addEventListener('click', (ev) => {
    const r = d.c.getBoundingClientRect(); if (!r.width) return;
    const s = 1400 / r.width, px = (ev.clientX - r.left) * s, py = (ev.clientY - r.top) * s;
    const c = Math.floor((px - GX) / GW), n = Math.floor((YB - py) / RH) + 1;
    if (c < 0 || c > 9 || py > YB + 50) return;
    const m = M[c];
    if (n >= 1 && !m.states.includes(n)) { if (n > m.val) return; }
    if (m.sym !== pick.value) pick.drive(m.sym);
    if (m.states.includes(n)) st.drive(String(n));
  });
  function draw() {
    const { ctx } = begin(d.c);
    const m = of(pick.value), q = state(m);
    hits = [];
    /* the chart */
    text(ctx, 'oxidation state', GX - 62, YB - 12 * RH - 22, PAL.muted, { size: 17 });
    for (let n = 1; n <= 12; n++) text(ctx, n + '+', GX - 12, rowY(n), PAL.muted, { size: 16, align: 'right' });
    line(ctx, GX - 4, YB, GX + 10 * GW + 4, YB, alpha(PAL.ink, 0.6), 2);
    M.forEach((p, c) => {
      const x = colX(c), sel = p.sym === m.sym, k = pick.mix((v) => (v === p.sym ? 1 : 0));
      for (let n = 1; n <= p.val; n++) {
        const y = rowY(n), has = p.states.includes(n), cur = sel && n === q;
        ctx.save();
        ctx.fillStyle = PAL.panel; ctx.fillRect(x - CWD / 2, y - RH / 2 + 2, CWD, RH - 4);
        if (sel && n <= q) { ctx.fillStyle = alpha(PAL.ink, cur ? 0.85 : 0.16); ctx.fillRect(x - CWD / 2, y - RH / 2 + 2, CWD, RH - 4); }
        ctx.strokeStyle = F.mixColor(alpha(PAL.ink, 0.28), PAL.ink, k); ctx.lineWidth = 1.5 + 0.5 * k; ctx.strokeRect(x - CWD / 2, y - RH / 2 + 2, CWD, RH - 4);
        ctx.restore();
        if (has) {
          text(ctx, n + '+', x, y, cur ? PAL.panel : PAL.ink, { size: 19, weight: 600, align: 'center' });
          hits.push({ x, y, r: 17, name: `${p.name.toLowerCase()}(${ROMAN[n]}), ${p.sym}${n === 1 ? '' : n}+` });
        }
      }
      text(ctx, p.sym, x + 6, YB + 26, PAL.ink, { size: 22, weight: sel ? 600 : 400, align: 'center' });
      text(ctx, String(p.Z), x + 4 - F.measure(ctx, p.sym, { size: 22 }) / 2, YB + 16, PAL.muted, { size: 13, align: 'right' });
      hits.push({ x, y: YB + 24, r: 22, name: `${p.name}, Z = ${p.Z}: ${p.val} electrons in 4s and 3d` });
    });
    text(ctx, 'A column has a cell for each', GX + 6, YB - 10.7 * RH, PAL.ink, { size: 19 });
    text(ctx, '$4s$ and $3d$ electron of the atom.', GX + 6, YB - 10.7 * RH + 27, PAL.ink, { size: 19, tex: true });

    /* the atom above, the ion in the chosen state below */
    boxes(ctx, Y1); boxes(ctx, Y2);
    text(ctx, '$4s$', SX + BW / 2, Y1 - BH / 2 - 22, PAL.ink, { size: 22, align: 'center', tex: true });
    text(ctx, '$3d$', DX + 2.5 * BW, Y1 - BH / 2 - 22, PAL.ink, { size: 22, align: 'center', tex: true });
    M.forEach((p) => pick.only(ctx, p.sym, () => {
      const qq = state(p);
      text(ctx, p.sym, SX - 14, Y1 - 14, PAL.ink, { size: 24, weight: 600, align: 'right' });
      text(ctx, `${p.sym}^{${qq === 1 ? '' : qq}+}`, SX - 14, Y2 - 14, PAL.ink, { size: 24, weight: 600, align: 'right' });
      electrons(p).forEach((e) => {
        spin(ctx, e.x, Y1, e.up, BH - 24, PAL.ink, 3.5);
        if (e.order <= qq) {
          spin(ctx, e.x, Y2, e.up, BH - 24, alpha(PAL.ink, 0.2), 2.5);
          text(ctx, String(e.order), e.x, Y2 + BH / 2 + 20, PAL.muted, { size: 18, align: 'center' });
        } else spin(ctx, e.x, Y2, e.up, BH - 24, PAL.ink, 3.5);
      });
      const ax = SX + BW + (DX - SX - BW) / 2;
      arrow(ctx, ax, Y1 + BH / 2 + 16, ax, Y2 - BH / 2 - 16, PAL.ink, 3);
      text(ctx, `− ${qq} e⁻`, ax + 18, (Y1 + Y2) / 2, PAL.ink, { size: 22 });
    }, [0, 0]));
    hits.push({ x: SX + BW / 2, y: Y1, r: 40, name: 'the 4s orbital of the atom' }, { x: DX + 2.5 * BW, y: Y1, r: 40, name: 'the five 3d orbitals of the atom' },
      { x: SX + BW / 2, y: Y2, r: 40, name: 'the 4s orbital of the ion' }, { x: DX + 2.5 * BW, y: Y2, r: 40, name: 'the five 3d orbitals of the ion' });
    F.legend(ctx, { l: SX - 60, r: DX + 5 * BW, t: Y2 + BH / 2 + 50, b: Y2 + BH / 2 + 100 }, [
      { s: 'electron', draw: (c2, x, y) => spin(c2, x + 4, y, true, 22, PAL.ink, 3) },
      { s: 'electron lost, numbered in the order it goes', draw: (c2, x, y) => spin(c2, x + 4, y, true, 22, alpha(PAL.ink, 0.25), 2.5) },
    ], { corner: 'top', row: true, panel: false, size: 18 });

    const lostS = Math.min(q, m.s), lostD = q - lostS, rem = m.d - lostD, nm = `${m.name}(${ROMAN[q]})`;
    const sPart = m.s === 1 ? 'its $4s$ electron' : 'its two $4s$ electrons';
    const dPart = lostD ? ` and ${WORD[lostD]} $3d$ ${lostD === 1 ? 'electron' : 'electrons'}` : '';
    topline(ctx, q === m.val ? `${nm}, the highest state of ${m.name.toLowerCase()}, has lost all ${WORD[m.val]} of its $4s$ and $3d$ electrons.`
      : q === m.top ? `${nm}, the highest state listed for ${m.name.toLowerCase()}, has lost ${sPart}${dPart} and keeps ${WORD[rem]} in $3d$.`
      : `${nm} has lost ${sPart}${dPart} and keeps ${WORD[rem]} in $3d$.`);
    const sLeft = m.s - lostS;
    const after = cfg(sLeft, rem);
    tex(d.readout, `\\text{${m.sym}}\\ ([\\text{Ar}]\\,${cfg(m.s, m.d)}) \\longrightarrow \\text{${m.sym}}^{${q === 1 ? '' : q}+}\\ ([\\text{Ar}]${after ? '\\,' + after : ''}) + ${q === 1 ? '' : q}\\,e^{-}`);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 19.6: the blast furnace in section, flat, from the book's image.
   A brick shaft: the charge goes in through the hopper and bell at the
   top, the gases leave by the off-take under it, preheated air is blown
   in through the nozzles at 15 ft, and the slag (at about 7 ft) and the
   molten iron (at the bottom) are run off from the hearth, the slag
   floating on the iron. The bed of ore, coke and limestone sinks while
   the gas rises through it, three times as fast. One thing is followed
   on a clock of T = 8 s, a lump of ore, coke or limestone down or the
   air up, and wears its formula, which changes as it crosses each of the
   book's eight zones; the zone it is in is lit in the book's list of
   heights, temperatures and reactions beside the shaft. The inside glows
   as its temperature asks. Time is linear and schematic: the real charge
   takes hours.
===================================================================== */
(function () {
  const H = 990, d = sim('sim-blast-furnace', H);
  const IRON = '#ff8c1a', SLAG = '#ffd24d';       /* the glow of molten iron and of molten slag */
  const ORE = '#8f3b2b', COKE = '#3a3d42', LIME = '#d8d0bf', METAL = '#9aa0a8';   /* roasted ore, coke, limestone and solid iron as they look */
  const DULL = '#b3261e', HOT = '#ff7a1a';        /* the glow of the bed: dull red from about 525 °C, orange by 1100 °C */
  const T = 8, CX = 330, K = 8, YB = 882, WALL = 30;
  const yOf = (h) => YB - h * K;
  const lerp = (a, b, k) => a + (b - a) * k;
  /* the inner half-width at height h ft: hearth, bosh, belly, stack and throat */
  const half = (h) => (h <= 10 ? 70 : h <= 28 ? lerp(70, 126, (h - 10) / 18) : h <= 36 ? 126 : h <= 80 ? lerp(126, 84, (h - 36) / 44) : 84);
  const TOP = 86, STOCK = 76, FOOT = 14, SPAN = STOCK - FOOT, OFF = 81.5, PIPE_X = 610;
  const ZONES = [[75, 230], [65, 410], [55, 525], [45, 865], [35, 945], [25, 1125], [15, 1300], [5, 1510]];
  const zoneOf = (h) => ZONES.reduce((b, z) => (Math.abs(z[0] - h) < Math.abs(b[0] - h) ? z : b))[0];
  /* what the followed thing itself does in each zone: a reaction of the book's list, or its formula where it only passes */
  const R = {
    ore: { 75: '3Fe_2O_3 + CO -> 2Fe_3O_4 + CO_2', 65: 'Fe_3O_4 + CO -> 3FeO + CO_2', 55: 'FeO + CO -> Fe + CO_2', 45: 'Fe(s)', 35: 'Fe(s) -> Fe(l)', 25: 'Fe(l)', 15: 'Fe(l)', 5: 'Fe(l)' },
    coke: { 75: 'C(s)', 65: 'C(s)', 55: 'C(s)', 45: 'C + CO_2 -> 2CO', 35: 'C + CO_2 -> 2CO', 25: 'C + CO_2 -> 2CO', 15: 'C + O_2 -> CO_2', 5: 'C + O_2 -> CO_2' },
    lime: { 75: 'CaCO_3(s)', 65: 'CaCO_3(s)', 55: 'CaCO_3(s)', 45: 'CaCO_3(s)', 35: 'CaCO_3 -> CaO + CO_2', 25: 'CaO + SiO_2 -> CaSiO_3', 15: 'CaSiO_3(l)', 5: 'CaSiO_3(l)' },
    air: { 15: 'C + O_2 -> CO_2', 25: 'C + CO_2 -> 2CO', 35: 'CO(g)', 45: 'CO(g)', 55: 'FeO + CO -> Fe + CO_2', 65: 'CO_2(g)', 75: 'CO_2(g)', 5: 'O_2(g)' },
  };
  /* the reactions the book prints beside each zone */
  const ZR = {
    75: '3Fe₂O₃ + CO ⟶ 2Fe₃O₄ + CO₂', 65: 'Fe₃O₄ + CO ⟶ 3FeO + CO₂', 55: 'FeO + CO ⟶ Fe + CO₂', 45: 'C + CO₂ ⟶ 2CO',
    35: 'CaCO₃ ⟶ CaO + CO₂; C + CO₂ ⟶ 2CO', 25: 'CaO + SiO₂ ⟶ CaSiO₃; C + CO₂ ⟶ 2CO', 15: 'C + O₂ ⟶ CO₂',
  };
  /* a formula written the book's way: upright symbols, subscripted counts, the arrow long */
  const tx = (s) => s.split(' ').map((w) => {
    if (w === '->') return '\\longrightarrow';
    if (w === '+') return '+';
    const m = /^(\d*)(.*?)(\([slg]\))?$/.exec(w);
    const body = m[2].replace(/_(\d)/g, '}_{$1}\\text{');
    return (m[1] || '') + `\\text{${body}}` + (m[3] ? `(${m[3][1]})` : '');
  }).join(' ').replace(/\\text\{\}/g, '');
  const HEAD = {
    ore: 'Carbon monoxide takes the oxygen from the ore in three steps; the iron melts below the middle and collects in the hearth.',
    coke: 'Coke turns the rising carbon dioxide into carbon monoxide, and what reaches the nozzles burns in the preheated air.',
    lime: 'Limestone decomposes to calcium oxide, which combines with silica to form the slag that floats on the iron.',
    air: 'Oxygen in the preheated air burns coke to carbon dioxide, and white-hot coke reduces that to the carbon monoxide that reduces the ore.',
  };
  const follow = F.choice(d.controls, {
    label: '\\text{follow}', aria: 'what is followed through the furnace', value: 'ore',
    options: [{ value: 'ore', label: 'iron ore' }, { value: 'coke', label: 'coke' }, { value: 'lime', label: 'limestone' }, { value: 'air', label: 'air' }],
    onInput: () => cy.reset(),
  });
  const cy = F.cycle(() => T, 1.2);
  const rnd = (k, j) => { const s = Math.sin(k * 127.1 + j * 311.7) * 43758.5453; return s - Math.floor(s); };
  /* the bed: lumps on a loose grid between the stock line and the nozzles, a kind and a shape each */
  const LUMPS = [];
  for (let r = 0; r < 23; r++) for (let c = 0; c < 6; c++) {
    const k = r * 6 + c, u = rnd(k, 1);
    LUMPS.push({ h0: FOOT + (r + 0.15 + 0.5 * rnd(k, 2)) * (SPAN / 23), f: ((c + (r % 2 ? 0.25 : 0.75) + 0.3 * (rnd(k, 3) - 0.5)) / 6) * 2 - 1,
      kind: u < 0.4 ? 'ore' : u < 0.8 ? 'coke' : 'lime', r: 9 + 3 * rnd(k, 4), rot: rnd(k, 5) * TAU, shape: Array.from({ length: 7 }, (_, j) => 0.74 + 0.34 * rnd(k, 10 + j)) });
  }
  function lump(ctx, x, y, r, L, fill, edge = alpha(PAL.ink, 0.65), w = 1.4) {
    ctx.save(); ctx.beginPath();
    L.shape.forEach((q, j) => { const a = L.rot + (j / 7) * TAU, px = x + Math.cos(a) * r * q, py = y + Math.sin(a) * r * q; if (j) ctx.lineTo(px, py); else ctx.moveTo(px, py); });
    ctx.closePath(); ctx.fillStyle = fill; ctx.fill(); ctx.strokeStyle = edge; ctx.lineWidth = w; ctx.lineJoin = 'round'; ctx.stroke(); ctx.restore();
  }
  const drop = (ctx, x, y, r, c) => { ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fillStyle = c; ctx.fill(); ctx.strokeStyle = alpha(PAL.ink, 0.5); ctx.lineWidth = 1; ctx.stroke(); ctx.restore(); };
  /* a lump's look at height h: what it is made of there */
  function look(kind, h) {
    if (kind === 'ore') return h > 50 ? { c: F.fact(ORE), name: h > 70 ? 'iron(III) oxide, Fe₂O₃' : h > 60 ? 'Fe₃O₄' : 'iron(II) oxide, FeO', f: h > 70 ? 'Fe₂O₃' : h > 60 ? 'Fe₃O₄' : 'FeO' }
      : h > 35 ? { c: F.fact(METAL), name: 'iron', f: 'Fe(s)' } : { c: F.fact(IRON), name: 'molten iron', f: 'Fe(l)', molten: true };
    if (kind === 'coke') return { c: F.fact(COKE), name: h > 20 ? 'coke, carbon' : 'coke, burning in the air', f: 'C', k: h > 45 ? 1 : lerp(0.3, 1, (h - FOOT) / (45 - FOOT)) };
    return h > 40 ? { c: F.fact(LIME), name: 'limestone, CaCO₃', f: 'CaCO₃' } : h > 30 ? { c: F.fact(LIME), name: 'calcium oxide, CaO', f: 'CaO' } : { c: F.fact(SLAG), name: 'molten slag, CaSiO₃', f: 'CaSiO₃(l)', molten: true };
  }
  /* a gas molecule: its atoms in a row */
  const MOL = { CO: ['C', 'O'], CO2: ['O', 'C', 'O'], O2: ['O', 'O'], N2: ['N', 'N'] };
  const MOLNAME = { CO: 'carbon monoxide, CO', CO2: 'carbon dioxide, CO₂', O2: 'oxygen, O₂', N2: 'nitrogen, N₂' };
  const MOLF = { CO: 'CO', CO2: 'CO₂', O2: 'O₂', N2: 'N₂' };
  function mol(ctx, x, y, kind, r = 5) {
    const a = MOL[kind], sp = r * 1.55;
    a.forEach((s, i) => { ctx.save(); ctx.beginPath(); ctx.arc(x + (i - (a.length - 1) / 2) * sp, y, r, 0, TAU); ctx.fillStyle = F.el(s); ctx.fill(); ctx.strokeStyle = alpha(PAL.ink, 0.6); ctx.lineWidth = 1; ctx.stroke(); ctx.restore(); });
  }
  /* the gas: in through a nozzle, up the shaft, out by the off-take; what a molecule is depends on how high it has risen */
  const GAS = Array.from({ length: 34 }, (_, i) => ({ s0: (i + 0.5 * rnd(i, 21)) / 34, f: 1.7 * rnd(i, 22) - 0.85, side: i % 2 ? 1 : -1, n2: i % 3 === 0, alt: i % 2 === 0 }));
  const TUY = 15, NOZ = (sgn) => CX + sgn * (half(TUY) - 8), BUS = (sgn) => CX + sgn * (half(TUY) + WALL + 62);
  function gasAt(g, s) {
    if (s < 0.1) { const q = s / 0.1; return { x: lerp(BUS(g.side), NOZ(g.side), q), y: yOf(TUY), h: TUY, pipe: true }; }
    if (s < 0.88) {
      const q = (s - 0.1) / 0.78, h = lerp(TUY, OFF, q), fx = lerp(g.side * 0.8, g.f, Math.min(1, q * 5)), fo = q > 0.85 ? lerp(fx, 0.9, (q - 0.85) / 0.15) : fx;
      return { x: CX + fo * (half(h) - 12), y: yOf(h) + (q > 0.85 ? 0 : 6 * Math.sin(q * 40 + g.f * 9)), h };
    }
    const q = (s - 0.88) / 0.12; return { x: lerp(CX + 0.9 * (half(OFF) - 12), PIPE_X + 20, q), y: yOf(OFF), h: OFF, pipe: true };
  }
  const gasKind = (g, h) => (g.n2 ? 'N2' : h < 19 ? 'O2' : h < 27 ? 'CO2' : h < 56 ? 'CO' : g.alt ? 'CO2' : 'CO');
  /* where the followed thing is at time k = t / T, and what it is there */
  const FX = -0.3;
  function followed(kind, k) {
    if (kind === 'air') {
      const g = { side: -1, f: 0.25, n2: false, alt: true }, p = gasAt(g, 0.02 + 0.96 * k);
      const m = p.h < 16.5 && k < 0.2 ? 'O2' : p.h < 24 ? 'CO2' : p.h < 54 ? 'CO' : 'CO2';
      return { x: p.x, y: p.y, h: p.h, mol: m, f: MOLF[m], name: MOLNAME[m], zone: zoneOf(p.h) };
    }
    const kin = 0.06, bed = (k - kin) * SPAN;
    let h, fall = false;
    const melt = kind === 'ore' ? 35 : kind === 'lime' ? 30 : -1, end = kind === 'ore' ? 3 : 7.5;
    if (k < kin) h = lerp(TOP + 1, STOCK, k / kin);
    else {
      h = STOCK - bed;
      if (h < melt) { const km = kin + (STOCK - melt) / SPAN; h = Math.max(end, lerp(melt, end, (k - km) / 0.16)); fall = true; }
    }
    h = Math.max(h, kind === 'coke' ? FOOT + 3 : end);
    const a = look(kind, h), x = CX + (k < kin ? lerp(-0.62, FX, k / kin) : FX) * (half(Math.min(h, TOP)) - 14);
    return { x, y: yOf(h), h, a, f: a.f, name: a.name, zone: zoneOf(h), fall, done: fall && h <= end + 0.01 };
  }
  const path = (ctx, pts, close) => { ctx.beginPath(); pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); if (close) ctx.closePath(); };
  const HS = Array.from({ length: TOP + 1 }, (_, h) => h);
  const inner = () => [...HS.map((h) => [CX - half(h), yOf(h)]), ...[...HS].reverse().map((h) => [CX + half(h), yOf(h)])];
  const wallPts = (sgn) => [...HS.map((h) => [CX + sgn * half(h), yOf(h)]), ...[...HS].reverse().map((h) => [CX + sgn * (half(h) + WALL), yOf(h)])];
  /* a pipe through the wall: ink walls round a bore */
  function pipe(ctx, x1, x2, y, bore, w, fill) {
    const l = Math.min(x1, x2), r = Math.max(x1, x2);
    ctx.save(); ctx.fillStyle = PAL.panel; ctx.fillRect(l, y - w / 2, r - l, w); if (fill) { ctx.fillStyle = fill; ctx.fillRect(l, y - w / 2, r - l, w); }
    ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(l, y - w / 2); ctx.lineTo(r, y - w / 2); ctx.moveTo(l, y + w / 2); ctx.lineTo(r, y + w / 2); ctx.stroke(); ctx.restore();
  }
  /* dashes that travel along a pipe the way its contents flow */
  function flow(ctx, x1, x2, y, off, a = 0.5) {
    ctx.save(); ctx.strokeStyle = alpha(PAL.ink, a); ctx.lineWidth = 2.5; ctx.lineCap = 'round'; ctx.setLineDash([10, 22]); ctx.lineDashOffset = -off;
    ctx.beginPath(); ctx.moveTo(x1, y); ctx.lineTo(x2, y); ctx.stroke(); ctx.restore();
  }
  let hits = []; F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c); hits = [];
    const t = cy.now(), kind = follow.value, cl = C('length'), ct = C('temperature');
    const fo = followed(kind, clamp01(t / T));

    /* the inside: the glow of the bed, cold at the top and white-hot at the nozzles; then the hearth */
    ctx.save(); path(ctx, inner(), true); ctx.clip();
    const g = ctx.createLinearGradient(0, yOf(TOP), 0, yOf(0));
    [[86, DULL, 0], [60, DULL, 0], [50, DULL, 0.14], [42, DULL, 0.3], [32, HOT, 0.36], [22, HOT, 0.46], [13, SLAG, 0.6], [9, SLAG, 0.6]].forEach(([h, c, a]) => g.addColorStop((TOP - h) / TOP, alpha(F.fact(c), a)));
    ctx.fillStyle = g; ctx.fillRect(CX - 200, yOf(TOP), 400, TOP * K);
    ctx.fillStyle = F.fact(IRON); ctx.fillRect(CX - 100, yOf(5), 200, 5 * K);
    ctx.fillStyle = F.fact(SLAG); ctx.fillRect(CX - 100, yOf(9), 200, 4 * K);
    line(ctx, CX - 100, yOf(5), CX + 100, yOf(5), alpha(PAL.ink, 0.45), 1.5);
    /* the zone the followed thing is in */
    if (fo.zone > 5) { ctx.fillStyle = alpha(PAL.ink, 0.07); ctx.fillRect(CX - 200, yOf(fo.zone + 5), 400, 10 * K); }

    /* the bed sinks */
    LUMPS.forEach((L, i) => {
      const h = STOCK - ((((STOCK - L.h0 + (SPAN * t) / T) % SPAN) + SPAN) % SPAN), a = look(L.kind, h), x = CX + L.f * (half(h) - 13), y = yOf(h);
      if (a.molten) { drop(ctx, x, y, L.kind === 'ore' ? 5 : 4.5, a.c); hits.push({ x, y, r: 8, name: 'a drop of ' + a.name }); return; }
      const r = L.r * (a.k ?? 1); if (r < 2) return;
      lump(ctx, x, y, r, L, a.c);
      hits.push({ x, y, r: r + 2, name: a.name });
    });
    ctx.restore();
    ctx.save(); path(ctx, inner(), true); ctx.clip();
    /* the gas rises, three times as fast */
    GAS.forEach((q) => {
      const p = gasAt(q, (q.s0 + (3 * t) / T) % 1); if (p.pipe) return;
      const m = gasKind(q, p.h); mol(ctx, p.x, p.y, m); hits.push({ x: p.x, y: p.y, r: 9, name: MOLNAME[m] });
    });
    ctx.restore();

    /* the walls: firebrick in courses, and the base */
    [-1, 1].forEach((sgn) => {
      const pts = wallPts(sgn);
      ctx.save(); path(ctx, pts, true); ctx.fillStyle = PAL.soft; ctx.fill(); ctx.clip();
      ctx.strokeStyle = alpha(PAL.ink, 0.22); ctx.lineWidth = 1.2; ctx.beginPath();
      for (let j = 0, y = yOf(TOP); y < YB; j++, y += 15) {
        ctx.moveTo(CX - 220, y); ctx.lineTo(CX + 220, y);
        const h = (YB - y - 7) / K, xw = CX + sgn * (half(h) + (j % 2 ? 10 : 20)); ctx.moveTo(xw, y); ctx.lineTo(xw, y + 15);
      }
      ctx.stroke(); ctx.restore();
      ctx.save(); path(ctx, pts, true); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2.5; ctx.lineJoin = 'round'; ctx.stroke(); ctx.restore();
    });
    ctx.save(); ctx.fillStyle = PAL.soft; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2.5; ctx.fillRect(CX - 130, YB, 260, 26); ctx.strokeRect(CX - 130, YB, 260, 26); ctx.restore();
    hits.push({ x: CX - half(55) - WALL / 2, y: yOf(55), r: 18, name: 'the furnace wall, lined with firebrick' }, { x: CX + half(55) + WALL / 2, y: yOf(55), r: 18, name: 'the furnace wall, lined with firebrick' });

    /* the hopper and its bell, through which the charge is let in */
    [[-34, 90.4, 'ore'], [-14, 88.6, 'coke'], [10, 88.4, 'lime'], [32, 90.2, 'ore'], [-52, 92.6, 'coke'], [52, 92.6, 'lime'], [-10, 91.4, 'ore'], [14, 91.2, 'coke']].forEach(([dx, h, k2], i) => lump(ctx, CX + dx, yOf(h), 10, LUMPS[i * 7], look(k2, 80).c));
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    [-1, 1].forEach((sgn) => { path(ctx, [[CX + sgn * (84 + WALL - 3), yOf(TOP)], [CX + sgn * (84 + WALL - 3), yOf(96)], [CX + sgn * 34, yOf(87)]]); ctx.stroke(); });
    path(ctx, [[CX - 46, yOf(81)], [CX, yOf(86)], [CX + 46, yOf(81)]], true); ctx.fillStyle = PAL.soft; ctx.fill(); ctx.lineWidth = 3; ctx.stroke();
    ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(CX, yOf(86)); ctx.lineTo(CX, yOf(95.5)); ctx.stroke(); ctx.restore();
    hits.push({ x: CX, y: yOf(83), r: 22, name: 'the bell, lowered to let the charge fall in' }, { x: CX - 90, y: yOf(90), r: 18, name: 'the hopper' }, { x: CX + 90, y: yOf(90), r: 18, name: 'the hopper' });

    /* the pipes: the off-take, the two nozzles with their air main, the slag notch and the iron notch */
    const off = t * 60;
    pipe(ctx, CX + half(OFF) - 2, PIPE_X, yOf(OFF), 0, 30);
    GAS.forEach((q) => { const p = gasAt(q, (q.s0 + (3 * t) / T) % 1); if (p.pipe && p.h === OFF && p.x < PIPE_X - 12) mol(ctx, p.x, p.y, gasKind(q, 81)); });
    arrow(ctx, PIPE_X + 8, yOf(OFF), PIPE_X + 44, yOf(OFF), PAL.ink, 3);
    [-1, 1].forEach((sgn) => {
      pipe(ctx, NOZ(sgn), BUS(sgn), yOf(TUY), 0, 18);
      ctx.save(); ctx.beginPath(); ctx.arc(BUS(sgn) + sgn * 20, yOf(TUY), 22, 0, TAU); ctx.fillStyle = PAL.panel; ctx.fill(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2.5; ctx.stroke(); ctx.restore();
      GAS.forEach((q) => { const p = gasAt(q, (q.s0 + (3 * t) / T) % 1); if (p.pipe && p.h === TUY && q.side === sgn) mol(ctx, p.x, p.y, q.n2 ? 'N2' : 'O2'); });
      hits.push({ x: (NOZ(sgn) + BUS(sgn)) / 2, y: yOf(TUY), r: 16, name: 'a nozzle that blows preheated air into the furnace' }, { x: BUS(sgn) + sgn * 20, y: yOf(TUY), r: 22, name: 'the main that carries preheated air round the furnace' });
    });
    const SL = CX - half(7) - WALL - 120, IR = PIPE_X;
    pipe(ctx, CX - half(7) + 2, SL, yOf(7), 0, 18, F.fact(SLAG)); flow(ctx, CX - half(7), SL, yOf(7), off);
    pipe(ctx, CX + half(2.5) - 2, IR, yOf(2.5), 0, 20, F.fact(IRON)); flow(ctx, CX + half(2.5), IR, yOf(2.5), off);
    arrow(ctx, SL - 8, yOf(7), SL - 44, yOf(7), PAL.ink, 3); arrow(ctx, IR + 8, yOf(2.5), IR + 44, yOf(2.5), PAL.ink, 3);
    hits.push({ x: CX, y: yOf(2.5), r: 30, name: 'molten iron' }, { x: CX + 40, y: yOf(7), r: 16, name: 'molten slag, floating on the iron' },
      { x: (CX + half(OFF) + PIPE_X) / 2, y: yOf(OFF), r: 18, name: 'the off-take for the gases' });

    /* names of what goes in and what comes out */
    text(ctx, 'roasted ore, coke,', CX - 150, yOf(94), PAL.ink, { size: 20, align: 'right' });
    text(ctx, 'limestone', CX - 150, yOf(94) + 25, PAL.ink, { size: 20, align: 'right' });
    line(ctx, CX - 142, yOf(93), CX - 60, yOf(92.4), alpha(PAL.ink, 0.6), 1.5);
    text(ctx, 'CO, CO₂, N₂', PIPE_X + 54, yOf(OFF), PAL.ink, { size: 20 });
    text(ctx, 'preheated air', BUS(-1) - 20, yOf(TUY) - 40, PAL.ink, { size: 20, align: 'center' });
    text(ctx, 'slag', SL - 54, yOf(7), PAL.ink, { size: 20, align: 'right' });
    text(ctx, 'molten iron', IR + 54, yOf(2.5), PAL.ink, { size: 20 });

    /* the followed thing, ringed, wearing its formula */
    if (fo.mol) mol(ctx, fo.x, fo.y, fo.mol, 8);
    else if (!fo.done) { if (fo.a.molten) drop(ctx, fo.x, fo.y, 8, fo.a.c); else lump(ctx, fo.x, fo.y, 14 * (fo.a.k ?? 1), LUMPS[3], fo.a.c, PAL.ink, 2); }
    ctx.save(); ctx.beginPath(); ctx.arc(fo.x, fo.y, 23, 0, TAU); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.stroke(); ctx.restore();
    const lw = F.measure(ctx, fo.f, { size: 21, weight: 600 }), right = fo.x + 32 + lw < CX + half(Math.min(fo.h, TOP)) + WALL + 30 || fo.x > PIPE_X - 60;
    text(ctx, fo.f, right ? fo.x + 31 : fo.x - 31, fo.y, PAL.ink, { size: 21, weight: 600, align: right ? 'left' : 'right', bg: PAL.panel });
    hits.push({ x: fo.x, y: fo.y, r: 24, name: fo.name });

    /* the zones as the book lists them, each at its height; the followed thing's zone lit */
    const XH = 770, XT = 895, XR = 926;
    text(ctx, 'height', XH, yOf(TOP) + 6, PAL.muted, { size: 17, align: 'right' });
    text(ctx, 'temperature', XT, yOf(TOP) + 6, PAL.muted, { size: 17, align: 'right' });
    text(ctx, 'reactions', XR, yOf(TOP) + 6, PAL.muted, { size: 17 });
    ZONES.forEach(([h, Tc]) => {
      const y = yOf(h), on = h === fo.zone, f = on ? 1 : 0.62, wt = on ? 600 : 400;
      if (on) { ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.08); ctx.fillRect(XH - 86, y - 26, 1386 - (XH - 86), 52); ctx.restore(); }
      const x0 = h === 15 ? BUS(1) + 50 : h === 5 ? CX + half(5) + WALL + 6 : CX + half(h) + WALL + 6;
      line(ctx, x0, y, XH - 96, y, on ? alpha(PAL.ink, 0.7) : PAL.rule, on ? 2 : 1.5, [4, 6]);
      text(ctx, h + ' ft', XH, y, alpha(cl, f), { size: 20, weight: wt, align: 'right' });
      text(ctx, Tc + ' °C', XT, y, alpha(ct, f), { size: 20, weight: wt, align: 'right' });
      text(ctx, ZR[h] ?? 'molten iron and slag collect', XR, y, on ? PAL.ink : PAL.muted, { size: 20, weight: ZR[h] ? wt : 400 });
    });

    /* the key */
    const lk = (k2) => (c, x, y) => lump(c, x, y, 10, LUMPS[5], look(k2, k2 === 'iron' ? 0 : 80).c);
    F.legend(ctx, { l: 30, r: 1370, t: 928, b: 988 }, [
      { s: 'iron ore', draw: lk('ore') }, { s: 'iron', draw: (c, x, y) => lump(c, x, y, 10, LUMPS[5], F.fact(METAL)) }, { s: 'coke', draw: lk('coke') }, { s: 'limestone', draw: lk('lime') },
      ...['O2', 'CO2', 'CO', 'N2'].map((m) => ({ s: MOLF[m], draw: (c, x, y) => mol(c, x, y, m, 5.5) })),
    ], { corner: 'top', row: true, panel: false, size: 18 });
    topline(ctx, HEAD[kind]);
    tex(d.readout, tx(R[kind][fo.zone]), false, { values: false });
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();

/* =====================================================================
   FIGURE 19.10: resistance against temperature for a superconductor.
   The book's graph, 0 to 300 K, resistance without a scale, for the
   chosen one of the note's three materials; under it, on the same
   temperature axis, a bar for each material over the temperatures at
   which it superconducts (below 23 K, 92 K, 110 K). The two coolants the
   note compares, liquid helium at 4 K and liquid nitrogen at 77 K, are
   lines through both, so it is seen at once which materials nitrogen is
   cold enough for. The temperature slider settles on each coolant and
   carries a circle at each transition. Still.
===================================================================== */
(function () {
  const d = sim('sim-superconductor', 670);
  const MAT = {
    nb: { Tc: 23, name: 'NbTi and Nb_{3}Sn', row: 'NbTi, Nb₃Sn', hover: 'NbTi and Nb₃Sn', plural: true },
    ybco: { Tc: 92, name: 'YBa_{2}Cu_{3}O_{7}', row: 'YBa₂Cu₃O₇', hover: 'YBa₂Cu₃O₇' },
    bscco: { Tc: 110, name: 'a bismuth-strontium-copper oxide', row: 'Bi–Sr–Cu oxide', hover: 'a bismuth-strontium-copper oxide' },
  };
  const KEYS = Object.keys(MAT);
  const mat = F.choice(d.controls, {
    label: '\\text{material}', aria: 'the superconducting material', value: 'ybco',
    options: KEYS.map((k) => ({ value: k, label: MAT[k].row })),
  });
  const Tk = F.ctl(d.controls, {
    label: '\\kT', cls: 'temperature', min: 0, max: 300, step: 1, value: 77, unit: 'K', dec: 0,
    detents: [{ v: 4, label: 'He' }, { v: 77, label: 'N₂' }],
    specials: KEYS.map((k) => ({ at: MAT[k].Tc, label: MAT[k].hover + ' superconducts below' })),
  });
  /* the book's shape: zero below the transition, a jump to five sixths of the axis, then a slow rise */
  const R = (Tc) => (T) => (T < Tc ? 0 : 0.8 + (0.15 * (T - Tc)) / (300 - Tc));
  const box = { l: 230, r: 1310, t: 170, b: 380 };
  const ROW0 = 506, RSTEP = 50, BAR = 24, rowY = (i) => ROW0 + i * RSTEP;
  const X = (v) => box.l + (v / 300) * (box.r - box.l);
  let hits = []; F.hover(d.stage, () => hits);
  /* a tap on a material's row chooses it */
  d.c.style.cursor = 'pointer';
  d.c.addEventListener('click', (ev) => {
    const r = d.c.getBoundingClientRect(); if (!r.width) return;
    const s = 1400 / r.width, py = (ev.clientY - r.top) * s, i = Math.round((py - ROW0) / RSTEP);
    if (i >= 0 && i < 3 && Math.abs(py - rowY(i)) < RSTEP / 2 && KEYS[i] !== mat.value) mat.drive(KEYS[i]);
  });
  function draw() {
    const { ctx } = begin(d.c);
    const m = MAT[mat.value], T = Tk.v, Tc = m.Tc, below = T < Tc;
    const ct = C('temperature');
    hits = [];
    /* axes fixed at 0 to 300 K, as the book draws them; resistance has no scale */
    const ax = F.axes(ctx, box, [0, 300], [0, 1], { nx: 6, ny: 1, fy: (v) => (v === 0 ? '0' : ''), xl: 'T (K)', xc: ct });
    const Y = ax.Y;
    text(ctx, 'resistance', box.l - 14, box.t + 10, PAL.ink, { size: 20, weight: 600, align: 'right' });
    /* the two coolants, through the graph and the rows */
    [[4, 'liquid helium', '4 K', 'left'], [77, 'liquid nitrogen', '77 K', 'left']].forEach(([v, n, b]) => {
      line(ctx, X(v), box.t - 8, X(v), rowY(2) + BAR, alpha(PAL.ink, 0.45), 2, [10, 10]);
      F.rich(ctx, [[n + ' boils at ', PAL.ink, 400], [b, ct, 600]], X(v) + 4, box.t - 24, { size: 18 });
      hits.push({ x: X(v), y: (box.t + rowY(2)) / 2, r: 10, name: `${n} boils at ${b}` });
    });
    mat.curve(ctx, (v) => R(MAT[v].Tc), 0, 300, X, Y, PAL.ink, 4, 1200);
    /* each material's bar: the temperatures at which it has no resistance */
    text(ctx, 'superconducting, no resistance', X(82), ROW0 - 38, PAL.muted, { size: 17 });
    KEYS.forEach((k, i) => {
      const q = MAT[k], y = rowY(i), sel = mat.mix((v) => (v === k ? 1 : 0)), on = T < q.Tc;
      line(ctx, X(0), y, box.r, y, PAL.rule, 2);
      ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.3 + 0.5 * sel); ctx.fillRect(X(0), y - BAR / 2, X(q.Tc) - X(0), BAR); ctx.restore();
      text(ctx, q.row, box.l - 14, y, PAL.ink, { size: 19, weight: k === mat.value ? 600 : 400, align: 'right' });
      F.rich(ctx, [['below ', PAL.ink, 400], [q.Tc + ' K', ct, 600]], X(q.Tc) + 12, y, { size: 18, bg: PAL.panel });
      dot(ctx, X(T), y, PAL.ink, on, 8);
      hits.push({ x: X(q.Tc) / 2 + X(0) / 2, y, r: 14, name: `${q.hover}: superconducting below ${q.Tc} K` },
        { x: X(T), y, r: 12, name: `${q.hover} at ${T} K: ${on ? 'no resistance' : 'an ordinary conductor'}` });
    });
    /* the temperature set, on the curve and across the rows */
    const r = R(Tc)(T);
    line(ctx, X(T), Y(r), X(T), rowY(2) + BAR, alpha(ct, 0.7), 2, [4, 8]);
    dot(ctx, X(T), Y(r), PAL.ink, true, 9);
    const name = m.name, pl = m.plural, coolant = { 4: 'liquid helium', 77: 'liquid nitrogen' }[T];
    topline(ctx, coolant && below ? `Cooled by ${coolant} to ${T} K, $\\text{${name.replace(/_\{(\d)\}/g, '}_{$1}\\text{')}}$ ${pl ? 'conduct' : 'conducts'} with no resistance.`
      : coolant ? `Cooled by ${coolant} to ${T} K, $\\text{${name.replace(/_\{(\d)\}/g, '}_{$1}\\text{')}}$ still ${pl ? 'have' : 'has'} resistance.`
      : below ? `At ${T} K, $\\text{${name.replace(/_\{(\d)\}/g, '}_{$1}\\text{')}}$ ${pl ? 'conduct' : 'conducts'} with no resistance.`
      : `At ${T} K, $\\text{${name.replace(/_\{(\d)\}/g, '}_{$1}\\text{')}}$ ${pl ? 'have' : 'has'} resistance.`);
    tex(d.readout, `\\text{resistance} ${below ? '= 0' : '> 0'}\\ \\text{at}\\ \\kT = ${T}\\ \\text{K} ${below ? '<' : '\\geq'} ${kv('temperature', Tc + '\\ \\text{K}')}`);
  }
  register(d.fig, { update: () => {}, draw });
})();
};
