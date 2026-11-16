/* Figures for section 8.1 Valence Bond Theory. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['8.1'] = function (root, F) {
const { fmt, tex, C, PAL, alpha, ctl, register, begin, line, dot, text, topline, axes, plot, pinned, hbracket, vbracket } = F;
const sim = (id, H) => F.sim(root, id, H);
const still = (d, draw) => register(d.fig, { update: () => {}, draw });
const TAU = 2 * Math.PI, RAD = Math.PI / 180;
const minus = (s) => s.replace('-', '−');

/* =====================================================================
   FIGURE 8.2: the energy of two hydrogen atoms against the distance
   between their nuclei. The atoms stand above the graph on its own
   scale, the left nucleus over 0 and the right one over the point, so
   the gap between them is the reading on the axis and their clouds
   overlap more as they close. The book's three stages are written on
   the graph where they happen, with the steep wall the text names at
   the far left; the one the atoms are in is set in ink. The bond energy
   is the depth of the minimum, bracketed from 0. Still: the energy
   answers the distance, and nothing here has a clock.
===================================================================== */
(function () {
  const d = sim('sim-morse', 800);
  const R = ctl(d.controls, { label: '\\text{internuclear distance}', cls: 'length', min: 30, max: 400, step: 1, value: 74, unit: 'pm', dec: 0, aria: 'internuclear distance in picometers',
    specials: [{ at: 74, label: 'bond length' }] });
  /* a Morse curve with the book's depth, 7.24 × 10⁻¹⁹ J at 74 pm; energies in units of 10⁻¹⁹ J */
  const DEPTH = 7.24, RE = 74, A = 0.0194, NA = 6.022e23;
  const E = (r) => DEPTH * ((1 - Math.exp(-A * (r - RE))) ** 2 - 1);
  /* fixed axes: 0 to 400 pm, the slider's reach; −10 to 6 × 10⁻¹⁹ J, the curve from 30 pm down to its floor with room under it for the floor's name */
  const box = { l: 240, r: 1160, t: 410, b: 740 };
  const S = (box.r - box.l) / 400;                /* units per picometer, the same for the atoms and the axis */
  const RC = 70 * S, CY = 150;                    /* each 1s cloud is drawn out to 70 pm from its nucleus */
  function cloud(ctx, x) {
    const g = ctx.createRadialGradient(x, CY, 0, x, CY, RC), n = 8, k = Math.exp(-3);
    for (let i = 0; i <= n; i += 1) g.addColorStop(i / n, alpha(PAL.ink, 0.55 * (Math.exp(-3 * i / n) - k) / (1 - k)));
    ctx.save(); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, CY, RC, 0, TAU); ctx.fill(); ctx.restore();
  }
  let hits = []; F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c);
    const r = R.v, e = E(r), cE = C('energy'), cL = C('length');
    const ax = axes(ctx, box, [0, 400], [-10, 6], { nx: 4, ny: 8, xl: 'internuclear distance (pm)', xc: cL, fy: (v) => minus(fmt(v, 0)) });
    const { X, Y } = ax;
    ctx.save(); ctx.translate(150, (box.t + box.b) / 2); ctx.rotate(-Math.PI / 2);
    text(ctx, 'energy (10⁻¹⁹ J)', 0, 0, cE, { size: 20, weight: 600, align: 'center' }); ctx.restore();
    /* the zero of energy, the atoms far apart; the floor and the distance it is reached at; the floor carried right to the bracket */
    line(ctx, box.l, Y(0), box.r, Y(0), alpha(PAL.ink, 0.45), 2, [10, 10]);
    line(ctx, box.l, Y(-DEPTH), X(RE), Y(-DEPTH), alpha(PAL.ink, 0.35), 2, [4, 8]);
    line(ctx, X(RE), Y(-DEPTH), X(RE), box.b, alpha(PAL.ink, 0.35), 2, [4, 8]);
    line(ctx, X(RE), Y(-DEPTH), X(375), Y(-DEPTH), alpha(PAL.ink, 0.35), 2, [4, 8]);
    vbracket(ctx, X(375), Y(0), Y(-DEPTH), cE);
    plot(ctx, ax, E, cE, { w: 5, x: [30, 400] });
    text(ctx, '74', X(RE), box.b + 26, cL, { size: 17, weight: 600, align: 'center', bg: PAL.panel });
    text(ctx, 'H–H bond length', X(RE), box.b + 52, cL, { size: 17, weight: 600, align: 'center' });
    /* the book's stages, where they happen on the curve; the stage the atoms are in is set in ink */
    const at = Math.abs(r - RE) < 0.5 ? 'min' : r < RE ? 'wall' : e < -0.5 ? 'near' : 'far';
    const ink = (k) => (k === at ? PAL.ink : PAL.muted), words = (k, s) => [s, ink(k), 400];
    text(ctx, 'closer still, the repulsions win', X(44), Y(4.6), ink('wall'), { size: 18, bg: PAL.panel });
    F.rich(ctx, [words('min', 'lowest energy, '), ['−7.24 × 10⁻¹⁹ J', cE]], X(RE) + 22, Y(-DEPTH) + 30, { size: 18 });
    F.rich(ctx, ['bond energy, ', ['7.24 × 10⁻¹⁹ J', cE]], X(375) - 18, Y(-DEPTH / 2), { size: 18, align: 'right' });
    text(ctx, 'atoms begin to interact', X(150), Y(-5.6), ink('near'), { size: 18, bg: PAL.panel });
    text(ctx, 'too far apart to interact', X(320), Y(1.2), ink('far'), { size: 18, align: 'center', bg: PAL.panel });
    /* the two atoms on the axis's scale, the right nucleus over the point */
    const xa = X(0), xb = X(r), yb = CY + RC + 18;
    cloud(ctx, xa); cloud(ctx, xb);
    dot(ctx, xa, CY, PAL.ink, true, 5); dot(ctx, xb, CY, PAL.ink, true, 5);
    text(ctx, 'H', xa - RC - 6, CY, PAL.ink, { size: 24, weight: 600, align: 'right' });
    text(ctx, 'H', xb + RC + 6, CY, PAL.ink, { size: 24, weight: 600 });
    line(ctx, xa, CY + 10, xa, yb - 12, alpha(PAL.ink, 0.35), 2, [4, 8]);
    line(ctx, xb, CY + 10, xb, yb - 12, alpha(PAL.ink, 0.35), 2, [4, 8]);
    hbracket(ctx, xa, xb, yb, cL, r + ' pm', { side: 'below' });
    line(ctx, xb, yb + 40, xb, Y(Math.min(e, 6)) - 12, alpha(PAL.ink, 0.35), 2, [4, 8]);
    pinned(ctx, box, X, Y, r, e, cE);
    const name = 'a hydrogen atom: its nucleus and the cloud of its 1s electron';
    hits = [{ x: xa, y: CY, r: RC * 0.6, name }, { x: xb, y: CY, r: RC * 0.6, name }];
    const eS = minus(fmt(e, 2)), kj = (e * 1e-19 * NA) / 1000;
    tex(d.readout, `\\kE \\times N_{\\text{A}} = (\\htmlClass{kv-energy}{${eS} \\times 10^{-19}\\ \\text{J}})(6.022 \\times 10^{23}\\ \\text{mol}^{-1}) = \\htmlClass{kv-energy}{${minus(fmt(kj, 0))}\\ \\text{kJ/mol}}`);
  }
  still(d, draw);
})();

/* =====================================================================
   FIGURE 8.3 + 8.4 + 8.5: two atomic orbitals overlapping, in three
   dimensions, since where the overlap lies about the internuclear axis
   is the lesson: round the axis for a σ bond, above and below a node
   that holds the axis for a π bond. One choice picks the kinds of
   orbital (Figure 8.4's two s, s and p, two p); for two p orbitals a
   second picks how they meet: end to end (8.3 a), at an angle (8.3 b)
   or side by side (8.5). A change is one morph, the nuclei sliding and
   the p orbitals swinging while an orbital that changes kind crossfades.
   Still. The lobes wear F.cat(0) and F.cat(1), the two phases of the
   orbital, coloured as the book colours them so that the lobes that
   meet are always one phase. The pitch stays within 60° of level; no
   spin, zoom or view buttons, since the reader's own turn is the point.
===================================================================== */
(function () {
  const d = sim('sim-overlap');
  const top = F.makeCanvas(d.stage, 96);
  const v = F.view3d(d.stage, { h: 520, dist: 6.2, tilt: 0.38, spin: 'off', pitch: [-Math.PI / 3, Math.PI / 3] });
  v.setView(-0.42, 0.38);
  const key = F.makeCanvas(d.stage, 56);
  const g = v.part(0);
  const { sphere, lobe, stick, box } = F.mesh;
  /* each state: two atoms, each an s orbital or a p orbital along a direction in degrees (in the plane of the page); c is the
     phase of the lobe along +dir, as the book colours it, so the lobes that meet share a phase; positions in scene units */
  const STATES = {
    ss: { names: ['H', 'H'], x: [-0.4, 0.4], k: ['s', 's'], dir: [0, 0], c: [0, 0], bond: 'σ',
      eq: '1s\\,(\\text{H}) + 1s\\,(\\text{H}) \\rightarrow \\text{one }\\sigma\\text{ bond}', head: 'Two s orbitals overlap between the nuclei and form a σ bond, as in H₂.' },
    sp: { names: ['H', 'Cl'], x: [-1.05, 0.55], k: ['s', 'p'], dir: [0, 180], c: [0, 0], bond: 'σ',
      eq: '1s\\,(\\text{H}) + 3p\\,(\\text{Cl}) \\rightarrow \\text{one }\\sigma\\text{ bond}', head: 'An s orbital overlaps the end of a p orbital and forms a σ bond, as in HCl.' },
    end: { names: ['Cl', 'Cl'], x: [-1.1, 1.1], k: ['p', 'p'], dir: [0, 180], c: [1, 1], bond: 'σ',
      eq: '3p\\,(\\text{Cl}) + 3p\\,(\\text{Cl}) \\rightarrow \\text{one }\\sigma\\text{ bond}', head: 'Two p orbitals directed end to end overlap the most and form a σ bond, as in Cl₂.' },
    tilt: { names: ['Cl', 'Cl'], x: [-1.1, 1.1], k: ['p', 'p'], dir: [45, 135], c: [1, 1], bond: '',
      eq: '3p\\,(\\text{Cl}) + 3p\\,(\\text{Cl}) \\rightarrow \\text{less overlap than end to end}', head: 'Turned away from the internuclear axis, the same two p orbitals overlap less.' },
    pi: { names: ['C', 'C'], x: [-0.32, 0.32], k: ['p', 'p'], dir: [90, 90], c: [1, 1], bond: 'π',
      eq: '2p\\,(\\text{C}) + 2p\\,(\\text{C}) \\rightarrow \\text{one }\\pi\\text{ bond}', head: 'Two parallel p orbitals overlap above and below the axis and form a π bond.' },
  };
  const KIND = F.choice(d.controls, { label: '\\text{orbitals}', options: [{ value: 'ss', label: 's + s' }, { value: 'sp', label: 's + p' }, { value: 'pp', label: 'p + p' }], value: 'pp', aria: 'which two orbitals overlap', ms: 0, onInput: () => shift() });
  const MEET = F.choice(d.controls, { label: '\\text{meeting}', key: 'meet', options: [{ value: 'end', label: 'end to end' }, { value: 'tilt', label: 'at an angle' }, { value: 'pi', label: 'side by side' }], value: 'end', aria: 'how the two p orbitals meet', ms: 0, onInput: () => shift() });
  const MBOX = d.controls.lastElementChild;
  const stateKey = () => (KIND.value === 'pp' ? MEET.value : KIND.value);
  let from = stateKey(), to = from;
  const tw = F.tween(d, 1);
  function shift() { const n = stateKey(); if (n === to) return; from = tw.v >= 1 ? to : (tw.v < 0.5 ? from : to); to = n; tw.set(0); tw.to(1, 900); }
  const LEN = 1.25, RS = 0.7, AX = 2.9;           /* a p lobe's length, an s orbital's radius, the axis's half length, in scene units */
  const NAME = { H: 'hydrogen', Cl: 'chlorine', C: 'carbon' };
  const SHELL = { H: '1s', Cl: '3p', C: '2p' };
  const orb = (who, kind) => `the ${kind === 's' ? '1s' : SHELL[who]} orbital of a ${NAME[who]} atom`;
  /* the pair part way from the state it left to the one it is going to */
  function frame() {
    const A = STATES[from], B = STATES[to], q = F.ease.smooth(Math.min(1, Math.max(0, tw.v)));
    const atoms = [0, 1].map((i) => ({
      x: A.x[i] + (B.x[i] - A.x[i]) * q, ang: A.dir[i] + (B.dir[i] - A.dir[i]) * q, who: q < 0.5 ? A.names[i] : B.names[i],
      kinds: A.k[i] === B.k[i] ? [[B.k[i], 1]] : [[A.k[i], 1 - q], [B.k[i], q]],
      c: F.mixColor(F.cat(A.c[i]), F.cat(B.c[i]), q), c2: F.mixColor(F.cat(1 - A.c[i]), F.cat(1 - B.c[i]), q),
    }));
    return { B, atoms, node: (A.bond === 'π' ? 1 - q : 0) + (B.bond === 'π' ? q : 0), sig: [from, to, q.toFixed(3)].join('|') };
  }
  /* a p lobe, fuller than a lone pair's, as the book draws it */
  function pLobe(n, u, col, a) {
    const m = lobe(g, n, u, LEN, col); m.scale.set(LEN * 0.42, LEN * 0.56, LEN * 0.42);
    m.material.opacity = 0.5 * a; m.material.depthWrite = false; m.visible = a > 0.01; return m;
  }
  let sig = '';
  function draw() {
    const f = frame();
    MBOX.style.display = KIND.value === 'pp' ? '' : 'none';
    const s = [f.sig, F.cat(0), F.cat(1), PAL.ink, PAL.muted].join('|');
    if (s !== sig) {
      sig = s; v.clear();
      f.atoms.forEach((t) => {
        const n = [t.x, 0, 0], u = [Math.cos(t.ang * RAD), Math.sin(t.ang * RAD), 0];
        v.pickable(sphere(g, n, 0.06, PAL.ink), `the nucleus of a ${NAME[t.who]} atom`);
        t.kinds.forEach(([kind, a]) => {
          if (a <= 0.01) return;
          if (kind === 's') { v.pickable(sphere(g, n, RS, F.cat(0), { transparent: true, opacity: 0.5 * a, depthWrite: false }), orb(t.who, 's')); return; }
          v.pickable(pLobe(n, u, t.c, a), orb(t.who, 'p') + ', one lobe');
          v.pickable(pLobe(n, [-u[0], -u[1], -u[2]], t.c2, a), orb(t.who, 'p') + ', the other lobe');
        });
      });
      /* the node of the π bond: the plane that holds the internuclear axis, a faint ink sheet */
      if (f.node > 0.02) v.pickable(box(g, [0, 0, 0], [3.2, 0.004, 2.2], PAL.ink, { transparent: true, opacity: 0.16 * f.node, depthWrite: false }), 'the node, a plane through the internuclear axis');
      v.pickable(stick(g, [-AX, 0, 0], [AX, 0, 0], 0.018, PAL.muted), 'the internuclear axis');
      v.invalidate();
    }
    topline(begin(top).ctx, f.B.head);
    const k = begin(key).ctx, pi = to === 'pi';
    const swatch = (col) => (c, x, y) => { c.save(); c.globalAlpha = 0.6; c.fillStyle = col; c.beginPath(); c.ellipse(x, y, 18, 10, 0, 0, TAU); c.fill(); c.restore(); };
    F.legend(k, { l: 40, r: 1360, t: 0, b: 56 }, [
      { s: 'nucleus', draw: (c, x, y) => dot(c, x, y, PAL.ink, true, 6) },
      { s: 'one phase of an orbital', draw: swatch(F.cat(0)) },
      { s: 'the other phase', draw: swatch(F.cat(1)) },
      { s: 'internuclear axis', color: PAL.muted, w: 3 },
    ].concat(pi ? [{ s: 'node', draw: (c, x, y) => { c.save(); c.fillStyle = alpha(PAL.ink, 0.22); c.fillRect(x - 18, y - 9, 36, 18); c.restore(); } }] : []), { corner: 'top', row: true, panel: false, size: 19 });
    tex(d.readout, f.B.eq);
  }
  still(d, draw);
})();
};
