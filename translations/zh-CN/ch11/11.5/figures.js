/* Figures for section 11.5 Colloids. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['11.5'] = function (root, F) {
const { el, tex, PAL, alpha, cycle, register, begin, line, text, topline, hbracket, label } = F;
const sim = (id, H) => F.sim(root, id, H);
function readout(host, main, small, opts) { tex(host, main, false, opts); if (small) host.appendChild(el('small', null, small)); }
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
function ball(ctx, x, y, r, col, edge = 0.5) { ctx.save(); ctx.fillStyle = col; ctx.strokeStyle = alpha(PAL.ink, edge); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore(); }
function bar(ctx, x0, y, per, n, total, col) {
  ctx.save(); ctx.strokeStyle = alpha(PAL.ink, 0.5); ctx.lineWidth = 1.5; ctx.strokeRect(x0, y - 12, per * total, 24);
  ctx.fillStyle = col; ctx.fillRect(x0, y - 12, per * n, 24); ctx.restore();
}

/* =====================================================================
   SIM: the Tyndall effect and settling. A glass seen from the side holds
   saltwater, milk or muddy water, a choice; a green laser beam crosses it
   toward a card. Saltwater's ions are too small to scatter the beam; the
   butterfat droplets of milk scatter it along its whole path and never
   settle; the grains of mud cloud the water, hide the beam, and settle
   over a 6 s clock (minutes, in truth), after which the clear water shows
   no beam. Moving: settling has a time, and every particle jostles.
   LASER_GREEN is the light of a green laser pointer, a physical colour; the
   cloudiness of the mud is a muted tint. Flat: size, settling and the
   beam all read in one plane.
===================================================================== */
(function () {
  const LASER_GREEN = '#22b04a';
  const d = sim('sim-tyndall', 470);
  const GL = { l: 430, r: 970, top: 110, surf: 140, bot: 430 }, BY = 262, CARD = 1070;
  const rnd = (a, b) => a + Math.random() * (b - a);
  const spread = (n, r) => Array.from({ length: n }, () => ({ x: rnd(GL.l + r + 6, GL.r - r - 6), y: rnd(GL.surf + r + 6, GL.bot - r - 6), ph: rnd(0, TAU), w: rnd(1.5, 3) }));
  const MIX = {
    solution: { parts: spread(90, 4).map((p, i) => ({ ...p, r: 4, el: i % 2 ? 'Cl' : 'Na' })), amp: 3 },
    colloid: { parts: spread(26, 11).map((p) => ({ ...p, r: 11 })), amp: 2 },
    suspension: { parts: spread(10, 22).map((p, i) => ({ ...p, r: 22, fall: rnd(2.6, 5.6), fx: GL.l + 34 + i * 52, fy: GL.bot - 23 })), amp: 1 },
  };
  const NAMES = { Na: 'a sodium ion, Na<sup>+</sup>', Cl: 'a chloride ion, Cl<sup>−</sup>', colloid: 'a droplet of butterfat', suspension: 'a grain of mud' };
  const cy = cycle(() => 6, 1.5);
  const M = F.choice(d.controls, { label: '\\text{mixture}', options: [{ value: 'solution', label: 'saltwater' }, { value: 'colloid', label: 'milk' }, { value: 'suspension', label: 'mud' }], value: 'colloid', aria: 'the mixture in the glass', onInput: () => cy.reset() });
  const hits = []; F.hover(d.stage, () => hits);
  let clock = 0;
  const fallen = (p, t) => smooth(clamp01(t / p.fall));
  const colOf = (key, p) => (key === 'solution' ? F.el(p.el) : F.ref(key === 'colloid' ? 'butterfat' : 'mud'));
  function where(key, p, t) {
    const a = MIX[key].amp, jx = a * Math.sin(p.w * clock + p.ph), jy = a * Math.cos(1.3 * p.w * clock + p.ph);
    if (key !== 'suspension') return [p.x + jx, p.y + jy];
    const k = fallen(p, t); return [lerp(p.x, p.fx, k) + jx * (1 - k), lerp(p.y, p.fy, k) + jy * (1 - k)];
  }
  function draw() {
    const { ctx } = begin(d.c); hits.length = 0;
    const t = cy.now(), v = M.value, laser = F.fact(LASER_GREEN);
    const sus = MIX.suspension.parts, settled = sus.reduce((s, p) => s + fallen(p, t), 0) / sus.length;
    /* how cloudy the water is, how much the beam scatters inside it, and how much reaches the card */
    const cloud = M.mix((k) => (k === 'suspension' ? 1 - settled : 0));
    const glow = M.mix((k) => (k === 'colloid' ? 1 : k === 'suspension' ? 0.45 * (1 - settled) : 0));
    const reach = M.mix((k) => (k === 'solution' ? 1 : k === 'colloid' ? 0.55 : 0.08 + 0.92 * settled));
    ctx.save(); ctx.fillStyle = alpha(PAL.muted, 0.08 + 0.6 * cloud); ctx.fillRect(GL.l, GL.surf, GL.r - GL.l, GL.bot - GL.surf); ctx.restore();
    /* the beam: from the laser to the glass, through the liquid, and on to the card */
    line(ctx, 330, BY, GL.l, BY, alpha(laser, 0.35 * reach + 0.15), 4);
    ctx.save();
    const g = ctx.createLinearGradient(GL.l, 0, GL.r, 0);
    g.addColorStop(0, alpha(laser, 0.8 * glow)); g.addColorStop(1, alpha(laser, 0.8 * glow * (0.35 + 0.65 * reach)));
    ctx.strokeStyle = g; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(GL.l, BY); ctx.lineTo(GL.r, BY); ctx.stroke();
    ctx.globalAlpha = 0.25 * glow; ctx.lineWidth = 22; ctx.beginPath(); ctx.moveTo(GL.l, BY); ctx.lineTo(GL.r, BY); ctx.stroke();
    ctx.restore();
    line(ctx, GL.r, BY, CARD, BY, alpha(laser, 0.12 * reach), 3);
    ctx.save(); ctx.fillStyle = alpha(laser, 0.25 + 0.75 * reach); ctx.beginPath(); ctx.arc(CARD - 2, BY, 6 + 8 * reach, 0, TAU); ctx.fill(); ctx.restore();
    for (const key of Object.keys(MIX)) {
      const a = M.a(key); if (a <= 0) continue;
      ctx.save(); ctx.globalAlpha = a;
      for (const p of MIX[key].parts) {
        const [x, y] = where(key, p, t), lit = key !== 'solution' && Math.abs(y - BY) < p.r + 8 ? glow : 0;
        if (lit > 0) { ctx.save(); ctx.fillStyle = alpha(laser, 0.35 * lit); ctx.beginPath(); ctx.arc(x, y, p.r + 6, 0, TAU); ctx.fill(); ctx.restore(); }
        ball(ctx, x, y, p.r, colOf(key, p), key === 'solution' ? 0.3 : 0.5);
        if (a > 0.5) hits.push({ x, y, r: Math.max(p.r, 7), name: key === 'solution' ? NAMES[p.el] : NAMES[key] });
      }
      ctx.restore();
    }
    /* the glass, the laser and the card */
    ctx.save(); ctx.strokeStyle = F.ref('glass'); ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(GL.l, GL.top); ctx.lineTo(GL.l, GL.bot); ctx.lineTo(GL.r, GL.bot); ctx.lineTo(GL.r, GL.top); ctx.stroke(); ctx.restore();
    line(ctx, GL.l, GL.surf, GL.r, GL.surf, alpha(PAL.ink, 0.4), 2);
    ctx.save(); ctx.fillStyle = PAL.muted; ctx.fillRect(210, BY - 22, 120, 44); ctx.restore();
    text(ctx, 'laser', 270, BY + 50, PAL.ink, { size: 20, align: 'center' });
    ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.12); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2; ctx.fillRect(CARD, BY - 90, 16, 180); ctx.strokeRect(CARD, BY - 90, 16, 180); ctx.restore();
    text(ctx, 'card', CARD + 8, BY + 118, PAL.ink, { size: 20, align: 'center' });
    hits.push({ x: 270, y: BY, r: 50, name: 'a green laser' }, { x: CARD + 8, y: BY, r: 30, name: 'a card, where the beam that passes through the glass lands' });
    /* legend of the kinds in the glass */
    const kinds = v === 'solution' ? [[F.el('Na'), 5, 'Na⁺ ion'], [F.el('Cl'), 5, 'Cl⁻ ion']] : v === 'colloid' ? [[F.ref('butterfat'), 11, 'butterfat droplet']] : [[F.ref('mud'), 16, 'grain of mud']];
    kinds.forEach(([c, r, name], i) => { const y = 180 + i * 40; ball(ctx, 1170, y, r, c); text(ctx, name, 1196, y, PAL.ink, { size: 20 }); });
    topline(ctx, v === 'solution'
      ? 'The ions dissolved in saltwater are too small to scatter light, so the beam crosses the glass unseen.'
      : v === 'colloid'
        ? 'The droplets of butterfat in milk stay dispersed, and they are large enough to scatter the beam.'
        : settled < 0.97
          ? 'The grains of mud cloud the water and scatter the beam, and they are settling to the bottom.'
          : 'The mud has settled to the bottom, and the clear water above it no longer shows the beam.');
    const B = (s, on) => (on ? `\\boxed{\\text{${s}}}` : `\\text{${s}}`);
    readout(d.readout, `${B('dissolved ions', v === 'solution')} \\;<\\; ${B('colloidal particles', v === 'colloid')} \\;<\\; ${B('suspended particles', v === 'suspension')}`, null, { values: false });
  }
  register(d.fig, { update: (dt) => { clock += dt; cy.step(dt, () => 1); }, draw });
})();

/* ---------- a molecular scene drawn both ways (book rule: a structure the text names carries the 2D/3D view choice) ---------- */
function turn(p, yaw, pitch) {
  const x = p[0] * Math.cos(yaw) + p[2] * Math.sin(yaw), z1 = -p[0] * Math.sin(yaw) + p[2] * Math.cos(yaw);
  return [x, p[1] * Math.cos(pitch) - z1 * Math.sin(pitch), p[1] * Math.sin(pitch) + z1 * Math.cos(pitch)];
}
function twoWays(d, opts, onShow) {
  const VIEW = F.choice(d.controls, { label: '\\text{view}', options: [{ value: '2d', label: '2D' }, { value: '3d', label: '3D' }], value: '2d', aria: 'a flat drawing or a scene to turn', onInput: () => show() });
  const s = { v: null, g: null, get three() { return VIEW.value === '3d'; } };
  function show() {
    if (s.three && !s.v) { s.v = F.view3d(d.stage, { spin: 'idle', pitch: [-1.2, 1.2], ...opts }); s.g = s.v.part(0); }
    d.c.style.display = s.three ? 'none' : '';
    if (s.v) [s.v.wrap, d.stage.querySelector('.view3d-bar')].forEach((e) => { if (e) e.style.display = s.three ? '' : 'none'; });
    onShow();
  }
  return s;
}

/* =====================================================================
   FIGURE 11.31 + 11.32: a soap and a detergent, one amphiphile with a
   choice. Sodium stearate, C17H35CO2Na, and sodium lauryl sulfate,
   C12H25OSO3Na, share a zigzag chain of twelve carbon atoms; the choice
   keeps those in place, fades the five further carbon atoms of the
   stearate chain, and turns the carboxylate head into the sulfate head,
   the Na+ ion moving to stand beside it. Coordinates in ångströms: C–C
   1.54 Å drawn as a 1.26 Å step along the chain, hydrogens tetrahedral
   out of the plane of the zigzag. Still: nothing in the idea has a clock.
   Two views, 2D first (book rule); the 3D scene has no ground, turns
   freely about the vertical, pitch within 69° of level, idle spin.
===================================================================== */
(function () {
  const d = sim('sim-amphiphile', 440);
  const R = { C: 0.38, H: 0.25, O: 0.36, S: 0.5, Na: 0.55 };
  const WORD = { C: 'a carbon atom, C', H: 'a hydrogen atom, H', O: 'an oxygen atom, O', S: 'a sulfur atom, S', Na: 'a sodium ion, Na<sup>+</sup>' };
  const cpos = (k) => [1.26 * k, k % 2 ? 0.44 : -0.44, 0];
  const A0 = Math.atan2(0.88, 1.26), dir = (a) => [Math.cos(a), Math.sin(a), 0];
  function chain(n, atoms, bonds) {
    for (let k = 1; k <= n; k++) {
      const c = cpos(k), s = k % 2 ? 1 : -1, ck = 'C' + k;
      atoms[ck] = { el: 'C', p: c };
      bonds.push([k === 1 ? 'X0' : 'C' + (k - 1), ck]);
      for (const [h, z] of [['a', 1], ['b', -1]]) { atoms['H' + k + h] = { el: 'H', p: add(c, mul([0, s * 0.578, z * 0.816], 1.09)) }; bonds.push([ck, 'H' + k + h]); }
      if (k === n) { atoms['H' + k + 'c'] = { el: 'H', p: add(c, mul(unit([1.26, -0.88 * s, 0]), 1.09)) }; bonds.push([ck, 'H' + k + 'c']); }
    }
  }
  const soap = { atoms: {}, bonds: [] }, det = { atoms: {}, bonds: [] };
  const P0 = cpos(0);
  soap.atoms.X0 = { el: 'C', p: P0, key: 'X0' };
  soap.atoms.Oa = { el: 'O', p: add(P0, mul(dir(A0 + TAU / 3), 1.26)) };
  soap.atoms.Ob = { el: 'O', p: add(P0, mul(dir(A0 - TAU / 3), 1.26)) };
  soap.atoms.Na = { el: 'Na', p: add(soap.atoms.Ob.p, [-2.3, -1.2, 0]) };
  soap.bonds.push(['X0', 'Oa'], ['X0', 'Ob']);
  chain(17, soap.atoms, soap.bonds);
  const dS = dir(A0 + 2.0), S = add(P0, mul(dS, 1.6));
  det.atoms.X0 = { el: 'O', p: P0 };
  det.atoms.S = { el: 'S', p: S };
  det.bonds.push(['X0', 'S']);
  const back = mul(dS, -1), side = unit(cross(back, [0, 0, 1]));
  [0, 1, 2].forEach((m) => {
    const f = 0.3 + m * TAU / 3, u = add(mul(back, -1 / 3), add(mul(side, 0.943 * Math.cos(f)), mul([0, 0, 1], 0.943 * Math.sin(f))));
    det.atoms['Os' + m] = { el: 'O', p: add(S, mul(unit(u), 1.45)) }; det.bonds.push(['S', 'Os' + m]);
  });
  const lowO = [0, 1, 2].map((m) => 'Os' + m).sort((a, b) => det.atoms[a].p[1] - det.atoms[b].p[1])[0];
  det.atoms.Na = { el: 'Na', p: add(det.atoms[lowO].p, [-2.2, -1.1, 0]) };
  chain(12, det.atoms, det.bonds);
  const STATES = { soap, det };
  const MINUS = { soap: 'Ob', det: lowO };
  const NAME = (key, st) => {
    const a = STATES[st].atoms[key]; if (!a) return '';
    if (key === 'X0' && st === 'soap') return 'the carbon atom of the carboxylate group, CO<sub>2</sub><sup>−</sup>';
    if (key === 'X0') return 'an oxygen atom of the sulfate group, OSO<sub>3</sub><sup>−</sup>';
    if (key === 'S') return 'the sulfur atom of the sulfate group';
    if (key === 'Oa' || key === 'Ob') return 'an oxygen atom of the carboxylate group';
    if (key.startsWith('Os')) return 'an oxygen atom of the sulfate group';
    return WORD[a.el];
  };
  const KEYS = [...new Set([...Object.keys(soap.atoms), ...Object.keys(det.atoms)])];
  const BONDS = [...new Map([...soap.bonds, ...det.bonds].map((b) => [b.join('|'), b])).values()];
  const AM = F.choice(d.controls, { label: '\\text{amphiphile}', options: [{ value: 'soap', label: 'soap' }, { value: 'det', label: 'detergent' }], value: 'soap', aria: 'a soap or a detergent' });
  const two = twoWays(d, { h: 400, dist: 30, views: [{ label: 'side', yaw: 0, pitch: 0.2 }, { label: 'end on', yaw: Math.PI / 2, pitch: 0.1 }] }, () => draw());
  const hits = []; F.hover(d.stage, () => hits);
  /* each atom now: where it stands, the element it shows and how present it is */
  function now() {
    const from = AM.from ?? AM.value, to = AM.value, k = smooth(AM.k ?? 1), out = [];
    for (const key of KEYS) {
      const a = STATES[from].atoms[key], b = STATES[to].atoms[key];
      if (a && b && a.el === b.el) { out.push({ key, el: b.el, p: mix3(a.p, b.p, k), o: 1, st: to }); continue; }
      for (const st of ['soap', 'det']) { const s = STATES[st].atoms[key]; if (s) out.push({ key, el: s.el, p: s.p, o: AM.a(st), st }); }
    }
    return out;
  }
  const CENTRE = 8.8;
  const HEAD = {
    soap: 'Sodium stearate, C<sub>17</sub>H<sub>35</sub>CO<sub>2</sub>Na, has a nonpolar hydrocarbon end of 17 carbon atoms and an ionic carboxylate end.',
    det: 'Sodium lauryl sulfate, C<sub>12</sub>H<sub>25</sub>OSO<sub>3</sub>Na, has a nonpolar hydrocarbon end of 12 carbon atoms and an ionic sulfate end.',
  };
  const EQ = {
    soap: '\\underbrace{\\text{C}_{17}\\text{H}_{35}}_{\\text{nonpolar}}\\text{—}\\underbrace{\\text{CO}_{2}{}^{-}\\ \\text{Na}^{+}}_{\\text{ionic}}',
    det: '\\underbrace{\\text{C}_{12}\\text{H}_{25}}_{\\text{nonpolar}}\\text{—}\\underbrace{\\text{OSO}_{3}{}^{-}\\ \\text{Na}^{+}}_{\\text{ionic}}',
  };
  let sig = '', meshes = null, shownHead = '';
  const palSig = () => [PAL.ink, PAL.muted, F.el('C'), F.el('H'), F.el('O'), F.el('S'), F.el('Na')].join('|');
  function build3() {
    const key = palSig(); if (key === sig && meshes) return; sig = key; shownHead = '';
    two.v.clear(); meshes = { atoms: {}, bonds: [] };
    const T3D = window.THREE;
    for (const k of KEYS) {
      const g = new T3D.Group(); two.g.add(g);
      const el0 = (soap.atoms[k] || det.atoms[k]).el;
      const m = F.mesh.sphere(g, [0, 0, 0], R[el0], F.el(el0)); two.v.pickable(m, NAME(k, soap.atoms[k] ? 'soap' : 'det'));
      const alt = soap.atoms[k] && det.atoms[k] && soap.atoms[k].el !== det.atoms[k].el ? F.mesh.sphere(g, [0, 0, 0], R[det.atoms[k].el], F.el(det.atoms[k].el)) : null;
      if (alt) two.v.pickable(alt, NAME(k, 'det'));
      meshes.atoms[k] = { g, m, alt };
    }
    for (const [a, b] of BONDS) { const g = new T3D.Group(); two.g.add(g); meshes.bonds.push({ a, b, g, m: F.mesh.stick(g, [0, 0, 0], [1, 0, 0], 0.1, PAL.muted) }); }
  }
  function draw() {
    const at = now(), by = {}; at.forEach((a) => { (by[a.key] = by[a.key] || []).push(a); });
    const st = AM.value;
    const pos = (k) => by[k][0].p, op = (k) => Math.max(...by[k].map((a) => a.o));
    if (two.three) {
      build3();
      for (const k of KEYS) {
        const m = meshes.atoms[k], q = sub(pos(k), [CENTRE, 0, 0]);
        m.g.position.set(q[0], q[1], q[2]);
        if (m.alt) { F.fade3(m.m, AM.a('soap')); F.fade3(m.alt, AM.a('det')); } else F.fade3(m.g, op(k));
      }
      for (const b of meshes.bonds) {
        const o = Math.min(op(b.a), op(b.b));
        F.mesh.setStick(b.m, sub(pos(b.a), [CENTRE, 0, 0]), sub(pos(b.b), [CENTRE, 0, 0])); F.fade3(b.g, o);
      }
      if (shownHead !== HEAD[st]) { shownHead = HEAD[st]; two.v.headline(HEAD[st]); }
      two.v.invalidate();
    } else {
      const { ctx } = begin(d.c); hits.length = 0;
      const o = { yaw: -0.3, pitch: 0.4, s: 43 };
      const P = (p) => { const q = turn(sub(p, [CENTRE, 0, 0]), o.yaw, o.pitch); return [700 + q[0] * o.s, 270 - q[1] * o.s, q[2]]; };
      for (const [a, b] of BONDS) {
        const oo = Math.min(op(a), op(b)); if (oo <= 0) continue;
        const A = P(pos(a)), B = P(pos(b)); line(ctx, A[0], A[1], B[0], B[1], alpha(PAL.muted, oo), 9);
      }
      at.filter((a) => a.o > 0).map((a) => ({ ...a, q: P(a.p) })).sort((a, b) => a.q[2] - b.q[2]).forEach((a) => {
        ctx.save(); ctx.globalAlpha = a.o; ctx.fillStyle = F.el(a.el); ctx.strokeStyle = a.el === 'H' ? PAL.ink : alpha(PAL.ink, 0.45); ctx.lineWidth = a.el === 'H' ? 1.4 : 1.2;
        ctx.beginPath(); ctx.arc(a.q[0], a.q[1], R[a.el] * o.s, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore();
        if (a.o > 0.5) hits.unshift({ x: a.q[0], y: a.q[1], r: R[a.el] * o.s, name: NAME(a.key, a.st) });
      });
      /* the two ends, named by brackets over the chain and the head */
      const n = st === 'soap' ? 17 : 12, nFrom = (AM.from ?? st) === 'soap' ? 17 : 12, kk = smooth(AM.k ?? 1);
      const xTailEnd = lerp(P(cpos(nFrom))[0], P(cpos(n))[0], kk) + 14, xTail0 = P(cpos(1))[0] - 10;
      const headXs = at.filter((a) => a.o > 0.5 && (a.key === 'X0' || a.key === 'Na' || /^O/.test(a.key) || a.key === 'S')).map((a) => P(a.p)[0]);
      const xh0 = Math.min(...headXs) - 22, xh1 = Math.max(...headXs) + 10;
      hbracket(ctx, xTail0, xTailEnd, 150, F.ref('tail'), 'nonpolar hydrocarbon end', { size: 21 });
      hbracket(ctx, xh0, Math.min(xh1, xTail0 - 24), 150, F.ref('head'), 'ionic end', { size: 21 });
      const Om = P(pos(MINUS[st])), Na = P(pos('Na'));
      text(ctx, '−', Om[0] + 2, Om[1] + 28, PAL.ink, { size: 26, weight: 600, align: 'center' });
      text(ctx, '+', Na[0] + 30, Na[1] - 18, PAL.ink, { size: 26, weight: 600, align: 'center' });
      topline(ctx, HEAD[st].replace(/<sub>(\d+)<\/sub>/g, '_{$1}'));
    }
    readout(d.readout, EQ[st], null, { values: false });
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 11.33: an oil drop emulsified by soap, in cross section. 32 soap
   anions start scattered through the water at random angles; one after
   another each drifts to its place on the drop's surface and turns so its
   hydrocarbon tail points into the oil and its ionic end stays in the
   water. Sodium ions stand in the water, each surrounded by four water
   molecules with their oxygen ends toward it. Moving: the anions arrive
   over an 8 s clock; the anion labels wait until all have settled, so they never sit on a drifting chain. OIL_AMBER is the pale
   gold of oil, a physical colour; tails in carbon's colour, ionic ends in
   oxygen's, as the book draws them. Flat: the book's own cross section.
===================================================================== */
(function () {
  const OIL_AMBER = '#e6c46a';
  const d = sim('sim-emulsion', 540);
  const CX = 860, CY = 330, RD = 165, TAIL = 128, N = 32;
  const rnd = (a, b) => a + Math.random() * (b - a);
  /* the anions at 202.5° and 185.6°, on the left of the drop, arrive first and carry the labels */
  const LABEL_SLOT = 18, TAIL_SLOT = 16;
  const inWater = () => { for (;;) { const x = rnd(360, 1270), y = rnd(180, 500); if (Math.hypot(x - CX, y - CY) > RD + TAIL * 0.6 + 30) return [x, y]; } };
  const order = [LABEL_SLOT, TAIL_SLOT, ...Array.from({ length: N }, (_, i) => (i * 13) % N).filter((i) => i !== LABEL_SLOT && i !== TAIL_SLOT)];
  /* a tail starts pointing away from the headline above and the edge below */
  const anions = Array.from({ length: N }, (_, i) => { const start = inWater(); return { th: (i / N) * TAU + TAU / (2 * N), start, a0: start[1] < 330 ? rnd(0.3, Math.PI - 0.3) : rnd(Math.PI + 0.3, TAU - 0.3), ph: rnd(0, TAU), n: order.indexOf(i) }; });
  const START = 0.4, GAP = 0.2, DUR = 1.6, TEND = START + GAP * (N - 1) + DUR;
  const IONS = [[430, 150], [1180, 130], [1300, 300], [1180, 470], [470, 470]].map(([x, y]) => ({ x, y, ph: rnd(0, TAU), w: [0.3, 1.9, 3.5, 5.1].map((a) => a + rnd(-0.2, 0.2)) }));
  const FREE = Array.from({ length: 9 }, () => { const [x, y] = inWater(); return { x, y, a: rnd(0, TAU), ph: rnd(0, TAU) }; });
  const cy = cycle(() => TEND, 2.5);
  const hits = []; F.hover(d.stage, () => hits);
  let clock = 0;
  function state(q, t) {
    const w = smooth(clamp01((t - (START + q.n * GAP)) / DUR));
    const hx = CX + Math.cos(q.th) * (RD + 2), hy = CY + Math.sin(q.th) * (RD + 2);
    const jig = (1 - w) * 6;
    const x = lerp(q.start[0], hx, w) + jig * Math.sin(1.7 * clock + q.ph), y = lerp(q.start[1], hy, w) + jig * Math.cos(2.1 * clock + q.ph);
    let da = (q.th + Math.PI) - q.a0; da = Math.atan2(Math.sin(da), Math.cos(da));
    return { x, y, a: q.a0 + da * w, w };
  }
  function tail(ctx, x, y, a, col) {
    const ux = Math.cos(a), uy = Math.sin(a), px = -uy, py = ux;
    ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.lineJoin = 'round'; ctx.beginPath();
    for (let i = 0; i <= 16; i++) { const s = 8 + (i / 16) * TAIL, z = (i % 2 ? 1 : -1) * 4.5 * (i > 0 ? 1 : 0); const X = x + ux * s + px * z, Y = y + uy * s + py * z; if (i) ctx.lineTo(X, Y); else ctx.moveTo(X, Y); }
    ctx.stroke(); ctx.restore();
  }
  function water(ctx, x, y, a) {
    for (const s of [0.9, -0.9]) ball(ctx, x + 9 * Math.cos(a + s), y + 9 * Math.sin(a + s), 4.5, F.el('H'), 0.6);
    ball(ctx, x, y, 7, F.el('O'), 0.45);
  }
  function draw() {
    const { ctx } = begin(d.c); hits.length = 0;
    const t = cy.now();
    ctx.save(); ctx.fillStyle = alpha(F.fact(OIL_AMBER), 0.55); ctx.beginPath(); ctx.arc(CX, CY, RD, 0, TAU); ctx.fill(); ctx.restore();
    const st = anions.map((q) => state(q, t));
    st.forEach((s) => tail(ctx, s.x, s.y, s.a, F.el('C')));
    st.forEach((s) => { ball(ctx, s.x, s.y, 9, F.el('O')); hits.push({ x: s.x, y: s.y, r: 11, name: 'the ionic end of a soap anion, a carboxylate group, CO<sub>2</sub><sup>−</sup>' }); });
    for (const ion of IONS) {
      const x = ion.x + 3 * Math.sin(1.1 * clock + ion.ph), y = ion.y + 3 * Math.cos(1.3 * clock + ion.ph);
      ion.w.forEach((a) => water(ctx, x + 22 * Math.cos(a), y + 22 * Math.sin(a), a));
      ball(ctx, x, y, 12, F.el('Na'));
      hits.push({ x, y, r: 34, name: 'a sodium ion, Na<sup>+</sup>, surrounded by water molecules' });
    }
    for (const w of FREE) { const x = w.x + 4 * Math.sin(1.3 * clock + w.ph), y = w.y + 4 * Math.cos(0.9 * clock + w.ph); water(ctx, x, y, w.a + 0.3 * Math.sin(clock + w.ph)); hits.push({ x, y, r: 13, name: 'a water molecule, H<sub>2</sub>O' }); }
    st.forEach((s) => { for (const f of [0.35, 0.7]) hits.push({ x: s.x + Math.cos(s.a) * TAIL * f, y: s.y + Math.sin(s.a) * TAIL * f, r: 9, name: 'the hydrocarbon tail of a soap anion, C<sub>17</sub>H<sub>35</sub>—' }); });
    hits.push({ x: CX, y: CY, r: RD, name: 'a drop of oil' });
    /* the book's four labels, the two on the anion only once it has arrived */
    const L = st[LABEL_SLOT], Tl = st[TAIL_SLOT], ion = IONS[0];
    label(ctx, 'solvated cation', ion.x - 40, ion.y, { side: 'left', size: 20, leader: true, gap: 60 });
    const settled = st.every((s) => s.w >= 1);
    if (settled) label(ctx, 'ionic end', L.x - 14, L.y, { side: 'left', size: 20, leader: true, gap: 110 });
    if (settled) label(ctx, 'hydrocarbon tail', Tl.x + Math.cos(Tl.a) * 36, Tl.y + Math.sin(Tl.a) * 36 + 4, { side: 'left', size: 20, leader: true, gap: 170 });
    label(ctx, 'drop of oil', CX - 30, CY + RD - 10, { side: 'below', size: 20, leader: true, gap: 34 });
    const done = st.filter((s) => s.w >= 1).length;
    topline(ctx, done === N
      ? 'All 32 soap anions have settled at the surface of the oil drop, and the coated drop stays suspended in the water.'
      : done + ' of 32 soap anions have settled at the surface of the oil drop, their hydrocarbon tails in the oil and their ionic ends in the water.');
    readout(d.readout, '\\underbrace{\\text{C}_{17}\\text{H}_{35}}_{\\text{in the oil}}\\text{—}\\underbrace{\\text{CO}_{2}{}^{-}}_{\\text{in the water}}', null, { values: false });
  }
  register(d.fig, { update: (dt) => { clock += dt; cy.step(dt, () => 1); }, draw });
})();

/* =====================================================================
   FIGURE 11.36: a Cottrell precipitator in three dimensions. Soot-laden
   smoke enters a cylindrical chamber through a pipe at its side; a point
   electrode at a high DC voltage runs down the axis inside the grounded
   plate electrode, the chamber wall. With the voltage on, each soot
   particle takes up a charge, crosses to the wall, is neutralized there
   and slides into the hopper as dust; with it off, the soot rises with
   the gases and leaves through the outlet at the top. Moving: the smoke
   flows without end. The chamber stands on a floor, so the pitch stays
   between 2° and 70° above level; spin off, since the smoke already moves.
===================================================================== */
(function () {
  const T3D = window.THREE;
  const d = sim('sim-precipitator');
  const v = F.view3d(d.stage, { spin: 'off', pitch: [0.035, 1.22], views: [{ label: 'front', yaw: 0, pitch: 0.1 }, { label: 'oblique', yaw: 0.6, pitch: 0.45 }], h: 440, dist: 7.4, tilt: 0.15 });
  v.setView(0, 0.12);
  const grp = v.part(0), cnv = F.makeCanvas(d.stage, 200);
  grp.position.y = -0.65;
  const RC = 0.9, Y0 = -0.6, Y1 = 1.8, YIN = 0.1, YOUT = 1.45, YH = -1.2, YP = -1.6, FLOOR = -1.95;
  const V = F.choice(d.controls, { label: '\\text{high DC voltage}', options: [{ value: 'off', label: 'off' }, { value: 'on', label: 'on' }], value: 'on', aria: 'the voltage on the point electrode', onInput: () => { outcomes.length = 0; gen++; } });
  let gen = 0;
  const POOL = 70, parts = [], outcomes = [];
  const rnd = (a, b) => a + Math.random() * (b - a);
  for (let i = 0; i < POOL; i++) parts.push({ on: false });
  let spawnT = 0;
  function spawn() {
    const p = parts.find((q) => !q.on); if (!p) return;
    Object.assign(p, { on: true, gen, ph: 'pipe', x: [-1.75, YIN + rnd(-0.07, 0.07), rnd(-0.07, 0.07)], r: RC, phi: Math.PI, rt: rnd(0.08, 0.75), pt: rnd(-1.1, 1.1) + Math.PI, age: 0 });
  }
  const polar = (r, phi, y) => [r * Math.cos(phi), y, r * Math.sin(phi)];
  function step(dt) {
    const on = V.value === 'on';
    spawnT += dt; while (spawnT > 0.11) { spawnT -= 0.11; spawn(); }
    for (const p of parts) {
      if (!p.on) continue;
      p.age += dt;
      if (p.ph === 'pipe') { p.x[0] += 0.9 * dt; if (p.x[0] >= -RC) { p.ph = 'mix'; p.y = p.x[1]; p.r = RC - 0.1; p.phi = Math.PI; p.age = 0; } continue; }
      if (p.ph === 'mix' || p.ph === 'rise') {
        const k = Math.min(1, dt * 2.2);
        if (p.ph === 'mix') { p.r += (p.rt - p.r) * k; p.phi += (p.pt - p.phi) * k; if (p.age > 0.9) p.ph = 'rise'; }
        p.y += 0.42 * dt;
        if (on && p.ph === 'rise') p.r += 0.62 * dt;
        p.phi += rnd(-0.4, 0.4) * dt;
        if (p.r >= RC - 0.05) { p.r = RC - 0.05; p.ph = 'wall'; }
        else if (p.y >= YOUT) { p.ph = 'out'; p.x = polar(p.r, p.phi, p.y); }
        continue;
      }
      if (p.ph === 'wall') {
        if (p.y > Y0) p.y -= 0.55 * dt;
        else { const f = clamp01((p.y - YH) / (Y0 - YH)); p.r = 0.12 + (RC - 0.17) * f; p.y -= 0.55 * dt; if (p.y < YH) p.r = 0.1; }
        if (p.y <= YP) { p.on = false; if (p.gen === gen) outcomes.push(1); }
        continue;
      }
      if (p.ph === 'out') {
        p.x[0] += 0.9 * dt; p.x[1] += (YOUT - p.x[1]) * Math.min(1, dt * 4); p.x[2] *= 1 - Math.min(1, dt * 3);
        if (p.x[0] >= 1.75) { p.on = false; if (p.gen === gen) outcomes.push(0); }
      }
    }
    while (outcomes.length > 50) outcomes.shift();
  }
  const where = (p) => (p.ph === 'pipe' || p.ph === 'out' ? p.x : polar(p.r, p.phi, p.y));
  let sig = '', meshes = [];
  const palSig = () => [PAL.ink, PAL.soft, PAL.muted, PAL.panel, F.el('C'), F.ref('point-electrode'), F.ref('plate-electrode'), F.ref('hopper')].join('|');
  const tube = (r0, r1, h, y, color, opacity, rotZ = 0, x = 0) => {
    const m = new T3D.Mesh(new T3D.CylinderGeometry(r0, r1, h, 48, 1, true), F.mesh.mat(color, { transparent: true, opacity, depthWrite: false, side: T3D.DoubleSide }));
    m.position.set(x, y, 0); m.rotation.z = rotZ; grp.add(m); return m;
  };
  function build() {
    if (palSig() === sig) return; sig = palSig();
    v.clear(); meshes = [];
    v.pickable(F.mesh.box(grp, [0, FLOOR, 0], [4.4, 0.08, 2.6], PAL.soft), 'the floor');
    v.pickable(tube(RC, RC, Y1 - Y0, (Y0 + Y1) / 2, F.ref('plate-electrode'), 0.16), 'the plate electrode, the grounded wall of the chamber');
    v.pickable(tube(RC, 0.2, Y0 - YH, (Y0 + YH) / 2, F.ref('hopper'), 0.16), 'the hopper, where the soot collects as dust');
    v.pickable(tube(0.2, 0.2, YH - YP, (YH + YP) / 2, PAL.muted, 0.22), 'the outlet for the soot removed');
    v.pickable(tube(0.16, 0.16, 0.9, YIN, PAL.muted, 0.45, Math.PI / 2, -RC - 0.4), 'the inlet for soot-laden smoke');
    v.pickable(tube(0.16, 0.16, 0.9, YOUT, PAL.muted, 0.45, Math.PI / 2, RC + 0.4), 'the outlet where soot-free gases escape');
    const cap = new T3D.Mesh(new T3D.CircleGeometry(RC, 48), F.mesh.mat(PAL.muted, { transparent: true, opacity: 0.3, side: T3D.DoubleSide })); cap.rotation.x = -Math.PI / 2; cap.position.y = Y1; grp.add(cap);
    for (const [x, z] of [[-0.7, -0.5], [0.7, -0.5], [0, 0.8]]) F.mesh.stick(grp, [x, YH + 0.1, z], [x, FLOOR, z], 0.03, PAL.muted);
    v.pickable(F.mesh.stick(grp, [0, 2.0, 0], [0, -0.35, 0], 0.025, F.ref('point-electrode')), 'the point electrode, at a high DC voltage');
    for (let y = -0.25; y < 1.5; y += 0.22) for (let m = 0; m < 4; m++) { const a = m * Math.PI / 2 + y; F.mesh.stick(grp, [0, y, 0], [0.16 * Math.cos(a), y + 0.04, 0.16 * Math.sin(a)], 0.012, F.ref('point-electrode')); }
    v.label('point electrode', [0, 2.27, 0], grp, 0).style.color = F.ref('point-electrode');
    v.label('plate electrode', [RC + 1.15, 0.2, 0], grp, 0).style.color = F.ref('plate-electrode');
    for (const y of [Y0, Y1]) F.mesh.polyline(grp, Array.from({ length: 49 }, (_, i) => polar(RC, (i / 48) * TAU, y)), F.ref('plate-electrode'));
    v.label('soot-laden smoke', [-RC - 1.55, YIN - 0.4, 0], grp, 0);
    v.label('soot-free gases escape', [RC + 1.6, YOUT - 0.45, 0], grp, 0);
    v.label('soot removed here', [0, YP - 0.15, 0], grp, 14);
    meshes = parts.map(() => { const m = F.mesh.sphere(grp, [0, 0, 0], 0.035, F.el('C')); v.pickable(m, 'a soot particle, mostly carbon'); m.visible = false; return m; });
  }
  const cy = cycle(() => Infinity, 0);
  function draw() {
    build();
    parts.forEach((p, i) => { const m = meshes[i]; m.visible = p.on; if (p.on) { const q = where(p); m.position.set(q[0], q[1], q[2]); } });
    v.invalidate();
    const n = outcomes.length, got = outcomes.reduce((s, x) => s + x, 0), on = V.value === 'on';
    const { ctx } = begin(cnv);
    topline(ctx, n === 0
      ? (on ? 'With the high DC voltage on, soot-laden smoke begins to flow into the chamber.' : 'With the voltage off, soot-laden smoke begins to flow into the chamber.')
      : on ? 'With the high DC voltage on, ' + got + ' of the last ' + n + ' soot particles have been removed from the smoke.'
        : 'With the voltage off, ' + (n - got) + ' of the last ' + n + ' soot particles have escaped with the gases.');
    const per = 15, x0 = 470;
    text(ctx, 'collected as dust', x0 - 20, 106, PAL.ink, { size: 18, align: 'right' });
    bar(ctx, x0, 106, per, got, 50, F.el('C'));
    text(ctx, String(got), x0 + per * 50 + 16, 106, PAL.ink, { size: 18 });
    text(ctx, 'escaped with the gases', x0 - 20, 154, PAL.ink, { size: 18, align: 'right' });
    bar(ctx, x0, 154, per, n - got, 50, F.el('C'));
    text(ctx, String(n - got), x0 + per * 50 + 16, 154, PAL.ink, { size: 18 });
    readout(d.readout, n === 0 ? '\\text{removed} = 0' : `\\text{removed} = \\frac{${got}}{${n}}`, null, { values: false });
  }
  register(d.fig, { update: (dt) => { cy.step(dt, () => 1); step(Math.min(dt, 0.05)); }, draw });
})();
};
