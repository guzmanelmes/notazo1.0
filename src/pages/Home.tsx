import { Link } from 'react-router-dom'
import { SEO } from '@/components/seo/SEO'
import { AdBannerTop } from '@/components/ads/AdBannerTop'
import { AdBannerBottom } from '@/components/ads/AdBannerBottom'

export function Home() {
  return (
    <>
      <SEO
        title="Calcula tus notas fácilmente"
        description="Calcula tu promedio ponderado, descubre qué nota necesitas para aprobar y simula tu examen final. Herramienta gratuita para estudiantes chilenos."
        canonical="/"
        keywords="calculadora de notas, calcular promedio, qué nota necesito, calculadora de examen chile, promedio ponderado"
      />

      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* Background decorativo */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-brand-200/40 via-brand-300/20 to-transparent blur-3xl dark:from-brand-900/30 dark:via-brand-800/20" />
        </div>

        <div className="container-app py-12 sm:py-20">
          <div className="mx-auto max-w-3xl text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700 dark:bg-brand-900/40 dark:text-brand-300 mb-5">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-600 animate-pulse" />
              100% gratis y privado
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-balance">
              Calcula tus notas <span className="gradient-text">fácilmente</span>
            </h1>
            <p className="mt-5 text-lg sm:text-xl text-gray-600 dark:text-gray-300 text-balance">
              Promedio ponderado, examen final, eximición y más. Tus datos quedan
              en tu dispositivo, sin registro, sin complicaciones.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/calculadora-de-notas"
                className="btn-base gradient-bg px-6 py-3 text-base font-semibold text-white shadow-soft hover:shadow-glow"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="4" y="2" width="16" height="20" rx="2" />
                  <line x1="8" y1="6" x2="16" y2="6" />
                  <line x1="8" y1="10" x2="10" y2="10" />
                  <line x1="14" y1="10" x2="16" y2="10" />
                  <line x1="8" y1="14" x2="10" y2="14" />
                  <line x1="14" y1="14" x2="16" y2="14" />
                  <line x1="8" y1="18" x2="10" y2="18" />
                  <line x1="14" y1="18" x2="16" y2="18" />
                </svg>
                Calcular promedio
              </Link>
              <Link
                to="/que-nota-necesito"
                className="btn-base px-6 py-3 text-base font-semibold border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                ¿Qué nota necesito?
              </Link>
            </div>

            {/* Stats */}
            <dl className="mt-12 grid grid-cols-3 gap-4 sm:gap-8 max-w-xl mx-auto">
              <div>
                <dt className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Escala</dt>
                <dd className="text-xl sm:text-2xl font-bold gradient-text">1.0 — 7.0</dd>
              </div>
              <div>
                <dt className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Aprobación</dt>
                <dd className="text-xl sm:text-2xl font-bold gradient-text">4.0</dd>
              </div>
              <div>
                <dt className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Costo</dt>
                <dd className="text-xl sm:text-2xl font-bold gradient-text">$0</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <AdBannerTop />

      {/* HERRAMIENTAS */}
      <section className="container-app py-12 sm:py-16" aria-labelledby="tools-heading">
        <div className="text-center mb-10">
          <h2 id="tools-heading" className="text-2xl sm:text-3xl font-bold">
            Herramientas más utilizadas
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Todo lo que necesitas para llevar el control de tus notas.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <ToolCard
            to="/calculadora-de-notas"
            title="Calculadora de Notas"
            description="Suma evaluaciones con ponderación y obtén tu promedio al instante."
            icon={<CalculatorIcon />}
            color="blue"
          />
          <ToolCard
            to="/que-nota-necesito"
            title="¿Qué Nota Necesito?"
            description="Descubre la nota que debes sacarte para alcanzar tu objetivo."
            icon={<TargetIcon />}
            color="emerald"
          />
          <ToolCard
            to="/calculadora-examen-final"
            title="Examen Final"
            description="Calcula la nota mínima en el examen para aprobar el ramo."
            icon={<BookIcon />}
            color="amber"
          />
          <ToolCard
            to="/simulador-eximicion"
            title="Simulador de Eximición"
            description="Averigua si te eximes según tu promedio actual."
            icon={<AwardIcon />}
            color="purple"
          />
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-gray-100/50 dark:bg-gray-800/30 py-12 sm:py-16">
        <div className="container-app">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold">¿Por qué Notazo?</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Diseñado para estudiantes chilenos, sin enredos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              icon={<ShieldIcon />}
              title="Privado y seguro"
              description="Tus notas se guardan solo en tu navegador. Nadie más tiene acceso."
            />
            <FeatureCard
              icon={<ZapIcon />}
              title="Cálculo al instante"
              description="Resultados en tiempo real mientras escribes. Sin esperas."
            />
            <FeatureCard
              icon={<MobileIcon />}
              title="Funciona en todos lados"
              description="Diseñado mobile-first. Úsalo desde tu celular, tablet o computador."
            />
            <FeatureCard
              icon={<PaletteIcon />}
              title="Modo oscuro"
              description="Cuida tu vista con el modo oscuro automático o manual."
            />
            <FeatureCard
              icon={<CloudIcon />}
              title="Sin instalación"
              description="Abre la página y listo. No necesitas descargar nada."
            />
            <FeatureCard
              icon={<FileIcon />}
              title="Exporta a PDF"
              description="Descarga tu historial en PDF para imprimir o compartir."
            />
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="container-app py-12 sm:py-16" aria-labelledby="testimonials-heading">
        <div className="text-center mb-10">
          <h2 id="testimonials-heading" className="text-2xl sm:text-3xl font-bold">
            Lo que dicen los estudiantes
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Testimonios de estudiantes como tú.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <TestimonialCard
            name="Camila Soto"
            role="Estudiante de Ingeniería, UChile"
            initial="C"
            color="bg-pink-500"
            text="Notazo me salvó el semestre. Saber exactamente qué nota necesitaba en cada prueba me ayudó a organizarme mejor."
          />
          <TestimonialCard
            name="Matías Fuentes"
            role="4° Medio, Colegio San Ignacio"
            initial="M"
            color="bg-emerald-500"
            text="Lo uso todos los días en mi celular. Es súper rápido y la interfaz es muy clara. 10/10."
          />
          <TestimonialCard
            name="Valentina Rojas"
            role="Estudiante de Medicina, USACH"
            initial="V"
            color="bg-amber-500"
            text="El simulador de eximición es genial. Ahora sé cuánto necesito en el examen final con tiempo de anticipación."
          />
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-100/50 dark:bg-gray-800/30 py-12 sm:py-16" aria-labelledby="faq-heading">
        <div className="container-app max-w-3xl">
          <div className="text-center mb-10">
            <h2 id="faq-heading" className="text-2xl sm:text-3xl font-bold">
              Preguntas frecuentes
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Resolvemos tus dudas más comunes.
            </p>
          </div>

          <div className="space-y-3">
            <FAQItem
              question="¿Cómo se calcula el promedio ponderado en Chile?"
              answer="El promedio ponderado se obtiene multiplicando cada nota por su porcentaje de ponderación, sumando todos los resultados y dividiendo por 100. Por ejemplo: si tienes un 6.0 con 30% y un 5.0 con 70%, tu promedio es (6.0 × 0.30) + (5.0 × 0.70) = 5.3."
            />
            <FAQItem
              question="¿Cuál es la nota mínima para aprobar en Chile?"
              answer="La nota mínima de aprobación es 4.0 en la escala de 1.0 a 7.0. Cada institución puede tener requisitos adicionales para ciertos ramos."
            />
            <FAQItem
              question="¿Qué nota necesito para eximirme?"
              answer="Depende de tu institución. Lo más común es 5.5 o 6.0 de promedio. Usa nuestro Simulador de Eximición para comprobarlo."
            />
            <FAQItem
              question="¿Mis notas se guardan en algún servidor?"
              answer="No. Toda tu información se guarda localmente en tu navegador (LocalStorage). Nadie más tiene acceso a tus datos."
            />
            <FAQItem
              question="¿Puedo usar Notazo sin conexión a internet?"
              answer="Una vez que cargues la página por primera vez, puedes seguir usándola sin conexión. Es una aplicación web progresiva."
            />
            <FAQItem
              question="¿Tiene costo usar Notazo?"
              answer="No, Notazo es completamente gratuito. Está pensado para ayudar a estudiantes chilenos sin restricciones."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-app py-12 sm:py-16">
        <div className="relative overflow-hidden rounded-3xl gradient-bg px-6 py-12 sm:px-12 sm:py-16 text-center text-white">
          <div aria-hidden="true" className="absolute inset-0 -z-0 opacity-20">
            <div className="absolute -top-10 -left-10 w-72 h-72 rounded-full bg-white blur-3xl" />
            <div className="absolute -bottom-10 -right-10 w-72 h-72 rounded-full bg-white blur-3xl" />
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold">¿Listo para proyectar tu futuro?</h2>
            <p className="mt-3 text-lg text-white/90 max-w-2xl mx-auto">
              Empieza ahora a calcular tus notas y tomar el control de tu rendimiento académico.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 items-center justify-center">
              <Link
                to="/calculadora-de-notas"
                className="inline-flex items-center justify-center rounded-xl bg-white text-brand-700 px-6 py-3 text-base font-bold hover:bg-gray-100 transition-colors shadow-lg"
              >
                Empezar ahora
                <svg className="ml-2" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                to="/que-nota-necesito"
                className="inline-flex items-center justify-center rounded-xl border border-white/30 bg-white/10 backdrop-blur px-6 py-3 text-base font-semibold text-white hover:bg-white/20 transition-colors"
              >
                ¿Qué nota necesito?
              </Link>
            </div>
          </div>
        </div>
      </section>

      <AdBannerBottom />
    </>
  )
}

// ============ Sub-componentes ============

interface ToolCardProps {
  to: string
  title: string
  description: string
  icon: React.ReactNode
  color: 'blue' | 'emerald' | 'amber' | 'purple'
}

function ToolCard({ to, title, description, icon, color }: ToolCardProps) {
  const colorMap = {
    blue: 'from-brand-500 to-brand-600',
    emerald: 'from-emerald-500 to-emerald-600',
    amber: 'from-amber-500 to-amber-600',
    purple: 'from-purple-500 to-purple-600',
  }
  return (
    <Link
      to={to}
      className="group block card-base p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
    >
      <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${colorMap[color]} text-white mb-4 group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <h3 className="text-lg font-bold mb-1 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
        {title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
      <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 dark:text-brand-400 group-hover:gap-2 transition-all">
        Usar herramienta
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="card-base p-6">
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-100 text-brand-600 dark:bg-brand-900/40 dark:text-brand-400 mb-3">
        {icon}
      </div>
      <h3 className="text-base font-bold mb-1">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  )
}

interface TestimonialCardProps {
  name: string
  role: string
  initial: string
  color: string
  text: string
}

function TestimonialCard({ name, role, initial, color, text }: TestimonialCardProps) {
  return (
    <div className="card-base p-6">
      <div className="flex items-center gap-3 mb-3">
        <div className={`h-10 w-10 rounded-full ${color} flex items-center justify-center text-white font-bold`}>
          {initial}
        </div>
        <div>
          <p className="font-semibold text-sm">{name}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{role}</p>
        </div>
      </div>
      <div className="flex gap-1 mb-2" aria-label="5 estrellas">
        {[1, 2, 3, 4, 5].map((i) => (
          <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-amber-400" aria-hidden="true">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>
      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed italic">
        "{text}"
      </p>
    </div>
  )
}

interface FAQItemProps {
  question: string
  answer: string
}

function FAQItem({ question, answer }: FAQItemProps) {
  return (
    <details className="group card-base p-5 cursor-pointer">
      <summary className="flex items-center justify-between gap-4 list-none">
        <h3 className="font-semibold text-base sm:text-lg">{question}</h3>
        <svg
          className="h-5 w-5 text-gray-400 transition-transform group-open:rotate-180"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </summary>
      <p className="mt-3 text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
        {answer}
      </p>
    </details>
  )
}

// ============ Iconos ============
const ICON_BASE = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

function CalculatorIcon() {
  return (
    <svg {...ICON_BASE} aria-hidden="true">
      <rect width="16" height="20" x="4" y="2" rx="2" />
      <line x1="8" x2="16" y1="6" y2="6" />
      <line x1="16" x2="16" y1="14" y2="18" />
      <path d="M16 10h.01" />
      <path d="M12 10h.01" />
      <path d="M8 10h.01" />
      <path d="M12 14h.01" />
      <path d="M8 14h.01" />
      <path d="M12 18h.01" />
      <path d="M8 18h.01" />
    </svg>
  )
}

function TargetIcon() {
  return (
    <svg {...ICON_BASE} aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  )
}

function BookIcon() {
  return (
    <svg {...ICON_BASE} aria-hidden="true">
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  )
}

function AwardIcon() {
  return (
    <svg {...ICON_BASE} aria-hidden="true">
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  )
}

function ShieldIcon() {
  return (
    <svg {...ICON_BASE} aria-hidden="true">
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    </svg>
  )
}

function ZapIcon() {
  return (
    <svg {...ICON_BASE} aria-hidden="true">
      <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
    </svg>
  )
}

function MobileIcon() {
  return (
    <svg {...ICON_BASE} aria-hidden="true">
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
      <path d="M12 18h.01" />
    </svg>
  )
}

function PaletteIcon() {
  return (
    <svg {...ICON_BASE} aria-hidden="true">
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
      <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
      <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
    </svg>
  )
}

function CloudIcon() {
  return (
    <svg {...ICON_BASE} aria-hidden="true">
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </svg>
  )
}

function FileIcon() {
  return (
    <svg {...ICON_BASE} aria-hidden="true">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  )
}
