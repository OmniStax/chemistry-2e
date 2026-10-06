/* Figures for section 12.7 Catalysis. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['12.7'] = function (root, F) {
const { fmt, C, PAL, alpha, ctl, cycle, register, begin, line, text, topline } = F;
const sim = (id, H) => F.sim(root, id, H);
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;
const clamp01 = (x) => Math.min(1, Math.max(0, x));
/* smooth progress through the beat from a to b seconds */
const beat = (t, a, b) => F.ease.smooth(clamp01((t - a) / (b - a)));
const lerp = (a, b, k) => a + (b - a) * k;
const lerp3 = (a, b, k) => [lerp(a[0], b[0], k), lerp(a[1], b[1], k), lerp(a[2], b[2], k)];
/* a curve through its turning points, each joined to the next by half a cosine, so every knot is a level, a peak or a valley */
const knots = (ks) => (x) => {
  if (x <= ks[0][0]) return ks[0][1];
  for (let i = 1; i < ks.length; i++) {
    const [x1, y1] = ks[i];
    if (x <= x1) { const [x0, y0] = ks[i - 1], s = (x - x0) / (x1 - x0); return y0 + ((y1 - y0) * (1 - Math.cos(Math.PI * s))) / 2; }
  }
  return ks[ks.length - 1][1];
};

/* =====================================================================
   FIGURE 12.19: the same endothermic reaction without and with a
   catalyst, on the energies of Example 12.15: reactants 6 kJ/mol,
   products 10 kJ/mol, the uncatalyzed barrier at 32 kJ/mol. The slider
   sets the catalyzed barrier above the reactants; on the two-step path
   the intermediate and the second barrier keep their share of the height
   between the products and the first barrier, so the first step stays
   the slower one. Energy axis fixed at 0 to 40 kJ/mol, above the highest
   barrier the slider can reach. Still: a reaction diagram has no clock.
===================================================================== */
(function () {
  const d = sim('sim-catalysis', 560);
  const R0 = 6, P0 = 10, EU = 26, RT = 8.314e-3 * 298;
  const ea = ctl(d.controls, { label: '\\htmlClass{kv-energy}{E}_{\\text{a},\\htmlData{ref=catalyzed}{\\text{cat}}}', cls: 'energy', key: 'ea-cat', min: 6, max: 26, step: 1, value: 14, unit: 'kJ/mol', dec: 0, aria: 'activation energy of the catalyzed path, in kilojoules per mole' });
  const path = F.choice(d.controls, { label: '\\text{catalyzed path}', key: 'steps', options: [{ value: 'two', label: 'two steps' }, { value: 'one', label: 'one step' }], value: 'two' });
  const ro = F.readout(d);
  const G = { l: 150, r: 1250, t: 120, b: 470 };
  const uncat = knots([[0, R0], [0.14, R0], [0.5, R0 + EU], [0.86, P0], [1, P0]]);
  const shape = (v, e) => {
    const top = R0 + e;
    if (v === 'one') return { f: knots([[0, R0], [0.14, R0], [0.5, top], [0.86, P0], [1, P0]]), x: 0.5, mid: null, ts: [[0.5, top]] };
    const mid = P0 + 0.45 * (top - P0), p2 = P0 + 0.75 * (top - P0);
    return { f: knots([[0, R0], [0.14, R0], [0.42, top], [0.53, mid], [0.62, p2], [0.86, P0], [1, P0]]), x: 0.42, mid: [0.53, mid], ts: [[0.42, top], [0.62, p2]] };
  };
  const big = (v) => {
    if (v < 999.5) return v < 9.995 ? v.toFixed(2) : v < 99.95 ? v.toFixed(1) : v.toFixed(0);
    const e = Math.floor(Math.log10(v)), m = v / 10 ** e;
    return `${m.toFixed(2)} \\times 10^{${e}}`;
  };
  const Ecat = '\\htmlClass{kv-energy}{E}_{\\text{a},\\htmlData{ref=catalyzed}{\\text{cat}}}';
  const Eun = '\\htmlClass{kv-energy}{E}_{\\text{a},\\htmlData{ref=uncatalyzed}{\\text{uncat}}}';
  const kcat = '\\kk_{\\htmlData{ref=catalyzed}{\\text{cat}}}', kun = '\\kk_{\\htmlData{ref=uncatalyzed}{\\text{uncat}}}';
  let hits = [];
  F.hover(d.stage, () => hits);
  function draw() {
    const { ctx, H } = begin(d.c), lab = F.labeller(ctx, H, { headline: true });
    const e = ea.v, ce = C('energy'), cu = F.ref('uncatalyzed'), cc = F.ref('catalyzed');
    const g = F.axes(ctx, G, [0, 1], [0, 40], { nx: 1, ny: 4, fx: () => '', xl: 'extent of reaction', yl: 'energy (kJ/mol)', yc: ce });
    line(ctx, g.X(0), g.Y(R0), g.X(0.97), g.Y(R0), alpha(PAL.ink, 0.45), 3, [10, 10]);
    F.curve(ctx, uncat, 0, 1, g.X, g.Y, cu, 5, 220);
    path.curve(ctx, (v) => shape(v, e).f, 0, 1, g.X, g.Y, cc, 5, 220);
    /* the two barriers from the reactants' level, the catalyzed one beside its first peak, the uncatalyzed one just right of its peak */
    const xc = g.X(path.mix((v) => shape(v, e).x)) - 14, xu = g.X(0.5) + 14;
    F.vbracket(ctx, xc, g.Y(R0), g.Y(R0 + e), ce);
    F.vbracket(ctx, xu, g.Y(R0), g.Y(R0 + EU), ce);
    F.vbracket(ctx, g.X(0.93), g.Y(R0), g.Y(P0), ce);
    /* the legend, in the empty corner above the reactants */
    const lx = G.l + 36, ly = G.t + 24;
    line(ctx, lx, ly, lx + 44, ly, cu, 5); text(ctx, 'uncatalyzed', lx + 56, ly, cu, { size: 20, weight: 600 });
    line(ctx, lx, ly + 32, lx + 44, ly + 32, cc, 5); text(ctx, 'catalyzed', lx + 56, ly + 32, cc, { size: 20, weight: 600 });
    lab.block(lx - 8, ly - 16, lx + 200, ly + 48);
    lab.add('E_{a}', xc, g.Y(R0 + e / 2), -1, 0, ce, 22, 16);
    lab.add('E_{a}', xu, g.Y(R0 + EU / 2), 1, 0, ce, 22, 16);
    lab.add('ΔH', g.X(0.93), g.Y((R0 + P0) / 2), 1, 0, ce, 22, 18);
    lab.add('reactants', g.X(0.06), g.Y(R0), 0, 1, PAL.ink, 20, 22);
    lab.add('products', g.X(0.97), g.Y(P0), 0, -1, PAL.ink, 20, 22);
    lab.flush();
    /* the intermediate in the valley of the two-step path, named below the reactants' level where nothing is drawn */
    const two = shape('two', e), vx = g.X(two.mid[0]), vy = g.Y(two.mid[1]);
    path.only(ctx, 'two', () => {
      line(ctx, vx, vy + 10, vx + 34, g.Y(R0) + 24, alpha(cc, 0.7), 2, [4, 6]);
      text(ctx, 'intermediate', vx + 40, g.Y(R0) + 34, PAL.ink, { size: 20 });
    }, [0, 0]);
    const now = shape(path.value, e);
    hits = [{ x: g.X(0.5), y: g.Y(R0 + EU), r: 26, name: 'transition state of the uncatalyzed path' }]
      .concat(now.ts.map(([x, y], i) => ({ x: g.X(x), y: g.Y(y), r: 22, name: now.ts.length > 1 ? (i ? 'second' : 'first') + ' transition state of the catalyzed path' : 'transition state of the catalyzed path' })))
      .concat(now.mid ? [{ x: g.X(now.mid[0]), y: g.Y(now.mid[1]), r: 22, name: 'intermediate of the catalyzed path, in the valley between its transition states' }] : []);
    topline(ctx, e >= EU ? 'At 26 kJ/mol the two barriers stand equally high, and neither path is faster.' : `On the catalyzed path $\\kEa$ is ${e} kJ/mol against 26 kJ/mol, from the same reactants to the same products.`);
    const ratio = Math.exp((EU - e) / RT);
    ro.set(`\\mk{ratio}{\\frac{${kcat}}{${kun}}} = \\mk{law}{\\exp\\left(\\frac{${Eun} - ${Ecat}}{R\\kT}\\right)} = \\exp\\left(\\frac{(${hue('energy', '26')} - \\mk{ec}{${hue('energy', String(e))}})\\ \\text{kJ/mol}}{(8.314 \\times 10^{-3}\\ \\text{kJ mol}^{-1}\\,\\text{K}^{-1})(${hue('temperature', '298\\ \\text{K}')})}\\right) = \\mk{val}{${big(ratio)}}`);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 12.23: ethylene and hydrogen on a nickel surface, in three
   dimensions. One clock runs the book's four steps: (a) two H2 molecules
   land and come apart into hydrogen atoms on the metal; (b) ethylene
   lies down on the surface, its double bond becoming single as two Ni–C
   bonds form; (c) one hydrogen atom slides across the surface to each
   carbon and bonds to it; (d) the ethane lifts off. Scene units: the
   nickel atoms 0.5 apart, about 5 Å per unit, the molecules on the same
   scale. Moving: the steps have a clock, 11.4 s and a 1.4 s hold.
   Physical 3D, a bench-like surface: pitch 0.05 to 1.3 rad so the slab is
   never seen from beneath, yaw ±1.2 rad, no idle spin since the clock
   moves the scene. Without WebGL the strip draws the atoms flat, from
   the front.
===================================================================== */
(function () {
  const d = sim('sim-hydrogenation');
  const v = F.view3d(d.stage, { h: 470, dist: 6.4, tilt: 0.42, spin: 'off', pitch: [0.05, 1.3], yaw: [-1.2, 1.2],
    views: [{ label: 'front', yaw: 0, pitch: 0.42 }, { label: 'above', yaw: 0, pitch: 1.25 }] });
  const has3 = !!v.scene;
  if (!has3) v.wrap.style.display = 'none';
  const FLAT = has3 ? 0 : 360, cnv = F.makeCanvas(d.stage, 130 + FLAT);
  const LOOP = 11.4, cy = cycle(() => LOOP, 1.4);
  const NI_R = 0.25, NI_Y = -0.13, TOP = NI_Y + NI_R, YS = TOP + 0.07, YC = 0.47, CH = 0.27;
  const NI = [];
  for (let i = -3; i <= 3; i++) for (let k = -2; k <= 2; k++) NI.push([i * 0.5, NI_Y, k * 0.5]);
  /* the hydrogen molecules: where each starts, and the two hollow sites its atoms end on; atom a of each goes on to a carbon */
  const HH = [
    { from: [-1.0, 1.25, -0.05], a: [-0.75, YS, -0.25], b: [-1.25, YS, 0.25] },
    { from: [1.05, 1.4, 0.0], a: [0.75, YS, 0.25], b: [1.25, YS, -0.25] },
  ];
  const unit = (p) => { const l = Math.hypot(p[0], p[1], p[2]) || 1; return [p[0] / l, p[1] / l, p[2] / l]; };
  const add = (p, q, k = 1) => [p[0] + q[0] * k, p[1] + q[1] * k, p[2] + q[2] * k];
  /* every atom and bond at time t, a pure function of the clock */
  function state(t) {
    const a1 = beat(t, 0.5, 2.1), a2 = beat(t, 2.1, 2.9), b1 = beat(t, 3.4, 5.0), b2 = beat(t, 5.0, 5.8);
    const c1 = beat(t, 6.3, 8.1), c2 = beat(t, 8.1, 8.8), d1 = beat(t, 9.3, 11.0);
    const lift = [0, 1.0 * d1, 0];
    const atoms = {}, bonds = [];
    HH.forEach((h, i) => {
      const mid = lerp3(h.a, h.b, 0.5), land = [mid[0], YS + 0.03, mid[2]], u = unit([h.b[0] - h.a[0], 0, h.b[2] - h.a[2]]);
      const c = lerp3(h.from, land, a1), half = 0.09;
      atoms['h' + i + 'b'] = lerp3(add(c, u, half), h.b, a2);
      atoms['h' + i + 'a'] = lerp3(add(c, u, -half), h.a, a2);
      bonds.push({ id: 'hh' + i, p: atoms['h' + i + 'a'], q: atoms['h' + i + 'b'], on: a2 < 0.5 });
    });
    /* ethylene falls flat onto the surface, then its C–C bond lengthens and its hydrogens lean up toward the ethane shape */
    const y = lerp(1.4, YC, b1), cc = lerp(0.165, 0.19, b2), lean = 0.5 * b2 + 0.5 * c2;
    const C1 = add([-cc, y, 0], lift), C2 = add([cc, y, 0], lift);
    atoms.c1 = C1; atoms.c2 = C2;
    [[C1, -1], [C2, 1]].forEach(([Cp, s], ci) => {
      [1, -1].forEach((z, j) => {
        const dir = unit(lerp3([0.5 * s, 0, 0.866 * z], [0.333 * s, 0.471, 0.816 * z], lean));
        const p = add(Cp, dir, CH); atoms['e' + ci + j] = p;
        bonds.push({ id: 'ce' + ci + j, p: Cp, q: p, on: true });
      });
      /* the hydrogen atom that travels to this carbon, from its site to the place below the carbon's new C–H bond */
      const h = atoms['h' + ci + 'a'], to = add(Cp, [-0.333 * s, -0.943, 0], CH);
      const at = lerp3(h, [to[0], YS, to[2]], c1);
      atoms['h' + ci + 'a'] = d1 > 0 ? to : c1 > 0 ? [at[0], lerp(YS, to[1], c2), at[2]] : h;
      bonds.push({ id: 'ch' + ci, p: Cp, q: atoms['h' + ci + 'a'], on: c1 > 0.97 });
      /* the Ni–C bond that forms as the π bond breaks and lets go as the product leaves */
      bonds.push({ id: 'nic' + ci, p: Cp, q: lerp3(Cp, [Cp[0], TOP, Cp[2]], b2), on: b2 > 0.02 && d1 === 0 });
    });
    /* the double bond: two rods, one above the other, that close into one as the π bond breaks */
    const gap = 0.04 * (1 - b2);
    bonds.push({ id: 'cc0', p: add(C1, [0, gap, 0]), q: add(C2, [0, gap, 0]), on: true });
    bonds.push({ id: 'cc1', p: add(C1, [0, -gap, 0]), q: add(C2, [0, -gap, 0]), on: gap > 0.003 });
    const step = t < 3.15 ? 0 : t < 6.05 ? 1 : t < 9.05 ? 2 : 3;
    return { atoms, bonds, step };
  }
  const STEPS = [
    '(a) Hydrogen is adsorbed on the surface, breaking the H–H bonds and forming Ni–H bonds.',
    '(b) Ethylene is adsorbed on the surface, breaking the C–C π-bond and forming Ni–C bonds.',
    '(c) Atoms diffuse across the surface and form new C–H bonds when they collide.',
    '(d) C<sub>2</sub>H<sub>6</sub> molecules desorb from the Ni surface.',
  ];
  const TAGS = ['(a) hydrogen adsorbed', '(b) ethylene adsorbed', '(c) atoms meet', '(d) ethane desorbs'];
  const KIND = { h: 'H', c: 'C', e: 'H' };
  const NAME = { H: 'a hydrogen atom, H', C: 'a carbon atom, C' };
  const RAD = { H: 0.095, C: 0.145 };
  const grp = has3 ? v.part(0) : null;
  let sig = '', meshes = {}, sticks = {};
  const palSig = () => [PAL.ink, PAL.muted, F.el('Ni'), F.el('H'), F.el('C')].join('|');
  function build(s) {
    if (!has3) return;
    const key = palSig(); if (key === sig) return; sig = key;
    v.clear(); meshes = {}; sticks = {};
    grp.position.y = -0.7;
    const slab = F.mesh.box(grp, [0, NI_Y - 0.2, 0], [3.5, 0.4, 2.5], F.el('Ni'));
    v.pickable(slab, 'the nickel catalyst, a solid');
    NI.forEach((p) => v.pickable(F.mesh.sphere(grp, p, NI_R, F.el('Ni')), 'a nickel atom of the catalyst surface, Ni'));
    Object.keys(s.atoms).forEach((id) => { const el = KIND[id[0]]; meshes[id] = v.pickable(F.mesh.sphere(grp, s.atoms[id], RAD[el], F.el(el)), NAME[el]); });
    s.bonds.forEach((b) => { sticks[b.id] = F.mesh.stick(grp, b.p, b.q, b.id.startsWith('nic') ? 0.022 : 0.032, b.id.startsWith('nic') ? PAL.muted : PAL.ink); });
    v.label('Ni surface', [-1.95, NI_Y, 0.4], grp, 0);
  }
  function place(s) {
    if (!has3) return;
    Object.keys(s.atoms).forEach((id) => { const p = s.atoms[id]; meshes[id].position.set(p[0], p[1], p[2]); });
    s.bonds.forEach((b) => { const m = sticks[b.id]; m.visible = b.on; if (b.on) F.mesh.setStick(m, b.p, b.q); });
    v.headline(STEPS[s.step]);
    v.invalidate();
  }
  /* the scene seen from the front, flat, for a browser without WebGL */
  function flat(ctx, s) {
    const X = (p) => 700 + p[0] * 300, Y = (p) => 330 - p[1] * 140, R = 140;
    const ball = (p, el, r) => { ctx.save(); ctx.fillStyle = F.el(el); ctx.strokeStyle = alpha(PAL.ink, 0.6); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(X(p), Y(p), r * R, 0, 2 * Math.PI); ctx.fill(); ctx.stroke(); ctx.restore(); };
    NI.filter((p) => p[2] === 1).forEach((p) => ball(p, 'Ni', NI_R));
    s.bonds.forEach((b) => { if (b.on) line(ctx, X(b.p), Y(b.p), X(b.q), Y(b.q), b.id.startsWith('nic') ? PAL.muted : PAL.ink, 3); });
    Object.keys(s.atoms).forEach((id) => { const el = KIND[id[0]]; ball(s.atoms[id], el, RAD[el]); });
    text(ctx, 'Ni surface', 200, Y([0, NI_Y, 0]) + 56, PAL.ink, { size: 20 });
    topline(ctx, STEPS[s.step].replace(/<sub>(\d)<\/sub>/g, '_{$1}'));
  }
  function draw() {
    const s = state(cy.now());
    build(s); place(s);
    const { ctx } = begin(cnv);
    if (!has3) flat(ctx, s);
    const w = 300, gap = 26, x0 = (1400 - 4 * w - 3 * gap) / 2, y0 = FLAT + 30;
    TAGS.forEach((tg, i) => {
      const on = i === s.step, x = x0 + i * (w + gap);
      ctx.save(); ctx.strokeStyle = on ? PAL.ink : alpha(PAL.ink, 0.25); ctx.lineWidth = on ? 3 : 1.5; ctx.beginPath(); ctx.roundRect(x, y0, w, 64, 8); ctx.stroke(); ctx.restore();
      text(ctx, tg, x + w / 2, y0 + 32, on ? PAL.ink : PAL.muted, { size: 20, weight: on ? 600 : 400, align: 'center' });
    });
  }
  F.tex(d.readout, '\\text{C}_{2}\\text{H}_{4}(g) + \\text{H}_{2}(g) \\xrightarrow{\\;\\text{Ni}\\;} \\text{C}_{2}\\text{H}_{6}(g)');
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();

/* =====================================================================
   FIGURE 12.25: an enzyme and its two substrates, flat as the book draws
   them. A clock carries the substrates along curved paths into the
   active site, 4 s and a 1.2 s hold; the choice of model decides whether
   the site already has the shape of their tips (lock-and-key) or takes it
   as they come close (induced fit). The enzyme's rim is sampled at the
   same x in both shapes, so one bends point by point into the other.
===================================================================== */
(function () {
  const d = sim('sim-enzyme', 540);
  const LOOP = 4, cy = cycle(() => LOOP, 1.2);
  const model = F.choice(d.controls, { label: '\\text{model}', key: 'model', options: [{ value: 'lock', label: 'lock-and-key' }, { value: 'induced', label: 'induced fit' }], value: 'lock', onInput: () => cy.reset() });
  const Y0 = 330, XL = 470, XR = 930, PL = 650, PR = 750;
  const bump = (x, c, w) => (Math.abs(x - c) < w ? Math.cos((Math.PI * (x - c)) / (2 * w)) ** 2 : 0);
  const shoulders = (x) => -14 * bump(x, 530, 50) - 14 * bump(x, 870, 50);
  const fitTop = (x) => {
    if (Math.abs(x - PL) < 24) return Y0 + Math.sqrt(24 * 24 - (x - PL) ** 2);
    if (Math.abs(x - PR) < 22) return Y0 + 30 * (1 - Math.abs(x - PR) / 22);
    return Y0 + shoulders(x);
  };
  const looseTop = (x) => Y0 + shoulders(x) + 9 * bump(x, 652, 34) + 7 * bump(x, 748, 30) - 4 * bump(x, 700, 14);
  const XS = []; for (let x = XL; x <= XR; x += 2) XS.push(x);
  /* the substrates as they sit docked: a body and the tip that binds */
  const SUBS = [
    { box: [600, 226, 98, 102], radii: [44, 6, 6, 18], tip: 'round', name: 'substrate with a rounded tip', path: [-170, -110] },
    { box: [702, 226, 98, 102], radii: [6, 44, 18, 6], tip: 'point', name: 'substrate with a pointed tip', path: [170, -110] },
  ];
  /* where a substrate is, offset from its docked place along a curve that drops and then swings in */
  const offset = (s, k) => { const [px, py] = s.path, u = 1 - k; return [u * u * px + 2 * u * k * px, u * u * py + 2 * u * k * -50]; };
  let hits = [];
  F.hover(d.stage, () => hits);
  function substrate(ctx, s, dx, dy, col) {
    const [x, y, w, h] = s.box;
    ctx.save(); ctx.translate(dx, dy);
    ctx.fillStyle = alpha(col, 0.22); ctx.strokeStyle = col; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.roundRect(x, y, w, h, s.radii); ctx.fill(); ctx.stroke();
    ctx.fillStyle = col; ctx.beginPath();
    if (s.tip === 'round') ctx.arc(PL, Y0 - 2, 21, 0, Math.PI);
    else { ctx.moveTo(PR - 19, Y0 - 2); ctx.lineTo(PR, Y0 + 25); ctx.lineTo(PR + 19, Y0 - 2); ctx.closePath(); }
    ctx.fill(); ctx.restore();
  }
  function draw() {
    const { ctx, H } = begin(d.c), t = cy.now();
    const go = beat(t, 0.5, 3.0), fit = beat(go, 0.45, 1), k = model.mix((v) => (v === 'lock' ? 1 : fit));
    const ce = F.ref('enzyme'), cs = F.ref('substrates');
    /* the enzyme: its rim across the top, then the bowl of its body */
    ctx.save(); ctx.beginPath();
    XS.forEach((x, i) => { const y = lerp(looseTop(x), fitTop(x), k); if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y); });
    for (let i = 0; i <= 60; i++) { const a = (Math.PI * i) / 60; ctx.lineTo(700 + 230 * Math.cos(a), Y0 + 150 * Math.sin(a)); }
    ctx.closePath(); ctx.fillStyle = alpha(ce, 0.2); ctx.fill(); ctx.strokeStyle = ce; ctx.lineWidth = 6; ctx.lineJoin = 'round'; ctx.stroke(); ctx.restore();
    hits = [{ x: 700, y: Y0 + 90, r: 90, name: 'enzyme' }, { x: PL, y: Y0 + 12, r: 26, name: 'pocket of the active site for the rounded tip' }, { x: PR, y: Y0 + 12, r: 26, name: 'pocket of the active site for the pointed tip' }];
    SUBS.forEach((s) => {
      const [dx, dy] = offset(s, go);
      substrate(ctx, s, dx, dy, cs);
      hits.unshift({ x: s.box[0] + s.box[2] / 2 + dx, y: s.box[1] + s.box[3] / 2 + dy, r: 60, name: s.name });
    });
    text(ctx, 'enzyme', 700, Y0 + 176, ce, { size: 22, weight: 600, align: 'center' });
    F.label(ctx, 'active site', 626, Y0 + 4, { side: 'left', gap: 170, size: 20 });
    const lx = 1080, ly = 120;
    ctx.save(); ctx.fillStyle = alpha(cs, 0.22); ctx.strokeStyle = cs; ctx.lineWidth = 3; ctx.beginPath(); ctx.roundRect(lx, ly - 14, 40, 28, 8); ctx.fill(); ctx.stroke(); ctx.restore();
    text(ctx, 'substrates', lx + 52, ly, cs, { size: 20, weight: 600 });
    topline(ctx, go >= 1 ? 'The enzyme–substrate complex has formed.' : model.value === 'lock' ? 'The active site already has the shape of the substrates.' : 'The active site changes shape to fit the substrates as they arrive.');
  }
  F.tex(d.readout, '\\htmlData{ref=enzyme}{\\text{enzyme}} + \\htmlData{ref=substrates}{\\text{substrates}} \\longrightarrow \\text{enzyme–substrate complex}');
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();
};
