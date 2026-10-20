// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { SITE } from './src/config/site.ts';

export default defineConfig({
  site: SITE.origin,
  output: 'static',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  integrations: [mdx(), sitemap()],
  vite: {
    build: {
      assetsInlineLimit: 2048,
    },
  },
});
