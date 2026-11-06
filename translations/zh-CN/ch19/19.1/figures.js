/* Figures for section 19.1 Occurrence, Preparation, and Properties of Transition Metals and Their Compounds. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['19.1'] = function (root, F) {
const { tex, C, PAL, alpha, register, begin, line, arrow, dot, text, topline, label, hbracket, axes } = F;
const sim = (id, H) => F.sim(root, id, H);
const TAU = 2 * Math.PI;
const clamp01 = (x) => Math.min(1, Math.max(0, x));
const WORD = ['零', '一', '两', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'];
const kv = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;

/* ---------- the elements, by atomic number ---------- */
const SYM = "H He Li Be B C N O F Ne Na Mg Al Si P S Cl Ar K Ca Sc Ti V Cr Mn Fe Co Ni Cu Zn Ga Ge As Se Br Kr Rb Sr Y Zr Nb Mo Tc Ru Rh Pd Ag Cd In Sn Sb Te I Xe Cs Ba La Ce Pr Nd Pm Sm Eu Gd Tb Dy Ho Er Tm Yb Lu Hf Ta W Re Os Ir Pt Au Hg Tl Pb Bi Po At Rn Fr Ra Ac Th Pa U Np Pu Am Cm Bk Cf Es Fm Md No Lr Rf Db Sg Bh Hs Mt Ds Rg Cn Nh Fl Mc Lv Ts Og".split(' ');
const NAME = "氢 氦 锂 铍 硼 碳 氮 氧 氟 氖 钠 镁 铝 硅 磷 硫 氯 氩 钾 钙 钪 钛 钒 铬 锰 铁 钴 镍 铜 锌 镓 锗 砷 硒 溴 氪 铷 锶 钇 锆 铌 钼 锝 钌 铑 钯 银 镉 铟 锡 锑 碲 碘 氙 铯 钡 镧 铈 镨 钕 钷 钐 铕 钆 铽 镝 钬 铒 铥 镱 镥 铪 钽 钨 铼 锇 铱 铂 金 汞 铊 铅 铋 钋 砹 氡 钫 镭 锕 钍 镤 铀 镎 钚 镅 锔 锫 锎 锿 镄 钔 锘 铹 𬬻 𬭊 𬭳 𬭛 𬭶 鿏 𫟼 𬬭 鿔 鿭 𫓧 镆 𫟷 鿬 鿫".split(' ');
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

/* =====================================================================
   FIGURE 19.2: the transition series on the periodic table. The book's
   table with its two f rows beneath; a choice of series lights its
   members, the light moving from one series to the next. Lanthanum and
   actinium, members of two series each, are outlined dashed. Still.
===================================================================== */
(function () {
  const d = sim('sim-transition-series', 790);
  const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
  const SERIES = {
    first: { z: range(21, 29), head: '第一过渡系横跨第 4 周期，从钪到铜。', ro: '{}_{21}\\text{Sc}\\ \\text{至}\\ {}_{29}\\text{Cu}\\text{：}\\ 9\\ \\text{种元素，填充}\\ 3d\\ \\text{亚层}' },
    second: { z: range(39, 47), head: '第二过渡系横跨第 5 周期，从钇到银。', ro: '{}_{39}\\text{Y}\\ \\text{至}\\ {}_{47}\\text{Ag}\\text{：}\\ 9\\ \\text{种元素，填充}\\ 4d\\ \\text{亚层}' },
    third: { z: [57, ...range(72, 79)], head: '第三过渡系由镧和第 6 周期中从铪到金的元素组成。', ro: '{}_{57}\\text{La}\\ \\text{和}\\ {}_{72}\\text{Hf}\\ \\text{至}\\ {}_{79}\\text{Au}\\text{：}\\ 9\\ \\text{种元素，填充}\\ 5d\\ \\text{亚层}' },
    fourth: { z: [89, ...range(104, 111)], head: '第四过渡系由锕和第 7 周期中从𬬻到𬬭的元素组成。', ro: '{}_{89}\\text{Ac}\\ \\text{和}\\ {}_{104}\\text{Rf}\\ \\text{至}\\ {}_{111}\\text{Rg}\\text{：}\\ 9\\ \\text{种元素，填充}\\ 6d\\ \\text{亚层}' },
    lanthanides: { z: range(57, 71), head: '镧系由镧和从铈到镥的元素组成。', ro: '{}_{57}\\text{La}\\ \\text{至}\\ {}_{71}\\text{Lu}\\text{：}\\ 15\\ \\text{种元素，填充}\\ 4f\\ \\text{亚层}' },
    actinides: { z: range(89, 103), head: '锕系由锕和从钍到铹的元素组成。', ro: '{}_{89}\\text{Ac}\\ \\text{至}\\ {}_{103}\\text{Lr}\\text{：}\\ 15\\ \\text{种元素，填充}\\ 5f\\ \\text{亚层}' },
  };
  const pick = F.choice(d.controls, {
    label: '\\text{系}', aria: '表中被点亮的系', value: 'first',
    options: [['first', '第一'], ['second', '第二'], ['third', '第三'], ['fourth', '第四'], ['lanthanides', '镧系'], ['actinides', '锕系']].map(([value, l]) => ({ value, label: l })),
  });
  const lit = (v) => Array.from({ length: 118 }, (_, i) => (SERIES[v].z.includes(i + 1) ? 1 : 0));
  const X0 = 60, CW = 70, CH = 54, PY = 60, TOP = 140, FTOP = 590;
  function cell(Z) {
    const q = place(Z);
    if (q.f !== undefined) return { x: X0 + (2 + q.f) * CW, y: FTOP + (q.period - 6) * PY };
    return { x: X0 + (q.group - 1) * CW, y: TOP + (q.period - 1) * PY };
  }
  const DUAL = {
    57: '镧，Z = 57：就其行为而言是镧系元素，就其电子构型而言是第三过渡系的第一个成员',
    89: '锕，Z = 89：就其行为而言是锕系元素，就其电子构型而言是第四过渡系的第一个成员',
  };
  let hits = []; F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c);
    const on = pick.mix(lit);
    hits = [];
    for (let p = 1; p <= 7; p++) text(ctx, String(p), X0 - 20, TOP + (p - 1) * PY + CH / 2, PAL.muted, { size: 15, align: 'center' });
    const firstRow = [1, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 2, 2, 2, 2, 1];
    firstRow.forEach((p, g) => text(ctx, String(g + 1), X0 + g * CW + CW / 2, TOP + (p - 1) * PY - 12, PAL.muted, { size: 15, align: 'center' }));
    hbracket(ctx, X0 + 2 * CW + 2, X0 + 11 * CW - 4, TOP + 3 * PY - 38, PAL.ink, '过渡元素', { side: 'above' });
    /* the two places in group 3 the f rows stand for */
    [[6, '57–71'], [7, '89–103']].forEach(([p, s]) => {
      const x = X0 + 2 * CW, y = TOP + (p - 1) * PY;
      ctx.save(); ctx.setLineDash([4, 4]); ctx.strokeStyle = PAL.muted; ctx.lineWidth = 1.5; ctx.strokeRect(x + 1, y, CW - 3, CH); ctx.restore();
      text(ctx, s, x + CW / 2, y + CH / 2, PAL.muted, { size: 14, align: 'center' });
    });
    for (let Z = 1; Z <= 118; Z++) {
      const { x, y } = cell(Z), k = on[Z - 1];
      ctx.save(); ctx.fillStyle = PAL.panel; ctx.fillRect(x + 1, y, CW - 3, CH);
      if (k > 0) { ctx.fillStyle = alpha(PAL.ink, 0.2 * k); ctx.fillRect(x + 1, y, CW - 3, CH); }
      if (DUAL[Z] && k > 0.5) ctx.setLineDash([6, 4]);
      ctx.strokeStyle = k > 0.5 ? PAL.ink : PAL.rule; ctx.lineWidth = 1.5 + 1.5 * k; ctx.strokeRect(x + 1, y, CW - 3, CH); ctx.restore();
      text(ctx, String(Z), x + 7, y + 12, PAL.muted, { size: 12 });
      text(ctx, SYM[Z - 1], x + CW / 2, y + 33, PAL.ink, { size: 20, weight: k > 0.5 ? 600 : 400, align: 'center' });
      hits.push({ x: x + CW / 2, y: y + CH / 2, r: 27, name: DUAL[Z] ?? NAME[Z - 1] + '，Z = ' + Z });
    }
    text(ctx, '镧系', X0 + 2 * CW - 10, FTOP + CH / 2, PAL.muted, { size: 15, align: 'right' });
    text(ctx, '锕系', X0 + 2 * CW - 10, FTOP + PY + CH / 2, PAL.muted, { size: 15, align: 'right' });
    hbracket(ctx, X0 + 2 * CW + 2, X0 + 17 * CW - 4, FTOP + PY + CH + 16, PAL.ink, '内过渡元素', { side: 'below' });
    topline(ctx, SERIES[pick.value].head);
    tex(d.readout, SERIES[pick.value].ro);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 19.4: the oxidation states of the first transition series.
   The book's chart, the chosen metal's column lit; beside it the metal's
   4s and 3d orbital boxes, the electrons its highest state removes (the
   4s first) drawn hollow and numbered in the order they leave. Still.
===================================================================== */
(function () {
  const d = sim('sim-oxidation-states', 600);
  /* symbol, name, Z, 4s and 3d electrons of the atom, the states the book's chart prints */
  const M = [
    ['Sc', '钪', 21, 2, 1, [3]], ['Ti', '钛', 22, 2, 2, [3, 4]], ['V', '钒', 23, 2, 3, [2, 3, 4, 5]],
    ['Cr', '铬', 24, 1, 5, [2, 3, 4, 6]], ['Mn', '锰', 25, 2, 5, [2, 3, 4, 6, 7]], ['Fe', '铁', 26, 2, 6, [2, 3, 6]],
    ['Co', '钴', 27, 2, 7, [2, 3]], ['Ni', '镍', 28, 2, 8, [2, 3]], ['Cu', '铜', 29, 1, 10, [1, 2, 3]], ['Zn', '锌', 30, 2, 10, [2]],
  ].map(([sym, name, Z, s, dd, states]) => ({ sym, name, Z, s, d: dd, states, top: Math.max(...states) }));
  const pick = F.choice(d.controls, {
    label: '\\text{金属}', aria: '第一过渡系的金属', value: 'Ti',
    options: M.map((m) => ({ value: m.sym, label: m.sym })),
  });
  const of = (v) => M.find((m) => m.sym === v);
  /* the chart */
  const GX = 70, GW = 62, GY = 150, RH = 50;
  /* the orbital boxes */
  const SX = 820, DX = 940, BY = 300, BW = 66, BH = 60;
  /* every electron of the atom: where it sits and the order it leaves in (4s first, then 3d from the last one placed) */
  function electrons(m) {
    const out = [];
    for (let i = 0; i < m.s; i++) out.push({ x: SX + (i === 0 ? 0.36 : 0.64) * BW, up: i === 0, sub: 's', i });
    for (let i = 0; i < m.d; i++) { const box = i < 5 ? i : i - 5, up = i < 5; out.push({ x: DX + box * BW + (up ? 0.36 : 0.64) * BW, up, sub: 'd', i }); }
    const sOut = out.filter((e) => e.sub === 's').reverse(), dOut = out.filter((e) => e.sub === 'd').reverse();
    [...sOut, ...dOut].forEach((e, n) => { e.order = n + 1; e.lost = n + 1 <= m.top; });
    return out;
  }
  let hits = []; F.hover(d.stage, () => hits);
  const cfg = (s, dd) => (dd ? `3d^{${dd}}` : '') + (s ? `4s^{${s}}` : '');
  function draw() {
    const { ctx } = begin(d.c);
    const m = of(pick.value);
    hits = [];
    /* the chart, as the book prints it */
    const gx = pick.mix((v) => GX + M.indexOf(of(v)) * GW);
    ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.12); ctx.fillRect(gx + 2, GY - 52, GW - 4, 7 * RH + 56); ctx.restore();
    M.forEach((q, c) => {
      const x = GX + c * GW + GW / 2, sel = q.sym === m.sym;
      text(ctx, q.sym, x + 6, GY - 22, PAL.ink, { size: 22, weight: sel ? 600 : 400, align: 'center' });
      text(ctx, String(q.Z), x + 4 - F.measure(ctx, q.sym, { size: 22 }) / 2, GY - 34, PAL.muted, { size: 13, align: 'right' });
      for (let n = 1; n <= 7; n++) {
        const y = GY + (n - 1) * RH + RH / 2;
        if (q.states.includes(n)) {
          text(ctx, n + '+', x, y, PAL.ink, { size: 19, weight: sel ? 600 : 400, align: 'center' });
          hits.push({ x, y, r: 18, name: q.name + '，' + n + '+ 氧化态' });
        }
      }
    });
    ctx.save(); ctx.strokeStyle = PAL.rule; ctx.lineWidth = 1.5;
    for (let n = 0; n <= 7; n++) { ctx.beginPath(); ctx.moveTo(GX, GY + n * RH); ctx.lineTo(GX + 10 * GW, GY + n * RH); ctx.stroke(); }
    ctx.restore();
    /* the orbital boxes of the chosen metal */
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2;
    ctx.strokeRect(SX, BY - BH / 2, BW, BH);
    for (let b = 0; b < 5; b++) ctx.strokeRect(DX + b * BW, BY - BH / 2, BW, BH);
    ctx.restore();
    text(ctx, '4', SX + BW / 2 - 5, BY + BH / 2 + 26, PAL.ink, { size: 22, align: 'right' });
    text(ctx, 's', SX + BW / 2 - 5, BY + BH / 2 + 26, PAL.ink, { size: 22, italic: true });
    text(ctx, '3', DX + 2.5 * BW - 5, BY + BH / 2 + 26, PAL.ink, { size: 22, align: 'right' });
    text(ctx, 'd', DX + 2.5 * BW - 5, BY + BH / 2 + 26, PAL.ink, { size: 22, italic: true });
    text(ctx, '[Ar]', SX - 24, BY, PAL.ink, { size: 22, align: 'right' });
    M.forEach((q) => pick.only(ctx, q.sym, () => {
      electrons(q).forEach((e) => {
        spin(ctx, e.x, BY, e.up, BH - 16, e.lost ? alpha(PAL.ink, 0.28) : PAL.ink, e.lost ? 2 : 3.5);
        if (e.lost) text(ctx, String(e.order), e.x, BY - BH / 2 - 16, PAL.muted, { size: 16, align: 'center' });
      });
    }, [0, 0]));
    electrons(m).forEach((e) => hits.push({ x: e.x, y: BY, r: 14, name: (e.lost ? '在 ' + m.sym + ' ' + m.top + '+ 中失去，第' + ['一', '二', '三', '四', '五', '六', '七'][e.order - 1] + '个被移去' : '在 ' + m.sym + ' ' + m.top + '+ 中保留') + '：一个 ' + (e.sub === 's' ? '4s' : '3d') + ' 电子，自旋' + (e.up ? '向上' : '向下') }));
    /* the key to the drawing */
    const KY = 470, KX = SX - 60;
    spin(ctx, KX + 10, KY, true, 34, PAL.ink, 3.5); text(ctx, '保留', KX + 30, KY, PAL.ink, { size: 18 });
    spin(ctx, KX + 110, KY, true, 34, alpha(PAL.ink, 0.28), 2); text(ctx, '在最高氧化态中失去，按顺序编号', KX + 130, KY, PAL.ink, { size: 18 });
    const n = m.s + m.d, all = m.top >= n;
    topline(ctx, all
      ? `${m.name}在其最高氧化态 ${m.top}+ 时，失去其全部${WORD[n]}个 $4s$ 和 $3d$ 电子。`
      : `${m.name}在其最高氧化态 ${m.top}+ 时，其${WORD[n]}个 $4s$ 和 $3d$ 电子中只失去${WORD[m.top]}个。`);
    const sl = Math.max(0, m.s - m.top), dl = m.d - Math.max(0, m.top - m.s);
    tex(d.readout, `\\text{${m.sym}}\\text{:}\\ [\\text{Ar}]\\,${cfg(m.s, m.d)}\\ \\longrightarrow\\ \\text{${m.sym}}^{${m.top}+}\\text{:}\\ [\\text{Ar}]${sl || dl ? '\\,' + cfg(sl, dl) : ''},\\quad ${n}\\ \\text{个价电子中失去}\\ ${m.top}\\ \\text{个}`);
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
  const H = 820, d = sim('sim-blast-furnace', H);
  const IRON = '#ff8c1a';                         /* the glow of molten iron */
  const SLAG = '#ffd24d';                         /* the glow of molten slag */
  const T = 6;
  const CX = 400, K = 6.4, YB = 770;
  const yOf = (h) => YB - h * K;
  /* the inner half-width of the furnace at height h ft: hearth, bosh, belly, stack and throat */
  const half = (h) => (h <= 10 ? 112 : h <= 25 ? 112 + ((h - 10) / 15) * 46 : h <= 35 ? 158 : h <= 84 ? 158 - ((h - 35) / 49) * 58 : 100);
  const ZONES = [[75, 230], [65, 410], [55, 525], [45, 865], [35, 945], [25, 1125], [15, 1300], [5, 1510]];
  const R = {
    ore: { 75: '3Fe_2O_3 + CO -> 2Fe_3O_4 + CO_2', 65: 'Fe_3O_4 + CO -> 3FeO + CO_2', 55: 'FeO + CO -> Fe + CO_2', 45: 'Fe(s)', 35: 'Fe(s)', 25: 'Fe(l)', 15: 'Fe(l)', 5: 'Fe(l)' },
    coke: { 75: 'C(s)', 65: 'C(s)', 55: 'C(s)', 45: 'C + CO_2 -> 2CO', 35: 'C + CO_2 -> 2CO', 25: 'C + CO_2 -> 2CO', 15: 'C + O_2 -> CO_2', 5: 'C + O_2 -> CO_2' },
    lime: { 75: 'CaCO_3(s)', 65: 'CaCO_3(s)', 55: 'CaCO_3(s)', 45: 'CaCO_3(s)', 35: 'CaCO_3 -> CaO + CO_2', 25: 'CaO + SiO_2 -> CaSiO_3', 15: 'CaSiO_3(l)', 5: 'CaSiO_3(l)' },
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
    ore: '从下方升起的一氧化碳把一块铁矿石还原为铁，铁熔化后聚集在底部。',
    coke: '一块焦炭把上升的二氧化碳变为一氧化碳，并在靠近底部的预热空气中燃烧。',
    lime: '一块石灰石分解为氧化钙，氧化钙与二氧化硅结合，形成浮在铁上的炉渣。',
  };
  const follow = F.choice(d.controls, {
    label: '\\text{跟随}', aria: '沿炉子向下被跟随的料块', value: 'ore',
    options: [{ value: 'ore', label: '铁矿石' }, { value: 'coke', label: '焦炭' }, { value: 'lime', label: '石灰石' }],
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
  const OFF = 83, PIPE_X = 690;
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
    ore: (h) => (h > 70 ? '氧化铁(III)，Fe₂O₃' : h > 60 ? 'Fe₃O₄' : h > 50 ? '氧化铁(II)，FeO' : h > 28 ? '铁' : '熔融的铁'),
    coke: (h) => (h > 15 ? '焦炭，碳' : '焦炭，正在燃烧'),
    lime: (h) => (h > 40 ? '石灰石，CaCO₃' : h > 30 ? '氧化钙，CaO' : '熔融的炉渣，CaSiO₃'),
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
    hits.push({ x: CX - half(50) - 17, y: yOf(50), r: 20, name: '炉壁，内衬耐火砖' });
    /* the hearth: molten iron under the slag */
    const pool = (h0, h1, c) => { ctx.save(); ctx.fillStyle = c; ctx.fillRect(CX - half(0), yOf(h1), 2 * half(0), yOf(h0) - yOf(h1)); ctx.restore(); };
    pool(0, 5, F.fact(IRON)); pool(5, 9, F.fact(SLAG));
    hits.push({ x: CX, y: yOf(2.5), r: 30, name: '熔融的铁' }, { x: CX + 60, y: yOf(7), r: 22, name: '熔融的炉渣，浮在铁上' });
    /* the pipes: off-take, tuyeres, slag notch and iron notch */
    const pipe = (x1, x2, h, w) => { ctx.save(); ctx.fillStyle = PAL.panel; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2; ctx.fillRect(Math.min(x1, x2), yOf(h) - w / 2, Math.abs(x2 - x1), w); ctx.strokeRect(Math.min(x1, x2), yOf(h) - w / 2, Math.abs(x2 - x1), w); ctx.restore(); };
    pipe(CX + half(OFF), PIPE_X, OFF, 30);
    pipe(CX - half(15) - 34, CX - half(15) - 120, 15, 20); pipe(CX + half(15) + 34, CX + half(15) + 120, 15, 20);
    pipe(CX - half(7) - 34, 120, 7, 18); pipe(CX + half(2.5) + 34, PIPE_X, 2.5, 18);
    hits.push({ x: CX - half(15) - 80, y: yOf(15), r: 18, name: '风口，吹入预热空气的喷嘴' }, { x: CX + half(15) + 80, y: yOf(15), r: 18, name: '风口，吹入预热空气的喷嘴' });
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
      hits.push({ x: p.x, y: p.y, r: 8, name: two ? '二氧化碳，CO₂' : '一氧化碳，CO' });
    });
    /* the followed lump */
    const k = clamp01(t / T), hEnd = kind === 'ore' ? 5 : kind === 'lime' ? 7 : 9, hf = 80 - (80 - hEnd) * k;
    const fx = CX - 40, fl = look(kind, hf);
    if (fl.r > 0.5) {
      ctx.save(); ctx.beginPath(); ctx.arc(fx, yOf(hf), fl.r + 3, 0, TAU); ctx.fillStyle = fl.c; ctx.fill(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 1.5; ctx.stroke(); ctx.restore();
      hits.push({ x: fx, y: yOf(hf), r: 18, name: '被跟随的料块：' + NAMES[kind](hf) });
    }
    ctx.save(); ctx.beginPath(); ctx.arc(fx, yOf(hf), 17, 0, TAU); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2.5; ctx.stroke(); ctx.restore();
    /* the scale of zones: height and temperature */
    const zone = ZONES.reduce((b, z) => (Math.abs(z[0] - hf) < Math.abs(b[0] - hf) ? z : b));
    const SXH = 900, SXT = 990;
    ZONES.forEach(([h, Tc]) => {
      const y = yOf(h), on = h === zone[0];
      line(ctx, CX + half(h) + 34, y, CX + half(h) + 46, y, PAL.muted, 2);
      text(ctx, h + ' ft', SXH, y, on ? C('length') : alpha(C('length'), 0.55), { size: 19, weight: on ? 600 : 400, align: 'right' });
      text(ctx, Tc + ' °C', SXT + 70, y, on ? C('temperature') : alpha(C('temperature'), 0.55), { size: 19, weight: on ? 600 : 400, align: 'right' });
    });
    const zy = yOf(zone[0]);
    ctx.save(); ctx.beginPath(); ctx.moveTo(SXH - 70, zy); ctx.lineTo(SXH - 84, zy - 8); ctx.lineTo(SXH - 84, zy + 8); ctx.closePath(); ctx.fillStyle = PAL.ink; ctx.fill(); ctx.restore();
    text(ctx, '高度', SXH, yOf(83), C('length'), { size: 17, align: 'right' });
    text(ctx, '温度', SXT + 70, yOf(83), C('temperature'), { size: 17, align: 'right' });
    /* names of the inlets and outlets */
    label(ctx, '焙烧后的矿石、焦炭、石灰石', CX + 14, yOf(97), { side: 'right', size: 19, leader: false, gap: 8 });
    label(ctx, 'CO, CO_{2}, N_{2}', PIPE_X + 10, yOf(OFF) - 30, { side: 'above', size: 19, leader: false, gap: 0 });
    label(ctx, '预热空气', CX - half(15) - 200, yOf(15) - 26, { side: 'right', size: 19, leader: false, gap: 0 });
    label(ctx, '炉渣', 100, yOf(7) - 24, { side: 'right', size: 19, leader: false, gap: 0 });
    label(ctx, '熔融的铁', PIPE_X + 48, yOf(2.5), { side: 'right', size: 19, leader: false, gap: 8 });
    /* the key */
    const LX = 1110, LY = 580;
    [['Fe', '铁矿石'], ['C', '焦炭'], ['Ca', '石灰石']].forEach(([s, n], i) => {
      const y = LY + i * 34; ctx.save(); ctx.beginPath(); ctx.arc(LX, y, 9, 0, TAU); ctx.fillStyle = F.el(s); ctx.fill(); ctx.strokeStyle = alpha(PAL.ink, 0.6); ctx.lineWidth = 1; ctx.stroke(); ctx.restore();
      text(ctx, n, LX + 20, y, PAL.ink, { size: 18 });
    });
    [[-3.5, 'C'], [3.5, 'O']].forEach(([dx, s]) => { ctx.save(); ctx.beginPath(); ctx.arc(LX + dx, LY + 102, 4, 0, TAU); ctx.fillStyle = F.el(s); ctx.fill(); ctx.strokeStyle = alpha(PAL.ink, 0.5); ctx.lineWidth = 0.8; ctx.stroke(); ctx.restore(); });
    text(ctx, 'CO', LX + 20, LY + 102, PAL.ink, { size: 18 });
    [[-7, 'O'], [0, 'C'], [7, 'O']].forEach(([dx, s]) => { ctx.save(); ctx.beginPath(); ctx.arc(LX + dx, LY + 136, 4, 0, TAU); ctx.fillStyle = F.el(s); ctx.fill(); ctx.strokeStyle = alpha(PAL.ink, 0.5); ctx.lineWidth = 0.8; ctx.stroke(); ctx.restore(); });
    text(ctx, 'CO_{2}', LX + 20, LY + 136, PAL.ink, { size: 18 });
    ctx.save(); ctx.beginPath(); ctx.arc(LX, LY + 172, 15, 0, TAU); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2.5; ctx.stroke(); ctx.restore();
    text(ctx, '被跟随的料块', LX + 26, LY + 172, PAL.ink, { size: 18 });
    topline(ctx, HEAD[kind]);
    tex(d.readout, `${kv('length', zone[0] + '\\ \\text{ft}')},\\ ${kv('temperature', zone[1] + '\\ ^\\circ\\text{C}')}\\text{:}\\quad ${tx(R[kind][zone[0]])}`, false, { values: false });
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
    nb: { Tc: 23, name: 'NbTi 和 Nb_{3}Sn', plural: true },
    ybco: { Tc: 92, name: 'YBa_{2}Cu_{3}O_{7}' },
    bscco: { Tc: 110, name: '铋锶铜氧化物' },
  };
  const mat = F.choice(d.controls, {
    label: '\\text{材料}', aria: '超导材料', value: 'ybco',
    options: [{ value: 'nb', label: 'NbTi、Nb₃Sn' }, { value: 'ybco', label: 'YBa₂Cu₃O₇' }, { value: 'bscco', label: 'Bi–Sr–Cu 氧化物' }],
    onInput: () => Tk.refresh(),
  });
  const Tk = F.ctl(d.controls, {
    label: '\\kT', cls: 'temperature', min: 0, max: 300, step: 1, value: 77, unit: 'K', dec: 0,
    detents: [{ v: 4, label: 'He' }, { v: 77, label: 'N₂' }],
    specials: [{ at: () => MAT[mat.value].Tc, label: '低于此值时超导' }],
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
    text(ctx, '电阻', box.l - 12, box.t + 10, PAL.ink, { size: 20, weight: 600, align: 'right' });
    [[4, '液氦', '沸点 4 K'], [77, '液氮', '沸点 77 K']].forEach(([v, n, b]) => {
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
    const name = m.name;
    topline(ctx, below
      ? `在 ${T} K 时，${name} 导电无电阻。`
      : `在 ${T} K 时，${name} 仍有电阻；低于 ${Tc} K 时才变为超导的。`);
    tex(d.readout, `\\kT = ${T}\\ \\text{K} ${below ? '<' : '\\geq'} ${kv('temperature', Tc + '\\ \\text{K}')}\\text{:}\\quad \\text{电阻} ${below ? '= 0' : '> 0'}`);
  }
  register(d.fig, { update: () => {}, draw });
})();
};
