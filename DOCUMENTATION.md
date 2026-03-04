# Etilis Template — Documentación del Proyecto

## Descripción general

Etilis Template es un tema de Shopify modular y personalizable, diseñado para marcas de e-commerce en el sector salud/bienestar (específicamente suplementos probióticos). Está construido con Liquid, CSS custom properties (design tokens) y un sistema de color schemes intercambiables.

**Versión:** 0.1.0
**Stack:** Shopify Liquid + CSS Custom Properties + Vanilla JS + Swiper.js
**Idioma base:** Inglés (en.default.json)

---

## Arquitectura del tema

```
etilis-template/
├── assets/        → CSS, JS, SVGs, imágenes (21 archivos)
├── blocks/        → Componentes reutilizables anidables (2)
├── config/        → Settings globales del tema (2)
├── layout/        → Wrappers HTML principales (2)
├── locales/       → Archivos de traducción (2)
├── sections/      → Módulos de página completos (36)
├── snippets/      → Fragmentos reutilizables internos (5)
└── templates/     → Definiciones de estructura por página (14)
```

| Categoría | Cantidad |
|-----------|----------|
| Sections | 36 |
| Blocks | 2 |
| Snippets | 5 |
| Templates | 14 |
| Layouts | 2 |
| Archivos CSS | 4 |
| Iconos SVG | 14 |

---

## Secciones principales por área

### Header y navegación

- `header.liquid` — Header sticky con navegación, búsqueda, carrito y drawer móvil
- `cart-drawer.liquid` — Carrito lateral deslizante
- `search-drawer.liquid` — Panel de búsqueda deslizante

### Home page

- `home-hero.liquid` — Hero banner con badge de reviews, headline y CTA
- `home-collection.liquid` — Carrusel de productos (Swiper)
- `home-benefits.liquid` — Grid de 3 columnas con iconos de beneficios
- `home-steps.liquid` — Sección "cómo funciona" con pasos numerados
- `home-comparison.liquid` — Tabla comparativa vs competencia
- `home-testimonials.liquid` — Carrusel de testimonios (video + quotes)

### Producto

- `product.liquid` — Página de detalle de producto
- `product-hero.liquid` — Hero de la página de producto
- `product-benefits.liquid` — Beneficios del producto
- `product-faq.liquid` — Preguntas frecuentes (accordion)
- `product-timeline.liquid` — Timeline de características

### Colecciones y tienda

- `collection.liquid` — Página de colección con filtros y ordenamiento
- `collections.liquid` — Índice de colecciones
- `cart.liquid` — Carrito de compras (página completa)

### Contenido

- `blog.liquid` — Listado de artículos
- `article.liquid` — Página de artículo individual

### Secciones reutilizables

- `comparison-table.liquid` — Tabla comparativa genérica
- `guarantee-banner.liquid` — Banner de garantía/confianza
- `how-it-works.liquid` — Explicación de proceso
- `logo-marquee.liquid` — Carrusel de logos de partners
- `testimonials.liquid` — Testimonios genéricos
- `text-with-image.liquid` — Bloque de texto con imagen

### Footer

- `footer.liquid` — Footer con columnas de menú y newsletter

### Utilidad

- `404.liquid`, `password.liquid`, `search.liquid`, `page.liquid`
- `style-guide.liquid`, `token-preview.liquid` — Páginas internas de referencia de diseño

---

## Sistema de diseño (Design Tokens)

El tema usa un sistema completo de CSS custom properties definido en `assets/tokens.css` y `snippets/css-variables.liquid`.

### 3 esquemas de color intercambiables

| Esquema | Acento | Fondo | Estética | Bordes |
|---------|--------|-------|----------|--------|
| **Minimal** | Negro (#0A0A0A) | Blanco | Editorial, lujo | Rectos (0px radius) |
| **Nature** | Verde bosque (#1C3A13) | Crema (#FCFCF7) | Orgánico, wellness | Pill (48px radius) |
| **Sky** | Azul (#0077B6) | Azul claro (#F4F8FB) | Moderno, tech | Redondeados (10px) |

### Tokens disponibles

- **Colores:** neutral scale (0-900), brand, semantic, UI (100+ variables)
- **Tipografía:** tamaños (xs a 4xl), pesos, alturas de línea
- **Espaciado:** escala de 0-12 (base 4px)
- **Bordes y radios:** xs a pill
- **Sombras:** sm, md, lg
- **Motion:** duraciones y easing

### Tipografía configurable

- **Heading:** Playfair Display (default)
- **Body:** Inter (default)
- El merchant puede cambiar ambas fuentes desde el editor

---

## Características técnicas

- **Responsive:** Mobile-first con breakpoint principal en 750px
- **Accesibilidad:** HTML semántico, ARIA labels, focus-visible, navegación por teclado, contraste WCAG AA/AAA
- **Performance:** Critical CSS precargado, fonts preloaded, lazy loading de imágenes, Swiper cargado condicionalmente
- **Internacionalización:** Todos los textos usan filtro `| t`, traducciones centralizadas en `locales/`
- **Personalización:** Merchants pueden configurar colores, fuentes, layout y contenido desde el Theme Editor de Shopify

---

## Snippets

| Snippet | Función |
|---------|---------|
| `css-variables.liquid` | Inyecta design tokens y color schemes como CSS variables |
| `meta-tags.liquid` | SEO (Open Graph, Twitter Cards, JSON-LD) |
| `image.liquid` | Imagen responsive con lazy loading y link opcional |
| `product-card.liquid` | Tarjeta de producto para grids y carruseles |
| `swiper-loader.liquid` | Carga condicional de Swiper (CSS + JS) |

---

## Bloques

| Bloque | Función |
|--------|---------|
| `text.liquid` | Texto configurable (título/subtítulo/normal) con alineación |
| `group.liquid` | Contenedor flex para anidar bloques (horizontal/vertical) |

---

## Configuración global (Theme Editor)

Disponible en `config/settings_schema.json`:

- **Tipografía:** Font heading + font body (Google Fonts)
- **Layout:** Ancho máximo de página (90rem / 110rem) + margen mínimo
- **Color scheme:** Selector de esquema + overrides individuales (acento, fondo, texto, superficie)

---

## Dependencias externas

| Librería | Versión | Uso |
|----------|---------|-----|
| Swiper.js | Bundle (minificado) | Carruseles de productos, testimonios y logos |

---

## Páginas de referencia interna

- **Style Guide** (`page.style-guide.json`) — Vista de todos los tokens y componentes del sistema de diseño
- **Token Preview** (`page.token-preview.json`) — Previsualización de CSS custom properties

---

## Estado actual

- Esquema de color activo: **Nature**
- Idioma: Solo inglés (pendiente agregar otros idiomas)
- Branch principal de desarrollo: `develop`
