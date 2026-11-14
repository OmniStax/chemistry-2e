/* Figures for section 20.4 Amines and Amides. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['20.4'] = function (root, F) {
const { PAL, alpha, register, begin, line, text, headline } = F;

/* =====================================================================
   FIGURE 20.20: amino acids joined by peptide bonds. Before, each amino
   acid stands apart with its amine group, its carboxylic acid group and
   its side chain R; after, the OH of each acid group and an H of the
   next amine group leave as one water molecule beneath each new C-N
   bond. Two to four amino acids. Flat, the book's structural formulas
   in ink; its green boxes as dashed ink and its red atoms in bold.
   Still: a reaction's two sides.
===================================================================== */
(function () {
  const d = F.sim(root, 'sim-peptide', 460);
  const B = 60, GAP = 60, SB = 4.5 * B + GAP, SA = 3 * B, Y = 230, WY = Y + 190;
  const NUM = ['', 'one', 'two', 'three', 'four'];
  const CHAIN = { 2: 'dipeptide', 3: 'tripeptide', 4: 'tetrapeptide' };
  const count = F.choice(d.controls, { label: '\\text{amino acids}', key: 'amino-acids', aria: 'the number of amino acids',
    options: ['2', '3', '4'].map((v) => ({ value: v, label: v })), value: '2', onInput: () => draw() });
  const step = F.choice(d.controls, { label: '\\text{condensation}', key: 'condensation', aria: 'before or after the condensation reaction',
    options: [{ value: 'before', label: 'before' }, { value: 'after', label: 'after' }], value: 'before', onInput: () => draw() });
  const ro = F.readout(d);
  let hits = []; F.hover(d.stage, () => hits);

  const lerp = (a, b, k) => a + (b - a) * k;
  const smooth = (a, b, k) => Math.min(1, Math.max(0, (k - a) / (b - a)));
  /* where amino acid i's nitrogen stands among n, a fraction w of the way from apart to joined; the row is centred */
  const xApart = (i, n) => 700 - ((n - 1) * SB + 4.35 * B) / 2 + 0.6 * B + i * SB;
  const xJoined = (i, n) => 700 - ((n - 1) * SA + 4.35 * B) / 2 + 0.6 * B + i * SA;
  const xOf = (i, n, w) => lerp(xApart(i, n), xJoined(i, n), w);

  function bondLine(ctx, x1, y1, x2, y2, a = 1, order = 1, w = 3) {
    if (a <= 0.01) return;
    const L = Math.hypot(x2 - x1, y2 - y1), g = 14; if (L < 2 * g + 4) return;
    const ux = (x2 - x1) / L, uy = (y2 - y1) / L;
    ctx.save(); ctx.globalAlpha *= a;
    (order === 2 ? [-4, 4] : [0]).forEach((o) => line(ctx, x1 + ux * g - uy * o, y1 + uy * g + ux * o, x2 - ux * g - uy * o, y2 - uy * g + ux * o, PAL.ink, w));
    ctx.restore();
  }
  const atom = (ctx, s, x, y, a = 1, bold = false) => F.faded(ctx, a, [0, 0], () => text(ctx, s, x, y + 1, PAL.ink, { size: 26, align: 'center', weight: bold ? 700 : 400 }));
  /* a dashed box round a group, its name above it running away from the chain */
  function box(ctx, l, t, r, b, name, align) {
    ctx.save(); ctx.strokeStyle = alpha(PAL.ink, 0.6); ctx.lineWidth = 2; ctx.setLineDash([7, 6]); ctx.strokeRect(l, t, r - l, b - t); ctx.restore();
    text(ctx, name, align === 'right' ? r : l, t - 18, PAL.ink, { size: 22, align });
  }

  function head() {
    const n = +count.value;
    if (step.value === 'before') return 'Each amino acid carries an amine group, a carboxylic acid group, and a side chain R.';
    const k = n - 1, s = k > 1 ? 's' : '';
    return `${NUM[n][0].toUpperCase() + NUM[n].slice(1)} amino acids join by ${NUM[k]} peptide bond${s}, and ${NUM[k]} molecule${s} of water leave${s ? '' : 's'}.`;
  }

  function draw() {
    const { ctx } = begin(d.c); hits = [];
    headline(ctx, head());
    const w = step.mix((v) => (v === 'after' ? 1 : 0));
    const pres = [0, 1, 2, 3].map((i) => count.mix((v) => (i < +v ? 1 : 0)));
    const xs = [0, 1, 2, 3].map((i) => count.mix((v) => xOf(i, +v, w)));
    /* j[i]: how far the bond between amino acids i and i + 1 has formed */
    const j = [0, 1, 2].map((i) => w * pres[i + 1]);
    for (let i = 0; i < 4; i++) {
      if (pres[i] <= 0.01) continue;
      const x = xs[i], a = pres[i], jin = i > 0 ? j[i - 1] : 0, jout = i < 3 ? j[i] : 0, next = i < 3 ? pres[i + 1] : 0;
      F.faded(ctx, a, [0, 0], () => {
        atom(ctx, 'N', x, Y); atom(ctx, 'C', x + B, Y); atom(ctx, 'C', x + 2 * B, Y);
        atom(ctx, 'H', x + B, Y - B); atom(ctx, 'R', x + B, Y + B); atom(ctx, 'O', x + 2 * B, Y - B);
        bondLine(ctx, x, Y, x + B, Y); bondLine(ctx, x + B, Y, x + 2 * B, Y);
        bondLine(ctx, x + B, Y, x + B, Y - B); bondLine(ctx, x + B, Y, x + B, Y + B);
        bondLine(ctx, x + 2 * B, Y, x + 2 * B, Y - B, 1, 2);
        /* the hydrogen that stays on nitrogen moves above it once the nitrogen is in the chain */
        const h1x = x + lerp(-0.6 * B, 0, jin), h1y = Y + lerp(-0.6 * B, -B, jin);
        atom(ctx, 'H', h1x, h1y); bondLine(ctx, x, Y, h1x, h1y);
        /* the hydrogen that leaves with the next water molecule, from the lower left of nitrogen */
        const mxIn = i > 0 ? (xs[i - 1] + 2 * B + x) / 2 : x;
        const h2x = lerp(x - 0.6 * B, mxIn - 46, jin), h2y = lerp(Y + 0.6 * B, WY, jin);
        atom(ctx, 'H', h2x, h2y, 1, i > 0);
        bondLine(ctx, x, Y, h2x, h2y, 1 - jin);
        if (i > 0) bondLine(ctx, h2x, h2y, lerp(xs[i - 1] + 3 * B, mxIn, j[i - 1]), lerp(Y, WY, j[i - 1]), jin);
        /* the OH of the carboxylic acid group, leaving to the water beneath the next bond */
        const mxOut = (x + 2 * B + (i < 3 ? xs[i + 1] : x + 3 * B)) / 2;
        const ox = lerp(x + 3 * B, mxOut, jout), oy = lerp(Y, WY, jout), hx = lerp(x + 3.75 * B, mxOut + 46, jout), hy = oy;
        const leaves = next > 0.5;
        atom(ctx, 'O', ox, oy, 1, leaves); atom(ctx, 'H', hx, hy, 1, leaves);
        bondLine(ctx, x + 2 * B, Y, ox, oy, 1 - jout); bondLine(ctx, ox, oy, hx, hy);
        if (jout > 0.01) bondLine(ctx, x + 2 * B, Y, xs[i + 1], Y, jout * next, 1, 4);
        hits.push({ x, y: Y, r: 18, name: jin > 0.5 ? 'nitrogen atom of a peptide bond' : 'nitrogen atom of the amine group' },
          { x: x + B, y: Y + B, r: 18, name: 'side chain R' }, { x: x + 2 * B, y: Y - B, r: 18, name: 'oxygen atom of the carbonyl group' });
        if (jout > 0.5) hits.push({ x: mxOut, y: WY, r: 50, name: 'molecule of water' });
      });
      /* the plus sign between molecules apart */
      if (i < 3 && next > 0.01) F.faded(ctx, (1 - w) * next, [0, 0], () => text(ctx, '+', (x + 3.75 * B + xs[i + 1] - 0.6 * B) / 2, Y + 1, PAL.ink, { size: 26, align: 'center' }));
    }
    /* the first peptide bond, named once */
    if (j[0] > 0.6) {
      const mx = (xs[0] + 2 * B + xs[1]) / 2, k = smooth(0.6, 1, j[0]);
      F.faded(ctx, k, [0, 0], () => { line(ctx, mx, Y + 12, mx, Y + 96, alpha(PAL.ink, 0.5), 2); text(ctx, 'peptide bond', mx, Y + 112, PAL.ink, { size: 22, align: 'center' }); });
      hits.push({ x: mx, y: Y, r: 16, name: 'peptide bond' });
    }
    /* the two groups that stay unreacted at the ends */
    const x0 = xs[0], xl = count.mix((v) => xOf(+v - 1, +v, w));
    box(ctx, x0 - 0.6 * B - 22, Y - 0.6 * B - 24, x0 + 0.5 * B, Y + 0.6 * B + 24, 'amino group', 'right');
    box(ctx, xl + 1.5 * B, Y - B - 24, xl + 3.75 * B + 20, Y + 22, 'carboxyl group', 'left');
    hits.push({ x: x0 - 0.3 * B, y: Y, r: 30, name: 'amine group, –NH₂' }, { x: xl + 2.9 * B, y: Y - 0.4 * B, r: 34, name: 'carboxylic acid group, –COOH' });

    const n = +count.value, after = step.value === 'after';
    const water = n - 1 > 1 ? `${n - 1}\\,\\text{H}_{2}\\text{O}` : '\\text{H}_{2}\\text{O}';
    const tex = after
      ? `\\mk{n}{${n}\\ \\text{amino acids}}\\mk{r}{\\;\\longrightarrow\\;}\\mk{p}{\\text{${CHAIN[n]}}} + \\mk{w}{${water}}`
      : `\\mk{n}{${n}\\ \\text{amino acids}}`;
    ro.set(tex, after ? 'The chain still ends in an amine group and a carboxylic acid group, so another amino acid can join.' : '', { form: after });
  }
  register(d.fig, { update: () => {}, draw });
})();
};
