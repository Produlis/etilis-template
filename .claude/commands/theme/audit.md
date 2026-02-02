Run a complete theme audit:

## Audit Checklist

### 1. Theme Check (Liquid)
```bash
shopify theme check
```
- [ ] No critical errors
- [ ] No important warnings
- [ ] Best practices followed

### 2. Lighthouse (Performance)
- [ ] Mobile score > 90
- [ ] Desktop score > 95
- [ ] FCP < 1.8s
- [ ] LCP < 2.5s
- [ ] CLS < 0.1
- [ ] TBT < 300ms

### 3. Accessibility
- [ ] Lighthouse a11y score = 100
- [ ] Full keyboard navigation
- [ ] Screen reader friendly
- [ ] Color contrast WCAG AA
- [ ] Proper form labels
- [ ] Alt text on images

### 4. SEO
- [ ] Complete meta tags
- [ ] Structured data (JSON-LD)
- [ ] Canonical URLs
- [ ] Sitemap.xml
- [ ] Robots.txt

### 5. Cross-browser
- [ ] Chrome (latest)
- [ ] Safari (iOS + macOS)
- [ ] Firefox (latest)
- [ ] Edge (latest)

### 6. Responsive
- [ ] Mobile (320px - 767px)
- [ ] Tablet (768px - 1023px)
- [ ] Desktop (1024px+)
- [ ] Touch targets > 44px

### 7. Code Quality
- [ ] No console.log in production
- [ ] CSS without unnecessary !important
- [ ] JavaScript ES6+ (transpiled if needed)
- [ ] No dead code

## Generate Report

1. Run audits
2. Document findings
3. Prioritize fixes (critical/high/medium/low)
4. Propose action plan
