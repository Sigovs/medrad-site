
<script>
/* ============================================================
   Hero Particle Field — lightweight canvas 2D
   ============================================================ */
(function () {
  'use strict';

  var canvas = document.getElementById('heroParticles');
  if (!canvas) return;

  var ctx = canvas.getContext('2d');
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var w, h, particles, mouse, raf;
  var CONNECT_DIST = 140;
  var PARTICLE_COUNT = 104;
  var SPEED = 0.3;

  if (window.innerWidth < 768) {
    PARTICLE_COUNT = 52;
    CONNECT_DIST = 100;
  }

  mouse = { x: -9999, y: -9999 };

  function resize() {
    var rect = canvas.parentElement.getBoundingClientRect();
    w = rect.width;
    h = rect.height;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function Particle() {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.vx = (Math.random() - 0.5) * SPEED;
    this.vy = (Math.random() - 0.5) * SPEED;
    this.r = Math.random() * 1.5 + 0.5;
    this.alpha = Math.random() * 0.5 + 0.25;
  }

  function init() {
    resize();
    particles = [];
    for (var i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle());
    }
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);

    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < -10) p.x = w + 10;
      if (p.x > w + 10) p.x = -10;
      if (p.y < -10) p.y = h + 10;
      if (p.y > h + 10) p.y = -10;

      var dx = p.x - mouse.x;
      var dy = p.y - mouse.y;
      var dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 180) {
        var force = (180 - dist) / 180 * 0.015;
        p.vx += dx * force;
        p.vy += dy * force;
      }
      p.vx *= 0.998;
      p.vy *= 0.998;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(210, 190, 170, ' + p.alpha + ')';
      ctx.fill();
    }

    ctx.lineWidth = 0.5;
    for (var i = 0; i < particles.length; i++) {
      for (var j = i + 1; j < particles.length; j++) {
        var a = particles[i];
        var b = particles[j];
        var dx = a.x - b.x;
        var dy = a.y - b.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECT_DIST) {
          var opacity = (1 - dist / CONNECT_DIST) * 0.2;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = 'rgba(180, 160, 140, ' + opacity + ')';
          ctx.stroke();
        }
      }
    }

    raf = requestAnimationFrame(draw);
  }

  if (window.innerWidth > 768) {
    canvas.parentElement.addEventListener('mousemove', function (e) {
      var rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });

    canvas.parentElement.addEventListener('mouseleave', function () {
      mouse.x = -9999;
      mouse.y = -9999;
    });
  }

  var observer = new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting) {
      if (!raf) draw();
    } else {
      if (raf) { cancelAnimationFrame(raf); raf = null; }
    }
  }, { threshold: 0.1 });

  window.addEventListener('resize', function () { resize(); });

  init();
  observer.observe(canvas.parentElement);
})();


/* ============================================================
   Parallax — visual-break + cases-bg backgrounds
   ============================================================ */
(function () {
  'use strict';

  var prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduce) return;

  var bgs = document.querySelectorAll('.visual-break__bg, .cases-bg__bg');
  if (!bgs.length) return;

  var SPEED      = 0.55;  // 0 = static, 1 = scrolls 1:1 with the page
  var BASE_SCALE = 1.2;   // baseline zoom — image is always 1.2x minimum
  var ZOOM_RANGE = 0.15;  // additional +-15% on top of the baseline
  var ticking = false;

  function update() {
    var vh = window.innerHeight;
    bgs.forEach(function (bg) {
      var section = bg.parentElement;
      var rect = section.getBoundingClientRect();
      if (rect.bottom < -100 || rect.top > vh + 100) return;
      var center = rect.top + rect.height / 2 - vh / 2;
      var translate = -center * SPEED;
      var noZoom = bg.classList.contains('visual-break__bg');
      var scale  = BASE_SCALE;
      if (!noZoom) {
        var maxCenter = (vh + rect.height) / 2;
        var progress  = Math.max(-1, Math.min(1, center / maxCenter));
        scale = BASE_SCALE + progress * ZOOM_RANGE;
      }
      bg.style.transform =
        'translate3d(0, ' + translate.toFixed(1) + 'px, 0) scale(' + scale.toFixed(3) + ')';
    });
    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();
})();


/* ============================================================
   Specialists carousel — prev/next + dot navigation
   ============================================================ */
(function () {
  'use strict';

  var track  = document.getElementById('drTrack');
  var prev   = document.getElementById('drPrev');
  var next   = document.getElementById('drNext');
  var dotsEl = document.getElementById('drDots');
  if (!track || !prev || !next || !dotsEl) return;

  var slides = track.children;
  var dots   = dotsEl.querySelectorAll('.dr-carousel__dot');
  var count  = slides.length;
  var i      = 0;

  function go(n) {
    i = (n + count) % count;
    track.style.transform = 'translateX(-' + (i * 100) + '%)';
    for (var k = 0; k < dots.length; k++) {
      dots[k].classList.toggle('is-active', k === i);
      slides[k].classList.toggle('is-active', k === i);
    }
  }

  prev.addEventListener('click', function () { go(i - 1); });
  next.addEventListener('click', function () { go(i + 1); });

  for (var k = 0; k < dots.length; k++) {
    dots[k].addEventListener('click', function (e) {
      go(parseInt(e.currentTarget.getAttribute('data-i'), 10));
    });
  }

  document.getElementById('drCarousel').addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft')  { e.preventDefault(); go(i - 1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); go(i + 1); }
  });
})();


/* ============================================================
   Reviews pager — paginated horizontal scroll with dots
   ============================================================ */
(function () {
  'use strict';

  var viewport = document.getElementById('reviewsViewport');
  var prev     = document.getElementById('reviewsPrev');
  var next     = document.getElementById('reviewsNext');
  var dotsEl   = document.getElementById('reviewsDots');
  if (!viewport || !prev || !next || !dotsEl) return;

  var cards = viewport.children;
  if (!cards.length) return;

  function pageWidth() {
    return viewport.clientWidth;
  }

  function pageCount() {
    return Math.max(1, Math.ceil(viewport.scrollWidth / pageWidth()));
  }

  function currentPage() {
    return Math.round(viewport.scrollLeft / pageWidth());
  }

  function buildDots() {
    dotsEl.innerHTML = '';
    var n = pageCount();
    for (var k = 0; k < n; k++) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'reviews-pager__dot';
      b.setAttribute('aria-label', 'Go to review page ' + (k + 1));
      b.setAttribute('data-i', k);
      if (k === 0) b.classList.add('is-active');
      b.addEventListener('click', function (e) {
        var i = parseInt(e.currentTarget.getAttribute('data-i'), 10);
        viewport.scrollTo({ left: i * pageWidth(), behavior: 'smooth' });
      });
      dotsEl.appendChild(b);
    }
  }

  function syncDots() {
    var i = currentPage();
    var dots = dotsEl.querySelectorAll('.reviews-pager__dot');
    for (var k = 0; k < dots.length; k++) {
      dots[k].classList.toggle('is-active', k === i);
    }
  }

  function syncArrows() {
    var i = currentPage();
    var n = pageCount();
    prev.disabled = (i <= 0);
    next.disabled = (i >= n - 1);
  }

  function sync() { syncDots(); syncArrows(); }

  prev.addEventListener('click', function () {
    viewport.scrollBy({ left: -pageWidth(), behavior: 'smooth' });
  });
  next.addEventListener('click', function () {
    viewport.scrollBy({ left:  pageWidth(), behavior: 'smooth' });
  });

  var scrollTimer;
  viewport.addEventListener('scroll', function () {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(sync, 80);
  }, { passive: true });

  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      buildDots();
      sync();
    }, 150);
  });

  buildDots();
  sync();
})();
</script>
