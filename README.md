# Notazo

> **Calcula tus notas, proyecta tu futuro.**

Aplicación web estática y moderna orientada a estudiantes de enseñanza media y universitarios de Chile. Permite calcular promedios ponderados, descubrir qué nota se necesita para aprobar, convertir puntajes a notas chilenas, simular exámenes finales, eximiciones y NEM — todo con un dashboard con gráficos y un blog educativo integrado.

Hecha con **React + Vite + TypeScript + TailwindCSS + React Router**. Todo se guarda localmente en el navegador (sin servidor, sin base de datos, sin registro). Optimizada para SEO, lista para monetizar con Google AdSense y desplegar gratis en Vercel.

---

## Tabla de contenidos

- [Características](#características)
- [Páginas](#páginas)
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

---

## Características

### Herramientas
- **Calculadora de promedio ponderado** multi-semestre (gestiona varios ramos/cursos localmente).
- **¿Qué nota necesito?** para alcanzar un objetivo académico.
- **Convertidor Puntaje → Nota** (escala 1.0-7.0, con exigencia configurable).
- **Calculadora NEM** (Notas de Enseñanza Media para la PAES).
- **Calculadora de examen final** con nota de presentación.
- **Simulador de eximición** con indicador visual.
- **Dashboard con gráficos** (recharts): promedios por semestre, distribución de notas.
- **Historial local** con exportación a PDF.
- **Escala de Notas** con equivalencias internacionales.

### Blog SEO
- 5 artículos iniciales optimizados para keywords chilenas:
  - Cómo calcular promedio ponderado
  - Qué nota necesito para aprobar
  - Convertir puntaje a nota
  - NEM y PAES
  - Cómo eximir el examen final

### Sistema
- **Modo oscuro** automático o manual.
- **Mobile first**, totalmente responsive.
- **SEO optimizado** con React Helmet, Open Graph, Schema.org, sitemap y robots.txt.
- **Espacios AdSense listos** en 4 posiciones.
- **Accesibilidad WCAG**: navegación por teclado, etiquetas ARIA, contraste adecuado.
- **100% offline**: una vez cargada, la app sigue funcionando sin internet.
- **Multi-semestre local**: cada "ramo" o "semestre" se guarda por separado en LocalStorage.

---

## Páginas

| Ruta | Descripción |
|------|-------------|
| `/` | Inicio con hero, herramientas, features y FAQ |
| `/calculadora-de-notas` | Promedio ponderado multi-semestre |
| `/que-nota-necesito` | Cálculo de nota objetivo |
| `/puntaje-a-nota` | Conversor de puntaje bruto a nota 1.0-7.0 |
| `/nem` | Calculadora NEM (Notas de Enseñanza Media) |
| `/calculadora-examen-final` | Nota mínima en examen para aprobar |
| `/simulador-eximicion` | Verifica si te eximes |
| `/escala-de-notas` | Guía educativa de la escala chilena |
| `/dashboard` | Gráficos y estadísticas |
| `/blog` | Listado de artículos |
| `/blog/:slug` | Artículo individual |
| `/historial` | Historial con export a PDF |
| `*` | Página 404 |

---

## Stack técnico

| Capa              | Tecnología                           |
| ----------------- | ------------------------------------ |
| UI                | React 18                             |
| Lenguaje          | TypeScript 5 (strict)                |
| Bundler           | Vite 5                               |
| Estilos           | TailwindCSS 3                        |
| Routing           | React Router 6 (lazy loading)        |
| Gráficos          | Recharts 2                           |
| SEO               | React Helmet Async                   |
| Persistencia      | LocalStorage (hook tipado)           |
| Markdown          | react-markdown (para el blog)        |
| Exportación PDF   | jsPDF                                |
| Iconos            | SVG inline                           |
| Fuente            | Inter (Google Fonts)                 |

---

## Estructura del proyecto

```
notazo/
├── public/
│   ├── favicon.svg
│   ├── og-image.svg
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/
│   │   ├── ads/                  # AdBannerTop/Middle/Bottom/Sidebar + AdPlaceholder
│   │   ├── layout/               # Layout, Navbar, Footer
│   │   ├── seo/                  # SEO (Helmet)
│   │   └── ui/                   # Button, Card, Input, Loader, ProgressBar, ScrollToTop, ThemeToggle
│   ├── context/                  # ThemeContext
│   ├── data/                     # blog.ts (posts estáticos)
│   ├── hooks/                    # useLocalStorage, useHistory, useSemestres
│   ├── lib/                      # calculations, pdfExport, utils, scripts
│   ├── pages/                    # Home, CalculadoraNotas, QueNotaNecesito, CalculadoraExamenFinal, SimuladorEximicion, PuntajeANota, Nem, EscalaNotas, Dashboard, Blog, BlogPost, Historial, NotFound
│   ├── types/                    # Tipos globales
│   ├── App.tsx                   # Rutas (con lazy loading)
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
├── vercel.json
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
cd notazo
npm install
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173).

### Otros scripts

```bash
npm run build       # Build de producción (dist/)
npm run preview     # Previsualizar el build
npm run typecheck   # Verificar tipos
```

---

## Despliegue en Vercel

### Desde GitHub

1. Sube el proyecto a un repo de GitHub.
2. Entra a [vercel.com](https://vercel.com) y haz login con GitHub.
3. Click **Add New → Project**, selecciona el repo.
4. Vercel detecta automáticamente que es **Vite**.
5. **Deploy**.

Cada push a `main` redespliega automáticamente.

### Variables de entorno en Vercel

Antes de desplegar, ve a **Project Settings → Environment Variables** y agrega:

```
VITE_ADSENSE_CLIENT = ca-pub-XXXXXXXXXXXXXXXX
VITE_ADSENSE_SLOT_TOP = 1234567890
VITE_ADSENSE_SLOT_MIDDLE = 2345678901
VITE_ADSENSE_SLOT_BOTTOM = 3456789012
VITE_ADSENSE_SLOT_SIDEBAR = 4567890123
VITE_GA4_ID = G-XXXXXXXXXX
```

Si no los defines, la app funciona igual sin AdSense ni Analytics.

---

## Configurar Google AdSense

1. Solicita tu cuenta en [adsense.google.com](https://adsense.google.com).
2. Una vez aprobada, copia tu **ID de cliente** (`ca-pub-1234567890123456`).
3. Define las env vars en `.env.local` (desarrollo) y en Vercel (producción):
   ```
   VITE_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX
   VITE_ADSENSE_SLOT_TOP=...
   VITE_ADSENSE_SLOT_MIDDLE=...
   VITE_ADSENSE_SLOT_BOTTOM=...
   VITE_ADSENSE_SLOT_SIDEBAR=...
   ```
4. Edita `src/components/ads/AdPlaceholder.tsx` y reemplaza el placeholder visual por el bloque AdSense real:

```jsx
<ins class="adsbygoogle"
     style={{ display: 'block' }}
     data-ad-client={ADSENSE_CONFIG.client}
     data-ad-slot={ADSENSE_CONFIG.slots.top}
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
```

5. Crea las unidades de anuncios en tu panel de AdSense y usa los IDs en los slots.

---

## Configurar Google Analytics 4

1. Crea una propiedad GA4 en [analytics.google.com](https://analytics.google.com).
2. Copia tu **Measurement ID** (`G-XXXXXXXXXX`).
3. Define la env var:
   ```
   VITE_GA4_ID=G-XXXXXXXXXX
   ```
4. Listo. El script se inyecta automáticamente en build time.

---

## Configurar Google Search Console

1. Entra a [search.google.com/search-console](https://search.google.com/search-console).
2. Agrega tu propiedad (`https://notazo.cl`).
3. Verifica con HTML tag o DNS.
4. Envía el sitemap: `https://notazo.cl/sitemap.xml`.

---

## SEO y posicionamiento

- **Meta títulos y descripciones** dinámicas por página (React Helmet).
- **Open Graph** y **Twitter Cards**.
- **Canonical URLs**.
- **Schema.org JSON-LD** (`EducationalOrganization`, `WebSite`, `BlogPosting`).
- **Sitemap.xml** con 14 URLs.
- **Robots.txt**.
- **URLs amigables** en español.
- **HTML semántico** completo.
- **Lazy loading** de páginas (mejor Core Web Vitals).
- **Code splitting** automático (Recharts y jsPDF en chunks separados).
- **Prose styling** para el blog con tipografía optimizada.

### Palabras clave objetivo

```
calculadora de notas chile
calcular promedio ponderado
qué nota necesito para aprobar
calculadora de examen chile
promedio ponderado fórmula
simulador de notas
puntaje a nota
calculadora NEM
NEM PAES
escala de notas chile
convertir puntaje a nota
```

---

## Accesibilidad

- **WCAG AA** cumplido en contraste.
- **Navegación por teclado** con focus visible.
- **Etiquetas ARIA** en componentes interactivos.
- **Skip link** para saltar al contenido principal.
- **Reduced motion** respetado.
- **Roles semánticos** completos.
- **text-balance** para títulos.

---

## Personalización

### Cambiar colores

Edita `tailwind.config.js` → `theme.extend.colors.brand`:

```js
brand: {
  600: '#TU_COLOR_PRIMARIO',
}
```

### Agregar más posts al blog

Edita `src/data/blog.ts` y agrega un nuevo objeto `BlogPost`. El sistema lo renderiza automáticamente.

### Agregar más páginas

1. Crea `src/pages/MiPagina.tsx`.
2. Agrégalo a `src/App.tsx` con `lazy`.
3. Agrega `<NavLink>` en `src/components/layout/Navbar.tsx`.
4. Agrega `<SEO />` con título y descripción únicos.
5. Agrega la URL a `public/sitemap.xml`.

---

## Notas técnicas

- **Sin backend**: todo se guarda en LocalStorage del navegador.
- **Escala chilena 1.0-7.0** con nota de aprobación 4.0.
- **Promedio ponderado**: `Σ(nota × ponderación) / 100`.
- **Nota necesaria**: `(objetivo − actual × (100 − p) / 100) / (p / 100)`.
- **Conversión puntaje → nota**: regla de tres en dos tramos.
- **NEM**: promedio simple de 1° a 4° medio.
- **PDF**: generado client-side con jsPDF.

---

## Licencia

MIT — úsalo, modifícalo y distribúyelo libremente.

---

**Notazo** — *Calcula tus notas, proyecta tu futuro.* 🇨🇱
