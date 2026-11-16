/* Figures for section 20.4 Amines and Amides. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['20.4'] = function (root, F) {
const { PAL, alpha, register, begin, line, text, topline } = F;

/* =====================================================================
   FIGURE 20.20: amino acids joined by peptide bonds. The book's
   structural formulas, drawn as the book draws them: the two H of the
   amine group to the left of N, H above and R below the next carbon,
   C=O and OH on the last. At each join the OH of one carboxylic acid
   group and the lower H of the next amine group leave and assemble as
   a water molecule beneath the new C-N bond; the H that stays swings
   below its nitrogen and the carbonyl O stands up, as the book's
   dipeptide has them. Two to four amino acids; the view closes in on
   the chain as the molecules come together. Flat, letters in ink; the
   atoms that leave as water are the one coloured thing (F.cat(0), the
   book's red), and the book's green boxes are dashed ink.
   Still: a reaction's two sides, the change a morph.
===================================================================== */
(function () {
  const HH = 536, Y = 252, UMAX = 92, PA = 5.2, PJ = 3, WIDE = 3.9, LEFT = 0.77;
  const d = F.sim(root, 'sim-peptide', HH);
  const NUM = ['', 'one', 'two', 'three', 'four'];
  const CHAIN = { 2: 'dipeptide', 3: 'tripeptide', 4: 'tetrapeptide' };
  const count = F.choice(d.controls, { label: '\\text{amino acids}', key: 'amino-acids', aria: 'the number of amino acids', ms: 1700,
    options: ['2', '3', '4'].map((v) => ({ value: v, label: v })), value: '2' });
  const step = F.choice(d.controls, { label: '\\text{condensation}', key: 'condensation', aria: 'before or after the condensation reaction', ms: 1700,
    options: [{ value: 'before', label: 'before' }, { value: 'after', label: 'after' }], value: 'after' });
  const ro = F.readout(d);
  let hits = []; F.hover(d.stage, () => hits);

  const lerp = (a, b, k) => a + (b - a) * k;
  const sm = (k, a, b) => { const t = Math.min(1, Math.max(0, (k - a) / (b - a))); return t * t * (3 - 2 * t); };
  const cap = (s) => s[0].toUpperCase() + s.slice(1);

  function draw() {
    const { ctx } = begin(d.c); hits = [];
    const n = +count.value, after = step.value === 'after', cw = F.cat(0);
    /* the first time it is seen, the opening chain forms once */
    const w = step.mix((v) => (v === 'after' ? 1 : 0)) * F.ease.smooth(F.arrival(d));
    const pres = [0, 1, 2, 3].map((i) => count.mix((v) => (i < +v ? 1 : 0)));
    /* j[i]: how far the join between amino acids i and i + 1 has gone. Three beats: the atoms leave, the molecules close up, the bond is drawn */
    const j = [0, 1, 2].map((i) => w * pres[i + 1]);
    const leave = j.map((q) => sm(q, 0, 0.45)), close = j.map((q) => sm(q, 0.4, 0.85)), bond = j.map((q) => sm(q, 0.78, 1));
    const off = close.map((q) => lerp(PA, PJ, q));
    const wide = WIDE + off.reduce((s, o, i) => s + pres[i + 1] * o, 0);
    const u = Math.min(UMAX, 1190 / wide), fs = 0.44 * u, bw = Math.max(3, 0.05 * u), g = 0.27 * u;
    const xs = [700 - (wide * u) / 2 + LEFT * u]; off.forEach((o, i) => xs.push(xs[i] + o * u));
    const P = (i, a, b) => [xs[i] + a * u, Y + b * u];

    const atom = (s, p, col = PAL.ink, heavy = false) => text(ctx, s, p[0], p[1] + 1, col, { size: fs, align: 'center', weight: heavy ? 700 : 400 });
    function stick(p, q, a = 1, order = 1, col = PAL.ink, wd = bw, gp = g, gq = g) {
      if (a <= 0.01) return;
      const L = Math.hypot(q[0] - p[0], q[1] - p[1]); if (L < gp + gq + 4) return;
      const ux = (q[0] - p[0]) / L, uy = (q[1] - p[1]) / L, o2 = 0.06 * u;
      ctx.save(); ctx.globalAlpha *= a;
      (order === 2 ? [-o2, o2] : [0]).forEach((o) => line(ctx, p[0] + ux * gp - uy * o, p[1] + uy * gp + ux * o, q[0] - ux * gq - uy * o, q[1] - uy * gq + ux * o, col, wd));
      ctx.restore();
    }
    /* the water of join i: beneath the middle of the gap, then of the bond. Its atoms arrive O, H, H as they
       left (O on the left) and the molecule turns upright as the chain closes over it */
    const waterAt = (i) => {
      const cx = (xs[i] + 2 * u + xs[i + 1]) / 2, cy = Y + 1.82 * u, t = close[i] * Math.PI / 2, c = Math.cos(t), s = Math.sin(t);
      const turn = ([a, b]) => [cx + (a * c - b * s) * u, cy + (a * s + b * c) * u];
      return { cx, cy, O: turn([-0.3, 0]), Hn: turn([0.3, -0.42]), Ho: turn([0.3, 0.42]) };
    };
    const mixP = (p, q, k) => [lerp(p[0], q[0], k), lerp(p[1], q[1], k)];

    for (let i = 0; i < 4; i++) {
      const a = sm(pres[i], 0, 0.3); if (a <= 0.01) continue;
      const kin = i > 0 ? i - 1 : -1, kout = i < 3 ? i : -1;
      const lin = kin < 0 ? 0 : leave[kin], cin = kin < 0 ? 0 : close[kin];
      const lout = kout < 0 ? 0 : leave[kout], cout = kout < 0 ? 0 : close[kout], next = kout < 0 ? 0 : pres[i + 1];
      F.faded(ctx, a, [0, 0], () => {
        const N = P(i, 0, 0), Ca = P(i, 1, 0), C = P(i, 2, 0);
        atom('N', N); atom('C', Ca); atom('C', C); atom('H', P(i, 1, -1)); atom('R', P(i, 1, 1));
        stick(N, Ca); stick(Ca, C); stick(Ca, P(i, 1, -1)); stick(Ca, P(i, 1, 1));
        /* the carbonyl O: up and to the right on a free acid group, straight up in the chain */
        const O = P(i, lerp(2.5, 2, cout), lerp(-0.86, -1, cout));
        atom('O', O); stick(C, O, 1, 2);
        /* the H that stays on nitrogen: upper left on a free amine group, swung round the left to below N in the chain */
        const th = (lerp(229.3, 90, cin) * Math.PI) / 180;
        const Hstay = swing(N, th);
        atom('H', Hstay); stick(N, Hstay);
        /* the lower H of the amine group: it leaves with the water of the join on its left */
        const Hl0 = P(i, -0.62, 0.72), Hl = kin < 0 ? Hl0 : mixP(Hl0, waterAt(kin).Hn, lin);
        atom('H', Hl, kin < 0 ? PAL.ink : cw, kin >= 0);
        stick(N, Hl, 1 - sm(lin, 0, 0.35));
        /* the OH of the acid group: it leaves with the water of the join on its right */
        const W = kout < 0 ? null : waterAt(kout), o0 = P(i, 2.62, 0.8), h0 = P(i, 2.95, 0.8);
        const Oh = W ? mixP(o0, W.O, lout) : o0, Hh = W ? mixP(h0, W.Ho, lout) : h0;
        const col = next > 0.5 ? cw : PAL.ink, heavy = next > 0.5;
        atom('O', Oh, col, heavy); atom('H', Hh, col, heavy);
        stick(C, Oh, 1 - sm(lout, 0, 0.35));
        if (W && lout > 0) {
          const k = sm(lout, 0.7, 1) * next;
          stick(W.O, W.Ho, k, 1, cw); stick(W.O, mixP(P(i + 1, -0.62, 0.72), W.Hn, lout), k, 1, cw);
          if (lout > 0.6) hits.push({ x: W.cx, y: W.cy, r: 0.75 * u, name: 'water molecule, from the OH and the H that left' });
        }
        /* the peptide bond, heavier than the rest */
        if (kout >= 0) stick(C, [xs[i + 1], Y], bond[kout] * next, 1, PAL.ink, 1.9 * bw);
        /* the book's name under each molecule still on its own */
        const own = (1 - sm(Math.max(kin < 0 ? 0 : j[kin], kout < 0 ? 0 : j[kout]), 0, 0.25));
        if (own > 0.01) F.faded(ctx, own, [0, 0], () => text(ctx, 'amino acid', xs[i] + 1.17 * u, Y + 1.8 * u, PAL.ink, { size: 24, align: 'center' }));
        hits.push({ x: N[0], y: N[1], r: 0.3 * u, name: cin > 0.5 ? 'nitrogen atom of a peptide bond' : 'nitrogen atom of the amine group' },
          { x: Ca[0], y: Y + u, r: 0.3 * u, name: 'side chain R, different in each amino acid' },
          { x: O[0], y: O[1], r: 0.3 * u, name: 'oxygen atom of the carbonyl group' },
          { x: C[0], y: C[1], r: 0.3 * u, name: 'carbon atom of the carbonyl group' });
      });
      /* the plus sign between molecules still apart */
      if (kout >= 0 && next > 0.01) F.faded(ctx, (1 - sm(j[kout], 0, 0.3)) * sm(next, 0, 0.3), [0, 0], () => atom('+', [(xs[i] + 3.11 * u + xs[i + 1] - LEFT * u) / 2, Y]));
    }
    function swing(N, th) { return [N[0] + 0.96 * u * Math.cos(th), N[1] + 0.96 * u * Math.sin(th)]; }

    /* the two groups still unreacted at the ends, and the first peptide bond, named on one line above the structure */
    const ly = Y - 1.22 * u - 22, xl = count.mix((v) => xs[+v - 1]);
    function box(l, t, r, b, name) {
      ctx.save(); ctx.strokeStyle = alpha(PAL.ink, 0.55); ctx.lineWidth = 2.5; ctx.setLineDash([9, 7]); ctx.strokeRect(l, t, r - l, b - t); ctx.restore();
      const half = F.measure(ctx, name, { size: 24 }) / 2;
      text(ctx, name, Math.min(1400 - 16 - half, Math.max(16 + half, (l + r) / 2)), ly, PAL.ink, { size: 24, align: 'center' });
    }
    box(xs[0] - 1.02 * u, Y - 1.1 * u, xs[0] + 0.36 * u, Y + 1.1 * u, 'amine group');
    box(xl + 1.6 * u, Y - 1.22 * u, xl + 3.36 * u, Y + 1.18 * u, 'carboxylic acid group');
    hits.push({ x: xs[0] - 0.4 * u, y: Y, r: 0.6 * u, name: 'amine group, –NH₂, still free' }, { x: xl + 2.7 * u, y: Y, r: 0.7 * u, name: 'carboxylic acid group, –COOH, still free' });
    if (bond[0] > 0.01) {
      const mx = (xs[0] + 2 * u + xs[1]) / 2;
      F.faded(ctx, bond[0], [0, 0], () => { line(ctx, mx, ly + 18, mx, Y - 0.16 * u, alpha(PAL.ink, 0.5), 2); text(ctx, 'peptide bond', mx, ly, PAL.ink, { size: 24, align: 'center' }); });
    }
    [0, 1, 2].forEach((i) => { if (bond[i] > 0.5) hits.push({ x: (xs[i] + 2 * u + xs[i + 1]) / 2, y: Y, r: 0.3 * u, name: 'peptide bond, from a carbonyl carbon atom to an amine nitrogen atom' }); });

    const sample = (s) => (cx, x, y) => text(cx, s, x, y + 1, cw, { size: 20, weight: 700, align: 'center' });
    F.legend(ctx, { l: 100, r: 1300, t: 0, b: HH - 8 }, [after ? { s: 'water, one molecule for each peptide bond', draw: sample('H₂O') } : { s: 'atoms that leave as water', draw: sample('H') }],
      { corner: 'bottom', row: true, panel: false, size: 22 });
    topline(ctx, after
      ? `${cap(NUM[n - 1])} peptide bond${n > 2 ? 's join' : ' joins'} ${NUM[n]} amino acids, and the chain still has a free group at each end.`
      : 'Each amino acid has an amine group, a carboxylic acid group, and a side chain R.');
    const water = n > 2 ? `${n - 1}\\,\\text{H}_{2}\\text{O}` : '\\text{H}_{2}\\text{O}';
    ro.set(`\\mk{n}{${n}\\ \\text{amino acids}}\\mk{r}{\\longrightarrow}\\mk{p}{\\text{${CHAIN[n]}}} + \\mk{w}{${water}}`, '', { form: 'rx' });
  }
  register(d.fig, { update: () => {}, draw });
})();
};
