import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title: string
  description: string
  canonical?: string
  keywords?: string
  type?: 'website' | 'article'
  noindex?: boolean
}

const SITE_NAME = 'Notazo'
const SITE_URL = 'https://notazo.cl'

export function SEO({
  title,
  description,
  canonical,
  keywords,
  type = 'website',
  noindex,
}: SEOProps) {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`
  const url = canonical ? `${SITE_URL}${canonical}` : SITE_URL

  return (
    <Helmet>
      {/* HTML lang ya está en index.html */}
      <html lang="es-CL" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large" />
      )}
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="es_CL" />
      <meta property="og:image" content={`${SITE_URL}/og-image.png`} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${SITE_URL}/og-image.png`} />
    </Helmet>
  )
}
