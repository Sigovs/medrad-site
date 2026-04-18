/* _refine_canvas.js — node _refine_canvas.js
   Replaces section 5b with refined canvas system */
'use strict';
const fs = require('fs');
const BASE = __dirname;

const refined = `  /* ----------------------------------------------------------
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

    // Tension poles (normalized 0–1 of canvas)
    var POLES = [
      { u: 0.38, v: 0.36, s: 1.0 },   // primary — upper-left zone
      { u: 0.62, v: 0.64, s: 0.72 }   // secondary — lower-right zone
    ];

    // Curve definitions.
    // r0  = base radius as fraction of min(W,H)/2
    // w   = stroke width px (two accent lines are heavier)
    // lay = depth layer: 0=atmosphere, 1=mid, 2=foreground, 3=core
    // p0  = breathing phase offset per curve
    // H   = harmonics [ {a, n, phi, om} ]
    var CURVES = [
      // Layer 0 — atmosphere (always blurred, lowest presence)
      { r0:0.88, w:0.65, lay:0, p0:0.00, H:[{a:0.038,n:2,phi:0.00,om:5.0e-4},{a:0.014,n:3,phi:1.80,om:3.6e-4}] },
      { r0:0.78, w:0.65, lay:0, p0:0.75, H:[{a:0.042,n:3,phi:0.60,om:5.8e-4},{a:0.017,n:4,phi:2.40,om:4.3e-4}] },
      { r0:0.68, w:0.70, lay:0, p0:1.40, H:[{a:0.048,n:2,phi:1.20,om:5.3e-4},{a:0.020,n:5,phi:0.40,om:4.0e-4}] },
      // Layer 1 — mid field
      { r0:0.58, w:0.90, lay:1, p0:0.30, H:[{a:0.055,n:3,phi:1.80,om:6.2e-4},{a:0.022,n:4,phi:0.80,om:4.8e-4},{a:0.009,n:6,phi:2.20,om:2.9e-4}] },
      { r0:0.50, w:1.60, lay:1, p0:1.80, H:[{a:0.060,n:4,phi:0.40,om:5.6e-4},{a:0.025,n:3,phi:1.40,om:4.6e-4},{a:0.010,n:5,phi:3.00,om:3.3e-4}] }, // accent
      { r0:0.42, w:0.95, lay:1, p0:0.90, H:[{a:0.064,n:3,phi:2.00,om:6.8e-4},{a:0.027,n:5,phi:0.60,om:5.0e-4},{a:0.012,n:2,phi:1.60,om:3.8e-4}] },
      { r0:0.34, w:0.90, lay:1, p0:2.50, H:[{a:0.068,n:4,phi:0.80,om:6.0e-4},{a:0.029,n:3,phi:2.60,om:4.3e-4}] },
      // Layer 2 — foreground (primary visual weight)
      { r0:0.27, w:1.10, lay:2, p0:1.20, H:[{a:0.070,n:3,phi:1.60,om:6.6e-4},{a:0.030,n:5,phi:0.20,om:5.3e-4},{a:0.014,n:4,phi:2.80,om:3.8e-4}] },
      { r0:0.19, w:1.45, lay:2, p0:2.10, H:[{a:0.066,n:4,phi:0.20,om:7.2e-4},{a:0.027,n:6,phi:1.00,om:5.6e-4}] }, // accent
      { r0:0.12, w:1.05, lay:2, p0:0.50, H:[{a:0.058,n:5,phi:2.80,om:7.8e-4},{a:0.023,n:3,phi:0.50,om:5.8e-4}] },
      // Layer 3 — core (sharpens and thickens on activation)
      { r0:0.07, w:1.35, lay:3, p0:1.60, H:[{a:0.044,n:3,phi:1.00,om:6.8e-4},{a:0.017,n:4,phi:2.20,om:5.3e-4}] }
    ];

    // [defaultOpacity, activatedOpacity] per depth layer
    var L_OP = [
      [0.14, 0.07],    // atmosphere — recedes on activation
      [0.28, 0.40],    // mid
      [0.56, 0.74],    // foreground
      [0.65, 0.88]     // core — most defined
    ];

    var AR = 78, AG = 113, AB = 142; // base colour: #4E718E

    /* ── Canvas resize ─────────────────────────────────────── */
    function resize() {
      var W = diagram.clientWidth  || 440;
      var H = diagram.clientHeight || 490;
      canvas.width        = W * dpr;
      canvas.height       = H * dpr;
      canvas.style.width  = W + 'px';
      canvas.style.height = H + 'px';
    }

    /* ── Point on a curve at given polar angle ─────────────── */
    function point(c, angle, W, H) {
      var hm  = Math.min(W, H) * 0.5;
      var act = activation;

      // Slow orbital center drift
      var cx = W * 0.5 + hm * 0.020 * Math.sin(t * 2.8e-4);
      var cy = H * 0.5 + hm * 0.015 * Math.cos(t * 3.2e-4 + 1.1);

      // Per-curve breathing (slow, restrained)
      var breathe = 0.013 * Math.sin(t * 3.5e-4 + c.p0 * 0.6);

      // Harmonic deformations — amplified on activation
      var d = breathe;
      for (var k = 0; k < c.H.length; k++) {
        var h = c.H[k];
        d += h.a * (1 + act * 0.80) * Math.sin(h.n * angle + h.phi + t * h.om);
      }

      // Tension pole Gaussian pull (localized deformation on activation)
      for (var p = 0; p < POLES.length; p++) {
        var pole   = POLES[p];
        var pAngle = Math.atan2(pole.v - 0.5, pole.u - 0.5);
        var diff   = angle - pAngle;
        diff -= Math.round(diff / (2 * Math.PI)) * 2 * Math.PI;
        var gauss  = Math.exp(-diff * diff * 5.5);
        var bump   = act * pole.s * 0.046 * Math.sin(t * 5.2e-4 + p * 1.3);
        d += gauss * bump;
      }

      // Inward pull — field contracts toward center on activation
      var r = c.r0 * hm * (1 + d) * (1 - act * 0.048);
      return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
    }

    /* ── Draw one curve ────────────────────────────────────── */
    function drawCurve(c, W, H) {
      var lo = L_OP[c.lay];
      var op = lo[0] + (lo[1] - lo[0]) * activation;

      // Pulse brightness wave — travels outward from core through each layer
      if (activation > 0.25) {
        var pAmt = Math.min(1, (activation - 0.25) * 1.35);
        // Wave front at waveR: starts at core (0.07), sweeps out to atmosphere (0.88)
        var waveR = 0.07 + pulsePhase * 0.81;
        var dist  = c.r0 - waveR;
        var boost = pAmt * 0.11 * Math.exp(-dist * dist * 52);
        op = Math.min(0.92, op + boost);
      }

      // Core thickens slightly on activation
      var lw = c.lay === 3 ? c.w * (1 + activation * 0.38) : c.w;

      ctx.strokeStyle = 'rgba(' + AR + ',' + AG + ',' + AB + ',' + op.toFixed(3) + ')';
      ctx.lineWidth   = lw;

      var N = 160;
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

    /* ── Node marker — primary diagnostic point ────────────── */
    function drawNode(W, H) {
      var pole = POLES[0];
      var px   = pole.u * W;
      var py   = pole.v * H;

      // Dot — present at rest (very faint), solidifies on activation
      var dotOp = 0.07 + activation * 0.44;
      var dotR  = 1.1 + activation * 0.9
                + Math.sin(t * 5.8e-4) * 0.22 * activation;
      ctx.fillStyle = 'rgba(' + AR + ',' + AG + ',' + AB + ',' + dotOp.toFixed(3) + ')';
      ctx.beginPath();
      ctx.arc(px, py, Math.max(0.4, dotR), 0, Math.PI * 2);
      ctx.fill();

      // Single orbit ring — fades in on activation
      if (activation > 0.08) {
        var ringOp = activation * 0.18;
        var ringR  = 7 + activation * 5;
        ctx.strokeStyle = 'rgba(' + AR + ',' + AG + ',' + AB + ',' + ringOp.toFixed(3) + ')';
        ctx.lineWidth   = 0.4;
        ctx.beginPath();
        ctx.arc(px, py, ringR, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Secondary node — emerges on stronger activation
      if (activation > 0.38) {
        var pole2 = POLES[1];
        var px2   = pole2.u * W;
        var py2   = pole2.v * H;
        var op2   = ((activation - 0.38) / 0.62) * 0.28;
        ctx.fillStyle = 'rgba(' + AR + ',' + AG + ',' + AB + ',' + op2.toFixed(3) + ')';
        ctx.beginPath();
        ctx.arc(px2, py2, 1.0, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    /* ── Main render loop ──────────────────────────────────── */
    function render(ts) {
      if (!last) last = ts;
      var dt = Math.min(ts - last, 50);
      last = ts;
      t   += dt;

      // Pulse phase advances proportional to activation (no hard threshold)
      if (activation > 0.25) {
        var rate = Math.min(1, (activation - 0.25) * 4);
        pulsePhase = (pulsePhase + dt * 1.55e-4 * rate) % 1;
      }

      // Smooth activation: measured in, slow release
      var spd = activation < targetActivation ? 0.026 : 0.016;
      activation += (targetActivation - activation) * spd;

      var W = canvas.width  / dpr;
      var H = canvas.height / dpr;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      // Atmosphere layer — constant soft blur, deepens on activation
      if (supportsFilter) {
        ctx.filter = 'blur(' + (0.6 + activation * 1.1).toFixed(1) + 'px)';
      }
      for (var i = 0; i < 3; i++) drawCurve(CURVES[i], W, H);

      // Mid, foreground, core — always sharp
      ctx.filter = 'none';
      for (var i = 3; i < CURVES.length; i++) drawCurve(CURVES[i], W, H);

      drawNode(W, H);

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

    diagram.addEventListener('mouseenter', function () { setLevel(0.62); });
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
  console.error('Could not locate section 5b or 6 — aborting');
  process.exit(1);
}

js = js.slice(0, s5b) + refined + '\n\n' + js.slice(sec6);
fs.writeFileSync(BASE + '/script.js', js, 'utf8');
console.log('JS: section 5b replaced with refined canvas system');

// Verify
const jsV = fs.readFileSync(BASE + '/script.js', 'utf8');
console.log('\nVerify:');
console.log('inward pull:       ', jsV.includes('act * 0.048'));
console.log('pulse wave:        ', jsV.includes('waveR'));
console.log('node orbit ring:   ', jsV.includes('orbit ring'));
console.log('always-on blur:    ', jsV.includes('0.6 + activation'));
console.log('accent curves:     ', jsV.includes('1.60, lay:1'));
console.log('core thickens:     ', jsV.includes('activation * 0.38'));
