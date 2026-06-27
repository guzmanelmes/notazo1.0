// ============================================
// Carga condicional de AdSense y GA4 (cliente)
// Lee variables VITE_* en build time.
// Si no están configuradas, no se carga nada.
// ============================================

const ADSENSE_CLIENT = import.meta.env.VITE_ADSENSE_CLIENT
const GA4_ID = import.meta.env.VITE_GA4_ID

export function loadAdsAndAnalytics(): void {
  // Google AdSense
  if (ADSENSE_CLIENT && ADSENSE_CLIENT.startsWith('ca-pub-')) {
    const existing = document.querySelector(
      'script[src*="pagead2.googlesyndication.com"]'
    )
    if (!existing) {
      const s = document.createElement('script')
      s.async = true
      s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`
      s.crossOrigin = 'anonymous'
      document.head.appendChild(s)
    }
  }

  // Google Analytics 4
  if (GA4_ID && GA4_ID.startsWith('G-')) {
    const existing = document.querySelector(
      `script[src*="googletagmanager.com/gtag/js?id=${GA4_ID}"]`
    )
    if (!existing) {
      const s = document.createElement('script')
      s.async = true
      s.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`
      document.head.appendChild(s)

      const inline = document.createElement('script')
      inline.textContent = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA4_ID}');
      `
      document.head.appendChild(inline)
    }
  }
}

export const ADSENSE_CONFIG = {
  client: ADSENSE_CLIENT ?? '',
  slots: {
    top: import.meta.env.VITE_ADSENSE_SLOT_TOP ?? '',
    middle: import.meta.env.VITE_ADSENSE_SLOT_MIDDLE ?? '',
    bottom: import.meta.env.VITE_ADSENSE_SLOT_BOTTOM ?? '',
    sidebar: import.meta.env.VITE_ADSENSE_SLOT_SIDEBAR ?? '',
  },
}
