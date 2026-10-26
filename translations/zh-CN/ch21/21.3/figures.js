/* Figures for section 21.3 Radioactive Decay.
   The page binds time, rate-constant, rate, mass and charge. Z, A, N, n:p, counts
   and percents stay ink. Protons, neutrons, electrons, positrons and photons wear
   the particle convention of F.el, atoms their element; a nuclide on the chart and
   a nucleus of a sample are told by fill, solid while unstable or undecayed as the
   figure says, never by hue (ch21/COLOR.md). */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['21.3'] = function (root, F) {
const { fmt, C, PAL, alpha, ctl, choice, select, register, cycle, begin, line, arrow, dot, text, topline, axes, curve, hover, readout, labeller, label } = F;
const sim = (id, H) => F.sim(root, id, H);
const TAU = 2 * Math.PI;
const hash = (i, s) => { const x = Math.sin(i * 127.1 + s * 311.7) * 43758.5453; return x - Math.floor(x); };
function rng(seed) { let s = seed >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return (s + 0.5) / 4294967296; }; }
const sig = (x, n) => Number(x.toPrecision(n));
const decOf = (x, n) => Math.max(0, n - 1 - Math.floor(Math.log10(Math.abs(x))));
const fsig = (x, n) => (x === 0 ? '0' : fmt(sig(x, n), decOf(sig(x, n), n)));
const grp = (x, sep) => { const s = String(Math.round(Math.abs(x))).replace(/\B(?=(\d{3})+(?!\d))/g, sep); return (x < 0 ? '−' : '') + s; };
const SUP = { 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
const sup = (n) => String(n).split('').map((ch) => SUP[ch]).join('');
/* a nuclide in the book's notation, mass number over atomic number */
const nucTex = (A, Z, s) => '{}_{' + Z + '}^{' + A + '}\\text{' + s + '}';
const hue = (s) => '\\htmlClass{kv-charge}{' + s + '}';
function disc(ctx, x, y, r, fill, rim = alpha(PAL.ink, 0.45), w = 1.5) {
  ctx.save(); ctx.fillStyle = fill; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill();
  if (rim) { ctx.strokeStyle = rim; ctx.lineWidth = w; ctx.stroke(); }
  ctx.restore();
}
const nucleon = (ctx, x, y, isP, r = 13) => disc(ctx, x, y, r, F.el(isP ? 'p+' : 'n0'), alpha(PAL.ink, 0.4));
/* an α particle: two protons and two neutrons */
function alphaParticle(ctx, x, y, r = 11) {
  const o = r * 0.88;
  [[-1, -1, true], [1, -1, false], [-1, 1, false], [1, 1, true]].forEach(([i, j, p]) => nucleon(ctx, x + i * o, y + j * o, p, r));
}
/* a photon: a wave packet of length len ending in its head at (hx, hy), moving along u */
function photon(ctx, hx, hy, u, len = 60, amp = 6, wl = 16) {
  const col = F.el('gamma'), nx = -u[1], ny = u[0];
  ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.lineCap = 'round'; ctx.beginPath();
  for (let k = 0; k <= 40; k++) {
    const s = -len + (len - 12) * (k / 40), w = amp * Math.sin((s / wl) * TAU);
    const x = hx + u[0] * s + nx * w, y = hy + u[1] * s + ny * w;
    if (k) ctx.lineTo(x, y); else ctx.moveTo(x, y);
  }
  ctx.stroke(); ctx.restore();
  arrow(ctx, hx - u[0] * 14, hy - u[1] * 14, hx, hy, col, 3);
}
function ring(ctx, x, y, r, color, w = 2.5, dash) {
  ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = w; if (dash) ctx.setLineDash(dash);
  ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.stroke(); ctx.restore();
}

/* =====================================================================
   FIGURE 21.6 · sim-rays-field · moving · 2D on a locked view (rule 28.2)
   The book's bench in its own perspective: the lead block with its bore,
   the two plates, the photographic plate, in logical units of the scene.
   A particle leaves the bore at x = −420 and runs at constant speed along x;
   between the plates (x from −160 to 120) it falls along a parabola, then
   flies straight to the plate at x = 560, so its height there is
   k(L² + 2LD) with L = 280 and D = 440. β lands at 150 and α at −43, the
   3.5 : 1 ratio of a 1-MeV β particle's deflection to a 4.7-MeV α
   particle's in one field; γ goes straight. The plates' state is a choice;
   a change bends every path over 0.9 s while the particles keep flying.
===================================================================== */
(function () {
  const H = 560, X0 = -540, XB = -420, XP1 = -160, XP2 = 120, XS = 560, L = XP2 - XP1, D = XS - XP2;
  const AT = { a: -43, b: 150, g: 0 };                           /* landing heights with the positive plate above */
  const SPEED = { a: 230, b: 520, g: 640 }, RATE = { a: 3.2, b: 4, g: 3.6 };
  const V = F.view({ yaw: 0.2, pitch: 0.3, dist: 2600, cx: 690, cy: 318 }), SC = 0.84;
  const P = (x, y, z = 0) => V.P([x * SC, y * SC, z * SC]);
  const PL = (y, w) => P(XS - w * 0.64, y, w * 0.77);   /* a point of the photographic plate, turned 40° toward the viewer */
  const d = sim('sim-rays-field', H);
  const SIGN = { off: 0, up: 1, down: -1 };
  const plates = choice(d.controls, {
    label: '\\text{plates}', aria: 'how the plates are charged', value: 'up',
    options: [{ value: 'off', label: 'uncharged' }, { value: 'up', label: '+ above' }, { value: 'down', label: '+ below' }],
    onInput: () => { hits0.a = hits0.b = hits0.g = 0; },
  });
  const cy = cycle(() => Infinity, 0);
  const ro = readout(d);
  let hits = [];
  hover(d.stage, () => hits);
  const flights = [], debt = { a: 0, b: 0, g: 0 }, hits0 = { a: 0, b: 0, g: 0 };
  /* the height of beam k at x, for a sign s of the plates (blended while they change) */
  function yAt(k, x, s) {
    const kk = (AT[k] * s) / (L * L + 2 * L * D);
    if (x <= XP1) return 0;
    if (x <= XP2) return kk * (x - XP1) ** 2;
    return kk * (L * L + 2 * L * (x - XP2));
  }
  function step(dt) {
    ['a', 'b', 'g'].forEach((k) => {
      debt[k] += RATE[k] * dt;
      while (debt[k] >= 1) { debt[k] -= 1; flights.push({ k, x: X0 - Math.random() * 40, z: (Math.random() - 0.5) * 14 }); }
    });
    for (let i = flights.length - 1; i >= 0; i--) {
      const f = flights[i]; f.x += SPEED[f.k] * dt;
      if (f.x >= XS) { flights.splice(i, 1); hits0[f.k] = Math.min(40, hits0[f.k] + 1); }
    }
  }
  /* a box from its two opposite corners, the faces the viewer sees, shaded */
  function box(ctx, [x0, y0, z0], [x1, y1, z1], fill, edge = 1.5) {
    const c = (x, y, z) => P(x, y, z);
    const faces = [
      [[x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1], [0, 0, 1]],
      [[x0, y1, z0], [x1, y1, z0], [x1, y1, z1], [x0, y1, z1], [0, 1, 0]],
      [[x1, y0, z0], [x1, y1, z0], [x1, y1, z1], [x1, y0, z1], [1, 0, 0]],
      [[x0, y0, z0], [x0, y1, z0], [x0, y1, z1], [x0, y0, z1], [-1, 0, 0]],
    ];
    const eye = [2600 * Math.sin(0.2) * Math.cos(0.3) / SC, 2600 * Math.sin(0.3) / SC, 2600 * Math.cos(0.2) * Math.cos(0.3) / SC];
    faces.forEach((f) => {
      const n = f[4], p = f[0], toEye = [eye[0] - p[0], eye[1] - p[1], eye[2] - p[2]];
      if (n[0] * toEye[0] + n[1] * toEye[1] + n[2] * toEye[2] <= 0) return;
      const pts = f.slice(0, 4).map((q) => c(...q));
      ctx.save(); ctx.beginPath(); pts.forEach((q, i) => (i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1]))); ctx.closePath();
      ctx.fillStyle = fill; ctx.fill(); ctx.fillStyle = alpha(PAL.ink, V.shade(n)); ctx.fill();
      ctx.strokeStyle = alpha(PAL.ink, 0.7); ctx.lineWidth = edge; ctx.lineJoin = 'round'; ctx.stroke(); ctx.restore();
    });
  }
  function draw() {
    const { ctx } = begin(d.c);
    const s = plates.mix((v) => SIGN[v]), st = plates.value, CQ = C('charge');
    hits = [];
    const head = {
      up: 'With the positive plate above, β particles bend up toward it, α particles bend down toward the negative plate, and γ rays pass straight through.',
      down: 'With the positive plate below, β particles bend down toward it, α particles bend up toward the negative plate, and γ rays pass straight through.',
      off: 'Between uncharged plates all three kinds of radiation travel straight to the same spot.',
    }[st];
    const lab = labeller(ctx, H, { headline: topline(ctx, head) });

    /* the lead block, its bore dashed through it, and the radium at the bottom of the bore */
    box(ctx, [-640, -95, -95], [-420, 95, 95], F.el('Pb'));
    const b0 = P(X0, 0, 0), b1 = P(XB, 0, 0);
    line(ctx, b0[0], b0[1], b1[0], b1[1], alpha(PAL.panel, 0.85), 3, [8, 7]);
    disc(ctx, b0[0], b0[1], 10, F.el('Ra'), PAL.panel, 2);
    hits.push({ x: b0[0], y: b0[1], r: 16, name: 'radium, the radioactive substance, at the bottom of a bore in the lead block' });
    const bc = P(-530, 95, 0);
    hits.push({ x: bc[0], y: bc[1] + 60, r: 70, name: 'lead block, which absorbs the radiation that does not leave through the bore' });
    lab.add('lead block', bc[0], bc[1] - 10, 0, -1, PAL.ink, 22, 30);

    /* the plates: the lower first, the beams between them, the upper over them */
    const plate = (y) => box(ctx, [XP1, y - 5, -85], [XP2, y + 5, 85], PAL.soft, 1.5);
    plate(-75);
    const stemB = P(-20, -80, 0), stemT = P(-20, 80, 0);
    line(ctx, stemB[0], stemB[1], stemB[0], stemB[1] + 60, PAL.ink, 4);

    /* each beam's path, faint, as it is bent now */
    ['a', 'b', 'g'].forEach((k) => {
      ctx.save(); ctx.strokeStyle = alpha(PAL.ink, 0.24); ctx.lineWidth = 2.5; ctx.beginPath();
      for (let x = XB; x <= XS; x += 10) { const q = P(x, yAt(k, x, s)); if (x === XB) ctx.moveTo(q[0], q[1]); else ctx.lineTo(q[0], q[1]); }
      ctx.stroke(); ctx.restore();
    });
    /* the particles in flight, behind the photographic plate's face only where they have not reached it */
    const seen = { a: false, b: false, g: false };
    flights.forEach((f) => {
      if (f.x < XB) return;
      const y = yAt(f.k, f.x, s), q = P(f.x, y, f.z);
      if (f.k === 'a') alphaParticle(ctx, q[0], q[1], 5.5);
      else if (f.k === 'b') disc(ctx, q[0], q[1], 6.5, F.el('e-'), alpha(PAL.ink, 0.5));
      else { const q2 = P(f.x - 20, yAt('g', f.x - 20, s), f.z), L2 = Math.hypot(q[0] - q2[0], q[1] - q2[1]) || 1; photon(ctx, q[0], q[1], [(q[0] - q2[0]) / L2, (q[1] - q2[1]) / L2], 40, 4, 12); }
      if (!seen[f.k] && f.x > XP2) {
        seen[f.k] = true;
        hits.push({ x: q[0], y: q[1], r: 14, name: { a: 'an α particle, a helium nucleus: charge 2+, mass 4 u', b: 'a β particle, an electron: charge 1−, mass 0.00055 u', g: 'a γ ray, a photon: no charge and no mass' }[f.k] });
      }
    });
    plate(75);
    line(ctx, stemT[0], stemT[1] - 8, stemT[0], stemT[1] - 66, PAL.ink, 4);
    if (st !== 'off') {
      const top = st === 'up' ? '+' : '−', bot = st === 'up' ? '−' : '+';
      text(ctx, top, stemT[0] + 26, stemT[1] - 52, CQ, { size: 30, weight: 600, align: 'left' });
      text(ctx, bot, stemB[0] + 26, stemB[1] + 46, CQ, { size: 30, weight: 600, align: 'left' });
    }
    const pm = P((XP1 + XP2) / 2, -80, 85);
    hits.push({ x: pm[0], y: pm[1], r: 60, name: st === 'off' ? 'two uncharged metal plates: no field between them' : 'two charged metal plates, the field between them pointing from + to −' });
    hits.push({ x: P((XP1 + XP2) / 2, 80, 85)[0], y: P((XP1 + XP2) / 2, 80, 85)[1], r: 60, name: st === 'off' ? 'an uncharged metal plate' : 'the plate charged ' + (st === 'up' ? 'positive' : 'negative') });
    const pl = P(XP1, -80, 85);
    lab.add(st === 'off' ? 'uncharged plates' : 'charged plates', pl[0], pl[1], -0.8, 0.6, PAL.ink, 22, 24);

    /* the photographic plate: a thin sheet the viewer sees from the source's side, darkened where each beam lands */
    const sheet = [PL(-210, -130), PL(210, -130), PL(210, 130), PL(-210, 130)];
    ctx.save(); ctx.beginPath(); sheet.forEach((q, i) => (i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1]))); ctx.closePath();
    ctx.fillStyle = alpha(PAL.soft, 0.8); ctx.fill(); ctx.strokeStyle = alpha(PAL.ink, 0.7); ctx.lineWidth = 2; ctx.stroke(); ctx.restore();
    const back = [P(XS - 130 * 0.64 + 8, -210, 130 * 0.77 + 6), P(XS - 130 * 0.64 + 8, 210, 130 * 0.77 + 6)];
    line(ctx, sheet[3][0], sheet[3][1], back[0][0], back[0][1], alpha(PAL.ink, 0.7), 2);
    line(ctx, sheet[2][0], sheet[2][1], back[1][0], back[1][1], alpha(PAL.ink, 0.7), 2);
    line(ctx, back[0][0], back[0][1], back[1][0], back[1][1], alpha(PAL.ink, 0.7), 2);
    ['a', 'b', 'g'].forEach((k) => {
      const q = P(XS, yAt(k, XS, s), 0), e = F.REDUCED ? 1 : Math.min(1, hits0[k] / 12);
      ctx.save(); ctx.globalAlpha = 0.15 + 0.7 * e; ctx.fillStyle = PAL.ink; ctx.beginPath(); ctx.ellipse(q[0], q[1], 9, 13, 0, 0, TAU); ctx.fill(); ctx.restore();
      hits.push({ x: q[0], y: q[1], r: 16, name: 'the spot the ' + { a: 'α particles', b: 'β particles', g: 'γ rays' }[k] + ' darken on the photographic plate' });
    });
    const sb = PL(-200, 110);
    lab.add('photographic plate', sb[0], sb[1], -0.7, 0.7, PAL.ink, 22, 20);

    /* the three kinds named once, beside their beams just short of the plate */
    const names = { a: 'α', b: 'β', g: 'γ' }, stack = { a: 30, b: -30, g: 0 };
    const side = (k) => (k === 'g' ? -Math.sign(yAt('a', 440, s)) : Math.sign(yAt(k, 440, s)));
    ['a', 'b', 'g'].forEach((k) => {
      const q = P(440, yAt(k, 440, s), 0), flat = Math.abs(s) < 0.5;
      const dy = flat ? -24 + stack[k] : -side(k) * 26;
      text(ctx, names[k], q[0], q[1] + dy, PAL.ink, { size: 24, weight: 600, align: 'center', bg: PAL.panel });
    });
    lab.flush();

    const dir = (k) => {
      if (st === 'off' || k === 'g') return '\\text{straight}';
      const towardPlus = k === 'b', upward = (st === 'up') === towardPlus;
      return '\\text{' + (upward ? 'up' : 'down') + ', toward }' + hue(towardPlus ? '+' : '-');
    };
    ro.set('\\mk{a}{{}_{2}^{4}\\alpha}\\;\\mk{ad}{' + dir('a') + '}\\qquad \\mk{b}{{}_{-1}^{\\;0}\\beta}\\;\\mk{bd}{' + dir('b') + '}\\qquad \\mk{g}{{}_{0}^{0}\\gamma}\\;\\mk{gd}{' + dir('g') + '}', undefined, { form: st });
  }
  register(d.fig, { update: (dt) => { cy.step(dt, () => 1); step(dt); }, draw, arrive: false });
})();

/* =====================================================================
   FIGURE 21.5 + 21.7 · sim-decay-modes · moving · flat (rule 28.1)
   A parent at rest waits 0.8 s and decays; the products fly for 3.7 s (a
   4.5 s loop holding 1.2 s). The nucleus is a packed disc of about
   1.25 A^(2/3) nucleons, its visible face, so its radius grows as A^(1/3);
   protons and neutrons in the proportion Z : N. The nucleon that changes is
   ringed before the decay; the α particle's four are ringed together. In γ
   emission a dashed ring marks the excited nucleus until the γ ray leaves.
   In electron capture an inner-shell electron falls in over 0.65 s before
   the decay, then an outer electron drops into the vacancy and an X-ray
   leaves. Everything at time t follows from t alone.
===================================================================== */
(function () {
  const H = 540, T = 4.5, T0 = 0.8, CX = 430, CY = 300, NS = 16, SP = 29, VA = 110, VL = 150, VG = 170;
  const unit = (x, y) => { const l = Math.hypot(x, y); return [x / l, y / l]; };
  const MODES = {
    a: { label: 'alpha decay', P: [238, 92, 'U', 'uranium'], D: [234, 90, 'Th', 'thorium'] },
    bm: { label: 'beta decay', P: [131, 53, 'I', 'iodine'], D: [131, 54, 'Xe', 'xenon'], u: unit(0.92, -0.4) },
    g: { label: 'gamma emission', P: [60, 27, 'Co', 'cobalt'], D: [60, 27, 'Co', 'cobalt'], u: unit(0.9, -0.44) },
    bp: { label: 'positron emission', P: [15, 8, 'O', 'oxygen'], D: [15, 7, 'N', 'nitrogen'], u: unit(0.92, -0.4) },
    ec: { label: 'electron capture', P: [40, 19, 'K', 'potassium'], D: [40, 18, 'Ar', 'argon'] },
  };
  const d = sim('sim-decay-modes', H);
  const mode = select(d.controls, {
    label: '\\text{decay}', aria: 'the type of radioactive decay',
    options: Object.keys(MODES).map((k) => ({ value: k, label: MODES[k].label })), value: 'a', onInput: () => cy.reset(),
  });
  const cy = cycle(() => T, 1.2);
  const ro = readout(d);
  let hits = [];
  hover(d.stage, () => hits);

  const LATTICE = [];
  for (let j = -12; j <= 12; j++) for (let i = -12; i <= 12; i++) {
    const x = (i + (j & 1) * 0.5) * SP, y = j * SP * 0.866;
    LATTICE.push({ x, y, r: Math.hypot(x, y) + hash(i, j) * 0.5 });
  }
  LATTICE.sort((a, b) => a.r - b.r);
  function nucleus(A, Z, salt) {
    const n = Math.round(1.25 * Math.pow(A, 2 / 3)), pts = LATTICE.slice(0, n).map((p) => ({ x: p.x, y: p.y }));
    const order = pts.map((_, i) => i).sort((i, j) => hash(i, salt) - hash(j, salt));
    const np = Math.round((n * Z) / A);
    order.forEach((i, k) => { pts[i].p = k < np; });
    const R = Math.max(...pts.map((p) => Math.hypot(p.x, p.y))) + NS;
    return { pts, R };
  }
  const head = (ctx, x, y, u, gap) => arrow(ctx, x + u[0] * gap, y + u[1] * gap, x + u[0] * (gap + 30), y + u[1] * (gap + 30), alpha(PAL.ink, 0.55), 3);
  const name = (n) => n[3] + '-' + n[0];
  const NP = (n) => (n[0] - n[1]) + '/' + n[1] + ' = ' + fmt((n[0] - n[1]) / n[1], 2);

  function draw() {
    const { ctx } = begin(d.c);
    const m = mode.value, M = MODES[m], t = cy.now(), dt = Math.max(0, t - T0), after = t >= T0;
    const [Ap, Zp, sp] = M.P, [Ad, Zd, sd] = M.D;
    hits = [];
    topline(ctx, {
      a: 'Uranium-238 emits an α particle, two protons and two neutrons, and becomes thorium-234.',
      bm: 'A neutron in iodine-131 becomes a proton as the nucleus emits a β particle, and xenon-131 remains.',
      g: 'Excited cobalt-60 emits a γ ray and settles into its ground state, still cobalt-60.',
      bp: 'A proton in oxygen-15 becomes a neutron as the nucleus emits a positron, and nitrogen-15 remains.',
      ec: 'Potassium-40 captures an inner electron, a proton becomes a neutron, and argon-40 remains; an outer electron fills the vacancy and an X-ray leaves.',
    }[m]);
    ctx.save(); ctx.beginPath(); ctx.rect(20, 96, 1010, H - 106); ctx.clip();
    let R;
    if (m === 'a') {
      const Dn = nucleus(Ad, Zd, 3); R = Dn.R;
      const nx = CX - ((VA * 4.0026) / 234.04) * dt;
      Dn.pts.forEach((p) => nucleon(ctx, nx + p.x, CY + p.y, p.p));
      const ax = CX + Dn.R - 2 + VA * dt;
      alphaParticle(ctx, ax, CY, NS);
      if (!after) ring(ctx, ax, CY, NS * 2.3, PAL.ink, 2.5);
      else head(ctx, ax, CY, [1, 0], 30);
      hits.push({ x: ax, y: CY, r: 24, name: after ? 'the α particle, a helium-4 nucleus: two protons and two neutrons' : 'the two protons and two neutrons that will leave as an α particle' });
    } else {
      const Pn = nucleus(Ap, Zp, m === 'g' ? 7 : m === 'bp' ? 2 : 5); R = Pn.R;
      let flip = -1;
      if (m === 'bm') flip = Pn.pts.findIndex((p, i) => !p.p && i > Pn.pts.length * 0.3);
      if (m === 'bp' || m === 'ec') flip = Pn.pts.findIndex((p, i) => p.p && (i > Pn.pts.length * 0.3 || Pn.pts.length < 10));
      Pn.pts.forEach((p, i) => nucleon(ctx, CX + p.x, CY + p.y, i === flip && after ? !p.p : p.p));
      if (flip >= 0) {
        const f = Pn.pts[flip];
        if (!after) ring(ctx, CX + f.x, CY + f.y, NS + 4, PAL.ink, 2.5);
        else if (dt < 0.6) { ctx.save(); ctx.globalAlpha = 1 - dt / 0.6; ring(ctx, CX + f.x, CY + f.y, NS + 4 + 18 * dt, PAL.ink, 2.5); ctx.restore(); }
        hits.push({ x: CX + f.x, y: CY + f.y, r: 14, name: (after ? 'the nucleon that changed: now a ' : 'the nucleon that changes: a ') + ((m === 'bm') === after ? 'proton' : 'neutron') });
      }
      if (m === 'g' && !after) ring(ctx, CX, CY, R + 8, PAL.ink, 2.5, [8, 7]);
      if (m === 'bm' || m === 'bp') {
        const s = R + 12 + VL * dt, ex = CX + M.u[0] * s, ey = CY + M.u[1] * s;
        if (after) {
          disc(ctx, ex, ey, 8, F.el(m === 'bm' ? 'e-' : 'e+'), alpha(PAL.ink, 0.5));
          head(ctx, ex, ey, M.u, 13);
          hits.push({ x: ex, y: ey, r: 16, name: m === 'bm' ? 'the β particle, an electron made in the nucleus' : 'the positron, made in the nucleus' });
        }
      }
      if (m === 'g' && after) {
        const s = R + 14 + VG * dt, hx = CX + M.u[0] * s, hy = CY + M.u[1] * s;
        photon(ctx, hx, hy, M.u, Math.min(64, 14 + VG * dt));
        hits.push({ x: hx, y: hy, r: 18, name: 'the γ ray, a quantum of high-energy electromagnetic radiation' });
      }
      if (m === 'ec') {
        const R1 = 140, R2 = 220;
        ring(ctx, CX, CY, R1, alpha(PAL.ink, 0.35), 2, [6, 8]);
        ring(ctx, CX, CY, R2, alpha(PAL.ink, 0.35), 2, [6, 8]);
        hits.push({ x: CX - R1 * 0.71, y: CY + R1 * 0.71, r: 14, name: 'an inner electron shell' });
        hits.push({ x: CX - R2 * 0.71, y: CY + R2 * 0.71, r: 14, name: 'an outer electron shell' });
        const a1 = -2.3, k = Math.min(1, Math.max(0, (t - 0.15) / (T0 - 0.15))), rr = R1 - (R1 - R + 6) * F.ease.smooth(k);
        disc(ctx, CX + R1, CY, 8, F.el('e-'), alpha(PAL.ink, 0.5));
        if (!after) {
          disc(ctx, CX + rr * Math.cos(a1), CY + rr * Math.sin(a1), 8, F.el('e-'), alpha(PAL.ink, 0.5));
          hits.push({ x: CX + rr * Math.cos(a1), y: CY + rr * Math.sin(a1), r: 14, name: 'the inner electron the nucleus captures' });
        }
        /* an outer electron drops into the vacancy, then the X-ray leaves from there */
        const a2 = -2.0, kd = F.ease.smooth(Math.min(1, Math.max(0, (dt - 0.2) / 0.7))), ro2 = R2 - (R2 - R1) * kd;
        const ang = a2 + (a1 - a2) * kd, exx = CX + ro2 * Math.cos(ang), eyy = CY + ro2 * Math.sin(ang);
        disc(ctx, exx, eyy, 8, F.el('e-'), alpha(PAL.ink, 0.5));
        hits.push({ x: exx, y: eyy, r: 14, name: kd < 1 ? 'an outer electron, which drops into the vacancy' : 'the electron that filled the vacancy' });
        if (dt > 0.9) {
          const u = unit(-1, -0.22), s = 14 + VG * (dt - 0.9), hx = CX + R1 * Math.cos(a1) + u[0] * s, hy = CY + R1 * Math.sin(a1) + u[1] * s;
          photon(ctx, hx, hy, u, Math.min(56, s), 5, 13);
          hits.push({ x: hx, y: hy, r: 18, name: 'the X-ray emitted as the outer electron drops into the vacancy' });
        }
      }
    }
    ctx.restore();

    const isParent = !after;
    const nm = isParent ? (m === 'g' ? 'excited cobalt-60' : 'parent ' + name(M.P)) : (m === 'g' ? 'cobalt-60, ground state' : 'daughter ' + name(M.D));
    text(ctx, nm, CX, Math.min(H - 24, CY + R + 38), PAL.ink, { size: 22, weight: 600, align: 'center', bg: PAL.panel });
    hits.push({ x: CX, y: CY, r: R, name: (isParent ? name(M.P) : name(M.D)) + ' nucleus: ' + (isParent ? Zp : Zd) + ' protons, ' + ((isParent ? Ap - Zp : Ad - Zd)) + ' neutrons' });

    /* legend: the kinds this mode draws */
    const LX = 1080, rows = [['p+', 'proton'], ['n0', 'neutron']];
    if (m === 'a') rows.push(['alpha', 'α particle']);
    if (m === 'bm') rows.push(['e-', 'β particle (electron)']);
    if (m === 'bp') rows.push(['e+', 'positron']);
    if (m === 'g') rows.push(['gamma', 'γ ray']);
    if (m === 'ec') rows.push(['e-', 'electron'], ['gamma', 'X-ray']);
    rows.forEach(([k, s], i) => {
      const y = 140 + i * 40, gx = LX + 14;
      if (k === 'p+' || k === 'n0') nucleon(ctx, gx, y, k === 'p+', 12);
      else if (k === 'alpha') alphaParticle(ctx, gx, y, 6);
      else if (k === 'gamma') photon(ctx, gx + 22, y, [1, 0], 42, 5, 12);
      else disc(ctx, gx, y, 8, F.el(k), alpha(PAL.ink, 0.5));
      text(ctx, s, LX + 50, y, PAL.ink, { size: 19 });
    });

    const P0 = nucTex(Ap, Zp, sp + (m === 'g' ? '*' : '')), D0 = nucTex(Ad, Zd, sd);
    const tex = {
      a: '\\mk{p}{' + P0 + '}\\longrightarrow\\mk{x}{' + nucTex(4, 2, 'He') + '}+\\mk{d}{' + D0 + '}',
      bm: '\\mk{p}{' + P0 + '}\\longrightarrow\\mk{x}{{}_{-1}^{\\;0}\\text{e}}+\\mk{d}{' + D0 + '}',
      g: '\\mk{p}{' + P0 + '}\\longrightarrow\\mk{x}{{}_{0}^{0}\\gamma}+\\mk{d}{' + D0 + '}',
      bp: '\\mk{p}{' + P0 + '}\\longrightarrow\\mk{x}{{}_{+1}^{\\;0}\\text{e}}+\\mk{d}{' + D0 + '}',
      ec: '\\mk{p}{' + P0 + '}+\\mk{x}{{}_{-1}^{\\;0}\\text{e}}\\longrightarrow\\mk{d}{' + D0 + '}',
    }[m];
    const note = m === 'g' ? 'A and Z do not change, so n:p stays ' + NP(M.P) + '.'
      : 'n:p ' + ((Ad - Zd) / Zd > (Ap - Zp) / Zp ? 'rises' : 'falls') + ' from ' + NP(M.P) + ' to ' + NP(M.D) + '.';
    ro.set(tex, note, { form: m });
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();

/* =====================================================================
   FIGURE 21.9 · sim-decay-series · still · flat (rule 28.1)
   The uranium-238 series on the book's axes, the number of neutrons across
   (122 to 148) and the atomic number up (80 to 93, a unit of headroom over
   uranium). One step is chosen: the steps before it solid, it thick, the
   steps after it faint. α arrows in ink, β arrows in F.cat(1).
===================================================================== */
(function () {
  const H = 640;
  const NUC = [
    [92, 146, 'U', 'uranium'], [90, 144, 'Th', 'thorium'], [91, 143, 'Pa', 'protactinium'], [92, 142, 'U', 'uranium'],
    [90, 140, 'Th', 'thorium'], [88, 138, 'Ra', 'radium'], [86, 136, 'Rn', 'radon'], [84, 134, 'Po', 'polonium'],
    [82, 132, 'Pb', 'lead'], [83, 131, 'Bi', 'bismuth'], [84, 130, 'Po', 'polonium'], [82, 128, 'Pb', 'lead'],
    [83, 127, 'Bi', 'bismuth'], [84, 126, 'Po', 'polonium'], [82, 124, 'Pb', 'lead'],
  ];
  const A = (k) => NUC[k][0] + NUC[k][1];
  const short = (k) => sup(A(k)) + NUC[k][2];
  const long = (k) => NUC[k][3] + '-' + A(k);
  const isAlpha = (i) => NUC[i + 1][0] === NUC[i][0] - 2;
  const d = sim('sim-decay-series', H);
  const pick = select(d.controls, {
    label: '\\text{step}', aria: 'the step of the series',
    options: NUC.slice(0, 14).map((_, i) => ({ value: String(i), label: (i + 1) + ': ' + short(i) + ' → ' + short(i + 1) + (isAlpha(i) ? ' (α)' : ' (β)') })),
    value: '0',
  });
  const ro = readout(d);
  let hits = [];
  hover(d.stage, () => hits);
  const BOX = { l: 130, r: 960, t: 110, b: 560 };

  function draw() {
    const { ctx } = begin(d.c);
    const k = +pick.value || 0, al = isAlpha(k), CA = PAL.ink, CB = F.cat(1);
    hits = [];
    const lab = labeller(ctx, H, { headline: topline(ctx, 'Step ' + (k + 1) + ': ' + long(k) + ' emits ' + (al ? 'an α particle' : 'a β particle') + ' and becomes ' + long(k + 1) + '.') });
    const { X, Y } = axes(ctx, BOX, [122, 148], [80, 93], {
      nx: 13, ny: 13, fx: (v) => String(Math.round(v)), fy: (v) => (v === 93 ? '' : String(Math.round(v))),
      xl: 'number of neutrons (n)', yl: 'atomic number (Z)',
    });
    const P = (i) => ({ x: X(NUC[i][1]), y: Y(NUC[i][0]) });
    for (let i = 0; i < 14; i++) {
      const a = P(i), b = P(i + 1), L = Math.hypot(b.x - a.x, b.y - a.y), ux = (b.x - a.x) / L, uy = (b.y - a.y) / L;
      const col = isAlpha(i) ? CA : CB, now = i === k, done = i < k;
      arrow(ctx, a.x + ux * 12, a.y + uy * 12, b.x - ux * 12, b.y - uy * 12, now ? col : alpha(col, done ? 0.75 : 0.35), now ? 5 : 3);
      hits.push({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2, r: 12, name: 'step ' + (i + 1) + ': ' + (isAlpha(i) ? 'α' : 'β') + ' decay of ' + long(i) + ' to ' + long(i + 1) });
    }
    NUC.forEach((n, i) => {
      const p = P(i), stable = i === 14;
      if (i === k || i === k + 1) dot(ctx, p.x, p.y, PAL.ink, false, 14);
      dot(ctx, p.x, p.y, PAL.ink, stable, 7);
      hits.push({ x: p.x, y: p.y, r: 12, name: long(i) + ': Z = ' + n[0] + ', n = ' + n[1] + ', A = ' + A(i) + (stable ? ', stable' : ', radioactive') });
    });
    const named = [...new Set([k, k + 1, 0, 14])];
    const dirOf = (i) => {
      if (i === k) return al ? [0.6, -0.8] : [0.6, 0.8];
      if (i === k + 1) return al ? [-0.6, 0.8] : [0.5, -0.9];
      return i === 0 ? [0.6, -0.8] : [0.2, 1];
    };
    named.forEach((i) => { const p = P(i), [ux, uy] = dirOf(i); lab.add(short(i), p.x, p.y, ux, uy, PAL.ink, 22, 20); });
    lab.flush();

    const LX = 1020;
    arrow(ctx, LX, 150, LX + 46, 150 + 46, CA, 5);
    text(ctx, 'α decay', LX + 70, 174, PAL.ink, { size: 20 });
    arrow(ctx, LX, 260, LX + 46, 260 - 23, CB, 5);
    text(ctx, 'β decay', LX + 70, 250, PAL.ink, { size: 20 });
    dot(ctx, LX + 22, 320, PAL.ink, true, 7);
    text(ctx, 'stable', LX + 70, 320, PAL.ink, { size: 20 });
    dot(ctx, LX + 22, 362, PAL.ink, false, 7);
    text(ctx, 'radioactive', LX + 70, 362, PAL.ink, { size: 20 });

    const [zp, , sp] = NUC[k], [zd, , sd] = NUC[k + 1];
    const tex = '\\mk{p}{' + nucTex(A(k), zp, sp) + '}\\longrightarrow\\mk{d}{' + nucTex(A(k + 1), zd, sd) + '}+'
      + (al ? '\\mk{x}{' + nucTex(4, 2, 'He') + '}' : '\\mk{x}{{}_{-1}^{\\;0}\\text{e}}');
    let na = 0; for (let i = 0; i <= k; i++) if (isAlpha(i)) na++;
    const nb = k + 1 - na, left = 13 - k;
    ro.set(tex, 'After this step: ' + na + ' α ' + (na === 1 ? 'decay' : 'decays') + ' and ' + nb + ' β ' + (nb === 1 ? 'decay' : 'decays')
      + (left ? '; ' + left + (left === 1 ? ' step remains' : ' steps remain') + ' to lead-206.' : '; lead-206 is stable.'), { form: al });
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 21.10 · sim-half-life · moving · flat (rule 28.1)
   Cobalt-60 with λ = 0.132 y⁻¹ (Example 21.5). Each of 400 nuclei lasts
   −ln(u)/λ years, u uniform, which gives each a fixed chance of decaying in
   each year whatever its age; the clock runs 0 to 26.35 y (five half-lives)
   in 6 s and holds 1.2 s, and each loop draws a fresh sample. Graph: % of
   cobalt-60 remaining 0 to 100 against t from 0 to 26.35 y, fixed, ticks at
   each half-life as the book has them.
===================================================================== */
(function () {
  const H = 600, LAM = 0.132, TH = 5.27, TMAX = 5 * TH, NN = 400, RUN = 6, FLASH = 1.0, M0 = 10;
  const SX = 250, SY = 320, SR = 200;
  const GB = { l: 600, r: 1320, t: 120, b: 500 };
  const d = sim('sim-half-life', H);
  const cy = cycle(() => TMAX, 1.2);
  const ro = readout(d);
  let seed = 1, U = [], sorted = [];
  function draws() { const r = rng(seed * 2654435761); U = Array.from({ length: NN }, () => -Math.log(r()) / LAM); sorted = U.slice().sort((a, b) => a - b); }
  draws();
  const PTS = Array.from({ length: NN }, (_, i) => { const r = SR * 0.95 * Math.sqrt((i + 0.5) / NN), a = i * 2.399963; return [SX + r * Math.cos(a), SY + r * Math.sin(a)]; });
  let hits = [];
  hover(d.stage, () => hits);

  function draw() {
    const { ctx } = begin(d.c);
    const t = cy.now(), TC = C('time'), MC = C('mass');
    const tt = Math.round(t * 10) / 10, f = sig(Math.exp(-LAM * tt), 3);
    let left = 0; for (let i = 0; i < NN; i++) if (U[i] > t) left++;
    const lab = labeller(ctx, H, { headline: topline(ctx, 'After $\\kt = ' + fmt(tt, 1) + '$ y, ' + fmt(tt / TH, 2) + ' half-lives, ' + fmt(100 * f, 1) + '% of the cobalt-60 remains.') });
    hits = [];

    /* the sample */
    ring(ctx, SX, SY, SR, alpha(PAL.ink, 0.6), 2.5);
    ctx.save(); ctx.fillStyle = PAL.ink; ctx.beginPath();
    PTS.forEach(([x, y], i) => { if (U[i] > t) { ctx.moveTo(x + 6.5, y); ctx.arc(x, y, 6.5, 0, TAU); } });
    ctx.fill();
    ctx.strokeStyle = alpha(PAL.ink, 0.4); ctx.lineWidth = 1.5; ctx.beginPath();
    PTS.forEach(([x, y], i) => { if (U[i] <= t) { ctx.moveTo(x + 6, y); ctx.arc(x, y, 6, 0, TAU); } });
    ctx.stroke();
    PTS.forEach(([x, y], i) => {
      const k = (t - U[i]) / FLASH; if (k < 0 || k >= 1) return;
      ctx.strokeStyle = alpha(PAL.ink, 0.8 * (1 - k)); ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x, y, 6 + 14 * k, 0, TAU); ctx.stroke();
    });
    ctx.restore();
    hits.push({ x: SX, y: SY, r: SR, name: 'the sample: ' + left + ' of its ' + NN + ' cobalt-60 nuclei have not yet decayed' });
    const LY = SY + SR + 40;
    dot(ctx, SX - 170, LY, PAL.ink, true, 7);
    text(ctx, 'cobalt-60', SX - 150, LY, PAL.ink, { size: 19 });
    ring(ctx, SX + 30, LY, 7, alpha(PAL.ink, 0.5), 2);
    text(ctx, 'nickel-60', SX + 50, LY, PAL.ink, { size: 19 });

    /* the graph */
    const { X, Y } = axes(ctx, GB, [0, TMAX], [0, 100], {
      nx: 5, ny: 8, xl: 't (y)', xc: TC, yl: 'Co-60 remaining (%)',
      fx: (v) => fmt(v, 2), fy: (v) => ([0, 12.5, 25, 50, 75, 100].some((w) => Math.abs(w - v) < 0.01) ? fmt(v, v % 1 ? 1 : 0) : ''),
    });
    const MASS = ['10 g', '5 g', '2.5 g', '1.25 g', '0.625 g'];
    for (let k = 0; k <= 5; k++) {
      const x = X(k * TH), y = Y(100 * Math.exp(-LAM * k * TH));
      if (k) line(ctx, x, y, x, GB.b, alpha(PAL.ink, 0.35), 2, [4, 8]);
      dot(ctx, x, y, PAL.muted, true, 6);
      if (k < 5) lab.add(MASS[k], x, y, k ? 0.8 : 1, k ? -0.6 : 0.2, MC, 19, 16);
      hits.push({ x, y, r: 12, name: k === 0 ? 'the start: 10 g of cobalt-60' : 'after ' + k + (k === 1 ? ' half-life, ' : ' half-lives, ') + fmt(k * TH, 2) + ' y: ' + fmt(100 * Math.exp(-LAM * k * TH), 1) + '% remains' });
    }
    curve(ctx, (s) => 100 * Math.exp(-LAM * s), 0, TMAX, X, Y, PAL.ink, 5, 200);
    ctx.save(); ctx.strokeStyle = alpha(PAL.muted, 0.9); ctx.lineWidth = 2; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(X(0), Y(100));
    let n = NN;
    for (const u of sorted) { if (u > t) break; ctx.lineTo(X(u), Y((100 * n) / NN)); n--; ctx.lineTo(X(u), Y((100 * n) / NN)); }
    ctx.lineTo(X(t), Y((100 * n) / NN)); ctx.stroke(); ctx.restore();
    dot(ctx, X(t), Y(100 * Math.exp(-LAM * t)), PAL.ink, true, 9);
    hits.push({ x: X(t), y: Y((100 * left) / NN), r: 12, name: 'this sample: ' + left + ' of ' + NN + ' nuclei, ' + fmt((100 * left) / NN, 1) + '%' });
    const KX = GB.r - 230, KY = GB.t + 10;
    line(ctx, KX, KY, KX + 40, KY, PAL.ink, 5);
    text(ctx, '$100\\,e^{-\\klamdecay\\kt}$', KX + 54, KY, PAL.ink, { size: 20, tex: true });
    line(ctx, KX, KY + 34, KX + 40, KY + 34, PAL.muted, 2);
    text(ctx, 'this sample', KX + 54, KY + 34, PAL.ink, { size: 19 });
    lab.place({ l: KX - 8, r: GB.r, t: KY - 16, b: KY + 50 });
    lab.flush();

    ro.set('\\frac{N_{t}}{N_{0}}=e^{-\\klamdecay\\kt}=e^{-(0.132\\;\\text{y}^{-1})(' + fmt(tt, 1) + '\\;\\text{y})}=' + fsig(f, 3),
      'Of ' + fmt(M0, 1) + ' g of cobalt-60, $\\km = ' + fsig(M0 * f, 3) + '$ g remains.');
  }
  register(d.fig, {
    update: (dt) => { const was = cy.now(); cy.step(dt, () => TMAX / RUN); if (cy.now() < was) { seed++; draws(); } },
    draw,
  });
})();

/* =====================================================================
   FIGURE 21.11 · sim-carbon-dating · moving · flat (rule 28.1)
   Years run from −5000 (alive) to 25 000 after death in 7 s and hold 1.2 s.
   While the tree lives, CO₂ drifts into it and every carbon-14 atom that
   decays is replaced 1500 y later, so the count holds; at death the intake
   stops and each of the 48 carbon-14 atoms becomes nitrogen-14 at −ln(u)/λ
   years, λ = 1.21 × 10⁻⁴ y⁻¹ (Example 21.6). The slider is the decay rate
   measured now; the readout and the graph's crossing give the age from it.
   Graph: decay rate 0 to 15 dis/min/g C against t from −5000 to 25 000 y.
===================================================================== */
(function () {
  const H = 620, LAM = 1.21e-4, R0 = 13.6, TA = -5000, TB = 25000, RUN = 7, NA = 48, REFILL = 1500, FLASH = 500;
  const GB = { l: 700, r: 1320, t: 130, b: 470 };
  const BX = { l: 300, r: 540, t: 210, b: 450 };
  const d = sim('sim-carbon-dating', H);
  const RT = ctl(d.controls, {
    label: '\\krate_{t}', cls: 'rate', min: 1, max: 13.6, step: 0.01, value: 10.8, unit: 'dis/min/g', dec: 2,
    detents: [{ v: 9.07, label: 'King Tut' }], specials: [{ at: R0 / 2, label: 'one half-life' }], aria: 'the decay rate measured in the sample now, in disintegrations per minute per gram of carbon',
  });
  const cy = cycle(() => TB - TA, 1.2);
  const ro = readout(d);
  let seed = 3, LIFE = [], EVENTS = [];
  function draws() {
    const r = rng(seed * 2246822519);
    LIFE = Array.from({ length: NA }, () => -Math.log(r()) / LAM);
    EVENTS = Array.from({ length: NA }, () => { const ev = []; let s = TA - Math.log(r()) / LAM; while (s < -REFILL) { ev.push(s); s += REFILL - Math.log(r()) / LAM; } return ev; });
  }
  draws();
  const CELL = (i) => { const c = i % 6, rr = Math.floor(i / 6); return [BX.l + 24 + c * 38.4, BX.t + 22 + rr * 28.6]; };
  const rateAt = (s) => (s < 0 ? R0 : R0 * Math.exp(-LAM * s));
  let hits = [];
  hover(d.stage, () => hits);
  function co2(ctx, x, y) {
    disc(ctx, x - 12, y, 6, F.el('O'), alpha(PAL.ink, 0.4), 1);
    disc(ctx, x + 12, y, 6, F.el('O'), alpha(PAL.ink, 0.4), 1);
    disc(ctx, x, y, 7, F.el('C'), alpha(PAL.ink, 0.4), 1);
  }

  function draw() {
    const { ctx } = begin(d.c);
    const tau = TA + cy.now(), Rm = RT.v, TC = C('time'), RC = C('rate');
    const age = sig(-Math.log(sig(Rm, 3) / R0) / LAM, 3);
    const live = Math.max(0, Math.min(1, -tau / 600 + 1)), crown = Math.max(0, Math.min(1, 1 - tau / 1500));
    const lab = labeller(ctx, H, { headline: topline(ctx, 'Carbon giving ' + fsig(Rm, 3) + ' disintegrations per minute per gram, against 13.6 when it was alive, is about ' + grp(age, ',') + ' years old.') });
    hits = [];

    /* the ground and the tree, leafless once dead */
    line(ctx, 30, 520, 280, 520, alpha(PAL.ink, 0.6), 3);
    const TXc = 150;
    ctx.save(); ctx.fillStyle = PAL.soft; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2.5; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.moveTo(TXc - 18, 520); ctx.lineTo(TXc - 9, 360); ctx.lineTo(TXc - 50, 290); ctx.lineTo(TXc - 42, 284); ctx.lineTo(TXc - 2, 340);
    ctx.lineTo(TXc + 2, 270); ctx.lineTo(TXc + 10, 270); ctx.lineTo(TXc + 9, 330); ctx.lineTo(TXc + 52, 278); ctx.lineTo(TXc + 58, 286); ctx.lineTo(TXc + 10, 368); ctx.lineTo(TXc + 18, 520); ctx.closePath();
    ctx.fill(); ctx.stroke(); ctx.restore();
    if (crown > 0) {
      ctx.save(); ctx.globalAlpha = crown;
      const LOBES = [[0, -50, 86], [-62, 0, 60], [62, 4, 60], [-34, 34, 52], [36, 38, 52]];
      LOBES.forEach(([dx, dy, r]) => ring(ctx, TXc + dx, 280 + dy, r, PAL.ink, 5));
      LOBES.forEach(([dx, dy, r]) => disc(ctx, TXc + dx, 280 + dy, r, PAL.soft, null));
      ctx.restore();
    }
    hits.push({ x: TXc, y: 300, r: 110, name: tau < 0 ? 'a living tree, taking in carbon from the CO₂ of the air' : 'the dead tree, which takes in no more carbon' });

    /* CO₂ drifting from the air into the living tree */
    if (live > 0) {
      ctx.save(); ctx.globalAlpha = live;
      for (let i = 0; i < 6; i++) {
        const ph = (((tau - TA) / 1100 + i / 6) % 1 + 1) % 1, x = 70 + i * 32 + 30 * Math.sin(i * 1.7), y = 100 + ph * 150;
        ctx.globalAlpha = live * Math.min(1, ph * 5, (1 - ph) * 5);
        co2(ctx, x, y);
      }
      ctx.globalAlpha = live;
      text(ctx, 'CO₂ from the air', 250, 130, PAL.ink, { size: 19, align: 'left', bg: PAL.panel });
      ctx.restore();
    }

    /* the sample's carbon-14, magnified */
    ctx.save(); ctx.strokeStyle = alpha(PAL.ink, 0.6); ctx.lineWidth = 2; ctx.strokeRect(BX.l, BX.t, BX.r - BX.l, BX.b - BX.t); ctx.restore();
    line(ctx, TXc + 14, 430, BX.l, BX.b - 30, alpha(PAL.ink, 0.35), 2, [4, 8]);
    text(ctx, 'its carbon-14, magnified', (BX.l + BX.r) / 2, BX.t - 20, PAL.ink, { size: 19, align: 'center' });
    let left = 0;
    for (let i = 0; i < NA; i++) {
      const [x, y] = CELL(i);
      let isN, at = null;
      if (tau >= 0) { isN = LIFE[i] <= tau; if (isN) at = LIFE[i]; }
      else { const e = EVENTS[i].find((s) => tau >= s && tau < s + REFILL); isN = e !== undefined; if (isN) at = e; }
      if (!isN) left++;
      disc(ctx, x, y, 10, F.el(isN ? 'N' : 'C'), alpha(PAL.ink, 0.45));
      if (at !== null && tau - at < FLASH) ring(ctx, x, y, 10 + 16 * ((tau - at) / FLASH), alpha(PAL.ink, 0.8 * (1 - (tau - at) / FLASH)), 2);
    }
    hits.push({ x: (BX.l + BX.r) / 2, y: (BX.t + BX.b) / 2, r: 110, name: 'carbon-14 atoms of the sample, drawn alone: ' + left + ' of ' + NA + ' left' });
    const LY = BX.b + 34;
    disc(ctx, BX.l + 10, LY, 9, F.el('C'), alpha(PAL.ink, 0.45));
    text(ctx, 'carbon-14', BX.l + 26, LY, PAL.ink, { size: 18 });
    disc(ctx, BX.l + 140, LY, 9, F.el('N'), alpha(PAL.ink, 0.45));
    text(ctx, 'nitrogen-14', BX.l + 156, LY, PAL.ink, { size: 18 });

    /* the graph */
    const { X, Y } = axes(ctx, GB, [TA, TB], [0, 15], {
      nx: 6, ny: 3, xl: 't (y)', xc: TC, yl: 'decay rate (dis/min/g C)', yc: RC, fx: (v) => grp(v, ','), fy: (v) => String(Math.round(v)),
    });
    const x0 = X(0);
    line(ctx, x0, GB.t, x0, GB.b, alpha(PAL.ink, 0.4), 2, [10, 10]);
    lab.add('organism dies', x0, GB.t + 4, 1, 0.2, PAL.ink, 18, 10);
    curve(ctx, rateAt, TA, TB, X, Y, PAL.ink, 5, 300);
    const ly = Y(Rm), ax = X(Math.min(TB, age));
    line(ctx, x0, ly, GB.r, ly, alpha(RC, 0.7), 2, [10, 10]);
    line(ctx, ax, ly, ax, GB.b, alpha(PAL.ink, 0.45), 2, [4, 8]);
    dot(ctx, ax, ly, PAL.ink, false, 10);
    lab.place({ l: ax - 12, r: ax + 12, t: ly - 12, b: ly + 12 });
    lab.add(grp(age, ',') + ' y', ax, ly, ax > (GB.l + GB.r) / 2 ? -0.6 : 0.6, -0.8, TC, 19, 18);
    hits.push({ x: ax, y: ly, r: 14, name: 'the measured rate, ' + fsig(Rm, 3) + ' dis/min/g, meets the curve at ' + grp(age, ',') + ' y' });
    const px = X(tau), py = Y(rateAt(tau));
    dot(ctx, px, py, PAL.ink, true, 9);
    hits.push({ x: px, y: py, r: 12, name: (tau < 0 ? 'alive: ' : grp(tau, ',') + ' y after death: ') + fsig(rateAt(tau), 3) + ' dis/min/g' });
    lab.flush();

    ro.set('\\kt=-\\frac{1}{\\klamdecay}\\ln\\left(\\frac{\\krate_{t}}{\\krate_{0}}\\right)=-\\frac{1}{1.21\\times10^{-4}\\;\\text{y}^{-1}}\\ln\\left(\\frac{' + fsig(Rm, 3) + '}{13.6}\\right)=' + grp(age, '{,}') + '\\;\\text{y}',
      'The sample drawn has ' + left + ' of its ' + NA + ' carbon-14 atoms left.');
  }
  register(d.fig, {
    update: (dt) => { const was = cy.now(); cy.step(dt, () => (TB - TA) / RUN); if (cy.now() < was) { seed++; draws(); } },
    draw,
  });
})();
};
