/* Figures for section 20.2 Alcohols and Ethers. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['20.2'] = function (root, F) {
const { PAL, alpha, register, begin, line, text, topline, measure } = F;
const sim = (id, H) => F.sim(root, id, H);
const RAD = Math.PI / 180;

/* =====================================================================
   SIM: one oxygen atom in a straight chain of n carbon atoms (2 to 6),
   either as an –OH group on carbon k (an alcohol) or between carbons k
   and k + 1 (an ether). The name follows the book's rules: an alcohol
   takes its chain's name with -e replaced by -ol and the number of the
   –OH carbon counted from the nearer end; an ether names the oxygen and
   its smaller branch as the alkoxy group and the larger branch as the
   base chain, numbered from the carbon on the oxygen. Every placement has
   the formula CₙH₂ₙ₊₂O. The default, –OH on the second of five carbons,
   is Example 20.8's 2-pentanol.
   Above: the chosen molecule as the condensed zigzag the book draws,
   groups at the vertices, an interior –OH as a branch outward, locants
   on the inner side, the functional group under a soft ink highlight
   (the book's red is emphasis). Below: the map of every place the oxygen
   can go, the row of carbon atoms with one tile over each carbon (the
   alcohol that –OH there makes) and one under each bond (the ether that
   –O– there makes). A tap on a tile picks it. Two tiles with one name
   are one molecule turned end for end, and are marked together; the
   headline counts the different ones, all of one formula. Still: a
   structure has no clock; a change crossfades only the parts that change.
===================================================================== */
(function () {
  const H = 632, d = sim('sim-oxygen-chain', H);
  const ALKANE = ['', 'methane', 'ethane', 'propane', 'butane', 'pentane', 'hexane'];
  const STEM = ['', 'meth', 'eth', 'prop', 'but', 'pent', 'hex'];
  const ALKYL = ['', 'methyl', 'ethyl', 'propyl', 'butyl', 'pentyl', 'hexyl'];
  const ORD = ['', '1st', '2nd', '3rd', '4th', '5th', '6th'];
  const SUBS = { 0: '₀', 1: '₁', 2: '₂', 3: '₃', 4: '₄', 5: '₅', 6: '₆', 7: '₇', 8: '₈', 9: '₉' };
  const sub = (n) => String(n).split('').map((c) => SUBS[c]).join('');
  const NS = [2, 3, 4, 5, 6];

  /* ---------- the molecule as a graph, and its name ---------- */
  const optionsFor = (n) => [
    ...Array.from({ length: n }, (_, i) => ({ value: `oh-${i + 1}`, label: `–OH on ${ORD[i + 1]} C` })),
    ...Array.from({ length: n - 1 }, (_, i) => ({ value: `oe-${i + 1}`, label: `–O– after ${ORD[i + 1]} C` })),
  ];
  function molecule(n, opt) {
    const [g, ks] = opt.split('-'), k = +ks, alcohol = g === 'oh';
    /* backbone vertices left to right: carbons by index, the ether O, or a terminal –OH */
    const B = [];
    if (alcohol && k === 1 && n > 1) B.push({ el: 'O', oh: true, end: 'left' });
    for (let i = 1; i <= n; i++) { B.push({ el: 'C', i }); if (!alcohol && i === k) B.push({ el: 'O' }); }
    if (alcohol && k === n) B.push({ el: 'O', oh: true, end: 'right' });
    const branch = alcohol && k > 1 && k < n ? k : 0;
    const m = { n, k, alcohol, B, branch, formula: `C_{${n}}H_{${2 * n + 2}}O` };
    if (alcohol) {
      const L = Math.min(k, n + 1 - k), fromLeft = k <= n + 1 - k;
      m.L = L; m.number = (i) => (fromLeft ? i : n + 1 - i);
      m.base = new Set(Array.from({ length: n }, (_, i) => i + 1));
      m.name = n === 2 ? 'ethanol' : `${L}-${STEM[n]}anol`;
      m.parts = { loc: n === 2 ? '' : String(L), base: `${STEM[n]}an`, suf: 'ol' };
    } else {
      const a = k, b = n - k, leftAlkoxy = a <= b, small = Math.min(a, b), large = Math.max(a, b);
      m.small = small; m.large = large;
      m.alkoxy = new Set(leftAlkoxy ? Array.from({ length: a }, (_, i) => i + 1) : Array.from({ length: b }, (_, i) => k + 1 + i));
      m.base = new Set(Array.from({ length: n }, (_, i) => i + 1).filter((i) => !m.alkoxy.has(i)));
      m.number = (i) => (leftAlkoxy ? i - k : k + 1 - i);
      const alk = `${STEM[small]}oxy`;
      m.name = `${large >= 3 ? '1-' : ''}${alk}${ALKANE[large]}`;
      m.common = small === large ? `di${ALKYL[small]} ether` : [ALKYL[a], ALKYL[b]].sort().join(' ') + ' ether';
      m.parts = { loc: large >= 3 ? '1' : '', alk, base: ALKANE[large], group: `C${small > 1 ? `_{${small}}` : ''}H_{${2 * small + 1}}O–` };
    }
    return m;
  }
  const hCount = (m, j) => {
    const v = m.B[j]; if (v.el !== 'C') return 0;
    const nb = (j > 0 ? 1 : 0) + (j < m.B.length - 1 ? 1 : 0);
    return 4 - nb - (m.branch === v.i ? 1 : 0);
  };
  const groupText = (m, j) => {
    const v = m.B[j];
    if (v.el === 'O') return v.oh ? (v.end === 'left' ? 'HO' : 'OH') : 'O';
    const h = hCount(m, j);
    return h === 0 ? 'C' : h === 1 ? 'CH' : `CH_{${h}}`;
  };
  const groupName = (m, j) => {
    const v = m.B[j];
    if (v.el === 'O') return v.oh ? 'hydroxyl group, –OH' : 'oxygen atom of the ether, –O–';
    const h = hCount(m, j), g = h === 0 ? 'C' : `CH${h > 1 ? sub(h) : ''}`;
    if (m.alcohol || m.base.has(v.i)) return `${g} group, carbon ${m.number(v.i)} of the ${m.alcohol ? 'chain' : 'base chain'}`;
    return `${g} group of the ${m.parts.alk} group`;
  };
  const nb = (x) => x.replace(/-/g, '\u2011');
  const WORD = ['', 'one', 'two', 'three', 'four', 'five', 'six'];
  const headlineOf = (m) => {
    const a = Math.ceil(m.n / 2), e = Math.floor(m.n / 2);
    return `One oxygen atom in a chain of ${WORD[m.n]} carbon atoms gives ${WORD[a]} alcohol${a > 1 ? 's' : ''} and ${WORD[e]} ether${e > 1 ? 's' : ''}, ${m.n === 2 ? 'both' : 'all'} ${uf(m)}.`;
  };
  function uf(m) { return `C${sub(m.n)}H${sub(2 * m.n + 2)}O`; }
  function noteOf(m) {
    if (!m.alcohol) return m.small === m.large ? `Both groups on the oxygen atom are ${ALKYL[m.small]} groups, so the common name is ${m.common}.`
      : `The common name lists the two groups in alphabetical order: ${m.common}.`;
    const { n, k, L } = m, other = n + 1 - k;
    if (n === 2) return 'Either carbon atom of ethane gives the same molecule, so ethanol needs no number.';
    if (k === other) return `Carbon ${k} is the middle of the chain, so either end gives it the same number.`;
    if (k === L) return `Numbered from the other end, the –OH group would be on carbon ${other}; the lower number, ${k}, is used.`;
    return `Counted from the left, the –OH group is on the ${ORD[k]} carbon; numbered from the nearer end, it is on carbon ${L}.`;
  }
  function readoutOf(m) {
    const ub = (key, s, under) => `\\mk{${key}}{\\underbrace{\\text{${s}}}_{\\text{${under}}}}`;
    const f = '';
    const loc = m.parts.loc ? ub('loc', m.parts.loc + '-', 'carbon') : '';
    if (m.alcohol) return loc + ub('base', m.parts.base, 'chain') + ub('suf', 'ol', '–OH') + f;
    const g = m.parts.group.replace(/_\{(\d+)\}/g, '}_{$1}\\text{').replace(/^/, '\\text{') + '}';
    return loc + `\\mk{alk}{\\underbrace{\\text{${m.parts.alk}}}_{${g}}}` + ub('base', m.parts.base, 'base chain') + f;
  }

  /* ---------- controls ---------- */
  let last = null, prev = null;
  const nPick = F.choice(d.controls, { label: '\\text{carbons}', key: 'carbons', options: NS.map((n) => ({ value: String(n), label: String(n) })), value: '5',
    aria: 'the number of carbon atoms in the chain', onInput: () => switchN() });
  const oPick = F.select(d.controls, { label: '\\text{oxygen}', key: 'oxygen', options: optionsFor(5), value: 'oh-2',
    aria: 'where the oxygen atom goes, counting carbons from the left', onInput: () => { prev = shown; last = oPick; shown = state(); draw(); } });
  const state = () => molecule(+nPick.value, oPick.value);
  let shown = state();
  function switchN() {
    const n = +nPick.value, [g, ks] = shown ? [shown.alcohol ? 'oh' : 'oe', shown.k] : ['oh', 1];
    const k = Math.min(ks, g === 'oh' ? n : n - 1);
    oPick.options(optionsFor(n), `${g}-${k}`);
    prev = shown; last = nPick; shown = state(); draw();
  }

  /* ---------- flat drawing ---------- */
  const DX = 172, AMP = DX * Math.tan(35.26 * RAD), BR = 104, YC = 280, SZ = 30, BAND = [78, 412];
  function layout(m, ctx) {
    const cnt = m.B.length, x0 = 700 - ((cnt - 1) * DX) / 2;
    const flip = m.branch % 2 === 1;                              /* the carbon that carries a branch sits on an upper vertex, so the –OH always points up */
    const V = m.B.map((v, j) => {
      const up = (j % 2 === 1) !== flip, s = groupText(m, j), w = measure(ctx, s, { size: SZ, weight: 600 });
      return { ...v, j, x: x0 + j * DX, y: YC + (up ? -AMP / 2 : AMP / 2), up, s, w };
    });
    let br = null;
    if (m.branch) { const c = V.find((v) => v.i === m.branch); br = { x: c.x, y: c.y + (c.up ? -BR : BR), s: 'OH', w: measure(ctx, 'OH', { size: SZ, weight: 600 }), from: c }; }
    /* the molecule, with its branch or its alkoxy label, sits mid-way between the headline and the map */
    const top = Math.min(...V.map((v) => v.y), br ? br.y : Infinity) - 28;
    const bot = Math.max(...V.map((v) => v.y)) + (m.alcohol ? 28 : 68);
    const dy = (BAND[0] + BAND[1]) / 2 - (top + bot) / 2;
    V.forEach((v) => { v.y += dy; }); if (br) br.y += dy;
    return { V, br };
  }
  const trim = (a, b) => {
    const dx = b.x - a.x, dy = b.y - a.y, L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L;
    const cut = (p) => Math.min((p.w / 2 + 8) / Math.max(Math.abs(ux), 1e-6), 24 / Math.max(Math.abs(uy), 1e-6));
    const ca = cut(a), cb = cut(b);
    return [a.x + ux * ca, a.y + uy * ca, b.x - ux * cb, b.y - uy * cb];
  };
  const r1 = (x) => Math.round(x);
  /* the scene as keyed parts, so a change keeps what both states share and crossfades the rest */
  function moleculeParts(m, ctx) {
    const { V, br } = layout(m, ctx), out = [], ink = PAL.ink;
    const boxOf = (ps, pad) => {
      const l = Math.min(...ps.map((p) => p.x - p.w / 2)) - pad, r = Math.max(...ps.map((p) => p.x + p.w / 2)) + pad;
      const t = Math.min(...ps.map((p) => p.y)) - 20 - pad, b = Math.max(...ps.map((p) => p.y)) + 20 + pad;
      return { l, r, t, b };
    };
    const hl = (bx) => (c) => {
      c.save(); c.beginPath(); c.roundRect(bx.l, bx.t, bx.r - bx.l, bx.b - bx.t, 14);
      c.fillStyle = alpha(PAL.ink, 0.07); c.fill(); c.strokeStyle = alpha(PAL.ink, 0.35); c.lineWidth = 2; c.stroke(); c.restore();
    };
    if (m.alcohol) {
      const o = br ?? V.find((v) => v.oh), bx = boxOf([o], 8);
      out.push({ key: `hl|${r1(bx.l)}|${r1(bx.t)}|${r1(bx.r)}|${r1(bx.b)}`, draw: hl(bx) });
    } else {
      const ps = V.filter((v) => v.el === 'O' || m.alkoxy.has(v.i)), bx = boxOf(ps, 10);
      out.push({ key: `hl|${r1(bx.l)}|${r1(bx.t)}|${r1(bx.r)}|${r1(bx.b)}`, draw: hl(bx) });
      const lx = (bx.l + bx.r) / 2, ly = bx.b + 26;
      out.push({ key: `alk|${m.parts.alk}|${r1(lx)}|${r1(ly)}`, draw: (c) => text(c, m.parts.alk, lx, ly, ink, { size: 24, align: 'center' }) });
    }
    for (let j = 0; j + 1 < V.length; j++) {
      const s = trim(V[j], V[j + 1]);
      out.push({ key: `b|${s.map(r1).join('|')}`, draw: (c) => line(c, ...s, ink, 3) });
    }
    if (br) {
      const s = trim(br.from, br);
      out.push({ key: `b|${s.map(r1).join('|')}`, draw: (c) => line(c, ...s, ink, 3) });
      out.push({ key: `t|OH|${r1(br.x)}|${r1(br.y)}`, draw: (c) => text(c, 'OH', br.x, br.y, ink, { size: SZ, weight: 600, align: 'center' }) });
    }
    V.forEach((v) => {
      out.push({ key: `t|${v.s}|${r1(v.x)}|${r1(v.y)}`, draw: (c) => text(c, v.s, v.x, v.y, ink, { size: SZ, weight: 600, align: 'center' }) });
      if (v.el === 'C' && m.base.has(v.i)) {
        const num = m.number(v.i), ly = v.y + (v.up ? 50 : -50);
        out.push({ key: `n|${num}|${r1(v.x)}|${r1(ly)}`, draw: (c) => text(c, String(num), v.x, ly, PAL.muted, { size: 19, align: 'center' }) });
      }
    });
    const hits = V.map((v) => ({ x: v.x, y: v.y, r: Math.max(24, v.w / 2 + 6), name: groupName(m, v.j) }));
    if (br) hits.push({ x: br.x, y: br.y, r: 28, name: 'hydroxyl group, –OH' });
    return { out, hits };
  }
  /* ---------- the map: every place the oxygen atom can go ---------- */
  const MX = 800, THT = 48, YA = 457, YCH = 523, YE = 589;
  const cw = (n) => (n === 6 ? 194 : 226), nameSize = (n) => (n === 6 ? 21 : 24);   /* six carbons fill the width; fewer take larger tiles */
  const mapX = (n, i) => MX + (i - (n + 1) / 2) * cw(n);             /* carbon i, counted from the left */
  const places = (n) => [
    ...Array.from({ length: n }, (_, i) => ({ value: `oh-${i + 1}`, x: mapX(n, i + 1), y: YA })),
    ...Array.from({ length: n - 1 }, (_, i) => ({ value: `oe-${i + 1}`, x: mapX(n, i + 1.5), y: YE })),
  ].map((q) => ({ ...q, m: molecule(n, q.value) }));
  function mapParts(m) {
    const out = [], hs = [], ink = PAL.ink, mut = PAL.muted, n = m.n, CW = cw(n), TWD = CW - 10, sel = `${m.alcohol ? 'oh' : 'oe'}-${m.k}`;
    const lab = (s1, s2, y) => {
      out.push({ key: `ml|${s1}`, draw: (c) => { text(c, s1, 36, y - 12, ink, { size: 25, weight: 600 }); text(c, s2, 36, y + 15, mut, { size: 20 }); } });
    };
    lab('alcohols', '–OH on a carbon', YA);
    lab('ethers', '–O– between two', YE);
    out.push({ key: 'ml|chain', draw: (c) => text(c, 'the carbon chain', 36, YCH, mut, { size: 20 }) });
    for (let i = 1; i <= n; i++) {
      const x = mapX(n, i);
      out.push({ key: `mc|${r1(x)}`, draw: (c) => { text(c, 'C', x, YCH, ink, { size: 24, weight: 600, align: 'center' }); line(c, x, YA + THT / 2 + 3, x, YCH - 19, alpha(mut, 0.7), 1.5); } });
      if (i < n) out.push({ key: `mb|${r1(x)}`, draw: (c) => { line(c, x + 16, YCH, x + CW - 16, YCH, ink, 2.5); line(c, x + CW / 2, YCH + 4, x + CW / 2, YE - THT / 2 - 3, alpha(mut, 0.7), 1.5); } });
      hs.push({ x, y: YCH, r: 16, name: `${ORD[i]} carbon atom from the left` });
    }
    places(n).forEach((q) => {
      const on = q.value === sel, twin = !on && q.m.alcohol === m.alcohol && q.m.name === m.name;
      const box = (c) => { c.beginPath(); c.roundRect(q.x - TWD / 2, q.y - THT / 2, TWD, THT, 10); };
      out.push({ key: `mt|${q.value}|${r1(q.x)}|${on ? 2 : twin ? 1 : 0}`, draw: (c) => {
        c.save(); box(c);
        if (on || twin) { c.fillStyle = alpha(PAL.ink, on ? 0.1 : 0.05); c.fill(); }
        c.strokeStyle = on ? ink : alpha(PAL.ink, twin ? 0.55 : 0.22); c.lineWidth = on ? 3 : 1.5;
        if (twin) c.setLineDash([7, 5]);
        c.stroke(); c.restore();
      } });
      const nm = nb(q.m.name);
      out.push({ key: `mn|${q.value}|${r1(q.x)}|${on ? 1 : 0}`, draw: (c) => text(c, nm, q.x, q.y, ink, { size: nameSize(n), weight: on ? 600 : 400, align: 'center' }) });
      const where = q.m.alcohol ? `–OH on the ${ORD[q.m.k]} carbon atom` : `–O– between the ${ORD[q.m.k]} and ${ORD[q.m.k + 1]} carbon atoms`;
      hs.push({ x: q.x - 50, y: q.y, r: 42, name: `${where}: ${nm}${twin ? `, the chosen molecule turned end for end` : ''}` },
        { x: q.x + 50, y: q.y, r: 42, name: `${where}: ${nm}${twin ? `, the chosen molecule turned end for end` : ''}` });
    });
    return { out, hits: hs };
  }
  let hits = [];
  F.hover(d.stage, () => hits);
  d.c.style.cursor = 'pointer';
  d.c.addEventListener('click', (ev) => {
    const b = d.c.getBoundingClientRect(); if (!b.width) return;
    const px = ((ev.clientX - b.left) * 1400) / b.width, py = ((ev.clientY - b.top) * 1400) / b.width;
    const q = places(shown.n).find((t) => Math.abs(px - t.x) <= cw(shown.n) / 2 - 1 && Math.abs(py - t.y) <= THT / 2 + 6);
    if (q) oPick.drive(q.value);
  });
  function parts(m, ctx) {
    const a = moleculeParts(m, ctx), b = mapParts(m);
    return { out: [...a.out, ...b.out], hits: [...a.hits, ...b.hits] };
  }
  function draw2d() {
    const { ctx } = begin(d.c);
    topline(ctx, headlineOf(shown));
    const cur = parts(shown, ctx);
    const k = last && prev ? last.k : 1;
    if (k >= 1) { prev = null; cur.out.forEach((p) => p.draw(ctx)); }
    else {
      const old = parts(prev, ctx), had = new Set(old.out.map((p) => p.key)), has = new Set(cur.out.map((p) => p.key));
      const aOut = Math.max(0, 1 - k / 0.6), aIn = Math.max(0, (k - 0.4) / 0.6);
      old.out.filter((p) => !has.has(p.key)).forEach((p) => F.faded(ctx, aOut, [0, 10 * k], () => p.draw(ctx)));
      cur.out.forEach((p) => (had.has(p.key) ? p.draw(ctx) : F.faded(ctx, aIn, [0, -10 * (1 - k)], () => p.draw(ctx))));
    }
    hits = cur.hits;
  }

  const ro = F.readout(d);
  function draw() {
    ro.set(readoutOf(shown), noteOf(shown), { form: shown.alcohol ? 'alcohol' : 'ether' });
    draw2d();
  }
  register(d.fig, { update: () => {}, draw });
})();
};
