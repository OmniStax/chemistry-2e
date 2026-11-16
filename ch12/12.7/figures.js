/* Figures for section 12.7 Catalysis. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['12.7'] = function (root, F) {
const { C, PAL, alpha, ctl, register, begin, line, text, topline } = F;
const sim = (id, H) => F.sim(root, id, H);
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;
const clamp01 = (x) => Math.min(1, Math.max(0, x));
/* smooth progress through the part of a story from a to b */
const beat = (t, a, b) => F.ease.smooth(clamp01((t - a) / (b - a)));
const TAU = 2 * Math.PI;
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
   the slower one. Energy axis fixed at 0 to 35 kJ/mol, above the highest
   barrier the slider can reach. Under the diagram a bar on a logarithmic
   scale, 1 to 10⁴ (the slider's lowest barrier gives 3200), says how
   many times faster the catalyzed path is at 298 K with the same
   frequency factor: equal steps of the barrier are equal steps of the
   bar. Still: a reaction diagram has no clock.
===================================================================== */
(function () {
  const d = sim('sim-catalysis', 720);
  const R0 = 6, P0 = 10, EU = 26, RT = 8.314e-3 * 298;
  const ea = ctl(d.controls, { label: '\\htmlClass{kv-energy}{E}_{\\text{a},\\htmlData{ref=catalyzed}{\\text{cat}}}', cls: 'energy', key: 'ea-cat', min: 6, max: 26, step: 1, value: 14, unit: 'kJ/mol', dec: 0, aria: 'activation energy of the catalyzed path, in kilojoules per mole' });
  const path = F.choice(d.controls, { label: '\\text{catalyzed path}', key: 'steps', options: [{ value: 'two', label: 'two steps' }, { value: 'one', label: 'one step' }], value: 'two' });
  const ro = F.readout(d);
  const G = { l: 150, r: 1210, t: 120, b: 510 };
  const BAR = { y: 652, h: 30 }, LOG = 4;
  const uncat = knots([[0, R0], [0.1, R0], [0.5, R0 + EU], [0.88, P0], [1, P0]]);
  const shape = (v, e) => {
    const top = R0 + e;
    if (v === 'one') return { f: knots([[0, R0], [0.1, R0], [0.5, top], [0.88, P0], [1, P0]]), x: 0.5, mid: null, ts: [[0.5, top]] };
    const mid = P0 + 0.45 * (top - P0), p2 = P0 + 0.75 * (top - P0);
    return { f: knots([[0, R0], [0.1, R0], [0.42, top], [0.52, mid], [0.6, p2], [0.88, P0], [1, P0]]), x: 0.42, mid: [0.52, mid], ts: [[0.42, top], [0.6, p2]] };
  };
  const big = (v) => {
    if (v < 999.5) return v < 9.995 ? v.toFixed(2) : v < 99.95 ? v.toFixed(1) : v.toFixed(0);
    const e = Math.floor(Math.log10(v)), m = v / 10 ** e;
    return `${m.toFixed(2)} \\times 10^{${e}}`;
  };
  /* the same number as a reader says it: three figures, no powers of ten below 10⁴ */
  const plain = (v) => String(Number(v.toPrecision(v < 10 ? 2 : 3)));
  const Ecat = '\\htmlClass{kv-energy}{E}_{\\text{a},\\htmlData{ref=catalyzed}{\\text{cat}}}';
  const Eun = '\\htmlClass{kv-energy}{E}_{\\text{a},\\htmlData{ref=uncatalyzed}{\\text{uncat}}}';
  const kcat = '\\kk_{\\htmlData{ref=catalyzed}{\\text{cat}}}', kun = '\\kk_{\\htmlData{ref=uncatalyzed}{\\text{uncat}}}';
  let hits = [];
  F.hover(d.stage, () => hits);
  function draw() {
    const { ctx, H } = begin(d.c), lab = F.labeller(ctx, H, { headline: true });
    const e = ea.v, ce = C('energy'), ck = C('rate-constant'), cu = F.ref('uncatalyzed'), cc = F.ref('catalyzed');
    const ratio = Math.exp((EU - e) / RT);
    const g = F.axes(ctx, G, [0, 1], [0, 35], { nx: 0, ny: 7, xl: 'extent of reaction', yl: 'energy (kJ/mol)', yc: ce });
    line(ctx, g.X(0), g.Y(R0), g.X(0.985), g.Y(R0), alpha(PAL.ink, 0.45), 3, [10, 10]);
    F.curve(ctx, uncat, 0, 1, g.X, g.Y, cu, 5, 220);
    path.curve(ctx, (v) => shape(v, e).f, 0, 1, g.X, g.Y, cc, 5, 220);
    /* the two barriers from the reactants' level, each under its own highest peak, as the book sets its two arrows */
    const xc = g.X(path.mix((v) => shape(v, e).x)) - 20, xu = g.X(0.5) + 20, xh = g.X(0.945);
    F.vbracket(ctx, xc, g.Y(R0), g.Y(R0 + e), ce);
    F.vbracket(ctx, xu, g.Y(R0), g.Y(R0 + EU), ce);
    F.vbracket(ctx, xh, g.Y(R0), g.Y(P0), ce);
    const key = F.legend(ctx, g, [
      { s: `uncatalyzed, $\\kEa = 26\\ \\text{kJ/mol}$`, color: cu, w: 5 },
      { s: `catalyzed, $\\kEa = ${e}\\ \\text{kJ/mol}$`, color: cc, w: 5 },
    ], { corner: 'tl', size: 21 });
    lab.place(key);
    lab.add('E_{a}', xc, g.Y(R0 + Math.min(e / 2, 7)), -1, 0, ce, 24, 16);
    lab.add('E_{a}', xu, g.Y(R0 + EU * 0.8), 1, 0, ce, 24, 16);
    lab.add('ΔH = 4 kJ/mol', xh, g.Y((R0 + P0) / 2), 1, 0, ce, 22, 18);
    lab.add('reactants', g.X(0.05), g.Y(R0), 0, 1, PAL.ink, 22, 24);
    lab.add('products', g.X(0.955), g.Y(P0), 0, -1, PAL.ink, 22, 24);
    lab.flush();
    /* the intermediate in the valley of the two-step path, named below the reactants' level where nothing is drawn */
    const two = shape('two', e), vx = g.X(two.mid[0]), vy = g.Y(two.mid[1]);
    path.only(ctx, 'two', () => {
      line(ctx, vx + 4, vy + 12, vx + 44, g.Y(R0) + 18, alpha(cc, 0.7), 2, [4, 6]);
      text(ctx, 'intermediate', vx + 52, g.Y(R0) + 32, PAL.ink, { size: 22 });
    }, [0, 0]);
    const now = shape(path.value, e);
    hits = [{ x: g.X(0.5), y: g.Y(R0 + EU), r: 26, name: 'transition state of the uncatalyzed path' }]
      .concat(now.ts.map(([x, y], i) => ({ x: g.X(x), y: g.Y(y), r: 22, name: now.ts.length > 1 ? (i ? 'second' : 'first') + ' transition state of the catalyzed path' : 'transition state of the catalyzed path' })))
      .concat(now.mid ? [{ x: g.X(now.mid[0]), y: g.Y(now.mid[1]), r: 22, name: 'intermediate of the catalyzed path, in the valley between its transition states' }] : []);
    /* how many times faster, on a logarithmic scale: the bar grows by the same length for every kJ/mol the barrier falls */
    const BX = (v) => G.l + ((G.r - G.l) * Math.log10(v)) / LOG, by = BAR.y;
    text(ctx, 'times faster than the uncatalyzed path at 298 K', G.l, by - 38, PAL.ink, { size: 20, weight: 600 });
    ctx.save(); ctx.fillStyle = PAL.soft; ctx.fillRect(G.l, by - BAR.h / 2, G.r - G.l, BAR.h); ctx.fillStyle = alpha(ck, 0.75); ctx.fillRect(G.l, by - BAR.h / 2, BX(ratio) - G.l, BAR.h); ctx.restore();
    line(ctx, BX(ratio), by - BAR.h / 2 - 5, BX(ratio), by + BAR.h / 2 + 5, ck, 4);
    ['1', '10', '100', '1000', '10 000'].forEach((s, i) => { const x = BX(10 ** i); line(ctx, x, by + BAR.h / 2, x, by + BAR.h / 2 + 8, PAL.muted, 2); text(ctx, s, x, by + BAR.h / 2 + 24, PAL.muted, { size: 17, align: i === 4 ? 'right' : i ? 'center' : 'left' }); });
    text(ctx, plain(ratio) + '×', BX(ratio) + 14, by, ck, { size: 22, weight: 600 });
    hits.push({ x: (G.l + BX(ratio)) / 2, y: by, r: BAR.h, name: 'the rate constant with the catalyst, as a multiple of the one without' });
    topline(ctx, e >= EU ? 'With equal barriers neither path is faster.' : `Lowering $\\kEa$ by ${EU - e} kJ/mol makes the reaction ${plain(ratio)} times faster; ΔH stays 4 kJ/mol.`);
    ro.set(`\\mk{ratio}{\\frac{${kcat}}{${kun}}} = \\mk{law}{\\exp\\left(\\frac{${Eun} - ${Ecat}}{R\\kT}\\right)} = \\exp\\left(\\frac{(${hue('energy', '26')} - \\mk{ec}{${hue('energy', String(e))}})\\ \\text{kJ/mol}}{(8.314 \\times 10^{-3}\\ \\text{kJ mol}^{-1}\\,\\text{K}^{-1})(${hue('temperature', '298\\ \\text{K}')})}\\right) = \\mk{val}{${big(ratio)}}`);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 12.23: ethylene and hydrogen on a nickel surface, drawn in a
   locked perspective from the book's own viewpoint (the book prints the
   slab in perspective; turning it showed nothing one oblique view does
   not). A story slider runs the book's four steps, a stop at the end of
   each: (a) two H2 molecules land on nickel atoms and come apart, their
   atoms settling in the hollows between four nickel atoms; (b) ethylene
   lies down on the surface, its double bond becoming single as two Ni–C
   bonds form; (c) one hydrogen atom rolls over the surface to each
   carbon and bonds to it; (d) the ethane lifts off and two hydrogen
   atoms stay behind. Scene units: the nickel atoms 0.5 apart, about 5 Å
   per unit, the molecules on the same scale, SC canvas units per scene
   unit. A hydrogen atom on the metal rides at the height where it
   touches the nickel atoms under it (roll), so no atom enters the slab.
   Story time: the steps are the book's panels, not a measured clock.
   Atoms are painted far to near, each bond at the depth of its middle;
   the white and black laid over each ball are its lighting, the same in
   both themes, and code nothing.
===================================================================== */
(function () {
  const d = sim('sim-hydrogenation', 720);
  const st = ctl(d.controls, { label: '\\text{step}', cls: '', key: 'step', min: 0, max: 4, step: 0.01, value: 0, unit: '', dec: 2, aria: 'the steps of the hydrogenation of ethylene on nickel' });
  F.story(d, st, { stops: [{ v: 0, label: 'gases' }, { v: 1, label: '(a) H₂ adsorbed' }, { v: 2, label: '(b) C₂H₄ adsorbed' }, { v: 3, label: '(c) C–H bonds formed' }, { v: 4, label: '(d) C₂H₆ desorbed' }], ms: 2600, rest: 1300 });
  const NI_R = 0.25, NI_Y = -0.13, TOP = NI_Y + NI_R, YC = 0.53, CH = 0.3;
  const RAD = { H: 0.12, C: 0.19, Ni: NI_R };
  const NI = [];
  for (let i = -4; i <= 3; i++) for (let k = -2; k <= 2; k++) NI.push([(i + 0.5) * 0.5, NI_Y, k * 0.5]);
  /* the height of a hydrogen atom's centre where it rests on the nickel atoms under (x, z) */
  const roll = (x, z) => NI.reduce((m, n) => { const q = (NI_R + RAD.H) ** 2 - (x - n[0]) ** 2 - (z - n[2]) ** 2; return q > 0 ? Math.max(m, NI_Y + Math.sqrt(q)) : m; }, NI_Y);
  /* the hydrogen molecules: where each starts, and the hollows (x, z) its atoms settle in; atom a of each goes on to a carbon */
  const HH = [
    { from: [-1.3, 1.2, 0.05], a: [-1.0, 0.25], b: [-1.5, -0.25] },
    { from: [1.35, 1.45, -0.05], a: [1.0, -0.25], b: [1.5, 0.25] },
  ];
  const unit = (p) => { const l = Math.hypot(p[0], p[1], p[2]) || 1; return [p[0] / l, p[1] / l, p[2] / l]; };
  const add = (p, q, k = 1) => [p[0] + q[0] * k, p[1] + q[1] * k, p[2] + q[2] * k];
  /* every atom and bond at story position s, a pure function of it */
  function state(s) {
    const a1 = beat(s, 0, 0.6), a2 = beat(s, 0.6, 1), b1 = beat(s, 1, 1.6), b2 = beat(s, 1.6, 2);
    const c1 = beat(s, 2, 2.75), c2 = beat(s, 2.75, 3), d1 = beat(s, 3, 4);
    const lift = [0, 0.95 * d1, 0];
    const atoms = {}, bonds = [];
    HH.forEach((h, i) => {
      /* the molecule comes down onto the nickel atom between its two hollows, then its atoms slide off into them */
      const mx = (h.a[0] + h.b[0]) / 2, mz = (h.a[1] + h.b[1]) / 2, u = unit([h.b[0] - h.a[0], 0, h.b[1] - h.a[1]]), half = 0.17;
      const c = lerp3(h.from, [mx, roll(mx, mz) + 0.02, mz], a1);
      ['a', 'b'].forEach((id, j) => {
        const p0 = add(c, u, j ? half : -half), site = h[id], x = lerp(p0[0], site[0], a2), z = lerp(p0[2], site[1], a2);
        atoms['h' + i + id] = [x, Math.max(lerp(p0[1], roll(x, z), a2), a1 >= 1 ? roll(x, z) : -9), z];
      });
      bonds.push({ id: 'hh' + i, p: atoms['h' + i + 'a'], q: atoms['h' + i + 'b'], on: a2 < 0.45 });
    });
    /* ethylene falls flat onto the surface, then its C–C bond lengthens and its hydrogens lean up toward the ethane shape */
    const y = lerp(1.5, YC, b1), cc = lerp(0.2, 0.23, b2), lean = 0.5 * b2 + 0.5 * c2;
    const C1 = add([-cc, y, 0], lift), C2 = add([cc, y, 0], lift);
    atoms.c1 = C1; atoms.c2 = C2;
    [[C1, -1], [C2, 1]].forEach(([Cp, sg], ci) => {
      [1, -1].forEach((z, j) => {
        const dir = unit(lerp3([0.5 * sg, 0, 0.866 * z], [0.333 * sg, 0.471, 0.816 * z], lean));
        const p = add(Cp, dir, CH); atoms['e' + ci + j] = p;
        bonds.push({ id: 'ce' + ci + j, p: Cp, q: p, on: true });
      });
      /* the hydrogen atom that travels to this carbon: over the surface from its hollow to the nickel atom beside the carbon, where the third C–H bond of a tetrahedral carbon points */
      const h = atoms['h' + ci + 'a'], to = add(Cp, [0.333 * sg, -0.943, 0], CH);
      if (c1 > 0) { const x = lerp(h[0], to[0], c1), z = lerp(h[2], to[2], c1); atoms['h' + ci + 'a'] = d1 > 0 ? to : [x, lerp(roll(x, z), to[1], c2), z]; }
      bonds.push({ id: 'ch' + ci, p: Cp, q: atoms['h' + ci + 'a'], on: c2 > 0.3 });
      /* the Ni–C bond that forms as the π bond breaks and lets go as the product leaves */
      bonds.push({ id: 'nic' + ci, p: Cp, q: lerp3(Cp, [0.25 * sg, TOP, 0], b2), on: b2 > 0.02 && d1 === 0 });
    });
    /* the double bond: two rods, one above the other, that close into one as the π bond breaks */
    const gap = 0.05 * (1 - b2);
    bonds.push({ id: 'cc0', p: add(C1, [0, gap, 0]), q: add(C2, [0, gap, 0]), on: true });
    bonds.push({ id: 'cc1', p: add(C1, [0, -gap, 0]), q: add(C2, [0, -gap, 0]), on: gap > 0.004 });
    return { atoms, bonds, step: Math.min(3, Math.max(0, Math.ceil(s - 1e-6) - 1)) };
  }
  const STEPS = [
    '(a) Hydrogen is adsorbed on the surface, breaking the H–H bonds and forming Ni–H bonds.',
    '(b) Ethylene is adsorbed on the surface, breaking the C–C π-bond and forming Ni–C bonds.',
    '(c) Atoms diffuse across the surface and form new C–H bonds when they collide.',
    '(d) C_{2}H_{6} molecules desorb from the Ni surface.',
  ];
  const KIND = { h: 'H', c: 'C', e: 'H' };
  const NAME = { H: 'a hydrogen atom, H', C: 'a carbon atom, C' };
  const YAW = 0.3, PITCH = 0.62, DIST = 3000, SC = 216;
  const V = F.view({ yaw: YAW, pitch: PITCH, dist: DIST, cx: 690, cy: 418 });
  /* a scene point to the canvas, and its depth along the line of sight (larger is farther) */
  const cam = [DIST * Math.sin(YAW) * Math.cos(PITCH), DIST * Math.sin(PITCH), DIST * Math.cos(YAW) * Math.cos(PITCH)];
  const P = (p) => V.P([p[0] * SC, p[1] * SC, p[2] * SC]);
  const depth = (p) => Math.hypot(p[0] * SC - cam[0], p[1] * SC - cam[1], p[2] * SC - cam[2]);
  const rOf = (p, r) => (r * SC * DIST) / depth(p);
  let hits = []; F.hover(d.stage, () => hits);
  /* a lit ball: the element's colour, a highlight toward the lamp at the upper left, shade toward the rim */
  function lit(ctx, x, y, rr, el) {
    ctx.save(); ctx.beginPath(); ctx.arc(x, y, rr, 0, TAU); ctx.fillStyle = F.el(el); ctx.fill();
    const g = ctx.createRadialGradient(x - rr * 0.36, y - rr * 0.42, rr * 0.04, x - rr * 0.1, y - rr * 0.12, rr * 1.12);
    g.addColorStop(0, 'rgba(255,255,255,0.6)'); g.addColorStop(0.3, 'rgba(255,255,255,0.14)'); g.addColorStop(0.62, 'rgba(0,0,0,0.02)'); g.addColorStop(1, 'rgba(0,0,0,0.42)');
    ctx.fillStyle = g; ctx.fill(); ctx.strokeStyle = alpha(PAL.ink, 0.55); ctx.lineWidth = 1.2; ctx.stroke(); ctx.restore();
  }
  function slab(ctx) {
    /* the block of metal under the top layer of atoms: its top, front and right faces */
    const x0 = -2, x1 = 2, z0 = -1.25, z1 = 1.25, yt = NI_Y, yb = NI_Y - 0.3;
    const q = (x, y, z) => P([x, y, z]);
    const faceOf = (pts, k) => { ctx.save(); ctx.beginPath(); pts.forEach((pt, i) => (i ? ctx.lineTo(pt[0], pt[1]) : ctx.moveTo(pt[0], pt[1]))); ctx.closePath(); ctx.fillStyle = F.el('Ni'); ctx.fill(); ctx.fillStyle = `rgba(0,0,0,${k})`; ctx.fill(); ctx.strokeStyle = alpha(PAL.ink, 0.6); ctx.lineWidth = 1.5; ctx.lineJoin = 'round'; ctx.stroke(); ctx.restore(); };
    faceOf([q(x0, yt, z0), q(x1, yt, z0), q(x1, yt, z1), q(x0, yt, z1)], 0.3);
    faceOf([q(x0, yt, z1), q(x1, yt, z1), q(x1, yb, z1), q(x0, yb, z1)], 0.22);
    faceOf([q(x1, yt, z1), q(x1, yt, z0), q(x1, yb, z0), q(x1, yb, z1)], 0.4);
  }
  /* a name beside a molecule while it is at rest in the gas, fading as it moves off */
  const named = (ctx, a, s, p, dx, align) => F.faded(ctx, a, [0, 0], () => { const [x, y] = P(p); text(ctx, s, x + dx, y, PAL.ink, { size: 22, align }); });
  function draw() {
    const s = st.v, S = state(s), { ctx } = begin(d.c);
    hits = [];
    topline(ctx, STEPS[S.step]);
    slab(ctx);
    const items = [];
    NI.forEach((p) => items.push({ z: depth(p), p, el: 'Ni', r: NI_R }));
    Object.keys(S.atoms).forEach((id) => { const el = KIND[id[0]], p = S.atoms[id]; items.push({ z: depth(p), p, el, r: RAD[el], name: NAME[el] }); });
    S.bonds.forEach((b) => { if (b.on) { const m = [(b.p[0] + b.q[0]) / 2, (b.p[1] + b.q[1]) / 2, (b.p[2] + b.q[2]) / 2]; items.push({ z: depth(m) + 1, bond: b }); } });
    items.sort((u, w) => w.z - u.z);
    for (const it of items) {
      if (it.bond) {
        const b = it.bond, [x1, y1] = P(b.p), [x2, y2] = P(b.q), ni = b.id.startsWith('nic');
        line(ctx, x1, y1, x2, y2, ni ? alpha(PAL.ink, 0.55) : PAL.ink, ni ? 5 : 9);
        continue;
      }
      const [x, y] = P(it.p), rr = rOf(it.p, it.r);
      lit(ctx, x, y, rr, it.el);
      if (it.el !== 'Ni') hits.push({ x, y, r: rr + 4, name: it.name });
    }
    const corner = P([-2, NI_Y - 0.15, 1.25]);
    text(ctx, 'Ni surface', corner[0] - 16, corner[1], PAL.ink, { size: 22, align: 'right' });
    const gas = 1 - beat(s, 0.03, 0.3);
    named(ctx, gas, 'hydrogen, H₂', add(HH[0].from, [0, 0.2, 0]), 0, 'center');
    named(ctx, 1 - beat(s, 1.03, 1.3), 'ethylene, C₂H₄', [0, 1.5, 0], 150, 'left');
    named(ctx, beat(s, 3.7, 3.98), 'ethane, C₂H₆', [0, YC + 0.95, 0], 160, 'left');
    hits.push({ x: 690, y: P([0, NI_Y, 0])[1] + 40, r: 120, name: 'the nickel catalyst, a solid' });
    F.legend(ctx, { l: 1060, r: 1384, t: 84, b: 300 }, ['Ni', 'C', 'H'].map((e) => ({ s: { Ni: 'nickel', C: 'carbon', H: 'hydrogen' }[e], draw: (c, x, y) => lit(c, x, y, { Ni: 12, C: 10.5, H: 8 }[e], e) })), { corner: 'tr', size: 20 });
  }
  F.tex(d.readout, '\\text{C}_{2}\\text{H}_{4}(g) + \\text{H}_{2}(g) \\xrightarrow{\\ \\text{Ni}\\ } \\text{C}_{2}\\text{H}_{6}(g)');
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 12.25: the two models of an enzyme's active site, side by side
   on one story slider that brings two substrates down onto each enzyme.
   Each substrate carries a tip, one round and one pointed, as the book
   draws them. The lock-and-key enzyme has a pocket of each tip's shape
   from the start and never changes; the induced-fit enzyme opens with
   two shallow dips that fit neither tip and takes the tips' shapes as
   they push in, its shoulders rising round them. Both end as the same
   enzyme-substrate complex. fit (0 to 1) blends the shallow dips into
   the exact pockets. Story time: binding has no measured clock here.
===================================================================== */
(function () {
  const d = sim('sim-enzyme', 640);
  const st = ctl(d.controls, { label: '\\text{binding}', cls: '', key: 'binding', min: 0, max: 1, step: 0.005, value: 0, unit: '', dec: 2, aria: 'how far the substrates have come toward the active site' });
  F.story(d, st, { stops: [{ v: 0, label: 'substrates apart' }, { v: 1, label: 'complex formed' }], ms: 4200, rest: 1800 });
  const TY = 372, FLOOR = 16, PX = 50, TIP = 27, VEE = 42, NECK = 16, SITE = 104;
  const MODELS = [{ id: 'key', x: 370, name: 'lock-and-key model' }, { id: 'fit', x: 1030, name: 'induced fit model' }];
  /* how deep the site is below its floor at u (−1 to 1 across a pocket): a shallow dip blended into the tip's own shape */
  const dip = (u) => 11 * (1 + Math.cos(Math.PI * u)) / 2;
  const pocket = [(u, m) => lerp(dip(u), TIP * Math.sqrt(Math.max(0, 1 - u * u)), m), (u, m) => lerp(dip(u), VEE * (1 - Math.abs(u)), m)];
  /* the enzyme's outline about (cx, TY), its active site at fit m */
  function enzymePath(ctx, cx, m) {
    const ty = TY + 9 * (1 - m), yf = TY + FLOOR, X = (x) => cx + x;
    ctx.beginPath(); ctx.moveTo(X(-SITE), yf);
    [-1, 1].forEach((sg, i) => { for (let k = 0; k <= 40; k++) { const u = -1 + k / 20; ctx.lineTo(X(sg * PX + u * TIP), yf + pocket[i](u, m)); } });
    ctx.lineTo(X(SITE), yf); ctx.lineTo(X(SITE), ty + 7); ctx.quadraticCurveTo(X(SITE), ty, X(SITE + 8), ty);
    ctx.bezierCurveTo(X(140), ty, X(158), ty + 22, X(176), ty + 54);
    ctx.bezierCurveTo(X(212), ty + 108, X(222), TY + 160, X(156), TY + 180);
    ctx.bezierCurveTo(X(92), TY + 200, X(-92), TY + 200, X(-156), TY + 180);
    ctx.bezierCurveTo(X(-222), TY + 160, X(-212), ty + 108, X(-176), ty + 54);
    ctx.bezierCurveTo(X(-158), ty + 22, X(-140), ty, X(-SITE - 8), ty);
    ctx.quadraticCurveTo(X(-SITE), ty, X(-SITE), ty + 7); ctx.closePath();
  }
  /* one substrate about its tip's seat (0, 0): sg −1 the left one with the round tip, +1 the right one with the pointed tip */
  function substrate(ctx, x, y, rot, sg, col) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(-sg, 1); ctx.lineJoin = 'round';
    /* the body: a dome with one flat side, which meets the other substrate's flat side in the complex */
    ctx.beginPath(); ctx.moveTo(PX - 3, -NECK); ctx.lineTo(PX - 3, -132); ctx.bezierCurveTo(-18, -132, -62, -100, -62, -52); ctx.lineTo(-62, -34); ctx.quadraticCurveTo(-62, -NECK, -44, -NECK); ctx.closePath();
    ctx.fillStyle = alpha(col, 0.25); ctx.fill(); ctx.strokeStyle = col; ctx.lineWidth = 4; ctx.stroke();
    /* the neck and the tip that binds */
    ctx.beginPath(); ctx.moveTo(-15, -NECK); ctx.lineTo(-15, 0);
    if (sg < 0) { ctx.lineTo(-TIP, 0); ctx.arc(0, 0, TIP, Math.PI, 0, true); } else { ctx.lineTo(-TIP, 0); ctx.lineTo(0, VEE); ctx.lineTo(TIP, 0); }
    ctx.lineTo(15, 0); ctx.lineTo(15, -NECK); ctx.closePath();
    ctx.fillStyle = alpha(col, 0.85); ctx.fill(); ctx.stroke();
    ctx.restore();
  }
  let hits = []; F.hover(d.stage, () => hits);
  function draw() {
    const k = st.v, { ctx } = begin(d.c), ce = F.ref('enzyme'), cs = F.ref('substrates');
    /* the substrates swing in over the site, then come straight down into it; the induced-fit site reshapes as the tips push in */
    const q1 = beat(k, 0, 0.55), q2 = beat(k, 0.55, 0.95), fit = Math.min(1, 1.3 * q2), yf = TY + FLOOR;
    hits = [];
    topline(ctx, k < 0.5 ? 'Before the substrates arrive, only the lock-and-key active site has their shape.' : k < 0.95 ? 'The induced-fit active site changes shape as the substrates push in.' : 'Either way, the substrates end bound in the same enzyme-substrate complex.');
    MODELS.forEach((M) => {
      const m = M.id === 'key' ? 1 : fit;
      text(ctx, M.name, M.x, 104, PAL.ink, { size: 24, weight: 600, align: 'center' });
      enzymePath(ctx, M.x, m);
      ctx.save(); ctx.fillStyle = alpha(ce, 0.2); ctx.fill(); ctx.strokeStyle = ce; ctx.lineWidth = 8; ctx.lineJoin = 'round'; ctx.stroke(); ctx.restore();
      [-1, 1].forEach((sg) => {
        const x = M.x + sg * PX + sg * lerp(150, 0, q1), y = yf - lerp(lerp(96, 62, q1), 0, q2), rot = sg * 0.45 * (1 - q1);
        substrate(ctx, x, y, rot, sg, cs);
        hits.push({ x: x - sg * 4, y: y - 76, r: 56, name: 'a substrate, a reactant molecule' }, { x, y: y + 14, r: 26, name: sg < 0 ? 'the round tip of this substrate, which binds in the active site' : 'the pointed tip of this substrate, which binds in the active site' });
      });
      text(ctx, 'enzyme', M.x, TY + 150, ce, { size: 22, weight: 600, align: 'center' });
      line(ctx, M.x, yf + 12, M.x, yf + 52, alpha(PAL.ink, 0.5), 1.5, [5, 6]);
      text(ctx, 'active site', M.x, yf + 68, PAL.ink, { size: 20, align: 'center' });
      F.faded(ctx, 1 - beat(k, 0.02, 0.18), [0, 0], () => text(ctx, 'substrates', M.x, yf - 200, cs, { size: 22, weight: 600, align: 'center' }));
      const says = M.id === 'key' ? 'The active site has the proper shape from the start.' : fit <= 0 ? 'The active site does not have the proper shape yet.' : fit < 1 ? 'The active site is changing to fit.' : 'The active site has changed to fit.';
      text(ctx, says, M.x, TY + 240, PAL.ink, { size: 20, align: 'center' });
      hits.push({ x: M.x, y: yf + 16, r: 44, name: 'the active site of the enzyme' }, { x: M.x, y: TY + 120, r: 80, name: 'the enzyme' });
    });
  }
  F.tex(d.readout, '\\htmlData{ref=enzyme}{\\text{enzyme}} + \\htmlData{ref=substrates}{\\text{substrates}} \\longrightarrow \\text{enzyme-substrate complex}');
  register(d.fig, { update: () => {}, draw });
})();

};
