/* Figures for section 21.3 Radioactive Decay.
   The page binds time, rate-constant, rate and charge. Z, A, N, n:p, counts
   and percents stay ink. Protons, neutrons, electrons, positrons and photons wear
   the particle convention of F.el, atoms their element; a nuclide on a chart and
   a nucleus of a sample are told by fill, hollow while radioactive or once decayed
   as the figure's key says, never by hue (ch21/COLOR.md). */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['21.3'] = function (root, F) {
const { fmt, tex, C, PAL, alpha, ctl, choice, register, cycle, begin, line, arrow, dot, text, topline, axes, hover } = F;
const sim = (id, H) => F.sim(root, id, H);
const still = (d, draw) => register(d.fig, { update: () => {}, draw });
const TAU = 2 * Math.PI;
const hash = (i, s) => { const x = Math.sin(i * 127.1 + s * 311.7) * 43758.5453; return x - Math.floor(x); };
function rng(seed) { let s = seed >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return (s + 0.5) / 4294967296; }; }
const clamp = (x) => Math.max(0, Math.min(1, x));
const sig = (x, n) => Number(x.toPrecision(n));
const decOf = (x, n) => Math.max(0, n - 1 - Math.floor(Math.log10(Math.abs(x))));
const fsig = (x, n) => (x === 0 ? '0' : fmt(sig(x, n), decOf(sig(x, n), n)));
const grp = (x, sep) => { const s = String(Math.round(Math.abs(x))).replace(/\B(?=(\d{3})+(?!\d))/g, sep); return (x < 0 ? '−' : '') + s; };
const SUP = { 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
const sup = (n) => String(n).split('').map((ch) => SUP[ch]).join('');
/* a nuclide in the book's notation, mass number over atomic number */
const nucTex = (A, Z, s) => '{}_{' + (String(Z).length < String(A).length ? '\\;'.repeat(String(A).length - String(Z).length) : '') + Z + '}^{' + A + '}\\text{' + s + '}';
const kv = (type, s) => '\\htmlClass{kv-' + type + '}{' + s + '}';
function disc(ctx, x, y, r, fill, rim = alpha(PAL.ink, 0.45), w = 1.5) {
  ctx.save(); ctx.fillStyle = fill; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill();
  if (rim) { ctx.strokeStyle = rim; ctx.lineWidth = w; ctx.stroke(); }
  ctx.restore();
}
const nucleon = (ctx, x, y, isP, r = 13) => disc(ctx, x, y, r, F.el(isP ? 'p+' : 'n0'), alpha(PAL.ink, 0.5));
/* an α particle: two protons and two neutrons */
function alphaParticle(ctx, x, y, r = 11) {
  const o = r * 0.86;
  [[-1, -1, true], [1, -1, false], [-1, 1, false], [1, 1, true]].forEach(([i, j, p]) => nucleon(ctx, x + i * o, y + j * o, p, r));
}
/* a photon: a wave packet of length len ending in its head at (hx, hy), moving along u */
function photon(ctx, hx, hy, u, len = 60, amp = 6, wl = 16, w = 3) {
  const col = F.el('gamma'), nx = -u[1], ny = u[0];
  ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = w; ctx.lineCap = 'round'; ctx.beginPath();
  for (let k = 0; k <= 40; k++) {
    const s = -len + (len - 12) * (k / 40), q = amp * Math.sin((s / wl) * TAU);
    const x = hx + u[0] * s + nx * q, y = hy + u[1] * s + ny * q;
    if (k) ctx.lineTo(x, y); else ctx.moveTo(x, y);
  }
  ctx.stroke(); ctx.restore();
  arrow(ctx, hx - u[0] * 14, hy - u[1] * 14, hx, hy, col, w);
}
function ring(ctx, x, y, r, color, w = 2.5, dash) {
  ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = w; if (dash) ctx.setLineDash(dash);
  ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.stroke(); ctx.restore();
}

/* =====================================================================
   FIGURE 21.6 · sim-rays-field · moving · flat, the bench seen from the side
   A lead block in section with its bore, the radioactive substance at the
   bore's closed end; two plates edge on; the photographic plate edge on.
   A particle runs along x at constant speed; between the plates (x from P1
   to P2) it falls along a parabola, then flies straight to the plate at
   FILM, so its height there is k(L² + 2LD). With + above, β lands 175 up
   and α 50 down: the 3.5 : 1 ratio of the deflections a 1-MeV β particle
   and a 4.7-MeV α particle take in one field; γ goes straight. α particles
   are drawn slower than β particles, as they are. The plates' state is a
   choice; the paths bend over 0.9 s when it changes. A spot on the plate
   darkens with each particle that lands on it.
===================================================================== */
(function () {
  const H = 560, d = sim('sim-rays-field', H);
  const AX = 290, BL = { l: 50, r: 330, t: 160, b: 420 }, SRC = 128, BORE = 20;
  const P1 = 520, P2 = 800, GAP = 112, PT = 16, FILM = 1250, FW = 26, FT = 60, FB = 520;
  const Lp = P2 - P1, DEN = Lp * Lp + 2 * Lp * (FILM - P2);
  const KIND = { a: { off: 50, v: 300, at: 0 }, b: { off: -175, v: 560, at: 0.23 }, g: { off: 0, v: 720, at: 0.47 } };
  const NAME = { a: 'an α particle: two protons and two neutrons, charge 2+', b: 'a β particle: an electron, charge 1−', g: 'a γ ray: a photon, no charge' };
  let spots = [], P = [], clock = 0;
  const plates = choice(d.controls, { label: '\\text{plates}', aria: 'the charge on the plates', ms: 900, value: 'up',
    options: [{ value: 'none', label: 'uncharged' }, { value: 'up', label: '+ above, − below' }, { value: 'down', label: '− above, + below' }],
    onInput: () => { spots.forEach((s) => { s.live = false; }); } });
  const sign = (v) => (v === 'up' ? 1 : v === 'down' ? -1 : 0);
  const bend = (x) => (x <= P1 ? 0 : x <= P2 ? ((x - P1) * (x - P1)) / DEN : (Lp * Lp + 2 * Lp * (x - P2)) / DEN);
  const slope = (x) => (x <= P1 ? 0 : x <= P2 ? (2 * (x - P1)) / DEN : (2 * Lp) / DEN);
  function step(dt) {
    clock += dt;
    for (const k of ['a', 'b', 'g']) { const K = KIND[k]; while (clock >= K.at) { P.push({ k, x: SRC + 18 + (clock - K.at) * K.v }); K.at += 0.7; } }
    for (const q of P) q.x += KIND[q.k].v * dt;
    const s = sign(plates.value), settled = plates.k >= 1;
    P = P.filter((q) => {
      if (q.x < FILM) return true;
      if (settled) { const y = AX + s * KIND[q.k].off; let sp = spots.find((z) => z.live && Math.abs(z.y - y) < 3); if (!sp) { sp = { y, n: 0, live: true, a: 1, kinds: {} }; spots.push(sp); } sp.n++; sp.kinds[q.k] = 1; }
      return false;
    });
    spots.forEach((z) => { if (!z.live) z.a -= dt / 0.9; });
    spots = spots.filter((z) => z.a > 0);
  }
  for (let i = 0; i < 300; i++) step(0.02);          /* the beams are already flying, and the spots made, when the figure is first seen */
  const cy = cycle(() => Infinity, 0);
  let hits = []; hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c); hits = [];
    const s = plates.mix(sign), on = Math.abs(s), sg = s >= 0 ? 1 : -1, cc = C('charge'), ink = PAL.ink;
    const yOf = (k, x) => AX + s * KIND[k].off * bend(x);
    /* the three paths, faint */
    ctx.save(); ctx.strokeStyle = alpha(ink, 0.22); ctx.lineWidth = 2;
    ['b', 'g', 'a'].forEach((k) => { ctx.beginPath(); ctx.moveTo(SRC, AX); for (let x = P1; x <= FILM; x += 10) ctx.lineTo(x, yOf(k, x)); ctx.lineTo(FILM, yOf(k, FILM)); ctx.stroke(); });
    ctx.restore();
    /* the lead block in section, its bore open to the right, the radioactive substance at the closed end */
    ctx.save(); ctx.fillStyle = F.el('Pb'); ctx.strokeStyle = ink; ctx.lineWidth = 3; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.roundRect(BL.l, BL.t, BL.r - BL.l, BL.b - BL.t, 8); ctx.fill(); ctx.stroke();
    ctx.fillStyle = PAL.panel; ctx.fillRect(SRC - 26, AX - BORE, BL.r - SRC + 30, 2 * BORE);
    ctx.beginPath(); ctx.moveTo(BL.r, AX - BORE); ctx.lineTo(SRC - 26, AX - BORE); ctx.lineTo(SRC - 26, AX + BORE); ctx.lineTo(BL.r, AX + BORE); ctx.lineWidth = 2.5; ctx.stroke();
    ctx.restore();
    disc(ctx, SRC, AX, 15, F.el('Ra'), ink, 2);
    hits.push({ x: SRC, y: AX, r: 22, name: 'the radioactive substance, which gives off all three kinds of radiation' });
    hits.push({ x: (BL.l + BL.r) / 2, y: BL.t + 50, r: 70, name: 'the lead block, which lets radiation out only through its bore' }, { x: (BL.l + BL.r) / 2, y: BL.b - 50, r: 70, name: 'the lead block, which lets radiation out only through its bore' });
    F.label(ctx, 'lead block', (BL.l + BL.r) / 2, BL.t, { side: 'above', size: 22, gap: 22, leader: false });
    F.label(ctx, 'radioactive substance', SRC, BL.b + 34, { side: 'below', size: 22, gap: 0, leader: false });
    line(ctx, SRC, AX + 20, SRC, BL.b + 18, alpha(PAL.panel, 0.9), 2, [5, 6]);
    /* the plates, edge on, each with its lead and its sign */
    [[-1, AX - GAP - PT], [1, AX + GAP]].forEach(([side, top]) => {
      ctx.save(); ctx.fillStyle = alpha(ink, 0.16); ctx.strokeStyle = ink; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.rect(P1, top, Lp, PT); ctx.fill(); ctx.stroke(); ctx.restore();
      const y0 = side < 0 ? top : top + PT, y1 = y0 + side * 54, xm = (P1 + P2) / 2;
      line(ctx, xm, y0, xm, y1, ink, 3);
      ctx.save(); ctx.globalAlpha = on; text(ctx, side * sg < 0 ? '+' : '−', xm + 36, y0 + side * 32, cc, { size: 44, weight: 600, align: 'center' }); ctx.restore();
      hits.push({ x: xm, y: top + PT / 2, r: 30, name: on < 0.5 ? 'a plate, uncharged' : 'the ' + (side * sg < 0 ? 'positive' : 'negative') + ' plate' });
    });
    text(ctx, plates.value === 'none' ? 'uncharged plates' : 'electrically charged plates', (P1 + P2) / 2, AX + GAP + PT + 82, ink, { size: 22, weight: 600, align: 'center' });
    /* the photographic plate, edge on, darkened where the radiation lands */
    ctx.save(); ctx.fillStyle = alpha(ink, 0.07); ctx.strokeStyle = ink; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.rect(FILM, FT, FW, FB - FT); ctx.fill(); ctx.stroke();
    spots.forEach((z) => {
      ctx.fillStyle = alpha(ink, 0.9 * z.a * Math.min(1, z.n / 6)); ctx.beginPath(); ctx.ellipse(FILM + FW / 2, z.y, FW / 2 - 3, 17, 0, 0, TAU); ctx.fill();
      const ks = Object.keys(z.kinds).map((k) => ({ a: 'α particles', b: 'β particles', g: 'γ rays' })[k]);
      hits.push({ x: FILM + FW / 2, y: z.y, r: 20, name: 'the plate darkened where ' + (ks.length > 1 ? 'all three kinds land' : ks[0] + ' land') });
    });
    ctx.restore();
    text(ctx, 'photographic plate', FILM + FW, FB + 24, ink, { size: 22, weight: 600, align: 'right' });
    /* the particles */
    P.forEach((q) => {
      const y = yOf(q.k, q.x);
      if (q.k === 'a') alphaParticle(ctx, q.x, y, 10);
      else if (q.k === 'b') disc(ctx, q.x, y, 10, F.el('e-'), alpha(ink, 0.5));
      else { const m = s * KIND.g.off * slope(q.x), n = Math.hypot(1, m); photon(ctx, q.x, y, [1 / n, m / n], 70, 9, 22, 4); }
      hits.push({ x: q.x, y, r: 18, name: NAME[q.k] });
    });
    /* each beam named once, beside its end; one name where they run together */
    const LX = FILM - 120, f = bend(LX);
    ctx.save(); ctx.globalAlpha = on;
    text(ctx, 'β particles', LX, AX + s * KIND.b.off * f - sg * 30, ink, { size: 24, weight: 600, align: 'center' });
    text(ctx, 'α particles', LX, AX + s * KIND.a.off * f + sg * 42, ink, { size: 24, weight: 600, align: 'center' });
    text(ctx, 'γ rays', LX - 150, AX - sg * 26, ink, { size: 24, weight: 600, align: 'center' });
    ctx.globalAlpha = 1 - on;
    text(ctx, 'α particles, β particles and γ rays', LX - 60, AX - 30, ink, { size: 24, weight: 600, align: 'center' });
    ctx.restore();
    const to = (k) => (KIND[k].off * sign(plates.value) > 0 ? 'lower' : 'upper');
    tex(d.readout, plates.value === 'none' ? '\\text{No field acts between the plates, so all three go straight to one spot.}'
      : '{}_{2}^{4}\\alpha\\text{ bends a little, toward the ' + to('a') + ' plate }(' + kv('charge', '-') + ')\\text{: positive and massive} \\\\ '
        + '{}_{-1}^{\\;0}\\beta\\text{ bends far, toward the ' + to('b') + ' plate }(' + kv('charge', '+') + ')\\text{: negative and light} \\\\ '
        + '{}_{0}^{0}\\gamma\\text{ goes straight: uncharged}', false, { values: false });
  }
  register(d.fig, { update: (dt) => { cy.step(dt, () => 1); step(Math.min(dt, 0.05)); }, draw });
})();

/* =====================================================================
   FIGURE 21.5 + 21.7 · sim-decay-modes · moving · flat
   One nucleus, the text's own example of each mode, decaying in place:
   it waits 0.9 s, the marked nucleon or nucleons leave or change, and the
   particle made flies off; 4.6 s, then a 1.4 s hold. The nucleus is its
   face: discs on a sunflower spiral, protons and neutrons in the
   proportion Z : N (oxygen-15 and potassium-40 show every nucleon). The
   nuclides are drawn to fill the stage, not to one scale. Beside it, the
   same decay as a move on a chart of neutrons against atomic number, the
   axes of Figure 21.9: α two left and two down, β one right and one down,
   positron emission and electron capture one left and one up, γ no move.
===================================================================== */
(function () {
  const H = 640, d = sim('sim-decay-modes', H), T = 4.6, T0 = 0.9;
  const CX = 300, CY = 305, END = [790, 190];
  const G = { l: 1010, r: 1320, t: 180, b: 490 };
  const MODES = {
    alpha: { P: [238, 92, 'U', 'uranium-238'], D: [234, 90, 'Th', 'thorium-234'], n: 106, rd: 17, after: ', still radioactive', change: 'A − 4,  Z − 2',
      part: '{}_{2}^{4}\\text{He}', head: 'Uranium-238 emits an α particle, two protons and two neutrons, and becomes thorium-234.' },
    beta: { P: [131, 53, 'I', 'iodine-131'], D: [131, 54, 'Xe', 'xenon-131'], n: 72, rd: 19, after: ', stable', change: 'A unchanged,  Z + 1',
      part: '{}_{-1}^{\\;0}\\text{e}', head: 'A neutron of iodine-131 becomes a proton, a β particle leaves, and xenon-131 is left.' },
    gamma: { P: [60, 27, 'Co*', 'cobalt-60 in an excited state'], D: [60, 27, 'Co', 'cobalt-60 in its ground state'], n: 44, rd: 22, after: '', change: 'A and Z unchanged',
      part: '{}_{0}^{0}\\gamma', head: 'Excited cobalt-60 emits a γ ray. No nucleon changes, so it is still cobalt-60.' },
    positron: { P: [15, 8, 'O', 'oxygen-15'], D: [15, 7, 'N', 'nitrogen-15'], n: 15, rd: 30, after: ', stable', change: 'A unchanged,  Z − 1',
      part: '{}_{+1}^{\\;0}\\text{e}', head: 'A proton of oxygen-15 becomes a neutron, a positron leaves, and nitrogen-15 is left.' },
    ec: { P: [40, 19, 'K', 'potassium-40'], D: [40, 18, 'Ar', 'argon-40'], n: 40, rd: 22, after: ', stable', change: 'A unchanged,  Z − 1',
      part: '', head: 'Potassium-40 captures an inner electron, a proton becomes a neutron, and argon-40 is left.' },
  };
  /* each nucleus: disc places, which are protons, which are the ones the mode marks */
  Object.entries(MODES).forEach(([id, m]) => {
    const c = 0.93 * m.rd, pts = Array.from({ length: m.n }, (_, i) => { const r = c * Math.sqrt(i + 0.6), a = i * 2.39996 + 0.5; return [r * Math.cos(a), r * Math.sin(a)]; });
    m.R = c * Math.sqrt(m.n) + m.rd * 0.6;
    let act;
    if (id === 'alpha') {                       /* the four on the right-hand rim, nearest the way out */
      const far = pts.map((p, i) => [p[0], i]).sort((a, b) => b[0] - a[0])[0][1];
      act = pts.map((p, i) => [Math.hypot(p[0] - pts[far][0], p[1] - pts[far][1]), i]).sort((a, b) => a[0] - b[0]).slice(0, 4).map((z) => z[1]);
    } else act = id === 'gamma' ? [] : [0];
    const np = Math.round((m.n * m.P[1]) / m.P[0]), isP = new Array(m.n).fill(false);
    const actP = id === 'alpha' ? 2 : id === 'beta' || id === 'gamma' ? 0 : 1;
    if (id === 'alpha') { isP[act[0]] = true; isP[act[3]] = true; } else if (actP) isP[0] = true;
    pts.map((_, i) => i).filter((i) => !act.includes(i)).sort((a, b) => hash(a, 3) - hash(b, 3)).slice(0, np - actP).forEach((i) => { isP[i] = true; });
    Object.assign(m, { pts, act, isP });
  });
  const mode = choice(d.controls, { label: '\\text{decay}', aria: 'the type of decay', value: 'alpha', ms: 500, onInput: () => cy.reset(),
    options: [{ value: 'alpha', label: 'α' }, { value: 'beta', label: 'β' }, { value: 'gamma', label: 'γ' }, { value: 'positron', label: 'positron' }, { value: 'ec', label: 'electron capture' }] });
  const cy = cycle(() => T, 1.4);
  let hits = []; hover(d.stage, () => hits);
  const electron = (ctx, x, y, pos) => disc(ctx, x, y, 9, F.el(pos ? 'e+' : 'e-'), alpha(PAL.ink, 0.5));
  const mixc = (a, b, k) => F.mixColor(a, b, k);
  function draw() {
    const { ctx } = begin(d.c); hits = [];
    const id = mode.value, m = MODES[id], t = cy.now(), ink = PAL.ink, pc = F.el('p+'), nc = F.el('n0');
    const ch = id === 'ec' ? clamp((t - 1.7) / 0.5) : clamp((t - T0) / 0.6);           /* the nucleon's change, 0 to 1 */
    const fly = clamp((t - T0) / (T - T0));
    topline(ctx, m.head);
    /* electron shells, for electron capture only */
    const R1 = m.R + 38, R2 = m.R + 72, A1 = -0.62, A2 = -0.5;
    const shellPt = (R, a) => [CX + R * Math.cos(a), CY + R * Math.sin(a)];
    if (id === 'ec') {
      ring(ctx, CX, CY, R1, alpha(ink, 0.35), 2, [6, 8]); ring(ctx, CX, CY, R2, alpha(ink, 0.35), 2, [6, 8]);
      const e1 = shellPt(R1, A1 + Math.PI); electron(ctx, e1[0], e1[1]);
      [1.2, 2.5, 3.9].forEach((a) => { const p = shellPt(R2, a); electron(ctx, p[0], p[1]); });
      hits.push({ x: CX - R1, y: CY, r: 16, name: 'the inner shell of electrons' }, { x: CX - R2, y: CY, r: 16, name: 'an outer shell of electrons' });
    }
    /* the nucleus, rim first so the middle lies on top */
    const gone = id === 'alpha' && t >= T0;
    for (let i = m.n - 1; i >= 0; i--) {
      if (m.act.includes(i)) continue;
      nucleon(ctx, CX + m.pts[i][0], CY + m.pts[i][1], m.isP[i], m.rd);
    }
    if (id === 'beta' || id === 'positron' || id === 'ec') {
      const from = m.isP[0] ? pc : nc, to = m.isP[0] ? nc : pc;
      disc(ctx, CX + m.pts[0][0], CY + m.pts[0][1], m.rd, mixc(from, to, ch), alpha(ink, 0.5));
      ring(ctx, CX + m.pts[0][0], CY + m.pts[0][1], m.rd + 3, ink, 3, ch > 0.5 ? [6, 6] : undefined);
    }
    if (id === 'gamma') ring(ctx, CX, CY, m.R + 10, alpha(ink, 1 - ch), 3, [10, 8]);
    hits.push({ x: CX, y: CY, r: m.R, name: (ch < 0.5 ? 'the parent nucleus, ' + m.P[3] : 'the daughter nucleus, ' + m.D[3]) });
    /* what leaves */
    if (id === 'alpha') {
      const c0 = m.act.reduce((s, i) => [s[0] + m.pts[i][0] / 4, s[1] + m.pts[i][1] / 4], [0, 0]), o = m.rd * 0.86;
      const form = [[-o, -o], [o, -o], [-o, o], [o, o]], k = clamp((t - T0) / 0.8);
      const px = CX + c0[0] + (END[0] - CX - c0[0]) * fly, py = CY + c0[1] + (END[1] - CY - c0[1]) * fly;
      if (gone) ring(ctx, CX + c0[0], CY + c0[1], m.rd * 2.1, alpha(ink, 0.7), 2.5, [6, 6]);
      m.act.forEach((i, j) => {
        const x = px + (m.pts[i][0] - c0[0]) * (1 - k) + form[j][0] * k, y = py + (m.pts[i][1] - c0[1]) * (1 - k) + form[j][1] * k;
        nucleon(ctx, x, y, m.isP[i], m.rd);
      });
      if (!gone) ring(ctx, CX + c0[0], CY + c0[1], m.rd * 2.1, ink, 3);
      hits.push({ x: px, y: py, r: 34, name: 'the α particle: two protons and two neutrons' });
    } else if (id === 'beta' || id === 'positron') {
      if (t >= T0) {
        const x = CX + m.pts[0][0] + (END[0] - CX) * fly, y = CY + m.pts[0][1] + (END[1] - CY) * fly;
        electron(ctx, x, y, id === 'positron');
        hits.push({ x, y, r: 20, name: id === 'beta' ? 'the β particle, an electron made in the nucleus' : 'the positron' });
      }
    } else if (id === 'gamma') {
      if (t >= T0) {
        const u = [END[0] - CX, END[1] - CY], n = Math.hypot(u[0], u[1]), s = m.R + 20 + (n - m.R - 20) * fly;
        photon(ctx, CX + (u[0] / n) * s, CY + (u[1] / n) * s, [u[0] / n, u[1] / n], 64, 9, 20, 4);
        hits.push({ x: CX + (u[0] / n) * s, y: CY + (u[1] / n) * s, r: 30, name: 'the γ ray' });
      }
    } else {
      /* the captured electron falls from the inner shell into the nucleus; an outer electron takes its place; an X-ray leaves */
      const s0 = shellPt(R1, A1), k1 = clamp((t - T0) / 0.8), k2 = clamp((t - 1.9) / 0.8), k3 = clamp((t - 2.7) / (T - 2.7));
      if (k1 < 1) { const x = s0[0] + (CX - s0[0]) * k1, y = s0[1] + (CY - s0[1]) * k1; electron(ctx, x, y); if (t < T0) ring(ctx, x, y, 13, ink, 2.5); hits.push({ x, y, r: 18, name: 'the inner electron the nucleus captures' }); }
      else if (k2 < 1) ring(ctx, s0[0], s0[1], 10, alpha(ink, 0.6), 2, [4, 4]);
      const o0 = shellPt(R2, A2), ox = o0[0] + (s0[0] - o0[0]) * k2, oy = o0[1] + (s0[1] - o0[1]) * k2;
      electron(ctx, ox, oy); hits.push({ x: ox, y: oy, r: 18, name: k2 > 0 ? 'the outer electron that fills the vacancy' : 'an outer electron' });
      if (t >= 2.7) {
        const u = [0.97, -0.24], x = s0[0] + u[0] * (40 + 300 * k3), y = s0[1] + u[1] * (40 + 300 * k3);
        photon(ctx, x, y, u, 60, 8, 18, 4); hits.push({ x, y, r: 30, name: 'the X-ray given off as the outer electron drops into the vacancy' });
      }
    }
    /* the nucleus named, with its counts */
    const who = ch < 0.5 ? m.P : m.D, N = who[0] - who[1], ly = Math.min(H - 76, CY + (id === 'ec' ? R2 : m.R) + 40), fade = Math.abs(2 * ch - 1);
    ctx.save(); ctx.globalAlpha = fade;
    text(ctx, (ch < 0.5 ? 'parent: ' + who[3] : 'daughter: ' + who[3] + m.after), CX, ly, ink, { size: 24, weight: 600, align: 'center' });
    F.rich(ctx, [[String(who[1]), pc, 700], who[1] === 1 ? ' proton, ' : ' protons, ', [String(N), nc, 700], ' neutrons'], CX, ly + 30, { size: 22, align: 'center' });
    ctx.restore();
    /* the key: only what this mode draws */
    const key = [{ s: 'proton', draw: (c, x, y) => nucleon(c, x, y, true, 10) }, { s: 'neutron', draw: (c, x, y) => nucleon(c, x, y, false, 10) }];
    if (id === 'alpha') key.push({ s: 'α particle', draw: (c, x, y) => alphaParticle(c, x, y, 6) });
    if (id === 'beta') key.push({ s: 'β particle (electron)', draw: (c, x, y) => electron(c, x, y) });
    if (id === 'positron') key.push({ s: 'positron', draw: (c, x, y) => electron(c, x, y, true) });
    if (id === 'gamma') key.push({ s: 'γ ray', draw: (c, x, y) => photon(c, x + 20, y, [1, 0], 40, 5, 13, 2.5) });
    if (id === 'ec') key.push({ s: 'electron', draw: (c, x, y) => electron(c, x, y) }, { s: 'X-ray', draw: (c, x, y) => photon(c, x + 20, y, [1, 0], 40, 5, 13, 2.5) });
    F.legend(ctx, { l: 520, r: 980, t: H - 60, b: H - 14 }, key, { corner: 'bottom', row: true, panel: false, size: 19 });
    /* the same decay on the chart of neutrons against atomic number */
    const Zp = m.P[1], Np = m.P[0] - m.P[1], Zd = m.D[1], Nd = m.D[0] - m.D[1];
    const ax = axes(ctx, G, [Zp - 3, Zp + 2], [Np - 3, Np + 2], { nx: 5, ny: 5, xl: 'atomic number (Z)', yl: 'number of neutrons (n)', fx: (v) => String(Math.round(v)), fy: (v) => String(Math.round(v)) });
    text(ctx, m.change, (G.l + G.r) / 2, G.t - 62, ink, { size: 24, weight: 600, align: 'center' });
    const x0 = ax.X(Zp), y0 = ax.Y(Np), x1 = ax.X(Zd), y1 = ax.Y(Nd), ka = F.ease.smooth(clamp((t - T0) / 0.9));
    const nuc = (w) => sup(w[0]) + w[2];
    if (id === 'gamma') {
      dot(ctx, x0, y0, ink, true, 10);
      if (ka > 0 && ka < 1) ring(ctx, x0, y0, 10 + 26 * ka, alpha(ink, 1 - ka), 3);
      text(ctx, ka < 0.5 ? nuc(m.P) : nuc(m.D), x0 + 20, y0 - 22, ink, { size: 24, weight: 600, bg: PAL.panel });
      text(ctx, 'stays where it is', x0, y0 + 34, PAL.muted, { size: 19, align: 'center', bg: PAL.panel });
    } else {
      const ux = x1 - x0, uy = y1 - y0, L = Math.hypot(ux, uy), a = 16 / L, b = 1 - 18 / L;
      dot(ctx, x0, y0, ink, false, 10);
      if (ka > 0.02) arrow(ctx, x0 + ux * a, y0 + uy * a, x0 + ux * (a + (b - a) * ka), y0 + uy * (a + (b - a) * ka), ink, 5);
      if (ka >= 1) dot(ctx, x1, y1, ink, true, 10);
      text(ctx, nuc(m.P), x0 + 18, y0 - 24, ink, { size: 24, weight: 600, bg: PAL.panel });
      if (ka >= 1) text(ctx, nuc(m.D), x1 + (uy > 0 ? 16 : -16), y1 + (uy > 0 ? 28 : -26), ink, { size: 24, weight: 600, align: uy > 0 ? 'left' : 'right', bg: PAL.panel });
    }
    hits.push({ x: x0, y: y0, r: 18, name: m.P[3] + ': ' + Zp + ' protons, ' + Np + ' neutrons' });
    if (id !== 'gamma') hits.push({ x: x1, y: y1, r: 18, name: m.D[3] + ': ' + Zd + ' protons, ' + Nd + ' neutrons' });
    const eq = id === 'ec' ? nucTex(40, 19, 'K') + '+{}_{-1}^{\\;0}\\text{e}\\longrightarrow ' + nucTex(40, 18, 'Ar')
      : nucTex(m.P[0], m.P[1], m.P[2]) + '\\longrightarrow ' + m.part + '+' + nucTex(m.D[0], m.D[1], m.D[2]);
    tex(d.readout, eq + ' \\\\ \\text{n:p ratio: }\\frac{' + Np + '}{' + Zp + '}=' + fmt(Np / Zp, 3) + '\\;\\longrightarrow\\;\\frac{' + Nd + '}{' + Zd + '}=' + fmt(Nd / Zd, 3), false, { values: false });
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();

/* =====================================================================
   FIGURE 21.9 · sim-decay-series · still · flat
   The uranium-238 series on the book's axes: atomic number across, 80 to
   92, and number of neutrons up, 122 to 148, both fixed. An α decay goes
   two left and two down, a β decay one right and one down. The slider is
   how many of the fourteen decays have happened; it opens on all fourteen,
   the book's picture. Every nuclide is named, as in the book.
===================================================================== */
(function () {
  const H = 700, d = sim('sim-decay-series', H);
  const S = [[238, 92, 'U', 'uranium', 'r'], [234, 90, 'Th', 'thorium', 'l'], [234, 91, 'Pa', 'protactinium', 'ar'], [234, 92, 'U', 'uranium', 'r'], [230, 90, 'Th', 'thorium', 'br'],
    [226, 88, 'Ra', 'radium', 'br'], [222, 86, 'Rn', 'radon', 'br'], [218, 84, 'Po', 'polonium', 'br'], [214, 82, 'Pb', 'lead', 'l'], [214, 83, 'Bi', 'bismuth', 'ar'],
    [214, 84, 'Po', 'polonium', 'r'], [210, 82, 'Pb', 'lead', 'l'], [210, 83, 'Bi', 'bismuth', 'ar'], [210, 84, 'Po', 'polonium', 'r'], [206, 82, 'Pb', 'lead', 'l']];
  const isA = (i) => S[i + 1][0] < S[i][0];                 /* step i, from nuclide i to i + 1, is an α decay */
  const n = ctl(d.controls, { label: '\\text{decays so far}', cls: '', key: 'decays', min: 0, max: 14, step: 1, value: 14, unit: '', dec: 0, aria: 'the number of decays so far' });
  const G = { l: 170, r: 1230, t: 120, b: 610 };
  let hits = []; hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c); hits = [];
    const k = Math.round(n.v), ink = PAL.ink, ca = F.cat(0), cb = F.cat(1);
    let na = 0, nb = 0; for (let i = 0; i < k; i++) { if (isA(i)) na++; else nb++; }
    const ax = axes(ctx, G, [80, 92], [122, 148], { nx: 12, ny: 13, xl: 'atomic number (Z)', yl: 'number of neutrons (n)', fx: (v) => String(Math.round(v)), fy: (v) => String(Math.round(v)) });
    const at = (i) => [ax.X(S[i][1]), ax.Y(S[i][0] - S[i][1])], name = (i) => S[i][3] + '-' + S[i][0];
    /* the fourteen decays: taken ones solid, the latest heavier, the rest faint */
    for (let i = 0; i < 14; i++) {
      const [x0, y0] = at(i), [x1, y1] = at(i + 1), L = Math.hypot(x1 - x0, y1 - y0), a = 14 / L, b = 1 - 16 / L, c = isA(i) ? ca : cb, done = i < k;
      arrow(ctx, x0 + (x1 - x0) * a, y0 + (y1 - y0) * a, x0 + (x1 - x0) * b, y0 + (y1 - y0) * b, done ? c : alpha(c, 0.28), i === k - 1 ? 7 : done ? 4.5 : 3);
      hits.push({ x: (x0 + x1) / 2, y: (y0 + y1) / 2, r: 18, name: name(i) + ' → ' + name(i + 1) + (isA(i) ? ', an α decay' : ', a β decay') });
    }
    S.forEach((s, i) => {
      const [x, y] = at(i), reached = i <= k, col = reached ? ink : alpha(ink, 0.45), side = s[4];
      if (i === k) ring(ctx, x, y, 17, alpha(ink, 0.55), 2.5);
      if (i === 14) dot(ctx, x, y, col, true, 9); else { disc(ctx, x, y, 8, PAL.panel, col, 3); }
      const lx = side === 'r' ? x + 18 : side === 'l' ? x - 18 : x + 12, ly = side === 'ar' ? y - 22 : side === 'br' ? y + 24 : y;
      text(ctx, sup(s[0]) + s[2], lx, ly, col, { size: 23, weight: reached ? 600 : 400, align: side === 'l' ? 'right' : 'left' });
      hits.push({ x, y, r: 14, name: name(i) + ': ' + s[1] + ' protons, ' + (s[0] - s[1]) + ' neutrons, ' + (i === 14 ? 'stable' : 'radioactive') });
    });
    /* the count, in the clear corner above the chain */
    const TX = G.l + 40, TY = G.t + 46;
    F.rich(ctx, [[String(na), ca, 700], na === 1 ? ' α decay' : ' α decays', ', two left and two down'], TX, TY, { size: 24 });
    F.rich(ctx, [[String(nb), cb, 700], nb === 1 ? ' β decay' : ' β decays', ', one right and one down'], TX, TY + 38, { size: 24 });
    if (k > 0) {
      const p = S[k - 1], q = S[k], al = isA(k - 1);
      text(ctx, '$' + nucTex(p[0], p[1], p[2]) + '\\longrightarrow ' + (al ? '{}_{2}^{4}\\text{He}' : '{}_{-1}^{\\;0}\\text{e}') + '+' + nucTex(q[0], q[1], q[2]) + '$', TX, TY + 100, ink, { size: 30, tex: true });
    }
    F.legend(ctx, ax, [{ s: 'α decay', color: ca, w: 4.5 }, { s: 'β decay', color: cb, w: 4.5 }, { s: 'radioactive', kind: 'dot', hollow: true, color: ink }, { s: 'stable', kind: 'dot', color: ink }], { corner: 'br', size: 19 });
    topline(ctx, k === 0 ? 'Uranium-238, the parent of the series, before any decay.'
      : 'Decay ' + k + ' of 14: ' + name(k - 1) + ' emits ' + (isA(k - 1) ? 'an α particle' : 'a β particle') + ' and becomes ' + name(k) + (k === 14 ? ', which is stable.' : '.'));
    tex(d.readout, 'A = 238 - 4\\,n_{\\alpha} = 238 - 4(' + na + ') = ' + S[k][0] + ' \\\\ Z = 92 - 2\\,n_{\\alpha} + n_{\\beta} = 92 - 2(' + na + ') + ' + nb + ' = ' + S[k][1]);
  }
  still(d, draw);
})();

/* =====================================================================
   FIGURE 21.10 · sim-half-life · moving · flat
   A sample of cobalt-60 nuclei (400, 200 or 100), each decaying to
   nickel-60 at a random moment of its own, −ln(u)/λ years with
   λ = 0.132 y⁻¹ (Example 21.5). The clock runs 0 to 26.35 y, five
   half-lives of 5.27 y, in 8 s, holds 1.2 s and starts on a fresh sample.
   Top graph: cobalt-60 remaining, 0 to 100 %, the law in ink and this
   sample's own count as a thin step line. Bottom graph: the decay rate,
   0 to 60 decays per year, the sample's decays counted in bins a fifth of
   a half-life wide, with λN₀e^(−λt) dashed over them. Both on t from 0 to
   26.35 y with a tick at each half-life, as the book has them; all fixed.
===================================================================== */
(function () {
  const H = 700, LAM = 0.132, TH = 5.27, TMAX = 5 * TH, RUN = 8, FLASH = 0.8, BIN = TH / 5;
  const BX = { l: 60, r: 480, t: 150, b: 570 };
  const GT = { l: 640, r: 1330, t: 130, b: 350 }, GR = { l: 640, r: 1330, t: 440, b: 600 };
  const d = sim('sim-half-life', H);
  const cy = cycle(() => TMAX, 1.2);
  let seed = 1, NN = 400, U = [], sorted = [], bins = [], PTS = [], ANG = [], RN = 8;
  function draws() {
    const r = rng(seed * 2654435761);
    U = Array.from({ length: NN }, () => -Math.log(r()) / LAM); ANG = U.map(() => r() * TAU); sorted = U.slice().sort((a, b) => a - b);
    const cols = Math.ceil(Math.sqrt(NN)), rows = Math.ceil(NN / cols), p = (BX.r - BX.l) / cols, y0 = (BX.t + BX.b) / 2 - ((rows - 1) * p) / 2;
    PTS = U.map((_, i) => [BX.l + p / 2 + (i % cols) * p, y0 + Math.floor(i / cols) * p]); RN = Math.min(13, p * 0.4);
    bins = new Array(25).fill(0); U.forEach((u) => { if (u < TMAX) bins[Math.min(24, Math.floor(u / BIN))]++; });
  }
  const size = choice(d.controls, { label: '\\text{nuclei at the start, }N_{0}', aria: 'the number of cobalt-60 nuclei at the start', value: '400', ms: 0,
    options: [100, 200, 400].map((v) => ({ value: String(v), label: String(v) })), onInput: (v) => { NN = +v; seed++; draws(); cy.reset(); } });
  draws();
  let hits = []; hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c); hits = [];
    const t = cy.now(), TC = C('time'), RC = C('rate'), ink = PAL.ink, tt = Math.round(t * 10) / 10;
    let left = 0; for (let i = 0; i < NN; i++) if (U[i] > t) left++;
    F.rich(ctx, ['After ', [fmt(tt, 1) + ' y', TC], ', ' + fmt(tt / TH, 2) + ' half-lives, ', [String(left), ink, 700], ' of the ' + NN + ' cobalt-60 nuclei are left.'], 700, 46, { size: 26, align: 'center' });
    /* the sample */
    ctx.save(); ctx.strokeStyle = PAL.rule; ctx.lineWidth = 2; ctx.fillStyle = alpha(ink, 0.03); ctx.beginPath(); ctx.roundRect(BX.l - 14, BX.t - 14, BX.r - BX.l + 28, BX.b - BX.t + 28, 10); ctx.fill(); ctx.stroke();
    ctx.fillStyle = ink; ctx.beginPath();
    PTS.forEach(([x, y], i) => { if (U[i] > t) { ctx.moveTo(x + RN, y); ctx.arc(x, y, RN, 0, TAU); } });
    ctx.fill();
    ctx.strokeStyle = alpha(ink, 0.32); ctx.lineWidth = 2; ctx.beginPath();
    PTS.forEach(([x, y], i) => { if (U[i] <= t) { ctx.moveTo(x + RN - 1.5, y); ctx.arc(x, y, RN - 1.5, 0, TAU); } });
    ctx.stroke(); ctx.restore();
    /* each decay as it happens: a ring, and the radiation leaving */
    PTS.forEach(([x, y], i) => {
      const k = (t - U[i]) / FLASH; if (k < 0 || k >= 1) return;
      ring(ctx, x, y, RN + 12 * k, alpha(RC, 1 - k), 3);
      const ux = Math.cos(ANG[i]), uy = Math.sin(ANG[i]), a = RN + 4 + 44 * k;
      line(ctx, x + ux * a, y + uy * a, x + ux * (a + 18), y + uy * (a + 18), alpha(RC, 0.9 * (1 - k)), 3.5);
    });
    hits.push({ x: (BX.l + BX.r) / 2, y: (BX.t + BX.b) / 2, r: 210, name: 'the sample: ' + left + ' of its ' + NN + ' cobalt-60 nuclei have not decayed' });
    F.legend(ctx, { l: BX.l - 14, r: BX.r + 14, t: BX.b + 26, b: BX.b + 70 }, [{ s: 'cobalt-60', kind: 'dot', color: ink }, { s: 'decayed to nickel-60', kind: 'dot', hollow: true, color: alpha(ink, 0.45) },
      { s: 'a decay', draw: (c, x, y) => { ring(c, x - 8, y, 8, RC, 3); line(c, x + 4, y, x + 20, y, RC, 3.5); } }], { corner: 'top', row: true, panel: false, size: 19 });
    /* cobalt-60 remaining */
    const g = axes(ctx, GT, [0, TMAX], [0, 100], { nx: 5, ny: 8, yl: 'Co-60 remaining (%)', fx: () => '', fy: (v) => ([0, 12.5, 25, 50, 75, 100].some((w) => Math.abs(w - v) < 0.01) ? fmt(v, v % 1 ? 1 : 0) : '') });
    const r = axes(ctx, GR, [0, TMAX], [0, 60], { nx: 5, ny: 3, xl: 'time, t (y)', xc: TC, yl: 'decay rate (decays per year)', yc: RC, fx: (v) => fmt(v, 2), fy: (v) => String(Math.round(v)) });
    const FR = ['', '1/2', '1/4', '1/8', '1/16', '1/32'];
    for (let k = 1; k <= 5; k++) {
      const x = g.X(k * TH), y = g.Y(100 / 2 ** k);
      line(ctx, x, y, x, GR.b, alpha(ink, 0.35), 2, [4, 8]);
      line(ctx, GT.l, y, x, y, alpha(ink, 0.35), 2, [4, 8]);
      hits.push({ x, y, r: 14, name: 'after ' + k + (k === 1 ? ' half-life, ' : ' half-lives, ') + fmt(k * TH, 2) + ' y: ' + fmt(100 / 2 ** k, k > 3 ? 3 : 1) + '% remains' });
    }
    F.plot(ctx, g, (s) => 100 * Math.exp(-LAM * s), ink, { w: 5 });
    for (let k = 0; k <= 5; k++) {
      const x = g.X(k * TH), y = g.Y(100 / 2 ** k);
      dot(ctx, x, y, ink, false, 8);
      if (k) text(ctx, FR[k], x + (k < 5 ? 12 : -4), y - 22, ink, { size: 21, weight: 600, align: k < 5 ? 'left' : 'right' });
    }
    ctx.save(); ctx.strokeStyle = alpha(PAL.muted, 0.95); ctx.lineWidth = 2; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(g.X(0), g.Y(100));
    let m = NN;
    for (const u of sorted) { if (u > t) break; ctx.lineTo(g.X(u), g.Y((100 * m) / NN)); m--; ctx.lineTo(g.X(u), g.Y((100 * m) / NN)); }
    ctx.lineTo(g.X(t), g.Y((100 * m) / NN)); ctx.stroke(); ctx.restore();
    F.legend(ctx, g, [{ s: 'the law, $100\\,e^{-\\klamdecay\\kt}$', color: ink, w: 5 }, { s: 'this sample', color: PAL.muted, w: 2 }], { corner: 'tr', size: 19 });
    /* the decay rate: the sample's decays in each fifth of a half-life, and the law λN */
    ctx.save(); ctx.fillStyle = alpha(RC, 0.55);
    bins.forEach((c, b) => {
      const t0 = b * BIN; if (t <= t0) return;
      let cnt = c; if (t < t0 + BIN) { cnt = 0; for (const u of U) if (u >= t0 && u <= t) cnt++; }
      const x0 = r.X(t0) + 2, x1 = r.X(Math.min(t, t0 + BIN)) - 2, y = r.Y(cnt / BIN);
      if (x1 > x0) ctx.fillRect(x0, y, x1 - x0, GR.b - y);
    });
    ctx.restore();
    F.plot(ctx, r, (s) => LAM * NN * Math.exp(-LAM * s), RC, { w: 4, dash: [10, 10] });
    F.legend(ctx, r, [{ s: 'decays counted', kind: 'swatch', color: alpha(RC, 0.55) }, { s: '$\\klamdecay N$, the law', color: RC, w: 4, dash: [10, 10] }], { corner: 'tr', size: 19 });
    /* the clock */
    const xt = g.X(t);
    line(ctx, xt, GT.t, xt, GT.b, TC, 2.5); line(ctx, xt, GR.t, xt, GR.b, TC, 2.5);
    dot(ctx, xt, g.Y(100 * Math.exp(-LAM * t)), ink, true, 9);
    dot(ctx, xt, r.Y(LAM * NN * Math.exp(-LAM * t)), RC, true, 8);
    hits.push({ x: xt, y: g.Y((100 * left) / NN), r: 12, name: 'this sample: ' + left + ' of ' + NN + ' nuclei, ' + fmt((100 * left) / NN, 1) + '%' });
    const lam = kv('rate-constant', '0.132\\;\\text{y}^{-1}');
    tex(d.readout, '\\text{decay rate} = \\klamdecay N = (' + lam + ')(' + left + ') = ' + kv('rate', fmt(LAM * left, 1) + '\\;\\text{decays/y}')
      + ' \\\\ \\frac{N_{t}}{N_{0}} = e^{-\\klamdecay\\kt} = e^{-(' + lam + ')(' + kv('time', fmt(tt, 1) + '\\;\\text{y}') + ')} = ' + fmt(Math.exp(-LAM * tt), 3), false, { values: false });
  }
  register(d.fig, { update: (dt) => { const was = cy.now(); cy.step(dt, () => TMAX / RUN); if (cy.now() < was) { seed++; draws(); } }, draw });
})();

/* =====================================================================
   FIGURE 21.11 · sim-carbon-dating · still · flat
   The decay rate per gram of carbon against the time since the tree died:
   level at 13.6 dis/min/g while it lives and takes in CO₂, then
   13.6e^(−λt), λ = 1.21 × 10⁻⁴ y⁻¹ (Example 21.6). Axes fixed: −5000 to
   25 000 y, 0 to 15 dis/min/g. The slider is the rate measured in the
   sample now; where its level meets the curve is the age. Over the graph,
   a hundred carbon-14 atoms of the wood, of which 100 × rate/13.6 are
   left, the rest nitrogen-14, since the rate is proportional to the
   number of carbon-14 atoms. The slider opens on Example 21.6's 10.8.
===================================================================== */
(function () {
  const H = 710, LAM = 1.21e-4, R0 = 13.6, TA = -5000, TB = 25000;
  const G = { l: 150, r: 1300, t: 350, b: 610 }, GY = 268;
  const COLS = 20, PITCH = 29, SX = 690, SY = 128, RA = 11;
  const d = sim('sim-carbon-dating', H);
  const RT = ctl(d.controls, { label: '\\krate_{t}', cls: 'rate', min: 1, max: 13.6, step: 0.01, value: 10.8, unit: 'dis/min/g', dec: 2,
    detents: [{ v: 10.8, label: 'Dead Sea Scrolls' }, { v: 9.07, label: 'King Tut' }], specials: [{ at: R0 / 2, label: 'one half-life' }],
    aria: 'the decay rate measured in the sample now, in disintegrations per minute per gram of carbon' });
  const ORDER = (() => { const a = Array.from({ length: 100 }, (_, i) => i); const r = rng(11); for (let i = 99; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; })();
  const rateAt = (s) => (s < 0 ? R0 : R0 * Math.exp(-LAM * s));
  let hits = []; hover(d.stage, () => hits);
  function co2(ctx, x, y) { disc(ctx, x - 13, y, 7, F.el('O'), alpha(PAL.ink, 0.45), 1.2); disc(ctx, x + 13, y, 7, F.el('O'), alpha(PAL.ink, 0.45), 1.2); disc(ctx, x, y, 8, F.el('C'), alpha(PAL.ink, 0.45), 1.2); }
  /* a tree in leaf, its foot at (x, GY) */
  function tree(ctx, x) {
    const ink = PAL.ink;
    ctx.save(); ctx.fillStyle = alpha(ink, 0.14); ctx.strokeStyle = ink; ctx.lineWidth = 3; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.moveTo(x - 26, GY); ctx.quadraticCurveTo(x - 10, GY - 14, x - 10, GY - 60); ctx.lineTo(x - 8, GY - 90); ctx.lineTo(x + 8, GY - 90); ctx.lineTo(x + 10, GY - 60); ctx.quadraticCurveTo(x + 10, GY - 14, x + 26, GY); ctx.closePath(); ctx.fill(); ctx.stroke();
    const LOBES = [[0, -138, 36], [-40, -120, 32], [40, -120, 32], [-58, -92, 28], [58, -92, 28], [-24, -82, 30], [24, -82, 30], [0, -106, 38]];
    const crown = () => { ctx.beginPath(); LOBES.forEach(([dx, dy, r]) => { ctx.moveTo(x + dx + r, GY + dy); ctx.arc(x + dx, GY + dy, r, 0, TAU); }); };
    ctx.lineWidth = 6; crown(); ctx.stroke();
    ctx.fillStyle = PAL.panel; crown(); ctx.fill();
    ctx.fillStyle = alpha(ink, 0.1); crown(); ctx.fill();
    ctx.restore();
  }
  /* a cut log lying on the ground, its sawn end toward the reader */
  function log(ctx, x, w) {
    const ink = PAL.ink, r = 30, y = GY - r;
    ctx.save(); ctx.fillStyle = alpha(ink, 0.14); ctx.strokeStyle = ink; ctx.lineWidth = 3; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.moveTo(x, y - r); ctx.lineTo(x + w, y - r); ctx.ellipse(x + w, y, 12, r, 0, -Math.PI / 2, Math.PI / 2); ctx.lineTo(x, y + r); ctx.ellipse(x, y, 12, r, 0, Math.PI / 2, -Math.PI / 2, true); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.fillStyle = PAL.panel; ctx.beginPath(); ctx.ellipse(x + w, y, 12, r, 0, 0, TAU); ctx.fill(); ctx.stroke();
    ctx.lineWidth = 1.5; [0.66, 0.33].forEach((k) => { ctx.beginPath(); ctx.ellipse(x + w, y, 12 * k, r * k, 0, 0, TAU); ctx.stroke(); });
    ctx.restore();
  }
  function draw() {
    const { ctx } = begin(d.c); hits = [];
    const Rm = sig(RT.v, 3), TC = C('time'), RC = C('rate'), ink = PAL.ink, cC = F.el('C'), cN = F.el('N');
    const age = sig(-Math.log(Rm / R0) / LAM, 3), left = Math.round((100 * Rm) / R0);
    F.rich(ctx, ['Carbon that gives ', [fsig(Rm, 3) + ' dis/min/g', RC], ', against 13.6 in living wood, died about ', [grp(age, ',') + ' years', TC], ' ago.'], 700, 46, { size: 26, align: 'center' });
    const g = axes(ctx, G, [TA, TB], [0, 15], { nx: 6, ny: 3, xl: 'time since the tree died, t (y)', xc: TC, yl: 'decay rate (dis/min/g of carbon)', yc: RC, fx: (v) => grp(v, ','), fy: (v) => String(Math.round(v)) });
    const x0 = g.X(0);
    /* above the graph: the living tree taking in CO₂, the dead wood, and a hundred of its carbon-14 atoms */
    line(ctx, 40, GY, 620, GY, alpha(ink, 0.6), 3);
    line(ctx, x0, 96, x0, G.b, alpha(ink, 0.4), 2, [10, 10]);
    text(ctx, 'the tree dies', x0 + 12, 108, ink, { size: 20, weight: 600 });
    tree(ctx, 252);
    [[64, 156], [100, 196], [52, 236]].forEach(([x, y], i) => { co2(ctx, x, y); arrow(ctx, x + 26, y + (i === 1 ? 0 : i ? -4 : 4), x + 62, y + (i === 1 ? 0 : i ? -12 : 12), alpha(ink, 0.7), 3); hits.push({ x, y, r: 22, name: 'CO₂ from the air: about one carbon atom in a trillion is carbon-14' }); });
    text(ctx, 'CO₂ from the air', 24, 114, ink, { size: 20, weight: 600 });
    hits.push({ x: 252, y: GY - 100, r: 80, name: 'the living tree: it takes in carbon-14 as fast as its carbon-14 decays' });
    log(ctx, 400, 150);
    text(ctx, 'wood from the dead tree', 462, GY - 86, ink, { size: 20, weight: 600, align: 'center' });
    hits.push({ x: 475, y: GY - 30, r: 60, name: 'wood from the dead tree: it takes in no more carbon' });
    const bx = { l: SX - 24, r: SX + (COLS - 1) * PITCH + 24, t: SY - 24, b: SY + 4 * PITCH + 24 };
    line(ctx, 562, GY - 60, bx.l, bx.t + 6, alpha(ink, 0.4), 2, [5, 6]); line(ctx, 562, GY, bx.l, bx.b - 6, alpha(ink, 0.4), 2, [5, 6]);
    ctx.save(); ctx.strokeStyle = PAL.rule; ctx.lineWidth = 2; ctx.fillStyle = alpha(ink, 0.03); ctx.beginPath(); ctx.roundRect(bx.l, bx.t, bx.r - bx.l, bx.b - bx.t, 10); ctx.fill(); ctx.stroke(); ctx.restore();
    ORDER.forEach((rk, i) => {
      const x = SX + (i % COLS) * PITCH, y = SY + Math.floor(i / COLS) * PITCH, isC = rk < left;
      disc(ctx, x, y, RA, isC ? cC : cN, alpha(ink, 0.45));
      hits.push({ x, y, r: 14, name: isC ? 'a carbon-14 atom' : 'a nitrogen-14 atom, made when a carbon-14 atom decayed' });
    });
    F.rich(ctx, [[String(left), cC, 700], ' of 100 carbon-14 atoms left'], bx.l + 4, bx.b + 28, { size: 22 });
    F.legend(ctx, { l: bx.l + 330, r: bx.r, t: bx.b + 8, b: bx.b + 48 }, [{ s: 'carbon-14', kind: 'dot', color: cC }, { s: 'nitrogen-14', kind: 'dot', color: cN }], { corner: 'top', row: true, panel: false, size: 19 });
    /* the curve, the measured level and the age it gives */
    F.plot(ctx, g, rateAt, ink, { w: 5 });
    const xa = g.X(age), ya = g.Y(Rm);
    line(ctx, G.l, ya, xa, ya, RC, 3, [10, 10]);
    line(ctx, xa, ya, xa, G.b, TC, 3, [4, 8]);
    dot(ctx, xa, ya, ink, false, 10);
    dot(ctx, xa, G.b, TC, true, 7);
    F.rich(ctx, [[grp(age, ',') + ' y', TC]], xa + 18, ya - 22, { size: 24 });
    text(ctx, 'alive: 13.6', (G.l + x0) / 2, g.Y(R0) - 22, PAL.muted, { size: 19, align: 'center' });
    const xh = g.X(5730), yh = g.Y(R0 / 2);
    dot(ctx, xh, yh, PAL.muted, true, 5);
    text(ctx, 'half-life, 5730 y: 6.80', xh - 12, yh + 20, PAL.muted, { size: 19, align: 'right' });
    hits.push({ x: xa, y: ya, r: 16, name: 'where the measured rate meets the curve' }, { x: xa, y: G.b, r: 14, name: 'the age of the sample, ' + grp(age, ',') + ' years' });
    tex(d.readout, '\\kt = -\\frac{1}{\\klamdecay}\\ln\\left(\\frac{\\krate_{t}}{\\krate_{0}}\\right) = -\\frac{1}{' + kv('rate-constant', '1.21\\times 10^{-4}\\;\\text{y}^{-1}') + '}\\ln\\left(\\frac{' + kv('rate', fsig(Rm, 3) + '\\;\\text{dis/min/g}') + '}{' + kv('rate', '13.6\\;\\text{dis/min/g}') + '}\\right) = ' + kv('time', grp(age, '{,}') + '\\;\\text{y}'));
  }
  still(d, draw);
})();
};
