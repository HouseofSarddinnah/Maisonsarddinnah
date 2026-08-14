// Build Script - Auto-generate static SEO HTML from posts.json
// This eliminates manual maintenance and ensures perfect consistency
// CORRECTED VERSION: Template separation, deterministic sorting, strict SEO/UX separation

const fs = require('fs');
const path = require('path');

// Read posts.json
const postsPath = path.join(__dirname, 'data', 'posts.json');
const postsData = JSON.parse(fs.readFileSync(postsPath, 'utf8'));
let posts = postsData.posts;

// ISSUE 3 FIX: Add deterministic sorting for stable SEO structure
posts.sort((a, b) => new Date(b.date) - new Date(a.date));

// Helper function to generate static article card HTML
function generateStaticCard(post) {
  return `
  <article class="blog-card">
    <a href="${post.url}">
      <img src="${post.image}" alt="${post.title}">
      <h3>${post.title}</h3>
    </a>
  </article>`;
}

// Helper function to generate static featured card HTML
function generateStaticFeaturedCard(post, badge = 'Featured') {
  return `
    <a href="${post.url}" class="featured-card">
      <div class="featured-img">
        <img src="${post.image}" alt="${post.title}" loading="lazy" />
        <div class="featured-badge">${badge}</div>
      </div>
      <div class="featured-content">
        <div class="featured-cat">${post.subcategory} · ${post.category}</div>
        <h3>${post.title}</h3>
        <p>${post.excerpt}</p>
      </div>
    </a>`;
}

// ISSUE 2 FIX: Strict SEO/UX layer separation
// SEO LAYER (build-time only): static grid, featured block, noscript fallback
const featuredPosts = posts.filter(p => p.featured === true).slice(0, 8);
const staticGridHTML = featuredPosts.map(post => generateStaticCard(post)).join('\n');

// Generate noscript fallback (6 flagship posts for emergency SEO)
const noscriptPosts = featuredPosts.slice(0, 6);
const noscriptHTML = noscriptPosts.map(post => generateStaticCard(post)).join('\n');

// Generate featured section (3 featured posts)
const featuredSectionPosts = featuredPosts.slice(0, 3);
const featuredSectionHTML = featuredSectionPosts.map((post, index) => {
  const badges = ['Featured', 'Featured', 'Itinerary'];
  return generateStaticFeaturedCard(post, badges[index] || 'Featured');
}).join('\n');

// ISSUE 1 FIX: Read from template file, not directly modify output
const templatePath = path.join(__dirname, 'sections', 'travel.template.html');
let templateHtml = fs.readFileSync(templatePath, 'utf8');

// Replace placeholder markers with generated content
templateHtml = templateHtml.replace(
  /<!-- BUILD:INSERT_NOSCRIPT_FALLBACK -->/,
  `<!-- SEO FALLBACK CONTENT (STATIC - INDEXABLE BY GOOGLE) -->
<noscript>
<section class="blog-grid">
${noscriptHTML}
</section>
</noscript>`
);

templateHtml = templateHtml.replace(
  /<!-- BUILD:INSERT_STATIC_GRID -->/,
  `<!-- SEO STATIC BASE (VISIBLE, INDEXABLE) -->
<section id="seo-static-grid" class="blog-grid">
${staticGridHTML}
</section>`
);

templateHtml = templateHtml.replace(
  /<!-- BUILD:INSERT_FEATURED_SECTION -->/,
  featuredSectionHTML
);

// Write to travel.html (generated output - NEVER edit manually)
const outputPath = path.join(__dirname, 'sections', 'travel.html');
fs.writeFileSync(outputPath, templateHtml, 'utf8');

console.log('✅ Build completed successfully!');
console.log(`📝 Generated static SEO grid with ${featuredPosts.length} articles`);
console.log(`📝 Generated noscript fallback with ${noscriptPosts.length} articles`);
console.log(`📝 Generated featured section with ${featuredSectionPosts.length} articles`);
console.log('📝 Generated sections/travel.html from template');
console.log('✨ Template separation: travel.template.html → travel.html');
console.log('✨ Deterministic sorting: Stable SEO structure guaranteed');
console.log('✨ SEO/UX separation: Strict layer separation implemented');
console.log('⚠️  NEVER edit travel.html manually - only edit travel.template.html');
