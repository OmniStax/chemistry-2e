/* Figures for section 7.3 Lewis Symbols and Structures. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['7.3'] = function (root, F) {
const { el, tex, PAL, register, begin, line, text, headline } = F;
const RAD = Math.PI / 180;
function readout(host, main, small) { tex(host, main); if (small) host.appendChild(el('small', null, small)); }

/* =====================================================================
   SIM: the five steps of writing a Lewis structure, one electron ledger.
   Steps are discrete states, so they are a choice; there is no clock.
   Everything is ink; electrons placed in the current step carry the
   book's red mark, F.cat(0).
===================================================================== */
(function () {
  const H = 440, CX = 700, CY = 250;
  const NAMES = { H: 'hydrogen', C: 'carbon', N: 'nitrogen', O: 'oxygen', F: 'fluorine', Si: 'silicon' };
  /* v: valence electrons; lp3, lp4, lp5: lone pairs per atom after steps 3, 4, 5; order5: bond orders after step 5 */
  const MOLS = [
    { label: 'SiH₄', name: 'SiH_{4}', tex: '\\text{SiH}_4', charge: 0,
      atoms: [{ s: 'Si', x: 0, y: 0, v: 4 }, { s: 'H', x: 0, y: -120, v: 1 }, { s: 'H', x: 135, y: 0, v: 1 }, { s: 'H', x: 0, y: 120, v: 1 }, { s: 'H', x: -135, y: 0, v: 1 }],
      bonds: [[0, 1], [0, 2], [0, 3], [0, 4]], lp3: [0, 0, 0, 0, 0], lp4: [0, 0, 0, 0, 0], order5: [1, 1, 1, 1], lp5: [0, 0, 0, 0, 0] },
    { label: 'CHO₂⁻', name: 'CHO_{2}⁻', tex: '\\text{CHO}_2{}^{-}', charge: -1,
      atoms: [{ s: 'C', x: 0, y: 0, v: 4 }, { s: 'H', x: -135, y: 0, v: 1 }, { s: 'O', x: 100, y: -95, v: 6 }, { s: 'O', x: 100, y: 95, v: 6 }],
      bonds: [[0, 1], [0, 2], [0, 3]], lp3: [0, 0, 3, 3], lp4: [0, 0, 3, 3], order5: [1, 2, 1], lp5: [0, 0, 2, 3] },
    { label: 'NO⁺', name: 'NO⁺', tex: '\\text{NO}^{+}', charge: 1,
      atoms: [{ s: 'N', x: -70, y: 0, v: 5 }, { s: 'O', x: 70, y: 0, v: 6 }],
      bonds: [[0, 1]], lp3: [2, 2], lp4: [2, 2], order5: [3], lp5: [1, 1] },
    { label: 'OF₂', name: 'OF_{2}', tex: '\\text{OF}_2', charge: 0,
      atoms: [{ s: 'O', x: 0, y: 0, v: 6 }, { s: 'F', x: -140, y: 0, v: 7 }, { s: 'F', x: 140, y: 0, v: 7 }],
      bonds: [[0, 1], [0, 2]], lp3: [0, 3, 3], lp4: [2, 3, 3], order5: [1, 1], lp5: [2, 3, 3] },
    { label: 'HCN', name: 'HCN', tex: '\\text{HCN}', charge: 0,
      atoms: [{ s: 'H', x: -140, y: 0, v: 1 }, { s: 'C', x: 0, y: 0, v: 4 }, { s: 'N', x: 140, y: 0, v: 5 }],
      bonds: [[1, 0], [1, 2]], lp3: [0, 0, 3], lp4: [0, 0, 3], order5: [1, 3], lp5: [0, 0, 1] },
    { label: 'HCCH', name: 'HCCH', tex: '\\text{HCCH}', charge: 0,
      atoms: [{ s: 'H', x: -205, y: 0, v: 1 }, { s: 'C', x: -70, y: 0, v: 4 }, { s: 'C', x: 70, y: 0, v: 4 }, { s: 'H', x: 205, y: 0, v: 1 }],
      bonds: [[1, 0], [1, 2], [2, 3]], lp3: [0, 0, 0, 0], lp4: [0, 1, 1, 0], order5: [1, 3, 1], lp5: [0, 0, 0, 0] },
  ];
  const WORD = ['no', 'one', 'two', 'three', 'four', 'five', 'six'];
  const BONDNAME = ['', 'single', 'double', 'triple'];
  const sum = (a) => a.reduce((t, x) => t + x, 0);
  const total = (m) => sum(m.atoms.map((a) => a.v)) - m.charge;

  /* the state after step s: bond orders (none at step 1), lone pairs, and each atom's electron count */
  function state(mi, s) {
    const m = MOLS[mi];
    const orders = s < 2 ? m.bonds.map(() => 0) : s < 5 ? m.bonds.map(() => 1) : m.order5;
    const lp = s < 3 ? m.atoms.map(() => 0) : s === 3 ? m.lp3 : s === 4 ? m.lp4 : m.lp5;
    const count = m.atoms.map((a, i) => (s === 1 ? a.v : 2 * lp[i] + 2 * sum(m.bonds.map(([p, q], j) => (p === i || q === i ? orders[j] : 0)))));
    return { m, s, orders, lp, count, inBonds: 2 * sum(orders), inPairs: 2 * sum(lp) };
  }
  /* the angles (screen degrees) round atom i left free by its bonds, the side facing away from them first */
  function slots(m, st, i) {
    const a = m.atoms[i];
    const dirs = m.bonds.filter(([p, q], j) => st.orders[j] > 0 && (p === i || q === i)).map(([p, q]) => { const b = m.atoms[p === i ? q : p]; return Math.atan2(b.y - a.y, b.x - a.x) / RAD; });
    if (!dirs.length) return [0, -90, 180, 90];
    const ux = sum(dirs.map((d) => Math.cos(d * RAD))), uy = sum(dirs.map((d) => Math.sin(d * RAD)));
    const cand = [1, 2, 3].map((k) => dirs[0] + 90 * k).filter((c) => dirs.every((d) => Math.abs(((c - d + 540) % 360) - 180) > 40));
    return cand.sort((p, q) => (Math.cos(p * RAD) * ux + Math.sin(p * RAD) * uy) - (Math.cos(q * RAD) * ux + Math.sin(q * RAD) * uy) || Math.sin(p * RAD) - Math.sin(q * RAD));
  }
  /* everything a state draws, each part keyed so that a change of step fades only what changed */
  function parts(mi, s) {
    const st = state(mi, s), m = st.m, spread = s === 1 ? 1.3 : 1, out = [];
    const P = (a) => [CX + a.x * spread, CY + a.y * spread];
    m.atoms.forEach((a, i) => {
      const [x, y] = P(a);
      out.push({ key: `${mi}a${i}`, kind: 'atom', x, y, sym: a.s });
      const r = a.s.length > 1 ? 34 : 29, sl = slots(m, st, i);
      if (s === 1) {
        for (let e = 0; e < a.v; e++) { const k = e % 4, second = e >= 4; out.push({ key: `${mi}v${i}_${e}`, kind: 'dot', x, y, ang: sl[k], r, off: a.v > 4 && (second || e + 4 < a.v) ? (second ? -7 : 7) : 0 }); }
      } else {
        for (let p = 0; p < st.lp[i]; p++) { const ang = sl[p % sl.length]; out.push({ key: `${mi}p${i}_${ang}`, kind: 'dot', x, y, ang, r, off: 7 }, { key: `${mi}q${i}_${ang}`, kind: 'dot', x, y, ang, r, off: -7 }); }
      }
    });
    m.bonds.forEach(([p, q], j) => {
      if (!st.orders[j]) return;
      const [x1, y1] = P(m.atoms[p]), [x2, y2] = P(m.atoms[q]);
      for (let o = 0; o < st.orders[j]; o++) out.push({ key: `${mi}b${j}_${o}`, kind: 'bond', x1, y1, x2, y2, g1: m.atoms[p].s.length > 1 ? 30 : 22, g2: m.atoms[q].s.length > 1 ? 30 : 22, off: (o - (st.orders[j] - 1) / 2) * 11 });
    });
    if (s > 1 && m.charge) {
      const xs = m.atoms.map((a) => a.x), ys = m.atoms.map((a) => a.y);
      out.push({ key: `${mi}br`, kind: 'brackets', l: CX + Math.min(...xs) - 62, r: CX + Math.max(...xs) + 62, t: CY + Math.min(...ys) - 62, b: CY + Math.max(...ys) + 62, charge: m.charge > 0 ? '+' : '−' });
    }
    return out;
  }

  const d = F.sim(root, 'sim-lewis-steps', H);
  const pickM = F.select(d.controls, { label: '\\text{molecule or ion}', options: MOLS.map((m, i) => ({ value: String(i), label: m.label })), value: '1' });
  const pickS = F.choice(d.controls, { label: '\\text{step}', options: [1, 2, 3, 4, 5].map((s) => ({ value: String(s), label: String(s) })), value: '1' });
  let hits = [];
  F.hover(d.stage, () => hits);

  function drawPart(ctx, p, color, a) {
    ctx.save(); ctx.globalAlpha *= a;
    if (p.kind === 'atom') text(ctx, p.sym, p.x, p.y + 1, PAL.ink, { size: p.sym.length > 1 ? 30 : 34, weight: 600, align: 'center' });
    else if (p.kind === 'dot') {
      const c = Math.cos(p.ang * RAD), s = Math.sin(p.ang * RAD);
      F.dot(ctx, p.x + c * p.r - s * p.off, p.y + s * p.r + c * p.off, color, true, 4.5);
    } else if (p.kind === 'bond') {
      const dx = p.x2 - p.x1, dy = p.y2 - p.y1, L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy * p.off, ny = ux * p.off;
      line(ctx, p.x1 + ux * p.g1 + nx, p.y1 + uy * p.g1 + ny, p.x2 - ux * p.g2 + nx, p.y2 - uy * p.g2 + ny, color, 3.5);
    } else if (p.kind === 'brackets') {
      ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3; ctx.beginPath();
      ctx.moveTo(p.l + 16, p.t); ctx.lineTo(p.l, p.t); ctx.lineTo(p.l, p.b); ctx.lineTo(p.l + 16, p.b);
      ctx.moveTo(p.r - 16, p.t); ctx.lineTo(p.r, p.t); ctx.lineTo(p.r, p.b); ctx.lineTo(p.r - 16, p.b); ctx.stroke();
      text(ctx, p.charge, p.r + 10, p.t + 4, PAL.ink, { size: 26, weight: 600 });
    }
    ctx.restore();
  }

  function words(st) {
    const m = st.m, T = total(m), left = T - st.inBonds - st.inPairs, nb = m.bonds.length;
    const central = m.atoms.map((a, i) => i).filter((i) => m.bonds.filter(([p, q]) => p === i || q === i).length > 1);
    const short = m.atoms.map((a, i) => i).filter((i) => st.count[i] < (m.atoms[i].s === 'H' ? 2 : 8));
    const prev = state(+pickM.value, st.s - 1 || 1);
    switch (st.s) {
      case 1: return `${m.name} has ${T} valence electrons to place${m.charge < 0 ? ', one of them for the negative charge' : m.charge > 0 ? ', one fewer for the positive charge' : ''}.`;
      case 2: return `${WORD[nb][0].toUpperCase() + WORD[nb].slice(1)} single bond${nb > 1 ? 's' : ''} use${nb > 1 ? '' : 's'} ${st.inBonds} electrons, and ${left} remain.`;
      case 3: return st.inPairs ? `Lone pairs on the terminal atoms use ${st.inPairs} electrons, and ${left} remain.` : `No terminal atom other than hydrogen takes electrons, and ${left} remain.`;
      case 4: { const put = st.inPairs - prev.inPairs; return put ? `The ${put} remaining electrons go to the central atom${central.length > 1 ? 's' : ''} as lone pairs.` : 'No electrons remain to place on the central atom.'; }
      default: {
        const moved = sum(st.orders) - nb, j = st.orders.findIndex((o) => o > 1);
        if (!moved) return `Every atom has ${short.length ? 'as many electrons as it can' : 'a filled valence shell'}, so nothing needs to change.`;
        const [p, q] = m.bonds[j];
        return `${WORD[moved][0].toUpperCase() + WORD[moved].slice(1)} lone pair${moved > 1 ? 's move' : ' moves'} into the bond, making a ${m.atoms[p].s}–${m.atoms[q].s} ${BONDNAME[st.orders[j]]} bond.`;
      }
    }
  }
  function note(st) {
    const m = st.m, short = m.atoms.map((a, i) => i).filter((i) => st.count[i] < (m.atoms[i].s === 'H' ? 2 : 8));
    if (st.s === 1) return 'Each atom is shown with its own valence electrons, as in its Lewis symbol.';
    if (!short.length) return st.s === 5 && sum(st.orders) === m.bonds.length ? '' : 'Every atom has a filled valence shell: eight electrons, or two for hydrogen.';
    const names = [...new Set(short.map((i) => NAMES[m.atoms[i].s]))];
    const each = short.map((i) => st.count[i]);
    return `The ${names.join(' and ')} atom${short.length > 1 ? 's' : ''} ${short.length > 1 ? 'have' : 'has'} ${[...new Set(each)].join(' and ')} electrons and ${short.length > 1 ? 'lack octets' : 'lacks an octet'}.`;
  }

  function draw() {
    const { ctx } = begin(d.c);
    const mi = +pickM.value, s = +pickS.value;
    const k = Math.min(pickM.k, pickS.k);
    const pm = pickM.k < 1 ? +pickM.from : mi, ps = pickS.k < 1 ? +pickS.from : s;
    const now = parts(mi, s), before = parts(pm, ps), fresh = new Set(parts(mi, Math.max(1, s - 1)).map((p) => p.key));
    const nowKeys = new Set(now.map((p) => p.key));
    const red = F.cat(0);
    before.filter((p) => !nowKeys.has(p.key)).forEach((p) => drawPart(ctx, p, PAL.ink, 1 - k));
    const beforeKeys = new Set(before.map((p) => p.key));
    now.forEach((p) => {
      const color = s > 1 && !fresh.has(p.key) ? red : PAL.ink;
      drawPart(ctx, p, color, beforeKeys.has(p.key) ? 1 : k);
    });
    const st = state(mi, s);
    headline(ctx, `Step ${s}: ${words(st)}`);
    hits = now.filter((p) => p.kind === 'atom').map((p, i) => ({ x: p.x, y: p.y, r: 36, name: `${NAMES[p.sym]} (${p.sym}): ${st.count[i]} electrons` }));
    const m = st.m, T = total(m);
    const main = s === 1
      ? `\\text{valence electrons in }${m.tex} = ${m.atoms.map((a) => a.v).join(' + ')}${m.charge ? (m.charge < 0 ? ' + 1' : ' - 1') : ''} = ${T}`
      : `\\underbrace{${st.inBonds}}_{\\text{in bonds}} + \\underbrace{${st.inPairs}}_{\\text{in lone pairs}} + \\underbrace{${T - st.inBonds - st.inPairs}}_{\\text{still to place}} = ${T}`;
    readout(d.readout, main, note(st));
  }
  register(d.fig, { update: () => {}, draw });
})();
};
