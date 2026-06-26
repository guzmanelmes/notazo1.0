import { Link } from 'react-router-dom'

const SECTIONS = [
  {
    title: 'Calculadoras',
    links: [
      { to: '/calculadora-de-notas', label: 'Calculadora de Notas' },
      { to: '/que-nota-necesito', label: 'Qué Nota Necesito' },
      { to: '/calculadora-examen-final', label: 'Calculadora Examen Final' },
      { to: '/simulador-eximicion', label: 'Simulador de Eximición' },
    ],
  },
  {
    title: 'Recursos',
    links: [
      { to: '/historial', label: 'Historial' },
      { to: '/', label: 'Inicio' },
    ],
  },
  {
    title: 'Información',
    links: [
      { to: '/', label: 'Acerca de' },
      { to: '/', label: 'Preguntas Frecuentes' },
      { to: '/', label: 'Contacto' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="container-app py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4" aria-label="Notazo inicio">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-bg text-white">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                </svg>
              </div>
              <span className="text-xl font-extrabold gradient-text">Notazo</span>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Calcula tus notas, proyecta tu futuro. La herramienta educativa líder en Chile
              para estudiantes de enseñanza media y universitarios.
            </p>
          </div>

          {SECTIONS.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-gray-100 mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-gray-600 hover:text-brand-600 dark:text-gray-400 dark:hover:text-brand-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Notazo. Hecho con cariño para estudiantes chilenos.
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
            <span>v1.0.0</span>
            <span aria-hidden="true">•</span>
            <span>🇨🇱 Chile</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
