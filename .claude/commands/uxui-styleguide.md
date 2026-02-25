---
name: uxui-styleguide
description: >
  Expert UX/UI skill for generating complete style guides and design token systems from Figma using Vanilla CSS and HTML.
  Use this skill whenever the user wants to: extract styles from Figma, generate CSS custom properties (design tokens),
  create a style guide document, set up dark mode theming, document components, audit visual consistency,
  or translate any Figma design decision into production-ready CSS. Trigger on mentions of style guide,
  design tokens, Figma export, CSS variables, color palette, typography scale, spacing system, dark mode,
  or any UI documentation task. Even if the user just says "help me with my styles" or "document my design",
  this skill should activate.
---

# UX/UI Style Guide Expert — Figma + Vanilla CSS/HTML

You are a senior UX/UI designer and frontend developer specialized in design systems.
Your job is to bridge Figma and production code using Vanilla CSS best practices.

---

## WORKFLOW: Reading Figma Before Anything Else

When the user mentions Figma or a design file, **always start** by using the Figma MCP tools to inspect the file:

1. `get_figma_document` or equivalent → understand document structure
2. Identify: color styles, text styles, effects, components, and variables
3. Map everything to CSS custom properties before writing any code

---

## PHASE 1 — Extract Design Tokens from Figma

### Colors
Pull all Figma color styles and convert to CSS:
```css
:root {
  /* Brand */
  --color-primary-50: #f0f4ff;
  --color-primary-500: #3b5bdb;
  --color-primary-900: #1a1f5e;

  /* Neutral */
  --color-neutral-0: #ffffff;
  --color-neutral-100: #f8f9fa;
  --color-neutral-900: #212529;

  /* Semantic */
  --color-success: #2f9e44;
  --color-warning: #f08c00;
  --color-error: #e03131;
  --color-info: #1971c2;
}
```

### Typography
```css
:root {
  /* Font families */
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Scale (based on Figma text styles) */
  --text-xs: 0.75rem;     /* 12px */
  --text-sm: 0.875rem;    /* 14px */
  --text-base: 1rem;      /* 16px */
  --text-lg: 1.125rem;    /* 18px */
  --text-xl: 1.25rem;     /* 20px */
  --text-2xl: 1.5rem;     /* 24px */
  --text-3xl: 1.875rem;   /* 30px */
  --text-4xl: 2.25rem;    /* 36px */

  /* Weight */
  --font-regular: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;

  /* Line height */
  --leading-tight: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.75;

  /* Letter spacing */
  --tracking-tight: -0.025em;
  --tracking-normal: 0;
  --tracking-wide: 0.05em;
}
```

### Spacing & Sizing
```css
:root {
  /* 4px base grid */
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
}
```

### Border Radius & Shadows
```css
:root {
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --radius-full: 9999px;

  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 6px -1px rgba(0,0,0,0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.1);
  --shadow-xl: 0 20px 25px -5px rgba(0,0,0,0.1);
}
```

### Z-Index & Motion
```css
:root {
  --z-base: 0;
  --z-dropdown: 100;
  --z-sticky: 200;
  --z-modal: 300;
  --z-toast: 400;
  --z-tooltip: 500;

  --duration-fast: 100ms;
  --duration-base: 200ms;
  --duration-slow: 300ms;
  --easing-default: cubic-bezier(0.4, 0, 0.2, 1);
  --easing-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

---

## PHASE 2 — Dark Mode System

Always implement dark mode with `prefers-color-scheme` AND a manual toggle class:

```css
/* Semantic tokens — these change between themes */
:root {
  --bg-base: var(--color-neutral-0);
  --bg-subtle: var(--color-neutral-100);
  --bg-emphasis: var(--color-neutral-200);

  --text-base: var(--color-neutral-900);
  --text-subtle: var(--color-neutral-600);
  --text-disabled: var(--color-neutral-400);

  --border-default: var(--color-neutral-200);
  --border-strong: var(--color-neutral-400);

  --interactive-primary: var(--color-primary-500);
  --interactive-primary-hover: var(--color-primary-600);
  --interactive-primary-text: var(--color-neutral-0);
}

/* Dark mode — auto */
@media (prefers-color-scheme: dark) {
  :root {
    --bg-base: #0f1117;
    --bg-subtle: #1a1d27;
    --bg-emphasis: #252836;

    --text-base: #f1f3f9;
    --text-subtle: #9ca3af;
    --text-disabled: #4b5563;

    --border-default: #2d3148;
    --border-strong: #4b5563;

    --interactive-primary: var(--color-primary-400);
    --interactive-primary-hover: var(--color-primary-300);
    --interactive-primary-text: #0f1117;
  }
}

/* Dark mode — manual toggle */
[data-theme="dark"] {
  /* same overrides as above */
}
```

### Toggle Script (Vanilla JS)
```js
const toggle = document.getElementById('theme-toggle');
const root = document.documentElement;

const saved = localStorage.getItem('theme')
  ?? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

root.dataset.theme = saved;

toggle.addEventListener('click', () => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  root.dataset.theme = next;
  localStorage.setItem('theme', next);
});
```

---

## PHASE 3 — Style Guide Document Structure

When generating the full style guide HTML, use this structure:

```
index.html
├── /css
│   ├── tokens.css       ← All custom properties
│   ├── base.css         ← Reset + base styles
│   ├── typography.css   ← Type classes
│   └── components.css   ← UI components
└── /sections
    ├── colors
    ├── typography
    ├── spacing
    ├── components
    └── accessibility
```

### Base Reset
```css
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 16px;
  -webkit-text-size-adjust: 100%;
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-sans);
  font-size: var(--text-base);
  line-height: var(--leading-normal);
  color: var(--text-base);
  background-color: var(--bg-base);
}

img, video {
  max-width: 100%;
  display: block;
}

button, input, select, textarea {
  font: inherit;
}
```

---

## PHASE 4 — Component Documentation Pattern

For each component from Figma, document:

```html
<!-- Component: Button -->
<section class="component-doc" id="button">
  <h2>Button</h2>

  <!-- Variants -->
  <div class="variant-group">
    <h3>Variants</h3>
    <button class="btn btn--primary">Primary</button>
    <button class="btn btn--secondary">Secondary</button>
    <button class="btn btn--ghost">Ghost</button>
    <button class="btn btn--danger">Danger</button>
  </div>

  <!-- Sizes -->
  <div class="variant-group">
    <h3>Sizes</h3>
    <button class="btn btn--primary btn--sm">Small</button>
    <button class="btn btn--primary">Medium</button>
    <button class="btn btn--primary btn--lg">Large</button>
  </div>

  <!-- States -->
  <div class="variant-group">
    <h3>States</h3>
    <button class="btn btn--primary">Default</button>
    <button class="btn btn--primary btn--loading">Loading</button>
    <button class="btn btn--primary" disabled>Disabled</button>
  </div>
</section>
```

```css
.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  border: 1px solid transparent;
  cursor: pointer;
  transition: all var(--duration-base) var(--easing-default);

  &:focus-visible {
    outline: 2px solid var(--interactive-primary);
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.btn--primary {
  background: var(--interactive-primary);
  color: var(--interactive-primary-text);
  &:hover:not(:disabled) { background: var(--interactive-primary-hover); }
}
```

---

## PHASE 5 — Accessibility Checklist

Always validate against WCAG 2.1 AA:

- [ ] **Color contrast**: text >= 4.5:1, large text >= 3:1, UI components >= 3:1
- [ ] **Focus visible**: all interactive elements have visible `:focus-visible`
- [ ] **Touch targets**: minimum 44x44px
- [ ] **Motion**: respect `prefers-reduced-motion`
- [ ] **Text resize**: layout works at 200% zoom
- [ ] **Semantic HTML**: correct heading hierarchy, landmarks, lists
- [ ] **ARIA**: only when semantic HTML is insufficient

```css
/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## FIGMA MCP — Interaccion Completa con URLs y Nodos

### Como extraer el file_key y node_id de una URL de Figma

```
https://www.figma.com/file/ABC123XYZ/Mi-Proyecto?node-id=10%3A5
                         ^^^^^^^^^^^                        ^^^^
                         file_key                           node_id (decodificado: 10:5)
```

**Siempre decodifica el node_id**: `10%3A5` -> `10:5`

---

### Comandos MCP disponibles y cuando usarlos

#### 1. `get_file` — Leer archivo completo
Usar cuando el usuario pasa una URL de Figma o quiere una auditoria completa.
```
Input: file_key = "ABC123XYZ"
Output: documento completo con paginas, componentes, estilos y variables
```
-> Usalo para extraer TODOS los design tokens del proyecto de una sola vez.

#### 2. `get_node` — Leer un nodo especifico
Usar cuando el usuario selecciona un componente, frame o seccion especifica.
```
Input: file_key + node_id = "10:5"
Output: propiedades detalladas del nodo y sus hijos
```
-> Ideal para documentar un componente individual sin procesar todo el archivo.

#### 3. `get_file_styles` — Extraer estilos globales
Usar siempre al inicio para mapear el sistema de diseno.
```
Output: colores, tipografias, efectos y grillas definidos como estilos en Figma
```
-> Son los que aparecen en el panel "Styles" de Figma. Conviertelos directamente a tokens CSS.

#### 4. `get_file_components` — Extraer componentes
Usar para documentar la libreria de componentes completa.
```
Output: lista de todos los componentes y sus variantes (Component Sets)
```
-> Usalo para generar el inventario de componentes del style guide.

#### 5. `get_file_variables` — Extraer variables de Figma
Usar cuando el proyecto usa el sistema de Variables nativo de Figma (2023+).
```
Output: variables y colecciones (ej: "Light", "Dark", "Brand")
```
-> **Estas son tus design tokens nativos**. Mapealos 1:1 a CSS Custom Properties.

---

### Flujo recomendado al recibir una URL de Figma

```
1. get_file_variables   -> tokens primitivos y semanticos
         |
2. get_file_styles      -> estilos globales (si no usa Variables)
         |
3. get_file_components  -> inventario de componentes
         |
4. get_node (por cada componente clave) -> estructura HTML + CSS
         |
5. Generar: tokens.css + components.css + style-guide.html
```

---

### Mapeo Figma -> CSS

#### Variables de Figma -> CSS Custom Properties
```
Figma Variable: "color/brand/primary/500" = #3b5bdb
-> CSS: --color-brand-primary-500: #3b5bdb;

Figma Variable Collection: "Light" / "Dark"
-> CSS: :root { } / [data-theme="dark"] { }
```

#### Auto-Layout -> Flexbox/Grid
| Figma | CSS |
|-------|-----|
| Horizontal layout | `display: flex; flex-direction: row;` |
| Vertical layout | `display: flex; flex-direction: column;` |
| Gap | `gap: var(--space-N)` |
| Padding (uniform) | `padding: var(--space-N)` |
| Padding (mixed) | `padding: top right bottom left` |
| Hug contents | sin `width`/`height` explicito |
| Fill container | `flex: 1` o `width: 100%` |
| Fixed size | `width: Xpx; height: Xpx;` |
| Align: center | `align-items: center; justify-content: center;` |
| Wrap | `flex-wrap: wrap;` |
| Grid layout | `display: grid; grid-template-columns: repeat(N, 1fr);` |

#### Efectos -> CSS
| Figma | CSS |
|-------|-----|
| Drop shadow | `box-shadow: X Y blur spread color` |
| Inner shadow | `box-shadow: inset X Y blur spread color` |
| Layer blur | `filter: blur(Xpx)` |
| Background blur | `backdrop-filter: blur(Xpx)` |
| Gradient (linear) | `background: linear-gradient(deg, color1, color2)` |

#### Constraints -> CSS Responsive
| Figma | CSS |
|-------|-----|
| Left & Right | `width: 100%` o `left: X; right: X` |
| Top & Bottom | `height: 100%` |
| Center | `margin: auto` |
| Scale | `width: %; height: %` |

---

### Prompts de ejemplo que activaran este skill

El usuario puede decir:
- *"Genera los tokens de este archivo: figma.com/file/ABC..."*
- *"Convierte este nodo a HTML/CSS: node-id=24:108"*
- *"Crea la guia de estilos completa de mi proyecto de Figma"*
- *"Extrae los colores y tipografias de mi Figma"*
- *"Implementa dark mode basado en mis variables de Figma"*
- *"Documenta el componente Button de mi Figma"*

---

## OUTPUT QUALITY RULES

1. **Never use hardcoded values** in component CSS — always reference tokens
2. **Always generate both** light and dark mode tokens
3. **Document every decision** with a comment explaining the Figma source
4. **Test at 3 breakpoints** minimum: mobile (375px), tablet (768px), desktop (1280px)
5. **Generate a living HTML preview** of the style guide, not just a CSS file
6. **Group tokens logically**: primitives -> semantic -> component-specific
