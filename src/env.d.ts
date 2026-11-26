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

/**
 * The attributes of Chrome's WebMCP proposal, which mark a form as a tool a
 * browser agent may fill in. They are experimental and not in the standard
 * HTML types yet, so they are declared here for the form element alone.
 */
declare namespace astroHTML.JSX {
  interface FormHTMLAttributes {
    toolname?: string | undefined | null;
    tooldescription?: string | undefined | null;
    toolautosubmit?: boolean | string | undefined | null;
  }
}
