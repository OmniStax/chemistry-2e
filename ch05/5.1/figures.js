/* Figures for section 5.1 Energy Basics. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['5.1'] = function (root, F) {
const { el, fmt, tex, C, PAL, alpha, ctl, cycle, register, begin, line, arrow, dot, text, topline, axes, pinned, label } = F;
const sim = (id, H) => F.sim(root, id, H);
function readout(host, main, small, o) { tex(host, main, false, o); if (small) host.appendChild(el('small', null, small)); }
/* a live number wrapped in the hue of its type, for the readouts */
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;
/* a deterministic scatter in 0..1, so a rebuild puts every molecule back where it was */
const rnd = (i) => { const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453; return x - Math.floor(x); };
/* three significant figures with thousands separators, as the book writes 18,140 J */
const sig3 = (x) => { const r = Number(Math.abs(x).toPrecision(3)); return (x < 0 ? '−' : '') + r.toLocaleString('en-US', { maximumFractionDigits: Math.max(0, 2 - Math.floor(Math.log10(r || 1))) }); };

/* =====================================================================
   FIGURE 5.4 + 5.6: two equal samples of water, H and L, as boxes of
   fourteen molecules each. For the first second they stand apart at
   their own temperatures; then they slide into contact and heat flows
   from H to L, each temperature relaxing exponentially to the mean (equal
   masses of one substance), while a heat arrow over the contact face
   shrinks with the difference. The molecules jiggle about fixed sites,
   the rate and the reach of the motion set by their box's temperature;
   the phase is the time integral of that rate, so the motion is a pure
   function of the clock and scrubs both ways. The speed is drawn growing
   far faster with temperature than the true square-root law, so the
   difference can be seen; the note under the readout says so.
   Moving: heat flow has a clock, 7 s a loop. Physical 3D by the book's
   rule for a particle picture: glass boxes with no ground, so the orbit
   is bounded to yaw ±0.9 and pitch −0.3 to 1.2, which keeps H on the
   left of L and the contact face in sight; no idle spin, since the clock
   already moves the scene. Without WebGL the strip draws the boxes flat.
===================================================================== */
(function () {
  const d = sim('sim-heat-flow');
  const v = F.view3d(d.stage, { h: 340, dist: 4.3, tilt: 0.3, spin: 'none', pitch: [-0.3, 1.2], yaw: [-0.9, 0.9],
    views: [{ label: 'front', yaw: 0, pitch: 0.3 }, { label: 'above', yaw: 0, pitch: 1.2 }] });
  const has3 = !!v.scene;
  if (!has3) v.wrap.style.display = 'none';
  const FLAT = has3 ? 0 : 300, cnv = F.makeCanvas(d.stage, 380 + FLAT);
  const TH = ctl(d.controls, { label: '\\kT_{\\htmlData{ref=sample-h}{\\text{H}}}', cls: 'temperature', min: 0, max: 100, step: 1, value: 80, unit: '°C', dec: 0, aria: 'starting temperature of sample H', onInput: () => cy.reset() });
  const TL = ctl(d.controls, { label: '\\kT_{\\htmlData{ref=sample-l}{\\text{L}}}', cls: 'temperature', min: 0, max: 100, step: 1, value: 10, unit: '°C', dec: 0, aria: 'starting temperature of sample L', onInput: () => cy.reset() });
  const LOOP = 7, TC = 1, SLIDE = 0.6, TAU = 1.1, N = 14, S = 1.3, GAP = 0.7;
  const cy = cycle(() => LOOP, 1.2);
  const mean = () => (TH.v + TL.v) / 2;
  /* the temperature of a sample that started at T0, t seconds into the loop */
  const temp = (T0, t) => (t < TC ? T0 : mean() + (T0 - mean()) * Math.exp(-(t - TC) / TAU));
  /* the jiggle's phase, the integral of its rate 1.2 + 0.075 T rad/s from the start of the loop */
  const phase = (T0, t) => {
    const Tm = mean(), a = Math.min(t, TC), b = Math.max(0, t - TC);
    return 1.2 * t + 0.075 * (T0 * a + Tm * b + (T0 - Tm) * TAU * (1 - Math.exp(-b / TAU)));
  };
  const reach = (T) => 0.03 + 0.0011 * T;
  /* the half-gap between the two boxes, closing over the SLIDE seconds before contact */
  const half = (t) => (GAP / 2) * Math.min(1, Math.max(0, (TC - t) / SLIDE));
  /* each molecule: a site in its box on a jittered 3 by 3 by 2 grid less four corners, three rates and three offsets for its jiggle, and a tumble */
  const SITES = (() => {
    const out = []; let k = 0;
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) for (let l = 0; l < 2; l++) {
      if ([0, 8, 11, 17].includes(i * 6 + j * 2 + l)) continue;
      const q = out.length;
      out.push({ p: [(i - 1) * 0.36 + (rnd(q * 7) - 0.5) * 0.12, (j - 1) * 0.36 + (rnd(q * 7 + 1) - 0.5) * 0.12, (l - 0.5) * 0.42 + (rnd(q * 7 + 2) - 0.5) * 0.12],
        f: [0.7 + 0.6 * rnd(q * 7 + 3), 0.7 + 0.6 * rnd(q * 7 + 4), 0.7 + 0.6 * rnd(q * 7 + 5)], a: [rnd(q * 3 + 40) * 6.3, rnd(q * 3 + 41) * 6.3, rnd(q * 3 + 42) * 6.3], r: rnd(q * 7 + 6) * 6.3 });
      k++;
    }
    return out.slice(0, N);
  })();
  const offset = (s, ph, A) => s.f.map((f, i) => A * (Math.sin(f * ph + s.a[i]) * 0.7 + Math.sin(1.9 * f * ph + 2 * s.a[i]) * 0.3));

  /* ---------- the scene ---------- */
  const grp = has3 ? v.part(0) : null;
  let sig = '', boxes = [], mols = [], heat = null, heatLab = null, boxLab = [];
  const SAMPLE = ['sample-h', 'sample-l'];
  const palSig = () => [PAL.ink, PAL.panel, PAL.soft, F.el('O'), F.el('H'), C('energy'), ...SAMPLE.map((r) => F.ref(r))].join('|');
  function water(g, who) {
    const m = new window.THREE.Group(), of = 'a water molecule of sample ' + who, h = 0.912, b = 0.16;
    v.pickable(F.mesh.sphere(m, [0, 0, 0], 0.085, F.el('O')), 'oxygen atom of ' + of);
    [-h, h].forEach((q) => { const p = [b * Math.sin(q), b * Math.cos(q), 0]; F.mesh.stick(m, [0, 0, 0], p, 0.022, PAL.ink); v.pickable(F.mesh.sphere(m, p, 0.055, F.el('H')), 'hydrogen atom of ' + of); });
    g.add(m); return m;
  }
  function build() {
    if (!has3) return;
    const key = palSig(); if (key === sig) return; sig = key;
    v.clear(); boxes = []; mols = []; boxLab = [];
    ['H', 'L'].forEach((who, bi) => {
      const g = new window.THREE.Group(); grp.add(g); boxes.push(g);
      const glass = F.mesh.box(g, [0, 0, 0], [S, S, S], PAL.ink, { transparent: true, opacity: 0.07, depthWrite: false, side: window.THREE.DoubleSide });
      glass.renderOrder = 2; v.pickable(glass, 'sample ' + who + ', a box of water');
      const rc = F.ref(SAMPLE[bi]);
      g.add(new window.THREE.LineSegments(new window.THREE.EdgesGeometry(new window.THREE.BoxGeometry(S, S, S)), new window.THREE.LineBasicMaterial({ color: new window.THREE.Color(rc) })));
      mols.push(SITES.map(() => water(g, who)));
      const lab = v.label(who, [0, -S / 2, 0], g, -26); lab.style.color = rc; boxLab.push(lab);
    });
    heat = new window.THREE.Group(); grp.add(heat);
    F.mesh.arrow(heat, [-0.5, 0, 0], [0.5, 0, 0], 0.05, C('energy'));
    heat.position.set(0, S / 2 + 0.18, 0);
    heatLab = v.label('heat, q', [-0.9, S / 2 + 0.18, 0], grp, -12);
  }
  function place(t) {
    if (!has3) return;
    const x = S / 2 + half(t);
    [[TH.v, -x], [TL.v, x]].forEach(([T0, bx], bi) => {
      const g = boxes[bi]; g.position.set(bx, 0, 0);
      const ph = phase(T0, t), A = reach(temp(T0, t));
      mols[bi].forEach((m, i) => { const s = SITES[i], o = offset(s, ph, A); m.position.set(s.p[0] + o[0], s.p[1] + o[1], s.p[2] + o[2]); m.rotation.set(s.r + 0.6 * ph * s.f[0], s.r * 0.5 + 0.5 * ph * s.f[1], 0.4 * ph * s.f[2]); });
    });
    const dT = temp(TH.v, t) - temp(TL.v, t), k = t < TC ? 0 : Math.min(1, Math.abs(dT) / 40);
    heat.visible = k > 0.03; heat.scale.set(Math.max(0.2, k) * Math.sign(dT || 1), Math.max(0.2, k), Math.max(0.2, k));
    heatLab.style.visibility = heat.visible ? '' : 'hidden';
    v.invalidate();
  }
  /* the same samples drawn flat when the browser has no WebGL */
  function flat(ctx, t) {
    const sc = 170, cx = 700, cyy = 170 + 40, x = S / 2 + half(t);
    [[TH.v, -x, 'H'], [TL.v, x, 'L']].forEach(([T0, bx, who], bi) => {
      const X0 = cx + bx * sc, ph = phase(T0, t), A = reach(temp(T0, t)), rc = F.ref(SAMPLE[bi]);
      ctx.save(); ctx.strokeStyle = rc; ctx.lineWidth = 2; ctx.strokeRect(X0 - (S / 2) * sc, cyy - (S / 2) * sc, S * sc, S * sc); ctx.restore();
      text(ctx, who, X0, cyy + (S / 2) * sc + 26, rc, { size: 22, weight: 600, align: 'center' });
      SITES.forEach((s) => { const o = offset(s, ph, A); dot(ctx, X0 + (s.p[0] + o[0]) * sc, cyy - (s.p[1] + o[1]) * sc, F.el('O'), true, 12); });
    });
  }
  function draw() {
    build();
    const t = cy.now(), h = temp(TH.v, t), l = temp(TL.v, t), dT = h - l;
    place(t);
    const { ctx } = begin(cnv);
    if (!has3) flat(ctx, t);
    /* the graph: 0 to 7 s by 1, 0 to 100 °C by 20, fixed from the loop and the slider range */
    const box = { l: 160, r: 1300, t: FLAT + 130, b: FLAT + 300 }, ct = C('temperature');
    const g = axes(ctx, box, [0, LOOP], [0, 100], { xl: 'time (s)', yl: 'temperature (°C)', yc: ct, nx: 7, ny: 5 });
    line(ctx, g.X(TC), box.t, g.X(TC), box.b, alpha(PAL.ink, 0.35), 2, [4, 8]);
    /* the contact tag in the widest clear band between the two flat traces and the frame */
    const lv = [0, TL.v, TH.v, 100].sort((a, b) => a - b), gi = lv.slice(1).reduce((bi, x, i) => (x - lv[i] > lv[bi + 1] - lv[bi] ? i : bi), 0);
    text(ctx, 'contact', g.X(TC) + 8, g.Y((lv[gi] + lv[gi + 1]) / 2) + 5, PAL.muted, { size: 16 });
    const rH = F.ref('sample-h'), rL = F.ref('sample-l');
    const trace = (T0, col) => { const n = 80, pts = []; for (let i = 0; i <= n; i++) { const s = (t * i) / n; pts.push([g.X(s), g.Y(temp(T0, s))]); } ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = 5; ctx.lineJoin = 'round'; ctx.beginPath(); pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.stroke(); ctx.restore(); };
    trace(TH.v, rH); trace(TL.v, rL);
    dot(ctx, g.X(t), g.Y(h), rH, true, 9); dot(ctx, g.X(t), g.Y(l), rL, true, 9);
    const apart = Math.abs(g.Y(h) - g.Y(l)) > 30;
    text(ctx, 'H', g.X(t) + 16, g.Y(h) + (apart ? 0 : (h >= l ? -12 : 12)), rH, { size: 20, weight: 600, bg: PAL.panel });
    text(ctx, 'L', g.X(t) + 16, g.Y(l) + (apart ? 0 : (h >= l ? 12 : -12)), rL, { size: 20, weight: 600, bg: PAL.panel });
    if (t > TC && Math.abs(dT) < 2) {
      line(ctx, g.X(TC), g.Y(mean()), box.r, g.Y(mean()), alpha(PAL.ink, 0.35), 2, [10, 10]);
      text(ctx, 'thermal equilibrium', box.r, g.Y(mean()) + (mean() > 80 ? 22 : -18), PAL.muted, { size: 16, align: 'right' });
    }
    const flowing = t >= TC && Math.abs(dT) >= 0.5;
    const hot = dT >= 0 ? 'H' : 'L', cold = dT >= 0 ? 'L' : 'H';
    const H = t < TC ? `H is at ${fmt(h, 0)} °C and L at ${fmt(l, 0)} °C, and the two are not yet in contact.`
      : flowing ? `Heat flows from ${hot} to ${cold}: ${hot} has cooled to ${fmt(Math.max(h, l), 0)} °C and ${cold} has warmed to ${fmt(Math.min(h, l), 0)} °C.`
      : `Both samples are at ${fmt(mean(), 0)} °C, so they are in thermal equilibrium and heat no longer flows.`;
    topline(ctx, H);
    readout(d.readout, `\\kT_{\\htmlData{ref=sample-h}{\\text{H}}} = ${hue('temperature', fmt(h, 0) + '\\ {}^{\\circ}\\text{C}')} \\qquad \\kT_{\\htmlData{ref=sample-l}{\\text{L}}} = ${hue('temperature', fmt(l, 0) + '\\ {}^{\\circ}\\text{C}')}`,
      'The molecules are drawn speeding up with temperature far more than they truly do, so that the difference can be seen; their average kinetic energy grows in proportion to the kelvin temperature.', { values: false });
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();

/* =====================================================================
   SIM: heating a sample, q = c × m × ΔT. A substance from Table 5.1, a
   mass and a temperature change; the heat is a point on the straight
   line q = C ΔT whose slope is the heat capacity C = c × m. The small
   and the large frying pan of the text (808 g and 4040 g) are detents
   on the mass slider and faint dashed lines on the graph, fivefold apart
   in slope for any one substance. Still: the relation has no clock.
   Flat: a relation between quantities.
===================================================================== */
(function () {
  const d = sim('sim-heating', 520);
  /* Table 5.1: name, formula as figure text, state, specific heat in J/g °C */
  const SUBS = [['helium', 'He', 'g', 5.193], ['water', 'H_{2}O', 'l', 4.184], ['ethanol', 'C_{2}H_{6}O', 'l', 2.376], ['ice', 'H_{2}O', 's', 2.093], ['water vapor', 'H_{2}O', 'g', 1.864],
    ['nitrogen', 'N_{2}', 'g', 1.040], ['air', '', 'g', 1.007], ['oxygen', 'O_{2}', 'g', 0.918], ['aluminum', 'Al', 's', 0.897], ['carbon dioxide', 'CO_{2}', 'g', 0.853], ['argon', 'Ar', 'g', 0.522],
    ['iron', 'Fe', 's', 0.449], ['copper', 'Cu', 's', 0.385], ['lead', 'Pb', 's', 0.130], ['gold', 'Au', 's', 0.129], ['silicon', 'Si', 's', 0.712]];
  const sub = F.select(d.controls, { label: '\\text{substance}', aria: 'substance heated', value: '11', options: SUBS.map((s, i) => ({ value: String(i), label: s[0] })) });
  const M = ctl(d.controls, { label: '\\km', cls: 'mass', min: 100, max: 5000, step: 1, value: 808, unit: 'g', dec: 0, aria: 'mass of the sample', detents: [{ v: 808, label: 'small pan' }, { v: 4040, label: 'large pan' }] });
  const DT = ctl(d.controls, { label: '\\kdT', cls: 'temperature', min: 0, max: 100, step: 0.5, value: 50, unit: '°C', dec: 1, aria: 'temperature change' });
  const PANS = [808, 4040], PANREF = ['small-pan', 'large-pan'];
  let hits = []; F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c); hits = [];
    const [name, , state, c] = SUBS[+sub.value], m = M.v, dt = DT.v, q = c * m * dt, Cap = c * m;
    const ce = C('energy'), ct = C('temperature'), cm = C('mass'), cc = C('heat-capacity');
    /* ---------- the sample, sized by the cube root of its mass, over its heat arrow ---------- */
    const sx = 300, base = 360, w = 90 + 170 * Math.cbrt(m / 5000), hgt = w * 0.62;
    ctx.save(); ctx.fillStyle = PAL.soft; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3;
    if (state === 's') { ctx.fillRect(sx - w / 2, base - hgt, w, hgt); ctx.strokeRect(sx - w / 2, base - hgt, w, hgt); }
    else if (state === 'l') {
      const bw = w + 30, bh = hgt + 40; ctx.fillRect(sx - w / 2 - 12, base - hgt, w + 24, hgt);
      ctx.beginPath(); ctx.moveTo(sx - bw / 2, base - bh); ctx.lineTo(sx - bw / 2, base); ctx.lineTo(sx + bw / 2, base); ctx.lineTo(sx + bw / 2, base - bh); ctx.stroke();
    } else {
      const r = w * 0.42; ctx.globalAlpha = 0.6; ctx.beginPath(); ctx.ellipse(sx, base - r, r, r, 0, 0, 2 * Math.PI); ctx.fill(); ctx.globalAlpha = 1; ctx.stroke();
      ctx.strokeRect(sx - 14, base - 2 * r - 22, 28, 22);
    }
    ctx.restore();
    const top = state === 'g' ? base - w * 0.84 - 22 : state === 'l' ? base - hgt - 40 : base - hgt;
    hits.push({ x: sx, y: (top + base) / 2, r: w / 2, name: fmt(m, 0) + ' g of ' + name + (state === 'g' ? ', a gas in a sealed vessel' : state === 'l' ? ', a liquid in a beaker' : '') });
    text(ctx, fmt(m, 0) + ' g of ' + name, sx, top - 26, cm, { size: 22, weight: 600, align: 'center' });
    /* the heat arrow: 0 to 100 kJ over 20 to 120 units, past that held at full length */
    const L = 20 + 100 * Math.min(1, q / 100000);
    if (q > 0) arrow(ctx, sx, base + 30 + L, sx, base + 8, ce, 5);
    text(ctx, 'q = ' + sig3(q) + ' J', sx + 20, base + 30 + L / 2 + 4, ce, { size: 22, weight: 600 });
    /* ---------- the graph: ΔT 0 to 100 °C by 20, q 0 to 100 kJ by 20, fixed from the slider range and the two pans of iron ---------- */
    const box = { l: 640, r: 1320, t: 120, b: 430 };
    const g = axes(ctx, box, [0, 100], [0, 100], { xl: 'ΔT (°C)', xc: ct, yl: 'q (kJ)', yc: ce, nx: 5, ny: 5 });
    const ray = (cap, color, wd, dash) => { const x1 = Math.min(100, 100000 / cap); line(ctx, g.X(0), g.Y(0), g.X(x1), g.Y((cap * x1) / 1000), color, wd, dash); return x1; };
    PANS.forEach((pm, pi) => {
      const x1 = ray(c * pm, F.ref(PANREF[pi]), 3, [10, 10]);
      const px = g.X(x1 * 0.8), py = g.Y((c * pm * x1 * 0.8) / 1000);
      hits.push({ x: px, y: py, r: 14, name: (pm === 808 ? 'the small pan' : 'the large pan') + ', ' + pm + ' g of ' + name + ', C = ' + sig3(c * pm) + ' J/°C' });
    });
    const xe = ray(Cap, ce, 5);
    line(ctx, g.X(Math.min(dt, 100)), box.b, g.X(Math.min(dt, 100)), g.Y(Math.min(100, q / 1000)), alpha(ct, 0.7), 2, [4, 8]);
    const p = pinned(ctx, box, g.X, g.Y, dt, q / 1000, ce, sig3(q / 1000) + ' kJ');
    const sx2 = g.X(xe * 0.5), sy2 = g.Y((Cap * xe * 0.5) / 1000);
    label(ctx, 'slope C = ' + sig3(Cap) + ' J/°C', sx2, sy2, { side: xe < 60 ? 'right' : 'above', gap: 26, color: cc, size: 18 });
    if (!p.out) hits.push({ x: p.x, y: p.y, r: 12, name: 'q = ' + sig3(q) + ' J at ΔT = ' + fmt(dt, 1) + ' °C' });
    topline(ctx, 'Heating ' + fmt(m, 0) + ' g of ' + name + ' by ' + fmt(dt, 1) + ' °C takes ' + sig3(q / 1000) + ' kJ; its heat capacity is ' + sig3(Cap) + ' J/°C.');
    readout(d.readout, `\\kq = \\kcspec \\times \\km \\times \\kdT = ${hue('heat-capacity', fmt(c, 3) + '\\ \\text{J/g}\\,{}^{\\circ}\\text{C}')} \\times ${hue('mass', fmt(m, 0) + '\\ \\text{g}')} \\times ${hue('temperature', fmt(dt, 1) + '\\ {}^{\\circ}\\text{C}')} = ${hue('energy', sig3(q).replace(/,/g, '{,}') + '\\ \\text{J}')}`);
  }
  register(d.fig, { update: () => {}, draw });
})();
};
