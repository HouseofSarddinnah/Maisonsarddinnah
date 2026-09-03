/* scripts.js — Maison Sarddinnah core JS */

(function () {
  'use strict';

  /* ── Lazy-load images ──────────────────────── */
  if ('IntersectionObserver' in window) {
    const imgs = document.querySelectorAll('img[data-src]');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.src = e.target.dataset.src;
          io.unobserve(e.target);
        }
      });
    });
    imgs.forEach(img => io.observe(img));
  }

  /* ── Active nav link highlight ─────────────── */
  const links = document.querySelectorAll('.site-nav a');
  links.forEach(a => {
    if (a.href && window.location.href.indexOf(a.getAttribute('href')) !== -1) {
      a.classList.add('active');
    }
  });

  const destinationMenu = document.querySelector('.nav-dropdown-content');
  if (destinationMenu) {
    [
      ['Japan Family Travel', '/destinations/japan-family-travel.html'],
      ['Kyoto', '/destinations/kyoto.html'],
      ['Osaka', '/destinations/osaka.html'],
      ['Luxury Family Travel', '/destinations/luxury-family-travel.html']
    ].forEach(([label, href]) => {
      if (!destinationMenu.querySelector(`a[href="${href}"]`)) {
        const link = document.createElement('a');
        link.href = href;
        link.textContent = label;
        destinationMenu.appendChild(link);
      }
    });
  }

  /* ── Scroll-reveal (JS adds hidden class, so content visible without JS) ── */
  if ('IntersectionObserver' in window) {
    const reveals = document.querySelectorAll('.reveal');
    // Add pre-reveal via JS only — so CSS default is always visible
    reveals.forEach(el => el.classList.add('pre-reveal'));
    const revIO = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.remove('pre-reveal');
          e.target.classList.add('revealed');
          revIO.unobserve(e.target);
        }
      });
    }, { threshold: 0.05 });
    reveals.forEach(el => revIO.observe(el));
  }
})();
