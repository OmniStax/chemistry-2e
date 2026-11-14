/* Figures for section 7.3 Lewis Symbols and Structures. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['7.3'] = function (root, F) {
const { tex, PAL, register, begin, line, text, headline } = F;
const RAD = Math.PI / 180;

/* =====================================================================
   SIM: the five steps of writing a Lewis structure, with the electrons
   around each atom counted beside it. Steps are discrete states, so they
   are a choice; there is no clock. Everything is ink; what the current
   step places carries the book's red mark, F.cat(0).
   The structures are laid out as the book's images draw them (formate
   with one oxygen above the carbon and one to its right, the double bond
   to the right one); the lone pairs sit on the sides the images show.
===================================================================== */
(function () {
  const H = 480, SX = 400, SY = 276, B = 130;      /* stage height, the structure's centre, one bond length */
  const PX = 760;                                   /* left edge of the count beside the structure */
  const NAMES = { H: 'hydrogen', C: 'carbon', N: 'nitrogen', O: 'oxygen', F: 'fluorine', Si: 'silicon' };
  const U = -90, R = 0, D = 90, L = 180;            /* the four sides of an atom, as screen angles */
  /* atoms in bond lengths; v: valence electrons; lp3, lp4, lp5: the sides that carry a lone pair after steps 3, 4, 5;
     order5: bond orders after step 5; moves: the lone pairs of step 4 that become bonds in step 5 [atom, side, bond];
     rows: the atoms counted beside the structure, like atoms in one row; s3 to s5: what the headline says */
  const MOLS = [
    { label: 'SiH₄', name: 'SiH_{4}', tex: '\\text{SiH}_4', charge: 0,
      atoms: [{ s: 'Si', x: 0, y: 0, v: 4 }, { s: 'H', x: 0, y: -1, v: 1 }, { s: 'H', x: 1, y: 0, v: 1 }, { s: 'H', x: 0, y: 1, v: 1 }, { s: 'H', x: -1, y: 0, v: 1 }],
      bonds: [[0, 1], [0, 2], [0, 3], [0, 4]], lp3: [[], [], [], [], []], lp4: [[], [], [], [], []], lp5: [[], [], [], [], []], order5: [1, 1, 1, 1], moves: [],
      rows: [['Si', [0]], ['each H', [1, 2, 3, 4]]],
      s3: 'Hydrogen takes no lone pairs, and no electrons remain.', s4: 'No electrons remain to place.', s5: 'Silicon already has an octet, so nothing changes.' },
    { label: 'CHO₂⁻', name: 'CHO_{2}⁻', tex: '\\text{CHO}_2{}^{-}', charge: -1,
      atoms: [{ s: 'C', x: 0, y: 0, v: 4 }, { s: 'H', x: -1, y: 0, v: 1 }, { s: 'O', x: 0, y: -1, v: 6 }, { s: 'O', x: 1, y: 0, v: 6 }],
      bonds: [[0, 1], [0, 2], [0, 3]], lp3: [[], [], [L, U, R], [U, R, D]], lp4: [[], [], [L, U, R], [U, R, D]], lp5: [[], [], [L, U, R], [R, D]], order5: [1, 1, 2], moves: [[3, U, 2]],
      rows: [['C', [0]], ['H', [1]], ['top O', [2]], ['right O', [3]]],
      s3: 'Lone pairs on the two oxygen atoms use 12 electrons, and none remain.', s4: 'No electrons remain to place.',
      s5: 'Carbon has only 6 electrons, so a lone pair of one oxygen atom becomes a second C–O bond.' },
    { label: 'NO⁺', name: 'NO⁺', tex: '\\text{NO}^{+}', charge: 1,
      atoms: [{ s: 'N', x: -0.5, y: 0, v: 5 }, { s: 'O', x: 0.5, y: 0, v: 6 }],
      bonds: [[0, 1]], lp3: [[L, U], [U, R]], lp4: [[L, U], [U, R]], lp5: [[L], [R]], order5: [3], moves: [[0, U, 0], [1, U, 0]],
      rows: [['N', [0]], ['O', [1]]],
      s3: 'Lone pairs on both atoms use 8 electrons, and none remain.', s4: 'No electrons remain to place.',
      s5: 'Neither atom has an octet, so two lone pairs become bonds: an N–O triple bond.' },
    { label: 'OF₂', name: 'OF_{2}', tex: '\\text{OF}_2', charge: 0,
      atoms: [{ s: 'O', x: 0, y: 0, v: 6 }, { s: 'F', x: -1, y: 0, v: 7 }, { s: 'F', x: 1, y: 0, v: 7 }],
      bonds: [[0, 1], [0, 2]], lp3: [[], [L, U, D], [U, R, D]], lp4: [[U, D], [L, U, D], [U, R, D]], lp5: [[U, D], [L, U, D], [U, R, D]], order5: [1, 1], moves: [],
      rows: [['O', [0]], ['each F', [1, 2]]],
      s3: 'Lone pairs on the two fluorine atoms use 12 electrons, and 4 remain.', s4: 'The 4 remaining electrons go on the central oxygen atom as two lone pairs.',
      s5: 'Each atom already has an octet, so nothing changes.' },
    { label: 'HCN', name: 'HCN', tex: '\\text{HCN}', charge: 0,
      atoms: [{ s: 'H', x: -1, y: 0, v: 1 }, { s: 'C', x: 0, y: 0, v: 4 }, { s: 'N', x: 1, y: 0, v: 5 }],
      bonds: [[1, 0], [1, 2]], lp3: [[], [], [U, R, D]], lp4: [[], [], [U, R, D]], lp5: [[], [], [R]], order5: [1, 3], moves: [[2, U, 1], [2, D, 1]],
      rows: [['H', [0]], ['C', [1]], ['N', [2]]],
      s3: 'Lone pairs on the nitrogen atom use 6 electrons, and none remain.', s4: 'No electrons remain to place.',
      s5: 'Carbon has only 4 electrons, so two lone pairs of nitrogen become bonds: a C–N triple bond.' },
    { label: 'HCCH', name: 'HCCH', tex: '\\text{HCCH}', charge: 0,
      atoms: [{ s: 'H', x: -1.5, y: 0, v: 1 }, { s: 'C', x: -0.5, y: 0, v: 4 }, { s: 'C', x: 0.5, y: 0, v: 4 }, { s: 'H', x: 1.5, y: 0, v: 1 }],
      bonds: [[1, 0], [1, 2], [2, 3]], lp3: [[], [], [], []], lp4: [[], [U], [U], []], lp5: [[], [], [], []], order5: [1, 3, 1], moves: [[1, U, 1], [2, U, 1]],
      rows: [['each C', [1, 2]], ['each H', [0, 3]]],
      s3: 'Hydrogen takes no lone pairs, and 4 electrons remain.', s4: 'The 4 remaining electrons go on the two carbon atoms as lone pairs.',
      s5: 'Each carbon has only 6 electrons, so both lone pairs become bonds: a C–C triple bond.' },
  ];
  const WORD = ['No', 'One', 'Two', 'Three', 'Four'];
  const BONDNAME = ['', 'single', 'double', 'triple'];
  const sum = (a) => a.reduce((t, x) => t + x, 0);
  const total = (m) => sum(m.atoms.map((a) => a.v)) - m.charge;
  const gapOf = (sym) => (sym.length > 1 ? 40 : 28);       /* where a bond stops short of a symbol */
  const ringOf = (sym) => (sym.length > 1 ? 46 : 38);      /* how far a symbol's dots stand from its centre */

  /* the state after step s: bond orders (none at step 1), each atom's lone pairs, and the electrons round it */
  function state(mi, s) {
    const m = MOLS[mi];
    const orders = s < 2 ? m.bonds.map(() => 0) : s < 5 ? m.bonds.map(() => 1) : m.order5;
    const lp = s < 3 ? m.atoms.map(() => []) : s === 3 ? m.lp3 : s === 4 ? m.lp4 : m.lp5;
    const shared = m.atoms.map((a, i) => sum(m.bonds.map(([p, q], j) => (p === i || q === i ? orders[j] : 0))));
    const count = m.atoms.map((a, i) => (s === 1 ? a.v : 2 * lp[i].length + 2 * shared[i]));
    return { m, s, orders, lp, shared, count, inBonds: 2 * sum(orders), inPairs: 2 * sum(lp.map((x) => x.length)) };
  }
  /* where the atoms stand: the structure centred on (SX, SY), the lone atoms of step 1 a little further apart */
  function place(m, s) {
    const k = B * (s === 1 ? 1.15 : 1), xs = m.atoms.map((a) => a.x * k), ys = m.atoms.map((a) => a.y * k);
    const ox = SX - (Math.min(...xs) + Math.max(...xs)) / 2, oy = SY - (Math.min(...ys) + Math.max(...ys)) / 2;
    return m.atoms.map((a, i) => [xs[i] + ox, ys[i] + oy]);
  }
  /* the sides the valence electrons of a lone atom take, starting on the side that will bond */
  function sides(m, i) {
    const a = m.atoms[i], bond = m.bonds.find(([p, q]) => p === i || q === i), b = m.atoms[bond[0] === i ? bond[1] : bond[0]];
    const first = Math.round(Math.atan2(b.y - a.y, b.x - a.x) / RAD / 90) * 90;
    return [first, first - 90, first + 180, first + 90];
  }
  /* everything a state draws in the structure, each part keyed so that a change of step moves or fades only what changed */
  function parts(mi, s) {
    const st = state(mi, s), m = st.m, P = place(m, s), out = [];
    const offOf = (n, o) => ((n - 1) / 2 - o) * 12;      /* the lines of a multiple bond, the first one lowest */
    m.atoms.forEach((a, i) => {
      const [x, y] = P[i], r = ringOf(a.s);
      out.push({ key: `${mi}a${i}`, kind: 'atom', x, y, sym: a.s, i });
      if (s === 1) {
        const sd = sides(m, i);
        for (let e = 0; e < a.v; e++) { const k = e % 4, paired = a.v > 4 && (e >= 4 || e + 4 < a.v); out.push({ key: `${mi}v${i}_${e}`, kind: 'dot', x, y, ang: sd[k], r, off: paired ? (e >= 4 ? -8 : 8) : 0 }); }
      } else {
        st.lp[i].forEach((ang) => {
          const mv = s === 4 && m.moves.find(([ma, mang]) => ma === i && mang === ang);
          let to = null;
          if (mv) {
            const [p, q] = m.bonds[mv[2]], n = m.order5[mv[2]], o = 1 + m.moves.filter((w) => w[2] === mv[2]).indexOf(mv);
            const mx = (P[p][0] + P[q][0]) / 2, my = (P[p][1] + P[q][1]) / 2, dx = P[q][0] - P[p][0], dy = P[q][1] - P[p][1], len = Math.hypot(dx, dy);
            to = { x: mx - (dy / len) * offOf(n, o), y: my + (dx / len) * offOf(n, o), ux: dx / len, uy: dy / len };
          }
          [8, -8].forEach((off) => out.push({ key: `${mi}p${i}_${ang}_${off}`, kind: 'dot', x, y, ang, r, off, to, pair: off > 0, i }));
        });
      }
    });
    m.bonds.forEach(([p, q], j) => {
      const n = st.orders[j];
      for (let o = 0; o < n; o++) out.push({ key: `${mi}b${j}_${o}`, kind: 'bond', x1: P[p][0], y1: P[p][1], x2: P[q][0], y2: P[q][1], g1: gapOf(m.atoms[p].s), g2: gapOf(m.atoms[q].s), off: offOf(n, o), j, first: o === 0 });
    });
    if (s > 1 && m.charge) {
      const xs = P.map((p) => p[0]), ys = P.map((p) => p[1]);
      out.push({ key: `${mi}br`, kind: 'brackets', l: Math.min(...xs) - 78, r: Math.max(...xs) + 78, t: Math.min(...ys) - 72, b: Math.max(...ys) + 72, charge: m.charge > 0 ? '+' : '−' });
    }
    return out;
  }
  const NUM = ['x', 'y', 'x1', 'y1', 'x2', 'y2', 'off', 'l', 'r', 't', 'b'];
  const between = (a, b, k) => { const o = { ...b }; NUM.forEach((f) => { if (typeof b[f] === 'number' && typeof a[f] === 'number') o[f] = a[f] + (b[f] - a[f]) * k; }); return o; };
  const dotAt = (p) => { const c = Math.cos(p.ang * RAD), s = Math.sin(p.ang * RAD); return [p.x + c * p.r - s * p.off, p.y + s * p.r + c * p.off]; };

  const d = F.sim(root, 'sim-lewis-steps', H);
  const pickM = F.select(d.controls, { label: '\\text{molecule or ion}', options: MOLS.map((m, i) => ({ value: String(i), label: m.label })), value: '1' });
  const pickS = F.choice(d.controls, { label: '\\text{step}', options: [1, 2, 3, 4, 5].map((s) => ({ value: String(s), label: String(s) })), value: '1' });
  let hits = [];
  F.hover(d.stage, () => hits);

  function drawPart(ctx, p, color, a) {
    if (a <= 0) return;
    ctx.save(); ctx.globalAlpha *= a;
    if (p.kind === 'atom') text(ctx, p.sym, p.x, p.y + 1, PAL.ink, { size: 44, weight: 600, align: 'center' });
    else if (p.kind === 'dot') { const [x, y] = dotAt(p); F.dot(ctx, x, y, color, true, 5.5); }
    else if (p.kind === 'bond') {
      const dx = p.x2 - p.x1, dy = p.y2 - p.y1, len = Math.hypot(dx, dy), ux = dx / len, uy = dy / len, nx = -uy * p.off, ny = ux * p.off;
      line(ctx, p.x1 + ux * p.g1 + nx, p.y1 + uy * p.g1 + ny, p.x2 - ux * p.g2 + nx, p.y2 - uy * p.g2 + ny, color, 4);
    } else if (p.kind === 'brackets') {
      ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3.5; ctx.lineJoin = 'miter'; ctx.beginPath();
      ctx.moveTo(p.l + 18, p.t); ctx.lineTo(p.l, p.t); ctx.lineTo(p.l, p.b); ctx.lineTo(p.l + 18, p.b);
      ctx.moveTo(p.r - 18, p.t); ctx.lineTo(p.r, p.t); ctx.lineTo(p.r, p.b); ctx.lineTo(p.r - 18, p.b); ctx.stroke();
      text(ctx, p.charge, p.r + 12, p.t + 2, PAL.ink, { size: 36, weight: 600 });
    }
    ctx.restore();
  }

  /* The count beside the structure. Step 1: the valence electrons each element brings, as the book adds them.
     Later steps: the pairs round each atom, a bar for a shared pair and two dots for a lone pair, as in the
     structure, with a dashed place for each pair an octet (or hydrogen's two electrons) still lacks. */
  const SLOT = 76, GX = PX + 170, TX = PX + 590;
  function pairGlyph(ctx, kind, x, y, color) {
    if (kind === 'shared') line(ctx, x - 22, y, x + 22, y, color, 4);
    else if (kind === 'lone') { F.dot(ctx, x - 9, y, color, true, 5.5); F.dot(ctx, x + 9, y, color, true, 5.5); }
    else { ctx.save(); ctx.strokeStyle = PAL.muted; ctx.lineWidth = 2; ctx.setLineDash([5, 5]); ctx.beginPath(); ctx.roundRect(x - 24, y - 11, 48, 22, 11); ctx.stroke(); ctx.restore(); }
  }
  function panel(ctx, st, prev, k, red) {
    const m = st.m, rowsOut = [];
    if (st.s === 1) {
      const syms = [...new Set(m.atoms.map((a) => a.s))];
      syms.forEach((sym) => { const n = m.atoms.filter((a) => a.s === sym).length, v = m.atoms.find((a) => a.s === sym).v; rowsOut.push({ label: sym, dots: v, hollow: false, says: n > 1 ? `${v} × ${n} = ${v * n}` : String(v) }); });
      if (m.charge) rowsOut.push({ label: m.charge < 0 ? '1− charge' : '1+ charge', dots: 1, hollow: m.charge > 0, says: m.charge < 0 ? '+1' : '−1' });
    } else {
      m.rows.forEach(([label, atoms]) => {
        const i = atoms[0], cap = m.atoms[i].s === 'H' ? 1 : 4, sh = st.shared[i], lo = st.lp[i].length, psh = prev.shared[i], plo = prev.lp[i].length;
        const slots = [];
        for (let q = 0; q < sh; q++) slots.push(['shared', q >= psh]);
        for (let q = 0; q < lo; q++) slots.push(['lone', q >= plo]);
        while (slots.length < cap) slots.push(['none', false]);
        rowsOut.push({ label, slots, says: `${st.count[i]} of ${2 * cap}` });
      });
    }
    const pitch = 60, y0 = SY + 4 - ((rowsOut.length - 1) * pitch) / 2;
    text(ctx, st.s === 1 ? 'valence electrons' : 'electrons around each atom', PX, y0 - 58, PAL.muted, { size: 24 });
    rowsOut.forEach((r, n) => {
      const y = y0 + n * pitch;
      text(ctx, r.label, PX, y, PAL.ink, { size: 30, weight: 600 });
      if (r.slots) r.slots.forEach(([kind, fresh], q) => { ctx.save(); if (fresh) ctx.globalAlpha *= k; pairGlyph(ctx, kind, GX + SLOT * q + 24, y, fresh ? red : PAL.ink); ctx.restore(); });
      else for (let q = 0; q < r.dots; q++) F.dot(ctx, GX + 8 + 24 * q, y, PAL.ink, !r.hollow, 5.5);
      text(ctx, r.says, TX, y, PAL.ink, { size: 28, align: 'right' });
    });
    if (st.s > 1) F.legend(ctx, { l: PX - 20, r: TX + 20, t: 0, b: H - 4 }, [
      { s: 'shared pair', draw: (c, x, y) => pairGlyph(c, 'shared', x, y, PAL.ink) },
      { s: 'lone pair', draw: (c, x, y) => pairGlyph(c, 'lone', x, y, PAL.ink) },
      { s: 'pair still lacking', draw: (c, x, y) => pairGlyph(c, 'none', x, y, PAL.ink) },
    ], { corner: 'bottom', row: true, panel: false, size: 21 });
  }

  function words(st) {
    const m = st.m, T = total(m), nb = m.bonds.length;
    switch (st.s) {
      case 1: return `${m.name} has ${T} valence electrons to place${m.charge < 0 ? ', one of them for the negative charge' : m.charge > 0 ? ', one fewer for the positive charge' : ''}.`;
      case 2: { const left = T - st.inBonds; return `${WORD[nb]} single bond${nb > 1 ? 's use' : ' uses'} ${st.inBonds} electrons, and ${left || 'none'} remain.`; }
      case 3: return m.s3;
      case 4: return m.s4;
      default: return m.s5;
    }
  }

  function draw() {
    const { ctx } = begin(d.c);
    const mi = +pickM.value, s = +pickS.value;
    const k = Math.min(pickM.k, pickS.k);
    const pm = pickM.k < 1 ? +pickM.from : mi, ps = pickS.k < 1 ? +pickS.from : s;
    const now = parts(mi, s), before = parts(pm, ps), fresh = new Set(parts(mi, Math.max(1, s - 1)).map((p) => p.key));
    const nowKeys = new Set(now.map((p) => p.key)), was = new Map(before.map((p) => [p.key, p]));
    const red = F.cat(0), sharing = pm === mi && ps === 4 && s === 5;
    before.filter((p) => !nowKeys.has(p.key)).forEach((p) => {
      if (sharing && p.to) {      /* a lone pair on its way into the bond: its two dots slide to where the new line is drawn */
        const [x, y] = dotAt(p), e = p.pair ? 9 : -9, tx = p.to.x + p.to.ux * e, ty = p.to.y + p.to.uy * e;
        ctx.save(); ctx.globalAlpha *= 1 - k * k; F.dot(ctx, x + (tx - x) * k, y + (ty - y) * k, red, true, 5.5); ctx.restore();
      } else drawPart(ctx, p, PAL.ink, 1 - k);
    });
    now.forEach((p) => {
      const color = s > 1 && !fresh.has(p.key) ? red : PAL.ink, old = was.get(p.key);
      drawPart(ctx, old ? between(old, p, k) : p, color, old ? 1 : sharing && p.kind === 'bond' ? k * k : k);
    });
    const st = state(mi, s), m = st.m, T = total(m);
    panel(ctx, st, state(mi, Math.max(1, s - 1)), pm === mi ? k : 1, red);
    headline(ctx, `Step ${s}: ${words(st)}`);
    const P = place(m, s);
    hits = m.atoms.map((a, i) => ({ x: P[i][0], y: P[i][1], r: 30, name: `${NAMES[a.s]} atom, ${st.count[i]} electron${st.count[i] === 1 ? '' : 's'}${s === 1 ? '' : ' around it'}` }));
    now.forEach((p) => {
      if (p.kind === 'bond' && p.first) { const [a, b] = m.bonds[p.j], o = st.orders[p.j]; hits.push({ x: (p.x1 + p.x2) / 2, y: (p.y1 + p.y2) / 2, r: 26, name: `${m.atoms[a].s}–${m.atoms[b].s} ${BONDNAME[o]} bond, ${2 * o} shared electrons` }); }
      else if (p.kind === 'dot' && s > 1 && p.pair) { const c = Math.cos(p.ang * RAD), sn = Math.sin(p.ang * RAD); hits.push({ x: p.x + c * p.r, y: p.y + sn * p.r, r: 16, name: `lone pair on ${NAMES[m.atoms[p.i].s]}` }); }
      else if (p.kind === 'brackets') hits.push({ x: p.r + 22, y: p.t + 2, r: 24, name: `charge of the ion, 1${p.charge}` });
    });
    if (s === 1) {
      const syms = [...new Set(m.atoms.map((a) => a.s))];
      const terms = syms.map((sym) => { const n = m.atoms.filter((a) => a.s === sym).length; return String(m.atoms.find((a) => a.s === sym).v * n); });
      tex(d.readout, `\\text{valence electrons in }${m.tex} = ${terms.join(' + ')}${m.charge ? (m.charge < 0 ? ' + 1' : ' - 1') : ''} = ${T}`);
    } else {
      tex(d.readout, `\\underbrace{${st.inBonds}}_{\\text{in bonds}} + \\underbrace{${st.inPairs}}_{\\text{in lone pairs}} + \\underbrace{${T - st.inBonds - st.inPairs}}_{\\text{still to place}} = ${T}\\text{ valence electrons}`);
    }
  }
  register(d.fig, { update: () => {}, draw });
})();
};
