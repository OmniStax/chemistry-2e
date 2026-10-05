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
   Flat: the condensed zigzag the book draws, groups at the vertices, an
   interior –OH as a branch outward, locants on the inner side, the
   functional group under a soft ink highlight (the book's red is
   emphasis). 3D: ball-and-stick at true bond lengths and tetrahedral
   angles, atoms by F.el; no ground, so yaw is free and the molecule
   idles round, pitch within ±1.2 rad. Still: a structure has no clock;
   a change crossfades only the parts that change.
===================================================================== */
(function () {
  const H = 480, d = sim('sim-oxygen-chain', H);
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
  const headlineOf = (m) => nb(m.alcohol
    ? (m.n === 2 ? 'With the –OH group on ethane, the alcohol is ethanol.' : `With the –OH group on carbon ${m.L} of ${ALKANE[m.n]}, the alcohol is ${m.name}.`)
    : `The oxygen atom joins ${m.small === 2 ? 'an' : 'a'} ${ALKYL[m.small]} group to the ${ALKANE[m.large]} base chain, so the ether is ${m.name}.`);
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
    const f = `\\qquad\\mk{f}{\\text{C}_{${m.n}}\\text{H}_{${2 * m.n + 2}}\\text{O}}`;
    const loc = m.parts.loc ? ub('loc', m.parts.loc + '-', 'carbon') : '';
    if (m.alcohol) return loc + ub('base', m.parts.base, 'chain') + ub('suf', 'ol', '–OH') + f;
    const g = m.parts.group.replace(/_\{(\d+)\}/g, '}_{$1}\\text{').replace(/^/, '\\text{') + '}';
    return loc + `\\mk{alk}{\\underbrace{\\text{${m.parts.alk}}}_{${g}}}` + ub('base', m.parts.base, 'base chain') + f;
  }

  /* ---------- controls ---------- */
  const view = F.choice(d.controls, { label: '\\text{view}', key: 'view', options: [{ value: '2d', label: '2D' }, { value: '3d', label: '3D' }], value: '2d',
    aria: 'a flat drawing or a model to turn', ms: 0, onInput: () => show() });
  let last = null, prev = null;
  const nPick = F.choice(d.controls, { label: '\\text{carbons}', key: 'carbons', options: NS.map((n) => ({ value: String(n), label: String(n) })), value: '5',
    aria: 'the number of carbon atoms in the chain', onInput: () => switchN() });
  const boxes = {}, picks = {};
  NS.forEach((n) => {
    const box = document.createElement('div'); box.style.display = n === 5 ? 'contents' : 'none'; d.controls.appendChild(box); boxes[n] = box;
    picks[n] = F.select(box, { label: '\\text{oxygen}', key: `oxygen-${n}`, options: optionsFor(n), value: n === 5 ? 'oh-2' : 'oh-1',
      aria: 'where the oxygen atom goes, counting carbons from the left', onInput: () => { prev = shown; last = picks[n]; shown = state(); draw(); } });
  });
  const state = () => molecule(+nPick.value, picks[+nPick.value].value);
  let shown = state();
  function switchN() {
    const n = +nPick.value, [g, ks] = shown ? [shown.alcohol ? 'oh' : 'oe', shown.k] : ['oh', 1];
    const k = Math.min(ks, g === 'oh' ? n : n - 1);
    picks[n].set(`${g}-${k}`);
    NS.forEach((x) => { boxes[x].style.display = x === n ? 'contents' : 'none'; });
    prev = shown; last = nPick; shown = state(); draw();
  }

  /* ---------- flat drawing ---------- */
  const DX = 172, AMP = DX * Math.tan(35.26 * RAD), BR = 104, YC = 270, SZ = 30;
  function layout(m, ctx) {
    const cnt = m.B.length, x0 = 700 - ((cnt - 1) * DX) / 2;
    const V = m.B.map((v, j) => {
      const up = j % 2 === 1, s = groupText(m, j), w = measure(ctx, s, { size: SZ, weight: 600 });
      return { ...v, j, x: x0 + j * DX, y: YC + (up ? -AMP / 2 : AMP / 2), up, s, w };
    });
    let br = null;
    if (m.branch) { const c = V.find((v) => v.i === m.branch); br = { x: c.x, y: c.y + (c.up ? -BR : BR), s: 'OH', w: measure(ctx, 'OH', { size: SZ, weight: 600 }), from: c }; }
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
  function parts(m, ctx) {
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
  let hits = [];
  F.hover(d.stage, () => hits);
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

  /* ---------- the model ---------- */
  const BOND = { CC: 1.54, CO: 1.43, OC: 1.43, CH: 1.09, OH: 0.96 };
  const R3 = { C: 0.34, O: 0.32, H: 0.2 };
  const add = (p, q, s = 1) => p.map((x, i) => x + q[i] * s);
  const sub3 = (p, q) => p.map((x, i) => x - q[i]);
  const dot3 = (p, q) => p.reduce((s, x, i) => s + x * q[i], 0);
  const norm = (v) => { const l = Math.hypot(...v); return v.map((x) => x / l); };
  const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  /* v turned by θ about the unit axis a (Rodrigues) */
  const turn = (v, a, t) => add(add(v.map((x) => x * Math.cos(t)), cross(a, v), Math.sin(t)), a, dot3(a, v) * (1 - Math.cos(t)));
  const ZA = 35.26 * RAD, TET = 109.47 * RAD, HALF = 54.74 * RAD;
  const bondDir = (j) => [Math.cos(ZA), j % 2 === 0 ? Math.sin(ZA) : -Math.sin(ZA), 0];   /* vertex j to j + 1; vertex 0 sits low */
  function model(m) {
    const P = [[0, 0, 0]];
    m.B.forEach((v, j) => { if (j + 1 < m.B.length) P.push(add(P[j], bondDir(j), BOND[v.el + m.B[j + 1].el])); });
    const atoms = [], sticks = [];
    m.B.forEach((v, j) => atoms.push({ el: v.el, p: P[j], name: v.el === 'O' ? (v.oh ? 'oxygen atom of the –OH group' : 'oxygen atom of the ether')
      : m.alcohol || m.base.has(v.i) ? `carbon atom ${m.number(v.i)} of the ${m.alcohol ? 'chain' : 'base chain'}` : `carbon atom of the ${m.parts.alk} group` }));
    for (let j = 0; j + 1 < m.B.length; j++) sticks.push([P[j], P[j + 1]]);
    const H = (from, dir, len) => { const q = add(from, dir, len); atoms.push({ el: 'H', p: q, name: 'hydrogen atom' }); sticks.push([from, q]); };
    m.B.forEach((v, j) => {
      const p = P[j], U = [];
      if (j > 0) U.push(norm(sub3(P[j - 1], p)));
      if (j + 1 < m.B.length) U.push(norm(sub3(P[j + 1], p)));
      /* the way the zigzag would run on from an end */
      const onward = j === 0 ? [-Math.cos(ZA), Math.sin(ZA), 0] : bondDir(j);
      if (v.el === 'O') { if (v.oh) H(p, onward, BOND.OH); return; }
      if (U.length === 2) {
        const b = norm(add(U[0], U[1]).map((x) => -x)), z = norm(cross(U[0], U[1]));
        const up = add(b.map((x) => x * Math.cos(HALF)), z, Math.sin(HALF)), dn = add(b.map((x) => x * Math.cos(HALF)), z, -Math.sin(HALF));
        if (m.branch === v.i) {
          const o = add(p, up, BOND.CO);
          atoms.push({ el: 'O', p: o, name: 'oxygen atom of the –OH group' }); sticks.push([p, o]);
          const u = norm(sub3(p, o)), perp = norm(add(b, u, -dot3(b, u)));
          H(o, add(u.map((x) => x * Math.cos(TET)), perp, Math.sin(TET)), BOND.OH);
          H(p, dn, BOND.CH);
        } else { H(p, up, BOND.CH); H(p, dn, BOND.CH); }
      } else {
        const a = U[0];
        [0, 120, 240].forEach((t) => H(p, turn(onward, a, t * RAD), BOND.CH));
      }
    });
    const c = atoms.filter((x) => x.el !== 'H').reduce((s, x) => add(s, x.p), [0, 0, 0]).map((x) => x / atoms.filter((y) => y.el !== 'H').length);
    atoms.forEach((x) => { x.p = sub3(x.p, c); }); sticks.forEach((s) => { s[0] = sub3(s[0], c); s[1] = sub3(s[1], c); });
    return { atoms, sticks };
  }
  let v3 = null, g3 = null, sig3 = '';
  function build() {
    const key = [shown.n, shown.alcohol, shown.k, PAL.ink, F.el('C'), F.el('O'), F.el('H')].join('|');
    if (key === sig3) return; sig3 = key;
    v3.clear();
    const { atoms, sticks } = model(shown);
    sticks.forEach(([a, b]) => F.mesh.stick(g3, a, b, 0.07, PAL.ink));
    atoms.forEach((a) => v3.pickable(F.mesh.sphere(g3, a.p, R3[a.el], F.el(a.el)), a.name));
  }
  const three = () => view.value === '3d' && v3 && v3.scene;
  function show() {
    if (view.value === '3d' && !v3) {
      v3 = F.view3d(d.stage, { h: H, dist: 11, tilt: 0.25, spin: 'idle', yaw: 'free', pitch: [-1.2, 1.2],
        views: [{ label: 'front', yaw: 0, pitch: 0.2 }, { label: 'along the chain', yaw: Math.PI / 2, pitch: 0.2 }] });
      g3 = v3.scene ? v3.part(0) : null;
    }
    const on = !!three();
    d.c.style.display = on ? 'none' : '';
    if (v3) [v3.wrap, d.stage.querySelector('.view3d-bar')].forEach((e) => { if (e) e.style.display = on ? '' : 'none'; });
    draw();
  }
  const ro = F.readout(d);
  function draw() {
    ro.set(readoutOf(shown), noteOf(shown), { form: shown.alcohol ? 'alcohol' : 'ether' });
    if (three()) { build(); v3.headline(headlineOf(shown)); hits = []; v3.invalidate(); }
    else draw2d();
  }
  register(d.fig, { update: () => {}, draw });
})();
};
