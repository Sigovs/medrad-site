/* canvas_patch.js — node _canvas_patch.js */
'use strict';
const fs = require('fs');
const BASE = __dirname;

// ─────────────────────────────────────────────────────────────
// 1. HTML — replace SVG with canvas inside .risk-diagram
// ─────────────────────────────────────────────────────────────
const newDiagram = `          <div class="risk-diagram" id="assessDiagram">
            <canvas class="risk-diagram__canvas" id="diagCanvas" aria-hidden="true"></canvas>
          </div>`;

let html = fs.readFileSync(BASE + '/index.html', 'utf8');

function findDivBounds(src, openStr) {
  const open = src.indexOf(openStr);
  let depth = 0, i = open;
  while (i < src.length) {
    if (src.startsWith('<div', i)) depth++;
    else if (src.startsWith('</div>', i)) { depth--; if (depth === 0) break; }
    i++;
  }
  return { open, close: i + 6 };
}

const { open: rdOpen, close: rdClose } = findDivBounds(html, '          <div class="risk-diagram"');
html = html.slice(0, rdOpen) + newDiagram + html.slice(rdClose);
fs.writeFileSync(BASE + '/index.html', html, 'utf8');
console.log('HTML: replaced risk-diagram content');

// ─────────────────────────────────────────────────────────────
// 2. CSS — append canvas + diagram styles
// ─────────────────────────────────────────────────────────────
const canvasCss = `

/* ============================================================
   Risk Diagram — Living Geometric Field (Canvas)
   ============================================================ */

.risk-diagram {
  position: relative;
  width: 100%;
  height: 490px;
  overflow: hidden;
}

.risk-diagram__canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
}

@media (max-width: 900px) {
  .risk-diagram { height: 380px; }
}
`;

const css = fs.readFileSync(BASE + '/styles.css', 'utf8');
fs.writeFileSync(BASE + '/styles.css', css + canvasCss, 'utf8');
console.log('CSS: appended canvas styles');

// ─────────────────────────────────────────────────────────────
// 3. JS — replace section 5b with canvas system
// ─────────────────────────────────────────────────────────────
const canvasJs = `  /* ----------------------------------------------------------
     5b. Risk Diagram — Living Geometric Field (Canvas)
  ---------------------------------------------------------- */
  (function () {
    'use strict';

    var canvas  = document.getElementById('diagCanvas');
    var diagram = document.getElementById('assessDiagram');
    var riskBtn = document.getElementById('startAssessment');
    if (!canvas || !diagram) return;

    var ctx = canvas.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var raf, t = 0, last = 0;
    var activation = 0, targetActivation = 0, pulsePhase = 0;
    var supportsFilter = typeof ctx.filter !== 'undefined';

    /* ── Field definition ──────────────────────────────────── */

    // Tension poles (normalized 0–1 of canvas size)
    var POLES = [
      { u: 0.36, v: 0.34, s: 1.0 },
      { u: 0.64, v: 0.66, s: 0.78 }
    ];

    // Curve definitions. r0 = base radius as fraction of min(W,H)/2.
    // H = harmonics: { a:amplitude, n:frequency, phi:phase, om:angular velocity rad/ms }
    var CURVES = [
      // Layer 0 — background (blur slightly on activation)
      { r0:0.90, w:0.55, lay:0, p0:0.00, H:[{a:0.040,n:2,phi:0.00,om:5.2e-4},{a:0.016,n:3,phi:1.80,om:3.8e-4}] },
      { r0:0.80, w:0.55, lay:0, p0:0.70, H:[{a:0.045,n:3,phi:0.60,om:6.0e-4},{a:0.019,n:4,phi:2.40,om:4.5e-4}] },
      { r0:0.70, w:0.60, lay:0, p0:1.40, H:[{a:0.050,n:2,phi:1.20,om:5.5e-4},{a:0.022,n:5,phi:0.40,om:4.2e-4}] },
      // Layer 1 — mid
      { r0:0.59, w:0.75, lay:1, p0:0.30, H:[{a:0.058,n:3,phi:1.80,om:6.5e-4},{a:0.024,n:4,phi:0.80,om:5.0e-4},{a:0.010,n:6,phi:2.20,om:3.0e-4}] },
      { r0:0.50, w:0.75, lay:1, p0:1.80, H:[{a:0.062,n:4,phi:0.40,om:5.8e-4},{a:0.027,n:3,phi:1.40,om:4.8e-4},{a:0.011,n:5,phi:3.00,om:3.5e-4}] },
      { r0:0.42, w:0.80, lay:1, p0:0.90, H:[{a:0.068,n:3,phi:2.00,om:7.0e-4},{a:0.029,n:5,phi:0.60,om:5.2e-4},{a:0.013,n:2,phi:1.60,om:4.0e-4}] },
      { r0:0.35, w:0.80, lay:1, p0:2.50, H:[{a:0.070,n:4,phi:0.80,om:6.2e-4},{a:0.031,n:3,phi:2.60,om:4.5e-4}] },
      // Layer 2 — foreground
      { r0:0.28, w:0.90, lay:2, p0:1.20, H:[{a:0.072,n:3,phi:1.60,om:6.8e-4},{a:0.032,n:5,phi:0.20,om:5.5e-4},{a:0.015,n:4,phi:2.80,om:4.0e-4}] },
      { r0:0.20, w:1.00, lay:2, p0:2.10, H:[{a:0.068,n:4,phi:0.20,om:7.5e-4},{a:0.029,n:6,phi:1.00,om:5.8e-4}] },
      { r0:0.13, w:1.10, lay:2, p0:0.50, H:[{a:0.062,n:5,phi:2.80,om:8.0e-4},{a:0.025,n:3,phi:0.50,om:6.0e-4}] },
      // Layer 3 — core
      { r0:0.07, w:1.25, lay:3, p0:1.60, H:[{a:0.048,n:3,phi:1.00,om:7.0e-4},{a:0.019,n:4,phi:2.20,om:5.5e-4}] }
    ];

    // [defaultOpacity, activatedOpacity] per layer
    var L_OP = [
      [0.11, 0.085],   // bg — dims on activation (recedes)
      [0.22, 0.32],    // mid
      [0.34, 0.70],    // fg  — brightens strongly
      [0.40, 0.82]     // core
    ];

    var AR = 78, AG = 113, AB = 142; // accent: #4E718E

    /* ── Canvas resize ─────────────────────────────────────── */
    function resize() {
      var W = diagram.clientWidth  || 440;
      var H = diagram.clientHeight || 490;
      canvas.width        = W * dpr;
      canvas.height       = H * dpr;
      canvas.style.width  = W + 'px';
      canvas.style.height = H + 'px';
    }

    /* ── Point on a curve at given angle ───────────────────── */
    function point(c, angle, W, H) {
      var hm   = Math.min(W, H) * 0.5;
      var act  = activation;

      // Slow orbital center drift
      var cx = W * 0.5 + hm * 0.022 * Math.sin(t * 2.8e-4);
      var cy = H * 0.5 + hm * 0.016 * Math.cos(t * 3.2e-4 + 1.1);

      // Breathing component (per-curve phase)
      var breathe = 0.016 * Math.sin(t * 3.8e-4 + c.p0 * 0.6);

      // Harmonic deformations (amplify on activation)
      var d = breathe;
      for (var k = 0; k < c.H.length; k++) {
        var h = c.H[k];
        d += h.a * (1 + act * 0.85) * Math.sin(h.n * angle + h.phi + t * h.om);
      }

      // Tension pole Gaussian deformation
      for (var p = 0; p < POLES.length; p++) {
        var pole   = POLES[p];
        var pAngle = Math.atan2(pole.v - 0.5, pole.u - 0.5);
        var diff   = angle - pAngle;
        diff -= Math.round(diff / (2 * Math.PI)) * 2 * Math.PI;
        var gauss  = Math.exp(-diff * diff * 5.5);
        var bump   = act * pole.s * 0.055 * Math.sin(t * 5.5e-4 + p * 1.3);
        d += gauss * bump;
      }

      var r = c.r0 * hm * (1 + d);
      return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
    }

    /* ── Draw one curve ────────────────────────────────────── */
    function drawCurve(c, W, H) {
      var lo = L_OP[c.lay];
      var op = lo[0] + (lo[1] - lo[0]) * activation;

      ctx.strokeStyle = 'rgba(' + AR + ',' + AG + ',' + AB + ',' + op.toFixed(3) + ')';
      ctx.lineWidth   = c.w;

      var N = 150;
      ctx.beginPath();
      for (var i = 0; i <= N; i++) {
        var ang = (i / N) * Math.PI * 2;
        var pt  = point(c, ang, W, H);
        if (i === 0) ctx.moveTo(pt.x, pt.y);
        else          ctx.lineTo(pt.x, pt.y);
      }
      ctx.closePath();
      ctx.stroke();
    }

    /* ── Expanding pulse rings (button hover) ──────────────── */
    function drawPulse(W, H) {
      if (activation < 0.5 || targetActivation < 0.85) return;
      var cx      = W * 0.5;
      var cy      = H * 0.5;
      var maxR    = Math.min(W, H) * 0.52;
      var pAmt    = (activation - 0.5) * 2;

      for (var k = 0; k < 2; k++) {
        var ph = (pulsePhase + k * 0.5) % 1;
        var r  = ph * maxR;
        var op = pAmt * 0.10 * Math.sin(ph * Math.PI);
        if (op < 0.004) continue;
        ctx.strokeStyle = 'rgba(' + AR + ',' + AG + ',' + AB + ',' + op.toFixed(3) + ')';
        ctx.lineWidth   = 0.6;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    /* ── Tension point dot markers ─────────────────────────── */
    function drawPoles(W, H) {
      if (activation < 0.06) return;
      for (var p = 0; p < POLES.length; p++) {
        var pole = POLES[p];
        var px   = pole.u * W;
        var py   = pole.v * H;
        var op   = activation * pole.s * 0.55;

        ctx.fillStyle = 'rgba(' + AR + ',' + AG + ',' + AB + ',' + op.toFixed(3) + ')';
        ctx.beginPath();
        ctx.arc(px, py, 1.8, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = 'rgba(' + AR + ',' + AG + ',' + AB + ',' + (op * 0.42).toFixed(3) + ')';
        ctx.lineWidth   = 0.45;
        ctx.beginPath();
        ctx.moveTo(px - 5, py); ctx.lineTo(px + 5, py);
        ctx.moveTo(px, py - 5); ctx.lineTo(px, py + 5);
        ctx.stroke();
      }
    }

    /* ── Main render loop ──────────────────────────────────── */
    function render(ts) {
      if (!last) last = ts;
      var dt = Math.min(ts - last, 50);
      last = ts;
      t   += dt;

      // Pulse phase advances only during strong activation
      if (targetActivation > 0.85) pulsePhase = (pulsePhase + dt * 2.5e-4) % 1;

      // Smooth activation: faster in, slower out
      var spd  = activation < targetActivation ? 0.030 : 0.020;
      activation += (targetActivation - activation) * spd;

      var W = canvas.width  / dpr;
      var H = canvas.height / dpr;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      // Background curves — grouped with blur
      if (supportsFilter && activation > 0.04) {
        ctx.filter = 'blur(' + (activation * 0.7).toFixed(2) + 'px)';
      }
      for (var i = 0; i < 3; i++) drawCurve(CURVES[i], W, H);

      // Mid + foreground + core — sharp
      ctx.filter = 'none';
      for (var i = 3; i < CURVES.length; i++) drawCurve(CURVES[i], W, H);

      drawPulse(W, H);
      drawPoles(W, H);

      raf = requestAnimationFrame(render);
    }

    /* ── Hover cross-trigger ───────────────────────────────── */
    function setLevel(level) { targetActivation = level; }

    function leaveCheck(e) {
      var to = e.relatedTarget;
      if (!to) { setLevel(0); return; }
      var overDiag = diagram.contains(to) || diagram === to;
      var overBtn  = riskBtn && (riskBtn.contains(to) || riskBtn === to);
      if (!overDiag && !overBtn) setLevel(0);
    }

    diagram.addEventListener('mouseenter', function () { setLevel(0.6); });
    diagram.addEventListener('mouseleave', leaveCheck);

    if (riskBtn) {
      riskBtn.addEventListener('mouseenter', function () { setLevel(1.0); });
      riskBtn.addEventListener('mouseleave', leaveCheck);
    }

    /* ── Init ──────────────────────────────────────────────── */
    resize();
    window.addEventListener('resize', function () {
      cancelAnimationFrame(raf);
      resize();
      last = 0;
      raf = requestAnimationFrame(render);
    }, { passive: true });

    raf = requestAnimationFrame(render);

  }());

`;

let js = fs.readFileSync(BASE + '/script.js', 'utf8');

const s5b  = js.indexOf('  /* ----------------------------------------------------------\n     5b. Risk Diagram');
const sec6 = js.indexOf('  /* ----------------------------------------------------------\n     6. Contact form');

if (s5b === -1 || sec6 === -1) {
  console.error('Could not locate section 5b or 6');
  process.exit(1);
}

js = js.slice(0, s5b) + canvasJs + '\n\n' + js.slice(sec6);
fs.writeFileSync(BASE + '/script.js', js, 'utf8');
console.log('JS: replaced section 5b');

// ── Verify ────────────────────────────────────────────────────────────────────
const jsV  = fs.readFileSync(BASE + '/script.js', 'utf8');
const htmlV = fs.readFileSync(BASE + '/index.html', 'utf8');
console.log('\nVerify:');
console.log('canvas in HTML:        ', htmlV.includes('id="diagCanvas"'));
console.log('risk-diagram in HTML:  ', htmlV.includes('id="assessDiagram"'));
console.log('SVG removed from HTML: ', !htmlV.includes('rg-vessels'));
console.log('CURVES in JS:          ', jsV.includes('var CURVES'));
console.log('render() in JS:        ', jsV.includes('function render('));
console.log('cross-trigger in JS:   ', jsV.includes('setLevel(0.6)'));
