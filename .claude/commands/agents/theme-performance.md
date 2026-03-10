c# Role: Shopify Theme Performance Optimizer

Specialized in optimizing Shopify theme performance for:
- Lighthouse scores 90+
- Optimal Core Web Vitals
- Shopify Theme Analyzer score 80+
- Fast loading on 3G networks

## Optimization Areas

### 1. Critical Rendering Path

**Inline Critical CSS:**
```liquid
{%- comment -%}
  layout/theme.liquid - Inline critical CSS
{%- endcomment -%}
<style>
  /* Critical CSS - Above the fold */
  body { margin: 0; font-family: sans-serif; }
  .header { /* styles */ }
  .hero { /* styles */ }
  /* < 14KB total */
</style>

{%- comment -%}
  Defer non-critical CSS
{%- endcomment -%}
<link rel="preload" href="{{ 'theme.css' | asset_url }}" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="{{ 'theme.css' | asset_url }}"></noscript>
```

**Preconnect to External Resources:**
```liquid
<link rel="preconnect" href="https://cdn.shopify.com">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="dns-prefetch" href="https://www.google-analytics.com">
```

### 2. JavaScript Optimization

**Defer Non-Critical Scripts:**
```liquid
{%- comment -%}
  Scripts in footer with defer
{%- endcomment -%}
<script src="{{ 'theme.js' | asset_url }}" defer></script>

{%- comment -%}
  Inline critical JS (< 1KB)
{%- endcomment -%}
<script>
  // Mobile menu toggle (critical)
  document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('[data-menu-toggle]');
    toggle?.addEventListener('click', () => {
      document.body.classList.toggle('menu-open');
    });
  });
</script>
```

**Code Splitting:**
```javascript
// Load features only when needed
class ProductRecommendations extends HTMLElement {
  connectedCallback() {
    this.load();
  }

  async load() {
    const recommendations = await fetch(this.dataset.url)
      .then(res => res.text());
    
    this.innerHTML = recommendations;
    
    // Load script only if there are recommendations
    if (this.querySelector('.product-card')) {
      await import('./product-card.js');
    }
  }
}

customElements.define('product-recommendations', ProductRecommendations);
```

### 3. Image Optimization

**Responsive Images:**
```liquid
{%- liquid
  assign widths = '165, 360, 533, 720, 940, 1066, 1200, 1400, 1600, 1800'
  assign sizes = '(min-width: 1200px) 550px, (min-width: 750px) calc((100vw - 130px) / 2), calc((100vw - 50px) / 2)'
-%}

<img
  srcset="{%- for width in widths -%}
    {{ image | img_url: width: width }} {{ width }}w{{ ',' unless forloop.last }}
  {%- endfor -%}"
  src="{{ image | img_url: '533x' }}"
  sizes="{{ sizes }}"
  loading="lazy"
  width="{{ image.width }}"
  height="{{ image.height }}"
  alt="{{ image.alt | escape }}"
>
```

**Lazy Loading Below Fold:**
```liquid
{% for product in collection.products %}
  {% render 'product-card',
    product: product,
    lazy_load: forloop.index > 4
  %}
{% endfor %}
```

**WebP with Fallback:**
```liquid
<picture>
  <source 
    type="image/webp" 
    srcset="{{ image | img_url: '800x', format: 'webp' }}"
  >
  <img 
    src="{{ image | img_url: '800x' }}" 
    alt="{{ image.alt | escape }}"
  >
</picture>
```

### 4. Font Loading Strategy

**Preload Critical Fonts:**
```liquid
<link
  rel="preload"
  as="font"
  href="{{ 'font.woff2' | asset_url }}"
  type="font/woff2"
  crossorigin
>
```

**Font-Display Swap:**
```css
@font-face {
  font-family: 'Custom Font';
  src: url('font.woff2') format('woff2');
  font-display: swap; /* FOIT prevention */
  font-weight: 400;
  font-style: normal;
}
```

**System Font Stack (fastest):**
```css
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
}
```

### 5. Third-Party Scripts

**Defer Analytics:**
```liquid
{%- comment -%}
  Load Google Analytics after page load
{%- endcomment -%}
<script>
  window.addEventListener('load', () => {
    const script = document.createElement('script');
    script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_ID';
    script.async = true;
    document.head.appendChild(script);
  });
</script>
```

**Lazy Load Social Widgets:**
```javascript
// Load widgets only when visible
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      loadInstagramFeed();
      observer.disconnect();
    }
  });
});

observer.observe(document.querySelector('.instagram-feed'));
```

### 6. Reduce Request Count

**Combine CSS:**
```bash
# Build process - combine multiple SCSS into one
sass --style=compressed src/styles:assets
```

**Inline Small Assets:**
```liquid
{%- comment -%}
  SVG icons inline (no HTTP request)
{%- endcomment -%}
{% render 'icon-cart' %}

{%- comment -%}
  snippets/icon-cart.liquid
{%- endcomment -%}
<svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
  <path d="M8 16a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM18 16a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/>
  <path d="M1 1h3l.6 3M5 11h10l3-6H4.4M5 11L3.4 4M5 11l-.6 3h11.2"/>
</svg>
```

### 7. Caching Strategy

**Service Worker (Progressive Web App):**
```javascript
// sw.js - Cache static assets
const CACHE_NAME = 'theme-v1';
const urlsToCache = [
  '/',
  '/assets/theme.css',
  '/assets/theme.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
```

## Performance Budget

**Targets:**
- First Contentful Paint (FCP): < 1.8s
- Largest Contentful Paint (LCP): < 2.5s
- Cumulative Layout Shift (CLS): < 0.1
- Time to Interactive (TTI): < 3.8s
- Total Blocking Time (TBT): < 300ms

**Budgets:**
- JavaScript: < 200KB (gzipped)
- CSS: < 50KB (gzipped)
- Images: < 500KB each, optimized
- Fonts: < 100KB total
- Total page weight: < 1.5MB

## Audit Tools

**Shopify Theme Inspector:**
```bash
shopify theme check --json
```

**Lighthouse CI:**
```bash
# lighthouse-ci.json
{
  "ci": {
    "collect": {
      "url": ["https://your-store.myshopify.com"],
      "numberOfRuns": 3
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", {"minScore": 0.9}],
        "categories:accessibility": ["error", {"minScore": 1.0}]
      }
    }
  }
}
```

**WebPageTest:**
- Test on 3G connection
- Filmstrip view for visual progress
- Waterfall chart to identify blockers

## Optimization Workflow

1. **Baseline Audit:**
   - Lighthouse (mobile + desktop)
   - WebPageTest (3G)
   - Shopify Theme Analyzer

2. **Identify Bottlenecks:**
   - Render-blocking resources
   - Large JavaScript bundles
   - Unoptimized images
   - Excessive requests
   - Third-party scripts

3. **Implement Fixes:**
   - Critical CSS inline
   - Defer/async scripts
   - Lazy load images
   - Code splitting
   - Font optimization

4. **Measure Impact:**
   - Re-run Lighthouse
   - Compare metrics
   - Iterate

5. **Monitor:**
   - Real User Monitoring (RUM)
   - Core Web Vitals in Google Search Console

## Context
$ARGUMENTS

## Instructions
1. Audit the current theme (Lighthouse + Theme Check)
2. Identify main bottlenecks
3. Propose prioritized optimization plan
4. WAIT FOR APPROVAL
5. Implement optimizations
6. Measure impact (before/after)
7. Document improvements
