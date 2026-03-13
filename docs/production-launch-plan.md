# Plan de Despliegue a Produccion - Etilis Template

## Resumen

Este documento detalla el plan para subir el theme Etilis Template a produccion en una tienda Shopify.

---

## Fase 1: Validacion y QA Pre-Despliegue

### 1.1 Theme Check (Linting)
Ejecutar Theme Check para detectar errores de Liquid, referencias faltantes, y problemas de rendimiento:

```bash
shopify theme check --path .
```

Con modo estricto (recomendado antes de produccion):
```bash
shopify theme check --path . --fail-level error
```

### 1.2 Revision Manual
- [ ] Verificar que todas las secciones renderizan correctamente
- [ ] Probar los 3 esquemas de color (Minimal, Nature, Sky)
- [ ] Verificar responsive design (mobile, tablet, desktop)
- [ ] Probar formularios (carrito, busqueda)
- [ ] Verificar accesibilidad (navegacion por teclado, ARIA labels)
- [ ] Probar con JavaScript deshabilitado (elementos criticos deben funcionar)
- [ ] Verificar traducciones (`en.default.json`)
- [ ] Revisar meta tags y SEO

### 1.3 Performance
- [ ] Ejecutar Lighthouse en paginas clave (home, producto, coleccion)
- [ ] Verificar lazy loading de imagenes
- [ ] Confirmar carga condicional de Swiper.js
- [ ] Verificar preload/preconnect de fonts

---

## Fase 2: Configuracion de la Tienda

### 2.1 Requisitos Previos
- [ ] Tienda Shopify activa (plan pagado o development store)
- [ ] Shopify CLI instalado (`npm install -g @shopify/cli`)
- [ ] Acceso autenticado a la tienda

### 2.2 Autenticacion

**Opcion A - Interactiva (desarrollo):**
```bash
shopify auth login --store tu-tienda.myshopify.com
```

**Opcion B - Token (CI/CD):**
Instalar la app "Theme Access" en la tienda y generar un password.

---

## Fase 3: Despliegue

### 3.1 Preview en Development Theme
Antes de subir a produccion, previsualizar los cambios:

```bash
shopify theme dev --store tu-tienda.myshopify.com
```

Esto crea un theme temporal de desarrollo con hot reload.

### 3.2 Push como Theme No Publicado
Subir el theme al store sin publicarlo (para revision final):

```bash
shopify theme push --unpublished --store tu-tienda.myshopify.com
```

Esto crea un theme nuevo en la biblioteca de themes. Se obtendra:
- Link al editor del theme
- Link de preview para compartir

### 3.3 Push con Validacion Estricta
Para asegurar que no hay errores antes de subir:

```bash
shopify theme push --unpublished --strict --store tu-tienda.myshopify.com
```

El flag `--strict` ejecuta Theme Check y bloquea el push si hay errores.

### 3.4 Revision en el Admin
- [ ] Abrir el editor del theme en Shopify Admin
- [ ] Configurar los settings globales (colores, fuentes, layout)
- [ ] Personalizar las secciones del homepage
- [ ] Verificar que los templates JSON estan correctos
- [ ] Probar el checkout y carrito

### 3.5 Publicar el Theme
Una vez aprobados los cambios:

```bash
shopify theme publish --store tu-tienda.myshopify.com
```

Seleccionar el theme de la lista y confirmar.

**IMPORTANTE:** Esto reemplaza el theme activo de la tienda.

---

## Fase 4: CI/CD con GitHub Actions

### 4.1 Configurar Secrets en GitHub
Agregar los siguientes secrets al repositorio:

| Secret | Valor |
|--------|-------|
| `SHOPIFY_CLI_THEME_TOKEN` | Password de Theme Access app |
| `SHOPIFY_FLAG_STORE` | `tu-tienda.myshopify.com` |

### 4.2 Workflow de Deploy

Crear `.github/workflows/deploy-theme.yml`:

```yaml
name: Theme Deploy

on:
  push:
    branches: [main]

jobs:
  theme-check:
    name: Theme Check
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - name: Install Shopify CLI
        run: npm install -g @shopify/cli
      - name: Run Theme Check
        run: shopify theme check --path . --fail-level error

  deploy:
    name: Deploy to Shopify
    needs: theme-check
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - name: Install Shopify CLI
        run: npm install -g @shopify/cli
      - name: Push theme
        run: |
          shopify theme push \
            --json \
            --theme your-theme-name-or-id \
            --store ${{ secrets.SHOPIFY_FLAG_STORE }} \
            --password ${{ secrets.SHOPIFY_CLI_THEME_TOKEN }}
```

### 4.3 Workflow de Lighthouse CI (Opcional)

Crear `.github/workflows/lighthouse-ci.yml`:

```yaml
name: Shopify Lighthouse CI

on: [push]

jobs:
  lhci:
    name: Lighthouse
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Lighthouse CI
        uses: shopify/lighthouse-ci-action@v1
        with:
          store: ${{ secrets.SHOP_STORE }}
          access_token: ${{ secrets.SHOP_ACCESS_TOKEN }}
          lhci_min_score_performance: 0.7
          lhci_min_score_accessibility: 0.9
```

---

## Fase 5: Estrategia de Branches

```
main        → Produccion (deploy automatico)
develop     → Desarrollo activo
feat/*      → Features individuales
```

### Flujo recomendado:
1. Desarrollar en `feat/*` branches
2. Merge a `develop` para integracion
3. PR de `develop` → `main` para release a produccion
4. GitHub Actions ejecuta Theme Check + Deploy automaticamente

---

## Fase 6: Post-Despliegue

### 6.1 Verificacion
- [ ] Verificar que el theme esta activo en la tienda
- [ ] Navegar todas las paginas principales
- [ ] Probar compra completa (checkout)
- [ ] Verificar velocidad con Google PageSpeed Insights
- [ ] Revisar en multiples navegadores (Chrome, Safari, Firefox)
- [ ] Revisar en dispositivos moviles reales

### 6.2 Rollback
Si hay problemas, revertir al theme anterior desde:
- **Shopify Admin** → Online Store → Themes → Publicar theme anterior
- O re-deploy desde un commit anterior de `main`

---

## Checklist Resumen

| # | Paso | Estado |
|---|------|--------|
| 1 | Ejecutar `shopify theme check` | ⬜ |
| 2 | Probar con `shopify theme dev` | ⬜ |
| 3 | Revisar responsive y accesibilidad | ⬜ |
| 4 | Ejecutar Lighthouse | ⬜ |
| 5 | Push como unpublished | ⬜ |
| 6 | Revisar en Shopify Admin | ⬜ |
| 7 | Configurar settings del theme | ⬜ |
| 8 | Publicar theme | ⬜ |
| 9 | Configurar GitHub Actions CI/CD | ⬜ |
| 10 | Verificacion post-deploy | ⬜ |

---

## Comandos Rapidos

```bash
# Desarrollo local con hot reload
shopify theme dev --store tu-tienda.myshopify.com

# Validar theme
shopify theme check

# Subir sin publicar
shopify theme push --unpublished --store tu-tienda.myshopify.com

# Subir con validacion estricta
shopify theme push --unpublished --strict --store tu-tienda.myshopify.com

# Publicar
shopify theme publish --store tu-tienda.myshopify.com

# Descargar theme actual (backup)
shopify theme pull --store tu-tienda.myshopify.com
```
