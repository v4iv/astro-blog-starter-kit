// @ts-check
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';
import { remarkReadingTime } from './src/remark-plugins/remark-reading-time.mjs';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: process.env.URL || "http://localhost:4321",
  integrations: [tailwind({
    applyBaseStyles: false,
  }), sitemap({
    filter: (page) => page !== `${process.env.URL || "http://localhost:4321"}/admin`,
  })],
  markdown: {
    remarkPlugins: [remarkReadingTime],
  },
  experimental: {
    responsiveImages: true,
  },
  prefetch: {
    defaultStrategy: 'viewport'
  }
});