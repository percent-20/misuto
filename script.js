// Misuto — Enterprise Landing Page
(function () {
  'use strict';

  // ========================================
  // Bubbles Background (light theme)
  // ========================================
  var bubblesContainer = document.getElementById('bubbles');

  if (bubblesContainer) {
    var colors = [
      'rgba(124, 58, 237, ',   // purple
      'rgba(139, 92, 246, ',   // purple-light
      'rgba(167, 139, 250, ',  // lavender
      'rgba(196, 181, 253, ',  // soft lavender
      'rgba(221, 214, 254, ',  // very light lavender
    ];
    var bubbleCount = 20;

    function spawnBubble(immediate) {
      var bubble = document.createElement('div');
      bubble.className = 'bubble';

      var size = Math.random() * 40 + 8;
      var x = Math.random() * 100;
      var duration = Math.random() * 10 + 6;
      var opacity = Math.random() * 0.08 + 0.03;
      var color = colors[Math.floor(Math.random() * colors.length)];

      bubble.style.width = size + 'px';
      bubble.style.height = size + 'px';
      bubble.style.left = x + '%';
      bubble.style.background = color + (opacity * 4) + ')';
      bubble.style.boxShadow = '0 0 ' + (size * 2) + 'px ' + color + (opacity * 2) + ')';
      bubble.style.setProperty('--bubble-opacity', opacity);
      bubble.style.animationDuration = duration + 's';

      if (immediate) {
        bubble.style.animationDelay = -(Math.random() * duration) + 's';
      }

      bubblesContainer.appendChild(bubble);

      bubble.addEventListener('animationend', function () {
        bubble.remove();
        if (document.visibilityState !== 'hidden') {
          spawnBubble(false);
        }
      });
    }

    for (var i = 0; i < bubbleCount; i++) { spawnBubble(true); }
  }

  // ========================================
  // Scroll Reveal
  // ========================================
  var reveals = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });

    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('visible'); });
  }

  // ========================================
  // Nav
  // ========================================
  var nav = document.getElementById('nav');
  var toggle = document.getElementById('nav-toggle');
  var links = document.getElementById('nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
      });
    });
  }

  if (nav) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 30);
    }, { passive: true });
  }

  // ========================================
  // Demo Request Form
  // ========================================
  var form = document.getElementById('demo-form');
  var note = document.getElementById('demo-note');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      if (btn) { btn.textContent = 'Sending...'; btn.disabled = true; }

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      })
        .then(function (res) {
          if (res.ok) {
            form.style.display = 'none';
            note.textContent = "Thank you. We'll be in touch within 24 hours.";
            note.className = 'demo-note demo-success';
          } else {
            note.textContent = 'Something went wrong. Please try again.';
            if (btn) { btn.textContent = 'Request a Demo'; btn.disabled = false; }
          }
        })
        .catch(function () {
          note.textContent = 'Network error. Please try again.';
          if (btn) { btn.textContent = 'Request a Demo'; btn.disabled = false; }
        });
    });
  }
})();
