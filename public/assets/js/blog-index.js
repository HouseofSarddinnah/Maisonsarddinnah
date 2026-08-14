// Blog Index System - Central Data Source
// All blog posts are loaded from /data/posts.json

class BlogIndex {
  constructor() {
    this.posts = [];
    this.loaded = false;
  }

  async loadPosts() {
    if (this.loaded) return this.posts;
    
    try {
      const response = await fetch('/data/posts.json');
      const data = await response.json();
      this.posts = data.posts;
      this.loaded = true;
      return this.posts;
    } catch (error) {
      console.error('Error loading blog posts:', error);
      return [];
    }
  }

  // Get all posts
  getAllPosts() {
    return this.posts;
  }

  // Get posts by category
  getPostsByCategory(category) {
    return this.posts.filter(post => post.category === category);
  }

  // Get posts by subcategory
  getPostsBySubcategory(subcategory) {
    return this.posts.filter(post => post.subcategory === subcategory);
  }

  // Get featured posts
  getFeaturedPosts() {
    return this.posts.filter(post => post.featured === true);
  }

  // Get post by ID
  getPostById(id) {
    return this.posts.find(post => post.id === id);
  }

  // Get posts by multiple categories
  getPostsByCategories(categories) {
    return this.posts.filter(post => categories.includes(post.category));
  }

  // Get recent posts (limit by count)
  getRecentPosts(count = 10) {
    return [...this.posts]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, count);
  }

  // Search posts by title or excerpt
  searchPosts(query) {
    const lowerQuery = query.toLowerCase();
    return this.posts.filter(post => 
      post.title.toLowerCase().includes(lowerQuery) ||
      post.excerpt.toLowerCase().includes(lowerQuery)
    );
  }

  // Get posts excluding certain IDs
  getPostsExcluding(excludedIds) {
    return this.posts.filter(post => !excludedIds.includes(post.id));
  }

  // Get random posts (for related articles)
  getRandomPosts(count = 3, excludedIds = []) {
    const availablePosts = this.getPostsExcluding(excludedIds);
    const shuffled = [...availablePosts].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
}

// Global instance
const blogIndex = new BlogIndex();

// Helper function to render post card
function renderPostCard(post, options = {}) {
  const {
    showCategory = true,
    showExcerpt = true,
    cardClass = 'post-card',
    imageClass = 'card-img',
    contentClass = 'card-content',
    categoryClass = 'card-cat',
    titleClass = 'card-title',
    excerptClass = 'card-excerpt',
    readMoreClass = 'card-read'
  } = options;

  const categoryLabel = showCategory 
    ? `<div class="${categoryClass}" style="color:#c9a96e;">${post.category.charAt(0).toUpperCase() + post.category.slice(1)} · ${post.subcategory}</div>`
    : '';

  const excerpt = showExcerpt 
    ? `<p class="${excerptClass}">${post.excerpt}</p>`
    : '';

  return `
    <a href="${post.url}" class="${cardClass} reveal">
      <div class="${imageClass}">
        <img src="${post.image}" alt="${post.title}" loading="lazy" />
      </div>
      <div class="${contentClass}">
        ${categoryLabel}
        <h3 class="${titleClass}">${post.title}</h3>
        ${excerpt}
        <span class="${readMoreClass}">Read Article</span>
      </div>
    </a>
  `;
}

// Helper function to render featured post card
function renderFeaturedCard(post, badge = 'Featured') {
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
    </a>
  `;
}

// Helper function to render guide card (for destination hubs)
function renderGuideCard(post) {
  return `
    <a href="${post.url}" class="guide-card">
      <div class="guide-card-img">
        <img src="${post.image}" alt="${post.title}" loading="lazy" />
      </div>
      <div class="guide-card-content">
        <span class="guide-card-tag">${post.subcategory}</span>
        <h4>${post.title}</h4>
        <p>${post.excerpt}</p>
        <span class="guide-card-link">Read Guide →</span>
      </div>
    </a>
  `;
}

// Initialize and make available globally
window.blogIndex = blogIndex;
window.renderPostCard = renderPostCard;
window.renderFeaturedCard = renderFeaturedCard;
window.renderGuideCard = renderGuideCard;
