/* Figures for section 17.5 Batteries and Fuel Cells. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['17.5'] = function (root, F) {
const { el, fmt, tex, PAL, alpha, cycle, register, begin, line, text, topline } = F;
const sim = (id, H) => F.sim(root, id, H);
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;
const TAU = 2 * Math.PI;
/* the point a fraction k of the way along a polyline, by arc length */
const at = (pts, k) => { const q = F.partial(pts, Math.max(0, Math.min(1, k))); return q[q.length - 1]; };
/* a readout a clock drives: typeset only when its text changes */
function say(d, main, small) {
  const key = main + '|' + small; if (d.said === key) return; d.said = key;
  tex(d.readout, main); if (small) d.readout.appendChild(el('small', null, small));
}
function atom(ctx, x, y, r, sym) {
  ctx.save(); ctx.fillStyle = F.el(sym); ctx.strokeStyle = alpha(PAL.ink, 0.45); ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore();
}
/* an ion's charge, a small + or − set just above and right of its disc */
function charge(ctx, x, y, r, plus) {
  const cx = x + r + 3, cy = y - r, s = 4;
  line(ctx, cx - s, cy, cx + s, cy, PAL.ink, 2); if (plus) line(ctx, cx, cy - s, cx, cy + s, PAL.ink, 2);
}
const electron = (ctx, x, y) => { atom(ctx, x, y, 6, 'e-'); charge(ctx, x, y, 6, false); };
/* a row of kinds beneath a scene: a token w wide and its name each, centered */
function legend(ctx, y, items) {
  const tw = items.map((it) => it.w || 20), w = items.map((it, i) => tw[i] + 8 + F.measure(ctx, it.name, { size: 18 }));
  let x = 700 - (w.reduce((a, b) => a + b, 0) + 28 * (items.length - 1)) / 2;
  items.forEach((it, i) => { it.draw(x + tw[i] / 2, y); text(ctx, it.name, x + tw[i] + 8, y, PAL.ink, { size: 18 }); x += w[i] + 28; });
}

/* =====================================================================
   FIGURE 17.12: a lithium ion battery, discharging or being charged.
   Flat, side on as the book draws it. The positive electrode (left) is
   three CoO2 layers with a row of four lithium sites beneath each; the
   negative electrode (right) is four graphite layers with four sites in
   each of the three gaps: twelve sites a side, so x, the lithium the
   graphite holds per cobalt, is (lithium in graphite)/12. The two sites
   of each oxide row farthest from the electrolyte stay filled. Moving:
   six ions cross, one every 0.85 s, each taking 1.4 s, the nearest to
   the electrolyte first; one electron runs the external circuit with
   each. Discharge takes x from 0.50 to 0.00, charge from 0.00 to 0.50.
===================================================================== */
(function () {
  const d = sim('sim-li-ion', 600);
  const mode = F.choice(d.controls, { label: '\\text{process}', options: [{ value: 'discharge', label: 'discharge' }, { value: 'charge', label: 'charge' }], value: 'discharge', aria: 'whether the battery discharges or is being charged', onInput: () => cy.reset() });
  const WY = 128, LX = 330, RX = 1040, TOPE = 218, D = 1.4, S0 = 0.3, DS = 0.85, T = S0 + 5 * DS + D + 0.05;
  const CO_Y = [232, 322, 412], OX = (r, c) => [225 + 70 * c, 277 + 90 * r];
  const GR_Y = [232, 307, 382, 457], GR = (r, c) => [925 + 80 * c, 269.5 + 75 * r];
  const FACE_OX = 482, FACE_GR = 878;
  /* the six that move: graphite site and oxide site, in the order they leave on discharge */
  const MOVERS = [0, 1, 2].map((r) => [r, 0, r, 2]).concat([0, 1, 2].map((r) => [r, 1, r, 3]))
    .map(([gr, gc, or, oc]) => ({ g: GR(gr, gc), o: OX(or, oc) }));
  /* on charge the order turns round: the oxide sites nearest the electrolyte empty first, into the far graphite sites */
  const CHARGE = [0, 1, 2].map((r) => ({ o: OX(r, 3), g: GR(r, 1) })).concat([0, 1, 2].map((r) => ({ o: OX(r, 2), g: GR(r, 0) })));
  const pathOf = (from, to, fromFace, toFace) => [from, [fromFace, from[1]], [toFace, to[1]], to];
  const cy = cycle(() => T, 1.2);
  function draw() {
    const { ctx } = begin(d.c), t = cy.now(), dis = mode.value === 'discharge', hits = [];
    const ink = PAL.ink;
    /* the electrolyte between the electrodes */
    ctx.save(); ctx.fillStyle = alpha(ink, 0.05); ctx.fillRect(490, 210, 380, 270); ctx.restore();
    hits.push({ x: 680, y: 300, r: 60, name: 'the electrolyte, through which lithium ions travel between the electrodes' });
    /* the positive electrode: CoO2 layers, O above and below each row of Co */
    CO_Y.forEach((y) => {
      for (let j = 0; j < 5; j++) { const x = 236 + 52 * j; atom(ctx, x, y - 15, 8, 'O'); atom(ctx, x, y + 15, 8, 'O'); hits.push({ x, y: y - 15, r: 8, name: 'an oxygen atom of a CoO₂ layer' }, { x, y: y + 15, r: 8, name: 'an oxygen atom of a CoO₂ layer' }); }
      for (let j = 0; j < 6; j++) { const x = 210 + 52 * j; atom(ctx, x, y, 10, 'Co'); hits.push({ x, y, r: 10, name: 'a cobalt atom of a CoO₂ layer' }); }
    });
    /* the negative electrode: graphite layers seen edge on, carbon atoms on a zigzag */
    GR_Y.forEach((y) => {
      const pts = Array.from({ length: 11 }, (_, j) => [895 + 30 * j, y + (j % 2 ? 5 : -5)]);
      for (let j = 1; j < pts.length; j++) line(ctx, pts[j - 1][0], pts[j - 1][1], pts[j][0], pts[j][1], alpha(ink, 0.55), 3);
      pts.forEach(([x, yy]) => { atom(ctx, x, yy, 8, 'C'); hits.push({ x, y: yy, r: 8, name: 'a carbon atom of a graphite layer' }); });
    });
    /* lithium that stays in the oxide */
    for (let r = 0; r < 3; r++) for (let c = 0; c < 2; c++) { const [x, y] = OX(r, c); atom(ctx, x, y, 11, 'Li'); hits.push({ x, y, r: 11, name: 'a lithium ion between the CoO₂ layers' }); }
    /* the six that cross */
    const list = dis ? MOVERS.map((m) => ({ from: m.g, to: m.o, path: pathOf(m.g, m.o, FACE_GR, FACE_OX) })) : CHARGE.map((m) => ({ from: m.o, to: m.g, path: pathOf(m.o, m.g, FACE_OX, FACE_GR) }));
    let arrived = 0;
    list.forEach((m, i) => {
      const k = (t - (S0 + DS * i)) / D;
      if (k >= 1) arrived++;
      const [x, y] = k <= 0 ? m.from : k >= 1 ? m.to : at(m.path, k);
      const inGraphite = (k >= 1) === !dis;
      atom(ctx, x, y, 11, 'Li');
      if (k > 0 && k < 1) { charge(ctx, x, y, 11, true); hits.push({ x, y, r: 14, name: 'a lithium ion, Li⁺, crossing the electrolyte' }); }
      else hits.push({ x, y, r: 11, name: inGraphite ? 'a lithium atom held between graphite layers, as LiC₆' : 'a lithium ion between the CoO₂ layers' });
    });
    /* the external circuit and what is in it */
    const BX0 = 610, BX1 = 790;
    line(ctx, LX, TOPE, LX, WY, ink, 3); line(ctx, LX, WY, BX0, WY, ink, 3); line(ctx, BX1, WY, RX, WY, ink, 3); line(ctx, RX, WY, RX, TOPE, ink, 3);
    ctx.save(); ctx.fillStyle = PAL.panel; ctx.strokeStyle = ink; ctx.lineWidth = 3; ctx.beginPath(); ctx.roundRect(BX0, WY - 26, BX1 - BX0, 52, 8); ctx.fill(); ctx.stroke(); ctx.restore();
    mode.only(ctx, 'discharge', () => text(ctx, 'device', 700, WY, ink, { size: 20, align: 'center' }), [0, 0]);
    mode.only(ctx, 'charge', () => text(ctx, 'charger', 700, WY, ink, { size: 20, align: 'center' }), [0, 0]);
    hits.push({ x: 700, y: WY, r: 40, name: dis ? 'a device the battery powers' : 'a charger, an external source of power that drives the cell reaction backward' });
    text(ctx, '+', LX - 24, TOPE - 22, ink, { size: 26, align: 'center', weight: 600 });
    text(ctx, '−', RX + 24, TOPE - 22, ink, { size: 26, align: 'center', weight: 600 });
    const wire = dis ? [[RX, TOPE], [RX, WY], [LX, WY], [LX, TOPE]] : [[LX, TOPE], [LX, WY], [RX, WY], [RX, TOPE]];
    list.forEach((_, i) => {
      const k = (t - (S0 + DS * i)) / D; if (k <= 0 || k >= 1) return;
      const [x, y] = at(wire, k); if (y === WY && x > BX0 - 6 && x < BX1 + 6) return;
      electron(ctx, x, y); hits.push({ x, y, r: 12, name: 'an electron, e⁻, in the external circuit' });
    });
    /* names */
    F.label(ctx, 'electrolyte', 680, 480, { side: 'below', gap: 26 });
    mode.only(ctx, 'discharge', () => { F.label(ctx, 'positive electrode (cathode)', 330, 480, { side: 'below', gap: 26 }); F.label(ctx, 'negative electrode (anode)', 1040, 480, { side: 'below', gap: 26 }); }, [0, 0]);
    mode.only(ctx, 'charge', () => { F.label(ctx, 'positive electrode (anode)', 330, 480, { side: 'below', gap: 26 }); F.label(ctx, 'negative electrode (cathode)', 1040, 480, { side: 'below', gap: 26 }); }, [0, 0]);
    legend(ctx, 568, [
      { name: 'lithium', draw: (x, y) => atom(ctx, x, y, 10, 'Li') },
      { name: 'cobalt', draw: (x, y) => atom(ctx, x, y, 10, 'Co') },
      { name: 'oxygen', draw: (x, y) => atom(ctx, x, y, 8, 'O') },
      { name: 'carbon', draw: (x, y) => atom(ctx, x, y, 8, 'C') },
      { name: 'electron', w: 24, draw: (x, y) => electron(ctx, x - 5, y) },
    ]);
    topline(ctx, dis ? 'On discharge, lithium ions leave the graphite for the cobalt oxide as electrons run through the device.' : 'On charge, the charger drives electrons and lithium ions back into the graphite.');
    d.hits = hits;
    const x = (dis ? 6 - arrived : arrived) / 12;
    say(d, `\\text{Li}_{1-x}\\text{CoO}_{2}+x\\,\\text{LiC}_{6}\\rightleftharpoons\\text{LiCoO}_{2}+x\\,\\text{C}_{6}\\qquad x = ${fmt(x, 2)}\\qquad \\kEcell\\sim ${hue('potential', '3.7\\ \\text{V}')}`,
      'One electron passes through the external circuit for each lithium ion that crosses the electrolyte.');
  }
  F.hover(d.stage, () => d.hits || []);
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();

/* =====================================================================
   FIGURE 17.14: a hydrogen fuel cell, flat, as the book's section.
   Fuel enters the left channel and air the right; each channel runs
   down beside its electrode and out. Moving, on a 6.2 s loop: two turns
   of 2 H2 + O2 -> 2 H2O, at 0.1 s and 2.5 s. In a turn two H2 reach the
   anode (1.0 s), each gives two H+ to the electrolyte and two e- to the
   wire; the four H+ and four e- reach the O2 waiting at the cathode
   (1.2 s each, 0.1 s apart), which leaves as two H2O (1.1 s). Unreacted
   H2, N2 and one O2 of the air run their channels on the same loop,
   wrapped so the streams never break.
===================================================================== */
(function () {
  const d = sim('sim-fuel-cell', 650);
  const WY = 160, AX = 535, CX = 865, TOP = 230, BOT = 550, T = 6.2, TURNS = [0.1, 2.5];
  const YA = [320, 420], YC = 380;
  const fuelTo = (y) => [[175, 262], [450, 262], [450, y], [492, y]];
  const airTo = (y) => [[1225, 262], [950, 262], [950, y], [905, y]];
  const FUEL_BY = [[175, 278], [420, 278], [420, 512], [175, 512]];
  const AIR_BY = [[1225, 278], [980, 278], [980, 512], [1225, 512]];
  const waterOut = (y) => [[905, y], [950, y], [950, 500], [1225, 500]];
  const OFF = [-24, -8, 8, 24];
  const cy = cycle(() => T, 1.2);
  const wrap = (age) => ((age % T) + T) % T;
  const h2 = (ctx, x, y) => { atom(ctx, x - 7, y, 9, 'H'); atom(ctx, x + 7, y, 9, 'H'); };
  const di = (ctx, x, y, s) => { atom(ctx, x - 8, y, 10, s); atom(ctx, x + 8, y, 10, s); };
  const water = (ctx, x, y) => { atom(ctx, x - 10, y + 7, 7, 'H'); atom(ctx, x + 10, y + 7, 7, 'H'); atom(ctx, x, y, 10, 'O'); };
  const hplus = (ctx, x, y) => { atom(ctx, x, y, 8, 'H'); charge(ctx, x, y, 8, true); };
  function draw() {
    const { ctx } = begin(d.c), t = cy.now(), ink = PAL.ink, hits = [];
    /* channels: walls in soft gray, the gas paths open */
    const wall = (l, tp, r, b) => { ctx.save(); ctx.fillStyle = PAL.soft; ctx.strokeStyle = alpha(ink, 0.6); ctx.lineWidth = 2; ctx.fillRect(l, tp, r - l, b - tp); ctx.strokeRect(l, tp, r - l, b - tp); ctx.restore(); };
    wall(300, 230, 470, 250); wall(300, 290, 400, 490); wall(300, 530, 470, 550);
    wall(930, 230, 1100, 250); wall(1000, 290, 1100, 490); wall(930, 530, 1100, 550);
    for (const y of [250, 290, 490, 530]) { line(ctx, 160, y, 300, y, alpha(ink, 0.6), 2); line(ctx, 1100, y, 1240, y, alpha(ink, 0.6), 2); }
    hits.push({ x: 200, y: 510, r: 22, name: 'excess fuel out' }, { x: 1200, y: 510, r: 22, name: 'unused gases out' });
    /* electrodes and electrolyte */
    const slab = (l, r, a) => { ctx.save(); ctx.fillStyle = alpha(ink, a); ctx.strokeStyle = alpha(ink, 0.6); ctx.lineWidth = 2; ctx.fillRect(l, TOP, r - l, BOT - TOP); ctx.strokeRect(l, TOP, r - l, BOT - TOP); ctx.restore(); };
    slab(470, 600, 0.13); slab(600, 800, 0.05); slab(800, 930, 0.13);
    ctx.save(); ctx.fillStyle = alpha(ink, 0.18);
    for (let y = TOP + 14; y < BOT; y += 22) for (const x0 of [470, 800]) for (let x = x0 + 12 + (y % 44 ? 11 : 0); x < x0 + 130; x += 22) { ctx.beginPath(); ctx.arc(x, y, 2.2, 0, TAU); ctx.fill(); }
    ctx.restore();
    hits.push({ x: 520, y: 470, r: 34, name: 'the anode, graphite with a platinum-based catalyst' }, { x: 700, y: 470, r: 60, name: 'the electrolyte, which carries H⁺ ions from the anode to the cathode' }, { x: 880, y: 470, r: 34, name: 'the cathode, graphite with a platinum-based catalyst' });
    /* the external circuit, a load in it */
    line(ctx, AX, TOP, AX, WY, ink, 3); line(ctx, AX, WY, 640, WY, ink, 3); line(ctx, 760, WY, CX, WY, ink, 3); line(ctx, CX, WY, CX, TOP, ink, 3);
    ctx.save(); ctx.strokeStyle = ink; ctx.lineWidth = 3; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(640, WY);
    for (let j = 1; j <= 12; j++) ctx.lineTo(640 + 10 * j - 5, WY + (j % 2 ? -14 : 14));
    ctx.lineTo(760, WY); ctx.stroke(); ctx.restore();
    hits.push({ x: 700, y: WY, r: 34, name: 'the load the electric current runs' });
    /* the streams that pass through unreacted */
    [0, 2.07, 4.13].forEach((s) => { const k = wrap(t - s) / 3.0; if (k >= 1) return; const [x, y] = at(FUEL_BY, k); h2(ctx, x, y); hits.push({ x, y, r: 16, name: 'a hydrogen molecule that passes through unreacted, as excess fuel' }); });
    [0, 1.55, 3.1, 4.65].forEach((s) => { const k = wrap(t - s) / 3.0; if (k >= 1) return; const [x, y] = at(AIR_BY, k); di(ctx, x, y, 'N'); hits.push({ x, y, r: 18, name: 'a nitrogen molecule, N₂, of the air, which passes through unused' }); });
    { const k = wrap(t - 0.8) / 3.0; if (k < 1) { const [x, y] = at(AIR_BY, k); di(ctx, x, y, 'O'); hits.push({ x, y, r: 18, name: 'an oxygen molecule of the air that passes through unused' }); } }
    /* the reaction, turn by turn */
    let done = 0;
    TURNS.forEach((s) => {
      const R = s + 1.0 + 0.3 + 1.2;
      if (t >= R) done++;
      YA.forEach((ya) => { const k = (t - s) / 1.0; if (k < 0 || k >= 1) return; const [x, y] = at(fuelTo(ya), k); h2(ctx, x, y); hits.push({ x, y, r: 16, name: 'a hydrogen molecule, H₂, of the fuel' }); });
      { const k = (t - s - 0.8) / 1.2; if (k >= 0 && t < R) { const [x, y] = at(airTo(YC), k); di(ctx, x, y, 'O'); hits.push({ x, y, r: 18, name: 'an oxygen molecule, O₂, from the air' }); } }
      OFF.forEach((o, q) => {
        const ya = YA[q >> 1] + (q % 2 ? 10 : -10), k = (t - s - 1.0 - 0.1 * q) / 1.2;
        if (t < s + 1.0 || t >= R) return;
        const [hx, hy] = at([[496, ya], [600, ya], [800, YC + o], [888, YC + o]], k);
        hplus(ctx, hx, hy); hits.push({ x: hx, y: hy, r: 12, name: 'a hydrogen ion, H⁺, crossing the electrolyte' });
        const [ex, ey] = at([[AX, ya], [AX, WY], [CX, WY], [CX, YC + o], [888, YC + o]], k);
        electron(ctx, ex, ey); hits.push({ x: ex, y: ey, r: 12, name: 'an electron, e⁻, in the external circuit' });
      });
      [-14, 14].forEach((o) => { const k = (t - R) / 1.1; if (k < 0 || k >= 1) return; const [x, y] = at(waterOut(YC + o), k); water(ctx, x, y); hits.push({ x, y, r: 16, name: 'a water molecule, H₂O, formed at the cathode' }); });
    });
    /* names */
    F.label(ctx, 'fuel in', 225, 250, { side: 'above', gap: 22 });
    F.label(ctx, 'air in', 1175, 250, { side: 'above', gap: 22 });
    F.label(ctx, 'anode', 535, BOT, { side: 'below', gap: 24 });
    F.label(ctx, 'electrolyte', 700, BOT, { side: 'below', gap: 24 });
    F.label(ctx, 'cathode', 865, BOT, { side: 'below', gap: 24 });
    F.label(ctx, 'electric current', 700, WY - 14, { side: 'above', gap: 22 });
    legend(ctx, 622, [
      { name: 'H₂', w: 32, draw: (x, y) => h2(ctx, x, y) },
      { name: 'O₂', w: 36, draw: (x, y) => di(ctx, x, y, 'O') },
      { name: 'N₂', w: 36, draw: (x, y) => di(ctx, x, y, 'N') },
      { name: 'H₂O', w: 34, draw: (x, y) => water(ctx, x, y - 3) },
      { name: 'H⁺', w: 30, draw: (x, y) => hplus(ctx, x - 6, y) },
      { name: 'e⁻', w: 24, draw: (x, y) => electron(ctx, x - 5, y) },
    ]);
    topline(ctx, 'Electrons from hydrogen at the anode reach oxygen at the cathode through the external circuit, while H⁺ crosses the electrolyte.');
    d.hits = hits;
    say(d, `2\\text{H}_{2}(g)+\\text{O}_{2}(g)\\longrightarrow 2\\text{H}_{2}\\text{O}(g)\\qquad \\kEcell\\sim ${hue('potential', '1.2\\ \\text{V}')}`,
      `So far ${2 * done} H₂ and ${done} O₂ have reacted, giving ${2 * done} H₂O, and ${4 * done} electrons have passed through the circuit.`);
  }
  F.hover(d.stage, () => d.hits || []);
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();
};
