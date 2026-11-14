/* Figures for section 8.3 Multiple Bonds. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['8.3'] = function (root, F) {
const { C, PAL, alpha, register, begin, line, arrow, text, tex } = F;
const sim = (id, H) => F.sim(root, id, H);
const still = (d, draw) => register(d.fig, { update: () => {}, draw });
const RAD = Math.PI / 180;

/* =====================================================================
   FIGURE 8.22: the orbitals of an isolated carbon atom and of the
   hybridized carbon atom, on one energy axis. The book draws the sp2
   carbon of ethene; a choice of sp3, sp2 and sp lifts one line at a time
   out of the hybrid set into the 2p set, and the brackets say what each
   set makes: a σ bond per hybrid orbital, a π bond per 2p orbital left.
   Still: the choice morphs the lines and nothing else moves.
===================================================================== */
(function () {
  const H = 480, d = sim('sim-hybrid-levels', H);
  /* the two energies of the isolated atom; a hybrid level is the average of the orbitals mixed, so its s share sets it */
  const Y2S = 420, Y2P = 196, level = (sShare) => Y2P + (Y2S - Y2P) * sShare;
  const XS = [830, 940, 1050, 1160];
  const STATE = {
    sp3: { n: 4, s: 1 / 4, name: 'sp³', mol: 'C₂H₆' },
    sp2: { n: 3, s: 1 / 3, name: 'sp²', mol: 'C₂H₄' },
    sp: { n: 2, s: 1 / 2, name: 'sp', mol: 'C₂H₂' },
  };
  /* where each of the four lines stands in a state: the first n in the hybrid set, the rest up in the 2p set */
  const ysOf = (v) => XS.map((_, i) => (i < STATE[v].n ? level(STATE[v].s) : Y2P));
  const pick = F.choice(d.controls, { label: '\\text{hybridization}', aria: 'the hybridization of the carbon atom', value: 'sp2',
    options: [{ value: 'sp3', label: 'sp³ (C₂H₆)' }, { value: 'sp2', label: 'sp² (C₂H₄)' }, { value: 'sp', label: 'sp (C₂H₂)' }] });
  const HALF = 36;
  function orbital(ctx, x, y) { line(ctx, x - HALF, y, x + HALF, y, PAL.ink, 4); }
  /* an electron as the book's half-arrow standing on its line, barb on the left going up and on the right coming down */
  function electron(ctx, x, y, up) {
    const lo = y - 6, hi = y - 50;
    line(ctx, x, lo, x, hi, PAL.ink, 3);
    if (up) line(ctx, x, hi, x - 11, hi + 15, PAL.ink, 3); else line(ctx, x, lo, x + 11, lo - 15, PAL.ink, 3);
  }
  function draw() {
    const { ctx } = begin(d.c);
    const sub = (s, x, y) => text(ctx, s, x, y, PAL.ink, { size: 24, italic: true, align: 'center' });
    const st = STATE[pick.value];
    /* the energy axis, the one quantity the figure draws */
    const E = C('energy');
    arrow(ctx, 96, Y2S + 30, 96, 70, E, 4);
    text(ctx, 'E', 66, (Y2S + 70) / 2, E, { size: 26, weight: 600, italic: true, align: 'center' });
    /* the isolated atom: 2s full, two of the three 2p half full */
    text(ctx, 'Orbitals in an isolated C atom', 330, 40, PAL.ink, { size: 24, align: 'center' });
    orbital(ctx, 330, Y2S); electron(ctx, 321, Y2S, true); electron(ctx, 339, Y2S, false);
    sub('2s', 330, Y2S + 28);
    [220, 330, 440].forEach((x, i) => { orbital(ctx, x, Y2P); if (i < 2) electron(ctx, x, Y2P, true); sub('2p', x, Y2P + 28); });
    /* hybridization */
    arrow(ctx, 560, 300, 720, 300, PAL.ink, 4);
    text(ctx, 'Hybridization', 640, 272, PAL.ink, { size: 24, align: 'center' });
    /* the hybridized atom: four lines, each with one electron, moving between the two sets */
    const ys = pick.mix(ysOf);
    XS.forEach((x, i) => { orbital(ctx, x, ys[i]); electron(ctx, x, ys[i], true); });
    ['sp3', 'sp2', 'sp'].forEach((v) => pick.only(ctx, v, () => {
      const s = STATE[v], yh = level(s.s);
      text(ctx, `Orbitals in the ${s.name} hybridized C atom in ${s.mol}`, 995, 40, PAL.ink, { size: 24, align: 'center' });
      for (let i = 0; i < s.n; i++) sub(s.name, XS[i], yh + 28);
      for (let i = s.n; i < 4; i++) sub('2p', XS[i], Y2P + 28);
      /* what each set makes: a bracket under the hybrids and one over the 2p orbitals left out of the mix */
      F.hbracket(ctx, XS[0] - HALF, XS[s.n - 1] + HALF, yh + 52, PAL.muted);
      text(ctx, `${s.n} σ bonds`, (XS[0] + XS[s.n - 1]) / 2, yh + 82, PAL.ink, { size: 23, align: 'center' });
      if (s.n < 4) {
        F.hbracket(ctx, XS[s.n] - HALF, XS[3] + HALF, Y2P - 64, PAL.muted);
        text(ctx, `${4 - s.n} π bond${s.n === 3 ? '' : 's'}`, (XS[s.n] + XS[3]) / 2, Y2P - 90, PAL.ink, { size: 23, align: 'center' });
        text(ctx, 'unhybridized', XS[s.n] - HALF - 18, Y2P - 4, PAL.ink, { size: 23, align: 'right' });
      }
    }, [0, 8]));
    const mixes = { sp3: '\\mk{p}{3\\,(2p)} \\longrightarrow \\mk{h}{4\\,sp^3}', sp2: '\\mk{p}{2\\,(2p)} \\longrightarrow \\mk{h}{3\\,sp^2}', sp: '\\mk{p}{2p} \\longrightarrow \\mk{h}{2\\,sp}' };
    const bonds = { sp3: '\\mk{b}{\\text{C}{-}\\text{C}} = \\mk{g}{1\\,\\sigma}', sp2: '\\mk{b}{\\text{C}{=}\\text{C}} = \\mk{g}{1\\,\\sigma} + \\mk{q}{1\\,\\pi}', sp: '\\mk{b}{\\text{C}{\\equiv}\\text{C}} = \\mk{g}{1\\,\\sigma} + \\mk{q}{2\\,\\pi}' };
    tex(d.readout, `\\mk{s}{2s} + ${mixes[pick.value]} \\\\ ${bonds[pick.value]}`);
  }
  still(d, draw);
})();

/* =====================================================================
   FIGURES 8.23 + 8.24 + 8.25: ethene and acetylene with their hybrid
   orbitals, unhybridized p orbitals and π bonds, in three dimensions.
   Mathematical 3D: the C–C axis is x, the plane of ethene's σ bonds is
   the xz plane and its p orbitals stand along y. The twist turns the
   right CH2 group (atoms, hybrids, half-plane and p orbital) about x;
   the side-by-side overlap of the two p orbitals falls as cos θ and the
   π cloud fades with it. Still: the twist is a slider, not a clock.
===================================================================== */
(function () {
  const d = sim('sim-multiple-bonds');
  const T3 = window.THREE;
  const DIST = 6.2, outs = [];
  /* a label outside the thing at p(): pushed from the molecule's centre along the screen until it clears a ball of radius r */
  function place() {
    if (!v.wrap || !v.wrap.clientHeight) return;
    const w = v.wrap.clientWidth, h = v.wrap.clientHeight, u = h / (2 * Math.tan(15 * RAD) * DIST / (v.at.zoom || 1));
    outs.forEach((l) => {
      const p = l.p(); if (!p) { l.el.style.visibility = 'hidden'; return; }
      l.el.style.visibility = ''; l.el.style.opacity = String(l.o());
      const q = v.project(p, g), c = v.project([0, 0, 0], g);
      let dx = q[0] - c[0], dy = q[1] - c[1]; const n = Math.hypot(dx, dy);
      if (n < 6) { dx = 0; dy = -1; } else { dx /= n; dy /= n; }
      const bw = l.el.offsetWidth / 2, bh = l.el.offsetHeight / 2, push = l.r * u + 6 + Math.abs(dx) * bw + Math.abs(dy) * bh;
      l.el.style.left = Math.min(Math.max(q[0] + dx * push, bw + 2), w - bw - 2) + 'px';
      l.el.style.top = Math.min(Math.max(q[1] + dy * push, bh + 2), h - bh - 2) + 'px';
    });
  }
  const v = F.view3d(d.stage, { spin: 'idle', h: 560, dist: DIST, tilt: 0.42, pitch: [-1.2, 1.2], onRender: place });
  const g = v.part(0), key = F.makeCanvas(d.stage, 64); window.__g83 = g;
  const mol = F.choice(d.controls, { label: '\\text{molecule}', aria: 'the molecule', value: 'ethene', ms: 0,
    options: [{ value: 'ethene', label: 'ethene (C₂H₄)' }, { value: 'acetylene', label: 'acetylene (C₂H₂)' }], onInput: () => tw.show(mol.value === 'ethene') });
  const tw = F.ctl(d.controls, { label: '\\theta', cls: 'angle', key: 'twist', aria: 'twist of one CH2 group about the C–C axis', min: 0, max: 90, step: 1, value: 0, unit: '°', dec: 0, specials: [{ at: 90, label: 'perpendicular' }] });

  const rotX = (p, a) => [p[0], p[1] * Math.cos(a) - p[2] * Math.sin(a), p[1] * Math.sin(a) + p[2] * Math.cos(a)];
  const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]], mul = (a, k) => [a[0] * k, a[1] * k, a[2] * k], neg = (a) => mul(a, -1);
  const unit = (a) => mul(a, 1 / (Math.hypot(a[0], a[1], a[2]) || 1));

  /* ---- the shapes, made once: a teardrop lobe pointed at its nucleus, as the book draws one, and a rounded cloud ---- */
  let DROP = null, CLOUD = null;
  if (T3 && v.scene) {
    const prof = [];
    for (let i = 0; i <= 40; i++) { const u = i / 40; prof.push(new T3.Vector2(Math.max(1e-4, 0.5 * Math.pow(u, 0.62) * Math.sqrt(Math.max(0, 1 - u * u))), u)); }
    DROP = new T3.LatheGeometry(prof, 36);
    /* a superellipsoid about x: flat-ended along the axis, round across it (the book's long π cloud) */
    const sp = (a, e) => Math.sign(a) * Math.pow(Math.abs(a), e), NU = 40, NV = 40, pos = [], idx = [];
    for (let i = 0; i <= NU; i++) {
      const th = -Math.PI / 2 + (Math.PI * i) / NU;
      for (let j = 0; j <= NV; j++) {
        const ph = -Math.PI + (2 * Math.PI * j) / NV, c = sp(Math.cos(th), 0.35);
        pos.push(sp(Math.sin(th), 0.35), c * Math.cos(ph), c * Math.sin(ph));
      }
    }
    for (let i = 0; i < NU; i++) for (let j = 0; j < NV; j++) { const a = i * (NV + 1) + j, b = a + NV + 1; idx.push(a, a + 1, b, b, a + 1, b + 1); }
    CLOUD = new T3.BufferGeometry(); CLOUD.setAttribute('position', new T3.Float32BufferAttribute(pos, 3)); CLOUD.setIndex(idx); CLOUD.computeVertexNormals();
  }
  const mat = (c, o = 1, extra = {}) => F.mesh.mat(c, o < 1 ? { transparent: true, opacity: o, depthWrite: false, ...extra } : extra);
  /* a lobe from the nucleus at `from` along dir, len long */
  function lobe(from, dir, len, c, name, wide = 1) {
    if (!DROP) return null;
    const m = new T3.Mesh(DROP, mat(c)), u = unit(dir);
    m.position.set(...add(from, mul(u, 0.07))); m.quaternion.setFromUnitVectors(new T3.Vector3(0, 1, 0), new T3.Vector3(...u)); m.scale.set(len * wide, len, len * wide);
    g.add(m); v.pickable(m, name); return m;
  }
  /* a π cloud: half-lengths ax along the C–C axis, ar out from it and aw across, centred off the axis along dir */
  function cloud(dir, c, o, name, ax) {
    if (!CLOUD || o < 0.01) return null;
    const m = new T3.Mesh(CLOUD, mat(c, o)), u = unit(dir), R = 0.64;
    m.position.set(...mul(u, R)); m.scale.set(ax, 0.56, 0.4);
    m.rotation.x = Math.atan2(u[2], u[1]); m.renderOrder = 2;
    g.add(m); v.pickable(m, name); return m;
  }
  function atom(p, sym) { const m = F.mesh.sphere(g, p, sym === 'H' ? 0.2 : 0.12, F.el(sym)); v.pickable(m, sym === 'H' ? 'hydrogen atom, its 1s orbital' : 'carbon nucleus'); }
  /* a half of the σ plane, from x0 to x1, turned by a about the C–C axis */
  function halfPlane(x0, x1, a) {
    if (!T3 || !v.scene) return;
    const Z = 1.3, pts = [[x0, 0, -Z], [x1, 0, -Z], [x1, 0, Z], [x0, 0, Z]].map((p) => rotX(p, a));
    const geo = new T3.BufferGeometry(); geo.setAttribute('position', new T3.Float32BufferAttribute(pts.flat(), 3)); geo.setIndex([0, 1, 2, 0, 2, 3]); geo.computeVertexNormals();
    const m = new T3.Mesh(geo, new T3.MeshBasicMaterial({ color: new T3.Color(PAL.muted), transparent: true, opacity: 0.16, depthWrite: false, side: T3.DoubleSide }));
    m.renderOrder = 1; g.add(m); v.pickable(m, 'the plane of the σ bonds');
    F.mesh.polyline(g, pts.concat([pts[0]]), PAL.muted);
  }
  const PLUS = () => F.cat(0), MINUS = () => F.cat(1), HYB = () => F.cat(2);
  const P_LEN = 1.05;
  function pOrbital(at, dir, name) {
    lobe(at, dir, P_LEN, PLUS(), `${name}, + phase`);
    lobe(at, neg(dir), P_LEN, MINUS(), `${name}, − phase`);
  }
  let piAt = null, pi2At = null, piO = 0;
  function ethene(theta) {
    const a = 0.67, L = [-a, 0, 0], R = [a, 0, 0], t = theta * RAD, CH = 1.12;
    const hl = [121, -121].map((deg) => [Math.cos(deg * RAD), 0, Math.sin(deg * RAD)]);
    const hr = hl.map((u) => rotX([-u[0], u[1], u[2]], t));
    halfPlane(-1.85, 0, 0); halfPlane(0, 1.85, t);
    [L, R].forEach((p) => atom(p, 'C'));
    hl.forEach((u) => { atom(add(L, mul(u, CH)), 'H'); lobe(L, u, 0.92, HYB(), 'sp² hybrid orbital: a C–H σ bond', 1.3); });
    hr.forEach((u) => { atom(add(R, mul(u, CH)), 'H'); lobe(R, u, 0.92, HYB(), 'sp² hybrid orbital: a C–H σ bond', 1.3); });
    lobe(L, [1, 0, 0], 0.98, HYB(), 'sp² hybrid orbital: the C–C σ bond', 1.3); lobe(R, [-1, 0, 0], 0.98, HYB(), 'sp² hybrid orbital: the C–C σ bond', 1.3);
    const pl = [0, 1, 0], pr = rotX([0, 1, 0], t), s = Math.cos(t);
    pOrbital(L, pl, 'unhybridized 2p orbital'); pOrbital(R, pr, 'unhybridized 2p orbital');
    /* the π bond: the two upper lobes joined in one cloud, the two lower in another, as strong as their overlap */
    const up = unit(add(pl, pr));
    piO = s < 0.005 ? 0 : 0.62 * s;
    cloud(up, PLUS(), piO, 'the π bond, + phase', 1.12); cloud(neg(up), MINUS(), piO, 'the π bond, − phase', 1.12);
    piAt = mul(up, 1.2); pi2At = null;
    return s;
  }
  function acetylene() {
    const a = 0.6, L = [-a, 0, 0], R = [a, 0, 0], CH = 1.06;
    [L, R].forEach((p) => atom(p, 'C'));
    atom([-a - CH, 0, 0], 'H'); atom([a + CH, 0, 0], 'H');
    lobe(L, [-1, 0, 0], 0.88, HYB(), 'sp hybrid orbital: a C–H σ bond', 1.3); lobe(R, [1, 0, 0], 0.88, HYB(), 'sp hybrid orbital: a C–H σ bond', 1.3);
    lobe(L, [1, 0, 0], 0.9, HYB(), 'sp hybrid orbital: the C–C σ bond', 1.3); lobe(R, [-1, 0, 0], 0.9, HYB(), 'sp hybrid orbital: the C–C σ bond', 1.3);
    pOrbital(L, [0, 1, 0], 'unhybridized 2p orbital'); pOrbital(R, [0, 1, 0], 'unhybridized 2p orbital');
    pOrbital(L, [0, 0, 1], 'second unhybridized 2p orbital'); pOrbital(R, [0, 0, 1], 'second unhybridized 2p orbital');
    piO = 0.62;
    cloud([0, 1, 0], PLUS(), piO, 'one π bond, + phase', 1.05); cloud([0, -1, 0], MINUS(), piO, 'one π bond, − phase', 1.05);
    cloud([0, 0, 1], PLUS(), piO, 'second π bond, + phase', 1.05); cloud([0, 0, -1], MINUS(), piO, 'second π bond, − phase', 1.05);
    piAt = [0, 1.2, 0]; pi2At = [1.3, 0, 1.65];
    /* the second π bond's name stands at the end of a leader from its front cloud, as the book's does */
    F.mesh.polyline(g, [[0.75, 0, 1.0], [1.24, 0, 1.58]], PAL.ink);
  }
  /* the two labels, set outside their clouds; they fade as the π bond does */
  outs.push({ el: v.label('π bond', [0, 0, 0], g, 0, 'bare'), p: () => (piO > 0.18 ? piAt : null), o: () => Math.min(1, piO / 0.45), r: 0.05 });
  outs.push({ el: v.label('second π bond', [0, 0, 0], g, 0, 'bare'), p: () => pi2At, o: () => 1, r: 0.05 });
  const labels = outs.map((l) => l.el);
  let sig = '';
  function draw() {
    const eth = mol.value === 'ethene', th = Math.round(tw.v);
    const now = [mol.value, th, F.cat(0), F.cat(1), F.cat(2), F.el('C'), F.el('H'), PAL.muted, PAL.ink].join('|');
    if (now !== sig && T3 && v.scene) {
      sig = now;
      /* rebuild the molecule, keeping the two labels */
      g.children.slice().forEach((c) => { g.remove(c); if (c.geometry && c.geometry !== DROP && c.geometry !== CLOUD && c.geometry !== F.mesh.geo().sphere) c.geometry.dispose(); c.material?.dispose?.(); });
      if (eth) ethene(th); else acetylene();
      labels.forEach((e) => e && (e.style.display = ''));
      v.invalidate();
    }
    const { ctx } = begin(key);
    const ball = (sym, r) => ({ s: sym === 'C' ? 'carbon' : 'hydrogen', draw: (c, x, y) => { c.save(); c.beginPath(); c.arc(x, y, r, 0, 2 * Math.PI); c.fillStyle = F.el(sym); c.fill(); c.lineWidth = 1.5; c.strokeStyle = alpha(PAL.ink, 0.5); c.stroke(); c.restore(); } });
    const drop = (col, s) => ({ s, draw: (c, x, y) => { c.save(); c.fillStyle = col; c.beginPath(); c.moveTo(x - 16, y); c.bezierCurveTo(x - 4, y - 12, x + 16, y - 12, x + 16, y); c.bezierCurveTo(x + 16, y + 12, x - 4, y + 12, x - 16, y); c.fill(); c.restore(); } });
    F.legend(ctx, { l: 40, r: 1360, t: 0, b: 64 }, [ball('C', 7), ball('H', 10), drop(HYB(), `${eth ? 'sp²' : 'sp'} hybrid orbital`), drop(PLUS(), 'p orbital, + phase'), drop(MINUS(), 'p orbital, − phase')], { corner: 'top', row: true, panel: false, size: 20 });
    if (eth) {
      const s = Math.cos(th * RAD);
      const bond = th >= 90 ? '\\mk{b}{\\text{C}{-}\\text{C}} = \\mk{g}{1\\,\\sigma}' : '\\mk{b}{\\text{C}{=}\\text{C}} = \\mk{g}{1\\,\\sigma} + \\mk{q}{1\\,\\pi}';
      tex(d.readout, `${bond} \\\\ \\mk{o}{\\pi\\ \\text{overlap}} = \\cos\\htmlClass{kv-angle}{\\theta} = \\cos \\htmlClass{kv-angle}{${th}^\\circ} = ${s.toFixed(2)}`);
    } else {
      tex(d.readout, '\\mk{b}{\\text{C}{\\equiv}\\text{C}} = \\mk{g}{1\\,\\sigma} + \\mk{q}{2\\,\\pi}');
    }
  }
  still(d, draw);
})();
};
