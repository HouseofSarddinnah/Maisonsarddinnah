// ================================================
// Maison Sarddinnah - Modern UX & Performance Module
// ================================================

// Enhanced lazy loading with modern browser APIs
document.addEventListener('DOMContentLoaded', function() {
  // Supports native lazy loading
  const images = document.querySelectorAll('img[loading="lazy"], img:not([loading])');
  images.forEach((img, index) => {
    if (!isInViewport(img)) {
      img.setAttribute('loading', 'lazy');
    }
    // Add slight stagger to load animations
    img.style.animationDelay = `${index * 50}ms`;
  });

  // Advanced Intersection Observer for animations
  const observerOptions = {
    threshold: [0, 0.1, 0.25, 0.5],
    rootMargin: '50px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0.1) {
        entry.target.classList.add('revealed');
        if (entry.target.tagName === 'IMG' && entry.target.hasAttribute('data-src')) {
          entry.target.src = entry.target.getAttribute('data-src');
          entry.target.removeAttribute('data-src');
        }
        // Keep observing for scroll animations but don't unobserve
      }
    });
  }, observerOptions);

  // Observe images and elements
  document.querySelectorAll('img, .post-card, .category-card, .resource-card, .stat-item').forEach(el => {
    observer.observe(el);
  });
});

// Helper: Check if element is in viewport
function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return rect.bottom > 0 && rect.top < (window.innerHeight || document.documentElement.clientHeight);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Advanced reading time calculator
function calculateReadingTime(text) {
  const wordsPerMinute = 200;
  const wordCount = text.trim().split(/\s+/).length;
  const time = Math.ceil(wordCount / wordsPerMinute);
  return time === 1 ? '< 1 min read' : `${time} min read`;
}

document.querySelectorAll('.article-body, article').forEach(article => {
  const text = article.innerText;
  const readingTime = calculateReadingTime(text);
  const readingTimeEl = document.querySelector('.article-reading-time, .reading-time');
  if (readingTimeEl) {
    readingTimeEl.textContent = readingTime;
  }
});

// Smart newsletter sticky notification
let stickyDismissed = false;
function showStickyNewsletter() {
  const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
  const stickyNewsletter = document.querySelector('.sticky-newsletter');
  
  if (scrollPercentage > 40 && !stickyDismissed && stickyNewsletter && !localStorage.getItem('newsletter-dismissed-today')) {
    stickyNewsletter.classList.add('show');
  }
}

window.addEventListener('scroll', showStickyNewsletter, { passive: true });

// Sticky newsletter controls
document.querySelectorAll('.sticky-newsletter-close').forEach(btn => {
  btn.addEventListener('click', function() {
    this.closest('.sticky-newsletter').classList.remove('show');
    stickyDismissed = true;
    localStorage.setItem('newsletter-dismissed-today', 'true');
  });
});

// Add alt attributes for images (SEO)
document.querySelectorAll('img:not([alt])').forEach(img => {
  if (img.title) {
    img.alt = img.title;
  } else {
    const article = img.closest('article') || img.closest('.post-card') || img.closest('.article-body');
    if (article) {
      const title = article.querySelector('h1, h2, h3, .card-title');
      img.alt = title ? title.textContent : 'Maison Sarddinnah';
    } else {
      img.alt = 'Maison Sarddinnah - Featured Image';
    }
  }
});

// Modern page performance tracking
function trackPerformance() {
  if (window.performance && window.performance.timing) {
    window.addEventListener('load', function() {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      // Send to analytics if configured
      console.log(`⚡ Page Load: ${pageLoadTime}ms`);
      
      // Log Core Web Vitals if available
      if (window.web && window.web.vitals) {
        console.log('📊 Core Web Vitals available');
      }
    });
  }
}
trackPerformance();

// Social sharing functionality
document.querySelectorAll('.share-btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    const description = encodeURIComponent(document.querySelector('meta[name="description"]')?.content || '');
    const network = this.dataset.network || this.className.split(' ').find(c => ['twitter', 'facebook', 'linkedin', 'pinterest'].includes(c));
    
    let shareUrl = '';
    const shareOptions = 'width=600,height=400,noopener,noreferrer';
    
    switch(network) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
      case 'pinterest':
        shareUrl = `https://www.pinterest.com/pin/create/button/?url=${url}&description=${description}`;
        break;
    }
    
    if (shareUrl) window.open(shareUrl, '_blank', shareOptions);
  });
});

// Generate table of contents for long articles
function generateTableOfContents() {
  const article = document.querySelector('.article-body');
  if (!article) return;

  const headings = article.querySelectorAll('h2, h3');
  if (headings.length < 3) return;

  const toc = document.createElement('div');
  toc.className = 'toc';
  
  const title = document.createElement('div');
  title.className = 'toc-title';
  title.textContent = '📑 Table of Contents';
  
  const list = document.createElement('ul');

  headings.forEach((heading, index) => {
    if (!heading.id) heading.id = `heading-${index}`;

    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = `#${heading.id}`;
    a.textContent = heading.textContent;
    a.style.paddingLeft = heading.tagName === 'H3' ? '24px' : '0';
    li.appendChild(a);
    list.appendChild(li);
  });

  toc.appendChild(title);
  toc.appendChild(list);
  
  const firstHeading = article.querySelector('h2');
  if (firstHeading) firstHeading.parentNode.insertBefore(toc, firstHeading);
}

if (document.querySelector('.article-body')) generateTableOfContents();

// Mobile menu toggle with accessibility
const navLinks = document.querySelector('.nav-links');
const hamburger = document.querySelector('.hamburger-menu');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', function(e) {
    e.stopPropagation();
    navLinks.classList.toggle('mobile-open');
    this.setAttribute('aria-expanded', navLinks.classList.contains('mobile-open'));
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-inner')) {
      navLinks.classList.remove('mobile-open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
}

// Keyboard navigation improvements
document.addEventListener('keydown', (e) => {
  // Close mobile menu with Escape
  if (e.key === 'Escape' && navLinks?.classList.contains('mobile-open')) {
    navLinks.classList.remove('mobile-open');
  }
  
  // Jump to search with '/'
  if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
    e.preventDefault();
    document.querySelector('.nav-search input')?.focus();
  }
});

// Article progress indicator
function updateScrollProgress() {
  const article = document.querySelector('.article-body');
  if (!article) return;
  
  const scrollTop = window.scrollY;
  const docHeight = article.offsetHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  const progressBar = document.querySelector('.article-progress');
  
  if (progressBar) {
    progressBar.style.width = Math.min(scrollPercent, 100) + '%';
  }
}

window.addEventListener('scroll', updateScrollProgress, { passive: true });

// Print-friendly styling
window.addEventListener('beforeprint', () => {
  document.body.classList.add('printing');
});

window.addEventListener('afterprint', () => {
  document.body.classList.remove('printing');
});

// Modern brand logging
console.log('%c✨ Maison Sarddinnah', 'font-size: 18px; font-weight: bold; color: #ff6f91; font-family: "Playfair Display", serif;');
console.log('%cWhere elegance meets inspiration', 'font-size: 12px; color: #c9a96e; font-style: italic;');
console.log('📚 Learn more: https://maisonsarddinnah.com/about.html');
