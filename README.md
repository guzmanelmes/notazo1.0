# Notazo

> **Calcula tus notas, proyecta tu futuro.**

Aplicación web estática y moderna orientada a estudiantes de enseñanza media y universitarios de Chile. Permite calcular promedios ponderados, descubrir qué nota se necesita para aprobar, simular exámenes finales y eximiciones. Todo se guarda localmente en el navegador — sin servidor, sin base de datos, sin registro.

Hecha con **React + Vite + TypeScript + TailwindCSS + React Router**. Optimizada para SEO, lista para monetizar con Google AdSense y desplegar gratis en Vercel.

---

## Tabla de contenidos

- [Características](#características)
- [Stack técnico](#stack-técnico)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Ejecutar localmente](#ejecutar-localmente)
- [Build de producción](#build-de-producción)
- [Despliegue en Vercel](#despliegue-en-vercel)
- [Configurar Google AdSense](#configurar-google-adsense)
- [Configurar Google Analytics 4](#configurar-google-analytics-4)
- [Configurar Google Search Console](#configurar-google-search-console)
- [SEO y posicionamiento](#seo-y-posicionamiento)
- [Accesibilidad](#accesibilidad)
- [Personalización](#personalización)
- [Créditos](#créditos)

---

## Características

- **Calculadora de promedio ponderado** con validación de ponderaciones.
- **¿Qué nota necesito?** para alcanzar un objetivo académico.
- **Calculadora de examen final** con nota de presentación.
- **Simulador de eximición** con indicador visual.
- **Historial local** con exportación a PDF.
- **Modo oscuro** automático según sistema o manual.
- **Mobile first**, totalmente responsive.
- **SEO optimizado** con React Helmet, Open Graph, Schema.org, sitemap y robots.txt.
- **Espacios AdSense listos** en 4 posiciones (top, middle, bottom, sidebar).
- **Accesibilidad WCAG**: navegación por teclado, etiquetas ARIA, contraste adecuado.
- **100% offline**: una vez cargada, la app sigue funcionando sin internet.

---

## Stack técnico

| Capa              | Tecnología                           |
| ----------------- | ------------------------------------ |
| UI                | React 18                             |
| Lenguaje          | TypeScript 5                         |
| Bundler           | Vite 5                               |
| Estilos           | TailwindCSS 3                        |
| Routing           | React Router 6                       |
| SEO               | React Helmet Async                   |
| Persistencia      | LocalStorage (hook `useLocalStorage`)|
| Exportación PDF   | jsPDF                                |
| Iconos            | SVG inline (Lucide-style)            |
| Fuente            | Inter (Google Fonts)                 |

---

## Estructura del proyecto

```
notazo/
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/
│   │   ├── ads/                  # AdBannerTop/Middle/Bottom/Sidebar + AdPlaceholder
│   │   ├── layout/               # Layout, Navbar, Footer
│   │   ├── seo/                  # SEO (Helmet)
│   │   └── ui/                   # Button, Card, Input, Loader, ProgressBar, ScrollToTop, ThemeToggle
│   ├── context/                  # ThemeContext
│   ├── hooks/                    # useLocalStorage, useHistory
│   ├── lib/                      # calculations, pdfExport, utils
│   ├── pages/                    # Home, CalculadoraNotas, QueNotaNecesito, CalculadoraExamenFinal, SimuladorEximicion, Historial, NotFound
│   ├── types/                    # Tipos globales
│   ├── App.tsx                   # Rutas
│   ├── main.tsx                  # Entry point
│   └── index.css                 # Tailwind + tokens
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
└── README.md
```

---

## Ejecutar localmente

### Requisitos

- **Node.js 18+** (recomendado 20 LTS)
- **npm** (o `pnpm` / `yarn`)

### Pasos

```bash
# 1. Clonar o descomprimir el proyecto
cd notazo

# 2. Instalar dependencias
npm install

# 3. Modo desarrollo
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

### Otros scripts útiles

```bash
npm run build       # Build de producción (dist/)
npm run preview     # Previsualizar el build
npm run typecheck   # Verificar tipos TypeScript
npm run lint        # Linter (si configuras ESLint)
```

---

## Build de producción

```bash
npm run build
```

Genera una versión optimizada en `dist/` lista para subir a cualquier hosting estático (Vercel, Netlify, GitHub Pages, Cloudflare Pages, etc.).

---

## Despliegue en Vercel

### Opción 1: Desde GitHub (recomendado)

1. Sube el proyecto a un repo de GitHub.
2. Entra a [vercel.com](https://vercel.com) y haz login con GitHub.
3. Click en **"Add New → Project"**.
4. Selecciona el repo `notazo`.
5. Vercel detecta automáticamente que es un proyecto **Vite**:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Click en **Deploy**.

Cada push a `main` redespliega automáticamente.

### Opción 2: CLI

```bash
npm i -g vercel
vercel login
vercel        # primer deploy (preproduccion)
vercel --prod # promover a producción
```

### Configuración adicional

Para SPA routing (que `/que-nota-necesito` funcione al recargar), crea un archivo `vercel.json` en la raíz:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

(Vite + Vercel suelen manejarlo automáticamente, pero este archivo asegura el comportamiento en cualquier configuración.)

---

## Configurar Google AdSense

1. Solicita tu cuenta en [adsense.google.com](https://adsense.google.com).
2. Una vez aprobada, copia tu **ID de cliente** (ej: `ca-pub-1234567890123456`).
3. Edita `src/components/ads/AdPlaceholder.tsx` y reemplaza el placeholder por tu bloque AdSense:

```html
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
     data-ad-slot="XXXXXXXXXX"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
```

4. Carga el script de AdSense en `index.html`:

```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossorigin="anonymous"></script>
```

5. Crea los slots de anuncios en tu panel de AdSense y reemplaza los `data-ad-slot` en cada componente.

Los 4 espacios preparados son:

- **AdBannerTop**: arriba del contenido principal (`<AdBannerTop />`)
- **AdBannerMiddle**: dentro del contenido (`<AdBannerMiddle />`)
- **AdBannerBottom**: antes del footer (`<AdBannerBottom />`)
- **AdSidebar**: solo en pantallas grandes (`<AdSidebar />`)

**Tip**: No satures la página. Una buena combinación es: Top + Middle + Sidebar.

---

## Configurar Google Analytics 4

1. Crea una propiedad GA4 en [analytics.google.com](https://analytics.google.com).
2. Copia tu **Measurement ID** (formato `G-XXXXXXXXXX`).
3. Agrega en `index.html` antes de `</head>`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## Configurar Google Search Console

1. Entra a [search.google.com/search-console](https://search.google.com/search-console).
2. Agrega tu propiedad (`https://notazo.cl`).
3. Verifica el dominio con el método **HTML tag** o **DNS**.
4. Envía tu sitemap: `https://notazo.cl/sitemap.xml`.

---

## SEO y posicionamiento

Ya viene optimizado para SEO. Incluye:

- **Meta títulos y descripciones** dinámicas por página (vía `<SEO />` + React Helmet).
- **Open Graph** y **Twitter Cards** para compartir en redes sociales.
- **Canonical URLs** para evitar contenido duplicado.
- **Schema.org JSON-LD** (`EducationalOrganization` y `WebSite` con SearchAction).
- **Sitemap.xml** en `/public/sitemap.xml`.
- **Robots.txt** en `/public/robots.txt`.
- **URLs amigables** en español (`/que-nota-necesito`, `/simulador-eximicion`).
- **HTML semántico**: `<header>`, `<main>`, `<nav>`, `<footer>`, `<article>`, `<section>`.
- **Lazy loading** de páginas (Suspense) para mejor Core Web Vitals.
- **Code splitting** automático por Vite.

### Palabras clave objetivo

```
calculadora de notas chile
calcular promedio
qué nota necesito
calculadora de examen
promedio ponderado
simulador de notas
calculadora notas universidad
calculadora notas enseñanza media
```

### Próximos pasos para SEO

- Crear contenido tipo blog: "Cómo calcular promedio ponderado en Chile".
- Generar backlinks desde foros y redes sociales.
- Registrar en Google Search Console y Bing Webmaster Tools.

---

## Accesibilidad

- **WCAG AA** cumplido en contraste de colores.
- **Navegación por teclado** completa (focus visible).
- **Etiquetas ARIA** en componentes interactivos.
- **Texto alternativo** en iconos (`aria-hidden` cuando son decorativos).
- **Skip link** para saltar al contenido principal.
- **Reduced motion**: respeta `prefers-reduced-motion`.
- **Roles semánticos**: `navigation`, `main`, `contentinfo`, `progressbar`, `alert`, `status`.

---

## Personalización

### Cambiar colores

Edita `tailwind.config.js` en `theme.extend.colors.brand`:

```js
brand: {
  600: '#TU_COLOR_PRIMARIO',
  // ...
}
```

### Cambiar el eslogan

Busca y reemplaza en:
- `src/components/layout/Navbar.tsx`
- `src/components/layout/Footer.tsx`
- `index.html`

### Agregar más páginas

1. Crea el componente en `src/pages/MiPagina.tsx`.
2. Agrégalo como ruta en `src/App.tsx` con `lazy`.
3. Agrega un `<NavLink>` en `src/components/layout/Navbar.tsx`.
4. Crea un `<SEO />` con título y descripción únicos.
5. Agrega la URL a `public/sitemap.xml`.

---

## Notas técnicas

- La aplicación **no envía datos a ningún servidor**. Todo se guarda en `localStorage` del navegador.
- Los cálculos usan la **escala chilena 1.0 – 7.0** con nota de aprobación 4.0.
- El **promedio ponderado** se calcula como `Σ(nota × ponderación) / 100`.
- La **nota necesaria** se calcula con la fórmula `(objetivo − actual × (100 − p) / 100) / (p / 100)`.
- El **PDF** se genera client-side con jsPDF (no requiere servidor).

---

## Licencia

MIT — úsalo, modifícalo y distribúyelo libremente. Si publicas una versión mejorada, menciónanos como inspiración. 🇨🇱

---

## Créditos

Hecho con cariño para los estudiantes chilenos.

**Notazo** — *Calcula tus notas, proyecta tu futuro.*
