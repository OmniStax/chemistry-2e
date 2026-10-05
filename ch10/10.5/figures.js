/* Figures for section 10.5 The Solid State of Matter. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['10.5'] = function (root, F) {
const { el, fmt, tex, C, PAL, alpha, ctl, register, begin, line, dot, text, topline, axes, label } = F;
const sim = (id, H) => F.sim(root, id, H);
function readout(host, main, small) { tex(host, main); if (small) host.appendChild(el('small', null, small)); }
const TAU = 2 * Math.PI, R3 = Math.sqrt(3);
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;
const degC = (x) => hue('temperature', `{${x < 0 ? '-' : ''}${Math.abs(x)}}\\ ^\\circ\\text{C}`);
const palSig = () => [PAL.ink, PAL.panel, PAL.muted, ...['Na', 'Cl', 'Cu', 'C', 'Si', 'O', 'I'].map((e) => F.el(e))].join('|');
function rng(seed) { let a = seed >>> 0; return () => { a = (a + 0x6d2b79f5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
const dist3 = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
const mid3 = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2];
function ball(ctx, x, y, r, fill, stroke = alpha(PAL.ink, 0.5), w = 1.4) {
  ctx.save(); ctx.fillStyle = fill; ctx.strokeStyle = stroke; ctx.lineWidth = w; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore();
}

/* =====================================================================
   FIGURE 10.37 + 10.38: silicon dioxide as a flat network, crystalline
   (quartz) or amorphous (fused silica). The same atoms and links serve
   both: the choice bends the ordered net into a strained, disordered one.
   Every link of the crystal has the one length, so all break at the
   melting point; each link of the glass breaks at a temperature set by
   its strain, spread between 1100 °C and 1713 °C, the weakest first.
   Still: nothing has a clock. The graph beneath is the share of links
   broken against temperature, fixed axes 1000 to 1800 °C and 0 to 100 %.
===================================================================== */
(function () {
  const d = sim('sim-order', 660);
  const MP = 1713, SOFT = 1100;
  const FORM = F.choice(d.controls, { label: '\\text{form}', options: [{ value: 'crystal', label: 'crystalline (quartz)' }, { value: 'glass', label: 'amorphous (fused silica)' }], value: 'crystal', aria: 'crystalline or amorphous silicon dioxide' });
  const T = ctl(d.controls, { label: '\\kT', cls: 'temperature', min: 1000, max: 1800, step: 10, value: 1400, unit: '°C', dec: 0, aria: 'temperature in degrees Celsius', specials: [{ at: MP, label: 'melting point' }] });
  const L = 74, CX = 700, CY = 215, HW = 430, HH = 128;
  const si = [];
  for (let j = -4; j <= 4; j++) for (let i = -8; i <= 8; i++) for (const b of [0, 1]) {
    const x = CX + (i + j / 2) * R3 * L, y = CY + j * 1.5 * L + b * L - L / 2;
    if (Math.abs(x - CX) <= HW && Math.abs(y - CY) <= HH) si.push([x, y]);
  }
  const links = [];
  for (let a = 0; a < si.length; a++) for (let b = a + 1; b < si.length; b++) if (Math.abs(Math.hypot(si[a][0] - si[b][0], si[a][1] - si[b][1]) - L) < 1) links.push([a, b]);
  const deg = si.map(() => []);
  links.forEach(([a, b]) => { deg[a].push(b); deg[b].push(a); });
  /* a terminal oxygen on each silicon that has fewer than three neighbours, along a missing direction */
  const term = [];
  si.forEach((p, a) => {
    const have = deg[a].map((b) => Math.atan2(si[b][1] - p[1], si[b][0] - p[0]));
    const up = deg[a].some((b) => si[b][1] < p[1] - 1) ? Math.PI / 2 : -Math.PI / 2;
    const dirs = [up, up + TAU / 3, up - TAU / 3].filter((t) => !have.some((h) => Math.abs(Math.atan2(Math.sin(h - t), Math.cos(h - t))) < 0.3));
    dirs.slice(0, 3 - deg[a].length).forEach((t) => term.push([a, t]));
  });
  const R = rng(1037);
  const glassSi = si.map(([x, y]) => [x + (R() - 0.5) * 0.44 * L, y + (R() - 0.5) * 0.44 * L]);
  const bend = links.map(() => (R() - 0.5) * 0.7 * L);
  const termTurn = term.map(() => (R() - 0.5) * 1.2);
  /* the strain of each link of the glass, from its stretch and its bend, ranked to its breaking temperature */
  const strain = links.map(([a, b], k) => Math.abs(Math.hypot(glassSi[a][0] - glassSi[b][0], glassSi[a][1] - glassSi[b][1]) - L) / L + Math.abs(bend[k]) / L);
  const order = links.map((_, k) => k).sort((p, q) => strain[q] - strain[p]);
  const breakT = links.map(() => 0);
  order.forEach((k, r) => { breakT[k] = SOFT + ((MP - SOFT) * r) / links.length; });
  const N = links.length;
  const brokenAt = (form, t) => (form === 'crystal' ? (t >= MP ? N : 0) : breakT.filter((b) => b <= t).length);
  const hits = []; F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c); hits.length = 0;
    const k = FORM.mix((v) => (v === 'glass' ? 1 : 0)), t = T.v, form = FORM.value;
    const P = si.map((p, a) => [p[0] + (glassSi[a][0] - p[0]) * k, p[1] + (glassSi[a][1] - p[1]) * k]);
    const broke = (i) => (form === 'crystal' ? t >= MP : breakT[i] <= t);
    const oxy = [];
    links.forEach(([a, b], i) => {
      const A = P[a], B = P[b], len = Math.hypot(B[0] - A[0], B[1] - A[1]) || 1, nx = -(B[1] - A[1]) / len, ny = (B[0] - A[0]) / len;
      let O = [(A[0] + B[0]) / 2 + nx * bend[i] * k, (A[1] + B[1]) / 2 + ny * bend[i] * k];
      if (broke(i)) {
        /* the oxygen stays with one silicon and draws back from the other, leaving a gap across the broken link */
        const [S1, S2] = i % 2 ? [B, A] : [A, B], ux = S1[0] - O[0], uy = S1[1] - O[1], u = Math.hypot(ux, uy) || 1;
        O = [O[0] + (ux / u) * 14, O[1] + (uy / u) * 14];
        const vx = S2[0] - O[0], vy = S2[1] - O[1], w = Math.hypot(vx, vy) || 1;
        line(ctx, S1[0], S1[1], O[0], O[1], PAL.muted, 7);
        line(ctx, O[0] + (vx / w) * 14, O[1] + (vy / w) * 14, S2[0] - (vx / w) * 19, S2[1] - (vy / w) * 19, alpha(PAL.ink, 0.45), 3, [4, 5]);
      } else { line(ctx, A[0], A[1], O[0], O[1], PAL.muted, 7); line(ctx, O[0], O[1], B[0], B[1], PAL.muted, 7); }
      oxy.push(O);
    });
    term.forEach(([a, th], i) => {
      const u = th + termTurn[i] * k, O = [P[a][0] + Math.cos(u) * L * 0.5, P[a][1] + Math.sin(u) * L * 0.5];
      line(ctx, P[a][0], P[a][1], O[0], O[1], PAL.muted, 7); oxy.push(O);
    });
    oxy.forEach((o) => { ball(ctx, o[0], o[1], 11, F.el('O')); hits.push({ x: o[0], y: o[1], r: 11, name: 'an oxygen atom, O' }); });
    P.forEach((p) => { ball(ctx, p[0], p[1], 16, F.el('Si')); hits.push({ x: p[0], y: p[1], r: 16, name: 'a silicon atom, Si' }); });
    const ly = 386;
    ball(ctx, 230, ly, 14, F.el('Si')); text(ctx, 'silicon', 252, ly, PAL.ink, { size: 18 });
    ball(ctx, 360, ly, 10, F.el('O')); text(ctx, 'oxygen', 378, ly, PAL.ink, { size: 18 });
    line(ctx, 496, ly, 524, ly, alpha(PAL.ink, 0.45), 3, [4, 5]); text(ctx, 'broken link', 552, ly, PAL.ink, { size: 18 });
    /* graph: share of links broken, 1000 to 1800 °C by 200, 0 to 100 % by 50 */
    const box = { l: 230, r: 1180, t: 450, b: 580 };
    const { X, Y } = axes(ctx, box, [1000, 1800], [0, 100], { nx: 4, ny: 2, xl: 'T (°C)', xc: C('temperature'), yl: 'links broken (%)', fy: (v) => fmt(v, 0) });
    line(ctx, X(MP), box.t, X(MP), box.b, alpha(PAL.ink, 0.35), 2, [4, 8]);
    text(ctx, 'melting point, 1713 °C', X(MP) - 8, box.t - 22, PAL.muted, { size: 16, align: 'right' });
    FORM.curve(ctx, (v) => (s) => (100 * brokenAt(v, s)) / N, 1000, 1800, X, Y, PAL.ink, 4, 400);
    const n = brokenAt(form, t);
    F.pinned(ctx, box, X, Y, t, (100 * n) / N, C('temperature'));
    const name = form === 'crystal' ? 'crystalline SiO₂' : 'fused silica';
    topline(ctx, form === 'crystal'
      ? (t < MP ? `At ${t} °C none of the ${N} Si–O–Si links of ${name} is broken.` : `At ${t} °C all ${N} Si–O–Si links of ${name} break at once, and the crystal melts.`)
      : (n === 0 ? `At ${t} °C none of the ${N} Si–O–Si links of ${name} is broken yet.` : n === N ? `At ${t} °C all ${N} Si–O–Si links of ${name} are broken, and the glass has melted.` : `At ${t} °C, ${n} of the ${N} Si–O–Si links of ${name} are broken, the most strained ones first.`));
    const tt = `\\kT = ${degC(t)}`;
    const main = form === 'crystal'
      ? `${tt} ${t < MP ? '<' : '\\ge'} ${degC(MP)}\\ (\\text{melting point}):\\ ${n}\\ \\text{of}\\ ${N}\\ \\text{links broken}`
      : `${tt}:\\ ${n}\\ \\text{of}\\ ${N}\\ \\text{links broken}`;
    readout(d.readout, main, form === 'crystal' ? 'Every link of the crystal is alike, so all of them take the same energy to break.' : 'The links of the glass are strained by different amounts, so the glass softens over a range of temperatures.');
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 10.39 + 10.40 + 10.41 + 10.42: the four kinds of crystalline
   solid as crystals to turn. Ions and metal atoms are drawn without
   sticks; covalent bonds, within a network or a molecule, are sticks.
   Still: a crystal answers its choice. No ground, so the pitch is bounded
   only to ±1.3 rad to keep the crystal from flipping past its poles.
===================================================================== */
(function () {
  const d = sim('sim-solids');
  const v = F.view3d(d.stage, { spin: 'idle', pitch: [-1.3, 1.3], tilt: 0.35, h: 460, dist: 9.4, views: [{ label: 'along an axis', yaw: 0, pitch: 0 }, { label: 'along a diagonal', yaw: Math.PI / 4, pitch: 0.6155 }] });
  const grp = v.part(0); if (grp) grp.position.y = -0.35;
  const NM = { Na: 'a sodium ion, Na⁺', Cl: 'a chloride ion, Cl⁻', Cu: 'a copper atom, Cu', C: 'a carbon atom, C', Si: 'a silicon atom, Si', O: 'an oxygen atom, O', I: 'an iodine atom, I' };
  const cube = (n) => { const out = []; for (let i = 0; i <= n; i++) for (let j = 0; j <= n; j++) for (let k = 0; k <= n; k++) out.push([i, j, k]); return out; };
  const centre = (atoms) => { const c = [0, 1, 2].map((q) => (Math.min(...atoms.map((a) => a.p[q])) + Math.max(...atoms.map((a) => a.p[q]))) / 2); atoms.forEach((a) => { a.p = a.p.map((x, q) => x - c[q]); }); return atoms; };
  const bondsBy = (atoms, len, ok = () => true) => { const b = []; for (let i = 0; i < atoms.length; i++) for (let j = i + 1; j < atoms.length; j++) if (Math.abs(dist3(atoms[i].p, atoms[j].p) - len) < 0.02 && ok(atoms[i], atoms[j])) b.push([i, j]); return b; };
  const FCC = [[0, 0, 0], [0.5, 0.5, 0], [0.5, 0, 0.5], [0, 0.5, 0.5]], DIA = [[0.25, 0.25, 0.25], [0.75, 0.75, 0.25], [0.75, 0.25, 0.75], [0.25, 0.75, 0.75]];
  const inCell = (p) => p.every((x) => x > -1e-6 && x < 1 + 1e-6);
  function fccCell() { const s = []; [0, 1].forEach((i) => [0, 1].forEach((j) => [0, 1].forEach((k) => FCC.forEach((f) => { const p = [f[0] + i, f[1] + j, f[2] + k]; if (inCell(p) && !s.some((q) => dist3(q, p) < 1e-6)) s.push(p); })))); return s; }
  function diamondLike(a, el1, el2) {
    const atoms = [...fccCell().map((p) => ({ el: el1, p: p.map((x) => x * a) })), ...DIA.map((p) => ({ el: el2, p: p.map((x) => x * a) }))];
    const bonds = bondsBy(atoms, (R3 / 4) * a), keep = atoms.map((_, i) => bonds.some((b) => b.includes(i))), map = [];
    let n = 0; keep.forEach((k, i) => { map[i] = k ? n++ : -1; });
    return { atoms: atoms.filter((_, i) => keep[i]), bonds: bonds.map(([i, j]) => [map[i], map[j]]) };
  }
  const BUILD = {
    NaCl() { const s = 0.6; return { atoms: cube(3).map(([i, j, k]) => ({ el: (i + j + k) % 2 ? 'Cl' : 'Na', p: [i * s, j * s, k * s] })).map((a) => ({ ...a, r: a.el === 'Na' ? 0.17 : 0.28 })), bonds: [] }; },
    Cu() { const a = 1.05, pts = []; for (let i = 0; i <= 4; i++) for (let j = 0; j <= 4; j++) for (let k = 0; k <= 4; k++) if ((i + j + k) % 2 === 0) pts.push([i * a / 2, j * a / 2, k * a / 2]); return { atoms: pts.map((p) => ({ el: 'Cu', p, r: 0.35 })), bonds: [] }; },
    diamond() { const s = diamondLike(2.2, 'C', 'C'); s.atoms.forEach((x) => { x.r = 0.2; }); return s; },
    SiO2() {
      const s = diamondLike(2.5, 'Si', 'Si'), atoms = s.atoms.map((x) => ({ ...x, r: 0.2 })), bonds = [];
      s.bonds.forEach(([i, j]) => { atoms.push({ el: 'O', p: mid3(atoms[i].p, atoms[j].p), r: 0.14 }); const o = atoms.length - 1; bonds.push([i, o], [o, j]); });
      return { atoms, bonds };
    },
    SiC() { const s = diamondLike(2.2, 'Si', 'C'); s.atoms.forEach((x) => { x.r = x.el === 'Si' ? 0.22 : 0.17; }); return s; },
    graphite() {
      const a = 0.3, gap = 0.71, atoms = [];
      [-1, 0, 1].forEach((layer) => {
        const shift = layer === 0 ? a : 0;
        for (let j = -4; j <= 4; j++) for (let i = -5; i <= 5; i++) for (const b of [0, a]) {
          const x = (i + j / 2) * R3 * a, z = j * 1.5 * a + b + shift;
          if (Math.abs(x) <= 1.25 && Math.abs(z) <= 1.15) atoms.push({ el: 'C', p: [x, layer * gap, z], r: 0.09 });
        }
      });
      return { atoms, bonds: bondsBy(atoms, a, (p, q) => Math.abs(p.p[1] - q.p[1]) < 1e-6) };
    },
    CO2() {
      const a = 2.1, dir = [[1, 1, 1], [1, -1, -1], [-1, -1, 1], [-1, 1, -1]].map((u) => u.map((x) => x / R3)), atoms = [], bonds = [];
      fccCell().forEach((p) => {
        const s = [Math.round(2 * p[0]) % 2, Math.round(2 * p[1]) % 2, Math.round(2 * p[2]) % 2], kind = s[0] === 0 && s[1] === 0 ? (s[2] ? 3 : 0) : s[0] && s[1] ? 1 : s[0] ? 2 : 3;
        const c = p.map((x) => x * a), u = dir[kind], L = 0.3;
        atoms.push({ el: 'C', p: c, r: 0.13 }, { el: 'O', p: c.map((x, q) => x + u[q] * L), r: 0.15 }, { el: 'O', p: c.map((x, q) => x - u[q] * L), r: 0.15 });
        const n = atoms.length; bonds.push([n - 3, n - 2], [n - 3, n - 1]);
      });
      return { atoms, bonds };
    },
    I2() {
      const atoms = [], bonds = [], h = 0.22, tilt = 0.56;
      [-1.05, 0, 1.05].forEach((x, li) => {
        for (let j = -1; j <= 1; j++) for (let k = -1; k <= 1; k++) {
          const c = [x, j * 0.95 + (li % 2 ? 0.47 : 0), k * 0.95], s = (j + k + li) % 2 ? 1 : -1, u = [0, Math.cos(tilt), s * Math.sin(tilt)];
          atoms.push({ el: 'I', p: c.map((q, i) => q + u[i] * h), r: 0.2 }, { el: 'I', p: c.map((q, i) => q - u[i] * h), r: 0.2 });
          bonds.push([atoms.length - 2, atoms.length - 1]);
        }
      });
      return { atoms, bonds };
    },
  };
  const INFO = {
    NaCl: { f: 'NaCl', head: 'Sodium chloride is an ionic solid: Na⁺ and Cl⁻ ions are held together by electrostatic attractions.', ro: '\\text{ions} \\;\\to\\; \\text{ionic bonds} \\;\\to\\; \\text{hard, brittle, high melting point}' },
    Cu: { f: 'Cu', head: 'Copper is a metallic solid: copper atoms are held together by metallic bonding.', ro: '\\text{metal atoms} \\;\\to\\; \\text{metallic bonds} \\;\\to\\; \\text{malleable, conducts heat and electricity}' },
    diamond: { f: 'C (diamond)', head: 'Diamond is a covalent network solid: every carbon atom is bonded to four others.', ro: `\\text{C atoms} \\;\\to\\; \\text{covalent bonds} \\;\\to\\; \\text{very hard, melts above } ${degC(3500)}` },
    SiO2: { f: 'SiO₂', head: 'Silicon dioxide is a covalent network solid: each silicon atom is bonded to four oxygen atoms.', ro: '\\text{Si and O atoms} \\;\\to\\; \\text{covalent bonds} \\;\\to\\; \\text{very hard, very high melting point}' },
    SiC: { f: 'SiC', head: 'Silicon carbide is a covalent network solid: each silicon atom is bonded to four carbon atoms.', ro: '\\text{Si and C atoms} \\;\\to\\; \\text{covalent bonds} \\;\\to\\; \\text{very hard, very high melting point}' },
    graphite: { f: 'C (graphite)', head: 'Graphite is built of planar sheets of covalently bonded carbon atoms, held together in layers by noncovalent forces.', ro: '\\text{C atoms} \\;\\to\\; \\text{covalent bonds in each sheet, weak forces between sheets} \\;\\to\\; \\text{soft, conductive}' },
    CO2: { f: 'CO₂', head: 'Carbon dioxide is a molecular solid of small, nonpolar CO₂ molecules.', ro: `\\text{CO}_{2}\\ \\text{molecules} \\;\\to\\; \\text{IMFs} \\;\\to\\; \\text{melts at } ${degC(-78)}` },
    I2: { f: 'I₂', head: 'Iodine is a molecular solid of larger, nonpolar I₂ molecules.', ro: `\\text{I}_{2}\\ \\text{molecules} \\;\\to\\; \\text{IMFs} \\;\\to\\; \\text{melts at } ${degC(114)}` },
  };
  const S = F.select(d.controls, { label: '\\text{solid}', options: Object.keys(INFO).map((k) => ({ value: k, label: INFO[k].f })), value: 'NaCl', aria: 'the crystalline solid' });
  let sig = '';
  function draw() {
    const key = S.value + '|' + palSig();
    if (key !== sig && grp) {
      sig = key; v.clear();
      const s = BUILD[S.value](); centre(s.atoms);
      s.atoms.forEach((a) => v.pickable(F.mesh.sphere(grp, a.p, a.r, F.el(a.el)), NM[a.el]));
      s.bonds.forEach(([i, j]) => F.mesh.stick(grp, s.atoms[i].p, s.atoms[j].p, 0.05, PAL.muted));
      v.headline(INFO[S.value].head);
    }
    if (grp) F.fade3(grp, S.a(S.value));
    v.invalidate();
    readout(d.readout, INFO[S.value].ro);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 10.44: graphene and its shapes. One hexagonal sheet of carbon
   rolls into a nanotube and back (the choice bends it), lies between two
   more sheets in a stack, or gives way to a buckyball, C60. Still: the
   roll is a choice morph. No ground; pitch bounded to ±1.3 rad.
===================================================================== */
(function () {
  const d = sim('sim-graphene');
  const v = F.view3d(d.stage, { spin: 'idle', pitch: [-1.3, 1.3], tilt: 0.3, h: 460, dist: 9.5, views: [{ label: 'face on', yaw: 0, pitch: 0 }, { label: 'edge on', yaw: Math.PI / 2, pitch: 0 }] });
  const grp = v.part(0);
  const A = 0.2, NC = 10, NR = 9, PER = R3 * A, W = NC * PER, RT = W / TAU, GAP = 0.47;
  const flat = [];
  for (let j = 0; j < NR; j++) for (let i = 0; i < NC; i++) { const x = (((i + j / 2) * PER) % W); flat.push([x, j * 1.5 * A], [x, j * 1.5 * A + A]); }
  const yMid = ((NR - 1) * 1.5 * A + A) / 2;
  flat.forEach((p) => { p[0] -= W / 2; p[1] -= yMid; });
  const idx = (i, j, b) => 2 * (((j * NC) + (((i % NC) + NC) % NC))) + b;
  const sheetBonds = [];
  for (let j = 0; j < NR; j++) for (let i = 0; i < NC; i++) {
    sheetBonds.push([idx(i, j, 0), idx(i, j, 1)]);
    if (j + 1 < NR) sheetBonds.push([idx(i, j, 1), idx(i, j + 1, 0)], [idx(i, j, 1), idx(i - 1, j + 1, 0)]);
  }
  const wraps = sheetBonds.map(([a, b]) => Math.abs(flat[a][0] - flat[b][0]) > W / 2);
  const roll = (p, k) => {
    if (k < 1e-3) return [p[0], p[1], 0];
    const Rk = RT / k, th = p[0] / Rk;
    return [Rk * Math.sin(th), p[1], Rk * Math.cos(th) - Rk + RT];
  };
  const phi = (1 + Math.sqrt(5)) / 2, bucky = [];
  const base = [[0, 1, 3 * phi], [1, 2 + phi, 2 * phi], [phi, 2, phi * phi * phi]];
  base.forEach((b) => [0, 1, 2].forEach((rot) => { const q = [b[rot], b[(rot + 1) % 3], b[(rot + 2) % 3]];
    for (let m = 0; m < 8; m++) { const p = q.map((x, n) => (m >> n) & 1 ? -x : x); if (!bucky.some((r) => dist3(r, p) < 1e-6)) bucky.push(p); } }));
  const bp = bucky.map((p) => p.map((x) => (x * A) / 2));
  const bb = []; for (let i = 0; i < bp.length; i++) for (let j = i + 1; j < bp.length; j++) if (Math.abs(dist3(bp[i], bp[j]) - A) < 0.01) bb.push([i, j]);
  const FORM = F.choice(d.controls, { label: '\\text{form}', options: [{ value: 'sheet', label: 'sheet' }, { value: 'ball', label: 'buckyball' }, { value: 'tube', label: 'nanotube' }, { value: 'stack', label: 'stacked sheets' }], value: 'sheet', aria: 'the form of graphene' });
  const NAME = 'a carbon atom, C';
  let sig = '', sheet = null, layers = null, ballG = null, sMesh = [], sBond = [], layerN = 0;
  function build() {
    const key = palSig(); if (key === sig || !grp) return; sig = key;
    v.clear(); layerN = 0;
    sheet = new window.THREE.Group(); layers = new window.THREE.Group(); ballG = new window.THREE.Group(); grp.add(sheet, layers, ballG);
    sMesh = flat.map((p) => v.pickable(F.mesh.sphere(sheet, [p[0], p[1], 0], 0.06, F.el('C')), NAME));
    sBond = sheetBonds.map(([a, b]) => F.mesh.stick(sheet, [flat[a][0], flat[a][1], 0], [flat[b][0], flat[b][1], 0], 0.025, PAL.muted));
    [-GAP, GAP].forEach((z) => {
      const pts = flat.map((p) => [p[0], p[1] + A, z]).filter((p) => Math.abs(p[1]) <= yMid + 1e-6);
      layerN += pts.length; pts.forEach((p) => v.pickable(F.mesh.sphere(layers, p, 0.06, F.el('C')), NAME));
      sheetBonds.forEach(([a, b], i) => { if (wraps[i]) return; const p = [flat[a][0], flat[a][1] + A, z], q = [flat[b][0], flat[b][1] + A, z]; if (Math.abs(p[1]) <= yMid + 1e-6 && Math.abs(q[1]) <= yMid + 1e-6) F.mesh.stick(layers, p, q, 0.025, PAL.muted); });
    });
    bp.forEach((p) => v.pickable(F.mesh.sphere(ballG, p, 0.06, F.el('C')), NAME));
    bb.forEach(([i, j]) => F.mesh.stick(ballG, bp[i], bp[j], 0.025, PAL.muted));
  }
  const HEAD = {
    sheet: 'A graphene sheet is a single layer of carbon atoms, each bonded to three others in hexagonal rings.',
    ball: 'In a buckyball, sixty carbon atoms close into a hollow sphere.',
    tube: 'Rolled into a cylinder, the same sheet becomes a carbon nanotube.',
    stack: 'Stacked sheets are held together in layers by noncovalent forces, as in graphite.',
  };
  const COUNT = { sheet: flat.length, ball: bp.length, tube: flat.length, stack: 0 };
  function draw() {
    build(); if (!grp || !sheet) { return; }
    const k = FORM.mix((f) => (f === 'tube' ? 1 : 0));
    const P = flat.map((p) => roll(p, k));
    sMesh.forEach((m, i) => m.position.set(P[i][0], P[i][1], P[i][2]));
    sBond.forEach((m, i) => { F.mesh.setStick(m, P[sheetBonds[i][0]], P[sheetBonds[i][1]]); m.visible = !wraps[i] || k > 0.98; });
    F.fade3(sheet, 1 - FORM.a('ball'));
    F.fade3(layers, FORM.a('stack'));
    F.fade3(ballG, FORM.a('ball'));
    v.headline(HEAD[FORM.value]);
    v.invalidate();
    const n = FORM.value === 'stack' ? flat.length + layerN : COUNT[FORM.value];
    readout(d.readout, `\\text{${n} carbon atoms, each bonded to three others about }${hue('length', '1.4 \\times 10^{-10}\\ \\text{m}')}\\text{ away}`);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 10.45: a faithful redraw of the book's layer of atoms with its
   defects. The book gives the host and the impurities no element, so the
   host is ink and the three impurities are told apart by the categorical
   palette. Still, no controls.
===================================================================== */
(function () {
  const d = sim('fig-defects', 520);
  const hits = []; F.hover(d.stage, () => hits);
  const S = 32, R0 = 15, X0 = 700 - 5.5 * S, Y0 = 120;
  const BIG = [X0 + 10.2 * S, Y0 + 3 * S], SMALL = [X0 + 4 * S, Y0 + 3 * S], INT = [X0 + 9.5 * S, Y0 + 9.5 * S];
  function draw() {
    const { ctx } = begin(d.c); hits.length = 0;
    for (let r = 0; r < 12; r++) for (let c = 0; c < 12; c++) {
      if (r === 8 && c === 3) continue;
      let x = X0 + c * S, y = Y0 + r * S;
      if (Math.abs(x - SMALL[0]) < 1 && Math.abs(y - SMALL[1]) < 1) continue;
      const dx = x - BIG[0], dy = y - BIG[1], dd = Math.hypot(dx, dy);
      if (dd < 20) continue;
      if (dd < 3 * S) { const push = (3 * S - dd) * 0.28; x += (dx / dd) * push; y += (dy / dd) * push; }
      ball(ctx, x, y, R0, PAL.soft, PAL.ink, 1.6);
      hits.push({ x, y, r: R0, name: 'an atom of the crystal' });
    }
    ball(ctx, SMALL[0], SMALL[1], 13, F.cat(0), PAL.ink, 1.6); hits.push({ x: SMALL[0], y: SMALL[1], r: 15, name: 'a substitution impurity atom' });
    ball(ctx, BIG[0], BIG[1], 24, F.cat(1), PAL.ink, 1.6); hits.push({ x: BIG[0], y: BIG[1], r: 27, name: 'a larger substitution impurity atom' });
    ball(ctx, INT[0], INT[1], 7, F.cat(2), PAL.ink, 1.4); hits.push({ x: INT[0], y: INT[1], r: 8, name: 'an interstitial impurity atom' });
    const vac = [X0 + 3 * S, Y0 + 8 * S];
    label(ctx, 'substitution impurity atom', SMALL[0] - 26, SMALL[1] - 10, { side: 'left', leader: true, gap: 250 - 3 * S, size: 20 });
    label(ctx, 'substitution impurity atom', BIG[0] + 40, BIG[1] - 40, { side: 'right', leader: true, gap: 60, size: 20 });
    label(ctx, 'vacancy', vac[0] - 4, vac[1], { side: 'left', leader: true, gap: 3 * S + 60, size: 20 });
    label(ctx, 'interstitial impurity', INT[0] + 10, INT[1], { side: 'right', leader: true, gap: 2.5 * S + 60, size: 20 });
    topline(ctx, 'A vacancy, two substitution impurity atoms, and an interstitial impurity interrupt the repeating pattern of a crystal.');
  }
  register(d.fig, { update: () => {}, draw });
})();
};
