/* _hero_scroll_patch.js — node _hero_scroll_patch.js
   Replaces section 7 (parallax) with the hero scroll choreography. */
'use strict';
const fs = require('fs');
const BASE = __dirname;

const newSection7 = `  /* ----------------------------------------------------------
     7. Hero scroll choreography
     Left content  : scroll-linked exit — translateX right + fade
     Right media   : very subtle scale deepens over scroll
     Float sections: gentle center-relative offset
  ---------------------------------------------------------- */

  var prefersReducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion) {
    var heroContent = document.querySelector('.entry__content');
    var heroMediaBg = document.querySelector('.entry__media-bg');
    var heroSection = document.querySelector('.entry');
    var floatEls    = document.querySelectorAll('[data-parallax="float"]');
    var rafPending  = false;

    function runScroll() {
      var sy    = window.scrollY;
      var vh    = window.innerHeight;
      var heroH = heroSection ? heroSection.offsetHeight : vh * 2;

      // ── Left text: exit right + fade ───────────────────────
      // Exit window: 30%–82% of viewport height scrolled
      if (heroContent && window.innerWidth > 640) {
        var eStart = vh * 0.30;
        var eEnd   = vh * 0.82;
        var prog   = Math.max(0, Math.min(1, (sy - eStart) / (eEnd - eStart)));

        // Ease-in-out: slow start, smooth midpoint, decelerates at end
        var eased = prog < 0.5
          ? 2 * prog * prog
          : 1 - Math.pow(-2 * prog + 2, 2) / 2;

        heroContent.style.transform = 'translateX(' + (eased * 9).toFixed(2) + '%)';
        heroContent.style.opacity   = Math.max(0.08, 1 - eased * 0.92).toFixed(3);
      }

      // ── Right media: subtle scale for depth ────────────────
      // Scale 1.000 → 1.022 over the full hero scroll range
      if (heroMediaBg) {
        var heroProgress = Math.max(0, Math.min(1, sy / Math.max(1, heroH - vh)));
        var scale = 1 + heroProgress * 0.022;
        heroMediaBg.style.transform = 'scale(' + scale.toFixed(4) + ')';
      }

      // ── Below-hero float sections ───────────────────────────
      for (var i = 0; i < floatEls.length; i++) {
        var el   = floatEls[i];
        var rect = el.getBoundingClientRect();
        var mid  = rect.top + rect.height / 2 - vh / 2;
        el.style.transform = 'translateY(' + (mid * 0.055).toFixed(1) + 'px)';
      }

      rafPending = false;
    }

    function scheduleScroll() {
      if (!rafPending) {
        rafPending = true;
        requestAnimationFrame(runScroll);
      }
    }

    window.addEventListener('scroll', scheduleScroll, { passive: true });
    window.addEventListener('resize', scheduleScroll, { passive: true });
    runScroll();
  }

`;

let js = fs.readFileSync(BASE + '/script.js', 'utf8');

const sec7 = js.indexOf('  /* ----------------------------------------------------------\n     7. Parallax');
const sec8 = js.indexOf('  /* ----------------------------------------------------------\n     8. Scroll-reveal');

if (sec7 === -1 || sec8 === -1) {
  console.error('Could not locate section 7 or 8');
  console.error('sec7 index:', sec7);
  console.error('sec8 index:', sec8);
  process.exit(1);
}

js = js.slice(0, sec7) + newSection7 + '\n\n' + js.slice(sec8);
fs.writeFileSync(BASE + '/script.js', js, 'utf8');
console.log('JS: section 7 replaced with hero scroll choreography');

const jsV = fs.readFileSync(BASE + '/script.js', 'utf8');
console.log('\nVerify:');
console.log('runScroll fn:        ', jsV.includes('function runScroll'));
console.log('translateX exit:     ', jsV.includes('translateX('));
console.log('scale depth:         ', jsV.includes('heroProgress * 0.022'));
console.log('float sections:      ', jsV.includes('floatEls'));
console.log('no PARALLAX_DEBUG:   ', !jsV.includes('PARALLAX_DEBUG'));
console.log('mobile guard:        ', jsV.includes('innerWidth > 640'));
