import { Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { SEO } from '@/components/seo/SEO'
import { Card, CardHeader } from '@/components/ui/Card'
import { AdBannerTop } from '@/components/ads/AdBannerTop'
import { AdBannerBottom } from '@/components/ads/AdBannerBottom'
import { AdBannerMiddle } from '@/components/ads/AdBannerMiddle'
import { BLOG_POSTS } from '@/data/blog'

export function Blog() {
  return (
    <>
      <SEO
        title="Blog Educativo - Guías para Estudiantes"
        description="Aprende sobre promedios, notas, NEM, PAES y más con nuestras guías para estudiantes chilenos."
        canonical="/blog"
        keywords="blog estudiantes chile, guías académicas, promedio notas, NEM, PAES"
      />

      <div className="container-app py-8 sm:py-12">
        <div className="mb-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold">Blog Educativo</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Guías, consejos y tutoriales para estudiantes chilenos.
          </p>
        </div>

        <AdBannerTop />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group block card-base p-6 hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex rounded-full bg-brand-100 px-2 py-0.5 text-xs font-bold text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">
                  {post.category}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {post.readTime} min
                </span>
              </div>
              <h2 className="text-lg font-bold mb-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-2">
                {post.title}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                {post.description}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(post.date).toLocaleDateString('es-CL', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
                <span className="text-sm font-semibold text-brand-600 dark:text-brand-400 group-hover:gap-2 inline-flex items-center gap-1 transition-all">
                  Leer
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>

        <AdBannerMiddle />

        <Card className="mt-8 bg-gradient-to-br from-brand-50 to-brand-100/50 dark:from-brand-900/30 dark:to-brand-800/20 border-brand-200 dark:border-brand-800">
          <div className="text-center py-4">
            <h3 className="text-xl font-bold mb-2">¿Necesitas calcular algo?</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
              Aplica lo aprendido con nuestras herramientas gratuitas.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/calculadora-de-notas" className="btn-base gradient-bg px-5 py-2.5 text-sm font-semibold text-white">
                Calculadora
              </Link>
              <Link to="/que-nota-necesito" className="btn-base px-5 py-2.5 text-sm font-semibold border border-brand-300 dark:border-brand-700">
                ¿Qué nota?
              </Link>
            </div>
          </div>
        </Card>

        <AdBannerBottom />
      </div>
    </>
  )
}
