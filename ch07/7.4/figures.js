/* Figures for section 7.4 Formal Charges and Resonance. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['7.4'] = function (root, F) {
const { el, tex, PAL, register, begin, line, text, headline } = F;
const RAD = Math.PI / 180;
const NAMES = { C: 'carbon', N: 'nitrogen', O: 'oxygen', S: 'sulfur' };
const VALENCE = { C: 4, N: 5, O: 6, S: 6 };
const sum = (a) => a.reduce((t, x) => t + x, 0);
const signed = (q) => (q > 0 ? `+${q}` : q < 0 ? `−${-q}` : '0');
function readout(host, main, small) { tex(host, main); if (small) host.appendChild(el('small', null, small)); }

/* A Lewis structure: atoms {s, x, y, lp} in units scaled by sc about (cx, cy); bonds [i, j, order], order 'h' for a
   full bond with a dashed partial bond beside it. Lone pairs sit opposite the atom's bonds: one straight out, two
   to either side, three out and to either side. color(i) and bondColor(i, j, half) give the ink or the mark. */
function lewis(ctx, S, o) {
  const P = S.atoms.map((a) => [o.cx + a.x * o.sc, o.cy + a.y * o.sc]);
  const ink = o.color || (() => PAL.ink);
  const bink = o.bondColor || (() => PAL.ink);
  S.bonds.forEach(([i, j, n]) => {
    const [x1, y1] = P[i], [x2, y2] = P[j], L = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / L, uy = (y2 - y1) / L, g = o.sc < 0.8 ? 19 : 24;
    const ax = x1 + ux * g, ay = y1 + uy * g, bx = x2 - ux * g, by = y2 - uy * g, mx = (ax + bx) / 2, my = (ay + by) / 2;
    const sp = o.sc < 0.8 ? 8 : 10, lines = n === 'h' ? [[-sp / 2, null], [sp / 2, [7, 7]]] : Array.from({ length: n }, (_, k) => [(k - (n - 1) / 2) * sp, null]);
    lines.forEach(([off, dash]) => {
      const nx = -uy * off, ny = ux * off;
      line(ctx, ax + nx, ay + ny, mx + nx, my + ny, bink(i, j, 0), 3.5, dash);
      line(ctx, mx + nx, my + ny, bx + nx, by + ny, bink(i, j, 1), 3.5, dash);
    });
  });
  S.atoms.forEach((a, i) => {
    const [x, y] = P[i];
    text(ctx, a.s, x, y + 1, PAL.ink, { size: o.sc < 0.8 ? 28 : 34, weight: 600, align: 'center' });
    if (!a.lp) return;
    const dirs = S.bonds.filter(([p, q]) => p === i || q === i).map(([p, q]) => { const b = S.atoms[p === i ? q : p]; return Math.atan2(b.y - a.y, b.x - a.x); });
    const mx = sum(dirs.map(Math.cos)), my = sum(dirs.map(Math.sin));
    const out = Math.hypot(mx, my) < 0.1 ? -Math.PI / 2 : Math.atan2(-my, -mx);
    const angs = a.lp === 1 ? [out] : a.lp === 2 ? [out - Math.PI / 2, out + Math.PI / 2] : [out - Math.PI / 2, out, out + Math.PI / 2];
    const rr = o.sc < 0.8 ? 22 : 28, po = o.sc < 0.8 ? 5.5 : 7, dr = o.sc < 0.8 ? 3.5 : 4.5;
    angs.forEach((t) => [-po, po].forEach((off) => F.dot(ctx, x + Math.cos(t) * rr - Math.sin(t) * off, y + Math.sin(t) * rr + Math.cos(t) * off, ink(i), true, dr)));
  });
  if (S.charge) {
    const xs = P.map((p) => p[0]), ys = P.map((p) => p[1]), m = o.margin || (o.sc < 0.8 ? 40 : 50);
    const l = Math.min(...xs) - m, r = Math.max(...xs) + m, t = Math.min(...ys) - m, b = Math.max(...ys) + m;
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.beginPath();
    ctx.moveTo(l + 14, t); ctx.lineTo(l, t); ctx.lineTo(l, b); ctx.lineTo(l + 14, b);
    ctx.moveTo(r - 14, t); ctx.lineTo(r, t); ctx.lineTo(r, b); ctx.lineTo(r - 14, b); ctx.stroke(); ctx.restore();
    text(ctx, S.charge, r + 8, t + 4, PAL.ink, { size: 24, weight: 600 });
  }
  return P;
}

/* =====================================================================
   SIM: formal charges of the candidate structures the section compares.
   Structures and atoms are discrete states, so they are choices; nothing
   has a clock. The chosen atom's lone pair electrons and its half of each
   bond carry the book's red mark, F.cat(0); everything else is ink.
===================================================================== */
(function () {
  const H = 360, CX = 700, CY = 185, GAP = 170;
  const lin = (syms, lp, orders, charge) => ({
    atoms: syms.map((s, i) => ({ s, x: (i - 1) * GAP, y: 0, lp: lp[i] })),
    bonds: [[0, 1, orders[0]], [1, 2, orders[1]]], charge,
  });
  const STRUCTS = [
    { label: 'CO₂: O=C=O', name: 'CO_{2}', ...lin(['O', 'C', 'O'], [2, 0, 2], [2, 2], ''),
      verdict: 'Every formal charge is zero, so this structure is preferred (Guideline 1).' },
    { label: 'CO₂: O≡C–O', name: 'CO_{2}', ...lin(['O', 'C', 'O'], [1, 0, 3], [3, 1], ''),
      verdict: 'Two atoms carry formal charges of +1 and −1, so this structure is less likely than O=C=O (Guideline 1).' },
    { label: 'CO₂: O=O=C', name: 'CO_{2}', ...lin(['O', 'O', 'C'], [2, 0, 2], [2, 2], ''),
      verdict: 'Formal charges of +2 and −2 are larger than in either structure with carbon in the center (Guideline 2).' },
    { label: 'NCS⁻', name: 'NCS⁻', ...lin(['N', 'C', 'S'], [2, 0, 2], [2, 2], '−'),
      verdict: 'Only one atom carries a formal charge, and the −1 is on nitrogen, the most electronegative atom, so this arrangement is preferred (Guidelines 2 and 4).' },
    { label: 'CNS⁻', name: 'CNS⁻', ...lin(['C', 'N', 'S'], [2, 0, 2], [2, 2], '−'),
      verdict: 'Two atoms carry formal charges, one of them −2, so this arrangement is less likely than NCS⁻ (Guideline 2).' },
    { label: 'CSN⁻', name: 'CSN⁻', ...lin(['C', 'S', 'N'], [2, 0, 2], [2, 2], '−'),
      verdict: 'Every atom carries a formal charge, as large as +2 and −2, so this arrangement is the least likely (Guideline 2).' },
    { label: 'N₂O: N≡N–O', name: 'N_{2}O', ...lin(['N', 'N', 'O'], [1, 0, 3], [3, 1], ''),
      verdict: 'No formal charge is larger than one, and the −1 is on oxygen, the more electronegative atom, so this structure is preferred (Guidelines 2 and 4).' },
    { label: 'N₂O: N=O=N', name: 'N_{2}O', ...lin(['N', 'O', 'N'], [2, 0, 2], [2, 2], ''),
      verdict: 'The central oxygen atom carries +2 between two atoms of −1, so this structure is less likely than N≡N–O (Guideline 2).' },
  ];
  /* per atom: valence electrons, lone pair electrons, bonding electrons and the formal charge they give */
  const book = (S) => S.atoms.map((a, i) => {
    const bonding = 2 * sum(S.bonds.filter(([p, q]) => p === i || q === i).map((b) => b[2]));
    const lone = 2 * a.lp, v = VALENCE[a.s];
    return { v, lone, bonding, fc: v - lone - bonding / 2 };
  });

  const d = F.sim(root, 'sim-formal-charge', H);
  const pickS = F.select(d.controls, { label: '\\text{structure}', options: STRUCTS.map((s, i) => ({ value: String(i), label: s.label })), value: '0' });
  const pickA = F.choice(d.controls, { label: '\\text{atom}', options: [{ value: '0', label: 'left' }, { value: '1', label: 'central' }, { value: '2', label: 'right' }], value: '1' });
  let hits = [];
  F.hover(d.stage, () => hits);

  function drawOne(ctx, si, alpha) {
    const S = STRUCTS[si], B = book(S), red = F.cat(0);
    const mark = (i) => pickA.mixColor((v) => (v === String(i) ? red : PAL.ink));
    F.faded(ctx, alpha, [0, 0], () => {
      const P = lewis(ctx, S, { cx: CX, cy: CY, sc: 1, color: mark, bondColor: (i, j, half) => mark(half === 0 ? i : j) });
      P.forEach(([x], i) => text(ctx, signed(B[i].fc), x, CY + 110, PAL.ink, { size: 26, weight: 600, align: 'center' }));
    });
  }

  function draw() {
    const { ctx } = begin(d.c);
    const si = +pickS.value, ai = +pickA.value, k = pickS.k;
    if (k < 1 && pickS.from !== pickS.value) drawOne(ctx, +pickS.from, 1 - k);
    drawOne(ctx, si, k < 1 && pickS.from !== pickS.value ? k : 1);
    text(ctx, 'formal charge', CX - GAP - 110, CY + 110, PAL.muted, { size: 17, align: 'right' });
    const S = STRUCTS[si], B = book(S), total = sum(B.map((b) => b.fc));
    headline(ctx, S.verdict);
    hits = S.atoms.map((a, i) => ({ x: CX + a.x, y: CY, r: 36, name: `${NAMES[a.s]} (${a.s}): formal charge ${signed(B[i].fc)}` }));
    const b = B[ai], a = S.atoms[ai];
    readout(d.readout,
      `\\text{formal charge of ${a.s}} = ${b.v} - ${b.lone} - \\tfrac{1}{2}(${b.bonding}) = ${b.fc < 0 ? '-' : ''}${Math.abs(b.fc)}`,
      `The formal charges add up to ${B.map((x, i) => (i === 0 ? signed(x.fc) : `${x.fc < 0 ? '−' : '+'} ${Math.abs(x.fc)}`)).join(' ')} = ${signed(total)}, the charge of ${S.charge ? 'the ion' : 'the molecule'}.`);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   SIM: resonance forms and the resonance hybrid, nitrite and carbonate.
   The ion is a discrete state, so it is a choice. Nothing moves: the text
   insists that the hybrid never fluctuates between its forms, so no form
   ever turns into another. All ink.
===================================================================== */
(function () {
  const H = 730, ROW = 230, HY = 560;
  const IONS = {
    no2: {
      label: 'NO₂⁻', center: 'N', bond: 'N–O', charge: '−', share: '½−',
      atoms: [{ s: 'N', x: 0, y: -20, lp: 1 }, { s: 'O', x: -115, y: 45 }, { s: 'O', x: 115, y: 45 }],
      forms: [[1, 2], [2, 1]],
      tex: '\\text{bonds per N–O} = \\frac{1 + 2}{2} = 1.5',
      head: 'Two resonance forms: in the hybrid, each N–O bond is the average of a single and a double bond.',
      note: 'The charge of −1 is shared equally by the two oxygen atoms, one half on each.',
    },
    co3: {
      label: 'CO₃²⁻', center: 'C', bond: 'C–O', charge: '2−', share: '⅔−',
      atoms: [{ s: 'C', x: 0, y: 0, lp: 0 }, { s: 'O', x: -105, y: 60 }, { s: 'O', x: 105, y: 60 }, { s: 'O', x: 0, y: -120 }],
      forms: [[2, 1, 1], [1, 2, 1], [1, 1, 2]],
      tex: '\\text{bonds per C–O} = \\frac{1 + 1 + 2}{3} \\approx 1.33',
      head: 'Three resonance forms: in the hybrid, each C–O bond is the average of two single bonds and one double bond.',
      note: 'The charge of −2 is shared equally by the three oxygen atoms, two thirds on each.',
    },
  };
  const form = (I, orders) => ({
    atoms: I.atoms.map((a, i) => (i === 0 ? a : { ...a, lp: orders[i - 1] === 2 ? 2 : 3 })),
    bonds: orders.map((n, j) => [0, j + 1, n]), charge: I.charge,
  });
  const hybrid = (I) => ({ atoms: I.atoms.map((a, i) => (i === 0 ? a : { ...a, lp: 0 })), bonds: I.atoms.slice(1).map((_, j) => [0, j + 1, 'h']), charge: I.charge });

  const d = F.sim(root, 'sim-resonance-hybrid', H);
  const pick = F.choice(d.controls, { label: '\\text{ion}', options: Object.entries(IONS).map(([v, I]) => ({ value: v, label: I.label })), value: 'no2' });
  let hits = [];
  F.hover(d.stage, () => hits);

  function drawIon(ctx, key) {
    const I = IONS[key], n = I.forms.length, SC = 0.62, step = n === 2 ? 480 : 400, x0 = 700 - step * (n - 1) / 2;
    const out = [];
    I.forms.forEach((orders, f) => {
      const cx = x0 + f * step;
      lewis(ctx, form(I, orders), { cx, cy: ROW, sc: SC });
      if (f < n - 1) {
        const ax = cx + step / 2 - 40, bx = cx + step / 2 + 40;
        F.arrow(ctx, (ax + bx) / 2, ROW, bx, ROW, PAL.ink, 3); F.arrow(ctx, (ax + bx) / 2, ROW, ax, ROW, PAL.ink, 3);
      }
    });
    text(ctx, 'resonance forms', 700, ROW + 105, PAL.muted, { size: 17, align: 'center' });
    line(ctx, 260, ROW + 132, 1140, ROW + 132, PAL.rule, 1.5);
    const P = lewis(ctx, hybrid(I), { cx: 700, cy: HY, sc: 0.9, margin: 72 });
    P.slice(1).forEach(([x, y]) => {
      const dx = x - P[0][0], dy = y - P[0][1], L = Math.hypot(dx, dy);
      text(ctx, I.share, x + dx / L * 44, y + dy / L * 44, PAL.ink, { size: 22, weight: 600, align: 'center' });
    });
    text(ctx, 'resonance hybrid', 700, H - 18, PAL.muted, { size: 17, align: 'center' });
    I.atoms.forEach((a, i) => out.push({ x: P[i][0], y: P[i][1], r: 36, name: i ? `oxygen (O): ${I.share.replace('−', '')} of the negative charge` : `${NAMES[a.s]} (${a.s}), the central atom` }));
    return out;
  }

  function draw() {
    const { ctx } = begin(d.c);
    const key = pick.value;
    if (pick.k < 1 && pick.from !== key) F.faded(ctx, 1 - pick.k, [0, 0], () => drawIon(ctx, pick.from));
    let h = [];
    F.faded(ctx, pick.k < 1 && pick.from !== key ? pick.k : 1, [0, 0], () => { h = drawIon(ctx, key); });
    hits = h;
    headline(ctx, IONS[key].head);
    readout(d.readout, IONS[key].tex, IONS[key].note);
  }
  register(d.fig, { update: () => {}, draw });
})();
};
