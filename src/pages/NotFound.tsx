import { Link } from 'react-router-dom'
import { SEO } from '@/components/seo/SEO'

export function NotFound() {
  return (
    <>
      <SEO
        title="Página no encontrada (404)"
        description="La página que buscas no existe."
        noindex
      />
      <div className="container-app py-20">
        <div className="mx-auto max-w-xl text-center">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-brand-100 text-brand-600 dark:bg-brand-900/40 dark:text-brand-400 mb-6">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <path d="M16 16s-1.5-2-4-2-4 2-4 2M9 9h.01M15 9h.01" />
            </svg>
          </div>
          <p className="text-7xl font-black gradient-text mb-2">404</p>
          <h1 className="text-3xl font-extrabold">Página no encontrada</h1>
          <p className="mt-3 text-gray-600 dark:text-gray-400">
            La página que buscas no existe o fue movida. Pero no te preocupes,
            tenemos muchas herramientas útiles para ti.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/"
              className="btn-base gradient-bg px-6 py-3 text-base font-semibold text-white"
            >
              Volver al inicio
            </Link>
            <Link
              to="/calculadora-de-notas"
              className="btn-base px-6 py-3 text-base font-semibold border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              Ir a la calculadora
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
