/* Figures for the introduction to Chapter 8, Advanced Theories of Covalent Bonding. Boots against the page's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['8.intro'] = function (root, F) {
const { PAL, register, begin, line, text } = F;
const RAD = Math.PI / 180;

function bondLine(ctx, x1, y1, x2, y2, order) {
  const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy) || 1, px = -dy / L * 7, py = dx / L * 7;
  const offs = order === 1 ? [0] : order === 2 ? [-1, 1] : [-1.4, 0, 1.4];
  offs.forEach((o) => line(ctx, x1 + px * o, y1 + py * o, x2 + px * o, y2 + py * o, PAL.ink, 3.5));
}
/* atoms: [{sym, x, y, lp: [angles in degrees]}]; bonds: [[i, j, order]]; drawn about (cx, cy) */
function lewis(ctx, cx, cy, atoms, bonds) {
  const gap = 24;
  bonds.forEach(([i, j, order]) => {
    const a = atoms[i], b = atoms[j], x1 = cx + a.x, y1 = cy + a.y, x2 = cx + b.x, y2 = cy + b.y, dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy) || 1;
    bondLine(ctx, x1 + dx * gap / L, y1 + dy * gap / L, x2 - dx * gap / L, y2 - dy * gap / L, order);
  });
  atoms.forEach((a) => {
    const x = cx + a.x, y = cy + a.y;
    text(ctx, a.sym, x, y + 1, PAL.ink, { size: 32, weight: 600, align: 'center' });
    (a.lp ?? []).forEach((ang) => {
      const c = Math.cos(ang * RAD), s = -Math.sin(ang * RAD), d = 30, px = -s, py = c;
      F.dot(ctx, x + c * d + px * 7, y + s * d + py * 7, PAL.ink, true, 4);
      F.dot(ctx, x + c * d - px * 7, y + s * d - py * 7, PAL.ink, true, 4);
    });
  });
}

const H = 200;
const d = F.sim(root, 'fig-lewis-n2-o2', H);
function draw() {
  const { ctx } = begin(d.c);
  lewis(ctx, 420, 84, [{ sym: 'N', x: -75, y: 0, lp: [180] }, { sym: 'N', x: 75, y: 0, lp: [0] }], [[0, 1, 3]]);
  lewis(ctx, 980, 84, [{ sym: 'O', x: -75, y: 0, lp: [90, 180] }, { sym: 'O', x: 75, y: 0, lp: [90, 0] }], [[0, 1, 2]]);
  text(ctx, 'N₂', 420, 160, PAL.muted, { size: 24, align: 'center' });
  text(ctx, 'O₂', 980, 160, PAL.muted, { size: 24, align: 'center' });
}
register(d.fig, { update: () => {}, draw });
};
