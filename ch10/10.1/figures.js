/* Figures for section 10.1 Intermolecular Forces. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['10.1'] = function (root, F) {
const { el, fmt, tex, C, PAL, alpha, ctl, cycle, register, begin, line, dot, text, topline, hbracket, axes, label } = F;
const sim = (id, H) => F.sim(root, id, H);
function readout(host, main, small) { tex(host, main); if (small) host.appendChild(el('small', null, small)); }
const TAU = 2 * Math.PI;
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;
const neg = (x) => (x < 0 ? '−' + fmt(-x, 0) : fmt(x, 0));
const texNum = (x, d = 0) => (x < 0 ? '-' : '') + fmt(Math.abs(x), d);
/* a reproducible scatter, so the particles start in the same places on every visit */
function rng(seed) { let a = seed >>> 0; return () => { a = (a + 0x6d2b79f5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
/* one atom in the element palette, with a faint ink rim so that it shows on the page */
function atom(ctx, e, x, y, r) {
  ctx.save(); ctx.fillStyle = F.el(e); ctx.strokeStyle = alpha(PAL.ink, 0.5); ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore();
}
/* Table 10.1: the halogens, molar mass (g/mol), atomic radius (pm), melting and boiling points (K) */
const HAL = [
  { k: 'F', f: 'F₂', tf: 'F_{2}', name: 'fluorine', M: 38, r: 72, mp: 53, bp: 85 },
  { k: 'Cl', f: 'Cl₂', tf: 'Cl_{2}', name: 'chlorine', M: 71, r: 99, mp: 172, bp: 238 },
  { k: 'Br', f: 'Br₂', tf: 'Br_{2}', name: 'bromine', M: 160, r: 114, mp: 266, bp: 332 },
  { k: 'I', f: 'I₂', tf: 'I_{2}', name: 'iodine', M: 254, r: 133, mp: 387, bp: 457 },
  { k: 'At', f: 'At₂', tf: 'At_{2}', name: 'astatine', M: 420, r: 150, mp: 575, bp: 610 },
];

/* =====================================================================
   FIGURE 10.2: one halogen of Table 10.1 in a stoppered flask, drawn
   flat so that every molecule is seen. The temperature sets how fast the
   molecules move; the halogen sets how strongly they attract, told by its
   melting and boiling points. Below the melting point the molecules
   vibrate about the places of a crystal on the floor of the flask,
   between the two points they slide over one another in a pool, and
   above the boiling point they fly across the whole flask. Beside it,
   each halogen's solid, liquid and gas ranges stand on one temperature
   axis with the temperature as a line across them, so the reader reads at
   once which halogens are gases, liquids or solids at that temperature.
   Moving: the motion against the attraction is the idea.
===================================================================== */
(function () {
  const d = sim('sim-phases', 640);
  const ROOM = 298;
  const X = F.choice(d.controls, { label: '\\text{halogen}', options: HAL.map((h) => ({ value: h.k, label: h.f })), value: 'Br', aria: 'the halogen in the flask', onInput: () => { T.refresh(); settle(); } });
  const hal = () => HAL.find((h) => h.k === X.value);
  const T = ctl(d.controls, { label: '\\kT', cls: 'temperature', min: 10, max: 650, step: 1, value: ROOM, unit: 'K', dec: 0, aria: 'temperature in kelvin',
    specials: [{ at: ROOM, label: 'room temperature' }, { at: () => hal().mp, label: 'melting point' }, { at: () => hal().bp, label: 'boiling point' }] });
  /* the flask: its centre, the top of the glass, the foot of the neck, the base, the half widths of neck and base; the stopper's foot */
  const FX = 360, RIM = 122, NECK = 214, BASE = 604, NW = 50, BW = 255, STOP = 196;
  const hw = (y) => (y <= NECK ? NW : NW + ((y - NECK) / (BASE - NECK)) * (BW - NW));
  function flaskPath(ctx, lip) {
    ctx.beginPath();
    if (lip) ctx.moveTo(FX - NW - 9, RIM - 6); else ctx.moveTo(FX - NW, RIM);
    ctx.lineTo(FX - NW, RIM + (lip ? 3 : 0)); ctx.arcTo(FX - NW, NECK, FX - BW, BASE, 16); ctx.arcTo(FX - BW, BASE, FX + BW, BASE, 26); ctx.arcTo(FX + BW, BASE, FX + NW, NECK, 26); ctx.arcTo(FX + NW, NECK, FX + NW, RIM, 16); ctx.lineTo(FX + NW, RIM + (lip ? 3 : 0));
    if (lip) ctx.lineTo(FX + NW + 9, RIM - 6);
  }
  /* the inward normals of the two sloping walls, and a point on each */
  const sl = Math.hypot(BW - NW, BASE - NECK), nR = [-(BASE - NECK) / sl, (BW - NW) / sl], nL = [(BASE - NECK) / sl, (BW - NW) / sl];
  const N = 34, r = rng(1021);
  const ms = Array.from({ length: N }, () => ({ x: FX, y: BASE - 40, vx: 0, vy: 0, a: r() * TAU, w: (r() - 0.5) * 4, f: 0.6 + 0.8 * r(), ph: [r() * TAU, r() * TAU, r() * TAU], site: null }));
  const size = () => 4 + hal().r * 0.09;                 /* the drawn atomic radius grows with Table 10.1's, though not in proportion, so that fluorine still fills a pool */
  /* the places of the crystal: rows of at most eight molecules lying end to end, from the floor up, each row offset by half a place */
  function sites() {
    const ra = size(), dx = 3.35 * ra, dy = 2.15 * ra, out = [];
    for (let j = 0; out.length < N; j++) {
      const y = BASE - 8 - 1.1 * ra - j * dy, n = Math.max(1, Math.min(8, Math.floor((2 * (hw(y) - 10 - 1.7 * ra)) / dx) + 1)), x0 = FX - ((n - 1) * dx) / 2 + (j % 2 ? dx / 4 : -dx / 4);
      for (let i = 0; i < n && out.length < N; i++) out.push([x0 + i * dx, y]);
    }
    return out;
  }
  const phaseAt = (T0, h) => (T0 < h.mp ? 'solid' : T0 < h.bp ? 'liquid' : 'gas');
  let last = '';
  /* the walls: the neck above its foot, the sloping sides below it, the floor, the stopper */
  function walls(m, R) {
    if (m.y < STOP + R) { m.y = STOP + R; m.vy = Math.abs(m.vy); }
    if (m.y > BASE - 4 - R) { m.y = BASE - 4 - R; m.vy = -Math.abs(m.vy); }
    if (m.y < NECK) {
      if (m.x < FX - NW + R) { m.x = FX - NW + R; m.vx = Math.abs(m.vx); }
      if (m.x > FX + NW - R) { m.x = FX + NW - R; m.vx = -Math.abs(m.vx); }
      return;
    }
    for (const [n, x0] of [[nR, FX + NW], [nL, FX - NW]]) {
      const dist = (m.x - x0) * n[0] + (m.y - NECK) * n[1];
      if (dist < R) { m.x += (R - dist) * n[0]; m.y += (R - dist) * n[1]; const vn = m.vx * n[0] + m.vy * n[1]; if (vn < 0) { m.vx -= 2 * vn * n[0]; m.vy -= 2 * vn * n[1]; } }
    }
  }
  let t = 0;
  function step(h) {
    t += h;
    const hl = hal(), T0 = T.v, ph = phaseAt(T0, hl), ra = size(), R = 1.45 * ra;
    const vg = Math.max(45, 62 * Math.sqrt(T0 / hl.M));
    if (ph === 'solid' && last !== 'solid') {
      /* each molecule takes the nearest free place of the crystal, the lowest molecules first */
      const free = sites();
      ms.slice().sort((a, b) => b.y - a.y).forEach((m) => { let bi = 0, bd = Infinity; free.forEach((s, i) => { const dd = Math.hypot(s[0] - m.x, s[1] - m.y); if (dd < bd) { bd = dd; bi = i; } }); m.site = free.splice(bi, 1)[0]; });
    }
    if (ph !== 'solid') ms.forEach((m) => { m.site = null; });
    last = ph;
    if (ph === 'solid') {
      const amp = ra * (0.05 + 0.18 * Math.min(1, T0 / hl.mp));
      ms.forEach((m) => {
        const tx = m.site[0] + amp * Math.sin(11 * t + m.ph[0]), ty = m.site[1] + amp * Math.sin(13 * t + m.ph[1]), k = Math.min(1, 7 * h);
        m.x += (tx - m.x) * k; m.y += (ty - m.y) * k; m.vx = 0; m.vy = 0;
        let da = (0.12 * Math.sin(9 * t + m.ph[2]) - m.a) % Math.PI; if (da > Math.PI / 2) da -= Math.PI; if (da < -Math.PI / 2) da += Math.PI;
        m.a += da * k;
      });
      return;
    }
    if (ph === 'gas') {
      ms.forEach((m) => {
        let sp = Math.hypot(m.vx, m.vy); const want = vg * m.f;
        if (sp < 1e-3) { const a = r() * TAU; m.vx = Math.cos(a); m.vy = Math.sin(a); sp = 1; }
        const k = sp + (want - sp) * Math.min(1, 2 * h); m.vx *= k / sp; m.vy *= k / sp;
        m.x += m.vx * h; m.y += m.vy * h; m.a += m.w * (vg / 120) * h;
      });
    } else {
      /* a liquid: the molecules settle under a pull to the floor and jostle with the heat, staying in contact */
      const jig = 3.2 * vg;
      ms.forEach((m) => {
        m.vy += 1400 * h; m.vx += (r() - 0.5) * jig * Math.sqrt(h) * 2.2; m.vy += (r() - 0.5) * jig * Math.sqrt(h) * 2.2;
        const damp = Math.max(0, 1 - 4 * h); m.vx *= damp; m.vy *= damp;
        m.x += m.vx * h; m.y += m.vy * h; m.w += (r() - 0.5) * 6 * h; m.w *= 0.99; m.a += m.w * h;
      });
    }
    /* contacts: two molecules never overlap; in the gas they bounce off one another */
    for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
      const a = ms[i], b = ms[j], dx = b.x - a.x, dy = b.y - a.y, L = Math.hypot(dx, dy), m2 = 2 * R;
      if (ph === 'liquid' && L >= m2 && L < 1.5 * m2) {
        /* neighbours in the liquid pull together, which keeps the pool whole */
        const ux = dx / L, uy = dy / L, k = 500 * h; a.vx += ux * k; a.vy += uy * k; b.vx -= ux * k; b.vy -= uy * k;
      }
      if (L < m2 && L > 1e-6) {
        const ux = dx / L, uy = dy / L, push = (m2 - L) / 2;
        a.x -= ux * push; a.y -= uy * push; b.x += ux * push; b.y += uy * push;
        const rv = (b.vx - a.vx) * ux + (b.vy - a.vy) * uy;
        if (rv < 0) { const k = ph === 'gas' ? 1 : 0.6; a.vx += k * rv * ux; a.vy += k * rv * uy; b.vx -= k * rv * ux; b.vy -= k * rv * uy; }
      }
    }
    ms.forEach((m) => walls(m, R));
  }
  function advance(dt) { const n = Math.max(1, Math.ceil(dt / (1 / 120))); for (let i = 0; i < n; i++) step(Math.min(dt, 0.1) / n); }
  /* a new halogen starts from a spread of the flask and settles before it is drawn */
  function settle() {
    last = '';
    const sp = sites();
    ms.forEach((m, i) => { m.x = sp[i][0] + (r() - 0.5) * 6; m.y = sp[i][1] - (phaseAt(T.v, hal()) === 'gas' ? 260 * r() : 0); m.vx = (r() - 0.5) * 60; m.vy = (r() - 0.5) * 60; });
    for (let i = 0; i < 120; i++) step(1 / 60);
  }
  settle();
  const hits = []; F.hover(d.stage, () => hits);
  /* the chart: each halogen's solid, liquid and gas ranges on one temperature axis, 0 to 700 K by 100 */
  const BOX = { l: 760, r: 1196, t: 120, b: 548 };
  const WHAT = { solid: 'a solid: its molecules vibrate about fixed places', liquid: 'a liquid: its molecules slide past one another but stay together', gas: 'a gas: its molecules fly apart and fill the flask' };
  function draw() {
    const { ctx } = begin(d.c); hits.length = 0;
    const hl = hal(), T0 = T.v, ph = phaseAt(T0, hl), ra = size(), ct = C('temperature');
    /* the flask: a faint tint of glass, the stopper in the neck, then the glass itself */
    ctx.save(); flaskPath(ctx, false); ctx.closePath(); ctx.fillStyle = alpha(PAL.muted, 0.07); ctx.fill(); ctx.restore();
    ctx.save(); ctx.fillStyle = alpha(PAL.muted, 0.55); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.moveTo(FX - NW - 14, 84); ctx.lineTo(FX + NW + 14, 84); ctx.lineTo(FX + NW - 2, STOP); ctx.lineTo(FX - NW + 2, STOP); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore();
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; flaskPath(ctx, true); ctx.stroke(); ctx.restore();
    hits.push({ x: FX, y: 140, r: 50, name: 'the stopper, which seals the flask' });
    /* the molecules: a short trail behind each moving one, then its two atoms */
    const b = 0.62 * ra, nm = 'a ' + hl.name + ' molecule, ' + hl.f;
    if (ph !== 'solid') ms.forEach((m) => { const k = ph === 'gas' ? 0.16 : 0.1; line(ctx, m.x, m.y, m.x - m.vx * k, m.y - m.vy * k, alpha(F.el(hl.k), 0.3), 1.4 * ra); });
    ms.forEach((m) => {
      const c = Math.cos(m.a) * b, s = Math.sin(m.a) * b;
      atom(ctx, hl.k, m.x - c, m.y - s, ra); atom(ctx, hl.k, m.x + c, m.y + s, ra);
      hits.push({ x: m.x, y: m.y, r: 1.6 * ra, name: nm });
    });
    /* the chart */
    const g = axes(ctx, BOX, [0, 5], [0, 700], { nx: 0, ny: 7, yl: 'temperature (K)', yc: ct, xl: 'larger molecules, stronger dispersion forces →' });
    const cw = 58, names = [];
    HAL.forEach((h, i) => {
      const cx = g.X(i + 0.5), x0 = cx - cw / 2, on = h.k === hl.k;
      ctx.save();
      /* three distinct bands: the solid dense, the liquid half as dense and ruled at its two ends, the gas bare */
      ctx.fillStyle = PAL.panel; ctx.fillRect(x0, g.Y(700), cw, g.Y(0) - g.Y(700));
      ctx.fillStyle = alpha(PAL.ink, on ? 0.62 : 0.5); ctx.fillRect(x0, g.Y(h.mp), cw, g.Y(0) - g.Y(h.mp));
      ctx.fillStyle = alpha(PAL.ink, on ? 0.3 : 0.24); ctx.fillRect(x0, g.Y(h.bp), cw, g.Y(h.mp) - g.Y(h.bp));
      [h.mp, h.bp].forEach((v) => line(ctx, x0, g.Y(v), x0 + cw, g.Y(v), alpha(PAL.ink, on ? 0.8 : 0.45), on ? 2 : 1.5));
      ctx.strokeStyle = on ? PAL.ink : alpha(PAL.ink, 0.3); ctx.lineWidth = on ? 3 : 1.5; ctx.strokeRect(x0, g.Y(700), cw, g.Y(0) - g.Y(700));
      ctx.restore();
      text(ctx, h.f, cx, BOX.b + 26, on ? PAL.ink : PAL.muted, { size: 20, weight: on ? 600 : 400, align: 'center' });
      hits.push({ x: cx, y: g.Y(h.mp / 2), r: 26, name: h.name + ': solid below ' + h.mp + ' K' }, { x: cx, y: g.Y(Math.min(680, h.bp + 60)), r: 26, name: h.name + ': gas above ' + h.bp + ' K' });
      if (h.bp - h.mp > 25) hits.push({ x: cx, y: g.Y((h.mp + h.bp) / 2), r: 18, name: h.name + ': liquid from ' + h.mp + ' to ' + h.bp + ' K' });
      if (on) {
        /* the three ranges named inside the chosen column, where a range is tall enough to hold its name: each name
           stands at the middle of its range, or at the nearest place clear of the temperature and room-temperature
           lines, and over the line only where the range has no clear place */
        const yT = g.Y(T.v), yR = g.Y(ROOM);
        [['solid', 0, h.mp], ['liquid', h.mp, h.bp], ['gas', h.bp, 700]].forEach(([s, lo, hi]) => {
          const top = g.Y(hi) + 11, bot = g.Y(lo) - 11; if (bot < top) return;
          const mid = (top + bot) / 2, ys = [];
          for (let k = 0; k <= 16; k++) ys.push(top + ((bot - top) * k) / 16);
          ys.sort((a, b) => Math.abs(a - mid) - Math.abs(b - mid)); ys.unshift(mid);
          const best = ys.find((y) => Math.abs(y - yT) >= 13 && Math.abs(y - yR) >= 11) ?? mid;
          names.push([s, cx, best]);
        });
      }
    });
    /* room temperature, and the temperature set, as levels across every column */
    const yT = g.Y(T0), yR = g.Y(ROOM);
    if (Math.abs(yT - yR) > 3) {
      line(ctx, BOX.l, yR, BOX.r, yR, alpha(PAL.ink, 0.45), 2, [10, 10]);
      if (Math.abs(yT - yR) > 26) text(ctx, 'room temperature', BOX.r + 10, yR, PAL.muted, { size: 16 });
    }
    line(ctx, BOX.l, yT, BOX.r, yT, ct, 4);
    /* each name on a plate of the page colour that stays inside its column */
    names.forEach(([s, x, y]) => { ctx.fillStyle = PAL.panel; ctx.fillRect(x - cw / 2 + 3, y - 10, cw - 6, 20); text(ctx, s, x, y, PAL.ink, { size: 16, align: 'center' }); });
    text(ctx, 'T = ' + T0 + ' K', BOX.r + 10, yT, ct, { size: 18, weight: 600 });
    if (T0 === ROOM) text(ctx, 'room temperature', BOX.r + 10, yT + 24, PAL.muted, { size: 16 });
    topline(ctx, 'At ' + T0 + ' K ' + hl.name + ' is ' + WHAT[ph] + '.');
    const mp = hue('temperature', hl.mp + '\\ \\text{K}'), bp = hue('temperature', hl.bp + '\\ \\text{K}'), tt = `\\kT = ${hue('temperature', T0 + '\\ \\text{K}')}`;
    readout(d.readout, ph === 'solid' ? `${tt} < ${mp}\\ \\text{(melting point)}` : ph === 'liquid' ? `\\text{melting point } ${mp} \\le ${tt} < ${bp}\\ \\text{(boiling point)}` : `${tt} \\ge ${bp}\\ \\text{(boiling point)}`);
  }
  const clk = cycle(() => Infinity, 0);
  register(d.fig, { update: (dt) => { clk.step(dt, () => 1); advance(dt); }, draw });
})();

/* =====================================================================
   FIGURE 10.6: the dispersion force between two molecules of a halogen of
   Table 10.1. The electrons of the left molecule shift from end to end on
   a clock, and the neighbor's electrons follow a moment later, so that the
   facing ends always carry opposite partial charges and attract. Moving:
   the book calls the dipoles "rapidly fluctuating". The halogen choice
   sets the size of the atoms on one fixed scale (Table 10.1's atomic
   radii) and how far the electrons shift, the polarizability; the readout
   gives the radius and the boiling point. Flat: the charge moves along one
   axis, as the book draws it.
===================================================================== */
(function () {
  const d = sim('sim-dispersion', 520);
  const X = F.choice(d.controls, { label: '\\text{halogen}', options: HAL.map((h) => ({ value: h.k, label: h.f })), value: 'Cl', aria: 'the halogen' });
  const hal = () => HAL.find((h) => h.k === X.value);
  const hits = []; F.hover(d.stage, () => hits);
  let t = 0;
  const CUT = Math.acos(0.62);   /* where the two atoms' outlines meet, as an angle from the line of centres */
  const pulse = (u) => 0.62 * Math.sin(2.1 * u) + 0.38 * Math.sin(3.4 * u + 1.2);
  /* one molecule, two atoms ra in radius whose centres stand 1.24 ra apart; s, −1 to 1, is how far its electrons have shifted to the right */
  function molecule(ctx, cx, cy, ra, s, h) {
    const dx = 0.62 * ra, x0 = cx - dx - ra, x1 = cx + dx + ra, k = Math.min(1, 1.4 * Math.abs(s));
    const shape = () => { ctx.beginPath(); ctx.arc(cx - dx, cy, ra, 0, TAU); ctx.moveTo(cx + dx + ra, cy); ctx.arc(cx + dx, cy, ra, 0, TAU); };
    const plus = F.mixColor(PAL.soft, F.cat(0), k), minus = F.mixColor(PAL.soft, F.cat(1), k);
    ctx.save(); shape(); ctx.clip();
    const gr = ctx.createLinearGradient(x0, 0, x1, 0), [cl, cr] = s >= 0 ? [plus, minus] : [minus, plus];
    gr.addColorStop(0, cl); gr.addColorStop(0.42, cl); gr.addColorStop(0.58, cr); gr.addColorStop(1, cr);
    ctx.fillStyle = gr; ctx.fillRect(x0 - 2, cy - ra - 2, x1 - x0 + 4, 2 * ra + 4);
    ctx.restore();
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(cx - dx, cy, ra, CUT, TAU - CUT); ctx.stroke(); ctx.restore();
    ctx.save(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(cx + dx, cy, ra, Math.PI + CUT, 3 * Math.PI - CUT); ctx.stroke(); ctx.restore();
    dot(ctx, cx - dx, cy, PAL.ink, true, 7); dot(ctx, cx + dx, cy, PAL.ink, true, 7);
    const a = Math.max(0, Math.min(1, (k - 0.15) / 0.25));
    if (a > 0) F.faded(ctx, a, [0, 0], () => {
      text(ctx, s > 0 ? 'δ+' : 'δ−', x0 + 0.42 * ra, cy, PAL.ink, { size: 24, weight: 600, align: 'center', bg: PAL.panel });
      text(ctx, s > 0 ? 'δ−' : 'δ+', x1 - 0.42 * ra, cy, PAL.ink, { size: 24, weight: 600, align: 'center', bg: PAL.panel });
    });
    hits.push({ x: cx - dx, y: cy, r: ra, name: 'a ' + h.name + ' atom, ' + h.k }, { x: cx + dx, y: cy, r: ra, name: 'a ' + h.name + ' atom, ' + h.k });
    return { x0, x1 };
  }
  function draw() {
    const { ctx } = begin(d.c); hits.length = 0;
    /* one scale for every halogen: 0.85 canvas units per picometre of atomic radius */
    const h = hal(), ra = h.r * 0.85, amp = 0.35 + 0.65 * (h.r - 72) / (150 - 72);
    const s1 = amp * pulse(t), s2 = 0.85 * amp * pulse(t - 0.05), gap = 130;   /* the induced dipole follows the first almost at once, a little weaker */
    const w = 3.24 * ra, cxA = 700 - gap / 2 - w / 2, cxB = 700 + gap / 2 + w / 2, cy = 250;
    const A = molecule(ctx, cxA, cy, ra, s1, h), B = molecule(ctx, cxB, cy, ra, s2, h);
    const k = Math.min(1, Math.abs(s1 * s2) / (0.25 * amp * amp + 0.02));
    F.faded(ctx, 0.15 + 0.85 * k, [0, 0], () => { line(ctx, A.x1 + 18, cy, B.x0 - 18, cy, PAL.ink, 8, [1, 18]); });
    label(ctx, 'attractive force', (A.x1 + B.x0) / 2, cy - 12, { side: 'above', leader: true, size: 20, gap: Math.max(70, ra + 10) });
    label(ctx, 'unequal distribution of electrons', cxA - 0.62 * ra, cy - ra + 6, { side: 'above', leader: true, size: 20, gap: 56 });
    const yb = cy + ra + 34;
    hbracket(ctx, A.x0, A.x1, yb, PAL.ink); hbracket(ctx, B.x0, B.x1, yb, PAL.ink);
    text(ctx, 'temporary dipoles', 700, yb + 34, PAL.ink, { size: 20, align: 'center', weight: 600 });
    F.legend(ctx, { l: 300, r: 1100, t: 470, b: 510 }, [{ s: 'δ+ end, fewer electrons', color: F.cat(0), kind: 'swatch' }, { s: 'δ− end, more electrons', color: F.cat(1), kind: 'swatch' }], { corner: 'top', row: true, panel: false });
    readout(d.readout, `\\text{atomic radius of ${h.k}} = ${h.r}\\ \\text{pm} \\\\ \\text{boiling point of } \\text{${h.tf.replace('_{2}', '}_2\\text{')}} = ${hue('temperature', h.bp + '\\ \\text{K}')}`);
  }
  const clk = cycle(() => Infinity, 0);
  register(d.fig, { update: (dt) => { clk.step(dt, () => 1); t += dt; }, draw });
})();

/* =====================================================================
   FIGURE 10.11 + 10.12: the boiling points of the binary hydrides of
   groups 15, 16 and 17 against the period, with the carbon family of
   Example 10.1 beside them. The choice moves the three period-2 points
   from where the heavier hydrides' trends predict them (the text's −120,
   −80 and −110 °C, dashed as in Figure 10.11) to where they are measured
   (Figure 10.12), and the lines bend with them; CH₄, which forms no
   hydrogen bonds, stays on its trend in both. Still. The families are the
   section's referents, each in its F.ref; the temperature axis wears its
   hue. Values read off the book's images: Figure 10.12 for groups 15 to
   17, Example 10.1's graph for group 14.
===================================================================== */
(function () {
  const d = sim('sim-hydrides', 740);
  /* boiling points, °C, periods 2 to 5; pred is the text's prediction for period 2 (none for the carbon family) */
  const FAM = [
    { id: 'group-17', name: 'group 17', f: ['HF', 'HCl', 'HBr', 'HI'], bp: [20, -85, -67, -35], pred: -110 },
    { id: 'group-16', name: 'group 16', f: ['H₂O', 'H₂S', 'H₂Se', 'H₂Te'], bp: [100, -60, -41, -2], pred: -80 },
    { id: 'group-15', name: 'group 15', f: ['NH₃', 'PH₃', 'AsH₃', 'SbH₃'], bp: [-33, -88, -62, -17], pred: -120 },
    { id: 'group-14', name: 'group 14', f: ['CH₄', 'SiH₄', 'GeH₄', 'SnH₄'], bp: [-160, -120, -90, -52], pred: null },
  ];
  /* where each label of periods 3 to 5 stands from its point [dx, dy, align], as the book sets them; the carbon family, which the
     book's graph does not carry, is named on CH₄ alone and by hover elsewhere, since its labels would crowd those of the others */
  const AT = {
    HCl: [14, -20, 'left'], HBr: [-12, 18, 'right'], HI: [16, 0, 'left'],
    'H₂S': [14, -20, 'left'], 'H₂Se': [0, -24, 'center'], 'H₂Te': [16, -18, 'left'],
    'PH₃': [12, 22, 'left'], 'AsH₃': [-16, -12, 'right'], 'SbH₃': [16, 0, 'left'],
  };
  const M = F.choice(d.controls, { label: '\\text{period 2}', options: [{ value: 'trend', label: 'predicted from the trend' }, { value: 'measured', label: 'measured' }], value: 'trend', aria: 'predicted or measured boiling points of the period 2 hydrides' });
  const hits = []; F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c); hits.length = 0;
    const ct = C('temperature'), box = { l: 200, r: 1240, t: 120, b: 680 };
    /* fixed axes: periods 1 to 6 with the ticks named at 2 to 5, −200 °C to 150 °C by 50 */
    const g = axes(ctx, box, [1, 6], [-200, 150], { xl: 'period', yl: 'boiling point (°C)', yc: ct, nx: 5, ny: 7, fx: (v) => (v >= 2 && v <= 5 ? String(v) : '') });
    const p2 = M.mix((v) => FAM.map((fm) => (v === 'trend' && fm.pred !== null ? fm.pred : fm.bp[0])));
    const meas = M.value === 'measured';
    FAM.forEach((fm, i) => {
      const col = F.ref(fm.id), ys = [p2[i], ...fm.bp.slice(1)], guess = fm.pred !== null && !meas;
      line(ctx, g.X(2), g.Y(ys[0]), g.X(3), g.Y(ys[1]), col, 4, guess ? [10, 10] : undefined);
      for (let j = 1; j < 3; j++) line(ctx, g.X(j + 2), g.Y(ys[j]), g.X(j + 3), g.Y(ys[j + 1]), col, 4);
      ys.forEach((y, j) => {
        const hollow = j === 0 && guess;
        dot(ctx, g.X(j + 2), g.Y(y), col, !hollow, 10);
        hits.push({ x: g.X(j + 2), y: g.Y(y), r: 14, name: fm.f[j] + (hollow ? ', predicted about ' : ', boils at ') + neg(j === 0 && fm.pred !== null ? (meas ? fm.bp[0] : fm.pred) : y) + ' °C' });
        if (j > 0 && AT[fm.f[j]]) { const [dx, dy, al] = AT[fm.f[j]]; text(ctx, fm.f[j], g.X(j + 2) + dx, g.Y(y) + dy, col, { size: 18, weight: 600, align: al, bg: PAL.panel }); }
      });
    });
    /* the period-2 names left of their points, spread apart where two lie close (HF and NH₃ as predicted) */
    const p2names = FAM.map((fm, i) => ({ s: fm.pred !== null && !meas ? fm.f[0] + ' ?' : fm.f[0], y: g.Y(p2[i]), col: F.ref(fm.id) })).sort((a, b) => a.y - b.y);
    p2names.forEach((q, i) => { if (i && q.y < p2names[i - 1].y + 24) q.y = p2names[i - 1].y + 24; text(ctx, q.s, g.X(2) - 18, q.y, q.col, { size: 18, weight: 600, align: 'right', bg: PAL.panel }); });
    F.legend(ctx, g, FAM.map((fm) => ({ s: fm.name, color: F.ref(fm.id), kind: 'line', w: 4 })), { corner: 'br' });
    topline(ctx, meas ? 'Measured, H₂O boils at 100 °C, HF at 20 °C and NH₃ at −33 °C, far above the trends of the heavier hydrides.'
      : 'The trends of the heavier hydrides predict that H₂O boils near −80 °C, HF near −110 °C and NH₃ near −120 °C.');
    readout(d.readout, meas ? `\\text{boiling point of H}_2\\text{O} = ${hue('temperature', '100\\ ^\\circ\\text{C}')} \\gg ${hue('temperature', texNum(-80) + '\\ ^\\circ\\text{C}')}\\ \\text{(trend)}`
      : `\\text{boiling point of H}_2\\text{O} \\approx ${hue('temperature', texNum(-80) + '\\ ^\\circ\\text{C}')}\\ \\text{(trend)}`);
  }
  register(d.fig, { update: () => {}, draw });
})();
};
