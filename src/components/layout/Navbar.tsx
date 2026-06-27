import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { to: '/calculadora-de-notas', label: 'Calculadora' },
  { to: '/que-nota-necesito', label: '¿Qué nota?' },
  { to: '/puntaje-a-nota', label: 'Puntaje → Nota' },
  { to: '/nem', label: 'NEM' },
  { to: '/dashboard', label: 'Dashboard' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  // Cerrar menú al navegar
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  // Lock scroll cuando está abierto
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/90 backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/90">
      <nav className="container-app flex h-16 items-center justify-between" aria-label="Navegación principal">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 group"
          aria-label="Notazo - Inicio"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-bg text-white shadow-soft group-hover:shadow-glow transition-shadow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
            </svg>
          </div>
          <span className="text-xl font-extrabold tracking-tight">
            <span className="gradient-text">Notazo</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                  )
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
          <li>
            <NavLink
              to="/escala-de-notas"
              className={({ isActive }) =>
                cn(
                  'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                )
              }
            >
              Escala
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/blog"
              className={({ isActive }) =>
                cn(
                  'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                )
              }
            >
              Blog
            </NavLink>
          </li>
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={cn(
          'lg:hidden border-t border-gray-200 dark:border-gray-800 overflow-hidden transition-all duration-300',
          open ? 'max-h-[36rem]' : 'max-h-0'
        )}
      >
        <ul className="container-app py-2 space-y-1">
          {NAV_ITEMS.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'block px-3 py-3 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                  )
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
          <li>
            <NavLink
              to="/escala-de-notas"
              className={({ isActive }) =>
                cn(
                  'block px-3 py-3 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                )
              }
            >
              Escala de Notas
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/simulador-eximicion"
              className={({ isActive }) =>
                cn(
                  'block px-3 py-3 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                )
              }
            >
              Simulador de Eximición
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/calculadora-examen-final"
              className={({ isActive }) =>
                cn(
                  'block px-3 py-3 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                )
              }
            >
              Examen Final
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/historial"
              className={({ isActive }) =>
                cn(
                  'block px-3 py-3 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                )
              }
            >
              Historial
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/blog"
              className={({ isActive }) =>
                cn(
                  'block px-3 py-3 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                )
              }
            >
              Blog
            </NavLink>
          </li>
        </ul>
      </div>
    </header>
  )
}
