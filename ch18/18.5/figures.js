/* Figures for section 18.5 Occurrence, Preparation, and Compounds of Hydrogen. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['18.5'] = function (root, F) {
const { PAL, cycle, register, begin, text, dot } = F;
const TAU = 2 * Math.PI;
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;
/* a fixed pseudo-random number in [0, 1) for event k and draw j, so every run draws the same */
const rnd = (k, j) => { const s = Math.sin(k * 127.1 + j * 311.7) * 43758.5453; return s - Math.floor(s); };

/* =====================================================================
   FIGURE 18.26: the electrolysis of water, flat as the book draws it. A
   beaker of water with sulfuric acid, a battery standing in it, and an
   inverted test tube over each terminal, held by a ring. Moving: the cell
   runs for T = 6 s of model time and holds. One H₂ rises from the cathode
   (−) every 0.2 s and one O₂ from the anode (+) every 0.4 s; the gas at the
   top of each tube grows as V = VMAX · t / T, hydrogen to 8.0 mL and oxygen
   to 4.0 mL, and the water in each tube falls to make room. The tubes are
   drawn as 10 mL tubes, a scale of the drawing's own (the book states
   none), graduated every 1 mL. Beside the beaker, the book's three insets:
   two water molecules give two of hydrogen and one of oxygen.
===================================================================== */
(function () {
  const d = F.sim(root, 'sim-electrolysis', 640);
  const T = 6, cy = cycle(() => T, 1.5);
  const BL = 250, BR = 670, BT = 250, BB = 600, WL = 300;          /* beaker and its water level */
  const BX = 460, BAT = { l: 380, r: 540, t: 440, k: 488 };          /* battery: centre; its cap from t to k, its body below */
  const TUBES = [{ x: 422, key: 'H', max: 8, every: 0.2, side: -1 }, { x: 498, key: 'O', max: 4, every: 0.4, side: 1 }];
  const TR = 30, TTOP = 76, TMOUTH = 430, PER = 32;                    /* tube half width, closed top, mouth; px per mL */
  const Y0 = TTOP + 14;                                                 /* the 0 mL mark, just under the dome */
  const yOf = (ml) => Y0 + ml * PER;
  const hits = []; F.hover(d.stage, () => hits);
  const H2 = [['H', 7, -6, 0], ['H', 7, 6, 0]], O2 = [['O', 9.5, -7.5, 0], ['O', 9.5, 7.5, 0]], H2O = [['O', 11, 0, -2], ['H', 7, -11, 6], ['H', 7, 11, 6]];
  function mol(ctx, x, y, atoms, s = 1) {
    atoms.forEach(([e, r, dx, dy]) => { ctx.save(); ctx.beginPath(); ctx.arc(x + dx * s, y + dy * s, r * s, 0, TAU); ctx.fillStyle = F.el(e); ctx.fill();
      ctx.lineWidth = e === 'H' ? 1.6 : 1; ctx.strokeStyle = e === 'H' ? PAL.ink : F.alpha(PAL.ink, 0.45); ctx.stroke(); ctx.restore(); });
  }
  const tubePath = (ctx, x) => { ctx.beginPath(); ctx.moveTo(x - TR, TMOUTH); ctx.lineTo(x - TR, TTOP + TR); ctx.arc(x, TTOP + TR, TR, Math.PI, 0); ctx.lineTo(x + TR, TMOUTH); };
  function draw() {
    const { ctx } = begin(d.c); hits.length = 0;
    const t = cy.now(), water = F.alpha(PAL.muted, 0.2), cv = F.C('volume');
    const vol = (g) => g.max * Math.min(1, t / T);
    /* the water in the beaker, the beaker's glass */
    ctx.save(); ctx.fillStyle = water; ctx.fillRect(BL + 2, WL, BR - BL - 4, BB - WL - 2); ctx.restore();
    F.line(ctx, BL + 2, WL, BR - 2, WL, F.alpha(PAL.ink, 0.45), 1.5);
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(BL - 12, BT - 6); ctx.lineTo(BL, BT); ctx.lineTo(BL, BB - 14); ctx.quadraticCurveTo(BL, BB, BL + 14, BB); ctx.lineTo(BR - 14, BB); ctx.quadraticCurveTo(BR, BB, BR, BB - 14); ctx.lineTo(BR, BT); ctx.lineTo(BR + 12, BT - 6); ctx.stroke(); ctx.restore();
    /* the battery standing on the floor, its two terminals up */
    ctx.save(); ctx.fillStyle = F.mixColor(PAL.ink, PAL.panel, 0.75); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2; ctx.fillRect(BAT.l, BAT.k, BAT.r - BAT.l, BB - 2 - BAT.k); ctx.strokeRect(BAT.l, BAT.k, BAT.r - BAT.l, BB - 2 - BAT.k);
    ctx.fillStyle = F.mixColor(PAL.ink, PAL.panel, 0.2); ctx.fillRect(BAT.l, BAT.t, BAT.r - BAT.l, BAT.k - BAT.t); ctx.strokeRect(BAT.l, BAT.t, BAT.r - BAT.l, BAT.k - BAT.t); ctx.restore();
    TUBES.forEach((g) => { ctx.save(); ctx.fillStyle = F.mixColor(PAL.ink, PAL.panel, 0.55); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 1.5; ctx.fillRect(g.x - 12, BAT.t - 12, 24, 12); ctx.strokeRect(g.x - 12, BAT.t - 12, 24, 12); ctx.restore();
      F.text(ctx, g.side < 0 ? '−' : '+', g.x, (BAT.t + BAT.k) / 2, PAL.panel, { size: 26, align: 'center', weight: 600 }); });
    hits.push({ x: BX, y: 540, r: 50, name: 'the battery' }, { x: 422, y: BAT.t - 6, r: 14, name: 'the cathode (−), where water is reduced to hydrogen' }, { x: 498, y: BAT.t - 6, r: 14, name: 'the anode (+), where water is oxidized to oxygen' });
    /* the tubes: gas above, water below the falling level, molecules collected in the gas */
    TUBES.forEach((g) => {
      const lev = yOf(vol(g));
      ctx.save(); tubePath(ctx, g.x); ctx.closePath(); ctx.clip();
      ctx.fillStyle = PAL.panel; ctx.fillRect(g.x - TR, TTOP, 2 * TR, TMOUTH - TTOP);
      ctx.fillStyle = water; ctx.fillRect(g.x - TR, lev, 2 * TR, TMOUTH - lev); ctx.restore();
      F.line(ctx, g.x - TR + 2, lev, g.x + TR - 2, lev, F.alpha(PAL.ink, 0.5), 1.5);
      /* the gas already collected, drawn as molecules spread through it, one per mL */
      const n = Math.floor(vol(g) + 1e-6);
      for (let i = 0; i < n; i++) { const y = Y0 + (i + 0.5) * PER * (vol(g) / Math.max(n, 1)) * 0.98, x = g.x + (i % 2 ? 9 : -9); mol(ctx, x, Math.min(y, lev - 12), g.key === 'H' ? H2 : O2, 0.85); }
      /* bubbles rising from the terminal to the gas */
      const K = Math.floor(t / g.every);
      for (let k = Math.max(0, K - 12); k <= K; k++) {
        const tk = k * g.every, y = BAT.t - 16 - 260 * (t - tk) * (0.85 + 0.3 * rnd(k, g.max));
        if (y < lev + 10 || t >= T) continue;
        const x = g.x + (rnd(k, g.max + 3) - 0.5) * 30;
        mol(ctx, x, y, g.key === 'H' ? H2 : O2, 0.8);
        hits.push({ x, y, r: 12, name: g.key === 'H' ? 'a hydrogen molecule, H₂, rising' : 'an oxygen molecule, O₂, rising' });
      }
      ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2.5; tubePath(ctx, g.x); ctx.stroke(); ctx.restore();
      /* graduations every mL on the outer side, numbered every 2 mL */
      const ex = g.x + g.side * TR;
      for (let m = 0; m <= 10; m++) { F.line(ctx, ex, yOf(m), ex - g.side * (m % 2 ? 8 : 14), yOf(m), PAL.ink, 1.5); if (m % 2 === 0) F.text(ctx, String(m), ex + g.side * 10, yOf(m), PAL.muted, { size: 15, align: g.side < 0 ? 'right' : 'left' }); }
      hits.push({ x: g.x, y: (Y0 + lev) / 2, r: 24, name: (g.key === 'H' ? 'hydrogen' : 'oxygen') + ' collected, ' + vol(g).toFixed(1) + ' mL' });
    });
    /* the ring that holds the two tubes */
    ctx.save(); ctx.strokeStyle = F.mixColor(PAL.ink, PAL.panel, 0.3); ctx.lineWidth = 6; ctx.beginPath(); ctx.ellipse(BX, 385, 96, 12, 0, 0, TAU); ctx.stroke(); ctx.restore();
    hits.push({ x: BX + 90, y: 385, r: 12, name: 'the ring that holds the tubes' });
    /* names */
    const call = (s2, x0, y0, x1, y1, right) => { F.line(ctx, x0, y0, x1, y1, PAL.ink, 1.8); F.text(ctx, s2, x1 + (right ? 8 : -8), y1, PAL.ink, { size: 22, align: right ? 'left' : 'right', bg: PAL.panel }); };
    call('H₂(g)', 422 - TR - 22, 160, 260, 160, false);
    call('O₂(g)', 498 + TR + 22, 140, 660, 140, true);
    call('cathode (−)', 410, BAT.t - 8, 220, 420, false);
    call('anode (+)', 510, BAT.t - 8, 700, 420, true);
    call('battery', BAT.l, 550, 220, 550, false);
    call('H₂O(l) + H₂SO₄', BR - 20, 340, 700, 340, true);
    /* the book's insets: what the molecules do */
    const IN = [[960, 'water', '2H₂O(l)', [[H2O, -24, -18], [H2O, 22, 22]]], [1130, 'hydrogen', '2H₂(g)', [[H2, -18, -16], [H2, 18, 20]]], [1295, 'oxygen', 'O₂(g)', [[O2, 0, 0]]]];
    IN.forEach(([x, w, f, ms], i) => {
      ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(x, 330, 66, 0, TAU); ctx.stroke(); ctx.restore();
      ms.forEach(([m, dx, dy]) => mol(ctx, x + dx * 0.85, 330 + dy * 0.85, m, 1.35));
      F.text(ctx, w, x, 438, PAL.ink, { size: 22, align: 'center' }); F.text(ctx, f, x, 468, PAL.ink, { size: 22, align: 'center' });
      if (i) F.text(ctx, i === 1 ? '⟶' : '+', x - (i === 1 ? 85 : 82), 330, PAL.ink, { size: 34, align: 'center' });
      hits.push({ x, y: 330, r: 66, name: { water: 'two water molecules', hydrogen: 'two hydrogen molecules', oxygen: 'one oxygen molecule' }[w] });
    });
    F.headline(ctx, 'Hydrogen collects at the cathode (−) twice as fast as oxygen at the anode (+).');
    const vO = Math.round(4 * Math.min(1, t / T) * 10) / 10, ml = (x) => hue('volume', x.toFixed(1) + '\\ \\text{mL}');
    const s = `\\kV_{\\text{H}_2} = 2\\,\\kV_{\\text{O}_2} = 2 \\times ${ml(vO)} = ${ml(2 * vO)}`;
    if (s !== draw.last) { draw.last = s; F.tex(d.readout, s, false, { values: false }); }
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();
};
