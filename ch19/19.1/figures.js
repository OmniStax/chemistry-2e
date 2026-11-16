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
  const d = sim('sim-transition-series', 1030);
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
      text(ctx, 'outer electrons', x0 - 16, BASE - top * u - 12, PAL.muted, { size: 17, align: 'left' });
      text(ctx, `[${S.core}]`, x0 - 16, BASE + 88, PAL.ink, { size: 19, align: 'right' });
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
        text(ctx, tx(c), cx, BASE + 88, PAL.ink, { size: n > 9 ? (c.length > 2 ? 14 : 17) : 19, align: 'center', tex: true });
        if (key === v) hits.push({ x: cx, y: BASE - ((nf + ns) * u) / 2, r: 26, name: `${NAME[Z - 1]}: ${nf} ${S.fill} and ${ns} ${S.side} ${nf + ns === 1 ? 'electron' : 'electrons'}` },
          { x: cx, y: BASE + 40, r: 30, name: `${NAME[Z - 1]}, Z = ${Z}, ${cfgOf[Z]}${DUAL[Z] ?? ''}` });
      });
      const sw = (solid) => (c2, x, y) => { c2.save(); c2.fillStyle = solid ? alpha(PAL.ink, 0.72) : PAL.panel; c2.fillRect(x - 15, y - 6, 30, 12); c2.strokeStyle = PAL.ink; c2.lineWidth = 1.5; c2.strokeRect(x - 15, y - 6, 30, 12); c2.restore(); };
      F.legend(ctx, { l: 760, r: x0 + n * P - 4, t: BASE - top * u - 30, b: BASE - top * u + 6 },
        [{ s: `an electron in $${S.fill[0]}${S.fill[1]}$`, draw: sw(true) }, { s: `an electron in $${S.side[0]}${S.side[1]}$`, draw: sw(false) }], { corner: 'top', row: true, panel: false, size: 17 });
    }, [0, 10]));
    topline(ctx, SERIES[v].head);
    tex(d.readout, SERIES[v].ro);
  }
  register(d.fig, { update: () => {}, draw });
})();
/* =====================================================================
   FIGURE 19.4: the oxidation states of the first transition series.
   The book's chart, the chosen metal's column lit; beside it the atom's
   4s and 3d boxes above the ion's in its highest state, the electrons
   that state removes (the 4s first) left as faint numbered ghosts. Still.
===================================================================== */
(function () {
  const d = sim('sim-oxidation-states', 560);
  /* symbol, name, Z, 4s and 3d electrons of the atom, the states the book's chart prints */
  const M = [
    ['Sc', 'Scandium', 21, 2, 1, [3]], ['Ti', 'Titanium', 22, 2, 2, [3, 4]], ['V', 'Vanadium', 23, 2, 3, [2, 3, 4, 5]],
    ['Cr', 'Chromium', 24, 1, 5, [2, 3, 4, 6]], ['Mn', 'Manganese', 25, 2, 5, [2, 3, 4, 6, 7]], ['Fe', 'Iron', 26, 2, 6, [2, 3, 6]],
    ['Co', 'Cobalt', 27, 2, 7, [2, 3]], ['Ni', 'Nickel', 28, 2, 8, [2, 3]], ['Cu', 'Copper', 29, 1, 10, [1, 2, 3]], ['Zn', 'Zinc', 30, 2, 10, [2]],
  ].map(([sym, name, Z, s, dd, states]) => ({ sym, name, Z, s, d: dd, states, top: Math.max(...states) }));
  const pick = F.choice(d.controls, {
    label: '\\text{metal}', aria: 'the metal of the first transition series', value: 'Ti',
    options: M.map((m) => ({ value: m.sym, label: m.sym })),
  });
  const of = (v) => M.find((m) => m.sym === v);
  /* the chart */
  const GX = 50, GW = 62, GY = 150, RH = 49;
  /* the orbital boxes: the atom's row above the ion's */
  const SX = 840, DX = 960, BW = 76, BH = 70, Y1 = 220, Y2 = 420;
  /* every electron of the atom: where it sits and the order it leaves in (4s first, then 3d from the last one placed) */
  function electrons(m) {
    const out = [];
    for (let i = 0; i < m.s; i++) out.push({ x: SX + (m.s === 1 ? 0.5 : i === 0 ? 0.36 : 0.64) * BW, up: i === 0, sub: 's', i });
    for (let i = 0; i < m.d; i++) {
      const box = i < 5 ? i : i - 5, up = i < 5, two = m.d > 5 && box < m.d - 5;
      out.push({ x: DX + box * BW + (two ? (up ? 0.36 : 0.64) : 0.5) * BW, up, sub: 'd', i });
    }
    const sOut = out.filter((e) => e.sub === 's').reverse(), dOut = out.filter((e) => e.sub === 'd').reverse();
    [...sOut, ...dOut].forEach((e, n) => { e.order = n + 1; e.lost = n + 1 <= m.top; });
    return out;
  }
  const ORD = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh'];
  const cfg = (s, dd) => (dd ? `3d^{${dd}}` : '') + (s ? `4s^{${s}}` : '');
  const boxes = (ctx, y) => {
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2;
    ctx.strokeRect(SX, y - BH / 2, BW, BH);
    for (let b = 0; b < 5; b++) ctx.strokeRect(DX + b * BW, y - BH / 2, BW, BH);
    ctx.restore();
    text(ctx, '[Ar]', SX - 18, y, PAL.ink, { size: 22, align: 'right' });
  };
  let hits = []; F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c);
    const m = of(pick.value);
    hits = [];
    /* the chart, as the book prints it */
    const gx = pick.mix((v) => GX + M.indexOf(of(v)) * GW);
    ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.12); ctx.fillRect(gx + 2, GY - 54, GW - 4, 7 * RH + 58); ctx.restore();
    M.forEach((q, c) => {
      const x = GX + c * GW + GW / 2, sel = q.sym === m.sym;
      text(ctx, q.sym, x + 6, GY - 22, PAL.ink, { size: 22, weight: sel ? 600 : 400, align: 'center' });
      text(ctx, String(q.Z), x + 4 - F.measure(ctx, q.sym, { size: 22 }) / 2, GY - 34, PAL.muted, { size: 13, align: 'right' });
      for (let n = 1; n <= 7; n++) {
        const y = GY + (n - 1) * RH + RH / 2;
        if (q.states.includes(n)) {
          text(ctx, n + '+', x, y, PAL.ink, { size: 19, weight: sel ? 600 : 400, align: 'center' });
          hits.push({ x, y, r: 18, name: q.name + ' in the ' + n + '+ oxidation state' });
        }
      }
    });
    ctx.save(); ctx.strokeStyle = PAL.rule; ctx.lineWidth = 1.5;
    for (let n = 0; n <= 7; n++) { ctx.beginPath(); ctx.moveTo(GX, GY + n * RH); ctx.lineTo(GX + 10 * GW, GY + n * RH); ctx.stroke(); }
    ctx.restore();
    /* the atom above, the ion in its highest state below */
    boxes(ctx, Y1); boxes(ctx, Y2);
    text(ctx, '4s', SX + BW / 2, Y1 - BH / 2 - 20, PAL.ink, { size: 22, align: 'center' });
    text(ctx, '3d', DX + 2.5 * BW, Y1 - BH / 2 - 20, PAL.ink, { size: 22, align: 'center' });
    M.forEach((q) => pick.only(ctx, q.sym, () => {
      text(ctx, q.sym, SX - 84, Y1, PAL.ink, { size: 24, weight: 600, align: 'right' });
      text(ctx, q.sym + '^{' + q.top + '+}', SX - 84, Y2, PAL.ink, { size: 24, weight: 600, align: 'right' });
      electrons(q).forEach((e) => {
        spin(ctx, e.x, Y1, e.up, BH - 22, PAL.ink, 3.5);
        if (e.lost) {
          spin(ctx, e.x, Y2, e.up, BH - 22, alpha(PAL.ink, 0.22), 2.5);
          text(ctx, String(e.order), e.x, Y2 + BH / 2 + 18, PAL.muted, { size: 17, align: 'center' });
        } else spin(ctx, e.x, Y2, e.up, BH - 22, PAL.ink, 3.5);
      });
      const n = q.top;
      arrow(ctx, SX - 110, Y1 + BH / 2 + 14, SX - 110, Y2 - BH / 2 - 14, PAL.ink, 3);
      text(ctx, '− ' + n + 'e⁻', SX - 122, (Y1 + Y2) / 2, PAL.ink, { size: 22, align: 'right' });
    }, [0, 0]));
    electrons(m).forEach((e) => {
      const what = 'a ' + (e.sub === 's' ? '4s' : '3d') + ' electron, spin ' + (e.up ? 'up' : 'down');
      hits.push({ x: e.x, y: Y1, r: 16, name: m.sym + ' atom: ' + what });
      hits.push({ x: e.x, y: Y2, r: 16, name: e.lost ? 'removed ' + ORD[e.order - 1] + ' to form ' + m.sym + m.top + '+: ' + what : m.sym + m.top + '+: ' + what + ', kept' });
    });
    F.legend(ctx, { l: SX - 40, r: 1350, t: Y2 + BH / 2 + 34, b: 556 }, [
      { s: 'electron', draw: (c, x, y) => spin(c, x, y, true, 22, PAL.ink, 3) },
      { s: 'removed, in the order shown', draw: (c, x, y) => spin(c, x, y, true, 22, alpha(PAL.ink, 0.22), 2.5) },
    ], { corner: 'top', row: true, panel: false, size: 18 });
    const n = m.s + m.d, all = m.top >= n;
    topline(ctx, all
      ? `${m.name} loses all ${WORD[n]} of its $4s$ and $3d$ electrons in its highest oxidation state, ${m.top}+.`
      : `In its highest oxidation state, ${m.top}+, ${m.name.toLowerCase()} loses only ${WORD[m.top]} of its ${WORD[n]} $4s$ and $3d$ electrons.`);
    const sl = Math.max(0, m.s - m.top), dl = m.d - Math.max(0, m.top - m.s);
    tex(d.readout, `\\text{${m.sym}}\\ ([\\text{Ar}]\\,${cfg(m.s, m.d)}) \\longrightarrow \\text{${m.sym}}^{${m.top}+}\\ ([\\text{Ar}]${sl || dl ? '\\,' + cfg(sl, dl) : ''}) + ${m.top}e^{-}`);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 19.6: the blast furnace. Moving on a 6 s clock: the followed
   lump sinks from the stock line at 80 ft to the hearth, the whole
   charge with it; carbon monoxide rises three times as fast from the
   tuyeres to the off-take; preheated air, the gases, the slag and the
   molten iron flow in and out along their pipes. Flat cutaway.
===================================================================== */
(function () {
  const H = 870, d = sim('sim-blast-furnace', H);
  const IRON = '#ff8c1a';                         /* the glow of molten iron */
  const SLAG = '#ffd24d';                         /* the glow of molten slag */
  const T = 6;
  const CX = 340, K = 6.4, YB = 770;
  const yOf = (h) => YB - h * K;
  /* the inner half-width of the furnace at height h ft: hearth, bosh, belly, stack and throat */
  const half = (h) => (h <= 10 ? 112 : h <= 25 ? 112 + ((h - 10) / 15) * 46 : h <= 35 ? 158 : h <= 84 ? 158 - ((h - 35) / 49) * 58 : 100);
  const ZONES = [[75, 230], [65, 410], [55, 525], [45, 865], [35, 945], [25, 1125], [15, 1300], [5, 1510]];
  const R = {
    ore: { 75: '3Fe_2O_3 + CO -> 2Fe_3O_4 + CO_2', 65: 'Fe_3O_4 + CO -> 3FeO + CO_2', 55: 'FeO + CO -> Fe + CO_2', 45: 'Fe(s)', 35: 'Fe(s)', 25: 'Fe(l)', 15: 'Fe(l)', 5: 'Fe(l)' },
    coke: { 75: 'C(s)', 65: 'C(s)', 55: 'C(s)', 45: 'C + CO_2 -> 2CO', 35: 'C + CO_2 -> 2CO', 25: 'C + CO_2 -> 2CO', 15: 'C + O_2 -> CO_2', 5: 'C + O_2 -> CO_2' },
    lime: { 75: 'CaCO_3(s)', 65: 'CaCO_3(s)', 55: 'CaCO_3(s)', 45: 'CaCO_3(s)', 35: 'CaCO_3 -> CaO + CO_2', 25: 'CaO + SiO_2 -> CaSiO_3', 15: 'CaSiO_3(l)', 5: 'CaSiO_3(l)' },
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
    ore: 'Carbon monoxide rising from below reduces a lump of iron ore to iron, which melts and collects at the bottom.',
    coke: 'A lump of coke turns rising carbon dioxide into carbon monoxide and burns in the preheated air near the bottom.',
    lime: 'A lump of limestone decomposes to calcium oxide, which combines with silica to form the slag that floats on the iron.',
  };
  const follow = F.choice(d.controls, {
    label: '\\text{follow}', aria: 'the lump followed down the furnace', value: 'ore',
    options: [{ value: 'ore', label: 'iron ore' }, { value: 'coke', label: 'coke' }, { value: 'lime', label: 'limestone' }],
    onInput: () => cy.reset(),
  });
  const cy = F.cycle(() => T, 1.2);
  let seed = 1906; const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  /* the charge: lumps in a loose packing of the shaft between 5 and 80 ft, a kind each */
  const LUMPS = [];
  for (let r = 0; r < 15; r++) for (let c = 0; c < 6; c++) {
    const u = rnd(); LUMPS.push({ h0: 5 + r * 5 + rnd() * 4, f: (c + 0.2 + 0.6 * rnd()) / 6, kind: u < 0.45 ? 'ore' : u < 0.8 ? 'coke' : 'lime' });
  }
  /* the gas: molecules strung along the path from the tuyeres up the shaft and out of the off-take */
  const GAS = Array.from({ length: 26 }, (_, i) => ({ s0: i / 26 + rnd() * 0.02, f: 0.15 + 0.7 * rnd() }));
  const OFF = 83, PIPE_X = 620;
  function gasAt(g, t) {
    const s = (g.s0 + (3 * t) / T) % 1, up = 0.82;
    if (s < up) { const h = 14 + (s / up) * (OFF - 14), w = half(h); return { x: CX - w + g.f * 2 * w, y: yOf(h), h }; }
    const q = (s - up) / (1 - up), x0 = CX - half(OFF) + g.f * 2 * half(OFF);
    return { x: x0 + q * (PIPE_X - x0), y: yOf(OFF) + (1 - q) * 0, h: OFF };
  }
  /* a lump's look at height h: oxide or solid, shrinking coke, molten drop */
  function look(kind, h) {
    if (kind === 'ore') return h > 50 ? { c: F.el('Fe'), r: 9 } : h > 28 ? { c: F.el('Fe'), r: 8 } : { c: F.fact(IRON), r: 6, molten: true };
    if (kind === 'coke') return h > 45 ? { c: F.el('C'), r: 9 } : h > 15 ? { c: F.el('C'), r: 6 + (3 * (h - 15)) / 30 } : { c: F.el('C'), r: Math.max(0, (6 * (h - 9)) / 6) };
    return h > 35 ? { c: F.el('Ca'), r: 8 } : h > 25 ? { c: F.el('Ca'), r: 7 } : { c: F.fact(SLAG), r: 5, molten: true };
  }
  const NAMES = {
    ore: (h) => (h > 70 ? 'iron(III) oxide, Fe₂O₃' : h > 60 ? 'Fe₃O₄' : h > 50 ? 'iron(II) oxide, FeO' : h > 28 ? 'iron' : 'molten iron'),
    coke: (h) => (h > 15 ? 'coke, carbon' : 'coke, burning'),
    lime: (h) => (h > 40 ? 'limestone, CaCO₃' : h > 30 ? 'calcium oxide, CaO' : 'molten slag, CaSiO₃'),
  };
  /* a pipe or opening along which something flows: a dashed band whose dashes travel, and an arrowhead */
  function flow(ctx, x1, y1, x2, y2, color, t) {
    ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = 4; ctx.setLineDash([14, 10]); ctx.lineDashOffset = -t * 40;
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); ctx.restore();
    const L = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / L, uy = (y2 - y1) / L;
    arrow(ctx, x2 - ux * 18, y2 - uy * 18, x2, y2, color, 4);
  }
  let hits = []; F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c); hits = [];
    const t = cy.now(), kind = follow.value;
    /* the walls: refractory lining round the inner profile */
    const prof = []; for (let h = 0; h <= 90; h += 1) prof.push(h);
    const wall = (sgn) => {
      ctx.beginPath();
      prof.forEach((h, i) => { const x = CX + sgn * half(h); if (i) ctx.lineTo(x, yOf(h)); else ctx.moveTo(x, yOf(h)); });
      [...prof].reverse().forEach((h) => ctx.lineTo(CX + sgn * (half(h) + 34), yOf(h)));
      ctx.closePath(); ctx.fillStyle = PAL.soft; ctx.fill(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2; ctx.stroke();
    };
    ctx.save(); wall(-1); wall(1); ctx.restore();
    ctx.save(); ctx.fillStyle = PAL.soft; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2; ctx.fillRect(CX - 170, YB, 340, 18); ctx.strokeRect(CX - 170, YB, 340, 18); ctx.restore();
    hits.push({ x: CX - half(50) - 17, y: yOf(50), r: 20, name: 'the furnace wall, lined with refractory brick' });
    /* the hearth: molten iron under the slag */
    const pool = (h0, h1, c) => { ctx.save(); ctx.fillStyle = c; ctx.fillRect(CX - half(0), yOf(h1), 2 * half(0), yOf(h0) - yOf(h1)); ctx.restore(); };
    pool(0, 5, F.fact(IRON)); pool(5, 9, F.fact(SLAG));
    hits.push({ x: CX, y: yOf(2.5), r: 30, name: 'molten iron' }, { x: CX + 60, y: yOf(7), r: 22, name: 'molten slag, floating on the iron' });
    /* the pipes: off-take, tuyeres, slag notch and iron notch */
    const pipe = (x1, x2, h, w) => { ctx.save(); ctx.fillStyle = PAL.panel; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2; ctx.fillRect(Math.min(x1, x2), yOf(h) - w / 2, Math.abs(x2 - x1), w); ctx.strokeRect(Math.min(x1, x2), yOf(h) - w / 2, Math.abs(x2 - x1), w); ctx.restore(); };
    pipe(CX + half(OFF), PIPE_X, OFF, 30);
    pipe(CX - half(15) - 34, CX - half(15) - 120, 15, 20); pipe(CX + half(15) + 34, CX + half(15) + 120, 15, 20);
    pipe(CX - half(7) - 34, 120, 7, 18); pipe(CX + half(2.5) + 34, PIPE_X, 2.5, 18);
    hits.push({ x: CX - half(15) - 80, y: yOf(15), r: 18, name: 'a tuyere, the nozzle that blows in preheated air' }, { x: CX + half(15) + 80, y: yOf(15), r: 18, name: 'a tuyere, the nozzle that blows in preheated air' });
    /* the flows in and out */
    flow(ctx, CX - half(15) - 200, yOf(15), CX - half(15) - 4, yOf(15), PAL.muted, t);
    flow(ctx, CX + half(15) + 200, yOf(15), CX + half(15) + 4, yOf(15), PAL.muted, t);
    flow(ctx, CX + half(OFF) + 20, yOf(OFF), PIPE_X + 40, yOf(OFF), PAL.muted, t);
    flow(ctx, CX - half(7) - 20, yOf(7), 100, yOf(7), PAL.muted, t);
    flow(ctx, CX + half(2.5) + 20, yOf(2.5), PIPE_X + 40, yOf(2.5), PAL.muted, t);
    flow(ctx, CX, yOf(104), CX, yOf(88), PAL.muted, t);
    /* the charge */
    const v = 75 / T;
    LUMPS.forEach((L) => {
      const h = 5 + ((((L.h0 - 5 - v * t) % 75) + 75) % 75), w = half(h) - 12, a = look(L.kind, h);
      if (!(a.r > 0.5)) return;
      const x = CX - w + L.f * 2 * w, y = yOf(h);
      ctx.save(); ctx.beginPath(); ctx.arc(x, y, a.r, 0, TAU); ctx.fillStyle = a.c; ctx.fill(); if (!a.molten) { ctx.strokeStyle = alpha(PAL.ink, 0.6); ctx.lineWidth = 1; ctx.stroke(); } ctx.restore();
      hits.push({ x, y, r: a.r + 3, name: NAMES[L.kind](h) });
    });
    /* the gas */
    GAS.forEach((g, i) => {
      const p = gasAt(g, t), two = p.h < 20 || (p.h > 58 && i % 2 === 0);
      const dots = two ? [[-7, 'O'], [0, 'C'], [7, 'O']] : [[-3.5, 'C'], [3.5, 'O']];
      dots.forEach(([dx, s]) => { ctx.save(); ctx.beginPath(); ctx.arc(p.x + dx, p.y, 4, 0, TAU); ctx.fillStyle = F.el(s); ctx.fill(); ctx.strokeStyle = alpha(PAL.ink, 0.5); ctx.lineWidth = 0.8; ctx.stroke(); ctx.restore(); });
      hits.push({ x: p.x, y: p.y, r: 8, name: two ? 'carbon dioxide, CO₂' : 'carbon monoxide, CO' });
    });
    /* the followed lump */
    const k = clamp01(t / T), hEnd = kind === 'ore' ? 5 : kind === 'lime' ? 7 : 11, hf = 80 - (80 - hEnd) * k;
    const fx = CX - 40, fl = look(kind, hf);
    if (fl.r > 0.5) {
      ctx.save(); ctx.beginPath(); ctx.arc(fx, yOf(hf), fl.r + 3, 0, TAU); ctx.fillStyle = fl.c; ctx.fill(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 1.5; ctx.stroke(); ctx.restore();
      hits.push({ x: fx, y: yOf(hf), r: 18, name: 'the lump followed: ' + NAMES[kind](hf) });
    }
    ctx.save(); ctx.beginPath(); ctx.arc(fx, yOf(hf), 17, 0, TAU); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2.5; ctx.stroke(); ctx.restore();
    /* the zones as the book lists them: height, temperature and the reactions there; the followed lump's zone in ink */
    const zone = ZONES.reduce((b, z) => (Math.abs(z[0] - hf) < Math.abs(b[0] - hf) ? z : b));
    const SXT = 860, SXR = 884;
    ZONES.forEach(([h, Tc]) => {
      const y = yOf(h), on = h === zone[0], f = on ? 1 : 0.5;
      line(ctx, CX + half(h) + 34, y, CX + half(h) + 46, y, PAL.muted, 2);
      const wt = on ? 600 : 400;
      F.rich(ctx, [[h + ' ft', alpha(C('length'), f), wt], [', ', alpha(PAL.ink, f), 400], [Tc + ' °C', alpha(C('temperature'), f), wt]], SXT, y, { size: 19, align: 'right' });
      if (ZR[h]) text(ctx, ZR[h], SXR, y, on ? PAL.ink : PAL.muted, { size: 18, weight: on ? 600 : 400 });
    });
    const zy = yOf(zone[0]);
    const mx = SXT - F.measure(ctx, zone[0] + ' ft, ' + zone[1] + ' °C', { size: 19, weight: 600 }) - 12;
    ctx.save(); ctx.beginPath(); ctx.moveTo(mx, zy); ctx.lineTo(mx - 14, zy - 8); ctx.lineTo(mx - 14, zy + 8); ctx.closePath(); ctx.fillStyle = PAL.ink; ctx.fill(); ctx.restore();
    /* names of the inlets and outlets */
    label(ctx, 'roasted ore, coke, limestone', CX + 14, yOf(97), { side: 'right', size: 19, leader: false, gap: 8 });
    label(ctx, 'CO, CO_{2}, N_{2}', PIPE_X + 10, yOf(OFF) - 30, { side: 'above', size: 19, leader: false, gap: 0 });
    label(ctx, 'preheated air', CX - half(15) - 200, yOf(15) - 26, { side: 'right', size: 19, leader: false, gap: 0 });
    label(ctx, 'slag', 100, yOf(7) - 24, { side: 'right', size: 19, leader: false, gap: 0 });
    label(ctx, 'molten iron', PIPE_X - 10, yOf(2.5) + 30, { side: 'right', size: 19, leader: false, gap: 0 });
    /* the key */
    const mol = (parts) => (c, x, y) => parts.forEach(([dx, s]) => { c.save(); c.beginPath(); c.arc(x + dx, y, 4, 0, TAU); c.fillStyle = F.el(s); c.fill(); c.strokeStyle = alpha(PAL.ink, 0.5); c.lineWidth = 0.8; c.stroke(); c.restore(); });
    const lump = (s) => (c, x, y) => { c.save(); c.beginPath(); c.arc(x, y, 9, 0, TAU); c.fillStyle = F.el(s); c.fill(); c.strokeStyle = alpha(PAL.ink, 0.6); c.lineWidth = 1; c.stroke(); c.restore(); };
    F.legend(ctx, { l: 40, r: 1360, t: 800, b: 866 }, [
      { s: 'iron ore', draw: lump('Fe') }, { s: 'coke', draw: lump('C') }, { s: 'limestone', draw: lump('Ca') },
      { s: 'CO', draw: mol([[-3.5, 'C'], [3.5, 'O']]) }, { s: 'CO_{2}', draw: mol([[-7, 'O'], [0, 'C'], [7, 'O']]) },
      { s: 'the lump followed', draw: (c, x, y) => { c.save(); c.beginPath(); c.arc(x, y, 13, 0, TAU); c.strokeStyle = PAL.ink; c.lineWidth = 2.5; c.stroke(); c.restore(); } },
    ], { corner: 'top', row: true, panel: false, size: 18 });
    topline(ctx, HEAD[kind]);
    tex(d.readout, tx(R[kind][zone[0]]), false, { values: false });
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();

/* =====================================================================
   FIGURE 19.10: resistance against temperature for a superconductor.
   The book's graph, 0 to 300 K, resistance without a scale; a choice of
   the note's three materials moves the drop (23 K, 92 K, 110 K), the
   curve bending from one to the next; the temperature slider carries a
   detent at each coolant's boiling temperature and a circle at the
   material's transition. Still.
===================================================================== */
(function () {
  const d = sim('sim-superconductor', 560);
  const MAT = {
    nb: { Tc: 23, name: 'NbTi and Nb_{3}Sn', plural: true },
    ybco: { Tc: 92, name: 'YBa_{2}Cu_{3}O_{7}' },
    bscco: { Tc: 110, name: 'a bismuth-strontium-copper oxide' },
  };
  const mat = F.choice(d.controls, {
    label: '\\text{material}', aria: 'the superconducting material', value: 'ybco',
    options: [{ value: 'nb', label: 'NbTi, Nb₃Sn' }, { value: 'ybco', label: 'YBa₂Cu₃O₇' }, { value: 'bscco', label: 'Bi–Sr–Cu oxide' }],
    onInput: () => Tk.refresh(),
  });
  const Tk = F.ctl(d.controls, {
    label: '\\kT', cls: 'temperature', min: 0, max: 300, step: 1, value: 77, unit: 'K', dec: 0,
    detents: [{ v: 4, label: 'He' }, { v: 77, label: 'N₂' }],
    specials: [{ at: () => MAT[mat.value].Tc, label: 'superconducting below' }],
  });
  /* the book's shape: zero below the transition, a jump to five sixths of the axis, then a slow rise */
  const R = (Tc) => (T) => (T < Tc ? 0 : 0.8 + (0.15 * (T - Tc)) / (300 - Tc));
  const box = { l: 190, r: 1250, t: 160, b: 450 };
  function draw() {
    const { ctx } = begin(d.c);
    const m = MAT[mat.value], T = Tk.v, Tc = m.Tc, below = T < Tc;
    const ct = C('temperature');
    /* axes fixed at 0 to 300 K, as the book draws them; resistance has no scale */
    const { X, Y } = axes(ctx, box, [0, 300], [0, 1], { nx: 6, ny: 1, fy: (v) => (v === 0 ? '0' : ''), xl: 'T (K)', xc: ct });
    text(ctx, 'resistance', box.l - 12, box.t + 10, PAL.ink, { size: 20, weight: 600, align: 'right' });
    [[4, 'liquid helium', 'boils at 4 K'], [77, 'liquid nitrogen', 'boils at 77 K']].forEach(([v, n, b]) => {
      line(ctx, X(v), box.t, X(v), box.b, alpha(PAL.ink, 0.35), 2, [10, 10]);
      text(ctx, n, X(v) + 6, box.t - 40, PAL.ink, { size: 17 });
      text(ctx, b, X(v) + 6, box.t - 18, ct, { size: 17 });
    });
    mat.curve(ctx, (v) => R(MAT[v].Tc), 0, 300, X, Y, PAL.ink, 4, 1200);
    const xc = mat.mix((v) => X(MAT[v].Tc));
    text(ctx, Tc + ' K', xc + 12, Y(0.4), ct, { size: 18, weight: 600, bg: PAL.panel });
    const r = R(Tc)(T);
    line(ctx, X(T), Y(r), X(T), box.b, alpha(ct, 0.6), 2, [4, 8]);
    dot(ctx, X(T), Y(r), PAL.ink, true, 9);
    const name = m.name, pl = m.plural, coolant = { 4: 'liquid helium', 77: 'liquid nitrogen' }[T];
    topline(ctx, coolant && below ? `Cooled by ${coolant} to ${T} K, ${name} ${pl ? 'conduct' : 'conducts'} with no resistance.`
      : coolant ? `Cooled by ${coolant} to ${T} K, ${name} still ${pl ? 'have' : 'has'} resistance; ${pl ? 'they need' : 'it needs'} less than ${Tc} K.`
      : below ? `At ${T} K, ${name} ${pl ? 'conduct' : 'conducts'} with no resistance.`
      : `At ${T} K, ${name} ${pl ? 'have' : 'has'} resistance; ${pl ? 'they become' : 'it becomes'} superconducting below ${Tc} K.`);
    tex(d.readout, `\\text{resistance} ${below ? '= 0' : '> 0'}\\ \\text{at}\\ \\kT = ${T}\\ \\text{K} ${below ? '<' : '\\geq'} ${kv('temperature', Tc + '\\ \\text{K}')}`);
  }
  register(d.fig, { update: () => {}, draw });
})();
};
