/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SITE_ORIGIN?: string;
  readonly PUBLIC_ADSENSE_CLIENT?: string;
  readonly PUBLIC_ADSENSE_SLOT_RESULT?: string;
  readonly PUBLIC_ADSENSE_SLOT_IN_ARTICLE?: string;
  readonly PUBLIC_ADSENSE_SLOT_FOOTER?: string;
  readonly PUBLIC_GA_ID?: string;
  readonly PUBLIC_BUTTONDOWN_FORM?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
