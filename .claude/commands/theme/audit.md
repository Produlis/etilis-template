Ejecuta un audit completo del theme:

## Checklist de Audit

### 1. Theme Check (Liquid)
```bash
shopify theme check
```
- [ ] No errores críticos
- [ ] No warnings importantes
- [ ] Best practices seguidas

### 2. Lighthouse (Performance)
- [ ] Mobile score > 90
- [ ] Desktop score > 95
- [ ] FCP < 1.8s
- [ ] LCP < 2.5s
- [ ] CLS < 0.1
- [ ] TBT < 300ms

### 3. Accessibility
- [ ] Lighthouse a11y score = 100
- [ ] Keyboard navigation completa
- [ ] Screen reader friendly
- [ ] Color contrast WCAG AA
- [ ] Form labels apropiados
- [ ] Alt text en imágenes

### 4. SEO
- [ ] Meta tags completos
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
- [ ] No console.log en production
- [ ] CSS sin !important innecesarios
- [ ] JavaScript ES6+ (transpilado si necesario)
- [ ] No código muerto (dead code)

## Genera Reporte

1. Ejecuta audits
2. Documenta hallazgos
3. Prioriza fixes (crítico/alto/medio/bajo)
4. Propón plan de acción
