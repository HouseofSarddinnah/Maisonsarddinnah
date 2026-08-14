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

## 🦶 Footer Template (copy exactly)

```html
<footer>
  <a href="../../../index.html" class="footer-logo">Maison Sarddinnah</a>
  <p class="footer-tagline">Where elegance meets inspiration</p>
  <nav class="footer-nav">
    <a href="../../../sections/travel.html">Travel</a>
    <a href="../../../sections/style.html">Style</a>
    <a href="../../../sections/beauty.html">Beauty</a>
    <a href="../../../sections/wellness.html">Wellness</a>
    <a href="../../../sections/living.html">Living</a>
    <a href="../../../sections/digital.html">Digital</a>
    <a href="../../../resources.html">Resources</a>
    <a href="../../../blog/index.html">All Articles</a>
    <a href="../../../about.html">About</a>
    <a href="../../../contact.html">Contact</a>
  </nav>
  <div class="footer-divider"></div>
  <div class="footer-legal">
    <a href="../../../affiliate-disclosure.html">Affiliate Disclosure</a> ·
    <a href="../../../privacy-policy.html">Privacy Policy</a> ·
    <a href="../../../terms-conditions.html">Terms & Conditions</a> ·
    <a href="../../../disclaimer.html">Disclaimer</a>
  </div>
  <small>© 2026 Maison Sarddinnah. All rights reserved.</small>
</footer>

<script src="../../../assets/js/scripts.js"></script>
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

## 🎯 GetYourGuide Contextual Widget Rule (required for all travel articles)

**GETYOURGUIDE CONTEXTUAL WIDGET RULE**

For every travel article generated by Maison Sarddinnah:

**1. Ensure the GetYourGuide loader exists once in the `<head>`:**

```html
<script async defer src="https://widget.getyourguide.com/dist/pa.umd.production.min.js" data-gyg-partner-id="QLR5FY5"></script>
```

**2. After the first major destination section (usually after the introduction and before the first hotel/destination subsection), insert:**

```html
<!-- GetYourGuide Contextual Widget -->
<div
  data-gyg-widget="auto"
  data-gyg-partner-id="QLR5FY5"
  style="margin:24px 0 32px;overflow:hidden;">
</div>
```

**Requirements:**

- Do NOT hardcode destination IDs
- Do NOT hardcode city IDs
- Allow GetYourGuide to analyze page content automatically
- Only one contextual widget per article
- Position the widget before the first major hotel recommendation or attraction section
- Keep widget outside affiliate disclosure blocks, newsletter blocks, and related reads sections

**Expected Behavior:**

- Kyoto articles show Kyoto experiences
- Osaka articles show Osaka experiences
- Dubai articles show Dubai experiences
- Bali articles show Bali experiences
- London articles show London experiences

No manual destination configuration required.

---

## 📊 3-Layer Affiliate Conversion Stack (Travel Posts Only)

For travel destination posts, implement a strategic 3-layer widget placement system to maximize conversion:

### Layer 1 — Discovery Stage (Early Intent Capture)
**Placement:** After your destination introduction section (e.g., "The [City] You Should Know")

**Purpose:** Convert inspiration → exploration when readers are emotionally engaged and imagining the destination

**Widget:** Attractions & Shows (category=1)

```html
<!-- WIDGET 1: Discovery Stage (Attractions & Shows) -->
<div class="tp-widget-block">
  <div class="tp-widget-inner">
    <div class="tp-widget-side">
      <span class="tp-widget-icon">🎡</span>
      <div class="tp-widget-text">
        <strong>Discover [City] Attractions</strong>
        <span>Top attractions and experiences for families</span>
      </div>
    </div>
  </div>
</div>
<script async src="https://tpwgts.com/content?currency=USD&trs=527567&shmarker=650414&locale=en&city_id=[CITY_ID]&category=1&amount=3&powered_by=true&campaign_id=137&promo_id=4497"></script>
```

### Layer 2 — Planning Stage (Mid-Article Action Layer)
**Placement:** After a premium hotel section (e.g., Ritz-Carlton, Conrad) where trust is highest

**Purpose:** Convert hotel interest → booking activities when readers are comparing hotels

**Widget:** Tours (category=2)

```html
<!-- WIDGET 2: Planning Stage (Tours) -->
<div class="tp-widget-block">
  <div class="tp-widget-inner">
    <div class="tp-widget-side">
      <span class="tp-widget-icon">🗺️</span>
      <div class="tp-widget-text">
        <strong>Book [City] Tours & Experiences</strong>
        <span>Guided tours and family-friendly activities</span>
      </div>
    </div>
  </div>
</div>
<script async src="https://tpwgts.com/content?currency=USD&trs=527567&shmarker=650414&locale=en&city_id=[CITY_ID]&category=2&amount=3&powered_by=true&campaign_id=137&promo_id=4497"></script>
```

### Layer 3 — Booking Stage (Final Conversion Push)
**Placement:** After the final hotel section (before Editor's Notes or FAQ)

**Purpose:** Final conversion push when readers are ready to book

**Widget:** Tours & Packages (category=3) with highlight styling

```html
<!-- WIDGET 3: Booking Stage (Tours & Packages) -->
<div class="tp-widget-block highlight">
  <div class="tp-widget-inner">
    <div class="tp-widget-side">
      <span class="tp-widget-icon">✈️</span>
      <div class="tp-widget-text">
        <strong>Complete Your [City] Experience</strong>
        <span>Finalize your [city] tours and activities</span>
      </div>
    </div>
  </div>
</div>
<script async src="https://tpwgts.com/content?currency=USD&trs=527567&shmarker=650414&locale=en&city_id=[CITY_ID]&category=3&amount=3&powered_by=true&campaign_id=137&promo_id=4497"></script>
```

**City IDs for common destinations:**
- Osaka: city_id=29
- Tokyo: city_id=30
- Kyoto: city_id=31
- Replace `[CITY_ID]` with the appropriate city code

**Conversion Funnel Logic:**
- Reader dreams of destination → sees tours early (Layer 1)
- Reader compares hotels → sees tours again (Layer 2)
- Reader ready to book → final conversion push (Layer 3)

**CSS for highlight widget:**
```css
.tp-widget-block.highlight { background: linear-gradient(135deg, #fcfbf7, #f5f1e6); border: 2px solid var(--gold); }
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
