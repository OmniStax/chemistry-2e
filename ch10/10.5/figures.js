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
   FIGURE 10.37 + 10.38: silicon dioxide as the book draws it, a flat
   network in which every silicon atom is joined through oxygen atoms to
   three others. Crystalline (quartz): every ring has six silicon atoms
   and every link the one length and angle. Amorphous (fused silica): the
   same atoms after nine links were each turned a quarter turn, making
   five- and seven-membered rings (the Stone-Wales step), and the net
   let settle, so rings of five, six, seven
   and eight silicon atoms sit side by side as in Figure 10.38 (b), and
   the links are bent and stretched by different amounts. The choice
   bends one net into the other: shared links stay, the rest fade.
   The crystal's links all break at the melting point; each link of the
   glass breaks at a temperature set by its strain, spread from 1100 °C
   to 1713 °C, the most strained first.
   Still: nothing has a clock. Graph beneath: the share of links broken
   against temperature, fixed axes 1000 to 1800 °C by 200 and 0 to 100 %.
===================================================================== */
(function () {
  const H = 720;
  const d = sim('sim-order', H);
  const MP = 1713, SOFT = 1100;
  const FORM = F.choice(d.controls, { label: '\\text{form}', options: [{ value: 'crystal', label: 'crystalline (quartz)' }, { value: 'glass', label: 'amorphous (fused silica)' }], value: 'crystal', aria: 'crystalline or amorphous silicon dioxide' });
  const T = ctl(d.controls, { label: '\\kT', cls: 'temperature', min: 1000, max: 1800, step: 10, value: 1400, unit: '°C', dec: 0, aria: 'temperature in degrees Celsius', specials: [{ at: MP, label: 'melting point' }] });
  /* the net: silicon at the corners of flat-topped hexagons, Si to Si L, an oxygen on every link */
  const L = 72, BOX = { l: 70, r: 1330, t: 40, b: 404 };
  const nodes = [], key = (x, y) => `${Math.round(x)},${Math.round(y)}`, seen = new Set();
  for (let i = -1; i < 14; i++) for (let j = -1; j < 5; j++) {
    const cx = 1.5 * L * i, cy = R3 * L * (j + (i % 2 ? 0.5 : 0));
    for (let k = 0; k < 6; k++) {
      const x = cx + L * Math.cos((k * TAU) / 6), y = cy + L * Math.sin((k * TAU) / 6);
      if (x < -0.1 || x > BOX.r - BOX.l - 0.6 * L || y < -0.1 || y > BOX.b - BOX.t - 0.75 * L) continue;
      if (!seen.has(key(x, y))) { seen.add(key(x, y)); nodes.push([x, y]); }
    }
  }
  {
    /* centred in the band */
    const xs = nodes.map((p) => p[0]), ys = nodes.map((p) => p[1]);
    const dx = (BOX.l + BOX.r - Math.min(...xs) - Math.max(...xs)) / 2, dy = (BOX.t + BOX.b - Math.min(...ys) - Math.max(...ys)) / 2;
    nodes.forEach((p) => { p[0] += dx; p[1] += dy; });
  }
  const crystalLinks = [];
  for (let a = 0; a < nodes.length; a++) for (let b = a + 1; b < nodes.length; b++) if (Math.abs(Math.hypot(nodes[a][0] - nodes[b][0], nodes[a][1] - nodes[b][1]) - L) < 1) crystalLinks.push([a, b]);
  const nbrs = (links) => { const n = nodes.map(() => []); links.forEach(([a, b]) => { n[a].push(b); n[b].push(a); }); return n; };
  /* the glass: Stone-Wales steps on interior links that share no atom, then the net relaxed by springs */
  const R = rng(1038);
  const gl = nodes.map((p) => p.slice()), glassLinks = crystalLinks.map((l) => l.slice());
  {
    const used = new Set(), cand = crystalLinks.map((_, k) => k).sort(() => R() - 0.5);
    let done = 0;
    for (const k of cand) {
      if (done >= 12) break;
      const N0 = nbrs(glassLinks), [a, b] = glassLinks[k], ring = [a, b, ...N0[a], ...N0[b]];
      if (N0[a].length < 3 || N0[b].length < 3 || ring.some((n) => used.has(n))) continue;
      const na = N0[a].filter((n) => n !== b), nb = N0[b].filter((n) => n !== a);
      const m = [(gl[a][0] + gl[b][0]) / 2, (gl[a][1] + gl[b][1]) / 2];
      const turn = (p) => [m[0] - (p[1] - m[1]), m[1] + (p[0] - m[0])];
      const A = turn(gl[a]), B = turn(gl[b]);
      /* a keeps one of its own neighbours and takes the one of b's on its side, and b the same */
      const near = (p, q) => Math.hypot(p[0] - gl[q][0], p[1] - gl[q][1]);
      const ka = near(A, na[0]) < near(A, na[1]) ? 0 : 1, kb = near(A, nb[0]) < near(A, nb[1]) ? 0 : 1;
      if (na.concat(nb).some((n) => N0[n].length < 2)) continue;
      const swap = (x, from, to) => { const l = glassLinks.find(([p, q]) => (p === x && q === from) || (q === x && p === from)); l[l[0] === x ? 1 : 0] = to; };
      swap(na[1 - ka], a, b); swap(nb[kb], b, a);
      gl[a] = A; gl[b] = B;
      used.add(a); used.add(b); done++;
    }
    gl.forEach((p) => { p[0] += (R() - 0.5) * 0.3 * L; p[1] += (R() - 0.5) * 0.3 * L; });
    const N1 = nbrs(glassLinks), edge = nodes.map((p, i) => N1[i].length < 3);
    for (let it = 0; it < 500; it++) {
      const f = gl.map(() => [0, 0]);
      const spring = (a, b, rest, k) => { const dx = gl[b][0] - gl[a][0], dy = gl[b][1] - gl[a][1], r = Math.hypot(dx, dy) || 1, s = (k * (r - rest)) / r; f[a][0] += s * dx; f[a][1] += s * dy; f[b][0] -= s * dx; f[b][1] -= s * dy; };
      glassLinks.forEach(([a, b]) => spring(a, b, L, 1));
      N1.forEach((n) => { for (let p = 0; p < n.length; p++) for (let q = p + 1; q < n.length; q++) spring(n[p], n[q], R3 * L, 0.25); });
      gl.forEach((p, i) => { const w = edge[i] ? 0.3 : 0.01; f[i][0] += w * (nodes[i][0] - p[0]); f[i][1] += w * (nodes[i][1] - p[1]); });
      gl.forEach((p, i) => { p[0] += 0.12 * f[i][0]; p[1] += 0.12 * f[i][1]; });
    }
  }
  const lk = (l) => (l[0] < l[1] ? `${l[0]}-${l[1]}` : `${l[1]}-${l[0]}`);
  const cSet = new Set(crystalLinks.map(lk)), gSet = new Set(glassLinks.map(lk));
  /* every link once, with where it lives: 1 both, 'c' crystal only, 'g' glass only */
  const links = [...crystalLinks.map((l) => ({ l, in: gSet.has(lk(l)) ? 'both' : 'c' })), ...glassLinks.filter((l) => !cSet.has(lk(l))).map((l) => ({ l, in: 'g' }))];
  const NG = nbrs(glassLinks);
  const bend = links.map(() => (R() - 0.5) * 0.36 * L);
  /* the strain of each link of the glass: its stretch, its oxygen's bend and how far the angles at its two ends are from 120° */
  const ang = (o, p, q) => { const a = Math.atan2(gl[p][1] - gl[o][1], gl[p][0] - gl[o][0]), b = Math.atan2(gl[q][1] - gl[o][1], gl[q][0] - gl[o][0]); return Math.abs(Math.atan2(Math.sin(a - b), Math.cos(a - b))); };
  const strainOf = (i) => {
    const [a, b] = links[i].l; let s = Math.abs(Math.hypot(gl[a][0] - gl[b][0], gl[a][1] - gl[b][1]) - L) / L + Math.abs(bend[i]) / L;
    [[a, b], [b, a]].forEach(([o, p]) => NG[o].forEach((q) => { if (q !== p) s += Math.abs(ang(o, p, q) - TAU / 3) / Math.PI; }));
    return s;
  };
  const gIdx = links.map((x, i) => i).filter((i) => links[i].in !== 'c'), N = gIdx.length;
  const breakT = links.map(() => Infinity);
  gIdx.slice().sort((p, q) => strainOf(q) - strainOf(p)).forEach((i, r) => { breakT[i] = SOFT + ((MP - SOFT) * r) / (N - 1); });
  const NC = crystalLinks.length;
  const brokenAt = (form, t) => (form === 'crystal' ? (t >= MP ? NC : 0) : gIdx.filter((i) => breakT[i] <= t).length);
  const total = (form) => (form === 'crystal' ? NC : N);
  const hits = []; F.hover(d.stage, () => hits);
  function draw() {
    const { ctx } = begin(d.c); hits.length = 0;
    const k = FORM.mix((v) => (v === 'glass' ? 1 : 0)), t = T.v, form = FORM.value;
    const P = nodes.map((p, a) => [p[0] + (gl[a][0] - p[0]) * k, p[1] + (gl[a][1] - p[1]) * k]);
    const broke = (i) => (form === 'crystal' ? t >= MP : breakT[i] <= t);
    const oxy = [];
    links.forEach(({ l: [a, b], in: where }, i) => {
      const o = where === 'both' ? 1 : where === 'c' ? 1 - k : k;
      if (o < 0.02) return;
      ctx.save(); ctx.globalAlpha = o;
      const A = P[a], B = P[b], len = Math.hypot(B[0] - A[0], B[1] - A[1]) || 1, nx = -(B[1] - A[1]) / len, ny = (B[0] - A[0]) / len;
      let O = [(A[0] + B[0]) / 2 + nx * bend[i] * k, (A[1] + B[1]) / 2 + ny * bend[i] * k];
      if (broke(i) && o > 0.5) {
        /* the oxygen stays with one silicon and draws back from the other, leaving a gap across the broken link */
        const [S1, S2] = i % 2 ? [B, A] : [A, B], ux = S1[0] - O[0], uy = S1[1] - O[1], u = Math.hypot(ux, uy) || 1;
        O = [O[0] + (ux / u) * 12, O[1] + (uy / u) * 12];
        const vx = S2[0] - O[0], vy = S2[1] - O[1], w = Math.hypot(vx, vy) || 1;
        line(ctx, S1[0], S1[1], O[0], O[1], PAL.muted, 7);
        line(ctx, O[0] + (vx / w) * 16, O[1] + (vy / w) * 16, S2[0] - (vx / w) * 20, S2[1] - (vy / w) * 20, alpha(PAL.ink, 0.5), 3, [4, 5]);
      } else { line(ctx, A[0], A[1], O[0], O[1], PAL.muted, 7); line(ctx, O[0], O[1], B[0], B[1], PAL.muted, 7); }
      ctx.restore();
      oxy.push([O, o]);
    });
    /* an oxygen on each free corner of a silicon at the edge of the net, in the widest gap between its links */
    const NN = nodes.map(() => []);
    links.forEach(({ l: [a, b], in: where }) => { if (where === 'both' || (where === 'c') === (k < 0.5)) { NN[a].push(b); NN[b].push(a); } });
    P.forEach((p, a) => {
      const th = NN[a].map((b) => Math.atan2(P[b][1] - p[1], P[b][0] - p[0])).sort((x, y) => x - y);
      let dirs = [];
      if (th.length === 1) dirs = [th[0] + TAU / 3, th[0] - TAU / 3];
      else if (th.length === 2) { let g = th[1] - th[0]; dirs = [g > Math.PI ? th[0] + g / 2 : th[1] + (TAU - g) / 2]; }
      dirs.forEach((u) => { const O = [p[0] + Math.cos(u) * L * 0.5, p[1] + Math.sin(u) * L * 0.5]; line(ctx, p[0], p[1], O[0], O[1], PAL.muted, 7); oxy.push([O, 1]); });
    });
    oxy.forEach(([o, a]) => { ctx.save(); ctx.globalAlpha = a; ball(ctx, o[0], o[1], 12, F.el('O')); ctx.restore(); if (a > 0.5) hits.push({ x: o[0], y: o[1], r: 12, name: 'an oxygen atom, O' }); });
    P.forEach((p) => { ball(ctx, p[0], p[1], 17, F.el('Si')); hits.push({ x: p[0], y: p[1], r: 17, name: 'a silicon atom, Si' }); });
    const disc = (sym, r) => (c, x, y) => ball(c, x + 14, y + 11, r, F.el(sym));
    const key = [{ s: 'silicon atom', draw: disc('Si', 10) }, { s: 'oxygen atom', draw: disc('O', 7) }, { s: 'broken link', color: alpha(PAL.ink, 0.5), w: 3, dash: [4, 5] }];
    F.legend(ctx, { l: 80, r: 1320, t: 416, b: 460 }, key, { corner: 'top', row: true, size: 20 });
    /* graph: share of links broken, 1000 to 1800 °C by 200, 0 to 100 % by 50 */
    const box = { l: 230, r: 1180, t: 520, b: 650 };
    const { X, Y } = axes(ctx, box, [1000, 1800], [0, 100], { nx: 4, ny: 2, xl: 'T (°C)', xc: C('temperature'), yl: 'links broken (%)', fy: (v) => fmt(v, 0) });
    line(ctx, X(MP), box.t, X(MP), box.b, alpha(PAL.ink, 0.35), 2, [4, 8]);
    text(ctx, 'melting point, 1713 °C', X(MP) - 8, box.t - 22, PAL.muted, { size: 17, align: 'right' });
    FORM.curve(ctx, (v) => (s) => (100 * brokenAt(v, s)) / total(v), 1000, 1800, X, Y, PAL.ink, 4, 400);
    const n = brokenAt(form, t), M = total(form);
    F.pinned(ctx, box, X, Y, t, (100 * n) / M, C('temperature'));
    const tt = `\\kT = ${degC(t)}`, cnt = `${n}\\ \\text{of}\\ ${M}\\ \\text{links broken}`;
    const main = form === 'crystal'
      ? `${tt} ${t < MP ? '<' : '\\ge'} ${degC(MP)}\\ (\\text{melting point}):\\ ${cnt}`
      : `${tt}:\\ ${cnt}`;
    readout(d.readout, main, form === 'crystal' ? 'Every link of the crystal is alike, so all of them break at one temperature.' : 'The links of the glass are strained by different amounts, and the most strained break first.');
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 10.39 + 10.40 + 10.41 + 10.42: the four kinds of crystalline
   solid as crystals to turn, the book's eight examples. Ions and metal
   atoms are packed spheres with no sticks, as the book draws them;
   the covalent bonds of a network are sticks; a molecular solid's
   molecules are drawn space-filling, each a unit apart from the next,
   as the book draws CO₂ and I₂. Every structure is scaled to the same
   size so it fills the stage. A key on the strip above names the
   particles. Still: a crystal answers its choice. No ground, so the
   pitch is bounded only to ±1.2 rad to keep the crystal from flipping
   past its poles.
===================================================================== */
(function () {
  const KH = 70;
  const d = sim('sim-solids', KH);
  const v = F.view3d(d.stage, { spin: 'idle', pitch: [-1.2, 1.2], tilt: 0.35, h: 600, dist: 8.4 });
  v.setView(-0.55, 0.38);
  const grp = v.part(0);
  const NM = { Na: 'a sodium ion, Na⁺', Cl: 'a chloride ion, Cl⁻', Cu: 'a copper atom, Cu', C: 'a carbon atom, C', Si: 'a silicon atom, Si', O: 'an oxygen atom, O', I: 'an iodine atom, I' };
  const FIT = 1.55;   /* half the width of every structure, atoms included */
  const fit = (s) => {
    const c = [0, 1, 2].map((q) => (Math.min(...s.atoms.map((a) => a.p[q])) + Math.max(...s.atoms.map((a) => a.p[q]))) / 2);
    s.atoms.forEach((a) => { a.p = a.p.map((x, q) => x - c[q]); });
    const half = Math.max(...s.atoms.map((a) => Math.max(...a.p.map(Math.abs)) + a.r)), k = FIT / half;
    s.atoms.forEach((a) => { a.p = a.p.map((x) => x * k); a.r *= k; });
    s.stick = (s.stick ?? 0.12) * k;
    return s;
  };
  const bondsBy = (atoms, len, ok = () => true) => { const b = []; for (let i = 0; i < atoms.length; i++) for (let j = i + 1; j < atoms.length; j++) if (Math.abs(dist3(atoms[i].p, atoms[j].p) - len) < 0.02 * len && ok(atoms[i], atoms[j])) b.push([i, j]); return b; };
  /* diamond-type networks, lengths in units of the cubic cell a: atoms of the fcc lattice and of the lattice shifted by a quarter of the body diagonal,
     inside the cell grown by g on every side; an atom kept only where it has two bonds inside */
  const FCC = [[0, 0, 0], [0.5, 0.5, 0], [0.5, 0, 0.5], [0, 0.5, 0.5]];
  function diamondLike(el1, el2, g = 0.3) {
    const atoms = [];
    for (let i = -1; i <= 1; i++) for (let j = -1; j <= 1; j++) for (let k = -1; k <= 1; k++) FCC.forEach((f) => [0, 0.25].forEach((s, q) => {
      const p = [f[0] + i + s, f[1] + j + s, f[2] + k + s];
      if (p.every((x) => x > -g - 1e-6 && x < 1 + g + 1e-6)) atoms.push({ el: q ? el2 : el1, p });
    }));
    let keep = atoms, bonds;
    for (let pass = 0; pass < 4; pass++) {
      bonds = bondsBy(keep, R3 / 4);
      const deg = keep.map((_, i) => bonds.filter((b) => b.includes(i)).length);
      const next = keep.filter((_, i) => deg[i] >= 2); if (next.length === keep.length) break; keep = next;
    }
    return { atoms: keep, bonds: bondsBy(keep, R3 / 4) };
  }
  const BUILD = {
    /* 27 ions of the book's block, packed: Na–Cl 283 pm, radii 102 and 181 pm, chloride at the corners as in Figure 7.3 */
    NaCl() { const atoms = []; for (let i = -1; i <= 1; i++) for (let j = -1; j <= 1; j++) for (let k = -1; k <= 1; k++) { const na = (i + j + k) % 2 !== 0; atoms.push({ el: na ? 'Na' : 'Cl', p: [i, j, k], r: na ? 102 / 283 : 181 / 283 }); } return { atoms, bonds: [] }; },
    /* face-centred cubic copper, three cells on an edge, packed: neighbours touch, r = a / (2√2) */
    Cu() { const atoms = []; for (let i = 0; i <= 6; i++) for (let j = 0; j <= 6; j++) for (let k = 0; k <= 6; k++) if ((i + j + k) % 2 === 0) atoms.push({ el: 'Cu', p: [i / 2, j / 2, k / 2], r: 1 / (2 * Math.SQRT2) }); return { atoms, bonds: [] }; },
    diamond() { const s = diamondLike('C', 'C'); s.atoms.forEach((x) => { x.r = 0.075; }); s.stick = 0.028; return s; },
    /* silicon at the diamond positions, an oxygen between every two (the ideal cristobalite form) */
    SiO2() {
      const s = diamondLike('Si', 'Si'), atoms = s.atoms.map((x) => ({ ...x, r: 0.07 })), bonds = [];
      s.bonds.forEach(([i, j]) => { atoms.push({ el: 'O', p: mid3(atoms[i].p, atoms[j].p), r: 0.05 }); const o = atoms.length - 1; bonds.push([i, o], [o, j]); });
      return { atoms, bonds, stick: 0.022 };
    },
    SiC() { const s = diamondLike('Si', 'C'); s.atoms.forEach((x) => { x.r = x.el === 'Si' ? 0.085 : 0.07; }); s.stick = 0.028; return s; },
    /* four sheets, C–C 142 pm, sheets 335 pm apart, alternate sheets shifted by one bond (ABAB) */
    graphite() {
      const a = 1.42, gap = 3.35, atoms = [];
      [0, 1, 2, 3].forEach((layer) => {
        const shift = layer % 2 ? a : 0;
        for (let j = -5; j <= 5; j++) for (let i = -6; i <= 6; i++) for (const b of [0, a]) {
          const x = (i + j / 2) * R3 * a, z = j * 1.5 * a + b + shift;
          if (Math.abs(x) <= 6.2 && Math.abs(z) <= 5.4) atoms.push({ el: 'C', p: [x, (layer - 1.5) * gap, z], r: 0.32 });
        }
      });
      return { atoms, bonds: bondsBy(atoms, a, (p, q) => Math.abs(p.p[1] - q.p[1]) < 1e-6), stick: 0.12 };
    },
    /* solid CO₂, cubic Pa3, a = 562 pm, C=O 116 pm: a molecule at each face-centred site, each along one of the four body diagonals */
    CO2() {
      const a = 5.62, L = 1.16, dirs = [[1, 1, 1], [1, -1, -1], [-1, 1, -1], [-1, -1, 1]].map((u) => u.map((x) => x / R3)), atoms = [];
      for (let i = 0; i <= 1; i++) for (let j = 0; j <= 1; j++) for (let k = 0; k <= 1; k++) FCC.forEach((f, q) => {
        const c = [(f[0] + i) * a / 1, (f[1] + j) * a, (f[2] + k) * a].map((x) => x);
        if (c.some((x) => x > 1.5 * a + 1e-6)) return;
        const u = dirs[q];
        atoms.push({ el: 'C', p: c, r: 1.25 }, { el: 'O', p: c.map((x, n) => x + u[n] * L), r: 1.3 }, { el: 'O', p: c.map((x, n) => x - u[n] * L), r: 1.3 });
      });
      return { atoms, bonds: [] };
    },
    /* solid iodine, orthorhombic Cmca, a = 718, b = 471, c = 981 pm, I at (0, 0.1543, 0.1174): I–I 272 pm, molecules tilted alternately in herringbone layers */
    I2() {
      const A = 7.18, B = 4.71, Cc = 9.81, y = 0.1543, z = 0.1174, atoms = [];
      const pairs = [[[0, y, z], [0, -y, -z]], [[0, 0.5 - y, 0.5 + z], [0, 0.5 + y, 0.5 - z]]];
      for (let i = 0; i <= 2; i++) for (let j = 0; j <= 3; j++) for (let k = 0; k <= 1; k++) [[0, 0, 0], [0.5, 0.5, 0]].forEach((t) => pairs.forEach((pr) => {
        const c = [t[0] + i, (pr[0][1] + pr[1][1]) / 2 + t[1] + j, (pr[0][2] + pr[1][2]) / 2 + k];
        if (c[0] > 1.01 || c[1] > 2.01 || c[2] > 1.01) return;
        pr.forEach((q) => atoms.push({ el: 'I', p: [(q[0] + t[0] + i) * A, (q[1] + t[1] + j) * B, (q[2] + k) * Cc], r: 1.3 }));
      }));
      return { atoms, bonds: [] };
    },
  };
  const ION = (s) => `\\text{${s}}`;
  const INFO = {
    NaCl: { f: 'NaCl (ionic)', ro: `${ION('ionic: ions')} \\to \\text{ionic bonds} \\to \\text{hard, brittle, high melting point}`, key: [['Na', 'Na⁺, sodium ion'], ['Cl', 'Cl⁻, chloride ion']] },
    Cu: { f: 'Cu (metallic)', ro: '\\text{metallic: metal atoms} \\to \\text{metallic bonds} \\to \\text{malleable, conducts heat and electricity}', key: [['Cu', 'copper atom']] },
    diamond: { f: 'C, diamond (covalent network)', ro: `\\text{covalent network: atoms} \\to \\text{covalent bonds} \\to \\text{very hard, melts above } ${degC(3500)}`, key: [['C', 'carbon atom'], ['bond', 'covalent bond']] },
    SiO2: { f: 'SiO₂ (covalent network)', ro: '\\text{covalent network: atoms} \\to \\text{covalent bonds} \\to \\text{very hard, very high melting point}', key: [['Si', 'silicon atom'], ['O', 'oxygen atom'], ['bond', 'covalent bond']] },
    SiC: { f: 'SiC (covalent network)', ro: '\\text{covalent network: atoms} \\to \\text{covalent bonds} \\to \\text{very hard, very high melting point}', key: [['Si', 'silicon atom'], ['C', 'carbon atom'], ['bond', 'covalent bond']] },
    graphite: { f: 'C, graphite (covalent network)', ro: '\\text{covalent bonds in each sheet, weak forces between sheets} \\to \\text{soft, conducts electricity}', key: [['C', 'carbon atom'], ['bond', 'covalent bond']] },
    CO2: { f: 'CO₂ (molecular)', ro: `\\text{molecular: CO}_{2}\\ \\text{molecules} \\to \\text{IMFs} \\to \\text{melts at } ${degC(-78)}`, key: [['C', 'carbon atom'], ['O', 'oxygen atom']] },
    I2: { f: 'I₂ (molecular)', ro: `\\text{molecular: I}_{2}\\ \\text{molecules} \\to \\text{IMFs} \\to \\text{melts at } ${degC(114)}`, key: [['I', 'iodine atom']] },
  };
  const S = F.select(d.controls, { label: '\\text{solid}', options: Object.keys(INFO).map((k) => ({ value: k, label: INFO[k].f })), value: 'NaCl', aria: 'the crystalline solid' });
  const built = {}, get = (k) => built[k] ?? (built[k] = fit(BUILD[k]()));
  let sig = '';
  function draw() {
    const { ctx } = begin(d.c);
    const key = S.value + '|' + palSig();
    if (key !== sig && grp) {
      sig = key; v.clear();
      const s = get(S.value);
      s.atoms.forEach((a) => v.pickable(F.mesh.sphere(grp, a.p, a.r, F.el(a.el)), NM[a.el]));
      s.bonds.forEach(([i, j]) => v.pickable(F.mesh.stick(grp, s.atoms[i].p, s.atoms[j].p, s.stick, PAL.muted), 'a covalent bond'));
    }
    if (grp) F.fade3(grp, S.a(S.value));
    v.invalidate();
    const disc = (sym) => (c, x, y) => ball(c, x + 14, y + 11, 9, F.el(sym));
    F.legend(ctx, { l: 40, r: 1360, t: 6, b: KH - 4 }, INFO[S.value].key.map(([e, s]) => (e === 'bond' ? { s, color: PAL.muted, w: 5 } : { s, draw: disc(e) })), { corner: 'top', row: true, size: 22 });
    readout(d.readout, INFO[S.value].ro);
  }
  register(d.fig, { update: () => {}, draw });
})();

/* =====================================================================
   FIGURE 10.44: graphene and its shapes. One hexagonal sheet of carbon
   rolls into a nanotube and back (the choice bends it), lies between two
   more sheets in a stack, or gives way to a buckyball, C60. C–C 142 pm
   and sheets 335 pm apart, to scale. The camera eases to fill the stage
   with each form. Still: the roll is a choice morph. No ground; pitch
   bounded to ±1.3 rad.
===================================================================== */
(function () {
  const KH = 56;
  const d = sim('sim-graphene', KH);   /* a strip above the scene carries the headline, clear of the atoms */
  const v = F.view3d(d.stage, { spin: 'idle', pitch: [-1.3, 1.3], tilt: 0.45, h: 480, dist: 6.4, zoomMax: 3.2 });
  v.setView(-0.35, 0.45);
  v.look({ zoom: 1.4 });
  const ZOOM = { sheet: 1.4, ball: 2.5, tube: 1.7 };   /* the stack is seen nearly edge on, as the book draws it */
  const grp = v.part(0);
  /* the sheet is built in its own plane (x round the tube, y along it); turned so the sheet lies flat, the stack rises in layers and the tube lies across */
  if (grp) grp.setRotationFromAxisAngle(new window.THREE.Vector3(1, 1, 1).normalize(), -TAU / 3);
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
  const FORM = F.choice(d.controls, { label: '\\text{form}', options: [{ value: 'sheet', label: 'sheet' }, { value: 'ball', label: 'buckyball' }, { value: 'tube', label: 'nanotube' }, { value: 'stack', label: 'stacked sheets' }], value: 'sheet', aria: 'the form of graphene',
    onInput: () => { v.glide(FORM.value === 'stack' ? { zoom: 1.35, pitch: 0.16 } : { zoom: ZOOM[FORM.value] }, 900); } });
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
    sheet: (n) => `${n} carbon atoms in one sheet, one atom thick`,
    ball: (n) => `${n} carbon atoms closed into a hollow ball, C₆₀`,
    tube: (n) => `The same ${n} atoms rolled into a tube`,
    stack: (n) => `${n} carbon atoms in three sheets, held in layers by noncovalent forces`,
  };
  function draw() {
    build(); if (!grp || !sheet) { return; }
    const k = FORM.mix((f) => (f === 'tube' ? 1 : 0));
    const P = flat.map((p) => roll(p, k));
    sMesh.forEach((m, i) => m.position.set(P[i][0], P[i][1], P[i][2]));
    sBond.forEach((m, i) => { F.mesh.setStick(m, P[sheetBonds[i][0]], P[sheetBonds[i][1]]); m.visible = !wraps[i] || k > 0.98; });
    F.fade3(sheet, 1 - FORM.a('ball'));
    F.fade3(layers, FORM.a('stack'));
    F.fade3(ballG, FORM.a('ball'));
    const n = { sheet: flat.length, ball: bp.length, tube: flat.length, stack: flat.length + layerN }[FORM.value];
    const { ctx } = begin(d.c);
    text(ctx, HEAD[FORM.value](n), 700, KH / 2, PAL.ink, { size: 24, align: 'center', base: 'middle' });
    v.invalidate();
    readout(d.readout, `\\text{distance between bonded C atoms} = ${hue('length', '1.4 \\times 10^{-10}\\ \\text{m}')}`);
  }
  register(d.fig, { update: () => {}, draw });
})();

};
