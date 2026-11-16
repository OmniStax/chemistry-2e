/* Figures for section 11.5 Colloids. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['11.5'] = function (root, F) {
const { tex, PAL, alpha, cycle, register, begin, line, arrow, text, topline, hbracket, label } = F;
const sim = (id, H) => F.sim(root, id, H);
const TAU = 2 * Math.PI;
const clamp01 = (x) => Math.max(0, Math.min(1, x));
const smooth = F.ease.smooth;
const lerp = (a, b, k) => a + (b - a) * k;
const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const mul = (a, k) => [a[0] * k, a[1] * k, a[2] * k];
const unit = (a) => { const n = Math.hypot(a[0], a[1], a[2]) || 1; return mul(a, 1 / n); };
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const mix3 = (a, b, k) => [lerp(a[0], b[0], k), lerp(a[1], b[1], k), lerp(a[2], b[2], k)];
/* a fixed sequence of random numbers, so a figure lays its particles out the same way on every load */
const seeded = (s) => () => { s = (s + 0x6d2b79f5) | 0; let t = Math.imul(s ^ (s >>> 15), 1 | s); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
function ball(ctx, x, y, r, col, edge = 0.5) { ctx.save(); ctx.fillStyle = col; ctx.strokeStyle = alpha(PAL.ink, edge); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore(); }
/* a water molecule, its hydrogen atoms on the side the angle a points to */
function water(ctx, x, y, a, s = 1) {
  for (const h of [0.9, -0.9]) ball(ctx, x + 9 * s * Math.cos(a + h), y + 9 * s * Math.sin(a + h), 4.5 * s, F.el('H'), 0.6);
  ball(ctx, x, y, 7 * s, F.el('O'), 0.45);
}

/* =====================================================================
   SIM: the Tyndall effect and settling. One green laser beam crosses
   three beakers in a row toward a card: saltwater (a solution), milk (a
   colloid) and muddy water (a suspension). Where nothing scatters it the
   beam passes unseen and its path is drawn dashed; where particles of
   colloidal size or larger scatter it toward the eye it is drawn solid
   and glowing. The ions never show it, the butterfat droplets always do
   and never settle, and the grains of mud cloud the water and stop the
   beam until they have fallen to the bottom over a 7 s clock (minutes,
   in truth), after which the clear water lets it through unseen.
   Moving: settling has a time. The state is a function of the clock, so
   the scrubber runs it both ways; the jostling runs on its own.
   LASER_GREEN is the light of a green laser pointer, BUTTERFAT_CREAM the
   colour of butterfat and MUD_BROWN that of wet mud, physical colours.
   Flat: size, settling and the beam all read in one plane.
===================================================================== */
(function () {
  const LASER_GREEN = '#22b04a', BUTTERFAT_CREAM = '#f4e7b0', MUD_BROWN = '#8a5a33';
  const d = sim('sim-tyndall', 650);
  const RIM = 126, SURF = 164, BOT = 520, BY = 322, GW = 330, X0 = 152, CARD = 1322, T = 7;
  const rnd = seeded(11);
  const R = (a, b) => a + rnd() * (b - a);
  /* n points in a beaker at least gap apart */
  function scatter(l, n, r, gap, y0 = SURF + r + 8, y1 = BOT - r - 8) {
    const out = [];
    for (let tries = 0; out.length < n && tries < 4000; tries++) {
      const p = { x: R(l + r + 8, l + GW - r - 8), y: R(y0, y1), ph: R(0, TAU), w: R(1.5, 3) };
      if (out.every((q) => Math.hypot(q.x - p.x, q.y - p.y) > gap)) out.push(p);
    }
    return out;
  }
  const GLASS = [
    { key: 'solution', l: 190, name: 'saltwater, a solution', sub: 'dissolved Na⁺ and Cl⁻ ions' },
    { key: 'colloid', l: 570, name: 'milk, a colloid', sub: 'dispersed droplets of butterfat' },
    { key: 'suspension', l: 950, name: 'muddy water, a suspension', sub: 'suspended grains of mud' },
  ];
  const ions = scatter(190, 120, 3.5, 12).map((p, i) => ({ ...p, el: i % 2 ? 'Cl' : 'Na' }));
  const drops = scatter(570, 24, 11, 36);
  /* the grains start through the whole depth and come to rest in two rows, seven on the bottom and three in the hollows between them */
  const ML = 950, rest = [0, 1, 2, 3, 4, 5, 6].map((i) => ({ x: ML + 27 + i * 46, y: BOT - 24, up: 0 })).concat([1, 3, 5].map((m) => ({ x: ML + 50 + m * 46, y: BOT - 62, up: 1 }))).sort((a, b) => a.x - b.x);
  const grains = scatter(ML, 10, 22, 54, SURF + 34, BOT - 96).sort((a, b) => a.x - b.x).map((p, i) => { const to = rest[i], dist = Math.hypot(to.x - p.x, to.y - p.y), t0 = to.up ? 1.6 : R(0.2, 0.9); return { ...p, to, t0, dur: Math.min(T - 0.3 - t0, dist / 78) }; });
  const cy = cycle(() => T, 2.5);
  const hits = []; F.hover(d.stage, () => hits);
  let clock = 0;
  const jig = (p, a) => [a * Math.sin(p.w * clock + p.ph), a * Math.cos(1.3 * p.w * clock + p.ph)];
  /* a beaker: straight walls, rounded corners at the bottom, a lip at the rim */
  function beaker(ctx, l) {
    const r = l + GW, c = 16;
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.beginPath();
    ctx.moveTo(l - 9, RIM - 4); ctx.quadraticCurveTo(l, RIM, l, RIM + 12); ctx.lineTo(l, BOT - c); ctx.quadraticCurveTo(l, BOT, l + c, BOT); ctx.lineTo(r - c, BOT); ctx.quadraticCurveTo(r, BOT, r, BOT - c); ctx.lineTo(r, RIM + 12); ctx.quadraticCurveTo(r, RIM, r + 9, RIM - 4);
    ctx.stroke(); ctx.restore();
  }
  function liquid(ctx, l, col) {
    const r = l + GW, c = 16;
    ctx.save(); ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(l, SURF); ctx.lineTo(l, BOT - c); ctx.quadraticCurveTo(l, BOT, l + c, BOT); ctx.lineTo(r - c, BOT); ctx.quadraticCurveTo(r, BOT, r, BOT - c); ctx.lineTo(r, SURF); ctx.closePath(); ctx.fill(); ctx.restore();
  }
  /* the beam where it is scattered toward the eye, its brightness running from a0 to a1 */
  function seen(ctx, x1, x2, a0, a1, col) {
    if (a0 <= 0.01 && a1 <= 0.01) return;
    ctx.save(); ctx.lineCap = 'butt';
    for (const [w, k] of [[26, 0.22], [8, 0.95]]) {
      const g = ctx.createLinearGradient(x1, 0, x2, 0); g.addColorStop(0, alpha(col, k * a0)); g.addColorStop(1, alpha(col, k * a1));
      ctx.strokeStyle = g; ctx.lineWidth = w; ctx.beginPath(); ctx.moveTo(x1, BY); ctx.lineTo(x2, BY); ctx.stroke();
    }
    ctx.restore();
  }
  const unseen = (ctx, x1, x2, a, col) => { if (a > 0.02) line(ctx, x1, BY, x2, BY, alpha(col, 0.75 * a), 2.5, [9, 8]); };
  function draw() {
    const { ctx, H } = begin(d.c); hits.length = 0;
    const t = cy.now(), laser = F.fact(LASER_GREEN), cream = F.fact(BUTTERFAT_CREAM), mud = F.fact(MUD_BROWN);
    const fell = grains.map((g) => clamp01((t - g.t0) / g.dur));
    const settled = fell.reduce((s, k) => s + k, 0) / fell.length, cloud = 1 - smooth(clamp01((settled - 0.25) / 0.75));
    const [S, C, M] = GLASS.map((g) => g.l);
    liquid(ctx, S, alpha(PAL.muted, 0.08));
    liquid(ctx, C, alpha(PAL.muted, 0.08)); liquid(ctx, C, alpha(cream, 0.3));
    liquid(ctx, M, alpha(PAL.muted, 0.08)); liquid(ctx, M, alpha(mud, 0.42 * cloud));
    /* the beam: unseen through the air, the saltwater and clear water; seen along its whole path in the milk; seen, then lost, in cloudy mud */
    const pass = 0.03 + 0.97 * (1 - cloud), far = 0.6 * pass;
    unseen(ctx, X0, C, 1, laser);
    seen(ctx, C, C + GW, 1, 0.6, laser);
    unseen(ctx, C + GW, M, 0.6, laser);
    seen(ctx, M, M + 0.62 * GW, 0.7 * cloud, 0, laser);
    unseen(ctx, M, M + GW, 0.6 * (1 - cloud), laser);
    unseen(ctx, M + GW, CARD, far, laser);
    ctx.save(); ctx.fillStyle = alpha(laser, 0.15 + 0.85 * far / 0.6); ctx.beginPath(); ctx.ellipse(CARD - 1, BY, 4 + 5 * far / 0.6, 9 + 9 * far / 0.6, 0, 0, TAU); ctx.fill(); ctx.restore();
    /* the particles; one in the beam's way is lit by it where it is large enough to scatter the light */
    const halo = (x, y, r, a) => { if (a > 0.02) { ctx.save(); ctx.fillStyle = alpha(laser, 0.45 * a); ctx.beginPath(); ctx.arc(x, y, r + 7, 0, TAU); ctx.fill(); ctx.restore(); } };
    for (const p of ions) { const [jx, jy] = jig(p, 3); ball(ctx, p.x + jx, p.y + jy, 3.5, F.el(p.el), 0.3); hits.push({ x: p.x + jx, y: p.y + jy, r: 7, name: p.el === 'Na' ? 'a sodium ion, Na<sup>+</sup>' : 'a chloride ion, Cl<sup>−</sup>' }); }
    for (const p of drops) {
      const [jx, jy] = jig(p, 2.5), x = p.x + jx, y = p.y + jy;
      if (Math.abs(y - BY) < 16) halo(x, y, 11, lerp(1, 0.6, (x - C) / GW));
      ball(ctx, x, y, 11, cream, 0.6); hits.push({ x, y, r: 12, name: 'a droplet of butterfat' });
    }
    grains.forEach((g, i) => {
      const k = fell[i], [jx, jy] = jig(g, 1.5), x = lerp(g.x, g.to.x, k) + jx * (1 - k), y = lerp(g.y, g.to.y, k) + jy * (1 - k);
      if (Math.abs(y - BY) < 27) halo(x, y, 22, 0.7 * cloud * Math.max(0, 1 - (x - M) / (0.62 * GW)));
      ball(ctx, x, y, 22, mud, 0.6); hits.push({ x, y, r: 22, name: k >= 1 ? 'a grain of mud, settled' : 'a grain of mud' });
    });
    GLASS.forEach((g) => {
      line(ctx, g.l + 2, SURF, g.l + GW - 2, SURF, alpha(PAL.ink, 0.4), 2); beaker(ctx, g.l);
      text(ctx, g.name, g.l + GW / 2, 556, PAL.ink, { size: 22, weight: 600, align: 'center' });
      text(ctx, g.sub, g.l + GW / 2, 586, PAL.muted, { size: 18, align: 'center' });
    });
    /* the laser and the card */
    ctx.save(); ctx.fillStyle = PAL.muted; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2; ctx.beginPath(); ctx.roundRect(30, BY - 22, 112, 44, 6); ctx.fill(); ctx.stroke(); ctx.fillRect(142, BY - 9, 10, 18); ctx.strokeRect(142, BY - 9, 10, 18); ctx.restore();
    text(ctx, 'laser', 86, BY + 46, PAL.ink, { size: 20, align: 'center' });
    ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.1); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2; ctx.fillRect(CARD, BY - 96, 14, 192); ctx.strokeRect(CARD, BY - 96, 14, 192); ctx.restore();
    text(ctx, 'card', CARD + 7, BY + 120, PAL.ink, { size: 20, align: 'center' });
    hits.push({ x: 86, y: BY, r: 56, name: 'a green laser' }, { x: CARD + 7, y: BY, r: 40, name: 'a card, where the light that gets through all three beakers lands' });
    F.legend(ctx, { l: 0, r: 1400, t: 0, b: H }, [
      { s: 'beam passing unseen', color: alpha(laser, 0.75), w: 2.5, dash: [9, 8] },
      { s: 'beam scattered toward the eye, the Tyndall effect', draw: (c, x, y) => { c.save(); c.strokeStyle = alpha(laser, 0.22); c.lineWidth = 20; c.beginPath(); c.moveTo(x - 20, y); c.lineTo(x + 20, y); c.stroke(); c.strokeStyle = alpha(laser, 0.95); c.lineWidth = 7; c.beginPath(); c.moveTo(x - 20, y); c.lineTo(x + 20, y); c.stroke(); c.restore(); } },
    ], { corner: 'bottom', row: true, panel: false });
    topline(ctx, cloud > 0.05
      ? 'The beam shows wherever particles are large enough to scatter it: all through the milk, and in the muddy water until the mud stops it.'
      : 'The mud has settled and the beam passes unseen through the clear water above it, while the butterfat stays dispersed and still scatters it.');
    tex(d.readout, '\\underbrace{\\text{dissolved ions}}_{\\text{solution}} < \\underbrace{\\text{colloidal particles}}_{\\text{colloid}} < \\underbrace{\\text{suspended particles}}_{\\text{suspension}}', false, { values: false });
  }
  register(d.fig, { update: (dt) => { clock += dt; cy.step(dt, () => 1); }, draw });
})();

/* ---------- a molecule in ångströms seen from one locked viewpoint ---------- */
function turn(p, yaw, pitch) {
  const x = p[0] * Math.cos(yaw) + p[2] * Math.sin(yaw), z1 = -p[0] * Math.sin(yaw) + p[2] * Math.cos(yaw);
  return [x, p[1] * Math.cos(pitch) - z1 * Math.sin(pitch), p[1] * Math.sin(pitch) + z1 * Math.cos(pitch)];
}

/* =====================================================================
   FIGURE 11.31 + 11.32: a soap and a detergent as one ball-and-stick
   molecule with two controls. The slider is the number of carbon atoms in
   the hydrocarbon chain, CnH2n+1—, which "can vary from soap to soap"
   (8 to 18; the book's stearate has 17 and its lauryl sulfate 12, marked
   on the slider with palmitate's 15). The choice is the ionic end: the
   carboxylate group —CO2− of a soap, or the sulfate —OSO3− or sulfonate
   —SO3− of a detergent, the last named by the text and drawn by neither
   of the book's formulas. The ionic end stays on the right, as the book
   prints it, and the chain grows to the left. Coordinates in ångströms:
   C–C 1.54 Å as a 1.26 Å step along the zigzag, C–O 1.26, O–S 1.6,
   C–S 1.8, S–O 1.45, hydrogens tetrahedral out of the plane of the
   zigzag, the oxygen atoms round sulfur spread in that plane so all show,
   seen from one locked viewpoint. Still: nothing here has a
   clock. Flat: the lesson is the two ends and the chain's length, which
   a turn does not show better.
===================================================================== */
(function () {
  const d = sim('sim-amphiphile', 372);
  const R = { C: 0.38, H: 0.25, O: 0.36, S: 0.5, Na: 0.55 };
  const WORD = { C: 'a carbon atom of the hydrocarbon chain', H: 'a hydrogen atom of the hydrocarbon chain', Na: 'a sodium ion, Na<sup>+</sup>' };
  const cpos = (k) => [-1.26 * k, k % 2 ? 0.44 : -0.44, 0];
  const P0 = cpos(0), C1 = cpos(1), OUT = unit(sub(P0, C1)), A1 = Math.atan2(C1[1] - P0[1], C1[0] - P0[0]);
  const dir = (a) => [Math.cos(a), Math.sin(a), 0];
  /* three oxygen atoms round a sulfur atom, spread in the plane of the zigzag as a structural formula spreads them, so that all three show */
  const three = (S, back, fs = [0, 1.83, -1.83]) => { const u = Math.atan2(-back[1], -back[0]); return fs.map((f, m) => add(S, [1.45 * Math.cos(u + f), 1.45 * Math.sin(u + f), m === 1 ? 0.25 : m === 2 ? -0.25 : 0])); };
  const HEADS = {};
  {
    const Oa = add(P0, mul(dir(A1 - TAU / 3), 1.26)), Ob = add(P0, mul(dir(A1 + TAU / 3), 1.26));
    HEADS.carboxylate = { atoms: { X0: { el: 'C', p: P0, name: 'the carbon atom of the carboxylate group, —CO<sub>2</sub><sup>−</sup>' }, Oa: { el: 'O', p: Oa, name: 'an oxygen atom of the carboxylate group' }, Ob: { el: 'O', p: Ob, name: 'an oxygen atom of the carboxylate group' }, Na: { el: 'Na', p: [3.0, -1.25, 0] } }, bonds: [['C1', 'X0'], ['X0', 'Oa'], ['X0', 'Ob']], minus: 'Ob', tex: '\\text{CO}_{2}{}^{-}', group: 'carboxylate', kind: 'soap' };
    const S1 = add(P0, mul(dir(-A1 + Math.PI), 1.6)), O1 = three(S1, unit(sub(P0, S1)));
    HEADS.sulfate = { atoms: { X0: { el: 'O', p: P0, name: 'the oxygen atom that joins the chain to the sulfur atom of the sulfate group, —OSO<sub>3</sub><sup>−</sup>' }, S: { el: 'S', p: S1, name: 'the sulfur atom of the sulfate group' }, Na: { el: 'Na', p: add(S1, [2.75, -1.0, 0]) } }, bonds: [['C1', 'X0'], ['X0', 'S']], tex: '\\text{OSO}_{3}{}^{-}', group: 'sulfate', kind: 'detergent' };
    O1.forEach((p, m) => { HEADS.sulfate.atoms['Os' + m] = { el: 'O', p, name: 'an oxygen atom of the sulfate group' }; HEADS.sulfate.bonds.push(['S', 'Os' + m]); });
    const S2 = add(C1, mul(OUT, 1.8)), O2 = three(S2, unit(sub(C1, S2)), [0.3, 1.9, -1.45]);
    HEADS.sulfonate = { atoms: { S: { el: 'S', p: S2, name: 'the sulfur atom of the sulfonate group, —SO<sub>3</sub><sup>−</sup>, bonded to the chain itself' }, Na: { el: 'Na', p: add(S2, [2.75, -0.7, 0]) } }, bonds: [['C1', 'S']], tex: '\\text{SO}_{3}{}^{-}', group: 'sulfonate', kind: 'detergent' };
    O2.forEach((p, m) => { HEADS.sulfonate.atoms['Os' + m] = { el: 'O', p, name: 'an oxygen atom of the sulfonate group' }; HEADS.sulfonate.bonds.push(['S', 'Os' + m]); });
    for (const k of ['sulfate', 'sulfonate']) HEADS[k].minus = ['Os0', 'Os1', 'Os2'].sort((a, b) => HEADS[k].atoms[a].p[1] - HEADS[k].atoms[b].p[1])[0];
  }
  const NAMED = { carboxylate: { 17: 'Sodium stearate', 15: 'Sodium palmitate' }, sulfate: { 12: 'Sodium lauryl sulfate' }, sulfonate: {} };
  const MARKS = { carboxylate: [{ at: 17, label: 'stearate' }, { at: 15, label: 'palmitate' }], sulfate: [{ at: 12, label: 'lauryl sulfate' }], sulfonate: [{ at: 12, label: 'C₁₂H₂₅—' }] };
  const N = F.ctl(d.controls, { label: '\\text{carbon atoms in the chain}', cls: '', key: 'chain', min: 8, max: 18, step: 1, value: 17, unit: '', dec: 0, aria: 'number of carbon atoms in the hydrocarbon chain', specials: MARKS.carboxylate });
  const AM = F.choice(d.controls, { label: '\\text{ionic end}', options: [{ value: 'carboxylate', label: 'carboxylate' }, { value: 'sulfate', label: 'sulfate' }, { value: 'sulfonate', label: 'sulfonate' }], value: 'carboxylate', aria: 'the group at the ionic end', onInput: (v) => N.mark(MARKS[v]) });
  const hits = []; F.hover(d.stage, () => hits);
  const S = 44, PX = 1118, PY = 186;
  /* the locked viewpoint, with the slope it gives the chain's axis taken out again so the chain lies level */
  const YAW = 0.22, PITCH = 0.42, LEAN = Math.sin(YAW) * Math.sin(PITCH);
  const P = (p) => { const q = turn(p, YAW, PITCH); return [PX + q[0] * S, PY - (q[1] - LEAN * p[0]) * S, q[2]]; };
  function draw() {
    const { ctx } = begin(d.c); hits.length = 0;
    const n = Math.round(N.v), to = AM.value, from = AM.from ?? to, k = smooth(AM.k ?? 1), A = HEADS[from], B = HEADS[to];
    /* the atoms now: one that both ends have slides to its new place; one that only one end has fades */
    const atoms = [], at = {};
    const put = (key, el, p, o, name, st) => { atoms.push({ key, el, p, o, name }); if (st) (at[st] = at[st] || {})[key] = p; };
    const hb = [];
    for (let c = 1; c <= n; c++) {
      const p = cpos(c), s = c % 2 ? 1 : -1; put('C' + c, 'C', p, 1, WORD.C);
      const hs = [1, -1].map((z) => add(p, mul([0, s * 0.578, z * 0.816], 1.09)));
      if (c === n) hs.push(add(p, mul(unit([-1.26, -0.88 * s, 0]), 1.09)));
      hs.forEach((h, i) => { put('H' + c + '.' + i, 'H', h, 1, WORD.H); hb.push([p, h]); });
    }
    for (const key of new Set([...Object.keys(A.atoms), ...Object.keys(B.atoms)])) {
      const a = A.atoms[key], b = B.atoms[key];
      if (a && b && a.el === b.el) { const p = mix3(a.p, b.p, k); put(key, b.el, p, 1, b.name ?? WORD[b.el]); at[from] = at[from] || {}; at[to] = at[to] || {}; at[from][key] = p; at[to][key] = p; continue; }
      if (a) put(key, a.el, a.p, from === to ? 1 : AM.a(from), a.name ?? WORD[a.el], from);
      if (b && from !== to) put(key, b.el, b.p, AM.a(to), b.name ?? WORD[b.el], to);
    }
    const where = (key, st) => (key === 'C1' ? C1 : at[st][key]);
    const stick = (p, q, o) => { if (o <= 0) return; const a = P(p), b = P(q); line(ctx, a[0], a[1], b[0], b[1], alpha(PAL.muted, o), 9); };
    for (let c = 2; c <= n; c++) stick(cpos(c - 1), cpos(c), 1);
    hb.forEach(([p, h]) => stick(p, h, 1));
    const has = (h, b) => h.bonds.some((x) => x[0] === b[0] && x[1] === b[1]);
    for (const b of B.bonds) stick(where(b[0], to), where(b[1], to), from === to || has(A, b) ? 1 : AM.a(to));
    if (from !== to) for (const b of A.bonds) if (!has(B, b)) stick(where(b[0], from), where(b[1], from), AM.a(from));
    atoms.filter((a) => a.o > 0).map((a) => ({ ...a, q: P(a.p) })).sort((a, b) => a.q[2] - b.q[2]).forEach((a) => {
      ctx.save(); ctx.globalAlpha = a.o; ctx.fillStyle = F.el(a.el); ctx.strokeStyle = a.el === 'H' ? PAL.ink : alpha(PAL.ink, 0.45); ctx.lineWidth = a.el === 'H' ? 1.4 : 1.2;
      ctx.beginPath(); ctx.arc(a.q[0], a.q[1], R[a.el] * S, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore();
      if (a.o > 0.5) hits.unshift({ x: a.q[0], y: a.q[1], r: R[a.el] * S, name: a.name });
    });
    /* the charges, and the two ends named by brackets beneath them */
    const Om = P(where(B.minus, to)), Na = P(where('Na', to));
    ctx.save(); ctx.globalAlpha = from === to ? 1 : AM.a(to);
    text(ctx, '−', Om[0] + 22, Om[1] + 16, PAL.ink, { size: 28, weight: 600, align: 'center' });
    ctx.restore();
    text(ctx, '+', Na[0] + 30, Na[1] - 20, PAL.ink, { size: 28, weight: 600, align: 'center' });
    const xs = atoms.filter((a) => a.o > 0.5 && !/^[CH]\d/.test(a.key)).map((a) => P(a.p)[0]);
    const xC1 = P(C1)[0], xCn = P(cpos(n))[0], xSplit = (xC1 + R.C * S + Math.min(...atoms.filter((a) => a.o > 0.5 && !/^[CH]\d/.test(a.key)).map((a) => P(a.p)[0] - R[a.el] * S))) / 2;
    hbracket(ctx, xCn - 46, xSplit - 6, 296, F.ref('tail'), 'nonpolar hydrocarbon chain', { side: 'below', size: 21 });
    hbracket(ctx, xSplit + 6, Math.max(...xs) + 28, 296, F.ref('head'), 'ionic end', { side: 'below', size: 21 });
    const named = NAMED[to][n];
    topline(ctx, `${named ? named + ', a ' + B.kind + ',' : 'This ' + B.kind} has ${n} carbon atoms in its hydrocarbon chain and a ${B.group} group as its ionic end.`);
    tex(d.readout, `\\underbrace{\\text{C}_{${n}}\\text{H}_{${2 * n + 1}}}_{\\text{nonpolar}}\\text{—}\\underbrace{${B.tex}\\ \\text{Na}^{+}}_{\\text{ionic}}`);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 11.33: soap as an emulsifying agent. Two drops of oil in water,
   in cross section, and a choice: soap added, or none. With soap, the
   anions in the water round each drop turn and dock at its surface, the
   hydrocarbon tail in the oil and the ionic end in the water (the book's
   picture, twice); the two coated drops then drift together, come close
   and part again. With none, the bare drops drift together, touch and
   merge into one larger drop (the coalescence an emulsifying agent
   inhibits). Sodium ions stand in the water, each surrounded by four
   water molecules with their oxygen atoms toward it. Moving: 9 s with
   soap (the anions dock by 3.2 s, the drops meet at 6.2 s), 7.5 s without
   (the drops touch at 3.8 s and are one by 5.8 s); everything is a
   function of the clock, so the scrubber runs it both ways. OIL_AMBER is
   the pale gold of oil, a physical colour; tails in carbon's colour and
   ionic ends in oxygen's, as the book draws them. Flat: the book's own
   cross section, the orientation across one interface.
===================================================================== */
(function () {
  const OIL_AMBER = '#e6c46a';
  const d = sim('sim-emulsion', 690);
  const CY = 368, RD = 150, TAIL = 112, NA = 28, XA = 500, XB = 1060, MID = (XA + XB) / 2;
  const rnd = seeded(5), Rn = (a, b) => a + rnd() * (b - a);
  /* each anion: its place on the drop, where it starts in the water (as an offset from the drop's centre) and which way its tail points there */
  const anions = [0, 1].flatMap((dr) => Array.from({ length: NA }, (_, i) => {
    const th = (i / NA) * TAU + TAU / (2 * NA), a = th + Rn(-0.1, 0.1), r0 = RD + Rn(56, 100), sg = rnd() < 0.5 ? 1 : -1;
    return { dr, th, sx: r0 * Math.cos(a), sy: r0 * Math.sin(a), a0: a + sg * (Math.PI / 2 + Rn(-0.6, 0.6)), ph: Rn(0, TAU), delay: 0.25 + 1.6 * (((i * 7) % NA) / NA) };
  }));
  const IONS = [[262, 128], [780, 122], [1298, 132], [258, 606], [1302, 600]].map(([x, y]) => ({ x, y, ph: Rn(0, TAU), w: [0.3, 1.9, 3.5, 5.1].map((a) => a + Rn(-0.2, 0.2)) }));
  const FREE = [[70, 170], [150, 300], [64, 430], [160, 560], [1350, 250], [1368, 400], [1340, 500], [690, 150], [880, 160], [700, 610], [860, 600], [400, 112], [1150, 110], [1120, 636]].map(([x, y]) => ({ x, y, a: Rn(0, TAU), ph: Rn(0, TAU) }));
  const M = F.choice(d.controls, { label: '\\text{soap}', options: [{ value: 'none', label: 'none' }, { value: 'soap', label: 'added' }], value: 'soap', aria: 'whether soap is added to the water', onInput: () => { was = shape(M.from, cy.now()); cy.reset(); } });
  const cy = cycle(() => (M.value === 'soap' ? 9 : 7.5), 2.5);
  const hits = []; F.hover(d.stage, () => hits);
  let clock = 0, was = null;
  const ramp = (t, a, b) => smooth(clamp01((t - a) / (b - a)));
  /* the two drops at time t: how far each centre has come in from its start, and the radius */
  function shape(v, t) {
    if (v === 'soap') { const k = ramp(t, 3.4, 6.2) - ramp(t, 6.4, 8.8); return { in: 104 * k, r: RD, one: 0 }; }
    const k = ramp(t, 0.8, 3.8), m = ramp(t, 3.8, 5.8);
    return { in: (MID - XA - RD) * k + RD * m, r: lerp(RD, 1.26 * RD, m), one: m };
  }
  function oil(ctx, g, a) {
    if (a <= 0) return;
    ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = alpha(F.fact(OIL_AMBER), 0.6); ctx.beginPath();
    ctx.arc(XA + g.in, CY, g.r, 0, TAU); ctx.moveTo(XB - g.in + g.r, CY); ctx.arc(XB - g.in, CY, g.r, 0, TAU); ctx.fill(); ctx.restore();
  }
  function zig(ctx, x, y, a, len, col, n = 12, amp = 4) {
    const ux = Math.cos(a), uy = Math.sin(a), px = -uy, py = ux;
    ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = 2.6; ctx.lineJoin = 'round'; ctx.beginPath();
    for (let i = 0; i <= n; i++) { const s = (i / n) * len, z = i === 0 ? 0 : (i % 2 ? 1 : -1) * amp; const X = x + ux * s + px * z, Y = y + uy * s + py * z; if (i) ctx.lineTo(X, Y); else ctx.moveTo(X, Y); }
    ctx.stroke(); ctx.restore();
  }
  function draw() {
    const { ctx, H } = begin(d.c); hits.length = 0;
    const v = M.value, t = cy.now(), g = shape(v, t), morphing = (M.k ?? 1) < 1 && was;
    if (morphing) oil(ctx, was, M.a(M.from));
    oil(ctx, g, morphing ? M.a(v) : 1);
    const cx = [XA + g.in, XB - g.in];
    /* the soap: anions, and the sodium ions they came with */
    const soapA = v === 'soap' ? (morphing ? M.a('soap') : 1) : morphing ? M.a('soap') : 0;
    if (soapA > 0) {
      ctx.save(); ctx.globalAlpha = soapA;
      const tt = v === 'soap' ? t : 99, c0 = v === 'soap' ? cx : [XA + was.in, XB - was.in];
      const st = anions.map((q) => {
        const w = ramp(tt, q.delay, q.delay + 1.3), hx = (RD + 4) * Math.cos(q.th), hy = (RD + 4) * Math.sin(q.th), j = (1 - w) * 5;
        let da = q.th + Math.PI - q.a0; da = Math.atan2(Math.sin(da), Math.cos(da));
        return { x: c0[q.dr] + lerp(q.sx, hx, w) + j * Math.sin(1.7 * clock + q.ph), y: CY + lerp(q.sy, hy, w) + j * Math.cos(2.1 * clock + q.ph), a: q.a0 + da * w, w };
      });
      st.forEach((s) => zig(ctx, s.x + 7 * Math.cos(s.a), s.y + 7 * Math.sin(s.a), s.a, TAIL - 7, F.el('C')));
      st.forEach((s) => {
        ball(ctx, s.x, s.y, 7.5, F.el('O'));
        hits.push({ x: s.x, y: s.y, r: 10, name: 'the ionic end of a soap anion, —CO<sub>2</sub><sup>−</sup>' });
        for (const f of [0.3, 0.55, 0.8]) hits.push({ x: s.x + Math.cos(s.a) * TAIL * f, y: s.y + Math.sin(s.a) * TAIL * f, r: 9, name: 'the hydrocarbon tail of a soap anion, C<sub>17</sub>H<sub>35</sub>—' });
      });
      for (const ion of IONS) {
        const x = ion.x + 3 * Math.sin(1.1 * clock + ion.ph), y = ion.y + 3 * Math.cos(1.3 * clock + ion.ph);
        ion.w.forEach((a) => water(ctx, x + 23 * Math.cos(a), y + 23 * Math.sin(a), a));
        ball(ctx, x, y, 12, F.el('Na'));
        hits.push({ x, y, r: 36, name: 'a sodium ion, Na<sup>+</sup>, surrounded by water molecules' });
      }
      ctx.restore();
    }
    for (const w of FREE) { const x = w.x + 4 * Math.sin(1.3 * clock + w.ph), y = w.y + 4 * Math.cos(0.9 * clock + w.ph); water(ctx, x, y, w.a + 0.3 * Math.sin(clock + w.ph)); hits.push({ x, y, r: 14, name: 'a water molecule, H<sub>2</sub>O' }); }
    if (g.one > 0.5) hits.push({ x: MID, y: CY, r: g.r, name: 'one larger drop of oil' }); else cx.forEach((x) => hits.push({ x, y: CY, r: g.r, name: 'a drop of oil' }));
    const amber = F.fact(OIL_AMBER);
    const key = [
      { s: 'drop of oil', draw: (c, x, y) => { c.save(); c.fillStyle = alpha(amber, 0.6); c.beginPath(); c.arc(x, y, 10, 0, TAU); c.fill(); c.restore(); } },
      { s: 'ionic end', draw: (c, x, y) => ball(c, x, y, 7.5, F.el('O')) },
      { s: 'hydrocarbon tail', draw: (c, x, y) => zig(c, x - 20, y, 0, 40, F.el('C'), 8, 4) },
      { s: 'solvated cation, Na⁺', draw: (c, x, y) => { [0.3, 1.9, 3.5, 5.1].forEach((a) => water(c, x + 11 * Math.cos(a), y + 11 * Math.sin(a), a, 0.5)); ball(c, x, y, 6, F.el('Na')); } },
      { s: 'water molecule', draw: (c, x, y) => water(c, x - 3, y, 0, 0.9) },
    ];
    F.legend(ctx, { l: 0, r: 1400, t: 0, b: H }, v === 'soap' ? key : [key[0], key[4]], { corner: 'bottom', row: true, panel: false });
    topline(ctx, v === 'soap'
      ? (t < 3.3 ? 'Each soap anion turns its hydrocarbon tail into the oil and leaves its ionic end in the water.' : 'Coated with ionic ends, the two drops of oil come close, stay apart and stay dispersed in the water.')
      : (g.one < 1 ? 'With no soap, nothing keeps the two drops of oil apart when they meet.' : 'With no soap, the two drops of oil have merged into one larger drop.'));
    tex(d.readout, v === 'soap'
      ? '\\underbrace{\\text{C}_{17}\\text{H}_{35}}_{\\text{in the oil}}\\text{—}\\underbrace{\\text{CO}_{2}{}^{-}}_{\\text{in the water}}'
      : '\\text{drop of oil} + \\text{drop of oil} \\longrightarrow \\text{one larger drop of oil}', false, { values: false });
  }
  register(d.fig, { update: (dt) => { clock += dt; cy.step(dt, () => 1); }, draw });
})();

/* =====================================================================
   FIGURE 11.36: a Cottrell precipitator, drawn flat from the book's
   image: a steel chamber with rounded shoulders, whose grounded wall is
   the plate electrode; the point electrode, a wire with barbed
   crossbars, hanging down the middle from an insulator at a high DC
   voltage; the smoke's inlet low on the left, the outlet high on the
   right, and a funnel and neck at the bottom where the dust leaves.
   The soot particles of the smoke carry charges of both signs (the
   book's caption). A choice charges the point electrode negative or
   positive or leaves it uncharged. Charged, it attracts the particles of
   the opposite sign, which gather on its barbs, and drives the others to
   the plate electrode; at either electrode a particle is neutralized
   and falls as dust through the neck. Uncharged, every particle rides
   out with the gases. Moving: the smoke flows without end (no scrubber).
   Bars beside the chamber count where the particles that have finished
   since the last switch ended up.
   Canvas units: chamber inside XL..XR from YT down to YF, the funnel to
   the neck NL..NR at YN, the neck down to YB; inlet at YI, outlet at YO;
   the crossbars of the point electrode at BARS, each reaching HALF.
===================================================================== */
(function () {
  const d = sim('sim-precipitator', 790);
  const XC = 520, XL = 370, XR = 670, YT = 162, YF = 560, NL = 484, NR = 556, YN = 634, YB = 706, YI = 436, YO = 248, PH = 19, WALL = 16, RC = 54;
  const BARS = [234, 266, 298, 330, 362, 394, 426, 458, 490], HALF = 62, YE = 506;
  const rnd = (a, b) => a + Math.random() * (b - a);
  let parts = [], n = { point: 0, plate: 0, out: 0 }, gen = 0, due = 0;
  const V = F.choice(d.controls, { label: '\\text{point electrode}', options: [{ value: 'off', label: 'uncharged' }, { value: 'neg', label: 'negative' }, { value: 'pos', label: 'positive' }], value: 'neg', aria: 'the charge the high DC voltage gives the point electrode', onInput: () => { n = { point: 0, plate: 0, out: 0 }; gen++; } });
  /* the inside of the funnel wall at height y */
  const funnelX = (side, y) => { const k = clamp01((y - YF) / (YN - YF)); return side < 0 ? XL + (NL - XL) * k : XR + (NR - XR) * k; };
  const done = (p, key) => { p.done = true; if (p.gen === gen) n[key]++; };
  function step(dt) {
    due -= dt;
    while (due <= 0) { parts.push({ x: XL - 150, y: YI + rnd(-PH + 7, PH - 7), vx: 200, ph: 'in', q: Math.random() < 0.5 ? 1 : -1, gen, j: rnd(0, 6.3), wait: 0 }); due += 0.21; }
    const se = V.value === 'neg' ? -1 : V.value === 'pos' ? 1 : 0;
    for (const p of parts) {
      p.j += dt * 3;
      if (p.ph === 'in') { p.x += p.vx * dt; if (p.x > XL + 8) p.ph = 'gas'; continue; }
      if (p.ph === 'gas') {
        /* the gas carries it in from the inlet, up the chamber and out of the outlet */
        p.vx += (30 - p.vx) * Math.min(1, dt * 2.2);
        let vx = p.vx + 12 * Math.sin(p.j), vy = -112 + 10 * Math.cos(p.j * 1.3);
        /* near the top the gas turns toward the outlet */
        if (p.y < YO + 70) { const ux = XR + 20 - p.x, uy = YO - p.y, m = Math.hypot(ux, uy) || 1; vx = (130 * ux) / m + 8 * Math.sin(p.j); vy = (130 * uy) / m; }
        if (se && p.y > BARS[0] - 26 && p.y < YE) {
          const pull = p.q * se < 0, dx = XC - p.x;
          if (pull) {
            /* drawn to the point electrode: in toward the wire, and onto the nearest crossbar once within its reach */
            if (Math.abs(dx) > HALF - 6) vx = Math.sign(dx) * 150;
            else { const by = BARS.reduce((a, b) => (Math.abs(b - p.y) < Math.abs(a - p.y) ? b : a)); vx = Math.sign(dx) * 40; vy = Math.sign(by - p.y) * 150; if (Math.abs(by - p.y) < 4) { p.ph = 'held'; p.y = by - 4; p.wait = rnd(0.5, 1.2); p.key = 'point'; continue; } }
          } else vx = -Math.sign(dx || 1) * 150;
        }
        p.x += vx * dt; p.y += vy * dt;
        if (p.y < YT + 10) p.y = YT + 10;
        const atIn = Math.abs(p.y - YI) < PH + 2, atOut = Math.abs(p.y - YO) < PH - 3;
        if (p.x >= XR - 7) { if (atOut) { p.ph = 'out'; continue; } p.x = XR - 7; if (se && p.q * se > 0) { p.ph = 'held'; p.side = 1; p.wait = rnd(0.3, 0.8); p.key = 'plate'; } }
        if (p.x <= XL + 7) { p.x = XL + 7; if (se && p.q * se > 0 && !atIn) { p.ph = 'held'; p.side = -1; p.wait = rnd(0.3, 0.8); p.key = 'plate'; } }
        continue;
      }
      if (p.ph === 'held') { p.wait -= dt; if (p.wait <= 0) { p.ph = 'dust'; p.vy = 0; } continue; }
      if (p.ph === 'dust') {
        /* neutralized, it falls: straight down from a crossbar, down the wall and the funnel from the plate */
        p.vy = Math.min(190, p.vy + 420 * dt); p.y += p.vy * dt;
        if (p.key === 'plate') p.x = p.y < YB ? funnelX(p.side, p.y) - p.side * 7 : p.x;
        else { const l = funnelX(-1, p.y) + 8, r = funnelX(1, p.y) - 8; p.x = Math.max(l, Math.min(r, p.x)); }
        if (p.y > YB + 34) done(p, p.key);
        continue;
      }
      if (p.ph === 'out') { p.x += 190 * dt; p.y += (YO - p.y) * Math.min(1, dt * 3); if (p.x > XR + 150) done(p, 'out'); }
    }
    parts = parts.filter((p) => !p.done);
  }
  const cy = cycle(() => Infinity, 0);
  let hits = [];
  F.hover(d.stage, () => hits);
  /* the steel shell in cross section: four runs of wall, each from a pipe or the insulator to the next opening */
  function shell(ctx, col) {
    const o = WALL / 2, l = XL - o, r = XR + o, t = YT - o, rc = RC + o;
    const runs = () => {
      ctx.beginPath();
      ctx.moveTo(XL - 150, YI - PH - o); ctx.lineTo(l, YI - PH - o); ctx.lineTo(l, YT + RC); ctx.arcTo(l, t, XL + RC, t, rc); ctx.lineTo(XC - 44, t);
      ctx.moveTo(XC + 44, t); ctx.lineTo(XR - RC, t); ctx.arcTo(r, t, r, YT + RC, rc); ctx.lineTo(r, YO - PH - o); ctx.lineTo(XR + 150, YO - PH - o);
      ctx.moveTo(XR + 150, YO + PH + o); ctx.lineTo(r, YO + PH + o); ctx.lineTo(r, YF); ctx.lineTo(NR + o, YN); ctx.lineTo(NR + o, YB);
      ctx.moveTo(XL - 150, YI + PH + o); ctx.lineTo(l, YI + PH + o); ctx.lineTo(l, YF); ctx.lineTo(NL - o, YN); ctx.lineTo(NL - o, YB);
    };
    ctx.save(); ctx.lineJoin = 'round'; ctx.lineCap = 'butt';
    ctx.strokeStyle = col; ctx.lineWidth = WALL; runs(); ctx.stroke();
    ctx.strokeStyle = F.mixColor(PAL.panel, PAL.muted, 0.55); ctx.lineWidth = WALL - 5; runs(); ctx.stroke();
    ctx.restore();
  }
  function electrode(ctx, col) {
    /* the insulator in the roof, the wire through it, and the barbed crossbars */
    ctx.save(); ctx.fillStyle = F.mixColor(PAL.panel, PAL.muted, 0.45); ctx.strokeStyle = PAL.muted; ctx.lineWidth = 2; ctx.beginPath(); ctx.roundRect(XC - 52, YT - 40, 104, 56, 10); ctx.fill(); ctx.stroke(); ctx.restore();
    line(ctx, XC, YT - 64, XC, YE, col, 3);
    ctx.save(); ctx.fillStyle = col; ctx.fillRect(XC - 5, YT - 34, 10, 44); ctx.restore();
    for (const y of BARS) for (const s of [-1, 1]) {
      line(ctx, XC, y, XC + s * HALF, y, col, 2.5);
      line(ctx, XC + s * (HALF - 12), y, XC + s * HALF, y - 9, col, 2); line(ctx, XC + s * (HALF - 12), y, XC + s * HALF, y + 9, col, 2);
      line(ctx, XC + s * 22, y, XC + s * 32, y - 8, col, 2);
    }
  }
  function ground(ctx) {
    const gx = XL - 96, gy = YF + 92, wx = XL - WALL + (NL - XL) * 0.42, wy = YF + (YN - YF) * 0.42 + 4;
    line(ctx, wx, wy, gx, gy - 26, PAL.ink, 2); line(ctx, gx, gy - 26, gx, gy, PAL.ink, 2);
    for (const [w, dy] of [[30, 0], [19, 9], [8, 18]]) line(ctx, gx - w, gy + dy, gx + w, gy + dy, PAL.ink, 2.5);
    text(ctx, 'ground', gx, gy + 44, PAL.ink, { size: 20, align: 'center' });
    hits.push({ x: gx, y: gy + 8, r: 30, name: 'the ground: the plate electrode is grounded' });
  }
  function draw() {
    const { ctx } = begin(d.c);
    hits = [];
    const cp = F.ref('plate-electrode'), ce = F.ref('point-electrode'), v = V.value, se = v === 'neg' ? -1 : v === 'pos' ? 1 : 0, sgn = (s) => (s < 0 ? '−' : '+');
    /* the gas inside, faintly, so the chamber reads as a vessel */
    ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.045); ctx.beginPath();
    ctx.moveTo(XL, YT + RC); ctx.arcTo(XL, YT, XL + RC, YT, RC); ctx.lineTo(XR - RC, YT); ctx.arcTo(XR, YT, XR, YT + RC, RC); ctx.lineTo(XR, YF); ctx.lineTo(NR, YN); ctx.lineTo(NR, YB); ctx.lineTo(NL, YB); ctx.lineTo(NL, YN); ctx.lineTo(XL, YF); ctx.closePath(); ctx.fill();
    ctx.fillRect(XL - 150, YI - PH, 150, 2 * PH); ctx.fillRect(XR, YO - PH, 150, 2 * PH); ctx.restore();
    shell(ctx, cp); electrode(ctx, ce); ground(ctx);
    for (const p of parts) {
      const dust = p.ph === 'held' || p.ph === 'dust';
      ball(ctx, p.x, p.y, dust ? 5 : 6, F.el('C'), 0.3);
      if (!dust) text(ctx, sgn(p.q), p.x + 7, p.y - 10, PAL.ink, { size: 18, weight: 600 });
      hits.push({ x: p.x, y: p.y, r: 10, name: dust ? 'soot that an electrode has neutralized, falling as dust' : `a soot particle with a ${p.q > 0 ? 'positive' : 'negative'} charge` });
    }
    /* the book's arrows and labels */
    arrow(ctx, XL - 232, YI, XL - 166, YI, PAL.ink, 3); arrow(ctx, XR + 166, YO, XR + 232, YO, PAL.ink, 3); arrow(ctx, XC, YB + 10, XC, YB + 58, PAL.ink, 3);
    text(ctx, 'high DC voltage', XC - 64, YT - 40, PAL.ink, { size: 20, align: 'right' });
    text(ctx, 'soot-laden smoke', XL - 250, YI - 52, PAL.ink, { size: 20 });
    text(ctx, v === 'off' ? 'gases escape with the soot' : 'soot-free gases escape', XR + 34, YO - 52, PAL.ink, { size: 20 });
    text(ctx, 'soot particles removed here', XC + 22, YB + 40, PAL.ink, { size: 20 });
    label(ctx, 'plate electrode' + (se ? ` (${sgn(-se)})` : ''), XR + WALL, 348, { side: 'right', size: 20, gap: 44, color: cp });
    label(ctx, 'point electrode' + (se ? ` (${sgn(se)})` : ''), XC + HALF + 4, BARS[6], { side: 'right', size: 20, gap: XR + WALL + 44 - (XC + HALF + 4), color: ce });
    hits.push({ x: XR + WALL / 2, y: 348, r: 16, name: 'the plate electrode, the grounded wall of the chamber' }, { x: XL - WALL / 2, y: 300, r: 16, name: 'the plate electrode, the grounded wall of the chamber' }, { x: XC, y: 330, r: 14, name: 'the point electrode' }, { x: XC, y: YT - 12, r: 44, name: 'the insulator that holds the point electrode clear of the wall' }, { x: XC, y: YN + 40, r: 34, name: 'the neck, where the dust leaves' });
    /* where the particles that have finished since the last switch ended up */
    const tot = n.point + n.plate + n.out, BX = 930, BW = 400;
    const row = (y, name, k, col) => {
      text(ctx, name, BX, y - 26, PAL.ink, { size: 20 });
      ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.07); ctx.fillRect(BX, y - 10, BW, 22); ctx.fillStyle = col; ctx.fillRect(BX, y - 10, tot ? (BW * k) / tot : 0, 22); ctx.strokeStyle = alpha(PAL.ink, 0.5); ctx.lineWidth = 1.5; ctx.strokeRect(BX, y - 10, BW, 22); ctx.restore();
      text(ctx, String(k), BX + BW, y - 26, PAL.ink, { size: 20, weight: 600, align: 'right' });
    };
    text(ctx, 'soot particles, by where they ended up', BX, 290, PAL.muted, { size: 18 });
    row(358, 'neutralized on the point electrode', n.point, ce);
    row(438, 'neutralized on the plate electrode', n.plate, cp);
    row(518, 'escaped with the gases', n.out, F.el('C'));
    topline(ctx, v === 'off'
      ? 'With the point electrode uncharged, the soot rides out with the gases, whatever its charge.'
      : `With the point electrode ${v === 'neg' ? 'negative' : 'positive'}, the ${v === 'neg' ? 'positive' : 'negative'} soot particles go to it and the ${v === 'neg' ? 'negative' : 'positive'} ones to the plate electrode.`);
    tex(d.readout, tot ? `\\text{share of the soot removed} = \\frac{${n.point} + ${n.plate}}{${n.point} + ${n.plate} + ${n.out}} = ${Math.round((100 * (n.point + n.plate)) / tot)}\\,\\%` : '\\text{share of the soot removed} = \\frac{\\text{on the two electrodes}}{\\text{all that came in}}', false, { values: false });
  }
  register(d.fig, { update: (dt) => { cy.step(dt, () => 1); const m = Math.ceil(Math.min(dt, 0.2) / 0.04); for (let i = 0; i < m; i++) step(Math.min(dt, 0.2) / m); }, draw });
})();
};
