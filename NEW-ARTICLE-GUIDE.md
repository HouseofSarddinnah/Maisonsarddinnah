# ✍️ HOW TO ADD A NEW BLOG POST — Maison Sarddinnah

Follow these steps every time you add a new HTML article in VS Code.

---

## 📁 Where to Save Your File

Place your blog HTML file in the correct category folder:

```
maison_upgrade/
└── blog/
    ├── travel/       → destination guides, travel tips, itineraries
    ├── beauty/       → skincare, makeup, haircare, routines
    ├── wellness/     → mental health, fitness, sleep, self-care
    ├── style/        → fashion, wardrobe, outfit ideas
    ├── living/       → home decor, cooking, hosting, slow living
    └── digital/      → AI, social media, SEO, side hustles
```

**File naming rule:** Use lowercase, hyphens only, no spaces.  
✅ `osaka-hidden-gems-guide.html`  
❌ `Osaka Hidden Gems.html`

---

## 📋 Blog Post Checklist

Before you deploy, confirm your HTML file has:

- [ ] `<title>Your Post Title — Maison Sarddinnah</title>`
- [ ] `<meta name="description" content="...">` (150–160 chars)
- [ ] `<link rel="stylesheet" href="../../assets/css/theme.css" />` in `<head>`
- [ ] Travelpayouts script (copy from template below)
- [ ] Nav bar with correct relative paths (`../../../` for blog/category/ depth)
- [ ] Article hero with category label, H1 title, intro paragraph
- [ ] Breadcrumb: Home > Category > Article Title
- [ ] Amazon affiliate links with `rel="nofollow noopener noreferrer"`
- [ ] Affiliate disclosure note at top of article
- [ ] Related reads section (3 links to other posts in same category)
- [ ] Newsletter signup banner
- [ ] Footer with correct relative paths (`../../../` — same as nav)

---

## 🔗 Correct Relative Path Depths

All blog posts at `blog/CATEGORY/filename.html` are **3 levels deep** from root.

```
blog/travel/my-post.html
→ Root is: ../../../
→ index.html = ../../../index.html
→ sections/travel.html = ../../../sections/travel.html
→ assets/css/theme.css = ../../assets/css/theme.css  ← only 2 levels! (blog/category → blog → assets)
→ Other blog post: ../travel/other-post.html  (same folder = ../travel/)
→ Cross-category: ../beauty/glow-cation.html
```

⚠️ **Common mistake:** The footer uses `../../` but should use `../../../` — always copy from the nav.

---

## 🖼️ Adding Inline Images

To add a related image between paragraphs, use this HTML:

```html
<div class="inline-img">
  <img src="https://images.unsplash.com/photo-XXXXXXXX?w=800&q=80" 
       alt="Description of image" loading="lazy" />
  <p class="img-caption">Optional caption here</p>
</div>
```

**Free image sources:**
- Unsplash: https://unsplash.com (copy the photo URL + add `?w=800&q=80`)
- Pexels: https://pexels.com

Place images every 2–3 sections (after `<h3>` headings), not between every paragraph.

---

## 🏨 Travelpayouts Widget Block

Add this block wherever you'd recommend booking (hotels, flights, etc.):

```html
<div class="tp-widget-block">
  <div class="tp-widget-inner">
    <div class="tp-widget-icon">🏨</div>
    <div class="tp-widget-text">
      <strong>Find the Best Hotels</strong>
      <span>Search and compare hotel prices for your trip</span>
    </div>
    <a href="https://tp.media/r?marker=531999&trs=277895&p=4&u=https%3A%2F%2Fwww.booking.com%2F" 
       target="_blank" rel="nofollow sponsored noopener" class="tp-widget-btn">
       Check Prices →
    </a>
  </div>
</div>
```

**Change the icon:** Replace `🏨` with any emoji  
**Change the link:** Swap the Booking.com URL for your Travelpayouts affiliate link  

For flights, use:
```
https://tp.media/r?marker=531999&trs=277895&p=4114&u=https%3A%2F%2Fwww.aviasales.com%2F
```

---

## 🛒 Amazon Affiliate Links

Your Amazon store ID: `pirisaddy-20`

Always include `rel="nofollow noopener noreferrer"` and add inside `.affiliate-picks`:

```html
<div class="affiliate-picks">
  <h3>Pack Smart for This Trip</h3>
  <a href="https://www.amazon.com/dp/ASIN?tag=pirisaddy-20" 
     target="_blank" rel="nofollow noopener noreferrer" class="affiliate-link">
    → Product Name — Shop on Amazon
  </a>
  <p class="affiliate-note"><em>This post contains Amazon affiliate links. If you purchase through our links we may earn a small commission at no extra cost to you.</em></p>
</div>
```

---

## 📌 Related Reads Template

```html
<div class="related-reads-section">
  <h3 class="related-reads-heading">Related Reads</h3>
  <div class="related-reads-grid">
    <a href="../travel/slow-travel.html" class="related-card">
      <div class="related-card-label">Travel</div>
      <div class="related-card-title">The Art of Slow Travel</div>
      <span class="related-card-link">Read Article →</span>
    </a>
    <!-- Add 2 more related-card blocks -->
  </div>
</div>
```

---

## 📧 Newsletter Banner (copy exactly)

```html
<div class="article-newsletter">
  <h4>Enjoyed This? Get More Every Thursday.</h4>
  <p>Join The Maison Edit — our weekly newsletter with travel finds, beauty picks, and reads worth your time.</p>
  <form class="nl-form-inline newsletter-form" onsubmit="return false;">
    <input type="email" placeholder="Your email address" required />
    <button type="submit">Subscribe Free</button>
  </form>
</div>
```

---

## 🚀 Travelpayouts Script (copy into `<head>` of every page)

```html
<script nowprocket data-noptimize="1" data-cfasync="false" data-wpfc-render="false" seraph-accel-crit="1" data-no-defer="1">
  (function () {
      var script = document.createElement("script");
      script.async = 1;
      script.src = 'https://tpembars.com/NTMxOTk5.js?t=531999';
      document.head.appendChild(script);
  })();
</script>
```

---

## 🗂️ After Adding Your Post

1. **Add a card** to `blog/index.html` — copy an existing `.post-card` block and update the href, title, excerpt.
2. **Add a card** to the relevant `sections/CATEGORY.html` — same process.
3. **Add a redirect** to `_redirects` (optional short URL):
   ```
   /blog/your-post-slug    /blog/travel/your-post-slug.html    301
   ```
4. **Test locally** in VS Code Live Server before deploying to Cloudflare.

---

## 😊 Changing Emojis on the Resources Page

Open `resources.html` and find the icon div for the resource you want to change:

```html
<div class="icon" data-emoji="✈️">✈️</div>
```

Change **both** the `data-emoji` value AND the text content to your new emoji:

```html
<div class="icon" data-emoji="🛫">🛫</div>
```

---

*Last updated: May 2026 — Maison Sarddinnah*
