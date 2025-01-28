// @ts-check
import { defineConfig } from "astro/config"
import { loadEnv } from "vite"
import favicons from "astro-favicons"
import sitemap from "@astrojs/sitemap"
import tailwind from "@astrojs/tailwind"

import { APP_NAME, APP_SHORT_NAME } from "./src/lib/constants"
import { readingTime } from "./src/plugins/remark/reading-time.mjs"

const { URL } = loadEnv(import.meta.env.MODE, process.cwd(), "")

// https://astro.build/config
export default defineConfig({
  site: URL,
  integrations: [
    sitemap(),
    tailwind({
      applyBaseStyles: false,
    }),
    favicons({
      name: APP_NAME,
      short_name: APP_SHORT_NAME,
      pixel_art: true,
      themes: ["#ffffff", "#020617"],
    }),
  ],
  markdown: {
    shikiConfig: {
      theme: "houston",
    },
    remarkPlugins: [readingTime],
  },
  experimental: {
    svg: true,
    responsiveImages: true,
    contentIntellisense: true,
  },
})
