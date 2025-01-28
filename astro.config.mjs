// @ts-check
import { defineConfig } from "astro/config"
import { loadEnv } from "vite"
import sitemap from "@astrojs/sitemap"
import tailwind from "@astrojs/tailwind"

import { readingTime } from "./src/plugins/remark/reading-time.mjs"

const { URL } = loadEnv(import.meta.env.MODE, process.cwd(), "")

// https://astro.build/config
export default defineConfig({
  site: URL,
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap(),
  ],
  markdown: {
    remarkPlugins: [readingTime],
    shikiConfig: {
      theme: "houston",
    },
  },
  experimental: {
    responsiveImages: true,
    contentIntellisense: true,
  },
})
