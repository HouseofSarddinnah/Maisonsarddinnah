/* posts.js — Maison Sarddinnah blog post functionality */

(function () {
  'use strict';

  /* ── Reading time calculation ──────────────────────── */
  function calculateReadingTime() {
    const article = document.querySelector('.article-wrap');
    if (!article) return;

    const text = article.innerText || article.textContent;
    const words = text.trim().split(/\s+/).length;
    const wordsPerMinute = 200;
    const minutes = Math.ceil(words / wordsPerMinute);

    const readingTimeEl = document.querySelector('.reading-time');
    if (readingTimeEl) {
      readingTimeEl.textContent = `${minutes} min read`;
    }
  }

  /* ── Table of contents generation ─────────────────── */
  function generateTableOfContents() {
    const article = document.querySelector('.article-wrap');
    const tocContainer = document.querySelector('.toc-container');
    
    if (!article || !tocContainer) return;

    const headings = article.querySelectorAll('h2, h3');
    if (headings.length < 3) return;

    const tocList = document.createElement('ul');
    tocList.className = 'toc-list';

    headings.forEach((heading, index) => {
      if (!heading.id) {
        heading.id = `heading-${index}`;
      }

      const listItem = document.createElement('li');
      const link = document.createElement('a');
      link.href = `#${heading.id}`;
      link.textContent = heading.textContent;
      link.className = heading.tagName === 'H3' ? 'toc-subitem' : 'toc-item';
      
      listItem.appendChild(link);
      tocList.appendChild(listItem);
    });

    tocContainer.appendChild(tocList);
  }

  /* ── Smooth scroll for anchor links ────────────────── */
  function smoothScrollAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  /* ── Share functionality ───────────────────────────── */
  function initShareButtons() {
    const shareButtons = document.querySelectorAll('.share-button');
    
    shareButtons.forEach(button => {
      button.addEventListener('click', function () {
        const platform = this.dataset.platform;
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(document.title);
        
        let shareUrl;
        
        switch (platform) {
          case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?text=${title}&url=${url}`;
            break;
          case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            break;
          case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
            break;
          case 'pinterest':
            shareUrl = `https://pinterest.com/pin/create/button/?url=${url}&description=${title}`;
            break;
          default:
            return;
        }
        
        window.open(shareUrl, '_blank', 'width=600,height=400');
      });
    });
  }

  /* ── Copy link to clipboard ───────────────────────── */
  function initCopyLink() {
    const copyButton = document.querySelector('.copy-link-button');
    
    if (!copyButton) return;
    
    copyButton.addEventListener('click', async function () {
      try {
        await navigator.clipboard.writeText(window.location.href);
        const originalText = this.textContent;
        this.textContent = 'Copied!';
        setTimeout(() => {
          this.textContent = originalText;
        }, 2000);
      } catch (err) {
        console.error('Failed to copy link:', err);
      }
    });
  }

  /* ── Image lazy loading with fade-in ───────────────── */
  function initLazyImages() {
    if ('IntersectionObserver' in window) {
      const lazyImages = document.querySelectorAll('img[loading="lazy"]');
      
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.classList.add('loaded');
            imageObserver.unobserve(img);
          }
        });
      }, {
        rootMargin: '50px 0px',
        threshold: 0.01
      });
      
      lazyImages.forEach(img => imageObserver.observe(img));
    }
  }

  /* ── Progress bar for article reading ───────────────── */
  function initReadingProgress() {
    const progressBar = document.querySelector('.reading-progress-bar');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      progressBar.style.width = `${progress}%`;
    });
  }

  /* ── Initialize all post functionality ───────────────── */
  function init() {
    calculateReadingTime();
    generateTableOfContents();
    smoothScrollAnchors();
    initShareButtons();
    initCopyLink();
    initLazyImages();
    initReadingProgress();
  }

  /* ── Run on DOM ready ───────────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
