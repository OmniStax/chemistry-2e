/* Figures for section 18.9 Occurrence, Preparation, and Compounds of Oxygen. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['18.9'] = function (root, F) {
const { C, PAL, alpha, register, begin, line, text, headline } = F;

/* =====================================================================
   FIGURE 18.55 + 18.56 + 18.57: the oxyanions of chlorine. Chlorine
   keeps four electron pairs at the corners of a tetrahedron; from ClO-
   to ClO4- each step turns one of its lone pairs into the pair it
   shares with a new oxygen atom. 2D is the book's electron-dot Lewis
   structure, 3D its perspective drawing as balls, sticks and lobes,
   mounted on the first switch. Beneath both, the parent acid on a
   strip of Table 18.2's pKa values (HOCl 7.5, HClO2 2.0; HClO3 and
   HClO4 strong, with no value given). Still: a series of states.
===================================================================== */
(function () {
  const d = F.sim(root, 'sim-chlorine-oxyanions', 400);
  const ORDER = ['ClO', 'ClO2', 'ClO3', 'ClO4'];
  /* the sites in the order oxygen takes them, as the book draws them: right, then left, then down, then up */
  const SITES = ['right', 'left', 'down', 'up'];
  const ION = {
    ClO: { n: 1, label: 'ClO⁻', tex: '\\text{ClO}^{-}', acid: '\\text{HOCl}', acidPlain: 'HOCl', pKa: 7.5 },
    ClO2: { n: 2, label: 'ClO₂⁻', tex: '\\text{ClO}_{2}^{-}', acid: '\\text{HClO}_{2}', acidPlain: 'HClO_{2}', pKa: 2.0 },
    ClO3: { n: 3, label: 'ClO₃⁻', tex: '\\text{ClO}_{3}^{-}', acid: '\\text{HClO}_{3}', acidPlain: 'HClO_{3}', pKa: null },
    ClO4: { n: 4, label: 'ClO₄⁻', tex: '\\text{ClO}_{4}^{-}', acid: '\\text{HClO}_{4}', acidPlain: 'HClO_{4}', pKa: null },
  };
  const COUNT = ['', 'one', 'two', 'three', 'four'];
  const HEAD = {
    ClO: 'In $\\text{ClO}^{-}$, one of chlorine’s four electron pairs bonds an oxygen atom and three are lone pairs.',
    ClO2: 'In $\\text{ClO}_{2}^{-}$, two of chlorine’s four electron pairs bond oxygen atoms and two are lone pairs.',
    ClO3: 'In $\\text{ClO}_{3}^{-}$, three of chlorine’s four electron pairs bond oxygen atoms and one is a lone pair.',
    ClO4: 'In $\\text{ClO}_{4}^{-}$, all four of chlorine’s electron pairs bond oxygen atoms and no lone pair is left.',
  };
  const ion = F.choice(d.controls, { label: '\\text{ion}', key: 'ion', aria: 'the chlorine oxyanion',
    options: ORDER.map((v) => ({ value: v, label: ION[v].label })), value: 'ClO2', onInput: () => draw() });
  const VIEW = F.choice(d.controls, { label: '\\text{view}', key: 'view', aria: 'a flat Lewis structure or a scene to turn',
    options: [{ value: '2d', label: '2D' }, { value: '3d', label: '3D' }], value: '2d', ms: 0, onInput: () => show() });
  const strip = F.makeCanvas(d.stage, 200);
  const ro = F.readout(d);
  let hits = []; F.hover(d.stage, () => hits);

  /* how far each site has become an oxygen atom, 0 a lone pair on chlorine and 1 a bonded oxygen, mid-morph between */
  const has = (v, s) => (SITES.indexOf(s) < ION[v].n ? 1 : 0);
  const weight = (s) => ion.mix((v) => has(v, s));

  /* ---------- the flat view: the book's electron-dot structure ---------- */
  const CX = 700, CY = 238, BOND = 100, LP = 30, SPREAD = 6.5;
  const DIR = { right: [1, 0], left: [-1, 0], down: [0, 1], up: [0, -1] };
  const NAME = { Cl: 'chlorine atom', O: 'oxygen atom' };
  function pair(ctx, x, y, dx, dy, name, a = 1) {
    if (a <= 0.01) return;
    ctx.save(); ctx.globalAlpha *= a;
    [-SPREAD, SPREAD].forEach((o) => F.dot(ctx, x - dy * o, y + dx * o, PAL.ink, true, 3.6));
    ctx.restore();
    if (a > 0.5 && name) hits.push({ x, y, r: 13, name });
  }
  function brackets(ctx) {
    const x1 = CX - 175, x2 = CX + 175, y1 = CY - 152, y2 = CY + 152;
    [[x1, 1], [x2, -1]].forEach(([x, s]) => {
      ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.beginPath();
      ctx.moveTo(x + s * 14, y1); ctx.lineTo(x, y1); ctx.lineTo(x, y2); ctx.lineTo(x + s * 14, y2); ctx.stroke(); ctx.restore();
    });
    text(ctx, '−', x2 + 16, y1 + 8, PAL.ink, { size: 30, weight: 600 });
  }
  function draw2d() {
    const { ctx } = begin(d.c); hits = [];
    headline(ctx, HEAD[ion.value]);
    brackets(ctx);
    text(ctx, 'Cl', CX, CY + 1, PAL.ink, { size: 30, align: 'center' });
    hits.push({ x: CX, y: CY, r: 22, name: NAME.Cl });
    SITES.forEach((s) => {
      const w = weight(s), [dx, dy] = DIR[s];
      /* chlorine's pair on this side slides out to the shared place as the oxygen arrives */
      const r = LP + (BOND / 2 - LP) * w;
      pair(ctx, CX + dx * r, CY + dy * r, dx, dy, w > 0.5 ? 'bonding pair shared by chlorine and oxygen' : 'lone pair on chlorine');
      if (w <= 0.01) return;
      const back = (1 - w) * 24, ox = CX + dx * (BOND - back), oy = CY + dy * (BOND - back);
      F.faded(ctx, w, [0, 0], () => {
        text(ctx, 'O', ox, oy + 1, PAL.ink, { size: 30, align: 'center' });
        Object.keys(DIR).filter((t) => t !== { right: 'left', left: 'right', up: 'down', down: 'up' }[s])
          .forEach((t) => { const [ex, ey] = DIR[t]; pair(ctx, ox + ex * LP, oy + ey * LP, ex, ey, w > 0.5 ? 'lone pair on oxygen' : null); });
      });
      if (w > 0.5) hits.push({ x: ox, y: oy, r: 22, name: NAME.O });
    });
  }

  /* ---------- the same ion in three dimensions ---------- */
  const R3 = 1.6, k3 = 1 / Math.sqrt(1.5), h3 = 1 / Math.SQRT2;
  /* a regular tetrahedron with left and right in one plane and up and down in the plane across it, the book's view */
  const T3 = { right: [k3, 0, -h3 * k3], left: [-k3, 0, -h3 * k3], down: [0, -k3, h3 * k3], up: [0, k3, h3 * k3] };
  let V = null, g = null;
  function mount() {
    V = F.view3d(d.stage, { spin: 'idle', h: 470, dist: 7.6, tilt: 0.2, pitch: [-Math.PI / 2, Math.PI / 2],
      views: [{ label: 'front', yaw: 0, pitch: 0.2 }, { label: 'side', yaw: Math.PI / 2, pitch: 0.2 }] });
    d.stage.insertBefore(V.wrap, strip);
    const bar = d.stage.querySelector('.view3d-bar'); if (bar) d.stage.insertBefore(bar, strip);
    g = V.part(0); g.position.y = -0.3;
  }
  function draw3d() {
    V.clear(); hits = [];
    const { sphere, bond, lobe, polyline } = F.mesh;
    V.pickable(sphere(g, [0, 0, 0], 0.5, F.el('Cl')), NAME.Cl);
    SITES.forEach((s) => {
      const w = weight(s), u = T3[s], tip = u.map((x) => x * R3);
      if (w > 0.01) {
        const m = sphere(g, tip, 0.4 * (0.4 + 0.6 * w), F.el('O'), w < 1 ? { transparent: true, opacity: w } : undefined);
        V.pickable(m, NAME.O);
        bond(g, [0, 0, 0], u.map((x) => x * R3 * (0.3 + 0.7 * w)), 1);
      }
      if (w < 0.99) { const lb = lobe(g, [0, 0, 0], u, 1.45 * (1 - 0.6 * w)); lb.material.opacity = 0.5 * (1 - w); V.pickable(lb, 'lone pair on chlorine'); }
    });
    const P = (s) => T3[s].map((x) => x * R3), edge = alpha(PAL.ink, 0.35);
    polyline(g, ['right', 'left', 'down', 'right', 'up', 'left'].map(P), edge);
    polyline(g, ['up', 'down'].map(P), edge);
    V.headline(HEAD[ion.value]);
    V.invalidate();
  }
  function show() {
    if (VIEW.value === '3d' && !V) mount();
    const three = VIEW.value === '3d' && !!V?.scene;
    d.c.style.display = three ? 'none' : '';
    if (V) [V.wrap, d.stage.querySelector('.view3d-bar')].forEach((e) => { if (e) e.style.display = VIEW.value === '3d' ? '' : 'none'; });
    draw();
  }

  /* ---------- the strip: the parent acid's pKa, fixed from 9 to 0, the strong acids in a band past 0 ---------- */
  const XA = 230, XB = 1000, Y = 112, X = (p) => XA + ((9 - p) / 9) * (XB - XA);
  const BAND = [1030, 1300], SPOT = { ClO: X(7.5), ClO2: X(2.0), ClO3: 1105, ClO4: 1225 };
  function drawStrip() {
    const { ctx } = begin(strip), hue = C('equilibrium-constant');
    text(ctx, '$\\kpKa$', 140, Y + 2, PAL.ink, { size: 24, align: 'center', tex: true });
    line(ctx, XA, Y, XB, Y, PAL.muted, 3);
    for (let p = 9; p >= 0; p--) {
      line(ctx, X(p), Y, X(p), Y + 9, PAL.muted, 2);
      text(ctx, String(p), X(p), Y + 30, PAL.muted, { size: 17, align: 'center' });
    }
    ctx.save(); ctx.fillStyle = alpha(hue, 0.1); ctx.fillRect(BAND[0], Y - 26, BAND[1] - BAND[0], 52); ctx.restore();
    text(ctx, 'strong acids', (BAND[0] + BAND[1]) / 2, Y + 30, PAL.muted, { size: 17, align: 'center' });
    F.arrow(ctx, 680, 176, 960, 176, PAL.muted, 3);
    text(ctx, 'stronger acid', 668, 176, PAL.muted, { size: 17, align: 'right' });
    ORDER.forEach((v) => {
      const x = SPOT[v], on = ion.a(v);
      F.dot(ctx, x, Y, hue, false, 10);
      if (on > 0.01) { ctx.save(); ctx.globalAlpha = on; F.dot(ctx, x, Y, hue, true, 11); ctx.restore(); }
      text(ctx, ION[v].acidPlain, x, Y - 40, PAL.ink, { size: 22, align: 'center', weight: on > 0.5 ? 600 : 400 });
    });
  }

  function readout() {
    const t = ION[ion.value], weak = t.pKa !== null;
    const tex = `\\mk{a}{${t.acid}(aq)} + \\mk{w}{\\text{H}_{2}\\text{O}(l)}\\mk{r}{\\;${weak ? '\\rightleftharpoons' : '\\longrightarrow'}\\;}\\mk{h}{\\text{H}_{3}\\text{O}^{+}(aq)} + \\mk{b}{${t.tex}(aq)}`
      + (weak ? `\\qquad \\mk{k}{\\kpKa = ${t.pKa.toFixed(1)}}` : '');
    const n = t.n, ox = 2 * n - 1;
    const note = `With ${COUNT[n]} oxygen atom${n > 1 ? 's' : ''} at 2− and a charge of 1− on the ion, chlorine’s oxidation state is ${ox}+.`;
    ro.set(tex, note, { form: weak });
  }

  function draw() {
    if (VIEW.value === '3d' && V?.scene) draw3d(); else draw2d();
    drawStrip();
    readout();
  }
  register(d.fig, { update: () => {}, draw });
})();
};
