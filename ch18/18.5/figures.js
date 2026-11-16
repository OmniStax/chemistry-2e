/* Figures for section 18.5 Occurrence, Preparation, and Compounds of Hydrogen. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['18.5'] = function (root, F) {
const { PAL, cycle, register, begin } = F;
const TAU = 2 * Math.PI;

/* =====================================================================
   FIGURE 18.26: the electrolysis of water, counted in atoms. On the left the
   book's apparatus, flat: a beaker of water with sulfuric acid, a battery
   standing in it, an inverted test tube over each terminal, a ring round the
   tubes. On the right one step of the net reaction close up: the six atoms
   of two water molecules regroup, the two O meeting as one O₂ and each
   water's two H leaving as one H₂. Moving: N = 5 steps of BEAT = 1.2 s of
   model time and a hold. In each step the atoms regroup (0.08 to 0.55 of the
   step), then two H₂ rise from the − terminal and one O₂ from the + terminal
   (0.5 to 0.95) and the gas columns lengthen, hydrogen's by twice oxygen's.
   Every molecule in a tube takes PITCH of its length, so equal numbers fill
   equal volumes. The book states no volumes and the figure invents none.
===================================================================== */
(function () {
  const d = F.sim(root, 'sim-electrolysis', 700);
  const N = 5, BEAT = 1.2, T = N * BEAT, cy = cycle(() => T, 1.5);
  const sm = F.ease.smooth, clamp = (x) => Math.min(1, Math.max(0, x)), seg = (p, a, b) => clamp((p - a) / (b - a));
  const BL = 220, BR = 660, BT = 330, BB = 660, WL = 372;              /* beaker walls, rim, floor; its water level */
  const BAT = { l: 330, r: 550, t: 498, k: 532 };                       /* battery: its dark cap from t to k, its body below to the floor */
  const TH = 44, TTOP = 112, TM = 498, Y0 = TTOP, PITCH = 25;            /* tube half width, closed top, mouth; top of the gas; length per molecule */
  const TUBES = [{ x: 390, key: 'H', per: 2, side: -1 }, { x: 490, key: 'O', per: 1, side: 1 }];
  const hits = []; F.hover(d.stage, () => hits);
  function atom(ctx, e, x, y, r) {
    ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fillStyle = F.el(e); ctx.fill();
    ctx.lineWidth = e === 'H' ? Math.max(1.6, r / 9) : 1.2; ctx.strokeStyle = e === 'H' ? PAL.ink : F.alpha(PAL.ink, 0.5); ctx.stroke(); ctx.restore();
  }
  const gasMol = (ctx, key, x, y) => { const r = key === 'H' ? 8 : 11, o = key === 'H' ? 7 : 9.5; atom(ctx, key, x - o, y, r); atom(ctx, key, x + o, y, r); };
  const tubePath = (ctx, x) => { ctx.beginPath(); ctx.moveTo(x - TH, TM); ctx.lineTo(x - TH, TTOP + TH); ctx.arc(x, TTOP + TH, TH, Math.PI, 0); ctx.lineTo(x + TH, TM); };
  /* the place molecule i takes in its tube's gas: a zigzag down the tube, one molecule per PITCH */
  const slot = (g, i) => (i ? [g.x + (i % 2 ? 15 : -15), Y0 + (i + 0.5) * PITCH] : [g.x, Y0 + 15.5]);
  /* the close-up: a circle, two waters above (their H atoms outward) and the products below */
  const CX = 1070, CY = 392, CR = 276, RO = 38, RH = 24, YW = 258, YP = 516;
  const W = [970, 1170], HX = [916, 1224];
  const ATOMS = [];
  [0, 1].forEach((w) => { const s = w ? 1 : -1;
    ATOMS.push({ e: 'O', from: [W[w], YW], to: [CX + s * 33, YP], name: 'an oxygen atom' });
    [-1, 1].forEach((v) => ATOMS.push({ e: 'H', from: [W[w] + s * 30, YW + v * 36], to: [HX[w] + v * 19, YP], name: 'a hydrogen atom' })); });
  function draw() {
    const { ctx } = begin(d.c); hits.length = 0;
    const t = Math.min(cy.now(), T), done = t >= T - 1e-9;
    const b = done ? N - 1 : Math.floor(t / BEAT), p = done ? 1 : t / BEAT - b;
    const rise = sm(seg(p, 0.5, 0.95)), made = b + (p >= 0.5 ? 1 : 0);   /* steps whose products have left the terminals */
    const water = F.alpha(PAL.muted, 0.2), glass = PAL.ink, cv = F.C('volume');
    /* the beaker: its water, then its glass with a rim that flares */
    ctx.save(); ctx.fillStyle = water; ctx.beginPath(); ctx.moveTo(BL + 2, WL); ctx.lineTo(BL + 2, BB - 16); ctx.quadraticCurveTo(BL + 2, BB - 2, BL + 16, BB - 2); ctx.lineTo(BR - 16, BB - 2); ctx.quadraticCurveTo(BR - 2, BB - 2, BR - 2, BB - 16); ctx.lineTo(BR - 2, WL); ctx.closePath(); ctx.fill(); ctx.restore();
    F.line(ctx, BL + 2, WL, BR - 2, WL, F.alpha(PAL.ink, 0.5), 1.5);
    /* the back half of the ring, behind the tubes */
    const ring = (a0, a1) => { ctx.save(); ctx.strokeStyle = F.mixColor(PAL.ink, PAL.panel, 0.35); ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.ellipse(440, 446, 112, 13, 0, a0, a1); ctx.stroke(); ctx.restore(); };
    ring(Math.PI, TAU);
    /* the battery standing on the floor: body, stripe, dark cap, a snap terminal under each tube */
    ctx.save(); ctx.lineJoin = 'round'; ctx.strokeStyle = glass; ctx.lineWidth = 2;
    ctx.fillStyle = F.mixColor(PAL.ink, PAL.panel, 0.8); ctx.beginPath(); ctx.rect(BAT.l, BAT.k, BAT.r - BAT.l, BB - 3 - BAT.k); ctx.fill(); ctx.stroke();
    ctx.fillStyle = F.mixColor(PAL.ink, PAL.panel, 0.18); ctx.beginPath(); ctx.rect(BAT.l, BAT.t, BAT.r - BAT.l, BAT.k - BAT.t); ctx.fill(); ctx.stroke(); ctx.restore();
    F.line(ctx, BAT.l + 1, BAT.k + 7, BAT.r - 1, BAT.k + 7, F.mixColor(PAL.ink, PAL.panel, 0.45), 3);
    const snap = (g) => { ctx.save(); ctx.fillStyle = F.mixColor(PAL.ink, PAL.panel, 0.6); ctx.strokeStyle = glass; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(g.x - 15, BAT.t); ctx.lineTo(g.x - 15, BAT.t - 9); ctx.quadraticCurveTo(g.x - 15, BAT.t - 15, g.x - 9, BAT.t - 15); ctx.lineTo(g.x + 9, BAT.t - 15); ctx.quadraticCurveTo(g.x + 15, BAT.t - 15, g.x + 15, BAT.t - 9); ctx.lineTo(g.x + 15, BAT.t); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore(); };
    TUBES.forEach((g) => {
      F.text(ctx, g.side < 0 ? '−' : '+', g.x, (BAT.t + BAT.k) / 2, PAL.panel, { size: 26, align: 'center', weight: 600 }); });
    hits.push({ x: 440, y: 600, r: 60, name: 'the battery' }, { x: 390, y: BAT.t - 8, r: 16, name: 'the cathode (−), where hydrogen forms' }, { x: 490, y: BAT.t - 8, r: 16, name: 'the anode (+), where oxygen forms' });
    /* the tubes: gas above the level, water below it, the molecules collected and the ones rising */
    TUBES.forEach((g) => {
      const n0 = g.per * b, n1 = g.per * (b + 1);                        /* molecules before this step and after it */
      const lev = Y0 + PITCH * (n0 + (n1 - n0) * rise);
      ctx.save(); tubePath(ctx, g.x); ctx.closePath(); ctx.clip();
      ctx.fillStyle = PAL.panel; ctx.fillRect(g.x - TH, TTOP, 2 * TH, TM - TTOP);
      ctx.fillStyle = water; ctx.fillRect(g.x - TH, lev, 2 * TH, TM - lev); ctx.restore();
      snap(g);
      if (lev > Y0 + 1) F.line(ctx, g.x - TH + 2, lev, g.x + TH - 2, lev, F.alpha(PAL.ink, 0.5), 1.5);
      const nm = g.key === 'H' ? 'a hydrogen molecule, H₂' : 'an oxygen molecule, O₂';
      for (let i = 0; i < n0; i++) { const [x, y] = slot(g, i), w = 1.6 * Math.sin(t * 2.3 + i * 1.9 + g.x); gasMol(ctx, g.key, x + w, y); hits.push({ x, y, r: 14, name: nm }); }
      if (p >= 0.5) for (let i = n0; i < n1; i++) { const [sx, sy] = slot(g, i), k = sm(seg(p, 0.5 + 0.06 * (i - n0), 0.95));
        const x = g.x + (sx - g.x) * k + 10 * Math.sin(k * Math.PI * 3 + i), y = BAT.t - 30 + (sy - (BAT.t - 30)) * k;
        gasMol(ctx, g.key, k >= 1 ? sx : x, y); hits.push({ x, y, r: 14, name: nm + (k < 1 ? ', rising' : '') }); }
      ctx.save(); ctx.strokeStyle = glass; ctx.lineWidth = 2.6; ctx.lineJoin = 'round'; tubePath(ctx, g.x); ctx.stroke(); ctx.restore();
      F.line(ctx, g.x - TH - 5, TM, g.x - TH + 1, TM, glass, 2.6); F.line(ctx, g.x + TH - 1, TM, g.x + TH + 5, TM, glass, 2.6);
      hits.push({ x: g.x, y: 440, r: 30, name: 'a test tube, mouth down over the ' + (g.key === 'H' ? 'cathode' : 'anode') });
      F.text(ctx, g.key === 'H' ? 'H₂(g)' : 'O₂(g)', g.x, TTOP - 20, PAL.ink, { size: 22, align: 'center' });
      /* the gas column's length, the volume of the readout */
      if (lev > Y0 + 14) F.vbracket(ctx, g.x + g.side * (TH + 22), Y0, lev, cv, g.key === 'H' ? 'V_{H₂}' : 'V_{O₂}', g.side);
    });
    ring(0, Math.PI);
    hits.push({ x: 440, y: 459, r: 14, name: 'the ring that holds the tubes' }, { x: 334, y: 450, r: 12, name: 'the ring that holds the tubes' }, { x: 546, y: 450, r: 12, name: 'the ring that holds the tubes' });
    ctx.save(); ctx.strokeStyle = glass; ctx.lineWidth = 3.2; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(BL - 14, BT - 4); ctx.quadraticCurveTo(BL, BT - 2, BL, BT + 14); ctx.lineTo(BL, BB - 18); ctx.quadraticCurveTo(BL, BB, BL + 18, BB); ctx.lineTo(BR - 18, BB); ctx.quadraticCurveTo(BR, BB, BR, BB - 18); ctx.lineTo(BR, BT + 14); ctx.quadraticCurveTo(BR, BT - 2, BR + 14, BT - 4); ctx.stroke(); ctx.restore();
    /* names of the still parts */
    const call = (s2, x0, y0, x1, y1, right) => { F.line(ctx, x0, y0, x1, y1, PAL.ink, 1.6); F.text(ctx, s2, x1 + (right ? 8 : -8), y1, PAL.ink, { size: 22, align: right ? 'left' : 'right' }); };
    call('cathode (−)', 376, BAT.t - 8, 196, 470, false);
    call('H₂O(l) + H₂SO₄', BL + 44, 560, 196, 560, false);
    call('battery', BAT.l, 620, 196, 620, false);
    call('anode (+)', 504, BAT.t - 8, 684, 470, true);
    /* the close-up: one step of the reaction */
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2.6; ctx.fillStyle = PAL.panel; ctx.beginPath(); ctx.arc(CX, CY, CR, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore();
    F.arrow(ctx, CX, YW + 84, CX, YP - 66, PAL.ink, 4);
    F.text(ctx, 'H₂O(l)', W[0], YW - 82, PAL.ink, { size: 22, align: 'center' }); F.text(ctx, 'H₂O(l)', W[1], YW - 82, PAL.ink, { size: 22, align: 'center' });
    F.text(ctx, 'H₂(g)', HX[0], YP + 64, PAL.ink, { size: 22, align: 'center' }); F.text(ctx, 'H₂(g)', HX[1], YP + 64, PAL.ink, { size: 22, align: 'center' });
    F.text(ctx, 'O₂(g)', CX, YP + 64, PAL.ink, { size: 22, align: 'center' });
    const set = (k, names) => ATOMS.forEach((a, i) => { const x = a.from[0] + (a.to[0] - a.from[0]) * k, y = a.from[1] + (a.to[1] - a.from[1]) * k;
      atom(ctx, a.e, x, y, a.e === 'O' ? RO : RH); if (names) hits.push({ x, y, r: a.e === 'O' ? RO : RH, name: names(a, i) }); });
    const inWater = (a) => a.name + ' of a water molecule', inGas = (a) => a.name + (a.e === 'O' ? ' of the O₂ molecule' : ' of an H₂ molecule');
    /* the products of the step before leave upward as this step begins */
    if (b > 0 && p < 0.14) F.faded(ctx, 1 - sm(seg(p, 0, 0.14)), [0, -26 * seg(p, 0, 0.14)], () => set(1));
    /* this step's six atoms: two waters, regrouping, then the products at rest */
    const k = sm(seg(p, 0.08, 0.55)); set(k, k < 0.5 ? inWater : inGas);
    /* the next two waters arrive from above; after the last step they stand ready, as the run starts over */
    if (p > 0.76) F.faded(ctx, sm(seg(p, 0.76, 1)), [0, -26 * (1 - sm(seg(p, 0.76, 1)))], () => set(0));
    if (done) ATOMS.forEach((a) => hits.push({ x: a.from[0], y: a.from[1], r: a.e === 'O' ? RO : RH, name: inWater(a) }));
    hits.push({ x: CX, y: CY, r: CR, name: 'one step of the reaction, close up' });
    F.headline(ctx, 'Every 2 H₂O split gives 2 H₂ at the cathode (−) and 1 O₂ at the anode (+).');
    const nH = 2 * made, nO = made, m = (x) => `${x}\\ \\text{${x === 1 ? 'molecule' : 'molecules'}}`;
    const s = `${nH}\\,\\text{H}_2\\text{O}(l) \\longrightarrow ${nH}\\,\\text{H}_2(g) + ${nO}\\,\\text{O}_2(g) \\\\ `
      + `\\frac{\\kV_{\\text{H}_2}}{\\kV_{\\text{O}_2}} = ` + (made ? `\\frac{${m(nH)}}{${m(nO)}} = 2` : `\\frac{\\text{H}_2\\text{ molecules}}{\\text{O}_2\\text{ molecules}}`);
    if (s !== draw.last) { draw.last = s; F.tex(d.readout, s, false, { values: false }); }
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();
};
