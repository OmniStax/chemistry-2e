/* Figures for section 17.2 Galvanic Cells. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['17.2'] = function (root, F) {
const { PAL, alpha, cycle, register, begin, line, arrow, text, dot } = F;
const sim = (id, H) => F.sim(root, id, H);
const TAU = 2 * Math.PI;
const hue = (type, s) => `\\htmlClass{kv-${type}}{${s}}`;
/* a fixed pseudo-random number in [0, 1) for event k and draw j, so every run draws the same */
const rnd = (k, j) => { const s = Math.sin(k * 127.1 + j * 311.7) * 43758.5453; return s - Math.floor(s); };

/* =====================================================================
   FIGURE 17.3 + 17.4: a galvanic cell, flat, as the book draws it. Two
   beakers of equal volume joined by a salt bridge (an inverted U with a
   porous plug under the liquid at each end) and by a wire from each
   electrode up to the external circuit. Moving: the cell runs for T = 6 s
   of model time and holds. Every 0.6 s two electrons pass along the wire
   from the anode to the cathode and one event happens in each half-cell:
   one Cu²⁺ (Mg²⁺) leaves the anode, two Ag⁺ plate onto the cathode (two
   Fe³⁺ meet the platinum and leave as Fe²⁺), and two anions leave the
   bridge's left plug while two cations leave its right plug, so each
   half-cell stays neutral. The extent ξ (mol/L) grows linearly to XMAX:
   [Cu²⁺] = 1 + ξ, [Ag⁺] = 1 − 2ξ; [Mg²⁺] = 0.1 + ξ, [Fe³⁺] = 0.2 − 2ξ,
   [Fe²⁺] = 0.3 + 2ξ. CU_BLUE is the colour of Cu²⁺(aq), a physical fact.
===================================================================== */
(function () {
  const H = 770, d = sim('sim-galvanic-cell', H);
  const CU_BLUE = '#3b8fd9';                    /* the blue of Cu²⁺(aq) */
  const T = 6, TE = 0.6, LIFE = 1.8;
  /* beakers: centres, inner half-width, rim, floor, liquid level */
  const LX = 330, RX = 1070, HW = 175, RIM = 300, FLOOR = 640, LEVEL = 410;
  /* the wire's height, the external circuit's box, the bridge's legs, top and plug */
  const WY = 100, BOX = { x: 700, y: 100, w: 240, h: 72 }, BL = 445, BR = 955, BT = 222, BW = 60, PLUG = 500;
  const XA = 240, XC = 1160, TOP = 250, BOT = 590;           /* the electrodes' x, their tops at the wire, the strips' foot */
  const CELLS = {
    cu: {
      xmax: 0.25, dec: 2,
      tex: (x, f) => `\\mk{an}{\\text{Cu}(s)}\\,|\\,\\mk{as}{${hue('concentration', f(1 + x) + '\\;M')}\\;\\text{Cu}^{2+}(aq)}\\,\\|\\,\\mk{cs}{${hue('concentration', f(1 - 2 * x) + '\\;M')}\\;\\text{Ag}^{+}(aq)}\\,|\\,\\mk{ca}{\\text{Ag}(s)}`,
      note: 'For every two electrons through the wire, one Cu²⁺ enters the anode solution, two Ag⁺ plate out as silver, and two NO₃⁻ and two Na⁺ leave the salt bridge.',
    },
    mg: {
      xmax: 0.075, dec: 3,
      tex: (x, f) => `\\mk{an}{\\text{Mg}(s)}\\,|\\,\\mk{as}{${hue('concentration', f(0.1 + x) + '\\;M')}\\;\\text{Mg}^{2+}(aq)}\\,\\|\\,\\mk{cs}{${hue('concentration', f(0.2 - 2 * x) + '\\;M')}\\;\\text{Fe}^{3+}(aq),\\,${hue('concentration', f(0.3 + 2 * x) + '\\;M')}\\;\\text{Fe}^{2+}(aq)}\\,|\\,\\mk{ca}{\\text{Pt}(s)}`,
      note: 'For every two electrons through the wire, one Mg²⁺ enters the anode solution, two Fe³⁺ become Fe²⁺ at the platinum, which does not change, and two Cl⁻ and two Na⁺ leave the salt bridge.',
    },
  };
  const cy = cycle(() => T, 1.2);
  const cell = F.choice(d.controls, { label: '\\text{cell}', options: [{ value: 'cu', label: 'copper and silver(I)' }, { value: 'mg', label: 'magnesium and iron(III)' }], value: 'cu', aria: 'the galvanic cell', onInput: () => cy.reset() });
  const ro = F.readout(d);
  let hits = []; F.hover(d.stage, () => hits);

  /* a polyline with each corner rounded to radius r, and a walker along it by arc length */
  function rounded(pts, r) {
    const out = [pts[0]];
    for (let i = 1; i < pts.length - 1; i++) {
      const p = pts[i], a = pts[i - 1], b = pts[i + 1];
      const la = Math.hypot(a[0] - p[0], a[1] - p[1]), lb = Math.hypot(b[0] - p[0], b[1] - p[1]);
      const A = [p[0] + (a[0] - p[0]) * r / la, p[1] + (a[1] - p[1]) * r / la], B = [p[0] + (b[0] - p[0]) * r / lb, p[1] + (b[1] - p[1]) * r / lb];
      for (let s = 0; s <= 10; s++) { const t = s / 10; out.push([(1 - t) ** 2 * A[0] + 2 * (1 - t) * t * p[0] + t * t * B[0], (1 - t) ** 2 * A[1] + 2 * (1 - t) * t * p[1] + t * t * B[1]]); }
    }
    out.push(pts[pts.length - 1]); return out;
  }
  function walker(pts) {
    const seg = pts.slice(1).map((p, i) => Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1])), L = seg.reduce((a, b) => a + b, 0);
    const at = (s) => { s = Math.max(0, Math.min(L, s)); let i = 0; while (i < seg.length - 1 && s > seg[i]) { s -= seg[i]; i++; } const t = seg[i] ? s / seg[i] : 0; return [pts[i][0] + (pts[i + 1][0] - pts[i][0]) * t, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * t]; };
    return { L, at, pts };
  }
  const stroke = (ctx, pts, color, w, cap = 'round') => {
    ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = w; ctx.lineCap = cap; ctx.lineJoin = 'round';
    ctx.beginPath(); pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.stroke(); ctx.restore();
  };
  const wirePath = walker(rounded([[XA, TOP], [XA, WY], [XC, WY], [XC, TOP]], 46));
  const bridgeLine = rounded([[BL, PLUG], [BL, BT], [BR, BT], [BR, PLUG]], 64);
  const bridge = walker(bridgeLine);
  /* the Mg ribbon: down from the wire, then a flat spiral; the Pt wire: down, then a coil lying along the floor */
  const SP = { x: 300, y: 540, r0: 70, r1: 14, turns: 2.4 };
  const spiral = (u) => { const a = Math.PI + u * SP.turns * TAU, r = SP.r0 - u * (SP.r0 - SP.r1); return [SP.x + r * Math.cos(a), SP.y + r * Math.sin(a)]; };
  const ribbon = [[SP.x - SP.r0, TOP], ...Array.from({ length: 160 }, (_, i) => spiral(i / 159))];
  const COIL = { x0: XC, x1: 1000, y: 560, r: 30, turns: 7 };
  const coil = (u) => { const p = u * COIL.turns * TAU; return [COIL.x0 - u * (COIL.x0 - COIL.x1) - 11 * Math.sin(p), COIL.y - COIL.r * Math.cos(p)]; };
  const ptWire = [[XC, TOP], [XC, COIL.y - COIL.r], ...Array.from({ length: 240 }, (_, i) => coil(i / 239))];

  /* where an ion leaves or meets an electrode, and a point in the solution about 110 units from it */
  function surface(c, at, k, j, run) {
    const a = rnd(k, j), b = rnd(k, j + 7);
    if (at === 'left plug' || at === 'right plug') return [(at === 'left plug' ? BL : BR) + (a - 0.5) * 30, PLUG + 14];
    if (c === 'cu') {
      const half = at === 'anode' ? 22 - 9 * run : 22 + 8 * run;
      return [(at === 'anode' ? XA + half : XC - half) + 8 * (at === 'anode' ? 1 : -1), LEVEL + 30 + b * (BOT - LEVEL - 50)];
    }
    if (at === 'anode') return spiral(0.05 + 0.8 * a);
    return coil(0.05 + 0.9 * a);
  }
  function away(p, at, k, j) {
    const cx = p[0] < 700 ? LX : RX, ang = rnd(k, j + 21) * TAU;
    let dir = [Math.cos(ang), Math.sin(ang)];
    if (at === 'anode' && cell.value === 'cu') dir = [Math.abs(dir[0]) + 0.4, dir[1]];
    if (at === 'cathode' && cell.value === 'cu') dir = [-Math.abs(dir[0]) - 0.4, dir[1]];
    if (at.endsWith('plug')) dir = [dir[0], Math.abs(dir[1]) + 0.5];
    const L = Math.hypot(dir[0], dir[1]), q = [p[0] + 110 * dir[0] / L, p[1] + 110 * dir[1] / L];
    q[0] = Math.max(cx - HW + 20, Math.min(cx + HW - 20, q[0])); q[1] = Math.max(LEVEL + 22, Math.min(FLOOR - 20, q[1]));
    return q;
  }
  const NAMES = {
    Cu: 'a copper(II) ion, Cu²⁺, entering the solution from the anode', Ag: 'a silver(I) ion, Ag⁺, about to plate onto the cathode as silver',
    NO3: 'a nitrate ion, NO₃⁻, leaving the salt bridge for the anode half-cell', Na: 'a sodium ion, Na⁺, leaving the salt bridge for the cathode half-cell',
    Mg: 'a magnesium ion, Mg²⁺, entering the solution from the anode', Fe3: 'an iron(III) ion, Fe³⁺, about to take an electron at the platinum',
    Fe2: 'an iron(II) ion, Fe²⁺, leaving the platinum', Cl: 'a chloride ion, Cl⁻, leaving the salt bridge for the anode half-cell',
  };
  /* ionic radii drawn as 4 + 0.07 × the radius in pm: Mg²⁺ 72, Cu²⁺ 73, Fe 64 to 78, Na⁺ 102, Ag⁺ 115, Cl⁻ 181 */
  const ION_R = { Mg: 9, Cu: 9, Fe3: 9, Fe2: 9.5, Na: 11, Ag: 12, Cl: 16.5 };
  function ion(ctx, kind, x, y, o) {
    ctx.save(); ctx.globalAlpha = o;
    if (kind === 'NO3') {
      for (let i = 0; i < 3; i++) { const a = i * TAU / 3 - Math.PI / 2; dot(ctx, x + 10 * Math.cos(a), y + 10 * Math.sin(a), F.el('O'), true, 6.5); }
      dot(ctx, x, y, F.el('N'), true, 6.5);
    } else dot(ctx, x, y, F.el(kind.slice(0, 2)), true, ION_R[kind]);
    ctx.restore();
    if (o > 0.4) hits.push({ x, y, r: 16, name: NAMES[kind] });
  }
  /* every kind of moving particle: what it is, whether it leaves (out) or arrives (in), where, and how many per event */
  const KINDS = {
    cu: [{ k: 'Cu', role: 'out', at: 'anode', m: 1 }, { k: 'Ag', role: 'in', at: 'cathode', m: 2 }, { k: 'NO3', role: 'out', at: 'left plug', m: 2 }, { k: 'Na', role: 'out', at: 'right plug', m: 2 }],
    mg: [{ k: 'Mg', role: 'out', at: 'anode', m: 1 }, { k: 'Fe3', role: 'in', at: 'cathode', m: 2 }, { k: 'Fe2', role: 'out', at: 'cathode', m: 2 }, { k: 'Cl', role: 'out', at: 'left plug', m: 2 }, { k: 'Na', role: 'out', at: 'right plug', m: 2 }],
  };
  function ions(ctx, c, t, run) {
    const K = Math.floor(T / TE);
    KINDS[c].forEach((pool, pi) => {
      for (let k = 0; k < K; k++) {
        const tk = (k + 0.5) * TE, out = pool.role === 'out';
        /* a bridge ion first runs down its leg to the plug, then out into the solution */
        const plug = pool.at.endsWith('plug'), t0 = plug ? tk - LIFE / 2 : tk;
        const f = out ? (t - t0) / (plug ? 1.5 * LIFE : LIFE) : 1 + (t - tk) / LIFE;
        if (f < 0 || f >= 1 || (!out && t > tk)) continue;
        for (let j = 0; j < pool.m; j++) {
          /* an Fe²⁺ leaves from where its Fe³⁺ arrived */
          const seed = pool.at === 'cathode' ? 100 + j : pi * 10 + j;
          const p = surface(c, pool.at, k, seed, run), q = away(p, pool.at, k, seed);
          let x, y;
          if (plug) {
            const left = pool.at === 'left plug', inside = 0.4;
            if (f < inside) {
              /* along the bridge from part way across to the plug at its foot */
              const s0 = bridge.L * (0.5 + (rnd(k, seed + 3) - 0.5) * 0.25), s1 = left ? 0 : bridge.L, s = s0 + (s1 - s0) * (f / inside);
              [x, y] = bridge.at(s); x += (rnd(k, seed + 5) - 0.5) * 18 * Math.min(1, f * 4);
            } else { const g = (f - inside) / (1 - inside); x = p[0] + (q[0] - p[0]) * g; y = p[1] + (q[1] - p[1]) * g; }
          } else {
            const a = out ? p : q, b = out ? q : p; x = a[0] + (b[0] - a[0]) * f; y = a[1] + (b[1] - a[1]) * f;
          }
          const o = out ? Math.min(1, (1 - f) / 0.3, plug ? f / 0.08 : 1) : Math.min(1, f / 0.3);
          ion(ctx, pool.k, x, y, o);
        }
      }
    });
  }

  function beaker(ctx, cx, tint, name) {
    const l = cx - HW, r = cx + HW, rc = 22;
    ctx.save(); ctx.fillStyle = alpha(PAL.ink, 0.03);
    ctx.beginPath(); ctx.moveTo(l, RIM); ctx.lineTo(l, FLOOR - rc); ctx.quadraticCurveTo(l, FLOOR, l + rc, FLOOR); ctx.lineTo(r - rc, FLOOR); ctx.quadraticCurveTo(r, FLOOR, r, FLOOR - rc); ctx.lineTo(r, RIM); ctx.fill();
    ctx.fillStyle = tint;
    ctx.beginPath(); ctx.moveTo(l, LEVEL); ctx.lineTo(l, FLOOR - rc); ctx.quadraticCurveTo(l, FLOOR, l + rc, FLOOR); ctx.lineTo(r - rc, FLOOR); ctx.quadraticCurveTo(r, FLOOR, r, FLOOR - rc); ctx.lineTo(r, LEVEL); ctx.fill();
    ctx.restore();
    hits.push({ x: cx, y: (LEVEL + FLOOR) / 2 + 60, r: 60, name });
  }
  function glass(ctx, cx) {
    const l = cx - HW, r = cx + HW, rc = 22, g = alpha(PAL.ink, 0.6);
    ctx.save(); ctx.strokeStyle = g; ctx.lineWidth = 4; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.moveTo(l - 16, RIM - 10); ctx.quadraticCurveTo(l, RIM - 6, l, RIM + 14); ctx.lineTo(l, FLOOR - rc); ctx.quadraticCurveTo(l, FLOOR, l + rc, FLOOR);
    ctx.lineTo(r - rc, FLOOR); ctx.quadraticCurveTo(r, FLOOR, r, FLOOR - rc); ctx.lineTo(r, RIM); ctx.stroke(); ctx.restore();
    line(ctx, l + 2, LEVEL, r - 2, LEVEL, alpha(PAL.ink, 0.35), 2);
  }
  function tag(ctx, s, lx, ly, tx, ty, align) {
    if (tx != null) line(ctx, align === 'right' ? lx + 8 : align === 'left' ? lx - 8 : lx, align === 'center' ? ly - 16 : ly, tx, ty, alpha(PAL.ink, 0.55), 1.5);
    text(ctx, s, lx, ly, PAL.ink, { size: 22, align });
  }

  let lastTex = '';
  function draw() {
    const { ctx } = begin(d.c);
    hits = [];
    const c = cell.value, C0 = CELLS[c], t = cy.now(), x = C0.xmax * t / T, run = x / C0.xmax, cu = c === 'cu';
    const left = cu ? alpha(F.fact(CU_BLUE), 0.22 + 0.18 * run) : alpha(PAL.muted, 0.13), right = alpha(PAL.muted, 0.13);
    beaker(ctx, LX, left, cu ? 'the anode half-cell: copper(II) nitrate solution' : 'the anode half-cell: magnesium chloride solution');
    beaker(ctx, RX, right, cu ? 'the cathode half-cell: silver nitrate solution' : 'the cathode half-cell: iron(III) and iron(II) chloride solution');

    /* the electrodes: Cu thins and Ag thickens; the Mg ribbon thins; the Pt coil is unchanged */
    if (cu) {
      const wa = 44 - 18 * run, wc = 44 + 16 * run;
      ctx.save(); ctx.strokeStyle = alpha(PAL.ink, 0.6); ctx.lineWidth = 1.5;
      ctx.fillStyle = F.el('Cu'); ctx.fillRect(XA - wa / 2, TOP, wa, BOT - TOP); ctx.strokeRect(XA - wa / 2, TOP, wa, BOT - TOP);
      ctx.fillStyle = F.el('Ag'); ctx.fillRect(XC - wc / 2, TOP, wc, BOT - TOP); ctx.strokeRect(XC - wc / 2, TOP, wc, BOT - TOP); ctx.restore();
      hits.push({ x: XA, y: 480, r: 26, name: 'the copper anode, where copper is oxidized' }, { x: XC, y: 480, r: 30, name: 'the silver cathode, where silver(I) ions are reduced' });
    } else {
      const w = 13 - 6 * run;
      stroke(ctx, ribbon, alpha(PAL.ink, 0.6), w + 3); stroke(ctx, ribbon, F.el('Mg'), w);
      stroke(ctx, ptWire, alpha(PAL.ink, 0.6), 8); stroke(ctx, ptWire, F.el('Pt'), 5);
      hits.push({ x: SP.x, y: SP.y, r: 70, name: 'the magnesium anode, where magnesium is oxidized' }, { x: (COIL.x0 + COIL.x1) / 2, y: COIL.y, r: 50, name: 'the platinum cathode, an inert electrode where iron(III) ions are reduced' });
    }

    /* the salt bridge: glass, its electrolyte, a porous plug at each foot, both feet under the liquid */
    stroke(ctx, bridgeLine, alpha(PAL.ink, 0.55), BW + 4, 'butt');
    stroke(ctx, bridgeLine, PAL.panel, BW - 4, 'butt');
    stroke(ctx, bridgeLine, alpha(PAL.muted, 0.14), BW - 4, 'butt');
    for (const bx of [BL, BR]) { ctx.save(); ctx.fillStyle = PAL.muted; ctx.fillRect(bx - BW / 2 + 2, PLUG - 16, BW - 4, 16); ctx.restore(); }
    hits.push({ x: 700, y: BT, r: 36, name: cu ? 'the salt bridge, filled with sodium nitrate solution' : 'the salt bridge, filled with sodium chloride solution' },
      { x: BL, y: PLUG - 8, r: 18, name: 'a porous plug' }, { x: BR, y: PLUG - 8, r: 18, name: 'a porous plug' });
    /* the liquid over everything below its surface, then the glass */
    for (const [cx, tint] of [[LX, left], [RX, right]]) { ctx.save(); ctx.fillStyle = tint; ctx.globalAlpha = 0.5; ctx.fillRect(cx - HW + 2, LEVEL, 2 * HW - 4, FLOOR - LEVEL - 2); ctx.restore(); glass(ctx, cx); }
    ions(ctx, c, t, run);

    /* the wire and the external circuit, and the electrons, two per event, anode to cathode */
    stroke(ctx, wirePath.pts, PAL.ink, 5);
    const NE = 22, sp = wirePath.L / NE, vel = 2 * sp / TE;
    for (let i = 0; i < NE; i++) {
      const s = (i * sp + vel * t) % wirePath.L, [ex, ey] = wirePath.at(s);
      if (Math.abs(ex - BOX.x) < BOX.w / 2 + 6 && Math.abs(ey - BOX.y) < BOX.h) continue;
      dot(ctx, ex, ey, F.el('e-'), true, 8);
      hits.push({ x: ex, y: ey, r: 12, name: 'an electron, e⁻, in the wire' });
    }
    ctx.save(); ctx.fillStyle = PAL.soft; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.roundRect(BOX.x - BOX.w / 2, BOX.y - BOX.h / 2, BOX.w, BOX.h, 12); ctx.fill(); ctx.stroke(); ctx.restore();
    text(ctx, 'external circuit', BOX.x, BOX.y, PAL.ink, { size: 22, align: 'center' });
    hits.push({ x: BOX.x, y: BOX.y, r: 40, name: 'the external circuit' });
    text(ctx, 'flow of electrons', 690, 30, PAL.ink, { size: 22, align: 'right' });
    arrow(ctx, 706, 30, 776, 30, PAL.ink, 3);

    /* labels, all on parts that hold still */
    text(ctx, 'Flow of anions', 568, 168, PAL.ink, { size: 22, align: 'right' }); arrow(ctx, 640, 168, 584, 168, PAL.ink, 3);
    text(ctx, 'Flow of cations', 832, 168, PAL.ink, { size: 22, align: 'left' }); arrow(ctx, 760, 168, 816, 168, PAL.ink, 3);
    tag(ctx, cu ? 'Salt bridge (NaNO₃)' : 'Salt bridge', 700, 330, 700, BT + BW / 2 + 2, 'center');
    if (cu) {
      tag(ctx, 'Cu anode', XA - 34, 268, null, null, 'right');
      tag(ctx, 'Ag cathode', XC + 38, 268, null, null, 'left');
      tag(ctx, 'Porous plug', 580, 590, BL + 24, PLUG - 4, 'left');
      tag(ctx, 'Cu(NO₃)₂(aq)', LX, 680, null, null, 'center');
      tag(ctx, 'AgNO₃(aq)', RX, 680, null, null, 'center');
    } else {
      tag(ctx, 'Mg anode', 136, 440, SP.x - SP.r0 - 6, 440, 'right');
      tag(ctx, 'Pt cathode', 1264, 440, XC + 6, 440, 'left');
      tag(ctx, 'Porous plug', 580, 590, BL + 24, PLUG - 4, 'left');
      tag(ctx, 'MgCl₂(aq)', LX, 680, null, null, 'center');
      tag(ctx, 'FeCl₃(aq) and FeCl₂(aq)', RX, 680, null, null, 'center');
    }

    /* the key: each moving particle once */
    const nitrate = (g, px, py) => { for (let i = 0; i < 3; i++) { const a = i * TAU / 3 - Math.PI / 2; dot(g, px + 10 * Math.cos(a), py + 10 * Math.sin(a), F.el('O'), true, 6.5); } dot(g, px, py, F.el('N'), true, 6.5); };
    const sample = (el, r) => (g, px, py) => dot(g, px, py, F.el(el), true, r);
    const keys = cu
      ? [{ s: 'electron, e⁻', draw: sample('e-', 8) }, { s: 'Cu²⁺', draw: sample('Cu', ION_R.Cu) }, { s: 'Ag⁺', draw: sample('Ag', ION_R.Ag) }, { s: 'NO₃⁻', draw: nitrate }, { s: 'Na⁺', draw: sample('Na', ION_R.Na) }]
      : [{ s: 'electron, e⁻', draw: sample('e-', 8) }, { s: 'Mg²⁺', draw: sample('Mg', ION_R.Mg) }, { s: 'Fe³⁺ in, Fe²⁺ out', draw: sample('Fe', ION_R.Fe3) }, { s: 'Cl⁻', draw: sample('Cl', ION_R.Cl) }, { s: 'Na⁺', draw: sample('Na', ION_R.Na) }];
    F.legend(ctx, { l: 0, r: 1400, t: 0, b: H }, keys, { corner: 'bottom', row: true, size: 20 });

    const fx = (y) => y.toFixed(C0.dec), s = C0.tex(x, fx);
    if (s !== lastTex) { lastTex = s; ro.set(s, C0.note, { form: c, values: false }); }
  }
  register(d.fig, { update: (dt) => cy.step(dt, () => 1), draw });
})();
};
