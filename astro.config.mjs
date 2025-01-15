// @ts-check
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';
import { remarkReadingTime } from './src/remark-plugins/remark-reading-time.mjs';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind({
    applyBaseStyles: false,
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