/* Figures for section 1.3 Physical and Chemical Properties. Boots against the section's text article. */
window.OMNISTAX_FIGURES = window.OMNISTAX_FIGURES || {};
window.OMNISTAX_FIGURES['1.3'] = function (root, F) {
const { el, fmt, tex, C, PAL, alpha, ctl, register, begin, line, text, headline } = F;
const sim = (id, H) => F.sim(root, id, H);
function readout(host, main, small) { tex(host, main); if (small) host.appendChild(el('small', null, small)); }

/* ---------- sprites, in ink ---------- */
/* a jug of milk whose base is centred on (x, y): w wide, h tall, with a lip and a handle */
function jug(ctx, x, y, w, h, color) {
  ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = 4; ctx.beginPath();
  ctx.moveTo(x - w / 2, y); ctx.lineTo(x - w / 2, y - h + 30); ctx.lineTo(x - w / 2 + 18, y - h); ctx.lineTo(x + w / 2 - 18, y - h); ctx.lineTo(x + w / 2, y - h + 30); ctx.lineTo(x + w / 2, y);
  ctx.closePath(); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x + w / 2, y - h + 60); ctx.quadraticCurveTo(x + w / 2 + 50, y - h + 60, x + w / 2 + 50, y - h + 130); ctx.quadraticCurveTo(x + w / 2 + 50, y - h + 170, x + w / 2, y - h + 170); ctx.stroke();
  ctx.restore();
}
/* a balance whose pan top is the line at y from x1 to x2, with a display box under it reading s in a colour */
function balance(ctx, x1, x2, y, s, color) {
  line(ctx, x1, y, x2, y, color, 5);
  const cx = (x1 + x2) / 2;
  ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(cx, y); ctx.lineTo(cx, y + 26); ctx.stroke();
  ctx.fillStyle = PAL.panel; ctx.fillRect(cx - 120, y + 26, 240, 52); ctx.strokeRect(cx - 120, y + 26, 240, 52); ctx.restore();
  text(ctx, s, cx, y + 52, color, { size: 24, weight: 600, align: 'center' });
}
/* a thermometer standing on (x, y), h tall, whose column is filled to the fraction f in a colour */
function thermometer(ctx, x, y, h, f, color) {
  ctx.save(); ctx.strokeStyle = PAL.muted; ctx.lineWidth = 3; ctx.fillStyle = PAL.panel;
  ctx.beginPath(); ctx.roundRect(x - 9, y - h, 18, h - 10, 9); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.arc(x, y, 18, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); ctx.restore();
  ctx.save(); ctx.fillStyle = color; ctx.beginPath(); ctx.arc(x, y, 12, 0, Math.PI * 2); ctx.fill();
  ctx.fillRect(x - 4, y - 14 - (h - 40) * f, 8, (h - 40) * f + 6); ctx.restore();
  for (let i = 0; i <= 6; i++) line(ctx, x + 10, y - 14 - ((h - 40) * i) / 6, x + 18, y - 14 - ((h - 40) * i) / 6, PAL.muted, 2);
}

/* =====================================================================
   SIM: extensive against intensive. A jug of milk on a balance with a
   thermometer in it; a volume slider and a temperature slider. Mass and
   volume grow with the sample, density and temperature do not. A still
   picture: no cycle, no transport, the sliders alone redraw it.
===================================================================== */
(function () {
  const d = sim('sim-extensive', 600);
  const V = ctl(d.controls, { label: '\\kV', cls: 'volume', min: 0.25, max: 4, step: 0.01, value: 3.79, unit: 'L', dec: 2, aria: 'volume of milk' });
  const T = ctl(d.controls, { label: '\\kT', cls: 'temperature', min: 0, max: 60, step: 1, value: 20, unit: '°C', dec: 0, aria: 'temperature' });
  const DENS = 1.03;               /* g/mL, whole milk */
  const VMAX = 4, TMAX = 60;
  function draw() {
    const { ctx } = begin(d.c);
    const v = V.v, t = T.v, mL = v * 1000, mg = DENS * mL, mkg = mg / 1000;
    const cm = C('mass'), cv = C('volume'), ct = C('temperature');
    /* the scene: the jug, its milk, the balance and the thermometer */
    const jx = 300, jy = 430, jw = 220, jh = 300, inner = jh - 34;
    const level = jy - (inner * v) / VMAX;
    ctx.save(); ctx.fillStyle = alpha(cv, 0.28); ctx.fillRect(jx - jw / 2 + 2, level, jw - 4, jy - level - 2); ctx.restore();
    line(ctx, jx - jw / 2, level, jx + jw / 2, level, cv, 4);
    jug(ctx, jx, jy, jw, jh, PAL.ink);
    text(ctx, 'milk', jx, jy - jh - 26, PAL.ink, { size: 20, align: 'center' });
    text(ctx, fmt(v, 2) + ' L', jx - jw / 2 - 14, level, cv, { size: 22, weight: 600, align: 'right' });
    balance(ctx, jx - 170, jx + 170, jy + 4, fmt(mkg, 2) + ' kg', cm);
    thermometer(ctx, 600, jy - 20, 240, t / TMAX, ct);
    text(ctx, fmt(t, 0) + ' °C', 630, jy - 20 - 14 - (200 * t) / TMAX, ct, { size: 22, weight: 600 });
    /* the four bars beside the scene: two that grow with the sample and two that do not */
    const bx = 900, bw = 380, rows = [
      ['mass', 'extensive', mkg / (DENS * VMAX), fmt(mkg, 2) + ' kg', cm],
      ['volume', 'extensive', v / VMAX, fmt(v, 2) + ' L', cv],
      ['density', 'intensive', DENS / 2, fmt(DENS, 2) + ' g/mL', PAL.ink],
      ['temperature', 'intensive', t / TMAX, fmt(t, 0) + ' °C', ct],
    ];
    rows.forEach(([name, kind, f, val, color], i) => {
      const y = 150 + i * 96;
      text(ctx, name, bx, y - 28, color, { size: 22, weight: 600 });
      text(ctx, kind, bx + bw, y - 28, PAL.muted, { size: 17, align: 'right' });
      ctx.save(); ctx.fillStyle = PAL.soft; ctx.fillRect(bx, y - 12, bw, 24); ctx.fillStyle = color; ctx.fillRect(bx, y - 12, Math.max(4, bw * Math.min(1, f)), 24); ctx.restore();
      text(ctx, val, bx + bw + 16, y, color, { size: 22, weight: 600 });
    });
    line(ctx, bx - 60, 110, bx - 60, 500, PAL.rule, 1.5);
    headline(ctx, fmt(v, 2) + ' L of milk at ' + fmt(t, 0) + ' °C has a mass of ' + fmt(mkg, 2) + ' kg and a density of ' + fmt(DENS, 2) + ' g/mL');
    readout(d.readout, `\\km = d\\,\\kV = ${fmt(DENS, 2)}\\ \\text{g/mL} \\times ${fmt(mL, 0)}\\ \\text{mL} = ${fmt(mkg, 2)}\\ \\text{kg} \\qquad \\kT = ${fmt(t, 0)}\\ \\text{°C}`,
      'Doubling the sample doubles the mass and the volume, and leaves the density and the temperature where they were.');
  }
  register(d.fig, { update: () => {}, draw });
})();
};
