import { useParams, Link, Navigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { SEO } from '@/components/seo/SEO'
import { AdBannerTop } from '@/components/ads/AdBannerTop'
import { AdBannerMiddle } from '@/components/ads/AdBannerMiddle'
import { AdBannerBottom } from '@/components/ads/AdBannerBottom'
import { BLOG_POSTS } from '@/data/blog'

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const post = BLOG_POSTS.find((p) => p.slug === slug)

  if (!post) return <Navigate to="/blog" replace />

  // Posts relacionados (mismo category, excluir el actual)
  const relacionados = BLOG_POSTS.filter(
    (p) => p.category === post.category && p.slug !== post.slug
  ).slice(0, 3)

  return (
    <>
      <SEO
        title={post.title}
        description={post.description}
        canonical={`/blog/${post.slug}`}
        keywords={post.keywords}
        type="article"
      />

      {/* JSON-LD Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            author: { '@type': 'Organization', name: 'Notazo' },
            publisher: {
              '@type': 'Organization',
              name: 'Notazo',
              logo: { '@type': 'ImageObject', url: 'https://notazo.cl/favicon.svg' },
            },
            mainEntityOfPage: `https://notazo.cl/blog/${post.slug}`,
          }),
        }}
      />

      <article className="container-app py-8 sm:py-12">
        <div className="mx-auto max-w-3xl">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1 text-sm text-brand-600 dark:text-brand-400 hover:underline mb-6"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m12 19-7-7 7-7M19 12H5" />
            </svg>
            Volver al blog
          </Link>

          <header className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex rounded-full bg-brand-100 px-2 py-0.5 text-xs font-bold text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">
                {post.category}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {new Date(post.date).toLocaleDateString('es-CL', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                · {post.readTime} min lectura
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-balance">
              {post.title}
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 text-balance">
              {post.description}
            </p>
          </header>

          <AdBannerTop />

          <div className="prose prose-base sm:prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-p:my-4 prose-ul:my-4 prose-li:my-1 prose-strong:text-brand-700 dark:prose-strong:text-brand-400 prose-a:text-brand-600 dark:prose-a:text-brand-400 prose-a:no-underline hover:prose-a:underline prose-table:my-6 prose-th:text-left prose-td:py-2">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>

          <AdBannerMiddle />

          {/* CTA */}
          <div className="mt-10 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 p-6 sm:p-8 text-white">
            <h3 className="text-2xl font-bold mb-2">Aplica lo aprendido</h3>
            <p className="text-white/90 mb-4">
              Usa nuestras calculadoras gratuitas para poner en práctica estos conceptos.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/calculadora-de-notas"
                className="inline-flex items-center justify-center rounded-lg bg-white text-brand-700 px-4 py-2 text-sm font-bold hover:bg-gray-100"
              >
                Calculadora de promedio
              </Link>
              <Link
                to="/que-nota-necesito"
                className="inline-flex items-center justify-center rounded-lg border border-white/30 bg-white/10 backdrop-blur px-4 py-2 text-sm font-semibold text-white hover:bg-white/20"
              >
                ¿Qué nota necesito?
              </Link>
              <Link
                to="/puntaje-a-nota"
                className="inline-flex items-center justify-center rounded-lg border border-white/30 bg-white/10 backdrop-blur px-4 py-2 text-sm font-semibold text-white hover:bg-white/20"
              >
                Puntaje a Nota
              </Link>
            </div>
          </div>

          {relacionados.length > 0 && (
            <section className="mt-12">
              <h2 className="text-2xl font-bold mb-4">También te puede interesar</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relacionados.map((r) => (
                  <Link
                    key={r.slug}
                    to={`/blog/${r.slug}`}
                    className="card-base p-4 hover:shadow-lg transition-all group"
                  >
                    <span className="inline-flex rounded-full bg-brand-100 px-2 py-0.5 text-xs font-bold text-brand-700 dark:bg-brand-900/40 dark:text-brand-300 mb-2">
                      {r.category}
                    </span>
                    <h3 className="font-bold group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-2">
                      {r.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                      {r.description}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <AdBannerBottom />
        </div>
      </article>
    </>
  )
}
