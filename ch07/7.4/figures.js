/* Figures for section 7.4 Formal Charges and Resonance. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['7.4'] = function (root, F) {
const { tex, PAL, register, begin, line, text, headline, alpha, faded, mixColor } = F;
const NAMES = { C: 'carbon', N: 'nitrogen', O: 'oxygen', S: 'sulfur' };
const VALENCE = { C: 4, N: 5, O: 6, S: 6 };
const sum = (a) => a.reduce((t, x) => t + x, 0);
const signed = (q) => (q > 0 ? `+${q}` : q < 0 ? `−${-q}` : '0');
const texNum = (q, first) => (q < 0 ? (first ? `-${-q}` : `(-${-q})`) : String(q));
/* how far a picker's value v is shown: 1 at rest, k while it arrives, 1 − k while it leaves */
const shown = (p, v) => (p.value === v ? (p.from === v ? 1 : p.k) : p.from === v ? 1 - p.k : 0);

/* A Lewis structure at (cx, cy): atoms {s, x, y, lp} in canvas units; bonds [i, j, order], order 'h' for a full
   bond with a dashed partial bond beside it. Lone pairs sit opposite the atom's bonds, as the book sets them: one
   straight out, two to either side, three out and to either side. dots(i) colours atom i's lone pairs and
   bond(i, j, half) the half of bond i–j nearer i (half 0) or j (half 1). Returns the atoms' canvas points. */
function lewis(ctx, S, o) {
  const P = S.atoms.map((a) => [o.cx + a.x, o.cy + a.y]);
  const dots = o.dots || (() => PAL.ink), bcol = o.bond || (() => PAL.ink), sm = !!o.small;
  S.bonds.forEach(([i, j, n]) => {
    const [x1, y1] = P[i], [x2, y2] = P[j], L = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / L, uy = (y2 - y1) / L, g = sm ? 19 : 24;
    const ax = x1 + ux * g, ay = y1 + uy * g, bx = x2 - ux * g, by = y2 - uy * g, mx = (ax + bx) / 2, my = (ay + by) / 2;
    const sp = sm ? 8 : 10, lines = n === 'h' ? [[-sp / 2, null], [sp / 2, [7, 7]]] : Array.from({ length: n }, (_, k) => [(k - (n - 1) / 2) * sp, null]);
    lines.forEach(([off, dash]) => {
      const nx = -uy * off, ny = ux * off;
      line(ctx, ax + nx, ay + ny, mx + nx, my + ny, bcol(i, j, 0), 3.5, dash);
      line(ctx, mx + nx, my + ny, bx + nx, by + ny, bcol(i, j, 1), 3.5, dash);
    });
  });
  S.atoms.forEach((a, i) => {
    const [x, y] = P[i];
    text(ctx, a.s, x, y + 1, PAL.ink, { size: sm ? 28 : 34, weight: 600, align: 'center' });
    if (!a.lp) return;
    const dirs = S.bonds.filter(([p, q]) => p === i || q === i).map(([p, q]) => { const b = S.atoms[p === i ? q : p]; return Math.atan2(b.y - a.y, b.x - a.x); });
    const mx = sum(dirs.map(Math.cos)), my = sum(dirs.map(Math.sin));
    const out = Math.hypot(mx, my) < 0.1 ? -Math.PI / 2 : Math.atan2(-my, -mx);
    const angs = a.lp === 1 ? [out] : a.lp === 2 ? [out - Math.PI / 2, out + Math.PI / 2] : [out - Math.PI / 2, out, out + Math.PI / 2];
    const rr = sm ? 22 : 28, po = sm ? 5.5 : 7, dr = sm ? 3.5 : 4.5;
    angs.forEach((t) => [-po, po].forEach((off) => F.dot(ctx, x + Math.cos(t) * rr - Math.sin(t) * off, y + Math.sin(t) * rr + Math.cos(t) * off, dots(i), true, dr)));
  });
  if (S.charge) {
    const xs = P.map((p) => p[0]), ys = P.map((p) => p[1]), m = o.margin || (sm ? 36 : 50);
    const l = Math.min(...xs) - m, r = Math.max(...xs) + m, t = Math.min(...ys) - m, b = Math.max(...ys) + m;
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.beginPath();
    ctx.moveTo(l + 14, t); ctx.lineTo(l, t); ctx.lineTo(l, b); ctx.lineTo(l + 14, b);
    ctx.moveTo(r - 14, t); ctx.lineTo(r, t); ctx.lineTo(r, b); ctx.lineTo(r - 14, b); ctx.stroke(); ctx.restore();
    text(ctx, S.charge, r + 6, t + 4, PAL.ink, { size: sm ? 22 : 24, weight: 600 });
  }
  return P;
}
/* per atom: valence electrons, lone pair electrons, bonding electrons and the formal charge they give */
const book = (S) => S.atoms.map((a, i) => {
  const bonding = 2 * sum(S.bonds.filter(([p, q]) => p === i || q === i).map((b) => b[2]));
  const lone = 2 * (a.lp || 0), v = VALENCE[a.s];
  return { v, lone, bonding, fc: v - lone - bonding / 2 };
});

/* =====================================================================
   SIM: formal charges of the candidate structures the section compares.
   The candidates of one molecule or ion stand side by side, as the book
   sets them, each atom's formal charge beneath it. Structures and atoms
   are discrete states, so they are choices; nothing has a clock. A dashed
   outline closes round the electrons assigned to the chosen atom (its lone
   pairs and one electron of each bond), which carry the book's red mark,
   F.cat(0); everything else is ink.
===================================================================== */
(function () {
  const H = 400, CY = 222, GAP = 115;
  const lin = (syms, lp, orders, charge) => ({
    atoms: syms.map((s, i) => ({ s, x: (i - 1) * GAP, y: 0, lp: lp[i] })),
    bonds: [[0, 1, orders[0]], [1, 2, orders[1]]], charge,
  });
  const STRUCTS = [
    { fam: 0, label: 'CO₂: O=C=O', best: true, ...lin(['O', 'C', 'O'], [2, 0, 2], [2, 2], ''),
      verdict: 'Every formal charge in O=C=O is zero, so this structure is preferred (Guideline 1).' },
    { fam: 0, label: 'CO₂: O≡C–O', ...lin(['O', 'C', 'O'], [1, 0, 3], [3, 1], ''),
      verdict: 'Two atoms of O≡C–O carry formal charges, +1 and −1, so it is less likely than O=C=O (Guideline 1).' },
    { fam: 0, label: 'CO₂: O=O=C', ...lin(['O', 'O', 'C'], [2, 0, 2], [2, 2], ''),
      verdict: 'With oxygen in the center the formal charges reach +2 and −2, the largest of the three (Guideline 2).' },
    { fam: 1, label: 'NCS⁻', best: true, ...lin(['N', 'C', 'S'], [2, 0, 2], [2, 2], '−'),
      verdict: 'NCS⁻ has one formal charge, −1 on nitrogen, the most electronegative atom, so it is preferred (Guidelines 2 and 4).' },
    { fam: 1, label: 'CNS⁻', ...lin(['C', 'N', 'S'], [2, 0, 2], [2, 2], '−'),
      verdict: 'Two atoms of CNS⁻ carry formal charges, one of them −2, so it is less likely than NCS⁻ (Guideline 2).' },
    { fam: 1, label: 'CSN⁻', ...lin(['C', 'S', 'N'], [2, 0, 2], [2, 2], '−'),
      verdict: 'Every atom of CSN⁻ carries a formal charge, as large as +2 and −2, so it is the least likely (Guideline 2).' },
    { fam: 2, label: 'N₂O: N≡N–O', best: true, ...lin(['N', 'N', 'O'], [1, 0, 3], [3, 1], ''),
      verdict: 'No formal charge of N≡N–O is larger than one, and the −1 is on oxygen, so it is preferred (Guidelines 2 and 4).' },
    { fam: 2, label: 'N₂O: N=O=N', ...lin(['N', 'O', 'N'], [2, 0, 2], [2, 2], ''),
      verdict: 'The central oxygen atom of N=O=N carries +2 between two atoms of −1, so it is less likely than N≡N–O (Guideline 2).' },
  ];
  const FAM = [0, 1, 2].map((f) => STRUCTS.map((s, i) => (s.fam === f ? i : -1)).filter((i) => i >= 0));
  const centre = (si) => { const m = FAM[STRUCTS[si].fam], j = m.indexOf(si); return m.length === 3 ? 310 + j * 415 : 480 + j * 540; };

  const d = F.sim(root, 'sim-formal-charge', H);
  const pickS = F.select(d.controls, { label: '\\text{structure}', options: STRUCTS.map((s, i) => ({ value: String(i), label: s.label })), value: '0' });
  const pickA = F.choice(d.controls, { label: '\\text{atom}', options: [{ value: '0', label: 'left' }, { value: '1', label: 'central' }, { value: '2', label: 'right' }], value: '1' });
  let hits = [];
  F.hover(d.stage, () => hits);

  function family(ctx, f, a) {
    const red = F.cat(0);
    faded(ctx, a, [0, 0], () => {
      FAM[f].forEach((si, j) => {
        const S = STRUCTS[si], B = book(S), cx = centre(si), on = shown(pickS, String(si));
        const st = (i) => on * shown(pickA, String(i)), mark = (i) => mixColor(PAL.ink, red, st(i));
        if (on > 0) {
          ctx.save(); ctx.globalAlpha *= on; ctx.fillStyle = alpha(PAL.ink, 0.05); ctx.beginPath(); ctx.roundRect(cx - 198, CY - 112, 396, 262, 10); ctx.fill(); ctx.restore();
        }
        const P = lewis(ctx, S, { cx, cy: CY, margin: 62, dots: mark, bond: (p, q, half) => mark(half === 0 ? p : q) });
        P.forEach(([x], i) => {
          text(ctx, signed(B[i].fc), x, CY + 96, PAL.ink, { size: 26, weight: 600, align: 'center' });
          const s = st(i); if (s <= 0) return;
          /* the electrons assigned to this atom: out to the middle of each bond, round its lone pairs */
          const l = i > 0 ? x - GAP / 2 : x - 46, r = i < 2 ? x + GAP / 2 : x + 46;
          ctx.save(); ctx.globalAlpha *= s; ctx.strokeStyle = red; ctx.lineWidth = 2.5; ctx.setLineDash([8, 7]); ctx.beginPath(); ctx.roundRect(l, CY - 48, r - l, 96, 16); ctx.stroke(); ctx.restore();
          faded(ctx, s, [0, 0], () => F.rich(ctx, [[`${B[i].lone + B[i].bonding / 2} e⁻`, red], ' assigned'], x, CY - 76, { size: 20, align: 'center' }));
        });
        if (j === 0) ['formal', 'charge'].forEach((w, n) => text(ctx, w, cx - GAP - 66, CY + 85 + n * 22, PAL.muted, { size: 19, align: 'right' }));
        if (S.best) text(ctx, 'preferred', cx, CY + 150, PAL.ink, { size: 20, align: 'center' });
      });
    });
  }

  function draw() {
    const { ctx } = begin(d.c);
    const si = +pickS.value, ai = +pickA.value, S = STRUCTS[si], B = book(S), from = STRUCTS[+pickS.from], k = pickS.k;
    const swap = k < 1 && from.fam !== S.fam;
    if (swap) family(ctx, from.fam, 1 - k);
    family(ctx, S.fam, swap ? k : 1);
    headline(ctx, S.verdict);
    hits = FAM[S.fam].flatMap((i) => { const T = STRUCTS[i], Bi = book(T); return T.atoms.map((a, n) => ({ x: centre(i) + a.x, y: CY, r: 40, name: `${NAMES[a.s]} (${a.s}): formal charge ${signed(Bi[n].fc)}` })); });
    const b = B[ai], a = S.atoms[ai];
    tex(d.readout,
      `\\text{formal charge of ${a.s}} = \\text{valence e}^- - \\text{lone pair e}^- - \\tfrac{1}{2}\\,\\text{bonding e}^- = ${b.v} - ${b.lone} - \\tfrac{1}{2}(${b.bonding}) = ${b.fc > 0 ? '+' : ''}${texNum(b.fc, true)}`
      + ` \\\\ \\text{sum of the formal charges} = ${B.map((x, i) => texNum(x.fc, i === 0)).join(' + ')} = ${texNum(sum(B.map((x) => x.fc)), true)} = \\text{charge of the ${S.charge ? 'ion' : 'molecule'}}`);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   SIM: resonance forms and the resonance hybrid, nitrite and carbonate.
   The forms stand in a row as the book draws them, the hybrid at the end
   of the row, and under each the bonds and the formal charge of one
   oxygen atom, so the hybrid's values read as the row's average. The ion
   and the oxygen atom are discrete states, so they are choices. Nothing
   moves: the text insists that the hybrid never fluctuates between its
   forms, so no form ever turns into another. The chosen oxygen atom's
   bond and lone pairs carry F.cat(0); the rest is ink.
===================================================================== */
(function () {
  const H = 506, CY = 236, L0 = 232, R0 = 1382;
  const IONS = {
    no2: {
      label: 'NO₂⁻', bond: 'N–O', charge: '−', small: false, w: 310, q: 26, ox: ['left', 'right'], bo: '1.5', fc: '−½', fcTex: '-\\tfrac{1}{2}',
      atoms: [{ s: 'N', x: 0, y: 0, lp: 1 }, { s: 'O', x: -105, y: 0 }, { s: 'O', x: 105, y: 0 }],
      forms: [[1, 2], [2, 1]],
      head: 'In the hybrid the two N–O bonds are alike, each halfway between a single and a double bond.',
    },
    co3: {
      label: 'CO₃²⁻', bond: 'C–O', charge: '2−', small: true, w: 216, q: 30, ox: ['left', 'right', 'top'], bo: '1.33', fc: '−⅔', fcTex: '-\\tfrac{2}{3}',
      atoms: [{ s: 'C', x: 0, y: 12, lp: 0 }, { s: 'O', x: -72, y: 67 }, { s: 'O', x: 72, y: 67 }, { s: 'O', x: 0, y: -93 }],
      forms: [[2, 1, 1], [1, 2, 1], [1, 1, 2]],
      head: 'In the hybrid the three C–O bonds are alike, each one-third of the way from a single to a double bond.',
    },
  };
  const form = (I, orders) => ({
    atoms: I.atoms.map((a, i) => (i === 0 ? a : { ...a, lp: orders[i - 1] === 2 ? 2 : 3 })),
    bonds: orders.map((n, j) => [0, j + 1, n]), charge: I.charge,
  });
  const hybrid = (I) => ({ atoms: I.atoms.map((a, i) => (i === 0 ? a : { ...a, lp: 0 })), bonds: I.atoms.slice(1).map((_, j) => [0, j + 1, 'h']), charge: I.charge });
  const oxOptions = (I) => I.ox.map((s, i) => ({ value: String(i), label: s }));

  const d = F.sim(root, 'sim-resonance-hybrid', H);
  let pickO = null;
  const pick = F.choice(d.controls, { label: '\\text{ion}', options: Object.entries(IONS).map(([v, I]) => ({ value: v, label: I.label })), value: 'no2', key: 'ion',
    onInput: (v) => pickO.options(oxOptions(IONS[v]), '0') });
  pickO = F.choice(d.controls, { label: '\\text{oxygen atom}', options: oxOptions(IONS.no2), value: '0', key: 'oxygen' });
  let hits = [];
  F.hover(d.stage, () => hits);

  function drawIon(ctx, key, live) {
    const I = IONS[key], n = I.forms.length, red = F.cat(0), out = [];
    const oi = Math.min(+pickO.value, I.ox.length - 1);
    const st = (j) => (live ? shown(pickO, String(j)) : j === oi ? 1 : 0), mark = (j) => mixColor(PAL.ink, red, st(j));
    const col = I.w + I.q, A = (R0 - L0 - (n + 1) * col) / n;      // the gap an arrow, and the rule, stand in
    const cxOf = (f) => L0 + I.w / 2 + f * (col + A);              // f = n is the hybrid
    const style = { cy: CY, small: I.small, dots: (i) => (i ? mark(i - 1) : PAL.ink), bond: (p, q) => mark(Math.max(p, q) - 1) };
    const tally = (x, a, b, lead) => {
      F.rich(ctx, [lead, [a, red]], x, 440, { size: 22, align: 'center' });
      F.rich(ctx, [lead, [b, red]], x, 478, { size: 22, align: 'center' });
    };
    I.forms.forEach((orders, f) => {
      const cx = cxOf(f), S = form(I, orders), P = lewis(ctx, S, { cx, ...style }), B = book(S);
      if (f < n - 1) {
        const ax = cx + I.w / 2 + I.q + 12, bx = cx + I.w / 2 + I.q + A - 8, m = (ax + bx) / 2;
        F.arrow(ctx, m, CY, bx, CY, PAL.ink, 3); F.arrow(ctx, m, CY, ax, CY, PAL.ink, 3);
      }
      tally(cx, String(orders[oi]), signed(B[oi + 1].fc), '');
      S.atoms.forEach((a, i) => out.push({ x: P[i][0], y: P[i][1], r: 30, name: `${NAMES[a.s]} (${a.s}): formal charge ${signed(B[i].fc)}` }));
    });
    const xr = cxOf(n) - I.w / 2 - A / 2, hx = cxOf(n);
    line(ctx, xr, 84, xr, H - 14, PAL.rule, 1.5);
    const P = lewis(ctx, hybrid(I), { cx: hx, ...style });
    P.slice(1).forEach(([x, y], j) => {
      const dx = x - P[0][0], dy = y - P[0][1], L = Math.hypot(dx, dy);
      const at = I.small ? [x + dx / L * 32, y + dy / L * 32] : [x, y + 40];   // outward of a carbonate oxygen, under a nitrite one
      text(ctx, I.fc, at[0], at[1], mark(j), { size: 22, weight: 600, align: 'center' });
    });
    tally(hx, I.bo, I.fc, 'average ');
    text(ctx, n === 2 ? 'the two resonance forms' : 'the three resonance forms', (cxOf(0) + cxOf(n - 1)) / 2, 398, PAL.muted, { size: 19, align: 'center' });
    text(ctx, 'resonance hybrid', hx, 398, PAL.muted, { size: 19, align: 'center' });
    text(ctx, `bonds to the ${I.ox[oi]} O`, L0 - 28, 440, PAL.ink, { size: 20, align: 'right' });
    text(ctx, 'its formal charge', L0 - 28, 478, PAL.ink, { size: 20, align: 'right' });
    I.atoms.forEach((a, i) => out.push({ x: P[i][0], y: P[i][1], r: 30, name: i ? `oxygen (O): ${I.bo} bonds and a charge of ${I.fc}; its lone pairs are not drawn` : `${NAMES[a.s]} (${a.s}), the central atom` }));
    return out;
  }

  function draw() {
    const { ctx } = begin(d.c);
    const key = pick.value, I = IONS[key], swap = pick.k < 1 && pick.from !== key;
    if (swap) faded(ctx, 1 - pick.k, [0, 0], () => drawIon(ctx, pick.from, false));
    let h = [];
    faded(ctx, swap ? pick.k : 1, [0, 0], () => { h = drawIon(ctx, key, true); });
    hits = h;
    headline(ctx, I.head);
    const oi = Math.min(+pickO.value, I.ox.length - 1), n = I.forms.length;
    const S = I.forms.map((o) => form(I, o)), orders = I.forms.map((o) => o[oi]), fcs = S.map((s) => book(s)[oi + 1].fc);
    tex(d.readout,
      `\\text{bonds to each O} = \\frac{${orders.join(' + ')}}{${n}} ${n === 2 ? '=' : '\\approx'} ${I.bo}`
      + ` \\\\ \\text{formal charge of each O} = \\frac{${fcs.map((x, i) => texNum(x, i === 0)).join(' + ')}}{${n}} = ${I.fcTex}`);
  }
  register(d.fig, { update: () => {}, draw });
})();
};
