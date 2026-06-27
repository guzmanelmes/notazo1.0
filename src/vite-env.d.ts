/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ADSENSE_CLIENT?: string
  readonly VITE_ADSENSE_SLOT_TOP?: string
  readonly VITE_ADSENSE_SLOT_MIDDLE?: string
  readonly VITE_ADSENSE_SLOT_BOTTOM?: string
  readonly VITE_ADSENSE_SLOT_SIDEBAR?: string
  readonly VITE_GA4_ID?: string
  readonly VITE_SITE_URL?: string
  readonly VITE_SITE_NAME?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
